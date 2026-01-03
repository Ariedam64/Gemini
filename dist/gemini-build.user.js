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
  var yl=Object.defineProperty;var vl=(e,t,n)=>t in e?yl(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var ie=(e,t,n)=>vl(e,typeof t!="symbol"?t+"":t,n);function w(e,t=null,...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(const r of n)r==null||r===false||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}const fn="https://i.imgur.com/k5WuC32.png",Xo="gemini-loader-style",at="gemini-loader",Qi=80;function xl(){if(document.getElementById(Xo))return;const e=document.createElement("style");e.id=Xo,e.textContent=`
    /* ===== Loader Variables ===== */
    #${at} {
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
    #${at} {
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

    #${at}.gemini-loader--error .gemini-loader__actions {
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
    #${at}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${at}.gemini-loader--error .gemini-loader__spinner {
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
      #${at} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e);}function gn(e,t,n){const o=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>Qi;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function wl(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(fn);return}GM_xmlhttpRequest({method:"GET",url:fn,responseType:"blob",onload:t=>{const n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(fn),o.readAsDataURL(n);},onerror:()=>e(fn)});})}function Sl(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;xl();const n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=w("div",{className:"gemini-loader__logs"}),r=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=w("div",{className:"gemini-loader__spinner"},r);wl().then(h=>{r.src=h;});const a=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},i,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=w("div",{id:at},a);(document.body||document.documentElement).appendChild(s);const c=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const u=h=>{n.textContent=h;},l=new Map,d=(h,b)=>{h.className=`gemini-loader__log ${b}`;};return {log:(h,b="info")=>gn(o,h,b),logStep:(h,b,S="info")=>{const v=String(h||"").trim();if(!v){gn(o,b,S);return}const y=l.get(v);if(y){y.el.lastElementChild&&(y.el.lastElementChild.textContent=b),y.tone!==S&&(d(y.el,S),y.tone=S);return}const C=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:b}));for(l.set(v,{el:C,tone:S}),o.appendChild(C);o.childElementCount>Qi;){const x=o.firstElementChild;if(!x)break;const A=Array.from(l.entries()).find(([,P])=>P.el===x)?.[0];A&&l.delete(A),x.remove();}o.scrollTop=o.scrollHeight;},setSubtitle:u,succeed:(h,b=600)=>{h&&gn(o,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b);},fail:(h,b)=>{gn(o,h,"error"),u("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,b);}}}function kl(e,t,n){const o=w("div",{className:"lg-pill",id:"pill"}),r=e.map(l=>{const d=w("button",{className:"lg-tab"},l.label);return d.setAttribute("data-target",l.id),d}),i=w("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=i;i.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),i.scrollLeft+=l.deltaY);},{passive:false});function s(l){const d=i.getBoundingClientRect(),p=r.find(C=>C.dataset.target===l)||r[0];if(!p)return;const f=p.getBoundingClientRect(),g=f.left-d.left,m=f.width;o.style.width=`${m}px`,o.style.transform=`translateX(${g}px)`;const h=i.scrollLeft,b=h,S=h+i.clientWidth,v=g-12,y=g+m+12;v<b?i.scrollTo({left:v,behavior:"smooth"}):y>S&&i.scrollTo({left:y-i.clientWidth,behavior:"smooth"});}let c=t||(e[0]?.id??"");function u(l){c=l,r.forEach(d=>d.classList.toggle("active",d.dataset.target===l)),s(l),n(l);}return r.forEach(l=>l.addEventListener("click",()=>u(l.dataset.target))),queueMicrotask(()=>s(c)),{root:a,activate:u,recalc:()=>s(c),getActive:()=>c}}class on{constructor(t){ie(this,"id");ie(this,"label");ie(this,"container",null);ie(this,"cleanupFunctions",[]);ie(this,"preloadedContent",null);ie(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=w("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const o=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Cl{constructor(t,n,o){ie(this,"sections");ie(this,"activeId",null);ie(this,"container");ie(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const vt="gemini:",Ye={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",CONFIG:"feature:config"};function _e(e,t){try{const n=e.startsWith(vt)?e:vt+e,o=GM_getValue(n);return o==null?t:typeof o=="string"?JSON.parse(o):o}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Ge(e,t){try{const n=e.startsWith(vt)?e:vt+e,o=e.startsWith(vt)?e.slice(vt.length):e,r=JSON.stringify(t);GM_setValue(n,r),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:o,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Al(){try{const e="gemini:",t=[];for(let r=0;r<localStorage.length;r++){const i=localStorage.key(r);i&&i.startsWith(e)&&t.push(i);}for(const r of t)try{const i=localStorage.getItem(r);if(i!==null){const a=JSON.parse(i),s=r.slice(e.length);Ge(s,a),console.log(`[Gemini Storage] Migrated key: ${r}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${r}":`,i);}const n="gemini.sections",o=GM_getValue(n);o!=null&&(Ge("sections",o),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Zi="gemini.sections";function ea(){const e=_e(Zi,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Tl(e){Ge(Zi,e);}async function Pl(e){return ea()[e]}function Il(e,t){const n=ea();Tl({...n,[e]:t});}function Qo(e,t){return {...e,...t??{}}}async function Ml(e){const t=await Pl(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((u=>JSON.parse(JSON.stringify(u)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){Il(e.path,n);}function i(){return n}function a(u){n=e.sanitize?e.sanitize(u):u,r();}function s(u){const d=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof u=="function"?u(d):Object.assign(d,u),n=e.sanitize?e.sanitize(d):d,r();}function c(){r();}return {get:i,set:a,update:s,save:c}}async function ta(e,t){const{path:n=e,...o}=t;return Ml({path:n,...o})}let El=0;const mn=new Map;function Ae(e={},...t){const{id:n,className:o,variant:r="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:u,mediaTop:l,title:d,subtitle:p,badge:f,actions:g,footer:m,divider:h=false,tone:b="neutral",stateKey:S}=e,v=w("div",{className:"card",id:n,tabIndex:a?0:void 0});v.classList.add(`card--${r}`,`card--p-${i}`),a&&v.classList.add("card--interactive"),b!=="neutral"&&v.classList.add(`card--tone-${b}`),o&&v.classList.add(...o.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");const y=s?S??n??(typeof d=="string"?`title:${d}`:null):null;let C=!s||c;y&&mn.has(y)&&(C=!!mn.get(y));let x=null,A=null,P=null,T=null,_=null;const L=n?`${n}-collapse`:`card-collapse-${++El}`,F=()=>{if(T!==null&&(cancelAnimationFrame(T),T=null),_){const D=_;_=null,D();}},ee=(D,$)=>{if(!P)return;F();const R=P;if(R.setAttribute("aria-hidden",String(!D)),!$){R.classList.remove("card-collapse--animating"),R.style.display=D?"":"none",R.style.height="",R.style.opacity="";return}if(R.classList.add("card-collapse--animating"),R.style.display="",D){R.style.height="auto";const j=R.scrollHeight;if(!j){R.classList.remove("card-collapse--animating"),R.style.display="",R.style.height="",R.style.opacity="";return}R.style.height="0px",R.style.opacity="0",R.offsetHeight,T=requestAnimationFrame(()=>{T=null,R.style.height=`${j}px`,R.style.opacity="1";});}else {const j=R.scrollHeight;if(!j){R.classList.remove("card-collapse--animating"),R.style.display="none",R.style.height="",R.style.opacity="";return}R.style.height=`${j}px`,R.style.opacity="1",R.offsetHeight,T=requestAnimationFrame(()=>{T=null,R.style.height="0px",R.style.opacity="0";});}const N=()=>{R.classList.remove("card-collapse--animating"),R.style.height="",D||(R.style.display="none"),R.style.opacity="";};let I=null;const O=j=>{j.target===R&&(I!==null&&(clearTimeout(I),I=null),R.removeEventListener("transitionend",O),R.removeEventListener("transitioncancel",O),_=null,N());};_=()=>{I!==null&&(clearTimeout(I),I=null),R.removeEventListener("transitionend",O),R.removeEventListener("transitioncancel",O),_=null,N();},R.addEventListener("transitionend",O),R.addEventListener("transitioncancel",O),I=window.setTimeout(()=>{_?.();},420);};function G(D){const $=document.createElementNS("http://www.w3.org/2000/svg","svg");return $.setAttribute("viewBox","0 0 24 24"),$.setAttribute("width","16"),$.setAttribute("height","16"),$.innerHTML=D==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',$}function J(D,$=true,R=true){C=D,v.classList.toggle("card--collapsed",!C),v.classList.toggle("card--expanded",C),x&&(x.dataset.expanded=String(C),x.setAttribute("aria-expanded",String(C))),A&&(A.setAttribute("aria-expanded",String(C)),A.classList.toggle("card-toggle--collapsed",!C),A.setAttribute("aria-label",C?"Replier le contenu":"Deplier le contenu"),A.replaceChildren(G(C?"up":"down"))),s?ee(C,R):P&&(P.style.display="",P.style.height="",P.style.opacity="",P.setAttribute("aria-hidden","false")),$&&u&&u(C),y&&mn.set(y,C);}if(l){const D=w("div",{className:"card-media"});D.append(l),v.appendChild(D);}const de=!!(d||p||f||g&&g.length||s);if(de){x=w("div",{className:"card-header"});const D=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(d){const N=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},d);f&&N.append(typeof f=="string"?w("span",{className:"badge"},f):f),D.appendChild(N);}if(p){const N=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);D.appendChild(N);}(D.childNodes.length||s)&&x.appendChild(D);const $=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),R=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(N=>R.appendChild(N)),R.childNodes.length&&$.appendChild(R),s&&(A=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(C),ariaControls:L,ariaLabel:C?"Replier le contenu":"Deplier le contenu"}),A.textContent=C?"▲":"▼",A.addEventListener("click",N=>{N.preventDefault(),N.stopPropagation(),J(!C);}),$.appendChild(A),x.classList.add("card-header--expandable"),x.addEventListener("click",N=>{const I=N.target;I?.closest(".card-actions")||I?.closest(".card-toggle")||J(!C);})),$.childNodes.length&&x.appendChild($),v.appendChild(x);}P=w("div",{className:"card-collapse",id:L,ariaHidden:s?String(!C):"false"}),v.appendChild(P),h&&de&&P.appendChild(w("div",{className:"card-divider"}));const z=w("div",{className:"card-body"});if(z.append(...t),P.appendChild(z),m){h&&P.appendChild(w("div",{className:"card-divider"}));const D=w("div",{className:"card-footer"});D.append(m),P.appendChild(D);}return A&&A.setAttribute("aria-controls",L),J(C,false,false),y&&mn.set(y,C),v}let Gn=false;const jn=new Set,Ie=e=>{const t=document.activeElement;for(const n of jn)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Ll(){Gn||(Gn=true,window.addEventListener("keydown",Ie,true),window.addEventListener("keypress",Ie,true),window.addEventListener("keyup",Ie,true),document.addEventListener("keydown",Ie,true),document.addEventListener("keypress",Ie,true),document.addEventListener("keyup",Ie,true));}function _l(){Gn&&(jn.size>0||(Gn=false,window.removeEventListener("keydown",Ie,true),window.removeEventListener("keypress",Ie,true),window.removeEventListener("keyup",Ie,true),document.removeEventListener("keydown",Ie,true),document.removeEventListener("keypress",Ie,true),document.removeEventListener("keyup",Ie,true)));}function Ol(e){const{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:u}=e,l=w("div",{className:"select",id:t}),d=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},r),f=w("span",{className:"select-caret"},"▾");d.append(p,f);const g=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let m=false,h=n,b=null,S=!!a;function v(N){return N==null?r:(e.options||o).find(O=>O.value===N)?.label??r}function y(N){p.textContent=v(N),g.querySelectorAll(".select-option").forEach(I=>{const O=I.dataset.value,j=N!=null&&O===N;I.classList.toggle("selected",j),I.setAttribute("aria-selected",String(j));});}function C(N){g.replaceChildren(),N.forEach(I=>{const O=w("button",{className:"select-option"+(I.disabled?" disabled":""),type:"button",role:"option","data-value":I.value,"aria-selected":String(I.value===h),tabindex:"-1"},I.label);I.value===h&&O.classList.add("selected"),I.disabled||O.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),L(I.value,{notify:true}),T();},{capture:true}),g.appendChild(O);});}function x(){d.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function A(){const N=d.getBoundingClientRect();Object.assign(g.style,{minWidth:`${N.width}px`});}function P(){m||S||(m=true,l.classList.add("open"),x(),A(),document.addEventListener("mousedown",de,true),document.addEventListener("scroll",z,true),window.addEventListener("resize",D),g.focus({preventScroll:true}),s&&(Ll(),jn.add(l),b=()=>{jn.delete(l),_l();}),u?.(true));}function T(){m&&(m=false,l.classList.remove("open"),x(),document.removeEventListener("mousedown",de,true),document.removeEventListener("scroll",z,true),window.removeEventListener("resize",D),d.focus({preventScroll:true}),b?.(),b=null,u?.(false));}function _(){m?T():P();}function L(N,I={}){const O=h;h=N,y(h),I.notify!==false&&O!==N&&c?.(N);}function F(){return h}function ee(N){const I=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!I.length)return;const O=I.findIndex(fe=>fe.classList.contains("active")),j=I[(O+(N===1?1:I.length-1))%I.length];I.forEach(fe=>fe.classList.remove("active")),j.classList.add("active"),j.focus({preventScroll:true}),j.scrollIntoView({block:"nearest"});}function G(N){(N.key===" "||N.key==="Enter"||N.key==="ArrowDown")&&(N.preventDefault(),P());}function J(N){if(N.key==="Escape"){N.preventDefault(),T();return}if(N.key==="Enter"||N.key===" "){const I=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");I&&!I.classList.contains("disabled")&&(N.preventDefault(),L(I.dataset.value,{notify:true}),T());return}if(N.key==="ArrowDown"){N.preventDefault(),ee(1);return}if(N.key==="ArrowUp"){N.preventDefault(),ee(-1);return}}function de(N){l.contains(N.target)||T();}function z(){m&&A();}function D(){m&&A();}function $(N){S=!!N,d.disabled=S,l.classList.toggle("disabled",S),S&&T();}function R(N){e.options=N,C(N),N.some(I=>I.value===h)||(h=null,y(null));}return l.append(d,g),d.addEventListener("pointerdown",N=>{N.preventDefault(),N.stopPropagation(),_();},{capture:true}),d.addEventListener("keydown",G),g.addEventListener("keydown",J),C(o),n!=null?(h=n,y(h)):y(null),x(),$(S),{root:l,open:P,close:T,toggle:_,getValue:F,setValue:L,setOptions:R,setDisabled:$,destroy(){document.removeEventListener("mousedown",de,true),document.removeEventListener("scroll",z,true),window.removeEventListener("resize",D),b?.(),b=null;}}}function Xn(e={}){const{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:u=false,tooltip:l,hint:d,icon:p,suffix:f,onClick:g}=e,m=w("div",{className:"lg-label-wrap",id:t}),h=w("label",{className:"lg-label",...o?{htmlFor:o}:{},...l?{title:l}:{}});if(p){const L=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;L.classList?.add?.("lg-label-ico"),h.appendChild(L);}const b=w("span",{className:"lg-label-text"},n);h.appendChild(b);const S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(S);let v=null;if(f!=null){v=typeof f=="string"?document.createTextNode(f):f;const L=w("span",{className:"lg-label-suffix"});L.appendChild(v),h.appendChild(L);}const y=d?w("div",{className:"lg-label-hint"},d):null;m.classList.add(`lg-label--${a}`),m.classList.add(`lg-label--${i}`),s==="title"&&m.classList.add("lg-label--title"),C(r),u&&m.classList.add("is-disabled"),m.appendChild(h),y&&m.appendChild(y),g&&h.addEventListener("click",g);function C(L){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${L}`);}function x(L){b.textContent=L;}function A(L){C(L);}function P(L){L&&!S.isConnected&&h.appendChild(S),!L&&S.isConnected&&S.remove(),L?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function T(L){m.classList.toggle("is-disabled",!!L);}function _(L){!L&&y&&y.isConnected?y.remove():L&&y?y.textContent=L:L&&!y&&m.appendChild(w("div",{className:"lg-label-hint"},L));}return {root:m,labelEl:h,hintEl:y,setText:x,setTone:A,setRequired:P,setDisabled:T,setHint:_}}function $t(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function hn(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const o=$t(e);return o&&n.appendChild(o),n}function Rl(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Qt(e={}){const{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:u="button",onClick:l,disabled:d=false,fullWidth:p=false}=e,f=w("button",{className:"btn",id:n});f.type=u,o==="primary"&&f.classList.add("primary"),o==="danger"&&f.classList.add("danger"),r==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=Rl(),m=i?hn(i,"left"):null,h=a?hn(a,"right"):null,b=document.createElement("span");b.className="btn-label";const S=$t(t);S&&b.appendChild(S),!S&&(m||h)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(b),h&&f.appendChild(h);const v=d||s;f.disabled=v,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const y=f;return y.setLoading=C=>{f.setAttribute("aria-busy",String(!!C)),g.style.display=C?"inline-block":"none",f.disabled=C||d;},y.setDisabled=C=>{f.disabled=C||f.getAttribute("aria-busy")==="true";},y.setLabel=C=>{b.replaceChildren();const x=$t(C);x&&b.appendChild(x),!x&&(m||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},y.setIconLeft=C=>{if(C==null){m?.remove();return}m?m.replaceChildren($t(C)):f.insertBefore(hn(C,"left"),b);},y.setIconRight=C=>{if(C==null){h?.remove();return}h?h.replaceChildren($t(C)):f.appendChild(hn(C,"right"));},y.setVariant=C=>{f.classList.remove("primary","danger"),C==="primary"&&f.classList.add("primary"),C==="danger"&&f.classList.add("danger");},y}let na=null,co=null;function Nl(){return na}function $l(e){na=e,co=null;}function ra(){return co}function Fl(e){co=e;}function Dl(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function oa(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const r=n.platform.toLowerCase();if(r.includes("windows"))return "windows";if(r.includes("mac"))return "mac";if(r.includes("android"))return "android";if(r.includes("chrome os")||r.includes("cros"))return "chromeos";if(r.includes("linux"))return "linux";if(r.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ia(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return "Edge";if(r)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Gl(){const e=Nl();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function jl(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function aa(){try{return window.top!==window.self}catch{return  true}}function zl(){const e=aa(),t=jl(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Qn(){const e=ra();if(e)return e;const t=zl(),n=Gl(),o=oa(),r=ia(),i=aa(),a=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),u=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),d=Math.round(s?.height??u),p=Math.round(a.width||0),f=Math.round(a.height||0),g=Math.round(a.availWidth||p),m=Math.round(a.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,b={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:r,os:o,viewportWidth:c,viewportHeight:u,visualViewportWidth:l,visualViewportHeight:d,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:h,orientation:Dl()};return Fl(b),b}function Bl(){return Qn().surface==="discord"}function Wl(){return Qn().platform==="mobile"}function Hl(){Qn();}function Ul(){return ra()!==null}const qe={init:Hl,isReady:Ul,detect:Qn,isDiscord:Bl,isMobile:Wl,detectOS:oa,detectBrowser:ia,setPlatformOverride:$l};let zn=false;const Ft=new Set;function Vl(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Me=e=>{const t=Vl();if(t){for(const n of Ft)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Kl(){zn||(zn=true,window.addEventListener("keydown",Me,true),window.addEventListener("keypress",Me,true),window.addEventListener("keyup",Me,true),document.addEventListener("keydown",Me,true),document.addEventListener("keypress",Me,true),document.addEventListener("keyup",Me,true));}function Yl(){zn&&(zn=false,window.removeEventListener("keydown",Me,true),window.removeEventListener("keypress",Me,true),window.removeEventListener("keyup",Me,true),document.removeEventListener("keydown",Me,true),document.removeEventListener("keypress",Me,true),document.removeEventListener("keyup",Me,true));}function ql(e){return Ft.size===0&&Kl(),Ft.add(e),()=>{Ft.delete(e),Ft.size===0&&Yl();}}function Jl(e,t,n,o){let r;switch(e){case "digits":r="0-9";break;case "alpha":r="\\p{L}";break;case "alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Xl(e,t){return t?e.replace(t,""):e}function Ql(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t);})}function Zl(e={}){const{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:u=true,debounceMs:l=0,onChange:d,onEnter:p,label:f}=e,g=w("div",{className:"lg-input-wrap"}),m=w("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),o&&(m.value=o),f){const L=w("div",{className:"lg-input-label"},f);g.appendChild(L);}g.appendChild(m);const h=Jl(r,i,a,s),b=()=>{const L=m.selectionStart??m.value.length,F=m.value.length,ee=Xl(m.value,h);if(ee!==m.value){m.value=ee;const G=F-ee.length,J=Math.max(0,L-G);m.setSelectionRange(J,J);}},S=Ql(()=>d?.(m.value),l);m.addEventListener("input",()=>{b(),S();}),m.addEventListener("paste",()=>queueMicrotask(()=>{b(),S();})),m.addEventListener("keydown",L=>{L.key==="Enter"&&p?.(m.value);});const v=u?ql(m):()=>{};function y(){return m.value}function C(L){m.value=L??"",b(),S();}function x(){m.focus();}function A(){m.blur();}function P(L){m.disabled=!!L;}function T(){return document.activeElement===m}function _(){v();}return {root:g,input:m,getValue:y,setValue:C,focus:x,blur:A,setDisabled:P,isFocused:T,destroy:_}}function he(e,t,n){return Math.min(n,Math.max(t,e))}function Wt({h:e,s:t,v:n,a:o}){const r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1));let s=0,c=0,u=0;switch(Math.floor(r)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,u=a;break;case 3:c=a,u=i;break;case 4:s=a,u=i;break;default:s=i,u=a;break}const d=n-i,p=Math.round((s+d)*255),f=Math.round((c+d)*255),g=Math.round((u+d)*255);return {r:he(p,0,255),g:he(f,0,255),b:he(g,0,255),a:he(o,0,1)}}function sa({r:e,g:t,b:n,a:o}){const r=he(e,0,255)/255,i=he(t,0,255)/255,a=he(n,0,255)/255,s=Math.max(r,i,a),c=Math.min(r,i,a),u=s-c;let l=0;u!==0&&(s===r?l=60*((i-a)/u%6):s===i?l=60*((a-r)/u+2):l=60*((r-i)/u+4)),l<0&&(l+=360);const d=s===0?0:u/s;return {h:l,s:d,v:s,a:he(o,0,1)}}function uo({r:e,g:t,b:n}){const o=r=>he(Math.round(r),0,255).toString(16).padStart(2,"0");return `#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function ec({r:e,g:t,b:n,a:o}){const r=he(Math.round(o*255),0,255);return `${uo({r:e,g:t,b:n})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function Dt({r:e,g:t,b:n,a:o}){const r=Math.round(o*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${r})`}function xt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r:o,g:r,b:i,a:n/255}}function Nr(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return xt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const o=n[1].split(",").map(c=>c.trim());if(o.length<3)return null;const r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return [r,i,a,s].some(c=>Number.isNaN(c))?null:{r,g:i,b:a,a:s}}return null}function tc(e,t){const n=Nr(e)??xt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=he(t,0,1)),sa(n)}function nc(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function rc(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function et(e){const t=Wt(e),n=Wt({...e,a:1});return {hsva:{...e},hex:uo(n),hexa:ec(t),rgba:Dt(t),alpha:e.a}}function oc(e={}){const{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():qe.detect().platform==="mobile";let d=tc(o,r);const p=Ae({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const h=p.querySelector(".card-toggle");!l&&h&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const b=p.querySelector(".card-collapse");let S=null,v=null,y=null,C=null,x=null,A=null,P=null,T=null,_=null,L="hex";function F(z){const D=et(d);z==="input"?s?.(D):c?.(D);}function ee(){const z=et(d);if(m.style.setProperty("--cp-preview-color",z.rgba),m.setAttribute("aria-label",`${n}: ${z.hexa}`),!l&&S&&v&&y&&C&&x&&A&&P){const D=Wt({...d,s:1,v:1,a:1}),$=Dt(D);S.style.setProperty("--cp-palette-hue",$),v.style.left=`${d.s*100}%`,v.style.top=`${(1-d.v)*100}%`,y.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Dt({...D,a:1})} 0%, ${Dt({...D,a:0})} 100%)`),C.style.top=`${(1-d.a)*100}%`,x.style.setProperty("--cp-hue-color",Dt(Wt({...d,v:1,s:1,a:1}))),A.style.left=`${d.h/360*100}%`;const R=d.a===1?z.hex:z.hexa,N=z.rgba,I=L==="hex"?R:N;P!==document.activeElement&&(P.value=I),P.setAttribute("aria-label",`${L.toUpperCase()} code for ${n}`),P.placeholder=L==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",L==="hex"?P.maxLength=9:P.removeAttribute("maxLength"),P.dataset.mode=L,T&&(T.textContent=L.toUpperCase(),T.setAttribute("aria-label",L==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),T.setAttribute("aria-pressed",L==="rgba"?"true":"false"),T.classList.toggle("is-alt",L==="rgba"));}_&&_!==document.activeElement&&(_.value=z.hex);}function G(z,D=null){d={h:(z.h%360+360)%360,s:he(z.s,0,1),v:he(z.v,0,1),a:he(z.a,0,1)},ee(),D&&F(D);}function J(z,D=null){G(sa(z),D);}function de(z,D,$){z.addEventListener("pointerdown",R=>{R.preventDefault();const N=R.pointerId,I=j=>{j.pointerId===N&&D(j);},O=j=>{j.pointerId===N&&(document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",O),document.removeEventListener("pointercancel",O),$?.(j));};D(R),document.addEventListener("pointermove",I),document.addEventListener("pointerup",O),document.addEventListener("pointercancel",O);});}if(!l&&b){const z=b.querySelector(".card-body");if(z){z.classList.add("color-picker__body"),v=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},v),C=w("div",{className:"color-picker__alpha-thumb"}),y=w("div",{className:"color-picker__alpha"},C),A=w("div",{className:"color-picker__hue-thumb"}),x=w("div",{className:"color-picker__hue"},A);const D=w("div",{className:"color-picker__main"},S,y),$=w("div",{className:"color-picker__hue-row"},x),R=Zl({blockGameKeys:true});P=R.input,P.classList.add("color-picker__hex-input"),P.value="",P.maxLength=9,P.spellcheck=false,P.inputMode="text",P.setAttribute("aria-label",`Hex code for ${n}`),T=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),R.root.classList.add("color-picker__hex-wrap");const N=w("div",{className:"color-picker__hex-row"},T,R.root);z.replaceChildren(D,$,N),de(S,O=>{if(!S||!v)return;const j=S.getBoundingClientRect(),fe=he((O.clientX-j.left)/j.width,0,1),ht=he((O.clientY-j.top)/j.height,0,1);G({...d,s:fe,v:1-ht},"input");},()=>F("change")),de(y,O=>{if(!y)return;const j=y.getBoundingClientRect(),fe=he((O.clientY-j.top)/j.height,0,1);G({...d,a:1-fe},"input");},()=>F("change")),de(x,O=>{if(!x)return;const j=x.getBoundingClientRect(),fe=he((O.clientX-j.left)/j.width,0,1);G({...d,h:fe*360},"input");},()=>F("change")),T.addEventListener("click",()=>{if(L=L==="hex"?"rgba":"hex",P){const O=et(d);P.value=L==="hex"?d.a===1?O.hex:O.hexa:O.rgba;}ee(),P?.focus(),P?.select();}),P.addEventListener("input",()=>{if(L==="hex"){const O=nc(P.value);if(O!==P.value){const j=P.selectionStart??O.length;P.value=O,P.setSelectionRange(j,j);}}});const I=()=>{const O=P.value;if(L==="hex"){const j=xt(O);if(!j){P.value=d.a===1?et(d).hex:et(d).hexa;return}const fe=O.startsWith("#")?O.slice(1):O,ht=fe.length===4||fe.length===8;j.a=ht?j.a:d.a,J(j,"change");}else {const j=rc(O),fe=Nr(j);if(!fe){P.value=et(d).rgba;return}J(fe,"change");}};P.addEventListener("change",I),P.addEventListener("blur",I),P.addEventListener("keydown",O=>{O.key==="Enter"&&(I(),P.blur());});}}return l&&(b&&b.remove(),_=w("input",{className:"color-picker__native",type:"color",value:uo(Wt({...d,a:1}))}),m.addEventListener("click",()=>_.click()),_.addEventListener("input",()=>{const z=xt(_.value);z&&(z.a=d.a,J(z,"input"),F("change"));}),p.appendChild(_)),ee(),{root:p,isMobile:l,getValue:()=>et(d),setValue:(z,D)=>{const $=Nr(z)??xt(z)??xt("#FFFFFF");$&&(typeof D=="number"&&($.a=D),J($,null));}}}const ic=window;function ac(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:ic}const sc=ac(),E=sc;function lc(e){try{return !!e.isSecureContext}catch{return  false}}function po(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function la(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function cc(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function dc(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function uc(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function pc(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!lc(E))return {ok:false,method:"clipboard-write"};if(!await cc())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function fc(e,t){try{const n=t||po(),o=dc(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy");}catch{r=!1;}return o.remove(),{ok:r,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function gc(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let o=false;if(n!==e)try{t.textContent=e,o=!0;}catch{}const r=uc(t);o&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=la()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:r,method:"selection",hint:i}}async function mc(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const o=await pc(n);if(o.ok)return o;const r=t.injectionRoot||po(t.valueNode||void 0),i=fc(n,r);if(i.ok)return i;const a=gc(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(qe.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function hc(e,t,n={}){const o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);const i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=po(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();const i=(t()??"").toString(),a=await mc(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copié"):a.method==="selection"&&o(a.hint||(la()?"⌘C pour copier":"Ctrl+C pour copier")):o("Impossible de copier");});}const Ht={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)"}};function bc(e){const{host:t,themes:n,initialTheme:o,onThemeChange:r}=e;let i=o,a=null,s=false;function c(l){const d=n[l]||n[i]||{};s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(d))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=E.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,r?.(l);}function u(){return i}return c(o),{applyTheme:c,getCurrentTheme:u}}const $r={ui:{expandedCards:{style:false,system:false}}};async function yc(){const e=await ta("tab-settings",{version:1,defaults:$r,sanitize:r=>({ui:{expandedCards:Qo($r.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Qo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function ca(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function vc(){return Object.keys(Ht).map(e=>({value:e,label:ca(e)}))}const xc=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function wc(e){return ca(e.replace(/^--/,""))}function Sc(e){return e.alpha<1?e.rgba:e.hex}class kc extends on{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let o;try{o=await yc();}catch{o={get:()=>$r,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const r=o.get(),i=Object.keys(Ht),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const u=Xn({text:"Theme",tone:"muted",size:"lg"}),l=Ol({options:vc(),value:s,onChange:g=>{c=g,this.deps.applyTheme(g),this.renderThemePickers(g,d,c);}}),d=w("div",{className:"settings-theme-grid"}),p=Ae({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!r.ui.expandedCards.style,onExpandChange:g=>o.setCardExpanded("style",g)},w("div",{className:"kv settings-theme-row"},u.root,l.root),d);this.renderThemePickers(s,d,c);const f=this.createEnvCard({defaultExpanded:!!r.ui.expandedCards.system,onExpandChange:g=>o.setCardExpanded("system",g)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,o){const r=Ht[t];if(n.replaceChildren(),!!r)for(const i of xc){const a=r[i];if(a==null)continue;const s=oc({label:wc(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,o),onChange:c=>this.updateThemeVar(t,i,c,o)});n.appendChild(s.root);}}updateThemeVar(t,n,o,r){const i=Ht[t];i&&(i[n]=Sc(o),r===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,o=t?.onExpandChange,r=(h,b)=>{const S=w("div",{className:"kv kv--inline-mobile"}),v=w("label",{},h),y=w("div",{className:"ro"});return typeof b=="string"?y.textContent=b:y.append(b),S.append(v,y),S},i=w("code",{},"—"),a=w("span",{},"—"),s=w("span",{},"—"),c=w("span",{},"—"),u=w("span",{},"—"),l=w("span",{},"—"),d=()=>{const h=qe.detect();s.textContent=h.surface,c.textContent=h.platform,u.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",i.textContent=h.host,a.textContent=h.isInIframe?"Yes":"No";},p=Qt({label:"Copy JSON",variant:"primary",size:"sm"});hc(p,()=>{const h=qe.detect();return JSON.stringify(h,null,2)});const f=w("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=Ae({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:o},r("Surface",s),r("Platform",c),r("Browser",u),r("OS",l),r("Host",i),r("Iframe",a)),m=()=>{document.hidden||d();};return document.addEventListener("visibilitychange",m),d(),this.addCleanup(()=>document.removeEventListener("visibilitychange",m)),g}}function fo(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,c=w("div",{className:"lg-switch-wrap"}),u=w("button",{className:`lg-switch lg-switch--${r}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!o),title:i??"Basculer"}),l=w("span",{className:"lg-switch-track"}),d=w("span",{className:"lg-switch-thumb"});u.append(l,d);let p=null;i&&a!=="none"&&(p=w("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,u):p&&a==="right"?c.append(u,p):c.append(u);let f=!!n,g=!!o;function m(){u.classList.toggle("on",f),u.setAttribute("aria-checked",String(f)),u.disabled=g,u.setAttribute("aria-disabled",String(g));}function h(T=false){g||(f=!f,m(),T||s?.(f));}function b(T){T.preventDefault(),h();}function S(T){g||((T.key===" "||T.key==="Enter")&&(T.preventDefault(),h()),T.key==="ArrowLeft"&&(T.preventDefault(),y(false)),T.key==="ArrowRight"&&(T.preventDefault(),y(true)));}u.addEventListener("click",b),u.addEventListener("keydown",S);function v(){return f}function y(T,_=false){f=!!T,m(),_||s?.(f);}function C(T){g=!!T,m();}function x(T){if(!T){p&&(p.remove(),p=null);return}p?p.textContent=T:(p=w("span",{className:"lg-switch-label"},T),c.append(p));}function A(){u.focus();}function P(){u.removeEventListener("click",b),u.removeEventListener("keydown",S);}return m(),{root:c,button:u,isChecked:v,setChecked:y,setDisabled:C,setLabel:x,focus:A,destroy:P}}function da(e){const{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:u=false,maxHeight:l,selectable:d=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:h=(B,H)=>String(H),onSortChange:b,onSelectionChange:S,onRowClick:v}=e;let y=n.slice(),C=o.slice(),x=o.slice(),A=null,P=null,T=1;const _=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,L=!!s&&!(c&&_),F=w("div",{className:"lg-table-wrap",id:t});if(l!=null){const B=typeof l=="number"?`${l}px`:l;F.style.setProperty("--tbl-max-h",B);}const ee=w("div",{className:"lg-table"}),G=w("div",{className:"lg-thead"}),J=w("div",{className:"lg-tbody"}),de=w("div",{className:"lg-tfoot"});i&&F.classList.add("sticky"),a&&F.classList.add("zebra"),u&&F.classList.add("compact"),d&&F.classList.add("selectable");const z=p==="switch"?"52px":"36px";F.style.setProperty("--check-w",z);function D(B){return B==="center"?"center":B==="right"?"flex-end":"flex-start"}function $(){const B=y.map(Q=>{const re=(Q.width||"1fr").trim();return /\bfr$/.test(re)?`minmax(0, ${re})`:re}),H=(d?[z,...B]:B).join(" ");F.style.setProperty("--lg-cols",H);}$();function R(){return r?Math.max(1,Math.ceil(C.length/r)):1}function N(){if(!r)return C;const B=(T-1)*r;return C.slice(B,B+r)}function I(){if(!A||!P)return;const B=y.find(re=>String(re.key)===A),H=P==="asc"?1:-1,Q=B?.sortFn?(re,se)=>H*B.sortFn(re,se):(re,se)=>{const q=re[A],X=se[A];return q==null&&X==null?0:q==null?-1*H:X==null?1*H:typeof q=="number"&&typeof X=="number"?H*(q-X):H*String(q).localeCompare(String(X),void 0,{numeric:true,sensitivity:"base"})};C.sort(Q);}const O=new Set(g);function j(){return Array.from(O)}const fe=new Map;function ht(B){O.clear(),B.forEach(H=>O.add(H)),ke(),fe.forEach((H,Q)=>{H.setChecked(O.has(Q),true);}),Lt(),S?.(j());}function ne(){O.clear(),ke(),fe.forEach(B=>B.setChecked(false,true)),Lt(),S?.(j());}let pe=null;function ke(){if(!pe)return;const B=N();if(!B.length){pe.indeterminate=false,pe.checked=false;return}const H=B.map((re,se)=>h(re,(T-1)*(r||0)+se)),Q=H.reduce((re,se)=>re+(O.has(se)?1:0),0);pe.checked=Q===H.length,pe.indeterminate=Q>0&&Q<H.length;}function dn(){const B=J.offsetWidth-J.clientWidth;G.style.paddingRight=B>0?`${B}px`:"0px";}function pr(){requestAnimationFrame(dn);}const fr=new ResizeObserver(()=>dn()),Ko=()=>dn();function pl(){G.replaceChildren();const B=w("div",{className:"lg-tr lg-tr-head"});if(d){const H=w("div",{className:"lg-th lg-th-check"});m||(pe=w("input",{type:"checkbox"}),pe.addEventListener("change",()=>{const Q=N(),re=pe.checked;Q.forEach((se,q)=>{const X=h(se,(T-1)*(r||0)+q);re?O.add(X):O.delete(X);}),S?.(j()),Lt();}),H.appendChild(pe)),B.appendChild(H);}y.forEach(H=>{const Q=w("button",{className:"lg-th",type:"button",title:H.title||H.header});Q.textContent=H.header,H.align&&Q.style.setProperty("--col-justify",D(H.align)),H.sortable&&Q.classList.add("sortable"),A===String(H.key)&&P?Q.setAttribute("data-sort",P):Q.removeAttribute("data-sort"),H.sortable&&Q.addEventListener("click",()=>{const re=String(H.key);A!==re?(A=re,P="asc"):(P=P==="asc"?"desc":P==="desc"?null:"asc",P||(A=null,C=x.slice())),b?.(A,P),A&&P&&I(),pn();}),B.appendChild(Q);}),G.appendChild(B);try{fr.disconnect();}catch{}fr.observe(J),pr();}function gr(B){return Array.from(B.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Yo(B){return B.querySelector(".lg-td, .lg-td-check")}function qo(B){const H=Yo(B);return H?H.getBoundingClientRect():null}function Lt(){const B=N(),H=new Map;Array.from(J.children).forEach(q=>{const X=q,we=X.getAttribute("data-id");if(!we)return;const Te=qo(X);Te&&H.set(we,Te);});const Q=new Map;Array.from(J.children).forEach(q=>{const X=q,we=X.getAttribute("data-id");we&&Q.set(we,X);});const re=[];for(let q=0;q<B.length;q++){const X=B[q],we=(r?(T-1)*r:0)+q,Te=h(X,we);re.push(Te);let ge=Q.get(Te);ge||(ge=fl(X,we),L&&gr(ge).forEach(_t=>{_t.style.transform="translateY(6px)",_t.style.opacity="0";})),J.appendChild(ge);}const se=[];if(Q.forEach((q,X)=>{re.includes(X)||se.push(q);}),!L){se.forEach(q=>q.remove()),ke(),pr();return}re.forEach(q=>{const X=J.querySelector(`.lg-tr-body[data-id="${q}"]`);if(!X)return;const we=qo(X),Te=H.get(q),ge=gr(X);if(Te&&we){const ze=Te.left-we.left,bt=Te.top-we.top;ge.forEach(Qe=>{Qe.style.transition="none",Qe.style.transform=`translate(${ze}px, ${bt}px)`,Qe.style.opacity="1";}),Yo(X)?.getBoundingClientRect(),ge.forEach(Qe=>{Qe.style.willChange="transform, opacity",Qe.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ge.forEach(Qe=>{Qe.style.transform="translate(0,0)";});});}else ge.forEach(ze=>{ze.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ge.forEach(ze=>{ze.style.transform="translate(0,0)",ze.style.opacity="1";});});const mr=ze=>{(ze.propertyName==="transform"||ze.propertyName==="opacity")&&(ge.forEach(bt=>{bt.style.willChange="",bt.style.transition="",bt.style.transform="",bt.style.opacity="";}),ze.currentTarget.removeEventListener("transitionend",mr));},_t=ge[0];_t&&_t.addEventListener("transitionend",mr);}),se.forEach(q=>{const X=gr(q);X.forEach(ge=>{ge.style.willChange="transform, opacity",ge.style.transition="transform .18s ease, opacity .18s ease",ge.style.opacity="0",ge.style.transform="translateY(-6px)";});const we=ge=>{ge.propertyName==="opacity"&&(ge.currentTarget.removeEventListener("transitionend",we),q.remove());},Te=X[0];Te?Te.addEventListener("transitionend",we):q.remove();}),ke(),pr();}function fl(B,H){const Q=h(B,H),re=w("div",{className:"lg-tr lg-tr-body","data-id":Q});if(d){const se=w("div",{className:"lg-td lg-td-check"});if(p==="switch"){const q=fo({size:"sm",checked:O.has(Q),onChange:X=>{X?O.add(Q):O.delete(Q),ke(),S?.(j());}});fe.set(Q,q),se.appendChild(q.root);}else {const q=w("input",{type:"checkbox",className:"lg-row-check"});q.checked=O.has(Q),q.addEventListener("change",X=>{X.stopPropagation(),q.checked?O.add(Q):O.delete(Q),ke(),S?.(j());}),q.addEventListener("click",X=>X.stopPropagation()),se.appendChild(q);}re.appendChild(se);}return y.forEach(se=>{const q=w("div",{className:"lg-td"});se.align&&q.style.setProperty("--col-justify",D(se.align));let X=se.render?se.render(B,H):String(B[se.key]??"");typeof X=="string"?q.textContent=X:q.appendChild(X),re.appendChild(q);}),(v||d&&f)&&(re.classList.add("clickable"),re.addEventListener("click",se=>{if(!se.target.closest(".lg-td-check")){if(d&&f){const q=!O.has(Q);if(q?O.add(Q):O.delete(Q),ke(),p==="switch"){const X=fe.get(Q);X&&X.setChecked(q,true);}else {const X=re.querySelector(".lg-row-check");X&&(X.checked=q);}S?.(j());}v?.(B,H,se);}})),re}function Jo(){if(de.replaceChildren(),!r)return;const B=R(),H=w("div",{className:"lg-pager"}),Q=w("button",{className:"btn",type:"button"},"←"),re=w("button",{className:"btn",type:"button"},"→"),se=w("span",{className:"lg-pager-info"},`${T} / ${B}`);Q.disabled=T<=1,re.disabled=T>=B,Q.addEventListener("click",()=>un(T-1)),re.addEventListener("click",()=>un(T+1)),H.append(Q,se,re),de.appendChild(H);}function un(B){const H=R();T=Math.min(Math.max(1,B),H),Lt(),Jo();}function pn(){$(),pl(),Lt(),Jo();}function gl(B){x=B.slice(),C=B.slice(),A&&P&&I(),un(1);}function ml(B){y=B.slice(),pn();}function hl(B,H="asc"){A=B,P=B?H:null,A&&P?I():C=x.slice(),pn();}function bl(){try{fr.disconnect();}catch{}window.removeEventListener("resize",Ko);}return ee.append(G,J,de),F.appendChild(ee),window.addEventListener("resize",Ko),pn(),{root:F,setData:gl,setColumns:ml,sortBy:hl,getSelection:j,setSelection:ht,clearSelection:ne,setPage:un,getState:()=>({page:T,pageCount:R(),sortKey:A,sortDir:P}),destroy:bl}}let Bn=false;const Gt=new Set;function Cc(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ee=e=>{const t=Cc();if(t){for(const n of Gt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ac(){Bn||(Bn=true,window.addEventListener("keydown",Ee,true),window.addEventListener("keypress",Ee,true),window.addEventListener("keyup",Ee,true),document.addEventListener("keydown",Ee,true),document.addEventListener("keypress",Ee,true),document.addEventListener("keyup",Ee,true));}function Tc(){Bn&&(Bn=false,window.removeEventListener("keydown",Ee,true),window.removeEventListener("keypress",Ee,true),window.removeEventListener("keyup",Ee,true),document.removeEventListener("keydown",Ee,true),document.removeEventListener("keypress",Ee,true),document.removeEventListener("keyup",Ee,true));}function Pc(e){return Gt.size===0&&Ac(),Gt.add(e),()=>{Gt.delete(e),Gt.size===0&&Tc();}}function bn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ic(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function ua(e={}){const{id:t,placeholder:n="Rechercher…",value:o="",size:r="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:u=false,debounceMs:l=0,focusKey:d="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:h,submitLabel:b,loading:S=false,blockGameKeys:v=true}=e,y=w("div",{className:"search"+(r?` search--${r}`:""),id:t}),C=w("span",{className:"search-ico search-ico--left"});if(p){const ne=bn(p);ne&&C.appendChild(ne);}else C.textContent="🔎",C.style.opacity=".9";const x=w("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":h||n}),A=w("span",{className:"search-ico search-ico--right"});if(f){const ne=bn(f);ne&&A.appendChild(ne);}const P=Ic();P.classList.add("search-spinner");const T=g?w("button",{className:"search-clear",type:"button",title:m},"×"):null,_=b!=null?w("button",{className:"btn search-submit",type:"button"},b):null,L=w("div",{className:"search-field"},C,x,A,P,...T?[T]:[]);y.append(L,..._?[_]:[]);let F=!!i,ee=null;function G(ne){P.style.display=ne?"inline-block":"none",y.classList.toggle("is-loading",ne);}function J(){ee!=null&&(window.clearTimeout(ee),ee=null);}function de(ne){J(),l>0?ee=window.setTimeout(()=>{ee=null,ne();},l):ne();}function z(){s?.(x.value),u&&c&&c(x.value);}x.addEventListener("input",()=>{de(z);}),x.addEventListener("keydown",ne=>{ne.key==="Enter"?(ne.preventDefault(),J(),c?.(x.value)):ne.key==="Escape"&&(x.value.length>0?R("",{notify:true}):x.blur());}),T&&T.addEventListener("click",()=>R("",{notify:true})),_&&_.addEventListener("click",()=>c?.(x.value));let D=()=>{};if(v&&(D=Pc(x)),d){const ne=pe=>{if(pe.key===d&&!pe.ctrlKey&&!pe.metaKey&&!pe.altKey){const ke=document.activeElement;ke&&(ke.tagName==="INPUT"||ke.tagName==="TEXTAREA"||ke.isContentEditable)||(pe.preventDefault(),x.focus());}};window.addEventListener("keydown",ne,true),y.__cleanup=()=>{window.removeEventListener("keydown",ne,true),D();};}else y.__cleanup=()=>{D();};function $(ne){F=!!ne,x.disabled=F,T&&(T.disabled=F),_&&(_.disabled=F),y.classList.toggle("disabled",F);}function R(ne,pe={}){const ke=x.value;x.value=ne??"",pe.notify&&ke!==ne&&de(z);}function N(){return x.value}function I(){x.focus();}function O(){x.blur();}function j(ne){x.placeholder=ne;}function fe(ne){R("",ne);}return $(F),G(S),a&&I(),{root:y,input:x,getValue:N,setValue:R,focus:I,blur:O,setDisabled:$,setPlaceholder:j,clear:fe,setLoading:G,setIconLeft(ne){C.replaceChildren();const pe=bn(ne??"🔎");pe&&C.appendChild(pe);},setIconRight(ne){A.replaceChildren();const pe=bn(ne??"");pe&&A.appendChild(pe);}}}function Mc(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Ec(e){return e.toLowerCase()}function pa(e={}){const{id:t,label:n="",type:o="neutral",tone:r="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:u,variant:l="default",rarity:d=null}=e,p=w("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),u&&p.addEventListener("click",u);let f=false,g=a;function m(){f||(g===false?p.style.border="none":p.style.border="");}function h(x,A=r){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${x}`,`badge--${A}`),m();}function b(x){const A=(x??"").trim();A?(p.style.border=A,f=true):(f=false,m());}function S(x){g=x,m();}function v(x){p.textContent=x;}function y(x,A=r){h(x,A);}function C(x){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";const A=Mc(x);if(!A){p.textContent=String(x??"—");return}p.textContent=A,p.classList.add("badge--rarity",`badge--rarity-${Ec(A)}`);}return l==="rarity"?C(d):(p.textContent=n,h(o,r),typeof a=="boolean"&&S(a),i&&b(i)),{root:p,setLabel:v,setType:y,setBorder:b,setWithBorder:S,setRarity:C}}function Lc(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function _c(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Oc(){return {cache:new Map,maxEntries:200}}const Rc={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Nc={enabled:true,maxEntries:200},ve=Lc(),$c=_c(),Fc={...Rc},Dc=Oc(),Gc={...Nc};function Se(){return ve}function Ct(){return $c}function Zt(){return Fc}function en(){return Dc}function Fr(){return Gc}function fa(){return ve.ready}const Zn=e=>new Promise(t=>setTimeout(t,e)),De=e=>{try{return e()}catch{return}},Be=(e,t,n)=>Math.max(t,Math.min(n,e)),jc=e=>Be(e,0,1);async function Zo(e,t,n){const o=performance.now();for(;performance.now()-o<t;){const r=await Promise.race([e,Zn(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}const ei=Function.prototype.bind,oe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let ga,ma,ha;const zc=new Promise(e=>{ga=e;}),Bc=new Promise(e=>{ma=e;}),Wc=new Promise(e=>{ha=e;});function Hc(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Uc(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Vc(e){oe.engine=e,oe.tos=Uc(e)||null,oe.app=e.app||null,oe.renderer=e.app?.renderer||null,oe.ticker=e.app?.ticker||null,oe.stage=e.app?.stage||null;try{ga(e);}catch{}try{oe.app&&ma(oe.app);}catch{}try{oe.renderer&&ha(oe.renderer);}catch{}}function go(){return oe.engine?true:(oe._bindPatched||(oe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=ei.call(this,e,...t);try{!oe.engine&&Hc(e)&&(Function.prototype.bind=ei,oe._bindPatched=!1,Vc(e));}catch{}return n}),false)}go();async function Kc(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(oe.engine)return  true;go(),await Zn(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Yc(e=15e3){return oe.engine||await Kc(e),true}function qc(){return oe.engine&&oe.app?{ok:true,engine:oe.engine,tos:oe.tos,app:oe.app}:(go(),{ok:false,engine:oe.engine,tos:oe.tos,app:oe.app,note:"Not captured. Wait for room, or reload."})}const Le={engineReady:zc,appReady:Bc,rendererReady:Wc,engine:()=>oe.engine,tos:()=>oe.tos,app:()=>oe.app,renderer:()=>oe.renderer,ticker:()=>oe.ticker,stage:()=>oe.stage,PIXI:()=>E.PIXI||null,init:Yc,hook:qc,ready:()=>!!oe.engine},Jc=E?.location?.origin||"https://magicgarden.gg";function ba(){return typeof GM_xmlhttpRequest=="function"}function ya(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))});})}async function mo(e){if(ba())return JSON.parse((await ya(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function va(e){if(ba())return (await ya(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Xc(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),r=E?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i);},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"));},i.src=o;})}const Ve=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Qc=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",ti=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Qc(e)+String(t||"");let ho=null;function xa(){return ho}function Zc(e){ho=e;}function wa(){return ho!==null}const ed=/\/(?:r\/\d+\/)?version\/([^/]+)/,td=15e3,nd=50;function rd(){return E?.document??(typeof document<"u"?document:null)}function bo(e={}){if(wa())return;const t=e.doc??rd();if(!t)return;const n=t.scripts;for(let o=0;o<n.length;o++){const i=n.item(o)?.src;if(!i)continue;const a=i.match(ed);if(a?.[1]){Zc(a[1]);return}}}function od(){return bo(),xa()}function id(){return wa()}async function ad(e={}){const t=e.timeoutMs??td,n=performance.now();for(;performance.now()-n<t;){bo();const o=xa();if(o)return o;await Zn(nd);}throw new Error("MGVersion timeout (gameVersion not found)")}const yo={init:bo,isReady:id,get:od,wait:ad};let vo=null,Sa=null;function sd(){return vo}function ld(){return Sa}function cd(e){vo=e;}function dd(e){Sa=e;}function ka(){return vo!==null}const ud=15e3;async function pd(e={}){ka()||await xo(e);}async function xo(e={}){const t=sd();if(t)return t;const n=ld();if(n)return n;const o=(async()=>{const r=e.gameVersion??await yo.wait({timeoutMs:ud}),i=`${Jc}/version/${r}/assets/`;return cd(i),i})();return dd(o),o}async function fd(e){const t=await xo();return Ve(t,e)}function gd(){return ka()}const ft={init:pd,isReady:gd,base:xo,url:fd};function Wn(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function an(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Wn(o):`sprite/${n}/${o}`}function tn(e,t,n,o){const r=an(e,t);if(n.has(r)||o.has(r))return r;const i=String(t||"").trim();if(n.has(i)||o.has(i))return i;const a=Wn(i);return n.has(a)||o.has(a)?a:r}function md(e,t,n=25e3){const o=[e],r=new Set;let i=0;for(;o.length&&i++<n;){const a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)o.push(s[c]);}return null}function hd(e){const t=E.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,o=md(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function bd(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return hd(e)}catch{await Zn(50);}throw new Error("Constructors timeout")}const tt=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},Ca=new Map;function yd(e){return Ca.get(e)}function vd(e,t){Ca.set(e,t);}const Aa="manifest.json";let Dr=null;async function xd(){Dr||(Dr=await Ta());}function wd(){return Dr!==null}async function Ta(e={}){const t=e.baseUrl??await ft.base(),n=yd(t);if(n)return n;const o=mo(Ve(t,Aa));return vd(t,o),o}function Sd(e,t){return e.bundles.find(n=>n.name===t)??null}function kd(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const o of n.src??[])typeof o=="string"&&o.endsWith(".json")&&o!==Aa&&t.add(o);return Array.from(t)}const Ke={init:xd,isReady:wd,load:Ta,getBundle:Sd,listJsonFromBundle:kd};function Cd(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function hr(e,t,n,o,r){return new e(t,n,o,r)}function Ad(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Td(e,t,n,o){const{Texture:r,Rectangle:i}=o;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,u=!!s.rotated,l=u?2:0,d=u?c.h:c.w,p=u?c.w:c.h,f=hr(i,c.x,c.y,d,p),g=s.sourceSize||{w:c.w,h:c.h},m=hr(i,0,0,g.w,g.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const b=s.spriteSourceSize;h=hr(i,b.x,b.y,b.w,b.h);}n.set(a,Ad(r,t,f,m,h,l,s.anchor||null));}}function Pd(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;const i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i);}}function Id(e,t){const n=(o,r)=>{const i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const o of Object.keys(e.frames||{})){const r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2]);}}async function Md(e,t){const n=await Ke.load(e),o=Ke.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");const r=Ke.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,c=new Map;async function u(l){if(i.has(l))return;i.add(l);const d=await mo(Ve(e,l));if(!Cd(d))return;const p=d.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await u(ti(l,h));const f=ti(l,d.meta.image),g=await Xc(await va(Ve(e,f))),m=t.Texture.from(g);Td(d,m,a,t),Pd(d,a,s),Id(d,c);}for(const l of r)await u(l);return {textures:a,animations:s,categoryIndex:c}}let yn=null;async function Ed(){return ve.ready?true:yn||(yn=(async()=>{const e=performance.now();tt("init start");const t=await Zo(Le.appReady,15e3,"PIXI app");tt("app ready");const n=await Zo(Le.rendererReady,15e3,"PIXI renderer");tt("renderer ready"),ve.app=t,ve.renderer=n||t?.renderer||null,ve.ctors=await bd(t),tt("constructors resolved"),ve.baseUrl=await ft.base(),tt("base url",ve.baseUrl);const{textures:o,animations:r,categoryIndex:i}=await Md(ve.baseUrl,ve.ctors);return ve.textures=o,ve.animations=r,ve.categoryIndex=i,tt("atlases loaded","textures",ve.textures.size,"animations",ve.animations.size,"categories",ve.categoryIndex?.size??0),ve.ready=true,tt("ready in",Math.round(performance.now()-e),"ms"),true})(),yn)}const At={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Pa=Object.keys(At),Ld=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],ni=new Map(Ld.map((e,t)=>[e,t]));function Hn(e){return [...new Set(e.filter(Boolean))].sort((n,o)=>(ni.get(n)??1/0)-(ni.get(o)??1/0))}const _d=["Wet","Chilled","Frozen"],Od=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Rd={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Nd={Pepper:.5,Banana:.6},$d=256,Fd=.5,Dd=2;function Ia(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=Hn(e),n=Gd(e),o=jd(e);return {muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function Gd(e){const t=e.filter((r,i,a)=>At[r]&&a.indexOf(r)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?Hn(t.filter(r=>!_d.includes(r))):Hn(t)}function jd(e){const t=e.filter((n,o,r)=>At[n]?.overlayTall&&r.indexOf(n)===o);return Hn(t)}function br(e,t){return e.map(n=>({name:n,meta:At[n],overlayTall:At[n]?.overlayTall??null,isTall:t}))}const zd={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},vn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(const r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function Bd(e){return vn.has(e)?e:vn.has("overlay")?"overlay":vn.has("screen")?"screen":vn.has("lighter")?"lighter":"source-atop"}function Wd(e,t,n,o,r=false){const i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){const d=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*d,s-Math.sin(i)*d,a+Math.cos(i)*d,s+Math.sin(i)*d)}const c=Math.cos(i),u=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(u)*n/2;return e.createLinearGradient(a-c*l,s-u*l,a+c*l,s+u*l)}function ri(e,t,n,o,r=false){const i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?Wd(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function Hd(e,t,n,o){const r=zd[n];if(!r)return;const i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&o,s=t.width,c=t.height;e.save();const u=i.masked?Bd(i.op):"source-in";if(e.globalCompositeOperation=u,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const d=l.getContext("2d");d.imageSmoothingEnabled=false,ri(d,s,c,i,a),d.globalCompositeOperation="destination-in",d.drawImage(t,0,0),e.drawImage(l,0,0);}else ri(e,s,c,i,a);e.restore();}function Ud(e){return /tallplant/i.test(e)}function wo(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Ma(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function Vd(e,t){const n=String(e||"").toLowerCase();for(const o of t.keys()){const r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){const a=t.get(o);if(a)return {tex:a,key:o}}}return null}function Kd(e,t,n,o){if(!t)return null;const r=wo(e),i=Ma(t);for(const a of i){const s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(const c of s){const u=n.get(c);if(u)return {tex:u,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,u=n.get(c);if(u)return {tex:u,key:c};const l=`sprite/mutation-overlay/${a}`,d=n.get(l);if(d)return {tex:d,key:l};const p=Vd(t,n);if(p)return p}}return null}function Yd(e,t,n,o){if(!t)return null;const r=At[t];if(n&&r?.tallIconOverride){const s=o.get(r.tallIconOverride);if(s)return s}const i=wo(e),a=Ma(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const u of c){const l=o.get(u);if(l)return l}if(n){const u=`sprite/mutation-overlay/${s}TallPlantIcon`,l=o.get(u);if(l)return l;const d=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(d);if(p)return p}}return null}function qd(e,t,n){const o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=Nd[t]??i;const c=r>o*1.5;let u=Rd[t]??(c?a:.4);const l={x:(s-i)*o,y:(u-a)*r},d=Math.min(o,r),p=Math.min(1.5,d/$d);let f=Fd*p;return n&&(f*=Dd),{width:o,height:r,anchorX:i,anchorY:a,offset:l,iconScale:f}}function Ea(e,t){return `${t.sig}::${e}`}function La(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Jd(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function Xd(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-La(o??null));}}function _a(e,t){const n=e.lru.get(t);return n?(Jd(e,t,n),n):null}function Oa(e,t,n,o){e.lru.set(t,n),e.cost+=La(n),Xd(e,o);}function Qd(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Zd(e,t){return e.srcCanvas.get(t)??null}function eu(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){const r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r);}}function er(e,t,n,o,r){const i=Zd(o,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),u=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&u){const l=Math.round(u.width/s),d=Math.round(u.height/s);a=document.createElement("canvas"),a.width=l,a.height=d;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(u,0,0,l,d));}else a=u;}}catch{}if(!a){const c=e?.frame||e?._frame,u=e?.orig||e?._orig,l=e?.trim||e?._trim,d=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(u?.width??c.width)|0),g=Math.max(1,(u?.height??c.height)|0),m=l?.x??0,h=l?.y??0;a.width=f,a.height=g;const b=a.getContext("2d");b.imageSmoothingEnabled=false,d===true||d===2||d===8?(b.save(),b.translate(m+c.height/2,h+c.width/2),b.rotate(-Math.PI/2),b.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),b.restore()):b.drawImage(p,c.x,c.y,c.width,c.height,m,h,c.width,c.height);}return eu(o,e,a,r),a}function tu(e,t,n,o,r,i,a,s){const{w:c,h:u,aX:l,aY:d,basePos:p}=t,f=[];for(const g of n){const m=new o.Sprite(e);m.anchor?.set?.(l,d),m.position.set(p.x,p.y),m.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=u;const b=h.getContext("2d");b.imageSmoothingEnabled=false,b.save(),b.translate(c*l,u*d),b.drawImage(er(e,r,o,i,a),-c*l,-u*d),b.restore(),Hd(b,h,g.name,g.isTall);const S=o.Texture.from(h,{resolution:e.resolution??1});s.push(S),m.texture=S,f.push(m);}return f}function nu(e,t,n,o,r,i,a,s,c,u){const{aX:l,basePos:d}=t,p=[];for(const f of n){const g=f.overlayTall&&o.get(f.overlayTall)&&{tex:o.get(f.overlayTall),key:f.overlayTall}||Kd(e,f.name,o);if(!g?.tex)continue;const m=er(g.tex,i,r,a,s);if(!m)continue;const h=m.width,b={x:0,y:0},S={x:d.x-l*h,y:0},v=document.createElement("canvas");v.width=h,v.height=m.height;const y=v.getContext("2d");if(!y)continue;y.imageSmoothingEnabled=false,y.drawImage(m,0,0),y.globalCompositeOperation="destination-in",y.drawImage(c,-S.x,-0);const C=r.Texture.from(v,{resolution:g.tex.resolution??1});u.push(C);const x=new r.Sprite(C);x.anchor?.set?.(b.x,b.y),x.position.set(S.x,S.y),x.scale.set(1),x.alpha=1,x.zIndex=3,p.push(x);}return p}function ru(e,t,n,o,r,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const u=Yd(e,c.name,c.isTall,o);if(!u)continue;const l=new r.Sprite(u),d=u?.defaultAnchor?.x??.5,p=u?.defaultAnchor?.y??.5;l.anchor?.set?.(d,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),Od.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function Ra(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;const{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,u=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,d={x:s*u,y:c*l},p=er(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),f=new r;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(u,l),g.position.set(d.x,d.y),g.zIndex=0,f.addChild(g);const m=Ud(t),h=br(n.muts,m),b=br(n.overlayMuts,m),S=br(n.selectedMuts,m),v=[],y={w:s,h:c,aX:u,aY:l,basePos:d},C=wo(t),x=qd(e,C,m);tu(e,y,h,o.ctors,o.renderer,o.cacheState,o.cacheConfig,v).forEach(G=>f.addChild(G)),m&&nu(t,y,b,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,v).forEach(J=>f.addChild(J)),ru(t,y,S,o.textures,o.ctors,x).forEach(G=>f.addChild(G));let T={x:0,y:0,width:s,height:c};try{const G=f.getLocalBounds?.()||f.getBounds?.(!0);G&&Number.isFinite(G.width)&&Number.isFinite(G.height)&&(T={x:G.x,y:G.y,width:G.width,height:G.height});}catch{}const{Rectangle:_}=o.ctors,L=_?new _(0,0,s,c):void 0;let F=null;if(typeof o.renderer.generateTexture=="function"?F=o.renderer.generateTexture(f,{resolution:1,region:L}):o.renderer.textureGenerator?.generateTexture&&(F=o.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:L})),!F)throw new Error("no render texture");const ee=F instanceof a?F:a.from(o.renderer.extract.canvas(F));try{ee.__mg_base={baseX:-T.x,baseY:-T.y,baseW:s,baseH:c,texW:T.width,texH:T.height};}catch{}F&&F!==ee&&F.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{ee.__mg_gen=!0,ee.label=`${t}|${n.sig}`;}catch{}return ee}catch{return null}}function ou(e,t,n,o){if(!e||e.length<2)return null;const r=[];for(const i of e){const a=Ra(i,t,n,o);a&&r.push(a);}return r.length>=2?r:null}function Na(e,t,n,o,r){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,u=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${u}|bm${n}|bp${r}|p${o}`}function iu(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function au(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,r=a);r&&e.cache.delete(r);}e.cache.set(n,{canvas:o,lastAccess:performance.now()});}}function oi(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function su(e){e.cache.clear();}function lu(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function cu(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function du(e,t,n,o,r,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const u=e.length;let l=0;a?.(0,u);for(let d=0;d<u;d+=s){const p=e.slice(d,d+s);for(const f of p)try{const g=tn(null,f,t.textures,t.animations),m={scale:1},h=Fa(m),b=Da(h,m),S=ja(h,m.boundsPadding),v=Na(g,m,h,b,S);r.cache.has(v)||Gr(t,n,o,null,f,m,r,i),l++;}catch{l++;}a?.(l,u),d+s<u&&await cu();}return l}function uu(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function pu(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function So(e,t,n,o,r,i){if(!n.length)return t;const a=Ia(n);if(!a.sig)return t;const s=Ea(e,a),c=_a(r,s);if(c?.tex)return c.tex;const u=Ra(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return u?(Oa(r,s,{isAnim:false,tex:u},i),u):t}function $a(e,t,n,o,r,i){if(!n.length)return t;const a=Ia(n);if(!a.sig)return t;const s=Ea(e,a),c=_a(r,s);if(c?.isAnim&&c.frames?.length)return c.frames;const u=ou(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return u?(Oa(r,s,{isAnim:true,frames:u},i),u):t}function ii(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=tn(o,r,e.textures,e.animations),s=i.mutations||[],c=i.parent||pu(e)||uu(e),u=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,d=i.center?u/2:i.x??u/2,p=i.center?l/2:i.y??l/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const b=$a(a,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(b),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const v=new e.ctors.Sprite(b[0]),C=1e3/Math.max(1,i.fps||8);let x=0,A=0;const P=T=>{const _=e.app.ticker?.deltaMS??T*16.666666666666668;if(x+=_,x<C)return;const L=x/C|0;x%=C,A=(A+L)%b.length,v.texture=b[A];};v.__mgTick=P,e.app.ticker?.add?.(P),f=v;}}else {const b=e.textures.get(a);if(!b)throw new Error(`Unknown sprite/anim key: ${a}`);const S=So(a,b,s,e,t,n);f=new e.ctors.Sprite(S);}const m=i.anchorX??f.texture?.defaultAnchor?.x??.5,h=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,h),f.position.set(d,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function fu(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const ai=new Map;function Fa(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function Da(e,t){return e==="mutations"?t.pad??2:t.pad??0}function Ot(e){return Number.isFinite(e)?Math.max(0,e):0}function Ga(e){if(typeof e=="number"){const t=Ot(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Ot(e.top??0),right:Ot(e.right??0),bottom:Ot(e.bottom??0),left:Ot(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function ja(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Ga(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function za(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function Ba(e,t,n){const o=e?.__mg_base;return o&&Number.isFinite(o.baseX)&&Number.isFinite(o.baseY)&&Number.isFinite(o.baseW)&&Number.isFinite(o.baseH)&&Number.isFinite(o.texW)&&Number.isFinite(o.texH)?o:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function gu(e,t,n,o,r,i){const a=`${e}|f${t}`,s=ai.get(a);if(s)return s;const c=za(n),u={top:0,right:0,bottom:0,left:0};for(const l of Pa){const d=So(e,n,[l],o,r,i),p=Ba(d,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>u.left&&(u.left=f),g>u.top&&(u.top=g),m>u.right&&(u.right=m),h>u.bottom&&(u.bottom=h);}return ai.set(a,u),u}function Gr(e,t,n,o,r,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=tn(o,r,e.textures,e.animations),u=Fa(i),l=Da(u,i),d=ja(u,i.boundsPadding),p=a&&s?.enabled?Na(c,i,u,l,d):null;if(p&&a&&s?.enabled){const v=iu(a,p);if(v)return oi(v)}const f=i.mutations||[],g=e.animations.get(c),m=Math.max(0,(i.frameIndex??0)|0);let h,b;if(g?.length)if(h=g[m%g.length],f.length){const v=$a(c,g,f,e,t,n);b=v[m%v.length];}else b=h;else {const v=e.textures.get(c);if(!v)throw new Error(`Unknown sprite/anim key: ${c}`);h=v,b=So(c,v,f,e,t,n);}let S;if(u==="mutations"){const v=new e.ctors.Sprite(b),y=i.anchorX??v.texture?.defaultAnchor?.x??.5,C=i.anchorY??v.texture?.defaultAnchor?.y??.5;v.anchor?.set?.(y,C),v.scale.set(i.scale??1);const x=new e.ctors.Container;x.addChild(v);try{x.updateTransform?.();}catch{}const A=v.getBounds?.(true)||{x:0,y:0,width:v.width,height:v.height};v.position.set(-A.x+l,-A.y+l),S=fu(e,x);try{x.destroy?.({children:!0});}catch{}}else {const v=i.scale??1;let y=Ga(i.boundsPadding);u==="padded"&&i.boundsPadding==null&&(y=gu(c,m,h,e,t,n)),l&&(y={top:y.top+l,right:y.right+l,bottom:y.bottom+l,left:y.left+l});const C=za(h),x=Ba(b,C.w,C.h),A=Math.max(1,Math.ceil((C.w+y.left+y.right)*v)),P=Math.max(1,Math.ceil((C.h+y.top+y.bottom)*v));S=document.createElement("canvas"),S.width=A,S.height=P;const T=S.getContext("2d");if(T){T.imageSmoothingEnabled=false;const _=er(b,e.renderer,e.ctors,t,n),L=(y.left-x.baseX)*v,F=(y.top-x.baseY)*v;T.drawImage(_,L,F,_.width*v,_.height*v);}}return p&&a&&s?.enabled?(au(a,s,p,S),oi(S)):S}function mu(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function hu(e,t){return e.defaultParent=t,true}function bu(e,t){return e.defaultParent=t,true}function gt(){if(!fa())throw new Error("MGSprite not ready yet")}function yu(e,t,n){return typeof t=="string"?ii(Se(),Ct(),Zt(),e,t,n||{}):ii(Se(),Ct(),Zt(),null,e,t||{})}function vu(e,t,n){return typeof t=="string"?Gr(Se(),Ct(),Zt(),e,t,n||{},en(),Fr()):Gr(Se(),Ct(),Zt(),null,e,t||{},en(),Fr())}function xu(){mu(Se());}function wu(e){return hu(Se(),e)}function Su(e){return bu(Se(),e)}function ku(e,t){const n=Se(),o=typeof t=="string"?tn(e,t,n.textures,n.animations):tn(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function Cu(){gt();const e=Se().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Au(e){gt();const t=String(e||"").trim();if(!t)return [];const n=Se().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Tu(e,t){gt();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return  false;const r=Se().categoryIndex;if(!r)return  false;const i=n.toLowerCase(),a=o.toLowerCase();for(const[s,c]of r.entries())if(s.toLowerCase()===i){for(const u of c.values())if(u.toLowerCase()===a)return  true}return  false}function Pu(e){gt();const t=Se().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),o=[];for(const[r,i]of t.entries())for(const a of i.values()){const s=an(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s);}return o.sort((r,i)=>r.localeCompare(i))}function Iu(e){gt();const t=String(e||"").trim();if(!t)return null;const n=Wn(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;const r=o[1],i=o[2],a=Se().categoryIndex,s=r.toLowerCase(),c=i.toLowerCase();let u=r,l=i;if(a){const d=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!d)return null;u=d;const p=a.get(d);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:u,id:l,key:an(u,l)}}function Mu(e,t){gt();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");const r=Se().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(l=>l.toLowerCase()===i)||n,c=r.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const u=Array.from(c.values()).find(l=>l.toLowerCase()===a)||o;if(!c.has(u))throw new Error(`Unknown sprite id: ${n}/${o}`);return an(s,u)}function Eu(){Qd(Ct());}function Lu(){su(en());}function _u(){return lu(en())}function Ou(){return [...Pa]}async function Ru(e,t,n=10,o=0){return gt(),du(e,Se(),Ct(),Zt(),en(),Fr(),t,n,o)}const me={init:Ed,isReady:fa,show:yu,toCanvas:vu,clear:xu,attach:wu,attachProvider:Su,has:ku,key:(e,t)=>an(e,t),getCategories:Cu,getCategoryId:Au,hasId:Tu,listIds:Pu,getIdInfo:Iu,getIdPath:Mu,clearMutationCache:Eu,clearToCanvasCache:Lu,getToCanvasCacheStats:_u,getMutationNames:Ou,warmup:Ru},Nu=E,Fe=Nu.Object??Object,tr=Fe.keys,Un=Fe.values,Vn=Fe.entries,si=new WeakSet;function $u(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0}}const Z=$u(),nt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Fu=["Rain","Frost","Dawn","AmberMoon"],li=/main-[^/]+\.js(\?|$)/,Du=6,Gu=150,ju=2e3,zu=200,Bu=50,rt=(e,t)=>t.every(n=>e.includes(n));function ot(e,t){Z.data[e]==null&&(Z.data[e]=t,Kn()&&Ua());}function Kn(){return Object.values(Z.data).every(e=>e!=null)}function Wa(e,t){if(!e||typeof e!="object"||si.has(e))return;si.add(e);let n;try{n=tr(e);}catch{return}if(!n||n.length===0)return;const o=e;let r;if(!Z.data.items&&rt(n,nt.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&ot("items",o)),!Z.data.decor&&rt(n,nt.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&ot("decor",o)),!Z.data.mutations&&rt(n,nt.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&ot("mutations",o)),!Z.data.eggs&&rt(n,nt.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&ot("eggs",o)),!Z.data.pets&&rt(n,nt.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&ot("pets",o)),!Z.data.abilities&&rt(n,nt.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&ot("abilities",o)),!Z.data.plants&&rt(n,nt.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&ot("plants",o)),!(t>=Du))for(const i of n){let a;try{a=o[i];}catch{continue}a&&typeof a=="object"&&Wa(a,t+1);}}function On(e){try{Wa(e,0);}catch{}}function Ha(){if(!Z.isHookInstalled){if(Fe.__MG_HOOKED__){Z.isHookInstalled=true;return}Fe.__MG_HOOKED__=true,Z.isHookInstalled=true;try{Fe.keys=function(t){return On(t),tr.apply(this,arguments)},Un&&(Fe.values=function(t){return On(t),Un.apply(this,arguments)}),Vn&&(Fe.entries=function(t){return On(t),Vn.apply(this,arguments)});}catch{}}}function Ua(){if(Z.isHookInstalled){try{Fe.keys=tr,Un&&(Fe.values=Un),Vn&&(Fe.entries=Vn);}catch{}Z.isHookInstalled=false;}}function Wu(){if(Z.scanInterval||Kn())return;const e=()=>{if(Kn()||Z.scanAttempts>Gu){Va();return}Z.scanAttempts++;try{tr(E).forEach(t=>{try{On(E[t]);}catch{}});}catch{}};e(),Z.scanInterval=setInterval(e,ju);}function Va(){Z.scanInterval&&(clearInterval(Z.scanInterval),Z.scanInterval=null);}const ci=E;function Hu(){try{for(const e of ci.document?.scripts||[]){const t=e?.src?String(e.src):"";if(li.test(t))return t}}catch{}try{for(const e of ci.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(li.test(t))return t}}catch{}return null}function Uu(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const o=e.indexOf("=",n);if(o<0||o>t)return null;const r=e.indexOf("{",o);if(r<0||r>t)return null;let i=0,a="",s=false;for(let c=r;c<e.length;c++){const u=e[c];if(a){if(s){s=false;continue}if(u==="\\"){s=true;continue}u===a&&(a="");continue}if(u==='"'||u==="'"){a=u;continue}if(u==="{")i++;else if(u==="}"&&--i===0)return e.slice(r,c+1)}return null}function Vu(e){const t={};let n=false;for(const o of Fu){const r=e?.[o];if(!r||typeof r!="object")continue;const i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Ku(){if(Z.data.weather)return  true;const e=Hu();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const o=Uu(t,n);if(!o)return  false;const r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+r+")")();}catch{return  false}const a=Vu(i);return a?(Z.data.weather=a,true):false}function Yu(){if(Z.weatherPollingTimer)return;Z.weatherPollAttempts=0;const e=setInterval(async()=>{(await Ku()||++Z.weatherPollAttempts>zu)&&(clearInterval(e),Z.weatherPollingTimer=null);},Bu);Z.weatherPollingTimer=e;}function qu(){Z.weatherPollingTimer&&(clearInterval(Z.weatherPollingTimer),Z.weatherPollingTimer=null);}function Ju(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Xu(e,t=[]){const n=new Set,o=r=>{const i=String(r||"").trim();i&&n.add(i);};o(e);for(const r of t)o(r);for(const r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Ka(e,t,n,o=[],r=[]){const i=window.Gemini?.Modules?.Sprite;if(!i)return null;const a=Xu(e,o);if(!a.length)return null;const s=[t,...r].filter(d=>typeof d=="string"),c=d=>{const p=String(d||"").trim();if(!p)return null;for(const f of a)try{if(i.has(f,p))return i.getIdPath(f,p)}catch{}return null};for(const d of s){const p=c(d);if(p)return p}const u=Ju(n||""),l=c(u||n||"");if(l)return l;try{for(const d of a){const p=i.listIds(`sprite/${d}/`),f=s.map(m=>String(m||"").toLowerCase()),g=String(n||u||"").toLowerCase();for(const m of p){const b=(m.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&S===b)||b===g)return m}for(const m of p){const b=(m.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&b.includes(S))||g&&b.includes(g))return m}}}catch{}return null}function Pe(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=Ka(s,n,o,r,i);if(c)try{e.spriteId=c;}catch{}const u=e.rotationVariants;if(u&&typeof u=="object")for(const l of Object.values(u))Pe(l,s,n,o);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Pe(l,s,n,o),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Pe(l,s,n,o),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Pe(e.activeState,s,n,e.activeState?.name||o);}function Qu(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;const r=t[0],i=t.slice(1);return Ka(e,r,n??null,o,i)}function Zu(e){for(const[t,n]of Object.entries(e.items||{}))Pe(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Pe(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Pe(n,"mutations",t,n?.name,["mutation"]);const o=Qu("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Pe(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Pe(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const o=n;o.seed&&Pe(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&Pe(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&Pe(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function ep(){try{Zu(Z.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Ya=1e4,qa=50;function Ja(e){return new Promise(t=>setTimeout(t,e))}function tp(e){return Z.data[e]}function np(){return {...Z.data}}function rp(e){return Z.data[e]!=null}async function op(e,t=Ya,n=qa){const o=Date.now();for(;Date.now()-o<t;){const r=Z.data[e];if(r!=null)return r;await Ja(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function ip(e=Ya,t=qa){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Z.data).some(o=>o!=null))return {...Z.data};await Ja(t);}throw new Error("MGData.waitForAnyData: timeout")}const ae={async init(){Ha(),Wu(),Yu();},isReady:Kn,get:tp,getAll:np,has:rp,waitFor:op,waitForAny:ip,resolveSprites:ep,cleanup(){Ua(),Va(),qu();}},ap={expanded:false,sort:{key:null,dir:null},search:""},sp={categories:{}};async function lp(){const e=await ta("tab-test",{version:2,defaults:sp,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...ap}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function o(i,a,s){const c=e.get(),u=t(i);e.update({categories:{...c.categories,[i]:{...u,sort:{key:a,dir:s}}}});}function r(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}const cp={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function xn(e){return e?cp[e]??0:0}class dp extends on{constructor(){super({id:"tab-test",label:"Test"});ie(this,"stateCtrl",null);}async build(n){this.stateCtrl=await lp();const o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o);}renderSprite(n){const o=w("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const r=n.spriteId;requestAnimationFrame(()=>{try{const i=me.toCanvas(r,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",o.appendChild(i);}catch{o.textContent="-";}});}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){const r=w("span",{style:"opacity:0.5;"});return r.textContent="—",r}return pa({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;const f=p.toLowerCase();return r.filter(g=>g.name.toLowerCase().includes(f))},c=da({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const u=ua({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=w("div",{style:"margin-bottom:8px;"});l.appendChild(u.root);const d=w("div");return d.appendChild(l),d.appendChild(c.root),Ae({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},d)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){const r=ae.get("plants");if(!r)return null;for(const a of Object.values(r))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=o.toLowerCase();for(const a of Object.values(r)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const o=ae.get("pets");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){const o=ae.get("items");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){const o=ae.get("decor");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){const o=ae.get("eggs");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(o,r);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(o);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4);})}async buildSpriteTables(n){const o=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>xn(i.rarity)-xn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!me.isReady())try{await me.init();}catch{return}const r=me.getCategories();for(let i=0;i<r.length;i++){await this.yieldToMain(8);const a=r[i],c=me.getCategoryId(a).map(u=>{const l=`sprite/${a}/${u}`;return {name:u,spriteId:l,rarity:this.getRarityForSprite(a,l,u)}});if(c.sort((u,l)=>xn(u.rarity)-xn(l.rarity)),c.length>0){const u=this.createDataCard(a,this.formatCategoryName(a),c,o);n.appendChild(u);}}}}const up=new Map;function pp(){return up}function jr(){return E.jotaiAtomCache?.cache}function Ze(e){const t=pp(),n=t.get(e);if(n)return n;const o=jr();if(!o)return null;for(const r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function fp(){const e=E;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:o=>{const r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{const i=n.get(o);i&&i.add(r);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:false};}const gp={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function It(){return gp}const mp="__JOTAI_STORE_READY__";let di=false;const zr=new Set;function wn(){if(!di){di=true;for(const e of zr)try{e();}catch{}try{const e=E.CustomEvent||CustomEvent;E.dispatchEvent?.(new e(mp));}catch{}}}function hp(e){zr.add(e);const t=Wr();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{zr.delete(e);}}async function bp(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Wr();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=false;const s=hp(()=>{a||(a=true,s(),r());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=Wr();if(l.via&&!l.polyfill){if(a)return;a=true,s(),r();return}await nn(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const nn=e=>new Promise(t=>setTimeout(t,e));function Xa(){try{const e=E.Event||Event;E.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Br(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function yr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Br(e))return e;const o=["store","value","current","state","s","baseStore"];for(const r of o)try{const i=e[r];if(Br(i))return i}catch{}return null}function Qa(){const e=It(),t=E.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);r&&(n+=r.size||0);}if(n===0)return null;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);if(r)for(const i of r){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const u=c?.pendingProps?.value;if(Br(u))return e.lastCapturedVia="fiber",u}catch{}try{let u=c?.memoizedState,l=0;for(;u&&l<15;){l++;const d=yr(u);if(d)return e.lastCapturedVia="fiber",d;const p=yr(u.memoizedState);if(p)return e.lastCapturedVia="fiber",p;u=u.next;}}catch{}try{if(c?.stateNode){const u=yr(c.stateNode);if(u)return e.lastCapturedVia="fiber",u}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Za(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function yp(e=5e3){const t=Date.now();let n=jr();for(;!n&&Date.now()-t<e;)await nn(100),n=jr();if(!n)throw new Error("jotaiAtomCache.cache not found");const o=It();let r=null,i=null;const a=[],s=()=>{for(const u of a)try{u.__origWrite&&(u.write=u.__origWrite,delete u.__origWrite);}catch{}};for(const u of n.values()){if(!u||typeof u.write!="function"||u.__origWrite)continue;const l=u.write;u.__origWrite=l,u.write=function(d,p,...f){return i||(r=d,i=p,s()),l.call(this,d,p,...f)},a.push(u);}Xa();const c=Date.now();for(;!i&&Date.now()-c<e;)await nn(50);return i?(o.lastCapturedVia="write",{get:u=>r(u),set:(u,l)=>i(u,l),sub:(u,l)=>{let d;try{d=r(u);}catch{}const p=setInterval(()=>{let f;try{f=r(u);}catch{return}if(f!==d){d=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",Za())}async function vp(e=1e4){const t=It();Xa();const n=Date.now();for(;Date.now()-n<e;){const o=Qa();if(o)return o;await nn(50);}return t.lastCapturedVia="polyfill",Za()}async function ko(){const e=It();if(e.baseStore&&!e.baseStore.__polyfill)return wn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await nn(25);if(e.baseStore)return e.baseStore.__polyfill||wn(),e.baseStore}e.captureInProgress=true;try{const t=Qa();if(t)return e.baseStore=t,wn(),t;try{const o=await yp(5e3);return e.baseStore=o,o.__polyfill||wn(),o}catch(o){e.captureError=o;}const n=await vp();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Wr(){const e=It();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function xp(){const e=await ko(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0;}catch{}const a=e.sub(r,()=>{let s;try{s=e.get(r);}catch{return}const c=i.last,u=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,u)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(r){const i=await n(r);if(i.has)return i.last;const a=e.get(r);return i.last=a,i.has=true,a},async set(r,i){await e.set(r,i);const a=await n(r);a.last=i,a.has=true;},async sub(r,i){const a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(r){return t.get(r)?.last},hasShadow(r){return !!t.get(r)?.has},async ensureWatch(r){await n(r);},async asStore(){return {get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Rn(){const e=It();return e.mirror||(e.mirror=await xp()),e.mirror}const ue={async select(e){const t=await Rn(),n=Ze(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Rn(),o=Ze(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t);},async subscribe(e,t){const n=await Rn(),o=Ze(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r);}catch{}})},async subscribeImmediate(e,t){const n=await ue.select(e);try{t(n);}catch{}return ue.subscribe(e,t)}};async function wp(){await Rn();}function Co(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function rn(e,t){const n=Co(t);let o=e;for(const r of n){if(o==null)return;o=o[r];}return o}function Sp(e,t,n){const o=Co(t);if(!o.length)return n;const r=Array.isArray(e)?[...e]:{...e??{}};let i=r;for(let a=0;a<o.length-1;a++){const s=o[a],c=i[s],u=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=u,i=u;}return i[o[o.length-1]]=n,r}function ui(e,t){const n={};for(const o of t)n[o]=o.includes(".")?rn(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function kp(e,t,n){const o=n.mode??"auto";function r(u){const l=t?rn(u,t):u,d=new Map;if(l==null)return {signatures:d,keys:[]};const p=Array.isArray(l);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],h=n.key?n.key(m,g,u):g,b=n.sig?n.sig(m,g,u):n.fields?ui(m,n.fields):JSON.stringify(m);d.set(h,b);}else for(const[g,m]of Object.entries(l)){const h=n.key?n.key(m,g,u):g,b=n.sig?n.sig(m,g,u):n.fields?ui(m,n.fields):JSON.stringify(m);d.set(h,b);}return {signatures:d,keys:Array.from(d.keys())}}function i(u,l){if(u===l)return  true;if(!u||!l||u.size!==l.size)return  false;for(const[d,p]of u)if(l.get(d)!==p)return  false;return  true}async function a(u){let l=null;return ue.subscribeImmediate(e,d=>{const p=t?rn(d,t):d,{signatures:f}=r(p);if(!i(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const h of g){const b=l?.get(h)??"__NONE__",S=f.get(h)??"__NONE__";b!==S&&m.push(h);}l=f,u({value:p,changedKeys:m});}})}async function s(u,l){return a(({value:d,changedKeys:p})=>{p.includes(u)&&l({value:d});})}async function c(u,l){const d=new Set(u);return a(({value:p,changedKeys:f})=>{const g=f.filter(m=>d.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:c}}const wt=new Map;function Cp(e,t){const n=wt.get(e);if(n)try{n();}catch{}return wt.set(e,t),()=>{try{t();}catch{}wt.get(e)===t&&wt.delete(e);}}function ce(e,t={}){const{path:n,write:o="replace"}=t,r=n?`${e}:${Co(n).join(".")}`:e;async function i(){const d=await ue.select(e);return n?rn(d,n):d}async function a(d){if(typeof o=="function"){const g=await ue.select(e),m=o(d,g);return ue.set(e,m)}const p=await ue.select(e),f=n?Sp(p,n,d):d;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof d=="object"?ue.set(e,{...p,...d}):ue.set(e,f)}async function s(d){const p=await i(),f=d(p);return await a(f),f}async function c(d,p,f){let g;const m=b=>{const S=n?rn(b,n):b;if(typeof g>"u"||!f(g,S)){const v=g;g=S,p(S,v);}},h=d?await ue.subscribeImmediate(e,m):await ue.subscribe(e,m);return Cp(r,h)}function u(){const d=wt.get(r);if(d){try{d();}catch{}wt.delete(r);}}function l(d){return kp(e,d?.path??n,d)}return {label:r,get:i,set:a,update:s,onChange:(d,p=Object.is)=>c(false,d,p),onChangeNow:(d,p=Object.is)=>c(true,d,p),asSignature:l,stopOnChange:u}}function k(e){return ce(e)}k("positionAtom");k("lastPositionInMyGardenAtom");k("playerDirectionAtom");k("stateAtom");k("quinoaDataAtom");k("currentTimeAtom");k("actionAtom");k("isPressAndHoldActionAtom");k("mapAtom");k("tileSizeAtom");ce("mapAtom",{path:"cols"});ce("mapAtom",{path:"rows"});ce("mapAtom",{path:"spawnTiles"});ce("mapAtom",{path:"locations.seedShop.spawnTileIdx"});ce("mapAtom",{path:"locations.eggShop.spawnTileIdx"});ce("mapAtom",{path:"locations.toolShop.spawnTileIdx"});ce("mapAtom",{path:"locations.decorShop.spawnTileIdx"});ce("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});ce("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});ce("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});ce("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});ce("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});k("playerAtom");k("myDataAtom");k("myUserSlotIdxAtom");k("isSpectatingAtom");k("myCoinsCountAtom");k("numPlayersAtom");ce("playerAtom",{path:"id"});k("userSlotsAtom");k("filteredUserSlotsAtom");k("myUserSlotAtom");k("spectatorsAtom");ce("stateAtom",{path:"child"});ce("stateAtom",{path:"child.data"});ce("stateAtom",{path:"child.data.shops"});const Ap=ce("stateAtom",{path:"child.data.userSlots"}),Tp=ce("stateAtom",{path:"data.players"}),Pp=ce("stateAtom",{path:"data.hostPlayerId"});k("myInventoryAtom");k("myInventoryItemsAtom");k("isMyInventoryAtMaxLengthAtom");k("myFavoritedItemIdsAtom");k("myCropInventoryAtom");k("mySeedInventoryAtom");k("myToolInventoryAtom");k("myEggInventoryAtom");k("myDecorInventoryAtom");k("myPetInventoryAtom");ce("myInventoryAtom",{path:"favoritedItemIds"});k("itemTypeFiltersAtom");k("myItemStoragesAtom");k("myPetHutchStoragesAtom");k("myPetHutchItemsAtom");k("myPetHutchPetItemsAtom");k("myNumPetHutchItemsAtom");k("myValidatedSelectedItemIndexAtom");k("isSelectedItemAtomSuspended");k("mySelectedItemAtom");k("mySelectedItemNameAtom");k("mySelectedItemRotationsAtom");k("mySelectedItemRotationAtom");k("setSelectedIndexToEndAtom");k("myPossiblyNoLongerValidSelectedItemIndexAtom");k("myCurrentGlobalTileIndexAtom");k("myCurrentGardenTileAtom");k("myCurrentGardenObjectAtom");k("myOwnCurrentGardenObjectAtom");k("myOwnCurrentDirtTileIndexAtom");k("myCurrentGardenObjectNameAtom");k("isInMyGardenAtom");k("myGardenBoardwalkTileObjectsAtom");const Ip=ce("myDataAtom",{path:"garden"});ce("myDataAtom",{path:"garden.tileObjects"});ce("myOwnCurrentGardenObjectAtom",{path:"objectType"});k("myCurrentStablePlantObjectInfoAtom");k("myCurrentSortedGrowSlotIndicesAtom");k("myCurrentGrowSlotIndexAtom");k("myCurrentGrowSlotsAtom");k("myCurrentGrowSlotAtom");k("secondsUntilCurrentGrowSlotMaturesAtom");k("isCurrentGrowSlotMatureAtom");k("numGrowSlotsAtom");k("myCurrentEggAtom");k("petInfosAtom");k("myPetInfosAtom");k("myPetSlotInfosAtom");k("myPrimitivePetSlotsAtom");k("myNonPrimitivePetSlotsAtom");k("expandedPetSlotIdAtom");k("myPetsProgressAtom");k("myActiveCropMutationPetsAtom");k("totalPetSellPriceAtom");k("selectedPetHasNewVariantsAtom");const Mp=k("shopsAtom"),Ep=k("myShopPurchasesAtom");k("seedShopAtom");k("seedShopInventoryAtom");k("seedShopRestockSecondsAtom");k("seedShopCustomRestockInventoryAtom");k("eggShopAtom");k("eggShopInventoryAtom");k("eggShopRestockSecondsAtom");k("eggShopCustomRestockInventoryAtom");k("toolShopAtom");k("toolShopInventoryAtom");k("toolShopRestockSecondsAtom");k("toolShopCustomRestockInventoryAtom");k("decorShopAtom");k("decorShopInventoryAtom");k("decorShopRestockSecondsAtom");k("decorShopCustomRestockInventoryAtom");k("isDecorShopAboutToRestockAtom");ce("shopsAtom",{path:"seed"});ce("shopsAtom",{path:"tool"});ce("shopsAtom",{path:"egg"});ce("shopsAtom",{path:"decor"});k("myCropItemsAtom");k("myCropItemsToSellAtom");k("totalCropSellPriceAtom");k("friendBonusMultiplierAtom");k("myJournalAtom");k("myCropJournalAtom");k("myPetJournalAtom");k("myStatsAtom");k("myActivityLogsAtom");k("newLogsAtom");k("hasNewLogsAtom");k("newCropLogsFromSellingAtom");k("hasNewCropLogsFromSellingAtom");k("myCompletedTasksAtom");k("myActiveTasksAtom");k("isWelcomeToastVisibleAtom");k("shouldCloseWelcomeToastAtom");k("isInitialMoveToDirtPatchToastVisibleAtom");k("isFirstPlantSeedActiveAtom");k("isThirdSeedPlantActiveAtom");k("isThirdSeedPlantCompletedAtom");k("isDemoTouchpadVisibleAtom");k("areShopAnnouncersEnabledAtom");k("arePresentablesEnabledAtom");k("isEmptyDirtTileHighlightedAtom");k("isPlantTileHighlightedAtom");k("isItemHiglightedInHotbarAtom");k("isItemHighlightedInModalAtom");k("isMyGardenButtonHighlightedAtom");k("isSellButtonHighlightedAtom");k("isShopButtonHighlightedAtom");k("isInstaGrowButtonHiddenAtom");k("isActionButtonHighlightedAtom");k("isGardenItemInfoCardHiddenAtom");k("isSeedPurchaseButtonHighlightedAtom");k("isFirstSeedPurchaseActiveAtom");k("isFirstCropHarvestActiveAtom");k("isWeatherStatusHighlightedAtom");const Lp=k("weatherAtom"),es=k("activeModalAtom");k("hotkeyBeingPressedAtom");k("avatarTriggerAnimationAtom");k("avatarDataAtom");k("emoteDataAtom");k("otherUserSlotsAtom");k("otherPlayerPositionsAtom");k("otherPlayerSelectedItemsAtom");k("otherPlayerLastActionsAtom");k("traderBunnyPlayerId");k("npcPlayersAtom");k("npcQuinoaUsersAtom");k("numNpcAvatarsAtom");k("traderBunnyEmoteTimeoutAtom");k("traderBunnyEmoteAtom");k("unsortedLeaderboardAtom");k("currentGardenNameAtom");k("quinoaEngineAtom");k("quinoaInitializationErrorAtom");k("avgPingAtom");k("serverClientTimeOffsetAtom");k("isEstablishingShotRunningAtom");k("isEstablishingShotCompleteAtom");const te={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function nr(){return te}function _p(){return te.initialized}function mt(){return te.isCustom&&te.activeModal!==null}function dt(){return te.activeModal}function ts(e){return !te.shadow||te.shadow.modal!==e?null:te.shadow.data}function Op(e){te.initialized=e;}function Ao(e){te.activeModal=e;}function To(e){te.isCustom=e;}function ns(e,t){te.shadow={modal:e,data:t,timestamp:Date.now()};}function rs(){te.shadow=null;}function pi(e,t){te.patchedAtoms.add(e),te.originalReads.set(e,t);}function Rp(e){return te.originalReads.get(e)}function Hr(e){return te.patchedAtoms.has(e)}function Np(e){te.patchedAtoms.delete(e),te.originalReads.delete(e);}function $p(e){te.unsubscribes.push(e);}function Fp(){for(const e of te.unsubscribes)try{e();}catch{}te.unsubscribes.length=0;}function Dp(e){return te.listeners.onOpen.add(e),()=>te.listeners.onOpen.delete(e)}function os(e){return te.listeners.onClose.add(e),()=>te.listeners.onClose.delete(e)}function is(e){for(const t of Array.from(te.listeners.onOpen))try{t(e);}catch{}}function Po(e){for(const t of Array.from(te.listeners.onClose))try{t(e);}catch{}}function Gp(){Fp(),te.initialized=false,te.activeModal=null,te.isCustom=false,te.shadow=null,te.patchedAtoms.clear(),te.originalReads.clear(),te.listeners.onOpen.clear(),te.listeners.onClose.clear();}const Io={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function as(e){return Io[e]}function jp(e){const t=Io[e],n=[];for(const o of t.atoms)n.push(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)n.push(o.atomLabel);return n}const zp=new Set(["inventory","journal","stats","activityLog","petHutch"]),Bp=new Set(["seedShop","eggShop","toolShop","decorShop"]),Wp=new Set(["leaderboard"]);function Hp(e,t,n,o){return function(i){const a=mt(),s=dt();if(a&&s===o){const c=ts(o);if(c!==null){let u;if(n.dataKey==="_full"?u=c:u=c[n.dataKey],u!==void 0)return t(i),n.transform?n.transform(u):u}}return t(i)}}function Up(e,t,n,o,r){return function(a){if(mt()&&dt()===r){const s=ts(r);if(s!==null){const c=s[n];if(c!==void 0)return t(a),o(c)}}return t(a)}}function Vp(e){const t=as(e);for(const n of t.atoms){const o=Ze(n.atomLabel);if(!o||Hr(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=Hp(n.atomLabel,r,n,e);o.read=i,pi(n.atomLabel,r);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const o=Ze(n.atomLabel);if(!o||Hr(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=Up(n.atomLabel,r,n.sourceKey,n.deriveFn,e);o.read=i,pi(n.atomLabel,r);}}async function rr(e){const t=as(e);for(const o of t.atoms)fi(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)fi(o.atomLabel);const n=await ko();await ss(n,e);}async function Kp(e){const t=await ko();await ss(t,e);const n=jp(e);for(const o of n){const r=Ze(o);if(r)try{t.get(r);}catch{}}}function fi(e){if(!Hr(e))return;const t=Ze(e),n=Rp(e);t&&n&&(t.read=n),Np(e);}async function ss(e,t){const n=zp.has(t),o=Bp.has(t),r=Wp.has(t);if(!n&&!o&&!r)return;const i=Ze("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||o){const c=a.child,u=c?.data;if(c&&u&&typeof u=="object"){let l=null;if(n&&Array.isArray(u.userSlots)){const d=u.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??u,userSlots:d};}if(o&&u.shops&&typeof u.shops=="object"&&(l={...l??u,shops:{...u.shops}}),l){const d={...c,data:l};s={...a,child:d};}}}if(r){const c=a.data;if(c&&Array.isArray(c.players)){const u={...c,players:[...c.players]};s={...s??a,data:u};}}if(!s)return;await e.set(i,s);}catch{}}async function Yp(){for(const e of Object.keys(Io))await rr(e);}let Sn=null,Ut=null;async function qp(){if(nr().initialized)return;Ut=await ue.select("activeModalAtom"),Sn=setInterval(async()=>{try{const n=await ue.select("activeModalAtom"),o=Ut;o!==n&&(Ut=n,Jp(n,o));}catch{}},50),$p(()=>{Sn&&(clearInterval(Sn),Sn=null);}),Op(true);}function Jp(e,t){const n=mt(),o=dt();e===null&&t!==null&&(n&&o===t?Xp("native"):n||Po({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&is({modal:e,isCustom:false});}async function Xp(e){const t=dt();t&&(rs(),To(false),Ao(null),await rr(t),Po({modal:t,wasCustom:true,closedBy:e}));}async function Qp(e,t){if(!nr().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");mt()&&await ls(),ns(e,t),To(true),Ao(e),Vp(e),await Kp(e),await es.set(e),Ut=e,is({modal:e,isCustom:true});}function Zp(e,t){const n=nr();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const r={...n.shadow.data,...t};ns(e,r);}async function ls(){const e=nr();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;rs(),To(false),Ao(null),await es.set(null),Ut=null,await rr(t),Po({modal:t,wasCustom:true,closedBy:"api"});}function ef(){return new Promise(e=>{if(!mt()){e();return}const t=os(()=>{t(),e();});})}async function tf(){if(mt()){const e=dt();e&&await rr(e);}await Yp(),Gp();}const Mo={async init(){return qp()},isReady(){return _p()},async show(e,t){return Qp(e,t)},update(e,t){return Zp(e,t)},async close(){return ls()},isOpen(){return dt()!==null},isCustomOpen(){return mt()},getActiveModal(){return dt()},waitForClose(){return ef()},onOpen(e){return Dp(e)},onClose(e){return os(e)},async destroy(){return tf()}};function nf(){return {ready:false,xform:null,xformAt:0}}const Oe=nf();function cs(){return Oe.ready}function Mt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function sn(){return Le.tos()}function Eo(){return Le.engine()}function rf(){const e=sn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Lo(e,t){const n=rf();return n?t*n+e|0:null}let kn=null;async function of(e=15e3){return Oe.ready?true:kn||(kn=(async()=>{if(await Le.init(e),!sn())throw new Error("MGTile: engine captured but tileObject system not found");return Oe.ready=true,true})(),kn)}function ct(e,t,n=true){const o=sn(),r=Lo(e,t);if(!o||r==null)return {gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r);}catch{}return {gidx:r,tv:i||null}}function vr(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function _o(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function St(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Eo(),{gidx:s,tv:c}=ct(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const u=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function or(e,t,n={}){const o=n.ensureView!==false,r=n.clone!==false,{gidx:i,tv:a}=ct(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?Mt(s):s}}function af(e,t,n={}){return St(e,t,null,n)}function sf(e,t,n,o={}){const i=or(e,t,{...o,clone:false}).tileView?.tileObject;_o(i,"plant");const a=Mt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return vr(a.slots[s],n.slotPatch),St(e,t,a,o)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);vr(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const u=Number(c)|0;if(Number.isFinite(u)){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);vr(a.slots[u],s[u]);}}else throw new Error("MGTile: patch.slots must be array or object map");return St(e,t,a,o)}return St(e,t,a,o)}function lf(e,t,n,o={}){const i=or(e,t,{...o,clone:false}).tileView?.tileObject;_o(i,"decor");const a=Mt(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),St(e,t,a,o)}function cf(e,t,n,o={}){const i=or(e,t,{...o,clone:false}).tileView?.tileObject;_o(i,"egg");const a=Mt(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),St(e,t,a,o)}function df(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Eo(),{gidx:s,tv:c}=ct(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const u=c.tileObject,l=typeof n=="function"?n(Mt(u)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function uf(e,t,n={}){const o=n.ensureView!==false,{gidx:r,tv:i}=ct(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?Mt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function xr(e){if(!e)return null;const t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const r of n)if(t(e[r]))return e[r];if(t(e))return e;const o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const r of o)if(t(r))return r;try{for(const r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function Nn(e){const t=De(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=De(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function pf(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Nn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function ff(){const e=sn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(const[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;const s=ct(i,a,true).tv,c=i+1<t?ct(i+1,a,true).tv:null,u=ct(i,a+1,true).tv,l=xr(s),d=xr(c),p=xr(u);if(!l||!d||!p)continue;const f=Nn(l),g=Nn(d),m=Nn(p);if(!f||!g||!m)continue;const h={x:g.x-f.x,y:g.y-f.y},b={x:m.x-f.x,y:m.y-f.y},S=h.x*b.y-h.y*b.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const v=1/S,y={a:b.y*v,b:-b.x*v,c:-h.y*v,d:h.x*v},C={x:f.x-i*h.x-a*b.x,y:f.y-i*h.y-a*b.y},x=pf(l),A=x==="center"?C:{x:C.x+.5*(h.x+b.x),y:C.y+.5*(h.y+b.y)};return {ok:true,cols:t,rows:o,vx:h,vy:b,inv:y,anchorMode:x,originCenter:A}}return null}function ds(){return Oe.xform=ff(),Oe.xformAt=Date.now(),{ok:!!Oe.xform?.ok,xform:Oe.xform}}function gf(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Oe.xform?.ok||t.forceRebuild||Date.now()-Oe.xformAt>n)&&ds();const o=Oe.xform;if(!o?.ok)return null;const r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,c=Math.floor(a),u=Math.floor(s),l=[[c,u],[c+1,u],[c,u+1],[c+1,u+1]];let d=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;const m=o.originCenter.x+f*o.vx.x+g*o.vy.x,h=o.originCenter.y+f*o.vx.y+g*o.vy.y,b=(e.x-m)**2+(e.y-h)**2;b<p&&(p=b,d={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return d?(d.gidx=Lo(d.tx,d.ty),d):null}function mf(e,t){const n=Oe.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function Re(){if(!cs())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function hf(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Je={init:of,isReady:cs,hook:Le.hook,engine:Eo,tos:sn,gidx:(e,t)=>Lo(Number(e),Number(t)),getTileObject:(e,t,n={})=>(Re(),or(e,t,n)),inspect:(e,t,n={})=>(Re(),uf(e,t,n)),setTileEmpty:(e,t,n={})=>(Re(),af(e,t,n)),setTilePlant:(e,t,n,o={})=>(Re(),sf(e,t,n,o)),setTileDecor:(e,t,n,o={})=>(Re(),lf(e,t,n,o)),setTileEgg:(e,t,n,o={})=>(Re(),cf(e,t,n,o)),setTileObjectRaw:(e,t,n,o={})=>(Re(),df(e,t,n,o)),rebuildTransform:()=>(Re(),ds()),pointToTile:(e,t={})=>(Re(),gf(e,t)),tileToPoint:(e,t)=>(Re(),mf(e,t)),getTransform:()=>(Re(),Oe.xform),help:hf};function bf(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const W=bf();function us(){return W.ready}async function yf(e=15e3){if(W.ready)return Ur(),true;if(await Le.init(e),W.app=Le.app(),W.ticker=Le.ticker(),W.renderer=Le.renderer(),W.stage=Le.stage(),!W.app||!W.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return W.ready=true,Ur(),true}function Ur(){const e=E;return e.$PIXI=e.PIXI||null,e.$app=W.app||null,e.$renderer=W.renderer||null,e.$stage=W.stage||null,e.$ticker=W.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:W.ready},e.__MG_PIXI__}function Oo(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Vr(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function Yn(e){return !!(e&&typeof e.tint=="number")}function ut(e){return !!(e&&typeof e.alpha=="number")}function $n(e,t,n){return e+(t-e)*n}function vf(e,t,n){const o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,u=$n(o,a,n)|0,l=$n(r,s,n)|0,d=$n(i,c,n)|0;return u<<16|l<<8|d}function xf(e,t=900){const n=[],o=[e];for(;o.length&&n.length<t;){const r=o.pop();if(!r)continue;Yn(r)&&n.push(r);const i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a]);}return n}function wf(e,t=25e3){const n=[],o=[e];let r=0;for(;o.length&&r++<t;){const i=o.pop();if(!i)continue;ut(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s]);}return n}const Sf=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Kr(e){if(!e)return null;if(Vr(e))return e;if(!Oo(e))return null;for(const t of Sf){const n=e[t];if(Vr(n))return n}return null}function kf(e,t){const n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let u=0;u<t;u++){const l=Kr(i[u]);if(!l){c=false;break}s[u]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Oo(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function ps(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(Oo(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;const a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}));}return n}function Cf(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const o=ps(t);return W.tileSets.set(n,o),{ok:true,name:n,count:o.length}}function Af(e){return W.tileSets.delete(String(e||"").trim())}function Tf(){return Array.from(W.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function fs(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ro(e){const n=Je.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!fs(e))return {entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=W.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a;}else o=ps(e.tiles||[]);const r=new Map;for(const i of o){const a=Je.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView);}return {entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function No(e){const t=W.highlights.get(e);if(!t)return  false;De(()=>W.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&ut(t.root)&&De(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&Yn(n.o)&&De(()=>{n.o.tint=n.baseTint;});return W.highlights.delete(e),true}function gs(e=null){for(const t of Array.from(W.highlights.keys()))e&&!String(t).startsWith(e)||No(t);return  true}function ms(e,t={}){if(!Vr(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(W.highlights.has(n))return n;const o=ut(e)?Number(e.alpha):null,r=Be(Number(t.minAlpha??.12),0,1),i=Be(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=Be(Number(t.tintMix??.85),0,1),u=t.deepTint!==false,l=[];if(u)for(const f of xf(e))l.push({o:f,baseTint:f.tint});else Yn(e)&&l.push({o:e,baseTint:e.tint});const d=performance.now(),p=()=>{const f=(performance.now()-d)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,m=g*g*(3-2*g);o!=null&&ut(e)&&(e.alpha=Be($n(r,i,m)*o,0,1));const h=m*c;for(const b of l)b.o&&Yn(b.o)&&(b.o.tint=vf(b.baseTint,s,h));};return W.ticker?.add(p),W.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:l}),n}function Pf(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const o of n)if(String(o||"").toLowerCase()===t)return  true;return  false}function hs(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:o,gidxSet:r}=Ro(t),i=`hlmut:${n}:`;if(t.clear===true)if(!r)gs(i);else for(const d of Array.from(W.highlights.keys())){if(!d.startsWith(i))continue;const p=d.split(":"),f=Number(p[2]);r.has(f)&&No(d);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,u=0,l=0;for(const[d,p]of o){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const h=[];for(let v=0;v<g.length;v++)Pf(g[v],n)&&(h.push(v),m=true);if(!m)continue;s++,c+=h.length;const b=p?.childView?.plantVisual||p?.childView||p,S=kf(b,g.length);if(!S){l+=h.length;continue}for(const v of h){const y=S[v];if(!y){l++;continue}const C=`${i}${d}:${v}`;W.highlights.has(C)||(ms(y,{key:C,...a}),u++);}}return {ok:true,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:c,newHighlights:u,failedSlots:l}}function If(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=W.watches.get(o);i&&clearInterval(i);const a=setInterval(()=>{De(()=>hs(n,{...t,clear:!1}));},r);return W.watches.set(o,a),{ok:true,key:o,mutation:n,intervalMs:r}}function Mf(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(W.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),W.watches.delete(i),r++);return r>0}const n=W.watches.get(t);return n?(clearInterval(n),W.watches.delete(t),true):false}function Ef(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Kr(t)||Kr(e?.displayObject)||null}function bs(e){const t=W.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&ut(n.o)&&Number.isFinite(n.baseAlpha)&&De(()=>{n.o.alpha=n.baseAlpha;});return W.fades.delete(e),true}function Yr(e=null){for(const t of Array.from(W.fades.keys()))e&&!String(t).startsWith(e)||bs(t);return  true}function ys(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const o=`fade:${n}:`;if(!fs(t))return Yr(o);const{gidxSet:r}=Ro(t);if(!r)return Yr(o);for(const i of Array.from(W.fades.keys())){if(!i.startsWith(o))continue;const a=Number(i.slice(o.length));r.has(a)&&bs(i);}return  true}function vs(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const o=Be(Number(t.alpha??.2),0,1),r=t.deep===true,{entries:i,gidxSet:a}=Ro(t),s=`fade:${n}:`;t.clear===true&&ys(n,t);let c=0,u=0,l=0,d=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;u++;const h=Ef(f);if(!h||!ut(h)){d++;continue}const b=`${s}${p}`;if(W.fades.has(b)){De(()=>{h.alpha=o;}),l++;continue}const S=r?wf(h):[h],v=[];for(const y of S)ut(y)&&v.push({o:y,baseAlpha:Number(y.alpha)});for(const y of v)De(()=>{y.o.alpha=o;});W.fades.set(b,{targets:v}),l++;}return {ok:true,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:c,matchedPlants:u,applied:l,failed:d,totalFades:W.fades.size}}function Lf(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=W.fadeWatches.get(o);i&&clearInterval(i);const a=setInterval(()=>{De(()=>vs(n,{...t,clear:!1}));},r);return W.fadeWatches.set(o,a),{ok:true,key:o,species:n,intervalMs:r}}function _f(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(W.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),W.fadeWatches.delete(i),r++);return r>0}const n=W.fadeWatches.get(t);return n?(clearInterval(n),W.fadeWatches.delete(t),true):false}function Of(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Rf(e,t,n={}){const o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==false,a=Je.getTileObject(o,r,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,u={ok:true,tx:o,ty:r,gidx:a?.gidx??Je.gidx?.(o,r)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?Of(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&De(()=>console.log("[MGPixi.inspectTile]",u)),u}function Nf(e,t,n){const o=E.PIXI;if(!o)return;let r=W.stage.getChildByName("gemini-overlay");r||(r=new o.Container,r.name="gemini-overlay",W.stage.addChild(r));const i=n.key;let a=r.getChildByName(i);a||(a=new o.Graphics,a.name=i,r.addChild(a));const s=Je.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=Je.getTransform(),u=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,u,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function $f(e){const t=W.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function ye(){if(!us())throw new Error("MGPixi: call MGPixi.init() first")}const ir={init:yf,isReady:us,expose:Ur,get app(){return W.app},get renderer(){return W.renderer},get stage(){return W.stage},get ticker(){return W.ticker},get PIXI(){return E.PIXI||null},defineTileSet:(e,t)=>(ye(),Cf(e,t)),deleteTileSet:e=>(ye(),Af(e)),listTileSets:()=>(ye(),Tf()),highlightPulse:(e,t)=>(ye(),ms(e,t)),stopHighlight:e=>(ye(),No(e)),clearHighlights:e=>(ye(),gs(e)),drawOverlayBox:(e,t,n)=>(ye(),Nf(e,t,n)),stopOverlay:e=>(ye(),$f(e)),highlightMutation:(e,t)=>(ye(),hs(e,t)),watchMutation:(e,t)=>(ye(),If(e,t)),stopWatchMutation:e=>(ye(),Mf(e)),inspectTile:(e,t,n)=>(ye(),Rf(e,t,n)),fadeSpecies:(e,t)=>(ye(),vs(e,t)),clearSpeciesFade:(e,t)=>(ye(),ys(e,t)),clearFades:e=>(ye(),Yr(e)),watchFadeSpecies:(e,t)=>(ye(),Lf(e,t)),stopWatchFadeSpecies:e=>(ye(),_f(e))};function Ff(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const U=Ff();function xs(){return U.ready}const gi=E??window;async function ws(){const e=U.ctx;if(e)return e;const t=gi.AudioContext||gi.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return U.ctx=n,n}async function Ss(){if(U.ctx&&U.ctx.state==="suspended")try{await U.ctx.resume();}catch{}}const Df={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Gf={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Vt=.001,Kt=.2;function mi(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n);}catch{o=n;}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){const r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function qr(e){const t=Df[e],n=Gf[e];if(!t)return {atom:Kt,vol100:Cn(Kt)};const o=mi(t,NaN);if(Number.isFinite(o)){const i=Be(o,0,1);return {atom:i,vol100:Cn(i)}}if(n){const i=mi(n,NaN);if(Number.isFinite(i)){const a=Be(i,0,1);return {atom:a,vol100:Cn(a)}}}const r=Kt;return {atom:r,vol100:Cn(r)}}function jf(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const o=(Be(t,1,100)-1)/99;return Vt+o*(Kt-Vt)}function Cn(e){const t=Be(Number(e),0,1);if(t<=Vt)return 0;const n=(t-Vt)/(Kt-Vt);return Math.round(1+n*99)}function ks(e,t){if(t==null)return qr(e).atom;const n=jf(t);return n===null?qr(e).atom:jc(n)}function zf(e){const t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r);};for(const o of Object.keys(e||{})){const r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o);}for(const[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);U.sfx.groups=t;}function Bf(e){const t=U.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=U.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Wf(){if(U.sfx.buffer)return U.sfx.buffer;if(!U.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await ws();await Ss();const n=await(await va(U.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{const a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i);});return U.sfx.buffer=o,o}async function Hf(e,t={}){if(!U.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const o=Bf(n),r=U.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);const i=await ws();await Ss();const a=await Wf(),s=Math.max(0,+r.start||0),c=Math.max(s,+r.end||s),u=Math.max(.01,c-s),l=ks("sfx",t.volume),d=i.createGain();d.gain.value=l,d.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(d),p.start(0,s,u),{name:o,source:p,start:s,end:c,duration:u,volume:l}}let An=null;async function Uf(){return U.ready?true:An||(An=(async()=>{U.baseUrl=await ft.base();const e=await Ke.load(U.baseUrl),t=Ke.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string")continue;const r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){const i=r[1].toLowerCase(),a=r[2];U.urls[i].set(a,Ve(U.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(U.sfx.mp3Url=Ve(U.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(U.sfx.atlasUrl=Ve(U.baseUrl,o));}if(!U.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return U.sfx.atlas=await mo(U.sfx.atlasUrl),zf(U.sfx.atlas),U.ready=true,true})(),An)}function Cs(e){if(e!=="music"&&e!=="ambience")return  false;const t=U.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return U.tracks[e]=null,true}function Vf(e,t,n={}){if(!U.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const o=U.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Cs(e);const r=new Audio(o);return r.loop=!!n.loop,r.volume=ks(e,n.volume),r.preload="auto",r.play().catch(()=>{}),U.tracks[e]=r,r}function Kf(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(U.urls[n].keys()).sort():n==="sfx"?U.sfx.atlas?t.groups?Array.from(U.sfx.groups.keys()).sort():Object.keys(U.sfx.atlas).sort():[]:[]}function Yf(){return ["sfx","music","ambience"]}function qf(){return Array.from(U.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Jf(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return  false;const r=U.urls[n],i=o.toLowerCase();for(const a of Array.from(r.keys()))if(a.toLowerCase()===i)return  true;return  false}function Xf(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const o of Array.from(U.sfx.groups.keys()))if(o.toLowerCase()===n)return  true;return  false}function Qf(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const r=U.urls[n],i=o.toLowerCase();for(const[a,s]of Array.from(r.entries()))if(a.toLowerCase()===i)return s;return null}function Zf(){const{categoryVolume:e}=require("./volume");return U.tracks.music&&(U.tracks.music.volume=e("music").atom),U.tracks.ambience&&(U.tracks.ambience.volume=e("ambience").atom),true}function He(){if(!xs())throw new Error("MGAudio not ready yet")}async function eg(e,t,n={}){const o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return Hf(r,n);if(o==="music"||o==="ambience")return Vf(o,r,n);throw new Error(`Unknown category: ${o}`)}const $o={init:Uf,isReady:xs,play:eg,stop:e=>(He(),Cs(e)),list:(e,t)=>(He(),Kf(e,t)),refreshVolumes:()=>(He(),Zf()),categoryVolume:e=>(He(),qr(e)),getCategories:()=>(He(),Yf()),getGroups:()=>(He(),qf()),hasTrack:(e,t)=>(He(),Jf(e,t)),hasGroup:e=>(He(),Xf(e)),getTrackUrl:(e,t)=>(He(),Qf(e,t))};function tg(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const le=tg();function As(){return le.ready}let Tn=null;async function ng(){return le.ready?true:Tn||(Tn=(async()=>{le.baseUrl=await ft.base();const e=await Ke.load(le.baseUrl),t=Ke.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");le.byCat.clear(),le.byBase.clear();for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;const i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),u=Ve(le.baseUrl,o);le.byBase.set(i,u),le.byCat.has(s)||le.byCat.set(s,new Map),le.byCat.get(s).set(c,u);}return le.ready=true,true})(),Tn)}function Jr(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function rg(e,t){if(t===void 0){const i=Jr(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),o=Jr(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){const i=o.indexOf("_");return {cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return {cat:n,asset:o.replace(/^.+?_/,""),base:r}}function og(){return Array.from(le.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function ig(e){const t=le.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Xr(e,t){const{cat:n,asset:o,base:r}=rg(e,t),i=le.byBase.get(r);if(i)return i;const s=le.byCat.get(n)?.get(o);if(s)return s;if(!le.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return Ve(le.baseUrl,`cosmetic/${r}.png`)}const hi=E?.document??document;function ag(){if(le.overlay)return le.overlay;const e=hi.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),hi.documentElement.appendChild(e),le.overlay=e,e}function sg(){const e=le.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function lg(e){return le.defaultParent=e,true}const cg=E?.document??document;function Qr(e,t,n){if(!le.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=r!==void 0?Xr(e,r):Xr(e),a=cg.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):Jr(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(const[s,c]of Object.entries(o.style))try{a.style[s]=String(c);}catch{}return a}function dg(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=o.parent||sg()||ag(),a=r!==void 0?Qr(e,r,o):Qr(e,o);if(i===le.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);const c=o.scale??1,u=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`;else {const l=o.x??innerWidth/2,d=o.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${d}px`,a.style.transform=`scale(${c}) rotate(${u}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`);}}return i.appendChild(a),le.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}le.live.delete(a);},a}function ug(){for(const e of Array.from(le.live))e.__mgDestroy?.();}function it(){if(!As())throw new Error("MGCosmetic not ready yet")}const Fo={init:ng,isReady:As,categories:()=>(it(),og()),list:e=>(it(),ig(e)),url:((e,t)=>(it(),Xr(e,t))),create:((e,t,n)=>(it(),Qr(e,t,n))),show:((e,t,n)=>(it(),dg(e,t,n))),attach:e=>(it(),lg(e)),clear:()=>(it(),ug())};async function Ts(e){const t=[{name:"Data",init:()=>ae.init()},{name:"CustomModal",init:()=>Mo.init()},{name:"Sprites",init:()=>me.init()},{name:"TileObjectSystem",init:()=>Je.init()},{name:"Pixi",init:()=>ir.init()},{name:"Audio",init:()=>$o.init()},{name:"Cosmetics",init:()=>Fo.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const bi=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:ft,MGAudio:$o,MGCosmetic:Fo,MGCustomModal:Mo,MGData:ae,MGEnvironment:qe,MGManifest:Ke,MGPixi:ir,MGPixiHooks:Le,MGSprite:me,MGTile:Je,MGVersion:yo,initAllModules:Ts},Symbol.toStringTag,{value:"Module"})),Do=Ye.AUTO_FAVORITE,Ps={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function pt(){return _e(Do,Ps)}function Go(e){Ge(Do,e);}function Is(e){const n={...pt(),...e};return Go(n),n}function jo(e){const t=pt();return t.mode="simple",t.simple={...t.simple,...e},Go(t),t}function pg(e){jo({favoriteSpecies:e});}function fg(e){jo({favoriteMutations:e});}function yi(){return pt().enabled}function We(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!We(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return  false;for(const a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!We(n[a],o[a]))return  false;return  true}const vi={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},xi={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function gg(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function mg(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function hg(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function bg(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function yg(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,o=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function wi(e){return {position:gg(e),tile:mg(e),garden:hg(e),object:bg(e),plant:yg(e)}}function Si(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function vg(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!We(e.data,t.data)}function xg(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!We(e.sortedSlotIndices,t.sortedSlotIndices)}function wg(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Sg(){let e=xi,t=xi,n=false;const o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(vi),s=new Set;function c(){if(s.size<a.length)return;const l=wi(i);if(!We(e,l)&&(t=e,e=l,!!n)){for(const d of r.all)d(e,t);if(Si(t)!==Si(e))for(const d of r.stable)d(e,t);if(vg(t.object,e.object)){const d={current:e.object,previous:t.object};for(const p of r.object)p(d);}if(xg(t.plant,e.plant)){const d={current:e.plant,previous:t.plant};for(const p of r.plantInfo)p(d);}if(wg(t.garden,e.garden)){const d={current:e.garden,previous:t.garden};for(const p of r.garden)p(d);}}}async function u(){if(n)return;const l=a.map(async d=>{const p=vi[d],f=await ue.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=wi(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeObject(l,d){return r.object.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>r.object.delete(l)},subscribePlantInfo(l,d){return r.plantInfo.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(l)},subscribeGarden(l,d){return r.garden.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>r.garden.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=false;}}}let wr=null;function kg(){return wr||(wr=Sg()),wr}const jt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Cg=new Set(["Gold","Rainbow"]),Ag=new Set(["Frozen","Chilled","Wet"]);function Ms(e){let t=1,n=0,o=0;for(const r of e)r==="Gold"||r==="Rainbow"?r==="Rainbow"?t=jt.Rainbow:t===1&&(t=jt.Gold):r in jt&&(n+=jt[r],o++);return t*(1+n-o)}function Tg(e){return jt[e]??null}function Pg(e){return Cg.has(e)}function Ig(e){return Ag.has(e)}function Mg(e,t){const n=zo(e);if(!n)return 50;const o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;const r=(t-1)/(o-1);return Math.floor(50+50*r)}function Eg(e,t,n){const o=zo(e);if(!o)return 0;const r=o.baseSellPrice,i=Ms(n);return Math.round(r*t*i)}function Lg(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const o=t-e,r=n-e;return Math.floor(r/o*100)}function _g(e,t){return t>=e}function zo(e){const t=ae.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Es=3600,Sr=80,Og=100,zt=30;function ar(e){return e/Es}function sr(e,t){const n=ln(e);if(!n)return Sr;const o=n.maxScale;if(t<=1)return Sr;if(t>=o)return Og;const r=(t-1)/(o-1);return Math.floor(Sr+20*r)}function lr(e,t,n){const o=ln(e);if(!o)return n-zt;const r=o.hoursToMature,i=t/Es,a=zt/r,s=Math.min(a*i,zt),c=n-zt;return Math.floor(c+s)}function cr(e,t){const n=ln(e);return n?t>=n.hoursToMature:false}function Ls(e){const t=ln(e);return t?zt/t.hoursToMature:0}function Rg(e,t,n){const o=t-e;return o<=0||n<=0?0:o/n}function ln(e){const t=ae.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Ng(e,t){return t<=0?1:Math.min(1,e/t)}const $g={init(){},isReady(){return  true},crop:{calculateSize:Mg,calculateSellPrice:Eg,calculateProgress:Lg,isReady:_g,getData:zo},pet:{calculateAge:ar,calculateMaxStrength:sr,calculateCurrentStrength:lr,isMature:cr,calculateStrengthPerHour:Ls,getData:ln},mutation:{calculateMultiplier:Ms,getValue:Tg,isGrowth:Pg,isEnvironmental:Ig}},ki={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function Ci(e,t){const n=ar(e.xp),o=sr(e.petSpecies,e.targetScale),r=lr(e.petSpecies,e.xp,o),i=cr(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:i}}function Fg(e,t){const o=t[e.slot.id]?.lastAbilityTrigger??null,r=ar(e.slot.xp),i=sr(e.slot.petSpecies,e.slot.targetScale),a=lr(e.slot.petSpecies,e.slot.xp,i),s=cr(e.slot.petSpecies,r);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:a,maxStrength:i,isMature:s}}function Ai(e){const t=new Set,n=[];for(const c of e.active??[]){const u=Fg(c,e.slotInfos??{});n.push(u),t.add(u.id);}const o=[];for(const c of e.inventory??[]){if(t.has(c.id))continue;const u=Ci(c,"inventory");o.push(u),t.add(u.id);}const r=[];for(const c of e.hutch??[]){if(t.has(c.id))continue;const u=Ci(c,"hutch");r.push(u),t.add(u.id);}const i=[...n,...o,...r],a=e.expandedPetSlotId??null,s=a?i.find(c=>c.id===a)??null:null;return {all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length},expandedPetSlotId:a,expandedPet:s}}const Ti={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function Dg(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Pi(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Gg(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Pi),o=t.all.map(Pi);return Dg(n,o)}function jg(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location});}return n}function zg(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){if(!r.lastAbilityTrigger)continue;const a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger});}return n}function Bg(e,t){const n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function Wg(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.growthStage>i.growthStage&&n.push({pet:r,previousStage:i.growthStage,newStage:r.growthStage});}return n}function Hg(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength>i.currentStrength&&n.push({pet:r,previousStrength:i.currentStrength,newStrength:r.currentStrength});}return n}function Ug(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength===r.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:r});}return n}function Vg(){let e=Ti,t=Ti,n=false;const o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(ki),s=new Set;function c(){if(s.size<a.length)return;const l=Ai(i);if(We(e,l)||(t=e,e=l,!n))return;for(const b of r.all)b(e,t);if(!Gg(t,e))for(const b of r.stable)b(e,t);const d=jg(t,e);for(const b of d)for(const S of r.location)S(b);const p=zg(t,e);for(const b of p)for(const S of r.ability)S(b);const f=Bg(t,e);if(f)for(const b of r.count)b(f);const g=Wg(t,e);for(const b of g)for(const S of r.growth)S(b);const m=Hg(t,e);for(const b of m)for(const S of r.strengthGain)S(b);const h=Ug(t,e);for(const b of h)for(const S of r.maxStrength)S(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){const b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of r.expandedPet)S(b);}}async function u(){if(n)return;const l=a.map(async d=>{const p=ki[d],f=await ue.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Ai(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeLocation(l,d){if(r.location.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>r.location.delete(l)},subscribeAbility(l,d){if(r.ability.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>r.ability.delete(l)},subscribeCount(l,d){return r.count.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(l)},subscribeExpandedPet(l,d){return r.expandedPet.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(l)},subscribeGrowth(l,d){if(r.growth.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>r.growth.delete(l)},subscribeStrengthGain(l,d){if(r.strengthGain.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>r.strengthGain.delete(l)},subscribeMaxStrength(l,d){if(r.maxStrength.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>r.maxStrength.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=false;}}}let kr=null;function Kg(){return kr||(kr=Vg()),kr}function Yg(){let e=null;const t=[],n=new Set,o={},r=new Set,i=2;function a(d,p){return {x:p%d,y:Math.floor(p/d)}}function s(d,p,f){return f*d+p}function c(d,p){const{cols:f,rows:g}=d,m=f*g,h=new Set,b=new Set,S=new Map,v=[],y=d.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],C=d.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],x=Math.max(y.length,C.length);for(let T=0;T<x;T++){const _=y[T]??[],L=C[T]??[],F=_.map((G,J)=>(h.add(G),S.set(G,T),{globalIndex:G,localIndex:J,position:a(f,G)})),ee=L.map((G,J)=>(b.add(G),S.set(G,T),{globalIndex:G,localIndex:J,position:a(f,G)}));v.push({userSlotIdx:T,dirtTiles:F,boardwalkTiles:ee,allTiles:[...F,...ee]});}const A=d.spawnTiles.map(T=>a(f,T)),P={};if(d.locations)for(const[T,_]of Object.entries(d.locations)){const L=_.spawnTileIdx??[];P[T]={name:T,spawnTiles:L,spawnPositions:L.map(F=>a(f,F))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:d.spawnTiles,spawnPositions:A,locations:P,userSlots:v,globalToXY(T){return a(f,T)},xyToGlobal(T,_){return s(f,T,_)},getTileOwner(T){return S.get(T)??null},isDirtTile(T){return h.has(T)},isBoardwalkTile(T){return b.has(T)}}}function u(){if(r.size<i||e)return;const d=o.map,p=o.tileSize??0;if(d){e=c(d,p);for(const f of n)f(e);n.clear();}}async function l(){const d=await ue.subscribe("mapAtom",f=>{o.map=f,r.add("map"),u();});t.push(d);const p=await ue.subscribe("tileSizeAtom",f=>{o.tileSize=f,r.add("tileSize"),u();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(d,p){return e?(p?.immediate!==false&&d(e),()=>{}):(n.add(d),()=>n.delete(d))},destroy(){for(const d of t)d();t.length=0,e=null,n.clear();}}}let Cr=null;function Zr(){return Cr||(Cr=Yg()),Cr}const Ii={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Mi={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Ei(e){const t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex;let i=null;return r!==null&&r>=0&&r<n.length&&(i={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Li(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function qg(e,t){return Li(e)===Li(t)}function Jg(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Pn(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Xg(e,t){const n=new Set(e.map(Pn)),o=new Set(t.map(Pn)),r=t.filter(a=>!n.has(Pn(a))),i=e.filter(a=>!o.has(Pn(a)));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:{before:e.length,after:t.length}}}function Qg(e,t){const n=new Set(e),o=new Set(t),r=t.filter(a=>!n.has(a)),i=e.filter(a=>!o.has(a));return r.length===0&&i.length===0?null:{added:r,removed:i,current:t}}function Zg(){let e=Mi,t=Mi,n=false;const o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Ii),s=new Set;function c(){if(s.size<a.length)return;const l=Ei(i);if(We(e,l)||(t=e,e=l,!n))return;for(const f of r.all)f(e,t);if(!qg(t,e))for(const f of r.stable)f(e,t);if(Jg(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of r.selection)g(f);}const d=Xg(t.items,e.items);if(d)for(const f of r.items)f(d);const p=Qg(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of r.favorites)f(p);}async function u(){if(n)return;const l=a.map(async d=>{const p=Ii[d],f=await ue.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Ei(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeSelection(l,d){return r.selection.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(l)},subscribeItems(l,d){return r.items.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(l)},subscribeFavorites(l,d){return r.favorites.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=false;}}}let Ar=null;function Bo(){return Ar||(Ar=Zg()),Ar}const eo={all:[],host:null,myPlayer:null,count:0};function em(e,t,n){const o=n.get(e.id),r=o?.slot,i=r?.data,a=r?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function _i(e){const t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return eo;const r=new Map;Array.isArray(o)&&o.forEach((c,u)=>{c?.type==="user"&&c?.playerId&&r.set(c.playerId,{slot:c,index:u});});const i=t.map(c=>em(c,n,r)),a=i.find(c=>c.isHost)??null,s=i.find(c=>c.slotIndex!==null&&c.slotIndex>=0)??null;return {all:i,host:a,myPlayer:s,count:i.length}}function Oi(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function tm(e,t){const n=[],o=new Set(e.map(i=>i.id)),r=new Set(t.map(i=>i.id));for(const i of t)o.has(i.id)||n.push({player:i,type:"join"});for(const i of e)r.has(i.id)||n.push({player:i,type:"leave"});return n}function nm(e,t){const n=[],o=new Map(e.map(r=>[r.id,r]));for(const r of t){const i=o.get(r.id);i&&i.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected});}return n}function rm(){let e=eo,t=eo,n=false;const o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function c(){if(a.size<s)return;const l=_i(i);if(We(e,l)||(t=e,e=l,!n))return;for(const m of r.all)m(e,t);if(Oi(t)!==Oi(e))for(const m of r.stable)m(e,t);const d=tm(t.all,e.all);for(const m of d)for(const h of r.joinLeave)h(m);const p=nm(t.all,e.all);for(const m of p)for(const h of r.connection)h(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const h of r.host)h(m);}}async function u(){if(n)return;const l=await Tp.onChangeNow(f=>{i.players=f,a.add("players"),c();});o.push(l);const d=await Pp.onChangeNow(f=>{i.hostPlayerId=f,a.add("hostPlayerId"),c();});o.push(d);const p=await Ap.onChangeNow(f=>{i.userSlots=f,a.add("userSlots"),c();});o.push(p),n=true,a.size===s&&(e=_i(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeJoinLeave(l,d){if(r.joinLeave.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>r.joinLeave.delete(l)},subscribeConnection(l,d){if(r.connection.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>r.connection.delete(l)},subscribeHost(l,d){return r.host.add(l),d?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>r.host.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=false;}}}let Tr=null;function _s(){return Tr||(Tr=rm()),Tr}const cn=["seed","tool","egg","decor"];function om(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function im(e,t,n){const o=om(e,t),r=n[o]??0,i=Math.max(0,e.initialStock-r);return {id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:i,isAvailable:i>0}}function am(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const r=n[e]?.purchases??{},i=(t.inventory??[]).map(u=>im(u,e,r)),a=i.filter(u=>u.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function Ri(e){const t=e.shops,n=e.purchases??{},o=cn.map(s=>am(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},i=o.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((u,l)=>(u.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:o,byType:r,nextRestock:a}}const Ni={all:cn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function $i(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function sm(e,t){const n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function lm(e,t){const n=[];for(const o of cn){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function cm(e,t){const n=[];for(const o of cn){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function dm(){let e=Ni,t=Ni,n=false;const o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Ri(i);if(We(e,l)||(t=e,e=l,!n))return;for(const g of r.all)g(e,t);if($i(t)!==$i(e))for(const g of r.stable)g(e,t);const d={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(const g of cn){const m=sm(t.byType[g],e.byType[g]);if(m)for(const h of d[g])h(m);}const p=lm(t,e);for(const g of p)for(const m of r.purchase)m(g);const f=cm(t,e);for(const g of f)for(const m of r.availability)m(g);}async function u(){if(n)return;const l=await Mp.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});o.push(l);const d=await Ep.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});o.push(d),n=true,a.size===s&&(e=Ri(i));}return u(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,d){return e.byType[l].items.find(f=>f.id===d)??null},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeSeedRestock(l,d){return r.seedRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(l)},subscribeToolRestock(l,d){return r.toolRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(l)},subscribeEggRestock(l,d){return r.eggRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(l)},subscribeDecorRestock(l,d){return r.decorRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(l)},subscribePurchase(l,d){if(r.purchase.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>r.purchase.delete(l)},subscribeAvailability(l,d){if(r.availability.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>r.availability.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=false;}}}let Pr=null;function um(){return Pr||(Pr=dm()),Pr}const pm=["Sunny","Rain","Frost","Dawn","AmberMoon"];function fm(e){return pm.includes(e)}const to={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function gm(e){if(!e)return to;const t=Date.now(),n=e.endTime??0,o=Math.max(0,n-t),r=Math.floor(o/1e3),i=r>0,a=e.type??"Sunny";return {type:fm(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:r}}function mm(){let e=to,t=to,n=false,o=null;const r={all:new Set,change:new Set};function i(s){const c=gm(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const u of r.all)u(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const u={current:e,previous:t};for(const l of r.change)l(u);}}}async function a(){n||(o=await Lp.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return r.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>r.all.delete(s)},subscribeChange(s,c){return r.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>r.change.delete(s)},destroy(){o?.(),o=null,r.all.clear(),r.change.clear(),n=false;}}}let Ir=null;function hm(){return Ir||(Ir=mm()),Ir}function bm(){const e=ae.get("mutations");return e?Object.keys(e):[]}function Os(){const e={};for(const t of bm())e[t]=[];return e}function no(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Os()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function ym(e,t,n,o){const r=t.slots.filter(i=>o>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function vm(e,t,n,o,r){return {tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime}}function xm(e,t,n,o){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function Fi(e,t,n,o){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function Di(e,t){const{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return no();const i=t().get(),a=i?.userSlots[o],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],u=[],l=[],d=[],p={},f=[],g=[],m=[],h=[],b=Os(),S=[],v=[],y=[],C={},x=[],A=[],P={},T=new Set,_=new Set;for(const[G,J]of Object.entries(n.tileObjects)){const de=parseInt(G,10);T.add(de);const z=i?i.globalToXY(de):{x:0,y:0};if(J.objectType==="plant"){const D=J,$=ym(G,D,z,r);u.push($),$.isMature?l.push($):d.push($),p[$.species]||(p[$.species]=[]),p[$.species].push($);for(let R=0;R<D.slots.length;R++){const N=D.slots[R],I=vm(G,z,R,N,r);if(f.push(I),I.isMature?g.push(I):m.push(I),I.mutations.length>0){h.push(I);for(const O of I.mutations)b[O]||(b[O]=[]),b[O].push(I);}}}else if(J.objectType==="egg"){const $=xm(G,J,z,r);S.push($),C[$.eggId]||(C[$.eggId]=[]),C[$.eggId].push($),$.isMature?v.push($):y.push($);}else if(J.objectType==="decor"){const $=Fi(G,J,z,"tileObjects");x.push($),P[$.decorId]||(P[$.decorId]=[]),P[$.decorId].push($);}}for(const[G,J]of Object.entries(n.boardwalkTileObjects)){const de=parseInt(G,10);_.add(de);const z=i?i.globalToXY(de):{x:0,y:0},$=Fi(G,J,z,"boardwalk");A.push($),P[$.decorId]||(P[$.decorId]=[]),P[$.decorId].push($);}const L=[...x,...A],F=s.filter(G=>!T.has(G.localIndex)),ee=c.filter(G=>!_.has(G.localIndex));return {garden:n,mySlotIndex:o,plants:{all:u,mature:l,growing:d,bySpecies:p,count:u.length},crops:{all:f,mature:g,growing:m,mutated:{all:h,byMutation:b}},eggs:{all:S,mature:v,growing:y,byType:C,count:S.length},decors:{tileObjects:x,boardwalk:A,all:L,byType:P,count:L.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:F,boardwalk:ee}},counts:{plants:u.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:S.length,matureEggs:v.length,decors:L.length,emptyTileObjects:F.length,emptyBoardwalk:ee.length}}}function Gi(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function wm(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function Sm(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function km(e,t,n){const o=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),r=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !o.has(a)&&r.has(a)})}function Cm(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function Am(e,t){const n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(const r of t){const i=o.get(r.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,r.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),u=new Set(r.slots[s].mutations),l=[...u].filter(p=>!c.has(p)),d=[...c].filter(p=>!u.has(p));if(l.length>0||d.length>0){const p=Date.now(),f=r.slots[s],g={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:d});}}}return n}function Tm(e,t,n){const o=[],r=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=r.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let u=0;u<c;u++){const l=a.slots[u],d=s.slots[u];if(l.startTime!==d.startTime){const p=i.get(`${a.tileIndex}:${u}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};o.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let u=s.slotsCount;u<a.slotsCount;u++){const l=i.get(`${a.tileIndex}:${u}`);if(!l||!l.isMature)continue;const d=a.slots[u];if(!d)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true};o.push({crop:p,remainingSlots:s.slotsCount});}}return o}function Pm(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function Im(e,t){const n=c=>`${c.tileIndex}:${c.location}`,o=c=>`${c.tileIndex}:${c.location}`,r=new Set(e.map(n)),i=new Set(t.map(o)),a=t.filter(c=>!r.has(o(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function Mm(){let e=no(),t=no(),n=false;const o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Di(i,Zr);if(We(e,l)||(t=e,e=l,!n))return;for(const v of r.all)v(e,t);if(Gi(t)!==Gi(e))for(const v of r.stable)v(e,t);const d=wm(t.plants.all,e.plants.all);for(const v of d.added)for(const y of r.plantAdded)y({plant:v});for(const v of d.removed)for(const y of r.plantRemoved)y({plant:v,tileIndex:v.tileIndex});const p=Sm(t.plants.mature,e.plants.mature,e.plants.all);for(const v of p)for(const y of r.plantMatured)y({plant:v});const f=Am(t.plants.all,e.plants.all);for(const v of f)for(const y of r.cropMutated)y(v);const g=km(t.crops.mature,e.crops.mature,e.crops.all);for(const v of g)for(const y of r.cropMatured)y({crop:v});const m=Tm(t.plants.all,e.plants.all,t.crops.all);for(const v of m)for(const y of r.cropHarvested)y(v);const h=Pm(t.eggs.all,e.eggs.all);for(const v of h.added)for(const y of r.eggPlaced)y({egg:v});for(const v of h.removed)for(const y of r.eggRemoved)y({egg:v});const b=Cm(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const v of b)for(const y of r.eggMatured)y({egg:v});const S=Im(t.decors.all,e.decors.all);for(const v of S.added)for(const y of r.decorPlaced)y({decor:v});for(const v of S.removed)for(const y of r.decorRemoved)y({decor:v});}async function u(){if(n)return;const l=await Ip.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});o.push(l);const d=await ue.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});o.push(d),n=true,a.size===s&&(e=Di(i,Zr));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribePlantAdded(l,d){if(r.plantAdded.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>r.plantAdded.delete(l)},subscribePlantRemoved(l,d){return r.plantRemoved.add(l),()=>r.plantRemoved.delete(l)},subscribePlantMatured(l,d){if(r.plantMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>r.plantMatured.delete(l)},subscribeCropMutated(l,d){if(r.cropMutated.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>r.cropMutated.delete(l)},subscribeCropMatured(l,d){if(r.cropMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>r.cropMatured.delete(l)},subscribeCropHarvested(l,d){return r.cropHarvested.add(l),()=>r.cropHarvested.delete(l)},subscribeEggPlaced(l,d){if(r.eggPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>r.eggPlaced.delete(l)},subscribeEggRemoved(l,d){return r.eggRemoved.add(l),()=>r.eggRemoved.delete(l)},subscribeEggMatured(l,d){if(r.eggMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>r.eggMatured.delete(l)},subscribeDecorPlaced(l,d){if(r.decorPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>r.decorPlaced.delete(l)},subscribeDecorRemoved(l,d){return r.decorRemoved.add(l),()=>r.decorRemoved.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=false;}}}let Mr=null;function Em(){return Mr||(Mr=Mm()),Mr}let xe=null;function Rs(){return xe||(xe={currentTile:kg(),myPets:Kg(),gameMap:Zr(),myInventory:Bo(),players:_s(),shops:um(),weather:hm(),myGarden:Em()},xe)}function Ue(){if(!xe)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return xe}function Lm(){xe&&(xe.currentTile.destroy(),xe.myPets.destroy(),xe.gameMap.destroy(),xe.myInventory.destroy(),xe.players.destroy(),xe.shops.destroy(),xe.weather.destroy(),xe.myGarden.destroy(),xe=null);}const Ns={get currentTile(){return Ue().currentTile},get myPets(){return Ue().myPets},get gameMap(){return Ue().gameMap},get myInventory(){return Ue().myInventory},get players(){return Ue().players},get shops(){return Ue().shops},get weather(){return Ue().weather},get myGarden(){return Ue().myGarden}},_m=100,Er=[];function ro(e,t,n){let o="";if(n&&typeof n=="object"){if(t==="PartialState"){const r=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(r||i)o=`PartialState : ${r} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(o=`PartialState - {${s.join(", ")}}`);}}if(!o&&n.event&&(o+=`${n.event} `),!o&&n.op&&(o+=`op:${n.op} `),!o&&n.data){const r=Object.keys(n.data);r.length>0&&(o+=`{${r.slice(0,3).join(",")}${r.length>3?"...":""}}`);}else !o&&Array.isArray(n)&&(o+=`[${n.length} items]`);}else typeof n=="string"&&(o=n.slice(0,50));Er.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:o.trim()||"-"}),Er.length>_m&&Er.shift();}const Ce={nativeCtor:null,captured:[],latestOpen:null},ji=Symbol.for("ariesmod.ws.capture.wrapped"),zi=Symbol.for("ariesmod.ws.capture.native"),$s=1;function oo(e){return !!e&&e.readyState===$s}function Om(){if(oo(Ce.latestOpen))return Ce.latestOpen;for(let e=Ce.captured.length-1;e>=0;e--){const t=Ce.captured[e];if(oo(t))return t}return null}function Rm(e,t){Ce.captured.push(e),Ce.captured.length>25&&Ce.captured.splice(0,Ce.captured.length-25);const n=()=>{Ce.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Ce.latestOpen===e&&(Ce.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",o=>{try{const r=JSON.parse(o.data);ro("in",r.type||"unknown",r);}catch{ro("in","raw",o.data);}}),e.readyState===$s&&n();}function Nm(e=E,t={}){const n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return ()=>{};if(o[ji])return Ce.nativeCtor=o[zi]??Ce.nativeCtor??null,()=>{};const r=o;Ce.nativeCtor=r;function i(a,s){const c=s!==void 0?new r(a,s):new r(a);try{Rm(c,n);}catch{}return c}try{i.prototype=r.prototype;}catch{}try{Object.setPrototypeOf(i,r);}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED;}catch{}i[ji]=true,i[zi]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=r);}catch{}}}function $m(e=E){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function qn(e=E){const t=Om();if(t)return {ws:t,source:"captured"};const n=$m(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Fs(e,t={}){const n=t.pageWindow??E,o=t.intervalMs??500,r=!!t.debug;let i=null,a=null;const s=()=>{const u=qn(n);(u.ws!==i||u.source!==a)&&(i=u.ws,a=u.source,r&&console.log("[WS] best socket changed:",u.source,u.ws),e(u));};s();const c=setInterval(s,o);return ()=>clearInterval(c)}function Fm(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Dm(e,t=E){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:o}=qn(t);if(!o)return {ok:false,reason:"no-ws"};if(!oo(o))return {ok:false,reason:"not-open"};const r=Fm(e);if(r==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(r);ro("out",i.type||"unknown",i);}catch{}try{return o.send(r),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function Gm(e,t={},n=E){return Dm({type:e,...t},n)}const Xe={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var je=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(je||{});new Set(Object.values(Xe));new Set(Object.values(M));const jm=["Room","Quinoa"],zm={Room:["Room"],Quinoa:jm};function Y(e,t={},n=E){const o=t,{scopePath:r,scope:i,...a}=o,s=typeof r=="string"?r:i,c=Array.isArray(r)?r:s==="Room"||s==="Quinoa"?zm[s]:null;return Gm(e,c?{scopePath:c,...a}:a,n)}function Bm(e,t=E){return Y(M.Chat,{scope:"Room",message:e},t)}function Wm(e,t=E){return Y(M.Emote,{scope:"Room",emoteType:e},t)}function Hm(e,t=E){return Y(M.Wish,{scope:"Quinoa",wish:e},t)}function Um(e,t=E){return Y(M.KickPlayer,{scope:"Room",playerId:e},t)}function Vm(e,t=E){return Y(M.SetPlayerData,{scope:"Room",data:e},t)}function Km(e=E){return Y(M.UsurpHost,{scope:"Quinoa"},e)}function Ym(e=E){return Y(M.ReportSpeakingStart,{scope:"Quinoa"},e)}function qm(e,t=E){return Y(M.SetSelectedGame,{scope:"Room",gameId:e},t)}function Jm(e,t=E){return Y(M.VoteForGame,{scope:"Room",gameId:e},t)}function Xm(e,t=E){return Y(M.RequestGame,{scope:"Room",gameId:e},t)}function Qm(e=E){return Y(M.RestartGame,{scope:"Room"},e)}function Zm(e,t=E){return Y(M.Ping,{scope:"Quinoa",id:e},t)}function Ds(e,t,n=E){return Y(M.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const eh=Ds;function th(e,t,n=E){return Y(M.Teleport,{scope:"Quinoa",x:e,y:t},n)}function nh(e=E){return Y(M.CheckWeatherStatus,{scope:"Quinoa"},e)}function rh(e,t,n=E){return Y(M.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function oh(e,t=E){return Y(M.DropObject,{scope:"Quinoa",slotIndex:e},t)}function ih(e,t=E){return Y(M.PickupObject,{scope:"Quinoa",objectId:e},t)}function Wo(e,t=E){return Y(M.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function ah(e,t=E){return Y(M.PutItemInStorage,{scope:"Quinoa",itemId:e},t)}function sh(e,t=E){return Y(M.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e},t)}function lh(e,t,n=E){return Y(M.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function ch(e=E){return Y(M.LogItems,{scope:"Quinoa"},e)}function dh(e,t,n,o=E){return Y(M.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},o)}function uh(e,t=E){return Y(M.WaterPlant,{scope:"Quinoa",plantId:e},t)}function ph(e,t=E){return Y(M.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function fh(e=E){return Y(M.SellAllCrops,{scope:"Quinoa"},e)}function gh(e,t=E){return Y(M.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function mh(e,t=E){return Y(M.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function hh(e,t=E){return Y(M.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function bh(e,t=E){return Y(M.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function yh(e,t,n,o=E){return Y(M.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},o)}function vh(e,t=E){return Y(M.HatchEgg,{scope:"Quinoa",eggId:e},t)}function xh(e,t,n,o=E){return Y(M.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},o)}function wh(e,t,n=E){return Y(M.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Sh(e,t,n=E){return Y(M.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function kh(e,t=E){return Y(M.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Ch(e,t,n,o=E){return Y(M.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},o)}function Ah(e,t=E){return Y(M.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function Th(e,t,n,o=E){return Y(M.PlacePet,{scope:"Quinoa",petId:e,x:t,y:n},o)}function Ph(e,t,n=E){return Y(M.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function Ih(e,t=E){return Y(M.PetPositions,{scope:"Quinoa",positions:e},t)}function Mh(e,t,n=E){return Y(M.SwapPet,{scope:"Quinoa",petIdA:e,petIdB:t},n)}function Eh(e,t=E){return Y(M.StorePet,{scope:"Quinoa",petId:e},t)}function Lh(e,t,n=E){return Y(M.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function _h(e,t=E){return Y(M.SellPet,{scope:"Quinoa",petId:e},t)}let Fn=null;const Yt=new Set;function io(){const e=pt();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Yt.clear(),Fn=Bo().subscribeItems(t=>{if(t.added.length>0){const n=pt();for(const o of t.added)Rh(o,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Gs(){Fn&&(Fn(),Fn=null),Yt.clear(),console.log("🛑 [AutoFavorite] Stopped");}function Oh(e){const t=pt();t.enabled=e,t.simple.enabled=e,Is(t),e?io():Gs();}function Rh(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Yt.has(e.id)||e.isFavorited||e.favorited)&&js(e,t.simple)){Yt.add(e.id);try{Wo(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(o){console.error("[AutoFavorite] WebSocket error:",o),Yt.delete(e.id);}}}function js(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(r=>t.favoriteMutations.includes(r))):false}function Nh(){return Object.keys(ae.get("mutations")??{})}const zs={init(){this.isReady()||io();},isReady(){return yi()},DEFAULT_CONFIG:Ps,STORAGE_KEY:Do,loadConfig:pt,saveConfig:Go,updateConfig:Is,updateSimpleConfig:jo,setFavoriteSpecies:pg,setFavoriteMutations:fg,isEnabled:yi,start:io,stop:Gs,setEnabled:Oh,shouldFavorite:js,getGameMutations:Nh},Ho=Ye.JOURNAL_CHECKER,Bs={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function Et(){return _e(Ho,Bs)}function dr(e){Ge(Ho,e);}function Bi(){return Et().enabled}function $h(e){const t=Et();t.autoRefresh=e,dr(t);}function Fh(e){const t=Et();t.refreshIntervalMs=e,dr(t);}let Lr=null,Wi=null;function Ws(){try{return _s().get().myPlayer?.journal||null}catch{return null}}function Dh(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Hs(){const e=ae.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Us(){const e=ae.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,o])=>!("tileRef"in o)).map(([n])=>n),"Max Weight"]}function Gh(){return Object.keys(ae.get("mutations")??{})}function Vs(e){const n=(ae.get("pets")??{})[e];if(!n)return [];const o=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(r=>o.add(r)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(r=>o.add(r)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(r=>{Array.isArray(r)&&r.forEach(i=>o.add(i));}),[...o]}function Ks(e){const t=ae.get("plants")??{},n=Object.keys(t),o=Hs(),r=e?.produce??{},i=[];let a=0;for(const u of n){const d=r[u]?.variantsLogged?.map(f=>f.variant)??[],p=o.filter(f=>!d.includes(f));a+=d.length,i.push({species:u,variantsLogged:d,variantsMissing:p,variantsTotal:o.length,variantsPercentage:o.length>0?d.length/o.length*100:0,isComplete:p.length===0});}const s=n.length*o.length,c=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function Ys(e){const t=ae.get("pets")??{},n=Object.keys(t),o=Us(),r=e?.pets??{},i=[];let a=0,s=0,c=0,u=0;for(const d of n){const p=r[d],f=p?.variantsLogged?.map(S=>S.variant)??[],g=p?.abilitiesLogged?.map(S=>S.ability)??[],m=o.filter(S=>!f.includes(S)),h=Vs(d),b=h.filter(S=>!g.includes(S));s+=o.length,a+=f.length,u+=h.length,c+=Math.min(g.length,h.length),i.push({species:d,variantsLogged:f,variantsMissing:m,variantsTotal:o.length,variantsPercentage:o.length>0?f.length/o.length*100:0,abilitiesLogged:g,abilitiesMissing:b,abilitiesTotal:h.length,abilitiesPercentage:h.length>0?g.length/h.length*100:0,isComplete:m.length===0&&(h.length===0||b.length===0)});}const l=i.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:u,abilitiesLogged:c,abilitiesPercentage:u>0?c/u*100:0}}async function ur(e=false){await ae.waitForAny();const t=Ws(),n=Dh(t);if(!e&&Lr&&n===Wi)return Lr;const o={plants:Ks(t),pets:Ys(t),lastUpdated:Date.now()};return Lr=o,Wi=n,o}async function jh(){const e=await ur();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let qt=null;function ao(){const e=Et();e.enabled&&(e.autoRefresh&&!qt&&(qt=setInterval(async()=>{const t=await ur();Uo(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function qs(){qt&&(clearInterval(qt),qt=null);}function zh(e){const t=Et();t.enabled=e,dr(t),e?ao():qs();}function Uo(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function Bh(){const e=await ur();return Uo(e),e}const Wh={init(){this.isReady()||ao();},isReady(){return Bi()},DEFAULT_CONFIG:Bs,STORAGE_KEY:Ho,loadConfig:Et,saveConfig:dr,isEnabled:Bi,setAutoRefresh:$h,setRefreshInterval:Fh,getMyJournal:Ws,getCropVariants:Hs,getPetVariants:Us,getAllMutations:Gh,getPetAbilities:Vs,calculateProduceProgress:Ks,calculatePetProgress:Ys,aggregateJournalProgress:ur,getMissingSummary:jh,start:ao,stop:qs,setEnabled:zh,refresh:Bh,dispatchUpdate:Uo},Vo=Ye.BULK_FAVORITE,Js={enabled:false,position:"top-right"};function Tt(){return _e(Vo,Js)}function Xs(e){Ge(Vo,e);}function Hh(e){const t=Tt();t.position=e,Xs(t);}function Uh(){return Tt().enabled}function Vh(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function Qs(e){const t=Bo().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let o=0;for(const r of t.items){if(!Vh(r))continue;const i=n.has(r.id);e&&i||!e&&!i||(await Wo(r.id,e),o++,await Kh(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${o} items`),o}function Kh(e){return new Promise(t=>setTimeout(t,e))}function Yh(e,t){const n=new MutationObserver(r=>{for(const i of r)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const o=document.querySelectorAll(e);for(const r of o)t(r);return {disconnect:()=>n.disconnect()}}function qh(e,t){const n=new MutationObserver(o=>{for(const r of o)for(const i of r.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const Zs=`
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
`;let st=null,Dn=null,Pt=null,Rt=null;const Jh=`
  ${Zs}

  :host {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
  }
  
  .bulk-container {
    pointer-events: auto;
    display: flex;
    gap: 8px;
    padding: 10px;
    background: var(--bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: 0 8px 32px var(--shadow);
    backdrop-filter: blur(var(--glass-blur));
    transition: all 0.3s ease;
  }
  
  .bulk-btn {
    padding: 8px 16px;
    border: 1px solid var(--btn-border);
    border-radius: var(--btn-radius);
    font-family: var(--font-ui);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--fg);
    background: var(--btn-bg-start);
    box-shadow: 0 2px 4px var(--shadow);
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  
  .bulk-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: var(--accent);
    background: var(--btn-primary-bg-start);
    box-shadow: 0 4px 12px var(--shadow);
  }
  
  .bulk-btn:active:not(:disabled) {
    transform: translateY(1px);
  }
  
  .bulk-btn.unfavorite {
    --accent: #f87171; /* Red accent for destructive action */
  }
  
  .bulk-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  @media (max-width: 480px) {
    .bulk-container {
      flex-direction: column;
      width: calc(100vw - 40px);
      max-width: 280px;
    }
    .bulk-btn {
      width: 100%;
      justify-content: center;
    }
  }
`;function el(e,t){Jt(),st=w("div",{id:"gemini-bulk-favorite"}),Dn=st.attachShadow({mode:"open"});const n=w("style",null,Jh),o=w("button",{className:"bulk-btn",id:"favorite-all",onclick:()=>Hi(true,o,r)},"⭐ Favorite All"),r=w("button",{className:"bulk-btn unfavorite",id:"unfavorite-all",onclick:()=>Hi(false,o,r)},"✖ Unfavorite All"),i=w("div",{className:"bulk-container"},o,r);Dn.appendChild(n),Dn.appendChild(i),document.body.appendChild(st),Rt=new ResizeObserver(()=>{!st||!e||Xh(st,e,t.position);}),Rt.observe(e),Rt.observe(document.body);const a=qh('[data-testid="inventory-panel"], .inventory-container, #inventory',Jt),s=Pt;Pt=()=>{s?.(),Rt?.disconnect(),Rt=null,a.disconnect(),Jt();};}function Jt(){st?.remove(),st=null,Dn=null;}function Xh(e,t,n){const o=t.getBoundingClientRect(),r=window.innerWidth<=480,i=12;if(r){e.style.top=`${o.bottom-110}px`,e.style.left="50%",e.style.transform="translateX(-50%)";return}switch(e.style.transform="none",n){case "top-right":e.style.top=`${o.top+i}px`,e.style.left=`${o.right-220}px`;break;case "top-left":e.style.top=`${o.top+i}px`,e.style.left=`${o.left+i}px`;break;case "bottom-right":e.style.top=`${o.bottom-60}px`,e.style.left=`${o.right-220}px`;break;case "bottom-left":e.style.top=`${o.bottom-60}px`,e.style.left=`${o.left+i}px`;break}}async function Hi(e,t,n){t.disabled=true,n.disabled=true;const o=t.textContent,r=n.textContent;try{const i=await Qs(e),a=e?t:n;a.textContent=`✓ ${i} items`,setTimeout(()=>{t.textContent=o,n.textContent=r;},2e3);}finally{t.disabled=false,n.disabled=false;}}function so(){const e=Tt();if(!e.enabled)return;const t=Yh('[data-testid="inventory-panel"], .inventory-container, #inventory',o=>{el(o,e);}),n=Pt;Pt=()=>{n?.(),t.disconnect(),Jt();},console.log("✅ [BulkFavorite] Started");}function lo(){Pt?.(),Pt=null,console.log("🛑 [BulkFavorite] Stopped");}function Qh(e){const t=Tt();t.enabled=e,e?so():lo();}let In=false;const Zh={init(){if(In)return;Tt().enabled&&so(),In=true,console.log("✅ [MGBulkFavorite] Initialized");},isReady(){return In},DEFAULT_CONFIG:Js,STORAGE_KEY:Vo,loadConfig:Tt,saveConfig:Xs,isEnabled:Uh,setPosition:Hh,bulkFavorite:Qs,start:so,stop:lo,setEnabled:Qh,renderButton:el,removeButton:Jt,destroy(){lo(),In=false;}};class eb{constructor(){ie(this,"achievements",new Map);ie(this,"data");ie(this,"STORAGE_KEY",Ye.ACHIEVEMENTS);ie(this,"onUnlockCallbacks",[]);ie(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return _e(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Ge(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const o=this.isUnlocked(t),r=await n.checkProgress(),i={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=r>=n.target;return !o&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const o=await this.checkAchievement(n);t.push(o);}return t}unlock(t,n){const o=this.achievements.get(t);if(!o)return;const r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return {total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Unlock callback error:",o);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Progress callback error:",o);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Xt=null;function Ne(){return Xt||(Xt=new eb),Xt}function tb(){Xt&&(Xt=null);}let Mn=false;const nb={init(){Mn||(Ne(),Mn=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Mn},getManager(){return Ne()},register:(...e)=>Ne().register(...e),registerMany:(...e)=>Ne().registerMany(...e),isUnlocked:(...e)=>Ne().isUnlocked(...e),getAll:()=>Ne().getAllAchievements(),getUnlocked:()=>Ne().getUnlockedAchievements(),getStats:()=>Ne().getCompletionStats(),checkAll:()=>Ne().checkAllAchievements(),onUnlock:(...e)=>Ne().onUnlock(...e),onProgress:(...e)=>Ne().onProgress(...e),destroy(){tb(),Mn=false;}},rb=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],K={initialized:false,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:false};function ob(){const e=(t,n)=>{const o=r=>{r.stopImmediatePropagation(),r.preventDefault?.();};t.addEventListener(n,o,{capture:true}),K.listeners.push({type:n,handler:o,target:t});};for(const t of rb)e(document,t),e(window,t);}function ib(){for(const{type:e,handler:t,target:n}of K.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}K.listeners.length=0;}function ab(){const e=Object.getPrototypeOf(document);K.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),K.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),K.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function sb(){const e=Object.getPrototypeOf(document);try{K.savedProps.hidden&&Object.defineProperty(e,"hidden",K.savedProps.hidden);}catch{}try{K.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",K.savedProps.visibilityState);}catch{}try{K.savedProps.hasFocus&&(document.hasFocus=K.savedProps.hasFocus);}catch{}}function Jn(){K.audioCtx&&K.audioCtx.state!=="running"&&K.audioCtx.resume?.().catch(()=>{});}function lb(){try{const e=window.AudioContext||window.webkitAudioContext;K.audioCtx=new e({latencyHint:"interactive"}),K.gainNode=K.audioCtx.createGain(),K.gainNode.gain.value=1e-5,K.oscillator=K.audioCtx.createOscillator(),K.oscillator.frequency.value=1,K.oscillator.connect(K.gainNode).connect(K.audioCtx.destination),K.oscillator.start(),document.addEventListener("visibilitychange",Jn,{capture:!0}),window.addEventListener("focus",Jn,{capture:!0});}catch{tl();}}function tl(){try{K.oscillator?.stop();}catch{}try{K.oscillator?.disconnect(),K.gainNode?.disconnect();}catch{}try{K.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Jn,{capture:true}),window.removeEventListener("focus",Jn,{capture:true}),K.oscillator=null,K.gainNode=null,K.audioCtx=null;}function cb(){const e=document.querySelector("canvas")||document.body||document.documentElement;K.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},25e3);}function db(){K.heartbeatInterval!==null&&(clearInterval(K.heartbeatInterval),K.heartbeatInterval=null);}function ub(){K.initialized||(K.initialized=true,nl());}function pb(){return K.initialized}function nl(){K.initialized&&(K.running||(K.running=true,ab(),ob(),lb(),cb()));}function fb(){K.running&&(K.running=false,db(),tl(),ib(),sb());}function gb(){return K.running}const mb={init:ub,isReady:pb,start:nl,stop:fb,isRunning:gb};class rl{constructor(){ie(this,"stats");ie(this,"STORAGE_KEY",Ye.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return _e(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Ge(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats();}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats();}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(const r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let kt=null;function hb(){return kt||(kt=new rl),kt}function bb(){kt&&(kt.endSession(),kt=null);}function ol(e){const t=ar(e.xp),n=sr(e.petSpecies,e.targetScale),o=lr(e.petSpecies,e.xp,n),r=cr(e.petSpecies,t),i=Ls(e.petSpecies),a=Rg(o,n,i),s=Ng(o,n);return {current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:i,hoursToMax:a}}function il(e){return {...e,strength:ol(e)}}function al(e){return e.map(il)}function yb(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=al(e),n=t.reduce((c,u)=>c+u.strength.current,0),o=t.reduce((c,u)=>c+u.strength.max,0),r=t.filter(c=>c.strength.isMature).length,i=t.length-r,a=t.reduce((c,u)=>u.strength.max>(c?.strength.max||0)?u:c,t[0]),s=t.reduce((c,u)=>u.strength.max<(c?.strength.max||1/0)?u:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:i,strongestPet:a,weakestPet:s}}const vb=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:ol,enrichPetWithStrength:il,enrichPetsWithStrength:al,getPetStrengthStats:yb},Symbol.toStringTag,{value:"Module"}));class sl{constructor(){ie(this,"logs",[]);ie(this,"maxLogs",1e3);ie(this,"unsubscribe",null);ie(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=Ns.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));const{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,o=this.logs.filter(i=>i.timestamp>=n),r=new Map;for(const i of o){r.has(i.abilityId)||r.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=r.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of r.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const o=Date.now()-n,r=this.logs.filter(a=>a.petId===t&&a.timestamp>=o),i=new Map;for(const a of r){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:r.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,i)=>i.count-r.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let lt=null;function xb(){return lt||(lt=new sl,lt.init()),lt}function wb(){lt&&(lt.destroy(),lt=null);}const Sb={StatsTracker:rl,getStatsTracker:hb,destroyStatsTracker:bb},kb={AbilityLogger:sl,getAbilityLogger:xb,destroyAbilityLogger:wb,...vb},Ui={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},$e=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],Cb={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function yt(e){return e?Cb[e]??0:0}class Ab extends on{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});ie(this,"config",Ui);ie(this,"allPlants",[]);ie(this,"allPets",[]);ie(this,"sectionElement",null);}async build(n){const o=this.createGrid("12px");o.id="auto-favorite-settings";const r=document.createElement("style");r.textContent=`
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
    `,n.appendChild(r),this.sectionElement=o,n.appendChild(o),this.config=_e(Ye.AUTO_FAVORITE_UI,Ui),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await ae.waitForAny(3e3).catch(()=>{}),await Promise.all([ae.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),ae.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=ae.get("plants")||{},o=ae.get("pets")||{};this.allPlants=Object.keys(n).sort((r,i)=>{const a=n[r]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=yt(a)-yt(s);return c!==0?c:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(o).sort((r,i)=>{const a=o[r]?.rarity||null,s=o[i]?.rarity||null,c=yt(a)-yt(s);return c!==0?c:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(me.isReady())return;const n=1e4,o=100;let r=0;return new Promise(i=>{const a=()=>{me.isReady()||r>=n?i():(r+=o,setTimeout(a,o));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=w("div",{className:"kv"}),o=Xn({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),r=fo({checked:this.config.enabled,onChange:i=>{this.config.enabled=i,this.saveConfig();}});return n.append(o.root,r.root),Ae({title:"Auto-Favorite",padding:"lg"},n,w("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=w("div",{className:"u-col"}),o=w("div",{className:"mut-row"});o.appendChild(this.createMutationButton($e[0])),o.appendChild(this.createMutationButton($e[1])),n.appendChild(o);const r=w("div",{className:"mut-row"});r.appendChild(this.createMutationButton($e[2])),r.appendChild(this.createMutationButton($e[3])),r.appendChild(this.createMutationButton($e[4])),n.appendChild(r);const i=w("div",{className:"mut-row"});i.appendChild(this.createMutationButton($e[5])),i.appendChild(this.createMutationButton($e[6])),n.appendChild(i);const a=w("div",{className:"mut-row"});return a.appendChild(this.createMutationButton($e[7])),a.appendChild(this.createMutationButton($e[8])),n.appendChild(a),Ae({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,w("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${$e.length} active`))}createMutationButton(n){let o=this.config.favoriteMutations.includes(n.id);const r=n.color,i=parseInt(r.slice(1,3),16),a=parseInt(r.slice(3,5),16),s=parseInt(r.slice(5,7),16),c=f=>{let g=`rgba(${i}, ${a}, ${s}, 0.25)`,m=r;return n.id==="Rainbow"&&f&&(g="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",m="#fff9c4"),`
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
            `},u=w("div",{className:"mut-btn",style:c(o)}),l=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(me.isReady()){const f=me.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});f.style.width="28px",f.style.height="28px",f.style.objectFit="contain",l.appendChild(f);}}catch{}const d=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),p=w("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},d);if(u.append(l,p),n.id==="Rainbow"||n.id==="Gold"){const f=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(me.isReady()){const g=me.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});g.style.width="28px",g.style.height="28px",g.style.objectFit="contain",f.appendChild(g);}}catch{}u.append(f);}else {const f=w("div",{style:"width: 28px; flex-shrink: 0;"});u.append(f);}return u.addEventListener("click",f=>{f.stopPropagation(),o?(this.config.favoriteMutations=this.config.favoriteMutations.filter(m=>m!==n.id),o=false):(this.config.favoriteMutations.push(n.id),o=true),u.style.cssText=c(o),this.saveConfig();const g=this.sectionElement?.querySelector(".card p");g&&(g.textContent=`${this.config.favoriteMutations.length} / ${$e.length} active`);}),u}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:this.config.favoriteProduceList,onUpdate:n=>{this.config.favoriteProduceList=n,this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:this.config.favoritePetsList,onUpdate:n=>{this.config.favoritePetsList=n,this.saveConfig();}})}createItemSelectionCard(n){const{title:o,items:r,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),u=r;const l=w("div",{style:"margin-bottom: 8px;"}),d=ua({placeholder:`Search ${o.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:x=>{const A=x.trim().toLowerCase();A?u=r.filter(P=>P.toLowerCase().includes(A)):u=r,v.setData(m());}});l.appendChild(d.root);const p=w("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Qt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const x=m().map(A=>A.id);v.setSelection(x);}}),g=Qt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{v.clearSelection();}});p.append(f,g);const m=()=>u.map(x=>({id:x,name:x,rarity:this.getItemRarity(x,i),selected:c.has(x)})),h=x=>{if(!x){const P=w("span",{style:"opacity:0.5;"});return P.textContent="—",P}return pa({variant:"rarity",rarity:x,size:"sm"}).root},b=x=>{const A=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(me.isReady()){let P=i,T=x;i==="plant"&&(["Bamboo","Cactus"].includes(x)&&(P="tallplant"),x==="DawnCelestial"&&(T="DawnCelestialCrop"),x==="MoonCelestial"&&(T="MoonCelestialCrop"),x==="OrangeTulip"&&(T="Tulip"));const _=me.toCanvas(P,T,{scale:.5});_.style.width="28px",_.style.height="28px",_.style.objectFit="contain",A.appendChild(_);}}catch{}return A},v=da({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(x,A)=>x.name.localeCompare(A.name,void 0,{numeric:true,sensitivity:"base"}),render:x=>{const A=w("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),P=b(x.id),T=w("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},x.name);return A.append(P,T),A}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(x,A)=>yt(x.rarity)-yt(A.rarity),render:x=>h(x.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:x=>x.id,onSelectionChange:x=>{c.clear(),x.forEach(A=>c.add(A)),s(Array.from(c)),C();}}),y=w("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),C=()=>{y.textContent=`${c.size} / ${r.length} selected`;};return C(),Ae({title:`${o} (${c.size}/${r.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,v.root,y)}getItemRarity(n,o){try{if(o==="pet")return (ae.get("pets")||{})[n]?.rarity||null;if(o==="plant"){const r=ae.get("plants")||{},i=r[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(r))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){Ge(Ye.AUTO_FAVORITE_UI,this.config);try{const{setEnabled:n,updateSimpleConfig:o}=zs;await o({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled);}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n);}}}const Vi={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class Tb extends on{constructor(){super({id:"tab-feature-settings",label:"Features"});ie(this,"config",Vi);}async build(n){const o=this.createGrid("12px");o.id="feature-settings",n.appendChild(o),this.config=_e(Ye.CONFIG,Vi),o.appendChild(this.createQOLCard()),o.appendChild(this.createVisualIndicatorsCard()),o.appendChild(this.createTrackingCard());}createQOLCard(){return Ae({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}))}createVisualIndicatorsCard(){return Ae({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return Ae({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,o,r,i){const a=w("div",{className:i?"kv-col":"kv"}),s=w("div",{className:"kv"}),c=Xn({text:n,tone:"default",size:"md"}),u=fo({checked:o,onChange:r});if(s.append(c.root,u.root),i){a.appendChild(s);const l=w("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){Ge(Ye.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const Pb=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Ib=function(e){return "/"+e},Ki={},Yi=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let c=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");r=c(n.map(u=>{if(u=Ib(u),u in Ki)return;Ki[u]=true;const l=u.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Pb,l||(p.as="script"),p.crossOrigin="",p.href=u,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return r.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})};class Mb extends on{constructor(){super({id:"tab-journal-checker",label:"Journal"});ie(this,"progress",null);}async build(n){this.container=n;const o=this.createGrid("12px");o.id="journal-checker",n.appendChild(o),await this.updateProgress();const r=(i=>{this.progress=i.detail,this.renderContent();});window.addEventListener("gemini:journal-updated",r),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",r);});}async updateProgress(){try{const{MGJournalChecker:n}=await Yi(async()=>{const{MGJournalChecker:o}=await Promise.resolve().then(()=>bi);return {MGJournalChecker:o}},void 0);this.progress=await n.aggregateJournalProgress(),this.renderContent();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}renderContent(){if(!this.container)return;const n=this.container.querySelector("#journal-checker");if(n){if(n.innerHTML="",!this.progress){n.appendChild(this.createLoadingCard());return}n.appendChild(this.createSummaryCard()),n.appendChild(this.createCategoryCard("🌱 Produce",this.progress.plants)),n.appendChild(this.createCategoryCard("🐾 Pets",this.progress.pets,true)),n.appendChild(this.createActionsCard());}}createLoadingCard(){return Ae({title:"Loading...",padding:"lg"},w("p",{},"Fetching journal data..."))}createSummaryCard(){if(!this.progress)return w("div");const n=this.createProgressRow("🌱 Produce Species",this.progress.plants.logged,this.progress.plants.total,this.progress.plants.percentage),o=this.createProgressRow("   Variants Logged",this.progress.plants.variantsLogged,this.progress.plants.variantsTotal,this.progress.plants.variantsPercentage),r=this.createProgressRow("🐾 Pet Species",this.progress.pets.logged,this.progress.pets.total,this.progress.pets.percentage),i=this.createProgressRow("   Variants Logged",this.progress.pets.variantsLogged,this.progress.pets.variantsTotal,this.progress.pets.variantsPercentage),a=this.progress.pets.abilitiesTotal?this.createProgressRow("   Abilities Logged",this.progress.pets.abilitiesLogged??0,this.progress.pets.abilitiesTotal,this.progress.pets.abilitiesPercentage??0):null,s=[n,o,r,i];return a&&s.push(a),Ae({title:"Collection Progress",padding:"lg",expandable:true,defaultExpanded:true},...s)}createCategoryCard(n,o,r=false){const i=o.speciesDetails.filter(s=>!s.isComplete).sort((s,c)=>c.variantsPercentage-s.variantsPercentage).slice(0,5),a=w("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(i.length===0){const s=w("div",{style:"color: var(--accent); font-size: 13px; text-align: center; padding: 8px;"},"✅ All species complete!");a.appendChild(s);}else {for(const c of i)a.appendChild(this.createSpeciesRow(c,r));const s=o.speciesDetails.filter(c=>!c.isComplete).length-5;if(s>0){const c=w("div",{style:"font-size: 12px; color: var(--muted); text-align: center; padding-top: 4px;"},`...and ${s} more species`);a.appendChild(c);}}return Ae({title:n,padding:"lg",expandable:true,defaultExpanded:false},a)}createSpeciesRow(n,o=false){const r=w("div",{style:"display: flex; flex-direction: column; gap: 4px; padding: 6px 0; border-bottom: 1px solid var(--soft);"}),i=w("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),a=w("span",{style:"font-weight: 500; font-size: 13px;"},n.species),s=w("span",{style:`font-size: 12px; color: ${n.isComplete?"var(--accent)":"var(--muted)"}`},n.isComplete?"✅ Complete":`${Math.round(n.variantsPercentage)}%`);i.append(a,s);const c=n.variantsMissing.slice(0,4),u=c.length>0?`Missing: ${c.join(", ")}${n.variantsMissing.length>4?"...":""}`:"All variants logged",l=w("div",{style:"font-size: 11px; color: var(--muted);"},u);if(r.append(i,l),o&&n.abilitiesMissing&&n.abilitiesMissing.length>0){const p=`Abilities: ${n.abilitiesMissing.slice(0,3).join(", ")}${n.abilitiesMissing.length>3?"...":""}`,f=w("div",{style:"font-size: 11px; color: var(--muted);"},p);r.appendChild(f);}return r}createProgressRow(n,o,r,i){const a=w("div",{className:"kv-col",style:"gap: 6px;"}),s=w("div",{className:"kv"}),c=Xn({text:n,tone:"default",size:"md"}),u=w("span",{style:"font-size: 13px; color: var(--item-desc, var(--muted));"},`${o}/${r}`);s.append(c.root,u);const l=w("div",{style:`
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
      `});return l.appendChild(d),a.append(s,l),a}createActionsCard(){const n=Qt({label:"🔄 Refresh",variant:"default",size:"md",onClick:async()=>{await this.updateProgress();}}),o=Qt({label:"📋 Log Missing",variant:"default",size:"md",onClick:()=>{this.showMissingItems();}}),r=w("div",{style:"display: flex; gap: 8px; flex-wrap: wrap;"});return r.append(n,o),Ae({title:"Actions",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},r)}async showMissingItems(){if(this.progress)try{const{MGJournalChecker:n}=await Yi(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>bi);return {MGJournalChecker:r}},void 0),o=await n.getMissingSummary();if(o.plants.length===0&&o.pets.length===0){console.log("🎉 [JournalChecker] Collection complete!");return}if(console.group("📋 Missing Journal Entries"),o.plants.length>0){console.group(`🌱 Produce (${o.plants.length} species incomplete)`);for(const r of o.plants)console.log(`${r.species}: ${r.missing.join(", ")}`);console.groupEnd();}if(o.pets.length>0){console.group(`🐾 Pets (${o.pets.length} species incomplete)`);for(const r of o.pets){const i=[];r.missingVariants.length>0&&i.push(`Variants: ${r.missingVariants.join(", ")}`),r.missingAbilities.length>0&&i.push(`Abilities: ${r.missingAbilities.join(", ")}`),console.log(`${r.species}: ${i.join(" | ")}`);}console.groupEnd();}console.groupEnd();}catch(n){console.error("[JournalChecker] Failed to get missing summary:",n);}}}const Eb={Store:{select:ue.select.bind(ue),set:ue.set.bind(ue),subscribe:ue.subscribe.bind(ue),subscribeImmediate:ue.subscribeImmediate.bind(ue)},Globals:Ns,Modules:{Version:yo,Assets:ft,Manifest:Ke,Data:ae,Environment:qe,CustomModal:Mo,Sprite:me,Tile:Je,Pixi:ir,Audio:$o,Cosmetic:Fo},Features:{AutoFavorite:zs,JournalChecker:Wh,BulkFavorite:Zh,Achievements:nb,Tracker:Sb,AntiAfk:mb,Calculators:$g,Pets:kb},WebSocket:{chat:Bm,emote:Wm,wish:Hm,kickPlayer:Um,setPlayerData:Vm,usurpHost:Km,reportSpeakingStart:Ym,setSelectedGame:qm,voteForGame:Jm,requestGame:Xm,restartGame:Qm,ping:Zm,checkWeatherStatus:nh,move:eh,playerPosition:Ds,teleport:th,moveInventoryItem:rh,dropObject:oh,pickupObject:ih,toggleFavoriteItem:Wo,putItemInStorage:ah,retrieveItemFromStorage:sh,moveStorageItem:lh,logItems:ch,plantSeed:dh,waterPlant:uh,harvestCrop:ph,sellAllCrops:fh,purchaseDecor:gh,purchaseEgg:mh,purchaseTool:hh,purchaseSeed:bh,plantEgg:yh,hatchEgg:vh,plantGardenPlant:xh,potPlant:wh,mutationPotion:Sh,pickupDecor:kh,placeDecor:Ch,removeGardenObject:Ah,placePet:Th,feedPet:Ph,petPositions:Ih,swapPet:Mh,storePet:Eh,namePet:Lh,sellPet:_h},_internal:{getGlobals:Ue,initGlobals:Rs,destroyGlobals:Lm}};function Lb(){const e=E;e.Gemini=Eb,e.MGSprite=me,e.MGData=ae,e.MGPixi=ir,e.MGAssets=ft,e.MGEnvironment=qe;}let _r=null;function _b(){return _r||(_r=new dp),_r}function Ob(e){return [new kc(e),new Tb,new Ab,new Mb]}async function Rb(){await _b().preload();}function Nb(e){const{shadow:t,initialOpen:n}=e,o=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=w("div",{className:"gemini-tabbar"}),i=w("div",{className:"gemini-content",id:"content"}),a=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");o.append(r,i,a);const c=w("div",{className:"gemini-wrapper"},o);return t.append(c),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:c}}function $b(e){const{resizer:t,host:n,shadow:o,onWidthChange:r,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,u=s;function l(){const y=qe.detect(),C=Math.round(E.visualViewport?.width??E.innerWidth??0);if(y.platform==="mobile"||y.os==="ios"||y.os==="android"){const x=getComputedStyle(o.host),A=parseFloat(x.getPropertyValue("--inset-l"))||0,P=parseFloat(x.getPropertyValue("--inset-r"))||0,T=Math.max(280,C-Math.round(A+P));c=280,u=T;}else c=a,u=s;return {min:c,max:u}}function d(y){return Math.max(c,Math.min(u,Number(y)||i))}function p(y){const C=d(y);n.style.setProperty("--w",`${C}px`),r(C);}l();const f=qe.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const h=y=>{if(!m)return;y.preventDefault();const C=Math.round(E.innerWidth-y.clientX);p(C);},b=()=>{m&&(m=false,document.body.style.cursor="",E.removeEventListener("mousemove",h),E.removeEventListener("mouseup",b));},S=y=>{g&&(y.preventDefault(),m=true,document.body.style.cursor="ew-resize",E.addEventListener("mousemove",h),E.addEventListener("mouseup",b));};t.addEventListener("mousedown",S);function v(){t.removeEventListener("mousedown",S),E.removeEventListener("mousemove",h),E.removeEventListener("mouseup",b);}return {calculateResponsiveBounds:l,constrainWidthToLimits:d,setHudWidth:p,destroy:v}}function Fb(e){const{panel:t,onToggle:n,onClose:o,toggleCombo:r=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const u=t.classList.contains("open");if(i&&c.key==="Escape"&&u){o();return}r(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const Db=`
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
`,Gb=`
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
`,jb=`
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
`;function zb(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o);}const Bb=`
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
  
`,Wb=`
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
`,Hb=`
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
`,Ub=`
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
`,Vb=`
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
`,Kb=`
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
`,Yb=`
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
`,qb=`
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
`,Jb=`
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
`,Xb=`
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
`,Qb=`
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
`,Zb=`
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
`,ey=`
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
`,ty=`
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
`,ny=`
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
`,ry=`
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
`,oy=`
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
`,iy={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function ay(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,iy),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function sy(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function ly(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:u,initialTab:l,onTabChange:d,toggleCombo:p=I=>I.ctrlKey&&I.shiftKey&&I.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:h,shadow:b}=ay(t),S=[[Zs,"variables"],[Gb,"primitives"],[jb,"utilities"],[Db,"hud"],[Bb,"card"],[Wb,"badge"],[Hb,"button"],[Ub,"input"],[Vb,"label"],[Kb,"navTabs"],[Yb,"searchBar"],[qb,"select"],[Jb,"switch"],[Xb,"table"],[Qb,"timeRangePicker"],[Zb,"tooltip"],[ey,"slider"],[ty,"reorderableList"],[ny,"colorPicker"],[ry,"log"],[oy,"settings"]];for(let I=0;I<S.length;I++){const[O,j]=S[I];zb(b,O,j),I%5===4&&await sy();}const{panel:v,tabbar:y,content:C,resizer:x,closeButton:A,wrapper:P}=Nb({shadow:b,initialOpen:o});function T(I){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:I},bubbles:true})),i?.(I);}function _(I){const O=v.classList.contains("open");v.classList.toggle("open",I),v.setAttribute("aria-hidden",I?"false":"true"),I!==O&&T(I);}_(o),A.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),_(false);});const L=bc({host:h,themes:a,initialTheme:s,onThemeChange:c}),F=$b({resizer:x,host:h,shadow:b,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});F.setHudWidth(n);const ee=u({applyTheme:L.applyTheme,initialTheme:s,getCurrentTheme:L.getCurrentTheme,setHUDWidth:F.setHudWidth,setHUDOpen:_}),G=new Cl(ee,C,{applyTheme:L.applyTheme,getCurrentTheme:L.getCurrentTheme}),J=ee.map(I=>({id:I.id,label:I.label})),de=l&&ee.some(I=>I.id===l)?l:J[0]?.id||"",z=kl(J,de,I=>{G.activate(I),d?.(I);});z.root.style.flex="1 1 auto",z.root.style.minWidth="0",y.append(z.root,A),de&&G.activate(de);const D=Fb({panel:v,onToggle:()=>_(!v.classList.contains("open")),onClose:()=>_(false),toggleCombo:p,closeOnEscape:f}),$=()=>{z.recalc();const I=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;F.calculateResponsiveBounds(),F.setHudWidth(I);};E.addEventListener("resize",$);const R=I=>{const O=I.detail?.width;O?F.setHudWidth(O):F.setHudWidth(n),z.recalc();};h.addEventListener("gemini:layout-resize",R);function N(){D.destroy(),F.destroy(),E.removeEventListener("resize",$),h.removeEventListener("gemini:layout-resize",R);}return {host:h,shadow:b,wrapper:P,panel:v,content:C,setOpen:_,setWidth:F.setHudWidth,sections:ee,manager:G,nav:z,destroy:N}}const Bt={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},En={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function cy(){return {isOpen:_e(Bt.isOpen,En.isOpen),width:_e(Bt.width,En.width),theme:_e(Bt.theme,En.theme),activeTab:_e(Bt.activeTab,En.activeTab)}}function Ln(e,t){Ge(Bt[e],t);}const dy="https://i.imgur.com/IMkhMur.png",uy="Stats";function py(e){let t=e.iconUrl||dy;const n=e.ariaLabel||"Open MGH";let o=null,r=null,i=null,a=false,s=null,c=null;const u=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function d(){const v=document.querySelector(u.map(C=>`button[aria-label="${l(C)}"]`).join(","));if(!v)return null;let y=v.parentElement;for(;y&&y!==document.body;){if(u.reduce((x,A)=>x+y.querySelectorAll(`button[aria-label="${l(A)}"]`).length,0)>=2)return y;y=y.parentElement;}return null}function f(v){const y=Array.from(v.querySelectorAll("button[aria-label]"));if(!y.length)return {refBtn:null,refWrapper:null};const C=y.filter(F=>F.dataset.mghBtn!=="true"&&(F.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),x=C.length?C:y,A=x.find(F=>(F.getAttribute("aria-label")||"").toLowerCase()===uy.toLowerCase())||null,P=x.length>=2?x.length-2:x.length-1,T=A||x[P],_=T.parentElement,L=_&&_.parentElement===v&&_.tagName==="DIV"?_:null;return {refBtn:T,refWrapper:L}}function g(v,y,C){const x=v.cloneNode(false);x.type="button",x.setAttribute("aria-label",y),x.title=y,x.dataset.mghBtn="true",x.style.pointerEvents="auto",x.removeAttribute("id");const A=document.createElement("img");return A.src=C,A.alt="MGH",A.style.pointerEvents="none",A.style.userSelect="none",A.style.width="76%",A.style.height="76%",A.style.objectFit="contain",A.style.display="block",A.style.margin="auto",x.appendChild(A),x.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation();try{e.onClick?.();}catch{}}),x}function m(){if(a)return  false;a=true;let v=false;try{const y=d();if(!y)return !1;s!==y&&(s=y);const{refBtn:C,refWrapper:x}=f(y);if(!C)return !1;r=y.querySelector('div[data-mgh-wrapper="true"]'),!r&&x&&(r=x.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),v=!0);const A=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=A),o||(o=g(C,n,t),r?r.appendChild(o):o.parentElement!==y&&y.appendChild(o),v=!0),r&&r.parentElement!==y&&(y.appendChild(r),v=!0);const P=y;if(P&&P!==c){try{S.disconnect();}catch{}c=P,S.observe(c,{childList:!0,subtree:!0});}return v}finally{a=false;}}const h=document.getElementById("App")||document.body;let b=null;const S=new MutationObserver(v=>{const y=v.every(x=>{const A=Array.from(x.addedNodes||[]),P=Array.from(x.removedNodes||[]),T=A.concat(P);if(T.length===0){const _=x.target;return r&&(_===r||r.contains(_))||o&&(_===o||o.contains(_))}return T.every(_=>!!(!(_ instanceof HTMLElement)||r&&(_===r||r.contains(_))||o&&(_===o||o.contains(_))))}),C=v.some(x=>Array.from(x.removedNodes||[]).some(A=>A instanceof HTMLElement?!!(r&&(A===r||r.contains(A))||o&&(A===o||o.contains(A))):false));y&&!C||b===null&&(b=window.setTimeout(()=>{if(b=null,m()&&r){const A=r.parentElement;A&&A.lastElementChild!==r&&A.appendChild(r);}},150));});return m(),S.observe(h,{childList:true,subtree:true}),i=()=>S.disconnect(),()=>{try{i?.();}catch{}try{r?.remove();}catch{}}}const ll=[];function fy(){return ll.slice()}function gy(e){ll.push(e);}function cl(e){try{return JSON.parse(e)}catch{return}}function qi(e){if(typeof e=="string"){const t=cl(e);return t!==void 0?t:e}return e}function dl(e){if(e!=null){if(typeof e=="string"){const t=cl(e);return t!==void 0?dl(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function my(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function V(e,t,n){const o=typeof t=="boolean"?t:true,r=typeof t=="function"?t:n,i=(a,s)=>{if(dl(a)!==e)return;const u=r(a,s);return u&&typeof u=="object"&&"kind"in u?u:typeof u=="boolean"?u?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return gy(i),i}const Nt=new WeakSet,Ji=new WeakMap;function hy(e){const t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:fy();if(!o.length)return ()=>{};const r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const m of o){const h=m(g,r(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(g=h.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,c=null;const u=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Nt.has(f))return  true;const g=f.bind(p);function m(...h){const b=h.length===1?h[0]:h,S=qi(b),v=i(S,my(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){const y=v.message;return h.length>1&&Array.isArray(y)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),g(...y)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),g(y))}return g(...h)}Nt.add(m),Ji.set(m,f);try{p.sendMessage=m,Nt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Nt.has(f))return;function g(m){const h=qi(m),b=i(h,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(b?.kind==="replace"){const S=b.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",S),f.call(this,v)}return f.call(this,m)}Nt.add(g),Ji.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const d=e.waitForRoomConnectionMs??4e3;if(!u()&&d>0){const p=Date.now();c=setInterval(()=>{if(u()){clearInterval(c),c=null;return}Date.now()-p>d&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const ul=[];function by(){return ul.slice()}function Xi(e){ul.push(e);}function yy(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function vy(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Or=Symbol.for("ariesmod.ws.handlers.patched");function be(e,t){if(typeof e=="string"){const r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return Xi(i),i}const n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Xi(o),o}function xy(e,t=by(),n={}){const o=n.pageWindow??window,r=!!n.debug;if(e[Or])return ()=>{};e[Or]=true;const i={ws:e,pageWindow:o,debug:r},a=d=>{for(const p of t)try{if(!p.match(d))continue;if(p.handle(d,i)===!0)return}catch(f){r&&console.error("[WS] handler error",f,d);}},s=d=>{const p=vy(d.data),f=yy(p);a({kind:"message",raw:d.data,data:p,type:f});},c=d=>{a({kind:"close",code:d.code,reason:d.reason,wasClean:d.wasClean,event:d});},u=d=>a({kind:"open",event:d}),l=d=>a({kind:"error",event:d});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",u),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",u);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[Or];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();be(je.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});be(je.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});be(je.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});be(je.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});be(je.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});be(je.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});be(je.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});be(je.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});be(je.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});be(je.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});be(Xe.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});be(Xe.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});be(Xe.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});be(Xe.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});be(Xe.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});be(Xe.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});be(Xe.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});be(Xe.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});V(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));V(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));V(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));V(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));V(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));V(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));V(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));V(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));V(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));V(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));V(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));V(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));V(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));V(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));V(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));V(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));V(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));V(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));V(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));V(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));V(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));V(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));V(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));V(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));V(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));V(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));V(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));V(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));V(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));V(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));V(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");V(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));V(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));V(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));V(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));V(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));V(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));V(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));V(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));V(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));V(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));V(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));V(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));V(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));V(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));V(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));V(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function wy(e={}){const t=e.pageWindow??E,n=e.pollMs??500,o=!!e.debug,r=[];r.push(Nm(t,{debug:o})),r.push(hy({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=xy(s,e.handlers,{debug:o,pageWindow:t}));};return a(qn(t).ws),r.push(Fs(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>qn(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let _n=null;function Sy(e={}){return _n||(_n=wy(e),_n)}function ky(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Fs(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),Sy({debug:false}),()=>{t?.(),t=null;}}async function Cy(e){e.logStep("Atoms","Prewarming Jotai store...");try{await wp(),await bp({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function Ay(e){e.logStep("Globals","Initializing global variables...");try{Rs(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function Ty(e){e.logStep("API","Exposing Gemini API...");try{Lb(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Rr(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Py(e){e.logStep("HUD","Loading HUD preferences..."),await Rr();const t=cy();await Rr();const n=await ly({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Ln("width",o),onOpenChange:o=>Ln("isOpen",o),themes:Ht,initialTheme:t.theme,onThemeChange:o=>Ln("theme",o),buildSections:o=>Ob({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Ln("activeTab",o)});return await Rr(),e.logStep("HUD","HUD ready","success"),n}async function Iy(e){e.setSubtitle("Activating Gemini modules..."),await Ts(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error");});}async function My(e){e.logStep("Sprites","Warming up sprite cache...");try{me.isReady()||await me.init();const t=[],n=ae.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const o=ae.get("pets");if(o)for(const a of Object.values(o))a?.spriteId&&t.push(a.spriteId);const r=[...new Set(t)],i=r.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await me.warmup(r,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function Ey(e){e.logStep("Sections","Preloading UI sections...");try{await Rb(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}Ha();fp();(async function(){Al();const e=Sl({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=ky(e),await Cy(e),Ay(e),Ty(e),await Iy(e),await My(e),await Ey(e),e.succeed("Gemini is ready!");}catch(o){e.fail("Failed to initialize the mod.",o);}finally{t?.();}const n=await Py(e);py({onClick:()=>n.setOpen(true)});})();

})();