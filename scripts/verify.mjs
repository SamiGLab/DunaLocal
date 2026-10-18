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
test(html.includes('<link rel="canonical" href="https://lokmira.com/">'), "Missing homepage self canonical");
test(html.includes('<link rel="alternate" hreflang="hu" href="https://lokmira.com/">'), "Missing homepage hu hreflang");
test(html.includes('<link rel="alternate" hreflang="en" href="https://lokmira.com/en/">'), "Missing homepage en hreflang");
test(html.includes('<link rel="alternate" hreflang="x-default" href="https://lokmira.com/">'), "Missing homepage x-default hreflang");
const enHome = readFileSync("en/index.html", "utf8");
const builtEnHome = readFileSync("dist/en/index.html", "utf8");
test(enHome === builtEnHome, "en/index.html source and dist out of sync");
test(enHome.includes('<html lang="en">'), "Missing lang=en on en/index.html");
test(enHome.includes(gscTag), "Missing GSC meta on en/index.html");
test(enHome.includes('name="robots" content="noindex,nofollow,noarchive"'), "Missing noindex meta on en/index.html");
test(enHome.includes('<link rel="canonical" href="https://lokmira.com/en/">'), "Missing self-canonical on en/index.html");
test(enHome.includes('<link rel="alternate" hreflang="hu" href="https://lokmira.com/">') && enHome.includes('<link rel="alternate" hreflang="en" href="https://lokmira.com/en/">'), "Missing reciprocal hreflang on en/index.html");
test(enHome.includes("<title>Lokmira | Local SEO, Google Ads & Customer Growth Budapest</title>"), "Missing English title on en/index.html");
test(enHome.includes("Make your business easier to find.") && enHome.includes('href="/en/services/"') && enHome.includes('href="/en/contact/"'), "English pre-rendered copy/routes missing on en/index.html");
test(!/AI-támogatott videó|AI-assisted video|tartalom-video|content-video/i.test(html+enHome+js+sitemap), "Unapproved AI-video positioning or old routes still public");
test(robot.includes("Disallow: /"), "Missing robots disallow");
test(robot.includes("Sitemap: https://lokmira.com/sitemap.xml"), "Sitemap discovery entry missing");
test(sitemap === builtSitemap, "Sitemap source and dist out of sync");
test(sitemap.includes('<loc>https://lokmira.com/</loc>') && sitemap.includes('<loc>https://lokmira.com/en/</loc>'), "Canonical HU/EN homepage URLs missing from sitemap");
test((sitemap.match(/<url>/g) || []).length === 18, "Expected HU/EN homepages and 16 localized agency pages in sitemap (18 URLs)");
test(!/workers\.dev/.test(sitemap), "Preview hostname leaked into planned production sitemap");
test(headers.includes("X-Robots-Tag: noindex"), "Missing noindex header");
test(headers.includes("Content-Security-Policy:"), "Missing CSP");
test(headers.includes("frame-ancestors 'none'"), "Missing anti-framing CSP");
test(html.includes('src="./brand/focus-mark.svg"'), "Lokmira navbar mark missing");
test(html.includes('src="./brand/focus-app-icon.svg"'), "Lokmira concept icon missing");
test(html.includes('href="./brand/favicon.svg"'), "Lokmira favicon missing");
test(html.includes("Lokmira") && !html.includes("LOCAL/OPS"), "Wrong preview brand");
test(html.includes('class="landing-root"'), "Premium homepage skin not applied");
test(!html.includes('class="preview"'),"Draft preview banner must not be visible");
test(!html.includes("belső arculatterv")&&!html.includes("Belső előnézet"),"Draft brand text present on homepage");
test(html.includes('data-i18n="contactAction"')&&html.includes('href="/hu/kapcsolat/"'),"Homepage contact CTA missing");
test(!html.includes('data-i18n="navPilot"'),"Homepage navigation must match inner-page four-item menu");

