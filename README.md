> **PROJECT NAME UPDATE — 2026-10-18:** The owner selected **Lokmira** as the agency/site name for all next planning and design drafts. `DunaLocal` is still the technical GitHub repository and Cloudflare Worker name; the website itself displays **Lokmira** and now has a bilingual multi-page internal preview. **Owner confirmed purchasing `lokmira.com` on 2026-10-18; registrar/DNS control has not been independently tested. `lokmira.hu` availability, trademark clearance and public launch remain unverified/unapproved.** Active step-by-step scope, status and release gates: [Lokmira master roadmap](./docs/LOKMIRA_ana_yol_haritasi_2026-10-18.md) / [Google Drive roadmap](https://docs.google.com/document/d/1YncxE0AkLJ2Rx0HmLCvoKGQdmEo7ZGyKA1-ivDgHmGQ/edit). Existing earlier brand notes below are historical.\n\n**PREVIEW BRAND IMPLEMENTATION:** Lokmira Focus / Discovery concept 2 is integrated as a **provisional, not owner-finalized** logo system in index/app/styles and dist. See [L03 technical and safety report](./docs/L03_lokmira_site_kimligi_2026-10-18.md). The site remains noindex, with contact disabled, and `lokmira.com` DNS/launch is not connected. Alternative concept 1/3 marks remain in source-only `design/brand-alternatives/`.\n\n# Lokmira — Budapest digital marketing agency site (internal preview)

**Status: Lokmira concept deployed to a noindex internal preview — public commercial launch not approved.** The connected GitHub repository is still technically named `DunaLocal` and the Cloudflare Worker is still named `dunalocal` until the owner completes repository/Worker settings changes. The website brand is Lokmira, but the final logo concept is not yet owner-approved. See [rename and domain handoff](./docs/LOKMIRA_repo_worker_rename_domain_handoff_2026-10-18.md).

## Current site v2 — competitor-informed, HU/EN multi-page preview

**2026-10-18 implementation:** A comparative review of [six Budapest digital agencies](./docs/LOKMIRA_rekabet_analizi_ve_site_yeniden_tasarim_2026-10-18.md) informed a cleaner premium design and a **17-URL** site. Source+deployed `dist/` include the homepage, 8 Hungarian pages, and 8 English pages. Both share `pages.css` and a minimal no-tracking `pages.js`.

| Hungarian | English | Content |
|---|---|---|
| `/hu/szolgaltatasok/` | `/en/services/` | Service overview |
| `/hu/modszer/` | `/en/approach/` | How work would happen; proposed 90-day pilot |
| `/hu/rolunk/` | `/en/about/` | Honest, pre-launch positioning |
| `/hu/kapcsolat/` | `/en/contact/` | Contact status; no fake form/email |
| `/hu/helyi-seo/` | `/en/local-seo/` | Google Business Profile / local SEO |
| `/hu/google-ads/` | `/en/google-ads/` | Google Search campaigns |
| `/hu/tartalom-video/` | `/en/content-video/` | Content and AI-assisted video |
| `/hu/meres/` | `/en/measurement/` | Enquiry and quote tracking |

The `sitemap.xml` now maps only these **real** 17 routes. Google Search Console ownership on `lokmira.com` and public submission are **not** verified. The `noindex`, `Disallow: /`, no-active-contact and anti-tracking protections are intentionally intact.

**Validated CI:** [quality and mobile](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536615), [automated accessibility](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536605), [real Worker HTTP](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536611), [Cloudflare deploy](https://github.com/SamiGLab/DunaLocal/actions/runs/39148536555). Native-Hungarian copy QA, logo final approval, genuine portfolio evidence and live email remain pending.

## Local preview

Open `index.html` in a browser or run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Cloudflare Workers deployment (existing project)

- GitHub repository: `SamiGLab/DunaLocal`; branch: `main`.
- Cloudflare Worker: `dunalocal`, originally created by the project owner.
- Verified internal preview: `https://dunalocal.samiayten-hu.workers.dev/` (real Cloudflare HTTP and 16 localized subpages independently checked through GitHub Actions; still **noindex**, not approved commercial launch).
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
- T001/T002/T003/T004/T006 **CANCELED by the owner**. Company, tax, permits, legal agreements and founder finance are not assistant responsibilities.
- T024–T026: real business email, accessibility/mobile QA, SEO and deliberate publication approval.

## Current deliverables and evidence (18 October 2026)

- [Bilingual HU/EN homepage source](./index.html) — internal concept with real Chrome responsive smoke test.
- [Social launch kit — HU/EN copy](./social/launch-kit.md): LinkedIn/Facebook/Instagram profile drafts, three opening posts, creative specifications.
- Editable social SVG graphics: [lead-to-sale](./social/templates/lead-to-sale-card.svg), [audit questions](./social/templates/audit-questions-card.svg), [90-day pilot](./social/templates/90-day-pilot-card.svg).
- [Status and legal/brand/publication gates](./docs/launch-gates-and-status.md).
- [Successful five-viewport Chrome test and screenshots](https://github.com/SamiGLab/DunaLocal/actions/runs/39110708259): 320, 360, 390, 768 and 1440 px. Screenshots are available as a workflow artifact.

**Not completed:** finalized brand/domain, HU-native review, real contact channel, final public launch approval, any live sale or testimonial. All social assets are unpublished drafts.

### Internal preview safety and diagnostics

- Cloudflare Workers Static Assets serves `dist/` and supports a `_headers` file. The preview now has a restrictive CSP and a dedicated bilingual `404.html` fallback. A crawler noindex directive **does not** enforce privacy.
- Live HTTP was independently verified from a GitHub-hosted runner: page HTTP 200, CSS/JS/robots 200, noindex and restricted internal URLs 404. Evidence: https://github.com/SamiGLab/DunaLocal/actions/runs/39114246359 . This is a publicly reachable INTERNAL PREVIEW, not an approved agency launch.
- After new commits, verify the Cloudflare deployment references the same commit SHA as `main`. A manual build event or dashboard setting might not track push automatically.

## Scope reset 18 October 2026

The owner explicitly canceled company-admin work (T001/T002/T003/T004/T006). The assistant continues only with brand, web, Hungarian copy, marketing, candidate verification, sales kits and demos. Older company-related notes are historical and should never be treated as active tasks. [Current operational roadmap](./docs/operasyon-oncelikleri_2026-10-18.md).

### Marketing research deliverables
- [T013: 10 distinct evidence-backed PPF prospect web audits](./docs/T013_ilk_10_PPF_web_audit_kaynakli_2026-10-18.md). These are **public-source research notes**, not claims of known marketing failures or proof of 10 qualified buyers. No outreach was performed.
