import { readFileSync } from "node:fs";
const html = readFileSync("index.html", "utf8");
const js = readFileSync("app.js", "utf8");
const css = readFileSync("styles.css", "utf8");
const robot = readFileSync("robots.txt", "utf8");
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
test(html.includes('name="robots" content="noindex,nofollow,noarchive"'), "Missing noindex meta");
test(robot.includes("Disallow: /"), "Missing robots disallow");
test(headers.includes("X-Robots-Tag: noindex"), "Missing noindex header");
test(headers.includes("Content-Security-Policy:"), "Missing CSP");
test(headers.includes("frame-ancestors 'none'"), "Missing anti-framing CSP");
const notfound = readFileSync("404.html", "utf8");
test(notfound.includes("<title>404") && notfound.includes('href="/"'), "Missing 404 page");
test(!notfound.includes('style="'), "Inline 404 styles blocked by CSP");
test(!/<form[\s>]/i.test(html), "Preview must not collect enquiries");
test(!/fetch\s*\(|XMLHttpRequest|localStorage|document\.cookie|gtag\s*\(/.test(js), "Unexpected network/tracking code");
test(css.includes("@media(max-width:360px)"), "Small-screen rules missing");
test(html.includes('data-i18n="skip"'), "Accessible skip link missing");
test(js.includes('meta[property="og:title"]'), "Dynamic metadata missing");
for (const id of ["main","method","pilot","questions","contact"]) test(html.includes('id="' + id + '"'), "Missing section: " + id);
if (failed) process.exit(1);
console.log("Static QA passed:",keys.length,"unique keys in both languages, safe preview, SEO metadata, mobile rules.");
