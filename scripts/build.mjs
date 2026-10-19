// Static Cloudflare Pages build & template synchronizer.
// Copies ONLY intentional public-preview assets, generates /en/index.html from index.html + app.js,
// and synchronizes shared header/footer templates across all 16 localized subpages.
import { mkdirSync, rmSync, copyFileSync, existsSync, statSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "dist";
const assets = ["index.html", "landing.css", "landing.js", "shared-chrome.css", "styles.css", "app.js", "pages.css", "pages.js", "robots.txt", "sitemap.xml", "_headers", "404.html", "favicon.ico"];
const pageDirectories = [
  "hu/szolgaltatasok","en/services",
  "hu/modszer","en/approach",
  "hu/rolunk","en/about",
  "hu/kapcsolat","en/contact",
  "hu/helyi-seo","en/local-seo",
  "hu/google-ads","en/google-ads",
  "hu/meta-hirdetesek","en/meta-ads",
  "hu/erkezo-oldalak","en/landing-pages",
  "hu/kozossegi-media","en/social-media",
  "hu/meres","en/measurement"
];
const iconAssets = ["search","phone-call","file-text","circle-check","arrow-up-right","arrow-right","chart-no-axes-combined","target","megaphone","clipboard-check","users","message-square-text","share-2","map-pin","workflow","chart-column-increasing","LICENSE"].map(n=>n==="LICENSE"?n:n+".svg");
const brandAssets = ["focus-mark.svg", "focus-app-icon.svg", "focus-logo.svg", "favicon.svg"];

// 2. Synchronize shared header brand links & canonical footers across all localized subpages
const sharedFooters = {
  hu: '<footer class="site-footer"><div class="wrap site-footer-grid"><div><a class="site-brand" href="/"><img src="/brand/focus-mark.svg" alt="">lokmira<span class="chrome-dot">.</span></a><p>Helyi keresés, Google Ads és követhető ügyfélmegkeresések budapesti vállalkozásoknak.</p></div><div><h3>Szolgáltatások</h3><a href="/hu/helyi-seo/">Google Cégprofil és helyi SEO</a><a href="/hu/google-ads/">Google Ads és keresési kampányok</a><a href="/hu/meta-hirdetesek/">Meta hirdetések és lead kampányok</a><a href="/hu/erkezo-oldalak/">Konverziós érkezőoldalak</a><a href="/hu/kozossegi-media/">Közösségi média és tartalom</a><a href="/hu/meres/">Érdeklődés és ajánlatkövetés</a></div><div><h3>Lokmira</h3><a href="/hu/szolgaltatasok/">Szolgáltatások</a><a href="/hu/modszer/">Módszerünk</a><a href="/hu/rolunk/">Rólunk</a><a href="/hu/kapcsolat/">Kapcsolat</a></div></div><div class="wrap"><small>© 2026 Lokmira · Budapest · Helyi ügyfélszerzés</small></div></footer>',
  en: '<footer class="site-footer"><div class="wrap site-footer-grid"><div><a class="site-brand" href="/en/"><img src="/brand/focus-mark.svg" alt="">lokmira<span class="chrome-dot">.</span></a><p>Local visibility, Google Ads and clearer customer enquiries for Budapest businesses.</p></div><div><h3>Services</h3><a href="/en/local-seo/">Google Business Profile &amp; local SEO</a><a href="/en/google-ads/">Google Ads &amp; search campaigns</a><a href="/en/meta-ads/">Meta ads &amp; lead campaigns</a><a href="/en/landing-pages/">Conversion landing pages</a><a href="/en/social-media/">Social media &amp; content</a><a href="/en/measurement/">Enquiry &amp; quote tracking</a></div><div><h3>Lokmira</h3><a href="/en/services/">Services</a><a href="/en/approach/">Our approach</a><a href="/en/about/">About</a><a href="/en/contact/">Contact</a></div></div><div class="wrap"><small>© 2026 Lokmira · Budapest · Local customer growth</small></div></footer>'
};

for(const [lang,path] of [["hu","index.html"],["en","home/en.html"]]){
 const original=readFileSync(path,"utf8");
 let updated=original.replace(/<footer[\s\S]*?<\/footer>/,sharedFooters[lang]);
 if(!updated.includes('/shared-chrome.css'))updated=updated.replace('</head>','<link rel="stylesheet" href="/shared-chrome.css?v=20261020-all-pages"></head>');
 if(updated!==original)writeFileSync(path,updated,"utf8");
}
// 1. Mirror the approved server-rendered English homepage.
// HU is index.html; EN is maintained in home/en.html so both work without JavaScript.
const enHome=readFileSync("home/en.html","utf8");
mkdirSync("en",{recursive:true});
if(!existsSync("en/index.html")||readFileSync("en/index.html","utf8")!==enHome){writeFileSync("en/index.html",enHome,"utf8")}

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
  const home=lang==="hu"?"/":"/en/";
  const pairHu=original.match(/hreflang="hu" href="https:\/\/lokmira.com([^"]+)"/)?.[1];
  const pairEn=original.match(/hreflang="en" href="https:\/\/lokmira.com([^"]+)"/)?.[1];
  const labels=lang==="hu"?["Szolgáltatások","Így dolgozunk","Rólunk","Kapcsolat","Menü megnyitása","Fő navigáció"]:["Services","Our approach","About us","Get in touch","Open navigation","Main navigation"];
  const links=lang==="hu"?["/hu/szolgaltatasok/","/hu/modszer/","/hu/rolunk/","/hu/kapcsolat/"]:["/en/services/","/en/approach/","/en/about/","/en/contact/"];
  const nav=links.slice(0,3).map((href,i)=>`<a href="${href}"${href===`/${page}/`?' aria-current="page"':''}>${labels[i]}</a>`).join('');
  const head=`<header class="site-head"><div class="wrap site-head-inner"><a class="site-brand" href="${home}" aria-label="Lokmira"><img src="/brand/focus-mark.svg" width="38" height="38" alt="">lokmira<span class="chrome-dot">.</span></a><nav id="site-nav" class="site-nav" aria-label="${labels[5]}">${nav}<a class="mobile-contact" href="${links[3]}">${labels[3]}</a></nav><div class="site-nav-end"><div class="site-langs" aria-label="Language"><a href="${pairHu}"${lang==='hu'?' aria-current="page"':''}>HU</a><span>/</span><a href="${pairEn}"${lang==='en'?' aria-current="page"':''}>EN</a></div><a class="nav-cta ui-link-icon" href="${links[3]}">${labels[3]}</a><button class="site-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="${labels[4]}"><span></span><span></span></button></div></div></header>`;
  updated=updated.replace(/<header class="site-head">[\s\S]*?<\/header>/,head);
  if(!updated.includes('/shared-chrome.css'))updated=updated.replace('</head>','<link rel="stylesheet" href="/shared-chrome.css?v=20261020-all-pages"></head>');
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
mkdirSync(join(out, "images"), { recursive: true });
if (existsSync("images")) {
  for (const file of readdirSync("images")) {
    copyFileSync(join("images", file), join(out, "images", file));
  }
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
const expected = [...assets, "brand", "icons", "images", "hu", "en"].sort();
if (actual.join("|") !== expected.join("|")) {
  console.error("Unexpected build output", actual);
  process.exit(1);
}
console.log("Cloudflare Pages preview build OK:", actual.join(", "));
