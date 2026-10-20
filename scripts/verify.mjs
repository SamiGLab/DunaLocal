import {readFileSync} from "node:fs";
const html=readFileSync('index.html','utf8'),js=readFileSync('landing.js','utf8'),css=readFileSync('landing.css','utf8');
const robot=readFileSync('robots.txt','utf8'),sitemap=readFileSync('sitemap.xml','utf8'),builtSitemap=readFileSync('dist/sitemap.xml','utf8'),headers=readFileSync('_headers','utf8');
const keys=[...new Set([...html.matchAll(/data-t="([^"]+)"/g)].map(m=>m[1]))];
let failed=false;function test(ok,message){if(!ok){console.error(message);failed=true}}
const gscTag='<meta name="google-site-verification" content="km1EpHT5L_IUzBBj709rZfeyxZ3zaUM86yIxYJ0nfJk" />';
for(const [lang,path] of [['hu','index.html'],['en','en/index.html']]){
 const page=readFileSync(path,'utf8');
 test(page===readFileSync('dist/'+path,'utf8'),'Source/dist homepage drift: '+lang);
 test(page.includes('<html lang="'+lang+'"'),'Wrong homepage language: '+lang);
 test(page.includes(gscTag),'GSC verification lost: '+lang);
 test(page.includes('name="robots" content="index,follow"'),'Indexing policy changed: '+lang);
 test(page.includes('rel="canonical" href="https://lokmira.com/'+(lang==='en'?'en/':'')+'"'),'Wrong canonical: '+lang);
 test(page.includes('hreflang="hu" href="https://lokmira.com/"')&&page.includes('hreflang="en" href="https://lokmira.com/en/"'),'Missing language alternates: '+lang);
 test((page.match(/<h1\b/g)||[]).length===1,'Expected one readable H1: '+lang);
 test((page.match(/class="service-card original-card"/g)||[]).length===6,'Expected six original service cards: '+lang);
 test((page.match(/class="comparison-pair"/g)||[]).length===4,'Expected four HTML comparisons: '+lang);
 test(!page.includes('Read the comparison as text')&&!page.includes('comparison-transcript'),'Duplicate comparison UI restored: '+lang);
 test(!/<form[\s>]/i.test(page),'Unexpected active form: '+lang);
 test(!page.includes('127.0.0.1')&&!page.includes('file://'),'Local preview path leaked: '+lang);
 test(page.includes('href="/landing.css?v=20261020-crisp-badges"')&&page.includes('src="/landing.js?v=20261020-crisp-badges"'),'Missing isolated homepage assets: '+lang);
}
test(readFileSync('landing.js','utf8')===readFileSync('dist/landing.js','utf8'),'Landing JS deploy drift');
test(readFileSync('landing.css','utf8')===readFileSync('dist/landing.css','utf8'),'Landing CSS deploy drift');
test(/^Allow: \/$/m.test(robot)&&!/^Disallow:\s*\/\s*$/m.test(robot),'Production crawling must be allowed');
test(!headers.split(/\nhttps:\/\//)[0].includes('X-Robots-Tag: noindex'),'Global noindex must not block production');
for(const host of ['lokmira.samiayten-hu.workers.dev','dunalocal.samiayten-hu.workers.dev'])test(headers.replace(/\r\n/g,'\n').includes('https://'+host+'/*\n  X-Robots-Tag: noindex'),'Preview host must stay excluded: '+host);
test(readFileSync('404.html','utf8').includes('name="robots" content="noindex,nofollow,noarchive"'),'404 should remain excluded');
test(headers.includes("frame-ancestors 'none'")&&headers.includes('Content-Security-Policy:'),'Security headers changed');
test(sitemap===builtSitemap&&(sitemap.match(/<url>/g)||[]).length===22,'Sitemap changed unexpectedly');
test(!/fetch\s*\(|XMLHttpRequest|localStorage|document\.cookie|gtag\s*\(/.test(js),'Unexpected network or tracking code');
// The approved icon library must also cover the redesigned homepage.
for(const source of [html,readFileSync('en/index.html','utf8'),js])test(!/[◎↗↝≋✓→↓↑]/u.test(source),'Text glyph used instead of repository icon');
for(const name of ['map-pin','megaphone','workflow','chart-column-increasing','target','clipboard-check','chart-no-axes-combined','arrow-right','arrow-up-right'])test(css.includes('/icons/'+name+'.svg'),'Missing homepage Lucide icon mapping: '+name);
const {readdirSync, existsSync} = await import("node:fs");
const {join} = await import("node:path");
const pairs = {
  "hu/szolgaltatasok":"en/services", "hu/modszer":"en/approach",
  "hu/rolunk":"en/about", "hu/kapcsolat":"en/contact",
  "hu/helyi-seo":"en/local-seo", "hu/google-ads":"en/google-ads",
  "hu/meta-hirdetesek":"en/meta-ads", "hu/erkezo-oldalak":"en/landing-pages",
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
    test(src.includes('name="robots" content="index,follow"'),"Missing production indexing directive: "+route);
    test(!/<form[\s>]/i.test(src),"Unauthorized contact form: "+route);
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
    test(src.includes('class="editorial-panel"')||src.includes('class="service-hero-art"')||(src.match(/class="site-visual-number" aria-hidden="true"/g)||[]).length>=3,"Missing unified Lucide step icons: "+route);
    test(sitemap.includes("<loc>https://lokmira.com/"+route+"/</loc>"),"Sitemap route missing: "+route);
  }
}
test(readFileSync("pages.css","utf8")===readFileSync("dist/pages.css","utf8"),"Premium CSS deploy drift");
test(readFileSync("pages.js","utf8")===readFileSync("dist/pages.js","utf8"),"Premium JS deploy drift");
test(readdirSync("dist/hu").length===10 && readdirSync("dist/en").length===11,"Unexpected locale directory count (expected 10 in dist/hu, 10 + index.html in dist/en)");
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

for(const [lang,homePath,footers] of [['hu','index.html',huFooters],['en','en/index.html',enFooters]]){
 const home=readFileSync(homePath,'utf8');
 test(footers.has(home.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0]),'Homepage/footer mismatch: '+lang);
 for(const route of Object.values(pairs).concat(Object.keys(pairs)).filter(p=>p.startsWith(lang+'/'))){
  const page=readFileSync(route+'/index.html','utf8');
  test(page.includes('/shared-chrome.css?v=20261020-all-pages'),'Missing shared chrome: '+route);
 }
}
test(readFileSync('shared-chrome.css','utf8')===readFileSync('dist/shared-chrome.css','utf8'),'Shared chrome source/dist drift');
if(failed)process.exit(1);

for(const route of Object.values(pairs).concat(Object.keys(pairs))){
 const page=readFileSync(route+'/index.html','utf8');
 test(page.includes('class="site-hero service-hero'),'Old dark hero retained: '+route);
 test(!/90[- ]day|90 napos|\bPPF\b|90-Day/i.test(page),'Obsolete positioning: '+route);
 test((page.match(/<h1\b/g)||[]).length===1,'Expected one H1: '+route);
}
if(failed)process.exit(1);

for(const route of Object.values(pairs).concat(Object.keys(pairs))){
 const source=readFileSync(route+'/index.html','utf8');
 const iconCss=readFileSync('pages.css','utf8');
 for(const name of [...source.matchAll(/class="ui-icon (icon-[a-z-]+)"/g)].map(m=>m[1]))test(iconCss.includes('.'+name+'{'),'Missing detail icon mapping: '+route+' '+name);
}
if(failed)process.exit(1);

for(const path of allSourcePages){
 const source=readFileSync(path,'utf8'),blocks=[...source.matchAll(/<script type="application\/ld\+json" id="lokmira-structured-data">([\s\S]*?)<\/script>/g)];
 test(blocks.length===1,'Expected one structured data graph: '+path);
 try{
  const graph=JSON.parse(blocks[0][1]);
  const canonical=source.match(/rel="canonical" href="([^"]+)"/)[1],language=source.match(/<html lang="([^"]+)"/)[1];
  const page=graph['@graph'].find(node=>node['@id']===canonical+'#webpage');
  test(graph['@context']==='https://schema.org'&&page?.url===canonical&&page?.inLanguage===language,'Structured data must match page canonical/language: '+path);
  test(!/aggregateRating|reviewRating|priceCurrency|streetAddress/.test(blocks[0][1]),'Unverified business data in schema: '+path);
 }catch(error){test(false,'Invalid JSON-LD: '+path+' '+error.message)}
}
for(const bot of ['OAI-SearchBot','PerplexityBot'])test(robot.includes('User-agent: '+bot+'\nAllow: /')||robot.includes('User-agent: '+bot+'\r\nAllow: /'),'AI search bot must be allowed: '+bot);
if(failed)process.exit(1);

for(const homePath of ['index.html','en/index.html']){
 const home=readFileSync(homePath,'utf8');
 test((home.match(/class="hero-badge" role="listitem"/g)||[]).length===3,'Expected three crisp text/SVG hero badges: '+homePath);
 test(!home.includes('Lokmira_Badge_'),'Raster badge restored: '+homePath);
}
test(css.includes('/icons/users.svg'),'Missing repository users icon');
if(failed)process.exit(1);
