// ==UserScript==
// @name         Gemini
// @namespace    Gemini
// @version      1.0.0
// @match        https://1227719606223765687.discordsays.com/*
// @match        https://magiccircle.gg/r/*
// @match        https://magicgarden.gg/r/*
// @match        https://starweaver.org/r/*
// @run-at       document-start
// @inject-into  page
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM_openInTab 
// @grant        GM_registerMenuCommand
// @resource     ICON https://imgur.com/a/nf1ZKbp
// ==/UserScript==
"use strict";(()=>{var un=Object.defineProperty;var gn=(e,t,n)=>t in e?un(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ne=(e,t,n)=>gn(e,typeof t!="symbol"?t+"":t,n);var re={open:"ui_open",theme:"ui_theme",tab:"ui_active_tab",width:"ui_width"},Ce={open:!1,theme:"dark",tab:"tab-settings",width:480},Fe={};function me(e,t){return e in Fe?Fe[e]:t}function le(e,t){Fe[e]=t}function Ze(){return{open:me(re.open,Ce.open),theme:me(re.theme,Ce.theme),tab:me(re.tab,Ce.tab),width:me(re.width,Ce.width)}}var ce={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};var mn=window,et=typeof unsafeWindow<"u"&&unsafeWindow?unsafeWindow:mn,j=et;function tt(e=et){try{return e.top!==e}catch{return!0}}var nt=!1,ot=[];function bn(){if(!nt){nt=!0;try{let e=j.WebSocket,t=function(n,r){let o=r!==void 0?new e(n,r):new e(n);try{o.addEventListener("close",a=>{try{if(a?.code===4710||/Version\s*Expired/i.test(a?.reason||""))for(let p of ot)try{p(a,o)}catch{}}catch{}})}catch{}return o};t.prototype=e.prototype,t.CONNECTING=e.CONNECTING,t.OPEN=e.OPEN,t.CLOSING=e.CLOSING,t.CLOSED=e.CLOSED,j.WebSocket=t}catch{}}}function fn(e){ot.push(e),bn()}function rt(){fn(e=>{try{tt()||j.location.reload()}catch{}})}var de=class{constructor(t){ne(this,"id");ne(this,"label");ne(this,"_mount");ne(this,"_cleanup",null);this.id=t.id,this.label=t.label,this._mount=t.mount}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);let n=this._mount(t),r=t.firstElementChild;r&&r.classList.contains("lg-section")&&r.classList.add("active"),typeof n=="function"&&(this._cleanup=n)}unmount(){if(this._cleanup)try{this._cleanup()}finally{this._cleanup=null}}};var xe=class{constructor(t,n,r){ne(this,"sections");ne(this,"activeId",null);ne(this,"container");ne(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error("Unknown source: "+t);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};var at="sections";function it(){let e=me(at,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function hn(e){le(at,e)}async function st(e){return it()[e]}function lt(e,t){let n=it();hn({...n,[e]:t})}function Me(e,t){return{...e,...t??{}}}async function ct(e){let t=await st(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((h=>JSON.parse(JSON.stringify(h)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){lt(e.path,n)}function a(){return n}function s(h){n=e.sanitize?e.sanitize(h):h,o()}function p(h){let c=Object.assign((i=>JSON.parse(JSON.stringify(i)))(n),{});typeof h=="function"?h(c):Object.assign(c,h),n=e.sanitize?e.sanitize(c):c,o()}function k(){o()}return{get:a,set:s,update:p,save:k}}async function Ge(e,t){let{path:n=e,...r}=t;return ct({path:n,...r})}function u(e,t={},...n){let r=document.createElement(e);for(let[o,a]of Object.entries(t||{}))a!=null&&(o==="style"&&typeof a=="object"?Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}function dt(e="mgh-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,{all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"}),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}var xn=0,Le=new Map;function ie(e={},...t){let{id:n,className:r,variant:o="default",padding:a="md",interactive:s=!1,expandable:p=!1,defaultExpanded:k=!0,onExpandChange:h,mediaTop:f,title:c,subtitle:i,badge:g,actions:y,footer:d,divider:E=!1,tone:L="neutral",stateKey:I}=e,S=u("div",{className:"card",id:n,tabIndex:s?0:void 0});S.classList.add(`card--${o}`,`card--p-${a}`),s&&S.classList.add("card--interactive"),L!=="neutral"&&S.classList.add(`card--tone-${L}`),r&&S.classList.add(...r.split(" ").filter(Boolean)),p&&S.classList.add("card--expandable");let l=p?I??n??(typeof c=="string"?`title:${c}`:null):null,b=!p||k;l&&Le.has(l)&&(b=!!Le.get(l));let x=null,T=null,w=null,W=null,N=null,C=n?`${n}-collapse`:`card-collapse-${++xn}`,G=()=>{if(W!==null&&(cancelAnimationFrame(W),W=null),N){let H=N;N=null,H()}},$=(H,z)=>{if(!w)return;G();let v=w;if(v.setAttribute("aria-hidden",String(!H)),!z){v.classList.remove("card-collapse--animating"),v.style.display=H?"":"none",v.style.height="",v.style.opacity="";return}if(v.classList.add("card-collapse--animating"),v.style.display="",H){v.style.height="auto";let A=v.scrollHeight;if(!A){v.classList.remove("card-collapse--animating"),v.style.display="",v.style.height="",v.style.opacity="";return}v.style.height="0px",v.style.opacity="0",v.offsetHeight,W=requestAnimationFrame(()=>{W=null,v.style.height=`${A}px`,v.style.opacity="1"})}else{let A=v.scrollHeight;if(!A){v.classList.remove("card-collapse--animating"),v.style.display="none",v.style.height="",v.style.opacity="";return}v.style.height=`${A}px`,v.style.opacity="1",v.offsetHeight,W=requestAnimationFrame(()=>{W=null,v.style.height="0px",v.style.opacity="0"})}let m=()=>{v.classList.remove("card-collapse--animating"),v.style.height="",H||(v.style.display="none"),v.style.opacity=""},M=null,R=A=>{A.target===v&&(M!==null&&(clearTimeout(M),M=null),v.removeEventListener("transitionend",R),v.removeEventListener("transitioncancel",R),N=null,m())};N=()=>{M!==null&&(clearTimeout(M),M=null),v.removeEventListener("transitionend",R),v.removeEventListener("transitioncancel",R),N=null,m()},v.addEventListener("transitionend",R),v.addEventListener("transitioncancel",R),M=window.setTimeout(()=>{N?.()},420)};function V(H){let z=document.createElementNS("http://www.w3.org/2000/svg","svg");return z.setAttribute("viewBox","0 0 24 24"),z.setAttribute("width","16"),z.setAttribute("height","16"),z.innerHTML=H==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',z}function D(H,z=!0,v=!0){b=H,S.classList.toggle("card--collapsed",!b),S.classList.toggle("card--expanded",b),x&&(x.dataset.expanded=String(b),x.setAttribute("aria-expanded",String(b))),T&&(T.setAttribute("aria-expanded",String(b)),T.classList.toggle("card-toggle--collapsed",!b),T.setAttribute("aria-label",b?"Replier le contenu":"Deplier le contenu"),T.replaceChildren(V(b?"up":"down"))),p?$(b,v):w&&(w.style.display="",w.style.height="",w.style.opacity="",w.setAttribute("aria-hidden","false")),z&&h&&h(b),l&&Le.set(l,b)}if(f){let H=u("div",{className:"card-media"});H.append(f),S.appendChild(H)}let B=!!(c||i||g||y&&y.length||p);if(B){x=u("div",{className:"card-header"});let H=u("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let m=u("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);g&&m.append(typeof g=="string"?u("span",{className:"badge"},g):g),H.appendChild(m)}if(i){let m=u("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},i);H.appendChild(m)}(H.childNodes.length||p)&&x.appendChild(H);let z=u("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),v=u("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});y?.forEach(m=>v.appendChild(m)),v.childNodes.length&&z.appendChild(v),p&&(T=u("button",{className:"card-toggle",type:"button",ariaExpanded:String(b),ariaControls:C,ariaLabel:b?"Replier le contenu":"Deplier le contenu"}),T.textContent=b?"\u25B2":"\u25BC",T.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),D(!b)}),z.appendChild(T),x.classList.add("card-header--expandable"),x.addEventListener("click",m=>{let M=m.target;M?.closest(".card-actions")||M?.closest(".card-toggle")||D(!b)})),z.childNodes.length&&x.appendChild(z),S.appendChild(x)}w=u("div",{className:"card-collapse",id:C,ariaHidden:p?String(!b):"false"}),S.appendChild(w),E&&B&&w.appendChild(u("div",{className:"card-divider"}));let P=u("div",{className:"card-body"});if(P.append(...t),w.appendChild(P),d){E&&w.appendChild(u("div",{className:"card-divider"}));let H=u("div",{className:"card-footer"});H.append(d),w.appendChild(H)}return T&&T.setAttribute("aria-controls",C),D(b,!1,!1),l&&Le.set(l,b),S}function Ve(...e){return u("div",{className:"card-footer"},...e)}var Pe=!1,He=new Set,Z=e=>{let t=document.activeElement;for(let n of He)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function vn(){Pe||(Pe=!0,window.addEventListener("keydown",Z,!0),window.addEventListener("keypress",Z,!0),window.addEventListener("keyup",Z,!0),document.addEventListener("keydown",Z,!0),document.addEventListener("keypress",Z,!0),document.addEventListener("keyup",Z,!0))}function yn(){Pe&&(He.size>0||(Pe=!1,window.removeEventListener("keydown",Z,!0),window.removeEventListener("keypress",Z,!0),window.removeEventListener("keyup",Z,!0),document.removeEventListener("keydown",Z,!0),document.removeEventListener("keypress",Z,!0),document.removeEventListener("keyup",Z,!0)))}function be(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:s=!1,blockGameKeys:p=!0,onChange:k,onOpenChange:h}=e,f=u("div",{className:"select",id:t}),c=u("button",{className:"select-trigger",type:"button"}),i=u("span",{className:"select-value"},o),g=u("span",{className:"select-caret"},"\u25BE");c.append(i,g);let y=u("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});f.classList.add(`select--${a}`);let d=!1,E=n,L=null,I=!!s;function S(m){return m==null?o:(e.options||r).find(R=>R.value===m)?.label??o}function l(m){i.textContent=S(m),y.querySelectorAll(".select-option").forEach(M=>{let R=M.dataset.value,A=m!=null&&R===m;M.classList.toggle("selected",A),M.setAttribute("aria-selected",String(A))})}function b(m){y.replaceChildren(),m.forEach(M=>{let R=u("button",{className:"select-option"+(M.disabled?" disabled":""),type:"button",role:"option","data-value":M.value,"aria-selected":String(M.value===E),tabindex:"-1"},M.label);M.value===E&&R.classList.add("selected"),M.disabled||R.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),C(M.value,{notify:!0}),W()},{capture:!0}),y.appendChild(R)})}function x(){c.setAttribute("aria-expanded",String(d)),y.setAttribute("aria-hidden",String(!d))}function T(){let m=c.getBoundingClientRect();Object.assign(y.style,{minWidth:`${m.width}px`})}function w(){d||I||(d=!0,f.classList.add("open"),x(),T(),document.addEventListener("mousedown",B,!0),document.addEventListener("scroll",P,!0),window.addEventListener("resize",H),y.focus({preventScroll:!0}),p&&(vn(),He.add(f),L=()=>{He.delete(f),yn()}),h?.(!0))}function W(){d&&(d=!1,f.classList.remove("open"),x(),document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",P,!0),window.removeEventListener("resize",H),c.focus({preventScroll:!0}),L?.(),L=null,h?.(!1))}function N(){d?W():w()}function C(m,M={}){let R=E;E=m,l(E),M.notify!==!1&&R!==m&&k?.(m)}function G(){return E}function $(m){let M=Array.from(y.querySelectorAll(".select-option:not(.disabled)"));if(!M.length)return;let R=M.findIndex(U=>U.classList.contains("active")),A=M[(R+(m===1?1:M.length-1))%M.length];M.forEach(U=>U.classList.remove("active")),A.classList.add("active"),A.focus({preventScroll:!0}),A.scrollIntoView({block:"nearest"})}function V(m){(m.key===" "||m.key==="Enter"||m.key==="ArrowDown")&&(m.preventDefault(),w())}function D(m){if(m.key==="Escape"){m.preventDefault(),W();return}if(m.key==="Enter"||m.key===" "){let M=y.querySelector(".select-option.active")||y.querySelector(".select-option.selected");M&&!M.classList.contains("disabled")&&(m.preventDefault(),C(M.dataset.value,{notify:!0}),W());return}if(m.key==="ArrowDown"){m.preventDefault(),$(1);return}if(m.key==="ArrowUp"){m.preventDefault(),$(-1);return}}function B(m){f.contains(m.target)||W()}function P(){d&&T()}function H(){d&&T()}function z(m){I=!!m,c.disabled=I,f.classList.toggle("disabled",I),I&&W()}function v(m){e.options=m,b(m),m.some(M=>M.value===E)||(E=null,l(null))}return f.append(c,y),c.addEventListener("pointerdown",m=>{m.preventDefault(),m.stopPropagation(),N()},{capture:!0}),c.addEventListener("keydown",V),y.addEventListener("keydown",D),b(r),n!=null?(E=n,l(E)):l(null),x(),z(I),{root:f,open:w,close:W,toggle:N,getValue:G,setValue:C,setOptions:v,setDisabled:z,destroy(){document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",P,!0),window.removeEventListener("resize",H),L?.(),L=null}}}function Re(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:s="inline",variant:p="text",required:k=!1,disabled:h=!1,tooltip:f,hint:c,icon:i,suffix:g,onClick:y}=e,d=u("div",{className:"lg-label-wrap",id:t}),E=u("label",{className:"lg-label",...r?{htmlFor:r}:{},...f?{title:f}:{}});if(i){let C=typeof i=="string"?u("span",{className:"lg-label-ico"},i):i;C.classList?.add?.("lg-label-ico"),E.appendChild(C)}let L=u("span",{className:"lg-label-text"},n);E.appendChild(L);let I=u("span",{className:"lg-label-req",ariaHidden:"true"}," *");k&&E.appendChild(I);let S=null;if(g!=null){S=typeof g=="string"?document.createTextNode(g):g;let C=u("span",{className:"lg-label-suffix"});C.appendChild(S),E.appendChild(C)}let l=c?u("div",{className:"lg-label-hint"},c):null;d.classList.add(`lg-label--${s}`),d.classList.add(`lg-label--${a}`),p==="title"&&d.classList.add("lg-label--title"),b(o),h&&d.classList.add("is-disabled"),d.appendChild(E),l&&d.appendChild(l),y&&E.addEventListener("click",y);function b(C){d.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),d.classList.add(`lg-label--${C}`)}function x(C){L.textContent=C}function T(C){b(C)}function w(C){C&&!I.isConnected&&E.appendChild(I),!C&&I.isConnected&&I.remove(),C?E.setAttribute("aria-required","true"):E.removeAttribute("aria-required")}function W(C){d.classList.toggle("is-disabled",!!C)}function N(C){!C&&l&&l.isConnected?l.remove():C&&l?l.textContent=C:C&&!l&&d.appendChild(u("div",{className:"lg-label-hint"},C))}return{root:d,labelEl:E,hintEl:l,setText:x,setTone:T,setRequired:w,setDisabled:W,setHint:N}}function kn(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function wn(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Sn(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(s=>String(s.brand||s.brandName||s.brandVersion||s)),r=n.some(s=>/Edge/i.test(s)||/Microsoft Edge/i.test(s)),o=n.some(s=>/Opera/i.test(s)||/OPR/i.test(s)),a=n.some(s=>/Chrome|Chromium/i.test(s));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function En(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function te(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Tn(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=En(),a=wn(),s=Sn(),p=window.screen||{},k=window.visualViewport,h=Math.round(window.innerWidth||document.documentElement.clientWidth||0),f=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(k?.width??h),i=Math.round(k?.height??f),g=Math.round(p.width||0),y=Math.round(p.height||0),d=Math.round(p.availWidth||g),E=Math.round(p.availHeight||y),L=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:s,os:a,viewportWidth:h,viewportHeight:f,visualViewportWidth:c,visualViewportHeight:i,screenWidth:g,screenHeight:y,availScreenWidth:d,availScreenHeight:E,dpr:L,orientation:kn()}}function pt(){return te().surface==="discord"}function Tn(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Cn(e){try{return!!e.isSecureContext}catch{return!1}}function je(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function ut(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Mn(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Ln(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Pn(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Hn(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Cn(j))return{ok:!1,method:"clipboard-write"};if(!await Mn())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Rn(e,t){try{let n=t||je(),r=Ln(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function In(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=Pn(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=ut()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function Wn(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await Hn(n);if(r.ok)return r;let o=t.injectionRoot||je(t.valueNode||void 0),a=Rn(n,o);if(a.ok)return a;let s=In(n,t.valueNode||null);if(s.ok)return s;if(!t.disablePromptFallback)try{return window.prompt(pt()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function gt(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let s=je(e);s.appendChild?s.appendChild(a):document.body.appendChild(a);let p=e.getBoundingClientRect();a.style.left=`${p.right-8}px`,a.style.top=`${p.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let a=(t()??"").toString(),s=await Wn(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(s),s.ok?s.method==="clipboard-write"||s.method==="execCommand"||s.method==="prompt"?r("Copi\xE9"):s.method==="selection"&&r(s.hint||(ut()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}function ve(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ie(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=ve(e);return r&&n.appendChild(r),n}function Nn(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function se(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:s,loading:p=!1,tooltip:k,type:h="button",onClick:f,disabled:c=!1,fullWidth:i=!1}=e,g=u("button",{className:"btn",id:n});g.type=h,r==="primary"&&g.classList.add("primary"),o==="sm"&&g.classList.add("btn--sm"),k&&(g.title=k),i&&(g.style.width="100%");let y=Nn(),d=a?Ie(a,"left"):null,E=s?Ie(s,"right"):null,L=document.createElement("span");L.className="btn-label";let I=ve(t);I&&L.appendChild(I),!I&&(d||E)&&g.classList.add("btn--icon"),g.appendChild(y),d&&g.appendChild(d),g.appendChild(L),E&&g.appendChild(E);let S=c||p;g.disabled=S,g.setAttribute("aria-busy",String(!!p)),y.style.display=p?"inline-block":"none",f&&g.addEventListener("click",f);let l=g;return l.setLoading=b=>{g.setAttribute("aria-busy",String(!!b)),y.style.display=b?"inline-block":"none",g.disabled=b||c},l.setDisabled=b=>{g.disabled=b||g.getAttribute("aria-busy")==="true"},l.setLabel=b=>{L.replaceChildren();let x=ve(b);x&&L.appendChild(x),!x&&(d||E)?g.classList.add("btn--icon"):g.classList.remove("btn--icon")},l.setIconLeft=b=>{if(b==null){d?.remove();return}d?d.replaceChildren(ve(b)):g.insertBefore(Ie(b,"left"),L)},l.setIconRight=b=>{if(b==null){E?.remove();return}E?E.replaceChildren(ve(b)):g.appendChild(Ie(b,"right"))},l}var We=!1,ye=new Set;function Dn(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var ee=e=>{let t=Dn();if(t){for(let n of ye)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Bn(){We||(We=!0,window.addEventListener("keydown",ee,!0),window.addEventListener("keypress",ee,!0),window.addEventListener("keyup",ee,!0),document.addEventListener("keydown",ee,!0),document.addEventListener("keypress",ee,!0),document.addEventListener("keyup",ee,!0))}function On(){We&&(We=!1,window.removeEventListener("keydown",ee,!0),window.removeEventListener("keypress",ee,!0),window.removeEventListener("keyup",ee,!0),document.removeEventListener("keydown",ee,!0),document.removeEventListener("keypress",ee,!0),document.removeEventListener("keyup",ee,!0))}function An(e){return ye.size===0&&Bn(),ye.add(e),()=>{ye.delete(e),ye.size===0&&On()}}function _n(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function zn(e,t){return t?e.replace(t,""):e}function Fn(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function mt(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:s=!1,allowUnderscore:p=!1,maxLength:k,blockGameKeys:h=!0,debounceMs:f=0,onChange:c,onEnter:i,label:g}=e,y=u("div",{className:"lg-input-wrap"}),d=u("input",{className:"input",id:t,placeholder:n});if(typeof k=="number"&&k>0&&(d.maxLength=k),r&&(d.value=r),g){let C=u("div",{className:"lg-input-label"},g);y.appendChild(C)}y.appendChild(d);let E=_n(o,a,s,p),L=()=>{let C=d.selectionStart??d.value.length,G=d.value.length,$=zn(d.value,E);if($!==d.value){d.value=$;let V=G-$.length,D=Math.max(0,C-V);d.setSelectionRange(D,D)}},I=Fn(()=>c?.(d.value),f);d.addEventListener("input",()=>{L(),I()}),d.addEventListener("paste",()=>queueMicrotask(()=>{L(),I()})),d.addEventListener("keydown",C=>{C.key==="Enter"&&i?.(d.value)});let S=h?An(d):()=>{};function l(){return d.value}function b(C){d.value=C??"",L(),I()}function x(){d.focus()}function T(){d.blur()}function w(C){d.disabled=!!C}function W(){return document.activeElement===d}function N(){S()}return{root:y,input:d,getValue:l,setValue:b,focus:x,blur:T,setDisabled:w,isFocused:W,destroy:N}}function Y(e,t,n){return Math.min(n,Math.max(t,e))}function we({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,a=n*t,s=a*(1-Math.abs(o%2-1)),p=0,k=0,h=0;switch(Math.floor(o)){case 0:p=a,k=s;break;case 1:p=s,k=a;break;case 2:k=a,h=s;break;case 3:k=s,h=a;break;case 4:p=s,h=a;break;default:p=a,h=s;break}let c=n-a,i=Math.round((p+c)*255),g=Math.round((k+c)*255),y=Math.round((h+c)*255);return{r:Y(i,0,255),g:Y(g,0,255),b:Y(y,0,255),a:Y(r,0,1)}}function bt({r:e,g:t,b:n,a:r}){let o=Y(e,0,255)/255,a=Y(t,0,255)/255,s=Y(n,0,255)/255,p=Math.max(o,a,s),k=Math.min(o,a,s),h=p-k,f=0;h!==0&&(p===o?f=60*((a-s)/h%6):p===a?f=60*((s-o)/h+2):f=60*((o-a)/h+4)),f<0&&(f+=360);let c=p===0?0:h/p;return{h:f,s:c,v:p,a:Y(r,0,1)}}function Ue({r:e,g:t,b:n}){let r=o=>Y(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function Gn({r:e,g:t,b:n,a:r}){let o=Y(Math.round(r*255),0,255);return`${Ue({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function ke({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function fe(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(s=>s+s).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function $e(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return fe(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(k=>k.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),s=Number(r[2]),p=r[3]!=null?Number(r[3]):1;return[o,a,s,p].some(k=>Number.isNaN(k))?null:{r:o,g:a,b:s,a:p}}return null}function Vn(e,t){let n=$e(e)??fe(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Y(t,0,1)),bt(n)}function jn(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function $n(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function pe(e){let t=we(e),n=we({...e,a:1});return{hsva:{...e},hex:Ue(n),hexa:Gn(t),rgba:ke(t),alpha:e.a}}function ft(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:s,onInput:p,onChange:k}=e,f=s?s():te().platform==="mobile",c=Vn(r,o),i=ie({id:t,className:"color-picker",title:n,padding:f?"md":"lg",variant:"soft",expandable:!f,defaultExpanded:!f&&a});i.classList.add(f?"color-picker--mobile":"color-picker--desktop");let g=i.querySelector(".card-header");g&&g.classList.add("color-picker__header");let y=g?.querySelector(".card-title"),d=u("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});y?y.prepend(d):g?g.prepend(d):i.prepend(d);let E=i.querySelector(".card-toggle");!f&&E&&d.addEventListener("click",()=>{i.classList.contains("card--collapsed")&&E.click()});let L=i.querySelector(".card-collapse"),I=null,S=null,l=null,b=null,x=null,T=null,w=null,W=null,N=null,C="hex";function G(P){let H=pe(c);P==="input"?p?.(H):k?.(H)}function $(){let P=pe(c);if(d.style.setProperty("--cp-preview-color",P.rgba),d.setAttribute("aria-label",`${n}: ${P.hexa}`),!f&&I&&S&&l&&b&&x&&T&&w){let H=we({...c,s:1,v:1,a:1}),z=ke(H);I.style.setProperty("--cp-palette-hue",z),S.style.left=`${c.s*100}%`,S.style.top=`${(1-c.v)*100}%`,l.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ke({...H,a:1})} 0%, ${ke({...H,a:0})} 100%)`),b.style.top=`${(1-c.a)*100}%`,x.style.setProperty("--cp-hue-color",ke(we({...c,v:1,s:1,a:1}))),T.style.left=`${c.h/360*100}%`;let v=c.a===1?P.hex:P.hexa,m=P.rgba,M=C==="hex"?v:m;w!==document.activeElement&&(w.value=M),w.setAttribute("aria-label",`${C.toUpperCase()} code for ${n}`),w.placeholder=C==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",C==="hex"?w.maxLength=9:w.removeAttribute("maxLength"),w.dataset.mode=C,W&&(W.textContent=C.toUpperCase(),W.setAttribute("aria-label",C==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),W.setAttribute("aria-pressed",C==="rgba"?"true":"false"),W.classList.toggle("is-alt",C==="rgba"))}N&&N!==document.activeElement&&(N.value=P.hex)}function V(P,H=null){c={h:(P.h%360+360)%360,s:Y(P.s,0,1),v:Y(P.v,0,1),a:Y(P.a,0,1)},$(),H&&G(H)}function D(P,H=null){V(bt(P),H)}function B(P,H,z){P.addEventListener("pointerdown",v=>{v.preventDefault();let m=v.pointerId,M=A=>{A.pointerId===m&&H(A)},R=A=>{A.pointerId===m&&(document.removeEventListener("pointermove",M),document.removeEventListener("pointerup",R),document.removeEventListener("pointercancel",R),z?.(A))};H(v),document.addEventListener("pointermove",M),document.addEventListener("pointerup",R),document.addEventListener("pointercancel",R)})}if(!f&&L){let P=L.querySelector(".card-body");if(P){P.classList.add("color-picker__body"),S=u("div",{className:"color-picker__palette-cursor"}),I=u("div",{className:"color-picker__palette"},S),b=u("div",{className:"color-picker__alpha-thumb"}),l=u("div",{className:"color-picker__alpha"},b),T=u("div",{className:"color-picker__hue-thumb"}),x=u("div",{className:"color-picker__hue"},T);let H=u("div",{className:"color-picker__main"},I,l),z=u("div",{className:"color-picker__hue-row"},x),v=mt({blockGameKeys:!0});w=v.input,w.classList.add("color-picker__hex-input"),w.value="",w.maxLength=9,w.spellcheck=!1,w.inputMode="text",w.setAttribute("aria-label",`Hex code for ${n}`),W=u("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),v.root.classList.add("color-picker__hex-wrap");let m=u("div",{className:"color-picker__hex-row"},W,v.root);P.replaceChildren(H,z,m),B(I,R=>{if(!I||!S)return;let A=I.getBoundingClientRect(),U=Y((R.clientX-A.left)/A.width,0,1),ue=Y((R.clientY-A.top)/A.height,0,1);V({...c,s:U,v:1-ue},"input")},()=>G("change")),B(l,R=>{if(!l)return;let A=l.getBoundingClientRect(),U=Y((R.clientY-A.top)/A.height,0,1);V({...c,a:1-U},"input")},()=>G("change")),B(x,R=>{if(!x)return;let A=x.getBoundingClientRect(),U=Y((R.clientX-A.left)/A.width,0,1);V({...c,h:U*360},"input")},()=>G("change")),W.addEventListener("click",()=>{if(C=C==="hex"?"rgba":"hex",w){let R=pe(c);w.value=C==="hex"?c.a===1?R.hex:R.hexa:R.rgba}$(),w?.focus(),w?.select()}),w.addEventListener("input",()=>{if(C==="hex"){let R=jn(w.value);if(R!==w.value){let A=w.selectionStart??R.length;w.value=R,w.setSelectionRange(A,A)}}});let M=()=>{let R=w.value;if(C==="hex"){let A=fe(R);if(!A){w.value=c.a===1?pe(c).hex:pe(c).hexa;return}let U=R.startsWith("#")?R.slice(1):R,ue=U.length===4||U.length===8;A.a=ue?A.a:c.a,D(A,"change")}else{let A=$n(R),U=$e(A);if(!U){w.value=pe(c).rgba;return}D(U,"change")}};w.addEventListener("change",M),w.addEventListener("blur",M),w.addEventListener("keydown",R=>{R.key==="Enter"&&(M(),w.blur())})}}return f&&(L&&L.remove(),N=u("input",{className:"color-picker__native",type:"color",value:Ue(we({...c,a:1}))}),d.addEventListener("click",()=>N.click()),N.addEventListener("input",()=>{let P=fe(N.value);P&&(P.a=c.a,D(P,"input"),G("change"))}),i.appendChild(N)),$(),{root:i,isMobile:f,getValue:()=>pe(c),setValue:(P,H)=>{let z=$e(P)??fe(P)??fe("#FFFFFF");z&&(typeof H=="number"&&(z.a=H),D(z,null))}}}var Ne={ui:{expandedCards:{style:!1,license:!1,system:!1}}},Un="tab-settings";async function ht(){let e=await Ge(Un,{version:1,defaults:Ne,sanitize:o=>({ui:{expandedCards:Me(Ne.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let a=e.get();e.update({ui:{...a.ui,...o,expandedCards:Me(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let s=e.get();e.update({ui:{...s.ui,expandedCards:{...s.ui.expandedCards,[o]:!!a}}})}function r(o){let a=e.get();n(o,!a.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function xt(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function qn(){return Object.keys(ce).map(e=>({value:e,label:xt(e)}))}var Kn=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Yn(e){return xt(e.replace(/^--/,""))}function Jn(e){return e.alpha<1?e.rgba:e.hex}function Xn(e){let t=e?.defaultExpanded??!1,n=e?.onExpandChange,r=(d,E)=>{let L=u("div",{className:"kv kv--inline-mobile"}),I=u("label",{},d),S=u("div",{className:"ro"});return typeof E=="string"?S.textContent=E:S.append(E),L.append(I,S),L},o=u("code",{},"\u2014"),a=u("span",{},"\u2014"),s=u("span",{},"\u2014"),p=u("span",{},"\u2014"),k=u("span",{},"\u2014"),h=u("span",{},"\u2014"),f=()=>{let d=te();s.textContent=d.surface,p.textContent=d.platform,k.textContent=d.browser??"Unknown",h.textContent=d.os??"Unknown",o.textContent=d.host,a.textContent=d.isInIframe?"Yes":"No"},c=se({label:"Copy JSON",variant:"primary",size:"sm"});gt(c,()=>{let d=te();return JSON.stringify(d,null,2)});let i=u("div",{style:"width:100%;display:flex;justify-content:center;"},c),g=ie({title:"System",variant:"soft",padding:"lg",footer:i,expandable:!0,defaultExpanded:t,onExpandChange:n},r("Surface",s),r("Platform",p),r("Browser",k),r("OS",h),r("Host",o),r("Iframe",a)),y=()=>{document.hidden||f()};return document.addEventListener("visibilitychange",y),f(),g.__cleanup=()=>document.removeEventListener("visibilitychange",y),g}function vt(e){return new de({id:"tab-settings",label:"Settings",mount(t){let n=u("section",{id:"settings",className:"lg-section"});n.style.display="grid",n.style.gap="12px",t.appendChild(n);let r=null,o;return(async()=>{try{r=await ht()}catch{r={get:()=>Ne,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=r.get(),s=Object.keys(ce),p=e.getCurrentTheme?.()??e.initialTheme,k=s.includes(p)?p:s[0]??"dark",h=k,f=Re({text:"Theme",tone:"muted",size:"lg"}),c=be({options:qn(),value:k,onChange:L=>{h=L,e.applyTheme(L),d(L)}}),i=u("div",{className:"settings-theme-grid"}),g=ie({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:L=>r.setCardExpanded("style",L)},u("div",{className:"kv settings-theme-row"},f.root,c.root),i);function y(L,I,S){let l=ce[L];l&&(l[I]=Jn(S),h===L&&e.applyTheme(L))}function d(L){let I=ce[L];if(i.replaceChildren(),!!I)for(let S of Kn){let l=I[S];if(l==null)continue;let b=ft({label:Yn(S),value:l,defaultExpanded:!1,onInput:x=>y(L,S,x),onChange:x=>y(L,S,x)});i.appendChild(b.root)}}d(k);let E=Xn({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:L=>r.setCardExpanded("system",L)});n.appendChild(g),n.appendChild(E),o=E.__cleanup})(),()=>{try{o?.()}catch{}t.replaceChildren()}}})}function Se(e){return e<10?`0${e}`:String(e)}function X(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),r=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+r}function qe(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),r=t%60;return`${Se(n)}:${Se(r)}`}function ae(e,t){let n=X(e),r=Math.max(0,Math.min(1439,n)),o=Math.floor(r/t)*t;return qe(o)}function Qn(e){let t=Math.floor(e/60),n=e%60,r=t>=12;return{h12:t%12||12,m:n,pm:r}}function Zn(e,t,n){return(e%12+(n?12:0))*60+t}function eo(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function yt(e={}){let{id:t,start:n="08:00",end:r="23:00",stepMinutes:o=5,disabled:a=!1,allowOvernight:s=!0,labels:p={from:"From",to:"To"},picker:k="auto",format:h="auto",useNativeOn:f,onChange:c}=e,i={start:ae(n,o),end:ae(r,o)},g=u("div",{className:"time-range",id:t});g.classList.add("time-range--stacked");let y=te();if(k==="native"||k==="auto"&&(f?.(y)??eo(y)))return E();return L();function E(){let l=u("div",{className:"time-range-field",role:"group"}),b=u("span",{className:"time-range-label"},p.from||"From"),x=u("input",{className:"input time-range-input",type:"time",step:String(o*60),value:i.start}),T=u("div",{className:"time-range-field",role:"group"}),w=u("span",{className:"time-range-label"},p.to||"To"),W=u("input",{className:"input time-range-input",type:"time",step:String(o*60),value:i.end});l.append(b,x),T.append(w,W),g.append(l,T);function N(){x.value=i.start,W.value=i.end}function C(){c?.($())}function G(P){let H=P.target,z=H===x,v=ae(H.value||(z?i.start:i.end),o);z?(i.start=v,!s&&X(i.end)<X(i.start)&&(i.end=i.start)):(i.end=v,!s&&X(i.end)<X(i.start)&&(i.start=i.end)),N(),C()}x.addEventListener("change",G),x.addEventListener("blur",G),W.addEventListener("change",G),W.addEventListener("blur",G),a&&D(!0);function $(){return{...i}}function V(P){if(P.start&&(i.start=ae(P.start,o)),P.end&&(i.end=ae(P.end,o)),!s){let H=X(i.start);X(i.end)<H&&(i.end=i.start)}N(),C()}function D(P){x.disabled=P,W.disabled=P,g.classList.toggle("is-disabled",!!P)}function B(){x.removeEventListener("change",G),x.removeEventListener("blur",G),W.removeEventListener("change",G),W.removeEventListener("blur",G),g.replaceChildren()}return{root:g,getValue:$,setValue:V,setDisabled:D,destroy:B}}function L(){let l=u("label",{className:"time-range-field"}),b=u("span",{className:"time-range-label"},p.from||"From"),x=u("label",{className:"time-range-field"}),T=u("span",{className:"time-range-label"},p.to||"To"),w=h==="12h"||h==="auto"&&S(),W=I(i.start,w),N=I(i.end,w);l.append(b,W.container),x.append(T,N.container),g.append(l,x),a&&V(!0),$(),W.onAnyChange(()=>{i.start=W.to24h(o),!s&&X(i.end)<X(i.start)&&(i.end=i.start,N.setFrom24h(i.end)),c?.(C())}),N.onAnyChange(()=>{i.end=N.to24h(o),!s&&X(i.end)<X(i.start)&&(i.start=i.end,W.setFrom24h(i.start)),c?.(C())});function C(){return{...i}}function G(B){if(B.start&&(i.start=ae(B.start,o)),B.end&&(i.end=ae(B.end,o)),!s){let P=X(i.start);X(i.end)<P&&(i.end=i.start)}$(),c?.(C())}function $(){W.setFrom24h(i.start),N.setFrom24h(i.end)}function V(B){W.setDisabled(B),N.setDisabled(B),g.classList.toggle("is-disabled",!!B)}function D(){W.destroy(),N.destroy(),g.replaceChildren()}return{root:g,getValue:C,setValue:G,setDisabled:V,destroy:D}}function I(l,b){let x=u("div",{className:"time-picker"}),T=(m,M=2)=>{m.classList.add("time-picker-compact"),m.style.setProperty("--min-ch",String(M))},w=b?Array.from({length:12},(m,M)=>{let R=M+1;return{value:String(R),label:Se(R)}}):Array.from({length:24},(m,M)=>({value:String(M),label:Se(M)})),W=be({size:"sm",options:w,placeholder:"HH",onChange:()=>B()});T(W.root,2);let N=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),C=Array.from({length:Math.floor(60/N)},(m,M)=>{let R=M*N;return{value:String(R),label:Se(R)}}),G=be({size:"sm",options:C,placeholder:"MM",onChange:()=>B()});T(G.root,2);let $=b?be({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>B()}):null;$&&T($.root,3),x.append(W.root,G.root,...$?[$.root]:[]);let V=null;function D(m){V=m}function B(){V?.()}function P(m){let M=X(m);if(b){let R=Qn(M);W.setValue(String(R.h12),{notify:!1}),G.setValue(String(Math.floor(R.m/N)*N),{notify:!1}),$.setValue(R.pm?"pm":"am",{notify:!1})}else{let R=Math.floor(M/60),A=M%60;W.setValue(String(R),{notify:!1}),G.setValue(String(Math.floor(A/N)*N),{notify:!1})}}function H(m){let M=parseInt(G.getValue()||"0",10)||0;if(b){let R=parseInt(W.getValue()||"12",10)||12,A=($?.getValue()||"am")==="pm",U=Zn(R,M,A);return ae(qe(U),m)}else{let A=(parseInt(W.getValue()||"0",10)||0)*60+M;return ae(qe(A),m)}}function z(m){W.setDisabled(m),G.setDisabled(m),$?.setDisabled(m),x.classList.toggle("is-disabled",!!m)}function v(){x.replaceChildren()}return{container:x,onAnyChange:D,setFrom24h:P,to24h:H,setDisabled:z,destroy:v}}function S(){try{let b=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(b)}catch{return!1}}}function wt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function to(e){let t=wt(e);t=t.replace(/\/\*[\s\S]*?\*\//g,o=>`<span class="tok tok-comm">${o}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(o,a,s)=>`${a}<span class="tok tok-comm">${s}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,o=>`<span class="tok tok-num">${o}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],r=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(r,o=>`<span class="tok tok-kw">${o}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,o=>`<span class="tok tok-lit">${o}</span>`),t}function kt(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0"),o=String(t.getSeconds()).padStart(2,"0");return`${n}:${r}:${o}`}function St(e={}){let{id:t,className:n,height:r,maxLines:o=500,wrap:a=!1,mode:s="plain",showTimestamps:p=!0,autoScroll:k=!0}=e,h=u("div",{className:"log",id:t});n&&h.classList.add(...n.split(" ").filter(Boolean)),a&&h.classList.add("log--wrap");let f=u("div",{className:"log-viewport"}),c=u("div",{className:"log-lines"});f.appendChild(c),h.appendChild(f),r!=null&&(h.style.blockSize=typeof r=="number"?`${r}px`:String(r));let i=s,g=o,y=new Map;function d(D){return i==="js"?to(D):wt(D)}function E(D){return D?y.get(D)?.body??c:c}function L(D){let B=typeof D=="string"?{text:D}:D||{text:""},P=E(B.groupKey);if(B.key){let v=Array.from(P.querySelectorAll(`.log-line[data-key="${B.key}"]`)).pop();if(v){B.level&&(v.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),v.classList.add(`log-level--${B.level}`));let m=v.querySelector(".log-time");p&&m&&(m.textContent=kt(B.time));let M=v.querySelector(".log-text");M&&(M.innerHTML=d(B.text)),k&&T();return}}let H=document.createElement("div");if(H.className="log-line",B.level&&H.classList.add(`log-level--${B.level}`),B.key&&(H.dataset.key=B.key),p){let v=document.createElement("span");v.className="log-time",v.textContent=kt(B.time),H.appendChild(v)}let z=document.createElement("span");z.className="log-text",z.innerHTML=d(B.text),H.appendChild(z),P.appendChild(H),N(),k&&T()}function I(D){for(let B of D)L(B)}function S(){c.replaceChildren(),y.clear()}function l(D){i=D,T()}function b(D){h.classList.toggle("log--wrap",!!D),T()}function x(D){g=Math.max(1,Math.floor(D||1))}function T(){requestAnimationFrame(()=>{f.scrollTop=f.scrollHeight})}function w(){let D=0;for(let B=0;B<c.children.length;B+=1){let P=c.children[B];(P.classList.contains("log-line")||P.classList.contains("log-group"))&&(D+=1)}return D}function W(){let D=c.firstElementChild;if(!D)return!1;if(D.classList.contains("log-group")){let B=D.dataset.groupKey;B&&y.delete(B)}return D.remove(),!0}function N(){let D=w();for(;D>g&&W();)D--}function C(D,B){let P=B?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(y.has(P))return P;let H=document.createElement("div");H.className="log-group",H.dataset.groupKey=P;let z=document.createElement("div");z.className="log-group-header",z.textContent=D;let v=document.createElement("div");v.className="log-group-body",H.append(z,v),c.appendChild(H),y.set(P,{root:H,header:z,body:v});let m=M=>{H.classList.toggle("is-collapsed",!!M)};return B?.collapsed&&m(!0),z.addEventListener("click",()=>m(!H.classList.contains("is-collapsed"))),k&&T(),P}function G(D){y.get(D)}function $(D,B){let P=y.get(D);P&&(B==null?P.root.classList.toggle("is-collapsed"):P.root.classList.toggle("is-collapsed",!!B))}let V=h;return V.add=L,V.addMany=I,V.clear=S,V.setMode=l,V.setWrap=b,V.setMaxLines=x,V.scrollToEnd=T,V.beginGroup=C,V.endGroup=G,V.toggleGroup=$,V}var Q={nativeCtor:null,captured:[],latestOpen:null},Et=Symbol.for("ariesmod.ws.capture.wrapped"),Tt=Symbol.for("ariesmod.ws.capture.native"),Ct=1;function Ke(e){return!!e&&e.readyState===Ct}function no(){if(Ke(Q.latestOpen))return Q.latestOpen;for(let e=Q.captured.length-1;e>=0;e--){let t=Q.captured[e];if(Ke(t))return t}return null}function oo(e,t){Q.captured.push(e),Q.captured.length>25&&Q.captured.splice(0,Q.captured.length-25);let n=()=>{Q.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{Q.latestOpen===e&&(Q.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===Ct&&n()}function Mt(e=j,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[Et])return Q.nativeCtor=r[Tt]??Q.nativeCtor??null,()=>{};let o=r;Q.nativeCtor=o;function a(s,p){let k=p!==void 0?new o(s,p):new o(s);try{oo(k,n)}catch{}return k}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[Et]=!0,a[Tt]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=o)}catch{}}}function ro(e=j){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Ee(e=j){let t=no();if(t)return{ws:t,source:"captured"};let n=ro(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Lt(e,t={}){let n=t.pageWindow??j,r=t.intervalMs??500,o=!!t.debug,a=null,s=null,p=()=>{let h=Ee(n);(h.ws!==a||h.source!==s)&&(a=h.ws,s=h.source,o&&console.log("[WS] best socket changed:",h.source,h.ws),e(h))};p();let k=setInterval(p,r);return()=>clearInterval(k)}function ao(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function io(e,t=j){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=Ee(t);if(!r)return{ok:!1,reason:"no-ws"};if(!Ke(r))return{ok:!1,reason:"not-open"};let o=ao(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function Pt(e,t={},n=j){return io({type:e,...t},n)}var oe={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},O={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Cr=new Set(Object.values(oe)),Mr=new Set(Object.values(O));function so(e,t={},n=j){return Pt(e,t,n)}function Ht(e,t=j){return so(O.Chat,{scopePath:["Room"],message:e},t)}function Rt(){return new de({id:"tab-test",label:"Test",mount(e){let t=u("section",{id:"tab-test",className:"lg-section"}),n=St({height:220,mode:"js",maxLines:1e3});n.add({level:"info",text:"Log initialise"}),n.add({level:"debug",text:"const x = 42; // demo"}),n.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),n.add({level:"error",text:"new Error('Boom')"});let r=Re({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),o=yt({start:"09:00",end:"18:00",stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:y=>console.log("Range:",y.start,"->",y.end)}),a=u("div",r.root,o.root),s=se({label:"Appliquer",variant:"primary",onClick:()=>{let y=o.getValue();n.add({level:"info",text:`[Apply] ${y.start} -> ${y.end}`})}}),p=ie({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Ve(s)},a),k=se({label:"Clear",onClick:()=>Ht("test")}),h=se({label:"Wrap",onClick:()=>n.setWrap(!n.classList.contains("log--wrap"))}),f=!0,c=se({label:"Mode: js",onClick:()=>{f=!f,n.setMode(f?"js":"plain"),c.setLabel(`Mode: ${f?"js":"plain"}`)}}),i=se({label:"Add line",onClick:()=>n.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),g=ie({title:"Logs",variant:"default",padding:"lg"},n,Ve(k,h,c,i));return t.appendChild(p),t.appendChild(g),e.appendChild(t),()=>{e.replaceChildren()}}})}function Ye(e){return[vt({applyTheme:e.applyTheme,initialTheme:e.initialTheme,getCurrentTheme:e.getCurrentTheme}),Rt()]}function It(e,t,n){let r=u("div",{className:"lg-pill",id:"pill"}),o=e.map(f=>{let c=u("button",{className:"lg-tab"},f.label);return c.setAttribute("data-target",f.id),c}),a=u("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),s=a;a.addEventListener("wheel",f=>{Math.abs(f.deltaY)>Math.abs(f.deltaX)&&(f.preventDefault(),a.scrollLeft+=f.deltaY)},{passive:!1});function p(f){let c=a.getBoundingClientRect(),i=o.find(b=>b.dataset.target===f)||o[0];if(!i)return;let g=i.getBoundingClientRect(),y=g.left-c.left,d=g.width;r.style.width=`${d}px`,r.style.transform=`translateX(${y}px)`;let E=a.scrollLeft,L=E,I=E+a.clientWidth,S=y-12,l=y+d+12;S<L?a.scrollTo({left:S,behavior:"smooth"}):l>I&&a.scrollTo({left:l-a.clientWidth,behavior:"smooth"})}let k=t||(e[0]?.id??"");function h(f){k=f,o.forEach(c=>c.classList.toggle("active",c.dataset.target===f)),p(f),n(f)}return o.forEach(f=>f.addEventListener("click",()=>h(f.dataset.target))),queueMicrotask(()=>p(k)),{root:s,activate:h,recalc:()=>p(k),getActive:()=>k}}var Wt=`
@layer components {
  /* ===== Card (base) ===== */
  .card{
    border:1px solid var(--border);
    border-radius:16px;
    padding:12px;
    background-color: color-mix(in oklab, var(--bg) 88%, transparent);
    box-shadow:0 10px 24px color-mix(in oklab, var(--shadow) 40%, transparent);
    transition:
      background-color .28s ease,
      border-color .28s ease,
      box-shadow .28s ease,
      color .28s ease;
    border-left-color: var(--border);
  }

  .card--expandable{
    overflow:hidden;
  }
  .card--expandable.card--expanded{
    overflow:visible;
  }

  .card-collapse{
    display:block;
    overflow:hidden;
    transition:
      height .24s cubic-bezier(.2,.8,.2,1),
      opacity .2s ease;
  }
  .card-collapse--animating{
    pointer-events:none;
    will-change: height, opacity;
    overflow:hidden !important;
  }
  .card--expanded .card-collapse{
    overflow:visible;
  }

  /* \u2014\u2014 Sous-structure \u2014\u2014 */
  .card-header{
    margin-bottom:8px;
    display:flex;
    align-items:center;
    gap:12px;
    justify-content:space-between;
  }
  .card-body{ display:block; }
  .card-footer{
    margin-top:10px;
    display:flex;
    gap:8px;
    align-items:center;
    justify-content:flex-end;
  }

  .card--collapsed .card-header{
    margin-bottom:0;
  }
  .card--collapsed .card-header--expandable{
    margin:-2px -4px 0;
  }

  .card-header--expandable{
    cursor:pointer;
    user-select:none;
    border-radius:12px;
    padding:2px 4px;
    margin:-2px -4px 8px;
    transition: background-color .2s ease, color .2s ease;
  }
  .card-header--expandable:hover{
    background: color-mix(in oklab, var(--soft) 82%, transparent);
  }
  .card-header--expandable:active{
    background: color-mix(in oklab, var(--soft) 72%, transparent);
  }

  .card-toggle{
    appearance:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    padding:2px 4px;
    border:none;
    background:transparent;
    color: var(--fg);
    font: 700 14px/1 var(--font-ui, system-ui);
    cursor:pointer;
    transition: color .2s ease, transform .12s ease;
  }
  .card-toggle:hover{
    color: color-mix(in oklab, var(--accent) 45%, var(--fg));
  }
  .card-toggle:active{
    transform: translateY(1px);
  }

  /* Media block flowing inside the card */
  .card-media img,
  .card-media video,
  .card-media canvas{
    display:block;
    width:100%;
    border-radius:12px;
  }

  /* Divider tinted by the theme */
  .card-divider{
    height:1px;
    margin:8px -2px;
    border-radius:1px;
    background: linear-gradient(
      90deg,
      color-mix(in oklab, var(--pill-from) 52%, var(--border)),
      color-mix(in oklab, var(--pill-to) 48%, var(--border))
    );
    box-shadow: 0 0 0 1px color-mix(in oklab, var(--border) 55%, transparent) inset;
  }

  /* ===== Appearance variants ===== */
  .card--soft {
    background: color-mix(in oklab, var(--bg) 82%, transparent);
  }
  .card--glass {
    background: color-mix(in oklab, var(--bg) 70%, transparent);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
  }
  .card--outline {
    background: transparent;
    border-style: dashed;
  }

  /* Padding variants (control body padding) */
  .card--p-none .card-body { padding: 0; }
  .card--p-sm   .card-body { padding: 8px; }
  .card--p-md   .card-body { padding: 12px; }
  .card--p-lg   .card-body { padding: 16px; }

  /* Lateral accent on hover (if interactive) */
  .card--interactive {
    transition: transform .04s, box-shadow .2s;
    cursor: pointer;
  }
  .card--interactive:hover {
    box-shadow: 0 12px 28px color-mix(in oklab, var(--shadow) 45%, transparent);
    border-left-color: var(--divider);
  }

  /* Optional explicit accent bar */
  .card-accent { display:none; }

  /* Explicit tones (force the accent color) */
  .card--tone-info{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: #3b82f6;
  }
  .card--tone-success{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: #16a34a;
  }
  .card--tone-warning{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: #f59e0b;
  }
  .card--tone-danger{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: #ef4444;
  }
}
  
`;var Nt=`
.badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:var(--badge-py, 6px) var(--badge-px, 12px);
  border-radius:var(--badge-radius, 12px);
  border:1px solid var(--border);
  background-color: color-mix(in oklab, var(--soft) 80%, transparent);
  color: var(--fg);
  font-size: var(--badge-fs, 13px);
  line-height:1.1;
  font-weight:600;
  white-space:nowrap;
  opacity:.98;
  transition:
    background-color .28s ease,
    border-color .28s ease,
    color .28s ease,
    box-shadow .28s ease;
}

.badge--pill{ border-radius:999px; }

.badge--sm{ --badge-py:4px; --badge-px:10px; --badge-fs:12px; --badge-radius:10px; }
.badge--md{ --badge-py:6px; --badge-px:12px; --badge-fs:13px; --badge-radius:12px; }
.badge--lg,.badge--large{
  --badge-py:8px; --badge-px:14px; --badge-fs:14px; --badge-radius:12px;
}

.badge--outline{ background-color: transparent; }
.badge--solid{ background-color: color-mix(in oklab, var(--border) 18%, transparent); }

.badge--neutral{ --bd: var(--border); }
.badge--info{    --bd: color-mix(in oklab, #38bdf8 65%, var(--border)); }
.badge--success{ --bd: color-mix(in oklab, #22c55e 65%, var(--border)); }
.badge--warning{ --bd: color-mix(in oklab, #f59e0b 65%, var(--border)); }
.badge--danger{  --bd: color-mix(in oklab, #ef4444 65%, var(--border)); }

.badge.badge--neutral,
.badge.badge--info,
.badge.badge--success,
.badge.badge--warning,
.badge.badge--danger{
  border-color: var(--bd, var(--border));
}

.badge--soft.badge--info    { background-color: color-mix(in oklab, #38bdf8 15%, transparent); }
.badge--soft.badge--success { background-color: color-mix(in oklab, #22c55e 14%, transparent); }
.badge--soft.badge--warning { background-color: color-mix(in oklab, #f59e0b 16%, transparent); }
.badge--soft.badge--danger  { background-color: color-mix(in oklab, #ef4444 15%, transparent); }

/* ===================== RARITY ===================== */
.badge.badge--rarity{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  padding:4px 8px;
  border-radius:5px;
  font-size:12px;
  font-weight:700;
  line-height:1.1;
  white-space:nowrap;
  box-shadow:0 0 0 1px #0006 inset;
  border:none;
  background:transparent;
  color:inherit;
}

.badge.badge--rarity.badge--rarity-common    { background:#E7E7E7; color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-uncommon  { background:#67BD4D; color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-rare      { background:#0071C6; color:#ffffff; }
.badge.badge--rarity.badge--rarity-legendary { background:#FFC734; color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-mythical  { background:#9944A7; color:#ffffff; }
.badge.badge--rarity.badge--rarity-divine    { background:#FF7835; color:#0b0b0b; }

/* Animated celestial */
@keyframes badgeCelestialShift {
  0% { background-position: 0% 50%; }
  50%{ background-position:100% 50%; }
  100%{background-position: 0% 50%; }
}
.badge.badge--rarity.badge--rarity-celestial{
  background: linear-gradient(130deg,
    rgb(0,180,216) 0%,
    rgb(124,42,232) 40%,
    rgb(160,0,126) 60%,
    rgb(255,215,0) 100%);
  background-size:200% 200%;
  animation: badgeCelestialShift 4s linear infinite;
  color:#fff;
  -webkit-text-stroke: 0.2px #000;
}

/* >>> UNKNOWN <<< */
.badge.badge--rarity.badge--rarity-unknown{
  background:#000;
  color:#fff;
  box-shadow:0 0 0 1px #000 inset; /* background already black; inner border invisible but kept for structure */
}
`;var Dt=`
.btn{
  appearance:none;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;

  padding: var(--btn-py, 10px) var(--btn-px, 14px);
  min-height: var(--btn-minh, 40px);
  border-radius: var(--btn-radius, 12px);

  border:1px solid var(--btn-border, color-mix(in oklab, var(--border) 70%, transparent));
  background: linear-gradient(
    180deg,
    var(--btn-bg-start, color-mix(in oklab, var(--soft) 85%, transparent)) 0%,
    var(--btn-bg-end,   color-mix(in oklab, var(--soft) 60%, transparent)) 100%
  );

  color: var(--btn-fg, var(--fg));
  font: 500 13px/1 var(--font-ui, system-ui);
  letter-spacing:.2px;
  cursor:pointer;

  transition:
    transform .05s,
    box-shadow .2s,
    background .2s,
    border-color .28s ease,
    color .28s ease;

  box-shadow: var(--btn-shadow, 0 6px 18px color-mix(in oklab, var(--shadow) 35%, transparent));
  position: relative;
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
}

.btn:hover{
  border-color: var(--btn-border-hover, color-mix(in oklab, var(--accent) 40%, var(--border)));
}

.btn:active{
  transform: translateY(1px);
}

.btn:focus-visible{
  outline: none;
  box-shadow:
    0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent),
    var(--btn-shadow, 0 6px 18px color-mix(in oklab, var(--shadow) 35%, transparent));
}

.btn:disabled,
.btn[disabled],
.btn[aria-busy="true"]{
  opacity:.6;
  cursor:not-allowed;
  filter:saturate(92%);
}

/* Inner content */
.btn .btn-label{
  display:inline-flex;
  align-items:center;
  line-height:1;
}

.btn-ico{
  display:inline-flex;
  align-items:center;
  line-height:0;
}
.btn-ico--left{ margin-right:2px; }
.btn-ico--right{ margin-left:2px; }

/* Variants */
.btn.primary{
  background: linear-gradient(
    180deg,
    var(--btn-primary-bg-start, color-mix(in oklab, var(--accent) 30%, transparent)) 0%,
    var(--btn-primary-bg-end,   color-mix(in oklab, var(--accent) 45%, transparent)) 100%
  );
  border-color: var(--btn-primary-border, color-mix(in oklab, var(--accent) 55%, var(--border)));
  color: var(--btn-primary-fg, var(--fg));
}
.btn.primary:hover{
  border-color: color-mix(in oklab, var(--accent) 65%, var(--border));
  filter: brightness(1.02);
}
.btn.primary:active{
  transform: translateY(1px);
  filter: brightness(.98);
}

/* Sizes */
.btn--sm{
  padding:6px 10px;
  min-height:32px;
  border-radius:10px;
  font-size:12px;
}
.btn--lg{
  padding:12px 16px;
  min-height:44px;
  border-radius:14px;
  font-size:14px;
}

/* Icon-only */
.btn.btn--icon{
  padding:8px;
  min-width:36px;
  min-height:36px;
}
.btn.btn--icon.btn--sm{
  min-width:32px;
  min-height:32px;
  padding:6px;
}

/* Full width */
.btn--full{ width:100%; }

/* Busy: external spinner controls visibility,
   but ensure hidden icons can still be revealed */
.btn[aria-busy="true"] svg[aria-hidden="true"]{
  display:inline-block !important;
}

/* In a .kv container (aligned with your inputs) */
.kv .btn--full{ width:100%; }
`;function q(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var Bt=`
@layer tokens {
  /* --- Animatable properties --- */
  @property --bg{        syntax:'<color>';inherits:true;initial-value:rgba(10,12,18,.6)}
  @property --fg{        syntax:'<color>';inherits:true;initial-value:#e5e7eb}
  @property --muted{     syntax:'<color>';inherits:true;initial-value:rgba(229,231,235,.08)}
  @property --soft{      syntax:'<color>';inherits:true;initial-value:rgba(229,231,235,.05)}
  @property --accent{    syntax:'<color>';inherits:true;initial-value:#60a5fa}
  @property --border{    syntax:'<color>';inherits:true;initial-value:rgba(148,163,184,.2)}
  @property --tab-bg{    syntax:'<color>';inherits:true;initial-value:#fff}
  @property --tab-fg{    syntax:'<color>';inherits:true;initial-value:#0f172a}
  @property --pill-from{ syntax:'<color>';inherits:true;initial-value:#6366f1}
  @property --pill-to{   syntax:'<color>';inherits:true;initial-value:#06b6d4}
  @property --divider{   syntax:'<color>';inherits:true;initial-value:color-mix(in oklab, var(--accent) 55%, var(--border))}

  :host{
    all: initial;

    /* Default theme */
    --bg:rgba(10,12,18,.6);
    --fg:#e5e7eb;
    --muted:rgba(229,231,235,.08);
    --soft:rgba(229,231,235,.05);
    --accent:#60a5fa;
    --border:rgba(148,163,184,.2);
    --shadow:rgba(0,0,0,.45);
    --tab-bg:#fff;
    --tab-fg:#0f172a;
    --pill-from:#6366f1;
    --pill-to:#06b6d4;
    --divider: color-mix(in oklab, var(--accent) 55%, var(--border));

    /* Layout tokens */
    --w:480px;
    --radius:18px;
    --pad:14px;
    --tab-h:64px;
    --glass-blur:14px;

    /* Safe areas */
    --inset-t: env(safe-area-inset-top, 0px);
    --inset-r: env(safe-area-inset-right, 0px);
    --inset-b: env(safe-area-inset-bottom, 0px);
    --inset-l: env(safe-area-inset-left, 0px);

    /* Badges */
    --badge-py:6px;
    --badge-px:12px;
    --badge-fs:13px;
    --badge-radius:12px;

    /* Cards */
    --card-accent-w: 3px;

    /* Buttons (tokens only, not the component style) */
    --btn-py: 10px;
    --btn-px: 14px;
    --btn-minh: 40px;
    --btn-radius: 12px;
    --btn-fg: var(--fg);
    --btn-border: color-mix(in oklab, var(--border) 70%, transparent);
    --btn-border-hover: color-mix(in oklab, var(--accent) 40%, var(--border));
    --btn-shadow: 0 6px 18px color-mix(in oklab, var(--shadow) 35%, transparent);
    --btn-bg-start: color-mix(in oklab, var(--soft) 85%, transparent);
    --btn-bg-end:   color-mix(in oklab, var(--soft) 60%, transparent);
    --btn-primary-fg: var(--fg);
    --btn-primary-border: color-mix(in oklab, var(--accent) 55%, var(--border));
    --btn-primary-bg-start: color-mix(in oklab, var(--accent) 30%, transparent);
    --btn-primary-bg-end:   color-mix(in oklab, var(--accent) 45%, transparent);

    /* Table tokens */
    --lg-cols: 1fr;
    --lg-row-min-h: 36px;
    --lg-row-h: 70px;
    --tbl-max-h: auto;

    /* Font */
    --font-ui: system-ui, -apple-system, "Segoe UI", Roboto, Inter,
               "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
    font-family: var(--font-ui);
  }

  :host *, :host *::before, :host *::after { font-family: inherit; }

  /* Theme transitions */
  :host(.theme-anim){
    transition:
      --bg .28s ease, --fg .28s ease, --muted .28s ease, --soft .28s ease,
      --accent .28s ease, --border .28s ease, --divider .28s ease,
      --tab-bg .28s ease, --tab-fg .28s ease,
      --pill-from .28s ease, --pill-to .28s ease;
  }
  @supports not (property: --bg) {
    :host(.theme-anim){ transition:filter .22s ease; filter:saturate(108%) brightness(1.02); }
  }

  /* Global smooth font rendering */
  :host, * { -webkit-font-smoothing: antialiased; }

  /* Responsive tweaks via tokens (no structural changes here) */
  @media (max-width: 1024px){
    :host{ --w: min(92vw, 560px); }
  }
  @media (max-width: 720px){
    :host{ --w: 100vw; --tab-h:56px; }
  }
  @media (max-width: 480px){
    :host{ --w: 100vw; --tab-h:52px; --pad:12px; }
  }
  @media (max-width: 360px){
    :host{ --tab-h:48px; }
  }
}
`;var Ot=`
@layer utilities {
  /* Generic utilities, without component styling */

  /* Accessibility */
  .sr-only{
    position:absolute !important;
    width:1px;height:1px;
    padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;
  }

  /* Quick layout helpers */
  .u-flex{ display:flex !important; }
  .u-grid{ display:grid !important; }
  .u-center{ display:flex !important; align-items:center !important; justify-content:center !important; }
  .u-grid-center{ display:grid !important; place-items:center !important; }
  .u-col{ display:flex !important; flex-direction:column !important; }
  .u-flex-1{ flex:1 1 auto !important; }
  .u-row{ display:flex !important; flex-direction:row !important; }
  .u-align-center{ align-items:center !important; }
  .u-justify-between{ justify-content:space-between !important; }
  .u-justify-start{ justify-content:flex-start !important; }
  .u-justify-center{ justify-content:center !important; }
  .u-full{ width:100% !important; }
  .u-h-full{ height:100% !important; }
  .u-minh-0{ min-height:0 !important; }
  .u-nowrap{ white-space:nowrap !important; }
  .u-ellipsis{ overflow:hidden !important; text-overflow:ellipsis !important; white-space:nowrap !important; }
  .u-gap-6{ gap:6px !important; }
  .u-gap-8{ gap:8px !important; }
  .u-gap-12{ gap:12px !important; }
  .u-gap-10{ gap:10px !important; }
  .u-mb-8{ margin-bottom:8px !important; }
  .u-mt-12{ margin-top:12px !important; }

  /* Behaviors */
  .u-scroll-y{ overflow-y:auto !important; }
  .u-no-select{ user-select:none !important; }
  .u-pointer{ cursor:pointer !important; }

  /* Small grouped action areas (e.g., to the right of a read-only value) */
  .kv-actions{ display:inline-flex; gap:6px; }

  /* Compact read-only values (shared primitive) */
  .ro{
    display:inline-flex; align-items:center; width:100%;
    border:1px solid var(--border); border-radius:12px; padding:8px 10px; box-sizing:border-box;
    background-color:color-mix(in oklab, var(--soft) 80%, transparent);
    color:var(--fg); font: 12.5px/1.35 var(--font-ui);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }

  /* Small circular help icon */
  .u-help-ico{
    display:inline-flex; align-items:center; justify-content:center;
    width:20px; height:20px; border:1px solid var(--border); border-radius:999px;
    font: 12px/1 ui-monospace, SFMono-Regular, Menlo, Consolas;
    opacity:.9; cursor:help; user-select:none;
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--soft) 85%, transparent) 0%,
      color-mix(in oklab, var(--soft) 60%, transparent) 100%
    );
  }
}
`;var At=`
@layer base {
  /* Root container */
  .lg-wrap{ position:relative; pointer-events:auto; }

  /* ---- HUD panel ---- */
  .lg-panel{
    position:fixed; top:0; right:0; bottom:0; width:var(--w);
    display:flex; flex-direction:column;
    background-color:var(--bg);
    color:var(--fg);
    border-left:1px solid var(--border);
    box-shadow:-20px 0 60px var(--shadow);
    transform:translateX(100%);
    transition:transform .28s cubic-bezier(.2,.8,.2,1),
               background-color .28s ease, color .28s ease,
               border-color .28s ease, box-shadow .28s ease;
    overflow:hidden; pointer-events:auto;
    backdrop-filter:blur(var(--glass-blur)); -webkit-backdrop-filter:blur(var(--glass-blur));
  }
  .lg-panel.open{ transform:translateX(0); }

  /* ---- Resizer (desktop only en JS) ---- */
  .lg-resizer{
    position:absolute; left:0; top:0; bottom:0; width:8px;
    cursor:ew-resize; background:transparent;
  }
  .lg-resizer:hover{
    background:color-mix(in oklab, var(--accent) 15%, transparent);
  }

  /* ---- TABBAR (grid: tabs that stretch + close button) ---- */
  .lg-tabbar{
    position: relative;
    height: var(--tab-h);
    display: grid;
    grid-template-columns: minmax(0,1fr) auto;
    align-items: center;
    gap: 14px;
    padding: 12px max(12px, var(--inset-l)) 12px max(12px, var(--inset-r));
    background-color: color-mix(in oklab, var(--bg) 92%, transparent);
    transition: background-color .28s ease, border-color .28s ease;
  }

  /* ---- CLOSE BUTTON (dans la tabbar, colonne auto) ---- */
  .lg-close{
    position: static;
    inline-size: 34px;
    block-size: 34px;
    border-radius: 999px;
    border: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--soft) 85%, transparent) 0%,
      color-mix(in oklab, var(--soft) 60%, transparent) 100%
    );
    color: var(--fg);
    font: 16px/1 ui-monospace, SFMono-Regular, Menlo, Consolas;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 6px 18px color-mix(in oklab, var(--shadow) 35%, transparent);
    transition: transform .05s, border-color .2s, background .2s, color .2s, opacity .2s;
  }
  .lg-close:hover{ border-color: color-mix(in oklab, var(--accent) 40%, var(--border)); }
  .lg-close:active{ transform: scale(.98); }

  /* Tweaks responsive pour la tabbar et la croix */
  @media (max-width: 720px){
    .lg-tabbar{
      gap: 12px;
      padding: 10px max(10px, var(--inset-l)) 10px max(10px, var(--inset-r));
    }
    .lg-close{
      inline-size: 30px;
      block-size: 30px;
      font-size: 15px;
    }
  }
  @media (max-width: 480px){
    .lg-tabbar{
      gap: 10px;
      padding: 10px max(8px, var(--inset-l)) 10px max(8px, var(--inset-r));
    }
    .lg-close{
      inline-size: 28px;
      block-size: 28px;
      font-size: 14px;
    }
  }

  /* ---- Contenu ---- */
  .lg-content{
    padding:calc(var(--pad) + var(--inset-t)) var(--pad) calc(var(--pad) + var(--inset-b));
    overflow:auto;
    height:calc(100dvh - var(--tab-h));
    scrollbar-gutter:stable;
  }
  .lg-content::-webkit-scrollbar{ width:10px; }
  .lg-content::-webkit-scrollbar-thumb{ background:var(--muted); border-radius:8px; }
  .lg-section{ display:block; }

  /* ---- FAB (open) ---- */
  .lg-fab-open{
    position: fixed;
    right: calc(16px + var(--inset-r));
    /* Vertically centered on the right */
    top: 50%;
    margin-top: -24px; /* half of 48px (button height) */
    z-index: 2147483645;

    display: grid; place-items: center;
    width: 48px; height: 48px; border-radius: 999px;

    border: 1px solid var(--border);
    background-color: var(--bg);
    color: var(--fg);

    box-shadow: 0 10px 30px var(--shadow);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));

    cursor: pointer; user-select: none;
    transition: opacity .2s, transform .05s,
                background-color .28s ease, color .28s ease, border-color .28s ease;
  }
  .lg-fab-open:hover{ border-color: color-mix(in oklab, var(--accent) 40%, var(--border)); }
  .lg-fab-open:active{ transform: translateY(1px); }
  .lg-fab-open .lg-fab-ico{ font: 18px/1 ui-monospace,SFMono-Regular,Menlo,Consolas; }

  /* ---- Key-value grid + basic inputs (primitives) ---- */
  .kv > * { min-width:0; }
  .kv{
    display:grid; grid-template-columns:minmax(110px,160px) 1fr;
    gap:10px 14px; align-items:center;
  }

  .lg-input-wrap{ display:flex; align-items:center; gap:10px; width:100%; }
  .lg-input-label{ min-width:160px; opacity:.85; font-weight:600; }
  .input{
    all:unset; display:inline-flex; align-items:center; width:100%;
    border:1px solid var(--border); border-radius:12px; padding:10px 12px; box-sizing:border-box;
    background-color:color-mix(in oklab, var(--soft) 80%, transparent);
    color:var(--fg); font-size:13px; min-height:36px; line-height:1.2;
    transition:background-color .28s ease, border-color .28s ease, color .28s ease;
  }
  .input:focus{ outline:2px solid color-mix(in oklab, var(--accent) 45%, transparent); }
  .input:disabled{ opacity:.6; cursor:not-allowed; }

  /* Labels (primitive) */
  .lg-label-wrap{ display:flex; flex-direction:column; gap:6px; min-width:0; }
  .lg-label{
    display:flex; align-items:center; gap:8px;
    color:var(--fg); font-weight:600; line-height:1.2; white-space:nowrap;
  }
  .lg-label-ico{ opacity:.9; font-size:1em; line-height:1; }
  .lg-label-text{ overflow:hidden; text-overflow:ellipsis; }

  /* Settings color picker layout */
  .settings-theme-grid{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap:16px;
  }
  @media (max-width: 640px){
    .settings-theme-grid{
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap:12px;
    }
  }
  }
  .settings-theme-row{
    margin-bottom:16px;
  }
  .settings-color-row{
    display:flex;
    flex-direction:column;
    width:100%;
  }
  .settings-color-block{
    display:flex;
    flex-direction:column;
    gap:8px;
    align-items:stretch;
    width:100%;
  }

  .shop-range-summary{
    font-weight:600;
    font-size:13px;
    color:var(--text);
    font-variant-numeric:tabular-nums;
    text-align:center;
    width:100%;
    margin-bottom:8px;
  }

  /* Minor responsive UX for KV/inputs */
  @media (max-width: 480px){
    .kv{ grid-template-columns: 1fr; }
    /* Exception: some rows must remain two columns on mobile */
  .kv.kv--inline-mobile{ grid-template-columns: minmax(110px,160px) 1fr; align-items:center; }
  .lg-input-wrap{ flex-direction:column; align-items:stretch; gap:6px; }
  .lg-input-label{ min-width:0; }

  /* Shop (mobile): keep the picker on the left and the range on the right with a small gap */
    .shop-picker-row{ flex-direction: row !important; align-items: center !important; gap: 6px !important; }
    .shop-range{ display:flex !important; flex-direction: row !important; align-items: center !important; justify-content: flex-start !important; gap: 6px !important; flex: 0 0 auto !important; white-space: nowrap; }
    .settings-theme-grid{
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap:8px;
    }
  }
}
`;var _t=`
/* Optional wrapper for labels + field */
.lg-input-wrap{
  display:flex;
  align-items:center;
  gap:10px;
  width:100%;
  min-width:0; /* autorise le shrink */
}

/* Label on the left (uses a token for min width) */
.lg-input-label{
  min-width: var(--input-label-minw, 160px);
  opacity:.85;
  font-weight:600;
  color: var(--fg);
  white-space: nowrap;
}

/* Champ */
.input{
  all:unset;
  display:inline-flex;
  align-items:center;
  width:100%;
  min-width:0;

  box-sizing:border-box;
  padding: var(--input-py, 10px) var(--input-px, 12px);
  min-height: var(--input-minh, 36px);
  line-height:1.2;
  font-size: var(--input-fs, 13px);

  border:1px solid var(--border);
  border-radius: var(--input-radius, 12px);

  background-color: color-mix(in oklab, var(--soft) 80%, transparent);
  color: var(--fg);

  transition:
    background-color .28s ease,
    border-color .28s ease,
    color .28s ease,
    box-shadow .2s ease;
  -webkit-tap-highlight-color: transparent;
}

/* Placeholder lisible sans hurler */
.input::placeholder{
  color: color-mix(in oklab, var(--fg) 70%, #9ca3af);
  opacity:.9;
}

/* Focus accessible */
.input:focus,
.input:focus-visible{
  outline: 2px solid color-mix(in oklab, var(--accent) 45%, transparent);
  outline-offset: 0; /* le contour remplace la box-shadow */
}

/* Disabled */
.input:disabled,
.input[disabled]{
  opacity:.6;
  cursor:not-allowed;
}

/* Tailles */
.input--sm{
  --input-py: 8px;
  --input-px: 10px;
  --input-minh: 32px;
  --input-radius: 10px;
  --input-fs: 12px;
}

.input--lg{
  --input-py: 12px;
  --input-px: 14px;
  --input-minh: 44px;
  --input-radius: 14px;
  --input-fs: 14px;
}

/* Pleine largeur utilitaire */
.input--full{ width:100%; }

/* Automatic label shrinking on small screens */
@media (max-width: 720px){
  .lg-input-label{ min-width: var(--input-label-minw-sm, 120px); }
}

/* Vertical stack for very small screens (when used with .kv elsewhere) */
@media (max-width: 480px){
  .lg-input-wrap{
    flex-direction:column;
    align-items:stretch;
    gap:6px;
  }
  .lg-input-label{
    min-width:0;
  }
}
`;var zt=`
.lg-label-wrap{
  display:flex;
  flex-direction:column;
  gap:6px;
  min-width:0;
}

/* Ligne principale du label */
.lg-label{
  display:flex;
  align-items:center;
  gap:8px;
  color: var(--fg);
  font-weight:600;
  line-height:1.2;
  white-space:nowrap;
  transition: color .28s ease, opacity .2s ease;
}

/* Optional icon on the left */
.lg-label-ico{
  opacity:.9;
  font-size:1em;
  line-height:1;
}

/* Label text, neatly truncated */
.lg-label-text{
  overflow:hidden;
  text-overflow:ellipsis;
}

/* Required asterisk */
.lg-label-req{
  color: color-mix(in oklab, #ef4444 70%, var(--fg));
  font-weight:700;
}

/* Suffix slot on the right (badge, help, actions) */
.lg-label-suffix{
  margin-left:auto;
  display:inline-flex;
  align-items:center;
  gap:6px;
}

/* Hint sous le label */
.lg-label-hint{
  font-size:12px;
  opacity:.8;
  color: color-mix(in oklab, var(--fg) 80%, #9ca3af);
  line-height:1.25;
  white-space:normal;
}

/* Tones (couleurs de texte) */
.lg-label--default .lg-label{ color: var(--fg); }
.lg-label--muted   .lg-label{ color: color-mix(in oklab, var(--fg) 72%, #9ca3af); }
.lg-label--info    .lg-label{ color: color-mix(in oklab, #38bdf8 72%, var(--fg)); }
.lg-label--success .lg-label{ color: color-mix(in oklab, #22c55e 72%, var(--fg)); }
.lg-label--warning .lg-label{ color: color-mix(in oklab, #f59e0b 80%, var(--fg)); }
.lg-label--danger  .lg-label{ color: color-mix(in oklab, #ef4444 80%, var(--fg)); }

/* Disabled (sur un conteneur parent) */
.is-disabled .lg-label{ opacity:.6; cursor:not-allowed; }

/* Tailles */
.lg-label--sm .lg-label{ font-size:12px; }
.lg-label--md .lg-label{ font-size:13px; }
.lg-label--lg .lg-label{ font-size:14px; }

/* \u201CStacked\u201D variant (forces title no-wrap) */
.lg-label--stacked .lg-label{ white-space:nowrap; }

/* Variant: title (plus gros, comme un titre compact) */
.lg-label--title .lg-label{
  font-size:16px;
  font-weight:700;
  line-height:1.25;
}

/* Small screens: give the suffix some room if needed */
@media (max-width: 480px){
  .lg-label{ gap:6px; }
  .lg-label-suffix{ gap:4px; }
}
`;var Ft=`
/* Bar container (provided by the HUD, also useful when NavTabs is standalone) */
.lg-tabbar{
  position: relative;
  height: var(--tab-h);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto; /* tabs that stretch + action slot on the right */
  align-items: center;
  gap: 20px;
  padding: 12px 12px;
  background-color: color-mix(in oklab, var(--bg) 92%, transparent);
  transition: background-color .28s ease, border-color .28s ease;
}

/* Ribbon containing the tabs */
.lg-tabs{
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;

  min-width: 0;       /* allow shrink */
  width: 100%;
  max-width: none;

  background-color: var(--tab-bg);
  color: var(--tab-fg);
  border-radius: 999px;
  padding: 6px;

  box-shadow: 0 4px 12px color-mix(in oklab, var(--shadow) 32%, transparent);

  overflow: auto hidden;   /* horizontal scroll if too many tabs */
  scrollbar-width: none;
  transition: background-color .28s ease, color .28s ease;
}
.lg-tabs::-webkit-scrollbar{ display:none; }

/* Tab button */
.lg-tab{
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  background: transparent;
  border: none;
  color: inherit;
  opacity: .85;

  white-space: nowrap;
  transition: opacity .15s, transform .05s;
}
.lg-tab:hover{ opacity: 1; }
.lg-tab:active{ transform: translateY(1px); }

/* Animated pill behind the active tab (managed in JS) */
.lg-pill{
  position: absolute;
  z-index: 0;
  top: 6px;
  left: 0;
  height: calc(100% - 12px);
  width: 0;
  border-radius: 999px;

  background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
  box-shadow: 0 8px 22px rgba(0,0,0,.18);

  transition: transform .25s cubic-bezier(.2,.8,.2,1), width .25s cubic-bezier(.2,.8,.2,1);
  will-change: transform, width;
}

/* Density and responsive */
@media (max-width: 720px){
  .lg-tabbar{
    padding: 8px max(8px, var(--inset-l)) 8px max(8px, var(--inset-r));
    gap: 12px;
  }
  .lg-tabs{ padding: 5px; }
  .lg-tab{ padding: 9px 14px; font-size: 13.5px; }
  .lg-pill{ top: 5px; height: calc(100% - 10px); }
}

@media (max-width: 480px){
  .lg-tabbar{
    padding: 12px max(10px, var(--inset-l)) 12px max(10px, var(--inset-r));
    gap: 12px;
  }
  .lg-tabs{
    border-radius: 14px;
    padding: 4px;
  }
  .lg-tab{
    padding: 8px 12px;
    font-size: 13px;
  }
  .lg-pill{
    top: 4px;
    height: calc(100% - 8px);
  }
}

@media (max-width: 360px){
  .lg-tab{ padding: 6px 10px; font-size: 12px; }
}
`;var Gt=`
/* ==================== SearchBar ==================== */
.search{
  display:flex;
  align-items:stretch;
  gap:8px;
  width:100%;
}

.search-field{
  position:relative;
  flex:1 1 auto;
  display:flex;
  align-items:center;
  min-width:0;
}

/* Inherits global .input styles for visual consistency */
.search-input{
  all:unset;
  display:inline-flex;
  align-items:center;
  width:100%;
  border:1px solid var(--border);
  border-radius:12px;
  padding:10px 12px;
  box-sizing:border-box;
  background-color: color-mix(in oklab, var(--soft) 80%, transparent);
  color: var(--fg);
  font-size:13px;
  min-height:40px;
  line-height:1.2;
  transition: background-color .28s ease, border-color .28s ease, color .28s ease;

  /* Space for left icon + actions on the right */
  padding-left:36px;
  padding-right:82px;
}

.search-input:focus{
  outline:2px solid color-mix(in oklab, var(--accent) 45%, transparent);
}

/* Sizes */
.search--sm .search-input{ min-height:36px; font-size:12.5px; }
.search--lg .search-input{ min-height:44px; font-size:14px; }

/* Icons */
.search-ico{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  color: color-mix(in oklab, var(--fg) 82%, #9ca3af);
  opacity:.95;
  pointer-events:none;
  user-select:none;
  font: 12px/1 ui-monospace, SFMono-Regular, Menlo, Consolas;
}

.search-ico--left{ left: 10px; }
.search-ico--right{ right: 46px; }

.search--sm .search-ico,
.search--sm .search-clear,
.search--sm .search-spinner{ transform: translateY(-50%) scale(.95); }

.search--lg .search-ico,
.search--lg .search-clear,
.search--lg .search-spinner{ transform: translateY(-50%) scale(1.05); }

/* Spinner on the right */
.search-spinner{
  position:absolute;
  top:50%;
  right:24px;
  transform:translateY(-50%);
  opacity:.9;
}
.search.is-loading .search-ico--right{ opacity:.35; }

/* Clear button */
.search-clear{
  position:absolute;
  top:50%;
  right:6px;
  transform:translateY(-50%);
  width:28px;
  height:28px;
  border-radius:999px;
  display:inline-grid;
  place-items:center;

  border:1px solid color-mix(in oklab, var(--border) 70%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in oklab, var(--soft) 85%, transparent) 0%,
    color-mix(in oklab, var(--soft) 62%, transparent) 100%
  );
  color: color-mix(in oklab, var(--fg) 86%, #a3a3a3);

  font: 14px/1 var(--font-ui);
  cursor:pointer;
  box-shadow:0 6px 16px color-mix(in oklab, var(--shadow) 35%, transparent);
  transition: border-color .2s ease, background .2s ease, transform .05s, color .2s ease;
}
.search-clear:hover{
  border-color: color-mix(in oklab, var(--accent) 40%, var(--border));
  color: var(--fg);
}
.search-clear:active{ transform: translateY(-50%) scale(.98); }

/* Slot bouton submit (optionnel) */
.search-submit{ flex: 0 0 auto; }

/* Disabled */
.search.disabled .search-input{ opacity:.6; cursor:not-allowed; }
.search.disabled .search-clear{ opacity:.6; pointer-events:none; }

/* KV grid integration */
.kv .search{ width:100%; }
.kv.kv-tight{ grid-template-columns: minmax(110px,160px) 1fr; }
.kv.kv-tight .lg-label-wrap{ margin-right:0; }
.kv.kv-tight .search-field .search-input{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.kv.kv-tight .lg-label-wrap .lg-label{
  border:1px solid var(--border);
  border-right:none;
  padding:10px 12px;
  border-top-left-radius:12px;
  border-bottom-left-radius:12px;
  background: color-mix(in oklab, var(--soft) 82%, transparent);
}

/* Final responsive tweak */
@media (max-width: 480px){
  .search-input{ min-height:44px; }
}
`;var Vt=`
/* ==================== Select ==================== */
.select{
  position:relative;
  display:inline-block;
  min-width:180px;
}

.select.sm { min-width: 160px; }
.select.md { min-width: 180px; } /* default value */
.select.lg { min-width: 220px; }

.select.shrink { min-width: 0; }

.select.disabled{
  opacity:.6;
  pointer-events:none;
}

/* Trigger */
.select-trigger{
  appearance:none;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;

  width:100%;
  padding:10px 12px;
  min-height:40px;
  line-height:1;

  border-radius:12px;
  border:1px solid color-mix(in oklab, var(--border) 70%, transparent);
  background:linear-gradient(
    180deg,
    color-mix(in oklab, var(--soft) 85%, transparent) 0%,
    color-mix(in oklab, var(--soft) 60%, transparent) 100%
  );
  color:var(--fg);
  font-size:13px;
  font-weight:550;
  letter-spacing:.2px;

  cursor:pointer;
  transition:transform .05s, box-shadow .2s, background .2s,
             border-color .28s ease, color .28s ease;
  box-shadow:0 6px 18px color-mix(in oklab, var(--shadow) 35%, transparent);
}
.select-trigger:hover{
  border-color:color-mix(in oklab, var(--accent) 40%, var(--border));
}
.select-trigger:active{
  transform:translateY(1px);
}
.select-caret{
  opacity:.8;
  font:12px/1 ui-monospace,SFMono-Regular,Menlo,Consolas;
}

/* Sizes */
.select--sm .select-trigger{
  padding:6px 10px;
  min-height:36px;
  border-radius:10px;
  font-size:12px;
}
.select--lg .select-trigger{
  padding:12px 14px;
  min-height:44px;
  font-size:14px;
}

/* Menu */
.select-menu{
  position:absolute;
  left:0;
  top:calc(100% + 6px);
  z-index:20;

  display:none;
  max-height:240px;
  overflow:auto;

  padding:6px;
  border-radius:12px;
  border:1px solid var(--border);
  background-color:color-mix(in oklab, var(--bg) 88%, transparent);
  box-shadow:0 10px 24px color-mix(in oklab, var(--shadow) 40%, transparent);
  backdrop-filter:blur(var(--glass-blur));
  -webkit-backdrop-filter:blur(var(--glass-blur));

  transition:background-color .28s ease, border-color .28s ease,
             color .28s ease, box-shadow .28s ease;
}
.select.open .select-menu{ display:block; }

/* Options */
.select-option{
  width:100%;
  text-align:left;

  padding:8px 10px;
  border-radius:10px;
  border:1px solid transparent;

  background:transparent;
  color:var(--fg);
  font-size:13px;
  font-weight:550;
  line-height:1.15;

  cursor:pointer;
  transition:background-color .15s, border-color .15s, color .15s;
}
.select-option:hover,
.select-option.active{
  background:color-mix(in oklab, var(--soft) 85%, transparent);
  border-color:color-mix(in oklab, var(--border) 60%, transparent);
}
.select-option.selected{
  background:color-mix(in oklab, var(--accent) 22%, transparent);
  border-color:color-mix(in oklab, var(--accent) 50%, var(--border));
}
.select-option.disabled{
  opacity:.5;
  cursor:not-allowed;
}

/* KV integration */
.kv .select{ width:100%; }

/* Mobile tweaks */
@media (max-width: 480px){
  .select{ min-width:0; width:100%; }
  .select-menu{
    left:0;
    right:0;
    min-width:100%;
    max-height:min(50dvh, 360px);
  }
}
`;var jt=`
/* ==================== Switch ==================== */

.lg-switch-wrap{
  display:inline-flex;
  align-items:center;
  gap:10px;
}

/* Track */
.lg-switch{
  --sw-w: 44px;
  --sw-h: 24px;
  --sw-gap: 2px;

  --sw-border: var(--border);
  --sw-off: color-mix(in oklab, var(--soft) 82%, transparent);
  --sw-on:  color-mix(in oklab, var(--accent) 38%, transparent);
  --thumb: #fff;

  position:relative;
  width: var(--sw-w);
  height: var(--sw-h);
  border-radius: 999px;
  border:1px solid var(--sw-border);
  background: var(--sw-off);
  cursor:pointer;
  transition: background .18s ease, border-color .18s ease, box-shadow .18s ease;
  box-shadow: 0 4px 14px color-mix(in oklab, var(--shadow) 30%, transparent);
}

/* On state */
.lg-switch.on{
  background: var(--sw-on);
  border-color: color-mix(in oklab, var(--accent) 55%, var(--border));
}

/* Thumb */
.lg-switch-thumb{
  position:absolute;
  top:50%;
  left: var(--sw-gap);
  width: calc(var(--sw-h) - 2*var(--sw-gap));
  height: calc(var(--sw-h) - 2*var(--sw-gap));
  border-radius: 999px;
  background: var(--thumb);
  transform: translate(0, -50%);
  transition: left .18s ease, background .18s ease, box-shadow .18s ease;
  box-shadow: 0 2px 8px color-mix(in oklab, var(--shadow) 40%, transparent);
}

.lg-switch.on .lg-switch-thumb{
  left: calc(100% - var(--sw-gap) - (var(--sw-h) - 2*var(--sw-gap)));
}

/* Sizes */
.lg-switch--sm{
  --sw-w: 36px;
  --sw-h: 20px;
  --sw-gap: 2px;
}
.lg-switch--md{
  --sw-w: 44px;
  --sw-h: 24px;
  --sw-gap: 2px;
}
.lg-switch--lg{
  --sw-w: 56px;
  --sw-h: 30px;
  --sw-gap: 3px;
}

/* Disabled (if you manage a state) */
.lg-switch[aria-disabled="true"],
.lg-switch.disabled{
  opacity:.6;
  cursor:not-allowed;
  filter:saturate(92%);
}
`;var $t=`
/* ==================== Table ==================== */

.lg-table-wrap{
  border:1px solid var(--border);
  border-radius:16px;
  background: color-mix(in oklab, var(--bg) 88%, transparent);
  box-shadow:0 10px 24px color-mix(in oklab, var(--shadow) 40%, transparent);
  overflow:hidden;
  display:grid;
}

/* Structure principale: header / body scrollable / footer */
.lg-table{
  display:grid;
  grid-template-rows:auto 1fr auto;
  min-width:0;
  min-height:0; /* autorise le scroll interne */
}

/* Head & Body strictly share the same column grid */
.lg-thead,
.lg-tbody{
  display:grid;
  grid-template-columns: var(--lg-cols);
  min-width:0;
}

/* Sticky header optionnel (activer via .lg-table-wrap.sticky) */
.lg-table-wrap.sticky .lg-thead{
  position:sticky;
  top:0;
  z-index:1;
  background: color-mix(in oklab, var(--bg) 92%, transparent);
}

/* Les <tr> ne doivent pas casser la grille */
.lg-tr{ display:contents; }

/* Cellules (header + body) */
.lg-th, .lg-td{
  min-width:0;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  padding:10px 12px;
  display:flex;
  align-items:center;
  align-self:stretch;
  box-sizing:border-box;
  gap:8px;
  min-height: var(--lg-row-min-h, 36px);
  text-align: var(--col-align, left);
  border-bottom:1px solid color-mix(in oklab, var(--border) 80%, transparent);
}

/* Header: reset + chevrons de tri */
.lg-th{
  appearance:none;
  border:0;
  background: color-mix(in oklab, var(--bg) 92%, transparent);
  font: inherit;
  font-weight:700;
  color:var(--fg);
  position:relative;
  padding-right:22px; /* space for the sort icon */
  cursor:default;
  border-bottom:1px solid var(--border);
}
.lg-th:focus{ outline:none; }
.lg-th::-moz-focus-inner{ border:0; padding:0; }
.lg-th.sortable{ cursor:pointer; }

/* Sort icons (CSS triangles) */
.lg-th::after{
  content:"";
  position:absolute;
  right:8px;
  top:50%;
  transform:translateY(-50%);
  opacity:0;
  border:5px solid transparent;
  transition:opacity .15s, transform .15s;
}
.lg-th[data-sort="asc"]::after{
  opacity:.95;
  border-bottom-color: currentColor;
  transform:translateY(-40%);
}
.lg-th[data-sort="desc"]::after{
  opacity:.95;
  border-top-color: currentColor;
  transform:translateY(-60%);
}

/* Body: scroll interne fiable */
.lg-tbody{
  grid-auto-rows: var(--lg-row-h, 44px);
  max-height: var(--tbl-max-h, auto);
  overflow:auto;
  overflow-y:auto;
  overflow-x:hidden;
  scrollbar-gutter:stable;
  min-height:0; /* key so scrolling does not jump */
}

/* Hover & clickable rows */
.lg-tr-body.clickable{ cursor:pointer; }
.lg-tr-body:hover .lg-td{
  background: color-mix(in oklab, var(--soft) 85%, transparent);
}

/* Zebra */
.lg-table-wrap.zebra .lg-tbody .lg-tr-body:nth-child(even) .lg-td{
  background: color-mix(in oklab, var(--soft) 80%, transparent);
}

/* Mode compact */
.lg-table-wrap.compact .lg-td,
.lg-table-wrap.compact .lg-th{
  padding:8px 10px;
}

/* Selection column (checkbox) */
.lg-table-wrap.selectable .lg-th-check,
.lg-table-wrap.selectable .lg-td-check{
  width: var(--check-w, 36px);
  min-width: var(--check-w, 36px);
  display:flex;
  justify-content:center;
  align-items:center;
  grid-column:1;
}

/* Normalisation du contenu interne des cellules */
.lg-th > *, .lg-td > *{ margin:0; }
.lg-td input, .lg-td button, .lg-td select{ margin:0; line-height:1; }
.lg-td .select-trigger, .lg-td .switch{ align-self:center; line-height:1; }

/* Footer (pager) */
.lg-tfoot{
  padding:8px 10px;
  border-top:1px solid var(--border);
  background: color-mix(in oklab, var(--bg) 92%, transparent);
}
.lg-pager{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
}
.lg-pager .btn{ padding:6px 10px; border-radius:10px; font-size:12px; }
.lg-pager-info{ opacity:.9; font-weight:600; }

/* Responsive arrondis et paddings plus doux */
@media (max-width:520px){
  .lg-table-wrap{ border-radius:12px; }
  .lg-td, .lg-th{ padding:8px 10px; }
  .lg-pager .btn{ padding:5px 8px; }
}

/* Animatable rows (when you insert/delete) */
.lg-tr-body.is-animating .lg-td {
  will-change: transform, opacity;
  transition: transform .18s ease, opacity .18s ease;
}
@media (prefers-reduced-motion: reduce) {
  .lg-tr-body.is-animating .lg-td { transition: none !important; }
}
`;var Ut=`
/* ==================== TimeRangePicker ==================== */

.time-range{
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  color: var(--fg);
  width: 100%;
}

/* Inline variant: do not stretch to full width */

.time-range.time-range--inline{
  display: grid;
  width: 100%;             /* always occupy the available width */
  justify-items: stretch;  /* stretch inner elements */
  align-items: start;
}

/* Inline wrapper for picker + summary (composed variant) */
.trp-inline{ display:flex; align-items:center; gap:10px; width:100%; }
.trp-inline > .time-range{ flex:1 1 auto; min-width:0; }
.trp-summary{ display:flex; flex-direction:column; align-items:center; gap:6px; flex:0 0 auto; }
.trp-clock{ display:flex; align-items:center; justify-content:center; width:72px; min-width:72px; aspect-ratio:1; color:var(--accent); }
.trp-clock-svg{ width:100%; height:auto; display:block; }
.trp-clock-face{ fill: color-mix(in oklab, var(--soft) 80%, transparent); stroke: color-mix(in oklab, var(--border) 90%, transparent); stroke-width: 1.5; }
.trp-clock-ticks{ pointer-events:none; }
.trp-clock-tick{ stroke: color-mix(in oklab, var(--fg) 35%, transparent); stroke-width: 1.3; stroke-linecap:round; opacity:.65; }
.trp-clock-tick--major{ stroke-width: 1.8; opacity:.8; }
.trp-clock-arcs{ pointer-events:none; }
.trp-clock-arc{
  fill:none;
  stroke: color-mix(in oklab, var(--accent) 85%, white 15%);
  stroke-width:6;
  stroke-linecap:round;
  opacity:.62;
  mix-blend-mode:multiply;
  transition: stroke .28s ease, opacity .28s ease;
}
.trp-clock-arc[data-pass="1"]{
  opacity:.82;
  stroke: color-mix(in oklab, var(--accent) 70%, black 30%);
}
.trp-clock-arc[data-pass="2"]{
  opacity:.94;
  stroke: color-mix(in oklab, var(--accent) 55%, black 45%);
}
.trp-clock-arc[data-pass="3"]{
  opacity:1;
  stroke: color-mix(in oklab, var(--accent) 40%, black 60%);
}
.trp-clock-arc--full{ stroke-linecap:butt; }
.trp-clock-center{ fill: color-mix(in oklab, var(--fg) 70%, transparent); }
.trp-clock-duration{ font-weight:600; font-size:13px; letter-spacing:.01em; color: color-mix(in oklab, var(--fg) 92%, transparent); }
.trp-clock-pointers{ pointer-events:none; }
.trp-clock-pointer{ transform-origin:50px 50px; transition: transform .25s ease; }
.trp-clock-pointer-line{
  stroke: currentColor;
  stroke-width: 2.8;
  stroke-linecap: round;
  opacity:.88;
}
.trp-clock-pointer-tip{
  fill: currentColor;
  stroke: color-mix(in oklab, currentColor 75%, black 25%);
  stroke-width: .6;
  opacity:.96;
}
.trp-clock-pointer--start{ color: color-mix(in oklab, var(--accent) 70%, white 30%); }
.trp-clock-pointer--end{ color: color-mix(in oklab, var(--fg) 75%, var(--accent) 25%); }
@media (hover: hover) and (pointer: fine){
  .trp-clock-arc{
    stroke: color-mix(in oklab, var(--accent) 88%, white 12%);
    opacity:.7;
  }
  .trp-clock-arc[data-pass="1"]{
    stroke: color-mix(in oklab, var(--accent) 68%, black 32%);
    opacity:.88;
  }
  .trp-clock-arc[data-pass="2"]{
    stroke: color-mix(in oklab, var(--accent) 50%, black 50%);
    opacity:1;
  }
  .trp-clock-arc[data-pass="3"]{
    stroke: color-mix(in oklab, var(--accent) 35%, black 65%);
  }
  .trp-clock-pointer--start{ color: color-mix(in oklab, var(--accent) 65%, white 35%); }
  .trp-clock-pointer--end{ color: color-mix(in oklab, var(--fg) 82%, var(--accent) 18%); }
}
@media (hover: none) and (pointer: coarse){
  .trp-clock-arc{
    stroke: color-mix(in oklab, var(--accent) 82%, white 18%);
    opacity:.78;
    mix-blend-mode:normal;
  }
  .trp-clock-arc[data-pass="1"]{
    stroke: color-mix(in oklab, var(--accent) 60%, black 40%);
    opacity:.95;
  }
  .trp-clock-arc[data-pass="2"]{
    stroke: color-mix(in oklab, var(--accent) 45%, black 55%);
    opacity:1;
  }
  .trp-clock-arc[data-pass="3"]{
    stroke: color-mix(in oklab, var(--accent) 30%, black 70%);
  }
  .trp-clock-pointer--start{ color: color-mix(in oklab, var(--accent) 68%, white 32%); }
  .trp-clock-pointer--end{ color: color-mix(in oklab, var(--fg) 80%, var(--accent) 20%); }
}
@media (max-width: 480px){
  .trp-inline{ gap:12px; }
  .trp-summary{
    flex:0 0 auto;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    gap:6px;
  }
  .trp-clock{ width:60px; min-width:60px; }
  .trp-clock-duration{ font-size:12px; }
}
.time-range.time-range--inline .time-range-field{ width: 100%; }
.time-range.time-range--inline .time-picker{ width: 100%; }
.time-range.time-range--inline .time-range-input{ width: 100%; }
.time-range.time-range--inline .time-range-field .time-picker,
.time-range.time-range--inline .time-range-field .time-range-input{
  flex: 1 1 auto;
}
.time-range.time-range--inline .time-picker .select-trigger{
  width: 100%;
  inline-size: 100%;
}

/* Row: label on the left, control on the right */
.time-range-field{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
}

/* Label on the left, stable width for alignment */
.time-range-label{
  min-width: var(--trp-label-w, 35px);
  width: var(--trp-label-w, 35px);
  text-align: right;
  white-space: nowrap;
  font-weight: 600;
  opacity: .9;
}

/* The control takes all remaining space */
.time-range-field .time-picker,
.time-range-field .time-range-input{
  flex: 1 1 auto;
  min-width: 0; /* avoid overflows in grids/flex */
}

/* ---------- Custom picker (HH, MM, AM/PM) ---------- */

.time-picker{
  display: inline-flex;
  align-items: center;
  gap: 16px; /* visual space for ":" */
  width: 100%;
}

/* Inner selects remain fluid */
.time-picker .select{
  min-width: 0;
  flex: 1 1 0;
  width: auto;
}
.time-picker .select-trigger{
  width: 100%;
  inline-size: 100%;
  border-color: var(--border);
  background: linear-gradient(
    180deg,
    color-mix(in oklab, var(--soft) 85%, transparent) 0%,
    color-mix(in oklab, var(--soft) 60%, transparent) 100%
  );
  color: var(--fg);
}
.time-picker .select.open .select-menu{
  min-width: auto;
  background-color: color-mix(in oklab, var(--bg) 88%, transparent);
  border: 1px solid var(--border);
}

/* Compact variant */
.time-picker-compact .select-trigger{
  padding: 4px 8px;
  min-height: 32px;
}
.time-picker-compact .select-value{
  min-width: calc(var(--min-ch, 2) * 1ch);
  text-align: center;
}

/* HH and MM stretch, AM/PM stays compact */
.time-picker .select:nth-child(1),
.time-picker .select:nth-child(2){
  flex: 1 1 0;
}
.time-picker .select:last-child{
  flex: 0 0 auto;
}

/* ":" separator between HH and MM */
.time-picker > .select:first-child{ position: relative; }
.time-picker > .select:first-child::after{
  content: ":";
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  opacity: .9;
  pointer-events: none;
}

/* ---------- Natif <input type="time"> ---------- */

.time-range-input{
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  background-color: color-mix(in oklab, var(--soft) 80%, transparent);
  color: var(--fg);
  font-size: 13px;
  min-height: 36px;
  line-height: 1.2;
  transition: background-color .28s ease, border-color .28s ease, color .28s ease;
}
.time-range-input:focus{
  outline: 2px solid color-mix(in oklab, var(--accent) 45%, transparent);
}

/* Disabled */
.time-range.is-disabled,
.time-picker .is-disabled{
  opacity: .6;
  pointer-events: none;
}

/* Integration in .kv: fluid control */
.kv .time-range .time-picker,
.kv .time-range .time-range-input{
  flex: 1 1 auto;
  min-width: 0;
}

/* ---------- Responsive ---------- */
@media (max-width: 420px){
  /* Mobile: keep the label on the left (not above) */
  .time-range-field{
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .time-range-label{
    /* shrink the label and align it left */
    --trp-label-w: 64px;
    width: var(--trp-label-w);
    min-width: var(--trp-label-w);
    text-align: left;
  }
}
`;var qt=`
.lg-tip{
  position: fixed; /* positioned via JS (viewport rect) */
  z-index: 2147483647; /* above the HUD */
  max-width: 320px;
  padding: 8px 10px;
  border-radius: 10px;

  background-color: color-mix(in oklab, var(--bg) 96%, transparent);
  color: var(--fg);
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px color-mix(in oklab, var(--shadow) 45%, transparent);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));

  font: 12.5px/1.25 var(--font-ui);
  pointer-events: none; /* non-interactive by default */
  opacity: 0;
  transform: translateY(2px);
  transition: opacity .16s ease, transform .16s ease,
              background-color .28s ease, color .28s ease, border-color .28s ease;
}

.lg-tip.is-open{ opacity: 1; transform: translateY(0); }

/* Arrow (small rotated square) */
.lg-tip::after{
  content: "";
  position: absolute;
  width: 9px; height: 9px;
  background: inherit;
  border: inherit;
  border-left: none; border-top: none;
  transform: rotate(45deg);
  box-shadow: 3px 3px 12px color-mix(in oklab, var(--shadow) 35%, transparent);
}

/* Placements (also handled in TS for coords) */
.lg-tip.is-top::after{
  bottom: -5px; left: 16px;
}
.lg-tip.is-bottom::after{
  top: -5px; left: 16px;
}
.lg-tip.is-left::after{
  right: -5px; top: 12px;
}
.lg-tip.is-right::after{
  left: -5px; top: 12px;
}

/* Accented variant (optional) */
.lg-tip--accent{
  border-color: color-mix(in oklab, var(--accent) 55%, var(--border));
}

@media (max-width: 480px){
  .lg-tip{ max-width: min(86vw, 320px); }
}
`;var Kt=`
.slider{ display:flex; flex-direction:column; gap:8px; width:100%; }
.slider-row{ display:flex; align-items:center; gap:10px; width:100%; }

/* Passive track */
.slider-track{
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--soft) 80%, transparent);
  border: 1px solid var(--border);
  box-shadow: inset 0 1px 2px color-mix(in oklab, var(--shadow) 30%, transparent);
  overflow: visible;          /* no thumb clipping */
  pointer-events: none;       /* never events on the track */
  z-index: 0;
}

/* Fill (passive) */
.slider-range{
  position: absolute; left: 0; top: 0; height: 100%;
  background: linear-gradient(90deg, var(--pill-from), var(--pill-to));
  pointer-events: none;
  z-index: 0;
  will-change: left, width;
}

/* Input range: only interactive element */
.slider input[type="range"]{
  -webkit-appearance: none; appearance: none;
  width: 100%;
  height: 16px;
  background: transparent; outline: none; margin: 0; padding: 0;
  cursor: pointer;
  position: absolute;
  left: 0; right: 0; top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
  z-index: 2;                  /* above track/fill */
  touch-action: none;          /* avoid scrolling during drag */
}

/* If handles are visually close, keep a bring-to-front */
.slider input[type="range"].is-active,
.slider:focus-within input[type="range"]:focus{
  z-index: 4;
}

/* WebKit thumb */
.slider input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance: none;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--fg);
  box-shadow: 0 1px 3px color-mix(in oklab, var(--shadow) 40%, transparent);
  border: 2px solid var(--bg);
  margin-top: -6px;            /* center vs track (18 vs 6) */
  position: relative;
  z-index: 3;
  cursor: pointer;
}

/* Visual WebKit track (transparent) */
.slider input[type="range"]::-webkit-slider-runnable-track{
  height: 6px; background: transparent;
}

/* Firefox */
.slider input[type="range"]::-moz-range-thumb{
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--fg);
  box-shadow: 0 1px 3px color-mix(in oklab, var(--shadow) 40%, transparent);
  border: 2px solid var(--bg);
  margin-top: -6px;
  position: relative;
  z-index: 3;
  cursor: pointer;
}
.slider input[type="range"]::-moz-range-track{
  height: 6px; background: transparent;
}

/* Labels/values */
.slider-label{ font-weight: 600; font-size: 13px; color: var(--text); }
.slider-value{ font-variant-numeric: tabular-nums; font-size: 14px; color: var(--text-dim); }
.slider-value-range{ display:flex; align-items:center; gap:6px; white-space:nowrap; }

.slider--range{ position:relative; }
.slider--range .slider-range{ pointer-events:none; }
.slider--range input[type="range"]{
  pointer-events:none;
}
.slider--range input[type="range"]::-webkit-slider-thumb{
  pointer-events:all;
}
.slider--range input[type="range"]::-moz-range-thumb{
  pointer-events:all;
}
.slider--range input[type="range"][data-handle="min"]{ z-index:3; }
.slider--range input[type="range"][data-handle="max"]{ z-index:4; }
.slider--range.is-disabled{ opacity:.55; }

@media (max-width: 480px){
  .slider{ gap:6px; }
  .slider-label{ font-size:12px; }
  .slider-value{ font-size:13px; }
  .slider input[type="range"]::-webkit-slider-thumb{ width:14px; height:14px; margin-top:-4px; }
  .slider input[type="range"]::-moz-range-thumb{ width:14px; height:14px; margin-top:-4px; }
}
`;var Yt=`
.reorderable-list{
  --rl-gap: 12px;
  --rl-item-radius: 14px;
  --rl-item-pad-y: 12px;
  --rl-item-pad-x: 16px;
  --rl-item-bg: color-mix(in oklab, var(--soft) 88%, transparent);
  --rl-item-border: color-mix(in oklab, var(--border) 78%, transparent);
  --rl-item-shadow: 0 6px 18px color-mix(in oklab, var(--shadow) 18%, transparent);
  --rl-tone-w: var(--card-accent-w, 3px);
  display:flex;
  flex-direction:column;
  gap: var(--rl-gap);
  min-width:0;
}

.reorderable-list[data-density="compact"]{
  --rl-gap: 8px;
  --rl-item-pad-y: 8px;
  --rl-item-pad-x: 14px;
  --rl-item-radius: 12px;
}

.reorderable-list[data-density="loose"]{
  --rl-gap: 16px;
  --rl-item-pad-y: 16px;
  --rl-item-pad-x: 20px;
  --rl-item-radius: 16px;
}

.reorderable-list[data-variant="surface"]{
  --rl-item-bg: color-mix(in oklab, var(--bg) 86%, transparent);
  --rl-item-border: color-mix(in oklab, var(--border) 70%, transparent);
}

.reorderable-list[data-variant="ghost"]{
  --rl-item-bg: color-mix(in oklab, var(--soft) 55%, transparent);
  --rl-item-border: color-mix(in oklab, var(--border) 60%, transparent);
  --rl-item-shadow: none;
}

.reorderable-track{
  display:flex;
  flex-direction:column;
  gap: var(--rl-gap);
  position:relative;
}

.reorderable-list.is-empty .reorderable-track{
  gap: 0;
}

.rl-empty{
  padding: var(--rl-item-pad-y) var(--rl-item-pad-x);
  border-radius: var(--rl-item-radius);
  border: 1px dashed color-mix(in oklab, var(--border) 80%, transparent);
  background: color-mix(in oklab, var(--soft) 70%, transparent);
  color: color-mix(in oklab, var(--fg) 70%, #94a3b8);
  font-size: 12px;
  text-align:center;
}

.rl-item{
  position:relative;
  display:flex;
  align-items:center;
  gap: 12px;
  padding: var(--rl-item-pad-y) var(--rl-item-pad-x);
  border-radius: var(--rl-item-radius);
  background: var(--rl-item-bg);
  border: 1px solid var(--rl-item-border);
  box-shadow: var(--rl-item-shadow);
  transition:
    transform .16s ease,
    box-shadow .2s ease,
    background .2s ease,
    border-color .2s ease,
    opacity .2s ease,
    filter .2s ease;
}

.reorderable-list:not(.is-reordering) .rl-item:hover{
  border-color: color-mix(in oklab, var(--accent) 35%, var(--rl-item-border));
  filter: brightness(1.03);
}

.reorderable-list[data-grab="item"] .rl-item{
  cursor: grab;
}

.rl-item.is-disabled{
  opacity: .55;
  cursor: default;
  box-shadow: none;
}

.rl-item.is-dragging{
  box-shadow:
    0 18px 32px color-mix(in oklab, var(--shadow) 38%, transparent),
    0 0 0 1px color-mix(in oklab, var(--accent) 32%, transparent);
  filter: brightness(1.05);
}

.reorderable-list.is-reordering .rl-item:not(.is-dragging){
  transition: transform .14s ease;
}

.rl-item::before{
  content:"";
  position:absolute;
  inset: 8px auto 8px 0;
  width: var(--rl-tone-w);
  border-radius: 999px;
  opacity: 0;
  transition: opacity .2s ease;
  background: transparent;
}

.rl-item[data-tone="accent"]::before{
  opacity: 1;
  background: color-mix(in oklab, var(--accent) 75%, transparent);
}

.rl-item[data-tone="info"]::before{
  opacity: 1;
  background: color-mix(in oklab, #38bdf8 70%, transparent);
}

.rl-item[data-tone="success"]::before{
  opacity: 1;
  background: color-mix(in oklab, #34d399 72%, transparent);
}

.rl-item[data-tone="warning"]::before{
  opacity: 1;
  background: color-mix(in oklab, #fbbf24 72%, transparent);
}

.rl-item[data-tone="danger"]::before{
  opacity: 1;
  background: color-mix(in oklab, #f87171 72%, transparent);
}

.rl-handle{
  inline-size: 32px;
  block-size: 32px;
  border-radius: 10px;
  border: 1px solid color-mix(in oklab, var(--border) 80%, transparent);
  background: color-mix(in oklab, var(--soft) 75%, transparent);
  color: var(--fg);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:0;
  cursor: grab;
  transition:
    background .2s ease,
    border-color .2s ease,
    transform .16s ease,
    box-shadow .2s ease;
}

.rl-handle:focus-visible{
  outline: none;
  box-shadow:
    0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent),
    0 6px 16px color-mix(in oklab, var(--shadow) 26%, transparent);
}

.rl-handle:hover{
  border-color: color-mix(in oklab, var(--accent) 55%, var(--border));
}

.rl-handle:active{
  cursor: grabbing;
  transform: translateY(1px);
}

.rl-handle svg{
  width: 12px;
  height: 12px;
  fill: currentColor;
  opacity: .82;
}

.rl-body{
  display:flex;
  align-items:center;
  flex:1 1 auto;
  gap: 12px;
  min-width:0;
}

.rl-leading{
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: color-mix(in oklab, var(--soft) 58%, transparent);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  color: var(--fg);
  flex:0 0 auto;
}

.rl-leading img,
.rl-leading svg{
  max-width: 100%;
  max-height: 100%;
}

.rl-text{
  display:flex;
  flex-direction:column;
  gap:4px;
  min-width:0;
  flex:1 1 auto;
}

.rl-title{
  font-size: 14px;
  font-weight: 600;
  color: var(--fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rl-subtitle{
  font-size: 12px;
  color: color-mix(in oklab, var(--fg) 70%, #94a3b8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rl-meta{
  margin-left: auto;
  font-size: 12px;
  color: color-mix(in oklab, var(--fg) 72%, #94a3b8);
  display:flex;
  align-items:center;
  gap:6px;
}

.rl-trailing{
  flex:0 0 auto;
  display:flex;
  align-items:center;
  gap:6px;
}

.rl-index{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width: 24px;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: color-mix(in oklab, var(--fg) 82%, #e2e8f0);
  background: color-mix(in oklab, var(--soft) 66%, transparent);
  flex:0 0 auto;
}

.rl-placeholder{
  border-style: dashed;
  border-width: 1px;
  border-color: color-mix(in oklab, var(--accent) 58%, var(--border));
  background: color-mix(in oklab, var(--accent) 22%, transparent);
  box-shadow: none;
  opacity: .65;
}

.reorderable-list[data-grab="item"] .rl-handle[aria-hidden="true"]{
  pointer-events:none;
  border-style: dotted;
  opacity:.65;
}

.reorderable-list[data-grab="item"] .rl-item:active{
  cursor: grabbing;
}
`;var Jt=`
@layer components {
  .color-picker{
    --cp-checkerboard: repeating-conic-gradient(#ebeef5 0 25%, transparent 0 50%) 0 0 / 12px 12px;
  }

  .color-picker__header{
    align-items:center;
    gap:12px;
  }

  .color-picker__preview{
    position:relative;
    inline-size:32px;
    block-size:32px;
    border-radius:10px;
    border:1px solid color-mix(in oklab, var(--border) 80%, transparent);
    background: color-mix(in oklab, var(--soft) 92%, transparent);
    padding:0;
    cursor:pointer;
    outline:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:border-color .2s ease, box-shadow .2s ease, transform .12s ease;
  }
  .color-picker__preview::after{
    content:"";
    position:absolute;
    inset:0;
    border-radius:inherit;
    background: var(--cp-preview-color, transparent);
    box-shadow: inset 0 1px 2px color-mix(in oklab, #ffffff 70%, transparent);
  }
  .color-picker__preview:focus-visible{
    box-shadow:0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent);
  }
  .color-picker__preview:active{
    transform:scale(.97);
  }

  .color-picker__body{
    display:flex;
    flex-direction:column;
    gap:14px;
    padding:0;
  }

  .color-picker__main{
    display:flex;
    gap:12px;
    align-items:stretch;
  }

  .color-picker__palette{
    position:relative;
    flex:1 1 auto;
    min-inline-size:0;
    border-radius:12px;
    background:
      linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%),
      linear-gradient(90deg, #fff 0%, var(--cp-palette-hue, #ff0000) 100%);
    box-shadow:inset 0 1px 3px color-mix(in oklab, #000 12%, transparent);
    cursor:crosshair;
    aspect-ratio: 4 / 3;
    overflow:hidden;
    touch-action:none;
  }

  .color-picker__palette-cursor{
    position:absolute;
    width:12px;
    height:12px;
    border-radius:999px;
    border:2px solid #fff;
    box-shadow:0 1px 4px #0004, inset 0 0 2px #0002;
    pointer-events:none;
    transform:translate(-50%, -50%);
  }

  .color-picker__alpha{
    position:relative;
    flex:0 0 18px;
    border-radius:12px;
    background: color-mix(in oklab, var(--soft) 92%, transparent);
    overflow:hidden;
    cursor:pointer;
    touch-action:none;
  }
  .color-picker__alpha::after{
    content:"";
    position:absolute;
    inset:0;
    background: var(--cp-alpha-gradient, linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(255,0,0,0) 100%));
    z-index:0;
  }
  .color-picker__alpha-thumb{
    position:absolute;
    left:2px;
    right:2px;
    height:6px;
    border-radius:6px;
    border:1px solid color-mix(in oklab, #000 18%, transparent);
    box-shadow:0 1px 3px #0004;
    transform:translateY(-50%);
    background:#fff;
    opacity:1;
    pointer-events:none;
    z-index:1;
  }

  .color-picker__hue{
    position:relative;
    block-size:16px;
    border-radius:999px;
    background: linear-gradient(
      90deg,
      #ff0000 0%,
      #ffff00 16.6%,
      #00ff00 33.3%,
      #00ffff 50%,
      #0000ff 66.6%,
      #ff00ff 83.3%,
      #ff0000 100%
    );
    box-shadow:inset 0 1px 3px color-mix(in oklab, #000 12%, transparent);
    cursor:pointer;
    touch-action:none;
  }
  .color-picker__hue-thumb{
    position:absolute;
    top:2px;
    bottom:2px;
    width:6px;
    border-radius:6px;
    border:1px solid color-mix(in oklab, #000 16%, transparent);
    box-shadow:0 1px 3px #0003;
    transform:translateX(-50%);
    pointer-events:none;
    background: color-mix(in oklab, #ffffff 88%, transparent);
    z-index:1;
  }

  .color-picker__hex-row{
    display:flex;
    align-items:center;
    gap:8px;
    justify-content:flex-start;
  }

  .color-picker__hex-wrap{
    flex:1 1 auto;
    min-inline-size:0;
    gap:6px;
  }

  .color-picker__hex-wrap .input{
    flex:1 1 auto;
    min-inline-size:0;
  }

  .color-picker__mode-btn{
    flex:0 0 auto;
    border:1px solid var(--border);
    border-radius:10px;
    padding:8px 12px;
    min-width:62px;
    background: color-mix(in oklab, var(--soft) 90%, transparent);
    color:var(--fg);
    font:600 11px/1 var(--font-ui, system-ui);
    letter-spacing:.6px;
    text-transform:uppercase;
    cursor:pointer;
    transition:border-color .2s ease, background .2s ease, box-shadow .2s ease, color .2s ease;
  }
  .color-picker__mode-btn:hover{
    border-color: color-mix(in oklab, var(--accent) 40%, var(--border));
    background: color-mix(in oklab, var(--soft) 70%, transparent);
  }
  .color-picker__mode-btn:focus-visible{
    outline:none;
    box-shadow:0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent);
  }
  .color-picker__mode-btn.is-alt{
    background: color-mix(in oklab, var(--accent) 24%, transparent);
    color: color-mix(in oklab, var(--fg) 96%, var(--accent));
    border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
  }

  .color-picker__hex-input{
    flex:1 1 auto;
    min-inline-size:0;
    border:1px solid var(--border);
    border-radius:12px;
    padding:10px 12px;
    background: color-mix(in oklab, var(--soft) 82%, transparent);
    color:var(--fg);
    font:600 13px/1.2 var(--font-ui, system-ui);
    letter-spacing:.4px;
    text-transform:uppercase;
    outline:none;
    transition:border-color .2s ease, box-shadow .2s ease;
  }
  .color-picker__hex-input:focus{
    border-color: color-mix(in oklab, var(--accent) 55%, var(--border));
    box-shadow:0 0 0 2px color-mix(in oklab, var(--accent) 40%, transparent);
  }

  .color-picker__native{
    display:none;
  }

  .color-picker--mobile .card{
    padding:12px;
  }
  .color-picker--mobile .card-collapse{
    display:none !important;
  }
  .color-picker--mobile .color-picker__preview{
    pointer-events:auto;
  }
}
`;var Xt=`
@layer components {
  .log{
    display:block;
    border:1px solid var(--border);
    border-radius:12px;
    background: color-mix(in oklab, var(--soft) 80%, transparent);
    color: var(--fg);
    box-shadow: 0 8px 20px color-mix(in oklab, var(--shadow) 35%, transparent);
    transition: background-color .28s ease, color .28s ease, border-color .28s ease, box-shadow .28s ease;
    overflow: hidden;
    min-height: 120px;
  }

  .log-viewport{
    block-size: 100%;
    max-block-size: 100%;
    overflow: auto;
    padding: 10px 12px 14px; /* extra bottom padding to avoid last-line clipping */
    background: color-mix(in oklab, var(--bg) 88%, transparent);
    scrollbar-gutter: stable;
  }
  .log-viewport::-webkit-scrollbar{ width:10px; height:10px; }
  .log-viewport::-webkit-scrollbar-thumb{ background:var(--muted); border-radius:8px; }

  .log-lines{ display:block; font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: pre; }
  .log--wrap .log-lines{ white-space: pre-wrap; word-break: break-word; }
  .log-lines::after{ content: ""; display:block; height: 6px; }

  /* Groups */
  .log-group{ border:1px solid color-mix(in oklab, var(--border) 70%, transparent); border-radius:10px; margin:8px 0; overflow:hidden; background: color-mix(in oklab, var(--soft) 80%, transparent); }
  .log-group-header{
    display:flex; align-items:center; gap:8px;
    padding:6px 10px; cursor:pointer; user-select:none;
    background: color-mix(in oklab, var(--soft) 85%, transparent);
    color: var(--fg);
    position:relative;
  }
  .log-group-header::before{
    content: '\u25BE';
    display:inline-block; width:1em; text-align:center; opacity:.9;
    transform-origin:center; transition: transform .18s ease;
  }
  .log-group.is-collapsed .log-group-header::before{ transform: rotate(-90deg); }
  .log-group-body{ padding:6px 8px; }
  .log-group.is-collapsed .log-group-body{ display:none; }

  .log-line{
    display:grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: start;
    padding-block: 2px;
    border-left: 3px solid transparent;
  }

  .log-time{
    opacity:.7;
    color: color-mix(in oklab, var(--fg) 75%, #9ca3af);
    font-variant-numeric: tabular-nums; 
    user-select: none;
    min-inline-size: 64px;
  }

  .log-text{ color: var(--fg); }

  /* Level accents */
  .log-level--debug{ border-left-color: color-mix(in oklab, #64748b 70%, var(--border)); }
  .log-level--info { border-left-color: color-mix(in oklab, #3b82f6 70%, var(--border)); }
  .log-level--warn { border-left-color: color-mix(in oklab, #f59e0b 80%, var(--border)); }
  .log-level--error{ border-left-color: color-mix(in oklab, #ef4444 80%, var(--border)); }

  /* Syntax tokens */
  .tok{ font: inherit; }
  .tok-kw{   color: color-mix(in oklab, var(--accent) 75%, var(--fg)); font-weight: 600; }
  .tok-str{  color: color-mix(in oklab, #22c55e 78%, var(--fg)); }
  .tok-num{  color: color-mix(in oklab, #a78bfa 78%, var(--fg)); }
  .tok-comm{ color: color-mix(in oklab, var(--fg) 65%, #9ca3af); font-style: italic; }
  .tok-lit{  color: color-mix(in oklab, #f472b6 78%, var(--fg)); }
}
`;function Qt(e){let{hostId:t="lg-slideout-root",baseCss:n,initialWidth:r,initialOpen:o,onWidthChange:a,onOpenChange:s,themes:p,initialTheme:k,onThemeChange:h,buildSections:f,initialTab:c,onTabChange:i,toggleCombo:g=F=>F.ctrlKey&&F.shiftKey&&F.key.toLowerCase()==="u",closeOnEscape:y=!0,minWidth:d=420,maxWidth:E=720}=e,L=d,I=E,{host:S,shadow:l}=dt(t);q(l,Bt,"tokens"),q(l,At,"base"),q(l,Ot,"utils"),q(l,Wt,"card"),q(l,Nt,"badge"),q(l,Dt,"button"),q(l,_t,"input"),q(l,zt,"label"),q(l,Ft,"navTabs"),q(l,Gt,"searchBar"),q(l,Vt,"select"),q(l,jt,"switch"),q(l,$t,"table"),q(l,Ut,"timeRangePicker"),q(l,qt,"tooltip"),q(l,Kt,"slider"),q(l,Yt,"reorderableList"),q(l,Jt,"colorPicker"),q(l,Xt,"log"),n&&q(l,n,"external-base");let b=u("div",{className:"lg-panel",id:"panel",ariaHidden:String(!o)}),x=u("div",{className:"lg-tabbar"}),T=u("div",{className:"lg-content",id:"content"}),w=u("div",{className:"lg-resizer",title:"Resize"});b.append(x,T,w);let W=u("button",{className:"lg-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715"),N=u("div",{className:"lg-wrap"},b);l.append(N);function C(){let F=te(),J=Math.round(j.visualViewport?.width??j.innerWidth??0);if(F.platform==="mobile"||F.os==="ios"||F.os==="android"){let ge=getComputedStyle(l.host),_e=parseFloat(ge.getPropertyValue("--inset-l"))||0,ze=parseFloat(ge.getPropertyValue("--inset-r"))||0,Qe=Math.max(280,J-Math.round(_e+ze));L=Math.min(420,Math.max(300,Math.floor(J*.66))),L=Math.min(L,Qe),I=Qe}else L=d,I=E}function G(F){return Math.max(L,Math.min(I,Number(F)||r))}function $(F){b.dispatchEvent(new CustomEvent("lg:open-change",{detail:{open:F},bubbles:!0})),s?.(F)}function V(F){let J=b.classList.contains("open");b.classList.toggle("open",F),b.setAttribute("aria-hidden",F?"false":"true"),F!==J&&$(F)}function D(F){let J=G(F);l.host.style.setProperty("--w",`${J}px`),a?.(J)}C(),D(r),V(o),W.addEventListener("click",F=>{F.preventDefault(),F.stopPropagation(),V(!1)});let B=F=>{let J=b.classList.contains("open");if(y&&F.key==="Escape"&&J)return void V(!1);g(F)&&V(!J)};document.addEventListener("keydown",B,{capture:!0});let P=te(),H=!(P.platform==="mobile"||P.os==="ios"||P.os==="android"),z=!1,v=F=>{if(!z)return;F.preventDefault();let J=Math.round(j.innerWidth-F.clientX);D(J)},m=()=>{z&&(z=!1,document.body.style.cursor="",j.removeEventListener("mousemove",v),j.removeEventListener("mouseup",m))};w.addEventListener("mousedown",F=>{H&&(F.preventDefault(),z=!0,document.body.style.cursor="ew-resize",j.addEventListener("mousemove",v),j.addEventListener("mouseup",m))});let M=k,R=null,A=!1;function U(F){let J=p[F]||p[M]||{},ge=l.host;A&&ge.classList.add("theme-anim");for(let[_e,ze]of Object.entries(J))ge.style.setProperty(_e,ze);A?(R!==null&&clearTimeout(R),R=j.setTimeout(()=>{ge.classList.remove("theme-anim"),R=null},320)):A=!0,M=F,h?.(F)}let ue=()=>M;U(k);let Be=f({applyTheme:U,initialTheme:k,getCurrentTheme:ue,setHUDWidth:D,setHUDOpen:V}),Oe=new xe(Be,T,{applyTheme:U,getCurrentTheme:ue}),Ae=Be.map(F=>({id:F.id,label:F.label})),he=It(Ae,c||Ae[0]?.id||"",F=>{Oe.activate(F),i?.(F)});he.root.style.flex="1 1 auto",he.root.style.minWidth="0",x.append(he.root,W),Oe.activate(c||Ae[0]?.id||"");let Xe=()=>{he.recalc();let F=parseInt(getComputedStyle(l.host).getPropertyValue("--w"))||r;C(),D(F)};j.addEventListener("resize",Xe);function pn(){document.removeEventListener("keydown",B,{capture:!0}),j.removeEventListener("resize",Xe),j.removeEventListener("mousemove",v),j.removeEventListener("mouseup",m)}return{host:S,shadow:l,wrap:N,panel:b,content:T,setOpen:V,setWidth:D,sections:Be,manager:Oe,nav:he,destroy:pn}}var co="https://i.imgur.com/IMkhMur.png",po="Stats";function Zt(e){let t=e.iconUrl||co,n=e.ariaLabel||"Open MGH",r=null,o=null,a=null,s=!1,p=null,k=null,h=["Chat","Leaderboard","Stats","Open Activity Log"],f=S=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(S):S.replace(/"/g,'\\"')}catch{return S}};function c(){let S=document.querySelector(h.map(b=>`button[aria-label="${f(b)}"]`).join(","));if(!S)return null;let l=S.parentElement;for(;l&&l!==document.body;){if(h.reduce((x,T)=>x+l.querySelectorAll(`button[aria-label="${f(T)}"]`).length,0)>=2)return l;l=l.parentElement}return null}function i(S){return S}function g(S){let l=Array.from(S.querySelectorAll("button[aria-label]"));if(!l.length)return{refBtn:null,refWrapper:null};let b=l.filter(G=>G.dataset.mghBtn!=="true"&&(G.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),x=b.length?b:l,T=x.find(G=>(G.getAttribute("aria-label")||"").toLowerCase()===po.toLowerCase())||null,w=x.length>=2?x.length-2:x.length-1,W=T||x[w],N=W.parentElement,C=N&&N.parentElement===S&&N.tagName==="DIV"?N:null;return{refBtn:W,refWrapper:C}}function y(S,l,b){let x=S.cloneNode(!1);x.type="button",x.setAttribute("aria-label",l),x.title=l,x.dataset.mghBtn="true",x.style.pointerEvents="auto",x.removeAttribute("id");let T=document.createElement("img");return T.src=b,T.alt="MGH",T.style.pointerEvents="none",T.style.userSelect="none",T.style.width="76%",T.style.height="76%",T.style.objectFit="contain",T.style.display="block",T.style.margin="auto",x.appendChild(T),x.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();try{e.onClick?.()}catch{}}),x}function d(){if(s)return!1;s=!0;let S=!1;try{let l=c();if(!l)return!1;p!==l&&(p=l);let{refBtn:b,refWrapper:x}=g(l);if(!b)return!1;o=l.querySelector('div[data-mgh-wrapper="true"]'),!o&&x&&(o=x.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),S=!0);let T=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=T),r||(r=y(b,n,t),o?o.appendChild(r):r.parentElement!==l&&l.appendChild(r),S=!0),o&&o.parentElement!==l&&(l.appendChild(o),S=!0);let w=l;if(w&&w!==k){try{I.disconnect()}catch{}k=w,I.observe(k,{childList:!0,subtree:!0})}return S}finally{s=!1}}d();let E=document.getElementById("App")||document.body,L=null,I=new MutationObserver(S=>{let l=S.every(x=>{let T=Array.from(x.addedNodes||[]),w=Array.from(x.removedNodes||[]),W=T.concat(w);if(W.length===0){let N=x.target;return o&&(N===o||o.contains(N))||r&&(N===r||r.contains(N))}return W.every(N=>!!(!(N instanceof HTMLElement)||o&&(N===o||o.contains(N))||r&&(N===r||r.contains(N))))}),b=S.some(x=>Array.from(x.removedNodes||[]).some(T=>T instanceof HTMLElement?!!(o&&(T===o||o.contains(T))||r&&(T===r||r.contains(T))):!1));l&&!b||L===null&&(L=window.setTimeout(()=>{if(L=null,d()&&o){let T=o.parentElement;T&&T.lastElementChild!==o&&T.appendChild(o)}},150))});return I.observe(E,{childList:!0,subtree:!0}),a=()=>I.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}var bo={},nn=[];function uo(){return nn.slice()}function go(e){nn.push(e)}function on(e){try{return JSON.parse(e)}catch{return}}function en(e){if(typeof e=="string"){let t=on(e);return t!==void 0?t:e}return e}function rn(e){if(e!=null){if(typeof e=="string"){let t=on(e);return t!==void 0?rn(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function mo(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function _(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,a=(s,p)=>{if(rn(s)!==e)return;let h=o(s,p);return h&&typeof h=="object"&&"kind"in h?h:typeof h=="boolean"?h?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return go(a),a}var Te=new WeakSet,tn=new WeakMap;function an(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:uo();if(!r.length)return()=>{};let o=i=>({ws:i,pageWindow:t,debug:n}),a=(i,g)=>{let y=i;for(let d of r){let E=d(y,o(g));if(E){if(E.kind==="drop")return{kind:"drop"};E.kind==="replace"&&(y=E.message)}}return y!==i?{kind:"replace",message:y}:void 0},s=null,p=null,k=null,h=()=>{let i=t?.MagicCircle_RoomConnection,g=i?.sendMessage;if(!i||typeof g!="function")return!1;if(Te.has(g))return!0;let y=g.bind(i);function d(...E){let L=E.length===1?E[0]:E,I=en(L),S=a(I,mo(t));if(S?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",I);return}if(S?.kind==="replace"){let l=S.message;return E.length>1&&Array.isArray(l)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",I,"=>",l),y(...l)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",I,"=>",l),y(l))}return y(...E)}Te.add(d),tn.set(d,g);try{i.sendMessage=d,Te.add(i.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return s=()=>{try{i.sendMessage===d&&(i.sendMessage=g)}catch{}},!0};(()=>{let i=t?.WebSocket?.prototype,g=i?.send;if(typeof g!="function"||Te.has(g))return;function y(d){let E=en(d),L=a(E,this);if(L?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",E);return}if(L?.kind==="replace"){let I=L.message,S=typeof I=="string"||I instanceof ArrayBuffer||I instanceof Blob?I:JSON.stringify(I);return n&&console.log("[WS] replace outgoing (ws.send)",E,"=>",I),g.call(this,S)}return g.call(this,d)}Te.add(y),tn.set(y,g);try{i.send=y,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}p=()=>{try{i.send===y&&(i.send=g)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!h()&&c>0){let i=Date.now();k=setInterval(()=>{if(h()){clearInterval(k),k=null;return}Date.now()-i>c&&(clearInterval(k),k=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(k){try{clearInterval(k)}catch{}k=null}if(s){try{s()}catch{}s=null}if(p){try{p()}catch{}p=null}}}(function(){try{let t=bo,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var vo={},ln=[];function fo(){return ln.slice()}function sn(e){ln.push(e)}function ho(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function xo(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Je=Symbol.for("ariesmod.ws.handlers.patched");function K(e,t){if(typeof e=="string"){let o=e,a={match:s=>s.kind==="message"&&s.type===o,handle:t};return sn(a),a}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return sn(r),r}function cn(e,t=fo(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[Je])return()=>{};e[Je]=!0;let a={ws:e,pageWindow:r,debug:o},s=c=>{for(let i of t)try{if(!i.match(c))continue;if(i.handle(c,a)===!0)return}catch(g){o&&console.error("[WS] handler error",g,c)}},p=c=>{let i=xo(c.data),g=ho(i);s({kind:"message",raw:c.data,data:i,type:g})},k=c=>{s({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},h=c=>s({kind:"open",event:c}),f=c=>s({kind:"error",event:c});return e.addEventListener("message",p),e.addEventListener("close",k),e.addEventListener("open",h),e.addEventListener("error",f),()=>{try{e.removeEventListener("message",p)}catch{}try{e.removeEventListener("close",k)}catch{}try{e.removeEventListener("open",h)}catch{}try{e.removeEventListener("error",f)}catch{}try{delete e[Je]}catch{}}}(function(){try{let t=vo,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();K(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});K(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});K(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});K(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});K(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});K(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});K(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});K(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});K(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});K(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});K(oe.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});K(oe.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});K(oe.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});K(oe.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});K(oe.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});K(oe.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});K(oe.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});K(oe.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});_(O.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));_(O.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));_(O.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));_(O.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));_(O.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));_(O.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));_(O.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));_(O.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));_(O.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));_(O.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));_(O.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));_(O.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));_(O.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));_(O.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));_(O.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));_(O.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));_(O.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));_(O.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));_(O.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));_(O.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));_(O.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));_(O.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));_(O.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));_(O.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));_(O.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));_(O.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));_(O.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));_(O.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));_(O.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));_(O.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));_(O.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");_(O.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));_(O.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));_(O.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));_(O.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));_(O.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));_(O.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));_(O.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));_(O.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));_(O.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));_(O.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));_(O.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));_(O.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));_(O.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));_(O.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));_(O.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));_(O.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function yo(e={}){let t=e.pageWindow??j,n=e.pollMs??500,r=!!e.debug,o=[];o.push(Mt(t,{debug:r})),o.push(an({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null,s=p=>{if(a){try{a()}catch{}a=null}p&&(a=cn(p,e.handlers,{debug:r,pageWindow:t}))};return s(Ee(t).ws),o.push(Lt(p=>s(p.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Ee(t).ws,dispose:()=>{for(let p=o.length-1;p>=0;p--)try{o[p]()}catch{}if(a){try{a()}catch{}a=null}}}}var De=null;function dn(e={}){return De||(De=yo(e),De)}(async function(){"use strict";dn({debug:!1});let e=Ze();rt();let t=Qt({hostId:"lg-slideout-root",initialWidth:e.width,initialOpen:e.open,onWidthChange:n=>le(re.width,n),onOpenChange:n=>le(re.open,n),themes:ce,initialTheme:e.theme,onThemeChange:n=>le(re.theme,n),buildSections:n=>Ye({applyTheme:n.applyTheme,initialTheme:n.initialTheme,getCurrentTheme:n.getCurrentTheme}),initialTab:e.tab,onTabChange:n=>le(re.tab,n)});Zt({onClick:()=>t.setOpen(!0)})})();})();
