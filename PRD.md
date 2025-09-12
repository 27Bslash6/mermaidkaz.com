# Mermaid Kaz's Website

This is the website for Mermaid Kaz, a freelance artist and writer.

## Product Requirements Document

### Objective

Deliver a fast, SEO-friendly brochure website with calendar-based booking/inquiry support. The platform should empower non-technical users to update page content, images, and social links easily. Hosting and deployment must be automated, secure, and low-cost.

### Stakeholders

- Site Owner: Solo entrepreneur (non-technical, creative business)
- Site Visitors: Prospective clients (booking, inquiries)

---

## Functional Requirements

### Content Editing

- Use Decap CMS for visual, browser-based editing of pages, images, and blog/news posts[1][3].
- The CMS must allow non-technical editing, content previews resembling the final site, and media upload support.
- All changes are stored and versioned in GitHub for security and rollback[6].

### Site Structure & Design

- Site built with Eleventy (11ty) for flexible templating, fast builds, and strong performance[2][7].
- Support at least: Home, About, Services, Gallery, Booking/Contact, Blog/News[8][5].
- Responsive, modern design with accessible navigation and clear call-to-action buttons.
- Optimize images automatically using Eleventy’s image transforms for fast load times and good Google PageSpeed scores[1][9].

### Booking Integration

- Provide a booking/inquiry form (can be static or integrated with third-party booking apps via embed).
- Optionally, connect to external booking calendars (Google/Outlook) via plugins or integrations as future functionality[1].

### Hosting & Deployment

- Host static files on Cloudflare Pages for free, fast global CDN[1][2][4][5].
- Automate builds and deploys using GitHub Actions—every commit or CMS edit triggers a deploy[10][11][4].
- Custom domain setup managed via Cloudflare DNS; SSL/TLS enforced.
- Rollback capability, staging branch previews for content review.
- Caching strategy optimized: Use Eleventy’s cache buster to ensure CMS edits reflect promptly, with option to disable/use aggressive caching when stable[1][2].

---

## Non-Functional Requirements

- Fast initial load and navigation (static pre-rendered HTML, image optimization)[1][2][9].
- Low operational cost: Only domain registration cost; hosting and deployment free for most solo use cases[1][2][4].
- Secure admin access: Decap CMS must authenticate via GitHub OAuth or similar, accessible only to owner[3][6].
- GDPR and privacy compliance for booking/contact forms; data handled securely.

---

## Technical Specifications

- **Stack:** Eleventy (JavaScript), Decap CMS frontend, GitHub repo backend.
- **Media:** Images stored in `/uploads` or specified media folder, optimized via Eleventy during build.
- **CMS config:** `/admin/config.yml` specifies content collections—pages, blog, gallery, services, etc.[1][3][12].
- **Build/Deploy:** GitHub Actions workflows set up for CI/CD, caches dependencies between builds[10][11][4].
- **Hosting:** Cloudflare Pages, custom domain mapped, with HTTPS by default.
- **Extensibility:** Booking forms can be enhanced or replaced with serverless logic in Workers; calendar sync possible with API additions[1][13].

---

## Success Metrics

- Site owner can update all content without touching code.
- Deployments after edit complete within minutes, changes visible publicly.
- Zero unexpected downtime; <1s page load time for core content.
- Site remains low/no-cost for up to 100,000 views/month.
- Booking inquiry completion rate meets or exceeds prior solutions.

---

This PRD maps out an Eleventy + Decap CMS static site on Cloudflare Pages with GitHub Actions for an automated, user-friendly, cost-effective platform tailored for solo creative businesses[1][2][3][6][5][4][10].

Sources
[1] My Decap CMS setup with 11ty hosted on Cloudflare Pages https://www.patrickgrey.co.uk/notes/2024-09-21-my-decap-cms-setup-with-11ty-hosted-on-cloudflare-pages/
[2] Eleventy · Cloudflare Pages docs https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/
[3] Basic Steps https://decapcms.org/docs/basic-steps/
[4] Deploying Static Sites to Cloudflare Pages using GitHub Actions https://sebsmith.net/blog/static-sites-cloudflare/static-sites-cloudflare-pages/
[5] Moving to Eleventy https://troz.net/post/2025/eleventy/
[6] Decap CMS | Open-Source Content Management System https://decapcms.org
[7] 11ty/eleventy: A simpler site generator. Transforms ... https://github.com/11ty/eleventy
[8] 11ty/eleventy-base-blog: A starter repository for ... https://github.com/11ty/eleventy-base-blog
[9] Cranking Brotli up to 11 with Cloudflare Pro and 11ty https://nooshu.com/blog/2025/01/05/cranking-brotli-up-to-11-with-cloudflare-pro-and-11ty/
[10] GitHub Actions: Deploy Static Site to Cloudflare Pages https://docs.danielcristho.site/devops-and-automation/github-actions-direct-upload-cf-pages/
[11] Deploy an Eleventy site to Cloudflare Pages efficiently with ... https://jonas.brusman.se/deploy-eleventy-to-cloudflare-with-githubs-action-cache/
[12] DRY Decap CMS config with Manual Initialization https://mrkaluzny.com/blog/dry-decap-cms-config-with-manual-initialization/
[13] Create a sitemap from Sanity CMS with Workers https://developers.cloudflare.com/developer-spotlight/tutorials/create-sitemap-from-sanity-cms/
[14] Automatic static site deployment with 11ty, Cloudflare Workers ... https://offbyone.tech/posts/11ty-cloudflare-workers-github-actions/
[15] Tips for Running 11ty on Cloudflare Pages https://cassey.dev/11ty-on-cloudflare-pages/
[16] How to Choose the Best GitHub Integration Solution https://ones.com/blog/github-integration-guide/
[17] Setting Up Decap CMS with Jekyll: A Real-World Example https://blog.brennanbrown.ca/setting-up-decap-cms-with-jekyll-a-real-world-example-6572fc6bfe5c
[18] Deployment https://www.11ty.dev/docs/deployment/
[19] Deploying Hugo Sites on Cloudflare Pages with Decap CMS ... https://www.abhishek-tiwari.com/deploying-hugo-sites-on-cloudflare-pages-with-decap-cms-and-github-backend/
[20] DSCoalition/dsc-11ty-cms https://github.com/DSCoalition/dsc-11ty-cms
[21] Looking for a statically deployed site-builder / CMS that ... https://www.reddit.com/r/selfhosted/comments/145wk20/looking_for_a_statically_deployed_sitebuilder_cms/
[22] Community Contributed Plugins https://www.11ty.dev/docs/plugins/community/
