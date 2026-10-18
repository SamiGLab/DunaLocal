import { chromium } from "playwright";
import { createServer } from "node:http";
import { resolve, extname, sep, join } from "node:path";
import { readFileSync, existsSync, statSync, mkdirSync } from "node:fs";

const dir=resolve("dist");
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8"};
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
const origin="http://127.0.0.1:"+server.address().port;
const widths=[320,360,390,768,1440];
mkdirSync("qa-screenshots",{recursive:true});
const browser=await chromium.launch({channel:"chrome",headless:true});
let failures=0;
function check(ok,message){if(!ok){console.error("FAIL",message);failures++}}
for(const width of widths){
  const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",e=>errors.push(String(e)));
  await page.goto(origin+"/",{waitUntil:"load"});
  await page.screenshot({path:"qa-screenshots/home-"+width+".png",fullPage:true});
  const hu=await page.evaluate(()=>({
    width:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),
    lang:document.documentElement.lang,
    robots:document.querySelector('meta[name="robots"]')?.content,
    services:document.querySelectorAll(".service-panels article").length,
    nav:document.querySelector('a[data-route="services"]')?.getAttribute("href")
  }));
  check(hu.width<=1&&hu.lang==="hu"&&hu.robots==="noindex,nofollow,noarchive"&&hu.services===4&&hu.nav==="/hu/szolgaltatasok/"&&errors.length===0,"homepage HU "+width+" "+JSON.stringify(hu)+" "+errors);
  await page.locator('button[data-lang="en"]').click();
  const en=await page.evaluate(()=>({
    lang:document.documentElement.lang,title:document.title,
    lead:document.querySelector('[data-i18n="heroLead"]')?.textContent,
    description:document.querySelector('meta[name="description"]')?.content,
    nav:document.querySelector('a[data-route="services"]')?.getAttribute("href"),
    service:document.querySelector('[data-i18n="service1"]')?.textContent
  }));
  check(en.lang==="en"&&en.title.includes("Internal preview")&&en.lead.includes("Make your business")&&en.nav==="/en/services/"&&en.service.includes("Google Business Profile")&&en.description.includes("Internal preview"),"homepage EN "+width+" "+JSON.stringify(en));
  if(width<=620){const menu=page.locator(".menu");await menu.click();check((await menu.getAttribute("aria-expanded"))==="true"&&await page.locator("#navigation").isVisible(),"homepage mobile menu open "+width);await menu.click();check((await menu.getAttribute("aria-expanded"))==="false","homepage mobile menu close "+width);}
  console.log("PASS homepage",width,"px; HU/EN links and preview restrictions");
  await context.close();
}
const routes=["/hu/szolgaltatasok/","/hu/modszer/","/hu/rolunk/","/hu/kapcsolat/","/hu/helyi-seo/","/hu/google-ads/","/hu/kozossegi-media/","/hu/meres/",
"/en/services/","/en/approach/","/en/about/","/en/contact/","/en/local-seo/","/en/google-ads/","/en/social-media/","/en/measurement/"];
for(const [index,route] of routes.entries()){
 const width=(index===0||index===8)?1440:390;
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:"reduce"});
 const page=await ctx.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(String(e)));
 const response=await page.goto(origin+route,{waitUntil:"load"});
 const state=await page.evaluate(()=>({
   lang:document.documentElement.lang,overflow:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),
   noindex:document.querySelector('meta[name="robots"]')?.content,
   title:document.title,cssLoaded:getComputedStyle(document.querySelector(".site-hero")).backgroundColor!=="rgba(0, 0, 0, 0)",
   links:[...document.querySelectorAll('a[href]')].filter(a=>a.getAttribute("href")==="#").length
 }));
 check(response.status()===200&&state.lang===(route.startsWith("/hu/")?"hu":"en")&&state.overflow<=1&&state.noindex==="noindex,nofollow,noarchive"&&state.title.includes("Lokmira")&&state.cssLoaded&&state.links===0&&errors.length===0,"route "+route+" "+JSON.stringify(state)+" "+errors);
 if(index===0||index===8)await page.screenshot({path:"qa-screenshots/services-"+state.lang+"-"+width+".png",fullPage:true});
 if(width===390){const menu=page.locator(".site-toggle");await menu.click();check((await menu.getAttribute("aria-expanded"))==="true"&&await page.locator(".site-nav").isVisible(),"subpage mobile menu "+route);}
 console.log("PASS multi-page",route,"status",response.status(),"overflow",state.overflow);
 await ctx.close();
}
await browser.close();
await new Promise(ok=>server.close(ok));
if(failures)process.exit(1);
console.log("PASS Lokmira premium site browser QA: 5 homepage widths, 16 localized routes, nav/language and security meta");
