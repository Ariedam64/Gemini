// ==UserScript==
// @name         Gemini
// @namespace    Gemini
// @version      1.0.2
// @author
// @match        https://1227719606223765687.discordsays.com/*
// @match        https://magiccircle.gg/r/*
// @match        https://magicgarden.gg/r/*
// @match        https://starweaver.org/r/*
// @resource     ICON  https://imgur.com/a/nf1ZKbp
// @connect      i.imgur.com
// @connect      magicgarden.gg
// @connect      mg-api.ariedam.fr
// @connect      raw.githubusercontent.com
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
  var Vv=Object.defineProperty;var Kv=(e,t,n)=>t in e?Vv(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var we=(e,t,n)=>Kv(e,typeof t!="symbol"?t+"":t,n);function x(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const ma="https://i.imgur.com/k5WuC32.png",bp="gemini-loader-style",Er="gemini-loader",Zf=80;function Yv(){if(document.getElementById(bp))return;const e=document.createElement("style");e.id=bp,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Er} {
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
    #${Er} {
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

    #${Er}.gemini-loader--error .gemini-loader__actions {
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
    #${Er}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Er}.gemini-loader--error .gemini-loader__spinner {
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
      #${Er} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function ga(e,t,n){const r=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Zf;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function qv(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(ma);return}GM_xmlhttpRequest({method:"GET",url:ma,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(ma),r.readAsDataURL(n);},onerror:()=>e(ma)});})}function Xv(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Yv();const n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=x("div",{className:"gemini-loader__logs"}),o=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=x("div",{className:"gemini-loader__spinner"},o);qv().then(_=>{o.src=_;});const a=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},i,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),l=x("div",{id:Er},a);(document.body||document.documentElement).appendChild(l);const d=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>l.remove()}));a.appendChild(d),l.style.setProperty("--loader-blur",`${t}px`);const f=_=>{n.textContent=_;},p=new Map,h=(_,I)=>{_.className=`gemini-loader__log ${I}`;};return {log:(_,I="info")=>ga(r,_,I),logStep:(_,I,T="info")=>{const L=String(_||"").trim();if(!L){ga(r,I,T);return}const F=p.get(L);if(F){F.el.lastElementChild&&(F.el.lastElementChild.textContent=I),F.tone!==T&&(h(F.el,T),F.tone=T);return}const $=x("div",{className:`gemini-loader__log ${T}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:I}));for(p.set(L,{el:$,tone:T}),r.appendChild($);r.childElementCount>Zf;){const R=r.firstElementChild;if(!R)break;const N=Array.from(p.entries()).find(([,M])=>M.el===R)?.[0];N&&p.delete(N),R.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:f,succeed:(_,I=600)=>{_&&ga(r,_,"success"),l.classList.add("gemini-loader--closing"),setTimeout(()=>l.remove(),I);},fail:(_,I)=>{ga(r,_,"error"),f("Something went wrong. Check the console for details."),l.classList.add("gemini-loader--error"),console.error("[Gemini loader]",_,I);}}}const vp=150,Jv=30;function eh(e,t,n){const r=x("div",{className:"lg-pill",id:"pill"}),o=e.map(C=>{const E=x("button",{className:"lg-tab"},C.label);return E.setAttribute("data-target",C.id),E}),i=x("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=new Map(e.map(C=>[C.id,true])),l=new Map(o.map((C,E)=>[e[E].id,C]));function d(C){const E=document.createElementNS("http://www.w3.org/2000/svg","svg");E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.setAttribute("stroke","currentColor"),E.setAttribute("stroke-width","2"),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round");const B=document.createElementNS("http://www.w3.org/2000/svg","polyline");return B.setAttribute("points",C==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),E.appendChild(B),E}const f=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});f.appendChild(d("left"));const p=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});p.appendChild(d("right"));const g=x("div",{className:"lg-tabs-wrapper"},f,i,p);let y=0,b=0,S=false;function _(){const C=i.scrollLeft>0,E=i.scrollLeft<i.scrollWidth-i.clientWidth-1;f.classList.toggle("disabled",!C),p.classList.toggle("disabled",!E);}f.addEventListener("click",()=>{i.scrollBy({left:-vp,behavior:"smooth"}),setTimeout(_,300);}),p.addEventListener("click",()=>{i.scrollBy({left:vp,behavior:"smooth"}),setTimeout(_,300);}),i.addEventListener("wheel",C=>{Math.abs(C.deltaY)>Math.abs(C.deltaX)&&(C.preventDefault(),i.scrollLeft+=C.deltaY,_());},{passive:false});let I=0;i.addEventListener("touchstart",C=>{const E=C.touches[0];y=E.clientX,b=E.clientY,S=false,I=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",C=>{if(S)return;const E=C.touches[0],B=E.clientX-y,G=E.clientY-b;if(Math.abs(G)>Math.abs(B)){S=true;return}Math.abs(B)>Jv&&(C.preventDefault(),i.scrollLeft=I-B);},{passive:false}),i.addEventListener("touchend",()=>{_();},{passive:true}),i.addEventListener("scroll",_,{passive:true});function T(C){const E=o.find(B=>B.dataset.target===C)||o[0];E&&requestAnimationFrame(()=>{const B=E.offsetLeft,G=E.offsetWidth;r.style.width=`${G}px`,r.style.transform=`translateX(${B}px)`;const K=i.scrollLeft,D=K,Z=K+i.clientWidth,W=B-12,te=B+G+12;W<D?i.scrollTo({left:W,behavior:"smooth"}):te>Z&&i.scrollTo({left:te-i.clientWidth,behavior:"smooth"}),setTimeout(_,300);});}function L(){for(const[C,E]of a)if(E)return C;return null}function F(C){const E=l.get(C);if(E)if(a.set(C,false),E.style.display="none",N===C){const B=L();B&&M(B);}else R();}function $(C){const E=l.get(C);E&&(a.set(C,true),E.style.display="",R());}function R(){T(N),_();}let N=t||(e[0]?.id??"");function M(C){a.get(C)&&(N=C,o.forEach(E=>E.classList.toggle("active",E.dataset.target===C)),T(C),n(C));}return o.forEach(C=>C.addEventListener("click",()=>M(C.dataset.target))),queueMicrotask(()=>{T(N),_();}),{root:g,activate:M,recalc:R,getActive:()=>N,showTab:$,hideTab:F,isTabVisible:C=>a.get(C)??false,getVisibleTabs:()=>[...a.entries()].filter(([C,E])=>E).map(([C])=>C)}}class hr{constructor(t){we(this,"id");we(this,"label");we(this,"container",null);we(this,"cleanupFunctions",[]);we(this,"preloadedContent",null);we(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=x("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Qv{constructor(t,n,r){we(this,"sections");we(this,"activeId",null);we(this,"container");we(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const Zr="gemini:",Zv={STATE:"hud:state",THEME:"hud:theme"},ey={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},ty={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},ny={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},_t={ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config",HARVEST_LOCKER:"feature:harvestLocker:config",EGG_LOCKER:"feature:eggLocker:config",DECOR_LOCKER:"feature:decorLocker:config"},ry={},th={AUTO_RELOAD:"dev:auto-reload"},Bt={HUD:Zv,SECTION:ey,MODULE:ty,GLOBAL:ny,FEATURE:_t,INJECT:ry,DEV:th},gt={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change",HARVEST_LOCKER_LOCKS_UPDATED:"gemini:harvestLocker-locks-updated",EGG_LOCKER_LOCKS_UPDATED:"gemini:eggLocker-locks-updated",DECOR_LOCKER_LOCKS_UPDATED:"gemini:decorLocker-locks-updated"};function it(e,t){try{const n=e.startsWith(Zr)?e:Zr+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function ct(e,t){try{const n=e.startsWith(Zr)?e:Zr+e,r=e.startsWith(Zr)?e.slice(Zr.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function oy(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),l=o.slice(e.length);ct(l,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(ct("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const nh="gemini.sections";function rh(){const e=it(nh,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function iy(e){ct(nh,e);}async function ay(e){return rh()[e]}function sy(e,t){const n=rh();iy({...n,[e]:t});}function bo(e,t){return {...e,...t??{}}}async function ly(e){const t=await ay(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((f=>JSON.parse(JSON.stringify(f)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){sy(e.path,n);}function i(){return n}function a(f){n=e.sanitize?e.sanitize(f):f,o();}function l(f){const h=Object.assign((g=>JSON.parse(JSON.stringify(g)))(n),{});typeof f=="function"?f(h):Object.assign(h,f),n=e.sanitize?e.sanitize(h):h,o();}function d(){o();}return {get:i,set:a,update:l,save:d}}async function To(e,t){const{path:n=e,...r}=t;return ly({path:n,...r})}let cy=0;const ba=new Map;function lt(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:l=false,defaultExpanded:d=true,onExpandChange:f,mediaTop:p,title:h,subtitle:g,badge:y,actions:b,footer:S,divider:_=false,tone:I="neutral",stateKey:T}=e,L=x("div",{className:"card",id:n,tabIndex:a?0:void 0});L.classList.add(`card--${o}`,`card--p-${i}`),a&&L.classList.add("card--interactive"),I!=="neutral"&&L.classList.add(`card--tone-${I}`),r&&L.classList.add(...r.split(" ").filter(Boolean)),l&&L.classList.add("card--expandable");const F=l?T??n??(typeof h=="string"?`title:${h}`:null):null;let $=!l||d;F&&ba.has(F)&&($=!!ba.get(F));let R=null,N=null,M=null,C=null,E=null;const B=n?`${n}-collapse`:`card-collapse-${++cy}`,G=()=>{if(C!==null&&(cancelAnimationFrame(C),C=null),E){const re=E;E=null,re();}},K=(re,ne)=>{if(!M)return;G();const oe=M;if(oe.setAttribute("aria-hidden",String(!re)),!ne){oe.classList.remove("card-collapse--animating"),oe.style.display=re?"":"none",oe.style.height="",oe.style.opacity="";return}if(oe.classList.add("card-collapse--animating"),oe.style.display="",re){oe.style.height="auto";const j=oe.scrollHeight;if(!j){oe.classList.remove("card-collapse--animating"),oe.style.display="",oe.style.height="",oe.style.opacity="";return}oe.style.height="0px",oe.style.opacity="0",oe.offsetHeight,C=requestAnimationFrame(()=>{C=null,oe.style.height=`${j}px`,oe.style.opacity="1";});}else {const j=oe.scrollHeight;if(!j){oe.classList.remove("card-collapse--animating"),oe.style.display="none",oe.style.height="",oe.style.opacity="";return}oe.style.height=`${j}px`,oe.style.opacity="1",oe.offsetHeight,C=requestAnimationFrame(()=>{C=null,oe.style.height="0px",oe.style.opacity="0";});}const V=()=>{oe.classList.remove("card-collapse--animating"),oe.style.height="",re||(oe.style.display="none"),oe.style.opacity="";};let Q=null;const O=j=>{j.target===oe&&(Q!==null&&(clearTimeout(Q),Q=null),oe.removeEventListener("transitionend",O),oe.removeEventListener("transitioncancel",O),E=null,V());};E=()=>{Q!==null&&(clearTimeout(Q),Q=null),oe.removeEventListener("transitionend",O),oe.removeEventListener("transitioncancel",O),E=null,V();},oe.addEventListener("transitionend",O),oe.addEventListener("transitioncancel",O),Q=window.setTimeout(()=>{E?.();},420);};function D(re){const ne=document.createElementNS("http://www.w3.org/2000/svg","svg");return ne.setAttribute("viewBox","0 0 24 24"),ne.setAttribute("width","16"),ne.setAttribute("height","16"),ne.innerHTML=re==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',ne}function Z(re,ne=true,oe=true){$=re,L.classList.toggle("card--collapsed",!$),L.classList.toggle("card--expanded",$),R&&(R.dataset.expanded=String($),R.setAttribute("aria-expanded",String($))),N&&(N.setAttribute("aria-expanded",String($)),N.classList.toggle("card-toggle--collapsed",!$),N.setAttribute("aria-label",$?"Replier le contenu":"Deplier le contenu"),N.replaceChildren(D($?"up":"down"))),l?K($,oe):M&&(M.style.display="",M.style.height="",M.style.opacity="",M.setAttribute("aria-hidden","false")),ne&&f&&f($),F&&ba.set(F,$);}if(p){const re=x("div",{className:"card-media"});re.append(p),L.appendChild(re);}const W=!!(h||g||y||b&&b.length||l);if(W){R=x("div",{className:"card-header"});const re=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(h){const V=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},h);y&&V.append(typeof y=="string"?x("span",{className:"badge"},y):y),re.appendChild(V);}if(g){const V=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},g);re.appendChild(V);}(re.childNodes.length||l)&&R.appendChild(re);const ne=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),oe=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});b?.forEach(V=>oe.appendChild(V)),oe.childNodes.length&&ne.appendChild(oe),l&&(N=x("button",{className:"card-toggle",type:"button",ariaExpanded:String($),ariaControls:B,ariaLabel:$?"Replier le contenu":"Deplier le contenu"}),N.textContent=$?"▲":"▼",N.addEventListener("click",V=>{V.preventDefault(),V.stopPropagation(),Z(!$);}),ne.appendChild(N),R.classList.add("card-header--expandable"),R.addEventListener("click",V=>{const Q=V.target;Q?.closest(".card-actions")||Q?.closest(".card-toggle")||Z(!$);})),ne.childNodes.length&&R.appendChild(ne),L.appendChild(R);}M=x("div",{className:"card-collapse",id:B,ariaHidden:l?String(!$):"false"}),L.appendChild(M),_&&W&&M.appendChild(x("div",{className:"card-divider"}));const te=x("div",{className:"card-body"});if(te.append(...t),M.appendChild(te),S){_&&M.appendChild(x("div",{className:"card-divider"}));const re=x("div",{className:"card-footer"});re.append(S),M.appendChild(re);}return N&&N.setAttribute("aria-controls",B),Z($,false,false),F&&ba.set(F,$),L}let fs=false;const hs=new Set,ln=e=>{const t=document.activeElement;for(const n of hs)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function dy(){fs||(fs=true,window.addEventListener("keydown",ln,true),window.addEventListener("keypress",ln,true),window.addEventListener("keyup",ln,true),document.addEventListener("keydown",ln,true),document.addEventListener("keypress",ln,true),document.addEventListener("keyup",ln,true));}function uy(){fs&&(hs.size>0||(fs=false,window.removeEventListener("keydown",ln,true),window.removeEventListener("keypress",ln,true),window.removeEventListener("keyup",ln,true),document.removeEventListener("keydown",ln,true),document.removeEventListener("keypress",ln,true),document.removeEventListener("keyup",ln,true)));}let _r=null;const kc=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),_r!==null&&(window.clearTimeout(_r),_r=null),document.removeEventListener("click",kc,true);};function py(){document.addEventListener("click",kc,true),_r!==null&&window.clearTimeout(_r),_r=window.setTimeout(()=>{document.removeEventListener("click",kc,true),_r=null;},500);}function Bn(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:l=true,onChange:d,onOpenChange:f}=e,p=x("div",{className:"select",id:t}),h=x("button",{className:"select-trigger",type:"button"}),g=x("span",{className:"select-value"},o),y=x("span",{className:"select-caret"},"▾");h.append(g,y);const b=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});p.classList.add(`select--${i}`);let S=false,_=n,I=null,T=!!a;function L(V){return V==null?o:(e.options||r).find(O=>O.value===V)?.label??o}function F(V){g.textContent=L(V),b.querySelectorAll(".select-option").forEach(Q=>{const O=Q.dataset.value,j=V!=null&&O===V;Q.classList.toggle("selected",j),Q.setAttribute("aria-selected",String(j));});}function $(V){b.replaceChildren(),V.forEach(Q=>{const O=x("button",{className:"select-option"+(Q.disabled?" disabled":""),type:"button",role:"option","data-value":Q.value,"aria-selected":String(Q.value===_),tabindex:"-1"},Q.label);Q.value===_&&O.classList.add("selected"),Q.disabled||O.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),j.pointerType&&j.pointerType!=="mouse"&&py(),B(Q.value,{notify:true}),C();},{capture:true}),b.appendChild(O);});}function R(){h.setAttribute("aria-expanded",String(S)),b.setAttribute("aria-hidden",String(!S));}function N(){const V=h.getBoundingClientRect();Object.assign(b.style,{minWidth:`${V.width}px`});}function M(){S||T||(S=true,p.classList.add("open"),R(),N(),document.addEventListener("mousedown",W,true),document.addEventListener("scroll",te,true),window.addEventListener("resize",re),b.focus({preventScroll:true}),l&&(dy(),hs.add(p),I=()=>{hs.delete(p),uy();}),f?.(true));}function C(){S&&(S=false,p.classList.remove("open"),R(),document.removeEventListener("mousedown",W,true),document.removeEventListener("scroll",te,true),window.removeEventListener("resize",re),h.focus({preventScroll:true}),I?.(),I=null,f?.(false));}function E(){S?C():M();}function B(V,Q={}){const O=_;_=V,F(_),Q.notify!==false&&O!==V&&d?.(V);}function G(){return _}function K(V){const Q=Array.from(b.querySelectorAll(".select-option:not(.disabled)"));if(!Q.length)return;const O=Q.findIndex(X=>X.classList.contains("active")),j=Q[(O+(V===1?1:Q.length-1))%Q.length];Q.forEach(X=>X.classList.remove("active")),j.classList.add("active"),j.focus({preventScroll:true}),j.scrollIntoView({block:"nearest"});}function D(V){(V.key===" "||V.key==="Enter"||V.key==="ArrowDown")&&(V.preventDefault(),M());}function Z(V){if(V.key==="Escape"){V.preventDefault(),C();return}if(V.key==="Enter"||V.key===" "){const Q=b.querySelector(".select-option.active")||b.querySelector(".select-option.selected");Q&&!Q.classList.contains("disabled")&&(V.preventDefault(),B(Q.dataset.value,{notify:true}),C());return}if(V.key==="ArrowDown"){V.preventDefault(),K(1);return}if(V.key==="ArrowUp"){V.preventDefault(),K(-1);return}}function W(V){p.contains(V.target)||C();}function te(){S&&N();}function re(){S&&N();}function ne(V){T=!!V,h.disabled=T,p.classList.toggle("disabled",T),T&&C();}function oe(V){e.options=V,$(V),V.some(Q=>Q.value===_)||(_=null,F(null));}return p.append(h,b),h.addEventListener("pointerdown",V=>{V.preventDefault(),V.stopPropagation(),E();},{capture:true}),h.addEventListener("keydown",D),b.addEventListener("keydown",Z),$(r),n!=null?(_=n,F(_)):F(null),R(),ne(T),{root:p,open:M,close:C,toggle:E,getValue:G,setValue:B,setOptions:oe,setDisabled:ne,destroy(){document.removeEventListener("mousedown",W,true),document.removeEventListener("scroll",te,true),window.removeEventListener("resize",re),I?.(),I=null;}}}function xd(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:l="text",required:d=false,disabled:f=false,tooltip:p,hint:h,icon:g,suffix:y,onClick:b}=e,S=x("div",{className:"lg-label-wrap",id:t}),_=x("label",{className:"lg-label",...r?{htmlFor:r}:{},...p?{title:p}:{}});if(g){const B=typeof g=="string"?x("span",{className:"lg-label-ico"},g):g;B.classList?.add?.("lg-label-ico"),_.appendChild(B);}const I=x("span",{className:"lg-label-text"},n);_.appendChild(I);const T=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");d&&_.appendChild(T);let L=null;if(y!=null){L=typeof y=="string"?document.createTextNode(y):y;const B=x("span",{className:"lg-label-suffix"});B.appendChild(L),_.appendChild(B);}const F=h?x("div",{className:"lg-label-hint"},h):null;S.classList.add(`lg-label--${a}`),S.classList.add(`lg-label--${i}`),l==="title"&&S.classList.add("lg-label--title"),$(o),f&&S.classList.add("is-disabled"),S.appendChild(_),F&&S.appendChild(F),b&&_.addEventListener("click",b);function $(B){S.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),S.classList.add(`lg-label--${B}`);}function R(B){I.textContent=B;}function N(B){$(B);}function M(B){B&&!T.isConnected&&_.appendChild(T),!B&&T.isConnected&&T.remove(),B?_.setAttribute("aria-required","true"):_.removeAttribute("aria-required");}function C(B){S.classList.toggle("is-disabled",!!B);}function E(B){!B&&F&&F.isConnected?F.remove():B&&F?F.textContent=B:B&&!F&&S.appendChild(x("div",{className:"lg-label-hint"},B));}return {root:S,labelEl:_,hintEl:F,setText:R,setTone:N,setRequired:M,setDisabled:C,setHint:E}}function ri(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function va(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=ri(e);return r&&n.appendChild(r),n}function fy(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function st(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:l=false,tooltip:d,type:f="button",onClick:p,disabled:h=false,fullWidth:g=false}=e,y=x("button",{className:"btn",id:n});y.type=f,r==="primary"&&y.classList.add("primary"),r==="danger"&&y.classList.add("danger"),o==="sm"&&y.classList.add("btn--sm"),d&&(y.title=d),g&&(y.style.width="100%");const b=fy(),S=i?va(i,"left"):null,_=a?va(a,"right"):null,I=document.createElement("span");I.className="btn-label";const T=ri(t);T&&I.appendChild(T),!T&&(S||_)&&y.classList.add("btn--icon"),y.appendChild(b),S&&y.appendChild(S),y.appendChild(I),_&&y.appendChild(_);const L=h||l;y.disabled=L,y.setAttribute("aria-busy",String(!!l)),b.style.display=l?"inline-block":"none",p&&y.addEventListener("click",p);const F=y;return F.setLoading=$=>{y.setAttribute("aria-busy",String(!!$)),b.style.display=$?"inline-block":"none",y.disabled=$||h;},F.setDisabled=$=>{y.disabled=$||y.getAttribute("aria-busy")==="true";},F.setLabel=$=>{I.replaceChildren();const R=ri($);R&&I.appendChild(R),!R&&(S||_)?y.classList.add("btn--icon"):y.classList.remove("btn--icon");},F.setIconLeft=$=>{if($==null){S?.remove();return}S?S.replaceChildren(ri($)):y.insertBefore(va($,"left"),I);},F.setIconRight=$=>{if($==null){_?.remove();return}_?_.replaceChildren(ri($)):y.appendChild(va($,"right"));},F.setVariant=$=>{y.classList.remove("primary","danger"),$==="primary"&&y.classList.add("primary"),$==="danger"&&y.classList.add("danger");},F}function tr(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:l}=e,d=x("div",{className:"lg-switch-wrap"}),f=x("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),p=x("span",{className:"lg-switch-track"}),h=x("span",{className:"lg-switch-thumb"});f.append(p,h);let g=null;i&&a!=="none"&&(g=x("span",{className:"lg-switch-label"},i)),g&&a==="left"?d.append(g,f):g&&a==="right"?d.append(f,g):d.append(f);let y=!!n,b=!!r;function S(){f.classList.toggle("on",y),f.setAttribute("aria-checked",String(y)),f.disabled=b,f.setAttribute("aria-disabled",String(b));}function _(C=false){b||(y=!y,S(),C||l?.(y));}function I(C){C.preventDefault(),_();}function T(C){b||((C.key===" "||C.key==="Enter")&&(C.preventDefault(),_()),C.key==="ArrowLeft"&&(C.preventDefault(),F(false)),C.key==="ArrowRight"&&(C.preventDefault(),F(true)));}f.addEventListener("click",I),f.addEventListener("keydown",T);function L(){return y}function F(C,E=false){y=!!C,S(),E||l?.(y);}function $(C){b=!!C,S();}function R(C){if(!C){g&&(g.remove(),g=null);return}g?g.textContent=C:(g=x("span",{className:"lg-switch-label"},C),d.append(g));}function N(){f.focus();}function M(){f.removeEventListener("click",I),f.removeEventListener("keydown",T);}return S(),{root:d,button:f,isChecked:L,setChecked:F,setDisabled:$,setLabel:R,focus:N,destroy:M}}let oh=null,wd=null;function hy(){return oh}function my(e){oh=e,wd=null;}function ih(){return wd}function gy(e){wd=e;}function by(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function ah(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function sh(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function vy(){const e=hy();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function yy(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function lh(){try{return window.top!==window.self}catch{return  true}}function xy(){const e=lh(),t=yy(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Gs(){const e=ih();if(e)return e;const t=xy(),n=vy(),r=ah(),o=sh(),i=lh(),a=window.screen||{},l=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),f=Math.round(window.innerHeight||document.documentElement.clientHeight||0),p=Math.round(l?.width??d),h=Math.round(l?.height??f),g=Math.round(a.width||0),y=Math.round(a.height||0),b=Math.round(a.availWidth||g),S=Math.round(a.availHeight||y),_=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,I={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:d,viewportHeight:f,visualViewportWidth:p,visualViewportHeight:h,screenWidth:g,screenHeight:y,availScreenWidth:b,availScreenHeight:S,dpr:_,orientation:by()};return gy(I),I}function wy(){return Gs().surface==="discord"}function Cy(){return Gs().platform==="mobile"}function ky(){Gs();}function Sy(){return ih()!==null}const Ct={init:ky,isReady:Sy,detect:Gs,isDiscord:wy,isMobile:Cy,detectOS:ah,detectBrowser:sh,setPlatformOverride:my};let ms=false;const oi=new Set;function Ay(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const cn=e=>{const t=Ay();if(t){for(const n of oi)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ey(){ms||(ms=true,window.addEventListener("keydown",cn,true),window.addEventListener("keypress",cn,true),window.addEventListener("keyup",cn,true),document.addEventListener("keydown",cn,true),document.addEventListener("keypress",cn,true),document.addEventListener("keyup",cn,true));}function _y(){ms&&(ms=false,window.removeEventListener("keydown",cn,true),window.removeEventListener("keypress",cn,true),window.removeEventListener("keyup",cn,true),document.removeEventListener("keydown",cn,true),document.removeEventListener("keypress",cn,true),document.removeEventListener("keyup",cn,true));}function Iy(e){return oi.size===0&&Ey(),oi.add(e),()=>{oi.delete(e),oi.size===0&&_y();}}function Ty(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function Py(e,t){return t?e.replace(t,""):e}function Ly(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function pr(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:l=false,maxLength:d,blockGameKeys:f=true,debounceMs:p=0,onChange:h,onEnter:g,label:y}=e,b=x("div",{className:"lg-input-wrap"}),S=x("input",{className:"input",id:t,placeholder:n});if(typeof d=="number"&&d>0&&(S.maxLength=d),r&&(S.value=r),y){const B=x("div",{className:"lg-input-label"},y);b.appendChild(B);}b.appendChild(S);const _=Ty(o,i,a,l),I=()=>{const B=S.selectionStart??S.value.length,G=S.value.length,K=Py(S.value,_);if(K!==S.value){S.value=K;const D=G-K.length,Z=Math.max(0,B-D);S.setSelectionRange(Z,Z);}},T=Ly(()=>h?.(S.value),p);S.addEventListener("input",()=>{I(),T();}),S.addEventListener("paste",()=>queueMicrotask(()=>{I(),T();})),S.addEventListener("keydown",B=>{B.key==="Enter"&&g?.(S.value);});const L=f?Iy(S):()=>{};function F(){return S.value}function $(B){S.value=B??"",I(),T();}function R(){S.focus();}function N(){S.blur();}function M(B){S.disabled=!!B;}function C(){return document.activeElement===S}function E(){L();}return {root:b,input:S,getValue:F,setValue:$,focus:R,blur:N,setDisabled:M,isFocused:C,destroy:E}}function Lt(e,t,n){return Math.min(n,Math.max(t,e))}function fi({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let l=0,d=0,f=0;switch(Math.floor(o)){case 0:l=i,d=a;break;case 1:l=a,d=i;break;case 2:d=i,f=a;break;case 3:d=a,f=i;break;case 4:l=a,f=i;break;default:l=i,f=a;break}const h=n-i,g=Math.round((l+h)*255),y=Math.round((d+h)*255),b=Math.round((f+h)*255);return {r:Lt(g,0,255),g:Lt(y,0,255),b:Lt(b,0,255),a:Lt(r,0,1)}}function ch({r:e,g:t,b:n,a:r}){const o=Lt(e,0,255)/255,i=Lt(t,0,255)/255,a=Lt(n,0,255)/255,l=Math.max(o,i,a),d=Math.min(o,i,a),f=l-d;let p=0;f!==0&&(l===o?p=60*((i-a)/f%6):l===i?p=60*((a-o)/f+2):p=60*((o-i)/f+4)),p<0&&(p+=360);const h=l===0?0:f/l;return {h:p,s:h,v:l,a:Lt(r,0,1)}}function Cd({r:e,g:t,b:n}){const r=o=>Lt(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function My({r:e,g:t,b:n,a:r}){const o=Lt(Math.round(r*255),0,255);return `${Cd({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function ii({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function eo(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function Sc(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return eo(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(d=>d.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),l=r[3]!=null?Number(r[3]):1;return [o,i,a,l].some(d=>Number.isNaN(d))?null:{r:o,g:i,b:a,a:l}}return null}function Ry(e,t){const n=Sc(e)??eo(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Lt(t,0,1)),ch(n)}function Fy(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Oy(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function kr(e){const t=fi(e),n=fi({...e,a:1});return {hsva:{...e},hex:Cd(n),hexa:My(t),rgba:ii(t),alpha:e.a}}function Ny(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:l,onChange:d}=e,p=a?a():Ct.detect().platform==="mobile";let h=Ry(r,o);const g=lt({id:t,className:"color-picker",title:n,padding:p?"md":"lg",variant:"soft",expandable:!p,defaultExpanded:!p&&i});g.classList.add(p?"color-picker--mobile":"color-picker--desktop");const y=g.querySelector(".card-header");y&&y.classList.add("color-picker__header");const b=y?.querySelector(".card-title"),S=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});b?b.prepend(S):y?y.prepend(S):g.prepend(S);const _=g.querySelector(".card-toggle");!p&&_&&S.addEventListener("click",()=>{g.classList.contains("card--collapsed")&&_.click();});const I=g.querySelector(".card-collapse");let T=null,L=null,F=null,$=null,R=null,N=null,M=null,C=null,E=null,B="hex";function G(te){const re=kr(h);te==="input"?l?.(re):d?.(re);}function K(){const te=kr(h);if(S.style.setProperty("--cp-preview-color",te.rgba),S.setAttribute("aria-label",`${n}: ${te.hexa}`),!p&&T&&L&&F&&$&&R&&N&&M){const re=fi({...h,s:1,v:1,a:1}),ne=ii(re);T.style.setProperty("--cp-palette-hue",ne),L.style.left=`${h.s*100}%`,L.style.top=`${(1-h.v)*100}%`,F.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ii({...re,a:1})} 0%, ${ii({...re,a:0})} 100%)`),$.style.top=`${(1-h.a)*100}%`,R.style.setProperty("--cp-hue-color",ii(fi({...h,v:1,s:1,a:1}))),N.style.left=`${h.h/360*100}%`;const oe=h.a===1?te.hex:te.hexa,V=te.rgba,Q=B==="hex"?oe:V;M!==document.activeElement&&(M.value=Q),M.setAttribute("aria-label",`${B.toUpperCase()} code for ${n}`),M.placeholder=B==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",B==="hex"?M.maxLength=9:M.removeAttribute("maxLength"),M.dataset.mode=B,C&&(C.textContent=B.toUpperCase(),C.setAttribute("aria-label",B==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),C.setAttribute("aria-pressed",B==="rgba"?"true":"false"),C.classList.toggle("is-alt",B==="rgba"));}E&&E!==document.activeElement&&(E.value=te.hex);}function D(te,re=null){h={h:(te.h%360+360)%360,s:Lt(te.s,0,1),v:Lt(te.v,0,1),a:Lt(te.a,0,1)},K(),re&&G(re);}function Z(te,re=null){D(ch(te),re);}function W(te,re,ne){te.addEventListener("pointerdown",oe=>{oe.preventDefault();const V=oe.pointerId,Q=j=>{j.pointerId===V&&re(j);},O=j=>{j.pointerId===V&&(document.removeEventListener("pointermove",Q),document.removeEventListener("pointerup",O),document.removeEventListener("pointercancel",O),ne?.(j));};re(oe),document.addEventListener("pointermove",Q),document.addEventListener("pointerup",O),document.addEventListener("pointercancel",O);});}if(!p&&I){const te=I.querySelector(".card-body");if(te){te.classList.add("color-picker__body"),L=x("div",{className:"color-picker__palette-cursor"}),T=x("div",{className:"color-picker__palette"},L),$=x("div",{className:"color-picker__alpha-thumb"}),F=x("div",{className:"color-picker__alpha"},$),N=x("div",{className:"color-picker__hue-thumb"}),R=x("div",{className:"color-picker__hue"},N);const re=x("div",{className:"color-picker__main"},T,F),ne=x("div",{className:"color-picker__hue-row"},R),oe=pr({blockGameKeys:true});M=oe.input,M.classList.add("color-picker__hex-input"),M.value="",M.maxLength=9,M.spellcheck=false,M.inputMode="text",M.setAttribute("aria-label",`Hex code for ${n}`),C=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),oe.root.classList.add("color-picker__hex-wrap");const V=x("div",{className:"color-picker__hex-row"},C,oe.root);te.replaceChildren(re,ne,V),W(T,O=>{if(!T||!L)return;const j=T.getBoundingClientRect(),X=Lt((O.clientX-j.left)/j.width,0,1),de=Lt((O.clientY-j.top)/j.height,0,1);D({...h,s:X,v:1-de},"input");},()=>G("change")),W(F,O=>{if(!F)return;const j=F.getBoundingClientRect(),X=Lt((O.clientY-j.top)/j.height,0,1);D({...h,a:1-X},"input");},()=>G("change")),W(R,O=>{if(!R)return;const j=R.getBoundingClientRect(),X=Lt((O.clientX-j.left)/j.width,0,1);D({...h,h:X*360},"input");},()=>G("change")),C.addEventListener("click",()=>{if(B=B==="hex"?"rgba":"hex",M){const O=kr(h);M.value=B==="hex"?h.a===1?O.hex:O.hexa:O.rgba;}K(),M?.focus(),M?.select();}),M.addEventListener("input",()=>{if(B==="hex"){const O=Fy(M.value);if(O!==M.value){const j=M.selectionStart??O.length;M.value=O,M.setSelectionRange(j,j);}}});const Q=()=>{const O=M.value;if(B==="hex"){const j=eo(O);if(!j){M.value=h.a===1?kr(h).hex:kr(h).hexa;return}const X=O.startsWith("#")?O.slice(1):O,de=X.length===4||X.length===8;j.a=de?j.a:h.a,Z(j,"change");}else {const j=Oy(O),X=Sc(j);if(!X){M.value=kr(h).rgba;return}Z(X,"change");}};M.addEventListener("change",Q),M.addEventListener("blur",Q),M.addEventListener("keydown",O=>{O.key==="Enter"&&(Q(),M.blur());});}}return p&&(I&&I.remove(),E=x("input",{className:"color-picker__native",type:"color",value:Cd(fi({...h,a:1}))}),S.addEventListener("click",()=>E.click()),E.addEventListener("input",()=>{const te=eo(E.value);te&&(te.a=h.a,Z(te,"input"),G("change"));}),g.appendChild(E)),K(),{root:g,isMobile:p,getValue:()=>kr(h),setValue:(te,re)=>{const ne=Sc(te)??eo(te)??eo("#FFFFFF");ne&&(typeof re=="number"&&(ne.a=re),Z(ne,null));}}}const Dy=window;function $y(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Dy}const By=$y(),he=By;function zy(e){try{return !!e.isSecureContext}catch{return  false}}function kd(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function dh(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function jy(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Gy(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Uy(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Wy(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!zy(he))return {ok:false,method:"clipboard-write"};if(!await jy())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Hy(e,t){try{const n=t||kd(),r=Gy(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Vy(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=Uy(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=dh()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function Ky(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await Wy(n);if(r.ok)return r;const o=t.injectionRoot||kd(t.valueNode||void 0),i=Hy(n,o);if(i.ok)return i;const a=Vy(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Ct.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Yy(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=kd(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const l=e.getBoundingClientRect();i.style.left=`${l.right-8}px`,i.style.top=`${l.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await Ky(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(dh()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const io={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function qy(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,l=false;function d(p){const h=n[p]||n[i]||{};t.setAttribute("data-theme",p),l&&t.classList.add("theme-anim");for(const[g,y]of Object.entries(h))t.style.setProperty(g,y);l?(a!==null&&clearTimeout(a),a=he.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):l=true,i=p,o?.(p);}function f(){return i}return d(r),{applyTheme:d,getCurrentTheme:f}}const Ac={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,system:false}}};async function Xy(){const e=await To("tab-settings",{version:2,defaults:Ac,sanitize:o=>({ui:{expandedCards:bo(Ac.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:bo(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}class Jy{constructor(){we(this,"injections",new Map);we(this,"state",{});we(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(o){console.error(`[InjectionRegistry] Failed to init ${t}:`,o);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const r=this.injections.get(t);if(!r){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?r.injection.init():r.injection.destroy(),console.log(`[InjectionRegistry] ${r.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const r=it(n.storageKey,n.defaultEnabled??false);this.state[t]=r;}saveState(t){const n=this.injections.get(t);n&&ct(n.storageKey,this.state[t]);}}let Bl=null;function uh(){return Bl||(Bl=new Jy),Bl}function ph(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Qy(){return Object.keys(io).map(e=>({value:e,label:ph(e)}))}const Zy=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--accent-3"];function e0(e){return ph(e.replace(/^--/,""))}function t0(e){return e.alpha<1?e.rgba:e.hex}const Yn={pets:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class n0 extends hr{constructor(n){super({id:"tab-settings",label:"Settings"});we(this,"featureConfig",Yn);this.deps=n;}async build(n){const r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await Xy();}catch{o={get:()=>Ac,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get(),a=it(_t.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(a);const l=Object.keys(io),d=this.deps.getCurrentTheme?.()??this.deps.initialTheme,f=l.includes(d)?d:l[0]??"dark";let p=f;const h=xd({text:"Theme",tone:"muted",size:"lg"}),g=Bn({options:Qy(),value:f,onChange:T=>{p=T,this.deps.applyTheme(T),this.renderThemePickers(T,y,p);}}),y=x("div",{className:"settings-theme-grid"}),b=lt({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:T=>o.setCardExpanded("style",T)},x("div",{className:"kv settings-theme-row"},h.root,g.root),y);this.renderThemePickers(f,y,p);const S=this.createHUDSectionsCard({defaultExpanded:!!i.ui.expandedCards.hudSections,onExpandChange:T=>o.setCardExpanded("hudSections",T)}),_=this.createEnhancementsCard({defaultExpanded:!!i.ui.expandedCards.enhancements,onExpandChange:T=>o.setCardExpanded("enhancements",T)}),I=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:T=>o.setCardExpanded("system",T)});r.appendChild(b),r.appendChild(S),r.appendChild(_),r.appendChild(I);}mergeFeatureConfig(n){return {pets:{...Yn.pets,...n.pets},locker:{...Yn.locker,...n.locker},alerts:{...Yn.alerts,...n.alerts},avatar:{...Yn.avatar,...n.avatar},room:{...Yn.room,...n.room},cropSizeIndicator:{...Yn.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Yn.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Yn.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){ct(_t.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const r=(o,i,a,l,d=false,f=false)=>{const p=x("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${d?"0":"12px"} 0 ${f?"0":"12px"} 0;
          ${f?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${i?"1":"0.5"};
        `}),h=x("div"),g=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},o),y=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},l);h.append(g,y);const b=tr({checked:i,onChange:S=>{p.style.opacity=S?"1":"0.5",a(S);}});return p.append(h,b.root),p};return lt({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},r("Pets",this.featureConfig.pets.enabled,o=>{this.featureConfig.pets.enabled=o,this.saveFeatureConfig();},"Pet management and team tracking"),r("Locker",this.featureConfig.locker.enabled,o=>{this.featureConfig.locker.enabled=o,this.saveFeatureConfig();},"Configure crop, egg, and decor blockers"),r("Alerts",this.featureConfig.alerts.enabled,o=>{this.featureConfig.alerts.enabled=o,this.saveFeatureConfig();},"Event notifications and alerts"),r("Avatar",this.featureConfig.avatar.enabled,o=>{this.featureConfig.avatar.enabled=o,this.saveFeatureConfig();},"Avatar customization and loadouts"),r("Room",this.featureConfig.room.enabled,o=>{this.featureConfig.room.enabled=o,this.saveFeatureConfig();},"Public room browser",false,true)))}createSectionRow(n,r,o,i,a=false,l=false){const d=x("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${a?"0":"12px"} 0 ${l?"0":"12px"} 0;
        ${l?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${r?"1":"0.5"};
      `}),f=x("div"),p=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),h=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},i);f.append(p,h);const g=tr({checked:r,onChange:y=>{d.style.opacity=y?"1":"0.5",o(y);}});return d.append(f,g.root),d}createEnhancementsCard(n){const r=uh(),i=[...r.getAll()].sort((l,d)=>l.name.localeCompare(d.name)),a=i.map((l,d)=>{const f=d===0,p=d===i.length-1,h=r.isEnabled(l.id);return this.createSectionRow(l.name,h,g=>{r.setEnabled(l.id,g),this.saveFeatureConfig();},l.description,f,p)});return lt({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},...a))}renderThemePickers(n,r,o){const i=io[n];if(r.replaceChildren(),!!i)for(const a of Zy){const l=i[a];if(l==null)continue;const d=Ny({label:e0(a),value:l,defaultExpanded:false,onInput:f=>this.updateThemeVar(n,a,f,o),onChange:f=>this.updateThemeVar(n,a,f,o)});r.appendChild(d.root);}}updateThemeVar(n,r,o,i){const a=io[n];a&&(a[r]=t0(o),i===n&&this.deps.applyTheme(n));}createEnvCard(n){const r=n?.defaultExpanded??false,o=n?.onExpandChange,i=(I,T)=>{const L=x("div",{className:"kv kv--inline-mobile"}),F=x("label",{},I),$=x("div",{className:"ro"});return typeof T=="string"?$.textContent=T:$.append(T),L.append(F,$),L},a=x("code",{},"—"),l=x("span",{},"—"),d=x("span",{},"—"),f=x("span",{},"—"),p=x("span",{},"—"),h=x("span",{},"—"),g=()=>{const I=Ct.detect();d.textContent=I.surface??"Unknown",f.textContent=I.platform??"Unknown",p.textContent=I.browser??"Unknown",h.textContent=I.os??"Unknown",a.textContent=I.host??"Unknown",l.textContent=I.isInIframe?"Yes":"No";},y=st({label:"Copy JSON",variant:"primary",size:"sm"});Yy(y,()=>{const I=Ct.detect();return JSON.stringify(I,null,2)});const b=x("div",{style:"width:100%;display:flex;justify-content:center;"},y),S=lt({title:"System",variant:"soft",padding:"lg",footer:b,expandable:true,defaultExpanded:r,onExpandChange:o},i("Surface",d),i("Platform",f),i("Browser",p),i("OS",h),i("Host",a),i("Iframe",l)),_=()=>{document.hidden||g();};return document.addEventListener("visibilitychange",_),g(),this.addCleanup(()=>document.removeEventListener("visibilitychange",_)),S}}function Sd(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:l=true,respectReducedMotion:d=true,compact:f=false,maxHeight:p,selectable:h=false,selectionType:g="switch",selectOnRowClick:y=false,initialSelection:b=[],hideHeaderCheckbox:S=false,getRowId:_=(u,m)=>String(m),onSortChange:I,onSelectionChange:T,onRowClick:L}=e;let F=n.slice(),$=r.slice(),R=r.slice(),N=null,M=null,C=1;const E=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,B=!!l&&!(d&&E),G=x("div",{className:"lg-table-wrap",id:t});if(p!=null){const u=typeof p=="number"?`${p}px`:p;G.style.setProperty("--tbl-max-h",u);}const K=x("div",{className:"lg-table"}),D=x("div",{className:"lg-thead"}),Z=x("div",{className:"lg-tbody"}),W=x("div",{className:"lg-tfoot"});i&&G.classList.add("sticky"),a&&G.classList.add("zebra"),f&&G.classList.add("compact"),h&&G.classList.add("selectable");const te=g==="switch"?"52px":"36px";G.style.setProperty("--check-w",te);function re(u){return u==="center"?"center":u==="right"?"flex-end":"flex-start"}function ne(){const u=F.map(A=>{const U=(A.width||"1fr").trim();return /\bfr$/.test(U)?`minmax(0, ${U})`:U}),m=(h?[te,...u]:u).join(" ");G.style.setProperty("--lg-cols",m);}ne();function oe(){return o?Math.max(1,Math.ceil($.length/o)):1}function V(){if(!o)return $;const u=(C-1)*o;return $.slice(u,u+o)}function Q(){if(!N||!M)return;const u=F.find(U=>String(U.key)===N),m=M==="asc"?1:-1,A=u?.sortFn?(U,H)=>m*u.sortFn(U,H):(U,H)=>{const ee=U[N],ue=H[N];return ee==null&&ue==null?0:ee==null?-1*m:ue==null?1*m:typeof ee=="number"&&typeof ue=="number"?m*(ee-ue):m*String(ee).localeCompare(String(ue),void 0,{numeric:true,sensitivity:"base"})};$.sort(A);}const O=new Set(b);function j(){return Array.from(O)}const X=new Map;function de(u){O.clear(),u.forEach(m=>O.add(m)),ye(),X.forEach((m,A)=>{m.setChecked(O.has(A),true);}),De(),T?.(j());}function ce(){O.clear(),ye(),X.forEach(u=>u.setChecked(false,true)),De(),T?.(j());}let le=null;function ye(){if(!le)return;const u=V();if(!u.length){le.indeterminate=false,le.checked=false;return}const m=u.map((U,H)=>_(U,(C-1)*(o||0)+H)),A=m.reduce((U,H)=>U+(O.has(H)?1:0),0);le.checked=A===m.length,le.indeterminate=A>0&&A<m.length;}let Ie=false;function ut(){Ie=false;const u=Z.offsetWidth-Z.clientWidth;D.style.paddingRight=u>0?`${u}px`:"0px";}function ht(){Ie||(Ie=true,requestAnimationFrame(ut));}const pt=new ResizeObserver(()=>ht()),It=()=>ht();function Wt(){D.replaceChildren();const u=x("div",{className:"lg-tr lg-tr-head"});if(h){const m=x("div",{className:"lg-th lg-th-check"});S||(le=x("input",{type:"checkbox"}),le.addEventListener("change",()=>{const A=V(),U=le.checked;A.forEach((H,ee)=>{const ue=_(H,(C-1)*(o||0)+ee);U?O.add(ue):O.delete(ue);}),T?.(j()),De();}),m.appendChild(le)),u.appendChild(m);}F.forEach(m=>{const A=x("button",{className:"lg-th",type:"button",title:m.title||m.header});A.textContent=m.header,m.align&&A.style.setProperty("--col-justify",re(m.align)),m.sortable&&A.classList.add("sortable"),N===String(m.key)&&M?A.setAttribute("data-sort",M):A.removeAttribute("data-sort"),m.sortable&&A.addEventListener("click",()=>{const U=String(m.key);N!==U?(N=U,M="asc"):(M=M==="asc"?"desc":M==="desc"?null:"asc",M||(N=null,$=R.slice())),I?.(N,M),N&&M&&Q(),St();}),u.appendChild(A);}),D.appendChild(u);try{pt.disconnect();}catch{}pt.observe(Z),ht();}function Rt(u){return Array.from(u.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Ht(u){return u.querySelector(".lg-td, .lg-td-check")}function tt(u){const m=Ht(u);return m?m.getBoundingClientRect():null}function De(){const u=V(),m=new Map;Array.from(Z.children).forEach(ee=>{const ue=ee,xe=ue.getAttribute("data-id");if(!xe)return;const be=tt(ue);be&&m.set(xe,be);});const A=new Map;Array.from(Z.children).forEach(ee=>{const ue=ee,xe=ue.getAttribute("data-id");xe&&A.set(xe,ue);});const U=[];for(let ee=0;ee<u.length;ee++){const ue=u[ee],xe=(o?(C-1)*o:0)+ee,be=_(ue,xe);U.push(be);let Ce=A.get(be);Ce||(Ce=gn(ue,xe),B&&Rt(Ce).forEach(at=>{at.style.transform="translateY(6px)",at.style.opacity="0";})),Z.appendChild(Ce);}const H=[];if(A.forEach((ee,ue)=>{U.includes(ue)||H.push(ee);}),!B){H.forEach(ee=>ee.remove()),ye(),ht();return}U.forEach(ee=>{const ue=Z.querySelector(`.lg-tr-body[data-id="${ee}"]`);if(!ue)return;const xe=tt(ue),be=m.get(ee),Ce=Rt(ue);if(be&&xe){const Ke=be.left-xe.left,Tt=be.top-xe.top;Ce.forEach(vt=>{vt.style.transition="none",vt.style.transform=`translate(${Ke}px, ${Tt}px)`,vt.style.opacity="1";}),Ht(ue)?.getBoundingClientRect(),Ce.forEach(vt=>{vt.style.willChange="transform, opacity",vt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{Ce.forEach(vt=>{vt.style.transform="translate(0,0)";});});}else Ce.forEach(Ke=>{Ke.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{Ce.forEach(Ke=>{Ke.style.transform="translate(0,0)",Ke.style.opacity="1";});});const Qe=Ke=>{(Ke.propertyName==="transform"||Ke.propertyName==="opacity")&&(Ce.forEach(Tt=>{Tt.style.willChange="",Tt.style.transition="",Tt.style.transform="",Tt.style.opacity="";}),Ke.currentTarget.removeEventListener("transitionend",Qe));},at=Ce[0];at&&at.addEventListener("transitionend",Qe);}),H.forEach(ee=>{const ue=Rt(ee);ue.forEach(Ce=>{Ce.style.willChange="transform, opacity",Ce.style.transition="transform .18s ease, opacity .18s ease",Ce.style.opacity="0",Ce.style.transform="translateY(-6px)";});const xe=Ce=>{Ce.propertyName==="opacity"&&(Ce.currentTarget.removeEventListener("transitionend",xe),ee.remove());},be=ue[0];be?be.addEventListener("transitionend",xe):ee.remove();}),ye(),ht();}function gn(u,m){const A=_(u,m),U=x("div",{className:"lg-tr lg-tr-body","data-id":A});if(h){const H=x("div",{className:"lg-td lg-td-check"});if(g==="switch"){const ee=tr({size:"sm",checked:O.has(A),onChange:ue=>{ue?O.add(A):O.delete(A),ye(),T?.(j());}});X.set(A,ee),H.appendChild(ee.root);}else {const ee=x("input",{type:"checkbox",className:"lg-row-check"});ee.checked=O.has(A),ee.addEventListener("change",ue=>{ue.stopPropagation(),ee.checked?O.add(A):O.delete(A),ye(),T?.(j());}),ee.addEventListener("click",ue=>ue.stopPropagation()),H.appendChild(ee);}U.appendChild(H);}return F.forEach(H=>{const ee=x("div",{className:"lg-td"});H.align&&ee.style.setProperty("--col-justify",re(H.align));let ue=H.render?H.render(u,m):String(u[H.key]??"");typeof ue=="string"?ee.textContent=ue:ee.appendChild(ue),U.appendChild(ee);}),(L||h&&y)&&(U.classList.add("clickable"),U.addEventListener("click",H=>{if(!H.target.closest(".lg-td-check")){if(h&&y){const ee=!O.has(A);if(ee?O.add(A):O.delete(A),ye(),g==="switch"){const ue=X.get(A);ue&&ue.setChecked(ee,true);}else {const ue=U.querySelector(".lg-row-check");ue&&(ue.checked=ee);}T?.(j());}L?.(u,m,H);}})),U}function bn(){if(W.replaceChildren(),!o)return;const u=oe(),m=x("div",{className:"lg-pager"}),A=x("button",{className:"btn",type:"button"},"←"),U=x("button",{className:"btn",type:"button"},"→"),H=x("span",{className:"lg-pager-info"},`${C} / ${u}`);A.disabled=C<=1,U.disabled=C>=u,A.addEventListener("click",()=>mt(C-1)),U.addEventListener("click",()=>mt(C+1)),m.append(A,H,U),W.appendChild(m);}function mt(u){const m=oe();C=Math.min(Math.max(1,u),m),De(),bn();}function St(){ne(),Wt(),De(),bn();}function Vt(u){R=u.slice(),$=u.slice(),N&&M&&Q(),mt(1);}function An(u){F=u.slice(),St();}function tn(u,m="asc"){N=u,M=u?m:null,N&&M?Q():$=R.slice(),St();}function k(){try{pt.disconnect();}catch{}window.removeEventListener("resize",It);}return K.append(D,Z,W),G.appendChild(K),window.addEventListener("resize",It),St(),{root:G,setData:Vt,setColumns:An,sortBy:tn,getSelection:j,setSelection:de,clearSelection:ce,setPage:mt,getState:()=>({page:C,pageCount:oe(),sortKey:N,sortDir:M}),destroy:k}}let gs=false;const ai=new Set;function r0(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const dn=e=>{const t=r0();if(t){for(const n of ai)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function o0(){gs||(gs=true,window.addEventListener("keydown",dn,true),window.addEventListener("keypress",dn,true),window.addEventListener("keyup",dn,true),document.addEventListener("keydown",dn,true),document.addEventListener("keypress",dn,true),document.addEventListener("keyup",dn,true));}function i0(){gs&&(gs=false,window.removeEventListener("keydown",dn,true),window.removeEventListener("keypress",dn,true),window.removeEventListener("keyup",dn,true),document.removeEventListener("keydown",dn,true),document.removeEventListener("keypress",dn,true),document.removeEventListener("keyup",dn,true));}function a0(e){return ai.size===0&&o0(),ai.add(e),()=>{ai.delete(e),ai.size===0&&i0();}}function ya(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function s0(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Us(e={}){const{id:t,placeholder:n="Search...",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:l,onSearch:d,autoSearch:f=false,debounceMs:p=0,focusKey:h="/",iconLeft:g,iconRight:y,withClear:b=true,clearTitle:S="Clear",ariaLabel:_,submitLabel:I,loading:T=false,blockGameKeys:L=true}=e,F=x("div",{className:"search"+(o?` search--${o}`:""),id:t}),$=x("span",{className:"search-ico search-ico--left"});if(g){const ce=ya(g);ce&&$.appendChild(ce);}else $.textContent="🔎",$.style.opacity=".9";const R=x("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":_||n}),N=x("span",{className:"search-ico search-ico--right"});if(y){const ce=ya(y);ce&&N.appendChild(ce);}const M=s0();M.classList.add("search-spinner");const C=b?x("button",{className:"search-clear",type:"button",title:S},"×"):null,E=I!=null?x("button",{className:"btn search-submit",type:"button"},I):null,B=x("div",{className:"search-field"},$,R,N,M,...C?[C]:[]);F.append(B,...E?[E]:[]);let G=!!i,K=null;function D(ce){M.style.display=ce?"inline-block":"none",F.classList.toggle("is-loading",ce);}function Z(){K!=null&&(window.clearTimeout(K),K=null);}function W(ce){Z(),p>0?K=window.setTimeout(()=>{K=null,ce();},p):ce();}function te(){l?.(R.value),f&&d&&d(R.value);}R.addEventListener("input",()=>{W(te);}),R.addEventListener("keydown",ce=>{ce.key==="Enter"?(ce.preventDefault(),Z(),d?.(R.value)):ce.key==="Escape"&&(R.value.length>0?oe("",{notify:true}):R.blur());}),C&&C.addEventListener("click",()=>oe("",{notify:true})),E&&E.addEventListener("click",()=>d?.(R.value));let re=()=>{};if(L&&(re=a0(R)),h){const ce=le=>{if(le.key===h&&!le.ctrlKey&&!le.metaKey&&!le.altKey){const ye=document.activeElement;ye&&(ye.tagName==="INPUT"||ye.tagName==="TEXTAREA"||ye.isContentEditable)||(le.preventDefault(),R.focus());}};window.addEventListener("keydown",ce,true),F.__cleanup=()=>{window.removeEventListener("keydown",ce,true),re();};}else F.__cleanup=()=>{re();};function ne(ce){G=!!ce,R.disabled=G,C&&(C.disabled=G),E&&(E.disabled=G),F.classList.toggle("disabled",G);}function oe(ce,le={}){const ye=R.value;R.value=ce??"",le.notify&&ye!==ce&&W(te);}function V(){return R.value}function Q(){R.focus();}function O(){R.blur();}function j(ce){R.placeholder=ce;}function X(ce){oe("",ce);}return ne(G),D(T),a&&Q(),{root:F,input:R,getValue:V,setValue:oe,focus:Q,blur:O,setDisabled:ne,setPlaceholder:j,clear:X,setLoading:D,setIconLeft(ce){$.replaceChildren();const le=ya(ce??"🔎");le&&$.appendChild(le);},setIconRight(ce){N.replaceChildren();const le=ya(ce??"");le&&N.appendChild(le);}}}const fh=e=>new Promise(t=>setTimeout(t,e)),xn=e=>{try{return e()}catch{return}},Fn=(e,t,n)=>Math.max(t,Math.min(n,e)),l0=e=>Fn(e,0,1);let Ad=null;function hh(){return Ad}function c0(e){Ad=e;}function mh(){return Ad!==null}const d0=/\/(?:r\/\d+\/)?version\/([^/]+)/,u0=15e3,p0=50;function f0(){return he?.document??(typeof document<"u"?document:null)}function Ed(e={}){if(mh())return;const t=e.doc??f0();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(d0);if(a?.[1]){c0(a[1]);return}}}function h0(){return Ed(),hh()}function m0(){return mh()}async function g0(e={}){const t=e.timeoutMs??u0,n=performance.now();for(;performance.now()-n<t;){Ed();const r=hh();if(r)return r;await fh(p0);}throw new Error("MGVersion timeout (gameVersion not found)")}const _d={init:Ed,isReady:m0,get:h0,wait:g0},b0=he?.location?.origin||"https://magicgarden.gg";function gh(){return typeof GM_xmlhttpRequest=="function"}function bh(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function vh(e){if(gh())return JSON.parse((await bh(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function v0(e){if(gh())return (await bh(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}const Fr=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,"");let Id=null,yh=null;function y0(){return Id}function x0(){return yh}function w0(e){Id=e;}function C0(e){yh=e;}function xh(){return Id!==null}const k0=15e3;async function S0(e={}){xh()||await Td(e);}async function Td(e={}){const t=y0();if(t)return t;const n=x0();if(n)return n;const r=(async()=>{const o=e.gameVersion??await _d.wait({timeoutMs:k0}),i=`${b0}/version/${o}/assets/`;return w0(i),i})();return C0(r),r}async function A0(e){const t=await Td();return Fr(t,e)}function E0(){return xh()}const Po={init:S0,isReady:E0,base:Td,url:A0},wh=new Map;function _0(e){return wh.get(e)}function I0(e,t){wh.set(e,t);}const Ch="manifest.json";let Ec=null;async function T0(){Ec||(Ec=await kh());}function P0(){return Ec!==null}async function kh(e={}){const t=e.baseUrl??await Po.base(),n=_0(t);if(n)return n;const r=vh(Fr(t,Ch));return I0(t,r),r}function L0(e,t){return e.bundles.find(n=>n.name===t)??null}function M0(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Ch&&t.add(r);return Array.from(t)}const vo={init:T0,isReady:P0,load:kh,getBundle:L0,listJsonFromBundle:M0},R0={items:"items",decor:"decor",mutations:"mutations",eggs:"eggs",pets:"pets",abilities:"abilities",plants:"plants",weathers:"weather"};function F0(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},ready:false}}const Gt=F0(),yp="https://mg-api.ariedam.fr/data";async function O0(){if(Gt.ready)return;console.log("[MGData] Fetching game data from API...");const e=await new Promise((n,r)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(yp).then(o=>{if(!o.ok)r(new Error(`[MGData] API request failed: ${o.status}`));else return o.json()}).then(o=>n(o)).catch(r);return}GM_xmlhttpRequest({method:"GET",url:yp,responseType:"json",onload(o){if(o.status<200||o.status>=300){r(new Error(`[MGData] API request failed: ${o.status}`));return}n(o.response);},onerror(){r(new Error("[MGData] Network error"));}});});for(const[n,r]of Object.entries(R0)){const o=e[n];o&&typeof o=="object"&&(Gt.data[r]=o);}Gt.ready=true;const t=Object.entries(Gt.data).filter(([,n])=>n!==null).map(([n])=>n);console.log(`[MGData] Data loaded: ${t.join(", ")}`);}const N0=/\/assets\/sprites\/(.+?)\.png/,D0={"mutation-overlays":"mutation-overlay"};function $0(e){const t=D0[e];return t||(e.endsWith("s")&&e.length>1?e.slice(0,-1):e)}function qn(e){if(!e||typeof e!="string")return null;const t=e.match(N0);if(!t)return null;const n=t[1],r=n.indexOf("/");if(r>0){const o=n.slice(0,r),i=n.slice(r);return `sprite/${$0(o)}${i}`}return `sprite/${n}`}function B0(e){for(const[,t]of Object.entries(e.items||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.decor||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.mutations||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.eggs||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.pets||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.weather||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.plants||{})){const n=t;if(n.seed){const r=qn(n.seed.sprite);r&&(n.seed.spriteId=r);}if(n.plant){const r=qn(n.plant.sprite);r&&(n.plant.spriteId=r);}if(n.crop){const r=qn(n.crop.sprite);r&&(n.crop.spriteId=r);}}}function z0(){try{console.log("[MGData] Resolving sprites..."),B0(Gt.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] Sprite resolution failed",e);}catch{}}}const Sh=1e4,Ah=50;function Eh(e){return new Promise(t=>setTimeout(t,e))}function j0(e){return Gt.data[e]}function G0(){return {...Gt.data}}function U0(e){return Gt.data[e]!=null}async function W0(e,t=Sh){const n=Gt.data[e];if(n!=null)return n;const r=Date.now();for(;Date.now()-r<t;){await Eh(Ah);const o=Gt.data[e];if(o!=null)return o}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function H0(e=Sh){if(Gt.ready)return {...Gt.data};const t=Date.now();for(;Date.now()-t<e;){if(Gt.ready)return {...Gt.data};await Eh(Ah);}throw new Error("MGData.waitForAnyData: timeout")}const _h=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Ih(e){return _h.includes(e)}function Th(e){return e.filter(t=>Ih(t.action))}function xp(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function zl(e){return e?.name||e?.petSpecies||"Unknown Pet"}function Ph(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=zl(r.targetPet),i=r.hungerRestoreAmount||0,l=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${i} hunger to ${l}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",i=r.sellPrice||0;return `Ate ${o} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=zl(r.targetPet),i=r.strengthIncrease||0;return `Boosted ${o}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=zl(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,i=r.petsAffected?.length||0;return `Gave +${o} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,i=r.eggsAffected?.length||0,a=xp(o);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,i=r.numPlantsAffected||0,a=xp(o);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,i=r.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const Oe={async init(){await O0();},isReady(){return Gt.ready},get:j0,getAll:G0,has:U0,waitFor:W0,waitForAny:H0,resolveSprites:z0,cleanup(){}},V0=new Map;function K0(){return V0}function _c(){return he.jotaiAtomCache?.cache}function dr(e){const t=K0(),n=t.get(e);if(n)return n;const r=_c();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Y0(){const e=he;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const q0={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Lo(){return q0}const X0="__JOTAI_STORE_READY__";let wp=false;const Ic=new Set;function xa(){if(!wp){wp=true;for(const e of Ic)try{e();}catch{}try{const e=he.CustomEvent||CustomEvent;he.dispatchEvent?.(new e(X0));}catch{}}}function J0(e){Ic.add(e);const t=Pc();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Ic.delete(e);}}async function Pd(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Pc();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const l=J0(()=>{a||(a=true,l(),o());}),d=Date.now();(async()=>{for(;!a&&Date.now()-d<t;){const p=Pc();if(p.via&&!p.polyfill){if(a)return;a=true,l(),o();return}await Ai(n);}a||(a=true,l(),i(new Error("Store not captured within timeout")));})();})}const Ai=e=>new Promise(t=>setTimeout(t,e));function Lh(){try{const e=he.Event||Event;he.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Tc(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function jl(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Tc(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(Tc(i))return i}catch{}return null}function Mh(){const e=Lo(),t=he.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,l=[i.current];for(;l.length;){const d=l.pop();if(!(!d||a.has(d))){a.add(d);try{const f=d?.pendingProps?.value;if(Tc(f))return e.lastCapturedVia="fiber",f}catch{}try{let f=d?.memoizedState,p=0;for(;f&&p<15;){p++;const h=jl(f);if(h)return e.lastCapturedVia="fiber",h;const g=jl(f.memoizedState);if(g)return e.lastCapturedVia="fiber",g;f=f.next;}}catch{}try{if(d?.stateNode){const f=jl(d.stateNode);if(f)return e.lastCapturedVia="fiber",f}}catch{}d.child&&l.push(d.child),d.sibling&&l.push(d.sibling),d.alternate&&l.push(d.alternate);}}}}return null}function Rh(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Q0(e=5e3){const t=Date.now();let n=_c();for(;!n&&Date.now()-t<e;)await Ai(100),n=_c();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=Lo();let o=null,i=null;const a=[],l=()=>{for(const f of a)try{f.__origWrite&&(f.write=f.__origWrite,delete f.__origWrite);}catch{}};for(const f of n.values()){if(!f||typeof f.write!="function"||f.__origWrite)continue;const p=f.write;f.__origWrite=p,f.write=function(h,g,...y){return i||(o=h,i=g,l()),p.call(this,h,g,...y)},a.push(f);}Lh();const d=Date.now();for(;!i&&Date.now()-d<e;)await Ai(50);return i?(r.lastCapturedVia="write",{get:f=>o(f),set:(f,p)=>i(f,p),sub:(f,p)=>{let h;try{h=o(f);}catch{}const g=setInterval(()=>{let y;try{y=o(f);}catch{return}if(y!==h){h=y;try{p();}catch{}}},100);return ()=>clearInterval(g)}}):(l(),r.lastCapturedVia="polyfill",Rh())}async function Z0(e=1e4){const t=Lo();Lh();const n=Date.now();for(;Date.now()-n<e;){const r=Mh();if(r)return r;await Ai(50);}return t.lastCapturedVia="polyfill",Rh()}async function Ld(){const e=Lo();if(e.baseStore&&!e.baseStore.__polyfill)return xa(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Ai(25);if(e.baseStore)return e.baseStore.__polyfill||xa(),e.baseStore}e.captureInProgress=true;try{const t=Mh();if(t)return e.baseStore=t,xa(),t;try{const r=await Q0(5e3);return e.baseStore=r,r.__polyfill||xa(),r}catch(r){e.captureError=r;}const n=await Z0();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Pc(){const e=Lo();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function ex(){const e=await Ld(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let l;try{l=e.get(o);}catch{return}const d=i.last,f=!Object.is(l,d)||!i.has;if(i.last=l,i.has=true,f)for(const p of i.subs)try{p(l,d);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(l=>a=l),()=>a?.()}}}}}async function Ya(){const e=Lo();return e.mirror||(e.mirror=await ex()),e.mirror}const Je={async select(e){const t=await Ya(),n=dr(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Ya(),r=dr(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Ya(),r=dr(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await Je.select(e);try{t(n);}catch{}return Je.subscribe(e,t)}};async function Fh(){await Ya();}const zi=Object.freeze(Object.defineProperty({__proto__:null,Store:Je,prewarm:Fh,waitForStore:Pd},Symbol.toStringTag,{value:"Module"}));function Md(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ei(e,t){const n=Md(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function tx(e,t,n){const r=Md(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const l=r[a],d=i[l],f=typeof d=="object"&&d!==null?Array.isArray(d)?[...d]:{...d}:{};i[l]=f,i=f;}return i[r[r.length-1]]=n,o}function Cp(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Ei(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function nx(e,t,n){const r=n.mode??"auto";function o(f){const p=t?Ei(f,t):f,h=new Map;if(p==null)return {signatures:h,keys:[]};const g=Array.isArray(p);if((r==="array"||r==="auto"&&g)&&g)for(let b=0;b<p.length;b++){const S=p[b],_=n.key?n.key(S,b,f):b,I=n.sig?n.sig(S,b,f):n.fields?Cp(S,n.fields):JSON.stringify(S);h.set(_,I);}else for(const[b,S]of Object.entries(p)){const _=n.key?n.key(S,b,f):b,I=n.sig?n.sig(S,b,f):n.fields?Cp(S,n.fields):JSON.stringify(S);h.set(_,I);}return {signatures:h,keys:Array.from(h.keys())}}function i(f,p){if(f===p)return  true;if(!f||!p||f.size!==p.size)return  false;for(const[h,g]of f)if(p.get(h)!==g)return  false;return  true}async function a(f){let p=null;return Je.subscribeImmediate(e,h=>{const g=t?Ei(h,t):h,{signatures:y}=o(g);if(!i(p,y)){const b=new Set([...p?Array.from(p.keys()):[],...Array.from(y.keys())]),S=[];for(const _ of b){const I=p?.get(_)??"__NONE__",T=y.get(_)??"__NONE__";I!==T&&S.push(_);}p=y,f({value:g,changedKeys:S});}})}async function l(f,p){return a(({value:h,changedKeys:g})=>{g.includes(f)&&p({value:h});})}async function d(f,p){const h=new Set(f);return a(({value:g,changedKeys:y})=>{const b=y.filter(S=>h.has(S));b.length&&p({value:g,changedKeys:b});})}return {sub:a,subKey:l,subKeys:d}}const to=new Map;function rx(e,t){const n=to.get(e);if(n)try{n();}catch{}return to.set(e,t),()=>{try{t();}catch{}to.get(e)===t&&to.delete(e);}}function et(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${Md(n).join(".")}`:e;async function i(){const h=await Je.select(e);return n?Ei(h,n):h}async function a(h){if(typeof r=="function"){const b=await Je.select(e),S=r(h,b);return Je.set(e,S)}const g=await Je.select(e),y=n?tx(g,n,h):h;return r==="merge-shallow"&&!n&&g&&typeof g=="object"&&typeof h=="object"?Je.set(e,{...g,...h}):Je.set(e,y)}async function l(h){const g=await i(),y=h(g);return await a(y),y}async function d(h,g,y){let b;const S=I=>{const T=n?Ei(I,n):I;if(typeof b>"u"||!y(b,T)){const L=b;b=T,g(T,L);}},_=h?await Je.subscribeImmediate(e,S):await Je.subscribe(e,S);return rx(o,_)}function f(){const h=to.get(o);if(h){try{h();}catch{}to.delete(o);}}function p(h){return nx(e,h?.path??n,h)}return {label:o,get:i,set:a,update:l,onChange:(h,g=Object.is)=>d(false,h,g),onChangeNow:(h,g=Object.is)=>d(true,h,g),asSignature:p,stopOnChange:f}}function ae(e){return et(e)}ae("positionAtom");ae("lastPositionInMyGardenAtom");ae("playerDirectionAtom");ae("stateAtom");ae("quinoaDataAtom");ae("currentTimeAtom");ae("actionAtom");ae("isPressAndHoldActionAtom");ae("mapAtom");ae("tileSizeAtom");et("mapAtom",{path:"cols"});et("mapAtom",{path:"rows"});et("mapAtom",{path:"spawnTiles"});et("mapAtom",{path:"locations.seedShop.spawnTileIdx"});et("mapAtom",{path:"locations.eggShop.spawnTileIdx"});et("mapAtom",{path:"locations.toolShop.spawnTileIdx"});et("mapAtom",{path:"locations.decorShop.spawnTileIdx"});et("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});et("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});et("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});et("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});et("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});ae("playerAtom");ae("myDataAtom");ae("myUserSlotIdxAtom");ae("isSpectatingAtom");ae("myCoinsCountAtom");ae("numPlayersAtom");et("playerAtom",{path:"id"});et("myDataAtom",{path:"activityLogs"});ae("userSlotsAtom");ae("filteredUserSlotsAtom");ae("myUserSlotAtom");ae("spectatorsAtom");et("stateAtom",{path:"child"});et("stateAtom",{path:"child.data"});et("stateAtom",{path:"child.data.shops"});const ox=et("stateAtom",{path:"child.data.userSlots"}),ix=et("stateAtom",{path:"data.players"}),ax=et("stateAtom",{path:"data.hostPlayerId"});ae("myInventoryAtom");ae("myInventoryItemsAtom");ae("isMyInventoryAtMaxLengthAtom");ae("myFavoritedItemIdsAtom");ae("myCropInventoryAtom");ae("mySeedInventoryAtom");ae("myToolInventoryAtom");ae("myEggInventoryAtom");ae("myDecorInventoryAtom");ae("myPetInventoryAtom");et("myInventoryAtom",{path:"favoritedItemIds"});ae("itemTypeFiltersAtom");ae("myItemStoragesAtom");ae("myPetHutchStoragesAtom");ae("myPetHutchItemsAtom");ae("myPetHutchPetItemsAtom");ae("myNumPetHutchItemsAtom");ae("myValidatedSelectedItemIndexAtom");ae("isSelectedItemAtomSuspended");ae("mySelectedItemAtom");ae("mySelectedItemNameAtom");ae("mySelectedItemRotationsAtom");ae("mySelectedItemRotationAtom");ae("setSelectedIndexToEndAtom");ae("myPossiblyNoLongerValidSelectedItemIndexAtom");ae("mySelectedItemIdAtom");ae("myCurrentGlobalTileIndexAtom");ae("myCurrentGardenTileAtom");ae("myCurrentGardenObjectAtom");ae("myOwnCurrentGardenObjectAtom");ae("myOwnCurrentDirtTileIndexAtom");ae("myCurrentGardenObjectNameAtom");ae("isInMyGardenAtom");ae("myGardenBoardwalkTileObjectsAtom");const sx=et("myDataAtom",{path:"garden"});et("myDataAtom",{path:"garden.tileObjects"});et("myOwnCurrentGardenObjectAtom",{path:"objectType"});ae("myCurrentStablePlantObjectInfoAtom");ae("myCurrentSortedGrowSlotIndicesAtom");ae("mySelectedSlotIdAtom");ae("myCurrentGrowSlotsAtom");ae("myCurrentGrowSlotAtom");ae("secondsUntilCurrentGrowSlotMaturesAtom");ae("isCurrentGrowSlotMatureAtom");ae("numGrowSlotsAtom");ae("myCurrentEggAtom");ae("myPetSlotInfosAtom");ae("myPrimitivePetSlotsAtom");ae("myNonPrimitivePetSlotsAtom");ae("myPetsProgressAtom");ae("myActiveCropMutationPetsAtom");ae("totalPetSellPriceAtom");ae("selectedPetHasNewVariantsAtom");const lx=ae("shopsAtom"),cx=et("myDataAtom",{path:"shopPurchases"});ae("seedShopAtom");ae("seedShopInventoryAtom");ae("seedShopRestockSecondsAtom");ae("seedShopCustomRestockInventoryAtom");ae("eggShopAtom");ae("eggShopInventoryAtom");ae("eggShopRestockSecondsAtom");ae("eggShopCustomRestockInventoryAtom");ae("toolShopAtom");ae("toolShopInventoryAtom");ae("toolShopRestockSecondsAtom");ae("toolShopCustomRestockInventoryAtom");ae("decorShopAtom");ae("decorShopInventoryAtom");ae("decorShopRestockSecondsAtom");ae("decorShopCustomRestockInventoryAtom");ae("isDecorShopAboutToRestockAtom");et("shopsAtom",{path:"seed"});et("shopsAtom",{path:"tool"});et("shopsAtom",{path:"egg"});et("shopsAtom",{path:"decor"});ae("myCropItemsAtom");ae("myCropItemsToSellAtom");ae("totalCropSellPriceAtom");ae("friendBonusMultiplierAtom");ae("myJournalAtom");ae("myCropJournalAtom");ae("myPetJournalAtom");ae("myStatsAtom");ae("myActivityLogsAtom");ae("newLogsAtom");ae("hasNewLogsAtom");ae("newCropLogsFromSellingAtom");ae("hasNewCropLogsFromSellingAtom");ae("myCompletedTasksAtom");ae("myActiveTasksAtom");ae("isWelcomeToastVisibleAtom");ae("shouldCloseWelcomeToastAtom");ae("isInitialMoveToDirtPatchToastVisibleAtom");ae("isFirstPlantSeedActiveAtom");ae("isThirdSeedPlantActiveAtom");ae("isThirdSeedPlantCompletedAtom");ae("isDemoTouchpadVisibleAtom");ae("areShopAnnouncersEnabledAtom");ae("arePresentablesEnabledAtom");ae("isEmptyDirtTileHighlightedAtom");ae("isPlantTileHighlightedAtom");ae("isItemHiglightedInHotbarAtom");ae("isItemHighlightedInModalAtom");ae("isMyGardenButtonHighlightedAtom");ae("isSellButtonHighlightedAtom");ae("isShopButtonHighlightedAtom");ae("isInstaGrowButtonHiddenAtom");ae("isActionButtonHighlightedAtom");ae("isGardenItemInfoCardHiddenAtom");ae("isSeedPurchaseButtonHighlightedAtom");ae("isFirstSeedPurchaseActiveAtom");ae("isFirstCropHarvestActiveAtom");ae("isWeatherStatusHighlightedAtom");ae("weatherAtom");const Oh=ae("activeModalAtom"),Rd=ae("inventoryModalIsActiveAtom");ae("hotkeyBeingPressedAtom");ae("avatarTriggerAnimationAtom");ae("avatarDataAtom");ae("emoteDataAtom");ae("otherUserSlotsAtom");ae("otherPlayerPositionsAtom");ae("otherPlayerSelectedItemsAtom");ae("otherPlayerLastActionsAtom");ae("traderBunnyPlayerId");ae("npcPlayersAtom");ae("npcQuinoaUsersAtom");ae("numNpcAvatarsAtom");ae("traderBunnyEmoteTimeoutAtom");ae("traderBunnyEmoteAtom");ae("unsortedLeaderboardAtom");ae("currentGardenPlayer");ae("quinoaEngineAtom");ae("quinoaInitializationErrorAtom");ae("avgPingAtom");ae("serverClientTimeOffsetAtom");ae("isEstablishingShotRunningAtom");ae("isEstablishingShotCompleteAtom");const Ve={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Ws(){return Ve}function dx(){return Ve.initialized}function jr(){return Ve.isCustom&&Ve.activeModal!==null}function $r(){return Ve.activeModal}function Nh(e){return !Ve.shadow||Ve.shadow.modal!==e?null:Ve.shadow.data}function ux(e){Ve.initialized=e;}function Fd(e){Ve.activeModal=e;}function Od(e){Ve.isCustom=e;}function Dh(e,t){Ve.shadow={modal:e,data:t,timestamp:Date.now()};}function $h(){Ve.shadow=null;}function kp(e,t){Ve.patchedAtoms.add(e),Ve.originalReads.set(e,t);}function px(e){return Ve.originalReads.get(e)}function Lc(e){return Ve.patchedAtoms.has(e)}function fx(e){Ve.patchedAtoms.delete(e),Ve.originalReads.delete(e);}function hx(e){Ve.unsubscribes.push(e);}function mx(){for(const e of Ve.unsubscribes)try{e();}catch{}Ve.unsubscribes.length=0;}function gx(e){return Ve.listeners.onOpen.add(e),()=>Ve.listeners.onOpen.delete(e)}function Bh(e){return Ve.listeners.onClose.add(e),()=>Ve.listeners.onClose.delete(e)}function zh(e){for(const t of Array.from(Ve.listeners.onOpen))try{t(e);}catch{}}function Nd(e){for(const t of Array.from(Ve.listeners.onClose))try{t(e);}catch{}}function bx(){mx(),Ve.initialized=false,Ve.activeModal=null,Ve.isCustom=false,Ve.shadow=null,Ve.patchedAtoms.clear(),Ve.originalReads.clear(),Ve.listeners.onOpen.clear(),Ve.listeners.onClose.clear();}const Dd={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function jh(e){return Dd[e]}function vx(e){const t=Dd[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const yx=new Set(["inventory","journal","stats","activityLog","petHutch"]),xx=new Set(["seedShop","eggShop","toolShop","decorShop"]),wx=new Set(["leaderboard"]);function Cx(e,t,n,r){return function(i){const a=jr(),l=$r();if(a&&l===r){const d=Nh(r);if(d!==null){let f;if(n.dataKey==="_full"?f=d:f=d[n.dataKey],f!==void 0)return t(i),n.transform?n.transform(f):f}}return t(i)}}function kx(e,t,n,r,o){return function(a){if(jr()&&$r()===o){const l=Nh(o);if(l!==null){const d=l[n];if(d!==void 0)return t(a),r(d)}}return t(a)}}function Sx(e){const t=jh(e);for(const n of t.atoms){const r=dr(n.atomLabel);if(!r||Lc(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=Cx(n.atomLabel,o,n,e);r.read=i,kp(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=dr(n.atomLabel);if(!r||Lc(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=kx(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,kp(n.atomLabel,o);}}async function Hs(e){const t=jh(e);for(const r of t.atoms)Sp(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)Sp(r.atomLabel);const n=await Ld();await Gh(n,e);}async function Ax(e){const t=await Ld();await Gh(t,e);const n=vx(e);for(const r of n){const o=dr(r);if(o)try{t.get(o);}catch{}}}function Sp(e){if(!Lc(e))return;const t=dr(e),n=px(e);t&&n&&(t.read=n),fx(e);}async function Gh(e,t){const n=yx.has(t),r=xx.has(t),o=wx.has(t);if(!n&&!r&&!o)return;const i=dr("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let l=null;if(n||r){const d=a.child,f=d?.data;if(d&&f&&typeof f=="object"){let p=null;if(n&&Array.isArray(f.userSlots)){const h=f.userSlots.map(g=>{if(!g||typeof g!="object")return g;const y=g,b=y.data,S=b&&typeof b=="object"?{...b}:b;return {...y,data:S}});p={...p??f,userSlots:h};}if(r&&f.shops&&typeof f.shops=="object"&&(p={...p??f,shops:{...f.shops}}),p){const h={...d,data:p};l={...a,child:h};}}}if(o){const d=a.data;if(d&&Array.isArray(d.players)){const f={...d,players:[...d.players]};l={...l??a,data:f};}}if(!l)return;await e.set(i,l);}catch{}}async function Ex(){for(const e of Object.keys(Dd))await Hs(e);}let wa=null,hi=null;async function _x(){if(Ws().initialized)return;hi=await Je.select("activeModalAtom"),wa=setInterval(async()=>{try{const n=await Je.select("activeModalAtom"),r=hi;r!==n&&(hi=n,Ix(n,r));}catch{}},50),hx(()=>{wa&&(clearInterval(wa),wa=null);}),ux(true);}function Ix(e,t){const n=jr(),r=$r();e===null&&t!==null&&(n&&r===t?Tx("native"):n||Nd({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&zh({modal:e,isCustom:false});}async function Tx(e){const t=$r();t&&($h(),Od(false),Fd(null),t==="inventory"&&await Rd.set(false),await Hs(t),Nd({modal:t,wasCustom:true,closedBy:e}));}async function Px(e,t){if(!Ws().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");jr()&&await Uh(),Dh(e,t),Od(true),Fd(e),Sx(e),await Ax(e),e==="inventory"&&await Rd.set(true),await Oh.set(e),hi=e,zh({modal:e,isCustom:true});}function Lx(e,t){const n=Ws();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Dh(e,o);}async function Uh(){const e=Ws();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;$h(),Od(false),Fd(null),t==="inventory"&&await Rd.set(false),await Oh.set(null),hi=null,await Hs(t),Nd({modal:t,wasCustom:true,closedBy:"api"});}function Mx(){return new Promise(e=>{if(!jr()){e();return}const t=Bh(()=>{t(),e();});})}async function Rx(){if(jr()){const e=$r();e&&await Hs(e);}await Ex(),bx();}const ao={async init(){return _x()},isReady(){return dx()},async show(e,t){return Px(e,t)},update(e,t){return Lx(e,t)},async close(){return Uh()},isOpen(){return $r()!==null},isCustomOpen(){return jr()},getActiveModal(){return $r()},waitForClose(){return Mx()},onOpen(e){return gx(e)},onClose(e){return Bh(e)},async destroy(){return Rx()}};function Fx(){return {ready:false,app:null,renderer:null,ctors:null,textures:new Map,animations:new Map,spriteMeta:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null,catalogKeys:new Set,animationFrameIds:new Map,loadingPromises:new Map,spritePngUrlResolver:null}}function Ox(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Nx(){return {cache:new Map,maxEntries:200}}const Dx={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},$x={enabled:true,maxEntries:200},sn=Fx(),Bx=Ox(),zx={...Dx},jx=Nx(),Gx={...$x};function Ut(){return sn}function yo(){return Bx}function _i(){return zx}function Ii(){return jx}function Mc(){return Gx}function Wh(){return sn.ready}function bs(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function ji(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?bs(r):`sprite/${n}/${r}`}function Rc(e,t,n,r){const o=ji(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=bs(i);return n.has(a)||r.has(a)?a:o}const Ir=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},Ux="https://mg-api.ariedam.fr/assets/sprite-data?full=1",Ap="https://mg-api.ariedam.fr/assets/sprites";let si=new Map;function Wx(e){const t=e.startsWith("sprite/")?e.slice(7):e,n=t.indexOf("/");if(n>0){const r=t.slice(0,n),o=t.slice(n),i=si.get(r)??r;return `${Ap}/${i}${o}.png`}return `${Ap}/${t}.png`}function Hx(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(e).then(r=>{if(!r.ok)n(new Error(`HTTP ${r.status} for ${e}`));else return r.json()}).then(r=>t(r)).catch(n);return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"json",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}t(r.response);},onerror(){n(new Error(`Network error: ${e}`));}});})}function Vx(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){const r=new Image;r.crossOrigin="anonymous",r.onload=()=>t(r),r.onerror=()=>n(new Error(`Failed to load: ${e}`)),r.src=e;return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"blob",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}const o=r.response,i=URL.createObjectURL(o),a=new Image;a.onload=()=>{URL.revokeObjectURL(i),t(a);},a.onerror=()=>{URL.revokeObjectURL(i),n(new Error(`Failed to decode: ${e}`));},a.src=i;},onerror(){n(new Error(`Network error: ${e}`));}});})}function Kx(e){const t=new Map;for(const n of e){const r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)continue;const[,o,i]=r;t.has(o)||t.set(o,new Set),t.get(o).add(i);}return t}function Yx(e){return {anchor:e.anchor??{x:.5,y:.5},sourceSize:e.sourceSize??{w:0,h:0},trimmed:e.trimmed??false,trimOffset:{x:e.spriteSourceSize?.x??0,y:e.spriteSourceSize?.y??0}}}async function qx(){Ir("fetching sprite catalog from API...");const e=await Hx(Ux),t=e.items??e.categories?.flatMap(f=>f.items)??[];if(Ir(`catalog received: ${t.length} entries`),e.categories){si=new Map;for(const f of e.categories)for(const p of f.items??[]){if(!p.id)continue;const h=/^sprite\/([^/]+)\//.exec(p.id);if(!h)continue;const g=h[1];(!si.get(g)||g===f.cat)&&si.set(g,f.cat);}Ir("category mapping:",Object.fromEntries(si));}await new Promise(f=>setTimeout(f,0));const n=t.filter(f=>f.type==="frame"),r=t.filter(f=>f.type==="animation"),o=new Map,i=new Set;for(const f of n)o.set(f.id,Yx(f)),i.add(f.id);const a=new Map;for(const f of r)f.frames.length>=2&&(a.set(f.id,f.frames),i.add(f.id));await new Promise(f=>setTimeout(f,0));const l=[...i],d=Kx(l);return Ir(`indexed ${d.size} categories, ${a.size} animations, ${i.size} total keys`),{catalogKeys:i,meta:o,animationFrameIds:a,categoryIndex:d,pngUrlResolver:Wx}}let Ca=null;async function Xx(){return sn.ready?true:Ca||(Ca=(async()=>{const e=performance.now();Ir("init start");const{catalogKeys:t,meta:n,animationFrameIds:r,categoryIndex:o,pngUrlResolver:i}=await qx();return sn.catalogKeys=t,sn.spriteMeta=n,sn.animationFrameIds=r,sn.categoryIndex=o,sn.spritePngUrlResolver=i,Ir("catalog loaded","keys",sn.catalogKeys.size,"animations",sn.animationFrameIds.size,"categories",sn.categoryIndex?.size??0),sn.ready=true,Ir("ready in",Math.round(performance.now()-e),"ms"),true})(),Ca)}function Hh(e,t){const n=t.textures.get(e);if(n)return Promise.resolve(n);const r=t.loadingPromises.get(e);if(r)return r;if(!t.catalogKeys.has(e)||!t.spritePngUrlResolver)return Promise.resolve(null);const o=t.spritePngUrlResolver(e),i=Vx(o).then(a=>(t.textures.set(e,a),t.loadingPromises.delete(e),a)).catch(()=>(t.loadingPromises.delete(e),null));return t.loadingPromises.set(e,i),i}async function Vh(e,t){const n=new Map,r=e.map(async o=>{const i=await Hh(o,t);n.set(o,i);});return await Promise.all(r),n}const fr={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Thunderstruck:{overlayTall:"sprite/mutation-overlay/ThunderstruckTallPlant",tallIconOverride:"sprite/mutation/ThunderstruckGround"},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Jx=Object.keys(fr),Qx=["Gold","Rainbow","Wet","Chilled","Frozen","Thunderstruck","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Ep=new Map(Qx.map((e,t)=>[e,t]));function vs(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(Ep.get(n)??1/0)-(Ep.get(r)??1/0))}const Zx=["Wet","Chilled","Frozen","Thunderstruck"],ew=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),tw={Banana:.68,Beet:.65,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},nw={Pepper:.6,Banana:.6},rw=256,ow=.5,iw=2;function Kh(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=vs(e),n=aw(e),r=sw(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function aw(e){const t=e.filter((o,i,a)=>fr[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?vs(t.filter(o=>!Zx.includes(o))):vs(t)}function sw(e){const t=e.filter((n,r,o)=>fr[n]?.overlayTall&&o.indexOf(n)===r);return vs(t)}function mi(e,t){return e.map(n=>({name:n,meta:fr[n],overlayTall:fr[n]?.overlayTall??null,isTall:t}))}const lw={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Thunderstruck:{op:"source-atop",colors:["rgb(16, 141, 163)"],a:.4},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},ka=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function cw(e){return ka.has(e)?e:ka.has("overlay")?"overlay":ka.has("screen")?"screen":ka.has("lighter")?"lighter":"source-atop"}function dw(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,l=n/2;if(!o){const h=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*h,l-Math.sin(i)*h,a+Math.cos(i)*h,l+Math.sin(i)*h)}const d=Math.cos(i),f=Math.sin(i),p=Math.abs(d)*t/2+Math.abs(f)*n/2;return e.createLinearGradient(a-d*p,l-f*p,a+d*p,l+f*p)}function _p(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?dw(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((l,d)=>a.addColorStop(d/(i.length-1),l)),e.fillStyle=a,e.fillRect(0,0,t,n);}function uw(e,t,n,r){const o=lw[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,l=t.width,d=t.height;e.save();const f=i.masked?cw(i.op):"source-in";if(e.globalCompositeOperation=f,i.a!=null&&(e.globalAlpha=i.a),i.masked){const p=document.createElement("canvas");p.width=l,p.height=d;const h=p.getContext("2d");h.imageSmoothingEnabled=false,_p(h,l,d,i,a),h.globalCompositeOperation="destination-in",h.drawImage(t,0,0),e.drawImage(p,0,0);}else _p(e,l,d,i,a);e.restore();}function Gi(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Ti(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];case "Thunderstruck":return ["Thunderstruck","ThunderstruckGround"];default:return [e]}}function pw(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function fw(e,t,n,r){if(!t)return null;const o=Gi(e),i=Ti(t);for(const a of i){const l=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const d of l){const f=n.get(d);if(f)return {tex:f,key:d}}{const d=`sprite/mutation-overlay/${a}TallPlant`,f=n.get(d);if(f)return {tex:f,key:d};const p=`sprite/mutation-overlay/${a}`,h=n.get(p);if(h)return {tex:h,key:p};const g=pw(t,n);if(g)return g}}return null}function hw(e,t,n,r){if(!t)return null;const o=fr[t];if(n&&o?.tallIconOverride){const l=r.get(o.tallIconOverride);if(l)return l}const i=Gi(e),a=Ti(t);for(const l of a){const d=[`sprite/mutation/${l}Icon`,`sprite/mutation/${l}`,`sprite/mutation/${l}${i}`,`sprite/mutation/${l}-${i}`,`sprite/mutation/${l}_${i}`,`sprite/mutation/${l}/${i}`];for(const f of d){const p=r.get(f);if(p)return p}if(n){const f=`sprite/mutation-overlay/${l}TallPlantIcon`,p=r.get(f);if(p)return p;const h=`sprite/mutation-overlay/${l}TallPlant`,g=r.get(h);if(g)return g}}return null}function mw(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let l=nw[t]??i;const d=o>r*1.5;let f=tw[t]??(d?a:.4);const p={x:(l-i)*r,y:(f-a)*o},h=Math.min(r,o),g=Math.min(1.5,h/rw);let y=ow*g;return n&&(y*=iw),{width:r,height:o,anchorX:i,anchorY:a,offset:p,iconScale:y}}function gw(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,l=t.mutations?.slice().sort().join(",")||"",d=t.anchorX??.5,f=t.anchorY??.5;return `${e}|s${i}|f${a}|m${l}|ax${d}|ay${f}|bm${n}|bp${o}|p${r}`}function bw(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function vw(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,l]of e.cache)l.lastAccess<i&&(i=l.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function Fc(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function yw(e){e.cache.clear();}function xw(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function ww(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Cw(e,t,n,r,o,i,a,l=5,d=0){if(!t.ready||!i.enabled)return 0;const f=e.length;let p=0;a?.(0,f);for(let h=0;h<f;h+=l){const g=e.slice(h,h+l);for(const y of g)try{await Nc(t,n,r,null,y,{scale:1},o,i),p++;}catch{p++;}a?.(p,f),h+l<f&&await ww();}return p}function Oc(e){if(e instanceof HTMLCanvasElement)return Fc(e);if(e instanceof HTMLImageElement){const t=document.createElement("canvas");t.width=e.naturalWidth||e.width,t.height=e.naturalHeight||e.height;const n=t.getContext("2d");return n&&(n.imageSmoothingEnabled=false,n.drawImage(e,0,0)),t}throw new Error("Cannot convert to canvas: unknown source type")}async function kw(e,t,n){const r=Kh(t);if(!r.sig)return;const o=new Set,i=n.spriteMeta.get(e),a=i?.anchor?.y??.5,l=i?.sourceSize,d=l?.w??1,f=l?.h??1,p=a>.8&&f>d*1.8,h=mi(r.selectedMuts,p),g=mi(r.overlayMuts,p);for(const b of h){if(b.name==="Gold"||b.name==="Rainbow")continue;const S=fr[b.name];b.isTall&&S?.tallIconOverride&&o.add(S.tallIconOverride);const _=Gi(e);for(const I of Ti(b.name))o.add(`sprite/mutation/${I}Icon`),o.add(`sprite/mutation/${I}`),o.add(`sprite/mutation/${I}${_}`);}if(p)for(const b of g){b.overlayTall&&o.add(b.overlayTall);for(const S of Ti(b.name))o.add(`sprite/mutation-overlay/${S}TallPlant`),o.add(`sprite/mutation-overlay/${S}`),o.add(`sprite/mutation/${S}`);}const y=[...o].filter(b=>n.catalogKeys.has(b)&&!n.textures.has(b));y.length>0&&await Vh(y,n);}function Sw(e,t,n,r){const o=fr[t];if(n&&o?.tallIconOverride&&r.has(o.tallIconOverride))return o.tallIconOverride;const i=Gi(e),a=Ti(t);for(const l of a){const d=[`sprite/mutation/${l}Icon`,`sprite/mutation/${l}`,`sprite/mutation/${l}${i}`];for(const f of d)if(r.has(f))return f}return null}function Aw(e,t,n,r,o){const i=Kh(n);if(!i.sig)return e;const a=e.width,l=e.height,d=o.get(t),f=d?.anchor?.x??.5,p=d?.anchor?.y??.5,h={x:a*f,y:l*p},g=p>.8&&l>a*1.8,y=mi(i.muts,g),b=mi(i.overlayMuts,g),S=mi(i.selectedMuts,g),_=Gi(t),T=mw({width:a,height:l,defaultAnchor:{x:f,y:p}},_,g),L=[];for(const R of S){if(R.name==="Gold"||R.name==="Rainbow")continue;const N=hw(t,R.name,R.isTall,r);if(N)try{const M=Oc(N),C=M.width*T.iconScale,E=M.height*T.iconScale,B=Sw(t,R.name,R.isTall,r),G=B?o.get(B):null,K=G?.anchor?.x??.5,D=G?.anchor?.y??.5,Z=h.x+T.offset.x-C*K,W=h.y+T.offset.y-E*D;let te=2;R.isTall&&(te=-1),ew.has(R.name)&&(te=10),L.push({canvas:M,x:Z,y:W,sw:C,sh:E,z:te});}catch{}}const F=document.createElement("canvas");F.width=a,F.height=l;const $=F.getContext("2d");$.imageSmoothingEnabled=false;for(const R of L)R.z===-1&&$.drawImage(R.canvas,R.x,R.y,R.sw,R.sh);$.drawImage(e,0,0);for(const R of y){const N=document.createElement("canvas");N.width=a,N.height=l;const M=N.getContext("2d");M.imageSmoothingEnabled=false,M.drawImage(e,0,0),uw(M,N,R.name,R.isTall),$.drawImage(N,0,0);}for(const R of L)R.z===2&&$.drawImage(R.canvas,R.x,R.y,R.sw,R.sh);if(g)for(const R of b){const N=R.overlayTall,M=N&&r.get(N)?{tex:r.get(N),key:N}:fw(t,R.name,r);if(M?.tex)try{const C=Oc(M.tex),E=C.width,B=C.height,G=h.x-f*E,K=0,D=document.createElement("canvas");D.width=E,D.height=B;const Z=D.getContext("2d");if(!Z)continue;Z.imageSmoothingEnabled=!1,Z.drawImage(C,0,0),Z.globalCompositeOperation="destination-in",Z.drawImage(e,-G,-K),$.drawImage(D,G,K);}catch{}}for(const R of L)R.z===10&&$.drawImage(R.canvas,R.x,R.y,R.sw,R.sh);return F}function Ew(e){return e.boundsMode?e.boundsMode:"base"}function _w(e,t){return t.pad??0}function Xo(e){return Number.isFinite(e)?Math.max(0,e):0}function Yh(e){if(typeof e=="number"){const t=Xo(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Xo(e.top??0),right:Xo(e.right??0),bottom:Xo(e.bottom??0),left:Xo(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Iw(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Yh(t);return `${n.top},${n.right},${n.bottom},${n.left}`}async function Nc(e,t,n,r,o,i={},a,l){if(!e.ready)throw new Error("MGSprite not ready yet");const d=Rc(r,o,e.catalogKeys,e.animationFrameIds),f=Ew(i),p=_w(f,i),h=Iw(f,i.boundsPadding),g=a&&l?.enabled?gw(d,i,f,p,h):null;if(g&&a&&l?.enabled){const C=bw(a,g);if(C)return Fc(C)}const y=i.mutations||[],b=e.animationFrameIds.get(d);b?.length?await Vh(b,e):await Hh(d,e),y.length>0&&await kw(d,y,e);const S=Math.max(0,(i.frameIndex??0)|0);let _;if(b?.length){const C=b.map(E=>e.textures.get(E)).filter(Boolean);_=C.length>0?C[S%C.length]:null;}else _=e.textures.get(d);if(!_)throw new Error(`Unknown sprite/anim key: ${d}`);let I=Oc(_);y.length>0&&(I=Aw(I,d,y,e.textures,e.spriteMeta));const T=i.scale??1,L=Yh(i.boundsPadding),F=I.width,$=I.height,R=Math.max(1,Math.ceil((F+L.left+L.right+p*2)*T)),N=Math.max(1,Math.ceil(($+L.top+L.bottom+p*2)*T));let M;if(T===1&&!p&&!L.top&&!L.right&&!L.bottom&&!L.left)M=I;else {M=document.createElement("canvas"),M.width=R,M.height=N;const C=M.getContext("2d");if(C){C.imageSmoothingEnabled=false;const E=(L.left+p)*T,B=(L.top+p)*T;C.drawImage(I,E,B,F*T,$*T);}}return g&&a&&l?.enabled?(vw(a,l,g,M),Fc(M)):M}function Ip(e,t,n,r,o,i={}){throw e.ready?!e.app||!e.ctors?new Error("MGSprite.show() requires PIXI (not available - use toCanvas() instead)"):new Error("MGSprite.show() is not supported in API-only mode"):new Error("MGSprite not ready yet")}function Tw(e){for(const t of Array.from(e.live)){const n=t.__mgDestroy;typeof n=="function"&&n.call(t);}}function Pw(e,t){return e.defaultParent=t,true}function Lw(e,t){return e.defaultParent=t,true}function Mw(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Gr(){if(!Wh())throw new Error("MGSprite not ready yet")}function Rw(e,t,n){return typeof t=="string"?Ip(Ut(),yo(),_i(),e,t,n||{}):Ip(Ut(),yo(),_i(),null,e,t||{})}function Fw(e,t,n){return typeof t=="string"?Nc(Ut(),yo(),_i(),e,t,n||{},Ii(),Mc()):Nc(Ut(),yo(),_i(),null,e,t||{},Ii(),Mc())}function Ow(){Tw(Ut());}function Nw(e){return Pw(Ut(),e)}function Dw(e){return Lw(Ut(),e)}function $w(e,t){const n=Ut(),r=typeof t=="string"?Rc(e,t,n.catalogKeys,n.animationFrameIds):Rc(null,e,n.catalogKeys,n.animationFrameIds);return n.catalogKeys.has(r)||n.animationFrameIds.has(r)}function Bw(){Gr();const e=Ut().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function zw(e){Gr();const t=String(e||"").trim();if(!t)return [];const n=Ut().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function jw(e,t){Gr();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Ut().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[l,d]of o.entries())if(l.toLowerCase()===i){for(const f of d.values())if(f.toLowerCase()===a)return  true}return  false}function Gw(e){Gr();const t=Ut().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const l=ji(o,a);(!n||l.toLowerCase().startsWith(n))&&r.push(l);}return r.sort((o,i)=>o.localeCompare(i))}function Uw(e){Gr();const t=String(e||"").trim();if(!t)return null;const n=bs(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Ut().categoryIndex,l=o.toLowerCase(),d=i.toLowerCase();let f=o,p=i;if(a){const h=Array.from(a.keys()).find(b=>b.toLowerCase()===l);if(!h)return null;f=h;const g=a.get(h);if(!g)return null;const y=Array.from(g.values()).find(b=>b.toLowerCase()===d);if(!y)return null;p=y;}return {category:f,id:p,key:ji(f,p)}}function Ww(e,t){Gr();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Ut().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),l=Array.from(o.keys()).find(p=>p.toLowerCase()===i)||n,d=o.get(l);if(!d)throw new Error(`Unknown sprite category: ${n}`);const f=Array.from(d.values()).find(p=>p.toLowerCase()===a)||r;if(!d.has(f))throw new Error(`Unknown sprite id: ${n}/${r}`);return ji(l,f)}function Hw(){Mw(yo());}function Vw(){yw(Ii());}function Kw(){return xw(Ii())}function Yw(){return [...Jx]}async function qw(e,t,n=10,r=0){return Gr(),Cw(e,Ut(),yo(),_i(),Ii(),Mc(),t,n,r)}const $e={init:Xx,isReady:Wh,show:Rw,toCanvas:Fw,clear:Ow,attach:Nw,attachProvider:Dw,has:$w,key:(e,t)=>ji(e,t),getCategories:Bw,getCategoryId:zw,hasId:jw,listIds:Gw,getIdInfo:Uw,getIdPath:Ww,clearMutationCache:Hw,clearToCanvasCache:Vw,getToCanvasCacheStats:Kw,getMutationNames:Yw,warmup:qw};function Xw(){return {ready:false,xform:null,xformAt:0}}const pn=Xw();function qh(){return pn.ready}const Tp=Function.prototype.bind,Xe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Xh,Jh,Qh;const Jw=new Promise(e=>{Xh=e;}),Qw=new Promise(e=>{Jh=e;}),Zw=new Promise(e=>{Qh=e;});function eC(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function tC(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function nC(e){Xe.engine=e,Xe.tos=tC(e)||null,Xe.app=e.app||null,Xe.renderer=e.app?.renderer||null,Xe.ticker=e.app?.ticker||null,Xe.stage=e.app?.stage||null;try{Xh(e);}catch{}try{Xe.app&&Jh(Xe.app);}catch{}try{Xe.renderer&&Qh(Xe.renderer);}catch{}}function $d(){return Xe.engine?true:(Xe._bindPatched||(Xe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Tp.call(this,e,...t);try{!Xe.engine&&eC(e)&&(Function.prototype.bind=Tp,Xe._bindPatched=!1,nC(e));}catch{}return n}),false)}$d();async function rC(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(Xe.engine)return  true;$d(),await fh(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function oC(e=15e3){return Xe.engine||await rC(e),true}function iC(){return Xe.engine&&Xe.app?{ok:true,engine:Xe.engine,tos:Xe.tos,app:Xe.app}:($d(),{ok:false,engine:Xe.engine,tos:Xe.tos,app:Xe.app,note:"Not captured. Wait for room, or reload."})}const Rn={engineReady:Jw,appReady:Qw,rendererReady:Zw,engine:()=>Xe.engine,tos:()=>Xe.tos,app:()=>Xe.app,renderer:()=>Xe.renderer,ticker:()=>Xe.ticker,stage:()=>Xe.stage,PIXI:()=>he.PIXI||null,init:oC,hook:iC,ready:()=>!!Xe.engine};function Mo(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Ui(){return Rn.tos()}function Bd(){return Rn.engine()}function aC(){const e=Ui()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function zd(e,t){const n=aC();return n?t*n+e|0:null}let Sa=null;async function sC(e=15e3){return pn.ready?true:Sa||(Sa=(async()=>{if(await Rn.init(e),!Ui())throw new Error("MGTile: engine captured but tileObject system not found");return pn.ready=true,true})(),Sa)}function Or(e,t,n=true){const r=Ui(),o=zd(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function Gl(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function jd(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function so(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Bd(),{gidx:l,tv:d}=Or(Number(e),Number(t),o);if(l==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!d)throw new Error("MGTile: TileView unavailable (not instantiated)");const f=d.tileObject;if(typeof d.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(d.onDataChanged(n),i&&a?.reusableContext&&typeof d.update=="function")try{d.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:l,before:f,after:d.tileObject}}function Vs(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=Or(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const l=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Mo(l):l}}function lC(e,t,n={}){return so(e,t,null,n)}function cC(e,t,n,r={}){const i=Vs(e,t,{...r,clone:false}).tileView?.tileObject;jd(i,"plant");const a=Mo(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const l=Number(n.slotIdx)|0;if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);return Gl(a.slots[l],n.slotPatch),so(e,t,a,r)}if("slots"in n){const l=n.slots;if(Array.isArray(l)){for(let d=0;d<l.length;d++)if(l[d]!=null){if(!a.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Gl(a.slots[d],l[d]);}}else if(l&&typeof l=="object")for(const d of Object.keys(l)){const f=Number(d)|0;if(Number.isFinite(f)){if(!a.slots[f])throw new Error(`MGTile: plant slot ${f} doesn't exist`);Gl(a.slots[f],l[f]);}}else throw new Error("MGTile: patch.slots must be array or object map");return so(e,t,a,r)}return so(e,t,a,r)}function dC(e,t,n,r={}){const i=Vs(e,t,{...r,clone:false}).tileView?.tileObject;jd(i,"decor");const a=Mo(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),so(e,t,a,r)}function uC(e,t,n,r={}){const i=Vs(e,t,{...r,clone:false}).tileView?.tileObject;jd(i,"egg");const a=Mo(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),so(e,t,a,r)}function pC(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Bd(),{gidx:l,tv:d}=Or(Number(e),Number(t),o);if(l==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!d)throw new Error("MGTile: TileView unavailable");const f=d.tileObject,p=typeof n=="function"?n(Mo(f)):n;if(d.onDataChanged(p),i&&a?.reusableContext&&typeof d.update=="function")try{d.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:l,before:f,after:d.tileObject}}function fC(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=Or(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,l=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:l?.objectType??null,tileObject:a?Mo(l):l,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Ul(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function qa(e){const t=xn(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=xn(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function hC(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=qa(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function mC(){const e=Ui(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const l=Or(i,a,true).tv,d=i+1<t?Or(i+1,a,true).tv:null,f=Or(i,a+1,true).tv,p=Ul(l),h=Ul(d),g=Ul(f);if(!p||!h||!g)continue;const y=qa(p),b=qa(h),S=qa(g);if(!y||!b||!S)continue;const _={x:b.x-y.x,y:b.y-y.y},I={x:S.x-y.x,y:S.y-y.y},T=_.x*I.y-_.y*I.x;if(!Number.isFinite(T)||Math.abs(T)<1e-6)continue;const L=1/T,F={a:I.y*L,b:-I.x*L,c:-_.y*L,d:_.x*L},$={x:y.x-i*_.x-a*I.x,y:y.y-i*_.y-a*I.y},R=hC(p),N=R==="center"?$:{x:$.x+.5*(_.x+I.x),y:$.y+.5*(_.y+I.y)};return {ok:true,cols:t,rows:r,vx:_,vy:I,inv:F,anchorMode:R,originCenter:N}}return null}function Zh(){return pn.xform=mC(),pn.xformAt=Date.now(),{ok:!!pn.xform?.ok,xform:pn.xform}}function gC(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!pn.xform?.ok||t.forceRebuild||Date.now()-pn.xformAt>n)&&Zh();const r=pn.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,l=r.inv.c*o+r.inv.d*i,d=Math.floor(a),f=Math.floor(l),p=[[d,f],[d+1,f],[d,f+1],[d+1,f+1]];let h=null,g=1/0;for(const[y,b]of p){if(y<0||b<0||y>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&b>=r.rows)continue;const S=r.originCenter.x+y*r.vx.x+b*r.vy.x,_=r.originCenter.y+y*r.vx.y+b*r.vy.y,I=(e.x-S)**2+(e.y-_)**2;I<g&&(g=I,h={tx:y,ty:b,fx:a,fy:l,x:e.x,y:e.y,gidx:null});}return h?(h.gidx=zd(h.tx,h.ty),h):null}function bC(e,t){const n=pn.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function vn(){if(!qh())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function vC(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const fn={init:sC,isReady:qh,hook:Rn.hook,engine:Bd,tos:Ui,gidx:(e,t)=>zd(Number(e),Number(t)),getTileObject:(e,t,n={})=>(vn(),Vs(e,t,n)),inspect:(e,t,n={})=>(vn(),fC(e,t,n)),setTileEmpty:(e,t,n={})=>(vn(),lC(e,t,n)),setTilePlant:(e,t,n,r={})=>(vn(),cC(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(vn(),dC(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(vn(),uC(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(vn(),pC(e,t,n,r)),rebuildTransform:()=>(vn(),Zh()),pointToTile:(e,t={})=>(vn(),gC(e,t)),tileToPoint:(e,t)=>(vn(),bC(e,t)),getTransform:()=>(vn(),pn.xform),help:vC};function yC(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const Te=yC();function em(){return Te.ready}async function xC(e=15e3){if(Te.ready)return Dc(),true;if(await Rn.init(e),Te.app=Rn.app(),Te.ticker=Rn.ticker(),Te.renderer=Rn.renderer(),Te.stage=Rn.stage(),!Te.app||!Te.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return Te.ready=true,Dc(),true}function Dc(){const e=he;return e.$PIXI=e.PIXI||null,e.$app=Te.app||null,e.$renderer=Te.renderer||null,e.$stage=Te.stage||null,e.$ticker=Te.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:Te.ready},e.__MG_PIXI__}function Gd(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function $c(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function ys(e){return !!(e&&typeof e.tint=="number")}function Br(e){return !!(e&&typeof e.alpha=="number")}function Xa(e,t,n){return e+(t-e)*n}function wC(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,l=t>>8&255,d=t&255,f=Xa(r,a,n)|0,p=Xa(o,l,n)|0,h=Xa(i,d,n)|0;return f<<16|p<<8|h}function CC(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;ys(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function kC(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;Br(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let l=a.length-1;l>=0;l--)r.push(a[l]);}return n}const SC=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Bc(e){if(!e)return null;if($c(e))return e;if(!Gd(e))return null;for(const t of SC){const n=e[t];if($c(n))return n}return null}function AC(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const l=new Array(t);let d=true;for(let f=0;f<t;f++){const p=Bc(i[f]);if(!p){d=false;break}l[f]=p;}if(d)return l}for(const l of i)n.push({o:l,d:a+1});continue}if(Gd(i)){const l=i;for(const d of Object.keys(l))n.push({o:l[d],d:a+1});}}}return null}function tm(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Gd(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function EC(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=tm(t);return Te.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function _C(e){return Te.tileSets.delete(String(e||"").trim())}function IC(){return Array.from(Te.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function nm(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ud(e){const n=fn.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!nm(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=Te.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=tm(e.tiles||[]);const o=new Map;for(const i of r){const a=fn.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Wd(e){const t=Te.highlights.get(e);if(!t)return  false;xn(()=>Te.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Br(t.root)&&xn(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&ys(n.o)&&xn(()=>{n.o.tint=n.baseTint;});return Te.highlights.delete(e),true}function rm(e=null){for(const t of Array.from(Te.highlights.keys()))e&&!String(t).startsWith(e)||Wd(t);return  true}function om(e,t={}){if(!$c(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(Te.highlights.has(n))return n;const r=Br(e)?Number(e.alpha):null,o=Fn(Number(t.minAlpha??.12),0,1),i=Fn(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),l=(t.tint??8386303)>>>0,d=Fn(Number(t.tintMix??.85),0,1),f=t.deepTint!==false,p=[];if(f)for(const y of CC(e))p.push({o:y,baseTint:y.tint});else ys(e)&&p.push({o:e,baseTint:e.tint});const h=performance.now(),g=()=>{const y=(performance.now()-h)/1e3,b=(Math.sin(y*Math.PI*2*a)+1)/2,S=b*b*(3-2*b);r!=null&&Br(e)&&(e.alpha=Fn(Xa(o,i,S)*r,0,1));const _=S*d;for(const I of p)I.o&&ys(I.o)&&(I.o.tint=wC(I.baseTint,l,_));};return Te.ticker?.add(g),Te.highlights.set(n,{root:e,tick:g,baseAlpha:r,tint:p}),n}function TC(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function im(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=Ud(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)rm(i);else for(const h of Array.from(Te.highlights.keys())){if(!h.startsWith(i))continue;const g=h.split(":"),y=Number(g[2]);o.has(y)&&Wd(h);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let l=0,d=0,f=0,p=0;for(const[h,g]of r){const y=g?.tileObject;if(!y||y.objectType!=="plant")continue;const b=y.slots;if(!Array.isArray(b)||b.length===0)continue;let S=false;const _=[];for(let L=0;L<b.length;L++)TC(b[L],n)&&(_.push(L),S=true);if(!S)continue;l++,d+=_.length;const I=g?.childView?.plantVisual||g?.childView||g,T=AC(I,b.length);if(!T){p+=_.length;continue}for(const L of _){const F=T[L];if(!F){p++;continue}const $=`${i}${h}:${L}`;Te.highlights.has($)||(om(F,{key:$,...a}),f++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:l,matchedSlots:d,newHighlights:f,failedSlots:p}}function PC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Te.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{xn(()=>im(n,{...t,clear:!1}));},o);return Te.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function LC(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Te.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),Te.watches.delete(i),o++);return o>0}const n=Te.watches.get(t);return n?(clearInterval(n),Te.watches.delete(t),true):false}function MC(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Bc(t)||Bc(e?.displayObject)||null}function am(e){const t=Te.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Br(n.o)&&Number.isFinite(n.baseAlpha)&&xn(()=>{n.o.alpha=n.baseAlpha;});return Te.fades.delete(e),true}function zc(e=null){for(const t of Array.from(Te.fades.keys()))e&&!String(t).startsWith(e)||am(t);return  true}function sm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!nm(t))return zc(r);const{gidxSet:o}=Ud(t);if(!o)return zc(r);for(const i of Array.from(Te.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&am(i);}return  true}function lm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=Fn(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=Ud(t),l=`fade:${n}:`;t.clear===true&&sm(n,t);let d=0,f=0,p=0,h=0;for(const[g,y]of i){const b=y?.tileObject;if(!b||b.objectType!=="plant")continue;d++;const S=String(b.species||"").trim().toLowerCase();if(!S||S!==n)continue;f++;const _=MC(y);if(!_||!Br(_)){h++;continue}const I=`${l}${g}`;if(Te.fades.has(I)){xn(()=>{_.alpha=r;}),p++;continue}const T=o?kC(_):[_],L=[];for(const F of T)Br(F)&&L.push({o:F,baseAlpha:Number(F.alpha)});for(const F of L)xn(()=>{F.o.alpha=r;});Te.fades.set(I,{targets:L}),p++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:d,matchedPlants:f,applied:p,failed:h,totalFades:Te.fades.size}}function RC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Te.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{xn(()=>lm(n,{...t,clear:!1}));},o);return Te.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function FC(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Te.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),Te.fadeWatches.delete(i),o++);return o>0}const n=Te.fadeWatches.get(t);return n?(clearInterval(n),Te.fadeWatches.delete(t),true):false}function OC(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function NC(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=fn.getTileObject(r,o,{ensureView:i,clone:false}),l=a?.tileView||null,d=l?.tileObject,f={ok:true,tx:r,ty:o,gidx:a?.gidx??fn.gidx?.(r,o)??null,hasTileView:!!l,objectType:d?.objectType??null,tileObject:d??null,summary:d?.objectType==="plant"?OC(d):d?{objectType:d.objectType??null}:null,display:l?l.childView?.plantVisual||l.childView||l.displayObject||l:null};return n.log!==false&&xn(()=>console.log("[MGPixi.inspectTile]",f)),f}function DC(e,t,n){const r=he.PIXI;if(!r)return;let o=Te.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",Te.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const l=fn.tileToPoint(e,t);if(!l)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const d=fn.getTransform(),f=d?Math.hypot(d.vx.x,d.vx.y):32,p=d?Math.hypot(d.vy.x,d.vy.y):32;a.drawRect(0,0,f,p),a.endFill(),a.x=l.x,a.y=l.y,d&&(a.rotation=Math.atan2(d.vx.y,d.vx.x));}function $C(e){const t=Te.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Ft(){if(!em())throw new Error("MGPixi: call MGPixi.init() first")}const xo={init:xC,isReady:em,expose:Dc,get app(){return Te.app},get renderer(){return Te.renderer},get stage(){return Te.stage},get ticker(){return Te.ticker},get PIXI(){return he.PIXI||null},defineTileSet:(e,t)=>(Ft(),EC(e,t)),deleteTileSet:e=>(Ft(),_C(e)),listTileSets:()=>(Ft(),IC()),highlightPulse:(e,t)=>(Ft(),om(e,t)),stopHighlight:e=>(Ft(),Wd(e)),clearHighlights:e=>(Ft(),rm(e)),drawOverlayBox:(e,t,n)=>(Ft(),DC(e,t,n)),stopOverlay:e=>(Ft(),$C(e)),highlightMutation:(e,t)=>(Ft(),im(e,t)),watchMutation:(e,t)=>(Ft(),PC(e,t)),stopWatchMutation:e=>(Ft(),LC(e)),inspectTile:(e,t,n)=>(Ft(),NC(e,t,n)),fadeSpecies:(e,t)=>(Ft(),lm(e,t)),clearSpeciesFade:(e,t)=>(Ft(),sm(e,t)),clearFades:e=>(Ft(),zc(e)),watchFadeSpecies:(e,t)=>(Ft(),RC(e,t)),stopWatchFadeSpecies:e=>(Ft(),FC(e))},BC=["Top","Mid","Bottom","DiscordAvatarPlaceholder"],Wl={AVATAR:/avatarelements[^"'`\s]*\.riv/,EMOTES:/emotes[^"'`\s]*\.riv/,UI:/(giftbox|currency|bread|donut|streak|countdown|loader)[^"'`\s]*\.riv/},cm=new Map;let xs=[],dm=false;function zC(e){return cm.get(e)}function jC(e,t){cm.set(e,t);}function Ks(){return [...xs]}function GC(e){xs=e;}function um(e){xs.some(t=>t.url===e.url)||xs.push(e);}function UC(){return dm}function Pp(e){dm=e;}const lo=[];let Sr=null;function WC(){if(Sr)return Sr;const e=window.fetch;window.fetch=function(r,o){const i=Mp(r);return i&&i.endsWith(".riv")&&Lp(i),e.call(this,r,o)},Sr=()=>{window.fetch===t&&(window.fetch=e),Sr=null;};function t(n,r){const o=Mp(n);return o&&o.endsWith(".riv")&&Lp(o),e.call(window,n,r)}return window.fetch=t,Sr=()=>{window.fetch===t&&(window.fetch=e),Sr=null;},Sr}function Lp(e){const t=Ct.detect(),n=e.startsWith("/")?`${t.origin}${e}`:e,r=fm(e),o=hm(e),i={name:o,url:n,type:r};um(i),console.log(`[MGRiveLoader] Intercepted .riv fetch: ${o} (${r})`,n);for(let a=lo.length-1;a>=0;a--){const l=lo[a];l.type===r&&(clearTimeout(l.timer),l.resolve(i),lo.splice(a,1));}}async function HC(){const t=Ct.detect().origin,n=Array.from(document.scripts),r=[];for(const i of n){const a=i.textContent||"",l=Rp(a,t);r.push(...l);}for(const i of n)if(i.src)try{if(new URL(i.src).origin!==t)continue;const l=await fetch(i.src);if(!l.ok)continue;const d=await l.text(),f=Rp(d,t);r.push(...f);}catch(a){console.debug("[MGRiveLoader] Failed to fetch script:",i.src,a);}const o=Array.from(new Map(r.map(i=>[i.url,i])).values());for(const i of o)um(i);return Ks()}async function VC(){WC();const e=await HC();return GC(e),console.log(`[MGRiveLoader] Discovered ${e.length} .riv files:`,e),e}function KC(e,t=3e4){const n=Ks().find(r=>r.type===e);return n?Promise.resolve(n):new Promise(r=>{const o=setTimeout(()=>{const i=lo.findIndex(a=>a.resolve===r);i!==-1&&lo.splice(i,1),console.warn(`[MGRiveLoader] Timed out waiting for ${e} .riv file`),r(null);},t);lo.push({type:e,resolve:r,timer:o});})}async function pm(){const e=Ks().find(n=>n.type==="avatar");if(e)return e;console.log("[MGRiveLoader] Avatar .riv not found yet, waiting for game to load it...");const t=await KC("avatar",3e4);return t||console.warn("[MGRiveLoader] Could not find avatar .riv file"),t}function Mp(e){return typeof e=="string"?e:e instanceof URL?e.href:e instanceof Request?e.url:null}function Rp(e,t){const n=[],r=new Set,o=/["'`]([^"'`]*\.riv)["'`]/g;let i;for(;(i=o.exec(e))!==null;){const a=i[1],l=fm(a);if(l==="other"&&!a.endsWith(".riv")||r.has(a))continue;r.add(a);const d=a.startsWith("/")?`${t}${a}`:a;n.push({name:hm(a),url:d,type:l});}return n}function fm(e){return Wl.AVATAR.test(e)?"avatar":Wl.EMOTES.test(e)?"emote":Wl.UI.test(e)?"ui":"other"}function hm(e){const t=e.split("/");return t[t.length-1].replace(/-[a-zA-Z0-9_]+\.riv$/,"")}var Ja={exports:{}},YC=Ja.exports,Fp;function qC(){return Fp||(Fp=1,(function(e,t){(function(r,o){e.exports=o();})(YC,()=>(()=>{var n=[,((a,l,d)=>{d.r(l),d.d(l,{default:()=>p});var f=(()=>{var h=typeof document<"u"?document.currentScript?.src:void 0;return(function(g={}){var y,b=g,S,_,I=new Promise((s,c)=>{S=s,_=c;}),T=typeof window=="object",L=typeof importScripts=="function";function F(){function s(Y){const q=w;v=c=0,w=new Map,q.forEach(se=>{try{se(Y);}catch(ie){console.error(ie);}}),this.ob(),P&&P.Qb();}let c=0,v=0,w=new Map,P=null,z=null;this.requestAnimationFrame=function(Y){c||(c=requestAnimationFrame(s.bind(this)));const q=++v;return w.set(q,Y),q},this.cancelAnimationFrame=function(Y){w.delete(Y),c&&w.size==0&&(cancelAnimationFrame(c),c=0);},this.Ob=function(Y){z&&(document.body.remove(z),z=null),Y||(z=document.createElement("div"),z.style.backgroundColor="black",z.style.position="fixed",z.style.right=0,z.style.top=0,z.style.color="white",z.style.padding="4px",z.innerHTML="RIVE FPS",Y=function(q){z.innerHTML="RIVE FPS "+q.toFixed(1);},document.body.appendChild(z)),P=new function(){let q=0,se=0;this.Qb=function(){var ie=performance.now();se?(++q,ie-=se,1e3<ie&&(Y(1e3*q/ie),q=se=0)):(se=ie,q=0);};};},this.Lb=function(){z&&(document.body.remove(z),z=null),P=null;},this.ob=function(){};}function $(s){console.assert(true);const c=new Map;let v=-1/0;this.push=function(w){return w=w+((1<<s)-1)>>s,c.has(w)&&clearTimeout(c.get(w)),c.set(w,setTimeout(function(){c.delete(w),c.length==0?v=-1/0:w==v&&(v=Math.max(...c.keys()),console.assert(v<w));},1e3)),v=Math.max(w,v),v<<s};}const R=b.onRuntimeInitialized;b.onRuntimeInitialized=function(){R&&R();let s=b.decodeAudio;b.decodeAudio=function(P,z){P=s(P),z(P);};let c=b.decodeFont;b.decodeFont=function(P,z){P=c(P),z(P);};const v=b.FileAssetLoader;b.ptrToAsset=P=>{let z=b.ptrToFileAsset(P);return z.isImage?b.ptrToImageAsset(P):z.isFont?b.ptrToFontAsset(P):z.isAudio?b.ptrToAudioAsset(P):z},b.CustomFileAssetLoader=v.extend("CustomFileAssetLoader",{__construct:function({loadContents:P}){this.__parent.__construct.call(this),this.Eb=P;},loadContents:function(P,z){return P=b.ptrToAsset(P),this.Eb(P,z)}}),b.CDNFileAssetLoader=v.extend("CDNFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this);},loadContents:function(P){let z=b.ptrToAsset(P);return P=z.cdnUuid,P===""?false:((function(Y,q){var se=new XMLHttpRequest;se.responseType="arraybuffer",se.onreadystatechange=function(){se.readyState==4&&se.status==200&&q(se);},se.open("GET",Y,true),se.send(null);})(z.cdnBaseUrl+"/"+P,Y=>{z.decode(new Uint8Array(Y.response));}),true)}}),b.FallbackFileAssetLoader=v.extend("FallbackFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this),this.kb=[];},addLoader:function(P){this.kb.push(P);},loadContents:function(P,z){for(let Y of this.kb)if(Y.loadContents(P,z))return  true;return  false}});let w=b.computeAlignment;b.computeAlignment=function(P,z,Y,q,se=1){return w.call(this,P,z,Y,q,se)};};const N="createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(" "),M=new function(){function s(){if(!c){let Be=function(Ue,Se,rt){if(Se=fe.createShader(Se),fe.shaderSource(Se,rt),fe.compileShader(Se),rt=fe.getShaderInfoLog(Se),0<(rt||"").length)throw rt;fe.attachShader(Ue,Se);};var J=document.createElement("canvas"),ve={alpha:1,depth:0,stencil:0,antialias:0,premultipliedAlpha:1,preserveDrawingBuffer:0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:1,explicitSwapControl:1,renderViaOffscreenBackBuffer:1};let fe;if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){if(fe=J.getContext("webgl",ve),v=1,!fe)return console.log("No WebGL support. Image mesh will not be drawn."),false}else if(fe=J.getContext("webgl2",ve))v=2;else if(fe=J.getContext("webgl",ve))v=1;else return console.log("No WebGL support. Image mesh will not be drawn."),false;if(fe=new Proxy(fe,{get(Ue,Se){if(Ue.isContextLost()){if(se||(console.error("Cannot render the mesh because the GL Context was lost. Tried to invoke ",Se),se=true),typeof Ue[Se]=="function")return function(){}}else return typeof Ue[Se]=="function"?function(...rt){return Ue[Se].apply(Ue,rt)}:Ue[Se]},set(Ue,Se,rt){if(Ue.isContextLost())se||(console.error("Cannot render the mesh because the GL Context was lost. Tried to set property "+Se),se=true);else return Ue[Se]=rt,true}}),w=Math.min(fe.getParameter(fe.MAX_RENDERBUFFER_SIZE),fe.getParameter(fe.MAX_TEXTURE_SIZE)),J=fe.createProgram(),Be(J,fe.VERTEX_SHADER,`attribute vec2 vertex;
                attribute vec2 uv;
                uniform vec4 mat;
                uniform vec2 translate;
                varying vec2 st;
                void main() {
                    st = uv;
                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);
                }`),Be(J,fe.FRAGMENT_SHADER,`precision highp float;
                uniform sampler2D image;
                varying vec2 st;
                void main() {
                    gl_FragColor = texture2D(image, st);
                }`),fe.bindAttribLocation(J,0,"vertex"),fe.bindAttribLocation(J,1,"uv"),fe.linkProgram(J),ve=fe.getProgramInfoLog(J),0<(ve||"").trim().length)throw ve;P=fe.getUniformLocation(J,"mat"),z=fe.getUniformLocation(J,"translate"),fe.useProgram(J),fe.bindBuffer(fe.ARRAY_BUFFER,fe.createBuffer()),fe.enableVertexAttribArray(0),fe.enableVertexAttribArray(1),fe.bindBuffer(fe.ELEMENT_ARRAY_BUFFER,fe.createBuffer()),fe.uniform1i(fe.getUniformLocation(J,"image"),0),fe.pixelStorei(fe.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true),c=fe;}return  true}let c=null,v=0,w=0,P=null,z=null,Y=0,q=0,se=false;s(),this.bc=function(){return s(),w},this.Kb=function(J){c.deleteTexture&&c.deleteTexture(J);},this.Jb=function(J){if(!s())return null;const ve=c.createTexture();return ve?(c.bindTexture(c.TEXTURE_2D,ve),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,J),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR),v==2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR_MIPMAP_LINEAR),c.generateMipmap(c.TEXTURE_2D)):c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR),ve):null};const ie=new $(8),ge=new $(8),Ae=new $(10),Ee=new $(10);this.Nb=function(J,ve,fe,Be,Ue){if(s()){var Se=ie.push(J),rt=ge.push(ve);if(c.canvas){(c.canvas.width!=Se||c.canvas.height!=rt)&&(c.canvas.width=Se,c.canvas.height=rt),c.viewport(0,rt-ve,J,ve),c.disable(c.SCISSOR_TEST),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.enable(c.SCISSOR_TEST),fe.sort((qe,Tn)=>Tn.vb-qe.vb),Se=Ae.push(Be),Y!=Se&&(c.bufferData(c.ARRAY_BUFFER,8*Se,c.DYNAMIC_DRAW),Y=Se),Se=0;for(var Pt of fe)c.bufferSubData(c.ARRAY_BUFFER,Se,Pt.Ta),Se+=4*Pt.Ta.length;console.assert(Se==4*Be);for(var Qt of fe)c.bufferSubData(c.ARRAY_BUFFER,Se,Qt.Bb),Se+=4*Qt.Bb.length;console.assert(Se==8*Be),Se=Ee.push(Ue),q!=Se&&(c.bufferData(c.ELEMENT_ARRAY_BUFFER,2*Se,c.DYNAMIC_DRAW),q=Se),Pt=0;for(var xr of fe)c.bufferSubData(c.ELEMENT_ARRAY_BUFFER,Pt,xr.indices),Pt+=2*xr.indices.length;console.assert(Pt==2*Ue),xr=0,Qt=true,Se=Pt=0;for(const qe of fe){qe.image.Ja!=xr&&(c.bindTexture(c.TEXTURE_2D,qe.image.Ia||null),xr=qe.image.Ja),qe.hc?(c.scissor(qe.Za,rt-qe.$a-qe.jb,qe.uc,qe.jb),Qt=true):Qt&&(c.scissor(0,rt-ve,J,ve),Qt=false),fe=2/J;const Tn=-2/ve;c.uniform4f(P,qe.ha[0]*fe*qe.Aa,qe.ha[1]*Tn*qe.Ba,qe.ha[2]*fe*qe.Aa,qe.ha[3]*Tn*qe.Ba),c.uniform2f(z,qe.ha[4]*fe*qe.Aa+fe*(qe.Za-qe.cc*qe.Aa)-1,qe.ha[5]*Tn*qe.Ba+Tn*(qe.$a-qe.dc*qe.Ba)+1),c.vertexAttribPointer(0,2,c.FLOAT,false,0,Se),c.vertexAttribPointer(1,2,c.FLOAT,false,0,Se+4*Be),c.drawElements(c.TRIANGLES,qe.indices.length,c.UNSIGNED_SHORT,Pt),Se+=4*qe.Ta.length,Pt+=2*qe.indices.length;}console.assert(Se==4*Be),console.assert(Pt==2*Ue);}}},this.canvas=function(){return s()&&c.canvas};},C=b.onRuntimeInitialized;b.onRuntimeInitialized=function(){function s(pe){switch(pe){case ie.srcOver:return "source-over";case ie.screen:return "screen";case ie.overlay:return "overlay";case ie.darken:return "darken";case ie.lighten:return "lighten";case ie.colorDodge:return "color-dodge";case ie.colorBurn:return "color-burn";case ie.hardLight:return "hard-light";case ie.softLight:return "soft-light";case ie.difference:return "difference";case ie.exclusion:return "exclusion";case ie.multiply:return "multiply";case ie.hue:return "hue";case ie.saturation:return "saturation";case ie.color:return "color";case ie.luminosity:return "luminosity"}}function c(pe){return "rgba("+((16711680&pe)>>>16)+","+((65280&pe)>>>8)+","+((255&pe)>>>0)+","+((4278190080&pe)>>>24)/255+")"}function v(){0<rt.length&&(M.Nb(Se.drawWidth(),Se.drawHeight(),rt,Pt,Qt),rt=[],Qt=Pt=0,Se.reset(512,512));for(const pe of Ue){for(const ke of pe.I)ke();pe.I=[];}Ue.clear();}C&&C();var w=b.RenderPaintStyle;const P=b.RenderPath,z=b.RenderPaint,Y=b.Renderer,q=b.StrokeCap,se=b.StrokeJoin,ie=b.BlendMode,ge=w.fill,Ae=w.stroke,Ee=b.FillRule.evenOdd;let J=1;var ve=b.RenderImage.extend("CanvasRenderImage",{__construct:function({la:pe,wa:ke}={}){this.__parent.__construct.call(this),this.Ja=J,J=J+1&2147483647||1,this.la=pe,this.wa=ke;},__destruct:function(){this.Ia&&(M.Kb(this.Ia),URL.revokeObjectURL(this.Wa)),this.__parent.__destruct.call(this);},decode:function(pe){var ke=this;ke.wa&&ke.wa(ke);var We=new Image;ke.Wa=URL.createObjectURL(new Blob([pe],{type:"image/png"})),We.onload=function(){ke.Db=We,ke.Ia=M.Jb(We),ke.size(We.width,We.height),ke.la&&ke.la(ke);},We.src=ke.Wa;}}),fe=P.extend("CanvasRenderPath",{__construct:function(){this.__parent.__construct.call(this),this.U=new Path2D;},rewind:function(){this.U=new Path2D;},addPath:function(pe,ke,We,ze,Ze,He,je){var nt=this.U,Pn=nt.addPath;pe=pe.U;const xt=new DOMMatrix;xt.a=ke,xt.b=We,xt.c=ze,xt.d=Ze,xt.e=He,xt.f=je,Pn.call(nt,pe,xt);},fillRule:function(pe){this.Va=pe;},moveTo:function(pe,ke){this.U.moveTo(pe,ke);},lineTo:function(pe,ke){this.U.lineTo(pe,ke);},cubicTo:function(pe,ke,We,ze,Ze,He){this.U.bezierCurveTo(pe,ke,We,ze,Ze,He);},close:function(){this.U.closePath();}}),Be=z.extend("CanvasRenderPaint",{color:function(pe){this.Xa=c(pe);},thickness:function(pe){this.Gb=pe;},join:function(pe){switch(pe){case se.miter:this.Ha="miter";break;case se.round:this.Ha="round";break;case se.bevel:this.Ha="bevel";}},cap:function(pe){switch(pe){case q.butt:this.Ga="butt";break;case q.round:this.Ga="round";break;case q.square:this.Ga="square";}},style:function(pe){this.Fb=pe;},blendMode:function(pe){this.Cb=s(pe);},clearGradient:function(){this.ja=null;},linearGradient:function(pe,ke,We,ze){this.ja={xb:pe,yb:ke,cb:We,eb:ze,Qa:[]};},radialGradient:function(pe,ke,We,ze){this.ja={xb:pe,yb:ke,cb:We,eb:ze,Qa:[],ac:true};},addStop:function(pe,ke){this.ja.Qa.push({color:pe,stop:ke});},completeGradient:function(){},draw:function(pe,ke,We,ze){let Ze=this.Fb;var He=this.Xa,je=this.ja;const nt=pe.globalCompositeOperation,Pn=pe.globalAlpha;if(pe.globalCompositeOperation=this.Cb,pe.globalAlpha=ze,je!=null){He=je.xb;const Zt=je.yb,At=je.cb;var xt=je.eb;ze=je.Qa,je.ac?(je=At-He,xt-=Zt,He=pe.createRadialGradient(He,Zt,0,He,Zt,Math.sqrt(je*je+xt*xt))):He=pe.createLinearGradient(He,Zt,At,xt);for(let qr=0,ha=ze.length;qr<ha;qr++)je=ze[qr],He.addColorStop(je.stop,c(je.color));this.Xa=He,this.ja=null;}switch(Ze){case Ae:pe.strokeStyle=He,pe.lineWidth=this.Gb,pe.lineCap=this.Ga,pe.lineJoin=this.Ha,pe.stroke(ke);break;case ge:pe.fillStyle=He,pe.fill(ke,We);}pe.globalCompositeOperation=nt,pe.globalAlpha=Pn;}});const Ue=new Set;let Se=null,rt=[],Pt=0,Qt=0;var xr=b.CanvasRenderer=Y.extend("Renderer",{__construct:function(pe){this.__parent.__construct.call(this),this.T=[1,0,0,1,0,0],this.G=[1],this.B=pe.getContext("2d"),this.Ua=pe,this.I=[];},save:function(){this.T.push(...this.T.slice(this.T.length-6)),this.G.push(this.G[this.G.length-1]),this.I.push(this.B.save.bind(this.B));},restore:function(){const pe=this.T.length-6;if(6>pe)throw "restore() called without matching save().";this.T.splice(pe),this.G.pop(),this.I.push(this.B.restore.bind(this.B));},transform:function(pe,ke,We,ze,Ze,He){const je=this.T,nt=je.length-6;je.splice(nt,6,je[nt]*pe+je[nt+2]*ke,je[nt+1]*pe+je[nt+3]*ke,je[nt]*We+je[nt+2]*ze,je[nt+1]*We+je[nt+3]*ze,je[nt]*Ze+je[nt+2]*He+je[nt+4],je[nt+1]*Ze+je[nt+3]*He+je[nt+5]),this.I.push(this.B.transform.bind(this.B,pe,ke,We,ze,Ze,He));},rotate:function(pe){const ke=Math.sin(pe);pe=Math.cos(pe),this.transform(pe,ke,-ke,pe,0,0);},modulateOpacity:function(pe){this.G[this.G.length-1]*=pe;},_drawPath:function(pe,ke){this.I.push(ke.draw.bind(ke,this.B,pe.U,pe.Va===Ee?"evenodd":"nonzero",Math.max(0,this.G[this.G.length-1])));},_drawRiveImage:function(pe,ke,We,ze){var Ze=pe.Db;if(Ze){var He=this.B,je=s(We),nt=Math.max(0,ze*this.G[this.G.length-1]);this.I.push(function(){He.globalCompositeOperation=je,He.globalAlpha=nt,He.drawImage(Ze,0,0),He.globalAlpha=1;});}},_getMatrix:function(pe){const ke=this.T,We=ke.length-6;for(let ze=0;6>ze;++ze)pe[ze]=ke[We+ze];},_drawImageMesh:function(pe,ke,We,ze,Ze,He,je,nt,Pn,xt,Zt){ke=this.B.canvas.width;var At=this.B.canvas.height;const qr=xt-nt,ha=Zt-Pn;nt=Math.max(nt,0),Pn=Math.max(Pn,0),xt=Math.min(xt,ke),Zt=Math.min(Zt,At);const Yo=xt-nt,qo=Zt-Pn;if(console.assert(Yo<=Math.min(qr,ke)),console.assert(qo<=Math.min(ha,At)),!(0>=Yo||0>=qo)){xt=Yo<qr||qo<ha,ke=Zt=1;var wr=Math.ceil(Yo*Zt),Cr=Math.ceil(qo*ke);At=M.bc(),wr>At&&(Zt*=At/wr,wr=At),Cr>At&&(ke*=At/Cr,Cr=At),Se||(Se=new b.DynamicRectanizer(At),Se.reset(512,512)),At=Se.addRect(wr,Cr),0>At&&(v(),Ue.add(this),At=Se.addRect(wr,Cr),console.assert(0<=At));var hp=At&65535,mp=At>>16;rt.push({ha:this.T.slice(this.T.length-6),image:pe,Za:hp,$a:mp,cc:nt,dc:Pn,uc:wr,jb:Cr,Aa:Zt,Ba:ke,Ta:new Float32Array(Ze),Bb:new Float32Array(He),indices:new Uint16Array(je),hc:xt,vb:pe.Ja<<1|(xt?1:0)}),Pt+=Ze.length,Qt+=je.length;var Xr=this.B,Wv=s(We),Hv=Math.max(0,ze*this.G[this.G.length-1]);this.I.push(function(){Xr.save(),Xr.resetTransform(),Xr.globalCompositeOperation=Wv,Xr.globalAlpha=Hv;const gp=M.canvas();gp&&Xr.drawImage(gp,hp,mp,wr,Cr,nt,Pn,Yo,qo),Xr.restore();});}},_clipPath:function(pe){this.I.push(this.B.clip.bind(this.B,pe.U,pe.Va===Ee?"evenodd":"nonzero"));},clear:function(){Ue.add(this),this.I.push(this.B.clearRect.bind(this.B,0,0,this.Ua.width,this.Ua.height));},flush:function(){},translate:function(pe,ke){this.transform(1,0,0,1,pe,ke);}});b.makeRenderer=function(pe){const ke=new xr(pe),We=ke.B;return new Proxy(ke,{get(ze,Ze){if(typeof ze[Ze]=="function")return function(...He){return ze[Ze].apply(ze,He)};if(typeof We[Ze]=="function"){if(-1<N.indexOf(Ze))throw Error("RiveException: Method call to '"+Ze+"()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.");return function(...He){ke.I.push(We[Ze].bind(We,...He));}}return ze[Ze]},set(ze,Ze,He){if(Ze in We)return ke.I.push(()=>{We[Ze]=He;}),true}})},b.decodeImage=function(pe,ke){new ve({la:ke}).decode(pe);},b.renderFactory={makeRenderPaint:function(){return new Be},makeRenderPath:function(){return new fe},makeRenderImage:function(){let pe=Tn;return new ve({wa:()=>{pe.total++;},la:()=>{if(pe.loaded++,pe.loaded===pe.total){const ke=pe.ready;ke&&(ke(),pe.ready=null);}}})}};let qe=b.load,Tn=null;b.load=function(pe,ke,We=true){const ze=new b.FallbackFileAssetLoader;return ke!==void 0&&ze.addLoader(ke),We&&(ke=new b.CDNFileAssetLoader,ze.addLoader(ke)),new Promise(function(Ze){let He=null;Tn={total:0,loaded:0,ready:function(){Ze(He);}},He=qe(pe,ze),Tn.total==0&&Ze(He);})};let Uv=b.RendererWrapper.prototype.align;b.RendererWrapper.prototype.align=function(pe,ke,We,ze,Ze=1){Uv.call(this,pe,ke,We,ze,Ze);},w=new F,b.requestAnimationFrame=w.requestAnimationFrame.bind(w),b.cancelAnimationFrame=w.cancelAnimationFrame.bind(w),b.enableFPSCounter=w.Ob.bind(w),b.disableFPSCounter=w.Lb,w.ob=v,b.resolveAnimationFrame=v,b.cleanup=function(){Se&&Se.delete();};};var E=Object.assign({},b),B="./this.program",G="",K,D;(T||L)&&(L?G=self.location.href:typeof document<"u"&&document.currentScript&&(G=document.currentScript.src),h&&(G=h),G.startsWith("blob:")?G="":G=G.substr(0,G.replace(/[?#].*/,"").lastIndexOf("/")+1),L&&(D=s=>{var c=new XMLHttpRequest;return c.open("GET",s,false),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),K=(s,c,v)=>{if(Ht(s)){var w=new XMLHttpRequest;w.open("GET",s,true),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?c(w.response):v();},w.onerror=v,w.send(null);}else fetch(s,{credentials:"same-origin"}).then(P=>P.ok?P.arrayBuffer():Promise.reject(Error(P.status+" : "+P.url))).then(c,v);});var Z=b.print||console.log.bind(console),W=b.printErr||console.error.bind(console);Object.assign(b,E),E=null,b.thisProgram&&(B=b.thisProgram);var te;b.wasmBinary&&(te=b.wasmBinary);var re,ne=false,oe,V,Q,O,j,X,de,ce;function le(){var s=re.buffer;b.HEAP8=oe=new Int8Array(s),b.HEAP16=Q=new Int16Array(s),b.HEAPU8=V=new Uint8Array(s),b.HEAPU16=O=new Uint16Array(s),b.HEAP32=j=new Int32Array(s),b.HEAPU32=X=new Uint32Array(s),b.HEAPF32=de=new Float32Array(s),b.HEAPF64=ce=new Float64Array(s);}var ye=[],Ie=[],ut=[];function ht(){var s=b.preRun.shift();ye.unshift(s);}var pt=0,It=null;function Wt(s){throw b.onAbort?.(s),s="Aborted("+s+")",W(s),ne=true,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),_(s),s}var Rt=s=>s.startsWith("data:application/octet-stream;base64,"),Ht=s=>s.startsWith("file://"),tt;function De(s){if(s==tt&&te)return new Uint8Array(te);if(D)return D(s);throw "both async and sync fetching of the wasm failed"}function gn(s){return te?Promise.resolve().then(()=>De(s)):new Promise((c,v)=>{K(s,w=>c(new Uint8Array(w)),()=>{try{c(De(s));}catch(w){v(w);}});})}function bn(s,c,v){return gn(s).then(w=>WebAssembly.instantiate(w,c)).then(v,w=>{W(`failed to asynchronously prepare wasm: ${w}`),Wt(w);})}function mt(s,c){var v=tt;return te||typeof WebAssembly.instantiateStreaming!="function"||Rt(v)||Ht(v)||typeof fetch!="function"?bn(v,s,c):fetch(v,{credentials:"same-origin"}).then(w=>WebAssembly.instantiateStreaming(w,s).then(c,function(P){return W(`wasm streaming compile failed: ${P}`),W("falling back to ArrayBuffer instantiation"),bn(v,s,c)}))}var St,Vt,An={490930:(s,c,v,w,P)=>{if(typeof window>"u"||(window.AudioContext||window.webkitAudioContext)===void 0)return 0;if(typeof window.h>"u"){window.h={za:0},window.h.J={},window.h.J.xa=s,window.h.J.capture=c,window.h.J.Ka=v,window.h.ga={},window.h.ga.stopped=w,window.h.ga.wb=P;let z=window.h;z.D=[],z.sc=function(Y){for(var q=0;q<z.D.length;++q)if(z.D[q]==null)return z.D[q]=Y,q;return z.D.push(Y),z.D.length-1},z.Ab=function(Y){for(z.D[Y]=null;0<z.D.length&&z.D[z.D.length-1]==null;)z.D.pop();},z.Pc=function(Y){for(var q=0;q<z.D.length;++q)if(z.D[q]==Y)return z.Ab(q)},z.qa=function(Y){return z.D[Y]},z.Sa=["touchend","click"],z.unlock=function(){for(var Y=0;Y<z.D.length;++Y){var q=z.D[Y];q!=null&&q.L!=null&&q.state===z.ga.wb&&q.L.resume().then(()=>{sp(q.pb);},se=>{console.error("Failed to resume audiocontext",se);});}z.Sa.map(function(se){document.removeEventListener(se,z.unlock,true);});},z.Sa.map(function(Y){document.addEventListener(Y,z.unlock,true);});}return window.h.za+=1,1},493108:()=>{typeof window.h<"u"&&(window.h.Sa.map(function(s){document.removeEventListener(s,window.h.unlock,true);}),--window.h.za,window.h.za===0&&delete window.h);},493412:()=>navigator.mediaDevices!==void 0&&navigator.mediaDevices.getUserMedia!==void 0,493516:()=>{try{var s=new(window.AudioContext||window.webkitAudioContext),c=s.sampleRate;return s.close(),c}catch{return 0}},493687:(s,c,v,w,P,z)=>{if(typeof window.h>"u")return  -1;var Y={},q={};return s==window.h.J.xa&&v!=0&&(q.sampleRate=v),Y.L=new(window.AudioContext||window.webkitAudioContext)(q),Y.L.suspend(),Y.state=window.h.ga.stopped,v=0,s!=window.h.J.xa&&(v=c),Y.Z=Y.L.createScriptProcessor(w,v,c),Y.Z.onaudioprocess=function(se){if((Y.ra==null||Y.ra.length==0)&&(Y.ra=new Float32Array(de.buffer,P,w*c)),s==window.h.J.capture||s==window.h.J.Ka){for(var ie=0;ie<c;ie+=1)for(var ge=se.inputBuffer.getChannelData(ie),Ae=Y.ra,Ee=0;Ee<w;Ee+=1)Ae[Ee*c+ie]=ge[Ee];lp(z,w,P);}if(s==window.h.J.xa||s==window.h.J.Ka)for(cp(z,w,P),ie=0;ie<se.outputBuffer.numberOfChannels;++ie)for(ge=se.outputBuffer.getChannelData(ie),Ae=Y.ra,Ee=0;Ee<w;Ee+=1)ge[Ee]=Ae[Ee*c+ie];else for(ie=0;ie<se.outputBuffer.numberOfChannels;++ie)se.outputBuffer.getChannelData(ie).fill(0);},s!=window.h.J.capture&&s!=window.h.J.Ka||navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(function(se){Y.Ca=Y.L.createMediaStreamSource(se),Y.Ca.connect(Y.Z),Y.Z.connect(Y.L.destination);}).catch(function(se){console.log("Failed to get user media: "+se);}),s==window.h.J.xa&&Y.Z.connect(Y.L.destination),Y.pb=z,window.h.sc(Y)},496564:s=>window.h.qa(s).L.sampleRate,496637:s=>{s=window.h.qa(s),s.Z!==void 0&&(s.Z.onaudioprocess=function(){},s.Z.disconnect(),s.Z=void 0),s.Ca!==void 0&&(s.Ca.disconnect(),s.Ca=void 0),s.L.close(),s.L=void 0,s.pb=void 0;},497037:s=>{window.h.Ab(s);},497087:s=>{s=window.h.qa(s),s.L.resume(),s.state=window.h.ga.wb;},497226:s=>{s=window.h.qa(s),s.L.suspend(),s.state=window.h.ga.stopped;}},tn=s=>{for(;0<s.length;)s.shift()(b);};function k(){var s=j[+zo>>2];return zo+=4,s}var u=(s,c)=>{for(var v=0,w=s.length-1;0<=w;w--){var P=s[w];P==="."?s.splice(w,1):P===".."?(s.splice(w,1),v++):v&&(s.splice(w,1),v--);}if(c)for(;v;v--)s.unshift("..");return s},m=s=>{var c=s.charAt(0)==="/",v=s.substr(-1)==="/";return (s=u(s.split("/").filter(w=>!!w),!c).join("/"))||c||(s="."),s&&v&&(s+="/"),(c?"/":"")+s},A=s=>{var c=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(s).slice(1);return s=c[0],c=c[1],!s&&!c?".":(c&&(c=c.substr(0,c.length-1)),s+c)},U=s=>{if(s==="/")return "/";s=m(s),s=s.replace(/\/$/,"");var c=s.lastIndexOf("/");return c===-1?s:s.substr(c+1)},H=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return s=>crypto.getRandomValues(s);Wt("initRandomDevice");},ee=s=>(ee=H())(s),ue=(...s)=>{for(var c="",v=false,w=s.length-1;-1<=w&&!v;w--){if(v=0<=w?s[w]:"/",typeof v!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!v)return "";c=v+"/"+c,v=v.charAt(0)==="/";}return c=u(c.split("/").filter(P=>!!P),!v).join("/"),(v?"/":"")+c||"."},xe=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,be=(s,c,v)=>{var w=c+v;for(v=c;s[v]&&!(v>=w);)++v;if(16<v-c&&s.buffer&&xe)return xe.decode(s.subarray(c,v));for(w="";c<v;){var P=s[c++];if(P&128){var z=s[c++]&63;if((P&224)==192)w+=String.fromCharCode((P&31)<<6|z);else {var Y=s[c++]&63;P=(P&240)==224?(P&15)<<12|z<<6|Y:(P&7)<<18|z<<12|Y<<6|s[c++]&63,65536>P?w+=String.fromCharCode(P):(P-=65536,w+=String.fromCharCode(55296|P>>10,56320|P&1023));}}else w+=String.fromCharCode(P);}return w},Ce=[],Qe=s=>{for(var c=0,v=0;v<s.length;++v){var w=s.charCodeAt(v);127>=w?c++:2047>=w?c+=2:55296<=w&&57343>=w?(c+=4,++v):c+=3;}return c},at=(s,c,v,w)=>{if(!(0<w))return 0;var P=v;w=v+w-1;for(var z=0;z<s.length;++z){var Y=s.charCodeAt(z);if(55296<=Y&&57343>=Y){var q=s.charCodeAt(++z);Y=65536+((Y&1023)<<10)|q&1023;}if(127>=Y){if(v>=w)break;c[v++]=Y;}else {if(2047>=Y){if(v+1>=w)break;c[v++]=192|Y>>6;}else {if(65535>=Y){if(v+2>=w)break;c[v++]=224|Y>>12;}else {if(v+3>=w)break;c[v++]=240|Y>>18,c[v++]=128|Y>>12&63;}c[v++]=128|Y>>6&63;}c[v++]=128|Y&63;}}return c[v]=0,v-P};function Ke(s,c){var v=Array(Qe(s)+1);return s=at(s,v,0,v.length),c&&(v.length=s),v}var Tt=[];function vt(s,c){Tt[s]={input:[],H:[],W:c},vl(s,qt);}var qt={open(s){var c=Tt[s.node.ya];if(!c)throw new _e(43);s.s=c,s.seekable=false;},close(s){s.s.W.pa(s.s);},pa(s){s.s.W.pa(s.s);},read(s,c,v,w){if(!s.s||!s.s.W.ib)throw new _e(60);for(var P=0,z=0;z<w;z++){try{var Y=s.s.W.ib(s.s);}catch{throw new _e(29)}if(Y===void 0&&P===0)throw new _e(6);if(Y==null)break;P++,c[v+z]=Y;}return P&&(s.node.timestamp=Date.now()),P},write(s,c,v,w){if(!s.s||!s.s.W.Na)throw new _e(60);try{for(var P=0;P<w;P++)s.s.W.Na(s.s,c[v+P]);}catch{throw new _e(29)}return w&&(s.node.timestamp=Date.now()),P}},Xt={ib(){e:{if(!Ce.length){var s=null;if(typeof window<"u"&&typeof window.prompt=="function"&&(s=window.prompt("Input: "),s!==null&&(s+=`
`)),!s){s=null;break e}Ce=Ke(s,true);}s=Ce.shift();}return s},Na(s,c){c===null||c===10?(Z(be(s.H,0)),s.H=[]):c!=0&&s.H.push(c);},pa(s){s.H&&0<s.H.length&&(Z(be(s.H,0)),s.H=[]);},Yb(){return {Ac:25856,Cc:5,zc:191,Bc:35387,yc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Zb(){return 0},$b(){return [24,80]}},nn={Na(s,c){c===null||c===10?(W(be(s.H,0)),s.H=[]):c!=0&&s.H.push(c);},pa(s){s.H&&0<s.H.length&&(W(be(s.H,0)),s.H=[]);}};function jn(s,c){var v=s.l?s.l.length:0;v>=c||(c=Math.max(c,v*(1048576>v?2:1.125)>>>0),v!=0&&(c=Math.max(c,256)),v=s.l,s.l=new Uint8Array(c),0<s.v&&s.l.set(v.subarray(0,s.v),0));}var Ne={O:null,V(){return Ne.createNode(null,"/",16895,0)},createNode(s,c,v,w){if((v&61440)===24576||(v&61440)===4096)throw new _e(63);return Ne.O||(Ne.O={dir:{node:{Y:Ne.j.Y,R:Ne.j.R,ka:Ne.j.ka,ua:Ne.j.ua,tb:Ne.j.tb,zb:Ne.j.zb,ub:Ne.j.ub,sb:Ne.j.sb,Da:Ne.j.Da},stream:{ba:Ne.m.ba}},file:{node:{Y:Ne.j.Y,R:Ne.j.R},stream:{ba:Ne.m.ba,read:Ne.m.read,write:Ne.m.write,Ya:Ne.m.Ya,lb:Ne.m.lb,nb:Ne.m.nb}},link:{node:{Y:Ne.j.Y,R:Ne.j.R,ma:Ne.j.ma},stream:{}},ab:{node:{Y:Ne.j.Y,R:Ne.j.R},stream:hv}}),v=Fu(s,c,v,w),(v.mode&61440)===16384?(v.j=Ne.O.dir.node,v.m=Ne.O.dir.stream,v.l={}):(v.mode&61440)===32768?(v.j=Ne.O.file.node,v.m=Ne.O.file.stream,v.v=0,v.l=null):(v.mode&61440)===40960?(v.j=Ne.O.link.node,v.m=Ne.O.link.stream):(v.mode&61440)===8192&&(v.j=Ne.O.ab.node,v.m=Ne.O.ab.stream),v.timestamp=Date.now(),s&&(s.l[c]=v,s.timestamp=v.timestamp),v},Gc(s){return s.l?s.l.subarray?s.l.subarray(0,s.v):new Uint8Array(s.l):new Uint8Array(0)},j:{Y(s){var c={};return c.Ec=(s.mode&61440)===8192?s.id:1,c.Ic=s.id,c.mode=s.mode,c.Lc=1,c.uid=0,c.Hc=0,c.ya=s.ya,(s.mode&61440)===16384?c.size=4096:(s.mode&61440)===32768?c.size=s.v:(s.mode&61440)===40960?c.size=s.link.length:c.size=0,c.wc=new Date(s.timestamp),c.Kc=new Date(s.timestamp),c.Dc=new Date(s.timestamp),c.Hb=4096,c.xc=Math.ceil(c.size/c.Hb),c},R(s,c){if(c.mode!==void 0&&(s.mode=c.mode),c.timestamp!==void 0&&(s.timestamp=c.timestamp),c.size!==void 0&&(c=c.size,s.v!=c))if(c==0)s.l=null,s.v=0;else {var v=s.l;s.l=new Uint8Array(c),v&&s.l.set(v.subarray(0,Math.min(c,s.v))),s.v=c;}},ka(){throw bl[44]},ua(s,c,v,w){return Ne.createNode(s,c,v,w)},tb(s,c,v){if((s.mode&61440)===16384){try{var w=Qi(c,v);}catch{}if(w)for(var P in w.l)throw new _e(55)}delete s.parent.l[s.name],s.parent.timestamp=Date.now(),s.name=v,c.l[v]=s,c.timestamp=s.parent.timestamp;},zb(s,c){delete s.l[c],s.timestamp=Date.now();},ub(s,c){var v=Qi(s,c),w;for(w in v.l)throw new _e(55);delete s.l[c],s.timestamp=Date.now();},sb(s){var c=[".",".."],v;for(v of Object.keys(s.l))c.push(v);return c},Da(s,c,v){return s=Ne.createNode(s,c,41471,0),s.link=v,s},ma(s){if((s.mode&61440)!==40960)throw new _e(28);return s.link}},m:{read(s,c,v,w,P){var z=s.node.l;if(P>=s.node.v)return 0;if(s=Math.min(s.node.v-P,w),8<s&&z.subarray)c.set(z.subarray(P,P+s),v);else for(w=0;w<s;w++)c[v+w]=z[P+w];return s},write(s,c,v,w,P,z){if(c.buffer===oe.buffer&&(z=false),!w)return 0;if(s=s.node,s.timestamp=Date.now(),c.subarray&&(!s.l||s.l.subarray)){if(z)return s.l=c.subarray(v,v+w),s.v=w;if(s.v===0&&P===0)return s.l=c.slice(v,v+w),s.v=w;if(P+w<=s.v)return s.l.set(c.subarray(v,v+w),P),w}if(jn(s,P+w),s.l.subarray&&c.subarray)s.l.set(c.subarray(v,v+w),P);else for(z=0;z<w;z++)s.l[P+z]=c[v+z];return s.v=Math.max(s.v,P+w),w},ba(s,c,v){if(v===1?c+=s.position:v===2&&(s.node.mode&61440)===32768&&(c+=s.node.v),0>c)throw new _e(28);return c},Ya(s,c,v){jn(s.node,c+v),s.node.v=Math.max(s.node.v,c+v);},lb(s,c,v,w,P){if((s.node.mode&61440)!==32768)throw new _e(43);if(s=s.node.l,P&2||s.buffer!==oe.buffer){if((0<v||v+c<s.length)&&(s.subarray?s=s.subarray(v,v+c):s=Array.prototype.slice.call(s,v,v+c)),v=true,Wt(),c=void 0,!c)throw new _e(48);oe.set(s,c);}else v=false,c=s.byteOffset;return {o:c,vc:v}},nb(s,c,v,w){return Ne.m.write(s,c,0,w,v,false),0}}},Gn=(s,c)=>{var v=0;return s&&(v|=365),c&&(v|=146),v},rn=null,Ye={},on=[],dv=1,$o=null,Lu=true,_e=class{constructor(s){this.name="ErrnoError",this.aa=s;}},bl={},uv=class{constructor(){this.h={},this.node=null;}get flags(){return this.h.flags}set flags(s){this.h.flags=s;}get position(){return this.h.position}set position(s){this.h.position=s;}},pv=class{constructor(s,c,v,w){s||(s=this),this.parent=s,this.V=s.V,this.va=null,this.id=dv++,this.name=c,this.mode=v,this.j={},this.m={},this.ya=w;}get read(){return (this.mode&365)===365}set read(s){s?this.mode|=365:this.mode&=-366;}get write(){return (this.mode&146)===146}set write(s){s?this.mode|=146:this.mode&=-147;}};function br(s,c={}){if(s=ue(s),!s)return {path:"",node:null};if(c=Object.assign({hb:true,Pa:0},c),8<c.Pa)throw new _e(32);s=s.split("/").filter(Y=>!!Y);for(var v=rn,w="/",P=0;P<s.length;P++){var z=P===s.length-1;if(z&&c.parent)break;if(v=Qi(v,s[P]),w=m(w+"/"+s[P]),v.va&&(!z||z&&c.hb)&&(v=v.va.root),!z||c.gb){for(z=0;(v.mode&61440)===40960;)if(v=mv(w),w=ue(A(w),v),v=br(w,{Pa:c.Pa+1}).node,40<z++)throw new _e(32)}}return {path:w,node:v}}function Mu(s){for(var c;;){if(s===s.parent)return s=s.V.mb,c?s[s.length-1]!=="/"?`${s}/${c}`:s+c:s;c=c?`${s.name}/${c}`:s.name,s=s.parent;}}function Ru(s,c){for(var v=0,w=0;w<c.length;w++)v=(v<<5)-v+c.charCodeAt(w)|0;return (s+v>>>0)%$o.length}function Qi(s,c){var v=(s.mode&61440)===16384?(v=Zi(s,"x"))?v:s.j.ka?0:2:54;if(v)throw new _e(v);for(v=$o[Ru(s.id,c)];v;v=v.fc){var w=v.name;if(v.parent.id===s.id&&w===c)return v}return s.j.ka(s,c)}function Fu(s,c,v,w){return s=new pv(s,c,v,w),c=Ru(s.parent.id,s.name),s.fc=$o[c],$o[c]=s}function Ou(s){var c=["r","w","rw"][s&3];return s&512&&(c+="w"),c}function Zi(s,c){if(Lu)return 0;if(!c.includes("r")||s.mode&292){if(c.includes("w")&&!(s.mode&146)||c.includes("x")&&!(s.mode&73))return 2}else return 2;return 0}function Nu(s,c){try{return Qi(s,c),20}catch{}return Zi(s,"wx")}function or(s){if(s=on[s],!s)throw new _e(8);return s}function Du(s,c=-1){if(s=Object.assign(new uv,s),c==-1)e:{for(c=0;4096>=c;c++)if(!on[c])break e;throw new _e(33)}return s.X=c,on[c]=s}function fv(s,c=-1){return s=Du(s,c),s.m?.Fc?.(s),s}var hv={open(s){s.m=Ye[s.node.ya].m,s.m.open?.(s);},ba(){throw new _e(70)}};function vl(s,c){Ye[s]={m:c};}function $u(s,c){var v=c==="/";if(v&&rn)throw new _e(10);if(!v&&c){var w=br(c,{hb:false});if(c=w.path,w=w.node,w.va)throw new _e(10);if((w.mode&61440)!==16384)throw new _e(54)}c={type:s,Nc:{},mb:c,ec:[]},s=s.V(c),s.V=c,c.root=s,v?rn=s:w&&(w.va=c,w.V&&w.V.ec.push(c));}function yl(s,c,v){var w=br(s,{parent:true}).node;if(s=U(s),!s||s==="."||s==="..")throw new _e(28);var P=Nu(w,s);if(P)throw new _e(P);if(!w.j.ua)throw new _e(63);return w.j.ua(w,s,c,v)}function Un(s){return yl(s,16895,0)}function ea(s,c,v){typeof v>"u"&&(v=c,c=438),yl(s,c|8192,v);}function xl(s,c){if(!ue(s))throw new _e(44);var v=br(c,{parent:true}).node;if(!v)throw new _e(44);c=U(c);var w=Nu(v,c);if(w)throw new _e(w);if(!v.j.Da)throw new _e(63);v.j.Da(v,c,s);}function mv(s){if(s=br(s).node,!s)throw new _e(44);if(!s.j.ma)throw new _e(28);return ue(Mu(s.parent),s.j.ma(s))}function ta(s,c,v){if(s==="")throw new _e(44);if(typeof c=="string"){var w={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[c];if(typeof w>"u")throw Error(`Unknown file open mode: ${c}`);c=w;}if(v=c&64?(typeof v>"u"?438:v)&4095|32768:0,typeof s=="object")var P=s;else {s=m(s);try{P=br(s,{gb:!(c&131072)}).node;}catch{}}if(w=false,c&64)if(P){if(c&128)throw new _e(20)}else P=yl(s,v,0),w=true;if(!P)throw new _e(44);if((P.mode&61440)===8192&&(c&=-513),c&65536&&(P.mode&61440)!==16384)throw new _e(54);if(!w&&(v=P?(P.mode&61440)===40960?32:(P.mode&61440)===16384&&(Ou(c)!=="r"||c&512)?31:Zi(P,Ou(c)):44))throw new _e(v);if(c&512&&!w){if(v=P,v=typeof v=="string"?br(v,{gb:true}).node:v,!v.j.R)throw new _e(63);if((v.mode&61440)===16384)throw new _e(31);if((v.mode&61440)!==32768)throw new _e(28);if(w=Zi(v,"w"))throw new _e(w);v.j.R(v,{size:0,timestamp:Date.now()});}return c&=-131713,P=Du({node:P,path:Mu(P),flags:c,seekable:true,position:0,m:P.m,tc:[],error:false}),P.m.open&&P.m.open(P),!b.logReadFiles||c&1||(wl||(wl={}),s in wl||(wl[s]=1)),P}function Bu(s,c,v){if(s.X===null)throw new _e(8);if(!s.seekable||!s.m.ba)throw new _e(70);if(v!=0&&v!=1&&v!=2)throw new _e(28);s.position=s.m.ba(s,c,v),s.tc=[];}var zu;function Bo(s,c,v){s=m("/dev/"+s);var w=Gn(!!c,!!v);ju||(ju=64);var P=ju++<<8|0;vl(P,{open(z){z.seekable=false;},close(){v?.buffer?.length&&v(10);},read(z,Y,q,se){for(var ie=0,ge=0;ge<se;ge++){try{var Ae=c();}catch{throw new _e(29)}if(Ae===void 0&&ie===0)throw new _e(6);if(Ae==null)break;ie++,Y[q+ge]=Ae;}return ie&&(z.node.timestamp=Date.now()),ie},write(z,Y,q,se){for(var ie=0;ie<se;ie++)try{v(Y[q+ie]);}catch{throw new _e(29)}return se&&(z.node.timestamp=Date.now()),ie}}),ea(s,w,P);}var ju,vr={},wl,zo=void 0,Vr=(s,c)=>Object.defineProperty(c,"name",{value:s}),Cl=[],Wn=[],Re,En=s=>{if(!s)throw new Re("Cannot use deleted val. handle = "+s);return Wn[s]},_n=s=>{switch(s){case void 0:return 2;case null:return 4;case  true:return 6;case  false:return 8;default:const c=Cl.pop()||Wn.length;return Wn[c]=s,Wn[c+1]=1,c}},Gu=s=>{var c=Error,v=Vr(s,function(w){this.name=s,this.message=w,w=Error(w).stack,w!==void 0&&(this.stack=this.toString()+`
`+w.replace(/^Error(:[^\n]*)?\n/,""));});return v.prototype=Object.create(c.prototype),v.prototype.constructor=v,v.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},v},Uu,Wu,yt=s=>{for(var c="";V[s];)c+=Wu[V[s++]];return c},jo=[],kl=()=>{for(;jo.length;){var s=jo.pop();s.g.fa=false,s.delete();}},Go,Hn={},Sl=(s,c)=>{if(c===void 0)throw new Re("ptr should not be undefined");for(;s.C;)c=s.na(c),s=s.C;return c},yr={},Hu=s=>{s=ap(s);var c=yt(s);return Kn(s),c},Uo=(s,c)=>{var v=yr[s];if(v===void 0)throw s=`${c} has unknown type ${Hu(s)}`,new Re(s);return v},na=()=>{},Al=false,Vu=(s,c,v)=>c===v?s:v.C===void 0?null:(s=Vu(s,c,v.C),s===null?null:v.Mb(s)),Ku={},gv=(s,c)=>(c=Sl(s,c),Hn[c]),Wo,ra=(s,c)=>{if(!c.u||!c.o)throw new Wo("makeClassHandle requires ptr and ptrType");if(!!c.K!=!!c.F)throw new Wo("Both smartPtrType and smartPtr must be specified");return c.count={value:1},Kr(Object.create(s,{g:{value:c,writable:true}}))},Kr=s=>typeof FinalizationRegistry>"u"?(Kr=c=>c,s):(Al=new FinalizationRegistry(c=>{c=c.g,--c.count.value,c.count.value===0&&(c.F?c.K.P(c.F):c.u.i.P(c.o));}),Kr=c=>{var v=c.g;return v.F&&Al.register(c,{g:v},c),c},na=c=>{Al.unregister(c);},Kr(s)),oa={},Ho=s=>{for(;s.length;){var c=s.pop();s.pop()(c);}};function Vo(s){return this.fromWireType(X[s>>2])}var Yr={},ia={},Jt=(s,c,v)=>{function w(q){if(q=v(q),q.length!==s.length)throw new Wo("Mismatched type converter count");for(var se=0;se<s.length;++se)In(s[se],q[se]);}s.forEach(function(q){ia[q]=c;});var P=Array(c.length),z=[],Y=0;c.forEach((q,se)=>{yr.hasOwnProperty(q)?P[se]=yr[q]:(z.push(q),Yr.hasOwnProperty(q)||(Yr[q]=[]),Yr[q].push(()=>{P[se]=yr[q],++Y,Y===z.length&&w(P);}));}),z.length===0&&w(P);};function bv(s,c,v={}){var w=c.name;if(!s)throw new Re(`type "${w}" must have a positive integer typeid pointer`);if(yr.hasOwnProperty(s)){if(v.Wb)return;throw new Re(`Cannot register type '${w}' twice`)}yr[s]=c,delete ia[s],Yr.hasOwnProperty(s)&&(c=Yr[s],delete Yr[s],c.forEach(P=>P()));}function In(s,c,v={}){if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");return bv(s,c,v)}var El=s=>{throw new Re(s.g.u.i.name+" instance already deleted")};function aa(){}var _l=(s,c,v)=>{if(s[c].A===void 0){var w=s[c];s[c]=function(...P){if(!s[c].A.hasOwnProperty(P.length))throw new Re(`Function '${v}' called with an invalid number of arguments (${P.length}) - expects one of (${s[c].A})!`);return s[c].A[P.length].apply(this,P)},s[c].A=[],s[c].A[w.ea]=w;}},Il=(s,c,v)=>{if(b.hasOwnProperty(s)){if(v===void 0||b[s].A!==void 0&&b[s].A[v]!==void 0)throw new Re(`Cannot register public name '${s}' twice`);if(_l(b,s,s),b.hasOwnProperty(v))throw new Re(`Cannot register multiple overloads of a function with the same number of arguments (${v})!`);b[s].A[v]=c;}else b[s]=c,v!==void 0&&(b[s].Mc=v);},vv=s=>{if(s===void 0)return "_unknown";s=s.replace(/[^a-zA-Z0-9_]/g,"$");var c=s.charCodeAt(0);return 48<=c&&57>=c?`_${s}`:s};function yv(s,c,v,w,P,z,Y,q){this.name=s,this.constructor=c,this.N=v,this.P=w,this.C=P,this.Rb=z,this.na=Y,this.Mb=q,this.qb=[];}var sa=(s,c,v)=>{for(;c!==v;){if(!c.na)throw new Re(`Expected null or instance of ${v.name}, got an instance of ${c.name}`);s=c.na(s),c=c.C;}return s};function xv(s,c){if(c===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);return 0}if(!c.g)throw new Re(`Cannot pass "${Ml(c)}" as a ${this.name}`);if(!c.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);return sa(c.g.o,c.g.u.i,this.i)}function wv(s,c){if(c===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);if(this.ta){var v=this.Oa();return s!==null&&s.push(this.P,v),v}return 0}if(!c||!c.g)throw new Re(`Cannot pass "${Ml(c)}" as a ${this.name}`);if(!c.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.sa&&c.g.u.sa)throw new Re(`Cannot convert argument of type ${c.g.K?c.g.K.name:c.g.u.name} to parameter type ${this.name}`);if(v=sa(c.g.o,c.g.u.i,this.i),this.ta){if(c.g.F===void 0)throw new Re("Passing raw pointer to smart pointer is illegal");switch(this.nc){case 0:if(c.g.K===this)v=c.g.F;else throw new Re(`Cannot convert argument of type ${c.g.K?c.g.K.name:c.g.u.name} to parameter type ${this.name}`);break;case 1:v=c.g.F;break;case 2:if(c.g.K===this)v=c.g.F;else {var w=c.clone();v=this.jc(v,_n(()=>w.delete())),s!==null&&s.push(this.P,v);}break;default:throw new Re("Unsupporting sharing policy")}}return v}function Cv(s,c){if(c===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);return 0}if(!c.g)throw new Re(`Cannot pass "${Ml(c)}" as a ${this.name}`);if(!c.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);if(c.g.u.sa)throw new Re(`Cannot convert argument of type ${c.g.u.name} to parameter type ${this.name}`);return sa(c.g.o,c.g.u.i,this.i)}function la(s,c,v,w,P,z,Y,q,se,ie,ge){this.name=s,this.i=c,this.Ma=v,this.sa=w,this.ta=P,this.ic=z,this.nc=Y,this.rb=q,this.Oa=se,this.jc=ie,this.P=ge,P||c.C!==void 0?this.toWireType=wv:(this.toWireType=w?xv:Cv,this.M=null);}var Yu=(s,c,v)=>{if(!b.hasOwnProperty(s))throw new Wo("Replacing nonexistent public symbol");b[s].A!==void 0&&v!==void 0?b[s].A[v]=c:(b[s]=c,b[s].ea=v);},ca=[],qu,Tl=s=>{var c=ca[s];return c||(s>=ca.length&&(ca.length=s+1),ca[s]=c=qu.get(s)),c},kv=(s,c,v=[])=>(s.includes("j")?(s=s.replace(/p/g,"i"),c=(0, b["dynCall_"+s])(c,...v)):c=Tl(c)(...v),c),Sv=(s,c)=>(...v)=>kv(s,c,v),Nt=(s,c)=>{s=yt(s);var v=s.includes("j")?Sv(s,c):Tl(c);if(typeof v!="function")throw new Re(`unknown function pointer with signature ${s}: ${c}`);return v},Xu,Vn=(s,c)=>{function v(z){P[z]||yr[z]||(ia[z]?ia[z].forEach(v):(w.push(z),P[z]=true));}var w=[],P={};throw c.forEach(v),new Xu(`${s}: `+w.map(Hu).join([", "]))};function Av(s){for(var c=1;c<s.length;++c)if(s[c]!==null&&s[c].M===void 0)return  true;return  false}function da(s,c,v,w,P){var z=c.length;if(2>z)throw new Re("argTypes array size mismatch! Must at least get return value and 'this' types!");var Y=c[1]!==null&&v!==null,q=Av(c),se=c[0].name!=="void",ie=z-2,ge=Array(ie),Ae=[],Ee=[];return Vr(s,function(...J){if(J.length!==ie)throw new Re(`function ${s} called with ${J.length} arguments, expected ${ie}`);if(Ee.length=0,Ae.length=Y?2:1,Ae[0]=P,Y){var ve=c[1].toWireType(Ee,this);Ae[1]=ve;}for(var fe=0;fe<ie;++fe)ge[fe]=c[fe+2].toWireType(Ee,J[fe]),Ae.push(ge[fe]);if(J=w(...Ae),q)Ho(Ee);else for(fe=Y?1:2;fe<c.length;fe++){var Be=fe===1?ve:ge[fe-2];c[fe].M!==null&&c[fe].M(Be);}return ve=se?c[0].fromWireType(J):void 0,ve})}var ua=(s,c)=>{for(var v=[],w=0;w<s;w++)v.push(X[c+4*w>>2]);return v},Pl=s=>{s=s.trim();const c=s.indexOf("(");return c!==-1?s.substr(0,c):s},Ju=(s,c,v)=>{if(!(s instanceof Object))throw new Re(`${v} with invalid "this": ${s}`);if(!(s instanceof c.i.constructor))throw new Re(`${v} incompatible with "this" of type ${s.constructor.name}`);if(!s.g.o)throw new Re(`cannot call emscripten binding method ${v} on deleted object`);return sa(s.g.o,s.g.u.i,c.i)},Ll=s=>{9<s&&--Wn[s+1]===0&&(Wn[s]=void 0,Cl.push(s));},Ev={name:"emscripten::val",fromWireType:s=>{var c=En(s);return Ll(s),c},toWireType:(s,c)=>_n(c),argPackAdvance:8,readValueFromPointer:Vo,M:null},_v=(s,c,v)=>{switch(c){case 1:return v?function(w){return this.fromWireType(oe[w])}:function(w){return this.fromWireType(V[w])};case 2:return v?function(w){return this.fromWireType(Q[w>>1])}:function(w){return this.fromWireType(O[w>>1])};case 4:return v?function(w){return this.fromWireType(j[w>>2])}:function(w){return this.fromWireType(X[w>>2])};default:throw new TypeError(`invalid integer width (${c}): ${s}`)}},Ml=s=>{if(s===null)return "null";var c=typeof s;return c==="object"||c==="array"||c==="function"?s.toString():""+s},Iv=(s,c)=>{switch(c){case 4:return function(v){return this.fromWireType(de[v>>2])};case 8:return function(v){return this.fromWireType(ce[v>>3])};default:throw new TypeError(`invalid float width (${c}): ${s}`)}},Tv=(s,c,v)=>{switch(c){case 1:return v?w=>oe[w]:w=>V[w];case 2:return v?w=>Q[w>>1]:w=>O[w>>1];case 4:return v?w=>j[w>>2]:w=>X[w>>2];default:throw new TypeError(`invalid integer width (${c}): ${s}`)}},Qu=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Pv=(s,c)=>{for(var v=s>>1,w=v+c/2;!(v>=w)&&O[v];)++v;if(v<<=1,32<v-s&&Qu)return Qu.decode(V.subarray(s,v));for(v="",w=0;!(w>=c/2);++w){var P=Q[s+2*w>>1];if(P==0)break;v+=String.fromCharCode(P);}return v},Lv=(s,c,v)=>{if(v??(v=2147483647),2>v)return 0;v-=2;var w=c;v=v<2*s.length?v/2:s.length;for(var P=0;P<v;++P)Q[c>>1]=s.charCodeAt(P),c+=2;return Q[c>>1]=0,c-w},Mv=s=>2*s.length,Rv=(s,c)=>{for(var v=0,w="";!(v>=c/4);){var P=j[s+4*v>>2];if(P==0)break;++v,65536<=P?(P-=65536,w+=String.fromCharCode(55296|P>>10,56320|P&1023)):w+=String.fromCharCode(P);}return w},Fv=(s,c,v)=>{if(v??(v=2147483647),4>v)return 0;var w=c;v=w+v-4;for(var P=0;P<s.length;++P){var z=s.charCodeAt(P);if(55296<=z&&57343>=z){var Y=s.charCodeAt(++P);z=65536+((z&1023)<<10)|Y&1023;}if(j[c>>2]=z,c+=4,c+4>v)break}return j[c>>2]=0,c-w},Ov=s=>{for(var c=0,v=0;v<s.length;++v){var w=s.charCodeAt(v);55296<=w&&57343>=w&&++v,c+=4;}return c},Zu=(s,c,v)=>{var w=[];return s=s.toWireType(w,v),w.length&&(X[c>>2]=_n(w)),s},Nv={},Rl=s=>{var c=Nv[s];return c===void 0?yt(s):c},Fl=[],Dv=s=>{var c=Fl.length;return Fl.push(s),c},$v=(s,c)=>{for(var v=Array(s),w=0;w<s;++w)v[w]=Uo(X[c+4*w>>2],"parameter "+w);return v},Bv=Reflect.construct,Ko=s=>s%4===0&&(s%100!==0||s%400===0),zv=[0,31,60,91,121,152,182,213,244,274,305,335],jv=[0,31,59,90,120,151,181,212,243,273,304,334],Ol=[],Nl={},ep=()=>{if(!Dl){var s={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:B||"./this.program"},c;for(c in Nl)Nl[c]===void 0?delete s[c]:s[c]=Nl[c];var v=[];for(c in s)v.push(`${c}=${s[c]}`);Dl=v;}return Dl},Dl,tp=[31,29,31,30,31,30,31,31,30,31,30,31],np=[31,28,31,30,31,30,31,31,30,31,30,31],rp=(s,c,v,w)=>{function P(J,ve,fe){for(J=typeof J=="number"?J.toString():J||"";J.length<ve;)J=fe[0]+J;return J}function z(J,ve){return P(J,ve,"0")}function Y(J,ve){function fe(Ue){return 0>Ue?-1:0<Ue?1:0}var Be;return (Be=fe(J.getFullYear()-ve.getFullYear()))===0&&(Be=fe(J.getMonth()-ve.getMonth()))===0&&(Be=fe(J.getDate()-ve.getDate())),Be}function q(J){switch(J.getDay()){case 0:return new Date(J.getFullYear()-1,11,29);case 1:return J;case 2:return new Date(J.getFullYear(),0,3);case 3:return new Date(J.getFullYear(),0,2);case 4:return new Date(J.getFullYear(),0,1);case 5:return new Date(J.getFullYear()-1,11,31);case 6:return new Date(J.getFullYear()-1,11,30)}}function se(J){var ve=J.ca;for(J=new Date(new Date(J.da+1900,0,1).getTime());0<ve;){var fe=J.getMonth(),Be=(Ko(J.getFullYear())?tp:np)[fe];if(ve>Be-J.getDate())ve-=Be-J.getDate()+1,J.setDate(1),11>fe?J.setMonth(fe+1):(J.setMonth(0),J.setFullYear(J.getFullYear()+1));else {J.setDate(J.getDate()+ve);break}}return fe=new Date(J.getFullYear()+1,0,4),ve=q(new Date(J.getFullYear(),0,4)),fe=q(fe),0>=Y(ve,J)?0>=Y(fe,J)?J.getFullYear()+1:J.getFullYear():J.getFullYear()-1}var ie=X[w+40>>2];w={qc:j[w>>2],pc:j[w+4>>2],Ea:j[w+8>>2],Ra:j[w+12>>2],Fa:j[w+16>>2],da:j[w+20>>2],S:j[w+24>>2],ca:j[w+28>>2],Oc:j[w+32>>2],oc:j[w+36>>2],rc:ie&&ie?be(V,ie):""},v=v?be(V,v):"",ie={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var ge in ie)v=v.replace(new RegExp(ge,"g"),ie[ge]);var Ae="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Ee="January February March April May June July August September October November December".split(" ");ie={"%a":J=>Ae[J.S].substring(0,3),"%A":J=>Ae[J.S],"%b":J=>Ee[J.Fa].substring(0,3),"%B":J=>Ee[J.Fa],"%C":J=>z((J.da+1900)/100|0,2),"%d":J=>z(J.Ra,2),"%e":J=>P(J.Ra,2," "),"%g":J=>se(J).toString().substring(2),"%G":se,"%H":J=>z(J.Ea,2),"%I":J=>(J=J.Ea,J==0?J=12:12<J&&(J-=12),z(J,2)),"%j":J=>{for(var ve=0,fe=0;fe<=J.Fa-1;ve+=(Ko(J.da+1900)?tp:np)[fe++]);return z(J.Ra+ve,3)},"%m":J=>z(J.Fa+1,2),"%M":J=>z(J.pc,2),"%n":()=>`
`,"%p":J=>0<=J.Ea&&12>J.Ea?"AM":"PM","%S":J=>z(J.qc,2),"%t":()=>"	","%u":J=>J.S||7,"%U":J=>z(Math.floor((J.ca+7-J.S)/7),2),"%V":J=>{var ve=Math.floor((J.ca+7-(J.S+6)%7)/7);if(2>=(J.S+371-J.ca-2)%7&&ve++,ve)ve==53&&(fe=(J.S+371-J.ca)%7,fe==4||fe==3&&Ko(J.da)||(ve=1));else {ve=52;var fe=(J.S+7-J.ca-1)%7;(fe==4||fe==5&&Ko(J.da%400-1))&&ve++;}return z(ve,2)},"%w":J=>J.S,"%W":J=>z(Math.floor((J.ca+7-(J.S+6)%7)/7),2),"%y":J=>(J.da+1900).toString().substring(2),"%Y":J=>J.da+1900,"%z":J=>{J=J.oc;var ve=0<=J;return J=Math.abs(J)/60,(ve?"+":"-")+("0000"+(J/60*100+J%60)).slice(-4)},"%Z":J=>J.rc,"%%":()=>"%"},v=v.replace(/%%/g,"\0\0");for(ge in ie)v.includes(ge)&&(v=v.replace(new RegExp(ge,"g"),ie[ge](w)));return v=v.replace(/\0\0/g,"%"),ge=Ke(v,false),ge.length>c?0:(oe.set(ge,s),ge.length-1)};[44].forEach(s=>{bl[s]=new _e(s),bl[s].stack="<generic error, no stack>";}),$o=Array(4096),$u(Ne,"/"),Un("/tmp"),Un("/home"),Un("/home/web_user"),(function(){Un("/dev"),vl(259,{read:()=>0,write:(w,P,z,Y)=>Y}),ea("/dev/null",259),vt(1280,Xt),vt(1536,nn),ea("/dev/tty",1280),ea("/dev/tty1",1536);var s=new Uint8Array(1024),c=0,v=()=>(c===0&&(c=ee(s).byteLength),s[--c]);Bo("random",v),Bo("urandom",v),Un("/dev/shm"),Un("/dev/shm/tmp");})(),(function(){Un("/proc");var s=Un("/proc/self");Un("/proc/self/fd"),$u({V(){var c=Fu(s,"fd",16895,73);return c.j={ka(v,w){var P=or(+w);return v={parent:null,V:{mb:"fake"},j:{ma:()=>P.path}},v.parent=v}},c}},"/proc/self/fd");})(),Re=b.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError";}},Wn.push(0,1,void 0,1,null,1,true,1,false,1),b.count_emval_handles=()=>Wn.length/2-5-Cl.length,Uu=b.PureVirtualError=Gu("PureVirtualError");for(var op=Array(256),pa=0;256>pa;++pa)op[pa]=String.fromCharCode(pa);Wu=op,b.getInheritedInstanceCount=()=>Object.keys(Hn).length,b.getLiveInheritedInstances=()=>{var s=[],c;for(c in Hn)Hn.hasOwnProperty(c)&&s.push(Hn[c]);return s},b.flushPendingDeletes=kl,b.setDelayFunction=s=>{Go=s,jo.length&&Go&&Go(kl);},Wo=b.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError";}},Object.assign(aa.prototype,{isAliasOf:function(s){if(!(this instanceof aa&&s instanceof aa))return  false;var c=this.g.u.i,v=this.g.o;s.g=s.g;var w=s.g.u.i;for(s=s.g.o;c.C;)v=c.na(v),c=c.C;for(;w.C;)s=w.na(s),w=w.C;return c===w&&v===s},clone:function(){if(this.g.o||El(this),this.g.ia)return this.g.count.value+=1,this;var s=Kr,c=Object,v=c.create,w=Object.getPrototypeOf(this),P=this.g;return s=s(v.call(c,w,{g:{value:{count:P.count,fa:P.fa,ia:P.ia,o:P.o,u:P.u,F:P.F,K:P.K}}})),s.g.count.value+=1,s.g.fa=false,s},delete(){if(this.g.o||El(this),this.g.fa&&!this.g.ia)throw new Re("Object already scheduled for deletion");na(this);var s=this.g;--s.count.value,s.count.value===0&&(s.F?s.K.P(s.F):s.u.i.P(s.o)),this.g.ia||(this.g.F=void 0,this.g.o=void 0);},isDeleted:function(){return !this.g.o},deleteLater:function(){if(this.g.o||El(this),this.g.fa&&!this.g.ia)throw new Re("Object already scheduled for deletion");return jo.push(this),jo.length===1&&Go&&Go(kl),this.g.fa=true,this}}),Object.assign(la.prototype,{Sb(s){return this.rb&&(s=this.rb(s)),s},bb(s){this.P?.(s);},argPackAdvance:8,readValueFromPointer:Vo,fromWireType:function(s){function c(){return this.ta?ra(this.i.N,{u:this.ic,o:v,K:this,F:s}):ra(this.i.N,{u:this,o:s})}var v=this.Sb(s);if(!v)return this.bb(s),null;var w=gv(this.i,v);if(w!==void 0)return w.g.count.value===0?(w.g.o=v,w.g.F=s,w.clone()):(w=w.clone(),this.bb(s),w);if(w=this.i.Rb(v),w=Ku[w],!w)return c.call(this);w=this.sa?w.Ib:w.pointerType;var P=Vu(v,this.i,w.i);return P===null?c.call(this):this.ta?ra(w.i.N,{u:w,o:P,K:this,F:s}):ra(w.i.N,{u:w,o:P})}}),Xu=b.UnboundTypeError=Gu("UnboundTypeError");var ip={__syscall_fcntl64:function(s,c,v){zo=v;try{var w=or(s);switch(c){case 0:var P=k();if(0>P)break;for(;on[P];)P++;return fv(w,P).X;case 1:case 2:return 0;case 3:return w.flags;case 4:return P=k(),w.flags|=P,0;case 12:return P=k(),Q[P+0>>1]=2,0;case 13:case 14:return 0}return -28}catch(z){if(typeof vr>"u"||z.name!=="ErrnoError")throw z;return -z.aa}},__syscall_ioctl:function(s,c,v){zo=v;try{var w=or(s);switch(c){case 21509:return w.s?0:-59;case 21505:if(!w.s)return -59;if(w.s.W.Yb){s=[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var P=k();j[P>>2]=25856,j[P+4>>2]=5,j[P+8>>2]=191,j[P+12>>2]=35387;for(var z=0;32>z;z++)oe[P+z+17]=s[z]||0;}return 0;case 21510:case 21511:case 21512:return w.s?0:-59;case 21506:case 21507:case 21508:if(!w.s)return -59;if(w.s.W.Zb)for(P=k(),s=[],z=0;32>z;z++)s.push(oe[P+z+17]);return 0;case 21519:return w.s?(P=k(),j[P>>2]=0):-59;case 21520:return w.s?-28:-59;case 21531:if(P=k(),!w.m.Xb)throw new _e(59);return w.m.Xb(w,c,P);case 21523:return w.s?(w.s.W.$b&&(z=[24,80],P=k(),Q[P>>1]=z[0],Q[P+2>>1]=z[1]),0):-59;case 21524:return w.s?0:-59;case 21515:return w.s?0:-59;default:return -28}}catch(Y){if(typeof vr>"u"||Y.name!=="ErrnoError")throw Y;return -Y.aa}},__syscall_openat:function(s,c,v,w){zo=w;try{c=c?be(V,c):"";var P=c;if(P.charAt(0)==="/")c=P;else {var z=s===-100?"/":or(s).path;if(P.length==0)throw new _e(44);c=m(z+"/"+P);}var Y=w?k():0;return ta(c,v,Y).X}catch(q){if(typeof vr>"u"||q.name!=="ErrnoError")throw q;return -q.aa}},_abort_js:()=>{Wt("");},_embind_create_inheriting_constructor:(s,c,v)=>{s=yt(s),c=Uo(c,"wrapper"),v=En(v);var w=c.i,P=w.N,z=w.C.N,Y=w.C.constructor;return s=Vr(s,function(...q){w.C.qb.forEach(function(se){if(this[se]===z[se])throw new Uu(`Pure virtual function ${se} must be implemented in JavaScript`)}.bind(this)),Object.defineProperty(this,"__parent",{value:P}),this.__construct(...q);}),P.__construct=function(...q){if(this===P)throw new Re("Pass correct 'this' to __construct");q=Y.implement(this,...q),na(q);var se=q.g;if(q.notifyOnDestruction(),se.ia=true,Object.defineProperties(this,{g:{value:se}}),Kr(this),q=se.o,q=Sl(w,q),Hn.hasOwnProperty(q))throw new Re(`Tried to register registered instance: ${q}`);Hn[q]=this;},P.__destruct=function(){if(this===P)throw new Re("Pass correct 'this' to __destruct");na(this);var q=this.g.o;if(q=Sl(w,q),Hn.hasOwnProperty(q))delete Hn[q];else throw new Re(`Tried to unregister unregistered instance: ${q}`)},s.prototype=Object.create(P),Object.assign(s.prototype,v),_n(s)},_embind_finalize_value_object:s=>{var c=oa[s];delete oa[s];var v=c.Oa,w=c.P,P=c.fb,z=P.map(Y=>Y.Vb).concat(P.map(Y=>Y.lc));Jt([s],z,Y=>{var q={};return P.forEach((se,ie)=>{var ge=Y[ie],Ae=se.Tb,Ee=se.Ub,J=Y[ie+P.length],ve=se.kc,fe=se.mc;q[se.Pb]={read:Be=>ge.fromWireType(Ae(Ee,Be)),write:(Be,Ue)=>{var Se=[];ve(fe,Be,J.toWireType(Se,Ue)),Ho(Se);}};}),[{name:c.name,fromWireType:se=>{var ie={},ge;for(ge in q)ie[ge]=q[ge].read(se);return w(se),ie},toWireType:(se,ie)=>{for(var ge in q)if(!(ge in ie))throw new TypeError(`Missing field: "${ge}"`);var Ae=v();for(ge in q)q[ge].write(Ae,ie[ge]);return se!==null&&se.push(w,Ae),Ae},argPackAdvance:8,readValueFromPointer:Vo,M:w}]});},_embind_register_bigint:()=>{},_embind_register_bool:(s,c,v,w)=>{c=yt(c),In(s,{name:c,fromWireType:function(P){return !!P},toWireType:function(P,z){return z?v:w},argPackAdvance:8,readValueFromPointer:function(P){return this.fromWireType(V[P])},M:null});},_embind_register_class:(s,c,v,w,P,z,Y,q,se,ie,ge,Ae,Ee)=>{ge=yt(ge),z=Nt(P,z),q&&(q=Nt(Y,q)),ie&&(ie=Nt(se,ie)),Ee=Nt(Ae,Ee);var J=vv(ge);Il(J,function(){Vn(`Cannot construct ${ge} due to unbound types`,[w]);}),Jt([s,c,v],w?[w]:[],ve=>{if(ve=ve[0],w)var fe=ve.i,Be=fe.N;else Be=aa.prototype;ve=Vr(ge,function(...Pt){if(Object.getPrototypeOf(this)!==Ue)throw new Re("Use 'new' to construct "+ge);if(Se.$===void 0)throw new Re(ge+" has no accessible constructor");var Qt=Se.$[Pt.length];if(Qt===void 0)throw new Re(`Tried to invoke ctor of ${ge} with invalid number of parameters (${Pt.length}) - expected (${Object.keys(Se.$).toString()}) parameters instead!`);return Qt.apply(this,Pt)});var Ue=Object.create(Be,{constructor:{value:ve}});ve.prototype=Ue;var Se=new yv(ge,ve,Ue,Ee,fe,z,q,ie);if(Se.C){var rt;(rt=Se.C).oa??(rt.oa=[]),Se.C.oa.push(Se);}return fe=new la(ge,Se,true,false,false),rt=new la(ge+"*",Se,false,false,false),Be=new la(ge+" const*",Se,false,true,false),Ku[s]={pointerType:rt,Ib:Be},Yu(J,ve),[fe,rt,Be]});},_embind_register_class_class_function:(s,c,v,w,P,z,Y)=>{var q=ua(v,w);c=yt(c),c=Pl(c),z=Nt(P,z),Jt([],[s],se=>{function ie(){Vn(`Cannot call ${ge} due to unbound types`,q);}se=se[0];var ge=`${se.name}.${c}`;c.startsWith("@@")&&(c=Symbol[c.substring(2)]);var Ae=se.i.constructor;return Ae[c]===void 0?(ie.ea=v-1,Ae[c]=ie):(_l(Ae,c,ge),Ae[c].A[v-1]=ie),Jt([],q,Ee=>{if(Ee=da(ge,[Ee[0],null].concat(Ee.slice(1)),null,z,Y),Ae[c].A===void 0?(Ee.ea=v-1,Ae[c]=Ee):Ae[c].A[v-1]=Ee,se.i.oa)for(const J of se.i.oa)J.constructor.hasOwnProperty(c)||(J.constructor[c]=Ee);return []}),[]});},_embind_register_class_class_property:(s,c,v,w,P,z,Y,q)=>{c=yt(c),z=Nt(P,z),Jt([],[s],se=>{se=se[0];var ie=`${se.name}.${c}`,ge={get(){Vn(`Cannot access ${ie} due to unbound types`,[v]);},enumerable:true,configurable:true};return ge.set=q?()=>{Vn(`Cannot access ${ie} due to unbound types`,[v]);}:()=>{throw new Re(`${ie} is a read-only property`)},Object.defineProperty(se.i.constructor,c,ge),Jt([],[v],Ae=>{Ae=Ae[0];var Ee={get(){return Ae.fromWireType(z(w))},enumerable:true};return q&&(q=Nt(Y,q),Ee.set=J=>{var ve=[];q(w,Ae.toWireType(ve,J)),Ho(ve);}),Object.defineProperty(se.i.constructor,c,Ee),[]}),[]});},_embind_register_class_constructor:(s,c,v,w,P,z)=>{var Y=ua(c,v);P=Nt(w,P),Jt([],[s],q=>{q=q[0];var se=`constructor ${q.name}`;if(q.i.$===void 0&&(q.i.$=[]),q.i.$[c-1]!==void 0)throw new Re(`Cannot register multiple constructors with identical number of parameters (${c-1}) for class '${q.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return q.i.$[c-1]=()=>{Vn(`Cannot construct ${q.name} due to unbound types`,Y);},Jt([],Y,ie=>(ie.splice(1,0,null),q.i.$[c-1]=da(se,ie,null,P,z),[])),[]});},_embind_register_class_function:(s,c,v,w,P,z,Y,q)=>{var se=ua(v,w);c=yt(c),c=Pl(c),z=Nt(P,z),Jt([],[s],ie=>{function ge(){Vn(`Cannot call ${Ae} due to unbound types`,se);}ie=ie[0];var Ae=`${ie.name}.${c}`;c.startsWith("@@")&&(c=Symbol[c.substring(2)]),q&&ie.i.qb.push(c);var Ee=ie.i.N,J=Ee[c];return J===void 0||J.A===void 0&&J.className!==ie.name&&J.ea===v-2?(ge.ea=v-2,ge.className=ie.name,Ee[c]=ge):(_l(Ee,c,Ae),Ee[c].A[v-2]=ge),Jt([],se,ve=>(ve=da(Ae,ve,ie,z,Y),Ee[c].A===void 0?(ve.ea=v-2,Ee[c]=ve):Ee[c].A[v-2]=ve,[])),[]});},_embind_register_class_property:(s,c,v,w,P,z,Y,q,se,ie)=>{c=yt(c),P=Nt(w,P),Jt([],[s],ge=>{ge=ge[0];var Ae=`${ge.name}.${c}`,Ee={get(){Vn(`Cannot access ${Ae} due to unbound types`,[v,Y]);},enumerable:true,configurable:true};return Ee.set=se?()=>Vn(`Cannot access ${Ae} due to unbound types`,[v,Y]):()=>{throw new Re(Ae+" is a read-only property")},Object.defineProperty(ge.i.N,c,Ee),Jt([],se?[v,Y]:[v],J=>{var ve=J[0],fe={get(){var Ue=Ju(this,ge,Ae+" getter");return ve.fromWireType(P(z,Ue))},enumerable:true};if(se){se=Nt(q,se);var Be=J[1];fe.set=function(Ue){var Se=Ju(this,ge,Ae+" setter"),rt=[];se(ie,Se,Be.toWireType(rt,Ue)),Ho(rt);};}return Object.defineProperty(ge.i.N,c,fe),[]}),[]});},_embind_register_emval:s=>In(s,Ev),_embind_register_enum:(s,c,v,w)=>{function P(){}c=yt(c),P.values={},In(s,{name:c,constructor:P,fromWireType:function(z){return this.constructor.values[z]},toWireType:(z,Y)=>Y.value,argPackAdvance:8,readValueFromPointer:_v(c,v,w),M:null}),Il(c,P);},_embind_register_enum_value:(s,c,v)=>{var w=Uo(s,"enum");c=yt(c),s=w.constructor,w=Object.create(w.constructor.prototype,{value:{value:v},constructor:{value:Vr(`${w.name}_${c}`,function(){})}}),s.values[v]=w,s[c]=w;},_embind_register_float:(s,c,v)=>{c=yt(c),In(s,{name:c,fromWireType:w=>w,toWireType:(w,P)=>P,argPackAdvance:8,readValueFromPointer:Iv(c,v),M:null});},_embind_register_function:(s,c,v,w,P,z)=>{var Y=ua(c,v);s=yt(s),s=Pl(s),P=Nt(w,P),Il(s,function(){Vn(`Cannot call ${s} due to unbound types`,Y);},c-1),Jt([],Y,q=>(Yu(s,da(s,[q[0],null].concat(q.slice(1)),null,P,z),c-1),[]));},_embind_register_integer:(s,c,v,w,P)=>{if(c=yt(c),P===-1&&(P=4294967295),P=q=>q,w===0){var z=32-8*v;P=q=>q<<z>>>z;}var Y=c.includes("unsigned")?function(q,se){return se>>>0}:function(q,se){return se};In(s,{name:c,fromWireType:P,toWireType:Y,argPackAdvance:8,readValueFromPointer:Tv(c,v,w!==0),M:null});},_embind_register_memory_view:(s,c,v)=>{function w(z){return new P(oe.buffer,X[z+4>>2],X[z>>2])}var P=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][c];v=yt(v),In(s,{name:v,fromWireType:w,argPackAdvance:8,readValueFromPointer:w},{Wb:true});},_embind_register_std_string:(s,c)=>{c=yt(c);var v=c==="std::string";In(s,{name:c,fromWireType:function(w){var P=X[w>>2],z=w+4;if(v)for(var Y=z,q=0;q<=P;++q){var se=z+q;if(q==P||V[se]==0){if(Y=Y?be(V,Y,se-Y):"",ie===void 0)var ie=Y;else ie+="\0",ie+=Y;Y=se+1;}}else {for(ie=Array(P),q=0;q<P;++q)ie[q]=String.fromCharCode(V[z+q]);ie=ie.join("");}return Kn(w),ie},toWireType:function(w,P){P instanceof ArrayBuffer&&(P=new Uint8Array(P));var z=typeof P=="string";if(!(z||P instanceof Uint8Array||P instanceof Uint8ClampedArray||P instanceof Int8Array))throw new Re("Cannot pass non-string to std::string");var Y=v&&z?Qe(P):P.length,q=$l(4+Y+1),se=q+4;if(X[q>>2]=Y,v&&z)at(P,V,se,Y+1);else if(z)for(z=0;z<Y;++z){var ie=P.charCodeAt(z);if(255<ie)throw Kn(se),new Re("String has UTF-16 code units that do not fit in 8 bits");V[se+z]=ie;}else for(z=0;z<Y;++z)V[se+z]=P[z];return w!==null&&w.push(Kn,q),q},argPackAdvance:8,readValueFromPointer:Vo,M(w){Kn(w);}});},_embind_register_std_wstring:(s,c,v)=>{if(v=yt(v),c===2)var w=Pv,P=Lv,z=Mv,Y=q=>O[q>>1];else c===4&&(w=Rv,P=Fv,z=Ov,Y=q=>X[q>>2]);In(s,{name:v,fromWireType:q=>{for(var se=X[q>>2],ie,ge=q+4,Ae=0;Ae<=se;++Ae){var Ee=q+4+Ae*c;(Ae==se||Y(Ee)==0)&&(ge=w(ge,Ee-ge),ie===void 0?ie=ge:(ie+="\0",ie+=ge),ge=Ee+c);}return Kn(q),ie},toWireType:(q,se)=>{if(typeof se!="string")throw new Re(`Cannot pass non-string to C++ string type ${v}`);var ie=z(se),ge=$l(4+ie+c);return X[ge>>2]=ie/c,P(se,ge+4,ie+c),q!==null&&q.push(Kn,ge),ge},argPackAdvance:8,readValueFromPointer:Vo,M(q){Kn(q);}});},_embind_register_value_object:(s,c,v,w,P,z)=>{oa[s]={name:yt(c),Oa:Nt(v,w),P:Nt(P,z),fb:[]};},_embind_register_value_object_field:(s,c,v,w,P,z,Y,q,se,ie)=>{oa[s].fb.push({Pb:yt(c),Vb:v,Tb:Nt(w,P),Ub:z,lc:Y,kc:Nt(q,se),mc:ie});},_embind_register_void:(s,c)=>{c=yt(c),In(s,{Jc:true,name:c,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}});},_emscripten_get_now_is_monotonic:()=>1,_emscripten_memcpy_js:(s,c,v)=>V.copyWithin(s,c,c+v),_emscripten_throw_longjmp:()=>{throw 1/0},_emval_as:(s,c,v)=>(s=En(s),c=Uo(c,"emval::as"),Zu(c,v,s)),_emval_call_method:(s,c,v,w,P)=>(s=Fl[s],c=En(c),v=Rl(v),s(c,c[v],w,P)),_emval_decref:Ll,_emval_get_method_caller:(s,c,v)=>{var w=$v(s,c),P=w.shift();s--;var z=Array(s);return c=`methodCaller<(${w.map(Y=>Y.name).join(", ")}) => ${P.name}>`,Dv(Vr(c,(Y,q,se,ie)=>{for(var ge=0,Ae=0;Ae<s;++Ae)z[Ae]=w[Ae].readValueFromPointer(ie+ge),ge+=w[Ae].argPackAdvance;return Y=v===1?Bv(q,z):q.apply(Y,z),Zu(P,se,Y)}))},_emval_get_module_property:s=>(s=Rl(s),_n(b[s])),_emval_get_property:(s,c)=>(s=En(s),c=En(c),_n(s[c])),_emval_incref:s=>{9<s&&(Wn[s+1]+=1);},_emval_new_array:()=>_n([]),_emval_new_cstring:s=>_n(Rl(s)),_emval_new_object:()=>_n({}),_emval_run_destructors:s=>{var c=En(s);Ho(c),Ll(s);},_emval_set_property:(s,c,v)=>{s=En(s),c=En(c),v=En(v),s[c]=v;},_emval_take_value:(s,c)=>(s=Uo(s,"_emval_take_value"),s=s.readValueFromPointer(c),_n(s)),_gmtime_js:function(s,c,v){s=new Date(1e3*(c+2097152>>>0<4194305-!!s?(s>>>0)+4294967296*c:NaN)),j[v>>2]=s.getUTCSeconds(),j[v+4>>2]=s.getUTCMinutes(),j[v+8>>2]=s.getUTCHours(),j[v+12>>2]=s.getUTCDate(),j[v+16>>2]=s.getUTCMonth(),j[v+20>>2]=s.getUTCFullYear()-1900,j[v+24>>2]=s.getUTCDay(),j[v+28>>2]=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0;},_localtime_js:function(s,c,v){s=new Date(1e3*(c+2097152>>>0<4194305-!!s?(s>>>0)+4294967296*c:NaN)),j[v>>2]=s.getSeconds(),j[v+4>>2]=s.getMinutes(),j[v+8>>2]=s.getHours(),j[v+12>>2]=s.getDate(),j[v+16>>2]=s.getMonth(),j[v+20>>2]=s.getFullYear()-1900,j[v+24>>2]=s.getDay(),j[v+28>>2]=(Ko(s.getFullYear())?zv:jv)[s.getMonth()]+s.getDate()-1|0,j[v+36>>2]=-(60*s.getTimezoneOffset()),c=new Date(s.getFullYear(),6,1).getTimezoneOffset();var w=new Date(s.getFullYear(),0,1).getTimezoneOffset();j[v+32>>2]=(c!=w&&s.getTimezoneOffset()==Math.min(w,c))|0;},_tzset_js:(s,c,v,w)=>{var P=new Date().getFullYear(),z=new Date(P,0,1),Y=new Date(P,6,1);P=z.getTimezoneOffset();var q=Y.getTimezoneOffset();X[s>>2]=60*Math.max(P,q),j[c>>2]=+(P!=q),s=se=>se.toLocaleTimeString(void 0,{hour12:false,timeZoneName:"short"}).split(" ")[1],z=s(z),Y=s(Y),q<P?(at(z,V,v,17),at(Y,V,w,17)):(at(z,V,w,17),at(Y,V,v,17));},emscripten_asm_const_int:(s,c,v)=>{Ol.length=0;for(var w;w=V[c++];){var P=w!=105;P&=w!=112,v+=P&&v%8?4:0,Ol.push(w==112?X[v>>2]:w==105?j[v>>2]:ce[v>>3]),v+=P?8:4;}return An[s](...Ol)},emscripten_date_now:()=>Date.now(),emscripten_get_now:()=>performance.now(),emscripten_resize_heap:s=>{var c=V.length;if(s>>>=0,2147483648<s)return  false;for(var v=1;4>=v;v*=2){var w=c*(1+.2/v);w=Math.min(w,s+100663296);var P=Math;w=Math.max(s,w);e:{P=(P.min.call(P,2147483648,w+(65536-w%65536)%65536)-re.buffer.byteLength+65535)/65536;try{re.grow(P),le();var z=1;break e}catch{}z=void 0;}if(z)return  true}return  false},environ_get:(s,c)=>{var v=0;return ep().forEach((w,P)=>{var z=c+v;for(P=X[s+4*P>>2]=z,z=0;z<w.length;++z)oe[P++]=w.charCodeAt(z);oe[P]=0,v+=w.length+1;}),0},environ_sizes_get:(s,c)=>{var v=ep();X[s>>2]=v.length;var w=0;return v.forEach(P=>w+=P.length+1),X[c>>2]=w,0},fd_close:function(s){try{var c=or(s);if(c.X===null)throw new _e(8);c.La&&(c.La=null);try{c.m.close&&c.m.close(c);}catch(v){throw v}finally{on[c.X]=null;}return c.X=null,0}catch(v){if(typeof vr>"u"||v.name!=="ErrnoError")throw v;return v.aa}},fd_read:function(s,c,v,w){try{e:{var P=or(s);s=c;for(var z,Y=c=0;Y<v;Y++){var q=X[s>>2],se=X[s+4>>2];s+=8;var ie=P,ge=z,Ae=oe;if(0>se||0>ge)throw new _e(28);if(ie.X===null)throw new _e(8);if((ie.flags&2097155)===1)throw new _e(8);if((ie.node.mode&61440)===16384)throw new _e(31);if(!ie.m.read)throw new _e(28);var Ee=typeof ge<"u";if(!Ee)ge=ie.position;else if(!ie.seekable)throw new _e(70);var J=ie.m.read(ie,Ae,q,se,ge);Ee||(ie.position+=J);var ve=J;if(0>ve){var fe=-1;break e}if(c+=ve,ve<se)break;typeof z<"u"&&(z+=ve);}fe=c;}return X[w>>2]=fe,0}catch(Be){if(typeof vr>"u"||Be.name!=="ErrnoError")throw Be;return Be.aa}},fd_seek:function(s,c,v,w,P){c=v+2097152>>>0<4194305-!!c?(c>>>0)+4294967296*v:NaN;try{if(isNaN(c))return 61;var z=or(s);return Bu(z,c,w),Vt=[z.position>>>0,(St=z.position,1<=+Math.abs(St)?0<St?+Math.floor(St/4294967296)>>>0:~~+Math.ceil((St-+(~~St>>>0))/4294967296)>>>0:0)],j[P>>2]=Vt[0],j[P+4>>2]=Vt[1],z.La&&c===0&&w===0&&(z.La=null),0}catch(Y){if(typeof vr>"u"||Y.name!=="ErrnoError")throw Y;return Y.aa}},fd_write:function(s,c,v,w){try{e:{var P=or(s);s=c;for(var z,Y=c=0;Y<v;Y++){var q=X[s>>2],se=X[s+4>>2];s+=8;var ie=P,ge=q,Ae=se,Ee=z,J=oe;if(0>Ae||0>Ee)throw new _e(28);if(ie.X===null)throw new _e(8);if((ie.flags&2097155)===0)throw new _e(8);if((ie.node.mode&61440)===16384)throw new _e(31);if(!ie.m.write)throw new _e(28);ie.seekable&&ie.flags&1024&&Bu(ie,0,2);var ve=typeof Ee<"u";if(!ve)Ee=ie.position;else if(!ie.seekable)throw new _e(70);var fe=ie.m.write(ie,J,ge,Ae,Ee,void 0);ve||(ie.position+=fe);var Be=fe;if(0>Be){var Ue=-1;break e}c+=Be,typeof z<"u"&&(z+=Be);}Ue=c;}return X[w>>2]=Ue,0}catch(Se){if(typeof vr>"u"||Se.name!=="ErrnoError")throw Se;return Se.aa}},invoke_vii:Gv,isWindowsBrowser:function(){return  -1<navigator.platform.indexOf("Win")},strftime:rp,strftime_l:(s,c,v,w)=>rp(s,c,v,w)},dt=(function(){function s(v){return dt=v.exports,re=dt.memory,le(),qu=dt.__indirect_function_table,Ie.unshift(dt.__wasm_call_ctors),pt--,b.monitorRunDependencies?.(pt),pt==0&&It&&(v=It,It=null,v()),dt}var c={env:ip,wasi_snapshot_preview1:ip};if(pt++,b.monitorRunDependencies?.(pt),b.instantiateWasm)try{return b.instantiateWasm(c,s)}catch(v){W(`Module.instantiateWasm callback failed with error: ${v}`),_(v);}return tt||(tt=Rt("canvas_advanced.wasm")?"canvas_advanced.wasm":b.locateFile?b.locateFile("canvas_advanced.wasm",G):G+"canvas_advanced.wasm"),mt(c,function(v){s(v.instance);}).catch(_),{}})(),Kn=s=>(Kn=dt.free)(s),$l=s=>($l=dt.malloc)(s),ap=s=>(ap=dt.__getTypeName)(s),sp=b._ma_device__on_notification_unlocked=s=>(sp=b._ma_device__on_notification_unlocked=dt.ma_device__on_notification_unlocked)(s);b._ma_malloc_emscripten=(s,c)=>(b._ma_malloc_emscripten=dt.ma_malloc_emscripten)(s,c),b._ma_free_emscripten=(s,c)=>(b._ma_free_emscripten=dt.ma_free_emscripten)(s,c);var lp=b._ma_device_process_pcm_frames_capture__webaudio=(s,c,v)=>(lp=b._ma_device_process_pcm_frames_capture__webaudio=dt.ma_device_process_pcm_frames_capture__webaudio)(s,c,v),cp=b._ma_device_process_pcm_frames_playback__webaudio=(s,c,v)=>(cp=b._ma_device_process_pcm_frames_playback__webaudio=dt.ma_device_process_pcm_frames_playback__webaudio)(s,c,v),dp=(s,c)=>(dp=dt.setThrew)(s,c),up=s=>(up=dt._emscripten_stack_restore)(s),pp=()=>(pp=dt.emscripten_stack_get_current)();b.dynCall_iiji=(s,c,v,w,P)=>(b.dynCall_iiji=dt.dynCall_iiji)(s,c,v,w,P),b.dynCall_jiji=(s,c,v,w,P)=>(b.dynCall_jiji=dt.dynCall_jiji)(s,c,v,w,P),b.dynCall_iiiji=(s,c,v,w,P,z)=>(b.dynCall_iiiji=dt.dynCall_iiiji)(s,c,v,w,P,z),b.dynCall_iij=(s,c,v,w)=>(b.dynCall_iij=dt.dynCall_iij)(s,c,v,w),b.dynCall_jii=(s,c,v)=>(b.dynCall_jii=dt.dynCall_jii)(s,c,v),b.dynCall_viijii=(s,c,v,w,P,z,Y)=>(b.dynCall_viijii=dt.dynCall_viijii)(s,c,v,w,P,z,Y),b.dynCall_iiiiij=(s,c,v,w,P,z,Y)=>(b.dynCall_iiiiij=dt.dynCall_iiiiij)(s,c,v,w,P,z,Y),b.dynCall_iiiiijj=(s,c,v,w,P,z,Y,q,se)=>(b.dynCall_iiiiijj=dt.dynCall_iiiiijj)(s,c,v,w,P,z,Y,q,se),b.dynCall_iiiiiijj=(s,c,v,w,P,z,Y,q,se,ie)=>(b.dynCall_iiiiiijj=dt.dynCall_iiiiiijj)(s,c,v,w,P,z,Y,q,se,ie);function Gv(s,c,v){var w=pp();try{Tl(s)(c,v);}catch(P){if(up(w),P!==P+0)throw P;dp(1,0);}}var fa;It=function s(){fa||fp(),fa||(It=s);};function fp(){function s(){if(!fa&&(fa=true,b.calledRun=true,!ne)){if(b.noFSInit||zu||(zu=true,b.stdin=b.stdin,b.stdout=b.stdout,b.stderr=b.stderr,b.stdin?Bo("stdin",b.stdin):xl("/dev/tty","/dev/stdin"),b.stdout?Bo("stdout",null,b.stdout):xl("/dev/tty","/dev/stdout"),b.stderr?Bo("stderr",null,b.stderr):xl("/dev/tty1","/dev/stderr"),ta("/dev/stdin",0),ta("/dev/stdout",1),ta("/dev/stderr",1)),Lu=false,tn(Ie),S(b),b.onRuntimeInitialized&&b.onRuntimeInitialized(),b.postRun)for(typeof b.postRun=="function"&&(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();ut.unshift(c);}tn(ut);}}if(!(0<pt)){if(b.preRun)for(typeof b.preRun=="function"&&(b.preRun=[b.preRun]);b.preRun.length;)ht();tn(ye),0<pt||(b.setStatus?(b.setStatus("Running..."),setTimeout(function(){setTimeout(function(){b.setStatus("");},1),s();},1)):s());}}if(b.preInit)for(typeof b.preInit=="function"&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();return fp(),y=I,y})})();const p=f;}),(a=>{a.exports=JSON.parse(`{"name":"@rive-app/canvas","version":"2.34.3","description":"Rive's canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive_fallback.wasm","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}`);}),((a,l,d)=>{d.r(l),d.d(l,{Animation:()=>f.Animation});var f=d(4);}),((a,l,d)=>{d.r(l),d.d(l,{Animation:()=>f});var f=(function(){function p(h,g,y,b){this.animation=h,this.artboard=g,this.playing=b,this.loopCount=0,this.scrubTo=null,this.instance=new y.LinearAnimationInstance(h,g);}return Object.defineProperty(p.prototype,"name",{get:function(){return this.animation.name},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"time",{get:function(){return this.instance.time},set:function(h){this.instance.time=h;},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"loopValue",{get:function(){return this.animation.loopValue},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"needsScrub",{get:function(){return this.scrubTo!==null},enumerable:false,configurable:true}),p.prototype.advance=function(h){this.scrubTo===null?this.instance.advance(h):(this.instance.time=0,this.instance.advance(this.scrubTo),this.scrubTo=null);},p.prototype.apply=function(h){this.instance.apply(h);},p.prototype.cleanup=function(){this.instance.delete();},p})();}),((a,l,d)=>{d.r(l),d.d(l,{AudioAssetWrapper:()=>h.AudioAssetWrapper,AudioWrapper:()=>h.AudioWrapper,BLANK_URL:()=>p.BLANK_URL,CustomFileAssetLoaderWrapper:()=>h.CustomFileAssetLoaderWrapper,FileAssetWrapper:()=>h.FileAssetWrapper,FileFinalizer:()=>h.FileFinalizer,FontAssetWrapper:()=>h.FontAssetWrapper,FontWrapper:()=>h.FontWrapper,ImageAssetWrapper:()=>h.ImageAssetWrapper,ImageWrapper:()=>h.ImageWrapper,createFinalization:()=>h.createFinalization,finalizationRegistry:()=>h.finalizationRegistry,registerTouchInteractions:()=>f.registerTouchInteractions,sanitizeUrl:()=>p.sanitizeUrl});var f=d(6),p=d(7),h=d(8);}),((a,l,d)=>{d.r(l),d.d(l,{registerTouchInteractions:()=>h});var f=void 0,p=function(g,y,b){var S,_,I=[];if(["touchstart","touchmove"].indexOf(g.type)>-1&&(!((S=g.changedTouches)===null||S===void 0)&&S.length)){y||g.preventDefault();for(var T=0,L=b?g.changedTouches.length:1;T<L;){var F=g.changedTouches[T];I.push({clientX:F.clientX,clientY:F.clientY,identifier:F.identifier}),T++;}}else if(g.type==="touchend"&&(!((_=g.changedTouches)===null||_===void 0)&&_.length))for(var T=0,L=b?g.changedTouches.length:1;T<L;){var F=g.changedTouches[T];I.push({clientX:F.clientX,clientY:F.clientY,identifier:F.identifier}),T++;}else I.push({clientX:g.clientX,clientY:g.clientY,identifier:0});return I},h=function(g){var y=g.canvas,b=g.artboard,S=g.stateMachines,_=S===void 0?[]:S,I=g.renderer,T=g.rive,L=g.fit,F=g.alignment,$=g.isTouchScrollEnabled,R=$===void 0?false:$,N=g.dispatchPointerExit,M=N===void 0?true:N,C=g.enableMultiTouch,E=C===void 0?false:C,B=g.layoutScaleFactor,G=B===void 0?1:B;if(!y||!_.length||!I||!T||!b||typeof window>"u")return null;var K=null,D=false,Z=function(te){if(D&&te instanceof MouseEvent){te.type=="mouseup"&&(D=false);return}D=R&&te.type==="touchend"&&K==="touchstart",K=te.type;var re=te.currentTarget.getBoundingClientRect(),ne=p(te,R,E),oe=T.computeAlignment(L,F,{minX:0,minY:0,maxX:re.width,maxY:re.height},b.bounds,G),V=new T.Mat2D;switch(oe.invert(V),ne.forEach(function(tt){var De=tt.clientX,gn=tt.clientY;if(!(!De&&!gn)){var bn=De-re.left,mt=gn-re.top,St=new T.Vec2D(bn,mt),Vt=T.mapXY(V,St),An=Vt.x(),tn=Vt.y();tt.transformedX=An,tt.transformedY=tn,Vt.delete(),St.delete();}}),V.delete(),oe.delete(),te.type){case "mouseout":for(var Q=function(tt){M?ne.forEach(function(De){tt.pointerExit(De.transformedX,De.transformedY,De.identifier);}):ne.forEach(function(De){tt.pointerMove(De.transformedX,De.transformedY,De.identifier);});},O=0,j=_;O<j.length;O++){var X=j[O];Q(X);}break;case "touchmove":case "mouseover":case "mousemove":{for(var de=function(tt){ne.forEach(function(De){tt.pointerMove(De.transformedX,De.transformedY,De.identifier);});},ce=0,le=_;ce<le.length;ce++){var X=le[ce];de(X);}break}case "touchstart":case "mousedown":{for(var ye=function(tt){ne.forEach(function(De){tt.pointerDown(De.transformedX,De.transformedY,De.identifier);});},Ie=0,ut=_;Ie<ut.length;Ie++){var X=ut[Ie];ye(X);}break}case "touchend":{for(var ht=function(tt){ne.forEach(function(De){tt.pointerUp(De.transformedX,De.transformedY,De.identifier),tt.pointerExit(De.transformedX,De.transformedY,De.identifier);});},pt=0,It=_;pt<It.length;pt++){var X=It[pt];ht(X);}break}case "mouseup":{for(var Wt=function(tt){ne.forEach(function(De){tt.pointerUp(De.transformedX,De.transformedY,De.identifier);});},Rt=0,Ht=_;Rt<Ht.length;Rt++){var X=Ht[Rt];Wt(X);}break}}},W=Z.bind(f);return y.addEventListener("mouseover",W),y.addEventListener("mouseout",W),y.addEventListener("mousemove",W),y.addEventListener("mousedown",W),y.addEventListener("mouseup",W),y.addEventListener("touchmove",W,{passive:R}),y.addEventListener("touchstart",W,{passive:R}),y.addEventListener("touchend",W),function(){y.removeEventListener("mouseover",W),y.removeEventListener("mouseout",W),y.removeEventListener("mousemove",W),y.removeEventListener("mousedown",W),y.removeEventListener("mouseup",W),y.removeEventListener("touchmove",W),y.removeEventListener("touchstart",W),y.removeEventListener("touchend",W);}};}),((a,l,d)=>{d.r(l),d.d(l,{BLANK_URL:()=>S,sanitizeUrl:()=>T});var f=/^([^\w]*)(javascript|data|vbscript)/im,p=/&#(\w+)(^\w|;)?/g,h=/&(newline|tab);/gi,g=/[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,y=/^.+(:|&colon;)/gim,b=[".","/"],S="about:blank";function _(L){return b.indexOf(L[0])>-1}function I(L){var F=L.replace(g,"");return F.replace(p,function($,R){return String.fromCharCode(R)})}function T(L){if(!L)return S;var F=I(L).replace(h,"").replace(g,"").trim();if(!F)return S;if(_(F))return F;var $=F.match(y);if(!$)return F;var R=$[0];return f.test(R)?S:F}}),((a,l,d)=>{d.r(l),d.d(l,{AudioAssetWrapper:()=>L,AudioWrapper:()=>b,CustomFileAssetLoaderWrapper:()=>_,FileAssetWrapper:()=>I,FileFinalizer:()=>p,FontAssetWrapper:()=>F,FontWrapper:()=>S,ImageAssetWrapper:()=>T,ImageWrapper:()=>y,createFinalization:()=>M,finalizationRegistry:()=>N});var f=(function(){var C=function(E,B){return C=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(G,K){G.__proto__=K;}||function(G,K){for(var D in K)Object.prototype.hasOwnProperty.call(K,D)&&(G[D]=K[D]);},C(E,B)};return function(E,B){if(typeof B!="function"&&B!==null)throw new TypeError("Class extends value "+String(B)+" is not a constructor or null");C(E,B);function G(){this.constructor=E;}E.prototype=B===null?Object.create(B):(G.prototype=B.prototype,new G);}})(),p=(function(){function C(E){this.selfUnref=false,this._file=E;}return C.prototype.unref=function(){this._file&&this._file.unref();},C})(),h=(function(){function C(E){this._finalizableObject=E;}return C.prototype.unref=function(){this._finalizableObject.unref();},C})(),g=(function(){function C(){this.selfUnref=false;}return C.prototype.unref=function(){},C})(),y=(function(C){f(E,C);function E(B){var G=C.call(this)||this;return G._nativeImage=B,G}return Object.defineProperty(E.prototype,"nativeImage",{get:function(){return this._nativeImage},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeImage.unref();},E})(g),b=(function(C){f(E,C);function E(B){var G=C.call(this)||this;return G._nativeAudio=B,G}return Object.defineProperty(E.prototype,"nativeAudio",{get:function(){return this._nativeAudio},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeAudio.unref();},E})(g),S=(function(C){f(E,C);function E(B){var G=C.call(this)||this;return G._nativeFont=B,G}return Object.defineProperty(E.prototype,"nativeFont",{get:function(){return this._nativeFont},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeFont.unref();},E})(g),_=(function(){function C(E,B){this._assetLoaderCallback=B,this.assetLoader=new E.CustomFileAssetLoader({loadContents:this.loadContents.bind(this)});}return C.prototype.loadContents=function(E,B){var G;return E.isImage?G=new T(E):E.isAudio?G=new L(E):E.isFont&&(G=new F(E)),this._assetLoaderCallback(G,B)},C})(),I=(function(){function C(E){this._nativeFileAsset=E;}return C.prototype.decode=function(E){this._nativeFileAsset.decode(E);},Object.defineProperty(C.prototype,"name",{get:function(){return this._nativeFileAsset.name},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"fileExtension",{get:function(){return this._nativeFileAsset.fileExtension},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"uniqueFilename",{get:function(){return this._nativeFileAsset.uniqueFilename},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isAudio",{get:function(){return this._nativeFileAsset.isAudio},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isImage",{get:function(){return this._nativeFileAsset.isImage},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isFont",{get:function(){return this._nativeFileAsset.isFont},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"cdnUuid",{get:function(){return this._nativeFileAsset.cdnUuid},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"nativeFileAsset",{get:function(){return this._nativeFileAsset},enumerable:false,configurable:true}),C})(),T=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setRenderImage=function(B){this._nativeFileAsset.setRenderImage(B.nativeImage);},E})(I),L=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setAudioSource=function(B){this._nativeFileAsset.setAudioSource(B.nativeAudio);},E})(I),F=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setFont=function(B){this._nativeFileAsset.setFont(B.nativeFont);},E})(I),$=(function(){function C(E){}return C.prototype.register=function(E){E.selfUnref=true;},C.prototype.unregister=function(E){},C})(),R=typeof FinalizationRegistry<"u"?FinalizationRegistry:$,N=new R(function(C){C?.unref();}),M=function(C,E){var B=new h(E);N.register(C,B);};})],r={};function o(a){var l=r[a];if(l!==void 0)return l.exports;var d=r[a]={exports:{}};return n[a](d,d.exports,o),d.exports}o.d=(a,l)=>{for(var d in l)o.o(l,d)&&!o.o(a,d)&&Object.defineProperty(a,d,{enumerable:true,get:l[d]});},o.o=(a,l)=>Object.prototype.hasOwnProperty.call(a,l),o.r=a=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:true});};var i={};return (()=>{o.r(i),o.d(i,{Alignment:()=>T,DataEnum:()=>le,DrawOptimizationOptions:()=>L,EventType:()=>D,Fit:()=>I,Layout:()=>F,LoopType:()=>Z,Rive:()=>de,RiveEventType:()=>M,RiveFile:()=>X,RuntimeLoader:()=>$,StateMachineInput:()=>N,StateMachineInputType:()=>R,Testing:()=>St,ViewModel:()=>ce,ViewModelInstance:()=>Ie,ViewModelInstanceArtboard:()=>gn,ViewModelInstanceAssetImage:()=>De,ViewModelInstanceBoolean:()=>It,ViewModelInstanceColor:()=>tt,ViewModelInstanceEnum:()=>Rt,ViewModelInstanceList:()=>Ht,ViewModelInstanceNumber:()=>pt,ViewModelInstanceString:()=>ht,ViewModelInstanceTrigger:()=>Wt,ViewModelInstanceValue:()=>ut,decodeAudio:()=>Vt,decodeFont:()=>tn,decodeImage:()=>An});var a=o(1),l=o(2),d=o(3),f=o(5),p=(function(){var k=function(u,m){return k=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,U){A.__proto__=U;}||function(A,U){for(var H in U)Object.prototype.hasOwnProperty.call(U,H)&&(A[H]=U[H]);},k(u,m)};return function(u,m){if(typeof m!="function"&&m!==null)throw new TypeError("Class extends value "+String(m)+" is not a constructor or null");k(u,m);function A(){this.constructor=u;}u.prototype=m===null?Object.create(m):(A.prototype=m.prototype,new A);}})(),h=function(){return h=Object.assign||function(k){for(var u,m=1,A=arguments.length;m<A;m++){u=arguments[m];for(var U in u)Object.prototype.hasOwnProperty.call(u,U)&&(k[U]=u[U]);}return k},h.apply(this,arguments)},g=function(k,u,m,A){function U(H){return H instanceof m?H:new m(function(ee){ee(H);})}return new(m||(m=Promise))(function(H,ee){function ue(Ce){try{be(A.next(Ce));}catch(Qe){ee(Qe);}}function xe(Ce){try{be(A.throw(Ce));}catch(Qe){ee(Qe);}}function be(Ce){Ce.done?H(Ce.value):U(Ce.value).then(ue,xe);}be((A=A.apply(k,[])).next());})},y=function(k,u){var m={label:0,sent:function(){if(H[0]&1)throw H[1];return H[1]},trys:[],ops:[]},A,U,H,ee=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return ee.next=ue(0),ee.throw=ue(1),ee.return=ue(2),typeof Symbol=="function"&&(ee[Symbol.iterator]=function(){return this}),ee;function ue(be){return function(Ce){return xe([be,Ce])}}function xe(be){if(A)throw new TypeError("Generator is already executing.");for(;ee&&(ee=0,be[0]&&(m=0)),m;)try{if(A=1,U&&(H=be[0]&2?U.return:be[0]?U.throw||((H=U.return)&&H.call(U),0):U.next)&&!(H=H.call(U,be[1])).done)return H;switch(U=0,H&&(be=[be[0]&2,H.value]),be[0]){case 0:case 1:H=be;break;case 4:return m.label++,{value:be[1],done:!1};case 5:m.label++,U=be[1],be=[0];continue;case 7:be=m.ops.pop(),m.trys.pop();continue;default:if(H=m.trys,!(H=H.length>0&&H[H.length-1])&&(be[0]===6||be[0]===2)){m=0;continue}if(be[0]===3&&(!H||be[1]>H[0]&&be[1]<H[3])){m.label=be[1];break}if(be[0]===6&&m.label<H[1]){m.label=H[1],H=be;break}if(H&&m.label<H[2]){m.label=H[2],m.ops.push(be);break}H[2]&&m.ops.pop(),m.trys.pop();continue}be=u.call(k,m);}catch(Ce){be=[6,Ce],U=0;}finally{A=H=0;}if(be[0]&5)throw be[1];return {value:be[0]?be[1]:void 0,done:true}}},b=function(k,u,m){for(var A=0,U=u.length,H;A<U;A++)(H||!(A in u))&&(H||(H=Array.prototype.slice.call(u,0,A)),H[A]=u[A]);return k.concat(H||Array.prototype.slice.call(u))},S=(function(k){p(u,k);function u(){var m=k!==null&&k.apply(this,arguments)||this;return m.isHandledError=true,m}return u})(Error),_=function(k){return k&&k.isHandledError?k.message:"Problem loading file; may be corrupt!"},I;(function(k){k.Cover="cover",k.Contain="contain",k.Fill="fill",k.FitWidth="fitWidth",k.FitHeight="fitHeight",k.None="none",k.ScaleDown="scaleDown",k.Layout="layout";})(I||(I={}));var T;(function(k){k.Center="center",k.TopLeft="topLeft",k.TopCenter="topCenter",k.TopRight="topRight",k.CenterLeft="centerLeft",k.CenterRight="centerRight",k.BottomLeft="bottomLeft",k.BottomCenter="bottomCenter",k.BottomRight="bottomRight";})(T||(T={}));var L;(function(k){k.AlwaysDraw="alwaysDraw",k.DrawOnChanged="drawOnChanged";})(L||(L={}));var F=(function(){function k(u){var m,A,U,H,ee,ue,xe;this.fit=(m=u?.fit)!==null&&m!==void 0?m:I.Contain,this.alignment=(A=u?.alignment)!==null&&A!==void 0?A:T.Center,this.layoutScaleFactor=(U=u?.layoutScaleFactor)!==null&&U!==void 0?U:1,this.minX=(H=u?.minX)!==null&&H!==void 0?H:0,this.minY=(ee=u?.minY)!==null&&ee!==void 0?ee:0,this.maxX=(ue=u?.maxX)!==null&&ue!==void 0?ue:0,this.maxY=(xe=u?.maxY)!==null&&xe!==void 0?xe:0;}return k.new=function(u){var m=u.fit,A=u.alignment,U=u.minX,H=u.minY,ee=u.maxX,ue=u.maxY;return console.warn("This function is deprecated: please use `new Layout({})` instead"),new k({fit:m,alignment:A,minX:U,minY:H,maxX:ee,maxY:ue})},k.prototype.copyWith=function(u){var m=u.fit,A=u.alignment,U=u.layoutScaleFactor,H=u.minX,ee=u.minY,ue=u.maxX,xe=u.maxY;return new k({fit:m??this.fit,alignment:A??this.alignment,layoutScaleFactor:U??this.layoutScaleFactor,minX:H??this.minX,minY:ee??this.minY,maxX:ue??this.maxX,maxY:xe??this.maxY})},k.prototype.runtimeFit=function(u){if(this.cachedRuntimeFit)return this.cachedRuntimeFit;var m;return this.fit===I.Cover?m=u.Fit.cover:this.fit===I.Contain?m=u.Fit.contain:this.fit===I.Fill?m=u.Fit.fill:this.fit===I.FitWidth?m=u.Fit.fitWidth:this.fit===I.FitHeight?m=u.Fit.fitHeight:this.fit===I.ScaleDown?m=u.Fit.scaleDown:this.fit===I.Layout?m=u.Fit.layout:m=u.Fit.none,this.cachedRuntimeFit=m,m},k.prototype.runtimeAlignment=function(u){if(this.cachedRuntimeAlignment)return this.cachedRuntimeAlignment;var m;return this.alignment===T.TopLeft?m=u.Alignment.topLeft:this.alignment===T.TopCenter?m=u.Alignment.topCenter:this.alignment===T.TopRight?m=u.Alignment.topRight:this.alignment===T.CenterLeft?m=u.Alignment.centerLeft:this.alignment===T.CenterRight?m=u.Alignment.centerRight:this.alignment===T.BottomLeft?m=u.Alignment.bottomLeft:this.alignment===T.BottomCenter?m=u.Alignment.bottomCenter:this.alignment===T.BottomRight?m=u.Alignment.bottomRight:m=u.Alignment.center,this.cachedRuntimeAlignment=m,m},k})(),$=(function(){function k(){}return k.loadRuntime=function(){a.default({locateFile:function(){return k.wasmURL}}).then(function(u){var m;for(k.runtime=u;k.callBackQueue.length>0;)(m=k.callBackQueue.shift())===null||m===void 0||m(k.runtime);}).catch(function(u){var m={message:u?.message||"Unknown error",type:u?.name||"Error",wasmError:u instanceof WebAssembly.CompileError||u instanceof WebAssembly.RuntimeError,originalError:u};console.debug("Rive WASM load error details:",m);var A="https://cdn.jsdelivr.net/npm/".concat(l.name,"@").concat(l.version,"/rive_fallback.wasm");if(k.wasmURL.toLowerCase()!==A)console.warn("Failed to load WASM from ".concat(k.wasmURL," (").concat(m.message,"), trying jsdelivr as a backup")),k.setWasmUrl(A),k.loadRuntime();else {var U=["Could not load Rive WASM file from ".concat(k.wasmURL," or ").concat(A,"."),"Possible reasons:","- Network connection is down","- WebAssembly is not supported in this environment","- The WASM file is corrupted or incompatible",`
Error details:`,"- Type: ".concat(m.type),"- Message: ".concat(m.message),"- WebAssembly-specific error: ".concat(m.wasmError),`
To resolve, you may need to:`,"1. Check your network connection","2. Set a new WASM source via RuntimeLoader.setWasmUrl()","3. Call RuntimeLoader.loadRuntime() again"].join(`
`);console.error(U);}});},k.getInstance=function(u){k.isLoading||(k.isLoading=true,k.loadRuntime()),k.runtime?u(k.runtime):k.callBackQueue.push(u);},k.awaitInstance=function(){return new Promise(function(u){return k.getInstance(function(m){return u(m)})})},k.setWasmUrl=function(u){k.wasmURL=u;},k.getWasmUrl=function(){return k.wasmURL},k.isLoading=false,k.callBackQueue=[],k.wasmURL="https://unpkg.com/".concat(l.name,"@").concat(l.version,"/rive.wasm"),k})(),R;(function(k){k[k.Number=56]="Number",k[k.Trigger=58]="Trigger",k[k.Boolean=59]="Boolean";})(R||(R={}));var N=(function(){function k(u,m){this.type=u,this.runtimeInput=m;}return Object.defineProperty(k.prototype,"name",{get:function(){return this.runtimeInput.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"value",{get:function(){return this.runtimeInput.value},set:function(u){this.runtimeInput.value=u;},enumerable:false,configurable:true}),k.prototype.fire=function(){this.type===R.Trigger&&this.runtimeInput.fire();},k.prototype.delete=function(){this.runtimeInput=null;},k})(),M;(function(k){k[k.General=128]="General",k[k.OpenUrl=131]="OpenUrl";})(M||(M={}));var C=(function(){function k(u){this.isBindableArtboard=false,this.isBindableArtboard=u;}return k})(),E=(function(k){p(u,k);function u(m,A){var U=k.call(this,false)||this;return U.nativeArtboard=m,U.file=A,U}return u})(C),B=(function(k){p(u,k);function u(m){var A=k.call(this,true)||this;return A.selfUnref=false,A.nativeArtboard=m,A}return Object.defineProperty(u.prototype,"viewModel",{set:function(m){this.nativeViewModel=m.nativeInstance;},enumerable:false,configurable:true}),u.prototype.destroy=function(){var m;this.selfUnref&&(this.nativeArtboard.unref(),(m=this.nativeViewModel)===null||m===void 0||m.unref());},u})(C),G=(function(){function k(u,m,A,U){this.stateMachine=u,this.playing=A,this.artboard=U,this.inputs=[],this.instance=new m.StateMachineInstance(u,U),this.initInputs(m);}return Object.defineProperty(k.prototype,"name",{get:function(){return this.stateMachine.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"statesChanged",{get:function(){for(var u=[],m=0;m<this.instance.stateChangedCount();m++)u.push(this.instance.stateChangedNameByIndex(m));return u},enumerable:false,configurable:true}),k.prototype.advance=function(u){this.instance.advance(u);},k.prototype.advanceAndApply=function(u){this.instance.advanceAndApply(u);},k.prototype.reportedEventCount=function(){return this.instance.reportedEventCount()},k.prototype.reportedEventAt=function(u){return this.instance.reportedEventAt(u)},k.prototype.initInputs=function(u){for(var m=0;m<this.instance.inputCount();m++){var A=this.instance.input(m);this.inputs.push(this.mapRuntimeInput(A,u));}},k.prototype.mapRuntimeInput=function(u,m){if(u.type===m.SMIInput.bool)return new N(R.Boolean,u.asBool());if(u.type===m.SMIInput.number)return new N(R.Number,u.asNumber());if(u.type===m.SMIInput.trigger)return new N(R.Trigger,u.asTrigger())},k.prototype.cleanup=function(){this.inputs.forEach(function(u){u.delete();}),this.inputs.length=0,this.instance.delete();},k.prototype.bindViewModelInstance=function(u){u.runtimeInstance!=null&&this.instance.bindViewModelInstance(u.runtimeInstance);},k})(),K=(function(){function k(u,m,A,U,H){U===void 0&&(U=[]),H===void 0&&(H=[]),this.runtime=u,this.artboard=m,this.eventManager=A,this.animations=U,this.stateMachines=H;}return k.prototype.add=function(u,m,A){if(A===void 0&&(A=true),u=mt(u),u.length===0)this.animations.forEach(function(Ke){return Ke.playing=m}),this.stateMachines.forEach(function(Ke){return Ke.playing=m});else for(var U=this.animations.map(function(Ke){return Ke.name}),H=this.stateMachines.map(function(Ke){return Ke.name}),ee=0;ee<u.length;ee++){var ue=U.indexOf(u[ee]),xe=H.indexOf(u[ee]);if(ue>=0||xe>=0)ue>=0?this.animations[ue].playing=m:this.stateMachines[xe].playing=m;else {var be=this.artboard.animationByName(u[ee]);if(be){var Ce=new d.Animation(be,this.artboard,this.runtime,m);Ce.advance(0),Ce.apply(1),this.animations.push(Ce);}else {var Qe=this.artboard.stateMachineByName(u[ee]);if(Qe){var at=new G(Qe,this.runtime,m,this.artboard);this.stateMachines.push(at);}}}}return A&&(m?this.eventManager.fire({type:D.Play,data:this.playing}):this.eventManager.fire({type:D.Pause,data:this.paused})),m?this.playing:this.paused},k.prototype.initLinearAnimations=function(u,m){for(var A=this.animations.map(function(xe){return xe.name}),U=0;U<u.length;U++){var H=A.indexOf(u[U]);if(H>=0)this.animations[H].playing=m;else {var ee=this.artboard.animationByName(u[U]);if(ee){var ue=new d.Animation(ee,this.artboard,this.runtime,m);ue.advance(0),ue.apply(1),this.animations.push(ue);}else console.error("Animation with name ".concat(u[U]," not found."));}}},k.prototype.initStateMachines=function(u,m){for(var A=this.stateMachines.map(function(xe){return xe.name}),U=0;U<u.length;U++){var H=A.indexOf(u[U]);if(H>=0)this.stateMachines[H].playing=m;else {var ee=this.artboard.stateMachineByName(u[U]);if(ee){var ue=new G(ee,this.runtime,m,this.artboard);this.stateMachines.push(ue);}else console.warn("State Machine with name ".concat(u[U]," not found.")),this.initLinearAnimations([u[U]],m);}}},k.prototype.play=function(u){return this.add(u,true)},k.prototype.advanceIfPaused=function(){this.stateMachines.forEach(function(u){u.playing||u.advanceAndApply(0);});},k.prototype.pause=function(u){return this.add(u,false)},k.prototype.scrub=function(u,m){var A=this.animations.filter(function(U){return u.includes(U.name)});return A.forEach(function(U){return U.scrubTo=m}),A.map(function(U){return U.name})},Object.defineProperty(k.prototype,"playing",{get:function(){return this.animations.filter(function(u){return u.playing}).map(function(u){return u.name}).concat(this.stateMachines.filter(function(u){return u.playing}).map(function(u){return u.name}))},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"paused",{get:function(){return this.animations.filter(function(u){return !u.playing}).map(function(u){return u.name}).concat(this.stateMachines.filter(function(u){return !u.playing}).map(function(u){return u.name}))},enumerable:false,configurable:true}),k.prototype.stop=function(u){var m=this;u=mt(u);var A=[];if(u.length===0)A=this.animations.map(function(ee){return ee.name}).concat(this.stateMachines.map(function(ee){return ee.name})),this.animations.forEach(function(ee){return ee.cleanup()}),this.stateMachines.forEach(function(ee){return ee.cleanup()}),this.animations.splice(0,this.animations.length),this.stateMachines.splice(0,this.stateMachines.length);else {var U=this.animations.filter(function(ee){return u.includes(ee.name)});U.forEach(function(ee){ee.cleanup(),m.animations.splice(m.animations.indexOf(ee),1);});var H=this.stateMachines.filter(function(ee){return u.includes(ee.name)});H.forEach(function(ee){ee.cleanup(),m.stateMachines.splice(m.stateMachines.indexOf(ee),1);}),A=U.map(function(ee){return ee.name}).concat(H.map(function(ee){return ee.name}));}return this.eventManager.fire({type:D.Stop,data:A}),A},Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animations.reduce(function(u,m){return u||m.playing},false)||this.stateMachines.reduce(function(u,m){return u||m.playing},false)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return !this.isPlaying&&(this.animations.length>0||this.stateMachines.length>0)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){return this.animations.length===0&&this.stateMachines.length===0},enumerable:false,configurable:true}),k.prototype.atLeastOne=function(u,m){m===void 0&&(m=true);var A;return this.animations.length===0&&this.stateMachines.length===0&&(this.artboard.animationCount()>0?this.add([A=this.artboard.animationByIndex(0).name],u,m):this.artboard.stateMachineCount()>0&&this.add([A=this.artboard.stateMachineByIndex(0).name],u,m)),A},k.prototype.handleLooping=function(){for(var u=0,m=this.animations.filter(function(U){return U.playing});u<m.length;u++){var A=m[u];A.loopValue===0&&A.loopCount?(A.loopCount=0,this.stop(A.name)):A.loopValue===1&&A.loopCount?(this.eventManager.fire({type:D.Loop,data:{animation:A.name,type:Z.Loop}}),A.loopCount=0):A.loopValue===2&&A.loopCount>1&&(this.eventManager.fire({type:D.Loop,data:{animation:A.name,type:Z.PingPong}}),A.loopCount=0);}},k.prototype.handleStateChanges=function(){for(var u=[],m=0,A=this.stateMachines.filter(function(H){return H.playing});m<A.length;m++){var U=A[m];u.push.apply(u,U.statesChanged);}u.length>0&&this.eventManager.fire({type:D.StateChange,data:u});},k.prototype.handleAdvancing=function(u){this.eventManager.fire({type:D.Advance,data:u});},k})(),D;(function(k){k.Load="load",k.LoadError="loaderror",k.Play="play",k.Pause="pause",k.Stop="stop",k.Loop="loop",k.Draw="draw",k.Advance="advance",k.StateChange="statechange",k.RiveEvent="riveevent",k.AudioStatusChange="audiostatuschange";})(D||(D={}));var Z;(function(k){k.OneShot="oneshot",k.Loop="loop",k.PingPong="pingpong";})(Z||(Z={}));var W=(function(){function k(u){u===void 0&&(u=[]),this.listeners=u;}return k.prototype.getListeners=function(u){return this.listeners.filter(function(m){return m.type===u})},k.prototype.add=function(u){this.listeners.includes(u)||this.listeners.push(u);},k.prototype.remove=function(u){for(var m=0;m<this.listeners.length;m++){var A=this.listeners[m];if(A.type===u.type&&A.callback===u.callback){this.listeners.splice(m,1);break}}},k.prototype.removeAll=function(u){var m=this;u?this.listeners.filter(function(A){return A.type===u}).forEach(function(A){return m.remove(A)}):this.listeners.splice(0,this.listeners.length);},k.prototype.fire=function(u){var m=this.getListeners(u.type);m.forEach(function(A){return A.callback(u)});},k})(),te=(function(){function k(u){this.eventManager=u,this.queue=[];}return k.prototype.add=function(u){this.queue.push(u);},k.prototype.process=function(){for(;this.queue.length>0;){var u=this.queue.shift();u?.action&&u.action(),u?.event&&this.eventManager.fire(u.event);}},k})(),re;(function(k){k[k.AVAILABLE=0]="AVAILABLE",k[k.UNAVAILABLE=1]="UNAVAILABLE";})(re||(re={}));var ne=(function(k){p(u,k);function u(){var m=k!==null&&k.apply(this,arguments)||this;return m._started=false,m._enabled=false,m._status=re.UNAVAILABLE,m}return u.prototype.delay=function(m){return g(this,void 0,void 0,function(){return y(this,function(A){return [2,new Promise(function(U){return setTimeout(U,m)})]})})},u.prototype.timeout=function(){return g(this,void 0,void 0,function(){return y(this,function(m){return [2,new Promise(function(A,U){return setTimeout(U,50)})]})})},u.prototype.reportToListeners=function(){this.fire({type:D.AudioStatusChange}),this.removeAll();},u.prototype.enableAudio=function(){return g(this,void 0,void 0,function(){return y(this,function(m){return this._enabled||(this._enabled=true,this._status=re.AVAILABLE,this.reportToListeners()),[2]})})},u.prototype.testAudio=function(){return g(this,void 0,void 0,function(){return y(this,function(m){switch(m.label){case 0:if(!(this._status===re.UNAVAILABLE&&this._audioContext!==null))return [3,4];m.label=1;case 1:return m.trys.push([1,3,,4]),[4,Promise.race([this._audioContext.resume(),this.timeout()])];case 2:return m.sent(),this.enableAudio(),[3,4];case 3:return m.sent(),[3,4];case 4:return [2]}})})},u.prototype._establishAudio=function(){return g(this,void 0,void 0,function(){return y(this,function(m){switch(m.label){case 0:return this._started?[3,5]:(this._started=true,typeof window>"u"?(this.enableAudio(),[3,5]):[3,1]);case 1:this._audioContext=new AudioContext,this.listenForUserAction(),m.label=2;case 2:return this._status!==re.UNAVAILABLE?[3,5]:[4,this.testAudio()];case 3:return m.sent(),[4,this.delay(1e3)];case 4:return m.sent(),[3,2];case 5:return [2]}})})},u.prototype.listenForUserAction=function(){var m=this,A=function(){return g(m,void 0,void 0,function(){return y(this,function(U){return this.enableAudio(),[2]})})};document.addEventListener("pointerdown",A,{once:true});},u.prototype.establishAudio=function(){return g(this,void 0,void 0,function(){return y(this,function(m){return this._establishAudio(),[2]})})},Object.defineProperty(u.prototype,"systemVolume",{get:function(){return this._status===re.UNAVAILABLE?(this.testAudio(),0):1},enumerable:false,configurable:true}),Object.defineProperty(u.prototype,"status",{get:function(){return this._status},enumerable:false,configurable:true}),u})(W),oe=new ne,V=(function(){function k(){}return k.prototype.observe=function(){},k.prototype.unobserve=function(){},k.prototype.disconnect=function(){},k})(),Q=globalThis.ResizeObserver||V,O=(function(){function k(){var u=this;this._elementsMap=new Map,this._onObservedEntry=function(m){var A=u._elementsMap.get(m.target);A!==null?A.onResize(m.target.clientWidth==0||m.target.clientHeight==0):u._resizeObserver.unobserve(m.target);},this._onObserved=function(m){m.forEach(u._onObservedEntry);},this._resizeObserver=new Q(this._onObserved);}return k.prototype.add=function(u,m){var A={onResize:m,element:u};return this._elementsMap.set(u,A),this._resizeObserver.observe(u),A},k.prototype.remove=function(u){this._resizeObserver.unobserve(u.element),this._elementsMap.delete(u.element);},k})(),j=new O,X=(function(){function k(u){this.enableRiveAssetCDN=true,this.referenceCount=0,this.destroyed=false,this.selfUnref=false,this.bindableArtboards=[],this.src=u.src,this.buffer=u.buffer,u.assetLoader&&(this.assetLoader=u.assetLoader),this.enableRiveAssetCDN=typeof u.enableRiveAssetCDN=="boolean"?u.enableRiveAssetCDN:true,this.eventManager=new W,u.onLoad&&this.on(D.Load,u.onLoad),u.onLoadError&&this.on(D.LoadError,u.onLoadError);}return k.prototype.releaseFile=function(){var u;this.selfUnref&&((u=this.file)===null||u===void 0||u.unref()),this.file=null;},k.prototype.releaseBindableArtboards=function(){this.bindableArtboards.forEach(function(u){return u.destroy()});},k.prototype.initData=function(){return g(this,void 0,void 0,function(){var u,m,A,U,H;return y(this,function(ee){switch(ee.label){case 0:return this.src?(u=this,[4,bn(this.src)]):[3,2];case 1:u.buffer=ee.sent(),ee.label=2;case 2:return this.destroyed?[2]:(this.assetLoader&&(A=new f.CustomFileAssetLoaderWrapper(this.runtime,this.assetLoader),m=A.assetLoader),U=this,[4,this.runtime.load(new Uint8Array(this.buffer),m,this.enableRiveAssetCDN)]);case 3:return U.file=ee.sent(),H=new f.FileFinalizer(this.file),f.finalizationRegistry.register(this,H),this.destroyed?(this.releaseFile(),[2]):(this.file!==null?this.eventManager.fire({type:D.Load,data:this}):this.fireLoadError(k.fileLoadErrorMessage),[2])}})})},k.prototype.init=function(){return g(this,void 0,void 0,function(){var u,m;return y(this,function(A){switch(A.label){case 0:if(!this.src&&!this.buffer)return this.fireLoadError(k.missingErrorMessage),[2];A.label=1;case 1:return A.trys.push([1,4,,5]),u=this,[4,$.awaitInstance()];case 2:return u.runtime=A.sent(),this.destroyed?[2]:[4,this.initData()];case 3:return A.sent(),[3,5];case 4:return m=A.sent(),this.fireLoadError(m instanceof Error?m.message:k.fileLoadErrorMessage),[3,5];case 5:return [2]}})})},k.prototype.fireLoadError=function(u){throw this.eventManager.fire({type:D.LoadError,data:u}),new Error(u)},k.prototype.on=function(u,m){this.eventManager.add({type:u,callback:m});},k.prototype.off=function(u,m){this.eventManager.remove({type:u,callback:m});},k.prototype.cleanup=function(){this.referenceCount-=1,this.referenceCount<=0&&(this.removeAllRiveEventListeners(),this.releaseFile(),this.releaseBindableArtboards(),this.destroyed=true);},k.prototype.removeAllRiveEventListeners=function(u){this.eventManager.removeAll(u);},k.prototype.getInstance=function(){if(this.file!==null)return this.referenceCount+=1,this.file},k.prototype.destroyIfUnused=function(){this.referenceCount<=0&&this.cleanup();},k.prototype.createBindableArtboard=function(u){if(u!=null){var m=new B(u);return (0, f.createFinalization)(m,m.nativeArtboard),this.bindableArtboards.push(m),m}return null},k.prototype.getArtboard=function(u){var m=this.file.artboardByName(u);if(m!=null)return new E(m,this)},k.prototype.getBindableArtboard=function(u){var m=this.file.bindableArtboardByName(u);return this.createBindableArtboard(m)},k.prototype.getDefaultBindableArtboard=function(){var u=this.file.bindableArtboardDefault();return this.createBindableArtboard(u)},k.prototype.internalBindableArtboardFromArtboard=function(u){var m=this.file.internalBindableArtboardFromArtboard(u);return this.createBindableArtboard(m)},k.prototype.viewModelByName=function(u){var m=this.file.viewModelByName(u);return m!==null?new ce(m):null},k.missingErrorMessage="Rive source file or data buffer required",k.fileLoadErrorMessage="The file failed to load",k})(),de=(function(){function k(u){var m=this,A,U;this.loaded=false,this.destroyed=false,this._observed=null,this.readyForPlaying=false,this.artboard=null,this.eventCleanup=null,this.shouldDisableRiveListeners=false,this.automaticallyHandleEvents=false,this.dispatchPointerExit=true,this.enableMultiTouch=false,this.enableRiveAssetCDN=true,this._volume=1,this._artboardWidth=void 0,this._artboardHeight=void 0,this._devicePixelRatioUsed=1,this._hasZeroSize=false,this._needsRedraw=false,this._currentCanvasWidth=0,this._currentCanvasHeight=0,this._audioEventListener=null,this._boundDraw=null,this._viewModelInstance=null,this._dataEnums=null,this.drawOptimization=L.DrawOnChanged,this.durations=[],this.frameTimes=[],this.frameCount=0,this.isTouchScrollEnabled=false,this.onCanvasResize=function(H){var ee=m._hasZeroSize!==H;m._hasZeroSize=H,H?(!m._layout.maxX||!m._layout.maxY)&&m.resizeToCanvas():ee&&m.resizeDrawingSurfaceToCanvas();},this.renderSecondTimer=0,this._boundDraw=this.draw.bind(this),this.canvas=u.canvas,u.canvas.constructor===HTMLCanvasElement&&(this._observed=j.add(this.canvas,this.onCanvasResize)),this._currentCanvasWidth=this.canvas.width,this._currentCanvasHeight=this.canvas.height,this.src=u.src,this.buffer=u.buffer,this.riveFile=u.riveFile,this.layout=(A=u.layout)!==null&&A!==void 0?A:new F,this.shouldDisableRiveListeners=!!u.shouldDisableRiveListeners,this.isTouchScrollEnabled=!!u.isTouchScrollEnabled,this.automaticallyHandleEvents=!!u.automaticallyHandleEvents,this.dispatchPointerExit=u.dispatchPointerExit===false?u.dispatchPointerExit:this.dispatchPointerExit,this.enableMultiTouch=!!u.enableMultiTouch,this.drawOptimization=(U=u.drawingOptions)!==null&&U!==void 0?U:this.drawOptimization,this.enableRiveAssetCDN=u.enableRiveAssetCDN===void 0?true:u.enableRiveAssetCDN,this.eventManager=new W,u.onLoad&&this.on(D.Load,u.onLoad),u.onLoadError&&this.on(D.LoadError,u.onLoadError),u.onPlay&&this.on(D.Play,u.onPlay),u.onPause&&this.on(D.Pause,u.onPause),u.onStop&&this.on(D.Stop,u.onStop),u.onLoop&&this.on(D.Loop,u.onLoop),u.onStateChange&&this.on(D.StateChange,u.onStateChange),u.onAdvance&&this.on(D.Advance,u.onAdvance),u.onload&&!u.onLoad&&this.on(D.Load,u.onload),u.onloaderror&&!u.onLoadError&&this.on(D.LoadError,u.onloaderror),u.onplay&&!u.onPlay&&this.on(D.Play,u.onplay),u.onpause&&!u.onPause&&this.on(D.Pause,u.onpause),u.onstop&&!u.onStop&&this.on(D.Stop,u.onstop),u.onloop&&!u.onLoop&&this.on(D.Loop,u.onloop),u.onstatechange&&!u.onStateChange&&this.on(D.StateChange,u.onstatechange),u.assetLoader&&(this.assetLoader=u.assetLoader),this.taskQueue=new te(this.eventManager),this.init({src:this.src,buffer:this.buffer,riveFile:this.riveFile,autoplay:u.autoplay,autoBind:u.autoBind,animations:u.animations,stateMachines:u.stateMachines,artboard:u.artboard,useOffscreenRenderer:u.useOffscreenRenderer});}return Object.defineProperty(k.prototype,"viewModelCount",{get:function(){return this.file.viewModelCount()},enumerable:false,configurable:true}),k.new=function(u){return console.warn("This function is deprecated: please use `new Rive({})` instead"),new k(u)},k.prototype.onSystemAudioChanged=function(){this.volume=this._volume;},k.prototype.init=function(u){var m=this,A=u.src,U=u.buffer,H=u.riveFile,ee=u.animations,ue=u.stateMachines,xe=u.artboard,be=u.autoplay,Ce=be===void 0?false:be,Qe=u.useOffscreenRenderer,at=Qe===void 0?false:Qe,Ke=u.autoBind,Tt=Ke===void 0?false:Ke;if(!this.destroyed){if(this.src=A,this.buffer=U,this.riveFile=H,!this.src&&!this.buffer&&!this.riveFile)throw new S(k.missingErrorMessage);var vt=mt(ee),qt=mt(ue);this.loaded=false,this.readyForPlaying=false,$.awaitInstance().then(function(Xt){m.destroyed||(m.runtime=Xt,m.removeRiveListeners(),m.deleteRiveRenderer(),m.renderer=m.runtime.makeRenderer(m.canvas,at),m.canvas.width||m.canvas.height||m.resizeDrawingSurfaceToCanvas(),m.initData(xe,vt,qt,Ce,Tt).then(function(nn){if(nn)return m.setupRiveListeners()}).catch(function(nn){console.error(nn);}));}).catch(function(Xt){console.error(Xt);});}},k.prototype.setupRiveListeners=function(u){var m=this;if(this.eventCleanup&&this.eventCleanup(),!this.shouldDisableRiveListeners){var A=(this.animator.stateMachines||[]).filter(function(ue){return ue.playing&&m.runtime.hasListeners(ue.instance)}).map(function(ue){return ue.instance}),U=this.isTouchScrollEnabled,H=this.dispatchPointerExit,ee=this.enableMultiTouch;u&&"isTouchScrollEnabled"in u&&(U=u.isTouchScrollEnabled),this.eventCleanup=(0, f.registerTouchInteractions)({canvas:this.canvas,artboard:this.artboard,stateMachines:A,renderer:this.renderer,rive:this.runtime,fit:this._layout.runtimeFit(this.runtime),alignment:this._layout.runtimeAlignment(this.runtime),isTouchScrollEnabled:U,dispatchPointerExit:H,enableMultiTouch:ee,layoutScaleFactor:this._layout.layoutScaleFactor});}},k.prototype.removeRiveListeners=function(){this.eventCleanup&&(this.eventCleanup(),this.eventCleanup=null);},k.prototype.initializeAudio=function(){var u=this,m;oe.status==re.UNAVAILABLE&&!((m=this.artboard)===null||m===void 0)&&m.hasAudio&&this._audioEventListener===null&&(this._audioEventListener={type:D.AudioStatusChange,callback:function(){return u.onSystemAudioChanged()}},oe.add(this._audioEventListener),oe.establishAudio());},k.prototype.initArtboardSize=function(){this.artboard&&(this._artboardWidth=this.artboard.width=this._artboardWidth||this.artboard.width,this._artboardHeight=this.artboard.height=this._artboardHeight||this.artboard.height);},k.prototype.initData=function(u,m,A,U,H){return g(this,void 0,void 0,function(){var ee,ue,xe,be;return y(this,function(Ce){switch(Ce.label){case 0:return Ce.trys.push([0,3,,4]),this.riveFile!=null?[3,2]:(ee=new X({src:this.src,buffer:this.buffer,enableRiveAssetCDN:this.enableRiveAssetCDN,assetLoader:this.assetLoader}),this.riveFile=ee,[4,ee.init()]);case 1:if(Ce.sent(),this.destroyed)return ee.destroyIfUnused(),[2,false];Ce.label=2;case 2:return this.file=this.riveFile.getInstance(),this.initArtboard(u,m,A,U,H),this.initArtboardSize(),this.initializeAudio(),this.loaded=true,this.eventManager.fire({type:D.Load,data:(be=this.src)!==null&&be!==void 0?be:"buffer"}),this.animator.advanceIfPaused(),this.readyForPlaying=true,this.taskQueue.process(),this.drawFrame(),[2,true];case 3:return ue=Ce.sent(),xe=_(ue),console.warn(xe),this.eventManager.fire({type:D.LoadError,data:xe}),[2,Promise.reject(xe)];case 4:return [2]}})})},k.prototype.initArtboard=function(u,m,A,U,H){if(this.file){var ee=u?this.file.artboardByName(u):this.file.defaultArtboard();if(!ee){var ue="Invalid artboard name or no default artboard";console.warn(ue),this.eventManager.fire({type:D.LoadError,data:ue});return}this.artboard=ee,ee.volume=this._volume*oe.systemVolume,this.animator=new K(this.runtime,this.artboard,this.eventManager);var xe;if(m.length>0||A.length>0?(xe=m.concat(A),this.animator.initLinearAnimations(m,U),this.animator.initStateMachines(A,U)):xe=[this.animator.atLeastOne(U,false)],this.taskQueue.add({event:{type:U?D.Play:D.Pause,data:xe}}),H){var be=this.file.defaultArtboardViewModel(ee);if(be!==null){var Ce=be.defaultInstance();if(Ce!==null){var Qe=new Ie(Ce,null);(0, f.createFinalization)(Qe,Qe.runtimeInstance),this.bindViewModelInstance(Qe);}}}}},k.prototype.drawFrame=function(){var u,m;!((u=document?.timeline)===null||u===void 0)&&u.currentTime?this.loaded&&this.artboard&&!this.frameRequestId&&(this._boundDraw(document.timeline.currentTime),(m=this.runtime)===null||m===void 0||m.resolveAnimationFrame()):this.scheduleRendering();},k.prototype._canvasSizeChanged=function(){var u=false;return this.canvas&&(this.canvas.width!==this._currentCanvasWidth&&(this._currentCanvasWidth=this.canvas.width,u=true),this.canvas.height!==this._currentCanvasHeight&&(this._currentCanvasHeight=this.canvas.height,u=true)),u},k.prototype.draw=function(u,m){var A;this.frameRequestId=null;var U=performance.now();this.lastRenderTime||(this.lastRenderTime=u),this.renderSecondTimer+=u-this.lastRenderTime,this.renderSecondTimer>5e3&&(this.renderSecondTimer=0,m?.());var H=(u-this.lastRenderTime)/1e3;this.lastRenderTime=u;for(var ee=this.animator.animations.filter(function(on){return on.playing||on.needsScrub}).sort(function(on){return on.needsScrub?-1:1}),ue=0,xe=ee;ue<xe.length;ue++){var be=xe[ue];be.advance(H),be.instance.didLoop&&(be.loopCount+=1),be.apply(1);}for(var Ce=this.animator.stateMachines.filter(function(on){return on.playing}),Qe=0,at=Ce;Qe<at.length;Qe++){var Ke=at[Qe],Tt=Ke.reportedEventCount();if(Tt)for(var vt=0;vt<Tt;vt++){var qt=Ke.reportedEventAt(vt);if(qt)if(qt.type===M.OpenUrl){if(this.eventManager.fire({type:D.RiveEvent,data:qt}),this.automaticallyHandleEvents){var Xt=document.createElement("a"),nn=qt,jn=nn.url,Ne=nn.target,Gn=(0, f.sanitizeUrl)(jn);jn&&Xt.setAttribute("href",Gn),Ne&&Xt.setAttribute("target",Ne),Gn&&Gn!==f.BLANK_URL&&Xt.click();}}else this.eventManager.fire({type:D.RiveEvent,data:qt});}Ke.advanceAndApply(H);}this.animator.stateMachines.length==0&&this.artboard.advance(H);var rn=this.renderer;this._hasZeroSize||(this.drawOptimization==L.AlwaysDraw||this.artboard.didChange()||this._needsRedraw||this._canvasSizeChanged())&&(rn.clear(),rn.save(),this.alignRenderer(),this.artboard.draw(rn),rn.restore(),rn.flush(),this._needsRedraw=false),this.animator.handleLooping(),this.animator.handleStateChanges(),this.animator.handleAdvancing(H),this.frameCount++;var Ye=performance.now();for(this.frameTimes.push(Ye),this.durations.push(Ye-U);this.frameTimes[0]<=Ye-1e3;)this.frameTimes.shift(),this.durations.shift();(A=this._viewModelInstance)===null||A===void 0||A.handleCallbacks(),this.animator.isPlaying?this.scheduleRendering():this.animator.isPaused?this.lastRenderTime=0:this.animator.isStopped&&(this.lastRenderTime=0);},k.prototype.alignRenderer=function(){var u=this,m=u.renderer,A=u.runtime,U=u._layout,H=u.artboard;m.align(U.runtimeFit(A),U.runtimeAlignment(A),{minX:U.minX,minY:U.minY,maxX:U.maxX,maxY:U.maxY},H.bounds,this._devicePixelRatioUsed*U.layoutScaleFactor);},Object.defineProperty(k.prototype,"fps",{get:function(){return this.durations.length},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"frameTime",{get:function(){return this.durations.length===0?0:(this.durations.reduce(function(u,m){return u+m},0)/this.durations.length).toFixed(4)},enumerable:false,configurable:true}),k.prototype.cleanup=function(){var u,m;this.destroyed=true,this.stopRendering(),this.cleanupInstances(),this._observed!==null&&j.remove(this._observed),this.removeRiveListeners(),this.file&&((u=this.riveFile)===null||u===void 0||u.cleanup(),this.file=null),this.riveFile=null,this.deleteRiveRenderer(),this._audioEventListener!==null&&(oe.remove(this._audioEventListener),this._audioEventListener=null),(m=this._viewModelInstance)===null||m===void 0||m.cleanup(),this._viewModelInstance=null,this._dataEnums=null;},k.prototype.deleteRiveRenderer=function(){var u;(u=this.renderer)===null||u===void 0||u.delete(),this.renderer=null;},k.prototype.cleanupInstances=function(){this.eventCleanup!==null&&this.eventCleanup(),this.stop(),this.artboard&&(this.artboard.delete(),this.artboard=null);},k.prototype.retrieveTextRun=function(u){var m;if(!u){console.warn("No text run name provided");return}if(!this.artboard){console.warn("Tried to access text run, but the Artboard is null");return}var A=this.artboard.textRun(u);if(!A){console.warn("Could not access a text run with name '".concat(u,"' in the '").concat((m=this.artboard)===null||m===void 0?void 0:m.name,"' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."));return}return A},k.prototype.getTextRunValue=function(u){var m=this.retrieveTextRun(u);return m?m.text:void 0},k.prototype.setTextRunValue=function(u,m){var A=this.retrieveTextRun(u);A&&(A.text=m);},k.prototype.play=function(u,m){var A=this;if(u=mt(u),!this.readyForPlaying){this.taskQueue.add({action:function(){return A.play(u,m)}});return}this.animator.play(u),this.eventCleanup&&this.eventCleanup(),this.setupRiveListeners(),this.startRendering();},k.prototype.pause=function(u){var m=this;if(u=mt(u),!this.readyForPlaying){this.taskQueue.add({action:function(){return m.pause(u)}});return}this.eventCleanup&&this.eventCleanup(),this.animator.pause(u);},k.prototype.scrub=function(u,m){var A=this;if(u=mt(u),!this.readyForPlaying){this.taskQueue.add({action:function(){return A.scrub(u,m)}});return}this.animator.scrub(u,m||0),this.drawFrame();},k.prototype.stop=function(u){var m=this;if(u=mt(u),!this.readyForPlaying){this.taskQueue.add({action:function(){return m.stop(u)}});return}this.animator&&this.animator.stop(u),this.eventCleanup&&this.eventCleanup();},k.prototype.reset=function(u){var m,A,U=u?.artboard,H=mt(u?.animations),ee=mt(u?.stateMachines),ue=(m=u?.autoplay)!==null&&m!==void 0?m:false,xe=(A=u?.autoBind)!==null&&A!==void 0?A:false;this.cleanupInstances(),this.initArtboard(U,H,ee,ue,xe),this.taskQueue.process();},k.prototype.load=function(u){this.file=null,this.stop(),this.init(u);},Object.defineProperty(k.prototype,"layout",{get:function(){return this._layout},set:function(u){this._layout=u,(!u.maxX||!u.maxY)&&this.resizeToCanvas(),this.loaded&&!this.animator.isPlaying&&this.drawFrame();},enumerable:false,configurable:true}),k.prototype.resizeToCanvas=function(){this._layout=this.layout.copyWith({minX:0,minY:0,maxX:this.canvas.width,maxY:this.canvas.height});},k.prototype.resizeDrawingSurfaceToCanvas=function(u){if(this.canvas instanceof HTMLCanvasElement&&window){var m=this.canvas.getBoundingClientRect(),A=m.width,U=m.height,H=u||window.devicePixelRatio||1;if(this.devicePixelRatioUsed=H,this.canvas.width=H*A,this.canvas.height=H*U,this._needsRedraw=true,this.resizeToCanvas(),this.drawFrame(),this.layout.fit===I.Layout){var ee=this._layout.layoutScaleFactor;this.artboard.width=A/ee,this.artboard.height=U/ee;}}},Object.defineProperty(k.prototype,"source",{get:function(){return this.src},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"activeArtboard",{get:function(){return this.artboard?this.artboard.name:""},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"animationNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var u=[],m=0;m<this.artboard.animationCount();m++)u.push(this.artboard.animationByIndex(m).name);return u},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"stateMachineNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var u=[],m=0;m<this.artboard.stateMachineCount();m++)u.push(this.artboard.stateMachineByIndex(m).name);return u},enumerable:false,configurable:true}),k.prototype.stateMachineInputs=function(u){if(this.loaded){var m=this.animator.stateMachines.find(function(A){return A.name===u});return m?.inputs}},k.prototype.retrieveInputAtPath=function(u,m){if(!u){console.warn("No input name provided for path '".concat(m,"'"));return}if(!this.artboard){console.warn("Tried to access input: '".concat(u,"', at path: '").concat(m,"', but the Artboard is null"));return}var A=this.artboard.inputByPath(u,m);if(!A){console.warn("Could not access an input with name: '".concat(u,"', at path:'").concat(m,"'"));return}return A},k.prototype.setBooleanStateAtPath=function(u,m,A){var U=this.retrieveInputAtPath(u,A);U&&(U.type===R.Boolean?U.asBool().value=m:console.warn("Input with name: '".concat(u,"', at path:'").concat(A,"' is not a boolean")));},k.prototype.setNumberStateAtPath=function(u,m,A){var U=this.retrieveInputAtPath(u,A);U&&(U.type===R.Number?U.asNumber().value=m:console.warn("Input with name: '".concat(u,"', at path:'").concat(A,"' is not a number")));},k.prototype.fireStateAtPath=function(u,m){var A=this.retrieveInputAtPath(u,m);A&&(A.type===R.Trigger?A.asTrigger().fire():console.warn("Input with name: '".concat(u,"', at path:'").concat(m,"' is not a trigger")));},k.prototype.retrieveTextAtPath=function(u,m){if(!u){console.warn("No text name provided for path '".concat(m,"'"));return}if(!m){console.warn("No path provided for text '".concat(u,"'"));return}if(!this.artboard){console.warn("Tried to access text: '".concat(u,"', at path: '").concat(m,"', but the Artboard is null"));return}var A=this.artboard.textByPath(u,m);if(!A){console.warn("Could not access text with name: '".concat(u,"', at path:'").concat(m,"'"));return}return A},k.prototype.getTextRunValueAtPath=function(u,m){var A=this.retrieveTextAtPath(u,m);if(!A){console.warn("Could not get text with name: '".concat(u,"', at path:'").concat(m,"'"));return}return A.text},k.prototype.setTextRunValueAtPath=function(u,m,A){var U=this.retrieveTextAtPath(u,A);if(!U){console.warn("Could not set text with name: '".concat(u,"', at path:'").concat(A,"'"));return}U.text=m;},Object.defineProperty(k.prototype,"playingStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(u){return u.playing}).map(function(u){return u.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"playingAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(u){return u.playing}).map(function(u){return u.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(u){return !u.playing}).map(function(u){return u.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(u){return !u.playing}).map(function(u){return u.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animator.isPlaying},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return this.animator.isPaused},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){var u,m;return (m=(u=this.animator)===null||u===void 0?void 0:u.isStopped)!==null&&m!==void 0?m:true},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"bounds",{get:function(){return this.artboard?this.artboard.bounds:void 0},enumerable:false,configurable:true}),k.prototype.on=function(u,m){this.eventManager.add({type:u,callback:m});},k.prototype.off=function(u,m){this.eventManager.remove({type:u,callback:m});},k.prototype.unsubscribe=function(u,m){console.warn("This function is deprecated: please use `off()` instead."),this.off(u,m);},k.prototype.removeAllRiveEventListeners=function(u){this.eventManager.removeAll(u);},k.prototype.unsubscribeAll=function(u){console.warn("This function is deprecated: please use `removeAllRiveEventListeners()` instead."),this.removeAllRiveEventListeners(u);},k.prototype.stopRendering=function(){this.loaded&&this.frameRequestId&&(this.runtime.cancelAnimationFrame?this.runtime.cancelAnimationFrame(this.frameRequestId):cancelAnimationFrame(this.frameRequestId),this.frameRequestId=null);},k.prototype.startRendering=function(){this.drawFrame();},k.prototype.scheduleRendering=function(){this.loaded&&this.artboard&&!this.frameRequestId&&(this.runtime.requestAnimationFrame?this.frameRequestId=this.runtime.requestAnimationFrame(this._boundDraw):this.frameRequestId=requestAnimationFrame(this._boundDraw));},k.prototype.enableFPSCounter=function(u){this.runtime.enableFPSCounter(u);},k.prototype.disableFPSCounter=function(){this.runtime.disableFPSCounter();},Object.defineProperty(k.prototype,"contents",{get:function(){if(this.loaded){for(var u={artboards:[]},m=0;m<this.file.artboardCount();m++){for(var A=this.file.artboardByIndex(m),U={name:A.name,animations:[],stateMachines:[]},H=0;H<A.animationCount();H++){var ee=A.animationByIndex(H);U.animations.push(ee.name);}for(var ue=0;ue<A.stateMachineCount();ue++){for(var xe=A.stateMachineByIndex(ue),be=xe.name,Ce=new this.runtime.StateMachineInstance(xe,A),Qe=[],at=0;at<Ce.inputCount();at++){var Ke=Ce.input(at);Qe.push({name:Ke.name,type:Ke.type});}U.stateMachines.push({name:be,inputs:Qe});}u.artboards.push(U);}return u}},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"volume",{get:function(){return this.artboard&&this.artboard.volume!==this._volume&&(this._volume=this.artboard.volume),this._volume},set:function(u){this._volume=u,this.artboard&&(this.artboard.volume=u*oe.systemVolume);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardWidth",{get:function(){var u;return this.artboard?this.artboard.width:(u=this._artboardWidth)!==null&&u!==void 0?u:0},set:function(u){this._artboardWidth=u,this.artboard&&(this.artboard.width=u);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardHeight",{get:function(){var u;return this.artboard?this.artboard.height:(u=this._artboardHeight)!==null&&u!==void 0?u:0},set:function(u){this._artboardHeight=u,this.artboard&&(this.artboard.height=u);},enumerable:false,configurable:true}),k.prototype.resetArtboardSize=function(){this.artboard?(this.artboard.resetArtboardSize(),this._artboardWidth=this.artboard.width,this._artboardHeight=this.artboard.height):(this._artboardWidth=void 0,this._artboardHeight=void 0);},Object.defineProperty(k.prototype,"devicePixelRatioUsed",{get:function(){return this._devicePixelRatioUsed},set:function(u){this._devicePixelRatioUsed=u;},enumerable:false,configurable:true}),k.prototype.bindViewModelInstance=function(u){var m;this.artboard&&!this.destroyed&&u&&u.runtimeInstance&&(u.internalIncrementReferenceCount(),(m=this._viewModelInstance)===null||m===void 0||m.cleanup(),this._viewModelInstance=u,this.animator.stateMachines.length>0?this.animator.stateMachines.forEach(function(A){return A.bindViewModelInstance(u)}):this.artboard.bindViewModelInstance(u.runtimeInstance));},Object.defineProperty(k.prototype,"viewModelInstance",{get:function(){return this._viewModelInstance},enumerable:false,configurable:true}),k.prototype.viewModelByIndex=function(u){var m=this.file.viewModelByIndex(u);return m!==null?new ce(m):null},k.prototype.viewModelByName=function(u){var m;return (m=this.riveFile)===null||m===void 0?void 0:m.viewModelByName(u)},k.prototype.enums=function(){if(this._dataEnums===null){var u=this.file.enums();this._dataEnums=u.map(function(m){return new le(m)});}return this._dataEnums},k.prototype.defaultViewModel=function(){if(this.artboard){var u=this.file.defaultArtboardViewModel(this.artboard);if(u)return new ce(u)}return null},k.prototype.getArtboard=function(u){var m,A;return (A=(m=this.riveFile)===null||m===void 0?void 0:m.getArtboard(u))!==null&&A!==void 0?A:null},k.prototype.getBindableArtboard=function(u){var m,A;return (A=(m=this.riveFile)===null||m===void 0?void 0:m.getBindableArtboard(u))!==null&&A!==void 0?A:null},k.prototype.getDefaultBindableArtboard=function(){var u,m;return (m=(u=this.riveFile)===null||u===void 0?void 0:u.getDefaultBindableArtboard())!==null&&m!==void 0?m:null},k.missingErrorMessage="Rive source file or data buffer required",k.cleanupErrorMessage="Attempt to use file after calling cleanup.",k})(),ce=(function(){function k(u){this._viewModel=u;}return Object.defineProperty(k.prototype,"instanceCount",{get:function(){return this._viewModel.instanceCount},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModel.name},enumerable:false,configurable:true}),k.prototype.instanceByIndex=function(u){var m=this._viewModel.instanceByIndex(u);if(m!==null){var A=new Ie(m,null);return (0, f.createFinalization)(A,m),A}return null},k.prototype.instanceByName=function(u){var m=this._viewModel.instanceByName(u);if(m!==null){var A=new Ie(m,null);return (0, f.createFinalization)(A,m),A}return null},k.prototype.defaultInstance=function(){var u=this._viewModel.defaultInstance();if(u!==null){var m=new Ie(u,null);return (0, f.createFinalization)(m,u),m}return null},k.prototype.instance=function(){var u=this._viewModel.instance();if(u!==null){var m=new Ie(u,null);return (0, f.createFinalization)(m,u),m}return null},Object.defineProperty(k.prototype,"properties",{get:function(){return this._viewModel.getProperties()},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"instanceNames",{get:function(){return this._viewModel.getInstanceNames()},enumerable:false,configurable:true}),k})(),le=(function(){function k(u){this._dataEnum=u;}return Object.defineProperty(k.prototype,"name",{get:function(){return this._dataEnum.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"values",{get:function(){return this._dataEnum.values},enumerable:false,configurable:true}),k})(),ye;(function(k){k.Number="number",k.String="string",k.Boolean="boolean",k.Color="color",k.Trigger="trigger",k.Enum="enum",k.List="list",k.Image="image",k.Artboard="artboard";})(ye||(ye={}));var Ie=(function(){function k(u,m){this._parents=[],this._children=[],this._viewModelInstances=new Map,this._propertiesWithCallbacks=[],this._referenceCount=0,this.selfUnref=false,this._runtimeInstance=u,m!==null&&this._parents.push(m);}return Object.defineProperty(k.prototype,"runtimeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"nativeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),k.prototype.handleCallbacks=function(){this._propertiesWithCallbacks.length!==0&&(this._propertiesWithCallbacks.forEach(function(u){u.handleCallbacks();}),this._propertiesWithCallbacks.forEach(function(u){u.clearChanges();})),this._children.forEach(function(u){return u.handleCallbacks()});},k.prototype.addParent=function(u){this._parents.includes(u)||(this._parents.push(u),(this._propertiesWithCallbacks.length>0||this._children.length>0)&&u.addToViewModelCallbacks(this));},k.prototype.removeParent=function(u){var m=this._parents.indexOf(u);if(m!==-1){var A=this._parents[m];A.removeFromViewModelCallbacks(this),this._parents.splice(m,1);}},k.prototype.addToPropertyCallbacks=function(u){var m=this;this._propertiesWithCallbacks.includes(u)||(this._propertiesWithCallbacks.push(u),this._propertiesWithCallbacks.length>0&&this._parents.forEach(function(A){A.addToViewModelCallbacks(m);}));},k.prototype.removeFromPropertyCallbacks=function(u){var m=this;this._propertiesWithCallbacks.includes(u)&&(this._propertiesWithCallbacks=this._propertiesWithCallbacks.filter(function(A){return A!==u}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(A){A.removeFromViewModelCallbacks(m);}));},k.prototype.addToViewModelCallbacks=function(u){var m=this;this._children.includes(u)||(this._children.push(u),this._parents.forEach(function(A){A.addToViewModelCallbacks(m);}));},k.prototype.removeFromViewModelCallbacks=function(u){var m=this;this._children.includes(u)&&(this._children=this._children.filter(function(A){return A!==u}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(A){A.removeFromViewModelCallbacks(m);}));},k.prototype.clearCallbacks=function(){this._propertiesWithCallbacks.forEach(function(u){u.clearCallbacks();});},k.prototype.propertyFromPath=function(u,m){var A=u.split("/");return this.propertyFromPathSegments(A,0,m)},k.prototype.viewModelFromPathSegments=function(u,m){var A=this.internalViewModelInstance(u[m]);return A!==null?m==u.length-1?A:A.viewModelFromPathSegments(u,m++):null},k.prototype.propertyFromPathSegments=function(u,m,A){var U,H,ee,ue,xe,be,Ce,Qe,at,Ke,Tt,vt,qt,Xt,nn,jn,Ne,Gn;if(m<u.length-1){var rn=this.internalViewModelInstance(u[m]);return rn!==null?rn.propertyFromPathSegments(u,m+1,A):null}var Ye=null;switch(A){case ye.Number:if(Ye=(H=(U=this._runtimeInstance)===null||U===void 0?void 0:U.number(u[m]))!==null&&H!==void 0?H:null,Ye!==null)return new pt(Ye,this);break;case ye.String:if(Ye=(ue=(ee=this._runtimeInstance)===null||ee===void 0?void 0:ee.string(u[m]))!==null&&ue!==void 0?ue:null,Ye!==null)return new ht(Ye,this);break;case ye.Boolean:if(Ye=(be=(xe=this._runtimeInstance)===null||xe===void 0?void 0:xe.boolean(u[m]))!==null&&be!==void 0?be:null,Ye!==null)return new It(Ye,this);break;case ye.Color:if(Ye=(Qe=(Ce=this._runtimeInstance)===null||Ce===void 0?void 0:Ce.color(u[m]))!==null&&Qe!==void 0?Qe:null,Ye!==null)return new tt(Ye,this);break;case ye.Trigger:if(Ye=(Ke=(at=this._runtimeInstance)===null||at===void 0?void 0:at.trigger(u[m]))!==null&&Ke!==void 0?Ke:null,Ye!==null)return new Wt(Ye,this);break;case ye.Enum:if(Ye=(vt=(Tt=this._runtimeInstance)===null||Tt===void 0?void 0:Tt.enum(u[m]))!==null&&vt!==void 0?vt:null,Ye!==null)return new Rt(Ye,this);break;case ye.List:if(Ye=(Xt=(qt=this._runtimeInstance)===null||qt===void 0?void 0:qt.list(u[m]))!==null&&Xt!==void 0?Xt:null,Ye!==null)return new Ht(Ye,this);break;case ye.Image:if(Ye=(jn=(nn=this._runtimeInstance)===null||nn===void 0?void 0:nn.image(u[m]))!==null&&jn!==void 0?jn:null,Ye!==null)return new De(Ye,this);break;case ye.Artboard:if(Ye=(Gn=(Ne=this._runtimeInstance)===null||Ne===void 0?void 0:Ne.artboard(u[m]))!==null&&Gn!==void 0?Gn:null,Ye!==null)return new gn(Ye,this);break}return null},k.prototype.internalViewModelInstance=function(u){var m;if(this._viewModelInstances.has(u))return this._viewModelInstances.get(u);var A=(m=this._runtimeInstance)===null||m===void 0?void 0:m.viewModel(u);if(A!==null){var U=new k(A,this);return (0, f.createFinalization)(U,A),U.internalIncrementReferenceCount(),this._viewModelInstances.set(u,U),U}return null},k.prototype.number=function(u){var m=this.propertyFromPath(u,ye.Number);return m},k.prototype.string=function(u){var m=this.propertyFromPath(u,ye.String);return m},k.prototype.boolean=function(u){var m=this.propertyFromPath(u,ye.Boolean);return m},k.prototype.color=function(u){var m=this.propertyFromPath(u,ye.Color);return m},k.prototype.trigger=function(u){var m=this.propertyFromPath(u,ye.Trigger);return m},k.prototype.enum=function(u){var m=this.propertyFromPath(u,ye.Enum);return m},k.prototype.list=function(u){var m=this.propertyFromPath(u,ye.List);return m},k.prototype.image=function(u){var m=this.propertyFromPath(u,ye.Image);return m},k.prototype.artboard=function(u){var m=this.propertyFromPath(u,ye.Artboard);return m},k.prototype.viewModel=function(u){var m=u.split("/"),A=m.length>1?this.viewModelFromPathSegments(m.slice(0,m.length-1),0):this;return A!=null?A.internalViewModelInstance(m[m.length-1]):null},k.prototype.internalReplaceViewModel=function(u,m){var A;if(m.runtimeInstance!==null){var U=((A=this._runtimeInstance)===null||A===void 0?void 0:A.replaceViewModel(u,m.runtimeInstance))||false;if(U){m.internalIncrementReferenceCount();var H=this.internalViewModelInstance(u);H!==null&&(H.removeParent(this),this._children.includes(H)&&(this._children=this._children.filter(function(ee){return ee!==H})),H.cleanup()),this._viewModelInstances.set(u,m),m.addParent(this);}return U}return  false},k.prototype.replaceViewModel=function(u,m){var A,U=u.split("/"),H=U.length>1?this.viewModelFromPathSegments(U.slice(0,U.length-1),0):this;return (A=H?.internalReplaceViewModel(U[U.length-1],m))!==null&&A!==void 0?A:false},k.prototype.incrementReferenceCount=function(){var u;this._referenceCount++,(u=this._runtimeInstance)===null||u===void 0||u.incrementReferenceCount();},k.prototype.decrementReferenceCount=function(){var u;this._referenceCount--,(u=this._runtimeInstance)===null||u===void 0||u.decrementReferenceCount();},Object.defineProperty(k.prototype,"properties",{get:function(){var u;return ((u=this._runtimeInstance)===null||u===void 0?void 0:u.getProperties().map(function(m){return h({},m)}))||[]},enumerable:false,configurable:true}),k.prototype.internalIncrementReferenceCount=function(){this._referenceCount++;},k.prototype.cleanup=function(){var u=this,m;if(this._referenceCount--,this._referenceCount<=0){this.selfUnref&&((m=this._runtimeInstance)===null||m===void 0||m.unref()),this._runtimeInstance=null,this.clearCallbacks(),this._propertiesWithCallbacks=[],this._viewModelInstances.forEach(function(H){H.cleanup();}),this._viewModelInstances.clear();var A=b([],this._children);this._children.length=0;var U=b([],this._parents);this._parents.length=0,A.forEach(function(H){H.removeParent(u);}),U.forEach(function(H){H.removeFromViewModelCallbacks(u);});}},k})(),ut=(function(){function k(u,m){this.callbacks=[],this._viewModelInstanceValue=u,this._parentViewModel=m;}return k.prototype.on=function(u){this.callbacks.length===0&&this._viewModelInstanceValue.clearChanges(),this.callbacks.includes(u)||(this.callbacks.push(u),this._parentViewModel.addToPropertyCallbacks(this));},k.prototype.off=function(u){u?this.callbacks=this.callbacks.filter(function(m){return m!==u}):this.callbacks.length=0,this.callbacks.length===0&&this._parentViewModel.removeFromPropertyCallbacks(this);},k.prototype.internalHandleCallback=function(u){},k.prototype.handleCallbacks=function(){var u=this;this._viewModelInstanceValue.hasChanged&&this.callbacks.forEach(function(m){u.internalHandleCallback(m);});},k.prototype.clearChanges=function(){this._viewModelInstanceValue.clearChanges();},k.prototype.clearCallbacks=function(){this.callbacks.length=0;},Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModelInstanceValue.name},enumerable:false,configurable:true}),k})(),ht=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),u.prototype.internalHandleCallback=function(m){m(this.value);},u})(ut),pt=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),u.prototype.internalHandleCallback=function(m){m(this.value);},u})(ut),It=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),u.prototype.internalHandleCallback=function(m){m(this.value);},u})(ut),Wt=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return u.prototype.trigger=function(){return this._viewModelInstanceValue.trigger()},u.prototype.internalHandleCallback=function(m){m();},u})(ut),Rt=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),Object.defineProperty(u.prototype,"valueIndex",{get:function(){return this._viewModelInstanceValue.valueIndex},set:function(m){this._viewModelInstanceValue.valueIndex=m;},enumerable:false,configurable:true}),Object.defineProperty(u.prototype,"values",{get:function(){return this._viewModelInstanceValue.values},enumerable:false,configurable:true}),u.prototype.internalHandleCallback=function(m){m(this.value);},u})(ut),Ht=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"length",{get:function(){return this._viewModelInstanceValue.size},enumerable:false,configurable:true}),u.prototype.addInstance=function(m){m.runtimeInstance!=null&&(this._viewModelInstanceValue.addInstance(m.runtimeInstance),m.addParent(this._parentViewModel));},u.prototype.addInstanceAt=function(m,A){return m.runtimeInstance!=null&&this._viewModelInstanceValue.addInstanceAt(m.runtimeInstance,A)?(m.addParent(this._parentViewModel),true):false},u.prototype.removeInstance=function(m){m.runtimeInstance!=null&&(this._viewModelInstanceValue.removeInstance(m.runtimeInstance),m.removeParent(this._parentViewModel));},u.prototype.removeInstanceAt=function(m){this._viewModelInstanceValue.removeInstanceAt(m);},u.prototype.instanceAt=function(m){var A=this._viewModelInstanceValue.instanceAt(m);if(A!=null){var U=new Ie(A,this._parentViewModel);return (0, f.createFinalization)(U,A),U}return null},u.prototype.swap=function(m,A){this._viewModelInstanceValue.swap(m,A);},u.prototype.internalHandleCallback=function(m){m();},u})(ut),tt=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),u.prototype.rgb=function(m,A,U){this._viewModelInstanceValue.rgb(m,A,U);},u.prototype.rgba=function(m,A,U,H){this._viewModelInstanceValue.argb(H,m,A,U);},u.prototype.argb=function(m,A,U,H){this._viewModelInstanceValue.argb(m,A,U,H);},u.prototype.alpha=function(m){this._viewModelInstanceValue.alpha(m);},u.prototype.opacity=function(m){this._viewModelInstanceValue.alpha(Math.round(Math.max(0,Math.min(1,m))*255));},u.prototype.internalHandleCallback=function(m){m(this.value);},u})(ut),De=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"value",{set:function(m){var A;this._viewModelInstanceValue.value((A=m?.nativeImage)!==null&&A!==void 0?A:null);},enumerable:false,configurable:true}),u.prototype.internalHandleCallback=function(m){m();},u})(ut),gn=(function(k){p(u,k);function u(m,A){return k.call(this,m,A)||this}return Object.defineProperty(u.prototype,"value",{set:function(m){var A,U,H;m.isBindableArtboard?H=m:H=m.file.internalBindableArtboardFromArtboard(m.nativeArtboard),this._viewModelInstanceValue.value((A=H?.nativeArtboard)!==null&&A!==void 0?A:null),H?.nativeViewModel&&this._viewModelInstanceValue.viewModelInstance((U=H?.nativeViewModel)!==null&&U!==void 0?U:null);},enumerable:false,configurable:true}),u.prototype.internalHandleCallback=function(m){m();},u})(ut),bn=function(k){return g(void 0,void 0,void 0,function(){var u,m,A;return y(this,function(U){switch(U.label){case 0:return u=new Request(k),[4,fetch(u)];case 1:return m=U.sent(),[4,m.arrayBuffer()];case 2:return A=U.sent(),[2,A]}})})},mt=function(k){return typeof k=="string"?[k]:k instanceof Array?k:[]},St={EventManager:W,TaskQueueManager:te},Vt=function(k){return g(void 0,void 0,void 0,function(){var u,m,A;return y(this,function(U){switch(U.label){case 0:return u=new Promise(function(H){return $.getInstance(function(ee){ee.decodeAudio(k,H);})}),[4,u];case 1:return m=U.sent(),A=new f.AudioWrapper(m),f.finalizationRegistry.register(A,m),[2,A]}})})},An=function(k){return g(void 0,void 0,void 0,function(){var u,m,A;return y(this,function(U){switch(U.label){case 0:return u=new Promise(function(H){return $.getInstance(function(ee){ee.decodeImage(k,H);})}),[4,u];case 1:return m=U.sent(),A=new f.ImageWrapper(m),f.finalizationRegistry.register(A,m),[2,A]}})})},tn=function(k){return g(void 0,void 0,void 0,function(){var u,m,A;return y(this,function(U){switch(U.label){case 0:return u=new Promise(function(H){return $.getInstance(function(ee){ee.decodeFont(k,H);})}),[4,u];case 1:return m=U.sent(),A=new f.FontWrapper(m),f.finalizationRegistry.register(A,m),[2,A]}})})};})(),i})());})(Ja)),Ja.exports}var Hd=qC();async function Vd(e){const t=zC(e);if(t)return console.log(`[MGRiveLoader] Using cached RiveFile: ${e}`),t;console.log(`[MGRiveLoader] Loading RiveFile from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to load RiveFile: ${e} (${n.status})`);const r=await n.arrayBuffer(),o={};let i=null;if(await new Promise((l,d)=>{i=new Hd.RiveFile({buffer:r,assetLoader:f=>f.isImage&&BC.includes(f.name)?(o[f.name]=f,console.log(`[MGRiveLoader] Captured image asset: ${f.name}`),true):false,onLoad:()=>{console.log(`[MGRiveLoader] RiveFile loaded: ${e}`),l();},onLoadError:f=>{console.error("[MGRiveLoader] RiveFile load error:",f),d(f);}}),i.init().catch(f=>{console.error("[MGRiveLoader] Failed to initialize RiveFile:",f),d(f);});}),!i)throw new Error(`[MGRiveLoader] Failed to create RiveFile for ${e}`);i.getInstance();const a={riveFile:i,imageAssets:o,url:e,loadedAt:Date.now()};return jC(e,a),a}const mm=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],XC=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),JC=function(e){return "/"+e},Op={},wn=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let d=function(f){return Promise.all(f.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");o=d(n.map(f=>{if(f=JC(f),f in Op)return;Op[f]=true;const p=f.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${h}`))return;const g=document.createElement("link");if(g.rel=p?"stylesheet":XC,p||(g.as="script"),g.crossOrigin="",g.href=f,l&&g.setAttribute("nonce",l),document.head.appendChild(g),p)return new Promise((y,b)=>{g.addEventListener("load",y),g.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${f}`)));})}));}function i(a){const l=new Event("vite:preloadError",{cancelable:true});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return o.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Aa={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3},jc=["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"];async function gm(){try{const{Store:e}=await wn(async()=>{const{Store:o}=await Promise.resolve().then(()=>zi);return {Store:o}},void 0),t=await e.select("myDataAtom");if(!t||typeof t!="object")throw new Error("myDataAtom not available");const n=t.cosmetic,r=t.name;return {avatar:n?.avatar||[...jc],color:n?.color||"Red",name:r||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:[...jc],color:"Red",name:"Player"}}}function bm(e,t){const n=t?[...t]:[...jc];return e.bottom&&(n[Aa.BOTTOM]=e.bottom),e.mid&&(n[Aa.MID]=e.mid),e.top&&(n[Aa.TOP]=e.top),e.expression&&(n[Aa.EXPRESSION]=e.expression),n}const vm="Expression_Stressed.png";function QC(){try{return Array.from(he.document.querySelectorAll("script")).find(r=>r.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function ZC(){return he.location.pathname.split("/").pop()||"UNKNOWN"}async function ek(){try{const e=QC(),t=ZC(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,r=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function Hl(){return  false}const ir={ownedFilenames:new Set,loaded:false,error:null},tk=[];function Vl(){tk.forEach(e=>e());}async function ym(){try{await Pd();const{Store:e}=await wn(async()=>{const{Store:r}=await Promise.resolve().then(()=>zi);return {Store:r}},void 0);if(!await e.select("isUserAuthenticatedAtom")){ir.loaded=!0,Vl();return}const n=await ek();ir.ownedFilenames=new Set(n.map(r=>r.cosmeticFilename)),ir.loaded=!0,ir.error=null,Vl();}catch(e){ir.error=e,ir.loaded=true,Vl();}}function nk(e){return ir.ownedFilenames.has(e)}function rk(){return ir.loaded}const Gc=[];let Np=false,Dp=false;function ok(){Dp||(Dp=true,lk().then(()=>{}).catch(()=>{}));}ok();let $p=false;async function ik(){$p||(await ym(),$p=true);}function Ur(){try{const t=Array.from(he.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${he.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}function ak(e,t){if(!t)return e;let n=e;if(t.type){const r=Array.isArray(t.type)?t.type:[t.type];n=n.filter(o=>r.includes(o.type));}if(t.availability){const r=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(o=>r.includes(o.availability));}if(t.search){const r=t.search.toLowerCase();n=n.filter(o=>o.displayName.toLowerCase().includes(r));}return n}function sk(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:nk(n.filename))}async function lk(){if(!Np)try{const e=Ur(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const i=((await n.json())?.bundles||[]).find(l=>l.name==="cosmetic"||l.name==="cosmetics");if(!i)return;const a=new Set(mm.map(l=>l.filename));for(const l of i.assets||[])for(const d of l.src||[]){if(typeof d!="string")continue;const f=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(d);if(!f)continue;const p=f[1],h=f[2],g=`${h}.png`;if(a.has(g))continue;const y=h.split("_");if(y.length<2)continue;const b=y[0],S=y.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");Gc.push({id:g,filename:g,type:b,displayName:S,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${p}/`)}${g}`}),a.add(g);}Np=!0,console.log(`[Avatar] Discovered ${Gc.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function Wi(e){const t=Ur(),n=Gc.map(f=>({...f,url:f.url||`${t}${f.filename}`})),r=mm.map(f=>({...f,url:`${t}${f.filename}`})),o=new Set,i=[];for(const f of n)o.has(f.filename)||(i.push(f),o.add(f.filename));for(const f of r)o.has(f.filename)||(i.push(f),o.add(f.filename));const l=[...[],...i];let d=ak(l,e);return d=sk(d,e),d}async function xm(e){return await ik(),Wi(e)}function ck(e){return Wi(e).map(t=>t.url)}async function Ys(){const{avatar:e,color:t}=await gm();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function dk(){const e=await gm(),t=await Ys(),n=Wi(),r={};return n.forEach(o=>{r[o.type]=(r[o.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:r,allItems:n,assetBaseUrl:Ur()}}const uk="_Blank.png";let Ea=null;function pk(){if(Ea)return Promise.resolve(Ea);const e=document.createElement("canvas");return e.width=1,e.height=1,new Promise((t,n)=>{e.toBlob(r=>{if(!r){n(new Error("[MGRiveLoader] Failed to create transparent PNG"));return}r.arrayBuffer().then(o=>{Ea=new Uint8Array(o),t(Ea);},n);},"image/png");})}async function Kl(e,t,n){let r;if(t.includes(uk))r=await pk();else {const i=await fetch(`${n}${t}`).then(a=>a.arrayBuffer());r=new Uint8Array(i);}const o=await Hd.decodeImage(r);e.setRenderImage(o),o.unref();}async function wm(e,t){const{imageAssets:n}=e,r=Ur(),o=[];t.top&&n.Top&&o.push(Kl(n.Top,t.top,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Top:",i))),t.mid&&n.Mid&&o.push(Kl(n.Mid,t.mid,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Mid:",i))),t.bottom&&n.Bottom&&o.push(Kl(n.Bottom,t.bottom,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Bottom:",i))),await Promise.all(o);}async function fk(e){const{canvas:t,outfit:n,riveUrl:r,stateMachine:o="State Machine 1",autoplay:i=true}=e;let a=r;if(!a){const p=await pm();if(!p)throw new Error("[MGRiveLoader] Could not find avatar .riv file");a=p.url;}console.log(`[MGRiveLoader] Creating Rive instance from: ${a}`);const l=await Vd(a),d=new Hd.Rive({riveFile:l.riveFile,canvas:t,autoplay:i,stateMachines:o});if(console.log("[MGRiveLoader] Rive instance created"),await wm(l,n),n.expression&&n.expression!=="Expression_Blank.png"){const h=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(n.expression);if(h!==-1&&d.stateMachineInputs("State Machine 1")){const g=d.stateMachineInputs("State Machine 1").find(y=>y.name==="expression");g&&(g.value=h,console.log(`[MGRiveLoader] Set expression: ${n.expression} (index ${h})`),d.drawFrame());}}return console.log("[MGRiveLoader] Outfit applied"),{rive:d,cacheEntry:l,outfit:{...n},play(){d.play();},pause(){d.pause();},triggerAnimation(p){const h=d.stateMachineInputs(o);if(!h)return  false;const g=h.find(y=>y.name===p);return g?(typeof g.fire=="function"?g.fire():g.value=true,true):false},randomAnimation(){const p=d.stateMachineInputs(o);if(!p||p.length===0)return  false;const h=p.filter(y=>typeof y.fire=="function");return h.length===0?false:(h[Math.floor(Math.random()*h.length)].fire(),true)},destroy(){d.cleanup();}}}async function hk(e,t){if(console.log("[MGRiveLoader] Updating outfit"),await wm(e.cacheEntry,t),t.expression&&t.expression!=="Expression_Blank.png"){const r=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(t.expression);if(r!==-1&&e.rive.stateMachineInputs("State Machine 1")){const o=e.rive.stateMachineInputs("State Machine 1").find(i=>i.name==="expression");o&&(o.value=r,console.log(`[MGRiveLoader] Set expression: ${t.expression} (index ${r})`),e.rive.drawFrame());}}e.outfit={...t},console.log("[MGRiveLoader] Outfit updated");}let Bp=false;async function mk(){if(!Bp){Bp=true;try{await VC(),Pp(!0),console.log("[MGRiveLoader] Initialized");}catch(e){throw console.error("[MGRiveLoader] Initialization failed:",e),Pp(false),e}}}function gk(){return UC()}function bk(){return Ks()}async function vk(e){return await Vd(e)}async function yk(){const e=await pm();return e?await Vd(e.url):null}async function xk(e){return await fk(e)}async function wk(e,t){return await hk(e,t)}const wo={init:mk,isReady:gk,list:bk,getRiveFile:vk,getAvatarRiveFile:yk,createInstance:xk,updateOutfit:wk};function Ck(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const Me=Ck();function Cm(){return Me.ready}const zp=he??window;async function km(){const e=Me.ctx;if(e)return e;const t=zp.AudioContext||zp.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return Me.ctx=n,n}async function Sm(){if(Me.ctx&&Me.ctx.state==="suspended")try{await Me.ctx.resume();}catch{}}const kk={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Sk={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},gi=.001,bi=.2;function jp(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Pi(e){const t=kk[e],n=Sk[e];if(!t)return {atom:bi,vol100:_a(bi)};const r=jp(t,NaN);if(Number.isFinite(r)){const i=Fn(r,0,1);return {atom:i,vol100:_a(i)}}if(n){const i=jp(n,NaN);if(Number.isFinite(i)){const a=Fn(i,0,1);return {atom:a,vol100:_a(a)}}}const o=bi;return {atom:o,vol100:_a(o)}}function Ak(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(Fn(t,1,100)-1)/99;return gi+r*(bi-gi)}function _a(e){const t=Fn(Number(e),0,1);if(t<=gi)return 0;const n=(t-gi)/(bi-gi);return Math.round(1+n*99)}function Am(e,t){if(t==null)return Pi(e).atom;const n=Ak(t);return n===null?Pi(e).atom:l0(n)}function Ek(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);Me.sfx.groups=t;}function _k(e){const t=Me.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=Me.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Ik(){if(Me.sfx.buffer)return Me.sfx.buffer;if(!Me.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await km();await Sm();const n=await(await v0(Me.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return Me.sfx.buffer=r,r}async function Tk(e,t={}){if(!Me.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=_k(n),o=Me.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await km();await Sm();const a=await Ik(),l=Math.max(0,+o.start||0),d=Math.max(l,+o.end||l),f=Math.max(.01,d-l),p=Am("sfx",t.volume),h=i.createGain();h.gain.value=p,h.connect(i.destination);const g=i.createBufferSource();return g.buffer=a,g.connect(h),g.start(0,l,f),{name:r,source:g,start:l,end:d,duration:f,volume:p}}const Co={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},Pk={sounds:[],itemCustomSounds:[],version:1},Ln={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class Kd extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class Lk extends Kd{constructor(){super(`Maximum number of sounds reached (${Co.MAX_SOUNDS})`),this.name="SoundLimitError";}}class Mk extends Kd{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${Co.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class Rk extends Kd{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function Fk(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||Yd(t),t}function qs(){const e=it(Bt.MODULE.AUDIO_CUSTOM_SOUNDS,Pk);return Fk(e)}function Yd(e){ct(Bt.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function Gp(){return qs().sounds}function Xs(e){const t=qs();t.sounds=e,Yd(t);}function Js(){return qs().itemCustomSounds}function Em(e){const t=qs();t.itemCustomSounds=e,Yd(t);}function Ok(e){const t={shop:{soundId:e.shop?.soundId??Ln.shop.soundId,volume:e.shop?.volume??Ln.shop.volume,mode:e.shop?.mode??Ln.shop.mode},pet:{soundId:e.pet?.soundId??Ln.pet.soundId,volume:e.pet?.volume??Ln.pet.volume,mode:e.pet?.mode??Ln.pet.mode},weather:{soundId:e.weather?.soundId??Ln.weather.soundId,volume:e.weather?.volume??Ln.weather.volume,mode:e.weather?.mode??Ln.weather.mode}};return t!==e&&Xd(t),t}function qd(){const e=it(Bt.MODULE.AUDIO_NOTIFICATION_SETTINGS,Ln);return Ok(e)}function Xd(e){ct(Bt.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const Nk="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",_m=[{id:"default-notification",name:"Default",source:Nk,type:"upload",createdAt:0}];function Dk(e){const t=new Set(e.map(r=>r.id)),n=_m.filter(r=>!t.has(r.id));return n.length===0?e:[...e,...n]}function Im(e){return _m.some(t=>t.id===e)}function $k(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const o=e.slice(n+1).length*3/4;return Math.round(o)}function Tm(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=$k(e);if(t>0&&t>Co.MAX_SIZE_BYTES)throw new Mk(t)}function Pm(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function Bk(e){if(e>=Co.MAX_SOUNDS)throw new Lk}let hn=[],Uc=false;function zn(){Uc||Lm();}function zk(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function Lm(){if(Uc)return;let e=Gp();e=Dk(e),e.length!==Gp().length&&Xs(e),hn=e,Uc=true,console.log(`[CustomSounds] Initialized with ${hn.length} sounds`);}function jk(){return zn(),[...hn]}function Mm(e){return zn(),hn.find(t=>t.id===e)}function Gk(e,t,n){zn(),Pm(e),Tm(t),Bk(hn.length);const r={id:zk(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return hn.push(r),Xs(hn),console.log(`[CustomSounds] Added sound: ${r.name} (${r.id})`),r}function Uk(e){if(zn(),Im(e))throw new Error("Cannot remove default sounds");const t=hn.findIndex(r=>r.id===e);if(t===-1)return  false;const n=hn.splice(t,1)[0];return Xs(hn),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function Wk(e,t){if(zn(),Im(e))throw new Error("Cannot update default sounds");const n=hn.find(r=>r.id===e);return n?(t.name!==void 0&&(Pm(t.name),n.name=t.name.trim()),t.source!==void 0&&(Tm(t.source),n.source=t.source.trim()),Xs(hn),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function Hk(e,t={}){zn();const n=Mm(e);if(!n)throw new Rk(e);const{MGAudio:r}=await wn(async()=>{const{MGAudio:o}=await Promise.resolve().then(()=>Nm);return {MGAudio:o}},void 0);try{await r.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(o){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,o),o}}function Vk(){wn(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>Nm);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function Kk(){return qd()}function Yk(e){return qd()[e]}function qk(e,t){const n=qd();n[e]=t,Xd(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function Xk(e){Xd(e),console.log("[CustomSounds] Updated all notification settings");}function ko(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function Rm(e,t,n){zn();const r=Js(),o=ko(e,t,n);return r.find(i=>ko(i.entityType,i.entityId,i.shopType)===o)??null}function Jk(e,t,n,r){zn();const o=Js(),i=ko(e,t,r),a=o.findIndex(d=>ko(d.entityType,d.entityId,d.shopType)===i),l={entityType:e,entityId:t,shopType:r,soundId:n.soundId,volume:n.volume,mode:n.mode};a!==-1?o[a]=l:o.push(l),Em(o),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(gt.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:r,config:n}}));}function Qk(e,t,n){zn();const r=Js(),o=ko(e,t,n),i=r.findIndex(a=>ko(a.entityType,a.entityId,a.shopType)===o);return i===-1?false:(r.splice(i,1),Em(r),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(gt.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function Zk(e,t,n){return Rm(e,t,n)!==null}function eS(e){return zn(),Js().filter(n=>n.entityType===e)}const Fe={init:Lm,getAll:jk,getById:Mm,add:Gk,remove:Uk,update:Wk,play:Hk,stop:Vk,getNotificationSettings:Kk,getNotificationConfig:Yk,setNotificationConfig:qk,setNotificationSettings:Xk,getItemCustomSound:Rm,setItemCustomSound:Jk,removeItemCustomSound:Qk,hasItemCustomSound:Zk,getItemCustomSoundsByType:eS};let Ia=null;async function tS(){return Me.ready?true:Ia||(Ia=(async()=>{Me.baseUrl=await Po.base();const e=await vo.load({baseUrl:Me.baseUrl}),t=vo.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];Me.urls[i].set(a,Fr(Me.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(Me.sfx.mp3Url=Fr(Me.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(Me.sfx.atlasUrl=Fr(Me.baseUrl,r));}if(!Me.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return Me.sfx.atlas=await vh(Me.sfx.atlasUrl),Ek(Me.sfx.atlas),Fe.init(),Me.ready=true,true})(),Ia)}function Fm(e){if(e!=="music"&&e!=="ambience")return  false;const t=Me.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return Me.tracks[e]=null,true}function nS(e,t,n={}){if(!Me.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=Me.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Fm(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=Am(e,n.volume),o.preload="auto",o.play().catch(()=>{}),Me.tracks[e]=o,o}function rS(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(Me.urls[n].keys()).sort():n==="sfx"?Me.sfx.atlas?t.groups?Array.from(Me.sfx.groups.keys()).sort():Object.keys(Me.sfx.atlas).sort():[]:[]}function oS(){return ["sfx","music","ambience"]}function iS(){return Array.from(Me.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function aS(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=Me.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function sS(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(Me.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function lS(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=Me.urls[n],i=r.toLowerCase();for(const[a,l]of Array.from(o.entries()))if(a.toLowerCase()===i)return l;return null}function cS(){return Me.tracks.music&&(Me.tracks.music.volume=Pi("music").atom),Me.tracks.ambience&&(Me.tracks.ambience.volume=Pi("ambience").atom),true}let en=null;async function dS(e,t={}){Om();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const r={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,en?.audio===n&&(en=null));},setVolume:o=>{n.volume=Math.max(0,Math.min(1,o));},isPlaying:()=>!n.paused&&!n.ended};en=r;try{await new Promise((o,i)=>{const a=setTimeout(()=>{i(new Error("Audio load timeout"));},5e3),l=()=>{clearTimeout(a),n.removeEventListener("canplay",d),n.removeEventListener("error",f);},d=()=>{l(),o();},f=()=>{l(),i(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(a),o()):(n.addEventListener("canplay",d,{once:!0}),n.addEventListener("error",f,{once:!0}));}),await n.play();}catch(o){throw en=null,o}return n.addEventListener("ended",()=>{en?.audio===n&&(en=null);}),r}function Om(){return en?(en.stop(),en=null,true):false}function uS(e){return en?(en.setVolume(e),true):false}function pS(){return en?.isPlaying()??false}function fS(){return en}function Kt(){if(!Cm())throw new Error("MGAudio not ready yet")}async function hS(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Tk(o,n);if(r==="music"||r==="ambience")return nS(r,o,n);throw new Error(`Unknown category: ${r}`)}const wt={init:tS,isReady:Cm,play:hS,stop:e=>(Kt(),Fm(e)),list:(e,t)=>(Kt(),rS(e,t)),refreshVolumes:()=>(Kt(),cS()),categoryVolume:e=>(Kt(),Pi(e)),getCategories:()=>(Kt(),oS()),getGroups:()=>(Kt(),iS()),hasTrack:(e,t)=>(Kt(),aS(e,t)),hasGroup:e=>(Kt(),sS(e)),getTrackUrl:(e,t)=>(Kt(),lS(e,t)),playCustom:async(e,t)=>(Kt(),dS(e,t)),stopCustom:()=>(Kt(),Om()),setCustomVolume:e=>(Kt(),uS(e)),isCustomPlaying:()=>(Kt(),pS()),getCustomHandle:()=>(Kt(),fS()),CustomSounds:Fe},Nm=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:wt},Symbol.toStringTag,{value:"Module"}));function mS(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const ot=mS();function Dm(){return ot.ready}let Ta=null;async function gS(){return ot.ready?true:Ta||(Ta=(async()=>{ot.baseUrl=await Po.base();const e=await vo.load({baseUrl:ot.baseUrl}),t=vo.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ot.byCat.clear(),ot.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const l=i.slice(0,a),d=i.slice(a+1),f=Fr(ot.baseUrl,r);ot.byBase.set(i,f),ot.byCat.has(l)||ot.byCat.set(l,new Map),ot.byCat.get(l).set(d,f);}return ot.ready=true,true})(),Ta)}function Wc(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function bS(e,t){if(t===void 0){const i=Wc(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=Wc(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function vS(){return Array.from(ot.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function yS(e){const t=ot.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Hc(e,t){const{cat:n,asset:r,base:o}=bS(e,t),i=ot.byBase.get(o);if(i)return i;const l=ot.byCat.get(n)?.get(r);if(l)return l;if(!ot.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Fr(ot.baseUrl,`cosmetic/${o}.png`)}const Up=he?.document??document;function xS(){if(ot.overlay)return ot.overlay;const e=Up.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Up.documentElement.appendChild(e),ot.overlay=e,e}function wS(){const e=ot.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function CS(e){return ot.defaultParent=e,true}const kS=he?.document??document;function Vc(e,t,n){if(!ot.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?Hc(e,o):Hc(e),a=kS.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):Wc(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[l,d]of Object.entries(r.style))try{a.style[l]=String(d);}catch{}return a}function SS(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||wS()||xS(),a=o!==void 0?Vc(e,o,r):Vc(e,r);if(i===ot.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const d=r.scale??1,f=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${d}) rotate(${f}rad)`;else {const p=r.x??innerWidth/2,h=r.y??innerHeight/2;a.style.left=`${p}px`,a.style.top=`${h}px`,a.style.transform=`scale(${d}) rotate(${f}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${d}) rotate(${f}rad)`);}}return i.appendChild(a),ot.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}ot.live.delete(a);},a}function AS(){for(const e of Array.from(ot.live))e.__mgDestroy?.();}const ES=100,vi=[];let Kc=null;function _S(){const e=x("div",{className:"ws-logger",style:"display: flex; flex-direction: column; gap: 8px; font-family: monospace; font-size: 11px; height: 100%; overflow: hidden;"}),t=x("div",{style:"display: flex; justify-content: space-between; align-items: center; padding: 0 4px;"});t.appendChild(x("span",{textContent:"Live Traffic (Last 100)",style:"opacity: 0.6;"}));const n=x("button",{textContent:"Clear",style:"background: none; border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; padding: 2px 8px; border-radius: 4px; font-size: 10px;",onclick:()=>{vi.length=0,a();}});t.appendChild(n),e.appendChild(t);const r=x("div",{style:"flex: 1; overflow-y: auto; background: #000; padding: 4px; border-radius: 4px; border: 1px solid var(--border-color); display: flex; flex-direction: column;"}),o=x("div",{style:"height: 150px; border-top: 1px solid var(--border-color); overflow: auto; background: rgba(0,0,0,0.5); padding: 8px; display: none;"}),i=x("pre",{style:"margin: 0; color: var(--color-primary); font-size: 10px;"});o.appendChild(i);const a=()=>{r.innerHTML="",vi.slice().reverse().forEach(l=>{const d=x("div",{className:"ws-log-row",style:`padding: 4px; border-bottom: 1px solid #111; cursor: pointer; color: ${l.direction==="in"?"#4CAF50":"#2196F3"}; display: flex; gap: 8px;`}),f=new Date(l.timestamp).toLocaleTimeString([],{hour12:false,hour:"2-digit",minute:"2-digit",second:"2-digit"});d.appendChild(x("span",{textContent:f,style:"opacity: 0.4; flex-shrink: 0;"})),d.appendChild(x("strong",{textContent:l.direction.toUpperCase(),style:"width: 25px; flex-shrink: 0;"})),d.appendChild(x("span",{textContent:l.type,style:"font-weight: bold; flex-shrink: 0;"})),d.appendChild(x("span",{textContent:l.summary,style:"opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"})),d.addEventListener("click",()=>{r.querySelectorAll(".ws-log-row").forEach(h=>h.style.background=""),d.style.background="rgba(255,255,255,0.1)",o.style.display="block",i.textContent=JSON.stringify(l.payload,null,2);}),r.appendChild(d);});};return Kc=a,e.appendChild(r),e.appendChild(o),a(),e}function Yc(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const l=n.value;a=typeof l=="object"?`{${Object.keys(l||{}).slice(0,2).join(",")}}`:String(l);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const l=Object.keys(n).filter(d=>d!=="type");l.length>0&&(r=`PartialState - {${l.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));vi.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),vi.length>ES&&vi.shift(),Kc&&Kc();}const Yt={nativeCtor:null,captured:[],latestOpen:null},Wp=Symbol.for("ariesmod.ws.capture.wrapped"),Hp=Symbol.for("ariesmod.ws.capture.native"),$m=1;function qc(e){return !!e&&e.readyState===$m}function IS(){if(qc(Yt.latestOpen))return Yt.latestOpen;for(let e=Yt.captured.length-1;e>=0;e--){const t=Yt.captured[e];if(qc(t))return t}return null}function TS(e,t){Yt.captured.push(e),Yt.captured.length>25&&Yt.captured.splice(0,Yt.captured.length-25);const n=()=>{Yt.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Yt.latestOpen===e&&(Yt.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Yc("in",o.type||"unknown",o);}catch{Yc("in","raw",r.data);}}),e.readyState===$m&&n();}function PS(e=he,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[Wp])return Yt.nativeCtor=r[Hp]??Yt.nativeCtor??null,()=>{};const o=r;Yt.nativeCtor=o;function i(a,l){const d=l!==void 0?new o(a,l):new o(a);try{TS(d,n);}catch{}return d}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[Wp]=true,i[Hp]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function LS(e=he){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ws(e=he){const t=IS();if(t)return {ws:t,source:"captured"};const n=LS(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Bm(e,t={}){const n=t.pageWindow??he,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const l=()=>{const f=ws(n);(f.ws!==i||f.source!==a)&&(i=f.ws,a=f.source,o&&console.log("[WS] best socket changed:",f.source,f.ws),e(f));};l();const d=setInterval(l,r);return ()=>clearInterval(d)}function MS(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function RS(e,t=he){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=ws(t);if(!r)return {ok:false,reason:"no-ws"};if(!qc(r))return {ok:false,reason:"not-open"};const o=MS(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);Yc("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function FS(e,t={},n=he){return RS({type:e,...t},n)}const nr={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},me={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",ToggleLockItem:"ToggleLockItem",SetSelectedItem:"SetSelectedItem",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",GrowEgg:"GrowEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",CropCleanser:"CropCleanser",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",SwapPetFromStorage:"SwapPetFromStorage",PickupPet:"PickupPet",MovePetSlot:"MovePetSlot",NamePet:"NamePet",SellPet:"SellPet",ThrowSnowball:"ThrowSnowball",CheckFriendBonus:"CheckFriendBonus",ReportSpeakingStart:"ReportSpeakingStart"};var kn=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(kn||{});new Set(Object.values(nr));new Set(Object.values(me));const OS=["Room","Quinoa"],NS={Room:["Room"],Quinoa:OS};function Pe(e,t={},n=he){const r=t,{scopePath:o,scope:i,...a}=r,l=typeof o=="string"?o:i,d=Array.isArray(o)?o:l==="Room"||l==="Quinoa"?NS[l]:null;return FS(e,d?{scopePath:d,...a}:a,n)}function DS(e,t=he){return Pe(me.Chat,{scope:"Room",message:e},t)}function $S(e,t=he){return Pe(me.Emote,{scope:"Room",emoteType:e},t)}function BS(e,t=he){return Pe(me.Wish,{scope:"Quinoa",wish:e},t)}function zS(e,t=he){return Pe(me.KickPlayer,{scope:"Room",playerId:e},t)}function Qs(e,t=he){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:r}=e;return Pe(me.SetPlayerData,{scope:"Room",name:n,cosmetic:r},t)}function jS(e=he){return Pe(me.UsurpHost,{scope:"Quinoa"},e)}function GS(e=he){return Pe(me.ReportSpeakingStart,{scope:"Quinoa"},e)}function US(e,t=he){return Pe(me.SetSelectedGame,{scope:"Room",gameId:e},t)}function WS(e,t=he){return Pe(me.VoteForGame,{scope:"Room",gameId:e},t)}function HS(e=he){return Pe(me.RestartGame,{scope:"Room"},e)}function VS(e,t=he){return Pe(me.Ping,{scope:"Quinoa",id:e},t)}function zm(e,t,n=he){return Pe(me.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const KS=zm;function YS(e,t,n=he){return Pe(me.Teleport,{scope:"Quinoa",x:e,y:t},n)}function qS(e=he){return Pe(me.CheckWeatherStatus,{scope:"Quinoa"},e)}function XS(e,t,n=he){return Pe(me.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function JS(e,t=he){return Pe(me.DropObject,{scope:"Quinoa",slotIndex:e},t)}function QS(e,t=he){return Pe(me.PickupObject,{scope:"Quinoa",objectId:e},t)}function jm(e,t=he){return Pe(me.ToggleLockItem,{scope:"Quinoa",itemId:e},t)}const ZS=jm;function e1(e,t=he){return Pe(me.SetSelectedItem,{scope:"Quinoa",itemIndex:e},t)}function Jd(e,t="PetHutch",n,r,o=he){return Pe(me.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toStorageIndex:n},...r!==void 0&&{quantity:r}},o)}function Qd(e,t="PetHutch",n,r,o=he){return Pe(me.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toInventoryIndex:n},...r!==void 0&&{quantity:r}},o)}function t1(e,t,n,r=he){return Pe(me.MoveStorageItem,{scope:"Quinoa",itemId:e,storageId:t,toStorageIndex:n},r)}function n1(e=he){return Pe(me.LogItems,{scope:"Quinoa"},e)}function r1(e,t,n=he){return Pe(me.PlantSeed,{scope:"Quinoa",slot:e,species:t},n)}function o1(e,t=he){return Pe(me.WaterPlant,{scope:"Quinoa",slot:e},t)}function i1(e,t,n=he){return Pe(me.HarvestCrop,{scope:"Quinoa",slot:e,...t!==void 0&&{slotsIndex:t}},n)}function a1(e=he){return Pe(me.SellAllCrops,{scope:"Quinoa"},e)}function Zd(e,t=he){return Pe(me.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function eu(e,t=he){return Pe(me.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function tu(e,t=he){return Pe(me.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function nu(e,t=he){return Pe(me.PurchaseSeed,{scope:"Quinoa",species:e},t)}function Gm(e,t,n=he){return Pe(me.GrowEgg,{scope:"Quinoa",slot:e,eggId:t},n)}const s1=Gm;function l1(e,t=he){return Pe(me.HatchEgg,{scope:"Quinoa",slot:e},t)}function c1(e,t,n=he){return Pe(me.PlantGardenPlant,{scope:"Quinoa",slot:e,itemId:t},n)}function d1(e,t=he){return Pe(me.PotPlant,{scope:"Quinoa",slot:e},t)}function u1(e,t,n,r=he){return Pe(me.MutationPotion,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t,mutation:n},r)}function p1(e,t,n=he){return Pe(me.CropCleanser,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t},n)}function f1(e,t,n=he){return Pe(me.PickupDecor,{scope:"Quinoa",tileType:e,localTileIndex:t},n)}function h1(e,t,n,r,o=he){return Pe(me.PlaceDecor,{scope:"Quinoa",decorId:e,tileType:t,localTileIndex:n,...r!==void 0&&{rotation:r}},o)}function m1(e,t,n=he){return Pe(me.RemoveGardenObject,{scope:"Quinoa",slot:e,slotType:t},n)}function Um(e,t={x:0,y:0},n="Dirt",r=0,o=he){return Pe(me.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function g1(e,t,n=he){return Pe(me.FeedPet,{scope:"Quinoa",petItemId:e,cropItemId:t},n)}function b1(e,t=he){return Pe(me.PetPositions,{scope:"Quinoa",petPositions:e},t)}function Wm(e,t,n=he){return Pe(me.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function v1(e,t,n,r=he){return Pe(me.SwapPetFromStorage,{scope:"Quinoa",petSlotId:e,storagePetId:t,storageId:n},r)}function Hm(e,t=he){return Pe(me.PickupPet,{scope:"Quinoa",petId:e},t)}function y1(e,t,n=he){return Pe(me.MovePetSlot,{scope:"Quinoa",movePetSlotId:e,toPetSlotIndex:t},n)}function x1(e,t,n=he){return Pe(me.NamePet,{scope:"Quinoa",petItemId:e,name:t},n)}function w1(e,t=he){return Pe(me.SellPet,{scope:"Quinoa",itemId:e},t)}function C1(e=he){return Pe(me.ThrowSnowball,{scope:"Quinoa"},e)}function k1(e=he){return Pe(me.CheckFriendBonus,{scope:"Quinoa"},e)}async function Vm(e){try{const t=await Ys(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],r=e.color!==void 0?e.color:t.color,o=Qs({cosmetic:{color:r,avatar:n}},he);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:o}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function S1(){return Vm({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const li=new Map;function A1(e){if(li.has(e))return li.get(e);const t=new Promise((n,r)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>n(o),o.onerror=()=>{li.delete(e),r(new Error(`Failed to load image: ${e}`));},o.src=e;});return li.set(e,t),t}function E1(){li.clear();}function _1(e){return Wi().find(r=>r.filename===e)?.url||""}async function I1(e,t={}){const n=document.createElement("canvas"),r=t.width||400,o=t.height||400,i=t.scale||1;n.width=r*i,n.height=o*i;const a=n.getContext("2d");if(!a)throw new Error("Failed to get canvas 2D context");if(a.imageSmoothingEnabled=i!==1,e.color){const p={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};a.fillStyle=p[e.color]||"#FF0000",a.fillRect(0,0,n.width,n.height);}const d=[e.bottom,e.mid,e.top,e.expression].filter(p=>!!p).map(p=>_1(p));return (await Promise.all(d.map(p=>A1(p)))).forEach(p=>{a.drawImage(p,0,0,n.width,n.height);}),n}let ru=null,co=null,Tr=null,sr=null;function Yl(e){return Ur()+e}async function T1(e){try{const{Store:t}=await wn(async()=>{const{Store:a}=await Promise.resolve().then(()=>zi);return {Store:a}},void 0),n=await t.select("myDataAtom"),r=n?.cosmetic?.avatar||[],o=bm(e,r),i=e.color||n?.cosmetic?.color||"Red";return ru={avatar:o,color:i},L1(),M1(o),console.log("[Avatar] Rendered avatar override:",o),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function P1(){ru=null,co&&(clearInterval(co),co=null),Tr&&(Tr.disconnect(),Tr=null);const e=he.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),sr&&(sr.remove(),sr=null),console.log("[Avatar] Cleared override"),true}function L1(){if(sr)return;const e=he.document;sr=e.createElement("style"),sr.id="gemini-avatar-override-styles",sr.textContent=`
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
    `,e.head.appendChild(sr);}function M1(e){co&&clearInterval(co),Tr&&Tr.disconnect();const t=he.document,n=()=>{const o=t.querySelectorAll(".Avatar");let i=0;o.forEach(a=>{const l=Array.from(a.querySelectorAll("img"));if(l.length===4){let f=false;l.forEach((p,h)=>{const g=Yl(e[h]);p.src!==g&&(f=true);}),f&&(l.forEach((p,h)=>{p.src=Yl(e[h]),p.setAttribute("data-gemini-override",e[h]);}),i++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const f=t.createElement("div");f.className="gemini-avatar-overlay",e.forEach(p=>{const h=t.createElement("img");h.src=Yl(p),h.setAttribute("data-gemini-cosmetic",p),f.appendChild(h);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(f),i++;}}),i>0&&console.log(`[Avatar] Re-applied ${i} override(s) (React reverted)`);};n(),co=setInterval(n,500),Tr=new MutationObserver(()=>{setTimeout(n,10);});const r=t.querySelector(".game-root")||t.querySelector("#root")||t.body;Tr.observe(r,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function R1(){return ru}function F1(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===vm.toLowerCase()}function O1(e){return e.some(F1)}let Cs=null,no=null;he.Gemini_AvatarOverride=null;async function Km(e){try{const{Store:t}=await wn(async()=>{const{Store:S}=await Promise.resolve().then(()=>zi);return {Store:S}},void 0),{getPlayers:n}=await wn(async()=>{const{getPlayers:S}=await Promise.resolve().then(()=>cg);return {getPlayers:S}},void 0);Hl();const i=n().get().myPlayer;if(!i)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=i.id,l=i.cosmetic.avatar;he.MagicCircle_PlayerId=a,no||(no=[...l]);let d=bm(e,l);const f=O1(d);Hl(),Cs=d,he.Gemini_AvatarOverride=d,console.log("[WorldAvatar] Applying override:",d);const p=await t.select("stateAtom");if(!p?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const h=p.data.players.findIndex(S=>S.id===a);if(h===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const g=p.data.players[h],y=[...p.data.players];y[h]={...g,cosmetic:{...g.cosmetic,avatar:d}};const b={...p,data:{...p.data,players:y}};return await t.set("stateAtom",b),Hl()&&f||Qs({name:i.name,cosmetic:{...i.cosmetic,avatar:d}},he),!0}catch{return  false}}async function N1(){if(!Cs||!no)return  true;try{const{Store:e}=await wn(async()=>{const{Store:h}=await Promise.resolve().then(()=>zi);return {Store:h}},void 0),{getPlayers:t}=await wn(async()=>{const{getPlayers:h}=await Promise.resolve().then(()=>cg);return {getPlayers:h}},void 0);he.Gemini_AvatarOverride=null;const o=t().get().myPlayer;if(!o)return !1;const i=o.id,a=await e.select("stateAtom");if(!a?.data?.players)return !1;const l=a.data.players.findIndex(h=>h.id===i);if(l===-1)return !1;const d=a.data.players[l],f=[...a.data.players];f[l]={...d,cosmetic:{...d.cosmetic,avatar:no}};const p={...a,data:{...a.data,players:f}};return await e.set("stateAtom",p),Qs({name:o.name,cosmetic:{...o.cosmetic,avatar:no}},he),Cs=null,no=null,!0}catch{return  false}}function D1(){return Cs}let Dt=[];const Qa=[],Vp=()=>{Qa.forEach(e=>e([...Dt]));},Nr={init(){Dt=it(Bt.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...Dt]},async save(e,t,n){if(!n){const i=Dt.find(a=>a.top===t.top&&a.mid===t.mid&&a.bottom===t.bottom&&a.expression===t.expression);if(i)return i.id}const r=n||Math.random().toString(36).substring(2,9),o={...t,id:r,name:e,createdAt:n&&Dt.find(i=>i.id===n)?.createdAt||Date.now()};if(n){const i=Dt.findIndex(a=>a.id===n);i!==-1?Dt[i]=o:Dt.push(o);}else Dt.push(o);return ct(Bt.SECTION.AVATAR_LOADOUTS,Dt),Vp(),r},delete(e){Dt=Dt.filter(t=>t.id!==e),ct(Bt.SECTION.AVATAR_LOADOUTS,Dt),Vp();},rename(e,t){const n=Dt.find(r=>r.id===e);n&&(n.name=t,ct(Bt.SECTION.AVATAR_LOADOUTS,Dt));},async wear(e){const t=Dt.find(r=>r.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await Km(n)},subscribe(e){return Qa.push(e),()=>{const t=Qa.indexOf(e);t!==-1&&Qa.splice(t,1);}}},Ym={init:ym,isReady:()=>rk(),list:Wi,listAsync:xm,listUrls:ck,get:Ys,debug:dk,set:Vm,blank:S1,Loadouts:Nr,toCanvas:I1,clearImageCache:E1,render:T1,clearOverride:P1,getOverride:R1,renderWorld:Km,clearWorldOverride:N1,getWorldOverride:D1};function Ar(){if(!Dm())throw new Error("MGCosmetic not ready yet")}const ou={init:gS,isReady:Dm,categories:()=>(Ar(),vS()),list:e=>(Ar(),yS(e)),url:((e,t)=>(Ar(),Hc(e,t))),create:((e,t,n)=>(Ar(),Vc(e,t,n))),show:((e,t,n)=>(Ar(),SS(e,t,n))),attach:e=>(Ar(),CS(e)),clear:()=>(Ar(),AS()),Avatar:Ym},Kp={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function qm(e){const t=Oe.get("mutations");if(!t)return Kp[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?Kp[e]??null:n.coinMultiplier}const ql=new Map;function Xl(e){if(ql.has(e))return ql.get(e);const t=qm(e)??1;return ql.set(e,t),t}const $1=new Set(["Gold","Rainbow"]),B1=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function Xm(e){let t=1,n=0,r=0;for(const o of e)if(o==="Gold"||o==="Rainbow")o==="Rainbow"?t=Xl("Rainbow"):t===1&&(t=Xl("Gold"));else {const i=Xl(o);i>1&&(n+=i,r++);}return t*(1+n-r)}function z1(e){return qm(e)}function j1(e){return $1.has(e)}function G1(e){return B1.has(e)}function U1(e){return G1(e)}function iu(e,t){const n=au(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function Li(e,t,n){const r=au(e);if(!r)return 0;const o=r.baseSellPrice,i=Xm(n);return Math.round(o*t*i)}function W1(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function H1(e,t){return t>=e}function au(e){const t=Oe.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Jm=3600,Jl=80,V1=100,ci=30;function Zs(e){return e/Jm}function el(e,t){const n=Hi(e);if(!n)return Jl;const r=n.maxScale;if(t<=1)return Jl;if(t>=r)return V1;const o=(t-1)/(r-1);return Math.floor(Jl+20*o)}function tl(e,t,n){const r=Hi(e);if(!r)return n-ci;const o=r.hoursToMature,i=t/Jm,a=ci/o,l=Math.min(a*i,ci),d=n-ci;return Math.floor(d+l)}function nl(e,t){const n=Hi(e);return n?t>=n.hoursToMature:false}function Qm(e){const t=Hi(e);return t?ci/t.hoursToMature:0}function K1(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Hi(e){const t=Oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Y1(e,t){return t<=0?1:Math.min(1,e/t)}const Zn=3600,Pa=80,Yp=100,On=30,q1={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Vi(e){const t=Oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function X1(e){return e/Zn}function Zm(e,t){const n=Vi(e);if(!n)return Pa;const{maxScale:r}=n;if(t<=1)return Pa;if(t>=r)return Yp;const o=(t-1)/(r-1);return Math.floor(Pa+(Yp-Pa)*o)}function J1(e){return e-On}function Q1(e){const t=Vi(e);return !t||t.hoursToMature<=0?0:On/t.hoursToMature}function eg(e,t,n){const r=Vi(e);if(!r)return n-On;const o=t/Zn,i=On/r.hoursToMature,a=Math.min(i*o,On),l=n-On;return Math.floor(l+a)}function tg(e,t,n){const r=Vi(e);if(!r)return 0;const o=n-On,i=t-o;if(i<=0)return 0;const a=On/r.hoursToMature;return a<=0?0:i/a*Zn}function su(e,t,n,r,o=Zn){const a=tg(e,n,r)-t;return a<=0?0:o<=0?1/0:a/o}function ng(e,t,n,r=Zn){return su(e,t,n,n,r)}function rg(e,t,n,r,o=Zn){if(n>=r)return 0;const i=n+1;return su(e,t,i,r,o)}function Z1(e,t){return e>=t}function eA(e,t){const n=t-On,o=(e-n)/On*100;return Math.min(100,Math.max(0,o))}const tA=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:X1,calculateCurrentStrength:eg,calculateHoursToMaxStrength:ng,calculateHoursToNextStrength:rg,calculateHoursToStrength:su,calculateMaxStrength:Zm,calculateStartingStrength:J1,calculateStrengthPerHour:Q1,calculateStrengthProgress:eA,calculateXpForStrength:tg,getSpeciesData:Vi,isPetMature:Z1},Symbol.toStringTag,{value:"Module"}));function lu(e){const t=Oe.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=q1[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function nA(e,t){return e<=0?0:t<=0?1/0:e/t}function cu(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const i=e-o,a=r/n;return Math.ceil(i/a)}function og(e,t,n){const r=Oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=lu(e);return cu(n,t,a,i)}function ks(e,t,n){const r=Oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=lu(e);return cu(n,t,a,i)}function ig(e,t,n,r,o,i){return e?t&&i>0?ks(n,r,i):0:ks(n,r,o)}const rA=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:ig,calculateFeedsForDuration:cu,calculateFeedsToMaxStrength:ks,calculateFeedsToNextStrength:og,calculateHoursUntilStarving:nA,getHungerDrainPerHour:lu},Symbol.toStringTag,{value:"Module"})),ag={init(){},isReady(){return  true},crop:{calculateSize:iu,calculateSellPrice:Li,calculateProgress:W1,isReady:H1,getData:au},pet:{calculateAge:Zs,calculateMaxStrength:el,calculateCurrentStrength:tl,isMature:nl,calculateStrengthPerHour:Qm,getData:Hi},mutation:{calculateMultiplier:Xm,getValue:z1,isGrowth:j1,isEnvironmental:U1},xp:tA,feed:rA};function Cn(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!Cn(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!Cn(n[a],r[a]))return  false;return  true}const qp={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenPlayer",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"mySelectedSlotIdAtom"},Xp={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function oA(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function iA(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function aA(e){const t=e.currentGardenTile;return {name:e.gardenName?.name??null,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function sA(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function lA(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Jp(e){return {position:oA(e),tile:iA(e),garden:aA(e),object:sA(e),plant:lA(e)}}function Qp(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function cA(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!Cn(e.data,t.data)}function dA(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!Cn(e.sortedSlotIndices,t.sortedSlotIndices)?true:!Cn(e.slots,t.slots)}function uA(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function pA(){let e=Xp,t=Xp,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(qp),l=new Set;let d=false;function f(){if(d=false,l.size<a.length)return;const g=Jp(i);if(!Cn(e,g)&&(t=e,e=g,!!n)){for(const y of o.all)y(e,t);if(Qp(t)!==Qp(e))for(const y of o.stable)y(e,t);if(cA(t.object,e.object)){const y={current:e.object,previous:t.object};for(const b of o.object)b(y);}if(dA(t.plant,e.plant)){const y={current:e.plant,previous:t.plant};for(const b of o.plantInfo)b(y);}if(uA(t.garden,e.garden)){const y={current:e.garden,previous:t.garden};for(const b of o.garden)b(y);}}}function p(){d||(d=true,queueMicrotask(f));}async function h(){if(n)return;const g=a.map(async y=>{const b=qp[y],S=await Je.subscribe(b,_=>{i[y]=_,l.add(y),p();});r.push(S);});await Promise.all(g),n=true,l.size===a.length&&(e=Jp(i));}return h(),{get(){return e},subscribe(g,y){return o.all.add(g),y?.immediate!==false&&n&&l.size===a.length&&g(e,e),()=>o.all.delete(g)},subscribeStable(g,y){return o.stable.add(g),y?.immediate!==false&&n&&l.size===a.length&&g(e,e),()=>o.stable.delete(g)},subscribeObject(g,y){return o.object.add(g),y?.immediate&&n&&l.size===a.length&&g({current:e.object,previous:e.object}),()=>o.object.delete(g)},subscribePlantInfo(g,y){return o.plantInfo.add(g),y?.immediate&&n&&l.size===a.length&&g({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(g)},subscribeGarden(g,y){return o.garden.add(g),y?.immediate&&n&&l.size===a.length&&g({current:e.garden,previous:e.garden}),()=>o.garden.delete(g)},destroy(){for(const g of r)g();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Ql=null;function kt(){return Ql||(Ql=pA()),Ql}function fA(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(h,g){return {x:g%h,y:Math.floor(g/h)}}function l(h,g,y){return y*h+g}function d(h,g){const{cols:y,rows:b}=h,S=y*b,_=new Set,I=new Set,T=new Map,L=[],F=h.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],$=h.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],R=Math.max(F.length,$.length);for(let C=0;C<R;C++){const E=F[C]??[],B=$[C]??[],G=E.map((D,Z)=>(_.add(D),T.set(D,C),{globalIndex:D,localIndex:Z,position:a(y,D)})),K=B.map((D,Z)=>(I.add(D),T.set(D,C),{globalIndex:D,localIndex:Z,position:a(y,D)}));L.push({userSlotIdx:C,dirtTiles:G,boardwalkTiles:K,allTiles:[...G,...K]});}const N=h.spawnTiles.map(C=>a(y,C)),M={};if(h.locations)for(const[C,E]of Object.entries(h.locations)){const B=E.spawnTileIdx??[];M[C]={name:C,spawnTiles:B,spawnPositions:B.map(G=>a(y,G))};}return {cols:y,rows:b,totalTiles:S,tileSize:g,spawnTiles:h.spawnTiles,spawnPositions:N,locations:M,userSlots:L,globalToXY(C){return a(y,C)},xyToGlobal(C,E){return l(y,C,E)},getTileOwner(C){return T.get(C)??null},isDirtTile(C){return _.has(C)},isBoardwalkTile(C){return I.has(C)}}}function f(){if(o.size<i||e)return;const h=r.map,g=r.tileSize??0;if(h){e=d(h,g);for(const y of n)y(e);n.clear();}}async function p(){const h=await Je.subscribe("mapAtom",y=>{r.map=y,o.add("map"),f();});t.push(h);const g=await Je.subscribe("tileSizeAtom",y=>{r.tileSize=y,o.add("tileSize"),f();});t.push(g);}return p(),{get(){return e},isReady(){return e!==null},onReady(h,g){return e?(g?.immediate!==false&&h(e),()=>{}):(n.add(h),()=>n.delete(h))},destroy(){for(const h of t)h();t.length=0,e=null,n.clear();}}}let Zl=null;function Xc(){return Zl||(Zl=fA()),Zl}function hA(){const e=Oe.get("mutations");return e?Object.keys(e):[]}function sg(){const e={};for(const t of hA())e[t]=[];return e}function Jc(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:sg()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Zp(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function mA(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function gA(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime,fruitCount:1}}function bA(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function ef(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function tf(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Jc();const i=t().get(),a=i?.userSlots[r],l=a?.dirtTiles??[],d=a?.boardwalkTiles??[],f=[],p=[],h=[],g={},y=[],b=[],S=[],_=[],I=sg(),T=[],L=[],F=[],$={},R=[],N=[],M={},C=new Set,E=new Set;for(const[D,Z]of Object.entries(n.tileObjects)){const W=parseInt(D,10);C.add(W);const te=i?i.globalToXY(W):{x:0,y:0};if(Z.objectType==="plant"){const re=Z,ne=mA(D,re,te,o);f.push(ne),ne.isMature?p.push(ne):h.push(ne),g[ne.species]||(g[ne.species]=[]),g[ne.species].push(ne);for(let oe=0;oe<re.slots.length;oe++){const V=re.slots[oe],Q=gA(D,te,oe,V,o);if(y.push(Q),Q.isMature?b.push(Q):S.push(Q),Q.mutations.length>0){_.push(Q);for(const O of Q.mutations)I[O]||(I[O]=[]),I[O].push(Q);}}}else if(Z.objectType==="egg"){const ne=bA(D,Z,te,o);T.push(ne),$[ne.eggId]||($[ne.eggId]=[]),$[ne.eggId].push(ne),ne.isMature?L.push(ne):F.push(ne);}else if(Z.objectType==="decor"){const ne=ef(D,Z,te,"tileObjects");R.push(ne),M[ne.decorId]||(M[ne.decorId]=[]),M[ne.decorId].push(ne);}}for(const[D,Z]of Object.entries(n.boardwalkTileObjects)){const W=parseInt(D,10);E.add(W);const te=i?i.globalToXY(W):{x:0,y:0},ne=ef(D,Z,te,"boardwalk");N.push(ne),M[ne.decorId]||(M[ne.decorId]=[]),M[ne.decorId].push(ne);}const B=[...R,...N],G=l.filter(D=>!C.has(D.localIndex)),K=d.filter(D=>!E.has(D.localIndex));return {garden:n,mySlotIndex:r,plants:{all:f,mature:p,growing:h,bySpecies:g,count:f.length},crops:{all:y,mature:b,growing:S,mutated:{all:_,byMutation:I}},eggs:{all:T,mature:L,growing:F,byType:$,count:T.length},decors:{tileObjects:R,boardwalk:N,all:B,byType:M,count:B.length},tiles:{tileObjects:l,boardwalk:d,empty:{tileObjects:G,boardwalk:K}},counts:{plants:f.length,maturePlants:p.length,crops:y.length,matureCrops:b.length,eggs:T.length,matureEggs:L.length,decors:B.length,emptyTileObjects:G.length,emptyBoardwalk:K.length}}}function vA(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function yA(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function xA(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function wA(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function CA(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let l=0;l<a;l++){const d=new Set(i.slots[l].mutations),f=new Set(o.slots[l].mutations),p=[...f].filter(g=>!d.has(g)),h=[...d].filter(g=>!f.has(g));if(p.length>0||h.length>0){const g=Date.now(),y=o.slots[l],b={tileIndex:o.tileIndex,position:o.position,slotIndex:l,species:y.species,startTime:y.startTime,endTime:y.endTime,targetScale:y.targetScale,mutations:[...y.mutations],isMature:g>=y.endTime,fruitCount:1};n.push({crop:b,added:p,removed:h});}}}return n}function kA(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const l=o.get(a.tileIndex);if(!l)continue;const d=Math.min(a.slots.length,l.slots.length);for(let f=0;f<d;f++){const p=a.slots[f],h=l.slots[f];if(p.startTime!==h.startTime){const g=i.get(`${a.tileIndex}:${f}`);if(!g||!g.isMature)continue;const y={tileIndex:a.tileIndex,position:a.position,slotIndex:f,species:p.species,startTime:p.startTime,endTime:p.endTime,targetScale:p.targetScale,mutations:[...p.mutations],isMature:true,fruitCount:1};r.push({crop:y,remainingSlots:l.slotsCount});}}if(l.slotsCount<a.slotsCount)for(let f=l.slotsCount;f<a.slotsCount;f++){const p=i.get(`${a.tileIndex}:${f}`);if(!p||!p.isMature)continue;const h=a.slots[f];if(!h)continue;const g={tileIndex:a.tileIndex,position:a.position,slotIndex:f,species:h.species,startTime:h.startTime,endTime:h.endTime,targetScale:h.targetScale,mutations:[...h.mutations],isMature:true,fruitCount:1};r.push({crop:g,remainingSlots:l.slotsCount});}}return r}function SA(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function AA(e,t){const n=d=>`${d.tileIndex}:${d.location}`,r=d=>`${d.tileIndex}:${d.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(d=>!o.has(r(d))),l=e.filter(d=>!i.has(n(d)));return {added:a,removed:l}}function EA(){let e=Jc(),t=Jc(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,l=2;function d(){if(a.size<l)return;const p=tf(i,Xc);if(Cn(e,p)||(t=e,e=p,!n))return;for(const L of o.all)L(e,t);if(Zp(t)!==Zp(e))for(const L of o.stable)L(e,t);const h=vA(t.plants.all,e.plants.all);for(const L of h.added)for(const F of o.plantAdded)F({plant:L});for(const L of h.removed)for(const F of o.plantRemoved)F({plant:L,tileIndex:L.tileIndex});const g=yA(t.plants.mature,e.plants.mature,e.plants.all);for(const L of g)for(const F of o.plantMatured)F({plant:L});const y=CA(t.plants.all,e.plants.all);for(const L of y)for(const F of o.cropMutated)F(L);const b=xA(t.crops.mature,e.crops.mature,e.crops.all);for(const L of b)for(const F of o.cropMatured)F({crop:L});const S=kA(t.plants.all,e.plants.all,t.crops.all);for(const L of S)for(const F of o.cropHarvested)F(L);const _=SA(t.eggs.all,e.eggs.all);for(const L of _.added)for(const F of o.eggPlaced)F({egg:L});for(const L of _.removed)for(const F of o.eggRemoved)F({egg:L});const I=wA(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const L of I)for(const F of o.eggMatured)F({egg:L});const T=AA(t.decors.all,e.decors.all);for(const L of T.added)for(const F of o.decorPlaced)F({decor:L});for(const L of T.removed)for(const F of o.decorRemoved)F({decor:L});}async function f(){if(n)return;const p=await sx.onChangeNow(g=>{i.garden=g,a.add("garden"),d();});r.push(p);const h=await Je.subscribe("myUserSlotIdxAtom",g=>{i.mySlotIndex=g,a.add("mySlotIndex"),d();});r.push(h),n=true,a.size===l&&(e=tf(i,Xc));}return f(),{get(){return e},subscribe(p,h){return o.all.add(p),h?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,h){return o.stable.add(p),h?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribePlantAdded(p,h){if(o.plantAdded.add(p),h?.immediate&&n&&a.size===l)for(const g of e.plants.all)p({plant:g});return ()=>o.plantAdded.delete(p)},subscribePlantRemoved(p,h){return o.plantRemoved.add(p),()=>o.plantRemoved.delete(p)},subscribePlantMatured(p,h){if(o.plantMatured.add(p),h?.immediate&&n&&a.size===l)for(const g of e.plants.mature)p({plant:g});return ()=>o.plantMatured.delete(p)},subscribeCropMutated(p,h){if(o.cropMutated.add(p),h?.immediate&&n&&a.size===l)for(const g of e.crops.mutated.all)p({crop:g,added:g.mutations,removed:[]});return ()=>o.cropMutated.delete(p)},subscribeCropMatured(p,h){if(o.cropMatured.add(p),h?.immediate&&n&&a.size===l)for(const g of e.crops.mature)p({crop:g});return ()=>o.cropMatured.delete(p)},subscribeCropHarvested(p,h){return o.cropHarvested.add(p),()=>o.cropHarvested.delete(p)},subscribeEggPlaced(p,h){if(o.eggPlaced.add(p),h?.immediate&&n&&a.size===l)for(const g of e.eggs.all)p({egg:g});return ()=>o.eggPlaced.delete(p)},subscribeEggRemoved(p,h){return o.eggRemoved.add(p),()=>o.eggRemoved.delete(p)},subscribeEggMatured(p,h){if(o.eggMatured.add(p),h?.immediate&&n&&a.size===l)for(const g of e.eggs.mature)p({egg:g});return ()=>o.eggMatured.delete(p)},subscribeDecorPlaced(p,h){if(o.decorPlaced.add(p),h?.immediate&&n&&a.size===l)for(const g of e.decors.all)p({decor:g});return ()=>o.decorPlaced.delete(p)},subscribeDecorRemoved(p,h){return o.decorRemoved.add(p),()=>o.decorRemoved.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let ec=null;function Wr(){return ec||(ec=EA()),ec}const nf={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPrimitivePetSlotsAtom",slotInfos:"myPetSlotInfosAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function rf(e,t){const n=Zs(e.xp),r=el(e.petSpecies,e.targetScale),o=tl(e.petSpecies,e.xp,r),i=nl(e.petSpecies,n),d=Oe.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,f=e.hunger/d*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:f,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function _A(e,t){const n=t[e.id],r=n?.lastAbilityTrigger??null,o=n?.position??null,i=Zs(e.xp),a=el(e.petSpecies,e.targetScale),l=tl(e.petSpecies,e.xp,a),d=nl(e.petSpecies,i),h=Oe.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,g=e.hunger/h*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:g,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:"active",position:o?{x:o.x,y:o.y}:null,lastAbilityTrigger:r,growthStage:i,currentStrength:l,maxStrength:a,isMature:d}}const of=500;let Mn=[],Za=0;function IA(){try{const e=it(Bt.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Za=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function TA(e){try{ct(Bt.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function PA(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function LA(e){if(!e||!Array.isArray(e))return;const t=Th(e),n=[];for(const r of t)if(r.timestamp>Za){const o=PA(r);o&&n.push(o);}n.length!==0&&(Za=Math.max(...n.map(r=>r.performedAt),Za),Mn=[...n,...Mn],Mn.length>of&&(Mn=Mn.slice(0,of)),TA(Mn),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${Mn.length})`));}function af(e){const t=new Set,n=[];for(const h of e.active??[]){const g=_A(h,e.slotInfos??{});n.push(g),t.add(g.id);}const r=[];for(const h of e.inventory??[]){if(t.has(h.id))continue;const g=rf(h,"inventory");r.push(g),t.add(g.id);}const o=[];for(const h of e.hutch??[]){if(t.has(h.id))continue;const g=rf(h,"hutch");o.push(g),t.add(g.id);}const i=[...n,...r,...o],d=Wr().get().decors.all.some(h=>h.decorId==="PetHutch"),f=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},hutch:{hasHutch:d,currentItems:f,maxItems:25},abilityLogs:[...Mn]}}const sf={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},abilityLogs:[]};function MA(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function lf(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function RA(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(lf),r=t.all.map(lf);return MA(n,r)}function FA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function OA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function NA(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function DA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function $A(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function BA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function zA(){let e=sf,t=sf,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(nf),l=new Set;function d(){if(l.size<a.length)return;if(i.activityLogs){const I=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(I)&&LA(I);}const p=af(i);if(Cn(e,p)||(t=e,e=p,!n))return;for(const I of o.all)I(e,t);if(!RA(t,e))for(const I of o.stable)I(e,t);const h=FA(t,e);for(const I of h)for(const T of o.location)T(I);const g=OA(t,e);for(const I of g)for(const T of o.ability)T(I);const y=NA(t,e);if(y)for(const I of o.count)I(y);const b=DA(t,e);for(const I of b)for(const T of o.growth)T(I);const S=$A(t,e);for(const I of S)for(const T of o.strengthGain)T(I);const _=BA(t,e);for(const I of _)for(const T of o.maxStrength)T(I);}async function f(){if(n)return;Mn=IA(),console.log(`[myPets] Loaded ${Mn.length} ability logs from storage`);const p=a.map(async h=>{const g=nf[h],y=await Je.subscribe(g,b=>{i[h]=b,l.add(h),d();});r.push(y);});await Promise.all(p),n=true,l.size===a.length&&(e=af(i));}return f(),{get(){return e},subscribe(p,h){return o.all.add(p),h?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,h){return o.stable.add(p),h?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.stable.delete(p)},subscribeLocation(p,h){if(o.location.add(p),h?.immediate&&n&&l.size===a.length)for(const g of e.all)p({pet:g,from:g.location,to:g.location});return ()=>o.location.delete(p)},subscribeAbility(p,h){if(o.ability.add(p),h?.immediate&&n&&l.size===a.length)for(const g of e.all)g.lastAbilityTrigger&&p({pet:g,trigger:g.lastAbilityTrigger});return ()=>o.ability.delete(p)},subscribeCount(p,h){return o.count.add(p),h?.immediate&&n&&l.size===a.length&&p({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(p)},subscribeGrowth(p,h){if(o.growth.add(p),h?.immediate&&n&&l.size===a.length)for(const g of e.all)p({pet:g,previousStage:g.growthStage,newStage:g.growthStage});return ()=>o.growth.delete(p)},subscribeStrengthGain(p,h){if(o.strengthGain.add(p),h?.immediate&&n&&l.size===a.length)for(const g of e.all)p({pet:g,previousStrength:g.currentStrength,newStrength:g.currentStrength});return ()=>o.strengthGain.delete(p)},subscribeMaxStrength(p,h){if(o.maxStrength.add(p),h?.immediate&&n&&l.size===a.length)for(const g of e.all)g.currentStrength===g.maxStrength&&p({pet:g});return ()=>o.maxStrength.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let tc=null;function Hr(){return tc||(tc=zA()),tc}const cf={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},df={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function uf(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function pf(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function jA(e,t){return pf(e)===pf(t)}function GA(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function La(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function UA(e,t){const n=new Set(e.map(La)),r=new Set(t.map(La)),o=t.filter(a=>!n.has(La(a))),i=e.filter(a=>!r.has(La(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function WA(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function HA(){let e=df,t=df,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(cf),l=new Set;function d(){if(l.size<a.length)return;const p=uf(i);if(Cn(e,p)||(t=e,e=p,!n))return;for(const y of o.all)y(e,t);if(!jA(t,e))for(const y of o.stable)y(e,t);if(GA(t.selectedItem,e.selectedItem)){const y={current:e.selectedItem,previous:t.selectedItem};for(const b of o.selection)b(y);}const h=UA(t.items,e.items);if(h)for(const y of o.items)y(h);const g=WA(t.favoritedItemIds,e.favoritedItemIds);if(g)for(const y of o.favorites)y(g);}async function f(){if(n)return;const p=a.map(async h=>{const g=cf[h],y=await Je.subscribe(g,b=>{i[h]=b,l.add(h),d();});r.push(y);});await Promise.all(p),n=true,l.size===a.length&&(e=uf(i));}return f(),{get(){return e},subscribe(p,h){return o.all.add(p),h?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,h){return o.stable.add(p),h?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.stable.delete(p)},subscribeSelection(p,h){return o.selection.add(p),h?.immediate&&n&&l.size===a.length&&p({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(p)},subscribeItems(p,h){return o.items.add(p),h?.immediate&&n&&l.size===a.length&&p({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(p)},subscribeFavorites(p,h){return o.favorites.add(p),h?.immediate&&n&&l.size===a.length&&p({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let nc=null;function Ro(){return nc||(nc=HA()),nc}const Qc={all:[],host:null,myPlayer:null,count:0};function VA(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function ff(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Qc;const i=new Map;Array.isArray(r)&&r.forEach((f,p)=>{f?.type==="user"&&f?.playerId&&i.set(f.playerId,{slot:f,index:p});});const a=t.map(f=>VA(f,n,i)),l=a.find(f=>f.isHost)??null,d=o!==null?a.find(f=>f.slotIndex===o)??null:null;return {all:a,host:l,myPlayer:d,count:a.length}}function hf(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function KA(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function YA(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function qA(){let e=Qc,t=Qc,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,l=4;function d(){if(a.size<l)return;const p=ff(i);if(Cn(e,p)||(t=e,e=p,!n))return;for(const S of o.all)S(e,t);if(hf(t)!==hf(e))for(const S of o.stable)S(e,t);const h=KA(t.all,e.all);for(const S of h)for(const _ of o.joinLeave)_(S);const g=YA(t.all,e.all);for(const S of g)for(const _ of o.connection)_(S);const y=t.host?.id??null,b=e.host?.id??null;if(y!==b){const S={current:e.host,previous:t.host};for(const _ of o.host)_(S);}}async function f(){if(n)return;const p=await ix.onChangeNow(b=>{i.players=b,a.add("players"),d();});r.push(p);const h=await ax.onChangeNow(b=>{i.hostPlayerId=b,a.add("hostPlayerId"),d();});r.push(h);const g=await ox.onChangeNow(b=>{i.userSlots=b,a.add("userSlots"),d();});r.push(g);const y=await Je.subscribe("myUserSlotIdxAtom",b=>{i.myUserSlotIndex=b,a.add("myUserSlotIndex"),d();});r.push(y),n=true,a.size===l&&(e=ff(i));}return f(),{get(){return e},subscribe(p,h){return o.all.add(p),h?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,h){return o.stable.add(p),h?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribeJoinLeave(p,h){if(o.joinLeave.add(p),h?.immediate&&n&&a.size===l)for(const g of e.all)p({player:g,type:"join"});return ()=>o.joinLeave.delete(p)},subscribeConnection(p,h){if(o.connection.add(p),h?.immediate&&n&&a.size===l)for(const g of e.all)p({player:g,isConnected:g.isConnected});return ()=>o.connection.delete(p)},subscribeHost(p,h){return o.host.add(p),h?.immediate&&n&&a.size===l&&p({current:e.host,previous:e.host}),()=>o.host.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let rc=null;function lg(){return rc||(rc=qA()),rc}const cg=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:lg},Symbol.toStringTag,{value:"Module"})),Ki=["seed","tool","egg","decor"];function XA(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function JA(e,t,n){const r=XA(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0,price:e.price}}function QA(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(f=>JA(f,e,o)),a=i.filter(f=>f.isAvailable).length,l=t.secondsUntilRestock??0,d=l>0?Date.now()+l*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:l,restockAt:d}}function mf(e){const t=e.shops,n=e.purchases??{},r=Ki.map(l=>QA(l,t?.[l],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(l=>l.restockAt!==null);let a=null;if(i.length>0){const d=i.sort((f,p)=>(f.restockAt??0)-(p.restockAt??0))[0];a={shop:d.type,seconds:d.secondsUntilRestock,at:d.restockAt};}return {all:r,byType:o,nextRestock:a}}const gf={all:Ki.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function bf(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function ZA(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function eE(e,t){const n=[];for(const r of Ki){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(l=>[l.id,l]));for(const l of i.items){const d=a.get(l.id);d&&l.purchased>d.purchased&&n.push({shopType:r,itemId:l.id,quantity:l.purchased-d.purchased,newPurchased:l.purchased,remaining:l.remaining});}}return n}function tE(e,t){const n=[];for(const r of Ki){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(l=>[l.id,l]));for(const l of i.items){const d=a.get(l.id);d&&d.isAvailable!==l.isAvailable&&n.push({shopType:r,itemId:l.id,wasAvailable:d.isAvailable,isAvailable:l.isAvailable});}}return n}function nE(){let e=gf,t=gf,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,l=2;function d(){if(a.size<l)return;const p=mf(i);if(Cn(e,p)||(t=e,e=p,!n))return;for(const b of o.all)b(e,t);if(bf(t)!==bf(e))for(const b of o.stable)b(e,t);const h={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const b of Ki){const S=ZA(t.byType[b],e.byType[b]);if(S)for(const _ of h[b])_(S);}const g=eE(t,e);for(const b of g)for(const S of o.purchase)S(b);const y=tE(t,e);for(const b of y)for(const S of o.availability)S(b);}async function f(){if(n)return;const p=await lx.onChangeNow(g=>{i.shops=g,a.add("shops"),d();});r.push(p);const h=await cx.onChangeNow(g=>{i.purchases=g,a.add("purchases"),d();});r.push(h),n=true,a.size===l&&(e=mf(i));}return f(),{get(){return e},getShop(p){return e.byType[p]},getItem(p,h){return e.byType[p].items.find(y=>y.id===h)??null},subscribe(p,h){return o.all.add(p),h?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,h){return o.stable.add(p),h?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribeSeedRestock(p,h){return o.seedRestock.add(p),h?.immediate&&n&&a.size===l&&p({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(p)},subscribeToolRestock(p,h){return o.toolRestock.add(p),h?.immediate&&n&&a.size===l&&p({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(p)},subscribeEggRestock(p,h){return o.eggRestock.add(p),h?.immediate&&n&&a.size===l&&p({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(p)},subscribeDecorRestock(p,h){return o.decorRestock.add(p),h?.immediate&&n&&a.size===l&&p({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(p)},subscribePurchase(p,h){if(o.purchase.add(p),h?.immediate&&n&&a.size===l)for(const g of e.all)for(const y of g.items)y.purchased>0&&p({shopType:g.type,itemId:y.id,quantity:y.purchased,newPurchased:y.purchased,remaining:y.remaining});return ()=>o.purchase.delete(p)},subscribeAvailability(p,h){if(o.availability.add(p),h?.immediate&&n&&a.size===l)for(const g of e.all)for(const y of g.items)p({shopType:g.type,itemId:y.id,wasAvailable:y.isAvailable,isAvailable:y.isAvailable});return ()=>o.availability.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let oc=null;function Fo(){return oc||(oc=nE()),oc}function dg(e){const t=e||"Sunny",o=Oe.get("weather")?.[t]?.name||t;return {id:t,name:o,isActive:t!=="Sunny",type:t,startTime:null,endTime:null,remainingSeconds:0}}function vf(){return dg(null)}function rE(){let e=vf(),t=vf(),n=null,r=false,o=null;const i={all:new Set,stable:new Set};function a(d){const f=(d||"Sunny")!==(n||"Sunny");n=d;const p=dg(d),h=e.id!==p.id;if(t=e,e=p,!!r){if(f)for(const g of i.all)g(e,t);if(h){const g={current:e,previous:t};for(const y of i.stable)y(g);}}}async function l(){r||(o=await Je.subscribe("weatherAtom",d=>{a(d);}),r=true);}return l(),{get(){return e},subscribe(d,f){return i.all.add(d),f?.immediate!==false&&r&&d(e,e),()=>i.all.delete(d)},subscribeStable(d,f){return i.stable.add(d),f?.immediate&&r&&d({current:e,previous:e}),()=>i.stable.delete(d)},destroy(){o?.(),o=null,i.all.clear(),i.stable.clear(),r=false;}}}let ic=null;function Yi(){return ic||(ic=rE()),ic}let $t=null;function ug(){return $t||($t={currentTile:kt(),myPets:Hr(),gameMap:Xc(),myInventory:Ro(),players:lg(),shops:Fo(),weather:Yi(),myGarden:Wr()},$t)}function Xn(){if(!$t)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return $t}function oE(){$t&&($t.currentTile.destroy(),$t.myPets.destroy(),$t.gameMap.destroy(),$t.myInventory.destroy(),$t.players.destroy(),$t.shops.destroy(),$t.weather.destroy(),$t.myGarden.destroy(),$t=null);}const zt={get currentTile(){return Xn().currentTile},get myPets(){return Xn().myPets},get gameMap(){return Xn().gameMap},get myInventory(){return Xn().myInventory},get players(){return Xn().players},get shops(){return Xn().shops},get weather(){return Xn().weather},get myGarden(){return Xn().myGarden}};function iE(e){const t=nu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function aE(e){const r=zt.shops.getShop("seed").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const d=nu(e);d.ok?a++:i.push(d.reason||`Failed to purchase seed ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function sE(e){const t=eu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function lE(e){const r=zt.shops.getShop("egg").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const d=eu(e);d.ok?a++:i.push(d.reason||`Failed to purchase egg ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function cE(e){const t=Zd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function dE(e){const r=zt.shops.getShop("decor").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const d=Zd(e);d.ok?a++:i.push(d.reason||`Failed to purchase decor ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function uE(e){const t=tu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function pE(e){const r=zt.shops.getShop("tool").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const d=tu(e);d.ok?a++:i.push(d.reason||`Failed to purchase tool ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}let ac=false;const Pr={init(){ac||(ac=true,console.log("[MGShopActions] Initialized"));},isReady(){return ac},seed:{buy:iE,buyAll:aE},egg:{buy:sE,buyAll:lE},decor:{buy:cE,buyAll:dE},tool:{buy:uE,buyAll:pE}};async function pg(e){const t=[{name:"Data",init:()=>Oe.init()},{name:"CustomModal",init:()=>ao.init()},{name:"Sprites",init:()=>$e.init()},{name:"TileObjectSystem",init:()=>fn.init()},{name:"Pixi",init:()=>xo.init()},{name:"RiveLoader",init:()=>wo.init()},{name:"Audio",init:()=>wt.init()},{name:"Cosmetics",init:()=>ou.init()},{name:"ShopActions",init:()=>Pr.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const fg=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:Po,MGAudio:wt,MGCalculators:ag,MGCosmetic:ou,MGCustomModal:ao,MGData:Oe,MGEnvironment:Ct,MGManifest:vo,MGPixi:xo,MGPixiHooks:Rn,MGRiveLoader:wo,MGShopActions:Pr,MGSprite:$e,MGTile:fn,MGVersion:_d,PET_ABILITY_ACTIONS:_h,filterPetAbilityLogs:Th,formatAbilityLog:Ph,initAllModules:pg,isPetAbilityAction:Ih},Symbol.toStringTag,{value:"Module"}));function fE(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"||t==="mythic"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function hE(e){return e.toLowerCase()}function rl(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:l=true,size:d="md",onClick:f,variant:p="default",rarity:h=null,abilityId:g="",abilityName:y=""}=e,b=x("span",{className:"badge",id:t});l&&b.classList.add("badge--pill"),d==="sm"?b.classList.add("badge--sm"):d==="lg"?b.classList.add("badge--lg"):b.classList.add("badge--md"),f&&b.addEventListener("click",f);let S=false,_=a;function I(){S||(_===false?b.style.border="none":b.style.border="");}function T(C,E=o){b.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),b.classList.add(`badge--${C}`,`badge--${E}`),I();}function L(C){const E=(C??"").trim();E?(b.style.border=E,S=true):(S=false,I());}function F(C){_=C,I();}function $(C){b.textContent=C;}function R(C,E=o){T(C,E);}function N(C){b.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),b.style.background="",b.style.backgroundSize="",b.style.animation="",b.style.color="",b.style.webkitTextStroke="";const E=fE(C);if(!E){b.textContent=String(C??"—");return}b.textContent=E,b.classList.add("badge--rarity",`badge--rarity-${hE(E)}`);}function M(C,E){const G=Oe.get("abilities")?.[C],K=G?.color,D=K||"rgba(100, 100, 100, 0.9)",Z=K?`${K}`:"rgba(150, 150, 150, 1)";b.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),b.classList.add("badge--ability"),b.textContent=E||G?.name||C||"Unknown Ability",b.style.background=D,b.style.color="white",b.style.border="none",b.style.webkitTextStroke="",b.style.animation="",b.style.backgroundSize="";const W=()=>{b.style.background=Z;},te=()=>{b.style.background=D;};b.removeEventListener("mouseenter",W),b.removeEventListener("mouseleave",te),b.addEventListener("mouseenter",W),b.addEventListener("mouseleave",te);}return p==="rarity"?N(h):p==="ability"?M(g,y):(b.textContent=n,T(r,o),typeof a=="boolean"&&F(a),i&&L(i)),{root:b,setLabel:$,setType:R,setBorder:L,setWithBorder:F,setRarity:N,setAbility:M}}const mE={expanded:false,sort:{key:null,dir:null},search:""},gE={categories:{}};async function bE(){const e=await To("tab-test",{version:2,defaults:gE,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...mE}}function n(i,a){const l=e.get(),d=t(i);e.update({categories:{...l.categories,[i]:{...d,expanded:a}}});}function r(i,a,l){const d=e.get(),f=t(i);e.update({categories:{...d.categories,[i]:{...f,sort:{key:a,dir:l}}}});}function o(i,a){const l=e.get(),d=t(i);e.update({categories:{...l.categories,[i]:{...d,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const vE={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Ma(e){return e?vE[e]??0:0}class yE extends hr{constructor(){super({id:"tab-test",label:"Test"});we(this,"stateCtrl",null);}async build(n){this.stateCtrl=await bE();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=x("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(async()=>{try{const i=await $e.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=x("span",{style:"opacity:0.5;"});return o.textContent="—",o}return rl({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),l=g=>{if(!g)return o;const y=g.toLowerCase();return o.filter(b=>b.name.toLowerCase().includes(y))},d=Sd({columns:i,data:l(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:g=>g.spriteId,onSortChange:(g,y)=>{this.stateCtrl.setCategorySort(n,g,y);}});a.sort.key&&a.sort.dir&&d.sortBy(a.sort.key,a.sort.dir);const f=Us({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:g=>{const y=g.trim();this.stateCtrl.setCategorySearch(n,y),d.setData(l(y));}}),p=x("div",{style:"margin-bottom:8px;"});p.appendChild(f.root);const h=x("div");return h.appendChild(p),h.appendChild(d.root),lt({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:g=>{this.stateCtrl.setCategoryExpanded(n,g);}},h)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=Oe.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const l=(a?.seed?.name||"").toLowerCase();if(l===i||l===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=Oe.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=Oe.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=Oe.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=Oe.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>Ma(i.rarity)-Ma(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!$e.isReady())try{await $e.init();}catch{return}const o=$e.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],d=$e.getCategoryId(a).map(f=>{const p=`sprite/${a}/${f}`;return {name:f,spriteId:p,rarity:this.getRarityForSprite(a,p,f)}});if(d.sort((f,p)=>Ma(f.rarity)-Ma(p.rarity)),d.length>0){const f=this.createDataCard(a,this.formatCategoryName(a),d,r);n.appendChild(f);}}}}function xE(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function wE(e,t){const n=e;let r=e;const o=pr({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==r&&(r=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==r&&(r=a,t?.(a));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const i=o.getValue().trim()||n;i!==r&&(r=i,t?.(i));}),o.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),o.input.blur());}),o.root}function CE(e){const t=x("div",{className:"team-list-item"}),n=e.customIndicator??x("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?wE(e.team.name,e.onNameChange):x("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=x("div",{className:"team-list-item__sprites"});async function i(){const d=zt.myPets.get();o.innerHTML="";for(let f=0;f<3;f++){const p=e.team.petIds[f],h=p&&p!=="",g=x("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!h?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(g.style.cursor="pointer",g.addEventListener("click",()=>{e.onSlotClick(f);})),h){let y=d.all.find(b=>b.id===p);if(!y){const b=window.__petDataCache;b&&b.has(p)&&(y=b.get(p));}if(y)try{const b=await $e.toCanvas("pet",y.petSpecies,{mutations:y.mutations,scale:1}),S=document.createElement("canvas");S.width=b.width,S.height=b.height;const _=S.getContext("2d");if(_&&_.drawImage(b,0,0),S.style.width="100%",S.style.height="100%",S.style.objectFit="contain",g.appendChild(S),e.showSlotStyles){const I=x("div",{className:"team-list-item__sprite-slot-overlay"});g.appendChild(I),g.classList.add("team-list-item__sprite-slot--filled");}}catch(b){console.warn(`[TeamListItem] Failed to render sprite for pet ${y.petSpecies}:`,b);const S=x("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});g.appendChild(S);}else {const b=x("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});g.appendChild(b),console.warn(`[TeamListItem] Pet ${p} not found in myPets yet, waiting for update`);let S=false;const _=zt.myPets.subscribe(async()=>{if(S)return;const T=zt.myPets.get().all.find(L=>L.id===p);if(T){S=true,_();try{g.innerHTML="";const L=await $e.toCanvas("pet",T.petSpecies,{mutations:T.mutations,scale:1}),F=document.createElement("canvas");F.width=L.width,F.height=L.height;const $=F.getContext("2d");if($&&$.drawImage(L,0,0),F.style.width="100%",F.style.height="100%",F.style.objectFit="contain",g.appendChild(F),e.showSlotStyles){const R=x("div",{className:"team-list-item__sprite-slot-overlay"});g.appendChild(R),g.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${p} sprite updated`);}catch(L){console.warn(`[TeamListItem] Failed to render sprite for pet ${T.petSpecies}:`,L),g.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!h){const y=xE();g.appendChild(y);}o.appendChild(g);}}i();const a=zt.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const d=x("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(d);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const d=x("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});d.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',d.addEventListener("click",f=>{f.stopPropagation(),e.onExpandClick?.();}),t.appendChild(d);}const l=new MutationObserver(()=>{document.contains(t)||(l.disconnect(),a());});return l.observe(document.body,{childList:true,subtree:true}),t}function kE(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Oo(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,l=x("div",{className:"sg-root"});r!=="md"&&l.classList.add(`sg--${r}`),o&&(l.style.width="100%");const d=x("div",{className:"sg-container",role:"tablist"}),f=x("div",{className:"sg-indicator"}),p=t.map(N=>{const M=x("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:N.label});if(M.id=N.id,N.icon){const E=x("span",{className:"sg-icon"}),B=kE(N.icon);B&&E.appendChild(B),M.appendChild(E);}const C=x("span",{className:"sg-label"},N.label);return M.appendChild(C),M.disabled=!!N.disabled,M});d.appendChild(f),p.forEach(N=>d.appendChild(N)),l.appendChild(d);let h=n,g=i,y=null;function b(){const N=p.find(M=>M.id===h);N&&requestAnimationFrame(()=>{const M=f,C=N.offsetLeft,E=N.offsetWidth;M.style.width=`${E}px`,M.style.transform=`translateX(${C}px)`;});}function S(){p.forEach(N=>{const M=N.id===h;N.classList.toggle("active",M),N.setAttribute("aria-selected",String(M)),N.disabled=g||!!t.find(C=>C.id===N.id)?.disabled;}),b();}function _(N){const M=N.currentTarget;if(M.disabled)return;T(M.id);}function I(N){if(g)return;const M=p.findIndex(E=>E.id===h);let C=M;if(N.key==="ArrowLeft"||N.key==="ArrowUp"?(N.preventDefault(),C=(M-1+p.length)%p.length):N.key==="ArrowRight"||N.key==="ArrowDown"?(N.preventDefault(),C=(M+1)%p.length):N.key==="Home"?(N.preventDefault(),C=0):N.key==="End"&&(N.preventDefault(),C=p.length-1),C!==M){const E=p[C];E&&!E.disabled&&(T(E.id),E.focus());}}p.forEach(N=>{N.addEventListener("click",_),N.addEventListener("keydown",I);});function T(N){!t.some(C=>C.id===N)||h===N||(h=N,S(),a?.(h));}function L(){return h}function F(N){g=!!N,S();}function $(){p.forEach(N=>{N.removeEventListener("click",_),N.removeEventListener("keydown",I);}),y?.disconnect(),y=null;}S(),y=new ResizeObserver(()=>{const N=p.find(M=>M.id===h);if(N&&N.offsetWidth>0){const M=f;M.style.transition="none",M.style.width=`${N.offsetWidth}px`,M.style.transform=`translateX(${N.offsetLeft}px)`,requestAnimationFrame(()=>{M.style.removeProperty("transition");}),y?.disconnect(),y=null;}}),y.observe(d);const R=l;return R.select=T,R.getSelected=L,R.setDisabled=F,R.destroy=$,R}function ol(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:l}=e,d=x("div",{className:"lg-checkbox-wrap"}),f=x("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let p=null;i&&a!=="none"&&(p=x("label",{className:"lg-checkbox-label"},i),p.addEventListener("click",S)),p&&a==="left"?d.append(p,f):p&&a==="right"?d.append(f,p):d.append(f);let h=!!n,g=!!r;function y(){f.checked=h,f.disabled=g;}function b(N=false){g||(h=!h,y(),N||l?.(h));}function S(){g||b();}function _(N){g||(N.key===" "||N.key==="Enter")&&(N.preventDefault(),b());}f.addEventListener("click",S),f.addEventListener("keydown",_);function I(){return h}function T(N,M=false){h=!!N,y(),M||l?.(h);}function L(N){g=!!N,y();}function F(N){if(!N){p&&(p.remove(),p=null);return}p?p.textContent=N:(p=x("label",{className:"lg-checkbox-label"},N),p.addEventListener("click",S),d.append(p));}function $(){f.focus();}function R(){f.removeEventListener("click",S),f.removeEventListener("keydown",_),p&&p.removeEventListener("click",S);}return y(),{root:d,input:f,isChecked:I,setChecked:T,setDisabled:L,setLabel:F,focus:$,destroy:R}}const hg=_t.PET_TEAM,SE={enabled:false,teams:[],activeTeamId:null},du=3,yf=50,Et="";function Ot(){return it(hg,SE)}function mr(e){ct(hg,e);}function AE(e){const n={...Ot(),...e};return mr(n),n}function EE(){return Ot().enabled}function _E(e){AE({enabled:e});}function IE(){return crypto.randomUUID()}function Zc(){return Date.now()}function mg(e=[]){const t=[...e];for(;t.length<du;)t.push(Et);return [t[0]||Et,t[1]||Et,t[2]||Et]}function gg(e,t){const n=Ot(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function bg(e,t){const n=Ot();if(!e.some(i=>i!==Et))return  true;const o=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===o)}function vg(e){const n=Hr().get(),r=new Set(n.all.map(i=>i.id)),o=Ot();for(const i of o.teams)for(const a of i.petIds)a!==Et&&r.add(a);for(const i of e)if(i!==Et&&!r.has(i))return  false;return  true}function TE(e){const n=Hr().get(),r=new Map(n.all.map(i=>[i.id,i])),o=[];for(const i of e.petIds){if(i===Et)continue;const a=r.get(i);a&&o.push(a);}return o}function PE(e){return e.petIds.every(t=>t!==Et)}function LE(e){const t=[];for(let n=0;n<du;n++)e.petIds[n]===Et&&t.push(n);return t}function ME(e){return e.petIds.filter(t=>t!==Et).length}function RE(e){return e.petIds.every(t=>t===Et)}function FE(e,t){return e.petIds.includes(t)}function OE(e,t){return e.petIds.indexOf(t)}function NE(e,t=[]){const n=Ot();if(n.teams.length>=yf)throw new Error(`Maximum number of teams (${yf}) reached`);if(!gg(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=mg(t);if(!vg(o))throw new Error("One or more pet IDs do not exist");if(!bg(o))throw new Error("A team with this exact composition already exists");const i={id:IE(),name:r,petIds:o,createdAt:Zc(),updatedAt:Zc()};return n.teams.push(i),mr(n),i}function yg(e,t){const n=Ot(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!gg(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=mg(t.petIds);if(!vg(a))throw new Error("One or more pet IDs do not exist");if(!bg(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:Zc()};return n.teams[r]=i,mr(n),i}function DE(e){const t=Ot(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(mr(t),true)}function $E(e){return Ot().teams.find(n=>n.id===e)??null}function BE(){return [...Ot().teams]}function zE(e){const t=Ot(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function jE(e){const t=Ot(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),mr(t),true}function GE(e,t){try{return yg(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function UE(){const n=Hr().get().byLocation.active.map(o=>o.id).sort(),r=Ot();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,l)=>a===n[l]))return o.id}return null}function xg(){const e=UE(),t=Ot();return e!==t.activeTeamId&&(t.activeTeamId=e,mr(t)),e}function wg(e){const t=Ot();t.activeTeamId=e,mr(t);}function WE(e){return xg()===e}function HE(e){const t=Hr(),n=Ro(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=r.byLocation.active,a=e.petIds.filter(p=>p!==Et).sort(),l=i.map(p=>p.id).sort();if(JSON.stringify(a)===JSON.stringify(l)){console.log("[PetTeam] Team already active");return}const d=r.hutch,f=d.hasHutch?d.maxItems-d.currentItems:0;VE(e.petIds,f,r),wg(e.id),console.log("[PetTeam] Team activated successfully");}function VE(e,t,n){const r=n.byLocation.active;let o=t,i=0;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<du;a++){const l=e[a],d=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${d?.id.slice(0,8)??"empty"}, target=${l.slice(0,8)||"empty"}, hutchSpace=${o}`),d?.id===l){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(l===Et&&d){const f=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${f}`),KE(d.id,f),f&&o--;continue}if(!d&&l!==Et){const p=n.all.find(h=>h.id===l)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${p}`),p&&o++,qE(l,n,i),i++;continue}if(d&&l!==Et){const p=n.all.find(g=>g.id===l)?.location==="hutch";p&&o++;const h=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${p}, storeInHutch=${h}`),XE(d.id,l,n,h),h&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function KE(e,t){Hm(e),t&&Jd(e);}function YE(e){const t=Wr().get(),n=t.tiles.tileObjects[e]??t.tiles.tileObjects[0];return n?{position:n.position,tileType:"Dirt",localTileIndex:n.localIndex}:{position:{x:0,y:0},tileType:"Dirt",localTileIndex:0}}function qE(e,t,n){const r=t.all.find(l=>l.id===e);if(!r){console.warn(`[PetTeam] Pet ${e} not found`);return}r.location==="hutch"&&Qd(e);const{position:o,tileType:i,localTileIndex:a}=YE(n);Um(e,o,i,a);}function XE(e,t,n,r){const o=n.all.find(i=>i.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&Qd(t),Wm(e,t),r&&Jd(e);}function JE(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function QE(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(r=>r&&typeof r=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function ZE(e){const t=Date.now(),n=e.slots||[],r=[typeof n[0]=="string"?n[0]:Et,typeof n[1]=="string"?n[1]:Et,typeof n[2]=="string"?n[2]:Et];return {name:e.name?.trim()||"Imported Team",petIds:r,createdAt:t,updatedAt:t}}function e_(){const e={success:false,source:"none",imported:0,errors:[]};if(!JE())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=QE();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=Ot();n.teams=[],n.activeTeamId=null;const r=new Set;for(const o of t)try{const i=ZE(o);let a=i.name;if(r.has(a)){let d=1;for(;r.has(`${a} (${d})`);)d++;a=`${a} (${d})`;}r.add(a);const l={id:crypto.randomUUID(),name:a,petIds:i.petIds,createdAt:i.createdAt,updatedAt:i.updatedAt};n.teams.push(l),e.imported++;}catch(i){const a=i instanceof Error?i.message:String(i);e.errors.push(`Failed to import "${o.name}": ${a}`);}return e.imported>0&&(mr(n),e.success=true,e.source="aries"),e}let Ra=false;const ft={init(){if(Ra)return;if(!Ot().enabled){console.log("[PetTeam] Feature disabled");return}Ra=true,console.log("[PetTeam] Feature initialized");},destroy(){Ra&&(Ra=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:EE,setEnabled:_E,createTeam:NE,updateTeam:yg,deleteTeam:DE,renameTeam:GE,getTeam:$E,getAllTeams:BE,getTeamByName:zE,reorderTeams:jE,getPetsForTeam:TE,isTeamFull:PE,getEmptySlots:LE,getFilledSlotCount:ME,isTeamEmpty:RE,isPetInTeam:FE,getPetSlotIndex:OE,getActiveTeamId:xg,setActiveTeamId:wg,isActiveTeam:WE,activateTeam:HE,importFromAries:e_};let Jo=0,xf="",wf="";function t_(){return Jo===0&&(xf=document.body.style.overflow,wf=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),Jo++,()=>{Jo=Math.max(0,Jo-1),Jo===0&&(document.body.style.overflow=xf,document.body.style.touchAction=wf);}}class n_{constructor(t){we(this,"dragState",null);we(this,"longPressState",null);we(this,"options");we(this,"onPointerMove");we(this,"onPointerUp");we(this,"onPointerCancel");we(this,"onLongPressPointerMove");we(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),ft.getAllTeams().findIndex(f=>f.id===r)===-1)return;const a=t.clientX,l=t.clientY,d=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:l,timeout:d,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const a=ft.getAllTeams().findIndex(g=>g.id===r);if(a===-1)return;const l=n.getBoundingClientRect(),d=o.getBoundingClientRect(),f=n.cloneNode(true);f.classList.add("team-list-item--placeholder"),f.classList.remove("team-list-item--dragging");const p=n.style.touchAction;n.style.touchAction="none";const h=t_();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:f,offsetY:t.clientY-l.top,fromIndex:a,teamId:r,captureTarget:n,touchActionPrev:p,releaseScrollLock:h},n.classList.add("team-list-item--dragging"),n.style.width=`${l.width}px`,n.style.height=`${l.height}px`,n.style.left=`${l.left-d.left}px`,n.style.top=`${l.top-d.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(f,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const i=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(o=Math.max(-8,Math.min(i+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,i=Array.from(n.children).filter(d=>d!==o&&d!==r&&d instanceof HTMLElement&&d.classList.contains("team-list-item")),a=new Map;i.forEach(d=>{a.set(d,d.getBoundingClientRect().top);});let l=false;for(const d of i){const f=d.getBoundingClientRect(),p=f.top+f.height/2;if(t<p){r.nextSibling!==d&&n.insertBefore(r,d),l=true;break}}l||n.appendChild(r),i.forEach(d=>{const f=a.get(d),p=d.getBoundingClientRect().top;if(f!==void 0&&f!==p){const h=f-p;d.style.transform=`translateY(${h}px)`,d.style.transition="none",d.offsetHeight,d.style.transition="transform 0.14s ease",d.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:i,fromIndex:a,touchActionPrev:l,releaseScrollLock:d,pointerId:f}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(f))try{o.releasePointerCapture(f);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const g=Array.from(n.children).filter(y=>y!==o&&y!==i&&y instanceof HTMLElement&&y.classList.contains("team-list-item"))[a]||null;g?n.insertBefore(i,g):n.appendChild(i);}else {const h=Array.from(n.children).filter(y=>y!==o),g=h.indexOf(i);if(g!==-1){const y=h[g];y!==i&&n.insertBefore(i,y);}}if(i.replaceWith(o),i.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=l??"",Array.from(n.children).filter(h=>h instanceof HTMLElement&&h.classList.contains("team-list-item")).forEach(h=>{h.style.transform="",h.style.transition="";}),d?.(),!r){const g=Array.from(n.children).filter(y=>y instanceof HTMLElement&&y.classList.contains("team-list-item")).indexOf(o);if(g!==-1&&g!==a){const b=ft.getAllTeams().slice(),[S]=b.splice(a,1);b.splice(g,0,S);const _=b.map(I=>I.id);ft.reorderTeams(_),this.options.onReorder(_);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class r_{constructor(t={}){we(this,"card",null);we(this,"modeControl",null);we(this,"modeContainer",null);we(this,"teamContent",null);we(this,"listContainer",null);we(this,"teamMode","overview");we(this,"selectedTeamIds",new Set);we(this,"teamCheckboxes",new Map);we(this,"options");we(this,"dragHandler");this.options=t,this.dragHandler=new n_({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!ft.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=x("div",{className:"team-card-wrapper"});this.modeContainer=x("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=x("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=lt({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=Oo({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=x("div",{className:"team-card__disabled-state"}),n=x("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=st({label:"Enable Feature",onClick:()=>{ft.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=ft.getAllTeams(),n=ft.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=x("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=CE({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:l=>{this.handleRenameTeam(r.id,l);},onSlotClick:this.teamMode==="manage"?l=>{this.handleRemovePet(r.id,l);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async l=>{if(!l.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await ft.activateTeam(r),this.options.onTeamsUpdated?.();}catch(f){console.error("[TeamCard] Failed to activate team:",f);}}}),a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(l,a,r.id):this.dragHandler.startLongPress(l,a,r.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=x("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=x("div",{className:"team-card__actions"}),r=st({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=x("div",{className:"team-card__actions"}),n=st({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=st({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),o=st({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});o.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),t.appendChild(o),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=ft.getAllTeams(),i=new Set(o.map(a=>a.name));for(;i.has(n);)n=`${t} (${r})`,r++;try{ft.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)ft.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=ft.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){ft.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const r=ft.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=ft.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",ft.updateTeam(t,{petIds:o}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const r=ft.getTeam(t);if(!r)return;const i=zt.myPets.get().all.map(y=>({id:y.id,itemType:"Pet",petSpecies:y.petSpecies,name:y.name??null,xp:y.xp,hunger:y.hunger,mutations:y.mutations||[],targetScale:y.targetScale,abilities:y.abilities||[]})),a=new Set(r.petIds.filter(y=>y!=="")),l=i.filter(y=>!a.has(y.id));await Je.set("mySelectedItemIdAtom",null);const d=Ct.detect();(d.platform==="mobile"||d.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const p=zt.myInventory.subscribeSelection(y=>{if(y.current&&y.current.item){const b=y.current.item,S=[...r.petIds];S[n]=b.id,ft.updateTeam(t,{petIds:S}),this.options.onTeamsUpdated?.(),Je.set("mySelectedItemIdAtom",null),ao.close().then(()=>{const _=Ct.detect();(_.platform==="mobile"||_.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await ao.show("inventory",{items:l,favoritedItemIds:[]}),await ao.waitForClose();const h=Ct.detect();(h.platform==="mobile"||h.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),p();}createCheckboxIndicator(t){const n=ol({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}const o_=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],Cg=_t.XP_TRACKER,i_={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},uo="XP Tracker",po="[XpTracker]";function No(){return it(Cg,i_)}function kg(e){ct(Cg,e);}function Sg(e){const n={...No(),...e};return kg(n),n}function Ag(){return No().enabled}function a_(e){Sg({enabled:e});}function uu(e){return o_.includes(e)}function s_(e){const t=Oe.get("abilities");if(!t)return null;const n=t[e];return !n||!uu(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function Eg(e){return e.filter(uu)}function l_(e){return e.some(uu)}function c_(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function _g(e,t,n,r=100){const o=s_(e);if(!o)return null;const i=c_(e),a=o.requiredWeather,l=a===null||n===a,d=t/r,f=d*d,p=o.baseProbability,h=o.bonusXp,g=p,y=Math.floor(h*f),b=g/100*60,S=l?Math.floor(b*y):0;return {abilityId:e,abilityName:o.name,tier:i,baseChancePerMinute:p,actualChancePerMinute:g,baseXpPerProc:h,actualXpPerProc:y,expectedProcsPerHour:b,expectedXpPerHour:S,requiredWeather:a,isActive:l}}function d_(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=Eg(r.abilities);for(const i of o){const a=_g(i,r.strength,t,r.maxStrength||100);a&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:a}),a.isActive&&(n.totalBonusXpPerHour+=a.expectedXpPerHour,n.totalProcsPerHour+=a.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function u_(e,t,n,r=100){const o=Eg(e);return o.length===0?null:_g(o[0],t,n,r)}function Cf(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function p_(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function f_(e,t){return e.species.localeCompare(t.species)}function h_(e,t){return t.currentStrength-e.currentStrength}function m_(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function g_(e,t){return e.name.localeCompare(t.name)}function b_(e){switch(e){case "closestToMax":return Cf;case "furthestFromMax":return p_;case "species":return f_;case "strength":return h_;case "location":return m_;case "name":return g_;default:return Cf}}function Ig(e,t){const n=b_(t);return [...e].sort(n)}function v_(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function y_(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function Tg(e,t){let n=e;return n=v_(n,t.filterSpecies),n=y_(n,t.filterHasXpBoost),n=Ig(n,t.sortBy),n}let So=false,es=null,il=[],pu=null;function x_(e,t,n){const r=Zm(e.petSpecies,e.targetScale),o=eg(e.petSpecies,e.xp,r),i=o>=r,a=e.hunger<=0,l=a?0:Zn,d=u_(e.abilities,o,t);d?.isActive&&d.expectedXpPerHour;const f=e.location==="active"&&!a?l+n:0,p=rg(e.petSpecies,e.xp,o,r,f>0?f:Zn),h=ng(e.petSpecies,e.xp,r,f>0?f:Zn),g=og(e.petSpecies,e.hunger,p),y=ks(e.petSpecies,e.hunger,h);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:a,currentStrength:o,maxStrength:r,isMaxStrength:i,hoursToNextStrength:p,hoursToMaxStrength:h,feedsToNextStrength:g,feedsToMaxStrength:y,baseXpPerHour:l,totalXpPerHour:f,xpBoostStats:d,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function Pg(){const e=zt.myPets.get(),t=zt.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(d=>!d.isMature||l_(d.abilities)).filter(d=>d.hunger>0).map(d=>({petId:d.id,petName:d.name??"",abilities:d.abilities,strength:d.currentStrength})),i=d_(o,n);pu=i;const a=[];for(const d of e.all){const f=x_({id:d.id,petSpecies:d.petSpecies,name:d.name??"",xp:d.xp,hunger:d.hunger,targetScale:d.targetScale,abilities:d.abilities,mutations:d.mutations,location:d.location},n,i.totalBonusXpPerHour);a.push(f);}const l=Math.max(0,...a.map(d=>d.hoursToMaxStrength));for(const d of a)d.isMaxStrength&&d.xpBoostStats&&(d.feedsToMaxStrength=ig(true,true,d.species,d.hunger,0,l));return a}function Lg(){if(So)return;if(!No().enabled){console.log(`${po} ${uo} disabled`);return}console.log(`${po} Initializing ${uo}...`),Oe.isReady()&&(il=Pg()),So=true,console.log(`${po} ${uo} initialized`);}function fu(){return So&&Oe.isReady()}function hu(){return fu()?il:[]}function w_(){return hu().filter(e=>e.location==="active")}function C_(){return pu}function mu(){fu()&&(il=Pg());}function k_(e){gu();const t=No(),n=e??t.updateIntervalMs;es=setInterval(()=>{Ag()&&mu();},n);}function gu(){es&&(clearInterval(es),es=null);}function Mg(){So&&(gu(),So=false,il=[],pu=null,console.log(`${po} ${uo} destroyed`));}function S_(){const e=No();return Tg(hu(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function A_(e){a_(e),e?(So=false,Lg(),Oe.isReady()&&mu(),console.log(`${po} ${uo} enabled`)):(Mg(),console.log(`${po} ${uo} disabled`));}const ed={init:Lg,isReady:fu,destroy:Mg,loadConfig:No,saveConfig:kg,updateConfig:Sg,isEnabled:Ag,setEnabled:A_,getAllPetsProgress:hu,getActivePetsProgress:w_,getCombinedBoostStats:C_,getFilteredPets:S_,refresh:mu,startAutoUpdate:k_,stopAutoUpdate:gu,sortPets:Ig,filterAndSortPets:Tg},E_={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},__={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(E_),...Object.keys(__)];const I_=`
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
`;class T_{constructor(){we(this,"card",null);we(this,"listContainer",null);we(this,"innerContent",null);we(this,"logs",[]);we(this,"filteredLogs",[]);we(this,"unsubscribe",null);we(this,"ITEM_HEIGHT",88);we(this,"BUFFER_SIZE",3);we(this,"VIEWPORT_HEIGHT",480);we(this,"renderedRange",{start:0,end:0});we(this,"scrollListener",null);we(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=Hr(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const r=t.get().abilityLogs;this.updateFromAbilityLogs(r);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=Oe.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},l=Ph(a),d=new Date(n.performedAt),f=d.toLocaleDateString("en-US",{month:"short",day:"numeric"}),p=d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),h=`${f} ${p}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:l,formattedDate:h}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return rl({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=x("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=x("div",{style:"margin-bottom: 0;"}),r=Us({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const i=o.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=x("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=x("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=lt({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=x("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}async handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let r=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),o=Math.min(this.filteredLogs.length,r+n+this.BUFFER_SIZE*2);if(r===this.renderedRange.start&&o===this.renderedRange.end)return;this.renderedRange={start:r,end:o},this.innerContent.replaceChildren();const i=r*this.ITEM_HEIGHT;if(i>0){const l=x("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(l);}for(let l=r;l<o;l++){const d=this.filteredLogs[l],f=await this.createLogItemCard(d);this.innerContent.appendChild(f);}const a=Math.max(0,(this.filteredLogs.length-o)*this.ITEM_HEIGHT);if(a>0){const l=x("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(l);}}async createLogItemCard(t){const n=x("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const r=x("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const p=await $e.toCanvas("pet",t.petSpecies);p&&(p.style.width="100%",p.style.height="100%",p.style.objectFit="contain",r.appendChild(p));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=x("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=x("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=x("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),l=x("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);i.appendChild(a),i.appendChild(l),o.appendChild(i);const d=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(d);const f=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(f),n.appendChild(o),n}}function un(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Rg=`
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

`,P_=`
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
`,Fg=`
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
  border:none;
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
`,L_=`
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
`,M_=`
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
`;class R_ extends hr{constructor(n){super({id:"tab-pets",label:"Pets"});we(this,"unsubscribeMyPets");we(this,"lastActiveTeamId",null);we(this,"teamCardPart",null);we(this,"abilityLogsCardPart",null);we(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await wn(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>fg);return {MGSprite:a}},void 0);await r.init();const o=n.getRootNode();un(o,Rg,"team-card-styles"),un(o,P_,"base-pet-card-styles"),un(o,Fg,"badge-styles"),un(o,L_,"arcade-button-styles"),un(o,I_,"gemini-icon-button-styles"),un(o,M_,"ability-logs-card-styles");const i=this.createGrid("12px");i.id="pets",n.appendChild(i),this.initializeTeamCardPart(i),this.initializeAbilityLogsCardPart(i),this.unsubscribeMyPets=zt.myPets.subscribeStable(()=>{const a=ft.getActiveTeamId();a!==this.lastActiveTeamId&&(this.lastActiveTeamId=a,this.teamCardPart?.render());}),this.lastActiveTeamId=ft.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new r_({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new T_);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const F_=`
  #alerts-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Shops card filters */
  .shops-card-filters {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    flex-wrap: nowrap;
  }

  .shops-card-filters .select {
    flex: 0 0 auto;
    min-width: 0;
    width: auto;
  }

  .shops-card-filters .search {
    flex: 1 1 auto;
    min-width: 0;
  }

  .shops-card-filters .search-input {
    padding-right: 40px;
  }

  .shops-card-filters .search-ico--right {
    right: 12px;
  }

  .shops-card-hint {
    padding: 8px 12px 12px;
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 60%, transparent);
    font-style: italic;
  }

  .shops-card-hint-mobile {
    display: none;
  }

  .weather-card-hint {
    padding: 8px 12px 12px;
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 60%, transparent);
    font-style: italic;
  }

  .weather-card-hint-mobile {
    display: none;
  }

  @media (hover: none) and (pointer: coarse) {
    .shops-card-hint-desktop,
    .weather-card-hint-desktop {
      display: none;
    }

    .shops-card-hint-mobile,
    .weather-card-hint-mobile {
      display: inline;
    }
  }

  /* Item cell with icon + name */
  .shop-item-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .shop-item-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Sprite styling in icon container */
  .shop-item-sprite {
    max-width: 32px;
    max-height: 32px;
    width: auto;
    height: auto;
    image-rendering: auto;
    display: block;
  }

  .shop-item-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Rarity badge container in table */
  .shop-item-rarity {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  /* Toggle switch container in table */
  .shop-item-notify {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  /* Center headers for all columns */
  #shops-card .lg-tr-head .lg-th {
    justify-content: center;
  }

  /* Clickable rows with custom sound indicator */
  #shops-card .lg-tr-body {
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  #shops-card .lg-tr-body:hover {
    background: color-mix(in oklab, var(--soft) 95%, transparent);
  }

  #shops-card .lg-tr-body.has-custom-sound .lg-td:first-child {
    border-left: 3px solid color-mix(in oklab, var(--accent) 70%, transparent);
  }

  #shops-card .lg-tr-body.has-custom-sound:hover .lg-td:first-child {
    border-left-color: var(--accent);
  }

  /* Weather card items */
  .weather-item-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .weather-item-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 20px;
  }

  .weather-item-sprite {
    max-width: 32px;
    max-height: 32px;
    width: auto;
    height: auto;
    image-rendering: auto;
    display: block;
  }

  .weather-item-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .weather-item-effects {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .weather-item-notify {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  /* Center headers for weather card columns */
  #weather-card .lg-tr-head .lg-th {
    justify-content: center;
  }

  /* Clickable rows with custom sound indicator */
  #weather-card .lg-tr-body {
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  #weather-card .lg-tr-body:hover {
    background: color-mix(in oklab, var(--soft) 95%, transparent);
  }

  #weather-card .lg-tr-body.has-custom-sound .lg-td:first-child {
    border-left: 3px solid color-mix(in oklab, var(--accent) 70%, transparent);
  }

  #weather-card .lg-tr-body.has-custom-sound:hover .lg-td:first-child {
    border-left-color: var(--accent);
  }

  /* Pet card styles */
  .pet-card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pet-card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  /* Settings card styles */
  .alerts-settings-body {
    display: flex;
    flex-direction: column;
  }

  .alerts-settings-divider {
    height: 1px;
    background: var(--border);
    margin: 16px 0;
  }

  .notification-settings {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .notification-settings-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--fg);
    margin-bottom: 4px;
  }

  .notification-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: color-mix(in oklab, var(--soft) 85%, transparent);
    border: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
    border-radius: 12px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .notification-item.is-playing {
    border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
    box-shadow: 0 10px 22px color-mix(in oklab, var(--shadow) 18%, transparent);
  }

  .notification-item-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--fg);
  }

  .notification-item-description {
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 60%, transparent);
  }

  .notification-item-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .notification-item-controls .select {
    flex: 1 1 auto;
    min-width: 120px;
  }

  .notification-item-play {
    appearance: none;
    border: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
    background: color-mix(in oklab, var(--soft) 78%, transparent);
    color: var(--fg);
    border-radius: 10px;
    min-height: 32px;
    min-width: 52px;
    padding: 0 8px;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    flex-shrink: 0;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.05s ease;
  }

  .notification-item-play:hover {
    border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
  }

  .notification-item-play:active {
    transform: translateY(1px);
  }

  .notification-item .slider {
    width: 100%;
  }

  .notification-mode-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: nowrap;
  }

  .notification-mode-row .select {
    flex: 0 0 auto;
    min-width: 0;
    width: auto;
  }

  .notification-mode-description {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 65%, transparent);
    font-style: italic;
  }
`,kf={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function O_(){const e=await To("tab-alerts",{version:1,defaults:kf,sanitize:o=>({ui:{expandedCards:bo(kf.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:bo(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const Og=_t.SHOP_NOTIFIER,Ng={seed:[],tool:[],egg:[],decor:[]},N_={enabled:false,trackedItems:Ng},D_=["seed","tool","egg","decor"];function Dg(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function qi(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function Do(){const e=it(Og,N_);return {enabled:e?.enabled??false,trackedItems:Dg(e?.trackedItems)}}function al(e){ct(Og,{enabled:e.enabled,trackedItems:qi(e.trackedItems)});}function $_(e){const n={...Do(),...e};return e.trackedItems&&(n.trackedItems=Dg(e.trackedItems)),al(n),n}function bu(){return Do().enabled}function B_(e){$_({enabled:e});}function $g(){return qi(Do().trackedItems)}function Bg(){const e=$g(),t=[];for(const n of D_)for(const r of e[n])t.push({shopType:n,itemId:r});return t}function z_(e,t){const n=Do(),r=qi(n.trackedItems),o=r[e];if(o.includes(t))return;o.push(t),al({...n,trackedItems:r});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(i);}function zg(e,t){const n=Do(),r=qi(n.trackedItems),o=r[e],i=o.filter(l=>l!==t);if(i.length===o.length)return;r[e]=i,al({...n,trackedItems:r});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(a);}function j_(){const e=Do();al({...e,trackedItems:qi(Ng)});}let Ss=false;const td=[];function G_(e,t){const n=$g()[e];if(!n.length)return [];const r=new Set(n);return t.items.filter(o=>r.has(o.id)&&o.isAvailable).map(o=>({itemId:o.id,remaining:o.remaining}))}function Fa(e,t){const n=G_(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const r=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(r);}function U_(){if(Ss)return;Ss=true;const e=Fo();td.push(e.subscribeSeedRestock(t=>Fa("seed",t)),e.subscribeToolRestock(t=>Fa("tool",t)),e.subscribeEggRestock(t=>Fa("egg",t)),e.subscribeDecorRestock(t=>Fa("decor",t)));}function W_(){if(Ss){Ss=false;for(const e of td)e();td.length=0;}}const jg={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function H_(e,t,n){const r=n.find(i=>typeof i=="object"&&i!==null&&"toolId"in i&&i.toolId===e);return r?(r.quantity??0)>=t:false}function V_(e,t,n){const r=n.find(f=>typeof f=="object"&&f!==null&&"decorId"in f&&f.decorId===e),o=r?r.quantity??0:0,l=Wr().get().decors.all.filter(f=>typeof f=="object"&&f!==null&&"decorId"in f&&f.decorId===e).length;return o+l>=t}function Gg(e,t,n,r){return t==="tool"?H_(e,n,r):t==="decor"?V_(e,n,r):false}function Sf(e,t){const n=jg[e];if(!n||n.shopType!==t)return  false;const o=Ro().get();return Gg(e,t,n.maxQuantity,o.items)}function Af(){const t=Ro().get(),n=Bg();for(const r of n){const o=jg[r.itemId];o&&o.shopType===r.shopType&&Gg(r.itemId,r.shopType,o.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${r.itemId} (max quantity reached)`),zg(r.shopType,r.itemId));}}let As=false,ts=null;function K_(){if(As)return;As=true,ts=Ro().subscribeStable(()=>{Af();}),Af();}function Y_(){As&&(As=false,ts&&(ts(),ts=null));}let Mi=false;function Ug(){if(Mi){console.log("[ShopNotifier] Already initialized");return}if(!bu()){console.log("[ShopNotifier] Disabled");return}Mi=true,U_(),K_(),console.log("[ShopNotifier] Initialized");}function Wg(){Mi&&(W_(),Y_(),Mi=false,console.log("[ShopNotifier] Destroyed"));}function q_(){return Mi}function X_(){return bu()}function J_(e){if(bu()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}B_(e),e?Ug():Wg(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const zr={init:Ug,destroy:Wg,isReady:q_,isEnabled:X_,setEnabled:J_,addTrackedItem:z_,removeTrackedItem:zg,getTrackedItems:Bg,resetTrackedItems:j_},Q_={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},sc={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},Z_={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},eI={seed:"seed",tool:null,egg:null,decor:null},Ef={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function vu(e,t,n){try{const r=Z_[t],o=Oe.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=eI[t],l=a?i[a]:i;return !l||typeof l!="object"?null:l[n]??null}catch(r){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,r),null}}function tI(e,t){return vu(e,t,"spriteId")}function nI(e,t){const n=vu(e,t,"rarity");return n?String(n).toLowerCase():null}function rI(e,t){return vu(e,t,"name")??e}function oI(){const e=zr.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function _f(e){const t=oI(),n=[],r=["seed","tool","egg","decor"];for(const o of r){const i=e.byType[o];if(i)for(const a of i.items){const l=`${o}:${a.id}`;n.push({...a,shopType:o,rarity:nI(a.id,o),spriteId:tI(a.id,o),itemName:rI(a.id,o),isTracked:t.has(l),hasCustomSound:Fe.hasItemCustomSound("shop",a.id,o)});}}return n}const iI=`
  /* Container */
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    pointer-events: none;
    contain: layout;
    will-change: opacity;
  }

  .modal-container.is-open {
    pointer-events: auto;
  }

  /* Backdrop */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: color-mix(in oklab, var(--shadow) 85%, transparent);
    backdrop-filter: blur(0px);
    opacity: 0;
    transition: opacity 0.2s ease, backdrop-filter 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    will-change: opacity, backdrop-filter;
  }

  .modal-container.is-open .modal-backdrop {
    opacity: 1;
    backdrop-filter: blur(4px);
  }

  /* Dialog */
  .modal-dialog {
    background: var(--paper);
    border: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
    border-radius: 12px;
    box-shadow: 0 10px 40px color-mix(in oklab, var(--shadow) 65%, transparent);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    width: 100%;
    opacity: 0;
    transform: scale(0.95);
    transition: transform 0.2s ease, opacity 0.2s ease;
    will-change: transform, opacity;
  }

  .modal-container.is-open .modal-dialog {
    opacity: 1;
    transform: scale(1);
  }

  /* Dialog sizes */
  .modal-dialog--sm {
    max-width: 300px;
  }

  .modal-dialog--md {
    max-width: 450px;
  }

  .modal-dialog--lg {
    max-width: 600px;
  }

  /* Header */
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
  }

  .modal-title-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--fg);
    font-family: var(--font-ui, system-ui);
  }

  .modal-subtitle {
    margin: 0;
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 55%, transparent);
    font-family: var(--font-ui, system-ui);
  }

  .modal-close {
    appearance: none;
    background: none;
    border: none;
    color: color-mix(in oklab, var(--fg) 60%, transparent);
    cursor: pointer;
    font-size: 28px;
    line-height: 1;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.15s ease;
  }

  .modal-close:hover {
    background: color-mix(in oklab, var(--soft) 85%, transparent);
    color: var(--fg);
  }

  .modal-close:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent);
  }

  /* Body */
  .modal-body {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
    scrollbar-gutter: stable;
  }

  /* Custom scrollbar */
  .modal-body::-webkit-scrollbar {
    width: 8px;
  }

  .modal-body::-webkit-scrollbar-track {
    background: color-mix(in oklab, var(--soft) 50%, transparent);
    border-radius: 4px;
  }

  .modal-body::-webkit-scrollbar-thumb {
    background: color-mix(in oklab, var(--border) 80%, transparent);
    border-radius: 4px;
  }

  .modal-body::-webkit-scrollbar-thumb:hover {
    background: color-mix(in oklab, var(--border) 100%, transparent);
  }

  /* Footer */
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 20px;
    border-top: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
  }

  /* Responsive (Mobile) */
  @media (max-width: 640px) {
    .modal-backdrop {
      padding: 0;
    }

    .modal-dialog {
      max-height: 100vh;
      border-radius: 0;
      height: 100%;
    }

    .modal-dialog--sm,
    .modal-dialog--md,
    .modal-dialog--lg {
      max-width: 100%;
    }
  }
`,aI={size:"md",closeOnBackdrop:true,closeOnEscape:true};function yu(e){const t={...aI,...e};let n=false,r=null,o=null,i=null,a=null,l=null;function d(){b(),t.onClose?.();}function f($){t.closeOnBackdrop&&$.target===o&&d();}function p($){t.closeOnEscape&&$.key==="Escape"&&d();}function h(){if(!i)return;const $=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),R=Array.from(i.querySelectorAll($));if(R.length===0)return;const N=R[0],M=R[R.length-1];N.focus();const C=E=>{E.key==="Tab"&&(E.shiftKey?document.activeElement===N&&(E.preventDefault(),M.focus()):document.activeElement===M&&(E.preventDefault(),N.focus()));};i.addEventListener("keydown",C),a=()=>{i?.removeEventListener("keydown",C);};}function g(){r=x("div",{className:"modal-container"}),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-labelledby","modal-title");const $=x("style");$.textContent=iI,r.appendChild($),o=x("div",{className:"modal-backdrop"}),o.addEventListener("click",f),r.appendChild(o),i=x("div",{className:`modal-dialog modal-dialog--${t.size}`});const R=x("div",{className:"modal-header"}),N=x("h2",{className:"modal-title",id:"modal-title"},t.title);if(t.subtitle){const E=x("div",{className:"modal-title-group"});E.appendChild(N),E.appendChild(x("p",{className:"modal-subtitle"},t.subtitle)),R.appendChild(E);}else R.appendChild(N);const M=x("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");M.addEventListener("click",d),R.appendChild(M),i.appendChild(R);const C=x("div",{className:"modal-body"});if(C.appendChild(t.content),i.appendChild(C),t.footer){const E=x("div",{className:"modal-footer"});E.appendChild(t.footer),i.appendChild(E);}return o.appendChild(i),r}function y(){if(!r)return;const $=r.getBoundingClientRect(),R=window.innerWidth,N=window.innerHeight;Math.abs($.left)>1||Math.abs($.top)>1||Math.abs($.width-R)>1||Math.abs($.height-N)>1?(r.style.left=`${-$.left}px`,r.style.top=`${-$.top}px`,r.style.width=`${R}px`,r.style.height=`${N}px`):(r.style.left="0px",r.style.top="0px",r.style.width="100%",r.style.height="100%");}function b(){!n||!r||(r.classList.remove("is-open"),n=false,a&&(a(),a=null),document.removeEventListener("keydown",p),l?.(),l=null,setTimeout(()=>{r?.remove();},200));}function S(){n&&b(),o?.removeEventListener("click",f),a&&(a(),a=null),document.removeEventListener("keydown",p),l?.(),l=null,r?.remove(),r=null,o=null,i=null;}const _=g();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(_),requestAnimationFrame(y);const F=()=>y();return window.addEventListener("resize",F),l=()=>{window.removeEventListener("resize",F);},requestAnimationFrame(()=>{r?.classList.add("is-open"),n=true,h(),document.addEventListener("keydown",p);}),{root:_,close:b,destroy:S}}function sl(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:i=n,label:a,showValue:l=true,disabled:d=false,onInput:f,onChange:p}=e,h=x("div",{className:"slider"}),g=x("div",{className:"slider-row"}),y=x("div",{className:"slider-track"}),b=x("div",{className:"slider-range"});y.appendChild(b);const S=x("input",{id:t,type:"range",min:String(n),max:String(r),step:String(o),value:String(i),disabled:d});S.addEventListener("input",N=>{I(),f?.(L(),N);}),S.addEventListener("change",N=>p?.(L(),N));function _(){const N=r-n;return N===0?0:(L()-n)/N}function I(){const N=Math.max(0,Math.min(1,_()));b.style.width=`${N*100}%`,R&&(R.textContent=String(L()));}function T(N){S.value=String(N),I();}function L(){return Number(S.value)}function F(N){S.disabled=!!N;}let $=null,R=null;return a&&($=x("span",{className:"slider-label"},a),g.appendChild($)),y.appendChild(S),g.appendChild(y),l&&(R=x("span",{className:"slider-value"},String(i)),g.appendChild(R)),h.append(g),I(),{root:h,input:S,setValue:T,getValue:L,setDisabled:F}}const If=`
  .custom-sound-modal .modal-backdrop {
    --safe-pad-y: max(16px, var(--inset-t, 0px), var(--inset-b, 0px));
    --safe-pad-x: max(16px, var(--inset-l, 0px), var(--inset-r, 0px));
    padding: var(--safe-pad-y) var(--safe-pad-x);
  }

  .custom-sound-modal .modal-dialog {
    width: 100%;
    max-width: min(92vw, 420px);
    max-height: min(80vh, 560px);
    height: auto;
    border-radius: 12px;
    background: var(--paper, var(--bg));
    overflow: visible;
    isolation: isolate;
  }

  .custom-sound-modal .modal-header {
    padding: 14px 16px;
  }

  .custom-sound-modal .modal-title {
    font-size: 15px;
    font-weight: 600;
  }

  .custom-sound-modal-title {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .custom-sound-modal-title-icon {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
  }

  .custom-sound-modal-title-sprite {
    width: 28px;
    height: 28px;
    image-rendering: auto;
  }

  .custom-sound-modal-title-text {
    color: var(--fg);
  }

  .custom-sound-modal .modal-body {
    overflow: visible;
    flex: 0 0 auto;
  }

  .custom-sound-modal .slider-value {
    color: var(--fg);
  }

  @media (max-width: 640px) {
    .custom-sound-modal .modal-backdrop {
      align-items: center;
      justify-content: center;
      min-height: 100dvh;
      height: 100dvh;
    }

    .custom-sound-modal .modal-dialog {
      max-width: min(92vw, 360px);
      max-height: min(78vh, 520px);
      border-radius: 12px;
      height: auto;
    }

    .custom-sound-modal .modal-body {
      overflow: visible;
    }
  }

  /* Header */
  .custom-sound-modal-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-bottom: 20px;
    border-bottom: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
    margin-bottom: 20px;
  }

  .custom-sound-modal-visual {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--soft) 85%, transparent);
    border-radius: 8px;
    font-size: 32px;
  }

  .custom-sound-modal-sprite {
    width: 48px;
    height: 48px;
    image-rendering: pixelated;
  }

  .custom-sound-modal-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--fg);
    text-align: center;
    font-family: var(--font-ui, system-ui);
  }

  /* Body */
  .custom-sound-modal-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .custom-sound-modal-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .custom-sound-modal-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--fg);
    font-family: var(--font-ui, system-ui);
  }

  .custom-sound-modal-controls {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .custom-sound-modal-controls > *:first-child {
    flex: 1;
  }

  /* Mode */
  .custom-sound-modal-mode-controls {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .custom-sound-modal-mode-description {
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 65%, transparent);
    font-style: italic;
    font-family: var(--font-ui, system-ui);
  }

  /* Footer */
  .custom-sound-modal .modal-footer {
    justify-content: flex-start;
  }

  .custom-sound-modal-footer {
    width: 100%;
    display: flex;
    gap: 8px;
    align-items: center;
  }
`,sI={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},Tf={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},lI=220;function cI(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function dI(e){const t=cI();if(t){un(t,If,"customSoundModal");return}const n=x("style");n.textContent=If,e.appendChild(n);}function Hg(e){const t={...sI,...e};let n=null,r=null,o=null,i=null,a=null,l=null,d=null,f=null,p=null,h=false,g=false,y=null;function b(){p?.(),p=null,f&&(f.pause(),f.currentTime=0),f=null,o?.setLabel("Play");}async function S(){if(f){b();return}if(!d)return;const G=Fe.getById(d.soundId);if(!G){console.error(`[CustomSoundModal] Sound not found: ${d.soundId}`);return}const K=new Audio(G.source);K.volume=d.volume/100,f=K;const D=()=>{b();},Z=()=>{b(),console.error(`[CustomSoundModal] Failed to play sound: ${G.name}`);};K.addEventListener("ended",D),K.addEventListener("error",Z),p=()=>{K.removeEventListener("ended",D),K.removeEventListener("error",Z);};try{await K.play(),o?.setLabel("Stop");}catch(W){b(),console.error("[CustomSoundModal] Failed to play sound:",W);}}function _(){l&&d&&(l.textContent=Tf[d.mode]);}function I(){h||y!==null||(y=window.setTimeout(()=>{F();},lI));}function T(){h||g||(g=true,b(),t.onClose?.(),I());}function L(){h||(n?.close(),T());}function F(){h||(h=true,g=true,y!==null&&(window.clearTimeout(y),y=null),b(),r&&(r.destroy(),r=null),a&&(a.destroy(),a=null),i=null,o=null,l=null,d=null,n&&(n.destroy(),n=null));}async function $(){const G=x("span",{className:"custom-sound-modal-title"});let K=false;if(e.spriteId)try{const Z=await $e.toCanvas(e.spriteId);if(Z){const W=x("span",{className:"custom-sound-modal-title-icon"});Z.className="custom-sound-modal-title-sprite",W.appendChild(Z),G.appendChild(W),K=!0;}}catch{}if(!K&&e.icon){const Z=x("span",{className:"custom-sound-modal-title-icon"},e.icon);G.appendChild(Z);}const D=x("span",{className:"custom-sound-modal-title-text"},e.entityName);return G.appendChild(D),G}function R(){const G=x("div",{className:"custom-sound-modal-body"}),K=Fe.getItemCustomSound(e.entityType,e.entityId,e.shopType),D=Fe.getNotificationConfig(e.entityType);d=K?{soundId:K.soundId,volume:K.volume,mode:K.mode}:{soundId:D.soundId,volume:D.volume,mode:D.mode};const Z=Fe.getAll().map(j=>({value:j.id,label:j.name})),W=x("div",{className:"custom-sound-modal-row"}),te=x("label",{className:"custom-sound-modal-label"},"Sound");W.appendChild(te);const re=x("div",{className:"custom-sound-modal-controls"});r=Bn({value:d.soundId,options:Z,size:"sm",onChange:j=>{d&&(d.soundId=j),b();}}),re.appendChild(r.root),o=st({label:"Play",variant:"default",size:"sm",onClick:()=>S()}),re.appendChild(o),W.appendChild(re),G.appendChild(W);const ne=x("div",{className:"custom-sound-modal-row"}),oe=x("label",{className:"custom-sound-modal-label"},"Volume");ne.appendChild(oe),i=sl({min:0,max:100,step:1,value:d.volume,showValue:true,onChange:j=>{d&&(d.volume=j),f&&(f.volume=j/100);}}),ne.appendChild(i.root),G.appendChild(ne);const V=x("div",{className:"custom-sound-modal-row"}),Q=x("label",{className:"custom-sound-modal-label"},"Mode");V.appendChild(Q);const O=x("div",{className:"custom-sound-modal-mode-controls"});return a=Bn({value:d.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:j=>{d&&(d.mode=j),_();}}),O.appendChild(a.root),l=x("div",{className:"custom-sound-modal-mode-description"},Tf[d.mode]),O.appendChild(l),V.appendChild(O),G.appendChild(V),G}function N(){const G=x("div",{className:"custom-sound-modal-footer"}),K=st({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),L();}});G.appendChild(K);const D=x("div",{style:"flex: 1"});G.appendChild(D);const Z=st({label:"Cancel",variant:"default",size:"sm",onClick:()=>L()});G.appendChild(Z);const W=st({label:"Save",variant:"primary",size:"sm",onClick:()=>{d&&e.onSave({...d}),L();}});return G.appendChild(W),G}const M=R(),C=N(),E=x("div");dI(E),E.appendChild(M),n=yu({title:e.entityName||t.title,content:E,footer:C,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:T}),n.root.classList.add("custom-sound-modal");const B=n.root.querySelector(".modal-title");return B&&$().then(G=>B.replaceChildren(G)),{root:n.root,close:L,destroy:F}}const uI=["seed","tool","egg","decor"],pI=new Set(uI);function lc(e){const[t,...n]=e.split(":");return !t||n.length===0||!pI.has(t)?null:{shopType:t,itemId:n.join(":")}}const fI=500,Pf=10,hI=800;function mI(e){const{rows:t}=e,n=new Map;let r=null,o=false;const i=new Map;let a=null,l=null,d=null,f=null,p=null,h=false;function g(O,j){j?O.classList.add("has-custom-sound"):O.classList.remove("has-custom-sound");}function y(O){const j=lc(O);return j?Fe.hasItemCustomSound("shop",j.itemId,j.shopType):false}function b(O){if(!r)return null;const j=r.root.querySelectorAll(".lg-tr-body");for(const X of j)if(X.dataset.id===O)return X;return null}function S(O,j){const X=b(O);if(!X)return;const de=j??y(O);g(X,de);}function _(){if(!r)return;r.root.querySelectorAll(".lg-tr-body").forEach(j=>{const X=j.dataset.id;X&&g(j,y(X));});}function I(){o||(o=true,requestAnimationFrame(()=>{o=false,_();}));}function T(O){i.clear();for(const j of O)i.set(`${j.shopType}:${j.id}`,j);}function L(O){const j=lc(O);return j?Fe.hasItemCustomSound("shop",j.itemId,j.shopType):false}function F(O){const j=lc(O);if(!j||!Fe.hasItemCustomSound("shop",j.itemId,j.shopType))return;Fe.removeItemCustomSound("shop",j.itemId,j.shopType);const X=i.get(O);X&&(X.hasCustomSound=false),S(O,false),I();}function $(){l!==null&&(window.clearTimeout(l),l=null),a=null;}function R(O){a=O,l!==null&&window.clearTimeout(l),l=window.setTimeout(()=>{l=null,a=null;},hI);}function N(){d!==null&&(window.clearTimeout(d),d=null),f=null,p=null,h=false;}if(r=Sd({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(O,j)=>O.itemName.localeCompare(j.itemName,void 0,{numeric:true,sensitivity:"base"}),render:O=>{const j=x("div",{className:"shop-item-cell"}),X=x("div",{className:"shop-item-icon"});O.spriteId?$e.toCanvas(O.spriteId).then(ce=>{ce?(ce.className="shop-item-sprite",X.appendChild(ce)):X.textContent=sc[O.shopType];}).catch(()=>{X.textContent=sc[O.shopType];}):X.textContent=sc[O.shopType];const de=x("div",{className:"shop-item-name"});return de.textContent=O.itemName,j.appendChild(X),j.appendChild(de),j}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(O,j)=>{const X=O.rarity?Ef[O.rarity.toLowerCase()]??999:999,de=j.rarity?Ef[j.rarity.toLowerCase()]??999:999;return X-de},render:O=>{const j=x("div",{className:"shop-item-rarity"}),X=rl({variant:"rarity",rarity:O.rarity});return j.appendChild(X.root),j}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:O=>{const j=x("div",{className:"shop-item-notify"}),X=Sf(O.id,O.shopType),de=tr({checked:O.isTracked,disabled:X,size:"sm",onChange:le=>{O.isTracked=le,le?zr.addTrackedItem(O.shopType,O.id):zr.removeTrackedItem(O.shopType,O.id);}}),ce=`${O.shopType}:${O.id}`;return n.set(ce,de),j.appendChild(de.root),j}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:O=>`${O.shopType}:${O.id}`,onSortChange:()=>{I();},onRowClick:(O,j,X)=>{const de=`${O.shopType}:${O.id}`;if(a){if(a===de){$();return}$();}X.target.closest(".shop-item-notify")||Hg({entityType:"shop",entityId:O.id,entityName:O.itemName,spriteId:O.spriteId,shopType:O.shopType,onSave:le=>{le===null?(Fe.removeItemCustomSound("shop",O.id,O.shopType),O.hasCustomSound=false,S(de,false)):(Fe.setItemCustomSound("shop",O.id,le,O.shopType),O.hasCustomSound=true,S(de,true));}});}}),!r)throw new Error("[ShopsCard] Failed to create items table");T(t);const C=r.root,E=O=>{const j=O.target;if(j.closest(".shop-item-notify"))return;const de=j.closest(".lg-tr-body")?.dataset.id;!de||!L(de)||(O.preventDefault(),O.stopPropagation(),R(de),F(de));},B=O=>{if(O.pointerType==="mouse"||O.button!==0)return;const j=O.target;if(j.closest(".shop-item-notify"))return;const de=j.closest(".lg-tr-body")?.dataset.id;!de||!L(de)||(N(),f=de,p={x:O.clientX,y:O.clientY},d=window.setTimeout(()=>{d=null,f&&(h=true,R(f),F(f));},fI));},G=O=>{if(!p||!f||h)return;const j=O.clientX-p.x,X=O.clientY-p.y;j*j+X*X>Pf*Pf&&N();},K=()=>{N();},D=()=>{N();};C.addEventListener("contextmenu",E),C.addEventListener("pointerdown",B),C.addEventListener("pointermove",G),C.addEventListener("pointerup",K),C.addEventListener("pointercancel",D);const Z=r.setData.bind(r);r.setData=O=>{T(O),Z(O),I();},I();const W=O=>{for(const[j,X]of n.entries()){const[de,ce]=j.split(":");if(O&&de!==O)continue;const le=Sf(ce,de);X.setDisabled(le);}},re=Ro().subscribeStable(()=>{W();}),ne=Wr(),oe=ne.subscribeDecorPlaced(()=>{W("decor");}),V=ne.subscribeDecorRemoved(()=>{W("decor");}),Q=r.destroy.bind(r);return r.destroy=()=>{re(),oe(),V(),C.removeEventListener("contextmenu",E),C.removeEventListener("pointerdown",B),C.removeEventListener("pointermove",G),C.removeEventListener("pointerup",K),C.removeEventListener("pointercancel",D),N(),$(),n.clear(),i.clear(),Q();},r}function gI(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function bI(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=x("div",{className:"select"});for(const p of Array.from(e.classList))p.startsWith("select--")&&o.classList.add(p);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=x("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",l=x("span",{className:"select-value"},t),d=x("span",{className:"select-caret"},a);i.append(l,d),o.appendChild(i),r.appendChild(o);const f=Math.ceil(i.getBoundingClientRect().width);return o.remove(),f}function vI(e,t){const n=gI(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=bI(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function yI(e){const t=Fo(),n=t.get();let r=null,o=[],i=[];const a={selectedShopType:"all",searchQuery:""},l={shopTypeSelect:null,searchInput:null,tableHandle:null};let d=0,f=new Set;function p(_,I){if(_.size!==I.size)return  false;for(const T of _)if(!I.has(T))return  false;return  true}function h(){if(!l.tableHandle)return;const _=o.filter(I=>!(a.selectedShopType!=="all"&&I.shopType!==a.selectedShopType||a.searchQuery&&!I.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));i=_,l.tableHandle.setData(_);}function g(){const _=x("div",{className:"shops-card-filters"}),T=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(F=>({value:F,label:Q_[F]}))];l.shopTypeSelect=Bn({value:"all",options:T,size:"sm",onChange:F=>{a.selectedShopType=F,h();}});const L=l.shopTypeSelect.root;return L.style.minWidth="0",L.style.width="auto",vI(L,T.map(F=>F.label)),l.searchInput=Us({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:F=>{a.searchQuery=F.trim(),h();}}),_.appendChild(l.shopTypeSelect.root),_.appendChild(l.searchInput.root),_}function y(){o=_f(n),i=[...o],d=o.length,f=new Set(o.map($=>$.shopType));const _=x("div");l.tableHandle=mI({rows:i});const I=g();_.appendChild(I),_.appendChild(l.tableHandle.root);const T=x("div",{className:"shops-card-hint"}),L=x("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),F=x("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return T.append(L,F),_.appendChild(T),r=lt({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},_),r}function b(){const _=t.get(),I=_f(_),T=I.length,L=new Set(I.map($=>$.shopType));(T!==d||!p(L,f))&&(d=T,f=L,o=I,h());}function S(){if(l.tableHandle&&(l.tableHandle.destroy(),l.tableHandle=null),l.shopTypeSelect&&(l.shopTypeSelect.destroy(),l.shopTypeSelect=null),l.searchInput){const _=l.searchInput.root.__cleanup;_&&_(),l.searchInput=null;}r=null;}return {root:y(),refresh:b,destroy:S}}const xI=".mp3,.wav,.ogg,audio/*",wI=250*1024,CI=3;function kI(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function SI(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function AI(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function Vg(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function EI(e,t){const n=Vg(t);if(!n.length)return  true;const r=e.name.toLowerCase(),o=e.type.toLowerCase();return n.some(i=>{const a=i.toLowerCase();if(a.startsWith("."))return r.endsWith(a);if(a.endsWith("/*")){const l=a.slice(0,-1);return o.startsWith(l)}return o===a})}function _I(e){const n=Vg(e).map(r=>r.startsWith(".")?r.slice(1).toUpperCase():r.endsWith("/*")?"Audio":r.includes("/")&&r.split("/")[1]?.toUpperCase()||r.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function II(e={}){const{id:t,className:n,label:r="Add sounds",hint:o,accept:i=xI,multiple:a=true,disabled:l=false,maxSizeBytes:d=wI,maxItems:f,emptyLabel:p="No sounds added yet",onItemsChange:h,onFilesAdded:g,onError:y}=e;let b=[],S=0,_=null,I=false,T=!!l,L=null,F=null,$=null;const R=new Map,N=new Map,M=Number.isFinite(f)?Math.max(1,Number(f)):a?Number.POSITIVE_INFINITY:1,C=x("div",{className:"sound-picker",id:t});n&&C.classList.add(...n.split(" ").filter(Boolean)),T&&C.classList.add("is-disabled");const E=x("div",{className:"sound-picker__header"}),B=x("div",{className:"sound-picker__label"},r),G=o??`${_I(i)} - Max ${AI(d)}`,K=x("div",{className:"sound-picker__hint"},G);E.append(B,K);const D=x("div",{className:"sound-picker__zone",role:"button",tabIndex:T?-1:0,"aria-disabled":String(T)}),Z=x("div",{className:"sound-picker__zone-text"}),W=x("div",{className:"sound-picker__zone-title"},"Drop audio files here"),te=x("div",{className:"sound-picker__zone-subtitle"},"or click to browse");Z.append(W,te);const re=st({label:a?"Choose files":"Choose file",size:"sm",onClick:m=>{m.preventDefault(),T||ne.click();},disabled:T});re.classList.add("sound-picker__pick");const ne=x("input",{className:"sound-picker__input",type:"file",accept:i,multiple:a?true:void 0,disabled:T,tabIndex:-1});D.append(Z,re,ne);const oe=x("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),V=x("div",{className:"sound-picker__list",role:"list"});C.append(E,D,oe,V);function Q(m,A="info"){const U=m??"";oe.textContent=U,oe.classList.toggle("is-error",A==="error");}function O(m){y?.(m),Q(m.message,"error");}function j(){for(const m of R.values())try{m.destroy();}catch{}R.clear();}function X(m){const A=N.get(m.id);if(A)return A;const U=m.file.__sourceUrl;if(U)return N.set(m.id,U),U;const H=URL.createObjectURL(m.file);return N.set(m.id,H),H}function de(m){const A=N.get(m);A&&(A.startsWith("blob:")&&URL.revokeObjectURL(A),N.delete(m));}function ce(){$?.(),$=null,L&&(L.pause(),L.currentTime=0),L=null,F=null;}function le(){V.querySelectorAll(".sound-picker__item").forEach(A=>{const U=A.dataset.id,H=A.querySelector(".sound-picker__item-btn--play");if(!U||!H)return;const ee=!!L&&F===U&&!L.paused;H.textContent=ee?"Stop":"Play",A.classList.toggle("is-playing",ee);});}function ye(m){if(T)return;if(F===m.id){ce(),le();return}ce();const A=X(m),U=new Audio(A);L=U,F=m.id;const H=()=>{F===m.id&&(ce(),le());},ee=()=>{F===m.id&&(ce(),le(),O({code:"type",file:m.file,message:`Unable to play ${m.name}`}));};U.addEventListener("ended",H),U.addEventListener("error",ee),$=()=>{U.removeEventListener("ended",H),U.removeEventListener("error",ee);},U.play().then(()=>{le();}).catch(()=>{ce(),le(),O({code:"type",file:m.file,message:`Unable to play ${m.name}`});});}function Ie(){if(j(),V.classList.toggle("is-scrollable",b.length>CI),!b.length){const A=x("div",{className:"sound-picker__empty"});A.append(typeof p=="string"?document.createTextNode(p):p),V.replaceChildren(A);return}const m=b.map(A=>ut(A));if(V.replaceChildren(...m),_){const A=R.get(_);A&&requestAnimationFrame(()=>A.focus());}le();}function ut(m){const A=_===m.id,U=x("div",{className:"sound-picker__item",role:"listitem","data-id":m.id}),H=x("div",{className:"sound-picker__item-top"});x("div",{className:"sound-picker__item-bottom"});const ee=x("div",{className:"sound-picker__item-name"});if(A&&!T){const xe=pr({value:m.name,blockGameKeys:true,onEnter:be=>{Rt(m.id,be);}});xe.root.classList.add("sound-picker__rename"),xe.input.classList.add("input--sm"),xe.input.setAttribute("aria-label","Rename sound"),xe.input.addEventListener("keydown",be=>{be.key==="Escape"&&(be.preventDefault(),Ht());}),xe.input.addEventListener("blur",()=>{if(I){I=false;return}Rt(m.id,xe.getValue());}),R.set(m.id,xe),ee.appendChild(xe.root);}else {const xe=x("div",{className:"sound-picker__item-label",title:m.name},m.name);ee.appendChild(xe);}const ue=x("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(A&&!T){const xe=x("button",{className:"sound-picker__item-btn",type:"button",disabled:T},"Save");xe.addEventListener("click",()=>{const Ce=R.get(m.id);Rt(m.id,Ce?.getValue()??m.name);});const be=x("button",{className:"sound-picker__item-btn",type:"button",disabled:T},"Cancel");be.addEventListener("pointerdown",()=>{I=true;}),be.addEventListener("click",()=>Ht()),ue.append(xe,be);}else {const xe=x("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:T},F===m.id?"Stop":"Play");xe.addEventListener("click",()=>ye(m));const be=x("button",{className:"sound-picker__item-btn",type:"button",disabled:T},"Rename");be.addEventListener("click",()=>{T||(_=m.id,Ie());});const Ce=x("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:T},"Remove");Ce.addEventListener("click",()=>tt(m.id)),ue.append(xe,be,Ce);}return H.append(ee,ue),U.append(H),U}function ht(){return b.slice()}function pt(m){const A=m.slice(),U=new Set(A.map(H=>H.id));for(const H of Array.from(N.keys()))U.has(H)||de(H);F&&!U.has(F)&&ce(),b=A,_=null,Ie(),h?.(ht());}function It(m){if(T)return;const A=Array.from(m??[]);if(!A.length)return;const U=[],H=[];for(const Ce of A){if(i&&!EI(Ce,i)){H.push({code:"type",file:Ce,message:`Unsupported file type: ${Ce.name}`});continue}if(Number.isFinite(d)&&Ce.size>d){H.push({code:"size",file:Ce,maxSizeBytes:d,message:`File too large: ${Ce.name}`});continue}U.push({id:kI(),file:Ce,name:SI(Ce),size:Ce.size,type:Ce.type});}if(!U.length){H.length&&O(H[0]);return}const ee=a?b.slice():[],ue=Number.isFinite(M)?Math.max(0,M-ee.length):U.length;if(ue<=0){O({code:"limit",message:`Maximum of ${Math.max(1,M)} files reached`});return}const xe=U.slice(0,ue),be=a?ee.concat(xe):xe.slice(0,1);pt(be),Q(null),g?.(xe.slice()),H.length&&O(H[0]);}function Wt(m,A){const U=A.trim();if(!U){O({code:"name",message:"Name cannot be empty"});return}const H=b.map(ee=>ee.id===m?{...ee,name:U}:ee);pt(H),Q(null);}function Rt(m,A){const U=A.trim();if(!U){O({code:"name",message:"Name cannot be empty"});return}Wt(m,U);}function Ht(){_=null,Q(null),Ie();}function tt(m){const A=b.filter(U=>U.id!==m);pt(A),Q(null);}function De(){ce(),pt([]),Q(null);}function gn(m){T=!!m,C.classList.toggle("is-disabled",T),D.setAttribute("aria-disabled",String(T)),D.tabIndex=T?-1:0,ne.disabled=T,re.setDisabled(T),T&&ce(),Ie();}function bn(){T||ne.click();}const mt=m=>{if(T)return;const A=m.target;A&&A.closest(".sound-picker__pick")||ne.click();},St=m=>{T||(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),ne.click());},Vt=m=>{T||!m.dataTransfer||!m.dataTransfer.types.includes("Files")||(m.preventDefault(),S+=1,D.classList.add("is-dragover"));},An=m=>{T||!m.dataTransfer||!m.dataTransfer.types.includes("Files")||(m.preventDefault(),m.dataTransfer.dropEffect="copy");},tn=m=>{T||D.classList.contains("is-dragover")&&(m.preventDefault(),S=Math.max(0,S-1),S<=0&&(S=0,D.classList.remove("is-dragover")));},k=m=>{T||!m.dataTransfer||!m.dataTransfer.files.length||(m.preventDefault(),S=0,D.classList.remove("is-dragover"),It(m.dataTransfer.files));},u=()=>{if(T){ne.value="";return}ne.files&&It(ne.files),ne.value="";};return D.addEventListener("click",mt),D.addEventListener("keydown",St),D.addEventListener("dragenter",Vt),D.addEventListener("dragover",An),D.addEventListener("dragleave",tn),D.addEventListener("drop",k),ne.addEventListener("change",u),Ie(),{root:C,getItems:ht,setItems:pt,addFiles:It,renameItem:Wt,removeItem:tt,clear:De,setDisabled:gn,openPicker:bn,setStatus:Q,destroy(){j(),ce();for(const m of Array.from(N.keys()))de(m);D.removeEventListener("click",mt),D.removeEventListener("keydown",St),D.removeEventListener("dragenter",Vt),D.removeEventListener("dragover",An),D.removeEventListener("dragleave",tn),D.removeEventListener("drop",k),ne.removeEventListener("change",u),C.remove();}}}const Lf={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function TI(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function PI(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=x("div",{className:"select"});for(const p of Array.from(e.classList))p.startsWith("select--")&&o.classList.add(p);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=x("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",l=x("span",{className:"select-value"},t),d=x("span",{className:"select-caret"},a);i.append(l,d),o.appendChild(i),r.appendChild(o);const f=Math.ceil(i.getBoundingClientRect().width);return o.remove(),f}function LI(e,t){const n=TI(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=PI(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function MI(e){let t=null,n=null,r=null;const o=new Map,i=new Map,a=new Map;let l=null,d=null,f=null;function p(){f?.(),f=null,l&&(l.pause(),l.currentTime=0),l=null,d=null;}function h(){if(!r)return;r.querySelectorAll(".notification-item").forEach(R=>{const N=R.dataset.type,M=R.querySelector(".notification-item-play");if(!N||!M)return;const C=!!l&&d===N&&!l.paused;M.textContent=C?"Stop":"Play",R.classList.toggle("is-playing",C);});}async function g($){if(d===$){p(),h();return}p();const R=Fe.getNotificationConfig($),N=Fe.getById(R.soundId);if(!N){console.error(`[SettingCard] Sound not found: ${R.soundId}`);return}const M=new Audio(N.source);M.volume=R.volume/100,l=M,d=$;const C=()=>{d===$&&(p(),h());},E=()=>{d===$&&(p(),h(),console.error(`[SettingCard] Failed to play sound: ${N.name}`));};M.addEventListener("ended",C),M.addEventListener("error",E),f=()=>{M.removeEventListener("ended",C),M.removeEventListener("error",E);};try{await M.play(),h();}catch(B){p(),h(),console.error("[SettingCard] Failed to play sound:",B);}}function y($,R){if($.startsWith("data:"))try{const N=$.split(","),M=N[0].match(/:(.*?);/)?.[1]||"audio/mpeg",C=atob(N[1]),E=C.length,B=new Uint8Array(E);for(let G=0;G<E;G++)B[G]=C.charCodeAt(G);return new File([B],R,{type:M})}catch(N){return console.error("[SettingCard] Failed to convert data URL to File:",N),new File([],R,{type:"audio/mpeg"})}return new File([],R,{type:"audio/mpeg"})}function b(){const R=Fe.getAll().map(N=>({value:N.id,label:N.name}));for(const[N,M]of o){const C=Fe.getNotificationConfig(N);M.setOptions(R),M.setValue(C.soundId);}}function S($,R,N){const M=x("div",{className:"notification-item","data-type":$}),C=x("div",{className:"notification-item-label"},R);M.appendChild(C);const E=x("div",{className:"notification-item-description"},N);M.appendChild(E);const B=x("div",{className:"notification-item-controls"}),G=Fe.getNotificationConfig($),D=Fe.getAll().map(Q=>({value:Q.id,label:Q.name})),Z=Bn({value:G.soundId,options:D,size:"sm",onChange:Q=>{const O=Fe.getNotificationConfig($);Fe.setNotificationConfig($,{soundId:Q,volume:O.volume,mode:O.mode});}});o.set($,Z);const W=x("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");W.addEventListener("click",()=>{g($);}),B.appendChild(Z.root),B.appendChild(W),M.appendChild(B);const te=sl({min:0,max:100,step:1,value:G.volume,showValue:true,onChange:Q=>{const O=Fe.getNotificationConfig($);Fe.setNotificationConfig($,{soundId:O.soundId,volume:Q,mode:O.mode});}});a.set($,te),M.appendChild(te.root);const re=x("div",{className:"notification-mode-row"}),ne=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],oe=Bn({value:G.mode,options:ne,size:"sm",onChange:Q=>{const O=Fe.getNotificationConfig($);Fe.setNotificationConfig($,{soundId:O.soundId,volume:O.volume,mode:Q}),_($);}});i.set($,oe),oe.root.classList.add("shrink"),LI(oe.root,ne.map(Q=>Q.label)),re.appendChild(oe.root);const V=x("div",{className:"notification-mode-description"},Lf[$][G.mode]);return re.appendChild(V),M.appendChild(re),M}function _($){if(!r)return;const R=r.querySelector(`[data-type="${$}"]`);if(!R)return;const N=Fe.getNotificationConfig($),M=R.querySelector(".notification-mode-description");M&&(M.textContent=Lf[$][N.mode]);}function I(){const $=x("div",{className:"alerts-settings-body"});Fe.init(),r=x("div",{className:"notification-settings"}),r.appendChild(S("shop","Shops restock","Default sound for shop restock alerts")),r.appendChild(S("pet","Pet events","Default sound for pet event alerts")),r.appendChild(S("weather","Weather events","Default sound for weather event alerts")),$.appendChild(r);const R=x("div",{className:"alerts-settings-divider"});$.appendChild(R);const N=Fe.getAll().map(M=>{const C=y(M.source,M.name);return C.__sourceUrl=M.source,{id:M.id,file:C,name:M.name,size:0,type:M.type}});return n=II({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:Co.MAX_SOUNDS,maxSizeBytes:Co.MAX_SIZE_BYTES,multiple:true,onItemsChange:M=>{T(M),b();},onFilesAdded:M=>{L(M),setTimeout(()=>{b();},100);}}),n.setItems(N),$.appendChild(n.root),t=lt({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},$),t}function T($){const R=new Set(Fe.getAll().map(C=>C.id)),N=new Set($.map(C=>C.id)),M=[];for(const C of R)if(!N.has(C)){M.push(C);try{Fe.remove(C);}catch(E){console.error(`[SettingCard] Failed to remove sound ${C}:`,E);}}if(M.length>0){const C=["shop","pet","weather"];for(const E of C){const B=Fe.getNotificationConfig(E);if(M.includes(B.soundId)){Fe.setNotificationConfig(E,{soundId:"default-notification",volume:B.volume,mode:B.mode});const G=a.get(E);G&&G.setValue(B.volume);}}}for(const C of $)if(R.has(C.id)){const E=Fe.getById(C.id);if(E&&E.name!==C.name)try{Fe.update(C.id,{name:C.name});}catch(B){console.error(`[SettingCard] Failed to rename sound ${C.id}:`,B);}}}function L($){for(const R of $)if(!Fe.getById(R.id)){const N=new FileReader;N.onload=M=>{const C=M.target?.result;try{const E=Fe.add(R.name,C,"upload");if(n&&E.id!==R.id){const B=n.getItems().map(G=>G.id===R.id?{...G,id:E.id}:G);n.setItems(B);}}catch(E){console.error(`[SettingCard] Failed to add sound ${R.name}:`,E);}},N.onerror=()=>{console.error(`[SettingCard] Failed to read file ${R.name}`);},N.readAsDataURL(R.file);}}function F(){p(),n&&(n.destroy(),n=null);for(const $ of o.values())$.destroy();o.clear();for(const $ of i.values())$.destroy();i.clear(),a.clear(),t=null;}return {root:I(),destroy:F}}const Kg=_t.WEATHER_NOTIFIER,RI={enabled:false,trackedWeathers:[]};function Yg(e){return Array.isArray(e)?[...e]:[]}function ll(e){return [...e]}function Xi(){const e=it(Kg,RI);return {enabled:e?.enabled??false,trackedWeathers:Yg(e?.trackedWeathers)}}function xu(e){ct(Kg,{enabled:e.enabled,trackedWeathers:ll(e.trackedWeathers)});}function FI(e){const n={...Xi(),...e};return e.trackedWeathers&&(n.trackedWeathers=Yg(e.trackedWeathers)),xu(n),n}function qg(){return Xi().enabled}function OI(e){FI({enabled:e});}function cl(){return ll(Xi().trackedWeathers)}function NI(e){return cl().includes(e)}function DI(e){const t=Xi(),n=ll(t.trackedWeathers);if(n.includes(e))return;n.push(e);const r=!t.enabled&&n.length>0,o={trackedWeathers:n,enabled:r?true:t.enabled};xu(o);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:r}});window.dispatchEvent(i);const a=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(a);}function $I(e){const t=Xi(),n=ll(t.trackedWeathers),r=n.filter(l=>l!==e);if(r.length===n.length)return;const o=t.enabled&&r.length===0,i={trackedWeathers:r,enabled:o?false:t.enabled};xu(i);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:o}});window.dispatchEvent(a);}let yi=null,ns="Sunny",Jn=false,xi=null,Es="";function Xg(e){return `${e.soundId}:${e.volume}:${e.mode}`}function _s(e){const t=Fe.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:wt.CustomSounds.getNotificationConfig("weather")}function BI(e){if(Jn)return;const t=wt.CustomSounds.getById(e.soundId);if(t){xi=t.source,Jn=true,Es=Xg(e);try{wt.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{Jn=false,xi=null,Es="";}}}function rs(){if(Jn){try{const e=wt.getCustomHandle();(!xi||e&&e.url===xi)&&wt.CustomSounds.stop();}catch{}Jn=false,xi=null,Es="";}}function Ri(e,t){const n=t??_s(e);if(n.mode!=="loop"){Jn&&rs();return}if(!cl().includes(e)){Jn&&rs();return}const i=Xg(n);Jn&&i!==Es&&rs(),Jn||BI(n);}function Jg(e){const{weatherId:t}=e.detail||{};if(!t)return;const o=Yi().get().id,i=_s(t);if(o===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),i.mode==="one-shot"&&eb(i),Ri(o,i);const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function Qg(){const t=Yi().get().id;Ri(t);}function Zg(e){if(e.detail?.entityType!=="weather")return;const r=Yi().get().id;Ri(r);}function zI(){if(yi){console.log("[WeatherNotifier] Already tracking");return}const e=Yi(),t=e.get();ns=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",ns),window.addEventListener("gemini:weather-tracked-check",Jg),window.addEventListener("gemini:tracked-weathers-changed",Qg),window.addEventListener(gt.CUSTOM_SOUND_CHANGE,Zg);const n=_s(t.id);Ri(t.id,n),yi=e.subscribeStable(r=>{const o=r.current.id,i=r.previous.id,a=_s(o);if(console.log("[WeatherNotifier] Weather changed:",{previous:i,current:o}),Ri(o,a),o!==i&&cl().includes(o)){console.log("[WeatherNotifier] Tracked weather detected:",o),a.mode==="one-shot"&&eb(a);const d=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:o}});window.dispatchEvent(d);}ns=o;}),console.log("[WeatherNotifier] Tracking initialized");}function jI(){window.removeEventListener("gemini:weather-tracked-check",Jg),window.removeEventListener("gemini:tracked-weathers-changed",Qg),window.removeEventListener(gt.CUSTOM_SOUND_CHANGE,Zg),yi&&(yi(),yi=null,ns="Sunny",rs(),console.log("[WeatherNotifier] Tracking stopped"));}function eb(e){try{wt.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let Fi=false;function tb(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),rb(),nb());}function nb(){if(Fi){console.log("[WeatherNotifier] Already initialized");return}if(Fi=true,window.addEventListener("gemini:tracked-weathers-changed",tb),!qg()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),zI(),console.log("[WeatherNotifier] Initialized");}function rb(){Fi&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",tb),jI(),Fi=false,console.log("[WeatherNotifier] Destroyed"));}function GI(){return Fi}const Ao={init:nb,destroy:rb,isReady:GI,isEnabled:qg,setEnabled:OI,getTrackedWeathers:cl,addTrackedWeather:DI,removeTrackedWeather:$I,isWeatherTracked:NI};function UI(e){try{const t=Oe.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function WI(e){try{const t=Oe.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function HI(e){try{const t=Oe.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const r=n.mutator;if(!r||typeof r!="object")return "No effects";const o=r.mutation;if(!o)return "No effects";const i=Oe.get("mutations");if(!i||typeof i!="object")return o;const a=i[o];return !a||typeof a!="object"?o:a.name||o}catch{return "No effects"}}function Mf(){const e=Oe.get("weather");if(!e||typeof e!="object")return [];const t=Ao.getTrackedWeathers(),n=new Set(t),r=[];for(const o of Object.keys(e)){if(o==="Sunny")continue;const i={weatherId:o,weatherName:UI(o),spriteId:WI(o),effects:HI(o),isTracked:n.has(o),hasCustomSound:Fe.hasItemCustomSound("weather",o)};r.push(i);}return r.sort((o,i)=>o.weatherName.localeCompare(i.weatherName)),r}const VI=500,Rf=10,KI=800;function YI(e){const{rows:t}=e;let n=null,r=false;const o=new Map;let i=null,a=null,l=null,d=null,f=null,p=false;function h(W,te){te?W.classList.add("has-custom-sound"):W.classList.remove("has-custom-sound");}function g(W){return Fe.hasItemCustomSound("weather",W)}function y(W){if(!n)return null;const te=n.root.querySelectorAll(".lg-tr-body");for(const re of te)if(re.dataset.id===W)return re;return null}function b(W,te){const re=y(W);if(!re)return;const ne=te??g(W);h(re,ne);}function S(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(te=>{const re=te.dataset.id;re&&h(te,g(re));});}function _(){r||(r=true,requestAnimationFrame(()=>{r=false,S();}));}function I(W){o.clear();for(const te of W)o.set(te.weatherId,te);}function T(W){return Fe.hasItemCustomSound("weather",W)}function L(W){if(!Fe.hasItemCustomSound("weather",W))return;Fe.removeItemCustomSound("weather",W);const te=o.get(W);te&&(te.hasCustomSound=false),b(W,false),_();}function F(){a!==null&&(window.clearTimeout(a),a=null),i=null;}function $(W){i=W,a!==null&&window.clearTimeout(a),a=window.setTimeout(()=>{a=null,i=null;},KI);}function R(){l!==null&&(window.clearTimeout(l),l=null),d=null,f=null,p=false;}if(n=Sd({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(W,te)=>W.weatherName.localeCompare(te.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:W=>{const te=x("div",{className:"weather-item-cell"}),re=x("div",{className:"weather-item-icon"});W.spriteId&&$e.has(W.spriteId)?$e.toCanvas(W.spriteId).then(oe=>{oe.className="weather-item-sprite",re.appendChild(oe);}).catch(()=>{re.textContent=Ff(W.weatherId);}):re.textContent=Ff(W.weatherId);const ne=x("div",{className:"weather-item-name"});return ne.textContent=W.weatherName,te.appendChild(re),te.appendChild(ne),te}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:W=>{const te=x("div",{className:"weather-item-effects"});return te.textContent=W.effects,te}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:W=>{const te=x("div",{className:"weather-item-notify"}),re=tr({checked:W.isTracked,disabled:false,size:"sm",onChange:ne=>{W.isTracked=ne,ne?Ao.addTrackedWeather(W.weatherId):Ao.removeTrackedWeather(W.weatherId);}});return te.appendChild(re.root),te}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:W=>W.weatherId,onSortChange:()=>{_();},onRowClick:(W,te,re)=>{const ne=W.weatherId;if(i){if(i===ne){F();return}F();}re.target.closest(".weather-item-notify")||Hg({entityType:"weather",entityId:W.weatherId,entityName:W.weatherName,spriteId:W.spriteId,onSave:V=>{V===null?(Fe.removeItemCustomSound("weather",W.weatherId),W.hasCustomSound=false,b(ne,false)):(Fe.setItemCustomSound("weather",W.weatherId,V),W.hasCustomSound=true,b(ne,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");I(t);const M=n.root,C=W=>{const te=W.target;if(te.closest(".weather-item-notify"))return;const ne=te.closest(".lg-tr-body")?.dataset.id;!ne||!T(ne)||(W.preventDefault(),W.stopPropagation(),$(ne),L(ne));},E=W=>{if(W.pointerType==="mouse"||W.button!==0)return;const te=W.target;if(te.closest(".weather-item-notify"))return;const ne=te.closest(".lg-tr-body")?.dataset.id;!ne||!T(ne)||(R(),d=ne,f={x:W.clientX,y:W.clientY},l=window.setTimeout(()=>{l=null,d&&(p=true,$(d),L(d));},VI));},B=W=>{if(!f||!d||p)return;const te=W.clientX-f.x,re=W.clientY-f.y;te*te+re*re>Rf*Rf&&R();},G=()=>{R();},K=()=>{R();};M.addEventListener("contextmenu",C),M.addEventListener("pointerdown",E),M.addEventListener("pointermove",B),M.addEventListener("pointerup",G),M.addEventListener("pointercancel",K);const D=n.setData.bind(n);n.setData=W=>{I(W),D(W),_();},_();const Z=n.destroy.bind(n);return n.destroy=()=>{M.removeEventListener("contextmenu",C),M.removeEventListener("pointerdown",E),M.removeEventListener("pointermove",B),M.removeEventListener("pointerup",G),M.removeEventListener("pointercancel",K),R(),F(),o.clear(),Z();},n}function Ff(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function qI(e){let t=null,n=[];const r={tableHandle:null};let o=0;function i(){n=Mf(),o=n.length;const d=x("div");r.tableHandle=YI({rows:n}),d.appendChild(r.tableHandle.root);const f=x("div",{className:"weather-card-hint"}),p=x("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),h=x("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return f.append(p,h),d.appendChild(f),t=lt({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},d),t}function a(){const d=Mf(),f=d.length;f!==o&&(o=f,n=d,r.tableHandle?.setData(d));}function l(){r.tableHandle&&(r.tableHandle.destroy(),r.tableHandle=null),t=null;}return {root:i(),refresh:a,destroy:l}}const XI={enabled:false,threshold:5};function dl(){return it(_t.PET_HUNGER_NOTIFIER,XI)}function ob(e){ct(_t.PET_HUNGER_NOTIFIER,e);}function ib(){return dl().enabled}function JI(e){const t=dl();t.enabled=e,ob(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function ab(){return dl().threshold}function QI(e){const t=dl();t.threshold=e,ob(t);}let wi=null;const os=new Set;let ur=false,Ci=null;function ZI(e){if(ur)return;const t=wt.CustomSounds.getById(e.soundId);if(t){Ci=t.source,ur=true;try{wt.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{ur=false,Ci=null;}}}function nd(){if(ur){try{const e=wt.getCustomHandle();(!Ci||e&&e.url===Ci)&&wt.CustomSounds.stop();}catch{}ur=false,Ci=null;}}function e2(e,t){if(t.mode!=="loop"){ur&&nd();return}e?ur||ZI(t):ur&&nd();}function t2(){if(wi){console.log("[PetHungerNotifier] Already tracking");return}const e=Hr(),t=ab();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),wi=e.subscribe(n=>{const r=n.byLocation.active,o=wt.CustomSounds.getNotificationConfig("pet"),i=o.mode==="loop";let a=false;for(const l of r)if(l.hungerPercent<t){if(a=true,!os.has(l.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:l.name||l.petSpecies,species:l.petSpecies,hungerPercent:l.hungerPercent.toFixed(2)+"%"}),i||r2(o);const d=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:l}});window.dispatchEvent(d),os.add(l.id);}}else os.delete(l.id);e2(a,o);}),console.log("[PetHungerNotifier] Tracking initialized");}function n2(){wi&&(wi(),wi=null,os.clear(),nd(),console.log("[PetHungerNotifier] Tracking stopped"));}function r2(e){try{wt.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let Oi=false;function sb(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),cb(),lb());}function lb(){if(Oi){console.log("[PetHungerNotifier] Already initialized");return}if(Oi=true,window.addEventListener("gemini:pet-hunger-config-changed",sb),!ib()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),t2(),console.log("[PetHungerNotifier] Initialized");}function cb(){Oi&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",sb),n2(),Oi=false,console.log("[PetHungerNotifier] Destroyed"));}function o2(){return Oi}const Ni={init:lb,destroy:cb,isReady:o2,isEnabled:ib,setEnabled:JI,getThreshold:ab,setThreshold:QI};function i2(e){let t=null,n=null;function r(){const i=x("div",{className:"pet-card-body"}),a=x("div",{className:"pet-card-row"}),l=xd({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=tr({checked:Ni.isEnabled(),onChange:d=>{Ni.setEnabled(d);}}),a.appendChild(l.root),a.appendChild(n.root),i.appendChild(a),t=lt({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},i),t}function o(){n&&(n.destroy(),n=null),t=null;}return {root:r(),destroy:o}}class a2 extends hr{constructor(){super({id:"tab-alerts",label:"Alerts"});we(this,"sectionElement",null);we(this,"state",null);we(this,"settingCard",null);we(this,"shopsCard",null);we(this,"weatherCard",null);we(this,"petCard",null);}async build(n){this.state=await O_();const r=n.getRootNode();un(r,F_,"alerts-styles");const o=this.createGrid("12px");o.id="alerts-section",this.sectionElement=o;const{MGData:i}=await wn(async()=>{const{MGData:f}=await Promise.resolve().then(()=>fg);return {MGData:f}},void 0),a=["plants","items","eggs","decor","weather","mutations"],l=await Promise.allSettled(a.map(f=>i.waitFor(f))),d=a.filter((f,p)=>l[p]?.status==="rejected");d.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",d.join(", ")),this.buildParts(),n.appendChild(o);}render(n){const r=this.shopsCard,o=this.weatherCard,i=this.petCard,a=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=r,this.weatherCard=o,this.petCard=i,this.settingCard=a;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=yI({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:r=>this.state.setCardExpanded("shops",r)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=i2({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:r=>this.state.setCardExpanded("pet",r)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=qI({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:r=>this.state.setCardExpanded("weather",r)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=MI({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:r=>this.state.setCardExpanded("settings",r)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const s2={enabled:true},db=_t.ANTI_AFK,l2=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],c2=25e3,d2=1,u2=1e-5,Ge={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function p2(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),Ge.listeners.push({type:n,handler:r,target:t});};for(const t of l2)e(document,t),e(window,t);}function f2(){for(const{type:e,handler:t,target:n}of Ge.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}Ge.listeners.length=0;}function h2(){const e=Object.getPrototypeOf(document);Ge.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),Ge.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),Ge.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function m2(){const e=Object.getPrototypeOf(document);try{Ge.savedProps.hidden&&Object.defineProperty(e,"hidden",Ge.savedProps.hidden);}catch{}try{Ge.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",Ge.savedProps.visibilityState);}catch{}try{Ge.savedProps.hasFocus&&(document.hasFocus=Ge.savedProps.hasFocus);}catch{}}function Is(){Ge.audioCtx&&Ge.audioCtx.state!=="running"&&Ge.audioCtx.resume?.().catch(()=>{});}function g2(){try{const e=window.AudioContext||window.webkitAudioContext;Ge.audioCtx=new e({latencyHint:"interactive"}),Ge.gainNode=Ge.audioCtx.createGain(),Ge.gainNode.gain.value=u2,Ge.oscillator=Ge.audioCtx.createOscillator(),Ge.oscillator.frequency.value=d2,Ge.oscillator.connect(Ge.gainNode).connect(Ge.audioCtx.destination),Ge.oscillator.start(),document.addEventListener("visibilitychange",Is,{capture:!0}),window.addEventListener("focus",Is,{capture:!0});}catch{ub();}}function ub(){try{Ge.oscillator?.stop();}catch{}try{Ge.oscillator?.disconnect(),Ge.gainNode?.disconnect();}catch{}try{Ge.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Is,{capture:true}),window.removeEventListener("focus",Is,{capture:true}),Ge.oscillator=null,Ge.gainNode=null,Ge.audioCtx=null;}function b2(){const e=document.querySelector("canvas")||document.body||document.documentElement;Ge.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},c2);}function v2(){Ge.heartbeatInterval!==null&&(clearInterval(Ge.heartbeatInterval),Ge.heartbeatInterval=null);}function cc(){h2(),p2(),g2(),b2();}function dc(){v2(),ub(),f2(),m2();}let Oa=false,an=false;function Jr(){return it(db,s2)}function uc(e){ct(db,e);}const fo={init(){if(Oa)return;const e=Jr();Oa=true,e.enabled?(cc(),an=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Oa},isRunning(){return an},isEnabled(){return Jr().enabled},enable(){const e=Jr();e.enabled=true,uc(e),an||(cc(),an=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=Jr();e.enabled=false,uc(e),an&&(dc(),an=false,console.log("[MGAntiAfk] Disabled"));},toggle(){fo.isEnabled()?fo.disable():fo.enable();},getConfig(){return Jr()},updateConfig(e){const n={...Jr(),...e};uc(n),n.enabled&&!an?(cc(),an=true):!n.enabled&&an&&(dc(),an=false);},destroy(){an&&(dc(),an=false),Oa=false,console.log("[MGAntiAfk] Destroyed");}};class y2{constructor(){we(this,"achievements",new Map);we(this,"data");we(this,"STORAGE_KEY",_t.ACHIEVEMENTS);we(this,"onUnlockCallbacks",[]);we(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return it(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){ct(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const l=o>=n.target;return !r&&l?this.unlock(t,i):l||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:l,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let ki=null;function yn(){return ki||(ki=new y2),ki}function x2(){ki&&(ki=null);}let Na=false;const w2={init(){Na||(yn(),Na=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Na},getManager(){return yn()},register:(...e)=>yn().register(...e),registerMany:(...e)=>yn().registerMany(...e),isUnlocked:(...e)=>yn().isUnlocked(...e),getAll:()=>yn().getAllAchievements(),getUnlocked:()=>yn().getUnlockedAchievements(),getStats:()=>yn().getCompletionStats(),checkAll:()=>yn().checkAllAchievements(),onUnlock:(...e)=>yn().onUnlock(...e),onProgress:(...e)=>yn().onProgress(...e),destroy(){x2(),Na=false;}};let Si=null;function pb(){const t=kt().get().plant;if(!t)return;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n&&Li(n.species,n.targetScale,n.mutations||[]);}function C2(e){pb();}function k2(){Si&&fb(),pb(),Si=kt().subscribePlantInfo(C2,{immediate:true});}function fb(){Si&&(Si(),Si=null);}function ul(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function hb(e,t){e.add(()=>t.disconnect());}const Ts="css-1cdcuw7",rd="css-v439q6";let ho=ul(),od=false,Qo=false,is=null,id=null,Lr=null;const S2=`
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
`;function A2(){if(od)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=S2,document.head.appendChild(e),ho.add(()=>e.remove()),od=true;}async function E2(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const r=document.createElement("canvas");r.width=20,r.height=20,n.appendChild(r);const o=document.createElement("div");o.className="gemini-qol-cropPrice-text",o.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(o);try{const i=await $e.toCanvas("ui","Coin");if(i&&r.parentElement){const a=r.getContext("2d");if(a){const l=Math.min(r.width/i.width,r.height/i.height),d=i.width*l,f=i.height*l,p=(r.width-d)/2,h=(r.height-f)/2;a.drawImage(i,p,h,d,f);}}}catch(i){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",i);}return t}function _2(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const r of n){const o=r.textContent?.trim();if(!o)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(o)&&t.push(o);}return t}function I2(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const r=n.textContent?.trim();if(!r)continue;const o=r.match(/^([\d.]+)\s*kg$/i);if(o)return parseFloat(o[1])}return 1}function T2(){const e=[],t=new Set,n=document.querySelectorAll(`p.${Ts}`);for(const o of n){const i=o.getBoundingClientRect();if(i.width===0&&i.height===0||o.closest("button.chakra-button"))continue;const a=o.closest(".McFlex");!a||t.has(a)||(t.add(a),e.push({element:a}));}const r=document.querySelectorAll(`.${rd}`);for(const o of r){const i=o.getBoundingClientRect();if(i.width===0&&i.height===0||o.closest("button.chakra-button"))continue;const a=o.querySelectorAll(":scope > .McFlex > .McFlex");if(a.length>0){const l=a[a.length-1];l.querySelector("p.chakra-text")&&!t.has(l)&&(t.add(l),e.push({element:l}));}}return e}function P2(e){const t=document.querySelectorAll(".gemini-qol-cropPrice");for(const n of t){const r=n.getBoundingClientRect();if(r.width===0&&r.height===0||n.closest("button.chakra-button"))continue;const o=n.querySelector(".gemini-qol-cropPrice-text");o&&(o.textContent=e>0?e.toLocaleString():"");}}function L2(){const t=kt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Li(n.species,n.targetScale,n.mutations||[]):0}function M2(){Lr!==null&&cancelAnimationFrame(Lr),Lr=requestAnimationFrame(()=>{Lr=null;const e=L2();e!==id&&(id=e,P2(e));});}async function Zo(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const n=kt().get().plant;let r=0;if(n&&n.currentSlotIndex!==null){const i=n.slots[n.currentSlotIndex];i&&(r=Li(i.species,i.targetScale,i.mutations||[]));}if(r===0){const l=[...(e.element.parentElement??e.element).querySelectorAll("p.chakra-text")].find(d=>!d.classList.contains(Ts));if(l){const d=l.textContent?.trim();if(d){const f=I2(e.element),p=_2(e.element);r=Li(d,f,p);}}}const o=await E2(r);e.element.appendChild(o),ho.add(()=>o.remove());}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function R2(){const e=T2();for(const n of e)Zo(n);is=kt().subscribePlantInfo(()=>{M2();});const t=new MutationObserver(n=>{for(const r of n)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.tagName==="P"&&o.classList.contains(Ts)&&!o.closest("button.chakra-button")){const l=o.closest(".McFlex");l&&Zo({element:l});}if(o.querySelectorAll(`p.${Ts}`).forEach(l=>{if(!l.closest("button.chakra-button")){const d=l.closest(".McFlex");d&&Zo({element:d});}}),o.classList.contains(rd)&&!o.closest("button.chakra-button")){const l=o.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const d=l[l.length-1];d.querySelector("p.chakra-text")&&!d.querySelector(".gemini-qol-cropPrice")&&Zo({element:d});}}o.querySelectorAll(`.${rd}`).forEach(l=>{if(!l.closest("button.chakra-button")){const d=l.querySelectorAll(":scope > .McFlex > .McFlex");if(d.length>0){const f=d[d.length-1];f.querySelector("p.chakra-text")&&!f.querySelector(".gemini-qol-cropPrice")&&Zo({element:f});}}});}});});t.observe(document.body,{childList:true,subtree:true}),hb(ho,t);}const F2={init(){Qo||(Qo=true,A2(),R2());},destroy(){Qo&&(Qo=false,Lr!==null&&(cancelAnimationFrame(Lr),Lr=null),is&&(is(),is=null),ho.run(),ho.clear(),ho=ul(),od=false,id=null);},isEnabled(){return Qo}},mb=_t.CROP_VALUE_INDICATOR,O2={enabled:false};function wu(){return it(mb,O2)}function N2(e){ct(mb,e);}let Di=false;function gb(){Di||!wu().enabled||(Di=true,k2());}function bb(){Di&&(fb(),Di=false);}function D2(){return Di}function $2(){return wu().enabled}function B2(e){const t=wu();t.enabled!==e&&(t.enabled=e,N2(t),e?gb():bb());}const as={init:gb,destroy:bb,isReady:D2,isEnabled:$2,setEnabled:B2,render:F2},$i="css-1cdcuw7",Cu='[role="tooltip"]';let ss=ul(),ei=false,ls=null,ad=null,Mr=null;function z2(){const t=kt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?iu(n.species,n.targetScale):0}function vb(e,t){const n=Oe.get("plants");if(!n)return "";const r=n[e];return r?.crop?.baseWeight?`${(r.crop.baseWeight*t).toFixed(2)} kg`:""}function Ps(){const e=document.querySelectorAll(Cu),n=kt().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=vb(r.species,r.targetScale);for(const i of e){const a=i.getBoundingClientRect();if(a.width===0&&a.height===0)continue;const l=i.textContent?.trim();l&&l.startsWith("Size:")&&o&&(i.textContent=o);}}function j2(e,t){const n=document.querySelectorAll(`p.${$i}`);for(const r of n){const o=r.getBoundingClientRect();if(o.width===0&&o.height===0||r.closest("button.chakra-button"))continue;const i=r.querySelector("svg");r.textContent=`${e}%`,i&&r.appendChild(i);}Ps();}function G2(){Mr!==null&&cancelAnimationFrame(Mr),Mr=requestAnimationFrame(()=>{Mr=null;const e=z2();if(e===ad)return;ad=e;const n=kt().get().plant;!n||!(n.currentSlotIndex!==null&&n.slots[n.currentSlotIndex])||j2(e);});}function pc(){const t=kt().get().plant;if(!t||t.currentSlotIndex===null)return;const n=t.slots[t.currentSlotIndex];if(!n)return;const r=iu(n.species,n.targetScale),o=document.querySelectorAll(`p.${$i}`);for(const i of o){const a=i.getBoundingClientRect();if(!(a.width===0&&a.height===0)&&!i.closest("button.chakra-button"))try{const l=i.querySelector("svg");i.textContent=`${r}%`,l&&i.appendChild(l);}catch(l){console.warn("[CropSizeIndicator.render] Failed to update size:",l);}}Ps();}function U2(){const t=kt().get().plant;if(!t||t.currentSlotIndex===null)return;const n=t.slots[t.currentSlotIndex];if(!n)return;const r=vb(n.species,n.targetScale),o=document.querySelectorAll(`p.${$i}`);for(const a of o){const l=a.getBoundingClientRect();if(l.width===0&&l.height===0||a.closest("button.chakra-button"))continue;const d=a.querySelector("svg");a.textContent=r,d&&a.appendChild(d);}const i=document.querySelectorAll(Cu);for(const a of i){const l=a.getBoundingClientRect();if(l.width===0&&l.height===0)continue;const d=a.textContent?.trim();d&&!d.includes("kg")&&(a.textContent=r);}}function W2(){pc(),ls=kt().subscribePlantInfo(()=>{G2();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.tagName==="P"&&r.classList.contains($i)&&(r.closest("button.chakra-button")||pc()),r.querySelectorAll(`p.${$i}`).length>0&&pc(),r.hasAttribute("role")&&r.getAttribute("role")==="tooltip"){const a=r.textContent?.trim();a&&a.startsWith("Size:")&&Ps();}r.querySelectorAll(Cu).forEach(a=>{const l=a.textContent?.trim();l&&l.startsWith("Size:")&&Ps();});}});});e.observe(document.body,{childList:true,subtree:true}),hb(ss,e);}const ku={init(){ei||(ei=true,W2());},destroy(){ei&&(ei=false,U2(),Mr!==null&&(cancelAnimationFrame(Mr),Mr=null),ls&&(ls(),ls=null),ss.run(),ss.clear(),ss=ul(),ad=null);},isEnabled(){return ei}},yb=_t.CROP_SIZE_INDICATOR,H2={enabled:false};function Su(){return it(yb,H2)}function V2(e){ct(yb,e);}let Bi=false;function xb(){if(Bi){console.log("[CropSizeIndicator] Already initialized");return}if(!Su().enabled){console.log("[CropSizeIndicator] Disabled");return}Bi=true,console.log("[CropSizeIndicator] Initializing..."),ku.init(),console.log("[CropSizeIndicator] Initialized successfully");}function wb(){Bi&&(console.log("[CropSizeIndicator] Destroying..."),ku.destroy(),Bi=false,console.log("[CropSizeIndicator] Destroyed"));}function K2(){return Bi}function Y2(){return Su().enabled}function q2(e){const t=Su();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,V2(t),e?xb():wb(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const cs={init:xb,destroy:wb,isReady:K2,isEnabled:Y2,setEnabled:q2,render:ku},X2={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},Cb=_t.ARIES_API;function Au(){return it(Cb,X2)}function J2(e){ct(Cb,e);}function Q2(e){const n={...Au(),...e};return J2(n),n}let Ls=null,Ms=null;function Of(e){Ls=e;}function Nf(e){Ms=e;}function Z2(){return Ls?[...Ls]:[]}function eT(){return Ms?[...Ms]:[]}function Df(){Ls=null,Ms=null;}function kb(e,t){const n=Au(),r=new URL(e,n.apiBaseUrl);if(t)for(const[o,i]of Object.entries(t))i!==void 0&&r.searchParams.set(o,String(i));return r.toString()}function pl(e,t){return new Promise(n=>{const r=kb(e,t);GM_xmlhttpRequest({method:"GET",url:r,headers:{},onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] GET parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] GET error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] GET request failed:",o),n({status:0,data:null});}});})}function fl(e,t){return new Promise(n=>{const r=kb(e);GM_xmlhttpRequest({method:"POST",url:r,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] POST parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] POST error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] POST request failed:",o),n({status:0,data:null});}});})}async function Eu(e=50){const{data:t}=await pl("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(r=>({name:r.name,avatarUrl:r.avatar_url??null})):void 0}))}async function tT(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Eu(o),l=[];for(const d of a){if(!d.userSlots||d.userSlots.length===0)continue;const f=d.userSlots.filter(p=>p.name?p.name.toLowerCase().includes(i):false);f.length>0&&l.push({room:d,matchedSlots:f});}return l}async function nT(e){if(!e)return null;const{status:t,data:n}=await pl("get-player-view",{playerId:e});return t===404?null:n}async function hl(e,t){const n=Array.from(new Set((e??[]).map(a=>String(a).trim()).filter(a=>a.length>=3)));if(n.length===0)return [];const r={playerIds:n};t?.sections&&(r.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:o,data:i}=await fl("get-players-view",r);return o!==200||!Array.isArray(i)?[]:i}async function rT(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Eu(o),l=new Map;for(const d of a)if(!(!d.userSlots||d.userSlots.length===0))for(const f of d.userSlots){if(!f.name||!f.name.toLowerCase().includes(i))continue;const h=`${d.id}::${f.name}`;l.has(h)||l.set(h,{playerName:f.name,avatarUrl:f.avatarUrl,roomId:d.id,roomPlayersCount:d.playersCount});}return Array.from(l.values())}async function Sb(e){if(!e)return [];const{status:t,data:n}=await pl("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function oT(e){const t=await Sb(e);if(t.length===0)return Of([]),[];const n=await hl(t,{sections:["profile","room"]});return Of(n),[...n]}async function _u(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await pl("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function iT(e){const{incoming:t}=await _u(e),n=t.map(o=>o.fromPlayerId);if(n.length===0)return Nf([]),[];const r=await hl(n,{sections:["profile"]});return Nf(r),[...r]}async function aT(e){const{outgoing:t}=await _u(e),n=t.map(r=>r.toPlayerId);return n.length===0?[]:hl(n,{sections:["profile"]})}async function sT(e,t){if(!e||!t||e===t)return  false;const{status:n}=await fl("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function lT(e){const{playerId:t,otherPlayerId:n,action:r}=e;if(!t||!n||t===n)return  false;const{status:o}=await fl("friend-respond",{playerId:t,otherPlayerId:n,action:r});return o===204}async function cT(e,t){if(!e||!t||e===t)return  false;const{status:n}=await fl("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let ti=false;const Rs={init(){ti||(ti=true,console.log("[AriesAPI] Initialized"));},destroy(){ti&&(ti=false,Df(),console.log("[AriesAPI] Destroyed"));},isReady(){return ti},getConfig(){return Au()},updateConfig(e){return Q2(e)},fetchRooms:Eu,searchRoomsByPlayerName:tT,fetchPlayerView:nT,fetchPlayersView:hl,searchPlayersByName:rT,fetchFriendsIds:Sb,fetchFriendsWithViews:oT,fetchFriendRequests:_u,fetchIncomingRequestsWithViews:iT,fetchOutgoingRequestsWithViews:aT,sendFriendRequest:sT,respondFriendRequest:lT,removeFriend:cT,getCachedFriends:Z2,getCachedIncomingRequests:eT,clearCache:Df},$f={enabled:true,manualLocks:[],overallRules:[],speciesRules:{}};function Fs(){return `rule-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function dT(e){const t={enabled:e.enabled,manualLocks:e.manualLocks||[],overallRules:[],speciesRules:{}},n=e.globalCriteria?.lockByScale?.enabled,r=(e.globalCriteria?.lockedMutations?.length??0)>0;if(n||r){const o={id:Fs(),name:"Migrated Global Rule",enabled:true,mode:"lock",sizeCondition:n?{enabled:true,minPercentage:e.globalCriteria.lockByScale.minPercentage}:void 0,mutationCondition:r?{enabled:true,mutations:e.globalCriteria.lockedMutations,matchMode:"any"}:void 0};t.overallRules.push(o);}if(e.speciesOverrides)for(const[o,i]of Object.entries(e.speciesOverrides)){const a=i.lockByScale?.enabled,l=(i.lockedMutations?.length??0)>0;if(a||l){const d={id:Fs(),name:`Migrated ${o} Rule`,enabled:true,mode:"lock",sizeCondition:a?{enabled:true,minPercentage:i.lockByScale.minPercentage}:void 0,mutationCondition:l?{enabled:true,mutations:i.lockedMutations,matchMode:"any"}:void 0};t.speciesRules[o]=[d];}}return console.log("[HarvestLocker] Migrated legacy config to new format"),t}function uT(e){const t=e;return t!==null&&typeof t=="object"&&"globalCriteria"in t&&!("overallRules"in t)}function bt(){const e=it(Bt.FEATURE.HARVEST_LOCKER,$f);if(uT(e)){const t=dT(e);return mn(t),t}return {...$f,...e,manualLocks:e.manualLocks||[],overallRules:e.overallRules||[],speciesRules:e.speciesRules||{}}}function mn(e){ct(Bt.FEATURE.HARVEST_LOCKER,e);}function Ab(e,t,n,r){return {id:Fs(),name:e,enabled:true,mode:t,sizeCondition:n,mutationCondition:r}}function pT(e){const t=bt();t.overallRules.push(e),mn(t);}function fT(e,t){const n=bt();n.speciesRules[e]||(n.speciesRules[e]=[]),n.speciesRules[e].push(t),mn(n);}function Eb(e,t){const n=bt(),r=n.overallRules.findIndex(o=>o.id===e);if(r!==-1){n.overallRules[r]={...n.overallRules[r],...t},mn(n);return}for(const o of Object.keys(n.speciesRules)){const i=n.speciesRules[o].findIndex(a=>a.id===e);if(i!==-1){n.speciesRules[o][i]={...n.speciesRules[o][i],...t},mn(n);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function hT(e){const t=bt(),n=t.overallRules.findIndex(r=>r.id===e);if(n!==-1){t.overallRules.splice(n,1),mn(t);return}for(const r of Object.keys(t.speciesRules)){const o=t.speciesRules[r].findIndex(i=>i.id===e);if(o!==-1){t.speciesRules[r].splice(o,1),t.speciesRules[r].length===0&&delete t.speciesRules[r],mn(t);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function mT(e,t){const n=bt(),r=n.overallRules.find(i=>i.id===e);if(!r){console.warn(`[HarvestLocker] Rule ${e} not found`);return}const o={...r,id:Fs(),name:`${r.name} (${t})`};n.speciesRules[t]||(n.speciesRules[t]=[]),n.speciesRules[t].push(o),mn(n);}const Dr=new Set;let Qn=null;const Os=[];function gT(e){if(Os.length>0){console.warn("[HarvestLocker] Already started");return}Qn=e;const t=Wr().subscribeStable(n=>{if(!n){Dr.clear();return}_b(n);});Os.push(t);}function bT(){Os.forEach(e=>e()),Os.length=0,Dr.clear(),Qn=null,console.log("[HarvestLocker] Stopped");}function gr(e){Qn=e;const t=Wr().get();t&&_b(t);}function Iu(e,t){const n=`${e}-${t}`;return Dr.has(n)}function vT(){return Array.from(Dr)}function _b(e){if(Qn){if(Dr.clear(),Qn.manualLocks.forEach(t=>Dr.add(t)),!kT(e)){console.warn("[HarvestLocker] Invalid garden structure"),window.dispatchEvent(new CustomEvent(gt.HARVEST_LOCKER_LOCKS_UPDATED));return}e.plants.all.forEach(t=>{t.slots.forEach((n,r)=>{const o=`${t.tileIndex}-${r}`,i=yT(n.species);xT(n,i)&&Dr.add(o);});}),window.dispatchEvent(new CustomEvent(gt.HARVEST_LOCKER_LOCKS_UPDATED));}}function yT(e){return Qn?Qn.speciesRules[e]?Qn.speciesRules[e].filter(t=>t.enabled):Qn.overallRules.filter(t=>t.enabled):[]}function xT(e,t){const n=t.filter(o=>o.mode==="lock"),r=t.filter(o=>o.mode==="allow");for(const o of n)if(Bf(e,o))return  true;return r.length>0&&!r.some(i=>Bf(e,i))}function Bf(e,t){const n=[];if(t.sizeCondition?.enabled){const r=CT(e),o=t.sizeCondition.sizeMode??"max";n.push(o==="max"?r>=t.sizeCondition.minPercentage:r<=t.sizeCondition.minPercentage);}if(t.mutationCondition?.enabled&&t.mutationCondition.mutations.length>0){const r=wT(e.mutations,t.mutationCondition.mutations,t.mutationCondition.matchMode);n.push(r);}return n.length>0&&n.every(r=>r)}function wT(e,t,n){const r=t.includes("none"),o=t.filter(a=>a!=="none"),i=r&&e.length===0;return n==="any"?i?true:o.some(a=>e.includes(a)):r&&e.length>0?false:o.length===0?i:o.every(a=>e.includes(a))}function CT(e){const n=Oe.get("plants")?.[e.species];if(!n||typeof n!="object"||!("crop"in n))return 0;const r=n.crop;if(typeof r!="object"||!r)return 0;const{baseTileScale:o,maxScale:i}=r,a=i-o;return a===0?100:(e.targetScale-o)/a*100}function kT(e){return typeof e=="object"&&e!==null&&"plants"in e&&typeof e.plants=="object"&&e.plants!==null&&"all"in e.plants&&Array.isArray(e.plants.all)}const Ns=new Set,Ds=new Set;let mo=null;function Ib(){mo||(mo=new MutationObserver(e=>{for(const t of e){for(const n of t.addedNodes)if(n instanceof Element)for(const r of Ns){n.matches(r.selector)&&r.callback(n);const o=n.querySelectorAll(r.selector);for(const i of o)r.callback(i);}for(const n of t.removedNodes)if(n instanceof Element)for(const r of Ds){n.matches(r.selector)&&r.callback(n);const o=n.querySelectorAll(r.selector);for(const i of o)r.callback(i);}}}),mo.observe(document.body,{childList:true,subtree:true}));}function Tb(){Ns.size===0&&Ds.size===0&&mo&&(mo.disconnect(),mo=null);}function Tu(e,t){Ib();const n={selector:e,callback:t};Ns.add(n);const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>{Ns.delete(n),Tb();}}}function Pu(e,t){Ib();const n={selector:e,callback:t};return Ds.add(n),{disconnect:()=>{Ds.delete(n),Tb();}}}const ST=`
/* Locked crop card: purple border + subtle glow (respects border-radius, no layout shift) */
.gemini-qol-harvestLocker-locked {
  position: relative !important;
  box-shadow: 0 0 0 2px #8B3E98, 0 0 8px rgba(139, 62, 152, 0.35) !important;
  transition: box-shadow 0.25s ease !important;
}

/* Lock icon badge: top-right corner */
#gemini-qol-harvestLocker-lock-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #652E91, #8B3E98);
  border: 1px solid rgba(174, 83, 176, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(139, 62, 152, 0.45);
  animation: gemini-harvestLocker-glow 2.5s ease-in-out infinite;
}

/* Pulse subtile sur le badge */
@keyframes gemini-harvestLocker-glow {
  0%, 100% { box-shadow: 0 2px 8px rgba(139, 62, 152, 0.45); }
  50%      { box-shadow: 0 2px 14px rgba(139, 62, 152, 0.75); }
}

/* Icone lock avec ombre pour la profondeur */
#gemini-qol-harvestLocker-lock-icon svg {
  width: 12px;
  height: 12px;
  color: #F5F5F5;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
}
`,zf="css-qnqsp4",Pb="gemini-qol-harvestLocker-locked",sd="gemini-qol-harvestLocker-lock-icon",ld="gemini-qol-harvestLocker-styles",AT='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Nn=null,ds=false;const cd=[];function Da(e){cd.push(e);}function ET(){for(const e of cd)try{e();}catch(t){console.warn("[HarvestLocker Inject] Cleanup error:",t);}cd.length=0;}function _T(){if(ds)return;if(document.getElementById(ld)){ds=true;return}const e=document.createElement("style");e.id=ld,e.textContent=ST,document.head.appendChild(e),ds=true;}function IT(){document.getElementById(ld)?.remove(),ds=false;}function TT(e){if(e.classList.add(Pb),!e.querySelector(`#${sd}`)){const t=document.createElement("div");t.id=sd,t.innerHTML=AT,e.appendChild(t);}}function $s(e){e.classList.remove(Pb),e.querySelector(`#${sd}`)?.remove();}function fc(){if(!Nn)return;const e=kt().get();if(!e.plant||e.position.localIndex===null||e.plant.nextHarvestSlotIndex===null){$s(Nn);return}const t=String(e.position.localIndex),n=e.plant.nextHarvestSlotIndex;Iu(t,n)?TT(Nn):$s(Nn);}function PT(){_T();const e=Tu(`.${zf}`,o=>{Nn=o,fc();});Da(()=>e.disconnect());const t=Pu(`.${zf}`,o=>{Nn===o&&($s(o),Nn=null);});Da(()=>t.disconnect());const n=kt().subscribePlantInfo(()=>{fc();});Da(n);const r=()=>fc();window.addEventListener(gt.HARVEST_LOCKER_LOCKS_UPDATED,r),Da(()=>window.removeEventListener(gt.HARVEST_LOCKER_LOCKS_UPDATED,r)),console.log("[HarvestLocker Inject] Started");}function LT(){Nn&&($s(Nn),Nn=null),ET(),IT(),console.log("[HarvestLocker Inject] Stopped");}let $a=false;const Lb={init(){$a||(PT(),$a=true);},destroy(){$a&&(LT(),$a=false);},isEnabled(){return bt().enabled}},Mb=[];function MT(){return Mb.slice()}function RT(e){Mb.push(e);}function Rb(e){try{return JSON.parse(e)}catch{return}}function jf(e){if(typeof e=="string"){const t=Rb(e);return t!==void 0?t:e}return e}function Fb(e){if(e!=null){if(typeof e=="string"){const t=Rb(e);return t!==void 0?Fb(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function FT(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Le(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,l)=>{if(Fb(a)!==e)return;const f=o(a,l);return f&&typeof f=="object"&&"kind"in f?f:typeof f=="boolean"?f?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return RT(i),i}const ni=new WeakSet,Gf=new WeakMap;function OT(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:MT();if(!r.length)return ()=>{};const o=g=>({ws:g,pageWindow:t,debug:n}),i=(g,y)=>{let b=g;for(const S of r){const _=S(b,o(y));if(_){if(_.kind==="drop")return {kind:"drop"};_.kind==="replace"&&(b=_.message);}}return b!==g?{kind:"replace",message:b}:void 0};let a=null,l=null,d=null;const f=()=>{const g=t?.MagicCircle_RoomConnection,y=g?.sendMessage;if(!g||typeof y!="function")return  false;if(ni.has(y))return  true;const b=y.bind(g);function S(..._){const I=_.length===1?_[0]:_,T=jf(I),L=i(T,FT(t));if(L?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",T);return}if(L?.kind==="replace"){const F=L.message;return _.length>1&&Array.isArray(F)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",T,"=>",F),b(...F)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",T,"=>",F),b(F))}return b(..._)}ni.add(S),Gf.set(S,y);try{g.sendMessage=S,ni.add(g.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{g.sendMessage===S&&(g.sendMessage=y);}catch{}},true};(()=>{const g=t?.WebSocket?.prototype,y=g?.send;if(typeof y!="function"||ni.has(y))return;function b(S){const _=jf(S),I=i(_,this);if(I?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",_);return}if(I?.kind==="replace"){const T=I.message,L=typeof T=="string"||T instanceof ArrayBuffer||T instanceof Blob?T:JSON.stringify(T);return n&&console.log("[WS] replace outgoing (ws.send)",_,"=>",T),y.call(this,L)}return y.call(this,S)}ni.add(b),Gf.set(b,y);try{g.send=b,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}l=()=>{try{g.send===b&&(g.send=y);}catch{}};})();const h=e.waitForRoomConnectionMs??4e3;if(!f()&&h>0){const g=Date.now();d=setInterval(()=>{if(f()){clearInterval(d),d=null;return}Date.now()-g>h&&(clearInterval(d),d=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(d){try{clearInterval(d);}catch{}d=null;}if(a){try{a();}catch{}a=null;}if(l){try{l();}catch{}l=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Le(me.HarvestCrop,(e,t)=>{if(!bt().enabled)return  true;const r=e,o=r.slot!==void 0?String(r.slot):void 0,i=r.slotsIndex;return o!==void 0&&typeof i=="number"&&Iu(o,i)?(console.log(`[HarvestLocker] Blocked harvest for slot ${o}-${i}`),false):true});let Eo=false;function Ob(){if(Eo){console.warn("[HarvestLocker] Already initialized");return}const e=bt();if(!e.enabled){console.log("[HarvestLocker] Disabled");return}Eo=true,gT(e),Lb.init(),console.log("[HarvestLocker] Initialized");}function Nb(){Eo&&(Lb.destroy(),bT(),Eo=false,console.log("[HarvestLocker] Destroyed"));}function NT(){return bt().enabled}function DT(e){const t=bt();t.enabled=e,mn(t),e&&!Eo?Ob():!e&&Eo&&Nb();}function $T(e,t){return Iu(e,t)}function BT(){return vT()}function zT(e,t){const n=bt(),r=`${e}-${t}`;n.manualLocks.includes(r)||(n.manualLocks.push(r),mn(n),gr(n));}function jT(e,t){const n=bt(),r=`${e}-${t}`;n.manualLocks=n.manualLocks.filter(o=>o!==r),mn(n),gr(n);}function GT(){const e=bt();e.manualLocks=[],mn(e),gr(e);}function UT(){return bt()}function WT(){return bt().overallRules}function HT(e){return bt().speciesRules[e]||[]}function VT(){const e=bt();return Object.keys(e.speciesRules)}function KT(e,t,n,r){const o=Ab(e,t,n,r);return pT(o),gr(bt()),o}function YT(e,t,n,r,o){const i=Ab(t,n,r,o);return fT(e,i),gr(bt()),i}function qT(e,t){Eb(e,t),gr(bt());}function XT(e){hT(e),gr(bt());}function JT(e,t){Eb(e,{enabled:t}),gr(bt());}const jt={init:Ob,destroy:Nb,isEnabled:NT,setEnabled:DT,isLocked:$T,getAllLockedSlots:BT,lockSlot:zT,unlockSlot:jT,clearManualLocks:GT,getOverallRules:WT,getSpeciesRules:HT,getAllSpeciesWithRules:VT,addNewOverallRule:KT,addNewSpeciesRule:YT,modifyRule:qT,removeRule:XT,toggleRule:JT,cloneRuleToSpecies:mT,getConfig:UT},Uf={enabled:true,blockedEggs:[]};function rr(){const e=it(Bt.FEATURE.EGG_LOCKER,Uf);return {...Uf,...e,blockedEggs:e.blockedEggs||[]}}function ml(e){ct(Bt.FEATURE.EGG_LOCKER,e);}function QT(e){const t=rr();t.blockedEggs.includes(e)||(t.blockedEggs.push(e),ml(t),window.dispatchEvent(new CustomEvent(gt.EGG_LOCKER_LOCKS_UPDATED)));}function ZT(e){const t=rr();t.blockedEggs=t.blockedEggs.filter(n=>n!==e),ml(t),window.dispatchEvent(new CustomEvent(gt.EGG_LOCKER_LOCKS_UPDATED));}const eP=`
/* Locked egg card: purple border + subtle glow (respects border-radius, no layout shift) */
.gemini-qol-eggLocker-locked {
  position: relative !important;
  box-shadow: 0 0 0 2px #8B3E98, 0 0 8px rgba(139, 62, 152, 0.35) !important;
  transition: box-shadow 0.25s ease !important;
}

/* Lock icon badge: top-right corner */
#gemini-qol-eggLocker-lock-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #652E91, #8B3E98);
  border: 1px solid rgba(174, 83, 176, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(139, 62, 152, 0.45);
  animation: gemini-eggLocker-glow 2.5s ease-in-out infinite;
}

/* Pulse subtle sur le badge */
@keyframes gemini-eggLocker-glow {
  0%, 100% { box-shadow: 0 2px 8px rgba(139, 62, 152, 0.45); }
  50%      { box-shadow: 0 2px 14px rgba(139, 62, 152, 0.75); }
}

/* Icone lock avec ombre pour la profondeur */
#gemini-qol-eggLocker-lock-icon svg {
  width: 12px;
  height: 12px;
  color: #F5F5F5;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
}
`,Wf="css-qnqsp4",Db="gemini-qol-eggLocker-locked",dd="gemini-qol-eggLocker-lock-icon",ud="gemini-qol-eggLocker-styles",tP='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Dn=null,us=false;const pd=[];function Ba(e){pd.push(e);}function nP(){for(const e of pd)try{e();}catch(t){console.warn("[EggLocker Inject] Cleanup error:",t);}pd.length=0;}function rP(){if(us)return;if(document.getElementById(ud)){us=true;return}const e=document.createElement("style");e.id=ud,e.textContent=eP,document.head.appendChild(e),us=true;}function oP(){document.getElementById(ud)?.remove(),us=false;}function iP(e){if(e.classList.add(Db),!e.querySelector(`#${dd}`)){const t=document.createElement("div");t.id=dd,t.innerHTML=tP,e.appendChild(t);}}function Bs(e){e.classList.remove(Db),e.querySelector(`#${dd}`)?.remove();}function hc(){if(!Dn)return;const e=kt().get();if(e.object.type!=="egg"||!e.object.data){Bs(Dn);return}const t=e.object.data;lr.getBlockedEggs().includes(t.eggId)?iP(Dn):Bs(Dn);}function aP(){rP();const e=Tu(`.${Wf}`,o=>{Dn=o,hc();});Ba(()=>e.disconnect());const t=Pu(`.${Wf}`,o=>{Dn===o&&(Bs(o),Dn=null);});Ba(()=>t.disconnect());const n=kt().subscribeObject(()=>{hc();});Ba(n);const r=()=>hc();window.addEventListener(gt.EGG_LOCKER_LOCKS_UPDATED,r),Ba(()=>window.removeEventListener(gt.EGG_LOCKER_LOCKS_UPDATED,r)),console.log("[EggLocker Inject] Started");}function sP(){Dn&&(Bs(Dn),Dn=null),nP(),oP(),console.log("[EggLocker Inject] Stopped");}let za=false;const $b={init(){za||(aP(),za=true);},destroy(){za&&(sP(),za=false);},isEnabled(){return rr().enabled}};Le(me.HatchEgg,()=>{const e=rr();if(!e.enabled)return  true;const t=kt().get();if(t.object.type!=="egg"||!t.object.data)return  true;const n=t.object.data.eggId;return e.blockedEggs.includes(n)?(console.log(`[EggLocker] Blocked hatch for ${n}`),false):(console.log(`[EggLocker] Allowed hatch for ${n}`),true)});let _o=false;function Bb(){if(_o)return;if(!rr().enabled){console.log("[EggLocker] Disabled");return}_o=true,$b.init(),console.log("[EggLocker] Initialized");}function zb(){_o&&($b.destroy(),_o=false,console.log("[EggLocker] Destroyed"));}function lP(){return rr().enabled}function cP(e){const t=rr();t.enabled=e,ml(t),e&&!_o?Bb():!e&&_o&&zb();}function dP(){const e=Oe.get("eggs");return e?Object.keys(e):[]}function uP(){return rr().blockedEggs}function pP(e){QT(e);}function fP(e){ZT(e);}function hP(){const e=rr();e.blockedEggs=[],ml(e);}const lr={init:Bb,destroy:zb,isEnabled:lP,setEnabled:cP,getAvailableEggs:dP,getBlockedEggs:uP,blockEgg:pP,unblockEgg:fP,clearBlocks:hP},Hf={enabled:true,blockedDecors:[]};function Sn(){const e=it(Bt.FEATURE.DECOR_LOCKER,Hf);return {...Hf,...e,blockedDecors:e.blockedDecors||[]}}function Ji(e){ct(Bt.FEATURE.DECOR_LOCKER,e);}function mP(e){const t=Sn();t.blockedDecors.includes(e)||(t.blockedDecors.push(e),Ji(t),window.dispatchEvent(new CustomEvent(gt.DECOR_LOCKER_LOCKS_UPDATED)));}function gP(e){const t=Sn();t.blockedDecors=t.blockedDecors.filter(n=>n!==e),Ji(t),window.dispatchEvent(new CustomEvent(gt.DECOR_LOCKER_LOCKS_UPDATED));}const bP=`
/* Locked decor card: purple border + subtle glow (respects border-radius, no layout shift) */
.gemini-qol-decorLocker-locked {
  position: relative !important;
  box-shadow: 0 0 0 2px #8B3E98, 0 0 8px rgba(139, 62, 152, 0.35) !important;
  transition: box-shadow 0.25s ease !important;
}

/* Lock icon badge: top-right corner */
#gemini-qol-decorLocker-lock-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #652E91, #8B3E98);
  border: 1px solid rgba(174, 83, 176, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(139, 62, 152, 0.45);
  animation: gemini-decorLocker-glow 2.5s ease-in-out infinite;
}

/* Pulse subtle sur le badge */
@keyframes gemini-decorLocker-glow {
  0%, 100% { box-shadow: 0 2px 8px rgba(139, 62, 152, 0.45); }
  50%      { box-shadow: 0 2px 14px rgba(139, 62, 152, 0.75); }
}

/* Icone lock avec ombre pour la profondeur */
#gemini-qol-decorLocker-lock-icon svg {
  width: 12px;
  height: 12px;
  color: #F5F5F5;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
}
`,Vf="css-qnqsp4",jb="gemini-qol-decorLocker-locked",fd="gemini-qol-decorLocker-lock-icon",hd="gemini-qol-decorLocker-styles",vP='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let $n=null,ps=false;const md=[];function ja(e){md.push(e);}function yP(){for(const e of md)try{e();}catch(t){console.warn("[DecorLocker Inject] Cleanup error:",t);}md.length=0;}function xP(){if(ps)return;if(document.getElementById(hd)){ps=true;return}const e=document.createElement("style");e.id=hd,e.textContent=bP,document.head.appendChild(e),ps=true;}function wP(){document.getElementById(hd)?.remove(),ps=false;}function CP(e){if(e.classList.add(jb),!e.querySelector(`#${fd}`)){const t=document.createElement("div");t.id=fd,t.innerHTML=vP,e.appendChild(t);}}function zs(e){e.classList.remove(jb),e.querySelector(`#${fd}`)?.remove();}function mc(){if(!$n)return;const e=kt().get();if(e.object.type!=="decor"||!e.object.data){zs($n);return}const t=e.object.data;cr.isDecorBlocked(t.decorId)?CP($n):zs($n);}function kP(){xP();const e=Tu(`.${Vf}`,o=>{$n=o,mc();});ja(()=>e.disconnect());const t=Pu(`.${Vf}`,o=>{$n===o&&(zs(o),$n=null);});ja(()=>t.disconnect());const n=kt().subscribeObject(()=>{mc();});ja(n);const r=()=>mc();window.addEventListener(gt.DECOR_LOCKER_LOCKS_UPDATED,r),ja(()=>window.removeEventListener(gt.DECOR_LOCKER_LOCKS_UPDATED,r)),console.log("[DecorLocker Inject] Started");}function SP(){$n&&(zs($n),$n=null),yP(),wP(),console.log("[DecorLocker Inject] Stopped");}let Ga=false;const Gb={init(){Ga||(kP(),Ga=true);},destroy(){Ga&&(SP(),Ga=false);},isEnabled(){return Sn().enabled}};Le(me.PickupDecor,()=>{const e=Sn();if(!e.enabled)return  true;const t=kt().get();if(!t.object||t.object.type!=="decor"||!t.object.data)return  true;const n=t.object.data.decorId;return e.blockedDecors.includes(n)?(console.log(`[DecorLocker] Blocked pickup for ${n}`),false):(console.log(`[DecorLocker] Allowed pickup for ${n}`),true)});let Io=false;function Ub(){if(Io)return;if(!Sn().enabled){console.log("[DecorLocker] Disabled");return}Io=true,Gb.init(),console.log("[DecorLocker] Initialized");}function Wb(){Io&&(Gb.destroy(),Io=false,console.log("[DecorLocker] Destroyed"));}function AP(){return Sn().enabled}function EP(e){const t=Sn();t.enabled=e,Ji(t),e&&!Io?Ub():!e&&Io&&Wb();}function Hb(){const e=Oe.get("decor");return e?Object.keys(e):[]}function _P(){return Sn().blockedDecors}function IP(e){return Sn().blockedDecors.includes(e)}function TP(e){mP(e);}function PP(e){gP(e);}function LP(){const e=Hb(),t=Sn();t.blockedDecors=e,Ji(t),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function Vb(){const e=Sn();e.blockedDecors=[],Ji(e),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function MP(){Vb();}const cr={init:Ub,destroy:Wb,isEnabled:AP,setEnabled:EP,getAvailableDecors:Hb,getBlockedDecors:_P,isDecorBlocked:IP,blockDecor:TP,unblockDecor:PP,blockAllDecors:LP,unblockAllDecors:Vb,clearBlocks:MP};class Kb{constructor(){we(this,"stats");we(this,"STORAGE_KEY",_t.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return it(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){ct(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let go=null;function RP(){return go||(go=new Kb),go}function FP(){go&&(go.endSession(),go=null);}function Yb(e){const t=Zs(e.xp),n=el(e.petSpecies,e.targetScale),r=tl(e.petSpecies,e.xp,n),o=nl(e.petSpecies,t),i=Qm(e.petSpecies),a=K1(r,n,i),l=Y1(r,n);return {current:r,max:n,progress:l,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function qb(e){return {...e,strength:Yb(e)}}function Xb(e){return e.map(qb)}function OP(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Xb(e),n=t.reduce((d,f)=>d+f.strength.current,0),r=t.reduce((d,f)=>d+f.strength.max,0),o=t.filter(d=>d.strength.isMature).length,i=t.length-o,a=t.reduce((d,f)=>f.strength.max>(d?.strength.max||0)?f:d,t[0]),l=t.reduce((d,f)=>f.strength.max<(d?.strength.max||1/0)?f:d,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:l}}const NP=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Yb,enrichPetWithStrength:qb,enrichPetsWithStrength:Xb,getPetStrengthStats:OP},Symbol.toStringTag,{value:"Module"}));class Jb{constructor(){we(this,"logs",[]);we(this,"maxLogs",1e3);we(this,"unsubscribe",null);we(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=zt.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const l=i.get(a.abilityId);l.count++,(!l.lastProc||a.timestamp>l.lastProc)&&(l.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Rr=null;function DP(){return Rr||(Rr=new Jb,Rr.init()),Rr}function $P(){Rr&&(Rr.destroy(),Rr=null);}const BP={StatsTracker:Kb,getStatsTracker:RP,destroyStatsTracker:FP},zP={AbilityLogger:Jb,getAbilityLogger:DP,destroyAbilityLogger:$P,...NP},Qb={Store:{select:Je.select.bind(Je),set:Je.set.bind(Je),subscribe:Je.subscribe.bind(Je),subscribeImmediate:Je.subscribeImmediate.bind(Je)},Globals:zt,Modules:{Version:_d,Assets:Po,Manifest:vo,Data:Oe,Environment:Ct,CustomModal:ao,Sprite:$e,Tile:fn,Pixi:xo,RiveLoader:wo,Audio:wt,Cosmetic:ou,Calculators:ag,ShopActions:Pr},Features:{Achievements:w2,Tracker:BP,AntiAfk:fo,Pets:zP,PetTeam:ft,XPTracker:ed,CropValueIndicator:as,CropSizeIndicator:cs,ShopNotifier:zr,WeatherNotifier:Ao,PetHungerNotifier:Ni,AriesAPI:Rs,HarvestLocker:jt,EggLocker:lr,DecorLocker:cr},WebSocket:{chat:DS,emote:$S,wish:BS,kickPlayer:zS,setPlayerData:Qs,usurpHost:jS,reportSpeakingStart:GS,setSelectedGame:US,voteForGame:WS,restartGame:HS,ping:VS,checkWeatherStatus:qS,move:KS,playerPosition:zm,teleport:YS,moveInventoryItem:XS,dropObject:JS,pickupObject:QS,toggleLockItem:jm,toggleFavoriteItem:ZS,setSelectedItem:e1,putItemInStorage:Jd,retrieveItemFromStorage:Qd,moveStorageItem:t1,logItems:n1,plantSeed:r1,waterPlant:o1,harvestCrop:i1,sellAllCrops:a1,purchaseDecor:Zd,purchaseEgg:eu,purchaseTool:tu,purchaseSeed:nu,growEgg:Gm,plantEgg:s1,hatchEgg:l1,plantGardenPlant:c1,potPlant:d1,mutationPotion:u1,cropCleanser:p1,pickupDecor:f1,placeDecor:h1,removeGardenObject:m1,placePet:Um,feedPet:g1,petPositions:b1,swapPet:Wm,swapPetFromStorage:v1,pickupPet:Hm,movePetSlot:y1,namePet:x1,sellPet:w1,throwSnowball:C1,checkFriendBonus:k1},_internal:{getGlobals:Xn,initGlobals:ug,destroyGlobals:oE}};function jP(){const e=he;e.Gemini=Qb,e.MGSprite=$e,e.MGData=Oe,e.MGPixi=xo,e.MGRiveLoader=wo,e.MGAssets=Po,e.MGEnvironment=Ct;}function GP(){const e=x("div",{className:"atom-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=x("div",{style:"flex-shrink: 0; padding-bottom: 8px;"}),n=pr({placeholder:"Search data keys...",value:"",onChange:l=>a(l)});t.appendChild(n.root),e.appendChild(t);const r=x("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px; padding-bottom: 20px;"});e.appendChild(r);const o={MGData:["plants","pets","mutations","items","decor","eggs","abilities","weather"],Globals:["currentTile","myInventory","myPets","myGarden","players","shops","weather","gameMap"],Atoms:["positionAtom","myCoinsCountAtom","myInventoryAtom","myPrimitivePetSlotsAtom","weatherAtom","currentGardenPlayer","numPlayersAtom","avgPingAtom"]},i=[],a=(l="")=>{r.innerHTML="",i.forEach(p=>p()),i.length=0;const d=l.toLowerCase(),f=(p,h,g,y)=>{const b=`${p} - ${h}`;if(l&&!b.toLowerCase().includes(d))return;let S=null;const _=x("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});_.textContent="Expand to load data...";const I=lt({title:b,expandable:true,defaultExpanded:!!l,padding:"sm",onExpandChange:T=>{if(T)if(_.textContent="Loading...",y)S=y(L=>{_.textContent=JSON.stringify(L,null,2);});else try{const L=g();_.textContent=JSON.stringify(L,null,2);}catch(L){_.textContent=`Error: ${L}`;}else S&&(S(),S=null),_.textContent="Paused (Collapsed)";}});I.appendChild(_),r.appendChild(I),l&&setTimeout(()=>{y?S=y(T=>{_.textContent=JSON.stringify(T,null,2);}):_.textContent=JSON.stringify(g(),null,2);},0);};o.MGData.forEach(p=>{f(p,"Game Data (MGData)",()=>Oe.get(p));}),o.Globals.forEach(p=>{const h=zt[p];h&&f(p,"Reactive Global",()=>h.get(),g=>h.subscribe?.(g)||(()=>{}));}),o.Atoms.forEach(p=>{f(p,"Jotai Atom",()=>null,h=>{let g=false,y=null;return Qb.Store.subscribeImmediate(p,b=>{g||h(b);}).then(b=>{g?b():y=b;}),()=>{g=true,y?.();}});}),r.children.length===0&&(r.innerHTML='<div style="text-align:center; padding: 40px; opacity: 0.5;">No matches found for "'+l+'"</div>');};return a(),e.destroy=()=>{i.forEach(l=>l());},e}function UP(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:i=n,onInput:a,onChange:l,disabled:d=false}=e,f=x("input",{id:t,type:"range",className:"gemini-range",min:String(n),max:String(r),step:String(o)});f.value=String(i),f.disabled=d,a&&f.addEventListener("input",h=>a(Number(f.value),h)),l&&f.addEventListener("change",h=>l(Number(f.value),h));const p=f;return p.setValue=h=>{f.value=String(h);},p.getValue=()=>Number(f.value),p.setDisabled=h=>{f.disabled=h;},p}function WP(e={}){const{margin:t,color:n,variant:r="default"}=e,o=x("div",{className:"gemini-divider"});return r!=="default"&&o.classList.add(`gemini-divider--${r}`),t&&(o.style.margin=t),n&&(o.style.background=n),o}function HP(e){const{label:t,description:n,value:r,id:o}=e,i=x("div",{className:"gemini-stat-row",id:o}),a=x("div",{className:"gemini-stat-row__left"}),l=x("span",{className:"gemini-stat-row__label"},t);a.appendChild(l);let d=null;n&&(d=x("span",{className:"gemini-stat-row__desc"},n),a.appendChild(d));const f=typeof r=="number"?r.toLocaleString():r,p=x("span",{className:"gemini-stat-row__value"},f);i.appendChild(a),i.appendChild(p);const h=i;return h.setValue=g=>{p.textContent=typeof g=="number"?g.toLocaleString():g;},h.setLabel=g=>{l.textContent=g;},h.setDescription=g=>{g?d?d.textContent=g:(d=x("span",{className:"gemini-stat-row__desc"},g),a.appendChild(d)):d&&(d.remove(),d=null);},h}const VP=[{id:"badge-success",type:"Badge",label:"Success Badge",config:{label:"SUCCESS",type:"success"}},{id:"badge-warning",type:"Badge",label:"Warning Badge",config:{label:"WARNING",type:"warning"}},{id:"badge-danger",type:"Badge",label:"Danger Badge",config:{label:"DANGER",type:"danger"}},{id:"badge-info",type:"Badge",label:"Info Badge",config:{label:"INFO",type:"info"}},{id:"badge-primary",type:"Badge",label:"Primary Badge",config:{label:"NEW",type:"primary"}},{id:"button-primary",type:"Button",label:"Primary Button",config:{label:"Action",variant:"primary",size:"sm"}},{id:"button-danger",type:"Button",label:"Danger Button",config:{label:"Delete",variant:"danger",size:"sm"}},{id:"button-default",type:"Button",label:"Default Button",config:{label:"Cancel",variant:"default",size:"sm"}},{id:"switch-default",type:"Switch",label:"Toggle Switch",config:{label:"Enabled",checked:false}},{id:"input-text",type:"Input",label:"Text Input",config:{placeholder:"Enter text...",value:""}},{id:"input-number",type:"Input",label:"Number Input",config:{placeholder:"0",mode:"digits"}},{id:"select-basic",type:"Select",label:"Dropdown",config:{options:[{value:"a",label:"Option A"},{value:"b",label:"Option B"}],value:"a"}},{id:"slider-basic",type:"Slider",label:"Slider",config:{min:0,max:100,value:50}},{id:"range-basic",type:"Range",label:"Range Slider",config:{label:"Range",min:0,max:100,value:50}},{id:"label-default",type:"Label",label:"Label",config:{text:"Label Text",size:"md"}},{id:"divider-default",type:"Divider",label:"Divider",config:{}},{id:"statrow-basic",type:"StatRow",label:"Stat Row",config:{label:"Coins",value:"1,234"}},{id:"card-nested",type:"Card",label:"Nested Card",config:{title:"Nested",padding:"sm",variant:"soft"}},{id:"sprite-generic",type:"Sprite",label:"Sprite",config:{category:null,assetId:null}}];async function gd(e){try{switch(e.type){case "Badge":return rl(e.config).root;case "Button":return st(e.config);case "Switch":return tr(e.config).root;case "Input":return pr(e.config).root;case "Select":return Bn(e.config).root;case "Slider":return sl(e.config).root;case "Range":{const t=UP(e.config);return t.root??t}case "Label":{const t=xd(e.config);return t.root??t}case "Divider":{const t=WP(e.config);return t.root??t}case "StatRow":{const t=HP(e.config);return t.root??t}case "Card":{const t=lt(e.config);return t.appendChild(x("div",{textContent:"Nested content",style:"font-size: 11px; opacity: 0.7;"})),t}case "Sprite":{if(e.config.category&&e.config.assetId&&$e.isReady())try{const t=await $e.toCanvas(e.config.category,e.config.assetId,{mutations:e.config.mutations||[],scale:1.5});return t.style.imageRendering="pixelated",t}catch{}return x("div",{textContent:"🌱",style:"font-size: 24px; opacity: 0.5; display: flex; align-items: center; justify-content: center;"})}default:return null}}catch(t){return console.warn("[Gemini] ComponentPalette: Failed to create",e.type,t),x("div",{textContent:"Error",style:"color: var(--color-danger);"})}}function KP(e={}){const t=x("div",{className:"component-palette",style:"display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px;"});return VP.forEach(n=>{const r=x("div",{style:`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 8px;
                background: rgba(255,255,255,0.03);
                border-radius: 8px;
                cursor: grab;
                transition: background 0.2s, transform 0.1s;
                text-align: center;
                min-height: 60px;
                justify-content: center;
            `});r.setAttribute("draggable","true"),r.onmouseenter=()=>{r.style.background="rgba(255,255,255,0.08)";},r.onmouseleave=()=>{r.style.background="rgba(255,255,255,0.03)";},r.ondragstart=i=>{i.dataTransfer&&(i.dataTransfer.setData("application/json",JSON.stringify(n)),i.dataTransfer.effectAllowed="copy"),r.style.opacity="0.5",e.onDragStart?.(n,i);},r.ondragend=()=>{r.style.opacity="1";},r.onclick=()=>{e.onItemClick?.(n);},gd({...n,config:{...n.config}}).then(i=>{i&&(i.style.pointerEvents="none",i.style.transform="scale(0.85)",i.style.maxWidth="100%",i.style.maxHeight="40px",i.style.overflow="hidden",r.appendChild(i));});const o=x("small",{textContent:n.label,style:"font-size: 9px; opacity: 0.6; line-height: 1.2;"});r.appendChild(o),t.appendChild(r);}),t}function YP(e={}){const{width:t=400,height:n=300,gridSize:r=8,showGrid:o=true}=e;let i=r;const a=new Map;let l=1;const d=x("div",{className:"positioning-canvas-container",style:"display: flex; flex-direction: column; gap: 8px;"}),f=x("div",{style:"display: flex; gap: 8px; align-items: center; font-size: 11px;"});let p=false;const h=x("span",{textContent:`Grid: ${i}px`,style:"opacity: 0.6;"}),g=st({label:o?"Grid On":"Grid Off",size:"sm",variant:"default",onClick:()=>{_.style.backgroundImage=_.style.backgroundImage?"":S(),g.textContent=_.style.backgroundImage?"Grid On":"Grid Off";}}),y=st({label:"Preview",size:"sm",variant:"default",onClick:()=>{p=!p,y.textContent=p?"Edit Mode":"Preview",y.style.background=p?"var(--color-primary)":"",y.style.color=p?"#000":"",a.forEach(D=>{const Z=D.element,W=Z.querySelector("div:first-child"),te=Z.querySelector('[style*="se-resize"]'),re=Z.querySelector("div:has(select)");W&&(W.style.display=p?"none":"flex"),te&&(te.style.display=p?"none":"block"),re&&(re.style.display=p?"none":"flex"),Z.style.pointerEvents=p?"none":"auto",Z.style.border=p?"none":"1px solid rgba(255,255,255,0.15)",Z.style.background=p?"transparent":"rgba(255,255,255,0.08)";}),_.style.border=p?"none":"2px dashed rgba(255,255,255,0.15)";}}),b=st({label:"Clear All",size:"sm",variant:"danger",onClick:()=>K.clear()});f.appendChild(h),f.appendChild(g),f.appendChild(y),f.appendChild(b),d.appendChild(f);const S=()=>i<=0?"":`repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${i-1}px,
            rgba(255,255,255,0.05) ${i-1}px,
            rgba(255,255,255,0.05) ${i}px
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent ${i-1}px,
            rgba(255,255,255,0.05) ${i-1}px,
            rgba(255,255,255,0.05) ${i}px
        )`,_=x("div",{className:"positioning-canvas",style:`
            position: relative;
            width: ${t}px;
            height: ${n}px;
            min-height: ${n}px;
            background: rgba(0,0,0,0.3);
            border: 2px dashed rgba(255,255,255,0.15);
            border-radius: 8px;
            overflow: hidden;
            ${o?`background-image: ${S()};`:""}
        `}),I=x("div",{textContent:"Drop components here",style:`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            opacity: 0.3;
            pointer-events: none;
            transition: opacity 0.2s;
        `});_.appendChild(I);let T=null,L=null;const F=D=>i<=0?D:Math.round(D/i)*i,$=(D,Z,W)=>Math.max(Z,Math.min(W,D)),R=(D,Z)=>{const W=_.getBoundingClientRect(),te={x:Z.clientX-W.left,y:Z.clientY-W.top};T={item:D,startX:Z.clientX,startY:Z.clientY,offsetX:te.x-D.position.x,offsetY:te.y-D.position.y},D.element.style.cursor="grabbing",D.element.style.zIndex=String(++l),D.zIndex=l,document.addEventListener("pointermove",N),document.addEventListener("pointerup",M);},N=D=>{if(!T)return;const Z=_.getBoundingClientRect();let W=D.clientX-Z.left-T.offsetX,te=D.clientY-Z.top-T.offsetY;W=F($(W,0,t-T.item.size.width)),te=F($(te,0,n-T.item.size.height)),T.item.position={x:W,y:te},T.item.element.style.left=`${W}px`,T.item.element.style.top=`${te}px`;},M=()=>{T&&(T.item.element.style.cursor="",e.onItemMove?.(T.item.id,T.item.position)),T=null,document.removeEventListener("pointermove",N),document.removeEventListener("pointerup",M);},C=(D,Z,W)=>{W.stopPropagation(),L={item:D,startX:W.clientX,startY:W.clientY,startW:D.size.width,startH:D.size.height,corner:Z},document.addEventListener("pointermove",E),document.addEventListener("pointerup",B);},E=D=>{if(!L)return;const Z=D.clientX-L.startX,W=D.clientY-L.startY;let te=L.startW,re=L.startH;L.corner.includes("e")&&(te=F(Math.max(40,L.startW+Z))),L.corner.includes("s")&&(re=F(Math.max(24,L.startH+W))),L.item.size={width:te,height:re},L.item.element.style.width=`${te}px`,L.item.element.style.height=`${re}px`;},B=()=>{L&&e.onItemResize?.(L.item.id,L.item.size),L=null,document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",B);},G=D=>{const Z=D.type==="Sprite",W=x("div",{className:"positioned-item",style:`
                position: absolute;
                left: ${D.position.x}px;
                top: ${D.position.y}px;
                width: ${D.size.width}px;
                height: ${D.size.height}px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 6px;
                cursor: grab;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                z-index: ${D.zIndex};
            `}),te=x("div",{style:`
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px 4px;
                background: rgba(0,0,0,0.3);
                font-size: 9px;
                opacity: 0.9;
                cursor: grab;
                flex-wrap: ${Z?"wrap":"nowrap"};
                gap: 4px;
            `});te.appendChild(x("span",{textContent:D.label,style:"font-weight: bold;"}));const re=x("button",{textContent:"×",style:"background: none; border: none; color: var(--color-danger); font-size: 12px; cursor: pointer; padding: 0 4px; margin-left: auto;"});re.onclick=V=>{V.stopPropagation(),K.removeItem(D.id);},te.appendChild(re);const ne=x("div",{style:"flex: 1; padding: 4px; overflow: auto; display: flex; align-items: center; justify-content: center;"});if(ne.appendChild(D.element),Z){const V=x("div",{style:"display: flex; gap: 4px; padding: 4px; background: rgba(0,0,0,0.2); flex-wrap: wrap;"}),Q="font-size: 9px; padding: 2px 4px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 3px; flex: 1; min-width: 60px; max-width: 80px;",O=x("select",{style:Q});$e.getCategories().forEach(ye=>{const Ie=x("option",{value:ye,textContent:ye});O.appendChild(Ie);});const X=x("select",{style:Q});X.appendChild(x("option",{value:"",textContent:"Asset..."}));const de=x("select",{style:Q});de.appendChild(x("option",{value:"",textContent:"None"})),["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(ye=>{de.appendChild(x("option",{value:ye,textContent:ye}));});const ce=()=>{X.innerHTML="",X.appendChild(x("option",{value:"",textContent:"Asset..."})),$e.getCategoryId(O.value).forEach(Ie=>{X.appendChild(x("option",{value:Ie,textContent:Ie}));});},le=async()=>{ne.innerHTML="";const ye=O.value,Ie=X.value,ut=de.value;if(!Ie){ne.appendChild(x("span",{textContent:"🌱 Select asset",style:"opacity: 0.4; font-size: 11px;"}));return}try{const ht=await $e.toCanvas(ye,Ie,{mutations:ut?[ut]:[],scale:2});ht.style.imageRendering="pixelated",ht.style.maxWidth="100%",ht.style.maxHeight="100%",ht.style.objectFit="contain",ne.appendChild(ht);}catch{ne.appendChild(x("span",{textContent:"Sprite Not Found",style:"color: var(--color-danger); font-size: 10px;"}));}};O.onchange=()=>{ce(),le();},X.onchange=le,de.onchange=le,[O,X,de].forEach(ye=>{ye.onpointerdown=Ie=>Ie.stopPropagation(),ye.onclick=Ie=>Ie.stopPropagation();}),V.appendChild(O),V.appendChild(X),V.appendChild(de),ce(),le(),W.appendChild(te),W.appendChild(V),W.appendChild(ne);}else W.appendChild(te),W.appendChild(ne);const oe=x("div",{style:`
                position: absolute;
                right: 0;
                bottom: 0;
                width: 12px;
                height: 12px;
                cursor: se-resize;
                background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%);
            `});return oe.onpointerdown=V=>C(D,"se",V),W.appendChild(oe),te.onpointerdown=V=>R(D,V),W.onpointerdown=V=>{(V.target===W||V.target===ne)&&R(D,V);},W};_.ondragover=D=>{D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="copy"),_.style.borderColor="var(--color-primary)",_.style.background="rgba(var(--color-primary-rgb, 0,200,150), 0.1)",I.style.opacity="0.6";},_.ondragleave=()=>{_.style.borderColor="rgba(255,255,255,0.15)",_.style.background="rgba(0,0,0,0.3)",I.style.opacity=a.size===0?"0.3":"0";},_.ondrop=D=>{D.preventDefault(),_.style.borderColor="rgba(255,255,255,0.15)",_.style.background="rgba(0,0,0,0.3)",I.style.opacity="0";const Z=_.getBoundingClientRect(),W=F(D.clientX-Z.left),te=F(D.clientY-Z.top),re=new CustomEvent("canvas-drop",{detail:{x:W,y:te,dataTransfer:D.dataTransfer}});_.dispatchEvent(re);},d.appendChild(_);const K={root:d,addItem(D,Z,W,te,re){const ne=a.size,oe=re?.width??100,V=re?.height??60,Q=F(20+ne*16%(t-oe)),O=F(20+ne*16%Math.max(20,n-V)),j={id:D,type:Z,label:W,element:te,position:{x:Q,y:O},size:{width:oe,height:V},zIndex:++l},X=G(j);return j.element=X,a.set(D,j),_.appendChild(X),I.style.opacity="0",j},removeItem(D){const Z=a.get(D);Z&&(Z.element.remove(),a.delete(D),e.onItemRemove?.(D),a.size===0&&(I.style.opacity="0.3"));},getItems(){return Array.from(a.values())},clear(){a.forEach(D=>D.element.remove()),a.clear(),I.style.opacity="0.3";},setGridSize(D){i=D,h.textContent=`Grid: ${D}px`,_.style.backgroundImage&&(_.style.backgroundImage=S());},destroy(){document.removeEventListener("pointermove",N),document.removeEventListener("pointerup",M),document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",B),a.clear();}};return K}function qP(){const e=(C,E)=>{E&&(E instanceof Node?C.appendChild(E):E.root instanceof Node?C.appendChild(E.root):console.warn("[Gemini] UI Gallery: Cannot mount child",E));},t=x("div",{className:"ui-gallery",style:"height: 100%; display: flex; flex-direction: column; gap: 24px; padding: 12px; overflow-y: auto;"}),n=(C,E)=>{const B=x("div",{style:"display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;"}),G=x("div",{style:"border-left: 3px solid var(--color-primary); padding-left: 10px;"});return G.appendChild(x("strong",{style:"display: block; font-size: 15px; color: #fff;",textContent:C})),G.appendChild(x("small",{style:"opacity: 0.6; font-size: 12px;",textContent:E})),B.appendChild(G),B},r=n("Layout & Device Simulation","Test Geminis responsiveness and mobile views"),o=x("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"}),i=Ct.isMobile(),a=st({label:"Switch to Mobile (360px)",variant:i?"primary":"default",onClick:()=>{Ct.setPlatformOverride("mobile");const C=document.querySelector("#gemini-hud-root");C&&(C.style.setProperty("--w","360px"),C.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:360}}))),a.setVariant("primary"),l.setVariant("default");}}),l=st({label:"Reset to Desktop",variant:i?"default":"primary",onClick:()=>{Ct.setPlatformOverride(null);const C=document.querySelector("#gemini-hud-root");C&&(C.style.removeProperty("--w"),C.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:null}}))),a.setVariant("default"),l.setVariant("primary");}});e(o,a),e(o,l),r.appendChild(o),t.appendChild(r);const d=n("Sprite Explorer","Live rendering of game assets and mutations"),f=lt({title:"MGSprite Live Preview",padding:"sm"}),p=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),h=x("div",{style:"height: 140px; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;"});let g="plants",y="Carrot";const b=new Set,S=async()=>{h.innerHTML="";try{const C=await $e.toCanvas(g,y,{mutations:Array.from(b),scale:1.5});C.style.maxHeight="90%",C.style.imageRendering="pixelated",h.appendChild(C);}catch{h.innerHTML='<small style="color:var(--color-danger)">Sprite Not Found</small>';}},_=Bn({options:$e.getCategories().map(C=>({value:C,label:C})),value:g,onChange:C=>{g=C;const E=$e.getCategoryId(C);I.setOptions(E.map(B=>({value:B,label:B}))),E.length&&(y=E[0],I.setValue(E[0])),S();}}),I=Bn({options:$e.getCategoryId(g).map(C=>({value:C,label:C})),value:y,onChange:C=>{y=C,S();}}),T=x("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;"});["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(C=>{const E=x("div",{style:"display: flex; align-items: center; gap: 8px;"});e(E,tr({checked:b.has(C),onChange:B=>{B?b.add(C):b.delete(C),S();}})),E.appendChild(x("span",{textContent:C,style:"font-size: 12px;"})),T.appendChild(E);}),e(p,_),e(p,I),p.appendChild(x("small",{textContent:"MUTATIONS",style:"opacity: 0.5; font-size: 10px; font-weight: bold; margin-top: 4px;"})),p.appendChild(T),f.appendChild(h),f.appendChild(p),d.appendChild(f),t.appendChild(d);const L=n("Interactive Card Builder","Drag components from below - free-form positioning with snap-to-grid!");L.className="card-builder";const F=YP({width:380,height:280,gridSize:8,showGrid:true,onItemMove:(C,E)=>console.log("[CardBuilder] Item moved:",C,E),onItemResize:(C,E)=>console.log("[CardBuilder] Item resized:",C,E),onItemRemove:C=>console.log("[CardBuilder] Item removed:",C)}),$=F.root.querySelector(".positioning-canvas");$&&$.addEventListener("canvas-drop",async C=>{const E=C,{x:B,y:G,dataTransfer:K}=E.detail;try{const D=K?.getData("application/json");if(D){const Z=JSON.parse(D),W=`${Z.id}-${Date.now()}`,te=await gd(Z);if(te){const re=F.addItem(W,Z.type,Z.label,te);re.position={x:B,y:G},re.element.style.left=`${B}px`,re.element.style.top=`${G}px`;}}}catch(D){console.warn("[Gemini] CardBuilder: Invalid drop data",D);}}),L.appendChild(F.root),t.appendChild(L);const R=n("Component Palette","Drag components into the Card Builder above"),M=KP({onItemClick:async C=>{const E=`${C.id}-${Date.now()}`;if(C.type==="Sprite"){const B=x("div",{style:"width: 100%; height: 100%;"});F.addItem(E,"Sprite","Sprite",B,{width:160,height:120});}else {const B=await gd(C);B&&F.addItem(E,C.type,C.label,B);}L.scrollIntoView({behavior:"smooth"});}});return R.appendChild(M),t.appendChild(R),t.appendChild(x("div",{style:"height: 60px; flex-shrink: 0;"})),S(),t}function XP(){const e=x("div",{className:"pixi-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=x("div",{style:"display: flex; flex-direction: column; gap: 10px; padding: 2px;"}),n=x("div",{style:"display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; align-items: end;"});let r=0,o=0,i=false;const a=pr({label:"Tile X",mode:"digits",value:"0",onChange:y=>{r=parseInt(y)||0,g();}}),l=pr({label:"Tile Y",mode:"digits",value:"0",onChange:y=>{o=parseInt(y)||0,g();}}),d=st({label:"Pick from Canvas",variant:"default",onClick:()=>p()});a&&a.root&&n.appendChild(a.root),l&&l.root&&n.appendChild(l.root),n.appendChild(d),t.appendChild(n),e.appendChild(t);const f=x("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 4px;"});e.appendChild(f);const p=()=>{i=!i,d.textContent=i?"🎯 Click any tile...":"Pick from Canvas",d.style.background=i?"var(--color-primary)":"",d.style.color=i?"#000":"",i?document.addEventListener("click",h,true):document.removeEventListener("click",h,true);},h=y=>{if(!i)return;const b=y.target;if(!b||b.tagName!=="CANVAS")return;y.preventDefault(),y.stopPropagation();const S=fn.pointToTile({x:y.clientX,y:y.clientY});S&&(r=S.tx,o=S.ty,a.setValue(String(r)),l.setValue(String(o)),g()),p();},g=()=>{f.innerHTML="";try{const y=fn.inspect(r,o),b=lt({title:`Tile (${r}, ${o})`,subtitle:`GIDX: ${y.gidx} | ${y.objectType||"EMPTY"}`,expandable:!0,padding:"sm"}),S=x("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});if(S.textContent=JSON.stringify(y.tileObject||{},(_,I)=>_==="tileView"||_==="displayObject"?"[Circular/Ref]":I,2),b.appendChild(S),y.objectType==="plant"){const _=y.tileObject?.plant?.speciesId,T=Oe.get("plants")?.[_];if(T){const F=lt({title:T.name||_,subtitle:"SPECIES METADATA",variant:"soft",padding:"sm"}),$=x("div",{style:"font-size: 11px; display: flex; flex-direction: column; gap: 4px;"});$.appendChild(x("div",{textContent:`Base Grow Time: ${T.growTime}s`}));const R=Array.isArray(T.mutations)?T.mutations.join(", "):"None";$.appendChild(x("div",{textContent:`Mutations: ${R}`})),F.appendChild($),f.appendChild(F);}const L=x("div",{style:"display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;"});L.appendChild(st({label:"Clear Tile",size:"sm",variant:"danger",onClick:()=>{fn.setTileEmpty(r,o),g();}})),b.appendChild(L);}f.appendChild(b),xo.drawOverlayBox(r,o,{key:"pixi-inspect-hl",tint:8386303,alpha:.8});}catch(y){f.innerHTML=`<div style="color:var(--color-danger); padding: 10px;">Error: ${y instanceof Error?y.message:String(y)}</div>`;}};return e.destroy=()=>{document.removeEventListener("click",h,true),xo.stopOverlay("pixi-inspect-hl");},e}class JP extends hr{constructor(){super({id:"dev",label:"DEV"});}build(t){const n="gemini-dev-section-styles";if(!document.getElementById(n)){const S=document.createElement("style");S.id=n,S.textContent=`
                /* Dev Section themed scrollbars */
                .gemini-dev-section *::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .gemini-dev-section *::-webkit-scrollbar-track {
                    background: transparent;
                }
                .gemini-dev-section *::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 3px;
                    transition: background 0.2s;
                }
                .gemini-dev-section *::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.25);
                }
                .gemini-dev-section *::-webkit-scrollbar-corner {
                    background: transparent;
                }
                /* Smooth scrolling for all containers */
                .gemini-dev-section .atom-inspector,
                .gemini-dev-section .pixi-inspector,
                .gemini-dev-section .ws-logger,
                .gemini-dev-section .ui-gallery {
                    scroll-behavior: smooth;
                }
            `,document.head.appendChild(S);}const r=x("div",{className:"gemini-dev-section",style:"height: 100%; display: flex; flex-direction: column;"}),o=x("div",{style:"padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 11px;"}),i=it(th.AUTO_RELOAD,true),a=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),l=x("input",{type:"checkbox",checked:i}),d=x("label",{style:"display: flex; align-items: center; gap: 4px; cursor: pointer;"});d.appendChild(l),d.appendChild(document.createTextNode("Auto-Reload on Save")),a.appendChild(d);const f=x("div",{style:"display: flex; align-items: center; gap: 8px;"}),p=x("button",{textContent:"Reload Script",style:"background: var(--color-primary); color: #fff; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; display: none;"}),h=x("span",{textContent:"Vite Connected",style:"opacity: 0.5;"});f.appendChild(h),f.appendChild(p),o.appendChild(a),o.appendChild(f);const g=x("div",{style:"flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 12px; overflow: hidden;"}),y=[{id:"atoms",label:"Atoms",content:GP()},{id:"ws",label:"WS Trace",content:_S()},{id:"pixi",label:"Pixi Tools",content:XP()},{id:"ui",label:"UI Gallery",content:qP()}],b=eh(y.map(S=>({id:S.id,label:S.label})),"atoms",S=>{g.innerHTML="";const _=y.find(I=>I.id===S);_&&g.appendChild(_.content);});r.appendChild(o),r.appendChild(b.root),r.appendChild(g),g.appendChild(y[0].content),t.appendChild(r);}}const QP=`
    /* === Container === */
    .avatar-builder {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        font-family: inherit;
    }

    /* === Preview Area === */
    .avatar-builder-preview-area {
        position: relative;
        background: color-mix(in oklab, var(--soft) 80%, transparent);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: visible;
        padding: 8px 20px 12px;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .avatar-builder-preview-area:active {
        cursor: grabbing;
    }

    /* === Avatar Wrapper (holds preview container + arrows) === */
    .avatar-builder-avatar-wrapper {
        position: relative;
        width: 260px;
        height: 260px;
        flex-shrink: 0;
    }

    /* === Preview Container (Layers) === */
    .avatar-builder-preview-container {
        width: 260px;
        height: 260px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* === Avatar Layers === */
    .avatar-builder-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
        pointer-events: none;
    }

    /* === Rive Canvas === */
    .avatar-builder-rive-canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    /* === Arrow Buttons === */
    .avatar-builder-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 36px;
        border: none;
        background: color-mix(in oklab, var(--fg) 8%, transparent);
        color: var(--fg);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s ease, transform 0.15s ease;
        z-index: 100;
    }

    .avatar-builder-arrow:hover {
        background: color-mix(in oklab, var(--fg) 18%, transparent);
        transform: translateY(-50%) scale(1.1);
    }

    .avatar-builder-arrow:active {
        transform: translateY(-50%) scale(0.92);
    }

    .avatar-builder-arrow-left {
        left: 4px;
    }

    .avatar-builder-arrow-right {
        right: 4px;
    }

    /* === Item Name === */
    .avatar-builder-item-name {
        margin-top: 6px;
        background: color-mix(in oklab, var(--soft) 80%, transparent);
        color: var(--fg);
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        box-shadow: 0 2px 8px color-mix(in oklab, var(--shadow) 40%, transparent);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
    }

    /* === Dots Indicator === */
    .avatar-builder-dots-indicator {
        margin-top: 4px;
        margin-bottom: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .dots-text {
        font-size: 12px;
        color: color-mix(in oklab, var(--fg) 70%, transparent);
        font-weight: 500;
    }

    .dots-container {
        display: flex;
        gap: 6px;
        align-items: center;
    }

    .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--border);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dot.active {
        background: var(--accent);
        transform: scale(1.5);
        box-shadow: 0 0 8px var(--accent);
    }

    /* === Category Row === */
    .avatar-builder-category-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        width: 100%;
    }

    .avatar-builder-category-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: color-mix(in oklab, var(--soft) 80%, transparent);
        border: 2px solid var(--border);
        border-radius: 20px;
        color: var(--fg);
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        min-height: 72px;
        position: relative;
        overflow: hidden;
    }

    .avatar-builder-category-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, color-mix(in oklab, var(--accent) 15%, transparent), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 18px;
    }

    .avatar-builder-category-btn:hover {
        background: color-mix(in oklab, var(--muted) 100%, transparent);
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 4px 16px color-mix(in oklab, var(--shadow) 40%, transparent);
        border-color: color-mix(in oklab, var(--accent) 40%, var(--border));
    }

    .avatar-builder-category-btn:hover::before {
        opacity: 1;
    }

    .avatar-builder-category-btn.active {
        background: color-mix(in oklab, var(--accent) 12%, transparent);
        border-color: var(--accent);
        box-shadow: 0 0 20px color-mix(in oklab, var(--accent) 35%, transparent),
                    0 4px 16px color-mix(in oklab, var(--shadow) 40%, transparent);
        transform: scale(1.03);
    }

    .avatar-builder-category-btn.active::before {
        opacity: 1;
    }

    .category-icon {
        width: 48px;
        height: 48px;
        object-fit: contain;
        opacity: 0.7;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .avatar-builder-category-btn:hover .category-icon {
        opacity: 0.9;
        transform: scale(1.1);
    }

    .avatar-builder-category-btn.active .category-icon {
        opacity: 1;
        filter: drop-shadow(0 2px 6px color-mix(in oklab, var(--accent) 50%, transparent));
        transform: scale(1.12);
    }

    /* === Responsive (Mobile) === */
    @media (max-width: 640px) {
        .avatar-builder-preview-area {
            padding: 8px 14px 12px;
        }

        .avatar-builder-avatar-wrapper {
            width: 240px;
            height: 240px;
        }

        .avatar-builder-preview-container {
            width: 240px;
            height: 240px;
        }

        .avatar-builder-item-name {
            font-size: 11px;
            padding: 4px 8px;
        }

        .avatar-builder-category-row {
            grid-template-columns: repeat(2, 1fr);
        }

        .avatar-builder-category-btn {
            min-height: 64px;
            padding: 12px;
            border-radius: 16px;
        }

        .category-icon {
            width: 40px;
            height: 40px;
        }
    }

    /* === Responsive (Tablet) === */
    @media (min-width: 641px) and (max-width: 1024px) {
        .avatar-builder-avatar-wrapper,
        .avatar-builder-preview-container {
            width: 260px;
            height: 260px;
        }

        .avatar-builder-category-row {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    /* === Touch-friendly === */
    @media (hover: none) and (pointer: coarse) {
        .avatar-builder-arrow {
            width: 32px;
            height: 80px;
        }

        .avatar-builder-category-btn {
            min-height: 56px;
        }
    }

    /* === Focus states (accessibility) === */
    .avatar-builder-arrow:focus-visible,
    .avatar-builder-category-btn:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .avatar-builder-layer,
        .avatar-builder-arrow,
        .avatar-builder-category-btn,
        .dot {
            transition: none !important;
            animation: none !important;
        }

        .avatar-builder-preview-container {
            transition: opacity 0.15s ease !important;
        }
    }
`,ZP="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA2CAYAAACY0PQ8AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKnSURBVHgB7ZuPddMwEMY/9zFAmAAxAWUCzASwAWGDbsDrBs0EJBMAE9SdAHeCqBOQDcQdkuu8Ngk6ubbPcn7v3VP0LCe5zyfJ+ldgBJxzC0oWh64VRWExMAVeiOCYIbsM6Rt4Rw1ahw1k7ILZkOf0IaRsNYm2Q0eSRSCn2dmS7ANax8eARajJ7sgqEqVC35DzhuzW6WVLZiQ+iSOBfwTjPfVYLEXE29jCFxBAApTQLwDD0XoZW1gkAnz9mwqL2IKi6uB8D/AH0+B1bM8hioTwpRb6sZKuU1odmDvo515SOEWEGvqpJIVTRLDQTyUpnPKeYCjZQjHUHoj8EkdCGOBo7iorCEmpDoxmEUSNIpMqgubGUfzfUkV4gF4shKSKYKGXwSLBQidJkyy5iZDUYOfWO4h7BiZJhDEmQyOxSCA1EpJ/sGcsEugigkYGbRMYC30MLoJGziKkNti5RUISZxGQmQhhNlxMbpEwuAgGmXCOBOLVfiasNZYha+GXuu2Rew30cVKEMElchiwPu+unBb4dWer+TbZ8UnbhdLI84HjpvG/bA+WvuEyxp9D/ptEt2ZpsE/Iap92/0tNdO99LLMk+oX3yx3jfiPA93BSDDVZCHxze/OpcCu5ZNSLwSnNSo5IBu8JNa7m9F7iLnGsEPMIiTGn3SS9chCnqKSy390XdvDH+wnzZNL0Dtwvc78+tfbBkH/9FQqgS15gf1zwseBxAUeaGkhXmw4rfLvnDsx0dVDX4whfkzYYEWDaZZ0PpcDHniFjtC3ASHmHx67TLB/blClKc39G+dtPnhxPufM9JjFvnJ4pOIt3bbCj5DN9wRu8iH5gKftftTeyGjS4nXwz8uJ0nLsY++VLBO/4zZRXqJc9AGbRnoN6Fz411Zf8sFNs92jNQFh35C3Y0hc/7VYYmAAAAAElFTkSuQmCC",eL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA/CAYAAACxdtubAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKfSURBVHgB7ZuPdZswEMY//DqAuwGdwM4EJRPUG9TdoCM0G7QT1NkgmSB0gngDkwnKBvQ+W+LJBJCUxnnoyO89/hgL0McdJ50sZxigaZpcNgekRy3LpyzLavfgYuSEr0iTpSzb7sFsqLRYlNbMkSZ7seiVe6DXoiJyi3RFkrVoKNwDQ66bqtu6bNwPz1w34SDU5Swo9Vl0Cx0wKLVW7ROqwW0tn+3OmeuK265l8wg91OK6H7nTtWgBXSxt9O0K/QJ9HN/TVqgo58tbQB8rrlyLrqETdh6WrtANdEJPzV2hK+ilmIPrktVRqGk/l9DL2lpUs0jSBiPNbkvaYJRDOVao5oh7ZIGZMDvX1R51T/motKMNlDO7d1Q9sxNaQTnvFtWGFfoE5Vihe+hmPxehT3MRWh6Fml+cSuildJuXP9BJJYbcu0JL6KTkqhUqqkvoFHvP1aLvoCLotnfc6Qrd4fSTuBZKu3Mm1ETfX9DDjd3pm6zBYRVO1kh9eOVeDDc8h0GRVb+7H4bStJ9IO6PZicEq98DYFLlCNg9ID3rkVVfoYOJt2tUUXfimK5JkvrPEsrRqgTSgy37r+yJEKKMv5x7lmDYVTi7b2w/wjhmZE68x/eB0OySSBA2OGZ+fenYzmlPHjAJOPTmvxr70vqOWqc8TFK8b1RJsUSavmG6Hv/QViB3Anmoa561XrNAdpsmdr0CUUNNbqhBHFViuNmVjg17Z1xPq8gHxMMf7HVi2kuWaFTEdjxzP0z+WsU2YndP/iPA08RaXgt3CJowfeAE8L/D6l20F+NRl+eupxIv/aUHrU4Tn+rx/jksjN9k0w2IP/1sJ8zAPI0K3eCsGKvPwWk/aXH/XY8noucXBPSNPhdhrymFGxfHKmAfHpTb3iO64/AONOretDlUMVwAAAABJRU5ErkJggg==",tL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA8CAYAAAA5S9daAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKgSURBVHgB7ZvvdYIwEMBPXr/XTtBs0I5gJ+kI7QbtCI7QTXSD4gTiBLJBmoMEA1wC+CSpF37vReEAIZfL/ckTAA9Syg/VzvL+Oar25ernyqMAob6OwIun1WpVdoWZ54I18ENQQp8SSuAH2adFCeDxCQh6FGCE8gdkf7OB6zhZg7MvixJgWAlJsPgE8FiC6v8rMEMngD1SS5bIgc2mXnDnCEqYTb3gzhGU0KeEZ+CHoISpWcILJUxNCaSzJ5WgQskaeEaHNRUmXZbAMTIYeoObjT2REb0BTtESRFfgUsIL8KUX+pfpAItjrOiVljo8noE3raV3yhIE8EfYO4sSYFFCRapKaKUA2dAJTHmydyglcM4RDK2BpkIkqxVmF/bKc8sSOK4wu7BL6u50SGEqGJoBz1wHEqAZ8K4SBKSD0xI4rjC7eDQb/8ES3nQLTWMJrRCpPCZWj6Gdo0lcQleupYqS1b0bS4i0wpxjSavL2gLC0qw829MhRmQ4Wds5hKca9KwrCIzd8QOEpxr42JaQO7ZDIfDDVkKM6rGwtmMooUoJYk4HdIhNx9V2AeH/KBZ9OlAjX0BYojvGw0jZnAj8qJQQqYQuCFlwv4C5grGE2OHRJ5ubV6OE2OHRJ5ubdSxLyKmXLyKlz40lhM4RTp5joa3hMZoleI75FDQH0XxCfuWxOWiiwx7CUniO7SEsF6WreLlRbSfnZ3DxRIZ5DXGn2sb1AEK1b1m/SzjLzUco4VfOw1HWfRvvA2WtkE9Za+1Wo7Mdcd8feRvwmXey7oNw3e/B9zC6stvqZtLrDdQ5N4ZV3J8aWYoR5+A8fYdpmBwDr8UaZG9XqT4eYAL6R1s/LGvTQmUI3XD/WX93Gz7ofvhOrXuUcCmxC2v/BJdOl3rAruIPOjGfbeyq8HcAAAAASUVORK5CYII=",nL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABACAYAAACNx/A2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEh0lEQVR42u3cX2iVdRzH8bPV2tIJGhYzU4iCpJssUsLQpASVyqALLS0M0lC7qFTIBL0ISugmmERFKlZKClLeLIqlTU2kWOKfUmeaEzd109zcdua2s3NeQZybDu6fZ+fsOTvPG763Pz7PGx5+z++c7+8bmf32c5FsFgowGjOwAhuwDVWowWW0Ig7oRgsu4k9UYhPW4zU8ijuT62e9siVtBKZhNb5CFY7gLC7iGqKI651utOEKLuA0fkclPsEyPIjCnBeIIkzFamzBPlxADPFkJUjWwEggWeLJiuIvfI+P8ToeyDmBGIvpWIVKNCOWrITMkkAM3ajDDryBx1AaaIEoxSNYh1PoQMzQkUAnojiE5OutJHACcRfW4BSiiAsWMbSiGotREgiBKMQi7EUj4oJNN+qxG7OGTCAKcT8+wh/ollt04RDexZisCkQxZuEbROUucTTiU0xHUcYFohjP4iC6DA/asRdzUZwxgSjGfJw0/IjjBF7CiEEXiBIsxt+GN7VYhlGDJhC3YQFq5AdnsAQjB0vgbFTLL05gIe5ISyAex0/yk2rMvWWBGI8v5TcVmHyrAtehTX4Tx+coG5BAzMNpIdCElf0WiLHYLQQAjmBGfwWuQqOQVLaiqFeBuBf7hdyM81jSl8D30SykJypQfFOBGIvfhPRGA1b0JPBNXBHSF1UouZnAPcH/RVkQqMOL/xOIh1ArpD+0Y3uqwHdwVRr0eKJJgwDnOYl7/hOIAnyHG+kGzUTogGZqxKtJgcbgbLpBgyIyS3mi2J4U6ClcHw4Cs5znJEojWInraYTNSOjg59GEKRFsRHSgYUOBmrA0ggp05KvANDK1YUMER9Ad8LB95hmCTB34NoLzSIQCB0wMhyO4FvzXRRAzJVAXQWfwwwrqV0FbBLEcChy0PIkIrufIh2sQ88QjOId4pgOnc9hPY91MC4xGUIVOSEdiph4yE+sbHBI438tJJH2RAJkWmEamdOjCvggWoEUGyJrAoaEd5RGMQx0gFNh/mjE/GcB2tAFySqKhow5lyRCeQQNSCaxMQ0sHdqX+K1clIKTKEjwa8HSqwPm4JKQvurCrp9aOLegQ0hvH8URPAifhgJCeuIzVfbW3zcujjvyB0IqNGN2fDtWlqBcC0IkdmDSQHum3wk0FdGI3pgy0yfx2LMcZJOQnHdiKSbd6T2QkFuBAnnVuJXAJH+K+dG8qFWMGtuRJ73QC+7EMZYN5W3Mc1uJgjt8T7o0abMY0FGbivnABJmMbatEu94nhIvbgZZRm48p/EWZiJ+rRkmMbTQJRNOBnvIJRWR06gUKU4UmsxzE040ZAN5w4bqAV51COOZiI4qEee3I3pmEpPsNRtKILsSESGkcMXWjFcWzCcszEhKBOLhqP57EWm1GJGrQgnubYp1RSxz91I45/cBw/4Au8hxcwMbCTi3oZFTAZS1COCvyKYziLelxDG7oQ7+dop3Y04TJqcQqH8Qt24QMsxMO4I6dmZ/U9PsAEzMEKbMDX+BHVOIeraEUsZWLbVdTiKPZhJ8qxBoswFaNRkM1n+he4a3+KgaBGGQAAAABJRU5ErkJggg==",Kf={expression:{label:"Expression",type:"Expression",icon:nL},top:{label:"Top",type:"Top",icon:ZP},mid:{label:"Mid",type:"Mid",icon:eL},bottom:{label:"Bottom",type:"Bottom",icon:tL}},rL={expression:"Expression_Default.png",top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png"};function oL(e={}){const{initialOutfit:t={},onChange:n,width:r="100%",useRiveAnimation:o=false}=e;let i={...rL,...t},a="bottom",l={expression:[],top:[],mid:[],bottom:[]},d={expression:0,top:0,mid:0,bottom:0},f,p,h,g={},y=false,b=0,S=0,_=null,I=null;const T=[],L=x("div",{className:"avatar-builder"});L.style.width=r;const F=x("style");F.textContent=QP,L.appendChild(F);const $=x("div",{className:"avatar-builder-preview-area"});L.appendChild($);const R=x("div",{className:"avatar-builder-avatar-wrapper"});$.appendChild(R),f=x("div",{className:"avatar-builder-preview-container"}),R.appendChild(f);const N=x("button",{className:"avatar-builder-arrow avatar-builder-arrow-left",onclick:()=>W(-1)});N.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',R.appendChild(N);const M=x("button",{className:"avatar-builder-arrow avatar-builder-arrow-right",onclick:()=>W(1)});M.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',R.appendChild(M),f.addEventListener("mousedown",re),f.addEventListener("touchstart",re,{passive:true}),T.push(()=>{f.removeEventListener("mousedown",re),f.removeEventListener("touchstart",re);}),p=x("div",{className:"avatar-builder-item-name"},"Loading..."),$.appendChild(p),h=x("div",{className:"avatar-builder-dots-indicator"}),$.appendChild(h);const C=x("div",{className:"avatar-builder-category-row"});L.appendChild(C),Object.entries(Kf).forEach(([O,j])=>{const X=O,de=x("button",{className:`avatar-builder-category-btn ${X===a?"active":""}`,onclick:()=>Z(X),title:j.label}),ce=x("img",{src:j.icon,alt:j.label,className:"category-icon"});de.appendChild(ce),g[X]=de,C.appendChild(de);}),E().then(()=>{B(),K(),D();});async function E(){const O=["expression","top","mid","bottom"];await Promise.all(O.map(async j=>{const X=await xm({type:Kf[j].type});l[j]=X;const de=i[j],ce=X.findIndex(le=>le.filename===de);d[j]=ce>=0?ce:0;}));}function B(){if(o)_?wo.updateOutfit(_,i).catch(O=>{console.error("[AvatarBuilder] Failed to update Rive outfit:",O);}):G();else {f.innerHTML="";const O=Ur();[{slot:"bottom",zIndex:1},{slot:"mid",zIndex:2},{slot:"top",zIndex:3},{slot:"expression",zIndex:4}].forEach(({slot:X,zIndex:de})=>{const ce=i[X];if(!ce)return;const le=ce===vm;if(ce.includes("_Blank.png")||le)return;const Ie=x("img",{src:`${O}${ce}`,className:`avatar-builder-layer ${X===a?"active":""}`,style:{zIndex:String(de)},onerror:()=>Ie.style.display="none"});f.appendChild(Ie);});}}async function G(){if(!(!o||_))try{f.innerHTML="",I=x("canvas",{className:"avatar-builder-rive-canvas",width:260,height:260}),f.appendChild(I),_=await wo.createInstance({canvas:I,outfit:i,autoplay:!0}),console.log("[AvatarBuilder] Rive animation initialized");}catch(O){console.error("[AvatarBuilder] Failed to initialize Rive:",O),console.warn("[AvatarBuilder] Falling back to static images"),I&&(I.remove(),I=null),_=null,B();}}function K(){const O=l[a],j=d[a];if(!O||O.length===0){p.textContent="Loading...";return}const X=O[j];p.textContent=X?.displayName||"Unknown";}function D(){const O=l[a],j=d[a],X=O.length;if(X===0){h.innerHTML="";return}h.innerHTML=`<span class="dots-text">${j+1} / ${X}</span>`;const de=Math.min(X,10),ce=x("div",{className:"dots-container"}),le=X>1?Math.round(j/(X-1)*(de-1)):0;for(let ye=0;ye<de;ye++){const Ie=x("span",{className:`dot ${ye===le?"active":""}`});ce.appendChild(Ie);}h.appendChild(ce);}function Z(O){a=O,Object.entries(g).forEach(([j,X])=>{X.classList.toggle("active",j===O);}),B(),K(),D();}function W(O){const j=l[a];if(!j||j.length===0)return;let X=d[a]+O;X<0&&(X=j.length-1),X>=j.length&&(X=0),d[a]=X;const de=j[X];i[a]=de.filename,n&&n({slot:a,item:de}),te(O>0?"left":"right"),B(),K(),D();}function te(O){const j=O==="left"?-20:20;f.style.transform=`translateX(${j}px)`,f.style.opacity="0.5",setTimeout(()=>{f.style.transform="translateX(0)",f.style.opacity="1";},150);}function re(O){y=true,b="touches"in O?O.touches[0].clientX:O.clientX,S=0;const j=de=>{if(!y)return;S=("touches"in de?de.touches[0].clientX:de.clientX)-b,f.style.transform=`translateX(${S*.3}px)`;},X=()=>{if(y){if(y=false,f.style.transform="translateX(0)",Math.abs(S)>50){const de=S>0?-1:1;W(de);}document.removeEventListener("mousemove",j),document.removeEventListener("mouseup",X),document.removeEventListener("touchmove",j),document.removeEventListener("touchend",X);}};document.addEventListener("mousemove",j),document.addEventListener("mouseup",X),document.addEventListener("touchmove",j),document.addEventListener("touchend",X);}function ne(){return {...i}}function oe(O){i={...i,...O},Object.entries(O).forEach(([j,X])=>{const de=j;if(!X||!l[de])return;const ce=l[de].findIndex(le=>le.filename===X);ce>=0&&(d[de]=ce);}),B(),K(),D();}function V(O){Z(O);}function Q(){_&&(_.destroy(),_=null),I&&(I.remove(),I=null),T.forEach(O=>O()),T.length=0,L.remove();}return {root:L,getOutfit:ne,setOutfit:oe,setCategory:V,destroy:Q}}const iL={lastSelectedSlot:"bottom",builderExpanded:true,outfitsExpanded:true,loadoutsExpanded:true};async function aL(){const e=await To("tab-avatar-ui",{version:1,defaults:iL}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const r=e.get();t.forEach(o=>o(r));},subscribe:n=>(t.push(n),()=>{const r=t.indexOf(n);r!==-1&&t.splice(r,1);})}}const sL=`
.outfits-loadout-empty {
    padding: 4px 0 2px;
    text-align: center;
    font-size: 13px;
    color: color-mix(in oklab, var(--fg) 50%, transparent);
}

/* Horizontal carousel (used inside builder) */
.outfits-loadout-carousel {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 2px 2px 8px;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}
.outfits-loadout-carousel:active {
    cursor: grabbing;
}
.outfits-loadout-carousel::-webkit-scrollbar {
    height: 6px;
}
.outfits-loadout-carousel::-webkit-scrollbar-track {
    background: transparent;
}
.outfits-loadout-carousel::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}
.outfits-loadout-carousel::-webkit-scrollbar-thumb:hover {
    background: color-mix(in oklab, var(--border) 70%, var(--fg) 30%);
}

/* Vertical grid (used in standalone loadouts card) */
.outfits-loadout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 72px);
    gap: 8px;
    max-height: 232px; /* 3 rows × 72px + 2 gaps × 8px */
    overflow-y: auto;
    padding: 2px 2px 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}
.outfits-loadout-grid::-webkit-scrollbar {
    width: 6px;
}
.outfits-loadout-grid::-webkit-scrollbar-track {
    background: transparent;
}
.outfits-loadout-grid::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}
.outfits-loadout-grid::-webkit-scrollbar-thumb:hover {
    background: color-mix(in oklab, var(--border) 70%, var(--fg) 30%);
}

.outfits-loadout-hint {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid color-mix(in oklab, var(--border) 50%, transparent);
    font-size: 11px;
    color: color-mix(in oklab, var(--fg) 40%, transparent);
    text-align: center;
    line-height: 1.6;
}
.outfits-loadout-hint__mobile {
    display: none;
}
@media (hover: none) and (pointer: coarse) {
    .outfits-loadout-hint__desktop {
        display: none;
    }
    .outfits-loadout-hint__mobile {
        display: block;
    }
}

.outfits-loadout-card {
    position: relative;
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    border-radius: 10px;
    background: color-mix(in oklab, var(--soft) 80%, transparent);
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
    overflow: hidden;
}
.outfits-loadout-card:hover {
    border-color: color-mix(in oklab, var(--accent) 40%, transparent);
    background: color-mix(in oklab, var(--muted) 100%, transparent);
}
.outfits-loadout-card:active {
    opacity: 0.7;
}

.outfits-loadout-preview {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.outfits-loadout-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
`,lL=500,Yf=10,cL=800;function Zb(e={}){const{onApply:t,layout:n="carousel"}=e;let r=null;function o(){if(!r)return;r.innerHTML="";const p=Nr.get();if(p.length===0){r.appendChild(x("div",{className:"outfits-loadout-empty"},"No saved outfits yet."));return}const h=Ur();if(n==="grid"){const g=x("div",{className:"outfits-loadout-grid"});p.forEach(y=>{g.appendChild(i(y,h));}),r.appendChild(g);}else {const g=x("div",{className:"outfits-loadout-carousel"});p.forEach(y=>{g.appendChild(i(y,h));}),a(g),r.appendChild(g);}}function i(p,h){const g=x("div",{className:"outfits-loadout-card"});let y=false,b=null;const S=()=>{y=true,b&&clearTimeout(b),b=setTimeout(()=>{y=false;},cL),Nr.delete(p.id);};g.addEventListener("click",()=>{y||(t?t(p):Ym.set({top:p.top,mid:p.mid,bottom:p.bottom,expression:p.expression}));}),g.addEventListener("contextmenu",R=>{R.preventDefault(),R.stopPropagation(),S();});let _=null,I=null,T=false;const L=()=>{_&&(clearTimeout(_),_=null),I=null,T=false;};g.addEventListener("pointerdown",R=>{R.pointerType!=="mouse"&&R.button===0&&(L(),I={x:R.clientX,y:R.clientY},_=setTimeout(()=>{_=null,I&&(T=true,S());},lL));}),g.addEventListener("pointermove",R=>{if(!I||T)return;const N=R.clientX-I.x,M=R.clientY-I.y;N*N+M*M>Yf*Yf&&L();}),g.addEventListener("pointerup",L),g.addEventListener("pointercancel",L);const F=x("div",{className:"outfits-loadout-preview"});return [p.bottom,p.mid,p.top,p.expression].forEach((R,N)=>{if(!R||R.includes("_Blank"))return;const M=x("img",{className:"outfits-loadout-layer",style:{zIndex:String(N+1)}});M.src=`${h}${R}`,M.onerror=()=>M.remove(),F.appendChild(M);}),g.appendChild(F),g}function a(p){let h=false,g=0,y=0;const b=I=>{h=true,g=("touches"in I?I.touches[0].clientX:I.clientX)-p.offsetLeft,y=p.scrollLeft;},S=I=>{if(!h)return;I.preventDefault();const T=("touches"in I?I.touches[0].clientX:I.clientX)-p.offsetLeft;p.scrollLeft=y-(T-g);},_=()=>{h=false;};p.addEventListener("mousedown",b),p.addEventListener("touchstart",b,{passive:true}),p.addEventListener("mousemove",S),p.addEventListener("touchmove",S,{passive:false}),p.addEventListener("mouseup",_),p.addEventListener("mouseleave",_),p.addEventListener("touchend",_);}const l=x("style");l.textContent=sL,r=x("div"),o();const d=x("div");d.appendChild(l),d.appendChild(r);const f=Nr.subscribe(()=>o());return {root:d,destroy(){f(),r=null;}}}function dL(e={}){const{title:t="Outfits",defaultExpanded:n=true,onExpandChange:r,onApply:o,layout:i,showHint:a=false}=e,l=Zb({onApply:o,layout:i}),d=lt({title:t,variant:"soft",expandable:true,defaultExpanded:n,onExpandChange:r}),f=d.querySelector(".card-body");if(f&&(f.appendChild(l.root),a)){const p=x("div",{className:"outfits-loadout-hint"});p.innerHTML=`
                <span class="outfits-loadout-hint__desktop">Click to apply · Right-click to delete</span>
                <span class="outfits-loadout-hint__mobile">Tap to apply · Hold to delete</span>
            `,f.appendChild(p);}return {root:d,destroy:()=>l.destroy()}}const uL=`
    .avatar-outfits-divider {
        margin: 10px 0 8px;
        border: none;
        border-top: 1px solid var(--border);
    }

    .avatar-save-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 10px 16px;
        border-radius: 10px;
        border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
        background: color-mix(in oklab, var(--accent) 10%, transparent);
        color: var(--accent);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s ease, border-color 0.15s ease;
        margin: 10px 0 0;
    }
    .avatar-save-btn:hover {
        background: color-mix(in oklab, var(--accent) 18%, transparent);
        border-color: color-mix(in oklab, var(--accent) 50%, transparent);
    }
    .avatar-save-btn:active {
        background: color-mix(in oklab, var(--accent) 26%, transparent);
    }
`;class pL extends hr{constructor(){super({id:"tab-avatar",label:"Avatar"});we(this,"avatarBuilder",null);we(this,"uiState",null);}async build(n){Nr.init(),this.uiState=await aL();const r=await Ys().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})),o={top:r.top,mid:r.mid,bottom:r.bottom,expression:r.expression},i=this.createContainer("avatar-section");n.appendChild(i);const a=x("style");a.textContent=uL,i.appendChild(a);const l=lt({title:"Avatar editor",variant:"glass",expandable:true,defaultExpanded:this.uiState.get().builderExpanded,onExpandChange:p=>{this.uiState?.update({builderExpanded:p});}});this.avatarBuilder=oL({initialOutfit:o,useRiveAnimation:true});const d=l.querySelector(".card-body");if(d){d.appendChild(this.avatarBuilder.root);const p=x("button",{className:"avatar-save-btn"});p.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save this outfit',p.addEventListener("click",()=>this.handleSave()),d.appendChild(p),d.appendChild(x("hr",{className:"avatar-outfits-divider"}));const h=Zb({onApply:g=>this.avatarBuilder?.setOutfit(g)});d.appendChild(h.root),this.addCleanup(()=>h.destroy());}i.appendChild(l);const f=dL({title:"Outfits loadout",defaultExpanded:this.uiState.get().loadoutsExpanded,onExpandChange:p=>{this.uiState?.update({loadoutsExpanded:p});},layout:"grid",showHint:true});f.root.style.marginTop="12px",i.appendChild(f.root),this.addCleanup(()=>f.destroy());}async handleSave(){if(!this.avatarBuilder)return;const n=this.avatarBuilder.getOutfit(),o=`Outfit ${Nr.get().length+1}`;await Nr.save(o,n);}async destroy(){this.avatarBuilder&&(this.avatarBuilder.destroy(),this.avatarBuilder=null),super.destroy();}}const bd={ui:{expandedCards:{public:true}}};async function fL(){const e=await To("tab-room",{version:1,defaults:bd,sanitize:o=>({ui:{expandedCards:bo(bd.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:bo(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const hL=`
/* Container */
.rooms-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Header Bar (Filter + Refresh) */
.rooms-list__header-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 8px;
}

.rooms-list__header-bar > * {
  flex: 1;
  min-width: 0;
}

/* Scrollable Container (max 4 items visible) */
.rooms-list__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  position: relative;
}

/* Loading Overlay */
.rooms-list__loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 6px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.rooms-list__loading-overlay svg {
  color: var(--accent);
  filter: drop-shadow(0 2px 4px color-mix(in srgb, var(--shadow) 20%, transparent));
}

/* Custom scrollbar */
.rooms-list__container::-webkit-scrollbar {
  width: 6px;
}

.rooms-list__container::-webkit-scrollbar-track {
  background: color-mix(in srgb, var(--muted) 20%, transparent);
  border-radius: 3px;
}

.rooms-list__container::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 3px;
  opacity: 0.7;
}

.rooms-list__container::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
  opacity: 1;
}

/* Room Item (Compact Vertical Layout) */
.rooms-list__item {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;
}

.rooms-list__item:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 6px color-mix(in srgb, var(--shadow) 15%, transparent);
}

/* Top Row (Badge + ID + Copy) */
.rooms-list__top-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Platform Badge (uses theme accent color) */
.rooms-list__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border: 1px solid;
  flex-shrink: 0;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
}

/* Room ID */
.rooms-list__id {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--fg);
  opacity: 0.75;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.rooms-list__copy-btn {
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.15s ease;
  color: var(--fg);
  opacity: 0.6;
  flex-shrink: 0;
}

.rooms-list__copy-btn:hover {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
  opacity: 1;
}

.rooms-list__copy-btn:active {
  transform: scale(0.9);
}

/* Bottom Row (Avatars + Count + Join) */
.rooms-list__bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

/* Left section (Avatars + Count) */
.rooms-list__bottom-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Avatars */
.rooms-list__avatars {
  display: flex;
  gap: 4px;
  align-items: center;
}

.rooms-list__avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  overflow: hidden;
}

.rooms-list__avatar--filled {
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--accent) 40%, transparent),
    color-mix(in srgb, var(--accent) 20%, transparent)
  );
  border: 1.5px solid var(--accent);
  color: var(--fg);
}

.rooms-list__avatar--empty {
  background: color-mix(in srgb, var(--shadow) 25%, transparent);
  border: 1.5px dashed color-mix(in srgb, var(--border) 50%, transparent);
  opacity: 0.4;
}

/* Player Count (Next to Avatars) */
.rooms-list__count {
  font-size: 13px;
  font-weight: 600;
  color: var(--fg);
  opacity: 0.8;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Empty State */
.rooms-list__empty {
  padding: 24px 16px;
  text-align: center;
  color: var(--fg);
  opacity: 0.6;
  font-size: 13px;
  font-style: italic;
}

/* Footer (Powered by Aries + Timestamp) */
.rooms-list__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 4px 0 4px;
  gap: 12px;
}

.rooms-list__aries-badge {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  opacity: 0.7;
  white-space: nowrap;
}

.rooms-list__timestamp {
  font-size: 11px;
  color: var(--fg);
  opacity: 0.6;
  font-style: italic;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 640px) {
  .rooms-list__item {
    padding: 10px 12px;
    gap: 8px;
  }

  .rooms-list__badge {
    font-size: 9px;
    padding: 2px 8px;
    min-width: 60px;
  }

  .rooms-list__id {
    font-size: 11px;
  }

  .rooms-list__avatar {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }

  .rooms-list__count {
    font-size: 12px;
  }

  .rooms-list__container {
    max-height: 260px;
  }
}

/* Touch Targets */
.rooms-list__copy-btn {
  min-height: 32px;
  min-width: 32px;
}

@media (hover: hover) {
  .rooms-list__avatar--filled:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 6px color-mix(in srgb, var(--accent) 35%, transparent);
  }
}
`;function mL(e){return /^I-\d+-GC-\d+-\d+$/.test(e)?"discord":"web"}function gL(e){const t=x("span",{className:`rooms-list__badge rooms-list__badge--${e}`});return t.textContent=e==="discord"?"Discord":"Web",t}function bL(e,t=16){return e.length<=t?e:`${e.slice(0,t)}...`}function vL(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,e}function yL(e,t){const n=t==="all"?e:e.filter(r=>r.playerCount<r.maxPlayers);switch(t){case "5-6":return n.filter(r=>r.playerCount>=5);case "4":return n.filter(r=>r.playerCount===4);case "1-3":return n.filter(r=>r.playerCount>=1&&r.playerCount<=3);default:return n}}function xL(e){const t=d=>d.toString().padStart(2,"0"),n=t(e.getHours()),r=t(e.getMinutes()),o=t(e.getSeconds()),i=t(e.getDate()),a=t(e.getMonth()+1),l=e.getFullYear();return `${i}/${a}/${l} ${n}:${r}:${o}`}function wL(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 50 50"),e.setAttribute("width","50"),e.setAttribute("height","50"),e.innerHTML=`
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `,e}function CL(e={}){const{rooms:t=[],onJoinRoom:n,onCopyRoomId:r,onRefresh:o,emptyMessage:i="No rooms available",joinEnabled:a=false,initialFilter:l="5-6",onFilterChange:d}=e;let f=l,p=t;const h=x("div",{className:"rooms-list"}),g=x("style");g.textContent=hL,h.appendChild(g);const y=x("div",{className:"rooms-list__header-bar"}),S=Bn({options:[{value:"5-6",label:"5-6 players"},{value:"4",label:"4 players"},{value:"1-3",label:"1-3 players"},{value:"all",label:"All"}],value:l,onChange:K=>{f=K,d?.(f),B(p);}});y.appendChild(S.root);const _=st({label:"Refresh rooms",variant:"default",size:"sm",iconLeft:"",onClick:()=>{o?.();}});y.appendChild(_),h.appendChild(y);const I=x("div",{style:"position: relative;"}),T=x("div",{className:"rooms-list__container"});I.appendChild(T);const L=x("div",{className:"rooms-list__loading-overlay"});L.style.display="none";const F=wL();L.appendChild(F),I.appendChild(L),h.appendChild(I);const $=x("div",{className:"rooms-list__footer"}),R=x("div",{className:"rooms-list__aries-badge"});R.textContent="Powered by Aries",$.appendChild(R);const N=x("div",{className:"rooms-list__timestamp"});N.style.display="none",$.appendChild(N),h.appendChild($);const M=[S,{remove:()=>_.remove()}],C=[];function E(K){const D=mL(K.id),Z=x("div",{className:"rooms-list__item"}),W=x("div",{className:"rooms-list__top-row"}),te=gL(D);W.appendChild(te);const re=x("span",{className:"rooms-list__id"});re.textContent=bL(K.id,20),re.title=K.id,W.appendChild(re);const ne=vL(),oe=x("button",{className:"rooms-list__copy-btn"});oe.type="button",oe.title="Copy room ID",oe.appendChild(ne),oe.addEventListener("click",ce=>{ce.stopPropagation(),r?.(K.id);}),W.appendChild(oe),Z.appendChild(W);const V=x("div",{className:"rooms-list__bottom-row"}),Q=x("div",{className:"rooms-list__bottom-left"}),O=x("div",{className:"rooms-list__avatars"});for(let ce=0;ce<K.maxPlayers;ce++){const le=x("div",{className:`rooms-list__avatar ${ce<K.playerCount?"rooms-list__avatar--filled":"rooms-list__avatar--empty"}`});if(K.playerAvatars&&K.playerAvatars[ce]){const ye=K.playerAvatars[ce];if(ye.avatarUrl){const Ie=x("img",{src:ye.avatarUrl,alt:ye.name});Ie.style.width="100%",Ie.style.height="100%",Ie.style.objectFit="cover",le.appendChild(Ie);}else le.textContent="👤";le.title=ye.name;}else ce<K.playerCount&&(le.textContent="👤");O.appendChild(le);}Q.appendChild(O);const j=x("span",{className:"rooms-list__count"});j.textContent=`${K.playerCount}/${K.maxPlayers}`,Q.appendChild(j),V.appendChild(Q);const X=K.playerCount>=K.maxPlayers,de=st({label:"Join",variant:"primary",size:"sm",disabled:!a||X,onClick:()=>{n?.(K.id);}});return C.push(de),V.appendChild(de),Z.appendChild(V),Z}function B(K){T.innerHTML="",C.forEach(Z=>{Z.destroy?Z.destroy():Z.remove&&Z.remove();}),C.length=0;const D=yL(K,f);if(D.length===0){const Z=x("div",{className:"rooms-list__empty"});Z.textContent=i,T.appendChild(Z);}else D.forEach(Z=>{const W=E(Z);T.appendChild(W);});}return B(t),{root:h,setRooms(K){p=K,B(K);},setFilter(K){f=K,S.setValue(K),B(p);},setLastUpdated(K){N.textContent=xL(K),N.style.display="block";},setLoading(K){K?(L.style.display="flex",L.style.opacity="0",L.offsetWidth,L.style.opacity="1"):(L.style.opacity="0",setTimeout(()=>{L.style.display="none";},300));},destroy(){C.forEach(K=>{K.destroy?K.destroy():K.remove&&K.remove();}),C.length=0,M.forEach(K=>{K.destroy?K.destroy():K.remove&&K.remove();}),M.length=0,h.remove();}}}async function kL(e){const{state:t,defaultExpanded:n=true,onExpandChange:r}=e;let o=null,i=false;const a=!Ct.isDiscord(),l=Ct.isDiscord(),f=Ct.detect().origin;async function p(){try{return (await Rs.fetchRooms(1e3)).map(S=>({id:S.id,playerCount:S.playersCount,maxPlayers:6,playerAvatars:S.userSlots?.map(_=>({name:_.name,avatarUrl:_.avatarUrl}))}))}catch(b){return console.error("[Room] Failed to fetch rooms:",b),[]}}async function h(){if(!(i||!o)){i=true,o.setLoading(true);try{const b=await p(),S=new Date;o.setRooms(b),o.setLastUpdated(S),console.log(`[Room] Fetched ${b.length} rooms from Aries API`);}catch(b){console.error("[Room] Failed to refresh rooms:",b);}finally{i=false,o.setLoading(false);}}}const g=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"});o=CL({rooms:[],joinEnabled:a,onJoinRoom:b=>{const S=`${f}/r/${b}`;window.open(S,"_blank"),console.log(`[Room] Opening room: ${S}`);},onCopyRoomId:b=>{navigator.clipboard.writeText(b).then(()=>{console.log(`[Room] Room ID copied to clipboard: ${b}`);}).catch(S=>{console.error("[Room] Failed to copy room ID:",S);});},onRefresh:()=>{h();},emptyMessage:"No public rooms available",initialFilter:"5-6"}),g.appendChild(o.root);const y=lt({title:"Public",subtitle:l?"List of available public rooms (view only on Discord)":"List of available public rooms",padding:"lg",expandable:true,defaultExpanded:n,onExpandChange:b=>{r?.(b),t.setCardExpanded("public",b),b&&!i&&h();}},g);return n&&h(),{root:y,destroy(){o&&(o.destroy(),o=null);}}}class SL extends hr{constructor(n){super({id:"tab-room",label:"Room"});we(this,"publicCardHandle",null);this.deps=n;}destroy(){this.publicCardHandle&&(this.publicCardHandle.destroy(),this.publicCardHandle=null);}async build(n){const r=this.createGrid("12px");r.id="room",n.appendChild(r);let o;try{o=await fL();}catch{o={get:()=>bd,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get();this.publicCardHandle=await kL({state:o,defaultExpanded:!!i.ui.expandedCards.public}),r.appendChild(this.publicCardHandle.root);}}const AL=10,EL=16;function _L(e){const{selectedSpecies:t,onChange:n,placeholder:r="Search plants...",speciesRuleCount:o={},onSearchChange:i}=e;let a=t??null,l=[],d=[];const f=[],p=new Map;let h=null;const g=x("div",{className:"plant-selector"}),y=Us({placeholder:r,blockGameKeys:true,withClear:true,debounceMs:150,onChange:C=>L(C)});g.appendChild(y.root),f.push(()=>{const C=y.root.__cleanup;C&&C();});const b=x("div",{className:"plant-selector__grid"});g.appendChild(b),f.push(()=>{h!==null&&(cancelAnimationFrame(h),h=null),p.clear();});async function S(C,E){if($e.isReady())try{const B=await $e.toCanvas(C,{boundsMode:"padded"});B&&(B.style.maxWidth="40px",B.style.maxHeight="40px",B.style.width="auto",B.style.height="auto",B.style.display="block",E.replaceChildren(B));}catch(B){console.warn("[PlantSelector] Failed to load sprite:",B);}}function _(){if(p.size===0){h=null;return}const C=[],E=p.entries();for(let B=0;B<AL;B++){const G=E.next();if(G.done)break;C.push(G.value);}for(const[B,G]of C)S(G,B),p.delete(B);p.size>0?h=requestAnimationFrame(()=>{setTimeout(_,EL);}):h=null;}function I(){h===null&&(h=requestAnimationFrame(()=>{_();}));}function T(){try{const C=Oe.get("plants");if(!C){console.warn("[PlantSelector] No plants data available");return}l=Object.entries(C).filter(([,E])=>E&&typeof E=="object"&&"crop"in E).map(([E,B])=>({name:E,spriteId:B.crop?.spriteId||null})),d=[...l],F();}catch(C){console.error("[PlantSelector] Failed to load plants:",C);}}function L(C){if(!C.trim())d=[...l];else {const E=C.toLowerCase();d=l.filter(B=>B.name.toLowerCase().includes(E));}i?.(C),F();}function F(){const C=b.scrollTop;if(h!==null&&(cancelAnimationFrame(h),h=null),p.clear(),b.replaceChildren(),d.length===0){const B=x("div",{className:"plant-selector__empty"},"No plants found");b.appendChild(B);return}const E=document.createDocumentFragment();d.forEach(B=>{const G=$(B);E.appendChild(G);}),b.appendChild(E),b.scrollTop=C,p.size>0&&I();}function $(C){const E=o[C.name]??0,B=x("div",{className:`plant-selector__item ${a===C.name?"plant-selector__item--selected":""}`});if(E>0){const Z=x("div",{className:"plant-selector__badge"},String(E));B.appendChild(Z);}B.addEventListener("click",()=>{a=C.name,n(C.name),F();});const G=x("div",{className:"plant-selector__sprite"}),K=x("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 8%, transparent); border-radius: 4px;"});G.appendChild(K),C.spriteId&&$e.isReady()&&p.set(G,C.spriteId),B.appendChild(G);const D=x("div",{className:"plant-selector__name"},C.name);return B.appendChild(D),B}T();function R(){return a}function N(C){a=C,F();}function M(){f.forEach(C=>C()),f.length=0;}return {root:g,getSelected:R,setSelected:N,destroy:M}}async function gl(e,t,n){const{size:r,mutations:o}=n;if(!$e.isReady()){t.appendChild(di(r));return}try{const l=Oe.get("plants")?.[e]?.crop?.spriteId;if(!l){t.appendChild(di(r));return}const d=await $e.toCanvas(l,{mutations:o&&o.length>0?o:void 0,boundsMode:"padded"});d?(ev(d,r),t.appendChild(d)):t.appendChild(di(r));}catch(i){console.warn(`[SpriteRenderer] Failed to render plant sprite for ${e}:`,i),t.appendChild(di(r));}}async function IL(e,t,n){if(!$e.isReady()){t.appendChild(Ua(e,n));return}try{const i=`sprite/ui/Mutation${{Ambershine:"Amberlit"}[e]??e}`;if(!$e.has(i)){t.appendChild(Ua(e,n));return}const a=await $e.toCanvas(i);a?(ev(a,n),t.appendChild(a)):t.appendChild(Ua(e,n));}catch(r){console.warn(`[SpriteRenderer] Failed to render mutation sprite for ${e}:`,r),t.appendChild(Ua(e,n));}}function di(e){return x("div",{style:`
            width: ${e}px;
            height: ${e}px;
            background: color-mix(in oklab, var(--accent) 20%, transparent);
            border-radius: 4px;
        `})}function TL(e){return x("div",{style:`
            width: ${e}px;
            height: ${e}px;
            background: linear-gradient(135deg, color-mix(in oklab, var(--fg) 8%, transparent) 0%, color-mix(in oklab, var(--fg) 15%, transparent) 100%);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${Math.round(e*.56)}px;
            font-weight: 300;
            color: color-mix(in oklab, var(--fg) 40%, transparent);
        `},"—")}function Ua(e,t){return e==="Gold"?x("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: #FFD700;
                border-radius: 4px;
            `}):e==="Rainbow"?x("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%);
                border-radius: 4px;
            `}):di(t)}function ev(e,t){e.style.maxWidth=`${t}px`,e.style.maxHeight=`${t}px`,e.style.width="auto",e.style.height="auto",e.style.display="block";}const ar=["none","Gold","Rainbow"],js={wet:["Wet","Chilled","Frozen"],lunar:["Dawnlit","Ambershine","Dawncharged","Ambercharged"]};function tv(){if(!$e.isReady())return console.warn("[MutationData] MGSprite not ready yet"),[];try{return $e.getMutationNames().filter(t=>t!=="Gold"&&t!=="Rainbow")}catch(e){return console.error("[MutationData] Failed to get mutation names:",e),[]}}function nv(e){if(e==="none")return "Normal";try{return Oe.get("mutations")?.[e]?.name||e}catch{return e}}function PL(e){return e.map(t=>t==="none"?"none":nv(t).toLowerCase()).join(", ")}function LL(){return tv()}function Qr(e){const n=LL().indexOf(e);return n===-1?1/0:n}function vd(e){return js.wet.includes(e)}function yd(e){return js.lunar.includes(e)}function ML(e){const t=e.filter(o=>vd(o)),n=e.filter(o=>yd(o)),r=[];return t.length>0&&r.push(t[0]),n.length>0&&r.length<2&&r.push(n[0]),r}function Wa(e){const t=[e.mode];if(e.sizeCondition?.enabled&&t.push(`size:${e.sizeCondition.minPercentage}`),e.mutationCondition?.enabled){const n=[...e.mutationCondition.mutations].sort();t.push(`mut:${e.mutationCondition.matchMode}:${n.join(",")}`);}return t.join("|")}const RL=32;function rv(e){const{mutationId:t,isSelected:n,onToggle:r,size:o=RL}=e;let i=n,a=false;const l=x("div",{style:`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.15s ease;
        `});h(),l.addEventListener("click",r),l.addEventListener("mouseenter",()=>{!i&&!a&&(l.style.background="color-mix(in oklab, var(--fg) 10%, transparent)");}),l.addEventListener("mouseleave",()=>{!i&&!a&&(l.style.background="color-mix(in oklab, var(--fg) 5%, transparent)");});const d=x("div",{style:"display: flex; align-items: center; justify-content: center;"});t==="none"?d.appendChild(TL(o)):IL(t,d,o),l.appendChild(d);const f=e.label??nv(t),p=x("div",{style:`
            font-size: 10px;
            color: var(--fg);
            text-align: center;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        `},f);l.appendChild(p);function h(){i?(l.style.background="color-mix(in oklab, var(--accent) 20%, transparent)",l.style.border="1px solid var(--accent)"):(l.style.background="color-mix(in oklab, var(--fg) 5%, transparent)",l.style.border="1px solid color-mix(in oklab, var(--fg) 10%, transparent)");}function g(b){i=b,h();}function y(b){a=b,l.style.opacity=a?"0.35":"1",l.style.pointerEvents=a?"none":"",l.style.cursor=a?"default":"pointer";}return {root:l,setSelected:g,setDisabled:y}}function FL(e){const{enabled:t,percentage:n,sizeMode:r,ruleMode:o,onEnabledChange:i,onPercentageChange:a,onSizeModeChange:l,expanded:d=false,onExpandChange:f}=e;let p=t,h=n,g=r,y=o,b=null,S=null,_=null;const I=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),T=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");F();const L=lt({title:"Size",subtitle:"Growth size threshold",actions:[T],variant:"soft",padding:"md",expandable:true,defaultExpanded:d,onExpandChange:f},I);function F(){I.replaceChildren(),T.style.display=p?"":"none";const M=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=ol({checked:p,label:"Enable",size:"md",onChange:W=>{p=W,i(W),F();}});M.appendChild(C.root),p&&(b=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},$()),M.appendChild(b)),I.appendChild(M);const E=x("div",{style:p?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),B=x("div",{style:"display: flex; justify-content: center;"}),G=Oo({segments:[{id:"min",label:"Minimum"},{id:"max",label:"Maximum"}],selected:g,onChange:W=>{g=W,l(g),F();}});B.appendChild(G),E.appendChild(B),_=x("div",{style:"display: flex; flex-direction: column; gap: 4px;"});const K=x("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),D=x("div",{style:"font-size: 12px; color: var(--fg); font-weight: 500;"},"Size Threshold");S=x("span",{style:"font-size: 12px; font-weight: 600; color: var(--accent);"},`${h}%`),K.appendChild(D),K.appendChild(S),_.appendChild(K);const Z=sl({min:50,max:100,step:1,value:h,showValue:false,onInput:W=>{h=W,S&&(S.textContent=`${W}%`),b&&(b.textContent=$());},onChange:W=>{h=W,a(W);}});_.appendChild(Z.root),E.appendChild(_),I.appendChild(E);}function $(){const M=g==="min"?"at most":"at least";return y==="lock"?`Lock plants ${M} ${h}% grown`:`Allow plants ${M} ${h}% grown`}function R(M){y=M,b&&(b.textContent=$());}function N(){b=null,S=null,_=null;}return {root:L,setRuleMode:R,destroy:N}}function OL(e){const{enabled:t,selected:n,ruleMode:r,onEnabledChange:o,onSelectionChange:i,expanded:a=false,onExpandChange:l}=e;let d=t,f=[...n],p=r,h=null;const g=[],y=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),b=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");_();const S=lt({title:"Color Mutation",subtitle:"Gold / Rainbow color variants",actions:[b],variant:"soft",padding:"md",expandable:true,defaultExpanded:a,onExpandChange:l},y);function _(){y.replaceChildren(),g.length=0,b.style.display=d?"":"none";const M=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=ol({checked:d,label:"Enable",size:"md",onChange:G=>{d=G,o(G),_();}});M.appendChild(C.root),d&&(h=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},F()),M.appendChild(h)),y.appendChild(M);const E=x("div",{style:d?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),B=x("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 8px;
            `});ar.forEach(G=>{const K=f.includes(G),D=rv({mutationId:G,isSelected:K,onToggle:()=>I(G)});g.push(D),B.appendChild(D.root);}),E.appendChild(B),y.appendChild(E);}function I(M){if(f.includes(M)){const E=f.filter(B=>B!==M);if(E.length===0)return;f=E;}else {if(f.length>=3)return;f=[...f,M];}i(f),T(),L();}function T(){h&&(h.textContent=F());}function L(){ar.forEach((M,C)=>{const E=g[C];E&&E.setSelected(f.includes(M));});}function F(){const M=f.map(C=>C==="none"?"normal":C.toLowerCase()).join(", ");return p==="lock"?`Lock ${M} plants`:`Allow ${M} plants`}function $(M){p=M,T();}function R(){return [...f]}function N(){h=null,g.length=0;}return {root:S,setRuleMode:$,getSelection:R,destroy:N}}function NL(e){const{enabled:t,selected:n,matchMode:r,ruleMode:o,onEnabledChange:i,onSelectionChange:a,onMatchModeChange:l,expanded:d=false,onExpandChange:f}=e;let p=t,h=[...n],g=r,y=o,b=null;const S=new Map,_=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),I=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");L();const T=lt({title:"Weather Mutation",subtitle:"Weather-based mutation variants",actions:[I],variant:"soft",padding:"md",expandable:true,defaultExpanded:d,onExpandChange:f},_);function L(){_.replaceChildren(),S.clear(),I.style.display=p?"":"none";const G=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),K=ol({checked:p,label:"Enable",size:"md",onChange:oe=>{p=oe,i(oe),L();}});G.appendChild(K.root),p&&(b=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"}),h.length>0&&(b.textContent=N()),G.appendChild(b)),_.appendChild(G);const D=x("div",{style:(p?"":"opacity: 0.4; pointer-events: none;")+" display: flex; flex-direction: column; gap: 12px; transition: opacity 0.2s ease;"}),Z=x("div",{style:"display: flex; justify-content: center;"}),W=Oo({segments:[{id:"any",label:"Any"},{id:"all",label:"All"}],selected:g,onChange:oe=>{g=oe,oe==="all"&&(h=ML(h),a(h)),l(g),L();}});Z.appendChild(W),D.appendChild(Z);const re=["none",...tv()],ne=x("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
                gap: 8px;
                max-height: 300px;
                overflow-y: auto;
            `});re.forEach(oe=>{const V=h.includes(oe),Q=rv({mutationId:oe,isSelected:V,onToggle:()=>F(oe),label:oe==="none"?"None":void 0});S.set(oe,Q),ne.appendChild(Q.root);}),D.appendChild(ne),_.appendChild(D);}function F(G){if(g==="all")if(G==="none")h.length===1&&h[0]==="none"?h=[]:h=["none"];else {if(h.includes("none"))return;h.includes(G)?h=h.filter(K=>K!==G):(vd(G)?h=h.filter(K=>!vd(K)):yd(G)&&(h=h.filter(K=>!yd(K))),h=[...h,G]);}else h.includes(G)?h=h.filter(K=>K!==G):h=[...h,G];a(h),$(),R();}function $(){b&&(b.textContent=h.length>0?N():"");}function R(){const G=g==="all"&&h.includes("none");S.forEach((K,D)=>{K.setSelected(h.includes(D)),K.setDisabled(G&&D!=="none");});}function N(){const G=PL(h),K=g==="all"?"AND":"OR";return y==="lock"?`Lock ${G} plants (${K})`:`Allow ${G} plants (${K})`}function M(G){y=G,$();}function C(){return [...h]}function E(){return g}function B(){b=null,S.clear();}return {root:T,setRuleMode:M,getSelection:C,getMatchMode:E,destroy:B}}const DL=60;function $L(e){let t={...e},n=null,r=null;const o=x("div",{style:"display: flex; flex-direction: column; gap: 8px;"}),i=x("div",{style:"display: flex; justify-content: center;"}),a=x("div",{className:"harvest-locker-preview-grid"});o.appendChild(i),o.appendChild(a);const l=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `});t.sizeEnabled&&t.sizePercentage!==void 0&&(l.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,l.style.display="");const d=lt({title:"Preview",subtitle:p(),actions:[l],variant:"soft",padding:"md",expandable:true,defaultExpanded:true},o),f=d.querySelector(".card-subtitle");h();function p(){return t.ruleMode==="lock"?"Preview of plants that will be blocked from harvesting":"Preview of plants that will be harvestable"}function h(){n!==null&&(cancelAnimationFrame(n),n=null),f&&(f.textContent=p()),t.sizeEnabled&&t.sizePercentage!==void 0?(l.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,l.style.display=""):l.style.display="none";const I=t.colorEnabled?ar.filter(T=>t.colorMutations.includes(T)):[];if(I.length>=2){r&&!I.includes(r)&&(r=I[0]),r||(r=I[0]),i.replaceChildren();const T=Oo({segments:I.map(L=>({id:L,label:L==="none"?"Normal":L})),selected:r,onChange:L=>{r=L,h();}});i.appendChild(T);}else r=null,i.replaceChildren();a.replaceChildren(),n=requestAnimationFrame(()=>{g().forEach(L=>{a.appendChild(L);});});}function g(){const I=[],T=t.species||"Starweaver";if(!(t.sizeEnabled||t.colorEnabled||t.weatherEnabled))return I.push(b(T,[])),I;const F=y();if(F.sort((R,N)=>{const M=Math.max(0,...R.map(G=>ar.indexOf(G))),C=Math.max(0,...N.map(G=>ar.indexOf(G)));if(M!==C)return M-C;const E=R.filter(G=>!ar.includes(G)).sort((G,K)=>Qr(G)-Qr(K)),B=N.filter(G=>!ar.includes(G)).sort((G,K)=>Qr(G)-Qr(K));if(E.length!==B.length)return E.length-B.length;for(let G=0;G<E.length;G++){const K=Qr(E[G])-Qr(B[G]);if(K!==0)return K}return 0}),F.length===0){const R=x("div",{style:"padding: 12px; text-align: center; color: #ef4444; font-size: 12px;"},"Invalid mutation combination");return I.push(R),I}return (r?F.filter(R=>{const N=R.filter(M=>ar.includes(M)&&M!=="none");return r==="none"?N.length===0:N.includes(r)}):F).forEach(R=>{I.push(b(T,R));}),I}function y(){const I=[],T=t.weatherEnabled?t.weatherMutations.filter(G=>G!=="none"):[],L=t.colorEnabled?t.colorMutations.filter(G=>G!=="none"):[],F=t.weatherEnabled&&t.weatherMutations.includes("none"),$=t.colorEnabled&&t.colorMutations.includes("none");if(T.length===0&&L.length===0||!t.weatherEnabled&&!t.colorEnabled)return I.push([]),I;const R=T.filter(G=>js.wet.includes(G)),N=T.filter(G=>js.lunar.includes(G)),M=(G,K)=>{G.length===0&&K.length===0?I.push([]):G.length===0?K.forEach(D=>{I.push([...D]);}):K.length===0?G.forEach(D=>{I.push([...D]);}):G.forEach(D=>{K.forEach(Z=>{I.push([...D,...Z]);});});},C=[];if(F&&C.push([]),t.weatherMatchMode==="all"&&T.length>0){const G=R.length>1,K=N.length>1;if(G||K)return [];C.push(T);}else t.weatherMatchMode==="any"&&T.length>0&&(T.forEach(G=>{C.push([G]);}),R.forEach(G=>{N.forEach(K=>{C.push([G,K]);});}));const E=[];return $&&E.push([]),L.forEach(G=>{E.push([G]);}),M(C,E),Array.from(new Set(I.map(G=>G.sort().join(",")))).map(G=>G.split(",").filter(Boolean))}function b(I,T){const L=x("div",{style:"flex-shrink: 0;"});return gl(I,L,{size:DL,mutations:T}),L}function S(I){t={...t,...I},h();}function _(){n!==null&&(cancelAnimationFrame(n),n=null),a.replaceChildren();}return {root:d,update:S,destroy:_}}function qf(e){const{mode:t,species:n,ruleId:r,initialData:o,onSave:i,onDelete:a,onCancel:l}=e;let d=o?.name??"",f=o?.ruleMode??"lock",p=o?.sizeCondition?.enabled??false,h=o?.sizeCondition?.minPercentage??75,g=o?.sizeCondition?.sizeMode??"max";const y=o?.mutationCondition?.mutations??[],b=y.filter(O=>["none","Gold","Rainbow"].includes(O));let S=b.length>0,_=b.length>0?b:["none"];const I=y.filter(O=>!["none","Gold","Rainbow"].includes(O));let T=I.length>0,L=I.length>0?I:["none"],F=o?.mutationCondition?.matchMode??"any",$=null,R=null,N=null,M=null,C=null,E=null,B=null;const G=Z(),K=te();B=yu({title:D(),content:G,footer:K,size:"lg",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{l?.();}});function D(){if(t!=="species"||!n)return r?"Edit Overall Rule":"Create Overall Rule";const O=x("div",{style:"display: flex; align-items: center; gap: 10px;"}),j=x("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});gl(n,j,{size:24}),O.appendChild(j);const X=x("span",{},`${n} — Override Rule`);return O.appendChild(X),O}function Z(){const O=x("div",{style:"display: flex; flex-direction: column; gap: 16px;"});if(t==="species"){const j=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 60%, transparent); padding: 8px 10px; background: color-mix(in oklab, var(--accent) 8%, transparent); border-radius: 6px; border-left: 3px solid var(--accent);"},"Global rules still apply. This override takes priority for this species only.");O.appendChild(j);}return O.appendChild(W()),$=FL({enabled:p,percentage:h,sizeMode:g,ruleMode:f,onEnabledChange:j=>{p=j,ne(),oe();},onPercentageChange:j=>{h=j,oe();},onSizeModeChange:j=>{g=j,oe();}}),O.appendChild($.root),R=OL({enabled:S,selected:_,ruleMode:f,onEnabledChange:j=>{S=j,ne(),oe();},onSelectionChange:j=>{_=j,oe();}}),O.appendChild(R.root),N=NL({enabled:T,selected:L,matchMode:F,ruleMode:f,onEnabledChange:j=>{T=j,ne(),oe();},onSelectionChange:j=>{L=j,oe();},onMatchModeChange:j=>{F=j,oe();}}),O.appendChild(N.root),M=$L({species:t==="overall"?"Carrot":n,ruleMode:f,sizeEnabled:p,sizePercentage:h,sizeMode:g,colorEnabled:S,colorMutations:_,weatherEnabled:T,weatherMutations:L,weatherMatchMode:F}),O.appendChild(M.root),O}function W(){const O=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),j=x("div",{style:"display: flex; gap: 12px; align-items: flex-start;"}),X=x("div",{style:"flex: 1; display: flex; flex-direction: column; gap: 6px;"}),de=x("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Rule Name");X.appendChild(de),C=pr({placeholder:"e.g., Lock Large Frozen",value:d,maxLength:30,blockGameKeys:true,onChange:Ie=>{d=Ie,ne();}}),X.appendChild(C.root),j.appendChild(X);const ce=x("div",{style:"display: flex; flex-direction: column; gap: 6px;"}),le=x("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Mode");ce.appendChild(le);const ye=Oo({segments:[{id:"lock",label:"Lock"},{id:"allow",label:"Allow"}],selected:f,onChange:Ie=>{f=Ie,$?.setRuleMode(f),R?.setRuleMode(f),N?.setRuleMode(f),oe();}});return ce.appendChild(ye),j.appendChild(ce),O.appendChild(j),O}function te(){const O=x("div",{style:"display: flex; gap: 8px; justify-content: space-between; width: 100%;"}),j=x("div",{style:"display: flex; gap: 8px;"});if(r&&a){const le=st({label:"Delete Rule",variant:"danger",onClick:()=>{a(),Q();}});j.appendChild(le);}O.appendChild(j);const X=x("div",{style:"display: flex; gap: 8px;"}),de=st({label:"Cancel",variant:"default",onClick:()=>{l?.(),Q();}});X.appendChild(de);const ce=st({label:"Save",variant:"primary",disabled:!re(),onClick:V});return E=ce,X.appendChild(ce),O.appendChild(X),O}function re(){return !(!d.trim()||!p&&!S&&!T)}function ne(){E&&(E.disabled=!re());}function oe(){M?.update({ruleMode:f,sizeEnabled:p,sizePercentage:h,sizeMode:g,colorEnabled:S,colorMutations:_,weatherEnabled:T,weatherMutations:L,weatherMatchMode:F});}function V(){if(!re())return;const O={name:d.trim(),ruleMode:f};p&&(O.sizeCondition={enabled:true,minPercentage:h,sizeMode:g});const j=[];T&&j.push(...L),S&&j.push(..._),j.length>0&&(O.mutationCondition={enabled:true,mutations:j,matchMode:F}),i(O),Q();}function Q(){$?.destroy(),R?.destroy(),N?.destroy(),M?.destroy(),C?.destroy(),B?.destroy(),$=null,R=null,N=null,M=null,C=null,E=null,B=null;}return {root:B.root,destroy:Q}}function BL(e){const{species:t,existingRules:n,onSelect:r}=e;let o=null;const i=d(),a=f();o=yu({title:l(),subtitle:"Select a rule to assign to this species",content:i,footer:a,size:"md",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{}});function l(){const b=x("div",{style:"display: flex; align-items: center; gap: 10px;"}),S=x("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});return gl(t,S,{size:24}),b.appendChild(S),b.appendChild(x("span",{},`${t} — Assign Rule`)),b}function d(){const b=x("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(n.length===0){const S=x("div",{style:"padding: 20px; text-align: center; color: var(--muted); font-size: 14px;"},"No overall rules available");b.appendChild(S);}else n.forEach(S=>{b.appendChild(p(S));});return b}function f(){const b=x("div",{style:"display: flex; gap: 8px; justify-content: flex-end;"}),S=st({label:"Cancel",variant:"default",onClick:()=>{y();}});return b.appendChild(S),b}function p(b){const S=x("div",{className:"harvest-locker-rule-item",style:"flex-direction: column; align-items: flex-start; gap: 8px;"});S.addEventListener("click",()=>{jt.cloneRuleToSpecies(b.id,t),r(b.id),y();});const _=x("div",{style:"display: flex; align-items: center; justify-content: space-between; width: 100%;"});_.appendChild(x("div",{className:"harvest-locker-rule-item__name"},b.name)),_.appendChild(x("div",{className:"harvest-locker-rule-item__badge"},b.mode)),S.appendChild(_);const I=h(b);return I.childNodes.length>0&&S.appendChild(I),S}function h(b){const S=x("div",{style:"display: flex; flex-wrap: wrap; gap: 4px;"});return b.sizeCondition?.enabled&&S.appendChild(g(`Size ≥ ${b.sizeCondition.minPercentage}%`)),b.mutationCondition?.enabled&&b.mutationCondition.mutations.forEach(_=>{S.appendChild(g(_==="none"?"Normal":_));}),S}function g(b){return x("div",{style:`
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 500;
                color: color-mix(in oklab, var(--fg) 75%, transparent);
                background: color-mix(in oklab, var(--fg) 8%, transparent);
                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
            `},b)}function y(){o?.destroy(),o=null;}return {root:o.root,destroy:y}}const zL={ui:{harvestLockerMode:"overall",selectedSpecies:null,searchQuery:"",harvestLockerExpanded:true,eggLockerExpanded:true,decorLockerExpanded:true}};let ro=null,gc=null;async function jL(){return ro||(gc||(gc=To("tab-locker",{version:1,defaults:zL,sanitize:e=>({ui:{harvestLockerMode:e.ui?.harvestLockerMode==="bySpecies"?"bySpecies":"overall",selectedSpecies:typeof e.ui?.selectedSpecies=="string"?e.ui.selectedSpecies:null,searchQuery:typeof e.ui?.searchQuery=="string"?e.ui.searchQuery:"",harvestLockerExpanded:typeof e.ui?.harvestLockerExpanded=="boolean"?e.ui.harvestLockerExpanded:true,eggLockerExpanded:typeof e.ui?.eggLockerExpanded=="boolean"?e.ui.eggLockerExpanded:true,decorLockerExpanded:typeof e.ui?.decorLockerExpanded=="boolean"?e.ui.decorLockerExpanded:true}})})),ro=await gc,ro)}function er(){if(!ro)throw new Error("[LockerState] State not initialized. Call initLockerState() first.");return ro}function GL(e){const t=er();t.update({ui:{...t.get().ui,harvestLockerMode:e}});}function UL(e){const t=er();t.update({ui:{...t.get().ui,selectedSpecies:e}});}function WL(e){const t=er();t.update({ui:{...t.get().ui,searchQuery:e}});}function HL(e){const t=er();t.update({ui:{...t.get().ui,harvestLockerExpanded:e}});}function VL(e){const t=er();t.update({ui:{...t.get().ui,eggLockerExpanded:e}});}function KL(e){const t=er();t.update({ui:{...t.get().ui,decorLockerExpanded:e}});}function YL(e={}){let t=e.defaultMode??"overall",n=e.defaultSelectedSpecies??null,r=[],o=null,i=null,a=null,l=null,d=null,f=null;const p=[];o=h();function h(){const E=x("div",{className:"harvest-locker-card-wrapper"});i=x("div",{className:"harvest-locker-card__mode-container"}),E.appendChild(i),a=x("div",{className:"harvest-locker-card__content"}),E.appendChild(a);const B=lt({title:"Crop Harvest",subtitle:"Prevent harvesting specific crops",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},E);return g(),b(),y(),B}function g(){t==="overall"?r=jt.getOverallRules():r=n?jt.getSpeciesRules(n):[];}function y(){a&&(a.replaceChildren(),t==="bySpecies"&&(S(),n&&_()),I(),L());}function b(){if(i){if(!l){l=Oo({segments:[{id:"overall",label:"Overall"},{id:"bySpecies",label:"By Species"}],selected:t,onChange:E=>{t=E,GL(t),g(),y();}}),i.appendChild(l);return}l.getSelected()!==t&&l.select(t);}}function S(){if(!a)return;const E=Oe.get("plants");if(!E||Object.keys(E).length===0){const D=x("div",{className:"harvest-locker-card__message harvest-locker-card__message--compact"},"No species available");a.appendChild(D);return}const B=jt.getConfig(),G={};Object.entries(B.speciesRules).forEach(([D,Z])=>{G[D]=Z.length;}),d=_L({selectedSpecies:n??void 0,placeholder:"Search plants...",speciesRuleCount:G,onChange:D=>{n=D,UL(D),g(),y();},onSearchChange:D=>{WL(D);}});const K=x("div",{className:"harvest-locker-card__control"});K.appendChild(d.root),a.appendChild(K);}function _(){if(!a||!n)return;const E=x("div",{className:"harvest-locker-card__species-section-header"}),B=x("div",{className:"harvest-locker-card__species-section-sprite"});gl(n,B,{size:36}),E.appendChild(B);const G=x("div",{className:"harvest-locker-card__species-section-text"}),K=x("div",{className:"harvest-locker-card__species-section-name"},n);G.appendChild(K);const D=x("div",{className:"harvest-locker-card__species-section-label"},"SELECTED");G.appendChild(D),E.appendChild(G),a.appendChild(E);}function I(){if(!a)return;if(t==="bySpecies"&&!n){const D=x("div",{className:"harvest-locker-card__message"},"Select a species to view and manage rules");a.appendChild(D);return}const E=x("div",{className:"harvest-locker-card__rules-section"}),B=x("div",{className:"harvest-locker-card__rules-section-label"},"Rules");if(E.appendChild(B),r.length===0){const D=x("div",{className:"harvest-locker-card__empty"},"No rules yet");E.appendChild(D),a.appendChild(E);return}const G=x("div",{className:"harvest-locker-card__list"});r.forEach(D=>{const Z=T(D);G.appendChild(Z);}),E.appendChild(G);const K=x("div",{className:"harvest-locker-card__rules-hint"});K.appendChild(x("span",{className:"harvest-locker-card__rules-hint--desktop"},"Click to edit · Right-click to delete")),K.appendChild(x("span",{className:"harvest-locker-card__rules-hint--mobile"},"Tap to edit · Long-press to delete")),E.appendChild(K),a.appendChild(E);}function T(E){const B=x("div",{className:"harvest-locker-rule-item"}),G=x("div",{className:"harvest-locker-rule-item__name"},E.name);B.appendChild(G);const K=x("div",{className:"harvest-locker-rule-item__badge"},E.mode);B.appendChild(K),B.addEventListener("contextmenu",W=>{W.preventDefault(),R(E.id);});let D=null,Z=false;return B.addEventListener("touchstart",()=>{Z=false,D=window.setTimeout(()=>{Z=true,R(E.id),navigator.vibrate&&navigator.vibrate(50);},500);}),B.addEventListener("touchend",()=>{D&&(clearTimeout(D),D=null),Z||$(E);}),B.addEventListener("touchmove",()=>{D&&(clearTimeout(D),D=null);}),B.addEventListener("click",()=>{$(E);}),B}function L(){if(!a||t==="bySpecies"&&!n)return;const E=x("div",{className:"harvest-locker-card__actions"});if(t==="bySpecies"&&n){const B=jt.getOverallRules();if(B.length>0){const G=jt.getSpeciesRules(n),K=new Set(G.map(W=>Wa(W))),D=B.filter(W=>!K.has(Wa(W))),Z=st({label:"Add Existing Rule",variant:"default",disabled:D.length===0,onClick:()=>N()});E.appendChild(Z);}}f=st({label:t==="bySpecies"?"Create Override Rule":"Create Rule",variant:"primary",onClick:()=>F()}),E.appendChild(f),a.appendChild(E);}function F(){qf({mode:t==="overall"?"overall":"species",species:n,onSave:E=>{t==="overall"?jt.addNewOverallRule(E.name,E.ruleMode,E.sizeCondition,E.mutationCondition):n&&jt.addNewSpeciesRule(n,E.name,E.ruleMode,E.sizeCondition,E.mutationCondition),g(),y();}});}function $(E){qf({mode:t==="overall"?"overall":"species",species:n,ruleId:E.id,initialData:{name:E.name,ruleMode:E.mode,sizeCondition:E.sizeCondition,mutationCondition:E.mutationCondition},onSave:B=>{jt.modifyRule(E.id,{name:B.name,mode:B.ruleMode,sizeCondition:B.sizeCondition,mutationCondition:B.mutationCondition}),g(),y();},onDelete:()=>{R(E.id);}});}function R(E){jt.removeRule(E),g(),y();}function N(){if(t!=="bySpecies"||!n)return;const E=jt.getOverallRules();if(E.length===0)return;const B=jt.getSpeciesRules(n),G=new Set(B.map(D=>Wa(D))),K=E.filter(D=>!G.has(Wa(D)));K.length!==0&&BL({species:n,existingRules:K,onSelect:()=>{g(),y();}});}function M(){g(),b(),y();}function C(){p.forEach(E=>E()),p.length=0,l?.destroy?.(),l=null,d?.destroy?.(),d=null,f=null,i=null,a=null,o=null;}return {root:o,render:M,destroy:C}}class qL{constructor(t={}){we(this,"handle",null);we(this,"options");this.options=t;}build(){return this.handle||(this.handle=YL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const XL=`
.harvest-locker-card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
    overflow: clip;
}

.harvest-locker-card__mode-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.harvest-locker-card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.harvest-locker-card__message,
.harvest-locker-card__empty {
    padding: 24px;
    text-align: center;
    font-size: 14px;
}

.harvest-locker-card__message {
    color: var(--muted);
}

.harvest-locker-card__empty {
    color: var(--fg);
}

.harvest-locker-card__message--compact {
    padding: 12px;
}

.harvest-locker-card__control {
    margin-bottom: 16px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPECIES SECTION HEADER (Title with divider)
   ═══════════════════════════════════════════════════════════════════════════ */

.harvest-locker-card__species-section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    margin-bottom: 16px;
    border-top: 1px solid var(--border);
}

.harvest-locker-card__species-section-sprite {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--soft);
    border-radius: 4px;
}

.harvest-locker-card__species-section-text {
    flex: 1;
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.harvest-locker-card__species-section-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--fg);
}

.harvest-locker-card__species-section-label {
    font-size: 10px;
    font-weight: 700;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RULES SECTION FRAME (cadran)
   ═══════════════════════════════════════════════════════════════════════════ */

.harvest-locker-card__rules-section {
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    background: color-mix(in oklab, var(--bg) 60%, transparent);
}

.harvest-locker-card__rules-section-label {
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid var(--border);
    background: color-mix(in oklab, var(--fg) 4%, transparent);
}

.harvest-locker-card__rules-section .harvest-locker-card__empty {
    padding: 16px;
}

.harvest-locker-card__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    max-height: 272px; /* ~4 items visible, scrollable après */
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}

.harvest-locker-card__list::-webkit-scrollbar {
    width: 6px;
}

.harvest-locker-card__list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}

.harvest-locker-card__list::-webkit-scrollbar-track {
    background: transparent;
}

.harvest-locker-card__rules-hint {
    padding: 6px 8px 4px;
    text-align: center;
}

.harvest-locker-card__rules-hint--desktop,
.harvest-locker-card__rules-hint--mobile {
    font-size: 11px;
    color: color-mix(in oklab, var(--fg) 40%, transparent);
    font-style: italic;
}

.harvest-locker-card__rules-hint--mobile {
    display: none;
}

@media (hover: none) and (pointer: coarse) {
    .harvest-locker-card__rules-hint--desktop {
        display: none;
    }
    .harvest-locker-card__rules-hint--mobile {
        display: inline;
    }
}

.harvest-locker-card__actions {
    display: flex;
    gap: 8px;
    justify-content: center;
    width: 100%;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RULE ITEM
   ═══════════════════════════════════════════════════════════════════════════ */

.harvest-locker-rule-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.harvest-locker-rule-item:hover {
    background: var(--soft);
    border-color: var(--accent);
}

.harvest-locker-rule-item__name {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--fg);
}

.harvest-locker-rule-item__badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    background: color-mix(in oklab, var(--accent) 20%, transparent);
    color: var(--accent);
    border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   RULE EDITOR MODAL
   ═══════════════════════════════════════════════════════════════════════════ */

.harvest-locker-modal {
    scrollbar-gutter: stable;
}

.harvest-locker-modal::-webkit-scrollbar {
    width: 10px;
}

.harvest-locker-modal::-webkit-scrollbar-thumb {
    background: var(--muted);
    border-radius: 8px;
}

.harvest-locker-modal::-webkit-scrollbar-track {
    background: transparent;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREVIEW GRID
   ═══════════════════════════════════════════════════════════════════════════ */

.harvest-locker-preview-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
}

@media (max-width: 768px) {
    .harvest-locker-rule-item {
        padding: 10px;
    }

    .harvest-locker-rule-item__name {
        font-size: 13px;
    }
}

@media (max-width: 480px) {
    .harvest-locker-rule-item {
        gap: 8px;
        padding: 8px;
    }

    .harvest-locker-card__list {
        max-height: 300px;
    }
}
`;function JL(e){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.innerHTML=e?'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>':'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',t}async function QL(e,t,n){if(!$e.isReady()){t.appendChild(Ha(n));return}try{const o=Oe.get("eggs")?.[e]?.spriteId;if(!o){t.appendChild(Ha(n));return}const i=await $e.toCanvas(o,{boundsMode:"padded"});i?(i.style.maxWidth=`${n}px`,i.style.maxHeight=`${n}px`,i.style.width="auto",i.style.height="auto",i.style.display="block",t.appendChild(i)):t.appendChild(Ha(n));}catch{t.appendChild(Ha(n));}}function Ha(e){return x("div",{style:`width:${e}px;height:${e}px;background:color-mix(in oklab, var(--accent) 20%, transparent);border-radius:6px;`})}function ZL(e={}){let t=null,n=null;n=r();function r(){return t=x("div",{className:"egg-locker-card__wrapper"}),o(),lt({title:"Egg Hatching",subtitle:"Prevent hatching specific eggs",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t)}function o(){if(!t)return;t.replaceChildren();const d=lr.getAvailableEggs();if(d.length===0){t.appendChild(x("div",{className:"egg-locker-card__empty"},"No eggs available"));return}const f=new Set(lr.getBlockedEggs()),p=Oe.get("eggs"),h=x("div",{className:"egg-locker-card__grid"});for(const g of d){const y=p?.[g]?.name??g;h.appendChild(i(g,f.has(g),y));}t.appendChild(h);}function i(d,f,p){const h=x("div",{className:"egg-locker-item"+(f?" egg-locker-item--locked":"")}),g=x("div",{className:"egg-locker-item__sprite"});QL(d,g,48),h.appendChild(g),h.appendChild(x("div",{className:"egg-locker-item__name"},p));const y=x("div",{className:"egg-locker-item__lock"+(f?" egg-locker-item__lock--locked":"")});return y.appendChild(JL(f)),h.appendChild(y),h.addEventListener("click",()=>{f?lr.unblockEgg(d):lr.blockEgg(d),o();}),h}function a(){o();}function l(){t=null,n=null;}return {root:n,render:a,destroy:l}}class eM{constructor(t={}){we(this,"handle",null);we(this,"options");this.options=t;}build(){return this.handle||(this.handle=ZL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const tM=`
/* ═══════════════════════════════════════════════════════════════════════════
   GRID
   ═══════════════════════════════════════════════════════════════════════════ */

.egg-locker-card__wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.egg-locker-card__empty {
    padding: 24px;
    text-align: center;
    color: color-mix(in oklab, var(--fg) 50%, #9ca3af);
    font-size: 14px;
}

.egg-locker-card__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    gap: 10px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   EGG ITEM
   ═══════════════════════════════════════════════════════════════════════════ */

.egg-locker-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 14px 8px 12px;
    background: var(--bg);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.egg-locker-item:hover {
    border-color: color-mix(in oklab, var(--fg) 30%, var(--border));
    background: color-mix(in oklab, var(--fg) 4%, var(--bg));
}

.egg-locker-item--locked {
    border-color: var(--accent);
    background: color-mix(in oklab, var(--accent) 8%, var(--bg));
    box-shadow: 0 0 6px color-mix(in oklab, var(--accent) 20%, transparent);
}

.egg-locker-item--locked:hover {
    box-shadow: 0 0 10px color-mix(in oklab, var(--accent) 30%, transparent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPRITE + LABEL
   ═══════════════════════════════════════════════════════════════════════════ */

.egg-locker-item__sprite {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.egg-locker-item__name {
    font-size: 12px;
    font-weight: 500;
    color: var(--fg);
    text-align: center;
    line-height: 1.3;
    max-width: 88px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOCK ICON
   ═══════════════════════════════════════════════════════════════════════════ */

.egg-locker-item__lock {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.egg-locker-item__lock svg {
    width: 18px;
    height: 18px;
    color: color-mix(in oklab, var(--fg) 50%, transparent);
    transition: color 0.2s ease;
}

.egg-locker-item__lock--locked svg {
    color: var(--accent);
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 480px) {
    .egg-locker-card__grid {
        grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
        gap: 8px;
    }

    .egg-locker-item {
        padding: 10px 6px;
    }

    .egg-locker-item__sprite {
        width: 40px;
        height: 40px;
    }

    .egg-locker-item__name {
        font-size: 11px;
        max-width: 72px;
    }
}
`;function nM(e={}){let t=null,n=null,r=null,o=null;const i=[];n=a();function a(){t=x("div",{className:"decor-locker-card__wrapper",style:"display: flex; flex-direction: column; gap: 16px;"}),l();const p=lt({title:"Decor Pickup",subtitle:"Prevent decor pickups",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t),h=()=>d();return window.addEventListener(gt.DECOR_LOCKER_LOCKS_UPDATED,h),i.push(()=>window.removeEventListener(gt.DECOR_LOCKER_LOCKS_UPDATED,h)),p}function l(){if(!t)return;const p=cr.getAvailableDecors().length,g=cr.getBlockedDecors().length===p&&p>0;if(r)r.setChecked(g,true),o&&(o.textContent=g?"Decors Unpickable":"Decors Pickable");else {t.replaceChildren();const y=x("div",{style:`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: color-mix(in oklab, var(--accent) 10%, transparent);
                    border-radius: 8px;
                `});o=x("div",{style:"font-size: 14px; font-weight: 500;"},g?"Decors Unpickable":"Decors Pickable"),r=tr({checked:g,size:"md",onChange:b=>{b?cr.blockAllDecors():cr.unblockAllDecors();}}),i.push(()=>r?.destroy()),y.appendChild(o),y.appendChild(r.root),t.appendChild(y);}}function d(){l();}function f(){i.forEach(p=>p()),i.length=0,t=null,n=null;}return {root:n,render:d,destroy:f}}class rM{constructor(t={}){we(this,"handle",null);we(this,"options");this.options=t;}build(){return this.handle||(this.handle=nM(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const oM=`
.plant-selector {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.plant-selector__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 8px;
    max-height: 240px;
    overflow-y: auto;
    padding: 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}

.plant-selector__grid::-webkit-scrollbar {
    width: 6px;
}

.plant-selector__grid::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
}

.plant-selector__grid::-webkit-scrollbar-track {
    background: transparent;
}

.plant-selector__empty {
    grid-column: 1 / -1;
    padding: 24px;
    text-align: center;
    color: var(--fg);
    font-size: 14px;
}

.plant-selector__item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.plant-selector__item:hover {
    background: var(--soft);
    border-color: var(--accent);
}

.plant-selector__item--selected {
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    border-color: var(--accent);
}

.plant-selector__badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: var(--accent);
    color: white;
    font-size: 9px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.plant-selector__sprite {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.plant-selector__name {
    font-size: 10px;
    color: var(--fg);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
    .plant-selector__item {
        padding: 6px;
    }

    .plant-selector__name {
        font-size: 9px;
    }
}

@media (max-width: 480px) {
    .plant-selector__grid {
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        gap: 6px;
        max-height: 250px;
    }

    .plant-selector__item {
        gap: 2px;
        padding: 4px;
    }

    .plant-selector__sprite {
        width: 36px;
        height: 36px;
    }

    .plant-selector__name {
        font-size: 8px;
    }
}
`;class iM extends hr{constructor(){super({id:"tab-locker",label:"Locker"});we(this,"harvestLockerCardPart",null);we(this,"eggLockerCardPart",null);we(this,"decorLockerCardPart",null);}async preload(){await jL();}build(n){const r=n.getRootNode();un(r,XL,"harvest-locker-card-styles"),un(r,oM,"plant-selector-styles"),un(r,tM,"egg-locker-card-styles");const o=this.createGrid("12px");o.id="locker",n.appendChild(o),this.initializeHarvestLockerCardPart(o),this.initializeEggLockerCardPart(o),this.initializeDecorLockerCardPart(o);}render(n){const r=this.harvestLockerCardPart,o=this.eggLockerCardPart,i=this.decorLockerCardPart;this.harvestLockerCardPart=null,this.eggLockerCardPart=null,this.decorLockerCardPart=null,super.render(n),this.harvestLockerCardPart=r,this.eggLockerCardPart=o,this.decorLockerCardPart=i;}destroy(){this.harvestLockerCardPart&&(this.harvestLockerCardPart.destroy(),this.harvestLockerCardPart=null),this.eggLockerCardPart&&(this.eggLockerCardPart.destroy(),this.eggLockerCardPart=null),this.decorLockerCardPart&&(this.decorLockerCardPart.destroy(),this.decorLockerCardPart=null);}initializeHarvestLockerCardPart(n){if(!this.harvestLockerCardPart){const o=er();this.harvestLockerCardPart=new qL({defaultExpanded:o.get().ui.harvestLockerExpanded,defaultMode:o.get().ui.harvestLockerMode,defaultSelectedSpecies:o.get().ui.selectedSpecies,defaultSearchQuery:o.get().ui.searchQuery,onExpandChange:HL});}const r=this.harvestLockerCardPart.build();n.appendChild(r),this.harvestLockerCardPart.render();}initializeEggLockerCardPart(n){if(!this.eggLockerCardPart){const o=er();this.eggLockerCardPart=new eM({defaultExpanded:o.get().ui.eggLockerExpanded,onExpandChange:VL});}const r=this.eggLockerCardPart.build();n.appendChild(r),this.eggLockerCardPart.render();}initializeDecorLockerCardPart(n){if(!this.decorLockerCardPart){const o=er();this.decorLockerCardPart=new rM({defaultExpanded:o.get().ui.decorLockerExpanded,onExpandChange:KL});}const r=this.decorLockerCardPart.build();n.appendChild(r),this.decorLockerCardPart.render();}}let bc=null,vc=null,yc=null;function ov(){return bc||(bc=new yE),bc}function iv(){return vc||(vc=new a2),vc}function av(){return yc||(yc=new iM),yc}function aM(e){const t=[new n0(e),iv(),new R_(e),new pL,new SL(e),av()];return t.push(new JP),t.push(ov()),t}async function sM(){const e=iv(),t=av(),n=ov();await Promise.all([e.preload(),t.preload(),n.preload()]);}const lM="https://raw.githubusercontent.com/Ariedam64/Gemini/main/dist/gemini.user.js",cM=600*1e3;function sv(){try{return GM_info?.script?.version??"0.0.0"}catch{return "0.0.0"}}function dM(){return new Promise(e=>{try{GM_xmlhttpRequest({method:"GET",url:lM,timeout:1e4,onload(t){try{const n=t.responseText.match(/@version\s+([\d.]+)/);e(n?n[1]:null);}catch{e(null);}},onerror(){e(null);},ontimeout(){e(null);}});}catch{e(null);}})}function uM(e,t){const n=i=>i.split(".").map(a=>parseInt(a,10)||0),r=n(e),o=n(t);for(let i=0;i<Math.max(r.length,o.length);i++){const a=r[i]??0,l=o[i]??0;if(l>a)return  true;if(l<a)return  false}return  false}function pM(e){const t=sv();let n=null,r=false;async function o(){if(r)return;const i=await dM();r||e({local:t,remote:i,hasUpdate:i!==null&&uM(t,i)});}return o(),n=setInterval(o,cM),()=>{r=true,n!==null&&(clearInterval(n),n=null);}}const xc="https://github.com/Ariedam64/Gemini/releases/latest";function fM(){const e=document.createElement("div");e.className="gemini-footer";const t=document.createElement("span");t.className="gemini-footer__label",t.textContent="Gemini";const n=document.createElement("span");n.className="gemini-footer__sep",n.textContent="·";const r=document.createElement("span");r.className="gemini-footer__version",r.textContent=`v${sv()}`;const o=document.createElement("a");o.className="gemini-footer__update-btn",o.textContent="Update ↗",o.href=xc,o.target="_blank",o.rel="noopener noreferrer",o.style.display="none",o.addEventListener("click",a=>{a.preventDefault();try{GM_openInTab(xc,{active:!0});}catch{window.open(xc,"_blank");}}),e.append(t,n,r,o);function i(a){a.hasUpdate&&a.remote?(r.textContent=`v${a.local} → v${a.remote}`,o.style.display="inline-flex",e.classList.add("gemini-footer--has-update")):(r.textContent=`v${a.local}`,o.style.display="none",e.classList.remove("gemini-footer--has-update"));}return {root:e,update:i,destroy(){e.remove();}}}function hM(e){const{shadow:t,initialOpen:n}=e,r=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=x("div",{className:"gemini-tabbar"}),i=x("div",{className:"gemini-content",id:"content"}),a=x("div",{className:"gemini-resizer",title:"Resize"}),d=fM().root,f=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,d,a);const p=x("div",{className:"gemini-wrapper"},r);return t.append(p),{panel:r,tabbar:o,content:i,footer:d,resizer:a,closeButton:f,wrapper:p}}function mM(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:l}=e;let d=a,f=l;function p(){const F=Ct.detect(),$=Math.round(he.visualViewport?.width??he.innerWidth??0);if(F.platform==="mobile"||F.os==="ios"||F.os==="android"){const R=getComputedStyle(r.host),N=parseFloat(R.getPropertyValue("--inset-l"))||0,M=parseFloat(R.getPropertyValue("--inset-r"))||0,C=Math.max(280,$-Math.round(N+M));d=280,f=C;}else d=a,f=l;return {min:d,max:f}}function h(F){return Math.max(d,Math.min(f,Number(F)||i))}function g(F){const $=h(F);n.style.setProperty("--w",`${$}px`),o($);}p();const y=Ct.detect(),b=!(y.platform==="mobile"||y.os==="ios"||y.os==="android");let S=false;const _=F=>{if(!S)return;F.preventDefault();const $=Math.round(he.innerWidth-F.clientX);g($);},I=()=>{S&&(S=false,document.body.style.cursor="",he.removeEventListener("mousemove",_),he.removeEventListener("mouseup",I));},T=F=>{b&&(F.preventDefault(),S=true,document.body.style.cursor="ew-resize",he.addEventListener("mousemove",_),he.addEventListener("mouseup",I));};t.addEventListener("mousedown",T);function L(){t.removeEventListener("mousedown",T),he.removeEventListener("mousemove",_),he.removeEventListener("mouseup",I);}return {calculateResponsiveBounds:p,constrainWidthToLimits:h,setHudWidth:g,destroy:L}}function gM(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=d=>d.ctrlKey&&d.shiftKey&&d.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(d){const f=t.classList.contains("open");if(i&&d.key==="Escape"&&f){r();return}o(d)&&(d.preventDefault(),d.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function l(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:l}}const bM=`
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
    height: calc(100dvh - var(--tab-h) - 38px);
    scrollbar-gutter: stable;
  }
  .gemini-content::-webkit-scrollbar {
    width: 10px;
  }
  .gemini-content::-webkit-scrollbar-thumb {
    background: var(--muted);
    border-radius: 8px;
  }

  /* ---- Footer (version + update) ---- */
  .gemini-footer {
    flex-shrink: 0;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 14px;
    border-top: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
    background-color: color-mix(in oklab, var(--bg) 96%, transparent);
    transition: background-color .28s ease, border-color .28s ease;
  }

  .gemini-footer__label {
    font-size: 12px;
    font-weight: 600;
    color: color-mix(in oklab, var(--fg) 55%, transparent);
    letter-spacing: 0.03em;
    flex-shrink: 0;
  }

  .gemini-footer__sep {
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 20%, transparent);
    flex-shrink: 0;
  }

  .gemini-footer__version {
    font-size: 12px;
    color: color-mix(in oklab, var(--fg) 50%, transparent);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    transition: color .2s ease;
  }

  .gemini-footer--has-update .gemini-footer__version {
    color: color-mix(in oklab, var(--fg) 80%, transparent);
  }

  .gemini-footer__update-btn {
    display: none;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 6px;
    border: 1px solid color-mix(in oklab, var(--accent) 60%, transparent);
    background: color-mix(in oklab, var(--accent) 12%, transparent);
    color: var(--accent);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: background .15s ease, border-color .15s ease, color .15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .gemini-footer__update-btn:hover {
    background: color-mix(in oklab, var(--accent) 22%, transparent);
    border-color: var(--accent);
  }
}
`,vM=`
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
`,yM=`
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
`,xM=`
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
`,wM=`
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
  
`,CM=`
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
`,kM=`
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
`,SM=`
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
`,AM=`
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
`,EM=`
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
`,_M=`
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
`,IM=`
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
`,TM=`
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
`,PM=`
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
`,LM=`
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
`,MM=`
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
`,RM=`
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
`,FM=`
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
`,OM=`
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
`,NM=`
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
`,DM=`
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
`,$M=`
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
`,BM=`
.sound-picker{
  display:flex;
  flex-direction:column;
  gap:0px;
  min-width:0;
}

.sound-picker__header{
  display:flex;
  flex-direction:column;
  gap:4px;
}

.sound-picker__label{
  font-size:13px;
  font-weight:600;
  color: var(--fg);
}

.sound-picker__hint{
  font-size:12px;
  color: color-mix(in oklab, var(--fg) 70%, #9ca3af);
}

.sound-picker__zone{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:12px;
  padding:16px;
  min-height:72px;
  border-radius:16px;
  border:1px dashed color-mix(in oklab, var(--border) 80%, transparent);
  background: color-mix(in oklab, var(--soft) 70%, transparent);
  transition: border-color .2s ease, background .2s ease, box-shadow .2s ease, transform .08s ease;
  cursor:pointer;
}

.sound-picker__zone:focus-visible{
  outline: none;
  box-shadow:
    0 0 0 2px color-mix(in oklab, var(--accent) 40%, transparent),
    0 8px 20px color-mix(in oklab, var(--shadow) 22%, transparent);
}

.sound-picker__zone:hover{
  border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
}

.sound-picker__zone.is-dragover{
  border-color: color-mix(in oklab, var(--accent) 70%, var(--border));
  background: color-mix(in oklab, var(--accent) 10%, var(--soft));
  box-shadow: 0 12px 26px color-mix(in oklab, var(--shadow) 25%, transparent);
  transform: translateY(-1px);
}

.sound-picker.is-disabled .sound-picker__zone{
  opacity:.6;
  cursor:not-allowed;
}

.sound-picker__zone-text{
  display:flex;
  flex-direction:column;
  gap:4px;
  min-width:0;
}

.sound-picker__zone-title{
  font-size:13px;
  font-weight:600;
  color: var(--fg);
}

.sound-picker__zone-subtitle{
  font-size:12px;
  color: color-mix(in oklab, var(--fg) 70%, #9ca3af);
}

.sound-picker__pick{
  flex:0 0 auto;
  min-height:44px;
}

.sound-picker__input{
  display:none;
}

.sound-picker__status{
  min-height:16px;
  font-size:12px;
  color: color-mix(in oklab, var(--fg) 70%, #9ca3af);
}

.sound-picker__status.is-error{
  color: color-mix(in oklab, #f87171 75%, var(--fg));
}

.sound-picker__list{
  --sp-gap: 8px;
  --sp-row-h: 44px;
  display:flex;
  flex-direction:column;
  gap: var(--sp-gap);
}

.sound-picker__list.is-scrollable{
  max-height: calc((var(--sp-row-h) * 3) + (var(--sp-gap) * 2));
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-gutter: stable;
}

.sound-picker__list.is-scrollable::-webkit-scrollbar {
  width: 10px;
}
.sound-picker__list.is-scrollable::-webkit-scrollbar-track {
  background: transparent;
}
.sound-picker__list.is-scrollable::-webkit-scrollbar-thumb {
  background: var(--muted);
  border-radius: 8px;
}
.sound-picker__list.is-scrollable::-webkit-scrollbar-thumb:hover {
  background: color-mix(in oklab, var(--muted) 150%, transparent);
}

.sound-picker__empty{
  padding:10px 12px;
  border-radius:12px;
  border:1px dashed color-mix(in oklab, var(--border) 80%, transparent);
  background: color-mix(in oklab, var(--soft) 70%, transparent);
  color: color-mix(in oklab, var(--fg) 70%, #94a3b8);
  font-size:12px;
  text-align:center;
}

.sound-picker__item{
  display:flex;
  flex-direction:column;
  align-items:stretch;
  justify-content:center;
  gap:6px;
  padding:6px 10px;
  border-radius:12px;
  border:1px solid color-mix(in oklab, var(--border) 75%, transparent);
  background: color-mix(in oklab, var(--soft) 72%, transparent);
  min-height: var(--sp-row-h);
  min-width:0;
}

.sound-picker__item-top{
  display:grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items:center;
  column-gap:10px;
  min-width:0;
  width:100%;
}

.sound-picker__item.is-playing{
  border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
  box-shadow: 0 10px 22px color-mix(in oklab, var(--shadow) 18%, transparent);
}

.sound-picker__item-name{
  display:block;
  min-width:0;
  overflow:hidden;
}

.sound-picker__item-label{
  font-size:13px;
  font-weight:600;
  color: var(--fg);
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  line-height:1.2;
  display:block;
}

.sound-picker__rename{
  flex:1 1 auto;
  min-width:0;
}

.sound-picker__item-actions{
  display:flex;
  align-items:center;
  gap:6px;
  flex-wrap: nowrap;
  flex:0 0 auto;
  white-space:nowrap;
  justify-self:end;
}

.sound-picker__item-btn{
  appearance:none;
  border:1px solid color-mix(in oklab, var(--border) 70%, transparent);
  background: color-mix(in oklab, var(--soft) 78%, transparent);
  color: var(--fg);
  border-radius:10px;
  min-height:32px;
  padding:0 8px;
  font-size:11.5px;
  font-weight:600;
  cursor:pointer;
  transition: border-color .2s ease, background .2s ease, transform .05s ease;
}

.sound-picker__item-btn--play{
  min-width:48px;
  text-align:center;
}

.sound-picker__item-btn:hover{
  border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
}

.sound-picker__item-btn:active{
  transform: translateY(1px);
}

.sound-picker__item-btn:disabled{
  opacity:.6;
  cursor:not-allowed;
}

.sound-picker__item-btn--danger{
  border-color: color-mix(in oklab, #f87171 45%, var(--border));
  background: color-mix(in oklab, #f87171 18%, var(--soft));
}

.sound-picker__item-btn--danger:hover{
  border-color: color-mix(in oklab, #f87171 70%, var(--border));
}

@media (max-width: 560px){
  .sound-picker__zone{
    flex-direction:column;
    align-items:stretch;
  }
  .sound-picker__pick{
    width:100%;
  }
  .sound-picker__item-btn{
    min-height:44px;
    padding:0 12px;
    font-size:12px;
  }
}
`,zM=`
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
`,jM={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function GM(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,jM),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function UM(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function WM(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:l,onThemeChange:d,buildSections:f,initialTab:p,onTabChange:h,toggleCombo:g=le=>le.ctrlKey&&le.shiftKey&&le.key.toLowerCase()==="u",closeOnEscape:y=true,minWidth:b=420,maxWidth:S=720}=e,{host:_,shadow:I}=GM(t),T=[[vM,"variables"],[yM,"primitives"],[xM,"utilities"],[bM,"hud"],[wM,"card"],[Fg,"badge"],[CM,"button"],[TM,"checkbox"],[kM,"input"],[SM,"label"],[AM,"navTabs"],[EM,"searchBar"],[_M,"select"],[IM,"switch"],[PM,"table"],[LM,"teamListItem"],[MM,"timeRangePicker"],[RM,"tooltip"],[FM,"slider"],[OM,"reorderableList"],[NM,"colorPicker"],[DM,"log"],[$M,"segmentedControl"],[BM,"soundPicker"],[zM,"settings"],[Rg,"teamCard"]];for(let le=0;le<T.length;le++){const[ye,Ie]=T[le];un(I,ye,Ie),le%5===4&&await UM();}const{panel:L,tabbar:F,content:$,footer:R,resizer:N,closeButton:M,wrapper:C}=hM({shadow:I,initialOpen:r}),E=pM(le=>{const ye=R.querySelector(".gemini-footer__version"),Ie=R.querySelector(".gemini-footer__update-btn");ye&&(ye.textContent=le.hasUpdate&&le.remote?`v${le.local} → v${le.remote}`:`v${le.local}`),Ie&&(Ie.style.display=le.hasUpdate?"inline-flex":"none"),R.classList.toggle("gemini-footer--has-update",le.hasUpdate);});function B(le){L.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:le},bubbles:true})),i?.(le);}function G(le){const ye=L.classList.contains("open");L.classList.toggle("open",le),L.setAttribute("aria-hidden",le?"false":"true"),le!==ye&&B(le);}G(r),M.addEventListener("click",le=>{le.preventDefault(),le.stopPropagation(),G(false);});const K=qy({host:_,themes:a,initialTheme:l,onThemeChange:d}),D=mM({resizer:N,host:_,shadow:I,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:b,maxWidth:S});D.setHudWidth(n);const Z=f({applyTheme:K.applyTheme,initialTheme:l,getCurrentTheme:K.getCurrentTheme,setHUDWidth:D.setHudWidth,setHUDOpen:G}),W=new Qv(Z,$,{applyTheme:K.applyTheme,getCurrentTheme:K.getCurrentTheme}),te=Z.map(le=>({id:le.id,label:le.label})),re=p&&Z.some(le=>le.id===p)?p:te[0]?.id||"",ne=eh(te,re,le=>{W.activate(le),h?.(le);});ne.root.style.flex="1 1 auto",ne.root.style.minWidth="0",F.append(ne.root,M);const oe={"tab-pets":"pets","tab-locker":"locker","tab-alerts":"alerts","tab-avatar":"avatar","tab-room":"room"};function V(){const le=it(_t.CONFIG,{pets:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true}});for(const[ye,Ie]of Object.entries(oe))le[Ie]?.enabled??true?ne.showTab(ye):ne.hideTab(ye);}function Q(le){const{key:ye}=le.detail;(ye===_t.CONFIG||ye==="feature:config")&&V();}window.addEventListener(gt.STORAGE_CHANGE,Q),V();let O=re;if(!ne.isTabVisible(re)){const le=ne.getVisibleTabs();le.length>0&&(O=le[0]);}O&&W.activate(O);const j=gM({panel:L,onToggle:()=>G(!L.classList.contains("open")),onClose:()=>G(false),toggleCombo:g,closeOnEscape:y}),X=()=>{ne.recalc();const le=parseInt(getComputedStyle(_).getPropertyValue("--w"))||n;D.calculateResponsiveBounds(),D.setHudWidth(le);};he.addEventListener("resize",X);const de=le=>{const ye=le.detail?.width;ye?D.setHudWidth(ye):D.setHudWidth(n),ne.recalc();};_.addEventListener("gemini:layout-resize",de);function ce(){E(),window.removeEventListener(gt.STORAGE_CHANGE,Q),j.destroy(),D.destroy(),he.removeEventListener("resize",X),_.removeEventListener("gemini:layout-resize",de);}return {host:_,shadow:I,wrapper:C,panel:L,content:$,setOpen:G,setWidth:D.setHudWidth,sections:Z,manager:W,nav:ne,destroy:ce}}const oo={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},ui={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function HM(){return {isOpen:it(oo.isOpen,ui.isOpen),width:it(oo.width,ui.width),theme:it(oo.theme,ui.theme),activeTab:it(oo.activeTab,ui.activeTab)}}function Va(e,t){ct(oo[e],t);}function VM(e,t){return it(oo[e],t)}const KM="https://i.imgur.com/k5WuC32.png";function YM(e){let t=e.iconUrl||KM;const n=e.ariaLabel||"Open Gemini";let r=null,o=null,i=null,a=false,l=null,d=null;function f(){const L=document.querySelector('[data-testid="weather-status-button"], [data-testid="friend-bonus-button"]');if(!L)return null;let F=L.parentElement;for(;F&&F!==document.body;){if(F.querySelector("button.chakra-button"))return F;F=F.parentElement;}return null}function h(L){const F=Array.from(L.querySelectorAll("button.chakra-button"));if(!F.length)return {refBtn:null,refWrapper:null};const $=F.filter(B=>B.dataset.mghBtn!=="true"&&(B.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),R=$.length?$:F,N=R.length>=2?R.length-2:R.length-1,M=R[N],C=M.parentElement,E=C&&C.parentElement===L&&C.tagName==="DIV"?C:null;return {refBtn:M,refWrapper:E}}function g(L,F,$){const R=L.cloneNode(false);R.type="button",R.setAttribute("aria-label",F),R.title=F,R.dataset.mghBtn="true",R.style.pointerEvents="auto",R.removeAttribute("id");const N=document.createElement("img");return N.src=$,N.alt="MGH",N.style.pointerEvents="none",N.style.userSelect="none",N.style.width="100%",N.style.height="100%",N.style.transform="scale(1.3)",N.style.objectFit="contain",N.style.display="block",N.style.margin="auto",R.appendChild(N),R.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation();try{e.onClick?.();}catch{}}),R}function y(){if(a)return  false;a=true;let L=false;try{const F=f();if(!F)return !1;l!==F&&(l=F);const{refBtn:$,refWrapper:R}=h(F);if(!$)return !1;o=F.querySelector('div[data-mgh-wrapper="true"]'),!o&&R&&(o=R.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),L=!0);const N=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=N),r||(r=g($,n,t),o?o.appendChild(r):r.parentElement!==F&&F.appendChild(r),L=!0),o&&o.parentElement!==F&&(F.appendChild(o),L=!0);const M=F;if(M&&M!==d){try{I.disconnect();}catch{}d=M,I.observe(d,{childList:!0,subtree:!0});}return L}finally{a=false;}}const b=document.getElementById("App")||document.body;let S=null,_=false;const I=new MutationObserver(()=>{_&&r&&document.contains(r)||(r&&!document.contains(r)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),_=false,r=null,o=null),S===null&&(S=window.setTimeout(()=>{if(S=null,y()&&r&&document.contains(r)&&(_=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),o)){const F=o.parentElement;F&&F.lastElementChild!==o&&F.appendChild(o);}},100)));});return y()&&r&&document.contains(r)?(_=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),I.observe(b,{childList:true,subtree:true}),i=()=>I.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const lv=[];function qM(){return lv.slice()}function Xf(e){lv.push(e);}function XM(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function JM(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const wc=Symbol.for("ariesmod.ws.handlers.patched");function Mt(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return Xf(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Xf(r),r}function QM(e,t=qM(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[wc])return ()=>{};e[wc]=true;const i={ws:e,pageWindow:r,debug:o},a=h=>{for(const g of t)try{if(!g.match(h))continue;if(g.handle(h,i)===!0)return}catch(y){o&&console.error("[WS] handler error",y,h);}},l=h=>{const g=JM(h.data),y=XM(g);a({kind:"message",raw:h.data,data:g,type:y});},d=h=>{a({kind:"close",code:h.code,reason:h.reason,wasClean:h.wasClean,event:h});},f=h=>a({kind:"open",event:h}),p=h=>a({kind:"error",event:h});return e.addEventListener("message",l),e.addEventListener("close",d),e.addEventListener("open",f),e.addEventListener("error",p),()=>{try{e.removeEventListener("message",l);}catch{}try{e.removeEventListener("close",d);}catch{}try{e.removeEventListener("open",f);}catch{}try{e.removeEventListener("error",p);}catch{}try{delete e[wc];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Mt(kn.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Mt(kn.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Mt(kn.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Mt(kn.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Mt(kn.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Mt(kn.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Mt(kn.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Mt(kn.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Mt(kn.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Mt(kn.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Mt(nr.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Mt(nr.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Mt(nr.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Mt(nr.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Mt(nr.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Mt(nr.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Mt(nr.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Mt(nr.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});Le(me.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));Le(me.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));Le(me.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));Le(me.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));Le(me.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));Le(me.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));Le(me.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));Le(me.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));Le(me.GrowEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] GrowEgg"),true));Le(me.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));Le(me.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));Le(me.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));Le(me.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));Le(me.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));Le(me.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));Le(me.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));Le(me.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));Le(me.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));Le(me.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));Le(me.ToggleLockItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleLockItem"),true));Le(me.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));Le(me.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));Le(me.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));Le(me.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));Le(me.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));Le(me.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));Le(me.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));Le(me.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));Le(me.SwapPetFromStorage,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPetFromStorage"),true));Le(me.PickupPet,(e,t)=>(t.debug&&console.log("[MW][Pets] PickupPet"),true));Le(me.MovePetSlot,(e,t)=>(t.debug&&console.log("[MW][Pets] MovePetSlot"),true));Le(me.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));Le(me.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));Le(me.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));Le(me.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));Le(me.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));Le(me.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));Le(me.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));Le(me.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));Le(me.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));Le(me.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));Le(me.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));Le(me.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));Le(me.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));Le(me.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));Le(me.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));Le(me.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function ZM(e={}){const t=e.pageWindow??he,n=e.pollMs??500,r=!!e.debug,o=[];o.push(PS(t,{debug:r})),o.push(OT({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=l=>{if(i){try{i();}catch{}i=null;}l&&(i=QM(l,e.handlers,{debug:r,pageWindow:t}));};return a(ws(t).ws),o.push(Bm(l=>a(l.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>ws(t).ws,dispose:()=>{for(let l=o.length-1;l>=0;l--)try{o[l]();}catch{}if(i){try{i();}catch{}i=null;}}}}let Ka=null;function eR(e={}){return Ka||(Ka=ZM(e),Ka)}const tR=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,nR=`
@keyframes bellRing {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(-10deg); }
  20%, 40% { transform: rotate(10deg); }
  50% { transform: rotate(-5deg); }
  60% { transform: rotate(5deg); }
  70% { transform: rotate(0deg); }
}

.alert-btn-ringing {
  animation: bellRing 0.6s ease-in-out;
}
`;let Jf=false;function rR(){if(Jf)return;Jf=true;const e=document.createElement("style");e.textContent=nR,document.head.appendChild(e);}function oR(){const e=document.querySelector('[data-testid="weather-status-button"], [data-testid="friend-bonus-button"]');if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(t.querySelector("button.chakra-button"))return t;t=t.parentElement;}return null}function iR(e){const t=Array.from(e.querySelectorAll("button.chakra-button"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(l=>l.dataset.alertBtn!=="true"&&(l.getAttribute("aria-label")||"")!=="Alerts"),r=n.length?n:t,o=r[r.length-1]||null,i=o?.parentElement,a=i&&i.parentElement===e&&i.tagName==="DIV"?i:null;return {refBtn:o,refWrapper:a}}function aR(e,t,n){const r=e.cloneNode(false);r.type="button",r.setAttribute("aria-label",t),r.title=t,r.dataset.alertBtn="true",r.style.pointerEvents="auto",r.style.position="relative",r.removeAttribute("id");const o=document.createElement("div");return o.innerHTML=n,o.dataset.alertIcon="true",o.style.pointerEvents="none",o.style.userSelect="none",o.style.width="76%",o.style.height="76%",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.margin="auto",r.appendChild(o),r}function sR(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function lR(e){rR();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:tR,n=e.ariaLabel||"Alerts";let r=null,o=null,i=null,a=null,l=false,d=null,f=null,p=null;function h(){if(l)return  false;l=true;let I=false;try{const T=oR();if(!T)return !1;d!==T&&(d=T);const{refBtn:L,refWrapper:F}=iR(T);if(!L)return !1;o=T.querySelector('div[data-alert-wrapper="true"]'),!o&&F&&(o=F.cloneNode(!1),o.dataset.alertWrapper="true",o.removeAttribute("id"),I=!0);const $=o?.querySelector('button[data-alert-btn="true"]')||null;r||(r=$),r||(r=aR(L,n,t),r.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation();try{e.onClick?.();}catch{}}),i=sR(),r.appendChild(i),o?o.appendChild(r):r.parentElement!==T&&T.appendChild(r),I=!0);const R=T.querySelector('[data-mgh-wrapper="true"]')??T.querySelector('[data-mgh-btn="true"]');o&&o.parentElement!==T?(R&&R.parentElement===T?T.insertBefore(o,R):T.appendChild(o),I=!0):!o&&r&&r.parentElement!==T&&(R&&R.parentElement===T?T.insertBefore(r,R):T.appendChild(r),I=!0);const N=T;if(N&&N!==f){try{S.disconnect();}catch{}f=N,S.observe(f,{childList:!0,subtree:!0});}return I}finally{l=false;}}const g=document.getElementById("App")||document.body;let y=null,b=false;const S=new MutationObserver(()=>{b&&r&&document.contains(r)||(r&&!document.contains(r)&&(b=false,r=null,i=null,o=null),y===null&&(y=window.setTimeout(()=>{if(y=null,h()&&r&&document.contains(r)&&(b=true,o)){const T=o.parentElement;T&&T.lastElementChild!==o&&T.appendChild(o);}},100)));});return h()&&r&&document.contains(r)&&(b=true),S.observe(g,{childList:true,subtree:true}),a=()=>S.disconnect(),{get root(){return r},updateBadge(I){i&&(I>0?(i.textContent=String(I),i.style.display="flex"):i.style.display="none");},ring(){if(!r)return;const I=r.querySelector('[data-alert-icon="true"]');I&&(I.classList.add("alert-btn-ringing"),setTimeout(()=>{I?.classList.remove("alert-btn-ringing");},600));},startRinging(){r&&(p!==null&&clearInterval(p),this.ring(),p=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(p!==null&&(clearInterval(p),p=null),r){const I=r.querySelector('[data-alert-icon="true"]');I&&I.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{a?.();}catch{}try{o?.remove();}catch{}}}}const cR=`
  /* ============================================
     Alert Overlay Container
     ============================================ */
  .alert-overlay {
    position: fixed;
    width: 340px;
    max-width: calc(100vw - 16px);
    max-height: min(480px, calc(100vh - 100px));
    background: var(--bg, rgba(10, 12, 18, 0.95));
    border: 1px solid var(--border, rgba(148, 163, 184, 0.3));
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: var(--font-ui, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
    color: var(--fg, #e5e7eb);
    isolation: isolate;
  }

  /* ============================================
     Header
     ============================================ */
  .alert-overlay-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border, rgba(148, 163, 184, 0.2));
    flex-shrink: 0;
  }

  .alert-overlay-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--fg, #e5e7eb);
    user-select: none;
  }

  .alert-overlay-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--fg, rgba(229, 231, 235, 0.7));
    font-size: 18px;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.15s ease;
    padding: 0;
    flex-shrink: 0;
  }

  .alert-overlay-close:hover {
    background: var(--soft, rgba(229, 231, 235, 0.1));
    color: var(--fg, #e5e7eb);
  }

  .alert-overlay-close:active {
    background: var(--muted, rgba(229, 231, 235, 0.15));
  }

  /* ============================================
     Items List
     ============================================ */
  .alert-overlay-list {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
  }

  .alert-overlay-list::-webkit-scrollbar {
    width: 8px;
  }

  .alert-overlay-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .alert-overlay-list::-webkit-scrollbar-thumb {
    background: var(--border, rgba(148, 163, 184, 0.3));
    border-radius: 4px;
  }

  .alert-overlay-list::-webkit-scrollbar-thumb:hover {
    background: var(--border, rgba(148, 163, 184, 0.5));
  }

  /* ============================================
     Item Row
     ============================================ */
  .alert-item-row {
    display: grid;
    grid-template-columns: 56px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border, rgba(148, 163, 184, 0.1));
    transition: background 0.15s ease;
  }

  .alert-item-row:hover {
    background: var(--soft, rgba(229, 231, 235, 0.05));
  }

  .alert-item-row:last-child {
    border-bottom: none;
  }

  /* ============================================
     Sprite Column
     ============================================ */
  .alert-item-sprite {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--soft, rgba(229, 231, 235, 0.05));
    border-radius: 8px;
    flex-shrink: 0;
  }

  .alert-item-sprite canvas {
    max-width: 100%;
    max-height: 100%;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }

  /* ============================================
     Info Column
     ============================================ */
  .alert-item-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .alert-item-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--fg, #e5e7eb);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .alert-item-remaining {
    font-size: 12px;
    color: var(--fg, rgba(229, 231, 235, 0.7));
    opacity: 0.7;
  }

  /* ============================================
     Actions Column
     ============================================ */
  .alert-item-actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .alert-item-btn {
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 6px;
    border: 1px solid var(--border, rgba(148, 163, 184, 0.3));
    background: var(--soft, rgba(229, 231, 235, 0.08));
    color: var(--fg, #e5e7eb);
    cursor: pointer;
    transition: all 0.15s ease;
    min-height: 32px;
    white-space: nowrap;
  }

  .alert-item-btn:hover:not(:disabled) {
    background: var(--muted, rgba(229, 231, 235, 0.12));
    border-color: var(--accent, rgba(96, 165, 250, 0.4));
  }

  .alert-item-btn:active:not(:disabled) {
    background: var(--muted, rgba(229, 231, 235, 0.16));
  }

  .alert-item-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .alert-item-btn--buy {
    /* Specific styles for Buy button (optional) */
  }

  .alert-item-btn--buy-all {
    /* Specific styles for Buy All button (optional) */
  }

  /* ============================================
     Empty State
     ============================================ */
  .alert-overlay-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    text-align: center;
    color: var(--fg, rgba(229, 231, 235, 0.6));
    opacity: 0.6;
  }

  .alert-overlay-empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  .alert-overlay-empty-text {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .alert-overlay-empty-subtext {
    font-size: 12px;
    opacity: 0.8;
  }

  /* ============================================
     Responsive - Mobile
     ============================================ */
  @media (max-width: 480px) {
    .alert-overlay {
      width: calc(100vw - 16px);
      max-height: calc(100vh - 80px);
    }

    .alert-item-row {
      grid-template-columns: 44px 1fr auto;
      gap: 8px;
      padding: 10px 12px;
    }

    .alert-item-actions {
      grid-column: auto;
      justify-content: flex-end;
    }

    .alert-item-btn {
      flex: 0 0 auto;
      min-height: 36px;
    }

    .alert-overlay-header {
      padding: 12px 14px;
    }

    .alert-item-sprite {
      width: 40px;
      height: 40px;
    }
  }

  /* ============================================
     Touch-friendly targets (minimum 44px)
     ============================================ */
  @media (pointer: coarse) {
    .alert-overlay-close {
      min-width: 44px;
      min-height: 44px;
    }

    .alert-item-btn {
      min-height: 44px;
      padding: 10px 14px;
    }
  }

  /* ============================================
     Accessibility - Focus states
     ============================================ */
  .alert-item-btn:focus-visible {
    outline: 2px solid var(--accent, #60a5fa);
    outline-offset: 2px;
  }

  /* ============================================
     Animation - Fade in
     ============================================ */
  @keyframes alertOverlayFadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .alert-overlay {
    animation: alertOverlayFadeIn 0.2s ease-out;
  }
`;async function dR(e,t){const n=x("div",{className:"alert-item-row"}),r=x("div",{className:"alert-item-sprite"});if(e.spriteId)try{const f=await $e.toCanvas(e.spriteId,{scale:.35});f?r.appendChild(f):r.textContent="?";}catch{r.textContent="?";}else r.textContent="?";const o=x("div",{className:"alert-item-info"}),i=x("div",{className:"alert-item-name"},e.itemName),a=x("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);o.appendChild(i),o.appendChild(a);const l=x("div",{className:"alert-item-actions"}),d=x("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return d.addEventListener("click",f=>{f.stopPropagation(),t?.(e);}),l.appendChild(d),n.appendChild(r),n.appendChild(o),n.appendChild(l),n}function uR(){const e=x("div",{className:"alert-overlay-empty"}),t=x("div",{className:"alert-overlay-empty-icon"},"🔔"),n=x("div",{className:"alert-overlay-empty-text"},"No items available"),r=x("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(r),e}function Qf(e,t){const n=t.getBoundingClientRect(),r=340,o=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let i=n.bottom+o,a=window.innerWidth-n.right;const l=i+480>window.innerHeight,d=n.right-r<o;l?(e.style.bottom=`${window.innerHeight-n.top+o}px`,e.style.top="auto"):e.style.top=`${i}px`,e.style.right=`${a}px`,d&&(e.style.right="auto",e.style.left=`${o}px`);}function pR(e){const{items:t,anchorElement:n,onClose:r,onBuyAll:o}=e,i=x("div",{className:"alert-overlay"}),a=VM("theme",ui.theme),l=io[a];let d="";l&&(d=`.alert-overlay {
    ${Object.entries(l).map(([T,L])=>`${T}: ${L};`).join(`
    `)}
  }

`);const f=document.createElement("style");f.textContent=d+cR,i.appendChild(f);const p=x("div",{className:"alert-overlay-header"}),h=x("div",{className:"alert-overlay-title"},"Available Items"),g=x("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");g.addEventListener("click",I=>{I.stopPropagation(),r?.();}),p.appendChild(h),p.appendChild(g);const y=x("div",{className:"alert-overlay-list"});i.appendChild(p),i.appendChild(y);const b=async I=>{if(y.replaceChildren(),I.length===0)y.appendChild(uR());else for(const T of I){const L=await dR(T,o);y.appendChild(L);}};b(t),Qf(i,n);const S=()=>{Qf(i,n);};window.addEventListener("resize",S);const _=I=>{const T=I.target;!i.contains(T)&&!n.contains(T)&&r?.();};return document.addEventListener("click",_,{capture:true}),{root:i,updateItems:b,destroy(){window.removeEventListener("resize",S),document.removeEventListener("click",_,{capture:true}),i.remove();}}}const fR={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},hR={seed:"seed",tool:null,egg:null,decor:null};function cv(e,t,n){try{const r=fR[t],o=Oe.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=hR[t],l=a?i[a]:i;return !l||typeof l!="object"?null:l[n]??null}catch{return null}}function mR(e,t){return cv(e,t,"spriteId")}function gR(e,t){return cv(e,t,"name")??e}function bR(e,t){const n=zr.getTrackedItems(),r=new Set(n.filter(i=>i.shopType===e).map(i=>i.itemId));return r.size===0?[]:t.items.filter(i=>{const a=r.has(i.id),l=i.isAvailable;return a&&l}).map(i=>({shopType:e,itemId:i.id,itemName:gR(i.id,e),spriteId:mR(i.id,e),remaining:i.remaining,price:i.price}))}function pi(){const t=Fo().get(),n=["seed","tool","egg","decor"],r=[];for(const o of n){const i=t.byType[o];if(i){const a=bR(o,i);r.push(...a);}}return r}function vR(e){return Fo().subscribeStable(()=>{const r=pi();e(r);})}function yR(){let e=null,t=null,n=null,r=false,o=[],i=[],a="",l=0,d=0,f=false,p=null,h=[],g=0,y=false;const b=()=>{try{return wt.CustomSounds.getNotificationConfig("shop")}catch{return null}},S=(V,Q)=>{try{const O=Fe.getItemCustomSound("shop",V,Q);return O?{soundId:O.soundId,volume:O.volume,mode:O.mode}:null}catch{return null}},_=V=>`${V.soundId}:${V.volume}`,I=(V,Q,O,j)=>{Q.has(O)||(V.push({soundId:O,volume:j}),Q.add(O));},T=(V,Q)=>{const O=[],j=new Set;let X=false;const de=[];for(const ce of V){const le=S(ce.itemId,ce.shopType);le?le.mode==="one-shot"&&de.push({soundId:le.soundId,volume:le.volume}):Q?.mode==="one-shot"&&(X=true);}X&&Q&&I(O,j,Q.soundId,Q.volume);for(const ce of de)I(O,j,ce.soundId,ce.volume);return O},L=(V,Q)=>{const O=[],j=new Set;let X=false;const de=[];for(const ce of V){const le=S(ce.itemId,ce.shopType);le?le.mode==="loop"&&de.push({soundId:le.soundId,volume:le.volume}):Q?.mode==="loop"&&(X=true);}X&&Q&&I(O,j,Q.soundId,Q.volume);for(const ce of de)I(O,j,ce.soundId,ce.volume);return O},F=(V,Q,O,j=false)=>{if(!O())return;const X=Fe.getById(V.soundId);if(!X){Q();return}j&&(p=X.source),wt.playCustom(X.source,{volume:V.volume/100}).then(de=>{if(!O())return;const ce=de.audio,le=()=>{O()&&Q();};ce.addEventListener("ended",le,{once:true});}).catch(()=>{O()&&Q();});},$=()=>{if(!f||i.length===0)return;const V=i[l];l=(l+1)%i.length;const Q=d,O=()=>f&&d===Q;F(V,()=>{O()&&$();},O,true);},R=()=>{f||i.length===0||(f=true,l>=i.length&&(l=0),$());},N=()=>{if(f){d+=1,f=false;try{const V=wt.getCustomHandle();(!p||V&&V.url===p)&&wt.CustomSounds.stop();}catch{}p=null;}},M=()=>{N(),i=[],a="",l=0,p=null;},C=()=>{if(h.length===0){y=false,R();return}y=true;const V=h.shift(),Q=g,O=()=>y&&g===Q;F(V,()=>{O()&&C();},O);},E=(V,Q)=>{const O=Q??b(),j=T(V,O);if(j.length===0)return;const X=new Set(h.map(de=>de.soundId));for(const de of j)X.has(de.soundId)||(h.push(de),X.add(de.soundId));y||(g+=1,N(),C());},B=(V,Q)=>{const O=Q??b(),j=L(V,O);if(j.length===0){M();return}const X=j.map(_).join("|"),de=X!==a;i=j,a=X,de&&(l=0,f&&N()),!y&&(f||R());},G=V=>{const Q=o.length>0,O=V.length>0;o=V,e?.updateBadge(V.length),O?Q||e?.startRinging():Q&&e?.stopRinging();},K=()=>{if(r||!e?.root)return;const V=pi();t=pR({items:V,anchorElement:e.root,onClose:D,onBuyAll:Q=>{switch(Q.shopType){case "seed":Pr.seed.buyAll(Q.itemId);break;case "egg":Pr.egg.buyAll(Q.itemId);break;case "decor":Pr.decor.buyAll(Q.itemId);break;case "tool":Pr.tool.buyAll(Q.itemId);break}}}),document.body.appendChild(t.root),r=true;},D=()=>{!r||!t||(t.destroy(),t=null,r=false);},Z=()=>{r?D():K();},W=V=>{if(G(V),r&&t&&t.updateItems(V),B(V),V.length>0){const Q=new CustomEvent("gemini:alert-available",{detail:{items:V}});window.dispatchEvent(Q);}},te=()=>{const V=pi(),Q=new Set(o.map(de=>`${de.shopType}:${de.itemId}`)),O=V.filter(de=>!Q.has(`${de.shopType}:${de.itemId}`)),j=O.length>0;G(V),r&&t&&t.updateItems(V);const X=b();B(V,X),j&&E(O,X);};e=lR({onClick:Z,ariaLabel:"Alerts"}),n=vR(W),window.addEventListener("gemini:tracked-items-changed",te);const re=V=>{const Q=V,{shopType:O,items:j}=Q.detail;if(!j||j.length===0)return;const X=j.map(de=>({itemId:de.itemId,shopType:O}));E(X,b());};window.addEventListener("gemini:shop-restock-tracked",re);const ne=V=>{if(V.detail?.entityType!=="shop")return;const O=pi();B(O,b());};window.addEventListener(gt.CUSTOM_SOUND_CHANGE,ne);const oe=(V=1,Q=10)=>{if(Fo().get().all.some(de=>de.items.length>0)||V>=Q){const de=pi();G(de);const ce=b();B(de,ce),de.length>0&&E(de,ce);}else setTimeout(()=>oe(V+1,Q),500);};return oe(),{destroy(){D(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",te),window.removeEventListener("gemini:shop-restock-tracked",re),window.removeEventListener(gt.CUSTOM_SOUND_CHANGE,ne),e?.destroy(),e=null,h=[],g+=1,y=false,M();}}}function xR(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Bm(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),eR({debug:false}),()=>{t?.(),t=null;}}async function wR(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Fh(),await Pd({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function CR(e){e.logStep("Globals","Initializing global variables...");try{ug(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function kR(e){e.logStep("API","Exposing Gemini API...");try{jP(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Cc(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function SR(e){e.logStep("HUD","Loading HUD preferences..."),await Cc();const t=HM();await Cc();const n=await WM({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Va("width",r),onOpenChange:r=>Va("isOpen",r),themes:io,initialTheme:t.theme,onThemeChange:r=>Va("theme",r),buildSections:r=>aM({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Va("activeTab",r)});return await Cc(),e.logStep("HUD","HUD ready","success"),n}async function AR(e){e.setSubtitle("Activating Gemini modules...");let t=0,n=0;await pg(r=>{r.status==="start"?n++:r.status==="success"?(t++,e.logStep("Modules",`Loading modules... (${t}/${n})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${t}/${n}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${n}/${n})`,"success");}async function ER(e){try{$e.isReady()||await $e.init(),Oe.resolveSprites();}catch(t){console.warn("[Bootstrap] Sprite init failed",t);}}async function _R(e){e.logStep("Sections","Preloading UI sections...");try{await sM(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function IR(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:fo.init.bind(fo)},{name:"PetTeam",init:ft.init.bind(ft)},{name:"XPTracker",init:ed.init.bind(ed)},{name:"CropValueIndicator",init:as.init.bind(as)},{name:"CropSizeIndicator",init:cs.init.bind(cs)},{name:"ShopNotifier",init:zr.init.bind(zr)},{name:"WeatherNotifier",init:Ao.init.bind(Ao)},{name:"PetHungerNotifier",init:Ni.init.bind(Ni)},{name:"AriesAPI",init:Rs.init.bind(Rs)},{name:"HarvestLocker",init:jt.init.bind(jt)},{name:"EggLocker",init:lr.init.bind(lr)},{name:"DecorLocker",init:cr.init.bind(cr)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const r=uh();r.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:as.render,storageKey:_t.CROP_VALUE_INDICATOR,defaultEnabled:!1}),r.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:cs.render,storageKey:_t.CROP_SIZE_INDICATOR,defaultEnabled:!1}),r.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(r){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",r);}}Y0();(async function(){oy();const e=Xv({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=xR(e),await wR(e),CR(e),kR(e),await AR(e),await Promise.all([(async()=>{IR(e);})(),(async()=>{await ER(e);})()]),await _R(e),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await SR(e);YM({onClick:()=>n.setOpen(true)}),yR();})();

})();