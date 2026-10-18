# Lokmira — Premium Website V3 · Complete Codex Design/Implementation Brief
**Date:** 2026-10-18 · **Status:** In-progress noindex design preview · **Owner request:** competitor-informed high-end redesign and Codex handoff

## Intent and benchmark conclusions
The previous one-page website was perceived as weak/unconvincing. A 17-URL HU/EN structure was added earlier but its visual hierarchy, repeated page components and concrete trust narrative were still underdeveloped. An effective site must win attention quickly, earn the right to be evaluated and make the buyer's next step obvious—while keeping the status and evidence honest.

References (structural benchmark, NOT copy or design source):
- Premium Studio, https://premiumstudio.hu/ — full agency storytelling: vivid hero, services, process, authentic founder/project proof, FAQ, clear CTA.
- Marketing21, https://marketing21.hu/en/ — deep, separable service pages and scale/competency narrative backed by real expertise.
- Growww Digital, https://www.growwwdigital.com/services/ and https://www.growwwdigital.com/references/ — outcome-oriented language, multiple services and actual evidence (do not emulate claimed numbers).
- Budapest agency analysis archived at `docs/LOKMIRA_rekabet_analizi_ve_site_yeniden_tasarim_2026-10-18.md`.

**Do not clone competitors.** Their real staff, customer proof, metrics, clients and images belong to them; Lokmira does not possess equivalent assets yet.

## Primary target persona & positioning
Business owners/operators of **Budapest local service firms** with real, high-value enquiries (vehicle care is initial *research/pilot segment*, not exclusive niche). Buyers want:
1. A trustworthy way to be found in local searches and via Google Business Profile;
2. Spending on Google Search only where intent is relevant;
3. Clear brand/content alignment;
4. A traceable enquiry-to-quote workflow, not impression graphs;
5. An understandable scope, deliverables, communication cadence and decision checkpoints.

Proposed central promise (not a performance guarantee):
- HU: **“Legyen a vállalkozásod megtalálható. Az érdeklődés pedig követhető.”**
- EN: **“Make your business easier to find. Make every enquiry easier to understand.”**
Tone: analytical and approachable, concise, practical; eliminate jargon where specifics can be given.

## Visual direction (V3)
- Global tokens: **navy #101820** / deep night #0E1A20; forest **#236B50**; lime accent **#C0ED72**; warm off-white **#F6F7F2**; nuanced gray-green surfaces.
- A system of generous editorial grids, contrast-driven hero, intentionally drawn orbital/local-discovery motif, strong type scale, restrained hover states, no stock-photo crutches. Decorative visuals must not impersonate dashboards or fake clients.
- Homepage sections in order: (1) hero positioning + real CTA to dedicated services; (2) three evidence-free operating principles; (3) three visitor-problem questions; (4) distinct four-capability service tiles; (5) search/quote/report workflow; (6) demonstrative **audit checklist** prominently labelled as NOT client data; (7) “trust should be earned” transparency; (8) **90-day phase roadmap** instead of fake price card; (9) practical FAQ; (10) honest inactive-contact section.
- Inner pages share coherent component system but use distinct editorial content and better cross-navigation.
- Mark `brand/focus-mark.svg` **provisional**—avoid calling it final or creating a fake endorsed logo.

## Technical details
- GitHub: `SamiGLab/DunaLocal` (technical rename to `SamiGLab/Lokmira` has NOT been confirmed). This repo is the source; latest deployment preview `https://dunalocal.samiayten-hu.workers.dev/`.
- Files: `index.html`, `app.js`, `styles.css`, `pages.css`, `pages.js`, all `hu/*/index.html` and `en/*/index.html`, `brand/`, `scripts/build.mjs`, `scripts/verify.mjs`, `scripts/browser-smoke.mjs`.
- **`dist/` is committed**, built via `node scripts/build.mjs`; source/dist must be equal. Cloudflare automatic deploy may occur from main.
- Root language toggle JS changes text in place, while individual 16 routes use true HU/EN URLs. Before indexing, consider whether to build true `/hu/` and `/en/` landing pages for clean hreflang, with deliberate redirects. Avoid duplicate home pages and inaccurate canonical claims.
- `sitemap.xml` currently lists 17 existing URLs; keep accurate. `google-site-verification` token must be preserved EXACTLY from source. The mere presence of token is NOT proof of `lokmira.com` Search Console ownership.
- Domain was bought according to user, registrar/DNS/HTTPS custom-domain integration unverified; do not change DNS, Wrangler name or GitHub repo settings from code alone.

