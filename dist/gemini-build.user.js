// ==UserScript==
// @name         Gemini
// @namespace    Gemini
// @version      1.0.1
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
  var Dg=Object.defineProperty;var Bg=(e,t,n)=>t in e?Dg(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var M=(e,t,n)=>Bg(e,typeof t!="symbol"?t+"":t,n);function h(e,t=null,...n){const r=document.createElement(e);for(const[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const mo="https://i.imgur.com/k5WuC32.png",oc="gemini-loader-style",Qt="gemini-loader",jd=80;function Gg(){if(document.getElementById(oc))return;const e=document.createElement("style");e.id=oc,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Qt} {
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
    #${Qt} {
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

    #${Qt}.gemini-loader--error .gemini-loader__actions {
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
    #${Qt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Qt}.gemini-loader--error .gemini-loader__spinner {
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
      #${Qt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function ho(e,t,n){const r=h("div",{className:`gemini-loader__log ${n}`},h("div",{className:"gemini-loader__dot"}),h("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>jd;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function zg(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(mo);return}GM_xmlhttpRequest({method:"GET",url:mo,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(mo),r.readAsDataURL(n);},onerror:()=>e(mo)});})}function Hg(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Gg();const n=h("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=h("div",{className:"gemini-loader__logs"}),o=h("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=h("div",{className:"gemini-loader__spinner"},o);zg().then(b=>{o.src=b;});const i=h("div",{className:"gemini-loader__card"},h("div",{className:"gemini-loader__header"},a,h("div",{className:"gemini-loader__titles"},h("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=h("div",{id:Qt},i);(document.body||document.documentElement).appendChild(s);const c=h("div",{className:"gemini-loader__actions"},h("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const d=b=>{n.textContent=b;},l=new Map,u=(b,y)=>{b.className=`gemini-loader__log ${y}`;};return {log:(b,y="info")=>ho(r,b,y),logStep:(b,y,C="info")=>{const S=String(b||"").trim();if(!S){ho(r,y,C);return}const v=l.get(S);if(v){v.el.lastElementChild&&(v.el.lastElementChild.textContent=y),v.tone!==C&&(u(v.el,C),v.tone=C);return}const A=h("div",{className:`gemini-loader__log ${C}`},h("div",{className:"gemini-loader__dot"}),h("div",{textContent:y}));for(l.set(S,{el:A,tone:C}),r.appendChild(A);r.childElementCount>jd;){const x=r.firstElementChild;if(!x)break;const w=Array.from(l.entries()).find(([,_])=>_.el===x)?.[0];w&&l.delete(w),x.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(b,y=600)=>{b&&ho(r,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),y);},fail:(b,y)=>{ho(r,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,y);}}}const ac=150,jg=30;function Ug(e,t,n){const r=h("div",{className:"lg-pill",id:"pill"}),o=e.map(k=>{const T=h("button",{className:"lg-tab"},k.label);return T.setAttribute("data-target",k.id),T}),a=h("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=new Map(e.map(k=>[k.id,true])),s=new Map(o.map((k,T)=>[e[T].id,k]));function c(k){const T=document.createElementNS("http://www.w3.org/2000/svg","svg");T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.setAttribute("stroke","currentColor"),T.setAttribute("stroke-width","2"),T.setAttribute("stroke-linecap","round"),T.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","polyline");return E.setAttribute("points",k==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),T.appendChild(E),T}const d=h("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(c("left"));const l=h("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});l.appendChild(c("right"));const p=h("div",{className:"lg-tabs-wrapper"},d,a,l);let f=0,g=0,m=false;function b(){const k=a.scrollLeft>0,T=a.scrollLeft<a.scrollWidth-a.clientWidth-1;d.classList.toggle("disabled",!k),l.classList.toggle("disabled",!T);}d.addEventListener("click",()=>{a.scrollBy({left:-ac,behavior:"smooth"}),setTimeout(b,300);}),l.addEventListener("click",()=>{a.scrollBy({left:ac,behavior:"smooth"}),setTimeout(b,300);}),a.addEventListener("wheel",k=>{Math.abs(k.deltaY)>Math.abs(k.deltaX)&&(k.preventDefault(),a.scrollLeft+=k.deltaY,b());},{passive:false});let y=0;a.addEventListener("touchstart",k=>{const T=k.touches[0];f=T.clientX,g=T.clientY,m=false,y=a.scrollLeft;},{passive:true}),a.addEventListener("touchmove",k=>{if(m)return;const T=k.touches[0],E=T.clientX-f,B=T.clientY-g;if(Math.abs(B)>Math.abs(E)){m=true;return}Math.abs(E)>jg&&(k.preventDefault(),a.scrollLeft=y-E);},{passive:false}),a.addEventListener("touchend",()=>{b();},{passive:true}),a.addEventListener("scroll",b,{passive:true});function C(k){const T=o.find(E=>E.dataset.target===k)||o[0];T&&requestAnimationFrame(()=>{const E=T.offsetLeft,B=T.offsetWidth;r.style.width=`${B}px`,r.style.transform=`translateX(${E}px)`;const Y=a.scrollLeft,H=Y,q=Y+a.clientWidth,j=E-12,N=E+B+12;j<H?a.scrollTo({left:j,behavior:"smooth"}):N>q&&a.scrollTo({left:N-a.clientWidth,behavior:"smooth"}),setTimeout(b,300);});}function S(){for(const[k,T]of i)if(T)return k;return null}function v(k){const T=s.get(k);if(T)if(i.set(k,false),T.style.display="none",w===k){const E=S();E&&_(E);}else x();}function A(k){const T=s.get(k);T&&(i.set(k,true),T.style.display="",x());}function x(){C(w),b();}let w=t||(e[0]?.id??"");function _(k){i.get(k)&&(w=k,o.forEach(T=>T.classList.toggle("active",T.dataset.target===k)),C(k),n(k));}return o.forEach(k=>k.addEventListener("click",()=>_(k.dataset.target))),queueMicrotask(()=>{C(w),b();}),{root:p,activate:_,recalc:x,getActive:()=>w,showTab:A,hideTab:v,isTabVisible:k=>i.get(k)??false,getVisibleTabs:()=>[...i.entries()].filter(([k,T])=>T).map(([k])=>k)}}class Ut{constructor(t){M(this,"id");M(this,"label");M(this,"container",null);M(this,"cleanupFunctions",[]);M(this,"preloadedContent",null);M(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=h("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return h("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=h("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Wg{constructor(t,n,r){M(this,"sections");M(this,"activeId",null);M(this,"container");M(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const Gt="gemini:",Vg={STATE:"hud:state",THEME:"hud:theme"},Xg={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},qg={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds"},Kg={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},Se={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config"},Yg={AUTO_RELOAD:"dev:auto-reload"},zt={HUD:Vg,SECTION:Xg,MODULE:qg,GLOBAL:Kg,FEATURE:Se,DEV:Yg},ic={STORAGE_CHANGE:"gemini:storage:change"};function ve(e,t){try{const n=e.startsWith(Gt)?e:Gt+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function we(e,t){try{const n=e.startsWith(Gt)?e:Gt+e,r=e.startsWith(Gt)?e.slice(Gt.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Jg(e){try{const t=e.startsWith(Gt)?e:Gt+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function Qg(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const a=localStorage.key(o);a&&a.startsWith(e)&&t.push(a);}for(const o of t)try{const a=localStorage.getItem(o);if(a!==null){const i=JSON.parse(a),s=o.slice(e.length);we(s,i),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(a){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,a);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(we("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Ud="gemini.sections";function Wd(){const e=ve(Ud,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Zg(e){we(Ud,e);}async function em(e){return Wd()[e]}function tm(e,t){const n=Wd();Zg({...n,[e]:t});}function sc(e,t){return {...e,...t??{}}}async function nm(e){const t=await em(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){tm(e.path,n);}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function c(){o();}return {get:a,set:i,update:s,save:c}}async function zn(e,t){const{path:n=e,...r}=t;return nm({path:n,...r})}let rm=0;const bo=new Map;function He(e={},...t){const{id:n,className:r,variant:o="default",padding:a="md",interactive:i=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:f,actions:g,footer:m,divider:b=false,tone:y="neutral",stateKey:C}=e,S=h("div",{className:"card",id:n,tabIndex:i?0:void 0});S.classList.add(`card--${o}`,`card--p-${a}`),i&&S.classList.add("card--interactive"),y!=="neutral"&&S.classList.add(`card--tone-${y}`),r&&S.classList.add(...r.split(" ").filter(Boolean)),s&&S.classList.add("card--expandable");const v=s?C??n??(typeof u=="string"?`title:${u}`:null):null;let A=!s||c;v&&bo.has(v)&&(A=!!bo.get(v));let x=null,w=null,_=null,k=null,T=null;const E=n?`${n}-collapse`:`card-collapse-${++rm}`,B=()=>{if(k!==null&&(cancelAnimationFrame(k),k=null),T){const D=T;T=null,D();}},Y=(D,G)=>{if(!_)return;B();const $=_;if($.setAttribute("aria-hidden",String(!D)),!G){$.classList.remove("card-collapse--animating"),$.style.display=D?"":"none",$.style.height="",$.style.opacity="";return}if($.classList.add("card-collapse--animating"),$.style.display="",D){$.style.height="auto";const U=$.scrollHeight;if(!U){$.classList.remove("card-collapse--animating"),$.style.display="",$.style.height="",$.style.opacity="";return}$.style.height="0px",$.style.opacity="0",$.offsetHeight,k=requestAnimationFrame(()=>{k=null,$.style.height=`${U}px`,$.style.opacity="1";});}else {const U=$.scrollHeight;if(!U){$.classList.remove("card-collapse--animating"),$.style.display="none",$.style.height="",$.style.opacity="";return}$.style.height=`${U}px`,$.style.opacity="1",$.offsetHeight,k=requestAnimationFrame(()=>{k=null,$.style.height="0px",$.style.opacity="0";});}const I=()=>{$.classList.remove("card-collapse--animating"),$.style.height="",D||($.style.display="none"),$.style.opacity="";};let O=null;const F=U=>{U.target===$&&(O!==null&&(clearTimeout(O),O=null),$.removeEventListener("transitionend",F),$.removeEventListener("transitioncancel",F),T=null,I());};T=()=>{O!==null&&(clearTimeout(O),O=null),$.removeEventListener("transitionend",F),$.removeEventListener("transitioncancel",F),T=null,I();},$.addEventListener("transitionend",F),$.addEventListener("transitioncancel",F),O=window.setTimeout(()=>{T?.();},420);};function H(D){const G=document.createElementNS("http://www.w3.org/2000/svg","svg");return G.setAttribute("viewBox","0 0 24 24"),G.setAttribute("width","16"),G.setAttribute("height","16"),G.innerHTML=D==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',G}function q(D,G=true,$=true){A=D,S.classList.toggle("card--collapsed",!A),S.classList.toggle("card--expanded",A),x&&(x.dataset.expanded=String(A),x.setAttribute("aria-expanded",String(A))),w&&(w.setAttribute("aria-expanded",String(A)),w.classList.toggle("card-toggle--collapsed",!A),w.setAttribute("aria-label",A?"Replier le contenu":"Deplier le contenu"),w.replaceChildren(H(A?"up":"down"))),s?Y(A,$):_&&(_.style.display="",_.style.height="",_.style.opacity="",_.setAttribute("aria-hidden","false")),G&&d&&d(A),v&&bo.set(v,A);}if(l){const D=h("div",{className:"card-media"});D.append(l),S.appendChild(D);}const j=!!(u||p||f||g&&g.length||s);if(j){x=h("div",{className:"card-header"});const D=h("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const I=h("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&I.append(typeof f=="string"?h("span",{className:"badge"},f):f),D.appendChild(I);}if(p){const I=h("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);D.appendChild(I);}(D.childNodes.length||s)&&x.appendChild(D);const G=h("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),$=h("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(I=>$.appendChild(I)),$.childNodes.length&&G.appendChild($),s&&(w=h("button",{className:"card-toggle",type:"button",ariaExpanded:String(A),ariaControls:E,ariaLabel:A?"Replier le contenu":"Deplier le contenu"}),w.textContent=A?"▲":"▼",w.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),q(!A);}),G.appendChild(w),x.classList.add("card-header--expandable"),x.addEventListener("click",I=>{const O=I.target;O?.closest(".card-actions")||O?.closest(".card-toggle")||q(!A);})),G.childNodes.length&&x.appendChild(G),S.appendChild(x);}_=h("div",{className:"card-collapse",id:E,ariaHidden:s?String(!A):"false"}),S.appendChild(_),b&&j&&_.appendChild(h("div",{className:"card-divider"}));const N=h("div",{className:"card-body"});if(N.append(...t),_.appendChild(N),m){b&&_.appendChild(h("div",{className:"card-divider"}));const D=h("div",{className:"card-footer"});D.append(m),_.appendChild(D);}return w&&w.setAttribute("aria-controls",E),q(A,false,false),v&&bo.set(v,A),S}let ua=false;const pa=new Set,tt=e=>{const t=document.activeElement;for(const n of pa)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function om(){ua||(ua=true,window.addEventListener("keydown",tt,true),window.addEventListener("keypress",tt,true),window.addEventListener("keyup",tt,true),document.addEventListener("keydown",tt,true),document.addEventListener("keypress",tt,true),document.addEventListener("keyup",tt,true));}function am(){ua&&(pa.size>0||(ua=false,window.removeEventListener("keydown",tt,true),window.removeEventListener("keypress",tt,true),window.removeEventListener("keyup",tt,true),document.removeEventListener("keydown",tt,true),document.removeEventListener("keypress",tt,true),document.removeEventListener("keyup",tt,true)));}function im(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=false,blockGameKeys:s=true,onChange:c,onOpenChange:d}=e,l=h("div",{className:"select",id:t}),u=h("button",{className:"select-trigger",type:"button"}),p=h("span",{className:"select-value"},o),f=h("span",{className:"select-caret"},"▾");u.append(p,f);const g=h("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let m=false,b=n,y=null,C=!!i;function S(I){return I==null?o:(e.options||r).find(F=>F.value===I)?.label??o}function v(I){p.textContent=S(I),g.querySelectorAll(".select-option").forEach(O=>{const F=O.dataset.value,U=I!=null&&F===I;O.classList.toggle("selected",U),O.setAttribute("aria-selected",String(U));});}function A(I){g.replaceChildren(),I.forEach(O=>{const F=h("button",{className:"select-option"+(O.disabled?" disabled":""),type:"button",role:"option","data-value":O.value,"aria-selected":String(O.value===b),tabindex:"-1"},O.label);O.value===b&&F.classList.add("selected"),O.disabled||F.addEventListener("pointerdown",U=>{U.preventDefault(),U.stopPropagation(),E(O.value,{notify:true}),k();},{capture:true}),g.appendChild(F);});}function x(){u.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function w(){const I=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${I.width}px`});}function _(){m||C||(m=true,l.classList.add("open"),x(),w(),document.addEventListener("mousedown",j,true),document.addEventListener("scroll",N,true),window.addEventListener("resize",D),g.focus({preventScroll:true}),s&&(om(),pa.add(l),y=()=>{pa.delete(l),am();}),d?.(true));}function k(){m&&(m=false,l.classList.remove("open"),x(),document.removeEventListener("mousedown",j,true),document.removeEventListener("scroll",N,true),window.removeEventListener("resize",D),u.focus({preventScroll:true}),y?.(),y=null,d?.(false));}function T(){m?k():_();}function E(I,O={}){const F=b;b=I,v(b),O.notify!==false&&F!==I&&c?.(I);}function B(){return b}function Y(I){const O=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!O.length)return;const F=O.findIndex(he=>he.classList.contains("active")),U=O[(F+(I===1?1:O.length-1))%O.length];O.forEach(he=>he.classList.remove("active")),U.classList.add("active"),U.focus({preventScroll:true}),U.scrollIntoView({block:"nearest"});}function H(I){(I.key===" "||I.key==="Enter"||I.key==="ArrowDown")&&(I.preventDefault(),_());}function q(I){if(I.key==="Escape"){I.preventDefault(),k();return}if(I.key==="Enter"||I.key===" "){const O=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");O&&!O.classList.contains("disabled")&&(I.preventDefault(),E(O.dataset.value,{notify:true}),k());return}if(I.key==="ArrowDown"){I.preventDefault(),Y(1);return}if(I.key==="ArrowUp"){I.preventDefault(),Y(-1);return}}function j(I){l.contains(I.target)||k();}function N(){m&&w();}function D(){m&&w();}function G(I){C=!!I,u.disabled=C,l.classList.toggle("disabled",C),C&&k();}function $(I){e.options=I,A(I),I.some(O=>O.value===b)||(b=null,v(null));}return l.append(u,g),u.addEventListener("pointerdown",I=>{I.preventDefault(),I.stopPropagation(),T();},{capture:true}),u.addEventListener("keydown",H),g.addEventListener("keydown",q),A(r),n!=null?(b=n,v(b)):v(null),x(),G(C),{root:l,open:_,close:k,toggle:T,getValue:B,setValue:E,setOptions:$,setDisabled:G,destroy(){document.removeEventListener("mousedown",j,true),document.removeEventListener("scroll",N,true),window.removeEventListener("resize",D),y?.(),y=null;}}}function Vd(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:c=false,disabled:d=false,tooltip:l,hint:u,icon:p,suffix:f,onClick:g}=e,m=h("div",{className:"lg-label-wrap",id:t}),b=h("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const E=typeof p=="string"?h("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),b.appendChild(E);}const y=h("span",{className:"lg-label-text"},n);b.appendChild(y);const C=h("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&b.appendChild(C);let S=null;if(f!=null){S=typeof f=="string"?document.createTextNode(f):f;const E=h("span",{className:"lg-label-suffix"});E.appendChild(S),b.appendChild(E);}const v=u?h("div",{className:"lg-label-hint"},u):null;m.classList.add(`lg-label--${i}`),m.classList.add(`lg-label--${a}`),s==="title"&&m.classList.add("lg-label--title"),A(o),d&&m.classList.add("is-disabled"),m.appendChild(b),v&&m.appendChild(v),g&&b.addEventListener("click",g);function A(E){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${E}`);}function x(E){y.textContent=E;}function w(E){A(E);}function _(E){E&&!C.isConnected&&b.appendChild(C),!E&&C.isConnected&&C.remove(),E?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required");}function k(E){m.classList.toggle("is-disabled",!!E);}function T(E){!E&&v&&v.isConnected?v.remove():E&&v?v.textContent=E:E&&!v&&m.appendChild(h("div",{className:"lg-label-hint"},E));}return {root:m,labelEl:b,hintEl:v,setText:x,setTone:w,setRequired:_,setDisabled:k,setHint:T}}function lr(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function xo(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=lr(e);return r&&n.appendChild(r),n}function sm(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function qe(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=false,tooltip:c,type:d="button",onClick:l,disabled:u=false,fullWidth:p=false}=e,f=h("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=sm(),m=a?xo(a,"left"):null,b=i?xo(i,"right"):null,y=document.createElement("span");y.className="btn-label";const C=lr(t);C&&y.appendChild(C),!C&&(m||b)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(y),b&&f.appendChild(b);const S=u||s;f.disabled=S,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const v=f;return v.setLoading=A=>{f.setAttribute("aria-busy",String(!!A)),g.style.display=A?"inline-block":"none",f.disabled=A||u;},v.setDisabled=A=>{f.disabled=A||f.getAttribute("aria-busy")==="true";},v.setLabel=A=>{y.replaceChildren();const x=lr(A);x&&y.appendChild(x),!x&&(m||b)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},v.setIconLeft=A=>{if(A==null){m?.remove();return}m?m.replaceChildren(lr(A)):f.insertBefore(xo(A,"left"),y);},v.setIconRight=A=>{if(A==null){b?.remove();return}b?b.replaceChildren(lr(A)):f.appendChild(xo(A,"right"));},v.setVariant=A=>{f.classList.remove("primary","danger"),A==="primary"&&f.classList.add("primary"),A==="danger"&&f.classList.add("danger");},v}function Fr(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=h("div",{className:"lg-switch-wrap"}),d=h("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),l=h("span",{className:"lg-switch-track"}),u=h("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;a&&i!=="none"&&(p=h("span",{className:"lg-switch-label"},a)),p&&i==="left"?c.append(p,d):p&&i==="right"?c.append(d,p):c.append(d);let f=!!n,g=!!r;function m(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function b(k=false){g||(f=!f,m(),k||s?.(f));}function y(k){k.preventDefault(),b();}function C(k){g||((k.key===" "||k.key==="Enter")&&(k.preventDefault(),b()),k.key==="ArrowLeft"&&(k.preventDefault(),v(false)),k.key==="ArrowRight"&&(k.preventDefault(),v(true)));}d.addEventListener("click",y),d.addEventListener("keydown",C);function S(){return f}function v(k,T=false){f=!!k,m(),T||s?.(f);}function A(k){g=!!k,m();}function x(k){if(!k){p&&(p.remove(),p=null);return}p?p.textContent=k:(p=h("span",{className:"lg-switch-label"},k),c.append(p));}function w(){d.focus();}function _(){d.removeEventListener("click",y),d.removeEventListener("keydown",C);}return m(),{root:c,button:d,isChecked:S,setChecked:v,setDisabled:A,setLabel:x,focus:w,destroy:_}}let Xd=null,Os=null;function lm(){return Xd}function cm(e){Xd=e,Os=null;}function qd(){return Os}function dm(e){Os=e;}function um(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function Kd(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Yd(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return "Edge";if(o)return "Opera";if(a)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function pm(){const e=lm();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function fm(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Jd(){try{return window.top!==window.self}catch{return  true}}function gm(){const e=Jd(),t=fm(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Pa(){const e=qd();if(e)return e;const t=gm(),n=pm(),r=Kd(),o=Yd(),a=Jd(),i=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),u=Math.round(s?.height??d),p=Math.round(i.width||0),f=Math.round(i.height||0),g=Math.round(i.availWidth||p),m=Math.round(i.availHeight||f),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,y={surface:t,host:location.hostname,origin:location.origin,isInIframe:a,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:d,visualViewportWidth:l,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:b,orientation:um()};return dm(y),y}function mm(){return Pa().surface==="discord"}function hm(){return Pa().platform==="mobile"}function bm(){Pa();}function xm(){return qd()!==null}const Ke={init:bm,isReady:xm,detect:Pa,isDiscord:mm,isMobile:hm,detectOS:Kd,detectBrowser:Yd,setPlatformOverride:cm};let fa=false;const cr=new Set;function ym(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const nt=e=>{const t=ym();if(t){for(const n of cr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function vm(){fa||(fa=true,window.addEventListener("keydown",nt,true),window.addEventListener("keypress",nt,true),window.addEventListener("keyup",nt,true),document.addEventListener("keydown",nt,true),document.addEventListener("keypress",nt,true),document.addEventListener("keyup",nt,true));}function wm(){fa&&(fa=false,window.removeEventListener("keydown",nt,true),window.removeEventListener("keypress",nt,true),window.removeEventListener("keyup",nt,true),document.removeEventListener("keydown",nt,true),document.removeEventListener("keypress",nt,true),document.removeEventListener("keyup",nt,true));}function Sm(e){return cr.size===0&&vm(),cr.add(e),()=>{cr.delete(e),cr.size===0&&wm();}}function Cm(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function km(e,t){return t?e.replace(t,""):e}function _m(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function Fs(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=false,allowDashes:i=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:d=true,debounceMs:l=0,onChange:u,onEnter:p,label:f}=e,g=h("div",{className:"lg-input-wrap"}),m=h("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),r&&(m.value=r),f){const E=h("div",{className:"lg-input-label"},f);g.appendChild(E);}g.appendChild(m);const b=Cm(o,a,i,s),y=()=>{const E=m.selectionStart??m.value.length,B=m.value.length,Y=km(m.value,b);if(Y!==m.value){m.value=Y;const H=B-Y.length,q=Math.max(0,E-H);m.setSelectionRange(q,q);}},C=_m(()=>u?.(m.value),l);m.addEventListener("input",()=>{y(),C();}),m.addEventListener("paste",()=>queueMicrotask(()=>{y(),C();})),m.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(m.value);});const S=d?Sm(m):()=>{};function v(){return m.value}function A(E){m.value=E??"",y(),C();}function x(){m.focus();}function w(){m.blur();}function _(E){m.disabled=!!E;}function k(){return document.activeElement===m}function T(){S();}return {root:g,input:m,getValue:v,setValue:A,focus:x,blur:w,setDisabled:_,isFocused:k,destroy:T}}function Ie(e,t,n){return Math.min(n,Math.max(t,e))}function Sr({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1));let s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=a,c=i;break;case 1:s=i,c=a;break;case 2:c=a,d=i;break;case 3:c=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}const u=n-a,p=Math.round((s+u)*255),f=Math.round((c+u)*255),g=Math.round((d+u)*255);return {r:Ie(p,0,255),g:Ie(f,0,255),b:Ie(g,0,255),a:Ie(r,0,1)}}function Qd({r:e,g:t,b:n,a:r}){const o=Ie(e,0,255)/255,a=Ie(t,0,255)/255,i=Ie(n,0,255)/255,s=Math.max(o,a,i),c=Math.min(o,a,i),d=s-c;let l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);const u=s===0?0:d/s;return {h:l,s:u,v:s,a:Ie(r,0,1)}}function Ns({r:e,g:t,b:n}){const r=o=>Ie(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function Am({r:e,g:t,b:n,a:r}){const o=Ie(Math.round(r*255),0,255);return `${Ns({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function dr({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Cn(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return {r,g:o,b:a,a:n/255}}function ji(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Cn(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,a,i,s].some(c=>Number.isNaN(c))?null:{r:o,g:a,b:i,a:s}}return null}function Tm(e,t){const n=ji(e)??Cn(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Ie(t,0,1)),Qd(n)}function Pm(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Im(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Vt(e){const t=Sr(e),n=Sr({...e,a:1});return {hsva:{...e},hex:Ns(n),hexa:Am(t),rgba:dr(t),alpha:e.a}}function Em(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=false,detectMobile:i,onInput:s,onChange:c}=e,l=i?i():Ke.detect().platform==="mobile";let u=Tm(r,o);const p=He({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=h("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const b=p.querySelector(".card-toggle");!l&&b&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click();});const y=p.querySelector(".card-collapse");let C=null,S=null,v=null,A=null,x=null,w=null,_=null,k=null,T=null,E="hex";function B(N){const D=Vt(u);N==="input"?s?.(D):c?.(D);}function Y(){const N=Vt(u);if(m.style.setProperty("--cp-preview-color",N.rgba),m.setAttribute("aria-label",`${n}: ${N.hexa}`),!l&&C&&S&&v&&A&&x&&w&&_){const D=Sr({...u,s:1,v:1,a:1}),G=dr(D);C.style.setProperty("--cp-palette-hue",G),S.style.left=`${u.s*100}%`,S.style.top=`${(1-u.v)*100}%`,v.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${dr({...D,a:1})} 0%, ${dr({...D,a:0})} 100%)`),A.style.top=`${(1-u.a)*100}%`,x.style.setProperty("--cp-hue-color",dr(Sr({...u,v:1,s:1,a:1}))),w.style.left=`${u.h/360*100}%`;const $=u.a===1?N.hex:N.hexa,I=N.rgba,O=E==="hex"?$:I;_!==document.activeElement&&(_.value=O),_.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),_.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?_.maxLength=9:_.removeAttribute("maxLength"),_.dataset.mode=E,k&&(k.textContent=E.toUpperCase(),k.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),k.setAttribute("aria-pressed",E==="rgba"?"true":"false"),k.classList.toggle("is-alt",E==="rgba"));}T&&T!==document.activeElement&&(T.value=N.hex);}function H(N,D=null){u={h:(N.h%360+360)%360,s:Ie(N.s,0,1),v:Ie(N.v,0,1),a:Ie(N.a,0,1)},Y(),D&&B(D);}function q(N,D=null){H(Qd(N),D);}function j(N,D,G){N.addEventListener("pointerdown",$=>{$.preventDefault();const I=$.pointerId,O=U=>{U.pointerId===I&&D(U);},F=U=>{U.pointerId===I&&(document.removeEventListener("pointermove",O),document.removeEventListener("pointerup",F),document.removeEventListener("pointercancel",F),G?.(U));};D($),document.addEventListener("pointermove",O),document.addEventListener("pointerup",F),document.addEventListener("pointercancel",F);});}if(!l&&y){const N=y.querySelector(".card-body");if(N){N.classList.add("color-picker__body"),S=h("div",{className:"color-picker__palette-cursor"}),C=h("div",{className:"color-picker__palette"},S),A=h("div",{className:"color-picker__alpha-thumb"}),v=h("div",{className:"color-picker__alpha"},A),w=h("div",{className:"color-picker__hue-thumb"}),x=h("div",{className:"color-picker__hue"},w);const D=h("div",{className:"color-picker__main"},C,v),G=h("div",{className:"color-picker__hue-row"},x),$=Fs({blockGameKeys:true});_=$.input,_.classList.add("color-picker__hex-input"),_.value="",_.maxLength=9,_.spellcheck=false,_.inputMode="text",_.setAttribute("aria-label",`Hex code for ${n}`),k=h("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),$.root.classList.add("color-picker__hex-wrap");const I=h("div",{className:"color-picker__hex-row"},k,$.root);N.replaceChildren(D,G,I),j(C,F=>{if(!C||!S)return;const U=C.getBoundingClientRect(),he=Ie((F.clientX-U.left)/U.width,0,1),Z=Ie((F.clientY-U.top)/U.height,0,1);H({...u,s:he,v:1-Z},"input");},()=>B("change")),j(v,F=>{if(!v)return;const U=v.getBoundingClientRect(),he=Ie((F.clientY-U.top)/U.height,0,1);H({...u,a:1-he},"input");},()=>B("change")),j(x,F=>{if(!x)return;const U=x.getBoundingClientRect(),he=Ie((F.clientX-U.left)/U.width,0,1);H({...u,h:he*360},"input");},()=>B("change")),k.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",_){const F=Vt(u);_.value=E==="hex"?u.a===1?F.hex:F.hexa:F.rgba;}Y(),_?.focus(),_?.select();}),_.addEventListener("input",()=>{if(E==="hex"){const F=Pm(_.value);if(F!==_.value){const U=_.selectionStart??F.length;_.value=F,_.setSelectionRange(U,U);}}});const O=()=>{const F=_.value;if(E==="hex"){const U=Cn(F);if(!U){_.value=u.a===1?Vt(u).hex:Vt(u).hexa;return}const he=F.startsWith("#")?F.slice(1):F,Z=he.length===4||he.length===8;U.a=Z?U.a:u.a,q(U,"change");}else {const U=Im(F),he=ji(U);if(!he){_.value=Vt(u).rgba;return}q(he,"change");}};_.addEventListener("change",O),_.addEventListener("blur",O),_.addEventListener("keydown",F=>{F.key==="Enter"&&(O(),_.blur());});}}return l&&(y&&y.remove(),T=h("input",{className:"color-picker__native",type:"color",value:Ns(Sr({...u,a:1}))}),m.addEventListener("click",()=>T.click()),T.addEventListener("input",()=>{const N=Cn(T.value);N&&(N.a=u.a,q(N,"input"),B("change"));}),p.appendChild(T)),Y(),{root:p,isMobile:l,getValue:()=>Vt(u),setValue:(N,D)=>{const G=ji(N)??Cn(N)??Cn("#FFFFFF");G&&(typeof D=="number"&&(G.a=D),q(G,null));}}}const Mm=window;function Lm(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Mm}const Rm=Lm(),L=Rm;function Om(e){try{return !!e.isSecureContext}catch{return  false}}function $s(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Zd(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Fm(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Nm(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function $m(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Dm(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Om(L))return {ok:false,method:"clipboard-write"};if(!await Fm())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Bm(e,t){try{const n=t||$s(),r=Nm(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Gm(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=$m(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const a=Zd()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:a}}async function zm(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await Dm(n);if(r.ok)return r;const o=t.injectionRoot||$s(t.valueNode||void 0),a=Bm(n,o);if(a.ok)return a;const i=Gm(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Ke.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Hm(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";const i=$s(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);const s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const a=(t()??"").toString(),i=await zm(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copié"):i.method==="selection"&&r(i.hint||(Zd()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const Cr={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function jm(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let a=r,i=null,s=false;function c(l){const u=n[l]||n[a]||{};t.setAttribute("data-theme",l),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(i!==null&&clearTimeout(i),i=L.setTimeout(()=>{t.classList.remove("theme-anim"),i=null;},320)):s=true,a=l,o?.(l);}function d(){return a}return c(r),{applyTheme:c,getCurrentTheme:d}}const Ui={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,system:false}}};async function Um(){const e=await zn("tab-settings",{version:1,defaults:Ui,sanitize:o=>({ui:{expandedCards:sc(Ui.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const a=e.get();e.update({ui:{...a.ui,...o,expandedCards:sc(a.ui.expandedCards,o.expandedCards)}});}function n(o,a){const i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}});}function r(o){const a=e.get();n(o,!a.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}class Wm{constructor(){M(this,"injections",new Map);M(this,"state",{});M(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(o){console.error(`[InjectionRegistry] Failed to init ${t}:`,o);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const r=this.injections.get(t);if(!r){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?r.injection.init():r.injection.destroy(),console.log(`[InjectionRegistry] ${r.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const r=ve(n.storageKey,n.defaultEnabled??false);this.state[t]=r;}saveState(t){const n=this.injections.get(t);n&&we(n.storageKey,this.state[t]);}}let ai=null;function eu(){return ai||(ai=new Wm),ai}function tu(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Vm(){return Object.keys(Cr).map(e=>({value:e,label:tu(e)}))}const Xm=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function qm(e){return tu(e.replace(/^--/,""))}function Km(e){return e.alpha<1?e.rgba:e.hex}const Mt={pets:{enabled:true},journalChecker:{enabled:true},autoFavorite:{enabled:true},bulkFavorite:{enabled:false},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class Ym extends Ut{constructor(n){super({id:"tab-settings",label:"Settings"});M(this,"featureConfig",Mt);this.deps=n;}async build(n){const r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await Um();}catch{o={get:()=>Ui,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const a=o.get(),i=ve(Se.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(i);const s=Object.keys(Cr),c=this.deps.getCurrentTheme?.()??this.deps.initialTheme,d=s.includes(c)?c:s[0]??"dark";let l=d;const u=Vd({text:"Theme",tone:"muted",size:"lg"}),p=im({options:Vm(),value:d,onChange:C=>{l=C,this.deps.applyTheme(C),this.renderThemePickers(C,f,l);}}),f=h("div",{className:"settings-theme-grid"}),g=He({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:C=>o.setCardExpanded("style",C)},h("div",{className:"kv settings-theme-row"},u.root,p.root),f);this.renderThemePickers(d,f,l);const m=this.createHUDSectionsCard({defaultExpanded:!!a.ui.expandedCards.hudSections,onExpandChange:C=>o.setCardExpanded("hudSections",C)}),b=this.createEnhancementsCard({defaultExpanded:!!a.ui.expandedCards.enhancements,onExpandChange:C=>o.setCardExpanded("enhancements",C)}),y=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:C=>o.setCardExpanded("system",C)});r.appendChild(g),r.appendChild(m),r.appendChild(b),r.appendChild(y);}mergeFeatureConfig(n){return {pets:{...Mt.pets,...n.pets},journalChecker:{...Mt.journalChecker,...n.journalChecker},autoFavorite:{...Mt.autoFavorite,...n.autoFavorite},bulkFavorite:{...Mt.bulkFavorite,...n.bulkFavorite},cropSizeIndicator:{...Mt.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Mt.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Mt.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){we(Se.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const r=(o,a,i,s,c=false,d=false)=>{const l=h("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${c?"0":"12px"} 0 ${d?"0":"12px"} 0;
          ${d?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${a?"1":"0.5"};
        `}),u=h("div"),p=h("div",{style:"font-weight: 500; margin-bottom: 4px;"},o),f=h("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);u.append(p,f);const g=Fr({checked:a,onChange:m=>{l.style.opacity=m?"1":"0.5",i(m);}});return l.append(u,g.root),l};return He({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},h("div",{},r("Auto-Favorite",this.featureConfig.autoFavorite.enabled,o=>{this.featureConfig.autoFavorite.enabled=o,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),r("Journal Checker",this.featureConfig.journalChecker.enabled,o=>{this.featureConfig.journalChecker.enabled=o,this.saveFeatureConfig();},"Track collection completion progress"),r("Pets",this.featureConfig.pets.enabled,o=>{this.featureConfig.pets.enabled=o,this.saveFeatureConfig();},"Pet management and team tracking",false,true)))}createSectionRow(n,r,o,a,i=false,s=false){const c=h("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${i?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${r?"1":"0.5"};
      `}),d=h("div"),l=h("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),u=h("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},a);d.append(l,u);const p=Fr({checked:r,onChange:f=>{c.style.opacity=f?"1":"0.5",o(f);}});return c.append(d,p.root),c}createEnhancementsCard(n){const r=eu(),a=[...r.getAll()].sort((s,c)=>s.name.localeCompare(c.name)),i=a.map((s,c)=>{const d=c===0,l=c===a.length-1,u=r.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{r.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,d,l)});return He({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},h("div",{},...i))}renderThemePickers(n,r,o){const a=Cr[n];if(r.replaceChildren(),!!a)for(const i of Xm){const s=a[i];if(s==null)continue;const c=Em({label:qm(i),value:s,defaultExpanded:false,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(c.root);}}updateThemeVar(n,r,o,a){const i=Cr[n];i&&(i[r]=Km(o),a===n&&this.deps.applyTheme(n));}createEnvCard(n){const r=n?.defaultExpanded??false,o=n?.onExpandChange,a=(y,C)=>{const S=h("div",{className:"kv kv--inline-mobile"}),v=h("label",{},y),A=h("div",{className:"ro"});return typeof C=="string"?A.textContent=C:A.append(C),S.append(v,A),S},i=h("code",{},"—"),s=h("span",{},"—"),c=h("span",{},"—"),d=h("span",{},"—"),l=h("span",{},"—"),u=h("span",{},"—"),p=()=>{const y=Ke.detect();c.textContent=y.surface,d.textContent=y.platform,l.textContent=y.browser??"Unknown",u.textContent=y.os??"Unknown",i.textContent=y.host,s.textContent=y.isInIframe?"Yes":"No";},f=qe({label:"Copy JSON",variant:"primary",size:"sm"});Hm(f,()=>{const y=Ke.detect();return JSON.stringify(y,null,2)});const g=h("div",{style:"width:100%;display:flex;justify-content:center;"},f),m=He({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:r,onExpandChange:o},a("Surface",c),a("Platform",d),a("Browser",l),a("OS",u),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p();};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),m}}function Ds(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=true,zebra:i=true,animations:s=true,respectReducedMotion:c=true,compact:d=false,maxHeight:l,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:b=(V,ee)=>String(ee),onSortChange:y,onSelectionChange:C,onRowClick:S}=e;let v=n.slice(),A=r.slice(),x=r.slice(),w=null,_=null,k=1;const T=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,E=!!s&&!(c&&T),B=h("div",{className:"lg-table-wrap",id:t});if(l!=null){const V=typeof l=="number"?`${l}px`:l;B.style.setProperty("--tbl-max-h",V);}const Y=h("div",{className:"lg-table"}),H=h("div",{className:"lg-thead"}),q=h("div",{className:"lg-tbody"}),j=h("div",{className:"lg-tfoot"});a&&B.classList.add("sticky"),i&&B.classList.add("zebra"),d&&B.classList.add("compact"),u&&B.classList.add("selectable");const N=p==="switch"?"52px":"36px";B.style.setProperty("--check-w",N);function D(V){return V==="center"?"center":V==="right"?"flex-end":"flex-start"}function G(){const V=v.map(se=>{const pe=(se.width||"1fr").trim();return /\bfr$/.test(pe)?`minmax(0, ${pe})`:pe}),ee=(u?[N,...V]:V).join(" ");B.style.setProperty("--lg-cols",ee);}G();function $(){return o?Math.max(1,Math.ceil(A.length/o)):1}function I(){if(!o)return A;const V=(k-1)*o;return A.slice(V,V+o)}function O(){if(!w||!_)return;const V=v.find(pe=>String(pe.key)===w),ee=_==="asc"?1:-1,se=V?.sortFn?(pe,be)=>ee*V.sortFn(pe,be):(pe,be)=>{const oe=pe[w],ie=be[w];return oe==null&&ie==null?0:oe==null?-1*ee:ie==null?1*ee:typeof oe=="number"&&typeof ie=="number"?ee*(oe-ie):ee*String(oe).localeCompare(String(ie),void 0,{numeric:true,sensitivity:"base"})};A.sort(se);}const F=new Set(g);function U(){return Array.from(F)}const he=new Map;function Z(V){F.clear(),V.forEach(ee=>F.add(ee)),Ce(),he.forEach((ee,se)=>{ee.setChecked(F.has(se),true);}),Yn(),C?.(U());}function J(){F.clear(),Ce(),he.forEach(V=>V.setChecked(false,true)),Yn(),C?.(U());}let de=null;function Ce(){if(!de)return;const V=I();if(!V.length){de.indeterminate=false,de.checked=false;return}const ee=V.map((pe,be)=>b(pe,(k-1)*(o||0)+be)),se=ee.reduce((pe,be)=>pe+(F.has(be)?1:0),0);de.checked=se===ee.length,de.indeterminate=se>0&&se<ee.length;}function Ct(){const V=q.offsetWidth-q.clientWidth;H.style.paddingRight=V>0?`${V}px`:"0px";}function hn(){requestAnimationFrame(Ct);}const ni=new ResizeObserver(()=>Ct()),ec=()=>Ct();function Lg(){H.replaceChildren();const V=h("div",{className:"lg-tr lg-tr-head"});if(u){const ee=h("div",{className:"lg-th lg-th-check"});m||(de=h("input",{type:"checkbox"}),de.addEventListener("change",()=>{const se=I(),pe=de.checked;se.forEach((be,oe)=>{const ie=b(be,(k-1)*(o||0)+oe);pe?F.add(ie):F.delete(ie);}),C?.(U()),Yn();}),ee.appendChild(de)),V.appendChild(ee);}v.forEach(ee=>{const se=h("button",{className:"lg-th",type:"button",title:ee.title||ee.header});se.textContent=ee.header,ee.align&&se.style.setProperty("--col-justify",D(ee.align)),ee.sortable&&se.classList.add("sortable"),w===String(ee.key)&&_?se.setAttribute("data-sort",_):se.removeAttribute("data-sort"),ee.sortable&&se.addEventListener("click",()=>{const pe=String(ee.key);w!==pe?(w=pe,_="asc"):(_=_==="asc"?"desc":_==="desc"?null:"asc",_||(w=null,A=x.slice())),y?.(w,_),w&&_&&O(),go();}),V.appendChild(se);}),H.appendChild(V);try{ni.disconnect();}catch{}ni.observe(q),hn();}function ri(V){return Array.from(V.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function tc(V){return V.querySelector(".lg-td, .lg-td-check")}function nc(V){const ee=tc(V);return ee?ee.getBoundingClientRect():null}function Yn(){const V=I(),ee=new Map;Array.from(q.children).forEach(oe=>{const ie=oe,De=ie.getAttribute("data-id");if(!De)return;const Qe=nc(ie);Qe&&ee.set(De,Qe);});const se=new Map;Array.from(q.children).forEach(oe=>{const ie=oe,De=ie.getAttribute("data-id");De&&se.set(De,ie);});const pe=[];for(let oe=0;oe<V.length;oe++){const ie=V[oe],De=(o?(k-1)*o:0)+oe,Qe=b(ie,De);pe.push(Qe);let ke=se.get(Qe);ke||(ke=Rg(ie,De),E&&ri(ke).forEach(Jn=>{Jn.style.transform="translateY(6px)",Jn.style.opacity="0";})),q.appendChild(ke);}const be=[];if(se.forEach((oe,ie)=>{pe.includes(ie)||be.push(oe);}),!E){be.forEach(oe=>oe.remove()),Ce(),hn();return}pe.forEach(oe=>{const ie=q.querySelector(`.lg-tr-body[data-id="${oe}"]`);if(!ie)return;const De=nc(ie),Qe=ee.get(oe),ke=ri(ie);if(Qe&&De){const ht=Qe.left-De.left,bn=Qe.top-De.top;ke.forEach(Et=>{Et.style.transition="none",Et.style.transform=`translate(${ht}px, ${bn}px)`,Et.style.opacity="1";}),tc(ie)?.getBoundingClientRect(),ke.forEach(Et=>{Et.style.willChange="transform, opacity",Et.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ke.forEach(Et=>{Et.style.transform="translate(0,0)";});});}else ke.forEach(ht=>{ht.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ke.forEach(ht=>{ht.style.transform="translate(0,0)",ht.style.opacity="1";});});const oi=ht=>{(ht.propertyName==="transform"||ht.propertyName==="opacity")&&(ke.forEach(bn=>{bn.style.willChange="",bn.style.transition="",bn.style.transform="",bn.style.opacity="";}),ht.currentTarget.removeEventListener("transitionend",oi));},Jn=ke[0];Jn&&Jn.addEventListener("transitionend",oi);}),be.forEach(oe=>{const ie=ri(oe);ie.forEach(ke=>{ke.style.willChange="transform, opacity",ke.style.transition="transform .18s ease, opacity .18s ease",ke.style.opacity="0",ke.style.transform="translateY(-6px)";});const De=ke=>{ke.propertyName==="opacity"&&(ke.currentTarget.removeEventListener("transitionend",De),oe.remove());},Qe=ie[0];Qe?Qe.addEventListener("transitionend",De):oe.remove();}),Ce(),hn();}function Rg(V,ee){const se=b(V,ee),pe=h("div",{className:"lg-tr lg-tr-body","data-id":se});if(u){const be=h("div",{className:"lg-td lg-td-check"});if(p==="switch"){const oe=Fr({size:"sm",checked:F.has(se),onChange:ie=>{ie?F.add(se):F.delete(se),Ce(),C?.(U());}});he.set(se,oe),be.appendChild(oe.root);}else {const oe=h("input",{type:"checkbox",className:"lg-row-check"});oe.checked=F.has(se),oe.addEventListener("change",ie=>{ie.stopPropagation(),oe.checked?F.add(se):F.delete(se),Ce(),C?.(U());}),oe.addEventListener("click",ie=>ie.stopPropagation()),be.appendChild(oe);}pe.appendChild(be);}return v.forEach(be=>{const oe=h("div",{className:"lg-td"});be.align&&oe.style.setProperty("--col-justify",D(be.align));let ie=be.render?be.render(V,ee):String(V[be.key]??"");typeof ie=="string"?oe.textContent=ie:oe.appendChild(ie),pe.appendChild(oe);}),(S||u&&f)&&(pe.classList.add("clickable"),pe.addEventListener("click",be=>{if(!be.target.closest(".lg-td-check")){if(u&&f){const oe=!F.has(se);if(oe?F.add(se):F.delete(se),Ce(),p==="switch"){const ie=he.get(se);ie&&ie.setChecked(oe,true);}else {const ie=pe.querySelector(".lg-row-check");ie&&(ie.checked=oe);}C?.(U());}S?.(V,ee,be);}})),pe}function rc(){if(j.replaceChildren(),!o)return;const V=$(),ee=h("div",{className:"lg-pager"}),se=h("button",{className:"btn",type:"button"},"←"),pe=h("button",{className:"btn",type:"button"},"→"),be=h("span",{className:"lg-pager-info"},`${k} / ${V}`);se.disabled=k<=1,pe.disabled=k>=V,se.addEventListener("click",()=>fo(k-1)),pe.addEventListener("click",()=>fo(k+1)),ee.append(se,be,pe),j.appendChild(ee);}function fo(V){const ee=$();k=Math.min(Math.max(1,V),ee),Yn(),rc();}function go(){G(),Lg(),Yn(),rc();}function Og(V){x=V.slice(),A=V.slice(),w&&_&&O(),fo(1);}function Fg(V){v=V.slice(),go();}function Ng(V,ee="asc"){w=V,_=V?ee:null,w&&_?O():A=x.slice(),go();}function $g(){try{ni.disconnect();}catch{}window.removeEventListener("resize",ec);}return Y.append(H,q,j),B.appendChild(Y),window.addEventListener("resize",ec),go(),{root:B,setData:Og,setColumns:Fg,sortBy:Ng,getSelection:U,setSelection:Z,clearSelection:J,setPage:fo,getState:()=>({page:k,pageCount:$(),sortKey:w,sortDir:_}),destroy:$g}}let ga=false;const ur=new Set;function Jm(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const rt=e=>{const t=Jm();if(t){for(const n of ur)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Qm(){ga||(ga=true,window.addEventListener("keydown",rt,true),window.addEventListener("keypress",rt,true),window.addEventListener("keyup",rt,true),document.addEventListener("keydown",rt,true),document.addEventListener("keypress",rt,true),document.addEventListener("keyup",rt,true));}function Zm(){ga&&(ga=false,window.removeEventListener("keydown",rt,true),window.removeEventListener("keypress",rt,true),window.removeEventListener("keyup",rt,true),document.removeEventListener("keydown",rt,true),document.removeEventListener("keypress",rt,true),document.removeEventListener("keyup",rt,true));}function eh(e){return ur.size===0&&Qm(),ur.add(e),()=>{ur.delete(e),ur.size===0&&Zm();}}function yo(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function th(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Bs(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:a=false,autoFocus:i=false,onChange:s,onSearch:c,autoSearch:d=false,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:b,submitLabel:y,loading:C=false,blockGameKeys:S=true}=e,v=h("div",{className:"search"+(o?` search--${o}`:""),id:t}),A=h("span",{className:"search-ico search-ico--left"});if(p){const J=yo(p);J&&A.appendChild(J);}else A.textContent="🔎",A.style.opacity=".9";const x=h("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":b||n}),w=h("span",{className:"search-ico search-ico--right"});if(f){const J=yo(f);J&&w.appendChild(J);}const _=th();_.classList.add("search-spinner");const k=g?h("button",{className:"search-clear",type:"button",title:m},"×"):null,T=y!=null?h("button",{className:"btn search-submit",type:"button"},y):null,E=h("div",{className:"search-field"},A,x,w,_,...k?[k]:[]);v.append(E,...T?[T]:[]);let B=!!a,Y=null;function H(J){_.style.display=J?"inline-block":"none",v.classList.toggle("is-loading",J);}function q(){Y!=null&&(window.clearTimeout(Y),Y=null);}function j(J){q(),l>0?Y=window.setTimeout(()=>{Y=null,J();},l):J();}function N(){s?.(x.value),d&&c&&c(x.value);}x.addEventListener("input",()=>{j(N);}),x.addEventListener("keydown",J=>{J.key==="Enter"?(J.preventDefault(),q(),c?.(x.value)):J.key==="Escape"&&(x.value.length>0?$("",{notify:true}):x.blur());}),k&&k.addEventListener("click",()=>$("",{notify:true})),T&&T.addEventListener("click",()=>c?.(x.value));let D=()=>{};if(S&&(D=eh(x)),u){const J=de=>{if(de.key===u&&!de.ctrlKey&&!de.metaKey&&!de.altKey){const Ce=document.activeElement;Ce&&(Ce.tagName==="INPUT"||Ce.tagName==="TEXTAREA"||Ce.isContentEditable)||(de.preventDefault(),x.focus());}};window.addEventListener("keydown",J,true),v.__cleanup=()=>{window.removeEventListener("keydown",J,true),D();};}else v.__cleanup=()=>{D();};function G(J){B=!!J,x.disabled=B,k&&(k.disabled=B),T&&(T.disabled=B),v.classList.toggle("disabled",B);}function $(J,de={}){const Ce=x.value;x.value=J??"",de.notify&&Ce!==J&&j(N);}function I(){return x.value}function O(){x.focus();}function F(){x.blur();}function U(J){x.placeholder=J;}function he(J){$("",J);}return G(B),H(C),i&&O(),{root:v,input:x,getValue:I,setValue:$,focus:O,blur:F,setDisabled:G,setPlaceholder:U,clear:he,setLoading:H,setIconLeft(J){A.replaceChildren();const de=yo(J??"🔎");de&&A.appendChild(de);},setIconRight(J){w.replaceChildren();const de=yo(J??"");de&&w.appendChild(de);}}}const Ia=e=>new Promise(t=>setTimeout(t,e)),pt=e=>{try{return e()}catch{return}},wt=(e,t,n)=>Math.max(t,Math.min(n,e)),nh=e=>wt(e,0,1);async function lc(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,Ia(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}let Gs=null;function nu(){return Gs}function rh(e){Gs=e;}function ru(){return Gs!==null}const oh=/\/(?:r\/\d+\/)?version\/([^/]+)/,ah=15e3,ih=50;function sh(){return L?.document??(typeof document<"u"?document:null)}function zs(e={}){if(ru())return;const t=e.doc??sh();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const a=n.item(r)?.src;if(!a)continue;const i=a.match(oh);if(i?.[1]){rh(i[1]);return}}}function lh(){return zs(),nu()}function ch(){return ru()}async function dh(e={}){const t=e.timeoutMs??ah,n=performance.now();for(;performance.now()-n<t;){zs();const r=nu();if(r)return r;await Ia(ih);}throw new Error("MGVersion timeout (gameVersion not found)")}const Hs={init:zs,isReady:ch,get:lh,wait:dh},uh=L?.location?.origin||"https://magicgarden.gg";function ou(){return typeof GM_xmlhttpRequest=="function"}function au(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function js(e){if(ou())return JSON.parse((await au(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function iu(e){if(ou())return (await au(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function ph(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=L?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a);},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},a.src=r;})}const At=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),fh=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",cc=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):fh(e)+String(t||"");let Us=null,su=null;function gh(){return Us}function mh(){return su}function hh(e){Us=e;}function bh(e){su=e;}function lu(){return Us!==null}const xh=15e3;async function yh(e={}){lu()||await Ws(e);}async function Ws(e={}){const t=gh();if(t)return t;const n=mh();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Hs.wait({timeoutMs:xh}),a=`${uh}/version/${o}/assets/`;return hh(a),a})();return bh(r),r}async function vh(e){const t=await Ws();return At(t,e)}function wh(){return lu()}const pn={init:yh,isReady:wh,base:Ws,url:vh},cu=new Map;function Sh(e){return cu.get(e)}function Ch(e,t){cu.set(e,t);}const du="manifest.json";let Wi=null;async function kh(){Wi||(Wi=await uu());}function _h(){return Wi!==null}async function uu(e={}){const t=e.baseUrl??await pn.base(),n=Sh(t);if(n)return n;const r=js(At(t,du));return Ch(t,r),r}function Ah(e,t){return e.bundles.find(n=>n.name===t)??null}function Th(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==du&&t.add(r);return Array.from(t)}const Tt={init:kh,isReady:_h,load:uu,getBundle:Ah,listJsonFromBundle:Th},Ph=L,ut=Ph.Object??Object,Ea=ut.keys,ma=ut.values,ha=ut.entries,dc=new WeakSet;function Ih(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const Q=Ih(),Xt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Eh=["Rain","Frost","Dawn","AmberMoon"],uc=/main-[^/]+\.js(\?|$)/,Mh=6,Lh=150,Rh=2e3,Oh=200,Fh=50,Nh=10,$h=1e3,Vi="ProduceScaleBoost",qt=(e,t)=>t.every(n=>e.includes(n));function Kt(e,t){Q.data[e]==null&&(Q.data[e]=t,ba()&&gu());}function ba(){return Object.values(Q.data).every(e=>e!=null)}function pu(e,t){if(!e||typeof e!="object"||dc.has(e))return;dc.add(e);let n;try{n=Ea(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!Q.data.items&&qt(n,Xt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Kt("items",r)),!Q.data.decor&&qt(n,Xt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Kt("decor",r)),!Q.data.mutations&&qt(n,Xt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&Kt("mutations",r)),!Q.data.eggs&&qt(n,Xt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&Kt("eggs",r)),!Q.data.pets&&qt(n,Xt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&Kt("pets",r)),!Q.data.abilities&&qt(n,Xt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&Kt("abilities",r)),!Q.data.plants&&qt(n,Xt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&Kt("plants",r)),!(t>=Mh))for(const a of n){let i;try{i=r[a];}catch{continue}i&&typeof i=="object"&&pu(i,t+1);}}function Zo(e){try{pu(e,0);}catch{}}function fu(){if(!Q.isHookInstalled){if(ut.__MG_HOOKED__){Q.isHookInstalled=true;return}ut.__MG_HOOKED__=true,Q.isHookInstalled=true;try{ut.keys=function(t){return Zo(t),Ea.apply(this,arguments)},ma&&(ut.values=function(t){return Zo(t),ma.apply(this,arguments)}),ha&&(ut.entries=function(t){return Zo(t),ha.apply(this,arguments)});}catch{}}}function gu(){if(Q.isHookInstalled){try{ut.keys=Ea,ma&&(ut.values=ma),ha&&(ut.entries=ha);}catch{}Q.isHookInstalled=false;}}function Dh(){if(Q.scanInterval||ba())return;const e=()=>{if(ba()||Q.scanAttempts>Lh){mu();return}Q.scanAttempts++;try{Ea(L).forEach(t=>{try{Zo(L[t]);}catch{}});}catch{}};e(),Q.scanInterval=setInterval(e,Rh);}function mu(){Q.scanInterval&&(clearInterval(Q.scanInterval),Q.scanInterval=null);}const pc=L;function Bh(){try{for(const e of pc.document?.scripts||[]){const t=e?.src?String(e.src):"";if(uc.test(t))return t}}catch{}try{for(const e of pc.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(uc.test(t))return t}}catch{}return null}function Gh(e,t){const n=[];let r=e.indexOf(t);for(;r!==-1;)n.push(r),r=e.indexOf(t,r+t.length);return n}function Vs(e,t){let n=0,r="",o=false;for(let a=t;a<e.length;a++){const i=e[a];if(r){if(o){o=false;continue}if(i==="\\"){o=true;continue}i===r&&(r="");continue}if(i==='"'||i==="'"||i==="`"){r=i;continue}if(i==="{")n++;else if(i==="}"&&--n===0)return e.slice(t,a+1)}return null}function zh(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);return o<0||o>t?null:Vs(e,o)}let ii=null,Qn=null;async function hu(){return ii||Qn||(Qn=(async()=>{const e=Bh();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return ii=n,n}catch{return null}finally{Qn=null;}})(),Qn)}function Hh(e){const t={};let n=false;for(const r of Eh){const o=e?.[r];if(!o||typeof o!="object")continue;const a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function jh(){if(Q.data.weather)return  true;const e=await hu();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=zh(e,t);if(!n)return  false;const r=n.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let o;try{o=Function('"use strict";return('+r+")")();}catch{return  false}const a=Hh(o);return a?(Q.data.weather=a,true):false}function Uh(){if(Q.weatherPollingTimer)return;Q.weatherPollAttempts=0;const e=setInterval(async()=>{(await jh()||++Q.weatherPollAttempts>Oh)&&(clearInterval(e),Q.weatherPollingTimer=null);},Fh);Q.weatherPollingTimer=e;}function Wh(){Q.weatherPollingTimer&&(clearInterval(Q.weatherPollingTimer),Q.weatherPollingTimer=null);}const Vh={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function Xh(e){const t=Gh(e,Vi);if(!t.length)return null;for(const n of t){const r=Math.max(0,n-4e3),o=Math.min(e.length,n+4e3),i=e.slice(r,o).lastIndexOf("switch(");if(i===-1)continue;const s=r+i,c=e.indexOf("{",s);if(c===-1)continue;const d=Vs(e,c);if(d&&d.includes(Vi)&&(d.includes('bg:"')||d.includes("bg:'")))return d}return null}function qh(e){const t={},n=[],r=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,o=(i,s)=>{const c=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),d=i.match(c);return d?d[2]:null};let a;for(;(a=r.exec(e))!==null;){if(a[2]){n.push(a[2]);continue}const i=a[0];if(i.startsWith("default")){n.length=0;continue}if(!i.startsWith("return"))continue;const s=e.indexOf("{",a.index);if(s===-1){n.length=0;continue}const c=Vs(e,s);if(!c){n.length=0;continue}const d=o(c,"bg");if(!d){n.length=0;continue}const l=o(c,"hover")||d;for(const u of n)t[u]||(t[u]={bg:d,hover:l});n.length=0;}return Object.keys(t).length?t:null}async function Kh(){const e=await hu();if(!e)return null;const t=Xh(e);return t?qh(t):null}function Yh(e){const t=e[Vi];return t!=null&&typeof t=="object"&&"color"in t}async function Jh(){if(!Q.data.abilities)return  false;const e=Q.data.abilities;if(Yh(e))return  true;const t=await Kh();if(!t)return  false;const n={};for(const[r,o]of Object.entries(e)){const a=t[r]||Vh;n[r]={...o,color:{bg:a.bg,hover:a.hover}};}return Q.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function Qh(){if(Q.colorPollingTimer)return;Q.colorPollAttempts=0;const e=setInterval(async()=>{(await Jh()||++Q.colorPollAttempts>Nh)&&(clearInterval(e),Q.colorPollingTimer=null);},$h);Q.colorPollingTimer=e;}function Zh(){Q.colorPollingTimer&&(clearInterval(Q.colorPollingTimer),Q.colorPollingTimer=null);}function eb(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function tb(){return {lru:new Map,cost:0,srcCanvas:new Map}}function nb(){return {cache:new Map,maxEntries:200}}const rb={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},ob={enabled:true,maxEntries:200},Fe=eb(),ab=tb(),ib={...rb},sb=nb(),lb={...ob};function je(){return Fe}function Dn(){return ab}function Nr(){return ib}function $r(){return sb}function Xi(){return lb}function bu(){return Fe.ready}const fc=Function.prototype.bind,fe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let xu,yu,vu;const cb=new Promise(e=>{xu=e;}),db=new Promise(e=>{yu=e;}),ub=new Promise(e=>{vu=e;});function pb(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function fb(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function gb(e){fe.engine=e,fe.tos=fb(e)||null,fe.app=e.app||null,fe.renderer=e.app?.renderer||null,fe.ticker=e.app?.ticker||null,fe.stage=e.app?.stage||null;try{xu(e);}catch{}try{fe.app&&yu(fe.app);}catch{}try{fe.renderer&&vu(fe.renderer);}catch{}}function Xs(){return fe.engine?true:(fe._bindPatched||(fe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=fc.call(this,e,...t);try{!fe.engine&&pb(e)&&(Function.prototype.bind=fc,fe._bindPatched=!1,gb(e));}catch{}return n}),false)}Xs();async function mb(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(fe.engine)return  true;Xs(),await Ia(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function hb(e=15e3){return fe.engine||await mb(e),true}function bb(){return fe.engine&&fe.app?{ok:true,engine:fe.engine,tos:fe.tos,app:fe.app}:(Xs(),{ok:false,engine:fe.engine,tos:fe.tos,app:fe.app,note:"Not captured. Wait for room, or reload."})}const ot={engineReady:cb,appReady:db,rendererReady:ub,engine:()=>fe.engine,tos:()=>fe.tos,app:()=>fe.app,renderer:()=>fe.renderer,ticker:()=>fe.ticker,stage:()=>fe.stage,PIXI:()=>L.PIXI||null,init:hb,hook:bb,ready:()=>!!fe.engine};function xa(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Qr(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?xa(r):`sprite/${n}/${r}`}function Dr(e,t,n,r){const o=Qr(e,t);if(n.has(o)||r.has(o))return o;const a=String(t||"").trim();if(n.has(a)||r.has(a))return a;const i=xa(a);return n.has(i)||r.has(i)?i:o}function xb(e,t,n=25e3){const r=[e],o=new Set;let a=0;for(;r.length&&a++<n;){const i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;const s=i.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function yb(e){const t=L.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=xb(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function vb(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return yb(e)}catch{await Ia(50);}throw new Error("Constructors timeout")}const Yt=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function wb(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function si(e,t,n,r,o){return new e(t,n,r,o)}function Sb(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0);}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.();}catch{}return s}function Cb(e,t,n,r){const{Texture:o,Rectangle:a}=r;for(const[i,s]of Object.entries(e.frames)){const c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,f=si(a,c.x,c.y,u,p),g=s.sourceSize||{w:c.w,h:c.h},m=si(a,0,0,g.w,g.h);let b=null;if(s.trimmed&&s.spriteSourceSize){const y=s.spriteSourceSize;b=si(a,y.x,y.y,y.w,y.h);}n.set(i,Sb(o,t,f,m,b,l,s.anchor||null));}}function kb(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a);}}function _b(e,t){const n=(r,o)=>{const a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function Ab(e,t){const n=await Tt.load({baseUrl:e}),r=Tt.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=Tt.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,c=new Map;async function d(l){if(a.has(l))return;a.add(l);const u=await js(At(e,l));if(!wb(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const b of p)await d(cc(l,b));const f=cc(l,u.meta.image),g=await ph(await iu(At(e,f))),m=t.Texture.from(g);Cb(u,m,i,t),kb(u,i,s),_b(u,c);}for(const l of o)await d(l);return {textures:i,animations:s,categoryIndex:c}}let vo=null;async function Tb(){return Fe.ready?true:vo||(vo=(async()=>{const e=performance.now();Yt("init start");const t=await lc(ot.appReady,15e3,"PIXI app");Yt("app ready");const n=await lc(ot.rendererReady,15e3,"PIXI renderer");Yt("renderer ready"),Fe.app=t,Fe.renderer=n||t?.renderer||null,Fe.ctors=await vb(t),Yt("constructors resolved"),Fe.baseUrl=await pn.base(),Yt("base url",Fe.baseUrl);const{textures:r,animations:o,categoryIndex:a}=await Ab(Fe.baseUrl,Fe.ctors);return Fe.textures=r,Fe.animations=o,Fe.categoryIndex=a,Yt("atlases loaded","textures",Fe.textures.size,"animations",Fe.animations.size,"categories",Fe.categoryIndex?.size??0),Fe.ready=true,Yt("ready in",Math.round(performance.now()-e),"ms"),true})(),vo)}const Bn={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},wu=Object.keys(Bn),Pb=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],gc=new Map(Pb.map((e,t)=>[e,t]));function ya(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(gc.get(n)??1/0)-(gc.get(r)??1/0))}const Ib=["Wet","Chilled","Frozen"],Eb=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Mb={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Lb={Pepper:.5,Banana:.6},Rb=256,Ob=.5,Fb=2;function Su(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=ya(e),n=Nb(e),r=$b(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function Nb(e){const t=e.filter((o,a,i)=>Bn[o]&&i.indexOf(o)===a);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?ya(t.filter(o=>!Ib.includes(o))):ya(t)}function $b(e){const t=e.filter((n,r,o)=>Bn[n]?.overlayTall&&o.indexOf(n)===r);return ya(t)}function li(e,t){return e.map(n=>({name:n,meta:Bn[n],overlayTall:Bn[n]?.overlayTall??null,isTall:t}))}const Db={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},wo=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function Bb(e){return wo.has(e)?e:wo.has("overlay")?"overlay":wo.has("screen")?"screen":wo.has("lighter")?"lighter":"source-atop"}function Gb(e,t,n,r,o=false){const a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}const c=Math.cos(a),d=Math.sin(a),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-c*l,s-d*l,i+c*l,s+d*l)}function mc(e,t,n,r,o=false){const a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?Gb(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,c)=>i.addColorStop(c/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n);}function zb(e,t,n,r){const o=Db[n];if(!o)return;const a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);const i=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const d=a.masked?Bb(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const u=l.getContext("2d");u.imageSmoothingEnabled=false,mc(u,s,c,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0);}else mc(e,s,c,a,i);e.restore();}function Hb(e){return /tallplant/i.test(e)}function qs(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Cu(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function jb(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const i=t.get(r);if(i)return {tex:i,key:r}}}return null}function Ub(e,t,n,r){if(!t)return null;const o=qs(e),a=Cu(t);for(const i of a){const s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(const c of s){const d=n.get(c);if(d)return {tex:d,key:c}}{const c=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(c);if(d)return {tex:d,key:c};const l=`sprite/mutation-overlay/${i}`,u=n.get(l);if(u)return {tex:u,key:l};const p=jb(t,n);if(p)return p}}return null}function Wb(e,t,n,r){if(!t)return null;const o=Bn[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const a=qs(e),i=Cu(t);for(const s of i){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(const d of c){const l=r.get(d);if(l)return l}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function Vb(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0;let s=Lb[t]??a;const c=o>r*1.5;let d=Mb[t]??(c?i:.4);const l={x:(s-a)*r,y:(d-i)*o},u=Math.min(r,o),p=Math.min(1.5,u/Rb);let f=Ob*p;return n&&(f*=Fb),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:f}}function ku(e,t){return `${t.sig}::${e}`}function _u(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Xb(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function qb(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-_u(r??null));}}function Au(e,t){const n=e.lru.get(t);return n?(Xb(e,t,n),n):null}function Tu(e,t,n,r){e.lru.set(t,n),e.cost+=_u(n),qb(e,r);}function Kb(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Yb(e,t){return e.srcCanvas.get(t)??null}function Jb(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function Ma(e,t,n,r,o){const a=Yb(r,e);if(a)return a;let i=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),d=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const l=Math.round(d.width/s),u=Math.round(d.height/s);i=document.createElement("canvas"),i.width=l,i.height=u;const p=i.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,l,u));}else i=d;}}catch{}if(!i){const c=e?.frame||e?._frame,d=e?.orig||e?._orig,l=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");i=document.createElement("canvas");const f=Math.max(1,(d?.width??c.width)|0),g=Math.max(1,(d?.height??c.height)|0),m=l?.x??0,b=l?.y??0;i.width=f,i.height=g;const y=i.getContext("2d");y.imageSmoothingEnabled=false,u===true||u===2||u===8?(y.save(),y.translate(m+c.height/2,b+c.width/2),y.rotate(-Math.PI/2),y.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),y.restore()):y.drawImage(p,c.x,c.y,c.width,c.height,m,b,c.width,c.height);}return Jb(r,e,i,o),i}function Qb(e,t,n,r,o,a,i,s){const{w:c,h:d,aX:l,aY:u,basePos:p}=t,f=[];for(const g of n){const m=new r.Sprite(e);m.anchor?.set?.(l,u),m.position.set(p.x,p.y),m.zIndex=1;const b=document.createElement("canvas");b.width=c,b.height=d;const y=b.getContext("2d");y.imageSmoothingEnabled=false,y.save(),y.translate(c*l,d*u),y.drawImage(Ma(e,o,r,a,i),-c*l,-d*u),y.restore(),zb(y,b,g.name,g.isTall);const C=r.Texture.from(b,{resolution:e.resolution??1});s.push(C),m.texture=C,f.push(m);}return f}function Zb(e,t,n,r,o,a,i,s,c,d){const{aX:l,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||Ub(e,f.name,r);if(!g?.tex)continue;const m=Ma(g.tex,a,o,i,s);if(!m)continue;const b=m.width,y={x:0,y:0},C={x:u.x-l*b,y:0},S=document.createElement("canvas");S.width=b,S.height=m.height;const v=S.getContext("2d");if(!v)continue;v.imageSmoothingEnabled=false,v.drawImage(m,0,0),v.globalCompositeOperation="destination-in",v.drawImage(c,-C.x,-0);const A=o.Texture.from(S,{resolution:g.tex.resolution??1});d.push(A);const x=new o.Sprite(A);x.anchor?.set?.(y.x,y.y),x.position.set(C.x,C.y),x.scale.set(1),x.alpha=1,x.zIndex=3,p.push(x);}return p}function ex(e,t,n,r,o,a){const{basePos:i}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const d=Wb(e,c.name,c.isTall,r);if(!d)continue;const l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),c.isTall&&(l.zIndex=-1),Eb.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function Pu(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=Ma(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new a(e);g.anchor?.set?.(d,l),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const m=Hb(t),b=li(n.muts,m),y=li(n.overlayMuts,m),C=li(n.selectedMuts,m),S=[],v={w:s,h:c,aX:d,aY:l,basePos:u},A=qs(t),x=Vb(e,A,m);Qb(e,v,b,r.ctors,r.renderer,r.cacheState,r.cacheConfig,S).forEach(H=>f.addChild(H)),m&&Zb(t,v,y,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,S).forEach(q=>f.addChild(q)),ex(t,v,C,r.textures,r.ctors,x).forEach(H=>f.addChild(H));let k={x:0,y:0,width:s,height:c};try{const H=f.getLocalBounds?.()||f.getBounds?.(!0);H&&Number.isFinite(H.width)&&Number.isFinite(H.height)&&(k={x:H.x,y:H.y,width:H.width,height:H.height});}catch{}const{Rectangle:T}=r.ctors,E=T?new T(0,0,s,c):void 0;let B=null;if(typeof r.renderer.generateTexture=="function"?B=r.renderer.generateTexture(f,{resolution:1,region:E}):r.renderer.textureGenerator?.generateTexture&&(B=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:E})),!B)throw new Error("no render texture");const Y=B instanceof i?B:i.from(r.renderer.extract.canvas(B));try{Y.__mg_base={baseX:-k.x,baseY:-k.y,baseW:s,baseH:c,texW:k.width,texH:k.height};}catch{}B&&B!==Y&&B.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{Y.__mg_gen=!0,Y.label=`${t}|${n.sig}`;}catch{}return Y}catch{return null}}function tx(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const a of e){const i=Pu(a,t,n,r);i&&o.push(i);}return o.length>=2?o:null}function Iu(e,t,n,r,o){const a=t.scale??1,i=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${a}|f${i}|m${s}|ax${c}|ay${d}|bm${n}|bp${o}|p${r}`}function nx(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function rx(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(const[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function hc(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function ox(e){e.cache.clear();}function ax(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function ix(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function sx(e,t,n,r,o,a,i,s=5,c=0){if(!t.ready||!a.enabled)return 0;const d=e.length;let l=0;i?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=Dr(null,f,t.textures,t.animations),m={scale:1},b=Mu(m),y=Lu(b,m),C=Ou(b,m.boundsPadding),S=Iu(g,m,b,y,C);o.cache.has(S)||qi(t,n,r,null,f,m,o,a),l++;}catch{l++;}i?.(l,d),u+s<d&&await ix();}return l}function lx(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function cx(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Ks(e,t,n,r,o,a){if(!n.length)return t;const i=Su(n);if(!i.sig)return t;const s=ku(e,i),c=Au(o,s);if(c?.tex)return c.tex;const d=Pu(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(Tu(o,s,{isAnim:false,tex:d},a),d):t}function Eu(e,t,n,r,o,a){if(!n.length)return t;const i=Su(n);if(!i.sig)return t;const s=ku(e,i),c=Au(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const d=tx(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(Tu(o,s,{isAnim:true,frames:d},a),d):t}function bc(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");const i=Dr(r,o,e.textures,e.animations),s=a.mutations||[],c=a.parent||cx(e)||lx(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2;let f;const g=e.animations.get(i);if(g&&g.length>=2){const y=Eu(i,g,s,e,t,n),C=e.ctors.AnimatedSprite;if(C)f=new C(y),f.animationSpeed=a.fps?a.fps/60:a.speed??.15,f.loop=a.loop??true,f.play();else {const S=new e.ctors.Sprite(y[0]),A=1e3/Math.max(1,a.fps||8);let x=0,w=0;const _=k=>{const T=e.app.ticker?.deltaMS??k*16.666666666666668;if(x+=T,x<A)return;const E=x/A|0;x%=A,w=(w+E)%y.length,S.texture=y[w];};S.__mgTick=_,e.app.ticker?.add?.(_),f=S;}}else {const y=e.textures.get(i);if(!y)throw new Error(`Unknown sprite/anim key: ${i}`);const C=Ks(i,y,s,e,t,n);f=new e.ctors.Sprite(C);}const m=a.anchorX??f.texture?.defaultAnchor?.x??.5,b=a.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,b),f.position.set(u,p),f.scale.set(a.scale??1),f.alpha=a.alpha??1,f.rotation=a.rotation??0,f.zIndex=a.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function dx(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const xc=new Map;function Mu(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function Lu(e,t){return e==="mutations"?t.pad??2:t.pad??0}function Zn(e){return Number.isFinite(e)?Math.max(0,e):0}function Ru(e){if(typeof e=="number"){const t=Zn(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Zn(e.top??0),right:Zn(e.right??0),bottom:Zn(e.bottom??0),left:Zn(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Ou(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Ru(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function Fu(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function Nu(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function ux(e,t,n,r,o,a){const i=`${e}|f${t}`,s=xc.get(i);if(s)return s;const c=Fu(n),d={top:0,right:0,bottom:0,left:0};for(const l of wu){const u=Ks(e,n,[l],r,o,a),p=Nu(u,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),b=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),m>d.right&&(d.right=m),b>d.bottom&&(d.bottom=b);}return xc.set(i,d),d}function qi(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=Dr(r,o,e.textures,e.animations),d=Mu(a),l=Lu(d,a),u=Ou(d,a.boundsPadding),p=i&&s?.enabled?Iu(c,a,d,l,u):null;if(p&&i&&s?.enabled){const S=nx(i,p);if(S)return hc(S)}const f=a.mutations||[],g=e.animations.get(c),m=Math.max(0,(a.frameIndex??0)|0);let b,y;if(g?.length)if(b=g[m%g.length],f.length){const S=Eu(c,g,f,e,t,n);y=S[m%S.length];}else y=b;else {const S=e.textures.get(c);if(!S)throw new Error(`Unknown sprite/anim key: ${c}`);b=S,y=Ks(c,S,f,e,t,n);}let C;if(d==="mutations"){const S=new e.ctors.Sprite(y),v=a.anchorX??S.texture?.defaultAnchor?.x??.5,A=a.anchorY??S.texture?.defaultAnchor?.y??.5;S.anchor?.set?.(v,A),S.scale.set(a.scale??1);const x=new e.ctors.Container;x.addChild(S);try{x.updateTransform?.();}catch{}const w=S.getBounds?.(true)||{x:0,y:0,width:S.width,height:S.height};S.position.set(-w.x+l,-w.y+l),C=dx(e,x);try{x.destroy?.({children:!0});}catch{}}else {const S=a.scale??1;let v=Ru(a.boundsPadding);d==="padded"&&a.boundsPadding==null&&(v=ux(c,m,b,e,t,n)),l&&(v={top:v.top+l,right:v.right+l,bottom:v.bottom+l,left:v.left+l});const A=Fu(b),x=Nu(y,A.w,A.h),w=Math.max(1,Math.ceil((A.w+v.left+v.right)*S)),_=Math.max(1,Math.ceil((A.h+v.top+v.bottom)*S));C=document.createElement("canvas"),C.width=w,C.height=_;const k=C.getContext("2d");if(k){k.imageSmoothingEnabled=false;const T=Ma(y,e.renderer,e.ctors,t,n),E=(v.left-x.baseX)*S,B=(v.top-x.baseY)*S;k.drawImage(T,E,B,T.width*S,T.height*S);}}return p&&i&&s?.enabled?(rx(i,s,p,C),hc(C)):C}function px(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function fx(e,t){return e.defaultParent=t,true}function gx(e,t){return e.defaultParent=t,true}function fn(){if(!bu())throw new Error("MGSprite not ready yet")}function mx(e,t,n){return typeof t=="string"?bc(je(),Dn(),Nr(),e,t,n||{}):bc(je(),Dn(),Nr(),null,e,t||{})}function hx(e,t,n){return typeof t=="string"?qi(je(),Dn(),Nr(),e,t,n||{},$r(),Xi()):qi(je(),Dn(),Nr(),null,e,t||{},$r(),Xi())}function bx(){px(je());}function xx(e){return fx(je(),e)}function yx(e){return gx(je(),e)}function vx(e,t){const n=je(),r=typeof t=="string"?Dr(e,t,n.textures,n.animations):Dr(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function wx(){fn();const e=je().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Sx(e){fn();const t=String(e||"").trim();if(!t)return [];const n=je().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Cx(e,t){fn();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=je().categoryIndex;if(!o)return  false;const a=n.toLowerCase(),i=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===a){for(const d of c.values())if(d.toLowerCase()===i)return  true}return  false}function kx(e){fn();const t=je().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,a]of t.entries())for(const i of a.values()){const s=Qr(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,a)=>o.localeCompare(a))}function _x(e){fn();const t=String(e||"").trim();if(!t)return null;const n=xa(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],a=r[2],i=je().categoryIndex,s=o.toLowerCase(),c=a.toLowerCase();let d=o,l=a;if(i){const u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=i.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:d,id:l,key:Qr(d,l)}}function Ax(e,t){fn();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=je().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(c.values()).find(l=>l.toLowerCase()===i)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Qr(s,d)}function Tx(){Kb(Dn());}function Px(){ox($r());}function Ix(){return ax($r())}function Ex(){return [...wu]}async function Mx(e,t,n=10,r=0){return fn(),sx(e,je(),Dn(),Nr(),$r(),Xi(),t,n,r)}const z={init:Tb,isReady:bu,show:mx,toCanvas:hx,clear:bx,attach:xx,attachProvider:yx,has:vx,key:(e,t)=>Qr(e,t),getCategories:wx,getCategoryId:Sx,hasId:Cx,listIds:kx,getIdInfo:_x,getIdPath:Ax,clearMutationCache:Tx,clearToCanvasCache:Px,getToCanvasCacheStats:Ix,getMutationNames:Ex,warmup:Mx};function Lx(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Rx(e,t=[]){const n=new Set,r=o=>{const a=String(o||"").trim();a&&n.add(a);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function $u(e,t,n,r=[],o=[]){if(!z)return console.warn("[MGData] MGSprite not available in pickSpriteId"),null;const a=Rx(e,r);if(!a.length)return null;const i=[t,...o].filter(l=>typeof l=="string"),s=l=>{const u=String(l||"").trim();if(!u)return null;for(const p of a)try{if(z.has(p,u))return z.getIdPath(p,u)}catch{}return null};for(const l of i){const u=s(l);if(u)return u}const c=Lx(n||""),d=s(c||n||"");if(d)return d;try{for(const l of a){const u=z.listIds(`sprite/${l}/`),p=i.map(g=>String(g||"").toLowerCase()),f=String(n||c||"").toLowerCase();for(const g of u){const b=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&y===b)||b===f)return g}for(const g of u){const b=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&(b.includes(y)||y.includes(b)))||f&&(b.includes(f)||f.includes(b)))return g}}}catch{}return null}function et(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;const i=e.tileRef;if(!i||typeof i!="object")return;const s=String(i.spritesheet||t||"").trim(),c=$u(s,n,r,o,a);if(c)try{e.spriteId=c;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const l of Object.values(d))et(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};et(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};et(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&et(e.activeState,s,n,e.activeState?.name||r);}function Ox(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],a=t.slice(1);return $u(e,o,n??null,r,a)}function Fx(e){for(const[t,n]of Object.entries(e.items||{}))et(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))et(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){et(n,"mutations",t,n?.name,["mutation"]);const r=Ox("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))et(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))et(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&et(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&et(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&et(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function Nx(){try{console.log("[MGData] Resolving sprites..."),Fx(Q.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Du=1e4,Bu=50;function Gu(e){return new Promise(t=>setTimeout(t,e))}function $x(e){return Q.data[e]}function Dx(){return {...Q.data}}function Bx(e){return Q.data[e]!=null}async function Gx(e,t=Du,n=Bu){const r=Date.now();for(;Date.now()-r<t;){const o=Q.data[e];if(o!=null)return o;await Gu(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function zx(e=Du,t=Bu){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Q.data).some(r=>r!=null))return {...Q.data};await Gu(t);}throw new Error("MGData.waitForAnyData: timeout")}const zu=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Hu(e){return zu.includes(e)}function ju(e){return e.filter(t=>Hu(t.action))}function yc(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function ci(e){return e?.name||e?.petSpecies||"Unknown Pet"}function Uu(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=ci(r.targetPet),a=r.hungerRestoreAmount||0,s=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${a} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",a=r.sellPrice||0;return `Ate ${o} for ${a} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=ci(r.targetPet),a=r.strengthIncrease||0;return `Boosted ${o}'s size by +${a.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=ci(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,a=r.petsAffected?.length||0;return `Gave +${o} XP to ${a} ${a===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,a=r.eggsAffected?.length||0,i=yc(o);return `Reduced ${a} ${a===1?"egg":"eggs"} growth by ${i}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,a=r.numPlantsAffected||0,i=yc(o);return `Reduced ${a} ${a===1?"plant":"plants"} growth by ${i}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,a=r.numPlantsAffected||0;return `Boosted ${a} ${a===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const X={async init(){fu(),Dh(),Uh(),Qh();},isReady:ba,get:$x,getAll:Dx,has:Bx,waitFor:Gx,waitForAny:zx,resolveSprites:Nx,cleanup(){gu(),mu(),Wh(),Zh();}},Hx=new Map;function jx(){return Hx}function Ki(){return L.jotaiAtomCache?.cache}function jt(e){const t=jx(),n=t.get(e);if(n)return n;const r=Ki();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Ux(){const e=L;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const a=n.get(r);a&&a.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const Wx={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Hn(){return Wx}const Vx="__JOTAI_STORE_READY__";let vc=false;const Yi=new Set;function So(){if(!vc){vc=true;for(const e of Yi)try{e();}catch{}try{const e=L.CustomEvent||CustomEvent;L.dispatchEvent?.(new e(Vx));}catch{}}}function Xx(e){Yi.add(e);const t=Qi();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Yi.delete(e);}}async function La(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Qi();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=false;const s=Xx(()=>{i||(i=true,s(),o());}),c=Date.now();(async()=>{for(;!i&&Date.now()-c<t;){const l=Qi();if(l.via&&!l.polyfill){if(i)return;i=true,s(),o();return}await Br(n);}i||(i=true,s(),a(new Error("Store not captured within timeout")));})();})}const Br=e=>new Promise(t=>setTimeout(t,e));function Wu(){try{const e=L.Event||Event;L.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Ji(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function di(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Ji(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const a=e[o];if(Ji(a))return a}catch{}return null}function Vu(){const e=Hn(),t=L.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const a of o){const i=new Set,s=[a.current];for(;s.length;){const c=s.pop();if(!(!c||i.has(c))){i.add(c);try{const d=c?.pendingProps?.value;if(Ji(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;const u=di(d);if(u)return e.lastCapturedVia="fiber",u;const p=di(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(c?.stateNode){const d=di(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Xu(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function qx(e=5e3){const t=Date.now();let n=Ki();for(;!n&&Date.now()-t<e;)await Br(100),n=Ki();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=Hn();let o=null,a=null;const i=[],s=()=>{for(const d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const l=d.write;d.__origWrite=l,d.write=function(u,p,...f){return a||(o=u,a=p,s()),l.call(this,u,p,...f)},i.push(d);}Wu();const c=Date.now();for(;!a&&Date.now()-c<e;)await Br(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Xu())}async function Kx(e=1e4){const t=Hn();Wu();const n=Date.now();for(;Date.now()-n<e;){const r=Vu();if(r)return r;await Br(50);}return t.lastCapturedVia="polyfill",Xu()}async function Ys(){const e=Hn();if(e.baseStore&&!e.baseStore.__polyfill)return So(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Br(25);if(e.baseStore)return e.baseStore.__polyfill||So(),e.baseStore}e.captureInProgress=true;try{const t=Vu();if(t)return e.baseStore=t,So(),t;try{const r=await qx(5e3);return e.baseStore=r,r.__polyfill||So(),r}catch(r){e.captureError=r;}const n=await Kx();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Qi(){const e=Hn();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Yx(){const e=await Ys(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:false,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0;}catch{}const i=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=a.last,d=!Object.is(s,c)||!a.has;if(a.last=s,a.has=true,d)for(const l of a.subs)try{l(s,c);}catch{}});return a.unsubUpstream=i,a};return {async get(o){const a=await n(o);if(a.has)return a.last;const i=e.get(o);return a.last=i,a.has=true,i},async set(o,a){await e.set(o,a);const i=await n(o);i.last=a,i.has=true;},async sub(o,a){const i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last);}catch{}return ()=>{i.subs.delete(a);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function ea(){const e=Hn();return e.mirror||(e.mirror=await Yx()),e.mirror}const ge={async select(e){const t=await ea(),n=jt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await ea(),r=jt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await ea(),r=jt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await ge.select(e);try{t(n);}catch{}return ge.subscribe(e,t)}};async function qu(){await ea();}const Zr=Object.freeze(Object.defineProperty({__proto__:null,Store:ge,prewarm:qu,waitForStore:La},Symbol.toStringTag,{value:"Module"}));function Js(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Gr(e,t){const n=Js(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Jx(e,t,n){const r=Js(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let a=o;for(let i=0;i<r.length-1;i++){const s=r[i],c=a[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};a[s]=d,a=d;}return a[r[r.length-1]]=n,o}function wc(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Gr(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Qx(e,t,n){const r=n.mode??"auto";function o(d){const l=t?Gr(d,t):d,u=new Map;if(l==null)return {signatures:u,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],b=n.key?n.key(m,g,d):g,y=n.sig?n.sig(m,g,d):n.fields?wc(m,n.fields):JSON.stringify(m);u.set(b,y);}else for(const[g,m]of Object.entries(l)){const b=n.key?n.key(m,g,d):g,y=n.sig?n.sig(m,g,d):n.fields?wc(m,n.fields):JSON.stringify(m);u.set(b,y);}return {signatures:u,keys:Array.from(u.keys())}}function a(d,l){if(d===l)return  true;if(!d||!l||d.size!==l.size)return  false;for(const[u,p]of d)if(l.get(u)!==p)return  false;return  true}async function i(d){let l=null;return ge.subscribeImmediate(e,u=>{const p=t?Gr(u,t):u,{signatures:f}=o(p);if(!a(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const b of g){const y=l?.get(b)??"__NONE__",C=f.get(b)??"__NONE__";y!==C&&m.push(b);}l=f,d({value:p,changedKeys:m});}})}async function s(d,l){return i(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u});})}async function c(d,l){const u=new Set(d);return i(({value:p,changedKeys:f})=>{const g=f.filter(m=>u.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:i,subKey:s,subKeys:c}}const kn=new Map;function Zx(e,t){const n=kn.get(e);if(n)try{n();}catch{}return kn.set(e,t),()=>{try{t();}catch{}kn.get(e)===t&&kn.delete(e);}}function me(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${Js(n).join(".")}`:e;async function a(){const u=await ge.select(e);return n?Gr(u,n):u}async function i(u){if(typeof r=="function"){const g=await ge.select(e),m=r(u,g);return ge.set(e,m)}const p=await ge.select(e),f=n?Jx(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ge.set(e,{...p,...u}):ge.set(e,f)}async function s(u){const p=await a(),f=u(p);return await i(f),f}async function c(u,p,f){let g;const m=y=>{const C=n?Gr(y,n):y;if(typeof g>"u"||!f(g,C)){const S=g;g=C,p(C,S);}},b=u?await ge.subscribeImmediate(e,m):await ge.subscribe(e,m);return Zx(o,b)}function d(){const u=kn.get(o);if(u){try{u();}catch{}kn.delete(o);}}function l(u){return Qx(e,u?.path??n,u)}return {label:o,get:a,set:i,update:s,onChange:(u,p=Object.is)=>c(false,u,p),onChangeNow:(u,p=Object.is)=>c(true,u,p),asSignature:l,stopOnChange:d}}function P(e){return me(e)}P("positionAtom");P("lastPositionInMyGardenAtom");P("playerDirectionAtom");P("stateAtom");P("quinoaDataAtom");P("currentTimeAtom");P("actionAtom");P("isPressAndHoldActionAtom");P("mapAtom");P("tileSizeAtom");me("mapAtom",{path:"cols"});me("mapAtom",{path:"rows"});me("mapAtom",{path:"spawnTiles"});me("mapAtom",{path:"locations.seedShop.spawnTileIdx"});me("mapAtom",{path:"locations.eggShop.spawnTileIdx"});me("mapAtom",{path:"locations.toolShop.spawnTileIdx"});me("mapAtom",{path:"locations.decorShop.spawnTileIdx"});me("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});me("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});me("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});me("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});me("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});P("playerAtom");P("myDataAtom");P("myUserSlotIdxAtom");P("isSpectatingAtom");P("myCoinsCountAtom");P("numPlayersAtom");me("playerAtom",{path:"id"});me("myDataAtom",{path:"activityLogs"});P("userSlotsAtom");P("filteredUserSlotsAtom");P("myUserSlotAtom");P("spectatorsAtom");me("stateAtom",{path:"child"});me("stateAtom",{path:"child.data"});me("stateAtom",{path:"child.data.shops"});const ey=me("stateAtom",{path:"child.data.userSlots"}),ty=me("stateAtom",{path:"data.players"}),ny=me("stateAtom",{path:"data.hostPlayerId"});P("myInventoryAtom");P("myInventoryItemsAtom");P("isMyInventoryAtMaxLengthAtom");P("myFavoritedItemIdsAtom");P("myCropInventoryAtom");P("mySeedInventoryAtom");P("myToolInventoryAtom");P("myEggInventoryAtom");P("myDecorInventoryAtom");P("myPetInventoryAtom");me("myInventoryAtom",{path:"favoritedItemIds"});P("itemTypeFiltersAtom");P("myItemStoragesAtom");P("myPetHutchStoragesAtom");P("myPetHutchItemsAtom");P("myPetHutchPetItemsAtom");P("myNumPetHutchItemsAtom");P("myValidatedSelectedItemIndexAtom");P("isSelectedItemAtomSuspended");P("mySelectedItemAtom");P("mySelectedItemNameAtom");P("mySelectedItemRotationsAtom");P("mySelectedItemRotationAtom");P("setSelectedIndexToEndAtom");P("myPossiblyNoLongerValidSelectedItemIndexAtom");P("myCurrentGlobalTileIndexAtom");P("myCurrentGardenTileAtom");P("myCurrentGardenObjectAtom");P("myOwnCurrentGardenObjectAtom");P("myOwnCurrentDirtTileIndexAtom");P("myCurrentGardenObjectNameAtom");P("isInMyGardenAtom");P("myGardenBoardwalkTileObjectsAtom");const ry=me("myDataAtom",{path:"garden"});me("myDataAtom",{path:"garden.tileObjects"});me("myOwnCurrentGardenObjectAtom",{path:"objectType"});P("myCurrentStablePlantObjectInfoAtom");P("myCurrentSortedGrowSlotIndicesAtom");P("myCurrentGrowSlotIndexAtom");P("myCurrentGrowSlotsAtom");P("myCurrentGrowSlotAtom");P("secondsUntilCurrentGrowSlotMaturesAtom");P("isCurrentGrowSlotMatureAtom");P("numGrowSlotsAtom");P("myCurrentEggAtom");P("petInfosAtom");P("myPetInfosAtom");P("myPetSlotInfosAtom");P("myPrimitivePetSlotsAtom");P("myNonPrimitivePetSlotsAtom");P("expandedPetSlotIdAtom");P("myPetsProgressAtom");P("myActiveCropMutationPetsAtom");P("totalPetSellPriceAtom");P("selectedPetHasNewVariantsAtom");const oy=P("shopsAtom"),ay=P("myShopPurchasesAtom");P("seedShopAtom");P("seedShopInventoryAtom");P("seedShopRestockSecondsAtom");P("seedShopCustomRestockInventoryAtom");P("eggShopAtom");P("eggShopInventoryAtom");P("eggShopRestockSecondsAtom");P("eggShopCustomRestockInventoryAtom");P("toolShopAtom");P("toolShopInventoryAtom");P("toolShopRestockSecondsAtom");P("toolShopCustomRestockInventoryAtom");P("decorShopAtom");P("decorShopInventoryAtom");P("decorShopRestockSecondsAtom");P("decorShopCustomRestockInventoryAtom");P("isDecorShopAboutToRestockAtom");me("shopsAtom",{path:"seed"});me("shopsAtom",{path:"tool"});me("shopsAtom",{path:"egg"});me("shopsAtom",{path:"decor"});P("myCropItemsAtom");P("myCropItemsToSellAtom");P("totalCropSellPriceAtom");P("friendBonusMultiplierAtom");P("myJournalAtom");P("myCropJournalAtom");P("myPetJournalAtom");P("myStatsAtom");P("myActivityLogsAtom");P("newLogsAtom");P("hasNewLogsAtom");P("newCropLogsFromSellingAtom");P("hasNewCropLogsFromSellingAtom");P("myCompletedTasksAtom");P("myActiveTasksAtom");P("isWelcomeToastVisibleAtom");P("shouldCloseWelcomeToastAtom");P("isInitialMoveToDirtPatchToastVisibleAtom");P("isFirstPlantSeedActiveAtom");P("isThirdSeedPlantActiveAtom");P("isThirdSeedPlantCompletedAtom");P("isDemoTouchpadVisibleAtom");P("areShopAnnouncersEnabledAtom");P("arePresentablesEnabledAtom");P("isEmptyDirtTileHighlightedAtom");P("isPlantTileHighlightedAtom");P("isItemHiglightedInHotbarAtom");P("isItemHighlightedInModalAtom");P("isMyGardenButtonHighlightedAtom");P("isSellButtonHighlightedAtom");P("isShopButtonHighlightedAtom");P("isInstaGrowButtonHiddenAtom");P("isActionButtonHighlightedAtom");P("isGardenItemInfoCardHiddenAtom");P("isSeedPurchaseButtonHighlightedAtom");P("isFirstSeedPurchaseActiveAtom");P("isFirstCropHarvestActiveAtom");P("isWeatherStatusHighlightedAtom");const iy=P("weatherAtom"),Qs=P("activeModalAtom");P("hotkeyBeingPressedAtom");P("avatarTriggerAnimationAtom");P("avatarDataAtom");P("emoteDataAtom");P("otherUserSlotsAtom");P("otherPlayerPositionsAtom");P("otherPlayerSelectedItemsAtom");P("otherPlayerLastActionsAtom");P("traderBunnyPlayerId");P("npcPlayersAtom");P("npcQuinoaUsersAtom");P("numNpcAvatarsAtom");P("traderBunnyEmoteTimeoutAtom");P("traderBunnyEmoteAtom");P("unsortedLeaderboardAtom");P("currentGardenNameAtom");P("quinoaEngineAtom");P("quinoaInitializationErrorAtom");P("avgPingAtom");P("serverClientTimeOffsetAtom");P("isEstablishingShotRunningAtom");P("isEstablishingShotCompleteAtom");const ue={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Ra(){return ue}function sy(){return ue.initialized}function gn(){return ue.isCustom&&ue.activeModal!==null}function ln(){return ue.activeModal}function Ku(e){return !ue.shadow||ue.shadow.modal!==e?null:ue.shadow.data}function ly(e){ue.initialized=e;}function Zs(e){ue.activeModal=e;}function el(e){ue.isCustom=e;}function Yu(e,t){ue.shadow={modal:e,data:t,timestamp:Date.now()};}function Ju(){ue.shadow=null;}function Sc(e,t){ue.patchedAtoms.add(e),ue.originalReads.set(e,t);}function cy(e){return ue.originalReads.get(e)}function Zi(e){return ue.patchedAtoms.has(e)}function dy(e){ue.patchedAtoms.delete(e),ue.originalReads.delete(e);}function uy(e){ue.unsubscribes.push(e);}function py(){for(const e of ue.unsubscribes)try{e();}catch{}ue.unsubscribes.length=0;}function fy(e){return ue.listeners.onOpen.add(e),()=>ue.listeners.onOpen.delete(e)}function Qu(e){return ue.listeners.onClose.add(e),()=>ue.listeners.onClose.delete(e)}function Zu(e){for(const t of Array.from(ue.listeners.onOpen))try{t(e);}catch{}}function tl(e){for(const t of Array.from(ue.listeners.onClose))try{t(e);}catch{}}function gy(){py(),ue.initialized=false,ue.activeModal=null,ue.isCustom=false,ue.shadow=null,ue.patchedAtoms.clear(),ue.originalReads.clear(),ue.listeners.onOpen.clear(),ue.listeners.onClose.clear();}const nl={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function ep(e){return nl[e]}function my(e){const t=nl[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const hy=new Set(["inventory","journal","stats","activityLog","petHutch"]),by=new Set(["seedShop","eggShop","toolShop","decorShop"]),xy=new Set(["leaderboard"]);function yy(e,t,n,r){return function(a){const i=gn(),s=ln();if(i&&s===r){const c=Ku(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function vy(e,t,n,r,o){return function(i){if(gn()&&ln()===o){const s=Ku(o);if(s!==null){const c=s[n];if(c!==void 0)return t(i),r(c)}}return t(i)}}function wy(e){const t=ep(e);for(const n of t.atoms){const r=jt(n.atomLabel);if(!r||Zi(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=yy(n.atomLabel,o,n,e);r.read=a,Sc(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=jt(n.atomLabel);if(!r||Zi(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=vy(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,Sc(n.atomLabel,o);}}async function Oa(e){const t=ep(e);for(const r of t.atoms)Cc(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)Cc(r.atomLabel);const n=await Ys();await tp(n,e);}async function Sy(e){const t=await Ys();await tp(t,e);const n=my(e);for(const r of n){const o=jt(r);if(o)try{t.get(o);}catch{}}}function Cc(e){if(!Zi(e))return;const t=jt(e),n=cy(e);t&&n&&(t.read=n),dy(e);}async function tp(e,t){const n=hy.has(t),r=by.has(t),o=xy.has(t);if(!n&&!r&&!o)return;const a=jt("stateAtom");if(a)try{const i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){const c=i.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){const u={...c,data:l};s={...i,child:u};}}}if(o){const c=i.data;if(c&&Array.isArray(c.players)){const d={...c,players:[...c.players]};s={...s??i,data:d};}}if(!s)return;await e.set(a,s);}catch{}}async function Cy(){for(const e of Object.keys(nl))await Oa(e);}let Co=null,kr=null;async function ky(){if(Ra().initialized)return;kr=await ge.select("activeModalAtom"),Co=setInterval(async()=>{try{const n=await ge.select("activeModalAtom"),r=kr;r!==n&&(kr=n,_y(n,r));}catch{}},50),uy(()=>{Co&&(clearInterval(Co),Co=null);}),ly(true);}function _y(e,t){const n=gn(),r=ln();e===null&&t!==null&&(n&&r===t?Ay("native"):n||tl({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Zu({modal:e,isCustom:false});}async function Ay(e){const t=ln();t&&(Ju(),el(false),Zs(null),await Oa(t),tl({modal:t,wasCustom:true,closedBy:e}));}async function Ty(e,t){if(!Ra().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");gn()&&await np(),Yu(e,t),el(true),Zs(e),wy(e),await Sy(e),await Qs.set(e),kr=e,Zu({modal:e,isCustom:true});}function Py(e,t){const n=Ra();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Yu(e,o);}async function np(){const e=Ra();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Ju(),el(false),Zs(null),await Qs.set(null),kr=null,await Oa(t),tl({modal:t,wasCustom:true,closedBy:"api"});}function Iy(){return new Promise(e=>{if(!gn()){e();return}const t=Qu(()=>{t(),e();});})}async function Ey(){if(gn()){const e=ln();e&&await Oa(e);}await Cy(),gy();}const An={async init(){return ky()},isReady(){return sy()},async show(e,t){return Ty(e,t)},update(e,t){return Py(e,t)},async close(){return np()},isOpen(){return ln()!==null},isCustomOpen(){return gn()},getActiveModal(){return ln()},waitForClose(){return Iy()},onOpen(e){return fy(e)},onClose(e){return Qu(e)},async destroy(){return Ey()}};function My(){return {ready:false,xform:null,xformAt:0}}const at=My();function rp(){return at.ready}function jn(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function eo(){return ot.tos()}function rl(){return ot.engine()}function Ly(){const e=eo()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function ol(e,t){const n=Ly();return n?t*n+e|0:null}let ko=null;async function Ry(e=15e3){return at.ready?true:ko||(ko=(async()=>{if(await ot.init(e),!eo())throw new Error("MGTile: engine captured but tileObject system not found");return at.ready=true,true})(),ko)}function an(e,t,n=true){const r=eo(),o=ol(e,t);if(!r||o==null)return {gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:a||null}}function ui(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function al(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Tn(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=rl(),{gidx:s,tv:c}=an(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Fa(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:a,tv:i}=an(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return {tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};const s=i.tileObject;return {tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?jn(s):s}}function Oy(e,t,n={}){return Tn(e,t,null,n)}function Fy(e,t,n,r={}){const a=Fa(e,t,{...r,clone:false}).tileView?.tileObject;al(a,"plant");const i=jn(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return ui(i.slots[s],n.slotPatch),Tn(e,t,i,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);ui(i.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const d=Number(c)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);ui(i.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Tn(e,t,i,r)}return Tn(e,t,i,r)}function Ny(e,t,n,r={}){const a=Fa(e,t,{...r,clone:false}).tileView?.tileObject;al(a,"decor");const i=jn(a);return "rotation"in n&&(i.rotation=Number(n.rotation)),Tn(e,t,i,r)}function $y(e,t,n,r={}){const a=Fa(e,t,{...r,clone:false}).tileView?.tileObject;al(a,"egg");const i=jn(a);return "plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Tn(e,t,i,r)}function Dy(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=rl(),{gidx:s,tv:c}=an(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const d=c.tileObject,l=typeof n=="function"?n(jn(d)):n;if(c.onDataChanged(l),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function By(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:a}=an(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const i=n.clone!==false,s=a.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?jn(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function pi(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function ta(e){const t=pt(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=pt(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Gy(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=ta(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function zy(){const e=eo(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;const s=an(a,i,true).tv,c=a+1<t?an(a+1,i,true).tv:null,d=an(a,i+1,true).tv,l=pi(s),u=pi(c),p=pi(d);if(!l||!u||!p)continue;const f=ta(l),g=ta(u),m=ta(p);if(!f||!g||!m)continue;const b={x:g.x-f.x,y:g.y-f.y},y={x:m.x-f.x,y:m.y-f.y},C=b.x*y.y-b.y*y.x;if(!Number.isFinite(C)||Math.abs(C)<1e-6)continue;const S=1/C,v={a:y.y*S,b:-y.x*S,c:-b.y*S,d:b.x*S},A={x:f.x-a*b.x-i*y.x,y:f.y-a*b.y-i*y.y},x=Gy(l),w=x==="center"?A:{x:A.x+.5*(b.x+y.x),y:A.y+.5*(b.y+y.y)};return {ok:true,cols:t,rows:r,vx:b,vy:y,inv:v,anchorMode:x,originCenter:w}}return null}function op(){return at.xform=zy(),at.xformAt=Date.now(),{ok:!!at.xform?.ok,xform:at.xform}}function Hy(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!at.xform?.ok||t.forceRebuild||Date.now()-at.xformAt>n)&&op();const r=at.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,c=Math.floor(i),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]];let u=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const m=r.originCenter.x+f*r.vx.x+g*r.vy.x,b=r.originCenter.y+f*r.vx.y+g*r.vy.y,y=(e.x-m)**2+(e.y-b)**2;y<p&&(p=y,u={tx:f,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=ol(u.tx,u.ty),u):null}function jy(e,t){const n=at.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function st(){if(!rp())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Uy(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Pt={init:Ry,isReady:rp,hook:ot.hook,engine:rl,tos:eo,gidx:(e,t)=>ol(Number(e),Number(t)),getTileObject:(e,t,n={})=>(st(),Fa(e,t,n)),inspect:(e,t,n={})=>(st(),By(e,t,n)),setTileEmpty:(e,t,n={})=>(st(),Oy(e,t,n)),setTilePlant:(e,t,n,r={})=>(st(),Fy(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(st(),Ny(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(st(),$y(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(st(),Dy(e,t,n,r)),rebuildTransform:()=>(st(),op()),pointToTile:(e,t={})=>(st(),Hy(e,t)),tileToPoint:(e,t)=>(st(),jy(e,t)),getTransform:()=>(st(),at.xform),help:Uy};function Wy(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const K=Wy();function ap(){return K.ready}async function Vy(e=15e3){if(K.ready)return es(),true;if(await ot.init(e),K.app=ot.app(),K.ticker=ot.ticker(),K.renderer=ot.renderer(),K.stage=ot.stage(),!K.app||!K.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return K.ready=true,es(),true}function es(){const e=L;return e.$PIXI=e.PIXI||null,e.$app=K.app||null,e.$renderer=K.renderer||null,e.$stage=K.stage||null,e.$ticker=K.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:K.ready},e.__MG_PIXI__}function il(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function ts(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function va(e){return !!(e&&typeof e.tint=="number")}function cn(e){return !!(e&&typeof e.alpha=="number")}function na(e,t,n){return e+(t-e)*n}function Xy(e,t,n){const r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,c=t&255,d=na(r,i,n)|0,l=na(o,s,n)|0,u=na(a,c,n)|0;return d<<16|l<<8|u}function qy(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;va(o)&&n.push(o);const a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i]);}return n}function Ky(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const a=r.pop();if(!a)continue;cn(a)&&n.push(a);const i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s]);}return n}const Yy=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function ns(e){if(!e)return null;if(ts(e))return e;if(!il(e))return null;for(const t of Yy){const n=e[t];if(ts(n))return n}return null}function Jy(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){const s=new Array(t);let c=true;for(let d=0;d<t;d++){const l=ns(a[d]);if(!l){c=false;break}s[d]=l;}if(c)return s}for(const s of a)n.push({o:s,d:i+1});continue}if(il(a)){const s=a;for(const c of Object.keys(s))n.push({o:s[c],d:i+1});}}}return null}function ip(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(il(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;const i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}));}return n}function Qy(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=ip(t);return K.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function Zy(e){return K.tileSets.delete(String(e||"").trim())}function e0(){return Array.from(K.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function sp(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function sl(e){const n=Pt.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!sp(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const a=String(e.tileSet||"").trim(),i=K.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i;}else r=ip(e.tiles||[]);const o=new Map;for(const a of r){const i=Pt.getTileObject(a.x,a.y,{ensureView:true,clone:false});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function ll(e){const t=K.highlights.get(e);if(!t)return  false;pt(()=>K.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&cn(t.root)&&pt(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&va(n.o)&&pt(()=>{n.o.tint=n.baseTint;});return K.highlights.delete(e),true}function lp(e=null){for(const t of Array.from(K.highlights.keys()))e&&!String(t).startsWith(e)||ll(t);return  true}function cp(e,t={}){if(!ts(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(K.highlights.has(n))return n;const r=cn(e)?Number(e.alpha):null,o=wt(Number(t.minAlpha??.12),0,1),a=wt(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=wt(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,l=[];if(d)for(const f of qy(e))l.push({o:f,baseTint:f.tint});else va(e)&&l.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*i)+1)/2,m=g*g*(3-2*g);r!=null&&cn(e)&&(e.alpha=wt(na(o,a,m)*r,0,1));const b=m*c;for(const y of l)y.o&&va(y.o)&&(y.o.tint=Xy(y.baseTint,s,b));};return K.ticker?.add(p),K.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function t0(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function dp(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=sl(t),a=`hlmut:${n}:`;if(t.clear===true)if(!o)lp(a);else for(const u of Array.from(K.highlights.keys())){if(!u.startsWith(a))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&ll(u);}const i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,d=0,l=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const b=[];for(let S=0;S<g.length;S++)t0(g[S],n)&&(b.push(S),m=true);if(!m)continue;s++,c+=b.length;const y=p?.childView?.plantVisual||p?.childView||p,C=Jy(y,g.length);if(!C){l+=b.length;continue}for(const S of b){const v=C[S];if(!v){l++;continue}const A=`${a}${u}:${S}`;K.highlights.has(A)||(cp(v,{key:A,...i}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function n0(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=K.watches.get(r);a&&clearInterval(a);const i=setInterval(()=>{pt(()=>dp(n,{...t,clear:!1}));},o);return K.watches.set(r,i),{ok:true,key:r,mutation:n,intervalMs:o}}function r0(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(K.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),K.watches.delete(a),o++);return o>0}const n=K.watches.get(t);return n?(clearInterval(n),K.watches.delete(t),true):false}function o0(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return ns(t)||ns(e?.displayObject)||null}function up(e){const t=K.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&cn(n.o)&&Number.isFinite(n.baseAlpha)&&pt(()=>{n.o.alpha=n.baseAlpha;});return K.fades.delete(e),true}function rs(e=null){for(const t of Array.from(K.fades.keys()))e&&!String(t).startsWith(e)||up(t);return  true}function pp(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!sp(t))return rs(r);const{gidxSet:o}=sl(t);if(!o)return rs(r);for(const a of Array.from(K.fades.keys())){if(!a.startsWith(r))continue;const i=Number(a.slice(r.length));o.has(i)&&up(a);}return  true}function fp(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=wt(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:a,gidxSet:i}=sl(t),s=`fade:${n}:`;t.clear===true&&pp(n,t);let c=0,d=0,l=0,u=0;for(const[p,f]of a){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;d++;const b=o0(f);if(!b||!cn(b)){u++;continue}const y=`${s}${p}`;if(K.fades.has(y)){pt(()=>{b.alpha=r;}),l++;continue}const C=o?Ky(b):[b],S=[];for(const v of C)cn(v)&&S.push({o:v,baseAlpha:Number(v.alpha)});for(const v of S)pt(()=>{v.o.alpha=r;});K.fades.set(y,{targets:S}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:K.fades.size}}function a0(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=K.fadeWatches.get(r);a&&clearInterval(a);const i=setInterval(()=>{pt(()=>fp(n,{...t,clear:!1}));},o);return K.fadeWatches.set(r,i),{ok:true,key:r,species:n,intervalMs:o}}function i0(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(K.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),K.fadeWatches.delete(a),o++);return o>0}const n=K.fadeWatches.get(t);return n?(clearInterval(n),K.fadeWatches.delete(t),true):false}function s0(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function l0(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==false,i=Pt.getTileObject(r,o,{ensureView:a,clone:false}),s=i?.tileView||null,c=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:i?.gidx??Pt.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?s0(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&pt(()=>console.log("[MGPixi.inspectTile]",d)),d}function c0(e,t,n){const r=L.PIXI;if(!r)return;let o=K.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",K.stage.addChild(o));const a=n.key;let i=o.getChildByName(a);i||(i=new r.Graphics,i.name=a,o.addChild(i));const s=Pt.tileToPoint(e,t);if(!s)return;i.clear(),i.lineStyle(2,n.tint??65280,n.alpha??1),i.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=Pt.getTransform(),d=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;i.drawRect(0,0,d,l),i.endFill(),i.x=s.x,i.y=s.y,c&&(i.rotation=Math.atan2(c.vx.y,c.vx.x));}function d0(e){const t=K.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Re(){if(!ap())throw new Error("MGPixi: call MGPixi.init() first")}const Na={init:Vy,isReady:ap,expose:es,get app(){return K.app},get renderer(){return K.renderer},get stage(){return K.stage},get ticker(){return K.ticker},get PIXI(){return L.PIXI||null},defineTileSet:(e,t)=>(Re(),Qy(e,t)),deleteTileSet:e=>(Re(),Zy(e)),listTileSets:()=>(Re(),e0()),highlightPulse:(e,t)=>(Re(),cp(e,t)),stopHighlight:e=>(Re(),ll(e)),clearHighlights:e=>(Re(),lp(e)),drawOverlayBox:(e,t,n)=>(Re(),c0(e,t,n)),stopOverlay:e=>(Re(),d0(e)),highlightMutation:(e,t)=>(Re(),dp(e,t)),watchMutation:(e,t)=>(Re(),n0(e,t)),stopWatchMutation:e=>(Re(),r0(e)),inspectTile:(e,t,n)=>(Re(),l0(e,t,n)),fadeSpecies:(e,t)=>(Re(),fp(e,t)),clearSpeciesFade:(e,t)=>(Re(),pp(e,t)),clearFades:e=>(Re(),rs(e)),watchFadeSpecies:(e,t)=>(Re(),a0(e,t)),stopWatchFadeSpecies:e=>(Re(),i0(e))};function u0(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const te=u0();function gp(){return te.ready}const kc=L??window;async function mp(){const e=te.ctx;if(e)return e;const t=kc.AudioContext||kc.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return te.ctx=n,n}async function hp(){if(te.ctx&&te.ctx.state==="suspended")try{await te.ctx.resume();}catch{}}const p0={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},f0={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},_r=.001,Ar=.2;function _c(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function zr(e){const t=p0[e],n=f0[e];if(!t)return {atom:Ar,vol100:_o(Ar)};const r=_c(t,NaN);if(Number.isFinite(r)){const a=wt(r,0,1);return {atom:a,vol100:_o(a)}}if(n){const a=_c(n,NaN);if(Number.isFinite(a)){const i=wt(a,0,1);return {atom:i,vol100:_o(i)}}}const o=Ar;return {atom:o,vol100:_o(o)}}function g0(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(wt(t,1,100)-1)/99;return _r+r*(Ar-_r)}function _o(e){const t=wt(Number(e),0,1);if(t<=_r)return 0;const n=(t-_r)/(Ar-_r);return Math.round(1+n*99)}function bp(e,t){if(t==null)return zr(e).atom;const n=g0(t);return n===null?zr(e).atom:nh(n)}function m0(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);te.sfx.groups=t;}function h0(e){const t=te.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=te.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function b0(){if(te.sfx.buffer)return te.sfx.buffer;if(!te.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await mp();await hp();const n=await(await iu(te.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{const i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a);});return te.sfx.buffer=r,r}async function x0(e,t={}){if(!te.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=h0(n),o=te.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const a=await mp();await hp();const i=await b0(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=bp("sfx",t.volume),u=a.createGain();u.gain.value=l,u.connect(a.destination);const p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}const y0=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),v0=function(e){return "/"+e},Ac={},Ye=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");o=c(n.map(d=>{if(d=v0(d),d in Ac)return;Ac[d]=true;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":y0,l||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function a(i){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},$a={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},w0={sounds:[],version:1};class cl extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class S0 extends cl{constructor(){super(`Maximum number of sounds reached (${$a.MAX_SOUNDS})`),this.name="SoundLimitError";}}class C0 extends cl{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${$a.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class k0 extends cl{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function _0(){return ve(zt.MODULE.AUDIO_CUSTOM_SOUNDS,w0)}function A0(e){we(zt.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function Tc(){return _0().sounds}function Da(e){A0({sounds:e,version:1});}const T0="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",xp=[{id:"default-notification",name:"Default",source:T0,type:"upload",createdAt:0}];function P0(e){const t=new Set(e.map(r=>r.id)),n=xp.filter(r=>!t.has(r.id));return n.length===0?e:[...e,...n]}function yp(e){return xp.some(t=>t.id===e)}function I0(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const o=e.slice(n+1).length*3/4;return Math.round(o)}function vp(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=I0(e);if(t>0&&t>$a.MAX_SIZE_BYTES)throw new C0(t)}function wp(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function E0(e){if(e>=$a.MAX_SOUNDS)throw new S0}let it=[],os=false;function Un(){os||Sp();}function M0(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function Sp(){if(os)return;let e=Tc();e=P0(e),e.length!==Tc().length&&Da(e),it=e,os=true,console.log(`[CustomSounds] Initialized with ${it.length} sounds`);}function L0(){return Un(),[...it]}function Cp(e){return Un(),it.find(t=>t.id===e)}function R0(e,t,n){Un(),wp(e),vp(t),E0(it.length);const r={id:M0(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return it.push(r),Da(it),console.log(`[CustomSounds] Added sound: ${r.name} (${r.id})`),r}function O0(e){if(Un(),yp(e))throw new Error("Cannot remove default sounds");const t=it.findIndex(r=>r.id===e);if(t===-1)return  false;const n=it.splice(t,1)[0];return Da(it),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function F0(e,t){if(Un(),yp(e))throw new Error("Cannot update default sounds");const n=it.find(r=>r.id===e);return n?(t.name!==void 0&&(wp(t.name),n.name=t.name.trim()),t.source!==void 0&&(vp(t.source),n.source=t.source.trim()),Da(it),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function N0(e,t={}){Un();const n=Cp(e);if(!n)throw new k0(e);const{MGAudio:r}=await Ye(async()=>{const{MGAudio:o}=await Promise.resolve().then(()=>Tp);return {MGAudio:o}},void 0);try{await r.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(o){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,o),o}}function $0(){Ye(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>Tp);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}const kp={init:Sp,getAll:L0,getById:Cp,add:R0,remove:O0,update:F0,play:N0,stop:$0};let Ao=null;async function D0(){return te.ready?true:Ao||(Ao=(async()=>{te.baseUrl=await pn.base();const e=await Tt.load({baseUrl:te.baseUrl}),t=Tt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const a=o[1].toLowerCase(),i=o[2];te.urls[a].set(i,At(te.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(te.sfx.mp3Url=At(te.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(te.sfx.atlasUrl=At(te.baseUrl,r));}if(!te.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return te.sfx.atlas=await js(te.sfx.atlasUrl),m0(te.sfx.atlas),kp.init(),te.ready=true,true})(),Ao)}function _p(e){if(e!=="music"&&e!=="ambience")return  false;const t=te.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return te.tracks[e]=null,true}function B0(e,t,n={}){if(!te.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=te.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);_p(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=bp(e,n.volume),o.preload="auto",o.play().catch(()=>{}),te.tracks[e]=o,o}function G0(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(te.urls[n].keys()).sort():n==="sfx"?te.sfx.atlas?t.groups?Array.from(te.sfx.groups.keys()).sort():Object.keys(te.sfx.atlas).sort():[]:[]}function z0(){return ["sfx","music","ambience"]}function H0(){return Array.from(te.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function j0(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=te.urls[n],a=r.toLowerCase();for(const i of Array.from(o.keys()))if(i.toLowerCase()===a)return  true;return  false}function U0(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(te.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function W0(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=te.urls[n],a=r.toLowerCase();for(const[i,s]of Array.from(o.entries()))if(i.toLowerCase()===a)return s;return null}function V0(){return te.tracks.music&&(te.tracks.music.volume=zr("music").atom),te.tracks.ambience&&(te.tracks.ambience.volume=zr("ambience").atom),true}let Xe=null;async function X0(e,t={}){Ap();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const r={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,Xe?.audio===n&&(Xe=null));},setVolume:o=>{n.volume=Math.max(0,Math.min(1,o));},isPlaying:()=>!n.paused&&!n.ended};Xe=r;try{await new Promise((o,a)=>{const i=setTimeout(()=>{a(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(i),n.removeEventListener("canplay",c),n.removeEventListener("error",d);},c=()=>{s(),o();},d=()=>{s(),a(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(i),o()):(n.addEventListener("canplay",c,{once:!0}),n.addEventListener("error",d,{once:!0}));}),await n.play();}catch(o){throw Xe=null,o}return n.addEventListener("ended",()=>{Xe?.audio===n&&(Xe=null);}),r}function Ap(){return Xe?(Xe.stop(),Xe=null,true):false}function q0(e){return Xe?(Xe.setVolume(e),true):false}function K0(){return Xe?.isPlaying()??false}function Y0(){return Xe}function Ue(){if(!gp())throw new Error("MGAudio not ready yet")}async function J0(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return x0(o,n);if(r==="music"||r==="ambience")return B0(r,o,n);throw new Error(`Unknown category: ${r}`)}const Ba={init:D0,isReady:gp,play:J0,stop:e=>(Ue(),_p(e)),list:(e,t)=>(Ue(),G0(e,t)),refreshVolumes:()=>(Ue(),V0()),categoryVolume:e=>(Ue(),zr(e)),getCategories:()=>(Ue(),z0()),getGroups:()=>(Ue(),H0()),hasTrack:(e,t)=>(Ue(),j0(e,t)),hasGroup:e=>(Ue(),U0(e)),getTrackUrl:(e,t)=>(Ue(),W0(e,t)),playCustom:async(e,t)=>(Ue(),X0(e,t)),stopCustom:()=>(Ue(),Ap()),setCustomVolume:e=>(Ue(),q0(e)),isCustomPlaying:()=>(Ue(),K0()),getCustomHandle:()=>(Ue(),Y0()),CustomSounds:kp},Tp=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:Ba},Symbol.toStringTag,{value:"Module"}));function Q0(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const xe=Q0();function Pp(){return xe.ready}let To=null;async function Z0(){return xe.ready?true:To||(To=(async()=>{xe.baseUrl=await pn.base();const e=await Tt.load({baseUrl:xe.baseUrl}),t=Tt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");xe.byCat.clear(),xe.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;const s=a.slice(0,i),c=a.slice(i+1),d=At(xe.baseUrl,r);xe.byBase.set(a,d),xe.byCat.has(s)||xe.byCat.set(s,new Map),xe.byCat.get(s).set(c,d);}return xe.ready=true,true})(),To)}function as(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function ev(e,t){if(t===void 0){const a=as(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}const n=String(e||"").trim(),r=as(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const a=r.indexOf("_");return {cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function tv(){return Array.from(xe.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function nv(e){const t=xe.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function is(e,t){const{cat:n,asset:r,base:o}=ev(e,t),a=xe.byBase.get(o);if(a)return a;const s=xe.byCat.get(n)?.get(r);if(s)return s;if(!xe.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return At(xe.baseUrl,`cosmetic/${o}.png`)}const Pc=L?.document??document;function rv(){if(xe.overlay)return xe.overlay;const e=Pc.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Pc.documentElement.appendChild(e),xe.overlay=e,e}function ov(){const e=xe.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function av(e){return xe.defaultParent=e,true}const iv=L?.document??document;function ss(e,t,n){if(!xe.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=o!==void 0?is(e,o):is(e),i=iv.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):as(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{i.style[s]=String(c);}catch{}return i}function sv(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=r.parent||ov()||rv(),i=o!==void 0?ss(e,o,r):ss(e,r);if(a===xe.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else {const l=r.x??innerWidth/2,u=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${u}px`,i.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`);}}return a.appendChild(i),xe.live.add(i),i.__mgDestroy=()=>{try{i.remove();}catch{}xe.live.delete(i);},i}function lv(){for(const e of Array.from(xe.live))e.__mgDestroy?.();}const Ip=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],ls="Expression_Stressed.png";function cv(){try{return Array.from(L.document.querySelectorAll("script")).find(r=>r.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function dv(){return L.location.pathname.split("/").pop()||"UNKNOWN"}async function uv(){try{const e=cv(),t=dv(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,r=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function fi(){return  false}const Dt={ownedFilenames:new Set,loaded:false,error:null},pv=[];function gi(){pv.forEach(e=>e());}async function dl(){try{await La();const{Store:e}=await Ye(async()=>{const{Store:r}=await Promise.resolve().then(()=>Zr);return {Store:r}},void 0);if(!await e.select("isUserAuthenticatedAtom")){Dt.loaded=!0,gi();return}const n=await uv();Dt.ownedFilenames=new Set(n.map(r=>r.cosmeticFilename)),Dt.loaded=!0,Dt.error=null,gi();}catch(e){Dt.error=e,Dt.loaded=true,gi();}}function fv(e){return Dt.ownedFilenames.has(e)}function gv(){return Dt.loaded}const cs=[];let Ic=false,Ec=false;function mv(){Ec||(Ec=true,Mp().then(()=>{}).catch(()=>{}));}mv();let Mc=false;async function hv(){Mc||(await dl(),Mc=true);}function Hr(){try{const t=Array.from(L.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${L.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}async function Ep(){try{await La();const{Store:e}=await Ye(async()=>{const{Store:o}=await Promise.resolve().then(()=>Zr);return {Store:o}},void 0);let t=await e.select("playerAtom");for(let o=0;o<5&&(!t||Object.keys(t).length===0);o++)await new Promise(a=>setTimeout(a,200*o)),t=await e.select("playerAtom");if(!t||typeof t=="object"&&Object.keys(t).length===0)throw new Error("playerAtom not available");const n=t.cosmetic,r=t.name;return {avatar:n?.avatar||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:n?.color||"Red",name:r||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:"Red",name:"Player"}}}function bv(e,t){if(!t)return e;let n=e;if(t.type){const r=Array.isArray(t.type)?t.type:[t.type];n=n.filter(o=>r.includes(o.type));}if(t.availability){const r=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(o=>r.includes(o.availability));}if(t.search){const r=t.search.toLowerCase();n=n.filter(o=>o.displayName.toLowerCase().includes(r));}return n}function xv(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:fv(n.filename))}async function Mp(){if(!Ic)try{const e=Hr(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const a=((await n.json())?.bundles||[]).find(s=>s.name==="cosmetic"||s.name==="cosmetics");if(!a)return;const i=new Set(Ip.map(s=>s.filename));for(const s of a.assets||[])for(const c of s.src||[]){if(typeof c!="string")continue;const d=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(c);if(!d)continue;const l=d[1],u=d[2],p=`${u}.png`;if(i.has(p))continue;const f=u.split("_");if(f.length<2)continue;const g=f[0],m=f.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");cs.push({id:p,filename:p,type:g,displayName:m,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${l}/`)}${p}`}),i.add(p);}Ic=!0,console.log(`[Avatar] Discovered ${cs.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function to(e){const t=Hr(),n=cs.map(d=>({...d,url:d.url||`${t}${d.filename}`})),r=Ip.map(d=>({...d,url:`${t}${d.filename}`})),o=new Set,a=[];for(const d of n)o.has(d.filename)||(a.push(d),o.add(d.filename));for(const d of r)o.has(d.filename)||(a.push(d),o.add(d.filename));const s=[...[],...a];let c=bv(s,e);return c=xv(c,e),c}async function Lp(e){return await hv(),to(e)}async function yv(){await Mp();}function vv(e){return to(e).map(t=>t.url)}async function jr(){const{avatar:e,color:t}=await Ep();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function wv(){const e=await Ep(),t=await jr(),n=to(),r={};return n.forEach(o=>{r[o.type]=(r[o.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:r,allItems:n,assetBaseUrl:Hr()}}const Sv=100,mi=[];function ds(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",a=n.path||"";let i="";if("value"in n){const s=n.value;i=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||a)r=`PartialState : ${o} ${a} ${i}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));mi.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),mi.length>Sv&&mi.shift();}const We={nativeCtor:null,captured:[],latestOpen:null},Lc=Symbol.for("ariesmod.ws.capture.wrapped"),Rc=Symbol.for("ariesmod.ws.capture.native"),Rp=1;function us(e){return !!e&&e.readyState===Rp}function Cv(){if(us(We.latestOpen))return We.latestOpen;for(let e=We.captured.length-1;e>=0;e--){const t=We.captured[e];if(us(t))return t}return null}function kv(e,t){We.captured.push(e),We.captured.length>25&&We.captured.splice(0,We.captured.length-25);const n=()=>{We.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{We.latestOpen===e&&(We.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);ds("in",o.type||"unknown",o);}catch{ds("in","raw",r.data);}}),e.readyState===Rp&&n();}function _v(e=L,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[Lc])return We.nativeCtor=r[Rc]??We.nativeCtor??null,()=>{};const o=r;We.nativeCtor=o;function a(i,s){const c=s!==void 0?new o(i,s):new o(i);try{kv(c,n);}catch{}return c}try{a.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(a,o);}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED;}catch{}a[Lc]=true,a[Rc]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===a&&(e.WebSocket=o);}catch{}}}function Av(e=L){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function wa(e=L){const t=Cv();if(t)return {ws:t,source:"captured"};const n=Av(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Op(e,t={}){const n=t.pageWindow??L,r=t.intervalMs??500,o=!!t.debug;let a=null,i=null;const s=()=>{const d=wa(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function Tv(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Pv(e,t=L){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}const{ws:r}=wa(t);if(!r)return {ok:false,reason:"no-ws"};if(!us(r))return {ok:false,reason:"not-open"};const o=Tv(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const a=JSON.parse(o);ds("out",a.type||"unknown",a);}catch{}try{return r.send(o),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}}function Iv(e,t={},n=L){return Pv({type:e,...t},n)}const It={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},R={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var mt=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(mt||{});new Set(Object.values(It));new Set(Object.values(R));const Ev=["Room","Quinoa"],Mv={Room:["Room"],Quinoa:Ev};function re(e,t={},n=L){const r=t,{scopePath:o,scope:a,...i}=r,s=typeof o=="string"?o:a,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?Mv[s]:null;return Iv(e,c?{scopePath:c,...i}:i,n)}function Lv(e,t=L){return re(R.Chat,{scope:"Room",message:e},t)}function Rv(e,t=L){return re(R.Emote,{scope:"Room",emoteType:e},t)}function Ov(e,t=L){return re(R.Wish,{scope:"Quinoa",wish:e},t)}function Fv(e,t=L){return re(R.KickPlayer,{scope:"Room",playerId:e},t)}function Ga(e,t=L){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:r}=e;return re(R.SetPlayerData,{scope:"Room",name:n,cosmetic:r},t)}function Nv(e=L){return re(R.UsurpHost,{scope:"Quinoa"},e)}function $v(e=L){return re(R.ReportSpeakingStart,{scope:"Quinoa"},e)}function Dv(e,t=L){return re(R.SetSelectedGame,{scope:"Room",gameId:e},t)}function Bv(e,t=L){return re(R.VoteForGame,{scope:"Room",gameId:e},t)}function Gv(e,t=L){return re(R.RequestGame,{scope:"Room",gameId:e},t)}function zv(e=L){return re(R.RestartGame,{scope:"Room"},e)}function Hv(e,t=L){return re(R.Ping,{scope:"Quinoa",id:e},t)}function Fp(e,t,n=L){return re(R.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const jv=Fp;function Uv(e,t,n=L){return re(R.Teleport,{scope:"Quinoa",x:e,y:t},n)}function Wv(e=L){return re(R.CheckWeatherStatus,{scope:"Quinoa"},e)}function Vv(e,t,n=L){return re(R.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Xv(e,t=L){return re(R.DropObject,{scope:"Quinoa",slotIndex:e},t)}function qv(e,t=L){return re(R.PickupObject,{scope:"Quinoa",objectId:e},t)}function za(e,t=L){return re(R.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function ul(e,t="PetHutch",n=L){return re(R.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function pl(e,t="PetHutch",n=L){return re(R.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Kv(e,t,n=L){return re(R.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Yv(e=L){return re(R.LogItems,{scope:"Quinoa"},e)}function Jv(e,t,n,r=L){return re(R.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function Qv(e,t=L){return re(R.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Zv(e,t=L){return re(R.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function ew(e=L){return re(R.SellAllCrops,{scope:"Quinoa"},e)}function tw(e,t=L){return re(R.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function nw(e,t=L){return re(R.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function rw(e,t=L){return re(R.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function ow(e,t=L){return re(R.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function aw(e,t,n,r=L){return re(R.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function iw(e,t=L){return re(R.HatchEgg,{scope:"Quinoa",eggId:e},t)}function sw(e,t,n,r=L){return re(R.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function lw(e,t,n=L){return re(R.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function cw(e,t,n=L){return re(R.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function dw(e,t=L){return re(R.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function uw(e,t,n,r=L){return re(R.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function pw(e,t=L){return re(R.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function Np(e,t={x:0,y:0},n="Dirt",r=0,o=L){return re(R.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function fw(e,t,n=L){return re(R.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function gw(e,t=L){return re(R.PetPositions,{scope:"Quinoa",positions:e},t)}function $p(e,t,n=L){return re(R.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function Dp(e,t=L){return re(R.StorePet,{scope:"Quinoa",itemId:e},t)}function mw(e,t,n=L){return re(R.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function hw(e,t=L){return re(R.SellPet,{scope:"Quinoa",petId:e},t)}async function Bp(e){try{const t=await jr(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],r=e.color!==void 0?e.color:t.color,o=Ga({cosmetic:{color:r,avatar:n}},L);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:o}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function bw(){return Bp({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const pr=new Map;function xw(e){if(pr.has(e))return pr.get(e);const t=new Promise((n,r)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>n(o),o.onerror=()=>{pr.delete(e),r(new Error(`Failed to load image: ${e}`));},o.src=e;});return pr.set(e,t),t}function yw(){pr.clear();}function vw(e){return to().find(r=>r.filename===e)?.url||""}async function ww(e,t={}){const n=document.createElement("canvas"),r=t.width||400,o=t.height||400,a=t.scale||1;n.width=r*a,n.height=o*a;const i=n.getContext("2d");if(!i)throw new Error("Failed to get canvas 2D context");if(i.imageSmoothingEnabled=a!==1,e.color){const l={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};i.fillStyle=l[e.color]||"#FF0000",i.fillRect(0,0,n.width,n.height);}const c=[e.bottom,e.mid,e.top,e.expression].filter(l=>!!l).map(l=>vw(l));return (await Promise.all(c.map(l=>xw(l)))).forEach(l=>{i.drawImage(l,0,0,n.width,n.height);}),n}const Po={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};let fl=null,Pn=null,en=null,Bt=null;function Sw(){try{const t=Array.from(L.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return `${L.location.origin}/assets/cosmetic/`}catch{return "https://magicgarden.gg/assets/cosmetic/"}}function hi(e){return Sw()+e}function Cw(e,t){const r=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(r[Po.BOTTOM]=e.bottom),e.mid&&(r[Po.MID]=e.mid),e.top&&(r[Po.TOP]=e.top),e.expression&&(r[Po.EXPRESSION]=e.expression),r}async function kw(e){try{const{Store:t}=await Ye(async()=>{const{Store:i}=await Promise.resolve().then(()=>Zr);return {Store:i}},void 0),n=await t.select("myDataAtom"),r=n?.cosmetic?.avatar||[],o=Cw(e,r),a=e.color||n?.cosmetic?.color||"Red";return fl={avatar:o,color:a},Aw(),Tw(o),console.log("[Avatar] Rendered avatar override:",o),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function _w(){fl=null,Pn&&(clearInterval(Pn),Pn=null),en&&(en.disconnect(),en=null);const e=L.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),Bt&&(Bt.remove(),Bt=null),console.log("[Avatar] Cleared override"),true}function Aw(){if(Bt)return;const e=L.document;Bt=e.createElement("style"),Bt.id="gemini-avatar-override-styles",Bt.textContent=`
        [data-gemini-avatar-overridden="true"] canvas {
            opacity: 0 !important;
            visibility: hidden !important;
        }

        .gemini-avatar-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            pointer-events: none !important;
            z-index: 9999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .gemini-avatar-overlay img {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
        }
    `,e.head.appendChild(Bt);}function Tw(e){Pn&&clearInterval(Pn),en&&en.disconnect();const t=L.document,n=()=>{const o=t.querySelectorAll(".Avatar");let a=0;o.forEach(i=>{const s=Array.from(i.querySelectorAll("img"));if(s.length===4){let d=false;s.forEach((l,u)=>{const p=hi(e[u]);l.src!==p&&(d=true);}),d&&(s.forEach((l,u)=>{l.src=hi(e[u]),l.setAttribute("data-gemini-override",e[u]);}),a++);return}if(i.querySelector("canvas")&&!i.querySelector(".gemini-avatar-overlay")){i.setAttribute("data-gemini-avatar-overridden","true");const d=t.createElement("div");d.className="gemini-avatar-overlay",e.forEach(l=>{const u=t.createElement("img");u.src=hi(l),u.setAttribute("data-gemini-cosmetic",l),d.appendChild(u);}),window.getComputedStyle(i).position==="static"&&(i.style.position="relative"),i.appendChild(d),a++;}}),a>0&&console.log(`[Avatar] Re-applied ${a} override(s) (React reverted)`);};n(),Pn=setInterval(n,500),en=new MutationObserver(()=>{setTimeout(n,10);});const r=t.querySelector(".game-root")||t.querySelector("#root")||t.body;en.observe(r,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function Pw(){return fl}const Io={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};function Iw(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===ls.toLowerCase()}function Ew(e){return e.some(Iw)}let Sa=null,_n=null;L.Gemini_AvatarOverride=null;function Mw(e,t){const r=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(r[Io.BOTTOM]=e.bottom),e.mid&&(r[Io.MID]=e.mid),e.top&&(r[Io.TOP]=e.top),e.expression&&(r[Io.EXPRESSION]=e.expression),r}async function gl(e){try{const{Store:t}=await Ye(async()=>{const{Store:m}=await Promise.resolve().then(()=>Zr);return {Store:m}},void 0),{getPlayers:n}=await Ye(async()=>{const{getPlayers:m}=await Promise.resolve().then(()=>Zp);return {getPlayers:m}},void 0);fi();const a=n().get().myPlayer;if(!a)return console.error("[WorldAvatar] myPlayer not available"),!1;const i=a.id,s=a.cosmetic.avatar;L.MagicCircle_PlayerId=i,_n||(_n=[...s]);let c=Mw(e,s);const d=Ew(c);fi(),Sa=c,L.Gemini_AvatarOverride=c,console.log("[WorldAvatar] Applying override:",c);const l=await t.select("stateAtom");if(!l?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const u=l.data.players.findIndex(m=>m.id===i);if(u===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const p=l.data.players[u],f=[...l.data.players];f[u]={...p,cosmetic:{...p.cosmetic,avatar:c}};const g={...l,data:{...l.data,players:f}};return await t.set("stateAtom",g),fi()&&d||Ga({name:a.name,cosmetic:{...a.cosmetic,avatar:c}},L),!0}catch{return  false}}async function Gp(){if(!Sa||!_n)return  true;try{const{Store:e}=await Ye(async()=>{const{Store:u}=await Promise.resolve().then(()=>Zr);return {Store:u}},void 0),{getPlayers:t}=await Ye(async()=>{const{getPlayers:u}=await Promise.resolve().then(()=>Zp);return {getPlayers:u}},void 0);L.Gemini_AvatarOverride=null;const o=t().get().myPlayer;if(!o)return !1;const a=o.id,i=await e.select("stateAtom");if(!i?.data?.players)return !1;const s=i.data.players.findIndex(u=>u.id===a);if(s===-1)return !1;const c=i.data.players[s],d=[...i.data.players];d[s]={...c,cosmetic:{...c.cosmetic,avatar:_n}};const l={...i,data:{...i.data,players:d}};return await e.set("stateAtom",l),Ga({name:o.name,cosmetic:{...o.cosmetic,avatar:_n}},L),Sa=null,_n=null,!0}catch{return  false}}function Lw(){return Sa}let Ge=[];const ra=[],Oc=()=>{ra.forEach(e=>e([...Ge]));},$t={init(){Ge=ve(zt.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...Ge]},async save(e,t,n){const r=n||Math.random().toString(36).substring(2,9),o={...t,id:r,name:e,createdAt:n&&Ge.find(a=>a.id===n)?.createdAt||Date.now()};if(n){const a=Ge.findIndex(i=>i.id===n);a!==-1?Ge[a]=o:Ge.push(o);}else Ge.push(o);return we(zt.SECTION.AVATAR_LOADOUTS,Ge),Oc(),r},delete(e){Ge=Ge.filter(t=>t.id!==e),we(zt.SECTION.AVATAR_LOADOUTS,Ge),Oc();},rename(e,t){const n=Ge.find(r=>r.id===e);n&&(n.name=t,we(zt.SECTION.AVATAR_LOADOUTS,Ge));},async wear(e){const t=Ge.find(r=>r.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await gl(n)},subscribe(e){return ra.push(e),()=>{const t=ra.indexOf(e);t!==-1&&ra.splice(t,1);}}},Rw={init:dl,isReady:()=>gv(),list:to,listAsync:Lp,listUrls:vv,get:jr,debug:wv,set:Bp,blank:bw,Loadouts:$t,toCanvas:ww,clearImageCache:yw,render:kw,clearOverride:_w,getOverride:Pw,renderWorld:gl,clearWorldOverride:Gp,getWorldOverride:Lw};function Jt(){if(!Pp())throw new Error("MGCosmetic not ready yet")}const ml={init:Z0,isReady:Pp,categories:()=>(Jt(),tv()),list:e=>(Jt(),nv(e)),url:((e,t)=>(Jt(),is(e,t))),create:((e,t,n)=>(Jt(),ss(e,t,n))),show:((e,t,n)=>(Jt(),sv(e,t,n))),attach:e=>(Jt(),av(e)),clear:()=>(Jt(),lv()),Avatar:Rw},Fc={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function zp(e){const t=X.get("mutations");if(!t)return Fc[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?Fc[e]??null:n.coinMultiplier}const bi=new Map;function xi(e){if(bi.has(e))return bi.get(e);const t=zp(e)??1;return bi.set(e,t),t}const Ow=new Set(["Gold","Rainbow"]),Fw=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function Hp(e){let t=1,n=0,r=0;for(const o of e)if(o==="Gold"||o==="Rainbow")o==="Rainbow"?t=xi("Rainbow"):t===1&&(t=xi("Gold"));else {const a=xi(o);a>1&&(n+=a,r++);}return t*(1+n-r)}function Nw(e){return zp(e)}function $w(e){return Ow.has(e)}function Dw(e){return Fw.has(e)}function Bw(e){return Dw(e)}function hl(e,t){const n=Ha(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function ft(e,t,n){const r=Ha(e);if(!r)return 0;const o=r.baseSellPrice,a=Hp(n);return Math.round(o*t*a)}function Gw(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function zw(e,t){return t>=e}function Ha(e){const t=X.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const jp=3600,yi=80,Hw=100,fr=30;function ja(e){return e/jp}function Ua(e,t){const n=no(e);if(!n)return yi;const r=n.maxScale;if(t<=1)return yi;if(t>=r)return Hw;const o=(t-1)/(r-1);return Math.floor(yi+20*o)}function Wa(e,t,n){const r=no(e);if(!r)return n-fr;const o=r.hoursToMature,a=t/jp,i=fr/o,s=Math.min(i*a,fr),c=n-fr;return Math.floor(c+s)}function Va(e,t){const n=no(e);return n?t>=n.hoursToMature:false}function Up(e){const t=no(e);return t?fr/t.hoursToMature:0}function jw(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function no(e){const t=X.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Uw(e,t){return t<=0?1:Math.min(1,e/t)}const Ee=3600,Eo=80,Nc=100,St=30,Ww={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function ro(e){const t=X.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function Vw(e){return e/Ee}function oo(e,t){const n=ro(e);if(!n)return Eo;const{maxScale:r}=n;if(t<=1)return Eo;if(t>=r)return Nc;const o=(t-1)/(r-1);return Math.floor(Eo+(Nc-Eo)*o)}function Xw(e){return e-St}function qw(e){const t=ro(e);return !t||t.hoursToMature<=0?0:St/t.hoursToMature}function ao(e,t,n){const r=ro(e);if(!r)return n-St;const o=t/Ee,a=St/r.hoursToMature,i=Math.min(a*o,St),s=n-St;return Math.floor(s+i)}function Wp(e,t,n){const r=ro(e);if(!r)return 0;const o=n-St,a=t-o;if(a<=0)return 0;const i=St/r.hoursToMature;return i<=0?0:a/i*Ee}function bl(e,t,n,r,o=Ee){const i=Wp(e,n,r)-t;return i<=0?0:o<=0?1/0:i/o}function Xa(e,t,n,r=Ee){return bl(e,t,n,n,r)}function xl(e,t,n,r,o=Ee){if(n>=r)return 0;const a=n+1;return bl(e,t,a,r,o)}function Kw(e,t){return e>=t}function Yw(e,t){const n=t-St,o=(e-n)/St*100;return Math.min(100,Math.max(0,o))}const Jw=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:Vw,calculateCurrentStrength:ao,calculateHoursToMaxStrength:Xa,calculateHoursToNextStrength:xl,calculateHoursToStrength:bl,calculateMaxStrength:oo,calculateStartingStrength:Xw,calculateStrengthPerHour:qw,calculateStrengthProgress:Yw,calculateXpForStrength:Wp,getSpeciesData:ro,isPetMature:Kw},Symbol.toStringTag,{value:"Module"}));function yl(e){const t=X.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=Ww[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function Qw(e,t){return e<=0?0:t<=0?1/0:e/t}function vl(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const a=e-o,i=r/n;return Math.ceil(a/i)}function wl(e,t,n){const r=X.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=yl(e);return vl(n,t,i,a)}function Ur(e,t,n){const r=X.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=yl(e);return vl(n,t,i,a)}function Sl(e,t,n,r,o,a){return e?t&&a>0?Ur(n,r,a):0:Ur(n,r,o)}const Zw=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:Sl,calculateFeedsForDuration:vl,calculateFeedsToMaxStrength:Ur,calculateFeedsToNextStrength:wl,calculateHoursUntilStarving:Qw,getHungerDrainPerHour:yl},Symbol.toStringTag,{value:"Module"})),Vp={init(){},isReady(){return  true},crop:{calculateSize:hl,calculateSellPrice:ft,calculateProgress:Gw,isReady:zw,getData:Ha},pet:{calculateAge:ja,calculateMaxStrength:Ua,calculateCurrentStrength:Wa,isMature:Va,calculateStrengthPerHour:Up,getData:no},mutation:{calculateMultiplier:Hp,getValue:Nw,isGrowth:$w,isEnvironmental:Bw},xp:Jw,feed:Zw};async function Xp(e){const t=[{name:"Data",init:()=>X.init()},{name:"CustomModal",init:()=>An.init()},{name:"Sprites",init:()=>z.init()},{name:"TileObjectSystem",init:()=>Pt.init()},{name:"Pixi",init:()=>Na.init()},{name:"Audio",init:()=>Ba.init()},{name:"Cosmetics",init:()=>ml.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Cl=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:pn,MGAudio:Ba,MGCalculators:Vp,MGCosmetic:ml,MGCustomModal:An,MGData:X,MGEnvironment:Ke,MGManifest:Tt,MGPixi:Na,MGPixiHooks:ot,MGSprite:z,MGTile:Pt,MGVersion:Hs,PET_ABILITY_ACTIONS:zu,filterPetAbilityLogs:ju,formatAbilityLog:Uu,initAllModules:Xp,isPetAbilityAction:Hu},Symbol.toStringTag,{value:"Module"}));function eS(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function tS(e){return e.toLowerCase()}function io(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=true,size:c="md",onClick:d,variant:l="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=h("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),c==="sm"?g.classList.add("badge--sm"):c==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),d&&g.addEventListener("click",d);let m=false,b=i;function y(){m||(b===false?g.style.border="none":g.style.border="");}function C(k,T=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${k}`,`badge--${T}`),y();}function S(k){const T=(k??"").trim();T?(g.style.border=T,m=true):(m=false,y());}function v(k){b=k,y();}function A(k){g.textContent=k;}function x(k,T=o){C(k,T);}function w(k){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const T=eS(k);if(!T){g.textContent=String(k??"—");return}g.textContent=T,g.classList.add("badge--rarity",`badge--rarity-${tS(T)}`);}function _(k,T){const B=X.get("abilities")?.[k],Y=B?.color,H=Y?.bg||"rgba(100, 100, 100, 0.9)",q=Y?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=T||B?.name||k||"Unknown Ability",g.style.background=H,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const j=()=>{g.style.background=q;},N=()=>{g.style.background=H;};g.removeEventListener("mouseenter",j),g.removeEventListener("mouseleave",N),g.addEventListener("mouseenter",j),g.addEventListener("mouseleave",N);}return l==="rarity"?w(u):l==="ability"?_(p,f):(g.textContent=n,C(r,o),typeof i=="boolean"&&v(i),a&&S(a)),{root:g,setLabel:A,setType:x,setBorder:S,setWithBorder:v,setRarity:w,setAbility:_}}const nS={expanded:false,sort:{key:null,dir:null},search:""},rS={categories:{}};async function oS(){const e=await zn("tab-test",{version:2,defaults:rS,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...nS}}function n(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,expanded:i}}});}function r(a,i,s){const c=e.get(),d=t(a);e.update({categories:{...c.categories,[a]:{...d,sort:{key:i,dir:s}}}});}function o(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,search:i}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const aS={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Mo(e){return e?aS[e]??0:0}class iS extends Ut{constructor(){super({id:"tab-test",label:"Test"});M(this,"stateCtrl",null);}async build(n){this.stateCtrl=await oS();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=h("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const a=z.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=h("span",{style:"opacity:0.5;"});return o.textContent="—",o}return io({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){const i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},c=Ds({columns:a,data:s(i.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});i.sort.key&&i.sort.dir&&c.sortBy(i.sort.key,i.sort.dir);const d=Bs({placeholder:"Search...",value:i.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=h("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);const u=h("div");return u.appendChild(l),u.appendChild(c.root),He({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=X.get("plants");if(!o)return null;for(const i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;const a=r.toLowerCase();for(const i of Object.values(o)){const s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){const r=X.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=X.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=X.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=X.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){const i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){const i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){const i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){const i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){const i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>Mo(a.rarity)-Mo(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!z.isReady())try{await z.init();}catch{return}const o=z.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);const i=o[a],c=z.getCategoryId(i).map(d=>{const l=`sprite/${i}/${d}`;return {name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(c.sort((d,l)=>Mo(d.rarity)-Mo(l.rarity)),c.length>0){const d=this.createDataCard(i,this.formatCategoryName(i),c,r);n.appendChild(d);}}}}function ye(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const qp=`
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

  /* Base mutation button (inactive state) */
  .mut-btn {
    padding: 8px 12px;
    min-height: 52px;
    border-radius: var(--card-radius, 12px);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: color-mix(in oklab, var(--bg) 12%, transparent);
    border: 2px solid color-mix(in oklab, var(--border) 40%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow: none;
    opacity: 0.8;
    width: 100%;
  }

  /* Active state - full opacity */
  .mut-btn.active {
    opacity: 1;
  }

  /* Rainbow mutation - special gradient */
  .mut-btn--rainbow.active {
    background: linear-gradient(
      135deg,
      rgba(255, 0, 0, 0.3) 0%,
      rgba(255, 165, 0, 0.3) 20%,
      rgba(255, 255, 0, 0.3) 40%,
      rgba(0, 128, 0, 0.3) 60%,
      rgba(0, 0, 255, 0.3) 80%,
      rgba(75, 0, 130, 0.3) 100%
    );
    border-color: #fff9c4;
    box-shadow: 0 4px 18px rgba(255, 255, 255, 0.25);
  }

  /* Gold mutation */
  .mut-btn--gold.active {
    background: color-mix(in oklab, var(--mut-gold) 25%, transparent);
    border-color: var(--mut-gold);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-gold) 30%, transparent);
  }

  /* Wet mutation */
  .mut-btn--wet.active {
    background: color-mix(in oklab, var(--mut-wet) 25%, transparent);
    border-color: var(--mut-wet);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-wet) 30%, transparent);
  }

  /* Chilled mutation */
  .mut-btn--chilled.active {
    background: color-mix(in oklab, var(--mut-chilled) 25%, transparent);
    border-color: var(--mut-chilled);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-chilled) 30%, transparent);
  }

  /* Frozen mutation */
  .mut-btn--frozen.active {
    background: color-mix(in oklab, var(--mut-frozen) 25%, transparent);
    border-color: var(--mut-frozen);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-frozen) 30%, transparent);
  }

  /* Dawnlit mutation */
  .mut-btn--dawnlit.active {
    background: color-mix(in oklab, var(--mut-dawnlit) 25%, transparent);
    border-color: var(--mut-dawnlit);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-dawnlit) 30%, transparent);
  }

  /* Dawncharged mutation */
  .mut-btn--dawncharged.active {
    background: color-mix(in oklab, var(--mut-dawncharged) 25%, transparent);
    border-color: var(--mut-dawncharged);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-dawncharged) 30%, transparent);
  }

  /* Ambershine mutation */
  .mut-btn--ambershine.active {
    background: color-mix(in oklab, var(--mut-ambershine) 25%, transparent);
    border-color: var(--mut-ambershine);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-ambershine) 30%, transparent);
  }

  /* Ambercharged mutation */
  .mut-btn--ambercharged.active {
    background: color-mix(in oklab, var(--mut-ambercharged) 25%, transparent);
    border-color: var(--mut-ambercharged);
    box-shadow: 0 4px 12px color-mix(in oklab, var(--mut-ambercharged) 30%, transparent);
  }
`,sS={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Zt=null;async function lS(){if(Zt)return Zt;Zt=await zn("tab-auto-favorite",{version:1,defaults:sS});const e=ve(Se.AUTO_FAVORITE_UI,null);return e&&(await Zt.set(e),Jg(Se.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Zt}function lt(){if(!Zt)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Zt}const kl=Se.AUTO_FAVORITE,Kp={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function dn(){return ve(kl,Kp)}function _l(e){we(kl,e);}function Yp(e){const n={...dn(),...e};return _l(n),n}function Al(e){const t=dn();return t.mode="simple",t.simple={...t.simple,...e},_l(t),t}function cS(e){Al({favoriteSpecies:e});}function dS(e){Al({favoriteMutations:e});}function $c(){return dn().enabled}function gt(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let i=0;i<e.length;i++)if(!gt(e[i],t[i]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return  false;for(const i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!gt(n[i],r[i]))return  false;return  true}const Dc={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Bc={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function uS(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function pS(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function fS(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function gS(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function mS(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Gc(e){return {position:uS(e),tile:pS(e),garden:fS(e),object:gS(e),plant:mS(e)}}function zc(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function hS(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!gt(e.data,t.data)}function bS(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!gt(e.sortedSlotIndices,t.sortedSlotIndices)?true:!gt(e.slots,t.slots)}function xS(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function yS(){let e=Bc,t=Bc,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(Dc),s=new Set;function c(){if(s.size<i.length)return;const l=Gc(a);if(!gt(e,l)&&(t=e,e=l,!!n)){for(const u of o.all)u(e,t);if(zc(t)!==zc(e))for(const u of o.stable)u(e,t);if(hS(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(bS(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(xS(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const l=i.map(async u=>{const p=Dc[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=Gc(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let vi=null;function Je(){return vi||(vi=yS()),vi}function vS(){let e=null;const t=[],n=new Set,r={},o=new Set,a=2;function i(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function c(u,p){const{cols:f,rows:g}=u,m=f*g,b=new Set,y=new Set,C=new Map,S=[],v=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],A=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],x=Math.max(v.length,A.length);for(let k=0;k<x;k++){const T=v[k]??[],E=A[k]??[],B=T.map((H,q)=>(b.add(H),C.set(H,k),{globalIndex:H,localIndex:q,position:i(f,H)})),Y=E.map((H,q)=>(y.add(H),C.set(H,k),{globalIndex:H,localIndex:q,position:i(f,H)}));S.push({userSlotIdx:k,dirtTiles:B,boardwalkTiles:Y,allTiles:[...B,...Y]});}const w=u.spawnTiles.map(k=>i(f,k)),_={};if(u.locations)for(const[k,T]of Object.entries(u.locations)){const E=T.spawnTileIdx??[];_[k]={name:k,spawnTiles:E,spawnPositions:E.map(B=>i(f,B))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:w,locations:_,userSlots:S,globalToXY(k){return i(f,k)},xyToGlobal(k,T){return s(f,k,T)},getTileOwner(k){return C.get(k)??null},isDirtTile(k){return b.has(k)},isBoardwalkTile(k){return y.has(k)}}}function d(){if(o.size<a||e)return;const u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(const f of n)f(e);n.clear();}}async function l(){const u=await ge.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await ge.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let wi=null;function ps(){return wi||(wi=vS()),wi}function wS(){const e=X.get("mutations");return e?Object.keys(e):[]}function Jp(){const e={};for(const t of wS())e[t]=[];return e}function fs(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Jp()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Hc(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function SS(e,t,n,r){const o=t.slots.filter(a=>r>=a.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function CS(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime,fruitCount:1}}function kS(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function jc(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Uc(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return fs();const a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],c=i?.boardwalkTiles??[],d=[],l=[],u=[],p={},f=[],g=[],m=[],b=[],y=Jp(),C=[],S=[],v=[],A={},x=[],w=[],_={},k=new Set,T=new Set;for(const[H,q]of Object.entries(n.tileObjects)){const j=parseInt(H,10);k.add(j);const N=a?a.globalToXY(j):{x:0,y:0};if(q.objectType==="plant"){const D=q,G=SS(H,D,N,o);d.push(G),G.isMature?l.push(G):u.push(G),p[G.species]||(p[G.species]=[]),p[G.species].push(G);for(let $=0;$<D.slots.length;$++){const I=D.slots[$],O=CS(H,N,$,I,o);if(f.push(O),O.isMature?g.push(O):m.push(O),O.mutations.length>0){b.push(O);for(const F of O.mutations)y[F]||(y[F]=[]),y[F].push(O);}}}else if(q.objectType==="egg"){const G=kS(H,q,N,o);C.push(G),A[G.eggId]||(A[G.eggId]=[]),A[G.eggId].push(G),G.isMature?S.push(G):v.push(G);}else if(q.objectType==="decor"){const G=jc(H,q,N,"tileObjects");x.push(G),_[G.decorId]||(_[G.decorId]=[]),_[G.decorId].push(G);}}for(const[H,q]of Object.entries(n.boardwalkTileObjects)){const j=parseInt(H,10);T.add(j);const N=a?a.globalToXY(j):{x:0,y:0},G=jc(H,q,N,"boardwalk");w.push(G),_[G.decorId]||(_[G.decorId]=[]),_[G.decorId].push(G);}const E=[...x,...w],B=s.filter(H=>!k.has(H.localIndex)),Y=c.filter(H=>!T.has(H.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:m,mutated:{all:b,byMutation:y}},eggs:{all:C,mature:S,growing:v,byType:A,count:C.length},decors:{tileObjects:x,boardwalk:w,all:E,byType:_,count:E.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:B,boardwalk:Y}},counts:{plants:d.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:C.length,matureEggs:S.length,decors:E.length,emptyTileObjects:B.length,emptyBoardwalk:Y.length}}}function _S(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function AS(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function TS(e,t,n){const r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{const i=`${a.tileIndex}:${a.slotIndex}`;return !r.has(i)&&o.has(i)})}function PS(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function IS(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const a=r.get(o.tileIndex);if(!a)continue;const i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){const c=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime,fruitCount:1};n.push({crop:g,added:l,removed:u});}}}return n}function ES(e,t,n){const r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(const i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(const i of e){const s=o.get(i.tileIndex);if(!s)continue;const c=Math.min(i.slots.length,s.slots.length);for(let d=0;d<c;d++){const l=i.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){const p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true,fruitCount:1};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){const l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;const u=i.slots[d];if(!u)continue;const p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true,fruitCount:1};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function MS(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function LS(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!a.has(n(c)));return {added:i,removed:s}}function RS(){let e=fs(),t=fs(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=Uc(a,ps);if(gt(e,l)||(t=e,e=l,!n))return;for(const S of o.all)S(e,t);if(Hc(t)!==Hc(e))for(const S of o.stable)S(e,t);const u=_S(t.plants.all,e.plants.all);for(const S of u.added)for(const v of o.plantAdded)v({plant:S});for(const S of u.removed)for(const v of o.plantRemoved)v({plant:S,tileIndex:S.tileIndex});const p=AS(t.plants.mature,e.plants.mature,e.plants.all);for(const S of p)for(const v of o.plantMatured)v({plant:S});const f=IS(t.plants.all,e.plants.all);for(const S of f)for(const v of o.cropMutated)v(S);const g=TS(t.crops.mature,e.crops.mature,e.crops.all);for(const S of g)for(const v of o.cropMatured)v({crop:S});const m=ES(t.plants.all,e.plants.all,t.crops.all);for(const S of m)for(const v of o.cropHarvested)v(S);const b=MS(t.eggs.all,e.eggs.all);for(const S of b.added)for(const v of o.eggPlaced)v({egg:S});for(const S of b.removed)for(const v of o.eggRemoved)v({egg:S});const y=PS(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const S of y)for(const v of o.eggMatured)v({egg:S});const C=LS(t.decors.all,e.decors.all);for(const S of C.added)for(const v of o.decorPlaced)v({decor:S});for(const S of C.removed)for(const v of o.decorRemoved)v({decor:S});}async function d(){if(n)return;const l=await ry.onChangeNow(p=>{a.garden=p,i.add("garden"),c();});r.push(l);const u=await ge.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),c();});r.push(u),n=true,i.size===s&&(e=Uc(a,ps));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let Si=null;function Qp(){return Si||(Si=RS()),Si}const Wc={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Vc(e,t){const n=ja(e.xp),r=Ua(e.petSpecies,e.targetScale),o=Wa(e.petSpecies,e.xp,r),a=Va(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function OS(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=ja(e.slot.xp),a=Ua(e.slot.petSpecies,e.slot.targetScale),i=Wa(e.slot.petSpecies,e.slot.xp,a),s=Va(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}const Xc=500;let bt=[],oa=0;function FS(){try{const e=ve(zt.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(oa=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function NS(e){try{we(zt.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function $S(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function DS(e){if(!e||!Array.isArray(e))return;const t=ju(e),n=[];for(const r of t)if(r.timestamp>oa){const o=$S(r);o&&n.push(o);}n.length!==0&&(oa=Math.max(...n.map(r=>r.performedAt),oa),bt=[...n,...bt],bt.length>Xc&&(bt=bt.slice(0,Xc)),NS(bt),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${bt.length})`));}function qc(e){const t=new Set,n=[];for(const f of e.active??[]){const g=OS(f,e.slotInfos??{});n.push(g),t.add(g.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Vc(f,"inventory");r.push(g),t.add(g.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Vc(f,"hutch");o.push(g),t.add(g.id);}const a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(f=>f.id===i)??null:null,l=Qp().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},hutch:{hasHutch:l,currentItems:u,maxItems:25},expandedPetSlotId:i,expandedPet:s,abilityLogs:[...bt]}}const Kc={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function BS(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Yc(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function GS(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Yc),r=t.all.map(Yc);return BS(n,r)}function zS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location});}return n}function HS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function jS(e,t){const n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function US(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage});}return n}function WS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength});}return n}function VS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o});}return n}function XS(){let e=Kc,t=Kc,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(Wc),s=new Set;function c(){if(s.size<i.length)return;if(a.activityLogs){const y=a.activityLogs?.activityLogs||a.activityLogs;Array.isArray(y)&&DS(y);}const l=qc(a);if(gt(e,l)||(t=e,e=l,!n))return;for(const y of o.all)y(e,t);if(!GS(t,e))for(const y of o.stable)y(e,t);const u=zS(t,e);for(const y of u)for(const C of o.location)C(y);const p=HS(t,e);for(const y of p)for(const C of o.ability)C(y);const f=jS(t,e);if(f)for(const y of o.count)y(f);const g=US(t,e);for(const y of g)for(const C of o.growth)C(y);const m=WS(t,e);for(const y of m)for(const C of o.strengthGain)C(y);const b=VS(t,e);for(const y of b)for(const C of o.maxStrength)C(y);if(t.expandedPetSlotId!==e.expandedPetSlotId){const y={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const C of o.expandedPet)C(y);}}async function d(){if(n)return;bt=FS(),console.log(`[myPets] Loaded ${bt.length} ability logs from storage`);const l=i.map(async u=>{const p=Wc[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=qc(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let Ci=null;function Wn(){return Ci||(Ci=XS()),Ci}const Jc={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Qc={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Zc(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:a}}function ed(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function qS(e,t){return ed(e)===ed(t)}function KS(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Lo(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function YS(e,t){const n=new Set(e.map(Lo)),r=new Set(t.map(Lo)),o=t.filter(i=>!n.has(Lo(i))),a=e.filter(i=>!r.has(Lo(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function JS(e,t){const n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function QS(){let e=Qc,t=Qc,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Jc),s=new Set;function c(){if(s.size<i.length)return;const l=Zc(a);if(gt(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!qS(t,e))for(const f of o.stable)f(e,t);if(KS(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const u=YS(t.items,e.items);if(u)for(const f of o.items)f(u);const p=JS(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const l=i.map(async u=>{const p=Jc[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=Zc(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let ki=null;function mn(){return ki||(ki=QS()),ki}const gs={all:[],host:null,myPlayer:null,count:0};function ZS(e,t,n){const r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function td(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return gs;const a=new Map;Array.isArray(r)&&r.forEach((d,l)=>{d?.type==="user"&&d?.playerId&&a.set(d.playerId,{slot:d,index:l});});const i=t.map(d=>ZS(d,n,a)),s=i.find(d=>d.isHost)??null,c=o!==null?i.find(d=>d.slotIndex===o)??null:null;return {all:i,host:s,myPlayer:c,count:i.length}}function nd(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function eC(e,t){const n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(const a of t)r.has(a.id)||n.push({player:a,type:"join"});for(const a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function tC(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function nC(){let e=gs,t=gs,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=4;function c(){if(i.size<s)return;const l=td(a);if(gt(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(nd(t)!==nd(e))for(const m of o.stable)m(e,t);const u=eC(t.all,e.all);for(const m of u)for(const b of o.joinLeave)b(m);const p=tC(t.all,e.all);for(const m of p)for(const b of o.connection)b(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const b of o.host)b(m);}}async function d(){if(n)return;const l=await ty.onChangeNow(g=>{a.players=g,i.add("players"),c();});r.push(l);const u=await ny.onChangeNow(g=>{a.hostPlayerId=g,i.add("hostPlayerId"),c();});r.push(u);const p=await ey.onChangeNow(g=>{a.userSlots=g,i.add("userSlots"),c();});r.push(p);const f=await ge.subscribe("myUserSlotIdxAtom",g=>{a.myUserSlotIndex=g,i.add("myUserSlotIndex"),c();});r.push(f),n=true,i.size===s&&(e=td(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let _i=null;function Tl(){return _i||(_i=nC()),_i}const Zp=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:Tl},Symbol.toStringTag,{value:"Module"})),so=["seed","tool","egg","decor"];function rC(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function oC(e,t,n){const r=rC(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function aC(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>oC(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:c}}function rd(e){const t=e.shops,n=e.purchases??{},r=so.map(s=>aC(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null);let i=null;if(a.length>0){const c=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:i}}const od={all:so.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function ad(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function iC(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function sC(e,t){const n=[];for(const r of so){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function lC(e,t){const n=[];for(const r of so){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function cC(){let e=od,t=od,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=rd(a);if(gt(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if(ad(t)!==ad(e))for(const g of o.stable)g(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of so){const m=iC(t.byType[g],e.byType[g]);if(m)for(const b of u[g])b(m);}const p=sC(t,e);for(const g of p)for(const m of o.purchase)m(g);const f=lC(t,e);for(const g of f)for(const m of o.availability)m(g);}async function d(){if(n)return;const l=await oy.onChangeNow(p=>{a.shops=p,i.add("shops"),c();});r.push(l);const u=await ay.onChangeNow(p=>{a.purchases=p,i.add("purchases"),c();});r.push(u),n=true,i.size===s&&(e=rd(a));}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(f=>f.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let Ai=null;function Pl(){return Ai||(Ai=cC()),Ai}const dC=["Sunny","Rain","Frost","Dawn","AmberMoon"];function uC(e){return dC.includes(e)}const ms={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function pC(e){if(!e)return ms;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return {type:uC(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function fC(){let e=ms,t=ms,n=false,r=null;const o={all:new Set,change:new Set};function a(s){const c=pC(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const d={current:e,previous:t};for(const l of o.change)l(d);}}}async function i(){n||(r=await iy.onChangeNow(s=>{a(s);}),n=true);}return i(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let Ti=null;function gC(){return Ti||(Ti=fC()),Ti}let $e=null;function ef(){return $e||($e={currentTile:Je(),myPets:Wn(),gameMap:ps(),myInventory:mn(),players:Tl(),shops:Pl(),weather:gC(),myGarden:Qp()},$e)}function kt(){if(!$e)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return $e}function mC(){$e&&($e.currentTile.destroy(),$e.myPets.destroy(),$e.gameMap.destroy(),$e.myInventory.destroy(),$e.players.destroy(),$e.shops.destroy(),$e.weather.destroy(),$e.myGarden.destroy(),$e=null);}const ce={get currentTile(){return kt().currentTile},get myPets(){return kt().myPets},get gameMap(){return kt().gameMap},get myInventory(){return kt().myInventory},get players(){return kt().players},get shops(){return kt().shops},get weather(){return kt().weather},get myGarden(){return kt().myGarden}};let aa=null;const Tr=new Set;function hs(){const e=dn();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Tr.clear(),aa=mn().subscribeItems(t=>{if(t.added.length>0){const n=dn();for(const r of t.added)bC(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function tf(){aa&&(aa(),aa=null),Tr.clear(),console.log("🛑 [AutoFavorite] Stopped");}function hC(e){const t=dn();t.enabled=e,t.simple.enabled=e,Yp(t),e?hs():tf();}function bC(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Tr.has(e.id)||e.isFavorited||e.favorited)&&nf(e,t.simple)){Tr.add(e.id);try{za(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),Tr.delete(e.id);}}}function nf(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function xC(){return Object.keys(X.get("mutations")??{})}const Il={init(){this.isReady()||hs();},isReady(){return $c()},DEFAULT_CONFIG:Kp,STORAGE_KEY:kl,loadConfig:dn,saveConfig:_l,updateConfig:Yp,updateSimpleConfig:Al,setFavoriteSpecies:cS,setFavoriteMutations:dS,isEnabled:$c,start:hs,stop:tf,setEnabled:hC,shouldFavorite:nf,getGameMutations:xC},El=Se.JOURNAL_CHECKER,rf={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function Vn(){return ve(El,rf)}function qa(e){we(El,e);}function id(){return Vn().enabled}function yC(e){const t=Vn();t.autoRefresh=e,qa(t);}function vC(e){const t=Vn();t.refreshIntervalMs=e,qa(t);}let Pi=null,sd=null;function of(){try{return Tl().get().myPlayer?.journal||null}catch{return null}}function wC(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function af(){const e=X.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function sf(){const e=X.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function SC(){return Object.keys(X.get("mutations")??{})}function lf(e){const n=(X.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(a=>r.add(a));}),[...r]}function cf(e){const t=X.get("plants")??{},n=Object.keys(t),r=af(),o=e?.produce??{},a=[];let i=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));i+=u.length,a.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=a.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0}}function df(e){const t=X.get("pets")??{},n=Object.keys(t),r=sf(),o=e?.pets??{},a=[];let i=0,s=0,c=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(C=>C.variant)??[],g=p?.abilitiesLogged?.map(C=>C.ability)??[],m=r.filter(C=>!f.includes(C)),b=lf(u),y=b.filter(C=>!g.includes(C));s+=r.length,i+=f.length,d+=b.length,c+=Math.min(g.length,b.length),a.push({species:u,variantsLogged:f,variantsMissing:m,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:y,abilitiesTotal:b.length,abilitiesPercentage:b.length>0?g.length/b.length*100:0,isComplete:m.length===0&&(b.length===0||y.length===0)});}const l=a.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0,abilitiesTotal:d,abilitiesLogged:c,abilitiesPercentage:d>0?c/d*100:0}}async function Ka(e=false){await X.waitForAny();const t=of(),n=wC(t);if(!e&&Pi&&n===sd)return Pi;const r={plants:cf(t),pets:df(t),lastUpdated:Date.now()};return Pi=r,sd=n,r}async function CC(){const e=await Ka();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let Pr=null;function bs(){const e=Vn();e.enabled&&(e.autoRefresh&&!Pr&&(Pr=setInterval(async()=>{const t=await Ka();Ml(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function uf(){Pr&&(clearInterval(Pr),Pr=null);}function kC(e){const t=Vn();t.enabled=e,qa(t),e?bs():uf();}function Ml(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function _C(){const e=await Ka();return Ml(e),e}const pf={init(){this.isReady()||bs();},isReady(){return id()},DEFAULT_CONFIG:rf,STORAGE_KEY:El,loadConfig:Vn,saveConfig:qa,isEnabled:id,setAutoRefresh:yC,setRefreshInterval:vC,getMyJournal:of,getCropVariants:af,getPetVariants:sf,getAllMutations:SC,getPetAbilities:lf,calculateProduceProgress:cf,calculatePetProgress:df,aggregateJournalProgress:Ka,getMissingSummary:CC,start:bs,stop:uf,setEnabled:kC,refresh:_C,dispatchUpdate:Ml},Ll=Se.BULK_FAVORITE,ff={enabled:false,position:"top-right"};function lo(){return ve(Ll,ff)}function gf(e){we(Ll,e);}function AC(e){const t=lo();t.position=e,gf(t);}function mf(){return lo().enabled}function TC(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function PC(e){const t=mn().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!TC(o))continue;const a=n.has(o.id);e&&a||!e&&!a||(await za(o.id,e),r++,await IC(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function IC(e){return new Promise(t=>setTimeout(t,e))}let Ro=false;const Ca={init(){Ro||(Ro=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return Ro},DEFAULT_CONFIG:ff,STORAGE_KEY:Ll,loadConfig:lo,saveConfig:gf,isEnabled:mf,setPosition:AC,bulkFavorite:PC,destroy(){Ro=false;}};class EC{constructor(){M(this,"achievements",new Map);M(this,"data");M(this,"STORAGE_KEY",Se.ACHIEVEMENTS);M(this,"onUnlockCallbacks",[]);M(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return ve(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){we(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;const s=o>=n.target;return !r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Ir=null;function ct(){return Ir||(Ir=new EC),Ir}function MC(){Ir&&(Ir=null);}let Oo=false;const hf={init(){Oo||(ct(),Oo=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Oo},getManager(){return ct()},register:(...e)=>ct().register(...e),registerMany:(...e)=>ct().registerMany(...e),isUnlocked:(...e)=>ct().isUnlocked(...e),getAll:()=>ct().getAllAchievements(),getUnlocked:()=>ct().getUnlockedAchievements(),getStats:()=>ct().getCompletionStats(),checkAll:()=>ct().checkAllAchievements(),onUnlock:(...e)=>ct().onUnlock(...e),onProgress:(...e)=>ct().onProgress(...e),destroy(){MC(),Oo=false;}},LC={enabled:true},bf=Se.ANTI_AFK,RC=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],OC=25e3,FC=1,NC=1e-5,le={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function $C(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),le.listeners.push({type:n,handler:r,target:t});};for(const t of RC)e(document,t),e(window,t);}function DC(){for(const{type:e,handler:t,target:n}of le.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}le.listeners.length=0;}function BC(){const e=Object.getPrototypeOf(document);le.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),le.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),le.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function GC(){const e=Object.getPrototypeOf(document);try{le.savedProps.hidden&&Object.defineProperty(e,"hidden",le.savedProps.hidden);}catch{}try{le.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",le.savedProps.visibilityState);}catch{}try{le.savedProps.hasFocus&&(document.hasFocus=le.savedProps.hasFocus);}catch{}}function ka(){le.audioCtx&&le.audioCtx.state!=="running"&&le.audioCtx.resume?.().catch(()=>{});}function zC(){try{const e=window.AudioContext||window.webkitAudioContext;le.audioCtx=new e({latencyHint:"interactive"}),le.gainNode=le.audioCtx.createGain(),le.gainNode.gain.value=NC,le.oscillator=le.audioCtx.createOscillator(),le.oscillator.frequency.value=FC,le.oscillator.connect(le.gainNode).connect(le.audioCtx.destination),le.oscillator.start(),document.addEventListener("visibilitychange",ka,{capture:!0}),window.addEventListener("focus",ka,{capture:!0});}catch{xf();}}function xf(){try{le.oscillator?.stop();}catch{}try{le.oscillator?.disconnect(),le.gainNode?.disconnect();}catch{}try{le.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",ka,{capture:true}),window.removeEventListener("focus",ka,{capture:true}),le.oscillator=null,le.gainNode=null,le.audioCtx=null;}function HC(){const e=document.querySelector("canvas")||document.body||document.documentElement;le.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},OC);}function jC(){le.heartbeatInterval!==null&&(clearInterval(le.heartbeatInterval),le.heartbeatInterval=null);}function Ii(){BC(),$C(),zC(),HC();}function Ei(){jC(),xf(),DC(),GC();}let Fo=false,Ze=false;function xn(){return ve(bf,LC)}function Mi(e){we(bf,e);}const sn={init(){if(Fo)return;const e=xn();Fo=true,e.enabled?(Ii(),Ze=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Fo},isRunning(){return Ze},isEnabled(){return xn().enabled},enable(){const e=xn();e.enabled=true,Mi(e),Ze||(Ii(),Ze=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=xn();e.enabled=false,Mi(e),Ze&&(Ei(),Ze=false,console.log("[MGAntiAfk] Disabled"));},toggle(){sn.isEnabled()?sn.disable():sn.enable();},getConfig(){return xn()},updateConfig(e){const n={...xn(),...e};Mi(n),n.enabled&&!Ze?(Ii(),Ze=true):!n.enabled&&Ze&&(Ei(),Ze=false);},destroy(){Ze&&(Ei(),Ze=false),Fo=false,console.log("[MGAntiAfk] Destroyed");}},yf=Se.PET_TEAM,UC={enabled:false,teams:[],activeTeamId:null},Rl=3,ld=50,Pe="";function Ne(){return ve(yf,UC)}function Wt(e){we(yf,e);}function WC(e){const n={...Ne(),...e};return Wt(n),n}function VC(){return Ne().enabled}function XC(e){WC({enabled:e});}function qC(){return crypto.randomUUID()}function xs(){return Date.now()}function vf(e=[]){const t=[...e];for(;t.length<Rl;)t.push(Pe);return [t[0]||Pe,t[1]||Pe,t[2]||Pe]}function wf(e,t){const n=Ne(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function Sf(e,t){const n=Ne();if(!e.some(a=>a!==Pe))return  true;const o=[...e].sort().join(",");return !n.teams.some(a=>a.id===t?false:[...a.petIds].sort().join(",")===o)}function Cf(e){const n=Wn().get(),r=new Set(n.all.map(a=>a.id)),o=Ne();for(const a of o.teams)for(const i of a.petIds)i!==Pe&&r.add(i);for(const a of e)if(a!==Pe&&!r.has(a))return  false;return  true}function kf(e){const n=Wn().get(),r=new Map(n.all.map(a=>[a.id,a])),o=[];for(const a of e.petIds){if(a===Pe)continue;const i=r.get(a);i&&o.push(i);}return o}function KC(e){return e.petIds.every(t=>t!==Pe)}function YC(e){const t=[];for(let n=0;n<Rl;n++)e.petIds[n]===Pe&&t.push(n);return t}function JC(e){return e.petIds.filter(t=>t!==Pe).length}function QC(e){return e.petIds.every(t=>t===Pe)}function ZC(e,t){return e.petIds.includes(t)}function e1(e,t){return e.petIds.indexOf(t)}function t1(e,t=[]){const n=Ne();if(n.teams.length>=ld)throw new Error(`Maximum number of teams (${ld}) reached`);if(!wf(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=vf(t);if(!Cf(o))throw new Error("One or more pet IDs do not exist");if(!Sf(o))throw new Error("A team with this exact composition already exists");const a={id:qC(),name:r,petIds:o,createdAt:xs(),updatedAt:xs()};return n.teams.push(a),Wt(n),a}function _f(e,t){const n=Ne(),r=n.teams.findIndex(i=>i.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const i=t.name.trim();if(!i)throw new Error("Team name cannot be empty");if(!wf(i,e))throw new Error(`Team name "${i}" already exists`);t.name=i;}if(t.petIds!==void 0){const i=vf(t.petIds);if(!Cf(i))throw new Error("One or more pet IDs do not exist");if(!Sf(i,e))throw new Error("A team with this exact composition already exists");t.petIds=i;}const a={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:xs()};return n.teams[r]=a,Wt(n),a}function n1(e){const t=Ne(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(Wt(t),true)}function r1(e){return Ne().teams.find(n=>n.id===e)??null}function o1(){return [...Ne().teams]}function a1(e){const t=Ne(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function i1(e){const t=Ne(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),Wt(t),true}function s1(e,t){try{return _f(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function l1(){const n=Wn().get().byLocation.active.map(o=>o.id).sort(),r=Ne();for(const o of r.teams){const a=o.petIds.filter(i=>i!=="").sort();if(a.length===n.length&&a.every((i,s)=>i===n[s]))return o.id}return null}function Af(){const e=l1(),t=Ne();return e!==t.activeTeamId&&(t.activeTeamId=e,Wt(t)),e}function Tf(e){const t=Ne();t.activeTeamId=e,Wt(t);}function c1(e){return Af()===e}function d1(e){const t=Wn(),n=mn(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const a=r.byLocation.active,i=e.petIds.filter(l=>l!==Pe).sort(),s=a.map(l=>l.id).sort();if(JSON.stringify(i)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const c=r.hutch,d=c.hasHutch?c.maxItems-c.currentItems:0;u1(e.petIds,d,r),Tf(e.id),console.log("[PetTeam] Team activated successfully");}function u1(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<Rl;a++){const i=e[a],s=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${s?.id.slice(0,8)??"empty"}, target=${i.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===i){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(i===Pe&&s){const c=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${c}`),p1(s.id,c),c&&o--;continue}if(!s&&i!==Pe){const d=n.all.find(l=>l.id===i)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${d}`),d&&o++,f1(i,n);continue}if(s&&i!==Pe){const d=n.all.find(u=>u.id===i)?.location==="hutch";d&&o++;const l=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${d}, storeInHutch=${l}`),g1(s.id,i,n,l),l&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function p1(e,t){Dp(e),t&&ul(e);}function f1(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&pl(e),Np(e);}function g1(e,t,n,r){const o=n.all.find(a=>a.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&pl(t),$p(e,t),r&&ul(e);}function m1(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function h1(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(r=>r&&typeof r=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function b1(e){const t=Date.now(),n=e.slots||[],r=[typeof n[0]=="string"?n[0]:Pe,typeof n[1]=="string"?n[1]:Pe,typeof n[2]=="string"?n[2]:Pe];return {name:e.name?.trim()||"Imported Team",petIds:r,createdAt:t,updatedAt:t}}function x1(){const e={success:false,source:"none",imported:0,errors:[]};if(!m1())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=h1();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=Ne();n.teams=[],n.activeTeamId=null;const r=new Set;for(const o of t)try{const a=b1(o);let i=a.name;if(r.has(i)){let c=1;for(;r.has(`${i} (${c})`);)c++;i=`${i} (${c})`;}r.add(i);const s={id:crypto.randomUUID(),name:i,petIds:a.petIds,createdAt:a.createdAt,updatedAt:a.updatedAt};n.teams.push(s),e.imported++;}catch(a){const i=a instanceof Error?a.message:String(a);e.errors.push(`Failed to import "${o.name}": ${i}`);}return e.imported>0&&(Wt(n),e.success=true,e.source="aries"),e}let No=false;const ae={init(){if(No)return;if(!Ne().enabled){console.log("[PetTeam] Feature disabled");return}No=true,console.log("[PetTeam] Feature initialized");},destroy(){No&&(No=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:VC,setEnabled:XC,createTeam:t1,updateTeam:_f,deleteTeam:n1,renameTeam:s1,getTeam:r1,getAllTeams:o1,getTeamByName:a1,reorderTeams:i1,getPetsForTeam:kf,isTeamFull:KC,getEmptySlots:YC,getFilledSlotCount:JC,isTeamEmpty:QC,isPetInTeam:ZC,getPetSlotIndex:e1,getActiveTeamId:Af,setActiveTeamId:Tf,isActiveTeam:c1,activateTeam:d1,importFromAries:x1},y1=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],Pf=Se.XP_TRACKER,v1={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},In="XP Tracker",En="[XpTracker]";function Xn(){return ve(Pf,v1)}function If(e){we(Pf,e);}function Ef(e){const n={...Xn(),...e};return If(n),n}function Mf(){return Xn().enabled}function w1(e){Ef({enabled:e});}function Ol(e){return y1.includes(e)}function S1(e){const t=X.get("abilities");if(!t)return null;const n=t[e];return !n||!Ol(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function Lf(e){return e.filter(Ol)}function Rf(e){return e.some(Ol)}function C1(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function Of(e,t,n,r=100){const o=S1(e);if(!o)return null;const a=C1(e),i=o.requiredWeather,s=i===null||n===i,c=t/r,d=c*c,l=o.baseProbability,u=o.bonusXp,p=l,f=Math.floor(u*d),g=p/100*60,m=s?Math.floor(g*f):0;return {abilityId:e,abilityName:o.name,tier:a,baseChancePerMinute:l,actualChancePerMinute:p,baseXpPerProc:u,actualXpPerProc:f,expectedProcsPerHour:g,expectedXpPerHour:m,requiredWeather:i,isActive:s}}function Ff(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=Lf(r.abilities);for(const a of o){const i=Of(a,r.strength,t,r.maxStrength||100);i&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:i}),i.isActive&&(n.totalBonusXpPerHour+=i.expectedXpPerHour,n.totalProcsPerHour+=i.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function Nf(e,t,n,r=100){const o=Lf(e);return o.length===0?null:Of(o[0],t,n,r)}function cd(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function k1(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function _1(e,t){return e.species.localeCompare(t.species)}function A1(e,t){return t.currentStrength-e.currentStrength}function T1(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function P1(e,t){return e.name.localeCompare(t.name)}function I1(e){switch(e){case "closestToMax":return cd;case "furthestFromMax":return k1;case "species":return _1;case "strength":return A1;case "location":return T1;case "name":return P1;default:return cd}}function $f(e,t){const n=I1(t);return [...e].sort(n)}function E1(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function M1(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function Df(e,t){let n=e;return n=E1(n,t.filterSpecies),n=M1(n,t.filterHasXpBoost),n=$f(n,t.sortBy),n}function er(e){const t=ae.getTeam(e);if(!t)return null;const n=Bf(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:Ee,bonusXpPerHour:0,totalXpPerHour:Ee,activeBoosterCount:0,totalProcsPerHour:0}};const r=ce.weather.get(),o=r.isActive?r.type:null,a=n.filter(l=>!l.isMature||Rf(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),i=Ff(a,o),s=[],c=L1(n,i.totalBonusXpPerHour);for(const l of n){const u=ys(l,o,i.totalBonusXpPerHour,c);s.push(u);}const d={baseXpPerHour:Ee,bonusXpPerHour:i.totalBonusXpPerHour,totalXpPerHour:Ee+i.totalBonusXpPerHour,activeBoosterCount:i.activeBoosterCount,totalProcsPerHour:i.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:d}}function Bf(e){const t=ce.myPets.get(),n=[];for(const r of e.petIds){if(!r)continue;const o=t.all.find(a=>a.id===r);o&&n.push(o);}return n}function L1(e,t){let n=0;for(const r of e){const o=oo(r.petSpecies,r.targetScale);if(ao(r.petSpecies,r.xp,o)>=o)continue;const i=r.hunger>0?Ee+t:0,s=Xa(r.petSpecies,r.xp,o,i>0?i:Ee);n=Math.max(n,s);}return n}function ys(e,t,n,r){const o=oo(e.petSpecies,e.targetScale),a=ao(e.petSpecies,e.xp,o),i=a>=o,s=e.hunger<=0,d=s?0:(s?0:Ee)+n,l=Nf(e.abilities,a,t),u=i?null:xl(e.petSpecies,e.xp,a,o,d>0?d:Ee),p=Xa(e.petSpecies,e.xp,o,d>0?d:Ee),f=u!==null?wl(e.petSpecies,e.hunger,u):null,g=Ur(e.petSpecies,e.hunger,p),m=i&&l&&r>0?Sl(true,true,e.petSpecies,e.hunger,0,r):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:a,maxStrength:o,isMaxStrength:i,xpPerHour:d,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:l,supportingFeeds:m,mutations:e.mutations,targetScale:e.targetScale}}function dd(e){const t=ae.getTeam(e);if(!t)return 0;const n=Bf(t);if(n.length===0)return 0;const r=n.map(o=>{const a=oo(o.petSpecies,o.targetScale);return ao(o.petSpecies,o.xp,a)/a*100});return r.reduce((o,a)=>o+a,0)/r.length}function ud(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let Gn=false,ia=null,Ya=[],Fl=null;function R1(e,t,n){const r=oo(e.petSpecies,e.targetScale),o=ao(e.petSpecies,e.xp,r),a=o>=r,i=e.hunger<=0,s=i?0:Ee,c=Nf(e.abilities,o,t);c?.isActive&&c.expectedXpPerHour;const d=e.location==="active"&&!i?s+n:0,l=xl(e.petSpecies,e.xp,o,r,d>0?d:Ee),u=Xa(e.petSpecies,e.xp,r,d>0?d:Ee),p=wl(e.petSpecies,e.hunger,l),f=Ur(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:i,currentStrength:o,maxStrength:r,isMaxStrength:a,hoursToNextStrength:l,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:d,xpBoostStats:c,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function Gf(){const e=ce.myPets.get(),t=ce.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(c=>!c.isMature||Rf(c.abilities)).filter(c=>c.hunger>0).map(c=>({petId:c.id,petName:c.name??"",abilities:c.abilities,strength:c.currentStrength})),a=Ff(o,n);Fl=a;const i=[];for(const c of e.all){const d=R1({id:c.id,petSpecies:c.petSpecies,name:c.name??"",xp:c.xp,hunger:c.hunger,targetScale:c.targetScale,abilities:c.abilities,mutations:c.mutations,location:c.location},n,a.totalBonusXpPerHour);i.push(d);}const s=Math.max(0,...i.map(c=>c.hoursToMaxStrength));for(const c of i)c.isMaxStrength&&c.xpBoostStats&&(c.feedsToMaxStrength=Sl(true,true,c.species,c.hunger,0,s));return i}function zf(){if(Gn)return;if(!Xn().enabled){console.log(`${En} ${In} disabled`);return}console.log(`${En} Initializing ${In}...`),X.isReady()&&(Ya=Gf()),Gn=true,console.log(`${En} ${In} initialized`);}function Nl(){return Gn&&X.isReady()}function $l(){return Nl()?Ya:[]}function O1(){return $l().filter(e=>e.location==="active")}function F1(){return Fl}function Dl(){Nl()&&(Ya=Gf());}function N1(e){Bl();const t=Xn(),n=e??t.updateIntervalMs;ia=setInterval(()=>{Mf()&&Dl();},n);}function Bl(){ia&&(clearInterval(ia),ia=null);}function Hf(){Gn&&(Bl(),Gn=false,Ya=[],Fl=null,console.log(`${En} ${In} destroyed`));}function $1(){const e=Xn();return Df($l(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function D1(e){w1(e),e?(Gn=false,zf(),X.isReady()&&Dl(),console.log(`${En} ${In} enabled`)):(Hf(),console.log(`${En} ${In} disabled`));}const _a={init:zf,isReady:Nl,destroy:Hf,loadConfig:Xn,saveConfig:If,updateConfig:Ef,isEnabled:Mf,setEnabled:D1,getAllPetsProgress:$l,getActivePetsProgress:O1,getCombinedBoostStats:F1,getFilteredPets:$1,refresh:Dl,startAutoUpdate:N1,stopAutoUpdate:Bl,sortPets:$f,filterAndSortPets:Df},Wr={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},Vr={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(Wr),...Object.keys(Vr)];function Gl(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in Wr){const o=Wr[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function zl(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in Vr){const o=Vr[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function Xr(e){let t=0,n=0;for(const r of e){const o=r.procRate*60;t+=o,n+=o*r.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Mn(e){return e.some(t=>t.abilities.some(n=>n in Wr))}function Ln(e){return e.some(t=>t.abilities.some(n=>n in Vr))}let Er=null,Ht=0;function jf(){const t=Je().get().plant;if(!t){Ht=0;return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;if(!n){Ht=0;return}Ht=ft(n.species,n.targetScale,n.mutations||[]),console.log(`[CropValueIndicator] Updated crop value: ${Ht} coins`);}function B1(e){const{current:t}=e;if(jf(),!t){console.log("[CropValueIndicator] No plant on current tile");return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n?console.log(`[CropValueIndicator] 💰 Crop Price: ${Ht} coins`,{species:t.species,slot:{index:t.currentSlotIndex,scale:n.targetScale,mutations:n.mutations||[]},plantInfo:{totalSlots:t.slots.length,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex}}):console.log("[CropValueIndicator] Plant Info:",{species:t.species,currentSlotIndex:t.currentSlotIndex,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex,totalSlots:t.slots.length,currentSlot:n,cropValue:Ht>0?`${Ht} coins`:"N/A"});}function G1(){Er&&(console.warn("[CropValueIndicator] Already monitoring, cleaning up previous subscription"),Uf()),console.log("[CropValueIndicator] Starting plant info monitoring..."),jf(),Er=Je().subscribePlantInfo(B1,{immediate:true}),console.log("[CropValueIndicator] Monitoring started");}function Uf(){Er&&(console.log("[CropValueIndicator] Stopping monitoring..."),Er(),Er=null,Ht=0,console.log("[CropValueIndicator] Monitoring stopped"));}function Ja(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function Wf(e,t){e.add(()=>t.disconnect());}const vs="css-qnqsp4",ws="css-v439q6";let Rn=Ja(),Ss=false,tr=false,sa=null,Cs=null,tn=null;const z1=`
  .gemini-qol-cropPrice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 6px;
  }

  .gemini-qol-cropPrice-sprite {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .gemini-qol-cropPrice-text {
    font-size: 14px;
    color: #FFD84D;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .gemini-qol-cropPrice {
      gap: 4px;
      margin-top: 4px;
    }

    .gemini-qol-cropPrice-sprite {
      width: 16px;
      height: 16px;
    }

    .gemini-qol-cropPrice-text {
      font-size: 12px;
    }
  }
`;function H1(){if(Ss)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=z1,document.head.appendChild(e),Rn.add(()=>e.remove()),Ss=true,console.log("[CropValueIndicator.render] Styles injected");}function j1(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const r=document.createElement("canvas");r.width=20,r.height=20,n.appendChild(r);const o=document.createElement("div");o.className="gemini-qol-cropPrice-text",o.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(o);try{const a=z.toCanvas("ui","Coin");if(a&&r.parentElement){const i=r.getContext("2d");if(i){const s=Math.min(r.width/a.width,r.height/a.height),c=a.width*s,d=a.height*s,l=(r.width-c)/2,u=(r.height-d)/2;i.drawImage(a,l,u,c,d);}}}catch(a){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",a);}return t}function U1(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const r of n){const o=r.textContent?.trim();if(!o)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(o)&&t.push(o);}return t}function W1(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const r=n.textContent?.trim();if(!r)continue;const o=r.match(/^([\d.]+)\s*kg$/i);if(o)return parseFloat(o[1])}return 1}function V1(){const e=[],t=document.querySelectorAll(`.${vs}`);for(const r of t)r.offsetParent&&(r.closest("button.chakra-button")||e.push({element:r}));const n=document.querySelectorAll(`.${ws}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelectorAll(":scope > .McFlex > .McFlex");if(o.length>0){const a=o[o.length-1];a.querySelector("p.chakra-text")&&e.push({element:a});}}return e}function X1(){const t=Je().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?ft(n.species,n.targetScale,n.mutations||[]):0}function q1(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(".gemini-qol-cropPrice-text");o&&(o.textContent=e>0?e.toLocaleString():"");}console.log("[CropValueIndicator.render] 🔄 Updated all prices:",{species:t.species,scale:t.targetScale,mutations:t.mutations||[],price:e,count:n.length});}function K1(){tn!==null&&cancelAnimationFrame(tn),tn=requestAnimationFrame(()=>{tn=null;const e=X1();if(e===Cs)return;Cs=e;const n=Je().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&q1(e,r);});}function nr(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t){console.log("[CropValueIndicator.render] No name element found in tooltip");return}const n=t.closest(".McFlex");if(!n){console.log("[CropValueIndicator.render] No McFlex container found");return}const o=Je().get().plant;let a=0;if(o&&o.currentSlotIndex!==null){const s=o.slots[o.currentSlotIndex];s&&(a=ft(s.species,s.targetScale,s.mutations||[]));}if(a===0){const s=t.textContent?.trim();if(s){const c=W1(n),d=U1(n);a=ft(s,c,d);}}const i=j1(a);n.appendChild(i),Rn.add(()=>i.remove()),console.log("[CropValueIndicator.render] ✅ Injected price:",{price:a});}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function Y1(){const e=V1();for(const n of e)nr(n);sa=Je().subscribePlantInfo(()=>{K1();});const t=new MutationObserver(n=>{for(const r of n)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.classList.contains(vs)&&(o.closest("button.chakra-button")||nr({element:o})),o.querySelectorAll(`.${vs}`).forEach(s=>{s.closest("button.chakra-button")||nr({element:s});}),o.classList.contains(ws)&&!o.closest("button.chakra-button")){const s=o.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const c=s[s.length-1];c.querySelector("p.chakra-text")&&!c.querySelector(".gemini-qol-cropPrice")&&nr({element:c});}}o.querySelectorAll(`.${ws}`).forEach(s=>{if(!s.closest("button.chakra-button")){const c=s.querySelectorAll(":scope > .McFlex > .McFlex");if(c.length>0){const d=c[c.length-1];d.querySelector("p.chakra-text")&&!d.querySelector(".gemini-qol-cropPrice")&&nr({element:d});}}});}});});t.observe(document.body,{childList:true,subtree:true}),Wf(Rn,t),console.log("[CropValueIndicator.render] Started observing crops");}const J1={init(){if(tr){console.log("[CropValueIndicator.render] Already initialized");return}tr=true,H1(),Y1(),console.log("✅ [CropValueIndicator.render] Initialized");},destroy(){tr&&(tr=false,tn!==null&&(cancelAnimationFrame(tn),tn=null),sa&&(sa(),sa=null),Rn.run(),Rn.clear(),Rn=Ja(),Ss=false,Cs=null,console.log("🛑 [CropValueIndicator.render] Destroyed"));},isEnabled(){return tr}},Vf=Se.CROP_VALUE_INDICATOR,Q1={enabled:false};function Hl(){return ve(Vf,Q1)}function Z1(e){we(Vf,e);}let qr=false;function Xf(){if(qr){console.log("[CropValueIndicator] Already initialized");return}if(!Hl().enabled){console.log("[CropValueIndicator] Disabled");return}qr=true,console.log("[CropValueIndicator] Initializing..."),G1(),console.log("[CropValueIndicator] Initialized successfully");}function qf(){qr&&(console.log("[CropValueIndicator] Destroying..."),Uf(),qr=false,console.log("[CropValueIndicator] Destroyed"));}function ek(){return qr}function tk(){return Hl().enabled}function nk(e){const t=Hl();if(t.enabled===e){console.log(`[CropValueIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,Z1(t),e?Xf():qf(),console.log(`[CropValueIndicator] ${e?"Enabled":"Disabled"}`);}const Mr={init:Xf,destroy:qf,isReady:ek,isEnabled:tk,setEnabled:nk,render:J1},Kr="css-qnqsp4",jl="css-1cdcuw7",Ul='[role="tooltip"]';let la=Ja(),rr=false,ca=null,ks=null,nn=null;function rk(){const e=[],t=document.querySelectorAll(`.${Kr}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const r=n.querySelector(`.${jl}`);r&&e.push({element:n,weightElement:r});}return e}function ok(){const t=Je().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?hl(n.species,n.targetScale):0}function ak(e,t){const n=document.querySelectorAll(`.${Kr}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(`.${jl}`);if(o){const a=o.querySelector("svg"),i=`${e}%`;o.textContent=i,a&&o.appendChild(a);}}Aa(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function ik(){nn!==null&&cancelAnimationFrame(nn),nn=requestAnimationFrame(()=>{nn=null;const e=ok();if(e===ks)return;ks=e;const n=Je().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&ak(e,r);});}function Kf(e,t){const n=X.get("plants");if(!n)return "";const r=n[e];return r?.crop?.baseWeight?`${(r.crop.baseWeight*t).toFixed(2)} kg`:""}function Aa(){const e=document.querySelectorAll(Ul),n=Je().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=Kf(r.species,r.targetScale);for(const a of e){if(!a.offsetParent)continue;const i=a.textContent?.trim();i&&i.startsWith("Size:")&&o&&(a.textContent=o);}}function Li(){const e=rk();for(const t of e)if(t.weightElement)try{const r=Je().get().plant;if(r&&r.currentSlotIndex!==null){const o=r.slots[r.currentSlotIndex];if(o){const a=hl(o.species,o.targetScale),i=t.weightElement.querySelector("svg");t.weightElement.textContent=`${a}%`,i&&t.weightElement.appendChild(i);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}Aa();}function sk(){const e=document.querySelectorAll(`.${Kr}`),n=Je().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=Kf(r.species,r.targetScale);for(const i of e){if(!i.offsetParent||i.closest("button.chakra-button"))continue;const s=i.querySelector(`.${jl}`);if(s){const c=s.querySelector("svg");s.textContent=o,c&&s.appendChild(c);}}const a=document.querySelectorAll(Ul);for(const i of a){if(!i.offsetParent)continue;const s=i.textContent?.trim();s&&!s.includes("kg")&&(i.textContent=o);}console.log("[CropSizeIndicator.render] Restored crop weights");}function lk(){Li(),ca=Je().subscribePlantInfo(()=>{ik();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.hasAttribute("role")&&r.getAttribute("role")==="tooltip"){const i=r.textContent?.trim();i&&i.startsWith("Size:")&&Aa();}r.classList.contains(Kr)&&(r.closest("button.chakra-button")||Li()),r.querySelectorAll(`.${Kr}`).length>0&&Li(),r.querySelectorAll(Ul).forEach(i=>{const s=i.textContent?.trim();s&&s.startsWith("Size:")&&Aa();});}});});e.observe(document.body,{childList:true,subtree:true}),Wf(la,e),console.log("[CropSizeIndicator.render] Started observing crops");}const Wl={init(){if(rr){console.log("[CropSizeIndicator.render] Already initialized");return}rr=true,lk(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){rr&&(rr=false,sk(),nn!==null&&(cancelAnimationFrame(nn),nn=null),ca&&(ca(),ca=null),la.run(),la.clear(),la=Ja(),ks=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return rr}},Yf=Se.CROP_SIZE_INDICATOR,ck={enabled:false};function Vl(){return ve(Yf,ck)}function dk(e){we(Yf,e);}let Yr=false;function Jf(){if(Yr){console.log("[CropSizeIndicator] Already initialized");return}if(!Vl().enabled){console.log("[CropSizeIndicator] Disabled");return}Yr=true,console.log("[CropSizeIndicator] Initializing..."),Wl.init(),console.log("[CropSizeIndicator] Initialized successfully");}function Qf(){Yr&&(console.log("[CropSizeIndicator] Destroying..."),Wl.destroy(),Yr=false,console.log("[CropSizeIndicator] Destroyed"));}function uk(){return Yr}function pk(){return Vl().enabled}function fk(e){const t=Vl();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,dk(t),e?Jf():Qf(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const Lr={init:Jf,destroy:Qf,isReady:uk,isEnabled:pk,setEnabled:fk,render:Wl},Zf=Se.SHOP_NOTIFIER,eg={seed:[],tool:[],egg:[],decor:[]},gk={enabled:false,trackedItems:eg},mk=["seed","tool","egg","decor"];function tg(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function co(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function qn(){const e=ve(Zf,gk);return {enabled:e?.enabled??false,trackedItems:tg(e?.trackedItems)}}function Qa(e){we(Zf,{enabled:e.enabled,trackedItems:co(e.trackedItems)});}function hk(e){const n={...qn(),...e};return e.trackedItems&&(n.trackedItems=tg(e.trackedItems)),Qa(n),n}function Xl(){return qn().enabled}function bk(e){hk({enabled:e});}function ng(){return co(qn().trackedItems)}function xk(){const e=ng(),t=[];for(const n of mk)for(const r of e[n])t.push({shopType:n,itemId:r});return t}function yk(e,t){const n=qn(),r=co(n.trackedItems),o=r[e];o.includes(t)||(o.push(t),Qa({...n,trackedItems:r}));}function vk(e,t){const n=qn(),r=co(n.trackedItems),o=r[e],a=o.filter(i=>i!==t);a.length!==o.length&&(r[e]=a,Qa({...n,trackedItems:r}));}function wk(){const e=qn();Qa({...e,trackedItems:co(eg)});}let Ta=false;const _s=[];function Sk(e,t){const n=ng()[e];if(!n.length)return [];const r=new Set(n);return t.items.filter(o=>r.has(o.id)&&o.isAvailable).map(o=>({itemId:o.id,remaining:o.remaining}))}function $o(e,t){const n=Sk(e,t.shop);n.length&&console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});}function Ck(){if(Ta)return;Ta=true;const e=Pl();_s.push(e.subscribeSeedRestock(t=>$o("seed",t)),e.subscribeToolRestock(t=>$o("tool",t)),e.subscribeEggRestock(t=>$o("egg",t)),e.subscribeDecorRestock(t=>$o("decor",t)));}function kk(){if(Ta){Ta=false;for(const e of _s)e();_s.length=0;}}let Jr=false;function rg(){if(Jr){console.log("[ShopNotifier] Already initialized");return}if(!Xl()){console.log("[ShopNotifier] Disabled");return}Jr=true,Ck(),console.log("[ShopNotifier] Initialized");}function og(){Jr&&(kk(),Jr=false,console.log("[ShopNotifier] Destroyed"));}function _k(){return Jr}function Ak(){return Xl()}function Tk(e){if(Xl()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}bk(e),e?rg():og(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const un={init:rg,destroy:og,isReady:_k,isEnabled:Ak,setEnabled:Tk,addTrackedItem:yk,removeTrackedItem:vk,getTrackedItems:xk,resetTrackedItems:wk};class ag{constructor(){M(this,"stats");M(this,"STORAGE_KEY",Se.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return ve(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){we(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let On=null;function Pk(){return On||(On=new ag),On}function Ik(){On&&(On.endSession(),On=null);}function ig(e){const t=ja(e.xp),n=Ua(e.petSpecies,e.targetScale),r=Wa(e.petSpecies,e.xp,n),o=Va(e.petSpecies,t),a=Up(e.petSpecies),i=jw(r,n,a),s=Uw(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function sg(e){return {...e,strength:ig(e)}}function lg(e){return e.map(sg)}function Ek(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=lg(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,a=t.length-o,i=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}const Mk=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:ig,enrichPetWithStrength:sg,enrichPetsWithStrength:lg,getPetStrengthStats:Ek},Symbol.toStringTag,{value:"Module"}));class cg{constructor(){M(this,"logs",[]);M(this,"maxLogs",1e3);M(this,"unsubscribe",null);M(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=ce.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(const a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp);}for(const a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(const i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp);}for(const i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return {totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let rn=null;function Lk(){return rn||(rn=new cg,rn.init()),rn}function Rk(){rn&&(rn.destroy(),rn=null);}const dg={StatsTracker:ag,getStatsTracker:Pk,destroyStatsTracker:Ik},ug={AbilityLogger:cg,getAbilityLogger:Lk,destroyAbilityLogger:Rk,...Mk},Ok=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:hf,MGAntiAfk:sn,MGAutoFavorite:Il,MGBulkFavorite:Ca,MGCropSizeIndicator:Lr,MGCropValueIndicator:Mr,MGJournalChecker:pf,MGPetTeam:ae,MGPets:ug,MGShopNotifier:un,MGTracker:dg,MGXPTracker:_a},Symbol.toStringTag,{value:"Module"})),dt=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],Fk={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function yn(e){return e?Fk[e]??0:0}class Nk extends Ut{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});M(this,"allPlants",[]);M(this,"allPets",[]);M(this,"sectionElement",null);}async build(n){await lS();const r=n.getRootNode();ye(r,qp,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await X.waitForAny(3e3).catch(()=>{}),await Promise.all([X.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),X.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=X.get("plants")||{},r=X.get("pets")||{};this.allPlants=Object.keys(n).sort((o,a)=>{const i=n[o]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,c=yn(i)-yn(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,a)=>{const i=r[o]?.rarity||null,s=r[a]?.rarity||null,c=yn(i)-yn(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(z.isReady())return;const n=1e4,r=100;let o=0;return new Promise(a=>{const i=()=>{z.isReady()||o>=n?a():(o+=r,setTimeout(i,r));};i();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=h("div",{className:"kv"}),r=Vd({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Fr({checked:lt().get().enabled,onChange:async a=>{const i=lt(),s=i.get();await i.set({...s,enabled:a}),await this.saveConfig();}});return n.append(r.root,o.root),He({title:"Auto-Favorite",padding:"lg"},n,h("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=h("div",{className:"u-col"}),r=h("div",{className:"mut-row"});r.appendChild(this.createMutationButton(dt[0])),r.appendChild(this.createMutationButton(dt[1])),n.appendChild(r);const o=h("div",{className:"mut-row"});o.appendChild(this.createMutationButton(dt[2])),o.appendChild(this.createMutationButton(dt[3])),o.appendChild(this.createMutationButton(dt[4])),n.appendChild(o);const a=h("div",{className:"mut-row"});a.appendChild(this.createMutationButton(dt[5])),a.appendChild(this.createMutationButton(dt[6])),n.appendChild(a);const i=h("div",{className:"mut-row"});return i.appendChild(this.createMutationButton(dt[7])),i.appendChild(this.createMutationButton(dt[8])),n.appendChild(i),He({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,h("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${lt().get().favoriteMutations.length} / ${dt.length} active`))}createMutationButton(n){let r=lt().get().favoriteMutations.includes(n.id);const a=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&a.push("active");const i=h("div",{className:a.join(" ")}),s=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(z.isReady()){const l=z.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});l.style.width="28px",l.style.height="28px",l.style.objectFit="contain",s.appendChild(l);}}catch{}const c=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=h("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},c);if(i.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const l=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(z.isReady()){const u=z.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",l.appendChild(u);}}catch{}i.append(l);}else {const l=h("div",{style:"width: 28px; flex-shrink: 0;"});i.append(l);}return i.addEventListener("click",async l=>{l.stopPropagation();const u=lt(),p=u.get();if(r){const g=p.favoriteMutations.filter(m=>m!==n.id);await u.set({...p,favoriteMutations:g}),r=false,i.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),r=true,i.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${lt().get().favoriteMutations.length} / ${dt.length} active`);}),i}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:lt().get().favoriteProduceList,onUpdate:async n=>{const r=lt(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:lt().get().favoritePetsList,onUpdate:async n=>{const r=lt(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:a,selected:i,onUpdate:s}=n;let c=new Set(i),d=o;const l=h("div",{style:"margin-bottom: 8px;"}),u=Bs({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:x=>{const w=x.trim().toLowerCase();w?d=o.filter(_=>_.toLowerCase().includes(w)):d=o,S.setData(m());}});l.appendChild(u.root);const p=h("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=qe({label:"Select All",variant:"default",size:"sm",onClick:()=>{const x=m().map(w=>w.id);S.setSelection(x);}}),g=qe({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{S.clearSelection();}});p.append(f,g);const m=()=>d.map(x=>({id:x,name:x,rarity:this.getItemRarity(x,a),selected:c.has(x)})),b=x=>{if(!x){const _=h("span",{style:"opacity:0.5;"});return _.textContent="—",_}return io({variant:"rarity",rarity:x,size:"sm"}).root},y=x=>{const w=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(z.isReady()){let _=a,k=x;a==="plant"&&(["Bamboo","Cactus"].includes(x)&&(_="tallplant"),x==="DawnCelestial"&&(k="DawnCelestialCrop"),x==="MoonCelestial"&&(k="MoonCelestialCrop"),x==="OrangeTulip"&&(k="Tulip"));const T=z.toCanvas(_,k,{scale:.5});T.style.width="28px",T.style.height="28px",T.style.objectFit="contain",w.appendChild(T);}}catch{}return w},S=Ds({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(x,w)=>x.name.localeCompare(w.name,void 0,{numeric:true,sensitivity:"base"}),render:x=>{const w=h("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),_=y(x.id),k=h("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},x.name);return w.append(_,k),w}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(x,w)=>yn(x.rarity)-yn(w.rarity),render:x=>b(x.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:x=>x.id,onSelectionChange:x=>{c.clear(),x.forEach(w=>c.add(w)),s(Array.from(c)),A();}}),v=h("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),A=()=>{v.textContent=`${c.size} / ${o.length} selected`;};return A(),He({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,S.root,v)}getItemRarity(n,r){try{if(r==="pet")return (X.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=X.get("plants")||{},a=o[n];if(a?.seed?.rarity)return a.seed.rarity;const i=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=lt().get();try{const{updateSimpleConfig:r}=Il;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}const $k=`
  :host {
    /* Journal visual elements (not text colors) */
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
      background: var(--pill-to);
      border-radius: 8px;
  }

  .journal-content {
    position: relative;
    padding: 56px 16px 84px 16px; /* Multiples of 28px */
    background-color: var(--paper, #FDFBF7);
    
    /* Scrapbook Lined Paper Background */
    background-image: 
        /* Red Margin Line */
        linear-gradient(90deg, transparent 40px, rgba(239, 68, 68, 0.15) 40px, rgba(239, 68, 68, 0.15) 42px, transparent 42px),
        /* Blue Horizontal Lines - every 28px */
        linear-gradient(rgba(171, 206, 212, 0.25) 1px, transparent 1px);
    background-size: 100% 100%, 100% 28px;
    
    min-height: 100%;
    color: var(--fg);
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
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 1px 1px 0px rgba(255,255,255,0.8);
    position: relative;
    z-index: 2;
  }

  .journal-category-stats {
    font-size: 11px;
    font-weight: 800;
    color: var(--fg);
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
    color: var(--tab-fg);
  }

  /* Dark theme override - black text for better contrast */
  :host-context([data-theme="dark"]) .journal-row-info {
    color: #000000;
  }

  /* MagicGarden theme override - remove white text-shadow on cream paper */
  :host-context([data-theme="magicGarden"]) .journal-header {
    text-shadow: none;
  }

  :host-context([data-theme="magicGarden"]) .journal-row-info {
    color: #000000;
  }

  /* MagicGarden theme - black text for tab buttons */
  :host-context([data-theme="magicGarden"]) .journal-tab {
    color: #000000;
  }

  .journal-bar-container {
    width: 100%;
    background: var(--border);
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
    color: var(--pill-from);
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .journal-expand-btn:hover {
    opacity: 1;
    color: var(--pill-from);
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
    background: var(--pill-to);
    border-radius: 4px;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    text-transform: uppercase;
  }

  .journal-back:hover {
    background: var(--pill-to);
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
    background: var(--muted);
    border: 1px solid var(--border);
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
    color: var(--fg);
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
    background: var(--accent);
    border-radius: 4px;
    transition: background 0.2s;
  }

  .journal-species-list::-webkit-scrollbar-thumb:hover {
    background: var(--soft);
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

  /* All Tab - Uses accent */
  .journal-tab[data-tab="all"] {
    background: linear-gradient(180deg, var(--accent) 0%, color-mix(in srgb, var(--accent), black 20%) 100%);
    border-left: 1px solid color-mix(in srgb, var(--accent), white 30%);
    border-right: 1px solid color-mix(in srgb, var(--accent), white 30%);
    border-top: 2px solid color-mix(in srgb, var(--accent), white 40%);
  }

  .journal-tab[data-tab="all"].active {
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent), white 15%) 0%, var(--accent) 100%);
    box-shadow: 0 -2px 8px color-mix(in srgb, var(--accent), transparent 70%), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Crops Tab - Uses accent-1 */
  .journal-tab[data-tab="plants"] {
    background: linear-gradient(180deg, var(--accent-1) 0%, color-mix(in srgb, var(--accent-1), black 20%) 100%);
    border-left: 1px solid color-mix(in srgb, var(--accent-1), white 30%);
    border-right: 1px solid color-mix(in srgb, var(--accent-1), white 30%);
    border-top: 2px solid color-mix(in srgb, var(--accent-1), white 40%);
  }

  .journal-tab[data-tab="plants"].active {
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent-1), white 15%) 0%, var(--accent-1) 100%);
    box-shadow: 0 -2px 8px color-mix(in srgb, var(--accent-1), transparent 70%), inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  /* Pets Tab - Uses accent-2 */
  .journal-tab[data-tab="pets"] {
    background: linear-gradient(180deg, var(--accent-2) 0%, color-mix(in srgb, var(--accent-2), black 20%) 100%);
    border-left: 1px solid color-mix(in srgb, var(--accent-2), white 30%);
    border-right: 1px solid color-mix(in srgb, var(--accent-2), white 30%);
    border-top: 2px solid color-mix(in srgb, var(--accent-2), white 40%);
  }

  .journal-tab[data-tab="pets"].active {
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent-2), white 15%) 0%, var(--accent-2) 100%);
    box-shadow: 0 -2px 8px color-mix(in srgb, var(--accent-2), transparent 70%), inset 0 1px 2px rgba(255, 255, 255, 0.2);
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
    color: var(--fg);
    margin-bottom: 8px;
    padding: 0 8px;
  }

  .journal-progress-indicator .percentage {
    color: var(--fg);
  }

  .journal-progress-indicator .count {
    font-size: 10px;
    opacity: 0.9;
  }
`,Dk=`
  .see-more {
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }

  .see-more-link {
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--accent, #60a5fa);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    text-decoration: none;
  }

  .see-more-link:hover {
    color: var(--accent, #60a5fa);
    filter: brightness(1.2);
    text-decoration: underline;
  }

  .see-more-link:active {
    transform: scale(0.98);
  }

  /* Theme-specific overrides */
  :host-context([data-theme="magicGarden"]) .see-more-link {
    color: var(--pill-to);
  }

  :host-context([data-theme="magicGarden"]) .see-more-link:hover {
    color: var(--pill-to);
  }
`;function Bk(e){const{count:t,expanded:n=false,onClick:r}=e,o=h("div",{className:"see-more"}),a=h("span",{className:"see-more-link"},Ri(t,n));r&&a.addEventListener("click",r),o.appendChild(a);const i=o;return i.setCount=s=>{a.textContent=Ri(s,n);},i.setExpanded=s=>{a.textContent=Ri(t,s);},i}function Ri(e,t){return t?"− Show less":`+ and ${e} more...`}const Gk=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",zk=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",Hk={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function pd(e){return e?Hk[e]??0:0}function fd(e,t){try{if(t==="pets")return (X.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (X.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function jk({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const a=h("div",{className:"journal-content"}),i=h("div",{className:"journal-header"},"Garden Journal");if(a.appendChild(i),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=h("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),l=h("span",{className:"percentage"},`Collected ${d}%`),u=h("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(u),a.appendChild(c);}return t==="all"?(a.appendChild(Do("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),a.appendChild(Do("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?a.appendChild(Do("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):a.appendChild(Do("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),a}function Do(e,t,n,r,o,a,i=false){const s=h("div",{style:"display: flex; flex-direction: column;"}),c=h("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=h("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=h("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(z.isReady()){const b=n==="plants"?"plant":"pet",y=n==="plants"?"Carrot":"CommonEgg";if(z.has(b,y)){const C=z.toCanvas(b,y,{scale:.3});C.style.maxWidth="20px",C.style.maxHeight="20px",C.style.display="block",l.appendChild(C);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=h("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(l,f),s.appendChild(d),i){const b=h("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),y=Math.floor(t.variantsLogged/t.variantsTotal*100),C=h("span",{className:"percentage"},`Collected ${y}%`),S=h("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);b.appendChild(C),b.appendChild(S),s.appendChild(b);}const g=[...t.speciesDetails].sort((b,y)=>{const C=fd(b.species,n),S=fd(y.species,n),v=pd(C)-pd(S);return v!==0?v:b.species.localeCompare(y.species,void 0,{numeric:true,sensitivity:"base"})}),m=r?g:g.slice(0,5);for(const b of m)c.appendChild(Uk(b,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const b=Bk({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{a();}});s.appendChild(b);}else s.appendChild(h("div",{style:"height: 28px;"}));return s}function Uk(e,t,n){const r=h("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=h("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",g=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(g="DawnCelestialCrop"),e.species==="MoonCelestial"&&(g="MoonCelestialCrop"),e.species==="OrangeTulip"&&(g="Tulip"));const m=e.isComplete?["Rainbow"]:[],b=(C,S)=>{try{if(z.has(C,S))return z.toCanvas(C,S,{scale:.4,mutations:m})}catch{}return null},y=b(f,g)||(t==="plants"?b("tallplant",g):null)||b(f,g.toLowerCase())||(t==="plants"?b("tallplant",g.toLowerCase()):null);y?(y.style.maxWidth="32px",y.style.maxHeight="32px",y.style.display="block",o.appendChild(y)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const a=h("div",{style:"flex: 1; position: relative; height: 22px;"}),i=h("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=Gk(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const c=h("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});i.appendChild(c);const d=h("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);a.append(i,d);const l=zk(e.variantsPercentage),u=h("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${l};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,a,u),r}function Wk({species:e,category:t,onBack:n}){const r=h("div",{className:"journal-content"}),o=h("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const a=h("div",{className:"journal-header"},e.species);r.appendChild(a);const i=h("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(i);const s=h("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((d,l)=>d==="Normal"?-1:l==="Normal"||d==="Max Weight"?1:l==="Max Weight"?-1:d.localeCompare(l));for(const d of c){const l=e.variantsLogged.includes(d);s.appendChild(Vk(e.species,d,t,l));}return r.appendChild(s),r}function Vk(e,t,n,r){const o=h("div",{className:"journal-stamp-wrapper"}),a=h("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const u=(f,g)=>{try{const m=t==="Max Weight"?.72:.6;if(z.has(f,g))return z.toCanvas(f,g,{mutations:s,scale:m,boundsMode:"padded"})}catch{}return null},p=u(d,l)||(n==="plants"?u("tallplant",l):null)||u(d,l.toLowerCase())||(n==="plants"?u("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",a.appendChild(p));}catch{}const i=h("div",{className:"journal-stamp-label"},t);return o.append(a,i),o}const Xk=`
  .tabs-container {
    display: flex;
    gap: 4px;
    margin-bottom: 0;
    padding: 0 4px;
  }

  .tab {
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

  .tab:hover {
    filter: brightness(1.1);
  }

  .tab:active {
    transform: translateY(0);
  }

  /* Tab index color assignments using semantic accents */
  .tab[data-tab-index="1"] { --tab-color: var(--accent-1); }
  .tab[data-tab-index="2"] { --tab-color: var(--accent-2); }
  .tab[data-tab-index="3"] { --tab-color: var(--accent-3); }
  .tab[data-tab-index="4"] { --tab-color: var(--accent-1); }
  .tab[data-tab-index="5"] { --tab-color: var(--accent-2); }

  /* Active State - Raised and Extended */
  .tab.active {
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

  .tab:not(.active) {
    opacity: 0.85;
  }
`;function qk(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:a}=e,i=h("button",{className:`tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;i.style.setProperty("--tab-color",s),a&&i.addEventListener("click",a);const c=i;return c.setActive=d=>{d?i.classList.add("active"):i.classList.remove("active");},c.setLabel=d=>{i.textContent=d;},c}const Kk=`
  .progress-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    min-height: 40px;
  }

  .progress-sprite {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-bar-wrapper {
    flex: 1;
    position: relative;
    min-width: 0;
  }

  .progress-label {
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
    /* Prevent text overflow on mobile (pattern used in 7 Gemini files) */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 60px); /* Leave space for percentage */
  }

  .progress-track {
    width: 100%;
    height: 24px;
    background: var(--muted, rgba(229,231,235,0.08));
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease, background 0.3s ease;
  }

  .progress-fill.bar-rainbow {
    background-size: 200% 100%;
    animation: rainbow-shimmer 3s linear infinite;
  }

  @keyframes rainbow-shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .progress-pct {
    width: 45px;
    text-align: right;
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--journal-header, #5E5043);
    flex-shrink: 0;
  }
`,Yk={activeTab:"all",expandedCategories:[]};let on=null;async function Jk(){return on||(on=await zn("tab-journal-checker",{version:1,defaults:Yk}),on)}function Bo(){if(!on)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return on}function Go(){return on!==null}const Qk=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class Zk extends Ut{constructor(){super({id:"tab-journal-checker",label:"Journal"});M(this,"progress",null);M(this,"currentView",{type:"overview"});}async build(n){this.container=n,await Jk(),await z.init(),console.log("[JournalChecker] Sprite categories:",z.getCategories());const r=n.getRootNode();ye(r,$k,"journal-checker-styles"),ye(r,Xk,"journal-tab-styles"),ye(r,Kk,"journal-progress-bar-styles"),ye(r,Dk,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(a=>{this.progress=a.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await Ye(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>Ok);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return Go()?Bo().get().activeTab:"all"}set activeTab(n){Go()&&Bo().update({activeTab:n});}get expandedCategories(){return Go()?new Set(Bo().get().expandedCategories):new Set}setExpandedCategories(n){Go()&&Bo().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(h("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(jk({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(Wk({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=h("div",{className:"journal-tabs-container"});return Qk.forEach((r,o)=>{const a=qk({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(a);}),n}}function e_(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function t_(e,t){const n=e;let r=e;const o=Fs({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:a=>{const i=a.trim();i&&i!==r&&(r=i,t?.(i));},onEnter:a=>{const i=a.trim()||n;i!==r&&(r=i,t?.(i));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const a=o.getValue().trim()||n;a!==r&&(r=a,t?.(a));}),o.input.addEventListener("keydown",a=>{a.key==="Escape"&&(a.preventDefault(),o.input.blur());}),o.root}function pg(e){const t=h("div",{className:"team-list-item"}),n=e.customIndicator??h("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?t_(e.team.name,e.onNameChange):h("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=h("div",{className:"team-list-item__sprites"});function a(){const c=ce.myPets.get();o.innerHTML="";for(let d=0;d<3;d++){const l=e.team.petIds[d],u=l&&l!=="",p=h("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=c.all.find(g=>g.id===l);if(!f){const g=window.__petDataCache;g&&g.has(l)&&(f=g.get(l));}if(f)try{const g=z.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),m=document.createElement("canvas");m.width=g.width,m.height=g.height;const b=m.getContext("2d");if(b&&b.drawImage(g,0,0),m.style.width="100%",m.style.height="100%",m.style.objectFit="contain",p.appendChild(m),e.showSlotStyles){const y=h("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(y),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const m=h("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(m);}else {const g=h("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${l} not found in myPets yet, waiting for update`);let m=false;const b=ce.myPets.subscribe(()=>{if(m)return;const C=ce.myPets.get().all.find(S=>S.id===l);if(C){m=true,b();try{p.innerHTML="";const S=z.toCanvas("pet",C.petSpecies,{mutations:C.mutations,scale:1}),v=document.createElement("canvas");v.width=S.width,v.height=S.height;const A=v.getContext("2d");if(A&&A.drawImage(S,0,0),v.style.width="100%",v.style.height="100%",v.style.objectFit="contain",p.appendChild(v),e.showSlotStyles){const x=h("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(x),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${l} sprite updated`);}catch(S){console.warn(`[TeamListItem] Failed to render sprite for pet ${C.petSpecies}:`,S),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=e_();p.appendChild(f);}o.appendChild(p);}}a();const i=ce.myPets.subscribe(()=>{a();});if(!e.hideDragHandle){const c=h("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(c);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const c=h("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});c.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',c.addEventListener("click",d=>{d.stopPropagation(),e.onExpandClick?.();}),t.appendChild(c);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),i());});return s.observe(document.body,{childList:true,subtree:true}),t}function n_(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function fg(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:a=false,onChange:i}=e,s=h("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=h("div",{className:"sg-container",role:"tablist"}),d=h("div",{className:"sg-indicator"}),l=t.map(x=>{const w=h("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:x.label});if(w.id=x.id,x.icon){const k=h("span",{className:"sg-icon"}),T=n_(x.icon);T&&k.appendChild(T),w.appendChild(k);}const _=h("span",{className:"sg-label"},x.label);return w.appendChild(_),w.disabled=!!x.disabled,w});c.appendChild(d),l.forEach(x=>c.appendChild(x)),s.appendChild(c);let u=n,p=a;function f(){const x=l.find(w=>w.id===u);x&&requestAnimationFrame(()=>{const w=d,_=x.offsetLeft,k=x.offsetWidth;w.style.width=`${k}px`,w.style.transform=`translateX(${_}px)`;});}function g(){l.forEach(x=>{const w=x.id===u;x.classList.toggle("active",w),x.setAttribute("aria-selected",String(w)),x.disabled=p||!!t.find(_=>_.id===x.id)?.disabled;}),f();}function m(x){const w=x.currentTarget;if(w.disabled)return;y(w.id);}function b(x){if(p)return;const w=l.findIndex(k=>k.id===u);let _=w;if(x.key==="ArrowLeft"||x.key==="ArrowUp"?(x.preventDefault(),_=(w-1+l.length)%l.length):x.key==="ArrowRight"||x.key==="ArrowDown"?(x.preventDefault(),_=(w+1)%l.length):x.key==="Home"?(x.preventDefault(),_=0):x.key==="End"&&(x.preventDefault(),_=l.length-1),_!==w){const k=l[_];k&&!k.disabled&&(y(k.id),k.focus());}}l.forEach(x=>{x.addEventListener("click",m),x.addEventListener("keydown",b);});function y(x){!t.some(_=>_.id===x)||u===x||(u=x,g(),i?.(u));}function C(){return u}function S(x){p=!!x,g();}function v(){l.forEach(x=>{x.removeEventListener("click",m),x.removeEventListener("keydown",b);});}g(),queueMicrotask(()=>{const x=l.find(w=>w.id===u);if(x){const w=d;w.style.width=`${x.offsetWidth}px`,w.style.transform=`translateX(${x.offsetLeft}px)`;}});const A=s;return A.select=y,A.getSelected=C,A.setDisabled=S,A.destroy=v,A}function r_(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=h("div",{className:"lg-checkbox-wrap"}),d=h("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let l=null;a&&i!=="none"&&(l=h("label",{className:"lg-checkbox-label",htmlFor:t},a)),l&&i==="left"?c.append(l,d):l&&i==="right"?c.append(d,l):c.append(d);let u=!!n,p=!!r;function f(){d.checked=u,d.disabled=p;}function g(w=false){p||(u=!u,f(),w||s?.(u));}function m(){p||g();}function b(w){p||(w.key===" "||w.key==="Enter")&&(w.preventDefault(),g());}d.addEventListener("click",m),d.addEventListener("keydown",b);function y(){return u}function C(w,_=false){u=!!w,f(),_||s?.(u);}function S(w){p=!!w,f();}function v(w){if(!w){l&&(l.remove(),l=null);return}l?l.textContent=w:(l=h("label",{className:"lg-checkbox-label",htmlFor:t},w),c.append(l));}function A(){d.focus();}function x(){d.removeEventListener("click",m),d.removeEventListener("keydown",b);}return f(),{root:c,input:d,isChecked:y,setChecked:C,setDisabled:S,setLabel:v,focus:A,destroy:x}}let or=0,gd="",md="";function o_(){return or===0&&(gd=document.body.style.overflow,md=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),or++,()=>{or=Math.max(0,or-1),or===0&&(document.body.style.overflow=gd,document.body.style.touchAction=md);}}class a_{constructor(t){M(this,"dragState",null);M(this,"longPressState",null);M(this,"options");M(this,"onPointerMove");M(this,"onPointerUp");M(this,"onPointerCancel");M(this,"onLongPressPointerMove");M(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),ae.getAllTeams().findIndex(d=>d.id===r)===-1)return;const i=t.clientX,s=t.clientY,c=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:i,startY:s,timeout:c,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const i=ae.getAllTeams().findIndex(p=>p.id===r);if(i===-1)return;const s=n.getBoundingClientRect(),c=o.getBoundingClientRect(),d=n.cloneNode(true);d.classList.add("team-list-item--placeholder"),d.classList.remove("team-list-item--dragging");const l=n.style.touchAction;n.style.touchAction="none";const u=o_();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:d,offsetY:t.clientY-s.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:l,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-c.left}px`,n.style.top=`${s.top-c.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(d,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const a=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(a)&&(o=Math.max(-8,Math.min(a+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,a=Array.from(n.children).filter(c=>c!==o&&c!==r&&c instanceof HTMLElement&&c.classList.contains("team-list-item")),i=new Map;a.forEach(c=>{i.set(c,c.getBoundingClientRect().top);});let s=false;for(const c of a){const d=c.getBoundingClientRect(),l=d.top+d.height/2;if(t<l){r.nextSibling!==c&&n.insertBefore(r,c),s=true;break}}s||n.appendChild(r),a.forEach(c=>{const d=i.get(c),l=c.getBoundingClientRect().top;if(d!==void 0&&d!==l){const u=d-l;c.style.transform=`translateY(${u}px)`,c.style.transition="none",c.offsetHeight,c.style.transition="transform 0.14s ease",c.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:a,fromIndex:i,touchActionPrev:s,releaseScrollLock:c,pointerId:d}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(d))try{o.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const p=Array.from(n.children).filter(f=>f!==o&&f!==a&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?n.insertBefore(a,p):n.appendChild(a);}else {const u=Array.from(n.children).filter(f=>f!==o),p=u.indexOf(a);if(p!==-1){const f=u[p];f!==a&&n.insertBefore(a,f);}}if(a.replaceWith(o),a.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),c?.(),!r){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(o);if(p!==-1&&p!==i){const g=ae.getAllTeams().slice(),[m]=g.splice(i,1);g.splice(p,0,m);const b=g.map(y=>y.id);ae.reorderTeams(b),this.options.onReorder(b);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class i_{constructor(t={}){M(this,"card",null);M(this,"modeControl",null);M(this,"modeContainer",null);M(this,"teamContent",null);M(this,"listContainer",null);M(this,"teamMode","overview");M(this,"selectedTeamIds",new Set);M(this,"teamCheckboxes",new Map);M(this,"options");M(this,"dragHandler");this.options=t,this.dragHandler=new a_({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!ae.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=h("div",{className:"team-card-wrapper"});this.modeContainer=h("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=h("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=He({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=fg({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=h("div",{className:"team-card__disabled-state"}),n=h("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=qe({label:"Enable Feature",onClick:()=>{ae.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=ae.getAllTeams(),n=ae.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=h("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let a;this.teamMode==="manage"&&(a=this.createCheckboxIndicator(r.id));const i=pg({team:r,isActive:o,customIndicator:a?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0});this.teamMode==="manage"&&i.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(i.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){i.classList.add("team-list-item--clicked"),setTimeout(()=>{i.classList.remove("team-list-item--clicked");},300);try{await ae.activateTeam(r),this.options.onTeamsUpdated?.();}catch(d){console.error("[TeamCard] Failed to activate team:",d);}}}),i.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,i,r.id):this.dragHandler.startLongPress(s,i,r.id);})),this.listContainer.appendChild(i);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=h("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=h("div",{className:"team-card__actions"}),r=qe({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=h("div",{className:"team-card__actions"}),n=qe({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=qe({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),o=qe({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});o.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),t.appendChild(o),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=ae.getAllTeams(),a=new Set(o.map(i=>i.name));for(;a.has(n);)n=`${t} (${r})`,r++;try{ae.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)ae.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=ae.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){ae.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const r=ae.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=ae.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",ae.updateTeam(t,{petIds:o}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const r=ae.getTeam(t);if(!r)return;const a=ce.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),i=new Set(r.petIds.filter(f=>f!=="")),s=a.filter(f=>!i.has(f.id));await ge.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const c=Ke.detect();(c.platform==="mobile"||c.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const l=ce.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,m=[...r.petIds];m[n]=g.id,ae.updateTeam(t,{petIds:m}),this.options.onTeamsUpdated?.(),ge.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),An.close().then(()=>{const b=Ke.detect();(b.platform==="mobile"||b.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await An.show("inventory",{items:s,favoritedItemIds:[]}),await An.waitForClose();const u=Ke.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),l();}createCheckboxIndicator(t){const n=r_({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class s_{constructor(t,n={}){M(this,"root");M(this,"pet");M(this,"options");M(this,"contentSlot",null);M(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const r=document.createElement("div");r.className="base-pet-card__info";const o=document.createElement("div");if(o.className="base-pet-card__name",o.textContent=this.pet.name||this.pet.petSpecies,r.appendChild(o),!this.options.hideStr){const a=document.createElement("div");a.className="base-pet-card__str",this.renderStr(a),r.appendChild(a);}return t.appendChild(r),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const r=this.root.querySelector(".base-pet-card__str");r&&this.renderStr(r);const o=this.root.querySelector(".base-pet-card__sprite-wrapper");o instanceof HTMLElement&&this.renderSprite(o);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const r=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const o=io({label:r,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(o.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(z.has("pet",this.pet.petSpecies)){const r=z.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});r.style.width="64px",r.style.height="64px",r.style.objectFit="contain",t.appendChild(r);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}const Ae={XP:{BOOST_PAIR:.85,LEVELING_PAIR:.75,PASSIVE_LEVELING:.5,STR_DISTANCE_THRESHOLD:.15},ECONOMY:{DEDICATED_COIN:.9,META_SELLING:.85,PASSIVE_EFFICIENCY:.65,ENDGAME_HARVEST:.95,SYNERGY_BONUS:.1,EARLY_REGROW:.7},HATCHING:{TIER_3_MAX_STR:.95,RAINBOW_HUNTING:.7,COMBO_BONUS:.05},TIER_BONUS:.05,CONFIDENCE_THRESHOLD:.6},W={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]},Za={ALLOWED_PANELS:{"xp-farming":["xp"],"coin-farming":["coin","xp","hatch"],"crop-farming":["growth","coin","xp","hatch"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],hatching:["hatch","xp"],efficiency:["xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}};function ze(e,t){return e.abilities.some(n=>t.includes(n))}function Oe(e,t){return e.filter(n=>ze(n,t)).length}function l_(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function ar(e,t){const n=e.flatMap(r=>r.abilities.filter(o=>t.includes(o))).map(l_);return n.length===0?0:n.reduce((r,o)=>r+o,0)/n.length}function zo(e){const t=kf(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],r={},o=Oe(t,W.XP_BOOST),a=Ae.XP.STR_DISTANCE_THRESHOLD,s=t.filter(I=>I.maxStrength===0?false:(I.maxStrength-I.currentStrength)/I.maxStrength>a).length,c=t.filter(I=>I.currentStrength<I.maxStrength).length;if(o>=1&&s>=2)r["xp-farming"]=Ae.XP.BOOST_PAIR,n.push(`1 XP Boost + ${s} high-need pets (>${a*100}% STR distance)`);else if(o>=2){const I=ar(t,W.XP_BOOST);r["xp-farming"]=Ae.XP.LEVELING_PAIR+I*Ae.TIER_BONUS,n.push(`${o} XP Boost pets (avg tier ${I.toFixed(1)})`);}else c>=2&&s>=1?(r["xp-farming"]=Ae.XP.LEVELING_PAIR,n.push(`${c} leveling pets with ${s} high-need`)):c>=2&&(r["xp-farming"]=Ae.XP.PASSIVE_LEVELING,n.push(`${c} pets below max STR`));const d=Oe(t,W.COIN_FINDER),l=Oe(t,W.SELL_BOOST),u=Oe(t,W.CROP_REFUND_HARVEST),p=Oe(t,W.RARE_GRANTERS),f=Oe(t,W.COMMON_GRANTERS),g=t.some(I=>ze(I,W.COIN_FINDER)&&(ze(I,W.RARE_GRANTERS)||ze(I,W.COMMON_GRANTERS)));d>=1&&!g?(r["coin-farming"]=Ae.ECONOMY.DEDICATED_COIN,n.push("Dedicated Coin Finder team (no granters)")):l>=1&&u>=1?(r["coin-farming"]=Ae.ECONOMY.META_SELLING,n.push("Meta Selling Team (Sell Boost + Crop Refund/Harvest)")):d>=1&&g?(r["coin-farming"]=Ae.ECONOMY.PASSIVE_EFFICIENCY,r.efficiency=Math.max(r.efficiency||0,Ae.ECONOMY.PASSIVE_EFFICIENCY),n.push("Coin Finder + Granter (passive efficiency)")):(l>=1||u>=1)&&(r["coin-farming"]=Math.max(r["coin-farming"]||0,.7),n.push("Sell/Refund abilities (coin efficiency)"));const m=Oe(t,W.PLANT_GROWTH),b=Oe(t,W.CROP_MUTATION),y=Oe(t,W.CROP_SIZE),C=t.filter(I=>I.abilities.includes("DoubleHarvest")).length,S=t.filter(I=>I.abilities.includes("ProduceRefund")).length,v=t.some(I=>I.abilities.includes("DoubleHarvest")&&I.abilities.includes("ProduceRefund"));if(C>=3){let I=Ae.ECONOMY.ENDGAME_HARVEST;v&&(I+=Ae.ECONOMY.SYNERGY_BONUS),r["crop-farming"]=Math.max(r["crop-farming"]||0,I),n.push("Endgame Harvest Team (3x Double Harvest)"+(v?" + capybara synergy":""));}else if(C>=1&&S>=1){let I=.85;v&&(I+=Ae.ECONOMY.SYNERGY_BONUS),r["crop-farming"]=Math.max(r["crop-farming"]||0,I),n.push("Double Harvest + Crop Refund"+(v?" (same pet - capybara)":""));}else b>=1&&C===0&&(r["crop-farming"]=Math.max(r["crop-farming"]||0,Ae.ECONOMY.EARLY_REGROW),n.push("Early Game Regrow Team (Crop Mutation)"));if(p>=1){const I=t.some(F=>F.abilities.includes("RainbowGranter")),O=t.some(F=>F.abilities.includes("GoldGranter"));I?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):O?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(r["crop-farming"]=Math.max(r["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const A=m+b+y+f;if(A>=2&&!r["crop-farming"]){const I=(ar(t,W.PLANT_GROWTH)+ar(t,W.CROP_MUTATION)+ar(t,W.CROP_SIZE))/3;r["crop-farming"]=Math.max(r["crop-farming"]||0,.7+I*.03),n.push(`${A} crop-related abilities`);}const x=Oe(t,W.EGG_GROWTH);if(x>=1&&(r["time-reduction"]=.7,n.push(`${x} Egg Growth Boost pet(s)`)),m>=1&&!r["crop-farming"]&&(r["time-reduction"]=Math.max(r["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),p>=1||b>=1){const I=t.some(F=>F.abilities.includes("RainbowGranter")),O=t.some(F=>F.abilities.includes("GoldGranter"));I||O?(r["mutation-hunting"]=.95,n.push(`${I?"Rainbow":"Gold"} Granter (mutation focus)`)):b>=1&&(r["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const w=Oe(t,W.HUNGER_BOOST),_=Oe(t,W.HUNGER_RESTORE);w>=1&&_>=1?(r.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(w>=1||_>=1)&&(r.efficiency=.6,n.push("Hunger management (reduced feeding)"));const k=d+p+f;k>=2&&(r.efficiency=Math.max(r.efficiency||0,.6),n.push(`${k} passive abilities (passive gains)`));const T=Oe(t,W.MAX_STR_BOOST),E=Oe(t,W.HATCH_XP),B=Oe(t,W.PET_MUTATION),Y=Oe(t,W.DOUBLE_HATCH),H=Oe(t,W.PET_REFUND);if(T>=1){const I=ar(t,W.MAX_STR_BOOST),O=I>=3?Ae.HATCHING.TIER_3_MAX_STR:.85;r.hatching=O+I*Ae.TIER_BONUS,n.push(`Max Strength Boost (tier ${I.toFixed(1)}) - late-game meta`);}if(B>=1||Y>=1||H>=1){const I=B+Y+H,O=Ae.HATCHING.RAINBOW_HUNTING+I*Ae.HATCHING.COMBO_BONUS;r.hatching=Math.max(r.hatching||0,O),n.push(`${I} rainbow hunting abilities`);}E>=1&&!r.hatching&&(r.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const q=t.filter(I=>ze(I,W.MAX_STR_BOOST)||ze(I,W.PET_MUTATION)||ze(I,W.DOUBLE_HATCH)||ze(I,W.PET_REFUND)).length;q>=Math.ceil(t.length*.67)&&r.hatching&&(r.hatching=Math.max(r.hatching,.97),r["crop-farming"]&&r["crop-farming"]<.97&&t.filter(O=>(ze(O,W.CROP_REFUND_HARVEST)||ze(O,W.CROP_SIZE)||ze(O,W.CROP_MUTATION))&&!ze(O,W.PET_REFUND)&&!ze(O,W.DOUBLE_HATCH)&&!ze(O,W.PET_MUTATION)&&!ze(O,W.MAX_STR_BOOST)).length===0&&(delete r["crop-farming"],n.push("Suppressed crop-farming (hatching majority override)")),n.push(`Hatching Majority (${q}/${t.length} pets) - clear team purpose`));const j=Object.entries(r).sort(([,I],[,O])=>O-I);if(j.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp","growth","coin","hatch"],reasons:["Mixed or unclear purpose"]};const[N,D]=j[0],G=j.slice(1).map(([I,O])=>({purpose:I,confidence:O}));return D<Ae.CONFIDENCE_THRESHOLD?{primary:"balanced",confidence:D,secondary:j.map(([I,O])=>({purpose:I,confidence:O})),suggestedFeatures:["xp","growth","coin","hatch"],reasons:[...n,`Low confidence (${(D*100).toFixed(0)}%) - showing all panels`]}:{primary:N,confidence:D,secondary:G,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","growth","xp"],"crop-farming":["growth","coin","xp"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],efficiency:["xp"],hatching:["hatch","growth","xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}[N]||["xp","growth","coin","hatch"],reasons:n}}async function c_(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,r=t.createOscillator(),o=t.createGain();r.connect(o),o.connect(t.destination),r.type="sine",r.frequency.setValueAtTime(800,n),r.frequency.exponentialRampToValueAtTime(400,n+.03),o.gain.setValueAtTime(.12,n),o.gain.exponentialRampToValueAtTime(.001,n+.05),r.start(n),r.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function d_(e={}){const{id:t,variant:n="default",size:r="md",round:o=false,sprite:a=null,onClick:i,disabled:s=false,playSound:c=true,tooltip:d}=e,l=h("button",{className:"gemini-icon-btn",id:t});l.type="button",n!=="default"&&l.classList.add(`gemini-icon-btn--${n}`),r!=="md"&&l.classList.add(`gemini-icon-btn--${r}`),o&&l.classList.add("gemini-icon-btn--round"),d&&(l.title=d),l.disabled=s;const u=h("span",{className:"gemini-icon-btn__content"});l.appendChild(u),a&&u.appendChild(a);const p=h("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",l.appendChild(p),l.addEventListener("click",async g=>{l.disabled||(c&&c_(),i?.(g));});const f=l;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{l.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&l.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{l.disabled=g;},f}const gg=`
/* ═══════════════════════════════════════════════════════════════════════════
   GEMINI ICON BUTTON - Raised Icon Button with Glassmorphism
   Design: Modern glass panel with colored 3D base shadow and satisfying press
   ═══════════════════════════════════════════════════════════════════════════ */

.gemini-icon-btn {
    /* Reset */
    appearance: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    
    /* Size */
    position: relative;
    width: 40px;
    height: 36px;
    padding: 0;
    flex-shrink: 0;
    
    /* CSS variable for colored 3D base - can be overridden by variants */
    --btn-base-color: color-mix(in oklab, var(--accent) 70%, black);
    
    /* Glassmorphism Background */
    background: linear-gradient(
        180deg,
        color-mix(in oklab, white 10%, color-mix(in oklab, var(--soft) 90%, transparent)) 0%,
        color-mix(in oklab, var(--soft) 75%, transparent) 50%,
        color-mix(in oklab, var(--soft) 60%, transparent) 100%
    );
    
    /* Simple border */
    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
    border-radius: 10px;
    
    /* 3D RAISED EFFECT - Hard-edged shadow offset to bottom-right */
    box-shadow: 
        /* Hard edge creates visible "base" on bottom and right */
        2px 2px 0 0 var(--btn-base-color),
        /* Soft diffuse shadow for depth */
        3px 3px 6px color-mix(in oklab, var(--shadow) 25%, transparent),
        /* Inner top highlight */
        inset 0 1px 1px color-mix(in oklab, white 12%, transparent);
    
    /* Smooth Transitions */
    transition: 
        transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.1s ease-out,
        border-color 0.2s ease,
        background 0.15s ease,
        filter 0.15s ease;
    
    -webkit-tap-highlight-color: transparent;
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTENT - Sprite/Icon Container
   ───────────────────────────────────────────────────────────────────────────── */

.gemini-icon-btn__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    overflow: hidden;
    z-index: 1;
    transition: transform 0.1s ease-out;
}

.gemini-icon-btn canvas {
    image-rendering: pixelated;
    display: block;
    max-width: 100%;
    max-height: 100%;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SWAP INDICATOR - Bottom-right badge showing this is a toggle button
   ───────────────────────────────────────────────────────────────────────────── */

.gemini-icon-btn__swap {
    position: absolute;
    bottom: 1px;
    right: 1px;
    
    /* Sizing */
    width: 14px;
    height: 14px;
    
    /* No background - just the symbol */
    background: transparent;
    border-radius: 0;
    
    /* Text styling - visible against button */
    font-size: 10px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    color: var(--fg);
    opacity: 0.7;
    text-shadow: 
        0 1px 0 color-mix(in oklab, var(--bg) 80%, transparent),
        0 0 3px color-mix(in oklab, var(--bg) 60%, transparent);
    
    /* Don't interfere with clicks */
    pointer-events: none;
    
    /* Smooth transitions */
    transition: 
        transform 0.15s ease,
        opacity 0.15s ease;
    
    z-index: 2;
}

/* Hover: indicator becomes more visible */
.gemini-icon-btn:hover:not(:disabled) .gemini-icon-btn__swap {
    opacity: 1;
    transform: scale(1.1);
}

/* Pressed: indicator follows button */
.gemini-icon-btn:active:not(:disabled) .gemini-icon-btn__swap {
    opacity: 0.8;
    transform: scale(0.95);
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATES
   ───────────────────────────────────────────────────────────────────────────── */

/* Hover - lifts button, shadow grows */
.gemini-icon-btn:hover:not(:disabled) {
    transform: translate(-1px, -1px);
    border-color: color-mix(in oklab, var(--accent) 35%, var(--border));
    box-shadow: 
        /* Shadow grows as button lifts */
        4px 4px 0 0 var(--btn-base-color),
        5px 5px 10px color-mix(in oklab, var(--shadow) 30%, transparent),
        inset 0 1px 1px color-mix(in oklab, white 15%, transparent);
    filter: brightness(1.04);
}

/* Pressed - button sinks, shadow collapses */
.gemini-icon-btn:active:not(:disabled) {
    transform: translate(1px, 1px);
    transition: 
        transform 0.05s ease-out,
        box-shadow 0.05s ease-out,
        background 0.05s ease;
    box-shadow: 
        /* Shadow nearly gone - button pressed flat */
        1px 1px 0 0 var(--btn-base-color),
        2px 2px 4px color-mix(in oklab, var(--shadow) 20%, transparent),
        inset 0 1px 2px color-mix(in oklab, black 8%, transparent);
    filter: brightness(0.96);
    background: linear-gradient(
        180deg,
        color-mix(in oklab, var(--soft) 78%, transparent) 0%,
        color-mix(in oklab, var(--soft) 68%, transparent) 50%,
        color-mix(in oklab, var(--soft) 58%, transparent) 100%
    );
}

/* Disabled */
.gemini-icon-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: saturate(0.9);
}

/* Focus ring */
.gemini-icon-btn:focus-visible {
    outline: none;
    box-shadow: 
        0 0 0 2px color-mix(in oklab, var(--accent) 50%, transparent),
        3px 3px 0 0 var(--btn-base-color),
        4px 4px 8px color-mix(in oklab, var(--shadow) 30%, transparent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANTS - Override the base color for different button types
   ═══════════════════════════════════════════════════════════════════════════ */

/* Plant variant - green/cyan base */
.gemini-icon-btn--plant {
    --btn-base-color: color-mix(in oklab, var(--high) 60%, black);
    background: linear-gradient(
        180deg,
        color-mix(in oklab, white 8%, color-mix(in oklab, var(--high) 15%, color-mix(in oklab, var(--soft) 90%, transparent))) 0%,
        color-mix(in oklab, var(--high) 10%, color-mix(in oklab, var(--soft) 75%, transparent)) 50%,
        color-mix(in oklab, var(--high) 8%, color-mix(in oklab, var(--soft) 60%, transparent)) 100%
    );
    border-color: color-mix(in oklab, var(--high) 25%, var(--border));
}

.gemini-icon-btn--plant:hover:not(:disabled) {
    border-color: color-mix(in oklab, var(--high) 45%, var(--border));
}

/* Egg variant - purple base */
.gemini-icon-btn--egg {
    --btn-base-color: color-mix(in oklab, var(--accent-2) 60%, black);
    background: linear-gradient(
        180deg,
        color-mix(in oklab, white 8%, color-mix(in oklab, var(--accent-2) 15%, color-mix(in oklab, var(--soft) 90%, transparent))) 0%,
        color-mix(in oklab, var(--accent-2) 10%, color-mix(in oklab, var(--soft) 75%, transparent)) 50%,
        color-mix(in oklab, var(--accent-2) 8%, color-mix(in oklab, var(--soft) 60%, transparent)) 100%
    );
    border-color: color-mix(in oklab, var(--accent-2) 25%, var(--border));
}

.gemini-icon-btn--egg:hover:not(:disabled) {
    border-color: color-mix(in oklab, var(--accent-2) 45%, var(--border));
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIZE VARIANTS
   ═══════════════════════════════════════════════════════════════════════════ */

.gemini-icon-btn--sm {
    width: 32px;
    height: 28px;
    border-radius: 8px;
}

.gemini-icon-btn--sm .gemini-icon-btn__content {
    width: 18px;
    height: 18px;
}

.gemini-icon-btn--lg {
    width: 48px;
    height: 44px;
    border-radius: 12px;
}

.gemini-icon-btn--lg .gemini-icon-btn__content {
    width: 26px;
    height: 26px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CIRCULAR VARIANT
   ═══════════════════════════════════════════════════════════════════════════ */

.gemini-icon-btn--round {
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

.gemini-icon-btn--round.gemini-icon-btn--sm {
    width: 30px;
    height: 30px;
}

.gemini-icon-btn--round.gemini-icon-btn--lg {
    width: 46px;
    height: 46px;
}
`;class u_{constructor(){M(this,"card",null);M(this,"listContainer",null);M(this,"innerContent",null);M(this,"logs",[]);M(this,"filteredLogs",[]);M(this,"unsubscribe",null);M(this,"ITEM_HEIGHT",88);M(this,"BUFFER_SIZE",3);M(this,"VIEWPORT_HEIGHT",480);M(this,"renderedRange",{start:0,end:0});M(this,"scrollListener",null);M(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=Wn(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const r=t.get().abilityLogs;this.updateFromAbilityLogs(r);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const a=X.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",i={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=Uu(i),c=new Date(n.performedAt),d=c.toLocaleDateString("en-US",{month:"short",day:"numeric"}),l=c.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),u=`${d} ${l}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:a,abilityId:n.abilityId,description:s,formattedDate:u}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return io({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=h("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=h("div",{style:"margin-bottom: 0;"}),r=Bs({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const a=o.trim().toLowerCase();a?this.filteredLogs=this.logs.filter(i=>i.petName.toLowerCase().includes(a)||i.petSpecies.toLowerCase().includes(a)||i.abilityName.toLowerCase().includes(a)||i.description.toLowerCase().includes(a)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=h("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=h("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=He({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=h("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let r=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),o=Math.min(this.filteredLogs.length,r+n+this.BUFFER_SIZE*2);if(r===this.renderedRange.start&&o===this.renderedRange.end)return;this.renderedRange={start:r,end:o},this.innerContent.replaceChildren();const a=r*this.ITEM_HEIGHT;if(a>0){const s=h("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=r;s<o;s++){const c=this.filteredLogs[s],d=this.createLogItemCard(c);this.innerContent.appendChild(d);}const i=Math.max(0,(this.filteredLogs.length-o)*this.ITEM_HEIGHT);if(i>0){const s=h("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}createLogItemCard(t){const n=h("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const r=h("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const l=z.toCanvas("pet",t.petSpecies);l&&(l.style.width="100%",l.style.height="100%",l.style.objectFit="contain",r.appendChild(l));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=h("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),a=h("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),i=h("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=h("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);a.appendChild(i),a.appendChild(s),o.appendChild(a);const c=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(c);const d=h("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(d),n.appendChild(o),n}}const mg=`
.team-card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.team-card__mode-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.team-card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.team-card__disabled-state {
    text-align: center;
}

.team-card__disabled-message {
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 12px;
}

.team-card__empty-state {
    color: var(--muted);
    text-align: center;
    font-size: 14px;
}

.team-card__list-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
}

.team-card__list-container.is-reordering {
    /* Active reordering state */
}

.team-card__actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    width: 100%;
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPAND BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */

.team-list-item__expand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    margin-left: 8px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.team-list-item__expand:hover {
    background: var(--soft);
    color: var(--fg);
    border-color: var(--accent);
}

.team-list-item__expand svg {
    transition: transform 0.2s ease;
}

.team-list-item__expand--open svg {
    transform: rotate(180deg);
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPANDED CONTAINER - 1 per team with 3 pet rows
   ═══════════════════════════════════════════════════════════════════════════ */

.team-expanded-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    margin: 0 8px 8px 8px;
    background: linear-gradient(145deg, var(--soft), var(--bg));
    border: 1px solid var(--border);
    border-radius: 12px;
    animation: expandSlideIn 0.25s ease-out;
}

@keyframes expandSlideIn {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    margin: 4px 12px 12px 12px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    animation: slideDown 0.3s ease-out;
    display: flex;
    flex-direction: column;
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PET ROW - Individual row with header + content
   ═══════════════════════════════════════════════════════════════════════════ */

.expanded-pet-row {
    display: flex;
    flex-direction: column;
    padding: 0 12px 14px 12px;
}

.expanded-pet-row:first-of-type {
    padding-top: 8px;
}

.pet-row__header {
    display: flex;
    align-items: center;
    background: var(--tab-bg);
    padding: 6px 12px;
    gap: 8px;
    border: 1px solid var(--border);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: none;
    margin-bottom: 0;
}

.expanded-pet-row .base-pet-card {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.pet-row__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--fg);
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.15s ease;
    flex-shrink: 0;
}

.pet-row__nav:hover {
    background: var(--soft);
    border-color: var(--pill-to);
    transform: scale(1.05);
}

.pet-label {
    flex: 1;
    text-align: center;
    font-size: 11px;
    font-weight: 800;
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE CARD - Individual Pet Feature Display
   ═══════════════════════════════════════════════════════════════════════════ */

.feature-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 200px;
}

.feature-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-bottom: 1px solid var(--border);
    gap: 4px;
}

.feature-card__label {
    flex: 1;
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.feature-card__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--fg);
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.15s ease;
    flex-shrink: 0;
}

.feature-card__nav:hover {
    background: var(--soft);
    border-color: var(--pill-to);
}

.feature-card__content {
    flex: 1;
    padding: 10px;
    background: var(--soft);
    overflow-y: auto;
    max-height: 280px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}

.feature-card__content::-webkit-scrollbar {
    width: 4px;
}

.feature-card__content::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 2px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE - Mobile Layout
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .team-expanded-cards {
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 10px;
        margin: 0 4px 6px 4px;
    }

    .feature-card {
        min-height: 160px;
    }

    .feature-card__content {
        max-height: 220px;
    }
}

@media (max-width: 480px) {
    .team-list-item__expand {
        padding: 4px;
    }

    .feature-card__header {
        padding: 6px 8px;
    }

    .feature-card__label {
        font-size: 10px;
    }

    .feature-card__nav {
        width: 20px;
        height: 20px;
        font-size: 10px;
    }

    .feature-card__content {
        padding: 8px;
        max-height: 180px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM PROGRESS
   ═══════════════════════════════════════════════════════════════════════════ */

.team-progress-bar {
    position: relative;
    height: 16px;
    background: var(--border);
    border-radius: 8px;
    margin: 10px 12px 6px 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    flex-shrink: 0;
}

.team-progress-bar__fill {
    height: 100%;
    border-radius: 7px;
    transition: width 0.3s ease;
}

/* Color coding for team progress bar */
.team-progress-bar__fill--low {
    background: linear-gradient(90deg, var(--low), var(--medium));
}
.team-progress-bar__fill--medium {
    background: linear-gradient(90deg, var(--medium), var(--high));
}
.team-progress-bar__fill--high {
    background: linear-gradient(90deg, var(--high), var(--complete));
}

.team-progress-bar__percent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    font-weight: 800;
    color: var(--fg);
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    pointer-events: none;
}

/* BasePetCard provides its own mobile responsiveness. We only need minimal 
   overrides for the team-level containers if necessary. */

@media (max-width: 480px) {
    .team-expanded-container {
        margin: 4px 6px 8px 6px;
    }
    
    .team-progress-bar {
        pointer-events: none;
        z-index: 5;
    }

    .feature-card__header {
        padding: 6px 8px;
    }

    .feature-card__nav {
        width: 22px;
        height: 22px;
        font-size: 10px;
    }
}

/* 320px devices */
@media (max-width: 360px) {
    .pet-row__content {
        padding: 8px;
    }
    
    .xp-stat__label {
        font-size: 9px;
    }
}

`,hg=`
/* ═══════════════════════════════════════════════════════════════════════════
   BASE PET CARD - The Shell
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card {
    display: flex;
    align-items: stretch;
    gap: 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px;
    transition: all 0.2s ease;
    position: relative;
}

.base-pet-card--max {
    background: var(--bg);
}

.base-pet-card--starving {
    border-color: var(--low);
    background: linear-gradient(135deg, var(--soft), var(--bg));
}

.base-pet-card--centered {
    justify-content: center;
}

.base-pet-card--centered .base-pet-card__left {
    min-width: unset;
}

.base-pet-card--centered .base-pet-card__content {
    display: none;
}

/* ═══════════════════════════════════════════════════════════════════════════
   GROUPED PET CARD - Bundled sprites for 2-3 matching pets
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card--grouped,
.base-pet-card--grouped-2 {
    /* Grouped state inherits base card styles */
}

.base-pet-card--grouped .base-pet-card__left,
.base-pet-card--grouped-2 .base-pet-card__left {
    min-width: 110px;
}

/* Grouped sprite container with overlapping triad/duo formation */
.grouped-sprite-container {
    position: relative;
    width: 100px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* No background - just sprites */
    overflow: visible;
}

.grouped-sprite-container canvas {
    position: absolute;
    /* Natural sizing - don't stretch */
    width: auto !important;
    height: auto !important;
    max-width: 56px;
    max-height: 56px;
    image-rendering: pixelated;
}

/* 3-pet triad formation - less vertical overlap, more horizontal spread */
.grouped-sprite-container canvas:nth-child(1) { z-index: 3; left: 24px; top: 4px; }
.grouped-sprite-container canvas:nth-child(2) { z-index: 2; left: -4px; top: 12px; }
.grouped-sprite-container canvas:nth-child(3) { z-index: 1; left: 52px; top: 12px; }

/* 2-pet duo formation - more horizontal spread */
.grouped-sprite-container--duo canvas:nth-child(1) { left: 6px; top: 4px; z-index: 2; }
.grouped-sprite-container--duo canvas:nth-child(2) { left: 46px; top: 4px; z-index: 1; }

/* Stacked badges in horizontal row matching sprite layout */
.grouped-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
    margin-top: 4px;
    width: 100%;
}

.grouped-badges .badge {
    font-size: 8px !important;
    padding: 2px 5px !important;
    background: var(--pill-to);
    color: var(--pill-from);
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8) !important;
    border: none;
    border-radius: 8px;
    white-space: nowrap;
}


/* ═══════════════════════════════════════════════════════════════════════════
   LEFT SECTION - Sprite & Identity
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 80px;
    flex-shrink: 0;
}

.base-pet-card__sprite-wrapper {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
}

.base-pet-card__sprite-wrapper canvas {
    image-rendering: pixelated;
}

.base-pet-card__info {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
}

.base-pet-card__name {
    font-size: 11px;
    font-weight: 800;
    color: var(--pill-to);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
}

.base-pet-card__str {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 700;
}

.base-str__label { color: var(--muted); }
.base-str__current { 
    color: var(--pill-to); 
    font-weight: 800; 
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8);
}
.base-str__max { 
    color: var(--muted); 
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8);
}

/* ═══════════════════════════════════════════════════════════════════════════
   RIGHT SECTION - The Content Slot (Stat Grid Protocol)
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: center;
    min-width: 0;
}

/* THE STAT GRID PROTOCOL */
.stat-row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 20px;
}

.stat-row--boost {
    border-radius: 4px;
    padding: 2px 0;
    margin-bottom: 2px;
}

.stat__label {
    font-size: 10px;
    font-weight: 800;
    color: var(--pill-to);
    min-width: 65px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.stat__value {
    font-size: 12px;
    font-weight: 700;
    color: var(--fg);
    white-space: nowrap;
}

.stat__value--accent {
    color: var(--pill-from);
}

.stat__timer {
    font-family: monospace;
    font-size: 12px;
    color: var(--pill-from);
    min-width: 45px;
}

.stat__feeds {
    font-size: 11px;
    color: var(--pill-from);
    min-width: 40px;
    text-align: right;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.stat__feeds canvas {
    display: block;
    image-rendering: pixelated;
}

.stat__progress-mini {
    position: relative; /* For absolute percent positioning */
    flex: 1;
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    overflow: visible; /* Allow percent to show */
    margin: 0 4px;
    min-width: 60px;
}

.stat__progress-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;
}

/* Solid blue for XP progress bars */
.stat__progress-fill--xp {
    background: var(--pill-to);
}

/* Gray for secondary progress (max STR) */
.stat__progress-fill--xp-secondary {
    background: var(--muted);
}

/* Legacy color variants (for non-XP usage) */
.stat__progress-fill--low { background: linear-gradient(90deg, var(--low), var(--medium)); }
.stat__progress-fill--medium { background: linear-gradient(90deg, var(--medium), var(--high)); }
.stat__progress-fill--high { background: linear-gradient(90deg, var(--high), var(--complete)); }

/* Growth panel: green for plants */
.stat__progress-fill--plant {
    background: linear-gradient(90deg, var(--accent-1), color-mix(in oklab, var(--accent-1) 70%, white));
}

/* Growth panel: purple for eggs */
.stat__progress-fill--egg {
    background: linear-gradient(90deg, var(--accent-2), color-mix(in oklab, var(--accent-2) 70%, white));
}

/* STR label inline with progress bar - supports both text and sprites */
.stat__str-label {
    font-size: 10px;
    font-weight: 700;
    color: var(--pill-to);
    white-space: nowrap;
    min-width: 50px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
}

/* Canvas sprites within stat rows */
.stat__str-label canvas {
    display: block;
    image-rendering: pixelated;
    vertical-align: middle;
}

.stat__percent {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    font-weight: 800;
    color: var(--accent);
    text-shadow:
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8);
    pointer-events: none;
    z-index: 2;
}

/* Badge Override for Pet Card */
.base-pet-card .badge {
    background: var(--pill-to);
    color: var(--pill-from);
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8) !important;
    border: none;
    font-size: 11px;
    padding: 3px 10px;
    height: auto;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 480px) {
    .base-pet-card {
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
    
    .base-pet-card__left {
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        border-bottom: 1px dashed var(--border);
        padding-bottom: 8px;
        min-width: unset;
        gap: 12px;
    }

    .base-pet-card__sprite-wrapper {
        width: 56px;
        height: 56px;
        padding: 4px;
        overflow: visible;
        flex-shrink: 0;
    }

    .base-pet-card__info {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        text-align: left;
    }

    .base-pet-card__name {
        font-size: 13px;
        max-width: 120px;
    }

    .base-pet-card .badge {
        font-size: 11px;
        padding: 4px 10px;
    }

    .base-pet-card__sprite-wrapper canvas {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain;
    }
    
    .base-pet-card__content {
        width: 100%;
        padding-top: 4px;
    }

    .stat-row {
        flex-wrap: wrap;
        gap: 6px 8px;
        margin-bottom: 8px; /* More spacing between rows on mobile */
    }

    .stat__label {
        min-width: 60px;
    }

    .stat__str-label {
        order: 0; /* Sprite FIRST on mobile */
        min-width: 30px;
        font-size: 11px;
        font-weight: 600;
        color: var(--pill-to);
    }

    .stat__timer {
        order: 1; /* Timer SECOND on mobile */
        min-width: 50px;
    }

    .stat__feeds {
        order: 2;
        min-width: 35px;
    }

    .stat__progress-mini {
        min-width: 80px;
        flex: 1;
        order: 3;
    }

    /* Percent is inside progress bar, not separate */
}
`,ql=`
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
.badge--info{    --bd: color-mix(in oklab, var(--info) 65%, var(--border)); }
.badge--success{ --bd: color-mix(in oklab, var(--high) 65%, var(--border)); }
.badge--warning{ --bd: color-mix(in oklab, var(--medium) 65%, var(--border)); }
.badge--danger{  --bd: color-mix(in oklab, var(--low) 65%, var(--border)); }

.badge.badge--neutral,
.badge.badge--info,
.badge.badge--success,
.badge.badge--warning,
.badge.badge--danger{
  border-color: var(--bd, var(--border));
}

.badge--soft.badge--info    { background-color: color-mix(in oklab, var(--info) 15%, transparent); }
.badge--soft.badge--success { background-color: color-mix(in oklab, var(--high) 14%, transparent); }
.badge--soft.badge--warning { background-color: color-mix(in oklab, var(--medium) 16%, transparent); }
.badge--soft.badge--danger  { background-color: color-mix(in oklab, var(--low) 15%, transparent); }

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
  background:transparent;
  color:inherit;
}

.badge.badge--rarity.badge--rarity-common    { background: var(--rarity-common); color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-uncommon  { background: var(--rarity-uncommon); color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-rare      { background: var(--rarity-rare); color:#ffffff; }
.badge.badge--rarity.badge--rarity-legendary { background: var(--rarity-legendary); color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-mythical  { background: var(--rarity-mythical); color:#ffffff; }
.badge.badge--rarity.badge--rarity-divine    { background: var(--rarity-divine); color:#0b0b0b; }

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

/* ===================== ABILITY ===================== */
.badge.badge--ability{
  display:inline-flex;
  align-items:center;
  padding:4px 10px;
  border-radius:6px;
  font-size:12px;
  font-weight:600;
  color:white;
  transition:background 0.2s ease;
  border:none;
  max-width:fit-content;
}
`,bg=`
/* ═══════════════════════════════════════════════════════════════════════════
   ARCADE BUTTON - 3D Push Button with Grey Base
   Reference: Classic arcade button with red dome, silver rim, dark base
   ═══════════════════════════════════════════════════════════════════════════ */

.arcade-btn {
    /* Reset */
    appearance: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    background: none;
    
    /* Size to accommodate 3D structure */
    position: relative;
    width: 44px;
    height: 40px;
    padding: 0;
    flex-shrink: 0;
    
    -webkit-tap-highlight-color: transparent;
}

/* ─────────────────────────────────────────────────────────────────────────────
   LAYER 1: Dark grey base pedestal (bottom)
   ───────────────────────────────────────────────────────────────────────────── */
.arcade-btn::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 42px;
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(to bottom, #4a4a4a, #1a1a1a);
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.6);
    z-index: 1;
}

/* ─────────────────────────────────────────────────────────────────────────────
   LAYER 2: Silver cylindrical rim (middle)
   - Viewed from above as an ellipse
   - Has inner depth shadow
   ───────────────────────────────────────────────────────────────────────────── */
.arcade-btn::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 38px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(to bottom, #c0c0c0, #808080 50%, #606060);
    box-shadow:
        inset 0 3px 4px rgba(255,255,255,0.4),
        inset 0 -3px 6px rgba(0,0,0,0.4),
        0 1px 2px rgba(0,0,0,0.3);
    z-index: 2;
}

/* ─────────────────────────────────────────────────────────────────────────────
   LAYER 3: Red dome button (top) 
   - 3D dome shape using asymmetric border-radius
   - Overlaps into rim for seamless connection
   - Has highlight and shadow for depth
   ───────────────────────────────────────────────────────────────────────────── */
.arcade-btn__top {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 34px;
    height: 22px;
    /* Asymmetric border-radius creates dome viewed from above */
    border-radius: 50% 50% 50% 50% / 70% 70% 30% 30%;
    z-index: 3;
    
    /* Red dome gradient with 3D shading */
    background: 
        /* Highlight at top-left for glossy effect */
        radial-gradient(ellipse 45% 35% at 35% 25%, 
            rgba(255,255,255,0.6), 
            transparent
        ),
        /* Main dome gradient: light red at top, dark at bottom */
        linear-gradient(to bottom, 
            #ff5555 0%,
            #ee0000 40%,
            #aa0000 80%,
            #880000 100%
        );
    
    box-shadow:
        /* Dark red underbelly visible below */
        0 4px 0 #660000,
        /* Inner shadow at bottom for 3D curve */
        inset 0 -4px 8px rgba(0,0,0,0.35),
        /* Subtle inner highlight at top */
        inset 0 2px 4px rgba(255,200,200,0.3);
    
    transition: 
        bottom 0.06s ease-out,
        box-shadow 0.06s ease-out;
}

/* Sprite content centered on button */
.arcade-btn__content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 14px;
    overflow: hidden;
    z-index: 4;
}

.arcade-btn canvas {
    image-rendering: pixelated;
    display: block;
    max-width: 100%;
    max-height: 100%;
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATES
   ───────────────────────────────────────────────────────────────────────────── */

/* Hover - slight brightness increase */
.arcade-btn:hover:not(:disabled) .arcade-btn__top {
    filter: brightness(1.08);
}

/* Pressed - button pushes down into rim */
.arcade-btn:active:not(:disabled) .arcade-btn__top,
.arcade-btn.arcade-btn--pressed .arcade-btn__top {
    bottom: 10px;
    box-shadow:
        0 2px 0 #660000,
        inset 0 -2px 4px rgba(0,0,0,0.3),
        inset 0 1px 2px rgba(255,200,200,0.2);
}

/* Disabled */
.arcade-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Focus ring */
.arcade-btn:focus-visible .arcade-btn__top {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANTS - Override button top color only
   Base and rim stay the same (grey)
   ═══════════════════════════════════════════════════════════════════════════ */

/* Plant variant - Cyan/Teal */
.arcade-btn--plant .arcade-btn__top {
    background: 
        radial-gradient(ellipse 45% 35% at 35% 25%, 
            rgba(255,255,255,0.6), 
            transparent
        ),
        linear-gradient(to bottom, 
            #44dddd 0%,
            #00bbbb 40%,
            #008888 80%,
            #006666 100%
        );
    box-shadow:
        0 4px 0 #004444,
        inset 0 -4px 8px rgba(0,0,0,0.35),
        inset 0 2px 4px rgba(200,255,255,0.3);
}

.arcade-btn--plant:active:not(:disabled) .arcade-btn__top {
    box-shadow:
        0 2px 0 #004444,
        inset 0 -2px 4px rgba(0,0,0,0.3),
        inset 0 1px 2px rgba(200,255,255,0.2);
}

/* Egg variant - Purple */
.arcade-btn--egg .arcade-btn__top {
    background: 
        radial-gradient(ellipse 45% 35% at 35% 25%, 
            rgba(255,255,255,0.6), 
            transparent
        ),
        linear-gradient(to bottom, 
            #aa66ff 0%,
            #8844dd 40%,
            #6622aa 80%,
            #441177 100%
        );
    box-shadow:
        0 4px 0 #331066,
        inset 0 -4px 8px rgba(0,0,0,0.35),
        inset 0 2px 4px rgba(220,200,255,0.3);
}

.arcade-btn--egg:active:not(:disabled) .arcade-btn__top {
    box-shadow:
        0 2px 0 #331066,
        inset 0 -2px 4px rgba(0,0,0,0.3),
        inset 0 1px 2px rgba(220,200,255,0.2);
}
`,p_=`
  .ability-logs-container {
    width: 100%;
  }

  .ability-logs-list {
    /* Scrollbar styling */
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .ability-logs-list::-webkit-scrollbar {
    width: 6px;
  }

  .ability-logs-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .ability-logs-list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  .ability-logs-list::-webkit-scrollbar-thumb:hover {
    background: color-mix(in oklab, var(--border) 70%, var(--fg) 30%);
  }

  .ability-log-item {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  /* Touch-friendly on mobile */
  @media (hover: none) and (pointer: coarse) {
    .ability-log-item {
      padding: 14px !important;
    }

    .ability-log-item:active {
      transform: scale(0.98);
    }
  }

  /* Responsive text sizing */
  @media (max-width: 480px) {
    .ability-log-item {
      padding: 10px !important;
      gap: 10px !important;
    }
  }

  /* Empty state styling */
  .ability-logs-empty {
    /* Styles are inline in AbilityLogsCard.ts */
  }

  /* Smooth animations */
  @media (prefers-reduced-motion: no-preference) {
    .ability-log-item {
      transition: all 0.2s ease;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ability-log-item {
      transition: none;
    }
  }
`;class f_ extends Ut{constructor(n){super({id:"tab-pets",label:"Pets"});M(this,"unsubscribeMyPets");M(this,"lastActiveTeamId",null);M(this,"teamCardPart",null);M(this,"abilityLogsCardPart",null);M(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Ye(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>Cl);return {MGSprite:i}},void 0);await r.init();const o=n.getRootNode();ye(o,mg,"team-card-styles"),ye(o,hg,"base-pet-card-styles"),ye(o,ql,"badge-styles"),ye(o,bg,"arcade-button-styles"),ye(o,gg,"gemini-icon-button-styles"),ye(o,p_,"ability-logs-card-styles");const a=this.createGrid("12px");a.id="pets",n.appendChild(a),this.initializeTeamCardPart(a),this.initializeAbilityLogsCardPart(a),this.unsubscribeMyPets=ce.myPets.subscribeStable(()=>{const i=ae.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=ae.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new i_({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new u_);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}class g_{constructor(t){M(this,"root");M(this,"options");M(this,"headerElement",null);M(this,"petsContainer",null);M(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${t.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `);}updatePets(t){if(this.petsContainer){this.petsContainer.innerHTML="";for(const n of t){const r=this.buildPetCard(n);this.petsContainer.appendChild(r);}}}buildPetCard(t){const n=document.createElement("div");n.className="xp-pet-card",t.isStarving&&n.classList.add("xp-pet-card--starving"),t.isMaxStrength&&n.classList.add("xp-pet-card--max");const r=document.createElement("div");r.className="xp-pet-card__sprite";const o=document.createElement("div");o.className="xp-pet-card__sprite-wrapper";try{const l=t.mutations;if(z.has("pet",t.species)){const u=z.toCanvas("pet",t.species,{mutations:l,scale:1,boundsMode:"padded"});u.style.width="64px",u.style.height="64px",u.style.objectFit="contain",u.style.display="block",o.appendChild(u);}else o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}catch(l){console.warn(`[TeamXpPanel] Failed to render sprite for ${t.species}:`,l),o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}r.appendChild(o);const a=document.createElement("div");if(a.className="xp-pet-card__badges",t.isMaxStrength&&(a.innerHTML+='<span class="xp-badge xp-badge--max">MAX</span>'),t.isStarving&&(a.innerHTML+='<span class="xp-badge xp-badge--starving">STARVING</span>'),t.xpBoostStats){const l=t.xpBoostStats.tier==="Snowy"?"❄":"⚡";a.innerHTML+=`<span class="xp-badge xp-badge--boost">${l}${t.xpBoostStats.tier}</span>`;}r.appendChild(a);const i=document.createElement("div");i.className="xp-pet-card__str-display",i.innerHTML=`
            <span class="xp-str__label">STR</span>
            <span class="xp-str__current">${t.currentStrength}</span>
            <span class="xp-str__separator">/</span>
            <span class="xp-str__max">${t.maxStrength}</span>
        `,r.appendChild(i),n.appendChild(r);const s=document.createElement("div");s.className="xp-pet-card__stats";const c=document.createElement("div");c.className="xp-pet-card__name",c.textContent=t.name||t.species,s.appendChild(c);const d=document.createElement("table");return d.className="xp-stats-table",t.isStarving?d.innerHTML=`
                <tr class="xp-stats-table__row xp-stats-table__row--warning">
                    <td class="xp-stats-table__label">Status</td>
                    <td class="xp-stats-table__value xp-stats-table__value--danger">0 XP/hr - FEED NOW!</td>
                </tr>
            `:d.innerHTML=`
                ${t.isMaxStrength?"":`
                <tr class="xp-stats-table__row">
                    <td class="xp-stats-table__label">Next STR</td>
                    <td class="xp-stats-table__value">
                        ${this.buildProgressWithStats(t,"next")}
                    </td>
                </tr>
                <tr class="xp-stats-table__row">
                    <td class="xp-stats-table__label">Max STR</td>
                    <td class="xp-stats-table__value">
                        ${this.buildProgressWithStats(t,"max")}
                    </td>
                </tr>
                `}
                ${t.xpBoostStats?`
                <tr class="xp-stats-table__row xp-stats-table__row--boost">
                    <td class="xp-stats-table__label">XP Boost</td>
                    <td class="xp-stats-table__value">
                        <span class="xp-boost-stat">+${t.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/hr</span>
                        ${t.xpBoostStats.isActive?"":'<span class="xp-inactive">(inactive)</span>'}
                    </td>
                </tr>
                `:""}
                ${t.supportingFeeds!==null?`
                <tr class="xp-stats-table__row xp-stats-table__row--support">
                    <td class="xp-stats-table__label">Supporting</td>
                    <td class="xp-stats-table__value">
                        <span class="xp-support">${t.supportingFeeds} feeds to carry team</span>
                    </td>
                </tr>
                `:""}
            `,s.appendChild(d),n.appendChild(s),n}buildProgressWithStats(t,n){const r=n==="next"?t.hoursToNextStrength:t.hoursToMaxStrength,o=n==="next"?t.feedsToNextStrength:t.feedsToMaxStrength,a=t.currentStrength-Math.floor(t.currentStrength),i=Math.floor(n==="next"?a*100:t.currentStrength/t.maxStrength*100),s=n==="next"?Math.min(99,Math.max(1,i)):Math.min(100,Math.max(0,i)),c=s<33?"low":s<67?"medium":"high";return `
            <div class="xp-progress-row">
                <span class="xp-progress-row__time">${this.formatHours(r)}</span>
                <span class="xp-progress-row__feeds">(🍖 x${o})</span>
                <div class="xp-progress-row__bar-container">
                    <div class="xp-progress-row__bar">
                        <div class="xp-progress-row__fill xp-progress-row__fill--${c}" style="width: ${s}%"></div>
                    </div>
                    <span class="xp-progress-row__percent">${s}%</span>
                </div>
            </div>
        `}updateFooter(t,n){if(!this.footerElement)return;if(t.activeBoosterCount===0){this.footerElement.innerHTML="",this.footerElement.classList.add("xp-panel__footer--hidden");return}this.footerElement.classList.remove("xp-panel__footer--hidden");const o=n.filter(a=>a.xpBoostStats?.isActive).map(a=>a.name||a.species).join(", ");this.footerElement.innerHTML=`
            <div class="xp-panel__footer-icon">⚡</div>
            <div class="xp-panel__footer-content">
                <div class="xp-panel__footer-title">
                    ${t.activeBoosterCount} XP Booster${t.activeBoosterCount!==1?"s":""} Active
                </div>
                <div class="xp-panel__footer-detail">
                    +${t.bonusXpPerHour.toLocaleString()} bonus XP/hr
                    <span class="xp-panel__footer-names">(${o})</span>
                </div>
            </div>
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),r=Math.floor(t%24);return `${n}d ${r}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const m_={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=dd(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new g_({teamId:e.id});t.appendChild(n.build());const r=er(e.id);return r&&n.update(r),{update:(o,a)=>{const i=er(o.id);i&&n.update(i);},destroy:()=>n.destroy(),refresh:()=>{const o=er(e.id);o&&n.update(o);}}},renderPetSlot:(e,t,n)=>{const r=ce.weather.get(),o=r.isActive?r.type:null,a=er(t.id),i=a?.teamSummary.bonusXpPerHour||0,s=a?.pets||[],c=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),d=ys(e,o,i,c),l=d.isMaxStrength,u=!!d.xpBoostStats;let p="";if(l)u&&d.xpBoostStats&&(p=`
                    <div class="stat-row stat-row--boost">
                        <span class="stat__label">BOOST</span>
                        <span class="stat__value stat__value--accent">+${d.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/h</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat__label">SUPPORT</span>
                        <span class="stat__value">${d.supportingFeeds} feeds</span>
                    </div>
                `);else {let f="";u&&d.xpBoostStats&&(f=`
                    <div class="stat-row stat-row--boost">
                        <span class="stat__label">BOOST</span>
                        <span class="stat__value stat__value--accent">+${d.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/h</span>
                    </div>
                `);const g=d.maxStrength,m=d.currentStrength,b=Math.min(100,Math.max(0,Math.floor(m/g*100))),y=e.xp%3600/3600*100,C=Math.min(99,Math.max(1,Math.floor(y))),S=d.currentStrength+1,v=d.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${ud(d.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${S}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${C}%"></div>
                        <span class="stat__percent">${C}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${ud(d.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${v}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${b}%"></div>
                        <span class="stat__percent">${b}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},renderGroupedSlot:(e,t,n)=>{const r=ce.weather.get(),o=r.isActive?r.type:null,i=er(t.id)?.teamSummary.bonusXpPerHour||0;let s=0,c=0;for(const l of e){const u=ys(l,o,i,0);u.xpBoostStats&&(s+=u.xpBoostStats.expectedXpPerHour),u.supportingFeeds&&(c+=u.supportingFeeds);}let d="";if(s>0&&(d=`
                <div class="stat-row stat-row--boost">
                    <span class="stat__label">TEAM BOOST</span>
                    <span class="stat__value stat__value--accent">+${s.toLocaleString()} XP/h</span>
                </div>
            `,c>0&&(d+=`
                    <div class="stat-row">
                        <span class="stat__label">SUPPORT</span>
                        <span class="stat__value">${c} feeds</span>
                    </div>
                `)),s===0){if(e.every(u=>u.currentStrength>=u.maxStrength))n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">All pets at max STR</span>
                        </div>
                    </div>
                `;else {const u=dd(t.id);n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(u)}%</span>
                        </div>
                    </div>
                `;}return}n.innerHTML=`<div class="xp-stats-compact xp-stats-grouped">${d}</div>`;},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.some(a=>a.currentStrength<a.maxStrength)?true:n.some(a=>a.abilities.some(i=>W.XP_BOOST.includes(i)))},shouldDisplay:(e,t,n)=>(Za.ALLOWED_PANELS[n.primary]||[]).includes("xp")?!!(t.some(i=>i.currentStrength<i.maxStrength)||t.some(i=>i.abilities.some(s=>W.XP_BOOST.includes(s)))):false,countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.every(o=>o.currentStrength>=o.maxStrength)?n.some(a=>a.abilities.some(i=>W.XP_BOOST.includes(i)))?1:0:2}};function Te(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Lt(e){if(e<=0)return "0m";const t=Math.floor(e/1e3),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),o=Math.floor(t%3600/60),a=[];return n>0&&a.push(`${n}d`),r>0&&a.push(`${r}h`),(o>0||a.length===0)&&a.push(`${o}m`),a.join(" ")}function Rt(e,t){const n=e==="egg"?"pet":"plant",r=Te("span","sprite-wrapper");if(!t)return r;let o=t;e==="plant"&&(o==="DawnCelestial"&&(o="DawnCelestialCrop"),o==="MoonCelestial"&&(o="MoonCelestialCrop"));try{if(z.isReady()&&z.has(n,o)){const a=z.toCanvas(n,o,{scale:.3});a.style.height="16px",a.style.width="auto",a.style.imageRendering="pixelated",r.appendChild(a);}}catch{}return r}function Ho(e,t){const n=Te("span","stacked-sprites");if(t.length===0)return n;const r=e==="egg"?"pet":"plant",o=4,i=[...new Set(t.map(c=>e==="egg"?c.eggId:c.species).filter(Boolean))].slice(0,o);if(i.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let c=0;c<i.length;c++){let d=i[c];e==="plant"&&d&&(d==="DawnCelestial"&&(d="DawnCelestialCrop"),d==="MoonCelestial"&&(d="MoonCelestialCrop"));try{if(z.isReady()&&d&&z.has(r,d)){const l=z.toCanvas(r,d,{scale:.2});l.style.height="14px",l.style.width="auto",l.style.imageRendering="pixelated",l.style.position="relative",l.style.zIndex=String(o-c),n.appendChild(l),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function Ot(e,t,n,r,o,a){const i=Te("div","stat-row"),s=Te("span","stat__label",e),c=Te("span","stat__timer",t),d=Te("span","stat__str-label");d.appendChild(n);const l=Te("div","stat__progress-mini"),u=Te("div",`stat__progress-fill ${o}`);u.style.width=`${r}%`,l.appendChild(u);const p=`${r}%`,f=Te("span","stat__percent",p);return l.appendChild(f),i.appendChild(s),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&i.appendChild(d),i.appendChild(c),i.appendChild(l),i}function hd(e){const t=Te("div","stat-row stat-row--boost"),n=Te("span","stat__label","BOOST");t.appendChild(n);const r=Te("span","stat__values-row");return e.forEach((o,a)=>{const i=Te("span","stat__boost-item");i.appendChild(o.sprite),i.appendChild(Te("span","stat__value stat__value--accent",o.text)),r.appendChild(i),a<e.length-1&&r.appendChild(Te("span","stat__separator"," "));}),t.appendChild(r),t}function bd(e,t){const n=t==="egg"?Wr:Vr;let r=0,o=false;const a=[];for(const i of e.abilities)if(i in n){const s=n[i],c=s.procRate*60;r+=c*s.minutesPerProc,o=true,a.push(i);}return {hasBoost:o,minutesPerProc:0,hourlyReduction:r,abilityName:a.join(", ")}}function xd(e,t){const n=ae.getPetsForTeam(e),r=t==="egg"?Gl(n):zl(n);return `${((60+Xr(r).timeReductionPerHour)/60).toFixed(2)}x`}function jo(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.plantedAt,s=(o.maturedAt-t)/n,c=a+s,d=c>0?a/c*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function Uo(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.startTime,s=(o.endTime-t)/n,c=a+s,d=c>0?a/c*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function yd(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.maturedAt-a.maturedAt)[0];return {remainingMs:Math.max(0,r.maturedAt-t),name:r.eggId||null}}function vd(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.endTime-a.endTime)[0];return {remainingMs:Math.max(0,r.endTime-t),name:r.species||null}}function wd(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(r=>r.maturedAt));return Math.max(0,n-t)}function Sd(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(r=>r.endTime));return Math.max(0,n-t)}function Ft(e,t){return e<=0||t<=0?0:Math.round(e/t)}const h_={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=ce.myGarden.get(),r=n.eggs.growing.length+n.plants.growing.length;return r===0?null:{text:`${r} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r,o)=>{const a=ce.myGarden.get(),i=Date.now(),s=bd(e,"egg"),c=bd(e,"plant");if(n.innerHTML="",!s.hasBoost&&!c.hasBoost)return;const d=o?a.eggs.growing.filter(x=>o.has(x.tileIndex)):a.eggs.growing,l=o?a.crops.growing.filter(x=>o.has(x.tileIndex)):a.crops.growing;let u=r;!u&&s.hasBoost!==c.hasBoost&&(u=s.hasBoost?"egg":"plant");const p=u==="egg"&&s.hasBoost||u==="plant"&&c.hasBoost,f=!u,g=Te("div","growth-stats-compact");if(!p&&!f){const x=r==="egg"?"Egg":"Plant",w=Te("div","stat-row stat-row--message");w.appendChild(Te("span","stat__message",`No ${x} Growth Boost, Click the Button to Switch View`)),g.appendChild(w),n.appendChild(g);return}const m=[],b=s.hasBoost&&(u==="egg"||f),y=c.hasBoost&&(u==="plant"||f);if(b){const x=Math.round(s.hourlyReduction/60*100);m.push({text:`+${x}% Speed`,sprite:Rt("egg","UncommonEgg")});}if(y){const x=Math.round(c.hourlyReduction/60*100);m.push({text:`+${x}% Speed`,sprite:Rt("plant","Carrot")});}m.length>0&&g.appendChild(hd(m));const C=xd(t,"egg"),S=parseFloat(C.replace("x","")),v=xd(t,"plant"),A=parseFloat(v.replace("x",""));if(s.hasBoost&&(u==="egg"||f)){const x=yd(d,i),w=Ft(x.remainingMs,S),_=d.length>0?jo(d,i,S):100,k=w>0?Lt(w):"Ready!";g.appendChild(Ot("NEXT EGG",k,Rt("egg",x.name),_,"stat__progress-fill--egg"));}if(c.hasBoost&&(u==="plant"||f)){const x=vd(l,i),w=Ft(x.remainingMs,A),_=l.length>0?Uo(l,i,A):100,k=w>0?Lt(w):"Ready!";g.appendChild(Ot("NEXT PLANT",k,Rt("plant",x.name),_,"stat__progress-fill--plant"));}if(s.hasBoost&&(u==="egg"||f)){const x=d.length>0?jo(d,i,S):100,w=wd(d,i),_=Ft(w,S),k=_>0?Lt(_):"All Ready!";g.appendChild(Ot("ALL EGGS",k,Ho("egg",d),x,"stat__progress-fill--egg"));}else if(c.hasBoost&&(u==="plant"||f)){const x=l.length>0?Uo(l,i,A):100,w=Sd(l,i),_=Ft(w,A),k=_>0?Lt(_):"All Ready!";g.appendChild(Ot("ALL PLANTS",k,Ho("plant",l),x,"stat__progress-fill--plant"));}n.appendChild(g);},renderGroupedSlot:(e,t,n,r,o)=>{const a=ce.myGarden.get(),i=Date.now(),s=Gl(e),c=zl(e),d=Xr(s),l=Xr(c);n.innerHTML="";const u=d.timeReductionPerHour>0,p=l.timeReductionPerHour>0;if(!u&&!p)return;const f=Te("div","growth-stats-compact growth-stats-grouped"),g=o?a.eggs.growing.filter(x=>o.has(x.tileIndex)):a.eggs.growing,m=o?a.crops.growing.filter(x=>o.has(x.tileIndex)):a.crops.growing,b=r==="egg"&&u,y=r==="plant"&&p,C=!r,S=(60+d.timeReductionPerHour)/60,v=(60+l.timeReductionPerHour)/60,A=[];if((b||C)&&u){const x=Math.round(d.timeReductionPerHour/60*100);A.push({text:`+${x}% Speed`,sprite:Rt("egg","UncommonEgg")});}if((y||C)&&p){const x=Math.round(l.timeReductionPerHour/60*100);A.push({text:`+${x}% Speed`,sprite:Rt("plant","Carrot")});}if(A.length>0&&f.appendChild(hd(A)),(b||C)&&u){const x=yd(g,i),w=Ft(x.remainingMs,S),_=g.length>0?jo(g,i,S):100,k=w>0?Lt(w):"Ready!";f.appendChild(Ot("NEXT EGG",k,Rt("egg",x.name),_,"stat__progress-fill--egg"));}if((y||C)&&p){const x=vd(m,i),w=Ft(x.remainingMs,v),_=m.length>0?Uo(m,i,v):100,k=w>0?Lt(w):"Ready!";f.appendChild(Ot("NEXT PLANT",k,Rt("plant",x.name),_,"stat__progress-fill--plant"));}if((b||C)&&u){const x=g.length>0?jo(g,i,S):100,w=wd(g,i),_=Ft(w,S),k=_>0?Lt(_):"All Ready!";f.appendChild(Ot("ALL EGGS",k,Ho("egg",g),x,"stat__progress-fill--egg"));}else if((y||C)&&p){const x=m.length>0?Uo(m,i,v):100,w=Sd(m,i),_=Ft(w,v),k=_>0?Lt(_):"All Ready!";f.appendChild(Ot("ALL PLANTS",k,Ho("plant",m),x,"stat__progress-fill--plant"));}n.appendChild(f);},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return Mn(n)||Ln(n)},shouldDisplay:(e,t,n)=>{const o=(Za.ALLOWED_PANELS[n.primary]||[]).includes("growth"),a=Mn(t)||Ln(t);return o&&a},countRows:(e,t,n)=>{const r=Array.isArray(e)?e:[e],o=Mn(r),a=Ln(r);if(!o&&!a)return 0;if(n==="egg"||n==="plant")return 2;let i=0;return o&&(i+=2),a&&(i+=2),i}},ei=1.5,gr=["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],mr=["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],hr=["RainDance","SnowGranter","FrostGranter","GoldGranter","RainbowGranter"],br=["DoubleHarvest"],xr=["ProduceRefund"];function _t(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Nt(e){if(e>=1e12)return `${(e/1e12).toFixed(2)}T`;if(e>=1e9)return `${(e/1e9).toFixed(2)}B`;if(e>=1e6)return `${(e/1e6).toFixed(2)}M`;if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)}k`:`${t.toFixed(1)}k`}return String(Math.round(e))}function Kn(e){const t=X.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,scaleIncreasePercentage:n.baseParameters?.scaleIncreasePercentage??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0,grantedMutations:n.baseParameters?.grantedMutations??[],requiredWeather:n.baseParameters?.requiredWeather??null}:null}function _e(e,t){return e.abilities.some(n=>t.includes(n))}function uo(e,t,n){if(e.hunger<=0)return  false;const r=Kn(t);return !(!r||r.requiredWeather&&n!==r.requiredWeather)}function po(e){return (e.currentStrength<0||e.currentStrength>100)&&console.warn(`[Gemini] Invalid strength: ${e.currentStrength} for pet ${e.name||"unknown"}`),(e.maxStrength<80||e.maxStrength>100)&&console.warn(`[Gemini] Unexpected maxStrength: ${e.maxStrength} for pet ${e.name||"unknown"} (expected 80-100)`),e.currentStrength/100}function ti(e,t){return Math.min(100,e*t)}function b_(e,t,n,r,o=ei){const a=Ha(e);if(!a)return 0;const i=ft(e,t,n)*o,s=Math.min(t*(1+r/100),a.maxScale),c=ft(e,s,n)*o;return Math.max(0,c-i)}function xg(e,t,n,r,o=ei){if(n.includes(r))return 0;const a=ft(e,t,n)*o,i=[...n,r],s=ft(e,t,i)*o;return Math.max(0,s-a)}function Oi(e,t,n){const r=_t("div","stat-row");return r.appendChild(_t("span","stat__label",e)),r.appendChild(_t("span","stat__value",t)),r.appendChild(_t("span","stat__timer",n)),r}function Cd(e,t,n){const r=_t("div","stat-row");return r.appendChild(_t("span","stat__label",e)),r.appendChild(_t("span","stat__value",t)),r.appendChild(_t("span","stat__timer",n)),r}function x_(e,t,n){const o=ce.myGarden.get().crops.mature,a=n?o.filter(d=>n.has(String(d.tileIndex))):o;if(a.length===0)return {perProc:0,perHour:0};let i=0,s=0;for(const d of e){const l=po(d);for(const u of gr){if(!d.abilities.includes(u)||!uo(d,u,t))continue;const p=Kn(u);if(!p)continue;const f=ti(p.baseProbability,l),g=p.scaleIncreasePercentage*l,m=f/100*60;let b=0,y=0;for(const S of a){const v=Math.max(1,Math.floor(S.fruitCount)),A=b_(S.species,S.targetScale,S.mutations,g);b+=A*v,y+=v;}const C=y>0?b/y:0;i+=C*m,s+=m;}}return {perProc:s>0?i/s:0,perHour:i}}function y_(e,t,n){const o=ce.myGarden.get().crops.mature,a=ce.weather.get(),i=X.get("weather"),s=n?o.filter(b=>n.has(String(b.tileIndex))):o;if(s.length===0||!a.isActive||!i)return {perProc:0,perHour:0};const c=i[a.type];if(!c?.mutator)return {perProc:0,perHour:0};const d=c.mutator.chancePerMinutePerCrop??0,l=c.mutator.mutation??"";let u=0;for(const b of e){const y=po(b);for(const C of mr){if(!b.abilities.includes(C)||!uo(b,C,t))continue;const S=Kn(C);if(!S)continue;const v=S.mutationChanceIncreasePercentage*y;u+=v;}}const p=d*(u/100),f=s.length*(p/100)*60;let g=0;for(const b of s){const y=xg(b.species,b.targetScale,b.mutations,l);g+=y;}const m=s.length>0?g/s.length:0;return {perProc:m,perHour:f*m}}function v_(e,t,n){const o=ce.myGarden.get().crops.mature,a=n?o.filter(d=>n.has(String(d.tileIndex))):o;if(a.length===0)return {perProc:0,perHour:0};let i=0,s=0;for(const d of e){const l=po(d);for(const u of hr){if(!d.abilities.includes(u)||!uo(d,u,t))continue;const p=Kn(u);if(!p)continue;const g=ti(p.baseProbability,l)/100*60,m=p.grantedMutations;if(m.length===0)continue;const b=m[0];let y=0,C=0;for(const A of a){if(b==="Gold"||b==="Rainbow"){const k=A.mutations.includes("Gold"),T=A.mutations.includes("Rainbow");if(k||T)continue}else if(A.mutations.includes(b))continue;const w=Math.max(1,Math.floor(A.fruitCount)),_=xg(A.species,A.targetScale,A.mutations,b);y+=_*w,C+=w;}const v=(C>0?y/C:0)*g;i+=v,s+=g;}}return {perProc:s>0?i/s:0,perHour:i}}function w_(e,t,n){const r=ce.myGarden.get(),o=r.crops.all,a=r.crops.mature,i=n?o.filter(p=>n.has(String(p.tileIndex))):o,s=n?a.filter(p=>n.has(String(p.tileIndex))):a,c=s.length>0?s:i;if(c.length===0)return {expectedCrops:0,expectedCoins:0};let d=0;for(const p of e){const f=po(p);for(const g of br){if(!p.abilities.includes(g)||!uo(p,g,t))continue;const m=Kn(g);if(!m)continue;const b=ti(m.baseProbability,f);d+=b/100;}}const l=c.length*d;let u=0;for(const p of c){const f=ft(p.species,p.targetScale,p.mutations)*ei;u+=f*d;}return {expectedCrops:l,expectedCoins:u}}function S_(e,t,n){const r=ce.myGarden.get(),o=r.crops.all,a=r.crops.mature,i=n?o.filter(p=>n.has(String(p.tileIndex))):o,s=n?a.filter(p=>n.has(String(p.tileIndex))):a,c=s.length>0?s:i;if(c.length===0)return {expectedCrops:0,expectedCoins:0};let d=0;for(const p of e){const f=po(p);for(const g of xr){if(!p.abilities.includes(g)||!uo(p,g,t))continue;const m=Kn(g);if(!m)continue;const b=ti(m.baseProbability,f);d+=b/100;}}const l=c.length*d;let u=0;for(const p of c){const f=ft(p.species,p.targetScale,p.mutations)*ei;u+=f*d;}return {expectedCrops:l,expectedCoins:u}}const As={id:"coin",label:"Value",icon:"💰",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=ce.myGarden.get(),r=n.crops.all.length;return r===0?null:{text:`${r} crops`,variant:"neutral",tooltip:`${n.crops.mature.length} mature, ${n.crops.growing.length} growing`,priority:7}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r,o)=>{const a=[e];As.renderGroupedSlot&&As.renderGroupedSlot(a,t,n,r,o);},renderGroupedSlot:(e,t,n,r,o)=>{const a=ce.weather.get(),i=a.isActive?a.type:null;n.innerHTML="";const s=_t("div","value-stats-compact"),c=e.some(f=>_e(f,gr)),d=e.some(f=>_e(f,mr)),l=e.some(f=>_e(f,hr)),u=e.some(f=>_e(f,br)),p=e.some(f=>_e(f,xr));if(!(!c&&!d&&!l&&!u&&!p)){if(c){const f=x_(e,i,o);s.appendChild(Oi("SIZE BOOST",`+${Nt(f.perProc)}/proc`,`+${Nt(f.perHour)}/hr`));}if(d){const f=y_(e,i,o);s.appendChild(Oi("MUTATION BOOST",`+${Nt(f.perProc)}/proc`,`+${Nt(f.perHour)}/hr`));}if(l){const f=v_(e,i,o);s.appendChild(Oi("GRANTERS",`+${Nt(f.perProc)}/proc`,`+${Nt(f.perHour)}/hr`));}if(u){const f=w_(e,i,o);s.appendChild(Cd("EXTRA HARVEST",`+${f.expectedCrops.toFixed(1)} crops`,`+${Nt(f.expectedCoins)} coins`));}if(p){const f=S_(e,i,o);s.appendChild(Cd("CROP REFUND",`+${f.expectedCrops.toFixed(1)} crops`,`+${Nt(f.expectedCoins)} coins`));}n.appendChild(s);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(r=>_e(r,gr)||_e(r,mr)||_e(r,hr)||_e(r,br)||_e(r,xr)),shouldDisplay:(e,t,n)=>{const o=(Za.ALLOWED_PANELS[n.primary]||[]).includes("coin"),a=t.some(i=>_e(i,gr)||_e(i,mr)||_e(i,hr)||_e(i,br)||_e(i,xr));return o&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let r=0;return n.some(o=>_e(o,gr))&&r++,n.some(o=>_e(o,mr))&&r++,n.some(o=>_e(o,hr))&&r++,n.some(o=>_e(o,br))&&r++,n.some(o=>_e(o,xr))&&r++,r}},vn=["DoubleHatch"],wn=["PetRefund","PetRefundII"],Sn=["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"];function Ve(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function yg(e){const t=X.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0}:null}function Be(e,t){return e.abilities.some(n=>t.includes(n))}function Kl(e){return e.hunger>0}function vg(e){return e.currentStrength/e.maxStrength}function wg(e,t){return Math.min(100,e*t)}function C_(e){const t=Ve("span","sprite-wrapper");try{if(z.isReady()&&z.has("pet",e)){const n=z.toCanvas("pet",e,{scale:.6});n.style.height="32px",n.style.width="auto",n.style.imageRendering="pixelated",t.appendChild(n);}}catch{t.textContent="🥚";}return t}function Wo(e,t){const n=Ve("div","stat-row");n.appendChild(Ve("span","stat__label",e));const r=Ve("div","stat__sprite-grid");for(const o of t){if(o.value<=0)continue;const a=Ve("div","stat__sprite-item");a.appendChild(C_(o.eggId));const i=Ve("span","stat__sprite-value",o.value.toFixed(1));a.appendChild(i),r.appendChild(a);}return n.appendChild(r),n}function kd(e,t,n,r){const o=Ve("div","stat-row");o.appendChild(Ve("span","stat__label","PET MUTATION"));const a=Ve("span","stat__values-row"),i=Ve("span","stat__value stat__value--rainbow",`${e}% (${n})`);i.style.backgroundImage="var(--rainbow-text-gradient)",i.style.webkitBackgroundClip="text",i.style.webkitTextFillColor="transparent",i.style.backgroundClip="text",a.appendChild(i),a.appendChild(Ve("span","stat__separator"," | "));const s=Ve("span","stat__value stat__value--gold",`${t}% (${r})`);return a.appendChild(s),o.appendChild(a),o}function Yl(){const e=ce.myInventory.get(),t=new Map;for(const n of e.items)if(n.itemType==="Egg"&&n.eggId){const r=t.get(n.eggId)||0;t.set(n.eggId,r+(n.quantity||1));}return t}function Jl(e){const t=ce.myGarden.get(),n=new Map,r=e?t.eggs.all.filter(o=>e.has(String(o.tileIndex))):t.eggs.all;for(const o of r){const a=n.get(o.eggId)||0;n.set(o.eggId,a+1);}return n}function _d(e,t){const n=t?Jl(t):Yl(),r=[];let o=0;for(const a of e){if(!Kl(a))continue;const i=vg(a);for(const s of vn){if(!a.abilities.includes(s))continue;const c=yg(s);if(!c)continue;const d=wg(c.baseProbability,i);o+=d/100;}}for(const[a,i]of n){const s=i*o;r.push({eggId:a,value:s});}return r}function Ad(e,t){const n=t?Jl(t):Yl(),r=[];let o=0;for(const a of e){if(!Kl(a))continue;const i=vg(a);for(const s of wn){if(!a.abilities.includes(s))continue;const c=yg(s);if(!c)continue;const d=wg(c.baseProbability,i);o+=d/100;}}for(const[a,i]of n){const s=i*o;r.push({eggId:a,value:s});}return r}function Td(e,t){const n=t?Jl(t):Yl(),r=Array.from(n.values()).reduce((f,g)=>f+g,0);let o=0,a=0;for(const f of e){if(!Kl(f))continue;Sn.some(m=>f.abilities.includes(m))&&(o+=f.currentStrength*1e-4,a+=f.currentStrength*.001);}const i=X.get("mutations");let s=1,c=.1;if(i){const f=i.Gold,g=i.Rainbow;f?.baseChance!==void 0&&(s=f.baseChance),g?.baseChance!==void 0&&(c=g.baseChance);}const d=s+a,l=c+o,u=r*d/100,p=r*l/100;return {goldChance:d,rainbowChance:l,expectedGold:u,expectedRainbow:p}}const k_={id:"hatch",label:"Hatching",icon:"🥚",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const r=ce.myInventory.get().items.filter(o=>o.itemType==="Egg").reduce((o,a)=>o+(a.quantity||1),0);return r===0?null:{text:`${r} eggs`,variant:"neutral",tooltip:`${r} eggs in inventory`,priority:6}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r,o)=>{n.innerHTML="";const a=Ve("div","hatching-stats-compact"),i=Be(e,vn),s=Be(e,wn),c=Be(e,Sn);if(!i&&!s&&!c)return;const d=[e];if(i){const l=_d(d,o);l.length>0&&a.appendChild(Wo("DOUBLE HATCH",l));}if(s){const l=Ad(d,o);l.length>0&&a.appendChild(Wo("PET REFUND",l));}if(c){const l=Td(d,o),u=l.rainbowChance.toFixed(4),p=l.goldChance.toFixed(2),f=l.expectedRainbow<.01?`~${(l.expectedRainbow*100).toFixed(1)}%e`:l.expectedRainbow.toFixed(2),g=l.expectedGold.toFixed(2);a.appendChild(kd(u,p,f,g));}n.appendChild(a);},renderGroupedSlot:(e,t,n,r,o)=>{n.innerHTML="";const a=Ve("div","hatching-stats-compact"),i=e.some(d=>Be(d,vn)),s=e.some(d=>Be(d,wn)),c=e.some(d=>Be(d,Sn));if(!(!i&&!s&&!c)){if(i){const d=_d(e,o);d.length>0&&a.appendChild(Wo("DOUBLE HATCH",d));}if(s){const d=Ad(e,o);d.length>0&&a.appendChild(Wo("PET REFUND",d));}if(c){const d=Td(e,o),l=d.rainbowChance.toFixed(4),u=d.goldChance.toFixed(2),p=d.expectedRainbow<.01?`~${(d.expectedRainbow*100).toFixed(1)}%e`:d.expectedRainbow.toFixed(2),f=d.expectedGold.toFixed(2);a.appendChild(kd(l,u,p,f));}n.appendChild(a);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(r=>Be(r,vn)||Be(r,wn)||Be(r,Sn)),shouldDisplay:(e,t,n)=>{const o=(Za.ALLOWED_PANELS[n.primary]||[]).includes("hatch"),a=t.some(i=>Be(i,vn)||Be(i,wn)||Be(i,Sn));return o&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let r=0;return n.some(o=>Be(o,vn))&&r++,n.some(o=>Be(o,wn))&&r++,n.some(o=>Be(o,Sn))&&r++,r}},Pd=[m_,h_,As,k_];function __(e){let t=e;return t=t.replace(/_NEW$/,""),t=t.replace(/^Snowy/,""),t=t.replace(/(I|II|III|IV)$/,""),t}function Sg(e){return new Set(e.abilities.map(__))}function ir(e,t){if(e.size!==t.size)return  false;for(const n of e)if(!t.has(n))return  false;return  true}function Id(e,t){return Sg(e).has(t)}function A_(e,t){if(e.length<2)return {shouldGroup:false,matchingPets:[],remainingPets:e};if(t){const i=t==="egg"?"EggGrowthBoost":"PlantGrowthBoost",s=e.filter(d=>Id(d,i)),c=e.filter(d=>!Id(d,i));return s.length>=2?{shouldGroup:true,matchingPets:s,remainingPets:c}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const n=e.map(i=>({pet:i,abilities:Sg(i)}));if(e.length===3){const[i,s,c]=n;if(ir(i.abilities,s.abilities)&&ir(i.abilities,c.abilities))return {shouldGroup:true,matchingPets:[i.pet,s.pet,c.pet],remainingPets:[]}}const[r,o,a]=n;return ir(r.abilities,o.abilities)?{shouldGroup:true,matchingPets:[r.pet,o.pet],remainingPets:a?[a.pet]:[]}:a&&ir(r.abilities,a.abilities)?{shouldGroup:true,matchingPets:[r.pet,a.pet],remainingPets:[o.pet]}:a&&ir(o.abilities,a.abilities)?{shouldGroup:true,matchingPets:[o.pet,a.pet],remainingPets:[r.pet]}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const T_=3;function P_(e,t){const n=e.abilities||[],r=d=>n.some(l=>d.includes(l));if((r(W.DOUBLE_HATCH)||r(W.PET_REFUND)||r(W.PET_MUTATION)||r(W.MAX_STR_BOOST))&&t.some(d=>d.id==="hatch"))return "hatch";if((r(W.COIN_FINDER)||r(W.SELL_BOOST)||r(W.CROP_REFUND_HARVEST)||r(W.CROP_SIZE)||r(W.CROP_MUTATION)||r(W.RARE_GRANTERS)||r(W.COMMON_GRANTERS))&&t.some(d=>d.id==="coin"))return "coin";if((r(W.EGG_GROWTH)||r(W.PLANT_GROWTH))&&t.some(d=>d.id==="growth"))return "growth";const s=e.currentStrength<e.maxStrength,c=r(W.XP_BOOST);return (s||c)&&t.some(d=>d.id==="xp")?"xp":t[0]?.id||"xp"}class I_{constructor(t){M(this,"expandedTeams",new Map);M(this,"featureUpdateInterval",null);M(this,"options");M(this,"tileFilter");this.options=t;}setTileFilter(t){this.tileFilter=t,this.refreshAllPanels();}refreshAllPanels(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t,n=false,r){const o=this.options.getListContainer(),a=ae.getTeam(t);if(!a||!o)return;const i=ae.getPetsForTeam(a),s=ce.myPets.get(),c=zo(a),d=Pd.filter(v=>!(!v.isAvailable()||v.shouldDisplay&&!v.shouldDisplay(a,i,c)));if(d.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const l=c.primary==="time-reduction"||Mn(i)||Ln(i);let u;if(l){const v=Mn(i),A=Ln(i),x=ce.myGarden.get(),w=x.eggs.growing.length>0,_=x.crops.growing.length>0;v&&A?_&&!w?u="plant":w&&!_?u="egg":u="plant":A?u="plant":v&&(u="egg");}const p=h("div",{className:"team-expanded-container"}),f=[];let g=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,u);const m=d.some(v=>v.id==="growth"||v.id==="hatch"||v.id==="coin");if(g.shouldGroup&&!m&&(g.matchingPets.every(A=>A.currentStrength>=A.maxStrength)||(g={shouldGroup:false,matchingPets:[],remainingPets:i})),g.shouldGroup&&g.matchingPets.length>=2){const v=d.filter(w=>!w.hasContent||w.hasContent(g.matchingPets,a)),A=v.find(w=>w.id==="growth"||w.id==="hatch"||w.id==="coin")||v[0]||d[0],x=this.createGroupedPetRow(a,g.matchingPets,d,A,u,t);p.appendChild(x.container),f.push(x.cardState);for(const w of g.remainingPets){const _=a.petIds.indexOf(w.id),k=this.createIndividualPetRow(a,w,_,d,u,t);p.appendChild(k.container),f.push(k.cardState);}}else for(let v=0;v<3;v++){const A=a.petIds[v],x=A?s.all.find(_=>_.id===A)??null:null,w=this.createIndividualPetRow(a,x,v,d,u,t,r);p.appendChild(w.container),f.push(w.cardState);}this.expandedTeams.set(t,{cards:f,expandedAt:Date.now(),container:p,growthViewType:u});const b=r==="xp"?"xp":r==="growth"?"growth":void 0;this.addProgressBar(p,i,t,b);const C=ae.getAllTeams().findIndex(v=>v.id===t),S=Array.from(o.children).filter(v=>v instanceof HTMLElement&&v.classList.contains("team-list-item"));C!==-1&&C<S.length&&S[C].insertAdjacentElement("afterend",p),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const r of n.cards)r.shell&&r.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,r,o){const a=ae.getTeam(r),i=a?zo(a):null,s=this.expandedTeams.get(r),c=i?.primary==="time-reduction"||Mn(n)||Ln(n),d=o??(c?"growth":"xp");s&&(s.currentBarMode=d),d==="growth"?this.renderGrowthSummaryBar(t,n,r):this.renderXpProgressBar(t,n);}updateProgressBarForFeature(t,n){const r=this.expandedTeams.get(t);if(!r)return;const o=ae.getTeam(t);if(!o||n!=="xp"&&n!=="growth")return;const a=ae.getPetsForTeam(o),i=n==="xp"?"xp":"growth";if(r.currentBarMode===i)return;const s=r.container.querySelector(".growth-summary-overhaul"),c=r.container.querySelector(".team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)");s&&s.remove(),c&&c.remove(),this.addProgressBar(r.container,a,t,i);}renderXpProgressBar(t,n){if(n.some(o=>o.currentStrength<o.maxStrength)&&n.length>0){const o=Math.round(n.reduce((d,l)=>d+l.currentStrength/l.maxStrength,0)/n.length*100),a=h("div",{className:"team-progress-bar"}),i=o<33?"low":o<67?"medium":"high",s=h("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});s.style.width=`${o}%`;const c=h("div",{className:"team-progress-bar__percent",textContent:`${o}%`});a.appendChild(s),a.appendChild(c),t.prepend(a);}}renderGrowthSummaryBar(t,n,r){const o=this.expandedTeams.get(r),a=o?.growthViewType||"plant",i=ce.myGarden.get(),s=Date.now(),c=a==="egg"?i.eggs.growing:i.crops.growing,d=this.tileFilter?c.filter(j=>this.tileFilter.has(j.tileIndex)):c,l=d.length,u=Gl(n),p=zl(n),f=Xr(u).timeReductionPerHour,g=Xr(p).timeReductionPerHour,m=Math.round(a==="egg"?f:g);let b=l>0?0:100;if(l>0){const j=(60+m)/60;b=Math.round(d.reduce((N,D)=>{const G=a==="egg"?D.plantedAt:D.startTime,$=a==="egg"?D.maturedAt:D.endTime,I=s-G,F=($-s)/j,U=I+F,he=U>0?I/U*100:0;return N+Math.min(100,Math.max(0,he))},0)/l);}let y=d.find(j=>j.tileIndex===o?.pinnedItemId);!y&&l>0&&(y=[...d].sort((j,N)=>{const D=a==="egg"?j.maturedAt:j.endTime,G=a==="egg"?N.maturedAt:N.endTime;return D-G})[0]);const C=h("div",{className:"growth-summary-overhaul"}),S=h("div",{className:`team-progress-bar team-progress-bar--${a}`}),v=h("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});v.style.width=`${b}%`;const A=j=>{const N=Math.floor(j/60),D=j%60;return N>0&&D>0?`${N}h ${D}m/h`:N>0?`${N}h/h`:`${D}m/h`};m>0&&((60+m)/60).toFixed(2)+"";const x=h("div",{className:"team-progress-bar__overlay"});x.innerHTML=`
            <span class="bar-percent">${b}%</span>
            <span class="bar-info">${l} total +${A(m)}</span>
        `,S.appendChild(v),S.appendChild(x);const w=h("div",{className:"growth-next-item"});if(y){let j=a==="egg"?y.eggId:y.species;const N=a==="egg"?"pet":"plant";a==="plant"&&j&&(j==="DawnCelestial"&&(j="DawnCelestialCrop"),j==="MoonCelestial"&&(j="MoonCelestialCrop"));const D=a==="egg"?y.maturedAt:y.endTime;a==="egg"?y.plantedAt:y.startTime;const G=(60+m)/60,$=Math.max(0,Math.round((D-s)/G)),I=s+$,O=new Date(I),F=O.getDate()!==new Date().getDate(),U=O.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),he=`${F?"Tomorrow ":""}${U}`,Z=de=>{const Ce=Math.floor(de/1e3),Ct=Math.floor(Ce/60),hn=Math.floor(Ct/60);return hn>0?`${hn}h ${Ct%60}m ${Ce%60}s`:Ct>0?`${Ct}m ${Ce%60}s`:`${Ce}s`},J=h("div",{className:"growth-next-sprite"});try{if(z.isReady()&&z.has(N,j)){const de=z.toCanvas(N,j,{scale:.3});de.style.height="20px",de.style.width="auto",de.style.imageRendering="pixelated",J.appendChild(de);}else J.textContent=a==="egg"?"🥚":"🌱";}catch(de){console.warn("[GrowthSummary] Sprite error:",de),J.textContent=a==="egg"?"🥚":"🌱";}w.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${Z($)}</span>
                    <span class="growth-next-date">| ${he}</span>
                </div>
            `,w.prepend(J);}else w.innerHTML='<span class="empty-text">No items growing</span>';const _=h("div",{className:"growth-overhaul-controls"}),k=a==="egg"?"UncommonEgg":"Carrot",T=a==="egg"?"pet":"plant";let E=null;try{z.isReady()&&z.has(T,k)&&(E=z.toCanvas(T,k,{scale:.35}));}catch{}const B=d_({variant:a==="egg"?"egg":"plant",sprite:E,playSound:true,tooltip:`Switch to ${a==="egg"?"plants":"eggs"}`,onClick:j=>{j.stopPropagation(),o&&(o.growthViewType=a==="egg"?"plant":"egg",o.pinnedItemId=void 0,this.updateGrowthSummary(r));}}),Y=h("button",{className:"growth-dropdown-overhaul",textContent:"▼"});Y.onclick=j=>{j.stopPropagation(),this.showGrowthDropdown(Y,d,a,r);},f>0&&g>0&&_.appendChild(B),_.appendChild(Y),C.appendChild(S),C.appendChild(w),C.appendChild(_);const q=t.querySelector(".growth-summary-overhaul");q?q.replaceWith(C):t.prepend(C);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const r=ae.getTeam(t);if(!r)return;const o=ae.getPetsForTeam(r);this.renderGrowthSummaryBar(n.container,o,t);const a=this.analyzeTeamForGrouping(r,o,n.growthViewType),i=n.cards.some(c=>c.slotIndex===-1),s=a.shouldGroup&&a.matchingPets.length>=2;if(i!==s){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}if(i&&s){const c=n.cards.find(d=>d.slotIndex===-1);if(c?.shell&&(c.shell.root.classList.contains("base-pet-card--grouped")?3:c.shell.root.classList.contains("base-pet-card--grouped-2")?2:0)!==a.matchingPets.length){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}}this.updateGroupedCardsViewType(t,n),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const r=ae.getTeam(t);if(!r)return;const o=ce.myPets.get();for(const a of n.cards){const i=r.petIds[a.slotIndex],s=i?o.all.find(c=>c.id===i):null;if(s&&a.shell&&(a.shell.update(s),a.featureData.renderPetSlot))try{const c=a.shell.getContentSlot();a.featureData.renderPetSlot(s,r,c,n.growthViewType,this.tileFilter);const d=s.currentStrength>=s.maxStrength,l=c.children.length>0||c.textContent.trim().length>0;a.shell.setCentered(d&&!l);}catch(c){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,c);}}}updateGroupedCardsViewType(t,n){const r=ae.getTeam(t);if(r){for(const o of n.cards)if(o.slotIndex===-1&&o.shell){const a=o.shell.getContentSlot();if(o.featureData.renderGroupedSlot&&o.shell.root.classList.contains("base-pet-card--grouped")){a.innerHTML="";const i=ae.getPetsForTeam(r);o.featureData.renderGroupedSlot(i,r,a,n.growthViewType,this.tileFilter);const s=a.children.length>0||a.textContent.trim().length>0;o.shell.setCentered(!s);}}}}showGrowthDropdown(t,n,r,o){const a=document.querySelector(".growth-dropdown-menu");if(a){const d=a.getAttribute("data-owner-id")===o&&a.getAttribute("data-view-type")===r;if(a.remove(),d)return}const i=h("div",{className:"growth-dropdown-menu"});if(i.setAttribute("data-owner-id",o),i.setAttribute("data-view-type",r),n.length===0){const d=h("div",{className:"growth-dropdown-option"});d.textContent="No items growing",i.appendChild(d);}else {const d=r==="egg"?"pet":"plant";n.forEach(l=>{const u=l.tileIndex;let p=r==="egg"?l.eggId:l.species;r==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=h("div",{className:"growth-dropdown-option"}),g=h("span",{className:"dropdown-sprite"});try{if(z.isReady()&&z.has(d,p)){const S=z.toCanvas(d,p,{scale:.3});S.style.height="16px",S.style.width="auto",S.style.imageRendering="pixelated",g.appendChild(S);}else g.textContent=r==="egg"?"🥚":"🌱";}catch{g.textContent=r==="egg"?"🥚":"🌱";}const m=r==="egg"?l.maturedAt:l.endTime,y=new Date(m).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),C=h("span",{className:"dropdown-text"});C.textContent=`${p} - ${y}`,f.appendChild(g),f.appendChild(C),f.onclick=S=>{S.stopPropagation();const v=this.expandedTeams.get(o);v&&(v.pinnedItemId=u,this.updateGrowthSummary(o)),i.remove();},i.appendChild(f);});}const s=t.getBoundingClientRect();i.style.position="fixed",i.style.bottom=`${window.innerHeight-s.top+4}px`,i.style.top="auto",i.style.left="auto",i.style.right=`${window.innerWidth-s.right}px`,i.style.marginTop="0",i.style.zIndex="999999",document.body.appendChild(i);const c=d=>{!i.contains(d.target)&&d.target!==t&&(i.remove(),document.removeEventListener("click",c,true));};setTimeout(()=>document.addEventListener("click",c,true),10);}createIndividualPetRow(t,n,r,o,a,i,s){const c=n?o.filter(A=>!A.hasContent||A.hasContent(n,t)):o,d=c.length>0?c:o;let l=d[0];if(s)l=d.find(A=>A.id===s)||d[0];else if(n){const A=P_(n,d);l=d.find(x=>x.id===A)||d[0];}else {const x=zo(t)?.suggestedFeatures||[];let w=false;for(const _ of x){const k=d.find(T=>T.id===_);if(k){l=k,w=true;break}}w||(a?l=d.find(_=>_.id==="growth")||d[0]:l=d.find(_=>_.id==="xp")||d[0]);}const u=h("div",{className:"expanded-pet-row"}),p=h("div",{className:"pet-row__header"}),f=h("button",{textContent:"<",className:"pet-row__nav"}),g=h("div",{textContent:`${l.icon} ${l.label.toUpperCase()}`,className:"pet-label"}),m=h("button",{textContent:">",className:"pet-row__nav"});let b=null;n&&(b=new s_(n));const y={slotIndex:r,currentFeatureId:l.id,shell:b,featureData:l},C=A=>{const x=d[A];if(x.id==="growth"){const w=ae.getPetsForTeam(t),_=this.expandedTeams.get(i),k=this.analyzeTeamForGrouping(t,w,_?.growthViewType);if(k.shouldGroup&&k.matchingPets.length>=2){this.collapseAndReexpandForGrowth(i);return}}if(g.textContent=`${x.icon} ${x.label.toUpperCase()}`,b&&n){const w=b.getContentSlot();if(w.innerHTML="",x.renderPetSlot){const T=this.expandedTeams.get(i);x.renderPetSlot(n,t,w,T?.growthViewType,this.tileFilter);}const _=n.currentStrength>=n.maxStrength,k=w.children.length>0||w.textContent.trim().length>0;b.setCentered(_&&!k);}y.currentFeatureId=x.id,y.featureData=x,p.className=`pet-row__header pet-row__header--${x.id}`,this.updateProgressBarForFeature(i,x.id);};p.className=`pet-row__header pet-row__header--${l.id}`;let S=d.findIndex(A=>A.id===l.id);f.addEventListener("click",A=>{A.stopPropagation(),S=(S-1+d.length)%d.length,C(S);}),m.addEventListener("click",A=>{A.stopPropagation(),S=(S+1)%d.length,C(S);}),d.length>1&&p.appendChild(f),p.appendChild(g),d.length>1&&p.appendChild(m);let v;if(b&&n){if(v=b.build(),l.renderPetSlot){const A=b.getContentSlot();l.renderPetSlot(n,t,A,a,this.tileFilter);const x=n.currentStrength>=n.maxStrength,w=A.children.length>0||A.textContent.trim().length>0;b.setCentered(x&&!w);}}else v=h("div",{className:"pet-row__content pet-row__content--empty"}),v.innerHTML=`
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;return u.appendChild(p),u.appendChild(v),y.container=u,{container:u,cardState:y}}createGroupedPetRow(t,n,r,o,a,i){const s=r.filter(w=>!w.hasContent||w.hasContent(n,t)),c=s.length>0?s:r;if(this.shouldUseCombinedPanel(c,n,t,a))return this.createCombinedPanelRow(t,n,c,a,i);const d=h("div",{className:"expanded-pet-row expanded-pet-row--grouped"}),l=h("div",{className:"pet-row__header"}),u=h("button",{textContent:"<",className:"pet-row__nav"}),p=h("div",{textContent:`${o.icon} ${o.label.toUpperCase()}`,className:"pet-label"}),f=h("button",{textContent:">",className:"pet-row__nav"}),g=h("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),m=h("div",{className:"base-pet-card__left"}),b=h("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const w of n)try{const _=w.mutations||[];if(z.has("pet",w.petSpecies)){const k=z.toCanvas("pet",w.petSpecies,{mutations:_,scale:1,boundsMode:"padded"});k.style.imageRendering="pixelated",b.appendChild(k);}}catch{}m.appendChild(b);const y=h("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const w of n){const k=w.currentStrength>=w.maxStrength?`MAX ${w.maxStrength}`:`STR ${w.currentStrength}/${w.maxStrength}`,T=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:k});y.appendChild(T);}m.appendChild(y),g.appendChild(m);const C=h("div",{className:"base-pet-card__content"});g.appendChild(C);const S={root:g,getContentSlot:()=>C,setCentered:w=>{g.classList.toggle("base-pet-card--centered",w);},destroy:()=>{g.remove();},update:()=>{y.innerHTML="";for(const w of n){const k=w.currentStrength>=w.maxStrength?`MAX ${w.maxStrength}`:`STR ${w.currentStrength}/${w.maxStrength}`,T=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:k});y.appendChild(T);}}},v={slotIndex:-1,currentFeatureId:o.id,shell:S,featureData:o},A=w=>{const _=c[w];if(_.id==="xp"&&!n.every(E=>E.currentStrength>=E.maxStrength)){this.collapseAndReexpandForXP(i);return}if(p.textContent=`${_.icon} ${_.label.toUpperCase()}`,C.innerHTML="",_.renderGroupedSlot){const T=this.expandedTeams.get(i);_.renderGroupedSlot(n,t,C,T?.growthViewType,this.tileFilter);}else if(_.renderPetSlot){const T=this.expandedTeams.get(i);_.renderPetSlot(n[0],t,C,T?.growthViewType,this.tileFilter);}const k=C.children.length>0||C.textContent.trim().length>0;S.setCentered(!k),v.currentFeatureId=_.id,v.featureData=_,l.className=`pet-row__header pet-row__header--${_.id}`;};l.className=`pet-row__header pet-row__header--${o.id}`;let x=c.findIndex(w=>w.id===o.id);return u.addEventListener("click",w=>{w.stopPropagation(),x=(x-1+c.length)%c.length,A(x);}),f.addEventListener("click",w=>{w.stopPropagation(),x=(x+1)%c.length,A(x);}),c.length>1&&l.appendChild(u),l.appendChild(p),c.length>1&&l.appendChild(f),o.renderGroupedSlot?o.renderGroupedSlot(n,t,C,a,this.tileFilter):o.renderPetSlot&&o.renderPetSlot(n[0],t,C,a,this.tileFilter),d.appendChild(l),d.appendChild(g),g.classList.add("base-pet-card--grouped"),{container:d,cardState:{...v,container:d}}}collapseAndReexpandForXP(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,true,"xp"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,true,"xp"),n.container.style.opacity="1";});});}collapseAndReexpandForGrowth(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,false,"growth"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,false,"growth"),n.container.style.opacity="1";});});}rebuildInPlace(t,n,r){const o=this.expandedTeams.get(t);if(!o)return;const a=ae.getTeam(t);if(!a)return;const i=ae.getPetsForTeam(a),s=ce.myPets.get(),c=this.getAvailableFeaturesForTeam(a,i),d=o.growthViewType;for(const m of o.cards)m.shell&&m.shell.destroy(),m.container&&m.container.parentNode&&m.container.remove();const l=o.container.querySelector(".team-progress-bar");l&&l.remove();const u=[];let p=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,d);const f=c.some(m=>m.id==="growth"||m.id==="hatch"||m.id==="coin");if(p.shouldGroup&&!f&&(p.matchingPets.every(b=>b.currentStrength>=b.maxStrength)||(p={shouldGroup:false,matchingPets:[],remainingPets:i})),p.shouldGroup&&p.matchingPets.length>=2){const m=c.filter(C=>!C.hasContent||C.hasContent(p.matchingPets,a)),b=m.find(C=>C.id==="growth"||C.id==="hatch"||C.id==="coin")||m[0]||c[0],y=this.createGroupedPetRow(a,p.matchingPets,c,b,d,t);o.container.appendChild(y.container),u.push(y.cardState);for(const C of p.remainingPets){const S=a.petIds.indexOf(C.id),v=this.createIndividualPetRow(a,C,S,c,d,t);o.container.appendChild(v.container),u.push(v.cardState);}}else for(let m=0;m<3;m++){const b=a.petIds[m],y=b?s.all.find(S=>S.id===b)??null:null,C=this.createIndividualPetRow(a,y,m,c,d,t,r);o.container.appendChild(C.container),u.push(C.cardState);}o.cards=u;const g=r==="xp"?"xp":r==="growth"?"growth":void 0;this.addProgressBar(o.container,i,t,g);}getAvailableFeaturesForTeam(t,n){return zo(t),Pd.filter(r=>r.isAvailable())}countTotalRows(t,n,r,o){let a=0;for(const i of t)i.countRows?a+=i.countRows(n,r,o):i.hasContent?.(n,r)&&(a+=1);return a}shouldUseCombinedPanel(t,n,r,o){return t.length<2?false:this.countTotalRows(t,n,r,o)<=T_}createCombinedPanelRow(t,n,r,o,a){const i=h("div",{className:"expanded-pet-row expanded-pet-row--combined"}),s=h("div",{className:"pet-row__header pet-row__header--combined"}),c=h("span",{className:"combined-panel__icons",textContent:r.map(y=>y.icon).join(" ")});s.appendChild(c);const d=h("div",{textContent:"COMBINED",className:"pet-label"});s.appendChild(d);const l=h("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),u=h("div",{className:"base-pet-card__left"}),p=h("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const y of n)try{const C=y.mutations||[];if(z.has("pet",y.petSpecies)){const S=z.toCanvas("pet",y.petSpecies,{mutations:C,scale:1,boundsMode:"padded"});S.style.imageRendering="pixelated",p.appendChild(S);}}catch{}u.appendChild(p);const f=h("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const y of n){const S=y.currentStrength>=y.maxStrength?`MAX ${y.maxStrength}`:`STR ${y.currentStrength}/${y.maxStrength}`,v=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:S});f.appendChild(v);}u.appendChild(f),l.appendChild(u);const g=h("div",{className:"base-pet-card__content base-pet-card__content--combined"});for(const y of r){const C=h("div",{className:`combined-section combined-section--${y.id}`}),S=h("span",{className:"combined-section__icon",textContent:y.icon});C.appendChild(S);const v=h("div",{className:"combined-section__content"});y.renderGroupedSlot?y.renderGroupedSlot(n,t,v,o,this.tileFilter):y.renderPetSlot&&y.renderPetSlot(n[0],t,v,o,this.tileFilter),(v.children.length>0||v.textContent?.trim())&&(C.appendChild(v),g.appendChild(C));}l.appendChild(g);const b={slotIndex:-1,currentFeatureId:"combined",shell:{root:l,getContentSlot:()=>g,setCentered:y=>{l.classList.toggle("base-pet-card--centered",y);},destroy:()=>{l.remove();},update:()=>{f.innerHTML="";for(const y of n){const S=y.currentStrength>=y.maxStrength?`MAX ${y.maxStrength}`:`STR ${y.currentStrength}/${y.maxStrength}`,v=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:S});f.appendChild(v);}},build:()=>l},container:i,featureData:r[0]};return i.appendChild(s),i.appendChild(l),{container:i,cardState:b}}analyzeTeamForGrouping(t,n,r){const o=d=>(d.abilities||[]).some(u=>W.MAX_STR_BOOST.includes(u)||W.PET_MUTATION.includes(u)||W.DOUBLE_HATCH.includes(u)||W.PET_REFUND.includes(u)),a=n.filter(o);if(a.length>=2&&a.length<=3){const d=n.filter(l=>!a.includes(l));return {shouldGroup:true,matchingPets:a,remainingPets:d}}const i=["DoubleHarvest","ProduceRefund","ProduceRefundII"],s=d=>(d.abilities||[]).some(u=>i.includes(u)),c=n.filter(s);if(c.length>=2&&c.length<=3&&!c.some(l=>(l.abilities||[]).some(p=>W.EGG_GROWTH.includes(p)||W.PLANT_GROWTH.includes(p)||W.CROP_MUTATION.includes(p)))){const l=n.filter(u=>!c.includes(u));return {shouldGroup:true,matchingPets:c,remainingPets:l}}return A_(n,r)}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=Ke.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}const E_={calculationScope:"all",selectedTileIndices:[],expandedTeamIds:[]};let Me=null,Fi=null;async function M_(){return Me||(Fi||(Fi=zn("tab-trackers",{version:3,defaults:E_})),Me=await Fi,Me)}function Fn(){if(!Me)throw new Error("[TrackersState] State not initialized. Call initTrackersState() first.");return Me}function L_(e){if(!Me)return;const t=Me.get();t.expandedTeamIds.includes(e)?Me.update({expandedTeamIds:t.expandedTeamIds.filter(r=>r!==e)}):Me.update({expandedTeamIds:[...t.expandedTeamIds,e]});}function R_(e){Me&&Me.update({calculationScope:e});}function Ni(e){if(!Me)return;const t=Me.get();t.selectedTileIndices.includes(e)?Me.update({selectedTileIndices:t.selectedTileIndices.filter(r=>r!==e)}):Me.update({selectedTileIndices:[...t.selectedTileIndices,e]});}function O_(){Me&&Me.update({selectedTileIndices:[]});}class F_{constructor(t={}){M(this,"dropdown",null);M(this,"options");M(this,"isDragging",false);M(this,"dragSelectMode",null);this.options=t,document.addEventListener("pointerup",()=>{this.isDragging=false,this.dragSelectMode=null;});}build(){if(this.dropdown)return this.dropdown;this.dropdown=h("div",{className:"tile-grid-selector"});const t=this.buildHeader();this.dropdown.appendChild(t);const n=this.buildGrids();return this.dropdown.appendChild(n),this.dropdown}show(){this.dropdown||this.build(),this.dropdown&&!this.dropdown.parentElement&&(this.options.container||document.body).appendChild(this.dropdown),this.dropdown&&this.dropdown.classList.add("tile-grid-selector--visible"),this.renderGrids();}hide(){this.dropdown&&this.dropdown.classList.remove("tile-grid-selector--visible");}destroy(){this.dropdown?.parentElement&&this.dropdown.parentElement.removeChild(this.dropdown),this.dropdown=null;}buildHeader(){const t=h("div",{className:"tile-grid-selector__header"}),r=Fn().get().selectedTileIndices.length,o=h("div",{className:"tile-grid-selector__info",textContent:`${r} tile${r!==1?"s":""} selected`}),a=h("button",{className:"tile-grid-selector__btn",textContent:"Clear All"});a.addEventListener("click",()=>{O_(),this.renderGrids(),this.options.onChange&&this.options.onChange();});const i=h("button",{className:"tile-grid-selector__close-btn",textContent:"×",title:"Close"});return i.addEventListener("click",()=>{this.hide();}),t.appendChild(o),t.appendChild(a),t.appendChild(i),t}buildGrids(){const t=h("div",{className:"tile-grid-selector__grids"}),n=h("div",{className:"tile-grid-selector__grid",id:"tile-grid-1"}),r=h("div",{className:"tile-grid-selector__grid",id:"tile-grid-2"});return t.appendChild(n),t.appendChild(r),t}renderGrids(){const t=this.dropdown?.querySelector("#tile-grid-1"),n=this.dropdown?.querySelector("#tile-grid-2");if(!t||!n)return;t.innerHTML="",n.innerHTML="";const r=ce.myGarden.get(),o=ce.gameMap.get(),a=Fn().get();if(!r.garden||!o)return;const i=r.mySlotIndex;if(i===null)return;const s=o.userSlots[i];if(!s)return;const c=s.dirtTiles,d=new Set(a.selectedTileIndices),l=r.garden.tileObjects,u=[...new Set(c.map(x=>x.position.x))].sort((x,w)=>x-w);let p=0,f=u[Math.floor(u.length/2)];for(let x=1;x<u.length;x++){const w=u[x]-u[x-1];w>p&&(p=w,f=(u[x]+u[x-1])/2);}const g=c.filter(x=>x.position.x<f),m=c.filter(x=>x.position.x>=f),b=x=>{if(x.length===0)return {minX:0,maxX:9,minY:0,maxY:9};const w=x.map(k=>k.position.x),_=x.map(k=>k.position.y);return {minX:Math.min(...w),maxX:Math.max(...w),minY:Math.min(..._),maxY:Math.max(..._)}},y=b(g),C=b(m),S=new Map,v=new Map;for(const x of g){const w=x.position.x-y.minX,_=x.position.y-y.minY;S.set(`${_},${w}`,x);}for(const x of m){const w=x.position.x-C.minX,_=x.position.y-C.minY;v.set(`${_},${w}`,x);}for(let x=0;x<10;x++)for(let w=0;w<10;w++){const _=S.get(`${x},${w}`)||null,k=this.buildTileElement(_,_&&l[_.localIndex.toString()]||null,_?d.has(_.localIndex.toString()):false);t.appendChild(k);}for(let x=0;x<10;x++)for(let w=0;w<10;w++){const _=v.get(`${x},${w}`)||null,k=this.buildTileElement(_,_&&l[_.localIndex.toString()]||null,_?d.has(_.localIndex.toString()):false);n.appendChild(k);}const A=this.dropdown?.querySelector(".tile-grid-selector__info");A&&(A.textContent=`${d.size} tile${d.size!==1?"s":""} selected`);}buildTileElement(t,n,r){const o=h("button",{className:"tile-grid-selector__tile"});if(!t)return o.classList.add("tile-grid-selector__tile--null"),o.disabled=true,o;if(r&&o.classList.add("tile-grid-selector__tile--selected"),n?o.classList.add("tile-grid-selector__tile--occupied"):o.classList.add("tile-grid-selector__tile--empty"),n&&z.isReady()){const a=this.getSpriteForTileObject(n);a&&o.appendChild(a);}return o.addEventListener("pointerdown",a=>{a.preventDefault(),this.isDragging=true,this.dragSelectMode=r?"deselect":"select",Ni(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.();}),o.addEventListener("pointerenter",()=>{if(!this.isDragging||!this.dragSelectMode)return;const i=Fn().get().selectedTileIndices.includes(t.localIndex.toString());this.dragSelectMode==="select"&&!i?(Ni(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.()):this.dragSelectMode==="deselect"&&i&&(Ni(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.());}),o}getSpriteForTileObject(t){try{if(t.objectType==="plant"){let n=t.species;if(n==="DawnCelestial"&&(n="DawnCelestialCrop"),n==="MoonCelestial"&&(n="MoonCelestialCrop"),z.has("plant",n)){const r=z.toCanvas("plant",n,{scale:.25});return r.style.height="100%",r.style.width="100%",r.style.objectFit="contain",r.style.imageRendering="pixelated",r}}else if(t.objectType==="egg"){const n=t.eggId;if(z.has("pet",n)){const r=z.toCanvas("pet",n,{scale:.25});return r.style.height="100%",r.style.width="100%",r.style.objectFit="contain",r.style.imageRendering="pixelated",r}}else if(t.objectType==="decor"){const n=t.decorId;if(z.has("decor",n)){const r=z.toCanvas("decor",n,{scale:.25});return r.style.height="100%",r.style.width="100%",r.style.objectFit="contain",r.style.imageRendering="pixelated",r}}}catch(n){console.warn("[TileGridSelector] Failed to load sprite:",n);}return null}}class N_{constructor(t){M(this,"card",null);M(this,"scopeControl",null);M(this,"scopeContainer",null);M(this,"content",null);M(this,"listContainer",null);M(this,"options");M(this,"tileGridOverlay",null);M(this,"expansionHandler");this.options=t,this.expansionHandler=new I_({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createCard()}destroy(){this.expansionHandler.destroy(),this.scopeControl&&(this.scopeControl.destroy(),this.scopeControl=null),this.tileGridOverlay&&(this.tileGridOverlay.destroy?.(),this.tileGridOverlay=null),this.card=null,this.scopeContainer=null,this.content=null,this.listContainer=null;}render(){if(!this.card)return;if(!ae.isEnabled()){this.renderDisabledState();return}this.scopeContainer&&(this.scopeContainer.style.display="flex"),this.ensureScopeControl(),this.renderTeamList();}getListContainer(){return this.listContainer}createCard(){const t=h("div",{className:"tracker-card-wrapper"});this.scopeContainer=h("div",{className:"tracker-card__scope-container"}),t.appendChild(this.scopeContainer),this.content=h("div",{className:"tracker-card__content"}),t.appendChild(this.content);const n=He({title:"Trackers",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureScopeControl(){if(!this.scopeContainer)return;const t=Fn().get();if(!this.scopeControl){this.scopeControl=fg({segments:[{id:"all",label:"All Tiles"},{id:"selected",label:"Selected Tiles"}],selected:t.calculationScope,onChange:n=>{const r=n;R_(r),r==="selected"?this.showTileGridOverlay():this.tileGridOverlay?.hide(),this.renderTeamList();}}),this.scopeContainer.appendChild(this.scopeControl);return}this.scopeControl.getSelected()!==t.calculationScope&&this.scopeControl.select(t.calculationScope);}showTileGridOverlay(){this.tileGridOverlay||(this.tileGridOverlay=new F_({onChange:()=>{this.renderTeamList();},container:this.scopeContainer||void 0}),this.tileGridOverlay.build()),this.tileGridOverlay.show();}renderDisabledState(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.listContainer=null,this.scopeContainer&&(this.scopeContainer.style.display="none");const t=h("div",{className:"tracker-card__disabled-state"}),n=h("div",{textContent:"Pet Teams feature is not enabled",className:"tracker-card__disabled-message"});t.appendChild(n),this.content.replaceChildren(t);}renderTeamList(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.content.replaceChildren();const t=ae.getAllTeams(),n=ae.getActiveTeamId(),r=Fn().get(),o=r.calculationScope==="selected"?new Set(r.selectedTileIndices):void 0;if(this.expansionHandler.setTileFilter(o),t.length===0){this.renderEmptyState();return}this.listContainer=h("div",{className:"tracker-card__list-container"}),t.forEach(a=>{const i=n===a.id,s=r.expandedTeamIds.includes(a.id),c=pg({team:a,isActive:i,hideDragHandle:true,isNameEditable:false,isExpanded:s,onExpandClick:()=>{this.handleExpandToggle(a.id);}});c.setAttribute("data-team-id",a.id),c.addEventListener("click",d=>{d.stopPropagation();}),this.listContainer.appendChild(c),s&&this.expansionHandler.expand(a.id);}),this.content.appendChild(this.listContainer);}renderEmptyState(){if(!this.content)return;const t=h("div",{className:"tracker-card__empty-state"}),n=h("div",{textContent:"No teams created yet.",className:"tracker-card__empty-message"}),r=h("div",{textContent:"Create teams in the Pets tab to view trackers.",className:"tracker-card__empty-hint"});t.appendChild(n),t.appendChild(r),this.content.appendChild(t);}handleExpandToggle(t){L_(t),this.expansionHandler.toggle(t);const n=this.listContainer?.querySelector(`[data-team-id="${t}"]`);if(n){const r=Fn().get().expandedTeamIds.includes(t),o=n.querySelector(".team-list-item__expand");o&&o.classList.toggle("team-list-item__expand--open",r);}}}const $_=`
/* ─────────────────────────────────────────────────────────────────────────── */
/* Card Wrapper                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Scope Container (All Tiles / Selected Tiles toggle)                         */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__scope-container {
  position: relative; /* For tile grid overlay positioning */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-sm) 0;
}

/* Legacy mode-container class (deprecated, use scope-container) */
.tracker-card__mode-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-sm) 0;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Content Container                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__content {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-x: visible;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* List Container                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__list-container {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 100%;
  overflow-x: visible;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Empty State                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--spacing-md);
  text-align: center;
  gap: var(--spacing-xs);
}

.tracker-card__empty-message {
  color: var(--fg);
  font-size: var(--font-size-md);
  font-weight: 500;
}

.tracker-card__empty-hint {
  color: var(--muted);
  font-size: var(--font-size-sm);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Disabled State                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__disabled-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--spacing-md);
  text-align: center;
}

.tracker-card__disabled-message {
  color: var(--muted);
  font-size: var(--font-size-md);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Override TeamListItem for Trackers context                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__list-container .team-list-item {
  /* Read-only: no hover cursor for team switching */
  cursor: default;
}

.tracker-card__list-container .team-list-item__expand {
  /* Ensure expand button is clickable */
  cursor: pointer;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Expansion Container (injected by TeamCardExpansionHandler)                   */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__list-container .team-expanded-container {
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  /* Use existing Pets section styles via teamCard.css */
}
`,D_=`
/* ─────────────────────────────────────────────────────────────────────────── */
/* Dropdown Container                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

.tile-grid-selector {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: var(--spacing-xs);
  background: var(--bg);
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: none;
  flex-direction: column;
  width: min(95%, 600px); /* Scale with container, max 600px */
  max-height: 80vh; /* Prevent vertical overflow */
  overflow: hidden;
}

.tile-grid-selector--visible {
  display: flex;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Header                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

.tile-grid-selector__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--border);
  background: var(--bg-secondary);
}

.tile-grid-selector__info {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--fg);
}

.tile-grid-selector__btn {
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--fg);
  cursor: pointer;
  transition: all 0.15s ease;
}

.tile-grid-selector__btn:hover {
  background: var(--hover);
}

.tile-grid-selector__btn:active {
  transform: scale(0.95);
}

/* Close button (X) */
.tile-grid-selector__close-btn {
  width: 24px;
  height: 24px;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s ease;
  margin-left: auto;
}

.tile-grid-selector__close-btn:hover {
  background: var(--danger);
  border-color: var(--danger);
  color: white;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Grid Container                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

.tile-grid-selector__grids {
  display: flex;
  justify-content: center;
  gap: 1%;
  padding: 2%; /* Base padding */
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

.tile-grid-selector__grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* Equal columns that fill width */
  grid-template-rows: repeat(10, auto);
  gap: 2px; /* Small fixed gap for consistency */
  padding: 4px;
  width: 48%; /* Desktop: side by side */
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  height: fit-content;
}

/* Mobile: stack vertically and maximize grid size */
@media (max-width: 600px) {
  .tile-grid-selector__grids {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px;
  }

  .tile-grid-selector__grid {
    width: 100% !important; /* Full width on mobile stack */
    max-width: 450px !important; /* Prevent excessive width */
    gap: 1px !important;
    padding: 2px !important;
  }
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Tile Elements                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

.tile-grid-selector__tile {
  /* Fill grid cell */
  width: 100%;
  aspect-ratio: 1 / 1; /* Maintain square shape */
  border: 1px solid var(--border);
  border-radius: 2px;
  background: var(--bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  user-select: none;
  padding: 1px; /* Minimal padding */
  transition: all 0.1s ease;
  position: relative;
  overflow: hidden;
}

.tile-grid-selector__tile:hover:not(:disabled) {
  border-color: var(--accent);
  transform: scale(1.1);
  z-index: 10;
}

.tile-grid-selector__tile:active:not(:disabled) {
  transform: scale(0.95);
}

/* Null tiles (no tile exists at this position) */
.tile-grid-selector__tile--null {
  background: transparent;
  border-color: transparent;
  cursor: not-allowed;
}

/* Empty tiles (tile exists but nothing on it) */
.tile-grid-selector__tile--empty {
  background: var(--bg-secondary);
  border-color: var(--border);
}

/* Occupied tiles (has plant/egg/decor) */
.tile-grid-selector__tile--occupied {
  background: var(--bg);
  border-color: #6b7280;
}

/* Selected state */
.tile-grid-selector__tile--selected {
  border-color: var(--accent);
  border-width: 2px;
  box-shadow: 0 0 0 1px var(--accent);
}

.tile-grid-selector__tile--selected::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

/* Sprite rendering */
.tile-grid-selector__tile canvas {
  pointer-events: none;
  user-select: none;
}
`,B_=`
.team-card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}

.team-card__mode-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.team-card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.team-card__disabled-state {
    text-align: center;
}

.team-card__disabled-message {
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 12px;
}

.team-card__empty-state {
    color: var(--muted);
    text-align: center;
    font-size: 14px;
}

.team-card__list-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
}

.team-card__list-container.is-reordering {
    /* Active reordering state */
}

.team-card__actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    width: 100%;
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPAND BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */

.team-list-item__expand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    margin-left: 8px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.team-list-item__expand:hover {
    background: var(--soft);
    color: var(--fg);
    border-color: var(--accent);
}

.team-list-item__expand svg {
    transition: transform 0.2s ease;
}

.team-list-item__expand--open svg {
    transform: rotate(180deg);
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPANDED CONTAINER - 1 per team with 3 pet rows
   ═══════════════════════════════════════════════════════════════════════════ */

.team-expanded-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    margin: 0 8px 8px 8px;
    background: linear-gradient(145deg, var(--soft), var(--bg));
    border: 1px solid var(--border);
    border-radius: 12px;
    animation: expandSlideIn 0.25s ease-out;
    max-width: calc(100% - 16px); /* Account for margins */
    overflow-x: hidden;
    box-sizing: border-box;
}

@keyframes expandSlideIn {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PET ROW - Individual row with header + content
   ═══════════════════════════════════════════════════════════════════════════ */

.expanded-pet-row {
    display: flex;
    flex-direction: column;
    padding: 0 12px 14px 12px;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}

.expanded-pet-row:first-of-type {
    padding-top: 8px;
}

.pet-row__header {
    display: flex;
    align-items: center;
    background: var(--tab-bg);
    padding: 6px 12px;
    gap: 8px;
    border: 1px solid var(--border);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: none;
    margin-bottom: 0;
}

.expanded-pet-row .base-pet-card {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.pet-row__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--fg);
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.15s ease;
    flex-shrink: 0;
}

.pet-row__nav:hover {
    background: var(--soft);
    border-color: var(--pill-to);
    transform: scale(1.05);
}

.pet-label {
    flex: 1;
    text-align: center;
    font-size: 11px;
    font-weight: 800;
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE CARD - Individual Pet Feature Display
   ═══════════════════════════════════════════════════════════════════════════ */

.feature-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 200px;
}

.feature-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-bottom: 1px solid var(--border);
    gap: 4px;
}

.feature-card__label {
    flex: 1;
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.feature-card__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--fg);
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.15s ease;
    flex-shrink: 0;
}

.feature-card__nav:hover {
    background: var(--soft);
    border-color: var(--pill-to);
}

.feature-card__content {
    flex: 1;
    padding: 10px;
    background: var(--soft);
    overflow-y: auto;
    max-height: 280px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}

.feature-card__content::-webkit-scrollbar {
    width: 4px;
}

.feature-card__content::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 2px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE - Mobile Layout
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .team-expanded-cards {
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 10px;
        margin: 0 4px 6px 4px;
    }

    .feature-card {
        min-height: 160px;
    }

    .feature-card__content {
        max-height: 220px;
    }
}

@media (max-width: 480px) {
    .team-list-item__expand {
        padding: 4px;
    }

    .feature-card__header {
        padding: 6px 8px;
    }

    .feature-card__label {
        font-size: 10px;
    }

    .feature-card__nav {
        width: 20px;
        height: 20px;
        font-size: 10px;
    }

    .feature-card__content {
        padding: 8px;
        max-height: 180px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM PROGRESS
   ═══════════════════════════════════════════════════════════════════════════ */

.team-progress-bar {
    position: relative;
    height: 16px;
    background: var(--border);
    border-radius: 8px;
    margin: 10px 12px 6px 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    flex-shrink: 0;
    --xp-fill: var(--accent); /* Default fill color */
}

.team-progress-bar__fill {
    height: 100%;
    border-radius: 7px;
    transition: width 0.3s ease;
}

/* Color coding for team progress bar - using oklab for better mixing */
.team-progress-bar__fill--low {
    background: linear-gradient(90deg, color-mix(in oklab, var(--xp-fill) 40%, transparent), color-mix(in oklab, var(--xp-fill) 60%, transparent));
}
.team-progress-bar__fill--medium {
    background: linear-gradient(90deg, color-mix(in oklab, var(--xp-fill) 60%, transparent), color-mix(in oklab, var(--xp-fill) 85%, transparent));
}
.team-progress-bar__fill--high {
    background: linear-gradient(90deg, color-mix(in oklab, var(--xp-fill) 80%, transparent), var(--xp-fill));
}

.team-progress-bar__percent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 11px;
    font-weight: 800;
    color: var(--fg);
    text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    pointer-events: none;
    z-index: 5;
}

/* BasePetCard provides its own mobile responsiveness. We only need minimal 
   overrides for the team-level containers if necessary. */

@media (max-width: 480px) {
    .team-expanded-container {
        margin: 4px 4px 8px 4px;
        max-width: calc(100% - 8px);
        padding: 8px;
    }

    .expanded-pet-row {
        padding: 0 8px 10px 8px;
    }

    .team-progress-bar {
        pointer-events: none;
        z-index: 5;
        margin: 8px 8px 4px 8px;
    }

    .feature-card__header {
        padding: 6px 8px;
    }

    .feature-card__nav {
        width: 22px;
        height: 22px;
        font-size: 10px;
    }
}

/* 320px devices */
@media (max-width: 360px) {
    .pet-row__content {
        padding: 8px;
    }
    
    .xp-stat__label {
        font-size: 9px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMBINED PANEL MODE
   Merges multiple panels into single view when total rows ≤ 3
   ═══════════════════════════════════════════════════════════════════════════ */

.expanded-pet-row--combined {
    /* Same base styling as grouped */
}

.pet-row__header--combined {
    justify-content: center;
    gap: 12px;
    background: linear-gradient(90deg, var(--soft), var(--tab-bg), var(--soft));
}

.combined-panel__icons {
    font-size: 13px;
    opacity: 0.9;
    letter-spacing: 2px;
}

/* Combined content area */
.base-pet-card__content--combined {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* Individual panel sections within combined view */
.combined-section {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;
}

.combined-section + .combined-section {
    border-top: 1px solid var(--border);
    padding-top: 8px;
    margin-top: 2px;
}

.combined-section__icon {
    font-size: 12px;
    opacity: 0.75;
    min-width: 20px;
    text-align: center;
    padding-top: 2px;
}

.combined-section__content {
    flex: 1;
    min-width: 0;
}

/* Ensure stat rows within combined sections flow correctly */
.combined-section__content .stat-row,
.combined-section__content .hatching-stats-compact,
.combined-section__content .xp-stats-compact,
.combined-section__content .value-stats-compact,
.combined-section__content .growth-stats-compact {
    /* Remove any margin that might cause issues */
    margin: 0;
}

/* Combined section specific colors */
.combined-section--xp .combined-section__icon {
    color: var(--xp-fill, #6ba6ff);
}

.combined-section--hatch .combined-section__icon {
    color: #f0a050;
}

.combined-section--growth .combined-section__icon {
    color: #60c060;
}

.combined-section--coin .combined-section__icon {
    color: #ffd700;
}

/* Mobile adjustments for combined panel */
@media (max-width: 480px) {
    .combined-section {
        gap: 6px;
    }
    
    .combined-section__icon {
        font-size: 11px;
        min-width: 16px;
    }
}

`,G_=`
/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH TIMER PANEL STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

/* Growth Panel structural styles moved to growthPanel.css.ts */

.feature-card,
.feature-card__content {
    box-sizing: border-box;
}


/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-timer-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.growth-stats {
    padding: 8px 12px;
    background: linear-gradient(135deg, var(--soft), var(--bg));
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    text-align: center;
}

.growth-timer-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.timer-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 11px;
    transition: all 0.2s ease;
}

.timer-item:hover {
    border-color: var(--pill-to);
    box-shadow: 0 2px 8px var(--shadow);
}

.timer-sprite {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.timer-sprite canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

.timer-countdown {
    font-weight: 800;
    color: var(--fg);
    font-size: 12px;
    min-width: 65px;
}

.timer-completion {
    flex: 1;
    color: var(--muted);
    font-size: 11px;
}

.timer-boost {
    color: var(--mut-ambercharged);
    font-weight: 700;
    font-size: 10px;
    white-space: nowrap;
}

.empty-state {
    text-align: center;
    padding: 24px;
    color: var(--muted);
    font-style: italic;
    font-size: 12px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .team-expanded-cards {
        grid-template-columns: 1fr;
    }

    .feature-card__content {
        max-height: 300px;
    }
}

@media (max-width: 480px) {
    .team-expanded-cards {
        padding: 8px;
        gap: 8px;
    }

    .feature-card__header {
        padding: 8px 10px;
    }

    .feature-card__label {
        font-size: 11px;
    }

    .feature-card__nav {
        width: 24px;
        height: 24px;
        font-size: 12px;
    }

    .feature-card__content {
        padding: 10px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

.feature-card:focus-within {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

.feature-card__nav:focus {
    outline: 2px solid var(--pill-to);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .team-expanded-cards,
    .feature-card,
    .timer-item {
        animation: none;
        transition: none;
    }
}

/* Mobile responsive - prevent horizontal scrolling */
@media (max-width: 480px) {
    .growth-summary-overhaul {
        flex-wrap: wrap; /* Allow wrapping on narrow screens */
        gap: 8px;
        padding: 8px 10px;
    }

    .team-progress-bar--egg,
    .team-progress-bar--plant {
        min-width: 100%; /* Force full width on mobile */
        order: -1; /* Move progress bar to top */
    }

    .growth-next-item {
        min-width: 100%;
        flex-wrap: wrap;
    }

    .growth-overhaul-controls {
        flex-shrink: 0;
    }

    .bar-percent,
    .bar-info {
        font-size: 10px;
    }

    .growth-next-time,
    .growth-next-date {
        font-size: 10px;
    }
    
    /* Center controls (buttons) on mobile */
    .growth-overhaul-controls {
        justify-content: center;
        width: 100%;
    }
    
    /* Center next item row on mobile */
    .growth-next-item {
        justify-content: center;
        width: 100%;
    }
    
    /* Center overall container elements on mobile */
    .growth-summary-overhaul {
        justify-content: center;
    }
}
`,z_=`
/* ═══════════════════════════════════════════════════════════════════════════
   XP PANEL - Main Container
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-panel {
    background: linear-gradient(145deg, var(--bg), var(--soft));
    border: 1px solid var(--border);
    border-left: 3px solid var(--pill-to);
    border-radius: 16px;
    margin: 12px 0 16px 12px;
    overflow: hidden;
    box-shadow:
        0 8px 32px var(--shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    animation: xpPanelSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: top center;
}

@keyframes xpPanelSlideIn {
    from {
        opacity: 0;
        transform: translateY(-16px) scaleY(0.95);
        max-height: 0;
    }
    to {
        opacity: 1;
        transform: translateY(0) scaleY(1);
        max-height: 2000px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER - Team XP Rate Display
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-panel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    /* Task 6: Theme-semantic colors */
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-bottom: 1px solid var(--border);
}

.xp-panel__header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--fg);  /* Task 6: Use --fg for better contrast */
}

.xp-panel__header-icon {
    font-size: 16px;
}

.xp-panel__header-rate {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
}

.xp-panel__rate-label {
    color: var(--muted);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.xp-panel__rate-base {
    color: var(--fg);
}

.xp-panel__rate-plus,
.xp-panel__rate-equals {
    color: var(--muted);
    font-size: 12px;
}

.xp-panel__rate-bonus {
    color: var(--mut-gold);
    font-weight: 700;
}

.xp-panel__rate-total {
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 16px;
    font-weight: 900;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PETS CONTAINER - Horizontal Scrollable Row
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-panel__pets {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 16px;
    background: var(--soft);
}

/* ═══════════════════════════════════════════════════════════════════════════
   PET CARD - Individual Pet Display
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-pet-card {
    display: flex;
    align-items: stretch;
    gap: 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
}

.xp-pet-card:hover {
    box-shadow: 0 6px 20px var(--shadow);
    transform: translateX(2px);
}

/* Left accent bar (appears on hover with smooth color transition) */
.xp-pet-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--pill-from), var(--pill-to));
    border-radius: 12px 0 0 12px;
    opacity: 0;
    transition: opacity 0.3s ease, background 0.3s ease;
}

.xp-pet-card:hover::before {
    opacity: 1;
    background: linear-gradient(180deg, var(--accent), var(--pill-to));
}

/* Max strength pet */
.xp-pet-card--max {
    border-color: var(--complete);
    background: var(--bg);
}

.xp-pet-card--max::before {
    background: linear-gradient(180deg, var(--complete), var(--high));
}

.xp-pet-card--max:hover::before {
    opacity: 0.8;
}

/* Starving pet */
.xp-pet-card--starving {
    border-color: var(--low);
    background: linear-gradient(135deg, var(--soft), var(--bg));
    animation: starvingPulse 2s ease-in-out infinite;
}

.xp-pet-card--starving::before {
    background: var(--low);
}

.xp-pet-card--starving:hover::before {
    opacity: 1;
}

@keyframes starvingPulse {
    0%, 100% { border-color: var(--low); }
    50% { border-color: var(--medium); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPRITE SECTION - Left Side
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-pet-card__sprite {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 80px;
    flex-shrink: 0;
}

.xp-pet-card__sprite-wrapper {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, var(--soft), var(--bg));
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
        inset 0 2px 4px var(--shadow),
        0 2px 8px var(--shadow);
}

.xp-pet-card__sprite-wrapper canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

.xp-pet-card__sprite-fallback {
    font-size: 32px;
    opacity: 0.5;
}

/* Badges under sprite */
.xp-pet-card__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
}

.xp-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
}

.xp-badge--max {
    background: linear-gradient(135deg, var(--complete), var(--high));
    color: #fff; /* White for readability on green background */
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

.xp-badge--starving {
    background: var(--low);
    color: #fff; /* White for readability on red background */
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

.xp-badge--boost {
    background: linear-gradient(135deg, var(--mut-gold), var(--mut-ambercharged));
    color: #1a1a1a; /* Dark for readability on gold background */
    text-shadow: 0 1px 0 rgba(255,255,255,0.3);
}

/* Task 9-10: STR display under sprite/badges (tight 2px spacing) */
.xp-pet-card__str-display {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 3px;
    margin-top: 2px; /* Task 9: tight spacing */
    font-size: 11px;
    font-weight: 600;
}

.xp-str__label {
    color: var(--pill-to); /* Updated per user request */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 10px;
}

.xp-str__current {
    color: var(--fg);
    font-weight: 800;
    font-size: 13px;
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8);
}

.xp-str__separator {
    color: var(--muted);
    font-size: 11px;
}

.xp-str__max {
    color: var(--muted);
    font-size: 11px;
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8);
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS SECTION - Right Side
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-pet-card__stats {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.xp-pet-card__name {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    letter-spacing: 0.3px;
}

/* Stats Table */
.xp-stats-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

/* Task 3: Remove row dividers for cleaner look */
.xp-stats-table__row {
    /* No border - clean, minimal design */
}

.xp-stats-table__row:last-child {
    /* No special treatment needed */
}

.xp-stats-table__label {
    padding: 6px 12px 6px 0;
    color: var(--pill-to); /* Updated per user request */
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    width: 80px;
}

.xp-stats-table__value {
    padding: 6px 0;
    color: var(--fg);
    font-weight: 600;
}

.xp-stats-table__value--danger {
    color: var(--low);
    font-weight: 800;
}

/* Strength display */
.xp-strength {
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
}

.xp-strength__current {
    font-size: 16px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.xp-strength__separator {
    color: var(--muted);
    font-size: 13px;
}

.xp-strength__max {
    color: var(--muted);
    font-size: 13px;
    font-weight: 600;
}

/* Progress row (time + feeds + progress bar) */
.xp-progress-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.xp-progress-row__time {
    font-weight: 700;
    font-size: 13px;
    color: var(--fg);
    min-width: 45px;
}

.xp-progress-row__feeds {
    font-size: 12px;
    color: var(--muted);
    white-space: nowrap;
}

.xp-progress-row__bar-container {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 120px;
}

.xp-progress-row__bar {
    flex: 1;
    height: 10px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.xp-progress-row__fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.xp-progress-row__fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg,
        transparent,
        rgba(255,255,255,0.25),
        transparent
    );
    animation: progressShimmer 2.5s infinite;
}

@keyframes progressShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.xp-progress-row__fill--low {
    background: linear-gradient(90deg, var(--low), var(--medium));
}

.xp-progress-row__fill--medium {
    background: linear-gradient(90deg, var(--medium), var(--high));
}

.xp-progress-row__fill--high {
    background: linear-gradient(90deg, var(--high), var(--complete));
}

.xp-progress-row__percent {
    font-size: 11px;
    font-weight: 800;
    min-width: 32px;
    text-align: right;
    color: var(--fg);
}

/* XP Boost row */
.xp-stats-table__row--boost {
    background: linear-gradient(90deg, var(--soft), transparent);
}

.xp-boost-stat {
    color: var(--mut-ambercharged);
    font-weight: 700;
}

.xp-inactive {
    color: var(--muted);
    font-style: italic;
    font-size: 11px;
    margin-left: 4px;
}

/* Supporting row */
.xp-stats-table__row--support {
    background: linear-gradient(90deg, var(--soft), transparent);
}

.xp-support {
    color: var(--pill-to);
    font-weight: 600;
}

/* Warning row */
.xp-stats-table__row--warning {
    background: linear-gradient(90deg, rgba(220, 38, 38, 0.15), transparent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER - XP Boost Summary
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-panel__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    /* Task 5: Theme-semantic colors */
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-top: 1px solid var(--border);
}

.xp-panel__footer--hidden {
    display: none;
}

.xp-panel__footer-icon {
    font-size: 24px;
    color: var(--fg);  /* Task 5: Use --fg */
    animation: boostPulse 1.5s ease-in-out infinite;
}

@keyframes boostPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.xp-panel__footer-content {
    flex: 1;
}

.xp-panel__footer-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--fg);  /* Task 5: Use --fg */
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.xp-panel__footer-detail {
    font-size: 14px;
    font-weight: 600;
    color: var(--fg);  /* Task 5: Use --fg */
    margin-top: 2px;
}

.xp-panel__footer-names {
    color: var(--pill-to);  /* Task 5: Use --pill-to for subtle contrast */
    font-size: 12px;
    font-weight: 500;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 480px) {
    .xp-panel__header {
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
    }

    .xp-pet-card {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .xp-pet-card__sprite {
        flex-direction: row;
        gap: 12px;
    }

    .xp-pet-card__name {
        text-align: center;
    }

    .xp-stats-table__label {
        width: auto;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

.xp-panel:focus-within {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .xp-panel,
    .xp-pet-card,
    .xp-progress__fill,
    .xp-panel__footer-icon {
        animation: none;
        transition: none;
    }

    .xp-progress__fill::after {
        animation: none;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINT
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
    .xp-panel {
        box-shadow: none;
        border: 2px solid var(--border);
    }

    .xp-progress__fill::after,
    .xp-panel__footer-icon {
        animation: none;
    }
}
`,H_=`
/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH STATS COMPACT - Summary Bar
   ═══════════════════════════════════════════════════════════════════════════ */

/* Main container - single inline row like XP bar */
.growth-summary-overhaul {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: var(--soft);
    border-radius: 12px;
    margin-bottom: 10px;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}

/* Progress bar section */
.team-progress-bar--egg, .team-progress-bar--plant {
    position: relative;
    flex: 1;
    min-width: 80px;
    max-width: 100%; /* Prevent overflow */
    height: 18px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
}

.team-progress-bar__fill--plant {
    background: linear-gradient(90deg, var(--accent-1), color-mix(in oklab, var(--accent-1) 70%, white));
    height: 100%;
    border-radius: 5px;
    transition: width 0.3s ease;
}

.team-progress-bar__fill--egg {
    background: linear-gradient(90deg, var(--accent-2), color-mix(in oklab, var(--accent-2) 70%, white));
    height: 100%;
    border-radius: 5px;
    transition: width 0.3s ease;
}

/* Next Item Display - inline */
.growth-next-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    white-space: nowrap;
}

.growth-next-sprite {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.growth-next-sprite canvas {
    image-rendering: pixelated;
}

.growth-next-details {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.growth-next-time {
    font-weight: 700;
    color: var(--pill-from); /* Updated per user request */
}

.growth-next-date {
    color: var(--fg); /* Per user: "3:04 pm" */
    font-size: 10px;
}

/* Controls - inline */
.growth-overhaul-controls {
    display: flex;
    gap: 8px;
}

.growth-toggle-overhaul, .growth-dropdown-overhaul {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 3px 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.15s ease;
    color: var(--fg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.growth-toggle-overhaul canvas {
    image-rendering: pixelated;
}

.growth-toggle-overhaul:hover, .growth-dropdown-overhaul:hover {
    border-color: var(--accent);
    background: var(--soft);
}

.growth-dropdown-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    color: var(--fg);
}

.growth-dropdown-option:hover {
    background: var(--accent);
    color: var(--pill-to);
}

.growth-stats-compact {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 100%;
    overflow-x: hidden;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAT ROW - Individual Stat Display
   ═══════════════════════════════════════════════════════════════════════════ */

.stat-row {
    display: flex;
    align-items: center;
    gap: 4px; /* Tighter spacing on desktop */
    padding: 4px 8px; /* Slightly tighter padding */
    background: transparent;
    border: none;
    border-radius: 6px;
    flex-wrap: nowrap; /* Prevent vertical stacking on desktop */
    max-width: 100%;
    box-sizing: border-box;
}

.stat-row--boost {
    background: transparent;
}

.stat__label {
    font-size: 10px;
    font-weight: 700;
    color: var(--pill-to); /* Updated per user request */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 70px;
}

.stat__timer {
    font-size: 12px;
    font-weight: 700;
    color: var(--pill-from); /* Updated per user request */
    min-width: 60px;
}

.stat__feeds {
    font-size: 11px;
    color: var(--fg); /* Per user: date/time text */
    min-width: 50px;
}

.stat__str-label {
    display: flex;
    align-items: center;
    gap: 4px;
}

.stat__progress-mini {
    position: relative; /* Required for absolute positioning of percent */
    flex: 1;
    height: 10px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 5px;
    overflow: visible; /* Changed from hidden to show overlayed percent */
    min-width: 60px;
}

.stat__progress-fill {
    height: 100%;
    transition: width 0.3s ease;
}

.stat__progress-fill--egg {
    background: linear-gradient(90deg, var(--accent-2), color-mix(in oklab, var(--accent-2) 70%, white));
}

.stat__progress-fill--plant {
    background: linear-gradient(90deg, var(--accent-1), color-mix(in oklab, var(--accent-1) 70%, white));
}

.stat__percent {
    position: absolute;
    top: 50%;
    left: 50%; /* Center properly */
    transform: translate(-50%, -50%); /* Center properly */
    font-size: 11px;
    font-weight: 800;
    color: var(--accent); /* Per user: percentage text with outline */
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8); /* Black outline for visibility */
    pointer-events: none;
    z-index: 2;
}

.stat__value {
    font-size: 11px;
    font-weight: 600;
    color: var(--pill-from); /* Updated per user request */
}

.stat__value--accent {
    color: var(--mut-ambercharged);
    font-weight: 700;
}

/* Sprite wrappers - remove inline styles */
.sprite-wrapper,
.stacked-sprites {
    display: inline-flex;
    align-items: center;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOOST ROW - Displays "+Xmin/proc" text
   User requirement: Convert min/h to "Xh Ym/h" format with --pill-from color
   ═══════════════════════════════════════════════════════════════════════════ */

.boost-summary {
    font-size: 12px;
    font-weight: 700;
    color: var(--pill-from); /* Per user: boost text with outline */
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8); /* Black outline for visibility */
}

.team-progress-bar__overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between; /* Use space-between instead of gap */
    align-items: center;
    padding: 0 15%; /* Percentage padding for responsive centering */
    width: 100%;
    pointer-events: none;
    box-sizing: border-box;
}

.bar-percent {
    color: var(--accent);
}

.bar-info {
    color: var(--pill-from);
}

.bar-percent, 
.bar-info {
    font-size: 13px; /* Match sizes */
    font-weight: 800;
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8);
}

.stat-row--message {
    justify-content: center;
    background: transparent;
    border: 1px dashed var(--border);
    opacity: 1; /* Keep fully visible for --pill-from color */
    width: 100%;
    box-sizing: border-box;
}

.stat__message {
    font-size: 11px;
    font-weight: 700;
    color: var(--pill-from);
    text-align: center;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DROPDOWN MENU - Gemini Scrollbar Implementation
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-dropdown-menu {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 8px 32px var(--shadow);
    padding: 4px;
    min-width: 180px;
    max-height: 200px;
    overflow-y: auto;
    
    /* Gemini scrollbar (standard pattern) */
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}

.growth-dropdown-menu::-webkit-scrollbar {
    width: 6px;
}

.growth-dropdown-menu::-webkit-scrollbar-track {
    background: transparent;
}

.growth-dropdown-menu::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}

.growth-dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE - Mobile Layout (NO HORIZONTAL SCROLLING)
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .growth-stats-compact {
        padding: 8px;
    }

    .stat-row {
        flex-wrap: wrap; /* Stack items vertically */
        gap: 6px;
    }

    .stat__label {
        min-width: 100%;
        text-align: left;
    }

    .stat__timer,
    .stat__feeds,
    .stat__percent {
        font-size: 10px;
    }

    .stat__progress-mini {
        min-width: 100%; /* Full width on mobile */
    }
}

@media (max-width: 480px) {
    .team-progress-bar__overlay {
        padding: 0 10%; /* Smaller percentage padding on mobile */
        white-space: nowrap;
    }

    .bar-percent, 
    .bar-info {
        font-size: 11px; /* Slightly smaller for mobile */
    }

    .stat-row {
        padding: 8px 6px;
        flex-wrap: wrap; /* Allow wrapping so progress bar can drop down */
        gap: 8px;
        align-items: center;
    }

    .stat__label {
        min-width: auto;
        max-width: 70px;
        flex-shrink: 1;
        font-size: 9px;
    }

    .stat__timer,
    .stat__value {
        flex-shrink: 0; /* Keep value next to label/sprite */
    }

    .stat__progress-mini {
        width: 100%; /* Force progress bar to new row */
        height: 12px;
        margin-top: 2px;
    }

    .growth-dropdown-menu {
        max-height: 160px; /* Smaller on mobile */
    }

    /* Touch-friendly controls - minimum 44px height */
    .growth-toggle-overhaul,
    .growth-dropdown-overhaul {
        min-height: 44px;
        min-width: 44px;
        padding: 8px 12px;
    }

    .growth-dropdown-option {
        min-height: 44px; /* Touch target */
        padding: 10px 12px;
    }
}

@media (max-width: 360px) {
    .stat__label,
    .stat__timer,
    .stat__feeds,
    .stat__percent {
        font-size: 9px;
    }

    .stat__label {
        min-width: auto; /* Allow shrinking */
        max-width: 60px; /* Cap width */
        flex-shrink: 1;
    }

    .stat__progress-mini {
        min-width: 50px;
    }

    .growth-stats-compact {
        padding: 6px;
    }

    .growth-summary-overhaul {
        padding: 8px 10px;
        gap: 8px;
    }

    .team-progress-bar__overlay {
        padding: 0 8%;
    }

    .bar-percent,
    .bar-info {
        font-size: 10px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPRITE GRID - Egg Sprite Overlays (Hatching Panel)
   ═══════════════════════════════════════════════════════════════════════════ */

.stat__sprite-grid {
    display: flex;
    gap: 12px;  /* Increased from 8px for better spacing */
    align-items: center;
    flex-wrap: wrap;
    margin-left: 8px;  /* Add some left margin to separate from label */
}

.stat__sprite-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;  /* Ensure minimum width for sprite + overlay */
}

.stat__sprite-value {
    position: absolute;
    top: -8px;  /* Increased from -6px for better visibility */
    right: -6px;  /* Increased from -4px for more spacing */
    font-size: 0.7rem;  /* Slightly smaller for compactness */
    font-weight: 700;  /* Increased from 600 for better readability */
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 4px;  /* Slightly more padding */
    color: var(--pill-from);
    text-shadow: none;
    z-index: 10;
    white-space: nowrap;  /* Prevent text wrapping */
}

.stat__values-row {
    display: flex;
    align-items: center;
    gap: 6px;  /* Increased from 4px */
}

.stat__separator {
    color: var(--border);
    font-weight: 400;
    margin: 0 4px;  /* Add horizontal margin */
}

.stat__boost-item {
    display: flex;
    align-items: center;
    gap: 6px;  /* Increased from 4px */
}

/* ═══════════════════════════════════════════════════════════════════════════
   MUTATION COLORS - Rainbow and Gold
   ═══════════════════════════════════════════════════════════════════════════ */

.stat__value.stat__value--gold {
    color: var(--mut-gold) !important;
}

.stat__value.stat__value--rainbow {
    color: var(--mut-rainbow) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: reduce) {
    .stat__progress-fill {
        transition: none;
    }
}
`;class j_ extends Ut{constructor(n){super({id:"tab-trackers",label:"Trackers"});M(this,"deps");M(this,"trackerCardPart",null);M(this,"unsubscribeMyPets");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Ye(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>Cl);return {MGSprite:i}},void 0);await r.init(),await M_();const o=n.getRootNode();this.injectStyles(o);const a=this.createGrid("12px");a.id="trackers",n.appendChild(a),this.initializeTrackerCard(a),this.unsubscribeMyPets=ce.myPets.subscribeStable(()=>{this.trackerCardPart?.render();});}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.trackerCardPart&&(this.trackerCardPart.destroy(),this.trackerCardPart=null);}unmount(){this.destroy().catch(console.error),super.unmount();}injectStyles(n){ye(n,$_,"tracker-card-styles"),ye(n,D_,"tile-grid-overlay-styles"),ye(n,B_,"team-card-styles"),ye(n,G_,"feature-card-styles"),ye(n,z_,"team-xp-panel-styles"),ye(n,H_,"growth-panel-styles"),ye(n,hg,"base-pet-card-styles"),ye(n,ql,"badge-styles"),ye(n,bg,"arcade-button-styles"),ye(n,gg,"gemini-icon-button-styles");}initializeTrackerCard(n){this.trackerCardPart||(this.trackerCardPart=new N_({setHUDOpen:this.deps?.setHUDOpen}));const r=this.trackerCardPart.build();n.appendChild(r),this.trackerCardPart.render();}}const U_=`
  #shop-notifier-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Shop Cards */
  .shop-card--seed,
  .shop-card--tool,
  .shop-card--egg,
  .shop-card--decor {
    /* Card styles inherited from Card component */
  }

  /* Emoji icon in table cells */
  .shop-item-icon {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Rarity badge container in table */
  .shop-item-rarity {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  /* Toggle switch container in table */
  .shop-item-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;async function W_(){}const V_={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},Ed={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},Ql={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},Zl={seed:"seed",tool:null,egg:null,decor:null},Md={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function X_(e,t){try{const n=Ql[t],r=X.get(n);if(!r||typeof r!="object")return null;const o=r[e];if(!o)return null;const a=Zl[t];return (a?o[a]:o)?.spriteId??null}catch(n){return console.warn(`[ShopNotifier] Failed to get spriteId for ${e}:`,n),null}}function q_(e,t){try{const n=Ql[t],r=X.get(n);if(!r||typeof r!="object")return null;const o=r[e];if(!o)return null;const a=Zl[t],s=(a?o[a]:o)?.rarity;return s?String(s).toLowerCase():null}catch{return null}}function K_(e,t){try{const n=Ql[t],r=X.get(n);if(!r||typeof r!="object")return e;const o=r[e];if(!o)return e;const a=Zl[t];return (a?o[a]:o)?.name??e}catch(n){return console.warn(`[ShopNotifier] Failed to get name for ${e}:`,n),e}}function Y_(e){const n=un.getTrackedItems().filter(r=>r.shopType===e).map(r=>r.itemId);return new Set(n)}function Cg(e,t){const n=Y_(t);return e.items.map(r=>({...r,rarity:q_(r.id,t),spriteId:X_(r.id,t),itemName:K_(r.id,t),isTracked:n.has(r.id)}))}function J_(e,t){const n=Cg(e,t);return Ds({columns:[{key:"icon",header:"",width:"40px",align:"center",sortable:false,render:a=>{const i=h("div",{className:"shop-item-icon"});if(a.spriteId){const s=z.toCanvas(a.spriteId);s?(s.style.maxWidth="32px",s.style.maxHeight="32px",s.style.width="auto",s.style.height="auto",s.style.imageRendering="auto",s.style.display="block",i.appendChild(s)):i.textContent=Ed[t];}else i.textContent=Ed[t];return i}},{key:"itemName",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(a,i)=>a.itemName.localeCompare(i.itemName,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",width:"120px",align:"left",sortable:true,sortFn:(a,i)=>{const s=a.rarity?Md[a.rarity.toLowerCase()]??999:999,c=i.rarity?Md[i.rarity.toLowerCase()]??999:999;return s-c},render:a=>{const i=h("div",{className:"shop-item-rarity"}),s=io({variant:"rarity",rarity:a.rarity});return i.appendChild(s.root),i}},{key:"toggle",header:"Track",width:"60px",align:"center",sortable:false,render:a=>{const i=h("div",{className:"shop-item-toggle"}),s=Fr({checked:a.isTracked,size:"sm",onChange:c=>{a.isTracked=c,c?un.addTrackedItem(t,a.id):un.removeTrackedItem(t,a.id);}});return i.appendChild(s.root),i}}],data:n,maxHeight:360,stickyHeader:true,zebra:true,compact:true,getRowId:a=>a.id})}function Q_(e){const{shopType:t}=e,n=Pl(),r=n.getShop(t);let o=null,a=null,i=null;function s(){return a=J_(r,t),o=He({id:`shop-card-${t}`,title:V_[t],expandable:true,defaultExpanded:true,stateKey:`shop-${t}`,variant:"soft",padding:"none",divider:false},a.root),o.classList.add(`shop-card--${t}`),o}function c(){if(!a)return;const l=n.getShop(t),u=Cg(l,t);a.setData(u);}function d(){i&&(i(),i=null),a&&(a.destroy(),a=null),o=null;}return i=n.subscribeStable(l=>{const u=l.byType[t];u&&JSON.stringify(r.items)!==JSON.stringify(u.items)&&(Object.assign(r,u),c());}),{root:s(),refresh:c,destroy:d}}const Z_=["seed","tool","egg","decor"];class eA extends Ut{constructor(){super({id:"tab-shop-notifier",label:"Shop Alerts"});M(this,"sectionElement",null);M(this,"shopCards",new Map);}async build(n){await W_();const r=n.getRootNode();ye(r,U_,"shop-notifier-styles");const o=this.createGrid("12px");o.id="shop-notifier-section",this.sectionElement=o;const{MGData:a}=await Ye(async()=>{const{MGData:i}=await Promise.resolve().then(()=>Cl);return {MGData:i}},void 0);await Promise.all([a.waitFor("plants"),a.waitFor("items"),a.waitFor("eggs"),a.waitFor("decor")]),this.buildParts(),n.appendChild(o);}render(n){super.render(n);}buildParts(){if(this.sectionElement)for(const n of Z_){const r=Q_({shopType:n});this.shopCards.set(n,r),this.sectionElement.appendChild(r.root);}}async destroy(){for(const n of this.shopCards.values())n.destroy?.();this.shopCards.clear(),this.sectionElement=null;}}const tA={Store:{select:ge.select.bind(ge),set:ge.set.bind(ge),subscribe:ge.subscribe.bind(ge),subscribeImmediate:ge.subscribeImmediate.bind(ge)},Globals:ce,Modules:{Version:Hs,Assets:pn,Manifest:Tt,Data:X,Environment:Ke,CustomModal:An,Sprite:z,Tile:Pt,Pixi:Na,Audio:Ba,Cosmetic:ml,Calculators:Vp},Features:{AutoFavorite:Il,JournalChecker:pf,BulkFavorite:Ca,Achievements:hf,Tracker:dg,AntiAfk:sn,Pets:ug,PetTeam:ae,XPTracker:_a,CropValueIndicator:Mr,CropSizeIndicator:Lr,ShopNotifier:un},WebSocket:{chat:Lv,emote:Rv,wish:Ov,kickPlayer:Fv,setPlayerData:Ga,usurpHost:Nv,reportSpeakingStart:$v,setSelectedGame:Dv,voteForGame:Bv,requestGame:Gv,restartGame:zv,ping:Hv,checkWeatherStatus:Wv,move:jv,playerPosition:Fp,teleport:Uv,moveInventoryItem:Vv,dropObject:Xv,pickupObject:qv,toggleFavoriteItem:za,putItemInStorage:ul,retrieveItemFromStorage:pl,moveStorageItem:Kv,logItems:Yv,plantSeed:Jv,waterPlant:Qv,harvestCrop:Zv,sellAllCrops:ew,purchaseDecor:tw,purchaseEgg:nw,purchaseTool:rw,purchaseSeed:ow,plantEgg:aw,hatchEgg:iw,plantGardenPlant:sw,potPlant:lw,mutationPotion:cw,pickupDecor:dw,placeDecor:uw,removeGardenObject:pw,placePet:Np,feedPet:fw,petPositions:gw,swapPet:$p,storePet:Dp,namePet:mw,sellPet:hw},_internal:{getGlobals:kt,initGlobals:ef,destroyGlobals:mC}};function nA(){const e=L;e.Gemini=tA,e.MGSprite=z,e.MGData=X,e.MGPixi=Na,e.MGAssets=pn,e.MGEnvironment=Ke;}const rA={lastSelectedSlot:"bottom"};async function oA(){const e=await zn("tab-avatar-ui",{version:1,defaults:rA}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const r=e.get();t.forEach(o=>o(r));},subscribe:n=>(t.push(n),()=>{const r=t.indexOf(n);r!==-1&&t.splice(r,1);})}}const Ld=`
    .avatar-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        padding: var(--spacing-sm);
        height: 100%;
        overflow-y: auto;
    }

    .avatar-main-layout {
        display: flex;
        gap: var(--spacing-lg);
        flex-wrap: wrap;
        margin-bottom: var(--spacing-lg);
        min-height: 200px;
    }

    .avatar-slots-column {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        width: 130px;
        flex-shrink: 0;
    }

    .avatar-preview-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .avatar-preview-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-height: 320px;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        position: relative;
        overflow: hidden;
        padding: var(--spacing-md);
    }

    .avatar-selection-area {
        margin-top: var(--spacing-sm);
    }

    .avatar-items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: var(--spacing-sm);
        max-height: 300px;
        overflow-y: auto;
        padding: var(--spacing-xs);
        scrollbar-width: thin;
    }

    .avatar-item-btn {
        cursor: pointer;
        padding: var(--spacing-sm);
        border-radius: var(--radius-md);
        background: var(--color-bg-tertiary);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        border: 2px solid transparent;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        min-height: 90px;
        justify-content: center;
        position: relative;
    }

    .avatar-item-btn:hover {
        background: var(--color-bg-hover);
        transform: translateY(-2px);
    }

    .avatar-item-btn.active {
        background: var(--color-bg-active);
        border-color: var(--color-primary);
        box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
    }

    .avatar-item-img {
        width: 56px;
        height: 56px;
        object-fit: contain;
        transform: scale(1.1);
    }

    .avatar-item-label {
        font-size: 10px;
        text-align: center;
        opacity: 0.8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        font-weight: 500;
    }

    .avatar-loadouts-area {
        margin-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        padding-top: var(--spacing-md);
    }

    .avatar-loadouts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: var(--spacing-sm);
        margin-top: var(--spacing-sm);
    }

    .loadout-card {
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        transition: all 0.2s ease;
        min-width: 160px;
    }

    .loadout-card:hover {
        border-color: var(--color-primary-soft);
        background: var(--color-bg-hover);
    }

    .loadout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .loadout-name {
        font-size: var(--font-size-md);
        font-weight: 600;
        color: var(--color-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
    }

    .loadout-actions {
        display: flex;
        gap: var(--spacing-xs);
    }

    .icon-btn {
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        opacity: 0.6;
        transition: opacity 0.2s ease;
    }

    .icon-btn:hover {
        opacity: 1;
        background: rgba(255,255,255,0.1);
    }

    .loadout-wear-btn {
        margin-top: var(--spacing-xs);
    }

    .avatar-action-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        margin-top: auto;
        padding-top: var(--spacing-md);
    }

    .loadout-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
    }

    .loadout-title {
        margin: 0;
        font-size: var(--font-size-md);
        font-weight: 600;
        color: var(--color-text);
    }

    .avatar-preview-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        max-width: 320px;
        max-height: 320px;
        pointer-events: none;
        object-fit: contain;
        transition: transform 0.2s ease-out;
    }

    .none-placeholder {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        opacity: 0.5;
    }

    /* Mini Preview Styles */
    .loadout-mini-preview {
        position: relative;
        width: 100%;
        height: 120px;
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-sm);
        overflow: hidden;
        margin-bottom: var(--spacing-xs);
        border: 1px solid var(--color-border-soft);
    }

    .loadout-mini-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        object-fit: contain;
    }

    /* Name Input Styles */
    .loadout-name-input {
        width: 100%;
    }

    .loadout-name-input .lg-input-wrap {
        border-bottom: 2px solid var(--color-primary-soft);
        border-radius: 0;
    }

    .loadout-name-input input {
        background: transparent !important;
        border: none !important;
        padding: 4px 0 !important;
        font-weight: 600 !important;
        color: var(--color-text) !important;
        font-size: var(--font-size-md) !important;
    }
`;class aA extends Ut{constructor(){super({id:"tab-avatar",label:"Avatar"});M(this,"previewOutfit",{top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png"});M(this,"previewContainer",null);M(this,"menuContainer",null);M(this,"menuCard",null);M(this,"loadoutsContainer",null);M(this,"currentSlot",null);M(this,"uiState",null);M(this,"cleanups",[]);}async build(n){const[r,o,a]=await Promise.all([dl(),oA(),jr().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"}))]);this.uiState=o,this.previewOutfit={top:a.top,mid:a.mid,bottom:a.bottom,expression:a.expression},yv().catch(S=>console.warn("[AvatarSection] Discovery failed:",S)),$t.init();const i=this.createContainer("avatar-section"),s=n.getRootNode();if(s instanceof ShadowRoot)ye(s,Ld,"avatar-section-styles");else {const S=h("style");S.textContent=Ld,i.appendChild(S);}n.appendChild(i);const c=h("div",{className:"avatar-main-layout"});i.appendChild(c);const d=h("div",{className:"avatar-slots-column"});c.appendChild(d),[{label:"Expression",key:"expression"},{label:"Top (Hat)",key:"top"},{label:"Mid (Face)",key:"mid"},{label:"Bottom (Outfit)",key:"bottom"}].forEach(S=>{const v=qe({label:S.label,fullWidth:true,size:"sm",onClick:()=>this.showMenu(S.key)});d.appendChild(v);});const u=h("div",{className:"avatar-action-group"});d.appendChild(u);const p=qe({label:"Apply to World",variant:"primary",fullWidth:true,onClick:async()=>{p.setLoading(true),await gl(this.previewOutfit),p.setLoading(false),p.setLabel("Success!"),setTimeout(()=>p.setLabel("Apply to World"),2e3);}});u.appendChild(p);const f=qe({label:"Reset",variant:"danger",fullWidth:true,size:"sm",onClick:async()=>{await Gp();const S=await jr();this.previewOutfit={...S},this.updatePreview();}});u.appendChild(f);const g=h("div",{className:"avatar-preview-area"});c.appendChild(g);const m=He({title:"Live Preview",variant:"soft"});this.previewContainer=h("div",{className:"avatar-preview-box"}),m.querySelector(".card-body")?.appendChild(this.previewContainer),g.appendChild(m),this.updatePreview(),this.menuCard=He({title:"Select Item",variant:"outline"}),this.menuCard.className+=" avatar-selection-area",this.menuContainer=h("div",{className:"avatar-items-grid"}),this.menuCard.querySelector(".card-body")?.appendChild(this.menuContainer),this.menuCard.style.display="none",i.appendChild(this.menuCard);const b=h("div",{className:"avatar-loadouts-area"});i.appendChild(b);const y=h("div",{className:"loadout-header-row"});b.appendChild(y),y.appendChild(h("h3",{className:"loadout-title"},"Saved Outfits"));const C=qe({label:"+ Save Current",size:"sm",onClick:()=>this.handleSaveCurrent()});y.appendChild(C),this.loadoutsContainer=h("div",{className:"avatar-loadouts-grid"}),b.appendChild(this.loadoutsContainer),this.cleanups.push($t.subscribe(()=>this.renderLoadouts())),this.renderLoadouts();}updatePreview(){if(!this.previewContainer)return;this.previewContainer.innerHTML="";const n=Hr();[{f:this.previewOutfit.bottom,z:1},{f:this.previewOutfit.mid,z:2},{f:this.previewOutfit.top,z:3},{f:this.previewOutfit.expression,z:4}].forEach(o=>{const a=o.f===ls;if(!o.f||o.f.includes("_Blank.png")||a)return;const i=h("img",{src:`${n}${o.f}`,className:"avatar-preview-layer",style:{zIndex:String(o.z)},onerror:()=>i.style.display="none"});this.previewContainer.appendChild(i);});}async showMenu(n){if(!this.menuContainer||!this.menuCard)return;this.currentSlot=n;const r={top:"Top",mid:"Mid",bottom:"Bottom",expression:"Expression"},o=await Lp({type:r[n]});this.menuContainer.innerHTML="",this.menuCard.style.display="block";const a=this.menuCard.querySelector(".card-title");a&&(a.textContent=`Selection: ${r[n]} (${o.length-1} variants)`),o.forEach(i=>{const s=this.previewOutfit[n]===i.filename,c=i.displayName==="None",d=h("div",{className:`avatar-item-btn ${s?"active":""}`,"data-filename":i.filename||"null",onclick:()=>this.selectItem(i)});if(c)d.appendChild(h("div",{className:"none-placeholder"},"∅"));else {const l=h("img",{src:i.url,className:"avatar-item-img",onerror:()=>l.style.display="none"});d.appendChild(l);}d.appendChild(h("div",{className:"avatar-item-label"},c?"None":i.displayName)),this.menuContainer.appendChild(d);}),this.menuCard.scrollIntoView({behavior:"smooth",block:"start"});}selectItem(n){!this.currentSlot||!this.menuContainer||(this.previewOutfit[this.currentSlot]=n.filename,this.updatePreview(),this.menuContainer.querySelectorAll(".avatar-item-btn").forEach(r=>{const o=r.getAttribute("data-filename")===(n.filename||"null");r.classList.toggle("active",o);}));}renderLoadouts(){if(!this.loadoutsContainer)return;this.loadoutsContainer.innerHTML="";const n=$t.get();if(n.length===0){this.loadoutsContainer.innerHTML='<div style="grid-column: 1/-1; opacity: 0.5; text-align: center; padding: 20px;">No outfits saved yet.</div>';return}n.forEach(r=>{const o=h("div",{className:"loadout-card"}),a=h("div",{className:"loadout-mini-preview"}),i=Hr();[{f:r.bottom,z:1},{f:r.mid,z:2},{f:r.top,z:3},{f:r.expression,z:4}].forEach(p=>{const f=p.f===ls;if(!p.f||p.f.includes("_Blank.png")||f)return;const g=h("img",{src:`${i}${p.f}`,className:"loadout-mini-layer",style:{zIndex:String(p.z)},onerror:()=>g.style.display="none"});a.appendChild(g);}),o.appendChild(a);const c=h("div",{className:"loadout-header"}),d=Fs({value:r.name,placeholder:"Unnamed Outfit",mode:"alphanumeric",allowSpaces:true,maxLength:24,blockGameKeys:true,onChange:p=>{$t.rename(r.id,p);}});d.input.addEventListener("keydown",p=>p.stopPropagation(),true),d.input.addEventListener("keyup",p=>p.stopPropagation(),true),d.input.addEventListener("keypress",p=>p.stopPropagation(),true),d.root.classList.add("loadout-name-input"),c.appendChild(d.root);const l=h("div",{className:"icon-btn",onclick:p=>{p.stopPropagation(),confirm("Delete this outfit?")&&$t.delete(r.id);}},"🗑️");c.appendChild(l),o.appendChild(c);const u=qe({label:"Wear",size:"sm",fullWidth:true,onClick:async()=>{u.setLoading(true),await $t.wear(r.id),this.previewOutfit={top:r.top,mid:r.mid,bottom:r.bottom,expression:r.expression},this.updatePreview(),u.setLoading(false);}});o.appendChild(u),this.loadoutsContainer.appendChild(o);});}async handleSaveCurrent(){await $t.save("",this.previewOutfit),setTimeout(()=>{if(!this.loadoutsContainer)return;const n=this.loadoutsContainer.querySelectorAll(".loadout-card"),o=n[n.length-1]?.querySelector("input");o&&(o.focus(),o.select());},100);}async destroy(){this.cleanups.forEach(n=>n()),this.cleanups=[],super.destroy();}}let $i=null,Di=null;function iA(){return $i||($i=new iS),$i}function kg(){return Di||(Di=new eA),Di}function sA(e){return [new Ym(e),new Nk,new Zk,kg(),new f_(e),new j_(e),new aA]}async function lA(){const e=kg(),t=iA();await Promise.all([e.preload(),t.preload()]);}function cA(e){const{shadow:t,initialOpen:n}=e,r=h("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=h("div",{className:"gemini-tabbar"}),a=h("div",{className:"gemini-content",id:"content"}),i=h("div",{className:"gemini-resizer",title:"Resize"}),s=h("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,a,i);const c=h("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:c}}function dA(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:a,minWidth:i,maxWidth:s}=e;let c=i,d=s;function l(){const v=Ke.detect(),A=Math.round(L.visualViewport?.width??L.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){const x=getComputedStyle(r.host),w=parseFloat(x.getPropertyValue("--inset-l"))||0,_=parseFloat(x.getPropertyValue("--inset-r"))||0,k=Math.max(280,A-Math.round(w+_));c=280,d=k;}else c=i,d=s;return {min:c,max:d}}function u(v){return Math.max(c,Math.min(d,Number(v)||a))}function p(v){const A=u(v);n.style.setProperty("--w",`${A}px`),o(A);}l();const f=Ke.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const b=v=>{if(!m)return;v.preventDefault();const A=Math.round(L.innerWidth-v.clientX);p(A);},y=()=>{m&&(m=false,document.body.style.cursor="",L.removeEventListener("mousemove",b),L.removeEventListener("mouseup",y));},C=v=>{g&&(v.preventDefault(),m=true,document.body.style.cursor="ew-resize",L.addEventListener("mousemove",b),L.addEventListener("mouseup",y));};t.addEventListener("mousedown",C);function S(){t.removeEventListener("mousedown",C),L.removeEventListener("mousemove",b),L.removeEventListener("mouseup",y);}return {calculateResponsiveBounds:l,constrainWidthToLimits:u,setHudWidth:p,destroy:S}}function uA(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:a=true}=e;function i(c){const d=t.classList.contains("open");if(a&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",i,{capture:true});function s(){document.removeEventListener("keydown",i,{capture:true});}return {destroy:s}}const pA=`
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
    max-width: 100vw;
    height: 100dvh;
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
`,fA=`
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
`,gA=`
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
`,mA=`
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
`,hA=`
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
    border-left-color: var(--info);
  }
  .card--tone-success{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: var(--high);
  }
  .card--tone-warning{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: var(--medium);
  }
  .card--tone-danger{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: var(--low);
  }
}
  
`,bA=`
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
`,xA=`
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
`,yA=`
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
`,vA=`
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

/* Wrapper containing arrows + tabs container */
.lg-tabs-wrapper{
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  width: 100%;
}

/* Ribbon containing the tabs */
.lg-tabs{
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;

  min-width: 0;       /* allow shrink */
  flex: 1 1 auto;
  max-width: none;

  background-color: var(--tab-bg);
  color: var(--tab-fg);
  border-radius: 999px;
  padding: 6px;

  box-shadow: 0 4px 12px color-mix(in oklab, var(--shadow) 32%, transparent);

  overflow: hidden;
  scrollbar-width: none;
  transition: background-color .28s ease, color .28s ease;
  scroll-behavior: smooth;
}
.lg-tabs::-webkit-scrollbar{ display:none; }

/* Scroll arrow buttons */
.lg-tabs-arrow{
  position: relative;
  flex: 0 0 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
  background: linear-gradient(180deg,
    color-mix(in oklab, var(--soft) 75%, transparent) 0%,
    color-mix(in oklab, var(--soft) 65%, transparent) 100%
  );
  color: var(--fg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  transition: all .2s cubic-bezier(.2,.8,.2,1);
  opacity: 1;
  box-shadow: 0 2px 6px color-mix(in oklab, var(--shadow) 12%, transparent);
}

.lg-tabs-arrow svg{
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.lg-tabs-arrow:hover:not(.disabled){
  background: linear-gradient(180deg,
    color-mix(in oklab, var(--soft) 88%, transparent) 0%,
    color-mix(in oklab, var(--soft) 78%, transparent) 100%
  );
  border-color: color-mix(in oklab, var(--accent) 50%, var(--border));
  box-shadow: 0 4px 12px color-mix(in oklab, var(--accent) 25%, transparent);
  transform: translateY(-2px);
}

.lg-tabs-arrow:active:not(.disabled){
  transform: scale(.96) translateY(0);
  box-shadow: 0 1px 3px color-mix(in oklab, var(--shadow) 20%, transparent);
}

.lg-tabs-arrow.disabled{
  opacity: .35;
  cursor: not-allowed;
  box-shadow: none;
}

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
  .lg-tabs-wrapper{ gap: 6px; }
  .lg-tabs-arrow{
    flex: 0 0 28px;
    height: 28px;
    border-radius: 7px;
  }
  .lg-tabs-arrow svg{ width: 15px; height: 15px; }
  .lg-tabs{ padding: 5px; }
  .lg-tab{ padding: 9px 14px; font-size: 13.5px; }
  .lg-pill{ top: 5px; height: calc(100% - 10px); }
}

/* Mobile: hide arrows, enable swipe with better feedback */
@media (max-width: 480px){
  .lg-tabbar{
    padding: 12px max(10px, var(--inset-l)) 12px max(10px, var(--inset-r));
    gap: 12px;
  }
  .lg-tabs-wrapper{
    gap: 0;
  }
  /* Hide arrow buttons on mobile completely */
  .lg-tabs-arrow{
    display: none !important;
  }
  .lg-tabs{
    border-radius: 14px;
    padding: 4px;
    /* Enable native touch scrolling behavior with momentum */
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    /* Improve touch responsiveness */
    touch-action: pan-x;
  }
  .lg-tab{
    padding: 8px 12px;
    font-size: 13px;
    /* Slightly larger touch target on mobile */
    min-width: 60px;
  }
  .lg-pill{
    top: 4px;
    height: calc(100% - 8px);
  }
}

@media (max-width: 360px){
  .lg-tab{
    padding: 6px 10px;
    font-size: 12px;
    min-width: 50px;
  }
}
`,wA=`
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
`,SA=`
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
`,CA=`
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
  --thumb: var(--switch-thumb);

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
`,kA=`
/* ==================== Checkbox ==================== */

.lg-checkbox-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.lg-checkbox {
  --cb-size: 20px;
  --cb-border: var(--border);
  --cb-bg: var(--soft);
  --cb-checked-bg: var(--accent);
  --cb-checked-border: var(--accent);
  --cb-checkmark: #fff;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: var(--cb-size);
  height: var(--cb-size);
  border-radius: 4px;
  border: 1px solid var(--cb-border);
  background: var(--cb-bg);
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 2px 8px color-mix(in oklab, var(--shadow) 20%, transparent);
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  position: relative;
}

.lg-checkbox:hover:not(:disabled) {
  border-color: color-mix(in oklab, var(--accent) 40%, var(--border));
  box-shadow: 0 2px 8px color-mix(in oklab, var(--shadow) 30%, transparent);
}

.lg-checkbox:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.lg-checkbox:checked {
  background: var(--cb-checked-bg);
  border-color: var(--cb-checked-border);
}

.lg-checkbox:checked::after {
  content: '';
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-40%, -50%) rotate(45deg);
  width: 5px;
  height: 9px;
  border: solid var(--cb-checkmark);
  border-width: 0 2px 2px 0;
  opacity: 1;
}

.lg-checkbox:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: saturate(92%);
}

.lg-checkbox-label {
  font-size: 14px;
  color: var(--fg);
  user-select: none;
  cursor: pointer;
}

.lg-checkbox:disabled ~ .lg-checkbox-label {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sizes */
.lg-checkbox--sm {
  --cb-size: 16px;
}

.lg-checkbox--md {
  --cb-size: 20px;
}

.lg-checkbox--lg {
  --cb-size: 24px;
}

.lg-checkbox--sm:checked::after {
  width: 3px;
  height: 7px;
  border-width: 0 1.5px 1.5px 0;
}

.lg-checkbox--lg:checked::after {
  width: 7px;
  height: 11px;
  border-width: 0 2.5px 2.5px 0;
}
`,_A=`
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
`,AA=`
@keyframes teamClick {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}

.team-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--soft);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease, transform 0.2s ease;
  position: relative;
}

.team-list-item--clicked {
  animation: teamClick 0.3s ease;
}

/* In manage mode, disable drag cursor */
.team-list-item.team-list-item--manage {
  cursor: auto;
}

.team-list-item:not(:last-child) {
  margin-bottom: 4px;
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
  background-color: var(--complete);
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

/* Input in manage mode */
.team-list-item__name-input {
  flex: 1;
  min-width: 0;
}

.team-list-item__name-input .input {
  font-size: 14px;
  color: var(--fg);
  padding: 4px 8px;
  width: 100%;
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
  transition: all 0.2s ease;
}

/* Manage mode - empty slot (accent color for addition) */
.team-list-item__sprite-slot--empty {
  border: 1.5px solid var(--accent);
  background: color-mix(in oklab, var(--accent) 8%, var(--bg));
  box-shadow: inset 0 2px 4px color-mix(in oklab, var(--accent) 10%, transparent);
}

.team-list-item__sprite-slot--empty svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Manage mode - filled slot (danger color for removal) */
.team-list-item__sprite-slot.team-list-item__sprite-slot--filled {
  border: 1.5px solid var(--low) !important;
  box-shadow: inset 0 2px 4px color-mix(in oklab, var(--low) 15%, transparent);
}

.team-list-item__sprite-slot-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: color-mix(in oklab, var(--low) 25%, transparent);
  border-radius: 6px;
  pointer-events: none;
  z-index: 1;
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
`,TA=`
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
`,PA=`
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
`,IA=`
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
`,EA=`
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
`,MA=`
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
`,LA=`
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
`,RA=`
.sg-root {
  display: inline-flex;
  align-items: center;
  width: auto;
}

.sg-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;

  padding: 4px;
  background-color: var(--soft);
  border: 1px solid var(--border);
  border-radius: 10px;

  transition: background-color 0.15s ease, border-color 0.15s ease;
}

/* Animated indicator background */
.sg-indicator {
  position: absolute;
  top: 4px;
  left: 0;
  height: calc(100% - 8px);
  border-radius: 8px;
  width: 70px;

  background: linear-gradient(
    135deg,
    color-mix(in oklab, var(--accent) 35%, transparent) 0%,
    color-mix(in oklab, var(--accent) 50%, transparent) 100%
  );

  box-shadow: inset 0 1px 2px color-mix(in oklab, var(--accent) 20%, transparent);

  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
              width 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);

  pointer-events: none;
  z-index: 0;
  will-change: transform, width;
}

/* Individual segment buttons */
.sg-btn {
  position: relative;
  z-index: 1;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  padding: 7px 16px;
  min-height: 32px;
  min-width: 70px;

  background: transparent;
  border: none;
  border-radius: 7px;
  cursor: pointer;

  color: var(--fg);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 1.2;
  white-space: nowrap;

  transition: color 0.15s ease;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.sg-btn:hover:not(:disabled):not(.active) {
  color: var(--accent);
}

.sg-btn.active {
  color: var(--tab-fg);
  font-weight: 600;
}

.sg-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--muted);
}

.sg-btn:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent);
}

/* Icon styling */
.sg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  font-size: 16px;
}

/* Label styling */
.sg-label {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

/* Size variations */
.sg--sm .sg-btn {
  padding: 5px 12px;
  min-height: 28px;
  font-size: 12px;
  min-width: 60px;
}

.sg--sm .sg-container {
  padding: 3px;
}

.sg--sm .sg-indicator {
  top: 3px;
  height: calc(100% - 6px);
}

.sg--lg .sg-btn {
  padding: 9px 18px;
  min-height: 36px;
  font-size: 14px;
  gap: 8px;
  min-width: 80px;
}

.sg--lg .sg-container {
  padding: 4px;
}

.sg--lg .sg-indicator {
  top: 4px;
  height: calc(100% - 8px);
}

/* Full width mode */
.sg-root[style*="width: 100%"] .sg-btn {
  flex: 1;
  min-width: 0;
}

/* Icon-only mode (when label is hidden via CSS class) */
.sg-btn.sg--icon-only {
  min-width: 40px;
  padding: 8px;
}

.sg--sm .sg-btn.sg--icon-only {
  min-width: 36px;
  padding: 6px;
}

.sg--lg .sg-btn.sg--icon-only {
  min-width: 44px;
  padding: 10px;
}

/* Hover state on container */
.sg-container:hover {
  border-color: color-mix(in oklab, var(--accent) 25%, var(--border));
}

/* Responsive: stack on very small screens if needed */
@media (max-width: 360px) {
  .sg-btn {
    padding: 6px 10px;
    min-height: 32px;
    font-size: 12px;
  }

  .sg-container {
    padding: 3px;
  }

  .sg-icon {
    font-size: 14px;
  }
}
`,OA=`
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
`,FA={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function NA(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,FA),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function $A(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function DA(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=Z=>Z.ctrlKey&&Z.shiftKey&&Z.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:b,shadow:y}=NA(t),C=[[fA,"variables"],[gA,"primitives"],[mA,"utilities"],[pA,"hud"],[hA,"card"],[ql,"badge"],[bA,"button"],[kA,"checkbox"],[xA,"input"],[yA,"label"],[vA,"navTabs"],[wA,"searchBar"],[SA,"select"],[CA,"switch"],[_A,"table"],[AA,"teamListItem"],[TA,"timeRangePicker"],[PA,"tooltip"],[IA,"slider"],[EA,"reorderableList"],[MA,"colorPicker"],[LA,"log"],[RA,"segmentedControl"],[OA,"settings"],[mg,"teamCard"],[qp,"autoFavoriteSettings"]];for(let Z=0;Z<C.length;Z++){const[J,de]=C[Z];ye(y,J,de),Z%5===4&&await $A();}const{panel:S,tabbar:v,content:A,resizer:x,closeButton:w,wrapper:_}=cA({shadow:y,initialOpen:r});function k(Z){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:Z},bubbles:true})),a?.(Z);}function T(Z){const J=S.classList.contains("open");S.classList.toggle("open",Z),S.setAttribute("aria-hidden",Z?"false":"true"),Z!==J&&k(Z);}T(r),w.addEventListener("click",Z=>{Z.preventDefault(),Z.stopPropagation(),T(false);});const E=jm({host:b,themes:i,initialTheme:s,onThemeChange:c}),B=dA({resizer:x,host:b,shadow:y,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});B.setHudWidth(n);const Y=d({applyTheme:E.applyTheme,initialTheme:s,getCurrentTheme:E.getCurrentTheme,setHUDWidth:B.setHudWidth,setHUDOpen:T}),H=new Wg(Y,A,{applyTheme:E.applyTheme,getCurrentTheme:E.getCurrentTheme}),q=Y.map(Z=>({id:Z.id,label:Z.label})),j=l&&Y.some(Z=>Z.id===l)?l:q[0]?.id||"",N=Ug(q,j,Z=>{H.activate(Z),u?.(Z);});N.root.style.flex="1 1 auto",N.root.style.minWidth="0",v.append(N.root,w);const D={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function G(){const Z=ve(Se.CONFIG,{autoFavorite:{enabled:true},journalChecker:{enabled:true},pets:{enabled:true}});for(const[J,de]of Object.entries(D))Z[de]?.enabled??true?N.showTab(J):N.hideTab(J);}function $(Z){const{key:J}=Z.detail;(J===Se.CONFIG||J==="feature:config")&&G();}window.addEventListener(ic.STORAGE_CHANGE,$),G();let I=j;if(!N.isTabVisible(j)){const Z=N.getVisibleTabs();Z.length>0&&(I=Z[0]);}I&&H.activate(I);const O=uA({panel:S,onToggle:()=>T(!S.classList.contains("open")),onClose:()=>T(false),toggleCombo:p,closeOnEscape:f}),F=()=>{N.recalc();const Z=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;B.calculateResponsiveBounds(),B.setHudWidth(Z);};L.addEventListener("resize",F);const U=Z=>{const J=Z.detail?.width;J?B.setHudWidth(J):B.setHudWidth(n),N.recalc();};b.addEventListener("gemini:layout-resize",U);function he(){window.removeEventListener(ic.STORAGE_CHANGE,$),O.destroy(),B.destroy(),L.removeEventListener("resize",F),b.removeEventListener("gemini:layout-resize",U);}return {host:b,shadow:y,wrapper:_,panel:S,content:A,setOpen:T,setWidth:B.setHudWidth,sections:Y,manager:H,nav:N,destroy:he}}const yr={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Vo={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function BA(){return {isOpen:ve(yr.isOpen,Vo.isOpen),width:ve(yr.width,Vo.width),theme:ve(yr.theme,Vo.theme),activeTab:ve(yr.activeTab,Vo.activeTab)}}function Xo(e,t){we(yr[e],t);}const GA="https://i.imgur.com/IMkhMur.png",zA="Stats";function HA(e){let t=e.iconUrl||GA;const n=e.ariaLabel||"Open MGH";let r=null,o=null,a=null,i=false,s=null,c=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],l=S=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(S):S.replace(/"/g,'\\"')}catch{return S}};function u(){const S=document.querySelector(d.map(A=>`button[aria-label="${l(A)}"]`).join(","));if(!S)return null;let v=S.parentElement;for(;v&&v!==document.body;){if(d.reduce((x,w)=>x+v.querySelectorAll(`button[aria-label="${l(w)}"]`).length,0)>=2)return v;v=v.parentElement;}return null}function f(S){const v=Array.from(S.querySelectorAll("button[aria-label]"));if(!v.length)return {refBtn:null,refWrapper:null};const A=v.filter(B=>B.dataset.mghBtn!=="true"&&(B.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),x=A.length?A:v,w=x.find(B=>(B.getAttribute("aria-label")||"").toLowerCase()===zA.toLowerCase())||null,_=x.length>=2?x.length-2:x.length-1,k=w||x[_],T=k.parentElement,E=T&&T.parentElement===S&&T.tagName==="DIV"?T:null;return {refBtn:k,refWrapper:E}}function g(S,v,A){const x=S.cloneNode(false);x.type="button",x.setAttribute("aria-label",v),x.title=v,x.dataset.mghBtn="true",x.style.pointerEvents="auto",x.removeAttribute("id");const w=document.createElement("img");return w.src=A,w.alt="MGH",w.style.pointerEvents="none",w.style.userSelect="none",w.style.width="76%",w.style.height="76%",w.style.objectFit="contain",w.style.display="block",w.style.margin="auto",x.appendChild(w),x.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation();try{e.onClick?.();}catch{}}),x}function m(){if(i)return  false;i=true;let S=false;try{const v=u();if(!v)return !1;s!==v&&(s=v);const{refBtn:A,refWrapper:x}=f(v);if(!A)return !1;o=v.querySelector('div[data-mgh-wrapper="true"]'),!o&&x&&(o=x.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),S=!0);const w=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=w),r||(r=g(A,n,t),o?o.appendChild(r):r.parentElement!==v&&v.appendChild(r),S=!0),o&&o.parentElement!==v&&(v.appendChild(o),S=!0);const _=v;if(_&&_!==c){try{C.disconnect();}catch{}c=_,C.observe(c,{childList:!0,subtree:!0});}return S}finally{i=false;}}const b=document.getElementById("App")||document.body;let y=null;const C=new MutationObserver(S=>{const v=S.every(x=>{const w=Array.from(x.addedNodes||[]),_=Array.from(x.removedNodes||[]),k=w.concat(_);if(k.length===0){const T=x.target;return o&&(T===o||o.contains(T))||r&&(T===r||r.contains(T))}return k.every(T=>!!(!(T instanceof HTMLElement)||o&&(T===o||o.contains(T))||r&&(T===r||r.contains(T))))}),A=S.some(x=>Array.from(x.removedNodes||[]).some(w=>w instanceof HTMLElement?!!(o&&(w===o||o.contains(w))||r&&(w===r||r.contains(w))):false));v&&!A||y===null&&(y=window.setTimeout(()=>{if(y=null,m()&&o){const w=o.parentElement;w&&w.lastElementChild!==o&&w.appendChild(o);}},150));});return m(),C.observe(b,{childList:true,subtree:true}),a=()=>C.disconnect(),()=>{try{a?.();}catch{}try{o?.remove();}catch{}}}const _g=[];function jA(){return _g.slice()}function UA(e){_g.push(e);}function Ag(e){try{return JSON.parse(e)}catch{return}}function Rd(e){if(typeof e=="string"){const t=Ag(e);return t!==void 0?t:e}return e}function Tg(e){if(e!=null){if(typeof e=="string"){const t=Ag(e);return t!==void 0?Tg(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function WA(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ne(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,a=(i,s)=>{if(Tg(i)!==e)return;const d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return UA(a),a}const sr=new WeakSet,Od=new WeakMap;function VA(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:jA();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,f)=>{let g=p;for(const m of r){const b=m(g,o(f));if(b){if(b.kind==="drop")return {kind:"drop"};b.kind==="replace"&&(g=b.message);}}return g!==p?{kind:"replace",message:g}:void 0};let i=null,s=null,c=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(sr.has(f))return  true;const g=f.bind(p);function m(...b){const y=b.length===1?b[0]:b,C=Rd(y),S=a(C,WA(t));if(S?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",C);return}if(S?.kind==="replace"){const v=S.message;return b.length>1&&Array.isArray(v)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",C,"=>",v),g(...v)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",C,"=>",v),g(v))}return g(...b)}sr.add(m),Od.set(m,f);try{p.sendMessage=m,sr.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return i=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||sr.has(f))return;function g(m){const b=Rd(m),y=a(b,this);if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(y?.kind==="replace"){const C=y.message,S=typeof C=="string"||C instanceof ArrayBuffer||C instanceof Blob?C:JSON.stringify(C);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",C),f.call(this,S)}return f.call(this,m)}sr.add(g),Od.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(i){try{i();}catch{}i=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const Pg=[];function XA(){return Pg.slice()}function Fd(e){Pg.push(e);}function qA(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function KA(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Bi=Symbol.for("ariesmod.ws.handlers.patched");function Le(e,t){if(typeof e=="string"){const o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return Fd(a),a}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Fd(r),r}function YA(e,t=XA(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Bi])return ()=>{};e[Bi]=true;const a={ws:e,pageWindow:r,debug:o},i=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=KA(u.data),f=qA(p);i({kind:"message",raw:u.data,data:p,type:f});},c=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>i({kind:"open",event:u}),l=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[Bi];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Le(mt.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Le(mt.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Le(mt.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Le(mt.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Le(mt.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Le(mt.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Le(mt.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Le(mt.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Le(mt.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Le(mt.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Le(It.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Le(It.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Le(It.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Le(It.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Le(It.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Le(It.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Le(It.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Le(It.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});ne(R.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));ne(R.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));ne(R.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));ne(R.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));ne(R.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));ne(R.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));ne(R.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));ne(R.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));ne(R.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));ne(R.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));ne(R.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));ne(R.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));ne(R.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));ne(R.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));ne(R.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));ne(R.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));ne(R.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));ne(R.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));ne(R.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));ne(R.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));ne(R.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));ne(R.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));ne(R.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));ne(R.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));ne(R.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));ne(R.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));ne(R.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));ne(R.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));ne(R.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));ne(R.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));ne(R.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");ne(R.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));ne(R.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));ne(R.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));ne(R.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));ne(R.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));ne(R.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));ne(R.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));ne(R.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));ne(R.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));ne(R.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));ne(R.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));ne(R.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));ne(R.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));ne(R.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));ne(R.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));ne(R.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function JA(e={}){const t=e.pageWindow??L,n=e.pollMs??500,r=!!e.debug,o=[];o.push(_v(t,{debug:r})),o.push(VA({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null;const i=s=>{if(a){try{a();}catch{}a=null;}s&&(a=YA(s,e.handlers,{debug:r,pageWindow:t}));};return i(wa(t).ws),o.push(Op(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>wa(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(a){try{a();}catch{}a=null;}}}}let qo=null;function QA(e={}){return qo||(qo=JA(e),qo)}function ZA(e,t){const n=new MutationObserver(o=>{for(const a of o)for(const i of a.addedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const s=i.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function eT(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const a of o.removedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const i=a.querySelectorAll(e);for(const s of i)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const Ig=768,Nd=6,Gi=62,zi=50,tT=.5,nT=.4,Ko=36,Yo=28,rT=6,Ts=4,oT=8,aT=100,iT=200,$d=14,Dd=3,sT=40,lT=50,Bd=2147483646,vr="gemini-bulk-favorite-sidebar",cT="gemini-bulk-favorite-top-row",dT="gemini-bulk-favorite-bottom-row",Ps="gemini-qol-bulkFavorite-styles",uT=`
/* Desktop: vertical scrollable list next to inventory */
#${vr} {
  display: flex;
  flex-direction: column;
  gap: ${rT}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Bd};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${Ts}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Bd};
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

#${vr}::-webkit-scrollbar {
  width: 4px;
}

#${vr}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${vr}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${Gi}px;
  height: ${Gi}px;
  min-width: ${Gi}px;
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
  width: ${zi}px;
  height: ${zi}px;
  min-width: ${zi}px;
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
  width: ${Ko}px;
  height: ${Ko}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${Yo}px;
  height: ${Yo}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Dd}px;
  right: ${Dd}px;
  width: ${$d}px;
  height: ${$d}px;
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
  width: ${Ko}px;
  height: ${Ko}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${Yo}px;
  height: ${Yo}px;
  font-size: 14px;
}
`,pT='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',fT='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function gT(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:a}=e,i=h("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return i.dataset.species=t,i.appendChild(mT(t,o)),i.appendChild(hT(r)),i.appendChild(bT(t)),i.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),a();}),i}function mT(e,t){try{if(!z.isReady()||!z.has("plant",e))return Gd(e);const n=t?nT:tT,r=z.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Gd(e)}}function Gd(e){return h("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function hT(e){const t=h("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?pT:fT,t}function bT(e){return h("span",{className:"gemini-qol-bulkFavorite-label"},e)}let yt=null,vt=null,xt=null,da=false,Rr=null,wr=false,Nn=null;const Is=[];function Jo(e){Is.push(e);}function xT(){for(const e of Is)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}Is.length=0;}function Eg(){return window.innerWidth<=Ig}function yT(e){return new Promise(t=>setTimeout(t,e))}function Mg(){if(da)return;if(document.getElementById(Ps)){da=true;return}const e=document.createElement("style");e.id=Ps,e.textContent=uT,document.head.appendChild(e),da=true;}function vT(){document.getElementById(Ps)?.remove(),da=false;}function wT(){const e=mn().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const a=o;if(a.itemType!=="Produce")continue;const i=a.species,s=a.id;if(!i||!s)continue;const c=n.get(i);c?c.push(s):n.set(i,[s]);}const r=[];for(const[o,a]of n){const i=a.length>0&&a.every(s=>t.has(s));r.push({species:o,itemIds:a,allFavorited:i});}return r.sort((o,a)=>o.species.localeCompare(a.species)),r}async function ST(e){const t=mn().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const i of t.items){const s=i;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(i=>i.favorited),a=o?r.filter(i=>i.favorited):r.filter(i=>!i.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${a.length}/${r.length} ${e}`);for(const i of a)za(i.id),await yT(sT);}function Es(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return gT({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>ST(n)})}function CT(e){const t=h("div",{id:vr}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-aT,iT);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+oT}px`,t.style.top=`${n.top}px`,t}function zd(e,t,n){const r=h("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+Ts}px`:r.style.top=`${o.bottom+Ts}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function Hd(){const e=wT();Eg()?_T(e):kT(e);}function kT(e){if(yt){if(yt.innerHTML="",e.length===0){yt.style.display="none";return}yt.style.display="flex";for(const t of e)yt.appendChild(Es(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function _T(e){if(!vt||!xt)return;if(vt.innerHTML="",xt.innerHTML="",e.length===0){vt.style.display="none",xt.style.display="none";return}vt.style.display="flex";const t=e.slice(0,Nd),n=e.slice(Nd);for(const r of t)vt.appendChild(Es(r,true));if(n.length>0){xt.style.display="flex";for(const r of n)xt.appendChild(Es(r,true));}else xt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function AT(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=Ig)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,a=0;const i=e.querySelectorAll(".McFlex, .McGrid");for(const s of i){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const d=c.left+c.width/2,l=1-Math.abs(d-r)/r,p=c.width*c.height*l;p>a&&(o=s,a=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let $n=null;function Ms(){$n&&clearTimeout($n),$n=setTimeout(()=>{TT();},lT);}function TT(){const e=AT();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),Or(),Mg(),Rr=e,Eg()?(vt=zd(cT,e,"top"),xt=zd(dT,e,"bottom"),document.body.appendChild(vt),document.body.appendChild(xt)):(yt=CT(e),document.body.appendChild(yt)),Hd(),Nn&&Nn(),Nn=mn().subscribeFavorites(()=>{wr&&Hd();});}function Or(){$n&&(clearTimeout($n),$n=null),Nn&&(Nn(),Nn=null),yt?.remove(),yt=null,vt?.remove(),vt=null,xt?.remove(),xt=null,Rr=null;}function PT(){Or();}async function Ls(){if(!lo().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}Mg();const t=await Qs.onChangeNow(o=>{const a=o==="inventory";a!==wr&&(wr=a,a?Ms():Or());}),n=ZA(".McGrid",()=>{wr&&(yt||vt||Ms());}),r=eT(".McGrid",o=>{Rr&&Rr===o&&Or();});Jo(()=>t()),Jo(()=>n.disconnect()),Jo(()=>r.disconnect()),Jo(()=>{Or(),wr=false,Rr=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function Rs(){xT(),vT(),console.log("🛑 [BulkFavorite] Stopped");}function IT(e){const t=lo();t.enabled=e,e?Ls():Rs();}let Qo=false;const ET={init(){Qo||(Ls(),Qo=true);},destroy(){Qo&&(Rs(),Qo=false);},isEnabled(){return mf()},renderButton:Ms,removeButton:PT,startWatching:Ls,stopWatching:Rs,setEnabled:IT};function MT(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Op(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),QA({debug:false}),()=>{t?.(),t=null;}}async function LT(e){e.logStep("Atoms","Prewarming Jotai store...");try{await qu(),await La({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function RT(e){e.logStep("Globals","Initializing global variables...");try{ef(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function OT(e){e.logStep("API","Exposing Gemini API...");try{nA(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Hi(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function FT(e){e.logStep("HUD","Loading HUD preferences..."),await Hi();const t=BA();await Hi();const n=await DA({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Xo("width",r),onOpenChange:r=>Xo("isOpen",r),themes:Cr,initialTheme:t.theme,onThemeChange:r=>Xo("theme",r),buildSections:r=>sA({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Xo("activeTab",r)});return await Hi(),e.logStep("HUD","HUD ready","success"),n}async function NT(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Xp(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function $T(e){try{z.isReady()||await z.init(),X.resolveSprites();const t=[],n=X.get("plants");if(n)for(const c of Object.values(n))c?.seed?.spriteId&&t.push(c.seed.spriteId),c?.plant?.spriteId&&t.push(c.plant.spriteId),c?.crop?.spriteId&&t.push(c.crop.spriteId);const r=X.get("pets");if(r)for(const c of Object.values(r))c?.spriteId&&t.push(c.spriteId);const o=X.get("items");if(o)for(const c of Object.values(o))c?.spriteId&&t.push(c.spriteId);const a=X.get("eggs");if(a)for(const c of Object.values(a))c?.spriteId&&t.push(c.spriteId);const i=X.get("decor");if(i)for(const c of Object.values(i))c?.spriteId&&t.push(c.spriteId);const s=[...new Set(t)];s.length>0&&await z.warmup(s,()=>{},5);}catch(t){console.warn("[Bootstrap] Sprite warmup failed",t);}}async function DT(e){e.logStep("Sections","Preloading UI sections...");try{await lA(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function BT(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:sn.init.bind(sn)},{name:"PetTeam",init:ae.init.bind(ae)},{name:"BulkFavorite",init:Ca.init.bind(Ca)},{name:"XPTracker",init:_a.init.bind(_a)},{name:"CropValueIndicator",init:Mr.init.bind(Mr)},{name:"CropSizeIndicator",init:Lr.init.bind(Lr)},{name:"ShopNotifier",init:un.init.bind(un)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const r=eu();r.register({id:"bulkFavoriteInject",name:"Bulk Favorite Inject",description:"Quick favorite/unfavorite multiple mutations",injection:ET,storageKey:Se.BULK_FAVORITE,defaultEnabled:!1}),r.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:Mr.render,storageKey:Se.CROP_VALUE_INDICATOR,defaultEnabled:!1}),r.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:Lr.render,storageKey:Se.CROP_SIZE_INDICATOR,defaultEnabled:!1}),r.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(r){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",r);}}fu();Ux();(async function(){Qg();const e=Hg({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=MT(e),await LT(e),RT(e),OT(e),await NT(e),await Promise.all([(async()=>{BT(e);})(),(async()=>{await $T(e);})()]),await DT(e),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await FT(e);HA({onClick:()=>n.setOpen(true)});})();

})();