# DunaLocal — Budapest agency site (internal preview)

**Status: work in progress. Not a live or approved agency brand.** `DunaLocal` is the repository name; the final trade name has not been confirmed. The website uses a temporary LOCAL/OPS label.

## Local preview

Open `index.html` in a browser or run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Cloudflare Workers deployment (existing project)

- GitHub repository: `SamiGLab/DunaLocal`; branch: `main`.
- Cloudflare Worker: `dunalocal`, originally created by the project owner.
- Expected publicly reachable preview: `https://dunalocal.samiayten-hu.workers.dev/` (the app URL is confirmed from the owner's Cloudflare screenshot; live HTTP response has not been independently verified).
- Current Cloudflare dashboard settings: **Build command: None**, **Deploy command: `npx wrangler deploy`**. These can remain unchanged.
- `wrangler.jsonc` sets the Worker name and `assets.directory` to `./dist`. The `dist/` folder is **intentionally committed** to Git so the existing no-build Workers workflow can upload only site files.
- When changing `index.html`, `styles.css`, `app.js`, `robots.txt`, or `_headers`, also run `node scripts/build.mjs` and commit the resulting `dist/` changes. CI validates that deployed assets match their sources.
- The internal planning documents, sales kits, test files and source scripts are **not** included in `dist/` and therefore are not distributed as site assets.
- Public worker address does not mean public launch approval: the site is an **internal concept** with noindex, blocked robots, disabled contact and provisional pricing. Visitors who know the URL can still view it; Cloudflare Access is needed for true privacy.

## Restrictions

No lead-collection form, payment, tracking scripts, analytics, cookies, or client data. Mock funnel shown for illustration only. Pilot fees are internal hypotheses, not a binding public offer. No real client testimonials or performance promises.

## Before public launch

- T015: approve trade name; check Hungarian trademark, domain and company-name conflicts.
- T016–T020: domain, identity, local Hungarian proofreading.
- T001–T006: work/fiscal model, GDPR, contracting and data privacy review.
- T024–T026: real business email, accessibility/mobile QA, SEO and deliberate publication approval.

## Current deliverables and evidence (18 October 2026)

- [Bilingual HU/EN homepage source](./index.html) — internal concept with real Chrome responsive smoke test.
- [Social launch kit — HU/EN copy](./social/launch-kit.md): LinkedIn/Facebook/Instagram profile drafts, three opening posts, creative specifications.
- Editable social SVG graphics: [lead-to-sale](./social/templates/lead-to-sale-card.svg), [audit questions](./social/templates/audit-questions-card.svg), [90-day pilot](./social/templates/90-day-pilot-card.svg).
- [Status and legal/brand/publication gates](./docs/launch-gates-and-status.md).
- [Successful five-viewport Chrome test and screenshots](https://github.com/SamiGLab/DunaLocal/actions/runs/39110708259): 320, 360, 390, 768 and 1440 px. Screenshots are available as a workflow artifact.

**Not completed:** finalized brand/domain, HU-native review, company/legal/tax approval, real contact channel, Cloudflare Pages deployment, any live sale or testimonial. All social assets are unpublished drafts.

### Internal preview safety and diagnostics

- Cloudflare Workers Static Assets serves `dist/` and supports a `_headers` file. The preview now has a restrictive CSP and a dedicated bilingual `404.html` fallback. A crawler noindex directive **does not** enforce privacy.
- Live HTTP and DNS resolution of the workers.dev site must be checked from the owner's browser / Cloudflare Deployment logs: external requests from this assistant's environment were unsuccessful at the time of verification. Do not mark the Cloudflare production deployment as confirmed solely because GitHub CI succeeds.
- After new commits, verify the Cloudflare deployment references the same commit SHA as `main`. A manual build event or dashboard setting might not track push automatically.
