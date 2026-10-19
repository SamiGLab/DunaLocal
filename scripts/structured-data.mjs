// Static, source-backed entity data. No ratings, prices, addresses or client metrics.
const origin='https://lokmira.com';
const serviceNames={
 'helyi-seo':['Google Cégprofil és helyi SEO','Local SEO'],
 'local-seo':['Google Business Profile and local SEO','Local SEO'],
 'google-ads':['Google Ads','Google Ads'],
 'meta-hirdetesek':['Meta hirdetések','Meta advertising'],
 'meta-ads':['Meta advertising','Meta advertising'],
 'erkezo-oldalak':['Érkezőoldalak','Landing page design'],
 'landing-pages':['Landing pages','Landing page design'],
 'kozossegi-media':['Közösségi média és tartalom','Social media and content planning'],
 'social-media':['Social media and content','Social media and content planning'],
 'meres':['Érdeklődés és ajánlatkövetés','Enquiry and quotation tracking'],
 'measurement':['Enquiry and quotation tracking','Enquiry and quotation tracking']
};
function text(value=''){
 return value.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/\s+/g,' ').trim();
}
export function withStructuredData(source){
 const clean=source.replace(/<script type="application\/ld\+json" id="lokmira-structured-data">[\s\S]*?<\/script>\s*/g,'');
 const canonical=clean.match(/rel="canonical" href="([^"]+)"/)?.[1];
 const lang=clean.match(/<html lang="([^"]+)"/)?.[1];
 if(!canonical||!lang)throw Error('Structured data requires canonical and language');
 const pathname=new URL(canonical).pathname,slug=pathname.split('/').filter(Boolean).at(-1);
 const home=pathname==='/'||pathname==='/en/';
 const name=text(clean.match(/<title>([\s\S]*?)<\/title>/)?.[1]);
 const description=text(clean.match(/name="description" content="([^"]+)"/)?.[1]);
 const graph=[];
 if(home){
  graph.push({'@type':'Organization','@id':origin+'/#organization',name:'Lokmira',url:origin+'/',logo:{'@type':'ImageObject',url:origin+'/brand/focus-logo.svg'},description,email:'samigrowlab@gmail.com',areaServed:{'@type':'City',name:'Budapest'}});
  graph.push({'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Lokmira',inLanguage:['hu','en'],publisher:{'@id':origin+'/#organization'}});
 }
 const page={'@type':slug==='about'||slug==='rolunk'?'AboutPage':slug==='contact'||slug==='kapcsolat'?'ContactPage':slug==='services'||slug==='szolgaltatasok'?'CollectionPage':'WebPage','@id':canonical+'#webpage',url:canonical,name,description,inLanguage:lang,isPartOf:{'@id':origin+'/#website'},about:{'@id':origin+'/#organization'}};
 const alternate=[...clean.matchAll(/rel="alternate" hreflang="(hu|en)" href="([^"]+)"/g)].find(m=>m[1]!==lang);
 if(alternate)page.workTranslation={'@type':'WebPage','@id':alternate[2]+'#webpage',url:alternate[2],inLanguage:alternate[1]};
 if(serviceNames[slug]){
  const [localName,type]=serviceNames[slug];
  const service={'@type':'Service','@id':canonical+'#service',url:canonical,name:localName,serviceType:type,description,provider:{'@id':origin+'/#organization'},areaServed:{'@type':'City',name:'Budapest'}};
  graph.push(service);page.mainEntity={'@id':service['@id']};
 }
 if(!home){
  const breadcrumb={'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Lokmira',item:origin+(lang==='en'?'/en/':'/')},{'@type':'ListItem',position:2,name:text(clean.match(/<h1>([\s\S]*?)<\/h1>/)?.[1])||name,item:canonical}]};
  graph.push(breadcrumb);page.breadcrumb={'@id':breadcrumb['@id']};
 }
 graph.push(page);
 const json=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c');
 return clean.replace('</head>',`<script type="application/ld+json" id="lokmira-structured-data">${json}</script></head>`);
}
