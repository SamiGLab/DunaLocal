# Release gates and next tasks — Budapest agency

**Last reviewed:** 2026-10-18. **Repository:** `SamiGLab/DunaLocal`. **Current state:** Cloudflare Workers Static Assets internal preview is online at https://dunalocal.samiayten-hu.workers.dev/ . HTTP 200 and static resources were confirmed from GitHub-hosted CI: https://github.com/SamiGLab/DunaLocal/actions/runs/39114246359 . This is not an approved final agency launch.

## Work that has actual repository deliverables
- **T021 / T022 (draft):** HU/EN single-page concept and responsive UI are in `index.html`, `styles.css`, and `app.js`. Not locally proofread by a Hungarian specialist.
- **T023 (development in progress):** functional static-site concept in GitHub main.
- **T025 (live-preview implementation):** title, meta description, Open Graph text, language-dependent metadata, semantic sections, noindex header, robots.txt, browser responsive styles, automated checks. **Public SEO launch NOT complete**, because there is no approved name, final domain or public site.
- **T034–T036 (draft deliverables):** `social/launch-kit.md` with channel profiles, three HU/EN posts, editable design-template specification, plus `social/templates/lead-to-sale-card.svg`.
- Previous artifact pack provided editable **T027–T031** sales drafts. Do not label them externally approved without legal/HU QA.

## USER SCOPE UPDATE — 18 October 2026
**T001/T002/T003/T004/T006 were canceled at the user's explicit instruction.** Company, accountant, tax, work/residence permit, legal contracts/GDPR and founder finance are owner-managed and not assistant tasks. Do not revisit them. T005 Hungarian language support is active. Contact forms remain disabled unless owner provides approved launch details.

## Hard dependencies: do not silently mark completed
- **T015** agency name must be explicitly approved by the user. `DunaLocal` is the GitHub repo name only. `LOCAL/OPS` is a disposable internal site placeholder.
- **T016 / T017** verify brand, company name, .hu/.com domains, social usernames; create final wordmark and favicon only AFTER T015.
- **T001/T002/T003/T004/T006** CANCELED; excluded from assistant work and not marked complete.
- **T005 / T020 / T033** identify Hungarian native-speaking sales/language reviewer; have site and sales scripts checked.
- **T024** activate a REAL, authorized professional email only after domain and legal review; current site has **no live contact destination**.
- **T026** no public publication until owner specifically approves. GitHub public repository does not equal published website.
- **T032** working CRM demo should reflect the first three actual discovery calls; draft diagrams are not a deployed CRM.
- **T037** social account creation and publishing require owner permission, company/admin access and final brand.
- **T038–T048** prospect outreach, discovery, sales, payment, dated Go/No-Go evidence; never invent contacts or conversions.

## Technical SEO: staging vs launch
### Implemented and testable now
- Semantic sections and headings, mobile viewport, HU/EN text toggles.
- Hungarian-first page title/description and language-sensitive title, description, Open Graph metadata.
- `<meta name="robots" content="noindex,nofollow,noarchive">`, `robots.txt` disallow and `_headers` X-Robots-Tag to keep the internal preview out of search where respected.
- No analytics script, cookie, form, payment widget, third-party tracker or client data.
- Automated checks in `.github/workflows/ci.yml`.

### Publish-release checklist (NOT done)
1. Approve brand and verify domain/trademark conflicts. Company administration is owner-managed.
2. Replace every `LOCAL/OPS`, `BELSŐ ELŐNÉZET`, `INTERNAL PREVIEW`, `BELSŐ ÁRAZÁSI HIPOTÉZIS` and unapproved pricing mention with reviewed public content.
3. Use only the owner-approved final public offer; no tax, contract or accounting work.
4. Integrate public business/legal notices only if supplied and approved by the owner.
5. Approve and verify real contact email (and optional form only when privacy basis/processor/retention notices are in place).
6. Native Hungarian proofreading and English editorial review.
7. Approve brand graphics, favicon and social sharing image with correct final domain.
8. Only then update robots/noindex for PUBLIC production. Set canonical URLs and correct HU/EN alternate strategy (single-page language toggle is not equivalent to two indexable locale URLs).
9. Visual QA at 320, 360, 390, 768, 1440 px; keyboard, contrast, screen-reader basics, Lighthouse Core Web Vitals and broken links.
10. Cloudflare Workers preview already exists; request explicit owner's public launch approval. Do not confuse an accessible preview URL with private access; use Cloudflare Access if confidentiality matters.
11. Verify Google Search Console/analytics only after applicable privacy controls are approved and configured.

## Workflow for the next iteration
1. Collect user choice on T015 from grounded shortlist (never infer from repo title).
2. Meanwhile, keep HU/EN prototype and social templates stable; iterate mobile/QA without touching public production.
3. Finalize T027–T031 in the approved brand; get local-language review.
4. Skip canceled company tasks. Continue Hungarian editorial support, candidate auditing and marketing outputs.
5. Preserve the separate Codex **40-candidate, 32-activity-matched, 8-pending** workbook; the original v9 with 30 entries is historical. Do not overwrite the newer workbook.
