import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
import { resolve } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";

import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {extname,join,sep} from 'node:path';
const root=resolve('dist');const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'};
const server=createServer((req,res)=>{let f=resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!f.startsWith(root+sep)&&f!==root){res.writeHead(403).end();return}if(existsSync(f)&&statSync(f).isDirectory())f=join(f,'index.html');if(!existsSync(f)){res.writeHead(404).end();return}res.writeHead(200,{'Content-Type':mime[extname(f)]||'application/octet-stream'});res.end(readFileSync(f));});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));server.unref();const source='http://127.0.0.1:'+server.address().port;

const widths = [390, 1440];
const langs = ["hu", "en"];
let browser;
for (const opts of [{channel:"chrome",headless:true},{channel:"msedge",headless:true},{headless:true}]) {
  try { browser = await chromium.launch(opts); break; } catch {}
}
if (!browser) throw new Error("No Chromium browser available for a11y.mjs");
mkdirSync("qa-artifacts", { recursive:true });
let errors = 0;
for (const width of widths) {
  for (const lang of langs) {
    const context = await browser.newContext({
      viewport:{ width, height:900 },
      deviceScaleFactor:1,
      reducedMotion:"reduce"
    });
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));
    await page.goto(source+(lang==="en"?"/en/":"/"), { waitUntil:"load" });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"])
      .analyze();
    const output = {
      width, lang, timestamp:new Date().toISOString(),
      passes:result.passes.length,
      violations:result.violations.map(v=>({
        id:v.id, impact:v.impact, description:v.description,
        help:v.help, nodes:v.nodes.map(n=>({html:n.html, target:n.target, failureSummary:n.failureSummary}))
      })),
      jsErrors:pageErrors
    };
    writeFileSync(`qa-artifacts/axe-${width}-${lang}.json`, JSON.stringify(output,null,2));
    console.log(`A11Y ${width}px ${lang.toUpperCase()}: ${output.passes} passing rules, ${output.violations.length} violations, ${pageErrors.length} JS errors`);
    for (const v of output.violations) {
      console.error("VIOLATION",v.id,v.impact,"nodes:",v.nodes.length);
      for(const n of v.nodes.slice(0,2)) console.error("  ",n.target.join(" "),n.failureSummary?.slice(0,250));
    }
    if(output.violations.length || pageErrors.length) errors++;
    await context.close();
  }
}
await browser.close();
await new Promise(ok=>server.close(ok));
if (errors) {
  console.error(`Accessibility checks failed in ${errors} viewport-language combinations. Review uploaded JSON artifacts.`);
  process.exit(1);
}
console.log("PASS: WCAG A/AA automated tests for HU/EN at 390px and 1440px");
