// Transparent INTERNAL contribution math — no real sales figures or private user balances.
const hourly=6500;
const offers = [
  {name:"pilot",fee:149000,hours:12,other:12000,expected:59000},
  {name:"standard",fee:199000,hours:15,other:20000,expected:81500},
  {name:"expanded",fee:299000,hours:24,other:30000,expected:113000}
];
for(const offer of offers) {
  offer.contribution=offer.fee-offer.hours*hourly-offer.other;
  if(offer.contribution!==offer.expected)throw Error("Contribution discrepancy "+offer.name);
}
const pilotSetup=79000-45000;
const pilot90Days=3*offers[0].contribution+pilotSetup;
if(pilot90Days!==211000)throw Error("90-day pilot contribution mismatch");
const overhead=[260000,430000,650000];
const founderCosts=[0,350000];
const needed=(cost)=>Math.ceil(cost/offers[1].contribution);
const rows=overhead.map(fixed=>({
  "Fixed overhead HUF":fixed,
  "No founder company cost":needed(fixed),
  "With +350k founder company cost":needed(fixed+350000)
}));
const expected=[[4,8],[6,10],[8,13]];
rows.forEach((r,i)=>{
  if(r["No founder company cost"]!==expected[i][0]||
      r["With +350k founder company cost"]!==expected[i][1])
    throw Error("Break-even scenario mismatch");
});
console.log("Internal contribution scenarios in HUF (NOT customer evidence):");
console.table(offers.map(x=>({offer:x.name,fee:x.fee,hours:x.hours,other:x.other,contribution:x.contribution})));
console.log("90-day pilot contribution before overhead:",pilot90Days);
console.table(rows);
console.log("PASS: arithmetic assertions. Cash runway requires actual private costs, collection timing, tax and founder inputs.");
