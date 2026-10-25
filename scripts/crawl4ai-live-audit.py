#!/usr/bin/env python3
"""Lokmira bounded Crawl4AI browser crawl. Based on user-supplied lokmira_audit_kit."""
import asyncio, csv, json, re, sys
from collections import Counter, deque
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse, urlunparse, urldefrag
from xml.etree import ElementTree as ET
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

ROOT="https://lokmira.com"
OUT=Path("seo-audit-output/crawl4ai")
OUT.mkdir(parents=True,exist_ok=True)
EXTS=(".png",".jpg",".jpeg",".webp",".svg",".gif",".pdf",".txt",".xml",".js",".css",".woff",".woff2",".mp4",".ico",".zip")
def norm(raw,base=ROOT+"/"):
    try:
        p=urlparse(urldefrag(urljoin(base,raw))[0])
        if p.scheme!="https" or p.hostname not in ("lokmira.com","www.lokmira.com"): return None
        if p.path.lower().endswith(EXTS): return None
        path=re.sub(r"/+","/",p.path or "/")
        if not path.endswith("/") and "." not in path.split("/")[-1]: path+="/"
        return ROOT+path
    except Exception: return None
def analyze(url,html,status,error="",headers=None):
    doc=BeautifulSoup(html or "", "html.parser")
    title=doc.title.get_text(" ",strip=True) if doc.title else ""
    def meta(name):
        t=doc.find("meta",attrs={"name":re.compile("^"+name+"$",re.I)})
        return (t.get("content","") if t else "").strip()
    c=doc.find("link",attrs={"rel":lambda x:x and "canonical" in str(x).lower()})
    canonical=c.get("href","").strip() if c else ""
    alt=[{"lang":t.get("hreflang"),"url":urljoin(url,t.get("href"))} for t in doc.select("link[hreflang][href]")]
    headings=[x.get_text(" ",strip=True) for x in doc.select("h1")]
    links=sorted({n for a in doc.select("a[href]") if (n:=norm(a["href"],url))})
    images=doc.select("img")
    missing=[x.get("src","?") for x in images if not x.has_attr("alt") and x.get("aria-hidden")!="true"]
    scripts=doc.select('script[type="application/ld+json"]')
    types=[]
    for el in scripts:
        try:
            j=json.loads(el.get_text());types.extend(x.get("@type","?") for x in j.get("@graph",[j]))
        except Exception: types.append("INVALID_JSON_LD")
    body=doc.select_one("main") or doc.body or doc
    # Copy DOM for text extraction: changes should not mutate link/image selectors above.
    clean=BeautifulSoup(str(body),"html.parser")
    for t in clean.select("script,style,noscript,nav,footer,header,svg"):t.decompose()
    visible=clean.get_text(" ",strip=True)
    issues=[]
    if status!=200:issues.append("HTTP_STATUS")
    if not title:issues.append("MISSING_TITLE")
    if not meta("description"):issues.append("MISSING_DESCRIPTION")
    if len(headings)!=1:issues.append("H1_COUNT")
    if not canonical or norm(canonical,url)!=norm(url):issues.append("CANONICAL")
    if not doc.html or not doc.html.get("lang"):issues.append("HTML_LANG")
    if "noindex" in (meta("robots")+" "+str((headers or {}).get("x-robots-tag",""))).lower():issues.append("NOINDEX")
    if not {"hu","en"}.issubset({t["lang"] for t in alt}):issues.append("HREFLANG")
    if missing:issues.append("MISSING_IMG_ALT")
    if "INVALID_JSON_LD" in types:issues.append("INVALID_JSON_LD")
    return {"url":url,"http":status,"error":error,"title":title,"description":meta("description"),
      "lang":doc.html.get("lang","") if doc.html else "","canonical":canonical,"robots":meta("robots"),
      "hreflang":alt,"h1":headings,"images":len(images),"missing_alt":missing,"jsonld_types":types,
      "internal_links":links,"word_count":len(re.findall(r"\b[\wÀ-ž]+\b",visible)),"issues":issues}
