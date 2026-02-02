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
  var Yx=Object.defineProperty;var Jx=(e,t,n)=>t in e?Yx(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var H=(e,t,n)=>Jx(e,typeof t!="symbol"?t+"":t,n);function h(e,t=null,...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(const r of n)r==null||r===false||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}const Wi="https://i.imgur.com/k5WuC32.png",qu="gemini-loader-style",Mn="gemini-loader",cg=80;function Qx(){if(document.getElementById(qu))return;const e=document.createElement("style");e.id=qu,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Mn} {
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
    #${Mn} {
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

    #${Mn}.gemini-loader--error .gemini-loader__actions {
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
    #${Mn}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Mn}.gemini-loader--error .gemini-loader__spinner {
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
      #${Mn} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function Vi(e,t,n){const o=h("div",{className:`gemini-loader__log ${n}`},h("div",{className:"gemini-loader__dot"}),h("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>cg;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Zx(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Wi);return}GM_xmlhttpRequest({method:"GET",url:Wi,responseType:"blob",onload:t=>{const n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(Wi),o.readAsDataURL(n);},onerror:()=>e(Wi)});})}function ey(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Qx();const n=h("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=h("div",{className:"gemini-loader__logs"}),r=h("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=h("div",{className:"gemini-loader__spinner"},r);Zx().then(y=>{r.src=y;});const a=h("div",{className:"gemini-loader__card"},h("div",{className:"gemini-loader__header"},i,h("div",{className:"gemini-loader__titles"},h("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=h("div",{id:Mn},a);(document.body||document.documentElement).appendChild(s);const l=h("div",{className:"gemini-loader__actions"},h("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);const c=y=>{n.textContent=y;},d=new Map,u=(y,x)=>{y.className=`gemini-loader__log ${x}`;};return {log:(y,x="info")=>Vi(o,y,x),logStep:(y,x,S="info")=>{const w=String(y||"").trim();if(!w){Vi(o,x,S);return}const T=d.get(w);if(T){T.el.lastElementChild&&(T.el.lastElementChild.textContent=x),T.tone!==S&&(u(T.el,S),T.tone=S);return}const k=h("div",{className:`gemini-loader__log ${S}`},h("div",{className:"gemini-loader__dot"}),h("div",{textContent:x}));for(d.set(w,{el:k,tone:S}),o.appendChild(k);o.childElementCount>cg;){const b=o.firstElementChild;if(!b)break;const v=Array.from(d.entries()).find(([,_])=>_.el===b)?.[0];v&&d.delete(v),b.remove();}o.scrollTop=o.scrollHeight;},setSubtitle:c,succeed:(y,x=600)=>{y&&Vi(o,y,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),x);},fail:(y,x)=>{Vi(o,y,"error"),c("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",y,x);}}}const Xu=150,ty=30;function ny(e,t,n){const o=h("div",{className:"lg-pill",id:"pill"}),r=e.map(C=>{const I=h("button",{className:"lg-tab"},C.label);return I.setAttribute("data-target",C.id),I}),i=h("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=new Map(e.map(C=>[C.id,true])),s=new Map(r.map((C,I)=>[e[I].id,C]));function l(C){const I=document.createElementNS("http://www.w3.org/2000/svg","svg");I.setAttribute("viewBox","0 0 24 24"),I.setAttribute("fill","none"),I.setAttribute("stroke","currentColor"),I.setAttribute("stroke-width","2"),I.setAttribute("stroke-linecap","round"),I.setAttribute("stroke-linejoin","round");const R=document.createElementNS("http://www.w3.org/2000/svg","polyline");return R.setAttribute("points",C==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),I.appendChild(R),I}const c=h("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});c.appendChild(l("left"));const d=h("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});d.appendChild(l("right"));const p=h("div",{className:"lg-tabs-wrapper"},c,i,d);let f=0,g=0,m=false;function y(){const C=i.scrollLeft>0,I=i.scrollLeft<i.scrollWidth-i.clientWidth-1;c.classList.toggle("disabled",!C),d.classList.toggle("disabled",!I);}c.addEventListener("click",()=>{i.scrollBy({left:-Xu,behavior:"smooth"}),setTimeout(y,300);}),d.addEventListener("click",()=>{i.scrollBy({left:Xu,behavior:"smooth"}),setTimeout(y,300);}),i.addEventListener("wheel",C=>{Math.abs(C.deltaY)>Math.abs(C.deltaX)&&(C.preventDefault(),i.scrollLeft+=C.deltaY,y());},{passive:false});let x=0;i.addEventListener("touchstart",C=>{const I=C.touches[0];f=I.clientX,g=I.clientY,m=false,x=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",C=>{if(m)return;const I=C.touches[0],R=I.clientX-f,F=I.clientY-g;if(Math.abs(F)>Math.abs(R)){m=true;return}Math.abs(R)>ty&&(C.preventDefault(),i.scrollLeft=x-R);},{passive:false}),i.addEventListener("touchend",()=>{y();},{passive:true}),i.addEventListener("scroll",y,{passive:true});function S(C){const I=r.find(R=>R.dataset.target===C)||r[0];I&&requestAnimationFrame(()=>{const R=I.offsetLeft,F=I.offsetWidth;o.style.width=`${F}px`,o.style.transform=`translateX(${R}px)`;const G=i.scrollLeft,z=G,X=G+i.clientWidth,L=R-12,O=R+F+12;L<z?i.scrollTo({left:L,behavior:"smooth"}):O>X&&i.scrollTo({left:O-i.clientWidth,behavior:"smooth"}),setTimeout(y,300);});}function w(){for(const[C,I]of a)if(I)return C;return null}function T(C){const I=s.get(C);if(I)if(a.set(C,false),I.style.display="none",v===C){const R=w();R&&_(R);}else b();}function k(C){const I=s.get(C);I&&(a.set(C,true),I.style.display="",b());}function b(){S(v),y();}let v=t||(e[0]?.id??"");function _(C){a.get(C)&&(v=C,r.forEach(I=>I.classList.toggle("active",I.dataset.target===C)),S(C),n(C));}return r.forEach(C=>C.addEventListener("click",()=>_(C.dataset.target))),queueMicrotask(()=>{S(v),y();}),{root:p,activate:_,recalc:b,getActive:()=>v,showTab:k,hideTab:T,isTabVisible:C=>a.get(C)??false,getVisibleTabs:()=>[...a.entries()].filter(([C,I])=>I).map(([C])=>C)}}class Xt{constructor(t){H(this,"id");H(this,"label");H(this,"container",null);H(this,"cleanupFunctions",[]);H(this,"preloadedContent",null);H(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=h("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const o=n?`gemini-section ${n}`:"gemini-section";return h("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=h("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class oy{constructor(t,n,o){H(this,"sections");H(this,"activeId",null);H(this,"container");H(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const cn="gemini:",ry={STATE:"hud:state",THEME:"hud:theme"},iy={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},ay={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},sy={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},ke={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config",HARVEST_LOCKER:"feature:harvestLocker:config",MISSING_VARIANTS_INDICATOR:"feature:missingVariantsIndicator:config",JOURNAL:"feature:journal:config"},an={ABILITIES_INJECT:"inject:abilitiesInject:config",JOURNAL_HINTS:"inject:journalHints:config",JOURNAL_FILTER_SORT:"inject:journalFilterSort:config",JOURNAL_ALL_TAB:"inject:journalAllTab:config",STORAGE_VALUE_INDICATOR:"inject:storageValueIndicator:config"},ly={AUTO_RELOAD:"dev:auto-reload"},ut={HUD:ry,SECTION:iy,MODULE:ay,GLOBAL:sy,FEATURE:ke,INJECT:an,DEV:ly},mn={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change"};function ve(e,t){try{const n=e.startsWith(cn)?e:cn+e,o=GM_getValue(n);return o==null?t:typeof o=="string"?JSON.parse(o):o}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function we(e,t){try{const n=e.startsWith(cn)?e:cn+e,o=e.startsWith(cn)?e.slice(cn.length):e,r=JSON.stringify(t);GM_setValue(n,r),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:o,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function cy(e){try{const t=e.startsWith(cn)?e:cn+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function dy(){try{const e="gemini:",t=[];for(let r=0;r<localStorage.length;r++){const i=localStorage.key(r);i&&i.startsWith(e)&&t.push(i);}for(const r of t)try{const i=localStorage.getItem(r);if(i!==null){const a=JSON.parse(i),s=r.slice(e.length);we(s,a),console.log(`[Gemini Storage] Migrated key: ${r}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${r}":`,i);}const n="gemini.sections",o=GM_getValue(n);o!=null&&(we("sections",o),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const dg="gemini.sections";function ug(){const e=ve(dg,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function uy(e){we(dg,e);}async function py(e){return ug()[e]}function fy(e,t){const n=ug();uy({...n,[e]:t});}function Oo(e,t){return {...e,...t??{}}}async function gy(e){const t=await py(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((c=>JSON.parse(JSON.stringify(c)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){fy(e.path,n);}function i(){return n}function a(c){n=e.sanitize?e.sanitize(c):c,r();}function s(c){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof c=="function"?c(u):Object.assign(u,c),n=e.sanitize?e.sanitize(u):u,r();}function l(){r();}return {get:i,set:a,update:s,save:l}}async function Jn(e,t){const{path:n=e,...o}=t;return gy({path:n,...o})}let my=0;const qi=new Map;function Ee(e={},...t){const{id:n,className:o,variant:r="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:l=true,onExpandChange:c,mediaTop:d,title:u,subtitle:p,badge:f,actions:g,footer:m,divider:y=false,tone:x="neutral",stateKey:S}=e,w=h("div",{className:"card",id:n,tabIndex:a?0:void 0});w.classList.add(`card--${r}`,`card--p-${i}`),a&&w.classList.add("card--interactive"),x!=="neutral"&&w.classList.add(`card--tone-${x}`),o&&w.classList.add(...o.split(" ").filter(Boolean)),s&&w.classList.add("card--expandable");const T=s?S??n??(typeof u=="string"?`title:${u}`:null):null;let k=!s||l;T&&qi.has(T)&&(k=!!qi.get(T));let b=null,v=null,_=null,C=null,I=null;const R=n?`${n}-collapse`:`card-collapse-${++my}`,F=()=>{if(C!==null&&(cancelAnimationFrame(C),C=null),I){const D=I;I=null,D();}},G=(D,B)=>{if(!_)return;F();const U=_;if(U.setAttribute("aria-hidden",String(!D)),!B){U.classList.remove("card-collapse--animating"),U.style.display=D?"":"none",U.style.height="",U.style.opacity="";return}if(U.classList.add("card-collapse--animating"),U.style.display="",D){U.style.height="auto";const M=U.scrollHeight;if(!M){U.classList.remove("card-collapse--animating"),U.style.display="",U.style.height="",U.style.opacity="";return}U.style.height="0px",U.style.opacity="0",U.offsetHeight,C=requestAnimationFrame(()=>{C=null,U.style.height=`${M}px`,U.style.opacity="1";});}else {const M=U.scrollHeight;if(!M){U.classList.remove("card-collapse--animating"),U.style.display="none",U.style.height="",U.style.opacity="";return}U.style.height=`${M}px`,U.style.opacity="1",U.offsetHeight,C=requestAnimationFrame(()=>{C=null,U.style.height="0px",U.style.opacity="0";});}const E=()=>{U.classList.remove("card-collapse--animating"),U.style.height="",D||(U.style.display="none"),U.style.opacity="";};let P=null;const A=M=>{M.target===U&&(P!==null&&(clearTimeout(P),P=null),U.removeEventListener("transitionend",A),U.removeEventListener("transitioncancel",A),I=null,E());};I=()=>{P!==null&&(clearTimeout(P),P=null),U.removeEventListener("transitionend",A),U.removeEventListener("transitioncancel",A),I=null,E();},U.addEventListener("transitionend",A),U.addEventListener("transitioncancel",A),P=window.setTimeout(()=>{I?.();},420);};function z(D){const B=document.createElementNS("http://www.w3.org/2000/svg","svg");return B.setAttribute("viewBox","0 0 24 24"),B.setAttribute("width","16"),B.setAttribute("height","16"),B.innerHTML=D==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',B}function X(D,B=true,U=true){k=D,w.classList.toggle("card--collapsed",!k),w.classList.toggle("card--expanded",k),b&&(b.dataset.expanded=String(k),b.setAttribute("aria-expanded",String(k))),v&&(v.setAttribute("aria-expanded",String(k)),v.classList.toggle("card-toggle--collapsed",!k),v.setAttribute("aria-label",k?"Replier le contenu":"Deplier le contenu"),v.replaceChildren(z(k?"up":"down"))),s?G(k,U):_&&(_.style.display="",_.style.height="",_.style.opacity="",_.setAttribute("aria-hidden","false")),B&&c&&c(k),T&&qi.set(T,k);}if(d){const D=h("div",{className:"card-media"});D.append(d),w.appendChild(D);}const L=!!(u||p||f||g&&g.length||s);if(L){b=h("div",{className:"card-header"});const D=h("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const E=h("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&E.append(typeof f=="string"?h("span",{className:"badge"},f):f),D.appendChild(E);}if(p){const E=h("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);D.appendChild(E);}(D.childNodes.length||s)&&b.appendChild(D);const B=h("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),U=h("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(E=>U.appendChild(E)),U.childNodes.length&&B.appendChild(U),s&&(v=h("button",{className:"card-toggle",type:"button",ariaExpanded:String(k),ariaControls:R,ariaLabel:k?"Replier le contenu":"Deplier le contenu"}),v.textContent=k?"▲":"▼",v.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation(),X(!k);}),B.appendChild(v),b.classList.add("card-header--expandable"),b.addEventListener("click",E=>{const P=E.target;P?.closest(".card-actions")||P?.closest(".card-toggle")||X(!k);})),B.childNodes.length&&b.appendChild(B),w.appendChild(b);}_=h("div",{className:"card-collapse",id:R,ariaHidden:s?String(!k):"false"}),w.appendChild(_),y&&L&&_.appendChild(h("div",{className:"card-divider"}));const O=h("div",{className:"card-body"});if(O.append(...t),_.appendChild(O),m){y&&_.appendChild(h("div",{className:"card-divider"}));const D=h("div",{className:"card-footer"});D.append(m),_.appendChild(D);}return v&&v.setAttribute("aria-controls",R),X(k,false,false),T&&qi.set(T,k),w}let es=false;const ts=new Set,st=e=>{const t=document.activeElement;for(const n of ts)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function hy(){es||(es=true,window.addEventListener("keydown",st,true),window.addEventListener("keypress",st,true),window.addEventListener("keyup",st,true),document.addEventListener("keydown",st,true),document.addEventListener("keypress",st,true),document.addEventListener("keyup",st,true));}function by(){es&&(ts.size>0||(es=false,window.removeEventListener("keydown",st,true),window.removeEventListener("keypress",st,true),window.removeEventListener("keyup",st,true),document.removeEventListener("keydown",st,true),document.removeEventListener("keypress",st,true),document.removeEventListener("keyup",st,true)));}let Nn=null;const sc=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),Nn!==null&&(window.clearTimeout(Nn),Nn=null),document.removeEventListener("click",sc,true);};function xy(){document.addEventListener("click",sc,true),Nn!==null&&window.clearTimeout(Nn),Nn=window.setTimeout(()=>{document.removeEventListener("click",sc,true),Nn=null;},500);}function Vn(e){const{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:l,onOpenChange:c}=e,d=h("div",{className:"select",id:t}),u=h("button",{className:"select-trigger",type:"button"}),p=h("span",{className:"select-value"},r),f=h("span",{className:"select-caret"},"▾");u.append(p,f);const g=h("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});d.classList.add(`select--${i}`);let m=false,y=n,x=null,S=!!a;function w(E){return E==null?r:(e.options||o).find(A=>A.value===E)?.label??r}function T(E){p.textContent=w(E),g.querySelectorAll(".select-option").forEach(P=>{const A=P.dataset.value,M=E!=null&&A===E;P.classList.toggle("selected",M),P.setAttribute("aria-selected",String(M));});}function k(E){g.replaceChildren(),E.forEach(P=>{const A=h("button",{className:"select-option"+(P.disabled?" disabled":""),type:"button",role:"option","data-value":P.value,"aria-selected":String(P.value===y),tabindex:"-1"},P.label);P.value===y&&A.classList.add("selected"),P.disabled||A.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),M.pointerType&&M.pointerType!=="mouse"&&xy(),R(P.value,{notify:true}),C();},{capture:true}),g.appendChild(A);});}function b(){u.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function v(){const E=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${E.width}px`});}function _(){m||S||(m=true,d.classList.add("open"),b(),v(),document.addEventListener("mousedown",L,true),document.addEventListener("scroll",O,true),window.addEventListener("resize",D),g.focus({preventScroll:true}),s&&(hy(),ts.add(d),x=()=>{ts.delete(d),by();}),c?.(true));}function C(){m&&(m=false,d.classList.remove("open"),b(),document.removeEventListener("mousedown",L,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",D),u.focus({preventScroll:true}),x?.(),x=null,c?.(false));}function I(){m?C():_();}function R(E,P={}){const A=y;y=E,T(y),P.notify!==false&&A!==E&&l?.(E);}function F(){return y}function G(E){const P=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!P.length)return;const A=P.findIndex(K=>K.classList.contains("active")),M=P[(A+(E===1?1:P.length-1))%P.length];P.forEach(K=>K.classList.remove("active")),M.classList.add("active"),M.focus({preventScroll:true}),M.scrollIntoView({block:"nearest"});}function z(E){(E.key===" "||E.key==="Enter"||E.key==="ArrowDown")&&(E.preventDefault(),_());}function X(E){if(E.key==="Escape"){E.preventDefault(),C();return}if(E.key==="Enter"||E.key===" "){const P=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");P&&!P.classList.contains("disabled")&&(E.preventDefault(),R(P.dataset.value,{notify:true}),C());return}if(E.key==="ArrowDown"){E.preventDefault(),G(1);return}if(E.key==="ArrowUp"){E.preventDefault(),G(-1);return}}function L(E){d.contains(E.target)||C();}function O(){m&&v();}function D(){m&&v();}function B(E){S=!!E,u.disabled=S,d.classList.toggle("disabled",S),S&&C();}function U(E){e.options=E,k(E),E.some(P=>P.value===y)||(y=null,T(null));}return d.append(u,g),u.addEventListener("pointerdown",E=>{E.preventDefault(),E.stopPropagation(),I();},{capture:true}),u.addEventListener("keydown",z),g.addEventListener("keydown",X),k(o),n!=null?(y=n,T(y)):T(null),b(),B(S),{root:d,open:_,close:C,toggle:I,getValue:F,setValue:R,setOptions:U,setDisabled:B,destroy(){document.removeEventListener("mousedown",L,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",D),x?.(),x=null;}}}function gd(e={}){const{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:l=false,disabled:c=false,tooltip:d,hint:u,icon:p,suffix:f,onClick:g}=e,m=h("div",{className:"lg-label-wrap",id:t}),y=h("label",{className:"lg-label",...o?{htmlFor:o}:{},...d?{title:d}:{}});if(p){const R=typeof p=="string"?h("span",{className:"lg-label-ico"},p):p;R.classList?.add?.("lg-label-ico"),y.appendChild(R);}const x=h("span",{className:"lg-label-text"},n);y.appendChild(x);const S=h("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&y.appendChild(S);let w=null;if(f!=null){w=typeof f=="string"?document.createTextNode(f):f;const R=h("span",{className:"lg-label-suffix"});R.appendChild(w),y.appendChild(R);}const T=u?h("div",{className:"lg-label-hint"},u):null;m.classList.add(`lg-label--${a}`),m.classList.add(`lg-label--${i}`),s==="title"&&m.classList.add("lg-label--title"),k(r),c&&m.classList.add("is-disabled"),m.appendChild(y),T&&m.appendChild(T),g&&y.addEventListener("click",g);function k(R){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${R}`);}function b(R){x.textContent=R;}function v(R){k(R);}function _(R){R&&!S.isConnected&&y.appendChild(S),!R&&S.isConnected&&S.remove(),R?y.setAttribute("aria-required","true"):y.removeAttribute("aria-required");}function C(R){m.classList.toggle("is-disabled",!!R);}function I(R){!R&&T&&T.isConnected?T.remove():R&&T?T.textContent=R:R&&!T&&m.appendChild(h("div",{className:"lg-label-hint"},R));}return {root:m,labelEl:y,hintEl:T,setText:b,setTone:v,setRequired:_,setDisabled:C,setHint:I}}function mr(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Xi(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const o=mr(e);return o&&n.appendChild(o),n}function yy(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Me(e={}){const{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:l,type:c="button",onClick:d,disabled:u=false,fullWidth:p=false}=e,f=h("button",{className:"btn",id:n});f.type=c,o==="primary"&&f.classList.add("primary"),o==="danger"&&f.classList.add("danger"),r==="sm"&&f.classList.add("btn--sm"),l&&(f.title=l),p&&(f.style.width="100%");const g=yy(),m=i?Xi(i,"left"):null,y=a?Xi(a,"right"):null,x=document.createElement("span");x.className="btn-label";const S=mr(t);S&&x.appendChild(S),!S&&(m||y)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(x),y&&f.appendChild(y);const w=u||s;f.disabled=w,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",d&&f.addEventListener("click",d);const T=f;return T.setLoading=k=>{f.setAttribute("aria-busy",String(!!k)),g.style.display=k?"inline-block":"none",f.disabled=k||u;},T.setDisabled=k=>{f.disabled=k||f.getAttribute("aria-busy")==="true";},T.setLabel=k=>{x.replaceChildren();const b=mr(k);b&&x.appendChild(b),!b&&(m||y)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},T.setIconLeft=k=>{if(k==null){m?.remove();return}m?m.replaceChildren(mr(k)):f.insertBefore(Xi(k,"left"),x);},T.setIconRight=k=>{if(k==null){y?.remove();return}y?y.replaceChildren(mr(k)):f.appendChild(Xi(k,"right"));},T.setVariant=k=>{f.classList.remove("primary","danger"),k==="primary"&&f.classList.add("primary"),k==="danger"&&f.classList.add("danger");},T}function hn(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,l=h("div",{className:"lg-switch-wrap"}),c=h("button",{className:`lg-switch lg-switch--${r}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!o),title:i??"Basculer"}),d=h("span",{className:"lg-switch-track"}),u=h("span",{className:"lg-switch-thumb"});c.append(d,u);let p=null;i&&a!=="none"&&(p=h("span",{className:"lg-switch-label"},i)),p&&a==="left"?l.append(p,c):p&&a==="right"?l.append(c,p):l.append(c);let f=!!n,g=!!o;function m(){c.classList.toggle("on",f),c.setAttribute("aria-checked",String(f)),c.disabled=g,c.setAttribute("aria-disabled",String(g));}function y(C=false){g||(f=!f,m(),C||s?.(f));}function x(C){C.preventDefault(),y();}function S(C){g||((C.key===" "||C.key==="Enter")&&(C.preventDefault(),y()),C.key==="ArrowLeft"&&(C.preventDefault(),T(false)),C.key==="ArrowRight"&&(C.preventDefault(),T(true)));}c.addEventListener("click",x),c.addEventListener("keydown",S);function w(){return f}function T(C,I=false){f=!!C,m(),I||s?.(f);}function k(C){g=!!C,m();}function b(C){if(!C){p&&(p.remove(),p=null);return}p?p.textContent=C:(p=h("span",{className:"lg-switch-label"},C),l.append(p));}function v(){c.focus();}function _(){c.removeEventListener("click",x),c.removeEventListener("keydown",S);}return m(),{root:l,button:c,isChecked:w,setChecked:T,setDisabled:k,setLabel:b,focus:v,destroy:_}}let pg=null,md=null;function vy(){return pg}function wy(e){pg=e,md=null;}function fg(){return md}function Sy(e){md=e;}function Cy(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function gg(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const r=n.platform.toLowerCase();if(r.includes("windows"))return "windows";if(r.includes("mac"))return "mac";if(r.includes("android"))return "android";if(r.includes("chrome os")||r.includes("cros"))return "chromeos";if(r.includes("linux"))return "linux";if(r.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function mg(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return "Edge";if(r)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function ky(){const e=vy();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function _y(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function hg(){try{return window.top!==window.self}catch{return  true}}function Ty(){const e=hg(),t=_y(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function As(){const e=fg();if(e)return e;const t=Ty(),n=ky(),o=gg(),r=mg(),i=hg(),a=window.screen||{},s=window.visualViewport,l=Math.round(window.innerWidth||document.documentElement.clientWidth||0),c=Math.round(window.innerHeight||document.documentElement.clientHeight||0),d=Math.round(s?.width??l),u=Math.round(s?.height??c),p=Math.round(a.width||0),f=Math.round(a.height||0),g=Math.round(a.availWidth||p),m=Math.round(a.availHeight||f),y=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,x={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:r,os:o,viewportWidth:l,viewportHeight:c,visualViewportWidth:d,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:y,orientation:Cy()};return Sy(x),x}function Ay(){return As().surface==="discord"}function Ey(){return As().platform==="mobile"}function Iy(){As();}function Py(){return fg()!==null}const qe={init:Iy,isReady:Py,detect:As,isDiscord:Ay,isMobile:Ey,detectOS:gg,detectBrowser:mg,setPlatformOverride:wy};let ns=false;const hr=new Set;function My(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const lt=e=>{const t=My();if(t){for(const n of hr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ly(){ns||(ns=true,window.addEventListener("keydown",lt,true),window.addEventListener("keypress",lt,true),window.addEventListener("keyup",lt,true),document.addEventListener("keydown",lt,true),document.addEventListener("keypress",lt,true),document.addEventListener("keyup",lt,true));}function Ny(){ns&&(ns=false,window.removeEventListener("keydown",lt,true),window.removeEventListener("keypress",lt,true),window.removeEventListener("keyup",lt,true),document.removeEventListener("keydown",lt,true),document.removeEventListener("keypress",lt,true),document.removeEventListener("keyup",lt,true));}function Ry(e){return hr.size===0&&Ly(),hr.add(e),()=>{hr.delete(e),hr.size===0&&Ny();}}function Oy(e,t,n,o){let r;switch(e){case "digits":r="0-9";break;case "alpha":r="\\p{L}";break;case "alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function $y(e,t){return t?e.replace(t,""):e}function Fy(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t);})}function Es(e={}){const{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:l,blockGameKeys:c=true,debounceMs:d=0,onChange:u,onEnter:p,label:f}=e,g=h("div",{className:"lg-input-wrap"}),m=h("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(m.maxLength=l),o&&(m.value=o),f){const R=h("div",{className:"lg-input-label"},f);g.appendChild(R);}g.appendChild(m);const y=Oy(r,i,a,s),x=()=>{const R=m.selectionStart??m.value.length,F=m.value.length,G=$y(m.value,y);if(G!==m.value){m.value=G;const z=F-G.length,X=Math.max(0,R-z);m.setSelectionRange(X,X);}},S=Fy(()=>u?.(m.value),d);m.addEventListener("input",()=>{x(),S();}),m.addEventListener("paste",()=>queueMicrotask(()=>{x(),S();})),m.addEventListener("keydown",R=>{R.key==="Enter"&&p?.(m.value);});const w=c?Ry(m):()=>{};function T(){return m.value}function k(R){m.value=R??"",x(),S();}function b(){m.focus();}function v(){m.blur();}function _(R){m.disabled=!!R;}function C(){return document.activeElement===m}function I(){w();}return {root:g,input:m,getValue:T,setValue:k,focus:b,blur:v,setDisabled:_,isFocused:C,destroy:I}}function $e(e,t,n){return Math.min(n,Math.max(t,e))}function Lr({h:e,s:t,v:n,a:o}){const r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1));let s=0,l=0,c=0;switch(Math.floor(r)){case 0:s=i,l=a;break;case 1:s=a,l=i;break;case 2:l=i,c=a;break;case 3:l=a,c=i;break;case 4:s=a,c=i;break;default:s=i,c=a;break}const u=n-i,p=Math.round((s+u)*255),f=Math.round((l+u)*255),g=Math.round((c+u)*255);return {r:$e(p,0,255),g:$e(f,0,255),b:$e(g,0,255),a:$e(o,0,1)}}function bg({r:e,g:t,b:n,a:o}){const r=$e(e,0,255)/255,i=$e(t,0,255)/255,a=$e(n,0,255)/255,s=Math.max(r,i,a),l=Math.min(r,i,a),c=s-l;let d=0;c!==0&&(s===r?d=60*((i-a)/c%6):s===i?d=60*((a-r)/c+2):d=60*((r-i)/c+4)),d<0&&(d+=360);const u=s===0?0:c/s;return {h:d,s:u,v:s,a:$e(o,0,1)}}function hd({r:e,g:t,b:n}){const o=r=>$e(Math.round(r),0,255).toString(16).padStart(2,"0");return `#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Dy({r:e,g:t,b:n,a:o}){const r=$e(Math.round(o*255),0,255);return `${hd({r:e,g:t,b:n})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function br({r:e,g:t,b:n,a:o}){const r=Math.round(o*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${r})`}function go(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r:o,g:r,b:i,a:n/255}}function lc(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return go(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;const r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return [r,i,a,s].some(l=>Number.isNaN(l))?null:{r,g:i,b:a,a:s}}return null}function By(e,t){const n=lc(e)??go(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=$e(t,0,1)),bg(n)}function Gy(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function zy(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Cn(e){const t=Lr(e),n=Lr({...e,a:1});return {hsva:{...e},hex:hd(n),hexa:Dy(t),rgba:br(t),alpha:e.a}}function Hy(e={}){const{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:l}=e,d=a?a():qe.detect().platform==="mobile";let u=By(o,r);const p=Ee({id:t,className:"color-picker",title:n,padding:d?"md":"lg",variant:"soft",expandable:!d,defaultExpanded:!d&&i});p.classList.add(d?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=h("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const y=p.querySelector(".card-toggle");!d&&y&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&y.click();});const x=p.querySelector(".card-collapse");let S=null,w=null,T=null,k=null,b=null,v=null,_=null,C=null,I=null,R="hex";function F(O){const D=Cn(u);O==="input"?s?.(D):l?.(D);}function G(){const O=Cn(u);if(m.style.setProperty("--cp-preview-color",O.rgba),m.setAttribute("aria-label",`${n}: ${O.hexa}`),!d&&S&&w&&T&&k&&b&&v&&_){const D=Lr({...u,s:1,v:1,a:1}),B=br(D);S.style.setProperty("--cp-palette-hue",B),w.style.left=`${u.s*100}%`,w.style.top=`${(1-u.v)*100}%`,T.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${br({...D,a:1})} 0%, ${br({...D,a:0})} 100%)`),k.style.top=`${(1-u.a)*100}%`,b.style.setProperty("--cp-hue-color",br(Lr({...u,v:1,s:1,a:1}))),v.style.left=`${u.h/360*100}%`;const U=u.a===1?O.hex:O.hexa,E=O.rgba,P=R==="hex"?U:E;_!==document.activeElement&&(_.value=P),_.setAttribute("aria-label",`${R.toUpperCase()} code for ${n}`),_.placeholder=R==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",R==="hex"?_.maxLength=9:_.removeAttribute("maxLength"),_.dataset.mode=R,C&&(C.textContent=R.toUpperCase(),C.setAttribute("aria-label",R==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),C.setAttribute("aria-pressed",R==="rgba"?"true":"false"),C.classList.toggle("is-alt",R==="rgba"));}I&&I!==document.activeElement&&(I.value=O.hex);}function z(O,D=null){u={h:(O.h%360+360)%360,s:$e(O.s,0,1),v:$e(O.v,0,1),a:$e(O.a,0,1)},G(),D&&F(D);}function X(O,D=null){z(bg(O),D);}function L(O,D,B){O.addEventListener("pointerdown",U=>{U.preventDefault();const E=U.pointerId,P=M=>{M.pointerId===E&&D(M);},A=M=>{M.pointerId===E&&(document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",A),document.removeEventListener("pointercancel",A),B?.(M));};D(U),document.addEventListener("pointermove",P),document.addEventListener("pointerup",A),document.addEventListener("pointercancel",A);});}if(!d&&x){const O=x.querySelector(".card-body");if(O){O.classList.add("color-picker__body"),w=h("div",{className:"color-picker__palette-cursor"}),S=h("div",{className:"color-picker__palette"},w),k=h("div",{className:"color-picker__alpha-thumb"}),T=h("div",{className:"color-picker__alpha"},k),v=h("div",{className:"color-picker__hue-thumb"}),b=h("div",{className:"color-picker__hue"},v);const D=h("div",{className:"color-picker__main"},S,T),B=h("div",{className:"color-picker__hue-row"},b),U=Es({blockGameKeys:true});_=U.input,_.classList.add("color-picker__hex-input"),_.value="",_.maxLength=9,_.spellcheck=false,_.inputMode="text",_.setAttribute("aria-label",`Hex code for ${n}`),C=h("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),U.root.classList.add("color-picker__hex-wrap");const E=h("div",{className:"color-picker__hex-row"},C,U.root);O.replaceChildren(D,B,E),L(S,A=>{if(!S||!w)return;const M=S.getBoundingClientRect(),K=$e((A.clientX-M.left)/M.width,0,1),j=$e((A.clientY-M.top)/M.height,0,1);z({...u,s:K,v:1-j},"input");},()=>F("change")),L(T,A=>{if(!T)return;const M=T.getBoundingClientRect(),K=$e((A.clientY-M.top)/M.height,0,1);z({...u,a:1-K},"input");},()=>F("change")),L(b,A=>{if(!b)return;const M=b.getBoundingClientRect(),K=$e((A.clientX-M.left)/M.width,0,1);z({...u,h:K*360},"input");},()=>F("change")),C.addEventListener("click",()=>{if(R=R==="hex"?"rgba":"hex",_){const A=Cn(u);_.value=R==="hex"?u.a===1?A.hex:A.hexa:A.rgba;}G(),_?.focus(),_?.select();}),_.addEventListener("input",()=>{if(R==="hex"){const A=Gy(_.value);if(A!==_.value){const M=_.selectionStart??A.length;_.value=A,_.setSelectionRange(M,M);}}});const P=()=>{const A=_.value;if(R==="hex"){const M=go(A);if(!M){_.value=u.a===1?Cn(u).hex:Cn(u).hexa;return}const K=A.startsWith("#")?A.slice(1):A,j=K.length===4||K.length===8;M.a=j?M.a:u.a,X(M,"change");}else {const M=zy(A),K=lc(M);if(!K){_.value=Cn(u).rgba;return}X(K,"change");}};_.addEventListener("change",P),_.addEventListener("blur",P),_.addEventListener("keydown",A=>{A.key==="Enter"&&(P(),_.blur());});}}return d&&(x&&x.remove(),I=h("input",{className:"color-picker__native",type:"color",value:hd(Lr({...u,a:1}))}),m.addEventListener("click",()=>I.click()),I.addEventListener("input",()=>{const O=go(I.value);O&&(O.a=u.a,X(O,"input"),F("change"));}),p.appendChild(I)),G(),{root:p,isMobile:d,getValue:()=>Cn(u),setValue:(O,D)=>{const B=lc(O)??go(O)??go("#FFFFFF");B&&(typeof D=="number"&&(B.a=D),X(B,null));}}}const jy=window;function Uy(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:jy}const Wy=Uy(),W=Wy;function Vy(e){try{return !!e.isSecureContext}catch{return  false}}function bd(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function xg(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function qy(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Xy(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Ky(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Yy(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Vy(W))return {ok:false,method:"clipboard-write"};if(!await qy())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Jy(e,t){try{const n=t||bd(),o=Xy(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy");}catch{r=!1;}return o.remove(),{ok:r,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Qy(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let o=false;if(n!==e)try{t.textContent=e,o=!0;}catch{}const r=Ky(t);o&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=xg()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:r,method:"selection",hint:i}}async function Zy(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const o=await Yy(n);if(o.ok)return o;const r=t.injectionRoot||bd(t.valueNode||void 0),i=Jy(n,r);if(i.ok)return i;const a=Qy(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(qe.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function ev(e,t,n={}){const o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);const i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=bd(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();const i=(t()??"").toString(),a=await Zy(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copié"):a.method==="selection"&&o(a.hint||(xg()?"⌘C pour copier":"Ctrl+C pour copier")):o("Impossible de copier");});}const yo={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function tv(e){const{host:t,themes:n,initialTheme:o,onThemeChange:r}=e;let i=o,a=null,s=false;function l(d){const u=n[d]||n[i]||{};t.setAttribute("data-theme",d),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=W.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=d,r?.(d);}function c(){return i}return l(o),{applyTheme:l,getCurrentTheme:c}}const cc={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,journal:false,system:false}}};async function nv(){const e=await Jn("tab-settings",{version:2,defaults:cc,sanitize:r=>({ui:{expandedCards:Oo(cc.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Oo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}class ov{constructor(){H(this,"injections",new Map);H(this,"state",{});H(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(r){console.error(`[InjectionRegistry] Failed to init ${t}:`,r);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const o=this.injections.get(t);if(!o){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?o.injection.init():o.injection.destroy(),console.log(`[InjectionRegistry] ${o.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const o=ve(n.storageKey,n.defaultEnabled??false);this.state[t]=o;}saveState(t){const n=this.injections.get(t);n&&we(n.storageKey,this.state[t]);}}let fl=null;function os(){return fl||(fl=new ov),fl}function yg(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function rv(){return Object.keys(yo).map(e=>({value:e,label:yg(e)}))}const iv=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function av(e){return yg(e.replace(/^--/,""))}function sv(e){return e.alpha<1?e.rgba:e.hex}const kn={pets:{enabled:true},autoFavorite:{enabled:true},bulkFavorite:{enabled:false},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class lv extends Xt{constructor(n){super({id:"tab-settings",label:"Settings"});H(this,"featureConfig",kn);this.deps=n;}async build(n){const o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await nv();}catch{r={get:()=>cc,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=r.get(),a=ve(ke.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(a);const s=Object.keys(yo),l=this.deps.getCurrentTheme?.()??this.deps.initialTheme,c=s.includes(l)?l:s[0]??"dark";let d=c;const u=gd({text:"Theme",tone:"muted",size:"lg"}),p=Vn({options:rv(),value:c,onChange:w=>{d=w,this.deps.applyTheme(w),this.renderThemePickers(w,f,d);}}),f=h("div",{className:"settings-theme-grid"}),g=Ee({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:w=>r.setCardExpanded("style",w)},h("div",{className:"kv settings-theme-row"},u.root,p.root),f);this.renderThemePickers(c,f,d);const m=this.createHUDSectionsCard({defaultExpanded:!!i.ui.expandedCards.hudSections,onExpandChange:w=>r.setCardExpanded("hudSections",w)}),y=this.createEnhancementsCard({defaultExpanded:!!i.ui.expandedCards.enhancements,onExpandChange:w=>r.setCardExpanded("enhancements",w)}),x=this.createJournalCard({defaultExpanded:!!i.ui.expandedCards.journal,onExpandChange:w=>r.setCardExpanded("journal",w)}),S=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:w=>r.setCardExpanded("system",w)});o.appendChild(g),o.appendChild(m),o.appendChild(y),o.appendChild(x),o.appendChild(S);}mergeFeatureConfig(n){return {pets:{...kn.pets,...n.pets},autoFavorite:{...kn.autoFavorite,...n.autoFavorite},bulkFavorite:{...kn.bulkFavorite,...n.bulkFavorite},cropSizeIndicator:{...kn.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...kn.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...kn.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){we(ke.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const o=(r,i,a,s,l=false,c=false)=>{const d=h("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${l?"0":"12px"} 0 ${c?"0":"12px"} 0;
          ${c?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${i?"1":"0.5"};
        `}),u=h("div"),p=h("div",{style:"font-weight: 500; margin-bottom: 4px;"},r),f=h("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);u.append(p,f);const g=hn({checked:i,onChange:m=>{d.style.opacity=m?"1":"0.5",a(m);}});return d.append(u,g.root),d};return Ee({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},h("div",{},o("Auto-Favorite",this.featureConfig.autoFavorite.enabled,r=>{this.featureConfig.autoFavorite.enabled=r,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),o("Pets",this.featureConfig.pets.enabled,r=>{this.featureConfig.pets.enabled=r,this.saveFeatureConfig();},"Pet management and team tracking",false,true)))}createSectionRow(n,o,r,i,a=false,s=false){const l=h("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${a?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${o?"1":"0.5"};
      `}),c=h("div"),d=h("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),u=h("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},i);c.append(d,u);const p=hn({checked:o,onChange:f=>{l.style.opacity=f?"1":"0.5",r(f);}});return l.append(c,p.root),l}createEnhancementsCard(n){const o=os(),i=[...o.getAll().filter(s=>!this.isJournalInjection(s.id))].sort((s,l)=>s.name.localeCompare(l.name)),a=i.map((s,l)=>{const c=l===0,d=l===i.length-1,u=o.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{o.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,c,d)});return Ee({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},h("div",{},...a))}createJournalCard(n){const o=os(),i=[...o.getAll().filter(s=>this.isJournalInjection(s.id)).filter(s=>s.id!=="journalHints"&&s.id!=="journalFilterSort")].sort((s,l)=>s.name.localeCompare(l.name)),a=i.map((s,l)=>{const c=l===0,d=l===i.length-1,u=o.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{o.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,c,d)});return Ee({title:"Journal",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},h("div",{},...a))}isJournalInjection(n){return n==="abilitiesInject"||n==="journalHints"||n==="journalFilterSort"||n==="journalAllTab"||n==="missingVariantsIndicator"}renderThemePickers(n,o,r){const i=yo[n];if(o.replaceChildren(),!!i)for(const a of iv){const s=i[a];if(s==null)continue;const l=Hy({label:av(a),value:s,defaultExpanded:false,onInput:c=>this.updateThemeVar(n,a,c,r),onChange:c=>this.updateThemeVar(n,a,c,r)});o.appendChild(l.root);}}updateThemeVar(n,o,r,i){const a=yo[n];a&&(a[o]=sv(r),i===n&&this.deps.applyTheme(n));}createEnvCard(n){const o=n?.defaultExpanded??false,r=n?.onExpandChange,i=(x,S)=>{const w=h("div",{className:"kv kv--inline-mobile"}),T=h("label",{},x),k=h("div",{className:"ro"});return typeof S=="string"?k.textContent=S:k.append(S),w.append(T,k),w},a=h("code",{},"—"),s=h("span",{},"—"),l=h("span",{},"—"),c=h("span",{},"—"),d=h("span",{},"—"),u=h("span",{},"—"),p=()=>{const x=qe.detect();l.textContent=x.surface??"Unknown",c.textContent=x.platform??"Unknown",d.textContent=x.browser??"Unknown",u.textContent=x.os??"Unknown",a.textContent=x.host??"Unknown",s.textContent=x.isInIframe?"Yes":"No";},f=Me({label:"Copy JSON",variant:"primary",size:"sm"});ev(f,()=>{const x=qe.detect();return JSON.stringify(x,null,2)});const g=h("div",{style:"width:100%;display:flex;justify-content:center;"},f),m=Ee({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:o,onExpandChange:r},i("Surface",l),i("Platform",c),i("Browser",d),i("OS",u),i("Host",a),i("Iframe",s)),y=()=>{document.hidden||p();};return document.addEventListener("visibilitychange",y),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",y)),m}}function vi(e){const{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:l=true,compact:c=false,maxHeight:d,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:y=(oe,$)=>String($),onSortChange:x,onSelectionChange:S,onRowClick:w}=e;let T=n.slice(),k=o.slice(),b=o.slice(),v=null,_=null,C=1;const I=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,R=!!s&&!(l&&I),F=h("div",{className:"lg-table-wrap",id:t});if(d!=null){const oe=typeof d=="number"?`${d}px`:d;F.style.setProperty("--tbl-max-h",oe);}const G=h("div",{className:"lg-table"}),z=h("div",{className:"lg-thead"}),X=h("div",{className:"lg-tbody"}),L=h("div",{className:"lg-tfoot"});i&&F.classList.add("sticky"),a&&F.classList.add("zebra"),c&&F.classList.add("compact"),u&&F.classList.add("selectable");const O=p==="switch"?"52px":"36px";F.style.setProperty("--check-w",O);function D(oe){return oe==="center"?"center":oe==="right"?"flex-end":"flex-start"}function B(){const oe=T.map(Y=>{const ee=(Y.width||"1fr").trim();return /\bfr$/.test(ee)?`minmax(0, ${ee})`:ee}),$=(u?[O,...oe]:oe).join(" ");F.style.setProperty("--lg-cols",$);}B();function U(){return r?Math.max(1,Math.ceil(k.length/r)):1}function E(){if(!r)return k;const oe=(C-1)*r;return k.slice(oe,oe+r)}function P(){if(!v||!_)return;const oe=T.find(ee=>String(ee.key)===v),$=_==="asc"?1:-1,Y=oe?.sortFn?(ee,re)=>$*oe.sortFn(ee,re):(ee,re)=>{const te=ee[v],ae=re[v];return te==null&&ae==null?0:te==null?-1*$:ae==null?1*$:typeof te=="number"&&typeof ae=="number"?$*(te-ae):$*String(te).localeCompare(String(ae),void 0,{numeric:true,sensitivity:"base"})};k.sort(Y);}const A=new Set(g);function M(){return Array.from(A)}const K=new Map;function j(oe){A.clear(),oe.forEach($=>A.add($)),_e(),K.forEach(($,Y)=>{$.setChecked(A.has(Y),true);}),vn(),S?.(M());}function V(){A.clear(),_e(),K.forEach(oe=>oe.setChecked(false,true)),vn(),S?.(M());}let Z=null;function _e(){if(!Z)return;const oe=E();if(!oe.length){Z.indeterminate=false,Z.checked=false;return}const $=oe.map((ee,re)=>y(ee,(C-1)*(r||0)+re)),Y=$.reduce((ee,re)=>ee+(A.has(re)?1:0),0);Z.checked=Y===$.length,Z.indeterminate=Y>0&&Y<$.length;}let Ie=false;function ro(){Ie=false;const oe=X.offsetWidth-X.clientWidth;z.style.paddingRight=oe>0?`${oe}px`:"0px";}function Jt(){Ie||(Ie=true,requestAnimationFrame(ro));}const Dt=new ResizeObserver(()=>Jt()),io=()=>Jt();function Bi(){z.replaceChildren();const oe=h("div",{className:"lg-tr lg-tr-head"});if(u){const $=h("div",{className:"lg-th lg-th-check"});m||(Z=h("input",{type:"checkbox"}),Z.addEventListener("change",()=>{const Y=E(),ee=Z.checked;Y.forEach((re,te)=>{const ae=y(re,(C-1)*(r||0)+te);ee?A.add(ae):A.delete(ae);}),S?.(M()),vn();}),$.appendChild(Z)),oe.appendChild($);}T.forEach($=>{const Y=h("button",{className:"lg-th",type:"button",title:$.title||$.header});Y.textContent=$.header,$.align&&Y.style.setProperty("--col-justify",D($.align)),$.sortable&&Y.classList.add("sortable"),v===String($.key)&&_?Y.setAttribute("data-sort",_):Y.removeAttribute("data-sort"),$.sortable&&Y.addEventListener("click",()=>{const ee=String($.key);v!==ee?(v=ee,_="asc"):(_=_==="asc"?"desc":_==="desc"?null:"asc",_||(v=null,k=b.slice())),x?.(v,_),v&&_&&P(),Sn();}),oe.appendChild(Y);}),z.appendChild(oe);try{Dt.disconnect();}catch{}Dt.observe(X),Jt();}function yn(oe){return Array.from(oe.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Zo(oe){return oe.querySelector(".lg-td, .lg-td-check")}function er(oe){const $=Zo(oe);return $?$.getBoundingClientRect():null}function vn(){const oe=E(),$=new Map;Array.from(X.children).forEach(te=>{const ae=te,me=ae.getAttribute("data-id");if(!me)return;const Te=er(ae);Te&&$.set(me,Te);});const Y=new Map;Array.from(X.children).forEach(te=>{const ae=te,me=ae.getAttribute("data-id");me&&Y.set(me,ae);});const ee=[];for(let te=0;te<oe.length;te++){const ae=oe[te],me=(r?(C-1)*r:0)+te,Te=y(ae,me);ee.push(Te);let he=Y.get(Te);he||(he=ul(ae,me),R&&yn(he).forEach(tr=>{tr.style.transform="translateY(6px)",tr.style.opacity="0";})),X.appendChild(he);}const re=[];if(Y.forEach((te,ae)=>{ee.includes(ae)||re.push(te);}),!R){re.forEach(te=>te.remove()),_e(),Jt();return}ee.forEach(te=>{const ae=X.querySelector(`.lg-tr-body[data-id="${te}"]`);if(!ae)return;const me=er(ae),Te=$.get(te),he=yn(ae);if(Te&&me){const _t=Te.left-me.left,ao=Te.top-me.top;he.forEach(Qt=>{Qt.style.transition="none",Qt.style.transform=`translate(${_t}px, ${ao}px)`,Qt.style.opacity="1";}),Zo(ae)?.getBoundingClientRect(),he.forEach(Qt=>{Qt.style.willChange="transform, opacity",Qt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(Qt=>{Qt.style.transform="translate(0,0)";});});}else he.forEach(_t=>{_t.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(_t=>{_t.style.transform="translate(0,0)",_t.style.opacity="1";});});const pl=_t=>{(_t.propertyName==="transform"||_t.propertyName==="opacity")&&(he.forEach(ao=>{ao.style.willChange="",ao.style.transition="",ao.style.transform="",ao.style.opacity="";}),_t.currentTarget.removeEventListener("transitionend",pl));},tr=he[0];tr&&tr.addEventListener("transitionend",pl);}),re.forEach(te=>{const ae=yn(te);ae.forEach(he=>{he.style.willChange="transform, opacity",he.style.transition="transform .18s ease, opacity .18s ease",he.style.opacity="0",he.style.transform="translateY(-6px)";});const me=he=>{he.propertyName==="opacity"&&(he.currentTarget.removeEventListener("transitionend",me),te.remove());},Te=ae[0];Te?Te.addEventListener("transitionend",me):te.remove();}),_e(),Jt();}function ul(oe,$){const Y=y(oe,$),ee=h("div",{className:"lg-tr lg-tr-body","data-id":Y});if(u){const re=h("div",{className:"lg-td lg-td-check"});if(p==="switch"){const te=hn({size:"sm",checked:A.has(Y),onChange:ae=>{ae?A.add(Y):A.delete(Y),_e(),S?.(M());}});K.set(Y,te),re.appendChild(te.root);}else {const te=h("input",{type:"checkbox",className:"lg-row-check"});te.checked=A.has(Y),te.addEventListener("change",ae=>{ae.stopPropagation(),te.checked?A.add(Y):A.delete(Y),_e(),S?.(M());}),te.addEventListener("click",ae=>ae.stopPropagation()),re.appendChild(te);}ee.appendChild(re);}return T.forEach(re=>{const te=h("div",{className:"lg-td"});re.align&&te.style.setProperty("--col-justify",D(re.align));let ae=re.render?re.render(oe,$):String(oe[re.key]??"");typeof ae=="string"?te.textContent=ae:te.appendChild(ae),ee.appendChild(te);}),(w||u&&f)&&(ee.classList.add("clickable"),ee.addEventListener("click",re=>{if(!re.target.closest(".lg-td-check")){if(u&&f){const te=!A.has(Y);if(te?A.add(Y):A.delete(Y),_e(),p==="switch"){const ae=K.get(Y);ae&&ae.setChecked(te,true);}else {const ae=ee.querySelector(".lg-row-check");ae&&(ae.checked=te);}S?.(M());}w?.(oe,$,re);}})),ee}function Gi(){if(L.replaceChildren(),!r)return;const oe=U(),$=h("div",{className:"lg-pager"}),Y=h("button",{className:"btn",type:"button"},"←"),ee=h("button",{className:"btn",type:"button"},"→"),re=h("span",{className:"lg-pager-info"},`${C} / ${oe}`);Y.disabled=C<=1,ee.disabled=C>=oe,Y.addEventListener("click",()=>wn(C-1)),ee.addEventListener("click",()=>wn(C+1)),$.append(Y,re,ee),L.appendChild($);}function wn(oe){const $=U();C=Math.min(Math.max(1,oe),$),vn(),Gi();}function Sn(){B(),Bi(),vn(),Gi();}function zi(oe){b=oe.slice(),k=oe.slice(),v&&_&&P(),wn(1);}function Hi(oe){T=oe.slice(),Sn();}function ji(oe,$="asc"){v=oe,_=oe?$:null,v&&_?P():k=b.slice(),Sn();}function Ui(){try{Dt.disconnect();}catch{}window.removeEventListener("resize",io);}return G.append(z,X,L),F.appendChild(G),window.addEventListener("resize",io),Sn(),{root:F,setData:zi,setColumns:Hi,sortBy:ji,getSelection:M,setSelection:j,clearSelection:V,setPage:wn,getState:()=>({page:C,pageCount:U(),sortKey:v,sortDir:_}),destroy:Ui}}let rs=false;const xr=new Set;function cv(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const ct=e=>{const t=cv();if(t){for(const n of xr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function dv(){rs||(rs=true,window.addEventListener("keydown",ct,true),window.addEventListener("keypress",ct,true),window.addEventListener("keyup",ct,true),document.addEventListener("keydown",ct,true),document.addEventListener("keypress",ct,true),document.addEventListener("keyup",ct,true));}function uv(){rs&&(rs=false,window.removeEventListener("keydown",ct,true),window.removeEventListener("keypress",ct,true),window.removeEventListener("keyup",ct,true),document.removeEventListener("keydown",ct,true),document.removeEventListener("keypress",ct,true),document.removeEventListener("keyup",ct,true));}function pv(e){return xr.size===0&&dv(),xr.add(e),()=>{xr.delete(e),xr.size===0&&uv();}}function Ki(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function fv(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function Is(e={}){const{id:t,placeholder:n="Search...",value:o="",size:r="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:l,autoSearch:c=false,debounceMs:d=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Clear",ariaLabel:y,submitLabel:x,loading:S=false,blockGameKeys:w=true}=e,T=h("div",{className:"search"+(r?` search--${r}`:""),id:t}),k=h("span",{className:"search-ico search-ico--left"});if(p){const V=Ki(p);V&&k.appendChild(V);}else k.textContent="🔎",k.style.opacity=".9";const b=h("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":y||n}),v=h("span",{className:"search-ico search-ico--right"});if(f){const V=Ki(f);V&&v.appendChild(V);}const _=fv();_.classList.add("search-spinner");const C=g?h("button",{className:"search-clear",type:"button",title:m},"×"):null,I=x!=null?h("button",{className:"btn search-submit",type:"button"},x):null,R=h("div",{className:"search-field"},k,b,v,_,...C?[C]:[]);T.append(R,...I?[I]:[]);let F=!!i,G=null;function z(V){_.style.display=V?"inline-block":"none",T.classList.toggle("is-loading",V);}function X(){G!=null&&(window.clearTimeout(G),G=null);}function L(V){X(),d>0?G=window.setTimeout(()=>{G=null,V();},d):V();}function O(){s?.(b.value),c&&l&&l(b.value);}b.addEventListener("input",()=>{L(O);}),b.addEventListener("keydown",V=>{V.key==="Enter"?(V.preventDefault(),X(),l?.(b.value)):V.key==="Escape"&&(b.value.length>0?U("",{notify:true}):b.blur());}),C&&C.addEventListener("click",()=>U("",{notify:true})),I&&I.addEventListener("click",()=>l?.(b.value));let D=()=>{};if(w&&(D=pv(b)),u){const V=Z=>{if(Z.key===u&&!Z.ctrlKey&&!Z.metaKey&&!Z.altKey){const _e=document.activeElement;_e&&(_e.tagName==="INPUT"||_e.tagName==="TEXTAREA"||_e.isContentEditable)||(Z.preventDefault(),b.focus());}};window.addEventListener("keydown",V,true),T.__cleanup=()=>{window.removeEventListener("keydown",V,true),D();};}else T.__cleanup=()=>{D();};function B(V){F=!!V,b.disabled=F,C&&(C.disabled=F),I&&(I.disabled=F),T.classList.toggle("disabled",F);}function U(V,Z={}){const _e=b.value;b.value=V??"",Z.notify&&_e!==V&&L(O);}function E(){return b.value}function P(){b.focus();}function A(){b.blur();}function M(V){b.placeholder=V;}function K(V){U("",V);}return B(F),z(S),a&&P(),{root:T,input:b,getValue:E,setValue:U,focus:P,blur:A,setDisabled:B,setPlaceholder:M,clear:K,setLoading:z,setIconLeft(V){k.replaceChildren();const Z=Ki(V??"🔎");Z&&k.appendChild(Z);},setIconRight(V){v.replaceChildren();const Z=Ki(V??"");Z&&v.appendChild(Z);}}}const Ps=e=>new Promise(t=>setTimeout(t,e)),vt=e=>{try{return e()}catch{return}},Lt=(e,t,n)=>Math.max(t,Math.min(n,e)),gv=e=>Lt(e,0,1);async function Ku(e,t,n){const o=performance.now();for(;performance.now()-o<t;){const r=await Promise.race([e,Ps(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}let xd=null;function vg(){return xd}function mv(e){xd=e;}function wg(){return xd!==null}const hv=/\/(?:r\/\d+\/)?version\/([^/]+)/,bv=15e3,xv=50;function yv(){return W?.document??(typeof document<"u"?document:null)}function yd(e={}){if(wg())return;const t=e.doc??yv();if(!t)return;const n=t.scripts;for(let o=0;o<n.length;o++){const i=n.item(o)?.src;if(!i)continue;const a=i.match(hv);if(a?.[1]){mv(a[1]);return}}}function vv(){return yd(),vg()}function wv(){return wg()}async function Sv(e={}){const t=e.timeoutMs??bv,n=performance.now();for(;performance.now()-n<t;){yd();const o=vg();if(o)return o;await Ps(xv);}throw new Error("MGVersion timeout (gameVersion not found)")}const vd={init:yd,isReady:wv,get:vv,wait:Sv},Cv=W?.location?.origin||"https://magicgarden.gg";function Sg(){return typeof GM_xmlhttpRequest=="function"}function Cg(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))});})}async function wd(e){if(Sg())return JSON.parse((await Cg(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function kg(e){if(Sg())return (await Cg(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function kv(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),r=W?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i);},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"));},i.src=o;})}const jt=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),_v=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Yu=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):_v(e)+String(t||"");let Sd=null,_g=null;function Tg(){return Sd}function Tv(){return _g}function Av(e){Sd=e;}function Ev(e){_g=e;}function Ag(){return Sd!==null}const Iv=15e3;async function Pv(e={}){Ag()||await Cd(e);}async function Cd(e={}){const t=Tg();if(t)return t;const n=Tv();if(n)return n;const o=(async()=>{const r=e.gameVersion??await vd.wait({timeoutMs:Iv}),i=`${Cv}/version/${r}/assets/`;return Av(i),i})();return Ev(o),o}async function Mv(e){const t=await Cd();return jt(t,e)}function Lv(){return Ag()}const Qn={init:Pv,isReady:Lv,base:Cd,url:Mv},Eg=new Map;function Nv(e){return Eg.get(e)}function Rv(e,t){Eg.set(e,t);}const Ig="manifest.json";let dc=null;async function Ov(){dc||(dc=await Pg());}function $v(){return dc!==null}async function Pg(e={}){const t=e.baseUrl??await Qn.base(),n=Nv(t);if(n)return n;const o=wd(jt(t,Ig));return Rv(t,o),o}function Fv(e,t){return e.bundles.find(n=>n.name===t)??null}function Dv(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const o of n.src??[])typeof o=="string"&&o.endsWith(".json")&&o!==Ig&&t.add(o);return Array.from(t)}const Ut={init:Ov,isReady:$v,load:Pg,getBundle:Fv,listJsonFromBundle:Dv},Bv=W,yt=Bv.Object??Object,Ms=yt.keys,is=yt.values,as=yt.entries,Ju=new WeakSet;function Gv(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const se=Gv(),_n={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},zv=["Rain","Frost","Dawn","AmberMoon"],Qu=/main-[^/]+\.js(\?|$)/,Hv=6,jv=150,Uv=2e3,Wv=200,Vv=50,qv=10,Xv=1e3,uc="ProduceScaleBoost",Tn=(e,t)=>t.every(n=>e.includes(n));function An(e,t){se.data[e]==null&&(se.data[e]=t,ss()&&Ng());}function ss(){return Object.values(se.data).every(e=>e!=null)}function Mg(e,t){if(!e||typeof e!="object"||Ju.has(e))return;Ju.add(e);let n;try{n=Ms(e);}catch{return}if(!n||n.length===0)return;const o=e;let r;if(!se.data.items&&Tn(n,_n.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&An("items",o)),!se.data.decor&&Tn(n,_n.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&An("decor",o)),!se.data.mutations&&Tn(n,_n.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&An("mutations",o)),!se.data.eggs&&Tn(n,_n.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&An("eggs",o)),!se.data.pets&&Tn(n,_n.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&An("pets",o)),!se.data.abilities&&Tn(n,_n.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&An("abilities",o)),!se.data.plants&&Tn(n,_n.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&An("plants",o)),!(t>=Hv))for(const i of n){let a;try{a=o[i];}catch{continue}a&&typeof a=="object"&&Mg(a,t+1);}}function Ta(e){try{Mg(e,0);}catch{}}function Lg(){if(!se.isHookInstalled){if(yt.__MG_HOOKED__){se.isHookInstalled=true;return}yt.__MG_HOOKED__=true,se.isHookInstalled=true;try{yt.keys=function(t){return Ta(t),Ms.apply(this,arguments)},is&&(yt.values=function(t){return Ta(t),is.apply(this,arguments)}),as&&(yt.entries=function(t){return Ta(t),as.apply(this,arguments)});}catch{}}}function Ng(){if(se.isHookInstalled){try{yt.keys=Ms,is&&(yt.values=is),as&&(yt.entries=as);}catch{}se.isHookInstalled=false;}}function Kv(){if(se.scanInterval||ss())return;const e=()=>{if(ss()||se.scanAttempts>jv){Rg();return}se.scanAttempts++;try{Ms(W).forEach(t=>{try{Ta(W[t]);}catch{}});}catch{}};e(),se.scanInterval=setInterval(e,Uv);}function Rg(){se.scanInterval&&(clearInterval(se.scanInterval),se.scanInterval=null);}const Zu=W;function Yv(){try{for(const e of Zu.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Qu.test(t))return t}}catch{}try{for(const e of Zu.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Qu.test(t))return t}}catch{}return null}function Jv(e,t){const n=[];let o=e.indexOf(t);for(;o!==-1;)n.push(o),o=e.indexOf(t,o+t.length);return n}function Ls(e,t){let n=0,o="",r=false;for(let i=t;i<e.length;i++){const a=e[i];if(o){if(r){r=false;continue}if(a==="\\"){r=true;continue}a===o&&(o="");continue}if(a==='"'||a==="'"||a==="`"){o=a;continue}if(a==="{")n++;else if(a==="}"&&--n===0)return e.slice(t,i+1)}return null}function Qv(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const o=e.indexOf("=",n);if(o<0||o>t)return null;const r=e.indexOf("{",o);return r<0||r>t?null:Ls(e,r)}let gl=null,nr=null;async function Og(){return gl||nr||(nr=(async()=>{const e=Yv();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return gl=n,n}catch{return null}finally{nr=null;}})(),nr)}function Zv(e){const t={};let n=false;for(const o of zv){const r=e?.[o];if(!r||typeof r!="object")continue;const i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}function e0(e,t){const n=Math.max(0,t-3e3),o=e.substring(n,t),r=/Rain:\{/,i=o.match(r);if(!i||i.index===void 0)return null;const a=n+i.index;let s=-1;for(let l=a-1;l>=Math.max(0,a-200);l--)if(e[l]==="{"){s=l;break}return s<0?null:Ls(e,s)}function t0(e){return e.replace(/\$t\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"').replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"')}async function n0(){if(se.data.weather)return  true;const e=await Og();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=Qv(e,t)??e0(e,t);if(!n)return  false;const o=t0(n);let r;try{r=Function('"use strict";return('+o+")")();}catch{return  false}const i=Zv(r);return i?(se.data.weather=i,true):false}function o0(){if(se.weatherPollingTimer)return;se.weatherPollAttempts=0;const e=setInterval(async()=>{(await n0()||++se.weatherPollAttempts>Wv)&&(clearInterval(e),se.weatherPollingTimer=null);},Vv);se.weatherPollingTimer=e;}function r0(){se.weatherPollingTimer&&(clearInterval(se.weatherPollingTimer),se.weatherPollingTimer=null);}const i0={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function a0(e){const t=Jv(e,uc);if(!t.length)return null;for(const n of t){const o=Math.max(0,n-4e3),r=Math.min(e.length,n+4e3),a=e.slice(o,r).lastIndexOf("switch(");if(a===-1)continue;const s=o+a,l=e.indexOf("{",s);if(l===-1)continue;const c=Ls(e,l);if(c&&c.includes(uc)&&(c.includes('bg:"')||c.includes("bg:'")))return c}return null}function s0(e){const t={},n=[],o=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,r=(a,s)=>{const l=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),c=a.match(l);return c?c[2]:null};let i;for(;(i=o.exec(e))!==null;){if(i[2]){n.push(i[2]);continue}const a=i[0];if(a.startsWith("default")){n.length=0;continue}if(!a.startsWith("return"))continue;const s=e.indexOf("{",i.index);if(s===-1){n.length=0;continue}const l=Ls(e,s);if(!l){n.length=0;continue}const c=r(l,"bg");if(!c){n.length=0;continue}const d=r(l,"hover")||c;for(const u of n)t[u]||(t[u]={bg:c,hover:d});n.length=0;}return Object.keys(t).length?t:null}async function l0(){const e=await Og();if(!e)return null;const t=a0(e);return t?s0(t):null}function c0(e){const t=e[uc];return t!=null&&typeof t=="object"&&"color"in t}async function d0(){if(!se.data.abilities)return  false;const e=se.data.abilities;if(c0(e))return  true;const t=await l0();if(!t)return  false;const n={};for(const[o,r]of Object.entries(e)){const i=t[o]||i0;n[o]={...r,color:{bg:i.bg,hover:i.hover}};}return se.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function u0(){if(se.colorPollingTimer)return;se.colorPollAttempts=0;const e=setInterval(async()=>{(await d0()||++se.colorPollAttempts>qv)&&(clearInterval(e),se.colorPollingTimer=null);},Xv);se.colorPollingTimer=e;}function p0(){se.colorPollingTimer&&(clearInterval(se.colorPollingTimer),se.colorPollingTimer=null);}function f0(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function g0(){return {lru:new Map,cost:0,srcCanvas:new Map}}function m0(){return {cache:new Map,maxEntries:200}}const h0={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},b0={enabled:true,maxEntries:200},je=f0(),x0=g0(),y0={...h0},v0=m0(),w0={...b0};function Qe(){return je}function $o(){return x0}function Kr(){return y0}function Yr(){return v0}function pc(){return w0}function $g(){return je.ready}const ep=Function.prototype.bind,ye={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Fg,Dg,Bg;const S0=new Promise(e=>{Fg=e;}),C0=new Promise(e=>{Dg=e;}),k0=new Promise(e=>{Bg=e;});function _0(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function T0(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function A0(e){ye.engine=e,ye.tos=T0(e)||null,ye.app=e.app||null,ye.renderer=e.app?.renderer||null,ye.ticker=e.app?.ticker||null,ye.stage=e.app?.stage||null;try{Fg(e);}catch{}try{ye.app&&Dg(ye.app);}catch{}try{ye.renderer&&Bg(ye.renderer);}catch{}}function kd(){return ye.engine?true:(ye._bindPatched||(ye._bindPatched=true,Function.prototype.bind=function(e,...t){const n=ep.call(this,e,...t);try{!ye.engine&&_0(e)&&(Function.prototype.bind=ep,ye._bindPatched=!1,A0(e));}catch{}return n}),false)}kd();async function E0(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(ye.engine)return  true;kd(),await Ps(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function I0(e=15e3){return ye.engine||await E0(e),true}function P0(){return ye.engine&&ye.app?{ok:true,engine:ye.engine,tos:ye.tos,app:ye.app}:(kd(),{ok:false,engine:ye.engine,tos:ye.tos,app:ye.app,note:"Not captured. Wait for room, or reload."})}const dt={engineReady:S0,appReady:C0,rendererReady:k0,engine:()=>ye.engine,tos:()=>ye.tos,app:()=>ye.app,renderer:()=>ye.renderer,ticker:()=>ye.ticker,stage:()=>ye.stage,PIXI:()=>W.PIXI||null,init:I0,hook:P0,ready:()=>!!ye.engine};function ls(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function wi(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?ls(o):`sprite/${n}/${o}`}function Jr(e,t,n,o){const r=wi(e,t);if(n.has(r)||o.has(r))return r;const i=String(t||"").trim();if(n.has(i)||o.has(i))return i;const a=ls(i);return n.has(a)||o.has(a)?a:r}function M0(e,t,n=25e3){const o=[e],r=new Set;let i=0;for(;o.length&&i++<n;){const a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l]);}return null}function L0(e){const t=W.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,o=M0(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function N0(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return L0(e)}catch{await Ps(50);}throw new Error("Constructors timeout")}const En=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function R0(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function ml(e,t,n,o,r){return new e(t,n,o,r)}function O0(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function $0(e,t,n,o){const{Texture:r,Rectangle:i}=o;for(const[a,s]of Object.entries(e.frames)){const l=s.frame,c=!!s.rotated,d=c?2:0,u=c?l.h:l.w,p=c?l.w:l.h,f=ml(i,l.x,l.y,u,p),g=s.sourceSize||{w:l.w,h:l.h},m=ml(i,0,0,g.w,g.h);let y=null;if(s.trimmed&&s.spriteSourceSize){const x=s.spriteSourceSize;y=ml(i,x.x,x.y,x.w,x.h);}n.set(a,O0(r,t,f,m,y,d,s.anchor||null));}}function F0(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;const i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i);}}function D0(e,t){const n=(o,r)=>{const i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const o of Object.keys(e.frames||{})){const r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2]);}}async function B0(e,t){const n=await Ut.load({baseUrl:e}),o=Ut.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");const r=Ut.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,l=new Map;async function c(d){if(i.has(d))return;i.add(d);const u=await wd(jt(e,d));if(!R0(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const y of p)await c(Yu(d,y));const f=Yu(d,u.meta.image),g=await kv(await kg(jt(e,f))),m=t.Texture.from(g);$0(u,m,a,t),F0(u,a,s),D0(u,l);}for(const d of r)await c(d);return {textures:a,animations:s,categoryIndex:l}}let Yi=null;async function G0(){return je.ready?true:Yi||(Yi=(async()=>{const e=performance.now();En("init start");const t=await Ku(dt.appReady,15e3,"PIXI app");En("app ready");const n=await Ku(dt.rendererReady,15e3,"PIXI renderer");En("renderer ready"),je.app=t,je.renderer=n||t?.renderer||null,je.ctors=await N0(t),En("constructors resolved"),je.baseUrl=await Qn.base(),En("base url",je.baseUrl);const{textures:o,animations:r,categoryIndex:i}=await B0(je.baseUrl,je.ctors);return je.textures=o,je.animations=r,je.categoryIndex=i,En("atlases loaded","textures",je.textures.size,"animations",je.animations.size,"categories",je.categoryIndex?.size??0),je.ready=true,En("ready in",Math.round(performance.now()-e),"ms"),true})(),Yi)}const Fo={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Gg=Object.keys(Fo),z0=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],tp=new Map(z0.map((e,t)=>[e,t]));function cs(e){return [...new Set(e.filter(Boolean))].sort((n,o)=>(tp.get(n)??1/0)-(tp.get(o)??1/0))}const H0=["Wet","Chilled","Frozen"],j0=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),U0={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},W0={Pepper:.5,Banana:.6},V0=256,q0=.5,X0=2;function zg(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=cs(e),n=K0(e),o=Y0(e);return {muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function K0(e){const t=e.filter((r,i,a)=>Fo[r]&&a.indexOf(r)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?cs(t.filter(r=>!H0.includes(r))):cs(t)}function Y0(e){const t=e.filter((n,o,r)=>Fo[n]?.overlayTall&&r.indexOf(n)===o);return cs(t)}function hl(e,t){return e.map(n=>({name:n,meta:Fo[n],overlayTall:Fo[n]?.overlayTall??null,isTall:t}))}const J0={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Ji=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(const r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function Q0(e){return Ji.has(e)?e:Ji.has("overlay")?"overlay":Ji.has("screen")?"screen":Ji.has("lighter")?"lighter":"source-atop"}function Z0(e,t,n,o,r=false){const i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){const u=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*u,s-Math.sin(i)*u,a+Math.cos(i)*u,s+Math.sin(i)*u)}const l=Math.cos(i),c=Math.sin(i),d=Math.abs(l)*t/2+Math.abs(c)*n/2;return e.createLinearGradient(a-l*d,s-c*d,a+l*d,s+c*d)}function np(e,t,n,o,r=false){const i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?Z0(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,l)=>a.addColorStop(l/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function ew(e,t,n,o){const r=J0[n];if(!r)return;const i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&o,s=t.width,l=t.height;e.save();const c=i.masked?Q0(i.op):"source-in";if(e.globalCompositeOperation=c,i.a!=null&&(e.globalAlpha=i.a),i.masked){const d=document.createElement("canvas");d.width=s,d.height=l;const u=d.getContext("2d");u.imageSmoothingEnabled=false,np(u,s,l,i,a),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(d,0,0);}else np(e,s,l,i,a);e.restore();}function tw(e){return /tallplant/i.test(e)}function _d(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Hg(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function nw(e,t){const n=String(e||"").toLowerCase();for(const o of t.keys()){const r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){const a=t.get(o);if(a)return {tex:a,key:o}}}return null}function ow(e,t,n,o){if(!t)return null;const r=_d(e),i=Hg(t);for(const a of i){const s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(const l of s){const c=n.get(l);if(c)return {tex:c,key:l}}{const l=`sprite/mutation-overlay/${a}TallPlant`,c=n.get(l);if(c)return {tex:c,key:l};const d=`sprite/mutation-overlay/${a}`,u=n.get(d);if(u)return {tex:u,key:d};const p=nw(t,n);if(p)return p}}return null}function rw(e,t,n,o){if(!t)return null;const r=Fo[t];if(n&&r?.tallIconOverride){const s=o.get(r.tallIconOverride);if(s)return s}const i=_d(e),a=Hg(t);for(const s of a){const l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const c of l){const d=o.get(c);if(d)return d}if(n){const c=`sprite/mutation-overlay/${s}TallPlantIcon`,d=o.get(c);if(d)return d;const u=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(u);if(p)return p}}return null}function iw(e,t,n){const o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=W0[t]??i;const l=r>o*1.5;let c=U0[t]??(l?a:.4);const d={x:(s-i)*o,y:(c-a)*r},u=Math.min(o,r),p=Math.min(1.5,u/V0);let f=q0*p;return n&&(f*=X0),{width:o,height:r,anchorX:i,anchorY:a,offset:d,iconScale:f}}function jg(e,t){return `${t.sig}::${e}`}function Ug(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function aw(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function sw(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Ug(o??null));}}function Wg(e,t){const n=e.lru.get(t);return n?(aw(e,t,n),n):null}function Vg(e,t,n,o){e.lru.set(t,n),e.cost+=Ug(n),sw(e,o);}function lw(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function cw(e,t){return e.srcCanvas.get(t)??null}function dw(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){const r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r);}}function Ns(e,t,n,o,r){const i=cw(o,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const l=new n.Sprite(e),c=t.extract.canvas(l);if(l.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&c){const d=Math.round(c.width/s),u=Math.round(c.height/s);a=document.createElement("canvas"),a.width=d,a.height=u;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(c,0,0,d,u));}else a=c;}}catch{}if(!a){const l=e?.frame||e?._frame,c=e?.orig||e?._orig,d=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!l||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(c?.width??l.width)|0),g=Math.max(1,(c?.height??l.height)|0),m=d?.x??0,y=d?.y??0;a.width=f,a.height=g;const x=a.getContext("2d");x.imageSmoothingEnabled=false,u===true||u===2||u===8?(x.save(),x.translate(m+l.height/2,y+l.width/2),x.rotate(-Math.PI/2),x.drawImage(p,l.x,l.y,l.width,l.height,-l.width/2,-l.height/2,l.width,l.height),x.restore()):x.drawImage(p,l.x,l.y,l.width,l.height,m,y,l.width,l.height);}return dw(o,e,a,r),a}function uw(e,t,n,o,r,i,a,s){const{w:l,h:c,aX:d,aY:u,basePos:p}=t,f=[];for(const g of n){const m=new o.Sprite(e);m.anchor?.set?.(d,u),m.position.set(p.x,p.y),m.zIndex=1;const y=document.createElement("canvas");y.width=l,y.height=c;const x=y.getContext("2d");x.imageSmoothingEnabled=false,x.save(),x.translate(l*d,c*u),x.drawImage(Ns(e,r,o,i,a),-l*d,-c*u),x.restore(),ew(x,y,g.name,g.isTall);const S=o.Texture.from(y,{resolution:e.resolution??1});s.push(S),m.texture=S,f.push(m);}return f}function pw(e,t,n,o,r,i,a,s,l,c){const{aX:d,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&o.get(f.overlayTall)&&{tex:o.get(f.overlayTall),key:f.overlayTall}||ow(e,f.name,o);if(!g?.tex)continue;const m=Ns(g.tex,i,r,a,s);if(!m)continue;const y=m.width,x={x:0,y:0},S={x:u.x-d*y,y:0},w=document.createElement("canvas");w.width=y,w.height=m.height;const T=w.getContext("2d");if(!T)continue;T.imageSmoothingEnabled=false,T.drawImage(m,0,0),T.globalCompositeOperation="destination-in",T.drawImage(l,-S.x,-0);const k=r.Texture.from(w,{resolution:g.tex.resolution??1});c.push(k);const b=new r.Sprite(k);b.anchor?.set?.(x.x,x.y),b.position.set(S.x,S.y),b.scale.set(1),b.alpha=1,b.zIndex=3,p.push(b);}return p}function fw(e,t,n,o,r,i){const{basePos:a}=t,s=[];for(const l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;const c=rw(e,l.name,l.isTall,o);if(!c)continue;const d=new r.Sprite(c),u=c?.defaultAnchor?.x??.5,p=c?.defaultAnchor?.y??.5;d.anchor?.set?.(u,p),d.position.set(a.x+i.offset.x,a.y+i.offset.y),d.scale.set(i.iconScale),l.isTall&&(d.zIndex=-1),j0.has(l.name)&&(d.zIndex=10),d.zIndex||(d.zIndex=2),s.push(d);}return s}function qg(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;const{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,c=e?.defaultAnchor?.x??.5,d=e?.defaultAnchor?.y??.5,u={x:s*c,y:l*d},p=Ns(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),f=new r;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(c,d),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const m=tw(t),y=hl(n.muts,m),x=hl(n.overlayMuts,m),S=hl(n.selectedMuts,m),w=[],T={w:s,h:l,aX:c,aY:d,basePos:u},k=_d(t),b=iw(e,k,m);uw(e,T,y,o.ctors,o.renderer,o.cacheState,o.cacheConfig,w).forEach(z=>f.addChild(z)),m&&pw(t,T,x,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,w).forEach(X=>f.addChild(X)),fw(t,T,S,o.textures,o.ctors,b).forEach(z=>f.addChild(z));let C={x:0,y:0,width:s,height:l};try{const z=f.getLocalBounds?.()||f.getBounds?.(!0);z&&Number.isFinite(z.width)&&Number.isFinite(z.height)&&(C={x:z.x,y:z.y,width:z.width,height:z.height});}catch{}const{Rectangle:I}=o.ctors,R=I?new I(0,0,s,l):void 0;let F=null;if(typeof o.renderer.generateTexture=="function"?F=o.renderer.generateTexture(f,{resolution:1,region:R}):o.renderer.textureGenerator?.generateTexture&&(F=o.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:R})),!F)throw new Error("no render texture");const G=F instanceof a?F:a.from(o.renderer.extract.canvas(F));try{G.__mg_base={baseX:-C.x,baseY:-C.y,baseW:s,baseH:l,texW:C.width,texH:C.height};}catch{}F&&F!==G&&F.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{G.__mg_gen=!0,G.label=`${t}|${n.sig}`;}catch{}return G}catch{return null}}function gw(e,t,n,o){if(!e||e.length<2)return null;const r=[];for(const i of e){const a=qg(i,t,n,o);a&&r.push(a);}return r.length>=2?r:null}function Xg(e,t,n,o,r){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",l=t.anchorX??.5,c=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${l}|ay${c}|bm${n}|bp${r}|p${o}`}function mw(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function hw(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,r=a);r&&e.cache.delete(r);}e.cache.set(n,{canvas:o,lastAccess:performance.now()});}}function op(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function bw(e){e.cache.clear();}function xw(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function yw(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function vw(e,t,n,o,r,i,a,s=5,l=0){if(!t.ready||!i.enabled)return 0;const c=e.length;let d=0;a?.(0,c);for(let u=0;u<c;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=Jr(null,f,t.textures,t.animations),m={scale:1},y=Yg(m),x=Jg(y,m),S=Zg(y,m.boundsPadding),w=Xg(g,m,y,x,S);r.cache.has(w)||fc(t,n,o,null,f,m,r,i),d++;}catch{d++;}a?.(d,c),u+s<c&&await yw();}return d}function ww(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Sw(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Td(e,t,n,o,r,i){if(!n.length)return t;const a=zg(n);if(!a.sig)return t;const s=jg(e,a),l=Wg(r,s);if(l?.tex)return l.tex;const c=qg(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(Vg(r,s,{isAnim:false,tex:c},i),c):t}function Kg(e,t,n,o,r,i){if(!n.length)return t;const a=zg(n);if(!a.sig)return t;const s=jg(e,a),l=Wg(r,s);if(l?.isAnim&&l.frames?.length)return l.frames;const c=gw(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(Vg(r,s,{isAnim:true,frames:c},i),c):t}function rp(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=Jr(o,r,e.textures,e.animations),s=i.mutations||[],l=i.parent||Sw(e)||ww(e),c=e.renderer?.width||e.renderer?.view?.width||innerWidth,d=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=i.center?c/2:i.x??c/2,p=i.center?d/2:i.y??d/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const x=Kg(a,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(x),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const w=new e.ctors.Sprite(x[0]),k=1e3/Math.max(1,i.fps||8);let b=0,v=0;const _=C=>{const I=e.app.ticker?.deltaMS??C*16.666666666666668;if(b+=I,b<k)return;const R=b/k|0;b%=k,v=(v+R)%x.length,w.texture=x[v];};w.__mgTick=_,e.app.ticker?.add?.(_),f=w;}}else {const x=e.textures.get(a);if(!x)throw new Error(`Unknown sprite/anim key: ${a}`);const S=Td(a,x,s,e,t,n);f=new e.ctors.Sprite(S);}const m=i.anchorX??f.texture?.defaultAnchor?.x??.5,y=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,y),f.position.set(u,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,l.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Cw(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const ip=new Map;function Yg(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function Jg(e,t){return e==="mutations"?t.pad??2:t.pad??0}function or(e){return Number.isFinite(e)?Math.max(0,e):0}function Qg(e){if(typeof e=="number"){const t=or(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:or(e.top??0),right:or(e.right??0),bottom:or(e.bottom??0),left:or(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Zg(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Qg(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function em(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function tm(e,t,n){const o=e?.__mg_base;return o&&Number.isFinite(o.baseX)&&Number.isFinite(o.baseY)&&Number.isFinite(o.baseW)&&Number.isFinite(o.baseH)&&Number.isFinite(o.texW)&&Number.isFinite(o.texH)?o:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function kw(e,t,n,o,r,i){const a=`${e}|f${t}`,s=ip.get(a);if(s)return s;const l=em(n),c={top:0,right:0,bottom:0,left:0};for(const d of Gg){const u=Td(e,n,[d],o,r,i),p=tm(u,l.w,l.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),y=Math.max(0,p.texH-p.baseY-p.baseH);f>c.left&&(c.left=f),g>c.top&&(c.top=g),m>c.right&&(c.right=m),y>c.bottom&&(c.bottom=y);}return ip.set(a,c),c}function fc(e,t,n,o,r,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const l=Jr(o,r,e.textures,e.animations),c=Yg(i),d=Jg(c,i),u=Zg(c,i.boundsPadding),p=a&&s?.enabled?Xg(l,i,c,d,u):null;if(p&&a&&s?.enabled){const w=mw(a,p);if(w)return op(w)}const f=i.mutations||[],g=e.animations.get(l),m=Math.max(0,(i.frameIndex??0)|0);let y,x;if(g?.length)if(y=g[m%g.length],f.length){const w=Kg(l,g,f,e,t,n);x=w[m%w.length];}else x=y;else {const w=e.textures.get(l);if(!w)throw new Error(`Unknown sprite/anim key: ${l}`);y=w,x=Td(l,w,f,e,t,n);}let S;if(c==="mutations"){const w=new e.ctors.Sprite(x),T=i.anchorX??w.texture?.defaultAnchor?.x??.5,k=i.anchorY??w.texture?.defaultAnchor?.y??.5;w.anchor?.set?.(T,k),w.scale.set(i.scale??1);const b=new e.ctors.Container;b.addChild(w);try{b.updateTransform?.();}catch{}const v=w.getBounds?.(true)||{x:0,y:0,width:w.width,height:w.height};w.position.set(-v.x+d,-v.y+d),S=Cw(e,b);try{b.destroy?.({children:!0});}catch{}}else {const w=i.scale??1;let T=Qg(i.boundsPadding);c==="padded"&&i.boundsPadding==null&&(T=kw(l,m,y,e,t,n)),d&&(T={top:T.top+d,right:T.right+d,bottom:T.bottom+d,left:T.left+d});const k=em(y),b=tm(x,k.w,k.h),v=Math.max(1,Math.ceil((k.w+T.left+T.right)*w)),_=Math.max(1,Math.ceil((k.h+T.top+T.bottom)*w));S=document.createElement("canvas"),S.width=v,S.height=_;const C=S.getContext("2d");if(C){C.imageSmoothingEnabled=false;const I=Ns(x,e.renderer,e.ctors,t,n),R=(T.left-b.baseX)*w,F=(T.top-b.baseY)*w;C.drawImage(I,R,F,I.width*w,I.height*w);}}return p&&a&&s?.enabled?(hw(a,s,p,S),op(S)):S}function _w(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Tw(e,t){return e.defaultParent=t,true}function Aw(e,t){return e.defaultParent=t,true}function Zn(){if(!$g())throw new Error("MGSprite not ready yet")}function Ew(e,t,n){return typeof t=="string"?rp(Qe(),$o(),Kr(),e,t,n||{}):rp(Qe(),$o(),Kr(),null,e,t||{})}function Iw(e,t,n){return typeof t=="string"?fc(Qe(),$o(),Kr(),e,t,n||{},Yr(),pc()):fc(Qe(),$o(),Kr(),null,e,t||{},Yr(),pc())}function Pw(){_w(Qe());}function Mw(e){return Tw(Qe(),e)}function Lw(e){return Aw(Qe(),e)}function Nw(e,t){const n=Qe(),o=typeof t=="string"?Jr(e,t,n.textures,n.animations):Jr(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function Rw(){Zn();const e=Qe().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Ow(e){Zn();const t=String(e||"").trim();if(!t)return [];const n=Qe().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function $w(e,t){Zn();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return  false;const r=Qe().categoryIndex;if(!r)return  false;const i=n.toLowerCase(),a=o.toLowerCase();for(const[s,l]of r.entries())if(s.toLowerCase()===i){for(const c of l.values())if(c.toLowerCase()===a)return  true}return  false}function Fw(e){Zn();const t=Qe().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),o=[];for(const[r,i]of t.entries())for(const a of i.values()){const s=wi(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s);}return o.sort((r,i)=>r.localeCompare(i))}function Dw(e){Zn();const t=String(e||"").trim();if(!t)return null;const n=ls(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;const r=o[1],i=o[2],a=Qe().categoryIndex,s=r.toLowerCase(),l=i.toLowerCase();let c=r,d=i;if(a){const u=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;c=u;const p=a.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===l);if(!f)return null;d=f;}return {category:c,id:d,key:wi(c,d)}}function Bw(e,t){Zn();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");const r=Qe().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(d=>d.toLowerCase()===i)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);const c=Array.from(l.values()).find(d=>d.toLowerCase()===a)||o;if(!l.has(c))throw new Error(`Unknown sprite id: ${n}/${o}`);return wi(s,c)}function Gw(){lw($o());}function zw(){bw(Yr());}function Hw(){return xw(Yr())}function jw(){return [...Gg]}async function Uw(e,t,n=10,o=0){return Zn(),vw(e,Qe(),$o(),Kr(),Yr(),pc(),t,n,o)}const Q={init:G0,isReady:$g,show:Ew,toCanvas:Iw,clear:Pw,attach:Mw,attachProvider:Lw,has:Nw,key:(e,t)=>wi(e,t),getCategories:Rw,getCategoryId:Ow,hasId:$w,listIds:Fw,getIdInfo:Dw,getIdPath:Bw,clearMutationCache:Gw,clearToCanvasCache:zw,getToCanvasCacheStats:Hw,getMutationNames:jw,warmup:Uw};function Ww(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Vw(e,t=[]){const n=new Set,o=r=>{const i=String(r||"").trim();i&&n.add(i);};o(e);for(const r of t)o(r);for(const r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function nm(e,t,n,o=[],r=[]){if(!Q)return console.warn("[MGData] MGSprite not available in pickSpriteId"),null;const i=Vw(e,o);if(!i.length)return null;const a=[t,...r].filter(d=>typeof d=="string"),s=d=>{const u=String(d||"").trim();if(!u)return null;for(const p of i)try{if(Q.has(p,u))return Q.getIdPath(p,u)}catch{}return null};for(const d of a){const u=s(d);if(u)return u}const l=Ww(n||""),c=s(l||n||"");if(c)return c;try{for(const d of i){const u=Q.listIds(`sprite/${d}/`),p=a.map(g=>String(g||"").toLowerCase()),f=String(n||l||"").toLowerCase();for(const g of u){const y=(g.split("/").pop()||"").toLowerCase();if(p.some(x=>x&&x===y)||y===f)return g}for(const g of u){const y=(g.split("/").pop()||"").toLowerCase();if(p.some(x=>x&&(y.includes(x)||x.includes(y)))||f&&(y.includes(f)||f.includes(y)))return g}}}catch{}return null}function at(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),l=nm(s,n,o,r,i);if(l)try{e.spriteId=l;}catch{}const c=e.rotationVariants;if(c&&typeof c=="object")for(const d of Object.values(c))at(d,s,n,o);if(e.immatureTileRef){const d={tileRef:e.immatureTileRef};at(d,s,n,o),d.spriteId&&(e.immatureSpriteId=d.spriteId);}if(e.topmostLayerTileRef){const d={tileRef:e.topmostLayerTileRef};at(d,s,n,o),d.spriteId&&(e.topmostLayerSpriteId=d.spriteId);}e.activeState&&typeof e.activeState=="object"&&at(e.activeState,s,n,e.activeState?.name||o);}function qw(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;const r=t[0],i=t.slice(1);return nm(e,r,n??null,o,i)}function Xw(e){for(const[t,n]of Object.entries(e.items||{}))at(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))at(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){at(n,"mutations",t,n?.name,["mutation"]);const o=qw("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))at(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))at(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const o=n;o.seed&&at(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&at(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&at(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function Kw(){try{console.log("[MGData] Resolving sprites..."),Xw(se.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const om=5e3,rm=50;function im(e){return new Promise(t=>setTimeout(t,e))}function Yw(e){return se.data[e]}function Jw(){return {...se.data}}function Qw(e){return se.data[e]!=null}async function Zw(e,t=om,n=rm){const o=Date.now();for(;Date.now()-o<t;){const r=se.data[e];if(r!=null)return r;await im(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function eS(e=om,t=rm){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(se.data).some(o=>o!=null))return {...se.data};await im(t);}throw new Error("MGData.waitForAnyData: timeout")}const am=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function sm(e){return am.includes(e)}function lm(e){return e.filter(t=>sm(t.action))}function ap(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${o}s`:`${o}s`}function bl(e){return e?.name||e?.petSpecies||"Unknown Pet"}function cm(e){const{action:t,parameters:n}=e,o=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${o.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${o.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const r=bl(o.targetPet),i=o.hungerRestoreAmount||0,s=o.pet?.id===o.targetPet?.id?"itself":r;return `Restored ${i} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${o.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${o.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const r=o.growSlot?.species||"Unknown",i=o.sellPrice||0;return `Ate ${r} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const r=bl(o.targetPet),i=o.strengthIncrease||0;return `Boosted ${r}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const r=bl(o.targetPet);return `Gave +${o.bonusXp||0} XP to ${r}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${o.eggId||"Unknown Egg"}`;case "ProduceRefund":{const r=o.cropsRefunded?.length||0;return `Refunded ${r} ${r===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${o.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const r=o.mutation||"Unknown";return `Made ${o.growSlot?.species||"Unknown"} turn ${r}`}case "PetXpBoost":case "PetXpBoostII":{const r=o.bonusXp||0,i=o.petsAffected?.length||0;return `Gave +${r} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const r=o.secondsReduced||0,i=o.eggsAffected?.length||0,a=ap(r);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const r=o.secondsReduced||0,i=o.numPlantsAffected||0,a=ap(r);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const r=o.scaleIncreasePercentage||0,i=o.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${r.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const J={async init(){Lg(),Kv(),o0(),u0();},isReady:ss,get:Yw,getAll:Jw,has:Qw,waitFor:Zw,waitForAny:eS,resolveSprites:Kw,cleanup(){Ng(),Rg(),r0(),p0();}},tS=new Map;function nS(){return tS}function gc(){return W.jotaiAtomCache?.cache}function pn(e){const t=nS(),n=t.get(e);if(n)return n;const o=gc();if(!o)return null;for(const r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function oS(){const e=W;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:o=>{const r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{const i=n.get(o);i&&i.add(r);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:false};}const rS={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Wo(){return rS}const iS="__JOTAI_STORE_READY__";let sp=false;const mc=new Set;function Qi(){if(!sp){sp=true;for(const e of mc)try{e();}catch{}try{const e=W.CustomEvent||CustomEvent;W.dispatchEvent?.(new e(iS));}catch{}}}function aS(e){mc.add(e);const t=bc();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{mc.delete(e);}}async function Rs(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,o=bc();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=false;const s=aS(()=>{a||(a=true,s(),r());}),l=Date.now();(async()=>{for(;!a&&Date.now()-l<t;){const d=bc();if(d.via&&!d.polyfill){if(a)return;a=true,s(),r();return}await Qr(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const Qr=e=>new Promise(t=>setTimeout(t,e));function dm(){try{const e=W.Event||Event;W.dispatchEvent?.(new e("visibilitychange"));}catch{}}function hc(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function xl(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(hc(e))return e;const o=["store","value","current","state","s","baseStore"];for(const r of o)try{const i=e[r];if(hc(i))return i}catch{}return null}function um(){const e=Wo(),t=W.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);r&&(n+=r.size||0);}if(n===0)return null;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);if(r)for(const i of r){const a=new Set,s=[i.current];for(;s.length;){const l=s.pop();if(!(!l||a.has(l))){a.add(l);try{const c=l?.pendingProps?.value;if(hc(c))return e.lastCapturedVia="fiber",c}catch{}try{let c=l?.memoizedState,d=0;for(;c&&d<15;){d++;const u=xl(c);if(u)return e.lastCapturedVia="fiber",u;const p=xl(c.memoizedState);if(p)return e.lastCapturedVia="fiber",p;c=c.next;}}catch{}try{if(l?.stateNode){const c=xl(l.stateNode);if(c)return e.lastCapturedVia="fiber",c}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate);}}}}return null}function pm(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function sS(e=5e3){const t=Date.now();let n=gc();for(;!n&&Date.now()-t<e;)await Qr(100),n=gc();if(!n)throw new Error("jotaiAtomCache.cache not found");const o=Wo();let r=null,i=null;const a=[],s=()=>{for(const c of a)try{c.__origWrite&&(c.write=c.__origWrite,delete c.__origWrite);}catch{}};for(const c of n.values()){if(!c||typeof c.write!="function"||c.__origWrite)continue;const d=c.write;c.__origWrite=d,c.write=function(u,p,...f){return i||(r=u,i=p,s()),d.call(this,u,p,...f)},a.push(c);}dm();const l=Date.now();for(;!i&&Date.now()-l<e;)await Qr(50);return i?(o.lastCapturedVia="write",{get:c=>r(c),set:(c,d)=>i(c,d),sub:(c,d)=>{let u;try{u=r(c);}catch{}const p=setInterval(()=>{let f;try{f=r(c);}catch{return}if(f!==u){u=f;try{d();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",pm())}async function lS(e=1e4){const t=Wo();dm();const n=Date.now();for(;Date.now()-n<e;){const o=um();if(o)return o;await Qr(50);}return t.lastCapturedVia="polyfill",pm()}async function Ad(){const e=Wo();if(e.baseStore&&!e.baseStore.__polyfill)return Qi(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Qr(25);if(e.baseStore)return e.baseStore.__polyfill||Qi(),e.baseStore}e.captureInProgress=true;try{const t=um();if(t)return e.baseStore=t,Qi(),t;try{const o=await sS(5e3);return e.baseStore=o,o.__polyfill||Qi(),o}catch(o){e.captureError=o;}const n=await lS();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function bc(){const e=Wo();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function cS(){const e=await Ad(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0;}catch{}const a=e.sub(r,()=>{let s;try{s=e.get(r);}catch{return}const l=i.last,c=!Object.is(s,l)||!i.has;if(i.last=s,i.has=true,c)for(const d of i.subs)try{d(s,l);}catch{}});return i.unsubUpstream=a,i};return {async get(r){const i=await n(r);if(i.has)return i.last;const a=e.get(r);return i.last=a,i.has=true,a},async set(r,i){await e.set(r,i);const a=await n(r);a.last=i,a.has=true;},async sub(r,i){const a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(r){return t.get(r)?.last},hasShadow(r){return !!t.get(r)?.has},async ensureWatch(r){await n(r);},async asStore(){return {get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Aa(){const e=Wo();return e.mirror||(e.mirror=await cS()),e.mirror}const xe={async select(e){const t=await Aa(),n=pn(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Aa(),o=pn(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t);},async subscribe(e,t){const n=await Aa(),o=pn(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r);}catch{}})},async subscribeImmediate(e,t){const n=await xe.select(e);try{t(n);}catch{}return xe.subscribe(e,t)}};async function fm(){await Aa();}const Si=Object.freeze(Object.defineProperty({__proto__:null,Store:xe,prewarm:fm,waitForStore:Rs},Symbol.toStringTag,{value:"Module"}));function Ed(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Zr(e,t){const n=Ed(t);let o=e;for(const r of n){if(o==null)return;o=o[r];}return o}function dS(e,t,n){const o=Ed(t);if(!o.length)return n;const r=Array.isArray(e)?[...e]:{...e??{}};let i=r;for(let a=0;a<o.length-1;a++){const s=o[a],l=i[s],c=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};i[s]=c,i=c;}return i[o[o.length-1]]=n,r}function lp(e,t){const n={};for(const o of t)n[o]=o.includes(".")?Zr(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function uS(e,t,n){const o=n.mode??"auto";function r(c){const d=t?Zr(c,t):c,u=new Map;if(d==null)return {signatures:u,keys:[]};const p=Array.isArray(d);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<d.length;g++){const m=d[g],y=n.key?n.key(m,g,c):g,x=n.sig?n.sig(m,g,c):n.fields?lp(m,n.fields):JSON.stringify(m);u.set(y,x);}else for(const[g,m]of Object.entries(d)){const y=n.key?n.key(m,g,c):g,x=n.sig?n.sig(m,g,c):n.fields?lp(m,n.fields):JSON.stringify(m);u.set(y,x);}return {signatures:u,keys:Array.from(u.keys())}}function i(c,d){if(c===d)return  true;if(!c||!d||c.size!==d.size)return  false;for(const[u,p]of c)if(d.get(u)!==p)return  false;return  true}async function a(c){let d=null;return xe.subscribeImmediate(e,u=>{const p=t?Zr(u,t):u,{signatures:f}=r(p);if(!i(d,f)){const g=new Set([...d?Array.from(d.keys()):[],...Array.from(f.keys())]),m=[];for(const y of g){const x=d?.get(y)??"__NONE__",S=f.get(y)??"__NONE__";x!==S&&m.push(y);}d=f,c({value:p,changedKeys:m});}})}async function s(c,d){return a(({value:u,changedKeys:p})=>{p.includes(c)&&d({value:u});})}async function l(c,d){const u=new Set(c);return a(({value:p,changedKeys:f})=>{const g=f.filter(m=>u.has(m));g.length&&d({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:l}}const mo=new Map;function pS(e,t){const n=mo.get(e);if(n)try{n();}catch{}return mo.set(e,t),()=>{try{t();}catch{}mo.get(e)===t&&mo.delete(e);}}function Se(e,t={}){const{path:n,write:o="replace"}=t,r=n?`${e}:${Ed(n).join(".")}`:e;async function i(){const u=await xe.select(e);return n?Zr(u,n):u}async function a(u){if(typeof o=="function"){const g=await xe.select(e),m=o(u,g);return xe.set(e,m)}const p=await xe.select(e),f=n?dS(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?xe.set(e,{...p,...u}):xe.set(e,f)}async function s(u){const p=await i(),f=u(p);return await a(f),f}async function l(u,p,f){let g;const m=x=>{const S=n?Zr(x,n):x;if(typeof g>"u"||!f(g,S)){const w=g;g=S,p(S,w);}},y=u?await xe.subscribeImmediate(e,m):await xe.subscribe(e,m);return pS(r,y)}function c(){const u=mo.get(r);if(u){try{u();}catch{}mo.delete(r);}}function d(u){return uS(e,u?.path??n,u)}return {label:r,get:i,set:a,update:s,onChange:(u,p=Object.is)=>l(false,u,p),onChangeNow:(u,p=Object.is)=>l(true,u,p),asSignature:d,stopOnChange:c}}function N(e){return Se(e)}N("positionAtom");N("lastPositionInMyGardenAtom");N("playerDirectionAtom");N("stateAtom");N("quinoaDataAtom");N("currentTimeAtom");N("actionAtom");N("isPressAndHoldActionAtom");N("mapAtom");N("tileSizeAtom");Se("mapAtom",{path:"cols"});Se("mapAtom",{path:"rows"});Se("mapAtom",{path:"spawnTiles"});Se("mapAtom",{path:"locations.seedShop.spawnTileIdx"});Se("mapAtom",{path:"locations.eggShop.spawnTileIdx"});Se("mapAtom",{path:"locations.toolShop.spawnTileIdx"});Se("mapAtom",{path:"locations.decorShop.spawnTileIdx"});Se("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});Se("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});Se("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});Se("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});Se("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});N("playerAtom");N("myDataAtom");N("myUserSlotIdxAtom");N("isSpectatingAtom");N("myCoinsCountAtom");N("numPlayersAtom");Se("playerAtom",{path:"id"});Se("myDataAtom",{path:"activityLogs"});N("userSlotsAtom");N("filteredUserSlotsAtom");N("myUserSlotAtom");N("spectatorsAtom");Se("stateAtom",{path:"child"});Se("stateAtom",{path:"child.data"});Se("stateAtom",{path:"child.data.shops"});const fS=Se("stateAtom",{path:"child.data.userSlots"}),gS=Se("stateAtom",{path:"data.players"}),mS=Se("stateAtom",{path:"data.hostPlayerId"});N("myInventoryAtom");N("myInventoryItemsAtom");N("isMyInventoryAtMaxLengthAtom");N("myFavoritedItemIdsAtom");N("myCropInventoryAtom");N("mySeedInventoryAtom");N("myToolInventoryAtom");N("myEggInventoryAtom");N("myDecorInventoryAtom");N("myPetInventoryAtom");Se("myInventoryAtom",{path:"favoritedItemIds"});N("itemTypeFiltersAtom");N("myItemStoragesAtom");N("myPetHutchStoragesAtom");N("myPetHutchItemsAtom");N("myPetHutchPetItemsAtom");N("myNumPetHutchItemsAtom");N("myValidatedSelectedItemIndexAtom");N("isSelectedItemAtomSuspended");N("mySelectedItemAtom");N("mySelectedItemNameAtom");N("mySelectedItemRotationsAtom");N("mySelectedItemRotationAtom");N("setSelectedIndexToEndAtom");N("myPossiblyNoLongerValidSelectedItemIndexAtom");N("myCurrentGlobalTileIndexAtom");N("myCurrentGardenTileAtom");N("myCurrentGardenObjectAtom");N("myOwnCurrentGardenObjectAtom");N("myOwnCurrentDirtTileIndexAtom");N("myCurrentGardenObjectNameAtom");N("isInMyGardenAtom");N("myGardenBoardwalkTileObjectsAtom");const hS=Se("myDataAtom",{path:"garden"});Se("myDataAtom",{path:"garden.tileObjects"});Se("myOwnCurrentGardenObjectAtom",{path:"objectType"});N("myCurrentStablePlantObjectInfoAtom");N("myCurrentSortedGrowSlotIndicesAtom");N("myCurrentGrowSlotIndexAtom");N("myCurrentGrowSlotsAtom");N("myCurrentGrowSlotAtom");N("secondsUntilCurrentGrowSlotMaturesAtom");N("isCurrentGrowSlotMatureAtom");N("numGrowSlotsAtom");N("myCurrentEggAtom");N("petInfosAtom");N("myPetInfosAtom");N("myPetSlotInfosAtom");N("myPrimitivePetSlotsAtom");N("myNonPrimitivePetSlotsAtom");N("expandedPetSlotIdAtom");N("myPetsProgressAtom");N("myActiveCropMutationPetsAtom");N("totalPetSellPriceAtom");N("selectedPetHasNewVariantsAtom");const bS=N("shopsAtom"),xS=N("myShopPurchasesAtom");N("seedShopAtom");N("seedShopInventoryAtom");N("seedShopRestockSecondsAtom");N("seedShopCustomRestockInventoryAtom");N("eggShopAtom");N("eggShopInventoryAtom");N("eggShopRestockSecondsAtom");N("eggShopCustomRestockInventoryAtom");N("toolShopAtom");N("toolShopInventoryAtom");N("toolShopRestockSecondsAtom");N("toolShopCustomRestockInventoryAtom");N("decorShopAtom");N("decorShopInventoryAtom");N("decorShopRestockSecondsAtom");N("decorShopCustomRestockInventoryAtom");N("isDecorShopAboutToRestockAtom");Se("shopsAtom",{path:"seed"});Se("shopsAtom",{path:"tool"});Se("shopsAtom",{path:"egg"});Se("shopsAtom",{path:"decor"});N("myCropItemsAtom");N("myCropItemsToSellAtom");N("totalCropSellPriceAtom");N("friendBonusMultiplierAtom");N("myJournalAtom");N("myCropJournalAtom");N("myPetJournalAtom");N("myStatsAtom");N("myActivityLogsAtom");N("newLogsAtom");N("hasNewLogsAtom");N("newCropLogsFromSellingAtom");N("hasNewCropLogsFromSellingAtom");N("myCompletedTasksAtom");N("myActiveTasksAtom");N("isWelcomeToastVisibleAtom");N("shouldCloseWelcomeToastAtom");N("isInitialMoveToDirtPatchToastVisibleAtom");N("isFirstPlantSeedActiveAtom");N("isThirdSeedPlantActiveAtom");N("isThirdSeedPlantCompletedAtom");N("isDemoTouchpadVisibleAtom");N("areShopAnnouncersEnabledAtom");N("arePresentablesEnabledAtom");N("isEmptyDirtTileHighlightedAtom");N("isPlantTileHighlightedAtom");N("isItemHiglightedInHotbarAtom");N("isItemHighlightedInModalAtom");N("isMyGardenButtonHighlightedAtom");N("isSellButtonHighlightedAtom");N("isShopButtonHighlightedAtom");N("isInstaGrowButtonHiddenAtom");N("isActionButtonHighlightedAtom");N("isGardenItemInfoCardHiddenAtom");N("isSeedPurchaseButtonHighlightedAtom");N("isFirstSeedPurchaseActiveAtom");N("isFirstCropHarvestActiveAtom");N("isWeatherStatusHighlightedAtom");N("weatherAtom");const Os=N("activeModalAtom");N("hotkeyBeingPressedAtom");N("avatarTriggerAnimationAtom");N("avatarDataAtom");N("emoteDataAtom");N("otherUserSlotsAtom");N("otherPlayerPositionsAtom");N("otherPlayerSelectedItemsAtom");N("otherPlayerLastActionsAtom");N("traderBunnyPlayerId");N("npcPlayersAtom");N("npcQuinoaUsersAtom");N("numNpcAvatarsAtom");N("traderBunnyEmoteTimeoutAtom");N("traderBunnyEmoteAtom");N("unsortedLeaderboardAtom");N("currentGardenNameAtom");N("quinoaEngineAtom");N("quinoaInitializationErrorAtom");N("avgPingAtom");N("serverClientTimeOffsetAtom");N("isEstablishingShotRunningAtom");N("isEstablishingShotCompleteAtom");const be={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function $s(){return be}function yS(){return be.initialized}function eo(){return be.isCustom&&be.activeModal!==null}function qn(){return be.activeModal}function gm(e){return !be.shadow||be.shadow.modal!==e?null:be.shadow.data}function vS(e){be.initialized=e;}function Id(e){be.activeModal=e;}function Pd(e){be.isCustom=e;}function mm(e,t){be.shadow={modal:e,data:t,timestamp:Date.now()};}function hm(){be.shadow=null;}function cp(e,t){be.patchedAtoms.add(e),be.originalReads.set(e,t);}function wS(e){return be.originalReads.get(e)}function xc(e){return be.patchedAtoms.has(e)}function SS(e){be.patchedAtoms.delete(e),be.originalReads.delete(e);}function CS(e){be.unsubscribes.push(e);}function kS(){for(const e of be.unsubscribes)try{e();}catch{}be.unsubscribes.length=0;}function _S(e){return be.listeners.onOpen.add(e),()=>be.listeners.onOpen.delete(e)}function bm(e){return be.listeners.onClose.add(e),()=>be.listeners.onClose.delete(e)}function xm(e){for(const t of Array.from(be.listeners.onOpen))try{t(e);}catch{}}function Md(e){for(const t of Array.from(be.listeners.onClose))try{t(e);}catch{}}function TS(){kS(),be.initialized=false,be.activeModal=null,be.isCustom=false,be.shadow=null,be.patchedAtoms.clear(),be.originalReads.clear(),be.listeners.onOpen.clear(),be.listeners.onClose.clear();}const Ld={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function ym(e){return Ld[e]}function AS(e){const t=Ld[e],n=[];for(const o of t.atoms)n.push(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)n.push(o.atomLabel);return n}const ES=new Set(["inventory","journal","stats","activityLog","petHutch"]),IS=new Set(["seedShop","eggShop","toolShop","decorShop"]),PS=new Set(["leaderboard"]);function MS(e,t,n,o){return function(i){const a=eo(),s=qn();if(a&&s===o){const l=gm(o);if(l!==null){let c;if(n.dataKey==="_full"?c=l:c=l[n.dataKey],c!==void 0)return t(i),n.transform?n.transform(c):c}}return t(i)}}function LS(e,t,n,o,r){return function(a){if(eo()&&qn()===r){const s=gm(r);if(s!==null){const l=s[n];if(l!==void 0)return t(a),o(l)}}return t(a)}}function NS(e){const t=ym(e);for(const n of t.atoms){const o=pn(n.atomLabel);if(!o||xc(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=MS(n.atomLabel,r,n,e);o.read=i,cp(n.atomLabel,r);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const o=pn(n.atomLabel);if(!o||xc(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=LS(n.atomLabel,r,n.sourceKey,n.deriveFn,e);o.read=i,cp(n.atomLabel,r);}}async function Fs(e){const t=ym(e);for(const o of t.atoms)dp(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)dp(o.atomLabel);const n=await Ad();await vm(n,e);}async function RS(e){const t=await Ad();await vm(t,e);const n=AS(e);for(const o of n){const r=pn(o);if(r)try{t.get(r);}catch{}}}function dp(e){if(!xc(e))return;const t=pn(e),n=wS(e);t&&n&&(t.read=n),SS(e);}async function vm(e,t){const n=ES.has(t),o=IS.has(t),r=PS.has(t);if(!n&&!o&&!r)return;const i=pn("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||o){const l=a.child,c=l?.data;if(l&&c&&typeof c=="object"){let d=null;if(n&&Array.isArray(c.userSlots)){const u=c.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});d={...d??c,userSlots:u};}if(o&&c.shops&&typeof c.shops=="object"&&(d={...d??c,shops:{...c.shops}}),d){const u={...l,data:d};s={...a,child:u};}}}if(r){const l=a.data;if(l&&Array.isArray(l.players)){const c={...l,players:[...l.players]};s={...s??a,data:c};}}if(!s)return;await e.set(i,s);}catch{}}async function OS(){for(const e of Object.keys(Ld))await Fs(e);}let Zi=null,Nr=null;async function $S(){if($s().initialized)return;Nr=await xe.select("activeModalAtom"),Zi=setInterval(async()=>{try{const n=await xe.select("activeModalAtom"),o=Nr;o!==n&&(Nr=n,FS(n,o));}catch{}},50),CS(()=>{Zi&&(clearInterval(Zi),Zi=null);}),vS(true);}function FS(e,t){const n=eo(),o=qn();e===null&&t!==null&&(n&&o===t?DS("native"):n||Md({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&xm({modal:e,isCustom:false});}async function DS(e){const t=qn();t&&(hm(),Pd(false),Id(null),await Fs(t),Md({modal:t,wasCustom:true,closedBy:e}));}async function BS(e,t){if(!$s().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");eo()&&await wm(),mm(e,t),Pd(true),Id(e),NS(e),await RS(e),await Os.set(e),Nr=e,xm({modal:e,isCustom:true});}function GS(e,t){const n=$s();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const r={...n.shadow.data,...t};mm(e,r);}async function wm(){const e=$s();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;hm(),Pd(false),Id(null),await Os.set(null),Nr=null,await Fs(t),Md({modal:t,wasCustom:true,closedBy:"api"});}function zS(){return new Promise(e=>{if(!eo()){e();return}const t=bm(()=>{t(),e();});})}async function HS(){if(eo()){const e=qn();e&&await Fs(e);}await OS(),TS();}const vo={async init(){return $S()},isReady(){return yS()},async show(e,t){return BS(e,t)},update(e,t){return GS(e,t)},async close(){return wm()},isOpen(){return qn()!==null},isCustomOpen(){return eo()},getActiveModal(){return qn()},waitForClose(){return zS()},onOpen(e){return _S(e)},onClose(e){return bm(e)},async destroy(){return HS()}};function jS(){return {ready:false,xform:null,xformAt:0}}const pt=jS();function Sm(){return pt.ready}function Vo(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Ci(){return dt.tos()}function Nd(){return dt.engine()}function US(){const e=Ci()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Rd(e,t){const n=US();return n?t*n+e|0:null}let ea=null;async function WS(e=15e3){return pt.ready?true:ea||(ea=(async()=>{if(await dt.init(e),!Ci())throw new Error("MGTile: engine captured but tileObject system not found");return pt.ready=true,true})(),ea)}function jn(e,t,n=true){const o=Ci(),r=Rd(e,t);if(!o||r==null)return {gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r);}catch{}return {gidx:r,tv:i||null}}function yl(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Od(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function wo(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Nd(),{gidx:s,tv:l}=jn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");const c=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function Ds(e,t,n={}){const o=n.ensureView!==false,r=n.clone!==false,{gidx:i,tv:a}=jn(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?Vo(s):s}}function VS(e,t,n={}){return wo(e,t,null,n)}function qS(e,t,n,o={}){const i=Ds(e,t,{...o,clone:false}).tileView?.tileObject;Od(i,"plant");const a=Vo(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return yl(a.slots[s],n.slotPatch),wo(e,t,a,o)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);yl(a.slots[l],s[l]);}}else if(s&&typeof s=="object")for(const l of Object.keys(s)){const c=Number(l)|0;if(Number.isFinite(c)){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);yl(a.slots[c],s[c]);}}else throw new Error("MGTile: patch.slots must be array or object map");return wo(e,t,a,o)}return wo(e,t,a,o)}function XS(e,t,n,o={}){const i=Ds(e,t,{...o,clone:false}).tileView?.tileObject;Od(i,"decor");const a=Vo(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),wo(e,t,a,o)}function KS(e,t,n,o={}){const i=Ds(e,t,{...o,clone:false}).tileView?.tileObject;Od(i,"egg");const a=Vo(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),wo(e,t,a,o)}function YS(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Nd(),{gidx:s,tv:l}=jn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");const c=l.tileObject,d=typeof n=="function"?n(Vo(c)):n;if(l.onDataChanged(d),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function JS(e,t,n={}){const o=n.ensureView!==false,{gidx:r,tv:i}=jn(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?Vo(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function vl(e){if(!e)return null;const t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const r of n)if(t(e[r]))return e[r];if(t(e))return e;const o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const r of o)if(t(r))return r;try{for(const r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function Ea(e){const t=vt(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=vt(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function QS(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Ea(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function ZS(){const e=Ci(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(const[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;const s=jn(i,a,true).tv,l=i+1<t?jn(i+1,a,true).tv:null,c=jn(i,a+1,true).tv,d=vl(s),u=vl(l),p=vl(c);if(!d||!u||!p)continue;const f=Ea(d),g=Ea(u),m=Ea(p);if(!f||!g||!m)continue;const y={x:g.x-f.x,y:g.y-f.y},x={x:m.x-f.x,y:m.y-f.y},S=y.x*x.y-y.y*x.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const w=1/S,T={a:x.y*w,b:-x.x*w,c:-y.y*w,d:y.x*w},k={x:f.x-i*y.x-a*x.x,y:f.y-i*y.y-a*x.y},b=QS(d),v=b==="center"?k:{x:k.x+.5*(y.x+x.x),y:k.y+.5*(y.y+x.y)};return {ok:true,cols:t,rows:o,vx:y,vy:x,inv:T,anchorMode:b,originCenter:v}}return null}function Cm(){return pt.xform=ZS(),pt.xformAt=Date.now(),{ok:!!pt.xform?.ok,xform:pt.xform}}function eC(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!pt.xform?.ok||t.forceRebuild||Date.now()-pt.xformAt>n)&&Cm();const o=pt.xform;if(!o?.ok)return null;const r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,l=Math.floor(a),c=Math.floor(s),d=[[l,c],[l+1,c],[l,c+1],[l+1,c+1]];let u=null,p=1/0;for(const[f,g]of d){if(f<0||g<0||f>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;const m=o.originCenter.x+f*o.vx.x+g*o.vy.x,y=o.originCenter.y+f*o.vx.y+g*o.vy.y,x=(e.x-m)**2+(e.y-y)**2;x<p&&(p=x,u={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=Rd(u.tx,u.ty),u):null}function tC(e,t){const n=pt.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function mt(){if(!Sm())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function nC(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const qt={init:WS,isReady:Sm,hook:dt.hook,engine:Nd,tos:Ci,gidx:(e,t)=>Rd(Number(e),Number(t)),getTileObject:(e,t,n={})=>(mt(),Ds(e,t,n)),inspect:(e,t,n={})=>(mt(),JS(e,t,n)),setTileEmpty:(e,t,n={})=>(mt(),VS(e,t,n)),setTilePlant:(e,t,n,o={})=>(mt(),qS(e,t,n,o)),setTileDecor:(e,t,n,o={})=>(mt(),XS(e,t,n,o)),setTileEgg:(e,t,n,o={})=>(mt(),KS(e,t,n,o)),setTileObjectRaw:(e,t,n,o={})=>(mt(),YS(e,t,n,o)),rebuildTransform:()=>(mt(),Cm()),pointToTile:(e,t={})=>(mt(),eC(e,t)),tileToPoint:(e,t)=>(mt(),tC(e,t)),getTransform:()=>(mt(),pt.xform),help:nC};function oC(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const ie=oC();function km(){return ie.ready}async function rC(e=15e3){if(ie.ready)return yc(),true;if(await dt.init(e),ie.app=dt.app(),ie.ticker=dt.ticker(),ie.renderer=dt.renderer(),ie.stage=dt.stage(),!ie.app||!ie.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return ie.ready=true,yc(),true}function yc(){const e=W;return e.$PIXI=e.PIXI||null,e.$app=ie.app||null,e.$renderer=ie.renderer||null,e.$stage=ie.stage||null,e.$ticker=ie.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:ie.ready},e.__MG_PIXI__}function $d(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function vc(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function ds(e){return !!(e&&typeof e.tint=="number")}function Xn(e){return !!(e&&typeof e.alpha=="number")}function Ia(e,t,n){return e+(t-e)*n}function iC(e,t,n){const o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,l=t&255,c=Ia(o,a,n)|0,d=Ia(r,s,n)|0,u=Ia(i,l,n)|0;return c<<16|d<<8|u}function aC(e,t=900){const n=[],o=[e];for(;o.length&&n.length<t;){const r=o.pop();if(!r)continue;ds(r)&&n.push(r);const i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a]);}return n}function sC(e,t=25e3){const n=[],o=[e];let r=0;for(;o.length&&r++<t;){const i=o.pop();if(!i)continue;Xn(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s]);}return n}const lC=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function wc(e){if(!e)return null;if(vc(e))return e;if(!$d(e))return null;for(const t of lC){const n=e[t];if(vc(n))return n}return null}function cC(e,t){const n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let l=true;for(let c=0;c<t;c++){const d=wc(i[c]);if(!d){l=false;break}s[c]=d;}if(l)return s}for(const s of i)n.push({o:s,d:a+1});continue}if($d(i)){const s=i;for(const l of Object.keys(s))n.push({o:s[l],d:a+1});}}}return null}function _m(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if($d(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;const a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}));}return n}function dC(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const o=_m(t);return ie.tileSets.set(n,o),{ok:true,name:n,count:o.length}}function uC(e){return ie.tileSets.delete(String(e||"").trim())}function pC(){return Array.from(ie.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Tm(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Fd(e){const n=qt.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Tm(e))return {entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=ie.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a;}else o=_m(e.tiles||[]);const r=new Map;for(const i of o){const a=qt.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView);}return {entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function Dd(e){const t=ie.highlights.get(e);if(!t)return  false;vt(()=>ie.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Xn(t.root)&&vt(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&ds(n.o)&&vt(()=>{n.o.tint=n.baseTint;});return ie.highlights.delete(e),true}function Am(e=null){for(const t of Array.from(ie.highlights.keys()))e&&!String(t).startsWith(e)||Dd(t);return  true}function Em(e,t={}){if(!vc(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(ie.highlights.has(n))return n;const o=Xn(e)?Number(e.alpha):null,r=Lt(Number(t.minAlpha??.12),0,1),i=Lt(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=Lt(Number(t.tintMix??.85),0,1),c=t.deepTint!==false,d=[];if(c)for(const f of aC(e))d.push({o:f,baseTint:f.tint});else ds(e)&&d.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,m=g*g*(3-2*g);o!=null&&Xn(e)&&(e.alpha=Lt(Ia(r,i,m)*o,0,1));const y=m*l;for(const x of d)x.o&&ds(x.o)&&(x.o.tint=iC(x.baseTint,s,y));};return ie.ticker?.add(p),ie.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:d}),n}function fC(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const o of n)if(String(o||"").toLowerCase()===t)return  true;return  false}function Im(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:o,gidxSet:r}=Fd(t),i=`hlmut:${n}:`;if(t.clear===true)if(!r)Am(i);else for(const u of Array.from(ie.highlights.keys())){if(!u.startsWith(i))continue;const p=u.split(":"),f=Number(p[2]);r.has(f)&&Dd(u);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,l=0,c=0,d=0;for(const[u,p]of o){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const y=[];for(let w=0;w<g.length;w++)fC(g[w],n)&&(y.push(w),m=true);if(!m)continue;s++,l+=y.length;const x=p?.childView?.plantVisual||p?.childView||p,S=cC(x,g.length);if(!S){d+=y.length;continue}for(const w of y){const T=S[w];if(!T){d++;continue}const k=`${i}${u}:${w}`;ie.highlights.has(k)||(Em(T,{key:k,...a}),c++);}}return {ok:true,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:c,failedSlots:d}}function gC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=ie.watches.get(o);i&&clearInterval(i);const a=setInterval(()=>{vt(()=>Im(n,{...t,clear:!1}));},r);return ie.watches.set(o,a),{ok:true,key:o,mutation:n,intervalMs:r}}function mC(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(ie.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),ie.watches.delete(i),r++);return r>0}const n=ie.watches.get(t);return n?(clearInterval(n),ie.watches.delete(t),true):false}function hC(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return wc(t)||wc(e?.displayObject)||null}function Pm(e){const t=ie.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Xn(n.o)&&Number.isFinite(n.baseAlpha)&&vt(()=>{n.o.alpha=n.baseAlpha;});return ie.fades.delete(e),true}function Sc(e=null){for(const t of Array.from(ie.fades.keys()))e&&!String(t).startsWith(e)||Pm(t);return  true}function Mm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const o=`fade:${n}:`;if(!Tm(t))return Sc(o);const{gidxSet:r}=Fd(t);if(!r)return Sc(o);for(const i of Array.from(ie.fades.keys())){if(!i.startsWith(o))continue;const a=Number(i.slice(o.length));r.has(a)&&Pm(i);}return  true}function Lm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const o=Lt(Number(t.alpha??.2),0,1),r=t.deep===true,{entries:i,gidxSet:a}=Fd(t),s=`fade:${n}:`;t.clear===true&&Mm(n,t);let l=0,c=0,d=0,u=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;l++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;c++;const y=hC(f);if(!y||!Xn(y)){u++;continue}const x=`${s}${p}`;if(ie.fades.has(x)){vt(()=>{y.alpha=o;}),d++;continue}const S=r?sC(y):[y],w=[];for(const T of S)Xn(T)&&w.push({o:T,baseAlpha:Number(T.alpha)});for(const T of w)vt(()=>{T.o.alpha=o;});ie.fades.set(x,{targets:w}),d++;}return {ok:true,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:l,matchedPlants:c,applied:d,failed:u,totalFades:ie.fades.size}}function bC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=ie.fadeWatches.get(o);i&&clearInterval(i);const a=setInterval(()=>{vt(()=>Lm(n,{...t,clear:!1}));},r);return ie.fadeWatches.set(o,a),{ok:true,key:o,species:n,intervalMs:r}}function xC(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(ie.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),ie.fadeWatches.delete(i),r++);return r>0}const n=ie.fadeWatches.get(t);return n?(clearInterval(n),ie.fadeWatches.delete(t),true):false}function yC(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function vC(e,t,n={}){const o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==false,a=qt.getTileObject(o,r,{ensureView:i,clone:false}),s=a?.tileView||null,l=s?.tileObject,c={ok:true,tx:o,ty:r,gidx:a?.gidx??qt.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?yC(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&vt(()=>console.log("[MGPixi.inspectTile]",c)),c}function wC(e,t,n){const o=W.PIXI;if(!o)return;let r=ie.stage.getChildByName("gemini-overlay");r||(r=new o.Container,r.name="gemini-overlay",ie.stage.addChild(r));const i=n.key;let a=r.getChildByName(i);a||(a=new o.Graphics,a.name=i,r.addChild(a));const s=qt.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const l=qt.getTransform(),c=l?Math.hypot(l.vx.x,l.vx.y):32,d=l?Math.hypot(l.vy.x,l.vy.y):32;a.drawRect(0,0,c,d),a.endFill(),a.x=s.x,a.y=s.y,l&&(a.rotation=Math.atan2(l.vx.y,l.vx.x));}function SC(e){const t=ie.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function ze(){if(!km())throw new Error("MGPixi: call MGPixi.init() first")}const Bs={init:rC,isReady:km,expose:yc,get app(){return ie.app},get renderer(){return ie.renderer},get stage(){return ie.stage},get ticker(){return ie.ticker},get PIXI(){return W.PIXI||null},defineTileSet:(e,t)=>(ze(),dC(e,t)),deleteTileSet:e=>(ze(),uC(e)),listTileSets:()=>(ze(),pC()),highlightPulse:(e,t)=>(ze(),Em(e,t)),stopHighlight:e=>(ze(),Dd(e)),clearHighlights:e=>(ze(),Am(e)),drawOverlayBox:(e,t,n)=>(ze(),wC(e,t,n)),stopOverlay:e=>(ze(),SC(e)),highlightMutation:(e,t)=>(ze(),Im(e,t)),watchMutation:(e,t)=>(ze(),gC(e,t)),stopWatchMutation:e=>(ze(),mC(e)),inspectTile:(e,t,n)=>(ze(),vC(e,t,n)),fadeSpecies:(e,t)=>(ze(),Lm(e,t)),clearSpeciesFade:(e,t)=>(ze(),Mm(e,t)),clearFades:e=>(ze(),Sc(e)),watchFadeSpecies:(e,t)=>(ze(),bC(e,t)),stopWatchFadeSpecies:e=>(ze(),xC(e))};function CC(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const ce=CC();function Nm(){return ce.ready}const up=W??window;async function Rm(){const e=ce.ctx;if(e)return e;const t=up.AudioContext||up.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return ce.ctx=n,n}async function Om(){if(ce.ctx&&ce.ctx.state==="suspended")try{await ce.ctx.resume();}catch{}}const kC={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},_C={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Rr=.001,Or=.2;function pp(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n);}catch{o=n;}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){const r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function ei(e){const t=kC[e],n=_C[e];if(!t)return {atom:Or,vol100:ta(Or)};const o=pp(t,NaN);if(Number.isFinite(o)){const i=Lt(o,0,1);return {atom:i,vol100:ta(i)}}if(n){const i=pp(n,NaN);if(Number.isFinite(i)){const a=Lt(i,0,1);return {atom:a,vol100:ta(a)}}}const r=Or;return {atom:r,vol100:ta(r)}}function TC(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const o=(Lt(t,1,100)-1)/99;return Rr+o*(Or-Rr)}function ta(e){const t=Lt(Number(e),0,1);if(t<=Rr)return 0;const n=(t-Rr)/(Or-Rr);return Math.round(1+n*99)}function $m(e,t){if(t==null)return ei(e).atom;const n=TC(t);return n===null?ei(e).atom:gv(n)}function AC(e){const t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r);};for(const o of Object.keys(e||{})){const r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o);}for(const[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);ce.sfx.groups=t;}function EC(e){const t=ce.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=ce.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function IC(){if(ce.sfx.buffer)return ce.sfx.buffer;if(!ce.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Rm();await Om();const n=await(await kg(ce.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{const a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i);});return ce.sfx.buffer=o,o}async function PC(e,t={}){if(!ce.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const o=EC(n),r=ce.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);const i=await Rm();await Om();const a=await IC(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),c=Math.max(.01,l-s),d=$m("sfx",t.volume),u=i.createGain();u.gain.value=d,u.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(u),p.start(0,s,c),{name:o,source:p,start:s,end:l,duration:c,volume:d}}const MC=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),LC=function(e){return "/"+e},fp={},ot=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let l=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");r=l(n.map(c=>{if(c=LC(c),c in fp)return;fp[c]=true;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":MC,d||(p.as="script"),p.crossOrigin="",p.href=c,s&&p.setAttribute("nonce",s),document.head.appendChild(p),d)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return r.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},Do={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},NC={sounds:[],itemCustomSounds:[],version:1},Tt={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class Bd extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class RC extends Bd{constructor(){super(`Maximum number of sounds reached (${Do.MAX_SOUNDS})`),this.name="SoundLimitError";}}class OC extends Bd{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${Do.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class $C extends Bd{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function FC(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||Gd(t),t}function Gs(){const e=ve(ut.MODULE.AUDIO_CUSTOM_SOUNDS,NC);return FC(e)}function Gd(e){we(ut.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function gp(){return Gs().sounds}function zs(e){const t=Gs();t.sounds=e,Gd(t);}function Hs(){return Gs().itemCustomSounds}function Fm(e){const t=Gs();t.itemCustomSounds=e,Gd(t);}function DC(e){const t={shop:{soundId:e.shop?.soundId??Tt.shop.soundId,volume:e.shop?.volume??Tt.shop.volume,mode:e.shop?.mode??Tt.shop.mode},pet:{soundId:e.pet?.soundId??Tt.pet.soundId,volume:e.pet?.volume??Tt.pet.volume,mode:e.pet?.mode??Tt.pet.mode},weather:{soundId:e.weather?.soundId??Tt.weather.soundId,volume:e.weather?.volume??Tt.weather.volume,mode:e.weather?.mode??Tt.weather.mode}};return t!==e&&Hd(t),t}function zd(){const e=ve(ut.MODULE.AUDIO_NOTIFICATION_SETTINGS,Tt);return DC(e)}function Hd(e){we(ut.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const BC="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",Dm=[{id:"default-notification",name:"Default",source:BC,type:"upload",createdAt:0}];function GC(e){const t=new Set(e.map(o=>o.id)),n=Dm.filter(o=>!t.has(o.id));return n.length===0?e:[...e,...n]}function Bm(e){return Dm.some(t=>t.id===e)}function zC(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const r=e.slice(n+1).length*3/4;return Math.round(r)}function Gm(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=zC(e);if(t>0&&t>Do.MAX_SIZE_BYTES)throw new OC(t)}function zm(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function HC(e){if(e>=Do.MAX_SOUNDS)throw new RC}let gt=[],Cc=false;function Ft(){Cc||Hm();}function jC(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function Hm(){if(Cc)return;let e=gp();e=GC(e),e.length!==gp().length&&zs(e),gt=e,Cc=true,console.log(`[CustomSounds] Initialized with ${gt.length} sounds`);}function UC(){return Ft(),[...gt]}function jm(e){return Ft(),gt.find(t=>t.id===e)}function WC(e,t,n){Ft(),zm(e),Gm(t),HC(gt.length);const o={id:jC(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return gt.push(o),zs(gt),console.log(`[CustomSounds] Added sound: ${o.name} (${o.id})`),o}function VC(e){if(Ft(),Bm(e))throw new Error("Cannot remove default sounds");const t=gt.findIndex(o=>o.id===e);if(t===-1)return  false;const n=gt.splice(t,1)[0];return zs(gt),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function qC(e,t){if(Ft(),Bm(e))throw new Error("Cannot update default sounds");const n=gt.find(o=>o.id===e);return n?(t.name!==void 0&&(zm(t.name),n.name=t.name.trim()),t.source!==void 0&&(Gm(t.source),n.source=t.source.trim()),zs(gt),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function XC(e,t={}){Ft();const n=jm(e);if(!n)throw new $C(e);const{MGAudio:o}=await ot(async()=>{const{MGAudio:r}=await Promise.resolve().then(()=>qm);return {MGAudio:r}},void 0);try{await o.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(r){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,r),r}}function KC(){ot(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>qm);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function YC(){return zd()}function JC(e){return zd()[e]}function QC(e,t){const n=zd();n[e]=t,Hd(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function ZC(e){Hd(e),console.log("[CustomSounds] Updated all notification settings");}function Bo(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function Um(e,t,n){Ft();const o=Hs(),r=Bo(e,t,n);return o.find(i=>Bo(i.entityType,i.entityId,i.shopType)===r)??null}function e1(e,t,n,o){Ft();const r=Hs(),i=Bo(e,t,o),a=r.findIndex(l=>Bo(l.entityType,l.entityId,l.shopType)===i),s={entityType:e,entityId:t,shopType:o,soundId:n.soundId,volume:n.volume,mode:n.mode};a!==-1?r[a]=s:r.push(s),Fm(r),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(mn.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:o,config:n}}));}function t1(e,t,n){Ft();const o=Hs(),r=Bo(e,t,n),i=o.findIndex(a=>Bo(a.entityType,a.entityId,a.shopType)===r);return i===-1?false:(o.splice(i,1),Fm(o),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(mn.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function n1(e,t,n){return Um(e,t,n)!==null}function o1(e){return Ft(),Hs().filter(n=>n.entityType===e)}const de={init:Hm,getAll:UC,getById:jm,add:WC,remove:VC,update:qC,play:XC,stop:KC,getNotificationSettings:YC,getNotificationConfig:JC,setNotificationConfig:QC,setNotificationSettings:ZC,getItemCustomSound:Um,setItemCustomSound:e1,removeItemCustomSound:t1,hasItemCustomSound:n1,getItemCustomSoundsByType:o1};let na=null;async function r1(){return ce.ready?true:na||(na=(async()=>{ce.baseUrl=await Qn.base();const e=await Ut.load({baseUrl:ce.baseUrl}),t=Ut.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string")continue;const r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){const i=r[1].toLowerCase(),a=r[2];ce.urls[i].set(a,jt(ce.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(ce.sfx.mp3Url=jt(ce.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(ce.sfx.atlasUrl=jt(ce.baseUrl,o));}if(!ce.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return ce.sfx.atlas=await wd(ce.sfx.atlasUrl),AC(ce.sfx.atlas),de.init(),ce.ready=true,true})(),na)}function Wm(e){if(e!=="music"&&e!=="ambience")return  false;const t=ce.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return ce.tracks[e]=null,true}function i1(e,t,n={}){if(!ce.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const o=ce.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Wm(e);const r=new Audio(o);return r.loop=!!n.loop,r.volume=$m(e,n.volume),r.preload="auto",r.play().catch(()=>{}),ce.tracks[e]=r,r}function a1(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(ce.urls[n].keys()).sort():n==="sfx"?ce.sfx.atlas?t.groups?Array.from(ce.sfx.groups.keys()).sort():Object.keys(ce.sfx.atlas).sort():[]:[]}function s1(){return ["sfx","music","ambience"]}function l1(){return Array.from(ce.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function c1(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return  false;const r=ce.urls[n],i=o.toLowerCase();for(const a of Array.from(r.keys()))if(a.toLowerCase()===i)return  true;return  false}function d1(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const o of Array.from(ce.sfx.groups.keys()))if(o.toLowerCase()===n)return  true;return  false}function u1(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const r=ce.urls[n],i=o.toLowerCase();for(const[a,s]of Array.from(r.entries()))if(a.toLowerCase()===i)return s;return null}function p1(){return ce.tracks.music&&(ce.tracks.music.volume=ei("music").atom),ce.tracks.ambience&&(ce.tracks.ambience.volume=ei("ambience").atom),true}let nt=null;async function f1(e,t={}){Vm();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const o={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,nt?.audio===n&&(nt=null));},setVolume:r=>{n.volume=Math.max(0,Math.min(1,r));},isPlaying:()=>!n.paused&&!n.ended};nt=o;try{await new Promise((r,i)=>{const a=setTimeout(()=>{i(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(a),n.removeEventListener("canplay",l),n.removeEventListener("error",c);},l=()=>{s(),r();},c=()=>{s(),i(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(a),r()):(n.addEventListener("canplay",l,{once:!0}),n.addEventListener("error",c,{once:!0}));}),await n.play();}catch(r){throw nt=null,r}return n.addEventListener("ended",()=>{nt?.audio===n&&(nt=null);}),o}function Vm(){return nt?(nt.stop(),nt=null,true):false}function g1(e){return nt?(nt.setVolume(e),true):false}function m1(){return nt?.isPlaying()??false}function h1(){return nt}function Ze(){if(!Nm())throw new Error("MGAudio not ready yet")}async function b1(e,t,n={}){const o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return PC(r,n);if(o==="music"||o==="ambience")return i1(o,r,n);throw new Error(`Unknown category: ${o}`)}const Le={init:r1,isReady:Nm,play:b1,stop:e=>(Ze(),Wm(e)),list:(e,t)=>(Ze(),a1(e,t)),refreshVolumes:()=>(Ze(),p1()),categoryVolume:e=>(Ze(),ei(e)),getCategories:()=>(Ze(),s1()),getGroups:()=>(Ze(),l1()),hasTrack:(e,t)=>(Ze(),c1(e,t)),hasGroup:e=>(Ze(),d1(e)),getTrackUrl:(e,t)=>(Ze(),u1(e,t)),playCustom:async(e,t)=>(Ze(),f1(e,t)),stopCustom:()=>(Ze(),Vm()),setCustomVolume:e=>(Ze(),g1(e)),isCustomPlaying:()=>(Ze(),m1()),getCustomHandle:()=>(Ze(),h1()),CustomSounds:de},qm=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:Le},Symbol.toStringTag,{value:"Module"}));function x1(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const Ce=x1();function Xm(){return Ce.ready}let oa=null;async function y1(){return Ce.ready?true:oa||(oa=(async()=>{Ce.baseUrl=await Qn.base();const e=await Ut.load({baseUrl:Ce.baseUrl}),t=Ut.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Ce.byCat.clear(),Ce.byBase.clear();for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;const i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),l=i.slice(a+1),c=jt(Ce.baseUrl,o);Ce.byBase.set(i,c),Ce.byCat.has(s)||Ce.byCat.set(s,new Map),Ce.byCat.get(s).set(l,c);}return Ce.ready=true,true})(),oa)}function kc(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function v1(e,t){if(t===void 0){const i=kc(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),o=kc(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){const i=o.indexOf("_");return {cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return {cat:n,asset:o.replace(/^.+?_/,""),base:r}}function w1(){return Array.from(Ce.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function S1(e){const t=Ce.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function _c(e,t){const{cat:n,asset:o,base:r}=v1(e,t),i=Ce.byBase.get(r);if(i)return i;const s=Ce.byCat.get(n)?.get(o);if(s)return s;if(!Ce.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return jt(Ce.baseUrl,`cosmetic/${r}.png`)}const mp=W?.document??document;function C1(){if(Ce.overlay)return Ce.overlay;const e=mp.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),mp.documentElement.appendChild(e),Ce.overlay=e,e}function k1(){const e=Ce.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function _1(e){return Ce.defaultParent=e,true}const T1=W?.document??document;function Tc(e,t,n){if(!Ce.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=r!==void 0?_c(e,r):_c(e),a=T1.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):kc(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(const[s,l]of Object.entries(o.style))try{a.style[s]=String(l);}catch{}return a}function A1(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=o.parent||k1()||C1(),a=r!==void 0?Tc(e,r,o):Tc(e,o);if(i===Ce.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);const l=o.scale??1,c=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`;else {const d=o.x??innerWidth/2,u=o.y??innerHeight/2;a.style.left=`${d}px`,a.style.top=`${u}px`,a.style.transform=`scale(${l}) rotate(${c}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`);}}return i.appendChild(a),Ce.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}Ce.live.delete(a);},a}function E1(){for(const e of Array.from(Ce.live))e.__mgDestroy?.();}const Km=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],Ac="Expression_Stressed.png";function I1(){try{return Array.from(W.document.querySelectorAll("script")).find(o=>o.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function P1(){return W.location.pathname.split("/").pop()||"UNKNOWN"}async function M1(){try{const e=I1(),t=P1(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,o=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function wl(){return  false}const sn={ownedFilenames:new Set,loaded:false,error:null},L1=[];function Sl(){L1.forEach(e=>e());}async function jd(){try{await Rs();const{Store:e}=await ot(async()=>{const{Store:o}=await Promise.resolve().then(()=>Si);return {Store:o}},void 0);if(!await e.select("isUserAuthenticatedAtom")){sn.loaded=!0,Sl();return}const n=await M1();sn.ownedFilenames=new Set(n.map(o=>o.cosmeticFilename)),sn.loaded=!0,sn.error=null,Sl();}catch(e){sn.error=e,sn.loaded=true,Sl();}}function N1(e){return sn.ownedFilenames.has(e)}function R1(){return sn.loaded}const Ec=[];let hp=false,bp=false;function O1(){bp||(bp=true,Jm().then(()=>{}).catch(()=>{}));}O1();let xp=false;async function $1(){xp||(await jd(),xp=true);}function ti(){try{const t=Array.from(W.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${W.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}async function Ym(){try{await Rs();const{Store:e}=await ot(async()=>{const{Store:r}=await Promise.resolve().then(()=>Si);return {Store:r}},void 0);let t=await e.select("playerAtom");for(let r=0;r<5&&(!t||Object.keys(t).length===0);r++)await new Promise(i=>setTimeout(i,200*r)),t=await e.select("playerAtom");if(!t||typeof t=="object"&&Object.keys(t).length===0)throw new Error("playerAtom not available");const n=t.cosmetic,o=t.name;return {avatar:n?.avatar||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:n?.color||"Red",name:o||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:"Red",name:"Player"}}}function F1(e,t){if(!t)return e;let n=e;if(t.type){const o=Array.isArray(t.type)?t.type:[t.type];n=n.filter(r=>o.includes(r.type));}if(t.availability){const o=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(r=>o.includes(r.availability));}if(t.search){const o=t.search.toLowerCase();n=n.filter(r=>r.displayName.toLowerCase().includes(o));}return n}function D1(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:N1(n.filename))}async function Jm(){if(!hp)try{const e=ti(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const i=((await n.json())?.bundles||[]).find(s=>s.name==="cosmetic"||s.name==="cosmetics");if(!i)return;const a=new Set(Km.map(s=>s.filename));for(const s of i.assets||[])for(const l of s.src||[]){if(typeof l!="string")continue;const c=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(l);if(!c)continue;const d=c[1],u=c[2],p=`${u}.png`;if(a.has(p))continue;const f=u.split("_");if(f.length<2)continue;const g=f[0],m=f.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");Ec.push({id:p,filename:p,type:g,displayName:m,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${d}/`)}${p}`}),a.add(p);}hp=!0,console.log(`[Avatar] Discovered ${Ec.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function ki(e){const t=ti(),n=Ec.map(c=>({...c,url:c.url||`${t}${c.filename}`})),o=Km.map(c=>({...c,url:`${t}${c.filename}`})),r=new Set,i=[];for(const c of n)r.has(c.filename)||(i.push(c),r.add(c.filename));for(const c of o)r.has(c.filename)||(i.push(c),r.add(c.filename));const s=[...[],...i];let l=F1(s,e);return l=D1(l,e),l}async function Qm(e){return await $1(),ki(e)}async function B1(){await Jm();}function G1(e){return ki(e).map(t=>t.url)}async function ni(){const{avatar:e,color:t}=await Ym();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function z1(){const e=await Ym(),t=await ni(),n=ki(),o={};return n.forEach(r=>{o[r.type]=(o[r.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:o,allItems:n,assetBaseUrl:ti()}}const H1=100,Cl=[];function Ic(e,t,n){let o="";if(n&&typeof n=="object"){if(t==="PartialState"){const r=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(r||i)o=`PartialState : ${r} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(l=>l!=="type");s.length>0&&(o=`PartialState - {${s.join(", ")}}`);}}if(!o&&n.event&&(o+=`${n.event} `),!o&&n.op&&(o+=`op:${n.op} `),!o&&n.data){const r=Object.keys(n.data);r.length>0&&(o+=`{${r.slice(0,3).join(",")}${r.length>3?"...":""}}`);}else !o&&Array.isArray(n)&&(o+=`[${n.length} items]`);}else typeof n=="string"&&(o=n.slice(0,50));Cl.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:o.trim()||"-"}),Cl.length>H1&&Cl.shift();}const et={nativeCtor:null,captured:[],latestOpen:null},yp=Symbol.for("ariesmod.ws.capture.wrapped"),vp=Symbol.for("ariesmod.ws.capture.native"),Zm=1;function Pc(e){return !!e&&e.readyState===Zm}function j1(){if(Pc(et.latestOpen))return et.latestOpen;for(let e=et.captured.length-1;e>=0;e--){const t=et.captured[e];if(Pc(t))return t}return null}function U1(e,t){et.captured.push(e),et.captured.length>25&&et.captured.splice(0,et.captured.length-25);const n=()=>{et.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{et.latestOpen===e&&(et.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",o=>{try{const r=JSON.parse(o.data);Ic("in",r.type||"unknown",r);}catch{Ic("in","raw",o.data);}}),e.readyState===Zm&&n();}function W1(e=W,t={}){const n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return ()=>{};if(o[yp])return et.nativeCtor=o[vp]??et.nativeCtor??null,()=>{};const r=o;et.nativeCtor=r;function i(a,s){const l=s!==void 0?new r(a,s):new r(a);try{U1(l,n);}catch{}return l}try{i.prototype=r.prototype;}catch{}try{Object.setPrototypeOf(i,r);}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED;}catch{}i[yp]=true,i[vp]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=r);}catch{}}}function V1(e=W){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function us(e=W){const t=j1();if(t)return {ws:t,source:"captured"};const n=V1(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function eh(e,t={}){const n=t.pageWindow??W,o=t.intervalMs??500,r=!!t.debug;let i=null,a=null;const s=()=>{const c=us(n);(c.ws!==i||c.source!==a)&&(i=c.ws,a=c.source,r&&console.log("[WS] best socket changed:",c.source,c.ws),e(c));};s();const l=setInterval(s,o);return ()=>clearInterval(l)}function q1(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function X1(e,t=W){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:o}=us(t);if(!o)return {ok:false,reason:"no-ws"};if(!Pc(o))return {ok:false,reason:"not-open"};const r=q1(e);if(r==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(r);Ic("out",i.type||"unknown",i);}catch{}try{return o.send(r),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function K1(e,t={},n=W){return X1({type:e,...t},n)}const Kt={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},q={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Ct=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Ct||{});new Set(Object.values(Kt));new Set(Object.values(q));const Y1=["Room","Quinoa"],J1={Room:["Room"],Quinoa:Y1};function ue(e,t={},n=W){const o=t,{scopePath:r,scope:i,...a}=o,s=typeof r=="string"?r:i,l=Array.isArray(r)?r:s==="Room"||s==="Quinoa"?J1[s]:null;return K1(e,l?{scopePath:l,...a}:a,n)}function Q1(e,t=W){return ue(q.Chat,{scope:"Room",message:e},t)}function Z1(e,t=W){return ue(q.Emote,{scope:"Room",emoteType:e},t)}function ek(e,t=W){return ue(q.Wish,{scope:"Quinoa",wish:e},t)}function tk(e,t=W){return ue(q.KickPlayer,{scope:"Room",playerId:e},t)}function js(e,t=W){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:o}=e;return ue(q.SetPlayerData,{scope:"Room",name:n,cosmetic:o},t)}function nk(e=W){return ue(q.UsurpHost,{scope:"Quinoa"},e)}function ok(e=W){return ue(q.ReportSpeakingStart,{scope:"Quinoa"},e)}function rk(e,t=W){return ue(q.SetSelectedGame,{scope:"Room",gameId:e},t)}function ik(e,t=W){return ue(q.VoteForGame,{scope:"Room",gameId:e},t)}function ak(e,t=W){return ue(q.RequestGame,{scope:"Room",gameId:e},t)}function sk(e=W){return ue(q.RestartGame,{scope:"Room"},e)}function lk(e,t=W){return ue(q.Ping,{scope:"Quinoa",id:e},t)}function th(e,t,n=W){return ue(q.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const ck=th;function dk(e,t,n=W){return ue(q.Teleport,{scope:"Quinoa",x:e,y:t},n)}function uk(e=W){return ue(q.CheckWeatherStatus,{scope:"Quinoa"},e)}function pk(e,t,n=W){return ue(q.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function fk(e,t=W){return ue(q.DropObject,{scope:"Quinoa",slotIndex:e},t)}function gk(e,t=W){return ue(q.PickupObject,{scope:"Quinoa",objectId:e},t)}function Us(e,t=W){return ue(q.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Ud(e,t="PetHutch",n=W){return ue(q.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Wd(e,t="PetHutch",n=W){return ue(q.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function mk(e,t,n=W){return ue(q.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function hk(e=W){return ue(q.LogItems,{scope:"Quinoa"},e)}function bk(e,t,n,o=W){return ue(q.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},o)}function xk(e,t=W){return ue(q.WaterPlant,{scope:"Quinoa",plantId:e},t)}function yk(e,t=W){return ue(q.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function vk(e=W){return ue(q.SellAllCrops,{scope:"Quinoa"},e)}function Vd(e,t=W){return ue(q.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function qd(e,t=W){return ue(q.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function Xd(e,t=W){return ue(q.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Kd(e,t=W){return ue(q.PurchaseSeed,{scope:"Quinoa",species:e},t)}function wk(e,t,n,o=W){return ue(q.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},o)}function Sk(e,t=W){return ue(q.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Ck(e,t,n,o=W){return ue(q.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},o)}function kk(e,t,n=W){return ue(q.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function _k(e,t,n=W){return ue(q.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function Tk(e,t=W){return ue(q.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Ak(e,t,n,o=W){return ue(q.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},o)}function Ek(e,t=W){return ue(q.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function nh(e,t={x:0,y:0},n="Dirt",o=0,r=W){return ue(q.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:o},r)}function Ik(e,t,n=W){return ue(q.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function Pk(e,t=W){return ue(q.PetPositions,{scope:"Quinoa",positions:e},t)}function oh(e,t,n=W){return ue(q.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function rh(e,t=W){return ue(q.StorePet,{scope:"Quinoa",itemId:e},t)}function Mk(e,t,n=W){return ue(q.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function Lk(e,t=W){return ue(q.SellPet,{scope:"Quinoa",petId:e},t)}async function ih(e){try{const t=await ni(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],o=e.color!==void 0?e.color:t.color,r=js({cosmetic:{color:o,avatar:n}},W);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:r}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function Nk(){return ih({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const yr=new Map;function Rk(e){if(yr.has(e))return yr.get(e);const t=new Promise((n,o)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>n(r),r.onerror=()=>{yr.delete(e),o(new Error(`Failed to load image: ${e}`));},r.src=e;});return yr.set(e,t),t}function Ok(){yr.clear();}function $k(e){return ki().find(o=>o.filename===e)?.url||""}async function Fk(e,t={}){const n=document.createElement("canvas"),o=t.width||400,r=t.height||400,i=t.scale||1;n.width=o*i,n.height=r*i;const a=n.getContext("2d");if(!a)throw new Error("Failed to get canvas 2D context");if(a.imageSmoothingEnabled=i!==1,e.color){const d={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};a.fillStyle=d[e.color]||"#FF0000",a.fillRect(0,0,n.width,n.height);}const l=[e.bottom,e.mid,e.top,e.expression].filter(d=>!!d).map(d=>$k(d));return (await Promise.all(l.map(d=>Rk(d)))).forEach(d=>{a.drawImage(d,0,0,n.width,n.height);}),n}const ra={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};let Yd=null,So=null,Rn=null,ln=null;function Dk(){try{const t=Array.from(W.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return `${W.location.origin}/assets/cosmetic/`}catch{return "https://magicgarden.gg/assets/cosmetic/"}}function kl(e){return Dk()+e}function Bk(e,t){const o=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(o[ra.BOTTOM]=e.bottom),e.mid&&(o[ra.MID]=e.mid),e.top&&(o[ra.TOP]=e.top),e.expression&&(o[ra.EXPRESSION]=e.expression),o}async function Gk(e){try{const{Store:t}=await ot(async()=>{const{Store:a}=await Promise.resolve().then(()=>Si);return {Store:a}},void 0),n=await t.select("myDataAtom"),o=n?.cosmetic?.avatar||[],r=Bk(e,o),i=e.color||n?.cosmetic?.color||"Red";return Yd={avatar:r,color:i},Hk(),jk(r),console.log("[Avatar] Rendered avatar override:",r),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function zk(){Yd=null,So&&(clearInterval(So),So=null),Rn&&(Rn.disconnect(),Rn=null);const e=W.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),ln&&(ln.remove(),ln=null),console.log("[Avatar] Cleared override"),true}function Hk(){if(ln)return;const e=W.document;ln=e.createElement("style"),ln.id="gemini-avatar-override-styles",ln.textContent=`
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
    `,e.head.appendChild(ln);}function jk(e){So&&clearInterval(So),Rn&&Rn.disconnect();const t=W.document,n=()=>{const r=t.querySelectorAll(".Avatar");let i=0;r.forEach(a=>{const s=Array.from(a.querySelectorAll("img"));if(s.length===4){let c=false;s.forEach((d,u)=>{const p=kl(e[u]);d.src!==p&&(c=true);}),c&&(s.forEach((d,u)=>{d.src=kl(e[u]),d.setAttribute("data-gemini-override",e[u]);}),i++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const c=t.createElement("div");c.className="gemini-avatar-overlay",e.forEach(d=>{const u=t.createElement("img");u.src=kl(d),u.setAttribute("data-gemini-cosmetic",d),c.appendChild(u);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(c),i++;}}),i>0&&console.log(`[Avatar] Re-applied ${i} override(s) (React reverted)`);};n(),So=setInterval(n,500),Rn=new MutationObserver(()=>{setTimeout(n,10);});const o=t.querySelector(".game-root")||t.querySelector("#root")||t.body;Rn.observe(o,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function Uk(){return Yd}const ia={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};function Wk(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===Ac.toLowerCase()}function Vk(e){return e.some(Wk)}let ps=null,ho=null;W.Gemini_AvatarOverride=null;function qk(e,t){const o=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(o[ia.BOTTOM]=e.bottom),e.mid&&(o[ia.MID]=e.mid),e.top&&(o[ia.TOP]=e.top),e.expression&&(o[ia.EXPRESSION]=e.expression),o}async function Jd(e){try{const{Store:t}=await ot(async()=>{const{Store:m}=await Promise.resolve().then(()=>Si);return {Store:m}},void 0),{getPlayers:n}=await ot(async()=>{const{getPlayers:m}=await Promise.resolve().then(()=>gh);return {getPlayers:m}},void 0);wl();const i=n().get().myPlayer;if(!i)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=i.id,s=i.cosmetic.avatar;W.MagicCircle_PlayerId=a,ho||(ho=[...s]);let l=qk(e,s);const c=Vk(l);wl(),ps=l,W.Gemini_AvatarOverride=l,console.log("[WorldAvatar] Applying override:",l);const d=await t.select("stateAtom");if(!d?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const u=d.data.players.findIndex(m=>m.id===a);if(u===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const p=d.data.players[u],f=[...d.data.players];f[u]={...p,cosmetic:{...p.cosmetic,avatar:l}};const g={...d,data:{...d.data,players:f}};return await t.set("stateAtom",g),wl()&&c||js({name:i.name,cosmetic:{...i.cosmetic,avatar:l}},W),!0}catch{return  false}}async function ah(){if(!ps||!ho)return  true;try{const{Store:e}=await ot(async()=>{const{Store:u}=await Promise.resolve().then(()=>Si);return {Store:u}},void 0),{getPlayers:t}=await ot(async()=>{const{getPlayers:u}=await Promise.resolve().then(()=>gh);return {getPlayers:u}},void 0);W.Gemini_AvatarOverride=null;const r=t().get().myPlayer;if(!r)return !1;const i=r.id,a=await e.select("stateAtom");if(!a?.data?.players)return !1;const s=a.data.players.findIndex(u=>u.id===i);if(s===-1)return !1;const l=a.data.players[s],c=[...a.data.players];c[s]={...l,cosmetic:{...l.cosmetic,avatar:ho}};const d={...a,data:{...a.data,players:c}};return await e.set("stateAtom",d),js({name:r.name,cosmetic:{...r.cosmetic,avatar:ho}},W),ps=null,ho=null,!0}catch{return  false}}function Xk(){return ps}let Ye=[];const Pa=[],wp=()=>{Pa.forEach(e=>e([...Ye]));},rn={init(){Ye=ve(ut.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...Ye]},async save(e,t,n){const o=n||Math.random().toString(36).substring(2,9),r={...t,id:o,name:e,createdAt:n&&Ye.find(i=>i.id===n)?.createdAt||Date.now()};if(n){const i=Ye.findIndex(a=>a.id===n);i!==-1?Ye[i]=r:Ye.push(r);}else Ye.push(r);return we(ut.SECTION.AVATAR_LOADOUTS,Ye),wp(),o},delete(e){Ye=Ye.filter(t=>t.id!==e),we(ut.SECTION.AVATAR_LOADOUTS,Ye),wp();},rename(e,t){const n=Ye.find(o=>o.id===e);n&&(n.name=t,we(ut.SECTION.AVATAR_LOADOUTS,Ye));},async wear(e){const t=Ye.find(o=>o.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await Jd(n)},subscribe(e){return Pa.push(e),()=>{const t=Pa.indexOf(e);t!==-1&&Pa.splice(t,1);}}},Kk={init:jd,isReady:()=>R1(),list:ki,listAsync:Qm,listUrls:G1,get:ni,debug:z1,set:ih,blank:Nk,Loadouts:rn,toCanvas:Fk,clearImageCache:Ok,render:Gk,clearOverride:zk,getOverride:Uk,renderWorld:Jd,clearWorldOverride:ah,getWorldOverride:Xk};function In(){if(!Xm())throw new Error("MGCosmetic not ready yet")}const Qd={init:y1,isReady:Xm,categories:()=>(In(),w1()),list:e=>(In(),S1(e)),url:((e,t)=>(In(),_c(e,t))),create:((e,t,n)=>(In(),Tc(e,t,n))),show:((e,t,n)=>(In(),A1(e,t,n))),attach:e=>(In(),_1(e)),clear:()=>(In(),E1()),Avatar:Kk},Sp={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function sh(e){const t=J.get("mutations");if(!t)return Sp[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?Sp[e]??null:n.coinMultiplier}const _l=new Map;function Tl(e){if(_l.has(e))return _l.get(e);const t=sh(e)??1;return _l.set(e,t),t}const Yk=new Set(["Gold","Rainbow"]),Jk=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function Zd(e){let t=1,n=0,o=0;for(const r of e)if(r==="Gold"||r==="Rainbow")r==="Rainbow"?t=Tl("Rainbow"):t===1&&(t=Tl("Gold"));else {const i=Tl(r);i>1&&(n+=i,o++);}return t*(1+n-o)}function Qk(e){return sh(e)}function Zk(e){return Yk.has(e)}function e_(e){return Jk.has(e)}function t_(e){return e_(e)}function eu(e,t){const n=Ws(e);if(!n)return 50;const o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;const r=(t-1)/(o-1);return Math.floor(50+50*r)}function wt(e,t,n){const o=Ws(e);if(!o)return 0;const r=o.baseSellPrice,i=Zd(n);return Math.round(r*t*i)}function n_(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const o=t-e,r=n-e;return Math.floor(r/o*100)}function o_(e,t){return t>=e}function Ws(e){const t=J.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const lh=3600,Al=80,r_=100,vr=30;function Vs(e){return e/lh}function _i(e,t){const n=Ai(e);if(!n)return Al;const o=n.maxScale;if(t<=1)return Al;if(t>=o)return r_;const r=(t-1)/(o-1);return Math.floor(Al+20*r)}function Ti(e,t,n){const o=Ai(e);if(!o)return n-vr;const r=o.hoursToMature,i=t/lh,a=vr/r,s=Math.min(a*i,vr),l=n-vr;return Math.floor(l+s)}function qs(e,t){const n=Ai(e);return n?t>=n.hoursToMature:false}function ch(e){const t=Ai(e);return t?vr/t.hoursToMature:0}function i_(e,t,n){const o=t-e;return o<=0||n<=0?0:o/n}function Ai(e){const t=J.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function dh(e,t){return t<=0?1:Math.min(1,e/t)}const Fe=3600,aa=80,Cp=100,Nt=30,a_={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Ei(e){const t=J.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function s_(e){return e/Fe}function Ii(e,t){const n=Ei(e);if(!n)return aa;const{maxScale:o}=n;if(t<=1)return aa;if(t>=o)return Cp;const r=(t-1)/(o-1);return Math.floor(aa+(Cp-aa)*r)}function l_(e){return e-Nt}function c_(e){const t=Ei(e);return !t||t.hoursToMature<=0?0:Nt/t.hoursToMature}function Pi(e,t,n){const o=Ei(e);if(!o)return n-Nt;const r=t/Fe,i=Nt/o.hoursToMature,a=Math.min(i*r,Nt),s=n-Nt;return Math.floor(s+a)}function uh(e,t,n){const o=Ei(e);if(!o)return 0;const r=n-Nt,i=t-r;if(i<=0)return 0;const a=Nt/o.hoursToMature;return a<=0?0:i/a*Fe}function tu(e,t,n,o,r=Fe){const a=uh(e,n,o)-t;return a<=0?0:r<=0?1/0:a/r}function Xs(e,t,n,o=Fe){return tu(e,t,n,n,o)}function nu(e,t,n,o,r=Fe){if(n>=o)return 0;const i=n+1;return tu(e,t,i,o,r)}function d_(e,t){return e>=t}function u_(e,t){const n=t-Nt,r=(e-n)/Nt*100;return Math.min(100,Math.max(0,r))}const p_=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:s_,calculateCurrentStrength:Pi,calculateHoursToMaxStrength:Xs,calculateHoursToNextStrength:nu,calculateHoursToStrength:tu,calculateMaxStrength:Ii,calculateStartingStrength:l_,calculateStrengthPerHour:c_,calculateStrengthProgress:u_,calculateXpForStrength:uh,getSpeciesData:Ei,isPetMature:d_},Symbol.toStringTag,{value:"Module"}));function ou(e){const t=J.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const o=a_[e];return o?n.coinsToFullyReplenishHunger/o*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function f_(e,t){return e<=0?0:t<=0?1/0:e/t}function ru(e,t,n,o){if(e<=0||n<=0)return 0;const r=t/n;if(r>=e)return 0;const i=e-r,a=o/n;return Math.ceil(i/a)}function iu(e,t,n){const o=J.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const i=r.coinsToFullyReplenishHunger,a=ou(e);return ru(n,t,a,i)}function oi(e,t,n){const o=J.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const i=r.coinsToFullyReplenishHunger,a=ou(e);return ru(n,t,a,i)}function au(e,t,n,o,r,i){return e?t&&i>0?oi(n,o,i):0:oi(n,o,r)}const g_=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:au,calculateFeedsForDuration:ru,calculateFeedsToMaxStrength:oi,calculateFeedsToNextStrength:iu,calculateHoursUntilStarving:f_,getHungerDrainPerHour:ou},Symbol.toStringTag,{value:"Module"})),ph={init(){},isReady(){return  true},crop:{calculateSize:eu,calculateSellPrice:wt,calculateProgress:n_,isReady:o_,getData:Ws},pet:{calculateAge:Vs,calculateMaxStrength:_i,calculateCurrentStrength:Ti,isMature:qs,calculateStrengthPerHour:ch,getData:Ai},mutation:{calculateMultiplier:Zd,getValue:Qk,isGrowth:Zk,isEnvironmental:t_},xp:p_,feed:g_};function St(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!St(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return  false;for(const a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!St(n[a],o[a]))return  false;return  true}const kp={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},_p={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function m_(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function h_(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function b_(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function x_(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function y_(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,o=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function Tp(e){return {position:m_(e),tile:h_(e),garden:b_(e),object:x_(e),plant:y_(e)}}function Ap(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function v_(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!St(e.data,t.data)}function w_(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!St(e.sortedSlotIndices,t.sortedSlotIndices)?true:!St(e.slots,t.slots)}function S_(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function C_(){let e=_p,t=_p,n=false;const o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(kp),s=new Set;function l(){if(s.size<a.length)return;const d=Tp(i);if(!St(e,d)&&(t=e,e=d,!!n)){for(const u of r.all)u(e,t);if(Ap(t)!==Ap(e))for(const u of r.stable)u(e,t);if(v_(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of r.object)p(u);}if(w_(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of r.plantInfo)p(u);}if(S_(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of r.garden)p(u);}}}async function c(){if(n)return;const d=a.map(async u=>{const p=kp[u],f=await xe.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=Tp(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeObject(d,u){return r.object.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.object,previous:e.object}),()=>r.object.delete(d)},subscribePlantInfo(d,u){return r.plantInfo.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(d)},subscribeGarden(d,u){return r.garden.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.garden,previous:e.garden}),()=>r.garden.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=false;}}}let El=null;function Xe(){return El||(El=C_()),El}function k_(){let e=null;const t=[],n=new Set,o={},r=new Set,i=2;function a(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function l(u,p){const{cols:f,rows:g}=u,m=f*g,y=new Set,x=new Set,S=new Map,w=[],T=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],k=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],b=Math.max(T.length,k.length);for(let C=0;C<b;C++){const I=T[C]??[],R=k[C]??[],F=I.map((z,X)=>(y.add(z),S.set(z,C),{globalIndex:z,localIndex:X,position:a(f,z)})),G=R.map((z,X)=>(x.add(z),S.set(z,C),{globalIndex:z,localIndex:X,position:a(f,z)}));w.push({userSlotIdx:C,dirtTiles:F,boardwalkTiles:G,allTiles:[...F,...G]});}const v=u.spawnTiles.map(C=>a(f,C)),_={};if(u.locations)for(const[C,I]of Object.entries(u.locations)){const R=I.spawnTileIdx??[];_[C]={name:C,spawnTiles:R,spawnPositions:R.map(F=>a(f,F))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:v,locations:_,userSlots:w,globalToXY(C){return a(f,C)},xyToGlobal(C,I){return s(f,C,I)},getTileOwner(C){return S.get(C)??null},isDirtTile(C){return y.has(C)},isBoardwalkTile(C){return x.has(C)}}}function c(){if(r.size<i||e)return;const u=o.map,p=o.tileSize??0;if(u){e=l(u,p);for(const f of n)f(e);n.clear();}}async function d(){const u=await xe.subscribe("mapAtom",f=>{o.map=f,r.add("map"),c();});t.push(u);const p=await xe.subscribe("tileSizeAtom",f=>{o.tileSize=f,r.add("tileSize"),c();});t.push(p);}return d(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let Il=null;function Mc(){return Il||(Il=k_()),Il}function __(){const e=J.get("mutations");return e?Object.keys(e):[]}function fh(){const e={};for(const t of __())e[t]=[];return e}function Lc(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:fh()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Ep(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function T_(e,t,n,o){const r=t.slots.filter(i=>o>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function A_(e,t,n,o,r){return {tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime,fruitCount:1}}function E_(e,t,n,o){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function Ip(e,t,n,o){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function Pp(e,t){const{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return Lc();const i=t().get(),a=i?.userSlots[o],s=a?.dirtTiles??[],l=a?.boardwalkTiles??[],c=[],d=[],u=[],p={},f=[],g=[],m=[],y=[],x=fh(),S=[],w=[],T=[],k={},b=[],v=[],_={},C=new Set,I=new Set;for(const[z,X]of Object.entries(n.tileObjects)){const L=parseInt(z,10);C.add(L);const O=i?i.globalToXY(L):{x:0,y:0};if(X.objectType==="plant"){const D=X,B=T_(z,D,O,r);c.push(B),B.isMature?d.push(B):u.push(B),p[B.species]||(p[B.species]=[]),p[B.species].push(B);for(let U=0;U<D.slots.length;U++){const E=D.slots[U],P=A_(z,O,U,E,r);if(f.push(P),P.isMature?g.push(P):m.push(P),P.mutations.length>0){y.push(P);for(const A of P.mutations)x[A]||(x[A]=[]),x[A].push(P);}}}else if(X.objectType==="egg"){const B=E_(z,X,O,r);S.push(B),k[B.eggId]||(k[B.eggId]=[]),k[B.eggId].push(B),B.isMature?w.push(B):T.push(B);}else if(X.objectType==="decor"){const B=Ip(z,X,O,"tileObjects");b.push(B),_[B.decorId]||(_[B.decorId]=[]),_[B.decorId].push(B);}}for(const[z,X]of Object.entries(n.boardwalkTileObjects)){const L=parseInt(z,10);I.add(L);const O=i?i.globalToXY(L):{x:0,y:0},B=Ip(z,X,O,"boardwalk");v.push(B),_[B.decorId]||(_[B.decorId]=[]),_[B.decorId].push(B);}const R=[...b,...v],F=s.filter(z=>!C.has(z.localIndex)),G=l.filter(z=>!I.has(z.localIndex));return {garden:n,mySlotIndex:o,plants:{all:c,mature:d,growing:u,bySpecies:p,count:c.length},crops:{all:f,mature:g,growing:m,mutated:{all:y,byMutation:x}},eggs:{all:S,mature:w,growing:T,byType:k,count:S.length},decors:{tileObjects:b,boardwalk:v,all:R,byType:_,count:R.length},tiles:{tileObjects:s,boardwalk:l,empty:{tileObjects:F,boardwalk:G}},counts:{plants:c.length,maturePlants:d.length,crops:f.length,matureCrops:g.length,eggs:S.length,matureEggs:w.length,decors:R.length,emptyTileObjects:F.length,emptyBoardwalk:G.length}}}function I_(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function P_(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function M_(e,t,n){const o=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),r=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !o.has(a)&&r.has(a)})}function L_(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function N_(e,t){const n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(const r of t){const i=o.get(r.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,r.slots.length);for(let s=0;s<a;s++){const l=new Set(i.slots[s].mutations),c=new Set(r.slots[s].mutations),d=[...c].filter(p=>!l.has(p)),u=[...l].filter(p=>!c.has(p));if(d.length>0||u.length>0){const p=Date.now(),f=r.slots[s],g={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime,fruitCount:1};n.push({crop:g,added:d,removed:u});}}}return n}function R_(e,t,n){const o=[],r=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=r.get(a.tileIndex);if(!s)continue;const l=Math.min(a.slots.length,s.slots.length);for(let c=0;c<l;c++){const d=a.slots[c],u=s.slots[c];if(d.startTime!==u.startTime){const p=i.get(`${a.tileIndex}:${c}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:c,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true,fruitCount:1};o.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let c=s.slotsCount;c<a.slotsCount;c++){const d=i.get(`${a.tileIndex}:${c}`);if(!d||!d.isMature)continue;const u=a.slots[c];if(!u)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:c,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true,fruitCount:1};o.push({crop:p,remainingSlots:s.slotsCount});}}return o}function O_(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function $_(e,t){const n=l=>`${l.tileIndex}:${l.location}`,o=l=>`${l.tileIndex}:${l.location}`,r=new Set(e.map(n)),i=new Set(t.map(o)),a=t.filter(l=>!r.has(o(l))),s=e.filter(l=>!i.has(n(l)));return {added:a,removed:s}}function F_(){let e=Lc(),t=Lc(),n=false;const o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function l(){if(a.size<s)return;const d=Pp(i,Mc);if(St(e,d)||(t=e,e=d,!n))return;for(const w of r.all)w(e,t);if(Ep(t)!==Ep(e))for(const w of r.stable)w(e,t);const u=I_(t.plants.all,e.plants.all);for(const w of u.added)for(const T of r.plantAdded)T({plant:w});for(const w of u.removed)for(const T of r.plantRemoved)T({plant:w,tileIndex:w.tileIndex});const p=P_(t.plants.mature,e.plants.mature,e.plants.all);for(const w of p)for(const T of r.plantMatured)T({plant:w});const f=N_(t.plants.all,e.plants.all);for(const w of f)for(const T of r.cropMutated)T(w);const g=M_(t.crops.mature,e.crops.mature,e.crops.all);for(const w of g)for(const T of r.cropMatured)T({crop:w});const m=R_(t.plants.all,e.plants.all,t.crops.all);for(const w of m)for(const T of r.cropHarvested)T(w);const y=O_(t.eggs.all,e.eggs.all);for(const w of y.added)for(const T of r.eggPlaced)T({egg:w});for(const w of y.removed)for(const T of r.eggRemoved)T({egg:w});const x=L_(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const w of x)for(const T of r.eggMatured)T({egg:w});const S=$_(t.decors.all,e.decors.all);for(const w of S.added)for(const T of r.decorPlaced)T({decor:w});for(const w of S.removed)for(const T of r.decorRemoved)T({decor:w});}async function c(){if(n)return;const d=await hS.onChangeNow(p=>{i.garden=p,a.add("garden"),l();});o.push(d);const u=await xe.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),l();});o.push(u),n=true,a.size===s&&(e=Pp(i,Mc));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribePlantAdded(d,u){if(r.plantAdded.add(d),u?.immediate&&n&&a.size===s)for(const p of e.plants.all)d({plant:p});return ()=>r.plantAdded.delete(d)},subscribePlantRemoved(d,u){return r.plantRemoved.add(d),()=>r.plantRemoved.delete(d)},subscribePlantMatured(d,u){if(r.plantMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.plants.mature)d({plant:p});return ()=>r.plantMatured.delete(d)},subscribeCropMutated(d,u){if(r.cropMutated.add(d),u?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)d({crop:p,added:p.mutations,removed:[]});return ()=>r.cropMutated.delete(d)},subscribeCropMatured(d,u){if(r.cropMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.crops.mature)d({crop:p});return ()=>r.cropMatured.delete(d)},subscribeCropHarvested(d,u){return r.cropHarvested.add(d),()=>r.cropHarvested.delete(d)},subscribeEggPlaced(d,u){if(r.eggPlaced.add(d),u?.immediate&&n&&a.size===s)for(const p of e.eggs.all)d({egg:p});return ()=>r.eggPlaced.delete(d)},subscribeEggRemoved(d,u){return r.eggRemoved.add(d),()=>r.eggRemoved.delete(d)},subscribeEggMatured(d,u){if(r.eggMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)d({egg:p});return ()=>r.eggMatured.delete(d)},subscribeDecorPlaced(d,u){if(r.decorPlaced.add(d),u?.immediate&&n&&a.size===s)for(const p of e.decors.all)d({decor:p});return ()=>r.decorPlaced.delete(d)},subscribeDecorRemoved(d,u){return r.decorRemoved.add(d),()=>r.decorRemoved.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=false;}}}let Pl=null;function qo(){return Pl||(Pl=F_()),Pl}const Mp={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Lp(e,t){const n=Vs(e.xp),o=_i(e.petSpecies,e.targetScale),r=Ti(e.petSpecies,e.xp,o),i=qs(e.petSpecies,n),l=J.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,c=e.hunger/l*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:c,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:i}}function D_(e,t){const o=t[e.slot.id]?.lastAbilityTrigger??null,r=Vs(e.slot.xp),i=_i(e.slot.petSpecies,e.slot.targetScale),a=Ti(e.slot.petSpecies,e.slot.xp,i),s=qs(e.slot.petSpecies,r),d=J.get("pets")?.[e.slot.petSpecies]?.coinsToFullyReplenishHunger??1,u=e.slot.hunger/d*100;return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,hungerPercent:u,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:a,maxStrength:i,isMature:s}}const Np=500;let At=[],Ma=0;function B_(){try{const e=ve(ut.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Ma=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function G_(e){try{we(ut.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function z_(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function H_(e){if(!e||!Array.isArray(e))return;const t=lm(e),n=[];for(const o of t)if(o.timestamp>Ma){const r=z_(o);r&&n.push(r);}n.length!==0&&(Ma=Math.max(...n.map(o=>o.performedAt),Ma),At=[...n,...At],At.length>Np&&(At=At.slice(0,Np)),G_(At),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${At.length})`));}function Rp(e){const t=new Set,n=[];for(const f of e.active??[]){const g=D_(f,e.slotInfos??{});n.push(g),t.add(g.id);}const o=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Lp(f,"inventory");o.push(g),t.add(g.id);}const r=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Lp(f,"hutch");r.push(g),t.add(g.id);}const i=[...n,...o,...r],a=e.expandedPetSlotId??null,s=a?i.find(f=>f.id===a)??null:null,d=qo().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length},hutch:{hasHutch:d,currentItems:u,maxItems:25},expandedPetSlotId:a,expandedPet:s,abilityLogs:[...At]}}const Op={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function j_(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function $p(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function U_(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map($p),o=t.all.map($p);return j_(n,o)}function W_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location});}return n}function V_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){if(!r.lastAbilityTrigger)continue;const a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger});}return n}function q_(e,t){const n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function X_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.growthStage>i.growthStage&&n.push({pet:r,previousStage:i.growthStage,newStage:r.growthStage});}return n}function K_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength>i.currentStrength&&n.push({pet:r,previousStrength:i.currentStrength,newStrength:r.currentStrength});}return n}function Y_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength===r.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:r});}return n}function J_(){let e=Op,t=Op,n=false;const o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Mp),s=new Set;function l(){if(s.size<a.length)return;if(i.activityLogs){const x=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(x)&&H_(x);}const d=Rp(i);if(St(e,d)||(t=e,e=d,!n))return;for(const x of r.all)x(e,t);if(!U_(t,e))for(const x of r.stable)x(e,t);const u=W_(t,e);for(const x of u)for(const S of r.location)S(x);const p=V_(t,e);for(const x of p)for(const S of r.ability)S(x);const f=q_(t,e);if(f)for(const x of r.count)x(f);const g=X_(t,e);for(const x of g)for(const S of r.growth)S(x);const m=K_(t,e);for(const x of m)for(const S of r.strengthGain)S(x);const y=Y_(t,e);for(const x of y)for(const S of r.maxStrength)S(x);if(t.expandedPetSlotId!==e.expandedPetSlotId){const x={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of r.expandedPet)S(x);}}async function c(){if(n)return;At=B_(),console.log(`[myPets] Loaded ${At.length} ability logs from storage`);const d=a.map(async u=>{const p=Mp[u],f=await xe.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=Rp(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeLocation(d,u){if(r.location.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,from:p.location,to:p.location});return ()=>r.location.delete(d)},subscribeAbility(d,u){if(r.ability.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&d({pet:p,trigger:p.lastAbilityTrigger});return ()=>r.ability.delete(d)},subscribeCount(d,u){return r.count.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(d)},subscribeExpandedPet(d,u){return r.expandedPet.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(d)},subscribeGrowth(d,u){if(r.growth.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>r.growth.delete(d)},subscribeStrengthGain(d,u){if(r.strengthGain.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>r.strengthGain.delete(d)},subscribeMaxStrength(d,u){if(r.maxStrength.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&d({pet:p});return ()=>r.maxStrength.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=false;}}}let Ml=null;function to(){return Ml||(Ml=J_()),Ml}const Fp={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Dp={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Bp(e){const t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex;let i=null;return r!==null&&r>=0&&r<n.length&&(i={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Gp(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Q_(e,t){return Gp(e)===Gp(t)}function Z_(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function sa(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function eT(e,t){const n=new Set(e.map(sa)),o=new Set(t.map(sa)),r=t.filter(a=>!n.has(sa(a))),i=e.filter(a=>!o.has(sa(a)));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:{before:e.length,after:t.length}}}function tT(e,t){const n=new Set(e),o=new Set(t),r=t.filter(a=>!n.has(a)),i=e.filter(a=>!o.has(a));return r.length===0&&i.length===0?null:{added:r,removed:i,current:t}}function nT(){let e=Dp,t=Dp,n=false;const o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Fp),s=new Set;function l(){if(s.size<a.length)return;const d=Bp(i);if(St(e,d)||(t=e,e=d,!n))return;for(const f of r.all)f(e,t);if(!Q_(t,e))for(const f of r.stable)f(e,t);if(Z_(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of r.selection)g(f);}const u=eT(t.items,e.items);if(u)for(const f of r.items)f(u);const p=tT(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of r.favorites)f(p);}async function c(){if(n)return;const d=a.map(async u=>{const p=Fp[u],f=await xe.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=Bp(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeSelection(d,u){return r.selection.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(d)},subscribeItems(d,u){return r.items.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(d)},subscribeFavorites(d,u){return r.favorites.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=false;}}}let Ll=null;function kt(){return Ll||(Ll=nT()),Ll}const Nc={all:[],host:null,myPlayer:null,count:0};function oT(e,t,n){const o=n.get(e.id),r=o?.slot,i=r?.data,a=r?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function zp(e){const t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[],r=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Nc;const i=new Map;Array.isArray(o)&&o.forEach((c,d)=>{c?.type==="user"&&c?.playerId&&i.set(c.playerId,{slot:c,index:d});});const a=t.map(c=>oT(c,n,i)),s=a.find(c=>c.isHost)??null,l=r!==null?a.find(c=>c.slotIndex===r)??null:null;return {all:a,host:s,myPlayer:l,count:a.length}}function Hp(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function rT(e,t){const n=[],o=new Set(e.map(i=>i.id)),r=new Set(t.map(i=>i.id));for(const i of t)o.has(i.id)||n.push({player:i,type:"join"});for(const i of e)r.has(i.id)||n.push({player:i,type:"leave"});return n}function iT(e,t){const n=[],o=new Map(e.map(r=>[r.id,r]));for(const r of t){const i=o.get(r.id);i&&i.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected});}return n}function aT(){let e=Nc,t=Nc,n=false;const o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=4;function l(){if(a.size<s)return;const d=zp(i);if(St(e,d)||(t=e,e=d,!n))return;for(const m of r.all)m(e,t);if(Hp(t)!==Hp(e))for(const m of r.stable)m(e,t);const u=rT(t.all,e.all);for(const m of u)for(const y of r.joinLeave)y(m);const p=iT(t.all,e.all);for(const m of p)for(const y of r.connection)y(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const y of r.host)y(m);}}async function c(){if(n)return;const d=await gS.onChangeNow(g=>{i.players=g,a.add("players"),l();});o.push(d);const u=await mS.onChangeNow(g=>{i.hostPlayerId=g,a.add("hostPlayerId"),l();});o.push(u);const p=await fS.onChangeNow(g=>{i.userSlots=g,a.add("userSlots"),l();});o.push(p);const f=await xe.subscribe("myUserSlotIdxAtom",g=>{i.myUserSlotIndex=g,a.add("myUserSlotIndex"),l();});o.push(f),n=true,a.size===s&&(e=zp(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribeJoinLeave(d,u){if(r.joinLeave.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)d({player:p,type:"join"});return ()=>r.joinLeave.delete(d)},subscribeConnection(d,u){if(r.connection.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)d({player:p,isConnected:p.isConnected});return ()=>r.connection.delete(d)},subscribeHost(d,u){return r.host.add(d),u?.immediate&&n&&a.size===s&&d({current:e.host,previous:e.host}),()=>r.host.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=false;}}}let Nl=null;function su(){return Nl||(Nl=aT()),Nl}const gh=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:su},Symbol.toStringTag,{value:"Module"})),Mi=["seed","tool","egg","decor"];function sT(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function lT(e,t,n){const o=sT(e,t),r=n[o]??0,i=Math.max(0,e.initialStock-r);return {id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:i,isAvailable:i>0,price:e.price}}function cT(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const r=n[e]?.purchases??{},i=(t.inventory??[]).map(c=>lT(c,e,r)),a=i.filter(c=>c.isAvailable).length,s=t.secondsUntilRestock??0,l=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:l}}function jp(e){const t=e.shops,n=e.purchases??{},o=Mi.map(s=>cT(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},i=o.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const l=i.sort((c,d)=>(c.restockAt??0)-(d.restockAt??0))[0];a={shop:l.type,seconds:l.secondsUntilRestock,at:l.restockAt};}return {all:o,byType:r,nextRestock:a}}const Up={all:Mi.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Wp(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function dT(e,t){const n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function uT(e,t){const n=[];for(const o of Mi){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const l=a.get(s.id);l&&s.purchased>l.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-l.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function pT(e,t){const n=[];for(const o of Mi){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const l=a.get(s.id);l&&l.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:l.isAvailable,isAvailable:s.isAvailable});}}return n}function fT(){let e=Up,t=Up,n=false;const o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function l(){if(a.size<s)return;const d=jp(i);if(St(e,d)||(t=e,e=d,!n))return;for(const g of r.all)g(e,t);if(Wp(t)!==Wp(e))for(const g of r.stable)g(e,t);const u={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(const g of Mi){const m=dT(t.byType[g],e.byType[g]);if(m)for(const y of u[g])y(m);}const p=uT(t,e);for(const g of p)for(const m of r.purchase)m(g);const f=pT(t,e);for(const g of f)for(const m of r.availability)m(g);}async function c(){if(n)return;const d=await bS.onChangeNow(p=>{i.shops=p,a.add("shops"),l();});o.push(d);const u=await xS.onChangeNow(p=>{i.purchases=p,a.add("purchases"),l();});o.push(u),n=true,a.size===s&&(e=jp(i));}return c(),{get(){return e},getShop(d){return e.byType[d]},getItem(d,u){return e.byType[d].items.find(f=>f.id===u)??null},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribeSeedRestock(d,u){return r.seedRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(d)},subscribeToolRestock(d,u){return r.toolRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(d)},subscribeEggRestock(d,u){return r.eggRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(d)},subscribeDecorRestock(d,u){return r.decorRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(d)},subscribePurchase(d,u){if(r.purchase.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&d({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>r.purchase.delete(d)},subscribeAvailability(d,u){if(r.availability.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)d({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>r.availability.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=false;}}}let Rl=null;function no(){return Rl||(Rl=fT()),Rl}function mh(e){const t=e||"Sunny",r=J.get("weather")?.[t]?.name||t;return {id:t,name:r,isActive:t!=="Sunny",type:t,startTime:null,endTime:null,remainingSeconds:0}}function Vp(){return mh(null)}function gT(){let e=Vp(),t=Vp(),n=null,o=false,r=null;const i={all:new Set,stable:new Set};function a(l){const c=(l||"Sunny")!==(n||"Sunny");n=l;const d=mh(l),u=e.id!==d.id;if(t=e,e=d,!!o){if(c)for(const p of i.all)p(e,t);if(u){const p={current:e,previous:t};for(const f of i.stable)f(p);}}}async function s(){o||(r=await xe.subscribe("weatherAtom",l=>{a(l);}),o=true);}return s(),{get(){return e},subscribe(l,c){return i.all.add(l),c?.immediate!==false&&o&&l(e,e),()=>i.all.delete(l)},subscribeStable(l,c){return i.stable.add(l),c?.immediate&&o&&l({current:e,previous:e}),()=>i.stable.delete(l)},destroy(){r?.(),r=null,i.all.clear(),i.stable.clear(),o=false;}}}let Ol=null;function Li(){return Ol||(Ol=gT()),Ol}let Ve=null;function hh(){return Ve||(Ve={currentTile:Xe(),myPets:to(),gameMap:Mc(),myInventory:kt(),players:su(),shops:no(),weather:Li(),myGarden:qo()},Ve)}function Bt(){if(!Ve)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Ve}function mT(){Ve&&(Ve.currentTile.destroy(),Ve.myPets.destroy(),Ve.gameMap.destroy(),Ve.myInventory.destroy(),Ve.players.destroy(),Ve.shops.destroy(),Ve.weather.destroy(),Ve.myGarden.destroy(),Ve=null);}const fe={get currentTile(){return Bt().currentTile},get myPets(){return Bt().myPets},get gameMap(){return Bt().gameMap},get myInventory(){return Bt().myInventory},get players(){return Bt().players},get shops(){return Bt().shops},get weather(){return Bt().weather},get myGarden(){return Bt().myGarden}};function hT(e){const t=Kd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function bT(e){const o=fe.shops.getShop("seed").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Kd(e);l.ok?a++:i.push(l.reason||`Failed to purchase seed ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function xT(e){const t=qd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function yT(e){const o=fe.shops.getShop("egg").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=qd(e);l.ok?a++:i.push(l.reason||`Failed to purchase egg ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function vT(e){const t=Vd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function wT(e){const o=fe.shops.getShop("decor").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Vd(e);l.ok?a++:i.push(l.reason||`Failed to purchase decor ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function ST(e){const t=Xd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function CT(e){const o=fe.shops.getShop("tool").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Xd(e);l.ok?a++:i.push(l.reason||`Failed to purchase tool ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}let $l=false;const On={init(){$l||($l=true,console.log("[MGShopActions] Initialized"));},isReady(){return $l},seed:{buy:hT,buyAll:bT},egg:{buy:xT,buyAll:yT},decor:{buy:vT,buyAll:wT},tool:{buy:ST,buyAll:CT}};async function bh(e){const t=[{name:"Data",init:()=>J.init()},{name:"CustomModal",init:()=>vo.init()},{name:"Sprites",init:()=>Q.init()},{name:"TileObjectSystem",init:()=>qt.init()},{name:"Pixi",init:()=>Bs.init()},{name:"Audio",init:()=>Le.init()},{name:"Cosmetics",init:()=>Qd.init()},{name:"ShopActions",init:()=>On.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Ks=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:Qn,MGAudio:Le,MGCalculators:ph,MGCosmetic:Qd,MGCustomModal:vo,MGData:J,MGEnvironment:qe,MGManifest:Ut,MGPixi:Bs,MGPixiHooks:dt,MGShopActions:On,MGSprite:Q,MGTile:qt,MGVersion:vd,PET_ABILITY_ACTIONS:am,filterPetAbilityLogs:lm,formatAbilityLog:cm,initAllModules:bh,isPetAbilityAction:sm},Symbol.toStringTag,{value:"Module"}));function kT(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function _T(e){return e.toLowerCase()}function Xo(e={}){const{id:t,label:n="",type:o="neutral",tone:r="soft",border:i,withBorder:a,pill:s=true,size:l="md",onClick:c,variant:d="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=h("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),l==="sm"?g.classList.add("badge--sm"):l==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),c&&g.addEventListener("click",c);let m=false,y=a;function x(){m||(y===false?g.style.border="none":g.style.border="");}function S(C,I=r){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${C}`,`badge--${I}`),x();}function w(C){const I=(C??"").trim();I?(g.style.border=I,m=true):(m=false,x());}function T(C){y=C,x();}function k(C){g.textContent=C;}function b(C,I=r){S(C,I);}function v(C){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const I=kT(C);if(!I){g.textContent=String(C??"—");return}g.textContent=I,g.classList.add("badge--rarity",`badge--rarity-${_T(I)}`);}function _(C,I){const F=J.get("abilities")?.[C],G=F?.color,z=G?.bg||"rgba(100, 100, 100, 0.9)",X=G?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=I||F?.name||C||"Unknown Ability",g.style.background=z,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const L=()=>{g.style.background=X;},O=()=>{g.style.background=z;};g.removeEventListener("mouseenter",L),g.removeEventListener("mouseleave",O),g.addEventListener("mouseenter",L),g.addEventListener("mouseleave",O);}return d==="rarity"?v(u):d==="ability"?_(p,f):(g.textContent=n,S(o,r),typeof a=="boolean"&&T(a),i&&w(i)),{root:g,setLabel:k,setType:b,setBorder:w,setWithBorder:T,setRarity:v,setAbility:_}}const TT={expanded:false,sort:{key:null,dir:null},search:""},AT={categories:{}};async function ET(){const e=await Jn("tab-test",{version:2,defaults:AT,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...TT}}function n(i,a){const s=e.get(),l=t(i);e.update({categories:{...s.categories,[i]:{...l,expanded:a}}});}function o(i,a,s){const l=e.get(),c=t(i);e.update({categories:{...l.categories,[i]:{...c,sort:{key:a,dir:s}}}});}function r(i,a){const s=e.get(),l=t(i);e.update({categories:{...s.categories,[i]:{...l,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}const IT={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function la(e){return e?IT[e]??0:0}class PT extends Xt{constructor(){super({id:"tab-test",label:"Test"});H(this,"stateCtrl",null);}async build(n){this.stateCtrl=await ET();const o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o);}renderSprite(n){const o=h("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const r=n.spriteId;requestAnimationFrame(()=>{try{const i=Q.toCanvas(r,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",o.appendChild(i);}catch{o.textContent="-";}});}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){const r=h("span",{style:"opacity:0.5;"});return r.textContent="—",r}return Xo({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;const f=p.toLowerCase();return r.filter(g=>g.name.toLowerCase().includes(f))},l=vi({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&l.sortBy(a.sort.key,a.sort.dir);const c=Is({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),l.setData(s(f));}}),d=h("div",{style:"margin-bottom:8px;"});d.appendChild(c.root);const u=h("div");return u.appendChild(d),u.appendChild(l.root),Ee({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){const r=J.get("plants");if(!r)return null;for(const a of Object.values(r))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=o.toLowerCase();for(const a of Object.values(r)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const o=J.get("pets");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){const o=J.get("items");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){const o=J.get("decor");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){const o=J.get("eggs");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(o,r);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(o);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4);})}async buildSpriteTables(n){const o=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>la(i.rarity)-la(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!Q.isReady())try{await Q.init();}catch{return}const r=Q.getCategories();for(let i=0;i<r.length;i++){await this.yieldToMain(8);const a=r[i],l=Q.getCategoryId(a).map(c=>{const d=`sprite/${a}/${c}`;return {name:c,spriteId:d,rarity:this.getRarityForSprite(a,d,c)}});if(l.sort((c,d)=>la(c.rarity)-la(d.rarity)),l.length>0){const c=this.createDataCard(a,this.formatCategoryName(a),l,o);n.appendChild(c);}}}}function Ae(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o);}const xh=`
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
`,MT={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Ln=null;async function LT(){if(Ln)return Ln;Ln=await Jn("tab-auto-favorite",{version:1,defaults:MT});const e=ve(ke.AUTO_FAVORITE_UI,null);return e&&(await Ln.set(e),cy(ke.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Ln}function ht(){if(!Ln)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Ln}const lu=ke.AUTO_FAVORITE,yh={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function Kn(){return ve(lu,yh)}function cu(e){we(lu,e);}function vh(e){const n={...Kn(),...e};return cu(n),n}function du(e){const t=Kn();return t.mode="simple",t.simple={...t.simple,...e},cu(t),t}function NT(e){du({favoriteSpecies:e});}function RT(e){du({favoriteMutations:e});}function qp(){return Kn().enabled}let La=null;const $r=new Set;function Rc(){const e=Kn();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}$r.clear(),La=kt().subscribeItems(t=>{if(t.added.length>0){const n=Kn();for(const o of t.added)$T(o,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function wh(){La&&(La(),La=null),$r.clear(),console.log("🛑 [AutoFavorite] Stopped");}function OT(e){const t=Kn();t.enabled=e,t.simple.enabled=e,vh(t),e?Rc():wh();}function $T(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!($r.has(e.id)||e.isFavorited||e.favorited)&&Sh(e,t.simple)){$r.add(e.id);try{Us(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(o){console.error("[AutoFavorite] WebSocket error:",o),$r.delete(e.id);}}}function Sh(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(r=>t.favoriteMutations.includes(r))):false}function FT(){return Object.keys(J.get("mutations")??{})}const Ch={init(){this.isReady()||Rc();},isReady(){return qp()},DEFAULT_CONFIG:yh,STORAGE_KEY:lu,loadConfig:Kn,saveConfig:cu,updateConfig:vh,updateSimpleConfig:du,setFavoriteSpecies:NT,setFavoriteMutations:RT,isEnabled:qp,start:Rc,stop:wh,setEnabled:OT,shouldFavorite:Sh,getGameMutations:FT};let Fl=null,Xp=null;function kh(){try{return su().get().myPlayer?.journal||null}catch{return null}}function DT(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function _h(){const e=J.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Th(){return ["Normal","Gold","Rainbow","Max Weight"]}function BT(){return Object.keys(J.get("mutations")??{})}function Ah(e){const n=(J.get("pets")??{})[e];if(!n?.innateAbilityWeights||typeof n.innateAbilityWeights!="object")return [];const o=n.innateAbilityWeights,r=["RainbowGranter","GoldGranter"];return Object.keys(o).filter(i=>!r.includes(i))}function Eh(e){const t=J.get("plants")??{},n=Object.keys(t),o=_h(),r=e?.produce??{},i=[];let a=0;for(const c of n){const u=r[c]?.variantsLogged?.map(f=>f.variant)??[],p=o.filter(f=>!u.includes(f));a+=u.length,i.push({species:c,variantsLogged:u,variantsMissing:p,variantsTotal:o.length,variantsPercentage:o.length>0?u.length/o.length*100:0,isComplete:p.length===0});}const s=n.length*o.length,l=i.filter(c=>c.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function Ih(e){const t=J.get("pets")??{},n=Object.keys(t),o=Th(),r=e?.pets??{},i=[];let a=0,s=0,l=0,c=0;for(const u of n){const p=r[u],f=p?.variantsLogged?.map(w=>w.variant)??[],g=p?.abilitiesLogged?.map(w=>w.ability)??[],m=o.filter(w=>!f.includes(w)),y=Ah(u),x=g.filter(w=>y.includes(w)),S=y.filter(w=>!x.includes(w));s+=o.length,a+=f.length,c+=y.length,l+=Math.min(x.length,y.length),i.push({species:u,variantsLogged:f,variantsMissing:m,variantsTotal:o.length,variantsPercentage:o.length>0?f.length/o.length*100:0,abilitiesLogged:x,abilitiesMissing:S,abilitiesTotal:y.length,abilitiesPercentage:y.length>0?x.length/y.length*100:0,isComplete:m.length===0&&(y.length===0||S.length===0)});}const d=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:d,percentage:n.length>0?d/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:c,abilitiesLogged:l,abilitiesPercentage:c>0?l/c*100:0}}async function Ys(e=false){await J.waitForAny();const t=kh(),n=DT(t);if(!e&&Fl&&n===Xp)return Fl;const o={plants:Eh(t),pets:Ih(t),lastUpdated:Date.now()};return Fl=o,Xp=n,o}async function GT(){const e=await Ys();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let Fr=null,Oc=false;function zT(){Oc||(Oc=true,Fr||(Fr=setInterval(async()=>{const e=await Ys();uu(e);},3e4)),console.log("[Journal] Started"));}function HT(){Fr&&(clearInterval(Fr),Fr=null),Oc=false;}function uu(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function jT(){const e=await Ys();return uu(e),e}function UT(e){try{const t=Be.getMyJournal();if(!t?.pets)return [];const n=t.pets[e];return n?.abilitiesLogged?n.abilitiesLogged.map(o=>o.ability):[]}catch(t){return console.error("[AbilitiesInject] Failed to get logged abilities:",t),[]}}function WT(e,t){try{const n=Be.getMyJournal();if(!n?.pets)return;const o=n.pets[e];return o?.abilitiesLogged?o.abilitiesLogged.find(i=>i.ability===t)?.createdAt:void 0}catch(n){console.error("[AbilitiesInject] Failed to get ability log date:",n);return}}function pu(e){try{const t=J.getAll();if(!t?.pets)return [];const n=t.pets[e];if(!n)return [];if(n.innateAbilityWeights&&typeof n.innateAbilityWeights=="object"){const o=n.innateAbilityWeights,r=["RainbowGranter","GoldGranter"];return Object.entries(o).filter(([i])=>!r.includes(i)).sort(([,i],[,a])=>a-i).map(([i])=>i)}return []}catch(t){return console.error("[AbilitiesInject] Failed to get all abilities:",t),[]}}function VT(e){try{const t=J.getAll();if(!t?.abilities)return e;const n=t.abilities[e];if(!n)return e;const o=n.name;if(typeof o=="string")return o;const r=n.displayName;return typeof r=="string"?r:e}catch(t){return console.error("[AbilitiesInject] Failed to get ability name:",t),e}}function fu(e){try{const t=["RainbowGranter","GoldGranter"],n=UT(e),o=pu(e),r=n.filter(l=>!t.includes(l)),i=o.filter(l=>!r.includes(l)),a=o.length,s=a>0?r.length/a*100:0;return {logged:r,missing:i,total:a,percentage:s}}catch(t){return console.error("[AbilitiesInject] Failed to calculate progress:",t),{logged:[],missing:[],total:0,percentage:0}}}function qT(e){const t=new Date(e),n=t.toLocaleDateString("en-US",{month:"short"}),o=t.getDate(),r=t.getFullYear();return `${n} ${o}, ${r}`}function XT(e){const n=J.get("abilities")?.[e];return {bg:n?.color?.bg||"rgba(100, 100, 100, 0.9)",hover:n?.color?.hover||"rgba(150, 150, 150, 1)"}}function KT(e,t,n,o){const r=n?WT(e,t):void 0,i=document.createElement("div");i.className="gemini-ability-entry",i.style.cssText=`
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    align-items: center;
    justify-items: center;
  `;const a=o?"80px":"100px",s=document.createElement("div");if(s.className="gemini-ability-stamp",r){const c=`Logged on ${qT(r)}`;s.style.cursor="help";let d=null;s.addEventListener("mouseenter",()=>{d=document.createElement("div"),d.textContent=c,d.style.cssText=`
        position: fixed;
        background: rgba(45, 35, 28, 0.95);
        color: var(--fg);
        font-size: 11px;
        padding: 8px 12px;
        border-radius: 6px;
        z-index: 10000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        white-space: nowrap;
        transform: scale(0.95);
        opacity: 0;
        transition: opacity 0.1s ease, transform 0.1s ease;
      `,document.body.appendChild(d);const u=s.getBoundingClientRect(),p=d.offsetHeight,f=d.offsetWidth;let g=u.left+u.width/2-f/2,m=u.top-p-8;m<8&&(m=u.bottom+8),g<8&&(g=8),g+f>window.innerWidth-8&&(g=window.innerWidth-f-8),d.style.left=`${g}px`,d.style.top=`${m}px`,requestAnimationFrame(()=>{d&&(d.style.opacity="1",d.style.transform="scale(1)");});}),s.addEventListener("mouseleave",()=>{d&&(d.remove(),d=null);});}const l=Tg();l||console.error("[AbilitiesInject] Base URL not available - modules may not be initialized"),s.style.cssText=`
    position: relative;
    width: ${a};
    height: ${a};
    display: flex;
    align-items: center;
    justify-content: center;
    ${l?`background-image: url(${l}ui/Stamp.webp);`:""}
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `;try{const c=Q.toCanvas("pet",e,{scale:.7,boundsMode:"padded"});if(c){const d=o?"56px":"70px";c.style.position="absolute",c.style.top="50%",c.style.left="50%",c.style.transform="translate(-50%, -50%)",c.style.width=d,c.style.height=d,c.style.objectFit="contain",c.style.imageRendering="pixelated",c.style.zIndex="1",n||(c.style.filter="grayscale(1) brightness(0.16)"),s.appendChild(c);}else {const d=document.createElement("div");d.textContent="ðŸ¾",d.style.fontSize="32px",d.style.position="absolute",d.style.top="50%",d.style.left="50%",d.style.transform="translate(-50%, -50%)",d.style.zIndex="1",s.appendChild(d);}}catch(c){console.warn("[AbilitiesInject] Failed to load pet sprite:",e,c);const d=document.createElement("div");d.textContent="ðŸ¾",d.style.fontSize="32px",d.style.position="absolute",d.style.top="50%",d.style.left="50%",d.style.transform="translate(-50%, -50%)",d.style.zIndex="1",s.appendChild(d);}if(n){const c=VT(t),d=XT(t),u=document.createElement("div");u.className="gemini-ability-badge",u.textContent=c,u.style.cssText=`
      background: ${d.bg};
      color: white;
      padding: 4px;
      border-radius: 10px;
      min-width: ${o?"80px":"90px"};
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${o?"12px":"14px"};
      font-weight: bold;
      text-align: center;
    `,i.appendChild(s),i.appendChild(u);}else {const c=document.createElement("div");c.className="gemini-ability-badge",c.style.cssText=`
      background: var(--paper, var(--soft));
      padding: 4px;
      border-radius: 10px;
      min-width: ${o?"80px":"90px"};
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    `;const d=document.createElement("span");d.style.cssText=`
      font-size: ${o?"12px":"14px"};
      color: var(--fg);
      text-align: center;
      font-weight: normal;
      width: 100%;
    `,d.textContent="???",c.appendChild(d),i.appendChild(s),i.appendChild(c);}return i}function YT(e,t,n){return [...e.logged,...e.missing].map(r=>{const i=e.logged.includes(r);return KT(t,r,i,n)})}const bo="p.chakra-text.css-1qd26jh",gu="p.chakra-text.css-12b1ql2";let Go=[],$c=null,Dr=null,ri=false,fs=false;const Kp="gemini-ability-entry";let Na=false;const Un="gemini-overview-updated";let Dl=null;function JT(){const e=document.querySelector(bo);if(!e)return null;const t=e.textContent?.trim();if(!t||t==="???"||!document.querySelector(gu))return null;const o=document.querySelectorAll("div.McGrid");let r=null;for(const i of o){const a=i.textContent||"",s=a.includes("Normal"),l=a.includes("Gold"),c=a.includes("Max Weight"),d=a.includes("Rainbow"),u=a.includes("???"),p=[s,l,c,d,u].filter(Boolean).length,f=a.includes("Crops")||a.includes("Pets"),g=a.includes("Collected"),m=a.includes("Back");if(p>=2&&!f&&!g&&!m){r=i;break}}return r?{speciesName:t,variantGrid:r}:null}function Ph(e){const t=J.get("pets")??{};for(const[o,r]of Object.entries(t)){const i=r;if(i.name===e||i.displayName===e||o===e)return o}const n=e.toLowerCase();for(const[o,r]of Object.entries(t)){const i=r,a=typeof i.name=="string"?i.name:void 0,s=typeof i.displayName=="string"?i.displayName:void 0;if(a&&a.toLowerCase()===n||s&&s.toLowerCase()===n||o.toLowerCase()===n)return o}return n.replace(/\s+/g,"")}function Mh(e){const t=J.get("pets")??{};return e in t}function gs(){const e=document.querySelector(".gemini-journal-allTab");if(e){const r=e.querySelector(".gemini-allTab-tab");if(r instanceof HTMLElement&&r.offsetHeight>25)return "All"}const t=document.querySelectorAll("button");let n=null,o=null;for(const r of t){const i=r.textContent?.trim();i==="Crops"&&(n=r),i==="Pets"&&(o=r);}if(!n&&!o)return null;if(n&&o){const r=n.offsetHeight,i=o.offsetHeight;if(r>i)return "Crops";if(i>r)return "Pets";if(n.getAttribute("aria-selected")==="true")return "Crops";if(o.getAttribute("aria-selected")==="true")return "Pets"}return o&&o.offsetParent?"Pets":n&&n.offsetParent?"Crops":null}function Lh(){if(!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.includes("GARDEN JOURNAL"))||!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.match(/Collected\s+\d+%/)))return  false;const n=document.querySelector(bo);return n&&!n.textContent?.includes("GARDEN")?false:gs()==="Pets"}function QT(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(m=>m.textContent?.match(/Collected\s+\d+%/));if(!e||gs()!=="Pets")return  false;if(e.classList.contains(Un))return  true;const n=e.querySelector("span.chakra-text");if(!n)return  false;const o=n.textContent?.match(/\((\d+)\/(\d+)\)/);if(!o)return  false;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=J.get("pets")??{},s=Object.keys(a).length*4,l=s*.25;if(Math.abs(i-s)>l)return  false;if(!e.hasAttribute("data-original-percent")){const m=e.textContent?.match(/Collected\s+(\d+)%/);m&&e.setAttribute("data-original-percent",m[1]);}n.hasAttribute("data-original-count")||n.setAttribute("data-original-count",n.textContent||"");let c=0,d=0;for(const m of Object.keys(a)){const y=pu(m),x=fu(m);c+=y.length,d+=x.logged.length;}const u=r+d,p=i+c,f=Math.floor(u/p*100),g=e.childNodes[0];return g&&g.nodeType===Node.TEXT_NODE&&(g.textContent=`Collected ${f}% `),n.textContent=`(${u}/${p})`,e.classList.add(Un),true}function ZT(){J.get("pets");const e=document.querySelectorAll("p.chakra-text");for(const t of e){const n=t.textContent||"";if(!n.match(/^\d+\/\d+$/)||t.classList.contains(Un))continue;const o=n.match(/^(\d+)\/(\d+)$/);if(!o)continue;const r=parseInt(o[1],10),i=parseInt(o[2],10);let a=null,s=t,l=false;for(;s&&!l;){if(s.classList.contains("McGrid")){const m=s.querySelectorAll("p.chakra-text");for(const y of m){const x=y.textContent||"";if(x!=="???"&&!x.includes("/")&&x.length>2&&x.length<30){a=y,l=true;break}}}s=s.parentElement;}if(!a)continue;const c=a.textContent?.trim();if(!c)continue;const d=Ph(c);if(!d||!Mh(d))continue;const u=pu(d),p=fu(d);if(u.length===0)continue;const f=r+p.logged.length,g=i+u.length;t.textContent=`${f}/${g}`,t.classList.add(Un);}}function eA(){if(!Lh()){Na=false;return}if(!Na)try{const e=QT();ZT(),e&&(Na=!0);}catch(e){console.error("[AbilitiesInject] Failed to update overview page:",e);}}function Fc(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(t=>t.hasAttribute("data-original-percent"));if(e){const t=e.getAttribute("data-original-percent");if(t){const o=e.childNodes[0];o&&o.nodeType===Node.TEXT_NODE&&(o.textContent=`Collected ${t}% `);}e.removeAttribute("data-original-percent"),e.classList.remove(Un);const n=e.querySelector("span.chakra-text");if(n){const o=n.getAttribute("data-original-count");o&&(n.textContent=o),n.removeAttribute("data-original-count");}}document.querySelectorAll(`.${Un}`).forEach(t=>{t.classList.remove(Un);}),Na=false;}function tA(){return window.innerWidth<768}function nA(e,t){const n=document.querySelector(gu);if(!n)return;const o=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!o)return;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=r+e,s=i+t;n.textContent=`Collected ${a}/${s}`;}function oA(e,t){try{fs=!0,Gt();const n=fu(t);if(n.total===0)return;const o=YT(n,t,tA());for(const r of o)e.appendChild(r),Go.push(r);nA(n.logged.length,n.total),wr={logged:n.logged.length,total:n.total};}catch(n){console.error("[AbilitiesInject] Failed to inject:",n),Gt();}finally{setTimeout(()=>{fs=false;},0);}}function rA(e,t){const n=document.querySelector(gu);if(!n)return;const o=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!o)return;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=r-e,s=i-t;n.textContent=`Collected ${a}/${s}`;}let wr=null;function Gt(){wr&&(rA(wr.logged,wr.total),wr=null);for(const e of Go)e.remove();Go=[],$c=null,fs=false;}function Pn(){if(fs)return;const e=gs();e!==Dl&&(Dl==="Pets"&&e!=="Pets"&&(Fc(),Gt()),Dl=e);const t=gs();if(Lh()&&t==="Pets"){Gt(),eA();return}Fc();const n=JT();if(!n){Gt();return}const o=Ph(n.speciesName);if(!o){Gt();return}if(!Mh(o)){Gt();return}o===$c&&Go.length>0&&Go[0].isConnected||($c=o,oA(n.variantGrid,o));}function iA(){Pn(),setTimeout(()=>{Pn();},100),setTimeout(()=>{Pn();},500),setTimeout(()=>{Pn();},1e3),Dr=new MutationObserver(e=>{for(const t of e)t.type==="childList"&&(t.addedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Kp)||Go.includes(n))return;const o=n.textContent||"";(o.includes("GARDEN JOURNAL")||o.includes("Collected")||o.includes("Chicken")||o.includes("Bunny"))&&Pn(),(n.matches?.(bo)||n.querySelector?.(bo))&&Pn(),(n.matches?.("div.McGrid")||n.querySelector?.("div.McGrid"))&&Pn();}}),t.removedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Kp))return;(n.matches?.(bo)||n.querySelector?.(bo))&&Gt();}}));}),Dr.observe(document.body,{childList:true,subtree:true});}function aA(){Dr&&(Dr.disconnect(),Dr=null),Gt(),Fc();}function sA(){ri||(ri=true,iA());}function lA(){ri&&(ri=false,aA());}function cA(){return ri}const dA={init:sA,destroy:lA,isEnabled:cA};function Ue(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function oo(e,t){e.add(()=>t.disconnect());}let Ra=false;function Ko(){return Ra}function Ot(e){if(!Ra){Ra=true;try{e();}finally{Ra=false;}}}const uA="Discover this variant by experimenting in the garden.",Nh="Hatch and raise pets to discover this variant.",Yp="Hatch pets of this species to discover its abilities.";function pA(e){return e.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/^\w/,t=>t.toUpperCase())}function fA(){return Be.getCropVariants()}function gA(){return Be.getPetVariants()}function mA(e){const n=(J.get("mutations")??{})[e];return n?{hint:typeof n.hint=="string"?n.hint:void 0}:{}}function Rh(e){const n=(J.get("mutations")??{})[e],o=typeof n?.name=="string"?n.name:void 0;return (typeof n?.displayName=="string"?n.displayName:void 0)??o??pA(e)}function hA(e){if(e==="Normal")return "Grow a standard crop without special conditions.";if(e==="Max Weight")return "Harvest a crop at maximum weight.";const t=mA(e);return t.hint?t.hint:`Discover ${Rh(e)} by experimenting with crop conditions.`}function bA(e){return e==="Normal"?Nh:e==="Max Weight"?"Raise a pet to its maximum weight.":`Hatch pets to discover the ${Rh(e)} variant.`}function xA(e){const o=(J.get("pets")??{})[e]?.innateAbilityWeights;return o?Object.keys(o):[]}function yA(){return {getCropHint:e=>hA(e)||uA,getPetVariantHint:e=>bA(e)||Nh,getAbilityHint:e=>(xA(e).length===0,Yp)}}let Oa=null;function vA(e){const t=document.createElement("div");return t.className="gemini-journal-hint",t.textContent=e,t.style.cssText=`
    position: fixed;
    background: var(--paper, rgba(45, 35, 28, 0.95));
    color: var(--fg);
    font-size: 11px;
    padding: 8px 12px;
    border-radius: 6px;
    max-width: 240px;
    z-index: 10000;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    line-height: 1.4;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.1s ease, transform 0.1s ease;
    font-family: inherit;
    text-align: center;
  `,t}function wA(e,t){const n=t.getBoundingClientRect(),o=240,r=8;let i=n.left+n.width/2-o/2,a=n.top-40-r;i<8&&(i=8),i+o>window.innerWidth-8&&(i=window.innerWidth-o-8),a<8&&(a=n.bottom+r),e.style.left=`${i}px`,e.style.top=`${a}px`;}function Jp(e,t){ms();const n=vA(t);document.body.appendChild(n),wA(n,e),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="scale(1)";}),Oa=n;}function ms(){Oa&&(Oa.remove(),Oa=null);}function Js(e){const t=J.get("plants")??{};for(const[r,i]of Object.entries(t)){const a=i;if(a?.crop?.name===e)return {id:r,type:"crop"};if(a?.plant?.name===e)return {id:r,type:"crop"};if(r===e)return {id:r,type:"crop"}}const n=J.get("pets")??{};for(const[r,i]of Object.entries(n)){const a=i;if(a?.name===e)return {id:r,type:"pet"};if(a?.displayName===e)return {id:r,type:"pet"};if(r===e)return {id:r,type:"pet"}}const o=e.toLowerCase();for(const[r,i]of Object.entries(t)){const a=i;if(a?.crop?.name?.toLowerCase()===o)return {id:r,type:"crop"};if(a?.plant?.name?.toLowerCase()===o)return {id:r,type:"crop"};if(r.toLowerCase()===o)return {id:r,type:"crop"}}for(const[r,i]of Object.entries(n)){const a=i;if(a?.name?.toLowerCase()===o)return {id:r,type:"pet"};if(a?.displayName?.toLowerCase()===o)return {id:r,type:"pet"};if(r.toLowerCase()===o)return {id:r,type:"pet"}}return null}function Oh(e,t){if(t==="crop"){const o=(J.get("plants")??{})[e];return o?.crop?.name||o?.plant?.name||e}else {const o=(J.get("pets")??{})[e];return o?.name||o?.displayName||e}}let Br=Ue(),zo=false;const $h="gemini-hint-attached",Bl=yA();function SA(){const e=document.querySelectorAll(".chakra-text, p, span");for(const t of e){const n=t.textContent?.trim();if(n&&n!=="???"&&!n.includes("/")&&!n.includes("%")&&!(n==="Crops"||n==="Pets"||n==="All")&&!(n.includes("GARDEN")||n.includes("JOURNAL"))&&!n.includes("Collected")&&n.length>=3&&n.length<=20){const o=Js(n);if(o)return {displayName:n,id:o.id,type:o.type}}}return null}function CA(){const e=document.querySelectorAll("button");for(const t of e){const n=t.textContent?.trim(),o=t.querySelector('[class*="MotionMcFlex"], .MotionMcFlex, div[style*="height: 35px"]');if(o&&o.offsetHeight>=30){if(n==="Crops")return "crops";if(n==="Pets")return "pets"}}return null}function kA(){const e=[],t=document.querySelectorAll("p"),n=document.querySelectorAll("span"),o=[...t,...n];for(const r of o){if(r.textContent?.trim()!=="???"||!r.offsetParent)continue;let a=r.parentElement,s=null;for(let l=0;l<4&&a&&!s;l++){const c=a.parentElement;if(!c)break;for(const d of Array.from(c.children)){if(!(d instanceof HTMLElement)||d===a)continue;const u=p=>{if(Fh(p))return  true;for(const f of Array.from(p.children))if(f instanceof HTMLElement&&u(f))return  true;return  false};if(u(d)){s=c;break}}a=c;}s&&(s.classList.contains($h)||e.push(s));}return e}function _A(){return fA()}function Dc(){return gA()}function Qp(e,t){return (t==="crops"?_A():Dc())[e]??null}function Fh(e){return e.style.backgroundImage&&e.style.backgroundImage.includes("Stamp")?true:window.getComputedStyle(e).backgroundImage.includes("Stamp")}function TA(e){let t=e.parentElement;for(let n=0;n<8&&t;n++){const o=t.querySelectorAll("div"),r=[];for(const i of o)Fh(i)&&r.push(i);if(r.length>=4)return r;t=t.parentElement;}return []}function AA(e,t){let n=e.parentElement;for(let o=0;o<6&&n;o++){const r=[];for(const i of t)n.contains(i)&&r.push(i);if(r.length===1){const i=r[0];return t.indexOf(i)}n=n.parentElement;}return  -1}function EA(e,t){return t>Dc().length&&e>=Dc().length?"ability":"variant"}function IA(e){const t=SA();if(!t)return;const n=CA();if(!n)return;const o=TA(e);if(o.length===0)return;const r=AA(e,o);if(r===-1)return;let i="";if(n==="crops"){const c=Qp(r,"crops");if(!c)return;i=Bl.getCropHint(c,{speciesId:t.id,speciesName:t.displayName});}else if(n==="pets")if(EA(r,o.length)==="variant"){const d=Qp(r,"pets");if(!d)return;i=Bl.getPetVariantHint(d,{speciesId:t.id,speciesName:t.displayName});}else i=Bl.getAbilityHint(t.id);e.classList.add($h);const a=()=>Jp(e,i),s=()=>ms(),l=c=>{c.stopPropagation(),Jp(e,i),setTimeout(()=>ms(),3e3);};e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",s),e.addEventListener("click",l),Br.add(()=>{e.removeEventListener("mouseenter",a),e.removeEventListener("mouseleave",s),e.removeEventListener("click",l);});}function Dh(){const e=kA();if(e.length!==0)for(const t of e)IA(t);}function PA(){const e=new MutationObserver(()=>{zo&&Dh();});e.observe(document.body,{childList:true,subtree:true}),oo(Br,e);}function MA(){zo||(zo=true,Dh(),PA());}function LA(){zo&&(zo=false,Br.run(),Br.clear(),Br=Ue(),ms());}function NA(){return zo}const RA=Object.freeze(Object.defineProperty({__proto__:null,destroy:LA,init:MA,isEnabled:NA},Symbol.toStringTag,{value:"Module"}));function Ni(){const e=document.querySelectorAll('.chakra-box, [class*="Box"], div');for(const n of e)if(n.style.backgroundImage?.includes("GardenJournal")||window.getComputedStyle(n).backgroundImage?.includes("GardenJournal"))return n;const t=document.querySelectorAll(".chakra-text, p, span");for(const n of t)if(n.textContent?.includes("GARDEN JOURNAL")){let o=n.parentElement;for(let r=0;r<10&&o;r++){if(o.classList.contains("McGrid")||o.querySelector(".McGrid"))return o;o=o.parentElement;}}return null}function OA(){const e=Ni();if(!e)return null;const t=e.querySelectorAll(".McFlex");for(const n of t){const o=window.getComputedStyle(n);if((o.overflowY==="auto"||o.overflowY==="scroll")&&n.querySelector(":scope > .McGrid"))return n}return null}function Bh(){const e=Ni();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}let Co=Ue(),ii=false,dn={filter:"all",sort:"default"};const Gh="gemini-journal-filterSort";function $A(){const e=Ni();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}function FA(){const e=OA();return e?Array.from(e.querySelectorAll(":scope > .McGrid")).filter(n=>(n.textContent??"").match(/\d+\/\d+/)!==null):[]}function DA(){const e=document.createElement("div");e.className=Gh,e.style.cssText=`
        display: flex;
        gap: 8px;
        padding: 6px 0;
        margin: 6px 0;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    `;const t=document.createElement("span");t.textContent="Filter:",t.style.cssText="color: #A88A6B; font-size: 11px;";const n=document.createElement("select");for(const[i,a]of [["all","All"],["missing","Missing"],["collected","Complete"]]){const s=document.createElement("option");s.value=i,s.textContent=a,n.appendChild(s);}n.style.cssText=`
        background: #D4C8B8;
        color: #3D3325;
        border: 1px solid #8B7355;
        border-radius: 4px;
        padding: 3px 6px;
        font-size: 10px;
        cursor: pointer;
    `,n.value=dn.filter,n.onchange=()=>{dn.filter=n.value,Ot(()=>Bc());};const o=document.createElement("span");o.textContent="Sort:",o.style.cssText="color: #A88A6B; font-size: 11px; margin-left: 8px;";const r=document.createElement("select");for(const[i,a]of [["default","Default"],["alphabetical","A-Z"],["progress","By Progress"]]){const s=document.createElement("option");s.value=i,s.textContent=a,r.appendChild(s);}return r.style.cssText=n.style.cssText,r.value=dn.sort,r.onchange=()=>{dn.sort=r.value,Ot(()=>Bc());},e.append(t,n,o,r),e}function BA(e,t){const n=e.querySelectorAll(".chakra-text, p, span");let o="",r=0;for(const i of n){const a=i.textContent?.trim()??"",s=a.match(/^(\d+)\/(\d+)$/);if(s){const l=parseInt(s[1]),c=parseInt(s[2]);r=c>0?l/c*100:0;continue}a!=="???"&&!a.includes("%")&&a.length>=2&&a.length<=25&&(o=a);}return !o&&r===0?null:{el:e,name:o||"???",progress:r,originalOrder:t}}function Bc(){const e=FA();if(e.length===0)return;const t=[];if(e.forEach((o,r)=>{const i=BA(o,r);i&&t.push(i);}),t.length===0)return;for(const o of t){let r=true;dn.filter==="missing"?r=o.progress<100:dn.filter==="collected"&&(r=o.progress===100),o.el.style.display=r?"":"none";}let n;switch(dn.sort){case "alphabetical":n=[...t].sort((o,r)=>o.name.localeCompare(r.name));break;case "progress":n=[...t].sort((o,r)=>r.progress-o.progress);break;default:n=[...t].sort((o,r)=>o.originalOrder-r.originalOrder);}n.forEach((o,r)=>{o.el.style.order=String(r);});}function GA(){if(document.querySelector(`.${Gh}`))return;const e=$A();if(!e||!e.closest(".McFlex"))return;const n=DA(),o=e.nextElementSibling;if(o&&e.parentElement)e.parentElement.insertBefore(n,o);else if(e.parentElement)e.parentElement.appendChild(n);else return;Co.add(()=>n.remove());}function $a(){Ot(()=>{GA(),Bc();});}let $n=null;function zA(){$n!==null&&clearTimeout($n),$n=window.setTimeout(()=>{Ko()||$a(),$n=null;},200);}function HA(){setTimeout($a,100),setTimeout($a,400),setTimeout($a,800);const e=new MutationObserver(()=>{Ko()||zA();});e.observe(document.body,{childList:true,subtree:true}),oo(Co,e),Co.add(()=>{$n!==null&&(clearTimeout($n),$n=null);});}function jA(){dn={filter:"all",sort:"default"},Co.run(),Co.clear(),Co=Ue();}function UA(){ii||(ii=true,HA(),console.log("[JournalFilterSort] Initialized"));}function WA(){ii&&(ii=false,jA(),console.log("[JournalFilterSort] Destroyed"));}function VA(){return ii}const qA=Object.freeze(Object.defineProperty({__proto__:null,destroy:WA,init:UA,isEnabled:VA},Symbol.toStringTag,{value:"Module"}));let Rt=Ue(),fn=Ue(),ai=false,Wn=false;const Qs="gemini-journal-allTab",Gc="gemini-journal-allOverlay";let Sr="all",hs="default";function zh(){const e=Ni();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t){const o=n.textContent?.trim();if(o==="Crops"||o==="Pets"){const r=n.closest("button");if(r){const i=r.parentElement;if(i&&i.querySelectorAll("button").length>=2)return i}}}return null}function mu(){const e=zh();if(!e)return {crops:null,pets:null};let t=null,n=null;const o=e.querySelectorAll("button");for(const r of o){const i=r.textContent?.trim();i==="Crops"&&(t=r),i==="Pets"&&(n=r);}return {crops:t,pets:n}}function XA(){const{crops:e,pets:t}=mu();[e,t].forEach(n=>{if(!n)return;const o=n.querySelector("div");if(o){const r=o.querySelector("div");r instanceof HTMLElement&&(r.style.height="20px");}});}function Hh(){const e=Ni();if(!e)return null;const t=e.querySelectorAll(".McGrid");for(const n of t){const o=n.querySelectorAll(":scope > .McFlex");for(const r of o){const i=window.getComputedStyle(r);if((i.overflow==="hidden"||i.overflowY==="hidden")&&(r.textContent?.includes("JOURNAL")||r.querySelector(".McGrid")))return r}}return null}function KA(e){return e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F"}function YA(){const e=document.createElement("button");e.className=Qs,e.type="button",e.style.cssText=`
        background: transparent;
        border: none;
        cursor: pointer;
        height: 60px;
        padding: 0;
        margin: 0;
    `;const t=document.createElement("div");t.className="McFlex",t.style.cssText=`
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 100%;
    `;const n=window.innerWidth<768,o=document.createElement("div");o.className="gemini-allTab-tab",o.style.cssText=`
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: ${n?"70px":"100px"};
        height: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #5a7a6a;
        position: relative;
        border-left: 1px solid #6a9a82;
        border-right: 1px solid #6a9a82;
        border-top: 2px solid #7aba9a;
        overflow: hidden;
        transition: height 0.3s ease-in-out;
    `;const r=document.createElement("span");r.textContent="All",r.style.cssText=`
        font-size: ${n?"12px":"14px"};
        font-weight: bold;
        color: white;
        position: relative;
        z-index: 2;
    `,o.appendChild(r),t.appendChild(o),e.appendChild(t);const i=()=>{const a=window.innerWidth<768;o.style.width=a?"70px":"100px",r.style.fontSize=a?"12px":"14px";};return window.addEventListener("resize",i),Rt.add(()=>window.removeEventListener("resize",i)),e.onmouseenter=()=>{Wn||(o.style.height="25px");},e.onmouseleave=()=>{Wn||(o.style.height="20px");},e.onclick=a=>{a.preventDefault(),a.stopPropagation(),Ot(()=>eE());},e}function JA(e,t){const n=document.createElement("div");n.style.cssText=`
        display: grid;
        grid-template-columns: 50px 1fr;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    `;const o=document.createElement("div");o.style.cssText=`
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    `;const r=e.variantsLogged.length===0;if(r){const m=document.createElement("span");m.textContent="?",m.style.cssText="font-size: 24px; color: rgba(168, 138, 107, 0.6); font-weight: bold;",o.appendChild(m);}else try{if(Q.isReady()){const m=t==="crop"?"plant":"pet";let y=e.species;t==="crop"&&(e.species==="DawnCelestial"&&(y="DawnCelestialCrop"),e.species==="MoonCelestial"&&(y="MoonCelestialCrop"),e.species==="OrangeTulip"&&(y="Tulip"));const x=(w,T)=>{try{if(Q.has(w,T))return Q.toCanvas(w,T,{scale:.5})}catch{}return null},S=x(m,y)||(t==="crop"?x("tallplant",y):null)||x(m,y.toLowerCase())||(t==="crop"?x("tallplant",y.toLowerCase()):null);if(S)S.style.cssText="max-width: 46px; max-height: 46px; display: block;",o.appendChild(S);else {const w=document.createElement("span");w.textContent=t==="crop"?"🌱":"🐾",w.style.cssText="font-size: 20px;",o.appendChild(w);}}else {const m=document.createElement("span");m.textContent=t==="crop"?"🌱":"🐾",m.style.cssText="font-size: 20px;",o.appendChild(m);}}catch{const m=document.createElement("span");m.textContent=t==="crop"?"🌱":"🐾",m.style.cssText="font-size: 20px;",o.appendChild(m);}let i,a,s;if(t==="pet"){const m=e.abilitiesLogged?.length??0,y=e.abilitiesTotal??0;i=e.variantsLogged.length+m,a=e.variantsTotal+y,s=a>0?i/a*100:0;}else i=e.variantsLogged.length,a=e.variantsTotal,s=e.variantsPercentage;const l=KA(s),c=document.createElement("div");c.style.cssText=`
        position: relative;
        background: #D4C4A8;
        border-radius: 5px;
        padding: 6px 12px;
        overflow: hidden;
        flex: 1;
        min-width: 0;
    `;const d=document.createElement("div");d.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${s}%;
        background: ${l};
        border-radius: inherit;
        transition: width 0.3s ease;
    `;const u=document.createElement("div");u.style.cssText=`
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        position: relative;
        z-index: 1;
    `;const p=Oh(e.species,t),f=document.createElement("span");f.style.cssText="font-weight: bold; font-size: 13px; color: #3D3325; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",f.textContent=r?"???":p;const g=document.createElement("span");return g.style.cssText=`font-size: 12px; font-weight: bold; color: ${s<100?"#8B6914":"#3D3325"}; margin-left: 4px; flex-shrink: 0;`,g.textContent=`${i}/${a}`,u.append(f,g),c.append(d,u),n.append(o,c),n.onclick=m=>{m.preventDefault(),m.stopPropagation(),QA(e.species,t);},n.onmouseenter=()=>{n.style.opacity="0.8";},n.onmouseleave=()=>{n.style.opacity="1";},n}function QA(e,t){Ot(()=>hu()),setTimeout(()=>{const{crops:n,pets:o}=mu(),r=t==="crop"?n:o;r&&(r.click(),setTimeout(()=>{const i=Hh();if(!i)return;const a=i.querySelectorAll(".McGrid");for(const s of a){const l=s.textContent??"";if(l.toLowerCase().includes(e.toLowerCase())||l.includes(Oh(e,t))){s.click();break}}setTimeout(()=>{Ot(()=>Uh());},100);},200));},100);}function Zp(e,t,n){const o=document.createElement("div");o.style.cssText="margin-bottom: 16px;";let r=0,i=0;for(const u of t)n==="pet"?(r+=u.variantsLogged.length+(u.abilitiesLogged?.length??0),i+=u.variantsTotal+(u.abilitiesTotal??0)):(r+=u.variantsLogged.length,i+=u.variantsTotal);const a=document.createElement("div"),s=n==="crop"?"#7cb342":"#9575cd";a.style.cssText=`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        margin-bottom: 12px;
        border-bottom: 2px solid rgba(212, 196, 168, 0.3);
    `;const l=document.createElement("span");l.textContent=e,l.style.cssText=`font-size: 16px; font-weight: 600; font-family: shrikhand, serif; color: ${s}; text-transform: uppercase;`;const c=document.createElement("span");c.textContent=`${r}/${i}`,c.style.cssText="color: #A88A6B; font-size: 12px; font-weight: bold;",a.append(l,c);const d=document.createElement("div");d.style.cssText="display: flex; flex-direction: column; gap: 12px; padding: 0 4px;";for(const u of t)d.appendChild(JA(u,n));return o.append(a,d),o}function jh(){const e=Be.getMyJournal(),t=Be.calculateProduceProgress(e),n=Be.calculatePetProgress(e),o=document.createElement("div");o.className="gemini-journal-allContent",o.style.cssText=`
        padding: 12px 16px;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;const r=document.createElement("div");r.style.cssText="text-align: center; padding-bottom: 8px;";const i=document.createElement("p");i.textContent="GARDEN JOURNAL",i.style.cssText="font-size: 20px; font-weight: bold; font-family: shrikhand, serif; color: #4F6981; margin-bottom: 4px;";const a=t.variantsLogged+n.variantsLogged+(n.abilitiesLogged??0),s=t.variantsTotal+n.variantsTotal+(n.abilitiesTotal??0),l=Math.floor(a/s*100),c=document.createElement("p");c.style.cssText="font-size: 14px; font-weight: bold; color: #4F6981; margin-top: -2px;",c.textContent=`Collected ${l}% `;const d=document.createElement("span");d.className="chakra-text",d.style.cssText="color: #A88A6B; font-size: 12px; font-weight: bold;",d.textContent=`(${a}/${s})`,c.appendChild(d);const u=document.createElement("div");u.style.cssText="height: 4px; background: #D4C4A8; border-radius: 9999px; opacity: 0.5; margin: 8px 0;",r.append(i,c,u);const p=document.createElement("div");p.style.cssText=`
        display: flex;
        gap: 12px;
        padding: 6px 0;
        margin-bottom: 8px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    `;const f=document.createElement("span");f.textContent="Filter:",f.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold;";const g=document.createElement("select");for(const[T,k]of [["all","All"],["missing","Missing"],["complete","Complete"]]){const b=document.createElement("option");b.value=T,b.textContent=k,g.appendChild(b);}g.value=Sr,g.style.cssText=`
        background: #D4C8B8;
        color: #3D3325;
        border: 1px solid #8B7355;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 10px;
        cursor: pointer;
    `,g.onchange=()=>{Sr=g.value,tf();};const m=document.createElement("span");m.textContent="Sort:",m.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold; margin-left: 8px;";const y=document.createElement("select");for(const[T,k]of [["default","Default"],["az","A-Z"],["progress","By Progress"]]){const b=document.createElement("option");b.value=T,b.textContent=k,y.appendChild(b);}y.value=hs,y.style.cssText=g.style.cssText,y.onchange=()=>{hs=y.value,tf();},p.append(f,g,m,y);const x=document.createElement("div");x.className="gemini-all-scroll",x.style.cssText=`
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
    `,ZA();const S=ef(t.speciesDetails,"crop"),w=ef(n.speciesDetails,"pet");if(S.length>0&&x.appendChild(Zp("Crops",S,"crop")),w.length>0&&x.appendChild(Zp("Pets",w,"pet")),S.length===0&&w.length===0){const T=document.createElement("div");T.style.cssText="text-align: center; padding: 40px 20px; color: #A88A6B; font-size: 14px;",T.textContent=Sr==="missing"?"All entries are complete!":Sr==="complete"?"No complete entries yet.":"No entries found.",x.appendChild(T);}return o.append(r,p,x),o}function ef(e,t){let n=e.filter(o=>{let r,i;t==="pet"?(r=o.variantsLogged.length+(o.abilitiesLogged?.length??0),i=o.variantsTotal+(o.abilitiesTotal??0)):(r=o.variantsLogged.length,i=o.variantsTotal);const a=i>0?r/i*100:0;switch(Sr){case "missing":return a<100;case "complete":return a>=100;default:return  true}});return hs==="az"?n=[...n].sort((o,r)=>o.species.localeCompare(r.species)):hs==="progress"&&(n=[...n].sort((o,r)=>{const i=t==="pet"?o.variantsLogged.length+(o.abilitiesLogged?.length??0):o.variantsLogged.length,a=t==="pet"?o.variantsTotal+(o.abilitiesTotal??0):o.variantsTotal,s=a>0?i/a:0,l=t==="pet"?r.variantsLogged.length+(r.abilitiesLogged?.length??0):r.variantsLogged.length,c=t==="pet"?r.variantsTotal+(r.abilitiesTotal??0):r.variantsTotal;return (c>0?l/c:0)-s})),n}let Gl=false;function ZA(){if(Gl)return;Gl=true;const e=document.createElement("style");e.textContent=`
        .gemini-all-scroll::-webkit-scrollbar {
            width: 4px;
            height: 6px;
        }
        .gemini-all-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        .gemini-all-scroll::-webkit-scrollbar-thumb {
            background: rgba(85, 48, 20, 0.2);
            border-radius: 3px;
        }
        .gemini-all-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(110, 60, 24, 0.3);
        }
    `,document.head.appendChild(e),Rt.add(()=>{e.remove(),Gl=false;});}function tf(){const e=document.querySelector(`.${Gc}`);if(e){for(;e.firstChild;)e.firstChild.remove();e.appendChild(jh());}}function eE(){if(Wn)return;Wn=true;const t=document.querySelector(`.${Qs}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="35px"),XA();const n=Hh();if(!n){console.warn("[JournalAllTab] Cannot activate All tab: content wrapper not found"),Wn=false;return}const o=[];for(const a of Array.from(n.children))a instanceof HTMLElement&&!a.classList.contains(Gc)&&(o.push(a),a.style.visibility="hidden");fn.add(()=>{for(const a of o)a.style.visibility="";});const r=document.createElement("div");r.className=Gc,r.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: transparent;
        display: flex;
        flex-direction: column;
    `,window.getComputedStyle(n).position==="static"&&(n.style.position="relative",fn.add(()=>{n.style.position="";})),r.appendChild(jh()),n.appendChild(r),fn.add(()=>r.remove()),tE(),console.log("[JournalAllTab] All tab activated");}function tE(){const e=Bh();if(!e)return;const t=Be.getMyJournal(),n=Be.calculateProduceProgress(t),o=Be.calculatePetProgress(t),r=n.variantsLogged+o.variantsLogged+(o.abilitiesLogged??0),i=n.variantsTotal+o.variantsTotal+(o.abilitiesTotal??0),a=Math.floor(r/i*100);if(!e.hasAttribute("data-original-percent")){const c=e.textContent?.match(/Collected\s+(\d+)%/);c&&e.setAttribute("data-original-percent",c[1]);}const s=e.querySelector("span.chakra-text");s&&!s.hasAttribute("data-original-count")&&s.setAttribute("data-original-count",s.textContent||"");const l=e.childNodes[0];l&&l.nodeType===Node.TEXT_NODE&&(l.textContent=`Collected ${a}% `),s&&(s.textContent=`(${r}/${i})`);}function nE(){const e=Bh();if(!e)return;const t=e.getAttribute("data-original-percent");if(t){const o=e.childNodes[0];o&&o.nodeType===Node.TEXT_NODE&&(o.textContent=`Collected ${t}% `),e.removeAttribute("data-original-percent");}const n=e.querySelector("span.chakra-text");if(n){const o=n.getAttribute("data-original-count");o&&(n.textContent=o),n.removeAttribute("data-original-count");}}function hu(){if(!Wn)return;Wn=false;const t=document.querySelector(`.${Qs}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="20px"),fn.run(),fn=Ue(),nE(),console.log("[JournalAllTab] All tab deactivated");}function Uh(){const e=zh();if(!e||e.querySelector(`.${Qs}`))return;const{crops:t,pets:n}=mu();if(!t)return;const o=YA();e.insertBefore(o,t),Rt.add(()=>o.remove());const r=()=>{Ot(()=>hu());};t&&(t.addEventListener("click",r),Rt.add(()=>t.removeEventListener("click",r))),n&&(n.addEventListener("click",r),Rt.add(()=>n.removeEventListener("click",r))),console.log("[JournalAllTab] Tab injected");}function Fa(){Ot(()=>{Uh();});}let Fn=null;function oE(){Fn!==null&&clearTimeout(Fn),Fn=window.setTimeout(()=>{Ko()||Fa(),Fn=null;},200);}function rE(){setTimeout(Fa,100),setTimeout(Fa,400),setTimeout(Fa,800);const e=new MutationObserver(()=>{Ko()||oE();});e.observe(document.body,{childList:true,subtree:true}),oo(Rt,e),Rt.add(()=>{Fn!==null&&(clearTimeout(Fn),Fn=null);});}function iE(){hu(),fn.run(),fn.clear(),Rt.run(),Rt.clear(),fn=Ue(),Rt=Ue();}function aE(){ai||(ai=true,rE(),console.log("[JournalAllTab] Initialized"));}function sE(){ai&&(ai=false,iE(),console.log("[JournalAllTab] Destroyed"));}function lE(){return ai}const cE=Object.freeze(Object.defineProperty({__proto__:null,destroy:sE,init:aE,isEnabled:lE},Symbol.toStringTag,{value:"Module"}));function dE(){const e=os();we(an.JOURNAL_HINTS,true),we(an.JOURNAL_FILTER_SORT,true),e.register({id:"abilitiesInject",name:"Journal Abilities",description:"Shows pet abilities in journal modal",injection:dA,storageKey:an.ABILITIES_INJECT,defaultEnabled:true}),e.register({id:"journalHints",name:"Journal Hints",description:"Shows hints for missing journal entries on hover",injection:RA,storageKey:an.JOURNAL_HINTS,defaultEnabled:true}),e.register({id:"journalFilterSort",name:"Journal Filter/Sort",description:"Adds filter and sort controls to journal overview",injection:qA,storageKey:an.JOURNAL_FILTER_SORT,defaultEnabled:true}),e.register({id:"journalAllTab",name:"Journal All Tab",description:"Adds an All tab showing combined crops and pets view",injection:cE,storageKey:an.JOURNAL_ALL_TAB,defaultEnabled:true});}const nf=ke.JOURNAL,zl={injections:{abilitiesInject:true,journalHints:true,journalFilterSort:true,journalAllTab:true}};function uE(){const e=ve(nf,null);return e||(ve(ke.JOURNAL_CHECKER,null)&&we(nf,zl),zl)}let rr=false;const Be={init(){rr||(rr=true,uE(),zT(),dE());},destroy(){rr&&(rr=false,HT());},isReady(){return rr},getProgress(){return null},getMyJournal:kh,getCropVariants:_h,getPetVariants:Th,getAllMutations:BT,getPetAbilities:Ah,calculateProduceProgress:Eh,calculatePetProgress:Ih,aggregateJournalProgress:Ys,getMissingSummary:GT,refresh:jT,dispatchUpdate:uu},bu=ke.BULK_FAVORITE,Wh={enabled:false,position:"top-right"};function Ri(){return ve(bu,Wh)}function Vh(e){we(bu,e);}function pE(e){const t=Ri();t.position=e,Vh(t);}function qh(){return Ri().enabled}function fE(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function gE(e){const t=kt().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let o=0;for(const r of t.items){if(!fE(r))continue;const i=n.has(r.id);e&&i||!e&&!i||(await Us(r.id,e),o++,await mE(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${o} items`),o}function mE(e){return new Promise(t=>setTimeout(t,e))}let ca=false;const zc={init(){ca||(ca=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return ca},DEFAULT_CONFIG:Wh,STORAGE_KEY:bu,loadConfig:Ri,saveConfig:Vh,isEnabled:qh,setPosition:pE,bulkFavorite:gE,destroy(){ca=false;}};class hE{constructor(){H(this,"achievements",new Map);H(this,"data");H(this,"STORAGE_KEY",ke.ACHIEVEMENTS);H(this,"onUnlockCallbacks",[]);H(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return ve(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){we(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const o=this.isUnlocked(t),r=await n.checkProgress(),i={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=r>=n.target;return !o&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const o=await this.checkAchievement(n);t.push(o);}return t}unlock(t,n){const o=this.achievements.get(t);if(!o)return;const r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return {total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Unlock callback error:",o);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Progress callback error:",o);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Gr=null;function bt(){return Gr||(Gr=new hE),Gr}function bE(){Gr&&(Gr=null);}let da=false;const xE={init(){da||(bt(),da=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return da},getManager(){return bt()},register:(...e)=>bt().register(...e),registerMany:(...e)=>bt().registerMany(...e),isUnlocked:(...e)=>bt().isUnlocked(...e),getAll:()=>bt().getAllAchievements(),getUnlocked:()=>bt().getUnlockedAchievements(),getStats:()=>bt().getCompletionStats(),checkAll:()=>bt().checkAllAchievements(),onUnlock:(...e)=>bt().onUnlock(...e),onProgress:(...e)=>bt().onProgress(...e),destroy(){bE(),da=false;}},yE={enabled:true},Xh=ke.ANTI_AFK,vE=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],wE=25e3,SE=1,CE=1e-5,ge={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function kE(){const e=(t,n)=>{const o=r=>{r.stopImmediatePropagation(),r.preventDefault?.();};t.addEventListener(n,o,{capture:true}),ge.listeners.push({type:n,handler:o,target:t});};for(const t of vE)e(document,t),e(window,t);}function _E(){for(const{type:e,handler:t,target:n}of ge.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ge.listeners.length=0;}function TE(){const e=Object.getPrototypeOf(document);ge.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ge.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ge.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function AE(){const e=Object.getPrototypeOf(document);try{ge.savedProps.hidden&&Object.defineProperty(e,"hidden",ge.savedProps.hidden);}catch{}try{ge.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ge.savedProps.visibilityState);}catch{}try{ge.savedProps.hasFocus&&(document.hasFocus=ge.savedProps.hasFocus);}catch{}}function bs(){ge.audioCtx&&ge.audioCtx.state!=="running"&&ge.audioCtx.resume?.().catch(()=>{});}function EE(){try{const e=window.AudioContext||window.webkitAudioContext;ge.audioCtx=new e({latencyHint:"interactive"}),ge.gainNode=ge.audioCtx.createGain(),ge.gainNode.gain.value=CE,ge.oscillator=ge.audioCtx.createOscillator(),ge.oscillator.frequency.value=SE,ge.oscillator.connect(ge.gainNode).connect(ge.audioCtx.destination),ge.oscillator.start(),document.addEventListener("visibilitychange",bs,{capture:!0}),window.addEventListener("focus",bs,{capture:!0});}catch{Kh();}}function Kh(){try{ge.oscillator?.stop();}catch{}try{ge.oscillator?.disconnect(),ge.gainNode?.disconnect();}catch{}try{ge.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",bs,{capture:true}),window.removeEventListener("focus",bs,{capture:true}),ge.oscillator=null,ge.gainNode=null,ge.audioCtx=null;}function IE(){const e=document.querySelector("canvas")||document.body||document.documentElement;ge.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},wE);}function PE(){ge.heartbeatInterval!==null&&(clearInterval(ge.heartbeatInterval),ge.heartbeatInterval=null);}function Hl(){TE(),kE(),EE(),IE();}function jl(){PE(),Kh(),_E(),AE();}let ua=false,it=false;function so(){return ve(Xh,yE)}function Ul(e){we(Xh,e);}const ko={init(){if(ua)return;const e=so();ua=true,e.enabled?(Hl(),it=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return ua},isRunning(){return it},isEnabled(){return so().enabled},enable(){const e=so();e.enabled=true,Ul(e),it||(Hl(),it=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=so();e.enabled=false,Ul(e),it&&(jl(),it=false,console.log("[MGAntiAfk] Disabled"));},toggle(){ko.isEnabled()?ko.disable():ko.enable();},getConfig(){return so()},updateConfig(e){const n={...so(),...e};Ul(n),n.enabled&&!it?(Hl(),it=true):!n.enabled&&it&&(jl(),it=false);},destroy(){it&&(jl(),it=false),ua=false,console.log("[MGAntiAfk] Destroyed");}},Yh=ke.PET_TEAM,ME={enabled:false,teams:[],activeTeamId:null},xu=3,of=50,Oe="";function We(){return ve(Yh,ME)}function bn(e){we(Yh,e);}function LE(e){const n={...We(),...e};return bn(n),n}function NE(){return We().enabled}function RE(e){LE({enabled:e});}function OE(){return crypto.randomUUID()}function Hc(){return Date.now()}function Jh(e=[]){const t=[...e];for(;t.length<xu;)t.push(Oe);return [t[0]||Oe,t[1]||Oe,t[2]||Oe]}function Qh(e,t){const n=We(),o=e.trim();return o?!n.teams.some(r=>r.name.trim()===o&&r.id!==t):false}function Zh(e,t){const n=We();if(!e.some(i=>i!==Oe))return  true;const r=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===r)}function eb(e){const n=to().get(),o=new Set(n.all.map(i=>i.id)),r=We();for(const i of r.teams)for(const a of i.petIds)a!==Oe&&o.add(a);for(const i of e)if(i!==Oe&&!o.has(i))return  false;return  true}function tb(e){const n=to().get(),o=new Map(n.all.map(i=>[i.id,i])),r=[];for(const i of e.petIds){if(i===Oe)continue;const a=o.get(i);a&&r.push(a);}return r}function $E(e){return e.petIds.every(t=>t!==Oe)}function FE(e){const t=[];for(let n=0;n<xu;n++)e.petIds[n]===Oe&&t.push(n);return t}function DE(e){return e.petIds.filter(t=>t!==Oe).length}function BE(e){return e.petIds.every(t=>t===Oe)}function GE(e,t){return e.petIds.includes(t)}function zE(e,t){return e.petIds.indexOf(t)}function HE(e,t=[]){const n=We();if(n.teams.length>=of)throw new Error(`Maximum number of teams (${of}) reached`);if(!Qh(e))throw new Error(`Team name "${e}" already exists`);const o=e.trim();if(!o)throw new Error("Team name cannot be empty");const r=Jh(t);if(!eb(r))throw new Error("One or more pet IDs do not exist");if(!Zh(r))throw new Error("A team with this exact composition already exists");const i={id:OE(),name:o,petIds:r,createdAt:Hc(),updatedAt:Hc()};return n.teams.push(i),bn(n),i}function nb(e,t){const n=We(),o=n.teams.findIndex(a=>a.id===e);if(o===-1)return null;const r=n.teams[o];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!Qh(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=Jh(t.petIds);if(!eb(a))throw new Error("One or more pet IDs do not exist");if(!Zh(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...r,...t,id:r.id,createdAt:r.createdAt,updatedAt:Hc()};return n.teams[o]=i,bn(n),i}function jE(e){const t=We(),n=t.teams.length;return t.teams=t.teams.filter(o=>o.id!==e),t.teams.length===n?false:(bn(t),true)}function UE(e){return We().teams.find(n=>n.id===e)??null}function WE(){return [...We().teams]}function VE(e){const t=We(),n=e.trim();return t.teams.find(o=>o.name.trim()===n)??null}function qE(e){const t=We(),n=new Map(t.teams.map(o=>[o.id,o]));if(e.length!==t.teams.length)return  false;for(const o of e)if(!n.has(o))return  false;return t.teams=e.map(o=>n.get(o)),bn(t),true}function XE(e,t){try{return nb(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function KE(){const n=to().get().byLocation.active.map(r=>r.id).sort(),o=We();for(const r of o.teams){const i=r.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return r.id}return null}function ob(){const e=KE(),t=We();return e!==t.activeTeamId&&(t.activeTeamId=e,bn(t)),e}function rb(e){const t=We();t.activeTeamId=e,bn(t);}function YE(e){return ob()===e}function JE(e){const t=to(),n=kt(),o=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=o.byLocation.active,a=e.petIds.filter(d=>d!==Oe).sort(),s=i.map(d=>d.id).sort();if(JSON.stringify(a)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const l=o.hutch,c=l.hasHutch?l.maxItems-l.currentItems:0;QE(e.petIds,c,o),rb(e.id),console.log("[PetTeam] Team activated successfully");}function QE(e,t,n){const o=n.byLocation.active;let r=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let i=0;i<xu;i++){const a=e[i],s=o[i]??null;if(console.log(`[PetTeam] Slot ${i}: current=${s?.id.slice(0,8)??"empty"}, target=${a.slice(0,8)||"empty"}, hutchSpace=${r}`),s?.id===a){console.log(`[PetTeam] Slot ${i}: Same pet, skipping`);continue}if(a===Oe&&s){const l=r>0;console.log(`[PetTeam] Slot ${i}: Removing pet, storeInHutch=${l}`),ZE(s.id,l),l&&r--;continue}if(!s&&a!==Oe){const c=n.all.find(d=>d.id===a)?.location==="hutch";console.log(`[PetTeam] Slot ${i}: Adding pet, fromHutch=${c}`),c&&r++,eI(a,n);continue}if(s&&a!==Oe){const c=n.all.find(u=>u.id===a)?.location==="hutch";c&&r++;const d=r>0;console.log(`[PetTeam] Slot ${i}: Swapping pets, fromHutch=${c}, storeInHutch=${d}`),tI(s.id,a,n,d),d&&r--;continue}}console.log(`[PetTeam] Swap complete, ${r} hutch spaces remaining`);}function ZE(e,t){rh(e),t&&Ud(e);}function eI(e,t){const n=t.all.find(o=>o.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&Wd(e),nh(e);}function tI(e,t,n,o){const r=n.all.find(i=>i.id===t);if(!r){console.warn(`[PetTeam] Pet ${t} not found`);return}r.location==="hutch"&&Wd(t),oh(e,t),o&&Ud(e);}function nI(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function oI(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(o=>o&&typeof o=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function rI(e){const t=Date.now(),n=e.slots||[],o=[typeof n[0]=="string"?n[0]:Oe,typeof n[1]=="string"?n[1]:Oe,typeof n[2]=="string"?n[2]:Oe];return {name:e.name?.trim()||"Imported Team",petIds:o,createdAt:t,updatedAt:t}}function iI(){const e={success:false,source:"none",imported:0,errors:[]};if(!nI())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=oI();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=We();n.teams=[],n.activeTeamId=null;const o=new Set;for(const r of t)try{const i=rI(r);let a=i.name;if(o.has(a)){let l=1;for(;o.has(`${a} (${l})`);)l++;a=`${a} (${l})`;}o.add(a);const s={id:crypto.randomUUID(),name:a,petIds:i.petIds,createdAt:i.createdAt,updatedAt:i.updatedAt};n.teams.push(s),e.imported++;}catch(i){const a=i instanceof Error?i.message:String(i);e.errors.push(`Failed to import "${r.name}": ${a}`);}return e.imported>0&&(bn(n),e.success=true,e.source="aries"),e}let pa=false;const pe={init(){if(pa)return;if(!We().enabled){console.log("[PetTeam] Feature disabled");return}pa=true,console.log("[PetTeam] Feature initialized");},destroy(){pa&&(pa=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:NE,setEnabled:RE,createTeam:HE,updateTeam:nb,deleteTeam:jE,renameTeam:XE,getTeam:UE,getAllTeams:WE,getTeamByName:VE,reorderTeams:qE,getPetsForTeam:tb,isTeamFull:$E,getEmptySlots:FE,getFilledSlotCount:DE,isTeamEmpty:BE,isPetInTeam:GE,getPetSlotIndex:zE,getActiveTeamId:ob,setActiveTeamId:rb,isActiveTeam:YE,activateTeam:JE,importFromAries:iI},aI=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],ib=ke.XP_TRACKER,sI={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},_o="XP Tracker",To="[XpTracker]";function Yo(){return ve(ib,sI)}function ab(e){we(ib,e);}function sb(e){const n={...Yo(),...e};return ab(n),n}function lb(){return Yo().enabled}function lI(e){sb({enabled:e});}function yu(e){return aI.includes(e)}function cI(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return !n||!yu(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function cb(e){return e.filter(yu)}function db(e){return e.some(yu)}function dI(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function ub(e,t,n,o=100){const r=cI(e);if(!r)return null;const i=dI(e),a=r.requiredWeather,s=a===null||n===a,l=t/o,c=l*l,d=r.baseProbability,u=r.bonusXp,p=d,f=Math.floor(u*c),g=p/100*60,m=s?Math.floor(g*f):0;return {abilityId:e,abilityName:r.name,tier:i,baseChancePerMinute:d,actualChancePerMinute:p,baseXpPerProc:u,actualXpPerProc:f,expectedProcsPerHour:g,expectedXpPerHour:m,requiredWeather:a,isActive:s}}function pb(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const o of e){const r=cb(o.abilities);for(const i of r){const a=ub(i,o.strength,t,o.maxStrength||100);a&&(n.boosters.push({petId:o.petId,petName:o.petName,stats:a}),a.isActive&&(n.totalBonusXpPerHour+=a.expectedXpPerHour,n.totalProcsPerHour+=a.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function fb(e,t,n,o=100){const r=cb(e);return r.length===0?null:ub(r[0],t,n,o)}function rf(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function uI(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function pI(e,t){return e.species.localeCompare(t.species)}function fI(e,t){return t.currentStrength-e.currentStrength}function gI(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function mI(e,t){return e.name.localeCompare(t.name)}function hI(e){switch(e){case "closestToMax":return rf;case "furthestFromMax":return uI;case "species":return pI;case "strength":return fI;case "location":return gI;case "name":return mI;default:return rf}}function gb(e,t){const n=hI(t);return [...e].sort(n)}function bI(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function xI(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function mb(e,t){let n=e;return n=bI(n,t.filterSpecies),n=xI(n,t.filterHasXpBoost),n=gb(n,t.sortBy),n}function ir(e){const t=pe.getTeam(e);if(!t)return null;const n=hb(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:Fe,bonusXpPerHour:0,totalXpPerHour:Fe,activeBoosterCount:0,totalProcsPerHour:0}};const o=fe.weather.get(),r=o.isActive?o.type:null,i=n.filter(d=>!d.isMature||db(d.abilities)).filter(d=>d.hunger>0).map(d=>({petId:d.id,petName:d.name??"",abilities:d.abilities,strength:d.currentStrength})),a=pb(i,r),s=[],l=yI(n,a.totalBonusXpPerHour);for(const d of n){const u=jc(d,r,a.totalBonusXpPerHour,l);s.push(u);}const c={baseXpPerHour:Fe,bonusXpPerHour:a.totalBonusXpPerHour,totalXpPerHour:Fe+a.totalBonusXpPerHour,activeBoosterCount:a.activeBoosterCount,totalProcsPerHour:a.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:c}}function hb(e){const t=fe.myPets.get(),n=[];for(const o of e.petIds){if(!o)continue;const r=t.all.find(i=>i.id===o);r&&n.push(r);}return n}function yI(e,t){let n=0;for(const o of e){const r=Ii(o.petSpecies,o.targetScale);if(Pi(o.petSpecies,o.xp,r)>=r)continue;const a=o.hunger>0?Fe+t:0,s=Xs(o.petSpecies,o.xp,r,a>0?a:Fe);n=Math.max(n,s);}return n}function jc(e,t,n,o){const r=Ii(e.petSpecies,e.targetScale),i=Pi(e.petSpecies,e.xp,r),a=i>=r,s=e.hunger<=0,c=s?0:(s?0:Fe)+n,d=fb(e.abilities,i,t),u=a?null:nu(e.petSpecies,e.xp,i,r,c>0?c:Fe),p=Xs(e.petSpecies,e.xp,r,c>0?c:Fe),f=u!==null?iu(e.petSpecies,e.hunger,u):null,g=oi(e.petSpecies,e.hunger,p),m=a&&d&&o>0?au(true,true,e.petSpecies,e.hunger,0,o):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:i,maxStrength:r,isMaxStrength:a,xpPerHour:c,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:d,supportingFeeds:m,mutations:e.mutations,targetScale:e.targetScale}}function af(e){const t=pe.getTeam(e);if(!t)return 0;const n=hb(t);if(n.length===0)return 0;const o=n.map(r=>{const i=Ii(r.petSpecies,r.targetScale);return Pi(r.petSpecies,r.xp,i)/i*100});return o.reduce((r,i)=>r+i,0)/o.length}function sf(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let Ho=false,Da=null,Zs=[],vu=null;function vI(e,t,n){const o=Ii(e.petSpecies,e.targetScale),r=Pi(e.petSpecies,e.xp,o),i=r>=o,a=e.hunger<=0,s=a?0:Fe,l=fb(e.abilities,r,t);l?.isActive&&l.expectedXpPerHour;const c=e.location==="active"&&!a?s+n:0,d=nu(e.petSpecies,e.xp,r,o,c>0?c:Fe),u=Xs(e.petSpecies,e.xp,o,c>0?c:Fe),p=iu(e.petSpecies,e.hunger,d),f=oi(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:a,currentStrength:r,maxStrength:o,isMaxStrength:i,hoursToNextStrength:d,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:c,xpBoostStats:l,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function bb(){const e=fe.myPets.get(),t=fe.weather.get(),n=t.isActive?t.type:null,r=e.byLocation.active.filter(l=>!l.isMature||db(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),i=pb(r,n);vu=i;const a=[];for(const l of e.all){const c=vI({id:l.id,petSpecies:l.petSpecies,name:l.name??"",xp:l.xp,hunger:l.hunger,targetScale:l.targetScale,abilities:l.abilities,mutations:l.mutations,location:l.location},n,i.totalBonusXpPerHour);a.push(c);}const s=Math.max(0,...a.map(l=>l.hoursToMaxStrength));for(const l of a)l.isMaxStrength&&l.xpBoostStats&&(l.feedsToMaxStrength=au(true,true,l.species,l.hunger,0,s));return a}function xb(){if(Ho)return;if(!Yo().enabled){console.log(`${To} ${_o} disabled`);return}console.log(`${To} Initializing ${_o}...`),J.isReady()&&(Zs=bb()),Ho=true,console.log(`${To} ${_o} initialized`);}function wu(){return Ho&&J.isReady()}function Su(){return wu()?Zs:[]}function wI(){return Su().filter(e=>e.location==="active")}function SI(){return vu}function Cu(){wu()&&(Zs=bb());}function CI(e){ku();const t=Yo(),n=e??t.updateIntervalMs;Da=setInterval(()=>{lb()&&Cu();},n);}function ku(){Da&&(clearInterval(Da),Da=null);}function yb(){Ho&&(ku(),Ho=false,Zs=[],vu=null,console.log(`${To} ${_o} destroyed`));}function kI(){const e=Yo();return mb(Su(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function _I(e){lI(e),e?(Ho=false,xb(),J.isReady()&&Cu(),console.log(`${To} ${_o} enabled`)):(yb(),console.log(`${To} ${_o} disabled`));}const Uc={init:xb,isReady:wu,destroy:yb,loadConfig:Yo,saveConfig:ab,updateConfig:sb,isEnabled:lb,setEnabled:_I,getAllPetsProgress:Su,getActivePetsProgress:wI,getCombinedBoostStats:SI,getFilteredPets:kI,refresh:Cu,startAutoUpdate:CI,stopAutoUpdate:ku,sortPets:gb,filterAndSortPets:mb},si={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},li={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(si),...Object.keys(li)];function _u(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in si){const r=si[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function Tu(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in li){const r=li[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function ci(e){let t=0,n=0;for(const o of e){const r=o.procRate*60;t+=r,n+=r*o.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Ao(e){return e.some(t=>t.abilities.some(n=>n in si))}function Eo(e){return e.some(t=>t.abilities.some(n=>n in li))}let zr=null;function vb(){const t=Xe().get().plant;if(!t)return;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n&&wt(n.species,n.targetScale,n.mutations||[]);}function TI(e){vb();}function AI(){zr&&wb(),vb(),zr=Xe().subscribePlantInfo(TI,{immediate:true});}function wb(){zr&&(zr(),zr=null);}const Wc="css-qnqsp4",Vc="css-v439q6";let Io=Ue(),qc=false,ar=false,Ba=null,Xc=null,Dn=null;const EI=`
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
`;function II(){if(qc)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=EI,document.head.appendChild(e),Io.add(()=>e.remove()),qc=true;}function PI(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const o=document.createElement("canvas");o.width=20,o.height=20,n.appendChild(o);const r=document.createElement("div");r.className="gemini-qol-cropPrice-text",r.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(r);try{const i=Q.toCanvas("ui","Coin");if(i&&o.parentElement){const a=o.getContext("2d");if(a){const s=Math.min(o.width/i.width,o.height/i.height),l=i.width*s,c=i.height*s,d=(o.width-l)/2,u=(o.height-c)/2;a.drawImage(i,d,u,l,c);}}}catch(i){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",i);}return t}function MI(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const o of n){const r=o.textContent?.trim();if(!r)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(r)&&t.push(r);}return t}function LI(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const o=n.textContent?.trim();if(!o)continue;const r=o.match(/^([\d.]+)\s*kg$/i);if(r)return parseFloat(r[1])}return 1}function NI(){const e=[],t=document.querySelectorAll(`.${Wc}`);for(const o of t)o.offsetParent&&(o.closest("button.chakra-button")||e.push({element:o}));const n=document.querySelectorAll(`.${Vc}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelectorAll(":scope > .McFlex > .McFlex");if(r.length>0){const i=r[r.length-1];i.querySelector("p.chakra-text")&&e.push({element:i});}}return e}function RI(){const t=Xe().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?wt(n.species,n.targetScale,n.mutations||[]):0}function OI(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(".gemini-qol-cropPrice-text");r&&(r.textContent=e>0?e.toLocaleString():"");}}function $I(){Dn!==null&&cancelAnimationFrame(Dn),Dn=requestAnimationFrame(()=>{Dn=null;const e=RI();if(e===Xc)return;Xc=e;const n=Xe().get().plant;!n||!(n.currentSlotIndex!==null&&n.slots[n.currentSlotIndex])||OI(e);});}function sr(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;const r=Xe().get().plant;let i=0,a=null;if(r&&r.currentSlotIndex!==null){const l=r.slots[r.currentSlotIndex];l&&(a=l.species,i=wt(l.species,l.targetScale,l.mutations||[]));}if(i===0){const l=t.textContent?.trim();if(l){a=l;const c=LI(n),d=MI(n);i=wt(l,c,d);}}const s=PI(i);n.appendChild(s),Io.add(()=>s.remove());}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function FI(){const e=NI();for(const n of e)sr(n);Ba=Xe().subscribePlantInfo(()=>{$I();});const t=new MutationObserver(n=>{for(const o of n)o.type==="childList"&&o.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.classList.contains(Wc)&&(r.closest("button.chakra-button")||sr({element:r})),r.querySelectorAll(`.${Wc}`).forEach(s=>{s.closest("button.chakra-button")||sr({element:s});}),r.classList.contains(Vc)&&!r.closest("button.chakra-button")){const s=r.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&!l.querySelector(".gemini-qol-cropPrice")&&sr({element:l});}}r.querySelectorAll(`.${Vc}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const c=l[l.length-1];c.querySelector("p.chakra-text")&&!c.querySelector(".gemini-qol-cropPrice")&&sr({element:c});}}});}});});t.observe(document.body,{childList:true,subtree:true}),oo(Io,t);}const DI={init(){ar||(ar=true,II(),FI());},destroy(){ar&&(ar=false,Dn!==null&&(cancelAnimationFrame(Dn),Dn=null),Ba&&(Ba(),Ba=null),Io.run(),Io.clear(),Io=Ue(),qc=false,Xc=null);},isEnabled(){return ar}},Sb=ke.CROP_VALUE_INDICATOR,BI={enabled:false};function Au(){return ve(Sb,BI)}function GI(e){we(Sb,e);}let di=false;function Cb(){di||!Au().enabled||(di=true,AI());}function kb(){di&&(wb(),di=false);}function zI(){return di}function HI(){return Au().enabled}function jI(e){const t=Au();t.enabled!==e&&(t.enabled=e,GI(t),e?Cb():kb());}const Ga={init:Cb,destroy:kb,isReady:zI,isEnabled:HI,setEnabled:jI,render:DI},ui="css-qnqsp4",Eu="css-1cdcuw7",Iu='[role="tooltip"]';let za=Ue(),lr=false,Ha=null,Kc=null,Bn=null;function UI(){const e=[],t=document.querySelectorAll(`.${ui}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const o=n.querySelector(`.${Eu}`);o&&e.push({element:n,weightElement:o});}return e}function WI(){const t=Xe().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?eu(n.species,n.targetScale):0}function VI(e,t){const n=document.querySelectorAll(`.${ui}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(`.${Eu}`);if(r){const i=r.querySelector("svg"),a=`${e}%`;r.textContent=a,i&&r.appendChild(i);}}xs(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function qI(){Bn!==null&&cancelAnimationFrame(Bn),Bn=requestAnimationFrame(()=>{Bn=null;const e=WI();if(e===Kc)return;Kc=e;const n=Xe().get().plant;if(!n)return;const o=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;o&&VI(e,o);});}function _b(e,t){const n=J.get("plants");if(!n)return "";const o=n[e];return o?.crop?.baseWeight?`${(o.crop.baseWeight*t).toFixed(2)} kg`:""}function xs(){const e=document.querySelectorAll(Iu),n=Xe().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=_b(o.species,o.targetScale);for(const i of e){if(!i.offsetParent)continue;const a=i.textContent?.trim();a&&a.startsWith("Size:")&&r&&(i.textContent=r);}}function Wl(){const e=UI();for(const t of e)if(t.weightElement)try{const o=Xe().get().plant;if(o&&o.currentSlotIndex!==null){const r=o.slots[o.currentSlotIndex];if(r){const i=eu(r.species,r.targetScale),a=t.weightElement.querySelector("svg");t.weightElement.textContent=`${i}%`,a&&t.weightElement.appendChild(a);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}xs();}function XI(){const e=document.querySelectorAll(`.${ui}`),n=Xe().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=_b(o.species,o.targetScale);for(const a of e){if(!a.offsetParent||a.closest("button.chakra-button"))continue;const s=a.querySelector(`.${Eu}`);if(s){const l=s.querySelector("svg");s.textContent=r,l&&s.appendChild(l);}}const i=document.querySelectorAll(Iu);for(const a of i){if(!a.offsetParent)continue;const s=a.textContent?.trim();s&&!s.includes("kg")&&(a.textContent=r);}console.log("[CropSizeIndicator.render] Restored crop weights");}function KI(){Wl(),Ha=Xe().subscribePlantInfo(()=>{qI();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.hasAttribute("role")&&o.getAttribute("role")==="tooltip"){const a=o.textContent?.trim();a&&a.startsWith("Size:")&&xs();}o.classList.contains(ui)&&(o.closest("button.chakra-button")||Wl()),o.querySelectorAll(`.${ui}`).length>0&&Wl(),o.querySelectorAll(Iu).forEach(a=>{const s=a.textContent?.trim();s&&s.startsWith("Size:")&&xs();});}});});e.observe(document.body,{childList:true,subtree:true}),oo(za,e),console.log("[CropSizeIndicator.render] Started observing crops");}const Pu={init(){if(lr){console.log("[CropSizeIndicator.render] Already initialized");return}lr=true,KI(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){lr&&(lr=false,XI(),Bn!==null&&(cancelAnimationFrame(Bn),Bn=null),Ha&&(Ha(),Ha=null),za.run(),za.clear(),za=Ue(),Kc=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return lr}},Tb=ke.CROP_SIZE_INDICATOR,YI={enabled:false};function Mu(){return ve(Tb,YI)}function JI(e){we(Tb,e);}let pi=false;function Ab(){if(pi){console.log("[CropSizeIndicator] Already initialized");return}if(!Mu().enabled){console.log("[CropSizeIndicator] Disabled");return}pi=true,console.log("[CropSizeIndicator] Initializing..."),Pu.init(),console.log("[CropSizeIndicator] Initialized successfully");}function Eb(){pi&&(console.log("[CropSizeIndicator] Destroying..."),Pu.destroy(),pi=false,console.log("[CropSizeIndicator] Destroyed"));}function QI(){return pi}function ZI(){return Mu().enabled}function eP(e){const t=Mu();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,JI(t),e?Ab():Eb(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const ja={init:Ab,destroy:Eb,isReady:QI,isEnabled:ZI,setEnabled:eP,render:Pu},tP={Normal:{letter:"N",color:"#A88A6B",bold:false},Wet:{letter:"W",color:"rgba(76, 204, 204, 1)",bold:false},Chilled:{letter:"C",color:"rgba(144, 184, 204, 1)",bold:false},Frozen:{letter:"F",color:"rgba(148, 160, 204, 1)",bold:false},Dawnlit:{letter:"D",color:"rgb(245, 155, 225)",bold:false},Ambershine:{letter:"A",color:"rgb(255, 180, 120)",bold:false},Gold:{letter:"G",color:"linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)",bold:true,isGradient:true},Rainbow:{letter:"R",color:"linear-gradient(110deg, #ff003c, #ff9a00, #f0ff00, #30ff00, #00fbff, #0018ff, #e100ff)",bold:true,isGradient:true},Dawncharged:{letter:"D",color:"rgb(200, 150, 255)",bold:true},Ambercharged:{letter:"A",color:"rgb(250, 140, 75)",bold:true},"Max Weight":{letter:"S",color:"#717171",bold:false}};function nP(e){const t=tP[e];if(!t){const o=document.createElement("span");return o.textContent=e.charAt(0).toUpperCase(),o.style.cssText="color: #888; font-size: 18px;",o}const n=document.createElement("span");return n.textContent=t.letter,n.title=e,t.isGradient?n.style.cssText=`
            background: ${t.color};
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 18px;
            display: inline-block;
            filter: drop-shadow(0px 0px 1px rgba(0,0,0,1)) drop-shadow(0px 1px 1px rgba(0,0,0,1));
        `:n.style.cssText=`
            color: ${t.color};
            font-weight: ${t.bold?"bold":"normal"};
            font-size: 18px;
        `,n}function Ib(e){const t=nP(e),n=t.textContent??e.charAt(0).toUpperCase(),o=t.getAttribute("style")??"";return {text:n,css:o}}const Yc="css-qnqsp4",Jc="css-v439q6",el="gemini-qol-missingVariants";let Po=Ue(),Qc=false,cr=false,Ua=null,Gn=null;const oP=`
  .${el} {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;function rP(){if(Qc)return;const e=document.createElement("style");e.id="gemini-qol-missingVariants-styles",e.textContent=oP,document.head.appendChild(e),Po.add(()=>e.remove()),Qc=true;}function lf(){return Be.getCropVariants()}function Pb(e){const t=Be.getMyJournal();if(!t)return lf();const o=t.produce?.[e]?.variantsLogged?.map(i=>i.variant)??[];return lf().filter(i=>!o.includes(i))}function iP(e){const t=J.get("plants")??{};return e in t?true:Js(e)?.type==="crop"}function aP(){const t=Xe().get().plant;if(!t)return null;let n=null;if(t.currentSlotIndex!==null){const r=t.slots[t.currentSlotIndex];r&&(n=r.species);}return n||(n=t.species),Js(n??"")?.id??n}function sP(e){const t=document.querySelectorAll(`.${el}`),n=Pb(e);for(const o of t){if(n.length===0){o.remove();continue}const r=Array.from(o.children).map(i=>i.title);if(JSON.stringify(r)!==JSON.stringify(n)){o.replaceChildren();for(const i of n){const a=Ib(i),s=document.createElement("span");s.textContent=a.text,s.title=i,s.style.cssText=a.css,o.appendChild(s);}}}}function lP(){Gn!==null&&cancelAnimationFrame(Gn),Gn=requestAnimationFrame(()=>{Gn=null;const e=aP();if(!e)return;const t=Mb();for(const n of t)co(n);sP(e);});}function cP(e){if(!iP(e))return null;const t=Pb(e);if(t.length===0)return null;const n=document.createElement("div");n.className=el;for(const o of t){const r=Ib(o),i=document.createElement("span");i.textContent=r.text,i.title=o,i.style.cssText=r.css,n.appendChild(i);}return n}function Mb(){const e=[],t=document.querySelectorAll(`.${Yc}`);for(const o of t)o.offsetParent&&(o.closest("button.chakra-button")||e.push({element:o}));const n=document.querySelectorAll(`.${Jc}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelectorAll(".McFlex");for(const i of r){const a=i.querySelector("p.chakra-text");if(a&&a.textContent&&!a.textContent.includes("%")){e.push({element:i});break}}}return e}function co(e){if(!e.element.querySelector(`.${el}`))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;let o=null;const i=Xe().get().plant;i&&(i.currentSlotIndex!==null&&i.slots[i.currentSlotIndex]?o=i.slots[i.currentSlotIndex].species:o=i.species);const a=t.textContent?.trim()??"",s=Js(a);if(s?.type==="crop"&&(o=s.id),!o)return;const l=cP(o);l&&(Ot(()=>{n.appendChild(l);}),Po.add(()=>l.remove()));}catch(t){console.warn("[MissingVariantsIndicator] Failed to inject:",t);}}function dP(){const e=Mb();for(const n of e)co(n);Ua=Xe().subscribePlantInfo(()=>{lP();});const t=new MutationObserver(n=>{for(const o of n)o.type==="childList"&&o.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.classList.contains(Yc)&&(r.closest("button.chakra-button")||co({element:r})),r.querySelectorAll(`.${Yc}`).forEach(s=>{s.closest("button.chakra-button")||co({element:s});}),r.classList.contains(Jc)&&!r.closest("button.chakra-button")){const s=r.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&co({element:l});}}r.querySelectorAll(`.${Jc}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const c=l[l.length-1];c.querySelector("p.chakra-text")&&co({element:c});}}});}});});t.observe(document.body,{childList:true,subtree:true}),oo(Po,t);}async function uP(){for(let n=1;n<=5;n++){if(!Be.isReady())try{Be.init();}catch(r){console.warn("[MissingVariantsIndicator] Failed to init journal checker:",r);}if(Be.getMyJournal())return console.log("[MissingVariantsIndicator] Journal data available"),true;n<5&&await new Promise(r=>setTimeout(r,1e3));}return console.warn("[MissingVariantsIndicator] Journal data not available, continuing anyway"),false}const Lu={init(){cr||(cr=true,rP(),dP(),uP().catch(e=>{console.warn("[MissingVariantsIndicator] Error waiting for journal data:",e);}));},destroy(){cr&&(cr=false,Ua&&(Ua(),Ua=null),Gn!==null&&(cancelAnimationFrame(Gn),Gn=null),Po.run(),Po.clear(),Po=Ue(),Qc=false);},isEnabled(){return cr}},Lb=ke.MISSING_VARIANTS_INDICATOR,pP={enabled:false};function Nu(){return ve(Lb,pP)}function fP(e){we(Lb,e);}let fi=false;function Nb(){fi||!Nu().enabled||(fi=true,Lu.init(),console.log("✅ [MissingVariantsIndicator] Initialized"));}function Rb(){fi&&(Lu.destroy(),fi=false,console.log("🛑 [MissingVariantsIndicator] Destroyed"));}function gP(){return fi}function mP(){return Nu().enabled}function hP(e){const t=Nu();t.enabled!==e&&(t.enabled=e,fP(t),e?Nb():Rb());}const Vl={init:Nb,destroy:Rb,isReady:gP,isEnabled:mP,setEnabled:hP,render:Lu},Ob=ke.SHOP_NOTIFIER,$b={seed:[],tool:[],egg:[],decor:[]},bP={enabled:false,trackedItems:$b},xP=["seed","tool","egg","decor"];function Fb(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function Oi(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function Jo(){const e=ve(Ob,bP);return {enabled:e?.enabled??false,trackedItems:Fb(e?.trackedItems)}}function tl(e){we(Ob,{enabled:e.enabled,trackedItems:Oi(e.trackedItems)});}function yP(e){const n={...Jo(),...e};return e.trackedItems&&(n.trackedItems=Fb(e.trackedItems)),tl(n),n}function Ru(){return Jo().enabled}function vP(e){yP({enabled:e});}function Db(){return Oi(Jo().trackedItems)}function Bb(){const e=Db(),t=[];for(const n of xP)for(const o of e[n])t.push({shopType:n,itemId:o});return t}function wP(e,t){const n=Jo(),o=Oi(n.trackedItems),r=o[e];if(r.includes(t))return;r.push(t),tl({...n,trackedItems:o});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(i);}function Gb(e,t){const n=Jo(),o=Oi(n.trackedItems),r=o[e],i=r.filter(s=>s!==t);if(i.length===r.length)return;o[e]=i,tl({...n,trackedItems:o});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(a);}function SP(){const e=Jo();tl({...e,trackedItems:Oi($b)});}let ys=false;const Zc=[];function CP(e,t){const n=Db()[e];if(!n.length)return [];const o=new Set(n);return t.items.filter(r=>o.has(r.id)&&r.isAvailable).map(r=>({itemId:r.id,remaining:r.remaining}))}function fa(e,t){const n=CP(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const o=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(o);}function kP(){if(ys)return;ys=true;const e=no();Zc.push(e.subscribeSeedRestock(t=>fa("seed",t)),e.subscribeToolRestock(t=>fa("tool",t)),e.subscribeEggRestock(t=>fa("egg",t)),e.subscribeDecorRestock(t=>fa("decor",t)));}function _P(){if(ys){ys=false;for(const e of Zc)e();Zc.length=0;}}const zb={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function TP(e,t,n){const o=n.find(i=>typeof i=="object"&&i!==null&&"toolId"in i&&i.toolId===e);return o?(o.quantity??0)>=t:false}function AP(e,t,n){const o=n.find(c=>typeof c=="object"&&c!==null&&"decorId"in c&&c.decorId===e),r=o?o.quantity??0:0,s=qo().get().decors.all.filter(c=>typeof c=="object"&&c!==null&&"decorId"in c&&c.decorId===e).length;return r+s>=t}function Hb(e,t,n,o){return t==="tool"?TP(e,n,o):t==="decor"?AP(e,n,o):false}function cf(e,t){const n=zb[e];if(!n||n.shopType!==t)return  false;const r=kt().get();return Hb(e,t,n.maxQuantity,r.items)}function df(){const t=kt().get(),n=Bb();for(const o of n){const r=zb[o.itemId];r&&r.shopType===o.shopType&&Hb(o.itemId,o.shopType,r.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${o.itemId} (max quantity reached)`),Gb(o.shopType,o.itemId));}}let vs=false,Wa=null;function EP(){if(vs)return;vs=true,Wa=kt().subscribeStable(()=>{df();}),df();}function IP(){vs&&(vs=false,Wa&&(Wa(),Wa=null));}let gi=false;function jb(){if(gi){console.log("[ShopNotifier] Already initialized");return}if(!Ru()){console.log("[ShopNotifier] Disabled");return}gi=true,kP(),EP(),console.log("[ShopNotifier] Initialized");}function Ub(){gi&&(_P(),IP(),gi=false,console.log("[ShopNotifier] Destroyed"));}function PP(){return gi}function MP(){return Ru()}function LP(e){if(Ru()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}vP(e),e?jb():Ub(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const $t={init:jb,destroy:Ub,isReady:PP,isEnabled:MP,setEnabled:LP,addTrackedItem:wP,removeTrackedItem:Gb,getTrackedItems:Bb,resetTrackedItems:SP},Wb=ke.WEATHER_NOTIFIER,NP={enabled:false,trackedWeathers:[]};function Vb(e){return Array.isArray(e)?[...e]:[]}function nl(e){return [...e]}function $i(){const e=ve(Wb,NP);return {enabled:e?.enabled??false,trackedWeathers:Vb(e?.trackedWeathers)}}function Ou(e){we(Wb,{enabled:e.enabled,trackedWeathers:nl(e.trackedWeathers)});}function RP(e){const n={...$i(),...e};return e.trackedWeathers&&(n.trackedWeathers=Vb(e.trackedWeathers)),Ou(n),n}function qb(){return $i().enabled}function OP(e){RP({enabled:e});}function ol(){return nl($i().trackedWeathers)}function $P(e){return ol().includes(e)}function FP(e){const t=$i(),n=nl(t.trackedWeathers);if(n.includes(e))return;n.push(e);const o=!t.enabled&&n.length>0,r={trackedWeathers:n,enabled:o?true:t.enabled};Ou(r);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:o}});window.dispatchEvent(i);const a=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(a);}function DP(e){const t=$i(),n=nl(t.trackedWeathers),o=n.filter(s=>s!==e);if(o.length===n.length)return;const r=t.enabled&&o.length===0,i={trackedWeathers:o,enabled:r?false:t.enabled};Ou(i);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:r}});window.dispatchEvent(a);}let Hr=null,Va="Sunny",zt=false,jr=null,ws="";function Xb(e){return `${e.soundId}:${e.volume}:${e.mode}`}function Ss(e){const t=de.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:Le.CustomSounds.getNotificationConfig("weather")}function BP(e){if(zt)return;const t=Le.CustomSounds.getById(e.soundId);if(t){jr=t.source,zt=true,ws=Xb(e);try{Le.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{zt=false,jr=null,ws="";}}}function qa(){if(zt){try{const e=Le.getCustomHandle();(!jr||e&&e.url===jr)&&Le.CustomSounds.stop();}catch{}zt=false,jr=null,ws="";}}function mi(e,t){const n=t??Ss(e);if(n.mode!=="loop"){zt&&qa();return}if(!ol().includes(e)){zt&&qa();return}const i=Xb(n);zt&&i!==ws&&qa(),zt||BP(n);}function Kb(e){const{weatherId:t}=e.detail||{};if(!t)return;const r=Li().get().id,i=Ss(t);if(r===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),i.mode==="one-shot"&&Qb(i),mi(r,i);const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function Yb(){const t=Li().get().id;mi(t);}function Jb(e){if(e.detail?.entityType!=="weather")return;const o=Li().get().id;mi(o);}function GP(){if(Hr){console.log("[WeatherNotifier] Already tracking");return}const e=Li(),t=e.get();Va=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",Va),window.addEventListener("gemini:weather-tracked-check",Kb),window.addEventListener("gemini:tracked-weathers-changed",Yb),window.addEventListener(mn.CUSTOM_SOUND_CHANGE,Jb);const n=Ss(t.id);mi(t.id,n),Hr=e.subscribeStable(o=>{const r=o.current.id,i=o.previous.id,a=Ss(r);if(console.log("[WeatherNotifier] Weather changed:",{previous:i,current:r}),mi(r,a),r!==i&&ol().includes(r)){console.log("[WeatherNotifier] Tracked weather detected:",r),a.mode==="one-shot"&&Qb(a);const l=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:r}});window.dispatchEvent(l);}Va=r;}),console.log("[WeatherNotifier] Tracking initialized");}function zP(){window.removeEventListener("gemini:weather-tracked-check",Kb),window.removeEventListener("gemini:tracked-weathers-changed",Yb),window.removeEventListener(mn.CUSTOM_SOUND_CHANGE,Jb),Hr&&(Hr(),Hr=null,Va="Sunny",qa(),console.log("[WeatherNotifier] Tracking stopped"));}function Qb(e){try{Le.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let hi=false;function Zb(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),tx(),ex());}function ex(){if(hi){console.log("[WeatherNotifier] Already initialized");return}if(hi=true,window.addEventListener("gemini:tracked-weathers-changed",Zb),!qb()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),GP(),console.log("[WeatherNotifier] Initialized");}function tx(){hi&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",Zb),zP(),hi=false,console.log("[WeatherNotifier] Destroyed"));}function HP(){return hi}const jo={init:ex,destroy:tx,isReady:HP,isEnabled:qb,setEnabled:OP,getTrackedWeathers:ol,addTrackedWeather:FP,removeTrackedWeather:DP,isWeatherTracked:$P},jP={enabled:false,threshold:5};function rl(){return ve(ke.PET_HUNGER_NOTIFIER,jP)}function nx(e){we(ke.PET_HUNGER_NOTIFIER,e);}function ox(){return rl().enabled}function UP(e){const t=rl();t.enabled=e,nx(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function rx(){return rl().threshold}function WP(e){const t=rl();t.threshold=e,nx(t);}let Ur=null;const Xa=new Set;let gn=false,Wr=null;function VP(e){if(gn)return;const t=Le.CustomSounds.getById(e.soundId);if(t){Wr=t.source,gn=true;try{Le.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{gn=false,Wr=null;}}}function ed(){if(gn){try{const e=Le.getCustomHandle();(!Wr||e&&e.url===Wr)&&Le.CustomSounds.stop();}catch{}gn=false,Wr=null;}}function qP(e,t){if(t.mode!=="loop"){gn&&ed();return}e?gn||VP(t):gn&&ed();}function XP(){if(Ur){console.log("[PetHungerNotifier] Already tracking");return}const e=to(),t=rx();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),Ur=e.subscribe(n=>{const o=n.byLocation.active,r=Le.CustomSounds.getNotificationConfig("pet"),i=r.mode==="loop";let a=false;for(const s of o)if(s.hungerPercent<t){if(a=true,!Xa.has(s.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:s.name||s.petSpecies,species:s.petSpecies,hungerPercent:s.hungerPercent.toFixed(2)+"%"}),i||YP(r);const l=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:s}});window.dispatchEvent(l),Xa.add(s.id);}}else Xa.delete(s.id);qP(a,r);}),console.log("[PetHungerNotifier] Tracking initialized");}function KP(){Ur&&(Ur(),Ur=null,Xa.clear(),ed(),console.log("[PetHungerNotifier] Tracking stopped"));}function YP(e){try{Le.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let bi=false;function ix(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),sx(),ax());}function ax(){if(bi){console.log("[PetHungerNotifier] Already initialized");return}if(bi=true,window.addEventListener("gemini:pet-hunger-config-changed",ix),!ox()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),XP(),console.log("[PetHungerNotifier] Initialized");}function sx(){bi&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",ix),KP(),bi=false,console.log("[PetHungerNotifier] Destroyed"));}function JP(){return bi}const xi={init:ax,destroy:sx,isReady:JP,isEnabled:ox,setEnabled:UP,getThreshold:rx,setThreshold:WP},QP={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},lx=ke.ARIES_API;function $u(){return ve(lx,QP)}function ZP(e){we(lx,e);}function e2(e){const n={...$u(),...e};return ZP(n),n}let Cs=null,ks=null;function uf(e){Cs=e;}function pf(e){ks=e;}function t2(){return Cs?[...Cs]:[]}function n2(){return ks?[...ks]:[]}function ff(){Cs=null,ks=null;}function cx(e,t){const n=$u(),o=new URL(e,n.apiBaseUrl);if(t)for(const[r,i]of Object.entries(t))i!==void 0&&o.searchParams.set(r,String(i));return o.toString()}function il(e,t){return new Promise(n=>{const o=cx(e,t);GM_xmlhttpRequest({method:"GET",url:o,headers:{},onload:r=>{if(r.status>=200&&r.status<300)try{const i=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:i});}catch(i){console.error("[AriesAPI] GET parse error:",i,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] GET error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] GET request failed:",r),n({status:0,data:null});}});})}function al(e,t){return new Promise(n=>{const o=cx(e);GM_xmlhttpRequest({method:"POST",url:o,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:r=>{if(r.status>=200&&r.status<300)try{const i=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:i});}catch(i){console.error("[AriesAPI] POST parse error:",i,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] POST error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] POST request failed:",r),n({status:0,data:null});}});})}async function Fu(e=50){const{data:t}=await il("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(o=>({name:o.name,avatarUrl:o.avatar_url??null})):void 0}))}async function o2(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,i=n.toLowerCase(),a=await Fu(r),s=[];for(const l of a){if(!l.userSlots||l.userSlots.length===0)continue;const c=l.userSlots.filter(d=>d.name?d.name.toLowerCase().includes(i):false);c.length>0&&s.push({room:l,matchedSlots:c});}return s}async function r2(e){if(!e)return null;const{status:t,data:n}=await il("get-player-view",{playerId:e});return t===404?null:n}async function sl(e,t){const n=Array.from(new Set((e??[]).map(a=>String(a).trim()).filter(a=>a.length>=3)));if(n.length===0)return [];const o={playerIds:n};t?.sections&&(o.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:r,data:i}=await al("get-players-view",o);return r!==200||!Array.isArray(i)?[]:i}async function i2(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,i=n.toLowerCase(),a=await Fu(r),s=new Map;for(const l of a)if(!(!l.userSlots||l.userSlots.length===0))for(const c of l.userSlots){if(!c.name||!c.name.toLowerCase().includes(i))continue;const u=`${l.id}::${c.name}`;s.has(u)||s.set(u,{playerName:c.name,avatarUrl:c.avatarUrl,roomId:l.id,roomPlayersCount:l.playersCount});}return Array.from(s.values())}async function dx(e){if(!e)return [];const{status:t,data:n}=await il("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function a2(e){const t=await dx(e);if(t.length===0)return uf([]),[];const n=await sl(t,{sections:["profile","room"]});return uf(n),[...n]}async function Du(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await il("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function s2(e){const{incoming:t}=await Du(e),n=t.map(r=>r.fromPlayerId);if(n.length===0)return pf([]),[];const o=await sl(n,{sections:["profile"]});return pf(o),[...o]}async function l2(e){const{outgoing:t}=await Du(e),n=t.map(o=>o.toPlayerId);return n.length===0?[]:sl(n,{sections:["profile"]})}async function c2(e,t){if(!e||!t||e===t)return  false;const{status:n}=await al("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function d2(e){const{playerId:t,otherPlayerId:n,action:o}=e;if(!t||!n||t===n)return  false;const{status:r}=await al("friend-respond",{playerId:t,otherPlayerId:n,action:o});return r===204}async function u2(e,t){if(!e||!t||e===t)return  false;const{status:n}=await al("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let dr=false;const _s={init(){dr||(dr=true,console.log("[AriesAPI] Initialized"));},destroy(){dr&&(dr=false,ff(),console.log("[AriesAPI] Destroyed"));},isReady(){return dr},getConfig(){return $u()},updateConfig(e){return e2(e)},fetchRooms:Fu,searchRoomsByPlayerName:o2,fetchPlayerView:r2,fetchPlayersView:sl,searchPlayersByName:i2,fetchFriendsIds:dx,fetchFriendsWithViews:a2,fetchFriendRequests:Du,fetchIncomingRequestsWithViews:s2,fetchOutgoingRequestsWithViews:l2,sendFriendRequest:c2,respondFriendRequest:d2,removeFriend:u2,getCachedFriends:t2,getCachedIncomingRequests:n2,clearCache:ff},ql={enabled:true,manualLocks:[],globalCriteria:{lockByScale:{enabled:false,minPercentage:50},lockedMutations:[]},speciesOverrides:{}};function rt(){const e=ve(ut.FEATURE.HARVEST_LOCKER,ql);return {...ql,...e,globalCriteria:{...ql.globalCriteria,...e.globalCriteria},speciesOverrides:e.speciesOverrides||{},manualLocks:e.manualLocks||[]}}function Yt(e){we(ut.FEATURE.HARVEST_LOCKER,e);}const un=new Set;let It=null;const Ts=[];function p2(e){if(Ts.length>0){console.warn("[HarvestLocker] Already started");return}It=e;const t=qo().subscribeStable(n=>{if(!n){un.clear();return}px(n);});Ts.push(t);}function f2(){Ts.forEach(e=>e()),Ts.length=0,un.clear(),It=null,console.log("[HarvestLocker] Stopped");}function xn(e){It=e;const t=qo().get();t&&px(t);}function ux(e,t){const n=`${e}-${t}`;return un.has(n)}function g2(){return Array.from(un)}function px(e){if(It){if(un.clear(),It.manualLocks.forEach(t=>un.add(t)),!b2(e)){console.warn("[HarvestLocker] Invalid garden structure");return}e.plants.all.forEach(t=>{t.slots.forEach((n,o)=>{const r=`${t.tileIndex}-${o}`,i=m2(n.species);if(i.lockByScale?.enabled&&h2(n)>=i.lockByScale.minPercentage){un.add(r);return}i.lockedMutations&&i.lockedMutations.length>0&&n.mutations.some(s=>i.lockedMutations.includes(s))&&un.add(r);});});}}function m2(e){return It?It.speciesOverrides[e]?It.speciesOverrides[e]:{lockByScale:It.globalCriteria.lockByScale,lockedMutations:It.globalCriteria.lockedMutations}:{lockByScale:{enabled:false,minPercentage:50},lockedMutations:[]}}function h2(e){const n=J.get("plants")?.[e.species];if(!n?.crop)return 0;const{baseTileScale:o,maxScale:r}=n.crop,i=r-o;return i===0?100:(e.targetScale-o)/i*100}function b2(e){return typeof e=="object"&&e!==null&&"plants"in e&&typeof e.plants=="object"&&e.plants!==null&&"all"in e.plants&&Array.isArray(e.plants.all)}const fx=[];function x2(){return fx.slice()}function y2(e){fx.push(e);}function gx(e){try{return JSON.parse(e)}catch{return}}function gf(e){if(typeof e=="string"){const t=gx(e);return t!==void 0?t:e}return e}function mx(e){if(e!=null){if(typeof e=="string"){const t=gx(e);return t!==void 0?mx(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function v2(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function le(e,t,n){const o=typeof t=="boolean"?t:true,r=typeof t=="function"?t:n,i=(a,s)=>{if(mx(a)!==e)return;const c=r(a,s);return c&&typeof c=="object"&&"kind"in c?c:typeof c=="boolean"?c?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return y2(i),i}const ur=new WeakSet,mf=new WeakMap;function w2(e){const t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:x2();if(!o.length)return ()=>{};const r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const m of o){const y=m(g,r(f));if(y){if(y.kind==="drop")return {kind:"drop"};y.kind==="replace"&&(g=y.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,l=null;const c=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(ur.has(f))return  true;const g=f.bind(p);function m(...y){const x=y.length===1?y[0]:y,S=gf(x),w=i(S,v2(t));if(w?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(w?.kind==="replace"){const T=w.message;return y.length>1&&Array.isArray(T)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",T),g(...T)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",T),g(T))}return g(...y)}ur.add(m),mf.set(m,f);try{p.sendMessage=m,ur.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||ur.has(f))return;function g(m){const y=gf(m),x=i(y,this);if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",y);return}if(x?.kind==="replace"){const S=x.message,w=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",y,"=>",S),f.call(this,w)}return f.call(this,m)}ur.add(g),mf.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!c()&&u>0){const p=Date.now();l=setInterval(()=>{if(c()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(l){try{clearInterval(l);}catch{}l=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();le(q.HarvestCrop,(e,t)=>{if(!rt().enabled)return  true;const o=e,r=o.slot!==void 0?String(o.slot):void 0,i=o.slotsIndex;return r!==void 0&&typeof i=="number"&&ux(r,i)?(console.log(`[HarvestLocker] Blocked harvest for slot ${r}-${i}`),false):true});let Uo=false;function hx(){if(Uo){console.warn("[HarvestLocker] Already initialized");return}const e=rt();if(!e.enabled){console.log("[HarvestLocker] Disabled");return}Uo=true,p2(e),console.log("[HarvestLocker] Initialized");}function bx(){Uo&&(f2(),Uo=false,console.log("[HarvestLocker] Destroyed"));}function S2(){return rt().enabled}function C2(e){const t=rt();t.enabled=e,Yt(t),e&&!Uo?hx():!e&&Uo&&bx();}function k2(e,t){return ux(e,t)}function _2(){return g2()}function T2(e,t){const n=rt(),o=`${e}-${t}`;n.manualLocks.includes(o)||(n.manualLocks.push(o),Yt(n),xn(n));}function A2(e,t){const n=rt(),o=`${e}-${t}`;n.manualLocks=n.manualLocks.filter(r=>r!==o),Yt(n),xn(n);}function E2(){const e=rt();e.manualLocks=[],Yt(e),xn(e);}function I2(e,t){const n=rt();n.globalCriteria.lockByScale={enabled:e,minPercentage:t},Yt(n),xn(n);}function P2(e){const t=rt();t.globalCriteria.lockedMutations=e,Yt(t),xn(t);}function M2(e,t,n){const o=rt();o.speciesOverrides[e]||(o.speciesOverrides[e]={}),o.speciesOverrides[e].lockByScale={enabled:t,minPercentage:n},Yt(o),xn(o);}function L2(e,t){const n=rt();n.speciesOverrides[e]||(n.speciesOverrides[e]={}),n.speciesOverrides[e].lockedMutations=t,Yt(n),xn(n);}function N2(e){const t=rt();delete t.speciesOverrides[e],Yt(t),xn(t);}function R2(){return rt()}const td={init:hx,destroy:bx,isEnabled:S2,setEnabled:C2,isLocked:k2,getAllLockedSlots:_2,lockSlot:T2,unlockSlot:A2,clearManualLocks:E2,setGlobalScaleLock:I2,setGlobalMutationLock:P2,setSpeciesScaleLock:M2,setSpeciesMutationLock:L2,clearSpeciesOverride:N2,getConfig:R2};class xx{constructor(){H(this,"stats");H(this,"STORAGE_KEY",ke.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return ve(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){we(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats();}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats();}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(const r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Mo=null;function O2(){return Mo||(Mo=new xx),Mo}function $2(){Mo&&(Mo.endSession(),Mo=null);}function yx(e){const t=Vs(e.xp),n=_i(e.petSpecies,e.targetScale),o=Ti(e.petSpecies,e.xp,n),r=qs(e.petSpecies,t),i=ch(e.petSpecies),a=i_(o,n,i),s=dh(o,n);return {current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:i,hoursToMax:a}}function vx(e){return {...e,strength:yx(e)}}function wx(e){return e.map(vx)}function F2(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=wx(e),n=t.reduce((l,c)=>l+c.strength.current,0),o=t.reduce((l,c)=>l+c.strength.max,0),r=t.filter(l=>l.strength.isMature).length,i=t.length-r,a=t.reduce((l,c)=>c.strength.max>(l?.strength.max||0)?c:l,t[0]),s=t.reduce((l,c)=>c.strength.max<(l?.strength.max||1/0)?c:l,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:i,strongestPet:a,weakestPet:s}}const D2=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:yx,enrichPetWithStrength:vx,enrichPetsWithStrength:wx,getPetStrengthStats:F2},Symbol.toStringTag,{value:"Module"}));class Sx{constructor(){H(this,"logs",[]);H(this,"maxLogs",1e3);H(this,"unsubscribe",null);H(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=fe.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));const{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,o=this.logs.filter(i=>i.timestamp>=n),r=new Map;for(const i of o){r.has(i.abilityId)||r.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=r.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of r.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const o=Date.now()-n,r=this.logs.filter(a=>a.petId===t&&a.timestamp>=o),i=new Map;for(const a of r){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:r.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,i)=>i.count-r.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let zn=null;function B2(){return zn||(zn=new Sx,zn.init()),zn}function G2(){zn&&(zn.destroy(),zn=null);}const z2={StatsTracker:xx,getStatsTracker:O2,destroyStatsTracker:$2},H2={AbilityLogger:Sx,getAbilityLogger:B2,destroyAbilityLogger:G2,...D2},xt=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],j2={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function lo(e){return e?j2[e]??0:0}class U2 extends Xt{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});H(this,"allPlants",[]);H(this,"allPets",[]);H(this,"sectionElement",null);}async build(n){await LT();const o=n.getRootNode();Ae(o,xh,"auto-favorite-settings-styles");const r=this.createGrid("12px");r.id="auto-favorite-settings",this.sectionElement=r,n.appendChild(r),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await J.waitForAny(3e3).catch(()=>{}),await Promise.all([J.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),J.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=J.get("plants")||{},o=J.get("pets")||{};this.allPlants=Object.keys(n).sort((r,i)=>{const a=n[r]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,l=lo(a)-lo(s);return l!==0?l:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(o).sort((r,i)=>{const a=o[r]?.rarity||null,s=o[i]?.rarity||null,l=lo(a)-lo(s);return l!==0?l:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(Q.isReady())return;const n=1e4,o=100;let r=0;return new Promise(i=>{const a=()=>{Q.isReady()||r>=n?i():(r+=o,setTimeout(a,o));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=h("div",{className:"kv"}),o=gd({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),r=hn({checked:ht().get().enabled,onChange:async i=>{const a=ht(),s=a.get();await a.set({...s,enabled:i}),await this.saveConfig();}});return n.append(o.root,r.root),Ee({title:"Auto-Favorite",padding:"lg"},n,h("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=h("div",{className:"u-col"}),o=h("div",{className:"mut-row"});o.appendChild(this.createMutationButton(xt[0])),o.appendChild(this.createMutationButton(xt[1])),n.appendChild(o);const r=h("div",{className:"mut-row"});r.appendChild(this.createMutationButton(xt[2])),r.appendChild(this.createMutationButton(xt[3])),r.appendChild(this.createMutationButton(xt[4])),n.appendChild(r);const i=h("div",{className:"mut-row"});i.appendChild(this.createMutationButton(xt[5])),i.appendChild(this.createMutationButton(xt[6])),n.appendChild(i);const a=h("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(xt[7])),a.appendChild(this.createMutationButton(xt[8])),n.appendChild(a),Ee({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,h("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${ht().get().favoriteMutations.length} / ${xt.length} active`))}createMutationButton(n){let o=ht().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];o&&i.push("active");const a=h("div",{className:i.join(" ")}),s=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Q.isReady()){const d=Q.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});d.style.width="28px",d.style.height="28px",d.style.objectFit="contain",s.appendChild(d);}}catch{}const l=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),c=h("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},l);if(a.append(s,c),n.id==="Rainbow"||n.id==="Gold"){const d=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Q.isReady()){const u=Q.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",d.appendChild(u);}}catch{}a.append(d);}else {const d=h("div",{style:"width: 28px; flex-shrink: 0;"});a.append(d);}return a.addEventListener("click",async d=>{d.stopPropagation();const u=ht(),p=u.get();if(o){const g=p.favoriteMutations.filter(m=>m!==n.id);await u.set({...p,favoriteMutations:g}),o=false,a.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),o=true,a.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${ht().get().favoriteMutations.length} / ${xt.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:ht().get().favoriteProduceList,onUpdate:async n=>{const o=ht(),r=o.get();await o.set({...r,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:ht().get().favoritePetsList,onUpdate:async n=>{const o=ht(),r=o.get();await o.set({...r,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:o,items:r,category:i,selected:a,onUpdate:s}=n;let l=new Set(a),c=r;const d=h("div",{style:"margin-bottom: 8px;"}),u=Is({placeholder:`Search ${o.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:b=>{const v=b.trim().toLowerCase();v?c=r.filter(_=>_.toLowerCase().includes(v)):c=r,w.setData(m());}});d.appendChild(u.root);const p=h("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Me({label:"Select All",variant:"default",size:"sm",onClick:()=>{const b=m().map(v=>v.id);w.setSelection(b);}}),g=Me({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{w.clearSelection();}});p.append(f,g);const m=()=>c.map(b=>({id:b,name:b,rarity:this.getItemRarity(b,i),selected:l.has(b)})),y=b=>{if(!b){const _=h("span",{style:"opacity:0.5;"});return _.textContent="—",_}return Xo({variant:"rarity",rarity:b,size:"sm"}).root},x=b=>{const v=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(Q.isReady()){let _=i,C=b;i==="plant"&&(["Bamboo","Cactus"].includes(b)&&(_="tallplant"),b==="DawnCelestial"&&(C="DawnCelestialCrop"),b==="MoonCelestial"&&(C="MoonCelestialCrop"),b==="OrangeTulip"&&(C="Tulip"));const I=Q.toCanvas(_,C,{scale:.5});I.style.width="28px",I.style.height="28px",I.style.objectFit="contain",v.appendChild(I);}}catch{}return v},w=vi({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(b,v)=>b.name.localeCompare(v.name,void 0,{numeric:true,sensitivity:"base"}),render:b=>{const v=h("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),_=x(b.id),C=h("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},b.name);return v.append(_,C),v}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(b,v)=>lo(b.rarity)-lo(v.rarity),render:b=>y(b.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(l),getRowId:b=>b.id,onSelectionChange:b=>{l.clear(),b.forEach(v=>l.add(v)),s(Array.from(l)),k();}}),T=h("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),k=()=>{T.textContent=`${l.size} / ${r.length} selected`;};return k(),Ee({title:`${o} (${l.size}/${r.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},d,p,w.root,T)}getItemRarity(n,o){try{if(o==="pet")return (J.get("pets")||{})[n]?.rarity||null;if(o==="plant"){const r=J.get("plants")||{},i=r[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(r))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=ht().get();try{const{updateSimpleConfig:o}=Ch;await o({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(o){console.error("[AutoFavoriteSettings] Failed to update feature config:",o);}}}function W2(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function V2(e,t){const n=e;let o=e;const r=Es({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==o&&(o=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==o&&(o=a,t?.(a));}});return r.root.className="team-list-item__name-input",r.input.addEventListener("blur",()=>{const i=r.getValue().trim()||n;i!==o&&(o=i,t?.(i));}),r.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),r.input.blur());}),r.root}function Cx(e){const t=h("div",{className:"team-list-item"}),n=e.customIndicator??h("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),o=e.isNameEditable?V2(e.team.name,e.onNameChange):h("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),r=h("div",{className:"team-list-item__sprites"});function i(){const l=fe.myPets.get();r.innerHTML="";for(let c=0;c<3;c++){const d=e.team.petIds[c],u=d&&d!=="",p=h("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(c);})),u){let f=l.all.find(g=>g.id===d);if(!f){const g=window.__petDataCache;g&&g.has(d)&&(f=g.get(d));}if(f)try{const g=Q.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),m=document.createElement("canvas");m.width=g.width,m.height=g.height;const y=m.getContext("2d");if(y&&y.drawImage(g,0,0),m.style.width="100%",m.style.height="100%",m.style.objectFit="contain",p.appendChild(m),e.showSlotStyles){const x=h("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(x),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const m=h("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(m);}else {const g=h("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${d} not found in myPets yet, waiting for update`);let m=false;const y=fe.myPets.subscribe(()=>{if(m)return;const S=fe.myPets.get().all.find(w=>w.id===d);if(S){m=true,y();try{p.innerHTML="";const w=Q.toCanvas("pet",S.petSpecies,{mutations:S.mutations,scale:1}),T=document.createElement("canvas");T.width=w.width,T.height=w.height;const k=T.getContext("2d");if(k&&k.drawImage(w,0,0),T.style.width="100%",T.style.height="100%",T.style.objectFit="contain",p.appendChild(T),e.showSlotStyles){const b=h("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(b),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${d} sprite updated`);}catch(w){console.warn(`[TeamListItem] Failed to render sprite for pet ${S.petSpecies}:`,w),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=W2();p.appendChild(f);}r.appendChild(p);}}i();const a=fe.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const l=h("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(l);}if(t.appendChild(n),t.appendChild(o),t.appendChild(r),e.onExpandClick){const l=h("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});l.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',l.addEventListener("click",c=>{c.stopPropagation(),e.onExpandClick?.();}),t.appendChild(l);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),a());});return s.observe(document.body,{childList:true,subtree:true}),t}function q2(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function kx(e){const{segments:t,selected:n=t[0]?.id??"",size:o="md",fullWidth:r=false,disabled:i=false,onChange:a}=e,s=h("div",{className:"sg-root"});o!=="md"&&s.classList.add(`sg--${o}`),r&&(s.style.width="100%");const l=h("div",{className:"sg-container",role:"tablist"}),c=h("div",{className:"sg-indicator"}),d=t.map(b=>{const v=h("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:b.label});if(v.id=b.id,b.icon){const C=h("span",{className:"sg-icon"}),I=q2(b.icon);I&&C.appendChild(I),v.appendChild(C);}const _=h("span",{className:"sg-label"},b.label);return v.appendChild(_),v.disabled=!!b.disabled,v});l.appendChild(c),d.forEach(b=>l.appendChild(b)),s.appendChild(l);let u=n,p=i;function f(){const b=d.find(v=>v.id===u);b&&requestAnimationFrame(()=>{const v=c,_=b.offsetLeft,C=b.offsetWidth;v.style.width=`${C}px`,v.style.transform=`translateX(${_}px)`;});}function g(){d.forEach(b=>{const v=b.id===u;b.classList.toggle("active",v),b.setAttribute("aria-selected",String(v)),b.disabled=p||!!t.find(_=>_.id===b.id)?.disabled;}),f();}function m(b){const v=b.currentTarget;if(v.disabled)return;x(v.id);}function y(b){if(p)return;const v=d.findIndex(C=>C.id===u);let _=v;if(b.key==="ArrowLeft"||b.key==="ArrowUp"?(b.preventDefault(),_=(v-1+d.length)%d.length):b.key==="ArrowRight"||b.key==="ArrowDown"?(b.preventDefault(),_=(v+1)%d.length):b.key==="Home"?(b.preventDefault(),_=0):b.key==="End"&&(b.preventDefault(),_=d.length-1),_!==v){const C=d[_];C&&!C.disabled&&(x(C.id),C.focus());}}d.forEach(b=>{b.addEventListener("click",m),b.addEventListener("keydown",y);});function x(b){!t.some(_=>_.id===b)||u===b||(u=b,g(),a?.(u));}function S(){return u}function w(b){p=!!b,g();}function T(){d.forEach(b=>{b.removeEventListener("click",m),b.removeEventListener("keydown",y);});}g(),queueMicrotask(()=>{const b=d.find(v=>v.id===u);if(b){const v=c;v.style.width=`${b.offsetWidth}px`,v.style.transform=`translateX(${b.offsetLeft}px)`;}});const k=s;return k.select=x,k.getSelected=S,k.setDisabled=w,k.destroy=T,k}function X2(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,l=h("div",{className:"lg-checkbox-wrap"}),c=h("input",{className:`lg-checkbox lg-checkbox--${r}`,id:t,type:"checkbox",checked:!!n,disabled:!!o});let d=null;i&&a!=="none"&&(d=h("label",{className:"lg-checkbox-label",htmlFor:t},i)),d&&a==="left"?l.append(d,c):d&&a==="right"?l.append(c,d):l.append(c);let u=!!n,p=!!o;function f(){c.checked=u,c.disabled=p;}function g(v=false){p||(u=!u,f(),v||s?.(u));}function m(){p||g();}function y(v){p||(v.key===" "||v.key==="Enter")&&(v.preventDefault(),g());}c.addEventListener("click",m),c.addEventListener("keydown",y);function x(){return u}function S(v,_=false){u=!!v,f(),_||s?.(u);}function w(v){p=!!v,f();}function T(v){if(!v){d&&(d.remove(),d=null);return}d?d.textContent=v:(d=h("label",{className:"lg-checkbox-label",htmlFor:t},v),l.append(d));}function k(){c.focus();}function b(){c.removeEventListener("click",m),c.removeEventListener("keydown",y);}return f(),{root:l,input:c,isChecked:x,setChecked:S,setDisabled:w,setLabel:T,focus:k,destroy:b}}let pr=0,hf="",bf="";function K2(){return pr===0&&(hf=document.body.style.overflow,bf=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),pr++,()=>{pr=Math.max(0,pr-1),pr===0&&(document.body.style.overflow=hf,document.body.style.touchAction=bf);}}class Y2{constructor(t){H(this,"dragState",null);H(this,"longPressState",null);H(this,"options");H(this,"onPointerMove");H(this,"onPointerUp");H(this,"onPointerCancel");H(this,"onLongPressPointerMove");H(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,o){if(this.cleanupLongPress(),pe.getAllTeams().findIndex(c=>c.id===o)===-1)return;const a=t.clientX,s=t.clientY,l=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,o);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:s,timeout:l,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,o){const r=this.options.getListContainer();if(this.dragState||!r)return;t.preventDefault();const a=pe.getAllTeams().findIndex(p=>p.id===o);if(a===-1)return;const s=n.getBoundingClientRect(),l=r.getBoundingClientRect(),c=n.cloneNode(true);c.classList.add("team-list-item--placeholder"),c.classList.remove("team-list-item--dragging");const d=n.style.touchAction;n.style.touchAction="none";const u=K2();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:c,offsetY:t.clientY-s.top,fromIndex:a,teamId:o,captureTarget:n,touchActionPrev:d,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-l.left}px`,n.style.top=`${s.top-l.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",r.style.position||(r.style.position="relative"),r.insertBefore(c,n.nextSibling),r.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),o=Math.abs(t.clientY-this.longPressState.startY),r=10;(n>r||o>r)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const o=n.getBoundingClientRect();let r=t.clientY-o.top-this.dragState.offsetY;const i=o.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(r=Math.max(-8,Math.min(i+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:o,itemEl:r}=this.dragState,i=Array.from(n.children).filter(l=>l!==r&&l!==o&&l instanceof HTMLElement&&l.classList.contains("team-list-item")),a=new Map;i.forEach(l=>{a.set(l,l.getBoundingClientRect().top);});let s=false;for(const l of i){const c=l.getBoundingClientRect(),d=c.top+c.height/2;if(t<d){o.nextSibling!==l&&n.insertBefore(o,l),s=true;break}}s||n.appendChild(o),i.forEach(l=>{const c=a.get(l),d=l.getBoundingClientRect().top;if(c!==void 0&&c!==d){const u=c-d;l.style.transform=`translateY(${u}px)`,l.style.transition="none",l.offsetHeight,l.style.transition="transform 0.14s ease",l.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:o=false}=t,{itemEl:r,placeholder:i,fromIndex:a,touchActionPrev:s,releaseScrollLock:l,pointerId:c}=this.dragState;if(n.classList.remove("is-reordering"),r.hasPointerCapture(c))try{r.releasePointerCapture(c);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),o){const p=Array.from(n.children).filter(f=>f!==r&&f!==i&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[a]||null;p?n.insertBefore(i,p):n.appendChild(i);}else {const u=Array.from(n.children).filter(f=>f!==r),p=u.indexOf(i);if(p!==-1){const f=u[p];f!==i&&n.insertBefore(i,f);}}if(i.replaceWith(r),i.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),l?.(),!o){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==a){const g=pe.getAllTeams().slice(),[m]=g.splice(a,1);g.splice(p,0,m);const y=g.map(x=>x.id);pe.reorderTeams(y),this.options.onReorder(y);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class J2{constructor(t={}){H(this,"card",null);H(this,"modeControl",null);H(this,"modeContainer",null);H(this,"teamContent",null);H(this,"listContainer",null);H(this,"teamMode","overview");H(this,"selectedTeamIds",new Set);H(this,"teamCheckboxes",new Map);H(this,"options");H(this,"dragHandler");this.options=t,this.dragHandler=new Y2({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!pe.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=h("div",{className:"team-card-wrapper"});this.modeContainer=h("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=h("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Ee({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=kx({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=h("div",{className:"team-card__disabled-state"}),n=h("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),o=Me({label:"Enable Feature",onClick:()=>{pe.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(o),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(o=>o.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=pe.getAllTeams(),n=pe.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=h("div",{className:"team-card__list-container"}),t.forEach(o=>{const r=n===o.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(o.id));const a=Cx({team:o,isActive:r,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(o.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(o.id,s);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await pe.activateTeam(o),this.options.onTeamsUpdated?.();}catch(c){console.error("[TeamCard] Failed to activate team:",c);}}}),a.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,a,o.id):this.dragHandler.startLongPress(s,a,o.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=h("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=h("div",{className:"team-card__actions"}),o=Me({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(o),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=h("div",{className:"team-card__actions"}),n=Me({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),o=Me({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),r=Me({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});r.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(o),t.appendChild(r),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,o=1;const r=pe.getAllTeams(),i=new Set(r.map(a=>a.name));for(;i.has(n);)n=`${t} (${o})`,o++;try{pe.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)pe.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=pe.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){pe.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const o=pe.getTeam(t);if(!o)return;const r=o.petIds[n];!r||r===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const o=pe.getTeam(t);if(!o)return;const r=[...o.petIds];r[n]="",pe.updateTeam(t,{petIds:r}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const o=pe.getTeam(t);if(!o)return;const i=fe.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),a=new Set(o.petIds.filter(f=>f!=="")),s=i.filter(f=>!a.has(f.id));await xe.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const l=qe.detect();(l.platform==="mobile"||l.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const d=fe.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,m=[...o.petIds];m[n]=g.id,pe.updateTeam(t,{petIds:m}),this.options.onTeamsUpdated?.(),xe.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),vo.close().then(()=>{const y=qe.detect();(y.platform==="mobile"||y.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await vo.show("inventory",{items:s,favoritedItemIds:[]}),await vo.waitForClose();const u=qe.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),d();}createCheckboxIndicator(t){const n=X2({checked:this.selectedTeamIds.has(t),size:"md",onChange:o=>{o?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class Q2{constructor(t,n={}){H(this,"root");H(this,"pet");H(this,"options");H(this,"contentSlot",null);H(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const o=document.createElement("div");o.className="base-pet-card__info";const r=document.createElement("div");if(r.className="base-pet-card__name",r.textContent=this.pet.name||this.pet.petSpecies,o.appendChild(r),!this.options.hideStr){const i=document.createElement("div");i.className="base-pet-card__str",this.renderStr(i),o.appendChild(i);}return t.appendChild(o),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const o=this.root.querySelector(".base-pet-card__str");o&&this.renderStr(o);const r=this.root.querySelector(".base-pet-card__sprite-wrapper");r instanceof HTMLElement&&this.renderSprite(r);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const o=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const r=Xo({label:o,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(r.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(Q.has("pet",this.pet.petSpecies)){const o=Q.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});o.style.width="64px",o.style.height="64px",o.style.objectFit="contain",t.appendChild(o);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}const Ne={XP:{BOOST_PAIR:.85,LEVELING_PAIR:.75,PASSIVE_LEVELING:.5,STR_DISTANCE_THRESHOLD:.15},ECONOMY:{DEDICATED_COIN:.9,META_SELLING:.85,PASSIVE_EFFICIENCY:.65,ENDGAME_HARVEST:.95,SYNERGY_BONUS:.1,EARLY_REGROW:.7},HATCHING:{TIER_3_MAX_STR:.95,RAINBOW_HUNTING:.7,COMBO_BONUS:.05},TIER_BONUS:.05,CONFIDENCE_THRESHOLD:.6},ne={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]},ll={ALLOWED_PANELS:{"xp-farming":["xp"],"coin-farming":["coin","xp","hatch"],"crop-farming":["growth","coin","xp","hatch"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],hatching:["hatch","xp"],efficiency:["xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}};function Je(e,t){return e.abilities.some(n=>t.includes(n))}function He(e,t){return e.filter(n=>Je(n,t)).length}function Z2(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function fr(e,t){const n=e.flatMap(o=>o.abilities.filter(r=>t.includes(r))).map(Z2);return n.length===0?0:n.reduce((o,r)=>o+r,0)/n.length}function ga(e){const t=tb(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],o={},r=He(t,ne.XP_BOOST),i=Ne.XP.STR_DISTANCE_THRESHOLD,s=t.filter(E=>E.maxStrength===0?false:(E.maxStrength-E.currentStrength)/E.maxStrength>i).length,l=t.filter(E=>E.currentStrength<E.maxStrength).length;if(r>=1&&s>=2)o["xp-farming"]=Ne.XP.BOOST_PAIR,n.push(`1 XP Boost + ${s} high-need pets (>${i*100}% STR distance)`);else if(r>=2){const E=fr(t,ne.XP_BOOST);o["xp-farming"]=Ne.XP.LEVELING_PAIR+E*Ne.TIER_BONUS,n.push(`${r} XP Boost pets (avg tier ${E.toFixed(1)})`);}else l>=2&&s>=1?(o["xp-farming"]=Ne.XP.LEVELING_PAIR,n.push(`${l} leveling pets with ${s} high-need`)):l>=2&&(o["xp-farming"]=Ne.XP.PASSIVE_LEVELING,n.push(`${l} pets below max STR`));const c=He(t,ne.COIN_FINDER),d=He(t,ne.SELL_BOOST),u=He(t,ne.CROP_REFUND_HARVEST),p=He(t,ne.RARE_GRANTERS),f=He(t,ne.COMMON_GRANTERS),g=t.some(E=>Je(E,ne.COIN_FINDER)&&(Je(E,ne.RARE_GRANTERS)||Je(E,ne.COMMON_GRANTERS)));c>=1&&!g?(o["coin-farming"]=Ne.ECONOMY.DEDICATED_COIN,n.push("Dedicated Coin Finder team (no granters)")):d>=1&&u>=1?(o["coin-farming"]=Ne.ECONOMY.META_SELLING,n.push("Meta Selling Team (Sell Boost + Crop Refund/Harvest)")):c>=1&&g?(o["coin-farming"]=Ne.ECONOMY.PASSIVE_EFFICIENCY,o.efficiency=Math.max(o.efficiency||0,Ne.ECONOMY.PASSIVE_EFFICIENCY),n.push("Coin Finder + Granter (passive efficiency)")):(d>=1||u>=1)&&(o["coin-farming"]=Math.max(o["coin-farming"]||0,.7),n.push("Sell/Refund abilities (coin efficiency)"));const m=He(t,ne.PLANT_GROWTH),y=He(t,ne.CROP_MUTATION),x=He(t,ne.CROP_SIZE),S=t.filter(E=>E.abilities.includes("DoubleHarvest")).length,w=t.filter(E=>E.abilities.includes("ProduceRefund")).length,T=t.some(E=>E.abilities.includes("DoubleHarvest")&&E.abilities.includes("ProduceRefund"));if(S>=3){let E=Ne.ECONOMY.ENDGAME_HARVEST;T&&(E+=Ne.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,E),n.push("Endgame Harvest Team (3x Double Harvest)"+(T?" + capybara synergy":""));}else if(S>=1&&w>=1){let E=.85;T&&(E+=Ne.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,E),n.push("Double Harvest + Crop Refund"+(T?" (same pet - capybara)":""));}else y>=1&&S===0&&(o["crop-farming"]=Math.max(o["crop-farming"]||0,Ne.ECONOMY.EARLY_REGROW),n.push("Early Game Regrow Team (Crop Mutation)"));if(p>=1){const E=t.some(A=>A.abilities.includes("RainbowGranter")),P=t.some(A=>A.abilities.includes("GoldGranter"));E?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):P?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(o["crop-farming"]=Math.max(o["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const k=m+y+x+f;if(k>=2&&!o["crop-farming"]){const E=(fr(t,ne.PLANT_GROWTH)+fr(t,ne.CROP_MUTATION)+fr(t,ne.CROP_SIZE))/3;o["crop-farming"]=Math.max(o["crop-farming"]||0,.7+E*.03),n.push(`${k} crop-related abilities`);}const b=He(t,ne.EGG_GROWTH);if(b>=1&&(o["time-reduction"]=.7,n.push(`${b} Egg Growth Boost pet(s)`)),m>=1&&!o["crop-farming"]&&(o["time-reduction"]=Math.max(o["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),p>=1||y>=1){const E=t.some(A=>A.abilities.includes("RainbowGranter")),P=t.some(A=>A.abilities.includes("GoldGranter"));E||P?(o["mutation-hunting"]=.95,n.push(`${E?"Rainbow":"Gold"} Granter (mutation focus)`)):y>=1&&(o["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const v=He(t,ne.HUNGER_BOOST),_=He(t,ne.HUNGER_RESTORE);v>=1&&_>=1?(o.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(v>=1||_>=1)&&(o.efficiency=.6,n.push("Hunger management (reduced feeding)"));const C=c+p+f;C>=2&&(o.efficiency=Math.max(o.efficiency||0,.6),n.push(`${C} passive abilities (passive gains)`));const I=He(t,ne.MAX_STR_BOOST),R=He(t,ne.HATCH_XP),F=He(t,ne.PET_MUTATION),G=He(t,ne.DOUBLE_HATCH),z=He(t,ne.PET_REFUND);if(I>=1){const E=fr(t,ne.MAX_STR_BOOST),P=E>=3?Ne.HATCHING.TIER_3_MAX_STR:.85;o.hatching=P+E*Ne.TIER_BONUS,n.push(`Max Strength Boost (tier ${E.toFixed(1)}) - late-game meta`);}if(F>=1||G>=1||z>=1){const E=F+G+z,P=Ne.HATCHING.RAINBOW_HUNTING+E*Ne.HATCHING.COMBO_BONUS;o.hatching=Math.max(o.hatching||0,P),n.push(`${E} rainbow hunting abilities`);}R>=1&&!o.hatching&&(o.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const X=t.filter(E=>Je(E,ne.MAX_STR_BOOST)||Je(E,ne.PET_MUTATION)||Je(E,ne.DOUBLE_HATCH)||Je(E,ne.PET_REFUND)).length;X>=Math.ceil(t.length*.67)&&o.hatching&&(o.hatching=Math.max(o.hatching,.97),o["crop-farming"]&&o["crop-farming"]<.97&&t.filter(P=>(Je(P,ne.CROP_REFUND_HARVEST)||Je(P,ne.CROP_SIZE)||Je(P,ne.CROP_MUTATION))&&!Je(P,ne.PET_REFUND)&&!Je(P,ne.DOUBLE_HATCH)&&!Je(P,ne.PET_MUTATION)&&!Je(P,ne.MAX_STR_BOOST)).length===0&&(delete o["crop-farming"],n.push("Suppressed crop-farming (hatching majority override)")),n.push(`Hatching Majority (${X}/${t.length} pets) - clear team purpose`));const L=Object.entries(o).sort(([,E],[,P])=>P-E);if(L.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp","growth","coin","hatch"],reasons:["Mixed or unclear purpose"]};const[O,D]=L[0],B=L.slice(1).map(([E,P])=>({purpose:E,confidence:P}));return D<Ne.CONFIDENCE_THRESHOLD?{primary:"balanced",confidence:D,secondary:L.map(([E,P])=>({purpose:E,confidence:P})),suggestedFeatures:["xp","growth","coin","hatch"],reasons:[...n,`Low confidence (${(D*100).toFixed(0)}%) - showing all panels`]}:{primary:O,confidence:D,secondary:B,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","growth","xp"],"crop-farming":["growth","coin","xp"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],efficiency:["xp"],hatching:["hatch","growth","xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}[O]||["xp","growth","coin","hatch"],reasons:n}}async function eM(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,o=t.createOscillator(),r=t.createGain();o.connect(r),r.connect(t.destination),o.type="sine",o.frequency.setValueAtTime(800,n),o.frequency.exponentialRampToValueAtTime(400,n+.03),r.gain.setValueAtTime(.12,n),r.gain.exponentialRampToValueAtTime(.001,n+.05),o.start(n),o.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function tM(e={}){const{id:t,variant:n="default",size:o="md",round:r=false,sprite:i=null,onClick:a,disabled:s=false,playSound:l=true,tooltip:c}=e,d=h("button",{className:"gemini-icon-btn",id:t});d.type="button",n!=="default"&&d.classList.add(`gemini-icon-btn--${n}`),o!=="md"&&d.classList.add(`gemini-icon-btn--${o}`),r&&d.classList.add("gemini-icon-btn--round"),c&&(d.title=c),d.disabled=s;const u=h("span",{className:"gemini-icon-btn__content"});d.appendChild(u),i&&u.appendChild(i);const p=h("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",d.appendChild(p),d.addEventListener("click",async g=>{d.disabled||(l&&eM(),a?.(g));});const f=d;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{d.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&d.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{d.disabled=g;},f}const _x=`
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
`;class nM{constructor(){H(this,"card",null);H(this,"listContainer",null);H(this,"innerContent",null);H(this,"logs",[]);H(this,"filteredLogs",[]);H(this,"unsubscribe",null);H(this,"ITEM_HEIGHT",88);H(this,"BUFFER_SIZE",3);H(this,"VIEWPORT_HEIGHT",480);H(this,"renderedRange",{start:0,end:0});H(this,"scrollListener",null);H(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=to(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const o=t.get().abilityLogs;this.updateFromAbilityLogs(o);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=J.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=cm(a),l=new Date(n.performedAt),c=l.toLocaleDateString("en-US",{month:"short",day:"numeric"}),d=l.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),u=`${c} ${d}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:s,formattedDate:u}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return Xo({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=h("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=h("div",{style:"margin-bottom: 0;"}),o=Is({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:r=>{const i=r.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(o.root),t.appendChild(n),this.listContainer=h("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=h("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=Ee({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,o)=>o.timestamp-n.timestamp);if(t.length===0){const n=h("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let o=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),r=Math.min(this.filteredLogs.length,o+n+this.BUFFER_SIZE*2);if(o===this.renderedRange.start&&r===this.renderedRange.end)return;this.renderedRange={start:o,end:r},this.innerContent.replaceChildren();const i=o*this.ITEM_HEIGHT;if(i>0){const s=h("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=o;s<r;s++){const l=this.filteredLogs[s],c=this.createLogItemCard(l);this.innerContent.appendChild(c);}const a=Math.max(0,(this.filteredLogs.length-r)*this.ITEM_HEIGHT);if(a>0){const s=h("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}createLogItemCard(t){const n=h("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const o=h("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const d=Q.toCanvas("pet",t.petSpecies);d&&(d.style.width="100%",d.style.height="100%",d.style.objectFit="contain",o.appendChild(d));}catch{o.textContent="🐾",o.style.fontSize="24px";}n.appendChild(o);const r=h("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=h("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=h("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=h("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);i.appendChild(a),i.appendChild(s),r.appendChild(i);const l=this.createAbilityBadge(t.abilityId,t.abilityName);r.appendChild(l);const c=h("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return r.appendChild(c),n.appendChild(r),n}}const Tx=`
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

`,Ax=`
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
`,Bu=`
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
`,Ex=`
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
`,oM=`
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
`;class rM extends Xt{constructor(n){super({id:"tab-pets",label:"Pets"});H(this,"unsubscribeMyPets");H(this,"lastActiveTeamId",null);H(this,"teamCardPart",null);H(this,"abilityLogsCardPart",null);H(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await ot(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>Ks);return {MGSprite:a}},void 0);await o.init();const r=n.getRootNode();Ae(r,Tx,"team-card-styles"),Ae(r,Ax,"base-pet-card-styles"),Ae(r,Bu,"badge-styles"),Ae(r,Ex,"arcade-button-styles"),Ae(r,_x,"gemini-icon-button-styles"),Ae(r,oM,"ability-logs-card-styles");const i=this.createGrid("12px");i.id="pets",n.appendChild(i),this.initializeTeamCardPart(i),this.initializeAbilityLogsCardPart(i),this.unsubscribeMyPets=fe.myPets.subscribeStable(()=>{const a=pe.getActiveTeamId();a!==this.lastActiveTeamId&&(this.lastActiveTeamId=a,this.teamCardPart?.render());}),this.lastActiveTeamId=pe.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new J2({onTeamReordered:r=>{console.log("[PetsSection] Teams reordered:",r);},setHUDOpen:this.deps?.setHUDOpen}));const o=this.teamCardPart.build();n.appendChild(o),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new nM);const o=this.abilityLogsCardPart.build();n.appendChild(o),this.abilityLogsCardPart.render();}}class iM{constructor(t){H(this,"root");H(this,"options");H(this,"headerElement",null);H(this,"petsContainer",null);H(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${t.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `);}updatePets(t){if(this.petsContainer){this.petsContainer.innerHTML="";for(const n of t){const o=this.buildPetCard(n);this.petsContainer.appendChild(o);}}}buildPetCard(t){const n=document.createElement("div");n.className="xp-pet-card",t.isStarving&&n.classList.add("xp-pet-card--starving"),t.isMaxStrength&&n.classList.add("xp-pet-card--max");const o=document.createElement("div");o.className="xp-pet-card__sprite";const r=document.createElement("div");r.className="xp-pet-card__sprite-wrapper";try{const d=t.mutations;if(Q.has("pet",t.species)){const u=Q.toCanvas("pet",t.species,{mutations:d,scale:1,boundsMode:"padded"});u.style.width="64px",u.style.height="64px",u.style.objectFit="contain",u.style.display="block",r.appendChild(u);}else r.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}catch(d){console.warn(`[TeamXpPanel] Failed to render sprite for ${t.species}:`,d),r.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}o.appendChild(r);const i=document.createElement("div");if(i.className="xp-pet-card__badges",t.isMaxStrength&&(i.innerHTML+='<span class="xp-badge xp-badge--max">MAX</span>'),t.isStarving&&(i.innerHTML+='<span class="xp-badge xp-badge--starving">STARVING</span>'),t.xpBoostStats){const d=t.xpBoostStats.tier==="Snowy"?"❄":"⚡";i.innerHTML+=`<span class="xp-badge xp-badge--boost">${d}${t.xpBoostStats.tier}</span>`;}o.appendChild(i);const a=document.createElement("div");a.className="xp-pet-card__str-display",a.innerHTML=`
            <span class="xp-str__label">STR</span>
            <span class="xp-str__current">${t.currentStrength}</span>
            <span class="xp-str__separator">/</span>
            <span class="xp-str__max">${t.maxStrength}</span>
        `,o.appendChild(a),n.appendChild(o);const s=document.createElement("div");s.className="xp-pet-card__stats";const l=document.createElement("div");l.className="xp-pet-card__name",l.textContent=t.name||t.species,s.appendChild(l);const c=document.createElement("table");return c.className="xp-stats-table",t.isStarving?c.innerHTML=`
                <tr class="xp-stats-table__row xp-stats-table__row--warning">
                    <td class="xp-stats-table__label">Status</td>
                    <td class="xp-stats-table__value xp-stats-table__value--danger">0 XP/hr - FEED NOW!</td>
                </tr>
            `:c.innerHTML=`
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
            `,s.appendChild(c),n.appendChild(s),n}buildProgressWithStats(t,n){const o=n==="next"?t.hoursToNextStrength:t.hoursToMaxStrength,r=n==="next"?t.feedsToNextStrength:t.feedsToMaxStrength,i=t.currentStrength-Math.floor(t.currentStrength),a=Math.floor(n==="next"?i*100:t.currentStrength/t.maxStrength*100),s=n==="next"?Math.min(99,Math.max(1,a)):Math.min(100,Math.max(0,a)),l=s<33?"low":s<67?"medium":"high";return `
            <div class="xp-progress-row">
                <span class="xp-progress-row__time">${this.formatHours(o)}</span>
                <span class="xp-progress-row__feeds">(🍖 x${r})</span>
                <div class="xp-progress-row__bar-container">
                    <div class="xp-progress-row__bar">
                        <div class="xp-progress-row__fill xp-progress-row__fill--${l}" style="width: ${s}%"></div>
                    </div>
                    <span class="xp-progress-row__percent">${s}%</span>
                </div>
            </div>
        `}updateFooter(t,n){if(!this.footerElement)return;if(t.activeBoosterCount===0){this.footerElement.innerHTML="",this.footerElement.classList.add("xp-panel__footer--hidden");return}this.footerElement.classList.remove("xp-panel__footer--hidden");const r=n.filter(i=>i.xpBoostStats?.isActive).map(i=>i.name||i.species).join(", ");this.footerElement.innerHTML=`
            <div class="xp-panel__footer-icon">⚡</div>
            <div class="xp-panel__footer-content">
                <div class="xp-panel__footer-title">
                    ${t.activeBoosterCount} XP Booster${t.activeBoosterCount!==1?"s":""} Active
                </div>
                <div class="xp-panel__footer-detail">
                    +${t.bonusXpPerHour.toLocaleString()} bonus XP/hr
                    <span class="xp-panel__footer-names">(${r})</span>
                </div>
            </div>
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),o=Math.floor(t%24);return `${n}d ${o}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const aM={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=af(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new iM({teamId:e.id});t.appendChild(n.build());const o=ir(e.id);return o&&n.update(o),{update:(r,i)=>{const a=ir(r.id);a&&n.update(a);},destroy:()=>n.destroy(),refresh:()=>{const r=ir(e.id);r&&n.update(r);}}},renderPetSlot:(e,t,n)=>{const o=fe.weather.get(),r=o.isActive?o.type:null,i=ir(t.id),a=i?.teamSummary.bonusXpPerHour||0,s=i?.pets||[],l=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),c=jc(e,r,a,l),d=c.isMaxStrength,u=!!c.xpBoostStats;let p="";if(d)u&&c.xpBoostStats&&(p=`
                    <div class="stat-row stat-row--boost">
                        <span class="stat__label">BOOST</span>
                        <span class="stat__value stat__value--accent">+${c.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/h</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat__label">SUPPORT</span>
                        <span class="stat__value">${c.supportingFeeds} feeds</span>
                    </div>
                `);else {let f="";u&&c.xpBoostStats&&(f=`
                    <div class="stat-row stat-row--boost">
                        <span class="stat__label">BOOST</span>
                        <span class="stat__value stat__value--accent">+${c.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/h</span>
                    </div>
                `);const g=c.maxStrength,m=c.currentStrength,y=Math.min(100,Math.max(0,Math.floor(m/g*100))),x=e.xp%3600/3600*100,S=Math.min(99,Math.max(1,Math.floor(x))),w=c.currentStrength+1,T=c.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${sf(c.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${c.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${w}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${S}%"></div>
                        <span class="stat__percent">${S}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${sf(c.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${c.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${T}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${y}%"></div>
                        <span class="stat__percent">${y}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},renderGroupedSlot:(e,t,n)=>{const o=fe.weather.get(),r=o.isActive?o.type:null,a=ir(t.id)?.teamSummary.bonusXpPerHour||0;let s=0,l=0;for(const d of e){const u=jc(d,r,a,0);u.xpBoostStats&&(s+=u.xpBoostStats.expectedXpPerHour),u.supportingFeeds&&(l+=u.supportingFeeds);}let c="";if(s>0&&(c=`
                <div class="stat-row stat-row--boost">
                    <span class="stat__label">TEAM BOOST</span>
                    <span class="stat__value stat__value--accent">+${s.toLocaleString()} XP/h</span>
                </div>
            `,l>0&&(c+=`
                    <div class="stat-row">
                        <span class="stat__label">SUPPORT</span>
                        <span class="stat__value">${l} feeds</span>
                    </div>
                `)),s===0){if(e.every(u=>u.currentStrength>=u.maxStrength))n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">All pets at max STR</span>
                        </div>
                    </div>
                `;else {const u=af(t.id);n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(u)}%</span>
                        </div>
                    </div>
                `;}return}n.innerHTML=`<div class="xp-stats-compact xp-stats-grouped">${c}</div>`;},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.some(i=>i.currentStrength<i.maxStrength)?true:n.some(i=>i.abilities.some(a=>ne.XP_BOOST.includes(a)))},shouldDisplay:(e,t,n)=>(ll.ALLOWED_PANELS[n.primary]||[]).includes("xp")?!!(t.some(a=>a.currentStrength<a.maxStrength)||t.some(a=>a.abilities.some(s=>ne.XP_BOOST.includes(s)))):false,countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.every(r=>r.currentStrength>=r.maxStrength)?n.some(i=>i.abilities.some(a=>ne.XP_BOOST.includes(a)))?1:0:2}};function Re(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function Zt(e){if(e<=0)return "0m";const t=Math.floor(e/1e3),n=Math.floor(t/86400),o=Math.floor(t%86400/3600),r=Math.floor(t%3600/60),i=[];return n>0&&i.push(`${n}d`),o>0&&i.push(`${o}h`),(r>0||i.length===0)&&i.push(`${r}m`),i.join(" ")}function en(e,t){const n=e==="egg"?"pet":"plant",o=Re("span","sprite-wrapper");if(!t)return o;let r=t;e==="plant"&&(r==="DawnCelestial"&&(r="DawnCelestialCrop"),r==="MoonCelestial"&&(r="MoonCelestialCrop"));try{if(Q.isReady()&&Q.has(n,r)){const i=Q.toCanvas(n,r,{scale:.3});i.style.height="16px",i.style.width="auto",i.style.imageRendering="pixelated",o.appendChild(i);}}catch{}return o}function ma(e,t){const n=Re("span","stacked-sprites");if(t.length===0)return n;const o=e==="egg"?"pet":"plant",r=4,a=[...new Set(t.map(l=>e==="egg"?l.eggId:l.species).filter(Boolean))].slice(0,r);if(a.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let l=0;l<a.length;l++){let c=a[l];e==="plant"&&c&&(c==="DawnCelestial"&&(c="DawnCelestialCrop"),c==="MoonCelestial"&&(c="MoonCelestialCrop"));try{if(Q.isReady()&&c&&Q.has(o,c)){const d=Q.toCanvas(o,c,{scale:.2});d.style.height="14px",d.style.width="auto",d.style.imageRendering="pixelated",d.style.position="relative",d.style.zIndex=String(r-l),n.appendChild(d),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function tn(e,t,n,o,r,i){const a=Re("div","stat-row"),s=Re("span","stat__label",e),l=Re("span","stat__timer",t),c=Re("span","stat__str-label");c.appendChild(n);const d=Re("div","stat__progress-mini"),u=Re("div",`stat__progress-fill ${r}`);u.style.width=`${o}%`,d.appendChild(u);const p=`${o}%`,f=Re("span","stat__percent",p);return d.appendChild(f),a.appendChild(s),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&a.appendChild(c),a.appendChild(l),a.appendChild(d),a}function xf(e){const t=Re("div","stat-row stat-row--boost"),n=Re("span","stat__label","BOOST");t.appendChild(n);const o=Re("span","stat__values-row");return e.forEach((r,i)=>{const a=Re("span","stat__boost-item");a.appendChild(r.sprite),a.appendChild(Re("span","stat__value stat__value--accent",r.text)),o.appendChild(a),i<e.length-1&&o.appendChild(Re("span","stat__separator"," "));}),t.appendChild(o),t}function yf(e,t){const n=t==="egg"?si:li;let o=0,r=false;const i=[];for(const a of e.abilities)if(a in n){const s=n[a],l=s.procRate*60;o+=l*s.minutesPerProc,r=true,i.push(a);}return {hasBoost:r,minutesPerProc:0,hourlyReduction:o,abilityName:i.join(", ")}}function vf(e,t){const n=pe.getPetsForTeam(e),o=t==="egg"?_u(n):Tu(n);return `${((60+ci(o).timeReductionPerHour)/60).toFixed(2)}x`}function ha(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const i=t-r.plantedAt,s=(r.maturedAt-t)/n,l=i+s,c=l>0?i/l*100:0;return o+Math.min(100,Math.max(0,c))},0)/e.length)}function ba(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const i=t-r.startTime,s=(r.endTime-t)/n,l=i+s,c=l>0?i/l*100:0;return o+Math.min(100,Math.max(0,c))},0)/e.length)}function wf(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,i)=>r.maturedAt-i.maturedAt)[0];return {remainingMs:Math.max(0,o.maturedAt-t),name:o.eggId||null}}function Sf(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,i)=>r.endTime-i.endTime)[0];return {remainingMs:Math.max(0,o.endTime-t),name:o.species||null}}function Cf(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.maturedAt));return Math.max(0,n-t)}function kf(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.endTime));return Math.max(0,n-t)}function nn(e,t){return e<=0||t<=0?0:Math.round(e/t)}const sM={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=fe.myGarden.get(),o=n.eggs.growing.length+n.plants.growing.length;return o===0?null:{text:`${o} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{const i=fe.myGarden.get(),a=Date.now(),s=yf(e,"egg"),l=yf(e,"plant");if(n.innerHTML="",!s.hasBoost&&!l.hasBoost)return;const c=r?i.eggs.growing.filter(b=>r.has(b.tileIndex)):i.eggs.growing,d=r?i.crops.growing.filter(b=>r.has(b.tileIndex)):i.crops.growing;let u=o;!u&&s.hasBoost!==l.hasBoost&&(u=s.hasBoost?"egg":"plant");const p=u==="egg"&&s.hasBoost||u==="plant"&&l.hasBoost,f=!u,g=Re("div","growth-stats-compact");if(!p&&!f){const b=o==="egg"?"Egg":"Plant",v=Re("div","stat-row stat-row--message");v.appendChild(Re("span","stat__message",`No ${b} Growth Boost, Click the Button to Switch View`)),g.appendChild(v),n.appendChild(g);return}const m=[],y=s.hasBoost&&(u==="egg"||f),x=l.hasBoost&&(u==="plant"||f);if(y){const b=Math.round(s.hourlyReduction/60*100);m.push({text:`+${b}% Speed`,sprite:en("egg","UncommonEgg")});}if(x){const b=Math.round(l.hourlyReduction/60*100);m.push({text:`+${b}% Speed`,sprite:en("plant","Carrot")});}m.length>0&&g.appendChild(xf(m));const S=vf(t,"egg"),w=parseFloat(S.replace("x","")),T=vf(t,"plant"),k=parseFloat(T.replace("x",""));if(s.hasBoost&&(u==="egg"||f)){const b=wf(c,a),v=nn(b.remainingMs,w),_=c.length>0?ha(c,a,w):100,C=v>0?Zt(v):"Ready!";g.appendChild(tn("NEXT EGG",C,en("egg",b.name),_,"stat__progress-fill--egg"));}if(l.hasBoost&&(u==="plant"||f)){const b=Sf(d,a),v=nn(b.remainingMs,k),_=d.length>0?ba(d,a,k):100,C=v>0?Zt(v):"Ready!";g.appendChild(tn("NEXT PLANT",C,en("plant",b.name),_,"stat__progress-fill--plant"));}if(s.hasBoost&&(u==="egg"||f)){const b=c.length>0?ha(c,a,w):100,v=Cf(c,a),_=nn(v,w),C=_>0?Zt(_):"All Ready!";g.appendChild(tn("ALL EGGS",C,ma("egg",c),b,"stat__progress-fill--egg"));}else if(l.hasBoost&&(u==="plant"||f)){const b=d.length>0?ba(d,a,k):100,v=kf(d,a),_=nn(v,k),C=_>0?Zt(_):"All Ready!";g.appendChild(tn("ALL PLANTS",C,ma("plant",d),b,"stat__progress-fill--plant"));}n.appendChild(g);},renderGroupedSlot:(e,t,n,o,r)=>{const i=fe.myGarden.get(),a=Date.now(),s=_u(e),l=Tu(e),c=ci(s),d=ci(l);n.innerHTML="";const u=c.timeReductionPerHour>0,p=d.timeReductionPerHour>0;if(!u&&!p)return;const f=Re("div","growth-stats-compact growth-stats-grouped"),g=r?i.eggs.growing.filter(b=>r.has(b.tileIndex)):i.eggs.growing,m=r?i.crops.growing.filter(b=>r.has(b.tileIndex)):i.crops.growing,y=o==="egg"&&u,x=o==="plant"&&p,S=!o,w=(60+c.timeReductionPerHour)/60,T=(60+d.timeReductionPerHour)/60,k=[];if((y||S)&&u){const b=Math.round(c.timeReductionPerHour/60*100);k.push({text:`+${b}% Speed`,sprite:en("egg","UncommonEgg")});}if((x||S)&&p){const b=Math.round(d.timeReductionPerHour/60*100);k.push({text:`+${b}% Speed`,sprite:en("plant","Carrot")});}if(k.length>0&&f.appendChild(xf(k)),(y||S)&&u){const b=wf(g,a),v=nn(b.remainingMs,w),_=g.length>0?ha(g,a,w):100,C=v>0?Zt(v):"Ready!";f.appendChild(tn("NEXT EGG",C,en("egg",b.name),_,"stat__progress-fill--egg"));}if((x||S)&&p){const b=Sf(m,a),v=nn(b.remainingMs,T),_=m.length>0?ba(m,a,T):100,C=v>0?Zt(v):"Ready!";f.appendChild(tn("NEXT PLANT",C,en("plant",b.name),_,"stat__progress-fill--plant"));}if((y||S)&&u){const b=g.length>0?ha(g,a,w):100,v=Cf(g,a),_=nn(v,w),C=_>0?Zt(_):"All Ready!";f.appendChild(tn("ALL EGGS",C,ma("egg",g),b,"stat__progress-fill--egg"));}else if((x||S)&&p){const b=m.length>0?ba(m,a,T):100,v=kf(m,a),_=nn(v,T),C=_>0?Zt(_):"All Ready!";f.appendChild(tn("ALL PLANTS",C,ma("plant",m),b,"stat__progress-fill--plant"));}n.appendChild(f);},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return Ao(n)||Eo(n)},shouldDisplay:(e,t,n)=>{const r=(ll.ALLOWED_PANELS[n.primary]||[]).includes("growth"),i=Ao(t)||Eo(t);return r&&i},countRows:(e,t,n)=>{const o=Array.isArray(e)?e:[e],r=Ao(o),i=Eo(o);if(!r&&!i)return 0;if(n==="egg"||n==="plant")return 2;let a=0;return r&&(a+=2),i&&(a+=2),a}},cl=1.5,Cr=["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],kr=["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],_r=["RainDance","SnowGranter","FrostGranter","GoldGranter","RainbowGranter"],Tr=["DoubleHarvest"],Ar=["ProduceRefund"];function Ht(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function on(e){if(e>=1e12)return `${(e/1e12).toFixed(2)}T`;if(e>=1e9)return `${(e/1e9).toFixed(2)}B`;if(e>=1e6)return `${(e/1e6).toFixed(2)}M`;if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)}k`:`${t.toFixed(1)}k`}return String(Math.round(e))}function Qo(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,scaleIncreasePercentage:n.baseParameters?.scaleIncreasePercentage??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0,grantedMutations:n.baseParameters?.grantedMutations??[],requiredWeather:n.baseParameters?.requiredWeather??null}:null}function Pe(e,t){return e.abilities.some(n=>t.includes(n))}function Fi(e,t,n){if(e.hunger<=0)return  false;const o=Qo(t);return !(!o||o.requiredWeather&&n!==o.requiredWeather)}function Di(e){return (e.currentStrength<0||e.currentStrength>100)&&console.warn(`[Gemini] Invalid strength: ${e.currentStrength} for pet ${e.name||"unknown"}`),(e.maxStrength<80||e.maxStrength>100)&&console.warn(`[Gemini] Unexpected maxStrength: ${e.maxStrength} for pet ${e.name||"unknown"} (expected 80-100)`),e.currentStrength/100}function dl(e,t){return Math.min(100,e*t)}function lM(e,t,n,o,r=cl){const i=Ws(e);if(!i)return 0;const a=wt(e,t,n)*r,s=Math.min(t*(1+o/100),i.maxScale),l=wt(e,s,n)*r;return Math.max(0,l-a)}function Ix(e,t,n,o,r=cl){if(n.includes(o))return 0;const i=wt(e,t,n)*r,a=[...n,o],s=wt(e,t,a)*r;return Math.max(0,s-i)}function Xl(e,t,n){const o=Ht("div","stat-row");return o.appendChild(Ht("span","stat__label",e)),o.appendChild(Ht("span","stat__value",t)),o.appendChild(Ht("span","stat__timer",n)),o}function _f(e,t,n){const o=Ht("div","stat-row");return o.appendChild(Ht("span","stat__label",e)),o.appendChild(Ht("span","stat__value",t)),o.appendChild(Ht("span","stat__timer",n)),o}function cM(e,t,n){const r=fe.myGarden.get().crops.mature,i=n?r.filter(c=>n.has(String(c.tileIndex))):r;if(i.length===0)return {perProc:0,perHour:0};let a=0,s=0;for(const c of e){const d=Di(c);for(const u of Cr){if(!c.abilities.includes(u)||!Fi(c,u,t))continue;const p=Qo(u);if(!p)continue;const f=dl(p.baseProbability,d),g=p.scaleIncreasePercentage*d,m=f/100*60;let y=0,x=0;for(const w of i){const T=Math.max(1,Math.floor(w.fruitCount)),k=lM(w.species,w.targetScale,w.mutations,g);y+=k*T,x+=T;}const S=x>0?y/x:0;a+=S*m,s+=m;}}return {perProc:s>0?a/s:0,perHour:a}}function dM(e,t,n){const r=fe.myGarden.get().crops.mature,i=fe.weather.get(),a=J.get("weather"),s=n?r.filter(y=>n.has(String(y.tileIndex))):r;if(s.length===0||!i.isActive||!a)return {perProc:0,perHour:0};const l=a[i.type];if(!l?.mutator)return {perProc:0,perHour:0};const c=l.mutator.chancePerMinutePerCrop??0,d=l.mutator.mutation??"";let u=0;for(const y of e){const x=Di(y);for(const S of kr){if(!y.abilities.includes(S)||!Fi(y,S,t))continue;const w=Qo(S);if(!w)continue;const T=w.mutationChanceIncreasePercentage*x;u+=T;}}const p=c*(u/100),f=s.length*(p/100)*60;let g=0;for(const y of s){const x=Ix(y.species,y.targetScale,y.mutations,d);g+=x;}const m=s.length>0?g/s.length:0;return {perProc:m,perHour:f*m}}function uM(e,t,n){const r=fe.myGarden.get().crops.mature,i=n?r.filter(c=>n.has(String(c.tileIndex))):r;if(i.length===0)return {perProc:0,perHour:0};let a=0,s=0;for(const c of e){const d=Di(c);for(const u of _r){if(!c.abilities.includes(u)||!Fi(c,u,t))continue;const p=Qo(u);if(!p)continue;const g=dl(p.baseProbability,d)/100*60,m=p.grantedMutations;if(m.length===0)continue;const y=m[0];let x=0,S=0;for(const k of i){if(y==="Gold"||y==="Rainbow"){const C=k.mutations.includes("Gold"),I=k.mutations.includes("Rainbow");if(C||I)continue}else if(k.mutations.includes(y))continue;const v=Math.max(1,Math.floor(k.fruitCount)),_=Ix(k.species,k.targetScale,k.mutations,y);x+=_*v,S+=v;}const T=(S>0?x/S:0)*g;a+=T,s+=g;}}return {perProc:s>0?a/s:0,perHour:a}}function pM(e,t,n){const o=fe.myGarden.get(),r=o.crops.all,i=o.crops.mature,a=n?r.filter(p=>n.has(String(p.tileIndex))):r,s=n?i.filter(p=>n.has(String(p.tileIndex))):i,l=s.length>0?s:a;if(l.length===0)return {expectedCrops:0,expectedCoins:0};let c=0;for(const p of e){const f=Di(p);for(const g of Tr){if(!p.abilities.includes(g)||!Fi(p,g,t))continue;const m=Qo(g);if(!m)continue;const y=dl(m.baseProbability,f);c+=y/100;}}const d=l.length*c;let u=0;for(const p of l){const f=wt(p.species,p.targetScale,p.mutations)*cl;u+=f*c;}return {expectedCrops:d,expectedCoins:u}}function fM(e,t,n){const o=fe.myGarden.get(),r=o.crops.all,i=o.crops.mature,a=n?r.filter(p=>n.has(String(p.tileIndex))):r,s=n?i.filter(p=>n.has(String(p.tileIndex))):i,l=s.length>0?s:a;if(l.length===0)return {expectedCrops:0,expectedCoins:0};let c=0;for(const p of e){const f=Di(p);for(const g of Ar){if(!p.abilities.includes(g)||!Fi(p,g,t))continue;const m=Qo(g);if(!m)continue;const y=dl(m.baseProbability,f);c+=y/100;}}const d=l.length*c;let u=0;for(const p of l){const f=wt(p.species,p.targetScale,p.mutations)*cl;u+=f*c;}return {expectedCrops:d,expectedCoins:u}}const nd={id:"coin",label:"Value",icon:"💰",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=fe.myGarden.get(),o=n.crops.all.length;return o===0?null:{text:`${o} crops`,variant:"neutral",tooltip:`${n.crops.mature.length} mature, ${n.crops.growing.length} growing`,priority:7}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{const i=[e];nd.renderGroupedSlot&&nd.renderGroupedSlot(i,t,n,o,r);},renderGroupedSlot:(e,t,n,o,r)=>{const i=fe.weather.get(),a=i.isActive?i.type:null;n.innerHTML="";const s=Ht("div","value-stats-compact"),l=e.some(f=>Pe(f,Cr)),c=e.some(f=>Pe(f,kr)),d=e.some(f=>Pe(f,_r)),u=e.some(f=>Pe(f,Tr)),p=e.some(f=>Pe(f,Ar));if(!(!l&&!c&&!d&&!u&&!p)){if(l){const f=cM(e,a,r);s.appendChild(Xl("SIZE BOOST",`+${on(f.perProc)}/proc`,`+${on(f.perHour)}/hr`));}if(c){const f=dM(e,a,r);s.appendChild(Xl("MUTATION BOOST",`+${on(f.perProc)}/proc`,`+${on(f.perHour)}/hr`));}if(d){const f=uM(e,a,r);s.appendChild(Xl("GRANTERS",`+${on(f.perProc)}/proc`,`+${on(f.perHour)}/hr`));}if(u){const f=pM(e,a,r);s.appendChild(_f("EXTRA HARVEST",`+${f.expectedCrops.toFixed(1)} crops`,`+${on(f.expectedCoins)} coins`));}if(p){const f=fM(e,a,r);s.appendChild(_f("CROP REFUND",`+${f.expectedCrops.toFixed(1)} crops`,`+${on(f.expectedCoins)} coins`));}n.appendChild(s);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>Pe(o,Cr)||Pe(o,kr)||Pe(o,_r)||Pe(o,Tr)||Pe(o,Ar)),shouldDisplay:(e,t,n)=>{const r=(ll.ALLOWED_PANELS[n.primary]||[]).includes("coin"),i=t.some(a=>Pe(a,Cr)||Pe(a,kr)||Pe(a,_r)||Pe(a,Tr)||Pe(a,Ar));return r&&i},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>Pe(r,Cr))&&o++,n.some(r=>Pe(r,kr))&&o++,n.some(r=>Pe(r,_r))&&o++,n.some(r=>Pe(r,Tr))&&o++,n.some(r=>Pe(r,Ar))&&o++,o}},uo=["DoubleHatch"],po=["PetRefund","PetRefundII"],fo=["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"];function tt(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function Px(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0}:null}function Ke(e,t){return e.abilities.some(n=>t.includes(n))}function Gu(e){return e.hunger>0}function Mx(e){return e.currentStrength/e.maxStrength}function Lx(e,t){return Math.min(100,e*t)}function gM(e){const t=tt("span","sprite-wrapper");try{if(Q.isReady()&&Q.has("pet",e)){const n=Q.toCanvas("pet",e,{scale:.6});n.style.height="32px",n.style.width="auto",n.style.imageRendering="pixelated",t.appendChild(n);}}catch{t.textContent="🥚";}return t}function xa(e,t){const n=tt("div","stat-row");n.appendChild(tt("span","stat__label",e));const o=tt("div","stat__sprite-grid");for(const r of t){if(r.value<=0)continue;const i=tt("div","stat__sprite-item");i.appendChild(gM(r.eggId));const a=tt("span","stat__sprite-value",r.value.toFixed(1));i.appendChild(a),o.appendChild(i);}return n.appendChild(o),n}function Tf(e,t,n,o){const r=tt("div","stat-row");r.appendChild(tt("span","stat__label","PET MUTATION"));const i=tt("span","stat__values-row"),a=tt("span","stat__value stat__value--rainbow",`${e}% (${n})`);a.style.backgroundImage="var(--rainbow-text-gradient)",a.style.webkitBackgroundClip="text",a.style.webkitTextFillColor="transparent",a.style.backgroundClip="text",i.appendChild(a),i.appendChild(tt("span","stat__separator"," | "));const s=tt("span","stat__value stat__value--gold",`${t}% (${o})`);return i.appendChild(s),r.appendChild(i),r}function zu(){const e=fe.myInventory.get(),t=new Map;for(const n of e.items)if(n.itemType==="Egg"&&n.eggId){const o=t.get(n.eggId)||0;t.set(n.eggId,o+(n.quantity||1));}return t}function Hu(e){const t=fe.myGarden.get(),n=new Map,o=e?t.eggs.all.filter(r=>e.has(String(r.tileIndex))):t.eggs.all;for(const r of o){const i=n.get(r.eggId)||0;n.set(r.eggId,i+1);}return n}function Af(e,t){const n=t?Hu(t):zu(),o=[];let r=0;for(const i of e){if(!Gu(i))continue;const a=Mx(i);for(const s of uo){if(!i.abilities.includes(s))continue;const l=Px(s);if(!l)continue;const c=Lx(l.baseProbability,a);r+=c/100;}}for(const[i,a]of n){const s=a*r;o.push({eggId:i,value:s});}return o}function Ef(e,t){const n=t?Hu(t):zu(),o=[];let r=0;for(const i of e){if(!Gu(i))continue;const a=Mx(i);for(const s of po){if(!i.abilities.includes(s))continue;const l=Px(s);if(!l)continue;const c=Lx(l.baseProbability,a);r+=c/100;}}for(const[i,a]of n){const s=a*r;o.push({eggId:i,value:s});}return o}function If(e,t){const n=t?Hu(t):zu(),o=Array.from(n.values()).reduce((f,g)=>f+g,0);let r=0,i=0;for(const f of e){if(!Gu(f))continue;fo.some(m=>f.abilities.includes(m))&&(r+=f.currentStrength*1e-4,i+=f.currentStrength*.001);}const a=J.get("mutations");let s=1,l=.1;if(a){const f=a.Gold,g=a.Rainbow;f?.baseChance!==void 0&&(s=f.baseChance),g?.baseChance!==void 0&&(l=g.baseChance);}const c=s+i,d=l+r,u=o*c/100,p=o*d/100;return {goldChance:c,rainbowChance:d,expectedGold:u,expectedRainbow:p}}const mM={id:"hatch",label:"Hatching",icon:"🥚",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const o=fe.myInventory.get().items.filter(r=>r.itemType==="Egg").reduce((r,i)=>r+(i.quantity||1),0);return o===0?null:{text:`${o} eggs`,variant:"neutral",tooltip:`${o} eggs in inventory`,priority:6}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{n.innerHTML="";const i=tt("div","hatching-stats-compact"),a=Ke(e,uo),s=Ke(e,po),l=Ke(e,fo);if(!a&&!s&&!l)return;const c=[e];if(a){const d=Af(c,r);d.length>0&&i.appendChild(xa("DOUBLE HATCH",d));}if(s){const d=Ef(c,r);d.length>0&&i.appendChild(xa("PET REFUND",d));}if(l){const d=If(c,r),u=d.rainbowChance.toFixed(4),p=d.goldChance.toFixed(2),f=d.expectedRainbow<.01?`~${(d.expectedRainbow*100).toFixed(1)}%e`:d.expectedRainbow.toFixed(2),g=d.expectedGold.toFixed(2);i.appendChild(Tf(u,p,f,g));}n.appendChild(i);},renderGroupedSlot:(e,t,n,o,r)=>{n.innerHTML="";const i=tt("div","hatching-stats-compact"),a=e.some(c=>Ke(c,uo)),s=e.some(c=>Ke(c,po)),l=e.some(c=>Ke(c,fo));if(!(!a&&!s&&!l)){if(a){const c=Af(e,r);c.length>0&&i.appendChild(xa("DOUBLE HATCH",c));}if(s){const c=Ef(e,r);c.length>0&&i.appendChild(xa("PET REFUND",c));}if(l){const c=If(e,r),d=c.rainbowChance.toFixed(4),u=c.goldChance.toFixed(2),p=c.expectedRainbow<.01?`~${(c.expectedRainbow*100).toFixed(1)}%e`:c.expectedRainbow.toFixed(2),f=c.expectedGold.toFixed(2);i.appendChild(Tf(d,u,p,f));}n.appendChild(i);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>Ke(o,uo)||Ke(o,po)||Ke(o,fo)),shouldDisplay:(e,t,n)=>{const r=(ll.ALLOWED_PANELS[n.primary]||[]).includes("hatch"),i=t.some(a=>Ke(a,uo)||Ke(a,po)||Ke(a,fo));return r&&i},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>Ke(r,uo))&&o++,n.some(r=>Ke(r,po))&&o++,n.some(r=>Ke(r,fo))&&o++,o}},Pf=[aM,sM,nd,mM];function hM(e){let t=e;return t=t.replace(/_NEW$/,""),t=t.replace(/^Snowy/,""),t=t.replace(/(I|II|III|IV)$/,""),t}function Nx(e){return new Set(e.abilities.map(hM))}function gr(e,t){if(e.size!==t.size)return  false;for(const n of e)if(!t.has(n))return  false;return  true}function Mf(e,t){return Nx(e).has(t)}function bM(e,t){if(e.length<2)return {shouldGroup:false,matchingPets:[],remainingPets:e};if(t){const a=t==="egg"?"EggGrowthBoost":"PlantGrowthBoost",s=e.filter(c=>Mf(c,a)),l=e.filter(c=>!Mf(c,a));return s.length>=2?{shouldGroup:true,matchingPets:s,remainingPets:l}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const n=e.map(a=>({pet:a,abilities:Nx(a)}));if(e.length===3){const[a,s,l]=n;if(gr(a.abilities,s.abilities)&&gr(a.abilities,l.abilities))return {shouldGroup:true,matchingPets:[a.pet,s.pet,l.pet],remainingPets:[]}}const[o,r,i]=n;return gr(o.abilities,r.abilities)?{shouldGroup:true,matchingPets:[o.pet,r.pet],remainingPets:i?[i.pet]:[]}:i&&gr(o.abilities,i.abilities)?{shouldGroup:true,matchingPets:[o.pet,i.pet],remainingPets:[r.pet]}:i&&gr(r.abilities,i.abilities)?{shouldGroup:true,matchingPets:[r.pet,i.pet],remainingPets:[o.pet]}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const xM=3;function yM(e,t){const n=e.abilities||[],o=c=>n.some(d=>c.includes(d));if((o(ne.DOUBLE_HATCH)||o(ne.PET_REFUND)||o(ne.PET_MUTATION)||o(ne.MAX_STR_BOOST))&&t.some(c=>c.id==="hatch"))return "hatch";if((o(ne.COIN_FINDER)||o(ne.SELL_BOOST)||o(ne.CROP_REFUND_HARVEST)||o(ne.CROP_SIZE)||o(ne.CROP_MUTATION)||o(ne.RARE_GRANTERS)||o(ne.COMMON_GRANTERS))&&t.some(c=>c.id==="coin"))return "coin";if((o(ne.EGG_GROWTH)||o(ne.PLANT_GROWTH))&&t.some(c=>c.id==="growth"))return "growth";const s=e.currentStrength<e.maxStrength,l=o(ne.XP_BOOST);return (s||l)&&t.some(c=>c.id==="xp")?"xp":t[0]?.id||"xp"}class vM{constructor(t){H(this,"expandedTeams",new Map);H(this,"featureUpdateInterval",null);H(this,"options");H(this,"tileFilter");this.options=t;}setTileFilter(t){this.tileFilter=t,this.refreshAllPanels();}refreshAllPanels(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t,n=false,o){const r=this.options.getListContainer(),i=pe.getTeam(t);if(!i||!r)return;const a=pe.getPetsForTeam(i),s=fe.myPets.get(),l=ga(i),c=Pf.filter(T=>!(!T.isAvailable()||T.shouldDisplay&&!T.shouldDisplay(i,a,l)));if(c.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const d=l.primary==="time-reduction"||Ao(a)||Eo(a);let u;if(d){const T=Ao(a),k=Eo(a),b=fe.myGarden.get(),v=b.eggs.growing.length>0,_=b.crops.growing.length>0;T&&k?_&&!v?u="plant":v&&!_?u="egg":u="plant":k?u="plant":T&&(u="egg");}const p=h("div",{className:"team-expanded-container"}),f=[];let g=n?{shouldGroup:false,matchingPets:[],remainingPets:a}:this.analyzeTeamForGrouping(i,a,u);const m=c.some(T=>T.id==="growth"||T.id==="hatch"||T.id==="coin");if(g.shouldGroup&&!m&&(g.matchingPets.every(k=>k.currentStrength>=k.maxStrength)||(g={shouldGroup:false,matchingPets:[],remainingPets:a})),g.shouldGroup&&g.matchingPets.length>=2){const T=c.filter(v=>!v.hasContent||v.hasContent(g.matchingPets,i)),k=T.find(v=>v.id==="growth"||v.id==="hatch"||v.id==="coin")||T[0]||c[0],b=this.createGroupedPetRow(i,g.matchingPets,c,k,u,t);p.appendChild(b.container),f.push(b.cardState);for(const v of g.remainingPets){const _=i.petIds.indexOf(v.id),C=this.createIndividualPetRow(i,v,_,c,u,t);p.appendChild(C.container),f.push(C.cardState);}}else for(let T=0;T<3;T++){const k=i.petIds[T],b=k?s.all.find(_=>_.id===k)??null:null,v=this.createIndividualPetRow(i,b,T,c,u,t,o);p.appendChild(v.container),f.push(v.cardState);}this.expandedTeams.set(t,{cards:f,expandedAt:Date.now(),container:p,growthViewType:u});const y=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(p,a,t,y);const S=pe.getAllTeams().findIndex(T=>T.id===t),w=Array.from(r.children).filter(T=>T instanceof HTMLElement&&T.classList.contains("team-list-item"));S!==-1&&S<w.length&&w[S].insertAdjacentElement("afterend",p),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const o of n.cards)o.shell&&o.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,o,r){const i=pe.getTeam(o),a=i?ga(i):null,s=this.expandedTeams.get(o),l=a?.primary==="time-reduction"||Ao(n)||Eo(n),c=r??(l?"growth":"xp");s&&(s.currentBarMode=c),c==="growth"?this.renderGrowthSummaryBar(t,n,o):this.renderXpProgressBar(t,n);}updateProgressBarForFeature(t,n){const o=this.expandedTeams.get(t);if(!o)return;const r=pe.getTeam(t);if(!r||n!=="xp"&&n!=="growth")return;const i=pe.getPetsForTeam(r),a=n==="xp"?"xp":"growth";if(o.currentBarMode===a)return;const s=o.container.querySelector(".growth-summary-overhaul"),l=o.container.querySelector(".team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)");s&&s.remove(),l&&l.remove(),this.addProgressBar(o.container,i,t,a);}renderXpProgressBar(t,n){if(n.some(r=>r.currentStrength<r.maxStrength)&&n.length>0){const r=Math.round(n.reduce((c,d)=>c+d.currentStrength/d.maxStrength,0)/n.length*100),i=h("div",{className:"team-progress-bar"}),a=r<33?"low":r<67?"medium":"high",s=h("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});s.style.width=`${r}%`;const l=h("div",{className:"team-progress-bar__percent",textContent:`${r}%`});i.appendChild(s),i.appendChild(l),t.prepend(i);}}renderGrowthSummaryBar(t,n,o){const r=this.expandedTeams.get(o),i=r?.growthViewType||"plant",a=fe.myGarden.get(),s=Date.now(),l=i==="egg"?a.eggs.growing:a.crops.growing,c=this.tileFilter?l.filter(L=>this.tileFilter.has(L.tileIndex)):l,d=c.length,u=_u(n),p=Tu(n),f=ci(u).timeReductionPerHour,g=ci(p).timeReductionPerHour,m=Math.round(i==="egg"?f:g);let y=d>0?0:100;if(d>0){const L=(60+m)/60;y=Math.round(c.reduce((O,D)=>{const B=i==="egg"?D.plantedAt:D.startTime,U=i==="egg"?D.maturedAt:D.endTime,E=s-B,A=(U-s)/L,M=E+A,K=M>0?E/M*100:0;return O+Math.min(100,Math.max(0,K))},0)/d);}let x=c.find(L=>L.tileIndex===r?.pinnedItemId);!x&&d>0&&(x=[...c].sort((L,O)=>{const D=i==="egg"?L.maturedAt:L.endTime,B=i==="egg"?O.maturedAt:O.endTime;return D-B})[0]);const S=h("div",{className:"growth-summary-overhaul"}),w=h("div",{className:`team-progress-bar team-progress-bar--${i}`}),T=h("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});T.style.width=`${y}%`;const k=L=>{const O=Math.floor(L/60),D=L%60;return O>0&&D>0?`${O}h ${D}m/h`:O>0?`${O}h/h`:`${D}m/h`};m>0&&((60+m)/60).toFixed(2)+"";const b=h("div",{className:"team-progress-bar__overlay"});b.innerHTML=`
            <span class="bar-percent">${y}%</span>
            <span class="bar-info">${d} total +${k(m)}</span>
        `,w.appendChild(T),w.appendChild(b);const v=h("div",{className:"growth-next-item"});if(x){let L=i==="egg"?x.eggId:x.species;const O=i==="egg"?"pet":"plant";i==="plant"&&L&&(L==="DawnCelestial"&&(L="DawnCelestialCrop"),L==="MoonCelestial"&&(L="MoonCelestialCrop"));const D=i==="egg"?x.maturedAt:x.endTime;i==="egg"?x.plantedAt:x.startTime;const B=(60+m)/60,U=Math.max(0,Math.round((D-s)/B)),E=s+U,P=new Date(E),A=P.getDate()!==new Date().getDate(),M=P.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),K=`${A?"Tomorrow ":""}${M}`,j=Z=>{const _e=Math.floor(Z/1e3),Ie=Math.floor(_e/60),ro=Math.floor(Ie/60);return ro>0?`${ro}h ${Ie%60}m ${_e%60}s`:Ie>0?`${Ie}m ${_e%60}s`:`${_e}s`},V=h("div",{className:"growth-next-sprite"});try{if(Q.isReady()&&Q.has(O,L)){const Z=Q.toCanvas(O,L,{scale:.3});Z.style.height="20px",Z.style.width="auto",Z.style.imageRendering="pixelated",V.appendChild(Z);}else V.textContent=i==="egg"?"🥚":"🌱";}catch(Z){console.warn("[GrowthSummary] Sprite error:",Z),V.textContent=i==="egg"?"🥚":"🌱";}v.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${j(U)}</span>
                    <span class="growth-next-date">| ${K}</span>
                </div>
            `,v.prepend(V);}else v.innerHTML='<span class="empty-text">No items growing</span>';const _=h("div",{className:"growth-overhaul-controls"}),C=i==="egg"?"UncommonEgg":"Carrot",I=i==="egg"?"pet":"plant";let R=null;try{Q.isReady()&&Q.has(I,C)&&(R=Q.toCanvas(I,C,{scale:.35}));}catch{}const F=tM({variant:i==="egg"?"egg":"plant",sprite:R,playSound:true,tooltip:`Switch to ${i==="egg"?"plants":"eggs"}`,onClick:L=>{L.stopPropagation(),r&&(r.growthViewType=i==="egg"?"plant":"egg",r.pinnedItemId=void 0,this.updateGrowthSummary(o));}}),G=h("button",{className:"growth-dropdown-overhaul",textContent:"▼"});G.onclick=L=>{L.stopPropagation(),this.showGrowthDropdown(G,c,i,o);},f>0&&g>0&&_.appendChild(F),_.appendChild(G),S.appendChild(w),S.appendChild(v),S.appendChild(_);const X=t.querySelector(".growth-summary-overhaul");X?X.replaceWith(S):t.prepend(S);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const o=pe.getTeam(t);if(!o)return;const r=pe.getPetsForTeam(o);this.renderGrowthSummaryBar(n.container,r,t);const i=this.analyzeTeamForGrouping(o,r,n.growthViewType),a=n.cards.some(l=>l.slotIndex===-1),s=i.shouldGroup&&i.matchingPets.length>=2;if(a!==s){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}if(a&&s){const l=n.cards.find(c=>c.slotIndex===-1);if(l?.shell&&(l.shell.root.classList.contains("base-pet-card--grouped")?3:l.shell.root.classList.contains("base-pet-card--grouped-2")?2:0)!==i.matchingPets.length){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}}this.updateGroupedCardsViewType(t,n),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const o=pe.getTeam(t);if(!o)return;const r=fe.myPets.get();for(const i of n.cards){const a=o.petIds[i.slotIndex],s=a?r.all.find(l=>l.id===a):null;if(s&&i.shell&&(i.shell.update(s),i.featureData.renderPetSlot))try{const l=i.shell.getContentSlot();i.featureData.renderPetSlot(s,o,l,n.growthViewType,this.tileFilter);const c=s.currentStrength>=s.maxStrength,d=l.children.length>0||l.textContent.trim().length>0;i.shell.setCentered(c&&!d);}catch(l){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,l);}}}updateGroupedCardsViewType(t,n){const o=pe.getTeam(t);if(o){for(const r of n.cards)if(r.slotIndex===-1&&r.shell){const i=r.shell.getContentSlot();if(r.featureData.renderGroupedSlot&&r.shell.root.classList.contains("base-pet-card--grouped")){i.innerHTML="";const a=pe.getPetsForTeam(o);r.featureData.renderGroupedSlot(a,o,i,n.growthViewType,this.tileFilter);const s=i.children.length>0||i.textContent.trim().length>0;r.shell.setCentered(!s);}}}}showGrowthDropdown(t,n,o,r){const i=document.querySelector(".growth-dropdown-menu");if(i){const c=i.getAttribute("data-owner-id")===r&&i.getAttribute("data-view-type")===o;if(i.remove(),c)return}const a=h("div",{className:"growth-dropdown-menu"});if(a.setAttribute("data-owner-id",r),a.setAttribute("data-view-type",o),n.length===0){const c=h("div",{className:"growth-dropdown-option"});c.textContent="No items growing",a.appendChild(c);}else {const c=o==="egg"?"pet":"plant";n.forEach(d=>{const u=d.tileIndex;let p=o==="egg"?d.eggId:d.species;o==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=h("div",{className:"growth-dropdown-option"}),g=h("span",{className:"dropdown-sprite"});try{if(Q.isReady()&&Q.has(c,p)){const w=Q.toCanvas(c,p,{scale:.3});w.style.height="16px",w.style.width="auto",w.style.imageRendering="pixelated",g.appendChild(w);}else g.textContent=o==="egg"?"🥚":"🌱";}catch{g.textContent=o==="egg"?"🥚":"🌱";}const m=o==="egg"?d.maturedAt:d.endTime,x=new Date(m).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),S=h("span",{className:"dropdown-text"});S.textContent=`${p} - ${x}`,f.appendChild(g),f.appendChild(S),f.onclick=w=>{w.stopPropagation();const T=this.expandedTeams.get(r);T&&(T.pinnedItemId=u,this.updateGrowthSummary(r)),a.remove();},a.appendChild(f);});}const s=t.getBoundingClientRect();a.style.position="fixed",a.style.bottom=`${window.innerHeight-s.top+4}px`,a.style.top="auto",a.style.left="auto",a.style.right=`${window.innerWidth-s.right}px`,a.style.marginTop="0",a.style.zIndex="999999",document.body.appendChild(a);const l=c=>{!a.contains(c.target)&&c.target!==t&&(a.remove(),document.removeEventListener("click",l,true));};setTimeout(()=>document.addEventListener("click",l,true),10);}createIndividualPetRow(t,n,o,r,i,a,s){const l=n?r.filter(k=>!k.hasContent||k.hasContent(n,t)):r,c=l.length>0?l:r;let d=c[0];if(s)d=c.find(k=>k.id===s)||c[0];else if(n){const k=yM(n,c);d=c.find(b=>b.id===k)||c[0];}else {const b=ga(t)?.suggestedFeatures||[];let v=false;for(const _ of b){const C=c.find(I=>I.id===_);if(C){d=C,v=true;break}}v||(i?d=c.find(_=>_.id==="growth")||c[0]:d=c.find(_=>_.id==="xp")||c[0]);}const u=h("div",{className:"expanded-pet-row"}),p=h("div",{className:"pet-row__header"}),f=h("button",{textContent:"<",className:"pet-row__nav"}),g=h("div",{textContent:`${d.icon} ${d.label.toUpperCase()}`,className:"pet-label"}),m=h("button",{textContent:">",className:"pet-row__nav"});let y=null;n&&(y=new Q2(n));const x={slotIndex:o,currentFeatureId:d.id,shell:y,featureData:d},S=k=>{const b=c[k];if(b.id==="growth"){const v=pe.getPetsForTeam(t),_=this.expandedTeams.get(a),C=this.analyzeTeamForGrouping(t,v,_?.growthViewType);if(C.shouldGroup&&C.matchingPets.length>=2){this.collapseAndReexpandForGrowth(a);return}}if(g.textContent=`${b.icon} ${b.label.toUpperCase()}`,y&&n){const v=y.getContentSlot();if(v.innerHTML="",b.renderPetSlot){const I=this.expandedTeams.get(a);b.renderPetSlot(n,t,v,I?.growthViewType,this.tileFilter);}const _=n.currentStrength>=n.maxStrength,C=v.children.length>0||v.textContent.trim().length>0;y.setCentered(_&&!C);}x.currentFeatureId=b.id,x.featureData=b,p.className=`pet-row__header pet-row__header--${b.id}`,this.updateProgressBarForFeature(a,b.id);};p.className=`pet-row__header pet-row__header--${d.id}`;let w=c.findIndex(k=>k.id===d.id);f.addEventListener("click",k=>{k.stopPropagation(),w=(w-1+c.length)%c.length,S(w);}),m.addEventListener("click",k=>{k.stopPropagation(),w=(w+1)%c.length,S(w);}),c.length>1&&p.appendChild(f),p.appendChild(g),c.length>1&&p.appendChild(m);let T;if(y&&n){if(T=y.build(),d.renderPetSlot){const k=y.getContentSlot();d.renderPetSlot(n,t,k,i,this.tileFilter);const b=n.currentStrength>=n.maxStrength,v=k.children.length>0||k.textContent.trim().length>0;y.setCentered(b&&!v);}}else T=h("div",{className:"pet-row__content pet-row__content--empty"}),T.innerHTML=`
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;return u.appendChild(p),u.appendChild(T),x.container=u,{container:u,cardState:x}}createGroupedPetRow(t,n,o,r,i,a){const s=o.filter(v=>!v.hasContent||v.hasContent(n,t)),l=s.length>0?s:o;if(this.shouldUseCombinedPanel(l,n,t,i))return this.createCombinedPanelRow(t,n,l,i,a);const c=h("div",{className:"expanded-pet-row expanded-pet-row--grouped"}),d=h("div",{className:"pet-row__header"}),u=h("button",{textContent:"<",className:"pet-row__nav"}),p=h("div",{textContent:`${r.icon} ${r.label.toUpperCase()}`,className:"pet-label"}),f=h("button",{textContent:">",className:"pet-row__nav"}),g=h("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),m=h("div",{className:"base-pet-card__left"}),y=h("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const v of n)try{const _=v.mutations||[];if(Q.has("pet",v.petSpecies)){const C=Q.toCanvas("pet",v.petSpecies,{mutations:_,scale:1,boundsMode:"padded"});C.style.imageRendering="pixelated",y.appendChild(C);}}catch{}m.appendChild(y);const x=h("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const v of n){const C=v.currentStrength>=v.maxStrength?`MAX ${v.maxStrength}`:`STR ${v.currentStrength}/${v.maxStrength}`,I=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});x.appendChild(I);}m.appendChild(x),g.appendChild(m);const S=h("div",{className:"base-pet-card__content"});g.appendChild(S);const w={root:g,getContentSlot:()=>S,setCentered:v=>{g.classList.toggle("base-pet-card--centered",v);},destroy:()=>{g.remove();},update:()=>{x.innerHTML="";for(const v of n){const C=v.currentStrength>=v.maxStrength?`MAX ${v.maxStrength}`:`STR ${v.currentStrength}/${v.maxStrength}`,I=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});x.appendChild(I);}}},T={slotIndex:-1,currentFeatureId:r.id,shell:w,featureData:r},k=v=>{const _=l[v];if(_.id==="xp"&&!n.every(R=>R.currentStrength>=R.maxStrength)){this.collapseAndReexpandForXP(a);return}if(p.textContent=`${_.icon} ${_.label.toUpperCase()}`,S.innerHTML="",_.renderGroupedSlot){const I=this.expandedTeams.get(a);_.renderGroupedSlot(n,t,S,I?.growthViewType,this.tileFilter);}else if(_.renderPetSlot){const I=this.expandedTeams.get(a);_.renderPetSlot(n[0],t,S,I?.growthViewType,this.tileFilter);}const C=S.children.length>0||S.textContent.trim().length>0;w.setCentered(!C),T.currentFeatureId=_.id,T.featureData=_,d.className=`pet-row__header pet-row__header--${_.id}`;};d.className=`pet-row__header pet-row__header--${r.id}`;let b=l.findIndex(v=>v.id===r.id);return u.addEventListener("click",v=>{v.stopPropagation(),b=(b-1+l.length)%l.length,k(b);}),f.addEventListener("click",v=>{v.stopPropagation(),b=(b+1)%l.length,k(b);}),l.length>1&&d.appendChild(u),d.appendChild(p),l.length>1&&d.appendChild(f),r.renderGroupedSlot?r.renderGroupedSlot(n,t,S,i,this.tileFilter):r.renderPetSlot&&r.renderPetSlot(n[0],t,S,i,this.tileFilter),c.appendChild(d),c.appendChild(g),g.classList.add("base-pet-card--grouped"),{container:c,cardState:{...T,container:c}}}collapseAndReexpandForXP(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,true,"xp"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,true,"xp"),n.container.style.opacity="1";});});}collapseAndReexpandForGrowth(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,false,"growth"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,false,"growth"),n.container.style.opacity="1";});});}rebuildInPlace(t,n,o){const r=this.expandedTeams.get(t);if(!r)return;const i=pe.getTeam(t);if(!i)return;const a=pe.getPetsForTeam(i),s=fe.myPets.get(),l=this.getAvailableFeaturesForTeam(i,a),c=r.growthViewType;for(const m of r.cards)m.shell&&m.shell.destroy(),m.container&&m.container.parentNode&&m.container.remove();const d=r.container.querySelector(".team-progress-bar");d&&d.remove();const u=[];let p=n?{shouldGroup:false,matchingPets:[],remainingPets:a}:this.analyzeTeamForGrouping(i,a,c);const f=l.some(m=>m.id==="growth"||m.id==="hatch"||m.id==="coin");if(p.shouldGroup&&!f&&(p.matchingPets.every(y=>y.currentStrength>=y.maxStrength)||(p={shouldGroup:false,matchingPets:[],remainingPets:a})),p.shouldGroup&&p.matchingPets.length>=2){const m=l.filter(S=>!S.hasContent||S.hasContent(p.matchingPets,i)),y=m.find(S=>S.id==="growth"||S.id==="hatch"||S.id==="coin")||m[0]||l[0],x=this.createGroupedPetRow(i,p.matchingPets,l,y,c,t);r.container.appendChild(x.container),u.push(x.cardState);for(const S of p.remainingPets){const w=i.petIds.indexOf(S.id),T=this.createIndividualPetRow(i,S,w,l,c,t);r.container.appendChild(T.container),u.push(T.cardState);}}else for(let m=0;m<3;m++){const y=i.petIds[m],x=y?s.all.find(w=>w.id===y)??null:null,S=this.createIndividualPetRow(i,x,m,l,c,t,o);r.container.appendChild(S.container),u.push(S.cardState);}r.cards=u;const g=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(r.container,a,t,g);}getAvailableFeaturesForTeam(t,n){return ga(t),Pf.filter(o=>o.isAvailable())}countTotalRows(t,n,o,r){let i=0;for(const a of t)a.countRows?i+=a.countRows(n,o,r):a.hasContent?.(n,o)&&(i+=1);return i}shouldUseCombinedPanel(t,n,o,r){return t.length<2?false:this.countTotalRows(t,n,o,r)<=xM}createCombinedPanelRow(t,n,o,r,i){const a=h("div",{className:"expanded-pet-row expanded-pet-row--combined"}),s=h("div",{className:"pet-row__header pet-row__header--combined"}),l=h("span",{className:"combined-panel__icons",textContent:o.map(x=>x.icon).join(" ")});s.appendChild(l);const c=h("div",{textContent:"COMBINED",className:"pet-label"});s.appendChild(c);const d=h("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),u=h("div",{className:"base-pet-card__left"}),p=h("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const x of n)try{const S=x.mutations||[];if(Q.has("pet",x.petSpecies)){const w=Q.toCanvas("pet",x.petSpecies,{mutations:S,scale:1,boundsMode:"padded"});w.style.imageRendering="pixelated",p.appendChild(w);}}catch{}u.appendChild(p);const f=h("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const x of n){const w=x.currentStrength>=x.maxStrength?`MAX ${x.maxStrength}`:`STR ${x.currentStrength}/${x.maxStrength}`,T=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:w});f.appendChild(T);}u.appendChild(f),d.appendChild(u);const g=h("div",{className:"base-pet-card__content base-pet-card__content--combined"});for(const x of o){const S=h("div",{className:`combined-section combined-section--${x.id}`}),w=h("span",{className:"combined-section__icon",textContent:x.icon});S.appendChild(w);const T=h("div",{className:"combined-section__content"});x.renderGroupedSlot?x.renderGroupedSlot(n,t,T,r,this.tileFilter):x.renderPetSlot&&x.renderPetSlot(n[0],t,T,r,this.tileFilter),(T.children.length>0||T.textContent?.trim())&&(S.appendChild(T),g.appendChild(S));}d.appendChild(g);const y={slotIndex:-1,currentFeatureId:"combined",shell:{root:d,getContentSlot:()=>g,setCentered:x=>{d.classList.toggle("base-pet-card--centered",x);},destroy:()=>{d.remove();},update:()=>{f.innerHTML="";for(const x of n){const w=x.currentStrength>=x.maxStrength?`MAX ${x.maxStrength}`:`STR ${x.currentStrength}/${x.maxStrength}`,T=h("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:w});f.appendChild(T);}},build:()=>d},container:a,featureData:o[0]};return a.appendChild(s),a.appendChild(d),{container:a,cardState:y}}analyzeTeamForGrouping(t,n,o){const r=c=>(c.abilities||[]).some(u=>ne.MAX_STR_BOOST.includes(u)||ne.PET_MUTATION.includes(u)||ne.DOUBLE_HATCH.includes(u)||ne.PET_REFUND.includes(u)),i=n.filter(r);if(i.length>=2&&i.length<=3){const c=n.filter(d=>!i.includes(d));return {shouldGroup:true,matchingPets:i,remainingPets:c}}const a=["DoubleHarvest","ProduceRefund","ProduceRefundII"],s=c=>(c.abilities||[]).some(u=>a.includes(u)),l=n.filter(s);if(l.length>=2&&l.length<=3&&!l.some(d=>(d.abilities||[]).some(p=>ne.EGG_GROWTH.includes(p)||ne.PLANT_GROWTH.includes(p)||ne.CROP_MUTATION.includes(p)))){const d=n.filter(u=>!l.includes(u));return {shouldGroup:true,matchingPets:l,remainingPets:d}}return bM(n,o)}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=qe.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}const wM={calculationScope:"all",selectedTileIndices:[],expandedTeamIds:[]};let De=null,Kl=null;async function SM(){return De||(Kl||(Kl=Jn("tab-trackers",{version:3,defaults:wM})),De=await Kl,De)}function Lo(){if(!De)throw new Error("[TrackersState] State not initialized. Call initTrackersState() first.");return De}function CM(e){if(!De)return;const t=De.get();t.expandedTeamIds.includes(e)?De.update({expandedTeamIds:t.expandedTeamIds.filter(o=>o!==e)}):De.update({expandedTeamIds:[...t.expandedTeamIds,e]});}function kM(e){De&&De.update({calculationScope:e});}function Yl(e){if(!De)return;const t=De.get();t.selectedTileIndices.includes(e)?De.update({selectedTileIndices:t.selectedTileIndices.filter(o=>o!==e)}):De.update({selectedTileIndices:[...t.selectedTileIndices,e]});}function _M(){De&&De.update({selectedTileIndices:[]});}class TM{constructor(t={}){H(this,"dropdown",null);H(this,"options");H(this,"isDragging",false);H(this,"dragSelectMode",null);this.options=t,document.addEventListener("pointerup",()=>{this.isDragging=false,this.dragSelectMode=null;});}build(){if(this.dropdown)return this.dropdown;this.dropdown=h("div",{className:"tile-grid-selector"});const t=this.buildHeader();this.dropdown.appendChild(t);const n=this.buildGrids();return this.dropdown.appendChild(n),this.dropdown}show(){this.dropdown||this.build(),this.dropdown&&!this.dropdown.parentElement&&(this.options.container||document.body).appendChild(this.dropdown),this.dropdown&&this.dropdown.classList.add("tile-grid-selector--visible"),this.renderGrids();}hide(){this.dropdown&&this.dropdown.classList.remove("tile-grid-selector--visible");}destroy(){this.dropdown?.parentElement&&this.dropdown.parentElement.removeChild(this.dropdown),this.dropdown=null;}buildHeader(){const t=h("div",{className:"tile-grid-selector__header"}),o=Lo().get().selectedTileIndices.length,r=h("div",{className:"tile-grid-selector__info",textContent:`${o} tile${o!==1?"s":""} selected`}),i=h("button",{className:"tile-grid-selector__btn",textContent:"Clear All"});i.addEventListener("click",()=>{_M(),this.renderGrids(),this.options.onChange&&this.options.onChange();});const a=h("button",{className:"tile-grid-selector__close-btn",textContent:"×",title:"Close"});return a.addEventListener("click",()=>{this.hide();}),t.appendChild(r),t.appendChild(i),t.appendChild(a),t}buildGrids(){const t=h("div",{className:"tile-grid-selector__grids"}),n=h("div",{className:"tile-grid-selector__grid",id:"tile-grid-1"}),o=h("div",{className:"tile-grid-selector__grid",id:"tile-grid-2"});return t.appendChild(n),t.appendChild(o),t}renderGrids(){const t=this.dropdown?.querySelector("#tile-grid-1"),n=this.dropdown?.querySelector("#tile-grid-2");if(!t||!n)return;t.innerHTML="",n.innerHTML="";const o=fe.myGarden.get(),r=fe.gameMap.get(),i=Lo().get();if(!o.garden||!r)return;const a=o.mySlotIndex;if(a===null)return;const s=r.userSlots[a];if(!s)return;const l=s.dirtTiles,c=new Set(i.selectedTileIndices),d=o.garden.tileObjects,u=[...new Set(l.map(b=>b.position.x))].sort((b,v)=>b-v);let p=0,f=u[Math.floor(u.length/2)];for(let b=1;b<u.length;b++){const v=u[b]-u[b-1];v>p&&(p=v,f=(u[b]+u[b-1])/2);}const g=l.filter(b=>b.position.x<f),m=l.filter(b=>b.position.x>=f),y=b=>{if(b.length===0)return {minX:0,maxX:9,minY:0,maxY:9};const v=b.map(C=>C.position.x),_=b.map(C=>C.position.y);return {minX:Math.min(...v),maxX:Math.max(...v),minY:Math.min(..._),maxY:Math.max(..._)}},x=y(g),S=y(m),w=new Map,T=new Map;for(const b of g){const v=b.position.x-x.minX,_=b.position.y-x.minY;w.set(`${_},${v}`,b);}for(const b of m){const v=b.position.x-S.minX,_=b.position.y-S.minY;T.set(`${_},${v}`,b);}for(let b=0;b<10;b++)for(let v=0;v<10;v++){const _=w.get(`${b},${v}`)||null,C=this.buildTileElement(_,_&&d[_.localIndex.toString()]||null,_?c.has(_.localIndex.toString()):false);t.appendChild(C);}for(let b=0;b<10;b++)for(let v=0;v<10;v++){const _=T.get(`${b},${v}`)||null,C=this.buildTileElement(_,_&&d[_.localIndex.toString()]||null,_?c.has(_.localIndex.toString()):false);n.appendChild(C);}const k=this.dropdown?.querySelector(".tile-grid-selector__info");k&&(k.textContent=`${c.size} tile${c.size!==1?"s":""} selected`);}buildTileElement(t,n,o){const r=h("button",{className:"tile-grid-selector__tile"});if(!t)return r.classList.add("tile-grid-selector__tile--null"),r.disabled=true,r;if(o&&r.classList.add("tile-grid-selector__tile--selected"),n?r.classList.add("tile-grid-selector__tile--occupied"):r.classList.add("tile-grid-selector__tile--empty"),n&&Q.isReady()){const i=this.getSpriteForTileObject(n);i&&r.appendChild(i);}return r.addEventListener("pointerdown",i=>{i.preventDefault(),this.isDragging=true,this.dragSelectMode=o?"deselect":"select",Yl(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.();}),r.addEventListener("pointerenter",()=>{if(!this.isDragging||!this.dragSelectMode)return;const a=Lo().get().selectedTileIndices.includes(t.localIndex.toString());this.dragSelectMode==="select"&&!a?(Yl(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.()):this.dragSelectMode==="deselect"&&a&&(Yl(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.());}),r}getSpriteForTileObject(t){try{if(t.objectType==="plant"){let n=t.species;if(n==="DawnCelestial"&&(n="DawnCelestialCrop"),n==="MoonCelestial"&&(n="MoonCelestialCrop"),Q.has("plant",n)){const o=Q.toCanvas("plant",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}else if(t.objectType==="egg"){const n=t.eggId;if(Q.has("pet",n)){const o=Q.toCanvas("pet",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}else if(t.objectType==="decor"){const n=t.decorId;if(Q.has("decor",n)){const o=Q.toCanvas("decor",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}}catch(n){console.warn("[TileGridSelector] Failed to load sprite:",n);}return null}}class AM{constructor(t){H(this,"card",null);H(this,"scopeControl",null);H(this,"scopeContainer",null);H(this,"content",null);H(this,"listContainer",null);H(this,"options");H(this,"tileGridOverlay",null);H(this,"expansionHandler");this.options=t,this.expansionHandler=new vM({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createCard()}destroy(){this.expansionHandler.destroy(),this.scopeControl&&(this.scopeControl.destroy(),this.scopeControl=null),this.tileGridOverlay&&(this.tileGridOverlay.destroy?.(),this.tileGridOverlay=null),this.card=null,this.scopeContainer=null,this.content=null,this.listContainer=null;}render(){if(!this.card)return;if(!pe.isEnabled()){this.renderDisabledState();return}this.scopeContainer&&(this.scopeContainer.style.display="flex"),this.ensureScopeControl(),this.renderTeamList();}getListContainer(){return this.listContainer}createCard(){const t=h("div",{className:"tracker-card-wrapper"});this.scopeContainer=h("div",{className:"tracker-card__scope-container"}),t.appendChild(this.scopeContainer),this.content=h("div",{className:"tracker-card__content"}),t.appendChild(this.content);const n=Ee({title:"Trackers",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureScopeControl(){if(!this.scopeContainer)return;const t=Lo().get();if(!this.scopeControl){this.scopeControl=kx({segments:[{id:"all",label:"All Tiles"},{id:"selected",label:"Selected Tiles"}],selected:t.calculationScope,onChange:n=>{const o=n;kM(o),o==="selected"?this.showTileGridOverlay():this.tileGridOverlay?.hide(),this.renderTeamList();}}),this.scopeContainer.appendChild(this.scopeControl);return}this.scopeControl.getSelected()!==t.calculationScope&&this.scopeControl.select(t.calculationScope);}showTileGridOverlay(){this.tileGridOverlay||(this.tileGridOverlay=new TM({onChange:()=>{this.renderTeamList();},container:this.scopeContainer||void 0}),this.tileGridOverlay.build()),this.tileGridOverlay.show();}renderDisabledState(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.listContainer=null,this.scopeContainer&&(this.scopeContainer.style.display="none");const t=h("div",{className:"tracker-card__disabled-state"}),n=h("div",{textContent:"Pet Teams feature is not enabled",className:"tracker-card__disabled-message"});t.appendChild(n),this.content.replaceChildren(t);}renderTeamList(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.content.replaceChildren();const t=pe.getAllTeams(),n=pe.getActiveTeamId(),o=Lo().get(),r=o.calculationScope==="selected"?new Set(o.selectedTileIndices):void 0;if(this.expansionHandler.setTileFilter(r),t.length===0){this.renderEmptyState();return}this.listContainer=h("div",{className:"tracker-card__list-container"}),t.forEach(i=>{const a=n===i.id,s=o.expandedTeamIds.includes(i.id),l=Cx({team:i,isActive:a,hideDragHandle:true,isNameEditable:false,isExpanded:s,onExpandClick:()=>{this.handleExpandToggle(i.id);}});l.setAttribute("data-team-id",i.id),l.addEventListener("click",c=>{c.stopPropagation();}),this.listContainer.appendChild(l),s&&this.expansionHandler.expand(i.id);}),this.content.appendChild(this.listContainer);}renderEmptyState(){if(!this.content)return;const t=h("div",{className:"tracker-card__empty-state"}),n=h("div",{textContent:"No teams created yet.",className:"tracker-card__empty-message"}),o=h("div",{textContent:"Create teams in the Pets tab to view trackers.",className:"tracker-card__empty-hint"});t.appendChild(n),t.appendChild(o),this.content.appendChild(t);}handleExpandToggle(t){CM(t),this.expansionHandler.toggle(t);const n=this.listContainer?.querySelector(`[data-team-id="${t}"]`);if(n){const o=Lo().get().expandedTeamIds.includes(t),r=n.querySelector(".team-list-item__expand");r&&r.classList.toggle("team-list-item__expand--open",o);}}}const EM=`
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
`,IM=`
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
`,PM=`
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

`,MM=`
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
`,LM=`
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
`,NM=`
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
`;class RM extends Xt{constructor(n){super({id:"tab-trackers",label:"Trackers"});H(this,"deps");H(this,"trackerCardPart",null);H(this,"unsubscribeMyPets");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await ot(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>Ks);return {MGSprite:a}},void 0);await o.init(),await SM();const r=n.getRootNode();this.injectStyles(r);const i=this.createGrid("12px");i.id="trackers",n.appendChild(i),this.initializeTrackerCard(i),this.unsubscribeMyPets=fe.myPets.subscribeStable(()=>{this.trackerCardPart?.render();});}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.trackerCardPart&&(this.trackerCardPart.destroy(),this.trackerCardPart=null);}unmount(){this.destroy().catch(console.error),super.unmount();}injectStyles(n){Ae(n,EM,"tracker-card-styles"),Ae(n,IM,"tile-grid-overlay-styles"),Ae(n,PM,"team-card-styles"),Ae(n,MM,"feature-card-styles"),Ae(n,LM,"team-xp-panel-styles"),Ae(n,NM,"growth-panel-styles"),Ae(n,Ax,"base-pet-card-styles"),Ae(n,Bu,"badge-styles"),Ae(n,Ex,"arcade-button-styles"),Ae(n,_x,"gemini-icon-button-styles");}initializeTrackerCard(n){this.trackerCardPart||(this.trackerCardPart=new AM({setHUDOpen:this.deps?.setHUDOpen}));const o=this.trackerCardPart.build();n.appendChild(o),this.trackerCardPart.render();}}const OM=`
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
`;async function $M(){}const FM={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},Lf={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},ju={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},Uu={seed:"seed",tool:null,egg:null,decor:null},Nf={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function DM(e,t){try{const n=ju[t],o=J.get(n);if(!o||typeof o!="object")return null;const r=o[e];if(!r)return null;const i=Uu[t];return (i?r[i]:r)?.spriteId??null}catch(n){return console.warn(`[ShopNotifier] Failed to get spriteId for ${e}:`,n),null}}function BM(e,t){try{const n=ju[t],o=J.get(n);if(!o||typeof o!="object")return null;const r=o[e];if(!r)return null;const i=Uu[t],s=(i?r[i]:r)?.rarity;return s?String(s).toLowerCase():null}catch{return null}}function GM(e,t){try{const n=ju[t],o=J.get(n);if(!o||typeof o!="object")return e;const r=o[e];if(!r)return e;const i=Uu[t];return (i?r[i]:r)?.name??e}catch(n){return console.warn(`[ShopNotifier] Failed to get name for ${e}:`,n),e}}function zM(e){const n=$t.getTrackedItems().filter(o=>o.shopType===e).map(o=>o.itemId);return new Set(n)}function Rx(e,t){const n=zM(t);return e.items.map(o=>({...o,rarity:BM(o.id,t),spriteId:DM(o.id,t),itemName:GM(o.id,t),isTracked:n.has(o.id)}))}function HM(e,t){const n=Rx(e,t);return vi({columns:[{key:"icon",header:"",width:"40px",align:"center",sortable:false,render:i=>{const a=h("div",{className:"shop-item-icon"});if(i.spriteId){const s=Q.toCanvas(i.spriteId);s?(s.style.maxWidth="32px",s.style.maxHeight="32px",s.style.width="auto",s.style.height="auto",s.style.imageRendering="auto",s.style.display="block",a.appendChild(s)):a.textContent=Lf[t];}else a.textContent=Lf[t];return a}},{key:"itemName",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(i,a)=>i.itemName.localeCompare(a.itemName,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",width:"120px",align:"left",sortable:true,sortFn:(i,a)=>{const s=i.rarity?Nf[i.rarity.toLowerCase()]??999:999,l=a.rarity?Nf[a.rarity.toLowerCase()]??999:999;return s-l},render:i=>{const a=h("div",{className:"shop-item-rarity"}),s=Xo({variant:"rarity",rarity:i.rarity});return a.appendChild(s.root),a}},{key:"toggle",header:"Track",width:"60px",align:"center",sortable:false,render:i=>{const a=h("div",{className:"shop-item-toggle"}),s=hn({checked:i.isTracked,size:"sm",onChange:l=>{i.isTracked=l,l?$t.addTrackedItem(t,i.id):$t.removeTrackedItem(t,i.id);}});return a.appendChild(s.root),a}}],data:n,maxHeight:360,stickyHeader:true,zebra:true,compact:true,getRowId:i=>i.id})}function jM(e){const{shopType:t}=e,n=no(),o=n.getShop(t);let r=null,i=null,a=null;function s(){return i=HM(o,t),r=Ee({id:`shop-card-${t}`,title:FM[t],expandable:true,defaultExpanded:true,stateKey:`shop-${t}`,variant:"soft",padding:"none",divider:false},i.root),r.classList.add(`shop-card--${t}`),r}function l(){if(!i)return;const d=n.getShop(t),u=Rx(d,t);i.setData(u);}function c(){a&&(a(),a=null),i&&(i.destroy(),i=null),r=null;}return a=n.subscribeStable(d=>{const u=d.byType[t];u&&JSON.stringify(o.items)!==JSON.stringify(u.items)&&(Object.assign(o,u),l());}),{root:s(),refresh:l,destroy:c}}const UM=["seed","tool","egg","decor"];class WM extends Xt{constructor(){super({id:"tab-shop-notifier",label:"Shop Alerts"});H(this,"sectionElement",null);H(this,"shopCards",new Map);}async build(n){await $M();const o=n.getRootNode();Ae(o,OM,"shop-notifier-styles");const r=this.createGrid("12px");r.id="shop-notifier-section",this.sectionElement=r;const{MGData:i}=await ot(async()=>{const{MGData:a}=await Promise.resolve().then(()=>Ks);return {MGData:a}},void 0);await Promise.all([i.waitFor("plants"),i.waitFor("items"),i.waitFor("eggs"),i.waitFor("decor")]),this.buildParts(),n.appendChild(r);}render(n){super.render(n);}buildParts(){if(this.sectionElement)for(const n of UM){const o=jM({shopType:n});this.shopCards.set(n,o),this.sectionElement.appendChild(o.root);}}async destroy(){for(const n of this.shopCards.values())n.destroy?.();this.shopCards.clear(),this.sectionElement=null;}}const VM=`
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
`,Rf={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function qM(){const e=await Jn("tab-alerts",{version:1,defaults:Rf,sanitize:r=>({ui:{expandedCards:Oo(Rf.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Oo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}const XM={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},Of={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},KM={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},YM={seed:"seed",tool:null,egg:null,decor:null},$f={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function Wu(e,t,n){try{const o=KM[t],r=J.get(o);if(!r||typeof r!="object")return null;const i=r[e];if(!i||typeof i!="object")return null;const a=YM[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch(o){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,o),null}}function JM(e,t){return Wu(e,t,"spriteId")}function QM(e,t){const n=Wu(e,t,"rarity");return n?String(n).toLowerCase():null}function ZM(e,t){return Wu(e,t,"name")??e}function eL(){const e=$t.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function Ff(e){const t=eL(),n=[],o=["seed","tool","egg","decor"];for(const r of o){const i=e.byType[r];if(i)for(const a of i.items){const s=`${r}:${a.id}`;n.push({...a,shopType:r,rarity:QM(a.id,r),spriteId:JM(a.id,r),itemName:ZM(a.id,r),isTracked:t.has(s),hasCustomSound:de.hasItemCustomSound("shop",a.id,r)});}}return n}const tL=`
  /* Container */
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    pointer-events: none;
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
  }

  .modal-container.is-open .modal-backdrop {
    opacity: 1;
    backdrop-filter: blur(4px);
  }

  /* Dialog */
  .modal-dialog {
    background: var(--bg);
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

  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--fg);
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
`,nL={size:"md",closeOnBackdrop:true,closeOnEscape:true};function oL(e){const t={...nL,...e};let n=false,o=null,r=null,i=null,a=null,s=null;function l(){g(),t.onClose?.();}function c(k){t.closeOnBackdrop&&k.target===r&&l();}function d(k){t.closeOnEscape&&k.key==="Escape"&&l();}function u(){if(!i)return;const k=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),b=Array.from(i.querySelectorAll(k));if(b.length===0)return;const v=b[0],_=b[b.length-1];v.focus();const C=I=>{I.key==="Tab"&&(I.shiftKey?document.activeElement===v&&(I.preventDefault(),_.focus()):document.activeElement===_&&(I.preventDefault(),v.focus()));};i.addEventListener("keydown",C),a=()=>{i?.removeEventListener("keydown",C);};}function p(){o=h("div",{className:"modal-container"}),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-labelledby","modal-title");const k=h("style");k.textContent=tL,o.appendChild(k),r=h("div",{className:"modal-backdrop"}),r.addEventListener("click",c),o.appendChild(r),i=h("div",{className:`modal-dialog modal-dialog--${t.size}`});const b=h("div",{className:"modal-header"}),v=h("h2",{className:"modal-title",id:"modal-title"},t.title);b.appendChild(v);const _=h("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");_.addEventListener("click",l),b.appendChild(_),i.appendChild(b);const C=h("div",{className:"modal-body"});if(C.appendChild(t.content),i.appendChild(C),t.footer){const I=h("div",{className:"modal-footer"});I.appendChild(t.footer),i.appendChild(I);}return r.appendChild(i),o}function f(){if(!o)return;const k=o.getBoundingClientRect(),b=window.innerWidth,v=window.innerHeight;Math.abs(k.left)>1||Math.abs(k.top)>1||Math.abs(k.width-b)>1||Math.abs(k.height-v)>1?(o.style.left=`${-k.left}px`,o.style.top=`${-k.top}px`,o.style.width=`${b}px`,o.style.height=`${v}px`):(o.style.left="0px",o.style.top="0px",o.style.width="100%",o.style.height="100%");}function g(){!n||!o||(o.classList.remove("is-open"),n=false,a&&(a(),a=null),document.removeEventListener("keydown",d),s?.(),s=null,setTimeout(()=>{o?.remove();},200));}function m(){n&&g(),r?.removeEventListener("click",c),a&&(a(),a=null),document.removeEventListener("keydown",d),s?.(),s=null,o?.remove(),o=null,r=null,i=null;}const y=p();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(y),requestAnimationFrame(f);const T=()=>f();return window.addEventListener("resize",T),s=()=>{window.removeEventListener("resize",T);},requestAnimationFrame(()=>{o?.classList.add("is-open"),n=true,u(),document.addEventListener("keydown",d);}),{root:y,close:g,destroy:m}}function Ox(e={}){const{id:t,min:n=0,max:o=100,step:r=1,value:i=n,label:a,showValue:s=true,disabled:l=false,onInput:c,onChange:d}=e,u=h("div",{className:"slider"}),p=h("div",{className:"slider-row"}),f=h("div",{className:"slider-track"}),g=h("div",{className:"slider-range"});f.appendChild(g);const m=h("input",{id:t,type:"range",min:String(n),max:String(o),step:String(r),value:String(i),disabled:l});m.addEventListener("input",v=>{x(),c?.(w(),v);}),m.addEventListener("change",v=>d?.(w(),v));function y(){const v=o-n;return v===0?0:(w()-n)/v}function x(){const v=Math.max(0,Math.min(1,y()));g.style.width=`${v*100}%`,b&&(b.textContent=String(w()));}function S(v){m.value=String(v),x();}function w(){return Number(m.value)}function T(v){m.disabled=!!v;}let k=null,b=null;return a&&(k=h("span",{className:"slider-label"},a),p.appendChild(k)),f.appendChild(m),p.appendChild(f),s&&(b=h("span",{className:"slider-value"},String(i)),p.appendChild(b)),u.append(p),x(),{root:u,input:m,setValue:S,getValue:w,setDisabled:T}}const Df=`
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
`,rL={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},Bf={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},iL=220;function aL(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function sL(e){const t=aL();if(t){Ae(t,Df,"customSoundModal");return}const n=h("style");n.textContent=Df,e.appendChild(n);}function $x(e){const t={...rL,...e};let n=null,o=null,r=null,i=null,a=null,s=null,l=null,c=null,d=null,u=false,p=false,f=null;function g(){d?.(),d=null,c&&(c.pause(),c.currentTime=0),c=null,r?.setLabel("Play");}async function m(){if(c){g();return}if(!l)return;const F=de.getById(l.soundId);if(!F){console.error(`[CustomSoundModal] Sound not found: ${l.soundId}`);return}const G=new Audio(F.source);G.volume=l.volume/100,c=G;const z=()=>{g();},X=()=>{g(),console.error(`[CustomSoundModal] Failed to play sound: ${F.name}`);};G.addEventListener("ended",z),G.addEventListener("error",X),d=()=>{G.removeEventListener("ended",z),G.removeEventListener("error",X);};try{await G.play(),r?.setLabel("Stop");}catch(L){g(),console.error("[CustomSoundModal] Failed to play sound:",L);}}function y(){s&&l&&(s.textContent=Bf[l.mode]);}function x(){u||f!==null||(f=window.setTimeout(()=>{T();},iL));}function S(){u||p||(p=true,g(),t.onClose?.(),x());}function w(){u||(n?.close(),S());}function T(){u||(u=true,p=true,f!==null&&(window.clearTimeout(f),f=null),g(),o&&(o.destroy(),o=null),a&&(a.destroy(),a=null),i=null,r=null,s=null,l=null,n&&(n.destroy(),n=null));}function k(){const F=h("span",{className:"custom-sound-modal-title"});let G=false;if(e.spriteId)try{const X=Q.toCanvas(e.spriteId);if(X){const L=h("span",{className:"custom-sound-modal-title-icon"});X.className="custom-sound-modal-title-sprite",L.appendChild(X),F.appendChild(L),G=!0;}}catch{}if(!G&&e.icon){const X=h("span",{className:"custom-sound-modal-title-icon"},e.icon);F.appendChild(X);}const z=h("span",{className:"custom-sound-modal-title-text"},e.entityName);return F.appendChild(z),F}function b(){const F=h("div",{className:"custom-sound-modal-body"}),G=de.getItemCustomSound(e.entityType,e.entityId,e.shopType),z=de.getNotificationConfig(e.entityType);l=G?{soundId:G.soundId,volume:G.volume,mode:G.mode}:{soundId:z.soundId,volume:z.volume,mode:z.mode};const X=de.getAll().map(M=>({value:M.id,label:M.name})),L=h("div",{className:"custom-sound-modal-row"}),O=h("label",{className:"custom-sound-modal-label"},"Sound");L.appendChild(O);const D=h("div",{className:"custom-sound-modal-controls"});o=Vn({value:l.soundId,options:X,size:"sm",onChange:M=>{l&&(l.soundId=M),g();}}),D.appendChild(o.root),r=Me({label:"Play",variant:"default",size:"sm",onClick:()=>m()}),D.appendChild(r),L.appendChild(D),F.appendChild(L);const B=h("div",{className:"custom-sound-modal-row"}),U=h("label",{className:"custom-sound-modal-label"},"Volume");B.appendChild(U),i=Ox({min:0,max:100,step:1,value:l.volume,showValue:true,onChange:M=>{l&&(l.volume=M),c&&(c.volume=M/100);}}),B.appendChild(i.root),F.appendChild(B);const E=h("div",{className:"custom-sound-modal-row"}),P=h("label",{className:"custom-sound-modal-label"},"Mode");E.appendChild(P);const A=h("div",{className:"custom-sound-modal-mode-controls"});return a=Vn({value:l.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:M=>{l&&(l.mode=M),y();}}),A.appendChild(a.root),s=h("div",{className:"custom-sound-modal-mode-description"},Bf[l.mode]),A.appendChild(s),E.appendChild(A),F.appendChild(E),F}function v(){const F=h("div",{className:"custom-sound-modal-footer"}),G=Me({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),w();}});F.appendChild(G);const z=h("div",{style:"flex: 1"});F.appendChild(z);const X=Me({label:"Cancel",variant:"default",size:"sm",onClick:()=>w()});F.appendChild(X);const L=Me({label:"Save",variant:"primary",size:"sm",onClick:()=>{l&&e.onSave({...l}),w();}});return F.appendChild(L),F}const _=b(),C=v(),I=h("div");sL(I),I.appendChild(_),n=oL({title:e.entityName||t.title,content:I,footer:C,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:S}),n.root.classList.add("custom-sound-modal");const R=n.root.querySelector(".modal-title");return R&&R.replaceChildren(k()),{root:n.root,close:w,destroy:T}}const lL=["seed","tool","egg","decor"],cL=new Set(lL);function Jl(e){const[t,...n]=e.split(":");return !t||n.length===0||!cL.has(t)?null:{shopType:t,itemId:n.join(":")}}const dL=500,Gf=10,uL=800;function pL(e){const{rows:t}=e,n=new Map;let o=null,r=false;const i=new Map;let a=null,s=null,l=null,c=null,d=null,u=false;function p(A,M){M?A.classList.add("has-custom-sound"):A.classList.remove("has-custom-sound");}function f(A){const M=Jl(A);return M?de.hasItemCustomSound("shop",M.itemId,M.shopType):false}function g(A){if(!o)return null;const M=o.root.querySelectorAll(".lg-tr-body");for(const K of M)if(K.dataset.id===A)return K;return null}function m(A,M){const K=g(A);if(!K)return;const j=M??f(A);p(K,j);}function y(){if(!o)return;o.root.querySelectorAll(".lg-tr-body").forEach(M=>{const K=M.dataset.id;K&&p(M,f(K));});}function x(){r||(r=true,requestAnimationFrame(()=>{r=false,y();}));}function S(A){i.clear();for(const M of A)i.set(`${M.shopType}:${M.id}`,M);}function w(A){const M=Jl(A);return M?de.hasItemCustomSound("shop",M.itemId,M.shopType):false}function T(A){const M=Jl(A);if(!M||!de.hasItemCustomSound("shop",M.itemId,M.shopType))return;de.removeItemCustomSound("shop",M.itemId,M.shopType);const K=i.get(A);K&&(K.hasCustomSound=false),m(A,false),x();}function k(){s!==null&&(window.clearTimeout(s),s=null),a=null;}function b(A){a=A,s!==null&&window.clearTimeout(s),s=window.setTimeout(()=>{s=null,a=null;},uL);}function v(){l!==null&&(window.clearTimeout(l),l=null),c=null,d=null,u=false;}if(o=vi({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(A,M)=>A.itemName.localeCompare(M.itemName,void 0,{numeric:true,sensitivity:"base"}),render:A=>{const M=h("div",{className:"shop-item-cell"}),K=h("div",{className:"shop-item-icon"});if(A.spriteId){const V=Q.toCanvas(A.spriteId);V?(V.className="shop-item-sprite",K.appendChild(V)):K.textContent=Of[A.shopType];}else K.textContent=Of[A.shopType];const j=h("div",{className:"shop-item-name"});return j.textContent=A.itemName,M.appendChild(K),M.appendChild(j),M}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(A,M)=>{const K=A.rarity?$f[A.rarity.toLowerCase()]??999:999,j=M.rarity?$f[M.rarity.toLowerCase()]??999:999;return K-j},render:A=>{const M=h("div",{className:"shop-item-rarity"}),K=Xo({variant:"rarity",rarity:A.rarity});return M.appendChild(K.root),M}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:A=>{const M=h("div",{className:"shop-item-notify"}),K=cf(A.id,A.shopType),j=hn({checked:A.isTracked,disabled:K,size:"sm",onChange:Z=>{A.isTracked=Z,Z?$t.addTrackedItem(A.shopType,A.id):$t.removeTrackedItem(A.shopType,A.id);}}),V=`${A.shopType}:${A.id}`;return n.set(V,j),M.appendChild(j.root),M}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:A=>`${A.shopType}:${A.id}`,onSortChange:()=>{x();},onRowClick:(A,M,K)=>{const j=`${A.shopType}:${A.id}`;if(a){if(a===j){k();return}k();}K.target.closest(".shop-item-notify")||$x({entityType:"shop",entityId:A.id,entityName:A.itemName,spriteId:A.spriteId,shopType:A.shopType,onSave:Z=>{Z===null?(de.removeItemCustomSound("shop",A.id,A.shopType),A.hasCustomSound=false,m(j,false)):(de.setItemCustomSound("shop",A.id,Z,A.shopType),A.hasCustomSound=true,m(j,true));}});}}),!o)throw new Error("[ShopsCard] Failed to create items table");S(t);const C=o.root,I=A=>{const M=A.target;if(M.closest(".shop-item-notify"))return;const j=M.closest(".lg-tr-body")?.dataset.id;!j||!w(j)||(A.preventDefault(),A.stopPropagation(),b(j),T(j));},R=A=>{if(A.pointerType==="mouse"||A.button!==0)return;const M=A.target;if(M.closest(".shop-item-notify"))return;const j=M.closest(".lg-tr-body")?.dataset.id;!j||!w(j)||(v(),c=j,d={x:A.clientX,y:A.clientY},l=window.setTimeout(()=>{l=null,c&&(u=true,b(c),T(c));},dL));},F=A=>{if(!d||!c||u)return;const M=A.clientX-d.x,K=A.clientY-d.y;M*M+K*K>Gf*Gf&&v();},G=()=>{v();},z=()=>{v();};C.addEventListener("contextmenu",I),C.addEventListener("pointerdown",R),C.addEventListener("pointermove",F),C.addEventListener("pointerup",G),C.addEventListener("pointercancel",z);const X=o.setData.bind(o);o.setData=A=>{S(A),X(A),x();},x();const L=A=>{for(const[M,K]of n.entries()){const[j,V]=M.split(":");if(A&&j!==A)continue;const Z=cf(V,j);K.setDisabled(Z);}},D=kt().subscribeStable(()=>{L();}),B=qo(),U=B.subscribeDecorPlaced(()=>{L("decor");}),E=B.subscribeDecorRemoved(()=>{L("decor");}),P=o.destroy.bind(o);return o.destroy=()=>{D(),U(),E(),C.removeEventListener("contextmenu",I),C.removeEventListener("pointerdown",R),C.removeEventListener("pointermove",F),C.removeEventListener("pointerup",G),C.removeEventListener("pointercancel",z),v(),k(),n.clear(),i.clear(),P();},o}function fL(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function gL(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=h("div",{className:"select"});for(const d of Array.from(e.classList))d.startsWith("select--")&&r.classList.add(d);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const i=h("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=h("span",{className:"select-value"},t),l=h("span",{className:"select-caret"},a);i.append(s,l),r.appendChild(i),o.appendChild(r);const c=Math.ceil(i.getBoundingClientRect().width);return r.remove(),c}function mL(e,t){const n=fL(t);if(!n)return;let o=0;const r=6,i=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(i);return}const a=gL(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function hL(e){const t=no(),n=t.get();let o=null,r=[],i=[];const a={selectedShopType:"all",searchQuery:""},s={shopTypeSelect:null,searchInput:null,tableHandle:null};let l=0,c=new Set;function d(y,x){if(y.size!==x.size)return  false;for(const S of y)if(!x.has(S))return  false;return  true}function u(){if(!s.tableHandle)return;const y=r.filter(x=>!(a.selectedShopType!=="all"&&x.shopType!==a.selectedShopType||a.searchQuery&&!x.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));i=y,s.tableHandle.setData(y);}function p(){const y=h("div",{className:"shops-card-filters"}),S=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(T=>({value:T,label:XM[T]}))];s.shopTypeSelect=Vn({value:"all",options:S,size:"sm",onChange:T=>{a.selectedShopType=T,u();}});const w=s.shopTypeSelect.root;return w.style.minWidth="0",w.style.width="auto",mL(w,S.map(T=>T.label)),s.searchInput=Is({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:T=>{a.searchQuery=T.trim(),u();}}),y.appendChild(s.shopTypeSelect.root),y.appendChild(s.searchInput.root),y}function f(){r=Ff(n),i=[...r],l=r.length,c=new Set(r.map(k=>k.shopType));const y=h("div");s.tableHandle=pL({rows:i});const x=p();y.appendChild(x),y.appendChild(s.tableHandle.root);const S=h("div",{className:"shops-card-hint"}),w=h("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),T=h("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return S.append(w,T),y.appendChild(S),o=Ee({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},y),o}function g(){const y=t.get(),x=Ff(y),S=x.length,w=new Set(x.map(k=>k.shopType));(S!==l||!d(w,c))&&(l=S,c=w,r=x,u());}function m(){if(s.tableHandle&&(s.tableHandle.destroy(),s.tableHandle=null),s.shopTypeSelect&&(s.shopTypeSelect.destroy(),s.shopTypeSelect=null),s.searchInput){const y=s.searchInput.root.__cleanup;y&&y(),s.searchInput=null;}o=null;}return {root:f(),refresh:g,destroy:m}}const bL=".mp3,.wav,.ogg,audio/*",xL=250*1024,yL=3;function vL(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function wL(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function SL(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function Fx(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function CL(e,t){const n=Fx(t);if(!n.length)return  true;const o=e.name.toLowerCase(),r=e.type.toLowerCase();return n.some(i=>{const a=i.toLowerCase();if(a.startsWith("."))return o.endsWith(a);if(a.endsWith("/*")){const s=a.slice(0,-1);return r.startsWith(s)}return r===a})}function kL(e){const n=Fx(e).map(o=>o.startsWith(".")?o.slice(1).toUpperCase():o.endsWith("/*")?"Audio":o.includes("/")&&o.split("/")[1]?.toUpperCase()||o.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function _L(e={}){const{id:t,className:n,label:o="Add sounds",hint:r,accept:i=bL,multiple:a=true,disabled:s=false,maxSizeBytes:l=xL,maxItems:c,emptyLabel:d="No sounds added yet",onItemsChange:u,onFilesAdded:p,onError:f}=e;let g=[],m=0,y=null,x=false,S=!!s,w=null,T=null,k=null;const b=new Map,v=new Map,_=Number.isFinite(c)?Math.max(1,Number(c)):a?Number.POSITIVE_INFINITY:1,C=h("div",{className:"sound-picker",id:t});n&&C.classList.add(...n.split(" ").filter(Boolean)),S&&C.classList.add("is-disabled");const I=h("div",{className:"sound-picker__header"}),R=h("div",{className:"sound-picker__label"},o),F=r??`${kL(i)} - Max ${SL(l)}`,G=h("div",{className:"sound-picker__hint"},F);I.append(R,G);const z=h("div",{className:"sound-picker__zone",role:"button",tabIndex:S?-1:0,"aria-disabled":String(S)}),X=h("div",{className:"sound-picker__zone-text"}),L=h("div",{className:"sound-picker__zone-title"},"Drop audio files here"),O=h("div",{className:"sound-picker__zone-subtitle"},"or click to browse");X.append(L,O);const D=Me({label:a?"Choose files":"Choose file",size:"sm",onClick:$=>{$.preventDefault(),S||B.click();},disabled:S});D.classList.add("sound-picker__pick");const B=h("input",{className:"sound-picker__input",type:"file",accept:i,multiple:a?true:void 0,disabled:S,tabIndex:-1});z.append(X,D,B);const U=h("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),E=h("div",{className:"sound-picker__list",role:"list"});C.append(I,z,U,E);function P($,Y="info"){const ee=$??"";U.textContent=ee,U.classList.toggle("is-error",Y==="error");}function A($){f?.($),P($.message,"error");}function M(){for(const $ of b.values())try{$.destroy();}catch{}b.clear();}function K($){const Y=v.get($.id);if(Y)return Y;const ee=$.file.__sourceUrl;if(ee)return v.set($.id,ee),ee;const re=URL.createObjectURL($.file);return v.set($.id,re),re}function j($){const Y=v.get($);Y&&(Y.startsWith("blob:")&&URL.revokeObjectURL(Y),v.delete($));}function V(){k?.(),k=null,w&&(w.pause(),w.currentTime=0),w=null,T=null;}function Z(){E.querySelectorAll(".sound-picker__item").forEach(Y=>{const ee=Y.dataset.id,re=Y.querySelector(".sound-picker__item-btn--play");if(!ee||!re)return;const te=!!w&&T===ee&&!w.paused;re.textContent=te?"Stop":"Play",Y.classList.toggle("is-playing",te);});}function _e($){if(S)return;if(T===$.id){V(),Z();return}V();const Y=K($),ee=new Audio(Y);w=ee,T=$.id;const re=()=>{T===$.id&&(V(),Z());},te=()=>{T===$.id&&(V(),Z(),A({code:"type",file:$.file,message:`Unable to play ${$.name}`}));};ee.addEventListener("ended",re),ee.addEventListener("error",te),k=()=>{ee.removeEventListener("ended",re),ee.removeEventListener("error",te);},ee.play().then(()=>{Z();}).catch(()=>{V(),Z(),A({code:"type",file:$.file,message:`Unable to play ${$.name}`});});}function Ie(){if(M(),E.classList.toggle("is-scrollable",g.length>yL),!g.length){const Y=h("div",{className:"sound-picker__empty"});Y.append(typeof d=="string"?document.createTextNode(d):d),E.replaceChildren(Y);return}const $=g.map(Y=>ro(Y));if(E.replaceChildren(...$),y){const Y=b.get(y);Y&&requestAnimationFrame(()=>Y.focus());}Z();}function ro($){const Y=y===$.id,ee=h("div",{className:"sound-picker__item",role:"listitem","data-id":$.id}),re=h("div",{className:"sound-picker__item-top"});h("div",{className:"sound-picker__item-bottom"});const te=h("div",{className:"sound-picker__item-name"});if(Y&&!S){const me=Es({value:$.name,blockGameKeys:true,onEnter:Te=>{yn($.id,Te);}});me.root.classList.add("sound-picker__rename"),me.input.classList.add("input--sm"),me.input.setAttribute("aria-label","Rename sound"),me.input.addEventListener("keydown",Te=>{Te.key==="Escape"&&(Te.preventDefault(),Zo());}),me.input.addEventListener("blur",()=>{if(x){x=false;return}yn($.id,me.getValue());}),b.set($.id,me),te.appendChild(me.root);}else {const me=h("div",{className:"sound-picker__item-label",title:$.name},$.name);te.appendChild(me);}const ae=h("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(Y&&!S){const me=h("button",{className:"sound-picker__item-btn",type:"button",disabled:S},"Save");me.addEventListener("click",()=>{const he=b.get($.id);yn($.id,he?.getValue()??$.name);});const Te=h("button",{className:"sound-picker__item-btn",type:"button",disabled:S},"Cancel");Te.addEventListener("pointerdown",()=>{x=true;}),Te.addEventListener("click",()=>Zo()),ae.append(me,Te);}else {const me=h("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:S},T===$.id?"Stop":"Play");me.addEventListener("click",()=>_e($));const Te=h("button",{className:"sound-picker__item-btn",type:"button",disabled:S},"Rename");Te.addEventListener("click",()=>{S||(y=$.id,Ie());});const he=h("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:S},"Remove");he.addEventListener("click",()=>er($.id)),ae.append(me,Te,he);}return re.append(te,ae),ee.append(re),ee}function Jt(){return g.slice()}function Dt($){const Y=$.slice(),ee=new Set(Y.map(re=>re.id));for(const re of Array.from(v.keys()))ee.has(re)||j(re);T&&!ee.has(T)&&V(),g=Y,y=null,Ie(),u?.(Jt());}function io($){if(S)return;const Y=Array.from($??[]);if(!Y.length)return;const ee=[],re=[];for(const he of Y){if(i&&!CL(he,i)){re.push({code:"type",file:he,message:`Unsupported file type: ${he.name}`});continue}if(Number.isFinite(l)&&he.size>l){re.push({code:"size",file:he,maxSizeBytes:l,message:`File too large: ${he.name}`});continue}ee.push({id:vL(),file:he,name:wL(he),size:he.size,type:he.type});}if(!ee.length){re.length&&A(re[0]);return}const te=a?g.slice():[],ae=Number.isFinite(_)?Math.max(0,_-te.length):ee.length;if(ae<=0){A({code:"limit",message:`Maximum of ${Math.max(1,_)} files reached`});return}const me=ee.slice(0,ae),Te=a?te.concat(me):me.slice(0,1);Dt(Te),P(null),p?.(me.slice()),re.length&&A(re[0]);}function Bi($,Y){const ee=Y.trim();if(!ee){A({code:"name",message:"Name cannot be empty"});return}const re=g.map(te=>te.id===$?{...te,name:ee}:te);Dt(re),P(null);}function yn($,Y){const ee=Y.trim();if(!ee){A({code:"name",message:"Name cannot be empty"});return}Bi($,ee);}function Zo(){y=null,P(null),Ie();}function er($){const Y=g.filter(ee=>ee.id!==$);Dt(Y),P(null);}function vn(){V(),Dt([]),P(null);}function ul($){S=!!$,C.classList.toggle("is-disabled",S),z.setAttribute("aria-disabled",String(S)),z.tabIndex=S?-1:0,B.disabled=S,D.setDisabled(S),S&&V(),Ie();}function Gi(){S||B.click();}const wn=$=>{if(S)return;const Y=$.target;Y&&Y.closest(".sound-picker__pick")||B.click();},Sn=$=>{S||($.key==="Enter"||$.key===" ")&&($.preventDefault(),B.click());},zi=$=>{S||!$.dataTransfer||!$.dataTransfer.types.includes("Files")||($.preventDefault(),m+=1,z.classList.add("is-dragover"));},Hi=$=>{S||!$.dataTransfer||!$.dataTransfer.types.includes("Files")||($.preventDefault(),$.dataTransfer.dropEffect="copy");},ji=$=>{S||z.classList.contains("is-dragover")&&($.preventDefault(),m=Math.max(0,m-1),m<=0&&(m=0,z.classList.remove("is-dragover")));},Ui=$=>{S||!$.dataTransfer||!$.dataTransfer.files.length||($.preventDefault(),m=0,z.classList.remove("is-dragover"),io($.dataTransfer.files));},oe=()=>{if(S){B.value="";return}B.files&&io(B.files),B.value="";};return z.addEventListener("click",wn),z.addEventListener("keydown",Sn),z.addEventListener("dragenter",zi),z.addEventListener("dragover",Hi),z.addEventListener("dragleave",ji),z.addEventListener("drop",Ui),B.addEventListener("change",oe),Ie(),{root:C,getItems:Jt,setItems:Dt,addFiles:io,renameItem:Bi,removeItem:er,clear:vn,setDisabled:ul,openPicker:Gi,setStatus:P,destroy(){M(),V();for(const $ of Array.from(v.keys()))j($);z.removeEventListener("click",wn),z.removeEventListener("keydown",Sn),z.removeEventListener("dragenter",zi),z.removeEventListener("dragover",Hi),z.removeEventListener("dragleave",ji),z.removeEventListener("drop",Ui),B.removeEventListener("change",oe),C.remove();}}}const zf={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function TL(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function AL(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=h("div",{className:"select"});for(const d of Array.from(e.classList))d.startsWith("select--")&&r.classList.add(d);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const i=h("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=h("span",{className:"select-value"},t),l=h("span",{className:"select-caret"},a);i.append(s,l),r.appendChild(i),o.appendChild(r);const c=Math.ceil(i.getBoundingClientRect().width);return r.remove(),c}function EL(e,t){const n=TL(t);if(!n)return;let o=0;const r=6,i=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(i);return}const a=AL(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function IL(e){let t=null,n=null,o=null;const r=new Map,i=new Map,a=new Map;let s=null,l=null,c=null;function d(){c?.(),c=null,s&&(s.pause(),s.currentTime=0),s=null,l=null;}function u(){if(!o)return;o.querySelectorAll(".notification-item").forEach(b=>{const v=b.dataset.type,_=b.querySelector(".notification-item-play");if(!v||!_)return;const C=!!s&&l===v&&!s.paused;_.textContent=C?"Stop":"Play",b.classList.toggle("is-playing",C);});}async function p(k){if(l===k){d(),u();return}d();const b=de.getNotificationConfig(k),v=de.getById(b.soundId);if(!v){console.error(`[SettingCard] Sound not found: ${b.soundId}`);return}const _=new Audio(v.source);_.volume=b.volume/100,s=_,l=k;const C=()=>{l===k&&(d(),u());},I=()=>{l===k&&(d(),u(),console.error(`[SettingCard] Failed to play sound: ${v.name}`));};_.addEventListener("ended",C),_.addEventListener("error",I),c=()=>{_.removeEventListener("ended",C),_.removeEventListener("error",I);};try{await _.play(),u();}catch(R){d(),u(),console.error("[SettingCard] Failed to play sound:",R);}}function f(k,b){if(k.startsWith("data:"))try{const v=k.split(","),_=v[0].match(/:(.*?);/)?.[1]||"audio/mpeg",C=atob(v[1]),I=C.length,R=new Uint8Array(I);for(let F=0;F<I;F++)R[F]=C.charCodeAt(F);return new File([R],b,{type:_})}catch(v){return console.error("[SettingCard] Failed to convert data URL to File:",v),new File([],b,{type:"audio/mpeg"})}return new File([],b,{type:"audio/mpeg"})}function g(){const b=de.getAll().map(v=>({value:v.id,label:v.name}));for(const[v,_]of r){const C=de.getNotificationConfig(v);_.setOptions(b),_.setValue(C.soundId);}}function m(k,b,v){const _=h("div",{className:"notification-item","data-type":k}),C=h("div",{className:"notification-item-label"},b);_.appendChild(C);const I=h("div",{className:"notification-item-description"},v);_.appendChild(I);const R=h("div",{className:"notification-item-controls"}),F=de.getNotificationConfig(k),z=de.getAll().map(P=>({value:P.id,label:P.name})),X=Vn({value:F.soundId,options:z,size:"sm",onChange:P=>{const A=de.getNotificationConfig(k);de.setNotificationConfig(k,{soundId:P,volume:A.volume,mode:A.mode});}});r.set(k,X);const L=h("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");L.addEventListener("click",()=>{p(k);}),R.appendChild(X.root),R.appendChild(L),_.appendChild(R);const O=Ox({min:0,max:100,step:1,value:F.volume,showValue:true,onChange:P=>{const A=de.getNotificationConfig(k);de.setNotificationConfig(k,{soundId:A.soundId,volume:P,mode:A.mode});}});a.set(k,O),_.appendChild(O.root);const D=h("div",{className:"notification-mode-row"}),B=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],U=Vn({value:F.mode,options:B,size:"sm",onChange:P=>{const A=de.getNotificationConfig(k);de.setNotificationConfig(k,{soundId:A.soundId,volume:A.volume,mode:P}),y(k);}});i.set(k,U),U.root.classList.add("shrink"),EL(U.root,B.map(P=>P.label)),D.appendChild(U.root);const E=h("div",{className:"notification-mode-description"},zf[k][F.mode]);return D.appendChild(E),_.appendChild(D),_}function y(k){if(!o)return;const b=o.querySelector(`[data-type="${k}"]`);if(!b)return;const v=de.getNotificationConfig(k),_=b.querySelector(".notification-mode-description");_&&(_.textContent=zf[k][v.mode]);}function x(){const k=h("div",{className:"alerts-settings-body"});de.init(),o=h("div",{className:"notification-settings"}),o.appendChild(m("shop","Shops restock","Default sound for shop restock alerts")),o.appendChild(m("pet","Pet events","Default sound for pet event alerts")),o.appendChild(m("weather","Weather events","Default sound for weather event alerts")),k.appendChild(o);const b=h("div",{className:"alerts-settings-divider"});k.appendChild(b);const v=de.getAll().map(_=>{const C=f(_.source,_.name);return C.__sourceUrl=_.source,{id:_.id,file:C,name:_.name,size:0,type:_.type}});return n=_L({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:Do.MAX_SOUNDS,maxSizeBytes:Do.MAX_SIZE_BYTES,multiple:true,onItemsChange:_=>{S(_),g();},onFilesAdded:_=>{w(_),setTimeout(()=>{g();},100);}}),n.setItems(v),k.appendChild(n.root),t=Ee({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},k),t}function S(k){const b=new Set(de.getAll().map(C=>C.id)),v=new Set(k.map(C=>C.id)),_=[];for(const C of b)if(!v.has(C)){_.push(C);try{de.remove(C);}catch(I){console.error(`[SettingCard] Failed to remove sound ${C}:`,I);}}if(_.length>0){const C=["shop","pet","weather"];for(const I of C){const R=de.getNotificationConfig(I);if(_.includes(R.soundId)){de.setNotificationConfig(I,{soundId:"default-notification",volume:R.volume,mode:R.mode});const F=a.get(I);F&&F.setValue(R.volume);}}}for(const C of k)if(b.has(C.id)){const I=de.getById(C.id);if(I&&I.name!==C.name)try{de.update(C.id,{name:C.name});}catch(R){console.error(`[SettingCard] Failed to rename sound ${C.id}:`,R);}}}function w(k){for(const b of k)if(!de.getById(b.id)){const v=new FileReader;v.onload=_=>{const C=_.target?.result;try{const I=de.add(b.name,C,"upload");if(n&&I.id!==b.id){const R=n.getItems().map(F=>F.id===b.id?{...F,id:I.id}:F);n.setItems(R);}}catch(I){console.error(`[SettingCard] Failed to add sound ${b.name}:`,I);}},v.onerror=()=>{console.error(`[SettingCard] Failed to read file ${b.name}`);},v.readAsDataURL(b.file);}}function T(){d(),n&&(n.destroy(),n=null);for(const k of r.values())k.destroy();r.clear();for(const k of i.values())k.destroy();i.clear(),a.clear(),t=null;}return {root:x(),destroy:T}}function PL(e){try{const t=J.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function ML(e){try{const t=J.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function LL(e){try{const t=J.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const o=n.mutator;if(!o||typeof o!="object")return "No effects";const r=o.mutation;if(!r)return "No effects";const i=J.get("mutations");if(!i||typeof i!="object")return r;const a=i[r];return !a||typeof a!="object"?r:a.name||r}catch{return "No effects"}}function Hf(){const e=J.get("weather");if(!e||typeof e!="object")return [];const t=jo.getTrackedWeathers(),n=new Set(t),o=[];for(const r of Object.keys(e)){if(r==="Sunny")continue;const i={weatherId:r,weatherName:PL(r),spriteId:ML(r),effects:LL(r),isTracked:n.has(r),hasCustomSound:de.hasItemCustomSound("weather",r)};o.push(i);}return o.sort((r,i)=>r.weatherName.localeCompare(i.weatherName)),o}const NL=500,jf=10,RL=800;function OL(e){const{rows:t}=e;let n=null,o=false;const r=new Map;let i=null,a=null,s=null,l=null,c=null,d=false;function u(L,O){O?L.classList.add("has-custom-sound"):L.classList.remove("has-custom-sound");}function p(L){return de.hasItemCustomSound("weather",L)}function f(L){if(!n)return null;const O=n.root.querySelectorAll(".lg-tr-body");for(const D of O)if(D.dataset.id===L)return D;return null}function g(L,O){const D=f(L);if(!D)return;const B=O??p(L);u(D,B);}function m(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(O=>{const D=O.dataset.id;D&&u(O,p(D));});}function y(){o||(o=true,requestAnimationFrame(()=>{o=false,m();}));}function x(L){r.clear();for(const O of L)r.set(O.weatherId,O);}function S(L){return de.hasItemCustomSound("weather",L)}function w(L){if(!de.hasItemCustomSound("weather",L))return;de.removeItemCustomSound("weather",L);const O=r.get(L);O&&(O.hasCustomSound=false),g(L,false),y();}function T(){a!==null&&(window.clearTimeout(a),a=null),i=null;}function k(L){i=L,a!==null&&window.clearTimeout(a),a=window.setTimeout(()=>{a=null,i=null;},RL);}function b(){s!==null&&(window.clearTimeout(s),s=null),l=null,c=null,d=false;}if(n=vi({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(L,O)=>L.weatherName.localeCompare(O.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:L=>{const O=h("div",{className:"weather-item-cell"}),D=h("div",{className:"weather-item-icon"});if(L.spriteId){const U=Q.toCanvas(L.spriteId);U?(U.className="weather-item-sprite",D.appendChild(U)):D.textContent=Uf(L.weatherId);}else D.textContent=Uf(L.weatherId);const B=h("div",{className:"weather-item-name"});return B.textContent=L.weatherName,O.appendChild(D),O.appendChild(B),O}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:L=>{const O=h("div",{className:"weather-item-effects"});return O.textContent=L.effects,O}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:L=>{const O=h("div",{className:"weather-item-notify"}),D=hn({checked:L.isTracked,disabled:false,size:"sm",onChange:B=>{L.isTracked=B,B?jo.addTrackedWeather(L.weatherId):jo.removeTrackedWeather(L.weatherId);}});return O.appendChild(D.root),O}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:L=>L.weatherId,onSortChange:()=>{y();},onRowClick:(L,O,D)=>{const B=L.weatherId;if(i){if(i===B){T();return}T();}D.target.closest(".weather-item-notify")||$x({entityType:"weather",entityId:L.weatherId,entityName:L.weatherName,spriteId:L.spriteId,onSave:E=>{E===null?(de.removeItemCustomSound("weather",L.weatherId),L.hasCustomSound=false,g(B,false)):(de.setItemCustomSound("weather",L.weatherId,E),L.hasCustomSound=true,g(B,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");x(t);const _=n.root,C=L=>{const O=L.target;if(O.closest(".weather-item-notify"))return;const B=O.closest(".lg-tr-body")?.dataset.id;!B||!S(B)||(L.preventDefault(),L.stopPropagation(),k(B),w(B));},I=L=>{if(L.pointerType==="mouse"||L.button!==0)return;const O=L.target;if(O.closest(".weather-item-notify"))return;const B=O.closest(".lg-tr-body")?.dataset.id;!B||!S(B)||(b(),l=B,c={x:L.clientX,y:L.clientY},s=window.setTimeout(()=>{s=null,l&&(d=true,k(l),w(l));},NL));},R=L=>{if(!c||!l||d)return;const O=L.clientX-c.x,D=L.clientY-c.y;O*O+D*D>jf*jf&&b();},F=()=>{b();},G=()=>{b();};_.addEventListener("contextmenu",C),_.addEventListener("pointerdown",I),_.addEventListener("pointermove",R),_.addEventListener("pointerup",F),_.addEventListener("pointercancel",G);const z=n.setData.bind(n);n.setData=L=>{x(L),z(L),y();},y();const X=n.destroy.bind(n);return n.destroy=()=>{_.removeEventListener("contextmenu",C),_.removeEventListener("pointerdown",I),_.removeEventListener("pointermove",R),_.removeEventListener("pointerup",F),_.removeEventListener("pointercancel",G),b(),T(),r.clear(),X();},n}function Uf(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function $L(e){let t=null,n=[];const o={tableHandle:null};let r=0;function i(){n=Hf(),r=n.length;const l=h("div");o.tableHandle=OL({rows:n}),l.appendChild(o.tableHandle.root);const c=h("div",{className:"weather-card-hint"}),d=h("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),u=h("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return c.append(d,u),l.appendChild(c),t=Ee({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},l),t}function a(){const l=Hf(),c=l.length;c!==r&&(r=c,n=l,o.tableHandle?.setData(l));}function s(){o.tableHandle&&(o.tableHandle.destroy(),o.tableHandle=null),t=null;}return {root:i(),refresh:a,destroy:s}}function FL(e){let t=null,n=null;function o(){const i=h("div",{className:"pet-card-body"}),a=h("div",{className:"pet-card-row"}),s=gd({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=hn({checked:xi.isEnabled(),onChange:l=>{xi.setEnabled(l);}}),a.appendChild(s.root),a.appendChild(n.root),i.appendChild(a),t=Ee({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},i),t}function r(){n&&(n.destroy(),n=null),t=null;}return {root:o(),destroy:r}}class DL extends Xt{constructor(){super({id:"tab-alerts",label:"Alerts"});H(this,"sectionElement",null);H(this,"state",null);H(this,"settingCard",null);H(this,"shopsCard",null);H(this,"weatherCard",null);H(this,"petCard",null);}async build(n){this.state=await qM();const o=n.getRootNode();Ae(o,VM,"alerts-styles");const r=this.createGrid("12px");r.id="alerts-section",this.sectionElement=r;const{MGData:i}=await ot(async()=>{const{MGData:c}=await Promise.resolve().then(()=>Ks);return {MGData:c}},void 0),a=["plants","items","eggs","decor","weather","mutations"],s=await Promise.allSettled(a.map(c=>i.waitFor(c))),l=a.filter((c,d)=>s[d]?.status==="rejected");l.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",l.join(", ")),this.buildParts(),n.appendChild(r);}render(n){const o=this.shopsCard,r=this.weatherCard,i=this.petCard,a=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=o,this.weatherCard=r,this.petCard=i,this.settingCard=a;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=hL({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:o=>this.state.setCardExpanded("shops",o)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=FL({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:o=>this.state.setCardExpanded("pet",o)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=$L({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:o=>this.state.setCardExpanded("weather",o)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=IL({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:o=>this.state.setCardExpanded("settings",o)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const BL={Store:{select:xe.select.bind(xe),set:xe.set.bind(xe),subscribe:xe.subscribe.bind(xe),subscribeImmediate:xe.subscribeImmediate.bind(xe)},Globals:fe,Modules:{Version:vd,Assets:Qn,Manifest:Ut,Data:J,Environment:qe,CustomModal:vo,Sprite:Q,Tile:qt,Pixi:Bs,Audio:Le,Cosmetic:Qd,Calculators:ph,ShopActions:On},Features:{AutoFavorite:Ch,Journal:Be,BulkFavorite:zc,Achievements:xE,Tracker:z2,AntiAfk:ko,Pets:H2,PetTeam:pe,XPTracker:Uc,CropValueIndicator:Ga,CropSizeIndicator:ja,ShopNotifier:$t,WeatherNotifier:jo,PetHungerNotifier:xi,AriesAPI:_s,HarvestLocker:td},WebSocket:{chat:Q1,emote:Z1,wish:ek,kickPlayer:tk,setPlayerData:js,usurpHost:nk,reportSpeakingStart:ok,setSelectedGame:rk,voteForGame:ik,requestGame:ak,restartGame:sk,ping:lk,checkWeatherStatus:uk,move:ck,playerPosition:th,teleport:dk,moveInventoryItem:pk,dropObject:fk,pickupObject:gk,toggleFavoriteItem:Us,putItemInStorage:Ud,retrieveItemFromStorage:Wd,moveStorageItem:mk,logItems:hk,plantSeed:bk,waterPlant:xk,harvestCrop:yk,sellAllCrops:vk,purchaseDecor:Vd,purchaseEgg:qd,purchaseTool:Xd,purchaseSeed:Kd,plantEgg:wk,hatchEgg:Sk,plantGardenPlant:Ck,potPlant:kk,mutationPotion:_k,pickupDecor:Tk,placeDecor:Ak,removeGardenObject:Ek,placePet:nh,feedPet:Ik,petPositions:Pk,swapPet:oh,storePet:rh,namePet:Mk,sellPet:Lk},_internal:{getGlobals:Bt,initGlobals:hh,destroyGlobals:mT}};function GL(){const e=W;e.Gemini=BL,e.MGSprite=Q,e.MGData=J,e.MGPixi=Bs,e.MGAssets=Qn,e.MGEnvironment=qe;}const zL={lastSelectedSlot:"bottom"};async function HL(){const e=await Jn("tab-avatar-ui",{version:1,defaults:zL}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const o=e.get();t.forEach(r=>r(o));},subscribe:n=>(t.push(n),()=>{const o=t.indexOf(n);o!==-1&&t.splice(o,1);})}}const Wf=`
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
`;class jL extends Xt{constructor(){super({id:"tab-avatar",label:"Avatar"});H(this,"previewOutfit",{top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png"});H(this,"previewContainer",null);H(this,"menuContainer",null);H(this,"menuCard",null);H(this,"loadoutsContainer",null);H(this,"currentSlot",null);H(this,"uiState",null);H(this,"cleanups",[]);}async build(n){const[o,r,i]=await Promise.all([jd(),HL(),ni().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"}))]);this.uiState=r,this.previewOutfit={top:i.top,mid:i.mid,bottom:i.bottom,expression:i.expression},B1().catch(w=>console.warn("[AvatarSection] Discovery failed:",w)),rn.init();const a=this.createContainer("avatar-section"),s=n.getRootNode();if(s instanceof ShadowRoot)Ae(s,Wf,"avatar-section-styles");else {const w=h("style");w.textContent=Wf,a.appendChild(w);}n.appendChild(a);const l=h("div",{className:"avatar-main-layout"});a.appendChild(l);const c=h("div",{className:"avatar-slots-column"});l.appendChild(c),[{label:"Expression",key:"expression"},{label:"Top (Hat)",key:"top"},{label:"Mid (Face)",key:"mid"},{label:"Bottom (Outfit)",key:"bottom"}].forEach(w=>{const T=Me({label:w.label,fullWidth:true,size:"sm",onClick:()=>this.showMenu(w.key)});c.appendChild(T);});const u=h("div",{className:"avatar-action-group"});c.appendChild(u);const p=Me({label:"Apply to World",variant:"primary",fullWidth:true,onClick:async()=>{p.setLoading(true),await Jd(this.previewOutfit),p.setLoading(false),p.setLabel("Success!"),setTimeout(()=>p.setLabel("Apply to World"),2e3);}});u.appendChild(p);const f=Me({label:"Reset",variant:"danger",fullWidth:true,size:"sm",onClick:async()=>{await ah();const w=await ni();this.previewOutfit={...w},this.updatePreview();}});u.appendChild(f);const g=h("div",{className:"avatar-preview-area"});l.appendChild(g);const m=Ee({title:"Live Preview",variant:"soft"});this.previewContainer=h("div",{className:"avatar-preview-box"}),m.querySelector(".card-body")?.appendChild(this.previewContainer),g.appendChild(m),this.updatePreview(),this.menuCard=Ee({title:"Select Item",variant:"outline"}),this.menuCard.className+=" avatar-selection-area",this.menuContainer=h("div",{className:"avatar-items-grid"}),this.menuCard.querySelector(".card-body")?.appendChild(this.menuContainer),this.menuCard.style.display="none",a.appendChild(this.menuCard);const y=h("div",{className:"avatar-loadouts-area"});a.appendChild(y);const x=h("div",{className:"loadout-header-row"});y.appendChild(x),x.appendChild(h("h3",{className:"loadout-title"},"Saved Outfits"));const S=Me({label:"+ Save Current",size:"sm",onClick:()=>this.handleSaveCurrent()});x.appendChild(S),this.loadoutsContainer=h("div",{className:"avatar-loadouts-grid"}),y.appendChild(this.loadoutsContainer),this.cleanups.push(rn.subscribe(()=>this.renderLoadouts())),this.renderLoadouts();}updatePreview(){if(!this.previewContainer)return;this.previewContainer.innerHTML="";const n=ti();[{f:this.previewOutfit.bottom,z:1},{f:this.previewOutfit.mid,z:2},{f:this.previewOutfit.top,z:3},{f:this.previewOutfit.expression,z:4}].forEach(r=>{const i=r.f===Ac;if(!r.f||r.f.includes("_Blank.png")||i)return;const a=h("img",{src:`${n}${r.f}`,className:"avatar-preview-layer",style:{zIndex:String(r.z)},onerror:()=>a.style.display="none"});this.previewContainer.appendChild(a);});}async showMenu(n){if(!this.menuContainer||!this.menuCard)return;this.currentSlot=n;const o={top:"Top",mid:"Mid",bottom:"Bottom",expression:"Expression"},r=await Qm({type:o[n]});this.menuContainer.innerHTML="",this.menuCard.style.display="block";const i=this.menuCard.querySelector(".card-title");i&&(i.textContent=`Selection: ${o[n]} (${r.length-1} variants)`),r.forEach(a=>{const s=this.previewOutfit[n]===a.filename,l=a.displayName==="None",c=h("div",{className:`avatar-item-btn ${s?"active":""}`,"data-filename":a.filename||"null",onclick:()=>this.selectItem(a)});if(l)c.appendChild(h("div",{className:"none-placeholder"},"∅"));else {const d=h("img",{src:a.url,className:"avatar-item-img",onerror:()=>d.style.display="none"});c.appendChild(d);}c.appendChild(h("div",{className:"avatar-item-label"},l?"None":a.displayName)),this.menuContainer.appendChild(c);}),this.menuCard.scrollIntoView({behavior:"smooth",block:"start"});}selectItem(n){!this.currentSlot||!this.menuContainer||(this.previewOutfit[this.currentSlot]=n.filename,this.updatePreview(),this.menuContainer.querySelectorAll(".avatar-item-btn").forEach(o=>{const r=o.getAttribute("data-filename")===(n.filename||"null");o.classList.toggle("active",r);}));}renderLoadouts(){if(!this.loadoutsContainer)return;this.loadoutsContainer.innerHTML="";const n=rn.get();if(n.length===0){this.loadoutsContainer.innerHTML='<div style="grid-column: 1/-1; opacity: 0.5; text-align: center; padding: 20px;">No outfits saved yet.</div>';return}n.forEach(o=>{const r=h("div",{className:"loadout-card"}),i=h("div",{className:"loadout-mini-preview"}),a=ti();[{f:o.bottom,z:1},{f:o.mid,z:2},{f:o.top,z:3},{f:o.expression,z:4}].forEach(p=>{const f=p.f===Ac;if(!p.f||p.f.includes("_Blank.png")||f)return;const g=h("img",{src:`${a}${p.f}`,className:"loadout-mini-layer",style:{zIndex:String(p.z)},onerror:()=>g.style.display="none"});i.appendChild(g);}),r.appendChild(i);const l=h("div",{className:"loadout-header"}),c=Es({value:o.name,placeholder:"Unnamed Outfit",mode:"alphanumeric",allowSpaces:true,maxLength:24,blockGameKeys:true,onChange:p=>{rn.rename(o.id,p);}});c.input.addEventListener("keydown",p=>p.stopPropagation(),true),c.input.addEventListener("keyup",p=>p.stopPropagation(),true),c.input.addEventListener("keypress",p=>p.stopPropagation(),true),c.root.classList.add("loadout-name-input"),l.appendChild(c.root);const d=h("div",{className:"icon-btn",onclick:p=>{p.stopPropagation(),confirm("Delete this outfit?")&&rn.delete(o.id);}},"🗑️");l.appendChild(d),r.appendChild(l);const u=Me({label:"Wear",size:"sm",fullWidth:true,onClick:async()=>{u.setLoading(true),await rn.wear(o.id),this.previewOutfit={top:o.top,mid:o.mid,bottom:o.bottom,expression:o.expression},this.updatePreview(),u.setLoading(false);}});r.appendChild(u),this.loadoutsContainer.appendChild(r);});}async handleSaveCurrent(){await rn.save("",this.previewOutfit),setTimeout(()=>{if(!this.loadoutsContainer)return;const n=this.loadoutsContainer.querySelectorAll(".loadout-card"),r=n[n.length-1]?.querySelector("input");r&&(r.focus(),r.select());},100);}async destroy(){this.cleanups.forEach(n=>n()),this.cleanups=[],super.destroy();}}const od={ui:{expandedCards:{public:true}}};async function UL(){const e=await Jn("tab-room",{version:1,defaults:od,sanitize:r=>({ui:{expandedCards:Oo(od.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Oo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}const WL=`
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
`;function VL(e){return /^I-\d+-GC-\d+-\d+$/.test(e)?"discord":"web"}function qL(e){const t=h("span",{className:`rooms-list__badge rooms-list__badge--${e}`});return t.textContent=e==="discord"?"Discord":"Web",t}function XL(e,t=16){return e.length<=t?e:`${e.slice(0,t)}...`}function KL(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,e}function YL(e,t){const n=t==="all"?e:e.filter(o=>o.playerCount<o.maxPlayers);switch(t){case "5-6":return n.filter(o=>o.playerCount>=5);case "4":return n.filter(o=>o.playerCount===4);case "1-3":return n.filter(o=>o.playerCount>=1&&o.playerCount<=3);default:return n}}function JL(e){const t=l=>l.toString().padStart(2,"0"),n=t(e.getHours()),o=t(e.getMinutes()),r=t(e.getSeconds()),i=t(e.getDate()),a=t(e.getMonth()+1),s=e.getFullYear();return `${i}/${a}/${s} ${n}:${o}:${r}`}function QL(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 50 50"),e.setAttribute("width","50"),e.setAttribute("height","50"),e.innerHTML=`
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `,e}function ZL(e={}){const{rooms:t=[],onJoinRoom:n,onCopyRoomId:o,onRefresh:r,emptyMessage:i="No rooms available",joinEnabled:a=false,initialFilter:s="5-6",onFilterChange:l}=e;let c=s,d=t;const u=h("div",{className:"rooms-list"}),p=h("style");p.textContent=WL,u.appendChild(p);const f=h("div",{className:"rooms-list__header-bar"}),m=Vn({options:[{value:"5-6",label:"5-6 players"},{value:"4",label:"4 players"},{value:"1-3",label:"1-3 players"},{value:"all",label:"All"}],value:s,onChange:G=>{c=G,l?.(c),R(d);}});f.appendChild(m.root);const y=Me({label:"Refresh rooms",variant:"default",size:"sm",iconLeft:"",onClick:()=>{r?.();}});f.appendChild(y),u.appendChild(f);const x=h("div",{style:"position: relative;"}),S=h("div",{className:"rooms-list__container"});x.appendChild(S);const w=h("div",{className:"rooms-list__loading-overlay"});w.style.display="none";const T=QL();w.appendChild(T),x.appendChild(w),u.appendChild(x);const k=h("div",{className:"rooms-list__footer"}),b=h("div",{className:"rooms-list__aries-badge"});b.textContent="Powered by Aries",k.appendChild(b);const v=h("div",{className:"rooms-list__timestamp"});v.style.display="none",k.appendChild(v),u.appendChild(k);const _=[m,{remove:()=>y.remove()}],C=[];function I(G){const z=VL(G.id),X=h("div",{className:"rooms-list__item"}),L=h("div",{className:"rooms-list__top-row"}),O=qL(z);L.appendChild(O);const D=h("span",{className:"rooms-list__id"});D.textContent=XL(G.id,20),D.title=G.id,L.appendChild(D);const B=KL(),U=h("button",{className:"rooms-list__copy-btn"});U.type="button",U.title="Copy room ID",U.appendChild(B),U.addEventListener("click",V=>{V.stopPropagation(),o?.(G.id);}),L.appendChild(U),X.appendChild(L);const E=h("div",{className:"rooms-list__bottom-row"}),P=h("div",{className:"rooms-list__bottom-left"}),A=h("div",{className:"rooms-list__avatars"});for(let V=0;V<G.maxPlayers;V++){const Z=h("div",{className:`rooms-list__avatar ${V<G.playerCount?"rooms-list__avatar--filled":"rooms-list__avatar--empty"}`});if(G.playerAvatars&&G.playerAvatars[V]){const _e=G.playerAvatars[V];if(_e.avatarUrl){const Ie=h("img",{src:_e.avatarUrl,alt:_e.name});Ie.style.width="100%",Ie.style.height="100%",Ie.style.objectFit="cover",Z.appendChild(Ie);}else Z.textContent="👤";Z.title=_e.name;}else V<G.playerCount&&(Z.textContent="👤");A.appendChild(Z);}P.appendChild(A);const M=h("span",{className:"rooms-list__count"});M.textContent=`${G.playerCount}/${G.maxPlayers}`,P.appendChild(M),E.appendChild(P);const K=G.playerCount>=G.maxPlayers,j=Me({label:"Join",variant:"primary",size:"sm",disabled:!a||K,onClick:()=>{n?.(G.id);}});return C.push(j),E.appendChild(j),X.appendChild(E),X}function R(G){S.innerHTML="",C.forEach(X=>{X.destroy?X.destroy():X.remove&&X.remove();}),C.length=0;const z=YL(G,c);if(z.length===0){const X=h("div",{className:"rooms-list__empty"});X.textContent=i,S.appendChild(X);}else z.forEach(X=>{const L=I(X);S.appendChild(L);});}return R(t),{root:u,setRooms(G){d=G,R(G);},setFilter(G){c=G,m.setValue(G),R(d);},setLastUpdated(G){v.textContent=JL(G),v.style.display="block";},setLoading(G){G?(w.style.display="flex",w.style.opacity="0",w.offsetWidth,w.style.opacity="1"):(w.style.opacity="0",setTimeout(()=>{w.style.display="none";},300));},destroy(){C.forEach(G=>{G.destroy?G.destroy():G.remove&&G.remove();}),C.length=0,_.forEach(G=>{G.destroy?G.destroy():G.remove&&G.remove();}),_.length=0,u.remove();}}}async function eN(e){const{state:t,defaultExpanded:n=true,onExpandChange:o}=e;let r=null,i=false;const a=!qe.isDiscord(),s=qe.isDiscord(),c=qe.detect().origin;async function d(){try{return (await _s.fetchRooms(1e3)).map(m=>({id:m.id,playerCount:m.playersCount,maxPlayers:6,playerAvatars:m.userSlots?.map(y=>({name:y.name,avatarUrl:y.avatarUrl}))}))}catch(g){return console.error("[Room] Failed to fetch rooms:",g),[]}}async function u(){if(!(i||!r)){i=true,r.setLoading(true);try{const g=await d(),m=new Date;r.setRooms(g),r.setLastUpdated(m),console.log(`[Room] Fetched ${g.length} rooms from Aries API`);}catch(g){console.error("[Room] Failed to refresh rooms:",g);}finally{i=false,r.setLoading(false);}}}const p=h("div",{style:"display: flex; flex-direction: column; gap: 12px;"});r=ZL({rooms:[],joinEnabled:a,onJoinRoom:g=>{const m=`${c}/r/${g}`;window.open(m,"_blank"),console.log(`[Room] Opening room: ${m}`);},onCopyRoomId:g=>{navigator.clipboard.writeText(g).then(()=>{console.log(`[Room] Room ID copied to clipboard: ${g}`);}).catch(m=>{console.error("[Room] Failed to copy room ID:",m);});},onRefresh:()=>{u();},emptyMessage:"No public rooms available",initialFilter:"5-6"}),p.appendChild(r.root);const f=Ee({title:"Public",subtitle:s?"List of available public rooms (view only on Discord)":"List of available public rooms",padding:"lg",expandable:true,defaultExpanded:n,onExpandChange:g=>{o?.(g),t.setCardExpanded("public",g),g&&!i&&u();}},p);return n&&u(),{root:f,destroy(){r&&(r.destroy(),r=null);}}}class tN extends Xt{constructor(n){super({id:"tab-room",label:"Room"});H(this,"publicCardHandle",null);this.deps=n;}destroy(){this.publicCardHandle&&(this.publicCardHandle.destroy(),this.publicCardHandle=null);}async build(n){const o=this.createGrid("12px");o.id="room",n.appendChild(o);let r;try{r=await UL();}catch{r={get:()=>od,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=r.get();this.publicCardHandle=await eN({state:r,defaultExpanded:!!i.ui.expandedCards.public}),o.appendChild(this.publicCardHandle.root);}}let Ql=null,Zl=null,ec=null;function nN(){return Ql||(Ql=new PT),Ql}function Dx(){return Zl||(Zl=new DL),Zl}function Bx(){return ec||(ec=new WM),ec}function oN(e){return [new lv(e),new U2,Dx(),Bx(),new rM(e),new RM(e),new jL,new tN(e)]}async function rN(){const e=Dx(),t=Bx(),n=nN();await Promise.all([e.preload(),t.preload(),n.preload()]);}function iN(e){const{shadow:t,initialOpen:n}=e,o=h("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=h("div",{className:"gemini-tabbar"}),i=h("div",{className:"gemini-content",id:"content"}),a=h("div",{className:"gemini-resizer",title:"Resize"}),s=h("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");o.append(r,i,a);const l=h("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:l}}function aN(e){const{resizer:t,host:n,shadow:o,onWidthChange:r,initialWidth:i,minWidth:a,maxWidth:s}=e;let l=a,c=s;function d(){const T=qe.detect(),k=Math.round(W.visualViewport?.width??W.innerWidth??0);if(T.platform==="mobile"||T.os==="ios"||T.os==="android"){const b=getComputedStyle(o.host),v=parseFloat(b.getPropertyValue("--inset-l"))||0,_=parseFloat(b.getPropertyValue("--inset-r"))||0,C=Math.max(280,k-Math.round(v+_));l=280,c=C;}else l=a,c=s;return {min:l,max:c}}function u(T){return Math.max(l,Math.min(c,Number(T)||i))}function p(T){const k=u(T);n.style.setProperty("--w",`${k}px`),r(k);}d();const f=qe.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const y=T=>{if(!m)return;T.preventDefault();const k=Math.round(W.innerWidth-T.clientX);p(k);},x=()=>{m&&(m=false,document.body.style.cursor="",W.removeEventListener("mousemove",y),W.removeEventListener("mouseup",x));},S=T=>{g&&(T.preventDefault(),m=true,document.body.style.cursor="ew-resize",W.addEventListener("mousemove",y),W.addEventListener("mouseup",x));};t.addEventListener("mousedown",S);function w(){t.removeEventListener("mousedown",S),W.removeEventListener("mousemove",y),W.removeEventListener("mouseup",x);}return {calculateResponsiveBounds:d,constrainWidthToLimits:u,setHudWidth:p,destroy:w}}function sN(e){const{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(l){const c=t.classList.contains("open");if(i&&l.key==="Escape"&&c){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const lN=`
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
`,cN=`
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
`,dN=`
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
`,uN=`
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
`,pN=`
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
  
`,fN=`
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
`,gN=`
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
`,mN=`
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
`,hN=`
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
`,bN=`
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
`,xN=`
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
`,yN=`
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
`,vN=`
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
`,wN=`
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
`,SN=`
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
`,CN=`
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
`,kN=`
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
`,_N=`
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
`,TN=`
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
`,AN=`
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
`,EN=`
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
`,IN=`
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
`,PN=`
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
`,MN=`
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
`,LN={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function NN(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,LN),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function RN(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function ON(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:l,buildSections:c,initialTab:d,onTabChange:u,toggleCombo:p=j=>j.ctrlKey&&j.shiftKey&&j.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:y,shadow:x}=NN(t),S=[[cN,"variables"],[dN,"primitives"],[uN,"utilities"],[lN,"hud"],[pN,"card"],[Bu,"badge"],[fN,"button"],[vN,"checkbox"],[gN,"input"],[mN,"label"],[hN,"navTabs"],[bN,"searchBar"],[xN,"select"],[yN,"switch"],[wN,"table"],[SN,"teamListItem"],[CN,"timeRangePicker"],[kN,"tooltip"],[_N,"slider"],[TN,"reorderableList"],[AN,"colorPicker"],[EN,"log"],[IN,"segmentedControl"],[PN,"soundPicker"],[MN,"settings"],[Tx,"teamCard"],[xh,"autoFavoriteSettings"]];for(let j=0;j<S.length;j++){const[V,Z]=S[j];Ae(x,V,Z),j%5===4&&await RN();}const{panel:w,tabbar:T,content:k,resizer:b,closeButton:v,wrapper:_}=iN({shadow:x,initialOpen:o});function C(j){w.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:j},bubbles:true})),i?.(j);}function I(j){const V=w.classList.contains("open");w.classList.toggle("open",j),w.setAttribute("aria-hidden",j?"false":"true"),j!==V&&C(j);}I(o),v.addEventListener("click",j=>{j.preventDefault(),j.stopPropagation(),I(false);});const R=tv({host:y,themes:a,initialTheme:s,onThemeChange:l}),F=aN({resizer:b,host:y,shadow:x,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});F.setHudWidth(n);const G=c({applyTheme:R.applyTheme,initialTheme:s,getCurrentTheme:R.getCurrentTheme,setHUDWidth:F.setHudWidth,setHUDOpen:I}),z=new oy(G,k,{applyTheme:R.applyTheme,getCurrentTheme:R.getCurrentTheme}),X=G.map(j=>({id:j.id,label:j.label})),L=d&&G.some(j=>j.id===d)?d:X[0]?.id||"",O=ny(X,L,j=>{z.activate(j),u?.(j);});O.root.style.flex="1 1 auto",O.root.style.minWidth="0",T.append(O.root,v);const D={"tab-auto-favorite":"autoFavorite","tab-pets":"pets"};function B(){const j=ve(ke.CONFIG,{autoFavorite:{enabled:true},pets:{enabled:true}});for(const[V,Z]of Object.entries(D))j[Z]?.enabled??true?O.showTab(V):O.hideTab(V);}function U(j){const{key:V}=j.detail;(V===ke.CONFIG||V==="feature:config")&&B();}window.addEventListener(mn.STORAGE_CHANGE,U),B();let E=L;if(!O.isTabVisible(L)){const j=O.getVisibleTabs();j.length>0&&(E=j[0]);}E&&z.activate(E);const P=sN({panel:w,onToggle:()=>I(!w.classList.contains("open")),onClose:()=>I(false),toggleCombo:p,closeOnEscape:f}),A=()=>{O.recalc();const j=parseInt(getComputedStyle(y).getPropertyValue("--w"))||n;F.calculateResponsiveBounds(),F.setHudWidth(j);};W.addEventListener("resize",A);const M=j=>{const V=j.detail?.width;V?F.setHudWidth(V):F.setHudWidth(n),O.recalc();};y.addEventListener("gemini:layout-resize",M);function K(){window.removeEventListener(mn.STORAGE_CHANGE,U),P.destroy(),F.destroy(),W.removeEventListener("resize",A),y.removeEventListener("gemini:layout-resize",M);}return {host:y,shadow:x,wrapper:_,panel:w,content:k,setOpen:I,setWidth:F.setHudWidth,sections:G,manager:z,nav:O,destroy:K}}const xo={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Er={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function $N(){return {isOpen:ve(xo.isOpen,Er.isOpen),width:ve(xo.width,Er.width),theme:ve(xo.theme,Er.theme),activeTab:ve(xo.activeTab,Er.activeTab)}}function ya(e,t){we(xo[e],t);}function FN(e,t){return ve(xo[e],t)}const DN="https://i.imgur.com/IMkhMur.png",BN="Stats";function GN(e){let t=e.iconUrl||DN;const n=e.ariaLabel||"Open MGH";let o=null,r=null,i=null,a=false,s=null,l=null;const c=["Chat","Leaderboard","Stats","Open Activity Log"],d=k=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(k):k.replace(/"/g,'\\"')}catch{return k}};function u(){const k=document.querySelector(c.map(v=>`button[aria-label="${d(v)}"]`).join(","));if(!k)return null;let b=k.parentElement;for(;b&&b!==document.body;){if(c.reduce((_,C)=>_+b.querySelectorAll(`button[aria-label="${d(C)}"]`).length,0)>=2)return b;b=b.parentElement;}return null}function f(k){const b=Array.from(k.querySelectorAll("button[aria-label]"));if(!b.length)return {refBtn:null,refWrapper:null};const v=b.filter(z=>z.dataset.mghBtn!=="true"&&(z.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),_=v.length?v:b,C=_.find(z=>(z.getAttribute("aria-label")||"").toLowerCase()===BN.toLowerCase())||null,I=_.length>=2?_.length-2:_.length-1,R=C||_[I],F=R.parentElement,G=F&&F.parentElement===k&&F.tagName==="DIV"?F:null;return {refBtn:R,refWrapper:G}}function g(k,b,v){const _=k.cloneNode(false);_.type="button",_.setAttribute("aria-label",b),_.title=b,_.dataset.mghBtn="true",_.style.pointerEvents="auto",_.removeAttribute("id");const C=document.createElement("img");return C.src=v,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",_.appendChild(C),_.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.();}catch{}}),_}function m(){if(a)return  false;a=true;let k=false;try{const b=u();if(!b)return !1;s!==b&&(s=b);const{refBtn:v,refWrapper:_}=f(b);if(!v)return !1;r=b.querySelector('div[data-mgh-wrapper="true"]'),!r&&_&&(r=_.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),k=!0);const C=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=C),o||(o=g(v,n,t),r?r.appendChild(o):o.parentElement!==b&&b.appendChild(o),k=!0),r&&r.parentElement!==b&&(b.appendChild(r),k=!0);const I=b;if(I&&I!==l){try{w.disconnect();}catch{}l=I,w.observe(l,{childList:!0,subtree:!0});}return k}finally{a=false;}}const y=document.getElementById("App")||document.body;let x=null,S=false;const w=new MutationObserver(()=>{S&&o&&document.contains(o)||(o&&!document.contains(o)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),S=false,o=null,r=null),x===null&&(x=window.setTimeout(()=>{if(x=null,m()&&o&&document.contains(o)&&(S=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),r)){const b=r.parentElement;b&&b.lastElementChild!==r&&b.appendChild(r);}},100)));});return m()&&o&&document.contains(o)?(S=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),w.observe(y,{childList:true,subtree:true}),i=()=>w.disconnect(),()=>{try{i?.();}catch{}try{r?.remove();}catch{}}}const Gx=[];function zN(){return Gx.slice()}function Vf(e){Gx.push(e);}function HN(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function jN(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const tc=Symbol.for("ariesmod.ws.handlers.patched");function Ge(e,t){if(typeof e=="string"){const r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return Vf(i),i}const n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Vf(o),o}function UN(e,t=zN(),n={}){const o=n.pageWindow??window,r=!!n.debug;if(e[tc])return ()=>{};e[tc]=true;const i={ws:e,pageWindow:o,debug:r},a=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,i)===!0)return}catch(f){r&&console.error("[WS] handler error",f,u);}},s=u=>{const p=jN(u.data),f=HN(p);a({kind:"message",raw:u.data,data:p,type:f});},l=u=>{a({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},c=u=>a({kind:"open",event:u}),d=u=>a({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",c),e.addEventListener("error",d),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",l);}catch{}try{e.removeEventListener("open",c);}catch{}try{e.removeEventListener("error",d);}catch{}try{delete e[tc];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Ge(Ct.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Ge(Ct.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Ge(Ct.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Ge(Ct.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Ge(Ct.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Ge(Ct.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Ge(Ct.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Ge(Ct.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Ge(Ct.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Ge(Ct.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Ge(Kt.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Ge(Kt.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Ge(Kt.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Ge(Kt.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Ge(Kt.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Ge(Kt.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Ge(Kt.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Ge(Kt.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});le(q.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));le(q.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));le(q.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));le(q.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));le(q.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));le(q.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));le(q.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));le(q.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));le(q.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));le(q.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));le(q.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));le(q.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));le(q.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));le(q.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));le(q.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));le(q.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));le(q.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));le(q.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));le(q.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));le(q.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));le(q.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));le(q.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));le(q.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));le(q.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));le(q.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));le(q.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));le(q.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));le(q.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));le(q.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));le(q.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));le(q.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");le(q.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));le(q.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));le(q.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));le(q.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));le(q.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));le(q.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));le(q.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));le(q.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));le(q.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));le(q.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));le(q.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));le(q.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));le(q.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));le(q.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));le(q.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));le(q.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function WN(e={}){const t=e.pageWindow??W,n=e.pollMs??500,o=!!e.debug,r=[];r.push(W1(t,{debug:o})),r.push(w2({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=UN(s,e.handlers,{debug:o,pageWindow:t}));};return a(us(t).ws),r.push(eh(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>us(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let va=null;function VN(e={}){return va||(va=WN(e),va)}function qN(e,t){const n=new MutationObserver(r=>{for(const i of r)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const l of s)t(l);}});n.observe(document.body,{childList:true,subtree:true});const o=document.querySelectorAll(e);for(const r of o)t(r);return {disconnect:()=>n.disconnect()}}function XN(e,t){const n=new MutationObserver(o=>{for(const r of o)for(const i of r.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const zx=768,qf=6,nc=62,oc=50,KN=.5,YN=.4,wa=36,Sa=28,JN=6,rd=4,QN=8,ZN=100,eR=200,Xf=14,Kf=3,tR=40,nR=50,Yf=2147483646,Ir="gemini-bulk-favorite-sidebar",oR="gemini-bulk-favorite-top-row",rR="gemini-bulk-favorite-bottom-row",id="gemini-qol-bulkFavorite-styles",iR=`
/* Desktop: vertical scrollable list next to inventory */
#${Ir} {
  display: flex;
  flex-direction: column;
  gap: ${JN}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Yf};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${rd}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Yf};
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

#${Ir}::-webkit-scrollbar {
  width: 4px;
}

#${Ir}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${Ir}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${nc}px;
  height: ${nc}px;
  min-width: ${nc}px;
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
  width: ${oc}px;
  height: ${oc}px;
  min-width: ${oc}px;
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
  width: ${wa}px;
  height: ${wa}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${Sa}px;
  height: ${Sa}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Kf}px;
  right: ${Kf}px;
  width: ${Xf}px;
  height: ${Xf}px;
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
  width: ${wa}px;
  height: ${wa}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${Sa}px;
  height: ${Sa}px;
  font-size: 14px;
}
`,aR='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',sR='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function lR(e){const{species:t,itemCount:n,isFavorited:o,isMobile:r,onClick:i}=e,a=h("button",{className:`gemini-qol-bulkFavorite-btn${r?" mobile":""}`,title:`${o?"Unfavorite":"Favorite"} all ${n} ${t}`});return a.dataset.species=t,a.appendChild(cR(t,r)),a.appendChild(dR(o)),a.appendChild(uR(t)),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),i();}),a}function cR(e,t){try{if(!Q.isReady()||!Q.has("plant",e))return Jf(e);const n=t?YN:KN,o=Q.toCanvas("plant",e,{scale:n});return o.className="gemini-qol-bulkFavorite-sprite",o}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Jf(e)}}function Jf(e){return h("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function dR(e){const t=h("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?aR:sR,t}function uR(e){return h("span",{className:"gemini-qol-bulkFavorite-label"},e)}let Pt=null,Mt=null,Et=null,Ka=false,Vr=null,Pr=false,No=null;const ad=[];function Ca(e){ad.push(e);}function pR(){for(const e of ad)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}ad.length=0;}function Hx(){return window.innerWidth<=zx}function fR(e){return new Promise(t=>setTimeout(t,e))}function jx(){if(Ka)return;if(document.getElementById(id)){Ka=true;return}const e=document.createElement("style");e.id=id,e.textContent=iR,document.head.appendChild(e),Ka=true;}function gR(){document.getElementById(id)?.remove(),Ka=false;}function mR(){const e=kt().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const r of e.items){const i=r;if(i.itemType!=="Produce")continue;const a=i.species,s=i.id;if(!a||!s)continue;const l=n.get(a);l?l.push(s):n.set(a,[s]);}const o=[];for(const[r,i]of n){const a=i.length>0&&i.every(s=>t.has(s));o.push({species:r,itemIds:i,allFavorited:a});}return o.sort((r,i)=>r.species.localeCompare(i.species)),o}async function hR(e){const t=kt().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),o=[];for(const a of t.items){const s=a;if(s.itemType!=="Produce"||s.species!==e)continue;const l=s.id;l&&o.push({id:l,favorited:n.has(l)});}if(o.length===0)return;const r=o.every(a=>a.favorited),i=r?o.filter(a=>a.favorited):o.filter(a=>!a.favorited);console.log(`🔄 [BulkFavorite] ${r?"Unfavoriting":"Favoriting"} ${i.length}/${o.length} ${e}`);for(const a of i)Us(a.id),await fR(tR);}function sd(e,t){const{species:n,itemIds:o,allFavorited:r}=e;return lR({species:n,itemCount:o.length,isFavorited:r,isMobile:t,onClick:()=>hR(n)})}function bR(e){const t=h("div",{id:Ir}),n=e.getBoundingClientRect(),o=Math.max(window.innerHeight-ZN,eR);return t.style.maxHeight=`${o}px`,t.style.position="fixed",t.style.left=`${n.right+QN}px`,t.style.top=`${n.top}px`,t}function Qf(e,t,n){const o=h("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),r=t.getBoundingClientRect();return n==="top"?o.style.bottom=`${window.innerHeight-r.top+rd}px`:o.style.top=`${r.bottom+rd}px`,o.style.left=`${r.left}px`,o.style.maxWidth=`${r.width}px`,o}function Zf(){const e=mR();Hx()?yR(e):xR(e);}function xR(e){if(Pt){if(Pt.innerHTML="",e.length===0){Pt.style.display="none";return}Pt.style.display="flex";for(const t of e)Pt.appendChild(sd(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function yR(e){if(!Mt||!Et)return;if(Mt.innerHTML="",Et.innerHTML="",e.length===0){Mt.style.display="none",Et.style.display="none";return}Mt.style.display="flex";const t=e.slice(0,qf),n=e.slice(qf);for(const o of t)Mt.appendChild(sd(o,true));if(n.length>0){Et.style.display="flex";for(const o of n)Et.appendChild(sd(o,true));}else Et.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function vR(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=zx)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const o=window.innerWidth/2;let r=null,i=0;const a=e.querySelectorAll(".McFlex, .McGrid");for(const s of a){const l=s.getBoundingClientRect();if(l.width<200||l.height<200||l.width>window.innerWidth-100)continue;const c=l.left+l.width/2,d=1-Math.abs(c-o)/o,p=l.width*l.height*d;p>i&&(r=s,i=p);}if(r){const s=r.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),r}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let Ro=null;function ld(){Ro&&clearTimeout(Ro),Ro=setTimeout(()=>{wR();},nR);}function wR(){const e=vR();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),qr(),jx(),Vr=e,Hx()?(Mt=Qf(oR,e,"top"),Et=Qf(rR,e,"bottom"),document.body.appendChild(Mt),document.body.appendChild(Et)):(Pt=bR(e),document.body.appendChild(Pt)),Zf(),No&&No(),No=kt().subscribeFavorites(()=>{Pr&&Zf();});}function qr(){Ro&&(clearTimeout(Ro),Ro=null),No&&(No(),No=null),Pt?.remove(),Pt=null,Mt?.remove(),Mt=null,Et?.remove(),Et=null,Vr=null;}function SR(){qr();}async function cd(){if(!Ri().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}jx();const t=await Os.onChangeNow(r=>{const i=r==="inventory";i!==Pr&&(Pr=i,i?ld():qr());}),n=qN(".McGrid",()=>{Pr&&(Pt||Mt||ld());}),o=XN(".McGrid",r=>{Vr&&Vr===r&&qr();});Ca(()=>t()),Ca(()=>n.disconnect()),Ca(()=>o.disconnect()),Ca(()=>{qr(),Pr=false,Vr=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function dd(){pR(),gR(),console.log("🛑 [BulkFavorite] Stopped");}function CR(e){const t=Ri();t.enabled=e,e?cd():dd();}let ka=false;const kR={init(){ka||(cd(),ka=true);},destroy(){ka&&(dd(),ka=false);},isEnabled(){return qh()},renderButton:ld,removeButton:SR,startWatching:cd,stopWatching:dd,setEnabled:CR},_R=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,TR=`
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
`;let eg=false;function AR(){if(eg)return;eg=true;const e=document.createElement("style");e.textContent=TR,document.head.appendChild(e);}const tg=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],ng=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function ER(){const e=document.querySelector(tg.map(n=>`button[aria-label="${ng(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(tg.reduce((o,r)=>o+t.querySelectorAll(`button[aria-label="${ng(r)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function IR(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(s=>s.dataset.alertBtn!=="true"&&(s.getAttribute("aria-label")||"")!=="Alerts"),o=n.length?n:t,r=o[o.length-1]||null,i=r?.parentElement,a=i&&i.parentElement===e&&i.tagName==="DIV"?i:null;return {refBtn:r,refWrapper:a}}function PR(e,t,n){const o=e.cloneNode(false);o.type="button",o.setAttribute("aria-label",t),o.title=t,o.dataset.alertBtn="true",o.style.pointerEvents="auto",o.style.position="relative",o.removeAttribute("id");const r=document.createElement("div");return r.innerHTML=n,r.dataset.alertIcon="true",r.style.pointerEvents="none",r.style.userSelect="none",r.style.width="76%",r.style.height="76%",r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.margin="auto",o.appendChild(r),o}function MR(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function LR(e){AR();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:_R,n=e.ariaLabel||"Alerts";let o=null,r=null,i=null,a=null,s=false,l=null,c=null,d=null;function u(){if(s)return  false;s=true;let x=false;try{const S=ER();if(!S)return !1;l!==S&&(l=S);const{refBtn:w,refWrapper:T}=IR(S);if(!w)return !1;r=S.querySelector('div[data-alert-wrapper="true"]'),!r&&T&&(r=T.cloneNode(!1),r.dataset.alertWrapper="true",r.removeAttribute("id"),x=!0);const k=r?.querySelector('button[data-alert-btn="true"]')||null;o||(o=k),o||(o=PR(w,n,t),o.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();try{e.onClick?.();}catch{}}),i=MR(),o.appendChild(i),r?r.appendChild(o):o.parentElement!==S&&S.appendChild(o),x=!0),r&&r.parentElement!==S&&(S.appendChild(r),x=!0);const b=S;if(b&&b!==c){try{m.disconnect();}catch{}c=b,m.observe(c,{childList:!0,subtree:!0});}return x}finally{s=false;}}const p=document.getElementById("App")||document.body;let f=null,g=false;const m=new MutationObserver(()=>{g&&o&&document.contains(o)||(o&&!document.contains(o)&&(g=false,o=null,i=null,r=null),f===null&&(f=window.setTimeout(()=>{if(f=null,u()&&o&&document.contains(o)&&(g=true,r)){const S=r.parentElement;S&&S.lastElementChild!==r&&S.appendChild(r);}},100)));});return u()&&o&&document.contains(o)&&(g=true),m.observe(p,{childList:true,subtree:true}),a=()=>m.disconnect(),{get root(){return o},updateBadge(x){i&&(x>0?(i.textContent=String(x),i.style.display="flex"):i.style.display="none");},ring(){if(!o)return;const x=o.querySelector('[data-alert-icon="true"]');x&&(x.classList.add("alert-btn-ringing"),setTimeout(()=>{x?.classList.remove("alert-btn-ringing");},600));},startRinging(){o&&(d!==null&&clearInterval(d),this.ring(),d=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(d!==null&&(clearInterval(d),d=null),o){const x=o.querySelector('[data-alert-icon="true"]');x&&x.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{a?.();}catch{}try{r?.remove();}catch{}}}}const NR=`
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
`;function RR(e,t){const n=h("div",{className:"alert-item-row"}),o=h("div",{className:"alert-item-sprite"});if(e.spriteId)try{const c=Q.toCanvas(e.spriteId,{scale:.35});c?o.appendChild(c):o.textContent="?";}catch{o.textContent="?";}else o.textContent="?";const r=h("div",{className:"alert-item-info"}),i=h("div",{className:"alert-item-name"},e.itemName),a=h("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);r.appendChild(i),r.appendChild(a);const s=h("div",{className:"alert-item-actions"}),l=h("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return l.addEventListener("click",c=>{c.stopPropagation(),t?.(e);}),s.appendChild(l),n.appendChild(o),n.appendChild(r),n.appendChild(s),n}function OR(){const e=h("div",{className:"alert-overlay-empty"}),t=h("div",{className:"alert-overlay-empty-icon"},"🔔"),n=h("div",{className:"alert-overlay-empty-text"},"No items available"),o=h("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(o),e}function og(e,t){const n=t.getBoundingClientRect(),o=340,r=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let i=n.bottom+r,a=window.innerWidth-n.right;const s=i+480>window.innerHeight,l=n.right-o<r;s?(e.style.bottom=`${window.innerHeight-n.top+r}px`,e.style.top="auto"):e.style.top=`${i}px`,e.style.right=`${a}px`,l&&(e.style.right="auto",e.style.left=`${r}px`);}function $R(e){const{items:t,anchorElement:n,onClose:o,onBuyAll:r}=e,i=h("div",{className:"alert-overlay"}),a=FN("theme",Er.theme),s=yo[a];let l="";s&&(l=`.alert-overlay {
    ${Object.entries(s).map(([S,w])=>`${S}: ${w};`).join(`
    `)}
  }

`);const c=document.createElement("style");c.textContent=l+NR,i.appendChild(c);const d=h("div",{className:"alert-overlay-header"}),u=h("div",{className:"alert-overlay-title"},"Available Items"),p=h("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");p.addEventListener("click",x=>{x.stopPropagation(),o?.();}),d.appendChild(u),d.appendChild(p);const f=h("div",{className:"alert-overlay-list"});i.appendChild(d),i.appendChild(f);const g=x=>{if(f.replaceChildren(),x.length===0)f.appendChild(OR());else for(const S of x){const w=RR(S,r);f.appendChild(w);}};g(t),og(i,n);const m=()=>{og(i,n);};window.addEventListener("resize",m);const y=x=>{const S=x.target;!i.contains(S)&&!n.contains(S)&&o?.();};return document.addEventListener("click",y,{capture:true}),{root:i,updateItems:g,destroy(){window.removeEventListener("resize",m),document.removeEventListener("click",y,{capture:true}),i.remove();}}}const FR={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},DR={seed:"seed",tool:null,egg:null,decor:null};function Ux(e,t,n){try{const o=FR[t],r=J.get(o);if(!r||typeof r!="object")return null;const i=r[e];if(!i||typeof i!="object")return null;const a=DR[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch{return null}}function BR(e,t){return Ux(e,t,"spriteId")}function GR(e,t){return Ux(e,t,"name")??e}function zR(e,t){const n=$t.getTrackedItems(),o=new Set(n.filter(i=>i.shopType===e).map(i=>i.itemId));return o.size===0?[]:t.items.filter(i=>{const a=o.has(i.id),s=i.isAvailable;return a&&s}).map(i=>({shopType:e,itemId:i.id,itemName:GR(i.id,e),spriteId:BR(i.id,e),remaining:i.remaining,price:i.price}))}function Mr(){const t=no().get(),n=["seed","tool","egg","decor"],o=[];for(const r of n){const i=t.byType[r];if(i){const a=zR(r,i);o.push(...a);}}return o}function HR(e){return no().subscribeStable(()=>{const o=Mr();e(o);})}function jR(){let e=null,t=null,n=null,o=false,r=[],i=[],a="",s=0,l=0,c=false,d=null,u=[],p=0,f=false;const g=()=>{try{return Le.CustomSounds.getNotificationConfig("shop")}catch{return null}},m=(E,P)=>{try{const A=de.getItemCustomSound("shop",E,P);return A?{soundId:A.soundId,volume:A.volume,mode:A.mode}:null}catch{return null}},y=E=>`${E.soundId}:${E.volume}`,x=(E,P,A,M)=>{P.has(A)||(E.push({soundId:A,volume:M}),P.add(A));},S=(E,P)=>{const A=[],M=new Set;let K=false;const j=[];for(const V of E){const Z=m(V.itemId,V.shopType);Z?Z.mode==="one-shot"&&j.push({soundId:Z.soundId,volume:Z.volume}):P?.mode==="one-shot"&&(K=true);}K&&P&&x(A,M,P.soundId,P.volume);for(const V of j)x(A,M,V.soundId,V.volume);return A},w=(E,P)=>{const A=[],M=new Set;let K=false;const j=[];for(const V of E){const Z=m(V.itemId,V.shopType);Z?Z.mode==="loop"&&j.push({soundId:Z.soundId,volume:Z.volume}):P?.mode==="loop"&&(K=true);}K&&P&&x(A,M,P.soundId,P.volume);for(const V of j)x(A,M,V.soundId,V.volume);return A},T=(E,P,A,M=false)=>{if(!A())return;const K=de.getById(E.soundId);if(!K){P();return}M&&(d=K.source),Le.playCustom(K.source,{volume:E.volume/100}).then(j=>{if(!A())return;const V=j.audio,Z=()=>{A()&&P();};V.addEventListener("ended",Z,{once:true});}).catch(()=>{A()&&P();});},k=()=>{if(!c||i.length===0)return;const E=i[s];s=(s+1)%i.length;const P=l,A=()=>c&&l===P;T(E,()=>{A()&&k();},A,true);},b=()=>{c||i.length===0||(c=true,s>=i.length&&(s=0),k());},v=()=>{if(c){l+=1,c=false;try{const E=Le.getCustomHandle();(!d||E&&E.url===d)&&Le.CustomSounds.stop();}catch{}d=null;}},_=()=>{v(),i=[],a="",s=0,d=null;},C=()=>{if(u.length===0){f=false,b();return}f=true;const E=u.shift(),P=p,A=()=>f&&p===P;T(E,()=>{A()&&C();},A);},I=(E,P)=>{const A=P??g(),M=S(E,A);if(M.length===0)return;const K=new Set(u.map(j=>j.soundId));for(const j of M)K.has(j.soundId)||(u.push(j),K.add(j.soundId));f||(p+=1,v(),C());},R=(E,P)=>{const A=P??g(),M=w(E,A);if(M.length===0){_();return}const K=M.map(y).join("|"),j=K!==a;i=M,a=K,j&&(s=0,c&&v()),!f&&(c||b());},F=E=>{const P=r.length>0,A=E.length>0;r=E,e?.updateBadge(E.length),A?P||e?.startRinging():P&&e?.stopRinging();},G=()=>{if(o||!e?.root)return;const E=Mr();t=$R({items:E,anchorElement:e.root,onClose:z,onBuyAll:P=>{switch(P.shopType){case "seed":On.seed.buyAll(P.itemId);break;case "egg":On.egg.buyAll(P.itemId);break;case "decor":On.decor.buyAll(P.itemId);break;case "tool":On.tool.buyAll(P.itemId);break}}}),document.body.appendChild(t.root),o=true;},z=()=>{!o||!t||(t.destroy(),t=null,o=false);},X=()=>{o?z():G();},L=E=>{if(F(E),o&&t&&t.updateItems(E),R(E),E.length>0){const P=new CustomEvent("gemini:alert-available",{detail:{items:E}});window.dispatchEvent(P);}},O=()=>{const E=Mr(),P=new Set(r.map(j=>`${j.shopType}:${j.itemId}`)),A=E.filter(j=>!P.has(`${j.shopType}:${j.itemId}`)),M=A.length>0;F(E),o&&t&&t.updateItems(E);const K=g();R(E,K),M&&I(A,K);};e=LR({onClick:X,ariaLabel:"Alerts"}),n=HR(L),window.addEventListener("gemini:tracked-items-changed",O);const D=E=>{const P=E,{shopType:A,items:M}=P.detail;if(!M||M.length===0)return;const K=M.map(j=>({itemId:j.itemId,shopType:A}));I(K,g());};window.addEventListener("gemini:shop-restock-tracked",D);const B=E=>{if(E.detail?.entityType!=="shop")return;const A=Mr();R(A,g());};window.addEventListener(mn.CUSTOM_SOUND_CHANGE,B);const U=(E=1,P=10)=>{if(no().get().all.some(j=>j.items.length>0)||E>=P){const j=Mr();F(j);const V=g();R(j,V),j.length>0&&I(j,V);}else setTimeout(()=>U(E+1,P),500);};return U(),{destroy(){z(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",O),window.removeEventListener("gemini:shop-restock-tracked",D),window.removeEventListener(mn.CUSTOM_SOUND_CHANGE,B),e?.destroy(),e=null,u=[],p+=1,f=false,_();}}}const UR=`
  .gemini-qol-storageValue {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    padding-left: 2px;
  }

  .gemini-qol-storageValue-sprite {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .gemini-qol-storageValue-text {
    font-size: 14px;
    color: var(--accent);
    font-weight: 700;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .gemini-qol-storageValue {
      gap: 4px;
    }

    .gemini-qol-storageValue-sprite {
      width: 16px;
      height: 16px;
    }

    .gemini-qol-storageValue-text {
      font-size: 12px;
    }
  }
`,rc={seed:"SeedSilo",pet:"PetHutch",decor:"DecorShed"};function rg(e){return Array.isArray(e)?e.filter(t=>typeof t=="object"&&t!==null&&"items"in t):[]}function WR(e){if(typeof e=="string")return e;if(e&&typeof e=="object"&&"decorId"in e){const t=e.decorId;return typeof t=="string"?t:null}return null}function ic(e,t){return e.filter(o=>WR(o.decorId)===t).flatMap(o=>o.items??[])}function ig(e){if(!e.length)return 0;const t=J.get("plants");return t?e.reduce((n,o)=>{const i=t[o.species]?.seed?.coinPrice??0;return n+i*(o.quantity??0)},0):0}function ag(e){if(!e.length)return 0;const t=J.get("decor");return t?e.reduce((n,o)=>{const i=t[o.decorId]?.coinPrice??0;return n+i*(o.quantity??0)},0):0}function VR(e){const t=J.get("pets");if(!t)return 0;const n=t[e.petSpecies],o=n?.maturitySellPrice??n?.sellPrice??0,r=_i(e.petSpecies,e.targetScale),i=Ti(e.petSpecies,e.xp,r),s=dh(i,r)*e.targetScale,l=Zd(e.mutations??[]);return Math.round(o*s*l)}function sg(e){return e.length?e.reduce((t,n)=>t+VR(n),0):0}function qR(){return {async start(e){const t=[],n=(l,c)=>{const d=ic(l,rc.seed).filter(g=>g.itemType==="Seed"),u=ig(d),p=c.filter(g=>g.itemType==="Seed"),f=ig(p);e({kind:"seed",storageValue:u,inventoryValue:f,totalValue:u+f});},o=(l,c)=>{const d=ic(l,rc.decor).filter(g=>g.itemType==="Decor"),u=ag(d),p=c.filter(g=>g.itemType==="Decor"),f=ag(p);e({kind:"decor",storageValue:u,inventoryValue:f,totalValue:u+f});},r=(l,c)=>{const d=ic(l,rc.pet).filter(g=>g.itemType==="Pet"),u=sg(d),p=c.filter(g=>g.itemType==="Pet"),f=sg(p);e({kind:"pet",storageValue:u,inventoryValue:f,totalValue:u+f});},i=l=>{const c=rg(l?.storages??[]),d=l?.items??[];n(c,d),o(c,d),r(c,d);},a=l=>{const c=rg(l);n(c,[]),o(c,[]),r(c,[]);};let s=null;try{s=await xe.subscribeImmediate("myInventoryAtom",i);}catch(l){console.warn("[StorageValueIndicator] Failed to subscribe myInventoryAtom",l);try{s=await xe.subscribeImmediate("myItemStoragesAtom",a);}catch(c){console.warn("[StorageValueIndicator] Failed to subscribe myItemStoragesAtom",c);}}return s&&t.push(s),()=>{for(const l of t)try{l();}catch{}t.length=0;}}}}const XR={seed:"Seeds in Silo",pet:"Pets in Hutch",decor:"Decor in Shed"},lg="gemini-qol-storageValue-styles",KR="gemini-qol-storageValue",Wx="gemini-qol-storageValue-text",YR={seedSilo:"seed",petHutch:"pet",decorShed:"decor"};let Wt=Ue(),yi=false,Ya=false,Yn=null,ud=null,ft=null,Xr="",_a=null,Vt={seed:{storage:0,inventory:0,total:0},pet:{storage:0,inventory:0,total:0},decor:{storage:0,inventory:0,total:0}},Hn=null;function Vx(){if(Ya)return;if(document.getElementById(lg)){Ya=true;return}const e=document.createElement("style");e.id=lg,e.textContent=UR,document.head.appendChild(e),Wt.add(()=>e.remove()),Ya=true;}function Vu(){ft?.remove(),ft=null,ud=null,Xr="";}function pd(e){if(!ft)return;const t=ft.querySelector(`.${Wx}`);t&&(t.textContent=Xx(e),ft.dataset.rawValue=String(Math.round(e)),ft.title=`${e.toLocaleString()} coins`);}function Ja(){if(!ft||!Yn)return;const e=Vt[Yn];ft.dataset.rawValue=String(Math.round(e.total)),ft.title=`${e.storage.toLocaleString()} + ${e.inventory.toLocaleString()}`;}function qx(){const e=Vt.seed,t=Vt.pet,n=Vt.decor;return `${e.storage}|${e.inventory}|${e.total}|${t.storage}|${t.inventory}|${t.total}|${n.storage}|${n.inventory}|${n.total}`}function JR(e){const t=document.createElement("div");t.className=KR,t.dataset.rawValue=String(Math.round(e)),t.title=`${e.toLocaleString()} coins`;const n=document.createElement("div");n.className="gemini-qol-storageValue-sprite";const o=document.createElement("canvas");o.width=20,o.height=20,n.appendChild(o);const r=document.createElement("div");r.className=Wx,r.textContent=Xx(e),t.appendChild(n),t.appendChild(r);try{const i=Q.toCanvas("ui","Coin");if(i){const a=o.getContext("2d");if(a){const s=Math.min(o.width/i.width,o.height/i.height),l=i.width*s,c=i.height*s,d=(o.width-l)/2,u=(o.height-c)/2;a.drawImage(i,d,u,l,c);}}}catch(i){console.warn("[StorageValueIndicator] Failed to render coin sprite:",i);}return t}function Xx(e){const t=Math.round(e);if(t>=1e15)return `${(t/1e15).toFixed(2)}Q`;if(t>=1e12)return `${(t/1e12).toFixed(2)}T`;if(t>=1e9)return `${(t/1e9).toFixed(2)}B`;if(t>=1e6)return `${(t/1e6).toFixed(2)}M`;if(t>=1e3){const n=t/1e3;return n>=100?`${Math.round(n)}K`:`${n.toFixed(1)}K`}return String(t)}function Qa(e){const t=XR[e],n=document.querySelectorAll(".chakra-text, p, span");for(const o of n){if(o.textContent?.trim()!==t||!o.offsetParent)continue;const i=o.closest(".McGrid");if(!(!i||!i.querySelector(".McFlex")))return i}return null}function Kx(){return Qa("seed")?"seed":Qa("pet")?"pet":Qa("decor")?"decor":null}function QR(e){const t=Qa(e);if(!t)return;const n=qx();if(t===ud&&ft?.isConnected){n!==Xr&&(Xr=n,pd(Vt[e].total),Ja()),pd(Vt[e].total),Ja();return}Vu(),ud=t;const o=JR(Vt[e].total);ft=o,Xr=n,Ja();const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="flex-start",r.style.position="relative",r.style.minHeight="20px",r.appendChild(o),t.insertBefore(r,t.firstChild),Wt.add(()=>r.remove());}function fd(e){if(e!==Yn){if(Yn=e,!e){Vu();return}Vx(),QR(e);}}async function ZR(){if(_a)return;_a=await qR().start(({kind:t,storageValue:n,inventoryValue:o,totalValue:r})=>{Vt[t]={storage:n,inventory:o,total:r},Yn===t&&ft&&(Xr=qx(),pd(r),Ja());}),Wt.add(()=>{_a?.(),_a=null;});}function Za(){const e=Yn??Kx();fd(e);}function eO(){Hn!==null&&clearTimeout(Hn),Hn=window.setTimeout(()=>{Hn=null,Ko()||Ot(()=>Za());},200);}function tO(){setTimeout(Za,100),setTimeout(Za,400),setTimeout(Za,800);const e=new MutationObserver(()=>{Ko()||eO();});e.observe(document.body,{childList:true,subtree:true}),oo(Wt,e),Wt.add(()=>{Hn!==null&&(clearTimeout(Hn),Hn=null);});}function nO(){yi||(yi=true,Vx(),ZR(),Os.onChangeNow(e=>{const t=e?YR[String(e)]??null:null;if(t){fd(t);return}const n=Kx();fd(n);}).then(e=>{Wt.add(()=>e());}),tO());}function oO(){yi&&(yi=false,Vu(),Wt.run(),Wt.clear(),Wt=Ue(),Ya=false,Yn=null,Vt={seed:{storage:0,inventory:0,total:0},pet:{storage:0,inventory:0,total:0},decor:{storage:0,inventory:0,total:0}});}function rO(){return yi}const iO={init:nO,destroy:oO,isEnabled:rO};function aO(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=eh(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),VN({debug:false}),()=>{t?.(),t=null;}}async function sO(e){e.logStep("Atoms","Prewarming Jotai store...");try{await fm(),await Rs({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function lO(e){e.logStep("Globals","Initializing global variables...");try{hh(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function cO(e){e.logStep("API","Exposing Gemini API...");try{GL(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function ac(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function dO(e){e.logStep("HUD","Loading HUD preferences..."),await ac();const t=$N();await ac();const n=await ON({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>ya("width",o),onOpenChange:o=>ya("isOpen",o),themes:yo,initialTheme:t.theme,onThemeChange:o=>ya("theme",o),buildSections:o=>oN({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme,setHUDWidth:o.setHUDWidth,setHUDOpen:o.setHUDOpen}),initialTab:t.activeTab,onTabChange:o=>ya("activeTab",o)});return await ac(),e.logStep("HUD","HUD ready","success"),n}async function uO(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await bh(o=>{o.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):o.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${o.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function pO(e){try{Q.isReady()||await Q.init(),J.resolveSprites();const t=[],n=J.get("plants");if(n)for(const l of Object.values(n))l?.seed?.spriteId&&t.push(l.seed.spriteId),l?.plant?.spriteId&&t.push(l.plant.spriteId),l?.crop?.spriteId&&t.push(l.crop.spriteId);const o=J.get("pets");if(o)for(const l of Object.values(o))l?.spriteId&&t.push(l.spriteId);const r=J.get("items");if(r)for(const l of Object.values(r))l?.spriteId&&t.push(l.spriteId);const i=J.get("eggs");if(i)for(const l of Object.values(i))l?.spriteId&&t.push(l.spriteId);const a=J.get("decor");if(a)for(const l of Object.values(a))l?.spriteId&&t.push(l.spriteId);const s=[...new Set(t)];s.length>0&&await Q.warmup(s,()=>{},5);}catch(t){console.warn("[Bootstrap] Sprite warmup failed",t);}}async function fO(e){e.logStep("Sections","Preloading UI sections...");try{await rN(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function gO(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:ko.init.bind(ko)},{name:"PetTeam",init:pe.init.bind(pe)},{name:"BulkFavorite",init:zc.init.bind(zc)},{name:"XPTracker",init:Uc.init.bind(Uc)},{name:"CropValueIndicator",init:Ga.init.bind(Ga)},{name:"CropSizeIndicator",init:ja.init.bind(ja)},{name:"ShopNotifier",init:$t.init.bind($t)},{name:"WeatherNotifier",init:jo.init.bind(jo)},{name:"PetHungerNotifier",init:xi.init.bind(xi)},{name:"AriesAPI",init:_s.init.bind(_s)},{name:"HarvestLocker",init:td.init.bind(td)},{name:"MissingVariantsIndicator",init:Vl.init.bind(Vl)},{name:"Journal",init:Be.init.bind(Be)}];let n=0;for(const o of t)try{o.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(r){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${o.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${o.name} init failed`,r);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const o=os();o.register({id:"bulkFavoriteInject",name:"Bulk Favorite Inject",description:"Quick favorite/unfavorite multiple mutations",injection:kR,storageKey:ke.BULK_FAVORITE,defaultEnabled:!1}),o.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:Ga.render,storageKey:ke.CROP_VALUE_INDICATOR,defaultEnabled:!1}),o.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:ja.render,storageKey:ke.CROP_SIZE_INDICATOR,defaultEnabled:!1}),o.register({id:"missingVariantsIndicator",name:"Missing Variants",description:"Shows colored letters for unlogged crop variants",injection:Vl.render,storageKey:ke.MISSING_VARIANTS_INDICATOR,defaultEnabled:!1}),o.register({id:"storageValueIndicator",name:"Storage Value",description:"Shows total coin value for storage modals",injection:iO,storageKey:an.STORAGE_VALUE_INDICATOR,defaultEnabled:!0}),o.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(o){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",o);}}Lg();oS();(async function(){dy();const e=ey({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=aO(e),await sO(e),lO(e),cO(e),await uO(e),await Promise.all([(async()=>{gO(e);})(),(async()=>{await pO(e);})()]),await fO(e),e.succeed("Gemini is ready!");}catch(o){e.fail("Failed to initialize the mod.",o);}finally{t?.();}const n=await dO(e);GN({onClick:()=>n.setOpen(true)}),jR();})();

})();