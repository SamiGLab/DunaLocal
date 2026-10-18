# DunaLocal — Budapest agency site (internal preview)

**Status: work in progress. Not a live or approved agency brand.** `DunaLocal` is the repository name; the final trade name has not been confirmed. The website uses a temporary LOCAL/OPS label.

## Local preview

Open `index.html` in a browser or run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Deployment plan (Cloudflare Pages)

1. Connect GitHub repository `SamiGLab/DunaLocal` in Cloudflare Pages when the owner is ready.
2. Framework preset: **None**; production branch **`main`**; root directory **repository root**; build command **`node scripts/build.mjs`**; output directory **`dist`**. No external dependencies are needed. The build deliberately excludes internal planning documents and social drafts.
3. **Do not click Save and Deploy until you intend to create a publicly reachable `*.pages.dev` URL.** Git integration deploys the `main` branch to production. To use a separate preview branch, configure a different production branch and protect preview URLs appropriately. The current code is only an unfinished internal concept.
4. `robots.txt`, `noindex`, and `X-Robots-Tag` discourage indexing but **do not make any URL private**. Cloudflare Access is required to restrict visitors; protecting Preview Deployments does not automatically protect the default production `*.pages.dev` URL.

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
