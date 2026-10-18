// Static Cloudflare Pages build & template synchronizer.
// Copies ONLY intentional public-preview assets, generates /en/index.html from index.html + app.js,
// and synchronizes shared header/footer templates across all 16 localized subpages.
import { mkdirSync, rmSync, copyFileSync, existsSync, statSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const out = "dist";
const assets = ["index.html", "styles.css", "app.js", "pages.css", "pages.js", "robots.txt", "sitemap.xml", "_headers", "404.html"];
const pageDirectories = ["hu/szolgaltatasok","en/services","hu/modszer","en/approach","hu/rolunk","en/about","hu/kapcsolat","en/contact","hu/helyi-seo","en/local-seo","hu/google-ads","en/google-ads","hu/kozossegi-media","en/social-media","hu/meres","en/measurement"];
const iconAssets = ["search","phone-call","file-text","circle-check","arrow-up-right","arrow-right","chart-no-axes-combined","target","megaphone","clipboard-check","users","message-square-text","share-2","map-pin","workflow","chart-column-increasing","LICENSE"].map(n=>n==="LICENSE"?n:n+".svg");
const brandAssets = ["focus-mark.svg", "focus-app-icon.svg", "focus-logo.svg", "favicon.svg"];

// 1. Extract bilingual dictionary from app.js and generate server-rendered en/index.html
const appJs = readFileSync("app.js", "utf8");
const copyMatch = appJs.match(/const copy = (\{[\s\S]*?\n\});/);
if (!copyMatch) {
  console.error("Failed to extract copy dictionary from app.js");
  process.exit(1);
}
const copyDict = vm.runInNewContext("(" + copyMatch[1] + ")");
const enCopy = copyDict.en;
const enRoutes = {
  services: "/en/services/",
  approach: "/en/approach/",
  about: "/en/about/",
  contact: "/en/contact/",
  seo: "/en/local-seo/",
  ads: "/en/google-ads/",
  social: "/en/social-media/",
  measurement: "/en/measurement/"
};
const escapeHtml = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

let enHome = readFileSync("index.html", "utf8");
enHome = enHome
  .replace('<html lang="hu">', '<html lang="en">')
  .replace('<meta property="og:url" content="https://lokmira.com/">', '<meta property="og:url" content="https://lokmira.com/en/">')
  .replace('<meta property="og:locale" content="hu_HU">', '<meta property="og:locale" content="en_US">')
  .replace('<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale:alternate" content="hu_HU">')
  .replace('<meta property="og:title" content="Lokmira | Helyi SEO, Google Ads és ügyfélszerzés Budapesten">', '<meta property="og:title" content="Lokmira | Local SEO, Google Ads & Customer Growth Budapest">')
  .replace('<meta property="og:description" content="Helyi SEO, Google Cégprofil, Google Ads, közösségi média és követhető ügyfélmegkeresések budapesti vállalkozásoknak.">', '<meta property="og:description" content="Local SEO, Google Ads, social media and measurable customer enquiries for Budapest service businesses.">')
  .replace('<meta name="description" content="Helyi SEO, Google Cégprofil, Google Ads, közösségi média és követhető ügyfélmegkeresések budapesti vállalkozásoknak.">', '<meta name="description" content="Local SEO, Google Ads, social media and measurable customer enquiries for Budapest service businesses.">')
  .replace('<title>Lokmira | Helyi SEO, Google Ads és ügyfélszerzés Budapesten</title>', '<title>Lokmira | Local SEO, Google Ads & Customer Growth Budapest</title>')
  .replace('<link rel="canonical" href="https://lokmira.com/">', '<link rel="canonical" href="https://lokmira.com/en/">')
  .replaceAll('href="./brand/favicon.svg"', 'href="/brand/favicon.svg"')
  .replaceAll('href="./styles.css"', 'href="/styles.css"')
  .replaceAll('href="./pages.css"', 'href="/pages.css"')
  .replaceAll('src="./app.js"', 'src="/app.js"')
  .replaceAll('src="./brand/focus-mark.svg"', 'src="/brand/focus-mark.svg"')
  .replaceAll('src="./brand/focus-app-icon.svg"', 'src="/brand/focus-app-icon.svg"')
  .replace('aria-label="Lokmira - lap teteje"', 'aria-label="Lokmira - back to top"')
  .replace('aria-label="Fő navigáció"', 'aria-label="Main navigation"')
  .replace('aria-label="Menü megnyitása"', 'aria-label="Open navigation menu"')
  .replace('<button class="lang active" data-lang="hu" aria-pressed="true">HU</button><span> / </span><button class="lang" data-lang="en" aria-pressed="false">EN</button>', '<button class="lang" data-lang="hu" aria-pressed="false">HU</button><span> / </span><button class="lang active" data-lang="en" aria-pressed="true">EN</button>');

enHome = enHome.replace(/(<([a-z0-9]+)\b[^>]*\bdata-route="([^"]+)"[^>]*>)/gi, (full, tag, _name, routeKey) => {
  if (!enRoutes[routeKey]) return full;
  return tag.replace(/\bhref="[^"]*"/, 'href="' + enRoutes[routeKey] + '"');
});
enHome = enHome.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi, (full, openTag, tagName, key, _inner, closeTag) => {
  if (!Object.prototype.hasOwnProperty.call(enCopy, key)) return full;
  return openTag + escapeHtml(enCopy[key]) + closeTag;
});

