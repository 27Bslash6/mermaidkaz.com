# Editorial path — how content gets edited on mermaidkaz.com

Two ways to change site content, depending on where we are:

1. **Sveltia CMS at `/admin/`** — the visual editor (needs one-time owner
   setup, below). This is the destination path for Kaz.
2. **GitHub-native editing** — the interim path used before Kaz is
   onboarded: edit files directly on GitHub (or ask an agent).

Either way the mechanics are the same underneath: every change is a commit
to `main`, which triggers CI and a rebuild + redeploy of the site. There is
no separate content database — the git repo _is_ the content.

---

## 1. Visual editing with Sveltia CMS

### What Kaz can edit

Open `https://mermaid.fnord.lol/admin/` and sign in with GitHub. The editor
shows:

- **Pages** — Home, About, Services, Contact (title, description, hero,
  body text).
- **Site Settings** — site title/tagline, author, social links, contact
  details, the PADI courses booking URL.
- **Eventbrite Bookings** — paste an Eventbrite event ID next to an
  offering to show its booking button; clear it to hide the button.
- **Images** — uploads land in `src/assets/images/uploads/`.

### Login → edit → publish

1. Go to `/admin/` and click **Sign in with GitHub**. A GitHub popup asks
   for authorisation the first time (the account must have write access to
   `27Bslash6/mermaidkaz.com`).
2. Pick a page or setting, edit in the form, use the live preview pane on
   the right.
3. Click **Save** (top right). Sveltia commits straight to `main`.
4. CI rebuilds and redeploys automatically — the change is live once the
   GitHub Actions run finishes (a few minutes). No other publish step.

> Sveltia commits directly to the branch — there is no draft/review queue
> (Decap's "editorial workflow" is not supported). Treat **Save** as
> **Publish**.

### One-time owner setup (Ray)

The CMS login needs a GitHub OAuth App plus two Worker secrets. Everything
else is already wired.

1. **Create the OAuth App** — GitHub → Settings → Developer settings →
   OAuth Apps → _New OAuth App_:
   - Application name: `Mermaid Kaz CMS`
   - Homepage URL: `https://mermaid.fnord.lol`
   - Authorization callback URL: `https://mermaid.fnord.lol/api/callback`
   - Register, then generate a **client secret**.
2. **Store the secrets on the production Worker** (from the repo root):

   ```bash
   bunx wrangler secret put GITHUB_CLIENT_ID     # paste the app's client ID
   bunx wrangler secret put GITHUB_CLIENT_SECRET # paste the client secret
   ```

3. That's it for production. Staging and PR-preview admins reuse this same
   relay (`base_url` in `src/admin/config.yml` points at
   `https://mermaid.fnord.lol`), so no second OAuth App is needed. But the
   relay only hands the token back to origins it trusts — production
   (`https://mermaid.fnord.lol`) and localhost are trusted out of the box;
   any `*.workers.dev` staging/preview origin must be named explicitly, or
   the popup silently refuses to complete. To enable staging/preview login,
   set the exact origins (comma-separated) as a Worker var:

   ```bash
   # e.g. https://mermaidkaz-staging.<your-account>.workers.dev
   bunx wrangler secret put CMS_EXTRA_ORIGINS
   ```

   This is deliberately not a wildcard: a `*.workers.dev` pattern would let
   anyone register a worker named `mermaidkaz` on their own Cloudflare
   account and receive the token.

4. **Give Kaz access**: add her GitHub account as a collaborator on
   `27Bslash6/mermaidkaz.com` with **Write** permission. The token is
   `public_repo`-scoped (the repo is public), so it can only touch public
   repos — never her private ones.

### How the pieces fit

- `src/admin/index.html` loads the self-hosted Sveltia bundle
  (`/admin/sveltia-cms.js`, copied from `node_modules/@sveltia/cms` at
  build time — no CDN).
- `src/admin/config.yml` is the schema: which files are editable and what
  fields they expose. It mirrors the shipped content only — if you add a
  new data file or front-matter field, extend the config in the same PR.
- `worker/index.js` is the GitHub OAuth relay (`/api/auth` +
  `/api/callback`) with CSRF state checking and an exact origin allowlist
  (`STATIC_ORIGINS` + the `CMS_EXTRA_ORIGINS` var).

---

## 2. Interim path — editing directly on GitHub

Until Kaz is onboarded, content changes go straight through GitHub:

1. Open the file on GitHub, e.g.
   [`src/index.md`](https://github.com/27Bslash6/mermaidkaz.com/blob/main/src/index.md)
   (Home), `src/about.md`, `src/services.md`, `src/contact.md`, or the data
   files `src/_data/site.json` / `src/_data/eventbrite.json`.
2. Click the pencil icon (✏️) to edit in the browser.
3. Page text lives below the `---` front-matter block; titles, hero text
   and buttons live inside it. Keep the quoting/indentation as-is.
4. Commit the change. Committing to `main` publishes immediately once CI
   finishes; committing to a branch + opening a PR gets a preview URL and
   a human review first — prefer the PR route for anything non-trivial.
5. Images: GitHub → `src/assets/images/uploads/` → _Add file_ → _Upload
   files_, then reference the file as `/assets/images/uploads/<name>`.

Or simply ask an agent on the Multica board to make the change.
