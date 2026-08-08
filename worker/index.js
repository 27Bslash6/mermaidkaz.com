// GitHub OAuth relay for Sveltia CMS (Decap-compatible postMessage flow),
// originally ported from Pages Functions when deploys moved to Workers
// static assets (LAB-87), hardened for Sveltia in LAB-473.
// Requires worker secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.

// Only these opener origins may receive the GitHub token. Without this check
// any site could open the popup and harvest a token once the user completes
// the GitHub consent screen. Covers prod, staging, PR preview versions and
// local wrangler dev.
export const ALLOWED_ORIGINS = [
  /^https:\/\/mermaid\.fnord\.lol$/,
  /^https:\/\/[\w-]*mermaidkaz(-staging)?\.[\w-]+\.workers\.dev$/,
  /^http:\/\/localhost(:\d+)?$/
];

const STATE_COOKIE = 'oauth_state';

function renderBody(status, content) {
  const origins = JSON.stringify(ALLOWED_ORIGINS.map((re) => re.source));
  return `
    <script>
      const allowed = ${origins}.map((source) => new RegExp(source));
      const receiveMessage = (message) => {
        if (!allowed.some((re) => re.test(message.origin))) return;
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
}

function handleAuth(url, env) {
  const state = [...crypto.getRandomValues(new Uint8Array(16))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const redirectUrl = new URL('https://github.com/login/oauth/authorize');
  redirectUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
  redirectUrl.searchParams.set('scope', 'repo user');
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
    return new Response(renderBody('error', { error: 'invalid_state' }), {
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
    return new Response(renderBody('error', result), {
      headers: htmlHeaders,
      status: 401
    });
  }
  return new Response(
    renderBody('success', { token: result.access_token, provider: 'github' }),
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
