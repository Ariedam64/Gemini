// ==UserScript==
// @name         Gemini
// @namespace    Gemini
// @version      1.0.0
// @author
// @match        https://1227719606223765687.discordsays.com/*
// @match        https://magiccircle.gg/r/*
// @match        https://magicgarden.gg/r/*
// @match        https://starweaver.org/r/*
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

(function () {
  'use strict';

  var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
  var wc=Object.defineProperty;var kc=(e,t,n)=>t in e?wc(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var ee=(e,t,n)=>kc(e,typeof t!="symbol"?t+"":t,n);function y(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const Pn="https://i.imgur.com/k5WuC32.png",Ni="gemini-loader-style",pt="gemini-loader",Ua=80;function Sc(){if(document.getElementById(Ni))return;const e=document.createElement("style");e.id=Ni,e.textContent=`
    /* ===== Loader Variables ===== */
    #${pt} {
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
    #${pt} {
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

    #${pt}.gemini-loader--error .gemini-loader__actions {
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
    #${pt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${pt}.gemini-loader--error .gemini-loader__spinner {
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
      #${pt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e);}function En(e,t,n){const r=y("div",{className:`gemini-loader__log ${n}`},y("div",{className:"gemini-loader__dot"}),y("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Ua;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Cc(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Pn);return}GM_xmlhttpRequest({method:"GET",url:Pn,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(Pn),r.readAsDataURL(n);},onerror:()=>e(Pn)});})}function Ac(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Sc();const n=y("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=y("div",{className:"gemini-loader__logs"}),o=y("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=y("div",{className:"gemini-loader__spinner"},o);Cc().then(h=>{o.src=h;});const a=y("div",{className:"gemini-loader__card"},y("div",{className:"gemini-loader__header"},i,y("div",{className:"gemini-loader__titles"},y("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=y("div",{id:pt},a);(document.body||document.documentElement).appendChild(s);const c=y("div",{className:"gemini-loader__actions"},y("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const d=h=>{n.textContent=h;},l=new Map,u=(h,b)=>{h.className=`gemini-loader__log ${b}`;};return {log:(h,b="info")=>En(r,h,b),logStep:(h,b,w="info")=>{const x=String(h||"").trim();if(!x){En(r,b,w);return}const v=l.get(x);if(v){v.el.lastElementChild&&(v.el.lastElementChild.textContent=b),v.tone!==w&&(u(v.el,w),v.tone=w);return}const C=y("div",{className:`gemini-loader__log ${w}`},y("div",{className:"gemini-loader__dot"}),y("div",{textContent:b}));for(l.set(x,{el:C,tone:w}),r.appendChild(C);r.childElementCount>Ua;){const k=r.firstElementChild;if(!k)break;const A=Array.from(l.entries()).find(([,I])=>I.el===k)?.[0];A&&l.delete(A),k.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(h,b=600)=>{h&&En(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b);},fail:(h,b)=>{En(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,b);}}}function Tc(e,t,n){const r=y("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{const u=y("button",{className:"lg-tab"},l.label);return u.setAttribute("data-target",l.id),u}),i=y("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=i;i.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),i.scrollLeft+=l.deltaY);},{passive:false});function s(l){const u=i.getBoundingClientRect(),p=o.find(C=>C.dataset.target===l)||o[0];if(!p)return;const f=p.getBoundingClientRect(),g=f.left-u.left,m=f.width;r.style.width=`${m}px`,r.style.transform=`translateX(${g}px)`;const h=i.scrollLeft,b=h,w=h+i.clientWidth,x=g-12,v=g+m+12;x<b?i.scrollTo({left:x,behavior:"smooth"}):v>w&&i.scrollTo({left:v-i.clientWidth,behavior:"smooth"});}let c=t||(e[0]?.id??"");function d(l){c=l,o.forEach(u=>u.classList.toggle("active",u.dataset.target===l)),s(l),n(l);}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(c)),{root:a,activate:d,recalc:()=>s(c),getActive:()=>c}}class $t{constructor(t){ee(this,"id");ee(this,"label");ee(this,"container",null);ee(this,"cleanupFunctions",[]);ee(this,"preloadedContent",null);ee(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=y("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return y("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=y("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Ic{constructor(t,n,r){ee(this,"sections");ee(this,"activeId",null);ee(this,"container");ee(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const It="gemini:",We={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config"};function Te(e,t){try{const n=e.startsWith(It)?e:It+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Pe(e,t){try{const n=e.startsWith(It)?e:It+e,r=e.startsWith(It)?e.slice(It.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Pc(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),s=o.slice(e.length);Pe(s,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Pe("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Va="gemini.sections";function Ka(){const e=Te(Va,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Ec(e){Pe(Va,e);}async function Mc(e){return Ka()[e]}function _c(e,t){const n=Ka();Ec({...n,[e]:t});}function Fi(e,t){return {...e,...t??{}}}async function Lc(e){const t=await Mc(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){_c(e.path,n);}function i(){return n}function a(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function c(){o();}return {get:i,set:a,update:s,save:c}}async function qo(e,t){const{path:n=e,...r}=t;return Lc({path:n,...r})}let Oc=0;const Mn=new Map;function Ne(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:f,actions:g,footer:m,divider:h=false,tone:b="neutral",stateKey:w}=e,x=y("div",{className:"card",id:n,tabIndex:a?0:void 0});x.classList.add(`card--${o}`,`card--p-${i}`),a&&x.classList.add("card--interactive"),b!=="neutral"&&x.classList.add(`card--tone-${b}`),r&&x.classList.add(...r.split(" ").filter(Boolean)),s&&x.classList.add("card--expandable");const v=s?w??n??(typeof u=="string"?`title:${u}`:null):null;let C=!s||c;v&&Mn.has(v)&&(C=!!Mn.get(v));let k=null,A=null,I=null,T=null,L=null;const _=n?`${n}-collapse`:`card-collapse-${++Oc}`,F=()=>{if(T!==null&&(cancelAnimationFrame(T),T=null),L){const $=L;L=null,$();}},Z=($,N)=>{if(!I)return;F();const R=I;if(R.setAttribute("aria-hidden",String(!$)),!N){R.classList.remove("card-collapse--animating"),R.style.display=$?"":"none",R.style.height="",R.style.opacity="";return}if(R.classList.add("card-collapse--animating"),R.style.display="",$){R.style.height="auto";const G=R.scrollHeight;if(!G){R.classList.remove("card-collapse--animating"),R.style.display="",R.style.height="",R.style.opacity="";return}R.style.height="0px",R.style.opacity="0",R.offsetHeight,T=requestAnimationFrame(()=>{T=null,R.style.height=`${G}px`,R.style.opacity="1";});}else {const G=R.scrollHeight;if(!G){R.classList.remove("card-collapse--animating"),R.style.display="none",R.style.height="",R.style.opacity="";return}R.style.height=`${G}px`,R.style.opacity="1",R.offsetHeight,T=requestAnimationFrame(()=>{T=null,R.style.height="0px",R.style.opacity="0";});}const j=()=>{R.classList.remove("card-collapse--animating"),R.style.height="",$||(R.style.display="none"),R.style.opacity="";};let P=null;const O=G=>{G.target===R&&(P!==null&&(clearTimeout(P),P=null),R.removeEventListener("transitionend",O),R.removeEventListener("transitioncancel",O),L=null,j());};L=()=>{P!==null&&(clearTimeout(P),P=null),R.removeEventListener("transitionend",O),R.removeEventListener("transitioncancel",O),L=null,j();},R.addEventListener("transitionend",O),R.addEventListener("transitioncancel",O),P=window.setTimeout(()=>{L?.();},420);};function D($){const N=document.createElementNS("http://www.w3.org/2000/svg","svg");return N.setAttribute("viewBox","0 0 24 24"),N.setAttribute("width","16"),N.setAttribute("height","16"),N.innerHTML=$==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',N}function Y($,N=true,R=true){C=$,x.classList.toggle("card--collapsed",!C),x.classList.toggle("card--expanded",C),k&&(k.dataset.expanded=String(C),k.setAttribute("aria-expanded",String(C))),A&&(A.setAttribute("aria-expanded",String(C)),A.classList.toggle("card-toggle--collapsed",!C),A.setAttribute("aria-label",C?"Replier le contenu":"Deplier le contenu"),A.replaceChildren(D(C?"up":"down"))),s?Z(C,R):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),N&&d&&d(C),v&&Mn.set(v,C);}if(l){const $=y("div",{className:"card-media"});$.append(l),x.appendChild($);}const ue=!!(u||p||f||g&&g.length||s);if(ue){k=y("div",{className:"card-header"});const $=y("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const j=y("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},u);f&&j.append(typeof f=="string"?y("span",{className:"badge"},f):f),$.appendChild(j);}if(p){const j=y("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);$.appendChild(j);}($.childNodes.length||s)&&k.appendChild($);const N=y("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),R=y("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(j=>R.appendChild(j)),R.childNodes.length&&N.appendChild(R),s&&(A=y("button",{className:"card-toggle",type:"button",ariaExpanded:String(C),ariaControls:_,ariaLabel:C?"Replier le contenu":"Deplier le contenu"}),A.textContent=C?"▲":"▼",A.addEventListener("click",j=>{j.preventDefault(),j.stopPropagation(),Y(!C);}),N.appendChild(A),k.classList.add("card-header--expandable"),k.addEventListener("click",j=>{const P=j.target;P?.closest(".card-actions")||P?.closest(".card-toggle")||Y(!C);})),N.childNodes.length&&k.appendChild(N),x.appendChild(k);}I=y("div",{className:"card-collapse",id:_,ariaHidden:s?String(!C):"false"}),x.appendChild(I),h&&ue&&I.appendChild(y("div",{className:"card-divider"}));const B=y("div",{className:"card-body"});if(B.append(...t),I.appendChild(B),m){h&&I.appendChild(y("div",{className:"card-divider"}));const $=y("div",{className:"card-footer"});$.append(m),I.appendChild($);}return A&&A.setAttribute("aria-controls",_),Y(C,false,false),v&&Mn.set(v,C),x}let cr=false;const dr=new Set,Le=e=>{const t=document.activeElement;for(const n of dr)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Rc(){cr||(cr=true,window.addEventListener("keydown",Le,true),window.addEventListener("keypress",Le,true),window.addEventListener("keyup",Le,true),document.addEventListener("keydown",Le,true),document.addEventListener("keypress",Le,true),document.addEventListener("keyup",Le,true));}function jc(){cr&&(dr.size>0||(cr=false,window.removeEventListener("keydown",Le,true),window.removeEventListener("keypress",Le,true),window.removeEventListener("keyup",Le,true),document.removeEventListener("keydown",Le,true),document.removeEventListener("keypress",Le,true),document.removeEventListener("keyup",Le,true)));}function Nc(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:d}=e,l=y("div",{className:"select",id:t}),u=y("button",{className:"select-trigger",type:"button"}),p=y("span",{className:"select-value"},o),f=y("span",{className:"select-caret"},"▾");u.append(p,f);const g=y("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let m=false,h=n,b=null,w=!!a;function x(j){return j==null?o:(e.options||r).find(O=>O.value===j)?.label??o}function v(j){p.textContent=x(j),g.querySelectorAll(".select-option").forEach(P=>{const O=P.dataset.value,G=j!=null&&O===j;P.classList.toggle("selected",G),P.setAttribute("aria-selected",String(G));});}function C(j){g.replaceChildren(),j.forEach(P=>{const O=y("button",{className:"select-option"+(P.disabled?" disabled":""),type:"button",role:"option","data-value":P.value,"aria-selected":String(P.value===h),tabindex:"-1"},P.label);P.value===h&&O.classList.add("selected"),P.disabled||O.addEventListener("pointerdown",G=>{G.preventDefault(),G.stopPropagation(),_(P.value,{notify:true}),T();},{capture:true}),g.appendChild(O);});}function k(){u.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function A(){const j=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${j.width}px`});}function I(){m||w||(m=true,l.classList.add("open"),k(),A(),document.addEventListener("mousedown",ue,true),document.addEventListener("scroll",B,true),window.addEventListener("resize",$),g.focus({preventScroll:true}),s&&(Rc(),dr.add(l),b=()=>{dr.delete(l),jc();}),d?.(true));}function T(){m&&(m=false,l.classList.remove("open"),k(),document.removeEventListener("mousedown",ue,true),document.removeEventListener("scroll",B,true),window.removeEventListener("resize",$),u.focus({preventScroll:true}),b?.(),b=null,d?.(false));}function L(){m?T():I();}function _(j,P={}){const O=h;h=j,v(h),P.notify!==false&&O!==j&&c?.(j);}function F(){return h}function Z(j){const P=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!P.length)return;const O=P.findIndex(ge=>ge.classList.contains("active")),G=P[(O+(j===1?1:P.length-1))%P.length];P.forEach(ge=>ge.classList.remove("active")),G.classList.add("active"),G.focus({preventScroll:true}),G.scrollIntoView({block:"nearest"});}function D(j){(j.key===" "||j.key==="Enter"||j.key==="ArrowDown")&&(j.preventDefault(),I());}function Y(j){if(j.key==="Escape"){j.preventDefault(),T();return}if(j.key==="Enter"||j.key===" "){const P=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");P&&!P.classList.contains("disabled")&&(j.preventDefault(),_(P.dataset.value,{notify:true}),T());return}if(j.key==="ArrowDown"){j.preventDefault(),Z(1);return}if(j.key==="ArrowUp"){j.preventDefault(),Z(-1);return}}function ue(j){l.contains(j.target)||T();}function B(){m&&A();}function $(){m&&A();}function N(j){w=!!j,u.disabled=w,l.classList.toggle("disabled",w),w&&T();}function R(j){e.options=j,C(j),j.some(P=>P.value===h)||(h=null,v(null));}return l.append(u,g),u.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),L();},{capture:true}),u.addEventListener("keydown",D),g.addEventListener("keydown",Y),C(r),n!=null?(h=n,v(h)):v(null),k(),N(w),{root:l,open:I,close:T,toggle:L,getValue:F,setValue:_,setOptions:R,setDisabled:N,destroy(){document.removeEventListener("mousedown",ue,true),document.removeEventListener("scroll",B,true),window.removeEventListener("resize",$),b?.(),b=null;}}}function Yo(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:d=false,tooltip:l,hint:u,icon:p,suffix:f,onClick:g}=e,m=y("div",{className:"lg-label-wrap",id:t}),h=y("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const _=typeof p=="string"?y("span",{className:"lg-label-ico"},p):p;_.classList?.add?.("lg-label-ico"),h.appendChild(_);}const b=y("span",{className:"lg-label-text"},n);h.appendChild(b);const w=y("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(w);let x=null;if(f!=null){x=typeof f=="string"?document.createTextNode(f):f;const _=y("span",{className:"lg-label-suffix"});_.appendChild(x),h.appendChild(_);}const v=u?y("div",{className:"lg-label-hint"},u):null;m.classList.add(`lg-label--${a}`),m.classList.add(`lg-label--${i}`),s==="title"&&m.classList.add("lg-label--title"),C(o),d&&m.classList.add("is-disabled"),m.appendChild(h),v&&m.appendChild(v),g&&h.addEventListener("click",g);function C(_){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${_}`);}function k(_){b.textContent=_;}function A(_){C(_);}function I(_){_&&!w.isConnected&&h.appendChild(w),!_&&w.isConnected&&w.remove(),_?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function T(_){m.classList.toggle("is-disabled",!!_);}function L(_){!_&&v&&v.isConnected?v.remove():_&&v?v.textContent=_:_&&!v&&m.appendChild(y("div",{className:"lg-label-hint"},_));}return {root:m,labelEl:h,hintEl:v,setText:k,setTone:A,setRequired:I,setDisabled:T,setHint:L}}function qt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function _n(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=qt(e);return r&&n.appendChild(r),n}function Fc(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function _t(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:d="button",onClick:l,disabled:u=false,fullWidth:p=false}=e,f=y("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=Fc(),m=i?_n(i,"left"):null,h=a?_n(a,"right"):null,b=document.createElement("span");b.className="btn-label";const w=qt(t);w&&b.appendChild(w),!w&&(m||h)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(b),h&&f.appendChild(h);const x=u||s;f.disabled=x,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const v=f;return v.setLoading=C=>{f.setAttribute("aria-busy",String(!!C)),g.style.display=C?"inline-block":"none",f.disabled=C||u;},v.setDisabled=C=>{f.disabled=C||f.getAttribute("aria-busy")==="true";},v.setLabel=C=>{b.replaceChildren();const k=qt(C);k&&b.appendChild(k),!k&&(m||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},v.setIconLeft=C=>{if(C==null){m?.remove();return}m?m.replaceChildren(qt(C)):f.insertBefore(_n(C,"left"),b);},v.setIconRight=C=>{if(C==null){h?.remove();return}h?h.replaceChildren(qt(C)):f.appendChild(_n(C,"right"));},v.setVariant=C=>{f.classList.remove("primary","danger"),C==="primary"&&f.classList.add("primary"),C==="danger"&&f.classList.add("danger");},v}let qa=null,Jo=null;function $c(){return qa}function Dc(e){qa=e,Jo=null;}function Ya(){return Jo}function Gc(e){Jo=e;}function Bc(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function Ja(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Xa(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function zc(){const e=$c();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Wc(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Qa(){try{return window.top!==window.self}catch{return  true}}function Hc(){const e=Qa(),t=Wc(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function kr(){const e=Ya();if(e)return e;const t=Hc(),n=zc(),r=Ja(),o=Xa(),i=Qa(),a=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),u=Math.round(s?.height??d),p=Math.round(a.width||0),f=Math.round(a.height||0),g=Math.round(a.availWidth||p),m=Math.round(a.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,b={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:d,visualViewportWidth:l,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:h,orientation:Bc()};return Gc(b),b}function Uc(){return kr().surface==="discord"}function Vc(){return kr().platform==="mobile"}function Kc(){kr();}function qc(){return Ya()!==null}const ot={init:Kc,isReady:qc,detect:kr,isDiscord:Uc,isMobile:Vc,detectOS:Ja,detectBrowser:Xa,setPlatformOverride:Dc};let ur=false;const Yt=new Set;function Yc(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Oe=e=>{const t=Yc();if(t){for(const n of Yt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Jc(){ur||(ur=true,window.addEventListener("keydown",Oe,true),window.addEventListener("keypress",Oe,true),window.addEventListener("keyup",Oe,true),document.addEventListener("keydown",Oe,true),document.addEventListener("keypress",Oe,true),document.addEventListener("keyup",Oe,true));}function Xc(){ur&&(ur=false,window.removeEventListener("keydown",Oe,true),window.removeEventListener("keypress",Oe,true),window.removeEventListener("keyup",Oe,true),document.removeEventListener("keydown",Oe,true),document.removeEventListener("keypress",Oe,true),document.removeEventListener("keyup",Oe,true));}function Qc(e){return Yt.size===0&&Jc(),Yt.add(e),()=>{Yt.delete(e),Yt.size===0&&Xc();}}function Zc(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function ed(e,t){return t?e.replace(t,""):e}function td(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function nd(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:d=true,debounceMs:l=0,onChange:u,onEnter:p,label:f}=e,g=y("div",{className:"lg-input-wrap"}),m=y("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),r&&(m.value=r),f){const _=y("div",{className:"lg-input-label"},f);g.appendChild(_);}g.appendChild(m);const h=Zc(o,i,a,s),b=()=>{const _=m.selectionStart??m.value.length,F=m.value.length,Z=ed(m.value,h);if(Z!==m.value){m.value=Z;const D=F-Z.length,Y=Math.max(0,_-D);m.setSelectionRange(Y,Y);}},w=td(()=>u?.(m.value),l);m.addEventListener("input",()=>{b(),w();}),m.addEventListener("paste",()=>queueMicrotask(()=>{b(),w();})),m.addEventListener("keydown",_=>{_.key==="Enter"&&p?.(m.value);});const x=d?Qc(m):()=>{};function v(){return m.value}function C(_){m.value=_??"",b(),w();}function k(){m.focus();}function A(){m.blur();}function I(_){m.disabled=!!_;}function T(){return document.activeElement===m}function L(){x();}return {root:g,input:m,getValue:v,setValue:C,focus:k,blur:A,setDisabled:I,isFocused:T,destroy:L}}function he(e,t,n){return Math.min(n,Math.max(t,e))}function an({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,d=a;break;case 3:c=a,d=i;break;case 4:s=a,d=i;break;default:s=i,d=a;break}const u=n-i,p=Math.round((s+u)*255),f=Math.round((c+u)*255),g=Math.round((d+u)*255);return {r:he(p,0,255),g:he(f,0,255),b:he(g,0,255),a:he(r,0,1)}}function Za({r:e,g:t,b:n,a:r}){const o=he(e,0,255)/255,i=he(t,0,255)/255,a=he(n,0,255)/255,s=Math.max(o,i,a),c=Math.min(o,i,a),d=s-c;let l=0;d!==0&&(s===o?l=60*((i-a)/d%6):s===i?l=60*((a-o)/d+2):l=60*((o-i)/d+4)),l<0&&(l+=360);const u=s===0?0:d/s;return {h:l,s:u,v:s,a:he(r,0,1)}}function Xo({r:e,g:t,b:n}){const r=o=>he(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function rd({r:e,g:t,b:n,a:r}){const o=he(Math.round(r*255),0,255);return `${Xo({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function Jt({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Pt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function fo(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Pt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,i,a,s].some(c=>Number.isNaN(c))?null:{r:o,g:i,b:a,a:s}}return null}function od(e,t){const n=fo(e)??Pt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=he(t,0,1)),Za(n)}function id(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function ad(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function at(e){const t=an(e),n=an({...e,a:1});return {hsva:{...e},hex:Xo(n),hexa:rd(t),rgba:Jt(t),alpha:e.a}}function $i(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():ot.detect().platform==="mobile";let u=od(r,o);const p=Ne({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=y("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const h=p.querySelector(".card-toggle");!l&&h&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const b=p.querySelector(".card-collapse");let w=null,x=null,v=null,C=null,k=null,A=null,I=null,T=null,L=null,_="hex";function F(B){const $=at(u);B==="input"?s?.($):c?.($);}function Z(){const B=at(u);if(m.style.setProperty("--cp-preview-color",B.rgba),m.setAttribute("aria-label",`${n}: ${B.hexa}`),!l&&w&&x&&v&&C&&k&&A&&I){const $=an({...u,s:1,v:1,a:1}),N=Jt($);w.style.setProperty("--cp-palette-hue",N),x.style.left=`${u.s*100}%`,x.style.top=`${(1-u.v)*100}%`,v.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Jt({...$,a:1})} 0%, ${Jt({...$,a:0})} 100%)`),C.style.top=`${(1-u.a)*100}%`,k.style.setProperty("--cp-hue-color",Jt(an({...u,v:1,s:1,a:1}))),A.style.left=`${u.h/360*100}%`;const R=u.a===1?B.hex:B.hexa,j=B.rgba,P=_==="hex"?R:j;I!==document.activeElement&&(I.value=P),I.setAttribute("aria-label",`${_.toUpperCase()} code for ${n}`),I.placeholder=_==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",_==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=_,T&&(T.textContent=_.toUpperCase(),T.setAttribute("aria-label",_==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),T.setAttribute("aria-pressed",_==="rgba"?"true":"false"),T.classList.toggle("is-alt",_==="rgba"));}L&&L!==document.activeElement&&(L.value=B.hex);}function D(B,$=null){u={h:(B.h%360+360)%360,s:he(B.s,0,1),v:he(B.v,0,1),a:he(B.a,0,1)},Z(),$&&F($);}function Y(B,$=null){D(Za(B),$);}function ue(B,$,N){B.addEventListener("pointerdown",R=>{R.preventDefault();const j=R.pointerId,P=G=>{G.pointerId===j&&$(G);},O=G=>{G.pointerId===j&&(document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",O),document.removeEventListener("pointercancel",O),N?.(G));};$(R),document.addEventListener("pointermove",P),document.addEventListener("pointerup",O),document.addEventListener("pointercancel",O);});}if(!l&&b){const B=b.querySelector(".card-body");if(B){B.classList.add("color-picker__body"),x=y("div",{className:"color-picker__palette-cursor"}),w=y("div",{className:"color-picker__palette"},x),C=y("div",{className:"color-picker__alpha-thumb"}),v=y("div",{className:"color-picker__alpha"},C),A=y("div",{className:"color-picker__hue-thumb"}),k=y("div",{className:"color-picker__hue"},A);const $=y("div",{className:"color-picker__main"},w,v),N=y("div",{className:"color-picker__hue-row"},k),R=nd({blockGameKeys:true});I=R.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=false,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),T=y("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),R.root.classList.add("color-picker__hex-wrap");const j=y("div",{className:"color-picker__hex-row"},T,R.root);B.replaceChildren($,N,j),ue(w,O=>{if(!w||!x)return;const G=w.getBoundingClientRect(),ge=he((O.clientX-G.left)/G.width,0,1),St=he((O.clientY-G.top)/G.height,0,1);D({...u,s:ge,v:1-St},"input");},()=>F("change")),ue(v,O=>{if(!v)return;const G=v.getBoundingClientRect(),ge=he((O.clientY-G.top)/G.height,0,1);D({...u,a:1-ge},"input");},()=>F("change")),ue(k,O=>{if(!k)return;const G=k.getBoundingClientRect(),ge=he((O.clientX-G.left)/G.width,0,1);D({...u,h:ge*360},"input");},()=>F("change")),T.addEventListener("click",()=>{if(_=_==="hex"?"rgba":"hex",I){const O=at(u);I.value=_==="hex"?u.a===1?O.hex:O.hexa:O.rgba;}Z(),I?.focus(),I?.select();}),I.addEventListener("input",()=>{if(_==="hex"){const O=id(I.value);if(O!==I.value){const G=I.selectionStart??O.length;I.value=O,I.setSelectionRange(G,G);}}});const P=()=>{const O=I.value;if(_==="hex"){const G=Pt(O);if(!G){I.value=u.a===1?at(u).hex:at(u).hexa;return}const ge=O.startsWith("#")?O.slice(1):O,St=ge.length===4||ge.length===8;G.a=St?G.a:u.a,Y(G,"change");}else {const G=ad(O),ge=fo(G);if(!ge){I.value=at(u).rgba;return}Y(ge,"change");}};I.addEventListener("change",P),I.addEventListener("blur",P),I.addEventListener("keydown",O=>{O.key==="Enter"&&(P(),I.blur());});}}return l&&(b&&b.remove(),L=y("input",{className:"color-picker__native",type:"color",value:Xo(an({...u,a:1}))}),m.addEventListener("click",()=>L.click()),L.addEventListener("input",()=>{const B=Pt(L.value);B&&(B.a=u.a,Y(B,"input"),F("change"));}),p.appendChild(L)),Z(),{root:p,isMobile:l,getValue:()=>at(u),setValue:(B,$)=>{const N=fo(B)??Pt(B)??Pt("#FFFFFF");N&&(typeof $=="number"&&(N.a=$),Y(N,null));}}}const sd=window;function ld(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:sd}const cd=ld(),M=cd;function dd(e){try{return !!e.isSecureContext}catch{return  false}}function Qo(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function es(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function ud(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function pd(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function fd(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function gd(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!dd(M))return {ok:false,method:"clipboard-write"};if(!await ud())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function md(e,t){try{const n=t||Qo(),r=pd(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function hd(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=fd(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=es()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function bd(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await gd(n);if(r.ok)return r;const o=t.injectionRoot||Qo(t.valueNode||void 0),i=md(n,o);if(i.ok)return i;const a=hd(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(ot.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function yd(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=Qo(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await bd(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(es()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const Et={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--journal-bar-low":"#F98B4B","--journal-bar-mid":"#F3D32B","--journal-bar-high":"#5EAC46","--journal-bar-complete":"#0B893F","--journal-rainbow":"#FF77A8","--journal-tab-1":"#26a69a","--journal-tab-2":"#4caf50","--journal-tab-3":"#9c27b0"}};function vd(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,s=false;function c(l){const u=n[l]||n[i]||{};s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=M.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,o?.(l);}function d(){return i}return c(r),{applyTheme:c,getCurrentTheme:d}}const go={ui:{expandedCards:{style:false,system:false}}};async function xd(){const e=await qo("tab-settings",{version:1,defaults:go,sanitize:o=>({ui:{expandedCards:Fi(go.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:Fi(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function Zo(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function wd(){return Object.keys(Et).map(e=>({value:e,label:Zo(e)}))}const kd=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"],Sd=["--journal-bar-low","--journal-bar-mid","--journal-bar-high","--journal-bar-complete","--journal-rainbow","--journal-tab-1","--journal-tab-2","--journal-tab-3"];function Cd(e){return Zo(e.replace(/^--/,""))}function Ad(e){return {"--journal-bar-low":"Progress Low","--journal-bar-mid":"Progress Mid","--journal-bar-high":"Progress High","--journal-bar-complete":"Progress Complete","--journal-rainbow":"Rainbow","--journal-tab-1":"Tab 1 (All)","--journal-tab-2":"Tab 2 (Crops)","--journal-tab-3":"Tab 3 (Pets)"}[e]??Zo(e.replace(/^--journal-/,""))}function Td(e){return e.alpha<1?e.rgba:e.hex}class Id extends $t{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let r;try{r=await xd();}catch{r={get:()=>go,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const o=r.get(),i=Object.keys(Et),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const d=Yo({text:"Theme",tone:"muted",size:"lg"}),l=Nc({options:wd(),value:s,onChange:h=>{c=h,this.deps.applyTheme(h),this.renderThemePickers(h,u,c);}}),u=y("div",{className:"settings-theme-grid"}),p=Ne({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!o.ui.expandedCards.style,onExpandChange:h=>r.setCardExpanded("style",h)},y("div",{className:"kv settings-theme-row"},d.root,l.root),u);this.renderThemePickers(s,u,c);const f=y("div",{className:"settings-theme-grid"});this.renderJournalPickers(s,f,c);const g=Ne({title:"Journal",padding:"lg",expandable:true,defaultExpanded:false,variant:"soft"},f),m=this.createEnvCard({defaultExpanded:!!o.ui.expandedCards.system,onExpandChange:h=>r.setCardExpanded("system",h)});n.appendChild(p),n.appendChild(g),n.appendChild(m);}renderThemePickers(t,n,r){const o=Et[t];if(n.replaceChildren(),!!o)for(const i of kd){const a=o[i];if(a==null)continue;const s=$i({label:Cd(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,r),onChange:c=>this.updateThemeVar(t,i,c,r)});n.appendChild(s.root);}}updateThemeVar(t,n,r,o){const i=Et[t];i&&(i[n]=Td(r),o===t&&this.deps.applyTheme(t));}renderJournalPickers(t,n,r){const o=Et[t];if(n.replaceChildren(),!!o)for(const i of Sd){const a=o[i];if(a==null)continue;const s=$i({label:Ad(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,r),onChange:c=>this.updateThemeVar(t,i,c,r)});n.appendChild(s.root);}}createEnvCard(t){const n=t?.defaultExpanded??false,r=t?.onExpandChange,o=(h,b)=>{const w=y("div",{className:"kv kv--inline-mobile"}),x=y("label",{},h),v=y("div",{className:"ro"});return typeof b=="string"?v.textContent=b:v.append(b),w.append(x,v),w},i=y("code",{},"—"),a=y("span",{},"—"),s=y("span",{},"—"),c=y("span",{},"—"),d=y("span",{},"—"),l=y("span",{},"—"),u=()=>{const h=ot.detect();s.textContent=h.surface,c.textContent=h.platform,d.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",i.textContent=h.host,a.textContent=h.isInIframe?"Yes":"No";},p=_t({label:"Copy JSON",variant:"primary",size:"sm"});yd(p,()=>{const h=ot.detect();return JSON.stringify(h,null,2)});const f=y("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=Ne({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:r},o("Surface",s),o("Platform",c),o("Browser",d),o("OS",l),o("Host",i),o("Iframe",a)),m=()=>{document.hidden||u();};return document.addEventListener("visibilitychange",m),u(),this.addCleanup(()=>document.removeEventListener("visibilitychange",m)),g}}function ei(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=y("div",{className:"lg-switch-wrap"}),d=y("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),l=y("span",{className:"lg-switch-track"}),u=y("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;i&&a!=="none"&&(p=y("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,d):p&&a==="right"?c.append(d,p):c.append(d);let f=!!n,g=!!r;function m(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function h(T=false){g||(f=!f,m(),T||s?.(f));}function b(T){T.preventDefault(),h();}function w(T){g||((T.key===" "||T.key==="Enter")&&(T.preventDefault(),h()),T.key==="ArrowLeft"&&(T.preventDefault(),v(false)),T.key==="ArrowRight"&&(T.preventDefault(),v(true)));}d.addEventListener("click",b),d.addEventListener("keydown",w);function x(){return f}function v(T,L=false){f=!!T,m(),L||s?.(f);}function C(T){g=!!T,m();}function k(T){if(!T){p&&(p.remove(),p=null);return}p?p.textContent=T:(p=y("span",{className:"lg-switch-label"},T),c.append(p));}function A(){d.focus();}function I(){d.removeEventListener("click",b),d.removeEventListener("keydown",w);}return m(),{root:c,button:d,isChecked:x,setChecked:v,setDisabled:C,setLabel:k,focus:A,destroy:I}}function ts(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:d=false,maxHeight:l,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:h=(z,H)=>String(H),onSortChange:b,onSelectionChange:w,onRowClick:x}=e;let v=n.slice(),C=r.slice(),k=r.slice(),A=null,I=null,T=1;const L=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,_=!!s&&!(c&&L),F=y("div",{className:"lg-table-wrap",id:t});if(l!=null){const z=typeof l=="number"?`${l}px`:l;F.style.setProperty("--tbl-max-h",z);}const Z=y("div",{className:"lg-table"}),D=y("div",{className:"lg-thead"}),Y=y("div",{className:"lg-tbody"}),ue=y("div",{className:"lg-tfoot"});i&&F.classList.add("sticky"),a&&F.classList.add("zebra"),d&&F.classList.add("compact"),u&&F.classList.add("selectable");const B=p==="switch"?"52px":"36px";F.style.setProperty("--check-w",B);function $(z){return z==="center"?"center":z==="right"?"flex-end":"flex-start"}function N(){const z=v.map(X=>{const oe=(X.width||"1fr").trim();return /\bfr$/.test(oe)?`minmax(0, ${oe})`:oe}),H=(u?[B,...z]:z).join(" ");F.style.setProperty("--lg-cols",H);}N();function R(){return o?Math.max(1,Math.ceil(C.length/o)):1}function j(){if(!o)return C;const z=(T-1)*o;return C.slice(z,z+o)}function P(){if(!A||!I)return;const z=v.find(oe=>String(oe.key)===A),H=I==="asc"?1:-1,X=z?.sortFn?(oe,le)=>H*z.sortFn(oe,le):(oe,le)=>{const q=oe[A],J=le[A];return q==null&&J==null?0:q==null?-1*H:J==null?1*H:typeof q=="number"&&typeof J=="number"?H*(q-J):H*String(q).localeCompare(String(J),void 0,{numeric:true,sensitivity:"base"})};C.sort(X);}const O=new Set(g);function G(){return Array.from(O)}const ge=new Map;function St(z){O.clear(),z.forEach(H=>O.add(H)),Ce(),ge.forEach((H,X)=>{H.setChecked(O.has(X),true);}),Ht(),w?.(G());}function re(){O.clear(),Ce(),ge.forEach(z=>z.setChecked(false,true)),Ht(),w?.(G());}let fe=null;function Ce(){if(!fe)return;const z=j();if(!z.length){fe.indeterminate=false,fe.checked=false;return}const H=z.map((oe,le)=>h(oe,(T-1)*(o||0)+le)),X=H.reduce((oe,le)=>oe+(O.has(le)?1:0),0);fe.checked=X===H.length,fe.indeterminate=X>0&&X<H.length;}function An(){const z=Y.offsetWidth-Y.clientWidth;D.style.paddingRight=z>0?`${z}px`:"0px";}function Fr(){requestAnimationFrame(An);}const $r=new ResizeObserver(()=>An()),Li=()=>An();function mc(){D.replaceChildren();const z=y("div",{className:"lg-tr lg-tr-head"});if(u){const H=y("div",{className:"lg-th lg-th-check"});m||(fe=y("input",{type:"checkbox"}),fe.addEventListener("change",()=>{const X=j(),oe=fe.checked;X.forEach((le,q)=>{const J=h(le,(T-1)*(o||0)+q);oe?O.add(J):O.delete(J);}),w?.(G()),Ht();}),H.appendChild(fe)),z.appendChild(H);}v.forEach(H=>{const X=y("button",{className:"lg-th",type:"button",title:H.title||H.header});X.textContent=H.header,H.align&&X.style.setProperty("--col-justify",$(H.align)),H.sortable&&X.classList.add("sortable"),A===String(H.key)&&I?X.setAttribute("data-sort",I):X.removeAttribute("data-sort"),H.sortable&&X.addEventListener("click",()=>{const oe=String(H.key);A!==oe?(A=oe,I="asc"):(I=I==="asc"?"desc":I==="desc"?null:"asc",I||(A=null,C=k.slice())),b?.(A,I),A&&I&&P(),In();}),z.appendChild(X);}),D.appendChild(z);try{$r.disconnect();}catch{}$r.observe(Y),Fr();}function Dr(z){return Array.from(z.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Oi(z){return z.querySelector(".lg-td, .lg-td-check")}function Ri(z){const H=Oi(z);return H?H.getBoundingClientRect():null}function Ht(){const z=j(),H=new Map;Array.from(Y.children).forEach(q=>{const J=q,we=J.getAttribute("data-id");if(!we)return;const Ee=Ri(J);Ee&&H.set(we,Ee);});const X=new Map;Array.from(Y.children).forEach(q=>{const J=q,we=J.getAttribute("data-id");we&&X.set(we,J);});const oe=[];for(let q=0;q<z.length;q++){const J=z[q],we=(o?(T-1)*o:0)+q,Ee=h(J,we);oe.push(Ee);let me=X.get(Ee);me||(me=hc(J,we),_&&Dr(me).forEach(Ut=>{Ut.style.transform="translateY(6px)",Ut.style.opacity="0";})),Y.appendChild(me);}const le=[];if(X.forEach((q,J)=>{oe.includes(J)||le.push(q);}),!_){le.forEach(q=>q.remove()),Ce(),Fr();return}oe.forEach(q=>{const J=Y.querySelector(`.lg-tr-body[data-id="${q}"]`);if(!J)return;const we=Ri(J),Ee=H.get(q),me=Dr(J);if(Ee&&we){const Ue=Ee.left-we.left,Ct=Ee.top-we.top;me.forEach(tt=>{tt.style.transition="none",tt.style.transform=`translate(${Ue}px, ${Ct}px)`,tt.style.opacity="1";}),Oi(J)?.getBoundingClientRect(),me.forEach(tt=>{tt.style.willChange="transform, opacity",tt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{me.forEach(tt=>{tt.style.transform="translate(0,0)";});});}else me.forEach(Ue=>{Ue.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{me.forEach(Ue=>{Ue.style.transform="translate(0,0)",Ue.style.opacity="1";});});const Gr=Ue=>{(Ue.propertyName==="transform"||Ue.propertyName==="opacity")&&(me.forEach(Ct=>{Ct.style.willChange="",Ct.style.transition="",Ct.style.transform="",Ct.style.opacity="";}),Ue.currentTarget.removeEventListener("transitionend",Gr));},Ut=me[0];Ut&&Ut.addEventListener("transitionend",Gr);}),le.forEach(q=>{const J=Dr(q);J.forEach(me=>{me.style.willChange="transform, opacity",me.style.transition="transform .18s ease, opacity .18s ease",me.style.opacity="0",me.style.transform="translateY(-6px)";});const we=me=>{me.propertyName==="opacity"&&(me.currentTarget.removeEventListener("transitionend",we),q.remove());},Ee=J[0];Ee?Ee.addEventListener("transitionend",we):q.remove();}),Ce(),Fr();}function hc(z,H){const X=h(z,H),oe=y("div",{className:"lg-tr lg-tr-body","data-id":X});if(u){const le=y("div",{className:"lg-td lg-td-check"});if(p==="switch"){const q=ei({size:"sm",checked:O.has(X),onChange:J=>{J?O.add(X):O.delete(X),Ce(),w?.(G());}});ge.set(X,q),le.appendChild(q.root);}else {const q=y("input",{type:"checkbox",className:"lg-row-check"});q.checked=O.has(X),q.addEventListener("change",J=>{J.stopPropagation(),q.checked?O.add(X):O.delete(X),Ce(),w?.(G());}),q.addEventListener("click",J=>J.stopPropagation()),le.appendChild(q);}oe.appendChild(le);}return v.forEach(le=>{const q=y("div",{className:"lg-td"});le.align&&q.style.setProperty("--col-justify",$(le.align));let J=le.render?le.render(z,H):String(z[le.key]??"");typeof J=="string"?q.textContent=J:q.appendChild(J),oe.appendChild(q);}),(x||u&&f)&&(oe.classList.add("clickable"),oe.addEventListener("click",le=>{if(!le.target.closest(".lg-td-check")){if(u&&f){const q=!O.has(X);if(q?O.add(X):O.delete(X),Ce(),p==="switch"){const J=ge.get(X);J&&J.setChecked(q,true);}else {const J=oe.querySelector(".lg-row-check");J&&(J.checked=q);}w?.(G());}x?.(z,H,le);}})),oe}function ji(){if(ue.replaceChildren(),!o)return;const z=R(),H=y("div",{className:"lg-pager"}),X=y("button",{className:"btn",type:"button"},"←"),oe=y("button",{className:"btn",type:"button"},"→"),le=y("span",{className:"lg-pager-info"},`${T} / ${z}`);X.disabled=T<=1,oe.disabled=T>=z,X.addEventListener("click",()=>Tn(T-1)),oe.addEventListener("click",()=>Tn(T+1)),H.append(X,le,oe),ue.appendChild(H);}function Tn(z){const H=R();T=Math.min(Math.max(1,z),H),Ht(),ji();}function In(){N(),mc(),Ht(),ji();}function bc(z){k=z.slice(),C=z.slice(),A&&I&&P(),Tn(1);}function yc(z){v=z.slice(),In();}function vc(z,H="asc"){A=z,I=z?H:null,A&&I?P():C=k.slice(),In();}function xc(){try{$r.disconnect();}catch{}window.removeEventListener("resize",Li);}return Z.append(D,Y,ue),F.appendChild(Z),window.addEventListener("resize",Li),In(),{root:F,setData:bc,setColumns:yc,sortBy:vc,getSelection:G,setSelection:St,clearSelection:re,setPage:Tn,getState:()=>({page:T,pageCount:R(),sortKey:A,sortDir:I}),destroy:xc}}let pr=false;const Xt=new Set;function Pd(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Re=e=>{const t=Pd();if(t){for(const n of Xt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ed(){pr||(pr=true,window.addEventListener("keydown",Re,true),window.addEventListener("keypress",Re,true),window.addEventListener("keyup",Re,true),document.addEventListener("keydown",Re,true),document.addEventListener("keypress",Re,true),document.addEventListener("keyup",Re,true));}function Md(){pr&&(pr=false,window.removeEventListener("keydown",Re,true),window.removeEventListener("keypress",Re,true),window.removeEventListener("keyup",Re,true),document.removeEventListener("keydown",Re,true),document.removeEventListener("keypress",Re,true),document.removeEventListener("keyup",Re,true));}function _d(e){return Xt.size===0&&Ed(),Xt.add(e),()=>{Xt.delete(e),Xt.size===0&&Md();}}function Ln(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ld(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function ns(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:d=false,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:h,submitLabel:b,loading:w=false,blockGameKeys:x=true}=e,v=y("div",{className:"search"+(o?` search--${o}`:""),id:t}),C=y("span",{className:"search-ico search-ico--left"});if(p){const re=Ln(p);re&&C.appendChild(re);}else C.textContent="🔎",C.style.opacity=".9";const k=y("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),A=y("span",{className:"search-ico search-ico--right"});if(f){const re=Ln(f);re&&A.appendChild(re);}const I=Ld();I.classList.add("search-spinner");const T=g?y("button",{className:"search-clear",type:"button",title:m},"×"):null,L=b!=null?y("button",{className:"btn search-submit",type:"button"},b):null,_=y("div",{className:"search-field"},C,k,A,I,...T?[T]:[]);v.append(_,...L?[L]:[]);let F=!!i,Z=null;function D(re){I.style.display=re?"inline-block":"none",v.classList.toggle("is-loading",re);}function Y(){Z!=null&&(window.clearTimeout(Z),Z=null);}function ue(re){Y(),l>0?Z=window.setTimeout(()=>{Z=null,re();},l):re();}function B(){s?.(k.value),d&&c&&c(k.value);}k.addEventListener("input",()=>{ue(B);}),k.addEventListener("keydown",re=>{re.key==="Enter"?(re.preventDefault(),Y(),c?.(k.value)):re.key==="Escape"&&(k.value.length>0?R("",{notify:true}):k.blur());}),T&&T.addEventListener("click",()=>R("",{notify:true})),L&&L.addEventListener("click",()=>c?.(k.value));let $=()=>{};if(x&&($=_d(k)),u){const re=fe=>{if(fe.key===u&&!fe.ctrlKey&&!fe.metaKey&&!fe.altKey){const Ce=document.activeElement;Ce&&(Ce.tagName==="INPUT"||Ce.tagName==="TEXTAREA"||Ce.isContentEditable)||(fe.preventDefault(),k.focus());}};window.addEventListener("keydown",re,true),v.__cleanup=()=>{window.removeEventListener("keydown",re,true),$();};}else v.__cleanup=()=>{$();};function N(re){F=!!re,k.disabled=F,T&&(T.disabled=F),L&&(L.disabled=F),v.classList.toggle("disabled",F);}function R(re,fe={}){const Ce=k.value;k.value=re??"",fe.notify&&Ce!==re&&ue(B);}function j(){return k.value}function P(){k.focus();}function O(){k.blur();}function G(re){k.placeholder=re;}function ge(re){R("",re);}return N(F),D(w),a&&P(),{root:v,input:k,getValue:j,setValue:R,focus:P,blur:O,setDisabled:N,setPlaceholder:G,clear:ge,setLoading:D,setIconLeft(re){C.replaceChildren();const fe=Ln(re??"🔎");fe&&C.appendChild(fe);},setIconRight(re){A.replaceChildren();const fe=Ln(re??"");fe&&A.appendChild(fe);}}}function Od(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Rd(e){return e.toLowerCase()}function rs(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:d,variant:l="default",rarity:u=null}=e,p=y("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),d&&p.addEventListener("click",d);let f=false,g=a;function m(){f||(g===false?p.style.border="none":p.style.border="");}function h(k,A=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${k}`,`badge--${A}`),m();}function b(k){const A=(k??"").trim();A?(p.style.border=A,f=true):(f=false,m());}function w(k){g=k,m();}function x(k){p.textContent=k;}function v(k,A=o){h(k,A);}function C(k){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";const A=Od(k);if(!A){p.textContent=String(k??"—");return}p.textContent=A,p.classList.add("badge--rarity",`badge--rarity-${Rd(A)}`);}return l==="rarity"?C(u):(p.textContent=n,h(r,o),typeof a=="boolean"&&w(a),i&&b(i)),{root:p,setLabel:x,setType:v,setBorder:b,setWithBorder:w,setRarity:C}}function jd(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function Nd(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Fd(){return {cache:new Map,maxEntries:200}}const $d={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Dd={enabled:true,maxEntries:200},ve=jd(),Gd=Nd(),Bd={...$d},zd=Fd(),Wd={...Dd};function ke(){return ve}function Nt(){return Gd}function mn(){return Bd}function hn(){return zd}function mo(){return Wd}function os(){return ve.ready}const Sr=e=>new Promise(t=>setTimeout(t,e)),ze=e=>{try{return e()}catch{return}},Ye=(e,t,n)=>Math.max(t,Math.min(n,e)),Hd=e=>Ye(e,0,1);async function Di(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,Sr(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}const Gi=Function.prototype.bind,ie={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let is,as,ss;const Ud=new Promise(e=>{is=e;}),Vd=new Promise(e=>{as=e;}),Kd=new Promise(e=>{ss=e;});function qd(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Yd(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Jd(e){ie.engine=e,ie.tos=Yd(e)||null,ie.app=e.app||null,ie.renderer=e.app?.renderer||null,ie.ticker=e.app?.ticker||null,ie.stage=e.app?.stage||null;try{is(e);}catch{}try{ie.app&&as(ie.app);}catch{}try{ie.renderer&&ss(ie.renderer);}catch{}}function ti(){return ie.engine?true:(ie._bindPatched||(ie._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Gi.call(this,e,...t);try{!ie.engine&&qd(e)&&(Function.prototype.bind=Gi,ie._bindPatched=!1,Jd(e));}catch{}return n}),false)}ti();async function Xd(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(ie.engine)return  true;ti(),await Sr(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Qd(e=15e3){return ie.engine||await Xd(e),true}function Zd(){return ie.engine&&ie.app?{ok:true,engine:ie.engine,tos:ie.tos,app:ie.app}:(ti(),{ok:false,engine:ie.engine,tos:ie.tos,app:ie.app,note:"Not captured. Wait for room, or reload."})}const Ge={engineReady:Ud,appReady:Vd,rendererReady:Kd,engine:()=>ie.engine,tos:()=>ie.tos,app:()=>ie.app,renderer:()=>ie.renderer,ticker:()=>ie.ticker,stage:()=>ie.stage,PIXI:()=>M.PIXI||null,init:Qd,hook:Zd,ready:()=>!!ie.engine},eu=M?.location?.origin||"https://magicgarden.gg";function ls(){return typeof GM_xmlhttpRequest=="function"}function cs(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function ni(e){if(ls())return JSON.parse((await cs(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function ds(e){if(ls())return (await cs(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function tu(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=M?.Image||Image,i=new o;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(r),t(i);},i.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},i.src=r;})}const Ze=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),nu=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Bi=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):nu(e)+String(t||"");let ri=null;function us(){return ri}function ru(e){ri=e;}function ps(){return ri!==null}const ou=/\/(?:r\/\d+\/)?version\/([^/]+)/,iu=15e3,au=50;function su(){return M?.document??(typeof document<"u"?document:null)}function oi(e={}){if(ps())return;const t=e.doc??su();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(ou);if(a?.[1]){ru(a[1]);return}}}function lu(){return oi(),us()}function cu(){return ps()}async function du(e={}){const t=e.timeoutMs??iu,n=performance.now();for(;performance.now()-n<t;){oi();const r=us();if(r)return r;await Sr(au);}throw new Error("MGVersion timeout (gameVersion not found)")}const fs={init:oi,isReady:cu,get:lu,wait:du};let ii=null,gs=null;function uu(){return ii}function pu(){return gs}function fu(e){ii=e;}function gu(e){gs=e;}function ms(){return ii!==null}const mu=15e3;async function hu(e={}){ms()||await ai(e);}async function ai(e={}){const t=uu();if(t)return t;const n=pu();if(n)return n;const r=(async()=>{const o=e.gameVersion??await fs.wait({timeoutMs:mu}),i=`${eu}/version/${o}/assets/`;return fu(i),i})();return gu(r),r}async function bu(e){const t=await ai();return Ze(t,e)}function yu(){return ms()}const Dt={init:hu,isReady:yu,base:ai,url:bu};function fr(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function xn(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?fr(r):`sprite/${n}/${r}`}function bn(e,t,n,r){const o=xn(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=fr(i);return n.has(a)||r.has(a)?a:o}function vu(e,t,n=25e3){const r=[e],o=new Set;let i=0;for(;r.length&&i++<n;){const a=r.pop();if(!a||o.has(a))continue;if(o.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function xu(e){const t=M.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=vu(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function wu(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return xu(e)}catch{await Sr(50);}throw new Error("Constructors timeout")}const st=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},hs=new Map;function ku(e){return hs.get(e)}function Su(e,t){hs.set(e,t);}const bs="manifest.json";let ho=null;async function Cu(){ho||(ho=await ys());}function Au(){return ho!==null}async function ys(e={}){const t=e.baseUrl??await Dt.base(),n=ku(t);if(n)return n;const r=ni(Ze(t,bs));return Su(t,r),r}function Tu(e,t){return e.bundles.find(n=>n.name===t)??null}function Iu(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==bs&&t.add(r);return Array.from(t)}const nt={init:Cu,isReady:Au,load:ys,getBundle:Tu,listJsonFromBundle:Iu};function Pu(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Br(e,t,n,r,o){return new e(t,n,r,o)}function Eu(e,t,n,r,o,i,a){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Mu(e,t,n,r){const{Texture:o,Rectangle:i}=r;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,f=Br(i,c.x,c.y,u,p),g=s.sourceSize||{w:c.w,h:c.h},m=Br(i,0,0,g.w,g.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const b=s.spriteSourceSize;h=Br(i,b.x,b.y,b.w,b.h);}n.set(a,Eu(o,t,f,m,h,l,s.anchor||null));}}function _u(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const i=o.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(r,i);}}function Lu(e,t){const n=(r,o)=>{const i=String(r||"").trim(),a=String(o||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function Ou(e,t){const n=await nt.load(e),r=nt.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=nt.listJsonFromBundle(r),i=new Set,a=new Map,s=new Map,c=new Map;async function d(l){if(i.has(l))return;i.add(l);const u=await ni(Ze(e,l));if(!Pu(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await d(Bi(l,h));const f=Bi(l,u.meta.image),g=await tu(await ds(Ze(e,f))),m=t.Texture.from(g);Mu(u,m,a,t),_u(u,a,s),Lu(u,c);}for(const l of o)await d(l);return {textures:a,animations:s,categoryIndex:c}}let On=null;async function Ru(){return ve.ready?true:On||(On=(async()=>{const e=performance.now();st("init start");const t=await Di(Ge.appReady,15e3,"PIXI app");st("app ready");const n=await Di(Ge.rendererReady,15e3,"PIXI renderer");st("renderer ready"),ve.app=t,ve.renderer=n||t?.renderer||null,ve.ctors=await wu(t),st("constructors resolved"),ve.baseUrl=await Dt.base(),st("base url",ve.baseUrl);const{textures:r,animations:o,categoryIndex:i}=await Ou(ve.baseUrl,ve.ctors);return ve.textures=r,ve.animations=o,ve.categoryIndex=i,st("atlases loaded","textures",ve.textures.size,"animations",ve.animations.size,"categories",ve.categoryIndex?.size??0),ve.ready=true,st("ready in",Math.round(performance.now()-e),"ms"),true})(),On)}const Ft={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},vs=Object.keys(Ft),ju=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],zi=new Map(ju.map((e,t)=>[e,t]));function gr(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(zi.get(n)??1/0)-(zi.get(r)??1/0))}const Nu=["Wet","Chilled","Frozen"],Fu=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),$u={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Du={Pepper:.5,Banana:.6},Gu=256,Bu=.5,zu=2;function xs(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=gr(e),n=Wu(e),r=Hu(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function Wu(e){const t=e.filter((o,i,a)=>Ft[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?gr(t.filter(o=>!Nu.includes(o))):gr(t)}function Hu(e){const t=e.filter((n,r,o)=>Ft[n]?.overlayTall&&o.indexOf(n)===r);return gr(t)}function zr(e,t){return e.map(n=>({name:n,meta:Ft[n],overlayTall:Ft[n]?.overlayTall??null,isTall:t}))}const Uu={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Rn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function Vu(e){return Rn.has(e)?e:Rn.has("overlay")?"overlay":Rn.has("screen")?"screen":Rn.has("lighter")?"lighter":"source-atop"}function Ku(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*u,s-Math.sin(i)*u,a+Math.cos(i)*u,s+Math.sin(i)*u)}const c=Math.cos(i),d=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(a-c*l,s-d*l,a+c*l,s+d*l)}function Wi(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?Ku(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function qu(e,t,n,r){const o=Uu[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const d=i.masked?Vu(i.op):"source-in";if(e.globalCompositeOperation=d,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const u=l.getContext("2d");u.imageSmoothingEnabled=false,Wi(u,s,c,i,a),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0);}else Wi(e,s,c,i,a);e.restore();}function Yu(e){return /tallplant/i.test(e)}function si(e){const t=String(e||"").split("/");return t[t.length-1]||""}function ws(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function Ju(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function Xu(e,t,n,r){if(!t)return null;const o=si(e),i=ws(t);for(const a of i){const s=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const c of s){const d=n.get(c);if(d)return {tex:d,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,d=n.get(c);if(d)return {tex:d,key:c};const l=`sprite/mutation-overlay/${a}`,u=n.get(l);if(u)return {tex:u,key:l};const p=Ju(t,n);if(p)return p}}return null}function Qu(e,t,n,r){if(!t)return null;const o=Ft[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const i=si(e),a=ws(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const d of c){const l=r.get(d);if(l)return l}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function Zu(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=Du[t]??i;const c=o>r*1.5;let d=$u[t]??(c?a:.4);const l={x:(s-i)*r,y:(d-a)*o},u=Math.min(r,o),p=Math.min(1.5,u/Gu);let f=Bu*p;return n&&(f*=zu),{width:r,height:o,anchorX:i,anchorY:a,offset:l,iconScale:f}}function ks(e,t){return `${t.sig}::${e}`}function Ss(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function ep(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function tp(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Ss(r??null));}}function Cs(e,t){const n=e.lru.get(t);return n?(ep(e,t,n),n):null}function As(e,t,n,r){e.lru.set(t,n),e.cost+=Ss(n),tp(e,r);}function np(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function rp(e,t){return e.srcCanvas.get(t)??null}function op(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function Cr(e,t,n,r,o){const i=rp(r,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),d=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const l=Math.round(d.width/s),u=Math.round(d.height/s);a=document.createElement("canvas"),a.width=l,a.height=u;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,l,u));}else a=d;}}catch{}if(!a){const c=e?.frame||e?._frame,d=e?.orig||e?._orig,l=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(d?.width??c.width)|0),g=Math.max(1,(d?.height??c.height)|0),m=l?.x??0,h=l?.y??0;a.width=f,a.height=g;const b=a.getContext("2d");b.imageSmoothingEnabled=false,u===true||u===2||u===8?(b.save(),b.translate(m+c.height/2,h+c.width/2),b.rotate(-Math.PI/2),b.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),b.restore()):b.drawImage(p,c.x,c.y,c.width,c.height,m,h,c.width,c.height);}return op(r,e,a,o),a}function ip(e,t,n,r,o,i,a,s){const{w:c,h:d,aX:l,aY:u,basePos:p}=t,f=[];for(const g of n){const m=new r.Sprite(e);m.anchor?.set?.(l,u),m.position.set(p.x,p.y),m.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=d;const b=h.getContext("2d");b.imageSmoothingEnabled=false,b.save(),b.translate(c*l,d*u),b.drawImage(Cr(e,o,r,i,a),-c*l,-d*u),b.restore(),qu(b,h,g.name,g.isTall);const w=r.Texture.from(h,{resolution:e.resolution??1});s.push(w),m.texture=w,f.push(m);}return f}function ap(e,t,n,r,o,i,a,s,c,d){const{aX:l,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||Xu(e,f.name,r);if(!g?.tex)continue;const m=Cr(g.tex,i,o,a,s);if(!m)continue;const h=m.width,b={x:0,y:0},w={x:u.x-l*h,y:0},x=document.createElement("canvas");x.width=h,x.height=m.height;const v=x.getContext("2d");if(!v)continue;v.imageSmoothingEnabled=false,v.drawImage(m,0,0),v.globalCompositeOperation="destination-in",v.drawImage(c,-w.x,-0);const C=o.Texture.from(x,{resolution:g.tex.resolution??1});d.push(C);const k=new o.Sprite(C);k.anchor?.set?.(b.x,b.y),k.position.set(w.x,w.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k);}return p}function sp(e,t,n,r,o,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const d=Qu(e,c.name,c.isTall,r);if(!d)continue;const l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),Fu.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function Ts(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:i,Texture:a}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=Cr(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(d,l),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const m=Yu(t),h=zr(n.muts,m),b=zr(n.overlayMuts,m),w=zr(n.selectedMuts,m),x=[],v={w:s,h:c,aX:d,aY:l,basePos:u},C=si(t),k=Zu(e,C,m);ip(e,v,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,x).forEach(D=>f.addChild(D)),m&&ap(t,v,b,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,x).forEach(Y=>f.addChild(Y)),sp(t,v,w,r.textures,r.ctors,k).forEach(D=>f.addChild(D));let T={x:0,y:0,width:s,height:c};try{const D=f.getLocalBounds?.()||f.getBounds?.(!0);D&&Number.isFinite(D.width)&&Number.isFinite(D.height)&&(T={x:D.x,y:D.y,width:D.width,height:D.height});}catch{}const{Rectangle:L}=r.ctors,_=L?new L(0,0,s,c):void 0;let F=null;if(typeof r.renderer.generateTexture=="function"?F=r.renderer.generateTexture(f,{resolution:1,region:_}):r.renderer.textureGenerator?.generateTexture&&(F=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:_})),!F)throw new Error("no render texture");const Z=F instanceof a?F:a.from(r.renderer.extract.canvas(F));try{Z.__mg_base={baseX:-T.x,baseY:-T.y,baseW:s,baseH:c,texW:T.width,texH:T.height};}catch{}F&&F!==Z&&F.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{Z.__mg_gen=!0,Z.label=`${t}|${n.sig}`;}catch{}return Z}catch{return null}}function lp(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const i of e){const a=Ts(i,t,n,r);a&&o.push(a);}return o.length>=2?o:null}function Is(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${d}|bm${n}|bp${o}|p${r}`}function cp(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function dp(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function Hi(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function up(e){e.cache.clear();}function pp(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function fp(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function gp(e,t,n,r,o,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const d=e.length;let l=0;a?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=bn(null,f,t.textures,t.animations),m={scale:1},h=Es(m),b=Ms(h,m),w=Ls(h,m.boundsPadding),x=Is(g,m,h,b,w);o.cache.has(x)||bo(t,n,r,null,f,m,o,i),l++;}catch{l++;}a?.(l,d),u+s<d&&await fp();}return l}function mp(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function hp(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function li(e,t,n,r,o,i){if(!n.length)return t;const a=xs(n);if(!a.sig)return t;const s=ks(e,a),c=Cs(o,s);if(c?.tex)return c.tex;const d=Ts(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(As(o,s,{isAnim:false,tex:d},i),d):t}function Ps(e,t,n,r,o,i){if(!n.length)return t;const a=xs(n);if(!a.sig)return t;const s=ks(e,a),c=Cs(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const d=lp(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(As(o,s,{isAnim:true,frames:d},i),d):t}function Ui(e,t,n,r,o,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=bn(r,o,e.textures,e.animations),s=i.mutations||[],c=i.parent||hp(e)||mp(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=i.center?d/2:i.x??d/2,p=i.center?l/2:i.y??l/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const b=Ps(a,g,s,e,t,n),w=e.ctors.AnimatedSprite;if(w)f=new w(b),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const x=new e.ctors.Sprite(b[0]),C=1e3/Math.max(1,i.fps||8);let k=0,A=0;const I=T=>{const L=e.app.ticker?.deltaMS??T*16.666666666666668;if(k+=L,k<C)return;const _=k/C|0;k%=C,A=(A+_)%b.length,x.texture=b[A];};x.__mgTick=I,e.app.ticker?.add?.(I),f=x;}}else {const b=e.textures.get(a);if(!b)throw new Error(`Unknown sprite/anim key: ${a}`);const w=li(a,b,s,e,t,n);f=new e.ctors.Sprite(w);}const m=i.anchorX??f.texture?.defaultAnchor?.x??.5,h=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,h),f.position.set(u,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function bp(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const Vi=new Map;function Es(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function Ms(e,t){return e==="mutations"?t.pad??2:t.pad??0}function Vt(e){return Number.isFinite(e)?Math.max(0,e):0}function _s(e){if(typeof e=="number"){const t=Vt(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Vt(e.top??0),right:Vt(e.right??0),bottom:Vt(e.bottom??0),left:Vt(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Ls(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=_s(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function Os(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function Rs(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function yp(e,t,n,r,o,i){const a=`${e}|f${t}`,s=Vi.get(a);if(s)return s;const c=Os(n),d={top:0,right:0,bottom:0,left:0};for(const l of vs){const u=li(e,n,[l],r,o,i),p=Rs(u,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),m>d.right&&(d.right=m),h>d.bottom&&(d.bottom=h);}return Vi.set(a,d),d}function bo(e,t,n,r,o,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=bn(r,o,e.textures,e.animations),d=Es(i),l=Ms(d,i),u=Ls(d,i.boundsPadding),p=a&&s?.enabled?Is(c,i,d,l,u):null;if(p&&a&&s?.enabled){const x=cp(a,p);if(x)return Hi(x)}const f=i.mutations||[],g=e.animations.get(c),m=Math.max(0,(i.frameIndex??0)|0);let h,b;if(g?.length)if(h=g[m%g.length],f.length){const x=Ps(c,g,f,e,t,n);b=x[m%x.length];}else b=h;else {const x=e.textures.get(c);if(!x)throw new Error(`Unknown sprite/anim key: ${c}`);h=x,b=li(c,x,f,e,t,n);}let w;if(d==="mutations"){const x=new e.ctors.Sprite(b),v=i.anchorX??x.texture?.defaultAnchor?.x??.5,C=i.anchorY??x.texture?.defaultAnchor?.y??.5;x.anchor?.set?.(v,C),x.scale.set(i.scale??1);const k=new e.ctors.Container;k.addChild(x);try{k.updateTransform?.();}catch{}const A=x.getBounds?.(true)||{x:0,y:0,width:x.width,height:x.height};x.position.set(-A.x+l,-A.y+l),w=bp(e,k);try{k.destroy?.({children:!0});}catch{}}else {const x=i.scale??1;let v=_s(i.boundsPadding);d==="padded"&&i.boundsPadding==null&&(v=yp(c,m,h,e,t,n)),l&&(v={top:v.top+l,right:v.right+l,bottom:v.bottom+l,left:v.left+l});const C=Os(h),k=Rs(b,C.w,C.h),A=Math.max(1,Math.ceil((C.w+v.left+v.right)*x)),I=Math.max(1,Math.ceil((C.h+v.top+v.bottom)*x));w=document.createElement("canvas"),w.width=A,w.height=I;const T=w.getContext("2d");if(T){T.imageSmoothingEnabled=false;const L=Cr(b,e.renderer,e.ctors,t,n),_=(v.left-k.baseX)*x,F=(v.top-k.baseY)*x;T.drawImage(L,_,F,L.width*x,L.height*x);}}return p&&a&&s?.enabled?(dp(a,s,p,w),Hi(w)):w}function vp(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function xp(e,t){return e.defaultParent=t,true}function wp(e,t){return e.defaultParent=t,true}function xt(){if(!os())throw new Error("MGSprite not ready yet")}function kp(e,t,n){return typeof t=="string"?Ui(ke(),Nt(),mn(),e,t,n||{}):Ui(ke(),Nt(),mn(),null,e,t||{})}function Sp(e,t,n){return typeof t=="string"?bo(ke(),Nt(),mn(),e,t,n||{},hn(),mo()):bo(ke(),Nt(),mn(),null,e,t||{},hn(),mo())}function Cp(){vp(ke());}function Ap(e){return xp(ke(),e)}function Tp(e){return wp(ke(),e)}function Ip(e,t){const n=ke(),r=typeof t=="string"?bn(e,t,n.textures,n.animations):bn(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Pp(){xt();const e=ke().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Ep(e){xt();const t=String(e||"").trim();if(!t)return [];const n=ke().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Mp(e,t){xt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=ke().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===i){for(const d of c.values())if(d.toLowerCase()===a)return  true}return  false}function _p(e){xt();const t=ke().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const s=xn(o,a);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,i)=>o.localeCompare(i))}function Lp(e){xt();const t=String(e||"").trim();if(!t)return null;const n=fr(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=ke().categoryIndex,s=o.toLowerCase(),c=i.toLowerCase();let d=o,l=i;if(a){const u=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=a.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:d,id:l,key:xn(d,l)}}function Op(e,t){xt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=ke().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===i)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(c.values()).find(l=>l.toLowerCase()===a)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return xn(s,d)}function Rp(){np(Nt());}function jp(){up(hn());}function Np(){return pp(hn())}function Fp(){return [...vs]}async function $p(e,t,n=10,r=0){return xt(),gp(e,ke(),Nt(),mn(),hn(),mo(),t,n,r)}const ae={init:Ru,isReady:os,show:kp,toCanvas:Sp,clear:Cp,attach:Ap,attachProvider:Tp,has:Ip,key:(e,t)=>xn(e,t),getCategories:Pp,getCategoryId:Ep,hasId:Mp,listIds:_p,getIdInfo:Lp,getIdPath:Op,clearMutationCache:Rp,clearToCanvasCache:jp,getToCanvasCacheStats:Np,getMutationNames:Fp,warmup:$p},Dp=M,Be=Dp.Object??Object,Ar=Be.keys,mr=Be.values,hr=Be.entries,Ki=new WeakSet;function Gp(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0}}const Q=Gp(),lt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Bp=["Rain","Frost","Dawn","AmberMoon"],qi=/main-[^/]+\.js(\?|$)/,zp=6,Wp=150,Hp=2e3,Up=200,Vp=50,ct=(e,t)=>t.every(n=>e.includes(n));function dt(e,t){Q.data[e]==null&&(Q.data[e]=t,br()&&Fs());}function br(){return Object.values(Q.data).every(e=>e!=null)}function js(e,t){if(!e||typeof e!="object"||Ki.has(e))return;Ki.add(e);let n;try{n=Ar(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!Q.data.items&&ct(n,lt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&dt("items",r)),!Q.data.decor&&ct(n,lt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&dt("decor",r)),!Q.data.mutations&&ct(n,lt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&dt("mutations",r)),!Q.data.eggs&&ct(n,lt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&dt("eggs",r)),!Q.data.pets&&ct(n,lt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&dt("pets",r)),!Q.data.abilities&&ct(n,lt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&dt("abilities",r)),!Q.data.plants&&ct(n,lt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&dt("plants",r)),!(t>=zp))for(const i of n){let a;try{a=r[i];}catch{continue}a&&typeof a=="object"&&js(a,t+1);}}function rr(e){try{js(e,0);}catch{}}function Ns(){if(!Q.isHookInstalled){if(Be.__MG_HOOKED__){Q.isHookInstalled=true;return}Be.__MG_HOOKED__=true,Q.isHookInstalled=true;try{Be.keys=function(t){return rr(t),Ar.apply(this,arguments)},mr&&(Be.values=function(t){return rr(t),mr.apply(this,arguments)}),hr&&(Be.entries=function(t){return rr(t),hr.apply(this,arguments)});}catch{}}}function Fs(){if(Q.isHookInstalled){try{Be.keys=Ar,mr&&(Be.values=mr),hr&&(Be.entries=hr);}catch{}Q.isHookInstalled=false;}}function Kp(){if(Q.scanInterval||br())return;const e=()=>{if(br()||Q.scanAttempts>Wp){$s();return}Q.scanAttempts++;try{Ar(M).forEach(t=>{try{rr(M[t]);}catch{}});}catch{}};e(),Q.scanInterval=setInterval(e,Hp);}function $s(){Q.scanInterval&&(clearInterval(Q.scanInterval),Q.scanInterval=null);}const Yi=M;function qp(){try{for(const e of Yi.document?.scripts||[]){const t=e?.src?String(e.src):"";if(qi.test(t))return t}}catch{}try{for(const e of Yi.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(qi.test(t))return t}}catch{}return null}function Yp(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);if(o<0||o>t)return null;let i=0,a="",s=false;for(let c=o;c<e.length;c++){const d=e[c];if(a){if(s){s=false;continue}if(d==="\\"){s=true;continue}d===a&&(a="");continue}if(d==='"'||d==="'"){a=d;continue}if(d==="{")i++;else if(d==="}"&&--i===0)return e.slice(o,c+1)}return null}function Jp(e){const t={};let n=false;for(const r of Bp){const o=e?.[r];if(!o||typeof o!="object")continue;const i=o.iconSpriteKey||null,{iconSpriteKey:a,...s}=o;t[r]={weatherId:r,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Xp(){if(Q.data.weather)return  true;const e=qp();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const r=Yp(t,n);if(!r)return  false;const o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+o+")")();}catch{return  false}const a=Jp(i);return a?(Q.data.weather=a,true):false}function Qp(){if(Q.weatherPollingTimer)return;Q.weatherPollAttempts=0;const e=setInterval(async()=>{(await Xp()||++Q.weatherPollAttempts>Up)&&(clearInterval(e),Q.weatherPollingTimer=null);},Vp);Q.weatherPollingTimer=e;}function Zp(){Q.weatherPollingTimer&&(clearInterval(Q.weatherPollingTimer),Q.weatherPollingTimer=null);}function ef(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function tf(e,t=[]){const n=new Set,r=o=>{const i=String(o||"").trim();i&&n.add(i);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Ds(e,t,n,r=[],o=[]){const i=window.Gemini?.Modules?.Sprite;if(!i)return null;const a=tf(e,r);if(!a.length)return null;const s=[t,...o].filter(u=>typeof u=="string"),c=u=>{const p=String(u||"").trim();if(!p)return null;for(const f of a)try{if(i.has(f,p))return i.getIdPath(f,p)}catch{}return null};for(const u of s){const p=c(u);if(p)return p}const d=ef(n||""),l=c(d||n||"");if(l)return l;try{for(const u of a){const p=i.listIds(`sprite/${u}/`),f=s.map(m=>String(m||"").toLowerCase()),g=String(n||d||"").toLowerCase();for(const m of p){const b=(m.split("/").pop()||"").toLowerCase();if(f.some(w=>w&&w===b)||b===g)return m}for(const m of p){const b=(m.split("/").pop()||"").toLowerCase();if(f.some(w=>w&&b.includes(w))||g&&b.includes(g))return m}}}catch{}return null}function _e(e,t,n,r,o=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=Ds(s,n,r,o,i);if(c)try{e.spriteId=c;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const l of Object.values(d))_e(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};_e(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};_e(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&_e(e.activeState,s,n,e.activeState?.name||r);}function nf(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],i=t.slice(1);return Ds(e,o,n??null,r,i)}function rf(e){for(const[t,n]of Object.entries(e.items||{}))_e(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))_e(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){_e(n,"mutations",t,n?.name,["mutation"]);const r=nf("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))_e(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))_e(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&_e(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&_e(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&_e(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function of(){try{rf(Q.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Gs=1e4,Bs=50;function zs(e){return new Promise(t=>setTimeout(t,e))}function af(e){return Q.data[e]}function sf(){return {...Q.data}}function lf(e){return Q.data[e]!=null}async function cf(e,t=Gs,n=Bs){const r=Date.now();for(;Date.now()-r<t;){const o=Q.data[e];if(o!=null)return o;await zs(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function df(e=Gs,t=Bs){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Q.data).some(r=>r!=null))return {...Q.data};await zs(t);}throw new Error("MGData.waitForAnyData: timeout")}const se={async init(){Ns(),Kp(),Qp();},isReady:br,get:af,getAll:sf,has:lf,waitFor:cf,waitForAny:df,resolveSprites:of,cleanup(){Fs(),$s(),Zp();}},uf={expanded:false,sort:{key:null,dir:null},search:""},pf={categories:{}};async function ff(){const e=await qo("tab-test",{version:2,defaults:pf,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...uf}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function r(i,a,s){const c=e.get(),d=t(i);e.update({categories:{...c.categories,[i]:{...d,sort:{key:a,dir:s}}}});}function o(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const gf={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function jn(e){return e?gf[e]??0:0}class mf extends $t{constructor(){super({id:"tab-test",label:"Test"});ee(this,"stateCtrl",null);}async build(n){this.stateCtrl=await ff();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=y("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const i=ae.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=y("span",{style:"opacity:0.5;"});return o.textContent="—",o}return rs({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},c=ts({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const d=ns({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=y("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);const u=y("div");return u.appendChild(l),u.appendChild(c.root),Ne({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=se.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=se.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=se.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=se.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=se.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>jn(i.rarity)-jn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!ae.isReady())try{await ae.init();}catch{return}const o=ae.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],c=ae.getCategoryId(a).map(d=>{const l=`sprite/${a}/${d}`;return {name:d,spriteId:l,rarity:this.getRarityForSprite(a,l,d)}});if(c.sort((d,l)=>jn(d.rarity)-jn(l.rarity)),c.length>0){const d=this.createDataCard(a,this.formatCategoryName(a),c,r);n.appendChild(d);}}}}const hf=new Map;function bf(){return hf}function yo(){return M.jotaiAtomCache?.cache}function rt(e){const t=bf(),n=t.get(e);if(n)return n;const r=yo();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function yf(){const e=M;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const vf={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Gt(){return vf}const xf="__JOTAI_STORE_READY__";let Ji=false;const vo=new Set;function Nn(){if(!Ji){Ji=true;for(const e of vo)try{e();}catch{}try{const e=M.CustomEvent||CustomEvent;M.dispatchEvent?.(new e(xf));}catch{}}}function wf(e){vo.add(e);const t=wo();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{vo.delete(e);}}async function kf(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=wo();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const s=wf(()=>{a||(a=true,s(),o());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=wo();if(l.via&&!l.polyfill){if(a)return;a=true,s(),o();return}await yn(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const yn=e=>new Promise(t=>setTimeout(t,e));function Ws(){try{const e=M.Event||Event;M.dispatchEvent?.(new e("visibilitychange"));}catch{}}function xo(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Wr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(xo(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(xo(i))return i}catch{}return null}function Hs(){const e=Gt(),t=M.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const d=c?.pendingProps?.value;if(xo(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;const u=Wr(d);if(u)return e.lastCapturedVia="fiber",u;const p=Wr(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(c?.stateNode){const d=Wr(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Us(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Sf(e=5e3){const t=Date.now();let n=yo();for(;!n&&Date.now()-t<e;)await yn(100),n=yo();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=Gt();let o=null,i=null;const a=[],s=()=>{for(const d of a)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const l=d.write;d.__origWrite=l,d.write=function(u,p,...f){return i||(o=u,i=p,s()),l.call(this,u,p,...f)},a.push(d);}Ws();const c=Date.now();for(;!i&&Date.now()-c<e;)await yn(50);return i?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>i(d,l),sub:(d,l)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Us())}async function Cf(e=1e4){const t=Gt();Ws();const n=Date.now();for(;Date.now()-n<e;){const r=Hs();if(r)return r;await yn(50);}return t.lastCapturedVia="polyfill",Us()}async function ci(){const e=Gt();if(e.baseStore&&!e.baseStore.__polyfill)return Nn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await yn(25);if(e.baseStore)return e.baseStore.__polyfill||Nn(),e.baseStore}e.captureInProgress=true;try{const t=Hs();if(t)return e.baseStore=t,Nn(),t;try{const r=await Sf(5e3);return e.baseStore=r,r.__polyfill||Nn(),r}catch(r){e.captureError=r;}const n=await Cf();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function wo(){const e=Gt();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Af(){const e=await ci(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=i.last,d=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,d)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function or(){const e=Gt();return e.mirror||(e.mirror=await Af()),e.mirror}const pe={async select(e){const t=await or(),n=rt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await or(),r=rt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await or(),r=rt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await pe.select(e);try{t(n);}catch{}return pe.subscribe(e,t)}};async function Tf(){await or();}function di(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function vn(e,t){const n=di(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function If(e,t,n){const r=di(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const s=r[a],c=i[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=d,i=d;}return i[r[r.length-1]]=n,o}function Xi(e,t){const n={};for(const r of t)n[r]=r.includes(".")?vn(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Pf(e,t,n){const r=n.mode??"auto";function o(d){const l=t?vn(d,t):d,u=new Map;if(l==null)return {signatures:u,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],h=n.key?n.key(m,g,d):g,b=n.sig?n.sig(m,g,d):n.fields?Xi(m,n.fields):JSON.stringify(m);u.set(h,b);}else for(const[g,m]of Object.entries(l)){const h=n.key?n.key(m,g,d):g,b=n.sig?n.sig(m,g,d):n.fields?Xi(m,n.fields):JSON.stringify(m);u.set(h,b);}return {signatures:u,keys:Array.from(u.keys())}}function i(d,l){if(d===l)return  true;if(!d||!l||d.size!==l.size)return  false;for(const[u,p]of d)if(l.get(u)!==p)return  false;return  true}async function a(d){let l=null;return pe.subscribeImmediate(e,u=>{const p=t?vn(u,t):u,{signatures:f}=o(p);if(!i(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const h of g){const b=l?.get(h)??"__NONE__",w=f.get(h)??"__NONE__";b!==w&&m.push(h);}l=f,d({value:p,changedKeys:m});}})}async function s(d,l){return a(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u});})}async function c(d,l){const u=new Set(d);return a(({value:p,changedKeys:f})=>{const g=f.filter(m=>u.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:c}}const Mt=new Map;function Ef(e,t){const n=Mt.get(e);if(n)try{n();}catch{}return Mt.set(e,t),()=>{try{t();}catch{}Mt.get(e)===t&&Mt.delete(e);}}function de(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${di(n).join(".")}`:e;async function i(){const u=await pe.select(e);return n?vn(u,n):u}async function a(u){if(typeof r=="function"){const g=await pe.select(e),m=r(u,g);return pe.set(e,m)}const p=await pe.select(e),f=n?If(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?pe.set(e,{...p,...u}):pe.set(e,f)}async function s(u){const p=await i(),f=u(p);return await a(f),f}async function c(u,p,f){let g;const m=b=>{const w=n?vn(b,n):b;if(typeof g>"u"||!f(g,w)){const x=g;g=w,p(w,x);}},h=u?await pe.subscribeImmediate(e,m):await pe.subscribe(e,m);return Ef(o,h)}function d(){const u=Mt.get(o);if(u){try{u();}catch{}Mt.delete(o);}}function l(u){return Pf(e,u?.path??n,u)}return {label:o,get:i,set:a,update:s,onChange:(u,p=Object.is)=>c(false,u,p),onChangeNow:(u,p=Object.is)=>c(true,u,p),asSignature:l,stopOnChange:d}}function S(e){return de(e)}S("positionAtom");S("lastPositionInMyGardenAtom");S("playerDirectionAtom");S("stateAtom");S("quinoaDataAtom");S("currentTimeAtom");S("actionAtom");S("isPressAndHoldActionAtom");S("mapAtom");S("tileSizeAtom");de("mapAtom",{path:"cols"});de("mapAtom",{path:"rows"});de("mapAtom",{path:"spawnTiles"});de("mapAtom",{path:"locations.seedShop.spawnTileIdx"});de("mapAtom",{path:"locations.eggShop.spawnTileIdx"});de("mapAtom",{path:"locations.toolShop.spawnTileIdx"});de("mapAtom",{path:"locations.decorShop.spawnTileIdx"});de("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});de("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});de("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});de("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});de("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});S("playerAtom");S("myDataAtom");S("myUserSlotIdxAtom");S("isSpectatingAtom");S("myCoinsCountAtom");S("numPlayersAtom");de("playerAtom",{path:"id"});S("userSlotsAtom");S("filteredUserSlotsAtom");S("myUserSlotAtom");S("spectatorsAtom");de("stateAtom",{path:"child"});de("stateAtom",{path:"child.data"});de("stateAtom",{path:"child.data.shops"});const Mf=de("stateAtom",{path:"child.data.userSlots"}),_f=de("stateAtom",{path:"data.players"}),Lf=de("stateAtom",{path:"data.hostPlayerId"});S("myInventoryAtom");S("myInventoryItemsAtom");S("isMyInventoryAtMaxLengthAtom");S("myFavoritedItemIdsAtom");S("myCropInventoryAtom");S("mySeedInventoryAtom");S("myToolInventoryAtom");S("myEggInventoryAtom");S("myDecorInventoryAtom");S("myPetInventoryAtom");de("myInventoryAtom",{path:"favoritedItemIds"});S("itemTypeFiltersAtom");S("myItemStoragesAtom");S("myPetHutchStoragesAtom");S("myPetHutchItemsAtom");S("myPetHutchPetItemsAtom");S("myNumPetHutchItemsAtom");S("myValidatedSelectedItemIndexAtom");S("isSelectedItemAtomSuspended");S("mySelectedItemAtom");S("mySelectedItemNameAtom");S("mySelectedItemRotationsAtom");S("mySelectedItemRotationAtom");S("setSelectedIndexToEndAtom");S("myPossiblyNoLongerValidSelectedItemIndexAtom");S("myCurrentGlobalTileIndexAtom");S("myCurrentGardenTileAtom");S("myCurrentGardenObjectAtom");S("myOwnCurrentGardenObjectAtom");S("myOwnCurrentDirtTileIndexAtom");S("myCurrentGardenObjectNameAtom");S("isInMyGardenAtom");S("myGardenBoardwalkTileObjectsAtom");const Of=de("myDataAtom",{path:"garden"});de("myDataAtom",{path:"garden.tileObjects"});de("myOwnCurrentGardenObjectAtom",{path:"objectType"});S("myCurrentStablePlantObjectInfoAtom");S("myCurrentSortedGrowSlotIndicesAtom");S("myCurrentGrowSlotIndexAtom");S("myCurrentGrowSlotsAtom");S("myCurrentGrowSlotAtom");S("secondsUntilCurrentGrowSlotMaturesAtom");S("isCurrentGrowSlotMatureAtom");S("numGrowSlotsAtom");S("myCurrentEggAtom");S("petInfosAtom");S("myPetInfosAtom");S("myPetSlotInfosAtom");S("myPrimitivePetSlotsAtom");S("myNonPrimitivePetSlotsAtom");S("expandedPetSlotIdAtom");S("myPetsProgressAtom");S("myActiveCropMutationPetsAtom");S("totalPetSellPriceAtom");S("selectedPetHasNewVariantsAtom");const Rf=S("shopsAtom"),jf=S("myShopPurchasesAtom");S("seedShopAtom");S("seedShopInventoryAtom");S("seedShopRestockSecondsAtom");S("seedShopCustomRestockInventoryAtom");S("eggShopAtom");S("eggShopInventoryAtom");S("eggShopRestockSecondsAtom");S("eggShopCustomRestockInventoryAtom");S("toolShopAtom");S("toolShopInventoryAtom");S("toolShopRestockSecondsAtom");S("toolShopCustomRestockInventoryAtom");S("decorShopAtom");S("decorShopInventoryAtom");S("decorShopRestockSecondsAtom");S("decorShopCustomRestockInventoryAtom");S("isDecorShopAboutToRestockAtom");de("shopsAtom",{path:"seed"});de("shopsAtom",{path:"tool"});de("shopsAtom",{path:"egg"});de("shopsAtom",{path:"decor"});S("myCropItemsAtom");S("myCropItemsToSellAtom");S("totalCropSellPriceAtom");S("friendBonusMultiplierAtom");S("myJournalAtom");S("myCropJournalAtom");S("myPetJournalAtom");S("myStatsAtom");S("myActivityLogsAtom");S("newLogsAtom");S("hasNewLogsAtom");S("newCropLogsFromSellingAtom");S("hasNewCropLogsFromSellingAtom");S("myCompletedTasksAtom");S("myActiveTasksAtom");S("isWelcomeToastVisibleAtom");S("shouldCloseWelcomeToastAtom");S("isInitialMoveToDirtPatchToastVisibleAtom");S("isFirstPlantSeedActiveAtom");S("isThirdSeedPlantActiveAtom");S("isThirdSeedPlantCompletedAtom");S("isDemoTouchpadVisibleAtom");S("areShopAnnouncersEnabledAtom");S("arePresentablesEnabledAtom");S("isEmptyDirtTileHighlightedAtom");S("isPlantTileHighlightedAtom");S("isItemHiglightedInHotbarAtom");S("isItemHighlightedInModalAtom");S("isMyGardenButtonHighlightedAtom");S("isSellButtonHighlightedAtom");S("isShopButtonHighlightedAtom");S("isInstaGrowButtonHiddenAtom");S("isActionButtonHighlightedAtom");S("isGardenItemInfoCardHiddenAtom");S("isSeedPurchaseButtonHighlightedAtom");S("isFirstSeedPurchaseActiveAtom");S("isFirstCropHarvestActiveAtom");S("isWeatherStatusHighlightedAtom");const Nf=S("weatherAtom"),ui=S("activeModalAtom");S("hotkeyBeingPressedAtom");S("avatarTriggerAnimationAtom");S("avatarDataAtom");S("emoteDataAtom");S("otherUserSlotsAtom");S("otherPlayerPositionsAtom");S("otherPlayerSelectedItemsAtom");S("otherPlayerLastActionsAtom");S("traderBunnyPlayerId");S("npcPlayersAtom");S("npcQuinoaUsersAtom");S("numNpcAvatarsAtom");S("traderBunnyEmoteTimeoutAtom");S("traderBunnyEmoteAtom");S("unsortedLeaderboardAtom");S("currentGardenNameAtom");S("quinoaEngineAtom");S("quinoaInitializationErrorAtom");S("avgPingAtom");S("serverClientTimeOffsetAtom");S("isEstablishingShotRunningAtom");S("isEstablishingShotCompleteAtom");const ne={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Tr(){return ne}function Ff(){return ne.initialized}function wt(){return ne.isCustom&&ne.activeModal!==null}function bt(){return ne.activeModal}function Vs(e){return !ne.shadow||ne.shadow.modal!==e?null:ne.shadow.data}function $f(e){ne.initialized=e;}function pi(e){ne.activeModal=e;}function fi(e){ne.isCustom=e;}function Ks(e,t){ne.shadow={modal:e,data:t,timestamp:Date.now()};}function qs(){ne.shadow=null;}function Qi(e,t){ne.patchedAtoms.add(e),ne.originalReads.set(e,t);}function Df(e){return ne.originalReads.get(e)}function ko(e){return ne.patchedAtoms.has(e)}function Gf(e){ne.patchedAtoms.delete(e),ne.originalReads.delete(e);}function Bf(e){ne.unsubscribes.push(e);}function zf(){for(const e of ne.unsubscribes)try{e();}catch{}ne.unsubscribes.length=0;}function Wf(e){return ne.listeners.onOpen.add(e),()=>ne.listeners.onOpen.delete(e)}function Ys(e){return ne.listeners.onClose.add(e),()=>ne.listeners.onClose.delete(e)}function Js(e){for(const t of Array.from(ne.listeners.onOpen))try{t(e);}catch{}}function gi(e){for(const t of Array.from(ne.listeners.onClose))try{t(e);}catch{}}function Hf(){zf(),ne.initialized=false,ne.activeModal=null,ne.isCustom=false,ne.shadow=null,ne.patchedAtoms.clear(),ne.originalReads.clear(),ne.listeners.onOpen.clear(),ne.listeners.onClose.clear();}const mi={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Xs(e){return mi[e]}function Uf(e){const t=mi[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const Vf=new Set(["inventory","journal","stats","activityLog","petHutch"]),Kf=new Set(["seedShop","eggShop","toolShop","decorShop"]),qf=new Set(["leaderboard"]);function Yf(e,t,n,r){return function(i){const a=wt(),s=bt();if(a&&s===r){const c=Vs(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(i),n.transform?n.transform(d):d}}return t(i)}}function Jf(e,t,n,r,o){return function(a){if(wt()&&bt()===o){const s=Vs(o);if(s!==null){const c=s[n];if(c!==void 0)return t(a),r(c)}}return t(a)}}function Xf(e){const t=Xs(e);for(const n of t.atoms){const r=rt(n.atomLabel);if(!r||ko(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=Yf(n.atomLabel,o,n,e);r.read=i,Qi(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=rt(n.atomLabel);if(!r||ko(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=Jf(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,Qi(n.atomLabel,o);}}async function Ir(e){const t=Xs(e);for(const r of t.atoms)Zi(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)Zi(r.atomLabel);const n=await ci();await Qs(n,e);}async function Qf(e){const t=await ci();await Qs(t,e);const n=Uf(e);for(const r of n){const o=rt(r);if(o)try{t.get(o);}catch{}}}function Zi(e){if(!ko(e))return;const t=rt(e),n=Df(e);t&&n&&(t.read=n),Gf(e);}async function Qs(e,t){const n=Vf.has(t),r=Kf.has(t),o=qf.has(t);if(!n&&!r&&!o)return;const i=rt("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||r){const c=a.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){const u={...c,data:l};s={...a,child:u};}}}if(o){const c=a.data;if(c&&Array.isArray(c.players)){const d={...c,players:[...c.players]};s={...s??a,data:d};}}if(!s)return;await e.set(i,s);}catch{}}async function Zf(){for(const e of Object.keys(mi))await Ir(e);}let Fn=null,sn=null;async function eg(){if(Tr().initialized)return;sn=await pe.select("activeModalAtom"),Fn=setInterval(async()=>{try{const n=await pe.select("activeModalAtom"),r=sn;r!==n&&(sn=n,tg(n,r));}catch{}},50),Bf(()=>{Fn&&(clearInterval(Fn),Fn=null);}),$f(true);}function tg(e,t){const n=wt(),r=bt();e===null&&t!==null&&(n&&r===t?ng("native"):n||gi({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Js({modal:e,isCustom:false});}async function ng(e){const t=bt();t&&(qs(),fi(false),pi(null),await Ir(t),gi({modal:t,wasCustom:true,closedBy:e}));}async function rg(e,t){if(!Tr().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");wt()&&await Zs(),Ks(e,t),fi(true),pi(e),Xf(e),await Qf(e),await ui.set(e),sn=e,Js({modal:e,isCustom:true});}function og(e,t){const n=Tr();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Ks(e,o);}async function Zs(){const e=Tr();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;qs(),fi(false),pi(null),await ui.set(null),sn=null,await Ir(t),gi({modal:t,wasCustom:true,closedBy:"api"});}function ig(){return new Promise(e=>{if(!wt()){e();return}const t=Ys(()=>{t(),e();});})}async function ag(){if(wt()){const e=bt();e&&await Ir(e);}await Zf(),Hf();}const el={async init(){return eg()},isReady(){return Ff()},async show(e,t){return rg(e,t)},update(e,t){return og(e,t)},async close(){return Zs()},isOpen(){return bt()!==null},isCustomOpen(){return wt()},getActiveModal(){return bt()},waitForClose(){return ig()},onOpen(e){return Wf(e)},onClose(e){return Ys(e)},async destroy(){return ag()}};function sg(){return {ready:false,xform:null,xformAt:0}}const je=sg();function tl(){return je.ready}function Bt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function wn(){return Ge.tos()}function hi(){return Ge.engine()}function lg(){const e=wn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function bi(e,t){const n=lg();return n?t*n+e|0:null}let $n=null;async function cg(e=15e3){return je.ready?true:$n||($n=(async()=>{if(await Ge.init(e),!wn())throw new Error("MGTile: engine captured but tileObject system not found");return je.ready=true,true})(),$n)}function mt(e,t,n=true){const r=wn(),o=bi(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function Hr(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function yi(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Lt(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=hi(),{gidx:s,tv:c}=mt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Pr(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=mt(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Bt(s):s}}function dg(e,t,n={}){return Lt(e,t,null,n)}function ug(e,t,n,r={}){const i=Pr(e,t,{...r,clone:false}).tileView?.tileObject;yi(i,"plant");const a=Bt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Hr(a.slots[s],n.slotPatch),Lt(e,t,a,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);Hr(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const d=Number(c)|0;if(Number.isFinite(d)){if(!a.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Hr(a.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Lt(e,t,a,r)}return Lt(e,t,a,r)}function pg(e,t,n,r={}){const i=Pr(e,t,{...r,clone:false}).tileView?.tileObject;yi(i,"decor");const a=Bt(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),Lt(e,t,a,r)}function fg(e,t,n,r={}){const i=Pr(e,t,{...r,clone:false}).tileView?.tileObject;yi(i,"egg");const a=Bt(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Lt(e,t,a,r)}function gg(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=hi(),{gidx:s,tv:c}=mt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const d=c.tileObject,l=typeof n=="function"?n(Bt(d)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function mg(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=mt(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:a?Bt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Ur(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function ir(e){const t=ze(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=ze(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function hg(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=ir(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function bg(){const e=wn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const s=mt(i,a,true).tv,c=i+1<t?mt(i+1,a,true).tv:null,d=mt(i,a+1,true).tv,l=Ur(s),u=Ur(c),p=Ur(d);if(!l||!u||!p)continue;const f=ir(l),g=ir(u),m=ir(p);if(!f||!g||!m)continue;const h={x:g.x-f.x,y:g.y-f.y},b={x:m.x-f.x,y:m.y-f.y},w=h.x*b.y-h.y*b.x;if(!Number.isFinite(w)||Math.abs(w)<1e-6)continue;const x=1/w,v={a:b.y*x,b:-b.x*x,c:-h.y*x,d:h.x*x},C={x:f.x-i*h.x-a*b.x,y:f.y-i*h.y-a*b.y},k=hg(l),A=k==="center"?C:{x:C.x+.5*(h.x+b.x),y:C.y+.5*(h.y+b.y)};return {ok:true,cols:t,rows:r,vx:h,vy:b,inv:v,anchorMode:k,originCenter:A}}return null}function nl(){return je.xform=bg(),je.xformAt=Date.now(),{ok:!!je.xform?.ok,xform:je.xform}}function yg(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!je.xform?.ok||t.forceRebuild||Date.now()-je.xformAt>n)&&nl();const r=je.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,s=r.inv.c*o+r.inv.d*i,c=Math.floor(a),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]];let u=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const m=r.originCenter.x+f*r.vx.x+g*r.vy.x,h=r.originCenter.y+f*r.vx.y+g*r.vy.y,b=(e.x-m)**2+(e.y-h)**2;b<p&&(p=b,u={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=bi(u.tx,u.ty),u):null}function vg(e,t){const n=je.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function Fe(){if(!tl())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function xg(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const it={init:cg,isReady:tl,hook:Ge.hook,engine:hi,tos:wn,gidx:(e,t)=>bi(Number(e),Number(t)),getTileObject:(e,t,n={})=>(Fe(),Pr(e,t,n)),inspect:(e,t,n={})=>(Fe(),mg(e,t,n)),setTileEmpty:(e,t,n={})=>(Fe(),dg(e,t,n)),setTilePlant:(e,t,n,r={})=>(Fe(),ug(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(Fe(),pg(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(Fe(),fg(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(Fe(),gg(e,t,n,r)),rebuildTransform:()=>(Fe(),nl()),pointToTile:(e,t={})=>(Fe(),yg(e,t)),tileToPoint:(e,t)=>(Fe(),vg(e,t)),getTransform:()=>(Fe(),je.xform),help:xg};function wg(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const W=wg();function rl(){return W.ready}async function kg(e=15e3){if(W.ready)return So(),true;if(await Ge.init(e),W.app=Ge.app(),W.ticker=Ge.ticker(),W.renderer=Ge.renderer(),W.stage=Ge.stage(),!W.app||!W.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return W.ready=true,So(),true}function So(){const e=M;return e.$PIXI=e.PIXI||null,e.$app=W.app||null,e.$renderer=W.renderer||null,e.$stage=W.stage||null,e.$ticker=W.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:W.ready},e.__MG_PIXI__}function vi(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Co(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function yr(e){return !!(e&&typeof e.tint=="number")}function yt(e){return !!(e&&typeof e.alpha=="number")}function ar(e,t,n){return e+(t-e)*n}function Sg(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,d=ar(r,a,n)|0,l=ar(o,s,n)|0,u=ar(i,c,n)|0;return d<<16|l<<8|u}function Cg(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;yr(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function Ag(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;yt(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)r.push(a[s]);}return n}const Tg=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Ao(e){if(!e)return null;if(Co(e))return e;if(!vi(e))return null;for(const t of Tg){const n=e[t];if(Co(n))return n}return null}function Ig(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let d=0;d<t;d++){const l=Ao(i[d]);if(!l){c=false;break}s[d]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(vi(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function ol(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(vi(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function Pg(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=ol(t);return W.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function Eg(e){return W.tileSets.delete(String(e||"").trim())}function Mg(){return Array.from(W.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function il(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function xi(e){const n=it.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!il(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=W.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=ol(e.tiles||[]);const o=new Map;for(const i of r){const a=it.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function wi(e){const t=W.highlights.get(e);if(!t)return  false;ze(()=>W.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&yt(t.root)&&ze(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&yr(n.o)&&ze(()=>{n.o.tint=n.baseTint;});return W.highlights.delete(e),true}function al(e=null){for(const t of Array.from(W.highlights.keys()))e&&!String(t).startsWith(e)||wi(t);return  true}function sl(e,t={}){if(!Co(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(W.highlights.has(n))return n;const r=yt(e)?Number(e.alpha):null,o=Ye(Number(t.minAlpha??.12),0,1),i=Ye(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=Ye(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,l=[];if(d)for(const f of Cg(e))l.push({o:f,baseTint:f.tint});else yr(e)&&l.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,m=g*g*(3-2*g);r!=null&&yt(e)&&(e.alpha=Ye(ar(o,i,m)*r,0,1));const h=m*c;for(const b of l)b.o&&yr(b.o)&&(b.o.tint=Sg(b.baseTint,s,h));};return W.ticker?.add(p),W.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function _g(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function ll(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=xi(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)al(i);else for(const u of Array.from(W.highlights.keys())){if(!u.startsWith(i))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&wi(u);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,d=0,l=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const h=[];for(let x=0;x<g.length;x++)_g(g[x],n)&&(h.push(x),m=true);if(!m)continue;s++,c+=h.length;const b=p?.childView?.plantVisual||p?.childView||p,w=Ig(b,g.length);if(!w){l+=h.length;continue}for(const x of h){const v=w[x];if(!v){l++;continue}const C=`${i}${u}:${x}`;W.highlights.has(C)||(sl(v,{key:C,...a}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function Lg(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=W.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{ze(()=>ll(n,{...t,clear:!1}));},o);return W.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function Og(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(W.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),W.watches.delete(i),o++);return o>0}const n=W.watches.get(t);return n?(clearInterval(n),W.watches.delete(t),true):false}function Rg(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Ao(t)||Ao(e?.displayObject)||null}function cl(e){const t=W.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&yt(n.o)&&Number.isFinite(n.baseAlpha)&&ze(()=>{n.o.alpha=n.baseAlpha;});return W.fades.delete(e),true}function To(e=null){for(const t of Array.from(W.fades.keys()))e&&!String(t).startsWith(e)||cl(t);return  true}function dl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!il(t))return To(r);const{gidxSet:o}=xi(t);if(!o)return To(r);for(const i of Array.from(W.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&cl(i);}return  true}function ul(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=Ye(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=xi(t),s=`fade:${n}:`;t.clear===true&&dl(n,t);let c=0,d=0,l=0,u=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;d++;const h=Rg(f);if(!h||!yt(h)){u++;continue}const b=`${s}${p}`;if(W.fades.has(b)){ze(()=>{h.alpha=r;}),l++;continue}const w=o?Ag(h):[h],x=[];for(const v of w)yt(v)&&x.push({o:v,baseAlpha:Number(v.alpha)});for(const v of x)ze(()=>{v.o.alpha=r;});W.fades.set(b,{targets:x}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:W.fades.size}}function jg(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=W.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{ze(()=>ul(n,{...t,clear:!1}));},o);return W.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function Ng(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(W.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),W.fadeWatches.delete(i),o++);return o>0}const n=W.fadeWatches.get(t);return n?(clearInterval(n),W.fadeWatches.delete(t),true):false}function Fg(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function $g(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=it.getTileObject(r,o,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:a?.gidx??it.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?Fg(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&ze(()=>console.log("[MGPixi.inspectTile]",d)),d}function Dg(e,t,n){const r=M.PIXI;if(!r)return;let o=W.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",W.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const s=it.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=it.getTransform(),d=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,d,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function Gg(e){const t=W.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function ye(){if(!rl())throw new Error("MGPixi: call MGPixi.init() first")}const ki={init:kg,isReady:rl,expose:So,get app(){return W.app},get renderer(){return W.renderer},get stage(){return W.stage},get ticker(){return W.ticker},get PIXI(){return M.PIXI||null},defineTileSet:(e,t)=>(ye(),Pg(e,t)),deleteTileSet:e=>(ye(),Eg(e)),listTileSets:()=>(ye(),Mg()),highlightPulse:(e,t)=>(ye(),sl(e,t)),stopHighlight:e=>(ye(),wi(e)),clearHighlights:e=>(ye(),al(e)),drawOverlayBox:(e,t,n)=>(ye(),Dg(e,t,n)),stopOverlay:e=>(ye(),Gg(e)),highlightMutation:(e,t)=>(ye(),ll(e,t)),watchMutation:(e,t)=>(ye(),Lg(e,t)),stopWatchMutation:e=>(ye(),Og(e)),inspectTile:(e,t,n)=>(ye(),$g(e,t,n)),fadeSpecies:(e,t)=>(ye(),ul(e,t)),clearSpeciesFade:(e,t)=>(ye(),dl(e,t)),clearFades:e=>(ye(),To(e)),watchFadeSpecies:(e,t)=>(ye(),jg(e,t)),stopWatchFadeSpecies:e=>(ye(),Ng(e))};function Bg(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const U=Bg();function pl(){return U.ready}const ea=M??window;async function fl(){const e=U.ctx;if(e)return e;const t=ea.AudioContext||ea.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return U.ctx=n,n}async function gl(){if(U.ctx&&U.ctx.state==="suspended")try{await U.ctx.resume();}catch{}}const zg={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Wg={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},ln=.001,cn=.2;function ta(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Io(e){const t=zg[e],n=Wg[e];if(!t)return {atom:cn,vol100:Dn(cn)};const r=ta(t,NaN);if(Number.isFinite(r)){const i=Ye(r,0,1);return {atom:i,vol100:Dn(i)}}if(n){const i=ta(n,NaN);if(Number.isFinite(i)){const a=Ye(i,0,1);return {atom:a,vol100:Dn(a)}}}const o=cn;return {atom:o,vol100:Dn(o)}}function Hg(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(Ye(t,1,100)-1)/99;return ln+r*(cn-ln)}function Dn(e){const t=Ye(Number(e),0,1);if(t<=ln)return 0;const n=(t-ln)/(cn-ln);return Math.round(1+n*99)}function ml(e,t){if(t==null)return Io(e).atom;const n=Hg(t);return n===null?Io(e).atom:Hd(n)}function Ug(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);U.sfx.groups=t;}function Vg(e){const t=U.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=U.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Kg(){if(U.sfx.buffer)return U.sfx.buffer;if(!U.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await fl();await gl();const n=await(await ds(U.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return U.sfx.buffer=r,r}async function qg(e,t={}){if(!U.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=Vg(n),o=U.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await fl();await gl();const a=await Kg(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=ml("sfx",t.volume),u=i.createGain();u.gain.value=l,u.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}let Gn=null;async function Yg(){return U.ready?true:Gn||(Gn=(async()=>{U.baseUrl=await Dt.base();const e=await nt.load(U.baseUrl),t=nt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];U.urls[i].set(a,Ze(U.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(U.sfx.mp3Url=Ze(U.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(U.sfx.atlasUrl=Ze(U.baseUrl,r));}if(!U.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return U.sfx.atlas=await ni(U.sfx.atlasUrl),Ug(U.sfx.atlas),U.ready=true,true})(),Gn)}function hl(e){if(e!=="music"&&e!=="ambience")return  false;const t=U.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return U.tracks[e]=null,true}function Jg(e,t,n={}){if(!U.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=U.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);hl(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=ml(e,n.volume),o.preload="auto",o.play().catch(()=>{}),U.tracks[e]=o,o}function Xg(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(U.urls[n].keys()).sort():n==="sfx"?U.sfx.atlas?t.groups?Array.from(U.sfx.groups.keys()).sort():Object.keys(U.sfx.atlas).sort():[]:[]}function Qg(){return ["sfx","music","ambience"]}function Zg(){return Array.from(U.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function em(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=U.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function tm(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(U.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function nm(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=U.urls[n],i=r.toLowerCase();for(const[a,s]of Array.from(o.entries()))if(a.toLowerCase()===i)return s;return null}function rm(){const{categoryVolume:e}=require("./volume");return U.tracks.music&&(U.tracks.music.volume=e("music").atom),U.tracks.ambience&&(U.tracks.ambience.volume=e("ambience").atom),true}function Xe(){if(!pl())throw new Error("MGAudio not ready yet")}async function om(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return qg(o,n);if(r==="music"||r==="ambience")return Jg(r,o,n);throw new Error(`Unknown category: ${r}`)}const bl={init:Yg,isReady:pl,play:om,stop:e=>(Xe(),hl(e)),list:(e,t)=>(Xe(),Xg(e,t)),refreshVolumes:()=>(Xe(),rm()),categoryVolume:e=>(Xe(),Io(e)),getCategories:()=>(Xe(),Qg()),getGroups:()=>(Xe(),Zg()),hasTrack:(e,t)=>(Xe(),em(e,t)),hasGroup:e=>(Xe(),tm(e)),getTrackUrl:(e,t)=>(Xe(),nm(e,t))};function im(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const ce=im();function yl(){return ce.ready}let Bn=null;async function am(){return ce.ready?true:Bn||(Bn=(async()=>{ce.baseUrl=await Dt.base();const e=await nt.load(ce.baseUrl),t=nt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ce.byCat.clear(),ce.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),d=Ze(ce.baseUrl,r);ce.byBase.set(i,d),ce.byCat.has(s)||ce.byCat.set(s,new Map),ce.byCat.get(s).set(c,d);}return ce.ready=true,true})(),Bn)}function Po(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function sm(e,t){if(t===void 0){const i=Po(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=Po(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function lm(){return Array.from(ce.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function cm(e){const t=ce.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Eo(e,t){const{cat:n,asset:r,base:o}=sm(e,t),i=ce.byBase.get(o);if(i)return i;const s=ce.byCat.get(n)?.get(r);if(s)return s;if(!ce.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Ze(ce.baseUrl,`cosmetic/${o}.png`)}const na=M?.document??document;function dm(){if(ce.overlay)return ce.overlay;const e=na.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),na.documentElement.appendChild(e),ce.overlay=e,e}function um(){const e=ce.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function pm(e){return ce.defaultParent=e,true}const fm=M?.document??document;function Mo(e,t,n){if(!ce.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?Eo(e,o):Eo(e),a=fm.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):Po(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{a.style[s]=String(c);}catch{}return a}function gm(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||um()||dm(),a=o!==void 0?Mo(e,o,r):Mo(e,r);if(i===ce.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,d=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else {const l=r.x??innerWidth/2,u=r.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${u}px`,a.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`);}}return i.appendChild(a),ce.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}ce.live.delete(a);},a}function mm(){for(const e of Array.from(ce.live))e.__mgDestroy?.();}function ut(){if(!yl())throw new Error("MGCosmetic not ready yet")}const vl={init:am,isReady:yl,categories:()=>(ut(),lm()),list:e=>(ut(),cm(e)),url:((e,t)=>(ut(),Eo(e,t))),create:((e,t,n)=>(ut(),Mo(e,t,n))),show:((e,t,n)=>(ut(),gm(e,t,n))),attach:e=>(ut(),pm(e)),clear:()=>(ut(),mm())};async function hm(e){const t=[{name:"Data",init:()=>se.init()},{name:"CustomModal",init:()=>el.init()},{name:"Sprites",init:()=>ae.init()},{name:"TileObjectSystem",init:()=>it.init()},{name:"Pixi",init:()=>ki.init()},{name:"Audio",init:()=>bl.init()},{name:"Cosmetics",init:()=>vl.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Si=We.AUTO_FAVORITE,xl={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function vt(){return Te(Si,xl)}function Ci(e){Pe(Si,e);}function wl(e){const n={...vt(),...e};return Ci(n),n}function Ai(e){const t=vt();return t.mode="simple",t.simple={...t.simple,...e},Ci(t),t}function bm(e){Ai({favoriteSpecies:e});}function ym(e){Ai({favoriteMutations:e});}function ra(){return vt().enabled}function Je(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!Je(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!Je(n[a],r[a]))return  false;return  true}const oa={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},ia={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function vm(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function xm(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function wm(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function km(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function Sm(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function aa(e){return {position:vm(e),tile:xm(e),garden:wm(e),object:km(e),plant:Sm(e)}}function sa(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Cm(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!Je(e.data,t.data)}function Am(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!Je(e.sortedSlotIndices,t.sortedSlotIndices)}function Tm(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Im(){let e=ia,t=ia,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(oa),s=new Set;function c(){if(s.size<a.length)return;const l=aa(i);if(!Je(e,l)&&(t=e,e=l,!!n)){for(const u of o.all)u(e,t);if(sa(t)!==sa(e))for(const u of o.stable)u(e,t);if(Cm(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(Am(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(Tm(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const l=a.map(async u=>{const p=oa[u],f=await pe.subscribe(p,g=>{i[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=aa(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Vr=null;function Pm(){return Vr||(Vr=Im()),Vr}const Qt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Em=new Set(["Gold","Rainbow"]),Mm=new Set(["Frozen","Chilled","Wet"]);function kl(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=Qt.Rainbow:t===1&&(t=Qt.Gold):o in Qt&&(n+=Qt[o],r++);return t*(1+n-r)}function _m(e){return Qt[e]??null}function Lm(e){return Em.has(e)}function Om(e){return Mm.has(e)}function Rm(e,t){const n=Ti(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function jm(e,t,n){const r=Ti(e);if(!r)return 0;const o=r.baseSellPrice,i=kl(n);return Math.round(o*t*i)}function Nm(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function Fm(e,t){return t>=e}function Ti(e){const t=se.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Sl=3600,Kr=80,$m=100,Zt=30;function Er(e){return e/Sl}function Mr(e,t){const n=kn(e);if(!n)return Kr;const r=n.maxScale;if(t<=1)return Kr;if(t>=r)return $m;const o=(t-1)/(r-1);return Math.floor(Kr+20*o)}function _r(e,t,n){const r=kn(e);if(!r)return n-Zt;const o=r.hoursToMature,i=t/Sl,a=Zt/o,s=Math.min(a*i,Zt),c=n-Zt;return Math.floor(c+s)}function Lr(e,t){const n=kn(e);return n?t>=n.hoursToMature:false}function Cl(e){const t=kn(e);return t?Zt/t.hoursToMature:0}function Dm(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function kn(e){const t=se.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Gm(e,t){return t<=0?1:Math.min(1,e/t)}const Al={init(){},isReady(){return  true},crop:{calculateSize:Rm,calculateSellPrice:jm,calculateProgress:Nm,isReady:Fm,getData:Ti},pet:{calculateAge:Er,calculateMaxStrength:Mr,calculateCurrentStrength:_r,isMature:Lr,calculateStrengthPerHour:Cl,getData:kn},mutation:{calculateMultiplier:kl,getValue:_m,isGrowth:Lm,isEnvironmental:Om}},la={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function ca(e,t){const n=Er(e.xp),r=Mr(e.petSpecies,e.targetScale),o=_r(e.petSpecies,e.xp,r),i=Lr(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function Bm(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=Er(e.slot.xp),i=Mr(e.slot.petSpecies,e.slot.targetScale),a=_r(e.slot.petSpecies,e.slot.xp,i),s=Lr(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:a,maxStrength:i,isMature:s}}function da(e){const t=new Set,n=[];for(const c of e.active??[]){const d=Bm(c,e.slotInfos??{});n.push(d),t.add(d.id);}const r=[];for(const c of e.inventory??[]){if(t.has(c.id))continue;const d=ca(c,"inventory");r.push(d),t.add(d.id);}const o=[];for(const c of e.hutch??[]){if(t.has(c.id))continue;const d=ca(c,"hutch");o.push(d),t.add(d.id);}const i=[...n,...r,...o],a=e.expandedPetSlotId??null,s=a?i.find(c=>c.id===a)??null:null;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},expandedPetSlotId:a,expandedPet:s}}const ua={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function zm(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function pa(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Wm(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(pa),r=t.all.map(pa);return zm(n,r)}function Hm(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function Um(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function Vm(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function Km(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function qm(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function Ym(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function Jm(){let e=ua,t=ua,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(la),s=new Set;function c(){if(s.size<a.length)return;const l=da(i);if(Je(e,l)||(t=e,e=l,!n))return;for(const b of o.all)b(e,t);if(!Wm(t,e))for(const b of o.stable)b(e,t);const u=Hm(t,e);for(const b of u)for(const w of o.location)w(b);const p=Um(t,e);for(const b of p)for(const w of o.ability)w(b);const f=Vm(t,e);if(f)for(const b of o.count)b(f);const g=Km(t,e);for(const b of g)for(const w of o.growth)w(b);const m=qm(t,e);for(const b of m)for(const w of o.strengthGain)w(b);const h=Ym(t,e);for(const b of h)for(const w of o.maxStrength)w(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){const b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const w of o.expandedPet)w(b);}}async function d(){if(n)return;const l=a.map(async u=>{const p=la[u],f=await pe.subscribe(p,g=>{i[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=da(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let qr=null;function Ii(){return qr||(qr=Jm()),qr}function Xm(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function c(u,p){const{cols:f,rows:g}=u,m=f*g,h=new Set,b=new Set,w=new Map,x=[],v=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],C=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],k=Math.max(v.length,C.length);for(let T=0;T<k;T++){const L=v[T]??[],_=C[T]??[],F=L.map((D,Y)=>(h.add(D),w.set(D,T),{globalIndex:D,localIndex:Y,position:a(f,D)})),Z=_.map((D,Y)=>(b.add(D),w.set(D,T),{globalIndex:D,localIndex:Y,position:a(f,D)}));x.push({userSlotIdx:T,dirtTiles:F,boardwalkTiles:Z,allTiles:[...F,...Z]});}const A=u.spawnTiles.map(T=>a(f,T)),I={};if(u.locations)for(const[T,L]of Object.entries(u.locations)){const _=L.spawnTileIdx??[];I[T]={name:T,spawnTiles:_,spawnPositions:_.map(F=>a(f,F))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:A,locations:I,userSlots:x,globalToXY(T){return a(f,T)},xyToGlobal(T,L){return s(f,T,L)},getTileOwner(T){return w.get(T)??null},isDirtTile(T){return h.has(T)},isBoardwalkTile(T){return b.has(T)}}}function d(){if(o.size<i||e)return;const u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(const f of n)f(e);n.clear();}}async function l(){const u=await pe.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await pe.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let Yr=null;function _o(){return Yr||(Yr=Xm()),Yr}const fa={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},ga={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function ma(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function ha(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Qm(e,t){return ha(e)===ha(t)}function Zm(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function zn(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function eh(e,t){const n=new Set(e.map(zn)),r=new Set(t.map(zn)),o=t.filter(a=>!n.has(zn(a))),i=e.filter(a=>!r.has(zn(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function th(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function nh(){let e=ga,t=ga,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(fa),s=new Set;function c(){if(s.size<a.length)return;const l=ma(i);if(Je(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!Qm(t,e))for(const f of o.stable)f(e,t);if(Zm(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const u=eh(t.items,e.items);if(u)for(const f of o.items)f(u);const p=th(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const l=a.map(async u=>{const p=fa[u],f=await pe.subscribe(p,g=>{i[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=ma(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let Jr=null;function zt(){return Jr||(Jr=nh()),Jr}const Lo={all:[],host:null,myPlayer:null,count:0};function rh(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function ba(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return Lo;const o=new Map;Array.isArray(r)&&r.forEach((c,d)=>{c?.type==="user"&&c?.playerId&&o.set(c.playerId,{slot:c,index:d});});const i=t.map(c=>rh(c,n,o)),a=i.find(c=>c.isHost)??null,s=i.find(c=>c.slotIndex!==null&&c.slotIndex>=0)??null;return {all:i,host:a,myPlayer:s,count:i.length}}function ya(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function oh(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function ih(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function ah(){let e=Lo,t=Lo,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function c(){if(a.size<s)return;const l=ba(i);if(Je(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(ya(t)!==ya(e))for(const m of o.stable)m(e,t);const u=oh(t.all,e.all);for(const m of u)for(const h of o.joinLeave)h(m);const p=ih(t.all,e.all);for(const m of p)for(const h of o.connection)h(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const h of o.host)h(m);}}async function d(){if(n)return;const l=await _f.onChangeNow(f=>{i.players=f,a.add("players"),c();});r.push(l);const u=await Lf.onChangeNow(f=>{i.hostPlayerId=f,a.add("hostPlayerId"),c();});r.push(u);const p=await Mf.onChangeNow(f=>{i.userSlots=f,a.add("userSlots"),c();});r.push(p),n=true,a.size===s&&(e=ba(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let Xr=null;function Tl(){return Xr||(Xr=ah()),Xr}const Sn=["seed","tool","egg","decor"];function sh(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function lh(e,t,n){const r=sh(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0}}function ch(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(d=>lh(d,e,o)),a=i.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function va(e){const t=e.shops,n=e.purchases??{},r=Sn.map(s=>ch(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:a}}const xa={all:Sn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function wa(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function dh(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function uh(e,t){const n=[];for(const r of Sn){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function ph(e,t){const n=[];for(const r of Sn){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function fh(){let e=xa,t=xa,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=va(i);if(Je(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if(wa(t)!==wa(e))for(const g of o.stable)g(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of Sn){const m=dh(t.byType[g],e.byType[g]);if(m)for(const h of u[g])h(m);}const p=uh(t,e);for(const g of p)for(const m of o.purchase)m(g);const f=ph(t,e);for(const g of f)for(const m of o.availability)m(g);}async function d(){if(n)return;const l=await Rf.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});r.push(l);const u=await jf.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});r.push(u),n=true,a.size===s&&(e=va(i));}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(f=>f.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let Qr=null;function gh(){return Qr||(Qr=fh()),Qr}const mh=["Sunny","Rain","Frost","Dawn","AmberMoon"];function hh(e){return mh.includes(e)}const Oo={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function bh(e){if(!e)return Oo;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),i=o>0,a=e.type??"Sunny";return {type:hh(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function yh(){let e=Oo,t=Oo,n=false,r=null;const o={all:new Set,change:new Set};function i(s){const c=bh(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const d={current:e,previous:t};for(const l of o.change)l(d);}}}async function a(){n||(r=await Nf.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let Zr=null;function vh(){return Zr||(Zr=yh()),Zr}function xh(){const e=se.get("mutations");return e?Object.keys(e):[]}function Il(){const e={};for(const t of xh())e[t]=[];return e}function Ro(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Il()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function wh(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function kh(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function Sh(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function ka(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Sa(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Ro();const i=t().get(),a=i?.userSlots[r],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],d=[],l=[],u=[],p={},f=[],g=[],m=[],h=[],b=Il(),w=[],x=[],v=[],C={},k=[],A=[],I={},T=new Set,L=new Set;for(const[D,Y]of Object.entries(n.tileObjects)){const ue=parseInt(D,10);T.add(ue);const B=i?i.globalToXY(ue):{x:0,y:0};if(Y.objectType==="plant"){const $=Y,N=wh(D,$,B,o);d.push(N),N.isMature?l.push(N):u.push(N),p[N.species]||(p[N.species]=[]),p[N.species].push(N);for(let R=0;R<$.slots.length;R++){const j=$.slots[R],P=kh(D,B,R,j,o);if(f.push(P),P.isMature?g.push(P):m.push(P),P.mutations.length>0){h.push(P);for(const O of P.mutations)b[O]||(b[O]=[]),b[O].push(P);}}}else if(Y.objectType==="egg"){const N=Sh(D,Y,B,o);w.push(N),C[N.eggId]||(C[N.eggId]=[]),C[N.eggId].push(N),N.isMature?x.push(N):v.push(N);}else if(Y.objectType==="decor"){const N=ka(D,Y,B,"tileObjects");k.push(N),I[N.decorId]||(I[N.decorId]=[]),I[N.decorId].push(N);}}for(const[D,Y]of Object.entries(n.boardwalkTileObjects)){const ue=parseInt(D,10);L.add(ue);const B=i?i.globalToXY(ue):{x:0,y:0},N=ka(D,Y,B,"boardwalk");A.push(N),I[N.decorId]||(I[N.decorId]=[]),I[N.decorId].push(N);}const _=[...k,...A],F=s.filter(D=>!T.has(D.localIndex)),Z=c.filter(D=>!L.has(D.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:m,mutated:{all:h,byMutation:b}},eggs:{all:w,mature:x,growing:v,byType:C,count:w.length},decors:{tileObjects:k,boardwalk:A,all:_,byType:I,count:_.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:F,boardwalk:Z}},counts:{plants:d.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:w.length,matureEggs:x.length,decors:_.length,emptyTileObjects:F.length,emptyBoardwalk:Z.length}}}function Ca(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Ch(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function Ah(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function Th(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function Ih(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function Ph(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:u});}}}return n}function Eh(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=o.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let d=0;d<c;d++){const l=a.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){const p=i.get(`${a.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let d=s.slotsCount;d<a.slotsCount;d++){const l=i.get(`${a.tileIndex}:${d}`);if(!l||!l.isMature)continue;const u=a.slots[d];if(!u)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function Mh(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function _h(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function Lh(){let e=Ro(),t=Ro(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Sa(i,_o);if(Je(e,l)||(t=e,e=l,!n))return;for(const x of o.all)x(e,t);if(Ca(t)!==Ca(e))for(const x of o.stable)x(e,t);const u=Ch(t.plants.all,e.plants.all);for(const x of u.added)for(const v of o.plantAdded)v({plant:x});for(const x of u.removed)for(const v of o.plantRemoved)v({plant:x,tileIndex:x.tileIndex});const p=Ah(t.plants.mature,e.plants.mature,e.plants.all);for(const x of p)for(const v of o.plantMatured)v({plant:x});const f=Ph(t.plants.all,e.plants.all);for(const x of f)for(const v of o.cropMutated)v(x);const g=Th(t.crops.mature,e.crops.mature,e.crops.all);for(const x of g)for(const v of o.cropMatured)v({crop:x});const m=Eh(t.plants.all,e.plants.all,t.crops.all);for(const x of m)for(const v of o.cropHarvested)v(x);const h=Mh(t.eggs.all,e.eggs.all);for(const x of h.added)for(const v of o.eggPlaced)v({egg:x});for(const x of h.removed)for(const v of o.eggRemoved)v({egg:x});const b=Ih(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const x of b)for(const v of o.eggMatured)v({egg:x});const w=_h(t.decors.all,e.decors.all);for(const x of w.added)for(const v of o.decorPlaced)v({decor:x});for(const x of w.removed)for(const v of o.decorRemoved)v({decor:x});}async function d(){if(n)return;const l=await Of.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});r.push(l);const u=await pe.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});r.push(u),n=true,a.size===s&&(e=Sa(i,_o));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let eo=null;function Oh(){return eo||(eo=Lh()),eo}let xe=null;function Pl(){return xe||(xe={currentTile:Pm(),myPets:Ii(),gameMap:_o(),myInventory:zt(),players:Tl(),shops:gh(),weather:vh(),myGarden:Oh()},xe)}function Qe(){if(!xe)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return xe}function Rh(){xe&&(xe.currentTile.destroy(),xe.myPets.destroy(),xe.gameMap.destroy(),xe.myInventory.destroy(),xe.players.destroy(),xe.shops.destroy(),xe.weather.destroy(),xe.myGarden.destroy(),xe=null);}const Or={get currentTile(){return Qe().currentTile},get myPets(){return Qe().myPets},get gameMap(){return Qe().gameMap},get myInventory(){return Qe().myInventory},get players(){return Qe().players},get shops(){return Qe().shops},get weather(){return Qe().weather},get myGarden(){return Qe().myGarden}},jh=100,to=[];function jo(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));to.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),to.length>jh&&to.shift();}const Ae={nativeCtor:null,captured:[],latestOpen:null},Aa=Symbol.for("ariesmod.ws.capture.wrapped"),Ta=Symbol.for("ariesmod.ws.capture.native"),El=1;function No(e){return !!e&&e.readyState===El}function Nh(){if(No(Ae.latestOpen))return Ae.latestOpen;for(let e=Ae.captured.length-1;e>=0;e--){const t=Ae.captured[e];if(No(t))return t}return null}function Fh(e,t){Ae.captured.push(e),Ae.captured.length>25&&Ae.captured.splice(0,Ae.captured.length-25);const n=()=>{Ae.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Ae.latestOpen===e&&(Ae.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);jo("in",o.type||"unknown",o);}catch{jo("in","raw",r.data);}}),e.readyState===El&&n();}function $h(e=M,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[Aa])return Ae.nativeCtor=r[Ta]??Ae.nativeCtor??null,()=>{};const o=r;Ae.nativeCtor=o;function i(a,s){const c=s!==void 0?new o(a,s):new o(a);try{Fh(c,n);}catch{}return c}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[Aa]=true,i[Ta]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function Dh(e=M){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function vr(e=M){const t=Nh();if(t)return {ws:t,source:"captured"};const n=Dh(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Ml(e,t={}){const n=t.pageWindow??M,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const s=()=>{const d=vr(n);(d.ws!==i||d.source!==a)&&(i=d.ws,a=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function Gh(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Bh(e,t=M){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=vr(t);if(!r)return {ok:false,reason:"no-ws"};if(!No(r))return {ok:false,reason:"not-open"};const o=Gh(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);jo("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function zh(e,t={},n=M){return Bh({type:e,...t},n)}const et={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},E={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var He=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(He||{});new Set(Object.values(et));new Set(Object.values(E));const Wh=["Room","Quinoa"],Hh={Room:["Room"],Quinoa:Wh};function K(e,t={},n=M){const r=t,{scopePath:o,scope:i,...a}=r,s=typeof o=="string"?o:i,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?Hh[s]:null;return zh(e,c?{scopePath:c,...a}:a,n)}function Uh(e,t=M){return K(E.Chat,{scope:"Room",message:e},t)}function Vh(e,t=M){return K(E.Emote,{scope:"Room",emoteType:e},t)}function Kh(e,t=M){return K(E.Wish,{scope:"Quinoa",wish:e},t)}function qh(e,t=M){return K(E.KickPlayer,{scope:"Room",playerId:e},t)}function Yh(e,t=M){return K(E.SetPlayerData,{scope:"Room",data:e},t)}function Jh(e=M){return K(E.UsurpHost,{scope:"Quinoa"},e)}function Xh(e=M){return K(E.ReportSpeakingStart,{scope:"Quinoa"},e)}function Qh(e,t=M){return K(E.SetSelectedGame,{scope:"Room",gameId:e},t)}function Zh(e,t=M){return K(E.VoteForGame,{scope:"Room",gameId:e},t)}function eb(e,t=M){return K(E.RequestGame,{scope:"Room",gameId:e},t)}function tb(e=M){return K(E.RestartGame,{scope:"Room"},e)}function nb(e,t=M){return K(E.Ping,{scope:"Quinoa",id:e},t)}function _l(e,t,n=M){return K(E.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const rb=_l;function ob(e,t,n=M){return K(E.Teleport,{scope:"Quinoa",x:e,y:t},n)}function ib(e=M){return K(E.CheckWeatherStatus,{scope:"Quinoa"},e)}function ab(e,t,n=M){return K(E.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function sb(e,t=M){return K(E.DropObject,{scope:"Quinoa",slotIndex:e},t)}function lb(e,t=M){return K(E.PickupObject,{scope:"Quinoa",objectId:e},t)}function Rr(e,t=M){return K(E.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function cb(e,t=M){return K(E.PutItemInStorage,{scope:"Quinoa",itemId:e},t)}function db(e,t=M){return K(E.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e},t)}function ub(e,t,n=M){return K(E.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function pb(e=M){return K(E.LogItems,{scope:"Quinoa"},e)}function fb(e,t,n,r=M){return K(E.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function gb(e,t=M){return K(E.WaterPlant,{scope:"Quinoa",plantId:e},t)}function mb(e,t=M){return K(E.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function hb(e=M){return K(E.SellAllCrops,{scope:"Quinoa"},e)}function bb(e,t=M){return K(E.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function yb(e,t=M){return K(E.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function vb(e,t=M){return K(E.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function xb(e,t=M){return K(E.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function wb(e,t,n,r=M){return K(E.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function kb(e,t=M){return K(E.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Sb(e,t,n,r=M){return K(E.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function Cb(e,t,n=M){return K(E.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Ab(e,t,n=M){return K(E.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function Tb(e,t=M){return K(E.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Ib(e,t,n,r=M){return K(E.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function Pb(e,t=M){return K(E.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function Eb(e,t,n,r=M){return K(E.PlacePet,{scope:"Quinoa",petId:e,x:t,y:n},r)}function Mb(e,t,n=M){return K(E.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function _b(e,t=M){return K(E.PetPositions,{scope:"Quinoa",positions:e},t)}function Lb(e,t,n=M){return K(E.SwapPet,{scope:"Quinoa",petIdA:e,petIdB:t},n)}function Ob(e,t=M){return K(E.StorePet,{scope:"Quinoa",petId:e},t)}function Rb(e,t,n=M){return K(E.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function jb(e,t=M){return K(E.SellPet,{scope:"Quinoa",petId:e},t)}let sr=null;const dn=new Set;function Fo(){const e=vt();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}dn.clear(),sr=zt().subscribeItems(t=>{if(t.added.length>0){const n=vt();for(const r of t.added)Fb(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Ll(){sr&&(sr(),sr=null),dn.clear(),console.log("🛑 [AutoFavorite] Stopped");}function Nb(e){const t=vt();t.enabled=e,t.simple.enabled=e,wl(t),e?Fo():Ll();}function Fb(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(dn.has(e.id)||e.isFavorited||e.favorited)&&Ol(e,t.simple)){dn.add(e.id);try{Rr(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),dn.delete(e.id);}}}function Ol(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function $b(){return Object.keys(se.get("mutations")??{})}const Pi={init(){this.isReady()||Fo();},isReady(){return ra()},DEFAULT_CONFIG:xl,STORAGE_KEY:Si,loadConfig:vt,saveConfig:Ci,updateConfig:wl,updateSimpleConfig:Ai,setFavoriteSpecies:bm,setFavoriteMutations:ym,isEnabled:ra,start:Fo,stop:Ll,setEnabled:Nb,shouldFavorite:Ol,getGameMutations:$b},Ei=We.JOURNAL_CHECKER,Rl={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function Wt(){return Te(Ei,Rl)}function jr(e){Pe(Ei,e);}function Ia(){return Wt().enabled}function Db(e){const t=Wt();t.autoRefresh=e,jr(t);}function Gb(e){const t=Wt();t.refreshIntervalMs=e,jr(t);}let no=null,Pa=null;function jl(){try{return Tl().get().myPlayer?.journal||null}catch{return null}}function Bb(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Nl(){const e=se.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Fl(){const e=se.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function zb(){return Object.keys(se.get("mutations")??{})}function $l(e){const n=(se.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(i=>r.add(i));}),[...r]}function Dl(e){const t=se.get("plants")??{},n=Object.keys(t),r=Nl(),o=e?.produce??{},i=[];let a=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));a+=u.length,i.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=i.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function Gl(e){const t=se.get("pets")??{},n=Object.keys(t),r=Fl(),o=e?.pets??{},i=[];let a=0,s=0,c=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(w=>w.variant)??[],g=p?.abilitiesLogged?.map(w=>w.ability)??[],m=r.filter(w=>!f.includes(w)),h=$l(u),b=h.filter(w=>!g.includes(w));s+=r.length,a+=f.length,d+=h.length,c+=Math.min(g.length,h.length),i.push({species:u,variantsLogged:f,variantsMissing:m,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:b,abilitiesTotal:h.length,abilitiesPercentage:h.length>0?g.length/h.length*100:0,isComplete:m.length===0&&(h.length===0||b.length===0)});}const l=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:d,abilitiesLogged:c,abilitiesPercentage:d>0?c/d*100:0}}async function Nr(e=false){await se.waitForAny();const t=jl(),n=Bb(t);if(!e&&no&&n===Pa)return no;const r={plants:Dl(t),pets:Gl(t),lastUpdated:Date.now()};return no=r,Pa=n,r}async function Wb(){const e=await Nr();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let un=null;function $o(){const e=Wt();e.enabled&&(e.autoRefresh&&!un&&(un=setInterval(async()=>{const t=await Nr();Mi(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function Bl(){un&&(clearInterval(un),un=null);}function Hb(e){const t=Wt();t.enabled=e,jr(t),e?$o():Bl();}function Mi(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function Ub(){const e=await Nr();return Mi(e),e}const zl={init(){this.isReady()||$o();},isReady(){return Ia()},DEFAULT_CONFIG:Rl,STORAGE_KEY:Ei,loadConfig:Wt,saveConfig:jr,isEnabled:Ia,setAutoRefresh:Db,setRefreshInterval:Gb,getMyJournal:jl,getCropVariants:Nl,getPetVariants:Fl,getAllMutations:zb,getPetAbilities:$l,calculateProduceProgress:Dl,calculatePetProgress:Gl,aggregateJournalProgress:Nr,getMissingSummary:Wb,start:$o,stop:Bl,setEnabled:Hb,refresh:Ub,dispatchUpdate:Mi},_i=We.BULK_FAVORITE,Wl={enabled:false,position:"top-right"};function Cn(){return Te(_i,Wl)}function Hl(e){Pe(_i,e);}function Vb(e){const t=Cn();t.position=e,Hl(t);}function Ul(){return Cn().enabled}function Kb(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function qb(e){const t=zt().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!Kb(o))continue;const i=n.has(o.id);e&&i||!e&&!i||(await Rr(o.id,e),r++,await Yb(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function Yb(e){return new Promise(t=>setTimeout(t,e))}let Wn=false;const xr={init(){Wn||(Wn=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return Wn},DEFAULT_CONFIG:Wl,STORAGE_KEY:_i,loadConfig:Cn,saveConfig:Hl,isEnabled:Ul,setPosition:Vb,bulkFavorite:qb,destroy(){Wn=false;}};class Jb{constructor(){ee(this,"achievements",new Map);ee(this,"data");ee(this,"STORAGE_KEY",We.ACHIEVEMENTS);ee(this,"onUnlockCallbacks",[]);ee(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Te(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Pe(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=o>=n.target;return !r&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let pn=null;function $e(){return pn||(pn=new Jb),pn}function Xb(){pn&&(pn=null);}let Hn=false;const Vl={init(){Hn||($e(),Hn=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Hn},getManager(){return $e()},register:(...e)=>$e().register(...e),registerMany:(...e)=>$e().registerMany(...e),isUnlocked:(...e)=>$e().isUnlocked(...e),getAll:()=>$e().getAllAchievements(),getUnlocked:()=>$e().getUnlockedAchievements(),getStats:()=>$e().getCompletionStats(),checkAll:()=>$e().checkAllAchievements(),onUnlock:(...e)=>$e().onUnlock(...e),onProgress:(...e)=>$e().onProgress(...e),destroy(){Xb(),Hn=false;}},Qb={enabled:true},Kl=We.ANTI_AFK,Zb=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],ey=25e3,ty=1,ny=1e-5,te={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function ry(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),te.listeners.push({type:n,handler:r,target:t});};for(const t of Zb)e(document,t),e(window,t);}function oy(){for(const{type:e,handler:t,target:n}of te.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}te.listeners.length=0;}function iy(){const e=Object.getPrototypeOf(document);te.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),te.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),te.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function ay(){const e=Object.getPrototypeOf(document);try{te.savedProps.hidden&&Object.defineProperty(e,"hidden",te.savedProps.hidden);}catch{}try{te.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",te.savedProps.visibilityState);}catch{}try{te.savedProps.hasFocus&&(document.hasFocus=te.savedProps.hasFocus);}catch{}}function wr(){te.audioCtx&&te.audioCtx.state!=="running"&&te.audioCtx.resume?.().catch(()=>{});}function sy(){try{const e=window.AudioContext||window.webkitAudioContext;te.audioCtx=new e({latencyHint:"interactive"}),te.gainNode=te.audioCtx.createGain(),te.gainNode.gain.value=ny,te.oscillator=te.audioCtx.createOscillator(),te.oscillator.frequency.value=ty,te.oscillator.connect(te.gainNode).connect(te.audioCtx.destination),te.oscillator.start(),document.addEventListener("visibilitychange",wr,{capture:!0}),window.addEventListener("focus",wr,{capture:!0});}catch{ql();}}function ql(){try{te.oscillator?.stop();}catch{}try{te.oscillator?.disconnect(),te.gainNode?.disconnect();}catch{}try{te.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",wr,{capture:true}),window.removeEventListener("focus",wr,{capture:true}),te.oscillator=null,te.gainNode=null,te.audioCtx=null;}function ly(){const e=document.querySelector("canvas")||document.body||document.documentElement;te.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},ey);}function cy(){te.heartbeatInterval!==null&&(clearInterval(te.heartbeatInterval),te.heartbeatInterval=null);}function ro(){iy(),ry(),sy(),ly();}function oo(){cy(),ql(),oy(),ay();}let Un=false,Me=false;function At(){return Te(Kl,Qb)}function io(e){Pe(Kl,e);}const ht={init(){if(Un)return;const e=At();Un=true,e.enabled?(ro(),Me=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Un},isRunning(){return Me},isEnabled(){return At().enabled},enable(){const e=At();e.enabled=true,io(e),Me||(ro(),Me=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=At();e.enabled=false,io(e),Me&&(oo(),Me=false,console.log("[MGAntiAfk] Disabled"));},toggle(){ht.isEnabled()?ht.disable():ht.enable();},getConfig(){return At()},updateConfig(e){const n={...At(),...e};io(n),n.enabled&&!Me?(ro(),Me=true):!n.enabled&&Me&&(oo(),Me=false);},destroy(){Me&&(oo(),Me=false),Un=false,console.log("[MGAntiAfk] Destroyed");}},Yl=We.PET_TEAM,dy={enabled:false,teams:[],activeTeamId:null},uy=3,Ea=50,en="";function Se(){return Te(Yl,dy)}function kt(e){Pe(Yl,e);}function py(e){const n={...Se(),...e};return kt(n),n}function fy(){return Se().enabled}function gy(e){py({enabled:e});}function my(){return crypto.randomUUID()}function Do(){return Date.now()}function Jl(e=[]){const t=[...e];for(;t.length<uy;)t.push(en);return [t[0]||en,t[1]||en,t[2]||en]}function Xl(e,t){const n=Se(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function Ql(e,t){const n=Se(),r=[...e].sort().join(",");return !n.teams.some(o=>o.id===t?false:[...o.petIds].sort().join(",")===r)}function Zl(e){const n=Ii().get(),r=new Set(n.all.map(o=>o.id));for(const o of e)if(o!==en&&!r.has(o))return  false;return  true}function hy(e,t=[]){const n=Se();if(n.teams.length>=Ea)throw new Error(`Maximum number of teams (${Ea}) reached`);if(!Xl(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=Jl(t);if(!Zl(o))throw new Error("One or more pet IDs do not exist");if(!Ql(o))throw new Error("A team with this exact composition already exists");const i={id:my(),name:r,petIds:o,createdAt:Do(),updatedAt:Do()};return n.teams.push(i),kt(n),i}function by(e,t){const n=Se(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!Xl(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=Jl(t.petIds);if(!Zl(a))throw new Error("One or more pet IDs do not exist");if(!Ql(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:Do()};return n.teams[r]=i,kt(n),i}function yy(e){const t=Se(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(kt(t),true)}function vy(e){return Se().teams.find(n=>n.id===e)??null}function xy(){return [...Se().teams]}function wy(e){const t=Se(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function ky(e){const t=Se(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),kt(t),true}function Sy(){const t=Ii().get().byLocation.active;if(t.length===0)return null;const n=t.map(o=>o.id).sort(),r=Se();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return o.id}return null}function ec(){const e=Sy(),t=Se();return e!==t.activeTeamId&&(t.activeTeamId=e,kt(t)),e}function Cy(e){const t=Se();t.activeTeamId=e,kt(t);}function Ay(e){return ec()===e}let Vn=false;const Ie={init(){if(Vn)return;if(!Se().enabled){console.log("[PetTeam] Feature disabled");return}Vn=true,console.log("[PetTeam] Feature initialized");},destroy(){Vn&&(Vn=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:fy,setEnabled:gy,createTeam:hy,updateTeam:by,deleteTeam:yy,getTeam:vy,getAllTeams:xy,getTeamByName:wy,reorderTeams:ky,getActiveTeamId:ec,setActiveTeamId:Cy,isActiveTeam:Ay};class tc{constructor(){ee(this,"stats");ee(this,"STORAGE_KEY",We.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Te(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Pe(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Ot=null;function Ty(){return Ot||(Ot=new tc),Ot}function Iy(){Ot&&(Ot.endSession(),Ot=null);}function nc(e){const t=Er(e.xp),n=Mr(e.petSpecies,e.targetScale),r=_r(e.petSpecies,e.xp,n),o=Lr(e.petSpecies,t),i=Cl(e.petSpecies),a=Dm(r,n,i),s=Gm(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function rc(e){return {...e,strength:nc(e)}}function oc(e){return e.map(rc)}function Py(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=oc(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,i=t.length-o,a=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:s}}const Ey=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:nc,enrichPetWithStrength:rc,enrichPetsWithStrength:oc,getPetStrengthStats:Py},Symbol.toStringTag,{value:"Module"}));class ic{constructor(){ee(this,"logs",[]);ee(this,"maxLogs",1e3);ee(this,"unsubscribe",null);ee(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=Or.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let ft=null;function My(){return ft||(ft=new ic,ft.init()),ft}function _y(){ft&&(ft.destroy(),ft=null);}const ac={StatsTracker:tc,getStatsTracker:Ty,destroyStatsTracker:Iy},sc={AbilityLogger:ic,getAbilityLogger:My,destroyAbilityLogger:_y,...Ey},Ly=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:Vl,MGAntiAfk:ht,MGAutoFavorite:Pi,MGBulkFavorite:xr,MGCalculators:Al,MGJournalChecker:zl,MGPetTeam:Ie,MGPets:sc,MGTracker:ac},Symbol.toStringTag,{value:"Module"})),Ma={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},De=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],Oy={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Tt(e){return e?Oy[e]??0:0}class Ry extends $t{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});ee(this,"config",Ma);ee(this,"allPlants",[]);ee(this,"allPets",[]);ee(this,"sectionElement",null);}async build(n){const r=this.createGrid("12px");r.id="auto-favorite-settings";const o=document.createElement("style");o.textContent=`
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
    `,n.appendChild(o),this.sectionElement=r,n.appendChild(r),this.config=Te(We.AUTO_FAVORITE_UI,Ma),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await se.waitForAny(3e3).catch(()=>{}),await Promise.all([se.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),se.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=se.get("plants")||{},r=se.get("pets")||{};this.allPlants=Object.keys(n).sort((o,i)=>{const a=n[o]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=Tt(a)-Tt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,i)=>{const a=r[o]?.rarity||null,s=r[i]?.rarity||null,c=Tt(a)-Tt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(ae.isReady())return;const n=1e4,r=100;let o=0;return new Promise(i=>{const a=()=>{ae.isReady()||o>=n?i():(o+=r,setTimeout(a,r));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=y("div",{className:"kv"}),r=Yo({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=ei({checked:this.config.enabled,onChange:i=>{this.config.enabled=i,this.saveConfig();}});return n.append(r.root,o.root),Ne({title:"Auto-Favorite",padding:"lg"},n,y("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=y("div",{className:"u-col"}),r=y("div",{className:"mut-row"});r.appendChild(this.createMutationButton(De[0])),r.appendChild(this.createMutationButton(De[1])),n.appendChild(r);const o=y("div",{className:"mut-row"});o.appendChild(this.createMutationButton(De[2])),o.appendChild(this.createMutationButton(De[3])),o.appendChild(this.createMutationButton(De[4])),n.appendChild(o);const i=y("div",{className:"mut-row"});i.appendChild(this.createMutationButton(De[5])),i.appendChild(this.createMutationButton(De[6])),n.appendChild(i);const a=y("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(De[7])),a.appendChild(this.createMutationButton(De[8])),n.appendChild(a),Ne({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,y("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${De.length} active`))}createMutationButton(n){let r=this.config.favoriteMutations.includes(n.id);const o=n.color,i=parseInt(o.slice(1,3),16),a=parseInt(o.slice(3,5),16),s=parseInt(o.slice(5,7),16),c=f=>{let g=`rgba(${i}, ${a}, ${s}, 0.25)`,m=o;return n.id==="Rainbow"&&f&&(g="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",m="#fff9c4"),`
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
            `},d=y("div",{className:"mut-btn",style:c(r)}),l=y("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ae.isReady()){const f=ae.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});f.style.width="28px",f.style.height="28px",f.style.objectFit="contain",l.appendChild(f);}}catch{}const u=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),p=y("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},u);if(d.append(l,p),n.id==="Rainbow"||n.id==="Gold"){const f=y("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ae.isReady()){const g=ae.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});g.style.width="28px",g.style.height="28px",g.style.objectFit="contain",f.appendChild(g);}}catch{}d.append(f);}else {const f=y("div",{style:"width: 28px; flex-shrink: 0;"});d.append(f);}return d.addEventListener("click",f=>{f.stopPropagation(),r?(this.config.favoriteMutations=this.config.favoriteMutations.filter(m=>m!==n.id),r=false):(this.config.favoriteMutations.push(n.id),r=true),d.style.cssText=c(r),this.saveConfig();const g=this.sectionElement?.querySelector(".card p");g&&(g.textContent=`${this.config.favoriteMutations.length} / ${De.length} active`);}),d}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:this.config.favoriteProduceList,onUpdate:n=>{this.config.favoriteProduceList=n,this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:this.config.favoritePetsList,onUpdate:n=>{this.config.favoritePetsList=n,this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),d=o;const l=y("div",{style:"margin-bottom: 8px;"}),u=ns({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:k=>{const A=k.trim().toLowerCase();A?d=o.filter(I=>I.toLowerCase().includes(A)):d=o,x.setData(m());}});l.appendChild(u.root);const p=y("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=_t({label:"Select All",variant:"default",size:"sm",onClick:()=>{const k=m().map(A=>A.id);x.setSelection(k);}}),g=_t({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{x.clearSelection();}});p.append(f,g);const m=()=>d.map(k=>({id:k,name:k,rarity:this.getItemRarity(k,i),selected:c.has(k)})),h=k=>{if(!k){const I=y("span",{style:"opacity:0.5;"});return I.textContent="—",I}return rs({variant:"rarity",rarity:k,size:"sm"}).root},b=k=>{const A=y("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(ae.isReady()){let I=i,T=k;i==="plant"&&(["Bamboo","Cactus"].includes(k)&&(I="tallplant"),k==="DawnCelestial"&&(T="DawnCelestialCrop"),k==="MoonCelestial"&&(T="MoonCelestialCrop"),k==="OrangeTulip"&&(T="Tulip"));const L=ae.toCanvas(I,T,{scale:.5});L.style.width="28px",L.style.height="28px",L.style.objectFit="contain",A.appendChild(L);}}catch{}return A},x=ts({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(k,A)=>k.name.localeCompare(A.name,void 0,{numeric:true,sensitivity:"base"}),render:k=>{const A=y("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),I=b(k.id),T=y("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},k.name);return A.append(I,T),A}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(k,A)=>Tt(k.rarity)-Tt(A.rarity),render:k=>h(k.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:k=>k.id,onSelectionChange:k=>{c.clear(),k.forEach(A=>c.add(A)),s(Array.from(c)),C();}}),v=y("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),C=()=>{v.textContent=`${c.size} / ${o.length} selected`;};return C(),Ne({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,x.root,v)}getItemRarity(n,r){try{if(r==="pet")return (se.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=se.get("plants")||{},i=o[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){Pe(We.AUTO_FAVORITE_UI,this.config);try{const{setEnabled:n,updateSimpleConfig:r}=Pi;await r({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled);}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n);}}}function jy(e,t){const n=new MutationObserver(o=>{for(const i of o)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function Ny(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const i of o.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const lc=768,_a=6,ao=62,so=50,Fy=.5,$y=.4,Kn=36,qn=28,Dy=6,Go=4,Gy=8,By=100,zy=200,La=14,Oa=3,Wy=40,Hy=50,Ra=2147483646,tn="gemini-bulk-favorite-sidebar",Uy="gemini-bulk-favorite-top-row",Vy="gemini-bulk-favorite-bottom-row",Bo="gemini-qol-bulkFavorite-styles",Ky=`
/* Desktop: vertical scrollable list next to inventory */
#${tn} {
  display: flex;
  flex-direction: column;
  gap: ${Dy}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Ra};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${Go}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Ra};
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100vw;
}

.gemini-qol-bulkFavorite-row::-webkit-scrollbar {
  height: 3px;
}

.gemini-qol-bulkFavorite-row::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.gemini-qol-bulkFavorite-row::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

#${tn}::-webkit-scrollbar {
  width: 4px;
}

#${tn}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${tn}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${ao}px;
  height: ${ao}px;
  min-width: ${ao}px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  padding: 4px;
  gap: 2px;
}

/* Mobile: smaller buttons */
.gemini-qol-bulkFavorite-btn.mobile {
  width: ${so}px;
  height: ${so}px;
  min-width: ${so}px;
}

.gemini-qol-bulkFavorite-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.gemini-qol-bulkFavorite-btn:active {
  transform: scale(0.96);
}

/* Sprite image */
.gemini-qol-bulkFavorite-sprite {
  width: ${Kn}px;
  height: ${Kn}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${qn}px;
  height: ${qn}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Oa}px;
  right: ${Oa}px;
  width: ${La}px;
  height: ${La}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
}

.gemini-qol-bulkFavorite-heart.filled {
  color: #ff4d4d;
}

.gemini-qol-bulkFavorite-heart.outline {
  color: #ffffff;
  opacity: 0.85;
}

/* Species label */
.gemini-qol-bulkFavorite-label {
  color: #ffffff;
  font-size: 9px;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.1;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-label {
  font-size: 8px;
}

/* Fallback sprite (letter) */
.gemini-qol-bulkFavorite-fallback {
  width: ${Kn}px;
  height: ${Kn}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${qn}px;
  height: ${qn}px;
  font-size: 14px;
}
`,qy='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',Yy='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function Jy(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:i}=e,a=y("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return a.dataset.species=t,a.appendChild(Xy(t,o)),a.appendChild(Qy(r)),a.appendChild(Zy(t)),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),i();}),a}function Xy(e,t){try{if(!ae.isReady()||!ae.has("plant",e))return ja(e);const n=t?$y:Fy,r=ae.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),ja(e)}}function ja(e){return y("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function Qy(e){const t=y("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?qy:Yy,t}function Zy(e){return y("span",{className:"gemini-qol-bulkFavorite-label"},e)}let Ke=null,qe=null,Ve=null,lr=false,fn=null,nn=false,Rt=null;const zo=[];function Yn(e){zo.push(e);}function ev(){for(const e of zo)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}zo.length=0;}function cc(){return window.innerWidth<=lc}function tv(e){return new Promise(t=>setTimeout(t,e))}function dc(){if(lr)return;if(document.getElementById(Bo)){lr=true;return}const e=document.createElement("style");e.id=Bo,e.textContent=Ky,document.head.appendChild(e),lr=true;}function nv(){document.getElementById(Bo)?.remove(),lr=false;}function rv(){const e=zt().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const i=o;if(i.itemType!=="Produce")continue;const a=i.species,s=i.id;if(!a||!s)continue;const c=n.get(a);c?c.push(s):n.set(a,[s]);}const r=[];for(const[o,i]of n){const a=i.length>0&&i.every(s=>t.has(s));r.push({species:o,itemIds:i,allFavorited:a});}return r.sort((o,i)=>o.species.localeCompare(i.species)),r}async function ov(e){const t=zt().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const a of t.items){const s=a;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(a=>a.favorited),i=o?r.filter(a=>a.favorited):r.filter(a=>!a.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${i.length}/${r.length} ${e}`);for(const a of i)Rr(a.id),await tv(Wy);}function Wo(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return Jy({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>ov(n)})}function iv(e){const t=y("div",{id:tn}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-By,zy);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+Gy}px`,t.style.top=`${n.top}px`,t}function Na(e,t,n){const r=y("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+Go}px`:r.style.top=`${o.bottom+Go}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function Fa(){const e=rv();cc()?sv(e):av(e);}function av(e){if(Ke){if(Ke.innerHTML="",e.length===0){Ke.style.display="none";return}Ke.style.display="flex";for(const t of e)Ke.appendChild(Wo(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function sv(e){if(!qe||!Ve)return;if(qe.innerHTML="",Ve.innerHTML="",e.length===0){qe.style.display="none",Ve.style.display="none";return}qe.style.display="flex";const t=e.slice(0,_a),n=e.slice(_a);for(const r of t)qe.appendChild(Wo(r,true));if(n.length>0){Ve.style.display="flex";for(const r of n)Ve.appendChild(Wo(r,true));}else Ve.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function lv(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=lc)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,i=0;const a=e.querySelectorAll(".McFlex, .McGrid");for(const s of a){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const d=c.left+c.width/2,l=1-Math.abs(d-r)/r,p=c.width*c.height*l;p>i&&(o=s,i=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let jt=null;function Ho(){jt&&clearTimeout(jt),jt=setTimeout(()=>{cv();},Hy);}function cv(){const e=lv();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),gn(),dc(),fn=e,cc()?(qe=Na(Uy,e,"top"),Ve=Na(Vy,e,"bottom"),document.body.appendChild(qe),document.body.appendChild(Ve)):(Ke=iv(e),document.body.appendChild(Ke)),Fa(),Rt&&Rt(),Rt=zt().subscribeFavorites(()=>{nn&&Fa();});}function gn(){jt&&(clearTimeout(jt),jt=null),Rt&&(Rt(),Rt=null),Ke?.remove(),Ke=null,qe?.remove(),qe=null,Ve?.remove(),Ve=null,fn=null;}function dv(){gn();}async function Uo(){if(!Cn().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}dc();const t=await ui.onChangeNow(o=>{const i=o==="inventory";i!==nn&&(nn=i,i?Ho():gn());}),n=jy(".McGrid",()=>{nn&&(Ke||qe||Ho());}),r=Ny(".McGrid",o=>{fn&&fn===o&&gn();});Yn(()=>t()),Yn(()=>n.disconnect()),Yn(()=>r.disconnect()),Yn(()=>{gn(),nn=false,fn=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function Vo(){ev(),nv(),console.log("🛑 [BulkFavorite] Stopped");}function uv(e){const t=Cn();t.enabled=e,e?Uo():Vo();}let Jn=false;const Ko={init(){Jn||(Uo(),Jn=true);},destroy(){Jn&&(Vo(),Jn=false);},isEnabled(){return Ul()},renderButton:Ho,removeButton:dv,startWatching:Uo,stopWatching:Vo,setEnabled:uv},$a={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class pv extends $t{constructor(){super({id:"tab-feature-settings",label:"Features"});ee(this,"config",$a);}async build(n){const r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r),this.config=Te(We.CONFIG,$a),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard());}createQOLCard(){return Ne({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig(),Ko.setEnabled(n);}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}))}createVisualIndicatorsCard(){return Ne({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return Ne({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,r,o,i){const a=y("div",{className:i?"kv-col":"kv"}),s=y("div",{className:"kv"}),c=Yo({text:n,tone:"default",size:"md"}),d=ei({checked:r,onChange:o});if(s.append(c.root,d.root),i){a.appendChild(s);const l=y("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){Pe(We.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const fv=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),gv=function(e){return "/"+e},Da={},mv=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");o=c(n.map(d=>{if(d=gv(d),d in Da)return;Da[d]=true;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":fv,l||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})};function rn(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const hv=`
  :host {
    /* Colors tailored to match the game's journal */
    --journal-paper: #FDFBF7;
    --journal-ink: #2D241E;
    --journal-header: #10725A;
    --journal-sub: #5EB292;
    --journal-stamp-bg: #EBDCB2;
    --journal-stamp-border: #D8C7A4;
    --journal-progress-bg: #E0D2B6;
    --journal-progress-from: #FFB800; /* Yellow */
    --journal-progress-to: #34A853;   /* Green */
  }

  .journal-checker-host {
      /* Remove internal scroll to use parent's */
      height: auto;
      overflow: visible;
  }

  /* Force edge-to-edge paper */
  :host-context(.gemini-content),
  .gemini-content:has(.journal-checker-host) {
      padding: 0 !important;
  }

  /* Target Parent Scrollbar */
  :host-context(.gemini-content) ::-webkit-scrollbar,
  .gemini-content:has(.journal-checker-host)::-webkit-scrollbar {
      width: 10px;
  }

  :host-context(.gemini-content) ::-webkit-scrollbar-thumb,
  .gemini-content::-webkit-scrollbar-thumb {
      background: var(--muted);
      border-radius: 8px;
  }

  .journal-content {
    position: relative;
    padding: 56px 16px 84px 16px; /* Multiples of 28px */
    background-color: var(--journal-paper);
    
    /* Scrapbook Lined Paper Background */
    background-image: 
        /* Red Margin Line */
        linear-gradient(90deg, transparent 40px, rgba(239, 68, 68, 0.15) 40px, rgba(239, 68, 68, 0.15) 42px, transparent 42px),
        /* Blue Horizontal Lines - every 28px */
        linear-gradient(rgba(171, 206, 212, 0.25) 1px, transparent 1px);
    background-size: 100% 100%, 100% 28px;
    
    min-height: 100%;
    color: var(--journal-ink);
    font-family: var(--font-game);
    box-shadow: inset 0 0 40px rgba(0,0,0,0.02);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .journal-header {
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    height: 28px;
    line-height: 28px;
    margin-bottom: 28px;
    color: var(--journal-header);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 1px 1px 0px rgba(255,255,255,0.8);
    position: relative;
    z-index: 2;
  }

  .journal-category-stats {
    font-size: 11px;
    font-weight: 800;
    color: var(--journal-sub);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    /* Height and line-height are set inline in OverviewPage */
  }

  .journal-row {
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.1s ease, transform 0.1s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
    margin-bottom: 4px; /* Spacing between cards */
    padding: 0 8px;
    /* height: 56px set inline in OverviewPage */
  }

  .journal-row:hover {
    background: rgba(16, 114, 90, 0.05);
  }

  .journal-row-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 14px;
  }

  .journal-bar-container {
    width: 100%;
    background: var(--journal-progress-bg);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }

  .journal-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--journal-progress-from), var(--journal-progress-to));
    transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Rainbow progress bar for 100% complete (applied inline) */
  @keyframes rainbow-shimmer {
    0% { filter: brightness(1) saturate(1); }
    50% { filter: brightness(1.2) saturate(1.4); }
    100% { filter: brightness(1) saturate(1); }
  }

  .journal-bar-fill.rainbow {
    animation: rainbow-shimmer 2s ease-in-out infinite;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .journal-expand-btn {
    text-align: center;
    padding: 0;
    font-size: 13px;
    font-weight: 700;
    color: var(--journal-header);
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .journal-expand-btn:hover {
    opacity: 1;
    color: var(--journal-sub);
  }

  .journal-back {
    position: absolute;
    top: 14px; /* Centered in the first 28px line area? */
    left: 10px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 900;
    color: white;
    cursor: pointer;
    padding: 4px 8px;
    background: var(--journal-header);
    border-radius: 4px;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    text-transform: uppercase;
  }

  .journal-back:hover {
    background: var(--journal-sub);
    transform: translateY(-1px);
  }

  .journal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    gap: 16px;
    padding: 16px 0;
  }

  .journal-stamp-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 84px; /* 3 lines */
      justify-content: center;
  }

  .journal-stamp {
    width: 50px;
    height: 50px;
    background: var(--journal-stamp-bg);
    border: 1px solid var(--journal-stamp-border);
    border-radius: 4px; /* Square with slight roundness for "stamp" look */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    position: relative;
    transition: transform 0.2s;
    /* Scalloped edge simulation */
    clip-path: polygon(
        0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%
    );
  }

  .journal-stamp:hover {
    transform: rotate(2deg) scale(1.05);
  }

  .journal-stamp-label {
    font-size: 9px;
    font-weight: 800;
    text-align: center;
    margin-top: 4px;
    color: var(--journal-ink);
    text-transform: uppercase;
    line-height: 1.2;
    max-width: 64px;
    height: 28px; /* 1 line */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Scrollbar for species list (when expanded) */
  .journal-species-list::-webkit-scrollbar {
    width: 8px;
  }

  .journal-species-list::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.05);
    border-radius: 4px;
  }

  .journal-species-list::-webkit-scrollbar-thumb {
    background: var(--journal-sub);
    border-radius: 4px;
    transition: background 0.2s;
  }

  .journal-species-list::-webkit-scrollbar-thumb:hover {
    background: var(--journal-header);
  }

  /* ─────────────────────────────────────────────────────────────────────────────
   * Tab Navigation (merged from journal-tabs.css.ts)
   * ───────────────────────────────────────────────────────────────────────────── */
  
  .journal-tabs-container {
    display: flex;
    gap: 4px;
    margin-bottom: 0;
    padding: 0 4px;
  }

  .journal-tab {
    flex: 1;
    max-width: 85px;
    min-height: 11px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
    cursor: pointer;
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-weight: 700;
    font-size: 12px;
    color: white;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 2px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transform: translateY(0);
  }

  .journal-tab:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  .journal-tab:active {
    transform: translateY(0);
  }

  /* All Tab - Teal Theme */
  .journal-tab[data-tab="all"] {
    background: linear-gradient(180deg, #26a69a 0%, #00897b 100%);
    border-left: 1px solid #4db6ac;
    border-right: 1px solid #4db6ac;
    border-top: 2px solid #80cbc4;
  }

  .journal-tab[data-tab="all"].active {
    background: linear-gradient(180deg, #4db6ac 0%, #26a69a 100%);
    box-shadow: 0 -2px 8px rgba(38, 166, 154, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Crops Tab - Green Theme */
  .journal-tab[data-tab="plants"] {
    background: linear-gradient(180deg, #4caf50 0%, #388e3c 100%);
    border-left: 1px solid #66bb6a;
    border-right: 1px solid #66bb6a;
    border-top: 2px solid #81c784;
  }

  .journal-tab[data-tab="plants"].active {
    background: linear-gradient(180deg, #5ec762 0%, #4caf50 100%);
    box-shadow: 0 -2px 8px rgba(76, 175, 80, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Pets Tab - Purple Theme */
  .journal-tab[data-tab="pets"] {
    background: linear-gradient(180deg, #9c27b0 0%, #7b1fa2 100%);
    border-left: 1px solid #ba68c8;
    border-right: 1px solid #ba68c8;
    border-top: 2px solid #ce93d8;
  }

  .journal-tab[data-tab="pets"].active {
    background: linear-gradient(180deg, #ab47bc 0%, #9c27b0 100%);
    box-shadow: 0 -2px 8px rgba(156, 39, 176, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Active State - Raised and Extended for Seamless Connection */
  .journal-tab.active {
    min-height: 29px;
    transform: translateY(-3px);
    margin-bottom: -3px;
    z-index: 2;
  }

  .journal-tab:not(.active) {
    opacity: 0.85;
    filter: brightness(0.9);
  }

  /* Progress Indicator */
  .journal-progress-indicator {
    text-align: right;
    font-family: var(--font-game);
    font-weight: 700;
    font-size: 11px;
    color: var(--journal-sub);
    margin-bottom: 8px;
    padding: 0 8px;
  }

  .journal-progress-indicator .percentage {
    color: var(--journal-header);
  }

  .journal-progress-indicator .count {
    font-size: 10px;
    opacity: 0.9;
  }
`,bv=`
  .journal-see-more {
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }

  .journal-see-more-link {
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--accent, #60a5fa);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    text-decoration: none;
  }

  .journal-see-more-link:hover {
    color: var(--accent, #60a5fa);
    filter: brightness(1.2);
    text-decoration: underline;
  }

  .journal-see-more-link:active {
    transform: scale(0.98);
  }
`;function yv(e){const{count:t,expanded:n=false,onClick:r}=e,o=y("div",{className:"journal-see-more"}),i=y("span",{className:"journal-see-more-link"},lo(t,n));r&&i.addEventListener("click",r),o.appendChild(i);const a=o;return a.setCount=s=>{i.textContent=lo(s,n);},a.setExpanded=s=>{i.textContent=lo(t,s);},a}function lo(e,t){return t?"− Show less":`+ and ${e} more...`}const vv=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",xv={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Ga(e){return e?xv[e]??0:0}function Ba(e,t){try{if(t==="pets")return (se.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (se.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function wv({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const i=y("div",{className:"journal-content"}),a=y("div",{className:"journal-header"},"Garden Journal");if(i.appendChild(a),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=y("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),l=y("span",{className:"percentage"},`Collected ${d}%`),u=y("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(u),i.appendChild(c);}return t==="all"?(i.appendChild(Xn("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),i.appendChild(Xn("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?i.appendChild(Xn("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):i.appendChild(Xn("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),i}function Xn(e,t,n,r,o,i,a=false){const s=y("div",{style:"display: flex; flex-direction: column;"}),c=y("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=y("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=y("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ae.isReady()){const h=n==="plants"?"plant":"pet",b=n==="plants"?"Carrot":"CommonEgg";if(ae.has(h,b)){const w=ae.toCanvas(h,b,{scale:.3});w.style.maxWidth="20px",w.style.maxHeight="20px",w.style.display="block",l.appendChild(w);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=y("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(l,f),s.appendChild(d),a){const h=y("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),b=Math.floor(t.variantsLogged/t.variantsTotal*100),w=y("span",{className:"percentage"},`Collected ${b}%`),x=y("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);h.appendChild(w),h.appendChild(x),s.appendChild(h);}const g=[...t.speciesDetails].sort((h,b)=>{const w=Ba(h.species,n),x=Ba(b.species,n),v=Ga(w)-Ga(x);return v!==0?v:h.species.localeCompare(b.species,void 0,{numeric:true,sensitivity:"base"})}),m=r?g:g.slice(0,5);for(const h of m)c.appendChild(kv(h,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const h=yv({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{i();}});s.appendChild(h);}else s.appendChild(y("div",{style:"height: 28px;"}));return s}function kv(e,t,n){const r=y("div",{className:"journal-row",style:"height: 56px;",onclick:u=>{u.stopPropagation(),n(e,t);}}),o=y("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let p=t==="plants"?"plant":"pet",f=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(f="DawnCelestialCrop"),e.species==="MoonCelestial"&&(f="MoonCelestialCrop"),e.species==="OrangeTulip"&&(f="Tulip"));const g=e.isComplete?["Rainbow"]:[],m=(b,w)=>{try{if(ae.has(b,w))return ae.toCanvas(b,w,{scale:.4,mutations:g})}catch{}return null},h=m(p,f)||(t==="plants"?m("tallplant",f):null)||m(p,f.toLowerCase())||(t==="plants"?m("tallplant",f.toLowerCase()):null);h?(h.style.maxWidth="32px",h.style.maxHeight="32px",h.style.display="block",o.appendChild(h)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(u){console.error(`[JournalChecker] Sprite error for ${e.species}`,u);}const i=y("div",{style:"flex: 1; position: relative; height: 22px;"}),a=y("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const u=vv(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${u};`;}const c=y("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});a.appendChild(c);const d=y("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);i.append(a,d);const l=y("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; ${e.isComplete?"color: var(--journal-header);":""}`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,i,l),r}function Sv({species:e,category:t,onBack:n}){const r=y("div",{className:"journal-content"}),o=y("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const i=y("div",{className:"journal-header"},e.species);r.appendChild(i);const a=y("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(a);const s=y("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((d,l)=>d==="Normal"?-1:l==="Normal"||d==="Max Weight"?1:l==="Max Weight"?-1:d.localeCompare(l));for(const d of c){const l=e.variantsLogged.includes(d);s.appendChild(Cv(e.species,d,t,l));}return r.appendChild(s),r}function Cv(e,t,n,r){const o=y("div",{className:"journal-stamp-wrapper"}),i=y("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const u=(f,g)=>{try{const m=t==="Max Weight"?.72:.6;if(ae.has(f,g))return ae.toCanvas(f,g,{mutations:s,scale:m,boundsMode:"padded"})}catch{}return null},p=u(d,l)||(n==="plants"?u("tallplant",l):null)||u(d,l.toLowerCase())||(n==="plants"?u("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",i.appendChild(p));}catch{}const a=y("div",{className:"journal-stamp-label"},t);return o.append(i,a),o}const Av=`
  .journal-tabs-container {
    display: flex;
    gap: 4px;
    margin-bottom: 0;
    padding: 0 4px;
  }

  .journal-tab {
    flex: 1;
    max-width: 85px;
    min-height: 11px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
    cursor: pointer;
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-weight: 700;
    font-size: 12px;
    color: white;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 2px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transform: translateY(0);
    
    /* Dynamic color from tab index */
    background: linear-gradient(180deg, var(--tab-color) 0%, color-mix(in srgb, var(--tab-color), black 20%) 100%);
    border-left: 1px solid color-mix(in srgb, var(--tab-color), white 20%);
    border-right: 1px solid color-mix(in srgb, var(--tab-color), white 20%);
    border-top: 2px solid color-mix(in srgb, var(--tab-color), white 30%);
  }

  .journal-tab:hover {
    filter: brightness(1.1);
  }

  .journal-tab:active {
    transform: translateY(0);
  }

  /* Tab index color fallbacks */
  .journal-tab[data-tab-index="1"] { --tab-color: var(--journal-tab-1, #26a69a); }
  .journal-tab[data-tab-index="2"] { --tab-color: var(--journal-tab-2, #4caf50); }
  .journal-tab[data-tab-index="3"] { --tab-color: var(--journal-tab-3, #9c27b0); }
  .journal-tab[data-tab-index="4"] { --tab-color: var(--journal-tab-4, #2196f3); }
  .journal-tab[data-tab-index="5"] { --tab-color: var(--journal-tab-5, #ff9800); }

  /* Active State - Raised and Extended */
  .journal-tab.active {
    min-height: 29px;
    transform: translateY(-3px);
    margin-bottom: -3px;
    z-index: 2;
    background: linear-gradient(180deg, 
      color-mix(in srgb, var(--tab-color), white 15%) 0%, 
      var(--tab-color) 100%);
    box-shadow: 0 -2px 8px color-mix(in srgb, var(--tab-color), transparent 70%),
                inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  .journal-tab:not(.active) {
    opacity: 0.85;
  }
`;function Tv(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:i}=e,a=y("button",{className:`journal-tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;a.style.setProperty("--tab-color",s),i&&a.addEventListener("click",i);const c=a;return c.setActive=d=>{d?a.classList.add("active"):a.classList.remove("active");},c.setLabel=d=>{a.textContent=d;},c}const Iv=`
  .journal-progress-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    min-height: 40px;
  }

  .journal-progress-sprite {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .journal-progress-bar-wrapper {
    flex: 1;
    position: relative;
    min-width: 0;
  }

  .journal-progress-label {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--journal-ink, #5E5043);
    z-index: 2;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
    pointer-events: none;
  }

  .journal-progress-track {
    width: 100%;
    height: 24px;
    background: var(--muted, rgba(229,231,235,0.08));
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .journal-progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease, background 0.3s ease;
  }

  .journal-progress-fill.journal-bar-rainbow {
    background-size: 200% 100%;
    animation: rainbow-shimmer 3s linear infinite;
  }

  @keyframes rainbow-shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .journal-progress-pct {
    width: 45px;
    text-align: right;
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--journal-header, #5E5043);
    flex-shrink: 0;
  }
`,Pv={activeTab:"all",expandedCategories:[]};let gt=null;async function Ev(){return gt||(gt=await qo("tab-journal-checker",{version:1,defaults:Pv}),gt)}function Qn(){if(!gt)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return gt}function Zn(){return gt!==null}const Mv=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class _v extends $t{constructor(){super({id:"tab-journal-checker",label:"Journal"});ee(this,"progress",null);ee(this,"currentView",{type:"overview"});}async build(n){this.container=n,await Ev(),await ae.init(),console.log("[JournalChecker] Sprite categories:",ae.getCategories());const r=n.getRootNode();rn(r,hv,"journal-checker-styles"),rn(r,Av,"journal-tab-styles"),rn(r,Iv,"journal-progress-bar-styles"),rn(r,bv,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(i=>{this.progress=i.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await mv(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>Ly);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return Zn()?Qn().get().activeTab:"all"}set activeTab(n){Zn()&&Qn().update({activeTab:n});}get expandedCategories(){return Zn()?new Set(Qn().get().expandedCategories):new Set}setExpandedCategories(n){Zn()&&Qn().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(y("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(wv({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(Sv({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=y("div",{className:"journal-tabs-container"});return Mv.forEach((r,o)=>{const i=Tv({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(i);}),n}}function Lv(e){const t=y("div",{className:"team-list-item"}),n=y("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=y("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=Or.myPets.get(),i=y("div",{className:"team-list-item__sprites"});for(let s=0;s<3;s++){const c=e.team.petIds[s],d=y("div",{className:"team-list-item__sprite-slot"});if(c&&c!==""){const l=o.all.find(u=>u.id===c);if(l)try{const u=ae.toCanvas("pet",l.petSpecies,{mutations:l.mutations,scale:1});u.style.width="100%",u.style.height="100%",u.style.objectFit="contain",d.appendChild(u);}catch(u){console.warn(`[TeamListItem] Failed to render sprite for pet ${l.petSpecies}:`,u);const p=y("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});d.appendChild(p);}else {const u=y("div",{textContent:"?",className:"team-list-item__sprite-placeholder"});d.appendChild(u);}}i.appendChild(d);}const a=y("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});return t.appendChild(n),t.appendChild(r),t.appendChild(i),t.appendChild(a),t}function Ov(e){const t=getComputedStyle(e);if(!/(auto|scroll|overlay)/.test(t.overflowY+t.overflowX))return  false;const n=e.scrollHeight,r=e.clientHeight,o=e.scrollWidth,i=e.clientWidth;return n>r+1||o>i+1}function Rv(e){const t={overflow:e.style.overflow,overflowY:e.style.overflowY,overflowX:e.style.overflowX,touchAction:e.style.touchAction,overscrollBehavior:e.style.overscrollBehavior};e.style.overflow="hidden",e.style.overflowY="hidden",e.style.overflowX="hidden",e.style.touchAction="none",e.style.overscrollBehavior="contain";let n=false;return ()=>{n||(n=true,e.style.overflow=t.overflow,e.style.overflowY=t.overflowY,e.style.overflowX=t.overflowX,e.style.touchAction=t.touchAction,e.style.overscrollBehavior=t.overscrollBehavior);}}function jv(e){const t=[],n=new Set;let r=e;for(;r;){if(r instanceof ShadowRoot){r=r.host;continue}if(r instanceof HTMLElement)!n.has(r)&&r!==e&&Ov(r)&&(t.push(r),n.add(r)),r=r.parentElement??r.parentNode;else break}return document.body&&t.push(document.body),document.documentElement&&t.push(document.documentElement),t.filter((o,i,a)=>a.indexOf(o)===i)}function Nv(e){const n=jv(e).map(Rv);let r=false;return ()=>{if(!r){r=true;for(let o=n.length-1;o>=0;o--)try{n[o]();}catch{}}}}class Fv extends $t{constructor(){super({id:"tab-pets",label:"Pets"});ee(this,"unsubscribeMyPets");ee(this,"lastActiveTeamId",null);ee(this,"dragState",null);ee(this,"listContainer",null);ee(this,"onPointerMove",n=>{if(!this.dragState||!this.listContainer||n.pointerId!==this.dragState.pointerId)return;n.preventDefault();const r=this.listContainer.getBoundingClientRect();let o=n.clientY-r.top-this.dragState.offsetY;const i=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(o=Math.max(-8,Math.min(i+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(n.clientY);});ee(this,"onPointerUp",n=>{!this.dragState||n.pointerId!==this.dragState.pointerId||(n.preventDefault(),this.finishDrag());});ee(this,"onPointerCancel",n=>{!this.dragState||n.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});});}async build(n){this.container=n;const r=this.createGrid("12px");r.id="pets",n.appendChild(r),this.renderContent(),this.unsubscribeMyPets=Or.myPets.subscribeStable(()=>{const o=Ie.getActiveTeamId();o!==this.lastActiveTeamId&&(this.lastActiveTeamId=o,this.renderContent());}),this.lastActiveTeamId=Ie.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.cleanupDrag();}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}updatePlaceholderPosition(n){if(!this.dragState||!this.listContainer)return;const{placeholder:r,itemEl:o}=this.dragState,i=Array.from(this.listContainer.children).filter(c=>c!==o&&c!==r&&c instanceof HTMLElement&&c.classList.contains("team-list-item")),a=new Map;i.forEach(c=>{a.set(c,c.getBoundingClientRect().top);});let s=false;for(const c of i){const d=c.getBoundingClientRect(),l=d.top+d.height/2;if(n<l){r.nextSibling!==c&&this.listContainer.insertBefore(r,c),s=true;break}}s||this.listContainer.appendChild(r),i.forEach(c=>{const d=a.get(c),l=c.getBoundingClientRect().top;if(d!==void 0&&d!==l){const u=d-l;c.style.transform=`translateY(${u}px)`,c.style.transition="none",c.offsetHeight,c.style.transition="transform 0.14s ease",c.style.transform="translateY(0)";}});}startDrag(n,r,o){if(this.dragState||!this.listContainer)return;n.preventDefault();const a=Ie.getAllTeams().findIndex(p=>p.id===o);if(a===-1)return;const s=r.getBoundingClientRect(),c=this.listContainer.getBoundingClientRect(),d=r.cloneNode(true);d.classList.add("team-list-item--placeholder"),d.classList.remove("team-list-item--dragging");const l=r.style.touchAction;r.style.touchAction="none";const u=Nv(r);if(this.dragState={itemEl:r,pointerId:n.pointerId,placeholder:d,offsetY:n.clientY-s.top,fromIndex:a,teamId:o,captureTarget:r,touchActionPrev:l,releaseScrollLock:u},r.classList.add("team-list-item--dragging"),r.style.width=`${s.width}px`,r.style.height=`${s.height}px`,r.style.left=`${s.left-c.left}px`,r.style.top=`${s.top-c.top}px`,r.style.position="absolute",r.style.zIndex="30",r.style.pointerEvents="none",this.listContainer.style.position||(this.listContainer.style.position="relative"),this.listContainer.insertBefore(d,r.nextSibling),this.listContainer.classList.add("is-reordering"),r.setPointerCapture)try{r.setPointerCapture(n.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}finishDrag(n={}){if(!this.dragState||!this.listContainer)return;const{revert:r=false}=n,{itemEl:o,placeholder:i,fromIndex:a,teamId:s,touchActionPrev:c,releaseScrollLock:d,pointerId:l}=this.dragState;if(this.listContainer.classList.remove("is-reordering"),o.hasPointerCapture(l))try{o.releasePointerCapture(l);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const f=Array.from(this.listContainer.children).filter(g=>g!==o&&g!==i&&g instanceof HTMLElement&&g.classList.contains("team-list-item"))[a]||null;f?this.listContainer.insertBefore(i,f):this.listContainer.appendChild(i);}else {const p=Array.from(this.listContainer.children).filter(g=>g!==o),f=p.indexOf(i);if(f!==-1){const g=p[f];g!==i&&this.listContainer.insertBefore(i,g);}}if(i.replaceWith(o),i.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=c??"",Array.from(this.listContainer.children).filter(p=>p instanceof HTMLElement&&p.classList.contains("team-list-item")).forEach(p=>{p.style.transform="",p.style.transition="";}),d?.(),!r){const f=Array.from(this.listContainer.children).filter(g=>g instanceof HTMLElement&&g.classList.contains("team-list-item")).indexOf(o);if(f!==-1&&f!==a){const m=Ie.getAllTeams().slice(),[h]=m.splice(a,1);m.splice(f,0,h);const b=m.map(x=>x.id);Ie.reorderTeams(b)?console.log("[PetsSection] Teams reordered successfully"):console.warn("[PetsSection] Failed to reorder teams");}}this.dragState=null;}renderContent(){if(!this.container)return;const n=this.container.querySelector("#pets");n&&(console.log("[PetsSection] Rendering content..."),n.innerHTML="",n.appendChild(this.createTeamCard()),console.log("[PetsSection] Content rendered"));}createTeamCard(){const n=Ne({title:"Team",expandable:true,defaultExpanded:true}),r=Ie.isEnabled();if(console.log("[PetsSection] Feature enabled:",r),!r){const d=y("div",{styles:{textAlign:"center"}}),l=y("div",{textContent:"Pet Team feature is disabled",styles:{color:"var(--muted)",fontSize:"14px",marginBottom:"12px"}}),u=_t({label:"Enable Feature",onClick:()=>{Ie.setEnabled(true),this.renderContent();}});return d.appendChild(l),d.appendChild(u),n.appendChild(d),n}const o=Ie.getAllTeams(),i=Ie.getActiveTeamId();if(console.log("[PetsSection] Teams:",o),console.log("[PetsSection] Active team ID:",i),o.length===0){const d=y("div",{textContent:"No teams yet. Create your first team!",styles:{color:"var(--muted)",textAlign:"center",fontSize:"14px"}});n.appendChild(d);}else this.listContainer=y("div",{styles:{display:"flex",flexDirection:"column",gap:"12px",position:"relative"}}),o.forEach(d=>{const l=i===d.id,u=Lv({team:d,isActive:l});u.addEventListener("pointerdown",p=>{p.button===0&&this.startDrag(p,u,d.id);}),this.listContainer.appendChild(u);}),n.appendChild(this.listContainer);const a=y("div",{styles:{display:"flex",gap:"8px",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid var(--border)"}}),s=_t({label:"+ Create New Team",onClick:()=>{console.log("[PetsSection] Create team clicked (not implemented yet)");},disabled:true}),c=_t({label:"🗑️ Delete",onClick:()=>{console.log("[PetsSection] Delete team clicked (not implemented yet)");},variant:"danger",disabled:true});return a.appendChild(s),a.appendChild(c),n.appendChild(a),n}}const $v={Store:{select:pe.select.bind(pe),set:pe.set.bind(pe),subscribe:pe.subscribe.bind(pe),subscribeImmediate:pe.subscribeImmediate.bind(pe)},Globals:Or,Modules:{Version:fs,Assets:Dt,Manifest:nt,Data:se,Environment:ot,CustomModal:el,Sprite:ae,Tile:it,Pixi:ki,Audio:bl,Cosmetic:vl},Features:{AutoFavorite:Pi,JournalChecker:zl,BulkFavorite:xr,Achievements:Vl,Tracker:ac,AntiAfk:ht,Calculators:Al,Pets:sc,PetTeam:Ie},WebSocket:{chat:Uh,emote:Vh,wish:Kh,kickPlayer:qh,setPlayerData:Yh,usurpHost:Jh,reportSpeakingStart:Xh,setSelectedGame:Qh,voteForGame:Zh,requestGame:eb,restartGame:tb,ping:nb,checkWeatherStatus:ib,move:rb,playerPosition:_l,teleport:ob,moveInventoryItem:ab,dropObject:sb,pickupObject:lb,toggleFavoriteItem:Rr,putItemInStorage:cb,retrieveItemFromStorage:db,moveStorageItem:ub,logItems:pb,plantSeed:fb,waterPlant:gb,harvestCrop:mb,sellAllCrops:hb,purchaseDecor:bb,purchaseEgg:yb,purchaseTool:vb,purchaseSeed:xb,plantEgg:wb,hatchEgg:kb,plantGardenPlant:Sb,potPlant:Cb,mutationPotion:Ab,pickupDecor:Tb,placeDecor:Ib,removeGardenObject:Pb,placePet:Eb,feedPet:Mb,petPositions:_b,swapPet:Lb,storePet:Ob,namePet:Rb,sellPet:jb},_internal:{getGlobals:Qe,initGlobals:Pl,destroyGlobals:Rh}};function Dv(){const e=M;e.Gemini=$v,e.MGSprite=ae,e.MGData=se,e.MGPixi=ki,e.MGAssets=Dt,e.MGEnvironment=ot;}let co=null;function Gv(){return co||(co=new mf),co}function Bv(e){return [new Id(e),new pv,new Ry,new _v,new Fv]}async function zv(){await Gv().preload();}function Wv(e){const{shadow:t,initialOpen:n}=e,r=y("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=y("div",{className:"gemini-tabbar"}),i=y("div",{className:"gemini-content",id:"content"}),a=y("div",{className:"gemini-resizer",title:"Resize"}),s=y("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const c=y("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:i,resizer:a,closeButton:s,wrapper:c}}function Hv(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,d=s;function l(){const v=ot.detect(),C=Math.round(M.visualViewport?.width??M.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){const k=getComputedStyle(r.host),A=parseFloat(k.getPropertyValue("--inset-l"))||0,I=parseFloat(k.getPropertyValue("--inset-r"))||0,T=Math.max(280,C-Math.round(A+I));c=280,d=T;}else c=a,d=s;return {min:c,max:d}}function u(v){return Math.max(c,Math.min(d,Number(v)||i))}function p(v){const C=u(v);n.style.setProperty("--w",`${C}px`),o(C);}l();const f=ot.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const h=v=>{if(!m)return;v.preventDefault();const C=Math.round(M.innerWidth-v.clientX);p(C);},b=()=>{m&&(m=false,document.body.style.cursor="",M.removeEventListener("mousemove",h),M.removeEventListener("mouseup",b));},w=v=>{g&&(v.preventDefault(),m=true,document.body.style.cursor="ew-resize",M.addEventListener("mousemove",h),M.addEventListener("mouseup",b));};t.addEventListener("mousedown",w);function x(){t.removeEventListener("mousedown",w),M.removeEventListener("mousemove",h),M.removeEventListener("mouseup",b);}return {calculateResponsiveBounds:l,constrainWidthToLimits:u,setHudWidth:p,destroy:x}}function Uv(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const d=t.classList.contains("open");if(i&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const Vv=`
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
`,Kv=`
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
`,qv=`
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
`,Yv=`
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
`,Jv=`
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
  
`,Xv=`
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
`,Qv=`
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
`,Zv=`
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
`,ex=`
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
`,tx=`
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
`,nx=`
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
`,rx=`
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
`,ox=`
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
`,ix=`
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
`,ax=`
.team-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: var(--soft);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: grab;
  transition: all 0.15s ease, transform 0.2s ease;
  position: relative;
}

.team-list-item:not(:last-child) {
  margin-bottom: 12px;
}

.team-list-item:hover {
  background-color: var(--tab-bg);
}

.team-list-item--dragging {
  opacity: 0.5;
  cursor: grabbing;
  transform: scale(1.02);
  box-shadow: 0 4px 12px color-mix(in oklab, var(--shadow) 30%, transparent);
}

.team-list-item--drag-over {
  border-color: var(--accent);
  background-color: color-mix(in oklab, var(--accent) 10%, var(--soft));
}

.team-list-item--grabbing {
  cursor: grabbing;
}

.team-list-item__indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.team-list-item__indicator--active {
  background-color: #4ade80;
  opacity: 1;
}

.team-list-item__indicator--inactive {
  background-color: var(--muted);
  opacity: 0.5;
}

.team-list-item__name {
  flex: 1;
  font-size: 14px;
  color: var(--fg);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.team-list-item__name--active {
  font-weight: 600;
}

.team-list-item__name--inactive {
  font-weight: 400;
}

.team-list-item__sprites {
  display: flex;
  gap: 4px;
  align-items: center;
  flex-shrink: 0;
}

.team-list-item__sprite-slot {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    color-mix(in oklab, var(--bg) 50%, transparent) 0%,
    color-mix(in oklab, var(--bg) 80%, transparent) 100%
  );
  border: 1px solid color-mix(in oklab, var(--border) 40%, transparent);
  box-shadow:
    inset 0 2px 4px color-mix(in oklab, var(--shadow) 25%, transparent),
    inset 0 -1px 2px color-mix(in oklab, var(--bg) 20%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.team-list-item__sprite-placeholder {
  font-size: 16px;
  opacity: 0.5;
}

.team-list-item__drag-handle {
  font-size: 16px;
  color: var(--fg);
  opacity: 0.6;
  cursor: grab;
  user-select: none;
  line-height: 1;
  padding: 0 4px;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.team-list-item:hover .team-list-item__drag-handle {
  opacity: 1;
}

.team-list-item__drag-handle:active,
.team-list-item--grabbing .team-list-item__drag-handle {
  cursor: grabbing;
}

.team-list-item--placeholder {
  border-style: dashed !important;
  border-color: color-mix(in oklab, var(--accent) 58%, var(--border)) !important;
  background: color-mix(in oklab, var(--accent) 22%, transparent) !important;
  box-shadow: none !important;
  opacity: 1;
  pointer-events: none;
  visibility: visible !important;
}

.team-list-item--placeholder * {
  visibility: hidden;
}
`,sx=`
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
`,lx=`
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
`,cx=`
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
`,dx=`
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
`,ux=`
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
`,px=`
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
`,fx=`
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
`,gx={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function mx(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,gx),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function hx(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function bx(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=P=>P.ctrlKey&&P.shiftKey&&P.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:h,shadow:b}=mx(t),w=[[Kv,"variables"],[qv,"primitives"],[Yv,"utilities"],[Vv,"hud"],[Jv,"card"],[Xv,"badge"],[Qv,"button"],[Zv,"input"],[ex,"label"],[tx,"navTabs"],[nx,"searchBar"],[rx,"select"],[ox,"switch"],[ix,"table"],[ax,"teamListItem"],[sx,"timeRangePicker"],[lx,"tooltip"],[cx,"slider"],[dx,"reorderableList"],[ux,"colorPicker"],[px,"log"],[fx,"settings"]];for(let P=0;P<w.length;P++){const[O,G]=w[P];rn(b,O,G),P%5===4&&await hx();}const{panel:x,tabbar:v,content:C,resizer:k,closeButton:A,wrapper:I}=Wv({shadow:b,initialOpen:r});function T(P){x.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:P},bubbles:true})),i?.(P);}function L(P){const O=x.classList.contains("open");x.classList.toggle("open",P),x.setAttribute("aria-hidden",P?"false":"true"),P!==O&&T(P);}L(r),A.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation(),L(false);});const _=vd({host:h,themes:a,initialTheme:s,onThemeChange:c}),F=Hv({resizer:k,host:h,shadow:b,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});F.setHudWidth(n);const Z=d({applyTheme:_.applyTheme,initialTheme:s,getCurrentTheme:_.getCurrentTheme,setHUDWidth:F.setHudWidth,setHUDOpen:L}),D=new Ic(Z,C,{applyTheme:_.applyTheme,getCurrentTheme:_.getCurrentTheme}),Y=Z.map(P=>({id:P.id,label:P.label})),ue=l&&Z.some(P=>P.id===l)?l:Y[0]?.id||"",B=Tc(Y,ue,P=>{D.activate(P),u?.(P);});B.root.style.flex="1 1 auto",B.root.style.minWidth="0",v.append(B.root,A),ue&&D.activate(ue);const $=Uv({panel:x,onToggle:()=>L(!x.classList.contains("open")),onClose:()=>L(false),toggleCombo:p,closeOnEscape:f}),N=()=>{B.recalc();const P=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;F.calculateResponsiveBounds(),F.setHudWidth(P);};M.addEventListener("resize",N);const R=P=>{const O=P.detail?.width;O?F.setHudWidth(O):F.setHudWidth(n),B.recalc();};h.addEventListener("gemini:layout-resize",R);function j(){$.destroy(),F.destroy(),M.removeEventListener("resize",N),h.removeEventListener("gemini:layout-resize",R);}return {host:h,shadow:b,wrapper:I,panel:x,content:C,setOpen:L,setWidth:F.setHudWidth,sections:Z,manager:D,nav:B,destroy:j}}const on={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},er={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function yx(){return {isOpen:Te(on.isOpen,er.isOpen),width:Te(on.width,er.width),theme:Te(on.theme,er.theme),activeTab:Te(on.activeTab,er.activeTab)}}function tr(e,t){Pe(on[e],t);}const vx="https://i.imgur.com/IMkhMur.png",xx="Stats";function wx(e){let t=e.iconUrl||vx;const n=e.ariaLabel||"Open MGH";let r=null,o=null,i=null,a=false,s=null,c=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],l=x=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(x):x.replace(/"/g,'\\"')}catch{return x}};function u(){const x=document.querySelector(d.map(C=>`button[aria-label="${l(C)}"]`).join(","));if(!x)return null;let v=x.parentElement;for(;v&&v!==document.body;){if(d.reduce((k,A)=>k+v.querySelectorAll(`button[aria-label="${l(A)}"]`).length,0)>=2)return v;v=v.parentElement;}return null}function f(x){const v=Array.from(x.querySelectorAll("button[aria-label]"));if(!v.length)return {refBtn:null,refWrapper:null};const C=v.filter(F=>F.dataset.mghBtn!=="true"&&(F.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=C.length?C:v,A=k.find(F=>(F.getAttribute("aria-label")||"").toLowerCase()===xx.toLowerCase())||null,I=k.length>=2?k.length-2:k.length-1,T=A||k[I],L=T.parentElement,_=L&&L.parentElement===x&&L.tagName==="DIV"?L:null;return {refBtn:T,refWrapper:_}}function g(x,v,C){const k=x.cloneNode(false);k.type="button",k.setAttribute("aria-label",v),k.title=v,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");const A=document.createElement("img");return A.src=C,A.alt="MGH",A.style.pointerEvents="none",A.style.userSelect="none",A.style.width="76%",A.style.height="76%",A.style.objectFit="contain",A.style.display="block",A.style.margin="auto",k.appendChild(A),k.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.();}catch{}}),k}function m(){if(a)return  false;a=true;let x=false;try{const v=u();if(!v)return !1;s!==v&&(s=v);const{refBtn:C,refWrapper:k}=f(v);if(!C)return !1;o=v.querySelector('div[data-mgh-wrapper="true"]'),!o&&k&&(o=k.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),x=!0);const A=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=A),r||(r=g(C,n,t),o?o.appendChild(r):r.parentElement!==v&&v.appendChild(r),x=!0),o&&o.parentElement!==v&&(v.appendChild(o),x=!0);const I=v;if(I&&I!==c){try{w.disconnect();}catch{}c=I,w.observe(c,{childList:!0,subtree:!0});}return x}finally{a=false;}}const h=document.getElementById("App")||document.body;let b=null;const w=new MutationObserver(x=>{const v=x.every(k=>{const A=Array.from(k.addedNodes||[]),I=Array.from(k.removedNodes||[]),T=A.concat(I);if(T.length===0){const L=k.target;return o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))}return T.every(L=>!!(!(L instanceof HTMLElement)||o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))))}),C=x.some(k=>Array.from(k.removedNodes||[]).some(A=>A instanceof HTMLElement?!!(o&&(A===o||o.contains(A))||r&&(A===r||r.contains(A))):false));v&&!C||b===null&&(b=window.setTimeout(()=>{if(b=null,m()&&o){const A=o.parentElement;A&&A.lastElementChild!==o&&A.appendChild(o);}},150));});return m(),w.observe(h,{childList:true,subtree:true}),i=()=>w.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const uc=[];function kx(){return uc.slice()}function Sx(e){uc.push(e);}function pc(e){try{return JSON.parse(e)}catch{return}}function za(e){if(typeof e=="string"){const t=pc(e);return t!==void 0?t:e}return e}function fc(e){if(e!=null){if(typeof e=="string"){const t=pc(e);return t!==void 0?fc(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function Cx(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function V(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,s)=>{if(fc(a)!==e)return;const d=o(a,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return Sx(i),i}const Kt=new WeakSet,Wa=new WeakMap;function Ax(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:kx();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const m of r){const h=m(g,o(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(g=h.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,c=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Kt.has(f))return  true;const g=f.bind(p);function m(...h){const b=h.length===1?h[0]:h,w=za(b),x=i(w,Cx(t));if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",w);return}if(x?.kind==="replace"){const v=x.message;return h.length>1&&Array.isArray(v)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",v),g(...v)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",v),g(v))}return g(...h)}Kt.add(m),Wa.set(m,f);try{p.sendMessage=m,Kt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Kt.has(f))return;function g(m){const h=za(m),b=i(h,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(b?.kind==="replace"){const w=b.message,x=typeof w=="string"||w instanceof ArrayBuffer||w instanceof Blob?w:JSON.stringify(w);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",w),f.call(this,x)}return f.call(this,m)}Kt.add(g),Wa.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const gc=[];function Tx(){return gc.slice()}function Ha(e){gc.push(e);}function Ix(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Px(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const uo=Symbol.for("ariesmod.ws.handlers.patched");function be(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return Ha(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Ha(r),r}function Ex(e,t=Tx(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[uo])return ()=>{};e[uo]=true;const i={ws:e,pageWindow:r,debug:o},a=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,i)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=Px(u.data),f=Ix(p);a({kind:"message",raw:u.data,data:p,type:f});},c=u=>{a({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>a({kind:"open",event:u}),l=u=>a({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[uo];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();be(He.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});be(He.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});be(He.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});be(He.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});be(He.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});be(He.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});be(He.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});be(He.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});be(He.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});be(He.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});be(et.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});be(et.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});be(et.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});be(et.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});be(et.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});be(et.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});be(et.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});be(et.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});V(E.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));V(E.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));V(E.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));V(E.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));V(E.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));V(E.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));V(E.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));V(E.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));V(E.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));V(E.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));V(E.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));V(E.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));V(E.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));V(E.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));V(E.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));V(E.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));V(E.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));V(E.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));V(E.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));V(E.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));V(E.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));V(E.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));V(E.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));V(E.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));V(E.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));V(E.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));V(E.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));V(E.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));V(E.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));V(E.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));V(E.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");V(E.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));V(E.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));V(E.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));V(E.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));V(E.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));V(E.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));V(E.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));V(E.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));V(E.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));V(E.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));V(E.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));V(E.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));V(E.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));V(E.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));V(E.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));V(E.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function Mx(e={}){const t=e.pageWindow??M,n=e.pollMs??500,r=!!e.debug,o=[];o.push($h(t,{debug:r})),o.push(Ax({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=Ex(s,e.handlers,{debug:r,pageWindow:t}));};return a(vr(t).ws),o.push(Ml(s=>a(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>vr(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let nr=null;function _x(e={}){return nr||(nr=Mx(e),nr)}function Lx(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Ml(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),_x({debug:false}),()=>{t?.(),t=null;}}async function Ox(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Tf(),await kf({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function Rx(e){e.logStep("Globals","Initializing global variables...");try{Pl(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function jx(e){e.logStep("API","Exposing Gemini API...");try{Dv(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function po(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Nx(e){e.logStep("HUD","Loading HUD preferences..."),await po();const t=yx();await po();const n=await bx({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>tr("width",r),onOpenChange:r=>tr("isOpen",r),themes:Et,initialTheme:t.theme,onThemeChange:r=>tr("theme",r),buildSections:r=>Bv({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>tr("activeTab",r)});return await po(),e.logStep("HUD","HUD ready","success"),n}async function Fx(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await hm(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function $x(e){e.logStep("Sprites","Warming up sprite cache...");try{ae.isReady()||await ae.init();const t=[],n=se.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const r=se.get("pets");if(r)for(const a of Object.values(r))a?.spriteId&&t.push(a.spriteId);const o=[...new Set(t)],i=o.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await ae.warmup(o,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function Dx(e){e.logStep("Sections","Preloading UI sections...");try{await zv(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function Gx(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:ht.init.bind(ht)},{name:"PetTeam",init:Ie.init.bind(Ie)},{name:"BulkFavorite",init:xr.init.bind(xr)}],n=[{name:"BulkFavoriteInject",init:Ko.init.bind(Ko)}];let r=0;for(const i of t)try{i.init(),r++,e.logStep("Features",`Initializing features... (${r}/${t.length})`,"info");}catch(a){e.logStep("Features",`Initializing features... (${r}/${t.length}) - ${i.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${i.name} init failed`,a);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("UIInjections","Initializing UI injections...");let o=0;for(const i of n)try{i.init(),o++;}catch(a){console.warn(`[Bootstrap] UI injection ${i.name} init failed`,a);}e.logStep("UIInjections",`UI injections initialized (${o}/${n.length})`,"success");}Ns();yf();(async function(){Pc();const e=Ac({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=Lx(e),await Ox(e),Rx(e),jx(e),await Promise.all([Fx(e),(async()=>{await $x(e);})(),(async()=>{await Dx(e);})(),(async()=>{Gx(e);})()]),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await Nx(e);wx({onClick:()=>n.setOpen(true)});})();

})();