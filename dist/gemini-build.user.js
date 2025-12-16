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
(()=>{var On=Object.defineProperty;var Pn=(e,t,n)=>t in e?On(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var B=(e,t)=>()=>(e&&(t=e(e=0)),t);var In=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ee=(e,t,n)=>Pn(e,typeof t!="symbol"?t+"":t,n);function pe(e,t){return e in Be?Be[e]:t}function ae(e,t){Be[e]=t}function rt(){return{open:pe(te.open,Ee.open),theme:pe(te.theme,Ee.theme),tab:pe(te.tab,Ee.tab),width:pe(te.width,Ee.width)}}var te,Ee,Be,Fe=B(()=>{te={open:"ui_open",theme:"ui_theme",tab:"ui_active_tab",width:"ui_width"},Ee={open:!1,theme:"dark",tab:"tab-settings",width:480},Be={}});var ie,Ve=B(()=>{ie={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}}});function it(e=$e){try{return e.top!==e}catch{return!0}}var We,$e,U,ot,at,Le=B(()=>{We=window,$e=typeof unsafeWindow<"u"&&unsafeWindow?unsafeWindow:We,U=$e,ot=$e!==We,at=We});function Bn(){if(!st){st=!0;try{let e=U.WebSocket,t=function(n,o){let r=o!==void 0?new e(n,o):new e(n);try{r.addEventListener("close",a=>{try{if(a?.code===4710||/Version\s*Expired/i.test(a?.reason||""))for(let v of lt)try{v(a,r)}catch{}}catch{}})}catch{}return r};t.prototype=e.prototype,t.CONNECTING=e.CONNECTING,t.OPEN=e.OPEN,t.CLOSING=e.CLOSING,t.CLOSED=e.CLOSED,U.WebSocket=t}catch{}}}function Fn(e){lt.push(e),Bn()}function ct(){Fn(e=>{try{it()||U.location.reload()}catch{}})}var st,lt,dt=B(()=>{Le();st=!1,lt=[]});var se,pt=B(()=>{se=class{constructor(t){ee(this,"id");ee(this,"label");ee(this,"_mount");ee(this,"_cleanup",null);this.id=t.id,this.label=t.label,this._mount=t.mount}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);let n=this._mount(t),o=t.firstElementChild;o&&o.classList.contains("lg-section")&&o.classList.add("active"),typeof n=="function"&&(this._cleanup=n)}unmount(){if(this._cleanup)try{this._cleanup()}finally{this._cleanup=null}}}});var he,ut=B(()=>{he=class{constructor(t,n,o){ee(this,"sections");ee(this,"activeId",null);ee(this,"container");ee(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error("Unknown source: "+t);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}}});function mt(){let e=pe(gt,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Vn(e){ae(gt,e)}async function bt(e){return mt()[e]}function ft(e,t){let n=mt();Vn({...n,[e]:t})}function Te(e,t){return{...e,...t??{}}}async function ht(e){let t=await bt(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((N=>JSON.parse(JSON.stringify(N)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){ft(e.path,n)}function a(){return n}function c(N){n=e.sanitize?e.sanitize(N):N,r()}function v(N){let d=Object.assign((l=>JSON.parse(JSON.stringify(l)))(n),{});typeof N=="function"?N(d):Object.assign(d,N),n=e.sanitize?e.sanitize(d):d,r()}function A(){r()}return{get:a,set:c,update:v,save:A}}async function je(e,t){let{path:n=e,...o}=t;return ht({path:n,...o})}var gt,xt=B(()=>{Fe();gt="sections"});function s(e,t={},...n){let o=document.createElement(e);for(let[r,a]of Object.entries(t||{}))a!=null&&(r==="style"&&typeof a=="object"?Object.assign(o.style,a):r.startsWith("on")&&typeof a=="function"?o[r.toLowerCase()]=a:r in o?o[r]=a:o.setAttribute(r,String(a)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}function vt(e="mgh-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,{all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"}),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}var J=B(()=>{});function re(e={},...t){let{id:n,className:o,variant:r="default",padding:a="md",interactive:c=!1,expandable:v=!1,defaultExpanded:A=!0,onExpandChange:N,mediaTop:b,title:d,subtitle:l,badge:x,actions:S,footer:p,divider:z=!1,tone:M="neutral",stateKey:P}=e,T=s("div",{className:"card",id:n,tabIndex:c?0:void 0});T.classList.add(`card--${r}`,`card--p-${a}`),c&&T.classList.add("card--interactive"),M!=="neutral"&&T.classList.add(`card--tone-${M}`),o&&T.classList.add(...o.split(" ").filter(Boolean)),v&&T.classList.add("card--expandable");let i=v?P??n??(typeof d=="string"?`title:${d}`:null):null,g=!v||A;i&&Ce.has(i)&&(g=!!Ce.get(i));let m=null,y=null,h=null,H=null,R=null,w=n?`${n}-collapse`:`card-collapse-${++Wn}`,V=()=>{if(H!==null&&(cancelAnimationFrame(H),H=null),R){let L=R;R=null,L()}},$=(L,I)=>{if(!h)return;V();let f=h;if(f.setAttribute("aria-hidden",String(!L)),!I){f.classList.remove("card-collapse--animating"),f.style.display=L?"":"none",f.style.height="",f.style.opacity="";return}if(f.classList.add("card-collapse--animating"),f.style.display="",L){f.style.height="auto";let O=f.scrollHeight;if(!O){f.classList.remove("card-collapse--animating"),f.style.display="",f.style.height="",f.style.opacity="";return}f.style.height="0px",f.style.opacity="0",f.offsetHeight,H=requestAnimationFrame(()=>{H=null,f.style.height=`${O}px`,f.style.opacity="1"})}else{let O=f.scrollHeight;if(!O){f.classList.remove("card-collapse--animating"),f.style.display="none",f.style.height="",f.style.opacity="";return}f.style.height=`${O}px`,f.style.opacity="1",f.offsetHeight,H=requestAnimationFrame(()=>{H=null,f.style.height="0px",f.style.opacity="0"})}let u=()=>{f.classList.remove("card-collapse--animating"),f.style.height="",L||(f.style.display="none"),f.style.opacity=""},k=null,C=O=>{O.target===f&&(k!==null&&(clearTimeout(k),k=null),f.removeEventListener("transitionend",C),f.removeEventListener("transitioncancel",C),R=null,u())};R=()=>{k!==null&&(clearTimeout(k),k=null),f.removeEventListener("transitionend",C),f.removeEventListener("transitioncancel",C),R=null,u()},f.addEventListener("transitionend",C),f.addEventListener("transitioncancel",C),k=window.setTimeout(()=>{R?.()},420)};function W(L){let I=document.createElementNS("http://www.w3.org/2000/svg","svg");return I.setAttribute("viewBox","0 0 24 24"),I.setAttribute("width","16"),I.setAttribute("height","16"),I.innerHTML=L==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',I}function D(L,I=!0,f=!0){g=L,T.classList.toggle("card--collapsed",!g),T.classList.toggle("card--expanded",g),m&&(m.dataset.expanded=String(g),m.setAttribute("aria-expanded",String(g))),y&&(y.setAttribute("aria-expanded",String(g)),y.classList.toggle("card-toggle--collapsed",!g),y.setAttribute("aria-label",g?"Replier le contenu":"Deplier le contenu"),y.replaceChildren(W(g?"up":"down"))),v?$(g,f):h&&(h.style.display="",h.style.height="",h.style.opacity="",h.setAttribute("aria-hidden","false")),I&&N&&N(g),i&&Ce.set(i,g)}if(b){let L=s("div",{className:"card-media"});L.append(b),T.appendChild(L)}let _=!!(d||l||x||S&&S.length||v);if(_){m=s("div",{className:"card-header"});let L=s("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(d){let u=s("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},d);x&&u.append(typeof x=="string"?s("span",{className:"badge"},x):x),L.appendChild(u)}if(l){let u=s("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},l);L.appendChild(u)}(L.childNodes.length||v)&&m.appendChild(L);let I=s("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),f=s("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});S?.forEach(u=>f.appendChild(u)),f.childNodes.length&&I.appendChild(f),v&&(y=s("button",{className:"card-toggle",type:"button",ariaExpanded:String(g),ariaControls:w,ariaLabel:g?"Replier le contenu":"Deplier le contenu"}),y.textContent=g?"\u25B2":"\u25BC",y.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),D(!g)}),I.appendChild(y),m.classList.add("card-header--expandable"),m.addEventListener("click",u=>{let k=u.target;k?.closest(".card-actions")||k?.closest(".card-toggle")||D(!g)})),I.childNodes.length&&m.appendChild(I),T.appendChild(m)}h=s("div",{className:"card-collapse",id:w,ariaHidden:v?String(!g):"false"}),T.appendChild(h),z&&_&&h.appendChild(s("div",{className:"card-divider"}));let E=s("div",{className:"card-body"});if(E.append(...t),h.appendChild(E),p){z&&h.appendChild(s("div",{className:"card-divider"}));let L=s("div",{className:"card-footer"});L.append(p),h.appendChild(L)}return y&&y.setAttribute("aria-controls",w),D(g,!1,!1),i&&Ce.set(i,g),T}function Ge(...e){return s("div",{className:"card-footer"},...e)}var Wn,Ce,Se=B(()=>{J();Wn=0,Ce=new Map});function $n(){Me||(Me=!0,window.addEventListener("keydown",X,!0),window.addEventListener("keypress",X,!0),window.addEventListener("keyup",X,!0),document.addEventListener("keydown",X,!0),document.addEventListener("keypress",X,!0),document.addEventListener("keyup",X,!0))}function jn(){Me&&(He.size>0||(Me=!1,window.removeEventListener("keydown",X,!0),window.removeEventListener("keypress",X,!0),window.removeEventListener("keyup",X,!0),document.removeEventListener("keydown",X,!0),document.removeEventListener("keypress",X,!0),document.removeEventListener("keyup",X,!0)))}function ue(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:a="md",disabled:c=!1,blockGameKeys:v=!0,onChange:A,onOpenChange:N}=e,b=s("div",{className:"select",id:t}),d=s("button",{className:"select-trigger",type:"button"}),l=s("span",{className:"select-value"},r),x=s("span",{className:"select-caret"},"\u25BE");d.append(l,x);let S=s("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});b.classList.add(`select--${a}`);let p=!1,z=n,M=null,P=!!c;function T(u){return u==null?r:(e.options||o).find(C=>C.value===u)?.label??r}function i(u){l.textContent=T(u),S.querySelectorAll(".select-option").forEach(k=>{let C=k.dataset.value,O=u!=null&&C===u;k.classList.toggle("selected",O),k.setAttribute("aria-selected",String(O))})}function g(u){S.replaceChildren(),u.forEach(k=>{let C=s("button",{className:"select-option"+(k.disabled?" disabled":""),type:"button",role:"option","data-value":k.value,"aria-selected":String(k.value===z),tabindex:"-1"},k.label);k.value===z&&C.classList.add("selected"),k.disabled||C.addEventListener("pointerdown",O=>{O.preventDefault(),O.stopPropagation(),w(k.value,{notify:!0}),H()},{capture:!0}),S.appendChild(C)})}function m(){d.setAttribute("aria-expanded",String(p)),S.setAttribute("aria-hidden",String(!p))}function y(){let u=d.getBoundingClientRect();Object.assign(S.style,{minWidth:`${u.width}px`})}function h(){p||P||(p=!0,b.classList.add("open"),m(),y(),document.addEventListener("mousedown",_,!0),document.addEventListener("scroll",E,!0),window.addEventListener("resize",L),S.focus({preventScroll:!0}),v&&($n(),He.add(b),M=()=>{He.delete(b),jn()}),N?.(!0))}function H(){p&&(p=!1,b.classList.remove("open"),m(),document.removeEventListener("mousedown",_,!0),document.removeEventListener("scroll",E,!0),window.removeEventListener("resize",L),d.focus({preventScroll:!0}),M?.(),M=null,N?.(!1))}function R(){p?H():h()}function w(u,k={}){let C=z;z=u,i(z),k.notify!==!1&&C!==u&&A?.(u)}function V(){return z}function $(u){let k=Array.from(S.querySelectorAll(".select-option:not(.disabled)"));if(!k.length)return;let C=k.findIndex(j=>j.classList.contains("active")),O=k[(C+(u===1?1:k.length-1))%k.length];k.forEach(j=>j.classList.remove("active")),O.classList.add("active"),O.focus({preventScroll:!0}),O.scrollIntoView({block:"nearest"})}function W(u){(u.key===" "||u.key==="Enter"||u.key==="ArrowDown")&&(u.preventDefault(),h())}function D(u){if(u.key==="Escape"){u.preventDefault(),H();return}if(u.key==="Enter"||u.key===" "){let k=S.querySelector(".select-option.active")||S.querySelector(".select-option.selected");k&&!k.classList.contains("disabled")&&(u.preventDefault(),w(k.dataset.value,{notify:!0}),H());return}if(u.key==="ArrowDown"){u.preventDefault(),$(1);return}if(u.key==="ArrowUp"){u.preventDefault(),$(-1);return}}function _(u){b.contains(u.target)||H()}function E(){p&&y()}function L(){p&&y()}function I(u){P=!!u,d.disabled=P,b.classList.toggle("disabled",P),P&&H()}function f(u){e.options=u,g(u),u.some(k=>k.value===z)||(z=null,i(null))}return b.append(d,S),d.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),R()},{capture:!0}),d.addEventListener("keydown",W),S.addEventListener("keydown",D),g(o),n!=null?(z=n,i(z)):i(null),m(),I(P),{root:b,open:h,close:H,toggle:R,getValue:V,setValue:w,setOptions:f,setDisabled:I,destroy(){document.removeEventListener("mousedown",_,!0),document.removeEventListener("scroll",E,!0),window.removeEventListener("resize",L),M?.(),M=null}}}var Me,He,X,Ue=B(()=>{J();Me=!1,He=new Set,X=e=>{let t=document.activeElement;for(let n of He)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}}});function Ne(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:a="md",layout:c="inline",variant:v="text",required:A=!1,disabled:N=!1,tooltip:b,hint:d,icon:l,suffix:x,onClick:S}=e,p=s("div",{className:"lg-label-wrap",id:t}),z=s("label",{className:"lg-label",...o?{htmlFor:o}:{},...b?{title:b}:{}});if(l){let w=typeof l=="string"?s("span",{className:"lg-label-ico"},l):l;w.classList?.add?.("lg-label-ico"),z.appendChild(w)}let M=s("span",{className:"lg-label-text"},n);z.appendChild(M);let P=s("span",{className:"lg-label-req",ariaHidden:"true"}," *");A&&z.appendChild(P);let T=null;if(x!=null){T=typeof x=="string"?document.createTextNode(x):x;let w=s("span",{className:"lg-label-suffix"});w.appendChild(T),z.appendChild(w)}let i=d?s("div",{className:"lg-label-hint"},d):null;p.classList.add(`lg-label--${c}`),p.classList.add(`lg-label--${a}`),v==="title"&&p.classList.add("lg-label--title"),g(r),N&&p.classList.add("is-disabled"),p.appendChild(z),i&&p.appendChild(i),S&&z.addEventListener("click",S);function g(w){p.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),p.classList.add(`lg-label--${w}`)}function m(w){M.textContent=w}function y(w){g(w)}function h(w){w&&!P.isConnected&&z.appendChild(P),!w&&P.isConnected&&P.remove(),w?z.setAttribute("aria-required","true"):z.removeAttribute("aria-required")}function H(w){p.classList.toggle("is-disabled",!!w)}function R(w){!w&&i&&i.isConnected?i.remove():w&&i?i.textContent=w:w&&!i&&p.appendChild(s("div",{className:"lg-label-hint"},w))}return{root:p,labelEl:z,hintEl:i,setText:m,setTone:y,setRequired:h,setDisabled:H,setHint:R}}var qe=B(()=>{J()});function Gn(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function Un(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function qn(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(c=>String(c.brand||c.brandName||c.brandVersion||c)),o=n.some(c=>/Edge/i.test(c)||/Microsoft Edge/i.test(c)),r=n.some(c=>/Opera/i.test(c)||/OPR/i.test(c)),a=n.some(c=>/Chrome|Chromium/i.test(c));if(o)return"Edge";if(r)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Kn(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function Z(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Yn(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=Kn(),a=Un(),c=qn(),v=window.screen||{},A=window.visualViewport,N=Math.round(window.innerWidth||document.documentElement.clientWidth||0),b=Math.round(window.innerHeight||document.documentElement.clientHeight||0),d=Math.round(A?.width??N),l=Math.round(A?.height??b),x=Math.round(v.width||0),S=Math.round(v.height||0),p=Math.round(v.availWidth||x),z=Math.round(v.availHeight||S),M=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:c,os:a,viewportWidth:N,viewportHeight:b,visualViewportWidth:d,visualViewportHeight:l,screenWidth:x,screenHeight:S,availScreenWidth:p,availScreenHeight:z,dpr:M,orientation:Gn()}}function yt(){return Z().surface==="discord"}function Yn(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var ge=B(()=>{});function Jn(e){try{return!!e.isSecureContext}catch{return!1}}function Ke(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function wt(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Xn(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Qn(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Zn(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function er(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Jn(U))return{ok:!1,method:"clipboard-write"};if(!await Xn())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function tr(e,t){try{let n=t||Ke(),o=Qn(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function nr(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=Zn(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=wt()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:a}}async function Ye(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await er(n);if(o.ok)return o;let r=t.injectionRoot||Ke(t.valueNode||void 0),a=tr(n,r);if(a.ok)return a;let c=nr(n,t.valueNode||null);if(c.ok)return c;if(!t.disablePromptFallback)try{return window.prompt(yt()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function kt(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let a=document.createElement("div");a.textContent=r,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let c=Ke(e);c.appendChild?c.appendChild(a):document.body.appendChild(a);let v=e.getBoundingClientRect();a.style.left=`${v.right-8}px`,a.style.top=`${v.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let a=(t()??"").toString(),c=await Ye(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(c),c.ok?c.method==="clipboard-write"||c.method==="execCommand"||c.method==="prompt"?o("Copi\xE9"):c.method==="selection"&&o(c.hint||(wt()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Et=B(()=>{Le();ge();try{U.__copyText=Ye}catch{}try{ot&&(at.__copyText=Ye)}catch{}});function xe(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Re(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=xe(e);return o&&n.appendChild(o),n}function rr(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function oe(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:a,iconRight:c,loading:v=!1,tooltip:A,type:N="button",onClick:b,disabled:d=!1,fullWidth:l=!1}=e,x=s("button",{className:"btn",id:n});x.type=N,o==="primary"&&x.classList.add("primary"),r==="sm"&&x.classList.add("btn--sm"),A&&(x.title=A),l&&(x.style.width="100%");let S=rr(),p=a?Re(a,"left"):null,z=c?Re(c,"right"):null,M=document.createElement("span");M.className="btn-label";let P=xe(t);P&&M.appendChild(P),!P&&(p||z)&&x.classList.add("btn--icon"),x.appendChild(S),p&&x.appendChild(p),x.appendChild(M),z&&x.appendChild(z);let T=d||v;x.disabled=T,x.setAttribute("aria-busy",String(!!v)),S.style.display=v?"inline-block":"none",b&&x.addEventListener("click",b);let i=x;return i.setLoading=g=>{x.setAttribute("aria-busy",String(!!g)),S.style.display=g?"inline-block":"none",x.disabled=g||d},i.setDisabled=g=>{x.disabled=g||x.getAttribute("aria-busy")==="true"},i.setLabel=g=>{M.replaceChildren();let m=xe(g);m&&M.appendChild(m),!m&&(p||z)?x.classList.add("btn--icon"):x.classList.remove("btn--icon")},i.setIconLeft=g=>{if(g==null){p?.remove();return}p?p.replaceChildren(xe(g)):x.insertBefore(Re(g,"left"),M)},i.setIconRight=g=>{if(g==null){z?.remove();return}z?z.replaceChildren(xe(g)):x.appendChild(Re(g,"right"))},i}var Je=B(()=>{J()});function or(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}function ar(){De||(De=!0,window.addEventListener("keydown",Q,!0),window.addEventListener("keypress",Q,!0),window.addEventListener("keyup",Q,!0),document.addEventListener("keydown",Q,!0),document.addEventListener("keypress",Q,!0),document.addEventListener("keyup",Q,!0))}function ir(){De&&(De=!1,window.removeEventListener("keydown",Q,!0),window.removeEventListener("keypress",Q,!0),window.removeEventListener("keyup",Q,!0),document.removeEventListener("keydown",Q,!0),document.removeEventListener("keypress",Q,!0),document.removeEventListener("keyup",Q,!0))}function sr(e){return ve.size===0&&ar(),ve.add(e),()=>{ve.delete(e),ve.size===0&&ir()}}function lr(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function cr(e,t){return t?e.replace(t,""):e}function dr(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function Lt(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:a=!1,allowDashes:c=!1,allowUnderscore:v=!1,maxLength:A,blockGameKeys:N=!0,debounceMs:b=0,onChange:d,onEnter:l,label:x}=e,S=s("div",{className:"lg-input-wrap"}),p=s("input",{className:"input",id:t,placeholder:n});if(typeof A=="number"&&A>0&&(p.maxLength=A),o&&(p.value=o),x){let w=s("div",{className:"lg-input-label"},x);S.appendChild(w)}S.appendChild(p);let z=lr(r,a,c,v),M=()=>{let w=p.selectionStart??p.value.length,V=p.value.length,$=cr(p.value,z);if($!==p.value){p.value=$;let W=V-$.length,D=Math.max(0,w-W);p.setSelectionRange(D,D)}},P=dr(()=>d?.(p.value),b);p.addEventListener("input",()=>{M(),P()}),p.addEventListener("paste",()=>queueMicrotask(()=>{M(),P()})),p.addEventListener("keydown",w=>{w.key==="Enter"&&l?.(p.value)});let T=N?sr(p):()=>{};function i(){return p.value}function g(w){p.value=w??"",M(),P()}function m(){p.focus()}function y(){p.blur()}function h(w){p.disabled=!!w}function H(){return document.activeElement===p}function R(){T()}return{root:S,input:p,getValue:i,setValue:g,focus:m,blur:y,setDisabled:h,isFocused:H,destroy:R}}var De,ve,Q,Tt=B(()=>{J();De=!1,ve=new Set;Q=e=>{let t=or();if(t){for(let n of ve)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}}});function q(e,t,n){return Math.min(n,Math.max(t,e))}function we({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,a=n*t,c=a*(1-Math.abs(r%2-1)),v=0,A=0,N=0;switch(Math.floor(r)){case 0:v=a,A=c;break;case 1:v=c,A=a;break;case 2:A=a,N=c;break;case 3:A=c,N=a;break;case 4:v=c,N=a;break;default:v=a,N=c;break}let d=n-a,l=Math.round((v+d)*255),x=Math.round((A+d)*255),S=Math.round((N+d)*255);return{r:q(l,0,255),g:q(x,0,255),b:q(S,0,255),a:q(o,0,1)}}function Ct({r:e,g:t,b:n,a:o}){let r=q(e,0,255)/255,a=q(t,0,255)/255,c=q(n,0,255)/255,v=Math.max(r,a,c),A=Math.min(r,a,c),N=v-A,b=0;N!==0&&(v===r?b=60*((a-c)/N%6):v===a?b=60*((c-r)/N+2):b=60*((r-a)/N+4)),b<0&&(b+=360);let d=v===0?0:N/v;return{h:b,s:d,v,a:q(o,0,1)}}function Qe({r:e,g:t,b:n}){let o=r=>q(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function pr({r:e,g:t,b:n,a:o}){let r=q(Math.round(o*255),0,255);return`${Qe({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function ye({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function me(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(c=>c+c).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r:o,g:r,b:a,a:n/255}}function Xe(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return me(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(A=>A.trim());if(o.length<3)return null;let r=Number(o[0]),a=Number(o[1]),c=Number(o[2]),v=o[3]!=null?Number(o[3]):1;return[r,a,c,v].some(A=>Number.isNaN(A))?null:{r,g:a,b:c,a:v}}return null}function ur(e,t){let n=Xe(e)??me(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=q(t,0,1)),Ct(n)}function gr(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function mr(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function le(e){let t=we(e),n=we({...e,a:1});return{hsva:{...e},hex:Qe(n),hexa:pr(t),rgba:ye(t),alpha:e.a}}function St(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:a=!1,detectMobile:c,onInput:v,onChange:A}=e,b=c?c():Z().platform==="mobile",d=ur(o,r),l=re({id:t,className:"color-picker",title:n,padding:b?"md":"lg",variant:"soft",expandable:!b,defaultExpanded:!b&&a});l.classList.add(b?"color-picker--mobile":"color-picker--desktop");let x=l.querySelector(".card-header");x&&x.classList.add("color-picker__header");let S=x?.querySelector(".card-title"),p=s("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});S?S.prepend(p):x?x.prepend(p):l.prepend(p);let z=l.querySelector(".card-toggle");!b&&z&&p.addEventListener("click",()=>{l.classList.contains("card--collapsed")&&z.click()});let M=l.querySelector(".card-collapse"),P=null,T=null,i=null,g=null,m=null,y=null,h=null,H=null,R=null,w="hex";function V(E){let L=le(d);E==="input"?v?.(L):A?.(L)}function $(){let E=le(d);if(p.style.setProperty("--cp-preview-color",E.rgba),p.setAttribute("aria-label",`${n}: ${E.hexa}`),!b&&P&&T&&i&&g&&m&&y&&h){let L=we({...d,s:1,v:1,a:1}),I=ye(L);P.style.setProperty("--cp-palette-hue",I),T.style.left=`${d.s*100}%`,T.style.top=`${(1-d.v)*100}%`,i.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ye({...L,a:1})} 0%, ${ye({...L,a:0})} 100%)`),g.style.top=`${(1-d.a)*100}%`,m.style.setProperty("--cp-hue-color",ye(we({...d,v:1,s:1,a:1}))),y.style.left=`${d.h/360*100}%`;let f=d.a===1?E.hex:E.hexa,u=E.rgba,k=w==="hex"?f:u;h!==document.activeElement&&(h.value=k),h.setAttribute("aria-label",`${w.toUpperCase()} code for ${n}`),h.placeholder=w==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",w==="hex"?h.maxLength=9:h.removeAttribute("maxLength"),h.dataset.mode=w,H&&(H.textContent=w.toUpperCase(),H.setAttribute("aria-label",w==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),H.setAttribute("aria-pressed",w==="rgba"?"true":"false"),H.classList.toggle("is-alt",w==="rgba"))}R&&R!==document.activeElement&&(R.value=E.hex)}function W(E,L=null){d={h:(E.h%360+360)%360,s:q(E.s,0,1),v:q(E.v,0,1),a:q(E.a,0,1)},$(),L&&V(L)}function D(E,L=null){W(Ct(E),L)}function _(E,L,I){E.addEventListener("pointerdown",f=>{f.preventDefault();let u=f.pointerId,k=O=>{O.pointerId===u&&L(O)},C=O=>{O.pointerId===u&&(document.removeEventListener("pointermove",k),document.removeEventListener("pointerup",C),document.removeEventListener("pointercancel",C),I?.(O))};L(f),document.addEventListener("pointermove",k),document.addEventListener("pointerup",C),document.addEventListener("pointercancel",C)})}if(!b&&M){let E=M.querySelector(".card-body");if(E){E.classList.add("color-picker__body"),T=s("div",{className:"color-picker__palette-cursor"}),P=s("div",{className:"color-picker__palette"},T),g=s("div",{className:"color-picker__alpha-thumb"}),i=s("div",{className:"color-picker__alpha"},g),y=s("div",{className:"color-picker__hue-thumb"}),m=s("div",{className:"color-picker__hue"},y);let L=s("div",{className:"color-picker__main"},P,i),I=s("div",{className:"color-picker__hue-row"},m),f=Lt({blockGameKeys:!0});h=f.input,h.classList.add("color-picker__hex-input"),h.value="",h.maxLength=9,h.spellcheck=!1,h.inputMode="text",h.setAttribute("aria-label",`Hex code for ${n}`),H=s("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),f.root.classList.add("color-picker__hex-wrap");let u=s("div",{className:"color-picker__hex-row"},H,f.root);E.replaceChildren(L,I,u),_(P,C=>{if(!P||!T)return;let O=P.getBoundingClientRect(),j=q((C.clientX-O.left)/O.width,0,1),ce=q((C.clientY-O.top)/O.height,0,1);W({...d,s:j,v:1-ce},"input")},()=>V("change")),_(i,C=>{if(!i)return;let O=i.getBoundingClientRect(),j=q((C.clientY-O.top)/O.height,0,1);W({...d,a:1-j},"input")},()=>V("change")),_(m,C=>{if(!m)return;let O=m.getBoundingClientRect(),j=q((C.clientX-O.left)/O.width,0,1);W({...d,h:j*360},"input")},()=>V("change")),H.addEventListener("click",()=>{if(w=w==="hex"?"rgba":"hex",h){let C=le(d);h.value=w==="hex"?d.a===1?C.hex:C.hexa:C.rgba}$(),h?.focus(),h?.select()}),h.addEventListener("input",()=>{if(w==="hex"){let C=gr(h.value);if(C!==h.value){let O=h.selectionStart??C.length;h.value=C,h.setSelectionRange(O,O)}}});let k=()=>{let C=h.value;if(w==="hex"){let O=me(C);if(!O){h.value=d.a===1?le(d).hex:le(d).hexa;return}let j=C.startsWith("#")?C.slice(1):C,ce=j.length===4||j.length===8;O.a=ce?O.a:d.a,D(O,"change")}else{let O=mr(C),j=Xe(O);if(!j){h.value=le(d).rgba;return}D(j,"change")}};h.addEventListener("change",k),h.addEventListener("blur",k),h.addEventListener("keydown",C=>{C.key==="Enter"&&(k(),h.blur())})}}return b&&(M&&M.remove(),R=s("input",{className:"color-picker__native",type:"color",value:Qe(we({...d,a:1}))}),p.addEventListener("click",()=>R.click()),R.addEventListener("input",()=>{let E=me(R.value);E&&(E.a=d.a,D(E,"input"),V("change"))}),l.appendChild(R)),$(),{root:l,isMobile:b,getValue:()=>le(d),setValue:(E,L)=>{let I=Xe(E)??me(E)??me("#FFFFFF");I&&(typeof L=="number"&&(I.a=L),D(I,null))}}}var Mt=B(()=>{J();Se();ge();Tt()});async function Ht(){let e=await je(br,{version:1,defaults:Ae,sanitize:r=>({ui:{expandedCards:Te(Ae.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let a=e.get();e.update({ui:{...a.ui,...r,expandedCards:Te(a.ui.expandedCards,r.expandedCards)}})}function n(r,a){let c=e.get();e.update({ui:{...c.ui,expandedCards:{...c.ui.expandedCards,[r]:!!a}}})}function o(r){let a=e.get();n(r,!a.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}var Ae,br,Nt=B(()=>{be();Ae={ui:{expandedCards:{style:!1,license:!1,system:!1}}},br="tab-settings"});function Rt(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function fr(){return Object.keys(ie).map(e=>({value:e,label:Rt(e)}))}function xr(e){return Rt(e.replace(/^--/,""))}function vr(e){return e.alpha<1?e.rgba:e.hex}function yr(e){let t=e?.defaultExpanded??!1,n=e?.onExpandChange,o=(p,z)=>{let M=s("div",{className:"kv kv--inline-mobile"}),P=s("label",{},p),T=s("div",{className:"ro"});return typeof z=="string"?T.textContent=z:T.append(z),M.append(P,T),M},r=s("code",{},"\u2014"),a=s("span",{},"\u2014"),c=s("span",{},"\u2014"),v=s("span",{},"\u2014"),A=s("span",{},"\u2014"),N=s("span",{},"\u2014"),b=()=>{let p=Z();c.textContent=p.surface,v.textContent=p.platform,A.textContent=p.browser??"Unknown",N.textContent=p.os??"Unknown",r.textContent=p.host,a.textContent=p.isInIframe?"Yes":"No"},d=oe({label:"Copy JSON",variant:"primary",size:"sm"});kt(d,()=>{let p=Z();return JSON.stringify(p,null,2)});let l=s("div",{style:"width:100%;display:flex;justify-content:center;"},d),x=re({title:"System",variant:"soft",padding:"lg",footer:l,expandable:!0,defaultExpanded:t,onExpandChange:n},o("Surface",c),o("Platform",v),o("Browser",A),o("OS",N),o("Host",r),o("Iframe",a)),S=()=>{document.hidden||b()};return document.addEventListener("visibilitychange",S),b(),x.__cleanup=()=>document.removeEventListener("visibilitychange",S),x}function Dt(e){return new se({id:"tab-settings",label:"Settings",mount(t){let n=s("section",{id:"settings",className:"lg-section"});n.style.display="grid",n.style.gap="12px",t.appendChild(n);let o=null,r;return(async()=>{try{o=await Ht()}catch{o={get:()=>Ae,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),c=Object.keys(ie),v=e.getCurrentTheme?.()??e.initialTheme,A=c.includes(v)?v:c[0]??"dark",N=A,b=Ne({text:"Theme",tone:"muted",size:"lg"}),d=ue({options:fr(),value:A,onChange:M=>{N=M,e.applyTheme(M),p(M)}}),l=s("div",{className:"settings-theme-grid"}),x=re({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:M=>o.setCardExpanded("style",M)},s("div",{className:"kv settings-theme-row"},b.root,d.root),l);function S(M,P,T){let i=ie[M];i&&(i[P]=vr(T),N===M&&e.applyTheme(M))}function p(M){let P=ie[M];if(l.replaceChildren(),!!P)for(let T of hr){let i=P[T];if(i==null)continue;let g=St({label:xr(T),value:i,defaultExpanded:!1,onInput:m=>S(M,T,m),onChange:m=>S(M,T,m)});l.appendChild(g.root)}}p(A);let z=yr({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:M=>o.setCardExpanded("system",M)});n.appendChild(x),n.appendChild(z),r=z.__cleanup})(),()=>{try{r?.()}catch{}t.replaceChildren()}}})}var hr,At=B(()=>{J();be();Se();Ue();qe();ge();Ve();Et();Je();Mt();Nt();hr=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"]});function ke(e){return e<10?`0${e}`:String(e)}function Y(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function Ze(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${ke(n)}:${ke(o)}`}function ne(e,t){let n=Y(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return Ze(r)}function wr(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function kr(e,t,n){return(e%12+(n?12:0))*60+t}function Er(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function _t(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:a=!1,allowOvernight:c=!0,labels:v={from:"From",to:"To"},picker:A="auto",format:N="auto",useNativeOn:b,onChange:d}=e,l={start:ne(n,r),end:ne(o,r)},x=s("div",{className:"time-range",id:t});x.classList.add("time-range--stacked");let S=Z();if(A==="native"||A==="auto"&&(b?.(S)??Er(S)))return z();return M();function z(){let i=s("div",{className:"time-range-field",role:"group"}),g=s("span",{className:"time-range-label"},v.from||"From"),m=s("input",{className:"input time-range-input",type:"time",step:String(r*60),value:l.start}),y=s("div",{className:"time-range-field",role:"group"}),h=s("span",{className:"time-range-label"},v.to||"To"),H=s("input",{className:"input time-range-input",type:"time",step:String(r*60),value:l.end});i.append(g,m),y.append(h,H),x.append(i,y);function R(){m.value=l.start,H.value=l.end}function w(){d?.($())}function V(E){let L=E.target,I=L===m,f=ne(L.value||(I?l.start:l.end),r);I?(l.start=f,!c&&Y(l.end)<Y(l.start)&&(l.end=l.start)):(l.end=f,!c&&Y(l.end)<Y(l.start)&&(l.start=l.end)),R(),w()}m.addEventListener("change",V),m.addEventListener("blur",V),H.addEventListener("change",V),H.addEventListener("blur",V),a&&D(!0);function $(){return{...l}}function W(E){if(E.start&&(l.start=ne(E.start,r)),E.end&&(l.end=ne(E.end,r)),!c){let L=Y(l.start);Y(l.end)<L&&(l.end=l.start)}R(),w()}function D(E){m.disabled=E,H.disabled=E,x.classList.toggle("is-disabled",!!E)}function _(){m.removeEventListener("change",V),m.removeEventListener("blur",V),H.removeEventListener("change",V),H.removeEventListener("blur",V),x.replaceChildren()}return{root:x,getValue:$,setValue:W,setDisabled:D,destroy:_}}function M(){let i=s("label",{className:"time-range-field"}),g=s("span",{className:"time-range-label"},v.from||"From"),m=s("label",{className:"time-range-field"}),y=s("span",{className:"time-range-label"},v.to||"To"),h=N==="12h"||N==="auto"&&T(),H=P(l.start,h),R=P(l.end,h);i.append(g,H.container),m.append(y,R.container),x.append(i,m),a&&W(!0),$(),H.onAnyChange(()=>{l.start=H.to24h(r),!c&&Y(l.end)<Y(l.start)&&(l.end=l.start,R.setFrom24h(l.end)),d?.(w())}),R.onAnyChange(()=>{l.end=R.to24h(r),!c&&Y(l.end)<Y(l.start)&&(l.start=l.end,H.setFrom24h(l.start)),d?.(w())});function w(){return{...l}}function V(_){if(_.start&&(l.start=ne(_.start,r)),_.end&&(l.end=ne(_.end,r)),!c){let E=Y(l.start);Y(l.end)<E&&(l.end=l.start)}$(),d?.(w())}function $(){H.setFrom24h(l.start),R.setFrom24h(l.end)}function W(_){H.setDisabled(_),R.setDisabled(_),x.classList.toggle("is-disabled",!!_)}function D(){H.destroy(),R.destroy(),x.replaceChildren()}return{root:x,getValue:w,setValue:V,setDisabled:W,destroy:D}}function P(i,g){let m=s("div",{className:"time-picker"}),y=(u,k=2)=>{u.classList.add("time-picker-compact"),u.style.setProperty("--min-ch",String(k))},h=g?Array.from({length:12},(u,k)=>{let C=k+1;return{value:String(C),label:ke(C)}}):Array.from({length:24},(u,k)=>({value:String(k),label:ke(k)})),H=ue({size:"sm",options:h,placeholder:"HH",onChange:()=>_()});y(H.root,2);let R=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),w=Array.from({length:Math.floor(60/R)},(u,k)=>{let C=k*R;return{value:String(C),label:ke(C)}}),V=ue({size:"sm",options:w,placeholder:"MM",onChange:()=>_()});y(V.root,2);let $=g?ue({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>_()}):null;$&&y($.root,3),m.append(H.root,V.root,...$?[$.root]:[]);let W=null;function D(u){W=u}function _(){W?.()}function E(u){let k=Y(u);if(g){let C=wr(k);H.setValue(String(C.h12),{notify:!1}),V.setValue(String(Math.floor(C.m/R)*R),{notify:!1}),$.setValue(C.pm?"pm":"am",{notify:!1})}else{let C=Math.floor(k/60),O=k%60;H.setValue(String(C),{notify:!1}),V.setValue(String(Math.floor(O/R)*R),{notify:!1})}}function L(u){let k=parseInt(V.getValue()||"0",10)||0;if(g){let C=parseInt(H.getValue()||"12",10)||12,O=($?.getValue()||"am")==="pm",j=kr(C,k,O);return ne(Ze(j),u)}else{let O=(parseInt(H.getValue()||"0",10)||0)*60+k;return ne(Ze(O),u)}}function I(u){H.setDisabled(u),V.setDisabled(u),$?.setDisabled(u),m.classList.toggle("is-disabled",!!u)}function f(){m.replaceChildren()}return{container:m,onAnyChange:D,setFrom24h:E,to24h:L,setDisabled:I,destroy:f}}function T(){try{let g=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(g)}catch{return!1}}}var zt=B(()=>{J();Ue();ge()});function Pt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Lr(e){let t=Pt(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,a,c)=>`${a}<span class="tok tok-comm">${c}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function Ot(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function It(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:a=!1,mode:c="plain",showTimestamps:v=!0,autoScroll:A=!0}=e,N=s("div",{className:"log",id:t});n&&N.classList.add(...n.split(" ").filter(Boolean)),a&&N.classList.add("log--wrap");let b=s("div",{className:"log-viewport"}),d=s("div",{className:"log-lines"});b.appendChild(d),N.appendChild(b),o!=null&&(N.style.blockSize=typeof o=="number"?`${o}px`:String(o));let l=c,x=r,S=new Map;function p(D){return l==="js"?Lr(D):Pt(D)}function z(D){return D?S.get(D)?.body??d:d}function M(D){let _=typeof D=="string"?{text:D}:D||{text:""},E=z(_.groupKey);if(_.key){let f=Array.from(E.querySelectorAll(`.log-line[data-key="${_.key}"]`)).pop();if(f){_.level&&(f.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),f.classList.add(`log-level--${_.level}`));let u=f.querySelector(".log-time");v&&u&&(u.textContent=Ot(_.time));let k=f.querySelector(".log-text");k&&(k.innerHTML=p(_.text)),A&&y();return}}let L=document.createElement("div");if(L.className="log-line",_.level&&L.classList.add(`log-level--${_.level}`),_.key&&(L.dataset.key=_.key),v){let f=document.createElement("span");f.className="log-time",f.textContent=Ot(_.time),L.appendChild(f)}let I=document.createElement("span");I.className="log-text",I.innerHTML=p(_.text),L.appendChild(I),E.appendChild(L),R(),A&&y()}function P(D){for(let _ of D)M(_)}function T(){d.replaceChildren(),S.clear()}function i(D){l=D,y()}function g(D){N.classList.toggle("log--wrap",!!D),y()}function m(D){x=Math.max(1,Math.floor(D||1))}function y(){requestAnimationFrame(()=>{b.scrollTop=b.scrollHeight})}function h(){let D=0;for(let _=0;_<d.children.length;_+=1){let E=d.children[_];(E.classList.contains("log-line")||E.classList.contains("log-group"))&&(D+=1)}return D}function H(){let D=d.firstElementChild;if(!D)return!1;if(D.classList.contains("log-group")){let _=D.dataset.groupKey;_&&S.delete(_)}return D.remove(),!0}function R(){let D=h();for(;D>x&&H();)D--}function w(D,_){let E=_?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(S.has(E))return E;let L=document.createElement("div");L.className="log-group",L.dataset.groupKey=E;let I=document.createElement("div");I.className="log-group-header",I.textContent=D;let f=document.createElement("div");f.className="log-group-body",L.append(I,f),d.appendChild(L),S.set(E,{root:L,header:I,body:f});let u=k=>{L.classList.toggle("is-collapsed",!!k)};return _?.collapsed&&u(!0),I.addEventListener("click",()=>u(!L.classList.contains("is-collapsed"))),A&&y(),E}function V(D){S.get(D)}function $(D,_){let E=S.get(D);E&&(_==null?E.root.classList.toggle("is-collapsed"):E.root.classList.toggle("is-collapsed",!!_))}let W=N;return W.add=M,W.addMany=P,W.clear=T,W.setMode=i,W.setWrap=g,W.setMaxLines=m,W.scrollToEnd=y,W.beginGroup=w,W.endGroup=V,W.toggleGroup=$,W}var Bt=B(()=>{J()});function Ft(){return new se({id:"tab-test",label:"Test",mount(e){let t=s("section",{id:"tab-test",className:"lg-section"}),n=It({height:220,mode:"js",maxLines:1e3});n.add({level:"info",text:"Log initialise"}),n.add({level:"debug",text:"const x = 42; // demo"}),n.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),n.add({level:"error",text:"new Error('Boom')"});let o=Ne({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),r=_t({start:"09:00",end:"18:00",stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:S=>console.log("Range:",S.start,"->",S.end)}),a=s("div",o.root,r.root),c=oe({label:"Appliquer",variant:"primary",onClick:()=>{let S=r.getValue();n.add({level:"info",text:`[Apply] ${S.start} -> ${S.end}`})}}),v=re({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Ge(c)},a),A=oe({label:"Clear",onClick:()=>n.clear()}),N=oe({label:"Wrap",onClick:()=>n.setWrap(!n.classList.contains("log--wrap"))}),b=!0,d=oe({label:"Mode: js",onClick:()=>{b=!b,n.setMode(b?"js":"plain"),d.setLabel(`Mode: ${b?"js":"plain"}`)}}),l=oe({label:"Add line",onClick:()=>n.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),x=re({title:"Logs",variant:"default",padding:"lg"},n,Ge(A,N,d,l));return t.appendChild(v),t.appendChild(x),e.appendChild(t),()=>{e.replaceChildren()}}})}var Vt=B(()=>{J();Je();Se();qe();be();zt();Bt()});function et(e){return[Dt({applyTheme:e.applyTheme,initialTheme:e.initialTheme,getCurrentTheme:e.getCurrentTheme}),Ft()]}var Wt=B(()=>{At();Vt()});var be=B(()=>{pt();ut();xt();Wt()});function $t(e,t,n){let o=s("div",{className:"lg-pill",id:"pill"}),r=e.map(b=>{let d=s("button",{className:"lg-tab"},b.label);return d.setAttribute("data-target",b.id),d}),a=s("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),c=a;a.addEventListener("wheel",b=>{Math.abs(b.deltaY)>Math.abs(b.deltaX)&&(b.preventDefault(),a.scrollLeft+=b.deltaY)},{passive:!1});function v(b){let d=a.getBoundingClientRect(),l=r.find(g=>g.dataset.target===b)||r[0];if(!l)return;let x=l.getBoundingClientRect(),S=x.left-d.left,p=x.width;o.style.width=`${p}px`,o.style.transform=`translateX(${S}px)`;let z=a.scrollLeft,M=z,P=z+a.clientWidth,T=S-12,i=S+p+12;T<M?a.scrollTo({left:T,behavior:"smooth"}):i>P&&a.scrollTo({left:i-a.clientWidth,behavior:"smooth"})}let A=t||(e[0]?.id??"");function N(b){A=b,r.forEach(d=>d.classList.toggle("active",d.dataset.target===b)),v(b),n(b)}return r.forEach(b=>b.addEventListener("click",()=>N(b.dataset.target))),queueMicrotask(()=>v(A)),{root:c,activate:N,recalc:()=>v(A),getActive:()=>A}}var jt=B(()=>{J()});var Gt,Ut=B(()=>{Gt=`
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
  
`});var qt,Kt=B(()=>{qt=`
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
`});var Yt,Jt=B(()=>{Yt=`
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
`});function G(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var Xt=B(()=>{});var Qt,Zt=B(()=>{Qt=`
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
`});var en,tn=B(()=>{en=`
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
`});var nn,rn=B(()=>{nn=`
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
`});var on,an=B(()=>{on=`
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
`});var sn,ln=B(()=>{sn=`
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
`});var cn,dn=B(()=>{cn=`
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
`});var pn,un=B(()=>{pn=`
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
`});var gn,mn=B(()=>{gn=`
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
`});var bn,fn=B(()=>{bn=`
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
`});var hn,xn=B(()=>{hn=`
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
`});var vn,yn=B(()=>{vn=`
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
`});var wn,kn=B(()=>{wn=`
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
`});var En,Ln=B(()=>{En=`
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
`});var Tn,Cn=B(()=>{Tn=`
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
`});var Sn,Mn=B(()=>{Sn=`
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
`});var Hn,Nn=B(()=>{Hn=`
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
`});function Rn(e){let{hostId:t="lg-slideout-root",baseCss:n,initialWidth:o,initialOpen:r,onWidthChange:a,onOpenChange:c,themes:v,initialTheme:A,onThemeChange:N,buildSections:b,initialTab:d,onTabChange:l,toggleCombo:x=F=>F.ctrlKey&&F.shiftKey&&F.key.toLowerCase()==="u",closeOnEscape:S=!0,minWidth:p=420,maxWidth:z=720}=e,M=p,P=z,{host:T,shadow:i}=vt(t);G(i,Qt,"tokens"),G(i,nn,"base"),G(i,en,"utils"),G(i,Gt,"card"),G(i,qt,"badge"),G(i,Yt,"button"),G(i,on,"input"),G(i,sn,"label"),G(i,cn,"navTabs"),G(i,pn,"searchBar"),G(i,gn,"select"),G(i,bn,"switch"),G(i,hn,"table"),G(i,vn,"timeRangePicker"),G(i,wn,"tooltip"),G(i,En,"slider"),G(i,Tn,"reorderableList"),G(i,Sn,"colorPicker"),G(i,Hn,"log"),n&&G(i,n,"external-base");let g=s("div",{className:"lg-panel",id:"panel",ariaHidden:String(!r)}),m=s("div",{className:"lg-tabbar"}),y=s("div",{className:"lg-content",id:"content"}),h=s("div",{className:"lg-resizer",title:"Resize"});g.append(m,y,h);let H=s("button",{className:"lg-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715"),R=s("div",{className:"lg-wrap"},g);i.append(R);function w(){let F=Z(),K=Math.round(U.visualViewport?.width??U.innerWidth??0);if(F.platform==="mobile"||F.os==="ios"||F.os==="android"){let de=getComputedStyle(i.host),Pe=parseFloat(de.getPropertyValue("--inset-l"))||0,Ie=parseFloat(de.getPropertyValue("--inset-r"))||0,nt=Math.max(280,K-Math.round(Pe+Ie));M=Math.min(420,Math.max(300,Math.floor(K*.66))),M=Math.min(M,nt),P=nt}else M=p,P=z}function V(F){return Math.max(M,Math.min(P,Number(F)||o))}function $(F){g.dispatchEvent(new CustomEvent("lg:open-change",{detail:{open:F},bubbles:!0})),c?.(F)}function W(F){let K=g.classList.contains("open");g.classList.toggle("open",F),g.setAttribute("aria-hidden",F?"false":"true"),F!==K&&$(F)}function D(F){let K=V(F);i.host.style.setProperty("--w",`${K}px`),a?.(K)}w(),D(o),W(r),H.addEventListener("click",F=>{F.preventDefault(),F.stopPropagation(),W(!1)});let _=F=>{let K=g.classList.contains("open");if(S&&F.key==="Escape"&&K)return void W(!1);x(F)&&W(!K)};document.addEventListener("keydown",_,{capture:!0});let E=Z(),L=!(E.platform==="mobile"||E.os==="ios"||E.os==="android"),I=!1,f=F=>{if(!I)return;F.preventDefault();let K=Math.round(U.innerWidth-F.clientX);D(K)},u=()=>{I&&(I=!1,document.body.style.cursor="",U.removeEventListener("mousemove",f),U.removeEventListener("mouseup",u))};h.addEventListener("mousedown",F=>{L&&(F.preventDefault(),I=!0,document.body.style.cursor="ew-resize",U.addEventListener("mousemove",f),U.addEventListener("mouseup",u))});let k=A,C=null,O=!1;function j(F){let K=v[F]||v[k]||{},de=i.host;O&&de.classList.add("theme-anim");for(let[Pe,Ie]of Object.entries(K))de.style.setProperty(Pe,Ie);O?(C!==null&&clearTimeout(C),C=U.setTimeout(()=>{de.classList.remove("theme-anim"),C=null},320)):O=!0,k=F,N?.(F)}let ce=()=>k;j(A);let _e=b({applyTheme:j,initialTheme:A,getCurrentTheme:ce,setHUDWidth:D,setHUDOpen:W}),ze=new he(_e,y,{applyTheme:j,getCurrentTheme:ce}),Oe=_e.map(F=>({id:F.id,label:F.label})),fe=$t(Oe,d||Oe[0]?.id||"",F=>{ze.activate(F),l?.(F)});fe.root.style.flex="1 1 auto",fe.root.style.minWidth="0",m.append(fe.root,H),ze.activate(d||Oe[0]?.id||"");let tt=()=>{fe.recalc();let F=parseInt(getComputedStyle(i.host).getPropertyValue("--w"))||o;w(),D(F)};U.addEventListener("resize",tt);function zn(){document.removeEventListener("keydown",_,{capture:!0}),U.removeEventListener("resize",tt),U.removeEventListener("mousemove",f),U.removeEventListener("mouseup",u)}return{host:T,shadow:i,wrap:R,panel:g,content:y,setOpen:W,setWidth:D,sections:_e,manager:ze,nav:fe,destroy:zn}}var Dn=B(()=>{J();jt();be();ge();Ut();Kt();Jt();Xt();Zt();tn();rn();an();ln();dn();un();mn();fn();xn();yn();kn();Ln();Cn();Mn();Nn();Le()});function An(e){let t=e.iconUrl||Tr,n=e.ariaLabel||"Open MGH",o=null,r=null,a=null,c=!1,v=null,A=null,N=["Chat","Leaderboard","Stats","Open Activity Log"],b=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function d(){let T=document.querySelector(N.map(g=>`button[aria-label="${b(g)}"]`).join(","));if(!T)return null;let i=T.parentElement;for(;i&&i!==document.body;){if(N.reduce((m,y)=>m+i.querySelectorAll(`button[aria-label="${b(y)}"]`).length,0)>=2)return i;i=i.parentElement}return null}function l(T){return T}function x(T){let i=Array.from(T.querySelectorAll("button[aria-label]"));if(!i.length)return{refBtn:null,refWrapper:null};let g=i.filter(V=>V.dataset.mghBtn!=="true"&&(V.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),m=g.length?g:i,y=m.find(V=>(V.getAttribute("aria-label")||"").toLowerCase()===Cr.toLowerCase())||null,h=m.length>=2?m.length-2:m.length-1,H=y||m[h],R=H.parentElement,w=R&&R.parentElement===T&&R.tagName==="DIV"?R:null;return{refBtn:H,refWrapper:w}}function S(T,i,g){let m=T.cloneNode(!1);m.type="button",m.setAttribute("aria-label",i),m.title=i,m.dataset.mghBtn="true",m.style.pointerEvents="auto",m.removeAttribute("id");let y=document.createElement("img");return y.src=g,y.alt="MGH",y.style.pointerEvents="none",y.style.userSelect="none",y.style.width="76%",y.style.height="76%",y.style.objectFit="contain",y.style.display="block",y.style.margin="auto",m.appendChild(y),m.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();try{e.onClick?.()}catch{}}),m}function p(){if(c)return!1;c=!0;let T=!1;try{let i=d();if(!i)return!1;v!==i&&(v=i);let{refBtn:g,refWrapper:m}=x(i);if(!g)return!1;r=i.querySelector('div[data-mgh-wrapper="true"]'),!r&&m&&(r=m.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),T=!0);let y=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=y),o||(o=S(g,n,t),r?r.appendChild(o):o.parentElement!==i&&i.appendChild(o),T=!0),r&&r.parentElement!==i&&(i.appendChild(r),T=!0);let h=i;if(h&&h!==A){try{P.disconnect()}catch{}A=h,P.observe(A,{childList:!0,subtree:!0})}return T}finally{c=!1}}p();let z=document.getElementById("App")||document.body,M=null,P=new MutationObserver(T=>{let i=T.every(m=>{let y=Array.from(m.addedNodes||[]),h=Array.from(m.removedNodes||[]),H=y.concat(h);if(H.length===0){let R=m.target;return r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))}return H.every(R=>!!(!(R instanceof HTMLElement)||r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))))}),g=T.some(m=>Array.from(m.removedNodes||[]).some(y=>y instanceof HTMLElement?!!(r&&(y===r||r.contains(y))||o&&(y===o||o.contains(y))):!1));i&&!g||M===null&&(M=window.setTimeout(()=>{if(M=null,p()&&r){let y=r.parentElement;y&&y.lastElementChild!==r&&y.appendChild(r)}},150))});return P.observe(z,{childList:!0,subtree:!0}),a=()=>P.disconnect(),()=>{try{a?.()}catch{}try{r?.remove()}catch{}}}var Tr,Cr,_n=B(()=>{Tr="https://i.imgur.com/IMkhMur.png",Cr="Stats"});var Sr=In(()=>{Fe();Ve();dt();be();Dn();_n();(async function(){"use strict";let e=rt();ct();let t=Rn({hostId:"lg-slideout-root",initialWidth:e.width,initialOpen:e.open,onWidthChange:n=>ae(te.width,n),onOpenChange:n=>ae(te.open,n),themes:ie,initialTheme:e.theme,onThemeChange:n=>ae(te.theme,n),buildSections:n=>et({applyTheme:n.applyTheme,initialTheme:n.initialTheme,getCurrentTheme:n.getCurrentTheme}),initialTab:e.tab,onTabChange:n=>ae(te.tab,n)});An({onClick:()=>t.setOpen(!0)})})()});Sr();})();
