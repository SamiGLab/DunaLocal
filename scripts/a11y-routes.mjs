import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { createServer } from "node:http";
import { resolve, extname, join, sep } from "node:path";
import { existsSync, statSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";

const root=resolve("dist");
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml"};
const server=createServer((request,response)=>{
 try {
   const pathname=decodeURIComponent(new URL(request.url,"http://local").pathname);
   let file=resolve(root,"."+pathname);
   if(file!==root && !file.startsWith(root+sep)){response.writeHead(403).end();return;}
   if(existsSync(file) && statSync(file).isDirectory()) file=join(file,"index.html");
   if(!existsSync(file) || !statSync(file).isFile()){response.writeHead(404).end();return;}
   response.writeHead(200,{"Content-Type":types[extname(file)]||"application/octet-stream"});
   response.end(readFileSync(file));
 } catch(error){response.writeHead(500).end(String(error));}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
server.unref();
const origin="http://127.0.0.1:"+server.address().port;
const routes=[
 "/en/",
 "/hu/szolgaltatasok/","/hu/modszer/","/hu/rolunk/","/hu/kapcsolat/",
 "/hu/helyi-seo/","/hu/google-ads/","/hu/meta-hirdetesek/","/hu/erkezo-oldalak/","/hu/kozossegi-media/","/hu/meres/",
 "/en/services/","/en/approach/","/en/about/","/en/contact/",
 "/en/local-seo/","/en/google-ads/","/en/meta-ads/","/en/landing-pages/","/en/social-media/","/en/measurement/"
];
const cases=routes.map(route=>({route,width:390})).concat(
 ["/hu/szolgaltatasok/","/en/services/","/hu/kapcsolat/","/en/contact/"].map(route=>({route,width:1440}))
);
mkdirSync("qa-artifacts",{recursive:true});
let browser;
for (const opts of [{channel:"chrome",headless:true},{channel:"msedge",headless:true},{headless:true}]) {
  try { browser=await chromium.launch(opts); break; } catch {}
}
if (!browser) throw new Error("No Chromium browser available for a11y-routes.mjs");
let failures=0;
try {
 for (const {route,width} of cases){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:"reduce"});
   const page=await context.newPage();
   const errors=[];
   page.on("pageerror",error=>errors.push(error.message));
   const response=await page.goto(origin+route,{waitUntil:"load"});
   const audit=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
   const violations=audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
   const name=route.replace(/^\//,"").replaceAll("/","-");
   writeFileSync("qa-artifacts/axe-route-"+name+"-"+width+".json",JSON.stringify({route,width,httpStatus:response.status(),violations,jsErrors:errors},null,2));
   console.log("A11Y route",route,width,"status",response.status(),"violations",violations.length,"JS errors",errors.length);
   if(response.status()!==200||errors.length||violations.length){
     failures++;
     for(const v of violations)console.error("VIOLATION",route,v.id,v.impact,v.nodes.slice(0,4));
     for(const e of errors)console.error("SCRIPT ERROR",route,e);
   }
   await context.close();
 }
} finally {
 await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
if(failures){console.error("Accessibility violations on",failures,"localized test cases");process.exit(1);}
console.log("PASS: 20 localized mobile/desktop WCAG A/AA scans");
