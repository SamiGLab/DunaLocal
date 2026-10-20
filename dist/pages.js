"use strict";
// Navigation only. No analytics, tracking, form submission, cookies, or external requests.
const toggle=document.querySelector(".site-toggle"), nav=document.querySelector(".site-nav");
function closeNav(){if(!toggle||!nav)return;toggle.setAttribute("aria-expanded","false");nav.classList.remove("is-open");document.body.style.overflow="";}
function openNav(){if(!toggle||!nav)return;toggle.setAttribute("aria-expanded","true");nav.classList.add("is-open");document.body.style.overflow="hidden";}
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")!=="true";if(open){openNav();}else{closeNav();}});nav.addEventListener("click",e=>{if(e.target.closest("a")){closeNav();}});document.addEventListener("click",e=>{if(nav.classList.contains("is-open")&&!nav.contains(e.target)&&!toggle.contains(e.target)){closeNav();}});}
document.addEventListener("keydown",(event)=>{if(event.key==="Escape"&&toggle&&toggle.getAttribute("aria-expanded")==="true"){closeNav();toggle.focus();}});