test(html.includes('href="./pages.css"'), "Premium homepage CSS link missing");
test(html.includes('data-route="services"') && html.includes('data-route="about"'), "Multi-page homepage links missing");
test(css.includes("@media(max-width:360px)"), "Mobile rules missing");
test(js.includes("Local SEO, Google Ads & Customer Growth Budapest") && js.includes("Helyi SEO, Google Ads és ügyfélszerzés Budapesten"), "Localized business homepage titles missing");
const notfound = readFileSync("404.html", "utf8");
test(notfound.includes("<title>404") && notfound.includes('href="/"'), "Missing 404 page");
test(!notfound.includes('style="'), "Inline 404 styles blocked by CSP");
test(!/<form[\s>]/i.test(html), "Preview must not collect enquiries");
test(!/fetch\s*\(|XMLHttpRequest|localStorage|document\.cookie|gtag\s*\(/.test(js), "Unexpected network/tracking code");
test(css.includes("@media(max-width:360px)"), "Small-screen rules missing");
test(html.includes('data-i18n="skip"'), "Accessible skip link missing");
test(!html.includes("149 000 Ft") && !html.includes("79 000 Ft"), "Unapproved numeric prices must not appear in public preview");
test(html.includes('data-i18n="priceStatus"'), "Pilot roadmap status missing");
test(js.includes('meta[property="og:title"]'), "Dynamic metadata missing");
test(html.includes("id=\"services\"") && html.includes("service-panels"), "Service overview is missing");
test(html.includes('data-i18n="pilotTitleA"') && html.includes('data-i18n="pilotTitleB"'), "Accessible two-line pilot heading missing");
test(html.includes('data-i18n="service4b"'), "Tracking service description missing");
for (const id of ["main","services","method","pilot","questions","contact"]) test(html.includes('id="' + id + '"'), "Missing section: " + id);
const {readdirSync, existsSync} = await import("node:fs");
const {join} = await import("node:path");
const pairs = {
 "hu/szolgaltatasok":"en/services", "hu/modszer":"en/approach",
 "hu/rolunk":"en/about", "hu/kapcsolat":"en/contact",
 "hu/helyi-seo":"en/local-seo", "hu/google-ads":"en/google-ads",
 "hu/kozossegi-media":"en/social-media", "hu/meres":"en/measurement"
};
for(const [huPath,enPath] of Object.entries(pairs)) {
 for(const [lang,route] of [["hu",huPath],["en",enPath]]) {
   const source=join(route,"index.html");
   const built=join("dist",route,"index.html");
   test(existsSync(source)&&existsSync(built),"Missing localized page: "+route);
   if(!existsSync(source)||!existsSync(built))continue;
   const src=readFileSync(source,"utf8"),dst=readFileSync(built,"utf8");
   test(src===dst,"Source/dist drift: "+route);
   test(!src.includes("site-topline"),"Draft strip still displayed on "+route);
   test(!/BELSŐ ELŐNÉZET|INTERNAL PREVIEW|WEBSITE DRAFT|Not a public offer/i.test(src),"Draft language in public presentation: "+route);
   test(!/AI-támogatott videó|AI-assisted video|tartalom-video|content-video|videóforgatókönyv/i.test(src),"Out-of-scope AI-video offer on "+route);
   test(src.includes('<html lang="'+lang+'"'),"Wrong page language: "+route);
   test(src.includes('name="robots" content="noindex,nofollow,noarchive"'),"Missing noindex: "+route);
   test(!/<form[\\s>]/i.test(src),"Unauthorized contact form: "+route);
   test(src.includes('name="google-site-verification"'),"Missing Google Search Console tag: "+route);
   const expectedCanonical='<link rel="canonical" href="https://lokmira.com/'+route+'/">';
   const alternateHu='<link rel="alternate" hreflang="hu" href="https://lokmira.com/'+huPath+'/">';
   const alternateEn='<link rel="alternate" hreflang="en" href="https://lokmira.com/'+enPath+'/">';
   test(src.includes(expectedCanonical),"Missing self-canonical: "+route);
   test(src.includes(alternateHu) && src.includes(alternateEn),"Missing bidirectional hreflang: "+route);
   test((src.match(/hreflang=/g)||[]).length===2,"Wrong number of language variants: "+route);
   test(src.includes('property="og:url" content="https://lokmira.com/'+route+'/"'),"Wrong social URL: "+route);
   test(src.includes('property="og:site_name" content="Lokmira"'),"Missing social brand: "+route);
   const pageTitle=src.match(/<title>([^<]+)<\/title>/)?.[1]||"";
   test(pageTitle.length>26 && pageTitle.includes("Lokmira"),"Weak SEO title: "+route);
   test(src.includes('href="/pages.css"'),"Dedicated page CSS not linked: "+route);
   test((src.match(/class="site-visual-number" aria-hidden="true"/g)||[]).length>=3,"Missing unified Lucide step icons: "+route);
   test(sitemap.includes("<loc>https://lokmira.com/"+route+"/</loc>"),"Sitemap route missing: "+route);
 }
}
test(readFileSync("pages.css","utf8")===readFileSync("dist/pages.css","utf8"),"Premium CSS deploy drift");
test(readFileSync("pages.js","utf8")===readFileSync("dist/pages.js","utf8"),"Premium JS deploy drift");
test(readdirSync("dist/hu").length===8 && readdirSync("dist/en").length===9,"Unexpected locale directory count (expected 8 in dist/hu, 8 + index.html in dist/en)");
const huFooters = new Set();
const enFooters = new Set();
for (const [huPath, enPath] of Object.entries(pairs)) {
  const huSrc = readFileSync(join(huPath, "index.html"), "utf8");
  const enSrc = readFileSync(join(enPath, "index.html"), "utf8");
  huFooters.add(huSrc.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] || "");
  enFooters.add(enSrc.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] || "");
  test(!enSrc.includes('href="/?lang=en"'), "English subpage still uses query-string home link instead of /en/: " + enPath);
}
test(huFooters.size === 1 && !huFooters.has(""), "Hungarian subpage footer template drift detected");
test(enFooters.size === 1 && !enFooters.has(""), "English subpage footer template drift detected");
for(const name of ["search","phone-call","file-text","circle-check","arrow-up-right","arrow-right","chart-no-axes-combined","target","megaphone","clipboard-check","users","message-square-text","share-2","map-pin","workflow","chart-column-increasing","LICENSE"].map(n=>n==="LICENSE"?n:n+".svg")){
  const path="icons/"+name;
  test(existsSync(path)&&existsSync("dist/"+path),"Missing pinned Lucide asset: "+name);
  if(existsSync(path)&&existsSync("dist/"+path)){
    const asset=readFileSync(path,"utf8");
    test(asset===readFileSync("dist/"+path,"utf8"),"Icon source/dist drift: "+name);
    if(name!=="LICENSE")test(asset.includes("<svg")&&asset.includes('viewBox="0 0 24 24"')&&!/<script|foreignObject|<image/i.test(asset),"Unexpected icon SVG: "+name);
  }
}
test(readFileSync("pages.css","utf8").includes("Lucide SVG icon system"),"Icon style system missing");


