# Lokmira — Codex project instructions

> **Owner positioning correction (2026-10-18, highest priority):** Lokmira is a **local customer-acquisition and digital marketing agency**, not an AI/video-production studio. **DO NOT advertise AI video production, video shoots, AI-generated films or similar as a customer-facing service** in navigation, service descriptions, SEO titles, page slugs, promotional material, or pricing. AI is an optional internal work method / historical add-on idea, not the Lokmira website proposition. Core: Google Business Profile + local SEO, Google Ads, **social media management and content planning**, enquiry / quote tracking and reporting. Initial sales offers: **Local Presence**, **Customer Growth**, and custom **Growth Partner**. Client outcomes matter, not content quantity. Third service route is now `/hu/kozossegi-media/` ↔ `/en/social-media/`; former AI-video URLs were removed from preview and sitemap. Do not reintroduce them. Keep ventures completely separate.


> **Status update 2026-10-18:** All **16 paired HU/EN inner pages already have reciprocal `hreflang` and self-canonical** tags, distinct descriptive SEO titles and OG language/URL metadata. The HU `/` home has a self-canonical; a separate indexable EN home is **not** yet available, so do not invent `/en/` alternate links. Four service pairs now contain explicitly **illustrative deliverable examples**, not approved packages. `scripts/verify.mjs` checks internal links/anchors and SEO parity; `scripts/a11y-routes.mjs` runs 20 extra WCAG scenarios. Active-contact CTA contrast was fixed. The remaining task is native Hungarian proofreading, user-approved logo/email/evidence, root localization architecture, domain/launch checks. See `docs/LOKMIRA_LAUNCH_CONTENT_EVIDENCE_GATE_2026-10-18.md`. Never undo these verified fixes.


This repository belongs to **Lokmira**, an independent Budapest-focused digital-marketing agency project. The connected GitHub repository/Cloudflare Worker may still be technically named `DunaLocal`; **do not** infer that renaming the UI/brand changes the underlying repository or Worker names. The owner owns `lokmira.com` according to their statement; DNS connection and public launch are separate and unverified until tested.

## Mission
Develop a **world-class, credible, bilingual Hungarian/English agency website** that gives Budapest service-business owners a clear reason to consider Lokmira. It must be persuasive through **clarity, craft, useful specifics, and a measurable sales-process methodology**, not through fabricated social proof.

## Brand and editorial direction
- Positioning: *local visibility → qualified enquiries → quotations → measurable business feedback*. Initial prospective pilot segment: premium vehicle protection / PPF; **the wider brand is industry-independent**.
- Palette: ink navy `#101820`, dark green `#236B50`, pale lime accent `#C0ED72`, warm-white `#F6F7F2`. Use large disciplined sans-serif typography, generous whitespace, premium editorial layouts, real geometric illustrations made from code (not fake dashboard metrics).
- **Focus / Discovery logo concept #2** in `brand/` is *provisional*, not owner-finalised. Do not introduce competing logo symbols or alter name without consent.
- No imaginary customer logos, testimonials, case-study metrics, partner badges, certifications, team photos, pricing, proprietary products, company addresses, statistics, client accounts or lead guarantees. Label all examples explicitly.
- Hungarian copy must be idiomatic, credible B2B Hungarian; English must be natural. Native Hungarian proofreading remains a release gate. Prefer concrete language over jargon and overclaiming.
- Site sections should answer: Who is this for? What problem? What do we actually do? What does the customer receive? How would we measure? Why trust the process? What is next? If business contact is not yet enabled, be transparent rather than showing a dead form.

