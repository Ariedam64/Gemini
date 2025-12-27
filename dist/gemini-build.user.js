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
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @resource     ICON https://imgur.com/a/nf1ZKbp
// ==/UserScript==
"use strict";(()=>{var ln=Object.defineProperty;var cn=(t,e,n)=>e in t?ln(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ee=(t,e,n)=>cn(t,typeof e!="symbol"?e+"":e,n);function m(t,e={},...n){let r=document.createElement(t);for(let[o,a]of Object.entries(e||{}))a!=null&&(o==="style"&&typeof a=="object"?Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}function et(t="mgh-root"){let e=document.createElement("div");e.id=t,Object.assign(e.style,{all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"}),(document.body||document.documentElement).appendChild(e);let n=e.attachShadow({mode:"open"});return{host:e,shadow:n}}function tt(t,e,n){let r=m("div",{className:"lg-pill",id:"pill"}),o=t.map(b=>{let l=m("button",{className:"lg-tab"},b.label);return l.setAttribute("data-target",b.id),l}),a=m("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=a;a.addEventListener("wheel",b=>{Math.abs(b.deltaY)>Math.abs(b.deltaX)&&(b.preventDefault(),a.scrollLeft+=b.deltaY)},{passive:!1});function c(b){let l=a.getBoundingClientRect(),s=o.find(g=>g.dataset.target===b)||o[0];if(!s)return;let p=s.getBoundingClientRect(),E=p.left-l.left,u=p.width;r.style.width=`${u}px`,r.style.transform=`translateX(${E}px)`;let y=a.scrollLeft,x=y,C=y+a.clientWidth,L=E-12,h=E+u+12;L<x?a.scrollTo({left:L,behavior:"smooth"}):h>C&&a.scrollTo({left:h-a.clientWidth,behavior:"smooth"})}let d=e||(t[0]?.id??"");function f(b){d=b,o.forEach(l=>l.classList.toggle("active",l.dataset.target===b)),c(b),n(b)}return o.forEach(b=>b.addEventListener("click",()=>f(b.dataset.target))),queueMicrotask(()=>c(d)),{root:i,activate:f,recalc:()=>c(d),getActive:()=>d}}var se=class{constructor(e){ee(this,"id");ee(this,"label");ee(this,"container",null);ee(this,"cleanupFunctions",[]);this.id=e.id,this.label=e.label}render(e){for(this.unmount();e.firstChild;)e.removeChild(e.firstChild);this.container=e;let n=this.build(e);n instanceof Promise&&n.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)});let r=e.firstElementChild;r&&r.classList.contains("gemini-section")&&r.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(e,n){let r=n?`gemini-section ${n}`:"gemini-section";return m("section",{id:e,className:r})}addCleanup(e){this.cleanupFunctions.push(e)}createGrid(e="12px"){let n=m("div");return n.style.display="grid",n.style.gap=e,n}executeCleanup(){for(let e of this.cleanupFunctions)try{e()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var me=class{constructor(e,n,r){ee(this,"sections");ee(this,"activeId",null);ee(this,"container");ee(this,"theme");this.sections=new Map(e.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(e){if(this.activeId!==e){if(!this.sections.has(e))throw new Error(`[Gemini] Unknown section: ${e}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=e,this.sections.get(e).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function fe(t,e){try{let n=JSON.stringify(e);GM_setValue(t,n)}catch(n){console.error(`[Gemini] Failed to save key "${t}" to storage:`,n)}}function oe(t,e){try{let n=GM_getValue(t);return n==null?e:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${t}" from storage, using default:`,n),e}}var nt="gemini.sections";function ot(){let t=oe(nt,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function dn(t){fe(nt,t)}async function rt(t){return ot()[t]}function at(t,e){let n=ot();dn({...n,[t]:e})}function Ee(t,e){return{...t,...e??{}}}async function it(t){let e=await rt(t.path),n;t.migrate?n=t.migrate(e):n=e??{},n=Object.assign((f=>JSON.parse(JSON.stringify(f)))(t.defaults),n),t.sanitize&&(n=t.sanitize(n));function o(){at(t.path,n)}function a(){return n}function i(f){n=t.sanitize?t.sanitize(f):f,o()}function c(f){let l=Object.assign((s=>JSON.parse(JSON.stringify(s)))(n),{});typeof f=="function"?f(l):Object.assign(l,f),n=t.sanitize?t.sanitize(l):l,o()}function d(){o()}return{get:a,set:i,update:c,save:d}}async function be(t,e){let{path:n=t,...r}=e;return it({path:n,...r})}var pn=0,Me=new Map;function re(t={},...e){let{id:n,className:r,variant:o="default",padding:a="md",interactive:i=!1,expandable:c=!1,defaultExpanded:d=!0,onExpandChange:f,mediaTop:b,title:l,subtitle:s,badge:p,actions:E,footer:u,divider:y=!1,tone:x="neutral",stateKey:C}=t,L=m("div",{className:"card",id:n,tabIndex:i?0:void 0});L.classList.add(`card--${o}`,`card--p-${a}`),i&&L.classList.add("card--interactive"),x!=="neutral"&&L.classList.add(`card--tone-${x}`),r&&L.classList.add(...r.split(" ").filter(Boolean)),c&&L.classList.add("card--expandable");let h=c?C??n??(typeof l=="string"?`title:${l}`:null):null,g=!c||d;h&&Me.has(h)&&(g=!!Me.get(h));let k=null,M=null,S=null,P=null,W=null,w=n?`${n}-collapse`:`card-collapse-${++pn}`,F=()=>{if(P!==null&&(cancelAnimationFrame(P),P=null),W){let H=W;W=null,H()}},j=(H,N)=>{if(!S)return;F();let T=S;if(T.setAttribute("aria-hidden",String(!H)),!N){T.classList.remove("card-collapse--animating"),T.style.display=H?"":"none",T.style.height="",T.style.opacity="";return}if(T.classList.add("card-collapse--animating"),T.style.display="",H){T.style.height="auto";let z=T.scrollHeight;if(!z){T.classList.remove("card-collapse--animating"),T.style.display="",T.style.height="",T.style.opacity="";return}T.style.height="0px",T.style.opacity="0",T.offsetHeight,P=requestAnimationFrame(()=>{P=null,T.style.height=`${z}px`,T.style.opacity="1"})}else{let z=T.scrollHeight;if(!z){T.classList.remove("card-collapse--animating"),T.style.display="none",T.style.height="",T.style.opacity="";return}T.style.height=`${z}px`,T.style.opacity="1",T.offsetHeight,P=requestAnimationFrame(()=>{P=null,T.style.height="0px",T.style.opacity="0"})}let v=()=>{T.classList.remove("card-collapse--animating"),T.style.height="",H||(T.style.display="none"),T.style.opacity=""},I=null,O=z=>{z.target===T&&(I!==null&&(clearTimeout(I),I=null),T.removeEventListener("transitionend",O),T.removeEventListener("transitioncancel",O),W=null,v())};W=()=>{I!==null&&(clearTimeout(I),I=null),T.removeEventListener("transitionend",O),T.removeEventListener("transitioncancel",O),W=null,v()},T.addEventListener("transitionend",O),T.addEventListener("transitioncancel",O),I=window.setTimeout(()=>{W?.()},420)};function G(H){let N=document.createElementNS("http://www.w3.org/2000/svg","svg");return N.setAttribute("viewBox","0 0 24 24"),N.setAttribute("width","16"),N.setAttribute("height","16"),N.innerHTML=H==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',N}function D(H,N=!0,T=!0){g=H,L.classList.toggle("card--collapsed",!g),L.classList.toggle("card--expanded",g),k&&(k.dataset.expanded=String(g),k.setAttribute("aria-expanded",String(g))),M&&(M.setAttribute("aria-expanded",String(g)),M.classList.toggle("card-toggle--collapsed",!g),M.setAttribute("aria-label",g?"Replier le contenu":"Deplier le contenu"),M.replaceChildren(G(g?"up":"down"))),c?j(g,T):S&&(S.style.display="",S.style.height="",S.style.opacity="",S.setAttribute("aria-hidden","false")),N&&f&&f(g),h&&Me.set(h,g)}if(b){let H=m("div",{className:"card-media"});H.append(b),L.appendChild(H)}let B=!!(l||s||p||E&&E.length||c);if(B){k=m("div",{className:"card-header"});let H=m("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(l){let v=m("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},l);p&&v.append(typeof p=="string"?m("span",{className:"badge"},p):p),H.appendChild(v)}if(s){let v=m("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},s);H.appendChild(v)}(H.childNodes.length||c)&&k.appendChild(H);let N=m("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),T=m("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});E?.forEach(v=>T.appendChild(v)),T.childNodes.length&&N.appendChild(T),c&&(M=m("button",{className:"card-toggle",type:"button",ariaExpanded:String(g),ariaControls:w,ariaLabel:g?"Replier le contenu":"Deplier le contenu"}),M.textContent=g?"\u25B2":"\u25BC",M.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),D(!g)}),N.appendChild(M),k.classList.add("card-header--expandable"),k.addEventListener("click",v=>{let I=v.target;I?.closest(".card-actions")||I?.closest(".card-toggle")||D(!g)})),N.childNodes.length&&k.appendChild(N),L.appendChild(k)}S=m("div",{className:"card-collapse",id:w,ariaHidden:c?String(!g):"false"}),L.appendChild(S),y&&B&&S.appendChild(m("div",{className:"card-divider"}));let R=m("div",{className:"card-body"});if(R.append(...e),S.appendChild(R),u){y&&S.appendChild(m("div",{className:"card-divider"}));let H=m("div",{className:"card-footer"});H.append(u),S.appendChild(H)}return M&&M.setAttribute("aria-controls",w),D(g,!1,!1),h&&Me.set(h,g),L}function Be(...t){return m("div",{className:"card-footer"},...t)}var Ce=!1,Le=new Set,X=t=>{let e=document.activeElement;for(let n of Le)if(e&&(e===n||n.contains(e))){t.stopImmediatePropagation(),t.stopPropagation();return}};function un(){Ce||(Ce=!0,window.addEventListener("keydown",X,!0),window.addEventListener("keypress",X,!0),window.addEventListener("keyup",X,!0),document.addEventListener("keydown",X,!0),document.addEventListener("keypress",X,!0),document.addEventListener("keyup",X,!0))}function gn(){Ce&&(Le.size>0||(Ce=!1,window.removeEventListener("keydown",X,!0),window.removeEventListener("keypress",X,!0),window.removeEventListener("keyup",X,!0),document.removeEventListener("keydown",X,!0),document.removeEventListener("keypress",X,!0),document.removeEventListener("keyup",X,!0)))}function de(t){let{id:e,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=!1,blockGameKeys:c=!0,onChange:d,onOpenChange:f}=t,b=m("div",{className:"select",id:e}),l=m("button",{className:"select-trigger",type:"button"}),s=m("span",{className:"select-value"},o),p=m("span",{className:"select-caret"},"\u25BE");l.append(s,p);let E=m("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});b.classList.add(`select--${a}`);let u=!1,y=n,x=null,C=!!i;function L(v){return v==null?o:(t.options||r).find(O=>O.value===v)?.label??o}function h(v){s.textContent=L(v),E.querySelectorAll(".select-option").forEach(I=>{let O=I.dataset.value,z=v!=null&&O===v;I.classList.toggle("selected",z),I.setAttribute("aria-selected",String(z))})}function g(v){E.replaceChildren(),v.forEach(I=>{let O=m("button",{className:"select-option"+(I.disabled?" disabled":""),type:"button",role:"option","data-value":I.value,"aria-selected":String(I.value===y),tabindex:"-1"},I.label);I.value===y&&O.classList.add("selected"),I.disabled||O.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),w(I.value,{notify:!0}),P()},{capture:!0}),E.appendChild(O)})}function k(){l.setAttribute("aria-expanded",String(u)),E.setAttribute("aria-hidden",String(!u))}function M(){let v=l.getBoundingClientRect();Object.assign(E.style,{minWidth:`${v.width}px`})}function S(){u||C||(u=!0,b.classList.add("open"),k(),M(),document.addEventListener("mousedown",B,!0),document.addEventListener("scroll",R,!0),window.addEventListener("resize",H),E.focus({preventScroll:!0}),c&&(un(),Le.add(b),x=()=>{Le.delete(b),gn()}),f?.(!0))}function P(){u&&(u=!1,b.classList.remove("open"),k(),document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",R,!0),window.removeEventListener("resize",H),l.focus({preventScroll:!0}),x?.(),x=null,f?.(!1))}function W(){u?P():S()}function w(v,I={}){let O=y;y=v,h(y),I.notify!==!1&&O!==v&&d?.(v)}function F(){return y}function j(v){let I=Array.from(E.querySelectorAll(".select-option:not(.disabled)"));if(!I.length)return;let O=I.findIndex(q=>q.classList.contains("active")),z=I[(O+(v===1?1:I.length-1))%I.length];I.forEach(q=>q.classList.remove("active")),z.classList.add("active"),z.focus({preventScroll:!0}),z.scrollIntoView({block:"nearest"})}function G(v){(v.key===" "||v.key==="Enter"||v.key==="ArrowDown")&&(v.preventDefault(),S())}function D(v){if(v.key==="Escape"){v.preventDefault(),P();return}if(v.key==="Enter"||v.key===" "){let I=E.querySelector(".select-option.active")||E.querySelector(".select-option.selected");I&&!I.classList.contains("disabled")&&(v.preventDefault(),w(I.dataset.value,{notify:!0}),P());return}if(v.key==="ArrowDown"){v.preventDefault(),j(1);return}if(v.key==="ArrowUp"){v.preventDefault(),j(-1);return}}function B(v){b.contains(v.target)||P()}function R(){u&&M()}function H(){u&&M()}function N(v){C=!!v,l.disabled=C,b.classList.toggle("disabled",C),C&&P()}function T(v){t.options=v,g(v),v.some(I=>I.value===y)||(y=null,h(null))}return b.append(l,E),l.addEventListener("pointerdown",v=>{v.preventDefault(),v.stopPropagation(),W()},{capture:!0}),l.addEventListener("keydown",G),E.addEventListener("keydown",D),g(r),n!=null?(y=n,h(y)):h(null),k(),N(C),{root:b,open:S,close:P,toggle:W,getValue:F,setValue:w,setOptions:T,setDisabled:N,destroy(){document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",R,!0),window.removeEventListener("resize",H),x?.(),x=null}}}function He(t={}){let{id:e,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:c="text",required:d=!1,disabled:f=!1,tooltip:b,hint:l,icon:s,suffix:p,onClick:E}=t,u=m("div",{className:"lg-label-wrap",id:e}),y=m("label",{className:"lg-label",...r?{htmlFor:r}:{},...b?{title:b}:{}});if(s){let w=typeof s=="string"?m("span",{className:"lg-label-ico"},s):s;w.classList?.add?.("lg-label-ico"),y.appendChild(w)}let x=m("span",{className:"lg-label-text"},n);y.appendChild(x);let C=m("span",{className:"lg-label-req",ariaHidden:"true"}," *");d&&y.appendChild(C);let L=null;if(p!=null){L=typeof p=="string"?document.createTextNode(p):p;let w=m("span",{className:"lg-label-suffix"});w.appendChild(L),y.appendChild(w)}let h=l?m("div",{className:"lg-label-hint"},l):null;u.classList.add(`lg-label--${i}`),u.classList.add(`lg-label--${a}`),c==="title"&&u.classList.add("lg-label--title"),g(o),f&&u.classList.add("is-disabled"),u.appendChild(y),h&&u.appendChild(h),E&&y.addEventListener("click",E);function g(w){u.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),u.classList.add(`lg-label--${w}`)}function k(w){x.textContent=w}function M(w){g(w)}function S(w){w&&!C.isConnected&&y.appendChild(C),!w&&C.isConnected&&C.remove(),w?y.setAttribute("aria-required","true"):y.removeAttribute("aria-required")}function P(w){u.classList.toggle("is-disabled",!!w)}function W(w){!w&&h&&h.isConnected?h.remove():w&&h?h.textContent=w:w&&!h&&u.appendChild(m("div",{className:"lg-label-hint"},w))}return{root:u,labelEl:y,hintEl:h,setText:k,setTone:M,setRequired:S,setDisabled:P,setHint:W}}function he(t){return t==null?null:typeof t=="string"?document.createTextNode(t):t}function Pe(t,e){let n=document.createElement("span");n.className=`btn-ico btn-ico--${e}`;let r=he(t);return r&&n.appendChild(r),n}function mn(){let t="http://www.w3.org/2000/svg",e=document.createElementNS(t,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.style.marginRight="6px",e.style.display="none",e.style.flexShrink="0";let n=document.createElementNS(t,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(t,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(t,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),e.appendChild(n),e}function ae(t={}){let{label:e="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:c=!1,tooltip:d,type:f="button",onClick:b,disabled:l=!1,fullWidth:s=!1}=t,p=m("button",{className:"btn",id:n});p.type=f,r==="primary"&&p.classList.add("primary"),o==="sm"&&p.classList.add("btn--sm"),d&&(p.title=d),s&&(p.style.width="100%");let E=mn(),u=a?Pe(a,"left"):null,y=i?Pe(i,"right"):null,x=document.createElement("span");x.className="btn-label";let C=he(e);C&&x.appendChild(C),!C&&(u||y)&&p.classList.add("btn--icon"),p.appendChild(E),u&&p.appendChild(u),p.appendChild(x),y&&p.appendChild(y);let L=l||c;p.disabled=L,p.setAttribute("aria-busy",String(!!c)),E.style.display=c?"inline-block":"none",b&&p.addEventListener("click",b);let h=p;return h.setLoading=g=>{p.setAttribute("aria-busy",String(!!g)),E.style.display=g?"inline-block":"none",p.disabled=g||l},h.setDisabled=g=>{p.disabled=g||p.getAttribute("aria-busy")==="true"},h.setLabel=g=>{x.replaceChildren();let k=he(g);k&&x.appendChild(k),!k&&(u||y)?p.classList.add("btn--icon"):p.classList.remove("btn--icon")},h.setIconLeft=g=>{if(g==null){u?.remove();return}u?u.replaceChildren(he(g)):p.insertBefore(Pe(g,"left"),x)},h.setIconRight=g=>{if(g==null){y?.remove();return}y?y.replaceChildren(he(g)):p.appendChild(Pe(g,"right"))},h}function fn(){try{let t=window.visualViewport,e=Math.round((t?.width??window.innerWidth)||0),n=Math.round((t?.height??window.innerHeight)||0);if(e&&n)return e>=n?"landscape":"portrait"}catch{}return"unknown"}function bn(){let t=navigator.userAgent||"",e=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(t)||e==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(t)?"android":/CrOS/i.test(t)?"chromeos":/Win/i.test(t)?"windows":/Mac/i.test(t)?"mac":/Linux/i.test(t)?"linux":"unknown"}function hn(){let t=navigator.userAgent||"",e=navigator.userAgentData;if(e&&Array.isArray(e.brands)){let n=e.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(t)?"Firefox":/CriOS/i.test(t)?"Chrome":/EdgiOS/i.test(t)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(t)?"Opera":/Edg\//i.test(t)?"Edge":/OPR\//i.test(t)||/Opera/i.test(t)?"Opera":/Firefox/i.test(t)?"Firefox":/Safari/i.test(t)&&!/Chrome|Chromium|Edg|OPR/i.test(t)?"Safari":/Brave/i.test(t)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(t)?"Chrome":"Unknown"}function xn(){let t=navigator.userAgent||"",e=navigator.userAgentData;return e&&typeof e.mobile=="boolean"?e.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Z(){let t=(()=>{try{return window.top!==window.self}catch{return!0}})(),e=vn(document.referrer),r=t&&!!e&&/(^|\.)discord(app)?\.com$/i.test(e)?"discord":"web",o=xn(),a=bn(),i=hn(),c=window.screen||{},d=window.visualViewport,f=Math.round(window.innerWidth||document.documentElement.clientWidth||0),b=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(d?.width??f),s=Math.round(d?.height??b),p=Math.round(c.width||0),E=Math.round(c.height||0),u=Math.round(c.availWidth||p),y=Math.round(c.availHeight||E),x=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:t,platform:o,browser:i,os:a,viewportWidth:f,viewportHeight:b,visualViewportWidth:l,visualViewportHeight:s,screenWidth:p,screenHeight:E,availScreenWidth:u,availScreenHeight:y,dpr:x,orientation:fn()}}function st(){return Z().surface==="discord"}function vn(t){if(!t)return null;try{return new URL(t).hostname}catch{return null}}var Re=!1,xe=new Set;function yn(t=document){let e=t.activeElement||null;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}var Q=t=>{let e=yn();if(e){for(let n of xe)if(e===n||n.contains(e)){t.stopImmediatePropagation(),t.stopPropagation();return}}};function kn(){Re||(Re=!0,window.addEventListener("keydown",Q,!0),window.addEventListener("keypress",Q,!0),window.addEventListener("keyup",Q,!0),document.addEventListener("keydown",Q,!0),document.addEventListener("keypress",Q,!0),document.addEventListener("keyup",Q,!0))}function wn(){Re&&(Re=!1,window.removeEventListener("keydown",Q,!0),window.removeEventListener("keypress",Q,!0),window.removeEventListener("keyup",Q,!0),document.removeEventListener("keydown",Q,!0),document.removeEventListener("keypress",Q,!0),document.removeEventListener("keyup",Q,!0))}function Sn(t){return xe.size===0&&kn(),xe.add(t),()=>{xe.delete(t),xe.size===0&&wn()}}function Tn(t,e,n,r){let o;switch(t){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return e&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function En(t,e){return e?t.replace(e,""):t}function Mn(t,e=0){if(!e)return t;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>t(...r),e)})}function lt(t={}){let{id:e,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:c=!1,maxLength:d,blockGameKeys:f=!0,debounceMs:b=0,onChange:l,onEnter:s,label:p}=t,E=m("div",{className:"lg-input-wrap"}),u=m("input",{className:"input",id:e,placeholder:n});if(typeof d=="number"&&d>0&&(u.maxLength=d),r&&(u.value=r),p){let w=m("div",{className:"lg-input-label"},p);E.appendChild(w)}E.appendChild(u);let y=Tn(o,a,i,c),x=()=>{let w=u.selectionStart??u.value.length,F=u.value.length,j=En(u.value,y);if(j!==u.value){u.value=j;let G=F-j.length,D=Math.max(0,w-G);u.setSelectionRange(D,D)}},C=Mn(()=>l?.(u.value),b);u.addEventListener("input",()=>{x(),C()}),u.addEventListener("paste",()=>queueMicrotask(()=>{x(),C()})),u.addEventListener("keydown",w=>{w.key==="Enter"&&s?.(u.value)});let L=f?Sn(u):()=>{};function h(){return u.value}function g(w){u.value=w??"",x(),C()}function k(){u.focus()}function M(){u.blur()}function S(w){u.disabled=!!w}function P(){return document.activeElement===u}function W(){L()}return{root:E,input:u,getValue:h,setValue:g,focus:k,blur:M,setDisabled:S,isFocused:P,destroy:W}}function K(t,e,n){return Math.min(n,Math.max(e,t))}function ye({h:t,s:e,v:n,a:r}){let o=(t%360+360)%360/60,a=n*e,i=a*(1-Math.abs(o%2-1)),c=0,d=0,f=0;switch(Math.floor(o)){case 0:c=a,d=i;break;case 1:c=i,d=a;break;case 2:d=a,f=i;break;case 3:d=i,f=a;break;case 4:c=i,f=a;break;default:c=a,f=i;break}let l=n-a,s=Math.round((c+l)*255),p=Math.round((d+l)*255),E=Math.round((f+l)*255);return{r:K(s,0,255),g:K(p,0,255),b:K(E,0,255),a:K(r,0,1)}}function ct({r:t,g:e,b:n,a:r}){let o=K(t,0,255)/255,a=K(e,0,255)/255,i=K(n,0,255)/255,c=Math.max(o,a,i),d=Math.min(o,a,i),f=c-d,b=0;f!==0&&(c===o?b=60*((a-i)/f%6):c===a?b=60*((i-o)/f+2):b=60*((o-a)/f+4)),b<0&&(b+=360);let l=c===0?0:f/c;return{h:b,s:l,v:c,a:K(r,0,1)}}function _e({r:t,g:e,b:n}){let r=o=>K(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(t)}${r(e)}${r(n)}`.toUpperCase()}function Cn({r:t,g:e,b:n,a:r}){let o=K(Math.round(r*255),0,255);return`${_e({r:t,g:e,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function ve({r:t,g:e,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${t}, ${e}, ${n}, ${o})`}function pe(t){let e=t.trim();if(!e||(e.startsWith("#")&&(e=e.slice(1)),![3,4,6,8].includes(e.length))||!/^[0-9a-fA-F]+$/.test(e))return null;(e.length===3||e.length===4)&&(e=e.split("").map(i=>i+i).join(""));let n=255;e.length===8&&(n=parseInt(e.slice(6,8),16),e=e.slice(0,6));let r=parseInt(e.slice(0,2),16),o=parseInt(e.slice(2,4),16),a=parseInt(e.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function Ae(t){if(!t)return null;let e=t.trim();if(e.startsWith("#"))return pe(e);let n=e.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(d=>d.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),c=r[3]!=null?Number(r[3]):1;return[o,a,i,c].some(d=>Number.isNaN(d))?null:{r:o,g:a,b:i,a:c}}return null}function Ln(t,e){let n=Ae(t)??pe(t??"")??{r:244,g:67,b:54,a:1};return typeof e=="number"&&(n.a=K(e,0,1)),ct(n)}function Hn(t){return`#${t.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Pn(t){let e=t.trim();return e&&(/^rgba?\s*\(/i.test(e)?e=e.replace(/^rgba?/i,"rgba"):(e=e.replace(/^\(?(.*)\)?$/,"$1"),e=`rgba(${e})`),e=e.replace(/\s*\(\s*/,"("),e=e.replace(/\s*\)\s*$/,")"),e=e.replace(/\s*,\s*/g,", "),e)}function le(t){let e=ye(t),n=ye({...t,a:1});return{hsva:{...t},hex:_e(n),hexa:Cn(e),rgba:ve(e),alpha:t.a}}function dt(t={}){let{id:e,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:i,onInput:c,onChange:d}=t,b=i?i():Z().platform==="mobile",l=Ln(r,o),s=re({id:e,className:"color-picker",title:n,padding:b?"md":"lg",variant:"soft",expandable:!b,defaultExpanded:!b&&a});s.classList.add(b?"color-picker--mobile":"color-picker--desktop");let p=s.querySelector(".card-header");p&&p.classList.add("color-picker__header");let E=p?.querySelector(".card-title"),u=m("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});E?E.prepend(u):p?p.prepend(u):s.prepend(u);let y=s.querySelector(".card-toggle");!b&&y&&u.addEventListener("click",()=>{s.classList.contains("card--collapsed")&&y.click()});let x=s.querySelector(".card-collapse"),C=null,L=null,h=null,g=null,k=null,M=null,S=null,P=null,W=null,w="hex";function F(R){let H=le(l);R==="input"?c?.(H):d?.(H)}function j(){let R=le(l);if(u.style.setProperty("--cp-preview-color",R.rgba),u.setAttribute("aria-label",`${n}: ${R.hexa}`),!b&&C&&L&&h&&g&&k&&M&&S){let H=ye({...l,s:1,v:1,a:1}),N=ve(H);C.style.setProperty("--cp-palette-hue",N),L.style.left=`${l.s*100}%`,L.style.top=`${(1-l.v)*100}%`,h.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ve({...H,a:1})} 0%, ${ve({...H,a:0})} 100%)`),g.style.top=`${(1-l.a)*100}%`,k.style.setProperty("--cp-hue-color",ve(ye({...l,v:1,s:1,a:1}))),M.style.left=`${l.h/360*100}%`;let T=l.a===1?R.hex:R.hexa,v=R.rgba,I=w==="hex"?T:v;S!==document.activeElement&&(S.value=I),S.setAttribute("aria-label",`${w.toUpperCase()} code for ${n}`),S.placeholder=w==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",w==="hex"?S.maxLength=9:S.removeAttribute("maxLength"),S.dataset.mode=w,P&&(P.textContent=w.toUpperCase(),P.setAttribute("aria-label",w==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),P.setAttribute("aria-pressed",w==="rgba"?"true":"false"),P.classList.toggle("is-alt",w==="rgba"))}W&&W!==document.activeElement&&(W.value=R.hex)}function G(R,H=null){l={h:(R.h%360+360)%360,s:K(R.s,0,1),v:K(R.v,0,1),a:K(R.a,0,1)},j(),H&&F(H)}function D(R,H=null){G(ct(R),H)}function B(R,H,N){R.addEventListener("pointerdown",T=>{T.preventDefault();let v=T.pointerId,I=z=>{z.pointerId===v&&H(z)},O=z=>{z.pointerId===v&&(document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",O),document.removeEventListener("pointercancel",O),N?.(z))};H(T),document.addEventListener("pointermove",I),document.addEventListener("pointerup",O),document.addEventListener("pointercancel",O)})}if(!b&&x){let R=x.querySelector(".card-body");if(R){R.classList.add("color-picker__body"),L=m("div",{className:"color-picker__palette-cursor"}),C=m("div",{className:"color-picker__palette"},L),g=m("div",{className:"color-picker__alpha-thumb"}),h=m("div",{className:"color-picker__alpha"},g),M=m("div",{className:"color-picker__hue-thumb"}),k=m("div",{className:"color-picker__hue"},M);let H=m("div",{className:"color-picker__main"},C,h),N=m("div",{className:"color-picker__hue-row"},k),T=lt({blockGameKeys:!0});S=T.input,S.classList.add("color-picker__hex-input"),S.value="",S.maxLength=9,S.spellcheck=!1,S.inputMode="text",S.setAttribute("aria-label",`Hex code for ${n}`),P=m("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),T.root.classList.add("color-picker__hex-wrap");let v=m("div",{className:"color-picker__hex-row"},P,T.root);R.replaceChildren(H,N,v),B(C,O=>{if(!C||!L)return;let z=C.getBoundingClientRect(),q=K((O.clientX-z.left)/z.width,0,1),Oe=K((O.clientY-z.top)/z.height,0,1);G({...l,s:q,v:1-Oe},"input")},()=>F("change")),B(h,O=>{if(!h)return;let z=h.getBoundingClientRect(),q=K((O.clientY-z.top)/z.height,0,1);G({...l,a:1-q},"input")},()=>F("change")),B(k,O=>{if(!k)return;let z=k.getBoundingClientRect(),q=K((O.clientX-z.left)/z.width,0,1);G({...l,h:q*360},"input")},()=>F("change")),P.addEventListener("click",()=>{if(w=w==="hex"?"rgba":"hex",S){let O=le(l);S.value=w==="hex"?l.a===1?O.hex:O.hexa:O.rgba}j(),S?.focus(),S?.select()}),S.addEventListener("input",()=>{if(w==="hex"){let O=Hn(S.value);if(O!==S.value){let z=S.selectionStart??O.length;S.value=O,S.setSelectionRange(z,z)}}});let I=()=>{let O=S.value;if(w==="hex"){let z=pe(O);if(!z){S.value=l.a===1?le(l).hex:le(l).hexa;return}let q=O.startsWith("#")?O.slice(1):O,Oe=q.length===4||q.length===8;z.a=Oe?z.a:l.a,D(z,"change")}else{let z=Pn(O),q=Ae(z);if(!q){S.value=le(l).rgba;return}D(q,"change")}};S.addEventListener("change",I),S.addEventListener("blur",I),S.addEventListener("keydown",O=>{O.key==="Enter"&&(I(),S.blur())})}}return b&&(x&&x.remove(),W=m("input",{className:"color-picker__native",type:"color",value:_e(ye({...l,a:1}))}),u.addEventListener("click",()=>W.click()),W.addEventListener("input",()=>{let R=pe(W.value);R&&(R.a=l.a,D(R,"input"),F("change"))}),s.appendChild(W)),j(),{root:s,isMobile:b,getValue:()=>le(l),setValue:(R,H)=>{let N=Ae(R)??pe(R)??pe("#FFFFFF");N&&(typeof H=="number"&&(N.a=H),D(N,null))}}}var Rn=window,pt=typeof unsafeWindow<"u"&&unsafeWindow?unsafeWindow:Rn,V=pt;function ut(t=pt){try{return t.top!==t}catch{return!0}}function In(t){try{return!!t.isSecureContext}catch{return!1}}function ze(t){let e=t?.getRootNode?.();return e&&(e instanceof Document||e.host)?e:document}function gt(){let t=navigator.platform||"",e=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(t)||/Mac OS|iOS/i.test(e)}async function Wn(){try{let t=await navigator.permissions?.query?.({name:"clipboard-write"});return t?t.state==="granted"||t.state==="prompt":!0}catch{return!0}}function Nn(t,e){let n=document.createElement("textarea");return n.value=t,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",e.appendChild?e.appendChild(n):document.body.appendChild(n),n}function Dn(t){try{let e=window.getSelection?.();if(!e)return!1;let n=document.createRange();return n.selectNodeContents(t),e.removeAllRanges(),e.addRange(n),!0}catch{return!1}}async function On(t){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!In(V))return{ok:!1,method:"clipboard-write"};if(!await Wn())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(t),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Bn(t,e){try{let n=e||ze(),r=Nn(t,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function An(t,e){if(!e)return{ok:!1,method:"selection"};let n=e.textContent??"",r=!1;if(n!==t)try{e.textContent=t,r=!0}catch{}let o=Dn(e);r&&setTimeout(()=>{try{e.textContent=n}catch{}},80);let a=gt()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function _n(t,e={}){let n=(t??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await On(n);if(r.ok)return r;let o=e.injectionRoot||ze(e.valueNode||void 0),a=Bn(n,o);if(a.ok)return a;let i=An(n,e.valueNode||null);if(i.ok)return i;if(!e.disablePromptFallback)try{return window.prompt(st()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function mt(t,e,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{t.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=ze(t);i.appendChild?i.appendChild(a):document.body.appendChild(a);let c=t.getBoundingClientRect();a.style.left=`${c.right-8}px`,a.style.top=`${c.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};t.addEventListener("click",async o=>{o.stopPropagation();let a=(e()??"").toString(),i=await _n(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copi\xE9"):i.method==="selection"&&r(i.hint||(gt()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var ie={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function Fe(t){let{host:e,themes:n,initialTheme:r,onThemeChange:o}=t,a=r,i=null,c=!1;function d(b){let l=n[b]||n[a]||{};c&&e.classList.add("theme-anim");for(let[s,p]of Object.entries(l))e.style.setProperty(s,p);c?(i!==null&&clearTimeout(i),i=V.setTimeout(()=>{e.classList.remove("theme-anim"),i=null},320)):c=!0,a=b,o?.(b)}function f(){return a}return d(r),{applyTheme:d,getCurrentTheme:f}}var Ie={ui:{expandedCards:{style:!1,system:!1}}};async function ft(){let t=await be("tab-settings",{version:1,defaults:Ie,sanitize:o=>({ui:{expandedCards:Ee(Ie.ui.expandedCards,o.ui?.expandedCards)}})});function e(o){let a=t.get();t.update({ui:{...a.ui,...o,expandedCards:Ee(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let i=t.get();t.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}})}function r(o){let a=t.get();n(o,!a.ui.expandedCards[o])}return{get:t.get,set:t.set,save:t.save,setUI:e,setCardExpanded:n,toggleCard:r}}function bt(t){return t.replace(/[_-]+/g," ").replace(/^\w/,e=>e.toUpperCase())}function zn(){return Object.keys(ie).map(t=>({value:t,label:bt(t)}))}var Fn=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Gn(t){return bt(t.replace(/^--/,""))}function Vn(t){return t.alpha<1?t.rgba:t.hex}var We=class extends se{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await ft()}catch{o={get:()=>Ie,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),i=Object.keys(ie),c=this.deps.getCurrentTheme?.()??this.deps.initialTheme,d=i.includes(c)?c:i[0]??"dark",f=d,b=He({text:"Theme",tone:"muted",size:"lg"}),l=de({options:zn(),value:d,onChange:u=>{f=u,this.deps.applyTheme(u),this.renderThemePickers(u,s,f)}}),s=m("div",{className:"settings-theme-grid"}),p=re({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:u=>o.setCardExpanded("style",u)},m("div",{className:"kv settings-theme-row"},b.root,l.root),s);this.renderThemePickers(d,s,f);let E=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:u=>o.setCardExpanded("system",u)});r.appendChild(p),r.appendChild(E)}renderThemePickers(n,r,o){let a=ie[n];if(r.replaceChildren(),!!a)for(let i of Fn){let c=a[i];if(c==null)continue;let d=dt({label:Gn(i),value:c,defaultExpanded:!1,onInput:f=>this.updateThemeVar(n,i,f,o),onChange:f=>this.updateThemeVar(n,i,f,o)});r.appendChild(d.root)}}updateThemeVar(n,r,o,a){let i=ie[n];i&&(i[r]=Vn(o),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,a=(x,C)=>{let L=m("div",{className:"kv kv--inline-mobile"}),h=m("label",{},x),g=m("div",{className:"ro"});return typeof C=="string"?g.textContent=C:g.append(C),L.append(h,g),L},i=m("code",{},"\u2014"),c=m("span",{},"\u2014"),d=m("span",{},"\u2014"),f=m("span",{},"\u2014"),b=m("span",{},"\u2014"),l=m("span",{},"\u2014"),s=()=>{let x=Z();d.textContent=x.surface,f.textContent=x.platform,b.textContent=x.browser??"Unknown",l.textContent=x.os??"Unknown",i.textContent=x.host,c.textContent=x.isInIframe?"Yes":"No"},p=ae({label:"Copy JSON",variant:"primary",size:"sm"});mt(p,()=>{let x=Z();return JSON.stringify(x,null,2)});let E=m("div",{style:"width:100%;display:flex;justify-content:center;"},p),u=re({title:"System",variant:"soft",padding:"lg",footer:E,expandable:!0,defaultExpanded:r,onExpandChange:o},a("Surface",d),a("Platform",f),a("Browser",b),a("OS",l),a("Host",i),a("Iframe",c)),y=()=>{document.hidden||s()};return document.addEventListener("visibilitychange",y),s(),this.addCleanup(()=>document.removeEventListener("visibilitychange",y)),u}};function ke(t){return t<10?`0${t}`:String(t)}function Y(t){let e=/^(\d{1,2}):(\d{2})$/.exec((t||"").trim());if(!e)return 0;let n=Math.max(0,Math.min(23,parseInt(e[1],10)||0)),r=Math.max(0,Math.min(59,parseInt(e[2],10)||0));return n*60+r}function Ge(t){let e=Math.max(0,Math.min(1439,t|0)),n=Math.floor(e/60),r=e%60;return`${ke(n)}:${ke(r)}`}function ne(t,e){let n=Y(t),r=Math.max(0,Math.min(1439,n)),o=Math.floor(r/e)*e;return Ge(o)}function jn(t){let e=Math.floor(t/60),n=t%60,r=e>=12;return{h12:e%12||12,m:n,pm:r}}function $n(t,e,n){return(t%12+(n?12:0))*60+e}function Un(t){return t.platform==="mobile"||t.os==="ios"||t.os==="android"}function ht(t={}){let{id:e,start:n="08:00",end:r="23:00",stepMinutes:o=5,disabled:a=!1,allowOvernight:i=!0,labels:c={from:"From",to:"To"},picker:d="auto",format:f="auto",useNativeOn:b,onChange:l}=t,s={start:ne(n,o),end:ne(r,o)},p=m("div",{className:"time-range",id:e});p.classList.add("time-range--stacked");let E=Z();if(d==="native"||d==="auto"&&(b?.(E)??Un(E)))return y();return x();function y(){let h=m("div",{className:"time-range-field",role:"group"}),g=m("span",{className:"time-range-label"},c.from||"From"),k=m("input",{className:"input time-range-input",type:"time",step:String(o*60),value:s.start}),M=m("div",{className:"time-range-field",role:"group"}),S=m("span",{className:"time-range-label"},c.to||"To"),P=m("input",{className:"input time-range-input",type:"time",step:String(o*60),value:s.end});h.append(g,k),M.append(S,P),p.append(h,M);function W(){k.value=s.start,P.value=s.end}function w(){l?.(j())}function F(R){let H=R.target,N=H===k,T=ne(H.value||(N?s.start:s.end),o);N?(s.start=T,!i&&Y(s.end)<Y(s.start)&&(s.end=s.start)):(s.end=T,!i&&Y(s.end)<Y(s.start)&&(s.start=s.end)),W(),w()}k.addEventListener("change",F),k.addEventListener("blur",F),P.addEventListener("change",F),P.addEventListener("blur",F),a&&D(!0);function j(){return{...s}}function G(R){if(R.start&&(s.start=ne(R.start,o)),R.end&&(s.end=ne(R.end,o)),!i){let H=Y(s.start);Y(s.end)<H&&(s.end=s.start)}W(),w()}function D(R){k.disabled=R,P.disabled=R,p.classList.toggle("is-disabled",!!R)}function B(){k.removeEventListener("change",F),k.removeEventListener("blur",F),P.removeEventListener("change",F),P.removeEventListener("blur",F),p.replaceChildren()}return{root:p,getValue:j,setValue:G,setDisabled:D,destroy:B}}function x(){let h=m("label",{className:"time-range-field"}),g=m("span",{className:"time-range-label"},c.from||"From"),k=m("label",{className:"time-range-field"}),M=m("span",{className:"time-range-label"},c.to||"To"),S=f==="12h"||f==="auto"&&L(),P=C(s.start,S),W=C(s.end,S);h.append(g,P.container),k.append(M,W.container),p.append(h,k),a&&G(!0),j(),P.onAnyChange(()=>{s.start=P.to24h(o),!i&&Y(s.end)<Y(s.start)&&(s.end=s.start,W.setFrom24h(s.end)),l?.(w())}),W.onAnyChange(()=>{s.end=W.to24h(o),!i&&Y(s.end)<Y(s.start)&&(s.start=s.end,P.setFrom24h(s.start)),l?.(w())});function w(){return{...s}}function F(B){if(B.start&&(s.start=ne(B.start,o)),B.end&&(s.end=ne(B.end,o)),!i){let R=Y(s.start);Y(s.end)<R&&(s.end=s.start)}j(),l?.(w())}function j(){P.setFrom24h(s.start),W.setFrom24h(s.end)}function G(B){P.setDisabled(B),W.setDisabled(B),p.classList.toggle("is-disabled",!!B)}function D(){P.destroy(),W.destroy(),p.replaceChildren()}return{root:p,getValue:w,setValue:F,setDisabled:G,destroy:D}}function C(h,g){let k=m("div",{className:"time-picker"}),M=(v,I=2)=>{v.classList.add("time-picker-compact"),v.style.setProperty("--min-ch",String(I))},S=g?Array.from({length:12},(v,I)=>{let O=I+1;return{value:String(O),label:ke(O)}}):Array.from({length:24},(v,I)=>({value:String(I),label:ke(I)})),P=de({size:"sm",options:S,placeholder:"HH",onChange:()=>B()});M(P.root,2);let W=Math.max(1,Math.min(30,Math.floor(t.stepMinutes??5))),w=Array.from({length:Math.floor(60/W)},(v,I)=>{let O=I*W;return{value:String(O),label:ke(O)}}),F=de({size:"sm",options:w,placeholder:"MM",onChange:()=>B()});M(F.root,2);let j=g?de({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>B()}):null;j&&M(j.root,3),k.append(P.root,F.root,...j?[j.root]:[]);let G=null;function D(v){G=v}function B(){G?.()}function R(v){let I=Y(v);if(g){let O=jn(I);P.setValue(String(O.h12),{notify:!1}),F.setValue(String(Math.floor(O.m/W)*W),{notify:!1}),j.setValue(O.pm?"pm":"am",{notify:!1})}else{let O=Math.floor(I/60),z=I%60;P.setValue(String(O),{notify:!1}),F.setValue(String(Math.floor(z/W)*W),{notify:!1})}}function H(v){let I=parseInt(F.getValue()||"0",10)||0;if(g){let O=parseInt(P.getValue()||"12",10)||12,z=(j?.getValue()||"am")==="pm",q=$n(O,I,z);return ne(Ge(q),v)}else{let z=(parseInt(P.getValue()||"0",10)||0)*60+I;return ne(Ge(z),v)}}function N(v){P.setDisabled(v),F.setDisabled(v),j?.setDisabled(v),k.classList.toggle("is-disabled",!!v)}function T(){k.replaceChildren()}return{container:k,onAnyChange:D,setFrom24h:R,to24h:H,setDisabled:N,destroy:T}}function L(){try{let g=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(g)}catch{return!1}}}function vt(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Kn(t){let e=vt(t);e=e.replace(/\/\*[\s\S]*?\*\//g,o=>`<span class="tok tok-comm">${o}</span>`),e=e.replace(/(^|\s)(\/\/.*)$/gm,(o,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),e=e.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,o=>`<span class="tok tok-str">${o}</span>`),e=e.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,o=>`<span class="tok tok-str">${o}</span>`),e=e.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,o=>`<span class="tok tok-num">${o}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],r=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return e=e.replace(r,o=>`<span class="tok tok-kw">${o}</span>`),e=e.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,o=>`<span class="tok tok-lit">${o}</span>`),e}function xt(t){if(!t)return new Date().toLocaleTimeString();let e=t instanceof Date?t:new Date(t);if(isNaN(e.getTime()))return String(t);let n=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0"),o=String(e.getSeconds()).padStart(2,"0");return`${n}:${r}:${o}`}function yt(t={}){let{id:e,className:n,height:r,maxLines:o=500,wrap:a=!1,mode:i="plain",showTimestamps:c=!0,autoScroll:d=!0}=t,f=m("div",{className:"log",id:e});n&&f.classList.add(...n.split(" ").filter(Boolean)),a&&f.classList.add("log--wrap");let b=m("div",{className:"log-viewport"}),l=m("div",{className:"log-lines"});b.appendChild(l),f.appendChild(b),r!=null&&(f.style.blockSize=typeof r=="number"?`${r}px`:String(r));let s=i,p=o,E=new Map;function u(D){return s==="js"?Kn(D):vt(D)}function y(D){return D?E.get(D)?.body??l:l}function x(D){let B=typeof D=="string"?{text:D}:D||{text:""},R=y(B.groupKey);if(B.key){let T=Array.from(R.querySelectorAll(`.log-line[data-key="${B.key}"]`)).pop();if(T){B.level&&(T.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),T.classList.add(`log-level--${B.level}`));let v=T.querySelector(".log-time");c&&v&&(v.textContent=xt(B.time));let I=T.querySelector(".log-text");I&&(I.innerHTML=u(B.text)),d&&M();return}}let H=document.createElement("div");if(H.className="log-line",B.level&&H.classList.add(`log-level--${B.level}`),B.key&&(H.dataset.key=B.key),c){let T=document.createElement("span");T.className="log-time",T.textContent=xt(B.time),H.appendChild(T)}let N=document.createElement("span");N.className="log-text",N.innerHTML=u(B.text),H.appendChild(N),R.appendChild(H),W(),d&&M()}function C(D){for(let B of D)x(B)}function L(){l.replaceChildren(),E.clear()}function h(D){s=D,M()}function g(D){f.classList.toggle("log--wrap",!!D),M()}function k(D){p=Math.max(1,Math.floor(D||1))}function M(){requestAnimationFrame(()=>{b.scrollTop=b.scrollHeight})}function S(){let D=0;for(let B=0;B<l.children.length;B+=1){let R=l.children[B];(R.classList.contains("log-line")||R.classList.contains("log-group"))&&(D+=1)}return D}function P(){let D=l.firstElementChild;if(!D)return!1;if(D.classList.contains("log-group")){let B=D.dataset.groupKey;B&&E.delete(B)}return D.remove(),!0}function W(){let D=S();for(;D>p&&P();)D--}function w(D,B){let R=B?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(E.has(R))return R;let H=document.createElement("div");H.className="log-group",H.dataset.groupKey=R;let N=document.createElement("div");N.className="log-group-header",N.textContent=D;let T=document.createElement("div");T.className="log-group-body",H.append(N,T),l.appendChild(H),E.set(R,{root:H,header:N,body:T});let v=I=>{H.classList.toggle("is-collapsed",!!I)};return B?.collapsed&&v(!0),N.addEventListener("click",()=>v(!H.classList.contains("is-collapsed"))),d&&M(),R}function F(D){E.get(D)}function j(D,B){let R=E.get(D);R&&(B==null?R.root.classList.toggle("is-collapsed"):R.root.classList.toggle("is-collapsed",!!B))}let G=f;return G.add=x,G.addMany=C,G.clear=L,G.setMode=h,G.setWrap=g,G.setMaxLines=k,G.scrollToEnd=M,G.beginGroup=w,G.endGroup=F,G.toggleGroup=j,G}var J={nativeCtor:null,captured:[],latestOpen:null},kt=Symbol.for("ariesmod.ws.capture.wrapped"),wt=Symbol.for("ariesmod.ws.capture.native"),St=1;function Ve(t){return!!t&&t.readyState===St}function qn(){if(Ve(J.latestOpen))return J.latestOpen;for(let t=J.captured.length-1;t>=0;t--){let e=J.captured[t];if(Ve(e))return e}return null}function Yn(t,e){J.captured.push(t),J.captured.length>25&&J.captured.splice(0,J.captured.length-25);let n=()=>{J.latestOpen=t,e&&console.log("[WS] captured socket opened",t.url)};t.addEventListener("open",n),t.addEventListener("close",()=>{J.latestOpen===t&&(J.latestOpen=null),e&&console.log("[WS] captured socket closed",t.url)}),t.readyState===St&&n()}function Tt(t=V,e={}){let n=!!e.debug,r=t?.WebSocket;if(typeof r!="function")return()=>{};if(r[kt])return J.nativeCtor=r[wt]??J.nativeCtor??null,()=>{};let o=r;J.nativeCtor=o;function a(i,c){let d=c!==void 0?new o(i,c):new o(i);try{Yn(d,n)}catch{}return d}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[kt]=!0,a[wt]=o;try{t.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{t.WebSocket===a&&(t.WebSocket=o)}catch{}}}function Jn(t=V){let e=t?.MagicCircle_RoomConnection?.currentWebSocket;return e&&typeof e=="object"?e:null}function we(t=V){let e=qn();if(e)return{ws:e,source:"captured"};let n=Jn(t);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Et(t,e={}){let n=e.pageWindow??V,r=e.intervalMs??500,o=!!e.debug,a=null,i=null,c=()=>{let f=we(n);(f.ws!==a||f.source!==i)&&(a=f.ws,i=f.source,o&&console.log("[WS] best socket changed:",f.source,f.ws),t(f))};c();let d=setInterval(c,r);return()=>clearInterval(d)}function Xn(t){if(typeof t=="string")return t;try{return JSON.stringify(t)}catch{return null}}function Qn(t,e=V){let n=e?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(t)?n.sendMessage(...t):n.sendMessage(t),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=we(e);if(!r)return{ok:!1,reason:"no-ws"};if(!Ve(r))return{ok:!1,reason:"not-open"};let o=Xn(t);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function Mt(t,e={},n=V){return Qn({type:t,...e},n)}var te={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},A={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Cr=new Set(Object.values(te)),Lr=new Set(Object.values(A));function Zn(t,e={},n=V){return Mt(t,e,n)}function Ct(t,e=V){return Zn(A.Chat,{scopePath:["Room"],message:t},e)}var ce={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function Lt(){return be("tab-test",{version:1,defaults:ce,sanitize:t=>({timeRange:{start:t.timeRange?.start||ce.timeRange.start,end:t.timeRange?.end||ce.timeRange.end},logSettings:{mode:t.logSettings?.mode||ce.logSettings.mode,wrap:t.logSettings?.wrap??ce.logSettings.wrap}})})}var Ne=class extends se{constructor(){super({id:"tab-test",label:"Test"})}async build(e){let n=this.createContainer("test-section");e.appendChild(n);let r;try{r=await Lt()}catch{r={get:()=>ce,set:()=>{},update:()=>{},save:()=>{}}}let o=r.get(),a=He({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=ht({start:o.timeRange.start,end:o.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:y=>{r.update({timeRange:{start:y.start,end:y.end}})}}),c=m("div",a.root,i.root),d=yt({height:220,mode:o.logSettings.mode,maxLines:1e3});o.logSettings.wrap&&d.setWrap(!0),d.add({level:"info",text:"Log initialise"}),d.add({level:"debug",text:"const x = 42; // demo"}),d.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),d.add({level:"error",text:"new Error('Boom')"});let f=ae({label:"Appliquer",variant:"primary",onClick:()=>{let y=i.getValue();d.add({level:"info",text:`[Apply] ${y.start} -> ${y.end}`})}}),b=re({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Be(f)},c),l=ae({label:"Clear",onClick:()=>Ct("test")}),s=ae({label:o.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let y=!d.classList.contains("log--wrap");d.setWrap(y),s.setLabel(y?"Unwrap":"Wrap"),r.update({logSettings:{...r.get().logSettings,wrap:y}})}}),p=ae({label:`Mode: ${o.logSettings.mode}`,onClick:()=>{let x=r.get().logSettings.mode==="js"?"plain":"js";d.setMode(x),p.setLabel(`Mode: ${x}`),r.update({logSettings:{...r.get().logSettings,mode:x}})}}),E=ae({label:"Add line",onClick:()=>d.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),u=re({title:"Logs",variant:"default",padding:"lg"},d,Be(l,s,p,E));n.appendChild(b),n.appendChild(u)}};function je(t){return[new We(t),new Ne]}function $e(t){let{shadow:e,initialOpen:n}=t,r=m("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=m("div",{className:"gemini-tabbar"}),a=m("div",{className:"gemini-content",id:"content"}),i=m("div",{className:"gemini-resizer",title:"Resize"}),c=m("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,a,i);let d=m("div",{className:"gemini-wrapper"},r);return e.append(d),{panel:r,tabbar:o,content:a,resizer:i,closeButton:c,wrapper:d}}function Ue(t){let{resizer:e,host:n,panel:r,shadow:o,onWidthChange:a,initialWidth:i,minWidth:c,maxWidth:d}=t,f=c,b=d;function l(){let g=Z(),k=Math.round(V.visualViewport?.width??V.innerWidth??0);if(g.platform==="mobile"||g.os==="ios"||g.os==="android"){let M=getComputedStyle(o.host),S=parseFloat(M.getPropertyValue("--inset-l"))||0,P=parseFloat(M.getPropertyValue("--inset-r"))||0,W=Math.max(280,k-Math.round(S+P)),w=Math.min(420,Math.max(300,Math.floor(k*.66))),F=W;f=Math.min(w,W),b=F}else f=c,b=d;return{min:f,max:b}}function s(g){return Math.max(f,Math.min(b,Number(g)||i))}function p(g){let k=s(g);n.style.setProperty("--w",`${k}px`),a(k)}l();let E=Z(),u=!(E.platform==="mobile"||E.os==="ios"||E.os==="android"),y=!1,x=g=>{if(!y)return;g.preventDefault();let k=Math.round(V.innerWidth-g.clientX);p(k)},C=()=>{y&&(y=!1,document.body.style.cursor="",V.removeEventListener("mousemove",x),V.removeEventListener("mouseup",C))},L=g=>{u&&(g.preventDefault(),y=!0,document.body.style.cursor="ew-resize",V.addEventListener("mousemove",x),V.addEventListener("mouseup",C))};e.addEventListener("mousedown",L);function h(){e.removeEventListener("mousedown",L),V.removeEventListener("mousemove",x),V.removeEventListener("mouseup",C)}return{calculateResponsiveBounds:l,constrainWidthToLimits:s,setHudWidth:p,destroy:h}}function Ke(t){let{panel:e,onToggle:n,onClose:r,toggleCombo:o=d=>d.ctrlKey&&d.shiftKey&&d.key.toLowerCase()==="u",closeOnEscape:a=!0}=t;function i(d){let f=e.classList.contains("open");if(a&&d.key==="Escape"&&f){r();return}o(d)&&(d.preventDefault(),d.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function c(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:c}}var Ht=`
@layer hud {
  /* Root container */
  .gemini-wrapper {
    position: relative;
    pointer-events: auto;
  }

  /* ---- HUD panel ---- */
  .gemini-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--w);
    display: flex;
    flex-direction: column;
    background-color: var(--bg);
    color: var(--fg);
    border-left: 1px solid var(--border);
    box-shadow: -20px 0 60px var(--shadow);
    transform: translateX(100%);
    transition: transform .28s cubic-bezier(.2,.8,.2,1),
                background-color .28s ease, color .28s ease,
                border-color .28s ease, box-shadow .28s ease;
    overflow: hidden;
    pointer-events: auto;
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
  }
  .gemini-panel.open {
    transform: translateX(0);
  }

  /* ---- Resizer (desktop only) ---- */
  .gemini-resizer {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    cursor: ew-resize;
    background: transparent;
  }
  .gemini-resizer:hover {
    background: color-mix(in oklab, var(--accent) 15%, transparent);
  }

  /* ---- TABBAR (grid: tabs that stretch + close button) ---- */
  .gemini-tabbar {
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

  /* ---- CLOSE BUTTON (in tabbar, auto column) ---- */
  .gemini-close {
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
  .gemini-close:hover {
    border-color: color-mix(in oklab, var(--accent) 40%, var(--border));
  }
  .gemini-close:active {
    transform: scale(.98);
  }

  /* Responsive tweaks for tabbar and close button */
  @media (max-width: 720px) {
    .gemini-tabbar {
      gap: 12px;
      padding: 10px max(10px, var(--inset-l)) 10px max(10px, var(--inset-r));
    }
    .gemini-close {
      inline-size: 30px;
      block-size: 30px;
      font-size: 15px;
    }
  }
  @media (max-width: 480px) {
    .gemini-tabbar {
      gap: 10px;
      padding: 10px max(8px, var(--inset-l)) 10px max(8px, var(--inset-r));
    }
    .gemini-close {
      inline-size: 28px;
      block-size: 28px;
      font-size: 14px;
    }
  }

  /* ---- Content area ---- */
  .gemini-content {
    padding: calc(var(--pad) + var(--inset-t)) var(--pad) calc(var(--pad) + var(--inset-b));
    overflow: auto;
    height: calc(100dvh - var(--tab-h));
    scrollbar-gutter: stable;
  }
  .gemini-content::-webkit-scrollbar {
    width: 10px;
  }
  .gemini-content::-webkit-scrollbar-thumb {
    background: var(--muted);
    border-radius: 8px;
  }
}
`;var qe=`
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
`;var Ye=`
@layer primitives {
  /* Section container */
  .gemini-section { display: block; }

  /* ---- Key-value grid ---- */
  .kv > * { min-width: 0; }
  .kv {
    display: grid;
    grid-template-columns: minmax(110px, 160px) 1fr;
    gap: 10px 14px;
    align-items: center;
  }

  /* ---- Input wrapper ---- */
  .gemini-input-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .gemini-input-label {
    min-width: 160px;
    opacity: 0.85;
    font-weight: 600;
  }

  /* ---- Basic input ---- */
  .input {
    all: unset;
    display: inline-flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 12px;
    box-sizing: border-box;
    background-color: color-mix(in oklab, var(--soft) 80%, transparent);
    color: var(--fg);
    font-size: 13px;
    min-height: 36px;
    line-height: 1.2;
    transition: background-color 0.28s ease, border-color 0.28s ease, color 0.28s ease;
  }
  .input:focus {
    outline: 2px solid color-mix(in oklab, var(--accent) 45%, transparent);
  }
  .input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* ---- Labels ---- */
  .gemini-label-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }
  .gemini-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--fg);
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
  }
  .gemini-label-icon {
    opacity: 0.9;
    font-size: 1em;
    line-height: 1;
  }
  .gemini-label-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ---- Responsive ---- */
  @media (max-width: 480px) {
    .kv {
      grid-template-columns: 1fr;
    }
    .kv.kv--inline-mobile {
      grid-template-columns: minmax(110px, 160px) 1fr;
      align-items: center;
    }
    .gemini-input-wrap {
      flex-direction: column;
      align-items: stretch;
      gap: 6px;
    }
    .gemini-input-label {
      min-width: 0;
    }
  }
}
`;var Je=`
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
`;function $(t,e,n){if(t.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=e,t.appendChild(r)}var Pt=`
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
  
`;var Rt=`
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
`;var It=`
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
`;var Wt=`
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
`;var Nt=`
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
`;var Dt=`
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
`;var Ot=`
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
`;var Bt=`
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
`;var At=`
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
`;var _t=`
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
`;var zt=`
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
`;var Ft=`
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
`;var Gt=`
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
`;var Vt=`
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
`;var jt=`
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
`;var $t=`
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
`;var Ut=`
@layer settings-section {
  /* Theme color picker grid */
  .settings-theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }

  @media (max-width: 640px) {
    .settings-theme-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
  }

  @media (max-width: 480px) {
    .settings-theme-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
  }

  .settings-theme-row {
    margin-bottom: 16px;
  }

  .settings-color-row {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .settings-color-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
    width: 100%;
  }
}
`;function Xe(t){let{hostId:e="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:c,onThemeChange:d,buildSections:f,initialTab:b,onTabChange:l,toggleCombo:s=N=>N.ctrlKey&&N.shiftKey&&N.key.toLowerCase()==="u",closeOnEscape:p=!0,minWidth:E=420,maxWidth:u=720}=t,{host:y,shadow:x}=et(e);$(x,qe,"variables"),$(x,Ye,"primitives"),$(x,Je,"utilities"),$(x,Ht,"hud"),$(x,Pt,"card"),$(x,Rt,"badge"),$(x,It,"button"),$(x,Wt,"input"),$(x,Nt,"label"),$(x,Dt,"navTabs"),$(x,Ot,"searchBar"),$(x,Bt,"select"),$(x,At,"switch"),$(x,_t,"table"),$(x,zt,"timeRangePicker"),$(x,Ft,"tooltip"),$(x,Gt,"slider"),$(x,Vt,"reorderableList"),$(x,jt,"colorPicker"),$(x,$t,"log"),$(x,Ut,"settings");let{panel:C,tabbar:L,content:h,resizer:g,closeButton:k,wrapper:M}=$e({shadow:x,initialOpen:r});function S(N){C.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:N},bubbles:!0})),a?.(N)}function P(N){let T=C.classList.contains("open");C.classList.toggle("open",N),C.setAttribute("aria-hidden",N?"false":"true"),N!==T&&S(N)}P(r),k.addEventListener("click",N=>{N.preventDefault(),N.stopPropagation(),P(!1)});let W=Fe({host:y,themes:i,initialTheme:c,onThemeChange:d}),w=Ue({resizer:g,host:y,panel:C,shadow:x,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:E,maxWidth:u});w.setHudWidth(n);let F=f({applyTheme:W.applyTheme,initialTheme:c,getCurrentTheme:W.getCurrentTheme,setHUDWidth:w.setHudWidth,setHUDOpen:P}),j=new me(F,h,{applyTheme:W.applyTheme,getCurrentTheme:W.getCurrentTheme}),G=F.map(N=>({id:N.id,label:N.label})),D=tt(G,b||G[0]?.id||"",N=>{j.activate(N),l?.(N)});D.root.style.flex="1 1 auto",D.root.style.minWidth="0",L.append(D.root,k),j.activate(b||G[0]?.id||"");let B=Ke({panel:C,onToggle:()=>P(!C.classList.contains("open")),onClose:()=>P(!1),toggleCombo:s,closeOnEscape:p}),R=()=>{D.recalc();let N=parseInt(getComputedStyle(y).getPropertyValue("--w"))||n;w.calculateResponsiveBounds(),w.setHudWidth(N)};V.addEventListener("resize",R);function H(){B.destroy(),w.destroy(),V.removeEventListener("resize",R)}return{host:y,shadow:x,wrapper:M,panel:C,content:h,setOpen:P,setWidth:w.setHudWidth,sections:F,manager:j,nav:D,destroy:H}}var ue={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Se={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Qe(){return{isOpen:oe(ue.isOpen,Se.isOpen),width:oe(ue.width,Se.width),theme:oe(ue.theme,Se.theme),activeTab:oe(ue.activeTab,Se.activeTab)}}function ge(t,e){fe(ue[t],e)}var Kt=!1,qt=[];function to(){if(!Kt){Kt=!0;try{let t=V.WebSocket,e=function(n,r){let o=r!==void 0?new t(n,r):new t(n);try{o.addEventListener("close",a=>{try{if(a?.code===4710||/Version\s*Expired/i.test(a?.reason||""))for(let c of qt)try{c(a,o)}catch{}}catch{}})}catch{}return o};e.prototype=t.prototype,e.CONNECTING=t.CONNECTING,e.OPEN=t.OPEN,e.CLOSING=t.CLOSING,e.CLOSED=t.CLOSED,V.WebSocket=e}catch{}}}function no(t){qt.push(t),to()}function Yt(){no(t=>{try{ut()||V.location.reload()}catch{}})}var oo="https://i.imgur.com/IMkhMur.png",ro="Stats";function Jt(t){let e=t.iconUrl||oo,n=t.ariaLabel||"Open MGH",r=null,o=null,a=null,i=!1,c=null,d=null,f=["Chat","Leaderboard","Stats","Open Activity Log"],b=L=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(L):L.replace(/"/g,'\\"')}catch{return L}};function l(){let L=document.querySelector(f.map(g=>`button[aria-label="${b(g)}"]`).join(","));if(!L)return null;let h=L.parentElement;for(;h&&h!==document.body;){if(f.reduce((k,M)=>k+h.querySelectorAll(`button[aria-label="${b(M)}"]`).length,0)>=2)return h;h=h.parentElement}return null}function s(L){return L}function p(L){let h=Array.from(L.querySelectorAll("button[aria-label]"));if(!h.length)return{refBtn:null,refWrapper:null};let g=h.filter(F=>F.dataset.mghBtn!=="true"&&(F.getAttribute("aria-label")||"")!==(t.ariaLabel||"Open MGH")),k=g.length?g:h,M=k.find(F=>(F.getAttribute("aria-label")||"").toLowerCase()===ro.toLowerCase())||null,S=k.length>=2?k.length-2:k.length-1,P=M||k[S],W=P.parentElement,w=W&&W.parentElement===L&&W.tagName==="DIV"?W:null;return{refBtn:P,refWrapper:w}}function E(L,h,g){let k=L.cloneNode(!1);k.type="button",k.setAttribute("aria-label",h),k.title=h,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let M=document.createElement("img");return M.src=g,M.alt="MGH",M.style.pointerEvents="none",M.style.userSelect="none",M.style.width="76%",M.style.height="76%",M.style.objectFit="contain",M.style.display="block",M.style.margin="auto",k.appendChild(M),k.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation();try{t.onClick?.()}catch{}}),k}function u(){if(i)return!1;i=!0;let L=!1;try{let h=l();if(!h)return!1;c!==h&&(c=h);let{refBtn:g,refWrapper:k}=p(h);if(!g)return!1;o=h.querySelector('div[data-mgh-wrapper="true"]'),!o&&k&&(o=k.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),L=!0);let M=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=M),r||(r=E(g,n,e),o?o.appendChild(r):r.parentElement!==h&&h.appendChild(r),L=!0),o&&o.parentElement!==h&&(h.appendChild(o),L=!0);let S=h;if(S&&S!==d){try{C.disconnect()}catch{}d=S,C.observe(d,{childList:!0,subtree:!0})}return L}finally{i=!1}}u();let y=document.getElementById("App")||document.body,x=null,C=new MutationObserver(L=>{let h=L.every(k=>{let M=Array.from(k.addedNodes||[]),S=Array.from(k.removedNodes||[]),P=M.concat(S);if(P.length===0){let W=k.target;return o&&(W===o||o.contains(W))||r&&(W===r||r.contains(W))}return P.every(W=>!!(!(W instanceof HTMLElement)||o&&(W===o||o.contains(W))||r&&(W===r||r.contains(W))))}),g=L.some(k=>Array.from(k.removedNodes||[]).some(M=>M instanceof HTMLElement?!!(o&&(M===o||o.contains(M))||r&&(M===r||r.contains(M))):!1));h&&!g||x===null&&(x=window.setTimeout(()=>{if(x=null,u()&&o){let M=o.parentElement;M&&M.lastElementChild!==o&&M.appendChild(o)}},150))});return C.observe(y,{childList:!0,subtree:!0}),a=()=>C.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}var lo={},Zt=[];function ao(){return Zt.slice()}function io(t){Zt.push(t)}function en(t){try{return JSON.parse(t)}catch{return}}function Xt(t){if(typeof t=="string"){let e=en(t);return e!==void 0?e:t}return t}function tn(t){if(t!=null){if(typeof t=="string"){let e=en(t);return e!==void 0?tn(e):t}if(Array.isArray(t)&&typeof t[0]=="string")return t[0];if(typeof t=="object"){let e=t;return e.type??e.Type??e.kind??e.messageType}}}function so(t){let e=t?.MagicCircle_RoomConnection?.currentWebSocket;return e&&typeof e=="object"?e:null}function _(t,e,n){let r=typeof e=="boolean"?e:!0,o=typeof e=="function"?e:n,a=(i,c)=>{if(tn(i)!==t)return;let f=o(i,c);return f&&typeof f=="object"&&"kind"in f?f:typeof f=="boolean"?f?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return io(a),a}var Te=new WeakSet,Qt=new WeakMap;function nn(t){let e=t.pageWindow,n=!!t.debug,r=t.middlewares&&t.middlewares.length?t.middlewares:ao();if(!r.length)return()=>{};let o=s=>({ws:s,pageWindow:e,debug:n}),a=(s,p)=>{let E=s;for(let u of r){let y=u(E,o(p));if(y){if(y.kind==="drop")return{kind:"drop"};y.kind==="replace"&&(E=y.message)}}return E!==s?{kind:"replace",message:E}:void 0},i=null,c=null,d=null,f=()=>{let s=e?.MagicCircle_RoomConnection,p=s?.sendMessage;if(!s||typeof p!="function")return!1;if(Te.has(p))return!0;let E=p.bind(s);function u(...y){let x=y.length===1?y[0]:y,C=Xt(x),L=a(C,so(e));if(L?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",C);return}if(L?.kind==="replace"){let h=L.message;return y.length>1&&Array.isArray(h)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",C,"=>",h),E(...h)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",C,"=>",h),E(h))}return E(...y)}Te.add(u),Qt.set(u,p);try{s.sendMessage=u,Te.add(s.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{s.sendMessage===u&&(s.sendMessage=p)}catch{}},!0};(()=>{let s=e?.WebSocket?.prototype,p=s?.send;if(typeof p!="function"||Te.has(p))return;function E(u){let y=Xt(u),x=a(y,this);if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",y);return}if(x?.kind==="replace"){let C=x.message,L=typeof C=="string"||C instanceof ArrayBuffer||C instanceof Blob?C:JSON.stringify(C);return n&&console.log("[WS] replace outgoing (ws.send)",y,"=>",C),p.call(this,L)}return p.call(this,u)}Te.add(E),Qt.set(E,p);try{s.send=E,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}c=()=>{try{s.send===E&&(s.send=p)}catch{}}})();let l=t.waitForRoomConnectionMs??4e3;if(!f()&&l>0){let s=Date.now();d=setInterval(()=>{if(f()){clearInterval(d),d=null;return}Date.now()-s>l&&(clearInterval(d),d=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(d){try{clearInterval(d)}catch{}d=null}if(i){try{i()}catch{}i=null}if(c){try{c()}catch{}c=null}}}(function(){try{let e=lo,n=e.glob?.("./**/*.ts",{eager:!0})??e.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var go={},rn=[];function co(){return rn.slice()}function on(t){rn.push(t)}function po(t){if(t!=null){if(typeof t=="object"){let e=t;if(typeof e.type=="string")return e.type;if(typeof e.Type=="string")return e.Type;if(typeof e.kind=="string")return e.kind;if(typeof e.messageType=="string")return e.messageType}if(Array.isArray(t)&&typeof t[0]=="string")return t[0]}}function uo(t){if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t}var Ze=Symbol.for("ariesmod.ws.handlers.patched");function U(t,e){if(typeof t=="string"){let o=t,a={match:i=>i.kind==="message"&&i.type===o,handle:e};return on(a),a}let n=t,r={match:o=>o.kind==="close"&&o.code===n,handle:e};return on(r),r}function an(t,e=co(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(t[Ze])return()=>{};t[Ze]=!0;let a={ws:t,pageWindow:r,debug:o},i=l=>{for(let s of e)try{if(!s.match(l))continue;if(s.handle(l,a)===!0)return}catch(p){o&&console.error("[WS] handler error",p,l)}},c=l=>{let s=uo(l.data),p=po(s);i({kind:"message",raw:l.data,data:s,type:p})},d=l=>{i({kind:"close",code:l.code,reason:l.reason,wasClean:l.wasClean,event:l})},f=l=>i({kind:"open",event:l}),b=l=>i({kind:"error",event:l});return t.addEventListener("message",c),t.addEventListener("close",d),t.addEventListener("open",f),t.addEventListener("error",b),()=>{try{t.removeEventListener("message",c)}catch{}try{t.removeEventListener("close",d)}catch{}try{t.removeEventListener("open",f)}catch{}try{t.removeEventListener("error",b)}catch{}try{delete t[Ze]}catch{}}}(function(){try{let e=go,n=e.glob?.("./**/*.ts",{eager:!0})??e.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();U(4800,(t,e)=>{e.debug&&console.log("[WS][Close] Auth failure",t.code,t.reason)});U(4300,(t,e)=>{e.debug&&console.log("[WS][Close] Superseded",t.code,t.reason)});U(4400,(t,e)=>{e.debug&&console.log("[WS][Close] Heartbeat expired",t.code,t.reason)});U(4500,(t,e)=>{e.debug&&console.log("[WS][Close] Player kicked",t.code,t.reason)});U(4200,(t,e)=>{e.debug&&console.log("[WS][Close] Player left voluntarily",t.code,t.reason)});U(4100,(t,e)=>{e.debug&&console.log("[WS][Close] Reconnect initiated",t.code,t.reason)});U(4310,(t,e)=>{e.debug&&console.log("[WS][Close] Server disposed",t.code,t.reason)});U(4250,(t,e)=>{e.debug&&console.log("[WS][Close] User session superseded",t.code,t.reason)});U(4710,(t,e)=>{e.debug&&console.log("[WS][Close] Version expired",t.code,t.reason)});U(4700,(t,e)=>{e.debug&&console.log("[WS][Close] Version mismatch",t.code,t.reason)});U(te.Config,(t,e)=>{e.debug&&console.log("[WS][STC] Config",t.data)});U(te.CurrencyTransaction,(t,e)=>{e.debug&&console.log("[WS][STC] CurrencyTransaction",t.data)});U(te.Emote,(t,e)=>{e.debug&&console.log("[WS][STC] Emote",t.data)});U(te.InappropriateContentRejected,(t,e)=>{e.debug&&console.log("[WS][STC] InappropriateContentRejected",t.data)});U(te.PartialState,(t,e)=>{e.debug&&console.log("[WS][STC] PartialState",t.data)});U(te.Pong,(t,e)=>{e.debug&&console.log("[WS][STC] Pong",t.data)});U(te.ServerErrorMessage,(t,e)=>{e.debug&&console.log("[WS][STC] ServerErrorMessage",t.data)});U(te.Welcome,(t,e)=>{e.debug&&console.log("[WS][STC] Welcome",t.data)});_(A.PlantSeed,(t,e)=>(e.debug&&console.log("[MW][Garden] PlantSeed"),!!1));_(A.WaterPlant,(t,e)=>(e.debug&&console.log("[MW][Garden] WaterPlant"),!!1));_(A.HarvestCrop,(t,e)=>(e.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));_(A.SellAllCrops,(t,e)=>(e.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));_(A.PurchaseSeed,(t,e)=>(e.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));_(A.PurchaseEgg,(t,e)=>(e.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));_(A.PurchaseTool,(t,e)=>(e.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));_(A.PurchaseDecor,(t,e)=>(e.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));_(A.PlantEgg,(t,e)=>(e.debug&&console.log("[MW][Garden] PlantEgg"),!!1));_(A.HatchEgg,(t,e)=>(e.debug&&console.log("[MW][Garden] HatchEgg"),!!1));_(A.PlantGardenPlant,(t,e)=>(e.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));_(A.PotPlant,(t,e)=>(e.debug&&console.log("[MW][Garden] PotPlant"),!!1));_(A.MutationPotion,(t,e)=>(e.debug&&console.log("[MW][Garden] MutationPotion"),!!1));_(A.PickupDecor,(t,e)=>(e.debug&&console.log("[MW][Garden] PickupDecor"),!!1));_(A.PlaceDecor,(t,e)=>(e.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));_(A.RemoveGardenObject,(t,e)=>(e.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));_(A.MoveInventoryItem,(t,e)=>(e.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));_(A.DropObject,(t,e)=>(e.debug&&console.log("[MW][Inventory] DropObject"),!!1));_(A.PickupObject,(t,e)=>(e.debug&&console.log("[MW][Inventory] PickupObject"),!!1));_(A.ToggleFavoriteItem,(t,e)=>(e.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));_(A.PutItemInStorage,(t,e)=>(e.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));_(A.RetrieveItemFromStorage,(t,e)=>(e.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));_(A.MoveStorageItem,(t,e)=>(e.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));_(A.LogItems,(t,e)=>(e.debug&&console.log("[MW][Inventory] LogItems"),!!1));_(A.PlacePet,(t,e)=>(e.debug&&console.log("[MW][Pets] PlacePet"),!!1));_(A.FeedPet,(t,e)=>(e.debug&&console.log("[MW][Pets] FeedPet"),!!1));_(A.PetPositions,(t,e)=>(e.debug&&console.log("[MW][Pets] PetPositions"),!!1));_(A.SwapPet,(t,e)=>(e.debug&&console.log("[MW][Pets] SwapPet"),!!1));_(A.StorePet,(t,e)=>(e.debug&&console.log("[MW][Pets] StorePet"),!!1));_(A.NamePet,(t,e)=>(e.debug&&console.log("[MW][Pets] NamePet"),!!1));_(A.SellPet,(t,e)=>(e.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");_(A.SetSelectedGame,(t,e)=>(e.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));_(A.VoteForGame,(t,e)=>(e.debug&&console.log("[MW][Session] VoteForGame"),!!1));_(A.RequestGame,(t,e)=>(e.debug&&console.log("[MW][Session] RequestGame"),!!1));_(A.RestartGame,(t,e)=>(e.debug&&console.log("[MW][Session] RestartGame"),!!1));_(A.Ping,(t,e)=>(e.debug&&console.log("[MW][Session] Ping"),!!1));_(A.PlayerPosition,(t,e)=>(e.debug&&console.log("[MW][Session] PlayerPosition"),!!1));_(A.Teleport,(t,e)=>(e.debug&&console.log("[MW][Session] Teleport"),!!1));_(A.CheckWeatherStatus,(t,e)=>(e.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));_(A.Chat,(t,e)=>(e.debug&&console.log("[MW][Social] Chat"),!!1));_(A.Dev,(t,e)=>(e.debug&&console.log("[MW][Social] Dev"),!!1));_(A.Emote,(t,e)=>(e.debug&&console.log("[MW][Social] Emote"),!!1));_(A.Wish,(t,e)=>(e.debug&&console.log("[MW][Social] Wish"),!!1));_(A.KickPlayer,(t,e)=>(e.debug&&console.log("[MW][Social] KickPlayer"),!!1));_(A.ReportSpeakingStart,(t,e)=>(e.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));_(A.SetPlayerData,(t,e)=>(e.debug&&console.log("[MW][Social] SetPlayerData"),!!1));_(A.UsurpHost,(t,e)=>(e.debug&&console.log("[MW][Social] UsurpHost"),!!1));function mo(t={}){let e=t.pageWindow??V,n=t.pollMs??500,r=!!t.debug,o=[];o.push(Tt(e,{debug:r})),o.push(nn({pageWindow:e,middlewares:t.middlewares,debug:r}));let a=null,i=c=>{if(a){try{a()}catch{}a=null}c&&(a=an(c,t.handlers,{debug:r,pageWindow:e}))};return i(we(e).ws),o.push(Et(c=>i(c.ws),{intervalMs:n,debug:r,pageWindow:e})),{getWs:()=>we(e).ws,dispose:()=>{for(let c=o.length-1;c>=0;c--)try{o[c]()}catch{}if(a){try{a()}catch{}a=null}}}}var De=null;function sn(t={}){return De||(De=mo(t),De)}(async function(){"use strict";sn({debug:!1});let t=Qe();Yt();let e=Xe({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:n=>ge("width",n),onOpenChange:n=>ge("isOpen",n),themes:ie,initialTheme:t.theme,onThemeChange:n=>ge("theme",n),buildSections:n=>je({applyTheme:n.applyTheme,initialTheme:n.initialTheme,getCurrentTheme:n.getCurrentTheme}),initialTab:t.activeTab,onTabChange:n=>ge("activeTab",n)});Jt({onClick:()=>e.setOpen(!0)})})();})();
