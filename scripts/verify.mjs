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
test(!html.includes("hreflang="), "No separate English root URL is available; do not invent homepage alternate");
test(!/AI-támogatott videó|AI-assisted video|tartalom-video|content-video/i.test(html+js+sitemap), "Unapproved AI-video positioning or old routes still public");
test(robot.includes("Disallow: /"), "Missing robots disallow");
test(robot.includes("Sitemap: https://lokmira.com/sitemap.xml"), "Sitemap discovery entry missing");
test(sitemap === builtSitemap, "Sitemap source and dist out of sync");
test(sitemap.includes('<loc>https://lokmira.com/</loc>'), "Canonical homepage URL missing from sitemap");
test((sitemap.match(/<url>/g) || []).length === 17, "Expected homepage and 16 localized agency pages in sitemap");
test(!/workers\.dev/.test(sitemap), "Preview hostname leaked into planned production sitemap");
test(headers.includes("X-Robots-Tag: noindex"), "Missing noindex header");
test(headers.includes("Content-Security-Policy:"), "Missing CSP");
test(headers.includes("frame-ancestors 'none'"), "Missing anti-framing CSP");
test(html.includes('src="./brand/focus-mark.svg"'), "Lokmira navbar mark missing");
test(html.includes('src="./brand/focus-app-icon.svg"'), "Lokmira concept icon missing");
test(html.includes('href="./brand/favicon.svg"'), "Lokmira favicon missing");
test(html.includes("Lokmira") && !html.includes("LOCAL/OPS"), "Wrong preview brand");
test(html.includes('class="landing-root"'), "Premium homepage skin not applied");
test(html.includes('href="./pages.css"'), "Premium homepage CSS link missing");
test(html.includes('data-route="services"') && html.includes('data-route="about"'), "Multi-page homepage links missing");
test(css.includes("@media(max-width:360px)"), "Mobile rules missing");
test(js.includes("Local SEO & Google Ads Budapest") && js.includes("Helyi SEO és Google Ads Budapesten"), "Localized home titles missing");
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
   test(sitemap.includes("<loc>https://lokmira.com/"+route+"/</loc>"),"Sitemap route missing: "+route);
 }
}
test(readFileSync("pages.css","utf8")===readFileSync("dist/pages.css","utf8"),"Premium CSS deploy drift");
test(readFileSync("pages.js","utf8")===readFileSync("dist/pages.js","utf8"),"Premium JS deploy drift");
test(readdirSync("dist/hu").length===8 && readdirSync("dist/en").length===8,"Unexpected locale directory count");

const allSourcePages=["index.html",...Object.entries(pairs).flatMap(([hu,en])=>[join(hu,"index.html"),join(en,"index.html")])];
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
}

if (failed) process.exit(1);
console.log("Static QA passed:",keys.length,"unique keys in both languages, safe preview, SEO metadata, mobile rules.");
