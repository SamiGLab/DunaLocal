# DunaLocal — Budapest agency site (internal preview)

**Status: work in progress. Not a live or approved agency brand.** `DunaLocal` is the repository name; the final trade name has not been confirmed. The website uses a temporary LOCAL/OPS label.

## Local preview

Open `index.html` in a browser or run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Deployment plan (Cloudflare Pages)

1. Connect GitHub repository `SamiGLab/DunaLocal` in Cloudflare Pages when the owner is ready.
2. Framework preset: **None**; build command: **empty** (or `exit 0`); output directory: **`.`** (repository root, where `index.html` lives). No package installation or build tool is needed.
3. Use the Cloudflare Pages **preview** environment until name, Hungarian copy, legal disclosures, actual business email, and deployment approval are completed.
4. `robots.txt` and the `noindex` meta tag block indexing but **do not make a URL private**. A Cloudflare preview URL remains publicly accessible to anyone who knows it. Use access control if confidentiality is required.

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
