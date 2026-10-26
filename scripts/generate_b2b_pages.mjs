import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const origin = 'https://lokmira.com';

function mailtoLink(subject, serviceName, lang) {
  const encSub = encodeURIComponent(subject);
  const bodyText = lang === 'hu'
    ? `Cégnév:\nWeboldal / Termék:\nCélországok:\nKiválasztott szolgáltatás: ${serviceName}\nProjekt rövid összefoglalása:\nElérhetőség:`
    : `Company Name:\nWebsite / Product:\nTarget Countries:\nSelected Service: ${serviceName}\nProject Brief Overview:\nContact Phone/Details:`;
  const encBody = encodeURIComponent(bodyText);
  return `mailto:samigrowlab@gmail.com?subject=${encSub}&body=${encBody}`;
}

// --------------------------------------------------------------------------
// 1. HUB PAGES (EN & HU)
// --------------------------------------------------------------------------

const enHub = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="google-site-verification" content="km1EpHT5L_IUzBBj709rZfeyxZ3zaUM86yIxYJ0nfJk" />
<meta name="robots" content="index,follow"><meta name="theme-color" content="#101820">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="description" content="International B2B market assessment, verified buyer development, and European market entry advisory for manufacturers, exporters, and distributors.">
<meta property="og:type" content="website"><meta property="og:site_name" content="Lokmira">
<meta property="og:url" content="https://lokmira.com/en/b2b/"><meta property="og:locale" content="en_US"><meta property="og:locale:alternate" content="hu_HU">
<meta property="og:title" content="International B2B Market Intelligence & Commercial Advisory | Lokmira">
<meta property="og:description" content="International B2B market assessment, verified buyer development, and European market entry advisory for manufacturers, exporters, and distributors.">
<link rel="canonical" href="https://lokmira.com/en/b2b/"><link rel="alternate" hreflang="hu" href="https://lokmira.com/hu/nemzetkozi-b2b/"><link rel="alternate" hreflang="en" href="https://lokmira.com/en/b2b/">
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg"><link rel="stylesheet" href="/pages.css"><script src="/pages.js" defer></script>
<title>International B2B Market Intelligence & Commercial Advisory | Lokmira</title>
<link rel="stylesheet" href="/shared-chrome.css?v=20261020-all-pages"><meta property="og:image" content="https://lokmira.com/images/hero-banner-en.webp">
<meta property="og:image:width" content="1448"><meta property="og:image:height" content="1086"><meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://lokmira.com/images/hero-banner-en.webp"><link rel="apple-touch-icon" href="/brand/focus-app-icon.svg"><link rel="manifest" href="/manifest.json">
</head>
<body class="site-page"><a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap site-head-inner"><a class="site-brand" href="/en/" aria-label="Lokmira"><img src="/brand/focus-mark.svg" width="38" height="38" alt="">lokmira<span class="chrome-dot">.</span></a><nav id="site-nav" class="site-nav" aria-label="Main navigation"><a href="/en/services/">Local Growth</a><a href="/en/b2b/" aria-current="page">International B2B</a><a href="/en/approach/">Our approach</a><a href="/en/about/">About us</a><a class="mobile-contact" href="/en/contact/">Get in touch</a></nav><div class="site-nav-end"><div class="site-langs" aria-label="Language"><a href="/hu/nemzetkozi-b2b/">HU</a><span>/</span><a href="/en/b2b/" aria-current="page">EN</a></div><a class="nav-cta ui-link-icon" href="/en/contact/">Get in touch</a><button class="site-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Open navigation"><span></span><span></span></button></div></div></header>
<main id="main">
<section class="site-hero service-hero"><div class="wrap site-hero-inner"><div>
<div class="site-kicker">INTERNATIONAL B2B · MARKET INTELLIGENCE</div>
<h1>Better market intelligence.<br><em>Real commercial conversations.</em></h1>
<p>We provide European market assessments, verified buyer identification, and structured commercial outreach for companies expanding across borders.</p>
<div class="b2b-audience-row">
  <span class="b2b-audience-pill"><span class="ui-icon icon-target" aria-hidden="true"></span>Manufacturers</span>
  <span class="b2b-audience-pill"><span class="ui-icon icon-users" aria-hidden="true"></span>Exporters</span>
  <span class="b2b-audience-pill"><span class="ui-icon icon-workflow" aria-hidden="true"></span>Distributors</span>
  <span class="b2b-audience-pill"><span class="ui-icon icon-map-pin" aria-hidden="true"></span>New Market Entrants</span>
</div>
<div class="site-hero-actions">
  <a class="site-pill ui-link-icon" href="${mailtoLink('International B2B Inquiry - Lokmira', 'International B2B Hub', 'en')}">Request commercial proposal</a>
  <a class="service-detail-link ui-link-icon" href="#b2b-services">Explore advisory solutions</a>
</div>
</div>
<aside class="editorial-panel" aria-label="Structured B2B expansion"><p class="editorial-panel-title">Structured European Growth</p>
<div class="editorial-step"><span class="ui-icon icon-target" aria-hidden="true"></span><div><h2>01 / Assess</h2><p>Validate market fit, competitors, and regulatory standards.</p></div></div>
<div class="editorial-step"><span class="ui-icon icon-users" aria-hidden="true"></span><div><h2>02 / Identify</h2><p>Locate real decision-makers and verified commercial buyers.</p></div></div>
<div class="editorial-step"><span class="ui-icon icon-workflow" aria-hidden="true"></span><div><h2>03 / Connect</h2><p>Initiate direct commercial discussions with interested partners.</p></div></div>
</aside></div></section>

<section id="b2b-services" class="site-section"><div class="wrap"><span class="site-label">LOKMIRA ADVISORY SERVICES</span>
<h2>Tailored for international expansion.</h2>
<p class="site-lead">Whether entering a new European territory, appointing regional distributors, or prospecting volume buyers, our modular packages deliver transparent research and measurable traction.</p>
<div class="tile-grid">
  <article class="tile"><span class="tile-no">01 / VALIDATION</span><span class="ui-icon tile-pictogram icon-target" aria-hidden="true"></span>
    <h3>Market Assessment</h3>
    <p>Rapid validation of European target markets: competitor pricing, import compliance, and local channel viability.</p>
    <a href="/en/b2b/market-assessment/" class="ui-link-icon" aria-label="Market Assessment details">Learn more (From €690)</a>
  </article>
  <article class="tile"><span class="tile-no">02 / OUTREACH</span><span class="ui-icon tile-pictogram icon-users" aria-hidden="true"></span>
    <h3>Buyer Development</h3>
    <p>45-day structured outreach identifying verified corporate buyers, mapping decision-makers, and generating active discussions.</p>
    <a href="/en/b2b/buyer-development/" class="ui-link-icon" aria-label="Buyer Development details">Learn more (From €2.490)</a>
  </article>
  <article class="tile"><span class="tile-no">03 / STRATEGY</span><span class="ui-icon tile-pictogram icon-map-pin" aria-hidden="true"></span>
    <h3>Market Entry</h3>
    <p>Comprehensive 60-day market entry roadmap: competitor positioning, distribution architecture, and launch execution.</p>
    <a href="/en/b2b/market-entry/" class="ui-link-icon" aria-label="Market Entry details">Learn more (From €3.900)</a>
  </article>
  <article class="tile"><span class="tile-no">04 / DISTRIBUTION</span><span class="ui-icon tile-pictogram icon-workflow" aria-hidden="true"></span>
    <h3>Distributor Development</h3>
    <p>Partner search and vetting across Central and Western Europe. Finding distributors with active customer channels.</p>
    <a href="/en/b2b/distributor-development/" class="ui-link-icon" aria-label="Distributor Development details">Learn more (Custom)</a>
  </article>
  <article class="tile"><span class="tile-no">05 / SALES</span><span class="ui-icon tile-pictogram icon-chart" aria-hidden="true"></span>
    <h3>Sales Outsourcing</h3>
    <p>Dedicated European business development team. Continuous prospect qualification and sales meeting pipeline.</p>
    <a href="/en/b2b/sales-outsourcing/" class="ui-link-icon" aria-label="Sales Outsourcing details">Learn more (From €2.750/mo)</a>
  </article>
  <article class="tile"><span class="tile-no">06 / SOURCING</span><span class="ui-icon tile-pictogram icon-file-text" aria-hidden="true"></span>
    <h3>Supplier Matching</h3>
    <p>Identify, evaluate, and audit European manufacturing and production suppliers meeting your specifications.</p>
    <a href="/en/b2b/supplier-matching/" class="ui-link-icon" aria-label="Supplier Matching details">Learn more (Custom)</a>
  </article>
</div></div></section>

