// GitHub OAuth broker for Decap CMS, ported from Pages Functions (functions/api/)
// when deploys moved from Cloudflare Pages to Workers static assets (LAB-87).
// Requires worker secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.

function renderBody(status, content) {
  return `
    <script>
      const receiveMessage = (message) => {
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
  const redirectUrl = new URL('https://github.com/login/oauth/authorize');
  redirectUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
  redirectUrl.searchParams.set('scope', 'repo user');
  redirectUrl.searchParams.set(
    'state',
    crypto.getRandomValues(new Uint8Array(12)).join('')
  );
  // 302, not 301: a permanent redirect gets cached by browsers, which would
  // replay a stale `state` value on every login attempt.
  return Response.redirect(redirectUrl.href, 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'mermaidkaz-decap-oauth',
      accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  const result = await response.json();
  const htmlHeaders = { 'content-type': 'text/html;charset=UTF-8' };
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
        return await handleCallback(url, env);
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
