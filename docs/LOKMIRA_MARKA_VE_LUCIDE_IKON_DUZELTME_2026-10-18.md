# Lokmira — Corrected Brand Positioning & Lucide Icon System
**18 October 2026 · Owner feedback implemented**

## Non-negotiable brand positioning
Lokmira is a Budapest-centered digital marketing and local-customer-acquisition agency. Customer-facing messaging focuses on:
- Google Business Profile / local SEO
- Google Ads search campaigns
- Social media account management and content planning
- Tracking qualified enquiries, quotes and business feedback

**Do not sell AI video or video production as a Lokmira website service.** Internal use of AI or historical ideas for optional add-ons must not become the brand proposition without a new explicit decision. Broader brand is not restricted to PPF/detailing; that was merely first pilot research.

## Code changes
- Replaced the two AI-video service detail pages with substantive HU/EN **social-media and content management** pages.
- Migrated the public paths to `/hu/kozossegi-media/` and `/en/social-media/`; removed obsolete files, updated links across all 17 pages, static build, browser tests, Accessibility tests, live Worker smoke and sitemap. Maintained canonical + two-way hreflang, noindex and Google site-verification.
- Replaced inconsistent Unicode symbols in homepage customer journey, service areas, reporting cards, example audit and arrows.
- Pinned **16 Lucide 1.59.0 icons** to the repository `icons/`, distributing exact source copies to `dist/icons/`, including the complete `ISC` LICENSE from the icon authors. 24×24 SVG with 2 px consistent stroke. No external JS package, font files, request to third-party icons API or new runtime dependency.
- Shared `pages.css` uses CSS `mask` and inherited foreground colors so icons work on dark and light backgrounds, with decorative markup properly `aria-hidden`.
- Quality tests ensure local icons match sources and the public webpage contains no out-of-scope AI video offer. Live tests check actual Worker SVG URLs and source byte parity.

## Quality / risk gates
- Code and repo deployment, Chrome/mobile browser, automated Axe and real Cloudflare Worker HTTP smoke must pass on the **same final commit** before marking this complete.
- Native Hungarian copy still needs independent human review.
- Logo Focus/Discovery is a **provisional** brand symbol, not changed in this task.
- No corporate email, client testimonials or guaranteed results invented.
- Live domain `lokmira.com` and Google Search Console ownership, public commercial launch / indexing remain separately gated. Preview keeps `robots.txt Disallow:/`, noindex and CSP.
- Possible polish work later: genuine client examples, structured Local Presence / Customer Growth offer descriptions and a verified business email.

## Sources
- https://lucide.dev/license — Lucide ISC license.
- https://github.com/lucide-icons/lucide/tree/1.59.0/icons — 1.59.0 icon source.
- `AGENTS.md` and `docs/LOKMIRA_ana_yol_haritasi_2026-10-18.md` reflect the owner's corrected priorities.