## Security/release hard gates — do not break
- All preview pages currently carry `noindex,nofollow,noarchive`; `robots.txt Disallow: /` and `X-Robots-Tag` enforce noindex. Preserve them until explicit launch approval.
- `_headers` CSP forbids external network connections, cookies and form actions. Do not add analytics, fetch(), third-party fonts, ChatGPT embeds, signup forms, storage or tracking pixels.
- Do not create functional contact form or show an unverified mail address; `info@lokmira.com` is an idea, NOT a confirmed email mailbox.
- No false 5-star review strip, “100+ clients”, badges, testimonials, client logos, case-study images, employee credentials, financing/legal text or manufactured conversion numbers.
- Company administration, tax, accounting, founder permits and legal contract/privacy drafting explicitly OUT OF SCOPE.
- Keep project completely independent of any other user ventures.

## Actionable next improvements for Codex
**Design QA**: inspect actual screenshots from GitHub Actions (5 viewport widths), conduct manual visual review to catch overly dense pages, line-wraps, hover contrast, rhythm, real-world mobile ergonomics. 17 pages must share a deliberate system, not look like generated boilerplate.

**SEO**: improve genuine HU/EN paired URL `hreflang` tags and canonical consistency; solve root EN toggle's non-indexable alternate content when the commercial site goes public. Ensure HTML meta description and OG consistent with each page; avoid unsupported future URLs; sitemap only real routes.

**Accessibility/performance**: run axe HU/EN, keyboard-only nav, focus ring, skip link, contrast, reduced motion; test Chrome 320/360/390/768/1024/1440; test all routes and interlinks, PDF/JS blocked CSP issues, LCP/CLS. No unreviewed external dependencies.

**Credibility/content**: native-Hungarian copy edit; further articulate what a customer actually receives (sample audit deliverable, role of each service, pilot checkpoints, reporting examples). Screenshots of work should be based on actual earned results or clearly labelled *illustrative internal examples*.

**Contact**: build a contact section architecture with a properly configured and verified business mailbox once owner provides it; never make up a phone/address or flip a contact form live before approval.

**Deployment**: run `node scripts/build.mjs`, commit generated `dist/`, check GitHub Actions full CI and real Cloudflare Worker HTTP + headers/sitemap; no public domain/SEO launch without user approval.

## Definition of done — measurable
- 17 routes from sitemap all actually return 200; navigation has no dead links.
- 5+ viewport widths for main root + targeted 16 locale routes with horizontal overflow 0.
- 0 new automated WCAG A/AA violations and JS runtime errors.
- Snapshot screenshots inspected (not only generated); keyboard and language switching manually reviewed.
- Source/dist exact byte parity, GSC token retained, noindex/robots/CSP and 404 private-path restriction intact.
- Written QA report with passing GitHub Actions URLs, caveats and remaining open items.
- No unverified claims—**never** declare “perfect” or “fully public” absent concrete independent review.

## Evidence
- `docs/LOKMIRA_rekabet_analizi_ve_site_yeniden_tasarim_2026-10-18.md`
- `docs/LOKMIRA_ana_yol_haritasi_2026-10-18.md`
- `docs/L09_sitemap_kurulumu_2026-10-18.md`
- `AGENTS.md`: persistent machine-readable repository instructions for Codex.
