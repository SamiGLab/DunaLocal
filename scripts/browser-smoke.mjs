import { chromium } from "playwright";
import { resolve } from "node:path";
import { mkdirSync } from "node:fs";

const widths = [320,360,390,768,1440];
const url = "file://" + resolve("index.html");
mkdirSync("qa-screenshots",{recursive:true});
const browser = await chromium.launch({ channel: "chrome", headless: true });
let failures = 0;
for (const width of widths) {
  const context = await browser.newContext({ viewport:{width,height:900}, deviceScaleFactor:1, reducedMotion:"reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror",error=>errors.push(String(error)));
  await page.goto(url,{waitUntil:"load"});
  await page.screenshot({path:`qa-screenshots/preview-${width}.png`,fullPage:true});
  const metrics = await page.evaluate(()=>({
    overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    lang: document.documentElement.lang,
    meta: document.querySelector('meta[name="robots"]')?.content
  }));
  if(metrics.overflow>1 || metrics.lang!=="hu" || metrics.meta!=="noindex,nofollow,noarchive" || errors.length) {
    console.error("FAIL at",width,metrics,errors); failures++;
  }
  await page.locator('button[data-lang="en"]').click();
  const translated = await page.evaluate(()=>({
    lang:document.documentElement.lang,
    title:document.title,
    lead:document.querySelector('[data-i18n="heroLead"]')?.textContent,
    navigation:document.querySelector("#navigation")?.getAttribute("aria-label"),
    description:document.querySelector('meta[name="description"]')?.getAttribute("content")
  }));
  if(translated.lang!=="en" || !translated.title.includes("Internal") || !translated.lead.includes("Don't stop") || translated.navigation!=="Main navigation" || !translated.description.includes("Internal preview")) {
    console.error("Translation FAIL:",width,translated);failures++;
  }
  if(width<=620){
    const menu=page.locator(".menu");
    await menu.click();
    const expanded=await menu.getAttribute("aria-expanded");
    const visible=await page.locator("#navigation").isVisible();
    if(expanded!=="true" || !visible){console.error("Menu FAIL:",width,expanded,visible);failures++;}
    await page.locator('#navigation a[href="#pilot"]').click();
    if((await menu.getAttribute("aria-expanded"))!=="false"){console.error("Menu close FAIL:",width);failures++;}
  }
  console.log("PASS browser",width,"px; overflow",metrics.overflow,"; EN text and mobile behavior checked");
  await context.close();
}
await browser.close();
if(failures)process.exit(1);