<section class="site-section site-panel"><div class="wrap">
  <span class="site-label">TRANSPARENT STATUS TAXONOMY</span>
  <h2>How we classify and report commercial contacts.</h2>
  <p class="site-lead">A contact record is not a buyer until verified interest is confirmed. We operate with strict status definitions so you always know the exact stage of every target company.</p>
  <div class="b2b-status-dictionary">
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-identified">01 / Identified</span>
      <h4>Company Identified</h4>
      <p>Target company identified in public registries or commercial indexes matching industry and size criteria.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-reviewed">02 / Reviewed</span>
      <h4>Commercially Reviewed</h4>
      <p>Company website, product catalogue, and executive decision-makers researched and validated for fit.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-contacted">03 / Contacted</span>
      <h4>Outreach Conducted</h4>
      <p>Direct, professional multi-touch communication delivered to verified corporate decision-makers.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-responded">04 / Responded</span>
      <h4>Response Received</h4>
      <p>Decision-maker responded with interest, questions, or specific product and pricing requirements.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-opportunity">05 / Opportunity</span>
      <h4>Qualified Opportunity</h4>
      <p>Commercial introduction scheduled or request for proposal initiated directly between both parties.</p>
    </div>
  </div>
</div></section>

<section class="site-section"><div class="wrap">
  <span class="site-label">PRICING AND PACKAGES</span>
  <h2>Clear fixed pricing. No hidden fees.</h2>
  <p class="site-lead">Select the scope that fits your current commercial objective. All pricing is transparent and backed by clear deliverables.</p>
  <div class="b2b-pricing-grid">
    <div class="b2b-price-card">
      <div class="b2b-price-header">
        <h3>Market Assessment</h3>
        <p>Rapid validation before capital deployment.</p>
      </div>
      <div class="b2b-price-figure">€690 <span>one-time</span></div>
      <div class="b2b-price-timeline">Delivery: 7-10 business days</div>
      <ul class="b2b-price-features">
        <li>Competitor landscape and pricing review</li>
        <li>Regulatory, certification and import review</li>
        <li>15-20 verified prospective buyer profiles</li>
        <li>Executive market entry recommendation</li>
      </ul>
      <div class="b2b-price-cta">
        <a class="site-pill" href="${mailtoLink('Market Assessment Inquiry (€690) - Lokmira', 'Market Assessment (€690)', 'en')}">Select package</a>
      </div>
    </div>
    <div class="b2b-price-card featured">
      <span class="b2b-price-badge">Most Popular</span>
      <div class="b2b-price-header">
        <h3>Buyer Development</h3>
        <p>Structured corporate outreach cycle.</p>
      </div>
      <div class="b2b-price-figure">€2.490 <span>per cycle</span></div>
      <div class="b2b-price-timeline">Duration: 45 business days</div>
      <ul class="b2b-price-features">
        <li>60-100 verified European target companies</li>
        <li>Named decision-makers (C-Level, Procurement, VPs)</li>
        <li>Multi-channel personalized outreach</li>
        <li>Live pipeline reporting with status logs</li>
        <li>Direct introduction handovers for interested buyers</li>
      </ul>
      <div class="b2b-price-cta">
        <a class="site-pill" href="${mailtoLink('Buyer Development Inquiry (€2.490) - Lokmira', 'Buyer Development (€2.490)', 'en')}">Start 45-day cycle</a>
      </div>
    </div>
    <div class="b2b-price-card">
      <div class="b2b-price-header">
        <h3>Market Entry</h3>
        <p>Full strategic launch roadmap.</p>
      </div>
      <div class="b2b-price-figure">€3.900 <span>one-time</span></div>
      <div class="b2b-price-timeline">Duration: 60 business days</div>
      <ul class="b2b-price-features">
        <li>Comprehensive market assessment</li>
        <li>Distributor and buyer partner mapping (100+ profiles)</li>
        <li>Channel pricing and distribution margin modeling</li>
        <li>Complete 60-day execution roadmap</li>
      </ul>
      <div class="b2b-price-cta">
        <a class="site-pill" href="${mailtoLink('Market Entry Inquiry (€3.900) - Lokmira', 'Market Entry (€3.900)', 'en')}">Select package</a>
      </div>
    </div>
  </div>
</div></section>

<section class="site-section site-panel"><div class="wrap content-grid">
<div class="site-copy"><span class="site-label">FREQUENTLY ASKED QUESTIONS</span>
<h2>Common questions about B2B services</h2>
<details class="faqdetails"><summary>How do you verify target company data?</summary><p>We verify company activity through national business registries, active company websites, public financial filings, and professional executive profiles before conducting outreach.</p></details>
<details class="faqdetails"><summary>Can you guarantee closed contracts or signed deals?</summary><p>No. We guarantee diligent research, verified decision-maker identification, and structured outreach. Commercial terms, pricing negotiation, and final contract execution remain entirely between your company and the prospective buyer.</p></details>
<details class="faqdetails"><summary>Which countries and languages are supported?</summary><p>We support market intelligence and business development across Central and Western Europe, with core research capabilities in English, Hungarian, and regional European trading hubs.</p></details>
<details class="faqdetails"><summary>What do you need from us to begin?</summary><p>We need your product specifications, target customer profiles, preferred countries, sample pricing, and commercial presentation materials. We review these together during initial onboarding.</p></details>
</div>
<aside class="side-card"><h3>Commercial proposal</h3><p>Share your target market and commercial objectives for a clear, written proposal within 24 hours.</p>
<a href="${mailtoLink('International B2B Proposal Request - Lokmira', 'General B2B Inquiry', 'en')}" class="ui-link-icon">Send email inquiry</a>
<a href="/en/about/" class="ui-link-icon">About Lokmira</a>
<a href="/en/services/" class="ui-link-icon">Local Growth services</a>
</aside>
</div></section>

<section class="site-cta"><div class="wrap site-cta-row">
<div><h2>Ready to expand your European reach?</h2><p>Contact our advisory team to review your target market and evaluate commercial opportunities.</p></div>
<a class="site-pill ui-link-icon" href="${mailtoLink('International B2B Inquiry - Lokmira', 'B2B Hub Footer CTA', 'en')}">Request consultation</a>
</div></section>
</main>
<footer class="site-footer"></footer>
</body></html>`;

const huHub = `<!doctype html>
<html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="google-site-verification" content="km1EpHT5L_IUzBBj709rZfeyxZ3zaUM86yIxYJ0nfJk" />
<meta name="robots" content="index,follow"><meta name="theme-color" content="#101820">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="description" content="Nemzetközi B2B piacfelmérés, ellenőrzött vevőkapcsolatok építése és európai piacra lépési tanácsadás gyártóknak, exportőröknek és forgalmazóknak.">
<meta property="og:type" content="website"><meta property="og:site_name" content="Lokmira">
<meta property="og:url" content="https://lokmira.com/hu/nemzetkozi-b2b/"><meta property="og:locale" content="hu_HU"><meta property="og:locale:alternate" content="en_US">
<meta property="og:title" content="Nemzetközi B2B Piackutatás és Üzletfejlesztés | Lokmira">
<meta property="og:description" content="Nemzetközi B2B piacfelmérés, ellenőrzött vevőkapcsolatok építése és európai piacra lépési tanácsadás gyártóknak, exportőröknek és forgalmazóknak.">
<link rel="canonical" href="https://lokmira.com/hu/nemzetkozi-b2b/"><link rel="alternate" hreflang="hu" href="https://lokmira.com/hu/nemzetkozi-b2b/"><link rel="alternate" hreflang="en" href="https://lokmira.com/en/b2b/">
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg"><link rel="stylesheet" href="/pages.css"><script src="/pages.js" defer></script>
<title>Nemzetközi B2B Piackutatás és Üzletfejlesztés | Lokmira</title>
<link rel="stylesheet" href="/shared-chrome.css?v=20261020-all-pages"><meta property="og:image" content="https://lokmira.com/images/hero-banner-hu.webp">
<meta property="og:image:width" content="1448"><meta property="og:image:height" content="1086"><meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://lokmira.com/images/hero-banner-hu.webp"><link rel="apple-touch-icon" href="/brand/focus-app-icon.svg"><link rel="manifest" href="/manifest.json">
</head>
<body class="site-page"><a class="skip" href="#main">Ugrás a tartalomra</a>
<header class="site-head"><div class="wrap site-head-inner"><a class="site-brand" href="/" aria-label="Lokmira"><img src="/brand/focus-mark.svg" width="38" height="38" alt="">lokmira<span class="chrome-dot">.</span></a><nav id="site-nav" class="site-nav" aria-label="Fő navigáció"><a href="/hu/szolgaltatasok/">Helyi növekedés</a><a href="/hu/nemzetkozi-b2b/" aria-current="page">Nemzetközi B2B</a><a href="/hu/modszer/">Módszerünk</a><a href="/hu/rolunk/">Rólunk</a><a class="mobile-contact" href="/hu/kapcsolat/">Kapcsolat</a></nav><div class="site-nav-end"><div class="site-langs" aria-label="Language"><a href="/hu/nemzetkozi-b2b/" aria-current="page">HU</a><span>/</span><a href="/en/b2b/">EN</a></div><a class="nav-cta ui-link-icon" href="/hu/kapcsolat/">Kapcsolat</a><button class="site-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Menü megnyitása"><span></span><span></span></button></div></div></header>
<main id="main">
<section class="site-hero service-hero"><div class="wrap site-hero-inner"><div>
<div class="site-kicker">NEMZETKÖZI B2B · PIACI INTELLIGENCIA</div>
<h1>Alapos piaci felmérés.<br><em>Valós üzleti tárgyalások.</em></h1>
<p>Európai piacfelmérést, ellenőrzött vevőazonosítást és közvetlen döntéshozói kapcsolatépítést biztosítunk országhatárokon túlra lépő vállalatok számára.</p>
<div class="b2b-audience-row">
  <span class="b2b-audience-pill"><span class="ui-icon icon-target" aria-hidden="true"></span>Gyártóknak</span>
  <span class="b2b-audience-pill"><span class="ui-icon icon-users" aria-hidden="true"></span>Exportőröknek</span>
  <span class="b2b-audience-pill"><span class="ui-icon icon-workflow" aria-hidden="true"></span>Forgalmazóknak</span>
  <span class="b2b-audience-pill"><span class="ui-icon icon-map-pin" aria-hidden="true"></span>Új piacra lépőknek</span>
