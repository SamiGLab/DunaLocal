import { readFileSync } from "node:fs";
const html = readFileSync("index.html", "utf8");
const js = readFileSync("app.js", "utf8");
const css = readFileSync("styles.css", "utf8");
const robot = readFileSync("robots.txt", "utf8");
const sitemap = readFileSync("sitemap.xml", "utf8");
const builtSitemap = readFileSync("dist/sitemap.xml", "utf8");
const headers = readFileSync("_headers", "utf8");
let failed = false;
function test(condition, failure) {
  if (!condition) { console.error(failure); failed = true; }
}
const keys = [...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]))];
const hu = js.split("hu: {")[1]?.split("  en: {")[0] ?? "";
const en = js.split("en: {")[1]?.split("\n};")[0] ?? "";
test(Boolean(hu && en), "Translations structure missing");
for (const [lang, section] of [["HU",hu],["EN",en]]) {
  for (const key of keys) {
    const matcher = new RegExp("(?:^|[,\\s])" + key + "\\s*:", "m");
    test(matcher.test(section), "Missing " + lang + " text key: " + key);
  }
}
const gscTag = '<meta name="google-site-verification" content="km1EpHT5L_IUzBBj709rZfeyxZ3zaUM86yIxYJ0nfJk" />';
test(html.includes(gscTag), "Google Search Console verification meta missing or changed");
test(html.split('name="google-site-verification"').length === 2, "Duplicate Google Search Console verification meta");
test(html.includes('name="robots" content="noindex,nofollow,noarchive"'), "Missing noindex meta");
test(robot.includes("Disallow: /"), "Missing robots disallow");
test(robot.includes("Sitemap: https://lokmira.com/sitemap.xml"), "Sitemap discovery entry missing");
test(sitemap === builtSitemap, "Sitemap source and dist out of sync");
test(sitemap.includes('<loc>https://lokmira.com/</loc>'), "Canonical homepage URL missing from sitemap");
test((sitemap.match(/<url>/g) || []).length === 1, "Sitemap should list the single currently existing page");
test(!/\/hu\/|\/en\/|workers\.dev/.test(sitemap), "Non-existent locale routes or preview host in sitemap");
test(headers.includes("X-Robots-Tag: noindex"), "Missing noindex header");
test(headers.includes("Content-Security-Policy:"), "Missing CSP");
test(headers.includes("frame-ancestors 'none'"), "Missing anti-framing CSP");
test(html.includes('src="./brand/focus-mark.svg"'), "Lokmira navbar mark missing");
test(html.includes('src="./brand/focus-app-icon.svg"'), "Lokmira concept icon missing");
test(html.includes('href="./brand/favicon.svg"'), "Lokmira favicon missing");
test(html.includes("Lokmira") && !html.includes("LOCAL/OPS"), "Wrong preview brand");
test(js.includes("Lokmira | Internal preview") && js.includes("Lokmira | Belső előnézet"), "Brand titles missing");
const notfound = readFileSync("404.html", "utf8");
test(notfound.includes("<title>404") && notfound.includes('href="/"'), "Missing 404 page");
test(!notfound.includes('style="'), "Inline 404 styles blocked by CSP");
test(!/<form[\s>]/i.test(html), "Preview must not collect enquiries");
test(!/fetch\s*\(|XMLHttpRequest|localStorage|document\.cookie|gtag\s*\(/.test(js), "Unexpected network/tracking code");
test(css.includes("@media(max-width:360px)"), "Small-screen rules missing");
test(html.includes('data-i18n="skip"'), "Accessible skip link missing");
test(!html.includes("149 000 Ft") && !html.includes("79 000 Ft"), "Unapproved numeric prices must not appear in public preview");
test(html.includes('data-i18n="priceStatus"'), "Pending pricing status missing");
test(js.includes('meta[property="og:title"]'), "Dynamic metadata missing");
test(html.includes("id=\"services\"") && html.includes("service-panels"), "Service overview is missing");
test(html.includes('data-i18n="pilotTitleA"') && html.includes('data-i18n="pilotTitleB"'), "Accessible two-line pilot heading missing");
test(html.includes('data-i18n="service4b"'), "Tracking service description missing");
for (const id of ["main","services","method","pilot","questions","contact"]) test(html.includes('id="' + id + '"'), "Missing section: " + id);
if (failed) process.exit(1);
console.log("Static QA passed:",keys.length,"unique keys in both languages, safe preview, SEO metadata, mobile rules.");