async def main():
    import urllib.request
    # Sitemaps define the canonical baseline; the crawler also discovers and reviews internal links.
    sitemap_xml=Path("sitemap.xml").read_text(encoding="utf-8")
    urls=[e.text.strip() for e in ET.fromstring(sitemap_xml).iter() if e.tag.endswith("loc") and e.text]
    pending=deque(dict.fromkeys([ROOT+"/",*urls]));done={};errors=[]
    config=BrowserConfig(browser_type="chromium",headless=True,verbose=False)
    crawl_config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS,check_robots_txt=True,
        page_timeout=45000,wait_until="domcontentloaded")
    async with AsyncWebCrawler(config=config) as crawler:
        while pending and len(done)<25:
            url=norm(pending.popleft())
            if not url or url in done:continue
            print("CRAWL",url,flush=True)
            try:
                result=await crawler.arun(url=url,config=crawl_config)
                html=getattr(result,"html","") or ""
                status=getattr(result,"status_code",None)
                err=getattr(result,"error_message","") or ""
                headers={str(k).lower():v for k,v in (getattr(result,"response_headers",{}) or {}).items()}
                row=analyze(url,html,status,err,headers)
            except Exception as e:row=analyze(url,"",None,str(e)[:400])
            done[url]=row
            for link in row["internal_links"]:
                if link not in done and link not in pending and len(pending)<100:pending.append(link)
            await asyncio.sleep(.7)
    rows=list(done.values())
    tc=Counter(r["title"] for r in rows if r["title"])
    dc=Counter(r["description"] for r in rows if r["description"])
    for r in rows:
        if tc[r["title"]]>1:r["issues"].append("DUPLICATE_TITLE")
        if r["description"] and dc[r["description"]]>1:r["issues"].append("DUPLICATE_DESCRIPTION")
        for h in r["hreflang"]:
            other=done.get(norm(h["url"]))
            if other and not any(x["url"]==r["url"] and x["lang"]==r["lang"] for x in other["hreflang"]):
                r["issues"].append("HREFLANG_NOT_RECIPROCAL")
    count=Counter(issue for r in rows for issue in r["issues"])
    missing=set(urls)-set(done)
    payload={"run_at":datetime.now(timezone.utc).isoformat(),"source":"Crawl4AI 0.9.5",
      "expected_sitemap_urls":len(urls),"crawled":len(rows),"uncrawled_sitemap_urls":sorted(missing),
      "issue_counts":dict(count),"pages":rows}
    (OUT/"crawl_results.json").write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding="utf-8")
    with (OUT/"pages.csv").open("w",newline="",encoding="utf-8-sig") as f:
        cols=["url","http","title","description","lang","canonical","robots","h1","word_count","images","missing_alt","jsonld_types","issues"]
        w=csv.DictWriter(f,fieldnames=cols);w.writeheader()
        for r in rows:w.writerow({k:" | ".join(map(str,r[k])) if isinstance(r[k],list) else r.get(k,"") for k in cols})
    lines=["# Lokmira — Crawl4AI canlı denetim","",
      "Tarih: "+payload["run_at"],"Sitemap URL sayısı: "+str(len(urls)),
      "Taranan URL: "+str(len(rows)),"HTTP 200 sayfa: "+str(sum(r["http"]==200 for r in rows)),
      "Bulgular: "+json.dumps(dict(count),ensure_ascii=False),"",
      "| Sayfa | HTTP | H1 | Bulgular |","|---|---:|---|---|"]
    for r in rows:
        lines.append("| "+r["url"].replace("|","%7C")+" | "+str(r["http"])+" | "+", ".join(r["h1"]).replace("|","/")[:50]+" | "+", ".join(r["issues"])+" |")
    lines+=["","Bu tarama Google Search Console indeks verisi veya gerçek kullanıcı Core Web Vitals ölçümü değildir."]
    (OUT/"CRAWL4AI_RAPORU.md").write_text("\n".join(lines)+"\n",encoding="utf-8")
    print("CRAWL_SUMMARY",json.dumps({"pages":len(rows),"success":sum(r["http"]==200 for r in rows),"issues":dict(count)}),flush=True)
    if len(rows)<len(urls) or any(r["http"]!=200 for r in rows):sys.exit(1)
if __name__=="__main__":asyncio.run(main())