const allSourcePages=["index.html","en/index.html",...Object.entries(pairs).flatMap(([hu,en])=>[join(hu,"index.html"),join(en,"index.html")])];
for(const path of allSourcePages){
  const page=readFileSync(path,"utf8");
  const idSet=new Set([...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const links=[...page.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(m=>m[1]);
  test(links.length>0,"Page has no useful links: "+path);
  for(const href of links){
    if(/^https?:\/\//.test(href)||href.startsWith("mailto:")||href.startsWith("tel:"))continue;
    if(href==="#"||href.startsWith("javascript:")){test(false,"Dead/unsafe link "+href+" on "+path);continue;}
    if(href.startsWith("#")){test(idSet.has(href.slice(1)),"Broken in-page anchor "+href+" on "+path);continue;}
    const withoutHash=href.split("#")[0].split("?")[0];
    const local=withoutHash.startsWith("/")?withoutHash.slice(1):withoutHash.replace(/^\.\//,"");
    const target=local===""?"index.html":local.endsWith("/")?join(local,"index.html"):local;
    test(existsSync(target),"Internal link target missing "+href+" on "+path);
  }
  test(!/\b(?:info|hello|contact)@lokmira\.com\b/.test(page),"Unverified corporate email shown on "+path);
  test(!page.includes("—") && !page.includes("–"),"Em/en-dash found on "+path);
}
test(!js.includes("—") && !js.includes("–"),"Em/en-dash found in app.js");
test(readFileSync("hu/kapcsolat/index.html","utf8").includes("mailto:samigrowlab@gmail.com"),"Missing approved contact email on HU contact page");
test(readFileSync("en/contact/index.html","utf8").includes("mailto:samigrowlab@gmail.com"),"Missing approved contact email on EN contact page");

test(existsSync("_config.yml"), "Missing _config.yml GitHub Pages isolation config");
test(!existsSync(".nojekyll"), ".nojekyll must not exist in root or GitHub Pages branch builds will expose internal folders");
if (existsSync("_config.yml")) {
  const jekyllConfig = readFileSync("_config.yml", "utf8");
  for (const excluded of ["AGENTS.md", "README.md", "wrangler.jsonc", "wrangler.lokmira.jsonc", "dist", "docs", "scripts", "social", "design"]) {
    test(jekyllConfig.includes("- " + excluded), "_config.yml missing exclusion for " + excluded);
  }
}

if (failed) process.exit(1);
console.log("Static QA passed:",keys.length,"unique keys in both languages, safe preview, SEO metadata, mobile rules.");