</div>
<div class="site-hero-actions">
  <a class="site-pill ui-link-icon" href="${mailtoLink('Nemzetközi B2B Ajánlatkérés - Lokmira', 'Nemzetközi B2B Főoldal', 'hu')}">Ajánlatkérés nemzetközi piacra</a>
  <a class="service-detail-link ui-link-icon" href="#b2b-services">Szolgáltatások áttekintése</a>
</div>
</div>
<aside class="editorial-panel" aria-label="Strukturált nemzetközi növekedés"><p class="editorial-panel-title">Strukturált európai növekedés</p>
<div class="editorial-step"><span class="ui-icon icon-target" aria-hidden="true"></span><div><h2>01 / Felmérés</h2><p>Piacméret, versenytársak és szabályozási követelmények ellenőrzése.</p></div></div>
<div class="editorial-step"><span class="ui-icon icon-users" aria-hidden="true"></span><div><h2>02 / Azonosítás</h2><p>Valós döntéshozók és releváns üzleti partnerek feltérképezése.</p></div></div>
<div class="editorial-step"><span class="ui-icon icon-workflow" aria-hidden="true"></span><div><h2>03 / Kapcsolat</h2><p>Célzott szakmai megkeresések és közvetlen üzleti bemutatkozások.</p></div></div>
</aside></div></section>

<section id="b2b-services" class="site-section"><div class="wrap"><span class="site-label">LOKMIRA TANÁCSADÁSI TERÜLETEK</span>
<h2>Nemzetközi terjeszkedésre hangolva.</h2>
<p class="site-lead">Legyen szó új európai célpiac vizsgálatáról, disztribútori hálózat bővítéséről vagy közvetlen ipari vevőszerzésről, átlátható felméréssel és ellenőrzött adatokkal dolgozunk.</p>
<div class="tile-grid">
  <article class="tile"><span class="tile-no">01 / VALIDÁLÁS</span><span class="ui-icon tile-pictogram icon-target" aria-hidden="true"></span>
    <h3>Piacfelmérés</h3>
    <p>Gyors és alapos célpiaci ellenőrzés: versenytársak, árképzés, importkövetelmények és disztribúciós csatornák.</p>
    <a href="/hu/nemzetkozi-b2b/piacfelmeres/" class="ui-link-icon" aria-label="Piacfelmérés részletei">Részletek (690 €-tól)</a>
  </article>
  <article class="tile"><span class="tile-no">02 / MEGSZÓLÍTÁS</span><span class="ui-icon tile-pictogram icon-users" aria-hidden="true"></span>
    <h3>Vevőkapcsolatok fejlesztése</h3>
    <p>45 napos strukturált vevőszerzés: 60-100 célvállalat döntéshozóinak közvetlen elérése és érdeklődés felkeltése.</p>
    <a href="/hu/nemzetkozi-b2b/vevokapcsolatok-fejlesztese/" class="ui-link-icon" aria-label="Vevőkapcsolatok fejlesztése részletei">Részletek (2.490 €-tól)</a>
  </article>
  <article class="tile"><span class="tile-no">03 / STRATÉGIA</span><span class="ui-icon tile-pictogram icon-map-pin" aria-hidden="true"></span>
    <h3>Piacra lépés</h3>
    <p>Teljes 60 napos piacra lépési stratégia: versenytársi pozicionálás, értékesítési architektúra és bevezetési terv.</p>
    <a href="/hu/nemzetkozi-b2b/piacra-lepes/" class="ui-link-icon" aria-label="Piacra lépés részletei">Részletek (3.900 €-tól)</a>
  </article>
  <article class="tile"><span class="tile-no">04 / DISZTRIBÚCIÓ</span><span class="ui-icon tile-pictogram icon-workflow" aria-hidden="true"></span>
    <h3>Disztribútori hálózatépítés</h3>
    <p>Megbízható közép- és nyugat-európai forgalmazók felkutatása, minősítése és a kereskedelmi tárgyalások előkészítése.</p>
    <a href="/hu/nemzetkozi-b2b/disztributori-halozat-fejlesztese/" class="ui-link-icon" aria-label="Disztribútori hálózatépítés részletei">Részletek (Egyedi ajánlat)</a>
  </article>
  <article class="tile"><span class="tile-no">05 / ÉRTÉKESÍTÉS</span><span class="ui-icon tile-pictogram icon-chart" aria-hidden="true"></span>
    <h3>Értékesítés kiszervezése</h3>
    <p>Dedikált európai üzletfejlesztési támogatás: folyamatos kapcsolatépítés, érdeklődők minősítése és tárgyalások szervezése.</p>
    <a href="/hu/nemzetkozi-b2b/ertekesites-kiszervezese/" class="ui-link-icon" aria-label="Értékesítés kiszervezése részletei">Részletek (Havi 2.750 €-tól)</a>
  </article>
  <article class="tile"><span class="tile-no">06 / BESZERZÉS</span><span class="ui-icon tile-pictogram icon-file-text" aria-hidden="true"></span>
    <h3>Beszállítókeresés</h3>
    <p>Gyártási kapacitások, minőségi tanúsítványok és árstruktúrák felmérése megbízható európai beszállítók felkutatásához.</p>
    <a href="/hu/nemzetkozi-b2b/beszallitokereses/" class="ui-link-icon" aria-label="Beszállítókeresés részletei">Részletek (Egyedi ajánlat)</a>
  </article>
</div></div></section>

<section class="site-section site-panel"><div class="wrap">
  <span class="site-label">PONTOS STÁTUSZMEGHATÁROZÁS</span>
  <h2>Hogyan osztályozzuk és jelentjük az üzleti kapcsolatokat?</h2>
  <p class="site-lead">Egy fellelt cégadat még nem jelent valós vevőt. Egyértelmű definíciókkal dolgozunk, így Ön mindig pontosan látja, melyik cég melyik fázisban jár.</p>
  <div class="b2b-status-dictionary">
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-identified">01 / Azonosított</span>
      <h4>Feltérképezett cég</h4>
      <p>Nyilvános cégnyilvántartásokban azonosított európai vállalat, amely megfelel az iparági és méretbeli feltételeknek.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-reviewed">02 / Ellenőrzött</span>
      <h4>Szakmailag átvizsgált</h4>
      <p>Weboldal, termékkínálat és konkrét döntéshozói személyek alapján ellenőrzött és jóváhagyott vállalkozás.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-contacted">03 / Megkeresett</span>
      <h4>Megszólított döntéshozó</h4>
      <p>Közvetlen, személyre szabott szakmai üzenettel elért beszerzési vagy felsővezetői döntéshozó.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-responded">04 / Válaszolt</span>
      <h4>Visszajelzés érkezett</h4>
      <p>A döntéshozó szakmai kérdéssel, termékspecifikáció kérésével vagy konkrét visszajelzéssel válaszolt.</p>
    </div>
    <div class="b2b-status-card">
      <span class="b2b-status-tag b2b-status-opportunity">05 / Üzleti lehetőség</span>
      <h4>Minősített üzleti lehetőség</h4>
      <p>Közvetlen ajánlatkérés vagy egyeztetett tárgyalási időpont a felek között az érdemi egyeztetés megkezdésére.</p>
    </div>
  </div>
</div></section>

