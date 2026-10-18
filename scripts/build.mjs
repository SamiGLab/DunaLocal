// Static Cloudflare Pages build. Copies ONLY intentional public-preview assets.
// Do not expose repository docs, internal reports, draft sales kits or scripts on Pages.
import { mkdirSync, rmSync, copyFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";
const out = "dist";
const assets = ["index.html", "styles.css", "app.js", "pages.css", "pages.js", "robots.txt", "sitemap.xml", "_headers", "404.html"];
const pageDirectories = ["hu/szolgaltatasok","en/services","hu/modszer","en/approach","hu/rolunk","en/about","hu/kapcsolat","en/contact","hu/helyi-seo","en/local-seo","hu/google-ads","en/google-ads","hu/kozossegi-media","en/social-media","hu/meres","en/measurement"];
const brandAssets = ["focus-mark.svg", "focus-app-icon.svg", "focus-logo.svg", "favicon.svg"];
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const asset of assets) {
  if (!existsSync(asset) || !statSync(asset).isFile()) {
    console.error("Missing public asset:", asset);
    process.exit(1);
  }
  copyFileSync(asset, join(out, asset));
}
mkdirSync(join(out, "brand"), { recursive: true });
for (const asset of brandAssets) {
  const source = join("brand", asset);
  if (!existsSync(source) || !statSync(source).isFile()) {
    console.error("Missing brand asset:", source);
    process.exit(1);
  }
  copyFileSync(source, join(out, "brand", asset));
}
const brandActual = readdirSync(join(out, "brand")).sort();
if (brandActual.join("|") !== [...brandAssets].sort().join("|")) {
  console.error("Unexpected public brand bundle", brandActual);
  process.exit(1);
}
for (const page of pageDirectories) {
  const source = join(page, "index.html");
  if (!existsSync(source) || !statSync(source).isFile()) {
    console.error("Missing dedicated Lokmira page:", source);
    process.exit(1);
  }
  const target = join(out, page);
  mkdirSync(target, { recursive: true });
  copyFileSync(source, join(target, "index.html"));
}
for (const lang of ["hu", "en"]) {
  const expected = pageDirectories.filter(p => p.startsWith(lang + "/")).map(p => p.split("/")[1]).sort();
  const actual = readdirSync(join(out, lang)).sort();
  if (actual.join("|") !== expected.join("|")) {
    console.error("Unexpected localized page bundle", lang, actual);
    process.exit(1);
  }
}
const actual = readdirSync(out).sort();
const expected = [...assets, "brand", "hu", "en"].sort();
if (actual.join("|") !== expected.join("|")) {
  console.error("Unexpected build output", actual);
  process.exit(1);
}
console.log("Cloudflare Pages preview build OK:", actual.join(", "));
