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
const widths=[320,360,390,768,900,1024,1440];
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
    nav:document.querySelector('a[data-route="services"]')?.getAttribute("href"),
    contactAction:document.querySelector('a[data-i18n="contactAction"]')?.getAttribute("href"),
    icons:[...document.querySelectorAll(".flow .ui-icon,.cards .ui-icon,.service-panels .ui-icon")].filter(el=>{const c=getComputedStyle(el);return (c.maskImage||c.webkitMaskImage||"").includes("/icons/")&&c.width!=="0px"}).length
  }));
  check(hu.width<=1&&hu.lang==="hu"&&hu.robots==="noindex,nofollow,noarchive"&&hu.services===4&&hu.icons>=10&&hu.nav==="/hu/szolgaltatasok/"&&hu.contactAction==="/hu/kapcsolat/"&&errors.length===0,"homepage HU "+width+" "+JSON.stringify(hu)+" "+errors);
  await page.locator('button[data-lang="en"]').click();
  const en=await page.evaluate(()=>({
    lang:document.documentElement.lang,title:document.title,
    lead:document.querySelector('[data-i18n="heroLead"]')?.textContent,
    description:document.querySelector('meta[name="description"]')?.content,
    nav:document.querySelector('a[data-route="services"]')?.getAttribute("href"),
    service:document.querySelector('[data-i18n="service1"]')?.textContent,
    contactAction:document.querySelector('a[data-i18n="contactAction"]')?.getAttribute("href")
  }));
  check(en.lang==="en"&&en.title.includes("Customer Growth")&&en.lead.includes("Make your business")&&en.nav==="/en/services/"&&en.service.includes("Google Business Profile")&&en.description.includes("Budapest")&&en.contactAction==="/en/contact/","homepage EN "+width+" "+JSON.stringify(en));
  if(width<=900){const menu=page.locator(".menu");await menu.click();check((await menu.getAttribute("aria-expanded"))==="true"&&await page.locator("#navigation").isVisible(),"homepage mobile menu open "+width);await menu.click();check((await menu.getAttribute("aria-expanded"))==="false","homepage mobile menu close "+width);}
  // Compare the exact same four navigation items in the root and inner-page design.
  const headerMetrics=()=>page.evaluate(()=>{
    const root=document.querySelector(".landing-root")!==null;
    const header=document.querySelector(root?".navbar":".site-head-inner");
    const nav=document.querySelector(root?".navigation":".site-nav");
    const brand=document.querySelector(root?".logo":".site-brand");
    const links=[...nav.querySelectorAll(":scope > a")];
    return {
      height:Math.round(header.getBoundingClientRect().height),
      brandHeight:Math.round(brand.getBoundingClientRect().height),
      labels:links.map(a=>a.textContent.trim()),
      items:links.map(a=>({height:Math.round(a.getBoundingClientRect().height),width:Math.round(a.getBoundingClientRect().width),font:getComputedStyle(a).fontSize})),
      navVisible:getComputedStyle(nav).display!=="none",
      overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth)
    };
  });
  if(width<=900)await page.locator(".menu").click();
  const rootMetrics=await headerMetrics();
  await page.goto(origin+"/en/services/",{waitUntil:"load"});
  if(width<=900)await page.locator(".site-toggle").click();
  const childMetrics=await headerMetrics();
  check(rootMetrics.height===childMetrics.height&&rootMetrics.brandHeight===childMetrics.brandHeight,"Header heights differ at "+width+" "+JSON.stringify({rootMetrics,childMetrics}));
  check(rootMetrics.labels.join("|")===childMetrics.labels.join("|"),"Navigation labels/order differ at "+width+" "+JSON.stringify({rootMetrics,childMetrics}));
  check(rootMetrics.items.length===4&&childMetrics.items.length===4,"Navigation count differs "+width);
  for(let i=0;i<Math.min(rootMetrics.items.length,childMetrics.items.length);i++){
    const a=rootMetrics.items[i],b=childMetrics.items[i];
    check(Math.abs(a.height-b.height)<=1&&Math.abs(a.width-b.width)<=3&&a.font===b.font&&a.height>=44,
      "Navigation link dimensions inconsistent "+width+" item "+i+" "+JSON.stringify({a,b}));
  }
  check(rootMetrics.navVisible&&childMetrics.navVisible&&rootMetrics.overflow<=1&&childMetrics.overflow<=1,
    "Header visibility/overflow "+width+" "+JSON.stringify({rootMetrics,childMetrics}));
  console.log("PASS shared header and four navigation controls",width,"px");
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
   links:[...document.querySelectorAll('a[href]')].filter(a=>a.getAttribute("href")==="#").length,
   pictograms:[...document.querySelectorAll(".site-visual-number .ui-icon")].filter(el=>{const c=getComputedStyle(el);return (c.maskImage||c.webkitMaskImage||"").includes("/icons/")&&c.width!=="0px"}).length
 }));
 check(response.status()===200&&state.lang===(route.startsWith("/hu/")?"hu":"en")&&state.overflow<=1&&state.noindex==="noindex,nofollow,noarchive"&&state.title.includes("Lokmira")&&state.cssLoaded&&state.pictograms>=3&&state.links===0&&errors.length===0,"route "+route+" "+JSON.stringify(state)+" "+errors);
 if(index===0||index===8)await page.screenshot({path:"qa-screenshots/services-"+state.lang+"-"+width+".png",fullPage:true});
 if(width===390){const menu=page.locator(".site-toggle");await menu.click();check((await menu.getAttribute("aria-expanded"))==="true"&&await page.locator(".site-nav").isVisible(),"subpage mobile menu "+route);}
 console.log("PASS multi-page",route,"status",response.status(),"overflow",state.overflow);
 await ctx.close();
}