<section class="site-section"><div class="wrap">
  <span class="site-label">DÍJAK ÉS CSOMAGOK</span>
  <h2>Átlátható díjszabás. Rejtett költségek nélkül.</h2>
  <p class="site-lead">Válassza ki vállalkozása céljaihoz illeszkedő együttműködést. Minden csomag konkrét, ellenőrizhető eredménytermékeket tartalmaz.</p>
  <div class="b2b-pricing-grid">
    <div class="b2b-price-card">
      <div class="b2b-price-header">
        <h3>Piacfelmérés</h3>
        <p>Gyors validálás a tőkebefektetés előtt.</p>
      </div>
      <div class="b2b-price-figure">690 € <span>egyszeri díj</span></div>
      <div class="b2b-price-timeline">Átfutási idő: 7-10 munkanap</div>
      <ul class="b2b-price-features">
        <li>Versenytársi kör és árképzési áttekintés</li>
        <li>Szabályozási, vám- és minősítési ellenőrzés</li>
        <li>15-20 ellenőrzött potenciális partnerprofil</li>
        <li>Vezetői piaci összefoglaló és javaslat</li>
      </ul>
      <div class="b2b-price-cta">
        <a class="site-pill" href="${mailtoLink('Piacfelmérés Ajánlatkérés (690 €) - Lokmira', 'Piacfelmérés (690 €)', 'hu')}">Csomag kiválasztása</a>
      </div>
    </div>
    <div class="b2b-price-card featured">
      <span class="b2b-price-badge">Legnépszerűbb</span>
      <div class="b2b-price-header">
        <h3>Vevőkapcsolatok fejlesztése</h3>
        <p>Strukturált európai kapcsolatépítés.</p>
      </div>
      <div class="b2b-price-figure">2.490 € <span>/ 45 napos ciklus</span></div>
      <div class="b2b-price-timeline">Időtartam: 45 munkanap</div>
      <ul class="b2b-price-features">
        <li>60-100 ellenőrzött európai célvállalat</li>
        <li>Név szerinti döntéshozók (vezérigazgatók, beszerzés)</li>
        <li>Többcsatornás, személyre szabott kapcsolatfelvétel</li>
        <li>Rendszeres riportálás státusznaplóval</li>
        <li>Közvetlen üzleti átadás az érdeklődő partnerekkel</li>
      </ul>
      <div class="b2b-price-cta">
        <a class="site-pill" href="${mailtoLink('Vevőkapcsolatok Fejlesztése Ajánlatkérés (2.490 €) - Lokmira', 'Vevőkapcsolatok Fejlesztése (2.490 €)', 'hu')}">45 napos ciklus indítása</a>
      </div>
    </div>
    <div class="b2b-price-card">
      <div class="b2b-price-header">
        <h3>Piacra lépés</h3>
        <p>Teljes stratégiai bevezetési terv.</p>
      </div>
      <div class="b2b-price-figure">3.900 € <span>egyszeri díj</span></div>
      <div class="b2b-price-timeline">Időtartam: 60 munkanap</div>
      <ul class="b2b-price-features">
        <li>Átfogó európai piacelemzés és pozicionálás</li>
        <li>Forgalmazói és vevői partnertérkép (100+ profil)</li>
        <li>Árrés- és csatornamodellezés</li>
        <li>Részletes 60 napos megvalósítási ütemterv</li>
      </ul>
      <div class="b2b-price-cta">
        <a class="site-pill" href="${mailtoLink('Piacra Lépés Ajánlatkérés (3.900 €) - Lokmira', 'Piacra Lépés (3.900 €)', 'hu')}">Csomag kiválasztása</a>
      </div>
    </div>
  </div>
</div></section>

<section class="site-section site-panel"><div class="wrap content-grid">
<div class="site-copy"><span class="site-label">GYAKRAN ISMÉTELT KÉRDÉSEK</span>
<h2>Gyakori kérdések a nemzetközi B2B szolgáltatásokról</h2>
<details class="faqdetails"><summary>Hogyan ellenőrzik a célvállalatok adatait?</summary><p>A vállalatok működését hivatalos nemzeti cégbírósági adatok, aktív weboldalak, nyilvános pénzügyi beszámolók és szakmai vezetői profilok alapján ellenőrizzük a kapcsolatfelvétel előtt.</p></details>
<details class="faqdetails"><summary>Garantálnak aláírt szerződéseket vagy bevételt?</summary><p>Nem ígérünk garantált szerződéskötést vagy bevételi összeget. A Lokmira a pontos piaci kutatást, a valós döntéshozók felkutatását és a professzionális kapcsolatfelvételt garantálja. A kereskedelmi árak, feltételek és a szerződéskötés kizárólag a megbízó és a vevő közötti tárgyalások eredménye.</p></details>
<details class="faqdetails"><summary>Mely országok és nyelvek érhetők el?</summary><p>Közép- és Nyugat-Európa piacaira fókuszálunk, angol és magyar nyelvű kutatási és kommunikációs háttérrel.</p></details>
<details class="faqdetails"><summary>Milyen adatok szükségesek a kezdéshez?</summary><p>Termékleírások, minősítések, célzott iparágak, preferált országok és bemutató anyagok. Ezeket a közös munka indításakor egyeztetjük.</p></details>
</div>
<aside class="side-card"><h3>Egyeztetés és ajánlat</h3><p>Küldje el célpiacát és vállalkozása rövid bemutatását, és 24 órán belül írásos javaslatot küldünk.</p>
<a href="${mailtoLink('Nemzetközi B2B Ajánlatkérés - Lokmira', 'Általános B2B Érdeklődés', 'hu')}" class="ui-link-icon">Ajánlatkérés e-mailben</a>
<a href="/hu/rolunk/" class="ui-link-icon">Rólunk és szemléletünkről</a>
<a href="/hu/szolgaltatasok/" class="ui-link-icon">Helyi növekedési szolgáltatások</a>
</aside>
</div></section>