mkdirSync("en", { recursive: true });
const existingEnHome = existsSync("en/index.html") ? readFileSync("en/index.html", "utf8") : "";
if (existingEnHome !== enHome) {
  writeFileSync("en/index.html", enHome, "utf8");
}

// 2. Synchronize shared header brand links & canonical footers across all 16 subpages
const sharedFooters = {
  hu: '<footer class="site-footer"><div class="wrap site-footer-grid"><div><a class="site-brand" href="/"><img src="/brand/focus-mark.svg" alt="">lokmira</a><p>Helyi keresés, Google Ads és követhető ügyfélmegkeresések budapesti vállalkozásoknak.</p></div><div><h3>Szolgáltatások</h3><a href="/hu/helyi-seo/">Google Cégprofil és helyi SEO</a><a href="/hu/google-ads/">Google Ads és keresési kampányok</a><a href="/hu/kozossegi-media/">Közösségi média és tartalom</a><a href="/hu/meres/">Érdeklődés és ajánlatkövetés</a></div><div><h3>Lokmira</h3><a href="/hu/szolgaltatasok/">Szolgáltatások</a><a href="/hu/modszer/">Módszerünk</a><a href="/hu/rolunk/">Rólunk</a><a href="/hu/kapcsolat/">Kapcsolat</a></div></div><div class="wrap"><small>© Lokmira · Budapest · Helyi ügyfélszerzés</small></div></footer>',
  en: '<footer class="site-footer"><div class="wrap site-footer-grid"><div><a class="site-brand" href="/en/"><img src="/brand/focus-mark.svg" alt="">lokmira</a><p>Local visibility, Google Ads and clearer customer enquiries for Budapest businesses.</p></div><div><h3>Services</h3><a href="/en/local-seo/">Google Business Profile &amp; local SEO</a><a href="/en/google-ads/">Google Ads &amp; search campaigns</a><a href="/en/social-media/">Social media &amp; content</a><a href="/en/measurement/">Enquiry &amp; quote tracking</a></div><div><h3>Lokmira</h3><a href="/en/services/">Services</a><a href="/en/approach/">Our approach</a><a href="/en/about/">About</a><a href="/en/contact/">Contact</a></div></div><div class="wrap"><small>© Lokmira · Budapest · Local customer growth</small></div></footer>'
};

for (const page of pageDirectories) {
  const source = join(page, "index.html");
  if (!existsSync(source) || !statSync(source).isFile()) {
    console.error("Missing dedicated Lokmira page:", source);
    process.exit(1);
  }
  const lang = page.startsWith("hu/") ? "hu" : "en";
  const original = readFileSync(source, "utf8");
  let updated = original.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, sharedFooters[lang]);
  if (lang === "en") {
    updated = updated.replace('<a class="site-brand" href="/?lang=en"', '<a class="site-brand" href="/en/"');
  }
  if (updated !== original) {
    writeFileSync(source, updated, "utf8");
  }
}

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
mkdirSync(join(out,"icons"),{recursive:true});
for(const asset of iconAssets){
  const source=join("icons",asset);
  if(!existsSync(source)||!statSync(source).isFile()){console.error("Missing pinned icon asset:",source);process.exit(1);}
  copyFileSync(source,join(out,"icons",asset));
}
const iconActual=readdirSync(join(out,"icons")).sort();
if(iconActual.join("|")!==[...iconAssets].sort().join("|")){console.error("Icon deploy bundle mismatch",iconActual);process.exit(1);}
const brandActual = readdirSync(join(out, "brand")).sort();
if (brandActual.join("|") !== [...brandAssets].sort().join("|")) {
  console.error("Unexpected public brand bundle", brandActual);
  process.exit(1);
}
for (const page of pageDirectories) {
  const source = join(page, "index.html");
  const target = join(out, page);
  mkdirSync(target, { recursive: true });
  copyFileSync(source, join(target, "index.html"));
}
copyFileSync(join("en", "index.html"), join(out, "en", "index.html"));
for (const lang of ["hu", "en"]) {
  const expected = pageDirectories.filter(p => p.startsWith(lang + "/")).map(p => p.split("/")[1]);
  if (lang === "en") expected.push("index.html");
  expected.sort();
  const actual = readdirSync(join(out, lang)).sort();
  if (actual.join("|") !== expected.join("|")) {
    console.error("Unexpected localized page bundle", lang, actual);
    process.exit(1);
  }
}
const actual = readdirSync(out).sort();
const expected = [...assets, "brand", "icons", "hu", "en"].sort();
if (actual.join("|") !== expected.join("|")) {
  console.error("Unexpected build output", actual);
  process.exit(1);
}
console.log("Cloudflare Pages preview build OK:", actual.join(", "));
