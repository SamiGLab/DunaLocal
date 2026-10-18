# DunaLocal — Budapest agency site (internal preview)

**Status: work in progress. Not a live or approved agency brand.** `DunaLocal` is the repository name; the final trade name has not been confirmed. The website uses a temporary LOCAL/OPS label.

## Local preview

Open `index.html` in a browser or run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Deployment plan (Cloudflare Pages)

1. Connect GitHub repository `SamiGLab/DunaLocal` in Cloudflare Pages when the owner is ready.
2. Framework preset: **None**; build command: **empty** (or `exit 0`); output directory: **`/`** / repository root. No package installation or build tool is needed.
3. Use the Cloudflare Pages **preview** environment until name, Hungarian copy, legal disclosures, actual business email, and deployment approval are completed.
4. `robots.txt` and the `noindex` meta tag block indexing but **do not make a URL private**. A Cloudflare preview URL remains publicly accessible to anyone who knows it. Use access control if confidentiality is required.

## Restrictions

No lead-collection form, payment, tracking scripts, analytics, cookies, or client data. Mock funnel shown for illustration only. Pilot fees are internal hypotheses, not a binding public offer. No real client testimonials or performance promises.

## Before public launch

- T015: approve trade name; check Hungarian trademark, domain and company-name conflicts.
- T016–T020: domain, identity, local Hungarian proofreading.
- T001–T006: work/fiscal model, GDPR, contracting and data privacy review.
- T024–T026: real business email, accessibility/mobile QA, SEO and deliberate publication approval.
