// Self-check for the Worker OAuth relay (worker/index.js) — run with
// `bun scripts/test-worker.js`. No framework: assert-based, fails loud.
import assert from 'node:assert/strict';
import worker, { isAllowedOrigin } from '../worker/index.js';

const env = {
  GITHUB_CLIENT_ID: 'test-client-id',
  GITHUB_CLIENT_SECRET: 'test-client-secret', // pragma: allowlist secret
  CMS_EXTRA_ORIGINS:
    'https://mermaidkaz-staging.owner-acct.workers.dev, https://preview-mermaidkaz.owner-acct.workers.dev',
  ASSETS: { fetch: () => new Response('asset', { status: 200 }) }
};

// /api/auth → 302 to GitHub with a state that matches the cookie
const auth = await worker.fetch(
  new Request('https://mermaid.fnord.lol/api/auth'),
  env
);
assert.equal(auth.status, 302);
const location = new URL(auth.headers.get('location'));
assert.equal(location.origin, 'https://github.com');
assert.equal(
  location.searchParams.get('redirect_uri'),
  'https://mermaid.fnord.lol/api/callback'
);
const state = location.searchParams.get('state');
assert.match(state, /^[0-9a-f]{32}$/);
const cookie = auth.headers.get('set-cookie');
assert.match(cookie, new RegExp(`oauth_state=${state};`));
assert.match(cookie, /HttpOnly/);

// /api/callback with a mismatched state → 401, no token exchange
const forged = await worker.fetch(
  new Request(
    'https://mermaid.fnord.lol/api/callback?code=x&state=' + 'f'.repeat(32),
    { headers: { cookie: 'oauth_state=' + 'a'.repeat(32) } }
  ),
  env
);
assert.equal(forged.status, 401);
assert.match(await forged.text(), /invalid_state/);

// /api/callback with no cookie at all → 401
const bare = await worker.fetch(
  new Request('https://mermaid.fnord.lol/api/callback?code=x&state=abc'),
  env
);
assert.equal(bare.status, 401);

// The popup script only posts the token to allowlisted origins. The attacker
// cases are the point: an unbounded workers.dev wildcard would let anyone
// register a `mermaidkaz` worker on their own account and receive the token.
for (const [origin, ok] of [
  ['https://mermaid.fnord.lol', true],
  ['https://mermaidkaz-staging.owner-acct.workers.dev', true], // env extra, exact
  ['https://preview-mermaidkaz.owner-acct.workers.dev', true], // env extra, exact
  ['http://localhost:8080', true],
  ['https://evil.example.com', false],
  ['https://mermaid.fnord.lol.evil.com', false], // suffix bypass
  ['https://mermaidkaz.attacker-acct.workers.dev', false], // account-wildcard bypass
  ['https://mermaidkaz-staging.attacker-acct.workers.dev', false]
]) {
  assert.equal(
    isAllowedOrigin(origin, env),
    ok,
    `origin allowlist wrong for ${origin}`
  );
}

// With no CMS_EXTRA_ORIGINS set, only production + localhost are allowed.
assert.equal(
  isAllowedOrigin('https://mermaidkaz-staging.owner-acct.workers.dev', {}),
  false,
  'staging origin must not be allowed unless explicitly configured'
);
assert.equal(isAllowedOrigin('https://mermaid.fnord.lol', {}), true);

// Anything else falls through to static assets
const asset = await worker.fetch(
  new Request('https://mermaid.fnord.lol/about/'),
  env
);
assert.equal(await asset.text(), 'asset');

console.log('[worker] OK — auth redirect, state CSRF, origin allowlist, asset fallthrough');
