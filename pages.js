"use strict";
// Navigation only. No analytics, tracking, form submission, cookies, or external requests.
const toggle=document.querySelector(".site-toggle"), nav=document.querySelector(".site-nav");
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")!=="true";toggle.setAttribute("aria-expanded",String(open));nav.classList.toggle("is-open",open)});nav.addEventListener("click",e=>{if(e.target.closest("a")){toggle.setAttribute("aria-expanded","false");nav.classList.remove("is-open")}})}

document.addEventListener("keydown",(event)=>{if(event.key==="Escape"&&toggle&&toggle.getAttribute("aria-expanded")==="true"){toggle.setAttribute("aria-expanded","false");nav.classList.remove("is-open");toggle.focus();}});