<section class="site-cta"><div class="wrap site-cta-row">
<div><h2>Készen áll az európai piacok meghódítására?</h2><p>Lépjen kapcsolatba tanácsadóinkkal célpiacai áttekintéséhez és a lehetőségek felméréséhez.</p></div>
<a class="site-pill ui-link-icon" href="${mailtoLink('Nemzetközi B2B Ajánlatkérés - Lokmira', 'B2B Hub Lábléc CTA', 'hu')}">Konzultáció kérése</a>
</div></section>
</main>
<footer class="site-footer"></footer>
</body></html>`;

// --------------------------------------------------------------------------
// 2. THE 6 SERVICE PAIRS
// --------------------------------------------------------------------------

const serviceConfigs = [
  {
    slugEn: 'market-assessment',
    slugHu: 'piacfelmeres',
    titleEn: 'International Market Assessment | Lokmira',
    titleHu: 'Nemzetközi B2B Piacfelmérés | Lokmira',
    descEn: 'Objective European B2B market assessment: competitor analysis, import regulations, pricing benchmarks, and verified prospective buyer profiling.',
    descHu: 'Objektív nemzetközi B2B piacfelmérés: versenytárselemzés, szabályozások, árképzési szintek és ellenőrzött potenciális vevők felmérése.',
    kickerEn: 'MARKET ASSESSMENT · EUROPEAN EXPANSION',
    kickerHu: 'PIACFELMÉRÉS · EURÓPAI TERJESZKEDÉS',
    h1En: 'Validate target markets.<br><em>Before investing capital.</em>',
    h1Hu: 'Mérje fel a célpiacot.<br><em>Mielőtt tőkét fektetne be.</em>',
    subEn: 'A focused 7-10 day diagnostic assessing competition, channel pricing, regulatory hurdles, and immediate commercial demand across European target countries.',
    subHu: 'Fókuszált 7-10 napos piacelemzés: versenytársak, árrések, szabályozási követelmények és valós piaci kereslet vizsgálata európai célországokban.',
    priceEn: '€690',
    priceHu: '690 €',
    timelineEn: 'Delivery: 7-10 business days',
    timelineHu: 'Átfutási idő: 7-10 munkanap',
    c1En: ['01 / COMPETITION', 'Competitor Landscape & Pricing', 'Direct comparison of active local brands, product portfolios, packaging formats, and price positioning in your target territory.'],
    c1Hu: ['01 / VERSENY', 'Versenytársi kör és árszintek', 'A célországban jelen lévő helyi és nemzetközi szereplők, termékkínálatok és árszintek közvetlen összehasonlítása.'],
    c2En: ['02 / REGULATION', 'Compliance & Channel Norms', 'Clear summary of import requirements, technical certifications, packaging rules, and standard regional distribution terms.'],
    c2Hu: ['02 / SZABÁLYOZÁS', 'Szabványok és piaci normák', 'Importkövetelmények, műszaki minősítések, csomagolási előírások és a szokásos forgalmazási feltételek összefoglalása.'],
    c3En: ['03 / PROSPECTS', 'Verified Target Profiles', 'Identification of 15-20 verified commercial companies meeting your ICP criteria with named executive contacts.'],
    c3Hu: ['03 / PARTNEREK', 'Ellenőrzött partnerprofilok', '15-20 valós, működő célvállalat és döntéshozó feltérképezése a megadott iparági paraméterek alapján.'],
    d1En: ['Market Validation Dossier', 'Comprehensive 15-20 page report detailing market size, growth signals, and entry barriers.'],
    d1Hu: ['Piaci Értékelő Dosszié', 'Részletes összefoglaló tanulmány a célpiac méretéről, növekedési lehetőségeiről és belépési korlátairól.'],
    d2En: ['Competitor Benchmark Matrix', 'Side-by-side comparison of local pricing, margin expectations, and distribution paths.'],
    d2Hu: ['Versenytárs Összehasonlító Mátrix', 'Áttekinthető táblázat a helyi árakról, elvárt árrésekről és az értékesítési csatornákról.'],
    d3En: ['Go / No-Go Decision Brief', 'Direct executive recommendation with risk assessment and suggested next commercial steps.'],
    d3Hu: ['Vezetői Döntési Javaslat', 'Egyértelmű szakmai javaslat a piaci belépés kockázatairól és a legcélravezetőbb következő lépésekről.'],
    faq1En: ['Why conduct an assessment before outreach?', 'Direct outreach without market context risks burning valuable accounts with misaligned pricing or missing regional compliance requirements.'],
    faq1Hu: ['Miért érdemes felméréssel kezdeni a közvetlen megkeresések előtt?', 'A célpiac ismerete nélküli megkeresés értékes partnerek elvesztésével járhat, ha az árak vagy a műszaki feltételek nem illeszkednek a helyi szokásokhoz.'],
    faq2En: ['Which data sources are used?', 'We consult official corporate registers, trade associations, specialized B2B trade databases, and verified corporate websites.'],
    faq2Hu: ['Milyen adatforrásokból dolgoznak?', 'Hivatalos nemzeti cégnyilvántartásokat, szakmai szövetségi adatbázisokat és közvetlen vállalati webhelyeket elemzünk.']
  },
  {
    slugEn: 'buyer-development',
    slugHu: 'vevokapcsolatok-fejlesztese',
    titleEn: 'B2B Buyer Development & Decision-Maker Outreach | Lokmira',
    titleHu: 'Nemzetközi B2B Vevőszerzés és Kapcsolatépítés | Lokmira',
    descEn: 'Structured 45-day B2B buyer development: 60-100 verified European target companies, named decision-maker outreach, and qualified introduction handovers.',
    descHu: 'Strukturált 45 napos nemzetközi B2B vevőszerzés: 60-100 ellenőrzött európai célvállalat, döntéshozók közvetlen elérése és minősített üzleti kapcsolatok.',
    kickerEn: 'BUYER DEVELOPMENT · COMMERCIAL SPRINT',
    kickerHu: 'VEVŐSZERZÉS · KERESKEDELMI SPRINT',
    h1En: 'Reach real buyers.<br><em>Open commercial doors.</em>',
    h1Hu: 'Valós vevők megszólítása.<br><em>Új üzleti lehetőségek.</em>',
    subEn: 'A disciplined 45-day cycle identifying target corporate accounts, engaging executive decision-makers, and booking qualified commercial conversations.',
    subHu: 'Fegyelmezett 45 napos ciklus: célvállalatok feltérképezése, döntéshozók közvetlen megszólítása és érdeklődő üzleti partnerek bemutatása.',
    priceEn: '€2.490',
    priceHu: '2.490 €',
    timelineEn: 'Duration: 45 business days',
    timelineHu: 'Időtartam: 45 munkanap',
    c1En: ['01 / AUDIT & ICP', 'Account Targeting & Qualification', 'Definition of your Ideal Customer Profile (revenue, employee size, product categories) and curation of 60-100 vetted target firms.'],
    c1Hu: ['01 / CÉLCSOPORT', 'Vállalati profil és célzás', 'A vállalkozásához legjobban illeszkedő vállalati profil (méret, árbevétel, profil) és 60-100 ellenőrzött célcég kiválasztása.'],
    c2En: ['02 / MULTI-TOUCH', 'Executive Outreach Campaign', 'Personalized multi-touch communication directed to procurement heads, commercial directors, and executive leadership.'],
    c2Hu: ['02 / ELÉRÉS', 'Személyre szabott kapcsolatfelvétel', 'Célzott szakmai megkeresések beszerzési vezetők, kereskedelmi igazgatók és tulajdonosok számára.'],
    c3En: ['03 / HANDOVER', 'Qualified Opportunity Booking', 'Live tracking of responses, logging commercial objections, and scheduling direct handover discussions for interested buyers.'],
    c3Hu: ['03 / ÁTADÁS', 'Minősített üzleti bemutatkozás', 'Válaszok élő követése, kereskedelmi kérdések rendszerezése és közvetlen megbeszélések átadása a megbízónak.'],
    d1En: ['Master Prospect Matrix', 'Complete database of 60-100 verified accounts with company details, decision-maker names, and direct business contacts.'],
    d1Hu: ['Mester Vevőadatbázis', '60-100 ellenőrzött célvállalat döntéshozóinak neveivel, beosztásaival és elérhetőségeivel.'],
    d2En: ['Live Communication Pipeline', 'Detailed log classifying every company through Identified, Reviewed, Contacted, and Responded stages.'],
    d2Hu: ['Élő Kapcsolatnapló', 'Részletes nyilvántartás az azonosított, ellenőrzött, megszólított és visszajelzést adó vállalatokról.'],
    d3En: ['Commercial Handover Briefs', 'Structured dossiers on responding accounts detailing specific product interest, delivery expectations, and next steps.'],
    d3Hu: ['Üzleti Átadási Dossziék', 'Összefoglaló adatlapok a komoly érdeklődést mutató partnerekről, termékigényeikről és a javasolt tárgyalási pontokról.'],
    faq1En: ['What response rate should we expect?', 'B2B response rates generally range between 4% and 15% depending on offer competitiveness, pricing, and sector maturity.'],
    faq1Hu: ['Milyen válaszarányra lehet számítani?', 'A minőségi nemzetközi B2B megkereséseknél a válaszarány 4% és 15% között alakul a termékkínálat és az árak versenyképességétől függően.'],
    faq2En: ['Who attends the commercial meetings?', 'Your internal commercial team leads the substantive sales discussions; we provide the introduction dossier and background context.'],
    faq2Hu: ['Ki vezeti a kereskedelmi tárgyalásokat?', 'Az érdemi értékesítési és ártárgyalásokat az Ön csapata vezeti; mi a bemutatkozást és a szakmai felkészítést biztosítjuk.']
  },
  {
    slugEn: 'market-entry',
    slugHu: 'piacra-lepes',
    titleEn: 'European Market Entry Strategy & Commercial Advisory | Lokmira',
    titleHu: 'Európai Piacra Lépési Stratégia és Tanácsadás | Lokmira',
    descEn: 'Full 60-day European market entry strategy: competitive positioning, distribution architecture, pricing models, and structured partner pipeline.',
    descHu: 'Átfogó 60 napos európai piacra lépési stratégia: versenytársi pozicionálás, értékesítési csatornák, árrésmodellek és strukturált partnerkapcsolatok.',
    kickerEn: 'MARKET ENTRY · STRATEGIC ROADMAP',
    kickerHu: 'PIACRA LÉPÉS · STRATÉGIAI ÚTITERV',
    h1En: 'Enter European markets.<br><em>With clear commercial clarity.</em>',
    h1Hu: 'Lépjen új európai piacra.<br><em>Világos kereskedelmi stratégiával.</em>',
    subEn: 'A complete 60-day strategic deployment combining deep market validation, channel design, pricing margin modeling, and partner selection.',
    subHu: 'Teljes 60 napos bevezetési stratégia: részletes piacelemzés, forgalmazói architektúra, árrésmodellezés és partnerválasztás egy kézben.',
    priceEn: '€3.900',
    priceHu: '3.900 €',
    timelineEn: 'Duration: 60 business days',
    timelineHu: 'Időtartam: 60 munkanap',
    c1En: ['01 / STRATEGY', 'Market Attractiveness Analysis', 'Evaluating consumer and industrial demand across target countries to select the single most profitable entry territory.'],
    c1Hu: ['01 / STRATÉGIA', 'Piacvonzási elemzés', 'Keresleti adatok és iparági volumenek elemzése a legjövedelmezőbb európai célország kiválasztásához.'],
    c2En: ['02 / ARCHITECTURE', 'Distribution & Channel Modeling', 'Designing optimal route-to-market: regional distributors, master agents, wholesale partners, or direct enterprise sales.'],
    c2Hu: ['02 / MODELLEZÉS', 'Értékesítési modell és csatornák', 'A legmegfelelőbb értékesítési út kijelölése: regionális disztribútorok, képviseleti partnerek vagy közvetlen ipari értékesítés.'],
    c3En: ['03 / ROADMAP', 'Execution Plan & Partner Pipeline', 'Developing a concrete 12-month commercial roadmap backed by an initial pipeline of 100+ mapped prospective accounts.'],
    c3Hu: ['03 / MEGVALÓSÍTÁS', 'Ütemterv és partnerlista', '12 hónapos megvalósítási ütemterv kidolgozása, 100+ feltérképezett és előszűrt kereskedelmi partnerrel.'],
    d1En: ['European Market Entry Blueprint', 'Complete 30+ page strategic roadmap covering positioning, unit economics, regulatory landscape, and channel margins.'],
    d1Hu: ['Európai Piacra Lépési Terv', 'Részletes, 30+ oldalas stratégiai dokumentum a pozicionálásról, költségekről, szabályozásokról és csatorna-árrésekről.'],
    d2En: ['Distribution Margin Calculator', 'Interactive model calculating importer margins, distributor cuts, and end-customer street prices.'],
    d2Hu: ['Értékesítési Árrésmodell', 'Kiszámítható modell az importőri árrések, viszonteladói szintek és a végfelhasználói árak meghatározására.'],
    d3En: ['Qualified 100-Account Directory', 'Directory of 100 qualified distributors, wholesalers, and major commercial buyers in the chosen target market.'],
    d3Hu: ['100 Ellenőrzött Partner Adatbázisa', 'A célpiac 100 legfontosabb forgalmazójának, nagykereskedőjének és vállalati vevőjének részletes adatbázisa.'],
    faq1En: ['How do we choose which country to enter first?', 'We evaluate market size, import tariff symmetry, logistics cost from your production facility, and competitor saturation.'],
    faq1Hu: ['Hogyan választjuk ki az elsőként célzott országot?', 'A piac mérete, a szállítási költségek, a logisztikai elérhetőség és a helyi piaci telítettség alapján választjuk ki a legideálisabb piacot.'],
    faq2En: ['Does this include legal entity setup?', 'We provide commercial market strategy. For company incorporation or formal tax filing, we collaborate with local legal specialists.'],
    faq2Hu: ['Tartalmazza ez a külföldi cégalapítást?', 'Kereskedelmi és értékesítési stratégiát készítünk. Hivatalos helyi cégalapításhoz vagy adóügyi ügyintézéshez akkreditált helyi partnereket ajánlunk.']
  },
  {
    slugEn: 'distributor-development',
    slugHu: 'disztributori-halozat-fejlesztese',
    titleEn: 'European Distributor Development & Channel Vetting | Lokmira',
    titleHu: 'Nemzetközi Disztribútori Hálózatépítés | Lokmira',
    descEn: 'Identify, vet, and appoint regional distributors across Central and Western Europe. Commercial capacity auditing and contractual term preparation.',
    descHu: 'Közép- és nyugat-európai forgalmazók felkutatása, szakmai ellenőrzése és szerződéses feltételek előkészítése gyártók számára.',
    kickerEn: 'DISTRIBUTOR DEVELOPMENT · CHANNEL EXPANSION',
    kickerHu: 'DISZTRIBÚCIÓ · ÉRTÉKESÍTÉSI HÁLÓZAT',
    h1En: 'Build distributor networks.<br><em>Across European regions.</em>',
    h1Hu: 'Építsen forgalmazói hálózatot.<br><em>Európai régiókban.</em>',
    subEn: 'Finding and vetting independent distributors with active sales teams, regional warehouses, and established retail or industrial client networks.',
    subHu: 'Saját értékesítési csapattal, raktárkapacitással és meglévő vevőkörrel rendelkező megbízható forgalmazók felkutatása és ellenőrzése.',
    priceEn: 'Custom',
    priceHu: 'Egyedi ajánlat',
    timelineEn: 'Scope tailored to target countries',
    timelineHu: 'A célországok számához igazítva',
    c1En: ['01 / IDENTIFY', 'Regional Distributor Mapping', 'Identifying established distributors in your vertical across target countries, excluding direct competitor representatives.'],
    c1Hu: ['01 / AZONOSÍTÁS', 'Regionális forgalmazók feltérképezése', 'Az adott ágazatban működő, független kereskedelmi képviseletek és disztribútorok összegyűjtése.'],
    c2En: ['02 / VETTING', 'Capacity & Credit Assessment', 'Vetting warehouse facilities, fleet operations, existing brand portfolio, and commercial reputation.'],
    c2Hu: ['02 / MINŐSÍTÉS', 'Kapacitás és megbízhatóság', 'Raktárkapacitás, forgalmazott márkák, területi lefedettség és pénzügyi megbízhatóság vizsgálata.'],
    c3En: ['03 / NEGOTIATE', 'Distribution Terms Alignment', 'Preparing wholesale terms, minimum order quantities (MOQs), territorial exclusivity guidelines, and payment schedules.'],
    c3Hu: ['03 / EGYEZTETÉS', 'Kereskedelmi feltételek előkészítése', 'Nagykereskedelmi árrések, minimális rendelési mennyiségek (MOQ) és területi kizárólagossági feltételek egyeztetése.'],
    d1En: ['Distributor Assessment Profiles', 'In-depth evaluation dossiers on 20-40 regional distributors with audited capabilities.'],
    d1Hu: ['Forgalmazói Értékelő Adatlapok', 'Részletes szakmai elemzés 20-40 regionális disztribútor működéséről és piaci erejéről.'],
    d2En: ['Commercial Term Sheet Framework', 'Negotiation framework defining volume expectations, delivery terms (Incoterms), and marketing commitments.'],
    d2Hu: ['Kereskedelmi Feltételrendszer', 'Tárgyalási alap az elvárt volumenekről, szállítási paritásokról (Incoterms) és garanciális feltételekről.'],
    d3En: ['Appointed Partner Pipeline', 'Prioritized shortlist of distributors ready to review samples and commence distribution discussions.'],
    d3Hu: ['Előkészített Partnerlista', 'Priorizált lista a mintatermékek fogadására és tárgyalásokra kész forgalmazókról.'],
    faq1En: ['Should we grant exclusive territorial rights?', 'We recommend starting with milestone-based non-exclusive or volume-conditional exclusivity to protect your brand equity.'],
    faq1Hu: ['Érdemes kizárólagos forgalmazási jogot adni?', 'Kezdetben a teljesítményhez és volumenekhez kötött vagy nem-kizárólagos megállapodásokat javasoljuk a márka védelme érdekében.'],
    faq2En: ['How do you verify if a distributor actively sells?', 'We verify active dealer networks, attendance at regional industry fairs, and customer references in the destination country.'],
    faq2Hu: ['Honnan tudható, hogy egy forgalmazó valóban aktív?', 'Ellenőrizzük a meglévő viszonteladói hálózatukat, vásári megjelenéseiket és helyi piaci referenciáikat.']
  },
  {
    slugEn: 'sales-outsourcing',
    slugHu: 'ertekesites-kiszervezese',
    titleEn: 'European B2B Sales Outsourcing & Commercial Representation | Lokmira',
    titleHu: 'Nemzetközi B2B Értékesítés Kiszervezése | Lokmira',
    descEn: 'Dedicated European business development representation: continuous pipeline prospecting, executive meetings, and qualified commercial opportunities.',
    descHu: 'Dedikált európai értékesítési és üzletfejlesztési képviselet: folyamatos ügyfélkutatás, felsővezetői tárgyalások és minősített üzleti lehetőségek.',
    kickerEn: 'SALES OUTSOURCING · EUROPEAN REPRESENTATION',
    kickerHu: 'ÉRTÉKESÍTÉS · EURÓPAI KÉPVISELET',
    h1En: 'Outsourced sales representation.<br><em>Dedicated European focus.</em>',
    h1Hu: 'Kiszervezett értékesítés.<br><em>Dedikált európai fókusz.</em>',
    subEn: 'An experienced external business development unit generating qualified meetings, managing multi-market outreach, and maintaining commercial momentum.',
    subHu: 'Külső szakértő üzletfejlesztési támogatás: folyamatos megkeresések, döntéshozói egyeztetések és állandó kereskedelmi jelenlét európai piacokon.',
    priceEn: 'From €2.750',
    priceHu: 'Havi 2.750 €-tól',
    timelineEn: 'Monthly retainer (3-month minimum)',
    timelineHu: 'Havidíjas együttműködés (min. 3 hónap)',
    c1En: ['01 / DEDICATED BD', 'Trained Business Development', 'A dedicated commercial resource trained on your products, positioning, and target account profiles.'],
    c1Hu: ['01 / ERŐFORRÁS', 'Felkészített üzletfejlesztő', 'Az Ön termékkínálatára, műszaki előnyeire és célcsoportjára felkészített értékesítési kapacitás.'],
    c2En: ['02 / PIPELINE', 'Continuous Account Prospecting', 'Ongoing discovery, enrichment, and multi-channel outreach delivering 80-120 net new accounts contacted each month.'],
    c2Hu: ['02 / FOLYAMATOSSÁG', 'Állandó kapcsolatépítés', 'Havi 80-120 új célvállalat folyamatos feltárása, ellenőrzése és személyes megszólítása.'],
    c3En: ['03 / DISCOVERY', 'Discovery Meeting Qualification', 'Conducting initial commercial qualification calls and transferring qualified buyer interest to your senior sales team.'],
    c3Hu: ['03 / MINŐSÍTÉS', 'Kereskedelmi előszűrés', 'Első körös szakmai egyeztetések lefolytatása és a felkészült, konkrét érdeklődők átadása az Ön szakértőinek.'],
    d1En: ['Monthly Activity & Pipeline Dashboard', 'Real-time reporting on accounts identified, contacted, responded, meetings booked, and objection themes.'],
    d1Hu: ['Havi Tevékenységi és Pipeline Riport', 'Valós idejű kimutatás az elért cégekről, válaszokról, egyeztetett megbeszélésekről és piaci visszajelzésekről.'],
    d2En: ['Objection Handling Matrix', 'Documented log of market feedback on pricing, minimum order quantities, and competitive alternatives.'],
    d2Hu: ['Piaci Visszajelzés-összesítő', 'Rendszerezett összefoglaló a piacról érkező árazási, szállítási és versenytársi észrevételekről.'],
    d3En: ['Qualified Sales Opportunities', 'Direct introductions and scheduled discovery meetings with interested commercial buyers.'],
    d3Hu: ['Minősített Értékesítési Lehetőségek', 'Közvetlen üzleti megbeszélések és bemutatkozások konkrét vételi igénnyel rendelkező vevőkkel.'],
    faq1En: ['How does outsourcing compare to hiring internal staff?', 'Outsourcing eliminates recruitment delays, foreign employment tax overhead, and provides immediate European market outreach capabilities.'],
    faq1Hu: ['Miben különbözik a belső munkatárs felvételétől?', 'A kiszervezett modell nem igényel hosszadalmas toborzást és külföldi bérköltségeket, azonnali hozzáférést biztosítva az európai piacokhoz.'],
    faq2En: ['Can we integrate our internal CRM?', 'Yes. We can work directly within your HubSpot, Pipedrive, or Salesforce instance, or deliver structured weekly exports.'],
    faq2Hu: ['Összekapcsolható a meglévő CRM rendszerünkkel?', 'Igen, tudunk közvetlenül meglévő ügyfélkezelő rendszerében (pl. HubSpot, Pipedrive) dolgozni vagy heti strukturált adatokat átadni.']
  },
  {
    slugEn: 'supplier-matching',
    slugHu: 'beszallitokereses',
    titleEn: 'European Supplier Matching & Procurement Auditing | Lokmira',
    titleHu: 'Nemzetközi Beszállítókeresés és Minősítés | Lokmira',
    descEn: 'Identify and evaluate verified European manufacturers and sub-contractors: production capacity, quality certifications, and pricing negotiations.',
    descHu: 'Megbízható európai gyártók és beszállítók felkutatása: termelési kapacitás, minőségi tanúsítványok és ártárgyalások előkészítése.',
    kickerEn: 'SUPPLIER MATCHING · PROCUREMENT AUDITING',
    kickerHu: 'BESZÁLLÍTÓKERESÉS · BESZERZÉSI AUDIT',
    h1En: 'Find reliable suppliers.<br><em>Verified European quality.</em>',
    h1Hu: 'Megbízható beszállítók.<br><em>Ellenőrzött európai gyártás.</em>',
    subEn: 'Connecting industrial buyers, distributors, and wholesalers with vetted manufacturers offering competitive unit pricing and compliant standards.',
    subHu: 'Ipari vevők, nagykereskedők és forgalmazók összekapcsolása ellenőrzött európai gyártókkal, versenyképes árakkal és tanúsított minőségben.',
    priceEn: 'Custom',
    priceHu: 'Egyedi ajánlat',
    timelineEn: 'Scope tailored to component complexity',
    timelineHu: 'A termékspecifikációhoz igazítva',
    c1En: ['01 / SPECIFICATION', 'Technical Requirements Mapping', 'Auditing technical drawings, material tolerances, minimum order quantities, and target unit cost thresholds.'],
    c1Hu: ['01 / SPECIFIKÁCIÓ', 'Műszaki követelmények rögzítése', 'Műszaki rajzok, anyagminőségi előírások, tűrések, minimális rendelési mennyiségek és célárak pontosítása.'],
    c2En: ['02 / IDENTIFICATION', 'Manufacturer Auditing & Scouting', 'Scouting qualified manufacturing facilities across Central and Eastern Europe, verifying ISO/CE certifications.'],
    c2Hu: ['02 / KUTATÁS', 'Gyártók felkutatása és auditja', 'Megfelelő közép- és kelet-európai gyártóüzemek felkutatása, minőségi tanúsítványok (ISO, CE) ellenőrzése.'],
    c3En: ['03 / QUOTATIONS', 'RFQ Management & Sample Logistics', 'Issuing structured Requests for Quotation (RFQs), comparing unit rates, and coordinating test sample shipments.'],
    c3Hu: ['03 / AJÁNLATOK', 'Árajánlatkérés és mintázás', 'Strukturált árajánlatkérés (RFQ), árak összehasonlítása és tesztminták rendelésének koordinálása.'],
    d1En: ['Supplier Audit Matrix', 'Detailed comparison of 10-25 audited production facilities with machinery capacity and lead times.'],
    d1Hu: ['Beszállítói Audit Mátrix', '10-25 átvilágított gyártóüzem összehasonlítása géppark, kapacitás és szállítási határidők szerint.'],
    d2En: ['RFQ Rate Comparison Dossier', 'Clear breakdown of unit costs, tooling charges, payment terms, and volume discount tiers.'],
    d2Hu: ['Árajánlat Összehasonlító Kimutatás', 'Darabárak, szerszámköltségek, fizetési feltételek és mennyiségi lépcsők tiszta összehasonlítása.'],
    d3En: ['Commercial Procurement Summary', 'Final recommendation highlighting the top 2-3 supplier candidates with sample audit notes.'],
    d3Hu: ['Vezetői Beszerzési Javaslat', 'Záró szakmai javaslat a legmegfelelőbb 2-3 gyártóról, a tesztminták értékelésével együtt.'],
    faq1En: ['Which manufacturing sectors are covered?', 'We specialize in industrial components, metal fabrication, plastics, packaging, and commercial goods across Europe.'],
    faq1Hu: ['Mely gyártási ágazatokban vállalnak kutatást?', 'Ipari alkatrészek, fémipari megmunkálás, műanyagipar, csomagolástechnika és kereskedelmi termékek gyártásában.'],
    faq2En: ['Do you perform on-site factory visits?', 'We conduct documentary and commercial auditing; on-site technical inspection visits can be organized with specialized inspection partners.'],
    faq2Hu: ['Vállalnak személyes gyárlátogatást is?', 'Irat- és cégadat alapú kereskedelmi átvilágítást végzünk; igény esetén a helyszíni auditot akkreditált mérnöki partnereinkkel szervezzük meg.']
  }
];

function buildServicePage(cfg, lang) {
  const isHu = lang === 'hu';
  const slug = isHu ? cfg.slugHu : cfg.slugEn;
  const pairSlug = isHu ? cfg.slugEn : cfg.slugHu;
  const parentPath = isHu ? '/hu/nemzetkozi-b2b/' : '/en/b2b/';
  const canonical = `${origin}${isHu ? '/hu/nemzetkozi-b2b/' : '/en/b2b/'}${slug}/`;
  const alternateUrl = `${origin}${isHu ? '/en/b2b/' : '/hu/nemzetkozi-b2b/'}${pairSlug}/`;
  
  const title = isHu ? cfg.titleHu : cfg.titleEn;
  const desc = isHu ? cfg.descHu : cfg.descEn;
  const kicker = isHu ? cfg.kickerHu : cfg.kickerEn;
  const h1 = isHu ? cfg.h1Hu : cfg.h1En;
  const sub = isHu ? cfg.subHu : cfg.subEn;
  const price = isHu ? cfg.priceHu : cfg.priceEn;
  const timeline = isHu ? cfg.timelineHu : cfg.timelineEn;
  
  const c1 = isHu ? cfg.c1Hu : cfg.c1En;
  const c2 = isHu ? cfg.c2Hu : cfg.c2En;
  const c3 = isHu ? cfg.c3Hu : cfg.c3En;
  
  const d1 = isHu ? cfg.d1Hu : cfg.d1En;
  const d2 = isHu ? cfg.d2Hu : cfg.d2En;
  const d3 = isHu ? cfg.d3Hu : cfg.d3En;
  
  const faq1 = isHu ? cfg.faq1Hu : cfg.faq1En;
  const faq2 = isHu ? cfg.faq2Hu : cfg.faq2En;
  
  const mailSubject = isHu
    ? `${title} - Ajánlatkérés`
    : `${title} - Commercial Inquiry`;
  const mailCta = mailtoLink(mailSubject, isHu ? cfg.h1Hu.replace(/<[^>]+>/g, ' ') : cfg.h1En.replace(/<[^>]+>/g, ' '), lang);
  
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="google-site-verification" content="km1EpHT5L_IUzBBj709rZfeyxZ3zaUM86yIxYJ0nfJk" />
<meta name="robots" content="index,follow"><meta name="theme-color" content="#101820">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="description" content="${desc}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Lokmira">
<meta property="og:url" content="${canonical}"><meta property="og:locale" content="${isHu ? 'hu_HU' : 'en_US'}"><meta property="og:locale:alternate" content="${isHu ? 'en_US' : 'hu_HU'}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}">
<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="hu" href="${isHu ? canonical : alternateUrl}"><link rel="alternate" hreflang="en" href="${isHu ? alternateUrl : canonical}">
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg"><link rel="stylesheet" href="/pages.css"><script src="/pages.js" defer></script>
<title>${title}</title>
<link rel="stylesheet" href="/shared-chrome.css?v=20261020-all-pages"><meta property="og:image" content="https://lokmira.com/images/hero-banner-${lang}.webp">
<meta property="og:image:width" content="1448"><meta property="og:image:height" content="1086"><meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://lokmira.com/images/hero-banner-${lang}.webp"><link rel="apple-touch-icon" href="/brand/focus-app-icon.svg"><link rel="manifest" href="/manifest.json">
</head>
<body class="site-page"><a class="skip" href="#main">${isHu ? 'Ugrás a tartalomra' : 'Skip to content'}</a>
<header class="site-head"></header>
<main id="main">
<section class="site-hero service-hero"><div class="wrap site-hero-inner"><div>
<div class="site-kicker">${kicker}</div>
<h1>${h1}</h1>
<p>${sub}</p>
<div class="site-hero-actions">
  <a class="site-pill ui-link-icon" href="${mailCta}">${isHu ? 'Ajánlatkérés a szolgáltatásra' : 'Request service proposal'}</a>
  <a class="service-detail-link ui-link-icon" href="#service-details">${isHu ? 'Részletes áttekintés' : 'See what is included'}</a>
</div>
</div>
<aside class="editorial-panel" aria-label="${isHu ? 'Szolgáltatás áttekintése' : 'Service overview'}"><p class="editorial-panel-title">${isHu ? 'Csomag információk' : 'Engagement parameters'}</p>
<div class="editorial-step"><span class="ui-icon icon-target" aria-hidden="true"></span><div><h2>${isHu ? 'Irányár' : 'Target Fee'}</h2><p>${price}</p></div></div>
<div class="editorial-step"><span class="ui-icon icon-chart" aria-hidden="true"></span><div><h2>${isHu ? 'Ütemezés' : 'Timeline'}</h2><p>${timeline}</p></div></div>
<div class="editorial-step"><span class="ui-icon icon-workflow" aria-hidden="true"></span><div><h2>${isHu ? 'Kapcsolat' : 'Direct Inquiry'}</h2><p>samigrowlab@gmail.com</p></div></div>
</aside></div></section>

<section id="service-details" class="site-section"><div class="wrap"><span class="site-label">${isHu ? 'A SZOLGÁLTATÁS TARTALMA' : 'WHAT THE SERVICE COVERS'}</span>
<h2>${isHu ? 'Hogyan épül fel a közös munka?' : 'How this advisory service is delivered.'}</h2>
<p class="site-lead">${isHu ? 'Minden feladat világos lépésekből áll, ellenőrizhető eredményekkel és rendszeres visszajelzésekkel.' : 'Every step is structured around clear deliverables, verified information, and transparent status reporting.'}</p>
<div class="info-cards">
  <article><span class="ui-icon info-pictogram icon-target" aria-hidden="true"></span><span class="site-label">${c1[0]}</span><h3>${c1[1]}</h3><p>${c1[2]}</p></article>
  <article><span class="ui-icon info-pictogram icon-search" aria-hidden="true"></span><span class="site-label">${c2[0]}</span><h3>${c2[1]}</h3><p>${c2[2]}</p></article>
  <article><span class="ui-icon info-pictogram icon-clipboard-check" aria-hidden="true"></span><span class="site-label">${c3[0]}</span><h3>${c3[1]}</h3><p>${c3[2]}</p></article>
</div></div></section>

<section class="site-section site-panel"><div class="wrap site-panel-grid"><div>
<span class="site-label">${isHu ? 'DOKUMENTÁLT EREDMÉNYEK' : 'PRACTICAL DELIVERABLES'}</span>
<h2>${isHu ? 'Konkrét átadott anyagok' : 'Actionable materials you receive'}</h2>
<p class="site-lead">${isHu ? 'A projekt során az alábbi konkrét és rendszerezett anyagokat adjuk át vállalkozásának.' : 'Throughout the engagement, we deliver structured documentation and data your team can immediately deploy.'}</p>
</div>
<div class="site-proof"><strong>${isHu ? 'Főbb eredménytermékek' : 'Core deliverables'}</strong>
<ol>
  <li><b>01</b><span><strong>${d1[0]}:</strong> ${d1[1]}</span></li>
  <li><b>02</b><span><strong>${d2[0]}:</strong> ${d2[1]}</span></li>
  <li><b>03</b><span><strong>${d3[0]}:</strong> ${d3[1]}</span></li>
</ol>
</div></div></section>

<section class="site-section site-panel"><div class="wrap content-grid">
<div class="site-copy"><span class="site-label">${isHu ? 'GYAKORI KÉRDÉSEK' : 'FREQUENTLY ASKED QUESTIONS'}</span>
<h2>${isHu ? 'Fontos tisztázni a kezdés előtt' : 'Good to clarify before starting'}</h2>
<details class="faqdetails"><summary>${faq1[0]}</summary><p>${faq1[1]}</p></details>
<details class="faqdetails"><summary>${faq2[0]}</summary><p>${faq2[1]}</p></details>
<details class="faqdetails"><summary>${isHu ? 'Milyen fizetési feltételekkel dolgoznak?' : 'What payment terms apply?'}</summary><p>${isHu ? 'Fix összegű projektek esetén (pl. Piacfelmérés) a díj a munka indításakor fizetendő. Hosszabb ciklusoknál szakaszos mérföldkövek alapján állapodunk meg.' : 'For fixed-scope sprints like Market Assessment, fees are invoiced upon project kick-off. Phased sprints operate with milestone-based payment structures.'}</p></details>
</div>
<aside class="side-card"><h3>${isHu ? 'Konzultáció és ajánlat' : 'Direct consultation'}</h3>
<p>${isHu ? 'Kérjen írásos ajánlatot vagy tegye fel kérdéseit közvetlenül tanácsadóinknak.' : 'Request a written commercial proposal or contact our European advisory team.'}</p>
<a href="${mailCta}" class="ui-link-icon">${isHu ? 'Ajánlatkérés e-mailben' : 'Send proposal request'}</a>
<a href="${parentPath}" class="ui-link-icon">${isHu ? 'Nemzetközi B2B áttekintés' : 'All International B2B services'}</a>
<a href="${isHu ? '/hu/kapcsolat/' : '/en/contact/'}" class="ui-link-icon">${isHu ? 'Kapcsolatfelvétel' : 'Get in touch'}</a>
</aside>
</div></section>

<section class="site-cta"><div class="wrap site-cta-row">
<div><h2>${isHu ? 'Készen áll a következő lépésre?' : 'Ready to begin your European expansion?'}</h2>
<p>${isHu ? 'Lépjen kapcsolatba velünk és kérjen célzott ajánlatot célpiacaihoz.' : 'Contact our advisory team to discuss target countries and receive a tailored proposal.'}</p></div>
<a class="site-pill ui-link-icon" href="${mailCta}">${isHu ? 'Ajánlatkérés indítása' : 'Request proposal'}</a>
</div></section>
</main>
<footer class="site-footer"></footer>
</body></html>`;
}

// Write the files
mkdirSync('en/b2b', { recursive: true });
mkdirSync('hu/nemzetkozi-b2b', { recursive: true });

writeFileSync('en/b2b/index.html', enHub, 'utf8');
console.log('Created en/b2b/index.html');
writeFileSync('hu/nemzetkozi-b2b/index.html', huHub, 'utf8');
console.log('Created hu/nemzetkozi-b2b/index.html');

for (const cfg of serviceConfigs) {
  const dirEn = join('en/b2b', cfg.slugEn);
  const dirHu = join('hu/nemzetkozi-b2b', cfg.slugHu);
  mkdirSync(dirEn, { recursive: true });
  mkdirSync(dirHu, { recursive: true });
  
  writeFileSync(join(dirEn, 'index.html'), buildServicePage(cfg, 'en'), 'utf8');
  console.log(`Created ${dirEn}/index.html`);
  writeFileSync(join(dirHu, 'index.html'), buildServicePage(cfg, 'hu'), 'utf8');
  console.log(`Created ${dirHu}/index.html`);
}
console.log('All 14 B2B files generated successfully!');