const routeVariants={
 hu:["/hu/szolgaltatasok/","/hu/modszer/","/hu/rolunk/","/hu/kapcsolat/","/hu/helyi-seo/","/hu/google-ads/","/hu/kozossegi-media/","/hu/meres/"],
 en:["/en/services/","/en/approach/","/en/about/","/en/contact/","/en/local-seo/","/en/google-ads/","/en/social-media/","/en/measurement/"]
};
for(const width of [390,1440])for(const lang of ["hu","en"]){
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:"reduce"});
 const page=await ctx.newPage();
 const scan=async(route)=>{
  await page.goto(origin+route,{waitUntil:"load"});
  const root=route.startsWith("/?")||route==="/";
  if(width<=900)await page.locator(root?".menu":".site-toggle").click();
  return page.evaluate(()=>{
    const isHome=document.body.classList.contains("landing-root");
    const el=document.querySelector(isHome?".navbar":".site-head-inner");
    const nav=document.querySelector(isHome?".navigation":".site-nav");
    const a=[...nav.querySelectorAll(":scope > a")];
    const bounds=x=>({width:Math.round(x.getBoundingClientRect().width),height:Math.round(x.getBoundingClientRect().height),font:getComputedStyle(x).fontSize});
    return {header:bounds(el),texts:a.map(x=>x.textContent.trim()),links:a.map(x=>x.getAttribute("href")),boxes:a.map(bounds),overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),shown:getComputedStyle(nav).display!=="none"};
  });
 };
 const root=await scan(lang==="en"?"/?lang=en":"/");
 for(const route of routeVariants[lang]){
   const inner=await scan(route);
   check(root.header.height===inner.header.height&&inner.shown&&inner.overflow<=1,
     "Header height, overflow or menu visibility: "+lang+" "+width+" "+route+" "+JSON.stringify(inner));
   check(root.texts.join("|")===inner.texts.join("|")&&inner.boxes.length===4,
     "Navigation item text/order mismatch: "+lang+" "+width+" "+route+" "+JSON.stringify({root:root.texts,inner:inner.texts}));
   for(let j=0;j<Math.min(4,inner.boxes.length);j++){
     const a=root.boxes[j],b=inner.boxes[j];
     check(a.font===b.font&&Math.abs(a.height-b.height)<=1&&Math.abs(a.width-b.width)<=3&&b.height>=44,
       "Inconsistent navigation geometry: "+lang+" "+width+" "+route+" item "+j+" "+JSON.stringify({a,b}));
   }
 }
 console.log("PASS nav parity all eight",lang,"routes at",width,"px");
 await ctx.close();
}
await browser.close();
await new Promise(ok=>server.close(ok));
if(failures)process.exit(1);
console.log("PASS Lokmira premium site browser QA: 5 homepage widths, 16 localized routes, nav/language and security meta");
