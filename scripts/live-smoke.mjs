import { readFileSync } from "node:fs";
// HTTP smoke test for the real public Cloudflare Worker URL.
// Runs on GitHub-hosted runner; local shell network access is not required.
// Production is indexable by owner approval; workers.dev previews remain noindex via host-specific headers.
const origin = process.env.LOKMIRA_PREVIEW_ORIGIN || "https://dunalocal.samiayten-hu.workers.dev";
const previewHost = new URL(origin).hostname.endsWith(".workers.dev");
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const expectedHome = readFileSync("dist/index.html", "utf8");
const expectedCss = readFileSync("dist/landing.css", "utf8");
const expectedJs = readFileSync("dist/landing.js", "utf8");
async function probe(path) {
  const response = await fetch(origin + path, {
    redirect:"follow",
    signal: AbortSignal.timeout(10000),
    headers: {"User-Agent":"Lokmira-GitHub-HTTP-Smoke/1.0"}
  });
  const body = await response.text();
  return {status:response.status, body, headers:response.headers, url:response.url};
}
let root;
let lastError = "";
for (let attempt = 1; attempt <= 12; attempt++) {
  try {
    const page = await probe("/");
    const titleOK = page.body.includes("<title>Lokmira") && page.body.includes('id="hero-title"') && page.body.includes('src="/brand/focus-mark.svg"');
    const css = await probe("/landing.css");
    const js = await probe("/landing.js");
    const matchingRelease = page.body === expectedHome && css.body === expectedCss && js.body === expectedJs;
    if (page.status === 200 && titleOK && matchingRelease) {
      root = page;
      console.log("Live homepage OK on attempt", attempt, "status", page.status, "URL", page.url);
      break;
    }
    lastError = "Home status " + page.status + ", expected HTML markers present: " + titleOK + ", live assets match GitHub: " + matchingRelease + ", snippet: " + page.body.slice(0,150).replace(/\s+/g," ");
  } catch (e) {lastError = String(e);}
  console.warn("Live check not ready, attempt", attempt, lastError);
  if (attempt < 12) await wait(12000);
}
if (!root) {console.error("FAIL live homepage:",lastError);process.exit(1);}
let issues = [];
if (!root.body.includes('<meta name="google-site-verification" content="km1EpHT5L_IUzBBj709rZfeyxZ3zaUM86yIxYJ0nfJk" />')) issues.push("Google Search Console verification meta missing from live Worker");
if (!root.body.includes('name="robots" content="index,follow"')) issues.push("Production index/follow meta missing");
if (!/src="\/landing\.js(?:\?[^"]*)?"/.test(root.body)) issues.push("landing.js reference missing");
if (!/href="\/landing\.css(?:\?[^"]*)?"/.test(root.body)) issues.push("landing.css reference missing");
const serverHeader = root.headers.get("server") || "unknown";
const allowLegacyPagesHeaders = process.env.LOKMIRA_ALLOW_GITHUB_PAGES_HEADERS === "1";
const robotsHeader = root.headers.get("x-robots-tag") || "";
if(previewHost && !robotsHeader.includes('noindex'))issues.push('Preview host noindex header missing');
if(!previewHost && /noindex|nofollow|none/i.test(robotsHeader))issues.push('Production indexing blocked by X-Robots-Tag');
if (!(root.headers.get("content-security-policy") || "").includes("connect-src 'none'")) {
  if (allowLegacyPagesHeaders) {
    console.warn("WARN: CSP header missing on", origin, "(Server:", serverHeader, "- cut over lokmira.com DNS to Cloudflare Worker to enforce _headers)");
  } else {
    issues.push("Live CSP missing required restrictions");
  }
}
for (const [path, marker] of [["/landing.css",".hero"],["/landing.js","const copy="],["/robots.txt","Allow: /"]]) {
  try {
    const r = await probe(path);
    if (r.status !== 200 || !r.body.includes(marker)) issues.push(path+" status/marker failed: "+r.status);
    console.log("Resource",path,"status",r.status,"length",r.body.length);
  } catch (e) {issues.push(path+" "+String(e));}
}
try {
  const response = await probe("/sitemap.xml");
  const expected = readFileSync("dist/sitemap.xml", "utf8");
  if (response.status !== 200 || response.body !== expected || !response.body.includes("<loc>https://lokmira.com/</loc>")) issues.push("Sitemap not deployed or mismatched");
  console.log("Sitemap /sitemap.xml", response.status, "matches GitHub", response.body === expected);
  const robotsResponse = await probe("/robots.txt");
  if (/^Disallow:\s*\/\s*$/m.test(robotsResponse.body)) issues.push("Production robots.txt blocks crawling");
  if (!robotsResponse.body.includes("Sitemap: https://lokmira.com/sitemap.xml")) issues.push("Robots sitemap declaration missing");
} catch (e) { issues.push("Sitemap live check: " + String(e)); }
// GitHub Pages publishes independently of this job; assets can briefly lag HTML.
// Retry only production asset parity. Worker preview is intentionally checked on demand.
const newAssets=[["/pages.css","dist/pages.css"],["/pages.js","dist/pages.js"]];
for(const [url,expectedFile] of newAssets){
 const expected=readFileSync(expectedFile,"utf8");
 let asset,matched=false;
 for(let attempt=1;attempt<=12;attempt++){
  try{
   asset=await probe(url);
   matched=asset.status===200&&asset.body===expected;
   if(matched)break;
   console.warn("Asset not yet published",url,"attempt",attempt,"status",asset.status);
  }catch(e){console.warn("Asset fetch pending",url,"attempt",attempt,String(e));}
  if(attempt<12)await wait(8000);
 }
 if(!matched)issues.push("Premium site asset failed or did not match deploy: "+url);
 console.log("Premium asset",url,asset?.status||"unavailable","matches",matched);
}
// Check the privacy-related fixes from the sitespeed.io evidence.
for(const [route,expectedType] of [["/manifest.json","json"]]){
 try{
  const r=await probe(route);
  const actualType=r.headers.get("content-type")||"";
  if(r.status!==200 || !actualType.includes(expectedType))issues.push("Manifest Content-Type not JSON on "+route+": "+r.status+" "+actualType);
  console.log("Manifest MIME",route,r.status,actualType);
 }catch(e){issues.push("Manifest validation failed: "+String(e));}
}
if(!root.body.includes('name="referrer" content="strict-origin-when-cross-origin"'))issues.push("Production homepage missing referrer policy declaration");
if(!root.body.includes('href="/manifest.json"'))issues.push("Production homepage still references legacy manifest MIME");
const siteRoutes=[...readFileSync('dist/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname).filter(path=>path!=='/');
for(const url of siteRoutes){
 try{
   const result=await probe(url);
   const file="dist"+url+"index.html";
   const expected=readFileSync(file,"utf8");
   if(!result.body.includes('name="referrer" content="strict-origin-when-cross-origin"')||!result.body.includes('href="/manifest.json"'))issues.push("Locale privacy meta / manifest reference missing: "+url);
   if(result.status!==200||result.body!==expected||!result.body.includes('name="robots" content="index,follow"')||(!previewHost && /noindex|nofollow|none/i.test(result.headers.get('x-robots-tag')||'')))issues.push("Locale page status/content mismatch: "+url);
   console.log("Localized page",url,result.status,"repo matched",result.body===expected);
 }catch(e){issues.push("Locale page "+url+": "+String(e));}
}
for(const name of ["search.svg","megaphone.svg","users.svg","chart-no-axes-combined.svg","arrow-up-right.svg"]){
  try{
    const route="/icons/"+name,r=await probe(route),expected=readFileSync("dist/icons/"+name,"utf8");
    if(r.status!==200||r.body!==expected||!r.body.includes("<svg"))issues.push("Missing or mismatched icon "+route);
    console.log("Lucide icon",route,"HTTP",r.status,"matches",r.body===expected);
  }catch(error){issues.push("Icon verification failed "+name+": "+String(error));}
}
for (const name of ["focus-mark.svg", "focus-app-icon.svg", "focus-logo.svg", "favicon.svg"]) {
  try {
    const url = "/brand/" + name;
    const r = await probe(url);
    const expected = readFileSync("dist/brand/" + name, "utf8");
    if (r.status !== 200 || r.body !== expected || !r.body.includes("<svg")) issues.push(url + " missing or out of sync");
    console.log("Brand vector", url, "status", r.status, "version matches", r.body === expected);
  } catch (e) { issues.push("Brand asset " + name + ": " + String(e)); }
}
const restrictedPaths = [
  "/docs/launch-gates-and-status.md",
  "/docs/launch-gates-and-status.html",
  "/docs/LOKMIRA_ana_yol_haritasi_2026-10-18.html",
  "/docs/T013_ilk_10_PPF_web_audit_kaynakli_2026-10-18.html",
  "/AGENTS.md",
  "/AGENTS.html",
  "/scripts/build.mjs",
  "/social/launch-kit.md",
  "/social/launch-kit.html",
  "/social/templates/lead-to-sale-card.svg",
  "/design/brand-alternatives/concept-1-typographic-mark.svg",
  "/wrangler.jsonc",
  "/dist/index.html"
];
for(const path of restrictedPaths) {
  try {
    const r=await probe(path);
    if(r.status!==404) issues.push("Internal path did not return 404: "+path+" ("+r.status+")");
    console.log("Restricted",path,"status",r.status);
  } catch(e){issues.push("Internal path check failed "+path+": "+String(e));}
}
if(issues.length){issues.forEach(x=>console.error("FAIL",x));process.exit(1);}
console.log("PASS: live release on", origin, "(Server:", serverHeader + ") matches committed HTML/CSS/JS, production indexing/preview isolation, and private-path 404 restrictions");
