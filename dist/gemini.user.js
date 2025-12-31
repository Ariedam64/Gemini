// ==UserScript==
// @name         Gemini
// @namespace    Gemini
// @version      1.0.0
// @author
// @license      ISC
// @match        https://1227719606223765687.discordsays.com/*
// @match        https://magiccircle.gg/r/*
// @match        https://magicgarden.gg/r/*
// @match        https://starweaver.org/r/*
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/system.min.js
// @require      https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/extras/named-register.min.js
// @require      data:application/javascript,%3B(typeof%20System!%3D'undefined')%26%26(System%3Dnew%20System.constructor())%3B
// @resource     ICON  https://imgur.com/a/nf1ZKbp
// @connect      i.imgur.com
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @inject-into  page
// @run-at       document-start
// ==/UserScript==


System.register("./__entry.js", ['./__monkey.entry-CmM9JT29.js'], (function (exports, module) {
	'use strict';
	return {
		setters: [null],
		execute: (function () {



		})
	};
}));

System.register("./__monkey.entry-CmM9JT29.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      exports({
        O: Oa,
        P: Pf,
        R: Ra,
        _: _f,
        a: Og
      });

      var us=Object.defineProperty;var ps=(e,t,n)=>t in e?us(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var ae=(e,t,n)=>ps(e,typeof t!="symbol"?t+"":t,n);function w(e,t=null,...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(const r of n)r==null||r===false||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}const nn="https://i.imgur.com/k5WuC32.png",yo="gemini-loader-style",et="gemini-loader",di=80;function fs(){if(document.getElementById(yo))return;const e=document.createElement("style");e.id=yo,e.textContent=`
    /* ===== Loader Variables ===== */
    #${et} {
      --loader-bg: rgba(10, 12, 18, 0.6);
      --loader-card-bg: rgba(10, 12, 18, 0.82);
      --loader-fg: #e5e7eb;
      --loader-muted: rgba(229, 231, 235, 0.08);
      --loader-soft: rgba(229, 231, 235, 0.05);
      --loader-accent: #60a5fa;
      --loader-border: rgba(148, 163, 184, 0.2);
      --loader-shadow: rgba(0, 0, 0, 0.45);
      --loader-blur: 14px;
      --loader-radius: 18px;
      --loader-pill-from: #6366f1;
      --loader-pill-to: #06b6d4;

      --loader-info: #60a5fa;
      --loader-success: #4ade80;
      --loader-error: #f87171;
    }

    /* ===== Overlay ===== */
    #${et} {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 28px 18px;
      background: var(--loader-bg);
      backdrop-filter: blur(var(--loader-blur));
      -webkit-backdrop-filter: blur(var(--loader-blur));
      color: var(--loader-fg);
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Inter, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* ===== Card ===== */
    .gemini-loader__card {
      position: relative;
      z-index: 1;
      width: min(480px, 94vw);
      background: var(--loader-card-bg);
      border: 1px solid var(--loader-border);
      border-radius: var(--loader-radius);
      padding: 20px;
      box-shadow: 0 20px 60px var(--loader-shadow);
      backdrop-filter: blur(var(--loader-blur));
      -webkit-backdrop-filter: blur(var(--loader-blur));
    }

    /* ===== Header ===== */
    .gemini-loader__header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
    }

    /* ===== Spinner ===== */
    .gemini-loader__spinner {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid var(--loader-muted);
      border-top-color: var(--loader-pill-from);
      border-right-color: var(--loader-pill-to);
      animation: gemini-loader-spin 1s linear infinite;
      box-shadow: 0 0 20px color-mix(in oklab, var(--loader-pill-from) 40%, transparent);
      flex-shrink: 0;
    }

    .gemini-loader__spinner-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      animation: gemini-loader-spin-reverse 1s linear infinite;
    }

    /* ===== Titles ===== */
    .gemini-loader__titles {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .gemini-loader__title {
      font-size: 17px;
      font-weight: 600;
      color: var(--loader-fg);
    }

    .gemini-loader__subtitle {
      font-size: 13px;
      color: color-mix(in oklab, var(--loader-fg) 70%, transparent);
      line-height: 1.4;
    }

    /* ===== Logs container ===== */
    .gemini-loader__logs {
      background: var(--loader-soft);
      border: 1px solid var(--loader-border);
      border-radius: 12px;
      padding: 10px 12px;
      max-height: 240px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 12px;
      color: var(--loader-fg);
    }

    .gemini-loader__logs::-webkit-scrollbar {
      width: 8px;
    }
    .gemini-loader__logs::-webkit-scrollbar-thumb {
      background: var(--loader-muted);
      border-radius: 8px;
    }

    /* ===== Log entry ===== */
    .gemini-loader__log {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      line-height: 1.4;
      word-break: break-word;
    }

    .gemini-loader__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 4px;
      flex-shrink: 0;
      box-shadow: 0 0 8px currentColor;
    }

    .gemini-loader__log.info { color: color-mix(in oklab, var(--loader-info) 85%, var(--loader-fg)); }
    .gemini-loader__log.info .gemini-loader__dot { background: var(--loader-info); color: var(--loader-info); }

    .gemini-loader__log.success { color: color-mix(in oklab, var(--loader-success) 85%, var(--loader-fg)); }
    .gemini-loader__log.success .gemini-loader__dot { background: var(--loader-success); color: var(--loader-success); }

    .gemini-loader__log.error { color: color-mix(in oklab, var(--loader-error) 85%, var(--loader-fg)); }
    .gemini-loader__log.error .gemini-loader__dot { background: var(--loader-error); color: var(--loader-error); }

    /* ===== Actions (error state) ===== */
    .gemini-loader__actions {
      display: none;
      margin-top: 14px;
      justify-content: flex-end;
    }

    #${et}.gemini-loader--error .gemini-loader__actions {
      display: flex;
    }

    .gemini-loader__button {
      appearance: none;
      border: 1px solid color-mix(in oklab, var(--loader-error) 50%, var(--loader-border));
      background: linear-gradient(
        180deg,
        color-mix(in oklab, var(--loader-error) 25%, transparent) 0%,
        color-mix(in oklab, var(--loader-error) 35%, transparent) 100%
      );
      color: var(--loader-fg);
      padding: 8px 14px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 8px 20px color-mix(in oklab, var(--loader-error) 25%, transparent);
      transition: transform 0.08s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }

    .gemini-loader__button:hover {
      border-color: var(--loader-error);
      box-shadow: 0 10px 24px color-mix(in oklab, var(--loader-error) 35%, transparent);
    }

    .gemini-loader__button:active {
      transform: scale(0.98);
    }

    /* ===== States ===== */
    #${et}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${et}.gemini-loader--error .gemini-loader__spinner {
      animation: none;
      border-color: color-mix(in oklab, var(--loader-error) 30%, var(--loader-muted));
      border-top-color: var(--loader-error);
      border-right-color: var(--loader-error);
      box-shadow: 0 0 20px color-mix(in oklab, var(--loader-error) 40%, transparent);
    }

    /* ===== Animations ===== */
    @keyframes gemini-loader-spin {
      to { transform: rotate(360deg); }
    }

    @keyframes gemini-loader-spin-reverse {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(-360deg); }
    }

    @keyframes gemini-loader-fade-out {
      to { opacity: 0; visibility: hidden; }
    }

    /* ===== Responsive ===== */
    @media (max-width: 520px) {
      #${et} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e);}function rn(e,t,n){const o=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>di;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function gs(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(nn);return}GM_xmlhttpRequest({method:"GET",url:nn,responseType:"blob",onload:t=>{const n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(nn),o.readAsDataURL(n);},onerror:()=>e(nn)});})}function ms(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;fs();const n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=w("div",{className:"gemini-loader__logs"}),r=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=w("div",{className:"gemini-loader__spinner"},r);gs().then(h=>{r.src=h;});const a=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},i,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=w("div",{id:et},a);(document.body||document.documentElement).appendChild(s);const c=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const u=h=>{n.textContent=h;},l=new Map,d=(h,y)=>{h.className=`gemini-loader__log ${y}`;};return {log:(h,y="info")=>rn(o,h,y),logStep:(h,y,S="info")=>{const v=String(h||"").trim();if(!v){rn(o,y,S);return}const b=l.get(v);if(b){b.el.lastElementChild&&(b.el.lastElementChild.textContent=y),b.tone!==S&&(d(b.el,S),b.tone=S);return}const C=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:y}));for(l.set(v,{el:C,tone:S}),o.appendChild(C);o.childElementCount>di;){const x=o.firstElementChild;if(!x)break;const A=Array.from(l.entries()).find(([,P])=>P.el===x)?.[0];A&&l.delete(A),x.remove();}o.scrollTop=o.scrollHeight;},setSubtitle:u,succeed:(h,y=600)=>{h&&rn(o,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),y);},fail:(h,y)=>{rn(o,h,"error"),u("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,y);}}}function hs(e,t,n){const o=w("div",{className:"lg-pill",id:"pill"}),r=e.map(l=>{const d=w("button",{className:"lg-tab"},l.label);return d.setAttribute("data-target",l.id),d}),i=w("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=i;i.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),i.scrollLeft+=l.deltaY);},{passive:false});function s(l){const d=i.getBoundingClientRect(),p=r.find(C=>C.dataset.target===l)||r[0];if(!p)return;const f=p.getBoundingClientRect(),g=f.left-d.left,m=f.width;o.style.width=`${m}px`,o.style.transform=`translateX(${g}px)`;const h=i.scrollLeft,y=h,S=h+i.clientWidth,v=g-12,b=g+m+12;v<y?i.scrollTo({left:v,behavior:"smooth"}):b>S&&i.scrollTo({left:b-i.clientWidth,behavior:"smooth"});}let c=t||(e[0]?.id??"");function u(l){c=l,r.forEach(d=>d.classList.toggle("active",d.dataset.target===l)),s(l),n(l);}return r.forEach(l=>l.addEventListener("click",()=>u(l.dataset.target))),queueMicrotask(()=>s(c)),{root:a,activate:u,recalc:()=>s(c),getActive:()=>c}}class qt{constructor(t){ae(this,"id");ae(this,"label");ae(this,"container",null);ae(this,"cleanupFunctions",[]);ae(this,"preloadedContent",null);ae(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=w("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const o=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class bs{constructor(t,n,o){ae(this,"sections");ae(this,"activeId",null);ae(this,"container");ae(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}function ui(e,t){try{const n=JSON.stringify(t);GM_setValue(e,n);}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n);}}function Pt(e,t){try{const n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}const pi="gemini.sections";function fi(){const e=Pt(pi,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function ys(e){ui(pi,e);}async function vs(e){return fi()[e]}function xs(e,t){const n=fi();ys({...n,[e]:t});}function vo(e,t){return {...e,...t??{}}}async function ws(e){const t=await vs(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((u=>JSON.parse(JSON.stringify(u)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){xs(e.path,n);}function i(){return n}function a(u){n=e.sanitize?e.sanitize(u):u,r();}function s(u){const d=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof u=="function"?u(d):Object.assign(d,u),n=e.sanitize?e.sanitize(d):d,r();}function c(){r();}return {get:i,set:a,update:s,save:c}}async function gi(e,t){const{path:n=e,...o}=t;return ws({path:n,...o})}let ks=0;const on=new Map;function Ce(e={},...t){const{id:n,className:o,variant:r="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:u,mediaTop:l,title:d,subtitle:p,badge:f,actions:g,footer:m,divider:h=false,tone:y="neutral",stateKey:S}=e,v=w("div",{className:"card",id:n,tabIndex:a?0:void 0});v.classList.add(`card--${r}`,`card--p-${i}`),a&&v.classList.add("card--interactive"),y!=="neutral"&&v.classList.add(`card--tone-${y}`),o&&v.classList.add(...o.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");const b=s?S??n??(typeof d=="string"?`title:${d}`:null):null;let C=!s||c;b&&on.has(b)&&(C=!!on.get(b));let x=null,A=null,P=null,T=null,_=null;const E=n?`${n}-collapse`:`card-collapse-${++ks}`,D=()=>{if(T!==null&&(cancelAnimationFrame(T),T=null),_){const j=_;_=null,j();}},ee=(j,$)=>{if(!P)return;D();const O=P;if(O.setAttribute("aria-hidden",String(!j)),!$){O.classList.remove("card-collapse--animating"),O.style.display=j?"":"none",O.style.height="",O.style.opacity="";return}if(O.classList.add("card-collapse--animating"),O.style.display="",j){O.style.height="auto";const G=O.scrollHeight;if(!G){O.classList.remove("card-collapse--animating"),O.style.display="",O.style.height="",O.style.opacity="";return}O.style.height="0px",O.style.opacity="0",O.offsetHeight,T=requestAnimationFrame(()=>{T=null,O.style.height=`${G}px`,O.style.opacity="1";});}else {const G=O.scrollHeight;if(!G){O.classList.remove("card-collapse--animating"),O.style.display="none",O.style.height="",O.style.opacity="";return}O.style.height=`${G}px`,O.style.opacity="1",O.offsetHeight,T=requestAnimationFrame(()=>{T=null,O.style.height="0px",O.style.opacity="0";});}const I=()=>{O.classList.remove("card-collapse--animating"),O.style.height="",j||(O.style.display="none"),O.style.opacity="";};let N=null;const R=G=>{G.target===O&&(N!==null&&(clearTimeout(N),N=null),O.removeEventListener("transitionend",R),O.removeEventListener("transitioncancel",R),_=null,I());};_=()=>{N!==null&&(clearTimeout(N),N=null),O.removeEventListener("transitionend",R),O.removeEventListener("transitioncancel",R),_=null,I();},O.addEventListener("transitionend",R),O.addEventListener("transitioncancel",R),N=window.setTimeout(()=>{_?.();},420);};function z(j){const $=document.createElementNS("http://www.w3.org/2000/svg","svg");return $.setAttribute("viewBox","0 0 24 24"),$.setAttribute("width","16"),$.setAttribute("height","16"),$.innerHTML=j==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',$}function Y(j,$=true,O=true){C=j,v.classList.toggle("card--collapsed",!C),v.classList.toggle("card--expanded",C),x&&(x.dataset.expanded=String(C),x.setAttribute("aria-expanded",String(C))),A&&(A.setAttribute("aria-expanded",String(C)),A.classList.toggle("card-toggle--collapsed",!C),A.setAttribute("aria-label",C?"Replier le contenu":"Deplier le contenu"),A.replaceChildren(z(C?"up":"down"))),s?ee(C,O):P&&(P.style.display="",P.style.height="",P.style.opacity="",P.setAttribute("aria-hidden","false")),$&&u&&u(C),b&&on.set(b,C);}if(l){const j=w("div",{className:"card-media"});j.append(l),v.appendChild(j);}const ie=!!(d||p||f||g&&g.length||s);if(ie){x=w("div",{className:"card-header"});const j=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(d){const I=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},d);f&&I.append(typeof f=="string"?w("span",{className:"badge"},f):f),j.appendChild(I);}if(p){const I=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);j.appendChild(I);}(j.childNodes.length||s)&&x.appendChild(j);const $=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),O=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(I=>O.appendChild(I)),O.childNodes.length&&$.appendChild(O),s&&(A=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(C),ariaControls:E,ariaLabel:C?"Replier le contenu":"Deplier le contenu"}),A.textContent=C?"▲":"▼",A.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),Y(!C);}),$.appendChild(A),x.classList.add("card-header--expandable"),x.addEventListener("click",I=>{const N=I.target;N?.closest(".card-actions")||N?.closest(".card-toggle")||Y(!C);})),$.childNodes.length&&x.appendChild($),v.appendChild(x);}P=w("div",{className:"card-collapse",id:E,ariaHidden:s?String(!C):"false"}),v.appendChild(P),h&&ie&&P.appendChild(w("div",{className:"card-divider"}));const W=w("div",{className:"card-body"});if(W.append(...t),P.appendChild(W),m){h&&P.appendChild(w("div",{className:"card-divider"}));const j=w("div",{className:"card-footer"});j.append(m),P.appendChild(j);}return A&&A.setAttribute("aria-controls",E),Y(C,false,false),b&&on.set(b,C),v}let Tn=false;const Pn=new Set,Ie=e=>{const t=document.activeElement;for(const n of Pn)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Ss(){Tn||(Tn=true,window.addEventListener("keydown",Ie,true),window.addEventListener("keypress",Ie,true),window.addEventListener("keyup",Ie,true),document.addEventListener("keydown",Ie,true),document.addEventListener("keypress",Ie,true),document.addEventListener("keyup",Ie,true));}function Cs(){Tn&&(Pn.size>0||(Tn=false,window.removeEventListener("keydown",Ie,true),window.removeEventListener("keypress",Ie,true),window.removeEventListener("keyup",Ie,true),document.removeEventListener("keydown",Ie,true),document.removeEventListener("keypress",Ie,true),document.removeEventListener("keyup",Ie,true)));}function As(e){const{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:u}=e,l=w("div",{className:"select",id:t}),d=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},r),f=w("span",{className:"select-caret"},"▾");d.append(p,f);const g=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let m=false,h=n,y=null,S=!!a;function v(I){return I==null?r:(e.options||o).find(R=>R.value===I)?.label??r}function b(I){p.textContent=v(I),g.querySelectorAll(".select-option").forEach(N=>{const R=N.dataset.value,G=I!=null&&R===I;N.classList.toggle("selected",G),N.setAttribute("aria-selected",String(G));});}function C(I){g.replaceChildren(),I.forEach(N=>{const R=w("button",{className:"select-option"+(N.disabled?" disabled":""),type:"button",role:"option","data-value":N.value,"aria-selected":String(N.value===h),tabindex:"-1"},N.label);N.value===h&&R.classList.add("selected"),N.disabled||R.addEventListener("pointerdown",G=>{G.preventDefault(),G.stopPropagation(),E(N.value,{notify:true}),T();},{capture:true}),g.appendChild(R);});}function x(){d.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function A(){const I=d.getBoundingClientRect();Object.assign(g.style,{minWidth:`${I.width}px`});}function P(){m||S||(m=true,l.classList.add("open"),x(),A(),document.addEventListener("mousedown",ie,true),document.addEventListener("scroll",W,true),window.addEventListener("resize",j),g.focus({preventScroll:true}),s&&(Ss(),Pn.add(l),y=()=>{Pn.delete(l),Cs();}),u?.(true));}function T(){m&&(m=false,l.classList.remove("open"),x(),document.removeEventListener("mousedown",ie,true),document.removeEventListener("scroll",W,true),window.removeEventListener("resize",j),d.focus({preventScroll:true}),y?.(),y=null,u?.(false));}function _(){m?T():P();}function E(I,N={}){const R=h;h=I,b(h),N.notify!==false&&R!==I&&c?.(I);}function D(){return h}function ee(I){const N=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!N.length)return;const R=N.findIndex(fe=>fe.classList.contains("active")),G=N[(R+(I===1?1:N.length-1))%N.length];N.forEach(fe=>fe.classList.remove("active")),G.classList.add("active"),G.focus({preventScroll:true}),G.scrollIntoView({block:"nearest"});}function z(I){(I.key===" "||I.key==="Enter"||I.key==="ArrowDown")&&(I.preventDefault(),P());}function Y(I){if(I.key==="Escape"){I.preventDefault(),T();return}if(I.key==="Enter"||I.key===" "){const N=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");N&&!N.classList.contains("disabled")&&(I.preventDefault(),E(N.dataset.value,{notify:true}),T());return}if(I.key==="ArrowDown"){I.preventDefault(),ee(1);return}if(I.key==="ArrowUp"){I.preventDefault(),ee(-1);return}}function ie(I){l.contains(I.target)||T();}function W(){m&&A();}function j(){m&&A();}function $(I){S=!!I,d.disabled=S,l.classList.toggle("disabled",S),S&&T();}function O(I){e.options=I,C(I),I.some(N=>N.value===h)||(h=null,b(null));}return l.append(d,g),d.addEventListener("pointerdown",I=>{I.preventDefault(),I.stopPropagation(),_();},{capture:true}),d.addEventListener("keydown",z),g.addEventListener("keydown",Y),C(o),n!=null?(h=n,b(h)):b(null),x(),$(S),{root:l,open:P,close:T,toggle:_,getValue:D,setValue:E,setOptions:O,setDisabled:$,destroy(){document.removeEventListener("mousedown",ie,true),document.removeEventListener("scroll",W,true),window.removeEventListener("resize",j),y?.(),y=null;}}}function jn(e={}){const{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:u=false,tooltip:l,hint:d,icon:p,suffix:f,onClick:g}=e,m=w("div",{className:"lg-label-wrap",id:t}),h=w("label",{className:"lg-label",...o?{htmlFor:o}:{},...l?{title:l}:{}});if(p){const E=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),h.appendChild(E);}const y=w("span",{className:"lg-label-text"},n);h.appendChild(y);const S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(S);let v=null;if(f!=null){v=typeof f=="string"?document.createTextNode(f):f;const E=w("span",{className:"lg-label-suffix"});E.appendChild(v),h.appendChild(E);}const b=d?w("div",{className:"lg-label-hint"},d):null;m.classList.add(`lg-label--${a}`),m.classList.add(`lg-label--${i}`),s==="title"&&m.classList.add("lg-label--title"),C(r),u&&m.classList.add("is-disabled"),m.appendChild(h),b&&m.appendChild(b),g&&h.addEventListener("click",g);function C(E){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${E}`);}function x(E){y.textContent=E;}function A(E){C(E);}function P(E){E&&!S.isConnected&&h.appendChild(S),!E&&S.isConnected&&S.remove(),E?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function T(E){m.classList.toggle("is-disabled",!!E);}function _(E){!E&&b&&b.isConnected?b.remove():E&&b?b.textContent=E:E&&!b&&m.appendChild(w("div",{className:"lg-label-hint"},E));}return {root:m,labelEl:h,hintEl:b,setText:x,setTone:A,setRequired:P,setDisabled:T,setHint:_}}function It(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function an(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const o=It(e);return o&&n.appendChild(o),n}function Ts(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Ft(e={}){const{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:u="button",onClick:l,disabled:d=false,fullWidth:p=false}=e,f=w("button",{className:"btn",id:n});f.type=u,o==="primary"&&f.classList.add("primary"),o==="danger"&&f.classList.add("danger"),r==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=Ts(),m=i?an(i,"left"):null,h=a?an(a,"right"):null,y=document.createElement("span");y.className="btn-label";const S=It(t);S&&y.appendChild(S),!S&&(m||h)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(y),h&&f.appendChild(h);const v=d||s;f.disabled=v,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const b=f;return b.setLoading=C=>{f.setAttribute("aria-busy",String(!!C)),g.style.display=C?"inline-block":"none",f.disabled=C||d;},b.setDisabled=C=>{f.disabled=C||f.getAttribute("aria-busy")==="true";},b.setLabel=C=>{y.replaceChildren();const x=It(C);x&&y.appendChild(x),!x&&(m||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},b.setIconLeft=C=>{if(C==null){m?.remove();return}m?m.replaceChildren(It(C)):f.insertBefore(an(C,"left"),y);},b.setIconRight=C=>{if(C==null){h?.remove();return}h?h.replaceChildren(It(C)):f.appendChild(an(C,"right"));},b.setVariant=C=>{f.classList.remove("primary","danger"),C==="primary"&&f.classList.add("primary"),C==="danger"&&f.classList.add("danger");},b}let br=null;function Ps(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function mi(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const r=n.platform.toLowerCase();if(r.includes("windows"))return "windows";if(r.includes("mac"))return "mac";if(r.includes("android"))return "android";if(r.includes("chrome os")||r.includes("cros"))return "chromeos";if(r.includes("linux"))return "linux";if(r.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function hi(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return "Edge";if(r)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Is(){if(br)return br;const e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function Ms(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Wr(){const e=(()=>{try{return window.top!==window.self}catch{return  true}})(),t=Ms(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=Is(),i=mi(),a=hi(),s=window.screen||{},c=window.visualViewport,u=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),d=Math.round(c?.width??u),p=Math.round(c?.height??l),f=Math.round(s.width||0),g=Math.round(s.height||0),m=Math.round(s.availWidth||f),h=Math.round(s.availHeight||g),y=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return {surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:a,os:i,viewportWidth:u,viewportHeight:l,visualViewportWidth:d,visualViewportHeight:p,screenWidth:f,screenHeight:g,availScreenWidth:m,availScreenHeight:h,dpr:y,orientation:Ps()}}function Es(){return Wr().surface==="discord"}function Ls(){return Wr().platform==="mobile"}const Ue={detect:Wr,isDiscord:Es,isMobile:Ls,detectOS:mi,detectBrowser:hi,setPlatformOverride:e=>{br=e;}};let In=false;const Mt=new Set;function _s(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Me=e=>{const t=_s();if(t){for(const n of Mt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Os(){In||(In=true,window.addEventListener("keydown",Me,true),window.addEventListener("keypress",Me,true),window.addEventListener("keyup",Me,true),document.addEventListener("keydown",Me,true),document.addEventListener("keypress",Me,true),document.addEventListener("keyup",Me,true));}function Rs(){In&&(In=false,window.removeEventListener("keydown",Me,true),window.removeEventListener("keypress",Me,true),window.removeEventListener("keyup",Me,true),document.removeEventListener("keydown",Me,true),document.removeEventListener("keypress",Me,true),document.removeEventListener("keyup",Me,true));}function Ns(e){return Mt.size===0&&Os(),Mt.add(e),()=>{Mt.delete(e),Mt.size===0&&Rs();}}function $s(e,t,n,o){let r;switch(e){case "digits":r="0-9";break;case "alpha":r="\\p{L}";break;case "alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Ds(e,t){return t?e.replace(t,""):e}function js(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t);})}function zs(e={}){const{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:u=true,debounceMs:l=0,onChange:d,onEnter:p,label:f}=e,g=w("div",{className:"lg-input-wrap"}),m=w("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),o&&(m.value=o),f){const E=w("div",{className:"lg-input-label"},f);g.appendChild(E);}g.appendChild(m);const h=$s(r,i,a,s),y=()=>{const E=m.selectionStart??m.value.length,D=m.value.length,ee=Ds(m.value,h);if(ee!==m.value){m.value=ee;const z=D-ee.length,Y=Math.max(0,E-z);m.setSelectionRange(Y,Y);}},S=js(()=>d?.(m.value),l);m.addEventListener("input",()=>{y(),S();}),m.addEventListener("paste",()=>queueMicrotask(()=>{y(),S();})),m.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(m.value);});const v=u?Ns(m):()=>{};function b(){return m.value}function C(E){m.value=E??"",y(),S();}function x(){m.focus();}function A(){m.blur();}function P(E){m.disabled=!!E;}function T(){return document.activeElement===m}function _(){v();}return {root:g,input:m,getValue:b,setValue:C,focus:x,blur:A,setDisabled:P,isFocused:T,destroy:_}}function me(e,t,n){return Math.min(n,Math.max(t,e))}function Rt({h:e,s:t,v:n,a:o}){const r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1));let s=0,c=0,u=0;switch(Math.floor(r)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,u=a;break;case 3:c=a,u=i;break;case 4:s=a,u=i;break;default:s=i,u=a;break}const d=n-i,p=Math.round((s+d)*255),f=Math.round((c+d)*255),g=Math.round((u+d)*255);return {r:me(p,0,255),g:me(f,0,255),b:me(g,0,255),a:me(o,0,1)}}function bi({r:e,g:t,b:n,a:o}){const r=me(e,0,255)/255,i=me(t,0,255)/255,a=me(n,0,255)/255,s=Math.max(r,i,a),c=Math.min(r,i,a),u=s-c;let l=0;u!==0&&(s===r?l=60*((i-a)/u%6):s===i?l=60*((a-r)/u+2):l=60*((r-i)/u+4)),l<0&&(l+=360);const d=s===0?0:u/s;return {h:l,s:d,v:s,a:me(o,0,1)}}function Hr({r:e,g:t,b:n}){const o=r=>me(Math.round(r),0,255).toString(16).padStart(2,"0");return `#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Fs({r:e,g:t,b:n,a:o}){const r=me(Math.round(o*255),0,255);return `${Hr({r:e,g:t,b:n})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function Et({r:e,g:t,b:n,a:o}){const r=Math.round(o*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${r})`}function dt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r:o,g:r,b:i,a:n/255}}function yr(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return dt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const o=n[1].split(",").map(c=>c.trim());if(o.length<3)return null;const r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return [r,i,a,s].some(c=>Number.isNaN(c))?null:{r,g:i,b:a,a:s}}return null}function Gs(e,t){const n=yr(e)??dt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=me(t,0,1)),bi(n)}function Bs(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Ws(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Je(e){const t=Rt(e),n=Rt({...e,a:1});return {hsva:{...e},hex:Hr(n),hexa:Fs(t),rgba:Et(t),alpha:e.a}}function Hs(e={}){const{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():Ue.detect().platform==="mobile";let d=Gs(o,r);const p=Ce({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const h=p.querySelector(".card-toggle");!l&&h&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const y=p.querySelector(".card-collapse");let S=null,v=null,b=null,C=null,x=null,A=null,P=null,T=null,_=null,E="hex";function D(W){const j=Je(d);W==="input"?s?.(j):c?.(j);}function ee(){const W=Je(d);if(m.style.setProperty("--cp-preview-color",W.rgba),m.setAttribute("aria-label",`${n}: ${W.hexa}`),!l&&S&&v&&b&&C&&x&&A&&P){const j=Rt({...d,s:1,v:1,a:1}),$=Et(j);S.style.setProperty("--cp-palette-hue",$),v.style.left=`${d.s*100}%`,v.style.top=`${(1-d.v)*100}%`,b.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Et({...j,a:1})} 0%, ${Et({...j,a:0})} 100%)`),C.style.top=`${(1-d.a)*100}%`,x.style.setProperty("--cp-hue-color",Et(Rt({...d,v:1,s:1,a:1}))),A.style.left=`${d.h/360*100}%`;const O=d.a===1?W.hex:W.hexa,I=W.rgba,N=E==="hex"?O:I;P!==document.activeElement&&(P.value=N),P.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),P.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?P.maxLength=9:P.removeAttribute("maxLength"),P.dataset.mode=E,T&&(T.textContent=E.toUpperCase(),T.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),T.setAttribute("aria-pressed",E==="rgba"?"true":"false"),T.classList.toggle("is-alt",E==="rgba"));}_&&_!==document.activeElement&&(_.value=W.hex);}function z(W,j=null){d={h:(W.h%360+360)%360,s:me(W.s,0,1),v:me(W.v,0,1),a:me(W.a,0,1)},ee(),j&&D(j);}function Y(W,j=null){z(bi(W),j);}function ie(W,j,$){W.addEventListener("pointerdown",O=>{O.preventDefault();const I=O.pointerId,N=G=>{G.pointerId===I&&j(G);},R=G=>{G.pointerId===I&&(document.removeEventListener("pointermove",N),document.removeEventListener("pointerup",R),document.removeEventListener("pointercancel",R),$?.(G));};j(O),document.addEventListener("pointermove",N),document.addEventListener("pointerup",R),document.addEventListener("pointercancel",R);});}if(!l&&y){const W=y.querySelector(".card-body");if(W){W.classList.add("color-picker__body"),v=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},v),C=w("div",{className:"color-picker__alpha-thumb"}),b=w("div",{className:"color-picker__alpha"},C),A=w("div",{className:"color-picker__hue-thumb"}),x=w("div",{className:"color-picker__hue"},A);const j=w("div",{className:"color-picker__main"},S,b),$=w("div",{className:"color-picker__hue-row"},x),O=zs({blockGameKeys:true});P=O.input,P.classList.add("color-picker__hex-input"),P.value="",P.maxLength=9,P.spellcheck=false,P.inputMode="text",P.setAttribute("aria-label",`Hex code for ${n}`),T=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),O.root.classList.add("color-picker__hex-wrap");const I=w("div",{className:"color-picker__hex-row"},T,O.root);W.replaceChildren(j,$,I),ie(S,R=>{if(!S||!v)return;const G=S.getBoundingClientRect(),fe=me((R.clientX-G.left)/G.width,0,1),st=me((R.clientY-G.top)/G.height,0,1);z({...d,s:fe,v:1-st},"input");},()=>D("change")),ie(b,R=>{if(!b)return;const G=b.getBoundingClientRect(),fe=me((R.clientY-G.top)/G.height,0,1);z({...d,a:1-fe},"input");},()=>D("change")),ie(x,R=>{if(!x)return;const G=x.getBoundingClientRect(),fe=me((R.clientX-G.left)/G.width,0,1);z({...d,h:fe*360},"input");},()=>D("change")),T.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",P){const R=Je(d);P.value=E==="hex"?d.a===1?R.hex:R.hexa:R.rgba;}ee(),P?.focus(),P?.select();}),P.addEventListener("input",()=>{if(E==="hex"){const R=Bs(P.value);if(R!==P.value){const G=P.selectionStart??R.length;P.value=R,P.setSelectionRange(G,G);}}});const N=()=>{const R=P.value;if(E==="hex"){const G=dt(R);if(!G){P.value=d.a===1?Je(d).hex:Je(d).hexa;return}const fe=R.startsWith("#")?R.slice(1):R,st=fe.length===4||fe.length===8;G.a=st?G.a:d.a,Y(G,"change");}else {const G=Ws(R),fe=yr(G);if(!fe){P.value=Je(d).rgba;return}Y(fe,"change");}};P.addEventListener("change",N),P.addEventListener("blur",N),P.addEventListener("keydown",R=>{R.key==="Enter"&&(N(),P.blur());});}}return l&&(y&&y.remove(),_=w("input",{className:"color-picker__native",type:"color",value:Hr(Rt({...d,a:1}))}),m.addEventListener("click",()=>_.click()),_.addEventListener("input",()=>{const W=dt(_.value);W&&(W.a=d.a,Y(W,"input"),D("change"));}),p.appendChild(_)),ee(),{root:p,isMobile:l,getValue:()=>Je(d),setValue:(W,j)=>{const $=yr(W)??dt(W)??dt("#FFFFFF");$&&(typeof j=="number"&&($.a=j),Y($,null));}}}const Vs=window;function Us(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Vs}const Ks=Us(),L=Ks;function qs(e){try{return !!e.isSecureContext}catch{return  false}}function Vr(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function yi(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Js(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Ys(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Xs(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Zs(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!qs(L))return {ok:false,method:"clipboard-write"};if(!await Js())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Qs(e,t){try{const n=t||Vr(),o=Ys(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy");}catch{r=!1;}return o.remove(),{ok:r,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function el(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let o=false;if(n!==e)try{t.textContent=e,o=!0;}catch{}const r=Xs(t);o&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=yi()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:r,method:"selection",hint:i}}async function tl(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const o=await Zs(n);if(o.ok)return o;const r=t.injectionRoot||Vr(t.valueNode||void 0),i=Qs(n,r);if(i.ok)return i;const a=el(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Ue.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function nl(e,t,n={}){const o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);const i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=Vr(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();const i=(t()??"").toString(),a=await tl(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copié"):a.method==="selection"&&o(a.hint||(yi()?"⌘C pour copier":"Ctrl+C pour copier")):o("Impossible de copier");});}const Nt={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)"}};function rl(e){const{host:t,themes:n,initialTheme:o,onThemeChange:r}=e;let i=o,a=null,s=false;function c(l){const d=n[l]||n[i]||{};s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(d))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=L.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,r?.(l);}function u(){return i}return c(o),{applyTheme:c,getCurrentTheme:u}}const vr={ui:{expandedCards:{style:false,system:false}}};async function ol(){const e=await gi("tab-settings",{version:1,defaults:vr,sanitize:r=>({ui:{expandedCards:vo(vr.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:vo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function vi(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function il(){return Object.keys(Nt).map(e=>({value:e,label:vi(e)}))}const al=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function sl(e){return vi(e.replace(/^--/,""))}function ll(e){return e.alpha<1?e.rgba:e.hex}class cl extends qt{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let o;try{o=await ol();}catch{o={get:()=>vr,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const r=o.get(),i=Object.keys(Nt),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const u=jn({text:"Theme",tone:"muted",size:"lg"}),l=As({options:il(),value:s,onChange:g=>{c=g,this.deps.applyTheme(g),this.renderThemePickers(g,d,c);}}),d=w("div",{className:"settings-theme-grid"}),p=Ce({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!r.ui.expandedCards.style,onExpandChange:g=>o.setCardExpanded("style",g)},w("div",{className:"kv settings-theme-row"},u.root,l.root),d);this.renderThemePickers(s,d,c);const f=this.createEnvCard({defaultExpanded:!!r.ui.expandedCards.system,onExpandChange:g=>o.setCardExpanded("system",g)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,o){const r=Nt[t];if(n.replaceChildren(),!!r)for(const i of al){const a=r[i];if(a==null)continue;const s=Hs({label:sl(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,o),onChange:c=>this.updateThemeVar(t,i,c,o)});n.appendChild(s.root);}}updateThemeVar(t,n,o,r){const i=Nt[t];i&&(i[n]=ll(o),r===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,o=t?.onExpandChange,r=(h,y)=>{const S=w("div",{className:"kv kv--inline-mobile"}),v=w("label",{},h),b=w("div",{className:"ro"});return typeof y=="string"?b.textContent=y:b.append(y),S.append(v,b),S},i=w("code",{},"—"),a=w("span",{},"—"),s=w("span",{},"—"),c=w("span",{},"—"),u=w("span",{},"—"),l=w("span",{},"—"),d=()=>{const h=Ue.detect();s.textContent=h.surface,c.textContent=h.platform,u.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",i.textContent=h.host,a.textContent=h.isInIframe?"Yes":"No";},p=Ft({label:"Copy JSON",variant:"primary",size:"sm"});nl(p,()=>{const h=Ue.detect();return JSON.stringify(h,null,2)});const f=w("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=Ce({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:o},r("Surface",s),r("Platform",c),r("Browser",u),r("OS",l),r("Host",i),r("Iframe",a)),m=()=>{document.hidden||d();};return document.addEventListener("visibilitychange",m),d(),this.addCleanup(()=>document.removeEventListener("visibilitychange",m)),g}}function Ur(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,c=w("div",{className:"lg-switch-wrap"}),u=w("button",{className:`lg-switch lg-switch--${r}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!o),title:i??"Basculer"}),l=w("span",{className:"lg-switch-track"}),d=w("span",{className:"lg-switch-thumb"});u.append(l,d);let p=null;i&&a!=="none"&&(p=w("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,u):p&&a==="right"?c.append(u,p):c.append(u);let f=!!n,g=!!o;function m(){u.classList.toggle("on",f),u.setAttribute("aria-checked",String(f)),u.disabled=g,u.setAttribute("aria-disabled",String(g));}function h(T=false){g||(f=!f,m(),T||s?.(f));}function y(T){T.preventDefault(),h();}function S(T){g||((T.key===" "||T.key==="Enter")&&(T.preventDefault(),h()),T.key==="ArrowLeft"&&(T.preventDefault(),b(false)),T.key==="ArrowRight"&&(T.preventDefault(),b(true)));}u.addEventListener("click",y),u.addEventListener("keydown",S);function v(){return f}function b(T,_=false){f=!!T,m(),_||s?.(f);}function C(T){g=!!T,m();}function x(T){if(!T){p&&(p.remove(),p=null);return}p?p.textContent=T:(p=w("span",{className:"lg-switch-label"},T),c.append(p));}function A(){u.focus();}function P(){u.removeEventListener("click",y),u.removeEventListener("keydown",S);}return m(),{root:c,button:u,isChecked:v,setChecked:b,setDisabled:C,setLabel:x,focus:A,destroy:P}}function xi(e){const{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:u=false,maxHeight:l,selectable:d=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:h=(F,V)=>String(V),onSortChange:y,onSelectionChange:S,onRowClick:v}=e;let b=n.slice(),C=o.slice(),x=o.slice(),A=null,P=null,T=1;const _=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,E=!!s&&!(c&&_),D=w("div",{className:"lg-table-wrap",id:t});if(l!=null){const F=typeof l=="number"?`${l}px`:l;D.style.setProperty("--tbl-max-h",F);}const ee=w("div",{className:"lg-table"}),z=w("div",{className:"lg-thead"}),Y=w("div",{className:"lg-tbody"}),ie=w("div",{className:"lg-tfoot"});i&&D.classList.add("sticky"),a&&D.classList.add("zebra"),u&&D.classList.add("compact"),d&&D.classList.add("selectable");const W=p==="switch"?"52px":"36px";D.style.setProperty("--check-w",W);function j(F){return F==="center"?"center":F==="right"?"flex-end":"flex-start"}function $(){const F=b.map(Q=>{const re=(Q.width||"1fr").trim();return /\bfr$/.test(re)?`minmax(0, ${re})`:re}),V=(d?[W,...F]:F).join(" ");D.style.setProperty("--lg-cols",V);}$();function O(){return r?Math.max(1,Math.ceil(C.length/r)):1}function I(){if(!r)return C;const F=(T-1)*r;return C.slice(F,F+r)}function N(){if(!A||!P)return;const F=b.find(re=>String(re.key)===A),V=P==="asc"?1:-1,Q=F?.sortFn?(re,se)=>V*F.sortFn(re,se):(re,se)=>{const J=re[A],Z=se[A];return J==null&&Z==null?0:J==null?-1*V:Z==null?1*V:typeof J=="number"&&typeof Z=="number"?V*(J-Z):V*String(J).localeCompare(String(Z),void 0,{numeric:true,sensitivity:"base"})};C.sort(Q);}const R=new Set(g);function G(){return Array.from(R)}const fe=new Map;function st(F){R.clear(),F.forEach(V=>R.add(V)),ke(),fe.forEach((V,Q)=>{V.setChecked(R.has(Q),true);}),St(),S?.(G());}function ne(){R.clear(),ke(),fe.forEach(F=>F.setChecked(false,true)),St(),S?.(G());}let ue=null;function ke(){if(!ue)return;const F=I();if(!F.length){ue.indeterminate=false,ue.checked=false;return}const V=F.map((re,se)=>h(re,(T-1)*(r||0)+se)),Q=V.reduce((re,se)=>re+(R.has(se)?1:0),0);ue.checked=Q===V.length,ue.indeterminate=Q>0&&Q<V.length;}function Qt(){const F=Y.offsetWidth-Y.clientWidth;z.style.paddingRight=F>0?`${F}px`:"0px";}function Kn(){requestAnimationFrame(Qt);}const qn=new ResizeObserver(()=>Qt()),go=()=>Qt();function is(){z.replaceChildren();const F=w("div",{className:"lg-tr lg-tr-head"});if(d){const V=w("div",{className:"lg-th lg-th-check"});m||(ue=w("input",{type:"checkbox"}),ue.addEventListener("change",()=>{const Q=I(),re=ue.checked;Q.forEach((se,J)=>{const Z=h(se,(T-1)*(r||0)+J);re?R.add(Z):R.delete(Z);}),S?.(G()),St();}),V.appendChild(ue)),F.appendChild(V);}b.forEach(V=>{const Q=w("button",{className:"lg-th",type:"button",title:V.title||V.header});Q.textContent=V.header,V.align&&Q.style.setProperty("--col-justify",j(V.align)),V.sortable&&Q.classList.add("sortable"),A===String(V.key)&&P?Q.setAttribute("data-sort",P):Q.removeAttribute("data-sort"),V.sortable&&Q.addEventListener("click",()=>{const re=String(V.key);A!==re?(A=re,P="asc"):(P=P==="asc"?"desc":P==="desc"?null:"asc",P||(A=null,C=x.slice())),y?.(A,P),A&&P&&N(),tn();}),F.appendChild(Q);}),z.appendChild(F);try{qn.disconnect();}catch{}qn.observe(Y),Kn();}function Jn(F){return Array.from(F.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function mo(F){return F.querySelector(".lg-td, .lg-td-check")}function ho(F){const V=mo(F);return V?V.getBoundingClientRect():null}function St(){const F=I(),V=new Map;Array.from(Y.children).forEach(J=>{const Z=J,xe=Z.getAttribute("data-id");if(!xe)return;const Te=ho(Z);Te&&V.set(xe,Te);});const Q=new Map;Array.from(Y.children).forEach(J=>{const Z=J,xe=Z.getAttribute("data-id");xe&&Q.set(xe,Z);});const re=[];for(let J=0;J<F.length;J++){const Z=F[J],xe=(r?(T-1)*r:0)+J,Te=h(Z,xe);re.push(Te);let ge=Q.get(Te);ge||(ge=as(Z,xe),E&&Jn(ge).forEach(Ct=>{Ct.style.transform="translateY(6px)",Ct.style.opacity="0";})),Y.appendChild(ge);}const se=[];if(Q.forEach((J,Z)=>{re.includes(Z)||se.push(J);}),!E){se.forEach(J=>J.remove()),ke(),Kn();return}re.forEach(J=>{const Z=Y.querySelector(`.lg-tr-body[data-id="${J}"]`);if(!Z)return;const xe=ho(Z),Te=V.get(J),ge=Jn(Z);if(Te&&xe){const $e=Te.left-xe.left,lt=Te.top-xe.top;ge.forEach(We=>{We.style.transition="none",We.style.transform=`translate(${$e}px, ${lt}px)`,We.style.opacity="1";}),mo(Z)?.getBoundingClientRect(),ge.forEach(We=>{We.style.willChange="transform, opacity",We.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ge.forEach(We=>{We.style.transform="translate(0,0)";});});}else ge.forEach($e=>{$e.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ge.forEach($e=>{$e.style.transform="translate(0,0)",$e.style.opacity="1";});});const Yn=$e=>{($e.propertyName==="transform"||$e.propertyName==="opacity")&&(ge.forEach(lt=>{lt.style.willChange="",lt.style.transition="",lt.style.transform="",lt.style.opacity="";}),$e.currentTarget.removeEventListener("transitionend",Yn));},Ct=ge[0];Ct&&Ct.addEventListener("transitionend",Yn);}),se.forEach(J=>{const Z=Jn(J);Z.forEach(ge=>{ge.style.willChange="transform, opacity",ge.style.transition="transform .18s ease, opacity .18s ease",ge.style.opacity="0",ge.style.transform="translateY(-6px)";});const xe=ge=>{ge.propertyName==="opacity"&&(ge.currentTarget.removeEventListener("transitionend",xe),J.remove());},Te=Z[0];Te?Te.addEventListener("transitionend",xe):J.remove();}),ke(),Kn();}function as(F,V){const Q=h(F,V),re=w("div",{className:"lg-tr lg-tr-body","data-id":Q});if(d){const se=w("div",{className:"lg-td lg-td-check"});if(p==="switch"){const J=Ur({size:"sm",checked:R.has(Q),onChange:Z=>{Z?R.add(Q):R.delete(Q),ke(),S?.(G());}});fe.set(Q,J),se.appendChild(J.root);}else {const J=w("input",{type:"checkbox",className:"lg-row-check"});J.checked=R.has(Q),J.addEventListener("change",Z=>{Z.stopPropagation(),J.checked?R.add(Q):R.delete(Q),ke(),S?.(G());}),J.addEventListener("click",Z=>Z.stopPropagation()),se.appendChild(J);}re.appendChild(se);}return b.forEach(se=>{const J=w("div",{className:"lg-td"});se.align&&J.style.setProperty("--col-justify",j(se.align));let Z=se.render?se.render(F,V):String(F[se.key]??"");typeof Z=="string"?J.textContent=Z:J.appendChild(Z),re.appendChild(J);}),(v||d&&f)&&(re.classList.add("clickable"),re.addEventListener("click",se=>{if(!se.target.closest(".lg-td-check")){if(d&&f){const J=!R.has(Q);if(J?R.add(Q):R.delete(Q),ke(),p==="switch"){const Z=fe.get(Q);Z&&Z.setChecked(J,true);}else {const Z=re.querySelector(".lg-row-check");Z&&(Z.checked=J);}S?.(G());}v?.(F,V,se);}})),re}function bo(){if(ie.replaceChildren(),!r)return;const F=O(),V=w("div",{className:"lg-pager"}),Q=w("button",{className:"btn",type:"button"},"←"),re=w("button",{className:"btn",type:"button"},"→"),se=w("span",{className:"lg-pager-info"},`${T} / ${F}`);Q.disabled=T<=1,re.disabled=T>=F,Q.addEventListener("click",()=>en(T-1)),re.addEventListener("click",()=>en(T+1)),V.append(Q,se,re),ie.appendChild(V);}function en(F){const V=O();T=Math.min(Math.max(1,F),V),St(),bo();}function tn(){$(),is(),St(),bo();}function ss(F){x=F.slice(),C=F.slice(),A&&P&&N(),en(1);}function ls(F){b=F.slice(),tn();}function cs(F,V="asc"){A=F,P=F?V:null,A&&P?N():C=x.slice(),tn();}function ds(){try{qn.disconnect();}catch{}window.removeEventListener("resize",go);}return ee.append(z,Y,ie),D.appendChild(ee),window.addEventListener("resize",go),tn(),{root:D,setData:ss,setColumns:ls,sortBy:cs,getSelection:G,setSelection:st,clearSelection:ne,setPage:en,getState:()=>({page:T,pageCount:O(),sortKey:A,sortDir:P}),destroy:ds}}let Mn=false;const Lt=new Set;function dl(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ee=e=>{const t=dl();if(t){for(const n of Lt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function ul(){Mn||(Mn=true,window.addEventListener("keydown",Ee,true),window.addEventListener("keypress",Ee,true),window.addEventListener("keyup",Ee,true),document.addEventListener("keydown",Ee,true),document.addEventListener("keypress",Ee,true),document.addEventListener("keyup",Ee,true));}function pl(){Mn&&(Mn=false,window.removeEventListener("keydown",Ee,true),window.removeEventListener("keypress",Ee,true),window.removeEventListener("keyup",Ee,true),document.removeEventListener("keydown",Ee,true),document.removeEventListener("keypress",Ee,true),document.removeEventListener("keyup",Ee,true));}function fl(e){return Lt.size===0&&ul(),Lt.add(e),()=>{Lt.delete(e),Lt.size===0&&pl();}}function sn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function gl(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function wi(e={}){const{id:t,placeholder:n="Rechercher…",value:o="",size:r="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:u=false,debounceMs:l=0,focusKey:d="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:h,submitLabel:y,loading:S=false,blockGameKeys:v=true}=e,b=w("div",{className:"search"+(r?` search--${r}`:""),id:t}),C=w("span",{className:"search-ico search-ico--left"});if(p){const ne=sn(p);ne&&C.appendChild(ne);}else C.textContent="🔎",C.style.opacity=".9";const x=w("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":h||n}),A=w("span",{className:"search-ico search-ico--right"});if(f){const ne=sn(f);ne&&A.appendChild(ne);}const P=gl();P.classList.add("search-spinner");const T=g?w("button",{className:"search-clear",type:"button",title:m},"×"):null,_=y!=null?w("button",{className:"btn search-submit",type:"button"},y):null,E=w("div",{className:"search-field"},C,x,A,P,...T?[T]:[]);b.append(E,..._?[_]:[]);let D=!!i,ee=null;function z(ne){P.style.display=ne?"inline-block":"none",b.classList.toggle("is-loading",ne);}function Y(){ee!=null&&(window.clearTimeout(ee),ee=null);}function ie(ne){Y(),l>0?ee=window.setTimeout(()=>{ee=null,ne();},l):ne();}function W(){s?.(x.value),u&&c&&c(x.value);}x.addEventListener("input",()=>{ie(W);}),x.addEventListener("keydown",ne=>{ne.key==="Enter"?(ne.preventDefault(),Y(),c?.(x.value)):ne.key==="Escape"&&(x.value.length>0?O("",{notify:true}):x.blur());}),T&&T.addEventListener("click",()=>O("",{notify:true})),_&&_.addEventListener("click",()=>c?.(x.value));let j=()=>{};if(v&&(j=fl(x)),d){const ne=ue=>{if(ue.key===d&&!ue.ctrlKey&&!ue.metaKey&&!ue.altKey){const ke=document.activeElement;ke&&(ke.tagName==="INPUT"||ke.tagName==="TEXTAREA"||ke.isContentEditable)||(ue.preventDefault(),x.focus());}};window.addEventListener("keydown",ne,true),b.__cleanup=()=>{window.removeEventListener("keydown",ne,true),j();};}else b.__cleanup=()=>{j();};function $(ne){D=!!ne,x.disabled=D,T&&(T.disabled=D),_&&(_.disabled=D),b.classList.toggle("disabled",D);}function O(ne,ue={}){const ke=x.value;x.value=ne??"",ue.notify&&ke!==ne&&ie(W);}function I(){return x.value}function N(){x.focus();}function R(){x.blur();}function G(ne){x.placeholder=ne;}function fe(ne){O("",ne);}return $(D),z(S),a&&N(),{root:b,input:x,getValue:I,setValue:O,focus:N,blur:R,setDisabled:$,setPlaceholder:G,clear:fe,setLoading:z,setIconLeft(ne){C.replaceChildren();const ue=sn(ne??"🔎");ue&&C.appendChild(ue);},setIconRight(ne){A.replaceChildren();const ue=sn(ne??"");ue&&A.appendChild(ue);}}}function ml(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function hl(e){return e.toLowerCase()}function ki(e={}){const{id:t,label:n="",type:o="neutral",tone:r="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:u,variant:l="default",rarity:d=null}=e,p=w("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),u&&p.addEventListener("click",u);let f=false,g=a;function m(){f||(g===false?p.style.border="none":p.style.border="");}function h(x,A=r){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${x}`,`badge--${A}`),m();}function y(x){const A=(x??"").trim();A?(p.style.border=A,f=true):(f=false,m());}function S(x){g=x,m();}function v(x){p.textContent=x;}function b(x,A=r){h(x,A);}function C(x){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";const A=ml(x);if(!A){p.textContent=String(x??"—");return}p.textContent=A,p.classList.add("badge--rarity",`badge--rarity-${hl(A)}`);}return l==="rarity"?C(d):(p.textContent=n,h(o,r),typeof a=="boolean"&&S(a),i&&y(i)),{root:p,setLabel:v,setType:b,setBorder:y,setWithBorder:S,setRarity:C}}const yt=e=>new Promise(t=>setTimeout(t,e)),Le=e=>{try{return e()}catch{return}},Re=(e,t,n)=>Math.max(t,Math.min(n,e)),Si=e=>Re(e,0,1);async function xr(e,t,n){const o=performance.now();for(;performance.now()-o<t;){const r=await Promise.race([e,yt(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}const bl=Object.freeze(Object.defineProperty({__proto__:null,clamp:Re,clamp01:Si,sleep:yt,tryDo:Le,waitWithTimeout:xr},Symbol.toStringTag,{value:"Module"})),xo=Function.prototype.bind,oe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Ci,Ai,Ti;const yl=new Promise(e=>{Ci=e;}),vl=new Promise(e=>{Ai=e;}),xl=new Promise(e=>{Ti=e;});function wl(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function kl(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Sl(e){oe.engine=e,oe.tos=kl(e)||null,oe.app=e.app||null,oe.renderer=e.app?.renderer||null,oe.ticker=e.app?.ticker||null,oe.stage=e.app?.stage||null;try{Ci(e);}catch{}try{oe.app&&Ai(oe.app);}catch{}try{oe.renderer&&Ti(oe.renderer);}catch{}}function Kr(){return oe.engine?true:(oe._bindPatched||(oe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=xo.call(this,e,...t);try{!oe.engine&&wl(e)&&(Function.prototype.bind=xo,oe._bindPatched=!1,Sl(e));}catch{}return n}),false)}Kr();async function Cl(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(oe.engine)return  true;Kr(),await yt(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Al(e=15e3){return oe.engine||await Cl(e),true}function Tl(){return oe.engine&&oe.app?{ok:true,engine:oe.engine,tos:oe.tos,app:oe.app}:(Kr(),{ok:false,engine:oe.engine,tos:oe.tos,app:oe.app,note:"Not captured. Wait for room, or reload."})}const Oe={engineReady:yl,appReady:vl,rendererReady:xl,engine:()=>oe.engine,tos:()=>oe.tos,app:()=>oe.app,renderer:()=>oe.renderer,ticker:()=>oe.ticker,stage:()=>oe.stage,PIXI:()=>L.PIXI||null,init:Al,hook:Tl,ready:()=>!!oe.engine},Pl=L?.location?.origin||"https://magicgarden.gg";function Pi(){return typeof GM_xmlhttpRequest=="function"}function Ii(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))});})}async function qr(e){if(Pi())return JSON.parse((await Ii(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Mi(e){if(Pi())return (await Ii(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Il(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),r=L?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i);},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"));},i.src=o;})}const Fe=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Ml=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",wo=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Ml(e)+String(t||"");let Gt=null;function El(){return L?.document??(typeof document<"u"?document:null)}function Jr(e){if(Gt!==null)return;const t=e??El();if(!t)return;const n=t.scripts;for(let o=0;o<n.length;o++){const i=n.item(o)?.src;if(!i)continue;const a=i.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(a?.[1]){Gt=a[1];return}}}function Ll(){return Jr(),Gt}async function _l(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(Jr(),Gt)return Gt;await yt(50);}throw new Error("MGVersion timeout (gameVersion not found)")}const Ei={init:Jr,get:Ll,wait:_l};let ln=null,cn=null;async function Li(){return cn||ln||(ln=(async()=>{const e=await Ei.wait(15e3);return cn=`${Pl}/version/${e}/assets/`,cn})(),ln)}async function Ol(e){const t=await Li();return Fe(t,e)}const vt={base:Li,url:Ol},Rl=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Nl=function(e){return "/"+e},ko={},En=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let c=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");r=c(n.map(u=>{if(u=Nl(u),u in ko)return;ko[u]=true;const l=u.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Rl,l||(p.as="script"),p.crossOrigin="",p.href=u,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return r.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})};function Ln(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Jt(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Ln(o):`sprite/${n}/${o}`}function Bt(e,t,n,o){const r=Jt(e,t);if(n.has(r)||o.has(r))return r;const i=String(t||"").trim();if(n.has(i)||o.has(i))return i;const a=Ln(i);return n.has(a)||o.has(a)?a:r}function $l(e,t,n=25e3){const o=[e],r=new Set;let i=0;for(;o.length&&i++<n;){const a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)o.push(s[c]);}return null}function Dl(e){const t=L.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,o=$l(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function jl(e,t=15e3){const{sleep:n}=await En(async()=>{const{sleep:r}=await Promise.resolve().then(()=>bl);return {sleep:r}},void 0),o=performance.now();for(;performance.now()-o<t;)try{return Dl(e)}catch{await n(50);}throw new Error("Constructors timeout")}const Ye=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},Xn=new Map;async function zl(e){const t=e||await vt.base();if(Xn.has(t))return Xn.get(t);const n=qr(Fe(t,"manifest.json"));return Xn.set(t,n),n}function Fl(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Gl(e){const t=new Set;for(const n of e?.assets||[])for(const o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}const He={load:zl,getBundle:Fl,listJsonFromBundle:Gl};function Bl(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Zn(e,t,n,o,r){return new e(t,n,o,r)}function Wl(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Hl(e,t,n,o){const{Texture:r,Rectangle:i}=o;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,u=!!s.rotated,l=u?2:0,d=u?c.h:c.w,p=u?c.w:c.h,f=Zn(i,c.x,c.y,d,p),g=s.sourceSize||{w:c.w,h:c.h},m=Zn(i,0,0,g.w,g.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const y=s.spriteSourceSize;h=Zn(i,y.x,y.y,y.w,y.h);}n.set(a,Wl(r,t,f,m,h,l,s.anchor||null));}}function Vl(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;const i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i);}}function Ul(e,t){const n=(o,r)=>{const i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const o of Object.keys(e.frames||{})){const r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2]);}}async function Kl(e,t){const n=await He.load(e),o=He.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");const r=He.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,c=new Map;async function u(l){if(i.has(l))return;i.add(l);const d=await qr(Fe(e,l));if(!Bl(d))return;const p=d.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await u(wo(l,h));const f=wo(l,d.meta.image),g=await Il(await Mi(Fe(e,f))),m=t.Texture.from(g);Hl(d,m,a,t),Vl(d,a,s),Ul(d,c);}for(const l of r)await u(l);return {textures:a,animations:s,categoryIndex:c}}const ql={enabled:true,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function Jl(){return {lru:new Map,cost:0,srcCanvas:new Map}}function _i(e,t){return `${t.sig}::${e}`}function Oi(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Yl(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function Xl(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Oi(o??null));}}function Ri(e,t){const n=e.lru.get(t);return n?(Yl(e,t,n),n):null}function Ni(e,t,n,o){e.lru.set(t,n),e.cost+=Oi(n),Xl(e,o);}function Zl(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Ql(e,t){return e.srcCanvas.get(t)??null}function ec(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){const r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r);}}const ht={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},$i=Object.keys(ht),tc=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],So=new Map(tc.map((e,t)=>[e,t]));function _n(e){return [...new Set(e.filter(Boolean))].sort((n,o)=>(So.get(n)??1/0)-(So.get(o)??1/0))}const nc=["Wet","Chilled","Frozen"],rc=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),oc={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},ic={Pepper:.5,Banana:.6},ac=256,sc=.5,lc=2;function Di(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=_n(e),n=cc(e),o=dc(e);return {muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function cc(e){const t=e.filter((r,i,a)=>ht[r]&&a.indexOf(r)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?_n(t.filter(r=>!nc.includes(r))):_n(t)}function dc(e){const t=e.filter((n,o,r)=>ht[n]?.overlayTall&&r.indexOf(n)===o);return _n(t)}function Qn(e,t){return e.map(n=>({name:n,meta:ht[n],overlayTall:ht[n]?.overlayTall??null,isTall:t}))}const uc={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},dn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(const r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function pc(e){return dn.has(e)?e:dn.has("overlay")?"overlay":dn.has("screen")?"screen":dn.has("lighter")?"lighter":"source-atop"}function fc(e,t,n,o,r=false){const i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){const d=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*d,s-Math.sin(i)*d,a+Math.cos(i)*d,s+Math.sin(i)*d)}const c=Math.cos(i),u=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(u)*n/2;return e.createLinearGradient(a-c*l,s-u*l,a+c*l,s+u*l)}function Co(e,t,n,o,r=false){const i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?fc(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function gc(e,t,n,o){const r=uc[n];if(!r)return;const i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&o,s=t.width,c=t.height;e.save();const u=i.masked?pc(i.op):"source-in";if(e.globalCompositeOperation=u,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const d=l.getContext("2d");d.imageSmoothingEnabled=false,Co(d,s,c,i,a),d.globalCompositeOperation="destination-in",d.drawImage(t,0,0),e.drawImage(l,0,0);}else Co(e,s,c,i,a);e.restore();}function mc(e){return /tallplant/i.test(e)}function Yr(e){const t=String(e||"").split("/");return t[t.length-1]||""}function ji(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function hc(e,t){const n=String(e||"").toLowerCase();for(const o of t.keys()){const r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){const a=t.get(o);if(a)return {tex:a,key:o}}}return null}function bc(e,t,n,o){if(!t)return null;const r=Yr(e),i=ji(t);for(const a of i){const s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(const c of s){const u=n.get(c);if(u)return {tex:u,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,u=n.get(c);if(u)return {tex:u,key:c};const l=`sprite/mutation-overlay/${a}`,d=n.get(l);if(d)return {tex:d,key:l};const p=hc(t,n);if(p)return p}}return null}function yc(e,t,n,o){if(!t)return null;const r=ht[t];if(n&&r?.tallIconOverride){const s=o.get(r.tallIconOverride);if(s)return s}const i=Yr(e),a=ji(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const u of c){const l=o.get(u);if(l)return l}if(n){const u=`sprite/mutation-overlay/${s}TallPlantIcon`,l=o.get(u);if(l)return l;const d=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(d);if(p)return p}}return null}function vc(e,t,n){const o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=ic[t]??i;const c=r>o*1.5;let u=oc[t]??(c?a:.4);const l={x:(s-i)*o,y:(u-a)*r},d=Math.min(o,r),p=Math.min(1.5,d/ac);let f=sc*p;return n&&(f*=lc),{width:o,height:r,anchorX:i,anchorY:a,offset:l,iconScale:f}}function zn(e,t,n,o,r){const i=Ql(o,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),u=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&u){const l=Math.round(u.width/s),d=Math.round(u.height/s);a=document.createElement("canvas"),a.width=l,a.height=d;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(u,0,0,l,d));}else a=u;}}catch{}if(!a){const c=e?.frame||e?._frame,u=e?.orig||e?._orig,l=e?.trim||e?._trim,d=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(u?.width??c.width)|0),g=Math.max(1,(u?.height??c.height)|0),m=l?.x??0,h=l?.y??0;a.width=f,a.height=g;const y=a.getContext("2d");y.imageSmoothingEnabled=false,d===true||d===2||d===8?(y.save(),y.translate(m+c.height/2,h+c.width/2),y.rotate(-Math.PI/2),y.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),y.restore()):y.drawImage(p,c.x,c.y,c.width,c.height,m,h,c.width,c.height);}return ec(o,e,a,r),a}function xc(e,t,n,o,r,i,a,s){const{w:c,h:u,aX:l,aY:d,basePos:p}=t,f=[];for(const g of n){const m=new o.Sprite(e);m.anchor?.set?.(l,d),m.position.set(p.x,p.y),m.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=u;const y=h.getContext("2d");y.imageSmoothingEnabled=false,y.save(),y.translate(c*l,u*d),y.drawImage(zn(e,r,o,i,a),-c*l,-u*d),y.restore(),gc(y,h,g.name,g.isTall);const S=o.Texture.from(h,{resolution:e.resolution??1});s.push(S),m.texture=S,f.push(m);}return f}function wc(e,t,n,o,r,i,a,s,c,u){const{aX:l,basePos:d}=t,p=[];for(const f of n){const g=f.overlayTall&&o.get(f.overlayTall)&&{tex:o.get(f.overlayTall),key:f.overlayTall}||bc(e,f.name,o);if(!g?.tex)continue;const m=zn(g.tex,i,r,a,s);if(!m)continue;const h=m.width,y={x:0,y:0},S={x:d.x-l*h,y:0},v=document.createElement("canvas");v.width=h,v.height=m.height;const b=v.getContext("2d");if(!b)continue;b.imageSmoothingEnabled=false,b.drawImage(m,0,0),b.globalCompositeOperation="destination-in",b.drawImage(c,-S.x,-0);const C=r.Texture.from(v,{resolution:g.tex.resolution??1});u.push(C);const x=new r.Sprite(C);x.anchor?.set?.(y.x,y.y),x.position.set(S.x,S.y),x.scale.set(1),x.alpha=1,x.zIndex=3,p.push(x);}return p}function kc(e,t,n,o,r,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const u=yc(e,c.name,c.isTall,o);if(!u)continue;const l=new r.Sprite(u),d=u?.defaultAnchor?.x??.5,p=u?.defaultAnchor?.y??.5;l.anchor?.set?.(d,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),rc.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function zi(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;const{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,u=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,d={x:s*u,y:c*l},p=zn(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),f=new r;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(u,l),g.position.set(d.x,d.y),g.zIndex=0,f.addChild(g);const m=mc(t),h=Qn(n.muts,m),y=Qn(n.overlayMuts,m),S=Qn(n.selectedMuts,m),v=[],b={w:s,h:c,aX:u,aY:l,basePos:d},C=Yr(t),x=vc(e,C,m);xc(e,b,h,o.ctors,o.renderer,o.cacheState,o.cacheConfig,v).forEach(z=>f.addChild(z)),m&&wc(t,b,y,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,v).forEach(Y=>f.addChild(Y)),kc(t,b,S,o.textures,o.ctors,x).forEach(z=>f.addChild(z));let T={x:0,y:0,width:s,height:c};try{const z=f.getLocalBounds?.()||f.getBounds?.(!0);z&&Number.isFinite(z.width)&&Number.isFinite(z.height)&&(T={x:z.x,y:z.y,width:z.width,height:z.height});}catch{}const{Rectangle:_}=o.ctors,E=_?new _(0,0,s,c):void 0;let D=null;if(typeof o.renderer.generateTexture=="function"?D=o.renderer.generateTexture(f,{resolution:1,region:E}):o.renderer.textureGenerator?.generateTexture&&(D=o.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:E})),!D)throw new Error("no render texture");const ee=D instanceof a?D:a.from(o.renderer.extract.canvas(D));try{ee.__mg_base={baseX:-T.x,baseY:-T.y,baseW:s,baseH:c,texW:T.width,texH:T.height};}catch{}D&&D!==ee&&D.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{ee.__mg_gen=!0,ee.label=`${t}|${n.sig}`;}catch{}return ee}catch{return null}}function Sc(e,t,n,o){if(!e||e.length<2)return null;const r=[];for(const i of e){const a=zi(i,t,n,o);a&&r.push(a);}return r.length>=2?r:null}const Fi={enabled:true,maxEntries:500};function Cc(){return {cache:new Map,maxEntries:Fi.maxEntries}}function Gi(e,t,n,o,r){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,u=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${u}|bm${n}|bp${r}|p${o}`}function Ac(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Tc(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,r=a);r&&e.cache.delete(r);}e.cache.set(n,{canvas:o,lastAccess:performance.now()});}}function Ao(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Pc(e){e.cache.clear();}function Ic(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Mc(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Ec(e,t,n,o,r,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const u=e.length;let l=0;a?.(0,u);for(let d=0;d<u;d+=s){const p=e.slice(d,d+s);for(const f of p)try{const g=Bt(null,f,t.textures,t.animations),m={scale:1},h=Wi(m),y=Hi(h,m),S=Ui(h,m.boundsPadding),v=Gi(g,m,h,y,S);r.cache.has(v)||wr(t,n,o,null,f,m,r,i),l++;}catch{l++;}a?.(l,u),d+s<u&&await Mc();}return l}function Lc(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function _c(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Xr(e,t,n,o,r,i){if(!n.length)return t;const a=Di(n);if(!a.sig)return t;const s=_i(e,a),c=Ri(r,s);if(c?.tex)return c.tex;const u=zi(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return u?(Ni(r,s,{isAnim:false,tex:u},i),u):t}function Bi(e,t,n,o,r,i){if(!n.length)return t;const a=Di(n);if(!a.sig)return t;const s=_i(e,a),c=Ri(r,s);if(c?.isAnim&&c.frames?.length)return c.frames;const u=Sc(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return u?(Ni(r,s,{isAnim:true,frames:u},i),u):t}function To(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=Bt(o,r,e.textures,e.animations),s=i.mutations||[],c=i.parent||_c(e)||Lc(e),u=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,d=i.center?u/2:i.x??u/2,p=i.center?l/2:i.y??l/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const y=Bi(a,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(y),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const v=new e.ctors.Sprite(y[0]),C=1e3/Math.max(1,i.fps||8);let x=0,A=0;const P=T=>{const _=e.app.ticker?.deltaMS??T*16.666666666666668;if(x+=_,x<C)return;const E=x/C|0;x%=C,A=(A+E)%y.length,v.texture=y[A];};v.__mgTick=P,e.app.ticker?.add?.(P),f=v;}}else {const y=e.textures.get(a);if(!y)throw new Error(`Unknown sprite/anim key: ${a}`);const S=Xr(a,y,s,e,t,n);f=new e.ctors.Sprite(S);}const m=i.anchorX??f.texture?.defaultAnchor?.x??.5,h=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,h),f.position.set(d,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Oc(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const Po=new Map;function Wi(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function Hi(e,t){return e==="mutations"?t.pad??2:t.pad??0}function At(e){return Number.isFinite(e)?Math.max(0,e):0}function Vi(e){if(typeof e=="number"){const t=At(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:At(e.top??0),right:At(e.right??0),bottom:At(e.bottom??0),left:At(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Ui(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Vi(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function Ki(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function qi(e,t,n){const o=e?.__mg_base;return o&&Number.isFinite(o.baseX)&&Number.isFinite(o.baseY)&&Number.isFinite(o.baseW)&&Number.isFinite(o.baseH)&&Number.isFinite(o.texW)&&Number.isFinite(o.texH)?o:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function Rc(e,t,n,o,r,i){const a=`${e}|f${t}`,s=Po.get(a);if(s)return s;const c=Ki(n),u={top:0,right:0,bottom:0,left:0};for(const l of $i){const d=Xr(e,n,[l],o,r,i),p=qi(d,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>u.left&&(u.left=f),g>u.top&&(u.top=g),m>u.right&&(u.right=m),h>u.bottom&&(u.bottom=h);}return Po.set(a,u),u}function wr(e,t,n,o,r,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=Bt(o,r,e.textures,e.animations),u=Wi(i),l=Hi(u,i),d=Ui(u,i.boundsPadding),p=a&&s?.enabled?Gi(c,i,u,l,d):null;if(p&&a&&s?.enabled){const v=Ac(a,p);if(v)return Ao(v)}const f=i.mutations||[],g=e.animations.get(c),m=Math.max(0,(i.frameIndex??0)|0);let h,y;if(g?.length)if(h=g[m%g.length],f.length){const v=Bi(c,g,f,e,t,n);y=v[m%v.length];}else y=h;else {const v=e.textures.get(c);if(!v)throw new Error(`Unknown sprite/anim key: ${c}`);h=v,y=Xr(c,v,f,e,t,n);}let S;if(u==="mutations"){const v=new e.ctors.Sprite(y),b=i.anchorX??v.texture?.defaultAnchor?.x??.5,C=i.anchorY??v.texture?.defaultAnchor?.y??.5;v.anchor?.set?.(b,C),v.scale.set(i.scale??1);const x=new e.ctors.Container;x.addChild(v);try{x.updateTransform?.();}catch{}const A=v.getBounds?.(true)||{x:0,y:0,width:v.width,height:v.height};v.position.set(-A.x+l,-A.y+l),S=Oc(e,x);try{x.destroy?.({children:!0});}catch{}}else {const v=i.scale??1;let b=Vi(i.boundsPadding);u==="padded"&&i.boundsPadding==null&&(b=Rc(c,m,h,e,t,n)),l&&(b={top:b.top+l,right:b.right+l,bottom:b.bottom+l,left:b.left+l});const C=Ki(h),x=qi(y,C.w,C.h),A=Math.max(1,Math.ceil((C.w+b.left+b.right)*v)),P=Math.max(1,Math.ceil((C.h+b.top+b.bottom)*v));S=document.createElement("canvas"),S.width=A,S.height=P;const T=S.getContext("2d");if(T){T.imageSmoothingEnabled=false;const _=zn(y,e.renderer,e.ctors,t,n),E=(b.left-x.baseX)*v,D=(b.top-x.baseY)*v;T.drawImage(_,E,D,_.width*v,_.height*v);}}return p&&a&&s?.enabled?(Tc(a,s,p,S),Ao(S)):S}function Nc(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function $c(e,t){return e.defaultParent=t,true}function Dc(e,t){return e.defaultParent=t,true}function jc(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}let un=null;const ye=jc(),zc=Jl(),Fc={...ql},Gc=Cc(),Bc={...Fi};function we(){return ye}function bt(){return zc}function Wt(){return Fc}function Ht(){return Gc}function kr(){return Bc}function Ji(){return ye.ready}async function Wc(){return ye.ready?true:un||(un=(async()=>{const e=performance.now();Ye("init start");const t=await xr(Oe.appReady,15e3,"PIXI app");Ye("app ready");const n=await xr(Oe.rendererReady,15e3,"PIXI renderer");Ye("renderer ready"),ye.app=t,ye.renderer=n||t?.renderer||null,ye.ctors=await jl(t),Ye("constructors resolved"),ye.baseUrl=await vt.base(),Ye("base url",ye.baseUrl);const{textures:o,animations:r,categoryIndex:i}=await Kl(ye.baseUrl,ye.ctors);return ye.textures=o,ye.animations=r,ye.categoryIndex=i,Ye("atlases loaded","textures",ye.textures.size,"animations",ye.animations.size,"categories",ye.categoryIndex?.size??0),ye.ready=true,Ye("ready in",Math.round(performance.now()-e),"ms"),true})(),un)}function it(){if(!Ji())throw new Error("MGSprite not ready yet")}function Hc(e,t,n){return typeof t=="string"?To(we(),bt(),Wt(),e,t,n||{}):To(we(),bt(),Wt(),null,e,t||{})}function Vc(e,t,n){return typeof t=="string"?wr(we(),bt(),Wt(),e,t,n||{},Ht(),kr()):wr(we(),bt(),Wt(),null,e,t||{},Ht(),kr())}function Uc(){Nc(we());}function Kc(e){return $c(we(),e)}function qc(e){return Dc(we(),e)}function Jc(e,t){const n=we(),o=typeof t=="string"?Bt(e,t,n.textures,n.animations):Bt(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function Yc(){it();const e=we().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Xc(e){it();const t=String(e||"").trim();if(!t)return [];const n=we().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Zc(e,t){it();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return  false;const r=we().categoryIndex;if(!r)return  false;const i=n.toLowerCase(),a=o.toLowerCase();for(const[s,c]of r.entries())if(s.toLowerCase()===i){for(const u of c.values())if(u.toLowerCase()===a)return  true}return  false}function Qc(e){it();const t=we().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),o=[];for(const[r,i]of t.entries())for(const a of i.values()){const s=Jt(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s);}return o.sort((r,i)=>r.localeCompare(i))}function ed(e){it();const t=String(e||"").trim();if(!t)return null;const n=Ln(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;const r=o[1],i=o[2],a=we().categoryIndex,s=r.toLowerCase(),c=i.toLowerCase();let u=r,l=i;if(a){const d=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!d)return null;u=d;const p=a.get(d);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:u,id:l,key:Jt(u,l)}}function td(e,t){it();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");const r=we().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(l=>l.toLowerCase()===i)||n,c=r.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const u=Array.from(c.values()).find(l=>l.toLowerCase()===a)||o;if(!c.has(u))throw new Error(`Unknown sprite id: ${n}/${o}`);return Jt(s,u)}function nd(){Zl(bt());}function rd(){Pc(Ht());}function od(){return Ic(Ht())}function id(){return [...$i]}async function ad(e,t,n=10,o=0){return it(),Ec(e,we(),bt(),Wt(),Ht(),kr(),t,n,o)}const pe={init:Wc,ready:Ji,show:Hc,toCanvas:Vc,clear:Uc,attach:Kc,attachProvider:qc,has:Jc,key:(e,t)=>Jt(e,t),getCategories:Yc,getCategoryId:Xc,hasId:Zc,listIds:Qc,getIdInfo:ed,getIdPath:td,clearMutationCache:nd,clearToCanvasCache:rd,getToCanvasCacheStats:od,getMutationNames:id,warmup:ad},Sr=L,Ge=Sr.Object??Object,Zr=Ge.keys,On=Ge.values,Rn=Ge.entries,Xe={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},sd=["Rain","Frost","Dawn","AmberMoon"],Io=/main-[^/]+\.js(\?|$)/,ld=3,cd=200,dd=50,Mo=new WeakSet,X={isReady:false,isHookInstalled:false,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:false,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Ze=(e,t)=>t.every(n=>e.includes(n));function Qe(e,t){X.data[e]==null&&(X.data[e]=t,ud()&&Zi());}function ud(){return Object.values(X.data).every(e=>e!=null)}function Yi(e,t){if(!e||typeof e!="object"||Mo.has(e))return;Mo.add(e);let n;try{n=Zr(e);}catch{return}if(!n||n.length===0)return;const o=e;let r;if(!X.data.items&&Ze(n,Xe.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Qe("items",o)),!X.data.decor&&Ze(n,Xe.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Qe("decor",o)),!X.data.mutations&&Ze(n,Xe.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&Qe("mutations",o)),!X.data.eggs&&Ze(n,Xe.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&Qe("eggs",o)),!X.data.pets&&Ze(n,Xe.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&Qe("pets",o)),!X.data.abilities&&Ze(n,Xe.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&Qe("abilities",o)),!X.data.plants&&Ze(n,Xe.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&Qe("plants",o)),!(t>=ld))for(const i of n){let a;try{a=o[i];}catch{continue}a&&typeof a=="object"&&Yi(a,t+1);}}function er(e){try{Yi(e,0);}catch{}}function Xi(){if(!X.isHookInstalled){X.isHookInstalled=true;try{Ge.keys=function(t){return er(t),Zr.apply(this,arguments)},On&&(Ge.values=function(t){return er(t),On.apply(this,arguments)}),Rn&&(Ge.entries=function(t){return er(t),Rn.apply(this,arguments)});}catch{}}}function Zi(){if(X.isHookInstalled){try{Ge.keys=Zr,On&&(Ge.values=On),Rn&&(Ge.entries=Rn);}catch{}X.isHookInstalled=false;}}function pd(){try{for(const e of Sr.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Io.test(t))return t}}catch{}try{for(const e of Sr.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Io.test(t))return t}}catch{}return null}function fd(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const o=e.indexOf("=",n);if(o<0||o>t)return null;const r=e.indexOf("{",o);if(r<0||r>t)return null;let i=0,a="",s=false;for(let c=r;c<e.length;c++){const u=e[c];if(a){if(s){s=false;continue}if(u==="\\"){s=true;continue}u===a&&(a="");continue}if(u==='"'||u==="'"){a=u;continue}if(u==="{")i++;else if(u==="}"&&--i===0)return e.slice(r,c+1)}return null}function gd(e){const t={};let n=false;for(const o of sd){const r=e?.[o];if(!r||typeof r!="object")continue;const i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function md(){if(X.data.weather)return  true;const e=pd();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const o=fd(t,n);if(!o)return  false;const r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+r+")")();}catch{return  false}const a=gd(i);return a?(X.data.weather=a,true):false}function hd(){if(X.weatherPollingTimer)return;X.weatherPollAttempts=0;const e=setInterval(async()=>{(await md()||++X.weatherPollAttempts>cd)&&(clearInterval(e),X.weatherPollingTimer=null);},dd);X.weatherPollingTimer=e;}function bd(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function yd(e,t=[]){const n=new Set,o=r=>{const i=String(r||"").trim();i&&n.add(i);};o(e);for(const r of t)o(r);for(const r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Qi(e,t,n,o=[],r=[]){const i=yd(e,o);if(!i.length)return null;const a=[t,...r].filter(l=>typeof l=="string"),s=l=>{const d=String(l||"").trim();if(!d)return null;for(const p of i)try{if(pe.has(p,d))return pe.getIdPath(p,d)}catch{}return null};for(const l of a){const d=s(l);if(d)return d}const c=bd(n||""),u=s(c||n||"");if(u)return u;try{for(const l of i){const d=pe.listIds(`sprite/${l}/`),p=a.map(g=>String(g||"").toLowerCase()),f=String(n||c||"").toLowerCase();for(const g of d){const h=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&y===h)||h===f)return g}for(const g of d){const h=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&h.includes(y))||f&&h.includes(f))return g}}}catch{}return null}function Pe(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=Qi(s,n,o,r,i);if(c)try{e.spriteId=c;}catch{}const u=e.rotationVariants;if(u&&typeof u=="object")for(const l of Object.values(u))Pe(l,s,n,o);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Pe(l,s,n,o),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Pe(l,s,n,o),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Pe(e.activeState,s,n,e.activeState?.name||o);}function vd(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;const r=t[0],i=t.slice(1);return Qi(e,r,n??null,o,i)}function xd(e){for(const[t,n]of Object.entries(e.items||{}))Pe(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Pe(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Pe(n,"mutations",t,n?.name,["mutation"]);const o=vd("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Pe(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Pe(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const o=n;o.seed&&Pe(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&Pe(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&Pe(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}async function ea(){if(!X.spritesResolved)return X.spritesResolving||(X.spritesResolving=(async()=>{try{await ta(2e4,50),await pe.init(),xd(X.data),X.spritesResolved=!0;}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}finally{X.spritesResolving=null;}})()),X.spritesResolving}async function wd(){return X.isReady||(Xi(),hd(),ea(),X.isReady=true),true}function kd(){return X.isReady}function Sd(){return Zi(),X.weatherPollingTimer&&(clearInterval(X.weatherPollingTimer),X.weatherPollingTimer=null),X.isReady=false,true}function Cd(){return !X.spritesResolved&&!X.spritesResolving&&ea(),{...X.data}}function Ad(e){return X.data[e]??null}function Td(e){return X.data[e]!=null}async function ta(e=1e4,t=50){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(X.data).some(o=>o!=null))return {...X.data};await yt(t);}throw new Error("MGData.waitForAnyData: timeout")}async function Pd(e,t=1e4,n=50){const o=Date.now();for(;Date.now()-o<t;){const r=X.data[e];if(r!=null)return r;await yt(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}const he=exports("h", {init:wd,isReady:kd,stop:Sd,getAll:Cd,get:Ad,has:Td,waitForAnyData:ta,waitFor:Pd});Xi();const Id={expanded:false,sort:{key:null,dir:null},search:""},Md={categories:{}};async function Ed(){const e=await gi("tab-test",{version:2,defaults:Md,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...Id}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function o(i,a,s){const c=e.get(),u=t(i);e.update({categories:{...c.categories,[i]:{...u,sort:{key:a,dir:s}}}});}function r(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}const Ld={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function pn(e){return e?Ld[e]??0:0}class _d extends qt{constructor(){super({id:"tab-test",label:"Test"});ae(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Ed();const o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o);}renderSprite(n){const o=w("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const r=n.spriteId;requestAnimationFrame(()=>{try{const i=pe.toCanvas(r,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",o.appendChild(i);}catch{o.textContent="-";}});}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){const r=w("span",{style:"opacity:0.5;"});return r.textContent="—",r}return ki({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;const f=p.toLowerCase();return r.filter(g=>g.name.toLowerCase().includes(f))},c=xi({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const u=wi({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=w("div",{style:"margin-bottom:8px;"});l.appendChild(u.root);const d=w("div");return d.appendChild(l),d.appendChild(c.root),Ce({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},d)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){const r=he.get("plants");if(!r)return null;for(const a of Object.values(r))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=o.toLowerCase();for(const a of Object.values(r)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const o=he.get("pets");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){const o=he.get("items");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){const o=he.get("decor");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){const o=he.get("eggs");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(o,r);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(o);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4);})}async buildSpriteTables(n){const o=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>pn(i.rarity)-pn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!pe.ready())try{await pe.init();}catch{return}const r=pe.getCategories();for(let i=0;i<r.length;i++){await this.yieldToMain(8);const a=r[i],c=pe.getCategoryId(a).map(u=>{const l=`sprite/${a}/${u}`;return {name:u,spriteId:l,rarity:this.getRarityForSprite(a,l,u)}});if(c.sort((u,l)=>pn(u.rarity)-pn(l.rarity)),c.length>0){const u=this.createDataCard(a,this.formatCategoryName(a),c,o);n.appendChild(u);}}}}const Od=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],K={initialized:false,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:false};function Rd(){const e=(t,n)=>{const o=r=>{r.stopImmediatePropagation(),r.preventDefault?.();};t.addEventListener(n,o,{capture:true}),K.listeners.push({type:n,handler:o,target:t});};for(const t of Od)e(document,t),e(window,t);}function Nd(){for(const{type:e,handler:t,target:n}of K.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}K.listeners.length=0;}function $d(){const e=Object.getPrototypeOf(document);K.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),K.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),K.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function Dd(){const e=Object.getPrototypeOf(document);try{K.savedProps.hidden&&Object.defineProperty(e,"hidden",K.savedProps.hidden);}catch{}try{K.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",K.savedProps.visibilityState);}catch{}try{K.savedProps.hasFocus&&(document.hasFocus=K.savedProps.hasFocus);}catch{}}function Nn(){K.audioCtx&&K.audioCtx.state!=="running"&&K.audioCtx.resume?.().catch(()=>{});}function jd(){try{const e=window.AudioContext||window.webkitAudioContext;K.audioCtx=new e({latencyHint:"interactive"}),K.gainNode=K.audioCtx.createGain(),K.gainNode.gain.value=1e-5,K.oscillator=K.audioCtx.createOscillator(),K.oscillator.frequency.value=1,K.oscillator.connect(K.gainNode).connect(K.audioCtx.destination),K.oscillator.start(),document.addEventListener("visibilitychange",Nn,{capture:!0}),window.addEventListener("focus",Nn,{capture:!0});}catch{na();}}function na(){try{K.oscillator?.stop();}catch{}try{K.oscillator?.disconnect(),K.gainNode?.disconnect();}catch{}try{K.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Nn,{capture:true}),window.removeEventListener("focus",Nn,{capture:true}),K.oscillator=null,K.gainNode=null,K.audioCtx=null;}function zd(){const e=document.querySelector("canvas")||document.body||document.documentElement;K.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},25e3);}function Fd(){K.heartbeatInterval!==null&&(clearInterval(K.heartbeatInterval),K.heartbeatInterval=null);}function Gd(){K.initialized||(K.initialized=true,ra());}function Bd(){return K.initialized}function ra(){K.initialized&&(K.running||(K.running=true,$d(),Rd(),jd(),zd()));}function Wd(){K.running&&(K.running=false,Fd(),na(),Nd(),Dd());}function Hd(){return K.running}const oa={init:Gd,isReady:Bd,start:ra,stop:Wd,isRunning:Hd},Vd=new Map;function Ud(){return Vd}function Cr(){return L.jotaiAtomCache?.cache}function Ve(e){const t=Ud(),n=t.get(e);if(n)return n;const o=Cr();if(!o)return null;for(const r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}const Kd={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function xt(){return Kd}const qd="__JOTAI_STORE_READY__";let Eo=false;const Ar=new Set;function fn(){if(!Eo){Eo=true;for(const e of Ar)try{e();}catch{}try{const e=L.CustomEvent||CustomEvent;L.dispatchEvent?.(new e(qd));}catch{}}}function Jd(e){Ar.add(e);const t=Pr();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Ar.delete(e);}}async function Yd(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Pr();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=false;const s=Jd(()=>{a||(a=true,s(),r());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=Pr();if(l.via&&!l.polyfill){if(a)return;a=true,s(),r();return}await Vt(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const Vt=e=>new Promise(t=>setTimeout(t,e));function ia(){try{const e=L.Event||Event;L.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Tr(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function tr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Tr(e))return e;const o=["store","value","current","state","s","baseStore"];for(const r of o)try{const i=e[r];if(Tr(i))return i}catch{}return null}function aa(){const e=xt(),t=L.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);r&&(n+=r.size||0);}if(n===0)return null;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);if(r)for(const i of r){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const u=c?.pendingProps?.value;if(Tr(u))return e.lastCapturedVia="fiber",u}catch{}try{let u=c?.memoizedState,l=0;for(;u&&l<15;){l++;const d=tr(u);if(d)return e.lastCapturedVia="fiber",d;const p=tr(u.memoizedState);if(p)return e.lastCapturedVia="fiber",p;u=u.next;}}catch{}try{if(c?.stateNode){const u=tr(c.stateNode);if(u)return e.lastCapturedVia="fiber",u}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function sa(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Xd(e=5e3){const t=Date.now();let n=Cr();for(;!n&&Date.now()-t<e;)await Vt(100),n=Cr();if(!n)throw new Error("jotaiAtomCache.cache not found");const o=xt();let r=null,i=null;const a=[],s=()=>{for(const u of a)try{u.__origWrite&&(u.write=u.__origWrite,delete u.__origWrite);}catch{}};for(const u of n.values()){if(!u||typeof u.write!="function"||u.__origWrite)continue;const l=u.write;u.__origWrite=l,u.write=function(d,p,...f){return i||(r=d,i=p,s()),l.call(this,d,p,...f)},a.push(u);}ia();const c=Date.now();for(;!i&&Date.now()-c<e;)await Vt(50);return i?(o.lastCapturedVia="write",{get:u=>r(u),set:(u,l)=>i(u,l),sub:(u,l)=>{let d;try{d=r(u);}catch{}const p=setInterval(()=>{let f;try{f=r(u);}catch{return}if(f!==d){d=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",sa())}async function Zd(e=1e4){const t=xt();ia();const n=Date.now();for(;Date.now()-n<e;){const o=aa();if(o)return o;await Vt(50);}return t.lastCapturedVia="polyfill",sa()}async function Qr(){const e=xt();if(e.baseStore&&!e.baseStore.__polyfill)return fn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Vt(25);if(e.baseStore)return e.baseStore.__polyfill||fn(),e.baseStore}e.captureInProgress=true;try{const t=aa();if(t)return e.baseStore=t,fn(),t;try{const o=await Xd(5e3);return e.baseStore=o,o.__polyfill||fn(),o}catch(o){e.captureError=o;}const n=await Zd();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Pr(){const e=xt();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Qd(){const e=await Qr(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0;}catch{}const a=e.sub(r,()=>{let s;try{s=e.get(r);}catch{return}const c=i.last,u=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,u)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(r){const i=await n(r);if(i.has)return i.last;const a=e.get(r);return i.last=a,i.has=true,a},async set(r,i){await e.set(r,i);const a=await n(r);a.last=i,a.has=true;},async sub(r,i){const a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(r){return t.get(r)?.last},hasShadow(r){return !!t.get(r)?.has},async ensureWatch(r){await n(r);},async asStore(){return {get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Sn(){const e=xt();return e.mirror||(e.mirror=await Qd()),e.mirror}const de={async select(e){const t=await Sn(),n=Ve(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Sn(),o=Ve(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t);},async subscribe(e,t){const n=await Sn(),o=Ve(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r);}catch{}})},async subscribeImmediate(e,t){const n=await de.select(e);try{t(n);}catch{}return de.subscribe(e,t)}};async function eu(){await Sn();}function eo(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ut(e,t){const n=eo(t);let o=e;for(const r of n){if(o==null)return;o=o[r];}return o}function tu(e,t,n){const o=eo(t);if(!o.length)return n;const r=Array.isArray(e)?[...e]:{...e??{}};let i=r;for(let a=0;a<o.length-1;a++){const s=o[a],c=i[s],u=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=u,i=u;}return i[o[o.length-1]]=n,r}function Lo(e,t){const n={};for(const o of t)n[o]=o.includes(".")?Ut(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function nu(e,t,n){const o=n.mode??"auto";function r(u){const l=t?Ut(u,t):u,d=new Map;if(l==null)return {signatures:d,keys:[]};const p=Array.isArray(l);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],h=n.key?n.key(m,g,u):g,y=n.sig?n.sig(m,g,u):n.fields?Lo(m,n.fields):JSON.stringify(m);d.set(h,y);}else for(const[g,m]of Object.entries(l)){const h=n.key?n.key(m,g,u):g,y=n.sig?n.sig(m,g,u):n.fields?Lo(m,n.fields):JSON.stringify(m);d.set(h,y);}return {signatures:d,keys:Array.from(d.keys())}}function i(u,l){if(u===l)return  true;if(!u||!l||u.size!==l.size)return  false;for(const[d,p]of u)if(l.get(d)!==p)return  false;return  true}async function a(u){let l=null;return de.subscribeImmediate(e,d=>{const p=t?Ut(d,t):d,{signatures:f}=r(p);if(!i(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const h of g){const y=l?.get(h)??"__NONE__",S=f.get(h)??"__NONE__";y!==S&&m.push(h);}l=f,u({value:p,changedKeys:m});}})}async function s(u,l){return a(({value:d,changedKeys:p})=>{p.includes(u)&&l({value:d});})}async function c(u,l){const d=new Set(u);return a(({value:p,changedKeys:f})=>{const g=f.filter(m=>d.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:c}}const ut=new Map;function ru(e,t){const n=ut.get(e);if(n)try{n();}catch{}return ut.set(e,t),()=>{try{t();}catch{}ut.get(e)===t&&ut.delete(e);}}function ce(e,t={}){const{path:n,write:o="replace"}=t,r=n?`${e}:${eo(n).join(".")}`:e;async function i(){const d=await de.select(e);return n?Ut(d,n):d}async function a(d){if(typeof o=="function"){const g=await de.select(e),m=o(d,g);return de.set(e,m)}const p=await de.select(e),f=n?tu(p,n,d):d;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof d=="object"?de.set(e,{...p,...d}):de.set(e,f)}async function s(d){const p=await i(),f=d(p);return await a(f),f}async function c(d,p,f){let g;const m=y=>{const S=n?Ut(y,n):y;if(typeof g>"u"||!f(g,S)){const v=g;g=S,p(S,v);}},h=d?await de.subscribeImmediate(e,m):await de.subscribe(e,m);return ru(r,h)}function u(){const d=ut.get(r);if(d){try{d();}catch{}ut.delete(r);}}function l(d){return nu(e,d?.path??n,d)}return {label:r,get:i,set:a,update:s,onChange:(d,p=Object.is)=>c(false,d,p),onChangeNow:(d,p=Object.is)=>c(true,d,p),asSignature:l,stopOnChange:u}}function k(e){return ce(e)}k("positionAtom");k("lastPositionInMyGardenAtom");k("playerDirectionAtom");k("stateAtom");k("quinoaDataAtom");k("currentTimeAtom");k("actionAtom");k("isPressAndHoldActionAtom");k("mapAtom");k("tileSizeAtom");ce("mapAtom",{path:"cols"});ce("mapAtom",{path:"rows"});ce("mapAtom",{path:"spawnTiles"});ce("mapAtom",{path:"locations.seedShop.spawnTileIdx"});ce("mapAtom",{path:"locations.eggShop.spawnTileIdx"});ce("mapAtom",{path:"locations.toolShop.spawnTileIdx"});ce("mapAtom",{path:"locations.decorShop.spawnTileIdx"});ce("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});ce("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});ce("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});ce("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});ce("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});k("playerAtom");k("myDataAtom");k("myUserSlotIdxAtom");k("isSpectatingAtom");k("myCoinsCountAtom");k("numPlayersAtom");ce("playerAtom",{path:"id"});k("userSlotsAtom");k("filteredUserSlotsAtom");k("myUserSlotAtom");k("spectatorsAtom");ce("stateAtom",{path:"child"});ce("stateAtom",{path:"child.data"});ce("stateAtom",{path:"child.data.shops"});const ou=ce("stateAtom",{path:"child.data.userSlots"}),iu=ce("stateAtom",{path:"data.players"}),au=ce("stateAtom",{path:"data.hostPlayerId"});k("myInventoryAtom");k("myInventoryItemsAtom");k("isMyInventoryAtMaxLengthAtom");k("myFavoritedItemIdsAtom");k("myCropInventoryAtom");k("mySeedInventoryAtom");k("myToolInventoryAtom");k("myEggInventoryAtom");k("myDecorInventoryAtom");k("myPetInventoryAtom");ce("myInventoryAtom",{path:"favoritedItemIds"});k("itemTypeFiltersAtom");k("myItemStoragesAtom");k("myPetHutchStoragesAtom");k("myPetHutchItemsAtom");k("myPetHutchPetItemsAtom");k("myNumPetHutchItemsAtom");k("myValidatedSelectedItemIndexAtom");k("isSelectedItemAtomSuspended");k("mySelectedItemAtom");k("mySelectedItemNameAtom");k("mySelectedItemRotationsAtom");k("mySelectedItemRotationAtom");k("setSelectedIndexToEndAtom");k("myPossiblyNoLongerValidSelectedItemIndexAtom");k("myCurrentGlobalTileIndexAtom");k("myCurrentGardenTileAtom");k("myCurrentGardenObjectAtom");k("myOwnCurrentGardenObjectAtom");k("myOwnCurrentDirtTileIndexAtom");k("myCurrentGardenObjectNameAtom");k("isInMyGardenAtom");k("myGardenBoardwalkTileObjectsAtom");const su=ce("myDataAtom",{path:"garden"});ce("myDataAtom",{path:"garden.tileObjects"});ce("myOwnCurrentGardenObjectAtom",{path:"objectType"});k("myCurrentStablePlantObjectInfoAtom");k("myCurrentSortedGrowSlotIndicesAtom");k("myCurrentGrowSlotIndexAtom");k("myCurrentGrowSlotsAtom");k("myCurrentGrowSlotAtom");k("secondsUntilCurrentGrowSlotMaturesAtom");k("isCurrentGrowSlotMatureAtom");k("numGrowSlotsAtom");k("myCurrentEggAtom");k("petInfosAtom");k("myPetInfosAtom");k("myPetSlotInfosAtom");k("myPrimitivePetSlotsAtom");k("myNonPrimitivePetSlotsAtom");k("expandedPetSlotIdAtom");k("myPetsProgressAtom");k("myActiveCropMutationPetsAtom");k("totalPetSellPriceAtom");k("selectedPetHasNewVariantsAtom");const lu=k("shopsAtom"),cu=k("myShopPurchasesAtom");k("seedShopAtom");k("seedShopInventoryAtom");k("seedShopRestockSecondsAtom");k("seedShopCustomRestockInventoryAtom");k("eggShopAtom");k("eggShopInventoryAtom");k("eggShopRestockSecondsAtom");k("eggShopCustomRestockInventoryAtom");k("toolShopAtom");k("toolShopInventoryAtom");k("toolShopRestockSecondsAtom");k("toolShopCustomRestockInventoryAtom");k("decorShopAtom");k("decorShopInventoryAtom");k("decorShopRestockSecondsAtom");k("decorShopCustomRestockInventoryAtom");k("isDecorShopAboutToRestockAtom");ce("shopsAtom",{path:"seed"});ce("shopsAtom",{path:"tool"});ce("shopsAtom",{path:"egg"});ce("shopsAtom",{path:"decor"});k("myCropItemsAtom");k("myCropItemsToSellAtom");k("totalCropSellPriceAtom");k("friendBonusMultiplierAtom");k("myJournalAtom");k("myCropJournalAtom");k("myPetJournalAtom");k("myStatsAtom");k("myActivityLogsAtom");k("newLogsAtom");k("hasNewLogsAtom");k("newCropLogsFromSellingAtom");k("hasNewCropLogsFromSellingAtom");k("myCompletedTasksAtom");k("myActiveTasksAtom");k("isWelcomeToastVisibleAtom");k("shouldCloseWelcomeToastAtom");k("isInitialMoveToDirtPatchToastVisibleAtom");k("isFirstPlantSeedActiveAtom");k("isThirdSeedPlantActiveAtom");k("isThirdSeedPlantCompletedAtom");k("isDemoTouchpadVisibleAtom");k("areShopAnnouncersEnabledAtom");k("arePresentablesEnabledAtom");k("isEmptyDirtTileHighlightedAtom");k("isPlantTileHighlightedAtom");k("isItemHiglightedInHotbarAtom");k("isItemHighlightedInModalAtom");k("isMyGardenButtonHighlightedAtom");k("isSellButtonHighlightedAtom");k("isShopButtonHighlightedAtom");k("isInstaGrowButtonHiddenAtom");k("isActionButtonHighlightedAtom");k("isGardenItemInfoCardHiddenAtom");k("isSeedPurchaseButtonHighlightedAtom");k("isFirstSeedPurchaseActiveAtom");k("isFirstCropHarvestActiveAtom");k("isWeatherStatusHighlightedAtom");const du=k("weatherAtom"),la=k("activeModalAtom");k("hotkeyBeingPressedAtom");k("avatarTriggerAnimationAtom");k("avatarDataAtom");k("emoteDataAtom");k("otherUserSlotsAtom");k("otherPlayerPositionsAtom");k("otherPlayerSelectedItemsAtom");k("otherPlayerLastActionsAtom");k("traderBunnyPlayerId");k("npcPlayersAtom");k("npcQuinoaUsersAtom");k("numNpcAvatarsAtom");k("traderBunnyEmoteTimeoutAtom");k("traderBunnyEmoteAtom");k("unsortedLeaderboardAtom");k("currentGardenNameAtom");k("quinoaEngineAtom");k("quinoaInitializationErrorAtom");k("avgPingAtom");k("serverClientTimeOffsetAtom");k("isEstablishingShotRunningAtom");k("isEstablishingShotCompleteAtom");const te={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Fn(){return te}function uu(){return te.initialized}function at(){return te.isCustom&&te.activeModal!==null}function rt(){return te.activeModal}function ca(e){return !te.shadow||te.shadow.modal!==e?null:te.shadow.data}function pu(e){te.initialized=e;}function to(e){te.activeModal=e;}function no(e){te.isCustom=e;}function da(e,t){te.shadow={modal:e,data:t,timestamp:Date.now()};}function ua(){te.shadow=null;}function _o(e,t){te.patchedAtoms.add(e),te.originalReads.set(e,t);}function fu(e){return te.originalReads.get(e)}function Ir(e){return te.patchedAtoms.has(e)}function gu(e){te.patchedAtoms.delete(e),te.originalReads.delete(e);}function mu(e){te.unsubscribes.push(e);}function hu(){for(const e of te.unsubscribes)try{e();}catch{}te.unsubscribes.length=0;}function bu(e){return te.listeners.onOpen.add(e),()=>te.listeners.onOpen.delete(e)}function pa(e){return te.listeners.onClose.add(e),()=>te.listeners.onClose.delete(e)}function fa(e){for(const t of te.listeners.onOpen)try{t(e);}catch{}}function ro(e){for(const t of te.listeners.onClose)try{t(e);}catch{}}function yu(){hu(),te.initialized=false,te.activeModal=null,te.isCustom=false,te.shadow=null,te.patchedAtoms.clear(),te.originalReads.clear(),te.listeners.onOpen.clear(),te.listeners.onClose.clear();}const oo={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function ga(e){return oo[e]}function vu(e){const t=oo[e],n=[];for(const o of t.atoms)n.push(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)n.push(o.atomLabel);return n}const xu=new Set(["inventory","journal","stats","activityLog","petHutch"]),wu=new Set(["seedShop","eggShop","toolShop","decorShop"]),ku=new Set(["leaderboard"]);function Su(e,t,n,o){return function(i){const a=at(),s=rt();if(a&&s===o){const c=ca(o);if(c!==null){let u;if(n.dataKey==="_full"?u=c:u=c[n.dataKey],u!==void 0)return t(i),n.transform?n.transform(u):u}}return t(i)}}function Cu(e,t,n,o,r){return function(a){if(at()&&rt()===r){const s=ca(r);if(s!==null){const c=s[n];if(c!==void 0)return t(a),o(c)}}return t(a)}}function Au(e){const t=ga(e);for(const n of t.atoms){const o=Ve(n.atomLabel);if(!o||Ir(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=Su(n.atomLabel,r,n,e);o.read=i,_o(n.atomLabel,r);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const o=Ve(n.atomLabel);if(!o||Ir(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=Cu(n.atomLabel,r,n.sourceKey,n.deriveFn,e);o.read=i,_o(n.atomLabel,r);}}async function Gn(e){const t=ga(e);for(const o of t.atoms)Oo(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)Oo(o.atomLabel);const n=await Qr();await ma(n,e);}async function Tu(e){const t=await Qr();await ma(t,e);const n=vu(e);for(const o of n){const r=Ve(o);if(r)try{t.get(r);}catch{}}}function Oo(e){if(!Ir(e))return;const t=Ve(e),n=fu(e);t&&n&&(t.read=n),gu(e);}async function ma(e,t){const n=xu.has(t),o=wu.has(t),r=ku.has(t);if(!n&&!o&&!r)return;const i=Ve("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||o){const c=a.child,u=c?.data;if(c&&u&&typeof u=="object"){let l=null;if(n&&Array.isArray(u.userSlots)){const d=u.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??u,userSlots:d};}if(o&&u.shops&&typeof u.shops=="object"&&(l={...l??u,shops:{...u.shops}}),l){const d={...c,data:l};s={...a,child:d};}}}if(r){const c=a.data;if(c&&Array.isArray(c.players)){const u={...c,players:[...c.players]};s={...s??a,data:u};}}if(!s)return;await e.set(i,s);}catch{}}async function Pu(){for(const e of Object.keys(oo))await Gn(e);}let gn=null,$t=null;async function Iu(){if(Fn().initialized)return;$t=await de.select("activeModalAtom"),gn=setInterval(async()=>{try{const n=await de.select("activeModalAtom"),o=$t;o!==n&&($t=n,Mu(n,o));}catch{}},50),mu(()=>{gn&&(clearInterval(gn),gn=null);}),pu(true);}function Mu(e,t){const n=at(),o=rt();e===null&&t!==null&&(n&&o===t?Eu("native"):n||ro({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&fa({modal:e,isCustom:false});}async function Eu(e){const t=rt();t&&(ua(),no(false),to(null),await Gn(t),ro({modal:t,wasCustom:true,closedBy:e}));}async function Lu(e,t){if(!Fn().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");at()&&await ha(),da(e,t),no(true),to(e),Au(e),await Tu(e),await la.set(e),$t=e,fa({modal:e,isCustom:true});}function _u(e,t){const n=Fn();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const r={...n.shadow.data,...t};da(e,r);}async function ha(){const e=Fn();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;ua(),no(false),to(null),await la.set(null),$t=null,await Gn(t),ro({modal:t,wasCustom:true,closedBy:"api"});}function Ou(){return new Promise(e=>{if(!at()){e();return}const t=pa(()=>{t(),e();});})}async function Ru(){if(at()){const e=rt();e&&await Gn(e);}await Pu(),yu();}const ba={async init(){return Iu()},isReady(){return uu()},async show(e,t){return Lu(e,t)},update(e,t){return _u(e,t)},async close(){return ha()},isOpen(){return rt()!==null},isCustomOpen(){return at()},getActiveModal(){return rt()},waitForClose(){return Ou()},onOpen(e){return bu(e)},onClose(e){return pa(e)},destroy(){return Ru()}};let mn=null;const Ae={ready:false,xform:null,xformAt:0};function wt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Yt(){return Oe.tos()}function io(){return Oe.engine()}function Nu(){const e=Yt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function ao(e,t){const n=Nu();return n?t*n+e|0:null}function nt(e,t,n=true){const o=Yt(),r=ao(e,t);if(!o||r==null)return {gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r);}catch{}return {gidx:r,tv:i||null}}function gt(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=io(),{gidx:s,tv:c}=nt(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const u=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function so(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function nr(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function je(){if(!Ae.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function rr(e){if(!e)return null;const t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const r of n)if(t(e[r]))return e[r];if(t(e))return e;const o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const r of o)if(t(r))return r;try{for(const r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function Cn(e){const t=Le(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=Le(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function $u(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Cn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function Du(){const e=Yt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(const[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;const s=nt(i,a,true).tv,c=i+1<t?nt(i+1,a,true).tv:null,u=nt(i,a+1,true).tv,l=rr(s),d=rr(c),p=rr(u);if(!l||!d||!p)continue;const f=Cn(l),g=Cn(d),m=Cn(p);if(!f||!g||!m)continue;const h={x:g.x-f.x,y:g.y-f.y},y={x:m.x-f.x,y:m.y-f.y},S=h.x*y.y-h.y*y.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const v=1/S,b={a:y.y*v,b:-y.x*v,c:-h.y*v,d:h.x*v},C={x:f.x-i*h.x-a*y.x,y:f.y-i*h.y-a*y.y},x=$u(l),A=x==="center"?C:{x:C.x+.5*(h.x+y.x),y:C.y+.5*(h.y+y.y)};return {ok:true,cols:t,rows:o,vx:h,vy:y,inv:b,anchorMode:x,originCenter:A}}return null}async function ju(e=15e3){return Ae.ready?true:mn||(mn=(async()=>{if(await Oe.init(e),!Yt())throw new Error("MGTile: engine captured but tileObject system not found");return Ae.ready=true,true})(),mn)}function zu(){return Oe.hook()}function Bn(e,t,n={}){je();const o=n.ensureView!==false,r=n.clone!==false,{gidx:i,tv:a}=nt(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?wt(s):s}}function Fu(e,t,n={}){return je(),gt(e,t,null,n)}function Gu(e,t,n,o={}){je();const i=Bn(e,t,{...o,clone:false}).tileView?.tileObject;so(i,"plant");const a=wt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return nr(a.slots[s],n.slotPatch),gt(e,t,a,o)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);nr(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const u=Number(c)|0;if(Number.isFinite(u)){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);nr(a.slots[u],s[u]);}}else throw new Error("MGTile: patch.slots must be array or object map");return gt(e,t,a,o)}return gt(e,t,a,o)}function Bu(e,t,n,o={}){je();const i=Bn(e,t,{...o,clone:false}).tileView?.tileObject;so(i,"decor");const a=wt(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),gt(e,t,a,o)}function Wu(e,t,n,o={}){je();const i=Bn(e,t,{...o,clone:false}).tileView?.tileObject;so(i,"egg");const a=wt(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),gt(e,t,a,o)}function Hu(e,t,n,o={}){je();const r=o.ensureView!==false,i=o.forceUpdate!==false,a=io(),{gidx:s,tv:c}=nt(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const u=c.tileObject,l=typeof n=="function"?n(wt(u)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function Vu(e,t,n={}){je();const o=n.ensureView!==false,{gidx:r,tv:i}=nt(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?wt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function ya(){return je(),Ae.xform=Du(),Ae.xformAt=Date.now(),{ok:!!Ae.xform?.ok,xform:Ae.xform}}function Uu(e,t={}){if(je(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Ae.xform?.ok||t.forceRebuild||Date.now()-Ae.xformAt>n)&&ya();const o=Ae.xform;if(!o?.ok)return null;const r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,c=Math.floor(a),u=Math.floor(s),l=[[c,u],[c+1,u],[c,u+1],[c+1,u+1]];let d=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;const m=o.originCenter.x+f*o.vx.x+g*o.vy.x,h=o.originCenter.y+f*o.vx.y+g*o.vy.y,y=(e.x-m)**2+(e.y-h)**2;y<p&&(p=y,d={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return d?(d.gidx=ao(d.tx,d.ty),d):null}function Ku(e,t){je();const n=Ae.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function qu(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Ke={init:ju,ready:()=>Ae.ready,hook:zu,engine:()=>io(),tos:()=>Yt(),gidx:(e,t)=>ao(Number(e),Number(t)),getTileObject:Bn,inspect:Vu,setTileEmpty:Fu,setTilePlant:Gu,setTileDecor:Bu,setTileEgg:Wu,setTileObjectRaw:Hu,rebuildTransform:ya,pointToTile:Uu,tileToPoint:Ku,getTransform:()=>Ae.xform,help:qu},B={ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},lo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Mr=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),$n=e=>!!(e&&typeof e.tint=="number"),ot=e=>!!(e&&typeof e.alpha=="number");function An(e,t,n){return e+(t-e)*n}function Ju(e,t,n){const o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,u=An(o,a,n)|0,l=An(r,s,n)|0,d=An(i,c,n)|0;return u<<16|l<<8|d}function Yu(e,t=900){const n=[],o=[e];for(;o.length&&n.length<t;){const r=o.pop();if(!r)continue;$n(r)&&n.push(r);const i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a]);}return n}function Xu(e,t=25e3){const n=[],o=[e];let r=0;for(;o.length&&r++<t;){const i=o.pop();if(!i)continue;ot(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s]);}return n}function va(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(lo(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;const a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}));}return n}function Zu(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const o=va(t);return B.tileSets.set(n,o),{ok:true,name:n,count:o.length}}function Qu(e){return B.tileSets.delete(String(e||"").trim())}function ep(){return Array.from(B.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function xa(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function co(e){const n=Ke.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!xa(e))return {entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=B.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a;}else o=va(e.tiles||[]);const r=new Map;for(const i of o){const a=Ke.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView);}return {entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function uo(e){const t=B.highlights.get(e);if(!t)return  false;Le(()=>B.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&ot(t.root)&&Le(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&$n(n.o)&&Le(()=>{n.o.tint=n.baseTint;});return B.highlights.delete(e),true}function wa(e=null){for(const t of Array.from(B.highlights.keys()))e&&!String(t).startsWith(e)||uo(t);return  true}function ka(e,t={}){if(qe(),!Mr(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(B.highlights.has(n))return n;const o=ot(e)?Number(e.alpha):null,r=Re(Number(t.minAlpha??.12),0,1),i=Re(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=Re(Number(t.tintMix??.85),0,1),u=t.deepTint!==false,l=[];if(u)for(const f of Yu(e))l.push({o:f,baseTint:f.tint});else $n(e)&&l.push({o:e,baseTint:e.tint});const d=performance.now(),p=()=>{const f=(performance.now()-d)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,m=g*g*(3-2*g);o!=null&&ot(e)&&(e.alpha=Re(An(r,i,m)*o,0,1));const h=m*c;for(const y of l)y.o&&$n(y.o)&&(y.o.tint=Ju(y.baseTint,s,h));};return B.ticker?.add(p),B.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:l}),n}const tp=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Er(e){if(!e)return null;if(Mr(e))return e;if(!lo(e))return null;for(const t of tp){const n=e[t];if(Mr(n))return n}return null}function np(e,t){const n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let u=0;u<t;u++){const l=Er(i[u]);if(!l){c=false;break}s[u]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(lo(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function rp(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const o of n)if(String(o||"").toLowerCase()===t)return  true;return  false}function Sa(e,t={}){qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:o,gidxSet:r}=co(t),i=`hlmut:${n}:`;if(t.clear===true)if(!r)wa(i);else for(const d of Array.from(B.highlights.keys())){if(!d.startsWith(i))continue;const p=d.split(":"),f=Number(p[2]);r.has(f)&&uo(d);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,u=0,l=0;for(const[d,p]of o){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const h=[];for(let v=0;v<g.length;v++)rp(g[v],n)&&(h.push(v),m=true);if(!m)continue;s++,c+=h.length;const y=p?.childView?.plantVisual||p?.childView||p,S=np(y,g.length);if(!S){l+=h.length;continue}for(const v of h){const b=S[v];if(!b){l++;continue}const C=`${i}${d}:${v}`;B.highlights.has(C)||(ka(b,{key:C,...a}),u++);}}return {ok:true,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:c,newHighlights:u,failedSlots:l}}function op(e,t={}){qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=B.watches.get(o);i&&clearInterval(i);const a=setInterval(()=>{Le(()=>Sa(n,{...t,clear:!1}));},r);return B.watches.set(o,a),{ok:true,key:o,mutation:n,intervalMs:r}}function ip(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(B.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),B.watches.delete(i),r++);return r>0}const n=B.watches.get(t);return n?(clearInterval(n),B.watches.delete(t),true):false}function ap(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function sp(e,t,n={}){qe();const o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==false,a=Ke.getTileObject(o,r,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,u={ok:true,tx:o,ty:r,gidx:a?.gidx??Ke.gidx?.(o,r)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?ap(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&Le(()=>console.log("[MGPixi.inspectTile]",u)),u}function lp(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Er(t)||Er(e?.displayObject)||null}function Ca(e){const t=B.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&ot(n.o)&&Number.isFinite(n.baseAlpha)&&Le(()=>{n.o.alpha=n.baseAlpha;});return B.fades.delete(e),true}function Lr(e=null){for(const t of Array.from(B.fades.keys()))e&&!String(t).startsWith(e)||Ca(t);return  true}function Aa(e,t={}){qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const o=`fade:${n}:`;if(!xa(t))return Lr(o);const{gidxSet:r}=co(t);if(!r)return Lr(o);for(const i of Array.from(B.fades.keys())){if(!i.startsWith(o))continue;const a=Number(i.slice(o.length));r.has(a)&&Ca(i);}return  true}function Ta(e,t={}){qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const o=Re(Number(t.alpha??.2),0,1),r=t.deep===true,{entries:i,gidxSet:a}=co(t),s=`fade:${n}:`;t.clear===true&&Aa(n,t);let c=0,u=0,l=0,d=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;u++;const h=lp(f);if(!h||!ot(h)){d++;continue}const y=`${s}${p}`;if(B.fades.has(y)){Le(()=>{h.alpha=o;}),l++;continue}const S=r?Xu(h):[h],v=[];for(const b of S)ot(b)&&v.push({o:b,baseAlpha:Number(b.alpha)});for(const b of v)Le(()=>{b.o.alpha=o;});B.fades.set(y,{targets:v}),l++;}return {ok:true,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:c,matchedPlants:u,applied:l,failed:d,totalFades:B.fades.size}}function cp(e,t={}){qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=B.fadeWatches.get(o);i&&clearInterval(i);const a=setInterval(()=>{Le(()=>Ta(n,{...t,clear:!1}));},r);return B.fadeWatches.set(o,a),{ok:true,key:o,species:n,intervalMs:r}}function dp(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(B.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),B.fadeWatches.delete(i),r++);return r>0}const n=B.fadeWatches.get(t);return n?(clearInterval(n),B.fadeWatches.delete(t),true):false}function _r(){const e=L;return e.$PIXI=e.PIXI||null,e.$app=B.app||null,e.$renderer=B.renderer||null,e.$stage=B.stage||null,e.$ticker=B.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:B.ready},e.__MG_PIXI__}function qe(){if(!B.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function up(e=15e3){if(B.ready)return _r(),true;if(await Oe.init(e),B.app=Oe.app(),B.ticker=Oe.ticker(),B.renderer=Oe.renderer(),B.stage=Oe.stage(),!B.app||!B.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return B.ready=true,_r(),true}function pp(e,t,n){qe();const o=L.PIXI;if(!o)return;let r=B.stage.getChildByName("gemini-overlay");r||(r=new o.Container,r.name="gemini-overlay",B.stage.addChild(r));const i=n.key;let a=r.getChildByName(i);a||(a=new o.Graphics,a.name=i,r.addChild(a));const s=Ke.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=Ke.getTransform(),u=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,u,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function fp(e){const t=B.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}const po={init:up,ready:()=>B.ready,expose:_r,get app(){return B.app},get renderer(){return B.renderer},get stage(){return B.stage},get ticker(){return B.ticker},get PIXI(){return L.PIXI||null},defineTileSet:Zu,deleteTileSet:Qu,listTileSets:ep,highlightPulse:ka,stopHighlight:uo,clearHighlights:wa,drawOverlayBox:pp,stopOverlay:fp,highlightMutation:Sa,watchMutation:op,stopWatchMutation:ip,inspectTile:sp,fadeSpecies:Ta,clearSpeciesFade:Aa,clearFades:Lr,watchFadeSpecies:cp,stopWatchFadeSpecies:dp},Ro=L??window,gp={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},mp={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Dt=.001,jt=.2;let hn=null;const H={ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Xt(){if(!H.ready)throw new Error("MGAudio not ready yet")}function No(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n);}catch{o=n;}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){const r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function Kt(e){const t=gp[e],n=mp[e];if(!t)return {atom:jt,vol100:bn(jt)};const o=No(t,NaN);if(Number.isFinite(o)){const i=Re(o,0,1);return {atom:i,vol100:bn(i)}}if(n){const i=No(n,NaN);if(Number.isFinite(i)){const a=Re(i,0,1);return {atom:a,vol100:bn(a)}}}const r=jt;return {atom:r,vol100:bn(r)}}function hp(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const o=(Re(t,1,100)-1)/99;return Dt+o*(jt-Dt)}function bn(e){const t=Re(Number(e),0,1);if(t<=Dt)return 0;const n=(t-Dt)/(jt-Dt);return Math.round(1+n*99)}function Pa(e,t){if(t==null)return Kt(e).atom;const n=hp(t);return n===null?Kt(e).atom:Si(n)}async function Ia(){const e=H.ctx;if(e)return e;const t=Ro.AudioContext||Ro.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return H.ctx=n,n}async function Ma(){if(H.ctx&&H.ctx.state==="suspended")try{await H.ctx.resume();}catch{}}function bp(e){const t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r);};for(const o of Object.keys(e||{})){const r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o);}for(const[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);H.sfx.groups=t;}function yp(e){const t=H.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=H.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function vp(){if(H.sfx.buffer)return H.sfx.buffer;if(!H.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Ia();await Ma();const n=await(await Mi(H.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{const a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i);});return H.sfx.buffer=o,o}async function xp(e,t={}){if(!H.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const o=yp(n),r=H.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);const i=await Ia();await Ma();const a=await vp(),s=Math.max(0,+r.start||0),c=Math.max(s,+r.end||s),u=Math.max(.01,c-s),l=Pa("sfx",t.volume),d=i.createGain();d.gain.value=l,d.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(d),p.start(0,s,u),{name:o,source:p,start:s,end:c,duration:u,volume:l}}function Ea(e){if(e!=="music"&&e!=="ambience")return  false;const t=H.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return H.tracks[e]=null,true}function wp(e,t,n={}){if(!H.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const o=H.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Ea(e);const r=new Audio(o);return r.loop=!!n.loop,r.volume=Pa(e,n.volume),r.preload="auto",r.play().catch(()=>{}),H.tracks[e]=r,r}async function kp(e,t,n={}){const o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return xp(r,n);if(o==="music"||o==="ambience")return wp(o,r,n);throw new Error(`Unknown category: ${o}`)}function Sp(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(H.urls[n].keys()).sort():n==="sfx"?H.sfx.atlas?t.groups?Array.from(H.sfx.groups.keys()).sort():Object.keys(H.sfx.atlas).sort():[]:[]}function Cp(){return H.tracks.music&&(H.tracks.music.volume=Kt("music").atom),H.tracks.ambience&&(H.tracks.ambience.volume=Kt("ambience").atom),true}function Ap(){return Xt(),["sfx","music","ambience"]}function Tp(){return Xt(),Array.from(H.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Pp(e,t){Xt();const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return  false;const r=H.urls[n],i=o.toLowerCase();for(const a of r.keys())if(a.toLowerCase()===i)return  true;return  false}function Ip(e){Xt();const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const o of H.sfx.groups.keys())if(o.toLowerCase()===n)return  true;return  false}function Mp(e,t){Xt();const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const r=H.urls[n],i=o.toLowerCase();for(const[a,s]of r.entries())if(a.toLowerCase()===i)return s;return null}async function Ep(){return H.ready?true:hn||(hn=(async()=>{H.baseUrl=await vt.base();const e=await He.load(H.baseUrl),t=He.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string")continue;const r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){const i=r[1].toLowerCase(),a=r[2];H.urls[i].set(a,Fe(H.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(H.sfx.mp3Url=Fe(H.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(H.sfx.atlasUrl=Fe(H.baseUrl,o));}if(!H.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return H.sfx.atlas=await qr(H.sfx.atlasUrl),bp(H.sfx.atlas),H.ready=true,true})(),hn)}const La={init:Ep,ready:()=>H.ready,play:kp,stop:Ea,list:Sp,refreshVolumes:Cp,categoryVolume:Kt,getCategories:Ap,getGroups:Tp,hasTrack:Pp,hasGroup:Ip,getTrackUrl:Mp},Or=L?.document??document;let yn=null;const le={ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Lp(){if(le.overlay)return le.overlay;const e=Or.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Or.documentElement.appendChild(e),le.overlay=e,e}function _p(){const e=le.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Rr(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Op(e,t){if(t===void 0){const i=Rr(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),o=Rr(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){const i=o.indexOf("_");return {cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return {cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Rp(){return Array.from(le.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Np(e){const t=le.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Nr(e,t){const{cat:n,asset:o,base:r}=Op(e,t),i=le.byBase.get(r);if(i)return i;const s=le.byCat.get(n)?.get(o);if(s)return s;if(!le.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return Fe(le.baseUrl,`cosmetic/${r}.png`)}function $r(e,t,n){if(!le.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=r!==void 0?Nr(e,r):Nr(e),a=Or.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):Rr(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(const[s,c]of Object.entries(o.style))try{a.style[s]=String(c);}catch{}return a}function $p(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=o.parent||_p()||Lp(),a=r!==void 0?$r(e,r,o):$r(e,o);if(i===le.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);const c=o.scale??1,u=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`;else {const l=o.x??innerWidth/2,d=o.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${d}px`,a.style.transform=`scale(${c}) rotate(${u}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`);}}return i.appendChild(a),le.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}le.live.delete(a);},a}function Dp(e){return le.defaultParent=e,true}function jp(){for(const e of Array.from(le.live))e.__mgDestroy?.();}async function zp(){return le.ready?true:yn||(yn=(async()=>{le.baseUrl=await vt.base();const e=await He.load(le.baseUrl),t=He.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");le.byCat.clear(),le.byBase.clear();for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;const i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),u=Fe(le.baseUrl,o);le.byBase.set(i,u),le.byCat.has(s)||le.byCat.set(s,new Map),le.byCat.get(s).set(c,u);}return le.ready=true,true})(),yn)}const _a={init:zp,ready:()=>le.ready,categories:Rp,list:Np,url:Nr,create:$r,show:$p,attach:Dp,clear:jp},pt="gemini:";function Oa(e,t){try{const n=e.startsWith(pt)?e:pt+e,o=localStorage.getItem(n);return o===null?t:JSON.parse(o)}catch(n){return console.error(`[Storage] Error reading key "${e}":`,n),t}}function Ra(e,t){try{const n=e.startsWith(pt)?e:pt+e,o=e.startsWith(pt)?e.slice(pt.length):e;localStorage.setItem(n,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:o,value:t}}));}catch(n){console.error(`[Storage] Error writing key "${e}":`,n);}}function De(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!De(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return  false;for(const a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!De(n[a],o[a]))return  false;return  true}const $o={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Do={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function Fp(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Gp(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Bp(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function Wp(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function Hp(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,o=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function jo(e){return {position:Fp(e),tile:Gp(e),garden:Bp(e),object:Wp(e),plant:Hp(e)}}function zo(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Vp(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!De(e.data,t.data)}function Up(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!De(e.sortedSlotIndices,t.sortedSlotIndices)}function Kp(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function qp(){let e=Do,t=Do,n=false;const o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys($o),s=new Set;function c(){if(s.size<a.length)return;const l=jo(i);if(!De(e,l)&&(t=e,e=l,!!n)){for(const d of r.all)d(e,t);if(zo(t)!==zo(e))for(const d of r.stable)d(e,t);if(Vp(t.object,e.object)){const d={current:e.object,previous:t.object};for(const p of r.object)p(d);}if(Up(t.plant,e.plant)){const d={current:e.plant,previous:t.plant};for(const p of r.plantInfo)p(d);}if(Kp(t.garden,e.garden)){const d={current:e.garden,previous:t.garden};for(const p of r.garden)p(d);}}}async function u(){if(n)return;const l=a.map(async d=>{const p=$o[d],f=await de.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=jo(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeObject(l,d){return r.object.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>r.object.delete(l)},subscribePlantInfo(l,d){return r.plantInfo.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(l)},subscribeGarden(l,d){return r.garden.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>r.garden.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=false;}}}let or=null;function Jp(){return or||(or=qp()),or}const ft={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Yp=new Set(["Gold","Rainbow"]),Xp=new Set(["Frozen","Chilled","Wet"]);function Na(e){let t=1,n=0,o=0;for(const r of e)r==="Gold"||r==="Rainbow"?r==="Rainbow"?t=ft.Rainbow:t===1&&(t=ft.Gold):r in ft&&(n+=ft[r],o++);return t*(1+n-o)}function $a(e){return ft[e]??null}function Da(e){return Yp.has(e)}function Zp(e){return Xp.has(e)}function Qp(){return Object.keys(ft)}function ef(e){const t=$a(e);return t===null?null:{name:e,value:t,type:Da(e)?"growth":"environmental"}}function tf(e,t){const n=fo(e);if(!n)return 50;const o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;const r=(t-1)/(o-1);return Math.floor(50+50*r)}function ja(e,t,n){const o=fo(e);if(!o)return 0;const r=o.baseSellPrice,i=Na(n);return Math.round(r*t*i)}function nf(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const o=t-e,r=n-e;return Math.floor(r/o*100)}function rf(e,t){return t>=e}function of(e,t){const n=Math.max(0,e-t);return Math.floor(n/1e3)}function fo(e){const t=he.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function af(e){return e.reduce((t,n)=>t+ja(n.species,n.targetScale,n.mutations),0)}const za=3600,ir=80,sf=100,_t=30;function Wn(e){return e/za}function Hn(e,t){const n=kt(e);if(!n)return ir;const o=n.maxScale;if(t<=1)return ir;if(t>=o)return sf;const r=(t-1)/(o-1);return Math.floor(ir+20*r)}function Vn(e,t,n){const o=kt(e);if(!o)return n-_t;const r=o.hoursToMature,i=t/za,a=_t/r,s=Math.min(a*i,_t),c=n-_t;return Math.floor(c+s)}function Un(e,t){const n=kt(e);return n?t>=n.hoursToMature:false}function Fa(e){const t=kt(e);return t?_t/t.hoursToMature:0}function Ga(e,t,n){const o=t-e;return o<=0||n<=0?0:o/n}function lf(e,t){const n=kt(e);if(!n)return 0;const o=n.hoursToMature-t;return Math.max(0,o)}function kt(e){const t=he.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Ba(e,t){return t<=0?1:Math.min(1,e/t)}const cf=Object.freeze(Object.defineProperty({__proto__:null,calculateCropProgress:nf,calculateCropSellPrice:ja,calculateCropSize:tf,calculateCurrentStrength:Vn,calculateHoursToMature:lf,calculateHoursToMaxStrength:Ga,calculateMaxStrength:Hn,calculateMutationMultiplier:Na,calculatePetAge:Wn,calculateStrengthPerHour:Fa,calculateStrengthProgress:Ba,calculateTimeRemaining:of,calculateTotalCropValue:af,getAllMutationNames:Qp,getCropData:fo,getMutationInfo:ef,getMutationValue:$a,getPetData:kt,isCropReady:rf,isEnvironmentalMutation:Zp,isGrowthMutation:Da,isPetMature:Un},Symbol.toStringTag,{value:"Module"})),Fo={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function Go(e,t){const n=Wn(e.xp),o=Hn(e.petSpecies,e.targetScale),r=Vn(e.petSpecies,e.xp,o),i=Un(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:i}}function df(e,t){const o=t[e.slot.id]?.lastAbilityTrigger??null,r=Wn(e.slot.xp),i=Hn(e.slot.petSpecies,e.slot.targetScale),a=Vn(e.slot.petSpecies,e.slot.xp,i),s=Un(e.slot.petSpecies,r);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:a,maxStrength:i,isMature:s}}function Bo(e){const t=new Set,n=[];for(const c of e.active??[]){const u=df(c,e.slotInfos??{});n.push(u),t.add(u.id);}const o=[];for(const c of e.inventory??[]){if(t.has(c.id))continue;const u=Go(c,"inventory");o.push(u),t.add(u.id);}const r=[];for(const c of e.hutch??[]){if(t.has(c.id))continue;const u=Go(c,"hutch");r.push(u),t.add(u.id);}const i=[...n,...o,...r],a=e.expandedPetSlotId??null,s=a?i.find(c=>c.id===a)??null:null;return {all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length},expandedPetSlotId:a,expandedPet:s}}const Wo={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function uf(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Ho(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function pf(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Ho),o=t.all.map(Ho);return uf(n,o)}function ff(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location});}return n}function gf(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){if(!r.lastAbilityTrigger)continue;const a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger});}return n}function mf(e,t){const n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function hf(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.growthStage>i.growthStage&&n.push({pet:r,previousStage:i.growthStage,newStage:r.growthStage});}return n}function bf(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength>i.currentStrength&&n.push({pet:r,previousStrength:i.currentStrength,newStrength:r.currentStrength});}return n}function yf(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength===r.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:r});}return n}function vf(){let e=Wo,t=Wo,n=false;const o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Fo),s=new Set;function c(){if(s.size<a.length)return;const l=Bo(i);if(De(e,l)||(t=e,e=l,!n))return;for(const y of r.all)y(e,t);if(!pf(t,e))for(const y of r.stable)y(e,t);const d=ff(t,e);for(const y of d)for(const S of r.location)S(y);const p=gf(t,e);for(const y of p)for(const S of r.ability)S(y);const f=mf(t,e);if(f)for(const y of r.count)y(f);const g=hf(t,e);for(const y of g)for(const S of r.growth)S(y);const m=bf(t,e);for(const y of m)for(const S of r.strengthGain)S(y);const h=yf(t,e);for(const y of h)for(const S of r.maxStrength)S(y);if(t.expandedPetSlotId!==e.expandedPetSlotId){const y={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of r.expandedPet)S(y);}}async function u(){if(n)return;const l=a.map(async d=>{const p=Fo[d],f=await de.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Bo(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeLocation(l,d){if(r.location.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>r.location.delete(l)},subscribeAbility(l,d){if(r.ability.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>r.ability.delete(l)},subscribeCount(l,d){return r.count.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(l)},subscribeExpandedPet(l,d){return r.expandedPet.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(l)},subscribeGrowth(l,d){if(r.growth.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>r.growth.delete(l)},subscribeStrengthGain(l,d){if(r.strengthGain.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>r.strengthGain.delete(l)},subscribeMaxStrength(l,d){if(r.maxStrength.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>r.maxStrength.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=false;}}}let ar=null;function xf(){return ar||(ar=vf()),ar}function wf(){let e=null;const t=[],n=new Set,o={},r=new Set,i=2;function a(d,p){return {x:p%d,y:Math.floor(p/d)}}function s(d,p,f){return f*d+p}function c(d,p){const{cols:f,rows:g}=d,m=f*g,h=new Set,y=new Set,S=new Map,v=[],b=d.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],C=d.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],x=Math.max(b.length,C.length);for(let T=0;T<x;T++){const _=b[T]??[],E=C[T]??[],D=_.map((z,Y)=>(h.add(z),S.set(z,T),{globalIndex:z,localIndex:Y,position:a(f,z)})),ee=E.map((z,Y)=>(y.add(z),S.set(z,T),{globalIndex:z,localIndex:Y,position:a(f,z)}));v.push({userSlotIdx:T,dirtTiles:D,boardwalkTiles:ee,allTiles:[...D,...ee]});}const A=d.spawnTiles.map(T=>a(f,T)),P={};if(d.locations)for(const[T,_]of Object.entries(d.locations)){const E=_.spawnTileIdx??[];P[T]={name:T,spawnTiles:E,spawnPositions:E.map(D=>a(f,D))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:d.spawnTiles,spawnPositions:A,locations:P,userSlots:v,globalToXY(T){return a(f,T)},xyToGlobal(T,_){return s(f,T,_)},getTileOwner(T){return S.get(T)??null},isDirtTile(T){return h.has(T)},isBoardwalkTile(T){return y.has(T)}}}function u(){if(r.size<i||e)return;const d=o.map,p=o.tileSize??0;if(d){e=c(d,p);for(const f of n)f(e);n.clear();}}async function l(){const d=await de.subscribe("mapAtom",f=>{o.map=f,r.add("map"),u();});t.push(d);const p=await de.subscribe("tileSizeAtom",f=>{o.tileSize=f,r.add("tileSize"),u();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(d,p){return e?(p?.immediate!==false&&d(e),()=>{}):(n.add(d),()=>n.delete(d))},destroy(){for(const d of t)d();t.length=0,e=null,n.clear();}}}let sr=null;function Dr(){return sr||(sr=wf()),sr}const Vo={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Uo={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Ko(e){const t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex;let i=null;return r!==null&&r>=0&&r<n.length&&(i={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??false,selectedItem:i}}function qo(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function kf(e,t){return qo(e)===qo(t)}function Sf(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function vn(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Cf(e,t){const n=new Set(e.map(vn)),o=new Set(t.map(vn)),r=t.filter(a=>!n.has(vn(a))),i=e.filter(a=>!o.has(vn(a)));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:{before:e.length,after:t.length}}}function Af(e,t){const n=new Set(e),o=new Set(t),r=t.filter(a=>!n.has(a)),i=e.filter(a=>!o.has(a));return r.length===0&&i.length===0?null:{added:r,removed:i,current:t}}function Tf(){let e=Uo,t=Uo,n=false;const o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Vo),s=new Set;function c(){if(s.size<a.length)return;const l=Ko(i);if(De(e,l)||(t=e,e=l,!n))return;for(const f of r.all)f(e,t);if(!kf(t,e))for(const f of r.stable)f(e,t);if(Sf(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of r.selection)g(f);}const d=Cf(t.items,e.items);if(d)for(const f of r.items)f(d);const p=Af(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of r.favorites)f(p);}async function u(){if(n)return;const l=a.map(async d=>{const p=Vo[d],f=await de.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Ko(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeSelection(l,d){return r.selection.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(l)},subscribeItems(l,d){return r.items.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(l)},subscribeFavorites(l,d){return r.favorites.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=false;}}}let lr=null;function Pf(){return lr||(lr=Tf()),lr}const jr={all:[],host:null,myPlayer:null,count:0};function If(e,t,n){const o=n.get(e.id),r=o?.slot,i=r?.data,a=r?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function Jo(e){const t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return jr;const r=new Map;Array.isArray(o)&&o.forEach((c,u)=>{c?.type==="user"&&c?.playerId&&r.set(c.playerId,{slot:c,index:u});});const i=t.map(c=>If(c,n,r)),a=i.find(c=>c.isHost)??null,s=i.find(c=>c.slotIndex!==null&&c.slotIndex>=0)??null;return {all:i,host:a,myPlayer:s,count:i.length}}function Yo(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Mf(e,t){const n=[],o=new Set(e.map(i=>i.id)),r=new Set(t.map(i=>i.id));for(const i of t)o.has(i.id)||n.push({player:i,type:"join"});for(const i of e)r.has(i.id)||n.push({player:i,type:"leave"});return n}function Ef(e,t){const n=[],o=new Map(e.map(r=>[r.id,r]));for(const r of t){const i=o.get(r.id);i&&i.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected});}return n}function Lf(){let e=jr,t=jr,n=false;const o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function c(){if(a.size<s)return;const l=Jo(i);if(De(e,l)||(t=e,e=l,!n))return;for(const m of r.all)m(e,t);if(Yo(t)!==Yo(e))for(const m of r.stable)m(e,t);const d=Mf(t.all,e.all);for(const m of d)for(const h of r.joinLeave)h(m);const p=Ef(t.all,e.all);for(const m of p)for(const h of r.connection)h(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const h of r.host)h(m);}}async function u(){if(n)return;const l=await iu.onChangeNow(f=>{i.players=f,a.add("players"),c();});o.push(l);const d=await au.onChangeNow(f=>{i.hostPlayerId=f,a.add("hostPlayerId"),c();});o.push(d);const p=await ou.onChangeNow(f=>{i.userSlots=f,a.add("userSlots"),c();});o.push(p),n=true,a.size===s&&(e=Jo(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeJoinLeave(l,d){if(r.joinLeave.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>r.joinLeave.delete(l)},subscribeConnection(l,d){if(r.connection.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>r.connection.delete(l)},subscribeHost(l,d){return r.host.add(l),d?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>r.host.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=false;}}}let cr=null;function _f(){return cr||(cr=Lf()),cr}const Zt=["seed","tool","egg","decor"];function Of(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function Rf(e,t,n){const o=Of(e,t),r=n[o]??0,i=Math.max(0,e.initialStock-r);return {id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:i,isAvailable:i>0}}function Nf(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const r=n[e]?.purchases??{},i=(t.inventory??[]).map(u=>Rf(u,e,r)),a=i.filter(u=>u.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function Xo(e){const t=e.shops,n=e.purchases??{},o=Zt.map(s=>Nf(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},i=o.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((u,l)=>(u.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:o,byType:r,nextRestock:a}}const Zo={all:Zt.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Qo(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function $f(e,t){const n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function Df(e,t){const n=[];for(const o of Zt){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function jf(e,t){const n=[];for(const o of Zt){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function zf(){let e=Zo,t=Zo,n=false;const o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Xo(i);if(De(e,l)||(t=e,e=l,!n))return;for(const g of r.all)g(e,t);if(Qo(t)!==Qo(e))for(const g of r.stable)g(e,t);const d={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(const g of Zt){const m=$f(t.byType[g],e.byType[g]);if(m)for(const h of d[g])h(m);}const p=Df(t,e);for(const g of p)for(const m of r.purchase)m(g);const f=jf(t,e);for(const g of f)for(const m of r.availability)m(g);}async function u(){if(n)return;const l=await lu.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});o.push(l);const d=await cu.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});o.push(d),n=true,a.size===s&&(e=Xo(i));}return u(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,d){return e.byType[l].items.find(f=>f.id===d)??null},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeSeedRestock(l,d){return r.seedRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(l)},subscribeToolRestock(l,d){return r.toolRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(l)},subscribeEggRestock(l,d){return r.eggRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(l)},subscribeDecorRestock(l,d){return r.decorRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(l)},subscribePurchase(l,d){if(r.purchase.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>r.purchase.delete(l)},subscribeAvailability(l,d){if(r.availability.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>r.availability.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=false;}}}let dr=null;function Ff(){return dr||(dr=zf()),dr}const Gf=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Bf(e){return Gf.includes(e)}const zr={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function Wf(e){if(!e)return zr;const t=Date.now(),n=e.endTime??0,o=Math.max(0,n-t),r=Math.floor(o/1e3),i=r>0,a=e.type??"Sunny";return {type:Bf(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:r}}function Hf(){let e=zr,t=zr,n=false,o=null;const r={all:new Set,change:new Set};function i(s){const c=Wf(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const u of r.all)u(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const u={current:e,previous:t};for(const l of r.change)l(u);}}}async function a(){n||(o=await du.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return r.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>r.all.delete(s)},subscribeChange(s,c){return r.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>r.change.delete(s)},destroy(){o?.(),o=null,r.all.clear(),r.change.clear(),n=false;}}}let ur=null;function Vf(){return ur||(ur=Hf()),ur}function Uf(){const e=he.get("mutations");return e?Object.keys(e):[]}function Wa(){const e={};for(const t of Uf())e[t]=[];return e}function Fr(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Wa()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Kf(e,t,n,o){const r=t.slots.filter(i=>o>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function qf(e,t,n,o,r){return {tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime}}function Jf(e,t,n,o){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function ei(e,t,n,o){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function ti(e,t){const{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return Fr();const i=t().get(),a=i?.userSlots[o],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],u=[],l=[],d=[],p={},f=[],g=[],m=[],h=[],y=Wa(),S=[],v=[],b=[],C={},x=[],A=[],P={},T=new Set,_=new Set;for(const[z,Y]of Object.entries(n.tileObjects)){const ie=parseInt(z,10);T.add(ie);const W=i?i.globalToXY(ie):{x:0,y:0};if(Y.objectType==="plant"){const j=Y,$=Kf(z,j,W,r);u.push($),$.isMature?l.push($):d.push($),p[$.species]||(p[$.species]=[]),p[$.species].push($);for(let O=0;O<j.slots.length;O++){const I=j.slots[O],N=qf(z,W,O,I,r);if(f.push(N),N.isMature?g.push(N):m.push(N),N.mutations.length>0){h.push(N);for(const R of N.mutations)y[R]||(y[R]=[]),y[R].push(N);}}}else if(Y.objectType==="egg"){const $=Jf(z,Y,W,r);S.push($),C[$.eggId]||(C[$.eggId]=[]),C[$.eggId].push($),$.isMature?v.push($):b.push($);}else if(Y.objectType==="decor"){const $=ei(z,Y,W,"tileObjects");x.push($),P[$.decorId]||(P[$.decorId]=[]),P[$.decorId].push($);}}for(const[z,Y]of Object.entries(n.boardwalkTileObjects)){const ie=parseInt(z,10);_.add(ie);const W=i?i.globalToXY(ie):{x:0,y:0},$=ei(z,Y,W,"boardwalk");A.push($),P[$.decorId]||(P[$.decorId]=[]),P[$.decorId].push($);}const E=[...x,...A],D=s.filter(z=>!T.has(z.localIndex)),ee=c.filter(z=>!_.has(z.localIndex));return {garden:n,mySlotIndex:o,plants:{all:u,mature:l,growing:d,bySpecies:p,count:u.length},crops:{all:f,mature:g,growing:m,mutated:{all:h,byMutation:y}},eggs:{all:S,mature:v,growing:b,byType:C,count:S.length},decors:{tileObjects:x,boardwalk:A,all:E,byType:P,count:E.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:D,boardwalk:ee}},counts:{plants:u.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:S.length,matureEggs:v.length,decors:E.length,emptyTileObjects:D.length,emptyBoardwalk:ee.length}}}function ni(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Yf(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function Xf(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function Zf(e,t,n){const o=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),r=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !o.has(a)&&r.has(a)})}function Qf(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function eg(e,t){const n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(const r of t){const i=o.get(r.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,r.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),u=new Set(r.slots[s].mutations),l=[...u].filter(p=>!c.has(p)),d=[...c].filter(p=>!u.has(p));if(l.length>0||d.length>0){const p=Date.now(),f=r.slots[s],g={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:d});}}}return n}function tg(e,t,n){const o=[],r=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=r.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let u=0;u<c;u++){const l=a.slots[u],d=s.slots[u];if(l.startTime!==d.startTime){const p=i.get(`${a.tileIndex}:${u}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};o.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let u=s.slotsCount;u<a.slotsCount;u++){const l=i.get(`${a.tileIndex}:${u}`);if(!l||!l.isMature)continue;const d=a.slots[u];if(!d)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true};o.push({crop:p,remainingSlots:s.slotsCount});}}return o}function ng(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function rg(e,t){const n=c=>`${c.tileIndex}:${c.location}`,o=c=>`${c.tileIndex}:${c.location}`,r=new Set(e.map(n)),i=new Set(t.map(o)),a=t.filter(c=>!r.has(o(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function og(){let e=Fr(),t=Fr(),n=false;const o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=ti(i,Dr);if(De(e,l)||(t=e,e=l,!n))return;for(const v of r.all)v(e,t);if(ni(t)!==ni(e))for(const v of r.stable)v(e,t);const d=Yf(t.plants.all,e.plants.all);for(const v of d.added)for(const b of r.plantAdded)b({plant:v});for(const v of d.removed)for(const b of r.plantRemoved)b({plant:v,tileIndex:v.tileIndex});const p=Xf(t.plants.mature,e.plants.mature,e.plants.all);for(const v of p)for(const b of r.plantMatured)b({plant:v});const f=eg(t.plants.all,e.plants.all);for(const v of f)for(const b of r.cropMutated)b(v);const g=Zf(t.crops.mature,e.crops.mature,e.crops.all);for(const v of g)for(const b of r.cropMatured)b({crop:v});const m=tg(t.plants.all,e.plants.all,t.crops.all);for(const v of m)for(const b of r.cropHarvested)b(v);const h=ng(t.eggs.all,e.eggs.all);for(const v of h.added)for(const b of r.eggPlaced)b({egg:v});for(const v of h.removed)for(const b of r.eggRemoved)b({egg:v});const y=Qf(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const v of y)for(const b of r.eggMatured)b({egg:v});const S=rg(t.decors.all,e.decors.all);for(const v of S.added)for(const b of r.decorPlaced)b({decor:v});for(const v of S.removed)for(const b of r.decorRemoved)b({decor:v});}async function u(){if(n)return;const l=await su.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});o.push(l);const d=await de.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});o.push(d),n=true,a.size===s&&(e=ti(i,Dr));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribePlantAdded(l,d){if(r.plantAdded.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>r.plantAdded.delete(l)},subscribePlantRemoved(l,d){return r.plantRemoved.add(l),()=>r.plantRemoved.delete(l)},subscribePlantMatured(l,d){if(r.plantMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>r.plantMatured.delete(l)},subscribeCropMutated(l,d){if(r.cropMutated.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>r.cropMutated.delete(l)},subscribeCropMatured(l,d){if(r.cropMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>r.cropMatured.delete(l)},subscribeCropHarvested(l,d){return r.cropHarvested.add(l),()=>r.cropHarvested.delete(l)},subscribeEggPlaced(l,d){if(r.eggPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>r.eggPlaced.delete(l)},subscribeEggRemoved(l,d){return r.eggRemoved.add(l),()=>r.eggRemoved.delete(l)},subscribeEggMatured(l,d){if(r.eggMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>r.eggMatured.delete(l)},subscribeDecorPlaced(l,d){if(r.decorPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>r.decorPlaced.delete(l)},subscribeDecorRemoved(l,d){return r.decorRemoved.add(l),()=>r.decorRemoved.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=false;}}}let pr=null;function ig(){return pr||(pr=og()),pr}let ve=null;function Ha(){return ve||(ve={currentTile:Jp(),myPets:xf(),gameMap:Dr(),myInventory:Pf(),players:_f(),shops:Ff(),weather:Vf(),myGarden:ig()},ve)}function ze(){if(!ve)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ve}function ag(){ve&&(ve.currentTile.destroy(),ve.myPets.destroy(),ve.gameMap.destroy(),ve.myInventory.destroy(),ve.players.destroy(),ve.shops.destroy(),ve.weather.destroy(),ve.myGarden.destroy(),ve=null);}const Va={get currentTile(){return ze().currentTile},get myPets(){return ze().myPets},get gameMap(){return ze().gameMap},get myInventory(){return ze().myInventory},get players(){return ze().players},get shops(){return ze().shops},get weather(){return ze().weather},get myGarden(){return ze().myGarden}},sg=100,fr=[];function Gr(e,t,n){let o="";if(n&&typeof n=="object"){if(t==="PartialState"){const r=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(r||i)o=`PartialState : ${r} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(o=`PartialState - {${s.join(", ")}}`);}}if(!o&&n.event&&(o+=`${n.event} `),!o&&n.op&&(o+=`op:${n.op} `),!o&&n.data){const r=Object.keys(n.data);r.length>0&&(o+=`{${r.slice(0,3).join(",")}${r.length>3?"...":""}}`);}else !o&&Array.isArray(n)&&(o+=`[${n.length} items]`);}else typeof n=="string"&&(o=n.slice(0,50));fr.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:o.trim()||"-"}),fr.length>sg&&fr.shift();}const Se={nativeCtor:null,captured:[],latestOpen:null},ri=Symbol.for("ariesmod.ws.capture.wrapped"),oi=Symbol.for("ariesmod.ws.capture.native"),Ua=1;function Br(e){return !!e&&e.readyState===Ua}function lg(){if(Br(Se.latestOpen))return Se.latestOpen;for(let e=Se.captured.length-1;e>=0;e--){const t=Se.captured[e];if(Br(t))return t}return null}function cg(e,t){Se.captured.push(e),Se.captured.length>25&&Se.captured.splice(0,Se.captured.length-25);const n=()=>{Se.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Se.latestOpen===e&&(Se.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",o=>{try{const r=JSON.parse(o.data);Gr("in",r.type||"unknown",r);}catch{Gr("in","raw",o.data);}}),e.readyState===Ua&&n();}function dg(e=L,t={}){const n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return ()=>{};if(o[ri])return Se.nativeCtor=o[oi]??Se.nativeCtor??null,()=>{};const r=o;Se.nativeCtor=r;function i(a,s){const c=s!==void 0?new r(a,s):new r(a);try{cg(c,n);}catch{}return c}try{i.prototype=r.prototype;}catch{}try{Object.setPrototypeOf(i,r);}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED;}catch{}i[ri]=true,i[oi]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=r);}catch{}}}function ug(e=L){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Dn(e=L){const t=lg();if(t)return {ws:t,source:"captured"};const n=ug(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Ka(e,t={}){const n=t.pageWindow??L,o=t.intervalMs??500,r=!!t.debug;let i=null,a=null;const s=()=>{const u=Dn(n);(u.ws!==i||u.source!==a)&&(i=u.ws,a=u.source,r&&console.log("[WS] best socket changed:",u.source,u.ws),e(u));};s();const c=setInterval(s,o);return ()=>clearInterval(c)}function pg(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function fg(e,t=L){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:o}=Dn(t);if(!o)return {ok:false,reason:"no-ws"};if(!Br(o))return {ok:false,reason:"not-open"};const r=pg(e);if(r==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(r);Gr("out",i.type||"unknown",i);}catch{}try{return o.send(r),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function gg(e,t={},n=L){return fg({type:e,...t},n)}const Be={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Ne=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Ne||{});new Set(Object.values(Be));new Set(Object.values(M));function q(e,t={},n=L){return gg(e,t,n)}function mg(e,t=L){return q(M.Chat,{scopePath:["Room"],message:e},t)}function hg(e,t=L){return q(M.Emote,{scopePath:["Room"],emoteType:e},t)}function bg(e,t=L){return q(M.Wish,{wish:e},t)}function yg(e,t=L){return q(M.KickPlayer,{scopePath:["Room"],playerId:e},t)}function vg(e,t=L){return q(M.SetPlayerData,{scopePath:["Room"],data:e},t)}function xg(e=L){return q(M.UsurpHost,{},e)}function wg(e=L){return q(M.ReportSpeakingStart,{},e)}function kg(e,t=L){return q(M.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function Sg(e,t=L){return q(M.VoteForGame,{scopePath:["Room"],gameId:e},t)}function Cg(e,t=L){return q(M.RequestGame,{scopePath:["Room"],gameId:e},t)}function Ag(e=L){return q(M.RestartGame,{scopePath:["Room"]},e)}function Tg(e,t=L){return q(M.Ping,{id:e},t)}function qa(e,t,n=L){return q(M.PlayerPosition,{x:e,y:t},n)}const Pg=qa;function Ig(e,t,n=L){return q(M.Teleport,{x:e,y:t},n)}function Mg(e=L){return q(M.CheckWeatherStatus,{},e)}function Eg(e,t,n=L){return q(M.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Lg(e,t=L){return q(M.DropObject,{slotIndex:e},t)}function _g(e,t=L){return q(M.PickupObject,{objectId:e},t)}function Og(e,t,n=L){return q(M.ToggleFavoriteItem,{scopePath:["Item",e],itemId:e,favorited:t},n)}function Rg(e,t=L){return q(M.PutItemInStorage,{itemId:e},t)}function Ng(e,t=L){return q(M.RetrieveItemFromStorage,{itemId:e},t)}function $g(e,t,n=L){return q(M.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Dg(e=L){return q(M.LogItems,{},e)}function jg(e,t,n,o=L){return q(M.PlantSeed,{seedId:e,x:t,y:n},o)}function zg(e,t=L){return q(M.WaterPlant,{plantId:e},t)}function Fg(e,t=L){return q(M.HarvestCrop,{cropId:e},t)}function Gg(e=L){return q(M.SellAllCrops,{},e)}function Bg(e,t=L){return q(M.PurchaseDecor,{decorId:e},t)}function Wg(e,t=L){return q(M.PurchaseEgg,{eggId:e},t)}function Hg(e,t=L){return q(M.PurchaseTool,{toolId:e},t)}function Vg(e,t=L){return q(M.PurchaseSeed,{seedId:e},t)}function Ug(e,t,n,o=L){return q(M.PlantEgg,{eggId:e,x:t,y:n},o)}function Kg(e,t=L){return q(M.HatchEgg,{eggId:e},t)}function qg(e,t,n,o=L){return q(M.PlantGardenPlant,{plantId:e,x:t,y:n},o)}function Jg(e,t,n=L){return q(M.PotPlant,{plantId:e,potId:t},n)}function Yg(e,t,n=L){return q(M.MutationPotion,{potionId:e,targetId:t},n)}function Xg(e,t=L){return q(M.PickupDecor,{decorInstanceId:e},t)}function Zg(e,t,n,o=L){return q(M.PlaceDecor,{decorId:e,x:t,y:n},o)}function Qg(e,t=L){return q(M.RemoveGardenObject,{objectId:e},t)}function em(e,t,n,o=L){return q(M.PlacePet,{petId:e,x:t,y:n},o)}function tm(e,t,n=L){return q(M.FeedPet,{petId:e,foodItemId:t},n)}function nm(e,t=L){return q(M.PetPositions,{positions:e},t)}function rm(e,t,n=L){return q(M.SwapPet,{petIdA:e,petIdB:t},n)}function om(e,t=L){return q(M.StorePet,{petId:e},t)}function im(e,t,n=L){return q(M.NamePet,{petId:e,name:t},n)}function am(e,t=L){return q(M.SellPet,{petId:e},t)}const sm=`
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
`;class Ja{constructor(){ae(this,"achievements",new Map);ae(this,"data");ae(this,"storageKey","gemini_achievements");ae(this,"onUnlockCallbacks",[]);ae(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){try{const t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t);}return {unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data));}catch(t){console.warn("[Achievements] Failed to save data:",t);}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const o=this.isUnlocked(t),r=await n.checkProgress(),i={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=r>=n.target;return !o&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const o=await this.checkAchievement(n);t.push(o);}return t}unlock(t,n){const o=this.achievements.get(t);if(!o)return;const r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return {total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Unlock callback error:",o);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Progress callback error:",o);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let zt=null;function lm(){return zt||(zt=new Ja),zt}function cm(){zt&&(zt=null);}const dm=Object.freeze(Object.defineProperty({__proto__:null,AchievementManager:Ja,destroyAchievementManager:cm,getAchievementManager:lm},Symbol.toStringTag,{value:"Module"}));function Ya(e){const t=Wn(e.xp),n=Hn(e.petSpecies,e.targetScale),o=Vn(e.petSpecies,e.xp,n),r=Un(e.petSpecies,t),i=Fa(e.petSpecies),a=Ga(o,n,i),s=Ba(o,n);return {current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:i,hoursToMax:a}}function Xa(e){return {...e,strength:Ya(e)}}function Za(e){return e.map(Xa)}function um(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Za(e),n=t.reduce((c,u)=>c+u.strength.current,0),o=t.reduce((c,u)=>c+u.strength.max,0),r=t.filter(c=>c.strength.isMature).length,i=t.length-r,a=t.reduce((c,u)=>u.strength.max>(c?.strength.max||0)?u:c,t[0]),s=t.reduce((c,u)=>u.strength.max<(c?.strength.max||1/0)?u:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:i,strongestPet:a,weakestPet:s}}const pm=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Ya,enrichPetWithStrength:Xa,enrichPetsWithStrength:Za,getPetStrengthStats:um},Symbol.toStringTag,{value:"Module"}));class Qa{constructor(){ae(this,"logs",[]);ae(this,"maxLogs",1e3);ae(this,"unsubscribe",null);ae(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=Va.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));const{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,o=this.logs.filter(i=>i.timestamp>=n),r=new Map;for(const i of o){r.has(i.abilityId)||r.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=r.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of r.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const o=Date.now()-n,r=this.logs.filter(a=>a.petId===t&&a.timestamp>=o),i=new Map;for(const a of r){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:r.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,i)=>i.count-r.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let tt=null;function fm(){return tt||(tt=new Qa,tt.init()),tt}function gm(){tt&&(tt.destroy(),tt=null);}class es{constructor(){ae(this,"stats");ae(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession();}loadStats(){try{const t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t);}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats));}catch(t){console.warn("[StatsTracker] Failed to save stats:",t);}}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats();}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats();}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(const r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let mt=null;function mm(){return mt||(mt=new es),mt}function hm(){mt&&(mt.endSession(),mt=null);}const bm={AbilityLogger:Qa,getAbilityLogger:fm,destroyAbilityLogger:gm,...pm},ym={StatsTracker:es,getStatsTracker:mm,destroyStatsTracker:hm};async function vm(e){const t=[{name:"Data",init:()=>he.init()},{name:"AntiAfk",init:()=>oa.init()},{name:"CustomModal",init:()=>ba.init()},{name:"Sprites",init:()=>pe.init()},{name:"TileObjectSystem",init:()=>Ke.init()},{name:"Pixi",init:()=>po.init()},{name:"Audio",init:()=>La.init()},{name:"Cosmetics",init:()=>_a.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const ii={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},_e=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],xm={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function ct(e){return e?xm[e]??0:0}class wm extends qt{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});ae(this,"config",ii);ae(this,"allPlants",[]);ae(this,"allPets",[]);ae(this,"sectionElement",null);}async build(n){const o=this.createGrid("12px");o.id="auto-favorite-settings";const r=document.createElement("style");r.textContent=`
      /* Themed scrollbar using CSS variables */
      #auto-favorite-settings .selection-grid::-webkit-scrollbar {
        width: 6px;
      }
      #auto-favorite-settings .selection-grid::-webkit-scrollbar-track {
        background: transparent;
      }
      #auto-favorite-settings .selection-grid::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb, rgba(255,255,255,0.2));
        border-radius: 3px;
      }
      #auto-favorite-settings .selection-grid::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover, rgba(255,255,255,0.3));
      }

      /* Game-style checkbox using theme variables */
      #auto-favorite-settings .game-checkbox {
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid color-mix(in oklab, var(--tab-bg) 60%, transparent);
        border-radius: 3px;
        background: var(--bg);
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
      }

      #auto-favorite-settings .game-checkbox:hover {
        border-color: var(--accent);
        box-shadow: 0 0 4px color-mix(in oklab, var(--accent) 40%, transparent);
      }

      #auto-favorite-settings .game-checkbox:checked {
        background: linear-gradient(135deg, var(--tab-bg) 0%, var(--accent) 100%);
        border-color: var(--accent);
      }

      #auto-favorite-settings .game-checkbox:checked::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--bg);
        font-size: 14px;
        font-weight: bold;
      }

      /* Item row using theme variables */
      #auto-favorite-settings .item-row {
        background: color-mix(in oklab, var(--tab-bg) 8%, transparent);
        border: 1px solid color-mix(in oklab, var(--tab-bg) 20%, transparent);
        transition: all 0.15s ease;
      }

      #auto-favorite-settings .item-row:hover {
        background: color-mix(in oklab, var(--tab-bg) 15%, transparent);
        border-color: var(--accent);
        transform: translateX(2px);
      }

      #auto-favorite-settings .item-row.checked {
        background: color-mix(in oklab, var(--accent) 12%, transparent);
        border-color: var(--accent);
      }

      /* Responsive Mutation Rows - Fluid Flexbox */
      #auto-favorite-settings .mut-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 8px;
        width: 100%;
      }

      #auto-favorite-settings .mut-btn {
        flex: 1 1 130px;
        min-width: 0; /* Allow shrinking below content size */
      }

      /* On narrow containers, buttons will stack automatically due to flex-basis */
    `,n.appendChild(r),this.sectionElement=o,n.appendChild(o),this.config=Oa("gemini:features:autoFavorite:ui",ii),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await he.waitForAnyData();const n=he.get("plants")||{},o=he.get("pets")||{};this.allPlants=Object.keys(n).sort((r,i)=>{const a=n[r]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=ct(a)-ct(s);return c!==0?c:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(o).sort((r,i)=>{const a=o[r]?.rarity||null,s=o[i]?.rarity||null,c=ct(a)-ct(s);return c!==0?c:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(pe.ready())return;const n=1e4,o=100;let r=0;return new Promise(i=>{const a=()=>{pe.ready()||r>=n?i():(r+=o,setTimeout(a,o));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=w("div",{className:"kv"}),o=jn({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),r=Ur({checked:this.config.enabled,onChange:i=>{this.config.enabled=i,this.saveConfig();}});return n.append(o.root,r.root),Ce({title:"Auto-Favorite",padding:"lg"},n,w("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=w("div",{className:"u-col"}),o=w("div",{className:"mut-row"});o.appendChild(this.createMutationButton(_e[0])),o.appendChild(this.createMutationButton(_e[1])),n.appendChild(o);const r=w("div",{className:"mut-row"});r.appendChild(this.createMutationButton(_e[2])),r.appendChild(this.createMutationButton(_e[3])),r.appendChild(this.createMutationButton(_e[4])),n.appendChild(r);const i=w("div",{className:"mut-row"});i.appendChild(this.createMutationButton(_e[5])),i.appendChild(this.createMutationButton(_e[6])),n.appendChild(i);const a=w("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(_e[7])),a.appendChild(this.createMutationButton(_e[8])),n.appendChild(a),Ce({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,w("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${_e.length} active`))}createMutationButton(n){let o=this.config.favoriteMutations.includes(n.id);const r=n.color,i=parseInt(r.slice(1,3),16),a=parseInt(r.slice(3,5),16),s=parseInt(r.slice(5,7),16),c=f=>{let g=`rgba(${i}, ${a}, ${s}, 0.25)`,m=r;return n.id==="Rainbow"&&f&&(g="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",m="#fff9c4"),`
                padding: 8px 12px;
                min-height: 52px;
                border-radius: var(--card-radius, 12px);
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background: ${f?g:"color-mix(in oklab, var(--bg) 12%, transparent)"};
                border: 2px solid ${f?m:"color-mix(in oklab, var(--border) 40%, transparent)"};
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                box-shadow: ${f?n.id==="Rainbow"?"0 4px 18px rgba(255,255,255,0.25)":`0 4px 12px rgba(${i}, ${a}, ${s}, 0.3)`:"none"};
                opacity: ${f?"1":"0.8"};
                width: 100%;
            `},u=w("div",{className:"mut-btn",style:c(o)}),l=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(pe.ready()){const f=pe.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});f.style.width="28px",f.style.height="28px",f.style.objectFit="contain",l.appendChild(f);}}catch{}const d=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),p=w("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},d);if(u.append(l,p),n.id==="Rainbow"||n.id==="Gold"){const f=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(pe.ready()){const g=pe.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});g.style.width="28px",g.style.height="28px",g.style.objectFit="contain",f.appendChild(g);}}catch{}u.append(f);}else {const f=w("div",{style:"width: 28px; flex-shrink: 0;"});u.append(f);}return u.addEventListener("click",f=>{f.stopPropagation(),o?(this.config.favoriteMutations=this.config.favoriteMutations.filter(m=>m!==n.id),o=false):(this.config.favoriteMutations.push(n.id),o=true),u.style.cssText=c(o),this.saveConfig();const g=this.sectionElement?.querySelector(".card p");g&&(g.textContent=`${this.config.favoriteMutations.length} / ${_e.length} active`);}),u}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:this.config.favoriteProduceList,onUpdate:n=>{this.config.favoriteProduceList=n,this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:this.config.favoritePetsList,onUpdate:n=>{this.config.favoritePetsList=n,this.saveConfig();}})}createItemSelectionCard(n){const{title:o,items:r,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),u=r;const l=w("div",{style:"margin-bottom: 8px;"}),d=wi({placeholder:`Search ${o.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:x=>{const A=x.trim().toLowerCase();A?u=r.filter(P=>P.toLowerCase().includes(A)):u=r,v.setData(m());}});l.appendChild(d.root);const p=w("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Ft({label:"Select All",variant:"default",size:"sm",onClick:()=>{const x=m().map(A=>A.id);v.setSelection(x);}}),g=Ft({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{v.clearSelection();}});p.append(f,g);const m=()=>u.map(x=>({id:x,name:x,rarity:this.getItemRarity(x,i),selected:c.has(x)})),h=x=>{if(!x){const P=w("span",{style:"opacity:0.5;"});return P.textContent="—",P}return ki({variant:"rarity",rarity:x,size:"sm"}).root},y=x=>{const A=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(pe.ready()){let P=i,T=x;i==="plant"&&(["Bamboo","Cactus"].includes(x)&&(P="tallplant"),x==="DawnCelestial"&&(T="DawnCelestialCrop"),x==="MoonCelestial"&&(T="MoonCelestialCrop"),x==="OrangeTulip"&&(T="Tulip"));const _=pe.toCanvas(P,T,{scale:.5});_.style.width="28px",_.style.height="28px",_.style.objectFit="contain",A.appendChild(_);}}catch{}return A},v=xi({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(x,A)=>x.name.localeCompare(A.name,void 0,{numeric:true,sensitivity:"base"}),render:x=>{const A=w("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),P=y(x.id),T=w("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},x.name);return A.append(P,T),A}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(x,A)=>ct(x.rarity)-ct(A.rarity),render:x=>h(x.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:x=>x.id,onSelectionChange:x=>{c.clear(),x.forEach(A=>c.add(A)),s(Array.from(c)),C();}}),b=w("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),C=()=>{b.textContent=`${c.size} / ${r.length} selected`;};return C(),Ce({title:`${o} (${c.size}/${r.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,v.root,b)}getItemRarity(n,o){try{if(o==="pet")return (he.get("pets")||{})[n]?.rarity||null;if(o==="plant"){const r=he.get("plants")||{},i=r[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(r))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){Ra("gemini:features:autoFavorite:ui",this.config);try{const{setEnabled:n,updateSimpleConfig:o}=await En(async()=>{const{setEnabled:r,updateSimpleConfig:i}=await module.import('./index-DRx2IAAg-BLoAuIXd.js');return {setEnabled:r,updateSimpleConfig:i}},void 0);await o({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled);}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n);}}}const ai={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class km extends qt{constructor(){super({id:"tab-feature-settings",label:"Features"});ae(this,"config",ai);}async build(n){const o=this.createGrid("12px");o.id="feature-settings",n.appendChild(o),this.config=Oa("gemini:features:config",ai),o.appendChild(this.createQOLCard()),o.appendChild(this.createVisualIndicatorsCard()),o.appendChild(this.createTrackingCard());}createQOLCard(){return Ce({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}))}createVisualIndicatorsCard(){return Ce({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return Ce({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,o,r,i){const a=w("div",{className:i?"kv-col":"kv"}),s=w("div",{className:"kv"}),c=jn({text:n,tone:"default",size:"md"}),u=Ur({checked:o,onChange:r});if(s.append(c.root,u.root),i){a.appendChild(s);const l=w("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){Ra("gemini:features:config",this.config),console.log("[FeatureSettings] Config saved:",this.config);}}class Sm extends qt{constructor(){super({id:"tab-journal-checker",label:"Journal"});ae(this,"progress",null);}async build(n){this.container=n;const o=this.createGrid("12px");o.id="journal-checker",n.appendChild(o),await this.updateProgress();const r=(i=>{this.progress=i.detail,this.renderContent();});window.addEventListener("gemini:journal-updated",r),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",r);});}async updateProgress(){try{const{aggregateJournalProgress:n}=await En(async()=>{const{aggregateJournalProgress:o}=await module.import('./index-CSmM1k3l-DJVid1m8.js');return {aggregateJournalProgress:o}},void 0);this.progress=await n(),this.renderContent();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}renderContent(){if(!this.container)return;const n=this.container.querySelector("#journal-checker");if(n){if(n.innerHTML="",!this.progress){n.appendChild(this.createLoadingCard());return}n.appendChild(this.createSummaryCard()),n.appendChild(this.createCategoryCard("🌱 Produce",this.progress.plants)),n.appendChild(this.createCategoryCard("🐾 Pets",this.progress.pets,true)),n.appendChild(this.createActionsCard());}}createLoadingCard(){return Ce({title:"Loading...",padding:"lg"},w("p",{},"Fetching journal data..."))}createSummaryCard(){if(!this.progress)return w("div");const n=this.createProgressRow("🌱 Produce Species",this.progress.plants.logged,this.progress.plants.total,this.progress.plants.percentage),o=this.createProgressRow("   Variants Logged",this.progress.plants.variantsLogged,this.progress.plants.variantsTotal,this.progress.plants.variantsPercentage),r=this.createProgressRow("🐾 Pet Species",this.progress.pets.logged,this.progress.pets.total,this.progress.pets.percentage),i=this.createProgressRow("   Variants Logged",this.progress.pets.variantsLogged,this.progress.pets.variantsTotal,this.progress.pets.variantsPercentage),a=this.progress.pets.abilitiesTotal?this.createProgressRow("   Abilities Logged",this.progress.pets.abilitiesLogged??0,this.progress.pets.abilitiesTotal,this.progress.pets.abilitiesPercentage??0):null,s=[n,o,r,i];return a&&s.push(a),Ce({title:"Collection Progress",padding:"lg",expandable:true,defaultExpanded:true},...s)}createCategoryCard(n,o,r=false){const i=o.speciesDetails.filter(s=>!s.isComplete).sort((s,c)=>c.variantsPercentage-s.variantsPercentage).slice(0,5),a=w("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(i.length===0){const s=w("div",{style:"color: var(--accent); font-size: 13px; text-align: center; padding: 8px;"},"✅ All species complete!");a.appendChild(s);}else {for(const c of i)a.appendChild(this.createSpeciesRow(c,r));const s=o.speciesDetails.filter(c=>!c.isComplete).length-5;if(s>0){const c=w("div",{style:"font-size: 12px; color: var(--muted); text-align: center; padding-top: 4px;"},`...and ${s} more species`);a.appendChild(c);}}return Ce({title:n,padding:"lg",expandable:true,defaultExpanded:false},a)}createSpeciesRow(n,o=false){const r=w("div",{style:"display: flex; flex-direction: column; gap: 4px; padding: 6px 0; border-bottom: 1px solid var(--soft);"}),i=w("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),a=w("span",{style:"font-weight: 500; font-size: 13px;"},n.species),s=w("span",{style:`font-size: 12px; color: ${n.isComplete?"var(--accent)":"var(--muted)"}`},n.isComplete?"✅ Complete":`${Math.round(n.variantsPercentage)}%`);i.append(a,s);const c=n.variantsMissing.slice(0,4),u=c.length>0?`Missing: ${c.join(", ")}${n.variantsMissing.length>4?"...":""}`:"All variants logged",l=w("div",{style:"font-size: 11px; color: var(--muted);"},u);if(r.append(i,l),o&&n.abilitiesMissing&&n.abilitiesMissing.length>0){const p=`Abilities: ${n.abilitiesMissing.slice(0,3).join(", ")}${n.abilitiesMissing.length>3?"...":""}`,f=w("div",{style:"font-size: 11px; color: var(--muted);"},p);r.appendChild(f);}return r}createProgressRow(n,o,r,i){const a=w("div",{className:"kv-col",style:"gap: 6px;"}),s=w("div",{className:"kv"}),c=jn({text:n,tone:"default",size:"md"}),u=w("span",{style:"font-size: 13px; color: var(--item-desc, var(--muted));"},`${o}/${r}`);s.append(c.root,u);const l=w("div",{style:`
        width: 100%;
        height: 6px;
        background: var(--card-bg, var(--soft));
        border-radius: 3px;
        overflow: hidden;
      `}),d=w("div",{style:`
        width: ${Math.min(100,i)}%;
        height: 100%;
        background: linear-gradient(90deg, var(--tab-bg, var(--accent)), var(--group-title, var(--pill-to)));
        transition: width 0.3s ease;
      `});return l.appendChild(d),a.append(s,l),a}createActionsCard(){const n=Ft({label:"🔄 Refresh",variant:"default",size:"md",onClick:async()=>{await this.updateProgress();}}),o=Ft({label:"📋 Log Missing",variant:"default",size:"md",onClick:()=>{this.showMissingItems();}}),r=w("div",{style:"display: flex; gap: 8px; flex-wrap: wrap;"});return r.append(n,o),Ce({title:"Actions",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},r)}async showMissingItems(){if(this.progress)try{const{getMissingSummary:n}=await En(async()=>{const{getMissingSummary:r}=await module.import('./index-CSmM1k3l-DJVid1m8.js');return {getMissingSummary:r}},void 0),o=await n();if(o.plants.length===0&&o.pets.length===0){console.log("🎉 [JournalChecker] Collection complete!");return}if(console.group("📋 Missing Journal Entries"),o.plants.length>0){console.group(`🌱 Produce (${o.plants.length} species incomplete)`);for(const r of o.plants)console.log(`${r.species}: ${r.missing.join(", ")}`);console.groupEnd();}if(o.pets.length>0){console.group(`🐾 Pets (${o.pets.length} species incomplete)`);for(const r of o.pets){const i=[];r.missingVariants.length>0&&i.push(`Variants: ${r.missingVariants.join(", ")}`),r.missingAbilities.length>0&&i.push(`Abilities: ${r.missingAbilities.join(", ")}`),console.log(`${r.species}: ${i.join(" | ")}`);}console.groupEnd();}console.groupEnd();}catch(n){console.error("[JournalChecker] Failed to get missing summary:",n);}}}const Cm={Store:{select:de.select.bind(de),set:de.set.bind(de),subscribe:de.subscribe.bind(de),subscribeImmediate:de.subscribeImmediate.bind(de)},Globals:Va,Modules:{Version:Ei,Assets:vt,Manifest:He,Data:he,AntiAfk:oa,Environment:Ue,CustomModal:ba,Sprite:pe,Tile:Ke,Pixi:po,Audio:La,Cosmetic:_a,Achievements:dm,Calculators:cf,Pets:bm,Tracker:ym},WebSocket:{chat:mg,emote:hg,wish:bg,kickPlayer:yg,setPlayerData:vg,usurpHost:xg,reportSpeakingStart:wg,setSelectedGame:kg,voteForGame:Sg,requestGame:Cg,restartGame:Ag,ping:Tg,checkWeatherStatus:Mg,move:Pg,playerPosition:qa,teleport:Ig,moveInventoryItem:Eg,dropObject:Lg,pickupObject:_g,toggleFavoriteItem:Og,putItemInStorage:Rg,retrieveItemFromStorage:Ng,moveStorageItem:$g,logItems:Dg,plantSeed:jg,waterPlant:zg,harvestCrop:Fg,sellAllCrops:Gg,purchaseDecor:Bg,purchaseEgg:Wg,purchaseTool:Hg,purchaseSeed:Vg,plantEgg:Ug,hatchEgg:Kg,plantGardenPlant:qg,potPlant:Jg,mutationPotion:Yg,pickupDecor:Xg,placeDecor:Zg,removeGardenObject:Qg,placePet:em,feedPet:tm,petPositions:nm,swapPet:rm,storePet:om,namePet:im,sellPet:am},_internal:{getGlobals:ze,initGlobals:Ha,destroyGlobals:ag}};function Am(){const e=L;e.Gemini=Cm,e.MGSprite=pe,e.MGData=he,e.MGPixi=po,e.MGAssets=vt,e.MGEnvironment=Ue;}let gr=null;function Tm(){return gr||(gr=new _d),gr}function Pm(e){return [new cl(e),new km,new wm,new Sm]}async function Im(){await Tm().preload();}function Mm(e){const{shadow:t,initialOpen:n}=e,o=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=w("div",{className:"gemini-tabbar"}),i=w("div",{className:"gemini-content",id:"content"}),a=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");o.append(r,i,a);const c=w("div",{className:"gemini-wrapper"},o);return t.append(c),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:c}}function Em(e){const{resizer:t,host:n,shadow:o,onWidthChange:r,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,u=s;function l(){const b=Ue.detect(),C=Math.round(L.visualViewport?.width??L.innerWidth??0);if(b.platform==="mobile"||b.os==="ios"||b.os==="android"){const x=getComputedStyle(o.host),A=parseFloat(x.getPropertyValue("--inset-l"))||0,P=parseFloat(x.getPropertyValue("--inset-r"))||0,T=Math.max(280,C-Math.round(A+P));c=280,u=T;}else c=a,u=s;return {min:c,max:u}}function d(b){return Math.max(c,Math.min(u,Number(b)||i))}function p(b){const C=d(b);n.style.setProperty("--w",`${C}px`),r(C);}l();const f=Ue.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const h=b=>{if(!m)return;b.preventDefault();const C=Math.round(L.innerWidth-b.clientX);p(C);},y=()=>{m&&(m=false,document.body.style.cursor="",L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",y));},S=b=>{g&&(b.preventDefault(),m=true,document.body.style.cursor="ew-resize",L.addEventListener("mousemove",h),L.addEventListener("mouseup",y));};t.addEventListener("mousedown",S);function v(){t.removeEventListener("mousedown",S),L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",y);}return {calculateResponsiveBounds:l,constrainWidthToLimits:d,setHudWidth:p,destroy:v}}function Lm(e){const{panel:t,onToggle:n,onClose:o,toggleCombo:r=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const u=t.classList.contains("open");if(i&&c.key==="Escape"&&u){o();return}r(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const _m=`
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
    width: var(--w);
    max-width: 100vw;
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
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
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
`,Om=`
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
`,Rm=`
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
`;function Nm(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o);}const $m=`
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

  /* —— Sous-structure —— */
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
    margin:-6px -8px 0;
  }

  .card-header--expandable{
    cursor:pointer;
    user-select:none;
    border-radius:12px;
    padding:6px 8px;
    margin:-6px -8px 8px;
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
  
`,Dm=`
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
`,jm=`
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
`,zm=`
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
`,Fm=`
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

/* “Stacked” variant (forces title no-wrap) */
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
`,Gm=`
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
`,Bm=`
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
`,Wm=`
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
`,Hm=`
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
`,Vm=`
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
  justify-content: var(--col-justify, flex-start);
  text-align: center; /* Fallback for text-only cells */
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
  overflow-x:auto;
  scrollbar-gutter:stable;
  min-height:0; /* key so scrolling does not jump */
}
.lg-tbody::-webkit-scrollbar {
  width: 10px;
}
.lg-tbody::-webkit-scrollbar-track {
  background: transparent;
}
.lg-tbody::-webkit-scrollbar-thumb {
  background: var(--muted);
  border-radius: 8px;
}
.lg-tbody::-webkit-scrollbar-thumb:hover {
  background: color-mix(in oklab, var(--muted) 150%, transparent);
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
`,Um=`
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
`,Km=`
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
`,qm=`
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
`,Jm=`
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
`,Ym=`
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
`,Xm=`
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
    content: '▾';
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
`,Zm=`
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
`,Qm={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function eh(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,Qm),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function th(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function nh(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:u,initialTab:l,onTabChange:d,toggleCombo:p=I=>I.ctrlKey&&I.shiftKey&&I.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:h,shadow:y}=eh(t),S=[[sm,"variables"],[Om,"primitives"],[Rm,"utilities"],[_m,"hud"],[$m,"card"],[Dm,"badge"],[jm,"button"],[zm,"input"],[Fm,"label"],[Gm,"navTabs"],[Bm,"searchBar"],[Wm,"select"],[Hm,"switch"],[Vm,"table"],[Um,"timeRangePicker"],[Km,"tooltip"],[qm,"slider"],[Jm,"reorderableList"],[Ym,"colorPicker"],[Xm,"log"],[Zm,"settings"]];for(let I=0;I<S.length;I++){const[N,R]=S[I];Nm(y,N,R),I%5===4&&await th();}const{panel:v,tabbar:b,content:C,resizer:x,closeButton:A,wrapper:P}=Mm({shadow:y,initialOpen:o});function T(I){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:I},bubbles:true})),i?.(I);}function _(I){const N=v.classList.contains("open");v.classList.toggle("open",I),v.setAttribute("aria-hidden",I?"false":"true"),I!==N&&T(I);}_(o),A.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),_(false);});const E=rl({host:h,themes:a,initialTheme:s,onThemeChange:c}),D=Em({resizer:x,host:h,shadow:y,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});D.setHudWidth(n);const ee=u({applyTheme:E.applyTheme,initialTheme:s,getCurrentTheme:E.getCurrentTheme,setHUDWidth:D.setHudWidth,setHUDOpen:_}),z=new bs(ee,C,{applyTheme:E.applyTheme,getCurrentTheme:E.getCurrentTheme}),Y=ee.map(I=>({id:I.id,label:I.label})),ie=hs(Y,l||Y[0]?.id||"",I=>{z.activate(I),d?.(I);});ie.root.style.flex="1 1 auto",ie.root.style.minWidth="0",b.append(ie.root,A),z.activate(l||Y[0]?.id||"");const W=Lm({panel:v,onToggle:()=>_(!v.classList.contains("open")),onClose:()=>_(false),toggleCombo:p,closeOnEscape:f}),j=()=>{ie.recalc();const I=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;D.calculateResponsiveBounds(),D.setHudWidth(I);};L.addEventListener("resize",j);const $=I=>{const N=I.detail?.width;N?D.setHudWidth(N):D.setHudWidth(n),ie.recalc();};h.addEventListener("gemini:layout-resize",$);function O(){W.destroy(),D.destroy(),L.removeEventListener("resize",j),h.removeEventListener("gemini:layout-resize",$);}return {host:h,shadow:y,wrapper:P,panel:v,content:C,setOpen:_,setWidth:D.setHudWidth,sections:ee,manager:z,nav:ie,destroy:O}}const Ot={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},xn={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function rh(){return {isOpen:Pt(Ot.isOpen,xn.isOpen),width:Pt(Ot.width,xn.width),theme:Pt(Ot.theme,xn.theme),activeTab:Pt(Ot.activeTab,xn.activeTab)}}function wn(e,t){ui(Ot[e],t);}const oh="https://i.imgur.com/IMkhMur.png",ih="Stats";function ah(e){let t=e.iconUrl||oh;const n=e.ariaLabel||"Open MGH";let o=null,r=null,i=null,a=false,s=null,c=null;const u=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function d(){const v=document.querySelector(u.map(C=>`button[aria-label="${l(C)}"]`).join(","));if(!v)return null;let b=v.parentElement;for(;b&&b!==document.body;){if(u.reduce((x,A)=>x+b.querySelectorAll(`button[aria-label="${l(A)}"]`).length,0)>=2)return b;b=b.parentElement;}return null}function f(v){const b=Array.from(v.querySelectorAll("button[aria-label]"));if(!b.length)return {refBtn:null,refWrapper:null};const C=b.filter(D=>D.dataset.mghBtn!=="true"&&(D.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),x=C.length?C:b,A=x.find(D=>(D.getAttribute("aria-label")||"").toLowerCase()===ih.toLowerCase())||null,P=x.length>=2?x.length-2:x.length-1,T=A||x[P],_=T.parentElement,E=_&&_.parentElement===v&&_.tagName==="DIV"?_:null;return {refBtn:T,refWrapper:E}}function g(v,b,C){const x=v.cloneNode(false);x.type="button",x.setAttribute("aria-label",b),x.title=b,x.dataset.mghBtn="true",x.style.pointerEvents="auto",x.removeAttribute("id");const A=document.createElement("img");return A.src=C,A.alt="MGH",A.style.pointerEvents="none",A.style.userSelect="none",A.style.width="76%",A.style.height="76%",A.style.objectFit="contain",A.style.display="block",A.style.margin="auto",x.appendChild(A),x.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation();try{e.onClick?.();}catch{}}),x}function m(){if(a)return  false;a=true;let v=false;try{const b=d();if(!b)return !1;s!==b&&(s=b);const{refBtn:C,refWrapper:x}=f(b);if(!C)return !1;r=b.querySelector('div[data-mgh-wrapper="true"]'),!r&&x&&(r=x.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),v=!0);const A=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=A),o||(o=g(C,n,t),r?r.appendChild(o):o.parentElement!==b&&b.appendChild(o),v=!0),r&&r.parentElement!==b&&(b.appendChild(r),v=!0);const P=b;if(P&&P!==c){try{S.disconnect();}catch{}c=P,S.observe(c,{childList:!0,subtree:!0});}return v}finally{a=false;}}const h=document.getElementById("App")||document.body;let y=null;const S=new MutationObserver(v=>{const b=v.every(x=>{const A=Array.from(x.addedNodes||[]),P=Array.from(x.removedNodes||[]),T=A.concat(P);if(T.length===0){const _=x.target;return r&&(_===r||r.contains(_))||o&&(_===o||o.contains(_))}return T.every(_=>!!(!(_ instanceof HTMLElement)||r&&(_===r||r.contains(_))||o&&(_===o||o.contains(_))))}),C=v.some(x=>Array.from(x.removedNodes||[]).some(A=>A instanceof HTMLElement?!!(r&&(A===r||r.contains(A))||o&&(A===o||o.contains(A))):false));b&&!C||y===null&&(y=window.setTimeout(()=>{if(y=null,m()&&r){const A=r.parentElement;A&&A.lastElementChild!==r&&A.appendChild(r);}},150));});return m(),S.observe(h,{childList:true,subtree:true}),i=()=>S.disconnect(),()=>{try{i?.();}catch{}try{r?.remove();}catch{}}}const ts=[];function sh(){return ts.slice()}function lh(e){ts.push(e);}function ns(e){try{return JSON.parse(e)}catch{return}}function si(e){if(typeof e=="string"){const t=ns(e);return t!==void 0?t:e}return e}function rs(e){if(e!=null){if(typeof e=="string"){const t=ns(e);return t!==void 0?rs(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function ch(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function U(e,t,n){const o=typeof t=="boolean"?t:true,r=typeof t=="function"?t:n,i=(a,s)=>{if(rs(a)!==e)return;const u=r(a,s);return u&&typeof u=="object"&&"kind"in u?u:typeof u=="boolean"?u?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return lh(i),i}const Tt=new WeakSet,li=new WeakMap;function dh(e){const t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:sh();if(!o.length)return ()=>{};const r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const m of o){const h=m(g,r(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(g=h.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,c=null;const u=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Tt.has(f))return  true;const g=f.bind(p);function m(...h){const y=h.length===1?h[0]:h,S=si(y),v=i(S,ch(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){const b=v.message;return h.length>1&&Array.isArray(b)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",b),g(...b)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",b),g(b))}return g(...h)}Tt.add(m),li.set(m,f);try{p.sendMessage=m,Tt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Tt.has(f))return;function g(m){const h=si(m),y=i(h,this);if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(y?.kind==="replace"){const S=y.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",S),f.call(this,v)}return f.call(this,m)}Tt.add(g),li.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const d=e.waitForRoomConnectionMs??4e3;if(!u()&&d>0){const p=Date.now();c=setInterval(()=>{if(u()){clearInterval(c),c=null;return}Date.now()-p>d&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=module.meta,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const os=[];function uh(){return os.slice()}function ci(e){os.push(e);}function ph(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function fh(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const mr=Symbol.for("ariesmod.ws.handlers.patched");function be(e,t){if(typeof e=="string"){const r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return ci(i),i}const n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return ci(o),o}function gh(e,t=uh(),n={}){const o=n.pageWindow??window,r=!!n.debug;if(e[mr])return ()=>{};e[mr]=true;const i={ws:e,pageWindow:o,debug:r},a=d=>{for(const p of t)try{if(!p.match(d))continue;if(p.handle(d,i)===!0)return}catch(f){r&&console.error("[WS] handler error",f,d);}},s=d=>{const p=fh(d.data),f=ph(p);a({kind:"message",raw:d.data,data:p,type:f});},c=d=>{a({kind:"close",code:d.code,reason:d.reason,wasClean:d.wasClean,event:d});},u=d=>a({kind:"open",event:d}),l=d=>a({kind:"error",event:d});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",u),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",u);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[mr];}catch{}}}(function(){try{const t=module.meta,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();be(Ne.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});be(Ne.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});be(Ne.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});be(Ne.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});be(Ne.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});be(Ne.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});be(Ne.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});be(Ne.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});be(Ne.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});be(Ne.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});be(Be.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});be(Be.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});be(Be.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});be(Be.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});be(Be.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});be(Be.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});be(Be.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});be(Be.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});U(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));U(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));U(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));U(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));U(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));U(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));U(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));U(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));U(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));U(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));U(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));U(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));U(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));U(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));U(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));U(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));U(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));U(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));U(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));U(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));U(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));U(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));U(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));U(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));U(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));U(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));U(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));U(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));U(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));U(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));U(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");U(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));U(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));U(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));U(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));U(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));U(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));U(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));U(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));U(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));U(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));U(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));U(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));U(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));U(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));U(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));U(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function mh(e={}){const t=e.pageWindow??L,n=e.pollMs??500,o=!!e.debug,r=[];r.push(dg(t,{debug:o})),r.push(dh({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=gh(s,e.handlers,{debug:o,pageWindow:t}));};return a(Dn(t).ws),r.push(Ka(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>Dn(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let kn=null;function hh(e={}){return kn||(kn=mh(e),kn)}function bh(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Ka(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),hh({debug:false}),()=>{t?.(),t=null;}}async function yh(e){e.logStep("Atoms","Prewarming Jotai store...");try{await eu(),await Yd({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function vh(e){e.logStep("Globals","Initializing global variables...");try{Ha(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function xh(e){e.logStep("API","Exposing Gemini API...");try{Am(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function hr(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function wh(e){e.logStep("HUD","Loading HUD preferences..."),await hr();const t=rh();await hr();const n=await nh({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>wn("width",o),onOpenChange:o=>wn("isOpen",o),themes:Nt,initialTheme:t.theme,onThemeChange:o=>wn("theme",o),buildSections:o=>Pm({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>wn("activeTab",o)});return await hr(),e.logStep("HUD","HUD ready","success"),n}async function kh(e){e.setSubtitle("Activating Gemini modules..."),await vm(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error");});}async function Sh(e){e.logStep("Sprites","Warming up sprite cache...");try{pe.ready()||await pe.init();const t=[],n=he.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const o=he.get("pets");if(o)for(const a of Object.values(o))a?.spriteId&&t.push(a.spriteId);const r=[...new Set(t)],i=r.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await pe.warmup(r,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function Ch(e){e.logStep("Sections","Preloading UI sections...");try{await Im(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}(async function(){const e=ms({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=bh(e),await yh(e),vh(e),xh(e),await kh(e),await Sh(e),await Ch(e),e.succeed("Gemini is ready!");}catch(o){e.fail("Failed to initialize the mod.",o);}finally{t?.();}const n=await wh(e);ah({onClick:()=>n.setOpen(true)});})();

    })
  };
}));

System.register("./index-DRx2IAAg-BLoAuIXd.js", ['./__monkey.entry-CmM9JT29.js'], (function (exports, module) {
	'use strict';
	var Oa, Pf, Ra, Og;
	return {
		setters: [module => {
			Oa = module.O;
			Pf = module.P;
			Ra = module.R;
			Og = module.a;
		}],
		execute: (function () {

			exports({
				loadConfig: s,
				saveConfig: u,
				setEnabled: A,
				shouldFavorite: S,
				start: F,
				stop: m,
				updateConfig: v,
				updateSimpleConfig: I
			});

			const a="gemini:features:autoFavorite",g={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}}; exports({ STORAGE_KEY: a, DEFAULT_CONFIG: g });function s(){return Oa(a,g)}function u(e){Ra(a,e);}function v(e){const o={...s(),...e};return u(o),o}function I(e){const t=s();return t.mode="simple",t.simple={...t.simple,...e},u(t),t}let r=null;const n=new Set;function F(){const e=s();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}n.clear(),r=Pf().subscribeItems(t=>{if(t.added.length>0){const o=s();for(const i of t.added)b(i,o);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function m(){r&&(r(),r=null),n.clear(),console.log("🛑 [AutoFavorite] Stopped");}function A(e){const t=s();t.enabled=e,t.simple.enabled=e,v(t),e?F():m();}function b(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(n.has(e.id)||e.isFavorited||e.favorited)&&S(e,t.simple)){n.add(e.id);try{Og(e.id,!0),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(i){console.error("[AutoFavorite] WebSocket error:",i),n.delete(e.id);}}}function S(e,t){if(!t.enabled)return  false;const o=e.itemType==="Pet"?e.petSpecies:e.species;return o?!!(t.favoriteSpecies.includes(o)||t.favoriteMutations.length>0&&(e.mutations||[]).some(c=>t.favoriteMutations.includes(c))):false}

		})
	};
}));

System.register("./index-CSmM1k3l-DJVid1m8.js", ['./__monkey.entry-CmM9JT29.js'], (function (exports, module) {
	'use strict';
	var he, _f;
	return {
		setters: [module => {
			he = module.h;
			_f = module._;
		}],
		execute: (function () {

			exports({
				aggregateJournalProgress: k,
				calculatePetProgress: J,
				calculateProduceProgress: O,
				getCropVariants: D,
				getMissingSummary: C,
				getMyJournal: L,
				getPetAbilities: j,
				getPetVariants: T
			});

			let y=null,M=null;function L(){try{return _f().get().myPlayer?.journal||null}catch{return null}}function V(n){return n?`pro:${Object.keys(n.produce).length}-pet:${Object.keys(n.pets).length}`:"null"}function D(){const n=he.get("mutations")??{};return ["Normal",...Object.keys(n),"Max Weight"]}function T(){const n=he.get("mutations")??{};return ["Normal",...Object.entries(n).filter(([t,s])=>!("tileRef"in s)).map(([t])=>t),"Max Weight"]}function j(n){const t=(he.get("pets")??{})[n];if(!t)return [];const s=new Set;return Array.isArray(t.abilities)&&t.abilities.forEach(a=>s.add(a)),Array.isArray(t.possibleAbilities)&&t.possibleAbilities.forEach(a=>s.add(a)),t.abilityTiers&&Object.values(t.abilityTiers).forEach(a=>{Array.isArray(a)&&a.forEach(l=>s.add(l));}),[...s]}function O(n){const e=he.get("plants")??{},t=Object.keys(e),s=D(),a=n?.produce??{},l=[];let c=0;for(const r of t){const i=a[r]?.variantsLogged?.map(o=>o.variant)??[],f=s.filter(o=>!i.includes(o));c+=i.length,l.push({species:r,variantsLogged:i,variantsMissing:f,variantsTotal:s.length,variantsPercentage:s.length>0?i.length/s.length*100:0,isComplete:f.length===0});}const g=t.length*s.length,h=l.filter(r=>r.variantsLogged.length>0).length;return {total:t.length,logged:h,percentage:t.length>0?h/t.length*100:0,speciesDetails:l,variantsTotal:g,variantsLogged:c,variantsPercentage:g>0?c/g*100:0}}function J(n){const e=he.get("pets")??{},t=Object.keys(e),s=T(),a=n?.pets??{},l=[];let c=0,g=0,h=0,r=0;for(const i of t){const f=a[i],o=f?.variantsLogged?.map(u=>u.variant)??[],b=f?.abilitiesLogged?.map(u=>u.ability)??[],v=s.filter(u=>!o.includes(u)),p=j(i),P=p.filter(u=>!b.includes(u));g+=s.length,c+=o.length,r+=p.length,h+=Math.min(b.length,p.length),l.push({species:i,variantsLogged:o,variantsMissing:v,variantsTotal:s.length,variantsPercentage:s.length>0?o.length/s.length*100:0,abilitiesLogged:b,abilitiesMissing:P,abilitiesTotal:p.length,abilitiesPercentage:p.length>0?b.length/p.length*100:0,isComplete:v.length===0&&(p.length===0||P.length===0)});}const m=l.filter(i=>i.variantsLogged.length>0).length;return {total:t.length,logged:m,percentage:t.length>0?m/t.length*100:0,speciesDetails:l,variantsTotal:g,variantsLogged:c,variantsPercentage:g>0?c/g*100:0,abilitiesTotal:r,abilitiesLogged:h,abilitiesPercentage:r>0?h/r*100:0}}async function k(n=false){await he.waitForAnyData();const e=L(),t=V(e);if(!n&&y&&t===M)return y;const s={plants:O(e),pets:J(e),lastUpdated:Date.now()};return y=s,M=t,s}async function C(){const n=await k();return {plants:n.plants.speciesDetails.filter(e=>e.variantsMissing.length>0).map(e=>({species:e.species,missing:e.variantsMissing})),pets:n.pets.speciesDetails.filter(e=>e.variantsMissing.length>0||(e.abilitiesMissing?.length??0)>0).map(e=>({species:e.species,missingVariants:e.variantsMissing,missingAbilities:e.abilitiesMissing??[]}))}}

		})
	};
}));

System.import("./__entry.js", "./");