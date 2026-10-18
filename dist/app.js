"use strict";
// No cookies, tracking, active forms or external runtime requests.
const copy = {
  hu: {
    preview:"LOKMIRA · HELYI ÜGYFÉLSZERZÉS",
    brandNote:"",brandTagline:"Helyi láthatóság. Mérhető megkeresések.",skip:"Ugrás a tartalomra",navServices:"Szolgáltatások",navMethod:"Módszerünk",navAbout:"Rólunk",navPilot:"90 napos pilot",navQuestions:"Kérdések",navContact:"Kapcsolat",
    eyebrow:"BUDAPEST · DIGITÁLIS MARKETING ÉS HELYI NÖVEKEDÉS",heroLead:"Legyen a vállalkozásod megtalálható.",heroEnd:"Az érdeklődés pedig követhető.",
    heroText:"A Lokmira a helyi keresési jelenlétet, a Google Ads kampányokat, a tartalomkészítést és az érdeklődések nyomon követését kapcsolja össze budapesti szolgáltató vállalkozásoknak.",
    heroAction:"Fedezd fel a szolgáltatásokat",heroAction2:"Hogyan dolgozunk?",tag1:"Helyi SEO és Cégprofil",tag2:"Google Ads és tartalom",tag3:"Követhető megkeresések",
    diagramTitle:"A megkeresés útja",demo:"KONCEPCIÓ · NEM VALÓS ADAT",flow1:"Keresés",flow2:"Érdeklődés",flow3:"Ajánlat",flow4:"Megrendelés",
    detail2:"Hívás / ajánlatkérés",detail3:"Összeg / dátum / állapot",detail4:"Megnyert vagy elveszített",diagramFoot:"Folyamatábra. Nem valós ügyféladat és nem eredményígéret.",
    highlight1:"Szűk fókusz",highlight1b:"Egy nagy értékű szolgáltatás",highlight2:"Közös mérés",highlight2b:"Keresés → ajánlat → munka",highlight3:"Valós visszajelzés",highlight3b:"Tényleges megkeresések alapján",
    problemEyebrow:"A HELYI JELENLÉT ÉS AZ ÉRTÉKESÍTÉS KAPCSOLATA",
    problemTitle1:"Látható a céged.",
    problemTitle2:"De ez hoz megkeresést?",
    problemLead:"Sok helyi vállalkozásnak külön él a Google-profilja, a hirdetése és az ajánlatadása. Mi ezek között szeretnénk tisztább kapcsolatot teremteni.",
    problemAction:"Így gondolkodunk a teljes folyamatról",
    problem1:"Megtalálnak a megfelelő emberek?",
    problem1b:"A helyi kereséseknél az a legfontosabb, hogy milyen szándékkal és pontosan melyik szolgáltatásra keresnek.",
    problem2:"Érthető, miben vagy jó?",
    problem2b:"A Google-profil, a weboldal és a kreatív üzenetek ugyanazt a valós ajánlatot mutassák.",
    problem3:"Tudod, mi lett a megkeresésből?",
    problem3b:"A kattintás után érkező hívás, kérdés és ajánlat segít jó döntést hozni.",
    sampleEyebrow:"MIT MUTAT MEG AZ ELSŐ ÁTTEKINTÉS?",
    sampleTitle:"Három konkrét terület, amivel érdemes kezdeni.",
    sampleText:"Az első felmérés abban segít, hogy lásd a legfontosabb javítási pontokat és azok sorrendjét. Ez a minta a munkamódszert szemlélteti, nem egy valós ügyfél projektjét.",
    sampleAction:"Miért fontos a megkeresés mérése?",
    auditLabel:"SZEMLÉLTETŐ MINTA · NEM VALÓS ÜGYFÉL",
    auditQuestion:"Mire néznénk rá először?",
    audit1:"Helyi keresési jelenlét",
    audit1b:"Pontos adat és releváns szolgáltatás",
    audit2:"Kampány és ajánlat összhangja",
    audit2b:"Keresési szándék és egyértelmű cél",
    audit3:"Érdeklődés utáni folyamat",
    audit3b:"Kapcsolat, ajánlat, visszajelzés",
    auditFoot:"A valódi megállapításokat csak az adott vállalkozás ellenőrzése után lehet megfogalmazni.",
    offersEyebrow:"EGYÉRTELMŰ SZOLGÁLTATÁSI IRÁNYOK",offersTitle:"A célhoz igazodó együttműködés.",offersIntro:"A helyi láthatóságtól a hirdetési kampányokig: nem minden vállalkozásnak van szüksége minden csatornára.",offer1Text:"Google Cégprofil, helyi keresési jelenlét és a legfontosabb javítási pontok.",offer1a:"Helyi láthatósági áttekintés",offer1b:"Google Cégprofil és szolgáltatási adatok",offer1c:"Prioritások és következő lépések",offer2Text:"Keresési szándékhoz illő Google Ads és az érdeklődéstől az ajánlatig tartó út átláthatóvá tétele.",offer2a:"Célzott Google Ads megközelítés",offer2b:"Érdeklődések és ajánlatok követése",offer2c:"Üzleti visszajelzésre épülő értékelés",offer3Text:"Keresési, hirdetési és közösségi média feladatok összehangolása az üzleti célhoz igazítva.",offer3a:"A megfelelő csatornák összehangolása",offer3b:"Tartalomterv és láthatóság",offer3c:"Havi tanulságok és prioritások",offersDetails:"A szolgáltatás részletei",offersApproach:"A munkamódszer",offersDisclaimer:"Az egyes szolgáltatások konkrét köre és díjazása az adott vállalkozás alapján egyeztethető. A hirdetési költés külön költség.",
    servicesEyebrow:"MIBEN SEGÍT A LOKMIRA?",servicesTitle:"Láthatóság, ami célt szolgál.",servicesTitle2:"Együtt működő csatornák.",servicesText:"A szolgáltatásokat az adott vállalkozás helyzetéhez igazítjuk. Nem minden elem része automatikusan az első pilotnak.",
    service1:"Google Cégprofil és helyi SEO",service1b:"A vállalkozás adatainak, helyi keresési megjelenésének és szolgáltatási oldalainak áttekintése, folyamatos javítása.",
    service2:"Google Ads kampányok",service2b:"Vásárlási szándékra épülő keresési kampányok, átlátható költségkerettel és konverzióméréssel.",
    service3:"Meta hirdetések és lead kampányok",service3b:"Célzott Facebook és Instagram hirdetések, helyi érdeklődőket gyűjtő űrlapok és vizuális szolgáltatásbemutatás.",
    service4:"Konverziós érkezőoldalak",service4b:"Gyors, mobilbarát céloldalak egyértelmű árajánlatkéréssel és közvetlen hívásindítással a hirdetésekhez.",
    service5:"Közösségi média és tartalom",service5b:"Szolgáltatásközpontú tartalomterv, közösségi profilkezelés és a valós munkáidat bemutató következetes kommunikáció.",
    service6:"Érdeklődés- és ajánlatkövetés",service6b:"A keresést, megkeresést, ajánlatot és megrendelést összekötő egyszerű folyamat a valós adatok alapján.",serviceMore:"Részletek",storyLabel:"ÁTLÁTHATÓ KERETEK · VALÓS VISSZAJELZÉS",storyTitle:"Ellenőrizhető lépésekre építünk.",storyText:"Ügyfélreferenciákat és eredményeket csak akkor teszünk közzé, ha valódiak és igazolhatók. Addig is a munkafolyamatot, a feladatok körét és a közös értékelés szempontjait mutatjuk meg nyíltan.",storyAction:"Ismerd meg, hogyan gondolkodunk",
    methodEyebrow:"A KERESÉSTŐL A MEGRENDELÉSIG",methodTitle:"A kattintástól az ajánlatig.",methodTitle2:"Átlátható értékesítési folyamat.",
    methodText:"A hirdetési kattintás csak az első lépés. A folyamatot a kereséstől a beérkező megkeresésen és az elküldött ajánlaton át a megrendelésig követjük végig.",
    card1:"Keresési szándék",card1b:"Google Search kampány egy kiválasztott, nagy értékű szolgáltatásra.",
    card2:"Ajánlatkövetés",card2b:"Érdeklődések, elküldött ajánlatok és következő lépések áttekinthetően.",
    card3:"Hasznos riport",card3b:"A megkeresések és az elküldött ajánlatok alakulása egy helyen.",
    pilotLabel:"90 NAPOS EGYÜTTMŰKÖDÉSI MENETREND",pilotTitleA:"90 nap.",pilotTitleB:"Világos keretek.",
    pilotText:"Az első 90 nap fókusza a vállalkozás legfontosabb helyi szolgáltatása: megvizsgáljuk a jelenlegi láthatóságot, kipróbáljuk a leginkább indokolt lépéseket, majd a valódi megkeresések és ajánlatok alapján értékelünk.",
    pilotWarning:"A pilot ütemezése szemléltető példa; a pontos feladatok és díjazás külön egyeztetendő.",
    priceLabel:"90 NAPOS ELSŐ PILOT · TERVEZETT MENETREND",priceStatus:"Egy mérhető első lépés.",priceUnit:"Egy vállalkozásra szabott feladatsor",setup:"Három szakasz, egyetlen fő szolgáltatásra összpontosítva.",stage1Note:"Keresés, jelenlét, ajánlatkérés",stage2Note:"Egy kiválasztott szolgáltatási fókusz",stage3Note:"Mi volt mérhető, mi a következő lépés?",
    feature1:"Felmérés és célok",feature2:"Ellenőrzött teszt",
    feature3:"Visszajelzés és döntés",feature4:"A szakaszok az adott célhoz és erőforrásokhoz igazodnak.",
    priceNote:"A hirdetési költés külön értendő. Garantált bevételt vagy ügyfélszámot nem ígérünk.",
    faqLabel:"GYAKORI KÉRDÉSEK",faqHeading:"Tisztázzuk előre.",
    q1:"Már van weboldalunk és ajánlatkérő űrlapunk. Miért kellene új?",
    a1:"Lehet, hogy nem kell. Először a meglévő rendszert vizsgáljuk meg, és csak bizonyított hiány esetén ajánlunk változtatást.",
    q2:"Garantálható több új ügyfél?",
    a2:"Nem. A pilot célja egy mérhető, valós piaci teszt. Az eredmény a kereslettől, a szabad kapacitástól és a helyi versenytől is függ.",
    q3:"A Google hirdetési költés benne van a díjban?",
    a3:"Nem. A hirdetési költés a kampánykezeléstől külön költség, a szolgáltatási díjat pedig a munka megkezdése előtt rögzítjük.",
    contactLabel:"KÖVETKEZŐ LÉPÉS",contactTitle:"Először értsük meg a jelenlegi folyamatot.",
    contactText:"Helyi keresés, Google Ads és ügyfélmegkeresések: ismerd meg a szolgáltatásainkat és a közös munka első lépéseit.",
    contactAction:"Kapcsolat",
    footNote:"",footText:"Helyi láthatóság és követhető ügyfélmegkeresések Budapesten.",toTop:"Tetejére"
  },
  en: {
    preview:"LOKMIRA · LOCAL CUSTOMER GROWTH",
    brandNote:"",brandTagline:"Local visibility. Measurable enquiries.",skip:"Skip to content",navServices:"Services",navMethod:"Our approach",navAbout:"About",navPilot:"90-day pilot",navQuestions:"Questions",navContact:"Contact",
    eyebrow:"BUDAPEST · LOCAL DIGITAL MARKETING",heroLead:"Make your business easier to find.",heroEnd:"Make every enquiry easier to understand.",
    heroText:"Lokmira connects local search visibility, Google Ads, content planning and enquiry tracking for service businesses in Budapest.",
    heroAction:"Explore the services",heroAction2:"Our approach",tag1:"Local SEO & Business Profile",tag2:"Google Ads & content",tag3:"Traceable enquiries",
    diagramTitle:"The enquiry journey",demo:"CONCEPT · NO REAL CUSTOMER DATA",flow1:"Search",flow2:"Enquiry",flow3:"Quote",flow4:"Booked job",
    detail2:"Call / quote request",detail3:"Value / date / status",detail4:"Won or lost",diagramFoot:"Illustrative workflow. No actual client data or promised results.",
    highlight1:"Narrow focus",highlight1b:"One high-value service",highlight2:"Connected measurement",highlight2b:"Search → quote → job",
    highlight3:"Real feedback",highlight3b:"Based on actual enquiries",
    problemEyebrow:"CONNECTING VISIBILITY TO ENQUIRIES",
    problemTitle1:"People can see you.",
    problemTitle2:"But are the right ones getting in touch?",
    problemLead:"For many local businesses, their Google profile, advertising and quote process operate separately. The aim is to connect them more clearly.",
    problemAction:"Explore the whole customer journey",
    problem1:"Are the right people finding you?",
    problem1b:"In local search, what matters most is search intent and the specific service people need.",
    problem2:"Is your value easy to understand?",
    problem2b:"Business Profile, website and creative messages should all describe the same real offer.",
    problem3:"Do you know what happens after contact?",
    problem3b:"Calls, enquiries and quotations provide practical context for the next decision.",
    sampleEyebrow:"WHAT AN INITIAL REVIEW COVERS",
    sampleTitle:"Three practical areas to review first.",
    sampleText:"An initial review clarifies where to start and which improvements matter most. This example shows our working structure rather than actual client data.",
    sampleAction:"Why track enquiries and quotations?",
    auditLabel:"ILLUSTRATIVE TEMPLATE · NOT CLIENT DATA",
    auditQuestion:"What would we review first?",
    audit1:"Local search presence",
    audit1b:"Accurate details and relevant services",
    audit2:"Campaign and offer alignment",
    audit2b:"Search intent and clear next step",
    audit3:"After-enquiry process",
    audit3b:"Contact, quotation, feedback",
    auditFoot:"Real findings require a proper review of the individual business.",
    offersEyebrow:"CLEAR SERVICE OPTIONS",offersTitle:"Support matched to your business goal.",offersIntro:"From local visibility to search campaigns: not every business needs every channel.",offer1Text:"Business Profile, local search presence and a prioritised list of improvements.",offer1a:"Local visibility review",offer1b:"Business Profile and service information",offer1c:"Priorities and next steps",offer2Text:"Intent-focused Google Ads linked to a clearer path from enquiry to quotation.",offer2a:"Focused Google Ads approach",offer2b:"Enquiry and quote tracking",offer2c:"Business-feedback-based review",offer3Text:"Coordinated search, advertising and social media work aligned with the business objective.",offer3a:"Connect the right marketing channels",offer3b:"Content planning and visibility",offer3c:"Monthly insights and priorities",offersDetails:"Explore the service",offersApproach:"Explore the approach",offersDisclaimer:"Specific scope and fees are agreed for each business. Advertising spend is a separate cost.",
    servicesEyebrow:"HOW LOKMIRA HELPS",servicesTitle:"Make visibility useful.",servicesTitle2:"Connect the right channels.",servicesText:"Services are tailored to each business. The initial pilot does not automatically include every service listed below.",
    service1:"Google Business Profile & local SEO",service1b:"Review local search presence, business details and service pages, then implement practical improvements.",
    service2:"Google Ads campaigns",service2b:"Search campaigns built around high-intent keywords, with transparent budgets and conversion tracking.",
    service3:"Meta ads & lead campaigns",service3b:"Targeted Facebook and Instagram campaigns, lead generation forms and local reach for ideal clients.",
    service4:"Conversion landing pages",service4b:"Fast, mobile-optimised landing pages designed for quotation requests and direct phone calls.",
    service5:"Social media & content",service5b:"Editorial calendar, profile management and consistent communication grounded in your real services.",
    service6:"Enquiry & quote tracking",service6b:"A straightforward view of searches, enquiries and quotations using information the business already has.",serviceMore:"Learn more",storyLabel:"CLEAR SCOPE · VERIFIABLE WORK",storyTitle:"Built on verifiable steps.",storyText:"We publish customer results only when they are real and verifiable. Until then, we show the exact workflow, defined responsibilities and evaluation criteria upfront.",storyAction:"See what we stand for",
    methodEyebrow:"FROM SEARCH TO BOOKED WORK",methodTitle:"From search click to quotation.",methodTitle2:"A clearer sales process.",
    methodText:"An ad click is only the starting point. We connect the initial search with incoming enquiries, sent quotations and booked jobs so you can see the full picture.",
    card1:"Search intent",card1b:"A Google Search campaign focused on one selected high-value service.",
    card2:"Quote follow-up",card2b:"A clear view of enquiries, quotations sent and next steps.",
    card3:"Useful reporting",card3b:"Follow incoming enquiries and sent quotations alongside campaign spend.",
    pilotLabel:"90-DAY WORKING FRAMEWORK",pilotTitleA:"90 days.",pilotTitleB:"Clear boundaries.",
    pilotText:"The first 90 days focus on a high-value local service: review existing visibility, test carefully chosen improvements and evaluate real enquiries and quotations.",
    pilotWarning:"The timeline illustrates a process; specific scope and fees are agreed separately.",
    priceLabel:"FIRST 90-DAY PILOT · PROPOSED ROADMAP",priceStatus:"One measurable first step.",priceUnit:"Tailored to the business",setup:"Three phases focused on one core service.",stage1Note:"Search, visibility and enquiries",stage2Note:"One selected service focus",stage3Note:"What was measurable and what next?",
    feature1:"Review and objectives",feature2:"Controlled pilot",
    feature3:"Feedback and decisions",feature4:"Steps depend on the agreed objectives and available resources.",
    priceNote:"Media spend is billed separately. We do not promise guaranteed revenue or customer volume.",
    faqLabel:"COMMON QUESTIONS",faqHeading:"Let's clarify the essentials.",
    q1:"We already have a website and quote form. Do we need a new one?",
    a1:"Possibly not. We review the existing process first and recommend changes only when supported by evidence.",
    q2:"Can you guarantee more customers?",
    a2:"No. The pilot is a measurable market test. Outcomes depend on local demand, your capacity and competition.",
    q3:"Is Google ad spend included in the service fee?",
    a3:"No. Ad spend is billed separately. Service fees are agreed before work begins.",
    contactLabel:"NEXT STEP",contactTitle:"Understand the existing process first.",
    contactText:"Explore our services and a practical process for local visibility, enquiries and business feedback.",
    contactAction:"Contact",
    footNote:"",footText:"Local visibility and clearer customer enquiries in Budapest.",toTop:"Back to top"
  }
};
const menu = document.querySelector(".menu");
const navigation = document.querySelector(".navigation");
const buttons = [...document.querySelectorAll(".lang")];
function setLanguage(lang) {
  if (!copy[lang]) return;
  document.documentElement.lang = lang;
  document.title = lang === "hu" ? "Lokmira | Helyi SEO, Google Ads és ügyfélszerzés Budapesten" : "Lokmira | Local SEO, Google Ads & Customer Growth Budapest";
  const description = lang === "hu"
    ? "Helyi SEO, Google Cégprofil, Google Ads, közösségi média és követhető ügyfélmegkeresések budapesti vállalkozásoknak."
    : "Local SEO, Google Ads, social media and measurable customer enquiries for Budapest service businesses.";
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:description"]').setAttribute("content", description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", document.title);
  document.querySelector('meta[property="og:locale"]').setAttribute("content", lang === "hu" ? "hu_HU" : "en_US");
  navigation.setAttribute("aria-label", lang === "hu" ? "Fő navigáció" : "Main navigation");
  document.querySelector(".logo").setAttribute("aria-label", lang === "hu" ? "Lokmira - lap teteje" : "Lokmira - back to top");
  for (const element of document.querySelectorAll("[data-i18n]")) {
    const key = element.getAttribute("data-i18n");
    if (Object.prototype.hasOwnProperty.call(copy[lang], key)) element.textContent = copy[lang][key];
  }
  const routes = {
    hu:{services:"/hu/szolgaltatasok/",approach:"/hu/modszer/",about:"/hu/rolunk/",contact:"/hu/kapcsolat/",seo:"/hu/helyi-seo/",ads:"/hu/google-ads/",meta:"/hu/meta-hirdetesek/",landing:"/hu/erkezo-oldalak/",social:"/hu/kozossegi-media/",measurement:"/hu/meres/"},
    en:{services:"/en/services/",approach:"/en/approach/",about:"/en/about/",contact:"/en/contact/",seo:"/en/local-seo/",ads:"/en/google-ads/",meta:"/en/meta-ads/",landing:"/en/landing-pages/",social:"/en/social-media/",measurement:"/en/measurement/"}
  };
  for (const element of document.querySelectorAll("[data-route]")) {
    const route = element.dataset.route;
    if (Object.prototype.hasOwnProperty.call(routes[lang],route)) element.setAttribute("href",routes[lang][route]);
  }
  for (const button of buttons) {
    const selected = button.dataset.lang === lang;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
  menu.setAttribute("aria-label", lang === "hu" ? "Menü megnyitása" : "Open navigation menu");
}
for (const button of buttons) button.addEventListener("click", () => setLanguage(button.dataset.lang));
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("open", open);
});
navigation.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
});
document.addEventListener("keydown",(event)=>{if(event.key==="Escape"&&menu.getAttribute("aria-expanded")==="true"){menu.setAttribute("aria-expanded","false");navigation.classList.remove("open");menu.focus();}});
const queryLang = new URLSearchParams(window.location.search).get("lang");
const initialLang = queryLang === "en" || queryLang === "hu"
  ? queryLang
  : (document.documentElement.lang === "en" || window.location.pathname.startsWith("/en/") ? "en" : "hu");
setLanguage(initialLang);
