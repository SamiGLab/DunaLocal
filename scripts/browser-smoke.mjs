import { pathToFileURL } from "node:url";
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  ({ chromium } = await import(pathToFileURL("C:/Users/merta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs").href));
}
import { createServer } from "node:http";
import { resolve, extname, sep, join } from "node:path";
import { readFileSync, existsSync, statSync, mkdirSync } from "node:fs";

const dir=resolve("dist");
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8",".webp":"image/webp",".png":"image/png"};
const server=createServer((req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,"http://local").pathname);
    let file=resolve(dir,"."+pathname);
    if(file!==dir && !file.startsWith(dir+sep)){res.writeHead(403).end();return;}
    if(existsSync(file)&&statSync(file).isDirectory())file=join(file,"index.html");
    if(!existsSync(file)){res.writeHead(404).end();return;}
    res.writeHead(200,{"Content-Type":mime[extname(file)]||"application/octet-stream"});
    res.end(readFileSync(file));
  } catch(e){res.writeHead(500).end(String(e));}
});
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));
server.unref();
const origin="http://127.0.0.1:"+server.address().port;
const widths=[320,360,390,768,900,1024,1440];
mkdirSync("qa-screenshots",{recursive:true});
let browser;
for (const opts of [{channel:"chrome",headless:true},{channel:"msedge",headless:true},{headless:true}]) {
  try { browser=await chromium.launch(opts); break; } catch {}
}
if (!browser) throw new Error("No Chromium browser available for browser-smoke.mjs");
let failures=0;
function check(ok,message){if(!ok){console.error("FAIL",message);failures++}}
for(const width of widths){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 for(const [lang,route] of [['hu','/'],['en','/en/']]){
  const response=await page.goto(origin+route,{waitUntil:'load'});
  for(const image of await page.locator('img').all()){if(await image.isVisible())await image.scrollIntoViewIfNeeded();await image.evaluate(el=>el.decode())}
  await page.locator('header').scrollIntoViewIfNeeded();
  const state=await page.evaluate(()=>({lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth-innerWidth,h1:document.querySelectorAll('h1').length,cards:document.querySelectorAll('.original-card-link').length,pairs:document.querySelectorAll('.comparison-pair').length,transcripts:document.querySelectorAll('.comparison-transcript').length,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),canonical:document.querySelector('link[rel="canonical"]').href,robots:document.querySelector('meta[name="robots"]').content,heroText:getComputedStyle(document.querySelector('#hero-title')).visibility}));
  check(response.status()===200&&state.lang===lang&&state.overflow<=1&&state.h1===1&&state.cards===6&&state.pairs===4&&state.transcripts===0&&state.brokenImages.length===0&&state.heroText==='visible'&&state.robots==='noindex,nofollow,noarchive', 'Homepage '+lang+' '+width+' '+JSON.stringify(state)+' '+errors);
  check(state.canonical==='https://lokmira.com/'+(lang==='en'?'en/':''),'Canonical '+lang+' '+width);
  if(width<=760){await page.locator('.menu').click();check(await page.locator('#navigation').isVisible(),'Mobile navigation '+width);await page.locator('.menu').press('Escape');check((await page.locator('.menu').getAttribute('aria-expanded'))==='false','Escape closes menu '+width)}
  if(width===390||width===1440)await page.screenshot({path:'qa-screenshots/home-'+lang+'-'+width+'.png',fullPage:true});
  const next=lang==='hu'?'en':'hu';await Promise.all([page.waitForURL(origin+(next==='en'?'/en/':'/')),page.locator('button[data-lang="'+next+'"]').click()]);
  check(await page.locator('html').getAttribute('lang')===next,'Language destination '+lang+' '+width);
  check(errors.length===0,'JS errors '+errors);
  console.log('PASS approved homepage',lang,width,'px, image loading, comparison, language routes');
 }
 await context.close();
}
const routes=[
  "/hu/szolgaltatasok/","/hu/modszer/","/hu/rolunk/","/hu/kapcsolat/",
  "/hu/helyi-seo/","/hu/google-ads/","/hu/meta-hirdetesek/","/hu/erkezo-oldalak/","/hu/kozossegi-media/","/hu/meres/",
  "/en/services/","/en/approach/","/en/about/","/en/contact/",
  "/en/local-seo/","/en/google-ads/","/en/meta-ads/","/en/landing-pages/","/en/social-media/","/en/measurement/"
];
for(const [index,route] of routes.entries()){
 const width=(index===0||index===10)?1440:390;
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:"reduce"});
 const page=await ctx.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(String(e)));
 const response=await page.goto(origin+route,{waitUntil:"load"});
 const state=await page.evaluate(()=>({
   lang:document.documentElement.lang,overflow:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),
   noindex:document.querySelector('meta[name="robots"]')?.content,
   title:document.title,cssLoaded:getComputedStyle(document.querySelector(".site-hero")).backgroundColor!=="rgba(0, 0, 0, 0)",
   links:[...document.querySelectorAll('a[href]')].filter(a=>a.getAttribute("href")==="#").length,
   pictograms:[...document.querySelectorAll(".site-visual-number .ui-icon, .info-pictogram")].filter(el=>{const c=getComputedStyle(el);return (c.maskImage||c.webkitMaskImage||"").includes("/icons/")&&c.width!=="0px"}).length
 }));
 check(response.status()===200&&state.lang===(route.startsWith("/hu/")?"hu":"en")&&state.overflow<=1&&state.noindex==="noindex,nofollow,noarchive"&&state.title.includes("Lokmira")&&state.cssLoaded&&state.pictograms>=3&&state.links===0&&errors.length===0,"route "+route+" "+JSON.stringify(state)+" "+errors);
 if(route.includes('helyi-seo')||route.includes('local-seo')){
   const art=page.locator('.service-hero-art img');await art.evaluate(el=>el.decode());
   check(await page.locator('.service-hero').evaluate(el=>getComputedStyle(el).backgroundColor==='rgb(250, 251, 247)'), 'Local SEO must use light hero: '+route);
   check(await art.evaluate(el=>el.naturalWidth>0),'Local SEO hero artwork missing: '+route);
   await page.setViewportSize({width:1440,height:1000});
   await page.goto(origin+route,{waitUntil:'load'});await page.locator('.service-hero-art img').evaluate(el=>el.decode());
   await page.screenshot({path:'qa-screenshots/local-seo-'+state.lang+'-1440.png',fullPage:false});
   await page.setViewportSize({width,height:900});
 }
 if(index===0||index===10)await page.screenshot({path:"qa-screenshots/services-"+state.lang+"-"+width+".png",fullPage:true});
 if(width===390){const menu=page.locator(".site-toggle");await menu.click();check((await menu.getAttribute("aria-expanded"))==="true"&&await page.locator(".site-nav").isVisible(),"subpage mobile menu "+route);}
 console.log("PASS multi-page",route,"status",response.status(),"overflow",state.overflow);
 await ctx.close();
}

await browser.close();
await new Promise(ok=>server.close(ok));
if(failures)process.exit(1);
console.log("PASS Lokmira premium site browser QA: 5 homepage widths, /en/ root + 20 localized routes, nav/language and security meta");
