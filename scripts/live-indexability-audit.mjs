import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const origin='https://lokmira.com';
const out='seo-audit-output';
mkdirSync(out,{recursive:true});
const local=readFileSync('sitemap.xml','utf8');
const paths=[...local.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const results=[];
function get(html,regex){return html.match(regex)?.[1]||null;}
function parseLD(html){
 const schemas=[];
 for(const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){
  try{const v=JSON.parse(m[1]);schemas.push(...(v['@graph']||[v]).map(z=>z['@type']).filter(Boolean));}
  catch(e){schemas.push('INVALID_JSON_LD');}
 }
 return schemas;
}
async function fetchWithTimeout(url,opts={}){
 return fetch(url,{...opts,signal:AbortSignal.timeout(22000),headers:{'User-Agent':'Lokmira-SEO-Verification/2026-10-25'}});
}
let critical=0;
for(const url of paths){
 const row={url,issues:[]};
 try{
  const res=await fetchWithTimeout(url);
  const html=await res.text();
  const status=res.status, final=res.url;
  row.status=status;row.final=final;
  row.canonical=get(html,/<link rel="canonical" href="([^"]+)"/);
  row.robots=get(html,/<meta name="robots" content="([^"]+)"/);
  row.headerRobots=res.headers.get('x-robots-tag');
  row.hreflangs=[...html.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>m[1]);
  row.h1Count=[...html.matchAll(/<h1\b/gi)].length;
  row.schemaTypes=parseLD(html);
  row.title=get(html,/<title>([\s\S]*?)<\/title>/i);
  if(status!==200)row.issues.push('HTTP '+status);
  if(final!==url)row.issues.push('Unexpected redirect final '+final);
  if(row.canonical!==url)row.issues.push('Canonical mismatch '+row.canonical);
  if(!row.robots || /noindex/i.test(row.robots))row.issues.push('Robots meta is missing or noindex');
  if(/noindex/i.test(row.headerRobots||''))row.issues.push('X-Robots-Tag noindex');
  if(row.h1Count!==1)row.issues.push('H1 count '+row.h1Count);
  if(!row.hreflangs.includes('hu')||!row.hreflangs.includes('en'))row.issues.push('hreflang pair missing');
  if(row.schemaTypes.includes('INVALID_JSON_LD'))row.issues.push('Malformed JSON-LD');
 }catch(e){row.issues.push('Fetch failed '+String(e));}
 if(row.issues.length)critical++;
 results.push(row);
 console.log('URL_CHECK',JSON.stringify({path:new URL(url).pathname,status:row.status,issues:row.issues}));
}
let liveSitemap,liveRobots;
try{
 const [s,r]=await Promise.all([fetchWithTimeout(origin+'/sitemap.xml'),fetchWithTimeout(origin+'/robots.txt')]);
 liveSitemap={status:s.status,identical:(await s.text())===local};
 liveRobots={status:r.status,body:await r.text()};
 if(liveSitemap.status!==200||!liveSitemap.identical)critical++;
 if(liveRobots.status!==200||!/Sitemap:\s*https:\/\/lokmira\.com\/sitemap\.xml/.test(liveRobots.body))critical++;
}catch(e){critical++;liveSitemap={error:String(e)};liveRobots={error:String(e)};}
const hostChecks=[];
for(const url of ['http://lokmira.com/','https://www.lokmira.com/','http://www.lokmira.com/']){
 try{
  const r=await fetchWithTimeout(url);
  hostChecks.push({url,status:r.status,final:r.url,canonicalHost:r.url.startsWith(origin+'/')});
 }catch(e){hostChecks.push({url,error:String(e)});}
}
const report={
 at:new Date().toISOString(),method:'Production HTTP GET from GitHub Actions runner; this does not prove Google indexing',
 result:critical===0?'PASS':'FAIL',critical,sourceRoutes:paths.length,liveSitemap,liveRobots,hostChecks,urls:results
};
writeFileSync(out+'/indexability.json',JSON.stringify(report,null,2)+'\n');
writeFileSync(out+'/INDEXABILITY.md',[
 '# Lokmira production URL checks','',
 'Checked on '+report.at,'',
 'This tests HTTP-accessible HTML, not Google Search Console indexing.','',
 '**Result:** '+report.result+'; '+paths.length+' expected canonical URLs; '+critical+' failures.',
 '','## URL summary','',
 '| URL path | HTTP | Canonical | hreflang | JSON-LD | Issues |',
 '|---|---|---|---|---|---|',
 ...results.map(r=>'| '+new URL(r.url).pathname+' | '+(r.status||'?')+' | '+(r.canonical===r.url?'match':'mismatch')+' | '+r.hreflangs?.join(',')+' | '+r.schemaTypes?.join(',')+' | '+(r.issues?.join('; ')||'—')+' |'),
 '','## Host aliases','',
 ...hostChecks.map(x=>'- '+x.url+' → '+(x.final||x.error)+' '+(x.status||'')),
 '','## GSC limitation','','Index coverage (indexed, crawled but not indexed, discovered but not indexed) requires authenticated Google Search Console access.',''
 ].join('\n'));
 console.log('INDEXABILITY_SUMMARY',JSON.stringify({result:report.result,total:paths.length,critical,hostChecks,sitemap:liveSitemap}));
if(critical>0)process.exitCode=1;
