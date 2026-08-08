// GitHub OAuth relay for Sveltia CMS (Decap-compatible postMessage flow),
// originally ported from Pages Functions when deploys moved to Workers
// static assets (LAB-87), hardened for Sveltia in LAB-473.
// Requires worker secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.

// The GitHub token (repo-scoped) is postMessaged back to whichever window
// opened the login popup. This allowlist is the ONLY thing stopping a hostile
// page from opening the popup and harvesting that token, so it must be exact:
// production and localhost are hardcoded; any other origin (staging, PR
// previews on the owner's *.workers.dev account) has to be named explicitly
// via the CMS_EXTRA_ORIGINS secret. A wildcard over the workers.dev account
// subdomain would let anyone register a worker named `mermaidkaz` on their own
// account and receive the token — so we don't wildcard it (LAB-473 review).
const STATIC_ORIGINS = [
  'https://mermaid.fnord.lol',
  /^http:\/\/localhost(:\d+)?$/
];

const STATE_COOKIE = 'oauth_state';

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Resolve the concrete allowlist for this request. Exact strings become
// anchored patterns; env extras are comma-separated exact origins. Returned as
// regex source strings so renderBody can rebuild them inside the popup script,
// which is where the browser-side origin check actually runs.
function allowedOriginPatterns(env) {
  const patterns = STATIC_ORIGINS.map((o) =>
    typeof o === 'string' ? `^${escapeRegex(o)}$` : o.source
  );
  const extra = (env.CMS_EXTRA_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
    .map((o) => `^${escapeRegex(o)}$`);
  return [...patterns, ...extra];
}

// Test-only helper: does `origin` match the allowlist for this env?
export function isAllowedOrigin(origin, env = {}) {
  return allowedOriginPatterns(env).some((src) => new RegExp(src).test(origin));
}

function renderBody(status, content, env) {
  const patterns = JSON.stringify(allowedOriginPatterns(env));
  // JSON.stringify makes the payload a valid JS string literal; escaping `<`
  // stops a `</script>` in any GitHub error message from closing the tag.
  const message = JSON.stringify(
    `authorization:github:${status}:${JSON.stringify(content)}`
  ).replace(/</g, '\\u003c');
  return `<!doctype html>
    <body>
    <p>Completing sign-in… you can close this window if it doesn't close itself.</p>
    <script>
      const allowed = ${patterns}.map((source) => new RegExp(source));
      if (!window.opener) {
        document.body.firstElementChild.textContent =
          'Open the CMS at /admin/ and use its Sign in button — this page is not meant to be visited directly.';
      } else {
        const receiveMessage = (event) => {
          if (!allowed.some((re) => re.test(event.origin))) return;
          window.opener.postMessage(${message}, event.origin);
          window.removeEventListener('message', receiveMessage, false);
        };
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      }
    </script>
    </body>`;
}

function handleAuth(url, env) {
  const state = [...crypto.getRandomValues(new Uint8Array(16))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const redirectUrl = new URL('https://github.com/login/oauth/authorize');
  redirectUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
  // public_repo (not repo): the content repo is public, so this is the minimal
  // scope Sveltia needs to commit — a leaked token can't touch private repos.
  redirectUrl.searchParams.set('scope', 'public_repo');
  redirectUrl.searchParams.set('state', state);
  // 302, not 301: a permanent redirect gets cached by browsers, which would
  // replay a stale `state` value on every login attempt. The state also
  // round-trips through an HttpOnly cookie so the callback can reject
  // forged or replayed authorization codes (OAuth CSRF).
  return new Response(null, {
    status: 302,
    headers: {
      location: redirectUrl.href,
      'set-cookie': `${STATE_COOKIE}=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
    }
  });
}

async function handleCallback(request, url, env) {
  const htmlHeaders = {
    'content-type': 'text/html;charset=UTF-8',
    // The state cookie is single-use — expire it either way.
    'set-cookie': `${STATE_COOKIE}=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
  };
  const state = url.searchParams.get('state');
  const cookieState = (request.headers.get('cookie') ?? '')
    .split(';')
    .map((part) => part.trim().split('='))
    .find(([name]) => name === STATE_COOKIE)?.[1];
  if (!state || state !== cookieState) {
    return new Response(renderBody('error', { error: 'invalid_state' }, env), {
      headers: htmlHeaders,
      status: 401
    });
  }
  const code = url.searchParams.get('code');
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'mermaidkaz-cms-oauth',
      accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  const result = await response.json();
  if (result.error) {
    return new Response(renderBody('error', result, env), {
      headers: htmlHeaders,
      status: 401
    });
  }
  return new Response(
    renderBody('success', { token: result.access_token, provider: 'github' }, env),
    { headers: htmlHeaders }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/api/auth') {
        return handleAuth(url, env);
      }
      if (url.pathname === '/api/callback') {
        return await handleCallback(request, url, env);
      }
    } catch (error) {
      console.error(error);
      return new Response(error.message, { status: 500 });
    }
    // Static assets are served before the worker runs; anything landing here
    // matched neither an asset nor an API route, so let the asset layer apply
    // its not_found_handling.
    return env.ASSETS.fetch(request);
  }
};
