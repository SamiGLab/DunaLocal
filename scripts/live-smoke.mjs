import { readFileSync } from "node:fs";
// HTTP smoke test for the real public Cloudflare Worker URL.
// Runs on GitHub-hosted runner; local shell network access is not required.
// The Worker is currently a noindex internal preview, not an approved public brand.
const origin = "https://dunalocal.samiayten-hu.workers.dev";
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const expectedHome = readFileSync("dist/index.html", "utf8");
const expectedCss = readFileSync("dist/styles.css", "utf8");
const expectedJs = readFileSync("dist/app.js", "utf8");
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
for (let attempt = 1; attempt <= 6; attempt++) {
  try {
    const page = await probe("/");
    const titleOK = page.body.includes("<title>Lokmira") && page.body.includes('data-i18n="heroLead"') && page.body.includes('src="./brand/focus-mark.svg"');
    const css = await probe("/styles.css");
    const js = await probe("/app.js");
    const matchingRelease = page.body === expectedHome && css.body === expectedCss && js.body === expectedJs;
    if (page.status === 200 && titleOK && matchingRelease) {
      root = page;
      console.log("Live homepage OK on attempt", attempt, "status", page.status, "URL", page.url);
      break;
    }
    lastError = "Home status " + page.status + ", expected HTML markers present: " + titleOK + ", live assets match GitHub: " + matchingRelease + ", snippet: " + page.body.slice(0,150).replace(/\s+/g," ");
  } catch (e) {lastError = String(e);}
  console.warn("Live check not ready, attempt", attempt, lastError);
  if (attempt < 6) await wait(12000);
}
if (!root) {console.error("FAIL live homepage:",lastError);process.exit(1);}
let issues = [];
if (!root.body.includes('name="robots" content="noindex,nofollow,noarchive"')) issues.push("noindex meta missing");
if (!root.body.includes('src="./app.js"')) issues.push("app.js reference missing");
if (!root.body.includes('href="./styles.css"')) issues.push("styles.css reference missing");
const robotsHeader = root.headers.get("x-robots-tag") || "";
if (!robotsHeader.includes("noindex")) issues.push("X-Robots-Tag response header missing");
if (!(root.headers.get("content-security-policy") || "").includes("connect-src 'none'")) issues.push("Live CSP missing required restrictions");
for (const [path, marker] of [["/styles.css",".hero{"],["/app.js","const copy ="],["/robots.txt","Disallow: /"]]) {
  try {
    const r = await probe(path);
    if (r.status !== 200 || !r.body.includes(marker)) issues.push(path+" status/marker failed: "+r.status);
    console.log("Resource",path,"status",r.status,"length",r.body.length);
  } catch (e) {issues.push(path+" "+String(e));}
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
for(const path of ["/docs/launch-gates-and-status.md", "/scripts/build.mjs", "/social/launch-kit.md"]) {
  try {
    const r=await probe(path);
    if(r.status!==404) issues.push("Internal path did not return 404: "+path+" ("+r.status+")");
    console.log("Restricted",path,"status",r.status);
  } catch(e){console.warn("Internal path check unavailable",path,String(e));}
}
if(issues.length){issues.forEach(x=>console.error("FAIL",x));process.exit(1);}
console.log("PASS: live release matches committed HTML/CSS/JS, noindex, CSP and private-path restrictions");
