import { readFileSync } from "node:fs";
const html = readFileSync("index.html", "utf8");
const js = readFileSync("app.js", "utf8");
const css = readFileSync("styles.css", "utf8");
const robot = readFileSync("robots.txt", "utf8");
const headers = readFileSync("_headers", "utf8");
const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const required = [...new Set(keys)];
let failed = false;
for (const key of required) {
  const re = new RegExp('(?:^|[,\\s])' + key.replace(/[.*+?^\x24{}()|[\]\\]/g, "\\$&") + '\\s*:','m');
  if (!re.test(js)) { console.error("Missing translated key:", key); failed = true; }
}
if (!html.includes('name="robots" content="noindex,nofollow,noarchive"')) {console.error("Missing noindex meta"); failed=true;}
if (!robot.includes("Disallow: /")) {console.error("Missing robots disallow"); failed=true;}
if (!headers.includes("X-Robots-Tag: noindex")) {console.error("Missing noindex header"); failed=true;}
if (/<form[\s>]/i.test(html)) {console.error("Preview may not collect enquiries"); failed=true;}
if (/fetch\s*\(|XMLHttpRequest|localStorage|document\.cookie|gtag\s*\(/.test(js)) {console.error("Unexpected network/tracking code"); failed=true;}
if (!css.includes("@media(max-width:360px)")) {console.error("Small-screen rules missing"); failed=true;}
for (const id of ["method","pilot","questions","contact"]) if (!html.includes('id="' + id + '"')) {console.error("Missing section:",id); failed=true;}
if (failed) process.exit(1);
console.log("Preview checks passed:",required.length,"text keys, noindex, no tracking, mobile CSS.");
