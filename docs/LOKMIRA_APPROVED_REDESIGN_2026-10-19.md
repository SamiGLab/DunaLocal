# Approved Lokmira homepage release

The owner requested publication of the reviewed HU/EN homepage on 19 October 2026. Prior main commit: `3680d86a772c671eb37a31eecb4b29b526e42f3a`.

## Final scope

- Preserve all 20 existing service/company inner pages and their URLs, as well as sitemap, canonical/hreflang, GSC verification, noindex and security headers.
- Isolate the new homepage styles and runtime in landing.css / landing.js.
- Use the owner's original six service graphics, not replacement artwork. Reuse byte-identical optimized WebP assets already in the repository where possible; resize the supplied badges for web delivery.
- Use live HU/EN hero text and the original supplied right-hand illustration. Remove the requested visible concept labels and duplicate service footer text/buttons. Existing numeric content within supplied artwork is not newly verified evidence.
- Rebuild Before/After as four readable HTML comparison pairs; remove the bitmap and duplicate transcript disclosure.
- Keep real navigation links, language-specific URLs, mobile menu, FAQ and contact-information links. No new form, tracking or data collection.

## Validation

- Static checks: source/dist parity, 22 sitemap URLs, metadata, noindex/security policy, links and brand SVGs pass.
- Browser smoke: HU/EN homepages at 320, 360, 390, 768, 900, 1024, 1440 pixels; original graphics load, no horizontal overflow, language routing and menus work. All 20 inner pages return 200 and pass existing smoke checks.
- Homepage WCAG A/AA scans: HU/EN at 390 and 1440 pixels report zero violations or JavaScript errors.
- Localized-route accessibility scans: all configured mobile/desktop cases report zero violations or JavaScript errors.

Full manual/native-Hungarian proofreading and field performance metrics remain outside these automated checks. Indexing remains intentionally disabled as in the previous release.
