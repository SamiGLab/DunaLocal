// HTTP smoke test for the real public Cloudflare Worker URL.
// Runs on GitHub-hosted runner; local shell network access is not required.
// The Worker is currently a noindex internal preview, not an approved public brand.
const origin = "https://dunalocal.samiayten-hu.workers.dev";
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function probe(path) {
  const response = await fetch(origin + path, {
    redirect:"follow",
    signal: AbortSignal.timeout(10000),
    headers: {"User-Agent":"DunaLocal-GitHub-HTTP-Smoke/1.0"}
  });
  const body = await response.text();
  return {status:response.status, body, headers:response.headers, url:response.url};
}
let root;
let lastError = "";
for (let attempt = 1; attempt <= 6; attempt++) {
  try {
    const page = await probe("/");
    const titleOK = page.body.includes("<title>LOCAL/OPS") && page.body.includes('data-i18n="heroLead"');
    if (page.status === 200 && titleOK) {
      root = page;
      console.log("Live homepage OK on attempt", attempt, "status", page.status, "URL", page.url);
      break;
    }
    lastError = "Home status " + page.status + ", expected HTML markers present: " + titleOK + ", snippet: " + page.body.slice(0,150).replace(/\s+/g," ");
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
for (const [path, marker] of [["/styles.css",".hero{"],["/app.js","const copy ="],["/robots.txt","Disallow: /"]]) {
  try {
    const r = await probe(path);
    if (r.status !== 200 || !r.body.includes(marker)) issues.push(path+" status/marker failed: "+r.status);
    console.log("Resource",path,"status",r.status,"length",r.body.length);
  } catch (e) {issues.push(path+" "+String(e));}
}
for(const path of ["/docs/launch-gates-and-status.md", "/scripts/build.mjs", "/social/launch-kit.md"]) {
  try {
    const r=await probe(path);
    if(r.status===200) issues.push("Internal material publicly exposed: "+path);
    console.log("Restricted",path,"status",r.status);
  } catch(e){console.warn("Internal path check unavailable",path,String(e));}
}
if(issues.length){issues.forEach(x=>console.error("FAIL",x));process.exit(1);}
console.log("PASS: live site, noindex, CSS, JS, robots and private-path restrictions");
