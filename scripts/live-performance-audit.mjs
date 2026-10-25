import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const origin = 'https://lokmira.com';
const targets = [
  {name:'Home HU',path:'/'},
  {name:'Home EN',path:'/en/'},
  {name:'Local SEO HU',path:'/hu/helyi-seo/'},
  {name:'Local SEO EN',path:'/en/local-seo/'}
];
const output = resolve('seo-audit-output');
mkdirSync(output,{recursive:true});
const results = [];
const safeNumber = x => typeof x === 'number' && Number.isFinite(x) ? Math.round(x) : null;
const metric = (j,id) => safeNumber(j?.audits?.[id]?.numericValue);
const fmt = (n,suffix='') => n === null || n === undefined ? 'N/A' : n.toLocaleString('en-US')+suffix;
const sleep = ms => new Promise(r=>setTimeout(r,ms));

async function pageSpeed(url) {
  const requestURL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?'
    + new URLSearchParams({url,strategy:'mobile',category:'performance'});
  try {
    const r = await fetch(requestURL,{signal:AbortSignal.timeout(150000),headers:{'Accept':'application/json'}});
    if(!r.ok) return {available:false,reason:'PageSpeed Insights API HTTP '+r.status+' (public quota may be limited)'};
    const data = await r.json();
    const metrics = data.loadingExperience?.metrics||{};
    const overall = data.loadingExperience?.overall_category||'UNKNOWN';
    const lookup = id => metrics[id] ? {percentile:metrics[id].percentile,category:metrics[id].category}:null;
    return {available:true,url:data.id,fieldOverall:overall,fieldMetrics:{
      LCP:lookup('LARGEST_CONTENTFUL_PAINT_MS'),
      INP:lookup('INTERACTION_TO_NEXT_PAINT'),
      CLS:lookup('CUMULATIVE_LAYOUT_SHIFT_SCORE')
    }};
  } catch(e) {
    return {available:false,reason:String(e).slice(0,260)};
  }
}
function runLighthouse(url,key){
  const jsonPath=join(output,key+'.lighthouse.json');
  const cli=resolve('node_modules/.bin/lighthouse');
  if(!existsSync(cli))return {available:false,reason:'Lighthouse dependency missing'};
  const args=[url,'--output=json','--output-path='+jsonPath,
    '--chrome-flags=--headless --no-sandbox --disable-gpu --disable-dev-shm-usage',
    '--form-factor=mobile','--throttling-method=simulate',
    '--quiet','--max-wait-for-load=60000'];
  const cmd=spawnSync(cli,args,{timeout:220000,encoding:'utf8',maxBuffer:4*1024*1024});
  if(cmd.status!==0 || !existsSync(jsonPath))
    return {available:false,reason:((cmd.stderr||cmd.stdout||'')+' '+(cmd.error||'')).slice(-550),exit:cmd.status};
  try {
    const j=JSON.parse(readFileSync(jsonPath,'utf8'));
    return {available:true,score:safeNumber(j.categories?.performance?.score*100),
      lab:{FCPms:metric(j,'first-contentful-paint'),LCPms:metric(j,'largest-contentful-paint'),
        TBTms:metric(j,'total-blocking-time'),CLS:j.audits?.['cumulative-layout-shift']?.numericValue??null,
        speedIndexMs:metric(j,'speed-index')},
      finalUrl:j.finalDisplayedUrl||j.finalUrl||j.requestedUrl,
      warnings:j.runWarnings||[],
      largestContentfulPaintElement:j.audits?.['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet||null};
  }catch(e){return {available:false,reason:'Could not parse Lighthouse JSON: '+String(e)};}
}
for(const [i,target] of targets.entries()){
  const url=origin+target.path;
  const key=String(i+1).padStart(2,'0');
  const row={name:target.name,url,at:new Date().toISOString(),lighthouse:runLighthouse(url,key)};
  // PSI API data is not guaranteed to exist, especially for a new/small site.
  row.psi = await pageSpeed(url);
  console.log('MEASUREMENT',JSON.stringify({
    url,labScore:row.lighthouse.score??null,LCPms:row.lighthouse.lab?.LCPms??null,
    TBTms:row.lighthouse.lab?.TBTms??null,CLS:row.lighthouse.lab?.CLS??null,
    fieldOverall:row.psi.fieldOverall||null,psiError:row.psi.available?null:row.psi.reason,
    lighthouseError:row.lighthouse.available?null:row.lighthouse.reason
  }));
  results.push(row);
  await sleep(500);
}
const summary=[
  '# Lokmira mobile performance audit',
  '',
  'Date: '+new Date().toISOString(),
  'Method: Chrome/Lighthouse **synthetic mobile lab** run on a GitHub Actions runner. Results vary; this is **not real-user Core Web Vitals**.',
  'PSI may supply 28-day CrUX field data if available; unavailable metrics remain N/A.',
  '',
  '| Page | Lab performance | Lab LCP | Lab TBT | Lab CLS | CrUX mobile overall |',
  '|---|---:|---:|---:|---:|---|',
  ...results.map(x=>[
    '| '+x.name,fmt(x.lighthouse?.score,'/100'),
    fmt(x.lighthouse?.lab?.LCPms,' ms'),fmt(x.lighthouse?.lab?.TBTms,' ms'),
    x.lighthouse?.lab?.CLS===undefined?'N/A':Number(x.lighthouse.lab.CLS).toFixed(3),
    x.psi?.fieldOverall||'Not available'
  ].join(' | ')+' |'),
  '',
  'All raw results are available in the workflow artifact. Lighthouse scores are **not** GSC index coverage or Google rankings.',
  'Only Google Search Console (owner-authenticated) can confirm per-URL indexing. Public Google search is not a substitute.',
  '',
  '## Issues or measurement gaps',
  ...results.flatMap(x=>[
    !x.lighthouse.available?'- '+x.name+' Lighthouse: '+x.lighthouse.reason:null,
    !x.psi.available?'- '+x.name+' PSI: '+x.psi.reason:null
  ].filter(Boolean)),
  ''
].join('\n');
writeFileSync(join(output,'README.md'),summary);
writeFileSync(join(output,'measurements.json'),JSON.stringify(results,null,2)+'\n');
console.log('FINAL REPORT\n'+summary);
if(results.every(x=>!x.lighthouse.available))process.exitCode=1;