## Source tree / current architecture
- `index.html`: primary HU homepage, English text-switching managed by `app.js`.
- `app.js`: bilingual dictionary and client-only navigation; no tracking, storage or network calls.
- `styles.css` + `pages.css`: responsive shared layout (including new editorial sections).
- `pages.js`: local mobile menu script for subpages.
- 16 individual static source pages: `hu/*/index.html` and `en/*/index.html` (8 pairs of services, methodology, about, contact, local SEO, Google Ads, social media and content management, measurement).
- `brand/`: four current original SVG redraws, including favicon.
- `sitemap.xml`: current root + 16 actual paths; keep accurate.
- `robots.txt`, `_headers`: current noindex, Disallow:/, CSP and anti-tracking protections.
- `dist/`: **COMMITTED** Cloudflare deployment mirror. Run `node scripts/build.mjs` and commit changes in both source and dist; CI checks exact parity.
- Tests: `node scripts/verify.mjs`, `node scripts/browser-smoke.mjs` (Chrome via Playwright), `python3 scripts/verify_brand_svgs.py`; GitHub Actions QA, accessibility, live Cloudflare smoke.
- Current Worker internal preview: `https://dunalocal.samiayten-hu.workers.dev/`. **Publicly accessible but deliberately noindexed**, not protected by authentication.
- Root Google Search Console meta-verification tag must stay exact. Domain-level ownership is not established by the meta tag alone.
- Root, HU and EN pages must not gain real contact forms, analytics scripts, cookies, pixels, external network requests, or user data processing without **separate owner approval**.

## Scope exclusions
The owner already has a Hungarian business, accountant, and permits. Company incorporation, accounting, tax, founder legal/permit work, and drafting contracts/privacy documents were **expressly cancelled/excluded**; never revive as work items. Do not tie in Kaftan Angelo, Mew & Maple, Etsy or other user ventures.

## Competitor reference (research ideas only, do not clone)
- Marketing21 `https://marketing21.hu/en/`: deep individual PPC/SEO/marketing service pages.
- Premium Studio `https://premiumstudio.hu/`: prominent hero, structured services, clear process/offer/CTA, authentic founder and project evidence.
- Growww Digital `https://www.growwwdigital.com/`: value proposition and documented client stories.
- INTREN `https://intren.hu/`: editorial expertise.
See `docs/LOKMIRA_rekabet_analizi_ve_site_yeniden_tasarim_2026-10-18.md` and `docs/LOKMIRA_DESIGN_V3_CODEX_BRIEF_2026-10-18.md`.
**Never reproduce other agencies' creative assets, copy, client results, or layout verbatim.**

## Design and UX acceptance
1. A distinctive, coherent design system shared by all 17 routes, with a professional first fold and helpful subpages. No templated repeated wall of cards.
2. Stable navigation at **320, 360, 390, 768, 1024, 1440** widths: no horizontal scroll, no broken menu, clear focus order, readable type.
3. HU/EN switching and route destinations correct; route-specific canonical and hreflang if deployed on real domain.
4. WCAG A/AA automation: 0 new violations in tested sizes and languages; manual keyboard and contrast spot checks.
5. All local links return HTTP 200; `sitemap.xml` mirrors real pages; real-worker HTML/CSS/JS/SVG parity checked.
6. Preserve `noindex`, `robots.txt Disallow: /`, `X-Robots-Tag`, strict CSP, no active contact, real GSC meta. NEVER silently enable indexing or production launch.
7. Produce evidence: screenshots at multiple breakpoints, CI URLs, implementation changelog, and a list of unverified claims/remaining release gates.
8. Do not claim flawless/perfect or live on `lokmira.com` without testing it.

## Next open work
- Improve information architecture and visual narrative, especially first-fold conversion clarity; make homepage and service detail pages visually distinct and business-grounded.
- Add realistic preview-only "what you get" outputs or audit deliverable samples **without fake client data**.
- Reduce duplicated CSS/HTML and improve maintainability without breaking Cloudflare assets build.
- Native-Hungarian proofreading and SEO hreflang/canonical, performance budgets (LCP/CLS), image/OG preparation, comprehensive a11y & link checks.
- Once user confirms exact email/channel and launch timing, propose a contact conversion path. No collection before approval.
- Domain and Worker/repo name changes are separate. Never switch Wrangler deployment target blindly.
