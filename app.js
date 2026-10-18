"use strict";
// Internal preview: no cookies, analytics, forms, tracking or network calls.
const copy = {
  hu: {
    preview:"BELSŐ ELŐNÉZET · MÁRKANÉV JÓVÁHAGYÁSRA VÁR · NE PUBLIKÁLD",
    brandNote:"munkanév · koncepció",navMethod:"Módszer",navPilot:"90 napos pilot",navQuestions:"Kérdések",navContact:"Kapcsolat",
    eyebrow:"Budapest · prémium autóvédelmi műhelyek",heroLead:"Ne állj meg az érdeklődőnél.",heroEnd:"Lásd, melyikből lesz munka.",
    heroText:"Összekötjük a Google keresési kampányokat az ajánlatkéréssel és a megnyert munkával. Egy szűk fókuszú, 90 napos teszt — nem megfoghatatlan marketingígéret.",
    heroAction:"Nézd meg a pilotot",heroAction2:"Hogyan működik?",tag1:"Egy szolgáltatásvonal",tag2:"Nyomon követhető ajánlatok",tag3:"Nincs eredménygarancia",
    diagramTitle:"A műhely bevételi útvonala",demo:"KONCEPCIÓ · NEM VALÓS ADAT",flow1:"Keresés",flow2:"Érdeklődés",flow3:"Ajánlat",flow4:"Megrendelés",
    detail2:"Hívás / ajánlatkérés",detail3:"Összeg / dátum / állapot",detail4:"Megnyert vagy elveszített",diagramFoot:"Folyamatábra. Nem valós ügyféladat és nem eredményígéret.",
    highlight1:"Szűk fókusz",highlight1b:"Egy nagy értékű szolgáltatás",highlight2:"Közös mérés",highlight2b:"Keresés → ajánlat → munka",highlight3:"Valós visszajelzés",highlight3b:"Tények, nem becslések",
    methodEyebrow:"AMIT MÁSKÉPP CSINÁLUNK",methodTitle:"Nem több kattintás.",methodTitle2:"Jobban követhető értékesítés.",
    methodText:"Egy kampány csak akkor értékes, ha a műhely látja, mi történik a kapcsolatfelvétel után.",
    card1:"Keresési szándék",card1b:"Google Search kampány egy kiválasztott, nagy értékű szolgáltatásra.",
    card2:"Ajánlatkövetés",card2b:"Érdeklődések, elküldött ajánlatok és következő lépések áttekinthetően.",
    card3:"Hasznos riport",card3b:"A valós értékesítési út követése, nem pusztán a kattintásoké.",
    pilotLabel:"ELSŐ AJÁNLAT · BELSŐ TERV",pilotTitle:"90 nap. Világos keretek.",
    pilotText:"Egy kiválasztott ügyfélszerzési folyamat tesztelése. A feltüntetett ár csak belső tervezési feltételezés, nem kötelező érvényű ajánlat.",
    pilotWarning:"Végleges árak, ÁFA, szerződés és jogi feltételek jóváhagyásra várnak.",
    priceLabel:"BELSŐ ÁRAZÁSI HIPOTÉZIS",priceUnit:"/ hó · 3 hónap",setup:"+ 79 000 Ft egyszeri beállítás",
    feature1:"Egy Google Search szolgáltatásvonal",feature2:"Érdeklődés–ajánlat–munka követés",
    feature3:"Korlátozott Google Cégprofil-javítás",feature4:"Alap mérés és havi riport",
    priceNote:"Hirdetési költés külön. Sem bevételi, sem ügyfélszám-garancia nincs.",
    faqLabel:"GYAKORI KÉRDÉSEK",faqHeading:"Tisztázzuk előre.",
    q1:"Már van weboldalunk és ajánlatkérő űrlapunk. Miért kellene új?",
    a1:"Lehet, hogy nem kell. Először a meglévő rendszert vizsgáljuk meg, és csak bizonyított hiány esetén ajánlunk változtatást.",
    q2:"Garantálható több PPF-megrendelés?",
    a2:"Nem. A cél egy mérhető teszt, nem eladásszám-garancia. Az eredmény a kereslettől, kapacitástól és versenytől is függ.",
    q3:"A Google hirdetési költés benne van a díjban?",
    a3:"Nincs. A médiaköltés külön költség; a feltüntetett díj nem végleges kereskedelmi ajánlat.",
    contactLabel:"KÖVETKEZŐ LÉPÉS",contactTitle:"Először értsük meg a jelenlegi folyamatot.",
    contactText:"Valós kapcsolatfelvétel csak a jóváhagyott márkanév, céges email és adatvédelmi megfelelés után indul.",
    contactStatus:"Kapcsolatfelvétel: nem aktív · belső előnézet",
    footNote:"— ideiglenes munkanév",footText:"Koncepcióterv, nem bejegyzett márka vagy nyilvános ajánlat.",toTop:"↑ Tetejére"
  },
  en: {
    preview:"INTERNAL PREVIEW · BRAND NAME NOT APPROVED · DO NOT PUBLISH",
    brandNote:"working label · concept",navMethod:"Approach",navPilot:"90-day pilot",navQuestions:"Questions",navContact:"Contact",
    eyebrow:"Budapest · premium vehicle protection workshops",heroLead:"Don't stop at the lead.",heroEnd:"See which enquiries become booked work.",
    heroText:"We connect Google Search campaigns to enquiries, quotations and jobs won. One focused 90-day test — not vague marketing promises.",
    heroAction:"Explore the pilot",heroAction2:"How it works",tag1:"One service line",tag2:"Traceable quotations",tag3:"No outcome guarantee",
    diagramTitle:"Your workshop's sales journey",demo:"CONCEPT · NO REAL CUSTOMER DATA",flow1:"Search",flow2:"Enquiry",flow3:"Quote",flow4:"Booked job",
    detail2:"Call / quote request",detail3:"Value / date / status",detail4:"Won or lost",diagramFoot:"Illustrative workflow. No actual client data or promised results.",
    highlight1:"Narrow focus",highlight1b:"One high-value service",highlight2:"Connected measurement",highlight2b:"Search → quote → job",
    highlight3:"Real feedback",highlight3b:"Facts, not assumptions",
    methodEyebrow:"WHAT WE DO DIFFERENTLY",methodTitle:"Not more clicks.",methodTitle2:"A clearer route to sales.",
    methodText:"A campaign only matters when the workshop can see what happens after the enquiry.",
    card1:"Search intent",card1b:"A Google Search campaign focused on one selected high-value service.",
    card2:"Quote follow-up",card2b:"A clear view of enquiries, quotations sent and next steps.",
    card3:"Useful reporting",card3b:"Track the actual sales journey rather than clicks alone.",
    pilotLabel:"INITIAL OFFER · INTERNAL CONCEPT",pilotTitle:"90 days. Clear boundaries.",
    pilotText:"Test one focused customer acquisition workflow. Listed prices are internal assumptions, not a binding commercial offer.",
    pilotWarning:"Final pricing, tax treatment, contracts and legal terms require approval.",
    priceLabel:"INTERNAL PRICING HYPOTHESIS",priceUnit:"/ month · 3 months",setup:"+ 79,000 Ft one-time setup",
    feature1:"One Google Search service line",feature2:"Enquiry–quote–booked job tracking",
    feature3:"Limited Google Business Profile updates",feature4:"Basic measurement and monthly reporting",
    priceNote:"Media spend is separate. No guarantee of revenue or number of customers.",
    faqLabel:"COMMON QUESTIONS",faqHeading:"Let's clarify the essentials.",
    q1:"We already have a website and quote form. Do we need a new one?",
    a1:"Possibly not. We review the existing process first and recommend changes only when supported by evidence.",
    q2:"Can you guarantee more PPF bookings?",
    a2:"No. The goal is a measurable test, not a promise of sales. Outcomes depend on demand, capacity and competition.",
    q3:"Is Google ad spend included in the service fee?",
    a3:"No. Ad spend is billed separately. The displayed fee is not yet a finalized commercial offer.",
    contactLabel:"NEXT STEP",contactTitle:"Understand the existing process first.",
    contactText:"Real contact channels will be enabled only after brand, company email and data privacy approval.",
    contactStatus:"Contact is not active · internal preview",
    footNote:"— temporary working label",footText:"Concept design, not a registered brand or a public offer.",toTop:"↑ Back to top"
  }
};
const menu = document.querySelector(".menu");
const navigation = document.querySelector(".navigation");
const buttons = [...document.querySelectorAll(".lang")];
function setLanguage(lang) {
  if (!copy[lang]) return;
  document.documentElement.lang = lang;
  document.title = lang === "hu" ? "LOCAL/OPS | Belső koncepció" : "LOCAL/OPS | Internal concept";
  for (const element of document.querySelectorAll("[data-i18n]")) {
    const key = element.getAttribute("data-i18n");
    if (Object.prototype.hasOwnProperty.call(copy[lang], key)) element.textContent = copy[lang][key];
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
setLanguage("hu");
