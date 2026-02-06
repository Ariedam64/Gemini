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
  var uv=Object.defineProperty;var pv=(e,t,n)=>t in e?uv(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var j=(e,t,n)=>pv(e,typeof t!="symbol"?t+"":t,n);function m(e,t=null,...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(const r of n)r==null||r===false||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}const ca="https://i.imgur.com/k5WuC32.png",Wp="gemini-loader-style",zn="gemini-loader",pm=80;function fv(){if(document.getElementById(Wp))return;const e=document.createElement("style");e.id=Wp,e.textContent=`
    /* ===== Loader Variables ===== */
    #${zn} {
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
    #${zn} {
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

    #${zn}.gemini-loader--error .gemini-loader__actions {
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
    #${zn}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${zn}.gemini-loader--error .gemini-loader__spinner {
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
      #${zn} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function da(e,t,n){const o=m("div",{className:`gemini-loader__log ${n}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>pm;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function gv(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(ca);return}GM_xmlhttpRequest({method:"GET",url:ca,responseType:"blob",onload:t=>{const n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(ca),o.readAsDataURL(n);},onerror:()=>e(ca)});})}function mv(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;fv();const n=m("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=m("div",{className:"gemini-loader__logs"}),r=m("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=m("div",{className:"gemini-loader__spinner"},r);gv().then(x=>{r.src=x;});const a=m("div",{className:"gemini-loader__card"},m("div",{className:"gemini-loader__header"},i,m("div",{className:"gemini-loader__titles"},m("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=m("div",{id:zn},a);(document.body||document.documentElement).appendChild(s);const l=m("div",{className:"gemini-loader__actions"},m("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);const c=x=>{n.textContent=x;},d=new Map,u=(x,b)=>{x.className=`gemini-loader__log ${b}`;};return {log:(x,b="info")=>da(o,x,b),logStep:(x,b,C="info")=>{const S=String(x||"").trim();if(!S){da(o,b,C);return}const _=d.get(S);if(_){_.el.lastElementChild&&(_.el.lastElementChild.textContent=b),_.tone!==C&&(u(_.el,C),_.tone=C);return}const E=m("div",{className:`gemini-loader__log ${C}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:b}));for(d.set(S,{el:E,tone:C}),o.appendChild(E);o.childElementCount>pm;){const v=o.firstElementChild;if(!v)break;const w=Array.from(d.entries()).find(([,k])=>k.el===v)?.[0];w&&d.delete(w),v.remove();}o.scrollTop=o.scrollHeight;},setSubtitle:c,succeed:(x,b=600)=>{x&&da(o,x,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b);},fail:(x,b)=>{da(o,x,"error"),c("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",x,b);}}}const Vp=150,hv=30;function bv(e,t,n){const o=m("div",{className:"lg-pill",id:"pill"}),r=e.map(y=>{const T=m("button",{className:"lg-tab"},y.label);return T.setAttribute("data-target",y.id),T}),i=m("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=new Map(e.map(y=>[y.id,true])),s=new Map(r.map((y,T)=>[e[T].id,y]));function l(y){const T=document.createElementNS("http://www.w3.org/2000/svg","svg");T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.setAttribute("stroke","currentColor"),T.setAttribute("stroke-width","2"),T.setAttribute("stroke-linecap","round"),T.setAttribute("stroke-linejoin","round");const I=document.createElementNS("http://www.w3.org/2000/svg","polyline");return I.setAttribute("points",y==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),T.appendChild(I),T}const c=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});c.appendChild(l("left"));const d=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});d.appendChild(l("right"));const p=m("div",{className:"lg-tabs-wrapper"},c,i,d);let f=0,g=0,h=false;function x(){const y=i.scrollLeft>0,T=i.scrollLeft<i.scrollWidth-i.clientWidth-1;c.classList.toggle("disabled",!y),d.classList.toggle("disabled",!T);}c.addEventListener("click",()=>{i.scrollBy({left:-Vp,behavior:"smooth"}),setTimeout(x,300);}),d.addEventListener("click",()=>{i.scrollBy({left:Vp,behavior:"smooth"}),setTimeout(x,300);}),i.addEventListener("wheel",y=>{Math.abs(y.deltaY)>Math.abs(y.deltaX)&&(y.preventDefault(),i.scrollLeft+=y.deltaY,x());},{passive:false});let b=0;i.addEventListener("touchstart",y=>{const T=y.touches[0];f=T.clientX,g=T.clientY,h=false,b=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",y=>{if(h)return;const T=y.touches[0],I=T.clientX-f,P=T.clientY-g;if(Math.abs(P)>Math.abs(I)){h=true;return}Math.abs(I)>hv&&(y.preventDefault(),i.scrollLeft=b-I);},{passive:false}),i.addEventListener("touchend",()=>{x();},{passive:true}),i.addEventListener("scroll",x,{passive:true});function C(y){const T=r.find(I=>I.dataset.target===y)||r[0];T&&requestAnimationFrame(()=>{const I=T.offsetLeft,P=T.offsetWidth;o.style.width=`${P}px`,o.style.transform=`translateX(${I}px)`;const R=i.scrollLeft,O=R,W=R+i.clientWidth,N=I-12,F=I+P+12;N<O?i.scrollTo({left:N,behavior:"smooth"}):F>W&&i.scrollTo({left:F-i.clientWidth,behavior:"smooth"}),setTimeout(x,300);});}function S(){for(const[y,T]of a)if(T)return y;return null}function _(y){const T=s.get(y);if(T)if(a.set(y,false),T.style.display="none",w===y){const I=S();I&&k(I);}else v();}function E(y){const T=s.get(y);T&&(a.set(y,true),T.style.display="",v());}function v(){C(w),x();}let w=t||(e[0]?.id??"");function k(y){a.get(y)&&(w=y,r.forEach(T=>T.classList.toggle("active",T.dataset.target===y)),C(y),n(y));}return r.forEach(y=>y.addEventListener("click",()=>k(y.dataset.target))),queueMicrotask(()=>{C(w),x();}),{root:p,activate:k,recalc:v,getActive:()=>w,showTab:E,hideTab:_,isTabVisible:y=>a.get(y)??false,getVisibleTabs:()=>[...a.entries()].filter(([y,T])=>T).map(([y])=>y)}}class nn{constructor(t){j(this,"id");j(this,"label");j(this,"container",null);j(this,"cleanupFunctions",[]);j(this,"preloadedContent",null);j(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=m("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const o=n?`gemini-section ${n}`:"gemini-section";return m("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=m("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class xv{constructor(t,n,o){j(this,"sections");j(this,"activeId",null);j(this,"container");j(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const xn="gemini:",yv={STATE:"hud:state",THEME:"hud:theme"},vv={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},wv={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},Cv={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},_e={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config",HARVEST_LOCKER:"feature:harvestLocker:config",EGG_LOCKER:"feature:eggLocker:config",DECOR_LOCKER:"feature:decorLocker:config",MISSING_VARIANTS_INDICATOR:"feature:missingVariantsIndicator:config",JOURNAL:"feature:journal:config"},gn={ABILITIES_INJECT:"inject:abilitiesInject:config",JOURNAL_HINTS:"inject:journalHints:config",JOURNAL_FILTER_SORT:"inject:journalFilterSort:config",JOURNAL_ALL_TAB:"inject:journalAllTab:config",STORAGE_VALUE_INDICATOR:"inject:storageValueIndicator:config"},Sv={AUTO_RELOAD:"dev:auto-reload"},Ye={HUD:yv,SECTION:vv,MODULE:wv,GLOBAL:Cv,FEATURE:_e,INJECT:gn,DEV:Sv},Me={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change",HARVEST_LOCKER_LOCKS_UPDATED:"gemini:harvestLocker-locks-updated",EGG_LOCKER_LOCKS_UPDATED:"gemini:eggLocker-locks-updated",DECOR_LOCKER_LOCKS_UPDATED:"gemini:decorLocker-locks-updated"};function ye(e,t){try{const n=e.startsWith(xn)?e:xn+e,o=GM_getValue(n);return o==null?t:typeof o=="string"?JSON.parse(o):o}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function we(e,t){try{const n=e.startsWith(xn)?e:xn+e,o=e.startsWith(xn)?e.slice(xn.length):e,r=JSON.stringify(t);GM_setValue(n,r),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:o,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function kv(e){try{const t=e.startsWith(xn)?e:xn+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function _v(){try{const e="gemini:",t=[];for(let r=0;r<localStorage.length;r++){const i=localStorage.key(r);i&&i.startsWith(e)&&t.push(i);}for(const r of t)try{const i=localStorage.getItem(r);if(i!==null){const a=JSON.parse(i),s=r.slice(e.length);we(s,a),console.log(`[Gemini Storage] Migrated key: ${r}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${r}":`,i);}const n="gemini.sections",o=GM_getValue(n);o!=null&&(we("sections",o),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const fm="gemini.sections";function gm(){const e=ye(fm,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Ev(e){we(fm,e);}async function Tv(e){return gm()[e]}function Av(e,t){const n=gm();Ev({...n,[e]:t});}function qo(e,t){return {...e,...t??{}}}async function Iv(e){const t=await Tv(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((c=>JSON.parse(JSON.stringify(c)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){Av(e.path,n);}function i(){return n}function a(c){n=e.sanitize?e.sanitize(c):c,r();}function s(c){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof c=="function"?c(u):Object.assign(u,c),n=e.sanitize?e.sanitize(u):u,r();}function l(){r();}return {get:i,set:a,update:s,save:l}}async function En(e,t){const{path:n=e,...o}=t;return Iv({path:n,...o})}let Pv=0;const ua=new Map;function Ee(e={},...t){const{id:n,className:o,variant:r="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:l=true,onExpandChange:c,mediaTop:d,title:u,subtitle:p,badge:f,actions:g,footer:h,divider:x=false,tone:b="neutral",stateKey:C}=e,S=m("div",{className:"card",id:n,tabIndex:a?0:void 0});S.classList.add(`card--${r}`,`card--p-${i}`),a&&S.classList.add("card--interactive"),b!=="neutral"&&S.classList.add(`card--tone-${b}`),o&&S.classList.add(...o.split(" ").filter(Boolean)),s&&S.classList.add("card--expandable");const _=s?C??n??(typeof u=="string"?`title:${u}`:null):null;let E=!s||l;_&&ua.has(_)&&(E=!!ua.get(_));let v=null,w=null,k=null,y=null,T=null;const I=n?`${n}-collapse`:`card-collapse-${++Pv}`,P=()=>{if(y!==null&&(cancelAnimationFrame(y),y=null),T){const G=T;T=null,G();}},R=(G,B)=>{if(!k)return;P();const H=k;if(H.setAttribute("aria-hidden",String(!G)),!B){H.classList.remove("card-collapse--animating"),H.style.display=G?"":"none",H.style.height="",H.style.opacity="";return}if(H.classList.add("card-collapse--animating"),H.style.display="",G){H.style.height="auto";const M=H.scrollHeight;if(!M){H.classList.remove("card-collapse--animating"),H.style.display="",H.style.height="",H.style.opacity="";return}H.style.height="0px",H.style.opacity="0",H.offsetHeight,y=requestAnimationFrame(()=>{y=null,H.style.height=`${M}px`,H.style.opacity="1";});}else {const M=H.scrollHeight;if(!M){H.classList.remove("card-collapse--animating"),H.style.display="none",H.style.height="",H.style.opacity="";return}H.style.height=`${M}px`,H.style.opacity="1",H.offsetHeight,y=requestAnimationFrame(()=>{y=null,H.style.height="0px",H.style.opacity="0";});}const L=()=>{H.classList.remove("card-collapse--animating"),H.style.height="",G||(H.style.display="none"),H.style.opacity="";};let $=null;const A=M=>{M.target===H&&($!==null&&(clearTimeout($),$=null),H.removeEventListener("transitionend",A),H.removeEventListener("transitioncancel",A),T=null,L());};T=()=>{$!==null&&(clearTimeout($),$=null),H.removeEventListener("transitionend",A),H.removeEventListener("transitioncancel",A),T=null,L();},H.addEventListener("transitionend",A),H.addEventListener("transitioncancel",A),$=window.setTimeout(()=>{T?.();},420);};function O(G){const B=document.createElementNS("http://www.w3.org/2000/svg","svg");return B.setAttribute("viewBox","0 0 24 24"),B.setAttribute("width","16"),B.setAttribute("height","16"),B.innerHTML=G==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',B}function W(G,B=true,H=true){E=G,S.classList.toggle("card--collapsed",!E),S.classList.toggle("card--expanded",E),v&&(v.dataset.expanded=String(E),v.setAttribute("aria-expanded",String(E))),w&&(w.setAttribute("aria-expanded",String(E)),w.classList.toggle("card-toggle--collapsed",!E),w.setAttribute("aria-label",E?"Replier le contenu":"Deplier le contenu"),w.replaceChildren(O(E?"up":"down"))),s?R(E,H):k&&(k.style.display="",k.style.height="",k.style.opacity="",k.setAttribute("aria-hidden","false")),B&&c&&c(E),_&&ua.set(_,E);}if(d){const G=m("div",{className:"card-media"});G.append(d),S.appendChild(G);}const N=!!(u||p||f||g&&g.length||s);if(N){v=m("div",{className:"card-header"});const G=m("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const L=m("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&L.append(typeof f=="string"?m("span",{className:"badge"},f):f),G.appendChild(L);}if(p){const L=m("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);G.appendChild(L);}(G.childNodes.length||s)&&v.appendChild(G);const B=m("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),H=m("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(L=>H.appendChild(L)),H.childNodes.length&&B.appendChild(H),s&&(w=m("button",{className:"card-toggle",type:"button",ariaExpanded:String(E),ariaControls:I,ariaLabel:E?"Replier le contenu":"Deplier le contenu"}),w.textContent=E?"▲":"▼",w.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation(),W(!E);}),B.appendChild(w),v.classList.add("card-header--expandable"),v.addEventListener("click",L=>{const $=L.target;$?.closest(".card-actions")||$?.closest(".card-toggle")||W(!E);})),B.childNodes.length&&v.appendChild(B),S.appendChild(v);}k=m("div",{className:"card-collapse",id:I,ariaHidden:s?String(!E):"false"}),S.appendChild(k),x&&N&&k.appendChild(m("div",{className:"card-divider"}));const F=m("div",{className:"card-body"});if(F.append(...t),k.appendChild(F),h){x&&k.appendChild(m("div",{className:"card-divider"}));const G=m("div",{className:"card-footer"});G.append(h),k.appendChild(G);}return w&&w.setAttribute("aria-controls",I),W(E,false,false),_&&ua.set(_,E),S}let Ps=false;const Ls=new Set,dt=e=>{const t=document.activeElement;for(const n of Ls)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Lv(){Ps||(Ps=true,window.addEventListener("keydown",dt,true),window.addEventListener("keypress",dt,true),window.addEventListener("keyup",dt,true),document.addEventListener("keydown",dt,true),document.addEventListener("keypress",dt,true),document.addEventListener("keyup",dt,true));}function Mv(){Ps&&(Ls.size>0||(Ps=false,window.removeEventListener("keydown",dt,true),window.removeEventListener("keypress",dt,true),window.removeEventListener("keyup",dt,true),document.removeEventListener("keydown",dt,true),document.removeEventListener("keypress",dt,true),document.removeEventListener("keyup",dt,true)));}let Hn=null;const qc=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),Hn!==null&&(window.clearTimeout(Hn),Hn=null),document.removeEventListener("click",qc,true);};function Rv(){document.addEventListener("click",qc,true),Hn!==null&&window.clearTimeout(Hn),Hn=window.setTimeout(()=>{document.removeEventListener("click",qc,true),Hn=null;},500);}function no(e){const{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:l,onOpenChange:c}=e,d=m("div",{className:"select",id:t}),u=m("button",{className:"select-trigger",type:"button"}),p=m("span",{className:"select-value"},r),f=m("span",{className:"select-caret"},"▾");u.append(p,f);const g=m("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});d.classList.add(`select--${i}`);let h=false,x=n,b=null,C=!!a;function S(L){return L==null?r:(e.options||o).find(A=>A.value===L)?.label??r}function _(L){p.textContent=S(L),g.querySelectorAll(".select-option").forEach($=>{const A=$.dataset.value,M=L!=null&&A===L;$.classList.toggle("selected",M),$.setAttribute("aria-selected",String(M));});}function E(L){g.replaceChildren(),L.forEach($=>{const A=m("button",{className:"select-option"+($.disabled?" disabled":""),type:"button",role:"option","data-value":$.value,"aria-selected":String($.value===x),tabindex:"-1"},$.label);$.value===x&&A.classList.add("selected"),$.disabled||A.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),M.pointerType&&M.pointerType!=="mouse"&&Rv(),I($.value,{notify:true}),y();},{capture:true}),g.appendChild(A);});}function v(){u.setAttribute("aria-expanded",String(h)),g.setAttribute("aria-hidden",String(!h));}function w(){const L=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${L.width}px`});}function k(){h||C||(h=true,d.classList.add("open"),v(),w(),document.addEventListener("mousedown",N,true),document.addEventListener("scroll",F,true),window.addEventListener("resize",G),g.focus({preventScroll:true}),s&&(Lv(),Ls.add(d),b=()=>{Ls.delete(d),Mv();}),c?.(true));}function y(){h&&(h=false,d.classList.remove("open"),v(),document.removeEventListener("mousedown",N,true),document.removeEventListener("scroll",F,true),window.removeEventListener("resize",G),u.focus({preventScroll:true}),b?.(),b=null,c?.(false));}function T(){h?y():k();}function I(L,$={}){const A=x;x=L,_(x),$.notify!==false&&A!==L&&l?.(L);}function P(){return x}function R(L){const $=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!$.length)return;const A=$.findIndex(X=>X.classList.contains("active")),M=$[(A+(L===1?1:$.length-1))%$.length];$.forEach(X=>X.classList.remove("active")),M.classList.add("active"),M.focus({preventScroll:true}),M.scrollIntoView({block:"nearest"});}function O(L){(L.key===" "||L.key==="Enter"||L.key==="ArrowDown")&&(L.preventDefault(),k());}function W(L){if(L.key==="Escape"){L.preventDefault(),y();return}if(L.key==="Enter"||L.key===" "){const $=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");$&&!$.classList.contains("disabled")&&(L.preventDefault(),I($.dataset.value,{notify:true}),y());return}if(L.key==="ArrowDown"){L.preventDefault(),R(1);return}if(L.key==="ArrowUp"){L.preventDefault(),R(-1);return}}function N(L){d.contains(L.target)||y();}function F(){h&&w();}function G(){h&&w();}function B(L){C=!!L,u.disabled=C,d.classList.toggle("disabled",C),C&&y();}function H(L){e.options=L,E(L),L.some($=>$.value===x)||(x=null,_(null));}return d.append(u,g),u.addEventListener("pointerdown",L=>{L.preventDefault(),L.stopPropagation(),T();},{capture:true}),u.addEventListener("keydown",O),g.addEventListener("keydown",W),E(o),n!=null?(x=n,_(x)):_(null),v(),B(C),{root:d,open:k,close:y,toggle:T,getValue:P,setValue:I,setOptions:H,setDisabled:B,destroy(){document.removeEventListener("mousedown",N,true),document.removeEventListener("scroll",F,true),window.removeEventListener("resize",G),b?.(),b=null;}}}function du(e={}){const{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:l=false,disabled:c=false,tooltip:d,hint:u,icon:p,suffix:f,onClick:g}=e,h=m("div",{className:"lg-label-wrap",id:t}),x=m("label",{className:"lg-label",...o?{htmlFor:o}:{},...d?{title:d}:{}});if(p){const I=typeof p=="string"?m("span",{className:"lg-label-ico"},p):p;I.classList?.add?.("lg-label-ico"),x.appendChild(I);}const b=m("span",{className:"lg-label-text"},n);x.appendChild(b);const C=m("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&x.appendChild(C);let S=null;if(f!=null){S=typeof f=="string"?document.createTextNode(f):f;const I=m("span",{className:"lg-label-suffix"});I.appendChild(S),x.appendChild(I);}const _=u?m("div",{className:"lg-label-hint"},u):null;h.classList.add(`lg-label--${a}`),h.classList.add(`lg-label--${i}`),s==="title"&&h.classList.add("lg-label--title"),E(r),c&&h.classList.add("is-disabled"),h.appendChild(x),_&&h.appendChild(_),g&&x.addEventListener("click",g);function E(I){h.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),h.classList.add(`lg-label--${I}`);}function v(I){b.textContent=I;}function w(I){E(I);}function k(I){I&&!C.isConnected&&x.appendChild(C),!I&&C.isConnected&&C.remove(),I?x.setAttribute("aria-required","true"):x.removeAttribute("aria-required");}function y(I){h.classList.toggle("is-disabled",!!I);}function T(I){!I&&_&&_.isConnected?_.remove():I&&_?_.textContent=I:I&&!_&&h.appendChild(m("div",{className:"lg-label-hint"},I));}return {root:h,labelEl:x,hintEl:_,setText:v,setTone:w,setRequired:k,setDisabled:y,setHint:T}}function Ir(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function pa(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const o=Ir(e);return o&&n.appendChild(o),n}function Nv(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Ae(e={}){const{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:l,type:c="button",onClick:d,disabled:u=false,fullWidth:p=false}=e,f=m("button",{className:"btn",id:n});f.type=c,o==="primary"&&f.classList.add("primary"),o==="danger"&&f.classList.add("danger"),r==="sm"&&f.classList.add("btn--sm"),l&&(f.title=l),p&&(f.style.width="100%");const g=Nv(),h=i?pa(i,"left"):null,x=a?pa(a,"right"):null,b=document.createElement("span");b.className="btn-label";const C=Ir(t);C&&b.appendChild(C),!C&&(h||x)&&f.classList.add("btn--icon"),f.appendChild(g),h&&f.appendChild(h),f.appendChild(b),x&&f.appendChild(x);const S=u||s;f.disabled=S,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",d&&f.addEventListener("click",d);const _=f;return _.setLoading=E=>{f.setAttribute("aria-busy",String(!!E)),g.style.display=E?"inline-block":"none",f.disabled=E||u;},_.setDisabled=E=>{f.disabled=E||f.getAttribute("aria-busy")==="true";},_.setLabel=E=>{b.replaceChildren();const v=Ir(E);v&&b.appendChild(v),!v&&(h||x)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},_.setIconLeft=E=>{if(E==null){h?.remove();return}h?h.replaceChildren(Ir(E)):f.insertBefore(pa(E,"left"),b);},_.setIconRight=E=>{if(E==null){x?.remove();return}x?x.replaceChildren(Ir(E)):f.appendChild(pa(E,"right"));},_.setVariant=E=>{f.classList.remove("primary","danger"),E==="primary"&&f.classList.add("primary"),E==="danger"&&f.classList.add("danger");},_}function _n(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,l=m("div",{className:"lg-switch-wrap"}),c=m("button",{className:`lg-switch lg-switch--${r}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!o),title:i??"Basculer"}),d=m("span",{className:"lg-switch-track"}),u=m("span",{className:"lg-switch-thumb"});c.append(d,u);let p=null;i&&a!=="none"&&(p=m("span",{className:"lg-switch-label"},i)),p&&a==="left"?l.append(p,c):p&&a==="right"?l.append(c,p):l.append(c);let f=!!n,g=!!o;function h(){c.classList.toggle("on",f),c.setAttribute("aria-checked",String(f)),c.disabled=g,c.setAttribute("aria-disabled",String(g));}function x(y=false){g||(f=!f,h(),y||s?.(f));}function b(y){y.preventDefault(),x();}function C(y){g||((y.key===" "||y.key==="Enter")&&(y.preventDefault(),x()),y.key==="ArrowLeft"&&(y.preventDefault(),_(false)),y.key==="ArrowRight"&&(y.preventDefault(),_(true)));}c.addEventListener("click",b),c.addEventListener("keydown",C);function S(){return f}function _(y,T=false){f=!!y,h(),T||s?.(f);}function E(y){g=!!y,h();}function v(y){if(!y){p&&(p.remove(),p=null);return}p?p.textContent=y:(p=m("span",{className:"lg-switch-label"},y),l.append(p));}function w(){c.focus();}function k(){c.removeEventListener("click",b),c.removeEventListener("keydown",C);}return h(),{root:l,button:c,isChecked:S,setChecked:_,setDisabled:E,setLabel:v,focus:w,destroy:k}}let mm=null,uu=null;function Ov(){return mm}function $v(e){mm=e,uu=null;}function hm(){return uu}function Dv(e){uu=e;}function Fv(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function bm(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const r=n.platform.toLowerCase();if(r.includes("windows"))return "windows";if(r.includes("mac"))return "mac";if(r.includes("android"))return "android";if(r.includes("chrome os")||r.includes("cros"))return "chromeos";if(r.includes("linux"))return "linux";if(r.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function xm(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return "Edge";if(r)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Bv(){const e=Ov();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function zv(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function ym(){try{return window.top!==window.self}catch{return  true}}function Gv(){const e=ym(),t=zv(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function ll(){const e=hm();if(e)return e;const t=Gv(),n=Bv(),o=bm(),r=xm(),i=ym(),a=window.screen||{},s=window.visualViewport,l=Math.round(window.innerWidth||document.documentElement.clientWidth||0),c=Math.round(window.innerHeight||document.documentElement.clientHeight||0),d=Math.round(s?.width??l),u=Math.round(s?.height??c),p=Math.round(a.width||0),f=Math.round(a.height||0),g=Math.round(a.availWidth||p),h=Math.round(a.availHeight||f),x=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,b={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:r,os:o,viewportWidth:l,viewportHeight:c,visualViewportWidth:d,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:h,dpr:x,orientation:Fv()};return Dv(b),b}function Hv(){return ll().surface==="discord"}function jv(){return ll().platform==="mobile"}function Uv(){ll();}function Wv(){return hm()!==null}const Je={init:Uv,isReady:Wv,detect:ll,isDiscord:Hv,isMobile:jv,detectOS:bm,detectBrowser:xm,setPlatformOverride:$v};let Ms=false;const Pr=new Set;function Vv(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const ut=e=>{const t=Vv();if(t){for(const n of Pr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function qv(){Ms||(Ms=true,window.addEventListener("keydown",ut,true),window.addEventListener("keypress",ut,true),window.addEventListener("keyup",ut,true),document.addEventListener("keydown",ut,true),document.addEventListener("keypress",ut,true),document.addEventListener("keyup",ut,true));}function Kv(){Ms&&(Ms=false,window.removeEventListener("keydown",ut,true),window.removeEventListener("keypress",ut,true),window.removeEventListener("keyup",ut,true),document.removeEventListener("keydown",ut,true),document.removeEventListener("keypress",ut,true),document.removeEventListener("keyup",ut,true));}function Xv(e){return Pr.size===0&&qv(),Pr.add(e),()=>{Pr.delete(e),Pr.size===0&&Kv();}}function Yv(e,t,n,o){let r;switch(e){case "digits":r="0-9";break;case "alpha":r="\\p{L}";break;case "alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Jv(e,t){return t?e.replace(t,""):e}function Qv(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t);})}function Oi(e={}){const{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:l,blockGameKeys:c=true,debounceMs:d=0,onChange:u,onEnter:p,label:f}=e,g=m("div",{className:"lg-input-wrap"}),h=m("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(h.maxLength=l),o&&(h.value=o),f){const I=m("div",{className:"lg-input-label"},f);g.appendChild(I);}g.appendChild(h);const x=Yv(r,i,a,s),b=()=>{const I=h.selectionStart??h.value.length,P=h.value.length,R=Jv(h.value,x);if(R!==h.value){h.value=R;const O=P-R.length,W=Math.max(0,I-O);h.setSelectionRange(W,W);}},C=Qv(()=>u?.(h.value),d);h.addEventListener("input",()=>{b(),C();}),h.addEventListener("paste",()=>queueMicrotask(()=>{b(),C();})),h.addEventListener("keydown",I=>{I.key==="Enter"&&p?.(h.value);});const S=c?Xv(h):()=>{};function _(){return h.value}function E(I){h.value=I??"",b(),C();}function v(){h.focus();}function w(){h.blur();}function k(I){h.disabled=!!I;}function y(){return document.activeElement===h}function T(){S();}return {root:g,input:h,getValue:_,setValue:E,focus:v,blur:w,setDisabled:k,isFocused:y,destroy:T}}function Be(e,t,n){return Math.min(n,Math.max(t,e))}function qr({h:e,s:t,v:n,a:o}){const r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1));let s=0,l=0,c=0;switch(Math.floor(r)){case 0:s=i,l=a;break;case 1:s=a,l=i;break;case 2:l=i,c=a;break;case 3:l=a,c=i;break;case 4:s=a,c=i;break;default:s=i,c=a;break}const u=n-i,p=Math.round((s+u)*255),f=Math.round((l+u)*255),g=Math.round((c+u)*255);return {r:Be(p,0,255),g:Be(f,0,255),b:Be(g,0,255),a:Be(o,0,1)}}function vm({r:e,g:t,b:n,a:o}){const r=Be(e,0,255)/255,i=Be(t,0,255)/255,a=Be(n,0,255)/255,s=Math.max(r,i,a),l=Math.min(r,i,a),c=s-l;let d=0;c!==0&&(s===r?d=60*((i-a)/c%6):s===i?d=60*((a-r)/c+2):d=60*((r-i)/c+4)),d<0&&(d+=360);const u=s===0?0:c/s;return {h:d,s:u,v:s,a:Be(o,0,1)}}function pu({r:e,g:t,b:n}){const o=r=>Be(Math.round(r),0,255).toString(16).padStart(2,"0");return `#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Zv({r:e,g:t,b:n,a:o}){const r=Be(Math.round(o*255),0,255);return `${pu({r:e,g:t,b:n})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function Lr({r:e,g:t,b:n,a:o}){const r=Math.round(o*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${r})`}function _o(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r:o,g:r,b:i,a:n/255}}function Kc(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return _o(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;const r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return [r,i,a,s].some(l=>Number.isNaN(l))?null:{r,g:i,b:a,a:s}}return null}function e0(e,t){const n=Kc(e)??_o(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Be(t,0,1)),vm(n)}function t0(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function n0(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Rn(e){const t=qr(e),n=qr({...e,a:1});return {hsva:{...e},hex:pu(n),hexa:Zv(t),rgba:Lr(t),alpha:e.a}}function o0(e={}){const{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:l}=e,d=a?a():Je.detect().platform==="mobile";let u=e0(o,r);const p=Ee({id:t,className:"color-picker",title:n,padding:d?"md":"lg",variant:"soft",expandable:!d,defaultExpanded:!d&&i});p.classList.add(d?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),h=m("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(h):f?f.prepend(h):p.prepend(h);const x=p.querySelector(".card-toggle");!d&&x&&h.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&x.click();});const b=p.querySelector(".card-collapse");let C=null,S=null,_=null,E=null,v=null,w=null,k=null,y=null,T=null,I="hex";function P(F){const G=Rn(u);F==="input"?s?.(G):l?.(G);}function R(){const F=Rn(u);if(h.style.setProperty("--cp-preview-color",F.rgba),h.setAttribute("aria-label",`${n}: ${F.hexa}`),!d&&C&&S&&_&&E&&v&&w&&k){const G=qr({...u,s:1,v:1,a:1}),B=Lr(G);C.style.setProperty("--cp-palette-hue",B),S.style.left=`${u.s*100}%`,S.style.top=`${(1-u.v)*100}%`,_.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Lr({...G,a:1})} 0%, ${Lr({...G,a:0})} 100%)`),E.style.top=`${(1-u.a)*100}%`,v.style.setProperty("--cp-hue-color",Lr(qr({...u,v:1,s:1,a:1}))),w.style.left=`${u.h/360*100}%`;const H=u.a===1?F.hex:F.hexa,L=F.rgba,$=I==="hex"?H:L;k!==document.activeElement&&(k.value=$),k.setAttribute("aria-label",`${I.toUpperCase()} code for ${n}`),k.placeholder=I==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",I==="hex"?k.maxLength=9:k.removeAttribute("maxLength"),k.dataset.mode=I,y&&(y.textContent=I.toUpperCase(),y.setAttribute("aria-label",I==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),y.setAttribute("aria-pressed",I==="rgba"?"true":"false"),y.classList.toggle("is-alt",I==="rgba"));}T&&T!==document.activeElement&&(T.value=F.hex);}function O(F,G=null){u={h:(F.h%360+360)%360,s:Be(F.s,0,1),v:Be(F.v,0,1),a:Be(F.a,0,1)},R(),G&&P(G);}function W(F,G=null){O(vm(F),G);}function N(F,G,B){F.addEventListener("pointerdown",H=>{H.preventDefault();const L=H.pointerId,$=M=>{M.pointerId===L&&G(M);},A=M=>{M.pointerId===L&&(document.removeEventListener("pointermove",$),document.removeEventListener("pointerup",A),document.removeEventListener("pointercancel",A),B?.(M));};G(H),document.addEventListener("pointermove",$),document.addEventListener("pointerup",A),document.addEventListener("pointercancel",A);});}if(!d&&b){const F=b.querySelector(".card-body");if(F){F.classList.add("color-picker__body"),S=m("div",{className:"color-picker__palette-cursor"}),C=m("div",{className:"color-picker__palette"},S),E=m("div",{className:"color-picker__alpha-thumb"}),_=m("div",{className:"color-picker__alpha"},E),w=m("div",{className:"color-picker__hue-thumb"}),v=m("div",{className:"color-picker__hue"},w);const G=m("div",{className:"color-picker__main"},C,_),B=m("div",{className:"color-picker__hue-row"},v),H=Oi({blockGameKeys:true});k=H.input,k.classList.add("color-picker__hex-input"),k.value="",k.maxLength=9,k.spellcheck=false,k.inputMode="text",k.setAttribute("aria-label",`Hex code for ${n}`),y=m("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),H.root.classList.add("color-picker__hex-wrap");const L=m("div",{className:"color-picker__hex-row"},y,H.root);F.replaceChildren(G,B,L),N(C,A=>{if(!C||!S)return;const M=C.getBoundingClientRect(),X=Be((A.clientX-M.left)/M.width,0,1),U=Be((A.clientY-M.top)/M.height,0,1);O({...u,s:X,v:1-U},"input");},()=>P("change")),N(_,A=>{if(!_)return;const M=_.getBoundingClientRect(),X=Be((A.clientY-M.top)/M.height,0,1);O({...u,a:1-X},"input");},()=>P("change")),N(v,A=>{if(!v)return;const M=v.getBoundingClientRect(),X=Be((A.clientX-M.left)/M.width,0,1);O({...u,h:X*360},"input");},()=>P("change")),y.addEventListener("click",()=>{if(I=I==="hex"?"rgba":"hex",k){const A=Rn(u);k.value=I==="hex"?u.a===1?A.hex:A.hexa:A.rgba;}R(),k?.focus(),k?.select();}),k.addEventListener("input",()=>{if(I==="hex"){const A=t0(k.value);if(A!==k.value){const M=k.selectionStart??A.length;k.value=A,k.setSelectionRange(M,M);}}});const $=()=>{const A=k.value;if(I==="hex"){const M=_o(A);if(!M){k.value=u.a===1?Rn(u).hex:Rn(u).hexa;return}const X=A.startsWith("#")?A.slice(1):A,U=X.length===4||X.length===8;M.a=U?M.a:u.a,W(M,"change");}else {const M=n0(A),X=Kc(M);if(!X){k.value=Rn(u).rgba;return}W(X,"change");}};k.addEventListener("change",$),k.addEventListener("blur",$),k.addEventListener("keydown",A=>{A.key==="Enter"&&($(),k.blur());});}}return d&&(b&&b.remove(),T=m("input",{className:"color-picker__native",type:"color",value:pu(qr({...u,a:1}))}),h.addEventListener("click",()=>T.click()),T.addEventListener("input",()=>{const F=_o(T.value);F&&(F.a=u.a,W(F,"input"),P("change"));}),p.appendChild(T)),R(),{root:p,isMobile:d,getValue:()=>Rn(u),setValue:(F,G)=>{const B=Kc(F)??_o(F)??_o("#FFFFFF");B&&(typeof G=="number"&&(B.a=G),W(B,null));}}}const r0=window;function i0(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:r0}const a0=i0(),V=a0;function s0(e){try{return !!e.isSecureContext}catch{return  false}}function fu(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function wm(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function l0(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function c0(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function d0(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function u0(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!s0(V))return {ok:false,method:"clipboard-write"};if(!await l0())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function p0(e,t){try{const n=t||fu(),o=c0(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy");}catch{r=!1;}return o.remove(),{ok:r,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function f0(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let o=false;if(n!==e)try{t.textContent=e,o=!0;}catch{}const r=d0(t);o&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=wm()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:r,method:"selection",hint:i}}async function g0(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const o=await u0(n);if(o.ok)return o;const r=t.injectionRoot||fu(t.valueNode||void 0),i=p0(n,r);if(i.ok)return i;const a=f0(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Je.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function m0(e,t,n={}){const o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);const i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=fu(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();const i=(t()??"").toString(),a=await g0(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copié"):a.method==="selection"&&o(a.hint||(wm()?"⌘C pour copier":"Ctrl+C pour copier")):o("Impossible de copier");});}const Lo={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function h0(e){const{host:t,themes:n,initialTheme:o,onThemeChange:r}=e;let i=o,a=null,s=false;function l(d){const u=n[d]||n[i]||{};t.setAttribute("data-theme",d),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=V.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=d,r?.(d);}function c(){return i}return l(o),{applyTheme:l,getCurrentTheme:c}}const Xc={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,journal:false,system:false}}};async function b0(){const e=await En("tab-settings",{version:2,defaults:Xc,sanitize:r=>({ui:{expandedCards:qo(Xc.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:qo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}class x0{constructor(){j(this,"injections",new Map);j(this,"state",{});j(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(r){console.error(`[InjectionRegistry] Failed to init ${t}:`,r);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const o=this.injections.get(t);if(!o){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?o.injection.init():o.injection.destroy(),console.log(`[InjectionRegistry] ${o.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const o=ye(n.storageKey,n.defaultEnabled??false);this.state[t]=o;}saveState(t){const n=this.injections.get(t);n&&we(n.storageKey,this.state[t]);}}let Jl=null;function Rs(){return Jl||(Jl=new x0),Jl}function Cm(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function y0(){return Object.keys(Lo).map(e=>({value:e,label:Cm(e)}))}const v0=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function w0(e){return Cm(e.replace(/^--/,""))}function C0(e){return e.alpha<1?e.rgba:e.hex}const st={pets:{enabled:true},autoFavorite:{enabled:true},locker:{enabled:true},trackers:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true},bulkFavorite:{enabled:false},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class S0 extends nn{constructor(n){super({id:"tab-settings",label:"Settings"});j(this,"featureConfig",st);this.deps=n;}async build(n){const o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await b0();}catch{r={get:()=>Xc,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=r.get(),a=ye(_e.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(a);const s=Object.keys(Lo),l=this.deps.getCurrentTheme?.()??this.deps.initialTheme,c=s.includes(l)?l:s[0]??"dark";let d=c;const u=du({text:"Theme",tone:"muted",size:"lg"}),p=no({options:y0(),value:c,onChange:S=>{d=S,this.deps.applyTheme(S),this.renderThemePickers(S,f,d);}}),f=m("div",{className:"settings-theme-grid"}),g=Ee({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:S=>r.setCardExpanded("style",S)},m("div",{className:"kv settings-theme-row"},u.root,p.root),f);this.renderThemePickers(c,f,d);const h=this.createHUDSectionsCard({defaultExpanded:!!i.ui.expandedCards.hudSections,onExpandChange:S=>r.setCardExpanded("hudSections",S)}),x=this.createEnhancementsCard({defaultExpanded:!!i.ui.expandedCards.enhancements,onExpandChange:S=>r.setCardExpanded("enhancements",S)}),b=this.createJournalCard({defaultExpanded:!!i.ui.expandedCards.journal,onExpandChange:S=>r.setCardExpanded("journal",S)}),C=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:S=>r.setCardExpanded("system",S)});o.appendChild(g),o.appendChild(h),o.appendChild(x),o.appendChild(b),o.appendChild(C);}mergeFeatureConfig(n){return {pets:{...st.pets,...n.pets},autoFavorite:{...st.autoFavorite,...n.autoFavorite},locker:{...st.locker,...n.locker},trackers:{...st.trackers,...n.trackers},alerts:{...st.alerts,...n.alerts},avatar:{...st.avatar,...n.avatar},room:{...st.room,...n.room},bulkFavorite:{...st.bulkFavorite,...n.bulkFavorite},cropSizeIndicator:{...st.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...st.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...st.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){we(_e.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const o=(r,i,a,s,l=false,c=false)=>{const d=m("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${l?"0":"12px"} 0 ${c?"0":"12px"} 0;
          ${c?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${i?"1":"0.5"};
        `}),u=m("div"),p=m("div",{style:"font-weight: 500; margin-bottom: 4px;"},r),f=m("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);u.append(p,f);const g=_n({checked:i,onChange:h=>{d.style.opacity=h?"1":"0.5",a(h);}});return d.append(u,g.root),d};return Ee({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},o("Auto-Favorite",this.featureConfig.autoFavorite.enabled,r=>{this.featureConfig.autoFavorite.enabled=r,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),o("Pets",this.featureConfig.pets.enabled,r=>{this.featureConfig.pets.enabled=r,this.saveFeatureConfig();},"Pet management and team tracking"),o("Locker",this.featureConfig.locker.enabled,r=>{this.featureConfig.locker.enabled=r,this.saveFeatureConfig();},"Configure crop, egg, and decor blockers"),o("Trackers",this.featureConfig.trackers.enabled,r=>{this.featureConfig.trackers.enabled=r,this.saveFeatureConfig();},"Resource and progress tracking"),o("Alerts",this.featureConfig.alerts.enabled,r=>{this.featureConfig.alerts.enabled=r,this.saveFeatureConfig();},"Event notifications and alerts"),o("Avatar",this.featureConfig.avatar.enabled,r=>{this.featureConfig.avatar.enabled=r,this.saveFeatureConfig();},"Avatar customization and loadouts"),o("Room",this.featureConfig.room.enabled,r=>{this.featureConfig.room.enabled=r,this.saveFeatureConfig();},"Public room browser",false,true)))}createSectionRow(n,o,r,i,a=false,s=false){const l=m("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${a?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${o?"1":"0.5"};
      `}),c=m("div"),d=m("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),u=m("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},i);c.append(d,u);const p=_n({checked:o,onChange:f=>{l.style.opacity=f?"1":"0.5",r(f);}});return l.append(c,p.root),l}createEnhancementsCard(n){const o=Rs(),i=[...o.getAll().filter(s=>!this.isJournalInjection(s.id))].sort((s,l)=>s.name.localeCompare(l.name)),a=i.map((s,l)=>{const c=l===0,d=l===i.length-1,u=o.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{o.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,c,d)});return Ee({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},...a))}createJournalCard(n){const o=Rs(),i=[...o.getAll().filter(s=>this.isJournalInjection(s.id)).filter(s=>s.id!=="journalHints"&&s.id!=="journalFilterSort")].sort((s,l)=>s.name.localeCompare(l.name)),a=i.map((s,l)=>{const c=l===0,d=l===i.length-1,u=o.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{o.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,c,d)});return Ee({title:"Journal",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},...a))}isJournalInjection(n){return n==="abilitiesInject"||n==="journalHints"||n==="journalFilterSort"||n==="journalAllTab"||n==="missingVariantsIndicator"}renderThemePickers(n,o,r){const i=Lo[n];if(o.replaceChildren(),!!i)for(const a of v0){const s=i[a];if(s==null)continue;const l=o0({label:w0(a),value:s,defaultExpanded:false,onInput:c=>this.updateThemeVar(n,a,c,r),onChange:c=>this.updateThemeVar(n,a,c,r)});o.appendChild(l.root);}}updateThemeVar(n,o,r,i){const a=Lo[n];a&&(a[o]=C0(r),i===n&&this.deps.applyTheme(n));}createEnvCard(n){const o=n?.defaultExpanded??false,r=n?.onExpandChange,i=(b,C)=>{const S=m("div",{className:"kv kv--inline-mobile"}),_=m("label",{},b),E=m("div",{className:"ro"});return typeof C=="string"?E.textContent=C:E.append(C),S.append(_,E),S},a=m("code",{},"—"),s=m("span",{},"—"),l=m("span",{},"—"),c=m("span",{},"—"),d=m("span",{},"—"),u=m("span",{},"—"),p=()=>{const b=Je.detect();l.textContent=b.surface??"Unknown",c.textContent=b.platform??"Unknown",d.textContent=b.browser??"Unknown",u.textContent=b.os??"Unknown",a.textContent=b.host??"Unknown",s.textContent=b.isInIframe?"Yes":"No";},f=Ae({label:"Copy JSON",variant:"primary",size:"sm"});m0(f,()=>{const b=Je.detect();return JSON.stringify(b,null,2)});const g=m("div",{style:"width:100%;display:flex;justify-content:center;"},f),h=Ee({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:o,onExpandChange:r},i("Surface",l),i("Platform",c),i("Browser",d),i("OS",u),i("Host",a),i("Iframe",s)),x=()=>{document.hidden||p();};return document.addEventListener("visibilitychange",x),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",x)),h}}function cl(e){const{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:l=true,compact:c=false,maxHeight:d,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:h=false,getRowId:x=(oe,z)=>String(z),onSortChange:b,onSelectionChange:C,onRowClick:S}=e;let _=n.slice(),E=o.slice(),v=o.slice(),w=null,k=null,y=1;const T=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,I=!!s&&!(l&&T),P=m("div",{className:"lg-table-wrap",id:t});if(d!=null){const oe=typeof d=="number"?`${d}px`:d;P.style.setProperty("--tbl-max-h",oe);}const R=m("div",{className:"lg-table"}),O=m("div",{className:"lg-thead"}),W=m("div",{className:"lg-tbody"}),N=m("div",{className:"lg-tfoot"});i&&P.classList.add("sticky"),a&&P.classList.add("zebra"),c&&P.classList.add("compact"),u&&P.classList.add("selectable");const F=p==="switch"?"52px":"36px";P.style.setProperty("--check-w",F);function G(oe){return oe==="center"?"center":oe==="right"?"flex-end":"flex-start"}function B(){const oe=_.map(Q=>{const ee=(Q.width||"1fr").trim();return /\bfr$/.test(ee)?`minmax(0, ${ee})`:ee}),z=(u?[F,...oe]:oe).join(" ");P.style.setProperty("--lg-cols",z);}B();function H(){return r?Math.max(1,Math.ceil(E.length/r)):1}function L(){if(!r)return E;const oe=(y-1)*r;return E.slice(oe,oe+r)}function $(){if(!w||!k)return;const oe=_.find(ee=>String(ee.key)===w),z=k==="asc"?1:-1,Q=oe?.sortFn?(ee,re)=>z*oe.sortFn(ee,re):(ee,re)=>{const te=ee[w],ae=re[w];return te==null&&ae==null?0:te==null?-1*z:ae==null?1*z:typeof te=="number"&&typeof ae=="number"?z*(te-ae):z*String(te).localeCompare(String(ae),void 0,{numeric:true,sensitivity:"base"})};E.sort(Q);}const A=new Set(g);function M(){return Array.from(A)}const X=new Map;function U(oe){A.clear(),oe.forEach(z=>A.add(z)),Ce(),X.forEach((z,Q)=>{z.setChecked(A.has(Q),true);}),Pn(),C?.(M());}function q(){A.clear(),Ce(),X.forEach(oe=>oe.setChecked(false,true)),Pn(),C?.(M());}let Z=null;function Ce(){if(!Z)return;const oe=L();if(!oe.length){Z.indeterminate=false,Z.checked=false;return}const z=oe.map((ee,re)=>x(ee,(y-1)*(r||0)+re)),Q=z.reduce((ee,re)=>ee+(A.has(re)?1:0),0);Z.checked=Q===z.length,Z.indeterminate=Q>0&&Q<z.length;}let Ie=false;function mo(){Ie=false;const oe=W.offsetWidth-W.clientWidth;O.style.paddingRight=oe>0?`${oe}px`:"0px";}function an(){Ie||(Ie=true,requestAnimationFrame(mo));}const Ut=new ResizeObserver(()=>an()),ho=()=>an();function oa(){O.replaceChildren();const oe=m("div",{className:"lg-tr lg-tr-head"});if(u){const z=m("div",{className:"lg-th lg-th-check"});h||(Z=m("input",{type:"checkbox"}),Z.addEventListener("change",()=>{const Q=L(),ee=Z.checked;Q.forEach((re,te)=>{const ae=x(re,(y-1)*(r||0)+te);ee?A.add(ae):A.delete(ae);}),C?.(M()),Pn();}),z.appendChild(Z)),oe.appendChild(z);}_.forEach(z=>{const Q=m("button",{className:"lg-th",type:"button",title:z.title||z.header});Q.textContent=z.header,z.align&&Q.style.setProperty("--col-justify",G(z.align)),z.sortable&&Q.classList.add("sortable"),w===String(z.key)&&k?Q.setAttribute("data-sort",k):Q.removeAttribute("data-sort"),z.sortable&&Q.addEventListener("click",()=>{const ee=String(z.key);w!==ee?(w=ee,k="asc"):(k=k==="asc"?"desc":k==="desc"?null:"asc",k||(w=null,E=v.slice())),b?.(w,k),w&&k&&$(),Mn();}),oe.appendChild(Q);}),O.appendChild(oe);try{Ut.disconnect();}catch{}Ut.observe(W),an();}function In(oe){return Array.from(oe.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function fr(oe){return oe.querySelector(".lg-td, .lg-td-check")}function gr(oe){const z=fr(oe);return z?z.getBoundingClientRect():null}function Pn(){const oe=L(),z=new Map;Array.from(W.children).forEach(te=>{const ae=te,me=ae.getAttribute("data-id");if(!me)return;const Te=gr(ae);Te&&z.set(me,Te);});const Q=new Map;Array.from(W.children).forEach(te=>{const ae=te,me=ae.getAttribute("data-id");me&&Q.set(me,ae);});const ee=[];for(let te=0;te<oe.length;te++){const ae=oe[te],me=(r?(y-1)*r:0)+te,Te=x(ae,me);ee.push(Te);let he=Q.get(Te);he||(he=Xl(ae,me),I&&In(he).forEach(mr=>{mr.style.transform="translateY(6px)",mr.style.opacity="0";})),W.appendChild(he);}const re=[];if(Q.forEach((te,ae)=>{ee.includes(ae)||re.push(te);}),!I){re.forEach(te=>te.remove()),Ce(),an();return}ee.forEach(te=>{const ae=W.querySelector(`.lg-tr-body[data-id="${te}"]`);if(!ae)return;const me=gr(ae),Te=z.get(te),he=In(ae);if(Te&&me){const Pt=Te.left-me.left,bo=Te.top-me.top;he.forEach(sn=>{sn.style.transition="none",sn.style.transform=`translate(${Pt}px, ${bo}px)`,sn.style.opacity="1";}),fr(ae)?.getBoundingClientRect(),he.forEach(sn=>{sn.style.willChange="transform, opacity",sn.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(sn=>{sn.style.transform="translate(0,0)";});});}else he.forEach(Pt=>{Pt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(Pt=>{Pt.style.transform="translate(0,0)",Pt.style.opacity="1";});});const Yl=Pt=>{(Pt.propertyName==="transform"||Pt.propertyName==="opacity")&&(he.forEach(bo=>{bo.style.willChange="",bo.style.transition="",bo.style.transform="",bo.style.opacity="";}),Pt.currentTarget.removeEventListener("transitionend",Yl));},mr=he[0];mr&&mr.addEventListener("transitionend",Yl);}),re.forEach(te=>{const ae=In(te);ae.forEach(he=>{he.style.willChange="transform, opacity",he.style.transition="transform .18s ease, opacity .18s ease",he.style.opacity="0",he.style.transform="translateY(-6px)";});const me=he=>{he.propertyName==="opacity"&&(he.currentTarget.removeEventListener("transitionend",me),te.remove());},Te=ae[0];Te?Te.addEventListener("transitionend",me):te.remove();}),Ce(),an();}function Xl(oe,z){const Q=x(oe,z),ee=m("div",{className:"lg-tr lg-tr-body","data-id":Q});if(u){const re=m("div",{className:"lg-td lg-td-check"});if(p==="switch"){const te=_n({size:"sm",checked:A.has(Q),onChange:ae=>{ae?A.add(Q):A.delete(Q),Ce(),C?.(M());}});X.set(Q,te),re.appendChild(te.root);}else {const te=m("input",{type:"checkbox",className:"lg-row-check"});te.checked=A.has(Q),te.addEventListener("change",ae=>{ae.stopPropagation(),te.checked?A.add(Q):A.delete(Q),Ce(),C?.(M());}),te.addEventListener("click",ae=>ae.stopPropagation()),re.appendChild(te);}ee.appendChild(re);}return _.forEach(re=>{const te=m("div",{className:"lg-td"});re.align&&te.style.setProperty("--col-justify",G(re.align));let ae=re.render?re.render(oe,z):String(oe[re.key]??"");typeof ae=="string"?te.textContent=ae:te.appendChild(ae),ee.appendChild(te);}),(S||u&&f)&&(ee.classList.add("clickable"),ee.addEventListener("click",re=>{if(!re.target.closest(".lg-td-check")){if(u&&f){const te=!A.has(Q);if(te?A.add(Q):A.delete(Q),Ce(),p==="switch"){const ae=X.get(Q);ae&&ae.setChecked(te,true);}else {const ae=ee.querySelector(".lg-row-check");ae&&(ae.checked=te);}C?.(M());}S?.(oe,z,re);}})),ee}function ra(){if(N.replaceChildren(),!r)return;const oe=H(),z=m("div",{className:"lg-pager"}),Q=m("button",{className:"btn",type:"button"},"←"),ee=m("button",{className:"btn",type:"button"},"→"),re=m("span",{className:"lg-pager-info"},`${y} / ${oe}`);Q.disabled=y<=1,ee.disabled=y>=oe,Q.addEventListener("click",()=>Ln(y-1)),ee.addEventListener("click",()=>Ln(y+1)),z.append(Q,re,ee),N.appendChild(z);}function Ln(oe){const z=H();y=Math.min(Math.max(1,oe),z),Pn(),ra();}function Mn(){B(),oa(),Pn(),ra();}function ia(oe){v=oe.slice(),E=oe.slice(),w&&k&&$(),Ln(1);}function aa(oe){_=oe.slice(),Mn();}function sa(oe,z="asc"){w=oe,k=oe?z:null,w&&k?$():E=v.slice(),Mn();}function la(){try{Ut.disconnect();}catch{}window.removeEventListener("resize",ho);}return R.append(O,W,N),P.appendChild(R),window.addEventListener("resize",ho),Mn(),{root:P,setData:ia,setColumns:aa,sortBy:sa,getSelection:M,setSelection:U,clearSelection:q,setPage:Ln,getState:()=>({page:y,pageCount:H(),sortKey:w,sortDir:k}),destroy:la}}let Ns=false;const Mr=new Set;function k0(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const pt=e=>{const t=k0();if(t){for(const n of Mr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function _0(){Ns||(Ns=true,window.addEventListener("keydown",pt,true),window.addEventListener("keypress",pt,true),window.addEventListener("keyup",pt,true),document.addEventListener("keydown",pt,true),document.addEventListener("keypress",pt,true),document.addEventListener("keyup",pt,true));}function E0(){Ns&&(Ns=false,window.removeEventListener("keydown",pt,true),window.removeEventListener("keypress",pt,true),window.removeEventListener("keyup",pt,true),document.removeEventListener("keydown",pt,true),document.removeEventListener("keypress",pt,true),document.removeEventListener("keyup",pt,true));}function T0(e){return Mr.size===0&&_0(),Mr.add(e),()=>{Mr.delete(e),Mr.size===0&&E0();}}function fa(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function A0(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function $i(e={}){const{id:t,placeholder:n="Search...",value:o="",size:r="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:l,autoSearch:c=false,debounceMs:d=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:h="Clear",ariaLabel:x,submitLabel:b,loading:C=false,blockGameKeys:S=true}=e,_=m("div",{className:"search"+(r?` search--${r}`:""),id:t}),E=m("span",{className:"search-ico search-ico--left"});if(p){const q=fa(p);q&&E.appendChild(q);}else E.textContent="🔎",E.style.opacity=".9";const v=m("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":x||n}),w=m("span",{className:"search-ico search-ico--right"});if(f){const q=fa(f);q&&w.appendChild(q);}const k=A0();k.classList.add("search-spinner");const y=g?m("button",{className:"search-clear",type:"button",title:h},"×"):null,T=b!=null?m("button",{className:"btn search-submit",type:"button"},b):null,I=m("div",{className:"search-field"},E,v,w,k,...y?[y]:[]);_.append(I,...T?[T]:[]);let P=!!i,R=null;function O(q){k.style.display=q?"inline-block":"none",_.classList.toggle("is-loading",q);}function W(){R!=null&&(window.clearTimeout(R),R=null);}function N(q){W(),d>0?R=window.setTimeout(()=>{R=null,q();},d):q();}function F(){s?.(v.value),c&&l&&l(v.value);}v.addEventListener("input",()=>{N(F);}),v.addEventListener("keydown",q=>{q.key==="Enter"?(q.preventDefault(),W(),l?.(v.value)):q.key==="Escape"&&(v.value.length>0?H("",{notify:true}):v.blur());}),y&&y.addEventListener("click",()=>H("",{notify:true})),T&&T.addEventListener("click",()=>l?.(v.value));let G=()=>{};if(S&&(G=T0(v)),u){const q=Z=>{if(Z.key===u&&!Z.ctrlKey&&!Z.metaKey&&!Z.altKey){const Ce=document.activeElement;Ce&&(Ce.tagName==="INPUT"||Ce.tagName==="TEXTAREA"||Ce.isContentEditable)||(Z.preventDefault(),v.focus());}};window.addEventListener("keydown",q,true),_.__cleanup=()=>{window.removeEventListener("keydown",q,true),G();};}else _.__cleanup=()=>{G();};function B(q){P=!!q,v.disabled=P,y&&(y.disabled=P),T&&(T.disabled=P),_.classList.toggle("disabled",P);}function H(q,Z={}){const Ce=v.value;v.value=q??"",Z.notify&&Ce!==q&&N(F);}function L(){return v.value}function $(){v.focus();}function A(){v.blur();}function M(q){v.placeholder=q;}function X(q){H("",q);}return B(P),O(C),a&&$(),{root:_,input:v,getValue:L,setValue:H,focus:$,blur:A,setDisabled:B,setPlaceholder:M,clear:X,setLoading:O,setIconLeft(q){E.replaceChildren();const Z=fa(q??"🔎");Z&&E.appendChild(Z);},setIconRight(q){w.replaceChildren();const Z=fa(q??"");Z&&w.appendChild(Z);}}}const dl=e=>new Promise(t=>setTimeout(t,e)),kt=e=>{try{return e()}catch{return}},$t=(e,t,n)=>Math.max(t,Math.min(n,e)),I0=e=>$t(e,0,1);async function qp(e,t,n){const o=performance.now();for(;performance.now()-o<t;){const r=await Promise.race([e,dl(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}let gu=null;function Sm(){return gu}function P0(e){gu=e;}function km(){return gu!==null}const L0=/\/(?:r\/\d+\/)?version\/([^/]+)/,M0=15e3,R0=50;function N0(){return V?.document??(typeof document<"u"?document:null)}function mu(e={}){if(km())return;const t=e.doc??N0();if(!t)return;const n=t.scripts;for(let o=0;o<n.length;o++){const i=n.item(o)?.src;if(!i)continue;const a=i.match(L0);if(a?.[1]){P0(a[1]);return}}}function O0(){return mu(),Sm()}function $0(){return km()}async function D0(e={}){const t=e.timeoutMs??M0,n=performance.now();for(;performance.now()-n<t;){mu();const o=Sm();if(o)return o;await dl(R0);}throw new Error("MGVersion timeout (gameVersion not found)")}const hu={init:mu,isReady:$0,get:O0,wait:D0},F0=V?.location?.origin||"https://magicgarden.gg";function _m(){return typeof GM_xmlhttpRequest=="function"}function Em(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))});})}async function bu(e){if(_m())return JSON.parse((await Em(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Tm(e){if(_m())return (await Em(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function B0(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),r=V?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i);},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"));},i.src=o;})}const Yt=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),z0=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Kp=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):z0(e)+String(t||"");let xu=null,Am=null;function Im(){return xu}function G0(){return Am}function H0(e){xu=e;}function j0(e){Am=e;}function Pm(){return xu!==null}const U0=15e3;async function W0(e={}){Pm()||await yu(e);}async function yu(e={}){const t=Im();if(t)return t;const n=G0();if(n)return n;const o=(async()=>{const r=e.gameVersion??await hu.wait({timeoutMs:U0}),i=`${F0}/version/${r}/assets/`;return H0(i),i})();return j0(o),o}async function V0(e){const t=await yu();return Yt(t,e)}function q0(){return Pm()}const lo={init:W0,isReady:q0,base:yu,url:V0},Lm=new Map;function K0(e){return Lm.get(e)}function X0(e,t){Lm.set(e,t);}const Mm="manifest.json";let Yc=null;async function Y0(){Yc||(Yc=await Rm());}function J0(){return Yc!==null}async function Rm(e={}){const t=e.baseUrl??await lo.base(),n=K0(t);if(n)return n;const o=bu(Yt(t,Mm));return X0(t,o),o}function Q0(e,t){return e.bundles.find(n=>n.name===t)??null}function Z0(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const o of n.src??[])typeof o=="string"&&o.endsWith(".json")&&o!==Mm&&t.add(o);return Array.from(t)}const Jt={init:Y0,isReady:J0,load:Rm,getBundle:Q0,listJsonFromBundle:Z0},ew=V,St=ew.Object??Object,ul=St.keys,Os=St.values,$s=St.entries,Xp=new WeakSet;function tw(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const se=tw(),Nn={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},nw=["Rain","Frost","Dawn","AmberMoon"],Yp=/main-[^/]+\.js(\?|$)/,ow=6,rw=150,iw=2e3,aw=200,sw=50,lw=10,cw=1e3,Jc="ProduceScaleBoost",On=(e,t)=>t.every(n=>e.includes(n));function $n(e,t){se.data[e]==null&&(se.data[e]=t,Ds()&&$m());}function Ds(){return Object.values(se.data).every(e=>e!=null)}function Nm(e,t){if(!e||typeof e!="object"||Xp.has(e))return;Xp.add(e);let n;try{n=ul(e);}catch{return}if(!n||n.length===0)return;const o=e;let r;if(!se.data.items&&On(n,Nn.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&$n("items",o)),!se.data.decor&&On(n,Nn.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&$n("decor",o)),!se.data.mutations&&On(n,Nn.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&$n("mutations",o)),!se.data.eggs&&On(n,Nn.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&$n("eggs",o)),!se.data.pets&&On(n,Nn.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&$n("pets",o)),!se.data.abilities&&On(n,Nn.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&$n("abilities",o)),!se.data.plants&&On(n,Nn.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&$n("plants",o)),!(t>=ow))for(const i of n){let a;try{a=o[i];}catch{continue}a&&typeof a=="object"&&Nm(a,t+1);}}function Za(e){try{Nm(e,0);}catch{}}function Om(){if(!se.isHookInstalled){if(St.__MG_HOOKED__){se.isHookInstalled=true;return}St.__MG_HOOKED__=true,se.isHookInstalled=true;try{St.keys=function(t){return Za(t),ul.apply(this,arguments)},Os&&(St.values=function(t){return Za(t),Os.apply(this,arguments)}),$s&&(St.entries=function(t){return Za(t),$s.apply(this,arguments)});}catch{}}}function $m(){if(se.isHookInstalled){try{St.keys=ul,Os&&(St.values=Os),$s&&(St.entries=$s);}catch{}se.isHookInstalled=false;}}function dw(){if(se.scanInterval||Ds())return;const e=()=>{if(Ds()||se.scanAttempts>rw){Dm();return}se.scanAttempts++;try{ul(V).forEach(t=>{try{Za(V[t]);}catch{}});}catch{}};e(),se.scanInterval=setInterval(e,iw);}function Dm(){se.scanInterval&&(clearInterval(se.scanInterval),se.scanInterval=null);}const Jp=V;function uw(){try{for(const e of Jp.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Yp.test(t))return t}}catch{}try{for(const e of Jp.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Yp.test(t))return t}}catch{}return null}function pw(e,t){const n=[];let o=e.indexOf(t);for(;o!==-1;)n.push(o),o=e.indexOf(t,o+t.length);return n}function pl(e,t){let n=0,o="",r=false;for(let i=t;i<e.length;i++){const a=e[i];if(o){if(r){r=false;continue}if(a==="\\"){r=true;continue}a===o&&(o="");continue}if(a==='"'||a==="'"||a==="`"){o=a;continue}if(a==="{")n++;else if(a==="}"&&--n===0)return e.slice(t,i+1)}return null}function fw(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const o=e.indexOf("=",n);if(o<0||o>t)return null;const r=e.indexOf("{",o);return r<0||r>t?null:pl(e,r)}let Ql=null,hr=null;async function Fm(){return Ql||hr||(hr=(async()=>{const e=uw();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return Ql=n,n}catch{return null}finally{hr=null;}})(),hr)}function gw(e){const t={};let n=false;for(const o of nw){const r=e?.[o];if(!r||typeof r!="object")continue;const i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}function mw(e,t){const n=Math.max(0,t-3e3),o=e.substring(n,t),r=/Rain:\{/,i=o.match(r);if(!i||i.index===void 0)return null;const a=n+i.index;let s=-1;for(let l=a-1;l>=Math.max(0,a-200);l--)if(e[l]==="{"){s=l;break}return s<0?null:pl(e,s)}function hw(e){return e.replace(/\$t\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"').replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"')}async function bw(){if(se.data.weather)return  true;const e=await Fm();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=fw(e,t)??mw(e,t);if(!n)return  false;const o=hw(n);let r;try{r=Function('"use strict";return('+o+")")();}catch{return  false}const i=gw(r);return i?(se.data.weather=i,true):false}function xw(){if(se.weatherPollingTimer)return;se.weatherPollAttempts=0;const e=setInterval(async()=>{(await bw()||++se.weatherPollAttempts>aw)&&(clearInterval(e),se.weatherPollingTimer=null);},sw);se.weatherPollingTimer=e;}function yw(){se.weatherPollingTimer&&(clearInterval(se.weatherPollingTimer),se.weatherPollingTimer=null);}const vw={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function ww(e){const t=pw(e,Jc);if(!t.length)return null;for(const n of t){const o=Math.max(0,n-4e3),r=Math.min(e.length,n+4e3),a=e.slice(o,r).lastIndexOf("switch(");if(a===-1)continue;const s=o+a,l=e.indexOf("{",s);if(l===-1)continue;const c=pl(e,l);if(c&&c.includes(Jc)&&(c.includes('bg:"')||c.includes("bg:'")))return c}return null}function Cw(e){const t={},n=[],o=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,r=(a,s)=>{const l=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),c=a.match(l);return c?c[2]:null};let i;for(;(i=o.exec(e))!==null;){if(i[2]){n.push(i[2]);continue}const a=i[0];if(a.startsWith("default")){n.length=0;continue}if(!a.startsWith("return"))continue;const s=e.indexOf("{",i.index);if(s===-1){n.length=0;continue}const l=pl(e,s);if(!l){n.length=0;continue}const c=r(l,"bg");if(!c){n.length=0;continue}const d=r(l,"hover")||c;for(const u of n)t[u]||(t[u]={bg:c,hover:d});n.length=0;}return Object.keys(t).length?t:null}async function Sw(){const e=await Fm();if(!e)return null;const t=ww(e);return t?Cw(t):null}function kw(e){const t=e[Jc];return t!=null&&typeof t=="object"&&"color"in t}async function _w(){if(!se.data.abilities)return  false;const e=se.data.abilities;if(kw(e))return  true;const t=await Sw();if(!t)return  false;const n={};for(const[o,r]of Object.entries(e)){const i=t[o]||vw;n[o]={...r,color:{bg:i.bg,hover:i.hover}};}return se.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function Ew(){if(se.colorPollingTimer)return;se.colorPollAttempts=0;const e=setInterval(async()=>{(await _w()||++se.colorPollAttempts>lw)&&(clearInterval(e),se.colorPollingTimer=null);},cw);se.colorPollingTimer=e;}function Tw(){se.colorPollingTimer&&(clearInterval(se.colorPollingTimer),se.colorPollingTimer=null);}function Aw(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function Iw(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Pw(){return {cache:new Map,maxEntries:200}}const Lw={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Mw={enabled:true,maxEntries:200},Ve=Aw(),Rw=Iw(),Nw={...Lw},Ow=Pw(),$w={...Mw};function nt(){return Ve}function Ko(){return Rw}function di(){return Nw}function ui(){return Ow}function Qc(){return $w}function Bm(){return Ve.ready}const Qp=Function.prototype.bind,ve={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let zm,Gm,Hm;const Dw=new Promise(e=>{zm=e;}),Fw=new Promise(e=>{Gm=e;}),Bw=new Promise(e=>{Hm=e;});function zw(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Gw(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Hw(e){ve.engine=e,ve.tos=Gw(e)||null,ve.app=e.app||null,ve.renderer=e.app?.renderer||null,ve.ticker=e.app?.ticker||null,ve.stage=e.app?.stage||null;try{zm(e);}catch{}try{ve.app&&Gm(ve.app);}catch{}try{ve.renderer&&Hm(ve.renderer);}catch{}}function vu(){return ve.engine?true:(ve._bindPatched||(ve._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Qp.call(this,e,...t);try{!ve.engine&&zw(e)&&(Function.prototype.bind=Qp,ve._bindPatched=!1,Hw(e));}catch{}return n}),false)}vu();async function jw(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(ve.engine)return  true;vu(),await dl(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Uw(e=15e3){return ve.engine||await jw(e),true}function Ww(){return ve.engine&&ve.app?{ok:true,engine:ve.engine,tos:ve.tos,app:ve.app}:(vu(),{ok:false,engine:ve.engine,tos:ve.tos,app:ve.app,note:"Not captured. Wait for room, or reload."})}const ft={engineReady:Dw,appReady:Fw,rendererReady:Bw,engine:()=>ve.engine,tos:()=>ve.tos,app:()=>ve.app,renderer:()=>ve.renderer,ticker:()=>ve.ticker,stage:()=>ve.stage,PIXI:()=>V.PIXI||null,init:Uw,hook:Ww,ready:()=>!!ve.engine};function Fs(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Di(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Fs(o):`sprite/${n}/${o}`}function pi(e,t,n,o){const r=Di(e,t);if(n.has(r)||o.has(r))return r;const i=String(t||"").trim();if(n.has(i)||o.has(i))return i;const a=Fs(i);return n.has(a)||o.has(a)?a:r}function Vw(e,t,n=25e3){const o=[e],r=new Set;let i=0;for(;o.length&&i++<n;){const a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l]);}return null}function qw(e){const t=V.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,o=Vw(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Kw(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return qw(e)}catch{await dl(50);}throw new Error("Constructors timeout")}const Dn=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function Xw(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Zl(e,t,n,o,r){return new e(t,n,o,r)}function Yw(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Jw(e,t,n,o){const{Texture:r,Rectangle:i}=o;for(const[a,s]of Object.entries(e.frames)){const l=s.frame,c=!!s.rotated,d=c?2:0,u=c?l.h:l.w,p=c?l.w:l.h,f=Zl(i,l.x,l.y,u,p),g=s.sourceSize||{w:l.w,h:l.h},h=Zl(i,0,0,g.w,g.h);let x=null;if(s.trimmed&&s.spriteSourceSize){const b=s.spriteSourceSize;x=Zl(i,b.x,b.y,b.w,b.h);}n.set(a,Yw(r,t,f,h,x,d,s.anchor||null));}}function Qw(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;const i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i);}}function Zw(e,t){const n=(o,r)=>{const i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const o of Object.keys(e.frames||{})){const r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2]);}}async function eC(e,t){const n=await Jt.load({baseUrl:e}),o=Jt.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");const r=Jt.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,l=new Map;async function c(d){if(i.has(d))return;i.add(d);const u=await bu(Yt(e,d));if(!Xw(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const x of p)await c(Kp(d,x));const f=Kp(d,u.meta.image),g=await B0(await Tm(Yt(e,f))),h=t.Texture.from(g);Jw(u,h,a,t),Qw(u,a,s),Zw(u,l);}for(const d of r)await c(d);return {textures:a,animations:s,categoryIndex:l}}let ga=null;async function tC(){return Ve.ready?true:ga||(ga=(async()=>{const e=performance.now();Dn("init start");const t=await qp(ft.appReady,15e3,"PIXI app");Dn("app ready");const n=await qp(ft.rendererReady,15e3,"PIXI renderer");Dn("renderer ready"),Ve.app=t,Ve.renderer=n||t?.renderer||null,Ve.ctors=await Kw(t),Dn("constructors resolved"),Ve.baseUrl=await lo.base(),Dn("base url",Ve.baseUrl);const{textures:o,animations:r,categoryIndex:i}=await eC(Ve.baseUrl,Ve.ctors);return Ve.textures=o,Ve.animations=r,Ve.categoryIndex=i,Dn("atlases loaded","textures",Ve.textures.size,"animations",Ve.animations.size,"categories",Ve.categoryIndex?.size??0),Ve.ready=true,Dn("ready in",Math.round(performance.now()-e),"ms"),true})(),ga)}const Xo={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},jm=Object.keys(Xo),nC=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Zp=new Map(nC.map((e,t)=>[e,t]));function Bs(e){return [...new Set(e.filter(Boolean))].sort((n,o)=>(Zp.get(n)??1/0)-(Zp.get(o)??1/0))}const oC=["Wet","Chilled","Frozen"],rC=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),iC={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},aC={Pepper:.5,Banana:.6},sC=256,lC=.5,cC=2;function Um(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=Bs(e),n=dC(e),o=uC(e);return {muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function dC(e){const t=e.filter((r,i,a)=>Xo[r]&&a.indexOf(r)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?Bs(t.filter(r=>!oC.includes(r))):Bs(t)}function uC(e){const t=e.filter((n,o,r)=>Xo[n]?.overlayTall&&r.indexOf(n)===o);return Bs(t)}function ec(e,t){return e.map(n=>({name:n,meta:Xo[n],overlayTall:Xo[n]?.overlayTall??null,isTall:t}))}const pC={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},ma=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(const r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function fC(e){return ma.has(e)?e:ma.has("overlay")?"overlay":ma.has("screen")?"screen":ma.has("lighter")?"lighter":"source-atop"}function gC(e,t,n,o,r=false){const i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){const u=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*u,s-Math.sin(i)*u,a+Math.cos(i)*u,s+Math.sin(i)*u)}const l=Math.cos(i),c=Math.sin(i),d=Math.abs(l)*t/2+Math.abs(c)*n/2;return e.createLinearGradient(a-l*d,s-c*d,a+l*d,s+c*d)}function ef(e,t,n,o,r=false){const i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?gC(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,l)=>a.addColorStop(l/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function mC(e,t,n,o){const r=pC[n];if(!r)return;const i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&o,s=t.width,l=t.height;e.save();const c=i.masked?fC(i.op):"source-in";if(e.globalCompositeOperation=c,i.a!=null&&(e.globalAlpha=i.a),i.masked){const d=document.createElement("canvas");d.width=s,d.height=l;const u=d.getContext("2d");u.imageSmoothingEnabled=false,ef(u,s,l,i,a),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(d,0,0);}else ef(e,s,l,i,a);e.restore();}function hC(e){return /tallplant/i.test(e)}function wu(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Wm(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function bC(e,t){const n=String(e||"").toLowerCase();for(const o of t.keys()){const r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){const a=t.get(o);if(a)return {tex:a,key:o}}}return null}function xC(e,t,n,o){if(!t)return null;const r=wu(e),i=Wm(t);for(const a of i){const s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(const l of s){const c=n.get(l);if(c)return {tex:c,key:l}}{const l=`sprite/mutation-overlay/${a}TallPlant`,c=n.get(l);if(c)return {tex:c,key:l};const d=`sprite/mutation-overlay/${a}`,u=n.get(d);if(u)return {tex:u,key:d};const p=bC(t,n);if(p)return p}}return null}function yC(e,t,n,o){if(!t)return null;const r=Xo[t];if(n&&r?.tallIconOverride){const s=o.get(r.tallIconOverride);if(s)return s}const i=wu(e),a=Wm(t);for(const s of a){const l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const c of l){const d=o.get(c);if(d)return d}if(n){const c=`sprite/mutation-overlay/${s}TallPlantIcon`,d=o.get(c);if(d)return d;const u=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(u);if(p)return p}}return null}function vC(e,t,n){const o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=aC[t]??i;const l=r>o*1.5;let c=iC[t]??(l?a:.4);const d={x:(s-i)*o,y:(c-a)*r},u=Math.min(o,r),p=Math.min(1.5,u/sC);let f=lC*p;return n&&(f*=cC),{width:o,height:r,anchorX:i,anchorY:a,offset:d,iconScale:f}}function Vm(e,t){return `${t.sig}::${e}`}function qm(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function wC(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function CC(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-qm(o??null));}}function Km(e,t){const n=e.lru.get(t);return n?(wC(e,t,n),n):null}function Xm(e,t,n,o){e.lru.set(t,n),e.cost+=qm(n),CC(e,o);}function SC(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function kC(e,t){return e.srcCanvas.get(t)??null}function _C(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){const r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r);}}function fl(e,t,n,o,r){const i=kC(o,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const l=new n.Sprite(e),c=t.extract.canvas(l);if(l.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&c){const d=Math.round(c.width/s),u=Math.round(c.height/s);a=document.createElement("canvas"),a.width=d,a.height=u;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(c,0,0,d,u));}else a=c;}}catch{}if(!a){const l=e?.frame||e?._frame,c=e?.orig||e?._orig,d=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!l||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(c?.width??l.width)|0),g=Math.max(1,(c?.height??l.height)|0),h=d?.x??0,x=d?.y??0;a.width=f,a.height=g;const b=a.getContext("2d");b.imageSmoothingEnabled=false,u===true||u===2||u===8?(b.save(),b.translate(h+l.height/2,x+l.width/2),b.rotate(-Math.PI/2),b.drawImage(p,l.x,l.y,l.width,l.height,-l.width/2,-l.height/2,l.width,l.height),b.restore()):b.drawImage(p,l.x,l.y,l.width,l.height,h,x,l.width,l.height);}return _C(o,e,a,r),a}function EC(e,t,n,o,r,i,a,s){const{w:l,h:c,aX:d,aY:u,basePos:p}=t,f=[];for(const g of n){const h=new o.Sprite(e);h.anchor?.set?.(d,u),h.position.set(p.x,p.y),h.zIndex=1;const x=document.createElement("canvas");x.width=l,x.height=c;const b=x.getContext("2d");b.imageSmoothingEnabled=false,b.save(),b.translate(l*d,c*u),b.drawImage(fl(e,r,o,i,a),-l*d,-c*u),b.restore(),mC(b,x,g.name,g.isTall);const C=o.Texture.from(x,{resolution:e.resolution??1});s.push(C),h.texture=C,f.push(h);}return f}function TC(e,t,n,o,r,i,a,s,l,c){const{aX:d,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&o.get(f.overlayTall)&&{tex:o.get(f.overlayTall),key:f.overlayTall}||xC(e,f.name,o);if(!g?.tex)continue;const h=fl(g.tex,i,r,a,s);if(!h)continue;const x=h.width,b={x:0,y:0},C={x:u.x-d*x,y:0},S=document.createElement("canvas");S.width=x,S.height=h.height;const _=S.getContext("2d");if(!_)continue;_.imageSmoothingEnabled=false,_.drawImage(h,0,0),_.globalCompositeOperation="destination-in",_.drawImage(l,-C.x,-0);const E=r.Texture.from(S,{resolution:g.tex.resolution??1});c.push(E);const v=new r.Sprite(E);v.anchor?.set?.(b.x,b.y),v.position.set(C.x,C.y),v.scale.set(1),v.alpha=1,v.zIndex=3,p.push(v);}return p}function AC(e,t,n,o,r,i){const{basePos:a}=t,s=[];for(const l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;const c=yC(e,l.name,l.isTall,o);if(!c)continue;const d=new r.Sprite(c),u=c?.defaultAnchor?.x??.5,p=c?.defaultAnchor?.y??.5;d.anchor?.set?.(u,p),d.position.set(a.x+i.offset.x,a.y+i.offset.y),d.scale.set(i.iconScale),l.isTall&&(d.zIndex=-1),rC.has(l.name)&&(d.zIndex=10),d.zIndex||(d.zIndex=2),s.push(d);}return s}function Ym(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;const{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,c=e?.defaultAnchor?.x??.5,d=e?.defaultAnchor?.y??.5,u={x:s*c,y:l*d},p=fl(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),f=new r;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(c,d),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const h=hC(t),x=ec(n.muts,h),b=ec(n.overlayMuts,h),C=ec(n.selectedMuts,h),S=[],_={w:s,h:l,aX:c,aY:d,basePos:u},E=wu(t),v=vC(e,E,h);EC(e,_,x,o.ctors,o.renderer,o.cacheState,o.cacheConfig,S).forEach(O=>f.addChild(O)),h&&TC(t,_,b,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,S).forEach(W=>f.addChild(W)),AC(t,_,C,o.textures,o.ctors,v).forEach(O=>f.addChild(O));let y={x:0,y:0,width:s,height:l};try{const O=f.getLocalBounds?.()||f.getBounds?.(!0);O&&Number.isFinite(O.width)&&Number.isFinite(O.height)&&(y={x:O.x,y:O.y,width:O.width,height:O.height});}catch{}const{Rectangle:T}=o.ctors,I=T?new T(0,0,s,l):void 0;let P=null;if(typeof o.renderer.generateTexture=="function"?P=o.renderer.generateTexture(f,{resolution:1,region:I}):o.renderer.textureGenerator?.generateTexture&&(P=o.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:I})),!P)throw new Error("no render texture");const R=P instanceof a?P:a.from(o.renderer.extract.canvas(P));try{R.__mg_base={baseX:-y.x,baseY:-y.y,baseW:s,baseH:l,texW:y.width,texH:y.height};}catch{}P&&P!==R&&P.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{R.__mg_gen=!0,R.label=`${t}|${n.sig}`;}catch{}return R}catch{return null}}function IC(e,t,n,o){if(!e||e.length<2)return null;const r=[];for(const i of e){const a=Ym(i,t,n,o);a&&r.push(a);}return r.length>=2?r:null}function Jm(e,t,n,o,r){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",l=t.anchorX??.5,c=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${l}|ay${c}|bm${n}|bp${r}|p${o}`}function PC(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function LC(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,r=a);r&&e.cache.delete(r);}e.cache.set(n,{canvas:o,lastAccess:performance.now()});}}function tf(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function MC(e){e.cache.clear();}function RC(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function NC(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function OC(e,t,n,o,r,i,a,s=5,l=0){if(!t.ready||!i.enabled)return 0;const c=e.length;let d=0;a?.(0,c);for(let u=0;u<c;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=pi(null,f,t.textures,t.animations),h={scale:1},x=Zm(h),b=eh(x,h),C=nh(x,h.boundsPadding),S=Jm(g,h,x,b,C);r.cache.has(S)||Zc(t,n,o,null,f,h,r,i),d++;}catch{d++;}a?.(d,c),u+s<c&&await NC();}return d}function $C(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function DC(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Cu(e,t,n,o,r,i){if(!n.length)return t;const a=Um(n);if(!a.sig)return t;const s=Vm(e,a),l=Km(r,s);if(l?.tex)return l.tex;const c=Ym(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(Xm(r,s,{isAnim:false,tex:c},i),c):t}function Qm(e,t,n,o,r,i){if(!n.length)return t;const a=Um(n);if(!a.sig)return t;const s=Vm(e,a),l=Km(r,s);if(l?.isAnim&&l.frames?.length)return l.frames;const c=IC(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(Xm(r,s,{isAnim:true,frames:c},i),c):t}function nf(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=pi(o,r,e.textures,e.animations),s=i.mutations||[],l=i.parent||DC(e)||$C(e),c=e.renderer?.width||e.renderer?.view?.width||innerWidth,d=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=i.center?c/2:i.x??c/2,p=i.center?d/2:i.y??d/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const b=Qm(a,g,s,e,t,n),C=e.ctors.AnimatedSprite;if(C)f=new C(b),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const S=new e.ctors.Sprite(b[0]),E=1e3/Math.max(1,i.fps||8);let v=0,w=0;const k=y=>{const T=e.app.ticker?.deltaMS??y*16.666666666666668;if(v+=T,v<E)return;const I=v/E|0;v%=E,w=(w+I)%b.length,S.texture=b[w];};S.__mgTick=k,e.app.ticker?.add?.(k),f=S;}}else {const b=e.textures.get(a);if(!b)throw new Error(`Unknown sprite/anim key: ${a}`);const C=Cu(a,b,s,e,t,n);f=new e.ctors.Sprite(C);}const h=i.anchorX??f.texture?.defaultAnchor?.x??.5,x=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(h,x),f.position.set(u,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,l.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function FC(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const of=new Map;function Zm(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function eh(e,t){return e==="mutations"?t.pad??2:t.pad??0}function br(e){return Number.isFinite(e)?Math.max(0,e):0}function th(e){if(typeof e=="number"){const t=br(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:br(e.top??0),right:br(e.right??0),bottom:br(e.bottom??0),left:br(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function nh(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=th(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function oh(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function rh(e,t,n){const o=e?.__mg_base;return o&&Number.isFinite(o.baseX)&&Number.isFinite(o.baseY)&&Number.isFinite(o.baseW)&&Number.isFinite(o.baseH)&&Number.isFinite(o.texW)&&Number.isFinite(o.texH)?o:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function BC(e,t,n,o,r,i){const a=`${e}|f${t}`,s=of.get(a);if(s)return s;const l=oh(n),c={top:0,right:0,bottom:0,left:0};for(const d of jm){const u=Cu(e,n,[d],o,r,i),p=rh(u,l.w,l.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),h=Math.max(0,p.texW-p.baseX-p.baseW),x=Math.max(0,p.texH-p.baseY-p.baseH);f>c.left&&(c.left=f),g>c.top&&(c.top=g),h>c.right&&(c.right=h),x>c.bottom&&(c.bottom=x);}return of.set(a,c),c}function Zc(e,t,n,o,r,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const l=pi(o,r,e.textures,e.animations),c=Zm(i),d=eh(c,i),u=nh(c,i.boundsPadding),p=a&&s?.enabled?Jm(l,i,c,d,u):null;if(p&&a&&s?.enabled){const S=PC(a,p);if(S)return tf(S)}const f=i.mutations||[],g=e.animations.get(l),h=Math.max(0,(i.frameIndex??0)|0);let x,b;if(g?.length)if(x=g[h%g.length],f.length){const S=Qm(l,g,f,e,t,n);b=S[h%S.length];}else b=x;else {const S=e.textures.get(l);if(!S)throw new Error(`Unknown sprite/anim key: ${l}`);x=S,b=Cu(l,S,f,e,t,n);}let C;if(c==="mutations"){const S=new e.ctors.Sprite(b),_=i.anchorX??S.texture?.defaultAnchor?.x??.5,E=i.anchorY??S.texture?.defaultAnchor?.y??.5;S.anchor?.set?.(_,E),S.scale.set(i.scale??1);const v=new e.ctors.Container;v.addChild(S);try{v.updateTransform?.();}catch{}const w=S.getBounds?.(true)||{x:0,y:0,width:S.width,height:S.height};S.position.set(-w.x+d,-w.y+d),C=FC(e,v);try{v.destroy?.({children:!0});}catch{}}else {const S=i.scale??1;let _=th(i.boundsPadding);c==="padded"&&i.boundsPadding==null&&(_=BC(l,h,x,e,t,n)),d&&(_={top:_.top+d,right:_.right+d,bottom:_.bottom+d,left:_.left+d});const E=oh(x),v=rh(b,E.w,E.h),w=Math.max(1,Math.ceil((E.w+_.left+_.right)*S)),k=Math.max(1,Math.ceil((E.h+_.top+_.bottom)*S));C=document.createElement("canvas"),C.width=w,C.height=k;const y=C.getContext("2d");if(y){y.imageSmoothingEnabled=false;const T=fl(b,e.renderer,e.ctors,t,n),I=(_.left-v.baseX)*S,P=(_.top-v.baseY)*S;y.drawImage(T,I,P,T.width*S,T.height*S);}}return p&&a&&s?.enabled?(LC(a,s,p,C),tf(C)):C}function zC(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function GC(e,t){return e.defaultParent=t,true}function HC(e,t){return e.defaultParent=t,true}function co(){if(!Bm())throw new Error("MGSprite not ready yet")}function jC(e,t,n){return typeof t=="string"?nf(nt(),Ko(),di(),e,t,n||{}):nf(nt(),Ko(),di(),null,e,t||{})}function UC(e,t,n){return typeof t=="string"?Zc(nt(),Ko(),di(),e,t,n||{},ui(),Qc()):Zc(nt(),Ko(),di(),null,e,t||{},ui(),Qc())}function WC(){zC(nt());}function VC(e){return GC(nt(),e)}function qC(e){return HC(nt(),e)}function KC(e,t){const n=nt(),o=typeof t=="string"?pi(e,t,n.textures,n.animations):pi(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function XC(){co();const e=nt().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function YC(e){co();const t=String(e||"").trim();if(!t)return [];const n=nt().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function JC(e,t){co();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return  false;const r=nt().categoryIndex;if(!r)return  false;const i=n.toLowerCase(),a=o.toLowerCase();for(const[s,l]of r.entries())if(s.toLowerCase()===i){for(const c of l.values())if(c.toLowerCase()===a)return  true}return  false}function QC(e){co();const t=nt().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),o=[];for(const[r,i]of t.entries())for(const a of i.values()){const s=Di(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s);}return o.sort((r,i)=>r.localeCompare(i))}function ZC(e){co();const t=String(e||"").trim();if(!t)return null;const n=Fs(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;const r=o[1],i=o[2],a=nt().categoryIndex,s=r.toLowerCase(),l=i.toLowerCase();let c=r,d=i;if(a){const u=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;c=u;const p=a.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===l);if(!f)return null;d=f;}return {category:c,id:d,key:Di(c,d)}}function eS(e,t){co();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");const r=nt().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(d=>d.toLowerCase()===i)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);const c=Array.from(l.values()).find(d=>d.toLowerCase()===a)||o;if(!l.has(c))throw new Error(`Unknown sprite id: ${n}/${o}`);return Di(s,c)}function tS(){SC(Ko());}function nS(){MC(ui());}function oS(){return RC(ui())}function rS(){return [...jm]}async function iS(e,t,n=10,o=0){return co(),OC(e,nt(),Ko(),di(),ui(),Qc(),t,n,o)}const Y={init:tC,isReady:Bm,show:jC,toCanvas:UC,clear:WC,attach:VC,attachProvider:qC,has:KC,key:(e,t)=>Di(e,t),getCategories:XC,getCategoryId:YC,hasId:JC,listIds:QC,getIdInfo:ZC,getIdPath:eS,clearMutationCache:tS,clearToCanvasCache:nS,getToCanvasCacheStats:oS,getMutationNames:rS,warmup:iS};function aS(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function sS(e,t=[]){const n=new Set,o=r=>{const i=String(r||"").trim();i&&n.add(i);};o(e);for(const r of t)o(r);for(const r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function ih(e,t,n,o=[],r=[]){if(!Y)return console.warn("[MGData] MGSprite not available in pickSpriteId"),null;const i=sS(e,o);if(!i.length)return null;const a=[t,...r].filter(d=>typeof d=="string"),s=d=>{const u=String(d||"").trim();if(!u)return null;for(const p of i)try{if(Y.has(p,u))return Y.getIdPath(p,u)}catch{}return null};for(const d of a){const u=s(d);if(u)return u}const l=aS(n||""),c=s(l||n||"");if(c)return c;try{for(const d of i){const u=Y.listIds(`sprite/${d}/`),p=a.map(g=>String(g||"").toLowerCase()),f=String(n||l||"").toLowerCase();for(const g of u){const x=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&b===x)||x===f)return g}for(const g of u){const x=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&(x.includes(b)||b.includes(x)))||f&&(x.includes(f)||f.includes(x)))return g}}}catch{}return null}function ct(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),l=ih(s,n,o,r,i);if(l)try{e.spriteId=l;}catch{}const c=e.rotationVariants;if(c&&typeof c=="object")for(const d of Object.values(c))ct(d,s,n,o);if(e.immatureTileRef){const d={tileRef:e.immatureTileRef};ct(d,s,n,o),d.spriteId&&(e.immatureSpriteId=d.spriteId);}if(e.topmostLayerTileRef){const d={tileRef:e.topmostLayerTileRef};ct(d,s,n,o),d.spriteId&&(e.topmostLayerSpriteId=d.spriteId);}e.activeState&&typeof e.activeState=="object"&&ct(e.activeState,s,n,e.activeState?.name||o);}function lS(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;const r=t[0],i=t.slice(1);return ih(e,r,n??null,o,i)}function cS(e){for(const[t,n]of Object.entries(e.items||{}))ct(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))ct(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){ct(n,"mutations",t,n?.name,["mutation"]);const o=lS("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))ct(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))ct(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const o=n;o.seed&&ct(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&ct(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&ct(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function dS(){try{console.log("[MGData] Resolving sprites..."),cS(se.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const ah=5e3,sh=50;function lh(e){return new Promise(t=>setTimeout(t,e))}function uS(e){return se.data[e]}function pS(){return {...se.data}}function fS(e){return se.data[e]!=null}async function gS(e,t=ah,n=sh){const o=Date.now();for(;Date.now()-o<t;){const r=se.data[e];if(r!=null)return r;await lh(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function mS(e=ah,t=sh){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(se.data).some(o=>o!=null))return {...se.data};await lh(t);}throw new Error("MGData.waitForAnyData: timeout")}const ch=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function dh(e){return ch.includes(e)}function uh(e){return e.filter(t=>dh(t.action))}function rf(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${o}s`:`${o}s`}function tc(e){return e?.name||e?.petSpecies||"Unknown Pet"}function ph(e){const{action:t,parameters:n}=e,o=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${o.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${o.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const r=tc(o.targetPet),i=o.hungerRestoreAmount||0,s=o.pet?.id===o.targetPet?.id?"itself":r;return `Restored ${i} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${o.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${o.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const r=o.growSlot?.species||"Unknown",i=o.sellPrice||0;return `Ate ${r} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const r=tc(o.targetPet),i=o.strengthIncrease||0;return `Boosted ${r}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const r=tc(o.targetPet);return `Gave +${o.bonusXp||0} XP to ${r}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${o.eggId||"Unknown Egg"}`;case "ProduceRefund":{const r=o.cropsRefunded?.length||0;return `Refunded ${r} ${r===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${o.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const r=o.mutation||"Unknown";return `Made ${o.growSlot?.species||"Unknown"} turn ${r}`}case "PetXpBoost":case "PetXpBoostII":{const r=o.bonusXp||0,i=o.petsAffected?.length||0;return `Gave +${r} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const r=o.secondsReduced||0,i=o.eggsAffected?.length||0,a=rf(r);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const r=o.secondsReduced||0,i=o.numPlantsAffected||0,a=rf(r);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const r=o.scaleIncreasePercentage||0,i=o.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${r.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const J={async init(){Om(),dw(),xw(),Ew();},isReady:Ds,get:uS,getAll:pS,has:fS,waitFor:gS,waitForAny:mS,resolveSprites:dS,cleanup(){$m(),Dm(),yw(),Tw();}},hS=new Map;function bS(){return hS}function ed(){return V.jotaiAtomCache?.cache}function Cn(e){const t=bS(),n=t.get(e);if(n)return n;const o=ed();if(!o)return null;for(const r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function xS(){const e=V;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:o=>{const r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{const i=n.get(o);i&&i.add(r);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:false};}const yS={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function ir(){return yS}const vS="__JOTAI_STORE_READY__";let af=false;const td=new Set;function ha(){if(!af){af=true;for(const e of td)try{e();}catch{}try{const e=V.CustomEvent||CustomEvent;V.dispatchEvent?.(new e(vS));}catch{}}}function wS(e){td.add(e);const t=od();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{td.delete(e);}}async function gl(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,o=od();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=false;const s=wS(()=>{a||(a=true,s(),r());}),l=Date.now();(async()=>{for(;!a&&Date.now()-l<t;){const d=od();if(d.via&&!d.polyfill){if(a)return;a=true,s(),r();return}await fi(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const fi=e=>new Promise(t=>setTimeout(t,e));function fh(){try{const e=V.Event||Event;V.dispatchEvent?.(new e("visibilitychange"));}catch{}}function nd(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function nc(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(nd(e))return e;const o=["store","value","current","state","s","baseStore"];for(const r of o)try{const i=e[r];if(nd(i))return i}catch{}return null}function gh(){const e=ir(),t=V.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);r&&(n+=r.size||0);}if(n===0)return null;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);if(r)for(const i of r){const a=new Set,s=[i.current];for(;s.length;){const l=s.pop();if(!(!l||a.has(l))){a.add(l);try{const c=l?.pendingProps?.value;if(nd(c))return e.lastCapturedVia="fiber",c}catch{}try{let c=l?.memoizedState,d=0;for(;c&&d<15;){d++;const u=nc(c);if(u)return e.lastCapturedVia="fiber",u;const p=nc(c.memoizedState);if(p)return e.lastCapturedVia="fiber",p;c=c.next;}}catch{}try{if(l?.stateNode){const c=nc(l.stateNode);if(c)return e.lastCapturedVia="fiber",c}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate);}}}}return null}function mh(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function CS(e=5e3){const t=Date.now();let n=ed();for(;!n&&Date.now()-t<e;)await fi(100),n=ed();if(!n)throw new Error("jotaiAtomCache.cache not found");const o=ir();let r=null,i=null;const a=[],s=()=>{for(const c of a)try{c.__origWrite&&(c.write=c.__origWrite,delete c.__origWrite);}catch{}};for(const c of n.values()){if(!c||typeof c.write!="function"||c.__origWrite)continue;const d=c.write;c.__origWrite=d,c.write=function(u,p,...f){return i||(r=u,i=p,s()),d.call(this,u,p,...f)},a.push(c);}fh();const l=Date.now();for(;!i&&Date.now()-l<e;)await fi(50);return i?(o.lastCapturedVia="write",{get:c=>r(c),set:(c,d)=>i(c,d),sub:(c,d)=>{let u;try{u=r(c);}catch{}const p=setInterval(()=>{let f;try{f=r(c);}catch{return}if(f!==u){u=f;try{d();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",mh())}async function SS(e=1e4){const t=ir();fh();const n=Date.now();for(;Date.now()-n<e;){const o=gh();if(o)return o;await fi(50);}return t.lastCapturedVia="polyfill",mh()}async function Su(){const e=ir();if(e.baseStore&&!e.baseStore.__polyfill)return ha(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await fi(25);if(e.baseStore)return e.baseStore.__polyfill||ha(),e.baseStore}e.captureInProgress=true;try{const t=gh();if(t)return e.baseStore=t,ha(),t;try{const o=await CS(5e3);return e.baseStore=o,o.__polyfill||ha(),o}catch(o){e.captureError=o;}const n=await SS();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function od(){const e=ir();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function kS(){const e=await Su(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0;}catch{}const a=e.sub(r,()=>{let s;try{s=e.get(r);}catch{return}const l=i.last,c=!Object.is(s,l)||!i.has;if(i.last=s,i.has=true,c)for(const d of i.subs)try{d(s,l);}catch{}});return i.unsubUpstream=a,i};return {async get(r){const i=await n(r);if(i.has)return i.last;const a=e.get(r);return i.last=a,i.has=true,a},async set(r,i){await e.set(r,i);const a=await n(r);a.last=i,a.has=true;},async sub(r,i){const a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(r){return t.get(r)?.last},hasShadow(r){return !!t.get(r)?.has},async ensureWatch(r){await n(r);},async asStore(){return {get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function es(){const e=ir();return e.mirror||(e.mirror=await kS()),e.mirror}const xe={async select(e){const t=await es(),n=Cn(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await es(),o=Cn(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t);},async subscribe(e,t){const n=await es(),o=Cn(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r);}catch{}})},async subscribeImmediate(e,t){const n=await xe.select(e);try{t(n);}catch{}return xe.subscribe(e,t)}};async function hh(){await es();}const Fi=Object.freeze(Object.defineProperty({__proto__:null,Store:xe,prewarm:hh,waitForStore:gl},Symbol.toStringTag,{value:"Module"}));function ku(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function gi(e,t){const n=ku(t);let o=e;for(const r of n){if(o==null)return;o=o[r];}return o}function _S(e,t,n){const o=ku(t);if(!o.length)return n;const r=Array.isArray(e)?[...e]:{...e??{}};let i=r;for(let a=0;a<o.length-1;a++){const s=o[a],l=i[s],c=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};i[s]=c,i=c;}return i[o[o.length-1]]=n,r}function sf(e,t){const n={};for(const o of t)n[o]=o.includes(".")?gi(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function ES(e,t,n){const o=n.mode??"auto";function r(c){const d=t?gi(c,t):c,u=new Map;if(d==null)return {signatures:u,keys:[]};const p=Array.isArray(d);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<d.length;g++){const h=d[g],x=n.key?n.key(h,g,c):g,b=n.sig?n.sig(h,g,c):n.fields?sf(h,n.fields):JSON.stringify(h);u.set(x,b);}else for(const[g,h]of Object.entries(d)){const x=n.key?n.key(h,g,c):g,b=n.sig?n.sig(h,g,c):n.fields?sf(h,n.fields):JSON.stringify(h);u.set(x,b);}return {signatures:u,keys:Array.from(u.keys())}}function i(c,d){if(c===d)return  true;if(!c||!d||c.size!==d.size)return  false;for(const[u,p]of c)if(d.get(u)!==p)return  false;return  true}async function a(c){let d=null;return xe.subscribeImmediate(e,u=>{const p=t?gi(u,t):u,{signatures:f}=r(p);if(!i(d,f)){const g=new Set([...d?Array.from(d.keys()):[],...Array.from(f.keys())]),h=[];for(const x of g){const b=d?.get(x)??"__NONE__",C=f.get(x)??"__NONE__";b!==C&&h.push(x);}d=f,c({value:p,changedKeys:h});}})}async function s(c,d){return a(({value:u,changedKeys:p})=>{p.includes(c)&&d({value:u});})}async function l(c,d){const u=new Set(c);return a(({value:p,changedKeys:f})=>{const g=f.filter(h=>u.has(h));g.length&&d({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:l}}const Eo=new Map;function TS(e,t){const n=Eo.get(e);if(n)try{n();}catch{}return Eo.set(e,t),()=>{try{t();}catch{}Eo.get(e)===t&&Eo.delete(e);}}function Se(e,t={}){const{path:n,write:o="replace"}=t,r=n?`${e}:${ku(n).join(".")}`:e;async function i(){const u=await xe.select(e);return n?gi(u,n):u}async function a(u){if(typeof o=="function"){const g=await xe.select(e),h=o(u,g);return xe.set(e,h)}const p=await xe.select(e),f=n?_S(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?xe.set(e,{...p,...u}):xe.set(e,f)}async function s(u){const p=await i(),f=u(p);return await a(f),f}async function l(u,p,f){let g;const h=b=>{const C=n?gi(b,n):b;if(typeof g>"u"||!f(g,C)){const S=g;g=C,p(C,S);}},x=u?await xe.subscribeImmediate(e,h):await xe.subscribe(e,h);return TS(r,x)}function c(){const u=Eo.get(r);if(u){try{u();}catch{}Eo.delete(r);}}function d(u){return ES(e,u?.path??n,u)}return {label:r,get:i,set:a,update:s,onChange:(u,p=Object.is)=>l(false,u,p),onChangeNow:(u,p=Object.is)=>l(true,u,p),asSignature:d,stopOnChange:c}}function D(e){return Se(e)}D("positionAtom");D("lastPositionInMyGardenAtom");D("playerDirectionAtom");D("stateAtom");D("quinoaDataAtom");D("currentTimeAtom");D("actionAtom");D("isPressAndHoldActionAtom");D("mapAtom");D("tileSizeAtom");Se("mapAtom",{path:"cols"});Se("mapAtom",{path:"rows"});Se("mapAtom",{path:"spawnTiles"});Se("mapAtom",{path:"locations.seedShop.spawnTileIdx"});Se("mapAtom",{path:"locations.eggShop.spawnTileIdx"});Se("mapAtom",{path:"locations.toolShop.spawnTileIdx"});Se("mapAtom",{path:"locations.decorShop.spawnTileIdx"});Se("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});Se("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});Se("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});Se("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});Se("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});D("playerAtom");D("myDataAtom");D("myUserSlotIdxAtom");D("isSpectatingAtom");D("myCoinsCountAtom");D("numPlayersAtom");Se("playerAtom",{path:"id"});Se("myDataAtom",{path:"activityLogs"});D("userSlotsAtom");D("filteredUserSlotsAtom");D("myUserSlotAtom");D("spectatorsAtom");Se("stateAtom",{path:"child"});Se("stateAtom",{path:"child.data"});Se("stateAtom",{path:"child.data.shops"});const AS=Se("stateAtom",{path:"child.data.userSlots"}),IS=Se("stateAtom",{path:"data.players"}),PS=Se("stateAtom",{path:"data.hostPlayerId"});D("myInventoryAtom");D("myInventoryItemsAtom");D("isMyInventoryAtMaxLengthAtom");D("myFavoritedItemIdsAtom");D("myCropInventoryAtom");D("mySeedInventoryAtom");D("myToolInventoryAtom");D("myEggInventoryAtom");D("myDecorInventoryAtom");D("myPetInventoryAtom");Se("myInventoryAtom",{path:"favoritedItemIds"});D("itemTypeFiltersAtom");D("myItemStoragesAtom");D("myPetHutchStoragesAtom");D("myPetHutchItemsAtom");D("myPetHutchPetItemsAtom");D("myNumPetHutchItemsAtom");D("myValidatedSelectedItemIndexAtom");D("isSelectedItemAtomSuspended");D("mySelectedItemAtom");D("mySelectedItemNameAtom");D("mySelectedItemRotationsAtom");D("mySelectedItemRotationAtom");D("setSelectedIndexToEndAtom");D("myPossiblyNoLongerValidSelectedItemIndexAtom");D("myCurrentGlobalTileIndexAtom");D("myCurrentGardenTileAtom");D("myCurrentGardenObjectAtom");D("myOwnCurrentGardenObjectAtom");D("myOwnCurrentDirtTileIndexAtom");D("myCurrentGardenObjectNameAtom");D("isInMyGardenAtom");D("myGardenBoardwalkTileObjectsAtom");const LS=Se("myDataAtom",{path:"garden"});Se("myDataAtom",{path:"garden.tileObjects"});Se("myOwnCurrentGardenObjectAtom",{path:"objectType"});D("myCurrentStablePlantObjectInfoAtom");D("myCurrentSortedGrowSlotIndicesAtom");D("myCurrentGrowSlotIndexAtom");D("myCurrentGrowSlotsAtom");D("myCurrentGrowSlotAtom");D("secondsUntilCurrentGrowSlotMaturesAtom");D("isCurrentGrowSlotMatureAtom");D("numGrowSlotsAtom");D("myCurrentEggAtom");D("petInfosAtom");D("myPetInfosAtom");D("myPetSlotInfosAtom");D("myPrimitivePetSlotsAtom");D("myNonPrimitivePetSlotsAtom");D("expandedPetSlotIdAtom");D("myPetsProgressAtom");D("myActiveCropMutationPetsAtom");D("totalPetSellPriceAtom");D("selectedPetHasNewVariantsAtom");const MS=D("shopsAtom"),RS=D("myShopPurchasesAtom");D("seedShopAtom");D("seedShopInventoryAtom");D("seedShopRestockSecondsAtom");D("seedShopCustomRestockInventoryAtom");D("eggShopAtom");D("eggShopInventoryAtom");D("eggShopRestockSecondsAtom");D("eggShopCustomRestockInventoryAtom");D("toolShopAtom");D("toolShopInventoryAtom");D("toolShopRestockSecondsAtom");D("toolShopCustomRestockInventoryAtom");D("decorShopAtom");D("decorShopInventoryAtom");D("decorShopRestockSecondsAtom");D("decorShopCustomRestockInventoryAtom");D("isDecorShopAboutToRestockAtom");Se("shopsAtom",{path:"seed"});Se("shopsAtom",{path:"tool"});Se("shopsAtom",{path:"egg"});Se("shopsAtom",{path:"decor"});D("myCropItemsAtom");D("myCropItemsToSellAtom");D("totalCropSellPriceAtom");D("friendBonusMultiplierAtom");D("myJournalAtom");D("myCropJournalAtom");D("myPetJournalAtom");D("myStatsAtom");D("myActivityLogsAtom");D("newLogsAtom");D("hasNewLogsAtom");D("newCropLogsFromSellingAtom");D("hasNewCropLogsFromSellingAtom");D("myCompletedTasksAtom");D("myActiveTasksAtom");D("isWelcomeToastVisibleAtom");D("shouldCloseWelcomeToastAtom");D("isInitialMoveToDirtPatchToastVisibleAtom");D("isFirstPlantSeedActiveAtom");D("isThirdSeedPlantActiveAtom");D("isThirdSeedPlantCompletedAtom");D("isDemoTouchpadVisibleAtom");D("areShopAnnouncersEnabledAtom");D("arePresentablesEnabledAtom");D("isEmptyDirtTileHighlightedAtom");D("isPlantTileHighlightedAtom");D("isItemHiglightedInHotbarAtom");D("isItemHighlightedInModalAtom");D("isMyGardenButtonHighlightedAtom");D("isSellButtonHighlightedAtom");D("isShopButtonHighlightedAtom");D("isInstaGrowButtonHiddenAtom");D("isActionButtonHighlightedAtom");D("isGardenItemInfoCardHiddenAtom");D("isSeedPurchaseButtonHighlightedAtom");D("isFirstSeedPurchaseActiveAtom");D("isFirstCropHarvestActiveAtom");D("isWeatherStatusHighlightedAtom");D("weatherAtom");const ml=D("activeModalAtom");D("hotkeyBeingPressedAtom");D("avatarTriggerAnimationAtom");D("avatarDataAtom");D("emoteDataAtom");D("otherUserSlotsAtom");D("otherPlayerPositionsAtom");D("otherPlayerSelectedItemsAtom");D("otherPlayerLastActionsAtom");D("traderBunnyPlayerId");D("npcPlayersAtom");D("npcQuinoaUsersAtom");D("numNpcAvatarsAtom");D("traderBunnyEmoteTimeoutAtom");D("traderBunnyEmoteAtom");D("unsortedLeaderboardAtom");D("currentGardenNameAtom");D("quinoaEngineAtom");D("quinoaInitializationErrorAtom");D("avgPingAtom");D("serverClientTimeOffsetAtom");D("isEstablishingShotRunningAtom");D("isEstablishingShotCompleteAtom");const be={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function hl(){return be}function NS(){return be.initialized}function uo(){return be.isCustom&&be.activeModal!==null}function oo(){return be.activeModal}function bh(e){return !be.shadow||be.shadow.modal!==e?null:be.shadow.data}function OS(e){be.initialized=e;}function _u(e){be.activeModal=e;}function Eu(e){be.isCustom=e;}function xh(e,t){be.shadow={modal:e,data:t,timestamp:Date.now()};}function yh(){be.shadow=null;}function lf(e,t){be.patchedAtoms.add(e),be.originalReads.set(e,t);}function $S(e){return be.originalReads.get(e)}function rd(e){return be.patchedAtoms.has(e)}function DS(e){be.patchedAtoms.delete(e),be.originalReads.delete(e);}function FS(e){be.unsubscribes.push(e);}function BS(){for(const e of be.unsubscribes)try{e();}catch{}be.unsubscribes.length=0;}function zS(e){return be.listeners.onOpen.add(e),()=>be.listeners.onOpen.delete(e)}function vh(e){return be.listeners.onClose.add(e),()=>be.listeners.onClose.delete(e)}function wh(e){for(const t of Array.from(be.listeners.onOpen))try{t(e);}catch{}}function Tu(e){for(const t of Array.from(be.listeners.onClose))try{t(e);}catch{}}function GS(){BS(),be.initialized=false,be.activeModal=null,be.isCustom=false,be.shadow=null,be.patchedAtoms.clear(),be.originalReads.clear(),be.listeners.onOpen.clear(),be.listeners.onClose.clear();}const Au={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Ch(e){return Au[e]}function HS(e){const t=Au[e],n=[];for(const o of t.atoms)n.push(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)n.push(o.atomLabel);return n}const jS=new Set(["inventory","journal","stats","activityLog","petHutch"]),US=new Set(["seedShop","eggShop","toolShop","decorShop"]),WS=new Set(["leaderboard"]);function VS(e,t,n,o){return function(i){const a=uo(),s=oo();if(a&&s===o){const l=bh(o);if(l!==null){let c;if(n.dataKey==="_full"?c=l:c=l[n.dataKey],c!==void 0)return t(i),n.transform?n.transform(c):c}}return t(i)}}function qS(e,t,n,o,r){return function(a){if(uo()&&oo()===r){const s=bh(r);if(s!==null){const l=s[n];if(l!==void 0)return t(a),o(l)}}return t(a)}}function KS(e){const t=Ch(e);for(const n of t.atoms){const o=Cn(n.atomLabel);if(!o||rd(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=VS(n.atomLabel,r,n,e);o.read=i,lf(n.atomLabel,r);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const o=Cn(n.atomLabel);if(!o||rd(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=qS(n.atomLabel,r,n.sourceKey,n.deriveFn,e);o.read=i,lf(n.atomLabel,r);}}async function bl(e){const t=Ch(e);for(const o of t.atoms)cf(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)cf(o.atomLabel);const n=await Su();await Sh(n,e);}async function XS(e){const t=await Su();await Sh(t,e);const n=HS(e);for(const o of n){const r=Cn(o);if(r)try{t.get(r);}catch{}}}function cf(e){if(!rd(e))return;const t=Cn(e),n=$S(e);t&&n&&(t.read=n),DS(e);}async function Sh(e,t){const n=jS.has(t),o=US.has(t),r=WS.has(t);if(!n&&!o&&!r)return;const i=Cn("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||o){const l=a.child,c=l?.data;if(l&&c&&typeof c=="object"){let d=null;if(n&&Array.isArray(c.userSlots)){const u=c.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,h=g&&typeof g=="object"?{...g}:g;return {...f,data:h}});d={...d??c,userSlots:u};}if(o&&c.shops&&typeof c.shops=="object"&&(d={...d??c,shops:{...c.shops}}),d){const u={...l,data:d};s={...a,child:u};}}}if(r){const l=a.data;if(l&&Array.isArray(l.players)){const c={...l,players:[...l.players]};s={...s??a,data:c};}}if(!s)return;await e.set(i,s);}catch{}}async function YS(){for(const e of Object.keys(Au))await bl(e);}let ba=null,Kr=null;async function JS(){if(hl().initialized)return;Kr=await xe.select("activeModalAtom"),ba=setInterval(async()=>{try{const n=await xe.select("activeModalAtom"),o=Kr;o!==n&&(Kr=n,QS(n,o));}catch{}},50),FS(()=>{ba&&(clearInterval(ba),ba=null);}),OS(true);}function QS(e,t){const n=uo(),o=oo();e===null&&t!==null&&(n&&o===t?ZS("native"):n||Tu({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&wh({modal:e,isCustom:false});}async function ZS(e){const t=oo();t&&(yh(),Eu(false),_u(null),await bl(t),Tu({modal:t,wasCustom:true,closedBy:e}));}async function ek(e,t){if(!hl().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");uo()&&await kh(),xh(e,t),Eu(true),_u(e),KS(e),await XS(e),await ml.set(e),Kr=e,wh({modal:e,isCustom:true});}function tk(e,t){const n=hl();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const r={...n.shadow.data,...t};xh(e,r);}async function kh(){const e=hl();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;yh(),Eu(false),_u(null),await ml.set(null),Kr=null,await bl(t),Tu({modal:t,wasCustom:true,closedBy:"api"});}function nk(){return new Promise(e=>{if(!uo()){e();return}const t=vh(()=>{t(),e();});})}async function ok(){if(uo()){const e=oo();e&&await bl(e);}await YS(),GS();}const Mo={async init(){return JS()},isReady(){return NS()},async show(e,t){return ek(e,t)},update(e,t){return tk(e,t)},async close(){return kh()},isOpen(){return oo()!==null},isCustomOpen(){return uo()},getActiveModal(){return oo()},waitForClose(){return nk()},onOpen(e){return zS(e)},onClose(e){return vh(e)},async destroy(){return ok()}};function rk(){return {ready:false,xform:null,xformAt:0}}const gt=rk();function _h(){return gt.ready}function ar(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Bi(){return ft.tos()}function Iu(){return ft.engine()}function ik(){const e=Bi()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Pu(e,t){const n=ik();return n?t*n+e|0:null}let xa=null;async function ak(e=15e3){return gt.ready?true:xa||(xa=(async()=>{if(await ft.init(e),!Bi())throw new Error("MGTile: engine captured but tileObject system not found");return gt.ready=true,true})(),xa)}function Qn(e,t,n=true){const o=Bi(),r=Pu(e,t);if(!o||r==null)return {gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r);}catch{}return {gidx:r,tv:i||null}}function oc(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Lu(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Ro(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Iu(),{gidx:s,tv:l}=Qn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");const c=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function xl(e,t,n={}){const o=n.ensureView!==false,r=n.clone!==false,{gidx:i,tv:a}=Qn(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?ar(s):s}}function sk(e,t,n={}){return Ro(e,t,null,n)}function lk(e,t,n,o={}){const i=xl(e,t,{...o,clone:false}).tileView?.tileObject;Lu(i,"plant");const a=ar(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return oc(a.slots[s],n.slotPatch),Ro(e,t,a,o)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);oc(a.slots[l],s[l]);}}else if(s&&typeof s=="object")for(const l of Object.keys(s)){const c=Number(l)|0;if(Number.isFinite(c)){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);oc(a.slots[c],s[c]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Ro(e,t,a,o)}return Ro(e,t,a,o)}function ck(e,t,n,o={}){const i=xl(e,t,{...o,clone:false}).tileView?.tileObject;Lu(i,"decor");const a=ar(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),Ro(e,t,a,o)}function dk(e,t,n,o={}){const i=xl(e,t,{...o,clone:false}).tileView?.tileObject;Lu(i,"egg");const a=ar(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Ro(e,t,a,o)}function uk(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Iu(),{gidx:s,tv:l}=Qn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");const c=l.tileObject,d=typeof n=="function"?n(ar(c)):n;if(l.onDataChanged(d),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function pk(e,t,n={}){const o=n.ensureView!==false,{gidx:r,tv:i}=Qn(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?ar(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function rc(e){if(!e)return null;const t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const r of n)if(t(e[r]))return e[r];if(t(e))return e;const o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const r of o)if(t(r))return r;try{for(const r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function ts(e){const t=kt(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=kt(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function fk(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=ts(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function gk(){const e=Bi(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(const[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;const s=Qn(i,a,true).tv,l=i+1<t?Qn(i+1,a,true).tv:null,c=Qn(i,a+1,true).tv,d=rc(s),u=rc(l),p=rc(c);if(!d||!u||!p)continue;const f=ts(d),g=ts(u),h=ts(p);if(!f||!g||!h)continue;const x={x:g.x-f.x,y:g.y-f.y},b={x:h.x-f.x,y:h.y-f.y},C=x.x*b.y-x.y*b.x;if(!Number.isFinite(C)||Math.abs(C)<1e-6)continue;const S=1/C,_={a:b.y*S,b:-b.x*S,c:-x.y*S,d:x.x*S},E={x:f.x-i*x.x-a*b.x,y:f.y-i*x.y-a*b.y},v=fk(d),w=v==="center"?E:{x:E.x+.5*(x.x+b.x),y:E.y+.5*(x.y+b.y)};return {ok:true,cols:t,rows:o,vx:x,vy:b,inv:_,anchorMode:v,originCenter:w}}return null}function Eh(){return gt.xform=gk(),gt.xformAt=Date.now(),{ok:!!gt.xform?.ok,xform:gt.xform}}function mk(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!gt.xform?.ok||t.forceRebuild||Date.now()-gt.xformAt>n)&&Eh();const o=gt.xform;if(!o?.ok)return null;const r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,l=Math.floor(a),c=Math.floor(s),d=[[l,c],[l+1,c],[l,c+1],[l+1,c+1]];let u=null,p=1/0;for(const[f,g]of d){if(f<0||g<0||f>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;const h=o.originCenter.x+f*o.vx.x+g*o.vy.x,x=o.originCenter.y+f*o.vx.y+g*o.vy.y,b=(e.x-h)**2+(e.y-x)**2;b<p&&(p=b,u={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=Pu(u.tx,u.ty),u):null}function hk(e,t){const n=gt.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function yt(){if(!_h())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function bk(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const tn={init:ak,isReady:_h,hook:ft.hook,engine:Iu,tos:Bi,gidx:(e,t)=>Pu(Number(e),Number(t)),getTileObject:(e,t,n={})=>(yt(),xl(e,t,n)),inspect:(e,t,n={})=>(yt(),pk(e,t,n)),setTileEmpty:(e,t,n={})=>(yt(),sk(e,t,n)),setTilePlant:(e,t,n,o={})=>(yt(),lk(e,t,n,o)),setTileDecor:(e,t,n,o={})=>(yt(),ck(e,t,n,o)),setTileEgg:(e,t,n,o={})=>(yt(),dk(e,t,n,o)),setTileObjectRaw:(e,t,n,o={})=>(yt(),uk(e,t,n,o)),rebuildTransform:()=>(yt(),Eh()),pointToTile:(e,t={})=>(yt(),mk(e,t)),tileToPoint:(e,t)=>(yt(),hk(e,t)),getTransform:()=>(yt(),gt.xform),help:bk};function xk(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const ie=xk();function Th(){return ie.ready}async function yk(e=15e3){if(ie.ready)return id(),true;if(await ft.init(e),ie.app=ft.app(),ie.ticker=ft.ticker(),ie.renderer=ft.renderer(),ie.stage=ft.stage(),!ie.app||!ie.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return ie.ready=true,id(),true}function id(){const e=V;return e.$PIXI=e.PIXI||null,e.$app=ie.app||null,e.$renderer=ie.renderer||null,e.$stage=ie.stage||null,e.$ticker=ie.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:ie.ready},e.__MG_PIXI__}function Mu(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function ad(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function zs(e){return !!(e&&typeof e.tint=="number")}function ro(e){return !!(e&&typeof e.alpha=="number")}function ns(e,t,n){return e+(t-e)*n}function vk(e,t,n){const o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,l=t&255,c=ns(o,a,n)|0,d=ns(r,s,n)|0,u=ns(i,l,n)|0;return c<<16|d<<8|u}function wk(e,t=900){const n=[],o=[e];for(;o.length&&n.length<t;){const r=o.pop();if(!r)continue;zs(r)&&n.push(r);const i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a]);}return n}function Ck(e,t=25e3){const n=[],o=[e];let r=0;for(;o.length&&r++<t;){const i=o.pop();if(!i)continue;ro(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s]);}return n}const Sk=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function sd(e){if(!e)return null;if(ad(e))return e;if(!Mu(e))return null;for(const t of Sk){const n=e[t];if(ad(n))return n}return null}function kk(e,t){const n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let l=true;for(let c=0;c<t;c++){const d=sd(i[c]);if(!d){l=false;break}s[c]=d;}if(l)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Mu(i)){const s=i;for(const l of Object.keys(s))n.push({o:s[l],d:a+1});}}}return null}function Ah(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(Mu(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;const a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}));}return n}function _k(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const o=Ah(t);return ie.tileSets.set(n,o),{ok:true,name:n,count:o.length}}function Ek(e){return ie.tileSets.delete(String(e||"").trim())}function Tk(){return Array.from(ie.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Ih(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ru(e){const n=tn.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Ih(e))return {entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=ie.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a;}else o=Ah(e.tiles||[]);const r=new Map;for(const i of o){const a=tn.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView);}return {entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function Nu(e){const t=ie.highlights.get(e);if(!t)return  false;kt(()=>ie.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&ro(t.root)&&kt(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&zs(n.o)&&kt(()=>{n.o.tint=n.baseTint;});return ie.highlights.delete(e),true}function Ph(e=null){for(const t of Array.from(ie.highlights.keys()))e&&!String(t).startsWith(e)||Nu(t);return  true}function Lh(e,t={}){if(!ad(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(ie.highlights.has(n))return n;const o=ro(e)?Number(e.alpha):null,r=$t(Number(t.minAlpha??.12),0,1),i=$t(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=$t(Number(t.tintMix??.85),0,1),c=t.deepTint!==false,d=[];if(c)for(const f of wk(e))d.push({o:f,baseTint:f.tint});else zs(e)&&d.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,h=g*g*(3-2*g);o!=null&&ro(e)&&(e.alpha=$t(ns(r,i,h)*o,0,1));const x=h*l;for(const b of d)b.o&&zs(b.o)&&(b.o.tint=vk(b.baseTint,s,x));};return ie.ticker?.add(p),ie.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:d}),n}function Ak(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const o of n)if(String(o||"").toLowerCase()===t)return  true;return  false}function Mh(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:o,gidxSet:r}=Ru(t),i=`hlmut:${n}:`;if(t.clear===true)if(!r)Ph(i);else for(const u of Array.from(ie.highlights.keys())){if(!u.startsWith(i))continue;const p=u.split(":"),f=Number(p[2]);r.has(f)&&Nu(u);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,l=0,c=0,d=0;for(const[u,p]of o){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let h=false;const x=[];for(let S=0;S<g.length;S++)Ak(g[S],n)&&(x.push(S),h=true);if(!h)continue;s++,l+=x.length;const b=p?.childView?.plantVisual||p?.childView||p,C=kk(b,g.length);if(!C){d+=x.length;continue}for(const S of x){const _=C[S];if(!_){d++;continue}const E=`${i}${u}:${S}`;ie.highlights.has(E)||(Lh(_,{key:E,...a}),c++);}}return {ok:true,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:c,failedSlots:d}}function Ik(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=ie.watches.get(o);i&&clearInterval(i);const a=setInterval(()=>{kt(()=>Mh(n,{...t,clear:!1}));},r);return ie.watches.set(o,a),{ok:true,key:o,mutation:n,intervalMs:r}}function Pk(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(ie.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),ie.watches.delete(i),r++);return r>0}const n=ie.watches.get(t);return n?(clearInterval(n),ie.watches.delete(t),true):false}function Lk(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return sd(t)||sd(e?.displayObject)||null}function Rh(e){const t=ie.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&ro(n.o)&&Number.isFinite(n.baseAlpha)&&kt(()=>{n.o.alpha=n.baseAlpha;});return ie.fades.delete(e),true}function ld(e=null){for(const t of Array.from(ie.fades.keys()))e&&!String(t).startsWith(e)||Rh(t);return  true}function Nh(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const o=`fade:${n}:`;if(!Ih(t))return ld(o);const{gidxSet:r}=Ru(t);if(!r)return ld(o);for(const i of Array.from(ie.fades.keys())){if(!i.startsWith(o))continue;const a=Number(i.slice(o.length));r.has(a)&&Rh(i);}return  true}function Oh(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const o=$t(Number(t.alpha??.2),0,1),r=t.deep===true,{entries:i,gidxSet:a}=Ru(t),s=`fade:${n}:`;t.clear===true&&Nh(n,t);let l=0,c=0,d=0,u=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;l++;const h=String(g.species||"").trim().toLowerCase();if(!h||h!==n)continue;c++;const x=Lk(f);if(!x||!ro(x)){u++;continue}const b=`${s}${p}`;if(ie.fades.has(b)){kt(()=>{x.alpha=o;}),d++;continue}const C=r?Ck(x):[x],S=[];for(const _ of C)ro(_)&&S.push({o:_,baseAlpha:Number(_.alpha)});for(const _ of S)kt(()=>{_.o.alpha=o;});ie.fades.set(b,{targets:S}),d++;}return {ok:true,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:l,matchedPlants:c,applied:d,failed:u,totalFades:ie.fades.size}}function Mk(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=ie.fadeWatches.get(o);i&&clearInterval(i);const a=setInterval(()=>{kt(()=>Oh(n,{...t,clear:!1}));},r);return ie.fadeWatches.set(o,a),{ok:true,key:o,species:n,intervalMs:r}}function Rk(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(ie.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),ie.fadeWatches.delete(i),r++);return r>0}const n=ie.fadeWatches.get(t);return n?(clearInterval(n),ie.fadeWatches.delete(t),true):false}function Nk(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Ok(e,t,n={}){const o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==false,a=tn.getTileObject(o,r,{ensureView:i,clone:false}),s=a?.tileView||null,l=s?.tileObject,c={ok:true,tx:o,ty:r,gidx:a?.gidx??tn.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?Nk(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&kt(()=>console.log("[MGPixi.inspectTile]",c)),c}function $k(e,t,n){const o=V.PIXI;if(!o)return;let r=ie.stage.getChildByName("gemini-overlay");r||(r=new o.Container,r.name="gemini-overlay",ie.stage.addChild(r));const i=n.key;let a=r.getChildByName(i);a||(a=new o.Graphics,a.name=i,r.addChild(a));const s=tn.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const l=tn.getTransform(),c=l?Math.hypot(l.vx.x,l.vx.y):32,d=l?Math.hypot(l.vy.x,l.vy.y):32;a.drawRect(0,0,c,d),a.endFill(),a.x=s.x,a.y=s.y,l&&(a.rotation=Math.atan2(l.vx.y,l.vx.x));}function Dk(e){const t=ie.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Ue(){if(!Th())throw new Error("MGPixi: call MGPixi.init() first")}const yl={init:yk,isReady:Th,expose:id,get app(){return ie.app},get renderer(){return ie.renderer},get stage(){return ie.stage},get ticker(){return ie.ticker},get PIXI(){return V.PIXI||null},defineTileSet:(e,t)=>(Ue(),_k(e,t)),deleteTileSet:e=>(Ue(),Ek(e)),listTileSets:()=>(Ue(),Tk()),highlightPulse:(e,t)=>(Ue(),Lh(e,t)),stopHighlight:e=>(Ue(),Nu(e)),clearHighlights:e=>(Ue(),Ph(e)),drawOverlayBox:(e,t,n)=>(Ue(),$k(e,t,n)),stopOverlay:e=>(Ue(),Dk(e)),highlightMutation:(e,t)=>(Ue(),Mh(e,t)),watchMutation:(e,t)=>(Ue(),Ik(e,t)),stopWatchMutation:e=>(Ue(),Pk(e)),inspectTile:(e,t,n)=>(Ue(),Ok(e,t,n)),fadeSpecies:(e,t)=>(Ue(),Oh(e,t)),clearSpeciesFade:(e,t)=>(Ue(),Nh(e,t)),clearFades:e=>(Ue(),ld(e)),watchFadeSpecies:(e,t)=>(Ue(),Mk(e,t)),stopWatchFadeSpecies:e=>(Ue(),Rk(e))};function Fk(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const ce=Fk();function $h(){return ce.ready}const df=V??window;async function Dh(){const e=ce.ctx;if(e)return e;const t=df.AudioContext||df.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return ce.ctx=n,n}async function Fh(){if(ce.ctx&&ce.ctx.state==="suspended")try{await ce.ctx.resume();}catch{}}const Bk={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},zk={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Xr=.001,Yr=.2;function uf(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n);}catch{o=n;}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){const r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function mi(e){const t=Bk[e],n=zk[e];if(!t)return {atom:Yr,vol100:ya(Yr)};const o=uf(t,NaN);if(Number.isFinite(o)){const i=$t(o,0,1);return {atom:i,vol100:ya(i)}}if(n){const i=uf(n,NaN);if(Number.isFinite(i)){const a=$t(i,0,1);return {atom:a,vol100:ya(a)}}}const r=Yr;return {atom:r,vol100:ya(r)}}function Gk(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const o=($t(t,1,100)-1)/99;return Xr+o*(Yr-Xr)}function ya(e){const t=$t(Number(e),0,1);if(t<=Xr)return 0;const n=(t-Xr)/(Yr-Xr);return Math.round(1+n*99)}function Bh(e,t){if(t==null)return mi(e).atom;const n=Gk(t);return n===null?mi(e).atom:I0(n)}function Hk(e){const t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r);};for(const o of Object.keys(e||{})){const r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o);}for(const[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);ce.sfx.groups=t;}function jk(e){const t=ce.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=ce.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Uk(){if(ce.sfx.buffer)return ce.sfx.buffer;if(!ce.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Dh();await Fh();const n=await(await Tm(ce.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{const a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i);});return ce.sfx.buffer=o,o}async function Wk(e,t={}){if(!ce.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const o=jk(n),r=ce.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);const i=await Dh();await Fh();const a=await Uk(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),c=Math.max(.01,l-s),d=Bh("sfx",t.volume),u=i.createGain();u.gain.value=d,u.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(u),p.start(0,s,c),{name:o,source:p,start:s,end:l,duration:c,volume:d}}const Vk=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),qk=function(e){return "/"+e},pf={},bt=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let l=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");r=l(n.map(c=>{if(c=qk(c),c in pf)return;pf[c]=true;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Vk,d||(p.as="script"),p.crossOrigin="",p.href=c,s&&p.setAttribute("nonce",s),document.head.appendChild(p),d)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return r.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},Yo={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},Kk={sounds:[],itemCustomSounds:[],version:1},Lt={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class Ou extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class Xk extends Ou{constructor(){super(`Maximum number of sounds reached (${Yo.MAX_SOUNDS})`),this.name="SoundLimitError";}}class Yk extends Ou{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${Yo.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class Jk extends Ou{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function Qk(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||$u(t),t}function vl(){const e=ye(Ye.MODULE.AUDIO_CUSTOM_SOUNDS,Kk);return Qk(e)}function $u(e){we(Ye.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function ff(){return vl().sounds}function wl(e){const t=vl();t.sounds=e,$u(t);}function Cl(){return vl().itemCustomSounds}function zh(e){const t=vl();t.itemCustomSounds=e,$u(t);}function Zk(e){const t={shop:{soundId:e.shop?.soundId??Lt.shop.soundId,volume:e.shop?.volume??Lt.shop.volume,mode:e.shop?.mode??Lt.shop.mode},pet:{soundId:e.pet?.soundId??Lt.pet.soundId,volume:e.pet?.volume??Lt.pet.volume,mode:e.pet?.mode??Lt.pet.mode},weather:{soundId:e.weather?.soundId??Lt.weather.soundId,volume:e.weather?.volume??Lt.weather.volume,mode:e.weather?.mode??Lt.weather.mode}};return t!==e&&Fu(t),t}function Du(){const e=ye(Ye.MODULE.AUDIO_NOTIFICATION_SETTINGS,Lt);return Zk(e)}function Fu(e){we(Ye.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const e1="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",Gh=[{id:"default-notification",name:"Default",source:e1,type:"upload",createdAt:0}];function t1(e){const t=new Set(e.map(o=>o.id)),n=Gh.filter(o=>!t.has(o.id));return n.length===0?e:[...e,...n]}function Hh(e){return Gh.some(t=>t.id===e)}function n1(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const r=e.slice(n+1).length*3/4;return Math.round(r)}function jh(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=n1(e);if(t>0&&t>Yo.MAX_SIZE_BYTES)throw new Yk(t)}function Uh(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function o1(e){if(e>=Yo.MAX_SOUNDS)throw new Xk}let ht=[],cd=false;function jt(){cd||Wh();}function r1(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function Wh(){if(cd)return;let e=ff();e=t1(e),e.length!==ff().length&&wl(e),ht=e,cd=true,console.log(`[CustomSounds] Initialized with ${ht.length} sounds`);}function i1(){return jt(),[...ht]}function Vh(e){return jt(),ht.find(t=>t.id===e)}function a1(e,t,n){jt(),Uh(e),jh(t),o1(ht.length);const o={id:r1(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return ht.push(o),wl(ht),console.log(`[CustomSounds] Added sound: ${o.name} (${o.id})`),o}function s1(e){if(jt(),Hh(e))throw new Error("Cannot remove default sounds");const t=ht.findIndex(o=>o.id===e);if(t===-1)return  false;const n=ht.splice(t,1)[0];return wl(ht),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function l1(e,t){if(jt(),Hh(e))throw new Error("Cannot update default sounds");const n=ht.find(o=>o.id===e);return n?(t.name!==void 0&&(Uh(t.name),n.name=t.name.trim()),t.source!==void 0&&(jh(t.source),n.source=t.source.trim()),wl(ht),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function c1(e,t={}){jt();const n=Vh(e);if(!n)throw new Jk(e);const{MGAudio:o}=await bt(async()=>{const{MGAudio:r}=await Promise.resolve().then(()=>Yh);return {MGAudio:r}},void 0);try{await o.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(r){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,r),r}}function d1(){bt(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>Yh);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function u1(){return Du()}function p1(e){return Du()[e]}function f1(e,t){const n=Du();n[e]=t,Fu(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function g1(e){Fu(e),console.log("[CustomSounds] Updated all notification settings");}function Jo(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function qh(e,t,n){jt();const o=Cl(),r=Jo(e,t,n);return o.find(i=>Jo(i.entityType,i.entityId,i.shopType)===r)??null}function m1(e,t,n,o){jt();const r=Cl(),i=Jo(e,t,o),a=r.findIndex(l=>Jo(l.entityType,l.entityId,l.shopType)===i),s={entityType:e,entityId:t,shopType:o,soundId:n.soundId,volume:n.volume,mode:n.mode};a!==-1?r[a]=s:r.push(s),zh(r),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(Me.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:o,config:n}}));}function h1(e,t,n){jt();const o=Cl(),r=Jo(e,t,n),i=o.findIndex(a=>Jo(a.entityType,a.entityId,a.shopType)===r);return i===-1?false:(o.splice(i,1),zh(o),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(Me.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function b1(e,t,n){return qh(e,t,n)!==null}function x1(e){return jt(),Cl().filter(n=>n.entityType===e)}const de={init:Wh,getAll:i1,getById:Vh,add:a1,remove:s1,update:l1,play:c1,stop:d1,getNotificationSettings:u1,getNotificationConfig:p1,setNotificationConfig:f1,setNotificationSettings:g1,getItemCustomSound:qh,setItemCustomSound:m1,removeItemCustomSound:h1,hasItemCustomSound:b1,getItemCustomSoundsByType:x1};let va=null;async function y1(){return ce.ready?true:va||(va=(async()=>{ce.baseUrl=await lo.base();const e=await Jt.load({baseUrl:ce.baseUrl}),t=Jt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string")continue;const r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){const i=r[1].toLowerCase(),a=r[2];ce.urls[i].set(a,Yt(ce.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(ce.sfx.mp3Url=Yt(ce.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(ce.sfx.atlasUrl=Yt(ce.baseUrl,o));}if(!ce.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return ce.sfx.atlas=await bu(ce.sfx.atlasUrl),Hk(ce.sfx.atlas),de.init(),ce.ready=true,true})(),va)}function Kh(e){if(e!=="music"&&e!=="ambience")return  false;const t=ce.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return ce.tracks[e]=null,true}function v1(e,t,n={}){if(!ce.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const o=ce.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Kh(e);const r=new Audio(o);return r.loop=!!n.loop,r.volume=Bh(e,n.volume),r.preload="auto",r.play().catch(()=>{}),ce.tracks[e]=r,r}function w1(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(ce.urls[n].keys()).sort():n==="sfx"?ce.sfx.atlas?t.groups?Array.from(ce.sfx.groups.keys()).sort():Object.keys(ce.sfx.atlas).sort():[]:[]}function C1(){return ["sfx","music","ambience"]}function S1(){return Array.from(ce.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function k1(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return  false;const r=ce.urls[n],i=o.toLowerCase();for(const a of Array.from(r.keys()))if(a.toLowerCase()===i)return  true;return  false}function _1(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const o of Array.from(ce.sfx.groups.keys()))if(o.toLowerCase()===n)return  true;return  false}function E1(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const r=ce.urls[n],i=o.toLowerCase();for(const[a,s]of Array.from(r.entries()))if(a.toLowerCase()===i)return s;return null}function T1(){return ce.tracks.music&&(ce.tracks.music.volume=mi("music").atom),ce.tracks.ambience&&(ce.tracks.ambience.volume=mi("ambience").atom),true}let at=null;async function A1(e,t={}){Xh();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const o={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,at?.audio===n&&(at=null));},setVolume:r=>{n.volume=Math.max(0,Math.min(1,r));},isPlaying:()=>!n.paused&&!n.ended};at=o;try{await new Promise((r,i)=>{const a=setTimeout(()=>{i(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(a),n.removeEventListener("canplay",l),n.removeEventListener("error",c);},l=()=>{s(),r();},c=()=>{s(),i(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(a),r()):(n.addEventListener("canplay",l,{once:!0}),n.addEventListener("error",c,{once:!0}));}),await n.play();}catch(r){throw at=null,r}return n.addEventListener("ended",()=>{at?.audio===n&&(at=null);}),o}function Xh(){return at?(at.stop(),at=null,true):false}function I1(e){return at?(at.setVolume(e),true):false}function P1(){return at?.isPlaying()??false}function L1(){return at}function ot(){if(!$h())throw new Error("MGAudio not ready yet")}async function M1(e,t,n={}){const o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return Wk(r,n);if(o==="music"||o==="ambience")return v1(o,r,n);throw new Error(`Unknown category: ${o}`)}const Oe={init:y1,isReady:$h,play:M1,stop:e=>(ot(),Kh(e)),list:(e,t)=>(ot(),w1(e,t)),refreshVolumes:()=>(ot(),T1()),categoryVolume:e=>(ot(),mi(e)),getCategories:()=>(ot(),C1()),getGroups:()=>(ot(),S1()),hasTrack:(e,t)=>(ot(),k1(e,t)),hasGroup:e=>(ot(),_1(e)),getTrackUrl:(e,t)=>(ot(),E1(e,t)),playCustom:async(e,t)=>(ot(),A1(e,t)),stopCustom:()=>(ot(),Xh()),setCustomVolume:e=>(ot(),I1(e)),isCustomPlaying:()=>(ot(),P1()),getCustomHandle:()=>(ot(),L1()),CustomSounds:de},Yh=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:Oe},Symbol.toStringTag,{value:"Module"}));function R1(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const ke=R1();function Jh(){return ke.ready}let wa=null;async function N1(){return ke.ready?true:wa||(wa=(async()=>{ke.baseUrl=await lo.base();const e=await Jt.load({baseUrl:ke.baseUrl}),t=Jt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ke.byCat.clear(),ke.byBase.clear();for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;const i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),l=i.slice(a+1),c=Yt(ke.baseUrl,o);ke.byBase.set(i,c),ke.byCat.has(s)||ke.byCat.set(s,new Map),ke.byCat.get(s).set(l,c);}return ke.ready=true,true})(),wa)}function dd(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function O1(e,t){if(t===void 0){const i=dd(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),o=dd(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){const i=o.indexOf("_");return {cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return {cat:n,asset:o.replace(/^.+?_/,""),base:r}}function $1(){return Array.from(ke.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function D1(e){const t=ke.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function ud(e,t){const{cat:n,asset:o,base:r}=O1(e,t),i=ke.byBase.get(r);if(i)return i;const s=ke.byCat.get(n)?.get(o);if(s)return s;if(!ke.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return Yt(ke.baseUrl,`cosmetic/${r}.png`)}const gf=V?.document??document;function F1(){if(ke.overlay)return ke.overlay;const e=gf.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),gf.documentElement.appendChild(e),ke.overlay=e,e}function B1(){const e=ke.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function z1(e){return ke.defaultParent=e,true}const G1=V?.document??document;function pd(e,t,n){if(!ke.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=r!==void 0?ud(e,r):ud(e),a=G1.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):dd(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(const[s,l]of Object.entries(o.style))try{a.style[s]=String(l);}catch{}return a}function H1(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=o.parent||B1()||F1(),a=r!==void 0?pd(e,r,o):pd(e,o);if(i===ke.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);const l=o.scale??1,c=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`;else {const d=o.x??innerWidth/2,u=o.y??innerHeight/2;a.style.left=`${d}px`,a.style.top=`${u}px`,a.style.transform=`scale(${l}) rotate(${c}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`);}}return i.appendChild(a),ke.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}ke.live.delete(a);},a}function j1(){for(const e of Array.from(ke.live))e.__mgDestroy?.();}const Qh=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],fd="Expression_Stressed.png";function U1(){try{return Array.from(V.document.querySelectorAll("script")).find(o=>o.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function W1(){return V.location.pathname.split("/").pop()||"UNKNOWN"}async function V1(){try{const e=U1(),t=W1(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,o=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function ic(){return  false}const mn={ownedFilenames:new Set,loaded:false,error:null},q1=[];function ac(){q1.forEach(e=>e());}async function Bu(){try{await gl();const{Store:e}=await bt(async()=>{const{Store:o}=await Promise.resolve().then(()=>Fi);return {Store:o}},void 0);if(!await e.select("isUserAuthenticatedAtom")){mn.loaded=!0,ac();return}const n=await V1();mn.ownedFilenames=new Set(n.map(o=>o.cosmeticFilename)),mn.loaded=!0,mn.error=null,ac();}catch(e){mn.error=e,mn.loaded=true,ac();}}function K1(e){return mn.ownedFilenames.has(e)}function X1(){return mn.loaded}const gd=[];let mf=false,hf=false;function Y1(){hf||(hf=true,eb().then(()=>{}).catch(()=>{}));}Y1();let bf=false;async function J1(){bf||(await Bu(),bf=true);}function hi(){try{const t=Array.from(V.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${V.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}async function Zh(){try{await gl();const{Store:e}=await bt(async()=>{const{Store:r}=await Promise.resolve().then(()=>Fi);return {Store:r}},void 0);let t=await e.select("playerAtom");for(let r=0;r<5&&(!t||Object.keys(t).length===0);r++)await new Promise(i=>setTimeout(i,200*r)),t=await e.select("playerAtom");if(!t||typeof t=="object"&&Object.keys(t).length===0)throw new Error("playerAtom not available");const n=t.cosmetic,o=t.name;return {avatar:n?.avatar||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:n?.color||"Red",name:o||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:"Red",name:"Player"}}}function Q1(e,t){if(!t)return e;let n=e;if(t.type){const o=Array.isArray(t.type)?t.type:[t.type];n=n.filter(r=>o.includes(r.type));}if(t.availability){const o=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(r=>o.includes(r.availability));}if(t.search){const o=t.search.toLowerCase();n=n.filter(r=>r.displayName.toLowerCase().includes(o));}return n}function Z1(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:K1(n.filename))}async function eb(){if(!mf)try{const e=hi(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const i=((await n.json())?.bundles||[]).find(s=>s.name==="cosmetic"||s.name==="cosmetics");if(!i)return;const a=new Set(Qh.map(s=>s.filename));for(const s of i.assets||[])for(const l of s.src||[]){if(typeof l!="string")continue;const c=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(l);if(!c)continue;const d=c[1],u=c[2],p=`${u}.png`;if(a.has(p))continue;const f=u.split("_");if(f.length<2)continue;const g=f[0],h=f.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");gd.push({id:p,filename:p,type:g,displayName:h,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${d}/`)}${p}`}),a.add(p);}mf=!0,console.log(`[Avatar] Discovered ${gd.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function zi(e){const t=hi(),n=gd.map(c=>({...c,url:c.url||`${t}${c.filename}`})),o=Qh.map(c=>({...c,url:`${t}${c.filename}`})),r=new Set,i=[];for(const c of n)r.has(c.filename)||(i.push(c),r.add(c.filename));for(const c of o)r.has(c.filename)||(i.push(c),r.add(c.filename));const s=[...[],...i];let l=Q1(s,e);return l=Z1(l,e),l}async function tb(e){return await J1(),zi(e)}async function e_(){await eb();}function t_(e){return zi(e).map(t=>t.url)}async function bi(){const{avatar:e,color:t}=await Zh();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function n_(){const e=await Zh(),t=await bi(),n=zi(),o={};return n.forEach(r=>{o[r.type]=(o[r.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:o,allItems:n,assetBaseUrl:hi()}}const o_=100,sc=[];function md(e,t,n){let o="";if(n&&typeof n=="object"){if(t==="PartialState"){const r=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(r||i)o=`PartialState : ${r} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(l=>l!=="type");s.length>0&&(o=`PartialState - {${s.join(", ")}}`);}}if(!o&&n.event&&(o+=`${n.event} `),!o&&n.op&&(o+=`op:${n.op} `),!o&&n.data){const r=Object.keys(n.data);r.length>0&&(o+=`{${r.slice(0,3).join(",")}${r.length>3?"...":""}}`);}else !o&&Array.isArray(n)&&(o+=`[${n.length} items]`);}else typeof n=="string"&&(o=n.slice(0,50));sc.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:o.trim()||"-"}),sc.length>o_&&sc.shift();}const rt={nativeCtor:null,captured:[],latestOpen:null},xf=Symbol.for("ariesmod.ws.capture.wrapped"),yf=Symbol.for("ariesmod.ws.capture.native"),nb=1;function hd(e){return !!e&&e.readyState===nb}function r_(){if(hd(rt.latestOpen))return rt.latestOpen;for(let e=rt.captured.length-1;e>=0;e--){const t=rt.captured[e];if(hd(t))return t}return null}function i_(e,t){rt.captured.push(e),rt.captured.length>25&&rt.captured.splice(0,rt.captured.length-25);const n=()=>{rt.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{rt.latestOpen===e&&(rt.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",o=>{try{const r=JSON.parse(o.data);md("in",r.type||"unknown",r);}catch{md("in","raw",o.data);}}),e.readyState===nb&&n();}function a_(e=V,t={}){const n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return ()=>{};if(o[xf])return rt.nativeCtor=o[yf]??rt.nativeCtor??null,()=>{};const r=o;rt.nativeCtor=r;function i(a,s){const l=s!==void 0?new r(a,s):new r(a);try{i_(l,n);}catch{}return l}try{i.prototype=r.prototype;}catch{}try{Object.setPrototypeOf(i,r);}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED;}catch{}i[xf]=true,i[yf]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=r);}catch{}}}function s_(e=V){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Gs(e=V){const t=r_();if(t)return {ws:t,source:"captured"};const n=s_(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function ob(e,t={}){const n=t.pageWindow??V,o=t.intervalMs??500,r=!!t.debug;let i=null,a=null;const s=()=>{const c=Gs(n);(c.ws!==i||c.source!==a)&&(i=c.ws,a=c.source,r&&console.log("[WS] best socket changed:",c.source,c.ws),e(c));};s();const l=setInterval(s,o);return ()=>clearInterval(l)}function l_(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function c_(e,t=V){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:o}=Gs(t);if(!o)return {ok:false,reason:"no-ws"};if(!hd(o))return {ok:false,reason:"not-open"};const r=l_(e);if(r==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(r);md("out",i.type||"unknown",i);}catch{}try{return o.send(r),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function d_(e,t={},n=V){return c_({type:e,...t},n)}const on={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},K={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Tt=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Tt||{});new Set(Object.values(on));new Set(Object.values(K));const u_=["Room","Quinoa"],p_={Room:["Room"],Quinoa:u_};function ue(e,t={},n=V){const o=t,{scopePath:r,scope:i,...a}=o,s=typeof r=="string"?r:i,l=Array.isArray(r)?r:s==="Room"||s==="Quinoa"?p_[s]:null;return d_(e,l?{scopePath:l,...a}:a,n)}function f_(e,t=V){return ue(K.Chat,{scope:"Room",message:e},t)}function g_(e,t=V){return ue(K.Emote,{scope:"Room",emoteType:e},t)}function m_(e,t=V){return ue(K.Wish,{scope:"Quinoa",wish:e},t)}function h_(e,t=V){return ue(K.KickPlayer,{scope:"Room",playerId:e},t)}function Sl(e,t=V){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:o}=e;return ue(K.SetPlayerData,{scope:"Room",name:n,cosmetic:o},t)}function b_(e=V){return ue(K.UsurpHost,{scope:"Quinoa"},e)}function x_(e=V){return ue(K.ReportSpeakingStart,{scope:"Quinoa"},e)}function y_(e,t=V){return ue(K.SetSelectedGame,{scope:"Room",gameId:e},t)}function v_(e,t=V){return ue(K.VoteForGame,{scope:"Room",gameId:e},t)}function w_(e,t=V){return ue(K.RequestGame,{scope:"Room",gameId:e},t)}function C_(e=V){return ue(K.RestartGame,{scope:"Room"},e)}function S_(e,t=V){return ue(K.Ping,{scope:"Quinoa",id:e},t)}function rb(e,t,n=V){return ue(K.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const k_=rb;function __(e,t,n=V){return ue(K.Teleport,{scope:"Quinoa",x:e,y:t},n)}function E_(e=V){return ue(K.CheckWeatherStatus,{scope:"Quinoa"},e)}function T_(e,t,n=V){return ue(K.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function A_(e,t=V){return ue(K.DropObject,{scope:"Quinoa",slotIndex:e},t)}function I_(e,t=V){return ue(K.PickupObject,{scope:"Quinoa",objectId:e},t)}function kl(e,t=V){return ue(K.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function zu(e,t="PetHutch",n=V){return ue(K.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Gu(e,t="PetHutch",n=V){return ue(K.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function P_(e,t,n=V){return ue(K.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function L_(e=V){return ue(K.LogItems,{scope:"Quinoa"},e)}function M_(e,t,n,o=V){return ue(K.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},o)}function R_(e,t=V){return ue(K.WaterPlant,{scope:"Quinoa",plantId:e},t)}function N_(e,t=V){return ue(K.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function O_(e=V){return ue(K.SellAllCrops,{scope:"Quinoa"},e)}function Hu(e,t=V){return ue(K.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function ju(e,t=V){return ue(K.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function Uu(e,t=V){return ue(K.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Wu(e,t=V){return ue(K.PurchaseSeed,{scope:"Quinoa",species:e},t)}function $_(e,t,n,o=V){return ue(K.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},o)}function D_(e,t=V){return ue(K.HatchEgg,{scope:"Quinoa",eggId:e},t)}function F_(e,t,n,o=V){return ue(K.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},o)}function B_(e,t,n=V){return ue(K.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function z_(e,t,n=V){return ue(K.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function G_(e,t=V){return ue(K.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function H_(e,t,n,o=V){return ue(K.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},o)}function j_(e,t=V){return ue(K.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function ib(e,t={x:0,y:0},n="Dirt",o=0,r=V){return ue(K.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:o},r)}function U_(e,t,n=V){return ue(K.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function W_(e,t=V){return ue(K.PetPositions,{scope:"Quinoa",positions:e},t)}function ab(e,t,n=V){return ue(K.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function sb(e,t=V){return ue(K.StorePet,{scope:"Quinoa",itemId:e},t)}function V_(e,t,n=V){return ue(K.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function q_(e,t=V){return ue(K.SellPet,{scope:"Quinoa",petId:e},t)}async function lb(e){try{const t=await bi(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],o=e.color!==void 0?e.color:t.color,r=Sl({cosmetic:{color:o,avatar:n}},V);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:r}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function K_(){return lb({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const Rr=new Map;function X_(e){if(Rr.has(e))return Rr.get(e);const t=new Promise((n,o)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>n(r),r.onerror=()=>{Rr.delete(e),o(new Error(`Failed to load image: ${e}`));},r.src=e;});return Rr.set(e,t),t}function Y_(){Rr.clear();}function J_(e){return zi().find(o=>o.filename===e)?.url||""}async function Q_(e,t={}){const n=document.createElement("canvas"),o=t.width||400,r=t.height||400,i=t.scale||1;n.width=o*i,n.height=r*i;const a=n.getContext("2d");if(!a)throw new Error("Failed to get canvas 2D context");if(a.imageSmoothingEnabled=i!==1,e.color){const d={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};a.fillStyle=d[e.color]||"#FF0000",a.fillRect(0,0,n.width,n.height);}const l=[e.bottom,e.mid,e.top,e.expression].filter(d=>!!d).map(d=>J_(d));return (await Promise.all(l.map(d=>X_(d)))).forEach(d=>{a.drawImage(d,0,0,n.width,n.height);}),n}const Ca={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};let Vu=null,No=null,jn=null,bn=null;function Z_(){try{const t=Array.from(V.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return `${V.location.origin}/assets/cosmetic/`}catch{return "https://magicgarden.gg/assets/cosmetic/"}}function lc(e){return Z_()+e}function eE(e,t){const o=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(o[Ca.BOTTOM]=e.bottom),e.mid&&(o[Ca.MID]=e.mid),e.top&&(o[Ca.TOP]=e.top),e.expression&&(o[Ca.EXPRESSION]=e.expression),o}async function tE(e){try{const{Store:t}=await bt(async()=>{const{Store:a}=await Promise.resolve().then(()=>Fi);return {Store:a}},void 0),n=await t.select("myDataAtom"),o=n?.cosmetic?.avatar||[],r=eE(e,o),i=e.color||n?.cosmetic?.color||"Red";return Vu={avatar:r,color:i},oE(),rE(r),console.log("[Avatar] Rendered avatar override:",r),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function nE(){Vu=null,No&&(clearInterval(No),No=null),jn&&(jn.disconnect(),jn=null);const e=V.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),bn&&(bn.remove(),bn=null),console.log("[Avatar] Cleared override"),true}function oE(){if(bn)return;const e=V.document;bn=e.createElement("style"),bn.id="gemini-avatar-override-styles",bn.textContent=`
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
    `,e.head.appendChild(bn);}function rE(e){No&&clearInterval(No),jn&&jn.disconnect();const t=V.document,n=()=>{const r=t.querySelectorAll(".Avatar");let i=0;r.forEach(a=>{const s=Array.from(a.querySelectorAll("img"));if(s.length===4){let c=false;s.forEach((d,u)=>{const p=lc(e[u]);d.src!==p&&(c=true);}),c&&(s.forEach((d,u)=>{d.src=lc(e[u]),d.setAttribute("data-gemini-override",e[u]);}),i++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const c=t.createElement("div");c.className="gemini-avatar-overlay",e.forEach(d=>{const u=t.createElement("img");u.src=lc(d),u.setAttribute("data-gemini-cosmetic",d),c.appendChild(u);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(c),i++;}}),i>0&&console.log(`[Avatar] Re-applied ${i} override(s) (React reverted)`);};n(),No=setInterval(n,500),jn=new MutationObserver(()=>{setTimeout(n,10);});const o=t.querySelector(".game-root")||t.querySelector("#root")||t.body;jn.observe(o,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function iE(){return Vu}const Sa={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};function aE(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===fd.toLowerCase()}function sE(e){return e.some(aE)}let Hs=null,To=null;V.Gemini_AvatarOverride=null;function lE(e,t){const o=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(o[Sa.BOTTOM]=e.bottom),e.mid&&(o[Sa.MID]=e.mid),e.top&&(o[Sa.TOP]=e.top),e.expression&&(o[Sa.EXPRESSION]=e.expression),o}async function qu(e){try{const{Store:t}=await bt(async()=>{const{Store:h}=await Promise.resolve().then(()=>Fi);return {Store:h}},void 0),{getPlayers:n}=await bt(async()=>{const{getPlayers:h}=await Promise.resolve().then(()=>bb);return {getPlayers:h}},void 0);ic();const i=n().get().myPlayer;if(!i)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=i.id,s=i.cosmetic.avatar;V.MagicCircle_PlayerId=a,To||(To=[...s]);let l=lE(e,s);const c=sE(l);ic(),Hs=l,V.Gemini_AvatarOverride=l,console.log("[WorldAvatar] Applying override:",l);const d=await t.select("stateAtom");if(!d?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const u=d.data.players.findIndex(h=>h.id===a);if(u===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const p=d.data.players[u],f=[...d.data.players];f[u]={...p,cosmetic:{...p.cosmetic,avatar:l}};const g={...d,data:{...d.data,players:f}};return await t.set("stateAtom",g),ic()&&c||Sl({name:i.name,cosmetic:{...i.cosmetic,avatar:l}},V),!0}catch{return  false}}async function cb(){if(!Hs||!To)return  true;try{const{Store:e}=await bt(async()=>{const{Store:u}=await Promise.resolve().then(()=>Fi);return {Store:u}},void 0),{getPlayers:t}=await bt(async()=>{const{getPlayers:u}=await Promise.resolve().then(()=>bb);return {getPlayers:u}},void 0);V.Gemini_AvatarOverride=null;const r=t().get().myPlayer;if(!r)return !1;const i=r.id,a=await e.select("stateAtom");if(!a?.data?.players)return !1;const s=a.data.players.findIndex(u=>u.id===i);if(s===-1)return !1;const l=a.data.players[s],c=[...a.data.players];c[s]={...l,cosmetic:{...l.cosmetic,avatar:To}};const d={...a,data:{...a.data,players:c}};return await e.set("stateAtom",d),Sl({name:r.name,cosmetic:{...r.cosmetic,avatar:To}},V),Hs=null,To=null,!0}catch{return  false}}function cE(){return Hs}let Ze=[];const os=[],vf=()=>{os.forEach(e=>e([...Ze]));},fn={init(){Ze=ye(Ye.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...Ze]},async save(e,t,n){const o=n||Math.random().toString(36).substring(2,9),r={...t,id:o,name:e,createdAt:n&&Ze.find(i=>i.id===n)?.createdAt||Date.now()};if(n){const i=Ze.findIndex(a=>a.id===n);i!==-1?Ze[i]=r:Ze.push(r);}else Ze.push(r);return we(Ye.SECTION.AVATAR_LOADOUTS,Ze),vf(),o},delete(e){Ze=Ze.filter(t=>t.id!==e),we(Ye.SECTION.AVATAR_LOADOUTS,Ze),vf();},rename(e,t){const n=Ze.find(o=>o.id===e);n&&(n.name=t,we(Ye.SECTION.AVATAR_LOADOUTS,Ze));},async wear(e){const t=Ze.find(o=>o.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await qu(n)},subscribe(e){return os.push(e),()=>{const t=os.indexOf(e);t!==-1&&os.splice(t,1);}}},dE={init:Bu,isReady:()=>X1(),list:zi,listAsync:tb,listUrls:t_,get:bi,debug:n_,set:lb,blank:K_,Loadouts:fn,toCanvas:Q_,clearImageCache:Y_,render:tE,clearOverride:nE,getOverride:iE,renderWorld:qu,clearWorldOverride:cb,getWorldOverride:cE};function Fn(){if(!Jh())throw new Error("MGCosmetic not ready yet")}const Ku={init:N1,isReady:Jh,categories:()=>(Fn(),$1()),list:e=>(Fn(),D1(e)),url:((e,t)=>(Fn(),ud(e,t))),create:((e,t,n)=>(Fn(),pd(e,t,n))),show:((e,t,n)=>(Fn(),H1(e,t,n))),attach:e=>(Fn(),z1(e)),clear:()=>(Fn(),j1()),Avatar:dE},wf={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function db(e){const t=J.get("mutations");if(!t)return wf[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?wf[e]??null:n.coinMultiplier}const cc=new Map;function dc(e){if(cc.has(e))return cc.get(e);const t=db(e)??1;return cc.set(e,t),t}const uE=new Set(["Gold","Rainbow"]),pE=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function Xu(e){let t=1,n=0,o=0;for(const r of e)if(r==="Gold"||r==="Rainbow")r==="Rainbow"?t=dc("Rainbow"):t===1&&(t=dc("Gold"));else {const i=dc(r);i>1&&(n+=i,o++);}return t*(1+n-o)}function fE(e){return db(e)}function gE(e){return uE.has(e)}function mE(e){return pE.has(e)}function hE(e){return mE(e)}function Yu(e,t){const n=_l(e);if(!n)return 50;const o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;const r=(t-1)/(o-1);return Math.floor(50+50*r)}function _t(e,t,n){const o=_l(e);if(!o)return 0;const r=o.baseSellPrice,i=Xu(n);return Math.round(r*t*i)}function bE(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const o=t-e,r=n-e;return Math.floor(r/o*100)}function xE(e,t){return t>=e}function _l(e){const t=J.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const ub=3600,uc=80,yE=100,Nr=30;function El(e){return e/ub}function Gi(e,t){const n=ji(e);if(!n)return uc;const o=n.maxScale;if(t<=1)return uc;if(t>=o)return yE;const r=(t-1)/(o-1);return Math.floor(uc+20*r)}function Hi(e,t,n){const o=ji(e);if(!o)return n-Nr;const r=o.hoursToMature,i=t/ub,a=Nr/r,s=Math.min(a*i,Nr),l=n-Nr;return Math.floor(l+s)}function Tl(e,t){const n=ji(e);return n?t>=n.hoursToMature:false}function pb(e){const t=ji(e);return t?Nr/t.hoursToMature:0}function vE(e,t,n){const o=t-e;return o<=0||n<=0?0:o/n}function ji(e){const t=J.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function fb(e,t){return t<=0?1:Math.min(1,e/t)}const ze=3600,ka=80,Cf=100,Dt=30,wE={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Ui(e){const t=J.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function CE(e){return e/ze}function Wi(e,t){const n=Ui(e);if(!n)return ka;const{maxScale:o}=n;if(t<=1)return ka;if(t>=o)return Cf;const r=(t-1)/(o-1);return Math.floor(ka+(Cf-ka)*r)}function SE(e){return e-Dt}function kE(e){const t=Ui(e);return !t||t.hoursToMature<=0?0:Dt/t.hoursToMature}function Vi(e,t,n){const o=Ui(e);if(!o)return n-Dt;const r=t/ze,i=Dt/o.hoursToMature,a=Math.min(i*r,Dt),s=n-Dt;return Math.floor(s+a)}function gb(e,t,n){const o=Ui(e);if(!o)return 0;const r=n-Dt,i=t-r;if(i<=0)return 0;const a=Dt/o.hoursToMature;return a<=0?0:i/a*ze}function Ju(e,t,n,o,r=ze){const a=gb(e,n,o)-t;return a<=0?0:r<=0?1/0:a/r}function Al(e,t,n,o=ze){return Ju(e,t,n,n,o)}function Qu(e,t,n,o,r=ze){if(n>=o)return 0;const i=n+1;return Ju(e,t,i,o,r)}function _E(e,t){return e>=t}function EE(e,t){const n=t-Dt,r=(e-n)/Dt*100;return Math.min(100,Math.max(0,r))}const TE=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:CE,calculateCurrentStrength:Vi,calculateHoursToMaxStrength:Al,calculateHoursToNextStrength:Qu,calculateHoursToStrength:Ju,calculateMaxStrength:Wi,calculateStartingStrength:SE,calculateStrengthPerHour:kE,calculateStrengthProgress:EE,calculateXpForStrength:gb,getSpeciesData:Ui,isPetMature:_E},Symbol.toStringTag,{value:"Module"}));function Zu(e){const t=J.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const o=wE[e];return o?n.coinsToFullyReplenishHunger/o*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function AE(e,t){return e<=0?0:t<=0?1/0:e/t}function ep(e,t,n,o){if(e<=0||n<=0)return 0;const r=t/n;if(r>=e)return 0;const i=e-r,a=o/n;return Math.ceil(i/a)}function tp(e,t,n){const o=J.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const i=r.coinsToFullyReplenishHunger,a=Zu(e);return ep(n,t,a,i)}function xi(e,t,n){const o=J.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const i=r.coinsToFullyReplenishHunger,a=Zu(e);return ep(n,t,a,i)}function np(e,t,n,o,r,i){return e?t&&i>0?xi(n,o,i):0:xi(n,o,r)}const IE=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:np,calculateFeedsForDuration:ep,calculateFeedsToMaxStrength:xi,calculateFeedsToNextStrength:tp,calculateHoursUntilStarving:AE,getHungerDrainPerHour:Zu},Symbol.toStringTag,{value:"Module"})),mb={init(){},isReady(){return  true},crop:{calculateSize:Yu,calculateSellPrice:_t,calculateProgress:bE,isReady:xE,getData:_l},pet:{calculateAge:El,calculateMaxStrength:Gi,calculateCurrentStrength:Hi,isMature:Tl,calculateStrengthPerHour:pb,getData:ji},mutation:{calculateMultiplier:Xu,getValue:fE,isGrowth:gE,isEnvironmental:hE},xp:TE,feed:IE};function Et(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!Et(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return  false;for(const a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!Et(n[a],o[a]))return  false;return  true}const Sf={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},kf={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function PE(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function LE(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function ME(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function RE(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function NE(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,o=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function _f(e){return {position:PE(e),tile:LE(e),garden:ME(e),object:RE(e),plant:NE(e)}}function Ef(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function OE(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!Et(e.data,t.data)}function $E(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!Et(e.sortedSlotIndices,t.sortedSlotIndices)?true:!Et(e.slots,t.slots)}function DE(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function FE(){let e=kf,t=kf,n=false;const o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(Sf),s=new Set;function l(){if(s.size<a.length)return;const d=_f(i);if(!Et(e,d)&&(t=e,e=d,!!n)){for(const u of r.all)u(e,t);if(Ef(t)!==Ef(e))for(const u of r.stable)u(e,t);if(OE(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of r.object)p(u);}if($E(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of r.plantInfo)p(u);}if(DE(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of r.garden)p(u);}}}async function c(){if(n)return;const d=a.map(async u=>{const p=Sf[u],f=await xe.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=_f(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeObject(d,u){return r.object.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.object,previous:e.object}),()=>r.object.delete(d)},subscribePlantInfo(d,u){return r.plantInfo.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(d)},subscribeGarden(d,u){return r.garden.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.garden,previous:e.garden}),()=>r.garden.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=false;}}}let pc=null;function Le(){return pc||(pc=FE()),pc}function BE(){let e=null;const t=[],n=new Set,o={},r=new Set,i=2;function a(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function l(u,p){const{cols:f,rows:g}=u,h=f*g,x=new Set,b=new Set,C=new Map,S=[],_=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],E=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],v=Math.max(_.length,E.length);for(let y=0;y<v;y++){const T=_[y]??[],I=E[y]??[],P=T.map((O,W)=>(x.add(O),C.set(O,y),{globalIndex:O,localIndex:W,position:a(f,O)})),R=I.map((O,W)=>(b.add(O),C.set(O,y),{globalIndex:O,localIndex:W,position:a(f,O)}));S.push({userSlotIdx:y,dirtTiles:P,boardwalkTiles:R,allTiles:[...P,...R]});}const w=u.spawnTiles.map(y=>a(f,y)),k={};if(u.locations)for(const[y,T]of Object.entries(u.locations)){const I=T.spawnTileIdx??[];k[y]={name:y,spawnTiles:I,spawnPositions:I.map(P=>a(f,P))};}return {cols:f,rows:g,totalTiles:h,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:w,locations:k,userSlots:S,globalToXY(y){return a(f,y)},xyToGlobal(y,T){return s(f,y,T)},getTileOwner(y){return C.get(y)??null},isDirtTile(y){return x.has(y)},isBoardwalkTile(y){return b.has(y)}}}function c(){if(r.size<i||e)return;const u=o.map,p=o.tileSize??0;if(u){e=l(u,p);for(const f of n)f(e);n.clear();}}async function d(){const u=await xe.subscribe("mapAtom",f=>{o.map=f,r.add("map"),c();});t.push(u);const p=await xe.subscribe("tileSizeAtom",f=>{o.tileSize=f,r.add("tileSize"),c();});t.push(p);}return d(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let fc=null;function bd(){return fc||(fc=BE()),fc}function zE(){const e=J.get("mutations");return e?Object.keys(e):[]}function hb(){const e={};for(const t of zE())e[t]=[];return e}function xd(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:hb()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Tf(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function GE(e,t,n,o){const r=t.slots.filter(i=>o>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function HE(e,t,n,o,r){return {tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime,fruitCount:1}}function jE(e,t,n,o){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function Af(e,t,n,o){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function If(e,t){const{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return xd();const i=t().get(),a=i?.userSlots[o],s=a?.dirtTiles??[],l=a?.boardwalkTiles??[],c=[],d=[],u=[],p={},f=[],g=[],h=[],x=[],b=hb(),C=[],S=[],_=[],E={},v=[],w=[],k={},y=new Set,T=new Set;for(const[O,W]of Object.entries(n.tileObjects)){const N=parseInt(O,10);y.add(N);const F=i?i.globalToXY(N):{x:0,y:0};if(W.objectType==="plant"){const G=W,B=GE(O,G,F,r);c.push(B),B.isMature?d.push(B):u.push(B),p[B.species]||(p[B.species]=[]),p[B.species].push(B);for(let H=0;H<G.slots.length;H++){const L=G.slots[H],$=HE(O,F,H,L,r);if(f.push($),$.isMature?g.push($):h.push($),$.mutations.length>0){x.push($);for(const A of $.mutations)b[A]||(b[A]=[]),b[A].push($);}}}else if(W.objectType==="egg"){const B=jE(O,W,F,r);C.push(B),E[B.eggId]||(E[B.eggId]=[]),E[B.eggId].push(B),B.isMature?S.push(B):_.push(B);}else if(W.objectType==="decor"){const B=Af(O,W,F,"tileObjects");v.push(B),k[B.decorId]||(k[B.decorId]=[]),k[B.decorId].push(B);}}for(const[O,W]of Object.entries(n.boardwalkTileObjects)){const N=parseInt(O,10);T.add(N);const F=i?i.globalToXY(N):{x:0,y:0},B=Af(O,W,F,"boardwalk");w.push(B),k[B.decorId]||(k[B.decorId]=[]),k[B.decorId].push(B);}const I=[...v,...w],P=s.filter(O=>!y.has(O.localIndex)),R=l.filter(O=>!T.has(O.localIndex));return {garden:n,mySlotIndex:o,plants:{all:c,mature:d,growing:u,bySpecies:p,count:c.length},crops:{all:f,mature:g,growing:h,mutated:{all:x,byMutation:b}},eggs:{all:C,mature:S,growing:_,byType:E,count:C.length},decors:{tileObjects:v,boardwalk:w,all:I,byType:k,count:I.length},tiles:{tileObjects:s,boardwalk:l,empty:{tileObjects:P,boardwalk:R}},counts:{plants:c.length,maturePlants:d.length,crops:f.length,matureCrops:g.length,eggs:C.length,matureEggs:S.length,decors:I.length,emptyTileObjects:P.length,emptyBoardwalk:R.length}}}function UE(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function WE(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function VE(e,t,n){const o=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),r=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !o.has(a)&&r.has(a)})}function qE(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function KE(e,t){const n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(const r of t){const i=o.get(r.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,r.slots.length);for(let s=0;s<a;s++){const l=new Set(i.slots[s].mutations),c=new Set(r.slots[s].mutations),d=[...c].filter(p=>!l.has(p)),u=[...l].filter(p=>!c.has(p));if(d.length>0||u.length>0){const p=Date.now(),f=r.slots[s],g={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime,fruitCount:1};n.push({crop:g,added:d,removed:u});}}}return n}function XE(e,t,n){const o=[],r=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=r.get(a.tileIndex);if(!s)continue;const l=Math.min(a.slots.length,s.slots.length);for(let c=0;c<l;c++){const d=a.slots[c],u=s.slots[c];if(d.startTime!==u.startTime){const p=i.get(`${a.tileIndex}:${c}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:c,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true,fruitCount:1};o.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let c=s.slotsCount;c<a.slotsCount;c++){const d=i.get(`${a.tileIndex}:${c}`);if(!d||!d.isMature)continue;const u=a.slots[c];if(!u)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:c,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true,fruitCount:1};o.push({crop:p,remainingSlots:s.slotsCount});}}return o}function YE(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function JE(e,t){const n=l=>`${l.tileIndex}:${l.location}`,o=l=>`${l.tileIndex}:${l.location}`,r=new Set(e.map(n)),i=new Set(t.map(o)),a=t.filter(l=>!r.has(o(l))),s=e.filter(l=>!i.has(n(l)));return {added:a,removed:s}}function QE(){let e=xd(),t=xd(),n=false;const o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function l(){if(a.size<s)return;const d=If(i,bd);if(Et(e,d)||(t=e,e=d,!n))return;for(const S of r.all)S(e,t);if(Tf(t)!==Tf(e))for(const S of r.stable)S(e,t);const u=UE(t.plants.all,e.plants.all);for(const S of u.added)for(const _ of r.plantAdded)_({plant:S});for(const S of u.removed)for(const _ of r.plantRemoved)_({plant:S,tileIndex:S.tileIndex});const p=WE(t.plants.mature,e.plants.mature,e.plants.all);for(const S of p)for(const _ of r.plantMatured)_({plant:S});const f=KE(t.plants.all,e.plants.all);for(const S of f)for(const _ of r.cropMutated)_(S);const g=VE(t.crops.mature,e.crops.mature,e.crops.all);for(const S of g)for(const _ of r.cropMatured)_({crop:S});const h=XE(t.plants.all,e.plants.all,t.crops.all);for(const S of h)for(const _ of r.cropHarvested)_(S);const x=YE(t.eggs.all,e.eggs.all);for(const S of x.added)for(const _ of r.eggPlaced)_({egg:S});for(const S of x.removed)for(const _ of r.eggRemoved)_({egg:S});const b=qE(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const S of b)for(const _ of r.eggMatured)_({egg:S});const C=JE(t.decors.all,e.decors.all);for(const S of C.added)for(const _ of r.decorPlaced)_({decor:S});for(const S of C.removed)for(const _ of r.decorRemoved)_({decor:S});}async function c(){if(n)return;const d=await LS.onChangeNow(p=>{i.garden=p,a.add("garden"),l();});o.push(d);const u=await xe.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),l();});o.push(u),n=true,a.size===s&&(e=If(i,bd));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribePlantAdded(d,u){if(r.plantAdded.add(d),u?.immediate&&n&&a.size===s)for(const p of e.plants.all)d({plant:p});return ()=>r.plantAdded.delete(d)},subscribePlantRemoved(d,u){return r.plantRemoved.add(d),()=>r.plantRemoved.delete(d)},subscribePlantMatured(d,u){if(r.plantMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.plants.mature)d({plant:p});return ()=>r.plantMatured.delete(d)},subscribeCropMutated(d,u){if(r.cropMutated.add(d),u?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)d({crop:p,added:p.mutations,removed:[]});return ()=>r.cropMutated.delete(d)},subscribeCropMatured(d,u){if(r.cropMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.crops.mature)d({crop:p});return ()=>r.cropMatured.delete(d)},subscribeCropHarvested(d,u){return r.cropHarvested.add(d),()=>r.cropHarvested.delete(d)},subscribeEggPlaced(d,u){if(r.eggPlaced.add(d),u?.immediate&&n&&a.size===s)for(const p of e.eggs.all)d({egg:p});return ()=>r.eggPlaced.delete(d)},subscribeEggRemoved(d,u){return r.eggRemoved.add(d),()=>r.eggRemoved.delete(d)},subscribeEggMatured(d,u){if(r.eggMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)d({egg:p});return ()=>r.eggMatured.delete(d)},subscribeDecorPlaced(d,u){if(r.decorPlaced.add(d),u?.immediate&&n&&a.size===s)for(const p of e.decors.all)d({decor:p});return ()=>r.decorPlaced.delete(d)},subscribeDecorRemoved(d,u){return r.decorRemoved.add(d),()=>r.decorRemoved.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=false;}}}let gc=null;function sr(){return gc||(gc=QE()),gc}const Pf={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Lf(e,t){const n=El(e.xp),o=Gi(e.petSpecies,e.targetScale),r=Hi(e.petSpecies,e.xp,o),i=Tl(e.petSpecies,n),l=J.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,c=e.hunger/l*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:c,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:i}}function ZE(e,t){const o=t[e.slot.id]?.lastAbilityTrigger??null,r=El(e.slot.xp),i=Gi(e.slot.petSpecies,e.slot.targetScale),a=Hi(e.slot.petSpecies,e.slot.xp,i),s=Tl(e.slot.petSpecies,r),d=J.get("pets")?.[e.slot.petSpecies]?.coinsToFullyReplenishHunger??1,u=e.slot.hunger/d*100;return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,hungerPercent:u,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:a,maxStrength:i,isMature:s}}const Mf=500;let Mt=[],rs=0;function eT(){try{const e=ye(Ye.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(rs=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function tT(e){try{we(Ye.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function nT(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function oT(e){if(!e||!Array.isArray(e))return;const t=uh(e),n=[];for(const o of t)if(o.timestamp>rs){const r=nT(o);r&&n.push(r);}n.length!==0&&(rs=Math.max(...n.map(o=>o.performedAt),rs),Mt=[...n,...Mt],Mt.length>Mf&&(Mt=Mt.slice(0,Mf)),tT(Mt),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${Mt.length})`));}function Rf(e){const t=new Set,n=[];for(const f of e.active??[]){const g=ZE(f,e.slotInfos??{});n.push(g),t.add(g.id);}const o=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Lf(f,"inventory");o.push(g),t.add(g.id);}const r=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Lf(f,"hutch");r.push(g),t.add(g.id);}const i=[...n,...o,...r],a=e.expandedPetSlotId??null,s=a?i.find(f=>f.id===a)??null:null,d=sr().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length},hutch:{hasHutch:d,currentItems:u,maxItems:25},expandedPetSlotId:a,expandedPet:s,abilityLogs:[...Mt]}}const Nf={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function rT(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Of(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function iT(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Of),o=t.all.map(Of);return rT(n,o)}function aT(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location});}return n}function sT(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){if(!r.lastAbilityTrigger)continue;const a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger});}return n}function lT(e,t){const n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function cT(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.growthStage>i.growthStage&&n.push({pet:r,previousStage:i.growthStage,newStage:r.growthStage});}return n}function dT(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength>i.currentStrength&&n.push({pet:r,previousStrength:i.currentStrength,newStrength:r.currentStrength});}return n}function uT(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength===r.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:r});}return n}function pT(){let e=Nf,t=Nf,n=false;const o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Pf),s=new Set;function l(){if(s.size<a.length)return;if(i.activityLogs){const b=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(b)&&oT(b);}const d=Rf(i);if(Et(e,d)||(t=e,e=d,!n))return;for(const b of r.all)b(e,t);if(!iT(t,e))for(const b of r.stable)b(e,t);const u=aT(t,e);for(const b of u)for(const C of r.location)C(b);const p=sT(t,e);for(const b of p)for(const C of r.ability)C(b);const f=lT(t,e);if(f)for(const b of r.count)b(f);const g=cT(t,e);for(const b of g)for(const C of r.growth)C(b);const h=dT(t,e);for(const b of h)for(const C of r.strengthGain)C(b);const x=uT(t,e);for(const b of x)for(const C of r.maxStrength)C(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){const b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const C of r.expandedPet)C(b);}}async function c(){if(n)return;Mt=eT(),console.log(`[myPets] Loaded ${Mt.length} ability logs from storage`);const d=a.map(async u=>{const p=Pf[u],f=await xe.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=Rf(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeLocation(d,u){if(r.location.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,from:p.location,to:p.location});return ()=>r.location.delete(d)},subscribeAbility(d,u){if(r.ability.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&d({pet:p,trigger:p.lastAbilityTrigger});return ()=>r.ability.delete(d)},subscribeCount(d,u){return r.count.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(d)},subscribeExpandedPet(d,u){return r.expandedPet.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(d)},subscribeGrowth(d,u){if(r.growth.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>r.growth.delete(d)},subscribeStrengthGain(d,u){if(r.strengthGain.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>r.strengthGain.delete(d)},subscribeMaxStrength(d,u){if(r.maxStrength.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&d({pet:p});return ()=>r.maxStrength.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=false;}}}let mc=null;function po(){return mc||(mc=pT()),mc}const $f={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Df={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Ff(e){const t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex;let i=null;return r!==null&&r>=0&&r<n.length&&(i={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Bf(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function fT(e,t){return Bf(e)===Bf(t)}function gT(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function _a(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function mT(e,t){const n=new Set(e.map(_a)),o=new Set(t.map(_a)),r=t.filter(a=>!n.has(_a(a))),i=e.filter(a=>!o.has(_a(a)));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:{before:e.length,after:t.length}}}function hT(e,t){const n=new Set(e),o=new Set(t),r=t.filter(a=>!n.has(a)),i=e.filter(a=>!o.has(a));return r.length===0&&i.length===0?null:{added:r,removed:i,current:t}}function bT(){let e=Df,t=Df,n=false;const o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys($f),s=new Set;function l(){if(s.size<a.length)return;const d=Ff(i);if(Et(e,d)||(t=e,e=d,!n))return;for(const f of r.all)f(e,t);if(!fT(t,e))for(const f of r.stable)f(e,t);if(gT(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of r.selection)g(f);}const u=mT(t.items,e.items);if(u)for(const f of r.items)f(u);const p=hT(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of r.favorites)f(p);}async function c(){if(n)return;const d=a.map(async u=>{const p=$f[u],f=await xe.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=Ff(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeSelection(d,u){return r.selection.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(d)},subscribeItems(d,u){return r.items.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(d)},subscribeFavorites(d,u){return r.favorites.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=false;}}}let hc=null;function At(){return hc||(hc=bT()),hc}const yd={all:[],host:null,myPlayer:null,count:0};function xT(e,t,n){const o=n.get(e.id),r=o?.slot,i=r?.data,a=r?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function zf(e){const t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[],r=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return yd;const i=new Map;Array.isArray(o)&&o.forEach((c,d)=>{c?.type==="user"&&c?.playerId&&i.set(c.playerId,{slot:c,index:d});});const a=t.map(c=>xT(c,n,i)),s=a.find(c=>c.isHost)??null,l=r!==null?a.find(c=>c.slotIndex===r)??null:null;return {all:a,host:s,myPlayer:l,count:a.length}}function Gf(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function yT(e,t){const n=[],o=new Set(e.map(i=>i.id)),r=new Set(t.map(i=>i.id));for(const i of t)o.has(i.id)||n.push({player:i,type:"join"});for(const i of e)r.has(i.id)||n.push({player:i,type:"leave"});return n}function vT(e,t){const n=[],o=new Map(e.map(r=>[r.id,r]));for(const r of t){const i=o.get(r.id);i&&i.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected});}return n}function wT(){let e=yd,t=yd,n=false;const o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=4;function l(){if(a.size<s)return;const d=zf(i);if(Et(e,d)||(t=e,e=d,!n))return;for(const h of r.all)h(e,t);if(Gf(t)!==Gf(e))for(const h of r.stable)h(e,t);const u=yT(t.all,e.all);for(const h of u)for(const x of r.joinLeave)x(h);const p=vT(t.all,e.all);for(const h of p)for(const x of r.connection)x(h);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const h={current:e.host,previous:t.host};for(const x of r.host)x(h);}}async function c(){if(n)return;const d=await IS.onChangeNow(g=>{i.players=g,a.add("players"),l();});o.push(d);const u=await PS.onChangeNow(g=>{i.hostPlayerId=g,a.add("hostPlayerId"),l();});o.push(u);const p=await AS.onChangeNow(g=>{i.userSlots=g,a.add("userSlots"),l();});o.push(p);const f=await xe.subscribe("myUserSlotIdxAtom",g=>{i.myUserSlotIndex=g,a.add("myUserSlotIndex"),l();});o.push(f),n=true,a.size===s&&(e=zf(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribeJoinLeave(d,u){if(r.joinLeave.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)d({player:p,type:"join"});return ()=>r.joinLeave.delete(d)},subscribeConnection(d,u){if(r.connection.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)d({player:p,isConnected:p.isConnected});return ()=>r.connection.delete(d)},subscribeHost(d,u){return r.host.add(d),u?.immediate&&n&&a.size===s&&d({current:e.host,previous:e.host}),()=>r.host.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=false;}}}let bc=null;function op(){return bc||(bc=wT()),bc}const bb=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:op},Symbol.toStringTag,{value:"Module"})),qi=["seed","tool","egg","decor"];function CT(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function ST(e,t,n){const o=CT(e,t),r=n[o]??0,i=Math.max(0,e.initialStock-r);return {id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:i,isAvailable:i>0,price:e.price}}function kT(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const r=n[e]?.purchases??{},i=(t.inventory??[]).map(c=>ST(c,e,r)),a=i.filter(c=>c.isAvailable).length,s=t.secondsUntilRestock??0,l=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:l}}function Hf(e){const t=e.shops,n=e.purchases??{},o=qi.map(s=>kT(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},i=o.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const l=i.sort((c,d)=>(c.restockAt??0)-(d.restockAt??0))[0];a={shop:l.type,seconds:l.secondsUntilRestock,at:l.restockAt};}return {all:o,byType:r,nextRestock:a}}const jf={all:qi.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Uf(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function _T(e,t){const n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function ET(e,t){const n=[];for(const o of qi){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const l=a.get(s.id);l&&s.purchased>l.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-l.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function TT(e,t){const n=[];for(const o of qi){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const l=a.get(s.id);l&&l.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:l.isAvailable,isAvailable:s.isAvailable});}}return n}function AT(){let e=jf,t=jf,n=false;const o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function l(){if(a.size<s)return;const d=Hf(i);if(Et(e,d)||(t=e,e=d,!n))return;for(const g of r.all)g(e,t);if(Uf(t)!==Uf(e))for(const g of r.stable)g(e,t);const u={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(const g of qi){const h=_T(t.byType[g],e.byType[g]);if(h)for(const x of u[g])x(h);}const p=ET(t,e);for(const g of p)for(const h of r.purchase)h(g);const f=TT(t,e);for(const g of f)for(const h of r.availability)h(g);}async function c(){if(n)return;const d=await MS.onChangeNow(p=>{i.shops=p,a.add("shops"),l();});o.push(d);const u=await RS.onChangeNow(p=>{i.purchases=p,a.add("purchases"),l();});o.push(u),n=true,a.size===s&&(e=Hf(i));}return c(),{get(){return e},getShop(d){return e.byType[d]},getItem(d,u){return e.byType[d].items.find(f=>f.id===u)??null},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribeSeedRestock(d,u){return r.seedRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(d)},subscribeToolRestock(d,u){return r.toolRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(d)},subscribeEggRestock(d,u){return r.eggRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(d)},subscribeDecorRestock(d,u){return r.decorRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(d)},subscribePurchase(d,u){if(r.purchase.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&d({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>r.purchase.delete(d)},subscribeAvailability(d,u){if(r.availability.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)d({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>r.availability.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=false;}}}let xc=null;function lr(){return xc||(xc=AT()),xc}function xb(e){const t=e||"Sunny",r=J.get("weather")?.[t]?.name||t;return {id:t,name:r,isActive:t!=="Sunny",type:t,startTime:null,endTime:null,remainingSeconds:0}}function Wf(){return xb(null)}function IT(){let e=Wf(),t=Wf(),n=null,o=false,r=null;const i={all:new Set,stable:new Set};function a(l){const c=(l||"Sunny")!==(n||"Sunny");n=l;const d=xb(l),u=e.id!==d.id;if(t=e,e=d,!!o){if(c)for(const p of i.all)p(e,t);if(u){const p={current:e,previous:t};for(const f of i.stable)f(p);}}}async function s(){o||(r=await xe.subscribe("weatherAtom",l=>{a(l);}),o=true);}return s(),{get(){return e},subscribe(l,c){return i.all.add(l),c?.immediate!==false&&o&&l(e,e),()=>i.all.delete(l)},subscribeStable(l,c){return i.stable.add(l),c?.immediate&&o&&l({current:e,previous:e}),()=>i.stable.delete(l)},destroy(){r?.(),r=null,i.all.clear(),i.stable.clear(),o=false;}}}let yc=null;function Ki(){return yc||(yc=IT()),yc}let Xe=null;function yb(){return Xe||(Xe={currentTile:Le(),myPets:po(),gameMap:bd(),myInventory:At(),players:op(),shops:lr(),weather:Ki(),myGarden:sr()},Xe)}function Wt(){if(!Xe)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Xe}function PT(){Xe&&(Xe.currentTile.destroy(),Xe.myPets.destroy(),Xe.gameMap.destroy(),Xe.myInventory.destroy(),Xe.players.destroy(),Xe.shops.destroy(),Xe.weather.destroy(),Xe.myGarden.destroy(),Xe=null);}const fe={get currentTile(){return Wt().currentTile},get myPets(){return Wt().myPets},get gameMap(){return Wt().gameMap},get myInventory(){return Wt().myInventory},get players(){return Wt().players},get shops(){return Wt().shops},get weather(){return Wt().weather},get myGarden(){return Wt().myGarden}};function LT(e){const t=Wu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function MT(e){const o=fe.shops.getShop("seed").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Wu(e);l.ok?a++:i.push(l.reason||`Failed to purchase seed ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function RT(e){const t=ju(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function NT(e){const o=fe.shops.getShop("egg").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=ju(e);l.ok?a++:i.push(l.reason||`Failed to purchase egg ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function OT(e){const t=Hu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function $T(e){const o=fe.shops.getShop("decor").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Hu(e);l.ok?a++:i.push(l.reason||`Failed to purchase decor ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function DT(e){const t=Uu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function FT(e){const o=fe.shops.getShop("tool").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Uu(e);l.ok?a++:i.push(l.reason||`Failed to purchase tool ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}let vc=false;const Un={init(){vc||(vc=true,console.log("[MGShopActions] Initialized"));},isReady(){return vc},seed:{buy:LT,buyAll:MT},egg:{buy:RT,buyAll:NT},decor:{buy:OT,buyAll:$T},tool:{buy:DT,buyAll:FT}};async function vb(e){const t=[{name:"Data",init:()=>J.init()},{name:"CustomModal",init:()=>Mo.init()},{name:"Sprites",init:()=>Y.init()},{name:"TileObjectSystem",init:()=>tn.init()},{name:"Pixi",init:()=>yl.init()},{name:"Audio",init:()=>Oe.init()},{name:"Cosmetics",init:()=>Ku.init()},{name:"ShopActions",init:()=>Un.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const rp=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:lo,MGAudio:Oe,MGCalculators:mb,MGCosmetic:Ku,MGCustomModal:Mo,MGData:J,MGEnvironment:Je,MGManifest:Jt,MGPixi:yl,MGPixiHooks:ft,MGShopActions:Un,MGSprite:Y,MGTile:tn,MGVersion:hu,PET_ABILITY_ACTIONS:ch,filterPetAbilityLogs:uh,formatAbilityLog:ph,initAllModules:vb,isPetAbilityAction:dh},Symbol.toStringTag,{value:"Module"}));function BT(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function zT(e){return e.toLowerCase()}function Xi(e={}){const{id:t,label:n="",type:o="neutral",tone:r="soft",border:i,withBorder:a,pill:s=true,size:l="md",onClick:c,variant:d="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=m("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),l==="sm"?g.classList.add("badge--sm"):l==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),c&&g.addEventListener("click",c);let h=false,x=a;function b(){h||(x===false?g.style.border="none":g.style.border="");}function C(y,T=r){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${y}`,`badge--${T}`),b();}function S(y){const T=(y??"").trim();T?(g.style.border=T,h=true):(h=false,b());}function _(y){x=y,b();}function E(y){g.textContent=y;}function v(y,T=r){C(y,T);}function w(y){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const T=BT(y);if(!T){g.textContent=String(y??"—");return}g.textContent=T,g.classList.add("badge--rarity",`badge--rarity-${zT(T)}`);}function k(y,T){const P=J.get("abilities")?.[y],R=P?.color,O=R?.bg||"rgba(100, 100, 100, 0.9)",W=R?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=T||P?.name||y||"Unknown Ability",g.style.background=O,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const N=()=>{g.style.background=W;},F=()=>{g.style.background=O;};g.removeEventListener("mouseenter",N),g.removeEventListener("mouseleave",F),g.addEventListener("mouseenter",N),g.addEventListener("mouseleave",F);}return d==="rarity"?w(u):d==="ability"?k(p,f):(g.textContent=n,C(o,r),typeof a=="boolean"&&_(a),i&&S(i)),{root:g,setLabel:E,setType:v,setBorder:S,setWithBorder:_,setRarity:w,setAbility:k}}const GT={expanded:false,sort:{key:null,dir:null},search:""},HT={categories:{}};async function jT(){const e=await En("tab-test",{version:2,defaults:HT,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...GT}}function n(i,a){const s=e.get(),l=t(i);e.update({categories:{...s.categories,[i]:{...l,expanded:a}}});}function o(i,a,s){const l=e.get(),c=t(i);e.update({categories:{...l.categories,[i]:{...c,sort:{key:a,dir:s}}}});}function r(i,a){const s=e.get(),l=t(i);e.update({categories:{...s.categories,[i]:{...l,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}const UT={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Ea(e){return e?UT[e]??0:0}class WT extends nn{constructor(){super({id:"tab-test",label:"Test"});j(this,"stateCtrl",null);}async build(n){this.stateCtrl=await jT();const o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o);}renderSprite(n){const o=m("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const r=n.spriteId;requestAnimationFrame(()=>{try{const i=Y.toCanvas(r,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",o.appendChild(i);}catch{o.textContent="-";}});}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){const r=m("span",{style:"opacity:0.5;"});return r.textContent="—",r}return Xi({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;const f=p.toLowerCase();return r.filter(g=>g.name.toLowerCase().includes(f))},l=cl({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&l.sortBy(a.sort.key,a.sort.dir);const c=$i({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),l.setData(s(f));}}),d=m("div",{style:"margin-bottom:8px;"});d.appendChild(c.root);const u=m("div");return u.appendChild(d),u.appendChild(l.root),Ee({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){const r=J.get("plants");if(!r)return null;for(const a of Object.values(r))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=o.toLowerCase();for(const a of Object.values(r)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const o=J.get("pets");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){const o=J.get("items");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){const o=J.get("decor");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){const o=J.get("eggs");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(o,r);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(o);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4);})}async buildSpriteTables(n){const o=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>Ea(i.rarity)-Ea(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!Y.isReady())try{await Y.init();}catch{return}const r=Y.getCategories();for(let i=0;i<r.length;i++){await this.yieldToMain(8);const a=r[i],l=Y.getCategoryId(a).map(c=>{const d=`sprite/${a}/${c}`;return {name:c,spriteId:d,rarity:this.getRarityForSprite(a,d,c)}});if(l.sort((c,d)=>Ea(c.rarity)-Ea(d.rarity)),l.length>0){const c=this.createDataCard(a,this.formatCategoryName(a),l,o);n.appendChild(c);}}}}function Pe(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o);}const wb=`
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
`,VT={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Gn=null;async function qT(){if(Gn)return Gn;Gn=await En("tab-auto-favorite",{version:1,defaults:VT});const e=ye(_e.AUTO_FAVORITE_UI,null);return e&&(await Gn.set(e),kv(_e.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Gn}function vt(){if(!Gn)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Gn}const ip=_e.AUTO_FAVORITE,Cb={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function io(){return ye(ip,Cb)}function ap(e){we(ip,e);}function Sb(e){const n={...io(),...e};return ap(n),n}function sp(e){const t=io();return t.mode="simple",t.simple={...t.simple,...e},ap(t),t}function KT(e){sp({favoriteSpecies:e});}function XT(e){sp({favoriteMutations:e});}function Vf(){return io().enabled}let is=null;const Jr=new Set;function vd(){const e=io();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Jr.clear(),is=At().subscribeItems(t=>{if(t.added.length>0){const n=io();for(const o of t.added)JT(o,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function kb(){is&&(is(),is=null),Jr.clear(),console.log("🛑 [AutoFavorite] Stopped");}function YT(e){const t=io();t.enabled=e,t.simple.enabled=e,Sb(t),e?vd():kb();}function JT(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Jr.has(e.id)||e.isFavorited||e.favorited)&&_b(e,t.simple)){Jr.add(e.id);try{kl(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(o){console.error("[AutoFavorite] WebSocket error:",o),Jr.delete(e.id);}}}function _b(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(r=>t.favoriteMutations.includes(r))):false}function QT(){return Object.keys(J.get("mutations")??{})}const Eb={init(){this.isReady()||vd();},isReady(){return Vf()},DEFAULT_CONFIG:Cb,STORAGE_KEY:ip,loadConfig:io,saveConfig:ap,updateConfig:Sb,updateSimpleConfig:sp,setFavoriteSpecies:KT,setFavoriteMutations:XT,isEnabled:Vf,start:vd,stop:kb,setEnabled:YT,shouldFavorite:_b,getGameMutations:QT};let wc=null,qf=null;function Tb(){try{return op().get().myPlayer?.journal||null}catch{return null}}function ZT(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Ab(){const e=J.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Ib(){return ["Normal","Gold","Rainbow","Max Weight"]}function eA(){return Object.keys(J.get("mutations")??{})}function Pb(e){const n=(J.get("pets")??{})[e];if(!n?.innateAbilityWeights||typeof n.innateAbilityWeights!="object")return [];const o=n.innateAbilityWeights,r=["RainbowGranter","GoldGranter"];return Object.keys(o).filter(i=>!r.includes(i))}function Lb(e){const t=J.get("plants")??{},n=Object.keys(t),o=Ab(),r=e?.produce??{},i=[];let a=0;for(const c of n){const u=r[c]?.variantsLogged?.map(f=>f.variant)??[],p=o.filter(f=>!u.includes(f));a+=u.length,i.push({species:c,variantsLogged:u,variantsMissing:p,variantsTotal:o.length,variantsPercentage:o.length>0?u.length/o.length*100:0,isComplete:p.length===0});}const s=n.length*o.length,l=i.filter(c=>c.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function Mb(e){const t=J.get("pets")??{},n=Object.keys(t),o=Ib(),r=e?.pets??{},i=[];let a=0,s=0,l=0,c=0;for(const u of n){const p=r[u],f=p?.variantsLogged?.map(S=>S.variant)??[],g=p?.abilitiesLogged?.map(S=>S.ability)??[],h=o.filter(S=>!f.includes(S)),x=Pb(u),b=g.filter(S=>x.includes(S)),C=x.filter(S=>!b.includes(S));s+=o.length,a+=f.length,c+=x.length,l+=Math.min(b.length,x.length),i.push({species:u,variantsLogged:f,variantsMissing:h,variantsTotal:o.length,variantsPercentage:o.length>0?f.length/o.length*100:0,abilitiesLogged:b,abilitiesMissing:C,abilitiesTotal:x.length,abilitiesPercentage:x.length>0?b.length/x.length*100:0,isComplete:h.length===0&&(x.length===0||C.length===0)});}const d=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:d,percentage:n.length>0?d/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:c,abilitiesLogged:l,abilitiesPercentage:c>0?l/c*100:0}}async function Il(e=false){await J.waitForAny();const t=Tb(),n=ZT(t);if(!e&&wc&&n===qf)return wc;const o={plants:Lb(t),pets:Mb(t),lastUpdated:Date.now()};return wc=o,qf=n,o}async function tA(){const e=await Il();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let Qr=null,wd=false;function nA(){wd||(wd=true,Qr||(Qr=setInterval(async()=>{const e=await Il();lp(e);},3e4)),console.log("[Journal] Started"));}function oA(){Qr&&(clearInterval(Qr),Qr=null),wd=false;}function lp(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function rA(){const e=await Il();return lp(e),e}function iA(e){try{const t=He.getMyJournal();if(!t?.pets)return [];const n=t.pets[e];return n?.abilitiesLogged?n.abilitiesLogged.map(o=>o.ability):[]}catch(t){return console.error("[AbilitiesInject] Failed to get logged abilities:",t),[]}}function aA(e,t){try{const n=He.getMyJournal();if(!n?.pets)return;const o=n.pets[e];return o?.abilitiesLogged?o.abilitiesLogged.find(i=>i.ability===t)?.createdAt:void 0}catch(n){console.error("[AbilitiesInject] Failed to get ability log date:",n);return}}function cp(e){try{const t=J.getAll();if(!t?.pets)return [];const n=t.pets[e];if(!n)return [];if(n.innateAbilityWeights&&typeof n.innateAbilityWeights=="object"){const o=n.innateAbilityWeights,r=["RainbowGranter","GoldGranter"];return Object.entries(o).filter(([i])=>!r.includes(i)).sort(([,i],[,a])=>a-i).map(([i])=>i)}return []}catch(t){return console.error("[AbilitiesInject] Failed to get all abilities:",t),[]}}function sA(e){try{const t=J.getAll();if(!t?.abilities)return e;const n=t.abilities[e];if(!n)return e;const o=n.name;if(typeof o=="string")return o;const r=n.displayName;return typeof r=="string"?r:e}catch(t){return console.error("[AbilitiesInject] Failed to get ability name:",t),e}}function dp(e){try{const t=["RainbowGranter","GoldGranter"],n=iA(e),o=cp(e),r=n.filter(l=>!t.includes(l)),i=o.filter(l=>!r.includes(l)),a=o.length,s=a>0?r.length/a*100:0;return {logged:r,missing:i,total:a,percentage:s}}catch(t){return console.error("[AbilitiesInject] Failed to calculate progress:",t),{logged:[],missing:[],total:0,percentage:0}}}function lA(e){const t=new Date(e),n=t.toLocaleDateString("en-US",{month:"short"}),o=t.getDate(),r=t.getFullYear();return `${n} ${o}, ${r}`}function cA(e){const n=J.get("abilities")?.[e];return {bg:n?.color?.bg||"rgba(100, 100, 100, 0.9)",hover:n?.color?.hover||"rgba(150, 150, 150, 1)"}}function dA(e,t,n,o){const r=n?aA(e,t):void 0,i=document.createElement("div");i.className="gemini-ability-entry",i.style.cssText=`
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    align-items: center;
    justify-items: center;
  `;const a=o?"80px":"100px",s=document.createElement("div");if(s.className="gemini-ability-stamp",r){const c=`Logged on ${lA(r)}`;s.style.cursor="help";let d=null;s.addEventListener("mouseenter",()=>{d=document.createElement("div"),d.textContent=c,d.style.cssText=`
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
      `,document.body.appendChild(d);const u=s.getBoundingClientRect(),p=d.offsetHeight,f=d.offsetWidth;let g=u.left+u.width/2-f/2,h=u.top-p-8;h<8&&(h=u.bottom+8),g<8&&(g=8),g+f>window.innerWidth-8&&(g=window.innerWidth-f-8),d.style.left=`${g}px`,d.style.top=`${h}px`,requestAnimationFrame(()=>{d&&(d.style.opacity="1",d.style.transform="scale(1)");});}),s.addEventListener("mouseleave",()=>{d&&(d.remove(),d=null);});}const l=Im();l||console.error("[AbilitiesInject] Base URL not available - modules may not be initialized"),s.style.cssText=`
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
  `;try{const c=Y.toCanvas("pet",e,{scale:.7,boundsMode:"padded"});if(c){const d=o?"56px":"70px";c.style.position="absolute",c.style.top="50%",c.style.left="50%",c.style.transform="translate(-50%, -50%)",c.style.width=d,c.style.height=d,c.style.objectFit="contain",c.style.imageRendering="pixelated",c.style.zIndex="1",n||(c.style.filter="grayscale(1) brightness(0.16)"),s.appendChild(c);}else {const d=document.createElement("div");d.textContent="ðŸ¾",d.style.fontSize="32px",d.style.position="absolute",d.style.top="50%",d.style.left="50%",d.style.transform="translate(-50%, -50%)",d.style.zIndex="1",s.appendChild(d);}}catch(c){console.warn("[AbilitiesInject] Failed to load pet sprite:",e,c);const d=document.createElement("div");d.textContent="ðŸ¾",d.style.fontSize="32px",d.style.position="absolute",d.style.top="50%",d.style.left="50%",d.style.transform="translate(-50%, -50%)",d.style.zIndex="1",s.appendChild(d);}if(n){const c=sA(t),d=cA(t),u=document.createElement("div");u.className="gemini-ability-badge",u.textContent=c,u.style.cssText=`
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
    `,d.textContent="???",c.appendChild(d),i.appendChild(s),i.appendChild(c);}return i}function uA(e,t,n){return [...e.logged,...e.missing].map(r=>{const i=e.logged.includes(r);return dA(t,r,i,n)})}const Ao="p.chakra-text.css-1qd26jh",up="p.chakra-text.css-12b1ql2";let Qo=[],Cd=null,Zr=null,yi=false,js=false;const Kf="gemini-ability-entry";let as=false;const Zn="gemini-overview-updated";let Cc=null;function pA(){const e=document.querySelector(Ao);if(!e)return null;const t=e.textContent?.trim();if(!t||t==="???"||!document.querySelector(up))return null;const o=document.querySelectorAll("div.McGrid");let r=null;for(const i of o){const a=i.textContent||"",s=a.includes("Normal"),l=a.includes("Gold"),c=a.includes("Max Weight"),d=a.includes("Rainbow"),u=a.includes("???"),p=[s,l,c,d,u].filter(Boolean).length,f=a.includes("Crops")||a.includes("Pets"),g=a.includes("Collected"),h=a.includes("Back");if(p>=2&&!f&&!g&&!h){r=i;break}}return r?{speciesName:t,variantGrid:r}:null}function Rb(e){const t=J.get("pets")??{};for(const[o,r]of Object.entries(t)){const i=r;if(i.name===e||i.displayName===e||o===e)return o}const n=e.toLowerCase();for(const[o,r]of Object.entries(t)){const i=r,a=typeof i.name=="string"?i.name:void 0,s=typeof i.displayName=="string"?i.displayName:void 0;if(a&&a.toLowerCase()===n||s&&s.toLowerCase()===n||o.toLowerCase()===n)return o}return n.replace(/\s+/g,"")}function Nb(e){const t=J.get("pets")??{};return e in t}function Us(){const e=document.querySelector(".gemini-journal-allTab");if(e){const r=e.querySelector(".gemini-allTab-tab");if(r instanceof HTMLElement&&r.offsetHeight>25)return "All"}const t=document.querySelectorAll("button");let n=null,o=null;for(const r of t){const i=r.textContent?.trim();i==="Crops"&&(n=r),i==="Pets"&&(o=r);}if(!n&&!o)return null;if(n&&o){const r=n.offsetHeight,i=o.offsetHeight;if(r>i)return "Crops";if(i>r)return "Pets";if(n.getAttribute("aria-selected")==="true")return "Crops";if(o.getAttribute("aria-selected")==="true")return "Pets"}return o&&o.offsetParent?"Pets":n&&n.offsetParent?"Crops":null}function Ob(){if(!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.includes("GARDEN JOURNAL"))||!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.match(/Collected\s+\d+%/)))return  false;const n=document.querySelector(Ao);return n&&!n.textContent?.includes("GARDEN")?false:Us()==="Pets"}function fA(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(h=>h.textContent?.match(/Collected\s+\d+%/));if(!e||Us()!=="Pets")return  false;if(e.classList.contains(Zn))return  true;const n=e.querySelector("span.chakra-text");if(!n)return  false;const o=n.textContent?.match(/\((\d+)\/(\d+)\)/);if(!o)return  false;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=J.get("pets")??{},s=Object.keys(a).length*4,l=s*.25;if(Math.abs(i-s)>l)return  false;if(!e.hasAttribute("data-original-percent")){const h=e.textContent?.match(/Collected\s+(\d+)%/);h&&e.setAttribute("data-original-percent",h[1]);}n.hasAttribute("data-original-count")||n.setAttribute("data-original-count",n.textContent||"");let c=0,d=0;for(const h of Object.keys(a)){const x=cp(h),b=dp(h);c+=x.length,d+=b.logged.length;}const u=r+d,p=i+c,f=Math.floor(u/p*100),g=e.childNodes[0];return g&&g.nodeType===Node.TEXT_NODE&&(g.textContent=`Collected ${f}% `),n.textContent=`(${u}/${p})`,e.classList.add(Zn),true}function gA(){J.get("pets");const e=document.querySelectorAll("p.chakra-text");for(const t of e){const n=t.textContent||"";if(!n.match(/^\d+\/\d+$/)||t.classList.contains(Zn))continue;const o=n.match(/^(\d+)\/(\d+)$/);if(!o)continue;const r=parseInt(o[1],10),i=parseInt(o[2],10);let a=null,s=t,l=false;for(;s&&!l;){if(s.classList.contains("McGrid")){const h=s.querySelectorAll("p.chakra-text");for(const x of h){const b=x.textContent||"";if(b!=="???"&&!b.includes("/")&&b.length>2&&b.length<30){a=x,l=true;break}}}s=s.parentElement;}if(!a)continue;const c=a.textContent?.trim();if(!c)continue;const d=Rb(c);if(!d||!Nb(d))continue;const u=cp(d),p=dp(d);if(u.length===0)continue;const f=r+p.logged.length,g=i+u.length;t.textContent=`${f}/${g}`,t.classList.add(Zn);}}function mA(){if(!Ob()){as=false;return}if(!as)try{const e=fA();gA(),e&&(as=!0);}catch(e){console.error("[AbilitiesInject] Failed to update overview page:",e);}}function Sd(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(t=>t.hasAttribute("data-original-percent"));if(e){const t=e.getAttribute("data-original-percent");if(t){const o=e.childNodes[0];o&&o.nodeType===Node.TEXT_NODE&&(o.textContent=`Collected ${t}% `);}e.removeAttribute("data-original-percent"),e.classList.remove(Zn);const n=e.querySelector("span.chakra-text");if(n){const o=n.getAttribute("data-original-count");o&&(n.textContent=o),n.removeAttribute("data-original-count");}}document.querySelectorAll(`.${Zn}`).forEach(t=>{t.classList.remove(Zn);}),as=false;}function hA(){return window.innerWidth<768}function bA(e,t){const n=document.querySelector(up);if(!n)return;const o=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!o)return;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=r+e,s=i+t;n.textContent=`Collected ${a}/${s}`;}function xA(e,t){try{js=!0,Vt();const n=dp(t);if(n.total===0)return;const o=uA(n,t,hA());for(const r of o)e.appendChild(r),Qo.push(r);bA(n.logged.length,n.total),Or={logged:n.logged.length,total:n.total};}catch(n){console.error("[AbilitiesInject] Failed to inject:",n),Vt();}finally{setTimeout(()=>{js=false;},0);}}function yA(e,t){const n=document.querySelector(up);if(!n)return;const o=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!o)return;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=r-e,s=i-t;n.textContent=`Collected ${a}/${s}`;}let Or=null;function Vt(){Or&&(yA(Or.logged,Or.total),Or=null);for(const e of Qo)e.remove();Qo=[],Cd=null,js=false;}function Bn(){if(js)return;const e=Us();e!==Cc&&(Cc==="Pets"&&e!=="Pets"&&(Sd(),Vt()),Cc=e);const t=Us();if(Ob()&&t==="Pets"){Vt(),mA();return}Sd();const n=pA();if(!n){Vt();return}const o=Rb(n.speciesName);if(!o){Vt();return}if(!Nb(o)){Vt();return}o===Cd&&Qo.length>0&&Qo[0].isConnected||(Cd=o,xA(n.variantGrid,o));}function vA(){Bn(),setTimeout(()=>{Bn();},100),setTimeout(()=>{Bn();},500),setTimeout(()=>{Bn();},1e3),Zr=new MutationObserver(e=>{for(const t of e)t.type==="childList"&&(t.addedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Kf)||Qo.includes(n))return;const o=n.textContent||"";(o.includes("GARDEN JOURNAL")||o.includes("Collected")||o.includes("Chicken")||o.includes("Bunny"))&&Bn(),(n.matches?.(Ao)||n.querySelector?.(Ao))&&Bn(),(n.matches?.("div.McGrid")||n.querySelector?.("div.McGrid"))&&Bn();}}),t.removedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Kf))return;(n.matches?.(Ao)||n.querySelector?.(Ao))&&Vt();}}));}),Zr.observe(document.body,{childList:true,subtree:true});}function wA(){Zr&&(Zr.disconnect(),Zr=null),Vt(),Sd();}function CA(){yi||(yi=true,vA());}function SA(){yi&&(yi=false,wA());}function kA(){return yi}const _A={init:CA,destroy:SA,isEnabled:kA};function qe(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function fo(e,t){e.add(()=>t.disconnect());}let ss=false;function cr(){return ss}function Ht(e){if(!ss){ss=true;try{e();}finally{ss=false;}}}const EA={Normal:"Normal: Harvest a {cropName} and log it without any mutations.",Wet:"Wet is the most common mutation, gained during the Rain weather event.",Chilled:"The Chilled mutation is gained during the Snow weather event.",Frozen:"The Frozen mutation is obtained from Wet crops during the Snow weather event, or Chilled crops during Rain.",Dawnlit:"The Dawnlit mutation is gained during the Dawn weather event.",Ambershine:"The Amberlit mutation is gained during the Amber Moon weather event.",Gold:"Gold is a rare mutation that appears in 1% of newly planted crops. Pets with the Gold Granter ability have a small chance to apply the Gold mutation to a random crop.",Rainbow:"Rainbow is a very rare mutation that appears in 0.1% of newly planted crops.  Pets with the Rainbow Granter ability have a small chance to apply the Rainbow mutation to a random crop.",Dawncharged:"Dawnbound: During the Dawn lunar event, place a {cropName} with the Dawnlit mutation adjacent to a Dawnbinder crop.",Ambercharged:"Amberbound: During the Amber Moon lunar event, place a {cropName} with the Amberlit mutation adjacent to a Moonbinder crop.","Max Weight":"Max weight applies only to size 100 crops (the largest possible). The size of a crop can be checked by hovering over its weight. Obtaining weight 100 crops can be achieved through Crop Size Boost pets."},TA={Normal:"Hatch a {petName} without any mutations",Gold:"All pets have a 1% base chance to hatch with the gold mutation; increase these chances with the Pet Mutation Boost abilities.",Rainbow:"All pets have a 0.1% base chance to hatch with the rainbow mutation; increase these chances with the Pet Mutation Boost abilities.","Max Weight":"Hatch a {petName} with a Max STR of 100, using Max Strength Boost ability is recommended while hatching"},AA={CommonEgg:["Worm","Snail","Bee"],UncommonEgg:["Chicken","Bunny","Dragonfly"],RareEgg:["Pig","Cow","Turkey"],WinterEgg:["SnowFox","Stoat","WhiteCaribou"],LegendaryEgg:["Squirrel","Turtle","Goat"],MythicalEgg:["Butterfly","Peacock","Capybara"]},IA={CommonEgg:"Common Eggs",UncommonEgg:"Uncommon Eggs",RareEgg:"Rare Eggs",WinterEgg:"Winter Eggs",LegendaryEgg:"Legendary Eggs",MythicalEgg:"Mythical Eggs"};function PA(e){for(const[t,n]of Object.entries(AA))if(n.includes(e))return IA[t]||t;return "Eggs"}function LA(e){return `Keep hatching ${PA(e)} to get a pet with this ability`}function MA(e,t){const n=EA[e];return n?n.replace(/\{cropName\}/g,t):`Obtain a ${e} ${t}`}function RA(e,t){const n=TA[e];return n?n.replace(/\{petName\}/g,t):`Obtain a ${e} ${t}`}let ls=null;function NA(e){const t=document.createElement("div");return t.className="gemini-journal-hint",t.textContent=e,t.style.cssText=`
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
  `,t}function OA(e,t){const n=t.getBoundingClientRect(),o=240,r=8;let i=n.left+n.width/2-o/2,a=n.top-40-r;i<8&&(i=8),i+o>window.innerWidth-8&&(i=window.innerWidth-o-8),a<8&&(a=n.bottom+r),e.style.left=`${i}px`,e.style.top=`${a}px`;}function Xf(e,t){Ws();const n=NA(t);document.body.appendChild(n),OA(n,e),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="scale(1)";}),ls=n;}function Ws(){ls&&(ls.remove(),ls=null);}function Pl(e){const t=J.get("plants")??{};for(const[r,i]of Object.entries(t)){const a=i;if(a?.crop?.name===e)return {id:r,type:"crop"};if(a?.plant?.name===e)return {id:r,type:"crop"};if(r===e)return {id:r,type:"crop"}}const n=J.get("pets")??{};for(const[r,i]of Object.entries(n)){const a=i;if(a?.name===e)return {id:r,type:"pet"};if(a?.displayName===e)return {id:r,type:"pet"};if(r===e)return {id:r,type:"pet"}}const o=e.toLowerCase();for(const[r,i]of Object.entries(t)){const a=i;if(a?.crop?.name?.toLowerCase()===o)return {id:r,type:"crop"};if(a?.plant?.name?.toLowerCase()===o)return {id:r,type:"crop"};if(r.toLowerCase()===o)return {id:r,type:"crop"}}for(const[r,i]of Object.entries(n)){const a=i;if(a?.name?.toLowerCase()===o)return {id:r,type:"pet"};if(a?.displayName?.toLowerCase()===o)return {id:r,type:"pet"};if(r.toLowerCase()===o)return {id:r,type:"pet"}}return null}function $b(e,t){if(t==="crop"){const o=(J.get("plants")??{})[e];return o?.crop?.name||o?.plant?.name||e}else {const o=(J.get("pets")??{})[e];return o?.name||o?.displayName||e}}let ei=qe(),Zo=false;const Db="gemini-hint-attached";function $A(){const e=document.querySelectorAll(".chakra-text, p, span");for(const t of e){const n=t.textContent?.trim();if(n&&n!=="???"&&!n.includes("/")&&!n.includes("%")&&!(n==="Crops"||n==="Pets"||n==="All")&&!(n.includes("GARDEN")||n.includes("JOURNAL"))&&!n.includes("Collected")&&n.length>=3&&n.length<=20){const o=Pl(n);if(o)return {displayName:n,id:o.id,type:o.type}}}return null}function DA(){const e=document.querySelectorAll("button");for(const t of e){const n=t.textContent?.trim(),o=t.querySelector('[class*="MotionMcFlex"], .MotionMcFlex, div[style*="height: 35px"]');if(o&&o.offsetHeight>=30){if(n==="Crops")return "crops";if(n==="Pets")return "pets"}}return null}function FA(){const e=[],t=document.querySelectorAll("p"),n=document.querySelectorAll("span"),o=[...t,...n];for(const r of o){if(r.textContent?.trim()!=="???"||!r.offsetParent)continue;let a=r.parentElement,s=null;for(let l=0;l<4&&a&&!s;l++){const c=a.parentElement;if(!c)break;for(const d of Array.from(c.children)){if(!(d instanceof HTMLElement)||d===a)continue;const u=p=>{if(Fb(p))return  true;for(const f of Array.from(p.children))if(f instanceof HTMLElement&&u(f))return  true;return  false};if(u(d)){s=c;break}}a=c;}s&&(s.classList.contains(Db)||e.push(s));}return e}function BA(){return He.getCropVariants()}function kd(){return He.getPetVariants()}function Yf(e,t){return (t==="crops"?BA():kd())[e]??null}function Fb(e){return e.style.backgroundImage&&e.style.backgroundImage.includes("Stamp")?true:window.getComputedStyle(e).backgroundImage.includes("Stamp")}function zA(e){let t=e.parentElement;for(let n=0;n<8&&t;n++){const o=t.querySelectorAll("div"),r=[];for(const i of o)Fb(i)&&r.push(i);if(r.length>=4)return r;t=t.parentElement;}return []}function GA(e,t){let n=e.parentElement;for(let o=0;o<6&&n;o++){const r=[];for(const i of t)n.contains(i)&&r.push(i);if(r.length===1){const i=r[0];return t.indexOf(i)}n=n.parentElement;}return  -1}function HA(e,t){return t>kd().length&&e>=kd().length?"ability":"variant"}function jA(e){const t=$A();if(!t)return;const n=DA();if(!n)return;const o=zA(e);if(o.length===0)return;const r=GA(e,o);if(r===-1)return;let i="";if(n==="crops"){const c=Yf(r,"crops");if(!c)return;i=MA(c,t.displayName);}else if(n==="pets")if(HA(r,o.length)==="variant"){const d=Yf(r,"pets");if(!d)return;i=RA(d,t.displayName);}else i=LA(t.id);e.classList.add(Db);const a=()=>Xf(e,i),s=()=>Ws(),l=c=>{c.stopPropagation(),Xf(e,i),setTimeout(()=>Ws(),3e3);};e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",s),e.addEventListener("click",l),ei.add(()=>{e.removeEventListener("mouseenter",a),e.removeEventListener("mouseleave",s),e.removeEventListener("click",l);});}function Bb(){const e=FA();if(e.length!==0)for(const t of e)jA(t);}function UA(){const e=new MutationObserver(()=>{Zo&&Bb();});e.observe(document.body,{childList:true,subtree:true}),fo(ei,e);}function WA(){Zo||(Zo=true,Bb(),UA());}function VA(){Zo&&(Zo=false,ei.run(),ei.clear(),ei=qe(),Ws());}function qA(){return Zo}const KA=Object.freeze(Object.defineProperty({__proto__:null,destroy:VA,init:WA,isEnabled:qA},Symbol.toStringTag,{value:"Module"}));function Yi(){const e=document.querySelectorAll('.chakra-box, [class*="Box"], div');for(const n of e)if(n.style.backgroundImage?.includes("GardenJournal")||window.getComputedStyle(n).backgroundImage?.includes("GardenJournal"))return n;const t=document.querySelectorAll(".chakra-text, p, span");for(const n of t)if(n.textContent?.includes("GARDEN JOURNAL")){let o=n.parentElement;for(let r=0;r<10&&o;r++){if(o.classList.contains("McGrid")||o.querySelector(".McGrid"))return o;o=o.parentElement;}}return null}function XA(){const e=Yi();if(!e)return null;const t=e.querySelectorAll(".McFlex");for(const n of t){const o=window.getComputedStyle(n);if((o.overflowY==="auto"||o.overflowY==="scroll")&&n.querySelector(":scope > .McGrid"))return n}return null}function zb(){const e=Yi();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}let Oo=qe(),vi=false,yn={filter:"all",sort:"default"};const Gb="gemini-journal-filterSort";function YA(){const e=Yi();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}function JA(){const e=XA();return e?Array.from(e.querySelectorAll(":scope > .McGrid")).filter(n=>(n.textContent??"").match(/\d+\/\d+/)!==null):[]}function QA(){const e=document.createElement("div");e.className=Gb,e.style.cssText=`
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
    `,n.value=yn.filter,n.onchange=()=>{yn.filter=n.value,Ht(()=>_d());};const o=document.createElement("span");o.textContent="Sort:",o.style.cssText="color: #A88A6B; font-size: 11px; margin-left: 8px;";const r=document.createElement("select");for(const[i,a]of [["default","Default"],["alphabetical","A-Z"],["progress","By Progress"]]){const s=document.createElement("option");s.value=i,s.textContent=a,r.appendChild(s);}return r.style.cssText=n.style.cssText,r.value=yn.sort,r.onchange=()=>{yn.sort=r.value,Ht(()=>_d());},e.append(t,n,o,r),e}function ZA(e,t){const n=e.querySelectorAll(".chakra-text, p, span");let o="",r=0;for(const i of n){const a=i.textContent?.trim()??"",s=a.match(/^(\d+)\/(\d+)$/);if(s){const l=parseInt(s[1]),c=parseInt(s[2]);r=c>0?l/c*100:0;continue}a!=="???"&&!a.includes("%")&&a.length>=2&&a.length<=25&&(o=a);}return !o&&r===0?null:{el:e,name:o||"???",progress:r,originalOrder:t}}function _d(){const e=JA();if(e.length===0)return;const t=[];if(e.forEach((o,r)=>{const i=ZA(o,r);i&&t.push(i);}),t.length===0)return;for(const o of t){let r=true;yn.filter==="missing"?r=o.progress<100:yn.filter==="collected"&&(r=o.progress===100),o.el.style.display=r?"":"none";}let n;switch(yn.sort){case "alphabetical":n=[...t].sort((o,r)=>o.name.localeCompare(r.name));break;case "progress":n=[...t].sort((o,r)=>r.progress-o.progress);break;default:n=[...t].sort((o,r)=>o.originalOrder-r.originalOrder);}n.forEach((o,r)=>{o.el.style.order=String(r);});}function eI(){if(document.querySelector(`.${Gb}`))return;const e=YA();if(!e||!e.closest(".McFlex"))return;const n=QA(),o=e.nextElementSibling;if(o&&e.parentElement)e.parentElement.insertBefore(n,o);else if(e.parentElement)e.parentElement.appendChild(n);else return;Oo.add(()=>n.remove());}function cs(){Ht(()=>{eI(),_d();});}let Wn=null;function tI(){Wn!==null&&clearTimeout(Wn),Wn=window.setTimeout(()=>{cr()||cs(),Wn=null;},200);}function nI(){setTimeout(cs,100),setTimeout(cs,400),setTimeout(cs,800);const e=new MutationObserver(()=>{cr()||tI();});e.observe(document.body,{childList:true,subtree:true}),fo(Oo,e),Oo.add(()=>{Wn!==null&&(clearTimeout(Wn),Wn=null);});}function oI(){yn={filter:"all",sort:"default"},Oo.run(),Oo.clear(),Oo=qe();}function rI(){vi||(vi=true,nI(),console.log("[JournalFilterSort] Initialized"));}function iI(){vi&&(vi=false,oI(),console.log("[JournalFilterSort] Destroyed"));}function aI(){return vi}const sI=Object.freeze(Object.defineProperty({__proto__:null,destroy:iI,init:rI,isEnabled:aI},Symbol.toStringTag,{value:"Module"}));let Gt=qe(),Sn=qe(),wi=false,eo=false;const Ll="gemini-journal-allTab",Ed="gemini-journal-allOverlay";let $r="all",Vs="default";function Hb(){const e=Yi();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t){const o=n.textContent?.trim();if(o==="Crops"||o==="Pets"){const r=n.closest("button");if(r){const i=r.parentElement;if(i&&i.querySelectorAll("button").length>=2)return i}}}return null}function pp(){const e=Hb();if(!e)return {crops:null,pets:null};let t=null,n=null;const o=e.querySelectorAll("button");for(const r of o){const i=r.textContent?.trim();i==="Crops"&&(t=r),i==="Pets"&&(n=r);}return {crops:t,pets:n}}function lI(){const{crops:e,pets:t}=pp();[e,t].forEach(n=>{if(!n)return;const o=n.querySelector("div");if(o){const r=o.querySelector("div");r instanceof HTMLElement&&(r.style.height="20px");}});}function jb(){const e=Yi();if(!e)return null;const t=e.querySelectorAll(".McGrid");for(const n of t){const o=n.querySelectorAll(":scope > .McFlex");for(const r of o){const i=window.getComputedStyle(r);if((i.overflow==="hidden"||i.overflowY==="hidden")&&(r.textContent?.includes("JOURNAL")||r.querySelector(".McGrid")))return r}}return null}function cI(e){return e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F"}function dI(){const e=document.createElement("button");e.className=Ll,e.type="button",e.style.cssText=`
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
    `,o.appendChild(r),t.appendChild(o),e.appendChild(t);const i=()=>{const a=window.innerWidth<768;o.style.width=a?"70px":"100px",r.style.fontSize=a?"12px":"14px";};return window.addEventListener("resize",i),Gt.add(()=>window.removeEventListener("resize",i)),e.onmouseenter=()=>{eo||(o.style.height="25px");},e.onmouseleave=()=>{eo||(o.style.height="20px");},e.onclick=a=>{a.preventDefault(),a.stopPropagation(),Ht(()=>gI());},e}function uI(e,t){const n=document.createElement("div");n.style.cssText=`
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
    `;const r=e.variantsLogged.length===0;if(r){const h=document.createElement("span");h.textContent="?",h.style.cssText="font-size: 24px; color: rgba(168, 138, 107, 0.6); font-weight: bold;",o.appendChild(h);}else try{if(Y.isReady()){const h=t==="crop"?"plant":"pet";let x=e.species;t==="crop"&&(e.species==="DawnCelestial"&&(x="DawnCelestialCrop"),e.species==="MoonCelestial"&&(x="MoonCelestialCrop"),e.species==="OrangeTulip"&&(x="Tulip"));const b=(S,_)=>{try{if(Y.has(S,_))return Y.toCanvas(S,_,{scale:.5})}catch{}return null},C=b(h,x)||(t==="crop"?b("tallplant",x):null)||b(h,x.toLowerCase())||(t==="crop"?b("tallplant",x.toLowerCase()):null);if(C)C.style.cssText="max-width: 46px; max-height: 46px; display: block;",o.appendChild(C);else {const S=document.createElement("span");S.textContent=t==="crop"?"🌱":"🐾",S.style.cssText="font-size: 20px;",o.appendChild(S);}}else {const h=document.createElement("span");h.textContent=t==="crop"?"🌱":"🐾",h.style.cssText="font-size: 20px;",o.appendChild(h);}}catch{const h=document.createElement("span");h.textContent=t==="crop"?"🌱":"🐾",h.style.cssText="font-size: 20px;",o.appendChild(h);}let i,a,s;if(t==="pet"){const h=e.abilitiesLogged?.length??0,x=e.abilitiesTotal??0;i=e.variantsLogged.length+h,a=e.variantsTotal+x,s=a>0?i/a*100:0;}else i=e.variantsLogged.length,a=e.variantsTotal,s=e.variantsPercentage;const l=cI(s),c=document.createElement("div");c.style.cssText=`
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
    `;const p=$b(e.species,t),f=document.createElement("span");f.style.cssText="font-weight: bold; font-size: 13px; color: #3D3325; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",f.textContent=r?"???":p;const g=document.createElement("span");return g.style.cssText=`font-size: 12px; font-weight: bold; color: ${s<100?"#8B6914":"#3D3325"}; margin-left: 4px; flex-shrink: 0;`,g.textContent=`${i}/${a}`,u.append(f,g),c.append(d,u),n.append(o,c),n.onclick=h=>{h.preventDefault(),h.stopPropagation(),pI(e.species,t);},n.onmouseenter=()=>{n.style.opacity="0.8";},n.onmouseleave=()=>{n.style.opacity="1";},n}function pI(e,t){Ht(()=>fp()),setTimeout(()=>{const{crops:n,pets:o}=pp(),r=t==="crop"?n:o;r&&(r.click(),setTimeout(()=>{const i=jb();if(!i)return;const a=i.querySelectorAll(".McGrid");for(const s of a){const l=s.textContent??"";if(l.toLowerCase().includes(e.toLowerCase())||l.includes($b(e,t))){s.click();break}}setTimeout(()=>{Ht(()=>Wb());},100);},200));},100);}function Jf(e,t,n){const o=document.createElement("div");o.style.cssText="margin-bottom: 16px;";let r=0,i=0;for(const u of t)n==="pet"?(r+=u.variantsLogged.length+(u.abilitiesLogged?.length??0),i+=u.variantsTotal+(u.abilitiesTotal??0)):(r+=u.variantsLogged.length,i+=u.variantsTotal);const a=document.createElement("div"),s=n==="crop"?"#7cb342":"#9575cd";a.style.cssText=`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        margin-bottom: 12px;
        border-bottom: 2px solid rgba(212, 196, 168, 0.3);
    `;const l=document.createElement("span");l.textContent=e,l.style.cssText=`font-size: 16px; font-weight: 600; font-family: shrikhand, serif; color: ${s}; text-transform: uppercase;`;const c=document.createElement("span");c.textContent=`${r}/${i}`,c.style.cssText="color: #A88A6B; font-size: 12px; font-weight: bold;",a.append(l,c);const d=document.createElement("div");d.style.cssText="display: flex; flex-direction: column; gap: 12px; padding: 0 4px;";for(const u of t)d.appendChild(uI(u,n));return o.append(a,d),o}function Ub(){const e=He.getMyJournal(),t=He.calculateProduceProgress(e),n=He.calculatePetProgress(e),o=document.createElement("div");o.className="gemini-journal-allContent",o.style.cssText=`
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
    `;const f=document.createElement("span");f.textContent="Filter:",f.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold;";const g=document.createElement("select");for(const[_,E]of [["all","All"],["missing","Missing"],["complete","Complete"]]){const v=document.createElement("option");v.value=_,v.textContent=E,g.appendChild(v);}g.value=$r,g.style.cssText=`
        background: #D4C8B8;
        color: #3D3325;
        border: 1px solid #8B7355;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 10px;
        cursor: pointer;
    `,g.onchange=()=>{$r=g.value,Zf();};const h=document.createElement("span");h.textContent="Sort:",h.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold; margin-left: 8px;";const x=document.createElement("select");for(const[_,E]of [["default","Default"],["az","A-Z"],["progress","By Progress"]]){const v=document.createElement("option");v.value=_,v.textContent=E,x.appendChild(v);}x.value=Vs,x.style.cssText=g.style.cssText,x.onchange=()=>{Vs=x.value,Zf();},p.append(f,g,h,x);const b=document.createElement("div");b.className="gemini-all-scroll",b.style.cssText=`
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
    `,fI();const C=Qf(t.speciesDetails,"crop"),S=Qf(n.speciesDetails,"pet");if(C.length>0&&b.appendChild(Jf("Crops",C,"crop")),S.length>0&&b.appendChild(Jf("Pets",S,"pet")),C.length===0&&S.length===0){const _=document.createElement("div");_.style.cssText="text-align: center; padding: 40px 20px; color: #A88A6B; font-size: 14px;",_.textContent=$r==="missing"?"All entries are complete!":$r==="complete"?"No complete entries yet.":"No entries found.",b.appendChild(_);}return o.append(r,p,b),o}function Qf(e,t){let n=e.filter(o=>{let r,i;t==="pet"?(r=o.variantsLogged.length+(o.abilitiesLogged?.length??0),i=o.variantsTotal+(o.abilitiesTotal??0)):(r=o.variantsLogged.length,i=o.variantsTotal);const a=i>0?r/i*100:0;switch($r){case "missing":return a<100;case "complete":return a>=100;default:return  true}});return Vs==="az"?n=[...n].sort((o,r)=>o.species.localeCompare(r.species)):Vs==="progress"&&(n=[...n].sort((o,r)=>{const i=t==="pet"?o.variantsLogged.length+(o.abilitiesLogged?.length??0):o.variantsLogged.length,a=t==="pet"?o.variantsTotal+(o.abilitiesTotal??0):o.variantsTotal,s=a>0?i/a:0,l=t==="pet"?r.variantsLogged.length+(r.abilitiesLogged?.length??0):r.variantsLogged.length,c=t==="pet"?r.variantsTotal+(r.abilitiesTotal??0):r.variantsTotal;return (c>0?l/c:0)-s})),n}let Sc=false;function fI(){if(Sc)return;Sc=true;const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e),Gt.add(()=>{e.remove(),Sc=false;});}function Zf(){const e=document.querySelector(`.${Ed}`);if(e){for(;e.firstChild;)e.firstChild.remove();e.appendChild(Ub());}}function gI(){if(eo)return;eo=true;const t=document.querySelector(`.${Ll}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="35px"),lI();const n=jb();if(!n){console.warn("[JournalAllTab] Cannot activate All tab: content wrapper not found"),eo=false;return}const o=[];for(const a of Array.from(n.children))a instanceof HTMLElement&&!a.classList.contains(Ed)&&(o.push(a),a.style.visibility="hidden");Sn.add(()=>{for(const a of o)a.style.visibility="";});const r=document.createElement("div");r.className=Ed,r.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: transparent;
        display: flex;
        flex-direction: column;
    `,window.getComputedStyle(n).position==="static"&&(n.style.position="relative",Sn.add(()=>{n.style.position="";})),r.appendChild(Ub()),n.appendChild(r),Sn.add(()=>r.remove()),mI(),console.log("[JournalAllTab] All tab activated");}function mI(){const e=zb();if(!e)return;const t=He.getMyJournal(),n=He.calculateProduceProgress(t),o=He.calculatePetProgress(t),r=n.variantsLogged+o.variantsLogged+(o.abilitiesLogged??0),i=n.variantsTotal+o.variantsTotal+(o.abilitiesTotal??0),a=Math.floor(r/i*100);if(!e.hasAttribute("data-original-percent")){const c=e.textContent?.match(/Collected\s+(\d+)%/);c&&e.setAttribute("data-original-percent",c[1]);}const s=e.querySelector("span.chakra-text");s&&!s.hasAttribute("data-original-count")&&s.setAttribute("data-original-count",s.textContent||"");const l=e.childNodes[0];l&&l.nodeType===Node.TEXT_NODE&&(l.textContent=`Collected ${a}% `),s&&(s.textContent=`(${r}/${i})`);}function hI(){const e=zb();if(!e)return;const t=e.getAttribute("data-original-percent");if(t){const o=e.childNodes[0];o&&o.nodeType===Node.TEXT_NODE&&(o.textContent=`Collected ${t}% `),e.removeAttribute("data-original-percent");}const n=e.querySelector("span.chakra-text");if(n){const o=n.getAttribute("data-original-count");o&&(n.textContent=o),n.removeAttribute("data-original-count");}}function fp(){if(!eo)return;eo=false;const t=document.querySelector(`.${Ll}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="20px"),Sn.run(),Sn=qe(),hI(),console.log("[JournalAllTab] All tab deactivated");}function Wb(){const e=Hb();if(!e||e.querySelector(`.${Ll}`))return;const{crops:t,pets:n}=pp();if(!t)return;const o=dI();e.insertBefore(o,t),Gt.add(()=>o.remove());const r=()=>{Ht(()=>fp());};t&&(t.addEventListener("click",r),Gt.add(()=>t.removeEventListener("click",r))),n&&(n.addEventListener("click",r),Gt.add(()=>n.removeEventListener("click",r))),console.log("[JournalAllTab] Tab injected");}function ds(){Ht(()=>{Wb();});}let Vn=null;function bI(){Vn!==null&&clearTimeout(Vn),Vn=window.setTimeout(()=>{cr()||ds(),Vn=null;},200);}function xI(){setTimeout(ds,100),setTimeout(ds,400),setTimeout(ds,800);const e=new MutationObserver(()=>{cr()||bI();});e.observe(document.body,{childList:true,subtree:true}),fo(Gt,e),Gt.add(()=>{Vn!==null&&(clearTimeout(Vn),Vn=null);});}function yI(){fp(),Sn.run(),Sn.clear(),Gt.run(),Gt.clear(),Sn=qe(),Gt=qe();}function vI(){wi||(wi=true,xI(),console.log("[JournalAllTab] Initialized"));}function wI(){wi&&(wi=false,yI(),console.log("[JournalAllTab] Destroyed"));}function CI(){return wi}const SI=Object.freeze(Object.defineProperty({__proto__:null,destroy:wI,init:vI,isEnabled:CI},Symbol.toStringTag,{value:"Module"}));function kI(){const e=Rs();we(gn.JOURNAL_HINTS,true),we(gn.JOURNAL_FILTER_SORT,true),e.register({id:"abilitiesInject",name:"Journal Abilities",description:"Shows pet abilities in journal modal",injection:_A,storageKey:gn.ABILITIES_INJECT,defaultEnabled:true}),e.register({id:"journalHints",name:"Journal Hints",description:"Shows hints for missing journal entries on hover",injection:KA,storageKey:gn.JOURNAL_HINTS,defaultEnabled:true}),e.register({id:"journalFilterSort",name:"Journal Filter/Sort",description:"Adds filter and sort controls to journal overview",injection:sI,storageKey:gn.JOURNAL_FILTER_SORT,defaultEnabled:true}),e.register({id:"journalAllTab",name:"Journal All Tab",description:"Adds an All tab showing combined crops and pets view",injection:SI,storageKey:gn.JOURNAL_ALL_TAB,defaultEnabled:true});}const eg=_e.JOURNAL,kc={injections:{abilitiesInject:true,journalHints:true,journalFilterSort:true,journalAllTab:true}};function _I(){const e=ye(eg,null);return e||(ye(_e.JOURNAL_CHECKER,null)&&we(eg,kc),kc)}let xr=false;const He={init(){xr||(xr=true,_I(),nA(),kI());},destroy(){xr&&(xr=false,oA());},isReady(){return xr},getProgress(){return null},getMyJournal:Tb,getCropVariants:Ab,getPetVariants:Ib,getAllMutations:eA,getPetAbilities:Pb,calculateProduceProgress:Lb,calculatePetProgress:Mb,aggregateJournalProgress:Il,getMissingSummary:tA,refresh:rA,dispatchUpdate:lp},gp=_e.BULK_FAVORITE,Vb={enabled:false,position:"top-right"};function Ji(){return ye(gp,Vb)}function qb(e){we(gp,e);}function EI(e){const t=Ji();t.position=e,qb(t);}function Kb(){return Ji().enabled}function TI(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function AI(e){const t=At().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let o=0;for(const r of t.items){if(!TI(r))continue;const i=n.has(r.id);e&&i||!e&&!i||(await kl(r.id,e),o++,await II(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${o} items`),o}function II(e){return new Promise(t=>setTimeout(t,e))}let Ta=false;const Td={init(){Ta||(Ta=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return Ta},DEFAULT_CONFIG:Vb,STORAGE_KEY:gp,loadConfig:Ji,saveConfig:qb,isEnabled:Kb,setPosition:EI,bulkFavorite:AI,destroy(){Ta=false;}};class PI{constructor(){j(this,"achievements",new Map);j(this,"data");j(this,"STORAGE_KEY",_e.ACHIEVEMENTS);j(this,"onUnlockCallbacks",[]);j(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return ye(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){we(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const o=this.isUnlocked(t),r=await n.checkProgress(),i={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=r>=n.target;return !o&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const o=await this.checkAchievement(n);t.push(o);}return t}unlock(t,n){const o=this.achievements.get(t);if(!o)return;const r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return {total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Unlock callback error:",o);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Progress callback error:",o);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let ti=null;function wt(){return ti||(ti=new PI),ti}function LI(){ti&&(ti=null);}let Aa=false;const MI={init(){Aa||(wt(),Aa=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Aa},getManager(){return wt()},register:(...e)=>wt().register(...e),registerMany:(...e)=>wt().registerMany(...e),isUnlocked:(...e)=>wt().isUnlocked(...e),getAll:()=>wt().getAllAchievements(),getUnlocked:()=>wt().getUnlockedAchievements(),getStats:()=>wt().getCompletionStats(),checkAll:()=>wt().checkAllAchievements(),onUnlock:(...e)=>wt().onUnlock(...e),onProgress:(...e)=>wt().onProgress(...e),destroy(){LI(),Aa=false;}},RI={enabled:true},Xb=_e.ANTI_AFK,NI=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],OI=25e3,$I=1,DI=1e-5,ge={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function FI(){const e=(t,n)=>{const o=r=>{r.stopImmediatePropagation(),r.preventDefault?.();};t.addEventListener(n,o,{capture:true}),ge.listeners.push({type:n,handler:o,target:t});};for(const t of NI)e(document,t),e(window,t);}function BI(){for(const{type:e,handler:t,target:n}of ge.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ge.listeners.length=0;}function zI(){const e=Object.getPrototypeOf(document);ge.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ge.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ge.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function GI(){const e=Object.getPrototypeOf(document);try{ge.savedProps.hidden&&Object.defineProperty(e,"hidden",ge.savedProps.hidden);}catch{}try{ge.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ge.savedProps.visibilityState);}catch{}try{ge.savedProps.hasFocus&&(document.hasFocus=ge.savedProps.hasFocus);}catch{}}function qs(){ge.audioCtx&&ge.audioCtx.state!=="running"&&ge.audioCtx.resume?.().catch(()=>{});}function HI(){try{const e=window.AudioContext||window.webkitAudioContext;ge.audioCtx=new e({latencyHint:"interactive"}),ge.gainNode=ge.audioCtx.createGain(),ge.gainNode.gain.value=DI,ge.oscillator=ge.audioCtx.createOscillator(),ge.oscillator.frequency.value=$I,ge.oscillator.connect(ge.gainNode).connect(ge.audioCtx.destination),ge.oscillator.start(),document.addEventListener("visibilitychange",qs,{capture:!0}),window.addEventListener("focus",qs,{capture:!0});}catch{Yb();}}function Yb(){try{ge.oscillator?.stop();}catch{}try{ge.oscillator?.disconnect(),ge.gainNode?.disconnect();}catch{}try{ge.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",qs,{capture:true}),window.removeEventListener("focus",qs,{capture:true}),ge.oscillator=null,ge.gainNode=null,ge.audioCtx=null;}function jI(){const e=document.querySelector("canvas")||document.body||document.documentElement;ge.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},OI);}function UI(){ge.heartbeatInterval!==null&&(clearInterval(ge.heartbeatInterval),ge.heartbeatInterval=null);}function _c(){zI(),FI(),HI(),jI();}function Ec(){UI(),Yb(),BI(),GI();}let Ia=false,lt=false;function xo(){return ye(Xb,RI)}function Tc(e){we(Xb,e);}const $o={init(){if(Ia)return;const e=xo();Ia=true,e.enabled?(_c(),lt=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Ia},isRunning(){return lt},isEnabled(){return xo().enabled},enable(){const e=xo();e.enabled=true,Tc(e),lt||(_c(),lt=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=xo();e.enabled=false,Tc(e),lt&&(Ec(),lt=false,console.log("[MGAntiAfk] Disabled"));},toggle(){$o.isEnabled()?$o.disable():$o.enable();},getConfig(){return xo()},updateConfig(e){const n={...xo(),...e};Tc(n),n.enabled&&!lt?(_c(),lt=true):!n.enabled&&lt&&(Ec(),lt=false);},destroy(){lt&&(Ec(),lt=false),Ia=false,console.log("[MGAntiAfk] Destroyed");}},Jb=_e.PET_TEAM,WI={enabled:false,teams:[],activeTeamId:null},mp=3,tg=50,Fe="";function Ke(){return ye(Jb,WI)}function Tn(e){we(Jb,e);}function VI(e){const n={...Ke(),...e};return Tn(n),n}function qI(){return Ke().enabled}function KI(e){VI({enabled:e});}function XI(){return crypto.randomUUID()}function Ad(){return Date.now()}function Qb(e=[]){const t=[...e];for(;t.length<mp;)t.push(Fe);return [t[0]||Fe,t[1]||Fe,t[2]||Fe]}function Zb(e,t){const n=Ke(),o=e.trim();return o?!n.teams.some(r=>r.name.trim()===o&&r.id!==t):false}function ex(e,t){const n=Ke();if(!e.some(i=>i!==Fe))return  true;const r=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===r)}function tx(e){const n=po().get(),o=new Set(n.all.map(i=>i.id)),r=Ke();for(const i of r.teams)for(const a of i.petIds)a!==Fe&&o.add(a);for(const i of e)if(i!==Fe&&!o.has(i))return  false;return  true}function nx(e){const n=po().get(),o=new Map(n.all.map(i=>[i.id,i])),r=[];for(const i of e.petIds){if(i===Fe)continue;const a=o.get(i);a&&r.push(a);}return r}function YI(e){return e.petIds.every(t=>t!==Fe)}function JI(e){const t=[];for(let n=0;n<mp;n++)e.petIds[n]===Fe&&t.push(n);return t}function QI(e){return e.petIds.filter(t=>t!==Fe).length}function ZI(e){return e.petIds.every(t=>t===Fe)}function eP(e,t){return e.petIds.includes(t)}function tP(e,t){return e.petIds.indexOf(t)}function nP(e,t=[]){const n=Ke();if(n.teams.length>=tg)throw new Error(`Maximum number of teams (${tg}) reached`);if(!Zb(e))throw new Error(`Team name "${e}" already exists`);const o=e.trim();if(!o)throw new Error("Team name cannot be empty");const r=Qb(t);if(!tx(r))throw new Error("One or more pet IDs do not exist");if(!ex(r))throw new Error("A team with this exact composition already exists");const i={id:XI(),name:o,petIds:r,createdAt:Ad(),updatedAt:Ad()};return n.teams.push(i),Tn(n),i}function ox(e,t){const n=Ke(),o=n.teams.findIndex(a=>a.id===e);if(o===-1)return null;const r=n.teams[o];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!Zb(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=Qb(t.petIds);if(!tx(a))throw new Error("One or more pet IDs do not exist");if(!ex(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...r,...t,id:r.id,createdAt:r.createdAt,updatedAt:Ad()};return n.teams[o]=i,Tn(n),i}function oP(e){const t=Ke(),n=t.teams.length;return t.teams=t.teams.filter(o=>o.id!==e),t.teams.length===n?false:(Tn(t),true)}function rP(e){return Ke().teams.find(n=>n.id===e)??null}function iP(){return [...Ke().teams]}function aP(e){const t=Ke(),n=e.trim();return t.teams.find(o=>o.name.trim()===n)??null}function sP(e){const t=Ke(),n=new Map(t.teams.map(o=>[o.id,o]));if(e.length!==t.teams.length)return  false;for(const o of e)if(!n.has(o))return  false;return t.teams=e.map(o=>n.get(o)),Tn(t),true}function lP(e,t){try{return ox(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function cP(){const n=po().get().byLocation.active.map(r=>r.id).sort(),o=Ke();for(const r of o.teams){const i=r.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return r.id}return null}function rx(){const e=cP(),t=Ke();return e!==t.activeTeamId&&(t.activeTeamId=e,Tn(t)),e}function ix(e){const t=Ke();t.activeTeamId=e,Tn(t);}function dP(e){return rx()===e}function uP(e){const t=po(),n=At(),o=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=o.byLocation.active,a=e.petIds.filter(d=>d!==Fe).sort(),s=i.map(d=>d.id).sort();if(JSON.stringify(a)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const l=o.hutch,c=l.hasHutch?l.maxItems-l.currentItems:0;pP(e.petIds,c,o),ix(e.id),console.log("[PetTeam] Team activated successfully");}function pP(e,t,n){const o=n.byLocation.active;let r=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let i=0;i<mp;i++){const a=e[i],s=o[i]??null;if(console.log(`[PetTeam] Slot ${i}: current=${s?.id.slice(0,8)??"empty"}, target=${a.slice(0,8)||"empty"}, hutchSpace=${r}`),s?.id===a){console.log(`[PetTeam] Slot ${i}: Same pet, skipping`);continue}if(a===Fe&&s){const l=r>0;console.log(`[PetTeam] Slot ${i}: Removing pet, storeInHutch=${l}`),fP(s.id,l),l&&r--;continue}if(!s&&a!==Fe){const c=n.all.find(d=>d.id===a)?.location==="hutch";console.log(`[PetTeam] Slot ${i}: Adding pet, fromHutch=${c}`),c&&r++,gP(a,n);continue}if(s&&a!==Fe){const c=n.all.find(u=>u.id===a)?.location==="hutch";c&&r++;const d=r>0;console.log(`[PetTeam] Slot ${i}: Swapping pets, fromHutch=${c}, storeInHutch=${d}`),mP(s.id,a,n,d),d&&r--;continue}}console.log(`[PetTeam] Swap complete, ${r} hutch spaces remaining`);}function fP(e,t){sb(e),t&&zu(e);}function gP(e,t){const n=t.all.find(o=>o.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&Gu(e),ib(e);}function mP(e,t,n,o){const r=n.all.find(i=>i.id===t);if(!r){console.warn(`[PetTeam] Pet ${t} not found`);return}r.location==="hutch"&&Gu(t),ab(e,t),o&&zu(e);}function hP(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function bP(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(o=>o&&typeof o=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function xP(e){const t=Date.now(),n=e.slots||[],o=[typeof n[0]=="string"?n[0]:Fe,typeof n[1]=="string"?n[1]:Fe,typeof n[2]=="string"?n[2]:Fe];return {name:e.name?.trim()||"Imported Team",petIds:o,createdAt:t,updatedAt:t}}function yP(){const e={success:false,source:"none",imported:0,errors:[]};if(!hP())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=bP();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=Ke();n.teams=[],n.activeTeamId=null;const o=new Set;for(const r of t)try{const i=xP(r);let a=i.name;if(o.has(a)){let l=1;for(;o.has(`${a} (${l})`);)l++;a=`${a} (${l})`;}o.add(a);const s={id:crypto.randomUUID(),name:a,petIds:i.petIds,createdAt:i.createdAt,updatedAt:i.updatedAt};n.teams.push(s),e.imported++;}catch(i){const a=i instanceof Error?i.message:String(i);e.errors.push(`Failed to import "${r.name}": ${a}`);}return e.imported>0&&(Tn(n),e.success=true,e.source="aries"),e}let Pa=false;const pe={init(){if(Pa)return;if(!Ke().enabled){console.log("[PetTeam] Feature disabled");return}Pa=true,console.log("[PetTeam] Feature initialized");},destroy(){Pa&&(Pa=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:qI,setEnabled:KI,createTeam:nP,updateTeam:ox,deleteTeam:oP,renameTeam:lP,getTeam:rP,getAllTeams:iP,getTeamByName:aP,reorderTeams:sP,getPetsForTeam:nx,isTeamFull:YI,getEmptySlots:JI,getFilledSlotCount:QI,isTeamEmpty:ZI,isPetInTeam:eP,getPetSlotIndex:tP,getActiveTeamId:rx,setActiveTeamId:ix,isActiveTeam:dP,activateTeam:uP,importFromAries:yP},vP=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],ax=_e.XP_TRACKER,wP={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},Do="XP Tracker",Fo="[XpTracker]";function dr(){return ye(ax,wP)}function sx(e){we(ax,e);}function lx(e){const n={...dr(),...e};return sx(n),n}function cx(){return dr().enabled}function CP(e){lx({enabled:e});}function hp(e){return vP.includes(e)}function SP(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return !n||!hp(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function dx(e){return e.filter(hp)}function ux(e){return e.some(hp)}function kP(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function px(e,t,n,o=100){const r=SP(e);if(!r)return null;const i=kP(e),a=r.requiredWeather,s=a===null||n===a,l=t/o,c=l*l,d=r.baseProbability,u=r.bonusXp,p=d,f=Math.floor(u*c),g=p/100*60,h=s?Math.floor(g*f):0;return {abilityId:e,abilityName:r.name,tier:i,baseChancePerMinute:d,actualChancePerMinute:p,baseXpPerProc:u,actualXpPerProc:f,expectedProcsPerHour:g,expectedXpPerHour:h,requiredWeather:a,isActive:s}}function fx(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const o of e){const r=dx(o.abilities);for(const i of r){const a=px(i,o.strength,t,o.maxStrength||100);a&&(n.boosters.push({petId:o.petId,petName:o.petName,stats:a}),a.isActive&&(n.totalBonusXpPerHour+=a.expectedXpPerHour,n.totalProcsPerHour+=a.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function gx(e,t,n,o=100){const r=dx(e);return r.length===0?null:px(r[0],t,n,o)}function ng(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function _P(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function EP(e,t){return e.species.localeCompare(t.species)}function TP(e,t){return t.currentStrength-e.currentStrength}function AP(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function IP(e,t){return e.name.localeCompare(t.name)}function PP(e){switch(e){case "closestToMax":return ng;case "furthestFromMax":return _P;case "species":return EP;case "strength":return TP;case "location":return AP;case "name":return IP;default:return ng}}function mx(e,t){const n=PP(t);return [...e].sort(n)}function LP(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function MP(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function hx(e,t){let n=e;return n=LP(n,t.filterSpecies),n=MP(n,t.filterHasXpBoost),n=mx(n,t.sortBy),n}function yr(e){const t=pe.getTeam(e);if(!t)return null;const n=bx(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:ze,bonusXpPerHour:0,totalXpPerHour:ze,activeBoosterCount:0,totalProcsPerHour:0}};const o=fe.weather.get(),r=o.isActive?o.type:null,i=n.filter(d=>!d.isMature||ux(d.abilities)).filter(d=>d.hunger>0).map(d=>({petId:d.id,petName:d.name??"",abilities:d.abilities,strength:d.currentStrength})),a=fx(i,r),s=[],l=RP(n,a.totalBonusXpPerHour);for(const d of n){const u=Id(d,r,a.totalBonusXpPerHour,l);s.push(u);}const c={baseXpPerHour:ze,bonusXpPerHour:a.totalBonusXpPerHour,totalXpPerHour:ze+a.totalBonusXpPerHour,activeBoosterCount:a.activeBoosterCount,totalProcsPerHour:a.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:c}}function bx(e){const t=fe.myPets.get(),n=[];for(const o of e.petIds){if(!o)continue;const r=t.all.find(i=>i.id===o);r&&n.push(r);}return n}function RP(e,t){let n=0;for(const o of e){const r=Wi(o.petSpecies,o.targetScale);if(Vi(o.petSpecies,o.xp,r)>=r)continue;const a=o.hunger>0?ze+t:0,s=Al(o.petSpecies,o.xp,r,a>0?a:ze);n=Math.max(n,s);}return n}function Id(e,t,n,o){const r=Wi(e.petSpecies,e.targetScale),i=Vi(e.petSpecies,e.xp,r),a=i>=r,s=e.hunger<=0,c=s?0:(s?0:ze)+n,d=gx(e.abilities,i,t),u=a?null:Qu(e.petSpecies,e.xp,i,r,c>0?c:ze),p=Al(e.petSpecies,e.xp,r,c>0?c:ze),f=u!==null?tp(e.petSpecies,e.hunger,u):null,g=xi(e.petSpecies,e.hunger,p),h=a&&d&&o>0?np(true,true,e.petSpecies,e.hunger,0,o):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:i,maxStrength:r,isMaxStrength:a,xpPerHour:c,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:d,supportingFeeds:h,mutations:e.mutations,targetScale:e.targetScale}}function og(e){const t=pe.getTeam(e);if(!t)return 0;const n=bx(t);if(n.length===0)return 0;const o=n.map(r=>{const i=Wi(r.petSpecies,r.targetScale);return Vi(r.petSpecies,r.xp,i)/i*100});return o.reduce((r,i)=>r+i,0)/o.length}function rg(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let er=false,us=null,Ml=[],bp=null;function NP(e,t,n){const o=Wi(e.petSpecies,e.targetScale),r=Vi(e.petSpecies,e.xp,o),i=r>=o,a=e.hunger<=0,s=a?0:ze,l=gx(e.abilities,r,t);l?.isActive&&l.expectedXpPerHour;const c=e.location==="active"&&!a?s+n:0,d=Qu(e.petSpecies,e.xp,r,o,c>0?c:ze),u=Al(e.petSpecies,e.xp,o,c>0?c:ze),p=tp(e.petSpecies,e.hunger,d),f=xi(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:a,currentStrength:r,maxStrength:o,isMaxStrength:i,hoursToNextStrength:d,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:c,xpBoostStats:l,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function xx(){const e=fe.myPets.get(),t=fe.weather.get(),n=t.isActive?t.type:null,r=e.byLocation.active.filter(l=>!l.isMature||ux(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),i=fx(r,n);bp=i;const a=[];for(const l of e.all){const c=NP({id:l.id,petSpecies:l.petSpecies,name:l.name??"",xp:l.xp,hunger:l.hunger,targetScale:l.targetScale,abilities:l.abilities,mutations:l.mutations,location:l.location},n,i.totalBonusXpPerHour);a.push(c);}const s=Math.max(0,...a.map(l=>l.hoursToMaxStrength));for(const l of a)l.isMaxStrength&&l.xpBoostStats&&(l.feedsToMaxStrength=np(true,true,l.species,l.hunger,0,s));return a}function yx(){if(er)return;if(!dr().enabled){console.log(`${Fo} ${Do} disabled`);return}console.log(`${Fo} Initializing ${Do}...`),J.isReady()&&(Ml=xx()),er=true,console.log(`${Fo} ${Do} initialized`);}function xp(){return er&&J.isReady()}function yp(){return xp()?Ml:[]}function OP(){return yp().filter(e=>e.location==="active")}function $P(){return bp}function vp(){xp()&&(Ml=xx());}function DP(e){wp();const t=dr(),n=e??t.updateIntervalMs;us=setInterval(()=>{cx()&&vp();},n);}function wp(){us&&(clearInterval(us),us=null);}function vx(){er&&(wp(),er=false,Ml=[],bp=null,console.log(`${Fo} ${Do} destroyed`));}function FP(){const e=dr();return hx(yp(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function BP(e){CP(e),e?(er=false,yx(),J.isReady()&&vp(),console.log(`${Fo} ${Do} enabled`)):(vx(),console.log(`${Fo} ${Do} disabled`));}const Pd={init:yx,isReady:xp,destroy:vx,loadConfig:dr,saveConfig:sx,updateConfig:lx,isEnabled:cx,setEnabled:BP,getAllPetsProgress:yp,getActivePetsProgress:OP,getCombinedBoostStats:$P,getFilteredPets:FP,refresh:vp,startAutoUpdate:DP,stopAutoUpdate:wp,sortPets:mx,filterAndSortPets:hx},Ci={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},Si={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(Ci),...Object.keys(Si)];function Cp(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in Ci){const r=Ci[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function Sp(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in Si){const r=Si[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function ki(e){let t=0,n=0;for(const o of e){const r=o.procRate*60;t+=r,n+=r*o.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Bo(e){return e.some(t=>t.abilities.some(n=>n in Ci))}function zo(e){return e.some(t=>t.abilities.some(n=>n in Si))}let ni=null;function wx(){const t=Le().get().plant;if(!t)return;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n&&_t(n.species,n.targetScale,n.mutations||[]);}function zP(e){wx();}function GP(){ni&&Cx(),wx(),ni=Le().subscribePlantInfo(zP,{immediate:true});}function Cx(){ni&&(ni(),ni=null);}const Ld="css-qnqsp4",Md="css-v439q6";let Go=qe(),Rd=false,vr=false,ps=null,Nd=null,qn=null;const HP=`
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
`;function jP(){if(Rd)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=HP,document.head.appendChild(e),Go.add(()=>e.remove()),Rd=true;}function UP(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const o=document.createElement("canvas");o.width=20,o.height=20,n.appendChild(o);const r=document.createElement("div");r.className="gemini-qol-cropPrice-text",r.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(r);try{const i=Y.toCanvas("ui","Coin");if(i&&o.parentElement){const a=o.getContext("2d");if(a){const s=Math.min(o.width/i.width,o.height/i.height),l=i.width*s,c=i.height*s,d=(o.width-l)/2,u=(o.height-c)/2;a.drawImage(i,d,u,l,c);}}}catch(i){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",i);}return t}function WP(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const o of n){const r=o.textContent?.trim();if(!r)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(r)&&t.push(r);}return t}function VP(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const o=n.textContent?.trim();if(!o)continue;const r=o.match(/^([\d.]+)\s*kg$/i);if(r)return parseFloat(r[1])}return 1}function qP(){const e=[],t=document.querySelectorAll(`.${Ld}`);for(const o of t)o.offsetParent&&(o.closest("button.chakra-button")||e.push({element:o}));const n=document.querySelectorAll(`.${Md}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelectorAll(":scope > .McFlex > .McFlex");if(r.length>0){const i=r[r.length-1];i.querySelector("p.chakra-text")&&e.push({element:i});}}return e}function KP(){const t=Le().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?_t(n.species,n.targetScale,n.mutations||[]):0}function XP(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(".gemini-qol-cropPrice-text");r&&(r.textContent=e>0?e.toLocaleString():"");}}function YP(){qn!==null&&cancelAnimationFrame(qn),qn=requestAnimationFrame(()=>{qn=null;const e=KP();if(e===Nd)return;Nd=e;const n=Le().get().plant;!n||!(n.currentSlotIndex!==null&&n.slots[n.currentSlotIndex])||XP(e);});}function wr(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;const r=Le().get().plant;let i=0,a=null;if(r&&r.currentSlotIndex!==null){const l=r.slots[r.currentSlotIndex];l&&(a=l.species,i=_t(l.species,l.targetScale,l.mutations||[]));}if(i===0){const l=t.textContent?.trim();if(l){a=l;const c=VP(n),d=WP(n);i=_t(l,c,d);}}const s=UP(i);n.appendChild(s),Go.add(()=>s.remove());}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function JP(){const e=qP();for(const n of e)wr(n);ps=Le().subscribePlantInfo(()=>{YP();});const t=new MutationObserver(n=>{for(const o of n)o.type==="childList"&&o.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.classList.contains(Ld)&&(r.closest("button.chakra-button")||wr({element:r})),r.querySelectorAll(`.${Ld}`).forEach(s=>{s.closest("button.chakra-button")||wr({element:s});}),r.classList.contains(Md)&&!r.closest("button.chakra-button")){const s=r.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&!l.querySelector(".gemini-qol-cropPrice")&&wr({element:l});}}r.querySelectorAll(`.${Md}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const c=l[l.length-1];c.querySelector("p.chakra-text")&&!c.querySelector(".gemini-qol-cropPrice")&&wr({element:c});}}});}});});t.observe(document.body,{childList:true,subtree:true}),fo(Go,t);}const QP={init(){vr||(vr=true,jP(),JP());},destroy(){vr&&(vr=false,qn!==null&&(cancelAnimationFrame(qn),qn=null),ps&&(ps(),ps=null),Go.run(),Go.clear(),Go=qe(),Rd=false,Nd=null);},isEnabled(){return vr}},Sx=_e.CROP_VALUE_INDICATOR,ZP={enabled:false};function kp(){return ye(Sx,ZP)}function e2(e){we(Sx,e);}let _i=false;function kx(){_i||!kp().enabled||(_i=true,GP());}function _x(){_i&&(Cx(),_i=false);}function t2(){return _i}function n2(){return kp().enabled}function o2(e){const t=kp();t.enabled!==e&&(t.enabled=e,e2(t),e?kx():_x());}const fs={init:kx,destroy:_x,isReady:t2,isEnabled:n2,setEnabled:o2,render:QP},Ei="css-qnqsp4",_p="css-1cdcuw7",Ep='[role="tooltip"]';let gs=qe(),Cr=false,ms=null,Od=null,Kn=null;function r2(){const e=[],t=document.querySelectorAll(`.${Ei}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const o=n.querySelector(`.${_p}`);o&&e.push({element:n,weightElement:o});}return e}function i2(){const t=Le().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Yu(n.species,n.targetScale):0}function a2(e,t){const n=document.querySelectorAll(`.${Ei}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(`.${_p}`);if(r){const i=r.querySelector("svg"),a=`${e}%`;r.textContent=a,i&&r.appendChild(i);}}Ks(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function s2(){Kn!==null&&cancelAnimationFrame(Kn),Kn=requestAnimationFrame(()=>{Kn=null;const e=i2();if(e===Od)return;Od=e;const n=Le().get().plant;if(!n)return;const o=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;o&&a2(e,o);});}function Ex(e,t){const n=J.get("plants");if(!n)return "";const o=n[e];return o?.crop?.baseWeight?`${(o.crop.baseWeight*t).toFixed(2)} kg`:""}function Ks(){const e=document.querySelectorAll(Ep),n=Le().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=Ex(o.species,o.targetScale);for(const i of e){if(!i.offsetParent)continue;const a=i.textContent?.trim();a&&a.startsWith("Size:")&&r&&(i.textContent=r);}}function Ac(){const e=r2();for(const t of e)if(t.weightElement)try{const o=Le().get().plant;if(o&&o.currentSlotIndex!==null){const r=o.slots[o.currentSlotIndex];if(r){const i=Yu(r.species,r.targetScale),a=t.weightElement.querySelector("svg");t.weightElement.textContent=`${i}%`,a&&t.weightElement.appendChild(a);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}Ks();}function l2(){const e=document.querySelectorAll(`.${Ei}`),n=Le().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=Ex(o.species,o.targetScale);for(const a of e){if(!a.offsetParent||a.closest("button.chakra-button"))continue;const s=a.querySelector(`.${_p}`);if(s){const l=s.querySelector("svg");s.textContent=r,l&&s.appendChild(l);}}const i=document.querySelectorAll(Ep);for(const a of i){if(!a.offsetParent)continue;const s=a.textContent?.trim();s&&!s.includes("kg")&&(a.textContent=r);}console.log("[CropSizeIndicator.render] Restored crop weights");}function c2(){Ac(),ms=Le().subscribePlantInfo(()=>{s2();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.hasAttribute("role")&&o.getAttribute("role")==="tooltip"){const a=o.textContent?.trim();a&&a.startsWith("Size:")&&Ks();}o.classList.contains(Ei)&&(o.closest("button.chakra-button")||Ac()),o.querySelectorAll(`.${Ei}`).length>0&&Ac(),o.querySelectorAll(Ep).forEach(a=>{const s=a.textContent?.trim();s&&s.startsWith("Size:")&&Ks();});}});});e.observe(document.body,{childList:true,subtree:true}),fo(gs,e),console.log("[CropSizeIndicator.render] Started observing crops");}const Tp={init(){if(Cr){console.log("[CropSizeIndicator.render] Already initialized");return}Cr=true,c2(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){Cr&&(Cr=false,l2(),Kn!==null&&(cancelAnimationFrame(Kn),Kn=null),ms&&(ms(),ms=null),gs.run(),gs.clear(),gs=qe(),Od=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return Cr}},Tx=_e.CROP_SIZE_INDICATOR,d2={enabled:false};function Ap(){return ye(Tx,d2)}function u2(e){we(Tx,e);}let Ti=false;function Ax(){if(Ti){console.log("[CropSizeIndicator] Already initialized");return}if(!Ap().enabled){console.log("[CropSizeIndicator] Disabled");return}Ti=true,console.log("[CropSizeIndicator] Initializing..."),Tp.init(),console.log("[CropSizeIndicator] Initialized successfully");}function Ix(){Ti&&(console.log("[CropSizeIndicator] Destroying..."),Tp.destroy(),Ti=false,console.log("[CropSizeIndicator] Destroyed"));}function p2(){return Ti}function f2(){return Ap().enabled}function g2(e){const t=Ap();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,u2(t),e?Ax():Ix(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const hs={init:Ax,destroy:Ix,isReady:p2,isEnabled:f2,setEnabled:g2,render:Tp},m2={Normal:{letter:"N",color:"#A88A6B",bold:false},Wet:{letter:"W",color:"rgba(76, 204, 204, 1)",bold:false},Chilled:{letter:"C",color:"rgba(144, 184, 204, 1)",bold:false},Frozen:{letter:"F",color:"rgba(148, 160, 204, 1)",bold:false},Dawnlit:{letter:"D",color:"rgb(245, 155, 225)",bold:false},Ambershine:{letter:"A",color:"rgb(255, 180, 120)",bold:false},Gold:{letter:"G",color:"linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)",bold:true,isGradient:true},Rainbow:{letter:"R",color:"linear-gradient(110deg, #ff003c, #ff9a00, #f0ff00, #30ff00, #00fbff, #0018ff, #e100ff)",bold:true,isGradient:true},Dawncharged:{letter:"D",color:"rgb(200, 150, 255)",bold:true},Ambercharged:{letter:"A",color:"rgb(250, 140, 75)",bold:true},"Max Weight":{letter:"S",color:"#717171",bold:false}};function h2(e){const t=m2[e];if(!t){const o=document.createElement("span");return o.textContent=e.charAt(0).toUpperCase(),o.style.cssText="color: #888; font-size: 18px;",o}const n=document.createElement("span");return n.textContent=t.letter,n.title=e,t.isGradient?n.style.cssText=`
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
        `,n}function Px(e){const t=h2(e),n=t.textContent??e.charAt(0).toUpperCase(),o=t.getAttribute("style")??"";return {text:n,css:o}}const $d="css-qnqsp4",Dd="css-v439q6",Rl="gemini-qol-missingVariants";let Ho=qe(),Fd=false,Sr=false,bs=null,Xn=null;const b2=`
  .${Rl} {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;function x2(){if(Fd)return;const e=document.createElement("style");e.id="gemini-qol-missingVariants-styles",e.textContent=b2,document.head.appendChild(e),Ho.add(()=>e.remove()),Fd=true;}function ig(){return He.getCropVariants()}function Lx(e){const t=He.getMyJournal();if(!t)return ig();const o=t.produce?.[e]?.variantsLogged?.map(i=>i.variant)??[];return ig().filter(i=>!o.includes(i))}function y2(e){const t=J.get("plants")??{};return e in t?true:Pl(e)?.type==="crop"}function v2(){const t=Le().get().plant;if(!t)return null;let n=null;if(t.currentSlotIndex!==null){const r=t.slots[t.currentSlotIndex];r&&(n=r.species);}return n||(n=t.species),Pl(n??"")?.id??n}function w2(e){const t=document.querySelectorAll(`.${Rl}`),n=Lx(e);for(const o of t){if(n.length===0){o.remove();continue}const r=Array.from(o.children).map(i=>i.title);if(JSON.stringify(r)!==JSON.stringify(n)){o.replaceChildren();for(const i of n){const a=Px(i),s=document.createElement("span");s.textContent=a.text,s.title=i,s.style.cssText=a.css,o.appendChild(s);}}}}function C2(){Xn!==null&&cancelAnimationFrame(Xn),Xn=requestAnimationFrame(()=>{Xn=null;const e=v2();if(!e)return;const t=Mx();for(const n of t)wo(n);w2(e);});}function S2(e){if(!y2(e))return null;const t=Lx(e);if(t.length===0)return null;const n=document.createElement("div");n.className=Rl;for(const o of t){const r=Px(o),i=document.createElement("span");i.textContent=r.text,i.title=o,i.style.cssText=r.css,n.appendChild(i);}return n}function Mx(){const e=[],t=document.querySelectorAll(`.${$d}`);for(const o of t)o.offsetParent&&(o.closest("button.chakra-button")||e.push({element:o}));const n=document.querySelectorAll(`.${Dd}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelectorAll(".McFlex");for(const i of r){const a=i.querySelector("p.chakra-text");if(a&&a.textContent&&!a.textContent.includes("%")){e.push({element:i});break}}}return e}function wo(e){if(!e.element.querySelector(`.${Rl}`))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;let o=null;const i=Le().get().plant;i&&(i.currentSlotIndex!==null&&i.slots[i.currentSlotIndex]?o=i.slots[i.currentSlotIndex].species:o=i.species);const a=t.textContent?.trim()??"",s=Pl(a);if(s?.type==="crop"&&(o=s.id),!o)return;const l=S2(o);l&&(Ht(()=>{n.appendChild(l);}),Ho.add(()=>l.remove()));}catch(t){console.warn("[MissingVariantsIndicator] Failed to inject:",t);}}function k2(){const e=Mx();for(const n of e)wo(n);bs=Le().subscribePlantInfo(()=>{C2();});const t=new MutationObserver(n=>{for(const o of n)o.type==="childList"&&o.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.classList.contains($d)&&(r.closest("button.chakra-button")||wo({element:r})),r.querySelectorAll(`.${$d}`).forEach(s=>{s.closest("button.chakra-button")||wo({element:s});}),r.classList.contains(Dd)&&!r.closest("button.chakra-button")){const s=r.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&wo({element:l});}}r.querySelectorAll(`.${Dd}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const c=l[l.length-1];c.querySelector("p.chakra-text")&&wo({element:c});}}});}});});t.observe(document.body,{childList:true,subtree:true}),fo(Ho,t);}async function _2(){for(let n=1;n<=5;n++){if(!He.isReady())try{He.init();}catch(r){console.warn("[MissingVariantsIndicator] Failed to init journal checker:",r);}if(He.getMyJournal())return console.log("[MissingVariantsIndicator] Journal data available"),true;n<5&&await new Promise(r=>setTimeout(r,1e3));}return console.warn("[MissingVariantsIndicator] Journal data not available, continuing anyway"),false}const Ip={init(){Sr||(Sr=true,x2(),k2(),_2().catch(e=>{console.warn("[MissingVariantsIndicator] Error waiting for journal data:",e);}));},destroy(){Sr&&(Sr=false,bs&&(bs(),bs=null),Xn!==null&&(cancelAnimationFrame(Xn),Xn=null),Ho.run(),Ho.clear(),Ho=qe(),Fd=false);},isEnabled(){return Sr}},Rx=_e.MISSING_VARIANTS_INDICATOR,E2={enabled:false};function Pp(){return ye(Rx,E2)}function T2(e){we(Rx,e);}let Ai=false;function Nx(){Ai||!Pp().enabled||(Ai=true,Ip.init(),console.log("✅ [MissingVariantsIndicator] Initialized"));}function Ox(){Ai&&(Ip.destroy(),Ai=false,console.log("🛑 [MissingVariantsIndicator] Destroyed"));}function A2(){return Ai}function I2(){return Pp().enabled}function P2(e){const t=Pp();t.enabled!==e&&(t.enabled=e,T2(t),e?Nx():Ox());}const Ic={init:Nx,destroy:Ox,isReady:A2,isEnabled:I2,setEnabled:P2,render:Ip},$x=_e.SHOP_NOTIFIER,Dx={seed:[],tool:[],egg:[],decor:[]},L2={enabled:false,trackedItems:Dx},M2=["seed","tool","egg","decor"];function Fx(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function Qi(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function ur(){const e=ye($x,L2);return {enabled:e?.enabled??false,trackedItems:Fx(e?.trackedItems)}}function Nl(e){we($x,{enabled:e.enabled,trackedItems:Qi(e.trackedItems)});}function R2(e){const n={...ur(),...e};return e.trackedItems&&(n.trackedItems=Fx(e.trackedItems)),Nl(n),n}function Lp(){return ur().enabled}function N2(e){R2({enabled:e});}function Bx(){return Qi(ur().trackedItems)}function zx(){const e=Bx(),t=[];for(const n of M2)for(const o of e[n])t.push({shopType:n,itemId:o});return t}function O2(e,t){const n=ur(),o=Qi(n.trackedItems),r=o[e];if(r.includes(t))return;r.push(t),Nl({...n,trackedItems:o});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(i);}function Gx(e,t){const n=ur(),o=Qi(n.trackedItems),r=o[e],i=r.filter(s=>s!==t);if(i.length===r.length)return;o[e]=i,Nl({...n,trackedItems:o});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(a);}function $2(){const e=ur();Nl({...e,trackedItems:Qi(Dx)});}let Xs=false;const Bd=[];function D2(e,t){const n=Bx()[e];if(!n.length)return [];const o=new Set(n);return t.items.filter(r=>o.has(r.id)&&r.isAvailable).map(r=>({itemId:r.id,remaining:r.remaining}))}function La(e,t){const n=D2(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const o=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(o);}function F2(){if(Xs)return;Xs=true;const e=lr();Bd.push(e.subscribeSeedRestock(t=>La("seed",t)),e.subscribeToolRestock(t=>La("tool",t)),e.subscribeEggRestock(t=>La("egg",t)),e.subscribeDecorRestock(t=>La("decor",t)));}function B2(){if(Xs){Xs=false;for(const e of Bd)e();Bd.length=0;}}const Hx={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function z2(e,t,n){const o=n.find(i=>typeof i=="object"&&i!==null&&"toolId"in i&&i.toolId===e);return o?(o.quantity??0)>=t:false}function G2(e,t,n){const o=n.find(c=>typeof c=="object"&&c!==null&&"decorId"in c&&c.decorId===e),r=o?o.quantity??0:0,s=sr().get().decors.all.filter(c=>typeof c=="object"&&c!==null&&"decorId"in c&&c.decorId===e).length;return r+s>=t}function jx(e,t,n,o){return t==="tool"?z2(e,n,o):t==="decor"?G2(e,n,o):false}function ag(e,t){const n=Hx[e];if(!n||n.shopType!==t)return  false;const r=At().get();return jx(e,t,n.maxQuantity,r.items)}function sg(){const t=At().get(),n=zx();for(const o of n){const r=Hx[o.itemId];r&&r.shopType===o.shopType&&jx(o.itemId,o.shopType,r.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${o.itemId} (max quantity reached)`),Gx(o.shopType,o.itemId));}}let Ys=false,xs=null;function H2(){if(Ys)return;Ys=true,xs=At().subscribeStable(()=>{sg();}),sg();}function j2(){Ys&&(Ys=false,xs&&(xs(),xs=null));}let Ii=false;function Ux(){if(Ii){console.log("[ShopNotifier] Already initialized");return}if(!Lp()){console.log("[ShopNotifier] Disabled");return}Ii=true,F2(),H2(),console.log("[ShopNotifier] Initialized");}function Wx(){Ii&&(B2(),j2(),Ii=false,console.log("[ShopNotifier] Destroyed"));}function U2(){return Ii}function W2(){return Lp()}function V2(e){if(Lp()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}N2(e),e?Ux():Wx(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const ao={init:Ux,destroy:Wx,isReady:U2,isEnabled:W2,setEnabled:V2,addTrackedItem:O2,removeTrackedItem:Gx,getTrackedItems:zx,resetTrackedItems:$2},Vx=_e.WEATHER_NOTIFIER,q2={enabled:false,trackedWeathers:[]};function qx(e){return Array.isArray(e)?[...e]:[]}function Ol(e){return [...e]}function Zi(){const e=ye(Vx,q2);return {enabled:e?.enabled??false,trackedWeathers:qx(e?.trackedWeathers)}}function Mp(e){we(Vx,{enabled:e.enabled,trackedWeathers:Ol(e.trackedWeathers)});}function K2(e){const n={...Zi(),...e};return e.trackedWeathers&&(n.trackedWeathers=qx(e.trackedWeathers)),Mp(n),n}function Kx(){return Zi().enabled}function X2(e){K2({enabled:e});}function $l(){return Ol(Zi().trackedWeathers)}function Y2(e){return $l().includes(e)}function J2(e){const t=Zi(),n=Ol(t.trackedWeathers);if(n.includes(e))return;n.push(e);const o=!t.enabled&&n.length>0,r={trackedWeathers:n,enabled:o?true:t.enabled};Mp(r);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:o}});window.dispatchEvent(i);const a=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(a);}function Q2(e){const t=Zi(),n=Ol(t.trackedWeathers),o=n.filter(s=>s!==e);if(o.length===n.length)return;const r=t.enabled&&o.length===0,i={trackedWeathers:o,enabled:r?false:t.enabled};Mp(i);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:r}});window.dispatchEvent(a);}let oi=null,ys="Sunny",qt=false,ri=null,Js="";function Xx(e){return `${e.soundId}:${e.volume}:${e.mode}`}function Qs(e){const t=de.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:Oe.CustomSounds.getNotificationConfig("weather")}function Z2(e){if(qt)return;const t=Oe.CustomSounds.getById(e.soundId);if(t){ri=t.source,qt=true,Js=Xx(e);try{Oe.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{qt=false,ri=null,Js="";}}}function vs(){if(qt){try{const e=Oe.getCustomHandle();(!ri||e&&e.url===ri)&&Oe.CustomSounds.stop();}catch{}qt=false,ri=null,Js="";}}function Pi(e,t){const n=t??Qs(e);if(n.mode!=="loop"){qt&&vs();return}if(!$l().includes(e)){qt&&vs();return}const i=Xx(n);qt&&i!==Js&&vs(),qt||Z2(n);}function Yx(e){const{weatherId:t}=e.detail||{};if(!t)return;const r=Ki().get().id,i=Qs(t);if(r===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),i.mode==="one-shot"&&Zx(i),Pi(r,i);const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function Jx(){const t=Ki().get().id;Pi(t);}function Qx(e){if(e.detail?.entityType!=="weather")return;const o=Ki().get().id;Pi(o);}function eL(){if(oi){console.log("[WeatherNotifier] Already tracking");return}const e=Ki(),t=e.get();ys=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",ys),window.addEventListener("gemini:weather-tracked-check",Yx),window.addEventListener("gemini:tracked-weathers-changed",Jx),window.addEventListener(Me.CUSTOM_SOUND_CHANGE,Qx);const n=Qs(t.id);Pi(t.id,n),oi=e.subscribeStable(o=>{const r=o.current.id,i=o.previous.id,a=Qs(r);if(console.log("[WeatherNotifier] Weather changed:",{previous:i,current:r}),Pi(r,a),r!==i&&$l().includes(r)){console.log("[WeatherNotifier] Tracked weather detected:",r),a.mode==="one-shot"&&Zx(a);const l=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:r}});window.dispatchEvent(l);}ys=r;}),console.log("[WeatherNotifier] Tracking initialized");}function tL(){window.removeEventListener("gemini:weather-tracked-check",Yx),window.removeEventListener("gemini:tracked-weathers-changed",Jx),window.removeEventListener(Me.CUSTOM_SOUND_CHANGE,Qx),oi&&(oi(),oi=null,ys="Sunny",vs(),console.log("[WeatherNotifier] Tracking stopped"));}function Zx(e){try{Oe.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let Li=false;function ey(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),ny(),ty());}function ty(){if(Li){console.log("[WeatherNotifier] Already initialized");return}if(Li=true,window.addEventListener("gemini:tracked-weathers-changed",ey),!Kx()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),eL(),console.log("[WeatherNotifier] Initialized");}function ny(){Li&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",ey),tL(),Li=false,console.log("[WeatherNotifier] Destroyed"));}function nL(){return Li}const tr={init:ty,destroy:ny,isReady:nL,isEnabled:Kx,setEnabled:X2,getTrackedWeathers:$l,addTrackedWeather:J2,removeTrackedWeather:Q2,isWeatherTracked:Y2},oL={enabled:false,threshold:5};function Dl(){return ye(_e.PET_HUNGER_NOTIFIER,oL)}function oy(e){we(_e.PET_HUNGER_NOTIFIER,e);}function ry(){return Dl().enabled}function rL(e){const t=Dl();t.enabled=e,oy(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function iy(){return Dl().threshold}function iL(e){const t=Dl();t.threshold=e,oy(t);}let ii=null;const ws=new Set;let kn=false,ai=null;function aL(e){if(kn)return;const t=Oe.CustomSounds.getById(e.soundId);if(t){ai=t.source,kn=true;try{Oe.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{kn=false,ai=null;}}}function zd(){if(kn){try{const e=Oe.getCustomHandle();(!ai||e&&e.url===ai)&&Oe.CustomSounds.stop();}catch{}kn=false,ai=null;}}function sL(e,t){if(t.mode!=="loop"){kn&&zd();return}e?kn||aL(t):kn&&zd();}function lL(){if(ii){console.log("[PetHungerNotifier] Already tracking");return}const e=po(),t=iy();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),ii=e.subscribe(n=>{const o=n.byLocation.active,r=Oe.CustomSounds.getNotificationConfig("pet"),i=r.mode==="loop";let a=false;for(const s of o)if(s.hungerPercent<t){if(a=true,!ws.has(s.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:s.name||s.petSpecies,species:s.petSpecies,hungerPercent:s.hungerPercent.toFixed(2)+"%"}),i||dL(r);const l=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:s}});window.dispatchEvent(l),ws.add(s.id);}}else ws.delete(s.id);sL(a,r);}),console.log("[PetHungerNotifier] Tracking initialized");}function cL(){ii&&(ii(),ii=null,ws.clear(),zd(),console.log("[PetHungerNotifier] Tracking stopped"));}function dL(e){try{Oe.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let Mi=false;function ay(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),ly(),sy());}function sy(){if(Mi){console.log("[PetHungerNotifier] Already initialized");return}if(Mi=true,window.addEventListener("gemini:pet-hunger-config-changed",ay),!ry()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),lL(),console.log("[PetHungerNotifier] Initialized");}function ly(){Mi&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",ay),cL(),Mi=false,console.log("[PetHungerNotifier] Destroyed"));}function uL(){return Mi}const Ri={init:sy,destroy:ly,isReady:uL,isEnabled:ry,setEnabled:rL,getThreshold:iy,setThreshold:iL},pL={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},cy=_e.ARIES_API;function Rp(){return ye(cy,pL)}function fL(e){we(cy,e);}function gL(e){const n={...Rp(),...e};return fL(n),n}let Zs=null,el=null;function lg(e){Zs=e;}function cg(e){el=e;}function mL(){return Zs?[...Zs]:[]}function hL(){return el?[...el]:[]}function dg(){Zs=null,el=null;}function dy(e,t){const n=Rp(),o=new URL(e,n.apiBaseUrl);if(t)for(const[r,i]of Object.entries(t))i!==void 0&&o.searchParams.set(r,String(i));return o.toString()}function Fl(e,t){return new Promise(n=>{const o=dy(e,t);GM_xmlhttpRequest({method:"GET",url:o,headers:{},onload:r=>{if(r.status>=200&&r.status<300)try{const i=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:i});}catch(i){console.error("[AriesAPI] GET parse error:",i,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] GET error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] GET request failed:",r),n({status:0,data:null});}});})}function Bl(e,t){return new Promise(n=>{const o=dy(e);GM_xmlhttpRequest({method:"POST",url:o,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:r=>{if(r.status>=200&&r.status<300)try{const i=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:i});}catch(i){console.error("[AriesAPI] POST parse error:",i,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] POST error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] POST request failed:",r),n({status:0,data:null});}});})}async function Np(e=50){const{data:t}=await Fl("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(o=>({name:o.name,avatarUrl:o.avatar_url??null})):void 0}))}async function bL(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,i=n.toLowerCase(),a=await Np(r),s=[];for(const l of a){if(!l.userSlots||l.userSlots.length===0)continue;const c=l.userSlots.filter(d=>d.name?d.name.toLowerCase().includes(i):false);c.length>0&&s.push({room:l,matchedSlots:c});}return s}async function xL(e){if(!e)return null;const{status:t,data:n}=await Fl("get-player-view",{playerId:e});return t===404?null:n}async function zl(e,t){const n=Array.from(new Set((e??[]).map(a=>String(a).trim()).filter(a=>a.length>=3)));if(n.length===0)return [];const o={playerIds:n};t?.sections&&(o.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:r,data:i}=await Bl("get-players-view",o);return r!==200||!Array.isArray(i)?[]:i}async function yL(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,i=n.toLowerCase(),a=await Np(r),s=new Map;for(const l of a)if(!(!l.userSlots||l.userSlots.length===0))for(const c of l.userSlots){if(!c.name||!c.name.toLowerCase().includes(i))continue;const u=`${l.id}::${c.name}`;s.has(u)||s.set(u,{playerName:c.name,avatarUrl:c.avatarUrl,roomId:l.id,roomPlayersCount:l.playersCount});}return Array.from(s.values())}async function uy(e){if(!e)return [];const{status:t,data:n}=await Fl("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function vL(e){const t=await uy(e);if(t.length===0)return lg([]),[];const n=await zl(t,{sections:["profile","room"]});return lg(n),[...n]}async function Op(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await Fl("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function wL(e){const{incoming:t}=await Op(e),n=t.map(r=>r.fromPlayerId);if(n.length===0)return cg([]),[];const o=await zl(n,{sections:["profile"]});return cg(o),[...o]}async function CL(e){const{outgoing:t}=await Op(e),n=t.map(o=>o.toPlayerId);return n.length===0?[]:zl(n,{sections:["profile"]})}async function SL(e,t){if(!e||!t||e===t)return  false;const{status:n}=await Bl("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function kL(e){const{playerId:t,otherPlayerId:n,action:o}=e;if(!t||!n||t===n)return  false;const{status:r}=await Bl("friend-respond",{playerId:t,otherPlayerId:n,action:o});return r===204}async function _L(e,t){if(!e||!t||e===t)return  false;const{status:n}=await Bl("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let kr=false;const tl={init(){kr||(kr=true,console.log("[AriesAPI] Initialized"));},destroy(){kr&&(kr=false,dg(),console.log("[AriesAPI] Destroyed"));},isReady(){return kr},getConfig(){return Rp()},updateConfig(e){return gL(e)},fetchRooms:Np,searchRoomsByPlayerName:bL,fetchPlayerView:xL,fetchPlayersView:zl,searchPlayersByName:yL,fetchFriendsIds:uy,fetchFriendsWithViews:vL,fetchFriendRequests:Op,fetchIncomingRequestsWithViews:wL,fetchOutgoingRequestsWithViews:CL,sendFriendRequest:SL,respondFriendRequest:kL,removeFriend:_L,getCachedFriends:mL,getCachedIncomingRequests:hL,clearCache:dg},ug={enabled:true,manualLocks:[],overallRules:[],speciesRules:{}};function nl(){return `rule-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function EL(e){const t={enabled:e.enabled,manualLocks:e.manualLocks||[],overallRules:[],speciesRules:{}},n=e.globalCriteria?.lockByScale?.enabled,o=(e.globalCriteria?.lockedMutations?.length??0)>0;if(n||o){const r={id:nl(),name:"Migrated Global Rule",enabled:true,mode:"lock",sizeCondition:n?{enabled:true,minPercentage:e.globalCriteria.lockByScale.minPercentage}:void 0,mutationCondition:o?{enabled:true,mutations:e.globalCriteria.lockedMutations,matchMode:"any"}:void 0};t.overallRules.push(r);}if(e.speciesOverrides)for(const[r,i]of Object.entries(e.speciesOverrides)){const a=i.lockByScale?.enabled,s=(i.lockedMutations?.length??0)>0;if(a||s){const l={id:nl(),name:`Migrated ${r} Rule`,enabled:true,mode:"lock",sizeCondition:a?{enabled:true,minPercentage:i.lockByScale.minPercentage}:void 0,mutationCondition:s?{enabled:true,mutations:i.lockedMutations,matchMode:"any"}:void 0};t.speciesRules[r]=[l];}}return console.log("[HarvestLocker] Migrated legacy config to new format"),t}function TL(e){const t=e;return t!==null&&typeof t=="object"&&"globalCriteria"in t&&!("overallRules"in t)}function Re(){const e=ye(Ye.FEATURE.HARVEST_LOCKER,ug);if(TL(e)){const t=EL(e);return xt(t),t}return {...ug,...e,manualLocks:e.manualLocks||[],overallRules:e.overallRules||[],speciesRules:e.speciesRules||{}}}function xt(e){we(Ye.FEATURE.HARVEST_LOCKER,e);}function py(e,t,n,o){return {id:nl(),name:e,enabled:true,mode:t,sizeCondition:n,mutationCondition:o}}function AL(e){const t=Re();t.overallRules.push(e),xt(t);}function IL(e,t){const n=Re();n.speciesRules[e]||(n.speciesRules[e]=[]),n.speciesRules[e].push(t),xt(n);}function fy(e,t){const n=Re(),o=n.overallRules.findIndex(r=>r.id===e);if(o!==-1){n.overallRules[o]={...n.overallRules[o],...t},xt(n);return}for(const r of Object.keys(n.speciesRules)){const i=n.speciesRules[r].findIndex(a=>a.id===e);if(i!==-1){n.speciesRules[r][i]={...n.speciesRules[r][i],...t},xt(n);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function PL(e){const t=Re(),n=t.overallRules.findIndex(o=>o.id===e);if(n!==-1){t.overallRules.splice(n,1),xt(t);return}for(const o of Object.keys(t.speciesRules)){const r=t.speciesRules[o].findIndex(i=>i.id===e);if(r!==-1){t.speciesRules[o].splice(r,1),t.speciesRules[o].length===0&&delete t.speciesRules[o],xt(t);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function LL(e,t){const n=Re(),o=n.overallRules.find(i=>i.id===e);if(!o){console.warn(`[HarvestLocker] Rule ${e} not found`);return}const r={...o,id:nl(),name:`${o.name} (${t})`};n.speciesRules[t]||(n.speciesRules[t]=[]),n.speciesRules[t].push(r),xt(n);}const to=new Set;let Kt=null;const ol=[];function ML(e){if(ol.length>0){console.warn("[HarvestLocker] Already started");return}Kt=e;const t=sr().subscribeStable(n=>{if(!n){to.clear();return}gy(n);});ol.push(t);}function RL(){ol.forEach(e=>e()),ol.length=0,to.clear(),Kt=null,console.log("[HarvestLocker] Stopped");}function An(e){Kt=e;const t=sr().get();t&&gy(t);}function $p(e,t){const n=`${e}-${t}`;return to.has(n)}function NL(){return Array.from(to)}function gy(e){if(Kt){if(to.clear(),Kt.manualLocks.forEach(t=>to.add(t)),!BL(e)){console.warn("[HarvestLocker] Invalid garden structure"),window.dispatchEvent(new CustomEvent(Me.HARVEST_LOCKER_LOCKS_UPDATED));return}e.plants.all.forEach(t=>{t.slots.forEach((n,o)=>{const r=`${t.tileIndex}-${o}`,i=OL(n.species);$L(n,i)&&to.add(r);});}),window.dispatchEvent(new CustomEvent(Me.HARVEST_LOCKER_LOCKS_UPDATED));}}function OL(e){return Kt?Kt.speciesRules[e]?Kt.speciesRules[e].filter(t=>t.enabled):Kt.overallRules.filter(t=>t.enabled):[]}function $L(e,t){const n=t.filter(r=>r.mode==="lock"),o=t.filter(r=>r.mode==="allow");for(const r of n)if(pg(e,r))return  true;return o.length>0&&!o.some(i=>pg(e,i))}function pg(e,t){const n=[];if(t.sizeCondition?.enabled){const o=FL(e),r=t.sizeCondition.sizeMode??"max";n.push(r==="max"?o>=t.sizeCondition.minPercentage:o<=t.sizeCondition.minPercentage);}if(t.mutationCondition?.enabled&&t.mutationCondition.mutations.length>0){const o=DL(e.mutations,t.mutationCondition.mutations,t.mutationCondition.matchMode);n.push(o);}return n.length>0&&n.every(o=>o)}function DL(e,t,n){const o=t.includes("none"),r=t.filter(a=>a!=="none"),i=o&&e.length===0;return n==="any"?i?true:r.some(a=>e.includes(a)):o&&e.length>0?false:r.length===0?i:r.every(a=>e.includes(a))}function FL(e){const n=J.get("plants")?.[e.species];if(!n||typeof n!="object"||!("crop"in n))return 0;const o=n.crop;if(typeof o!="object"||!o)return 0;const{baseTileScale:r,maxScale:i}=o,a=i-r;return a===0?100:(e.targetScale-r)/a*100}function BL(e){return typeof e=="object"&&e!==null&&"plants"in e&&typeof e.plants=="object"&&e.plants!==null&&"all"in e.plants&&Array.isArray(e.plants.all)}function Gl(e,t){const n=new MutationObserver(r=>{for(const i of r)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const l of s)t(l);}});n.observe(document.body,{childList:true,subtree:true});const o=document.querySelectorAll(e);for(const r of o)t(r);return {disconnect:()=>n.disconnect()}}function Hl(e,t){const n=new MutationObserver(o=>{for(const r of o)for(const i of r.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const zL=`
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
`,fg="css-qnqsp4",my="gemini-qol-harvestLocker-locked",Gd="gemini-qol-harvestLocker-lock-icon",Hd="gemini-qol-harvestLocker-styles",GL='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Ft=null,Cs=false;const jd=[];function Ma(e){jd.push(e);}function HL(){for(const e of jd)try{e();}catch(t){console.warn("[HarvestLocker Inject] Cleanup error:",t);}jd.length=0;}function jL(){if(Cs)return;if(document.getElementById(Hd)){Cs=true;return}const e=document.createElement("style");e.id=Hd,e.textContent=zL,document.head.appendChild(e),Cs=true;}function UL(){document.getElementById(Hd)?.remove(),Cs=false;}function WL(e){if(e.classList.add(my),!e.querySelector(`#${Gd}`)){const t=document.createElement("div");t.id=Gd,t.innerHTML=GL,e.appendChild(t);}}function rl(e){e.classList.remove(my),e.querySelector(`#${Gd}`)?.remove();}function Pc(){if(!Ft)return;const e=Le().get();if(!e.plant||e.position.localIndex===null||e.plant.nextHarvestSlotIndex===null){rl(Ft),console.log("[HarvestLocker Inject] No plant data — overlay removed");return}const t=String(e.position.localIndex),n=e.plant.nextHarvestSlotIndex;$p(t,n)?(WL(Ft),console.log(`[HarvestLocker Inject] LOCKED — overlay applied (${e.plant.species} tile:${t} slot:${n})`)):(rl(Ft),console.log(`[HarvestLocker Inject] unlocked — overlay removed (${e.plant.species} tile:${t} slot:${n})`));}function VL(){jL();const e=Gl(`.${fg}`,r=>{Ft=r,Pc();});Ma(()=>e.disconnect());const t=Hl(`.${fg}`,r=>{Ft===r&&(rl(r),Ft=null);});Ma(()=>t.disconnect());const n=Le().subscribePlantInfo(()=>{Pc();});Ma(n);const o=()=>Pc();window.addEventListener(Me.HARVEST_LOCKER_LOCKS_UPDATED,o),Ma(()=>window.removeEventListener(Me.HARVEST_LOCKER_LOCKS_UPDATED,o)),console.log("[HarvestLocker Inject] Started");}function qL(){Ft&&(rl(Ft),Ft=null),HL(),UL(),console.log("[HarvestLocker Inject] Stopped");}let Ra=false;const hy={init(){Ra||(VL(),Ra=true);},destroy(){Ra&&(qL(),Ra=false);},isEnabled(){return Re().enabled}},by=[];function KL(){return by.slice()}function XL(e){by.push(e);}function xy(e){try{return JSON.parse(e)}catch{return}}function gg(e){if(typeof e=="string"){const t=xy(e);return t!==void 0?t:e}return e}function yy(e){if(e!=null){if(typeof e=="string"){const t=xy(e);return t!==void 0?yy(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function YL(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function le(e,t,n){const o=typeof t=="boolean"?t:true,r=typeof t=="function"?t:n,i=(a,s)=>{if(yy(a)!==e)return;const c=r(a,s);return c&&typeof c=="object"&&"kind"in c?c:typeof c=="boolean"?c?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return XL(i),i}const _r=new WeakSet,mg=new WeakMap;function JL(e){const t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:KL();if(!o.length)return ()=>{};const r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const h of o){const x=h(g,r(f));if(x){if(x.kind==="drop")return {kind:"drop"};x.kind==="replace"&&(g=x.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,l=null;const c=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(_r.has(f))return  true;const g=f.bind(p);function h(...x){const b=x.length===1?x[0]:x,C=gg(b),S=i(C,YL(t));if(S?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",C);return}if(S?.kind==="replace"){const _=S.message;return x.length>1&&Array.isArray(_)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",C,"=>",_),g(..._)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",C,"=>",_),g(_))}return g(...x)}_r.add(h),mg.set(h,f);try{p.sendMessage=h,_r.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===h&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||_r.has(f))return;function g(h){const x=gg(h),b=i(x,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",x);return}if(b?.kind==="replace"){const C=b.message,S=typeof C=="string"||C instanceof ArrayBuffer||C instanceof Blob?C:JSON.stringify(C);return n&&console.log("[WS] replace outgoing (ws.send)",x,"=>",C),f.call(this,S)}return f.call(this,h)}_r.add(g),mg.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!c()&&u>0){const p=Date.now();l=setInterval(()=>{if(c()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(l){try{clearInterval(l);}catch{}l=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();le(K.HarvestCrop,(e,t)=>{if(!Re().enabled)return  true;const o=e,r=o.slot!==void 0?String(o.slot):void 0,i=o.slotsIndex;return r!==void 0&&typeof i=="number"&&$p(r,i)?(console.log(`[HarvestLocker] Blocked harvest for slot ${r}-${i}`),false):true});let nr=false;function vy(){if(nr){console.warn("[HarvestLocker] Already initialized");return}const e=Re();if(!e.enabled){console.log("[HarvestLocker] Disabled");return}nr=true,ML(e),hy.init(),console.log("[HarvestLocker] Initialized");}function wy(){nr&&(hy.destroy(),RL(),nr=false,console.log("[HarvestLocker] Destroyed"));}function QL(){return Re().enabled}function ZL(e){const t=Re();t.enabled=e,xt(t),e&&!nr?vy():!e&&nr&&wy();}function eM(e,t){return $p(e,t)}function tM(){return NL()}function nM(e,t){const n=Re(),o=`${e}-${t}`;n.manualLocks.includes(o)||(n.manualLocks.push(o),xt(n),An(n));}function oM(e,t){const n=Re(),o=`${e}-${t}`;n.manualLocks=n.manualLocks.filter(r=>r!==o),xt(n),An(n);}function rM(){const e=Re();e.manualLocks=[],xt(e),An(e);}function iM(){return Re()}function aM(){return Re().overallRules}function sM(e){return Re().speciesRules[e]||[]}function lM(){const e=Re();return Object.keys(e.speciesRules)}function cM(e,t,n,o){const r=py(e,t,n,o);return AL(r),An(Re()),r}function dM(e,t,n,o,r){const i=py(t,n,o,r);return IL(e,i),An(Re()),i}function uM(e,t){fy(e,t),An(Re());}function pM(e){PL(e),An(Re());}function fM(e,t){fy(e,{enabled:t}),An(Re());}const tt={init:vy,destroy:wy,isEnabled:QL,setEnabled:ZL,isLocked:eM,getAllLockedSlots:tM,lockSlot:nM,unlockSlot:oM,clearManualLocks:rM,getOverallRules:aM,getSpeciesRules:sM,getAllSpeciesWithRules:lM,addNewOverallRule:cM,addNewSpeciesRule:dM,modifyRule:uM,removeRule:pM,toggleRule:fM,cloneRuleToSpecies:LL,getConfig:iM},hg={enabled:true,blockedEggs:[]};function rn(){const e=ye(Ye.FEATURE.EGG_LOCKER,hg);return {...hg,...e,blockedEggs:e.blockedEggs||[]}}function jl(e){we(Ye.FEATURE.EGG_LOCKER,e);}function gM(e){const t=rn();t.blockedEggs.includes(e)||(t.blockedEggs.push(e),jl(t),window.dispatchEvent(new CustomEvent(Me.EGG_LOCKER_LOCKS_UPDATED)));}function mM(e){const t=rn();t.blockedEggs=t.blockedEggs.filter(n=>n!==e),jl(t),window.dispatchEvent(new CustomEvent(Me.EGG_LOCKER_LOCKS_UPDATED));}const hM=`
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
`,bg="css-qnqsp4",Cy="gemini-qol-eggLocker-locked",Ud="gemini-qol-eggLocker-lock-icon",Wd="gemini-qol-eggLocker-styles",bM='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Bt=null,Ss=false;const Vd=[];function Na(e){Vd.push(e);}function xM(){for(const e of Vd)try{e();}catch(t){console.warn("[EggLocker Inject] Cleanup error:",t);}Vd.length=0;}function yM(){if(Ss)return;if(document.getElementById(Wd)){Ss=true;return}const e=document.createElement("style");e.id=Wd,e.textContent=hM,document.head.appendChild(e),Ss=true;}function vM(){document.getElementById(Wd)?.remove(),Ss=false;}function wM(e){if(e.classList.add(Cy),!e.querySelector(`#${Ud}`)){const t=document.createElement("div");t.id=Ud,t.innerHTML=bM,e.appendChild(t);}}function il(e){e.classList.remove(Cy),e.querySelector(`#${Ud}`)?.remove();}function Lc(){if(!Bt)return;const e=Le().get();if(e.object.type!=="egg"||!e.object.data){il(Bt);return}const t=e.object.data;vn.getBlockedEggs().includes(t.eggId)?(wM(Bt),console.log(`[EggLocker Inject] LOCKED — overlay applied (${t.eggId})`)):(il(Bt),console.log(`[EggLocker Inject] unlocked — overlay removed (${t.eggId})`));}function CM(){yM();const e=Gl(`.${bg}`,r=>{Bt=r,Lc();});Na(()=>e.disconnect());const t=Hl(`.${bg}`,r=>{Bt===r&&(il(r),Bt=null);});Na(()=>t.disconnect());const n=Le().subscribeObject(()=>{Lc();});Na(n);const o=()=>Lc();window.addEventListener(Me.EGG_LOCKER_LOCKS_UPDATED,o),Na(()=>window.removeEventListener(Me.EGG_LOCKER_LOCKS_UPDATED,o)),console.log("[EggLocker Inject] Started");}function SM(){Bt&&(il(Bt),Bt=null),xM(),vM(),console.log("[EggLocker Inject] Stopped");}let Oa=false;const Sy={init(){Oa||(CM(),Oa=true);},destroy(){Oa&&(SM(),Oa=false);},isEnabled(){return rn().enabled}};le(K.HatchEgg,()=>{const e=rn();if(!e.enabled)return  true;const t=Le().get();if(t.object.type!=="egg"||!t.object.data)return  true;const n=t.object.data.eggId;return e.blockedEggs.includes(n)?(console.log(`[EggLocker] Blocked hatch for ${n}`),false):(console.log(`[EggLocker] Allowed hatch for ${n}`),true)});let or=false;function ky(){if(or)return;if(!rn().enabled){console.log("[EggLocker] Disabled");return}or=true,Sy.init(),console.log("[EggLocker] Initialized");}function _y(){or&&(Sy.destroy(),or=false,console.log("[EggLocker] Destroyed"));}function kM(){return rn().enabled}function _M(e){const t=rn();t.enabled=e,jl(t),e&&!or?ky():!e&&or&&_y();}function EM(){const e=J.get("eggs");return e?Object.keys(e):[]}function TM(){return rn().blockedEggs}function AM(e){gM(e);}function IM(e){mM(e);}function PM(){const e=rn();e.blockedEggs=[],jl(e);}const vn={init:ky,destroy:_y,isEnabled:kM,setEnabled:_M,getAvailableEggs:EM,getBlockedEggs:TM,blockEgg:AM,unblockEgg:IM,clearBlocks:PM},xg={enabled:true,blockedDecors:[]};function It(){const e=ye(Ye.FEATURE.DECOR_LOCKER,xg);return {...xg,...e,blockedDecors:e.blockedDecors||[]}}function ea(e){we(Ye.FEATURE.DECOR_LOCKER,e);}function LM(e){const t=It();t.blockedDecors.includes(e)||(t.blockedDecors.push(e),ea(t),window.dispatchEvent(new CustomEvent(Me.DECOR_LOCKER_LOCKS_UPDATED)));}function MM(e){const t=It();t.blockedDecors=t.blockedDecors.filter(n=>n!==e),ea(t),window.dispatchEvent(new CustomEvent(Me.DECOR_LOCKER_LOCKS_UPDATED));}const RM=`
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
`,yg="css-qnqsp4",Ey="gemini-qol-decorLocker-locked",qd="gemini-qol-decorLocker-lock-icon",Kd="gemini-qol-decorLocker-styles",NM='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let zt=null,ks=false;const Xd=[];function $a(e){Xd.push(e);}function OM(){for(const e of Xd)try{e();}catch(t){console.warn("[DecorLocker Inject] Cleanup error:",t);}Xd.length=0;}function $M(){if(ks)return;if(document.getElementById(Kd)){ks=true;return}const e=document.createElement("style");e.id=Kd,e.textContent=RM,document.head.appendChild(e),ks=true;}function DM(){document.getElementById(Kd)?.remove(),ks=false;}function FM(e){if(e.classList.add(Ey),!e.querySelector(`#${qd}`)){const t=document.createElement("div");t.id=qd,t.innerHTML=NM,e.appendChild(t);}}function al(e){e.classList.remove(Ey),e.querySelector(`#${qd}`)?.remove();}function Mc(){if(!zt)return;const e=Le().get();if(e.object.type!=="decor"||!e.object.data){al(zt);return}const t=e.object.data;wn.isDecorBlocked(t.decorId)?(FM(zt),console.log(`[DecorLocker Inject] LOCKED — overlay applied (${t.decorId})`)):(al(zt),console.log(`[DecorLocker Inject] unlocked — overlay removed (${t.decorId})`));}function BM(){$M();const e=Gl(`.${yg}`,r=>{zt=r,Mc();});$a(()=>e.disconnect());const t=Hl(`.${yg}`,r=>{zt===r&&(al(r),zt=null);});$a(()=>t.disconnect());const n=Le().subscribeObject(()=>{Mc();});$a(n);const o=()=>Mc();window.addEventListener(Me.DECOR_LOCKER_LOCKS_UPDATED,o),$a(()=>window.removeEventListener(Me.DECOR_LOCKER_LOCKS_UPDATED,o)),console.log("[DecorLocker Inject] Started");}function zM(){zt&&(al(zt),zt=null),OM(),DM(),console.log("[DecorLocker Inject] Stopped");}let Da=false;const Ty={init(){Da||(BM(),Da=true);},destroy(){Da&&(zM(),Da=false);},isEnabled(){return It().enabled}};le(K.PickupDecor,()=>{const e=It();if(!e.enabled)return  true;const t=Le().get();if(!t.object||t.object.type!=="decor"||!t.object.data)return  true;const n=t.object.data.decorId;return e.blockedDecors.includes(n)?(console.log(`[DecorLocker] Blocked pickup for ${n}`),false):(console.log(`[DecorLocker] Allowed pickup for ${n}`),true)});let rr=false;function Ay(){if(rr)return;if(!It().enabled){console.log("[DecorLocker] Disabled");return}rr=true,Ty.init(),console.log("[DecorLocker] Initialized");}function Iy(){rr&&(Ty.destroy(),rr=false,console.log("[DecorLocker] Destroyed"));}function GM(){return It().enabled}function HM(e){const t=It();t.enabled=e,ea(t),e&&!rr?Ay():!e&&rr&&Iy();}function Py(){const e=J.get("decor");return e?Object.keys(e):[]}function jM(){return It().blockedDecors}function UM(e){return It().blockedDecors.includes(e)}function WM(e){LM(e);}function VM(e){MM(e);}function qM(){const e=Py(),t=It();t.blockedDecors=e,ea(t),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function Ly(){const e=It();e.blockedDecors=[],ea(e),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function KM(){Ly();}const wn={init:Ay,destroy:Iy,isEnabled:GM,setEnabled:HM,getAvailableDecors:Py,getBlockedDecors:jM,isDecorBlocked:UM,blockDecor:WM,unblockDecor:VM,blockAllDecors:qM,unblockAllDecors:Ly,clearBlocks:KM};class My{constructor(){j(this,"stats");j(this,"STORAGE_KEY",_e.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return ye(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){we(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats();}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats();}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(const r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let jo=null;function XM(){return jo||(jo=new My),jo}function YM(){jo&&(jo.endSession(),jo=null);}function Ry(e){const t=El(e.xp),n=Gi(e.petSpecies,e.targetScale),o=Hi(e.petSpecies,e.xp,n),r=Tl(e.petSpecies,t),i=pb(e.petSpecies),a=vE(o,n,i),s=fb(o,n);return {current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:i,hoursToMax:a}}function Ny(e){return {...e,strength:Ry(e)}}function Oy(e){return e.map(Ny)}function JM(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Oy(e),n=t.reduce((l,c)=>l+c.strength.current,0),o=t.reduce((l,c)=>l+c.strength.max,0),r=t.filter(l=>l.strength.isMature).length,i=t.length-r,a=t.reduce((l,c)=>c.strength.max>(l?.strength.max||0)?c:l,t[0]),s=t.reduce((l,c)=>c.strength.max<(l?.strength.max||1/0)?c:l,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:i,strongestPet:a,weakestPet:s}}const QM=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Ry,enrichPetWithStrength:Ny,enrichPetsWithStrength:Oy,getPetStrengthStats:JM},Symbol.toStringTag,{value:"Module"}));class $y{constructor(){j(this,"logs",[]);j(this,"maxLogs",1e3);j(this,"unsubscribe",null);j(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=fe.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));const{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,o=this.logs.filter(i=>i.timestamp>=n),r=new Map;for(const i of o){r.has(i.abilityId)||r.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=r.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of r.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const o=Date.now()-n,r=this.logs.filter(a=>a.petId===t&&a.timestamp>=o),i=new Map;for(const a of r){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:r.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,i)=>i.count-r.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Yn=null;function ZM(){return Yn||(Yn=new $y,Yn.init()),Yn}function eR(){Yn&&(Yn.destroy(),Yn=null);}const tR={StatsTracker:My,getStatsTracker:XM,destroyStatsTracker:YM},nR={AbilityLogger:$y,getAbilityLogger:ZM,destroyAbilityLogger:eR,...QM},Ct=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],oR={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function yo(e){return e?oR[e]??0:0}class rR extends nn{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});j(this,"allPlants",[]);j(this,"allPets",[]);j(this,"sectionElement",null);}async build(n){await qT();const o=n.getRootNode();Pe(o,wb,"auto-favorite-settings-styles");const r=this.createGrid("12px");r.id="auto-favorite-settings",this.sectionElement=r,n.appendChild(r),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await J.waitForAny(3e3).catch(()=>{}),await Promise.all([J.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),J.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=J.get("plants")||{},o=J.get("pets")||{};this.allPlants=Object.keys(n).sort((r,i)=>{const a=n[r]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,l=yo(a)-yo(s);return l!==0?l:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(o).sort((r,i)=>{const a=o[r]?.rarity||null,s=o[i]?.rarity||null,l=yo(a)-yo(s);return l!==0?l:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(Y.isReady())return;const n=1e4,o=100;let r=0;return new Promise(i=>{const a=()=>{Y.isReady()||r>=n?i():(r+=o,setTimeout(a,o));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=m("div",{className:"kv"}),o=du({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),r=_n({checked:vt().get().enabled,onChange:async i=>{const a=vt(),s=a.get();await a.set({...s,enabled:i}),await this.saveConfig();}});return n.append(o.root,r.root),Ee({title:"Auto-Favorite",padding:"lg"},n,m("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=m("div",{className:"u-col"}),o=m("div",{className:"mut-row"});o.appendChild(this.createMutationButton(Ct[0])),o.appendChild(this.createMutationButton(Ct[1])),n.appendChild(o);const r=m("div",{className:"mut-row"});r.appendChild(this.createMutationButton(Ct[2])),r.appendChild(this.createMutationButton(Ct[3])),r.appendChild(this.createMutationButton(Ct[4])),n.appendChild(r);const i=m("div",{className:"mut-row"});i.appendChild(this.createMutationButton(Ct[5])),i.appendChild(this.createMutationButton(Ct[6])),n.appendChild(i);const a=m("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(Ct[7])),a.appendChild(this.createMutationButton(Ct[8])),n.appendChild(a),Ee({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${vt().get().favoriteMutations.length} / ${Ct.length} active`))}createMutationButton(n){let o=vt().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];o&&i.push("active");const a=m("div",{className:i.join(" ")}),s=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Y.isReady()){const d=Y.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});d.style.width="28px",d.style.height="28px",d.style.objectFit="contain",s.appendChild(d);}}catch{}const l=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),c=m("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},l);if(a.append(s,c),n.id==="Rainbow"||n.id==="Gold"){const d=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Y.isReady()){const u=Y.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",d.appendChild(u);}}catch{}a.append(d);}else {const d=m("div",{style:"width: 28px; flex-shrink: 0;"});a.append(d);}return a.addEventListener("click",async d=>{d.stopPropagation();const u=vt(),p=u.get();if(o){const g=p.favoriteMutations.filter(h=>h!==n.id);await u.set({...p,favoriteMutations:g}),o=false,a.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),o=true,a.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${vt().get().favoriteMutations.length} / ${Ct.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:vt().get().favoriteProduceList,onUpdate:async n=>{const o=vt(),r=o.get();await o.set({...r,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:vt().get().favoritePetsList,onUpdate:async n=>{const o=vt(),r=o.get();await o.set({...r,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:o,items:r,category:i,selected:a,onUpdate:s}=n;let l=new Set(a),c=r;const d=m("div",{style:"margin-bottom: 8px;"}),u=$i({placeholder:`Search ${o.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:v=>{const w=v.trim().toLowerCase();w?c=r.filter(k=>k.toLowerCase().includes(w)):c=r,S.setData(h());}});d.appendChild(u.root);const p=m("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Ae({label:"Select All",variant:"default",size:"sm",onClick:()=>{const v=h().map(w=>w.id);S.setSelection(v);}}),g=Ae({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{S.clearSelection();}});p.append(f,g);const h=()=>c.map(v=>({id:v,name:v,rarity:this.getItemRarity(v,i),selected:l.has(v)})),x=v=>{if(!v){const k=m("span",{style:"opacity:0.5;"});return k.textContent="—",k}return Xi({variant:"rarity",rarity:v,size:"sm"}).root},b=v=>{const w=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(Y.isReady()){let k=i,y=v;i==="plant"&&(["Bamboo","Cactus"].includes(v)&&(k="tallplant"),v==="DawnCelestial"&&(y="DawnCelestialCrop"),v==="MoonCelestial"&&(y="MoonCelestialCrop"),v==="OrangeTulip"&&(y="Tulip"));const T=Y.toCanvas(k,y,{scale:.5});T.style.width="28px",T.style.height="28px",T.style.objectFit="contain",w.appendChild(T);}}catch{}return w},S=cl({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(v,w)=>v.name.localeCompare(w.name,void 0,{numeric:true,sensitivity:"base"}),render:v=>{const w=m("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),k=b(v.id),y=m("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},v.name);return w.append(k,y),w}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(v,w)=>yo(v.rarity)-yo(w.rarity),render:v=>x(v.rarity)}],data:h(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(l),getRowId:v=>v.id,onSelectionChange:v=>{l.clear(),v.forEach(w=>l.add(w)),s(Array.from(l)),E();}}),_=m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),E=()=>{_.textContent=`${l.size} / ${r.length} selected`;};return E(),Ee({title:`${o} (${l.size}/${r.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},d,p,S.root,_)}getItemRarity(n,o){try{if(o==="pet")return (J.get("pets")||{})[n]?.rarity||null;if(o==="plant"){const r=J.get("plants")||{},i=r[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(r))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=vt().get();try{const{updateSimpleConfig:o}=Eb;await o({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(o){console.error("[AutoFavoriteSettings] Failed to update feature config:",o);}}}function iR(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function aR(e,t){const n=e;let o=e;const r=Oi({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==o&&(o=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==o&&(o=a,t?.(a));}});return r.root.className="team-list-item__name-input",r.input.addEventListener("blur",()=>{const i=r.getValue().trim()||n;i!==o&&(o=i,t?.(i));}),r.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),r.input.blur());}),r.root}function Dy(e){const t=m("div",{className:"team-list-item"}),n=e.customIndicator??m("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),o=e.isNameEditable?aR(e.team.name,e.onNameChange):m("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),r=m("div",{className:"team-list-item__sprites"});function i(){const l=fe.myPets.get();r.innerHTML="";for(let c=0;c<3;c++){const d=e.team.petIds[c],u=d&&d!=="",p=m("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(c);})),u){let f=l.all.find(g=>g.id===d);if(!f){const g=window.__petDataCache;g&&g.has(d)&&(f=g.get(d));}if(f)try{const g=Y.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),h=document.createElement("canvas");h.width=g.width,h.height=g.height;const x=h.getContext("2d");if(x&&x.drawImage(g,0,0),h.style.width="100%",h.style.height="100%",h.style.objectFit="contain",p.appendChild(h),e.showSlotStyles){const b=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(b),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const h=m("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(h);}else {const g=m("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${d} not found in myPets yet, waiting for update`);let h=false;const x=fe.myPets.subscribe(()=>{if(h)return;const C=fe.myPets.get().all.find(S=>S.id===d);if(C){h=true,x();try{p.innerHTML="";const S=Y.toCanvas("pet",C.petSpecies,{mutations:C.mutations,scale:1}),_=document.createElement("canvas");_.width=S.width,_.height=S.height;const E=_.getContext("2d");if(E&&E.drawImage(S,0,0),_.style.width="100%",_.style.height="100%",_.style.objectFit="contain",p.appendChild(_),e.showSlotStyles){const v=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(v),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${d} sprite updated`);}catch(S){console.warn(`[TeamListItem] Failed to render sprite for pet ${C.petSpecies}:`,S),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=iR();p.appendChild(f);}r.appendChild(p);}}i();const a=fe.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const l=m("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(l);}if(t.appendChild(n),t.appendChild(o),t.appendChild(r),e.onExpandClick){const l=m("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});l.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',l.addEventListener("click",c=>{c.stopPropagation(),e.onExpandClick?.();}),t.appendChild(l);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),a());});return s.observe(document.body,{childList:true,subtree:true}),t}function sR(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function go(e){const{segments:t,selected:n=t[0]?.id??"",size:o="md",fullWidth:r=false,disabled:i=false,onChange:a}=e,s=m("div",{className:"sg-root"});o!=="md"&&s.classList.add(`sg--${o}`),r&&(s.style.width="100%");const l=m("div",{className:"sg-container",role:"tablist"}),c=m("div",{className:"sg-indicator"}),d=t.map(w=>{const k=m("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:w.label});if(k.id=w.id,w.icon){const T=m("span",{className:"sg-icon"}),I=sR(w.icon);I&&T.appendChild(I),k.appendChild(T);}const y=m("span",{className:"sg-label"},w.label);return k.appendChild(y),k.disabled=!!w.disabled,k});l.appendChild(c),d.forEach(w=>l.appendChild(w)),s.appendChild(l);let u=n,p=i,f=null;function g(){const w=d.find(k=>k.id===u);w&&requestAnimationFrame(()=>{const k=c,y=w.offsetLeft,T=w.offsetWidth;k.style.width=`${T}px`,k.style.transform=`translateX(${y}px)`;});}function h(){d.forEach(w=>{const k=w.id===u;w.classList.toggle("active",k),w.setAttribute("aria-selected",String(k)),w.disabled=p||!!t.find(y=>y.id===w.id)?.disabled;}),g();}function x(w){const k=w.currentTarget;if(k.disabled)return;C(k.id);}function b(w){if(p)return;const k=d.findIndex(T=>T.id===u);let y=k;if(w.key==="ArrowLeft"||w.key==="ArrowUp"?(w.preventDefault(),y=(k-1+d.length)%d.length):w.key==="ArrowRight"||w.key==="ArrowDown"?(w.preventDefault(),y=(k+1)%d.length):w.key==="Home"?(w.preventDefault(),y=0):w.key==="End"&&(w.preventDefault(),y=d.length-1),y!==k){const T=d[y];T&&!T.disabled&&(C(T.id),T.focus());}}d.forEach(w=>{w.addEventListener("click",x),w.addEventListener("keydown",b);});function C(w){!t.some(y=>y.id===w)||u===w||(u=w,h(),a?.(u));}function S(){return u}function _(w){p=!!w,h();}function E(){d.forEach(w=>{w.removeEventListener("click",x),w.removeEventListener("keydown",b);}),f?.disconnect(),f=null;}h(),f=new ResizeObserver(()=>{const w=d.find(k=>k.id===u);if(w&&w.offsetWidth>0){const k=c;k.style.transition="none",k.style.width=`${w.offsetWidth}px`,k.style.transform=`translateX(${w.offsetLeft}px)`,requestAnimationFrame(()=>{k.style.removeProperty("transition");}),f?.disconnect(),f=null;}}),f.observe(l);const v=s;return v.select=C,v.getSelected=S,v.setDisabled=_,v.destroy=E,v}function Ul(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,l=m("div",{className:"lg-checkbox-wrap"}),c=m("input",{className:`lg-checkbox lg-checkbox--${r}`,id:t,type:"checkbox",checked:!!n,disabled:!!o});let d=null;i&&a!=="none"&&(d=m("label",{className:"lg-checkbox-label"},i),d.addEventListener("click",h)),d&&a==="left"?l.append(d,c):d&&a==="right"?l.append(c,d):l.append(c);let u=!!n,p=!!o;function f(){c.checked=u,c.disabled=p;}function g(w=false){p||(u=!u,f(),w||s?.(u));}function h(){p||g();}function x(w){p||(w.key===" "||w.key==="Enter")&&(w.preventDefault(),g());}c.addEventListener("click",h),c.addEventListener("keydown",x);function b(){return u}function C(w,k=false){u=!!w,f(),k||s?.(u);}function S(w){p=!!w,f();}function _(w){if(!w){d&&(d.remove(),d=null);return}d?d.textContent=w:(d=m("label",{className:"lg-checkbox-label"},w),d.addEventListener("click",h),l.append(d));}function E(){c.focus();}function v(){c.removeEventListener("click",h),c.removeEventListener("keydown",x),d&&d.removeEventListener("click",h);}return f(),{root:l,input:c,isChecked:b,setChecked:C,setDisabled:S,setLabel:_,focus:E,destroy:v}}let Er=0,vg="",wg="";function lR(){return Er===0&&(vg=document.body.style.overflow,wg=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),Er++,()=>{Er=Math.max(0,Er-1),Er===0&&(document.body.style.overflow=vg,document.body.style.touchAction=wg);}}class cR{constructor(t){j(this,"dragState",null);j(this,"longPressState",null);j(this,"options");j(this,"onPointerMove");j(this,"onPointerUp");j(this,"onPointerCancel");j(this,"onLongPressPointerMove");j(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,o){if(this.cleanupLongPress(),pe.getAllTeams().findIndex(c=>c.id===o)===-1)return;const a=t.clientX,s=t.clientY,l=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,o);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:s,timeout:l,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,o){const r=this.options.getListContainer();if(this.dragState||!r)return;t.preventDefault();const a=pe.getAllTeams().findIndex(p=>p.id===o);if(a===-1)return;const s=n.getBoundingClientRect(),l=r.getBoundingClientRect(),c=n.cloneNode(true);c.classList.add("team-list-item--placeholder"),c.classList.remove("team-list-item--dragging");const d=n.style.touchAction;n.style.touchAction="none";const u=lR();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:c,offsetY:t.clientY-s.top,fromIndex:a,teamId:o,captureTarget:n,touchActionPrev:d,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-l.left}px`,n.style.top=`${s.top-l.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",r.style.position||(r.style.position="relative"),r.insertBefore(c,n.nextSibling),r.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),o=Math.abs(t.clientY-this.longPressState.startY),r=10;(n>r||o>r)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const o=n.getBoundingClientRect();let r=t.clientY-o.top-this.dragState.offsetY;const i=o.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(r=Math.max(-8,Math.min(i+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:o,itemEl:r}=this.dragState,i=Array.from(n.children).filter(l=>l!==r&&l!==o&&l instanceof HTMLElement&&l.classList.contains("team-list-item")),a=new Map;i.forEach(l=>{a.set(l,l.getBoundingClientRect().top);});let s=false;for(const l of i){const c=l.getBoundingClientRect(),d=c.top+c.height/2;if(t<d){o.nextSibling!==l&&n.insertBefore(o,l),s=true;break}}s||n.appendChild(o),i.forEach(l=>{const c=a.get(l),d=l.getBoundingClientRect().top;if(c!==void 0&&c!==d){const u=c-d;l.style.transform=`translateY(${u}px)`,l.style.transition="none",l.offsetHeight,l.style.transition="transform 0.14s ease",l.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:o=false}=t,{itemEl:r,placeholder:i,fromIndex:a,touchActionPrev:s,releaseScrollLock:l,pointerId:c}=this.dragState;if(n.classList.remove("is-reordering"),r.hasPointerCapture(c))try{r.releasePointerCapture(c);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),o){const p=Array.from(n.children).filter(f=>f!==r&&f!==i&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[a]||null;p?n.insertBefore(i,p):n.appendChild(i);}else {const u=Array.from(n.children).filter(f=>f!==r),p=u.indexOf(i);if(p!==-1){const f=u[p];f!==i&&n.insertBefore(i,f);}}if(i.replaceWith(r),i.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),l?.(),!o){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==a){const g=pe.getAllTeams().slice(),[h]=g.splice(a,1);g.splice(p,0,h);const x=g.map(b=>b.id);pe.reorderTeams(x),this.options.onReorder(x);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class dR{constructor(t={}){j(this,"card",null);j(this,"modeControl",null);j(this,"modeContainer",null);j(this,"teamContent",null);j(this,"listContainer",null);j(this,"teamMode","overview");j(this,"selectedTeamIds",new Set);j(this,"teamCheckboxes",new Map);j(this,"options");j(this,"dragHandler");this.options=t,this.dragHandler=new cR({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!pe.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=m("div",{className:"team-card-wrapper"});this.modeContainer=m("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=m("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Ee({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=go({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=m("div",{className:"team-card__disabled-state"}),n=m("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),o=Ae({label:"Enable Feature",onClick:()=>{pe.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(o),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(o=>o.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=pe.getAllTeams(),n=pe.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=m("div",{className:"team-card__list-container"}),t.forEach(o=>{const r=n===o.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(o.id));const a=Dy({team:o,isActive:r,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(o.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(o.id,s);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await pe.activateTeam(o),this.options.onTeamsUpdated?.();}catch(c){console.error("[TeamCard] Failed to activate team:",c);}}}),a.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,a,o.id):this.dragHandler.startLongPress(s,a,o.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=m("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=m("div",{className:"team-card__actions"}),o=Ae({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(o),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=m("div",{className:"team-card__actions"}),n=Ae({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),o=Ae({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),r=Ae({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});r.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(o),t.appendChild(r),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,o=1;const r=pe.getAllTeams(),i=new Set(r.map(a=>a.name));for(;i.has(n);)n=`${t} (${o})`,o++;try{pe.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)pe.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=pe.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){pe.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const o=pe.getTeam(t);if(!o)return;const r=o.petIds[n];!r||r===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const o=pe.getTeam(t);if(!o)return;const r=[...o.petIds];r[n]="",pe.updateTeam(t,{petIds:r}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const o=pe.getTeam(t);if(!o)return;const i=fe.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),a=new Set(o.petIds.filter(f=>f!=="")),s=i.filter(f=>!a.has(f.id));await xe.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const l=Je.detect();(l.platform==="mobile"||l.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const d=fe.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,h=[...o.petIds];h[n]=g.id,pe.updateTeam(t,{petIds:h}),this.options.onTeamsUpdated?.(),xe.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),Mo.close().then(()=>{const x=Je.detect();(x.platform==="mobile"||x.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await Mo.show("inventory",{items:s,favoritedItemIds:[]}),await Mo.waitForClose();const u=Je.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),d();}createCheckboxIndicator(t){const n=Ul({checked:this.selectedTeamIds.has(t),size:"md",onChange:o=>{o?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class uR{constructor(t,n={}){j(this,"root");j(this,"pet");j(this,"options");j(this,"contentSlot",null);j(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const o=document.createElement("div");o.className="base-pet-card__info";const r=document.createElement("div");if(r.className="base-pet-card__name",r.textContent=this.pet.name||this.pet.petSpecies,o.appendChild(r),!this.options.hideStr){const i=document.createElement("div");i.className="base-pet-card__str",this.renderStr(i),o.appendChild(i);}return t.appendChild(o),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const o=this.root.querySelector(".base-pet-card__str");o&&this.renderStr(o);const r=this.root.querySelector(".base-pet-card__sprite-wrapper");r instanceof HTMLElement&&this.renderSprite(r);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const o=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const r=Xi({label:o,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(r.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(Y.has("pet",this.pet.petSpecies)){const o=Y.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});o.style.width="64px",o.style.height="64px",o.style.objectFit="contain",t.appendChild(o);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}const $e={XP:{BOOST_PAIR:.85,LEVELING_PAIR:.75,PASSIVE_LEVELING:.5,STR_DISTANCE_THRESHOLD:.15},ECONOMY:{DEDICATED_COIN:.9,META_SELLING:.85,PASSIVE_EFFICIENCY:.65,ENDGAME_HARVEST:.95,SYNERGY_BONUS:.1,EARLY_REGROW:.7},HATCHING:{TIER_3_MAX_STR:.95,RAINBOW_HUNTING:.7,COMBO_BONUS:.05},TIER_BONUS:.05,CONFIDENCE_THRESHOLD:.6},ne={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]},Wl={ALLOWED_PANELS:{"xp-farming":["xp"],"coin-farming":["coin","xp","hatch"],"crop-farming":["growth","coin","xp","hatch"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],hatching:["hatch","xp"],efficiency:["xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}};function et(e,t){return e.abilities.some(n=>t.includes(n))}function We(e,t){return e.filter(n=>et(n,t)).length}function pR(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function Tr(e,t){const n=e.flatMap(o=>o.abilities.filter(r=>t.includes(r))).map(pR);return n.length===0?0:n.reduce((o,r)=>o+r,0)/n.length}function Fa(e){const t=nx(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],o={},r=We(t,ne.XP_BOOST),i=$e.XP.STR_DISTANCE_THRESHOLD,s=t.filter(L=>L.maxStrength===0?false:(L.maxStrength-L.currentStrength)/L.maxStrength>i).length,l=t.filter(L=>L.currentStrength<L.maxStrength).length;if(r>=1&&s>=2)o["xp-farming"]=$e.XP.BOOST_PAIR,n.push(`1 XP Boost + ${s} high-need pets (>${i*100}% STR distance)`);else if(r>=2){const L=Tr(t,ne.XP_BOOST);o["xp-farming"]=$e.XP.LEVELING_PAIR+L*$e.TIER_BONUS,n.push(`${r} XP Boost pets (avg tier ${L.toFixed(1)})`);}else l>=2&&s>=1?(o["xp-farming"]=$e.XP.LEVELING_PAIR,n.push(`${l} leveling pets with ${s} high-need`)):l>=2&&(o["xp-farming"]=$e.XP.PASSIVE_LEVELING,n.push(`${l} pets below max STR`));const c=We(t,ne.COIN_FINDER),d=We(t,ne.SELL_BOOST),u=We(t,ne.CROP_REFUND_HARVEST),p=We(t,ne.RARE_GRANTERS),f=We(t,ne.COMMON_GRANTERS),g=t.some(L=>et(L,ne.COIN_FINDER)&&(et(L,ne.RARE_GRANTERS)||et(L,ne.COMMON_GRANTERS)));c>=1&&!g?(o["coin-farming"]=$e.ECONOMY.DEDICATED_COIN,n.push("Dedicated Coin Finder team (no granters)")):d>=1&&u>=1?(o["coin-farming"]=$e.ECONOMY.META_SELLING,n.push("Meta Selling Team (Sell Boost + Crop Refund/Harvest)")):c>=1&&g?(o["coin-farming"]=$e.ECONOMY.PASSIVE_EFFICIENCY,o.efficiency=Math.max(o.efficiency||0,$e.ECONOMY.PASSIVE_EFFICIENCY),n.push("Coin Finder + Granter (passive efficiency)")):(d>=1||u>=1)&&(o["coin-farming"]=Math.max(o["coin-farming"]||0,.7),n.push("Sell/Refund abilities (coin efficiency)"));const h=We(t,ne.PLANT_GROWTH),x=We(t,ne.CROP_MUTATION),b=We(t,ne.CROP_SIZE),C=t.filter(L=>L.abilities.includes("DoubleHarvest")).length,S=t.filter(L=>L.abilities.includes("ProduceRefund")).length,_=t.some(L=>L.abilities.includes("DoubleHarvest")&&L.abilities.includes("ProduceRefund"));if(C>=3){let L=$e.ECONOMY.ENDGAME_HARVEST;_&&(L+=$e.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,L),n.push("Endgame Harvest Team (3x Double Harvest)"+(_?" + capybara synergy":""));}else if(C>=1&&S>=1){let L=.85;_&&(L+=$e.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,L),n.push("Double Harvest + Crop Refund"+(_?" (same pet - capybara)":""));}else x>=1&&C===0&&(o["crop-farming"]=Math.max(o["crop-farming"]||0,$e.ECONOMY.EARLY_REGROW),n.push("Early Game Regrow Team (Crop Mutation)"));if(p>=1){const L=t.some(A=>A.abilities.includes("RainbowGranter")),$=t.some(A=>A.abilities.includes("GoldGranter"));L?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):$?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(o["crop-farming"]=Math.max(o["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const E=h+x+b+f;if(E>=2&&!o["crop-farming"]){const L=(Tr(t,ne.PLANT_GROWTH)+Tr(t,ne.CROP_MUTATION)+Tr(t,ne.CROP_SIZE))/3;o["crop-farming"]=Math.max(o["crop-farming"]||0,.7+L*.03),n.push(`${E} crop-related abilities`);}const v=We(t,ne.EGG_GROWTH);if(v>=1&&(o["time-reduction"]=.7,n.push(`${v} Egg Growth Boost pet(s)`)),h>=1&&!o["crop-farming"]&&(o["time-reduction"]=Math.max(o["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),p>=1||x>=1){const L=t.some(A=>A.abilities.includes("RainbowGranter")),$=t.some(A=>A.abilities.includes("GoldGranter"));L||$?(o["mutation-hunting"]=.95,n.push(`${L?"Rainbow":"Gold"} Granter (mutation focus)`)):x>=1&&(o["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const w=We(t,ne.HUNGER_BOOST),k=We(t,ne.HUNGER_RESTORE);w>=1&&k>=1?(o.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(w>=1||k>=1)&&(o.efficiency=.6,n.push("Hunger management (reduced feeding)"));const y=c+p+f;y>=2&&(o.efficiency=Math.max(o.efficiency||0,.6),n.push(`${y} passive abilities (passive gains)`));const T=We(t,ne.MAX_STR_BOOST),I=We(t,ne.HATCH_XP),P=We(t,ne.PET_MUTATION),R=We(t,ne.DOUBLE_HATCH),O=We(t,ne.PET_REFUND);if(T>=1){const L=Tr(t,ne.MAX_STR_BOOST),$=L>=3?$e.HATCHING.TIER_3_MAX_STR:.85;o.hatching=$+L*$e.TIER_BONUS,n.push(`Max Strength Boost (tier ${L.toFixed(1)}) - late-game meta`);}if(P>=1||R>=1||O>=1){const L=P+R+O,$=$e.HATCHING.RAINBOW_HUNTING+L*$e.HATCHING.COMBO_BONUS;o.hatching=Math.max(o.hatching||0,$),n.push(`${L} rainbow hunting abilities`);}I>=1&&!o.hatching&&(o.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const W=t.filter(L=>et(L,ne.MAX_STR_BOOST)||et(L,ne.PET_MUTATION)||et(L,ne.DOUBLE_HATCH)||et(L,ne.PET_REFUND)).length;W>=Math.ceil(t.length*.67)&&o.hatching&&(o.hatching=Math.max(o.hatching,.97),o["crop-farming"]&&o["crop-farming"]<.97&&t.filter($=>(et($,ne.CROP_REFUND_HARVEST)||et($,ne.CROP_SIZE)||et($,ne.CROP_MUTATION))&&!et($,ne.PET_REFUND)&&!et($,ne.DOUBLE_HATCH)&&!et($,ne.PET_MUTATION)&&!et($,ne.MAX_STR_BOOST)).length===0&&(delete o["crop-farming"],n.push("Suppressed crop-farming (hatching majority override)")),n.push(`Hatching Majority (${W}/${t.length} pets) - clear team purpose`));const N=Object.entries(o).sort(([,L],[,$])=>$-L);if(N.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp","growth","coin","hatch"],reasons:["Mixed or unclear purpose"]};const[F,G]=N[0],B=N.slice(1).map(([L,$])=>({purpose:L,confidence:$}));return G<$e.CONFIDENCE_THRESHOLD?{primary:"balanced",confidence:G,secondary:N.map(([L,$])=>({purpose:L,confidence:$})),suggestedFeatures:["xp","growth","coin","hatch"],reasons:[...n,`Low confidence (${(G*100).toFixed(0)}%) - showing all panels`]}:{primary:F,confidence:G,secondary:B,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","growth","xp"],"crop-farming":["growth","coin","xp"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],efficiency:["xp"],hatching:["hatch","growth","xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}[F]||["xp","growth","coin","hatch"],reasons:n}}async function fR(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,o=t.createOscillator(),r=t.createGain();o.connect(r),r.connect(t.destination),o.type="sine",o.frequency.setValueAtTime(800,n),o.frequency.exponentialRampToValueAtTime(400,n+.03),r.gain.setValueAtTime(.12,n),r.gain.exponentialRampToValueAtTime(.001,n+.05),o.start(n),o.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function gR(e={}){const{id:t,variant:n="default",size:o="md",round:r=false,sprite:i=null,onClick:a,disabled:s=false,playSound:l=true,tooltip:c}=e,d=m("button",{className:"gemini-icon-btn",id:t});d.type="button",n!=="default"&&d.classList.add(`gemini-icon-btn--${n}`),o!=="md"&&d.classList.add(`gemini-icon-btn--${o}`),r&&d.classList.add("gemini-icon-btn--round"),c&&(d.title=c),d.disabled=s;const u=m("span",{className:"gemini-icon-btn__content"});d.appendChild(u),i&&u.appendChild(i);const p=m("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",d.appendChild(p),d.addEventListener("click",async g=>{d.disabled||(l&&fR(),a?.(g));});const f=d;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{d.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&d.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{d.disabled=g;},f}const Fy=`
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
`;class mR{constructor(){j(this,"card",null);j(this,"listContainer",null);j(this,"innerContent",null);j(this,"logs",[]);j(this,"filteredLogs",[]);j(this,"unsubscribe",null);j(this,"ITEM_HEIGHT",88);j(this,"BUFFER_SIZE",3);j(this,"VIEWPORT_HEIGHT",480);j(this,"renderedRange",{start:0,end:0});j(this,"scrollListener",null);j(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=po(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const o=t.get().abilityLogs;this.updateFromAbilityLogs(o);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=J.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=ph(a),l=new Date(n.performedAt),c=l.toLocaleDateString("en-US",{month:"short",day:"numeric"}),d=l.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),u=`${c} ${d}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:s,formattedDate:u}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return Xi({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=m("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=m("div",{style:"margin-bottom: 0;"}),o=$i({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:r=>{const i=r.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(o.root),t.appendChild(n),this.listContainer=m("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=m("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=Ee({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,o)=>o.timestamp-n.timestamp);if(t.length===0){const n=m("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let o=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),r=Math.min(this.filteredLogs.length,o+n+this.BUFFER_SIZE*2);if(o===this.renderedRange.start&&r===this.renderedRange.end)return;this.renderedRange={start:o,end:r},this.innerContent.replaceChildren();const i=o*this.ITEM_HEIGHT;if(i>0){const s=m("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=o;s<r;s++){const l=this.filteredLogs[s],c=this.createLogItemCard(l);this.innerContent.appendChild(c);}const a=Math.max(0,(this.filteredLogs.length-r)*this.ITEM_HEIGHT);if(a>0){const s=m("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}createLogItemCard(t){const n=m("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const o=m("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const d=Y.toCanvas("pet",t.petSpecies);d&&(d.style.width="100%",d.style.height="100%",d.style.objectFit="contain",o.appendChild(d));}catch{o.textContent="🐾",o.style.fontSize="24px";}n.appendChild(o);const r=m("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=m("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=m("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=m("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);i.appendChild(a),i.appendChild(s),r.appendChild(i);const l=this.createAbilityBadge(t.abilityId,t.abilityName);r.appendChild(l);const c=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return r.appendChild(c),n.appendChild(r),n}}const By=`
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

`,zy=`
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
`,Dp=`
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
`,Gy=`
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
`,hR=`
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
`;class bR extends nn{constructor(n){super({id:"tab-pets",label:"Pets"});j(this,"unsubscribeMyPets");j(this,"lastActiveTeamId",null);j(this,"teamCardPart",null);j(this,"abilityLogsCardPart",null);j(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await bt(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>rp);return {MGSprite:a}},void 0);await o.init();const r=n.getRootNode();Pe(r,By,"team-card-styles"),Pe(r,zy,"base-pet-card-styles"),Pe(r,Dp,"badge-styles"),Pe(r,Gy,"arcade-button-styles"),Pe(r,Fy,"gemini-icon-button-styles"),Pe(r,hR,"ability-logs-card-styles");const i=this.createGrid("12px");i.id="pets",n.appendChild(i),this.initializeTeamCardPart(i),this.initializeAbilityLogsCardPart(i),this.unsubscribeMyPets=fe.myPets.subscribeStable(()=>{const a=pe.getActiveTeamId();a!==this.lastActiveTeamId&&(this.lastActiveTeamId=a,this.teamCardPart?.render());}),this.lastActiveTeamId=pe.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new dR({onTeamReordered:r=>{console.log("[PetsSection] Teams reordered:",r);},setHUDOpen:this.deps?.setHUDOpen}));const o=this.teamCardPart.build();n.appendChild(o),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new mR);const o=this.abilityLogsCardPart.build();n.appendChild(o),this.abilityLogsCardPart.render();}}class xR{constructor(t){j(this,"root");j(this,"options");j(this,"headerElement",null);j(this,"petsContainer",null);j(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${t.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `);}updatePets(t){if(this.petsContainer){this.petsContainer.innerHTML="";for(const n of t){const o=this.buildPetCard(n);this.petsContainer.appendChild(o);}}}buildPetCard(t){const n=document.createElement("div");n.className="xp-pet-card",t.isStarving&&n.classList.add("xp-pet-card--starving"),t.isMaxStrength&&n.classList.add("xp-pet-card--max");const o=document.createElement("div");o.className="xp-pet-card__sprite";const r=document.createElement("div");r.className="xp-pet-card__sprite-wrapper";try{const d=t.mutations;if(Y.has("pet",t.species)){const u=Y.toCanvas("pet",t.species,{mutations:d,scale:1,boundsMode:"padded"});u.style.width="64px",u.style.height="64px",u.style.objectFit="contain",u.style.display="block",r.appendChild(u);}else r.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}catch(d){console.warn(`[TeamXpPanel] Failed to render sprite for ${t.species}:`,d),r.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}o.appendChild(r);const i=document.createElement("div");if(i.className="xp-pet-card__badges",t.isMaxStrength&&(i.innerHTML+='<span class="xp-badge xp-badge--max">MAX</span>'),t.isStarving&&(i.innerHTML+='<span class="xp-badge xp-badge--starving">STARVING</span>'),t.xpBoostStats){const d=t.xpBoostStats.tier==="Snowy"?"❄":"⚡";i.innerHTML+=`<span class="xp-badge xp-badge--boost">${d}${t.xpBoostStats.tier}</span>`;}o.appendChild(i);const a=document.createElement("div");a.className="xp-pet-card__str-display",a.innerHTML=`
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
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),o=Math.floor(t%24);return `${n}d ${o}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const yR={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=og(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new xR({teamId:e.id});t.appendChild(n.build());const o=yr(e.id);return o&&n.update(o),{update:(r,i)=>{const a=yr(r.id);a&&n.update(a);},destroy:()=>n.destroy(),refresh:()=>{const r=yr(e.id);r&&n.update(r);}}},renderPetSlot:(e,t,n)=>{const o=fe.weather.get(),r=o.isActive?o.type:null,i=yr(t.id),a=i?.teamSummary.bonusXpPerHour||0,s=i?.pets||[],l=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),c=Id(e,r,a,l),d=c.isMaxStrength,u=!!c.xpBoostStats;let p="";if(d)u&&c.xpBoostStats&&(p=`
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
                `);const g=c.maxStrength,h=c.currentStrength,x=Math.min(100,Math.max(0,Math.floor(h/g*100))),b=e.xp%3600/3600*100,C=Math.min(99,Math.max(1,Math.floor(b))),S=c.currentStrength+1,_=c.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${rg(c.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${c.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${S}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${C}%"></div>
                        <span class="stat__percent">${C}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${rg(c.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${c.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${_}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${x}%"></div>
                        <span class="stat__percent">${x}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},renderGroupedSlot:(e,t,n)=>{const o=fe.weather.get(),r=o.isActive?o.type:null,a=yr(t.id)?.teamSummary.bonusXpPerHour||0;let s=0,l=0;for(const d of e){const u=Id(d,r,a,0);u.xpBoostStats&&(s+=u.xpBoostStats.expectedXpPerHour),u.supportingFeeds&&(l+=u.supportingFeeds);}let c="";if(s>0&&(c=`
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
                `;else {const u=og(t.id);n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(u)}%</span>
                        </div>
                    </div>
                `;}return}n.innerHTML=`<div class="xp-stats-compact xp-stats-grouped">${c}</div>`;},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.some(i=>i.currentStrength<i.maxStrength)?true:n.some(i=>i.abilities.some(a=>ne.XP_BOOST.includes(a)))},shouldDisplay:(e,t,n)=>(Wl.ALLOWED_PANELS[n.primary]||[]).includes("xp")?!!(t.some(a=>a.currentStrength<a.maxStrength)||t.some(a=>a.abilities.some(s=>ne.XP_BOOST.includes(s)))):false,countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.every(r=>r.currentStrength>=r.maxStrength)?n.some(i=>i.abilities.some(a=>ne.XP_BOOST.includes(a)))?1:0:2}};function De(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function ln(e){if(e<=0)return "0m";const t=Math.floor(e/1e3),n=Math.floor(t/86400),o=Math.floor(t%86400/3600),r=Math.floor(t%3600/60),i=[];return n>0&&i.push(`${n}d`),o>0&&i.push(`${o}h`),(r>0||i.length===0)&&i.push(`${r}m`),i.join(" ")}function cn(e,t){const n=e==="egg"?"pet":"plant",o=De("span","sprite-wrapper");if(!t)return o;let r=t;e==="plant"&&(r==="DawnCelestial"&&(r="DawnCelestialCrop"),r==="MoonCelestial"&&(r="MoonCelestialCrop"));try{if(Y.isReady()&&Y.has(n,r)){const i=Y.toCanvas(n,r,{scale:.3});i.style.height="16px",i.style.width="auto",i.style.imageRendering="pixelated",o.appendChild(i);}}catch{}return o}function Ba(e,t){const n=De("span","stacked-sprites");if(t.length===0)return n;const o=e==="egg"?"pet":"plant",r=4,a=[...new Set(t.map(l=>e==="egg"?l.eggId:l.species).filter(Boolean))].slice(0,r);if(a.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let l=0;l<a.length;l++){let c=a[l];e==="plant"&&c&&(c==="DawnCelestial"&&(c="DawnCelestialCrop"),c==="MoonCelestial"&&(c="MoonCelestialCrop"));try{if(Y.isReady()&&c&&Y.has(o,c)){const d=Y.toCanvas(o,c,{scale:.2});d.style.height="14px",d.style.width="auto",d.style.imageRendering="pixelated",d.style.position="relative",d.style.zIndex=String(r-l),n.appendChild(d),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function dn(e,t,n,o,r,i){const a=De("div","stat-row"),s=De("span","stat__label",e),l=De("span","stat__timer",t),c=De("span","stat__str-label");c.appendChild(n);const d=De("div","stat__progress-mini"),u=De("div",`stat__progress-fill ${r}`);u.style.width=`${o}%`,d.appendChild(u);const p=`${o}%`,f=De("span","stat__percent",p);return d.appendChild(f),a.appendChild(s),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&a.appendChild(c),a.appendChild(l),a.appendChild(d),a}function Cg(e){const t=De("div","stat-row stat-row--boost"),n=De("span","stat__label","BOOST");t.appendChild(n);const o=De("span","stat__values-row");return e.forEach((r,i)=>{const a=De("span","stat__boost-item");a.appendChild(r.sprite),a.appendChild(De("span","stat__value stat__value--accent",r.text)),o.appendChild(a),i<e.length-1&&o.appendChild(De("span","stat__separator"," "));}),t.appendChild(o),t}function Sg(e,t){const n=t==="egg"?Ci:Si;let o=0,r=false;const i=[];for(const a of e.abilities)if(a in n){const s=n[a],l=s.procRate*60;o+=l*s.minutesPerProc,r=true,i.push(a);}return {hasBoost:r,minutesPerProc:0,hourlyReduction:o,abilityName:i.join(", ")}}function kg(e,t){const n=pe.getPetsForTeam(e),o=t==="egg"?Cp(n):Sp(n);return `${((60+ki(o).timeReductionPerHour)/60).toFixed(2)}x`}function za(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const i=t-r.plantedAt,s=(r.maturedAt-t)/n,l=i+s,c=l>0?i/l*100:0;return o+Math.min(100,Math.max(0,c))},0)/e.length)}function Ga(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const i=t-r.startTime,s=(r.endTime-t)/n,l=i+s,c=l>0?i/l*100:0;return o+Math.min(100,Math.max(0,c))},0)/e.length)}function _g(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,i)=>r.maturedAt-i.maturedAt)[0];return {remainingMs:Math.max(0,o.maturedAt-t),name:o.eggId||null}}function Eg(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,i)=>r.endTime-i.endTime)[0];return {remainingMs:Math.max(0,o.endTime-t),name:o.species||null}}function Tg(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.maturedAt));return Math.max(0,n-t)}function Ag(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.endTime));return Math.max(0,n-t)}function un(e,t){return e<=0||t<=0?0:Math.round(e/t)}const vR={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=fe.myGarden.get(),o=n.eggs.growing.length+n.plants.growing.length;return o===0?null:{text:`${o} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{const i=fe.myGarden.get(),a=Date.now(),s=Sg(e,"egg"),l=Sg(e,"plant");if(n.innerHTML="",!s.hasBoost&&!l.hasBoost)return;const c=r?i.eggs.growing.filter(v=>r.has(v.tileIndex)):i.eggs.growing,d=r?i.crops.growing.filter(v=>r.has(v.tileIndex)):i.crops.growing;let u=o;!u&&s.hasBoost!==l.hasBoost&&(u=s.hasBoost?"egg":"plant");const p=u==="egg"&&s.hasBoost||u==="plant"&&l.hasBoost,f=!u,g=De("div","growth-stats-compact");if(!p&&!f){const v=o==="egg"?"Egg":"Plant",w=De("div","stat-row stat-row--message");w.appendChild(De("span","stat__message",`No ${v} Growth Boost, Click the Button to Switch View`)),g.appendChild(w),n.appendChild(g);return}const h=[],x=s.hasBoost&&(u==="egg"||f),b=l.hasBoost&&(u==="plant"||f);if(x){const v=Math.round(s.hourlyReduction/60*100);h.push({text:`+${v}% Speed`,sprite:cn("egg","UncommonEgg")});}if(b){const v=Math.round(l.hourlyReduction/60*100);h.push({text:`+${v}% Speed`,sprite:cn("plant","Carrot")});}h.length>0&&g.appendChild(Cg(h));const C=kg(t,"egg"),S=parseFloat(C.replace("x","")),_=kg(t,"plant"),E=parseFloat(_.replace("x",""));if(s.hasBoost&&(u==="egg"||f)){const v=_g(c,a),w=un(v.remainingMs,S),k=c.length>0?za(c,a,S):100,y=w>0?ln(w):"Ready!";g.appendChild(dn("NEXT EGG",y,cn("egg",v.name),k,"stat__progress-fill--egg"));}if(l.hasBoost&&(u==="plant"||f)){const v=Eg(d,a),w=un(v.remainingMs,E),k=d.length>0?Ga(d,a,E):100,y=w>0?ln(w):"Ready!";g.appendChild(dn("NEXT PLANT",y,cn("plant",v.name),k,"stat__progress-fill--plant"));}if(s.hasBoost&&(u==="egg"||f)){const v=c.length>0?za(c,a,S):100,w=Tg(c,a),k=un(w,S),y=k>0?ln(k):"All Ready!";g.appendChild(dn("ALL EGGS",y,Ba("egg",c),v,"stat__progress-fill--egg"));}else if(l.hasBoost&&(u==="plant"||f)){const v=d.length>0?Ga(d,a,E):100,w=Ag(d,a),k=un(w,E),y=k>0?ln(k):"All Ready!";g.appendChild(dn("ALL PLANTS",y,Ba("plant",d),v,"stat__progress-fill--plant"));}n.appendChild(g);},renderGroupedSlot:(e,t,n,o,r)=>{const i=fe.myGarden.get(),a=Date.now(),s=Cp(e),l=Sp(e),c=ki(s),d=ki(l);n.innerHTML="";const u=c.timeReductionPerHour>0,p=d.timeReductionPerHour>0;if(!u&&!p)return;const f=De("div","growth-stats-compact growth-stats-grouped"),g=r?i.eggs.growing.filter(v=>r.has(v.tileIndex)):i.eggs.growing,h=r?i.crops.growing.filter(v=>r.has(v.tileIndex)):i.crops.growing,x=o==="egg"&&u,b=o==="plant"&&p,C=!o,S=(60+c.timeReductionPerHour)/60,_=(60+d.timeReductionPerHour)/60,E=[];if((x||C)&&u){const v=Math.round(c.timeReductionPerHour/60*100);E.push({text:`+${v}% Speed`,sprite:cn("egg","UncommonEgg")});}if((b||C)&&p){const v=Math.round(d.timeReductionPerHour/60*100);E.push({text:`+${v}% Speed`,sprite:cn("plant","Carrot")});}if(E.length>0&&f.appendChild(Cg(E)),(x||C)&&u){const v=_g(g,a),w=un(v.remainingMs,S),k=g.length>0?za(g,a,S):100,y=w>0?ln(w):"Ready!";f.appendChild(dn("NEXT EGG",y,cn("egg",v.name),k,"stat__progress-fill--egg"));}if((b||C)&&p){const v=Eg(h,a),w=un(v.remainingMs,_),k=h.length>0?Ga(h,a,_):100,y=w>0?ln(w):"Ready!";f.appendChild(dn("NEXT PLANT",y,cn("plant",v.name),k,"stat__progress-fill--plant"));}if((x||C)&&u){const v=g.length>0?za(g,a,S):100,w=Tg(g,a),k=un(w,S),y=k>0?ln(k):"All Ready!";f.appendChild(dn("ALL EGGS",y,Ba("egg",g),v,"stat__progress-fill--egg"));}else if((b||C)&&p){const v=h.length>0?Ga(h,a,_):100,w=Ag(h,a),k=un(w,_),y=k>0?ln(k):"All Ready!";f.appendChild(dn("ALL PLANTS",y,Ba("plant",h),v,"stat__progress-fill--plant"));}n.appendChild(f);},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return Bo(n)||zo(n)},shouldDisplay:(e,t,n)=>{const r=(Wl.ALLOWED_PANELS[n.primary]||[]).includes("growth"),i=Bo(t)||zo(t);return r&&i},countRows:(e,t,n)=>{const o=Array.isArray(e)?e:[e],r=Bo(o),i=zo(o);if(!r&&!i)return 0;if(n==="egg"||n==="plant")return 2;let a=0;return r&&(a+=2),i&&(a+=2),a}},Vl=1.5,Dr=["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],Fr=["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],Br=["RainDance","SnowGranter","FrostGranter","GoldGranter","RainbowGranter"],zr=["DoubleHarvest"],Gr=["ProduceRefund"];function Xt(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function pn(e){if(e>=1e12)return `${(e/1e12).toFixed(2)}T`;if(e>=1e9)return `${(e/1e9).toFixed(2)}B`;if(e>=1e6)return `${(e/1e6).toFixed(2)}M`;if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)}k`:`${t.toFixed(1)}k`}return String(Math.round(e))}function pr(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,scaleIncreasePercentage:n.baseParameters?.scaleIncreasePercentage??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0,grantedMutations:n.baseParameters?.grantedMutations??[],requiredWeather:n.baseParameters?.requiredWeather??null}:null}function Ne(e,t){return e.abilities.some(n=>t.includes(n))}function ta(e,t,n){if(e.hunger<=0)return  false;const o=pr(t);return !(!o||o.requiredWeather&&n!==o.requiredWeather)}function na(e){return (e.currentStrength<0||e.currentStrength>100)&&console.warn(`[Gemini] Invalid strength: ${e.currentStrength} for pet ${e.name||"unknown"}`),(e.maxStrength<80||e.maxStrength>100)&&console.warn(`[Gemini] Unexpected maxStrength: ${e.maxStrength} for pet ${e.name||"unknown"} (expected 80-100)`),e.currentStrength/100}function ql(e,t){return Math.min(100,e*t)}function wR(e,t,n,o,r=Vl){const i=_l(e);if(!i)return 0;const a=_t(e,t,n)*r,s=Math.min(t*(1+o/100),i.maxScale),l=_t(e,s,n)*r;return Math.max(0,l-a)}function Hy(e,t,n,o,r=Vl){if(n.includes(o))return 0;const i=_t(e,t,n)*r,a=[...n,o],s=_t(e,t,a)*r;return Math.max(0,s-i)}function Rc(e,t,n){const o=Xt("div","stat-row");return o.appendChild(Xt("span","stat__label",e)),o.appendChild(Xt("span","stat__value",t)),o.appendChild(Xt("span","stat__timer",n)),o}function Ig(e,t,n){const o=Xt("div","stat-row");return o.appendChild(Xt("span","stat__label",e)),o.appendChild(Xt("span","stat__value",t)),o.appendChild(Xt("span","stat__timer",n)),o}function CR(e,t,n){const r=fe.myGarden.get().crops.mature,i=n?r.filter(c=>n.has(String(c.tileIndex))):r;if(i.length===0)return {perProc:0,perHour:0};let a=0,s=0;for(const c of e){const d=na(c);for(const u of Dr){if(!c.abilities.includes(u)||!ta(c,u,t))continue;const p=pr(u);if(!p)continue;const f=ql(p.baseProbability,d),g=p.scaleIncreasePercentage*d,h=f/100*60;let x=0,b=0;for(const S of i){const _=Math.max(1,Math.floor(S.fruitCount)),E=wR(S.species,S.targetScale,S.mutations,g);x+=E*_,b+=_;}const C=b>0?x/b:0;a+=C*h,s+=h;}}return {perProc:s>0?a/s:0,perHour:a}}function SR(e,t,n){const r=fe.myGarden.get().crops.mature,i=fe.weather.get(),a=J.get("weather"),s=n?r.filter(x=>n.has(String(x.tileIndex))):r;if(s.length===0||!i.isActive||!a)return {perProc:0,perHour:0};const l=a[i.type];if(!l?.mutator)return {perProc:0,perHour:0};const c=l.mutator.chancePerMinutePerCrop??0,d=l.mutator.mutation??"";let u=0;for(const x of e){const b=na(x);for(const C of Fr){if(!x.abilities.includes(C)||!ta(x,C,t))continue;const S=pr(C);if(!S)continue;const _=S.mutationChanceIncreasePercentage*b;u+=_;}}const p=c*(u/100),f=s.length*(p/100)*60;let g=0;for(const x of s){const b=Hy(x.species,x.targetScale,x.mutations,d);g+=b;}const h=s.length>0?g/s.length:0;return {perProc:h,perHour:f*h}}function kR(e,t,n){const r=fe.myGarden.get().crops.mature,i=n?r.filter(c=>n.has(String(c.tileIndex))):r;if(i.length===0)return {perProc:0,perHour:0};let a=0,s=0;for(const c of e){const d=na(c);for(const u of Br){if(!c.abilities.includes(u)||!ta(c,u,t))continue;const p=pr(u);if(!p)continue;const g=ql(p.baseProbability,d)/100*60,h=p.grantedMutations;if(h.length===0)continue;const x=h[0];let b=0,C=0;for(const E of i){if(x==="Gold"||x==="Rainbow"){const y=E.mutations.includes("Gold"),T=E.mutations.includes("Rainbow");if(y||T)continue}else if(E.mutations.includes(x))continue;const w=Math.max(1,Math.floor(E.fruitCount)),k=Hy(E.species,E.targetScale,E.mutations,x);b+=k*w,C+=w;}const _=(C>0?b/C:0)*g;a+=_,s+=g;}}return {perProc:s>0?a/s:0,perHour:a}}function _R(e,t,n){const o=fe.myGarden.get(),r=o.crops.all,i=o.crops.mature,a=n?r.filter(p=>n.has(String(p.tileIndex))):r,s=n?i.filter(p=>n.has(String(p.tileIndex))):i,l=s.length>0?s:a;if(l.length===0)return {expectedCrops:0,expectedCoins:0};let c=0;for(const p of e){const f=na(p);for(const g of zr){if(!p.abilities.includes(g)||!ta(p,g,t))continue;const h=pr(g);if(!h)continue;const x=ql(h.baseProbability,f);c+=x/100;}}const d=l.length*c;let u=0;for(const p of l){const f=_t(p.species,p.targetScale,p.mutations)*Vl;u+=f*c;}return {expectedCrops:d,expectedCoins:u}}function ER(e,t,n){const o=fe.myGarden.get(),r=o.crops.all,i=o.crops.mature,a=n?r.filter(p=>n.has(String(p.tileIndex))):r,s=n?i.filter(p=>n.has(String(p.tileIndex))):i,l=s.length>0?s:a;if(l.length===0)return {expectedCrops:0,expectedCoins:0};let c=0;for(const p of e){const f=na(p);for(const g of Gr){if(!p.abilities.includes(g)||!ta(p,g,t))continue;const h=pr(g);if(!h)continue;const x=ql(h.baseProbability,f);c+=x/100;}}const d=l.length*c;let u=0;for(const p of l){const f=_t(p.species,p.targetScale,p.mutations)*Vl;u+=f*c;}return {expectedCrops:d,expectedCoins:u}}const Yd={id:"coin",label:"Value",icon:"💰",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=fe.myGarden.get(),o=n.crops.all.length;return o===0?null:{text:`${o} crops`,variant:"neutral",tooltip:`${n.crops.mature.length} mature, ${n.crops.growing.length} growing`,priority:7}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{const i=[e];Yd.renderGroupedSlot&&Yd.renderGroupedSlot(i,t,n,o,r);},renderGroupedSlot:(e,t,n,o,r)=>{const i=fe.weather.get(),a=i.isActive?i.type:null;n.innerHTML="";const s=Xt("div","value-stats-compact"),l=e.some(f=>Ne(f,Dr)),c=e.some(f=>Ne(f,Fr)),d=e.some(f=>Ne(f,Br)),u=e.some(f=>Ne(f,zr)),p=e.some(f=>Ne(f,Gr));if(!(!l&&!c&&!d&&!u&&!p)){if(l){const f=CR(e,a,r);s.appendChild(Rc("SIZE BOOST",`+${pn(f.perProc)}/proc`,`+${pn(f.perHour)}/hr`));}if(c){const f=SR(e,a,r);s.appendChild(Rc("MUTATION BOOST",`+${pn(f.perProc)}/proc`,`+${pn(f.perHour)}/hr`));}if(d){const f=kR(e,a,r);s.appendChild(Rc("GRANTERS",`+${pn(f.perProc)}/proc`,`+${pn(f.perHour)}/hr`));}if(u){const f=_R(e,a,r);s.appendChild(Ig("EXTRA HARVEST",`+${f.expectedCrops.toFixed(1)} crops`,`+${pn(f.expectedCoins)} coins`));}if(p){const f=ER(e,a,r);s.appendChild(Ig("CROP REFUND",`+${f.expectedCrops.toFixed(1)} crops`,`+${pn(f.expectedCoins)} coins`));}n.appendChild(s);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>Ne(o,Dr)||Ne(o,Fr)||Ne(o,Br)||Ne(o,zr)||Ne(o,Gr)),shouldDisplay:(e,t,n)=>{const r=(Wl.ALLOWED_PANELS[n.primary]||[]).includes("coin"),i=t.some(a=>Ne(a,Dr)||Ne(a,Fr)||Ne(a,Br)||Ne(a,zr)||Ne(a,Gr));return r&&i},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>Ne(r,Dr))&&o++,n.some(r=>Ne(r,Fr))&&o++,n.some(r=>Ne(r,Br))&&o++,n.some(r=>Ne(r,zr))&&o++,n.some(r=>Ne(r,Gr))&&o++,o}},Co=["DoubleHatch"],So=["PetRefund","PetRefundII"],ko=["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"];function it(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function jy(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0}:null}function Qe(e,t){return e.abilities.some(n=>t.includes(n))}function Fp(e){return e.hunger>0}function Uy(e){return e.currentStrength/e.maxStrength}function Wy(e,t){return Math.min(100,e*t)}function TR(e){const t=it("span","sprite-wrapper");try{if(Y.isReady()&&Y.has("pet",e)){const n=Y.toCanvas("pet",e,{scale:.6});n.style.height="32px",n.style.width="auto",n.style.imageRendering="pixelated",t.appendChild(n);}}catch{t.textContent="🥚";}return t}function Ha(e,t){const n=it("div","stat-row");n.appendChild(it("span","stat__label",e));const o=it("div","stat__sprite-grid");for(const r of t){if(r.value<=0)continue;const i=it("div","stat__sprite-item");i.appendChild(TR(r.eggId));const a=it("span","stat__sprite-value",r.value.toFixed(1));i.appendChild(a),o.appendChild(i);}return n.appendChild(o),n}function Pg(e,t,n,o){const r=it("div","stat-row");r.appendChild(it("span","stat__label","PET MUTATION"));const i=it("span","stat__values-row"),a=it("span","stat__value stat__value--rainbow",`${e}% (${n})`);a.style.backgroundImage="var(--rainbow-text-gradient)",a.style.webkitBackgroundClip="text",a.style.webkitTextFillColor="transparent",a.style.backgroundClip="text",i.appendChild(a),i.appendChild(it("span","stat__separator"," | "));const s=it("span","stat__value stat__value--gold",`${t}% (${o})`);return i.appendChild(s),r.appendChild(i),r}function Bp(){const e=fe.myInventory.get(),t=new Map;for(const n of e.items)if(n.itemType==="Egg"&&n.eggId){const o=t.get(n.eggId)||0;t.set(n.eggId,o+(n.quantity||1));}return t}function zp(e){const t=fe.myGarden.get(),n=new Map,o=e?t.eggs.all.filter(r=>e.has(String(r.tileIndex))):t.eggs.all;for(const r of o){const i=n.get(r.eggId)||0;n.set(r.eggId,i+1);}return n}function Lg(e,t){const n=t?zp(t):Bp(),o=[];let r=0;for(const i of e){if(!Fp(i))continue;const a=Uy(i);for(const s of Co){if(!i.abilities.includes(s))continue;const l=jy(s);if(!l)continue;const c=Wy(l.baseProbability,a);r+=c/100;}}for(const[i,a]of n){const s=a*r;o.push({eggId:i,value:s});}return o}function Mg(e,t){const n=t?zp(t):Bp(),o=[];let r=0;for(const i of e){if(!Fp(i))continue;const a=Uy(i);for(const s of So){if(!i.abilities.includes(s))continue;const l=jy(s);if(!l)continue;const c=Wy(l.baseProbability,a);r+=c/100;}}for(const[i,a]of n){const s=a*r;o.push({eggId:i,value:s});}return o}function Rg(e,t){const n=t?zp(t):Bp(),o=Array.from(n.values()).reduce((f,g)=>f+g,0);let r=0,i=0;for(const f of e){if(!Fp(f))continue;ko.some(h=>f.abilities.includes(h))&&(r+=f.currentStrength*1e-4,i+=f.currentStrength*.001);}const a=J.get("mutations");let s=1,l=.1;if(a){const f=a.Gold,g=a.Rainbow;f?.baseChance!==void 0&&(s=f.baseChance),g?.baseChance!==void 0&&(l=g.baseChance);}const c=s+i,d=l+r,u=o*c/100,p=o*d/100;return {goldChance:c,rainbowChance:d,expectedGold:u,expectedRainbow:p}}const AR={id:"hatch",label:"Hatching",icon:"🥚",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const o=fe.myInventory.get().items.filter(r=>r.itemType==="Egg").reduce((r,i)=>r+(i.quantity||1),0);return o===0?null:{text:`${o} eggs`,variant:"neutral",tooltip:`${o} eggs in inventory`,priority:6}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{n.innerHTML="";const i=it("div","hatching-stats-compact"),a=Qe(e,Co),s=Qe(e,So),l=Qe(e,ko);if(!a&&!s&&!l)return;const c=[e];if(a){const d=Lg(c,r);d.length>0&&i.appendChild(Ha("DOUBLE HATCH",d));}if(s){const d=Mg(c,r);d.length>0&&i.appendChild(Ha("PET REFUND",d));}if(l){const d=Rg(c,r),u=d.rainbowChance.toFixed(4),p=d.goldChance.toFixed(2),f=d.expectedRainbow<.01?`~${(d.expectedRainbow*100).toFixed(1)}%e`:d.expectedRainbow.toFixed(2),g=d.expectedGold.toFixed(2);i.appendChild(Pg(u,p,f,g));}n.appendChild(i);},renderGroupedSlot:(e,t,n,o,r)=>{n.innerHTML="";const i=it("div","hatching-stats-compact"),a=e.some(c=>Qe(c,Co)),s=e.some(c=>Qe(c,So)),l=e.some(c=>Qe(c,ko));if(!(!a&&!s&&!l)){if(a){const c=Lg(e,r);c.length>0&&i.appendChild(Ha("DOUBLE HATCH",c));}if(s){const c=Mg(e,r);c.length>0&&i.appendChild(Ha("PET REFUND",c));}if(l){const c=Rg(e,r),d=c.rainbowChance.toFixed(4),u=c.goldChance.toFixed(2),p=c.expectedRainbow<.01?`~${(c.expectedRainbow*100).toFixed(1)}%e`:c.expectedRainbow.toFixed(2),f=c.expectedGold.toFixed(2);i.appendChild(Pg(d,u,p,f));}n.appendChild(i);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>Qe(o,Co)||Qe(o,So)||Qe(o,ko)),shouldDisplay:(e,t,n)=>{const r=(Wl.ALLOWED_PANELS[n.primary]||[]).includes("hatch"),i=t.some(a=>Qe(a,Co)||Qe(a,So)||Qe(a,ko));return r&&i},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>Qe(r,Co))&&o++,n.some(r=>Qe(r,So))&&o++,n.some(r=>Qe(r,ko))&&o++,o}},Ng=[yR,vR,Yd,AR];function IR(e){let t=e;return t=t.replace(/_NEW$/,""),t=t.replace(/^Snowy/,""),t=t.replace(/(I|II|III|IV)$/,""),t}function Vy(e){return new Set(e.abilities.map(IR))}function Ar(e,t){if(e.size!==t.size)return  false;for(const n of e)if(!t.has(n))return  false;return  true}function Og(e,t){return Vy(e).has(t)}function PR(e,t){if(e.length<2)return {shouldGroup:false,matchingPets:[],remainingPets:e};if(t){const a=t==="egg"?"EggGrowthBoost":"PlantGrowthBoost",s=e.filter(c=>Og(c,a)),l=e.filter(c=>!Og(c,a));return s.length>=2?{shouldGroup:true,matchingPets:s,remainingPets:l}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const n=e.map(a=>({pet:a,abilities:Vy(a)}));if(e.length===3){const[a,s,l]=n;if(Ar(a.abilities,s.abilities)&&Ar(a.abilities,l.abilities))return {shouldGroup:true,matchingPets:[a.pet,s.pet,l.pet],remainingPets:[]}}const[o,r,i]=n;return Ar(o.abilities,r.abilities)?{shouldGroup:true,matchingPets:[o.pet,r.pet],remainingPets:i?[i.pet]:[]}:i&&Ar(o.abilities,i.abilities)?{shouldGroup:true,matchingPets:[o.pet,i.pet],remainingPets:[r.pet]}:i&&Ar(r.abilities,i.abilities)?{shouldGroup:true,matchingPets:[r.pet,i.pet],remainingPets:[o.pet]}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const LR=3;function MR(e,t){const n=e.abilities||[],o=c=>n.some(d=>c.includes(d));if((o(ne.DOUBLE_HATCH)||o(ne.PET_REFUND)||o(ne.PET_MUTATION)||o(ne.MAX_STR_BOOST))&&t.some(c=>c.id==="hatch"))return "hatch";if((o(ne.COIN_FINDER)||o(ne.SELL_BOOST)||o(ne.CROP_REFUND_HARVEST)||o(ne.CROP_SIZE)||o(ne.CROP_MUTATION)||o(ne.RARE_GRANTERS)||o(ne.COMMON_GRANTERS))&&t.some(c=>c.id==="coin"))return "coin";if((o(ne.EGG_GROWTH)||o(ne.PLANT_GROWTH))&&t.some(c=>c.id==="growth"))return "growth";const s=e.currentStrength<e.maxStrength,l=o(ne.XP_BOOST);return (s||l)&&t.some(c=>c.id==="xp")?"xp":t[0]?.id||"xp"}class RR{constructor(t){j(this,"expandedTeams",new Map);j(this,"featureUpdateInterval",null);j(this,"options");j(this,"tileFilter");this.options=t;}setTileFilter(t){this.tileFilter=t,this.refreshAllPanels();}refreshAllPanels(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t,n=false,o){const r=this.options.getListContainer(),i=pe.getTeam(t);if(!i||!r)return;const a=pe.getPetsForTeam(i),s=fe.myPets.get(),l=Fa(i),c=Ng.filter(_=>!(!_.isAvailable()||_.shouldDisplay&&!_.shouldDisplay(i,a,l)));if(c.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const d=l.primary==="time-reduction"||Bo(a)||zo(a);let u;if(d){const _=Bo(a),E=zo(a),v=fe.myGarden.get(),w=v.eggs.growing.length>0,k=v.crops.growing.length>0;_&&E?k&&!w?u="plant":w&&!k?u="egg":u="plant":E?u="plant":_&&(u="egg");}const p=m("div",{className:"team-expanded-container"}),f=[];let g=n?{shouldGroup:false,matchingPets:[],remainingPets:a}:this.analyzeTeamForGrouping(i,a,u);const h=c.some(_=>_.id==="growth"||_.id==="hatch"||_.id==="coin");if(g.shouldGroup&&!h&&(g.matchingPets.every(E=>E.currentStrength>=E.maxStrength)||(g={shouldGroup:false,matchingPets:[],remainingPets:a})),g.shouldGroup&&g.matchingPets.length>=2){const _=c.filter(w=>!w.hasContent||w.hasContent(g.matchingPets,i)),E=_.find(w=>w.id==="growth"||w.id==="hatch"||w.id==="coin")||_[0]||c[0],v=this.createGroupedPetRow(i,g.matchingPets,c,E,u,t);p.appendChild(v.container),f.push(v.cardState);for(const w of g.remainingPets){const k=i.petIds.indexOf(w.id),y=this.createIndividualPetRow(i,w,k,c,u,t);p.appendChild(y.container),f.push(y.cardState);}}else for(let _=0;_<3;_++){const E=i.petIds[_],v=E?s.all.find(k=>k.id===E)??null:null,w=this.createIndividualPetRow(i,v,_,c,u,t,o);p.appendChild(w.container),f.push(w.cardState);}this.expandedTeams.set(t,{cards:f,expandedAt:Date.now(),container:p,growthViewType:u});const x=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(p,a,t,x);const C=pe.getAllTeams().findIndex(_=>_.id===t),S=Array.from(r.children).filter(_=>_ instanceof HTMLElement&&_.classList.contains("team-list-item"));C!==-1&&C<S.length&&S[C].insertAdjacentElement("afterend",p),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const o of n.cards)o.shell&&o.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,o,r){const i=pe.getTeam(o),a=i?Fa(i):null,s=this.expandedTeams.get(o),l=a?.primary==="time-reduction"||Bo(n)||zo(n),c=r??(l?"growth":"xp");s&&(s.currentBarMode=c),c==="growth"?this.renderGrowthSummaryBar(t,n,o):this.renderXpProgressBar(t,n);}updateProgressBarForFeature(t,n){const o=this.expandedTeams.get(t);if(!o)return;const r=pe.getTeam(t);if(!r||n!=="xp"&&n!=="growth")return;const i=pe.getPetsForTeam(r),a=n==="xp"?"xp":"growth";if(o.currentBarMode===a)return;const s=o.container.querySelector(".growth-summary-overhaul"),l=o.container.querySelector(".team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)");s&&s.remove(),l&&l.remove(),this.addProgressBar(o.container,i,t,a);}renderXpProgressBar(t,n){if(n.some(r=>r.currentStrength<r.maxStrength)&&n.length>0){const r=Math.round(n.reduce((c,d)=>c+d.currentStrength/d.maxStrength,0)/n.length*100),i=m("div",{className:"team-progress-bar"}),a=r<33?"low":r<67?"medium":"high",s=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});s.style.width=`${r}%`;const l=m("div",{className:"team-progress-bar__percent",textContent:`${r}%`});i.appendChild(s),i.appendChild(l),t.prepend(i);}}renderGrowthSummaryBar(t,n,o){const r=this.expandedTeams.get(o),i=r?.growthViewType||"plant",a=fe.myGarden.get(),s=Date.now(),l=i==="egg"?a.eggs.growing:a.crops.growing,c=this.tileFilter?l.filter(N=>this.tileFilter.has(N.tileIndex)):l,d=c.length,u=Cp(n),p=Sp(n),f=ki(u).timeReductionPerHour,g=ki(p).timeReductionPerHour,h=Math.round(i==="egg"?f:g);let x=d>0?0:100;if(d>0){const N=(60+h)/60;x=Math.round(c.reduce((F,G)=>{const B=i==="egg"?G.plantedAt:G.startTime,H=i==="egg"?G.maturedAt:G.endTime,L=s-B,A=(H-s)/N,M=L+A,X=M>0?L/M*100:0;return F+Math.min(100,Math.max(0,X))},0)/d);}let b=c.find(N=>N.tileIndex===r?.pinnedItemId);!b&&d>0&&(b=[...c].sort((N,F)=>{const G=i==="egg"?N.maturedAt:N.endTime,B=i==="egg"?F.maturedAt:F.endTime;return G-B})[0]);const C=m("div",{className:"growth-summary-overhaul"}),S=m("div",{className:`team-progress-bar team-progress-bar--${i}`}),_=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});_.style.width=`${x}%`;const E=N=>{const F=Math.floor(N/60),G=N%60;return F>0&&G>0?`${F}h ${G}m/h`:F>0?`${F}h/h`:`${G}m/h`};h>0&&((60+h)/60).toFixed(2)+"";const v=m("div",{className:"team-progress-bar__overlay"});v.innerHTML=`
            <span class="bar-percent">${x}%</span>
            <span class="bar-info">${d} total +${E(h)}</span>
        `,S.appendChild(_),S.appendChild(v);const w=m("div",{className:"growth-next-item"});if(b){let N=i==="egg"?b.eggId:b.species;const F=i==="egg"?"pet":"plant";i==="plant"&&N&&(N==="DawnCelestial"&&(N="DawnCelestialCrop"),N==="MoonCelestial"&&(N="MoonCelestialCrop"));const G=i==="egg"?b.maturedAt:b.endTime;i==="egg"?b.plantedAt:b.startTime;const B=(60+h)/60,H=Math.max(0,Math.round((G-s)/B)),L=s+H,$=new Date(L),A=$.getDate()!==new Date().getDate(),M=$.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),X=`${A?"Tomorrow ":""}${M}`,U=Z=>{const Ce=Math.floor(Z/1e3),Ie=Math.floor(Ce/60),mo=Math.floor(Ie/60);return mo>0?`${mo}h ${Ie%60}m ${Ce%60}s`:Ie>0?`${Ie}m ${Ce%60}s`:`${Ce}s`},q=m("div",{className:"growth-next-sprite"});try{if(Y.isReady()&&Y.has(F,N)){const Z=Y.toCanvas(F,N,{scale:.3});Z.style.height="20px",Z.style.width="auto",Z.style.imageRendering="pixelated",q.appendChild(Z);}else q.textContent=i==="egg"?"🥚":"🌱";}catch(Z){console.warn("[GrowthSummary] Sprite error:",Z),q.textContent=i==="egg"?"🥚":"🌱";}w.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${U(H)}</span>
                    <span class="growth-next-date">| ${X}</span>
                </div>
            `,w.prepend(q);}else w.innerHTML='<span class="empty-text">No items growing</span>';const k=m("div",{className:"growth-overhaul-controls"}),y=i==="egg"?"UncommonEgg":"Carrot",T=i==="egg"?"pet":"plant";let I=null;try{Y.isReady()&&Y.has(T,y)&&(I=Y.toCanvas(T,y,{scale:.35}));}catch{}const P=gR({variant:i==="egg"?"egg":"plant",sprite:I,playSound:true,tooltip:`Switch to ${i==="egg"?"plants":"eggs"}`,onClick:N=>{N.stopPropagation(),r&&(r.growthViewType=i==="egg"?"plant":"egg",r.pinnedItemId=void 0,this.updateGrowthSummary(o));}}),R=m("button",{className:"growth-dropdown-overhaul",textContent:"▼"});R.onclick=N=>{N.stopPropagation(),this.showGrowthDropdown(R,c,i,o);},f>0&&g>0&&k.appendChild(P),k.appendChild(R),C.appendChild(S),C.appendChild(w),C.appendChild(k);const W=t.querySelector(".growth-summary-overhaul");W?W.replaceWith(C):t.prepend(C);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const o=pe.getTeam(t);if(!o)return;const r=pe.getPetsForTeam(o);this.renderGrowthSummaryBar(n.container,r,t);const i=this.analyzeTeamForGrouping(o,r,n.growthViewType),a=n.cards.some(l=>l.slotIndex===-1),s=i.shouldGroup&&i.matchingPets.length>=2;if(a!==s){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}if(a&&s){const l=n.cards.find(c=>c.slotIndex===-1);if(l?.shell&&(l.shell.root.classList.contains("base-pet-card--grouped")?3:l.shell.root.classList.contains("base-pet-card--grouped-2")?2:0)!==i.matchingPets.length){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}}this.updateGroupedCardsViewType(t,n),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const o=pe.getTeam(t);if(!o)return;const r=fe.myPets.get();for(const i of n.cards){const a=o.petIds[i.slotIndex],s=a?r.all.find(l=>l.id===a):null;if(s&&i.shell&&(i.shell.update(s),i.featureData.renderPetSlot))try{const l=i.shell.getContentSlot();i.featureData.renderPetSlot(s,o,l,n.growthViewType,this.tileFilter);const c=s.currentStrength>=s.maxStrength,d=l.children.length>0||l.textContent.trim().length>0;i.shell.setCentered(c&&!d);}catch(l){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,l);}}}updateGroupedCardsViewType(t,n){const o=pe.getTeam(t);if(o){for(const r of n.cards)if(r.slotIndex===-1&&r.shell){const i=r.shell.getContentSlot();if(r.featureData.renderGroupedSlot&&r.shell.root.classList.contains("base-pet-card--grouped")){i.innerHTML="";const a=pe.getPetsForTeam(o);r.featureData.renderGroupedSlot(a,o,i,n.growthViewType,this.tileFilter);const s=i.children.length>0||i.textContent.trim().length>0;r.shell.setCentered(!s);}}}}showGrowthDropdown(t,n,o,r){const i=document.querySelector(".growth-dropdown-menu");if(i){const c=i.getAttribute("data-owner-id")===r&&i.getAttribute("data-view-type")===o;if(i.remove(),c)return}const a=m("div",{className:"growth-dropdown-menu"});if(a.setAttribute("data-owner-id",r),a.setAttribute("data-view-type",o),n.length===0){const c=m("div",{className:"growth-dropdown-option"});c.textContent="No items growing",a.appendChild(c);}else {const c=o==="egg"?"pet":"plant";n.forEach(d=>{const u=d.tileIndex;let p=o==="egg"?d.eggId:d.species;o==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=m("div",{className:"growth-dropdown-option"}),g=m("span",{className:"dropdown-sprite"});try{if(Y.isReady()&&Y.has(c,p)){const S=Y.toCanvas(c,p,{scale:.3});S.style.height="16px",S.style.width="auto",S.style.imageRendering="pixelated",g.appendChild(S);}else g.textContent=o==="egg"?"🥚":"🌱";}catch{g.textContent=o==="egg"?"🥚":"🌱";}const h=o==="egg"?d.maturedAt:d.endTime,b=new Date(h).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),C=m("span",{className:"dropdown-text"});C.textContent=`${p} - ${b}`,f.appendChild(g),f.appendChild(C),f.onclick=S=>{S.stopPropagation();const _=this.expandedTeams.get(r);_&&(_.pinnedItemId=u,this.updateGrowthSummary(r)),a.remove();},a.appendChild(f);});}const s=t.getBoundingClientRect();a.style.position="fixed",a.style.bottom=`${window.innerHeight-s.top+4}px`,a.style.top="auto",a.style.left="auto",a.style.right=`${window.innerWidth-s.right}px`,a.style.marginTop="0",a.style.zIndex="999999",document.body.appendChild(a);const l=c=>{!a.contains(c.target)&&c.target!==t&&(a.remove(),document.removeEventListener("click",l,true));};setTimeout(()=>document.addEventListener("click",l,true),10);}createIndividualPetRow(t,n,o,r,i,a,s){const l=n?r.filter(E=>!E.hasContent||E.hasContent(n,t)):r,c=l.length>0?l:r;let d=c[0];if(s)d=c.find(E=>E.id===s)||c[0];else if(n){const E=MR(n,c);d=c.find(v=>v.id===E)||c[0];}else {const v=Fa(t)?.suggestedFeatures||[];let w=false;for(const k of v){const y=c.find(T=>T.id===k);if(y){d=y,w=true;break}}w||(i?d=c.find(k=>k.id==="growth")||c[0]:d=c.find(k=>k.id==="xp")||c[0]);}const u=m("div",{className:"expanded-pet-row"}),p=m("div",{className:"pet-row__header"}),f=m("button",{textContent:"<",className:"pet-row__nav"}),g=m("div",{textContent:`${d.icon} ${d.label.toUpperCase()}`,className:"pet-label"}),h=m("button",{textContent:">",className:"pet-row__nav"});let x=null;n&&(x=new uR(n));const b={slotIndex:o,currentFeatureId:d.id,shell:x,featureData:d},C=E=>{const v=c[E];if(v.id==="growth"){const w=pe.getPetsForTeam(t),k=this.expandedTeams.get(a),y=this.analyzeTeamForGrouping(t,w,k?.growthViewType);if(y.shouldGroup&&y.matchingPets.length>=2){this.collapseAndReexpandForGrowth(a);return}}if(g.textContent=`${v.icon} ${v.label.toUpperCase()}`,x&&n){const w=x.getContentSlot();if(w.innerHTML="",v.renderPetSlot){const T=this.expandedTeams.get(a);v.renderPetSlot(n,t,w,T?.growthViewType,this.tileFilter);}const k=n.currentStrength>=n.maxStrength,y=w.children.length>0||w.textContent.trim().length>0;x.setCentered(k&&!y);}b.currentFeatureId=v.id,b.featureData=v,p.className=`pet-row__header pet-row__header--${v.id}`,this.updateProgressBarForFeature(a,v.id);};p.className=`pet-row__header pet-row__header--${d.id}`;let S=c.findIndex(E=>E.id===d.id);f.addEventListener("click",E=>{E.stopPropagation(),S=(S-1+c.length)%c.length,C(S);}),h.addEventListener("click",E=>{E.stopPropagation(),S=(S+1)%c.length,C(S);}),c.length>1&&p.appendChild(f),p.appendChild(g),c.length>1&&p.appendChild(h);let _;if(x&&n){if(_=x.build(),d.renderPetSlot){const E=x.getContentSlot();d.renderPetSlot(n,t,E,i,this.tileFilter);const v=n.currentStrength>=n.maxStrength,w=E.children.length>0||E.textContent.trim().length>0;x.setCentered(v&&!w);}}else _=m("div",{className:"pet-row__content pet-row__content--empty"}),_.innerHTML=`
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;return u.appendChild(p),u.appendChild(_),b.container=u,{container:u,cardState:b}}createGroupedPetRow(t,n,o,r,i,a){const s=o.filter(w=>!w.hasContent||w.hasContent(n,t)),l=s.length>0?s:o;if(this.shouldUseCombinedPanel(l,n,t,i))return this.createCombinedPanelRow(t,n,l,i,a);const c=m("div",{className:"expanded-pet-row expanded-pet-row--grouped"}),d=m("div",{className:"pet-row__header"}),u=m("button",{textContent:"<",className:"pet-row__nav"}),p=m("div",{textContent:`${r.icon} ${r.label.toUpperCase()}`,className:"pet-label"}),f=m("button",{textContent:">",className:"pet-row__nav"}),g=m("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),h=m("div",{className:"base-pet-card__left"}),x=m("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const w of n)try{const k=w.mutations||[];if(Y.has("pet",w.petSpecies)){const y=Y.toCanvas("pet",w.petSpecies,{mutations:k,scale:1,boundsMode:"padded"});y.style.imageRendering="pixelated",x.appendChild(y);}}catch{}h.appendChild(x);const b=m("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const w of n){const y=w.currentStrength>=w.maxStrength?`MAX ${w.maxStrength}`:`STR ${w.currentStrength}/${w.maxStrength}`,T=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:y});b.appendChild(T);}h.appendChild(b),g.appendChild(h);const C=m("div",{className:"base-pet-card__content"});g.appendChild(C);const S={root:g,getContentSlot:()=>C,setCentered:w=>{g.classList.toggle("base-pet-card--centered",w);},destroy:()=>{g.remove();},update:()=>{b.innerHTML="";for(const w of n){const y=w.currentStrength>=w.maxStrength?`MAX ${w.maxStrength}`:`STR ${w.currentStrength}/${w.maxStrength}`,T=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:y});b.appendChild(T);}}},_={slotIndex:-1,currentFeatureId:r.id,shell:S,featureData:r},E=w=>{const k=l[w];if(k.id==="xp"&&!n.every(I=>I.currentStrength>=I.maxStrength)){this.collapseAndReexpandForXP(a);return}if(p.textContent=`${k.icon} ${k.label.toUpperCase()}`,C.innerHTML="",k.renderGroupedSlot){const T=this.expandedTeams.get(a);k.renderGroupedSlot(n,t,C,T?.growthViewType,this.tileFilter);}else if(k.renderPetSlot){const T=this.expandedTeams.get(a);k.renderPetSlot(n[0],t,C,T?.growthViewType,this.tileFilter);}const y=C.children.length>0||C.textContent.trim().length>0;S.setCentered(!y),_.currentFeatureId=k.id,_.featureData=k,d.className=`pet-row__header pet-row__header--${k.id}`;};d.className=`pet-row__header pet-row__header--${r.id}`;let v=l.findIndex(w=>w.id===r.id);return u.addEventListener("click",w=>{w.stopPropagation(),v=(v-1+l.length)%l.length,E(v);}),f.addEventListener("click",w=>{w.stopPropagation(),v=(v+1)%l.length,E(v);}),l.length>1&&d.appendChild(u),d.appendChild(p),l.length>1&&d.appendChild(f),r.renderGroupedSlot?r.renderGroupedSlot(n,t,C,i,this.tileFilter):r.renderPetSlot&&r.renderPetSlot(n[0],t,C,i,this.tileFilter),c.appendChild(d),c.appendChild(g),g.classList.add("base-pet-card--grouped"),{container:c,cardState:{..._,container:c}}}collapseAndReexpandForXP(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,true,"xp"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,true,"xp"),n.container.style.opacity="1";});});}collapseAndReexpandForGrowth(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,false,"growth"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,false,"growth"),n.container.style.opacity="1";});});}rebuildInPlace(t,n,o){const r=this.expandedTeams.get(t);if(!r)return;const i=pe.getTeam(t);if(!i)return;const a=pe.getPetsForTeam(i),s=fe.myPets.get(),l=this.getAvailableFeaturesForTeam(i,a),c=r.growthViewType;for(const h of r.cards)h.shell&&h.shell.destroy(),h.container&&h.container.parentNode&&h.container.remove();const d=r.container.querySelector(".team-progress-bar");d&&d.remove();const u=[];let p=n?{shouldGroup:false,matchingPets:[],remainingPets:a}:this.analyzeTeamForGrouping(i,a,c);const f=l.some(h=>h.id==="growth"||h.id==="hatch"||h.id==="coin");if(p.shouldGroup&&!f&&(p.matchingPets.every(x=>x.currentStrength>=x.maxStrength)||(p={shouldGroup:false,matchingPets:[],remainingPets:a})),p.shouldGroup&&p.matchingPets.length>=2){const h=l.filter(C=>!C.hasContent||C.hasContent(p.matchingPets,i)),x=h.find(C=>C.id==="growth"||C.id==="hatch"||C.id==="coin")||h[0]||l[0],b=this.createGroupedPetRow(i,p.matchingPets,l,x,c,t);r.container.appendChild(b.container),u.push(b.cardState);for(const C of p.remainingPets){const S=i.petIds.indexOf(C.id),_=this.createIndividualPetRow(i,C,S,l,c,t);r.container.appendChild(_.container),u.push(_.cardState);}}else for(let h=0;h<3;h++){const x=i.petIds[h],b=x?s.all.find(S=>S.id===x)??null:null,C=this.createIndividualPetRow(i,b,h,l,c,t,o);r.container.appendChild(C.container),u.push(C.cardState);}r.cards=u;const g=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(r.container,a,t,g);}getAvailableFeaturesForTeam(t,n){return Fa(t),Ng.filter(o=>o.isAvailable())}countTotalRows(t,n,o,r){let i=0;for(const a of t)a.countRows?i+=a.countRows(n,o,r):a.hasContent?.(n,o)&&(i+=1);return i}shouldUseCombinedPanel(t,n,o,r){return t.length<2?false:this.countTotalRows(t,n,o,r)<=LR}createCombinedPanelRow(t,n,o,r,i){const a=m("div",{className:"expanded-pet-row expanded-pet-row--combined"}),s=m("div",{className:"pet-row__header pet-row__header--combined"}),l=m("span",{className:"combined-panel__icons",textContent:o.map(b=>b.icon).join(" ")});s.appendChild(l);const c=m("div",{textContent:"COMBINED",className:"pet-label"});s.appendChild(c);const d=m("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),u=m("div",{className:"base-pet-card__left"}),p=m("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const b of n)try{const C=b.mutations||[];if(Y.has("pet",b.petSpecies)){const S=Y.toCanvas("pet",b.petSpecies,{mutations:C,scale:1,boundsMode:"padded"});S.style.imageRendering="pixelated",p.appendChild(S);}}catch{}u.appendChild(p);const f=m("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const b of n){const S=b.currentStrength>=b.maxStrength?`MAX ${b.maxStrength}`:`STR ${b.currentStrength}/${b.maxStrength}`,_=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:S});f.appendChild(_);}u.appendChild(f),d.appendChild(u);const g=m("div",{className:"base-pet-card__content base-pet-card__content--combined"});for(const b of o){const C=m("div",{className:`combined-section combined-section--${b.id}`}),S=m("span",{className:"combined-section__icon",textContent:b.icon});C.appendChild(S);const _=m("div",{className:"combined-section__content"});b.renderGroupedSlot?b.renderGroupedSlot(n,t,_,r,this.tileFilter):b.renderPetSlot&&b.renderPetSlot(n[0],t,_,r,this.tileFilter),(_.children.length>0||_.textContent?.trim())&&(C.appendChild(_),g.appendChild(C));}d.appendChild(g);const x={slotIndex:-1,currentFeatureId:"combined",shell:{root:d,getContentSlot:()=>g,setCentered:b=>{d.classList.toggle("base-pet-card--centered",b);},destroy:()=>{d.remove();},update:()=>{f.innerHTML="";for(const b of n){const S=b.currentStrength>=b.maxStrength?`MAX ${b.maxStrength}`:`STR ${b.currentStrength}/${b.maxStrength}`,_=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:S});f.appendChild(_);}},build:()=>d},container:a,featureData:o[0]};return a.appendChild(s),a.appendChild(d),{container:a,cardState:x}}analyzeTeamForGrouping(t,n,o){const r=c=>(c.abilities||[]).some(u=>ne.MAX_STR_BOOST.includes(u)||ne.PET_MUTATION.includes(u)||ne.DOUBLE_HATCH.includes(u)||ne.PET_REFUND.includes(u)),i=n.filter(r);if(i.length>=2&&i.length<=3){const c=n.filter(d=>!i.includes(d));return {shouldGroup:true,matchingPets:i,remainingPets:c}}const a=["DoubleHarvest","ProduceRefund","ProduceRefundII"],s=c=>(c.abilities||[]).some(u=>a.includes(u)),l=n.filter(s);if(l.length>=2&&l.length<=3&&!l.some(d=>(d.abilities||[]).some(p=>ne.EGG_GROWTH.includes(p)||ne.PLANT_GROWTH.includes(p)||ne.CROP_MUTATION.includes(p)))){const d=n.filter(u=>!l.includes(u));return {shouldGroup:true,matchingPets:l,remainingPets:d}}return PR(n,o)}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=Je.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}const NR={calculationScope:"all",selectedTileIndices:[],expandedTeamIds:[]};let Ge=null,Nc=null;async function OR(){return Ge||(Nc||(Nc=En("tab-trackers",{version:3,defaults:NR})),Ge=await Nc,Ge)}function Uo(){if(!Ge)throw new Error("[TrackersState] State not initialized. Call initTrackersState() first.");return Ge}function $R(e){if(!Ge)return;const t=Ge.get();t.expandedTeamIds.includes(e)?Ge.update({expandedTeamIds:t.expandedTeamIds.filter(o=>o!==e)}):Ge.update({expandedTeamIds:[...t.expandedTeamIds,e]});}function DR(e){Ge&&Ge.update({calculationScope:e});}function Oc(e){if(!Ge)return;const t=Ge.get();t.selectedTileIndices.includes(e)?Ge.update({selectedTileIndices:t.selectedTileIndices.filter(o=>o!==e)}):Ge.update({selectedTileIndices:[...t.selectedTileIndices,e]});}function FR(){Ge&&Ge.update({selectedTileIndices:[]});}class BR{constructor(t={}){j(this,"dropdown",null);j(this,"options");j(this,"isDragging",false);j(this,"dragSelectMode",null);this.options=t,document.addEventListener("pointerup",()=>{this.isDragging=false,this.dragSelectMode=null;});}build(){if(this.dropdown)return this.dropdown;this.dropdown=m("div",{className:"tile-grid-selector"});const t=this.buildHeader();this.dropdown.appendChild(t);const n=this.buildGrids();return this.dropdown.appendChild(n),this.dropdown}show(){this.dropdown||this.build(),this.dropdown&&!this.dropdown.parentElement&&(this.options.container||document.body).appendChild(this.dropdown),this.dropdown&&this.dropdown.classList.add("tile-grid-selector--visible"),this.renderGrids();}hide(){this.dropdown&&this.dropdown.classList.remove("tile-grid-selector--visible");}destroy(){this.dropdown?.parentElement&&this.dropdown.parentElement.removeChild(this.dropdown),this.dropdown=null;}buildHeader(){const t=m("div",{className:"tile-grid-selector__header"}),o=Uo().get().selectedTileIndices.length,r=m("div",{className:"tile-grid-selector__info",textContent:`${o} tile${o!==1?"s":""} selected`}),i=m("button",{className:"tile-grid-selector__btn",textContent:"Clear All"});i.addEventListener("click",()=>{FR(),this.renderGrids(),this.options.onChange&&this.options.onChange();});const a=m("button",{className:"tile-grid-selector__close-btn",textContent:"×",title:"Close"});return a.addEventListener("click",()=>{this.hide();}),t.appendChild(r),t.appendChild(i),t.appendChild(a),t}buildGrids(){const t=m("div",{className:"tile-grid-selector__grids"}),n=m("div",{className:"tile-grid-selector__grid",id:"tile-grid-1"}),o=m("div",{className:"tile-grid-selector__grid",id:"tile-grid-2"});return t.appendChild(n),t.appendChild(o),t}renderGrids(){const t=this.dropdown?.querySelector("#tile-grid-1"),n=this.dropdown?.querySelector("#tile-grid-2");if(!t||!n)return;t.innerHTML="",n.innerHTML="";const o=fe.myGarden.get(),r=fe.gameMap.get(),i=Uo().get();if(!o.garden||!r)return;const a=o.mySlotIndex;if(a===null)return;const s=r.userSlots[a];if(!s)return;const l=s.dirtTiles,c=new Set(i.selectedTileIndices),d=o.garden.tileObjects,u=[...new Set(l.map(v=>v.position.x))].sort((v,w)=>v-w);let p=0,f=u[Math.floor(u.length/2)];for(let v=1;v<u.length;v++){const w=u[v]-u[v-1];w>p&&(p=w,f=(u[v]+u[v-1])/2);}const g=l.filter(v=>v.position.x<f),h=l.filter(v=>v.position.x>=f),x=v=>{if(v.length===0)return {minX:0,maxX:9,minY:0,maxY:9};const w=v.map(y=>y.position.x),k=v.map(y=>y.position.y);return {minX:Math.min(...w),maxX:Math.max(...w),minY:Math.min(...k),maxY:Math.max(...k)}},b=x(g),C=x(h),S=new Map,_=new Map;for(const v of g){const w=v.position.x-b.minX,k=v.position.y-b.minY;S.set(`${k},${w}`,v);}for(const v of h){const w=v.position.x-C.minX,k=v.position.y-C.minY;_.set(`${k},${w}`,v);}for(let v=0;v<10;v++)for(let w=0;w<10;w++){const k=S.get(`${v},${w}`)||null,y=this.buildTileElement(k,k&&d[k.localIndex.toString()]||null,k?c.has(k.localIndex.toString()):false);t.appendChild(y);}for(let v=0;v<10;v++)for(let w=0;w<10;w++){const k=_.get(`${v},${w}`)||null,y=this.buildTileElement(k,k&&d[k.localIndex.toString()]||null,k?c.has(k.localIndex.toString()):false);n.appendChild(y);}const E=this.dropdown?.querySelector(".tile-grid-selector__info");E&&(E.textContent=`${c.size} tile${c.size!==1?"s":""} selected`);}buildTileElement(t,n,o){const r=m("button",{className:"tile-grid-selector__tile"});if(!t)return r.classList.add("tile-grid-selector__tile--null"),r.disabled=true,r;if(o&&r.classList.add("tile-grid-selector__tile--selected"),n?r.classList.add("tile-grid-selector__tile--occupied"):r.classList.add("tile-grid-selector__tile--empty"),n&&Y.isReady()){const i=this.getSpriteForTileObject(n);i&&r.appendChild(i);}return r.addEventListener("pointerdown",i=>{i.preventDefault(),this.isDragging=true,this.dragSelectMode=o?"deselect":"select",Oc(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.();}),r.addEventListener("pointerenter",()=>{if(!this.isDragging||!this.dragSelectMode)return;const a=Uo().get().selectedTileIndices.includes(t.localIndex.toString());this.dragSelectMode==="select"&&!a?(Oc(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.()):this.dragSelectMode==="deselect"&&a&&(Oc(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.());}),r}getSpriteForTileObject(t){try{if(t.objectType==="plant"){let n=t.species;if(n==="DawnCelestial"&&(n="DawnCelestialCrop"),n==="MoonCelestial"&&(n="MoonCelestialCrop"),Y.has("plant",n)){const o=Y.toCanvas("plant",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}else if(t.objectType==="egg"){const n=t.eggId;if(Y.has("pet",n)){const o=Y.toCanvas("pet",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}else if(t.objectType==="decor"){const n=t.decorId;if(Y.has("decor",n)){const o=Y.toCanvas("decor",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}}catch(n){console.warn("[TileGridSelector] Failed to load sprite:",n);}return null}}class zR{constructor(t){j(this,"card",null);j(this,"scopeControl",null);j(this,"scopeContainer",null);j(this,"content",null);j(this,"listContainer",null);j(this,"options");j(this,"tileGridOverlay",null);j(this,"expansionHandler");this.options=t,this.expansionHandler=new RR({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createCard()}destroy(){this.expansionHandler.destroy(),this.scopeControl&&(this.scopeControl.destroy(),this.scopeControl=null),this.tileGridOverlay&&(this.tileGridOverlay.destroy?.(),this.tileGridOverlay=null),this.card=null,this.scopeContainer=null,this.content=null,this.listContainer=null;}render(){if(!this.card)return;if(!pe.isEnabled()){this.renderDisabledState();return}this.scopeContainer&&(this.scopeContainer.style.display="flex"),this.ensureScopeControl(),this.renderTeamList();}getListContainer(){return this.listContainer}createCard(){const t=m("div",{className:"tracker-card-wrapper"});this.scopeContainer=m("div",{className:"tracker-card__scope-container"}),t.appendChild(this.scopeContainer),this.content=m("div",{className:"tracker-card__content"}),t.appendChild(this.content);const n=Ee({title:"Trackers",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureScopeControl(){if(!this.scopeContainer)return;const t=Uo().get();if(!this.scopeControl){this.scopeControl=go({segments:[{id:"all",label:"All Tiles"},{id:"selected",label:"Selected Tiles"}],selected:t.calculationScope,onChange:n=>{const o=n;DR(o),o==="selected"?this.showTileGridOverlay():this.tileGridOverlay?.hide(),this.renderTeamList();}}),this.scopeContainer.appendChild(this.scopeControl);return}this.scopeControl.getSelected()!==t.calculationScope&&this.scopeControl.select(t.calculationScope);}showTileGridOverlay(){this.tileGridOverlay||(this.tileGridOverlay=new BR({onChange:()=>{this.renderTeamList();},container:this.scopeContainer||void 0}),this.tileGridOverlay.build()),this.tileGridOverlay.show();}renderDisabledState(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.listContainer=null,this.scopeContainer&&(this.scopeContainer.style.display="none");const t=m("div",{className:"tracker-card__disabled-state"}),n=m("div",{textContent:"Pet Teams feature is not enabled",className:"tracker-card__disabled-message"});t.appendChild(n),this.content.replaceChildren(t);}renderTeamList(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.content.replaceChildren();const t=pe.getAllTeams(),n=pe.getActiveTeamId(),o=Uo().get(),r=o.calculationScope==="selected"?new Set(o.selectedTileIndices):void 0;if(this.expansionHandler.setTileFilter(r),t.length===0){this.renderEmptyState();return}this.listContainer=m("div",{className:"tracker-card__list-container"}),t.forEach(i=>{const a=n===i.id,s=o.expandedTeamIds.includes(i.id),l=Dy({team:i,isActive:a,hideDragHandle:true,isNameEditable:false,isExpanded:s,onExpandClick:()=>{this.handleExpandToggle(i.id);}});l.setAttribute("data-team-id",i.id),l.addEventListener("click",c=>{c.stopPropagation();}),this.listContainer.appendChild(l),s&&this.expansionHandler.expand(i.id);}),this.content.appendChild(this.listContainer);}renderEmptyState(){if(!this.content)return;const t=m("div",{className:"tracker-card__empty-state"}),n=m("div",{textContent:"No teams created yet.",className:"tracker-card__empty-message"}),o=m("div",{textContent:"Create teams in the Pets tab to view trackers.",className:"tracker-card__empty-hint"});t.appendChild(n),t.appendChild(o),this.content.appendChild(t);}handleExpandToggle(t){$R(t),this.expansionHandler.toggle(t);const n=this.listContainer?.querySelector(`[data-team-id="${t}"]`);if(n){const o=Uo().get().expandedTeamIds.includes(t),r=n.querySelector(".team-list-item__expand");r&&r.classList.toggle("team-list-item__expand--open",o);}}}const GR=`
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
`,HR=`
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
`,jR=`
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

`,UR=`
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
`,WR=`
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
`,VR=`
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
`;class qR extends nn{constructor(n){super({id:"tab-trackers",label:"Trackers"});j(this,"deps");j(this,"trackerCardPart",null);j(this,"unsubscribeMyPets");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await bt(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>rp);return {MGSprite:a}},void 0);await o.init(),await OR();const r=n.getRootNode();this.injectStyles(r);const i=this.createGrid("12px");i.id="trackers",n.appendChild(i),this.initializeTrackerCard(i),this.unsubscribeMyPets=fe.myPets.subscribeStable(()=>{this.trackerCardPart?.render();});}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.trackerCardPart&&(this.trackerCardPart.destroy(),this.trackerCardPart=null);}unmount(){this.destroy().catch(console.error),super.unmount();}injectStyles(n){Pe(n,GR,"tracker-card-styles"),Pe(n,HR,"tile-grid-overlay-styles"),Pe(n,jR,"team-card-styles"),Pe(n,UR,"feature-card-styles"),Pe(n,WR,"team-xp-panel-styles"),Pe(n,VR,"growth-panel-styles"),Pe(n,zy,"base-pet-card-styles"),Pe(n,Dp,"badge-styles"),Pe(n,Gy,"arcade-button-styles"),Pe(n,Fy,"gemini-icon-button-styles");}initializeTrackerCard(n){this.trackerCardPart||(this.trackerCardPart=new zR({setHUDOpen:this.deps?.setHUDOpen}));const o=this.trackerCardPart.build();n.appendChild(o),this.trackerCardPart.render();}}const KR=`
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
`,$g={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function XR(){const e=await En("tab-alerts",{version:1,defaults:$g,sanitize:r=>({ui:{expandedCards:qo($g.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:qo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}const YR={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},Dg={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},JR={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},QR={seed:"seed",tool:null,egg:null,decor:null},Fg={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function Gp(e,t,n){try{const o=JR[t],r=J.get(o);if(!r||typeof r!="object")return null;const i=r[e];if(!i||typeof i!="object")return null;const a=QR[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch(o){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,o),null}}function ZR(e,t){return Gp(e,t,"spriteId")}function eN(e,t){const n=Gp(e,t,"rarity");return n?String(n).toLowerCase():null}function tN(e,t){return Gp(e,t,"name")??e}function nN(){const e=ao.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function Bg(e){const t=nN(),n=[],o=["seed","tool","egg","decor"];for(const r of o){const i=e.byType[r];if(i)for(const a of i.items){const s=`${r}:${a.id}`;n.push({...a,shopType:r,rarity:eN(a.id,r),spriteId:ZR(a.id,r),itemName:tN(a.id,r),isTracked:t.has(s),hasCustomSound:de.hasItemCustomSound("shop",a.id,r)});}}return n}const oN=`
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
`,rN={size:"md",closeOnBackdrop:true,closeOnEscape:true};function Hp(e){const t={...rN,...e};let n=false,o=null,r=null,i=null,a=null,s=null;function l(){g(),t.onClose?.();}function c(E){t.closeOnBackdrop&&E.target===r&&l();}function d(E){t.closeOnEscape&&E.key==="Escape"&&l();}function u(){if(!i)return;const E=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),v=Array.from(i.querySelectorAll(E));if(v.length===0)return;const w=v[0],k=v[v.length-1];w.focus();const y=T=>{T.key==="Tab"&&(T.shiftKey?document.activeElement===w&&(T.preventDefault(),k.focus()):document.activeElement===k&&(T.preventDefault(),w.focus()));};i.addEventListener("keydown",y),a=()=>{i?.removeEventListener("keydown",y);};}function p(){o=m("div",{className:"modal-container"}),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-labelledby","modal-title");const E=m("style");E.textContent=oN,o.appendChild(E),r=m("div",{className:"modal-backdrop"}),r.addEventListener("click",c),o.appendChild(r),i=m("div",{className:`modal-dialog modal-dialog--${t.size}`});const v=m("div",{className:"modal-header"}),w=m("h2",{className:"modal-title",id:"modal-title"},t.title);if(t.subtitle){const T=m("div",{className:"modal-title-group"});T.appendChild(w),T.appendChild(m("p",{className:"modal-subtitle"},t.subtitle)),v.appendChild(T);}else v.appendChild(w);const k=m("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");k.addEventListener("click",l),v.appendChild(k),i.appendChild(v);const y=m("div",{className:"modal-body"});if(y.appendChild(t.content),i.appendChild(y),t.footer){const T=m("div",{className:"modal-footer"});T.appendChild(t.footer),i.appendChild(T);}return r.appendChild(i),o}function f(){if(!o)return;const E=o.getBoundingClientRect(),v=window.innerWidth,w=window.innerHeight;Math.abs(E.left)>1||Math.abs(E.top)>1||Math.abs(E.width-v)>1||Math.abs(E.height-w)>1?(o.style.left=`${-E.left}px`,o.style.top=`${-E.top}px`,o.style.width=`${v}px`,o.style.height=`${w}px`):(o.style.left="0px",o.style.top="0px",o.style.width="100%",o.style.height="100%");}function g(){!n||!o||(o.classList.remove("is-open"),n=false,a&&(a(),a=null),document.removeEventListener("keydown",d),s?.(),s=null,setTimeout(()=>{o?.remove();},200));}function h(){n&&g(),r?.removeEventListener("click",c),a&&(a(),a=null),document.removeEventListener("keydown",d),s?.(),s=null,o?.remove(),o=null,r=null,i=null;}const x=p();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(x),requestAnimationFrame(f);const _=()=>f();return window.addEventListener("resize",_),s=()=>{window.removeEventListener("resize",_);},requestAnimationFrame(()=>{o?.classList.add("is-open"),n=true,u(),document.addEventListener("keydown",d);}),{root:x,close:g,destroy:h}}function jp(e={}){const{id:t,min:n=0,max:o=100,step:r=1,value:i=n,label:a,showValue:s=true,disabled:l=false,onInput:c,onChange:d}=e,u=m("div",{className:"slider"}),p=m("div",{className:"slider-row"}),f=m("div",{className:"slider-track"}),g=m("div",{className:"slider-range"});f.appendChild(g);const h=m("input",{id:t,type:"range",min:String(n),max:String(o),step:String(r),value:String(i),disabled:l});h.addEventListener("input",w=>{b(),c?.(S(),w);}),h.addEventListener("change",w=>d?.(S(),w));function x(){const w=o-n;return w===0?0:(S()-n)/w}function b(){const w=Math.max(0,Math.min(1,x()));g.style.width=`${w*100}%`,v&&(v.textContent=String(S()));}function C(w){h.value=String(w),b();}function S(){return Number(h.value)}function _(w){h.disabled=!!w;}let E=null,v=null;return a&&(E=m("span",{className:"slider-label"},a),p.appendChild(E)),f.appendChild(h),p.appendChild(f),s&&(v=m("span",{className:"slider-value"},String(i)),p.appendChild(v)),u.append(p),b(),{root:u,input:h,setValue:C,getValue:S,setDisabled:_}}const zg=`
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
`,iN={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},Gg={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},aN=220;function sN(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function lN(e){const t=sN();if(t){Pe(t,zg,"customSoundModal");return}const n=m("style");n.textContent=zg,e.appendChild(n);}function qy(e){const t={...iN,...e};let n=null,o=null,r=null,i=null,a=null,s=null,l=null,c=null,d=null,u=false,p=false,f=null;function g(){d?.(),d=null,c&&(c.pause(),c.currentTime=0),c=null,r?.setLabel("Play");}async function h(){if(c){g();return}if(!l)return;const P=de.getById(l.soundId);if(!P){console.error(`[CustomSoundModal] Sound not found: ${l.soundId}`);return}const R=new Audio(P.source);R.volume=l.volume/100,c=R;const O=()=>{g();},W=()=>{g(),console.error(`[CustomSoundModal] Failed to play sound: ${P.name}`);};R.addEventListener("ended",O),R.addEventListener("error",W),d=()=>{R.removeEventListener("ended",O),R.removeEventListener("error",W);};try{await R.play(),r?.setLabel("Stop");}catch(N){g(),console.error("[CustomSoundModal] Failed to play sound:",N);}}function x(){s&&l&&(s.textContent=Gg[l.mode]);}function b(){u||f!==null||(f=window.setTimeout(()=>{_();},aN));}function C(){u||p||(p=true,g(),t.onClose?.(),b());}function S(){u||(n?.close(),C());}function _(){u||(u=true,p=true,f!==null&&(window.clearTimeout(f),f=null),g(),o&&(o.destroy(),o=null),a&&(a.destroy(),a=null),i=null,r=null,s=null,l=null,n&&(n.destroy(),n=null));}function E(){const P=m("span",{className:"custom-sound-modal-title"});let R=false;if(e.spriteId)try{const W=Y.toCanvas(e.spriteId);if(W){const N=m("span",{className:"custom-sound-modal-title-icon"});W.className="custom-sound-modal-title-sprite",N.appendChild(W),P.appendChild(N),R=!0;}}catch{}if(!R&&e.icon){const W=m("span",{className:"custom-sound-modal-title-icon"},e.icon);P.appendChild(W);}const O=m("span",{className:"custom-sound-modal-title-text"},e.entityName);return P.appendChild(O),P}function v(){const P=m("div",{className:"custom-sound-modal-body"}),R=de.getItemCustomSound(e.entityType,e.entityId,e.shopType),O=de.getNotificationConfig(e.entityType);l=R?{soundId:R.soundId,volume:R.volume,mode:R.mode}:{soundId:O.soundId,volume:O.volume,mode:O.mode};const W=de.getAll().map(M=>({value:M.id,label:M.name})),N=m("div",{className:"custom-sound-modal-row"}),F=m("label",{className:"custom-sound-modal-label"},"Sound");N.appendChild(F);const G=m("div",{className:"custom-sound-modal-controls"});o=no({value:l.soundId,options:W,size:"sm",onChange:M=>{l&&(l.soundId=M),g();}}),G.appendChild(o.root),r=Ae({label:"Play",variant:"default",size:"sm",onClick:()=>h()}),G.appendChild(r),N.appendChild(G),P.appendChild(N);const B=m("div",{className:"custom-sound-modal-row"}),H=m("label",{className:"custom-sound-modal-label"},"Volume");B.appendChild(H),i=jp({min:0,max:100,step:1,value:l.volume,showValue:true,onChange:M=>{l&&(l.volume=M),c&&(c.volume=M/100);}}),B.appendChild(i.root),P.appendChild(B);const L=m("div",{className:"custom-sound-modal-row"}),$=m("label",{className:"custom-sound-modal-label"},"Mode");L.appendChild($);const A=m("div",{className:"custom-sound-modal-mode-controls"});return a=no({value:l.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:M=>{l&&(l.mode=M),x();}}),A.appendChild(a.root),s=m("div",{className:"custom-sound-modal-mode-description"},Gg[l.mode]),A.appendChild(s),L.appendChild(A),P.appendChild(L),P}function w(){const P=m("div",{className:"custom-sound-modal-footer"}),R=Ae({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),S();}});P.appendChild(R);const O=m("div",{style:"flex: 1"});P.appendChild(O);const W=Ae({label:"Cancel",variant:"default",size:"sm",onClick:()=>S()});P.appendChild(W);const N=Ae({label:"Save",variant:"primary",size:"sm",onClick:()=>{l&&e.onSave({...l}),S();}});return P.appendChild(N),P}const k=v(),y=w(),T=m("div");lN(T),T.appendChild(k),n=Hp({title:e.entityName||t.title,content:T,footer:y,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:C}),n.root.classList.add("custom-sound-modal");const I=n.root.querySelector(".modal-title");return I&&I.replaceChildren(E()),{root:n.root,close:S,destroy:_}}const cN=["seed","tool","egg","decor"],dN=new Set(cN);function $c(e){const[t,...n]=e.split(":");return !t||n.length===0||!dN.has(t)?null:{shopType:t,itemId:n.join(":")}}const uN=500,Hg=10,pN=800;function fN(e){const{rows:t}=e,n=new Map;let o=null,r=false;const i=new Map;let a=null,s=null,l=null,c=null,d=null,u=false;function p(A,M){M?A.classList.add("has-custom-sound"):A.classList.remove("has-custom-sound");}function f(A){const M=$c(A);return M?de.hasItemCustomSound("shop",M.itemId,M.shopType):false}function g(A){if(!o)return null;const M=o.root.querySelectorAll(".lg-tr-body");for(const X of M)if(X.dataset.id===A)return X;return null}function h(A,M){const X=g(A);if(!X)return;const U=M??f(A);p(X,U);}function x(){if(!o)return;o.root.querySelectorAll(".lg-tr-body").forEach(M=>{const X=M.dataset.id;X&&p(M,f(X));});}function b(){r||(r=true,requestAnimationFrame(()=>{r=false,x();}));}function C(A){i.clear();for(const M of A)i.set(`${M.shopType}:${M.id}`,M);}function S(A){const M=$c(A);return M?de.hasItemCustomSound("shop",M.itemId,M.shopType):false}function _(A){const M=$c(A);if(!M||!de.hasItemCustomSound("shop",M.itemId,M.shopType))return;de.removeItemCustomSound("shop",M.itemId,M.shopType);const X=i.get(A);X&&(X.hasCustomSound=false),h(A,false),b();}function E(){s!==null&&(window.clearTimeout(s),s=null),a=null;}function v(A){a=A,s!==null&&window.clearTimeout(s),s=window.setTimeout(()=>{s=null,a=null;},pN);}function w(){l!==null&&(window.clearTimeout(l),l=null),c=null,d=null,u=false;}if(o=cl({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(A,M)=>A.itemName.localeCompare(M.itemName,void 0,{numeric:true,sensitivity:"base"}),render:A=>{const M=m("div",{className:"shop-item-cell"}),X=m("div",{className:"shop-item-icon"});if(A.spriteId){const q=Y.toCanvas(A.spriteId);q?(q.className="shop-item-sprite",X.appendChild(q)):X.textContent=Dg[A.shopType];}else X.textContent=Dg[A.shopType];const U=m("div",{className:"shop-item-name"});return U.textContent=A.itemName,M.appendChild(X),M.appendChild(U),M}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(A,M)=>{const X=A.rarity?Fg[A.rarity.toLowerCase()]??999:999,U=M.rarity?Fg[M.rarity.toLowerCase()]??999:999;return X-U},render:A=>{const M=m("div",{className:"shop-item-rarity"}),X=Xi({variant:"rarity",rarity:A.rarity});return M.appendChild(X.root),M}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:A=>{const M=m("div",{className:"shop-item-notify"}),X=ag(A.id,A.shopType),U=_n({checked:A.isTracked,disabled:X,size:"sm",onChange:Z=>{A.isTracked=Z,Z?ao.addTrackedItem(A.shopType,A.id):ao.removeTrackedItem(A.shopType,A.id);}}),q=`${A.shopType}:${A.id}`;return n.set(q,U),M.appendChild(U.root),M}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:A=>`${A.shopType}:${A.id}`,onSortChange:()=>{b();},onRowClick:(A,M,X)=>{const U=`${A.shopType}:${A.id}`;if(a){if(a===U){E();return}E();}X.target.closest(".shop-item-notify")||qy({entityType:"shop",entityId:A.id,entityName:A.itemName,spriteId:A.spriteId,shopType:A.shopType,onSave:Z=>{Z===null?(de.removeItemCustomSound("shop",A.id,A.shopType),A.hasCustomSound=false,h(U,false)):(de.setItemCustomSound("shop",A.id,Z,A.shopType),A.hasCustomSound=true,h(U,true));}});}}),!o)throw new Error("[ShopsCard] Failed to create items table");C(t);const y=o.root,T=A=>{const M=A.target;if(M.closest(".shop-item-notify"))return;const U=M.closest(".lg-tr-body")?.dataset.id;!U||!S(U)||(A.preventDefault(),A.stopPropagation(),v(U),_(U));},I=A=>{if(A.pointerType==="mouse"||A.button!==0)return;const M=A.target;if(M.closest(".shop-item-notify"))return;const U=M.closest(".lg-tr-body")?.dataset.id;!U||!S(U)||(w(),c=U,d={x:A.clientX,y:A.clientY},l=window.setTimeout(()=>{l=null,c&&(u=true,v(c),_(c));},uN));},P=A=>{if(!d||!c||u)return;const M=A.clientX-d.x,X=A.clientY-d.y;M*M+X*X>Hg*Hg&&w();},R=()=>{w();},O=()=>{w();};y.addEventListener("contextmenu",T),y.addEventListener("pointerdown",I),y.addEventListener("pointermove",P),y.addEventListener("pointerup",R),y.addEventListener("pointercancel",O);const W=o.setData.bind(o);o.setData=A=>{C(A),W(A),b();},b();const N=A=>{for(const[M,X]of n.entries()){const[U,q]=M.split(":");if(A&&U!==A)continue;const Z=ag(q,U);X.setDisabled(Z);}},G=At().subscribeStable(()=>{N();}),B=sr(),H=B.subscribeDecorPlaced(()=>{N("decor");}),L=B.subscribeDecorRemoved(()=>{N("decor");}),$=o.destroy.bind(o);return o.destroy=()=>{G(),H(),L(),y.removeEventListener("contextmenu",T),y.removeEventListener("pointerdown",I),y.removeEventListener("pointermove",P),y.removeEventListener("pointerup",R),y.removeEventListener("pointercancel",O),w(),E(),n.clear(),i.clear(),$();},o}function gN(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function mN(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=m("div",{className:"select"});for(const d of Array.from(e.classList))d.startsWith("select--")&&r.classList.add(d);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const i=m("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=m("span",{className:"select-value"},t),l=m("span",{className:"select-caret"},a);i.append(s,l),r.appendChild(i),o.appendChild(r);const c=Math.ceil(i.getBoundingClientRect().width);return r.remove(),c}function hN(e,t){const n=gN(t);if(!n)return;let o=0;const r=6,i=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(i);return}const a=mN(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function bN(e){const t=lr(),n=t.get();let o=null,r=[],i=[];const a={selectedShopType:"all",searchQuery:""},s={shopTypeSelect:null,searchInput:null,tableHandle:null};let l=0,c=new Set;function d(x,b){if(x.size!==b.size)return  false;for(const C of x)if(!b.has(C))return  false;return  true}function u(){if(!s.tableHandle)return;const x=r.filter(b=>!(a.selectedShopType!=="all"&&b.shopType!==a.selectedShopType||a.searchQuery&&!b.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));i=x,s.tableHandle.setData(x);}function p(){const x=m("div",{className:"shops-card-filters"}),C=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(_=>({value:_,label:YR[_]}))];s.shopTypeSelect=no({value:"all",options:C,size:"sm",onChange:_=>{a.selectedShopType=_,u();}});const S=s.shopTypeSelect.root;return S.style.minWidth="0",S.style.width="auto",hN(S,C.map(_=>_.label)),s.searchInput=$i({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:_=>{a.searchQuery=_.trim(),u();}}),x.appendChild(s.shopTypeSelect.root),x.appendChild(s.searchInput.root),x}function f(){r=Bg(n),i=[...r],l=r.length,c=new Set(r.map(E=>E.shopType));const x=m("div");s.tableHandle=fN({rows:i});const b=p();x.appendChild(b),x.appendChild(s.tableHandle.root);const C=m("div",{className:"shops-card-hint"}),S=m("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),_=m("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return C.append(S,_),x.appendChild(C),o=Ee({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},x),o}function g(){const x=t.get(),b=Bg(x),C=b.length,S=new Set(b.map(E=>E.shopType));(C!==l||!d(S,c))&&(l=C,c=S,r=b,u());}function h(){if(s.tableHandle&&(s.tableHandle.destroy(),s.tableHandle=null),s.shopTypeSelect&&(s.shopTypeSelect.destroy(),s.shopTypeSelect=null),s.searchInput){const x=s.searchInput.root.__cleanup;x&&x(),s.searchInput=null;}o=null;}return {root:f(),refresh:g,destroy:h}}const xN=".mp3,.wav,.ogg,audio/*",yN=250*1024,vN=3;function wN(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function CN(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function SN(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function Ky(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function kN(e,t){const n=Ky(t);if(!n.length)return  true;const o=e.name.toLowerCase(),r=e.type.toLowerCase();return n.some(i=>{const a=i.toLowerCase();if(a.startsWith("."))return o.endsWith(a);if(a.endsWith("/*")){const s=a.slice(0,-1);return r.startsWith(s)}return r===a})}function _N(e){const n=Ky(e).map(o=>o.startsWith(".")?o.slice(1).toUpperCase():o.endsWith("/*")?"Audio":o.includes("/")&&o.split("/")[1]?.toUpperCase()||o.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function EN(e={}){const{id:t,className:n,label:o="Add sounds",hint:r,accept:i=xN,multiple:a=true,disabled:s=false,maxSizeBytes:l=yN,maxItems:c,emptyLabel:d="No sounds added yet",onItemsChange:u,onFilesAdded:p,onError:f}=e;let g=[],h=0,x=null,b=false,C=!!s,S=null,_=null,E=null;const v=new Map,w=new Map,k=Number.isFinite(c)?Math.max(1,Number(c)):a?Number.POSITIVE_INFINITY:1,y=m("div",{className:"sound-picker",id:t});n&&y.classList.add(...n.split(" ").filter(Boolean)),C&&y.classList.add("is-disabled");const T=m("div",{className:"sound-picker__header"}),I=m("div",{className:"sound-picker__label"},o),P=r??`${_N(i)} - Max ${SN(l)}`,R=m("div",{className:"sound-picker__hint"},P);T.append(I,R);const O=m("div",{className:"sound-picker__zone",role:"button",tabIndex:C?-1:0,"aria-disabled":String(C)}),W=m("div",{className:"sound-picker__zone-text"}),N=m("div",{className:"sound-picker__zone-title"},"Drop audio files here"),F=m("div",{className:"sound-picker__zone-subtitle"},"or click to browse");W.append(N,F);const G=Ae({label:a?"Choose files":"Choose file",size:"sm",onClick:z=>{z.preventDefault(),C||B.click();},disabled:C});G.classList.add("sound-picker__pick");const B=m("input",{className:"sound-picker__input",type:"file",accept:i,multiple:a?true:void 0,disabled:C,tabIndex:-1});O.append(W,G,B);const H=m("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),L=m("div",{className:"sound-picker__list",role:"list"});y.append(T,O,H,L);function $(z,Q="info"){const ee=z??"";H.textContent=ee,H.classList.toggle("is-error",Q==="error");}function A(z){f?.(z),$(z.message,"error");}function M(){for(const z of v.values())try{z.destroy();}catch{}v.clear();}function X(z){const Q=w.get(z.id);if(Q)return Q;const ee=z.file.__sourceUrl;if(ee)return w.set(z.id,ee),ee;const re=URL.createObjectURL(z.file);return w.set(z.id,re),re}function U(z){const Q=w.get(z);Q&&(Q.startsWith("blob:")&&URL.revokeObjectURL(Q),w.delete(z));}function q(){E?.(),E=null,S&&(S.pause(),S.currentTime=0),S=null,_=null;}function Z(){L.querySelectorAll(".sound-picker__item").forEach(Q=>{const ee=Q.dataset.id,re=Q.querySelector(".sound-picker__item-btn--play");if(!ee||!re)return;const te=!!S&&_===ee&&!S.paused;re.textContent=te?"Stop":"Play",Q.classList.toggle("is-playing",te);});}function Ce(z){if(C)return;if(_===z.id){q(),Z();return}q();const Q=X(z),ee=new Audio(Q);S=ee,_=z.id;const re=()=>{_===z.id&&(q(),Z());},te=()=>{_===z.id&&(q(),Z(),A({code:"type",file:z.file,message:`Unable to play ${z.name}`}));};ee.addEventListener("ended",re),ee.addEventListener("error",te),E=()=>{ee.removeEventListener("ended",re),ee.removeEventListener("error",te);},ee.play().then(()=>{Z();}).catch(()=>{q(),Z(),A({code:"type",file:z.file,message:`Unable to play ${z.name}`});});}function Ie(){if(M(),L.classList.toggle("is-scrollable",g.length>vN),!g.length){const Q=m("div",{className:"sound-picker__empty"});Q.append(typeof d=="string"?document.createTextNode(d):d),L.replaceChildren(Q);return}const z=g.map(Q=>mo(Q));if(L.replaceChildren(...z),x){const Q=v.get(x);Q&&requestAnimationFrame(()=>Q.focus());}Z();}function mo(z){const Q=x===z.id,ee=m("div",{className:"sound-picker__item",role:"listitem","data-id":z.id}),re=m("div",{className:"sound-picker__item-top"});m("div",{className:"sound-picker__item-bottom"});const te=m("div",{className:"sound-picker__item-name"});if(Q&&!C){const me=Oi({value:z.name,blockGameKeys:true,onEnter:Te=>{In(z.id,Te);}});me.root.classList.add("sound-picker__rename"),me.input.classList.add("input--sm"),me.input.setAttribute("aria-label","Rename sound"),me.input.addEventListener("keydown",Te=>{Te.key==="Escape"&&(Te.preventDefault(),fr());}),me.input.addEventListener("blur",()=>{if(b){b=false;return}In(z.id,me.getValue());}),v.set(z.id,me),te.appendChild(me.root);}else {const me=m("div",{className:"sound-picker__item-label",title:z.name},z.name);te.appendChild(me);}const ae=m("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(Q&&!C){const me=m("button",{className:"sound-picker__item-btn",type:"button",disabled:C},"Save");me.addEventListener("click",()=>{const he=v.get(z.id);In(z.id,he?.getValue()??z.name);});const Te=m("button",{className:"sound-picker__item-btn",type:"button",disabled:C},"Cancel");Te.addEventListener("pointerdown",()=>{b=true;}),Te.addEventListener("click",()=>fr()),ae.append(me,Te);}else {const me=m("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:C},_===z.id?"Stop":"Play");me.addEventListener("click",()=>Ce(z));const Te=m("button",{className:"sound-picker__item-btn",type:"button",disabled:C},"Rename");Te.addEventListener("click",()=>{C||(x=z.id,Ie());});const he=m("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:C},"Remove");he.addEventListener("click",()=>gr(z.id)),ae.append(me,Te,he);}return re.append(te,ae),ee.append(re),ee}function an(){return g.slice()}function Ut(z){const Q=z.slice(),ee=new Set(Q.map(re=>re.id));for(const re of Array.from(w.keys()))ee.has(re)||U(re);_&&!ee.has(_)&&q(),g=Q,x=null,Ie(),u?.(an());}function ho(z){if(C)return;const Q=Array.from(z??[]);if(!Q.length)return;const ee=[],re=[];for(const he of Q){if(i&&!kN(he,i)){re.push({code:"type",file:he,message:`Unsupported file type: ${he.name}`});continue}if(Number.isFinite(l)&&he.size>l){re.push({code:"size",file:he,maxSizeBytes:l,message:`File too large: ${he.name}`});continue}ee.push({id:wN(),file:he,name:CN(he),size:he.size,type:he.type});}if(!ee.length){re.length&&A(re[0]);return}const te=a?g.slice():[],ae=Number.isFinite(k)?Math.max(0,k-te.length):ee.length;if(ae<=0){A({code:"limit",message:`Maximum of ${Math.max(1,k)} files reached`});return}const me=ee.slice(0,ae),Te=a?te.concat(me):me.slice(0,1);Ut(Te),$(null),p?.(me.slice()),re.length&&A(re[0]);}function oa(z,Q){const ee=Q.trim();if(!ee){A({code:"name",message:"Name cannot be empty"});return}const re=g.map(te=>te.id===z?{...te,name:ee}:te);Ut(re),$(null);}function In(z,Q){const ee=Q.trim();if(!ee){A({code:"name",message:"Name cannot be empty"});return}oa(z,ee);}function fr(){x=null,$(null),Ie();}function gr(z){const Q=g.filter(ee=>ee.id!==z);Ut(Q),$(null);}function Pn(){q(),Ut([]),$(null);}function Xl(z){C=!!z,y.classList.toggle("is-disabled",C),O.setAttribute("aria-disabled",String(C)),O.tabIndex=C?-1:0,B.disabled=C,G.setDisabled(C),C&&q(),Ie();}function ra(){C||B.click();}const Ln=z=>{if(C)return;const Q=z.target;Q&&Q.closest(".sound-picker__pick")||B.click();},Mn=z=>{C||(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),B.click());},ia=z=>{C||!z.dataTransfer||!z.dataTransfer.types.includes("Files")||(z.preventDefault(),h+=1,O.classList.add("is-dragover"));},aa=z=>{C||!z.dataTransfer||!z.dataTransfer.types.includes("Files")||(z.preventDefault(),z.dataTransfer.dropEffect="copy");},sa=z=>{C||O.classList.contains("is-dragover")&&(z.preventDefault(),h=Math.max(0,h-1),h<=0&&(h=0,O.classList.remove("is-dragover")));},la=z=>{C||!z.dataTransfer||!z.dataTransfer.files.length||(z.preventDefault(),h=0,O.classList.remove("is-dragover"),ho(z.dataTransfer.files));},oe=()=>{if(C){B.value="";return}B.files&&ho(B.files),B.value="";};return O.addEventListener("click",Ln),O.addEventListener("keydown",Mn),O.addEventListener("dragenter",ia),O.addEventListener("dragover",aa),O.addEventListener("dragleave",sa),O.addEventListener("drop",la),B.addEventListener("change",oe),Ie(),{root:y,getItems:an,setItems:Ut,addFiles:ho,renameItem:oa,removeItem:gr,clear:Pn,setDisabled:Xl,openPicker:ra,setStatus:$,destroy(){M(),q();for(const z of Array.from(w.keys()))U(z);O.removeEventListener("click",Ln),O.removeEventListener("keydown",Mn),O.removeEventListener("dragenter",ia),O.removeEventListener("dragover",aa),O.removeEventListener("dragleave",sa),O.removeEventListener("drop",la),B.removeEventListener("change",oe),y.remove();}}}const jg={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function TN(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function AN(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=m("div",{className:"select"});for(const d of Array.from(e.classList))d.startsWith("select--")&&r.classList.add(d);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const i=m("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=m("span",{className:"select-value"},t),l=m("span",{className:"select-caret"},a);i.append(s,l),r.appendChild(i),o.appendChild(r);const c=Math.ceil(i.getBoundingClientRect().width);return r.remove(),c}function IN(e,t){const n=TN(t);if(!n)return;let o=0;const r=6,i=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(i);return}const a=AN(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function PN(e){let t=null,n=null,o=null;const r=new Map,i=new Map,a=new Map;let s=null,l=null,c=null;function d(){c?.(),c=null,s&&(s.pause(),s.currentTime=0),s=null,l=null;}function u(){if(!o)return;o.querySelectorAll(".notification-item").forEach(v=>{const w=v.dataset.type,k=v.querySelector(".notification-item-play");if(!w||!k)return;const y=!!s&&l===w&&!s.paused;k.textContent=y?"Stop":"Play",v.classList.toggle("is-playing",y);});}async function p(E){if(l===E){d(),u();return}d();const v=de.getNotificationConfig(E),w=de.getById(v.soundId);if(!w){console.error(`[SettingCard] Sound not found: ${v.soundId}`);return}const k=new Audio(w.source);k.volume=v.volume/100,s=k,l=E;const y=()=>{l===E&&(d(),u());},T=()=>{l===E&&(d(),u(),console.error(`[SettingCard] Failed to play sound: ${w.name}`));};k.addEventListener("ended",y),k.addEventListener("error",T),c=()=>{k.removeEventListener("ended",y),k.removeEventListener("error",T);};try{await k.play(),u();}catch(I){d(),u(),console.error("[SettingCard] Failed to play sound:",I);}}function f(E,v){if(E.startsWith("data:"))try{const w=E.split(","),k=w[0].match(/:(.*?);/)?.[1]||"audio/mpeg",y=atob(w[1]),T=y.length,I=new Uint8Array(T);for(let P=0;P<T;P++)I[P]=y.charCodeAt(P);return new File([I],v,{type:k})}catch(w){return console.error("[SettingCard] Failed to convert data URL to File:",w),new File([],v,{type:"audio/mpeg"})}return new File([],v,{type:"audio/mpeg"})}function g(){const v=de.getAll().map(w=>({value:w.id,label:w.name}));for(const[w,k]of r){const y=de.getNotificationConfig(w);k.setOptions(v),k.setValue(y.soundId);}}function h(E,v,w){const k=m("div",{className:"notification-item","data-type":E}),y=m("div",{className:"notification-item-label"},v);k.appendChild(y);const T=m("div",{className:"notification-item-description"},w);k.appendChild(T);const I=m("div",{className:"notification-item-controls"}),P=de.getNotificationConfig(E),O=de.getAll().map($=>({value:$.id,label:$.name})),W=no({value:P.soundId,options:O,size:"sm",onChange:$=>{const A=de.getNotificationConfig(E);de.setNotificationConfig(E,{soundId:$,volume:A.volume,mode:A.mode});}});r.set(E,W);const N=m("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");N.addEventListener("click",()=>{p(E);}),I.appendChild(W.root),I.appendChild(N),k.appendChild(I);const F=jp({min:0,max:100,step:1,value:P.volume,showValue:true,onChange:$=>{const A=de.getNotificationConfig(E);de.setNotificationConfig(E,{soundId:A.soundId,volume:$,mode:A.mode});}});a.set(E,F),k.appendChild(F.root);const G=m("div",{className:"notification-mode-row"}),B=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],H=no({value:P.mode,options:B,size:"sm",onChange:$=>{const A=de.getNotificationConfig(E);de.setNotificationConfig(E,{soundId:A.soundId,volume:A.volume,mode:$}),x(E);}});i.set(E,H),H.root.classList.add("shrink"),IN(H.root,B.map($=>$.label)),G.appendChild(H.root);const L=m("div",{className:"notification-mode-description"},jg[E][P.mode]);return G.appendChild(L),k.appendChild(G),k}function x(E){if(!o)return;const v=o.querySelector(`[data-type="${E}"]`);if(!v)return;const w=de.getNotificationConfig(E),k=v.querySelector(".notification-mode-description");k&&(k.textContent=jg[E][w.mode]);}function b(){const E=m("div",{className:"alerts-settings-body"});de.init(),o=m("div",{className:"notification-settings"}),o.appendChild(h("shop","Shops restock","Default sound for shop restock alerts")),o.appendChild(h("pet","Pet events","Default sound for pet event alerts")),o.appendChild(h("weather","Weather events","Default sound for weather event alerts")),E.appendChild(o);const v=m("div",{className:"alerts-settings-divider"});E.appendChild(v);const w=de.getAll().map(k=>{const y=f(k.source,k.name);return y.__sourceUrl=k.source,{id:k.id,file:y,name:k.name,size:0,type:k.type}});return n=EN({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:Yo.MAX_SOUNDS,maxSizeBytes:Yo.MAX_SIZE_BYTES,multiple:true,onItemsChange:k=>{C(k),g();},onFilesAdded:k=>{S(k),setTimeout(()=>{g();},100);}}),n.setItems(w),E.appendChild(n.root),t=Ee({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},E),t}function C(E){const v=new Set(de.getAll().map(y=>y.id)),w=new Set(E.map(y=>y.id)),k=[];for(const y of v)if(!w.has(y)){k.push(y);try{de.remove(y);}catch(T){console.error(`[SettingCard] Failed to remove sound ${y}:`,T);}}if(k.length>0){const y=["shop","pet","weather"];for(const T of y){const I=de.getNotificationConfig(T);if(k.includes(I.soundId)){de.setNotificationConfig(T,{soundId:"default-notification",volume:I.volume,mode:I.mode});const P=a.get(T);P&&P.setValue(I.volume);}}}for(const y of E)if(v.has(y.id)){const T=de.getById(y.id);if(T&&T.name!==y.name)try{de.update(y.id,{name:y.name});}catch(I){console.error(`[SettingCard] Failed to rename sound ${y.id}:`,I);}}}function S(E){for(const v of E)if(!de.getById(v.id)){const w=new FileReader;w.onload=k=>{const y=k.target?.result;try{const T=de.add(v.name,y,"upload");if(n&&T.id!==v.id){const I=n.getItems().map(P=>P.id===v.id?{...P,id:T.id}:P);n.setItems(I);}}catch(T){console.error(`[SettingCard] Failed to add sound ${v.name}:`,T);}},w.onerror=()=>{console.error(`[SettingCard] Failed to read file ${v.name}`);},w.readAsDataURL(v.file);}}function _(){d(),n&&(n.destroy(),n=null);for(const E of r.values())E.destroy();r.clear();for(const E of i.values())E.destroy();i.clear(),a.clear(),t=null;}return {root:b(),destroy:_}}function LN(e){try{const t=J.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function MN(e){try{const t=J.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function RN(e){try{const t=J.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const o=n.mutator;if(!o||typeof o!="object")return "No effects";const r=o.mutation;if(!r)return "No effects";const i=J.get("mutations");if(!i||typeof i!="object")return r;const a=i[r];return !a||typeof a!="object"?r:a.name||r}catch{return "No effects"}}function Ug(){const e=J.get("weather");if(!e||typeof e!="object")return [];const t=tr.getTrackedWeathers(),n=new Set(t),o=[];for(const r of Object.keys(e)){if(r==="Sunny")continue;const i={weatherId:r,weatherName:LN(r),spriteId:MN(r),effects:RN(r),isTracked:n.has(r),hasCustomSound:de.hasItemCustomSound("weather",r)};o.push(i);}return o.sort((r,i)=>r.weatherName.localeCompare(i.weatherName)),o}const NN=500,Wg=10,ON=800;function $N(e){const{rows:t}=e;let n=null,o=false;const r=new Map;let i=null,a=null,s=null,l=null,c=null,d=false;function u(N,F){F?N.classList.add("has-custom-sound"):N.classList.remove("has-custom-sound");}function p(N){return de.hasItemCustomSound("weather",N)}function f(N){if(!n)return null;const F=n.root.querySelectorAll(".lg-tr-body");for(const G of F)if(G.dataset.id===N)return G;return null}function g(N,F){const G=f(N);if(!G)return;const B=F??p(N);u(G,B);}function h(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(F=>{const G=F.dataset.id;G&&u(F,p(G));});}function x(){o||(o=true,requestAnimationFrame(()=>{o=false,h();}));}function b(N){r.clear();for(const F of N)r.set(F.weatherId,F);}function C(N){return de.hasItemCustomSound("weather",N)}function S(N){if(!de.hasItemCustomSound("weather",N))return;de.removeItemCustomSound("weather",N);const F=r.get(N);F&&(F.hasCustomSound=false),g(N,false),x();}function _(){a!==null&&(window.clearTimeout(a),a=null),i=null;}function E(N){i=N,a!==null&&window.clearTimeout(a),a=window.setTimeout(()=>{a=null,i=null;},ON);}function v(){s!==null&&(window.clearTimeout(s),s=null),l=null,c=null,d=false;}if(n=cl({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(N,F)=>N.weatherName.localeCompare(F.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:N=>{const F=m("div",{className:"weather-item-cell"}),G=m("div",{className:"weather-item-icon"});if(N.spriteId){const H=Y.toCanvas(N.spriteId);H?(H.className="weather-item-sprite",G.appendChild(H)):G.textContent=Vg(N.weatherId);}else G.textContent=Vg(N.weatherId);const B=m("div",{className:"weather-item-name"});return B.textContent=N.weatherName,F.appendChild(G),F.appendChild(B),F}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:N=>{const F=m("div",{className:"weather-item-effects"});return F.textContent=N.effects,F}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:N=>{const F=m("div",{className:"weather-item-notify"}),G=_n({checked:N.isTracked,disabled:false,size:"sm",onChange:B=>{N.isTracked=B,B?tr.addTrackedWeather(N.weatherId):tr.removeTrackedWeather(N.weatherId);}});return F.appendChild(G.root),F}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:N=>N.weatherId,onSortChange:()=>{x();},onRowClick:(N,F,G)=>{const B=N.weatherId;if(i){if(i===B){_();return}_();}G.target.closest(".weather-item-notify")||qy({entityType:"weather",entityId:N.weatherId,entityName:N.weatherName,spriteId:N.spriteId,onSave:L=>{L===null?(de.removeItemCustomSound("weather",N.weatherId),N.hasCustomSound=false,g(B,false)):(de.setItemCustomSound("weather",N.weatherId,L),N.hasCustomSound=true,g(B,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");b(t);const k=n.root,y=N=>{const F=N.target;if(F.closest(".weather-item-notify"))return;const B=F.closest(".lg-tr-body")?.dataset.id;!B||!C(B)||(N.preventDefault(),N.stopPropagation(),E(B),S(B));},T=N=>{if(N.pointerType==="mouse"||N.button!==0)return;const F=N.target;if(F.closest(".weather-item-notify"))return;const B=F.closest(".lg-tr-body")?.dataset.id;!B||!C(B)||(v(),l=B,c={x:N.clientX,y:N.clientY},s=window.setTimeout(()=>{s=null,l&&(d=true,E(l),S(l));},NN));},I=N=>{if(!c||!l||d)return;const F=N.clientX-c.x,G=N.clientY-c.y;F*F+G*G>Wg*Wg&&v();},P=()=>{v();},R=()=>{v();};k.addEventListener("contextmenu",y),k.addEventListener("pointerdown",T),k.addEventListener("pointermove",I),k.addEventListener("pointerup",P),k.addEventListener("pointercancel",R);const O=n.setData.bind(n);n.setData=N=>{b(N),O(N),x();},x();const W=n.destroy.bind(n);return n.destroy=()=>{k.removeEventListener("contextmenu",y),k.removeEventListener("pointerdown",T),k.removeEventListener("pointermove",I),k.removeEventListener("pointerup",P),k.removeEventListener("pointercancel",R),v(),_(),r.clear(),W();},n}function Vg(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function DN(e){let t=null,n=[];const o={tableHandle:null};let r=0;function i(){n=Ug(),r=n.length;const l=m("div");o.tableHandle=$N({rows:n}),l.appendChild(o.tableHandle.root);const c=m("div",{className:"weather-card-hint"}),d=m("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),u=m("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return c.append(d,u),l.appendChild(c),t=Ee({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},l),t}function a(){const l=Ug(),c=l.length;c!==r&&(r=c,n=l,o.tableHandle?.setData(l));}function s(){o.tableHandle&&(o.tableHandle.destroy(),o.tableHandle=null),t=null;}return {root:i(),refresh:a,destroy:s}}function FN(e){let t=null,n=null;function o(){const i=m("div",{className:"pet-card-body"}),a=m("div",{className:"pet-card-row"}),s=du({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=_n({checked:Ri.isEnabled(),onChange:l=>{Ri.setEnabled(l);}}),a.appendChild(s.root),a.appendChild(n.root),i.appendChild(a),t=Ee({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},i),t}function r(){n&&(n.destroy(),n=null),t=null;}return {root:o(),destroy:r}}class BN extends nn{constructor(){super({id:"tab-alerts",label:"Alerts"});j(this,"sectionElement",null);j(this,"state",null);j(this,"settingCard",null);j(this,"shopsCard",null);j(this,"weatherCard",null);j(this,"petCard",null);}async build(n){this.state=await XR();const o=n.getRootNode();Pe(o,KR,"alerts-styles");const r=this.createGrid("12px");r.id="alerts-section",this.sectionElement=r;const{MGData:i}=await bt(async()=>{const{MGData:c}=await Promise.resolve().then(()=>rp);return {MGData:c}},void 0),a=["plants","items","eggs","decor","weather","mutations"],s=await Promise.allSettled(a.map(c=>i.waitFor(c))),l=a.filter((c,d)=>s[d]?.status==="rejected");l.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",l.join(", ")),this.buildParts(),n.appendChild(r);}render(n){const o=this.shopsCard,r=this.weatherCard,i=this.petCard,a=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=o,this.weatherCard=r,this.petCard=i,this.settingCard=a;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=bN({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:o=>this.state.setCardExpanded("shops",o)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=FN({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:o=>this.state.setCardExpanded("pet",o)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=DN({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:o=>this.state.setCardExpanded("weather",o)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=PN({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:o=>this.state.setCardExpanded("settings",o)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const zN={Store:{select:xe.select.bind(xe),set:xe.set.bind(xe),subscribe:xe.subscribe.bind(xe),subscribeImmediate:xe.subscribeImmediate.bind(xe)},Globals:fe,Modules:{Version:hu,Assets:lo,Manifest:Jt,Data:J,Environment:Je,CustomModal:Mo,Sprite:Y,Tile:tn,Pixi:yl,Audio:Oe,Cosmetic:Ku,Calculators:mb,ShopActions:Un},Features:{AutoFavorite:Eb,Journal:He,BulkFavorite:Td,Achievements:MI,Tracker:tR,AntiAfk:$o,Pets:nR,PetTeam:pe,XPTracker:Pd,CropValueIndicator:fs,CropSizeIndicator:hs,ShopNotifier:ao,WeatherNotifier:tr,PetHungerNotifier:Ri,AriesAPI:tl,HarvestLocker:tt,EggLocker:vn,DecorLocker:wn},WebSocket:{chat:f_,emote:g_,wish:m_,kickPlayer:h_,setPlayerData:Sl,usurpHost:b_,reportSpeakingStart:x_,setSelectedGame:y_,voteForGame:v_,requestGame:w_,restartGame:C_,ping:S_,checkWeatherStatus:E_,move:k_,playerPosition:rb,teleport:__,moveInventoryItem:T_,dropObject:A_,pickupObject:I_,toggleFavoriteItem:kl,putItemInStorage:zu,retrieveItemFromStorage:Gu,moveStorageItem:P_,logItems:L_,plantSeed:M_,waterPlant:R_,harvestCrop:N_,sellAllCrops:O_,purchaseDecor:Hu,purchaseEgg:ju,purchaseTool:Uu,purchaseSeed:Wu,plantEgg:$_,hatchEgg:D_,plantGardenPlant:F_,potPlant:B_,mutationPotion:z_,pickupDecor:G_,placeDecor:H_,removeGardenObject:j_,placePet:ib,feedPet:U_,petPositions:W_,swapPet:ab,storePet:sb,namePet:V_,sellPet:q_},_internal:{getGlobals:Wt,initGlobals:yb,destroyGlobals:PT}};function GN(){const e=V;e.Gemini=zN,e.MGSprite=Y,e.MGData=J,e.MGPixi=yl,e.MGAssets=lo,e.MGEnvironment=Je;}const HN={lastSelectedSlot:"bottom"};async function jN(){const e=await En("tab-avatar-ui",{version:1,defaults:HN}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const o=e.get();t.forEach(r=>r(o));},subscribe:n=>(t.push(n),()=>{const o=t.indexOf(n);o!==-1&&t.splice(o,1);})}}const qg=`
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
`;class UN extends nn{constructor(){super({id:"tab-avatar",label:"Avatar"});j(this,"previewOutfit",{top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png"});j(this,"previewContainer",null);j(this,"menuContainer",null);j(this,"menuCard",null);j(this,"loadoutsContainer",null);j(this,"currentSlot",null);j(this,"uiState",null);j(this,"cleanups",[]);}async build(n){const[o,r,i]=await Promise.all([Bu(),jN(),bi().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"}))]);this.uiState=r,this.previewOutfit={top:i.top,mid:i.mid,bottom:i.bottom,expression:i.expression},e_().catch(S=>console.warn("[AvatarSection] Discovery failed:",S)),fn.init();const a=this.createContainer("avatar-section"),s=n.getRootNode();if(s instanceof ShadowRoot)Pe(s,qg,"avatar-section-styles");else {const S=m("style");S.textContent=qg,a.appendChild(S);}n.appendChild(a);const l=m("div",{className:"avatar-main-layout"});a.appendChild(l);const c=m("div",{className:"avatar-slots-column"});l.appendChild(c),[{label:"Expression",key:"expression"},{label:"Top (Hat)",key:"top"},{label:"Mid (Face)",key:"mid"},{label:"Bottom (Outfit)",key:"bottom"}].forEach(S=>{const _=Ae({label:S.label,fullWidth:true,size:"sm",onClick:()=>this.showMenu(S.key)});c.appendChild(_);});const u=m("div",{className:"avatar-action-group"});c.appendChild(u);const p=Ae({label:"Apply to World",variant:"primary",fullWidth:true,onClick:async()=>{p.setLoading(true),await qu(this.previewOutfit),p.setLoading(false),p.setLabel("Success!"),setTimeout(()=>p.setLabel("Apply to World"),2e3);}});u.appendChild(p);const f=Ae({label:"Reset",variant:"danger",fullWidth:true,size:"sm",onClick:async()=>{await cb();const S=await bi();this.previewOutfit={...S},this.updatePreview();}});u.appendChild(f);const g=m("div",{className:"avatar-preview-area"});l.appendChild(g);const h=Ee({title:"Live Preview",variant:"soft"});this.previewContainer=m("div",{className:"avatar-preview-box"}),h.querySelector(".card-body")?.appendChild(this.previewContainer),g.appendChild(h),this.updatePreview(),this.menuCard=Ee({title:"Select Item",variant:"outline"}),this.menuCard.className+=" avatar-selection-area",this.menuContainer=m("div",{className:"avatar-items-grid"}),this.menuCard.querySelector(".card-body")?.appendChild(this.menuContainer),this.menuCard.style.display="none",a.appendChild(this.menuCard);const x=m("div",{className:"avatar-loadouts-area"});a.appendChild(x);const b=m("div",{className:"loadout-header-row"});x.appendChild(b),b.appendChild(m("h3",{className:"loadout-title"},"Saved Outfits"));const C=Ae({label:"+ Save Current",size:"sm",onClick:()=>this.handleSaveCurrent()});b.appendChild(C),this.loadoutsContainer=m("div",{className:"avatar-loadouts-grid"}),x.appendChild(this.loadoutsContainer),this.cleanups.push(fn.subscribe(()=>this.renderLoadouts())),this.renderLoadouts();}updatePreview(){if(!this.previewContainer)return;this.previewContainer.innerHTML="";const n=hi();[{f:this.previewOutfit.bottom,z:1},{f:this.previewOutfit.mid,z:2},{f:this.previewOutfit.top,z:3},{f:this.previewOutfit.expression,z:4}].forEach(r=>{const i=r.f===fd;if(!r.f||r.f.includes("_Blank.png")||i)return;const a=m("img",{src:`${n}${r.f}`,className:"avatar-preview-layer",style:{zIndex:String(r.z)},onerror:()=>a.style.display="none"});this.previewContainer.appendChild(a);});}async showMenu(n){if(!this.menuContainer||!this.menuCard)return;this.currentSlot=n;const o={top:"Top",mid:"Mid",bottom:"Bottom",expression:"Expression"},r=await tb({type:o[n]});this.menuContainer.innerHTML="",this.menuCard.style.display="block";const i=this.menuCard.querySelector(".card-title");i&&(i.textContent=`Selection: ${o[n]} (${r.length-1} variants)`),r.forEach(a=>{const s=this.previewOutfit[n]===a.filename,l=a.displayName==="None",c=m("div",{className:`avatar-item-btn ${s?"active":""}`,"data-filename":a.filename||"null",onclick:()=>this.selectItem(a)});if(l)c.appendChild(m("div",{className:"none-placeholder"},"∅"));else {const d=m("img",{src:a.url,className:"avatar-item-img",onerror:()=>d.style.display="none"});c.appendChild(d);}c.appendChild(m("div",{className:"avatar-item-label"},l?"None":a.displayName)),this.menuContainer.appendChild(c);}),this.menuCard.scrollIntoView({behavior:"smooth",block:"start"});}selectItem(n){!this.currentSlot||!this.menuContainer||(this.previewOutfit[this.currentSlot]=n.filename,this.updatePreview(),this.menuContainer.querySelectorAll(".avatar-item-btn").forEach(o=>{const r=o.getAttribute("data-filename")===(n.filename||"null");o.classList.toggle("active",r);}));}renderLoadouts(){if(!this.loadoutsContainer)return;this.loadoutsContainer.innerHTML="";const n=fn.get();if(n.length===0){this.loadoutsContainer.innerHTML='<div style="grid-column: 1/-1; opacity: 0.5; text-align: center; padding: 20px;">No outfits saved yet.</div>';return}n.forEach(o=>{const r=m("div",{className:"loadout-card"}),i=m("div",{className:"loadout-mini-preview"}),a=hi();[{f:o.bottom,z:1},{f:o.mid,z:2},{f:o.top,z:3},{f:o.expression,z:4}].forEach(p=>{const f=p.f===fd;if(!p.f||p.f.includes("_Blank.png")||f)return;const g=m("img",{src:`${a}${p.f}`,className:"loadout-mini-layer",style:{zIndex:String(p.z)},onerror:()=>g.style.display="none"});i.appendChild(g);}),r.appendChild(i);const l=m("div",{className:"loadout-header"}),c=Oi({value:o.name,placeholder:"Unnamed Outfit",mode:"alphanumeric",allowSpaces:true,maxLength:24,blockGameKeys:true,onChange:p=>{fn.rename(o.id,p);}});c.input.addEventListener("keydown",p=>p.stopPropagation(),true),c.input.addEventListener("keyup",p=>p.stopPropagation(),true),c.input.addEventListener("keypress",p=>p.stopPropagation(),true),c.root.classList.add("loadout-name-input"),l.appendChild(c.root);const d=m("div",{className:"icon-btn",onclick:p=>{p.stopPropagation(),confirm("Delete this outfit?")&&fn.delete(o.id);}},"🗑️");l.appendChild(d),r.appendChild(l);const u=Ae({label:"Wear",size:"sm",fullWidth:true,onClick:async()=>{u.setLoading(true),await fn.wear(o.id),this.previewOutfit={top:o.top,mid:o.mid,bottom:o.bottom,expression:o.expression},this.updatePreview(),u.setLoading(false);}});r.appendChild(u),this.loadoutsContainer.appendChild(r);});}async handleSaveCurrent(){await fn.save("",this.previewOutfit),setTimeout(()=>{if(!this.loadoutsContainer)return;const n=this.loadoutsContainer.querySelectorAll(".loadout-card"),r=n[n.length-1]?.querySelector("input");r&&(r.focus(),r.select());},100);}async destroy(){this.cleanups.forEach(n=>n()),this.cleanups=[],super.destroy();}}const Jd={ui:{expandedCards:{public:true}}};async function WN(){const e=await En("tab-room",{version:1,defaults:Jd,sanitize:r=>({ui:{expandedCards:qo(Jd.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:qo(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}const VN=`
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
`;function qN(e){return /^I-\d+-GC-\d+-\d+$/.test(e)?"discord":"web"}function KN(e){const t=m("span",{className:`rooms-list__badge rooms-list__badge--${e}`});return t.textContent=e==="discord"?"Discord":"Web",t}function XN(e,t=16){return e.length<=t?e:`${e.slice(0,t)}...`}function YN(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,e}function JN(e,t){const n=t==="all"?e:e.filter(o=>o.playerCount<o.maxPlayers);switch(t){case "5-6":return n.filter(o=>o.playerCount>=5);case "4":return n.filter(o=>o.playerCount===4);case "1-3":return n.filter(o=>o.playerCount>=1&&o.playerCount<=3);default:return n}}function QN(e){const t=l=>l.toString().padStart(2,"0"),n=t(e.getHours()),o=t(e.getMinutes()),r=t(e.getSeconds()),i=t(e.getDate()),a=t(e.getMonth()+1),s=e.getFullYear();return `${i}/${a}/${s} ${n}:${o}:${r}`}function ZN(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 50 50"),e.setAttribute("width","50"),e.setAttribute("height","50"),e.innerHTML=`
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `,e}function eO(e={}){const{rooms:t=[],onJoinRoom:n,onCopyRoomId:o,onRefresh:r,emptyMessage:i="No rooms available",joinEnabled:a=false,initialFilter:s="5-6",onFilterChange:l}=e;let c=s,d=t;const u=m("div",{className:"rooms-list"}),p=m("style");p.textContent=VN,u.appendChild(p);const f=m("div",{className:"rooms-list__header-bar"}),h=no({options:[{value:"5-6",label:"5-6 players"},{value:"4",label:"4 players"},{value:"1-3",label:"1-3 players"},{value:"all",label:"All"}],value:s,onChange:R=>{c=R,l?.(c),I(d);}});f.appendChild(h.root);const x=Ae({label:"Refresh rooms",variant:"default",size:"sm",iconLeft:"",onClick:()=>{r?.();}});f.appendChild(x),u.appendChild(f);const b=m("div",{style:"position: relative;"}),C=m("div",{className:"rooms-list__container"});b.appendChild(C);const S=m("div",{className:"rooms-list__loading-overlay"});S.style.display="none";const _=ZN();S.appendChild(_),b.appendChild(S),u.appendChild(b);const E=m("div",{className:"rooms-list__footer"}),v=m("div",{className:"rooms-list__aries-badge"});v.textContent="Powered by Aries",E.appendChild(v);const w=m("div",{className:"rooms-list__timestamp"});w.style.display="none",E.appendChild(w),u.appendChild(E);const k=[h,{remove:()=>x.remove()}],y=[];function T(R){const O=qN(R.id),W=m("div",{className:"rooms-list__item"}),N=m("div",{className:"rooms-list__top-row"}),F=KN(O);N.appendChild(F);const G=m("span",{className:"rooms-list__id"});G.textContent=XN(R.id,20),G.title=R.id,N.appendChild(G);const B=YN(),H=m("button",{className:"rooms-list__copy-btn"});H.type="button",H.title="Copy room ID",H.appendChild(B),H.addEventListener("click",q=>{q.stopPropagation(),o?.(R.id);}),N.appendChild(H),W.appendChild(N);const L=m("div",{className:"rooms-list__bottom-row"}),$=m("div",{className:"rooms-list__bottom-left"}),A=m("div",{className:"rooms-list__avatars"});for(let q=0;q<R.maxPlayers;q++){const Z=m("div",{className:`rooms-list__avatar ${q<R.playerCount?"rooms-list__avatar--filled":"rooms-list__avatar--empty"}`});if(R.playerAvatars&&R.playerAvatars[q]){const Ce=R.playerAvatars[q];if(Ce.avatarUrl){const Ie=m("img",{src:Ce.avatarUrl,alt:Ce.name});Ie.style.width="100%",Ie.style.height="100%",Ie.style.objectFit="cover",Z.appendChild(Ie);}else Z.textContent="👤";Z.title=Ce.name;}else q<R.playerCount&&(Z.textContent="👤");A.appendChild(Z);}$.appendChild(A);const M=m("span",{className:"rooms-list__count"});M.textContent=`${R.playerCount}/${R.maxPlayers}`,$.appendChild(M),L.appendChild($);const X=R.playerCount>=R.maxPlayers,U=Ae({label:"Join",variant:"primary",size:"sm",disabled:!a||X,onClick:()=>{n?.(R.id);}});return y.push(U),L.appendChild(U),W.appendChild(L),W}function I(R){C.innerHTML="",y.forEach(W=>{W.destroy?W.destroy():W.remove&&W.remove();}),y.length=0;const O=JN(R,c);if(O.length===0){const W=m("div",{className:"rooms-list__empty"});W.textContent=i,C.appendChild(W);}else O.forEach(W=>{const N=T(W);C.appendChild(N);});}return I(t),{root:u,setRooms(R){d=R,I(R);},setFilter(R){c=R,h.setValue(R),I(d);},setLastUpdated(R){w.textContent=QN(R),w.style.display="block";},setLoading(R){R?(S.style.display="flex",S.style.opacity="0",S.offsetWidth,S.style.opacity="1"):(S.style.opacity="0",setTimeout(()=>{S.style.display="none";},300));},destroy(){y.forEach(R=>{R.destroy?R.destroy():R.remove&&R.remove();}),y.length=0,k.forEach(R=>{R.destroy?R.destroy():R.remove&&R.remove();}),k.length=0,u.remove();}}}async function tO(e){const{state:t,defaultExpanded:n=true,onExpandChange:o}=e;let r=null,i=false;const a=!Je.isDiscord(),s=Je.isDiscord(),c=Je.detect().origin;async function d(){try{return (await tl.fetchRooms(1e3)).map(h=>({id:h.id,playerCount:h.playersCount,maxPlayers:6,playerAvatars:h.userSlots?.map(x=>({name:x.name,avatarUrl:x.avatarUrl}))}))}catch(g){return console.error("[Room] Failed to fetch rooms:",g),[]}}async function u(){if(!(i||!r)){i=true,r.setLoading(true);try{const g=await d(),h=new Date;r.setRooms(g),r.setLastUpdated(h),console.log(`[Room] Fetched ${g.length} rooms from Aries API`);}catch(g){console.error("[Room] Failed to refresh rooms:",g);}finally{i=false,r.setLoading(false);}}}const p=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"});r=eO({rooms:[],joinEnabled:a,onJoinRoom:g=>{const h=`${c}/r/${g}`;window.open(h,"_blank"),console.log(`[Room] Opening room: ${h}`);},onCopyRoomId:g=>{navigator.clipboard.writeText(g).then(()=>{console.log(`[Room] Room ID copied to clipboard: ${g}`);}).catch(h=>{console.error("[Room] Failed to copy room ID:",h);});},onRefresh:()=>{u();},emptyMessage:"No public rooms available",initialFilter:"5-6"}),p.appendChild(r.root);const f=Ee({title:"Public",subtitle:s?"List of available public rooms (view only on Discord)":"List of available public rooms",padding:"lg",expandable:true,defaultExpanded:n,onExpandChange:g=>{o?.(g),t.setCardExpanded("public",g),g&&!i&&u();}},p);return n&&u(),{root:f,destroy(){r&&(r.destroy(),r=null);}}}class nO extends nn{constructor(n){super({id:"tab-room",label:"Room"});j(this,"publicCardHandle",null);this.deps=n;}destroy(){this.publicCardHandle&&(this.publicCardHandle.destroy(),this.publicCardHandle=null);}async build(n){const o=this.createGrid("12px");o.id="room",n.appendChild(o);let r;try{r=await WN();}catch{r={get:()=>Jd,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=r.get();this.publicCardHandle=await tO({state:r,defaultExpanded:!!i.ui.expandedCards.public}),o.appendChild(this.publicCardHandle.root);}}const oO=10,rO=16;function iO(e){const{selectedSpecies:t,onChange:n,placeholder:o="Search plants...",speciesRuleCount:r={},onSearchChange:i}=e;let a=t??null,s=[],l=[];const c=[],d=new Map;let u=null;const p=m("div",{className:"plant-selector"}),f=$i({placeholder:o,blockGameKeys:true,withClear:true,debounceMs:150,onChange:y=>S(y)});p.appendChild(f.root),c.push(()=>{const y=f.root.__cleanup;y&&y();});const g=m("div",{className:"plant-selector__grid"});p.appendChild(g),c.push(()=>{u!==null&&(cancelAnimationFrame(u),u=null),d.clear();});function h(y,T){if(Y.isReady())try{const I=Y.toCanvas(y,{boundsMode:"padded"});I&&(I.style.maxWidth="40px",I.style.maxHeight="40px",I.style.width="auto",I.style.height="auto",I.style.display="block",T.replaceChildren(I));}catch(I){console.warn("[PlantSelector] Failed to load sprite:",I);}}function x(){if(d.size===0){u=null;return}const y=[],T=d.entries();for(let I=0;I<oO;I++){const P=T.next();if(P.done)break;y.push(P.value);}for(const[I,P]of y)h(P,I),d.delete(I);d.size>0?u=requestAnimationFrame(()=>{setTimeout(x,rO);}):u=null;}function b(){u===null&&(u=requestAnimationFrame(()=>{x();}));}function C(){try{const y=J.get("plants");if(!y){console.warn("[PlantSelector] No plants data available");return}s=Object.entries(y).filter(([,T])=>T&&typeof T=="object"&&"crop"in T).map(([T,I])=>({name:T,spriteId:I.crop?.spriteId||null})),l=[...s],_();}catch(y){console.error("[PlantSelector] Failed to load plants:",y);}}function S(y){if(!y.trim())l=[...s];else {const T=y.toLowerCase();l=s.filter(I=>I.name.toLowerCase().includes(T));}i?.(y),_();}function _(){const y=g.scrollTop;if(u!==null&&(cancelAnimationFrame(u),u=null),d.clear(),g.replaceChildren(),l.length===0){const I=m("div",{className:"plant-selector__empty"},"No plants found");g.appendChild(I);return}const T=document.createDocumentFragment();l.forEach(I=>{const P=E(I);T.appendChild(P);}),g.appendChild(T),g.scrollTop=y,d.size>0&&b();}function E(y){const T=r[y.name]??0,I=m("div",{className:`plant-selector__item ${a===y.name?"plant-selector__item--selected":""}`});if(T>0){const W=m("div",{className:"plant-selector__badge"},String(T));I.appendChild(W);}I.addEventListener("click",()=>{a=y.name,n(y.name),_();});const P=m("div",{className:"plant-selector__sprite"}),R=m("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 8%, transparent); border-radius: 4px;"});P.appendChild(R),y.spriteId&&Y.isReady()&&d.set(P,y.spriteId),I.appendChild(P);const O=m("div",{className:"plant-selector__name"},y.name);return I.appendChild(O),I}C();function v(){return a}function w(y){a=y,_();}function k(){c.forEach(y=>y()),c.length=0;}return {root:p,getSelected:v,setSelected:w,destroy:k}}function Kl(e,t,n){const{size:o,mutations:r}=n;if(!Y.isReady()){t.appendChild(Hr(o));return}try{const s=J.get("plants")?.[e]?.crop?.spriteId;if(!s){t.appendChild(Hr(o));return}const l=Y.toCanvas(s,{mutations:r&&r.length>0?r:void 0,boundsMode:"padded"});l?(Xy(l,o),t.appendChild(l)):t.appendChild(Hr(o));}catch(i){console.warn(`[SpriteRenderer] Failed to render plant sprite for ${e}:`,i),t.appendChild(Hr(o));}}function aO(e,t,n){if(!Y.isReady()){t.appendChild(ja(e,n));return}try{const i=J.get("mutations")?.[e]?.spriteId;if(!i){t.appendChild(ja(e,n));return}const a=Y.toCanvas(i,{boundsMode:"padded"});a?(Xy(a,n),t.appendChild(a)):t.appendChild(ja(e,n));}catch(o){console.warn(`[SpriteRenderer] Failed to render mutation sprite for ${e}:`,o),t.appendChild(ja(e,n));}}function Hr(e){return m("div",{style:`
            width: ${e}px;
            height: ${e}px;
            background: color-mix(in oklab, var(--accent) 20%, transparent);
            border-radius: 4px;
        `})}function sO(e){return m("div",{style:`
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
        `},"—")}function ja(e,t){return e==="Gold"?m("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: #FFD700;
                border-radius: 4px;
            `}):e==="Rainbow"?m("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%);
                border-radius: 4px;
            `}):Hr(t)}function Xy(e,t){e.style.maxWidth=`${t}px`,e.style.maxHeight=`${t}px`,e.style.width="auto",e.style.height="auto",e.style.display="block";}const hn=["none","Gold","Rainbow"],sl={wet:["Wet","Chilled","Frozen"],lunar:["Dawnlit","Ambershine","Dawncharged","Ambercharged"]};function Yy(){if(!Y.isReady())return console.warn("[MutationData] MGSprite not ready yet"),[];try{return Y.getMutationNames().filter(t=>t!=="Gold"&&t!=="Rainbow")}catch(e){return console.error("[MutationData] Failed to get mutation names:",e),[]}}function Jy(e){if(e==="none")return "Normal";try{return J.get("mutations")?.[e]?.name||e}catch{return e}}function lO(e){return e.map(t=>t==="none"?"none":Jy(t).toLowerCase()).join(", ")}function cO(){return Yy()}function vo(e){const n=cO().indexOf(e);return n===-1?1/0:n}function Qd(e){return sl.wet.includes(e)}function Zd(e){return sl.lunar.includes(e)}function dO(e){const t=e.filter(r=>Qd(r)),n=e.filter(r=>Zd(r)),o=[];return t.length>0&&o.push(t[0]),n.length>0&&o.length<2&&o.push(n[0]),o}function Ua(e){const t=[e.mode];if(e.sizeCondition?.enabled&&t.push(`size:${e.sizeCondition.minPercentage}`),e.mutationCondition?.enabled){const n=[...e.mutationCondition.mutations].sort();t.push(`mut:${e.mutationCondition.matchMode}:${n.join(",")}`);}return t.join("|")}const uO=32;function Qy(e){const{mutationId:t,isSelected:n,onToggle:o,size:r=uO}=e;let i=n,a=false;const s=m("div",{style:`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.15s ease;
        `});u(),s.addEventListener("click",o),s.addEventListener("mouseenter",()=>{!i&&!a&&(s.style.background="color-mix(in oklab, var(--fg) 10%, transparent)");}),s.addEventListener("mouseleave",()=>{!i&&!a&&(s.style.background="color-mix(in oklab, var(--fg) 5%, transparent)");});const l=m("div",{style:"display: flex; align-items: center; justify-content: center;"});t==="none"?l.appendChild(sO(r)):aO(t,l,r),s.appendChild(l);const c=e.label??Jy(t),d=m("div",{style:`
            font-size: 10px;
            color: var(--fg);
            text-align: center;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        `},c);s.appendChild(d);function u(){i?(s.style.background="color-mix(in oklab, var(--accent) 20%, transparent)",s.style.border="1px solid var(--accent)"):(s.style.background="color-mix(in oklab, var(--fg) 5%, transparent)",s.style.border="1px solid color-mix(in oklab, var(--fg) 10%, transparent)");}function p(g){i=g,u();}function f(g){a=g,s.style.opacity=a?"0.35":"1",s.style.pointerEvents=a?"none":"",s.style.cursor=a?"default":"pointer";}return {root:s,setSelected:p,setDisabled:f}}function pO(e){const{enabled:t,percentage:n,sizeMode:o,ruleMode:r,onEnabledChange:i,onPercentageChange:a,onSizeModeChange:s,expanded:l=false,onExpandChange:c}=e;let d=t,u=n,p=o,f=r,g=null,h=null,x=null;const b=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),C=m("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");_();const S=Ee({title:"Size",subtitle:"Growth size threshold",actions:[C],variant:"soft",padding:"md",expandable:true,defaultExpanded:l,onExpandChange:c},b);function _(){b.replaceChildren(),C.style.display=d?"":"none";const k=m("div",{style:"display: flex; align-items: center; gap: 12px;"}),y=Ul({checked:d,label:"Enable",size:"md",onChange:N=>{d=N,i(N),_();}});k.appendChild(y.root),d&&(g=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},E()),k.appendChild(g)),b.appendChild(k);const T=m("div",{style:d?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),I=m("div",{style:"display: flex; justify-content: center;"}),P=go({segments:[{id:"min",label:"Minimum"},{id:"max",label:"Maximum"}],selected:p,onChange:N=>{p=N,s(p),_();}});I.appendChild(P),T.appendChild(I),x=m("div",{style:"display: flex; flex-direction: column; gap: 4px;"});const R=m("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),O=m("div",{style:"font-size: 12px; color: var(--fg); font-weight: 500;"},"Size Threshold");h=m("span",{style:"font-size: 12px; font-weight: 600; color: var(--accent);"},`${u}%`),R.appendChild(O),R.appendChild(h),x.appendChild(R);const W=jp({min:50,max:100,step:1,value:u,showValue:false,onInput:N=>{u=N,h&&(h.textContent=`${N}%`),g&&(g.textContent=E());},onChange:N=>{u=N,a(N);}});x.appendChild(W.root),T.appendChild(x),b.appendChild(T);}function E(){const k=p==="min"?"at most":"at least";return f==="lock"?`Lock plants ${k} ${u}% grown`:`Allow plants ${k} ${u}% grown`}function v(k){f=k,g&&(g.textContent=E());}function w(){g=null,h=null,x=null;}return {root:S,setRuleMode:v,destroy:w}}function fO(e){const{enabled:t,selected:n,ruleMode:o,onEnabledChange:r,onSelectionChange:i,expanded:a=false,onExpandChange:s}=e;let l=t,c=[...n],d=o,u=null;const p=[],f=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),g=m("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");x();const h=Ee({title:"Color Mutation",subtitle:"Gold / Rainbow color variants",actions:[g],variant:"soft",padding:"md",expandable:true,defaultExpanded:a,onExpandChange:s},f);function x(){f.replaceChildren(),p.length=0,g.style.display=l?"":"none";const k=m("div",{style:"display: flex; align-items: center; gap: 12px;"}),y=Ul({checked:l,label:"Enable",size:"md",onChange:P=>{l=P,r(P),x();}});k.appendChild(y.root),l&&(u=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},_()),k.appendChild(u)),f.appendChild(k);const T=m("div",{style:l?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),I=m("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 8px;
            `});hn.forEach(P=>{const R=c.includes(P),O=Qy({mutationId:P,isSelected:R,onToggle:()=>b(P)});p.push(O),I.appendChild(O.root);}),T.appendChild(I),f.appendChild(T);}function b(k){if(c.includes(k)){const T=c.filter(I=>I!==k);if(T.length===0)return;c=T;}else {if(c.length>=3)return;c=[...c,k];}i(c),C(),S();}function C(){u&&(u.textContent=_());}function S(){hn.forEach((k,y)=>{const T=p[y];T&&T.setSelected(c.includes(k));});}function _(){const k=c.map(y=>y==="none"?"normal":y.toLowerCase()).join(", ");return d==="lock"?`Lock ${k} plants`:`Allow ${k} plants`}function E(k){d=k,C();}function v(){return [...c]}function w(){u=null,p.length=0;}return {root:h,setRuleMode:E,getSelection:v,destroy:w}}function gO(e){const{enabled:t,selected:n,matchMode:o,ruleMode:r,onEnabledChange:i,onSelectionChange:a,onMatchModeChange:s,expanded:l=false,onExpandChange:c}=e;let d=t,u=[...n],p=o,f=r,g=null;const h=new Map,x=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),b=m("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");S();const C=Ee({title:"Weather Mutation",subtitle:"Weather-based mutation variants",actions:[b],variant:"soft",padding:"md",expandable:true,defaultExpanded:l,onExpandChange:c},x);function S(){x.replaceChildren(),h.clear(),b.style.display=d?"":"none";const P=m("div",{style:"display: flex; align-items: center; gap: 12px;"}),R=Ul({checked:d,label:"Enable",size:"md",onChange:H=>{d=H,i(H),S();}});P.appendChild(R.root),d&&(g=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"}),u.length>0&&(g.textContent=w()),P.appendChild(g)),x.appendChild(P);const O=m("div",{style:(d?"":"opacity: 0.4; pointer-events: none;")+" display: flex; flex-direction: column; gap: 12px; transition: opacity 0.2s ease;"}),W=m("div",{style:"display: flex; justify-content: center;"}),N=go({segments:[{id:"any",label:"Any"},{id:"all",label:"All"}],selected:p,onChange:H=>{p=H,H==="all"&&(u=dO(u),a(u)),s(p),S();}});W.appendChild(N),O.appendChild(W);const G=["none",...Yy()],B=m("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
                gap: 8px;
                max-height: 300px;
                overflow-y: auto;
            `});G.forEach(H=>{const L=u.includes(H),$=Qy({mutationId:H,isSelected:L,onToggle:()=>_(H),label:H==="none"?"None":void 0});h.set(H,$),B.appendChild($.root);}),O.appendChild(B),x.appendChild(O);}function _(P){if(p==="all")if(P==="none")u.length===1&&u[0]==="none"?u=[]:u=["none"];else {if(u.includes("none"))return;u.includes(P)?u=u.filter(R=>R!==P):(Qd(P)?u=u.filter(R=>!Qd(R)):Zd(P)&&(u=u.filter(R=>!Zd(R))),u=[...u,P]);}else u.includes(P)?u=u.filter(R=>R!==P):u=[...u,P];a(u),E(),v();}function E(){g&&(g.textContent=u.length>0?w():"");}function v(){const P=p==="all"&&u.includes("none");h.forEach((R,O)=>{R.setSelected(u.includes(O)),R.setDisabled(P&&O!=="none");});}function w(){const P=lO(u),R=p==="all"?"AND":"OR";return f==="lock"?`Lock ${P} plants (${R})`:`Allow ${P} plants (${R})`}function k(P){f=P,E();}function y(){return [...u]}function T(){return p}function I(){g=null,h.clear();}return {root:C,setRuleMode:k,getSelection:y,getMatchMode:T,destroy:I}}const mO=60;function hO(e){let t={...e},n=null,o=null;const r=m("div",{style:"display: flex; flex-direction: column; gap: 8px;"}),i=m("div",{style:"display: flex; justify-content: center;"}),a=m("div",{className:"harvest-locker-preview-grid"});r.appendChild(i),r.appendChild(a);const s=m("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `});t.sizeEnabled&&t.sizePercentage!==void 0&&(s.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,s.style.display="");const l=Ee({title:"Preview",subtitle:d(),actions:[s],variant:"soft",padding:"md",expandable:true,defaultExpanded:true},r),c=l.querySelector(".card-subtitle");u();function d(){return t.ruleMode==="lock"?"Preview of plants that will be blocked from harvesting":"Preview of plants that will be harvestable"}function u(){n!==null&&(cancelAnimationFrame(n),n=null),c&&(c.textContent=d()),t.sizeEnabled&&t.sizePercentage!==void 0?(s.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,s.style.display=""):s.style.display="none";const b=t.colorEnabled?hn.filter(C=>t.colorMutations.includes(C)):[];if(b.length>=2){o&&!b.includes(o)&&(o=b[0]),o||(o=b[0]),i.replaceChildren();const C=go({segments:b.map(S=>({id:S,label:S==="none"?"Normal":S})),selected:o,onChange:S=>{o=S,u();}});i.appendChild(C);}else o=null,i.replaceChildren();a.replaceChildren(),n=requestAnimationFrame(()=>{p().forEach(S=>{a.appendChild(S);});});}function p(){const b=[],C=t.species||"Starweaver";if(!(t.sizeEnabled||t.colorEnabled||t.weatherEnabled))return b.push(g(C,[])),b;const _=f();if(_.sort((v,w)=>{const k=Math.max(0,...v.map(P=>hn.indexOf(P))),y=Math.max(0,...w.map(P=>hn.indexOf(P)));if(k!==y)return k-y;const T=v.filter(P=>!hn.includes(P)).sort((P,R)=>vo(P)-vo(R)),I=w.filter(P=>!hn.includes(P)).sort((P,R)=>vo(P)-vo(R));if(T.length!==I.length)return T.length-I.length;for(let P=0;P<T.length;P++){const R=vo(T[P])-vo(I[P]);if(R!==0)return R}return 0}),_.length===0){const v=m("div",{style:"padding: 12px; text-align: center; color: #ef4444; font-size: 12px;"},"Invalid mutation combination");return b.push(v),b}return (o?_.filter(v=>{const w=v.filter(k=>hn.includes(k)&&k!=="none");return o==="none"?w.length===0:w.includes(o)}):_).forEach(v=>{b.push(g(C,v));}),b}function f(){const b=[],C=t.weatherEnabled?t.weatherMutations.filter(P=>P!=="none"):[],S=t.colorEnabled?t.colorMutations.filter(P=>P!=="none"):[],_=t.weatherEnabled&&t.weatherMutations.includes("none"),E=t.colorEnabled&&t.colorMutations.includes("none");if(C.length===0&&S.length===0||!t.weatherEnabled&&!t.colorEnabled)return b.push([]),b;const v=C.filter(P=>sl.wet.includes(P)),w=C.filter(P=>sl.lunar.includes(P)),k=(P,R)=>{P.length===0&&R.length===0?b.push([]):P.length===0?R.forEach(O=>{b.push([...O]);}):R.length===0?P.forEach(O=>{b.push([...O]);}):P.forEach(O=>{R.forEach(W=>{b.push([...O,...W]);});});},y=[];if(_&&y.push([]),t.weatherMatchMode==="all"&&C.length>0){const P=v.length>1,R=w.length>1;if(P||R)return [];y.push(C);}else t.weatherMatchMode==="any"&&C.length>0&&(C.forEach(P=>{y.push([P]);}),v.forEach(P=>{w.forEach(R=>{y.push([P,R]);});}));const T=[];return E&&T.push([]),S.forEach(P=>{T.push([P]);}),k(y,T),Array.from(new Set(b.map(P=>P.sort().join(",")))).map(P=>P.split(",").filter(Boolean))}function g(b,C){const S=m("div",{style:"flex-shrink: 0;"});return Kl(b,S,{size:mO,mutations:C}),S}function h(b){t={...t,...b},u();}function x(){n!==null&&(cancelAnimationFrame(n),n=null),a.replaceChildren();}return {root:l,update:h,destroy:x}}function Kg(e){const{mode:t,species:n,ruleId:o,initialData:r,onSave:i,onDelete:a,onCancel:s}=e;let l=r?.name??"",c=r?.ruleMode??"lock",d=r?.sizeCondition?.enabled??false,u=r?.sizeCondition?.minPercentage??75,p=r?.sizeCondition?.sizeMode??"max";const f=r?.mutationCondition?.mutations??[],g=f.filter(A=>["none","Gold","Rainbow"].includes(A));let h=g.length>0,x=g.length>0?g:["none"];const b=f.filter(A=>!["none","Gold","Rainbow"].includes(A));let C=b.length>0,S=b.length>0?b:["none"],_=r?.mutationCondition?.matchMode??"any",E=null,v=null,w=null,k=null,y=null,T=null,I=null;const P=W(),R=F();I=Hp({title:O(),content:P,footer:R,size:"lg",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{s?.();}});function O(){if(t!=="species"||!n)return o?"Edit Overall Rule":"Create Overall Rule";const A=m("div",{style:"display: flex; align-items: center; gap: 10px;"}),M=m("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});Kl(n,M,{size:24}),A.appendChild(M);const X=m("span",{},`${n} — Override Rule`);return A.appendChild(X),A}function W(){const A=m("div",{style:"display: flex; flex-direction: column; gap: 16px;"});if(t==="species"){const M=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 60%, transparent); padding: 8px 10px; background: color-mix(in oklab, var(--accent) 8%, transparent); border-radius: 6px; border-left: 3px solid var(--accent);"},"Global rules still apply. This override takes priority for this species only.");A.appendChild(M);}return A.appendChild(N()),E=pO({enabled:d,percentage:u,sizeMode:p,ruleMode:c,onEnabledChange:M=>{d=M,B(),H();},onPercentageChange:M=>{u=M,H();},onSizeModeChange:M=>{p=M,H();}}),A.appendChild(E.root),v=fO({enabled:h,selected:x,ruleMode:c,onEnabledChange:M=>{h=M,B(),H();},onSelectionChange:M=>{x=M,H();}}),A.appendChild(v.root),w=gO({enabled:C,selected:S,matchMode:_,ruleMode:c,onEnabledChange:M=>{C=M,B(),H();},onSelectionChange:M=>{S=M,H();},onMatchModeChange:M=>{_=M,H();}}),A.appendChild(w.root),k=hO({species:t==="overall"?"Carrot":n,ruleMode:c,sizeEnabled:d,sizePercentage:u,sizeMode:p,colorEnabled:h,colorMutations:x,weatherEnabled:C,weatherMutations:S,weatherMatchMode:_}),A.appendChild(k.root),A}function N(){const A=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),M=m("div",{style:"display: flex; gap: 12px; align-items: flex-start;"}),X=m("div",{style:"flex: 1; display: flex; flex-direction: column; gap: 6px;"}),U=m("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Rule Name");X.appendChild(U),y=Oi({placeholder:"e.g., Lock Large Frozen",value:l,maxLength:30,blockGameKeys:true,onChange:Ie=>{l=Ie,B();}}),X.appendChild(y.root),M.appendChild(X);const q=m("div",{style:"display: flex; flex-direction: column; gap: 6px;"}),Z=m("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Mode");q.appendChild(Z);const Ce=go({segments:[{id:"lock",label:"Lock"},{id:"allow",label:"Allow"}],selected:c,onChange:Ie=>{c=Ie,E?.setRuleMode(c),v?.setRuleMode(c),w?.setRuleMode(c),H();}});return q.appendChild(Ce),M.appendChild(q),A.appendChild(M),A}function F(){const A=m("div",{style:"display: flex; gap: 8px; justify-content: space-between; width: 100%;"}),M=m("div",{style:"display: flex; gap: 8px;"});if(o&&a){const Z=Ae({label:"Delete Rule",variant:"danger",onClick:()=>{a(),$();}});M.appendChild(Z);}A.appendChild(M);const X=m("div",{style:"display: flex; gap: 8px;"}),U=Ae({label:"Cancel",variant:"default",onClick:()=>{s?.(),$();}});X.appendChild(U);const q=Ae({label:"Save",variant:"primary",disabled:!G(),onClick:L});return T=q,X.appendChild(q),A.appendChild(X),A}function G(){return !(!l.trim()||!d&&!h&&!C)}function B(){T&&(T.disabled=!G());}function H(){k?.update({ruleMode:c,sizeEnabled:d,sizePercentage:u,sizeMode:p,colorEnabled:h,colorMutations:x,weatherEnabled:C,weatherMutations:S,weatherMatchMode:_});}function L(){if(!G())return;const A={name:l.trim(),ruleMode:c};d&&(A.sizeCondition={enabled:true,minPercentage:u,sizeMode:p});const M=[];C&&M.push(...S),h&&M.push(...x),M.length>0&&(A.mutationCondition={enabled:true,mutations:M,matchMode:_}),i(A),$();}function $(){E?.destroy(),v?.destroy(),w?.destroy(),k?.destroy(),y?.destroy(),I?.destroy(),E=null,v=null,w=null,k=null,y=null,T=null,I=null;}return {root:I.root,destroy:$}}function bO(e){const{species:t,existingRules:n,onSelect:o}=e;let r=null;const i=l(),a=c();r=Hp({title:s(),subtitle:"Select a rule to assign to this species",content:i,footer:a,size:"md",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{}});function s(){const g=m("div",{style:"display: flex; align-items: center; gap: 10px;"}),h=m("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});return Kl(t,h,{size:24}),g.appendChild(h),g.appendChild(m("span",{},`${t} — Assign Rule`)),g}function l(){const g=m("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(n.length===0){const h=m("div",{style:"padding: 20px; text-align: center; color: var(--muted); font-size: 14px;"},"No overall rules available");g.appendChild(h);}else n.forEach(h=>{g.appendChild(d(h));});return g}function c(){const g=m("div",{style:"display: flex; gap: 8px; justify-content: flex-end;"}),h=Ae({label:"Cancel",variant:"default",onClick:()=>{f();}});return g.appendChild(h),g}function d(g){const h=m("div",{className:"harvest-locker-rule-item",style:"flex-direction: column; align-items: flex-start; gap: 8px;"});h.addEventListener("click",()=>{tt.cloneRuleToSpecies(g.id,t),o(g.id),f();});const x=m("div",{style:"display: flex; align-items: center; justify-content: space-between; width: 100%;"});x.appendChild(m("div",{className:"harvest-locker-rule-item__name"},g.name)),x.appendChild(m("div",{className:"harvest-locker-rule-item__badge"},g.mode)),h.appendChild(x);const b=u(g);return b.childNodes.length>0&&h.appendChild(b),h}function u(g){const h=m("div",{style:"display: flex; flex-wrap: wrap; gap: 4px;"});return g.sizeCondition?.enabled&&h.appendChild(p(`Size ≥ ${g.sizeCondition.minPercentage}%`)),g.mutationCondition?.enabled&&g.mutationCondition.mutations.forEach(x=>{h.appendChild(p(x==="none"?"Normal":x));}),h}function p(g){return m("div",{style:`
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 500;
                color: color-mix(in oklab, var(--fg) 75%, transparent);
                background: color-mix(in oklab, var(--fg) 8%, transparent);
                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
            `},g)}function f(){r?.destroy(),r=null;}return {root:r.root,destroy:f}}const xO={ui:{harvestLockerMode:"overall",selectedSpecies:null,searchQuery:"",harvestLockerExpanded:true,eggLockerExpanded:true,decorLockerExpanded:true}};let Io=null,Dc=null;async function yO(){return Io||(Dc||(Dc=En("tab-locker",{version:1,defaults:xO,sanitize:e=>({ui:{harvestLockerMode:e.ui?.harvestLockerMode==="bySpecies"?"bySpecies":"overall",selectedSpecies:typeof e.ui?.selectedSpecies=="string"?e.ui.selectedSpecies:null,searchQuery:typeof e.ui?.searchQuery=="string"?e.ui.searchQuery:"",harvestLockerExpanded:typeof e.ui?.harvestLockerExpanded=="boolean"?e.ui.harvestLockerExpanded:true,eggLockerExpanded:typeof e.ui?.eggLockerExpanded=="boolean"?e.ui.eggLockerExpanded:true,decorLockerExpanded:typeof e.ui?.decorLockerExpanded=="boolean"?e.ui.decorLockerExpanded:true}})})),Io=await Dc,Io)}function Qt(){if(!Io)throw new Error("[LockerState] State not initialized. Call initLockerState() first.");return Io}function vO(e){const t=Qt();t.update({ui:{...t.get().ui,harvestLockerMode:e}});}function wO(e){const t=Qt();t.update({ui:{...t.get().ui,selectedSpecies:e}});}function CO(e){const t=Qt();t.update({ui:{...t.get().ui,searchQuery:e}});}function SO(e){const t=Qt();t.update({ui:{...t.get().ui,harvestLockerExpanded:e}});}function kO(e){const t=Qt();t.update({ui:{...t.get().ui,eggLockerExpanded:e}});}function _O(e){const t=Qt();t.update({ui:{...t.get().ui,decorLockerExpanded:e}});}function EO(e={}){let t=e.defaultMode??"overall",n=e.defaultSelectedSpecies??null,o=[],r=null,i=null,a=null,s=null,l=null,c=null;const d=[];r=u();function u(){const T=m("div",{className:"harvest-locker-card-wrapper"});i=m("div",{className:"harvest-locker-card__mode-container"}),T.appendChild(i),a=m("div",{className:"harvest-locker-card__content"}),T.appendChild(a);const I=Ee({title:"Crop Harvest",subtitle:"Prevent harvesting specific crops",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},T);return p(),g(),f(),I}function p(){t==="overall"?o=tt.getOverallRules():o=n?tt.getSpeciesRules(n):[];}function f(){a&&(a.replaceChildren(),t==="bySpecies"&&(h(),n&&x()),b(),S());}function g(){if(i){if(!s){s=go({segments:[{id:"overall",label:"Overall"},{id:"bySpecies",label:"By Species"}],selected:t,onChange:T=>{t=T,vO(t),p(),f();}}),i.appendChild(s);return}s.getSelected()!==t&&s.select(t);}}function h(){if(!a)return;const T=J.get("plants");if(!T||Object.keys(T).length===0){const O=m("div",{className:"harvest-locker-card__message harvest-locker-card__message--compact"},"No species available");a.appendChild(O);return}const I=tt.getConfig(),P={};Object.entries(I.speciesRules).forEach(([O,W])=>{P[O]=W.length;}),l=iO({selectedSpecies:n??void 0,placeholder:"Search plants...",speciesRuleCount:P,onChange:O=>{n=O,wO(O),p(),f();},onSearchChange:O=>{CO(O);}});const R=m("div",{className:"harvest-locker-card__control"});R.appendChild(l.root),a.appendChild(R);}function x(){if(!a||!n)return;const T=m("div",{className:"harvest-locker-card__species-section-header"}),I=m("div",{className:"harvest-locker-card__species-section-sprite"});Kl(n,I,{size:36}),T.appendChild(I);const P=m("div",{className:"harvest-locker-card__species-section-text"}),R=m("div",{className:"harvest-locker-card__species-section-name"},n);P.appendChild(R);const O=m("div",{className:"harvest-locker-card__species-section-label"},"SELECTED");P.appendChild(O),T.appendChild(P),a.appendChild(T);}function b(){if(!a)return;if(t==="bySpecies"&&!n){const O=m("div",{className:"harvest-locker-card__message"},"Select a species to view and manage rules");a.appendChild(O);return}const T=m("div",{className:"harvest-locker-card__rules-section"}),I=m("div",{className:"harvest-locker-card__rules-section-label"},"Rules");if(T.appendChild(I),o.length===0){const O=m("div",{className:"harvest-locker-card__empty"},"No rules yet");T.appendChild(O),a.appendChild(T);return}const P=m("div",{className:"harvest-locker-card__list"});o.forEach(O=>{const W=C(O);P.appendChild(W);}),T.appendChild(P);const R=m("div",{className:"harvest-locker-card__rules-hint"});R.appendChild(m("span",{className:"harvest-locker-card__rules-hint--desktop"},"Click to edit · Right-click to delete")),R.appendChild(m("span",{className:"harvest-locker-card__rules-hint--mobile"},"Tap to edit · Long-press to delete")),T.appendChild(R),a.appendChild(T);}function C(T){const I=m("div",{className:"harvest-locker-rule-item"}),P=m("div",{className:"harvest-locker-rule-item__name"},T.name);I.appendChild(P);const R=m("div",{className:"harvest-locker-rule-item__badge"},T.mode);I.appendChild(R),I.addEventListener("contextmenu",N=>{N.preventDefault(),v(T.id);});let O=null,W=false;return I.addEventListener("touchstart",()=>{W=false,O=window.setTimeout(()=>{W=true,v(T.id),navigator.vibrate&&navigator.vibrate(50);},500);}),I.addEventListener("touchend",()=>{O&&(clearTimeout(O),O=null),W||E(T);}),I.addEventListener("touchmove",()=>{O&&(clearTimeout(O),O=null);}),I.addEventListener("click",()=>{E(T);}),I}function S(){if(!a||t==="bySpecies"&&!n)return;const T=m("div",{className:"harvest-locker-card__actions"});if(t==="bySpecies"&&n){const I=tt.getOverallRules();if(I.length>0){const P=tt.getSpeciesRules(n),R=new Set(P.map(N=>Ua(N))),O=I.filter(N=>!R.has(Ua(N))),W=Ae({label:"Add Existing Rule",variant:"default",disabled:O.length===0,onClick:()=>w()});T.appendChild(W);}}c=Ae({label:t==="bySpecies"?"Create Override Rule":"Create Rule",variant:"primary",onClick:()=>_()}),T.appendChild(c),a.appendChild(T);}function _(){Kg({mode:t==="overall"?"overall":"species",species:n,onSave:T=>{t==="overall"?tt.addNewOverallRule(T.name,T.ruleMode,T.sizeCondition,T.mutationCondition):n&&tt.addNewSpeciesRule(n,T.name,T.ruleMode,T.sizeCondition,T.mutationCondition),p(),f();}});}function E(T){Kg({mode:t==="overall"?"overall":"species",species:n,ruleId:T.id,initialData:{name:T.name,ruleMode:T.mode,sizeCondition:T.sizeCondition,mutationCondition:T.mutationCondition},onSave:I=>{tt.modifyRule(T.id,{name:I.name,mode:I.ruleMode,sizeCondition:I.sizeCondition,mutationCondition:I.mutationCondition}),p(),f();},onDelete:()=>{v(T.id);}});}function v(T){tt.removeRule(T),p(),f();}function w(){if(t!=="bySpecies"||!n)return;const T=tt.getOverallRules();if(T.length===0)return;const I=tt.getSpeciesRules(n),P=new Set(I.map(O=>Ua(O))),R=T.filter(O=>!P.has(Ua(O)));R.length!==0&&bO({species:n,existingRules:R,onSelect:()=>{p(),f();}});}function k(){p(),g(),f();}function y(){d.forEach(T=>T()),d.length=0,s?.destroy?.(),s=null,l?.destroy?.(),l=null,c=null,i=null,a=null,r=null;}return {root:r,render:k,destroy:y}}class TO{constructor(t={}){j(this,"handle",null);j(this,"options");this.options=t;}build(){return this.handle||(this.handle=EO(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const AO=`
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
`;function IO(e){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.innerHTML=e?'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>':'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',t}function PO(e,t,n){if(!Y.isReady()){t.appendChild(Wa(n));return}try{const r=J.get("eggs")?.[e]?.spriteId;if(!r){t.appendChild(Wa(n));return}const i=Y.toCanvas(r,{boundsMode:"padded"});i?(i.style.maxWidth=`${n}px`,i.style.maxHeight=`${n}px`,i.style.width="auto",i.style.height="auto",i.style.display="block",t.appendChild(i)):t.appendChild(Wa(n));}catch{t.appendChild(Wa(n));}}function Wa(e){return m("div",{style:`width:${e}px;height:${e}px;background:color-mix(in oklab, var(--accent) 20%, transparent);border-radius:6px;`})}function LO(e={}){let t=null,n=null;n=o();function o(){return t=m("div",{className:"egg-locker-card__wrapper"}),r(),Ee({title:"Egg Hatching",subtitle:"Prevent hatching specific eggs",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t)}function r(){if(!t)return;t.replaceChildren();const l=vn.getAvailableEggs();if(l.length===0){t.appendChild(m("div",{className:"egg-locker-card__empty"},"No eggs available"));return}const c=new Set(vn.getBlockedEggs()),d=J.get("eggs"),u=m("div",{className:"egg-locker-card__grid"});for(const p of l){const f=d?.[p]?.name??p;u.appendChild(i(p,c.has(p),f));}t.appendChild(u);}function i(l,c,d){const u=m("div",{className:"egg-locker-item"+(c?" egg-locker-item--locked":"")}),p=m("div",{className:"egg-locker-item__sprite"});PO(l,p,48),u.appendChild(p),u.appendChild(m("div",{className:"egg-locker-item__name"},d));const f=m("div",{className:"egg-locker-item__lock"+(c?" egg-locker-item__lock--locked":"")});return f.appendChild(IO(c)),u.appendChild(f),u.addEventListener("click",()=>{c?vn.unblockEgg(l):vn.blockEgg(l),r();}),u}function a(){r();}function s(){t=null,n=null;}return {root:n,render:a,destroy:s}}class MO{constructor(t={}){j(this,"handle",null);j(this,"options");this.options=t;}build(){return this.handle||(this.handle=LO(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const RO=`
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
`;function NO(e={}){let t=null,n=null,o=null,r=null;const i=[];n=a();function a(){t=m("div",{className:"decor-locker-card__wrapper",style:"display: flex; flex-direction: column; gap: 16px;"}),s();const d=Ee({title:"Decor Pickup",subtitle:"Prevent decor pickups",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t),u=()=>l();return window.addEventListener(Me.DECOR_LOCKER_LOCKS_UPDATED,u),i.push(()=>window.removeEventListener(Me.DECOR_LOCKER_LOCKS_UPDATED,u)),d}function s(){if(!t)return;const d=wn.getAvailableDecors().length,p=wn.getBlockedDecors().length===d&&d>0;if(o)o.setChecked(p,true),r&&(r.textContent=p?"Decors Unpickable":"Decors Pickable");else {t.replaceChildren();const f=m("div",{style:`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: color-mix(in oklab, var(--accent) 10%, transparent);
                    border-radius: 8px;
                `});r=m("div",{style:"font-size: 14px; font-weight: 500;"},p?"Decors Unpickable":"Decors Pickable"),o=_n({checked:p,size:"md",onChange:g=>{g?wn.blockAllDecors():wn.unblockAllDecors();}}),i.push(()=>o?.destroy()),f.appendChild(r),f.appendChild(o.root),t.appendChild(f);}}function l(){s();}function c(){i.forEach(d=>d()),i.length=0,t=null,n=null;}return {root:n,render:l,destroy:c}}class OO{constructor(t={}){j(this,"handle",null);j(this,"options");this.options=t;}build(){return this.handle||(this.handle=NO(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const $O=`
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
`;class DO extends nn{constructor(){super({id:"tab-locker",label:"Locker"});j(this,"harvestLockerCardPart",null);j(this,"eggLockerCardPart",null);j(this,"decorLockerCardPart",null);}async preload(){await yO();}build(n){const o=n.getRootNode();Pe(o,AO,"harvest-locker-card-styles"),Pe(o,$O,"plant-selector-styles"),Pe(o,RO,"egg-locker-card-styles");const r=this.createGrid("12px");r.id="locker",n.appendChild(r),this.initializeHarvestLockerCardPart(r),this.initializeEggLockerCardPart(r),this.initializeDecorLockerCardPart(r);}render(n){const o=this.harvestLockerCardPart,r=this.eggLockerCardPart,i=this.decorLockerCardPart;this.harvestLockerCardPart=null,this.eggLockerCardPart=null,this.decorLockerCardPart=null,super.render(n),this.harvestLockerCardPart=o,this.eggLockerCardPart=r,this.decorLockerCardPart=i;}destroy(){this.harvestLockerCardPart&&(this.harvestLockerCardPart.destroy(),this.harvestLockerCardPart=null),this.eggLockerCardPart&&(this.eggLockerCardPart.destroy(),this.eggLockerCardPart=null),this.decorLockerCardPart&&(this.decorLockerCardPart.destroy(),this.decorLockerCardPart=null);}initializeHarvestLockerCardPart(n){if(!this.harvestLockerCardPart){const r=Qt();this.harvestLockerCardPart=new TO({defaultExpanded:r.get().ui.harvestLockerExpanded,defaultMode:r.get().ui.harvestLockerMode,defaultSelectedSpecies:r.get().ui.selectedSpecies,defaultSearchQuery:r.get().ui.searchQuery,onExpandChange:SO});}const o=this.harvestLockerCardPart.build();n.appendChild(o),this.harvestLockerCardPart.render();}initializeEggLockerCardPart(n){if(!this.eggLockerCardPart){const r=Qt();this.eggLockerCardPart=new MO({defaultExpanded:r.get().ui.eggLockerExpanded,onExpandChange:kO});}const o=this.eggLockerCardPart.build();n.appendChild(o),this.eggLockerCardPart.render();}initializeDecorLockerCardPart(n){if(!this.decorLockerCardPart){const r=Qt();this.decorLockerCardPart=new OO({defaultExpanded:r.get().ui.decorLockerExpanded,onExpandChange:_O});}const o=this.decorLockerCardPart.build();n.appendChild(o),this.decorLockerCardPart.render();}}let Fc=null,Bc=null,zc=null;function FO(){return Fc||(Fc=new WT),Fc}function Zy(){return Bc||(Bc=new BN),Bc}function ev(){return zc||(zc=new DO),zc}function BO(e){return [new S0(e),new rR,Zy(),new bR(e),new qR(e),new UN,new nO(e),ev()]}async function zO(){const e=Zy(),t=ev(),n=FO();await Promise.all([e.preload(),t.preload(),n.preload()]);}function GO(e){const{shadow:t,initialOpen:n}=e,o=m("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=m("div",{className:"gemini-tabbar"}),i=m("div",{className:"gemini-content",id:"content"}),a=m("div",{className:"gemini-resizer",title:"Resize"}),s=m("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");o.append(r,i,a);const l=m("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:l}}function HO(e){const{resizer:t,host:n,shadow:o,onWidthChange:r,initialWidth:i,minWidth:a,maxWidth:s}=e;let l=a,c=s;function d(){const _=Je.detect(),E=Math.round(V.visualViewport?.width??V.innerWidth??0);if(_.platform==="mobile"||_.os==="ios"||_.os==="android"){const v=getComputedStyle(o.host),w=parseFloat(v.getPropertyValue("--inset-l"))||0,k=parseFloat(v.getPropertyValue("--inset-r"))||0,y=Math.max(280,E-Math.round(w+k));l=280,c=y;}else l=a,c=s;return {min:l,max:c}}function u(_){return Math.max(l,Math.min(c,Number(_)||i))}function p(_){const E=u(_);n.style.setProperty("--w",`${E}px`),r(E);}d();const f=Je.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let h=false;const x=_=>{if(!h)return;_.preventDefault();const E=Math.round(V.innerWidth-_.clientX);p(E);},b=()=>{h&&(h=false,document.body.style.cursor="",V.removeEventListener("mousemove",x),V.removeEventListener("mouseup",b));},C=_=>{g&&(_.preventDefault(),h=true,document.body.style.cursor="ew-resize",V.addEventListener("mousemove",x),V.addEventListener("mouseup",b));};t.addEventListener("mousedown",C);function S(){t.removeEventListener("mousedown",C),V.removeEventListener("mousemove",x),V.removeEventListener("mouseup",b);}return {calculateResponsiveBounds:d,constrainWidthToLimits:u,setHudWidth:p,destroy:S}}function jO(e){const{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(l){const c=t.classList.contains("open");if(i&&l.key==="Escape"&&c){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const UO=`
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
`,WO=`
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
`,VO=`
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
`,qO=`
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
`,KO=`
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
  
`,XO=`
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
`,YO=`
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
`,JO=`
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
`,QO=`
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
`,ZO=`
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
`,e$=`
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
`,t$=`
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
`,n$=`
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
`,o$=`
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
`,r$=`
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
`,i$=`
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
`,a$=`
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
`,s$=`
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
`,l$=`
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
`,c$=`
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
`,d$=`
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
`,u$=`
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
`,p$=`
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
`,f$=`
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
`,g$={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function m$(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,g$),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function h$(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function b$(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:l,buildSections:c,initialTab:d,onTabChange:u,toggleCombo:p=U=>U.ctrlKey&&U.shiftKey&&U.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:h=720}=e,{host:x,shadow:b}=m$(t),C=[[WO,"variables"],[VO,"primitives"],[qO,"utilities"],[UO,"hud"],[KO,"card"],[Dp,"badge"],[XO,"button"],[n$,"checkbox"],[YO,"input"],[JO,"label"],[QO,"navTabs"],[ZO,"searchBar"],[e$,"select"],[t$,"switch"],[o$,"table"],[r$,"teamListItem"],[i$,"timeRangePicker"],[a$,"tooltip"],[s$,"slider"],[l$,"reorderableList"],[c$,"colorPicker"],[d$,"log"],[u$,"segmentedControl"],[p$,"soundPicker"],[f$,"settings"],[By,"teamCard"],[wb,"autoFavoriteSettings"]];for(let U=0;U<C.length;U++){const[q,Z]=C[U];Pe(b,q,Z),U%5===4&&await h$();}const{panel:S,tabbar:_,content:E,resizer:v,closeButton:w,wrapper:k}=GO({shadow:b,initialOpen:o});function y(U){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:U},bubbles:true})),i?.(U);}function T(U){const q=S.classList.contains("open");S.classList.toggle("open",U),S.setAttribute("aria-hidden",U?"false":"true"),U!==q&&y(U);}T(o),w.addEventListener("click",U=>{U.preventDefault(),U.stopPropagation(),T(false);});const I=h0({host:x,themes:a,initialTheme:s,onThemeChange:l}),P=HO({resizer:v,host:x,shadow:b,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:h});P.setHudWidth(n);const R=c({applyTheme:I.applyTheme,initialTheme:s,getCurrentTheme:I.getCurrentTheme,setHUDWidth:P.setHudWidth,setHUDOpen:T}),O=new xv(R,E,{applyTheme:I.applyTheme,getCurrentTheme:I.getCurrentTheme}),W=R.map(U=>({id:U.id,label:U.label})),N=d&&R.some(U=>U.id===d)?d:W[0]?.id||"",F=bv(W,N,U=>{O.activate(U),u?.(U);});F.root.style.flex="1 1 auto",F.root.style.minWidth="0",_.append(F.root,w);const G={"tab-auto-favorite":"autoFavorite","tab-pets":"pets","tab-locker":"locker","tab-trackers":"trackers","tab-alerts":"alerts","tab-avatar":"avatar","tab-room":"room"};function B(){const U=ye(_e.CONFIG,{autoFavorite:{enabled:true},pets:{enabled:true},locker:{enabled:true},trackers:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true}});for(const[q,Z]of Object.entries(G))U[Z]?.enabled??true?F.showTab(q):F.hideTab(q);}function H(U){const{key:q}=U.detail;(q===_e.CONFIG||q==="feature:config")&&B();}window.addEventListener(Me.STORAGE_CHANGE,H),B();let L=N;if(!F.isTabVisible(N)){const U=F.getVisibleTabs();U.length>0&&(L=U[0]);}L&&O.activate(L);const $=jO({panel:S,onToggle:()=>T(!S.classList.contains("open")),onClose:()=>T(false),toggleCombo:p,closeOnEscape:f}),A=()=>{F.recalc();const U=parseInt(getComputedStyle(x).getPropertyValue("--w"))||n;P.calculateResponsiveBounds(),P.setHudWidth(U);};V.addEventListener("resize",A);const M=U=>{const q=U.detail?.width;q?P.setHudWidth(q):P.setHudWidth(n),F.recalc();};x.addEventListener("gemini:layout-resize",M);function X(){window.removeEventListener(Me.STORAGE_CHANGE,H),$.destroy(),P.destroy(),V.removeEventListener("resize",A),x.removeEventListener("gemini:layout-resize",M);}return {host:x,shadow:b,wrapper:k,panel:S,content:E,setOpen:T,setWidth:P.setHudWidth,sections:R,manager:O,nav:F,destroy:X}}const Po={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},jr={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function x$(){return {isOpen:ye(Po.isOpen,jr.isOpen),width:ye(Po.width,jr.width),theme:ye(Po.theme,jr.theme),activeTab:ye(Po.activeTab,jr.activeTab)}}function Va(e,t){we(Po[e],t);}function y$(e,t){return ye(Po[e],t)}const v$="https://i.imgur.com/IMkhMur.png",w$="Stats";function C$(e){let t=e.iconUrl||v$;const n=e.ariaLabel||"Open MGH";let o=null,r=null,i=null,a=false,s=null,l=null;const c=["Chat","Leaderboard","Stats","Open Activity Log"],d=E=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(E):E.replace(/"/g,'\\"')}catch{return E}};function u(){const E=document.querySelector(c.map(w=>`button[aria-label="${d(w)}"]`).join(","));if(!E)return null;let v=E.parentElement;for(;v&&v!==document.body;){if(c.reduce((k,y)=>k+v.querySelectorAll(`button[aria-label="${d(y)}"]`).length,0)>=2)return v;v=v.parentElement;}return null}function f(E){const v=Array.from(E.querySelectorAll("button[aria-label]"));if(!v.length)return {refBtn:null,refWrapper:null};const w=v.filter(O=>O.dataset.mghBtn!=="true"&&(O.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=w.length?w:v,y=k.find(O=>(O.getAttribute("aria-label")||"").toLowerCase()===w$.toLowerCase())||null,T=k.length>=2?k.length-2:k.length-1,I=y||k[T],P=I.parentElement,R=P&&P.parentElement===E&&P.tagName==="DIV"?P:null;return {refBtn:I,refWrapper:R}}function g(E,v,w){const k=E.cloneNode(false);k.type="button",k.setAttribute("aria-label",v),k.title=v,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");const y=document.createElement("img");return y.src=w,y.alt="MGH",y.style.pointerEvents="none",y.style.userSelect="none",y.style.width="76%",y.style.height="76%",y.style.objectFit="contain",y.style.display="block",y.style.margin="auto",k.appendChild(y),k.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();try{e.onClick?.();}catch{}}),k}function h(){if(a)return  false;a=true;let E=false;try{const v=u();if(!v)return !1;s!==v&&(s=v);const{refBtn:w,refWrapper:k}=f(v);if(!w)return !1;r=v.querySelector('div[data-mgh-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),E=!0);const y=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=y),o||(o=g(w,n,t),r?r.appendChild(o):o.parentElement!==v&&v.appendChild(o),E=!0),r&&r.parentElement!==v&&(v.appendChild(r),E=!0);const T=v;if(T&&T!==l){try{S.disconnect();}catch{}l=T,S.observe(l,{childList:!0,subtree:!0});}return E}finally{a=false;}}const x=document.getElementById("App")||document.body;let b=null,C=false;const S=new MutationObserver(()=>{C&&o&&document.contains(o)||(o&&!document.contains(o)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),C=false,o=null,r=null),b===null&&(b=window.setTimeout(()=>{if(b=null,h()&&o&&document.contains(o)&&(C=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),r)){const v=r.parentElement;v&&v.lastElementChild!==r&&v.appendChild(r);}},100)));});return h()&&o&&document.contains(o)?(C=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),S.observe(x,{childList:true,subtree:true}),i=()=>S.disconnect(),()=>{try{i?.();}catch{}try{r?.remove();}catch{}}}const tv=[];function S$(){return tv.slice()}function Xg(e){tv.push(e);}function k$(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function _$(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Gc=Symbol.for("ariesmod.ws.handlers.patched");function je(e,t){if(typeof e=="string"){const r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return Xg(i),i}const n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Xg(o),o}function E$(e,t=S$(),n={}){const o=n.pageWindow??window,r=!!n.debug;if(e[Gc])return ()=>{};e[Gc]=true;const i={ws:e,pageWindow:o,debug:r},a=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,i)===!0)return}catch(f){r&&console.error("[WS] handler error",f,u);}},s=u=>{const p=_$(u.data),f=k$(p);a({kind:"message",raw:u.data,data:p,type:f});},l=u=>{a({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},c=u=>a({kind:"open",event:u}),d=u=>a({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",c),e.addEventListener("error",d),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",l);}catch{}try{e.removeEventListener("open",c);}catch{}try{e.removeEventListener("error",d);}catch{}try{delete e[Gc];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();je(Tt.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});je(Tt.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});je(Tt.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});je(Tt.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});je(Tt.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});je(Tt.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});je(Tt.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});je(Tt.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});je(Tt.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});je(Tt.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});je(on.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});je(on.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});je(on.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});je(on.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});je(on.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});je(on.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});je(on.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});je(on.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});le(K.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));le(K.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));le(K.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));le(K.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));le(K.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));le(K.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));le(K.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));le(K.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));le(K.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));le(K.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));le(K.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));le(K.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));le(K.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));le(K.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));le(K.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));le(K.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));le(K.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));le(K.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));le(K.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));le(K.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));le(K.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));le(K.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));le(K.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));le(K.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));le(K.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));le(K.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));le(K.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));le(K.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));le(K.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));le(K.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));le(K.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");le(K.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));le(K.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));le(K.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));le(K.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));le(K.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));le(K.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));le(K.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));le(K.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));le(K.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));le(K.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));le(K.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));le(K.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));le(K.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));le(K.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));le(K.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));le(K.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function T$(e={}){const t=e.pageWindow??V,n=e.pollMs??500,o=!!e.debug,r=[];r.push(a_(t,{debug:o})),r.push(JL({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=E$(s,e.handlers,{debug:o,pageWindow:t}));};return a(Gs(t).ws),r.push(ob(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>Gs(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let qa=null;function A$(e={}){return qa||(qa=T$(e),qa)}const nv=768,Yg=6,Hc=62,jc=50,I$=.5,P$=.4,Ka=36,Xa=28,L$=6,eu=4,M$=8,R$=100,N$=200,Jg=14,Qg=3,O$=40,$$=50,Zg=2147483646,Ur="gemini-bulk-favorite-sidebar",D$="gemini-bulk-favorite-top-row",F$="gemini-bulk-favorite-bottom-row",tu="gemini-qol-bulkFavorite-styles",B$=`
/* Desktop: vertical scrollable list next to inventory */
#${Ur} {
  display: flex;
  flex-direction: column;
  gap: ${L$}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Zg};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${eu}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Zg};
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

#${Ur}::-webkit-scrollbar {
  width: 4px;
}

#${Ur}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${Ur}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${Hc}px;
  height: ${Hc}px;
  min-width: ${Hc}px;
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
  width: ${jc}px;
  height: ${jc}px;
  min-width: ${jc}px;
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
  width: ${Ka}px;
  height: ${Ka}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${Xa}px;
  height: ${Xa}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Qg}px;
  right: ${Qg}px;
  width: ${Jg}px;
  height: ${Jg}px;
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
  width: ${Ka}px;
  height: ${Ka}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${Xa}px;
  height: ${Xa}px;
  font-size: 14px;
}
`,z$='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',G$='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function H$(e){const{species:t,itemCount:n,isFavorited:o,isMobile:r,onClick:i}=e,a=m("button",{className:`gemini-qol-bulkFavorite-btn${r?" mobile":""}`,title:`${o?"Unfavorite":"Favorite"} all ${n} ${t}`});return a.dataset.species=t,a.appendChild(j$(t,r)),a.appendChild(U$(o)),a.appendChild(W$(t)),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),i();}),a}function j$(e,t){try{if(!Y.isReady()||!Y.has("plant",e))return em(e);const n=t?P$:I$,o=Y.toCanvas("plant",e,{scale:n});return o.className="gemini-qol-bulkFavorite-sprite",o}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),em(e)}}function em(e){return m("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function U$(e){const t=m("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?z$:G$,t}function W$(e){return m("span",{className:"gemini-qol-bulkFavorite-label"},e)}let Nt=null,Ot=null,Rt=null,_s=false,si=null,Wr=false,Wo=null;const nu=[];function Ya(e){nu.push(e);}function V$(){for(const e of nu)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}nu.length=0;}function ov(){return window.innerWidth<=nv}function q$(e){return new Promise(t=>setTimeout(t,e))}function rv(){if(_s)return;if(document.getElementById(tu)){_s=true;return}const e=document.createElement("style");e.id=tu,e.textContent=B$,document.head.appendChild(e),_s=true;}function K$(){document.getElementById(tu)?.remove(),_s=false;}function X$(){const e=At().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const r of e.items){const i=r;if(i.itemType!=="Produce")continue;const a=i.species,s=i.id;if(!a||!s)continue;const l=n.get(a);l?l.push(s):n.set(a,[s]);}const o=[];for(const[r,i]of n){const a=i.length>0&&i.every(s=>t.has(s));o.push({species:r,itemIds:i,allFavorited:a});}return o.sort((r,i)=>r.species.localeCompare(i.species)),o}async function Y$(e){const t=At().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),o=[];for(const a of t.items){const s=a;if(s.itemType!=="Produce"||s.species!==e)continue;const l=s.id;l&&o.push({id:l,favorited:n.has(l)});}if(o.length===0)return;const r=o.every(a=>a.favorited),i=r?o.filter(a=>a.favorited):o.filter(a=>!a.favorited);console.log(`🔄 [BulkFavorite] ${r?"Unfavoriting":"Favoriting"} ${i.length}/${o.length} ${e}`);for(const a of i)kl(a.id),await q$(O$);}function ou(e,t){const{species:n,itemIds:o,allFavorited:r}=e;return H$({species:n,itemCount:o.length,isFavorited:r,isMobile:t,onClick:()=>Y$(n)})}function J$(e){const t=m("div",{id:Ur}),n=e.getBoundingClientRect(),o=Math.max(window.innerHeight-R$,N$);return t.style.maxHeight=`${o}px`,t.style.position="fixed",t.style.left=`${n.right+M$}px`,t.style.top=`${n.top}px`,t}function tm(e,t,n){const o=m("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),r=t.getBoundingClientRect();return n==="top"?o.style.bottom=`${window.innerHeight-r.top+eu}px`:o.style.top=`${r.bottom+eu}px`,o.style.left=`${r.left}px`,o.style.maxWidth=`${r.width}px`,o}function nm(){const e=X$();ov()?Z$(e):Q$(e);}function Q$(e){if(Nt){if(Nt.innerHTML="",e.length===0){Nt.style.display="none";return}Nt.style.display="flex";for(const t of e)Nt.appendChild(ou(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function Z$(e){if(!Ot||!Rt)return;if(Ot.innerHTML="",Rt.innerHTML="",e.length===0){Ot.style.display="none",Rt.style.display="none";return}Ot.style.display="flex";const t=e.slice(0,Yg),n=e.slice(Yg);for(const o of t)Ot.appendChild(ou(o,true));if(n.length>0){Rt.style.display="flex";for(const o of n)Rt.appendChild(ou(o,true));}else Rt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function e5(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=nv)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const o=window.innerWidth/2;let r=null,i=0;const a=e.querySelectorAll(".McFlex, .McGrid");for(const s of a){const l=s.getBoundingClientRect();if(l.width<200||l.height<200||l.width>window.innerWidth-100)continue;const c=l.left+l.width/2,d=1-Math.abs(c-o)/o,p=l.width*l.height*d;p>i&&(r=s,i=p);}if(r){const s=r.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),r}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let Vo=null;function ru(){Vo&&clearTimeout(Vo),Vo=setTimeout(()=>{t5();},$$);}function t5(){const e=e5();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),li(),rv(),si=e,ov()?(Ot=tm(D$,e,"top"),Rt=tm(F$,e,"bottom"),document.body.appendChild(Ot),document.body.appendChild(Rt)):(Nt=J$(e),document.body.appendChild(Nt)),nm(),Wo&&Wo(),Wo=At().subscribeFavorites(()=>{Wr&&nm();});}function li(){Vo&&(clearTimeout(Vo),Vo=null),Wo&&(Wo(),Wo=null),Nt?.remove(),Nt=null,Ot?.remove(),Ot=null,Rt?.remove(),Rt=null,si=null;}function n5(){li();}async function iu(){if(!Ji().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}rv();const t=await ml.onChangeNow(r=>{const i=r==="inventory";i!==Wr&&(Wr=i,i?ru():li());}),n=Gl(".McGrid",()=>{Wr&&(Nt||Ot||ru());}),o=Hl(".McGrid",r=>{si&&si===r&&li();});Ya(()=>t()),Ya(()=>n.disconnect()),Ya(()=>o.disconnect()),Ya(()=>{li(),Wr=false,si=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function au(){V$(),K$(),console.log("🛑 [BulkFavorite] Stopped");}function o5(e){const t=Ji();t.enabled=e,e?iu():au();}let Ja=false;const r5={init(){Ja||(iu(),Ja=true);},destroy(){Ja&&(au(),Ja=false);},isEnabled(){return Kb()},renderButton:ru,removeButton:n5,startWatching:iu,stopWatching:au,setEnabled:o5},i5=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,a5=`
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
`;let om=false;function s5(){if(om)return;om=true;const e=document.createElement("style");e.textContent=a5,document.head.appendChild(e);}const rm=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],im=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function l5(){const e=document.querySelector(rm.map(n=>`button[aria-label="${im(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(rm.reduce((o,r)=>o+t.querySelectorAll(`button[aria-label="${im(r)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function c5(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(s=>s.dataset.alertBtn!=="true"&&(s.getAttribute("aria-label")||"")!=="Alerts"),o=n.length?n:t,r=o[o.length-1]||null,i=r?.parentElement,a=i&&i.parentElement===e&&i.tagName==="DIV"?i:null;return {refBtn:r,refWrapper:a}}function d5(e,t,n){const o=e.cloneNode(false);o.type="button",o.setAttribute("aria-label",t),o.title=t,o.dataset.alertBtn="true",o.style.pointerEvents="auto",o.style.position="relative",o.removeAttribute("id");const r=document.createElement("div");return r.innerHTML=n,r.dataset.alertIcon="true",r.style.pointerEvents="none",r.style.userSelect="none",r.style.width="76%",r.style.height="76%",r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.margin="auto",o.appendChild(r),o}function u5(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function p5(e){s5();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:i5,n=e.ariaLabel||"Alerts";let o=null,r=null,i=null,a=null,s=false,l=null,c=null,d=null;function u(){if(s)return  false;s=true;let b=false;try{const C=l5();if(!C)return !1;l!==C&&(l=C);const{refBtn:S,refWrapper:_}=c5(C);if(!S)return !1;r=C.querySelector('div[data-alert-wrapper="true"]'),!r&&_&&(r=_.cloneNode(!1),r.dataset.alertWrapper="true",r.removeAttribute("id"),b=!0);const E=r?.querySelector('button[data-alert-btn="true"]')||null;o||(o=E),o||(o=d5(S,n,t),o.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();try{e.onClick?.();}catch{}}),i=u5(),o.appendChild(i),r?r.appendChild(o):o.parentElement!==C&&C.appendChild(o),b=!0),r&&r.parentElement!==C&&(C.appendChild(r),b=!0);const v=C;if(v&&v!==c){try{h.disconnect();}catch{}c=v,h.observe(c,{childList:!0,subtree:!0});}return b}finally{s=false;}}const p=document.getElementById("App")||document.body;let f=null,g=false;const h=new MutationObserver(()=>{g&&o&&document.contains(o)||(o&&!document.contains(o)&&(g=false,o=null,i=null,r=null),f===null&&(f=window.setTimeout(()=>{if(f=null,u()&&o&&document.contains(o)&&(g=true,r)){const C=r.parentElement;C&&C.lastElementChild!==r&&C.appendChild(r);}},100)));});return u()&&o&&document.contains(o)&&(g=true),h.observe(p,{childList:true,subtree:true}),a=()=>h.disconnect(),{get root(){return o},updateBadge(b){i&&(b>0?(i.textContent=String(b),i.style.display="flex"):i.style.display="none");},ring(){if(!o)return;const b=o.querySelector('[data-alert-icon="true"]');b&&(b.classList.add("alert-btn-ringing"),setTimeout(()=>{b?.classList.remove("alert-btn-ringing");},600));},startRinging(){o&&(d!==null&&clearInterval(d),this.ring(),d=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(d!==null&&(clearInterval(d),d=null),o){const b=o.querySelector('[data-alert-icon="true"]');b&&b.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{a?.();}catch{}try{r?.remove();}catch{}}}}const f5=`
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
`;function g5(e,t){const n=m("div",{className:"alert-item-row"}),o=m("div",{className:"alert-item-sprite"});if(e.spriteId)try{const c=Y.toCanvas(e.spriteId,{scale:.35});c?o.appendChild(c):o.textContent="?";}catch{o.textContent="?";}else o.textContent="?";const r=m("div",{className:"alert-item-info"}),i=m("div",{className:"alert-item-name"},e.itemName),a=m("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);r.appendChild(i),r.appendChild(a);const s=m("div",{className:"alert-item-actions"}),l=m("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return l.addEventListener("click",c=>{c.stopPropagation(),t?.(e);}),s.appendChild(l),n.appendChild(o),n.appendChild(r),n.appendChild(s),n}function m5(){const e=m("div",{className:"alert-overlay-empty"}),t=m("div",{className:"alert-overlay-empty-icon"},"🔔"),n=m("div",{className:"alert-overlay-empty-text"},"No items available"),o=m("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(o),e}function am(e,t){const n=t.getBoundingClientRect(),o=340,r=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let i=n.bottom+r,a=window.innerWidth-n.right;const s=i+480>window.innerHeight,l=n.right-o<r;s?(e.style.bottom=`${window.innerHeight-n.top+r}px`,e.style.top="auto"):e.style.top=`${i}px`,e.style.right=`${a}px`,l&&(e.style.right="auto",e.style.left=`${r}px`);}function h5(e){const{items:t,anchorElement:n,onClose:o,onBuyAll:r}=e,i=m("div",{className:"alert-overlay"}),a=y$("theme",jr.theme),s=Lo[a];let l="";s&&(l=`.alert-overlay {
    ${Object.entries(s).map(([C,S])=>`${C}: ${S};`).join(`
    `)}
  }

`);const c=document.createElement("style");c.textContent=l+f5,i.appendChild(c);const d=m("div",{className:"alert-overlay-header"}),u=m("div",{className:"alert-overlay-title"},"Available Items"),p=m("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");p.addEventListener("click",b=>{b.stopPropagation(),o?.();}),d.appendChild(u),d.appendChild(p);const f=m("div",{className:"alert-overlay-list"});i.appendChild(d),i.appendChild(f);const g=b=>{if(f.replaceChildren(),b.length===0)f.appendChild(m5());else for(const C of b){const S=g5(C,r);f.appendChild(S);}};g(t),am(i,n);const h=()=>{am(i,n);};window.addEventListener("resize",h);const x=b=>{const C=b.target;!i.contains(C)&&!n.contains(C)&&o?.();};return document.addEventListener("click",x,{capture:true}),{root:i,updateItems:g,destroy(){window.removeEventListener("resize",h),document.removeEventListener("click",x,{capture:true}),i.remove();}}}const b5={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},x5={seed:"seed",tool:null,egg:null,decor:null};function iv(e,t,n){try{const o=b5[t],r=J.get(o);if(!r||typeof r!="object")return null;const i=r[e];if(!i||typeof i!="object")return null;const a=x5[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch{return null}}function y5(e,t){return iv(e,t,"spriteId")}function v5(e,t){return iv(e,t,"name")??e}function w5(e,t){const n=ao.getTrackedItems(),o=new Set(n.filter(i=>i.shopType===e).map(i=>i.itemId));return o.size===0?[]:t.items.filter(i=>{const a=o.has(i.id),s=i.isAvailable;return a&&s}).map(i=>({shopType:e,itemId:i.id,itemName:v5(i.id,e),spriteId:y5(i.id,e),remaining:i.remaining,price:i.price}))}function Vr(){const t=lr().get(),n=["seed","tool","egg","decor"],o=[];for(const r of n){const i=t.byType[r];if(i){const a=w5(r,i);o.push(...a);}}return o}function C5(e){return lr().subscribeStable(()=>{const o=Vr();e(o);})}function S5(){let e=null,t=null,n=null,o=false,r=[],i=[],a="",s=0,l=0,c=false,d=null,u=[],p=0,f=false;const g=()=>{try{return Oe.CustomSounds.getNotificationConfig("shop")}catch{return null}},h=(L,$)=>{try{const A=de.getItemCustomSound("shop",L,$);return A?{soundId:A.soundId,volume:A.volume,mode:A.mode}:null}catch{return null}},x=L=>`${L.soundId}:${L.volume}`,b=(L,$,A,M)=>{$.has(A)||(L.push({soundId:A,volume:M}),$.add(A));},C=(L,$)=>{const A=[],M=new Set;let X=false;const U=[];for(const q of L){const Z=h(q.itemId,q.shopType);Z?Z.mode==="one-shot"&&U.push({soundId:Z.soundId,volume:Z.volume}):$?.mode==="one-shot"&&(X=true);}X&&$&&b(A,M,$.soundId,$.volume);for(const q of U)b(A,M,q.soundId,q.volume);return A},S=(L,$)=>{const A=[],M=new Set;let X=false;const U=[];for(const q of L){const Z=h(q.itemId,q.shopType);Z?Z.mode==="loop"&&U.push({soundId:Z.soundId,volume:Z.volume}):$?.mode==="loop"&&(X=true);}X&&$&&b(A,M,$.soundId,$.volume);for(const q of U)b(A,M,q.soundId,q.volume);return A},_=(L,$,A,M=false)=>{if(!A())return;const X=de.getById(L.soundId);if(!X){$();return}M&&(d=X.source),Oe.playCustom(X.source,{volume:L.volume/100}).then(U=>{if(!A())return;const q=U.audio,Z=()=>{A()&&$();};q.addEventListener("ended",Z,{once:true});}).catch(()=>{A()&&$();});},E=()=>{if(!c||i.length===0)return;const L=i[s];s=(s+1)%i.length;const $=l,A=()=>c&&l===$;_(L,()=>{A()&&E();},A,true);},v=()=>{c||i.length===0||(c=true,s>=i.length&&(s=0),E());},w=()=>{if(c){l+=1,c=false;try{const L=Oe.getCustomHandle();(!d||L&&L.url===d)&&Oe.CustomSounds.stop();}catch{}d=null;}},k=()=>{w(),i=[],a="",s=0,d=null;},y=()=>{if(u.length===0){f=false,v();return}f=true;const L=u.shift(),$=p,A=()=>f&&p===$;_(L,()=>{A()&&y();},A);},T=(L,$)=>{const A=$??g(),M=C(L,A);if(M.length===0)return;const X=new Set(u.map(U=>U.soundId));for(const U of M)X.has(U.soundId)||(u.push(U),X.add(U.soundId));f||(p+=1,w(),y());},I=(L,$)=>{const A=$??g(),M=S(L,A);if(M.length===0){k();return}const X=M.map(x).join("|"),U=X!==a;i=M,a=X,U&&(s=0,c&&w()),!f&&(c||v());},P=L=>{const $=r.length>0,A=L.length>0;r=L,e?.updateBadge(L.length),A?$||e?.startRinging():$&&e?.stopRinging();},R=()=>{if(o||!e?.root)return;const L=Vr();t=h5({items:L,anchorElement:e.root,onClose:O,onBuyAll:$=>{switch($.shopType){case "seed":Un.seed.buyAll($.itemId);break;case "egg":Un.egg.buyAll($.itemId);break;case "decor":Un.decor.buyAll($.itemId);break;case "tool":Un.tool.buyAll($.itemId);break}}}),document.body.appendChild(t.root),o=true;},O=()=>{!o||!t||(t.destroy(),t=null,o=false);},W=()=>{o?O():R();},N=L=>{if(P(L),o&&t&&t.updateItems(L),I(L),L.length>0){const $=new CustomEvent("gemini:alert-available",{detail:{items:L}});window.dispatchEvent($);}},F=()=>{const L=Vr(),$=new Set(r.map(U=>`${U.shopType}:${U.itemId}`)),A=L.filter(U=>!$.has(`${U.shopType}:${U.itemId}`)),M=A.length>0;P(L),o&&t&&t.updateItems(L);const X=g();I(L,X),M&&T(A,X);};e=p5({onClick:W,ariaLabel:"Alerts"}),n=C5(N),window.addEventListener("gemini:tracked-items-changed",F);const G=L=>{const $=L,{shopType:A,items:M}=$.detail;if(!M||M.length===0)return;const X=M.map(U=>({itemId:U.itemId,shopType:A}));T(X,g());};window.addEventListener("gemini:shop-restock-tracked",G);const B=L=>{if(L.detail?.entityType!=="shop")return;const A=Vr();I(A,g());};window.addEventListener(Me.CUSTOM_SOUND_CHANGE,B);const H=(L=1,$=10)=>{if(lr().get().all.some(U=>U.items.length>0)||L>=$){const U=Vr();P(U);const q=g();I(U,q),U.length>0&&T(U,q);}else setTimeout(()=>H(L+1,$),500);};return H(),{destroy(){O(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",F),window.removeEventListener("gemini:shop-restock-tracked",G),window.removeEventListener(Me.CUSTOM_SOUND_CHANGE,B),e?.destroy(),e=null,u=[],p+=1,f=false,k();}}}const k5=`
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
`,Uc={seed:"SeedSilo",pet:"PetHutch",decor:"DecorShed"};function sm(e){return Array.isArray(e)?e.filter(t=>typeof t=="object"&&t!==null&&"items"in t):[]}function _5(e){if(typeof e=="string")return e;if(e&&typeof e=="object"&&"decorId"in e){const t=e.decorId;return typeof t=="string"?t:null}return null}function Wc(e,t){return e.filter(o=>_5(o.decorId)===t).flatMap(o=>o.items??[])}function lm(e){if(!e.length)return 0;const t=J.get("plants");return t?e.reduce((n,o)=>{const i=t[o.species]?.seed?.coinPrice??0;return n+i*(o.quantity??0)},0):0}function cm(e){if(!e.length)return 0;const t=J.get("decor");return t?e.reduce((n,o)=>{const i=t[o.decorId]?.coinPrice??0;return n+i*(o.quantity??0)},0):0}function E5(e){const t=J.get("pets");if(!t)return 0;const n=t[e.petSpecies],o=n?.maturitySellPrice??n?.sellPrice??0,r=Gi(e.petSpecies,e.targetScale),i=Hi(e.petSpecies,e.xp,r),s=fb(i,r)*e.targetScale,l=Xu(e.mutations??[]);return Math.round(o*s*l)}function dm(e){return e.length?e.reduce((t,n)=>t+E5(n),0):0}function T5(){return {async start(e){const t=[],n=(l,c)=>{const d=Wc(l,Uc.seed).filter(g=>g.itemType==="Seed"),u=lm(d),p=c.filter(g=>g.itemType==="Seed"),f=lm(p);e({kind:"seed",storageValue:u,inventoryValue:f,totalValue:u+f});},o=(l,c)=>{const d=Wc(l,Uc.decor).filter(g=>g.itemType==="Decor"),u=cm(d),p=c.filter(g=>g.itemType==="Decor"),f=cm(p);e({kind:"decor",storageValue:u,inventoryValue:f,totalValue:u+f});},r=(l,c)=>{const d=Wc(l,Uc.pet).filter(g=>g.itemType==="Pet"),u=dm(d),p=c.filter(g=>g.itemType==="Pet"),f=dm(p);e({kind:"pet",storageValue:u,inventoryValue:f,totalValue:u+f});},i=l=>{const c=sm(l?.storages??[]),d=l?.items??[];n(c,d),o(c,d),r(c,d);},a=l=>{const c=sm(l);n(c,[]),o(c,[]),r(c,[]);};let s=null;try{s=await xe.subscribeImmediate("myInventoryAtom",i);}catch(l){console.warn("[StorageValueIndicator] Failed to subscribe myInventoryAtom",l);try{s=await xe.subscribeImmediate("myItemStoragesAtom",a);}catch(c){console.warn("[StorageValueIndicator] Failed to subscribe myItemStoragesAtom",c);}}return s&&t.push(s),()=>{for(const l of t)try{l();}catch{}t.length=0;}}}}const A5={seed:"Seeds in Silo",pet:"Pets in Hutch",decor:"Decor in Shed"},um="gemini-qol-storageValue-styles",I5="gemini-qol-storageValue",av="gemini-qol-storageValue-text",P5={seedSilo:"seed",petHutch:"pet",decorShed:"decor"};let Zt=qe(),Ni=false,Es=false,so=null,su=null,mt=null,ci="",Qa=null,en={seed:{storage:0,inventory:0,total:0},pet:{storage:0,inventory:0,total:0},decor:{storage:0,inventory:0,total:0}},Jn=null;function sv(){if(Es)return;if(document.getElementById(um)){Es=true;return}const e=document.createElement("style");e.id=um,e.textContent=k5,document.head.appendChild(e),Zt.add(()=>e.remove()),Es=true;}function Up(){mt?.remove(),mt=null,su=null,ci="";}function lu(e){if(!mt)return;const t=mt.querySelector(`.${av}`);t&&(t.textContent=cv(e),mt.dataset.rawValue=String(Math.round(e)),mt.title=`${e.toLocaleString()} coins`);}function Ts(){if(!mt||!so)return;const e=en[so];mt.dataset.rawValue=String(Math.round(e.total)),mt.title=`${e.storage.toLocaleString()} + ${e.inventory.toLocaleString()}`;}function lv(){const e=en.seed,t=en.pet,n=en.decor;return `${e.storage}|${e.inventory}|${e.total}|${t.storage}|${t.inventory}|${t.total}|${n.storage}|${n.inventory}|${n.total}`}function L5(e){const t=document.createElement("div");t.className=I5,t.dataset.rawValue=String(Math.round(e)),t.title=`${e.toLocaleString()} coins`;const n=document.createElement("div");n.className="gemini-qol-storageValue-sprite";const o=document.createElement("canvas");o.width=20,o.height=20,n.appendChild(o);const r=document.createElement("div");r.className=av,r.textContent=cv(e),t.appendChild(n),t.appendChild(r);try{const i=Y.toCanvas("ui","Coin");if(i){const a=o.getContext("2d");if(a){const s=Math.min(o.width/i.width,o.height/i.height),l=i.width*s,c=i.height*s,d=(o.width-l)/2,u=(o.height-c)/2;a.drawImage(i,d,u,l,c);}}}catch(i){console.warn("[StorageValueIndicator] Failed to render coin sprite:",i);}return t}function cv(e){const t=Math.round(e);if(t>=1e15)return `${(t/1e15).toFixed(2)}Q`;if(t>=1e12)return `${(t/1e12).toFixed(2)}T`;if(t>=1e9)return `${(t/1e9).toFixed(2)}B`;if(t>=1e6)return `${(t/1e6).toFixed(2)}M`;if(t>=1e3){const n=t/1e3;return n>=100?`${Math.round(n)}K`:`${n.toFixed(1)}K`}return String(t)}function As(e){const t=A5[e],n=document.querySelectorAll(".chakra-text, p, span");for(const o of n){if(o.textContent?.trim()!==t||!o.offsetParent)continue;const i=o.closest(".McGrid");if(!(!i||!i.querySelector(".McFlex")))return i}return null}function dv(){return As("seed")?"seed":As("pet")?"pet":As("decor")?"decor":null}function M5(e){const t=As(e);if(!t)return;const n=lv();if(t===su&&mt?.isConnected){n!==ci&&(ci=n,lu(en[e].total),Ts()),lu(en[e].total),Ts();return}Up(),su=t;const o=L5(en[e].total);mt=o,ci=n,Ts();const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="flex-start",r.style.position="relative",r.style.minHeight="20px",r.appendChild(o),t.insertBefore(r,t.firstChild),Zt.add(()=>r.remove());}function cu(e){if(e!==so){if(so=e,!e){Up();return}sv(),M5(e);}}async function R5(){if(Qa)return;Qa=await T5().start(({kind:t,storageValue:n,inventoryValue:o,totalValue:r})=>{en[t]={storage:n,inventory:o,total:r},so===t&&mt&&(ci=lv(),lu(r),Ts());}),Zt.add(()=>{Qa?.(),Qa=null;});}function Is(){const e=so??dv();cu(e);}function N5(){Jn!==null&&clearTimeout(Jn),Jn=window.setTimeout(()=>{Jn=null,cr()||Ht(()=>Is());},200);}function O5(){setTimeout(Is,100),setTimeout(Is,400),setTimeout(Is,800);const e=new MutationObserver(()=>{cr()||N5();});e.observe(document.body,{childList:true,subtree:true}),fo(Zt,e),Zt.add(()=>{Jn!==null&&(clearTimeout(Jn),Jn=null);});}function $5(){Ni||(Ni=true,sv(),R5(),ml.onChangeNow(e=>{const t=e?P5[String(e)]??null:null;if(t){cu(t);return}const n=dv();cu(n);}).then(e=>{Zt.add(()=>e());}),O5());}function D5(){Ni&&(Ni=false,Up(),Zt.run(),Zt.clear(),Zt=qe(),Es=false,so=null,en={seed:{storage:0,inventory:0,total:0},pet:{storage:0,inventory:0,total:0},decor:{storage:0,inventory:0,total:0}});}function F5(){return Ni}const B5={init:$5,destroy:D5,isEnabled:F5};function z5(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=ob(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),A$({debug:false}),()=>{t?.(),t=null;}}async function G5(e){e.logStep("Atoms","Prewarming Jotai store...");try{await hh(),await gl({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function H5(e){e.logStep("Globals","Initializing global variables...");try{yb(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function j5(e){e.logStep("API","Exposing Gemini API...");try{GN(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Vc(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function U5(e){e.logStep("HUD","Loading HUD preferences..."),await Vc();const t=x$();await Vc();const n=await b$({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Va("width",o),onOpenChange:o=>Va("isOpen",o),themes:Lo,initialTheme:t.theme,onThemeChange:o=>Va("theme",o),buildSections:o=>BO({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme,setHUDWidth:o.setHUDWidth,setHUDOpen:o.setHUDOpen}),initialTab:t.activeTab,onTabChange:o=>Va("activeTab",o)});return await Vc(),e.logStep("HUD","HUD ready","success"),n}async function W5(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await vb(o=>{o.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):o.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${o.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function V5(e){try{Y.isReady()||await Y.init(),J.resolveSprites();const t=[],n=J.get("plants");if(n)for(const l of Object.values(n))l?.seed?.spriteId&&t.push(l.seed.spriteId),l?.plant?.spriteId&&t.push(l.plant.spriteId),l?.crop?.spriteId&&t.push(l.crop.spriteId);const o=J.get("pets");if(o)for(const l of Object.values(o))l?.spriteId&&t.push(l.spriteId);const r=J.get("items");if(r)for(const l of Object.values(r))l?.spriteId&&t.push(l.spriteId);const i=J.get("eggs");if(i)for(const l of Object.values(i))l?.spriteId&&t.push(l.spriteId);const a=J.get("decor");if(a)for(const l of Object.values(a))l?.spriteId&&t.push(l.spriteId);const s=[...new Set(t)];s.length>0&&await Y.warmup(s,()=>{},5);}catch(t){console.warn("[Bootstrap] Sprite warmup failed",t);}}async function q5(e){e.logStep("Sections","Preloading UI sections...");try{await zO(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function K5(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:$o.init.bind($o)},{name:"PetTeam",init:pe.init.bind(pe)},{name:"BulkFavorite",init:Td.init.bind(Td)},{name:"XPTracker",init:Pd.init.bind(Pd)},{name:"CropValueIndicator",init:fs.init.bind(fs)},{name:"CropSizeIndicator",init:hs.init.bind(hs)},{name:"ShopNotifier",init:ao.init.bind(ao)},{name:"WeatherNotifier",init:tr.init.bind(tr)},{name:"PetHungerNotifier",init:Ri.init.bind(Ri)},{name:"AriesAPI",init:tl.init.bind(tl)},{name:"HarvestLocker",init:tt.init.bind(tt)},{name:"EggLocker",init:vn.init.bind(vn)},{name:"DecorLocker",init:wn.init.bind(wn)},{name:"MissingVariantsIndicator",init:Ic.init.bind(Ic)},{name:"Journal",init:He.init.bind(He)}];let n=0;for(const o of t)try{o.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(r){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${o.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${o.name} init failed`,r);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const o=Rs();o.register({id:"bulkFavoriteInject",name:"Bulk Favorite Inject",description:"Quick favorite/unfavorite multiple mutations",injection:r5,storageKey:_e.BULK_FAVORITE,defaultEnabled:!1}),o.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:fs.render,storageKey:_e.CROP_VALUE_INDICATOR,defaultEnabled:!1}),o.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:hs.render,storageKey:_e.CROP_SIZE_INDICATOR,defaultEnabled:!1}),o.register({id:"missingVariantsIndicator",name:"Missing Variants",description:"Shows colored letters for unlogged crop variants",injection:Ic.render,storageKey:_e.MISSING_VARIANTS_INDICATOR,defaultEnabled:!1}),o.register({id:"storageValueIndicator",name:"Storage Value",description:"Shows total coin value for storage modals",injection:B5,storageKey:gn.STORAGE_VALUE_INDICATOR,defaultEnabled:!0}),o.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(o){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",o);}}Om();xS();(async function(){_v();const e=mv({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=z5(e),await G5(e),H5(e),j5(e),await W5(e),await Promise.all([(async()=>{K5(e);})(),(async()=>{await V5(e);})()]),await q5(e),e.succeed("Gemini is ready!");}catch(o){e.fail("Failed to initialize the mod.",o);}finally{t?.();}const n=await U5(e);C$({onClick:()=>n.setOpen(true)}),S5();})();

})();