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
  var Qx=Object.defineProperty;var Zx=(e,t,n)=>t in e?Qx(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var U=(e,t,n)=>Zx(e,typeof t!="symbol"?t+"":t,n);function m(e,t=null,...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(const r of n)r==null||r===false||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}const Ki="https://i.imgur.com/k5WuC32.png",Ku="gemini-loader-style",Dn="gemini-loader",fg=80;function ey(){if(document.getElementById(Ku))return;const e=document.createElement("style");e.id=Ku,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Dn} {
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
    #${Dn} {
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

    #${Dn}.gemini-loader--error .gemini-loader__actions {
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
    #${Dn}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Dn}.gemini-loader--error .gemini-loader__spinner {
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
      #${Dn} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function Yi(e,t,n){const o=m("div",{className:`gemini-loader__log ${n}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>fg;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function ty(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Ki);return}GM_xmlhttpRequest({method:"GET",url:Ki,responseType:"blob",onload:t=>{const n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(Ki),o.readAsDataURL(n);},onerror:()=>e(Ki)});})}function ny(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;ey();const n=m("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=m("div",{className:"gemini-loader__logs"}),r=m("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=m("div",{className:"gemini-loader__spinner"},r);ty().then(y=>{r.src=y;});const a=m("div",{className:"gemini-loader__card"},m("div",{className:"gemini-loader__header"},i,m("div",{className:"gemini-loader__titles"},m("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=m("div",{id:Dn},a);(document.body||document.documentElement).appendChild(s);const l=m("div",{className:"gemini-loader__actions"},m("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);const c=y=>{n.textContent=y;},d=new Map,u=(y,x)=>{y.className=`gemini-loader__log ${x}`;};return {log:(y,x="info")=>Yi(o,y,x),logStep:(y,x,w="info")=>{const v=String(y||"").trim();if(!v){Yi(o,x,w);return}const k=d.get(v);if(k){k.el.lastElementChild&&(k.el.lastElementChild.textContent=x),k.tone!==w&&(u(k.el,w),k.tone=w);return}const T=m("div",{className:`gemini-loader__log ${w}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:x}));for(d.set(v,{el:T,tone:w}),o.appendChild(T);o.childElementCount>fg;){const b=o.firstElementChild;if(!b)break;const S=Array.from(d.entries()).find(([,_])=>_.el===b)?.[0];S&&d.delete(S),b.remove();}o.scrollTop=o.scrollHeight;},setSubtitle:c,succeed:(y,x=600)=>{y&&Yi(o,y,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),x);},fail:(y,x)=>{Yi(o,y,"error"),c("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",y,x);}}}const Yu=150,oy=30;function ry(e,t,n){const o=m("div",{className:"lg-pill",id:"pill"}),r=e.map(C=>{const I=m("button",{className:"lg-tab"},C.label);return I.setAttribute("data-target",C.id),I}),i=m("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=new Map(e.map(C=>[C.id,true])),s=new Map(r.map((C,I)=>[e[I].id,C]));function l(C){const I=document.createElementNS("http://www.w3.org/2000/svg","svg");I.setAttribute("viewBox","0 0 24 24"),I.setAttribute("fill","none"),I.setAttribute("stroke","currentColor"),I.setAttribute("stroke-width","2"),I.setAttribute("stroke-linecap","round"),I.setAttribute("stroke-linejoin","round");const O=document.createElementNS("http://www.w3.org/2000/svg","polyline");return O.setAttribute("points",C==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),I.appendChild(O),I}const c=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});c.appendChild(l("left"));const d=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});d.appendChild(l("right"));const p=m("div",{className:"lg-tabs-wrapper"},c,i,d);let f=0,g=0,h=false;function y(){const C=i.scrollLeft>0,I=i.scrollLeft<i.scrollWidth-i.clientWidth-1;c.classList.toggle("disabled",!C),d.classList.toggle("disabled",!I);}c.addEventListener("click",()=>{i.scrollBy({left:-Yu,behavior:"smooth"}),setTimeout(y,300);}),d.addEventListener("click",()=>{i.scrollBy({left:Yu,behavior:"smooth"}),setTimeout(y,300);}),i.addEventListener("wheel",C=>{Math.abs(C.deltaY)>Math.abs(C.deltaX)&&(C.preventDefault(),i.scrollLeft+=C.deltaY,y());},{passive:false});let x=0;i.addEventListener("touchstart",C=>{const I=C.touches[0];f=I.clientX,g=I.clientY,h=false,x=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",C=>{if(h)return;const I=C.touches[0],O=I.clientX-f,z=I.clientY-g;if(Math.abs(z)>Math.abs(O)){h=true;return}Math.abs(O)>oy&&(C.preventDefault(),i.scrollLeft=x-O);},{passive:false}),i.addEventListener("touchend",()=>{y();},{passive:true}),i.addEventListener("scroll",y,{passive:true});function w(C){const I=r.find(O=>O.dataset.target===C)||r[0];I&&requestAnimationFrame(()=>{const O=I.offsetLeft,z=I.offsetWidth;o.style.width=`${z}px`,o.style.transform=`translateX(${O}px)`;const j=i.scrollLeft,W=j,Y=j+i.clientWidth,N=O-12,D=O+z+12;N<W?i.scrollTo({left:N,behavior:"smooth"}):D>Y&&i.scrollTo({left:D-i.clientWidth,behavior:"smooth"}),setTimeout(y,300);});}function v(){for(const[C,I]of a)if(I)return C;return null}function k(C){const I=s.get(C);if(I)if(a.set(C,false),I.style.display="none",S===C){const O=v();O&&_(O);}else b();}function T(C){const I=s.get(C);I&&(a.set(C,true),I.style.display="",b());}function b(){w(S),y();}let S=t||(e[0]?.id??"");function _(C){a.get(C)&&(S=C,r.forEach(I=>I.classList.toggle("active",I.dataset.target===C)),w(C),n(C));}return r.forEach(C=>C.addEventListener("click",()=>_(C.dataset.target))),queueMicrotask(()=>{w(S),y();}),{root:p,activate:_,recalc:b,getActive:()=>S,showTab:T,hideTab:k,isTabVisible:C=>a.get(C)??false,getVisibleTabs:()=>[...a.entries()].filter(([C,I])=>I).map(([C])=>C)}}class Vt{constructor(t){U(this,"id");U(this,"label");U(this,"container",null);U(this,"cleanupFunctions",[]);U(this,"preloadedContent",null);U(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=m("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const o=n?`gemini-section ${n}`:"gemini-section";return m("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=m("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class iy{constructor(t,n,o){U(this,"sections");U(this,"activeId",null);U(this,"container");U(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const xn="gemini:",ay={STATE:"hud:state",THEME:"hud:theme"},sy={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},ly={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},cy={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},Me={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config",HARVEST_LOCKER:"feature:harvestLocker:config",MISSING_VARIANTS_INDICATOR:"feature:missingVariantsIndicator:config",JOURNAL:"feature:journal:config"},mn={ABILITIES_INJECT:"inject:abilitiesInject:config",JOURNAL_HINTS:"inject:journalHints:config",JOURNAL_FILTER_SORT:"inject:journalFilterSort:config",JOURNAL_ALL_TAB:"inject:journalAllTab:config",STORAGE_VALUE_INDICATOR:"inject:storageValueIndicator:config"},dy={AUTO_RELOAD:"dev:auto-reload"},vt={HUD:ay,SECTION:sy,MODULE:ly,GLOBAL:cy,FEATURE:Me,INJECT:mn,DEV:dy},Cn={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change"};function Te(e,t){try{const n=e.startsWith(xn)?e:xn+e,o=GM_getValue(n);return o==null?t:typeof o=="string"?JSON.parse(o):o}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Ee(e,t){try{const n=e.startsWith(xn)?e:xn+e,o=e.startsWith(xn)?e.slice(xn.length):e,r=JSON.stringify(t);GM_setValue(n,r),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:o,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function uy(e){try{const t=e.startsWith(xn)?e:xn+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function py(){try{const e="gemini:",t=[];for(let r=0;r<localStorage.length;r++){const i=localStorage.key(r);i&&i.startsWith(e)&&t.push(i);}for(const r of t)try{const i=localStorage.getItem(r);if(i!==null){const a=JSON.parse(i),s=r.slice(e.length);Ee(s,a),console.log(`[Gemini Storage] Migrated key: ${r}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${r}":`,i);}const n="gemini.sections",o=GM_getValue(n);o!=null&&(Ee("sections",o),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const gg="gemini.sections";function mg(){const e=Te(gg,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function fy(e){Ee(gg,e);}async function gy(e){return mg()[e]}function my(e,t){const n=mg();fy({...n,[e]:t});}function Go(e,t){return {...e,...t??{}}}async function hy(e){const t=await gy(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((c=>JSON.parse(JSON.stringify(c)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){my(e.path,n);}function i(){return n}function a(c){n=e.sanitize?e.sanitize(c):c,r();}function s(c){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof c=="function"?c(u):Object.assign(u,c),n=e.sanitize?e.sanitize(u):u,r();}function l(){r();}return {get:i,set:a,update:s,save:l}}async function ro(e,t){const{path:n=e,...o}=t;return hy({path:n,...o})}let by=0;const Ji=new Map;function Ne(e={},...t){const{id:n,className:o,variant:r="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:l=true,onExpandChange:c,mediaTop:d,title:u,subtitle:p,badge:f,actions:g,footer:h,divider:y=false,tone:x="neutral",stateKey:w}=e,v=m("div",{className:"card",id:n,tabIndex:a?0:void 0});v.classList.add(`card--${r}`,`card--p-${i}`),a&&v.classList.add("card--interactive"),x!=="neutral"&&v.classList.add(`card--tone-${x}`),o&&v.classList.add(...o.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");const k=s?w??n??(typeof u=="string"?`title:${u}`:null):null;let T=!s||l;k&&Ji.has(k)&&(T=!!Ji.get(k));let b=null,S=null,_=null,C=null,I=null;const O=n?`${n}-collapse`:`card-collapse-${++by}`,z=()=>{if(C!==null&&(cancelAnimationFrame(C),C=null),I){const H=I;I=null,H();}},j=(H,G)=>{if(!_)return;z();const q=_;if(q.setAttribute("aria-hidden",String(!H)),!G){q.classList.remove("card-collapse--animating"),q.style.display=H?"":"none",q.style.height="",q.style.opacity="";return}if(q.classList.add("card-collapse--animating"),q.style.display="",H){q.style.height="auto";const M=q.scrollHeight;if(!M){q.classList.remove("card-collapse--animating"),q.style.display="",q.style.height="",q.style.opacity="";return}q.style.height="0px",q.style.opacity="0",q.offsetHeight,C=requestAnimationFrame(()=>{C=null,q.style.height=`${M}px`,q.style.opacity="1";});}else {const M=q.scrollHeight;if(!M){q.classList.remove("card-collapse--animating"),q.style.display="none",q.style.height="",q.style.opacity="";return}q.style.height=`${M}px`,q.style.opacity="1",q.offsetHeight,C=requestAnimationFrame(()=>{C=null,q.style.height="0px",q.style.opacity="0";});}const E=()=>{q.classList.remove("card-collapse--animating"),q.style.height="",H||(q.style.display="none"),q.style.opacity="";};let P=null;const A=M=>{M.target===q&&(P!==null&&(clearTimeout(P),P=null),q.removeEventListener("transitionend",A),q.removeEventListener("transitioncancel",A),I=null,E());};I=()=>{P!==null&&(clearTimeout(P),P=null),q.removeEventListener("transitionend",A),q.removeEventListener("transitioncancel",A),I=null,E();},q.addEventListener("transitionend",A),q.addEventListener("transitioncancel",A),P=window.setTimeout(()=>{I?.();},420);};function W(H){const G=document.createElementNS("http://www.w3.org/2000/svg","svg");return G.setAttribute("viewBox","0 0 24 24"),G.setAttribute("width","16"),G.setAttribute("height","16"),G.innerHTML=H==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',G}function Y(H,G=true,q=true){T=H,v.classList.toggle("card--collapsed",!T),v.classList.toggle("card--expanded",T),b&&(b.dataset.expanded=String(T),b.setAttribute("aria-expanded",String(T))),S&&(S.setAttribute("aria-expanded",String(T)),S.classList.toggle("card-toggle--collapsed",!T),S.setAttribute("aria-label",T?"Replier le contenu":"Deplier le contenu"),S.replaceChildren(W(T?"up":"down"))),s?j(T,q):_&&(_.style.display="",_.style.height="",_.style.opacity="",_.setAttribute("aria-hidden","false")),G&&c&&c(T),k&&Ji.set(k,T);}if(d){const H=m("div",{className:"card-media"});H.append(d),v.appendChild(H);}const N=!!(u||p||f||g&&g.length||s);if(N){b=m("div",{className:"card-header"});const H=m("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const E=m("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&E.append(typeof f=="string"?m("span",{className:"badge"},f):f),H.appendChild(E);}if(p){const E=m("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);H.appendChild(E);}(H.childNodes.length||s)&&b.appendChild(H);const G=m("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),q=m("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(E=>q.appendChild(E)),q.childNodes.length&&G.appendChild(q),s&&(S=m("button",{className:"card-toggle",type:"button",ariaExpanded:String(T),ariaControls:O,ariaLabel:T?"Replier le contenu":"Deplier le contenu"}),S.textContent=T?"▲":"▼",S.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation(),Y(!T);}),G.appendChild(S),b.classList.add("card-header--expandable"),b.addEventListener("click",E=>{const P=E.target;P?.closest(".card-actions")||P?.closest(".card-toggle")||Y(!T);})),G.childNodes.length&&b.appendChild(G),v.appendChild(b);}_=m("div",{className:"card-collapse",id:O,ariaHidden:s?String(!T):"false"}),v.appendChild(_),y&&N&&_.appendChild(m("div",{className:"card-divider"}));const D=m("div",{className:"card-body"});if(D.append(...t),_.appendChild(D),h){y&&_.appendChild(m("div",{className:"card-divider"}));const H=m("div",{className:"card-footer"});H.append(h),_.appendChild(H);}return S&&S.setAttribute("aria-controls",O),Y(T,false,false),k&&Ji.set(k,T),v}let is=false;const as=new Set,ht=e=>{const t=document.activeElement;for(const n of as)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function xy(){is||(is=true,window.addEventListener("keydown",ht,true),window.addEventListener("keypress",ht,true),window.addEventListener("keyup",ht,true),document.addEventListener("keydown",ht,true),document.addEventListener("keypress",ht,true),document.addEventListener("keyup",ht,true));}function yy(){is&&(as.size>0||(is=false,window.removeEventListener("keydown",ht,true),window.removeEventListener("keypress",ht,true),window.removeEventListener("keyup",ht,true),document.removeEventListener("keydown",ht,true),document.removeEventListener("keypress",ht,true),document.removeEventListener("keyup",ht,true)));}let zn=null;const lc=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),zn!==null&&(window.clearTimeout(zn),zn=null),document.removeEventListener("click",lc,true);};function vy(){document.addEventListener("click",lc,true),zn!==null&&window.clearTimeout(zn),zn=window.setTimeout(()=>{document.removeEventListener("click",lc,true),zn=null;},500);}function kn(e){const{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:l,onOpenChange:c}=e,d=m("div",{className:"select",id:t}),u=m("button",{className:"select-trigger",type:"button"}),p=m("span",{className:"select-value"},r),f=m("span",{className:"select-caret"},"▾");u.append(p,f);const g=m("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});d.classList.add(`select--${i}`);let h=false,y=n,x=null,w=!!a;function v(E){return E==null?r:(e.options||o).find(A=>A.value===E)?.label??r}function k(E){p.textContent=v(E),g.querySelectorAll(".select-option").forEach(P=>{const A=P.dataset.value,M=E!=null&&A===E;P.classList.toggle("selected",M),P.setAttribute("aria-selected",String(M));});}function T(E){g.replaceChildren(),E.forEach(P=>{const A=m("button",{className:"select-option"+(P.disabled?" disabled":""),type:"button",role:"option","data-value":P.value,"aria-selected":String(P.value===y),tabindex:"-1"},P.label);P.value===y&&A.classList.add("selected"),P.disabled||A.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),M.pointerType&&M.pointerType!=="mouse"&&vy(),O(P.value,{notify:true}),C();},{capture:true}),g.appendChild(A);});}function b(){u.setAttribute("aria-expanded",String(h)),g.setAttribute("aria-hidden",String(!h));}function S(){const E=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${E.width}px`});}function _(){h||w||(h=true,d.classList.add("open"),b(),S(),document.addEventListener("mousedown",N,true),document.addEventListener("scroll",D,true),window.addEventListener("resize",H),g.focus({preventScroll:true}),s&&(xy(),as.add(d),x=()=>{as.delete(d),yy();}),c?.(true));}function C(){h&&(h=false,d.classList.remove("open"),b(),document.removeEventListener("mousedown",N,true),document.removeEventListener("scroll",D,true),window.removeEventListener("resize",H),u.focus({preventScroll:true}),x?.(),x=null,c?.(false));}function I(){h?C():_();}function O(E,P={}){const A=y;y=E,k(y),P.notify!==false&&A!==E&&l?.(E);}function z(){return y}function j(E){const P=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!P.length)return;const A=P.findIndex(R=>R.classList.contains("active")),M=P[(A+(E===1?1:P.length-1))%P.length];P.forEach(R=>R.classList.remove("active")),M.classList.add("active"),M.focus({preventScroll:true}),M.scrollIntoView({block:"nearest"});}function W(E){(E.key===" "||E.key==="Enter"||E.key==="ArrowDown")&&(E.preventDefault(),_());}function Y(E){if(E.key==="Escape"){E.preventDefault(),C();return}if(E.key==="Enter"||E.key===" "){const P=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");P&&!P.classList.contains("disabled")&&(E.preventDefault(),O(P.dataset.value,{notify:true}),C());return}if(E.key==="ArrowDown"){E.preventDefault(),j(1);return}if(E.key==="ArrowUp"){E.preventDefault(),j(-1);return}}function N(E){d.contains(E.target)||C();}function D(){h&&S();}function H(){h&&S();}function G(E){w=!!E,u.disabled=w,d.classList.toggle("disabled",w),w&&C();}function q(E){e.options=E,T(E),E.some(P=>P.value===y)||(y=null,k(null));}return d.append(u,g),u.addEventListener("pointerdown",E=>{E.preventDefault(),E.stopPropagation(),I();},{capture:true}),u.addEventListener("keydown",W),g.addEventListener("keydown",Y),T(o),n!=null?(y=n,k(y)):k(null),b(),G(w),{root:d,open:_,close:C,toggle:I,getValue:z,setValue:O,setOptions:q,setDisabled:G,destroy(){document.removeEventListener("mousedown",N,true),document.removeEventListener("scroll",D,true),window.removeEventListener("resize",H),x?.(),x=null;}}}function md(e={}){const{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:l=false,disabled:c=false,tooltip:d,hint:u,icon:p,suffix:f,onClick:g}=e,h=m("div",{className:"lg-label-wrap",id:t}),y=m("label",{className:"lg-label",...o?{htmlFor:o}:{},...d?{title:d}:{}});if(p){const O=typeof p=="string"?m("span",{className:"lg-label-ico"},p):p;O.classList?.add?.("lg-label-ico"),y.appendChild(O);}const x=m("span",{className:"lg-label-text"},n);y.appendChild(x);const w=m("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&y.appendChild(w);let v=null;if(f!=null){v=typeof f=="string"?document.createTextNode(f):f;const O=m("span",{className:"lg-label-suffix"});O.appendChild(v),y.appendChild(O);}const k=u?m("div",{className:"lg-label-hint"},u):null;h.classList.add(`lg-label--${a}`),h.classList.add(`lg-label--${i}`),s==="title"&&h.classList.add("lg-label--title"),T(r),c&&h.classList.add("is-disabled"),h.appendChild(y),k&&h.appendChild(k),g&&y.addEventListener("click",g);function T(O){h.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),h.classList.add(`lg-label--${O}`);}function b(O){x.textContent=O;}function S(O){T(O);}function _(O){O&&!w.isConnected&&y.appendChild(w),!O&&w.isConnected&&w.remove(),O?y.setAttribute("aria-required","true"):y.removeAttribute("aria-required");}function C(O){h.classList.toggle("is-disabled",!!O);}function I(O){!O&&k&&k.isConnected?k.remove():O&&k?k.textContent=O:O&&!k&&h.appendChild(m("div",{className:"lg-label-hint"},O));}return {root:h,labelEl:y,hintEl:k,setText:b,setTone:S,setRequired:_,setDisabled:C,setHint:I}}function yr(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Qi(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const o=yr(e);return o&&n.appendChild(o),n}function wy(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Oe(e={}){const{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:l,type:c="button",onClick:d,disabled:u=false,fullWidth:p=false}=e,f=m("button",{className:"btn",id:n});f.type=c,o==="primary"&&f.classList.add("primary"),o==="danger"&&f.classList.add("danger"),r==="sm"&&f.classList.add("btn--sm"),l&&(f.title=l),p&&(f.style.width="100%");const g=wy(),h=i?Qi(i,"left"):null,y=a?Qi(a,"right"):null,x=document.createElement("span");x.className="btn-label";const w=yr(t);w&&x.appendChild(w),!w&&(h||y)&&f.classList.add("btn--icon"),f.appendChild(g),h&&f.appendChild(h),f.appendChild(x),y&&f.appendChild(y);const v=u||s;f.disabled=v,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",d&&f.addEventListener("click",d);const k=f;return k.setLoading=T=>{f.setAttribute("aria-busy",String(!!T)),g.style.display=T?"inline-block":"none",f.disabled=T||u;},k.setDisabled=T=>{f.disabled=T||f.getAttribute("aria-busy")==="true";},k.setLabel=T=>{x.replaceChildren();const b=yr(T);b&&x.appendChild(b),!b&&(h||y)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},k.setIconLeft=T=>{if(T==null){h?.remove();return}h?h.replaceChildren(yr(T)):f.insertBefore(Qi(T,"left"),x);},k.setIconRight=T=>{if(T==null){y?.remove();return}y?y.replaceChildren(yr(T)):f.appendChild(Qi(T,"right"));},k.setVariant=T=>{f.classList.remove("primary","danger"),T==="primary"&&f.classList.add("primary"),T==="danger"&&f.classList.add("danger");},k}function _n(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,l=m("div",{className:"lg-switch-wrap"}),c=m("button",{className:`lg-switch lg-switch--${r}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!o),title:i??"Basculer"}),d=m("span",{className:"lg-switch-track"}),u=m("span",{className:"lg-switch-thumb"});c.append(d,u);let p=null;i&&a!=="none"&&(p=m("span",{className:"lg-switch-label"},i)),p&&a==="left"?l.append(p,c):p&&a==="right"?l.append(c,p):l.append(c);let f=!!n,g=!!o;function h(){c.classList.toggle("on",f),c.setAttribute("aria-checked",String(f)),c.disabled=g,c.setAttribute("aria-disabled",String(g));}function y(C=false){g||(f=!f,h(),C||s?.(f));}function x(C){C.preventDefault(),y();}function w(C){g||((C.key===" "||C.key==="Enter")&&(C.preventDefault(),y()),C.key==="ArrowLeft"&&(C.preventDefault(),k(false)),C.key==="ArrowRight"&&(C.preventDefault(),k(true)));}c.addEventListener("click",x),c.addEventListener("keydown",w);function v(){return f}function k(C,I=false){f=!!C,h(),I||s?.(f);}function T(C){g=!!C,h();}function b(C){if(!C){p&&(p.remove(),p=null);return}p?p.textContent=C:(p=m("span",{className:"lg-switch-label"},C),l.append(p));}function S(){c.focus();}function _(){c.removeEventListener("click",x),c.removeEventListener("keydown",w);}return h(),{root:l,button:c,isChecked:v,setChecked:k,setDisabled:T,setLabel:b,focus:S,destroy:_}}let hg=null,hd=null;function Sy(){return hg}function Cy(e){hg=e,hd=null;}function bg(){return hd}function ky(e){hd=e;}function _y(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function xg(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const r=n.platform.toLowerCase();if(r.includes("windows"))return "windows";if(r.includes("mac"))return "mac";if(r.includes("android"))return "android";if(r.includes("chrome os")||r.includes("cros"))return "chromeos";if(r.includes("linux"))return "linux";if(r.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function yg(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return "Edge";if(r)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Ty(){const e=Sy();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Ay(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function vg(){try{return window.top!==window.self}catch{return  true}}function Ey(){const e=vg(),t=Ay(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Ls(){const e=bg();if(e)return e;const t=Ey(),n=Ty(),o=xg(),r=yg(),i=vg(),a=window.screen||{},s=window.visualViewport,l=Math.round(window.innerWidth||document.documentElement.clientWidth||0),c=Math.round(window.innerHeight||document.documentElement.clientHeight||0),d=Math.round(s?.width??l),u=Math.round(s?.height??c),p=Math.round(a.width||0),f=Math.round(a.height||0),g=Math.round(a.availWidth||p),h=Math.round(a.availHeight||f),y=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,x={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:r,os:o,viewportWidth:l,viewportHeight:c,visualViewportWidth:d,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:h,dpr:y,orientation:_y()};return ky(x),x}function Iy(){return Ls().surface==="discord"}function Py(){return Ls().platform==="mobile"}function My(){Ls();}function Ly(){return bg()!==null}const ot={init:My,isReady:Ly,detect:Ls,isDiscord:Iy,isMobile:Py,detectOS:xg,detectBrowser:yg,setPlatformOverride:Cy};let ss=false;const vr=new Set;function Ry(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const bt=e=>{const t=Ry();if(t){for(const n of vr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ny(){ss||(ss=true,window.addEventListener("keydown",bt,true),window.addEventListener("keypress",bt,true),window.addEventListener("keyup",bt,true),document.addEventListener("keydown",bt,true),document.addEventListener("keypress",bt,true),document.addEventListener("keyup",bt,true));}function Oy(){ss&&(ss=false,window.removeEventListener("keydown",bt,true),window.removeEventListener("keypress",bt,true),window.removeEventListener("keyup",bt,true),document.removeEventListener("keydown",bt,true),document.removeEventListener("keypress",bt,true),document.removeEventListener("keyup",bt,true));}function $y(e){return vr.size===0&&Ny(),vr.add(e),()=>{vr.delete(e),vr.size===0&&Oy();}}function Fy(e,t,n,o){let r;switch(e){case "digits":r="0-9";break;case "alpha":r="\\p{L}";break;case "alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Dy(e,t){return t?e.replace(t,""):e}function By(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t);})}function _i(e={}){const{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:l,blockGameKeys:c=true,debounceMs:d=0,onChange:u,onEnter:p,label:f}=e,g=m("div",{className:"lg-input-wrap"}),h=m("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(h.maxLength=l),o&&(h.value=o),f){const O=m("div",{className:"lg-input-label"},f);g.appendChild(O);}g.appendChild(h);const y=Fy(r,i,a,s),x=()=>{const O=h.selectionStart??h.value.length,z=h.value.length,j=Dy(h.value,y);if(j!==h.value){h.value=j;const W=z-j.length,Y=Math.max(0,O-W);h.setSelectionRange(Y,Y);}},w=By(()=>u?.(h.value),d);h.addEventListener("input",()=>{x(),w();}),h.addEventListener("paste",()=>queueMicrotask(()=>{x(),w();})),h.addEventListener("keydown",O=>{O.key==="Enter"&&p?.(h.value);});const v=c?$y(h):()=>{};function k(){return h.value}function T(O){h.value=O??"",x(),w();}function b(){h.focus();}function S(){h.blur();}function _(O){h.disabled=!!O;}function C(){return document.activeElement===h}function I(){v();}return {root:g,input:h,getValue:k,setValue:T,focus:b,blur:S,setDisabled:_,isFocused:C,destroy:I}}function Ue(e,t,n){return Math.min(n,Math.max(t,e))}function $r({h:e,s:t,v:n,a:o}){const r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1));let s=0,l=0,c=0;switch(Math.floor(r)){case 0:s=i,l=a;break;case 1:s=a,l=i;break;case 2:l=i,c=a;break;case 3:l=a,c=i;break;case 4:s=a,c=i;break;default:s=i,c=a;break}const u=n-i,p=Math.round((s+u)*255),f=Math.round((l+u)*255),g=Math.round((c+u)*255);return {r:Ue(p,0,255),g:Ue(f,0,255),b:Ue(g,0,255),a:Ue(o,0,1)}}function wg({r:e,g:t,b:n,a:o}){const r=Ue(e,0,255)/255,i=Ue(t,0,255)/255,a=Ue(n,0,255)/255,s=Math.max(r,i,a),l=Math.min(r,i,a),c=s-l;let d=0;c!==0&&(s===r?d=60*((i-a)/c%6):s===i?d=60*((a-r)/c+2):d=60*((r-i)/c+4)),d<0&&(d+=360);const u=s===0?0:c/s;return {h:d,s:u,v:s,a:Ue(o,0,1)}}function bd({r:e,g:t,b:n}){const o=r=>Ue(Math.round(r),0,255).toString(16).padStart(2,"0");return `#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function zy({r:e,g:t,b:n,a:o}){const r=Ue(Math.round(o*255),0,255);return `${bd({r:e,g:t,b:n})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function wr({r:e,g:t,b:n,a:o}){const r=Math.round(o*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${r})`}function vo(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r:o,g:r,b:i,a:n/255}}function cc(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return vo(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;const r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return [r,i,a,s].some(l=>Number.isNaN(l))?null:{r,g:i,b:a,a:s}}return null}function Gy(e,t){const n=cc(e)??vo(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Ue(t,0,1)),wg(n)}function Hy(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function jy(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Pn(e){const t=$r(e),n=$r({...e,a:1});return {hsva:{...e},hex:bd(n),hexa:zy(t),rgba:wr(t),alpha:e.a}}function Uy(e={}){const{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:l}=e,d=a?a():ot.detect().platform==="mobile";let u=Gy(o,r);const p=Ne({id:t,className:"color-picker",title:n,padding:d?"md":"lg",variant:"soft",expandable:!d,defaultExpanded:!d&&i});p.classList.add(d?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),h=m("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(h):f?f.prepend(h):p.prepend(h);const y=p.querySelector(".card-toggle");!d&&y&&h.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&y.click();});const x=p.querySelector(".card-collapse");let w=null,v=null,k=null,T=null,b=null,S=null,_=null,C=null,I=null,O="hex";function z(D){const H=Pn(u);D==="input"?s?.(H):l?.(H);}function j(){const D=Pn(u);if(h.style.setProperty("--cp-preview-color",D.rgba),h.setAttribute("aria-label",`${n}: ${D.hexa}`),!d&&w&&v&&k&&T&&b&&S&&_){const H=$r({...u,s:1,v:1,a:1}),G=wr(H);w.style.setProperty("--cp-palette-hue",G),v.style.left=`${u.s*100}%`,v.style.top=`${(1-u.v)*100}%`,k.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${wr({...H,a:1})} 0%, ${wr({...H,a:0})} 100%)`),T.style.top=`${(1-u.a)*100}%`,b.style.setProperty("--cp-hue-color",wr($r({...u,v:1,s:1,a:1}))),S.style.left=`${u.h/360*100}%`;const q=u.a===1?D.hex:D.hexa,E=D.rgba,P=O==="hex"?q:E;_!==document.activeElement&&(_.value=P),_.setAttribute("aria-label",`${O.toUpperCase()} code for ${n}`),_.placeholder=O==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",O==="hex"?_.maxLength=9:_.removeAttribute("maxLength"),_.dataset.mode=O,C&&(C.textContent=O.toUpperCase(),C.setAttribute("aria-label",O==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),C.setAttribute("aria-pressed",O==="rgba"?"true":"false"),C.classList.toggle("is-alt",O==="rgba"));}I&&I!==document.activeElement&&(I.value=D.hex);}function W(D,H=null){u={h:(D.h%360+360)%360,s:Ue(D.s,0,1),v:Ue(D.v,0,1),a:Ue(D.a,0,1)},j(),H&&z(H);}function Y(D,H=null){W(wg(D),H);}function N(D,H,G){D.addEventListener("pointerdown",q=>{q.preventDefault();const E=q.pointerId,P=M=>{M.pointerId===E&&H(M);},A=M=>{M.pointerId===E&&(document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",A),document.removeEventListener("pointercancel",A),G?.(M));};H(q),document.addEventListener("pointermove",P),document.addEventListener("pointerup",A),document.addEventListener("pointercancel",A);});}if(!d&&x){const D=x.querySelector(".card-body");if(D){D.classList.add("color-picker__body"),v=m("div",{className:"color-picker__palette-cursor"}),w=m("div",{className:"color-picker__palette"},v),T=m("div",{className:"color-picker__alpha-thumb"}),k=m("div",{className:"color-picker__alpha"},T),S=m("div",{className:"color-picker__hue-thumb"}),b=m("div",{className:"color-picker__hue"},S);const H=m("div",{className:"color-picker__main"},w,k),G=m("div",{className:"color-picker__hue-row"},b),q=_i({blockGameKeys:true});_=q.input,_.classList.add("color-picker__hex-input"),_.value="",_.maxLength=9,_.spellcheck=false,_.inputMode="text",_.setAttribute("aria-label",`Hex code for ${n}`),C=m("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),q.root.classList.add("color-picker__hex-wrap");const E=m("div",{className:"color-picker__hex-row"},C,q.root);D.replaceChildren(H,G,E),N(w,A=>{if(!w||!v)return;const M=w.getBoundingClientRect(),R=Ue((A.clientX-M.left)/M.width,0,1),L=Ue((A.clientY-M.top)/M.height,0,1);W({...u,s:R,v:1-L},"input");},()=>z("change")),N(k,A=>{if(!k)return;const M=k.getBoundingClientRect(),R=Ue((A.clientY-M.top)/M.height,0,1);W({...u,a:1-R},"input");},()=>z("change")),N(b,A=>{if(!b)return;const M=b.getBoundingClientRect(),R=Ue((A.clientX-M.left)/M.width,0,1);W({...u,h:R*360},"input");},()=>z("change")),C.addEventListener("click",()=>{if(O=O==="hex"?"rgba":"hex",_){const A=Pn(u);_.value=O==="hex"?u.a===1?A.hex:A.hexa:A.rgba;}j(),_?.focus(),_?.select();}),_.addEventListener("input",()=>{if(O==="hex"){const A=Hy(_.value);if(A!==_.value){const M=_.selectionStart??A.length;_.value=A,_.setSelectionRange(M,M);}}});const P=()=>{const A=_.value;if(O==="hex"){const M=vo(A);if(!M){_.value=u.a===1?Pn(u).hex:Pn(u).hexa;return}const R=A.startsWith("#")?A.slice(1):A,L=R.length===4||R.length===8;M.a=L?M.a:u.a,Y(M,"change");}else {const M=jy(A),R=cc(M);if(!R){_.value=Pn(u).rgba;return}Y(R,"change");}};_.addEventListener("change",P),_.addEventListener("blur",P),_.addEventListener("keydown",A=>{A.key==="Enter"&&(P(),_.blur());});}}return d&&(x&&x.remove(),I=m("input",{className:"color-picker__native",type:"color",value:bd($r({...u,a:1}))}),h.addEventListener("click",()=>I.click()),I.addEventListener("input",()=>{const D=vo(I.value);D&&(D.a=u.a,Y(D,"input"),z("change"));}),p.appendChild(I)),j(),{root:p,isMobile:d,getValue:()=>Pn(u),setValue:(D,H)=>{const G=cc(D)??vo(D)??vo("#FFFFFF");G&&(typeof H=="number"&&(G.a=H),Y(G,null));}}}const Wy=window;function Vy(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Wy}const qy=Vy(),X=qy;function Xy(e){try{return !!e.isSecureContext}catch{return  false}}function xd(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Sg(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Ky(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Yy(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Jy(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Qy(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Xy(X))return {ok:false,method:"clipboard-write"};if(!await Ky())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Zy(e,t){try{const n=t||xd(),o=Yy(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy");}catch{r=!1;}return o.remove(),{ok:r,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function ev(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let o=false;if(n!==e)try{t.textContent=e,o=!0;}catch{}const r=Jy(t);o&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=Sg()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:r,method:"selection",hint:i}}async function tv(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const o=await Qy(n);if(o.ok)return o;const r=t.injectionRoot||xd(t.valueNode||void 0),i=Zy(n,r);if(i.ok)return i;const a=ev(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(ot.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function nv(e,t,n={}){const o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);const i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=xd(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();const i=(t()??"").toString(),a=await tv(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copié"):a.method==="selection"&&o(a.hint||(Sg()?"⌘C pour copier":"Ctrl+C pour copier")):o("Impossible de copier");});}const _o={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function ov(e){const{host:t,themes:n,initialTheme:o,onThemeChange:r}=e;let i=o,a=null,s=false;function l(d){const u=n[d]||n[i]||{};t.setAttribute("data-theme",d),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=X.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=d,r?.(d);}function c(){return i}return l(o),{applyTheme:l,getCurrentTheme:c}}const dc={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,journal:false,system:false}}};async function rv(){const e=await ro("tab-settings",{version:2,defaults:dc,sanitize:r=>({ui:{expandedCards:Go(dc.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Go(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}class iv{constructor(){U(this,"injections",new Map);U(this,"state",{});U(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(r){console.error(`[InjectionRegistry] Failed to init ${t}:`,r);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const o=this.injections.get(t);if(!o){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?o.injection.init():o.injection.destroy(),console.log(`[InjectionRegistry] ${o.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const o=Te(n.storageKey,n.defaultEnabled??false);this.state[t]=o;}saveState(t){const n=this.injections.get(t);n&&Ee(n.storageKey,this.state[t]);}}let hl=null;function ls(){return hl||(hl=new iv),hl}function Cg(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function av(){return Object.keys(_o).map(e=>({value:e,label:Cg(e)}))}const sv=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function lv(e){return Cg(e.replace(/^--/,""))}function cv(e){return e.alpha<1?e.rgba:e.hex}const Mn={pets:{enabled:true},autoFavorite:{enabled:true},bulkFavorite:{enabled:false},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class dv extends Vt{constructor(n){super({id:"tab-settings",label:"Settings"});U(this,"featureConfig",Mn);this.deps=n;}async build(n){const o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await rv();}catch{r={get:()=>dc,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=r.get(),a=Te(Me.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(a);const s=Object.keys(_o),l=this.deps.getCurrentTheme?.()??this.deps.initialTheme,c=s.includes(l)?l:s[0]??"dark";let d=c;const u=md({text:"Theme",tone:"muted",size:"lg"}),p=kn({options:av(),value:c,onChange:v=>{d=v,this.deps.applyTheme(v),this.renderThemePickers(v,f,d);}}),f=m("div",{className:"settings-theme-grid"}),g=Ne({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:v=>r.setCardExpanded("style",v)},m("div",{className:"kv settings-theme-row"},u.root,p.root),f);this.renderThemePickers(c,f,d);const h=this.createHUDSectionsCard({defaultExpanded:!!i.ui.expandedCards.hudSections,onExpandChange:v=>r.setCardExpanded("hudSections",v)}),y=this.createEnhancementsCard({defaultExpanded:!!i.ui.expandedCards.enhancements,onExpandChange:v=>r.setCardExpanded("enhancements",v)}),x=this.createJournalCard({defaultExpanded:!!i.ui.expandedCards.journal,onExpandChange:v=>r.setCardExpanded("journal",v)}),w=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:v=>r.setCardExpanded("system",v)});o.appendChild(g),o.appendChild(h),o.appendChild(y),o.appendChild(x),o.appendChild(w);}mergeFeatureConfig(n){return {pets:{...Mn.pets,...n.pets},autoFavorite:{...Mn.autoFavorite,...n.autoFavorite},bulkFavorite:{...Mn.bulkFavorite,...n.bulkFavorite},cropSizeIndicator:{...Mn.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Mn.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Mn.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){Ee(Me.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const o=(r,i,a,s,l=false,c=false)=>{const d=m("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${l?"0":"12px"} 0 ${c?"0":"12px"} 0;
          ${c?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${i?"1":"0.5"};
        `}),u=m("div"),p=m("div",{style:"font-weight: 500; margin-bottom: 4px;"},r),f=m("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);u.append(p,f);const g=_n({checked:i,onChange:h=>{d.style.opacity=h?"1":"0.5",a(h);}});return d.append(u,g.root),d};return Ne({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},o("Auto-Favorite",this.featureConfig.autoFavorite.enabled,r=>{this.featureConfig.autoFavorite.enabled=r,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),o("Pets",this.featureConfig.pets.enabled,r=>{this.featureConfig.pets.enabled=r,this.saveFeatureConfig();},"Pet management and team tracking",false,true)))}createSectionRow(n,o,r,i,a=false,s=false){const l=m("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${a?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${o?"1":"0.5"};
      `}),c=m("div"),d=m("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),u=m("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},i);c.append(d,u);const p=_n({checked:o,onChange:f=>{l.style.opacity=f?"1":"0.5",r(f);}});return l.append(c,p.root),l}createEnhancementsCard(n){const o=ls(),i=[...o.getAll().filter(s=>!this.isJournalInjection(s.id))].sort((s,l)=>s.name.localeCompare(l.name)),a=i.map((s,l)=>{const c=l===0,d=l===i.length-1,u=o.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{o.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,c,d)});return Ne({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},...a))}createJournalCard(n){const o=ls(),i=[...o.getAll().filter(s=>this.isJournalInjection(s.id)).filter(s=>s.id!=="journalHints"&&s.id!=="journalFilterSort")].sort((s,l)=>s.name.localeCompare(l.name)),a=i.map((s,l)=>{const c=l===0,d=l===i.length-1,u=o.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{o.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,c,d)});return Ne({title:"Journal",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},...a))}isJournalInjection(n){return n==="abilitiesInject"||n==="journalHints"||n==="journalFilterSort"||n==="journalAllTab"||n==="missingVariantsIndicator"}renderThemePickers(n,o,r){const i=_o[n];if(o.replaceChildren(),!!i)for(const a of sv){const s=i[a];if(s==null)continue;const l=Uy({label:lv(a),value:s,defaultExpanded:false,onInput:c=>this.updateThemeVar(n,a,c,r),onChange:c=>this.updateThemeVar(n,a,c,r)});o.appendChild(l.root);}}updateThemeVar(n,o,r,i){const a=_o[n];a&&(a[o]=cv(r),i===n&&this.deps.applyTheme(n));}createEnvCard(n){const o=n?.defaultExpanded??false,r=n?.onExpandChange,i=(x,w)=>{const v=m("div",{className:"kv kv--inline-mobile"}),k=m("label",{},x),T=m("div",{className:"ro"});return typeof w=="string"?T.textContent=w:T.append(w),v.append(k,T),v},a=m("code",{},"—"),s=m("span",{},"—"),l=m("span",{},"—"),c=m("span",{},"—"),d=m("span",{},"—"),u=m("span",{},"—"),p=()=>{const x=ot.detect();l.textContent=x.surface??"Unknown",c.textContent=x.platform??"Unknown",d.textContent=x.browser??"Unknown",u.textContent=x.os??"Unknown",a.textContent=x.host??"Unknown",s.textContent=x.isInIframe?"Yes":"No";},f=Oe({label:"Copy JSON",variant:"primary",size:"sm"});nv(f,()=>{const x=ot.detect();return JSON.stringify(x,null,2)});const g=m("div",{style:"width:100%;display:flex;justify-content:center;"},f),h=Ne({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:o,onExpandChange:r},i("Surface",l),i("Platform",c),i("Browser",d),i("OS",u),i("Host",a),i("Iframe",s)),y=()=>{document.hidden||p();};return document.addEventListener("visibilitychange",y),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",y)),h}}function Ti(e){const{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:l=true,compact:c=false,maxHeight:d,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:h=false,getRowId:y=(ie,B)=>String(B),onSortChange:x,onSelectionChange:w,onRowClick:v}=e;let k=n.slice(),T=o.slice(),b=o.slice(),S=null,_=null,C=1;const I=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,O=!!s&&!(l&&I),z=m("div",{className:"lg-table-wrap",id:t});if(d!=null){const ie=typeof d=="number"?`${d}px`:d;z.style.setProperty("--tbl-max-h",ie);}const j=m("div",{className:"lg-table"}),W=m("div",{className:"lg-thead"}),Y=m("div",{className:"lg-tbody"}),N=m("div",{className:"lg-tfoot"});i&&z.classList.add("sticky"),a&&z.classList.add("zebra"),c&&z.classList.add("compact"),u&&z.classList.add("selectable");const D=p==="switch"?"52px":"36px";z.style.setProperty("--check-w",D);function H(ie){return ie==="center"?"center":ie==="right"?"flex-end":"flex-start"}function G(){const ie=k.map(Z=>{const ee=(Z.width||"1fr").trim();return /\bfr$/.test(ee)?`minmax(0, ${ee})`:ee}),B=(u?[D,...ie]:ie).join(" ");z.style.setProperty("--lg-cols",B);}G();function q(){return r?Math.max(1,Math.ceil(T.length/r)):1}function E(){if(!r)return T;const ie=(C-1)*r;return T.slice(ie,ie+r)}function P(){if(!S||!_)return;const ie=k.find(ee=>String(ee.key)===S),B=_==="asc"?1:-1,Z=ie?.sortFn?(ee,se)=>B*ie.sortFn(ee,se):(ee,se)=>{const oe=ee[S],ce=se[S];return oe==null&&ce==null?0:oe==null?-1*B:ce==null?1*B:typeof oe=="number"&&typeof ce=="number"?B*(oe-ce):B*String(oe).localeCompare(String(ce),void 0,{numeric:true,sensitivity:"base"})};T.sort(Z);}const A=new Set(g);function M(){return Array.from(A)}const R=new Map;function L(ie){A.clear(),ie.forEach(B=>A.add(B)),te(),R.forEach((B,Z)=>{B.setChecked(A.has(Z),true);}),tt(),w?.(M());}function F(){A.clear(),te(),R.forEach(ie=>ie.setChecked(false,true)),tt(),w?.(M());}let V=null;function te(){if(!V)return;const ie=E();if(!ie.length){V.indeterminate=false,V.checked=false;return}const B=ie.map((ee,se)=>y(ee,(C-1)*(r||0)+se)),Z=B.reduce((ee,se)=>ee+(A.has(se)?1:0),0);V.checked=Z===B.length,V.indeterminate=Z>0&&Z<B.length;}let ne=false;function ae(){ne=false;const ie=Y.offsetWidth-Y.clientWidth;W.style.paddingRight=ie>0?`${ie}px`:"0px";}function fe(){ne||(ne=true,requestAnimationFrame(ae));}const xe=new ResizeObserver(()=>fe()),Le=()=>fe();function ve(){W.replaceChildren();const ie=m("div",{className:"lg-tr lg-tr-head"});if(u){const B=m("div",{className:"lg-th lg-th-check"});h||(V=m("input",{type:"checkbox"}),V.addEventListener("change",()=>{const Z=E(),ee=V.checked;Z.forEach((se,oe)=>{const ce=y(se,(C-1)*(r||0)+oe);ee?A.add(ce):A.delete(ce);}),w?.(M()),tt();}),B.appendChild(V)),ie.appendChild(B);}k.forEach(B=>{const Z=m("button",{className:"lg-th",type:"button",title:B.title||B.header});Z.textContent=B.header,B.align&&Z.style.setProperty("--col-justify",H(B.align)),B.sortable&&Z.classList.add("sortable"),S===String(B.key)&&_?Z.setAttribute("data-sort",_):Z.removeAttribute("data-sort"),B.sortable&&Z.addEventListener("click",()=>{const ee=String(B.key);S!==ee?(S=ee,_="asc"):(_=_==="asc"?"desc":_==="desc"?null:"asc",_||(S=null,T=b.slice())),x?.(S,_),S&&_&&P(),In();}),ie.appendChild(Z);}),W.appendChild(ie);try{xe.disconnect();}catch{}xe.observe(Y),fe();}function je(ie){return Array.from(ie.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function et(ie){return ie.querySelector(".lg-td, .lg-td-check")}function Ae(ie){const B=et(ie);return B?B.getBoundingClientRect():null}function tt(){const ie=E(),B=new Map;Array.from(Y.children).forEach(oe=>{const ce=oe,we=ce.getAttribute("data-id");if(!we)return;const Re=Ae(ce);Re&&B.set(we,Re);});const Z=new Map;Array.from(Y.children).forEach(oe=>{const ce=oe,we=ce.getAttribute("data-id");we&&Z.set(we,ce);});const ee=[];for(let oe=0;oe<ie.length;oe++){const ce=ie[oe],we=(r?(C-1)*r:0)+oe,Re=y(ce,we);ee.push(Re);let Se=Z.get(Re);Se||(Se=Xt(ce,we),O&&je(Se).forEach(ir=>{ir.style.transform="translateY(6px)",ir.style.opacity="0";})),Y.appendChild(Se);}const se=[];if(Z.forEach((oe,ce)=>{ee.includes(ce)||se.push(oe);}),!O){se.forEach(oe=>oe.remove()),te(),fe();return}ee.forEach(oe=>{const ce=Y.querySelector(`.lg-tr-body[data-id="${oe}"]`);if(!ce)return;const we=Ae(ce),Re=B.get(oe),Se=je(ce);if(Re&&we){const Ot=Re.left-we.left,fo=Re.top-we.top;Se.forEach(ln=>{ln.style.transition="none",ln.style.transform=`translate(${Ot}px, ${fo}px)`,ln.style.opacity="1";}),et(ce)?.getBoundingClientRect(),Se.forEach(ln=>{ln.style.willChange="transform, opacity",ln.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{Se.forEach(ln=>{ln.style.transform="translate(0,0)";});});}else Se.forEach(Ot=>{Ot.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{Se.forEach(Ot=>{Ot.style.transform="translate(0,0)",Ot.style.opacity="1";});});const ml=Ot=>{(Ot.propertyName==="transform"||Ot.propertyName==="opacity")&&(Se.forEach(fo=>{fo.style.willChange="",fo.style.transition="",fo.style.transform="",fo.style.opacity="";}),Ot.currentTarget.removeEventListener("transitionend",ml));},ir=Se[0];ir&&ir.addEventListener("transitionend",ml);}),se.forEach(oe=>{const ce=je(oe);ce.forEach(Se=>{Se.style.willChange="transform, opacity",Se.style.transition="transform .18s ease, opacity .18s ease",Se.style.opacity="0",Se.style.transform="translateY(-6px)";});const we=Se=>{Se.propertyName==="opacity"&&(Se.currentTarget.removeEventListener("transitionend",we),oe.remove());},Re=ce[0];Re?Re.addEventListener("transitionend",we):oe.remove();}),te(),fe();}function Xt(ie,B){const Z=y(ie,B),ee=m("div",{className:"lg-tr lg-tr-body","data-id":Z});if(u){const se=m("div",{className:"lg-td lg-td-check"});if(p==="switch"){const oe=_n({size:"sm",checked:A.has(Z),onChange:ce=>{ce?A.add(Z):A.delete(Z),te(),w?.(M());}});R.set(Z,oe),se.appendChild(oe.root);}else {const oe=m("input",{type:"checkbox",className:"lg-row-check"});oe.checked=A.has(Z),oe.addEventListener("change",ce=>{ce.stopPropagation(),oe.checked?A.add(Z):A.delete(Z),te(),w?.(M());}),oe.addEventListener("click",ce=>ce.stopPropagation()),se.appendChild(oe);}ee.appendChild(se);}return k.forEach(se=>{const oe=m("div",{className:"lg-td"});se.align&&oe.style.setProperty("--col-justify",H(se.align));let ce=se.render?se.render(ie,B):String(ie[se.key]??"");typeof ce=="string"?oe.textContent=ce:oe.appendChild(ce),ee.appendChild(oe);}),(v||u&&f)&&(ee.classList.add("clickable"),ee.addEventListener("click",se=>{if(!se.target.closest(".lg-td-check")){if(u&&f){const oe=!A.has(Z);if(oe?A.add(Z):A.delete(Z),te(),p==="switch"){const ce=R.get(Z);ce&&ce.setChecked(oe,true);}else {const ce=ee.querySelector(".lg-row-check");ce&&(ce.checked=oe);}w?.(M());}v?.(ie,B,se);}})),ee}function po(){if(N.replaceChildren(),!r)return;const ie=q(),B=m("div",{className:"lg-pager"}),Z=m("button",{className:"btn",type:"button"},"←"),ee=m("button",{className:"btn",type:"button"},"→"),se=m("span",{className:"lg-pager-info"},`${C} / ${ie}`);Z.disabled=C<=1,ee.disabled=C>=ie,Z.addEventListener("click",()=>En(C-1)),ee.addEventListener("click",()=>En(C+1)),B.append(Z,se,ee),N.appendChild(B);}function En(ie){const B=q();C=Math.min(Math.max(1,ie),B),tt(),po();}function In(){G(),ve(),tt(),po();}function Wi(ie){b=ie.slice(),T=ie.slice(),S&&_&&P(),En(1);}function Vi(ie){k=ie.slice(),In();}function qi(ie,B="asc"){S=ie,_=ie?B:null,S&&_?P():T=b.slice(),In();}function Xi(){try{xe.disconnect();}catch{}window.removeEventListener("resize",Le);}return j.append(W,Y,N),z.appendChild(j),window.addEventListener("resize",Le),In(),{root:z,setData:Wi,setColumns:Vi,sortBy:qi,getSelection:M,setSelection:L,clearSelection:F,setPage:En,getState:()=>({page:C,pageCount:q(),sortKey:S,sortDir:_}),destroy:Xi}}let cs=false;const Sr=new Set;function uv(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const xt=e=>{const t=uv();if(t){for(const n of Sr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function pv(){cs||(cs=true,window.addEventListener("keydown",xt,true),window.addEventListener("keypress",xt,true),window.addEventListener("keyup",xt,true),document.addEventListener("keydown",xt,true),document.addEventListener("keypress",xt,true),document.addEventListener("keyup",xt,true));}function fv(){cs&&(cs=false,window.removeEventListener("keydown",xt,true),window.removeEventListener("keypress",xt,true),window.removeEventListener("keyup",xt,true),document.removeEventListener("keydown",xt,true),document.removeEventListener("keypress",xt,true),document.removeEventListener("keyup",xt,true));}function gv(e){return Sr.size===0&&pv(),Sr.add(e),()=>{Sr.delete(e),Sr.size===0&&fv();}}function Zi(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function mv(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function Rs(e={}){const{id:t,placeholder:n="Search...",value:o="",size:r="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:l,autoSearch:c=false,debounceMs:d=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:h="Clear",ariaLabel:y,submitLabel:x,loading:w=false,blockGameKeys:v=true}=e,k=m("div",{className:"search"+(r?` search--${r}`:""),id:t}),T=m("span",{className:"search-ico search-ico--left"});if(p){const F=Zi(p);F&&T.appendChild(F);}else T.textContent="🔎",T.style.opacity=".9";const b=m("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":y||n}),S=m("span",{className:"search-ico search-ico--right"});if(f){const F=Zi(f);F&&S.appendChild(F);}const _=mv();_.classList.add("search-spinner");const C=g?m("button",{className:"search-clear",type:"button",title:h},"×"):null,I=x!=null?m("button",{className:"btn search-submit",type:"button"},x):null,O=m("div",{className:"search-field"},T,b,S,_,...C?[C]:[]);k.append(O,...I?[I]:[]);let z=!!i,j=null;function W(F){_.style.display=F?"inline-block":"none",k.classList.toggle("is-loading",F);}function Y(){j!=null&&(window.clearTimeout(j),j=null);}function N(F){Y(),d>0?j=window.setTimeout(()=>{j=null,F();},d):F();}function D(){s?.(b.value),c&&l&&l(b.value);}b.addEventListener("input",()=>{N(D);}),b.addEventListener("keydown",F=>{F.key==="Enter"?(F.preventDefault(),Y(),l?.(b.value)):F.key==="Escape"&&(b.value.length>0?q("",{notify:true}):b.blur());}),C&&C.addEventListener("click",()=>q("",{notify:true})),I&&I.addEventListener("click",()=>l?.(b.value));let H=()=>{};if(v&&(H=gv(b)),u){const F=V=>{if(V.key===u&&!V.ctrlKey&&!V.metaKey&&!V.altKey){const te=document.activeElement;te&&(te.tagName==="INPUT"||te.tagName==="TEXTAREA"||te.isContentEditable)||(V.preventDefault(),b.focus());}};window.addEventListener("keydown",F,true),k.__cleanup=()=>{window.removeEventListener("keydown",F,true),H();};}else k.__cleanup=()=>{H();};function G(F){z=!!F,b.disabled=z,C&&(C.disabled=z),I&&(I.disabled=z),k.classList.toggle("disabled",z);}function q(F,V={}){const te=b.value;b.value=F??"",V.notify&&te!==F&&N(D);}function E(){return b.value}function P(){b.focus();}function A(){b.blur();}function M(F){b.placeholder=F;}function R(F){q("",F);}return G(z),W(w),a&&P(),{root:k,input:b,getValue:E,setValue:q,focus:P,blur:A,setDisabled:G,setPlaceholder:M,clear:R,setLoading:W,setIconLeft(F){T.replaceChildren();const V=Zi(F??"🔎");V&&T.appendChild(V);},setIconRight(F){S.replaceChildren();const V=Zi(F??"");V&&S.appendChild(V);}}}const Ns=e=>new Promise(t=>setTimeout(t,e)),It=e=>{try{return e()}catch{return}},Gt=(e,t,n)=>Math.max(t,Math.min(n,e)),hv=e=>Gt(e,0,1);async function Ju(e,t,n){const o=performance.now();for(;performance.now()-o<t;){const r=await Promise.race([e,Ns(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}let yd=null;function kg(){return yd}function bv(e){yd=e;}function _g(){return yd!==null}const xv=/\/(?:r\/\d+\/)?version\/([^/]+)/,yv=15e3,vv=50;function wv(){return X?.document??(typeof document<"u"?document:null)}function vd(e={}){if(_g())return;const t=e.doc??wv();if(!t)return;const n=t.scripts;for(let o=0;o<n.length;o++){const i=n.item(o)?.src;if(!i)continue;const a=i.match(xv);if(a?.[1]){bv(a[1]);return}}}function Sv(){return vd(),kg()}function Cv(){return _g()}async function kv(e={}){const t=e.timeoutMs??yv,n=performance.now();for(;performance.now()-n<t;){vd();const o=kg();if(o)return o;await Ns(vv);}throw new Error("MGVersion timeout (gameVersion not found)")}const wd={init:vd,isReady:Cv,get:Sv,wait:kv},_v=X?.location?.origin||"https://magicgarden.gg";function Tg(){return typeof GM_xmlhttpRequest=="function"}function Ag(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))});})}async function Sd(e){if(Tg())return JSON.parse((await Ag(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Eg(e){if(Tg())return (await Ag(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Tv(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),r=X?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i);},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"));},i.src=o;})}const tn=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Av=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Qu=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Av(e)+String(t||"");let Cd=null,Ig=null;function Pg(){return Cd}function Ev(){return Ig}function Iv(e){Cd=e;}function Pv(e){Ig=e;}function Mg(){return Cd!==null}const Mv=15e3;async function Lv(e={}){Mg()||await kd(e);}async function kd(e={}){const t=Pg();if(t)return t;const n=Ev();if(n)return n;const o=(async()=>{const r=e.gameVersion??await wd.wait({timeoutMs:Mv}),i=`${_v}/version/${r}/assets/`;return Iv(i),i})();return Pv(o),o}async function Rv(e){const t=await kd();return tn(t,e)}function Nv(){return Mg()}const io={init:Lv,isReady:Nv,base:kd,url:Rv},Lg=new Map;function Ov(e){return Lg.get(e)}function $v(e,t){Lg.set(e,t);}const Rg="manifest.json";let uc=null;async function Fv(){uc||(uc=await Ng());}function Dv(){return uc!==null}async function Ng(e={}){const t=e.baseUrl??await io.base(),n=Ov(t);if(n)return n;const o=Sd(tn(t,Rg));return $v(t,o),o}function Bv(e,t){return e.bundles.find(n=>n.name===t)??null}function zv(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const o of n.src??[])typeof o=="string"&&o.endsWith(".json")&&o!==Rg&&t.add(o);return Array.from(t)}const nn={init:Fv,isReady:Dv,load:Ng,getBundle:Bv,listJsonFromBundle:zv},Gv=X,Et=Gv.Object??Object,Os=Et.keys,ds=Et.values,us=Et.entries,Zu=new WeakSet;function Hv(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const de=Hv(),Ln={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},jv=["Rain","Frost","Dawn","AmberMoon"],ep=/main-[^/]+\.js(\?|$)/,Uv=6,Wv=150,Vv=2e3,qv=200,Xv=50,Kv=10,Yv=1e3,pc="ProduceScaleBoost",Rn=(e,t)=>t.every(n=>e.includes(n));function Nn(e,t){de.data[e]==null&&(de.data[e]=t,ps()&&Fg());}function ps(){return Object.values(de.data).every(e=>e!=null)}function Og(e,t){if(!e||typeof e!="object"||Zu.has(e))return;Zu.add(e);let n;try{n=Os(e);}catch{return}if(!n||n.length===0)return;const o=e;let r;if(!de.data.items&&Rn(n,Ln.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Nn("items",o)),!de.data.decor&&Rn(n,Ln.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Nn("decor",o)),!de.data.mutations&&Rn(n,Ln.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&Nn("mutations",o)),!de.data.eggs&&Rn(n,Ln.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&Nn("eggs",o)),!de.data.pets&&Rn(n,Ln.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&Nn("pets",o)),!de.data.abilities&&Rn(n,Ln.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&Nn("abilities",o)),!de.data.plants&&Rn(n,Ln.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&Nn("plants",o)),!(t>=Uv))for(const i of n){let a;try{a=o[i];}catch{continue}a&&typeof a=="object"&&Og(a,t+1);}}function Pa(e){try{Og(e,0);}catch{}}function $g(){if(!de.isHookInstalled){if(Et.__MG_HOOKED__){de.isHookInstalled=true;return}Et.__MG_HOOKED__=true,de.isHookInstalled=true;try{Et.keys=function(t){return Pa(t),Os.apply(this,arguments)},ds&&(Et.values=function(t){return Pa(t),ds.apply(this,arguments)}),us&&(Et.entries=function(t){return Pa(t),us.apply(this,arguments)});}catch{}}}function Fg(){if(de.isHookInstalled){try{Et.keys=Os,ds&&(Et.values=ds),us&&(Et.entries=us);}catch{}de.isHookInstalled=false;}}function Jv(){if(de.scanInterval||ps())return;const e=()=>{if(ps()||de.scanAttempts>Wv){Dg();return}de.scanAttempts++;try{Os(X).forEach(t=>{try{Pa(X[t]);}catch{}});}catch{}};e(),de.scanInterval=setInterval(e,Vv);}function Dg(){de.scanInterval&&(clearInterval(de.scanInterval),de.scanInterval=null);}const tp=X;function Qv(){try{for(const e of tp.document?.scripts||[]){const t=e?.src?String(e.src):"";if(ep.test(t))return t}}catch{}try{for(const e of tp.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(ep.test(t))return t}}catch{}return null}function Zv(e,t){const n=[];let o=e.indexOf(t);for(;o!==-1;)n.push(o),o=e.indexOf(t,o+t.length);return n}function $s(e,t){let n=0,o="",r=false;for(let i=t;i<e.length;i++){const a=e[i];if(o){if(r){r=false;continue}if(a==="\\"){r=true;continue}a===o&&(o="");continue}if(a==='"'||a==="'"||a==="`"){o=a;continue}if(a==="{")n++;else if(a==="}"&&--n===0)return e.slice(t,i+1)}return null}function e0(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const o=e.indexOf("=",n);if(o<0||o>t)return null;const r=e.indexOf("{",o);return r<0||r>t?null:$s(e,r)}let bl=null,ar=null;async function Bg(){return bl||ar||(ar=(async()=>{const e=Qv();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return bl=n,n}catch{return null}finally{ar=null;}})(),ar)}function t0(e){const t={};let n=false;for(const o of jv){const r=e?.[o];if(!r||typeof r!="object")continue;const i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}function n0(e,t){const n=Math.max(0,t-3e3),o=e.substring(n,t),r=/Rain:\{/,i=o.match(r);if(!i||i.index===void 0)return null;const a=n+i.index;let s=-1;for(let l=a-1;l>=Math.max(0,a-200);l--)if(e[l]==="{"){s=l;break}return s<0?null:$s(e,s)}function o0(e){return e.replace(/\$t\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"').replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"')}async function r0(){if(de.data.weather)return  true;const e=await Bg();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=e0(e,t)??n0(e,t);if(!n)return  false;const o=o0(n);let r;try{r=Function('"use strict";return('+o+")")();}catch{return  false}const i=t0(r);return i?(de.data.weather=i,true):false}function i0(){if(de.weatherPollingTimer)return;de.weatherPollAttempts=0;const e=setInterval(async()=>{(await r0()||++de.weatherPollAttempts>qv)&&(clearInterval(e),de.weatherPollingTimer=null);},Xv);de.weatherPollingTimer=e;}function a0(){de.weatherPollingTimer&&(clearInterval(de.weatherPollingTimer),de.weatherPollingTimer=null);}const s0={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function l0(e){const t=Zv(e,pc);if(!t.length)return null;for(const n of t){const o=Math.max(0,n-4e3),r=Math.min(e.length,n+4e3),a=e.slice(o,r).lastIndexOf("switch(");if(a===-1)continue;const s=o+a,l=e.indexOf("{",s);if(l===-1)continue;const c=$s(e,l);if(c&&c.includes(pc)&&(c.includes('bg:"')||c.includes("bg:'")))return c}return null}function c0(e){const t={},n=[],o=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,r=(a,s)=>{const l=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),c=a.match(l);return c?c[2]:null};let i;for(;(i=o.exec(e))!==null;){if(i[2]){n.push(i[2]);continue}const a=i[0];if(a.startsWith("default")){n.length=0;continue}if(!a.startsWith("return"))continue;const s=e.indexOf("{",i.index);if(s===-1){n.length=0;continue}const l=$s(e,s);if(!l){n.length=0;continue}const c=r(l,"bg");if(!c){n.length=0;continue}const d=r(l,"hover")||c;for(const u of n)t[u]||(t[u]={bg:c,hover:d});n.length=0;}return Object.keys(t).length?t:null}async function d0(){const e=await Bg();if(!e)return null;const t=l0(e);return t?c0(t):null}function u0(e){const t=e[pc];return t!=null&&typeof t=="object"&&"color"in t}async function p0(){if(!de.data.abilities)return  false;const e=de.data.abilities;if(u0(e))return  true;const t=await d0();if(!t)return  false;const n={};for(const[o,r]of Object.entries(e)){const i=t[o]||s0;n[o]={...r,color:{bg:i.bg,hover:i.hover}};}return de.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function f0(){if(de.colorPollingTimer)return;de.colorPollAttempts=0;const e=setInterval(async()=>{(await p0()||++de.colorPollAttempts>Kv)&&(clearInterval(e),de.colorPollingTimer=null);},Yv);de.colorPollingTimer=e;}function g0(){de.colorPollingTimer&&(clearInterval(de.colorPollingTimer),de.colorPollingTimer=null);}function m0(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function h0(){return {lru:new Map,cost:0,srcCanvas:new Map}}function b0(){return {cache:new Map,maxEntries:200}}const x0={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},y0={enabled:true,maxEntries:200},Je=m0(),v0=h0(),w0={...x0},S0=b0(),C0={...y0};function lt(){return Je}function Ho(){return v0}function Zr(){return w0}function ei(){return S0}function fc(){return C0}function zg(){return Je.ready}const np=Function.prototype.bind,_e={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Gg,Hg,jg;const k0=new Promise(e=>{Gg=e;}),_0=new Promise(e=>{Hg=e;}),T0=new Promise(e=>{jg=e;});function A0(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function E0(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function I0(e){_e.engine=e,_e.tos=E0(e)||null,_e.app=e.app||null,_e.renderer=e.app?.renderer||null,_e.ticker=e.app?.ticker||null,_e.stage=e.app?.stage||null;try{Gg(e);}catch{}try{_e.app&&Hg(_e.app);}catch{}try{_e.renderer&&jg(_e.renderer);}catch{}}function _d(){return _e.engine?true:(_e._bindPatched||(_e._bindPatched=true,Function.prototype.bind=function(e,...t){const n=np.call(this,e,...t);try{!_e.engine&&A0(e)&&(Function.prototype.bind=np,_e._bindPatched=!1,I0(e));}catch{}return n}),false)}_d();async function P0(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(_e.engine)return  true;_d(),await Ns(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function M0(e=15e3){return _e.engine||await P0(e),true}function L0(){return _e.engine&&_e.app?{ok:true,engine:_e.engine,tos:_e.tos,app:_e.app}:(_d(),{ok:false,engine:_e.engine,tos:_e.tos,app:_e.app,note:"Not captured. Wait for room, or reload."})}const yt={engineReady:k0,appReady:_0,rendererReady:T0,engine:()=>_e.engine,tos:()=>_e.tos,app:()=>_e.app,renderer:()=>_e.renderer,ticker:()=>_e.ticker,stage:()=>_e.stage,PIXI:()=>X.PIXI||null,init:M0,hook:L0,ready:()=>!!_e.engine};function fs(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ai(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?fs(o):`sprite/${n}/${o}`}function ti(e,t,n,o){const r=Ai(e,t);if(n.has(r)||o.has(r))return r;const i=String(t||"").trim();if(n.has(i)||o.has(i))return i;const a=fs(i);return n.has(a)||o.has(a)?a:r}function R0(e,t,n=25e3){const o=[e],r=new Set;let i=0;for(;o.length&&i++<n;){const a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l]);}return null}function N0(e){const t=X.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,o=R0(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function O0(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return N0(e)}catch{await Ns(50);}throw new Error("Constructors timeout")}const On=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function $0(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function xl(e,t,n,o,r){return new e(t,n,o,r)}function F0(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function D0(e,t,n,o){const{Texture:r,Rectangle:i}=o;for(const[a,s]of Object.entries(e.frames)){const l=s.frame,c=!!s.rotated,d=c?2:0,u=c?l.h:l.w,p=c?l.w:l.h,f=xl(i,l.x,l.y,u,p),g=s.sourceSize||{w:l.w,h:l.h},h=xl(i,0,0,g.w,g.h);let y=null;if(s.trimmed&&s.spriteSourceSize){const x=s.spriteSourceSize;y=xl(i,x.x,x.y,x.w,x.h);}n.set(a,F0(r,t,f,h,y,d,s.anchor||null));}}function B0(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;const i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i);}}function z0(e,t){const n=(o,r)=>{const i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const o of Object.keys(e.frames||{})){const r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2]);}}async function G0(e,t){const n=await nn.load({baseUrl:e}),o=nn.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");const r=nn.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,l=new Map;async function c(d){if(i.has(d))return;i.add(d);const u=await Sd(tn(e,d));if(!$0(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const y of p)await c(Qu(d,y));const f=Qu(d,u.meta.image),g=await Tv(await Eg(tn(e,f))),h=t.Texture.from(g);D0(u,h,a,t),B0(u,a,s),z0(u,l);}for(const d of r)await c(d);return {textures:a,animations:s,categoryIndex:l}}let ea=null;async function H0(){return Je.ready?true:ea||(ea=(async()=>{const e=performance.now();On("init start");const t=await Ju(yt.appReady,15e3,"PIXI app");On("app ready");const n=await Ju(yt.rendererReady,15e3,"PIXI renderer");On("renderer ready"),Je.app=t,Je.renderer=n||t?.renderer||null,Je.ctors=await O0(t),On("constructors resolved"),Je.baseUrl=await io.base(),On("base url",Je.baseUrl);const{textures:o,animations:r,categoryIndex:i}=await G0(Je.baseUrl,Je.ctors);return Je.textures=o,Je.animations=r,Je.categoryIndex=i,On("atlases loaded","textures",Je.textures.size,"animations",Je.animations.size,"categories",Je.categoryIndex?.size??0),Je.ready=true,On("ready in",Math.round(performance.now()-e),"ms"),true})(),ea)}const jo={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ug=Object.keys(jo),j0=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],op=new Map(j0.map((e,t)=>[e,t]));function gs(e){return [...new Set(e.filter(Boolean))].sort((n,o)=>(op.get(n)??1/0)-(op.get(o)??1/0))}const U0=["Wet","Chilled","Frozen"],W0=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),V0={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},q0={Pepper:.5,Banana:.6},X0=256,K0=.5,Y0=2;function Wg(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=gs(e),n=J0(e),o=Q0(e);return {muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function J0(e){const t=e.filter((r,i,a)=>jo[r]&&a.indexOf(r)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?gs(t.filter(r=>!U0.includes(r))):gs(t)}function Q0(e){const t=e.filter((n,o,r)=>jo[n]?.overlayTall&&r.indexOf(n)===o);return gs(t)}function yl(e,t){return e.map(n=>({name:n,meta:jo[n],overlayTall:jo[n]?.overlayTall??null,isTall:t}))}const Z0={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},ta=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(const r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function ew(e){return ta.has(e)?e:ta.has("overlay")?"overlay":ta.has("screen")?"screen":ta.has("lighter")?"lighter":"source-atop"}function tw(e,t,n,o,r=false){const i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){const u=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*u,s-Math.sin(i)*u,a+Math.cos(i)*u,s+Math.sin(i)*u)}const l=Math.cos(i),c=Math.sin(i),d=Math.abs(l)*t/2+Math.abs(c)*n/2;return e.createLinearGradient(a-l*d,s-c*d,a+l*d,s+c*d)}function rp(e,t,n,o,r=false){const i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?tw(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,l)=>a.addColorStop(l/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function nw(e,t,n,o){const r=Z0[n];if(!r)return;const i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&o,s=t.width,l=t.height;e.save();const c=i.masked?ew(i.op):"source-in";if(e.globalCompositeOperation=c,i.a!=null&&(e.globalAlpha=i.a),i.masked){const d=document.createElement("canvas");d.width=s,d.height=l;const u=d.getContext("2d");u.imageSmoothingEnabled=false,rp(u,s,l,i,a),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(d,0,0);}else rp(e,s,l,i,a);e.restore();}function ow(e){return /tallplant/i.test(e)}function Td(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Vg(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function rw(e,t){const n=String(e||"").toLowerCase();for(const o of t.keys()){const r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){const a=t.get(o);if(a)return {tex:a,key:o}}}return null}function iw(e,t,n,o){if(!t)return null;const r=Td(e),i=Vg(t);for(const a of i){const s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(const l of s){const c=n.get(l);if(c)return {tex:c,key:l}}{const l=`sprite/mutation-overlay/${a}TallPlant`,c=n.get(l);if(c)return {tex:c,key:l};const d=`sprite/mutation-overlay/${a}`,u=n.get(d);if(u)return {tex:u,key:d};const p=rw(t,n);if(p)return p}}return null}function aw(e,t,n,o){if(!t)return null;const r=jo[t];if(n&&r?.tallIconOverride){const s=o.get(r.tallIconOverride);if(s)return s}const i=Td(e),a=Vg(t);for(const s of a){const l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const c of l){const d=o.get(c);if(d)return d}if(n){const c=`sprite/mutation-overlay/${s}TallPlantIcon`,d=o.get(c);if(d)return d;const u=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(u);if(p)return p}}return null}function sw(e,t,n){const o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=q0[t]??i;const l=r>o*1.5;let c=V0[t]??(l?a:.4);const d={x:(s-i)*o,y:(c-a)*r},u=Math.min(o,r),p=Math.min(1.5,u/X0);let f=K0*p;return n&&(f*=Y0),{width:o,height:r,anchorX:i,anchorY:a,offset:d,iconScale:f}}function qg(e,t){return `${t.sig}::${e}`}function Xg(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function lw(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function cw(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Xg(o??null));}}function Kg(e,t){const n=e.lru.get(t);return n?(lw(e,t,n),n):null}function Yg(e,t,n,o){e.lru.set(t,n),e.cost+=Xg(n),cw(e,o);}function dw(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function uw(e,t){return e.srcCanvas.get(t)??null}function pw(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){const r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r);}}function Fs(e,t,n,o,r){const i=uw(o,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const l=new n.Sprite(e),c=t.extract.canvas(l);if(l.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&c){const d=Math.round(c.width/s),u=Math.round(c.height/s);a=document.createElement("canvas"),a.width=d,a.height=u;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(c,0,0,d,u));}else a=c;}}catch{}if(!a){const l=e?.frame||e?._frame,c=e?.orig||e?._orig,d=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!l||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(c?.width??l.width)|0),g=Math.max(1,(c?.height??l.height)|0),h=d?.x??0,y=d?.y??0;a.width=f,a.height=g;const x=a.getContext("2d");x.imageSmoothingEnabled=false,u===true||u===2||u===8?(x.save(),x.translate(h+l.height/2,y+l.width/2),x.rotate(-Math.PI/2),x.drawImage(p,l.x,l.y,l.width,l.height,-l.width/2,-l.height/2,l.width,l.height),x.restore()):x.drawImage(p,l.x,l.y,l.width,l.height,h,y,l.width,l.height);}return pw(o,e,a,r),a}function fw(e,t,n,o,r,i,a,s){const{w:l,h:c,aX:d,aY:u,basePos:p}=t,f=[];for(const g of n){const h=new o.Sprite(e);h.anchor?.set?.(d,u),h.position.set(p.x,p.y),h.zIndex=1;const y=document.createElement("canvas");y.width=l,y.height=c;const x=y.getContext("2d");x.imageSmoothingEnabled=false,x.save(),x.translate(l*d,c*u),x.drawImage(Fs(e,r,o,i,a),-l*d,-c*u),x.restore(),nw(x,y,g.name,g.isTall);const w=o.Texture.from(y,{resolution:e.resolution??1});s.push(w),h.texture=w,f.push(h);}return f}function gw(e,t,n,o,r,i,a,s,l,c){const{aX:d,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&o.get(f.overlayTall)&&{tex:o.get(f.overlayTall),key:f.overlayTall}||iw(e,f.name,o);if(!g?.tex)continue;const h=Fs(g.tex,i,r,a,s);if(!h)continue;const y=h.width,x={x:0,y:0},w={x:u.x-d*y,y:0},v=document.createElement("canvas");v.width=y,v.height=h.height;const k=v.getContext("2d");if(!k)continue;k.imageSmoothingEnabled=false,k.drawImage(h,0,0),k.globalCompositeOperation="destination-in",k.drawImage(l,-w.x,-0);const T=r.Texture.from(v,{resolution:g.tex.resolution??1});c.push(T);const b=new r.Sprite(T);b.anchor?.set?.(x.x,x.y),b.position.set(w.x,w.y),b.scale.set(1),b.alpha=1,b.zIndex=3,p.push(b);}return p}function mw(e,t,n,o,r,i){const{basePos:a}=t,s=[];for(const l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;const c=aw(e,l.name,l.isTall,o);if(!c)continue;const d=new r.Sprite(c),u=c?.defaultAnchor?.x??.5,p=c?.defaultAnchor?.y??.5;d.anchor?.set?.(u,p),d.position.set(a.x+i.offset.x,a.y+i.offset.y),d.scale.set(i.iconScale),l.isTall&&(d.zIndex=-1),W0.has(l.name)&&(d.zIndex=10),d.zIndex||(d.zIndex=2),s.push(d);}return s}function Jg(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;const{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,c=e?.defaultAnchor?.x??.5,d=e?.defaultAnchor?.y??.5,u={x:s*c,y:l*d},p=Fs(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),f=new r;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(c,d),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const h=ow(t),y=yl(n.muts,h),x=yl(n.overlayMuts,h),w=yl(n.selectedMuts,h),v=[],k={w:s,h:l,aX:c,aY:d,basePos:u},T=Td(t),b=sw(e,T,h);fw(e,k,y,o.ctors,o.renderer,o.cacheState,o.cacheConfig,v).forEach(W=>f.addChild(W)),h&&gw(t,k,x,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,v).forEach(Y=>f.addChild(Y)),mw(t,k,w,o.textures,o.ctors,b).forEach(W=>f.addChild(W));let C={x:0,y:0,width:s,height:l};try{const W=f.getLocalBounds?.()||f.getBounds?.(!0);W&&Number.isFinite(W.width)&&Number.isFinite(W.height)&&(C={x:W.x,y:W.y,width:W.width,height:W.height});}catch{}const{Rectangle:I}=o.ctors,O=I?new I(0,0,s,l):void 0;let z=null;if(typeof o.renderer.generateTexture=="function"?z=o.renderer.generateTexture(f,{resolution:1,region:O}):o.renderer.textureGenerator?.generateTexture&&(z=o.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:O})),!z)throw new Error("no render texture");const j=z instanceof a?z:a.from(o.renderer.extract.canvas(z));try{j.__mg_base={baseX:-C.x,baseY:-C.y,baseW:s,baseH:l,texW:C.width,texH:C.height};}catch{}z&&z!==j&&z.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{j.__mg_gen=!0,j.label=`${t}|${n.sig}`;}catch{}return j}catch{return null}}function hw(e,t,n,o){if(!e||e.length<2)return null;const r=[];for(const i of e){const a=Jg(i,t,n,o);a&&r.push(a);}return r.length>=2?r:null}function Qg(e,t,n,o,r){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",l=t.anchorX??.5,c=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${l}|ay${c}|bm${n}|bp${r}|p${o}`}function bw(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function xw(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,r=a);r&&e.cache.delete(r);}e.cache.set(n,{canvas:o,lastAccess:performance.now()});}}function ip(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function yw(e){e.cache.clear();}function vw(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function ww(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Sw(e,t,n,o,r,i,a,s=5,l=0){if(!t.ready||!i.enabled)return 0;const c=e.length;let d=0;a?.(0,c);for(let u=0;u<c;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=ti(null,f,t.textures,t.animations),h={scale:1},y=em(h),x=tm(y,h),w=om(y,h.boundsPadding),v=Qg(g,h,y,x,w);r.cache.has(v)||gc(t,n,o,null,f,h,r,i),d++;}catch{d++;}a?.(d,c),u+s<c&&await ww();}return d}function Cw(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function kw(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Ad(e,t,n,o,r,i){if(!n.length)return t;const a=Wg(n);if(!a.sig)return t;const s=qg(e,a),l=Kg(r,s);if(l?.tex)return l.tex;const c=Jg(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(Yg(r,s,{isAnim:false,tex:c},i),c):t}function Zg(e,t,n,o,r,i){if(!n.length)return t;const a=Wg(n);if(!a.sig)return t;const s=qg(e,a),l=Kg(r,s);if(l?.isAnim&&l.frames?.length)return l.frames;const c=hw(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(Yg(r,s,{isAnim:true,frames:c},i),c):t}function ap(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=ti(o,r,e.textures,e.animations),s=i.mutations||[],l=i.parent||kw(e)||Cw(e),c=e.renderer?.width||e.renderer?.view?.width||innerWidth,d=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=i.center?c/2:i.x??c/2,p=i.center?d/2:i.y??d/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const x=Zg(a,g,s,e,t,n),w=e.ctors.AnimatedSprite;if(w)f=new w(x),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const v=new e.ctors.Sprite(x[0]),T=1e3/Math.max(1,i.fps||8);let b=0,S=0;const _=C=>{const I=e.app.ticker?.deltaMS??C*16.666666666666668;if(b+=I,b<T)return;const O=b/T|0;b%=T,S=(S+O)%x.length,v.texture=x[S];};v.__mgTick=_,e.app.ticker?.add?.(_),f=v;}}else {const x=e.textures.get(a);if(!x)throw new Error(`Unknown sprite/anim key: ${a}`);const w=Ad(a,x,s,e,t,n);f=new e.ctors.Sprite(w);}const h=i.anchorX??f.texture?.defaultAnchor?.x??.5,y=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(h,y),f.position.set(u,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,l.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function _w(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const sp=new Map;function em(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function tm(e,t){return e==="mutations"?t.pad??2:t.pad??0}function sr(e){return Number.isFinite(e)?Math.max(0,e):0}function nm(e){if(typeof e=="number"){const t=sr(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:sr(e.top??0),right:sr(e.right??0),bottom:sr(e.bottom??0),left:sr(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function om(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=nm(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function rm(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function im(e,t,n){const o=e?.__mg_base;return o&&Number.isFinite(o.baseX)&&Number.isFinite(o.baseY)&&Number.isFinite(o.baseW)&&Number.isFinite(o.baseH)&&Number.isFinite(o.texW)&&Number.isFinite(o.texH)?o:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function Tw(e,t,n,o,r,i){const a=`${e}|f${t}`,s=sp.get(a);if(s)return s;const l=rm(n),c={top:0,right:0,bottom:0,left:0};for(const d of Ug){const u=Ad(e,n,[d],o,r,i),p=im(u,l.w,l.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),h=Math.max(0,p.texW-p.baseX-p.baseW),y=Math.max(0,p.texH-p.baseY-p.baseH);f>c.left&&(c.left=f),g>c.top&&(c.top=g),h>c.right&&(c.right=h),y>c.bottom&&(c.bottom=y);}return sp.set(a,c),c}function gc(e,t,n,o,r,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const l=ti(o,r,e.textures,e.animations),c=em(i),d=tm(c,i),u=om(c,i.boundsPadding),p=a&&s?.enabled?Qg(l,i,c,d,u):null;if(p&&a&&s?.enabled){const v=bw(a,p);if(v)return ip(v)}const f=i.mutations||[],g=e.animations.get(l),h=Math.max(0,(i.frameIndex??0)|0);let y,x;if(g?.length)if(y=g[h%g.length],f.length){const v=Zg(l,g,f,e,t,n);x=v[h%v.length];}else x=y;else {const v=e.textures.get(l);if(!v)throw new Error(`Unknown sprite/anim key: ${l}`);y=v,x=Ad(l,v,f,e,t,n);}let w;if(c==="mutations"){const v=new e.ctors.Sprite(x),k=i.anchorX??v.texture?.defaultAnchor?.x??.5,T=i.anchorY??v.texture?.defaultAnchor?.y??.5;v.anchor?.set?.(k,T),v.scale.set(i.scale??1);const b=new e.ctors.Container;b.addChild(v);try{b.updateTransform?.();}catch{}const S=v.getBounds?.(true)||{x:0,y:0,width:v.width,height:v.height};v.position.set(-S.x+d,-S.y+d),w=_w(e,b);try{b.destroy?.({children:!0});}catch{}}else {const v=i.scale??1;let k=nm(i.boundsPadding);c==="padded"&&i.boundsPadding==null&&(k=Tw(l,h,y,e,t,n)),d&&(k={top:k.top+d,right:k.right+d,bottom:k.bottom+d,left:k.left+d});const T=rm(y),b=im(x,T.w,T.h),S=Math.max(1,Math.ceil((T.w+k.left+k.right)*v)),_=Math.max(1,Math.ceil((T.h+k.top+k.bottom)*v));w=document.createElement("canvas"),w.width=S,w.height=_;const C=w.getContext("2d");if(C){C.imageSmoothingEnabled=false;const I=Fs(x,e.renderer,e.ctors,t,n),O=(k.left-b.baseX)*v,z=(k.top-b.baseY)*v;C.drawImage(I,O,z,I.width*v,I.height*v);}}return p&&a&&s?.enabled?(xw(a,s,p,w),ip(w)):w}function Aw(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Ew(e,t){return e.defaultParent=t,true}function Iw(e,t){return e.defaultParent=t,true}function ao(){if(!zg())throw new Error("MGSprite not ready yet")}function Pw(e,t,n){return typeof t=="string"?ap(lt(),Ho(),Zr(),e,t,n||{}):ap(lt(),Ho(),Zr(),null,e,t||{})}function Mw(e,t,n){return typeof t=="string"?gc(lt(),Ho(),Zr(),e,t,n||{},ei(),fc()):gc(lt(),Ho(),Zr(),null,e,t||{},ei(),fc())}function Lw(){Aw(lt());}function Rw(e){return Ew(lt(),e)}function Nw(e){return Iw(lt(),e)}function Ow(e,t){const n=lt(),o=typeof t=="string"?ti(e,t,n.textures,n.animations):ti(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function $w(){ao();const e=lt().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Fw(e){ao();const t=String(e||"").trim();if(!t)return [];const n=lt().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Dw(e,t){ao();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return  false;const r=lt().categoryIndex;if(!r)return  false;const i=n.toLowerCase(),a=o.toLowerCase();for(const[s,l]of r.entries())if(s.toLowerCase()===i){for(const c of l.values())if(c.toLowerCase()===a)return  true}return  false}function Bw(e){ao();const t=lt().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),o=[];for(const[r,i]of t.entries())for(const a of i.values()){const s=Ai(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s);}return o.sort((r,i)=>r.localeCompare(i))}function zw(e){ao();const t=String(e||"").trim();if(!t)return null;const n=fs(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;const r=o[1],i=o[2],a=lt().categoryIndex,s=r.toLowerCase(),l=i.toLowerCase();let c=r,d=i;if(a){const u=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;c=u;const p=a.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===l);if(!f)return null;d=f;}return {category:c,id:d,key:Ai(c,d)}}function Gw(e,t){ao();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");const r=lt().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(d=>d.toLowerCase()===i)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);const c=Array.from(l.values()).find(d=>d.toLowerCase()===a)||o;if(!l.has(c))throw new Error(`Unknown sprite id: ${n}/${o}`);return Ai(s,c)}function Hw(){dw(Ho());}function jw(){yw(ei());}function Uw(){return vw(ei())}function Ww(){return [...Ug]}async function Vw(e,t,n=10,o=0){return ao(),Sw(e,lt(),Ho(),Zr(),ei(),fc(),t,n,o)}const Q={init:H0,isReady:zg,show:Pw,toCanvas:Mw,clear:Lw,attach:Rw,attachProvider:Nw,has:Ow,key:(e,t)=>Ai(e,t),getCategories:$w,getCategoryId:Fw,hasId:Dw,listIds:Bw,getIdInfo:zw,getIdPath:Gw,clearMutationCache:Hw,clearToCanvasCache:jw,getToCanvasCacheStats:Uw,getMutationNames:Ww,warmup:Vw};function qw(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Xw(e,t=[]){const n=new Set,o=r=>{const i=String(r||"").trim();i&&n.add(i);};o(e);for(const r of t)o(r);for(const r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function am(e,t,n,o=[],r=[]){if(!Q)return console.warn("[MGData] MGSprite not available in pickSpriteId"),null;const i=Xw(e,o);if(!i.length)return null;const a=[t,...r].filter(d=>typeof d=="string"),s=d=>{const u=String(d||"").trim();if(!u)return null;for(const p of i)try{if(Q.has(p,u))return Q.getIdPath(p,u)}catch{}return null};for(const d of a){const u=s(d);if(u)return u}const l=qw(n||""),c=s(l||n||"");if(c)return c;try{for(const d of i){const u=Q.listIds(`sprite/${d}/`),p=a.map(g=>String(g||"").toLowerCase()),f=String(n||l||"").toLowerCase();for(const g of u){const y=(g.split("/").pop()||"").toLowerCase();if(p.some(x=>x&&x===y)||y===f)return g}for(const g of u){const y=(g.split("/").pop()||"").toLowerCase();if(p.some(x=>x&&(y.includes(x)||x.includes(y)))||f&&(y.includes(f)||f.includes(y)))return g}}}catch{}return null}function mt(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),l=am(s,n,o,r,i);if(l)try{e.spriteId=l;}catch{}const c=e.rotationVariants;if(c&&typeof c=="object")for(const d of Object.values(c))mt(d,s,n,o);if(e.immatureTileRef){const d={tileRef:e.immatureTileRef};mt(d,s,n,o),d.spriteId&&(e.immatureSpriteId=d.spriteId);}if(e.topmostLayerTileRef){const d={tileRef:e.topmostLayerTileRef};mt(d,s,n,o),d.spriteId&&(e.topmostLayerSpriteId=d.spriteId);}e.activeState&&typeof e.activeState=="object"&&mt(e.activeState,s,n,e.activeState?.name||o);}function Kw(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;const r=t[0],i=t.slice(1);return am(e,r,n??null,o,i)}function Yw(e){for(const[t,n]of Object.entries(e.items||{}))mt(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))mt(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){mt(n,"mutations",t,n?.name,["mutation"]);const o=Kw("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))mt(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))mt(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const o=n;o.seed&&mt(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&mt(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&mt(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function Jw(){try{console.log("[MGData] Resolving sprites..."),Yw(de.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const sm=5e3,lm=50;function cm(e){return new Promise(t=>setTimeout(t,e))}function Qw(e){return de.data[e]}function Zw(){return {...de.data}}function eS(e){return de.data[e]!=null}async function tS(e,t=sm,n=lm){const o=Date.now();for(;Date.now()-o<t;){const r=de.data[e];if(r!=null)return r;await cm(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function nS(e=sm,t=lm){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(de.data).some(o=>o!=null))return {...de.data};await cm(t);}throw new Error("MGData.waitForAnyData: timeout")}const dm=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function um(e){return dm.includes(e)}function pm(e){return e.filter(t=>um(t.action))}function lp(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${o}s`:`${o}s`}function vl(e){return e?.name||e?.petSpecies||"Unknown Pet"}function fm(e){const{action:t,parameters:n}=e,o=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${o.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${o.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const r=vl(o.targetPet),i=o.hungerRestoreAmount||0,s=o.pet?.id===o.targetPet?.id?"itself":r;return `Restored ${i} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${o.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${o.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const r=o.growSlot?.species||"Unknown",i=o.sellPrice||0;return `Ate ${r} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const r=vl(o.targetPet),i=o.strengthIncrease||0;return `Boosted ${r}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const r=vl(o.targetPet);return `Gave +${o.bonusXp||0} XP to ${r}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${o.eggId||"Unknown Egg"}`;case "ProduceRefund":{const r=o.cropsRefunded?.length||0;return `Refunded ${r} ${r===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${o.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const r=o.mutation||"Unknown";return `Made ${o.growSlot?.species||"Unknown"} turn ${r}`}case "PetXpBoost":case "PetXpBoostII":{const r=o.bonusXp||0,i=o.petsAffected?.length||0;return `Gave +${r} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const r=o.secondsReduced||0,i=o.eggsAffected?.length||0,a=lp(r);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const r=o.secondsReduced||0,i=o.numPlantsAffected||0,a=lp(r);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const r=o.scaleIncreasePercentage||0,i=o.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${r.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const J={async init(){$g(),Jv(),i0(),f0();},isReady:ps,get:Qw,getAll:Zw,has:eS,waitFor:tS,waitForAny:nS,resolveSprites:Jw,cleanup(){Fg(),Dg(),a0(),g0();}},oS=new Map;function rS(){return oS}function mc(){return X.jotaiAtomCache?.cache}function vn(e){const t=rS(),n=t.get(e);if(n)return n;const o=mc();if(!o)return null;for(const r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function iS(){const e=X;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:o=>{const r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{const i=n.get(o);i&&i.add(r);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:false};}const aS={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Jo(){return aS}const sS="__JOTAI_STORE_READY__";let cp=false;const hc=new Set;function na(){if(!cp){cp=true;for(const e of hc)try{e();}catch{}try{const e=X.CustomEvent||CustomEvent;X.dispatchEvent?.(new e(sS));}catch{}}}function lS(e){hc.add(e);const t=xc();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{hc.delete(e);}}async function Ds(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,o=xc();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=false;const s=lS(()=>{a||(a=true,s(),r());}),l=Date.now();(async()=>{for(;!a&&Date.now()-l<t;){const d=xc();if(d.via&&!d.polyfill){if(a)return;a=true,s(),r();return}await ni(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const ni=e=>new Promise(t=>setTimeout(t,e));function gm(){try{const e=X.Event||Event;X.dispatchEvent?.(new e("visibilitychange"));}catch{}}function bc(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function wl(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(bc(e))return e;const o=["store","value","current","state","s","baseStore"];for(const r of o)try{const i=e[r];if(bc(i))return i}catch{}return null}function mm(){const e=Jo(),t=X.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);r&&(n+=r.size||0);}if(n===0)return null;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);if(r)for(const i of r){const a=new Set,s=[i.current];for(;s.length;){const l=s.pop();if(!(!l||a.has(l))){a.add(l);try{const c=l?.pendingProps?.value;if(bc(c))return e.lastCapturedVia="fiber",c}catch{}try{let c=l?.memoizedState,d=0;for(;c&&d<15;){d++;const u=wl(c);if(u)return e.lastCapturedVia="fiber",u;const p=wl(c.memoizedState);if(p)return e.lastCapturedVia="fiber",p;c=c.next;}}catch{}try{if(l?.stateNode){const c=wl(l.stateNode);if(c)return e.lastCapturedVia="fiber",c}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate);}}}}return null}function hm(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function cS(e=5e3){const t=Date.now();let n=mc();for(;!n&&Date.now()-t<e;)await ni(100),n=mc();if(!n)throw new Error("jotaiAtomCache.cache not found");const o=Jo();let r=null,i=null;const a=[],s=()=>{for(const c of a)try{c.__origWrite&&(c.write=c.__origWrite,delete c.__origWrite);}catch{}};for(const c of n.values()){if(!c||typeof c.write!="function"||c.__origWrite)continue;const d=c.write;c.__origWrite=d,c.write=function(u,p,...f){return i||(r=u,i=p,s()),d.call(this,u,p,...f)},a.push(c);}gm();const l=Date.now();for(;!i&&Date.now()-l<e;)await ni(50);return i?(o.lastCapturedVia="write",{get:c=>r(c),set:(c,d)=>i(c,d),sub:(c,d)=>{let u;try{u=r(c);}catch{}const p=setInterval(()=>{let f;try{f=r(c);}catch{return}if(f!==u){u=f;try{d();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",hm())}async function dS(e=1e4){const t=Jo();gm();const n=Date.now();for(;Date.now()-n<e;){const o=mm();if(o)return o;await ni(50);}return t.lastCapturedVia="polyfill",hm()}async function Ed(){const e=Jo();if(e.baseStore&&!e.baseStore.__polyfill)return na(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await ni(25);if(e.baseStore)return e.baseStore.__polyfill||na(),e.baseStore}e.captureInProgress=true;try{const t=mm();if(t)return e.baseStore=t,na(),t;try{const o=await cS(5e3);return e.baseStore=o,o.__polyfill||na(),o}catch(o){e.captureError=o;}const n=await dS();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function xc(){const e=Jo();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function uS(){const e=await Ed(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0;}catch{}const a=e.sub(r,()=>{let s;try{s=e.get(r);}catch{return}const l=i.last,c=!Object.is(s,l)||!i.has;if(i.last=s,i.has=true,c)for(const d of i.subs)try{d(s,l);}catch{}});return i.unsubUpstream=a,i};return {async get(r){const i=await n(r);if(i.has)return i.last;const a=e.get(r);return i.last=a,i.has=true,a},async set(r,i){await e.set(r,i);const a=await n(r);a.last=i,a.has=true;},async sub(r,i){const a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(r){return t.get(r)?.last},hasShadow(r){return !!t.get(r)?.has},async ensureWatch(r){await n(r);},async asStore(){return {get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Ma(){const e=Jo();return e.mirror||(e.mirror=await uS()),e.mirror}const ke={async select(e){const t=await Ma(),n=vn(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Ma(),o=vn(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t);},async subscribe(e,t){const n=await Ma(),o=vn(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r);}catch{}})},async subscribeImmediate(e,t){const n=await ke.select(e);try{t(n);}catch{}return ke.subscribe(e,t)}};async function bm(){await Ma();}const Ei=Object.freeze(Object.defineProperty({__proto__:null,Store:ke,prewarm:bm,waitForStore:Ds},Symbol.toStringTag,{value:"Module"}));function Id(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function oi(e,t){const n=Id(t);let o=e;for(const r of n){if(o==null)return;o=o[r];}return o}function pS(e,t,n){const o=Id(t);if(!o.length)return n;const r=Array.isArray(e)?[...e]:{...e??{}};let i=r;for(let a=0;a<o.length-1;a++){const s=o[a],l=i[s],c=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};i[s]=c,i=c;}return i[o[o.length-1]]=n,r}function dp(e,t){const n={};for(const o of t)n[o]=o.includes(".")?oi(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function fS(e,t,n){const o=n.mode??"auto";function r(c){const d=t?oi(c,t):c,u=new Map;if(d==null)return {signatures:u,keys:[]};const p=Array.isArray(d);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<d.length;g++){const h=d[g],y=n.key?n.key(h,g,c):g,x=n.sig?n.sig(h,g,c):n.fields?dp(h,n.fields):JSON.stringify(h);u.set(y,x);}else for(const[g,h]of Object.entries(d)){const y=n.key?n.key(h,g,c):g,x=n.sig?n.sig(h,g,c):n.fields?dp(h,n.fields):JSON.stringify(h);u.set(y,x);}return {signatures:u,keys:Array.from(u.keys())}}function i(c,d){if(c===d)return  true;if(!c||!d||c.size!==d.size)return  false;for(const[u,p]of c)if(d.get(u)!==p)return  false;return  true}async function a(c){let d=null;return ke.subscribeImmediate(e,u=>{const p=t?oi(u,t):u,{signatures:f}=r(p);if(!i(d,f)){const g=new Set([...d?Array.from(d.keys()):[],...Array.from(f.keys())]),h=[];for(const y of g){const x=d?.get(y)??"__NONE__",w=f.get(y)??"__NONE__";x!==w&&h.push(y);}d=f,c({value:p,changedKeys:h});}})}async function s(c,d){return a(({value:u,changedKeys:p})=>{p.includes(c)&&d({value:u});})}async function l(c,d){const u=new Set(c);return a(({value:p,changedKeys:f})=>{const g=f.filter(h=>u.has(h));g.length&&d({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:l}}const wo=new Map;function gS(e,t){const n=wo.get(e);if(n)try{n();}catch{}return wo.set(e,t),()=>{try{t();}catch{}wo.get(e)===t&&wo.delete(e);}}function Ie(e,t={}){const{path:n,write:o="replace"}=t,r=n?`${e}:${Id(n).join(".")}`:e;async function i(){const u=await ke.select(e);return n?oi(u,n):u}async function a(u){if(typeof o=="function"){const g=await ke.select(e),h=o(u,g);return ke.set(e,h)}const p=await ke.select(e),f=n?pS(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ke.set(e,{...p,...u}):ke.set(e,f)}async function s(u){const p=await i(),f=u(p);return await a(f),f}async function l(u,p,f){let g;const h=x=>{const w=n?oi(x,n):x;if(typeof g>"u"||!f(g,w)){const v=g;g=w,p(w,v);}},y=u?await ke.subscribeImmediate(e,h):await ke.subscribe(e,h);return gS(r,y)}function c(){const u=wo.get(r);if(u){try{u();}catch{}wo.delete(r);}}function d(u){return fS(e,u?.path??n,u)}return {label:r,get:i,set:a,update:s,onChange:(u,p=Object.is)=>l(false,u,p),onChangeNow:(u,p=Object.is)=>l(true,u,p),asSignature:d,stopOnChange:c}}function $(e){return Ie(e)}$("positionAtom");$("lastPositionInMyGardenAtom");$("playerDirectionAtom");$("stateAtom");$("quinoaDataAtom");$("currentTimeAtom");$("actionAtom");$("isPressAndHoldActionAtom");$("mapAtom");$("tileSizeAtom");Ie("mapAtom",{path:"cols"});Ie("mapAtom",{path:"rows"});Ie("mapAtom",{path:"spawnTiles"});Ie("mapAtom",{path:"locations.seedShop.spawnTileIdx"});Ie("mapAtom",{path:"locations.eggShop.spawnTileIdx"});Ie("mapAtom",{path:"locations.toolShop.spawnTileIdx"});Ie("mapAtom",{path:"locations.decorShop.spawnTileIdx"});Ie("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});Ie("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});Ie("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});Ie("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});Ie("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});$("playerAtom");$("myDataAtom");$("myUserSlotIdxAtom");$("isSpectatingAtom");$("myCoinsCountAtom");$("numPlayersAtom");Ie("playerAtom",{path:"id"});Ie("myDataAtom",{path:"activityLogs"});$("userSlotsAtom");$("filteredUserSlotsAtom");$("myUserSlotAtom");$("spectatorsAtom");Ie("stateAtom",{path:"child"});Ie("stateAtom",{path:"child.data"});Ie("stateAtom",{path:"child.data.shops"});const mS=Ie("stateAtom",{path:"child.data.userSlots"}),hS=Ie("stateAtom",{path:"data.players"}),bS=Ie("stateAtom",{path:"data.hostPlayerId"});$("myInventoryAtom");$("myInventoryItemsAtom");$("isMyInventoryAtMaxLengthAtom");$("myFavoritedItemIdsAtom");$("myCropInventoryAtom");$("mySeedInventoryAtom");$("myToolInventoryAtom");$("myEggInventoryAtom");$("myDecorInventoryAtom");$("myPetInventoryAtom");Ie("myInventoryAtom",{path:"favoritedItemIds"});$("itemTypeFiltersAtom");$("myItemStoragesAtom");$("myPetHutchStoragesAtom");$("myPetHutchItemsAtom");$("myPetHutchPetItemsAtom");$("myNumPetHutchItemsAtom");$("myValidatedSelectedItemIndexAtom");$("isSelectedItemAtomSuspended");$("mySelectedItemAtom");$("mySelectedItemNameAtom");$("mySelectedItemRotationsAtom");$("mySelectedItemRotationAtom");$("setSelectedIndexToEndAtom");$("myPossiblyNoLongerValidSelectedItemIndexAtom");$("myCurrentGlobalTileIndexAtom");$("myCurrentGardenTileAtom");$("myCurrentGardenObjectAtom");$("myOwnCurrentGardenObjectAtom");$("myOwnCurrentDirtTileIndexAtom");$("myCurrentGardenObjectNameAtom");$("isInMyGardenAtom");$("myGardenBoardwalkTileObjectsAtom");const xS=Ie("myDataAtom",{path:"garden"});Ie("myDataAtom",{path:"garden.tileObjects"});Ie("myOwnCurrentGardenObjectAtom",{path:"objectType"});$("myCurrentStablePlantObjectInfoAtom");$("myCurrentSortedGrowSlotIndicesAtom");$("myCurrentGrowSlotIndexAtom");$("myCurrentGrowSlotsAtom");$("myCurrentGrowSlotAtom");$("secondsUntilCurrentGrowSlotMaturesAtom");$("isCurrentGrowSlotMatureAtom");$("numGrowSlotsAtom");$("myCurrentEggAtom");$("petInfosAtom");$("myPetInfosAtom");$("myPetSlotInfosAtom");$("myPrimitivePetSlotsAtom");$("myNonPrimitivePetSlotsAtom");$("expandedPetSlotIdAtom");$("myPetsProgressAtom");$("myActiveCropMutationPetsAtom");$("totalPetSellPriceAtom");$("selectedPetHasNewVariantsAtom");const yS=$("shopsAtom"),vS=$("myShopPurchasesAtom");$("seedShopAtom");$("seedShopInventoryAtom");$("seedShopRestockSecondsAtom");$("seedShopCustomRestockInventoryAtom");$("eggShopAtom");$("eggShopInventoryAtom");$("eggShopRestockSecondsAtom");$("eggShopCustomRestockInventoryAtom");$("toolShopAtom");$("toolShopInventoryAtom");$("toolShopRestockSecondsAtom");$("toolShopCustomRestockInventoryAtom");$("decorShopAtom");$("decorShopInventoryAtom");$("decorShopRestockSecondsAtom");$("decorShopCustomRestockInventoryAtom");$("isDecorShopAboutToRestockAtom");Ie("shopsAtom",{path:"seed"});Ie("shopsAtom",{path:"tool"});Ie("shopsAtom",{path:"egg"});Ie("shopsAtom",{path:"decor"});$("myCropItemsAtom");$("myCropItemsToSellAtom");$("totalCropSellPriceAtom");$("friendBonusMultiplierAtom");$("myJournalAtom");$("myCropJournalAtom");$("myPetJournalAtom");$("myStatsAtom");$("myActivityLogsAtom");$("newLogsAtom");$("hasNewLogsAtom");$("newCropLogsFromSellingAtom");$("hasNewCropLogsFromSellingAtom");$("myCompletedTasksAtom");$("myActiveTasksAtom");$("isWelcomeToastVisibleAtom");$("shouldCloseWelcomeToastAtom");$("isInitialMoveToDirtPatchToastVisibleAtom");$("isFirstPlantSeedActiveAtom");$("isThirdSeedPlantActiveAtom");$("isThirdSeedPlantCompletedAtom");$("isDemoTouchpadVisibleAtom");$("areShopAnnouncersEnabledAtom");$("arePresentablesEnabledAtom");$("isEmptyDirtTileHighlightedAtom");$("isPlantTileHighlightedAtom");$("isItemHiglightedInHotbarAtom");$("isItemHighlightedInModalAtom");$("isMyGardenButtonHighlightedAtom");$("isSellButtonHighlightedAtom");$("isShopButtonHighlightedAtom");$("isInstaGrowButtonHiddenAtom");$("isActionButtonHighlightedAtom");$("isGardenItemInfoCardHiddenAtom");$("isSeedPurchaseButtonHighlightedAtom");$("isFirstSeedPurchaseActiveAtom");$("isFirstCropHarvestActiveAtom");$("isWeatherStatusHighlightedAtom");$("weatherAtom");const Bs=$("activeModalAtom");$("hotkeyBeingPressedAtom");$("avatarTriggerAnimationAtom");$("avatarDataAtom");$("emoteDataAtom");$("otherUserSlotsAtom");$("otherPlayerPositionsAtom");$("otherPlayerSelectedItemsAtom");$("otherPlayerLastActionsAtom");$("traderBunnyPlayerId");$("npcPlayersAtom");$("npcQuinoaUsersAtom");$("numNpcAvatarsAtom");$("traderBunnyEmoteTimeoutAtom");$("traderBunnyEmoteAtom");$("unsortedLeaderboardAtom");$("currentGardenNameAtom");$("quinoaEngineAtom");$("quinoaInitializationErrorAtom");$("avgPingAtom");$("serverClientTimeOffsetAtom");$("isEstablishingShotRunningAtom");$("isEstablishingShotCompleteAtom");const Ce={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function zs(){return Ce}function wS(){return Ce.initialized}function so(){return Ce.isCustom&&Ce.activeModal!==null}function eo(){return Ce.activeModal}function xm(e){return !Ce.shadow||Ce.shadow.modal!==e?null:Ce.shadow.data}function SS(e){Ce.initialized=e;}function Pd(e){Ce.activeModal=e;}function Md(e){Ce.isCustom=e;}function ym(e,t){Ce.shadow={modal:e,data:t,timestamp:Date.now()};}function vm(){Ce.shadow=null;}function up(e,t){Ce.patchedAtoms.add(e),Ce.originalReads.set(e,t);}function CS(e){return Ce.originalReads.get(e)}function yc(e){return Ce.patchedAtoms.has(e)}function kS(e){Ce.patchedAtoms.delete(e),Ce.originalReads.delete(e);}function _S(e){Ce.unsubscribes.push(e);}function TS(){for(const e of Ce.unsubscribes)try{e();}catch{}Ce.unsubscribes.length=0;}function AS(e){return Ce.listeners.onOpen.add(e),()=>Ce.listeners.onOpen.delete(e)}function wm(e){return Ce.listeners.onClose.add(e),()=>Ce.listeners.onClose.delete(e)}function Sm(e){for(const t of Array.from(Ce.listeners.onOpen))try{t(e);}catch{}}function Ld(e){for(const t of Array.from(Ce.listeners.onClose))try{t(e);}catch{}}function ES(){TS(),Ce.initialized=false,Ce.activeModal=null,Ce.isCustom=false,Ce.shadow=null,Ce.patchedAtoms.clear(),Ce.originalReads.clear(),Ce.listeners.onOpen.clear(),Ce.listeners.onClose.clear();}const Rd={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Cm(e){return Rd[e]}function IS(e){const t=Rd[e],n=[];for(const o of t.atoms)n.push(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)n.push(o.atomLabel);return n}const PS=new Set(["inventory","journal","stats","activityLog","petHutch"]),MS=new Set(["seedShop","eggShop","toolShop","decorShop"]),LS=new Set(["leaderboard"]);function RS(e,t,n,o){return function(i){const a=so(),s=eo();if(a&&s===o){const l=xm(o);if(l!==null){let c;if(n.dataKey==="_full"?c=l:c=l[n.dataKey],c!==void 0)return t(i),n.transform?n.transform(c):c}}return t(i)}}function NS(e,t,n,o,r){return function(a){if(so()&&eo()===r){const s=xm(r);if(s!==null){const l=s[n];if(l!==void 0)return t(a),o(l)}}return t(a)}}function OS(e){const t=Cm(e);for(const n of t.atoms){const o=vn(n.atomLabel);if(!o||yc(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=RS(n.atomLabel,r,n,e);o.read=i,up(n.atomLabel,r);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const o=vn(n.atomLabel);if(!o||yc(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=NS(n.atomLabel,r,n.sourceKey,n.deriveFn,e);o.read=i,up(n.atomLabel,r);}}async function Gs(e){const t=Cm(e);for(const o of t.atoms)pp(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)pp(o.atomLabel);const n=await Ed();await km(n,e);}async function $S(e){const t=await Ed();await km(t,e);const n=IS(e);for(const o of n){const r=vn(o);if(r)try{t.get(r);}catch{}}}function pp(e){if(!yc(e))return;const t=vn(e),n=CS(e);t&&n&&(t.read=n),kS(e);}async function km(e,t){const n=PS.has(t),o=MS.has(t),r=LS.has(t);if(!n&&!o&&!r)return;const i=vn("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||o){const l=a.child,c=l?.data;if(l&&c&&typeof c=="object"){let d=null;if(n&&Array.isArray(c.userSlots)){const u=c.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,h=g&&typeof g=="object"?{...g}:g;return {...f,data:h}});d={...d??c,userSlots:u};}if(o&&c.shops&&typeof c.shops=="object"&&(d={...d??c,shops:{...c.shops}}),d){const u={...l,data:d};s={...a,child:u};}}}if(r){const l=a.data;if(l&&Array.isArray(l.players)){const c={...l,players:[...l.players]};s={...s??a,data:c};}}if(!s)return;await e.set(i,s);}catch{}}async function FS(){for(const e of Object.keys(Rd))await Gs(e);}let oa=null,Fr=null;async function DS(){if(zs().initialized)return;Fr=await ke.select("activeModalAtom"),oa=setInterval(async()=>{try{const n=await ke.select("activeModalAtom"),o=Fr;o!==n&&(Fr=n,BS(n,o));}catch{}},50),_S(()=>{oa&&(clearInterval(oa),oa=null);}),SS(true);}function BS(e,t){const n=so(),o=eo();e===null&&t!==null&&(n&&o===t?zS("native"):n||Ld({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Sm({modal:e,isCustom:false});}async function zS(e){const t=eo();t&&(vm(),Md(false),Pd(null),await Gs(t),Ld({modal:t,wasCustom:true,closedBy:e}));}async function GS(e,t){if(!zs().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");so()&&await _m(),ym(e,t),Md(true),Pd(e),OS(e),await $S(e),await Bs.set(e),Fr=e,Sm({modal:e,isCustom:true});}function HS(e,t){const n=zs();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const r={...n.shadow.data,...t};ym(e,r);}async function _m(){const e=zs();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;vm(),Md(false),Pd(null),await Bs.set(null),Fr=null,await Gs(t),Ld({modal:t,wasCustom:true,closedBy:"api"});}function jS(){return new Promise(e=>{if(!so()){e();return}const t=wm(()=>{t(),e();});})}async function US(){if(so()){const e=eo();e&&await Gs(e);}await FS(),ES();}const To={async init(){return DS()},isReady(){return wS()},async show(e,t){return GS(e,t)},update(e,t){return HS(e,t)},async close(){return _m()},isOpen(){return eo()!==null},isCustomOpen(){return so()},getActiveModal(){return eo()},waitForClose(){return jS()},onOpen(e){return AS(e)},onClose(e){return wm(e)},async destroy(){return US()}};function WS(){return {ready:false,xform:null,xformAt:0}}const wt=WS();function Tm(){return wt.ready}function Qo(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Ii(){return yt.tos()}function Nd(){return yt.engine()}function VS(){const e=Ii()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Od(e,t){const n=VS();return n?t*n+e|0:null}let ra=null;async function qS(e=15e3){return wt.ready?true:ra||(ra=(async()=>{if(await yt.init(e),!Ii())throw new Error("MGTile: engine captured but tileObject system not found");return wt.ready=true,true})(),ra)}function Yn(e,t,n=true){const o=Ii(),r=Od(e,t);if(!o||r==null)return {gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r);}catch{}return {gidx:r,tv:i||null}}function Sl(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function $d(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Ao(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Nd(),{gidx:s,tv:l}=Yn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");const c=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function Hs(e,t,n={}){const o=n.ensureView!==false,r=n.clone!==false,{gidx:i,tv:a}=Yn(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?Qo(s):s}}function XS(e,t,n={}){return Ao(e,t,null,n)}function KS(e,t,n,o={}){const i=Hs(e,t,{...o,clone:false}).tileView?.tileObject;$d(i,"plant");const a=Qo(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Sl(a.slots[s],n.slotPatch),Ao(e,t,a,o)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);Sl(a.slots[l],s[l]);}}else if(s&&typeof s=="object")for(const l of Object.keys(s)){const c=Number(l)|0;if(Number.isFinite(c)){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);Sl(a.slots[c],s[c]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Ao(e,t,a,o)}return Ao(e,t,a,o)}function YS(e,t,n,o={}){const i=Hs(e,t,{...o,clone:false}).tileView?.tileObject;$d(i,"decor");const a=Qo(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),Ao(e,t,a,o)}function JS(e,t,n,o={}){const i=Hs(e,t,{...o,clone:false}).tileView?.tileObject;$d(i,"egg");const a=Qo(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Ao(e,t,a,o)}function QS(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=Nd(),{gidx:s,tv:l}=Yn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");const c=l.tileObject,d=typeof n=="function"?n(Qo(c)):n;if(l.onDataChanged(d),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function ZS(e,t,n={}){const o=n.ensureView!==false,{gidx:r,tv:i}=Yn(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?Qo(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Cl(e){if(!e)return null;const t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const r of n)if(t(e[r]))return e[r];if(t(e))return e;const o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const r of o)if(t(r))return r;try{for(const r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function La(e){const t=It(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=It(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function eC(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=La(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function tC(){const e=Ii(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(const[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;const s=Yn(i,a,true).tv,l=i+1<t?Yn(i+1,a,true).tv:null,c=Yn(i,a+1,true).tv,d=Cl(s),u=Cl(l),p=Cl(c);if(!d||!u||!p)continue;const f=La(d),g=La(u),h=La(p);if(!f||!g||!h)continue;const y={x:g.x-f.x,y:g.y-f.y},x={x:h.x-f.x,y:h.y-f.y},w=y.x*x.y-y.y*x.x;if(!Number.isFinite(w)||Math.abs(w)<1e-6)continue;const v=1/w,k={a:x.y*v,b:-x.x*v,c:-y.y*v,d:y.x*v},T={x:f.x-i*y.x-a*x.x,y:f.y-i*y.y-a*x.y},b=eC(d),S=b==="center"?T:{x:T.x+.5*(y.x+x.x),y:T.y+.5*(y.y+x.y)};return {ok:true,cols:t,rows:o,vx:y,vy:x,inv:k,anchorMode:b,originCenter:S}}return null}function Am(){return wt.xform=tC(),wt.xformAt=Date.now(),{ok:!!wt.xform?.ok,xform:wt.xform}}function nC(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!wt.xform?.ok||t.forceRebuild||Date.now()-wt.xformAt>n)&&Am();const o=wt.xform;if(!o?.ok)return null;const r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,l=Math.floor(a),c=Math.floor(s),d=[[l,c],[l+1,c],[l,c+1],[l+1,c+1]];let u=null,p=1/0;for(const[f,g]of d){if(f<0||g<0||f>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;const h=o.originCenter.x+f*o.vx.x+g*o.vy.x,y=o.originCenter.y+f*o.vx.y+g*o.vy.y,x=(e.x-h)**2+(e.y-y)**2;x<p&&(p=x,u={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=Od(u.tx,u.ty),u):null}function oC(e,t){const n=wt.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function kt(){if(!Tm())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function rC(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const an={init:qS,isReady:Tm,hook:yt.hook,engine:Nd,tos:Ii,gidx:(e,t)=>Od(Number(e),Number(t)),getTileObject:(e,t,n={})=>(kt(),Hs(e,t,n)),inspect:(e,t,n={})=>(kt(),ZS(e,t,n)),setTileEmpty:(e,t,n={})=>(kt(),XS(e,t,n)),setTilePlant:(e,t,n,o={})=>(kt(),KS(e,t,n,o)),setTileDecor:(e,t,n,o={})=>(kt(),YS(e,t,n,o)),setTileEgg:(e,t,n,o={})=>(kt(),JS(e,t,n,o)),setTileObjectRaw:(e,t,n,o={})=>(kt(),QS(e,t,n,o)),rebuildTransform:()=>(kt(),Am()),pointToTile:(e,t={})=>(kt(),nC(e,t)),tileToPoint:(e,t)=>(kt(),oC(e,t)),getTransform:()=>(kt(),wt.xform),help:rC};function iC(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const le=iC();function Em(){return le.ready}async function aC(e=15e3){if(le.ready)return vc(),true;if(await yt.init(e),le.app=yt.app(),le.ticker=yt.ticker(),le.renderer=yt.renderer(),le.stage=yt.stage(),!le.app||!le.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return le.ready=true,vc(),true}function vc(){const e=X;return e.$PIXI=e.PIXI||null,e.$app=le.app||null,e.$renderer=le.renderer||null,e.$stage=le.stage||null,e.$ticker=le.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:le.ready},e.__MG_PIXI__}function Fd(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function wc(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function ms(e){return !!(e&&typeof e.tint=="number")}function to(e){return !!(e&&typeof e.alpha=="number")}function Ra(e,t,n){return e+(t-e)*n}function sC(e,t,n){const o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,l=t&255,c=Ra(o,a,n)|0,d=Ra(r,s,n)|0,u=Ra(i,l,n)|0;return c<<16|d<<8|u}function lC(e,t=900){const n=[],o=[e];for(;o.length&&n.length<t;){const r=o.pop();if(!r)continue;ms(r)&&n.push(r);const i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a]);}return n}function cC(e,t=25e3){const n=[],o=[e];let r=0;for(;o.length&&r++<t;){const i=o.pop();if(!i)continue;to(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s]);}return n}const dC=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Sc(e){if(!e)return null;if(wc(e))return e;if(!Fd(e))return null;for(const t of dC){const n=e[t];if(wc(n))return n}return null}function uC(e,t){const n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let l=true;for(let c=0;c<t;c++){const d=Sc(i[c]);if(!d){l=false;break}s[c]=d;}if(l)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Fd(i)){const s=i;for(const l of Object.keys(s))n.push({o:s[l],d:a+1});}}}return null}function Im(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(Fd(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;const a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}));}return n}function pC(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const o=Im(t);return le.tileSets.set(n,o),{ok:true,name:n,count:o.length}}function fC(e){return le.tileSets.delete(String(e||"").trim())}function gC(){return Array.from(le.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Pm(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Dd(e){const n=an.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Pm(e))return {entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=le.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a;}else o=Im(e.tiles||[]);const r=new Map;for(const i of o){const a=an.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView);}return {entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function Bd(e){const t=le.highlights.get(e);if(!t)return  false;It(()=>le.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&to(t.root)&&It(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&ms(n.o)&&It(()=>{n.o.tint=n.baseTint;});return le.highlights.delete(e),true}function Mm(e=null){for(const t of Array.from(le.highlights.keys()))e&&!String(t).startsWith(e)||Bd(t);return  true}function Lm(e,t={}){if(!wc(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(le.highlights.has(n))return n;const o=to(e)?Number(e.alpha):null,r=Gt(Number(t.minAlpha??.12),0,1),i=Gt(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=Gt(Number(t.tintMix??.85),0,1),c=t.deepTint!==false,d=[];if(c)for(const f of lC(e))d.push({o:f,baseTint:f.tint});else ms(e)&&d.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,h=g*g*(3-2*g);o!=null&&to(e)&&(e.alpha=Gt(Ra(r,i,h)*o,0,1));const y=h*l;for(const x of d)x.o&&ms(x.o)&&(x.o.tint=sC(x.baseTint,s,y));};return le.ticker?.add(p),le.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:d}),n}function mC(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const o of n)if(String(o||"").toLowerCase()===t)return  true;return  false}function Rm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:o,gidxSet:r}=Dd(t),i=`hlmut:${n}:`;if(t.clear===true)if(!r)Mm(i);else for(const u of Array.from(le.highlights.keys())){if(!u.startsWith(i))continue;const p=u.split(":"),f=Number(p[2]);r.has(f)&&Bd(u);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,l=0,c=0,d=0;for(const[u,p]of o){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let h=false;const y=[];for(let v=0;v<g.length;v++)mC(g[v],n)&&(y.push(v),h=true);if(!h)continue;s++,l+=y.length;const x=p?.childView?.plantVisual||p?.childView||p,w=uC(x,g.length);if(!w){d+=y.length;continue}for(const v of y){const k=w[v];if(!k){d++;continue}const T=`${i}${u}:${v}`;le.highlights.has(T)||(Lm(k,{key:T,...a}),c++);}}return {ok:true,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:c,failedSlots:d}}function hC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=le.watches.get(o);i&&clearInterval(i);const a=setInterval(()=>{It(()=>Rm(n,{...t,clear:!1}));},r);return le.watches.set(o,a),{ok:true,key:o,mutation:n,intervalMs:r}}function bC(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(le.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),le.watches.delete(i),r++);return r>0}const n=le.watches.get(t);return n?(clearInterval(n),le.watches.delete(t),true):false}function xC(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Sc(t)||Sc(e?.displayObject)||null}function Nm(e){const t=le.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&to(n.o)&&Number.isFinite(n.baseAlpha)&&It(()=>{n.o.alpha=n.baseAlpha;});return le.fades.delete(e),true}function Cc(e=null){for(const t of Array.from(le.fades.keys()))e&&!String(t).startsWith(e)||Nm(t);return  true}function Om(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const o=`fade:${n}:`;if(!Pm(t))return Cc(o);const{gidxSet:r}=Dd(t);if(!r)return Cc(o);for(const i of Array.from(le.fades.keys())){if(!i.startsWith(o))continue;const a=Number(i.slice(o.length));r.has(a)&&Nm(i);}return  true}function $m(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const o=Gt(Number(t.alpha??.2),0,1),r=t.deep===true,{entries:i,gidxSet:a}=Dd(t),s=`fade:${n}:`;t.clear===true&&Om(n,t);let l=0,c=0,d=0,u=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;l++;const h=String(g.species||"").trim().toLowerCase();if(!h||h!==n)continue;c++;const y=xC(f);if(!y||!to(y)){u++;continue}const x=`${s}${p}`;if(le.fades.has(x)){It(()=>{y.alpha=o;}),d++;continue}const w=r?cC(y):[y],v=[];for(const k of w)to(k)&&v.push({o:k,baseAlpha:Number(k.alpha)});for(const k of v)It(()=>{k.o.alpha=o;});le.fades.set(x,{targets:v}),d++;}return {ok:true,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:l,matchedPlants:c,applied:d,failed:u,totalFades:le.fades.size}}function yC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=le.fadeWatches.get(o);i&&clearInterval(i);const a=setInterval(()=>{It(()=>$m(n,{...t,clear:!1}));},r);return le.fadeWatches.set(o,a),{ok:true,key:o,species:n,intervalMs:r}}function vC(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(le.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),le.fadeWatches.delete(i),r++);return r>0}const n=le.fadeWatches.get(t);return n?(clearInterval(n),le.fadeWatches.delete(t),true):false}function wC(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function SC(e,t,n={}){const o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==false,a=an.getTileObject(o,r,{ensureView:i,clone:false}),s=a?.tileView||null,l=s?.tileObject,c={ok:true,tx:o,ty:r,gidx:a?.gidx??an.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?wC(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&It(()=>console.log("[MGPixi.inspectTile]",c)),c}function CC(e,t,n){const o=X.PIXI;if(!o)return;let r=le.stage.getChildByName("gemini-overlay");r||(r=new o.Container,r.name="gemini-overlay",le.stage.addChild(r));const i=n.key;let a=r.getChildByName(i);a||(a=new o.Graphics,a.name=i,r.addChild(a));const s=an.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const l=an.getTransform(),c=l?Math.hypot(l.vx.x,l.vx.y):32,d=l?Math.hypot(l.vy.x,l.vy.y):32;a.drawRect(0,0,c,d),a.endFill(),a.x=s.x,a.y=s.y,l&&(a.rotation=Math.atan2(l.vx.y,l.vx.x));}function kC(e){const t=le.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Ke(){if(!Em())throw new Error("MGPixi: call MGPixi.init() first")}const js={init:aC,isReady:Em,expose:vc,get app(){return le.app},get renderer(){return le.renderer},get stage(){return le.stage},get ticker(){return le.ticker},get PIXI(){return X.PIXI||null},defineTileSet:(e,t)=>(Ke(),pC(e,t)),deleteTileSet:e=>(Ke(),fC(e)),listTileSets:()=>(Ke(),gC()),highlightPulse:(e,t)=>(Ke(),Lm(e,t)),stopHighlight:e=>(Ke(),Bd(e)),clearHighlights:e=>(Ke(),Mm(e)),drawOverlayBox:(e,t,n)=>(Ke(),CC(e,t,n)),stopOverlay:e=>(Ke(),kC(e)),highlightMutation:(e,t)=>(Ke(),Rm(e,t)),watchMutation:(e,t)=>(Ke(),hC(e,t)),stopWatchMutation:e=>(Ke(),bC(e)),inspectTile:(e,t,n)=>(Ke(),SC(e,t,n)),fadeSpecies:(e,t)=>(Ke(),$m(e,t)),clearSpeciesFade:(e,t)=>(Ke(),Om(e,t)),clearFades:e=>(Ke(),Cc(e)),watchFadeSpecies:(e,t)=>(Ke(),yC(e,t)),stopWatchFadeSpecies:e=>(Ke(),vC(e))};function _C(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const pe=_C();function Fm(){return pe.ready}const fp=X??window;async function Dm(){const e=pe.ctx;if(e)return e;const t=fp.AudioContext||fp.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return pe.ctx=n,n}async function Bm(){if(pe.ctx&&pe.ctx.state==="suspended")try{await pe.ctx.resume();}catch{}}const TC={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},AC={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Dr=.001,Br=.2;function gp(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n);}catch{o=n;}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){const r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function ri(e){const t=TC[e],n=AC[e];if(!t)return {atom:Br,vol100:ia(Br)};const o=gp(t,NaN);if(Number.isFinite(o)){const i=Gt(o,0,1);return {atom:i,vol100:ia(i)}}if(n){const i=gp(n,NaN);if(Number.isFinite(i)){const a=Gt(i,0,1);return {atom:a,vol100:ia(a)}}}const r=Br;return {atom:r,vol100:ia(r)}}function EC(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const o=(Gt(t,1,100)-1)/99;return Dr+o*(Br-Dr)}function ia(e){const t=Gt(Number(e),0,1);if(t<=Dr)return 0;const n=(t-Dr)/(Br-Dr);return Math.round(1+n*99)}function zm(e,t){if(t==null)return ri(e).atom;const n=EC(t);return n===null?ri(e).atom:hv(n)}function IC(e){const t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r);};for(const o of Object.keys(e||{})){const r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o);}for(const[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);pe.sfx.groups=t;}function PC(e){const t=pe.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=pe.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function MC(){if(pe.sfx.buffer)return pe.sfx.buffer;if(!pe.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Dm();await Bm();const n=await(await Eg(pe.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{const a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i);});return pe.sfx.buffer=o,o}async function LC(e,t={}){if(!pe.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const o=PC(n),r=pe.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);const i=await Dm();await Bm();const a=await MC(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),c=Math.max(.01,l-s),d=zm("sfx",t.volume),u=i.createGain();u.gain.value=d,u.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(u),p.start(0,s,c),{name:o,source:p,start:s,end:l,duration:c,volume:d}}const RC=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),NC=function(e){return "/"+e},mp={},ft=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let l=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");r=l(n.map(c=>{if(c=NC(c),c in mp)return;mp[c]=true;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":RC,d||(p.as="script"),p.crossOrigin="",p.href=c,s&&p.setAttribute("nonce",s),document.head.appendChild(p),d)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return r.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},Uo={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},OC={sounds:[],itemCustomSounds:[],version:1},$t={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class zd extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class $C extends zd{constructor(){super(`Maximum number of sounds reached (${Uo.MAX_SOUNDS})`),this.name="SoundLimitError";}}class FC extends zd{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${Uo.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class DC extends zd{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function BC(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||Gd(t),t}function Us(){const e=Te(vt.MODULE.AUDIO_CUSTOM_SOUNDS,OC);return BC(e)}function Gd(e){Ee(vt.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function hp(){return Us().sounds}function Ws(e){const t=Us();t.sounds=e,Gd(t);}function Vs(){return Us().itemCustomSounds}function Gm(e){const t=Us();t.itemCustomSounds=e,Gd(t);}function zC(e){const t={shop:{soundId:e.shop?.soundId??$t.shop.soundId,volume:e.shop?.volume??$t.shop.volume,mode:e.shop?.mode??$t.shop.mode},pet:{soundId:e.pet?.soundId??$t.pet.soundId,volume:e.pet?.volume??$t.pet.volume,mode:e.pet?.mode??$t.pet.mode},weather:{soundId:e.weather?.soundId??$t.weather.soundId,volume:e.weather?.volume??$t.weather.volume,mode:e.weather?.mode??$t.weather.mode}};return t!==e&&jd(t),t}function Hd(){const e=Te(vt.MODULE.AUDIO_NOTIFICATION_SETTINGS,$t);return zC(e)}function jd(e){Ee(vt.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const GC="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",Hm=[{id:"default-notification",name:"Default",source:GC,type:"upload",createdAt:0}];function HC(e){const t=new Set(e.map(o=>o.id)),n=Hm.filter(o=>!t.has(o.id));return n.length===0?e:[...e,...n]}function jm(e){return Hm.some(t=>t.id===e)}function jC(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const r=e.slice(n+1).length*3/4;return Math.round(r)}function Um(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=jC(e);if(t>0&&t>Uo.MAX_SIZE_BYTES)throw new FC(t)}function Wm(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function UC(e){if(e>=Uo.MAX_SOUNDS)throw new $C}let Ct=[],kc=false;function qt(){kc||Vm();}function WC(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function Vm(){if(kc)return;let e=hp();e=HC(e),e.length!==hp().length&&Ws(e),Ct=e,kc=true,console.log(`[CustomSounds] Initialized with ${Ct.length} sounds`);}function VC(){return qt(),[...Ct]}function qm(e){return qt(),Ct.find(t=>t.id===e)}function qC(e,t,n){qt(),Wm(e),Um(t),UC(Ct.length);const o={id:WC(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return Ct.push(o),Ws(Ct),console.log(`[CustomSounds] Added sound: ${o.name} (${o.id})`),o}function XC(e){if(qt(),jm(e))throw new Error("Cannot remove default sounds");const t=Ct.findIndex(o=>o.id===e);if(t===-1)return  false;const n=Ct.splice(t,1)[0];return Ws(Ct),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function KC(e,t){if(qt(),jm(e))throw new Error("Cannot update default sounds");const n=Ct.find(o=>o.id===e);return n?(t.name!==void 0&&(Wm(t.name),n.name=t.name.trim()),t.source!==void 0&&(Um(t.source),n.source=t.source.trim()),Ws(Ct),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function YC(e,t={}){qt();const n=qm(e);if(!n)throw new DC(e);const{MGAudio:o}=await ft(async()=>{const{MGAudio:r}=await Promise.resolve().then(()=>Jm);return {MGAudio:r}},void 0);try{await o.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(r){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,r),r}}function JC(){ft(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>Jm);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function QC(){return Hd()}function ZC(e){return Hd()[e]}function ek(e,t){const n=Hd();n[e]=t,jd(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function tk(e){jd(e),console.log("[CustomSounds] Updated all notification settings");}function Wo(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function Xm(e,t,n){qt();const o=Vs(),r=Wo(e,t,n);return o.find(i=>Wo(i.entityType,i.entityId,i.shopType)===r)??null}function nk(e,t,n,o){qt();const r=Vs(),i=Wo(e,t,o),a=r.findIndex(l=>Wo(l.entityType,l.entityId,l.shopType)===i),s={entityType:e,entityId:t,shopType:o,soundId:n.soundId,volume:n.volume,mode:n.mode};a!==-1?r[a]=s:r.push(s),Gm(r),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(Cn.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:o,config:n}}));}function ok(e,t,n){qt();const o=Vs(),r=Wo(e,t,n),i=o.findIndex(a=>Wo(a.entityType,a.entityId,a.shopType)===r);return i===-1?false:(o.splice(i,1),Gm(o),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(Cn.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function rk(e,t,n){return Xm(e,t,n)!==null}function ik(e){return qt(),Vs().filter(n=>n.entityType===e)}const ge={init:Vm,getAll:VC,getById:qm,add:qC,remove:XC,update:KC,play:YC,stop:JC,getNotificationSettings:QC,getNotificationConfig:ZC,setNotificationConfig:ek,setNotificationSettings:tk,getItemCustomSound:Xm,setItemCustomSound:nk,removeItemCustomSound:ok,hasItemCustomSound:rk,getItemCustomSoundsByType:ik};let aa=null;async function ak(){return pe.ready?true:aa||(aa=(async()=>{pe.baseUrl=await io.base();const e=await nn.load({baseUrl:pe.baseUrl}),t=nn.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string")continue;const r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){const i=r[1].toLowerCase(),a=r[2];pe.urls[i].set(a,tn(pe.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(pe.sfx.mp3Url=tn(pe.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(pe.sfx.atlasUrl=tn(pe.baseUrl,o));}if(!pe.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return pe.sfx.atlas=await Sd(pe.sfx.atlasUrl),IC(pe.sfx.atlas),ge.init(),pe.ready=true,true})(),aa)}function Km(e){if(e!=="music"&&e!=="ambience")return  false;const t=pe.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return pe.tracks[e]=null,true}function sk(e,t,n={}){if(!pe.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const o=pe.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Km(e);const r=new Audio(o);return r.loop=!!n.loop,r.volume=zm(e,n.volume),r.preload="auto",r.play().catch(()=>{}),pe.tracks[e]=r,r}function lk(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(pe.urls[n].keys()).sort():n==="sfx"?pe.sfx.atlas?t.groups?Array.from(pe.sfx.groups.keys()).sort():Object.keys(pe.sfx.atlas).sort():[]:[]}function ck(){return ["sfx","music","ambience"]}function dk(){return Array.from(pe.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function uk(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return  false;const r=pe.urls[n],i=o.toLowerCase();for(const a of Array.from(r.keys()))if(a.toLowerCase()===i)return  true;return  false}function pk(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const o of Array.from(pe.sfx.groups.keys()))if(o.toLowerCase()===n)return  true;return  false}function fk(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const r=pe.urls[n],i=o.toLowerCase();for(const[a,s]of Array.from(r.entries()))if(a.toLowerCase()===i)return s;return null}function gk(){return pe.tracks.music&&(pe.tracks.music.volume=ri("music").atom),pe.tracks.ambience&&(pe.tracks.ambience.volume=ri("ambience").atom),true}let pt=null;async function mk(e,t={}){Ym();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const o={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,pt?.audio===n&&(pt=null));},setVolume:r=>{n.volume=Math.max(0,Math.min(1,r));},isPlaying:()=>!n.paused&&!n.ended};pt=o;try{await new Promise((r,i)=>{const a=setTimeout(()=>{i(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(a),n.removeEventListener("canplay",l),n.removeEventListener("error",c);},l=()=>{s(),r();},c=()=>{s(),i(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(a),r()):(n.addEventListener("canplay",l,{once:!0}),n.addEventListener("error",c,{once:!0}));}),await n.play();}catch(r){throw pt=null,r}return n.addEventListener("ended",()=>{pt?.audio===n&&(pt=null);}),o}function Ym(){return pt?(pt.stop(),pt=null,true):false}function hk(e){return pt?(pt.setVolume(e),true):false}function bk(){return pt?.isPlaying()??false}function xk(){return pt}function ct(){if(!Fm())throw new Error("MGAudio not ready yet")}async function yk(e,t,n={}){const o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return LC(r,n);if(o==="music"||o==="ambience")return sk(o,r,n);throw new Error(`Unknown category: ${o}`)}const De={init:ak,isReady:Fm,play:yk,stop:e=>(ct(),Km(e)),list:(e,t)=>(ct(),lk(e,t)),refreshVolumes:()=>(ct(),gk()),categoryVolume:e=>(ct(),ri(e)),getCategories:()=>(ct(),ck()),getGroups:()=>(ct(),dk()),hasTrack:(e,t)=>(ct(),uk(e,t)),hasGroup:e=>(ct(),pk(e)),getTrackUrl:(e,t)=>(ct(),fk(e,t)),playCustom:async(e,t)=>(ct(),mk(e,t)),stopCustom:()=>(ct(),Ym()),setCustomVolume:e=>(ct(),hk(e)),isCustomPlaying:()=>(ct(),bk()),getCustomHandle:()=>(ct(),xk()),CustomSounds:ge},Jm=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:De},Symbol.toStringTag,{value:"Module"}));function vk(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const Pe=vk();function Qm(){return Pe.ready}let sa=null;async function wk(){return Pe.ready?true:sa||(sa=(async()=>{Pe.baseUrl=await io.base();const e=await nn.load({baseUrl:Pe.baseUrl}),t=nn.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Pe.byCat.clear(),Pe.byBase.clear();for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;const i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),l=i.slice(a+1),c=tn(Pe.baseUrl,o);Pe.byBase.set(i,c),Pe.byCat.has(s)||Pe.byCat.set(s,new Map),Pe.byCat.get(s).set(l,c);}return Pe.ready=true,true})(),sa)}function _c(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Sk(e,t){if(t===void 0){const i=_c(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),o=_c(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){const i=o.indexOf("_");return {cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return {cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Ck(){return Array.from(Pe.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function kk(e){const t=Pe.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Tc(e,t){const{cat:n,asset:o,base:r}=Sk(e,t),i=Pe.byBase.get(r);if(i)return i;const s=Pe.byCat.get(n)?.get(o);if(s)return s;if(!Pe.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return tn(Pe.baseUrl,`cosmetic/${r}.png`)}const bp=X?.document??document;function _k(){if(Pe.overlay)return Pe.overlay;const e=bp.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),bp.documentElement.appendChild(e),Pe.overlay=e,e}function Tk(){const e=Pe.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Ak(e){return Pe.defaultParent=e,true}const Ek=X?.document??document;function Ac(e,t,n){if(!Pe.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=r!==void 0?Tc(e,r):Tc(e),a=Ek.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):_c(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(const[s,l]of Object.entries(o.style))try{a.style[s]=String(l);}catch{}return a}function Ik(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=o.parent||Tk()||_k(),a=r!==void 0?Ac(e,r,o):Ac(e,o);if(i===Pe.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);const l=o.scale??1,c=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`;else {const d=o.x??innerWidth/2,u=o.y??innerHeight/2;a.style.left=`${d}px`,a.style.top=`${u}px`,a.style.transform=`scale(${l}) rotate(${c}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`);}}return i.appendChild(a),Pe.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}Pe.live.delete(a);},a}function Pk(){for(const e of Array.from(Pe.live))e.__mgDestroy?.();}const Zm=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],Ec="Expression_Stressed.png";function Mk(){try{return Array.from(X.document.querySelectorAll("script")).find(o=>o.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function Lk(){return X.location.pathname.split("/").pop()||"UNKNOWN"}async function Rk(){try{const e=Mk(),t=Lk(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,o=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function kl(){return  false}const hn={ownedFilenames:new Set,loaded:false,error:null},Nk=[];function _l(){Nk.forEach(e=>e());}async function Ud(){try{await Ds();const{Store:e}=await ft(async()=>{const{Store:o}=await Promise.resolve().then(()=>Ei);return {Store:o}},void 0);if(!await e.select("isUserAuthenticatedAtom")){hn.loaded=!0,_l();return}const n=await Rk();hn.ownedFilenames=new Set(n.map(o=>o.cosmeticFilename)),hn.loaded=!0,hn.error=null,_l();}catch(e){hn.error=e,hn.loaded=true,_l();}}function Ok(e){return hn.ownedFilenames.has(e)}function $k(){return hn.loaded}const Ic=[];let xp=false,yp=false;function Fk(){yp||(yp=true,th().then(()=>{}).catch(()=>{}));}Fk();let vp=false;async function Dk(){vp||(await Ud(),vp=true);}function ii(){try{const t=Array.from(X.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${X.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}async function eh(){try{await Ds();const{Store:e}=await ft(async()=>{const{Store:r}=await Promise.resolve().then(()=>Ei);return {Store:r}},void 0);let t=await e.select("playerAtom");for(let r=0;r<5&&(!t||Object.keys(t).length===0);r++)await new Promise(i=>setTimeout(i,200*r)),t=await e.select("playerAtom");if(!t||typeof t=="object"&&Object.keys(t).length===0)throw new Error("playerAtom not available");const n=t.cosmetic,o=t.name;return {avatar:n?.avatar||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:n?.color||"Red",name:o||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:"Red",name:"Player"}}}function Bk(e,t){if(!t)return e;let n=e;if(t.type){const o=Array.isArray(t.type)?t.type:[t.type];n=n.filter(r=>o.includes(r.type));}if(t.availability){const o=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(r=>o.includes(r.availability));}if(t.search){const o=t.search.toLowerCase();n=n.filter(r=>r.displayName.toLowerCase().includes(o));}return n}function zk(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:Ok(n.filename))}async function th(){if(!xp)try{const e=ii(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const i=((await n.json())?.bundles||[]).find(s=>s.name==="cosmetic"||s.name==="cosmetics");if(!i)return;const a=new Set(Zm.map(s=>s.filename));for(const s of i.assets||[])for(const l of s.src||[]){if(typeof l!="string")continue;const c=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(l);if(!c)continue;const d=c[1],u=c[2],p=`${u}.png`;if(a.has(p))continue;const f=u.split("_");if(f.length<2)continue;const g=f[0],h=f.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");Ic.push({id:p,filename:p,type:g,displayName:h,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${d}/`)}${p}`}),a.add(p);}xp=!0,console.log(`[Avatar] Discovered ${Ic.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function Pi(e){const t=ii(),n=Ic.map(c=>({...c,url:c.url||`${t}${c.filename}`})),o=Zm.map(c=>({...c,url:`${t}${c.filename}`})),r=new Set,i=[];for(const c of n)r.has(c.filename)||(i.push(c),r.add(c.filename));for(const c of o)r.has(c.filename)||(i.push(c),r.add(c.filename));const s=[...[],...i];let l=Bk(s,e);return l=zk(l,e),l}async function nh(e){return await Dk(),Pi(e)}async function Gk(){await th();}function Hk(e){return Pi(e).map(t=>t.url)}async function ai(){const{avatar:e,color:t}=await eh();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function jk(){const e=await eh(),t=await ai(),n=Pi(),o={};return n.forEach(r=>{o[r.type]=(o[r.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:o,allItems:n,assetBaseUrl:ii()}}const Uk=100,Tl=[];function Pc(e,t,n){let o="";if(n&&typeof n=="object"){if(t==="PartialState"){const r=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(r||i)o=`PartialState : ${r} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(l=>l!=="type");s.length>0&&(o=`PartialState - {${s.join(", ")}}`);}}if(!o&&n.event&&(o+=`${n.event} `),!o&&n.op&&(o+=`op:${n.op} `),!o&&n.data){const r=Object.keys(n.data);r.length>0&&(o+=`{${r.slice(0,3).join(",")}${r.length>3?"...":""}}`);}else !o&&Array.isArray(n)&&(o+=`[${n.length} items]`);}else typeof n=="string"&&(o=n.slice(0,50));Tl.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:o.trim()||"-"}),Tl.length>Uk&&Tl.shift();}const dt={nativeCtor:null,captured:[],latestOpen:null},wp=Symbol.for("ariesmod.ws.capture.wrapped"),Sp=Symbol.for("ariesmod.ws.capture.native"),oh=1;function Mc(e){return !!e&&e.readyState===oh}function Wk(){if(Mc(dt.latestOpen))return dt.latestOpen;for(let e=dt.captured.length-1;e>=0;e--){const t=dt.captured[e];if(Mc(t))return t}return null}function Vk(e,t){dt.captured.push(e),dt.captured.length>25&&dt.captured.splice(0,dt.captured.length-25);const n=()=>{dt.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{dt.latestOpen===e&&(dt.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",o=>{try{const r=JSON.parse(o.data);Pc("in",r.type||"unknown",r);}catch{Pc("in","raw",o.data);}}),e.readyState===oh&&n();}function qk(e=X,t={}){const n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return ()=>{};if(o[wp])return dt.nativeCtor=o[Sp]??dt.nativeCtor??null,()=>{};const r=o;dt.nativeCtor=r;function i(a,s){const l=s!==void 0?new r(a,s):new r(a);try{Vk(l,n);}catch{}return l}try{i.prototype=r.prototype;}catch{}try{Object.setPrototypeOf(i,r);}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED;}catch{}i[wp]=true,i[Sp]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=r);}catch{}}}function Xk(e=X){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function hs(e=X){const t=Wk();if(t)return {ws:t,source:"captured"};const n=Xk(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function rh(e,t={}){const n=t.pageWindow??X,o=t.intervalMs??500,r=!!t.debug;let i=null,a=null;const s=()=>{const c=hs(n);(c.ws!==i||c.source!==a)&&(i=c.ws,a=c.source,r&&console.log("[WS] best socket changed:",c.source,c.ws),e(c));};s();const l=setInterval(s,o);return ()=>clearInterval(l)}function Kk(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Yk(e,t=X){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:o}=hs(t);if(!o)return {ok:false,reason:"no-ws"};if(!Mc(o))return {ok:false,reason:"not-open"};const r=Kk(e);if(r==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(r);Pc("out",i.type||"unknown",i);}catch{}try{return o.send(r),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function Jk(e,t={},n=X){return Yk({type:e,...t},n)}const sn={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},K={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Rt=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Rt||{});new Set(Object.values(sn));new Set(Object.values(K));const Qk=["Room","Quinoa"],Zk={Room:["Room"],Quinoa:Qk};function me(e,t={},n=X){const o=t,{scopePath:r,scope:i,...a}=o,s=typeof r=="string"?r:i,l=Array.isArray(r)?r:s==="Room"||s==="Quinoa"?Zk[s]:null;return Jk(e,l?{scopePath:l,...a}:a,n)}function e1(e,t=X){return me(K.Chat,{scope:"Room",message:e},t)}function t1(e,t=X){return me(K.Emote,{scope:"Room",emoteType:e},t)}function n1(e,t=X){return me(K.Wish,{scope:"Quinoa",wish:e},t)}function o1(e,t=X){return me(K.KickPlayer,{scope:"Room",playerId:e},t)}function qs(e,t=X){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:o}=e;return me(K.SetPlayerData,{scope:"Room",name:n,cosmetic:o},t)}function r1(e=X){return me(K.UsurpHost,{scope:"Quinoa"},e)}function i1(e=X){return me(K.ReportSpeakingStart,{scope:"Quinoa"},e)}function a1(e,t=X){return me(K.SetSelectedGame,{scope:"Room",gameId:e},t)}function s1(e,t=X){return me(K.VoteForGame,{scope:"Room",gameId:e},t)}function l1(e,t=X){return me(K.RequestGame,{scope:"Room",gameId:e},t)}function c1(e=X){return me(K.RestartGame,{scope:"Room"},e)}function d1(e,t=X){return me(K.Ping,{scope:"Quinoa",id:e},t)}function ih(e,t,n=X){return me(K.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const u1=ih;function p1(e,t,n=X){return me(K.Teleport,{scope:"Quinoa",x:e,y:t},n)}function f1(e=X){return me(K.CheckWeatherStatus,{scope:"Quinoa"},e)}function g1(e,t,n=X){return me(K.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function m1(e,t=X){return me(K.DropObject,{scope:"Quinoa",slotIndex:e},t)}function h1(e,t=X){return me(K.PickupObject,{scope:"Quinoa",objectId:e},t)}function Xs(e,t=X){return me(K.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Wd(e,t="PetHutch",n=X){return me(K.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Vd(e,t="PetHutch",n=X){return me(K.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function b1(e,t,n=X){return me(K.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function x1(e=X){return me(K.LogItems,{scope:"Quinoa"},e)}function y1(e,t,n,o=X){return me(K.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},o)}function v1(e,t=X){return me(K.WaterPlant,{scope:"Quinoa",plantId:e},t)}function w1(e,t=X){return me(K.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function S1(e=X){return me(K.SellAllCrops,{scope:"Quinoa"},e)}function qd(e,t=X){return me(K.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Xd(e,t=X){return me(K.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function Kd(e,t=X){return me(K.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Yd(e,t=X){return me(K.PurchaseSeed,{scope:"Quinoa",species:e},t)}function C1(e,t,n,o=X){return me(K.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},o)}function k1(e,t=X){return me(K.HatchEgg,{scope:"Quinoa",eggId:e},t)}function _1(e,t,n,o=X){return me(K.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},o)}function T1(e,t,n=X){return me(K.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function A1(e,t,n=X){return me(K.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function E1(e,t=X){return me(K.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function I1(e,t,n,o=X){return me(K.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},o)}function P1(e,t=X){return me(K.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function ah(e,t={x:0,y:0},n="Dirt",o=0,r=X){return me(K.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:o},r)}function M1(e,t,n=X){return me(K.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function L1(e,t=X){return me(K.PetPositions,{scope:"Quinoa",positions:e},t)}function sh(e,t,n=X){return me(K.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function lh(e,t=X){return me(K.StorePet,{scope:"Quinoa",itemId:e},t)}function R1(e,t,n=X){return me(K.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function N1(e,t=X){return me(K.SellPet,{scope:"Quinoa",petId:e},t)}async function ch(e){try{const t=await ai(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],o=e.color!==void 0?e.color:t.color,r=qs({cosmetic:{color:o,avatar:n}},X);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:r}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function O1(){return ch({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const Cr=new Map;function $1(e){if(Cr.has(e))return Cr.get(e);const t=new Promise((n,o)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>n(r),r.onerror=()=>{Cr.delete(e),o(new Error(`Failed to load image: ${e}`));},r.src=e;});return Cr.set(e,t),t}function F1(){Cr.clear();}function D1(e){return Pi().find(o=>o.filename===e)?.url||""}async function B1(e,t={}){const n=document.createElement("canvas"),o=t.width||400,r=t.height||400,i=t.scale||1;n.width=o*i,n.height=r*i;const a=n.getContext("2d");if(!a)throw new Error("Failed to get canvas 2D context");if(a.imageSmoothingEnabled=i!==1,e.color){const d={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};a.fillStyle=d[e.color]||"#FF0000",a.fillRect(0,0,n.width,n.height);}const l=[e.bottom,e.mid,e.top,e.expression].filter(d=>!!d).map(d=>D1(d));return (await Promise.all(l.map(d=>$1(d)))).forEach(d=>{a.drawImage(d,0,0,n.width,n.height);}),n}const la={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};let Jd=null,Eo=null,Gn=null,bn=null;function z1(){try{const t=Array.from(X.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return `${X.location.origin}/assets/cosmetic/`}catch{return "https://magicgarden.gg/assets/cosmetic/"}}function Al(e){return z1()+e}function G1(e,t){const o=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(o[la.BOTTOM]=e.bottom),e.mid&&(o[la.MID]=e.mid),e.top&&(o[la.TOP]=e.top),e.expression&&(o[la.EXPRESSION]=e.expression),o}async function H1(e){try{const{Store:t}=await ft(async()=>{const{Store:a}=await Promise.resolve().then(()=>Ei);return {Store:a}},void 0),n=await t.select("myDataAtom"),o=n?.cosmetic?.avatar||[],r=G1(e,o),i=e.color||n?.cosmetic?.color||"Red";return Jd={avatar:r,color:i},U1(),W1(r),console.log("[Avatar] Rendered avatar override:",r),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function j1(){Jd=null,Eo&&(clearInterval(Eo),Eo=null),Gn&&(Gn.disconnect(),Gn=null);const e=X.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),bn&&(bn.remove(),bn=null),console.log("[Avatar] Cleared override"),true}function U1(){if(bn)return;const e=X.document;bn=e.createElement("style"),bn.id="gemini-avatar-override-styles",bn.textContent=`
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
    `,e.head.appendChild(bn);}function W1(e){Eo&&clearInterval(Eo),Gn&&Gn.disconnect();const t=X.document,n=()=>{const r=t.querySelectorAll(".Avatar");let i=0;r.forEach(a=>{const s=Array.from(a.querySelectorAll("img"));if(s.length===4){let c=false;s.forEach((d,u)=>{const p=Al(e[u]);d.src!==p&&(c=true);}),c&&(s.forEach((d,u)=>{d.src=Al(e[u]),d.setAttribute("data-gemini-override",e[u]);}),i++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const c=t.createElement("div");c.className="gemini-avatar-overlay",e.forEach(d=>{const u=t.createElement("img");u.src=Al(d),u.setAttribute("data-gemini-cosmetic",d),c.appendChild(u);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(c),i++;}}),i>0&&console.log(`[Avatar] Re-applied ${i} override(s) (React reverted)`);};n(),Eo=setInterval(n,500),Gn=new MutationObserver(()=>{setTimeout(n,10);});const o=t.querySelector(".game-root")||t.querySelector("#root")||t.body;Gn.observe(o,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function V1(){return Jd}const ca={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};function q1(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===Ec.toLowerCase()}function X1(e){return e.some(q1)}let bs=null,So=null;X.Gemini_AvatarOverride=null;function K1(e,t){const o=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(o[ca.BOTTOM]=e.bottom),e.mid&&(o[ca.MID]=e.mid),e.top&&(o[ca.TOP]=e.top),e.expression&&(o[ca.EXPRESSION]=e.expression),o}async function Qd(e){try{const{Store:t}=await ft(async()=>{const{Store:h}=await Promise.resolve().then(()=>Ei);return {Store:h}},void 0),{getPlayers:n}=await ft(async()=>{const{getPlayers:h}=await Promise.resolve().then(()=>xh);return {getPlayers:h}},void 0);kl();const i=n().get().myPlayer;if(!i)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=i.id,s=i.cosmetic.avatar;X.MagicCircle_PlayerId=a,So||(So=[...s]);let l=K1(e,s);const c=X1(l);kl(),bs=l,X.Gemini_AvatarOverride=l,console.log("[WorldAvatar] Applying override:",l);const d=await t.select("stateAtom");if(!d?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const u=d.data.players.findIndex(h=>h.id===a);if(u===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const p=d.data.players[u],f=[...d.data.players];f[u]={...p,cosmetic:{...p.cosmetic,avatar:l}};const g={...d,data:{...d.data,players:f}};return await t.set("stateAtom",g),kl()&&c||qs({name:i.name,cosmetic:{...i.cosmetic,avatar:l}},X),!0}catch{return  false}}async function dh(){if(!bs||!So)return  true;try{const{Store:e}=await ft(async()=>{const{Store:u}=await Promise.resolve().then(()=>Ei);return {Store:u}},void 0),{getPlayers:t}=await ft(async()=>{const{getPlayers:u}=await Promise.resolve().then(()=>xh);return {getPlayers:u}},void 0);X.Gemini_AvatarOverride=null;const r=t().get().myPlayer;if(!r)return !1;const i=r.id,a=await e.select("stateAtom");if(!a?.data?.players)return !1;const s=a.data.players.findIndex(u=>u.id===i);if(s===-1)return !1;const l=a.data.players[s],c=[...a.data.players];c[s]={...l,cosmetic:{...l.cosmetic,avatar:So}};const d={...a,data:{...a.data,players:c}};return await e.set("stateAtom",d),qs({name:r.name,cosmetic:{...r.cosmetic,avatar:So}},X),bs=null,So=null,!0}catch{return  false}}function Y1(){return bs}let at=[];const Na=[],Cp=()=>{Na.forEach(e=>e([...at]));},gn={init(){at=Te(vt.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...at]},async save(e,t,n){const o=n||Math.random().toString(36).substring(2,9),r={...t,id:o,name:e,createdAt:n&&at.find(i=>i.id===n)?.createdAt||Date.now()};if(n){const i=at.findIndex(a=>a.id===n);i!==-1?at[i]=r:at.push(r);}else at.push(r);return Ee(vt.SECTION.AVATAR_LOADOUTS,at),Cp(),o},delete(e){at=at.filter(t=>t.id!==e),Ee(vt.SECTION.AVATAR_LOADOUTS,at),Cp();},rename(e,t){const n=at.find(o=>o.id===e);n&&(n.name=t,Ee(vt.SECTION.AVATAR_LOADOUTS,at));},async wear(e){const t=at.find(o=>o.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await Qd(n)},subscribe(e){return Na.push(e),()=>{const t=Na.indexOf(e);t!==-1&&Na.splice(t,1);}}},J1={init:Ud,isReady:()=>$k(),list:Pi,listAsync:nh,listUrls:Hk,get:ai,debug:jk,set:ch,blank:O1,Loadouts:gn,toCanvas:B1,clearImageCache:F1,render:H1,clearOverride:j1,getOverride:V1,renderWorld:Qd,clearWorldOverride:dh,getWorldOverride:Y1};function $n(){if(!Qm())throw new Error("MGCosmetic not ready yet")}const Zd={init:wk,isReady:Qm,categories:()=>($n(),Ck()),list:e=>($n(),kk(e)),url:((e,t)=>($n(),Tc(e,t))),create:((e,t,n)=>($n(),Ac(e,t,n))),show:((e,t,n)=>($n(),Ik(e,t,n))),attach:e=>($n(),Ak(e)),clear:()=>($n(),Pk()),Avatar:J1},kp={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function uh(e){const t=J.get("mutations");if(!t)return kp[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?kp[e]??null:n.coinMultiplier}const El=new Map;function Il(e){if(El.has(e))return El.get(e);const t=uh(e)??1;return El.set(e,t),t}const Q1=new Set(["Gold","Rainbow"]),Z1=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function eu(e){let t=1,n=0,o=0;for(const r of e)if(r==="Gold"||r==="Rainbow")r==="Rainbow"?t=Il("Rainbow"):t===1&&(t=Il("Gold"));else {const i=Il(r);i>1&&(n+=i,o++);}return t*(1+n-o)}function e_(e){return uh(e)}function t_(e){return Q1.has(e)}function n_(e){return Z1.has(e)}function o_(e){return n_(e)}function tu(e,t){const n=Ks(e);if(!n)return 50;const o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;const r=(t-1)/(o-1);return Math.floor(50+50*r)}function Pt(e,t,n){const o=Ks(e);if(!o)return 0;const r=o.baseSellPrice,i=eu(n);return Math.round(r*t*i)}function r_(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const o=t-e,r=n-e;return Math.floor(r/o*100)}function i_(e,t){return t>=e}function Ks(e){const t=J.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const ph=3600,Pl=80,a_=100,kr=30;function Ys(e){return e/ph}function Mi(e,t){const n=Ri(e);if(!n)return Pl;const o=n.maxScale;if(t<=1)return Pl;if(t>=o)return a_;const r=(t-1)/(o-1);return Math.floor(Pl+20*r)}function Li(e,t,n){const o=Ri(e);if(!o)return n-kr;const r=o.hoursToMature,i=t/ph,a=kr/r,s=Math.min(a*i,kr),l=n-kr;return Math.floor(l+s)}function Js(e,t){const n=Ri(e);return n?t>=n.hoursToMature:false}function fh(e){const t=Ri(e);return t?kr/t.hoursToMature:0}function s_(e,t,n){const o=t-e;return o<=0||n<=0?0:o/n}function Ri(e){const t=J.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function gh(e,t){return t<=0?1:Math.min(1,e/t)}const We=3600,da=80,_p=100,Ht=30,l_={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Ni(e){const t=J.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function c_(e){return e/We}function Oi(e,t){const n=Ni(e);if(!n)return da;const{maxScale:o}=n;if(t<=1)return da;if(t>=o)return _p;const r=(t-1)/(o-1);return Math.floor(da+(_p-da)*r)}function d_(e){return e-Ht}function u_(e){const t=Ni(e);return !t||t.hoursToMature<=0?0:Ht/t.hoursToMature}function $i(e,t,n){const o=Ni(e);if(!o)return n-Ht;const r=t/We,i=Ht/o.hoursToMature,a=Math.min(i*r,Ht),s=n-Ht;return Math.floor(s+a)}function mh(e,t,n){const o=Ni(e);if(!o)return 0;const r=n-Ht,i=t-r;if(i<=0)return 0;const a=Ht/o.hoursToMature;return a<=0?0:i/a*We}function nu(e,t,n,o,r=We){const a=mh(e,n,o)-t;return a<=0?0:r<=0?1/0:a/r}function Qs(e,t,n,o=We){return nu(e,t,n,n,o)}function ou(e,t,n,o,r=We){if(n>=o)return 0;const i=n+1;return nu(e,t,i,o,r)}function p_(e,t){return e>=t}function f_(e,t){const n=t-Ht,r=(e-n)/Ht*100;return Math.min(100,Math.max(0,r))}const g_=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:c_,calculateCurrentStrength:$i,calculateHoursToMaxStrength:Qs,calculateHoursToNextStrength:ou,calculateHoursToStrength:nu,calculateMaxStrength:Oi,calculateStartingStrength:d_,calculateStrengthPerHour:u_,calculateStrengthProgress:f_,calculateXpForStrength:mh,getSpeciesData:Ni,isPetMature:p_},Symbol.toStringTag,{value:"Module"}));function ru(e){const t=J.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const o=l_[e];return o?n.coinsToFullyReplenishHunger/o*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function m_(e,t){return e<=0?0:t<=0?1/0:e/t}function iu(e,t,n,o){if(e<=0||n<=0)return 0;const r=t/n;if(r>=e)return 0;const i=e-r,a=o/n;return Math.ceil(i/a)}function au(e,t,n){const o=J.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const i=r.coinsToFullyReplenishHunger,a=ru(e);return iu(n,t,a,i)}function si(e,t,n){const o=J.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const i=r.coinsToFullyReplenishHunger,a=ru(e);return iu(n,t,a,i)}function su(e,t,n,o,r,i){return e?t&&i>0?si(n,o,i):0:si(n,o,r)}const h_=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:su,calculateFeedsForDuration:iu,calculateFeedsToMaxStrength:si,calculateFeedsToNextStrength:au,calculateHoursUntilStarving:m_,getHungerDrainPerHour:ru},Symbol.toStringTag,{value:"Module"})),hh={init(){},isReady(){return  true},crop:{calculateSize:tu,calculateSellPrice:Pt,calculateProgress:r_,isReady:i_,getData:Ks},pet:{calculateAge:Ys,calculateMaxStrength:Mi,calculateCurrentStrength:Li,isMature:Js,calculateStrengthPerHour:fh,getData:Ri},mutation:{calculateMultiplier:eu,getValue:e_,isGrowth:t_,isEnvironmental:o_},xp:g_,feed:h_};function Mt(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!Mt(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return  false;for(const a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!Mt(n[a],o[a]))return  false;return  true}const Tp={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Ap={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function b_(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function x_(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function y_(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function v_(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function w_(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,o=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function Ep(e){return {position:b_(e),tile:x_(e),garden:y_(e),object:v_(e),plant:w_(e)}}function Ip(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function S_(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!Mt(e.data,t.data)}function C_(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!Mt(e.sortedSlotIndices,t.sortedSlotIndices)?true:!Mt(e.slots,t.slots)}function k_(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function __(){let e=Ap,t=Ap,n=false;const o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(Tp),s=new Set;function l(){if(s.size<a.length)return;const d=Ep(i);if(!Mt(e,d)&&(t=e,e=d,!!n)){for(const u of r.all)u(e,t);if(Ip(t)!==Ip(e))for(const u of r.stable)u(e,t);if(S_(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of r.object)p(u);}if(C_(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of r.plantInfo)p(u);}if(k_(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of r.garden)p(u);}}}async function c(){if(n)return;const d=a.map(async u=>{const p=Tp[u],f=await ke.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=Ep(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeObject(d,u){return r.object.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.object,previous:e.object}),()=>r.object.delete(d)},subscribePlantInfo(d,u){return r.plantInfo.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(d)},subscribeGarden(d,u){return r.garden.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.garden,previous:e.garden}),()=>r.garden.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=false;}}}let Ml=null;function rt(){return Ml||(Ml=__()),Ml}function T_(){let e=null;const t=[],n=new Set,o={},r=new Set,i=2;function a(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function l(u,p){const{cols:f,rows:g}=u,h=f*g,y=new Set,x=new Set,w=new Map,v=[],k=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],T=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],b=Math.max(k.length,T.length);for(let C=0;C<b;C++){const I=k[C]??[],O=T[C]??[],z=I.map((W,Y)=>(y.add(W),w.set(W,C),{globalIndex:W,localIndex:Y,position:a(f,W)})),j=O.map((W,Y)=>(x.add(W),w.set(W,C),{globalIndex:W,localIndex:Y,position:a(f,W)}));v.push({userSlotIdx:C,dirtTiles:z,boardwalkTiles:j,allTiles:[...z,...j]});}const S=u.spawnTiles.map(C=>a(f,C)),_={};if(u.locations)for(const[C,I]of Object.entries(u.locations)){const O=I.spawnTileIdx??[];_[C]={name:C,spawnTiles:O,spawnPositions:O.map(z=>a(f,z))};}return {cols:f,rows:g,totalTiles:h,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:S,locations:_,userSlots:v,globalToXY(C){return a(f,C)},xyToGlobal(C,I){return s(f,C,I)},getTileOwner(C){return w.get(C)??null},isDirtTile(C){return y.has(C)},isBoardwalkTile(C){return x.has(C)}}}function c(){if(r.size<i||e)return;const u=o.map,p=o.tileSize??0;if(u){e=l(u,p);for(const f of n)f(e);n.clear();}}async function d(){const u=await ke.subscribe("mapAtom",f=>{o.map=f,r.add("map"),c();});t.push(u);const p=await ke.subscribe("tileSizeAtom",f=>{o.tileSize=f,r.add("tileSize"),c();});t.push(p);}return d(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let Ll=null;function Lc(){return Ll||(Ll=T_()),Ll}function A_(){const e=J.get("mutations");return e?Object.keys(e):[]}function bh(){const e={};for(const t of A_())e[t]=[];return e}function Rc(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:bh()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Pp(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function E_(e,t,n,o){const r=t.slots.filter(i=>o>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function I_(e,t,n,o,r){return {tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime,fruitCount:1}}function P_(e,t,n,o){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function Mp(e,t,n,o){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function Lp(e,t){const{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return Rc();const i=t().get(),a=i?.userSlots[o],s=a?.dirtTiles??[],l=a?.boardwalkTiles??[],c=[],d=[],u=[],p={},f=[],g=[],h=[],y=[],x=bh(),w=[],v=[],k=[],T={},b=[],S=[],_={},C=new Set,I=new Set;for(const[W,Y]of Object.entries(n.tileObjects)){const N=parseInt(W,10);C.add(N);const D=i?i.globalToXY(N):{x:0,y:0};if(Y.objectType==="plant"){const H=Y,G=E_(W,H,D,r);c.push(G),G.isMature?d.push(G):u.push(G),p[G.species]||(p[G.species]=[]),p[G.species].push(G);for(let q=0;q<H.slots.length;q++){const E=H.slots[q],P=I_(W,D,q,E,r);if(f.push(P),P.isMature?g.push(P):h.push(P),P.mutations.length>0){y.push(P);for(const A of P.mutations)x[A]||(x[A]=[]),x[A].push(P);}}}else if(Y.objectType==="egg"){const G=P_(W,Y,D,r);w.push(G),T[G.eggId]||(T[G.eggId]=[]),T[G.eggId].push(G),G.isMature?v.push(G):k.push(G);}else if(Y.objectType==="decor"){const G=Mp(W,Y,D,"tileObjects");b.push(G),_[G.decorId]||(_[G.decorId]=[]),_[G.decorId].push(G);}}for(const[W,Y]of Object.entries(n.boardwalkTileObjects)){const N=parseInt(W,10);I.add(N);const D=i?i.globalToXY(N):{x:0,y:0},G=Mp(W,Y,D,"boardwalk");S.push(G),_[G.decorId]||(_[G.decorId]=[]),_[G.decorId].push(G);}const O=[...b,...S],z=s.filter(W=>!C.has(W.localIndex)),j=l.filter(W=>!I.has(W.localIndex));return {garden:n,mySlotIndex:o,plants:{all:c,mature:d,growing:u,bySpecies:p,count:c.length},crops:{all:f,mature:g,growing:h,mutated:{all:y,byMutation:x}},eggs:{all:w,mature:v,growing:k,byType:T,count:w.length},decors:{tileObjects:b,boardwalk:S,all:O,byType:_,count:O.length},tiles:{tileObjects:s,boardwalk:l,empty:{tileObjects:z,boardwalk:j}},counts:{plants:c.length,maturePlants:d.length,crops:f.length,matureCrops:g.length,eggs:w.length,matureEggs:v.length,decors:O.length,emptyTileObjects:z.length,emptyBoardwalk:j.length}}}function M_(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function L_(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function R_(e,t,n){const o=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),r=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !o.has(a)&&r.has(a)})}function N_(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function O_(e,t){const n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(const r of t){const i=o.get(r.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,r.slots.length);for(let s=0;s<a;s++){const l=new Set(i.slots[s].mutations),c=new Set(r.slots[s].mutations),d=[...c].filter(p=>!l.has(p)),u=[...l].filter(p=>!c.has(p));if(d.length>0||u.length>0){const p=Date.now(),f=r.slots[s],g={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime,fruitCount:1};n.push({crop:g,added:d,removed:u});}}}return n}function $_(e,t,n){const o=[],r=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=r.get(a.tileIndex);if(!s)continue;const l=Math.min(a.slots.length,s.slots.length);for(let c=0;c<l;c++){const d=a.slots[c],u=s.slots[c];if(d.startTime!==u.startTime){const p=i.get(`${a.tileIndex}:${c}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:c,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true,fruitCount:1};o.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let c=s.slotsCount;c<a.slotsCount;c++){const d=i.get(`${a.tileIndex}:${c}`);if(!d||!d.isMature)continue;const u=a.slots[c];if(!u)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:c,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true,fruitCount:1};o.push({crop:p,remainingSlots:s.slotsCount});}}return o}function F_(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function D_(e,t){const n=l=>`${l.tileIndex}:${l.location}`,o=l=>`${l.tileIndex}:${l.location}`,r=new Set(e.map(n)),i=new Set(t.map(o)),a=t.filter(l=>!r.has(o(l))),s=e.filter(l=>!i.has(n(l)));return {added:a,removed:s}}function B_(){let e=Rc(),t=Rc(),n=false;const o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function l(){if(a.size<s)return;const d=Lp(i,Lc);if(Mt(e,d)||(t=e,e=d,!n))return;for(const v of r.all)v(e,t);if(Pp(t)!==Pp(e))for(const v of r.stable)v(e,t);const u=M_(t.plants.all,e.plants.all);for(const v of u.added)for(const k of r.plantAdded)k({plant:v});for(const v of u.removed)for(const k of r.plantRemoved)k({plant:v,tileIndex:v.tileIndex});const p=L_(t.plants.mature,e.plants.mature,e.plants.all);for(const v of p)for(const k of r.plantMatured)k({plant:v});const f=O_(t.plants.all,e.plants.all);for(const v of f)for(const k of r.cropMutated)k(v);const g=R_(t.crops.mature,e.crops.mature,e.crops.all);for(const v of g)for(const k of r.cropMatured)k({crop:v});const h=$_(t.plants.all,e.plants.all,t.crops.all);for(const v of h)for(const k of r.cropHarvested)k(v);const y=F_(t.eggs.all,e.eggs.all);for(const v of y.added)for(const k of r.eggPlaced)k({egg:v});for(const v of y.removed)for(const k of r.eggRemoved)k({egg:v});const x=N_(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const v of x)for(const k of r.eggMatured)k({egg:v});const w=D_(t.decors.all,e.decors.all);for(const v of w.added)for(const k of r.decorPlaced)k({decor:v});for(const v of w.removed)for(const k of r.decorRemoved)k({decor:v});}async function c(){if(n)return;const d=await xS.onChangeNow(p=>{i.garden=p,a.add("garden"),l();});o.push(d);const u=await ke.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),l();});o.push(u),n=true,a.size===s&&(e=Lp(i,Lc));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribePlantAdded(d,u){if(r.plantAdded.add(d),u?.immediate&&n&&a.size===s)for(const p of e.plants.all)d({plant:p});return ()=>r.plantAdded.delete(d)},subscribePlantRemoved(d,u){return r.plantRemoved.add(d),()=>r.plantRemoved.delete(d)},subscribePlantMatured(d,u){if(r.plantMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.plants.mature)d({plant:p});return ()=>r.plantMatured.delete(d)},subscribeCropMutated(d,u){if(r.cropMutated.add(d),u?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)d({crop:p,added:p.mutations,removed:[]});return ()=>r.cropMutated.delete(d)},subscribeCropMatured(d,u){if(r.cropMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.crops.mature)d({crop:p});return ()=>r.cropMatured.delete(d)},subscribeCropHarvested(d,u){return r.cropHarvested.add(d),()=>r.cropHarvested.delete(d)},subscribeEggPlaced(d,u){if(r.eggPlaced.add(d),u?.immediate&&n&&a.size===s)for(const p of e.eggs.all)d({egg:p});return ()=>r.eggPlaced.delete(d)},subscribeEggRemoved(d,u){return r.eggRemoved.add(d),()=>r.eggRemoved.delete(d)},subscribeEggMatured(d,u){if(r.eggMatured.add(d),u?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)d({egg:p});return ()=>r.eggMatured.delete(d)},subscribeDecorPlaced(d,u){if(r.decorPlaced.add(d),u?.immediate&&n&&a.size===s)for(const p of e.decors.all)d({decor:p});return ()=>r.decorPlaced.delete(d)},subscribeDecorRemoved(d,u){return r.decorRemoved.add(d),()=>r.decorRemoved.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=false;}}}let Rl=null;function Zo(){return Rl||(Rl=B_()),Rl}const Rp={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Np(e,t){const n=Ys(e.xp),o=Mi(e.petSpecies,e.targetScale),r=Li(e.petSpecies,e.xp,o),i=Js(e.petSpecies,n),l=J.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,c=e.hunger/l*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:c,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:i}}function z_(e,t){const o=t[e.slot.id]?.lastAbilityTrigger??null,r=Ys(e.slot.xp),i=Mi(e.slot.petSpecies,e.slot.targetScale),a=Li(e.slot.petSpecies,e.slot.xp,i),s=Js(e.slot.petSpecies,r),d=J.get("pets")?.[e.slot.petSpecies]?.coinsToFullyReplenishHunger??1,u=e.slot.hunger/d*100;return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,hungerPercent:u,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:a,maxStrength:i,isMature:s}}const Op=500;let Ft=[],Oa=0;function G_(){try{const e=Te(vt.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Oa=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function H_(e){try{Ee(vt.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function j_(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function U_(e){if(!e||!Array.isArray(e))return;const t=pm(e),n=[];for(const o of t)if(o.timestamp>Oa){const r=j_(o);r&&n.push(r);}n.length!==0&&(Oa=Math.max(...n.map(o=>o.performedAt),Oa),Ft=[...n,...Ft],Ft.length>Op&&(Ft=Ft.slice(0,Op)),H_(Ft),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${Ft.length})`));}function $p(e){const t=new Set,n=[];for(const f of e.active??[]){const g=z_(f,e.slotInfos??{});n.push(g),t.add(g.id);}const o=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Np(f,"inventory");o.push(g),t.add(g.id);}const r=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Np(f,"hutch");r.push(g),t.add(g.id);}const i=[...n,...o,...r],a=e.expandedPetSlotId??null,s=a?i.find(f=>f.id===a)??null:null,d=Zo().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length},hutch:{hasHutch:d,currentItems:u,maxItems:25},expandedPetSlotId:a,expandedPet:s,abilityLogs:[...Ft]}}const Fp={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function W_(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Dp(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function V_(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Dp),o=t.all.map(Dp);return W_(n,o)}function q_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location});}return n}function X_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){if(!r.lastAbilityTrigger)continue;const a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger});}return n}function K_(e,t){const n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function Y_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.growthStage>i.growthStage&&n.push({pet:r,previousStage:i.growthStage,newStage:r.growthStage});}return n}function J_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength>i.currentStrength&&n.push({pet:r,previousStrength:i.currentStrength,newStrength:r.currentStrength});}return n}function Q_(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength===r.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:r});}return n}function Z_(){let e=Fp,t=Fp,n=false;const o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Rp),s=new Set;function l(){if(s.size<a.length)return;if(i.activityLogs){const x=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(x)&&U_(x);}const d=$p(i);if(Mt(e,d)||(t=e,e=d,!n))return;for(const x of r.all)x(e,t);if(!V_(t,e))for(const x of r.stable)x(e,t);const u=q_(t,e);for(const x of u)for(const w of r.location)w(x);const p=X_(t,e);for(const x of p)for(const w of r.ability)w(x);const f=K_(t,e);if(f)for(const x of r.count)x(f);const g=Y_(t,e);for(const x of g)for(const w of r.growth)w(x);const h=J_(t,e);for(const x of h)for(const w of r.strengthGain)w(x);const y=Q_(t,e);for(const x of y)for(const w of r.maxStrength)w(x);if(t.expandedPetSlotId!==e.expandedPetSlotId){const x={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const w of r.expandedPet)w(x);}}async function c(){if(n)return;Ft=G_(),console.log(`[myPets] Loaded ${Ft.length} ability logs from storage`);const d=a.map(async u=>{const p=Rp[u],f=await ke.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=$p(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeLocation(d,u){if(r.location.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,from:p.location,to:p.location});return ()=>r.location.delete(d)},subscribeAbility(d,u){if(r.ability.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&d({pet:p,trigger:p.lastAbilityTrigger});return ()=>r.ability.delete(d)},subscribeCount(d,u){return r.count.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(d)},subscribeExpandedPet(d,u){return r.expandedPet.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(d)},subscribeGrowth(d,u){if(r.growth.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>r.growth.delete(d)},subscribeStrengthGain(d,u){if(r.strengthGain.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)d({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>r.strengthGain.delete(d)},subscribeMaxStrength(d,u){if(r.maxStrength.add(d),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&d({pet:p});return ()=>r.maxStrength.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=false;}}}let Nl=null;function lo(){return Nl||(Nl=Z_()),Nl}const Bp={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},zp={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Gp(e){const t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex;let i=null;return r!==null&&r>=0&&r<n.length&&(i={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Hp(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function eT(e,t){return Hp(e)===Hp(t)}function tT(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function ua(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function nT(e,t){const n=new Set(e.map(ua)),o=new Set(t.map(ua)),r=t.filter(a=>!n.has(ua(a))),i=e.filter(a=>!o.has(ua(a)));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:{before:e.length,after:t.length}}}function oT(e,t){const n=new Set(e),o=new Set(t),r=t.filter(a=>!n.has(a)),i=e.filter(a=>!o.has(a));return r.length===0&&i.length===0?null:{added:r,removed:i,current:t}}function rT(){let e=zp,t=zp,n=false;const o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Bp),s=new Set;function l(){if(s.size<a.length)return;const d=Gp(i);if(Mt(e,d)||(t=e,e=d,!n))return;for(const f of r.all)f(e,t);if(!eT(t,e))for(const f of r.stable)f(e,t);if(tT(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of r.selection)g(f);}const u=nT(t.items,e.items);if(u)for(const f of r.items)f(u);const p=oT(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of r.favorites)f(p);}async function c(){if(n)return;const d=a.map(async u=>{const p=Bp[u],f=await ke.subscribe(p,g=>{i[u]=g,s.add(u),l();});o.push(f);});await Promise.all(d),n=true,s.size===a.length&&(e=Gp(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&s.size===a.length&&d(e,e),()=>r.stable.delete(d)},subscribeSelection(d,u){return r.selection.add(d),u?.immediate&&n&&s.size===a.length&&d({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(d)},subscribeItems(d,u){return r.items.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(d)},subscribeFavorites(d,u){return r.favorites.add(d),u?.immediate&&n&&s.size===a.length&&d({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=false;}}}let Ol=null;function Nt(){return Ol||(Ol=rT()),Ol}const Nc={all:[],host:null,myPlayer:null,count:0};function iT(e,t,n){const o=n.get(e.id),r=o?.slot,i=r?.data,a=r?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function jp(e){const t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[],r=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Nc;const i=new Map;Array.isArray(o)&&o.forEach((c,d)=>{c?.type==="user"&&c?.playerId&&i.set(c.playerId,{slot:c,index:d});});const a=t.map(c=>iT(c,n,i)),s=a.find(c=>c.isHost)??null,l=r!==null?a.find(c=>c.slotIndex===r)??null:null;return {all:a,host:s,myPlayer:l,count:a.length}}function Up(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function aT(e,t){const n=[],o=new Set(e.map(i=>i.id)),r=new Set(t.map(i=>i.id));for(const i of t)o.has(i.id)||n.push({player:i,type:"join"});for(const i of e)r.has(i.id)||n.push({player:i,type:"leave"});return n}function sT(e,t){const n=[],o=new Map(e.map(r=>[r.id,r]));for(const r of t){const i=o.get(r.id);i&&i.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected});}return n}function lT(){let e=Nc,t=Nc,n=false;const o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=4;function l(){if(a.size<s)return;const d=jp(i);if(Mt(e,d)||(t=e,e=d,!n))return;for(const h of r.all)h(e,t);if(Up(t)!==Up(e))for(const h of r.stable)h(e,t);const u=aT(t.all,e.all);for(const h of u)for(const y of r.joinLeave)y(h);const p=sT(t.all,e.all);for(const h of p)for(const y of r.connection)y(h);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const h={current:e.host,previous:t.host};for(const y of r.host)y(h);}}async function c(){if(n)return;const d=await hS.onChangeNow(g=>{i.players=g,a.add("players"),l();});o.push(d);const u=await bS.onChangeNow(g=>{i.hostPlayerId=g,a.add("hostPlayerId"),l();});o.push(u);const p=await mS.onChangeNow(g=>{i.userSlots=g,a.add("userSlots"),l();});o.push(p);const f=await ke.subscribe("myUserSlotIdxAtom",g=>{i.myUserSlotIndex=g,a.add("myUserSlotIndex"),l();});o.push(f),n=true,a.size===s&&(e=jp(i));}return c(),{get(){return e},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribeJoinLeave(d,u){if(r.joinLeave.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)d({player:p,type:"join"});return ()=>r.joinLeave.delete(d)},subscribeConnection(d,u){if(r.connection.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)d({player:p,isConnected:p.isConnected});return ()=>r.connection.delete(d)},subscribeHost(d,u){return r.host.add(d),u?.immediate&&n&&a.size===s&&d({current:e.host,previous:e.host}),()=>r.host.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=false;}}}let $l=null;function lu(){return $l||($l=lT()),$l}const xh=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:lu},Symbol.toStringTag,{value:"Module"})),Fi=["seed","tool","egg","decor"];function cT(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function dT(e,t,n){const o=cT(e,t),r=n[o]??0,i=Math.max(0,e.initialStock-r);return {id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:i,isAvailable:i>0,price:e.price}}function uT(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const r=n[e]?.purchases??{},i=(t.inventory??[]).map(c=>dT(c,e,r)),a=i.filter(c=>c.isAvailable).length,s=t.secondsUntilRestock??0,l=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:l}}function Wp(e){const t=e.shops,n=e.purchases??{},o=Fi.map(s=>uT(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},i=o.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const l=i.sort((c,d)=>(c.restockAt??0)-(d.restockAt??0))[0];a={shop:l.type,seconds:l.secondsUntilRestock,at:l.restockAt};}return {all:o,byType:r,nextRestock:a}}const Vp={all:Fi.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function qp(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function pT(e,t){const n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function fT(e,t){const n=[];for(const o of Fi){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const l=a.get(s.id);l&&s.purchased>l.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-l.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function gT(e,t){const n=[];for(const o of Fi){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const l=a.get(s.id);l&&l.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:l.isAvailable,isAvailable:s.isAvailable});}}return n}function mT(){let e=Vp,t=Vp,n=false;const o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function l(){if(a.size<s)return;const d=Wp(i);if(Mt(e,d)||(t=e,e=d,!n))return;for(const g of r.all)g(e,t);if(qp(t)!==qp(e))for(const g of r.stable)g(e,t);const u={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(const g of Fi){const h=pT(t.byType[g],e.byType[g]);if(h)for(const y of u[g])y(h);}const p=fT(t,e);for(const g of p)for(const h of r.purchase)h(g);const f=gT(t,e);for(const g of f)for(const h of r.availability)h(g);}async function c(){if(n)return;const d=await yS.onChangeNow(p=>{i.shops=p,a.add("shops"),l();});o.push(d);const u=await vS.onChangeNow(p=>{i.purchases=p,a.add("purchases"),l();});o.push(u),n=true,a.size===s&&(e=Wp(i));}return c(),{get(){return e},getShop(d){return e.byType[d]},getItem(d,u){return e.byType[d].items.find(f=>f.id===u)??null},subscribe(d,u){return r.all.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.all.delete(d)},subscribeStable(d,u){return r.stable.add(d),u?.immediate!==false&&n&&a.size===s&&d(e,e),()=>r.stable.delete(d)},subscribeSeedRestock(d,u){return r.seedRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(d)},subscribeToolRestock(d,u){return r.toolRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(d)},subscribeEggRestock(d,u){return r.eggRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(d)},subscribeDecorRestock(d,u){return r.decorRestock.add(d),u?.immediate&&n&&a.size===s&&d({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(d)},subscribePurchase(d,u){if(r.purchase.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&d({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>r.purchase.delete(d)},subscribeAvailability(d,u){if(r.availability.add(d),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)d({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>r.availability.delete(d)},destroy(){for(const d of o)d();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=false;}}}let Fl=null;function co(){return Fl||(Fl=mT()),Fl}function yh(e){const t=e||"Sunny",r=J.get("weather")?.[t]?.name||t;return {id:t,name:r,isActive:t!=="Sunny",type:t,startTime:null,endTime:null,remainingSeconds:0}}function Xp(){return yh(null)}function hT(){let e=Xp(),t=Xp(),n=null,o=false,r=null;const i={all:new Set,stable:new Set};function a(l){const c=(l||"Sunny")!==(n||"Sunny");n=l;const d=yh(l),u=e.id!==d.id;if(t=e,e=d,!!o){if(c)for(const p of i.all)p(e,t);if(u){const p={current:e,previous:t};for(const f of i.stable)f(p);}}}async function s(){o||(r=await ke.subscribe("weatherAtom",l=>{a(l);}),o=true);}return s(),{get(){return e},subscribe(l,c){return i.all.add(l),c?.immediate!==false&&o&&l(e,e),()=>i.all.delete(l)},subscribeStable(l,c){return i.stable.add(l),c?.immediate&&o&&l({current:e,previous:e}),()=>i.stable.delete(l)},destroy(){r?.(),r=null,i.all.clear(),i.stable.clear(),o=false;}}}let Dl=null;function Di(){return Dl||(Dl=hT()),Dl}let nt=null;function vh(){return nt||(nt={currentTile:rt(),myPets:lo(),gameMap:Lc(),myInventory:Nt(),players:lu(),shops:co(),weather:Di(),myGarden:Zo()},nt)}function Kt(){if(!nt)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return nt}function bT(){nt&&(nt.currentTile.destroy(),nt.myPets.destroy(),nt.gameMap.destroy(),nt.myInventory.destroy(),nt.players.destroy(),nt.shops.destroy(),nt.weather.destroy(),nt.myGarden.destroy(),nt=null);}const be={get currentTile(){return Kt().currentTile},get myPets(){return Kt().myPets},get gameMap(){return Kt().gameMap},get myInventory(){return Kt().myInventory},get players(){return Kt().players},get shops(){return Kt().shops},get weather(){return Kt().weather},get myGarden(){return Kt().myGarden}};function xT(e){const t=Yd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function yT(e){const o=be.shops.getShop("seed").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Yd(e);l.ok?a++:i.push(l.reason||`Failed to purchase seed ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function vT(e){const t=Xd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function wT(e){const o=be.shops.getShop("egg").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Xd(e);l.ok?a++:i.push(l.reason||`Failed to purchase egg ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function ST(e){const t=qd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function CT(e){const o=be.shops.getShop("decor").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=qd(e);l.ok?a++:i.push(l.reason||`Failed to purchase decor ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function kT(e){const t=Kd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function _T(e){const o=be.shops.getShop("tool").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const r=o.remaining,i=[];let a=0;for(let s=0;s<r;s++){const l=Kd(e);l.ok?a++:i.push(l.reason||`Failed to purchase tool ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}let Bl=false;const Hn={init(){Bl||(Bl=true,console.log("[MGShopActions] Initialized"));},isReady(){return Bl},seed:{buy:xT,buyAll:yT},egg:{buy:vT,buyAll:wT},decor:{buy:ST,buyAll:CT},tool:{buy:kT,buyAll:_T}};async function wh(e){const t=[{name:"Data",init:()=>J.init()},{name:"CustomModal",init:()=>To.init()},{name:"Sprites",init:()=>Q.init()},{name:"TileObjectSystem",init:()=>an.init()},{name:"Pixi",init:()=>js.init()},{name:"Audio",init:()=>De.init()},{name:"Cosmetics",init:()=>Zd.init()},{name:"ShopActions",init:()=>Hn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Zs=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:io,MGAudio:De,MGCalculators:hh,MGCosmetic:Zd,MGCustomModal:To,MGData:J,MGEnvironment:ot,MGManifest:nn,MGPixi:js,MGPixiHooks:yt,MGShopActions:Hn,MGSprite:Q,MGTile:an,MGVersion:wd,PET_ABILITY_ACTIONS:dm,filterPetAbilityLogs:pm,formatAbilityLog:fm,initAllModules:wh,isPetAbilityAction:um},Symbol.toStringTag,{value:"Module"}));function TT(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function AT(e){return e.toLowerCase()}function er(e={}){const{id:t,label:n="",type:o="neutral",tone:r="soft",border:i,withBorder:a,pill:s=true,size:l="md",onClick:c,variant:d="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=m("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),l==="sm"?g.classList.add("badge--sm"):l==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),c&&g.addEventListener("click",c);let h=false,y=a;function x(){h||(y===false?g.style.border="none":g.style.border="");}function w(C,I=r){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${C}`,`badge--${I}`),x();}function v(C){const I=(C??"").trim();I?(g.style.border=I,h=true):(h=false,x());}function k(C){y=C,x();}function T(C){g.textContent=C;}function b(C,I=r){w(C,I);}function S(C){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const I=TT(C);if(!I){g.textContent=String(C??"—");return}g.textContent=I,g.classList.add("badge--rarity",`badge--rarity-${AT(I)}`);}function _(C,I){const z=J.get("abilities")?.[C],j=z?.color,W=j?.bg||"rgba(100, 100, 100, 0.9)",Y=j?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=I||z?.name||C||"Unknown Ability",g.style.background=W,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const N=()=>{g.style.background=Y;},D=()=>{g.style.background=W;};g.removeEventListener("mouseenter",N),g.removeEventListener("mouseleave",D),g.addEventListener("mouseenter",N),g.addEventListener("mouseleave",D);}return d==="rarity"?S(u):d==="ability"?_(p,f):(g.textContent=n,w(o,r),typeof a=="boolean"&&k(a),i&&v(i)),{root:g,setLabel:T,setType:b,setBorder:v,setWithBorder:k,setRarity:S,setAbility:_}}const ET={expanded:false,sort:{key:null,dir:null},search:""},IT={categories:{}};async function PT(){const e=await ro("tab-test",{version:2,defaults:IT,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...ET}}function n(i,a){const s=e.get(),l=t(i);e.update({categories:{...s.categories,[i]:{...l,expanded:a}}});}function o(i,a,s){const l=e.get(),c=t(i);e.update({categories:{...l.categories,[i]:{...c,sort:{key:a,dir:s}}}});}function r(i,a){const s=e.get(),l=t(i);e.update({categories:{...s.categories,[i]:{...l,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}const MT={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function pa(e){return e?MT[e]??0:0}class LT extends Vt{constructor(){super({id:"tab-test",label:"Test"});U(this,"stateCtrl",null);}async build(n){this.stateCtrl=await PT();const o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o);}renderSprite(n){const o=m("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const r=n.spriteId;requestAnimationFrame(()=>{try{const i=Q.toCanvas(r,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",o.appendChild(i);}catch{o.textContent="-";}});}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){const r=m("span",{style:"opacity:0.5;"});return r.textContent="—",r}return er({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;const f=p.toLowerCase();return r.filter(g=>g.name.toLowerCase().includes(f))},l=Ti({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&l.sortBy(a.sort.key,a.sort.dir);const c=Rs({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),l.setData(s(f));}}),d=m("div",{style:"margin-bottom:8px;"});d.appendChild(c.root);const u=m("div");return u.appendChild(d),u.appendChild(l.root),Ne({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){const r=J.get("plants");if(!r)return null;for(const a of Object.values(r))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=o.toLowerCase();for(const a of Object.values(r)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const o=J.get("pets");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){const o=J.get("items");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){const o=J.get("decor");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){const o=J.get("eggs");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(o,r);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(o);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4);})}async buildSpriteTables(n){const o=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>pa(i.rarity)-pa(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!Q.isReady())try{await Q.init();}catch{return}const r=Q.getCategories();for(let i=0;i<r.length;i++){await this.yieldToMain(8);const a=r[i],l=Q.getCategoryId(a).map(c=>{const d=`sprite/${a}/${c}`;return {name:c,spriteId:d,rarity:this.getRarityForSprite(a,d,c)}});if(l.sort((c,d)=>pa(c.rarity)-pa(d.rarity)),l.length>0){const c=this.createDataCard(a,this.formatCategoryName(a),l,o);n.appendChild(c);}}}}function $e(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o);}const Sh=`
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
`,RT={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Bn=null;async function NT(){if(Bn)return Bn;Bn=await ro("tab-auto-favorite",{version:1,defaults:RT});const e=Te(Me.AUTO_FAVORITE_UI,null);return e&&(await Bn.set(e),uy(Me.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Bn}function _t(){if(!Bn)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Bn}const cu=Me.AUTO_FAVORITE,Ch={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function no(){return Te(cu,Ch)}function du(e){Ee(cu,e);}function kh(e){const n={...no(),...e};return du(n),n}function uu(e){const t=no();return t.mode="simple",t.simple={...t.simple,...e},du(t),t}function OT(e){uu({favoriteSpecies:e});}function $T(e){uu({favoriteMutations:e});}function Kp(){return no().enabled}let $a=null;const zr=new Set;function Oc(){const e=no();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}zr.clear(),$a=Nt().subscribeItems(t=>{if(t.added.length>0){const n=no();for(const o of t.added)DT(o,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function _h(){$a&&($a(),$a=null),zr.clear(),console.log("🛑 [AutoFavorite] Stopped");}function FT(e){const t=no();t.enabled=e,t.simple.enabled=e,kh(t),e?Oc():_h();}function DT(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(zr.has(e.id)||e.isFavorited||e.favorited)&&Th(e,t.simple)){zr.add(e.id);try{Xs(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(o){console.error("[AutoFavorite] WebSocket error:",o),zr.delete(e.id);}}}function Th(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(r=>t.favoriteMutations.includes(r))):false}function BT(){return Object.keys(J.get("mutations")??{})}const Ah={init(){this.isReady()||Oc();},isReady(){return Kp()},DEFAULT_CONFIG:Ch,STORAGE_KEY:cu,loadConfig:no,saveConfig:du,updateConfig:kh,updateSimpleConfig:uu,setFavoriteSpecies:OT,setFavoriteMutations:$T,isEnabled:Kp,start:Oc,stop:_h,setEnabled:FT,shouldFavorite:Th,getGameMutations:BT};let zl=null,Yp=null;function Eh(){try{return lu().get().myPlayer?.journal||null}catch{return null}}function zT(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Ih(){const e=J.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Ph(){return ["Normal","Gold","Rainbow","Max Weight"]}function GT(){return Object.keys(J.get("mutations")??{})}function Mh(e){const n=(J.get("pets")??{})[e];if(!n?.innateAbilityWeights||typeof n.innateAbilityWeights!="object")return [];const o=n.innateAbilityWeights,r=["RainbowGranter","GoldGranter"];return Object.keys(o).filter(i=>!r.includes(i))}function Lh(e){const t=J.get("plants")??{},n=Object.keys(t),o=Ih(),r=e?.produce??{},i=[];let a=0;for(const c of n){const u=r[c]?.variantsLogged?.map(f=>f.variant)??[],p=o.filter(f=>!u.includes(f));a+=u.length,i.push({species:c,variantsLogged:u,variantsMissing:p,variantsTotal:o.length,variantsPercentage:o.length>0?u.length/o.length*100:0,isComplete:p.length===0});}const s=n.length*o.length,l=i.filter(c=>c.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function Rh(e){const t=J.get("pets")??{},n=Object.keys(t),o=Ph(),r=e?.pets??{},i=[];let a=0,s=0,l=0,c=0;for(const u of n){const p=r[u],f=p?.variantsLogged?.map(v=>v.variant)??[],g=p?.abilitiesLogged?.map(v=>v.ability)??[],h=o.filter(v=>!f.includes(v)),y=Mh(u),x=g.filter(v=>y.includes(v)),w=y.filter(v=>!x.includes(v));s+=o.length,a+=f.length,c+=y.length,l+=Math.min(x.length,y.length),i.push({species:u,variantsLogged:f,variantsMissing:h,variantsTotal:o.length,variantsPercentage:o.length>0?f.length/o.length*100:0,abilitiesLogged:x,abilitiesMissing:w,abilitiesTotal:y.length,abilitiesPercentage:y.length>0?x.length/y.length*100:0,isComplete:h.length===0&&(y.length===0||w.length===0)});}const d=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:d,percentage:n.length>0?d/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:c,abilitiesLogged:l,abilitiesPercentage:c>0?l/c*100:0}}async function el(e=false){await J.waitForAny();const t=Eh(),n=zT(t);if(!e&&zl&&n===Yp)return zl;const o={plants:Lh(t),pets:Rh(t),lastUpdated:Date.now()};return zl=o,Yp=n,o}async function HT(){const e=await el();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let Gr=null,$c=false;function jT(){$c||($c=true,Gr||(Gr=setInterval(async()=>{const e=await el();pu(e);},3e4)),console.log("[Journal] Started"));}function UT(){Gr&&(clearInterval(Gr),Gr=null),$c=false;}function pu(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function WT(){const e=await el();return pu(e),e}function VT(e){try{const t=qe.getMyJournal();if(!t?.pets)return [];const n=t.pets[e];return n?.abilitiesLogged?n.abilitiesLogged.map(o=>o.ability):[]}catch(t){return console.error("[AbilitiesInject] Failed to get logged abilities:",t),[]}}function qT(e,t){try{const n=qe.getMyJournal();if(!n?.pets)return;const o=n.pets[e];return o?.abilitiesLogged?o.abilitiesLogged.find(i=>i.ability===t)?.createdAt:void 0}catch(n){console.error("[AbilitiesInject] Failed to get ability log date:",n);return}}function fu(e){try{const t=J.getAll();if(!t?.pets)return [];const n=t.pets[e];if(!n)return [];if(n.innateAbilityWeights&&typeof n.innateAbilityWeights=="object"){const o=n.innateAbilityWeights,r=["RainbowGranter","GoldGranter"];return Object.entries(o).filter(([i])=>!r.includes(i)).sort(([,i],[,a])=>a-i).map(([i])=>i)}return []}catch(t){return console.error("[AbilitiesInject] Failed to get all abilities:",t),[]}}function XT(e){try{const t=J.getAll();if(!t?.abilities)return e;const n=t.abilities[e];if(!n)return e;const o=n.name;if(typeof o=="string")return o;const r=n.displayName;return typeof r=="string"?r:e}catch(t){return console.error("[AbilitiesInject] Failed to get ability name:",t),e}}function gu(e){try{const t=["RainbowGranter","GoldGranter"],n=VT(e),o=fu(e),r=n.filter(l=>!t.includes(l)),i=o.filter(l=>!r.includes(l)),a=o.length,s=a>0?r.length/a*100:0;return {logged:r,missing:i,total:a,percentage:s}}catch(t){return console.error("[AbilitiesInject] Failed to calculate progress:",t),{logged:[],missing:[],total:0,percentage:0}}}function KT(e){const t=new Date(e),n=t.toLocaleDateString("en-US",{month:"short"}),o=t.getDate(),r=t.getFullYear();return `${n} ${o}, ${r}`}function YT(e){const n=J.get("abilities")?.[e];return {bg:n?.color?.bg||"rgba(100, 100, 100, 0.9)",hover:n?.color?.hover||"rgba(150, 150, 150, 1)"}}function JT(e,t,n,o){const r=n?qT(e,t):void 0,i=document.createElement("div");i.className="gemini-ability-entry",i.style.cssText=`
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    align-items: center;
    justify-items: center;
  `;const a=o?"80px":"100px",s=document.createElement("div");if(s.className="gemini-ability-stamp",r){const c=`Logged on ${KT(r)}`;s.style.cursor="help";let d=null;s.addEventListener("mouseenter",()=>{d=document.createElement("div"),d.textContent=c,d.style.cssText=`
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
      `,document.body.appendChild(d);const u=s.getBoundingClientRect(),p=d.offsetHeight,f=d.offsetWidth;let g=u.left+u.width/2-f/2,h=u.top-p-8;h<8&&(h=u.bottom+8),g<8&&(g=8),g+f>window.innerWidth-8&&(g=window.innerWidth-f-8),d.style.left=`${g}px`,d.style.top=`${h}px`,requestAnimationFrame(()=>{d&&(d.style.opacity="1",d.style.transform="scale(1)");});}),s.addEventListener("mouseleave",()=>{d&&(d.remove(),d=null);});}const l=Pg();l||console.error("[AbilitiesInject] Base URL not available - modules may not be initialized"),s.style.cssText=`
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
  `;try{const c=Q.toCanvas("pet",e,{scale:.7,boundsMode:"padded"});if(c){const d=o?"56px":"70px";c.style.position="absolute",c.style.top="50%",c.style.left="50%",c.style.transform="translate(-50%, -50%)",c.style.width=d,c.style.height=d,c.style.objectFit="contain",c.style.imageRendering="pixelated",c.style.zIndex="1",n||(c.style.filter="grayscale(1) brightness(0.16)"),s.appendChild(c);}else {const d=document.createElement("div");d.textContent="ðŸ¾",d.style.fontSize="32px",d.style.position="absolute",d.style.top="50%",d.style.left="50%",d.style.transform="translate(-50%, -50%)",d.style.zIndex="1",s.appendChild(d);}}catch(c){console.warn("[AbilitiesInject] Failed to load pet sprite:",e,c);const d=document.createElement("div");d.textContent="ðŸ¾",d.style.fontSize="32px",d.style.position="absolute",d.style.top="50%",d.style.left="50%",d.style.transform="translate(-50%, -50%)",d.style.zIndex="1",s.appendChild(d);}if(n){const c=XT(t),d=YT(t),u=document.createElement("div");u.className="gemini-ability-badge",u.textContent=c,u.style.cssText=`
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
    `,d.textContent="???",c.appendChild(d),i.appendChild(s),i.appendChild(c);}return i}function QT(e,t,n){return [...e.logged,...e.missing].map(r=>{const i=e.logged.includes(r);return JT(t,r,i,n)})}const Co="p.chakra-text.css-1qd26jh",mu="p.chakra-text.css-12b1ql2";let Vo=[],Fc=null,Hr=null,li=false,xs=false;const Jp="gemini-ability-entry";let Fa=false;const Jn="gemini-overview-updated";let Gl=null;function ZT(){const e=document.querySelector(Co);if(!e)return null;const t=e.textContent?.trim();if(!t||t==="???"||!document.querySelector(mu))return null;const o=document.querySelectorAll("div.McGrid");let r=null;for(const i of o){const a=i.textContent||"",s=a.includes("Normal"),l=a.includes("Gold"),c=a.includes("Max Weight"),d=a.includes("Rainbow"),u=a.includes("???"),p=[s,l,c,d,u].filter(Boolean).length,f=a.includes("Crops")||a.includes("Pets"),g=a.includes("Collected"),h=a.includes("Back");if(p>=2&&!f&&!g&&!h){r=i;break}}return r?{speciesName:t,variantGrid:r}:null}function Nh(e){const t=J.get("pets")??{};for(const[o,r]of Object.entries(t)){const i=r;if(i.name===e||i.displayName===e||o===e)return o}const n=e.toLowerCase();for(const[o,r]of Object.entries(t)){const i=r,a=typeof i.name=="string"?i.name:void 0,s=typeof i.displayName=="string"?i.displayName:void 0;if(a&&a.toLowerCase()===n||s&&s.toLowerCase()===n||o.toLowerCase()===n)return o}return n.replace(/\s+/g,"")}function Oh(e){const t=J.get("pets")??{};return e in t}function ys(){const e=document.querySelector(".gemini-journal-allTab");if(e){const r=e.querySelector(".gemini-allTab-tab");if(r instanceof HTMLElement&&r.offsetHeight>25)return "All"}const t=document.querySelectorAll("button");let n=null,o=null;for(const r of t){const i=r.textContent?.trim();i==="Crops"&&(n=r),i==="Pets"&&(o=r);}if(!n&&!o)return null;if(n&&o){const r=n.offsetHeight,i=o.offsetHeight;if(r>i)return "Crops";if(i>r)return "Pets";if(n.getAttribute("aria-selected")==="true")return "Crops";if(o.getAttribute("aria-selected")==="true")return "Pets"}return o&&o.offsetParent?"Pets":n&&n.offsetParent?"Crops":null}function $h(){if(!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.includes("GARDEN JOURNAL"))||!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.match(/Collected\s+\d+%/)))return  false;const n=document.querySelector(Co);return n&&!n.textContent?.includes("GARDEN")?false:ys()==="Pets"}function eA(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(h=>h.textContent?.match(/Collected\s+\d+%/));if(!e||ys()!=="Pets")return  false;if(e.classList.contains(Jn))return  true;const n=e.querySelector("span.chakra-text");if(!n)return  false;const o=n.textContent?.match(/\((\d+)\/(\d+)\)/);if(!o)return  false;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=J.get("pets")??{},s=Object.keys(a).length*4,l=s*.25;if(Math.abs(i-s)>l)return  false;if(!e.hasAttribute("data-original-percent")){const h=e.textContent?.match(/Collected\s+(\d+)%/);h&&e.setAttribute("data-original-percent",h[1]);}n.hasAttribute("data-original-count")||n.setAttribute("data-original-count",n.textContent||"");let c=0,d=0;for(const h of Object.keys(a)){const y=fu(h),x=gu(h);c+=y.length,d+=x.logged.length;}const u=r+d,p=i+c,f=Math.floor(u/p*100),g=e.childNodes[0];return g&&g.nodeType===Node.TEXT_NODE&&(g.textContent=`Collected ${f}% `),n.textContent=`(${u}/${p})`,e.classList.add(Jn),true}function tA(){J.get("pets");const e=document.querySelectorAll("p.chakra-text");for(const t of e){const n=t.textContent||"";if(!n.match(/^\d+\/\d+$/)||t.classList.contains(Jn))continue;const o=n.match(/^(\d+)\/(\d+)$/);if(!o)continue;const r=parseInt(o[1],10),i=parseInt(o[2],10);let a=null,s=t,l=false;for(;s&&!l;){if(s.classList.contains("McGrid")){const h=s.querySelectorAll("p.chakra-text");for(const y of h){const x=y.textContent||"";if(x!=="???"&&!x.includes("/")&&x.length>2&&x.length<30){a=y,l=true;break}}}s=s.parentElement;}if(!a)continue;const c=a.textContent?.trim();if(!c)continue;const d=Nh(c);if(!d||!Oh(d))continue;const u=fu(d),p=gu(d);if(u.length===0)continue;const f=r+p.logged.length,g=i+u.length;t.textContent=`${f}/${g}`,t.classList.add(Jn);}}function nA(){if(!$h()){Fa=false;return}if(!Fa)try{const e=eA();tA(),e&&(Fa=!0);}catch(e){console.error("[AbilitiesInject] Failed to update overview page:",e);}}function Dc(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(t=>t.hasAttribute("data-original-percent"));if(e){const t=e.getAttribute("data-original-percent");if(t){const o=e.childNodes[0];o&&o.nodeType===Node.TEXT_NODE&&(o.textContent=`Collected ${t}% `);}e.removeAttribute("data-original-percent"),e.classList.remove(Jn);const n=e.querySelector("span.chakra-text");if(n){const o=n.getAttribute("data-original-count");o&&(n.textContent=o),n.removeAttribute("data-original-count");}}document.querySelectorAll(`.${Jn}`).forEach(t=>{t.classList.remove(Jn);}),Fa=false;}function oA(){return window.innerWidth<768}function rA(e,t){const n=document.querySelector(mu);if(!n)return;const o=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!o)return;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=r+e,s=i+t;n.textContent=`Collected ${a}/${s}`;}function iA(e,t){try{xs=!0,Jt();const n=gu(t);if(n.total===0)return;const o=QT(n,t,oA());for(const r of o)e.appendChild(r),Vo.push(r);rA(n.logged.length,n.total),_r={logged:n.logged.length,total:n.total};}catch(n){console.error("[AbilitiesInject] Failed to inject:",n),Jt();}finally{setTimeout(()=>{xs=false;},0);}}function aA(e,t){const n=document.querySelector(mu);if(!n)return;const o=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!o)return;const r=parseInt(o[1],10),i=parseInt(o[2],10),a=r-e,s=i-t;n.textContent=`Collected ${a}/${s}`;}let _r=null;function Jt(){_r&&(aA(_r.logged,_r.total),_r=null);for(const e of Vo)e.remove();Vo=[],Fc=null,xs=false;}function Fn(){if(xs)return;const e=ys();e!==Gl&&(Gl==="Pets"&&e!=="Pets"&&(Dc(),Jt()),Gl=e);const t=ys();if($h()&&t==="Pets"){Jt(),nA();return}Dc();const n=ZT();if(!n){Jt();return}const o=Nh(n.speciesName);if(!o){Jt();return}if(!Oh(o)){Jt();return}o===Fc&&Vo.length>0&&Vo[0].isConnected||(Fc=o,iA(n.variantGrid,o));}function sA(){Fn(),setTimeout(()=>{Fn();},100),setTimeout(()=>{Fn();},500),setTimeout(()=>{Fn();},1e3),Hr=new MutationObserver(e=>{for(const t of e)t.type==="childList"&&(t.addedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Jp)||Vo.includes(n))return;const o=n.textContent||"";(o.includes("GARDEN JOURNAL")||o.includes("Collected")||o.includes("Chicken")||o.includes("Bunny"))&&Fn(),(n.matches?.(Co)||n.querySelector?.(Co))&&Fn(),(n.matches?.("div.McGrid")||n.querySelector?.("div.McGrid"))&&Fn();}}),t.removedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Jp))return;(n.matches?.(Co)||n.querySelector?.(Co))&&Jt();}}));}),Hr.observe(document.body,{childList:true,subtree:true});}function lA(){Hr&&(Hr.disconnect(),Hr=null),Jt(),Dc();}function cA(){li||(li=true,sA());}function dA(){li&&(li=false,lA());}function uA(){return li}const pA={init:cA,destroy:dA,isEnabled:uA};function Qe(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function uo(e,t){e.add(()=>t.disconnect());}let Da=false;function tr(){return Da}function Ut(e){if(!Da){Da=true;try{e();}finally{Da=false;}}}const fA={Normal:"Normal: Harvest a {cropName} and log it without any mutations.",Wet:"Wet is the most common mutation, gained during the Rain weather event.",Chilled:"The Chilled mutation is gained during the Snow weather event.",Frozen:"The Frozen mutation is obtained from Wet crops during the Snow weather event, or Chilled crops during Rain.",Dawnlit:"The Dawnlit mutation is gained during the Dawn weather event.",Ambershine:"The Amberlit mutation is gained during the Amber Moon weather event.",Gold:"Gold is a rare mutation that appears in 1% of newly planted crops. Pets with the Gold Granter ability have a small chance to apply the Gold mutation to a random crop.",Rainbow:"Rainbow is a very rare mutation that appears in 0.1% of newly planted crops.  Pets with the Rainbow Granter ability have a small chance to apply the Rainbow mutation to a random crop.",Dawncharged:"Dawnbound: During the Dawn lunar event, place a {cropName} with the Dawnlit mutation adjacent to a Dawnbinder crop.",Ambercharged:"Amberbound: During the Amber Moon lunar event, place a {cropName} with the Amberlit mutation adjacent to a Moonbinder crop.","Max Weight":"Max weight applies only to size 100 crops (the largest possible). The size of a crop can be checked by hovering over its weight. Obtaining weight 100 crops can be achieved through Crop Size Boost pets."},gA={Normal:"Hatch a {petName} without any mutations",Gold:"All pets have a 1% base chance to hatch with the gold mutation; increase these chances with the Pet Mutation Boost abilities.",Rainbow:"All pets have a 0.1% base chance to hatch with the rainbow mutation; increase these chances with the Pet Mutation Boost abilities.","Max Weight":"Hatch a {petName} with a Max STR of 100, using Max Strength Boost ability is recommended while hatching"},mA={CommonEgg:["Worm","Snail","Bee"],UncommonEgg:["Chicken","Bunny","Dragonfly"],RareEgg:["Pig","Cow","Turkey"],WinterEgg:["SnowFox","Stoat","WhiteCaribou"],LegendaryEgg:["Squirrel","Turtle","Goat"],MythicalEgg:["Butterfly","Peacock","Capybara"]},hA={CommonEgg:"Common Eggs",UncommonEgg:"Uncommon Eggs",RareEgg:"Rare Eggs",WinterEgg:"Winter Eggs",LegendaryEgg:"Legendary Eggs",MythicalEgg:"Mythical Eggs"};function bA(e){for(const[t,n]of Object.entries(mA))if(n.includes(e))return hA[t]||t;return "Eggs"}function xA(e){return `Keep hatching ${bA(e)} to get a pet with this ability`}function yA(e,t){const n=fA[e];return n?n.replace(/\{cropName\}/g,t):`Obtain a ${e} ${t}`}function vA(e,t){const n=gA[e];return n?n.replace(/\{petName\}/g,t):`Obtain a ${e} ${t}`}let Ba=null;function wA(e){const t=document.createElement("div");return t.className="gemini-journal-hint",t.textContent=e,t.style.cssText=`
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
  `,t}function SA(e,t){const n=t.getBoundingClientRect(),o=240,r=8;let i=n.left+n.width/2-o/2,a=n.top-40-r;i<8&&(i=8),i+o>window.innerWidth-8&&(i=window.innerWidth-o-8),a<8&&(a=n.bottom+r),e.style.left=`${i}px`,e.style.top=`${a}px`;}function Qp(e,t){vs();const n=wA(t);document.body.appendChild(n),SA(n,e),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="scale(1)";}),Ba=n;}function vs(){Ba&&(Ba.remove(),Ba=null);}function tl(e){const t=J.get("plants")??{};for(const[r,i]of Object.entries(t)){const a=i;if(a?.crop?.name===e)return {id:r,type:"crop"};if(a?.plant?.name===e)return {id:r,type:"crop"};if(r===e)return {id:r,type:"crop"}}const n=J.get("pets")??{};for(const[r,i]of Object.entries(n)){const a=i;if(a?.name===e)return {id:r,type:"pet"};if(a?.displayName===e)return {id:r,type:"pet"};if(r===e)return {id:r,type:"pet"}}const o=e.toLowerCase();for(const[r,i]of Object.entries(t)){const a=i;if(a?.crop?.name?.toLowerCase()===o)return {id:r,type:"crop"};if(a?.plant?.name?.toLowerCase()===o)return {id:r,type:"crop"};if(r.toLowerCase()===o)return {id:r,type:"crop"}}for(const[r,i]of Object.entries(n)){const a=i;if(a?.name?.toLowerCase()===o)return {id:r,type:"pet"};if(a?.displayName?.toLowerCase()===o)return {id:r,type:"pet"};if(r.toLowerCase()===o)return {id:r,type:"pet"}}return null}function Fh(e,t){if(t==="crop"){const o=(J.get("plants")??{})[e];return o?.crop?.name||o?.plant?.name||e}else {const o=(J.get("pets")??{})[e];return o?.name||o?.displayName||e}}let jr=Qe(),qo=false;const Dh="gemini-hint-attached";function CA(){const e=document.querySelectorAll(".chakra-text, p, span");for(const t of e){const n=t.textContent?.trim();if(n&&n!=="???"&&!n.includes("/")&&!n.includes("%")&&!(n==="Crops"||n==="Pets"||n==="All")&&!(n.includes("GARDEN")||n.includes("JOURNAL"))&&!n.includes("Collected")&&n.length>=3&&n.length<=20){const o=tl(n);if(o)return {displayName:n,id:o.id,type:o.type}}}return null}function kA(){const e=document.querySelectorAll("button");for(const t of e){const n=t.textContent?.trim(),o=t.querySelector('[class*="MotionMcFlex"], .MotionMcFlex, div[style*="height: 35px"]');if(o&&o.offsetHeight>=30){if(n==="Crops")return "crops";if(n==="Pets")return "pets"}}return null}function _A(){const e=[],t=document.querySelectorAll("p"),n=document.querySelectorAll("span"),o=[...t,...n];for(const r of o){if(r.textContent?.trim()!=="???"||!r.offsetParent)continue;let a=r.parentElement,s=null;for(let l=0;l<4&&a&&!s;l++){const c=a.parentElement;if(!c)break;for(const d of Array.from(c.children)){if(!(d instanceof HTMLElement)||d===a)continue;const u=p=>{if(Bh(p))return  true;for(const f of Array.from(p.children))if(f instanceof HTMLElement&&u(f))return  true;return  false};if(u(d)){s=c;break}}a=c;}s&&(s.classList.contains(Dh)||e.push(s));}return e}function TA(){return qe.getCropVariants()}function Bc(){return qe.getPetVariants()}function Zp(e,t){return (t==="crops"?TA():Bc())[e]??null}function Bh(e){return e.style.backgroundImage&&e.style.backgroundImage.includes("Stamp")?true:window.getComputedStyle(e).backgroundImage.includes("Stamp")}function AA(e){let t=e.parentElement;for(let n=0;n<8&&t;n++){const o=t.querySelectorAll("div"),r=[];for(const i of o)Bh(i)&&r.push(i);if(r.length>=4)return r;t=t.parentElement;}return []}function EA(e,t){let n=e.parentElement;for(let o=0;o<6&&n;o++){const r=[];for(const i of t)n.contains(i)&&r.push(i);if(r.length===1){const i=r[0];return t.indexOf(i)}n=n.parentElement;}return  -1}function IA(e,t){return t>Bc().length&&e>=Bc().length?"ability":"variant"}function PA(e){const t=CA();if(!t)return;const n=kA();if(!n)return;const o=AA(e);if(o.length===0)return;const r=EA(e,o);if(r===-1)return;let i="";if(n==="crops"){const c=Zp(r,"crops");if(!c)return;i=yA(c,t.displayName);}else if(n==="pets")if(IA(r,o.length)==="variant"){const d=Zp(r,"pets");if(!d)return;i=vA(d,t.displayName);}else i=xA(t.id);e.classList.add(Dh);const a=()=>Qp(e,i),s=()=>vs(),l=c=>{c.stopPropagation(),Qp(e,i),setTimeout(()=>vs(),3e3);};e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",s),e.addEventListener("click",l),jr.add(()=>{e.removeEventListener("mouseenter",a),e.removeEventListener("mouseleave",s),e.removeEventListener("click",l);});}function zh(){const e=_A();if(e.length!==0)for(const t of e)PA(t);}function MA(){const e=new MutationObserver(()=>{qo&&zh();});e.observe(document.body,{childList:true,subtree:true}),uo(jr,e);}function LA(){qo||(qo=true,zh(),MA());}function RA(){qo&&(qo=false,jr.run(),jr.clear(),jr=Qe(),vs());}function NA(){return qo}const OA=Object.freeze(Object.defineProperty({__proto__:null,destroy:RA,init:LA,isEnabled:NA},Symbol.toStringTag,{value:"Module"}));function Bi(){const e=document.querySelectorAll('.chakra-box, [class*="Box"], div');for(const n of e)if(n.style.backgroundImage?.includes("GardenJournal")||window.getComputedStyle(n).backgroundImage?.includes("GardenJournal"))return n;const t=document.querySelectorAll(".chakra-text, p, span");for(const n of t)if(n.textContent?.includes("GARDEN JOURNAL")){let o=n.parentElement;for(let r=0;r<10&&o;r++){if(o.classList.contains("McGrid")||o.querySelector(".McGrid"))return o;o=o.parentElement;}}return null}function $A(){const e=Bi();if(!e)return null;const t=e.querySelectorAll(".McFlex");for(const n of t){const o=window.getComputedStyle(n);if((o.overflowY==="auto"||o.overflowY==="scroll")&&n.querySelector(":scope > .McGrid"))return n}return null}function Gh(){const e=Bi();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}let Io=Qe(),ci=false,yn={filter:"all",sort:"default"};const Hh="gemini-journal-filterSort";function FA(){const e=Bi();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}function DA(){const e=$A();return e?Array.from(e.querySelectorAll(":scope > .McGrid")).filter(n=>(n.textContent??"").match(/\d+\/\d+/)!==null):[]}function BA(){const e=document.createElement("div");e.className=Hh,e.style.cssText=`
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
    `,n.value=yn.filter,n.onchange=()=>{yn.filter=n.value,Ut(()=>zc());};const o=document.createElement("span");o.textContent="Sort:",o.style.cssText="color: #A88A6B; font-size: 11px; margin-left: 8px;";const r=document.createElement("select");for(const[i,a]of [["default","Default"],["alphabetical","A-Z"],["progress","By Progress"]]){const s=document.createElement("option");s.value=i,s.textContent=a,r.appendChild(s);}return r.style.cssText=n.style.cssText,r.value=yn.sort,r.onchange=()=>{yn.sort=r.value,Ut(()=>zc());},e.append(t,n,o,r),e}function zA(e,t){const n=e.querySelectorAll(".chakra-text, p, span");let o="",r=0;for(const i of n){const a=i.textContent?.trim()??"",s=a.match(/^(\d+)\/(\d+)$/);if(s){const l=parseInt(s[1]),c=parseInt(s[2]);r=c>0?l/c*100:0;continue}a!=="???"&&!a.includes("%")&&a.length>=2&&a.length<=25&&(o=a);}return !o&&r===0?null:{el:e,name:o||"???",progress:r,originalOrder:t}}function zc(){const e=DA();if(e.length===0)return;const t=[];if(e.forEach((o,r)=>{const i=zA(o,r);i&&t.push(i);}),t.length===0)return;for(const o of t){let r=true;yn.filter==="missing"?r=o.progress<100:yn.filter==="collected"&&(r=o.progress===100),o.el.style.display=r?"":"none";}let n;switch(yn.sort){case "alphabetical":n=[...t].sort((o,r)=>o.name.localeCompare(r.name));break;case "progress":n=[...t].sort((o,r)=>r.progress-o.progress);break;default:n=[...t].sort((o,r)=>o.originalOrder-r.originalOrder);}n.forEach((o,r)=>{o.el.style.order=String(r);});}function GA(){if(document.querySelector(`.${Hh}`))return;const e=FA();if(!e||!e.closest(".McFlex"))return;const n=BA(),o=e.nextElementSibling;if(o&&e.parentElement)e.parentElement.insertBefore(n,o);else if(e.parentElement)e.parentElement.appendChild(n);else return;Io.add(()=>n.remove());}function za(){Ut(()=>{GA(),zc();});}let jn=null;function HA(){jn!==null&&clearTimeout(jn),jn=window.setTimeout(()=>{tr()||za(),jn=null;},200);}function jA(){setTimeout(za,100),setTimeout(za,400),setTimeout(za,800);const e=new MutationObserver(()=>{tr()||HA();});e.observe(document.body,{childList:true,subtree:true}),uo(Io,e),Io.add(()=>{jn!==null&&(clearTimeout(jn),jn=null);});}function UA(){yn={filter:"all",sort:"default"},Io.run(),Io.clear(),Io=Qe();}function WA(){ci||(ci=true,jA(),console.log("[JournalFilterSort] Initialized"));}function VA(){ci&&(ci=false,UA(),console.log("[JournalFilterSort] Destroyed"));}function qA(){return ci}const XA=Object.freeze(Object.defineProperty({__proto__:null,destroy:VA,init:WA,isEnabled:qA},Symbol.toStringTag,{value:"Module"}));let jt=Qe(),wn=Qe(),di=false,Qn=false;const nl="gemini-journal-allTab",Gc="gemini-journal-allOverlay";let Tr="all",ws="default";function jh(){const e=Bi();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t){const o=n.textContent?.trim();if(o==="Crops"||o==="Pets"){const r=n.closest("button");if(r){const i=r.parentElement;if(i&&i.querySelectorAll("button").length>=2)return i}}}return null}function hu(){const e=jh();if(!e)return {crops:null,pets:null};let t=null,n=null;const o=e.querySelectorAll("button");for(const r of o){const i=r.textContent?.trim();i==="Crops"&&(t=r),i==="Pets"&&(n=r);}return {crops:t,pets:n}}function KA(){const{crops:e,pets:t}=hu();[e,t].forEach(n=>{if(!n)return;const o=n.querySelector("div");if(o){const r=o.querySelector("div");r instanceof HTMLElement&&(r.style.height="20px");}});}function Uh(){const e=Bi();if(!e)return null;const t=e.querySelectorAll(".McGrid");for(const n of t){const o=n.querySelectorAll(":scope > .McFlex");for(const r of o){const i=window.getComputedStyle(r);if((i.overflow==="hidden"||i.overflowY==="hidden")&&(r.textContent?.includes("JOURNAL")||r.querySelector(".McGrid")))return r}}return null}function YA(e){return e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F"}function JA(){const e=document.createElement("button");e.className=nl,e.type="button",e.style.cssText=`
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
    `,o.appendChild(r),t.appendChild(o),e.appendChild(t);const i=()=>{const a=window.innerWidth<768;o.style.width=a?"70px":"100px",r.style.fontSize=a?"12px":"14px";};return window.addEventListener("resize",i),jt.add(()=>window.removeEventListener("resize",i)),e.onmouseenter=()=>{Qn||(o.style.height="25px");},e.onmouseleave=()=>{Qn||(o.style.height="20px");},e.onclick=a=>{a.preventDefault(),a.stopPropagation(),Ut(()=>tE());},e}function QA(e,t){const n=document.createElement("div");n.style.cssText=`
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
    `;const r=e.variantsLogged.length===0;if(r){const h=document.createElement("span");h.textContent="?",h.style.cssText="font-size: 24px; color: rgba(168, 138, 107, 0.6); font-weight: bold;",o.appendChild(h);}else try{if(Q.isReady()){const h=t==="crop"?"plant":"pet";let y=e.species;t==="crop"&&(e.species==="DawnCelestial"&&(y="DawnCelestialCrop"),e.species==="MoonCelestial"&&(y="MoonCelestialCrop"),e.species==="OrangeTulip"&&(y="Tulip"));const x=(v,k)=>{try{if(Q.has(v,k))return Q.toCanvas(v,k,{scale:.5})}catch{}return null},w=x(h,y)||(t==="crop"?x("tallplant",y):null)||x(h,y.toLowerCase())||(t==="crop"?x("tallplant",y.toLowerCase()):null);if(w)w.style.cssText="max-width: 46px; max-height: 46px; display: block;",o.appendChild(w);else {const v=document.createElement("span");v.textContent=t==="crop"?"🌱":"🐾",v.style.cssText="font-size: 20px;",o.appendChild(v);}}else {const h=document.createElement("span");h.textContent=t==="crop"?"🌱":"🐾",h.style.cssText="font-size: 20px;",o.appendChild(h);}}catch{const h=document.createElement("span");h.textContent=t==="crop"?"🌱":"🐾",h.style.cssText="font-size: 20px;",o.appendChild(h);}let i,a,s;if(t==="pet"){const h=e.abilitiesLogged?.length??0,y=e.abilitiesTotal??0;i=e.variantsLogged.length+h,a=e.variantsTotal+y,s=a>0?i/a*100:0;}else i=e.variantsLogged.length,a=e.variantsTotal,s=e.variantsPercentage;const l=YA(s),c=document.createElement("div");c.style.cssText=`
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
    `;const p=Fh(e.species,t),f=document.createElement("span");f.style.cssText="font-weight: bold; font-size: 13px; color: #3D3325; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",f.textContent=r?"???":p;const g=document.createElement("span");return g.style.cssText=`font-size: 12px; font-weight: bold; color: ${s<100?"#8B6914":"#3D3325"}; margin-left: 4px; flex-shrink: 0;`,g.textContent=`${i}/${a}`,u.append(f,g),c.append(d,u),n.append(o,c),n.onclick=h=>{h.preventDefault(),h.stopPropagation(),ZA(e.species,t);},n.onmouseenter=()=>{n.style.opacity="0.8";},n.onmouseleave=()=>{n.style.opacity="1";},n}function ZA(e,t){Ut(()=>bu()),setTimeout(()=>{const{crops:n,pets:o}=hu(),r=t==="crop"?n:o;r&&(r.click(),setTimeout(()=>{const i=Uh();if(!i)return;const a=i.querySelectorAll(".McGrid");for(const s of a){const l=s.textContent??"";if(l.toLowerCase().includes(e.toLowerCase())||l.includes(Fh(e,t))){s.click();break}}setTimeout(()=>{Ut(()=>Vh());},100);},200));},100);}function ef(e,t,n){const o=document.createElement("div");o.style.cssText="margin-bottom: 16px;";let r=0,i=0;for(const u of t)n==="pet"?(r+=u.variantsLogged.length+(u.abilitiesLogged?.length??0),i+=u.variantsTotal+(u.abilitiesTotal??0)):(r+=u.variantsLogged.length,i+=u.variantsTotal);const a=document.createElement("div"),s=n==="crop"?"#7cb342":"#9575cd";a.style.cssText=`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        margin-bottom: 12px;
        border-bottom: 2px solid rgba(212, 196, 168, 0.3);
    `;const l=document.createElement("span");l.textContent=e,l.style.cssText=`font-size: 16px; font-weight: 600; font-family: shrikhand, serif; color: ${s}; text-transform: uppercase;`;const c=document.createElement("span");c.textContent=`${r}/${i}`,c.style.cssText="color: #A88A6B; font-size: 12px; font-weight: bold;",a.append(l,c);const d=document.createElement("div");d.style.cssText="display: flex; flex-direction: column; gap: 12px; padding: 0 4px;";for(const u of t)d.appendChild(QA(u,n));return o.append(a,d),o}function Wh(){const e=qe.getMyJournal(),t=qe.calculateProduceProgress(e),n=qe.calculatePetProgress(e),o=document.createElement("div");o.className="gemini-journal-allContent",o.style.cssText=`
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
    `;const f=document.createElement("span");f.textContent="Filter:",f.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold;";const g=document.createElement("select");for(const[k,T]of [["all","All"],["missing","Missing"],["complete","Complete"]]){const b=document.createElement("option");b.value=k,b.textContent=T,g.appendChild(b);}g.value=Tr,g.style.cssText=`
        background: #D4C8B8;
        color: #3D3325;
        border: 1px solid #8B7355;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 10px;
        cursor: pointer;
    `,g.onchange=()=>{Tr=g.value,nf();};const h=document.createElement("span");h.textContent="Sort:",h.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold; margin-left: 8px;";const y=document.createElement("select");for(const[k,T]of [["default","Default"],["az","A-Z"],["progress","By Progress"]]){const b=document.createElement("option");b.value=k,b.textContent=T,y.appendChild(b);}y.value=ws,y.style.cssText=g.style.cssText,y.onchange=()=>{ws=y.value,nf();},p.append(f,g,h,y);const x=document.createElement("div");x.className="gemini-all-scroll",x.style.cssText=`
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
    `,eE();const w=tf(t.speciesDetails,"crop"),v=tf(n.speciesDetails,"pet");if(w.length>0&&x.appendChild(ef("Crops",w,"crop")),v.length>0&&x.appendChild(ef("Pets",v,"pet")),w.length===0&&v.length===0){const k=document.createElement("div");k.style.cssText="text-align: center; padding: 40px 20px; color: #A88A6B; font-size: 14px;",k.textContent=Tr==="missing"?"All entries are complete!":Tr==="complete"?"No complete entries yet.":"No entries found.",x.appendChild(k);}return o.append(r,p,x),o}function tf(e,t){let n=e.filter(o=>{let r,i;t==="pet"?(r=o.variantsLogged.length+(o.abilitiesLogged?.length??0),i=o.variantsTotal+(o.abilitiesTotal??0)):(r=o.variantsLogged.length,i=o.variantsTotal);const a=i>0?r/i*100:0;switch(Tr){case "missing":return a<100;case "complete":return a>=100;default:return  true}});return ws==="az"?n=[...n].sort((o,r)=>o.species.localeCompare(r.species)):ws==="progress"&&(n=[...n].sort((o,r)=>{const i=t==="pet"?o.variantsLogged.length+(o.abilitiesLogged?.length??0):o.variantsLogged.length,a=t==="pet"?o.variantsTotal+(o.abilitiesTotal??0):o.variantsTotal,s=a>0?i/a:0,l=t==="pet"?r.variantsLogged.length+(r.abilitiesLogged?.length??0):r.variantsLogged.length,c=t==="pet"?r.variantsTotal+(r.abilitiesTotal??0):r.variantsTotal;return (c>0?l/c:0)-s})),n}let Hl=false;function eE(){if(Hl)return;Hl=true;const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e),jt.add(()=>{e.remove(),Hl=false;});}function nf(){const e=document.querySelector(`.${Gc}`);if(e){for(;e.firstChild;)e.firstChild.remove();e.appendChild(Wh());}}function tE(){if(Qn)return;Qn=true;const t=document.querySelector(`.${nl}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="35px"),KA();const n=Uh();if(!n){console.warn("[JournalAllTab] Cannot activate All tab: content wrapper not found"),Qn=false;return}const o=[];for(const a of Array.from(n.children))a instanceof HTMLElement&&!a.classList.contains(Gc)&&(o.push(a),a.style.visibility="hidden");wn.add(()=>{for(const a of o)a.style.visibility="";});const r=document.createElement("div");r.className=Gc,r.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: transparent;
        display: flex;
        flex-direction: column;
    `,window.getComputedStyle(n).position==="static"&&(n.style.position="relative",wn.add(()=>{n.style.position="";})),r.appendChild(Wh()),n.appendChild(r),wn.add(()=>r.remove()),nE(),console.log("[JournalAllTab] All tab activated");}function nE(){const e=Gh();if(!e)return;const t=qe.getMyJournal(),n=qe.calculateProduceProgress(t),o=qe.calculatePetProgress(t),r=n.variantsLogged+o.variantsLogged+(o.abilitiesLogged??0),i=n.variantsTotal+o.variantsTotal+(o.abilitiesTotal??0),a=Math.floor(r/i*100);if(!e.hasAttribute("data-original-percent")){const c=e.textContent?.match(/Collected\s+(\d+)%/);c&&e.setAttribute("data-original-percent",c[1]);}const s=e.querySelector("span.chakra-text");s&&!s.hasAttribute("data-original-count")&&s.setAttribute("data-original-count",s.textContent||"");const l=e.childNodes[0];l&&l.nodeType===Node.TEXT_NODE&&(l.textContent=`Collected ${a}% `),s&&(s.textContent=`(${r}/${i})`);}function oE(){const e=Gh();if(!e)return;const t=e.getAttribute("data-original-percent");if(t){const o=e.childNodes[0];o&&o.nodeType===Node.TEXT_NODE&&(o.textContent=`Collected ${t}% `),e.removeAttribute("data-original-percent");}const n=e.querySelector("span.chakra-text");if(n){const o=n.getAttribute("data-original-count");o&&(n.textContent=o),n.removeAttribute("data-original-count");}}function bu(){if(!Qn)return;Qn=false;const t=document.querySelector(`.${nl}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="20px"),wn.run(),wn=Qe(),oE(),console.log("[JournalAllTab] All tab deactivated");}function Vh(){const e=jh();if(!e||e.querySelector(`.${nl}`))return;const{crops:t,pets:n}=hu();if(!t)return;const o=JA();e.insertBefore(o,t),jt.add(()=>o.remove());const r=()=>{Ut(()=>bu());};t&&(t.addEventListener("click",r),jt.add(()=>t.removeEventListener("click",r))),n&&(n.addEventListener("click",r),jt.add(()=>n.removeEventListener("click",r))),console.log("[JournalAllTab] Tab injected");}function Ga(){Ut(()=>{Vh();});}let Un=null;function rE(){Un!==null&&clearTimeout(Un),Un=window.setTimeout(()=>{tr()||Ga(),Un=null;},200);}function iE(){setTimeout(Ga,100),setTimeout(Ga,400),setTimeout(Ga,800);const e=new MutationObserver(()=>{tr()||rE();});e.observe(document.body,{childList:true,subtree:true}),uo(jt,e),jt.add(()=>{Un!==null&&(clearTimeout(Un),Un=null);});}function aE(){bu(),wn.run(),wn.clear(),jt.run(),jt.clear(),wn=Qe(),jt=Qe();}function sE(){di||(di=true,iE(),console.log("[JournalAllTab] Initialized"));}function lE(){di&&(di=false,aE(),console.log("[JournalAllTab] Destroyed"));}function cE(){return di}const dE=Object.freeze(Object.defineProperty({__proto__:null,destroy:lE,init:sE,isEnabled:cE},Symbol.toStringTag,{value:"Module"}));function uE(){const e=ls();Ee(mn.JOURNAL_HINTS,true),Ee(mn.JOURNAL_FILTER_SORT,true),e.register({id:"abilitiesInject",name:"Journal Abilities",description:"Shows pet abilities in journal modal",injection:pA,storageKey:mn.ABILITIES_INJECT,defaultEnabled:true}),e.register({id:"journalHints",name:"Journal Hints",description:"Shows hints for missing journal entries on hover",injection:OA,storageKey:mn.JOURNAL_HINTS,defaultEnabled:true}),e.register({id:"journalFilterSort",name:"Journal Filter/Sort",description:"Adds filter and sort controls to journal overview",injection:XA,storageKey:mn.JOURNAL_FILTER_SORT,defaultEnabled:true}),e.register({id:"journalAllTab",name:"Journal All Tab",description:"Adds an All tab showing combined crops and pets view",injection:dE,storageKey:mn.JOURNAL_ALL_TAB,defaultEnabled:true});}const of=Me.JOURNAL,jl={injections:{abilitiesInject:true,journalHints:true,journalFilterSort:true,journalAllTab:true}};function pE(){const e=Te(of,null);return e||(Te(Me.JOURNAL_CHECKER,null)&&Ee(of,jl),jl)}let lr=false;const qe={init(){lr||(lr=true,pE(),jT(),uE());},destroy(){lr&&(lr=false,UT());},isReady(){return lr},getProgress(){return null},getMyJournal:Eh,getCropVariants:Ih,getPetVariants:Ph,getAllMutations:GT,getPetAbilities:Mh,calculateProduceProgress:Lh,calculatePetProgress:Rh,aggregateJournalProgress:el,getMissingSummary:HT,refresh:WT,dispatchUpdate:pu},xu=Me.BULK_FAVORITE,qh={enabled:false,position:"top-right"};function zi(){return Te(xu,qh)}function Xh(e){Ee(xu,e);}function fE(e){const t=zi();t.position=e,Xh(t);}function Kh(){return zi().enabled}function gE(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function mE(e){const t=Nt().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let o=0;for(const r of t.items){if(!gE(r))continue;const i=n.has(r.id);e&&i||!e&&!i||(await Xs(r.id,e),o++,await hE(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${o} items`),o}function hE(e){return new Promise(t=>setTimeout(t,e))}let fa=false;const Hc={init(){fa||(fa=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return fa},DEFAULT_CONFIG:qh,STORAGE_KEY:xu,loadConfig:zi,saveConfig:Xh,isEnabled:Kh,setPosition:fE,bulkFavorite:mE,destroy(){fa=false;}};class bE{constructor(){U(this,"achievements",new Map);U(this,"data");U(this,"STORAGE_KEY",Me.ACHIEVEMENTS);U(this,"onUnlockCallbacks",[]);U(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Te(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Ee(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const o=this.isUnlocked(t),r=await n.checkProgress(),i={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=r>=n.target;return !o&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const o=await this.checkAchievement(n);t.push(o);}return t}unlock(t,n){const o=this.achievements.get(t);if(!o)return;const r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return {total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Unlock callback error:",o);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Progress callback error:",o);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Ur=null;function Tt(){return Ur||(Ur=new bE),Ur}function xE(){Ur&&(Ur=null);}let ga=false;const yE={init(){ga||(Tt(),ga=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return ga},getManager(){return Tt()},register:(...e)=>Tt().register(...e),registerMany:(...e)=>Tt().registerMany(...e),isUnlocked:(...e)=>Tt().isUnlocked(...e),getAll:()=>Tt().getAllAchievements(),getUnlocked:()=>Tt().getUnlockedAchievements(),getStats:()=>Tt().getCompletionStats(),checkAll:()=>Tt().checkAllAchievements(),onUnlock:(...e)=>Tt().onUnlock(...e),onProgress:(...e)=>Tt().onProgress(...e),destroy(){xE(),ga=false;}},vE={enabled:true},Yh=Me.ANTI_AFK,wE=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],SE=25e3,CE=1,kE=1e-5,ye={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function _E(){const e=(t,n)=>{const o=r=>{r.stopImmediatePropagation(),r.preventDefault?.();};t.addEventListener(n,o,{capture:true}),ye.listeners.push({type:n,handler:o,target:t});};for(const t of wE)e(document,t),e(window,t);}function TE(){for(const{type:e,handler:t,target:n}of ye.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ye.listeners.length=0;}function AE(){const e=Object.getPrototypeOf(document);ye.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ye.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ye.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function EE(){const e=Object.getPrototypeOf(document);try{ye.savedProps.hidden&&Object.defineProperty(e,"hidden",ye.savedProps.hidden);}catch{}try{ye.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ye.savedProps.visibilityState);}catch{}try{ye.savedProps.hasFocus&&(document.hasFocus=ye.savedProps.hasFocus);}catch{}}function Ss(){ye.audioCtx&&ye.audioCtx.state!=="running"&&ye.audioCtx.resume?.().catch(()=>{});}function IE(){try{const e=window.AudioContext||window.webkitAudioContext;ye.audioCtx=new e({latencyHint:"interactive"}),ye.gainNode=ye.audioCtx.createGain(),ye.gainNode.gain.value=kE,ye.oscillator=ye.audioCtx.createOscillator(),ye.oscillator.frequency.value=CE,ye.oscillator.connect(ye.gainNode).connect(ye.audioCtx.destination),ye.oscillator.start(),document.addEventListener("visibilitychange",Ss,{capture:!0}),window.addEventListener("focus",Ss,{capture:!0});}catch{Jh();}}function Jh(){try{ye.oscillator?.stop();}catch{}try{ye.oscillator?.disconnect(),ye.gainNode?.disconnect();}catch{}try{ye.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Ss,{capture:true}),window.removeEventListener("focus",Ss,{capture:true}),ye.oscillator=null,ye.gainNode=null,ye.audioCtx=null;}function PE(){const e=document.querySelector("canvas")||document.body||document.documentElement;ye.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},SE);}function ME(){ye.heartbeatInterval!==null&&(clearInterval(ye.heartbeatInterval),ye.heartbeatInterval=null);}function Ul(){AE(),_E(),IE(),PE();}function Wl(){ME(),Jh(),TE(),EE();}let ma=false,gt=false;function go(){return Te(Yh,vE)}function Vl(e){Ee(Yh,e);}const Po={init(){if(ma)return;const e=go();ma=true,e.enabled?(Ul(),gt=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return ma},isRunning(){return gt},isEnabled(){return go().enabled},enable(){const e=go();e.enabled=true,Vl(e),gt||(Ul(),gt=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=go();e.enabled=false,Vl(e),gt&&(Wl(),gt=false,console.log("[MGAntiAfk] Disabled"));},toggle(){Po.isEnabled()?Po.disable():Po.enable();},getConfig(){return go()},updateConfig(e){const n={...go(),...e};Vl(n),n.enabled&&!gt?(Ul(),gt=true):!n.enabled&&gt&&(Wl(),gt=false);},destroy(){gt&&(Wl(),gt=false),ma=false,console.log("[MGAntiAfk] Destroyed");}},Qh=Me.PET_TEAM,LE={enabled:false,teams:[],activeTeamId:null},yu=3,rf=50,He="";function Ze(){return Te(Qh,LE)}function Tn(e){Ee(Qh,e);}function RE(e){const n={...Ze(),...e};return Tn(n),n}function NE(){return Ze().enabled}function OE(e){RE({enabled:e});}function $E(){return crypto.randomUUID()}function jc(){return Date.now()}function Zh(e=[]){const t=[...e];for(;t.length<yu;)t.push(He);return [t[0]||He,t[1]||He,t[2]||He]}function eb(e,t){const n=Ze(),o=e.trim();return o?!n.teams.some(r=>r.name.trim()===o&&r.id!==t):false}function tb(e,t){const n=Ze();if(!e.some(i=>i!==He))return  true;const r=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===r)}function nb(e){const n=lo().get(),o=new Set(n.all.map(i=>i.id)),r=Ze();for(const i of r.teams)for(const a of i.petIds)a!==He&&o.add(a);for(const i of e)if(i!==He&&!o.has(i))return  false;return  true}function ob(e){const n=lo().get(),o=new Map(n.all.map(i=>[i.id,i])),r=[];for(const i of e.petIds){if(i===He)continue;const a=o.get(i);a&&r.push(a);}return r}function FE(e){return e.petIds.every(t=>t!==He)}function DE(e){const t=[];for(let n=0;n<yu;n++)e.petIds[n]===He&&t.push(n);return t}function BE(e){return e.petIds.filter(t=>t!==He).length}function zE(e){return e.petIds.every(t=>t===He)}function GE(e,t){return e.petIds.includes(t)}function HE(e,t){return e.petIds.indexOf(t)}function jE(e,t=[]){const n=Ze();if(n.teams.length>=rf)throw new Error(`Maximum number of teams (${rf}) reached`);if(!eb(e))throw new Error(`Team name "${e}" already exists`);const o=e.trim();if(!o)throw new Error("Team name cannot be empty");const r=Zh(t);if(!nb(r))throw new Error("One or more pet IDs do not exist");if(!tb(r))throw new Error("A team with this exact composition already exists");const i={id:$E(),name:o,petIds:r,createdAt:jc(),updatedAt:jc()};return n.teams.push(i),Tn(n),i}function rb(e,t){const n=Ze(),o=n.teams.findIndex(a=>a.id===e);if(o===-1)return null;const r=n.teams[o];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!eb(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=Zh(t.petIds);if(!nb(a))throw new Error("One or more pet IDs do not exist");if(!tb(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...r,...t,id:r.id,createdAt:r.createdAt,updatedAt:jc()};return n.teams[o]=i,Tn(n),i}function UE(e){const t=Ze(),n=t.teams.length;return t.teams=t.teams.filter(o=>o.id!==e),t.teams.length===n?false:(Tn(t),true)}function WE(e){return Ze().teams.find(n=>n.id===e)??null}function VE(){return [...Ze().teams]}function qE(e){const t=Ze(),n=e.trim();return t.teams.find(o=>o.name.trim()===n)??null}function XE(e){const t=Ze(),n=new Map(t.teams.map(o=>[o.id,o]));if(e.length!==t.teams.length)return  false;for(const o of e)if(!n.has(o))return  false;return t.teams=e.map(o=>n.get(o)),Tn(t),true}function KE(e,t){try{return rb(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function YE(){const n=lo().get().byLocation.active.map(r=>r.id).sort(),o=Ze();for(const r of o.teams){const i=r.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return r.id}return null}function ib(){const e=YE(),t=Ze();return e!==t.activeTeamId&&(t.activeTeamId=e,Tn(t)),e}function ab(e){const t=Ze();t.activeTeamId=e,Tn(t);}function JE(e){return ib()===e}function QE(e){const t=lo(),n=Nt(),o=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=o.byLocation.active,a=e.petIds.filter(d=>d!==He).sort(),s=i.map(d=>d.id).sort();if(JSON.stringify(a)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const l=o.hutch,c=l.hasHutch?l.maxItems-l.currentItems:0;ZE(e.petIds,c,o),ab(e.id),console.log("[PetTeam] Team activated successfully");}function ZE(e,t,n){const o=n.byLocation.active;let r=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let i=0;i<yu;i++){const a=e[i],s=o[i]??null;if(console.log(`[PetTeam] Slot ${i}: current=${s?.id.slice(0,8)??"empty"}, target=${a.slice(0,8)||"empty"}, hutchSpace=${r}`),s?.id===a){console.log(`[PetTeam] Slot ${i}: Same pet, skipping`);continue}if(a===He&&s){const l=r>0;console.log(`[PetTeam] Slot ${i}: Removing pet, storeInHutch=${l}`),eI(s.id,l),l&&r--;continue}if(!s&&a!==He){const c=n.all.find(d=>d.id===a)?.location==="hutch";console.log(`[PetTeam] Slot ${i}: Adding pet, fromHutch=${c}`),c&&r++,tI(a,n);continue}if(s&&a!==He){const c=n.all.find(u=>u.id===a)?.location==="hutch";c&&r++;const d=r>0;console.log(`[PetTeam] Slot ${i}: Swapping pets, fromHutch=${c}, storeInHutch=${d}`),nI(s.id,a,n,d),d&&r--;continue}}console.log(`[PetTeam] Swap complete, ${r} hutch spaces remaining`);}function eI(e,t){lh(e),t&&Wd(e);}function tI(e,t){const n=t.all.find(o=>o.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&Vd(e),ah(e);}function nI(e,t,n,o){const r=n.all.find(i=>i.id===t);if(!r){console.warn(`[PetTeam] Pet ${t} not found`);return}r.location==="hutch"&&Vd(t),sh(e,t),o&&Wd(e);}function oI(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function rI(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(o=>o&&typeof o=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function iI(e){const t=Date.now(),n=e.slots||[],o=[typeof n[0]=="string"?n[0]:He,typeof n[1]=="string"?n[1]:He,typeof n[2]=="string"?n[2]:He];return {name:e.name?.trim()||"Imported Team",petIds:o,createdAt:t,updatedAt:t}}function aI(){const e={success:false,source:"none",imported:0,errors:[]};if(!oI())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=rI();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=Ze();n.teams=[],n.activeTeamId=null;const o=new Set;for(const r of t)try{const i=iI(r);let a=i.name;if(o.has(a)){let l=1;for(;o.has(`${a} (${l})`);)l++;a=`${a} (${l})`;}o.add(a);const s={id:crypto.randomUUID(),name:a,petIds:i.petIds,createdAt:i.createdAt,updatedAt:i.updatedAt};n.teams.push(s),e.imported++;}catch(i){const a=i instanceof Error?i.message:String(i);e.errors.push(`Failed to import "${r.name}": ${a}`);}return e.imported>0&&(Tn(n),e.success=true,e.source="aries"),e}let ha=false;const he={init(){if(ha)return;if(!Ze().enabled){console.log("[PetTeam] Feature disabled");return}ha=true,console.log("[PetTeam] Feature initialized");},destroy(){ha&&(ha=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:NE,setEnabled:OE,createTeam:jE,updateTeam:rb,deleteTeam:UE,renameTeam:KE,getTeam:WE,getAllTeams:VE,getTeamByName:qE,reorderTeams:XE,getPetsForTeam:ob,isTeamFull:FE,getEmptySlots:DE,getFilledSlotCount:BE,isTeamEmpty:zE,isPetInTeam:GE,getPetSlotIndex:HE,getActiveTeamId:ib,setActiveTeamId:ab,isActiveTeam:JE,activateTeam:QE,importFromAries:aI},sI=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],sb=Me.XP_TRACKER,lI={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},Mo="XP Tracker",Lo="[XpTracker]";function nr(){return Te(sb,lI)}function lb(e){Ee(sb,e);}function cb(e){const n={...nr(),...e};return lb(n),n}function db(){return nr().enabled}function cI(e){cb({enabled:e});}function vu(e){return sI.includes(e)}function dI(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return !n||!vu(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function ub(e){return e.filter(vu)}function pb(e){return e.some(vu)}function uI(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function fb(e,t,n,o=100){const r=dI(e);if(!r)return null;const i=uI(e),a=r.requiredWeather,s=a===null||n===a,l=t/o,c=l*l,d=r.baseProbability,u=r.bonusXp,p=d,f=Math.floor(u*c),g=p/100*60,h=s?Math.floor(g*f):0;return {abilityId:e,abilityName:r.name,tier:i,baseChancePerMinute:d,actualChancePerMinute:p,baseXpPerProc:u,actualXpPerProc:f,expectedProcsPerHour:g,expectedXpPerHour:h,requiredWeather:a,isActive:s}}function gb(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const o of e){const r=ub(o.abilities);for(const i of r){const a=fb(i,o.strength,t,o.maxStrength||100);a&&(n.boosters.push({petId:o.petId,petName:o.petName,stats:a}),a.isActive&&(n.totalBonusXpPerHour+=a.expectedXpPerHour,n.totalProcsPerHour+=a.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function mb(e,t,n,o=100){const r=ub(e);return r.length===0?null:fb(r[0],t,n,o)}function af(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function pI(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function fI(e,t){return e.species.localeCompare(t.species)}function gI(e,t){return t.currentStrength-e.currentStrength}function mI(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function hI(e,t){return e.name.localeCompare(t.name)}function bI(e){switch(e){case "closestToMax":return af;case "furthestFromMax":return pI;case "species":return fI;case "strength":return gI;case "location":return mI;case "name":return hI;default:return af}}function hb(e,t){const n=bI(t);return [...e].sort(n)}function xI(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function yI(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function bb(e,t){let n=e;return n=xI(n,t.filterSpecies),n=yI(n,t.filterHasXpBoost),n=hb(n,t.sortBy),n}function cr(e){const t=he.getTeam(e);if(!t)return null;const n=xb(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:We,bonusXpPerHour:0,totalXpPerHour:We,activeBoosterCount:0,totalProcsPerHour:0}};const o=be.weather.get(),r=o.isActive?o.type:null,i=n.filter(d=>!d.isMature||pb(d.abilities)).filter(d=>d.hunger>0).map(d=>({petId:d.id,petName:d.name??"",abilities:d.abilities,strength:d.currentStrength})),a=gb(i,r),s=[],l=vI(n,a.totalBonusXpPerHour);for(const d of n){const u=Uc(d,r,a.totalBonusXpPerHour,l);s.push(u);}const c={baseXpPerHour:We,bonusXpPerHour:a.totalBonusXpPerHour,totalXpPerHour:We+a.totalBonusXpPerHour,activeBoosterCount:a.activeBoosterCount,totalProcsPerHour:a.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:c}}function xb(e){const t=be.myPets.get(),n=[];for(const o of e.petIds){if(!o)continue;const r=t.all.find(i=>i.id===o);r&&n.push(r);}return n}function vI(e,t){let n=0;for(const o of e){const r=Oi(o.petSpecies,o.targetScale);if($i(o.petSpecies,o.xp,r)>=r)continue;const a=o.hunger>0?We+t:0,s=Qs(o.petSpecies,o.xp,r,a>0?a:We);n=Math.max(n,s);}return n}function Uc(e,t,n,o){const r=Oi(e.petSpecies,e.targetScale),i=$i(e.petSpecies,e.xp,r),a=i>=r,s=e.hunger<=0,c=s?0:(s?0:We)+n,d=mb(e.abilities,i,t),u=a?null:ou(e.petSpecies,e.xp,i,r,c>0?c:We),p=Qs(e.petSpecies,e.xp,r,c>0?c:We),f=u!==null?au(e.petSpecies,e.hunger,u):null,g=si(e.petSpecies,e.hunger,p),h=a&&d&&o>0?su(true,true,e.petSpecies,e.hunger,0,o):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:i,maxStrength:r,isMaxStrength:a,xpPerHour:c,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:d,supportingFeeds:h,mutations:e.mutations,targetScale:e.targetScale}}function sf(e){const t=he.getTeam(e);if(!t)return 0;const n=xb(t);if(n.length===0)return 0;const o=n.map(r=>{const i=Oi(r.petSpecies,r.targetScale);return $i(r.petSpecies,r.xp,i)/i*100});return o.reduce((r,i)=>r+i,0)/o.length}function lf(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let Xo=false,Ha=null,ol=[],wu=null;function wI(e,t,n){const o=Oi(e.petSpecies,e.targetScale),r=$i(e.petSpecies,e.xp,o),i=r>=o,a=e.hunger<=0,s=a?0:We,l=mb(e.abilities,r,t);l?.isActive&&l.expectedXpPerHour;const c=e.location==="active"&&!a?s+n:0,d=ou(e.petSpecies,e.xp,r,o,c>0?c:We),u=Qs(e.petSpecies,e.xp,o,c>0?c:We),p=au(e.petSpecies,e.hunger,d),f=si(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:a,currentStrength:r,maxStrength:o,isMaxStrength:i,hoursToNextStrength:d,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:c,xpBoostStats:l,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function yb(){const e=be.myPets.get(),t=be.weather.get(),n=t.isActive?t.type:null,r=e.byLocation.active.filter(l=>!l.isMature||pb(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),i=gb(r,n);wu=i;const a=[];for(const l of e.all){const c=wI({id:l.id,petSpecies:l.petSpecies,name:l.name??"",xp:l.xp,hunger:l.hunger,targetScale:l.targetScale,abilities:l.abilities,mutations:l.mutations,location:l.location},n,i.totalBonusXpPerHour);a.push(c);}const s=Math.max(0,...a.map(l=>l.hoursToMaxStrength));for(const l of a)l.isMaxStrength&&l.xpBoostStats&&(l.feedsToMaxStrength=su(true,true,l.species,l.hunger,0,s));return a}function vb(){if(Xo)return;if(!nr().enabled){console.log(`${Lo} ${Mo} disabled`);return}console.log(`${Lo} Initializing ${Mo}...`),J.isReady()&&(ol=yb()),Xo=true,console.log(`${Lo} ${Mo} initialized`);}function Su(){return Xo&&J.isReady()}function Cu(){return Su()?ol:[]}function SI(){return Cu().filter(e=>e.location==="active")}function CI(){return wu}function ku(){Su()&&(ol=yb());}function kI(e){_u();const t=nr(),n=e??t.updateIntervalMs;Ha=setInterval(()=>{db()&&ku();},n);}function _u(){Ha&&(clearInterval(Ha),Ha=null);}function wb(){Xo&&(_u(),Xo=false,ol=[],wu=null,console.log(`${Lo} ${Mo} destroyed`));}function _I(){const e=nr();return bb(Cu(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function TI(e){cI(e),e?(Xo=false,vb(),J.isReady()&&ku(),console.log(`${Lo} ${Mo} enabled`)):(wb(),console.log(`${Lo} ${Mo} disabled`));}const Wc={init:vb,isReady:Su,destroy:wb,loadConfig:nr,saveConfig:lb,updateConfig:cb,isEnabled:db,setEnabled:TI,getAllPetsProgress:Cu,getActivePetsProgress:SI,getCombinedBoostStats:CI,getFilteredPets:_I,refresh:ku,startAutoUpdate:kI,stopAutoUpdate:_u,sortPets:hb,filterAndSortPets:bb},ui={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},pi={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(ui),...Object.keys(pi)];function Tu(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in ui){const r=ui[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function Au(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in pi){const r=pi[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function fi(e){let t=0,n=0;for(const o of e){const r=o.procRate*60;t+=r,n+=r*o.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Ro(e){return e.some(t=>t.abilities.some(n=>n in ui))}function No(e){return e.some(t=>t.abilities.some(n=>n in pi))}let Wr=null;function Sb(){const t=rt().get().plant;if(!t)return;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n&&Pt(n.species,n.targetScale,n.mutations||[]);}function AI(e){Sb();}function EI(){Wr&&Cb(),Sb(),Wr=rt().subscribePlantInfo(AI,{immediate:true});}function Cb(){Wr&&(Wr(),Wr=null);}const Vc="css-qnqsp4",qc="css-v439q6";let Oo=Qe(),Xc=false,dr=false,ja=null,Kc=null,Wn=null;const II=`
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
`;function PI(){if(Xc)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=II,document.head.appendChild(e),Oo.add(()=>e.remove()),Xc=true;}function MI(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const o=document.createElement("canvas");o.width=20,o.height=20,n.appendChild(o);const r=document.createElement("div");r.className="gemini-qol-cropPrice-text",r.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(r);try{const i=Q.toCanvas("ui","Coin");if(i&&o.parentElement){const a=o.getContext("2d");if(a){const s=Math.min(o.width/i.width,o.height/i.height),l=i.width*s,c=i.height*s,d=(o.width-l)/2,u=(o.height-c)/2;a.drawImage(i,d,u,l,c);}}}catch(i){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",i);}return t}function LI(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const o of n){const r=o.textContent?.trim();if(!r)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(r)&&t.push(r);}return t}function RI(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const o=n.textContent?.trim();if(!o)continue;const r=o.match(/^([\d.]+)\s*kg$/i);if(r)return parseFloat(r[1])}return 1}function NI(){const e=[],t=document.querySelectorAll(`.${Vc}`);for(const o of t)o.offsetParent&&(o.closest("button.chakra-button")||e.push({element:o}));const n=document.querySelectorAll(`.${qc}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelectorAll(":scope > .McFlex > .McFlex");if(r.length>0){const i=r[r.length-1];i.querySelector("p.chakra-text")&&e.push({element:i});}}return e}function OI(){const t=rt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Pt(n.species,n.targetScale,n.mutations||[]):0}function $I(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(".gemini-qol-cropPrice-text");r&&(r.textContent=e>0?e.toLocaleString():"");}}function FI(){Wn!==null&&cancelAnimationFrame(Wn),Wn=requestAnimationFrame(()=>{Wn=null;const e=OI();if(e===Kc)return;Kc=e;const n=rt().get().plant;!n||!(n.currentSlotIndex!==null&&n.slots[n.currentSlotIndex])||$I(e);});}function ur(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;const r=rt().get().plant;let i=0,a=null;if(r&&r.currentSlotIndex!==null){const l=r.slots[r.currentSlotIndex];l&&(a=l.species,i=Pt(l.species,l.targetScale,l.mutations||[]));}if(i===0){const l=t.textContent?.trim();if(l){a=l;const c=RI(n),d=LI(n);i=Pt(l,c,d);}}const s=MI(i);n.appendChild(s),Oo.add(()=>s.remove());}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function DI(){const e=NI();for(const n of e)ur(n);ja=rt().subscribePlantInfo(()=>{FI();});const t=new MutationObserver(n=>{for(const o of n)o.type==="childList"&&o.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.classList.contains(Vc)&&(r.closest("button.chakra-button")||ur({element:r})),r.querySelectorAll(`.${Vc}`).forEach(s=>{s.closest("button.chakra-button")||ur({element:s});}),r.classList.contains(qc)&&!r.closest("button.chakra-button")){const s=r.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&!l.querySelector(".gemini-qol-cropPrice")&&ur({element:l});}}r.querySelectorAll(`.${qc}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const c=l[l.length-1];c.querySelector("p.chakra-text")&&!c.querySelector(".gemini-qol-cropPrice")&&ur({element:c});}}});}});});t.observe(document.body,{childList:true,subtree:true}),uo(Oo,t);}const BI={init(){dr||(dr=true,PI(),DI());},destroy(){dr&&(dr=false,Wn!==null&&(cancelAnimationFrame(Wn),Wn=null),ja&&(ja(),ja=null),Oo.run(),Oo.clear(),Oo=Qe(),Xc=false,Kc=null);},isEnabled(){return dr}},kb=Me.CROP_VALUE_INDICATOR,zI={enabled:false};function Eu(){return Te(kb,zI)}function GI(e){Ee(kb,e);}let gi=false;function _b(){gi||!Eu().enabled||(gi=true,EI());}function Tb(){gi&&(Cb(),gi=false);}function HI(){return gi}function jI(){return Eu().enabled}function UI(e){const t=Eu();t.enabled!==e&&(t.enabled=e,GI(t),e?_b():Tb());}const Ua={init:_b,destroy:Tb,isReady:HI,isEnabled:jI,setEnabled:UI,render:BI},mi="css-qnqsp4",Iu="css-1cdcuw7",Pu='[role="tooltip"]';let Wa=Qe(),pr=false,Va=null,Yc=null,Vn=null;function WI(){const e=[],t=document.querySelectorAll(`.${mi}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const o=n.querySelector(`.${Iu}`);o&&e.push({element:n,weightElement:o});}return e}function VI(){const t=rt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?tu(n.species,n.targetScale):0}function qI(e,t){const n=document.querySelectorAll(`.${mi}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(`.${Iu}`);if(r){const i=r.querySelector("svg"),a=`${e}%`;r.textContent=a,i&&r.appendChild(i);}}Cs(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function XI(){Vn!==null&&cancelAnimationFrame(Vn),Vn=requestAnimationFrame(()=>{Vn=null;const e=VI();if(e===Yc)return;Yc=e;const n=rt().get().plant;if(!n)return;const o=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;o&&qI(e,o);});}function Ab(e,t){const n=J.get("plants");if(!n)return "";const o=n[e];return o?.crop?.baseWeight?`${(o.crop.baseWeight*t).toFixed(2)} kg`:""}function Cs(){const e=document.querySelectorAll(Pu),n=rt().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=Ab(o.species,o.targetScale);for(const i of e){if(!i.offsetParent)continue;const a=i.textContent?.trim();a&&a.startsWith("Size:")&&r&&(i.textContent=r);}}function ql(){const e=WI();for(const t of e)if(t.weightElement)try{const o=rt().get().plant;if(o&&o.currentSlotIndex!==null){const r=o.slots[o.currentSlotIndex];if(r){const i=tu(r.species,r.targetScale),a=t.weightElement.querySelector("svg");t.weightElement.textContent=`${i}%`,a&&t.weightElement.appendChild(a);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}Cs();}function KI(){const e=document.querySelectorAll(`.${mi}`),n=rt().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=Ab(o.species,o.targetScale);for(const a of e){if(!a.offsetParent||a.closest("button.chakra-button"))continue;const s=a.querySelector(`.${Iu}`);if(s){const l=s.querySelector("svg");s.textContent=r,l&&s.appendChild(l);}}const i=document.querySelectorAll(Pu);for(const a of i){if(!a.offsetParent)continue;const s=a.textContent?.trim();s&&!s.includes("kg")&&(a.textContent=r);}console.log("[CropSizeIndicator.render] Restored crop weights");}function YI(){ql(),Va=rt().subscribePlantInfo(()=>{XI();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.hasAttribute("role")&&o.getAttribute("role")==="tooltip"){const a=o.textContent?.trim();a&&a.startsWith("Size:")&&Cs();}o.classList.contains(mi)&&(o.closest("button.chakra-button")||ql()),o.querySelectorAll(`.${mi}`).length>0&&ql(),o.querySelectorAll(Pu).forEach(a=>{const s=a.textContent?.trim();s&&s.startsWith("Size:")&&Cs();});}});});e.observe(document.body,{childList:true,subtree:true}),uo(Wa,e),console.log("[CropSizeIndicator.render] Started observing crops");}const Mu={init(){if(pr){console.log("[CropSizeIndicator.render] Already initialized");return}pr=true,YI(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){pr&&(pr=false,KI(),Vn!==null&&(cancelAnimationFrame(Vn),Vn=null),Va&&(Va(),Va=null),Wa.run(),Wa.clear(),Wa=Qe(),Yc=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return pr}},Eb=Me.CROP_SIZE_INDICATOR,JI={enabled:false};function Lu(){return Te(Eb,JI)}function QI(e){Ee(Eb,e);}let hi=false;function Ib(){if(hi){console.log("[CropSizeIndicator] Already initialized");return}if(!Lu().enabled){console.log("[CropSizeIndicator] Disabled");return}hi=true,console.log("[CropSizeIndicator] Initializing..."),Mu.init(),console.log("[CropSizeIndicator] Initialized successfully");}function Pb(){hi&&(console.log("[CropSizeIndicator] Destroying..."),Mu.destroy(),hi=false,console.log("[CropSizeIndicator] Destroyed"));}function ZI(){return hi}function eP(){return Lu().enabled}function tP(e){const t=Lu();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,QI(t),e?Ib():Pb(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const qa={init:Ib,destroy:Pb,isReady:ZI,isEnabled:eP,setEnabled:tP,render:Mu},nP={Normal:{letter:"N",color:"#A88A6B",bold:false},Wet:{letter:"W",color:"rgba(76, 204, 204, 1)",bold:false},Chilled:{letter:"C",color:"rgba(144, 184, 204, 1)",bold:false},Frozen:{letter:"F",color:"rgba(148, 160, 204, 1)",bold:false},Dawnlit:{letter:"D",color:"rgb(245, 155, 225)",bold:false},Ambershine:{letter:"A",color:"rgb(255, 180, 120)",bold:false},Gold:{letter:"G",color:"linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)",bold:true,isGradient:true},Rainbow:{letter:"R",color:"linear-gradient(110deg, #ff003c, #ff9a00, #f0ff00, #30ff00, #00fbff, #0018ff, #e100ff)",bold:true,isGradient:true},Dawncharged:{letter:"D",color:"rgb(200, 150, 255)",bold:true},Ambercharged:{letter:"A",color:"rgb(250, 140, 75)",bold:true},"Max Weight":{letter:"S",color:"#717171",bold:false}};function oP(e){const t=nP[e];if(!t){const o=document.createElement("span");return o.textContent=e.charAt(0).toUpperCase(),o.style.cssText="color: #888; font-size: 18px;",o}const n=document.createElement("span");return n.textContent=t.letter,n.title=e,t.isGradient?n.style.cssText=`
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
        `,n}function Mb(e){const t=oP(e),n=t.textContent??e.charAt(0).toUpperCase(),o=t.getAttribute("style")??"";return {text:n,css:o}}const Jc="css-qnqsp4",Qc="css-v439q6",rl="gemini-qol-missingVariants";let $o=Qe(),Zc=false,fr=false,Xa=null,qn=null;const rP=`
  .${rl} {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;function iP(){if(Zc)return;const e=document.createElement("style");e.id="gemini-qol-missingVariants-styles",e.textContent=rP,document.head.appendChild(e),$o.add(()=>e.remove()),Zc=true;}function cf(){return qe.getCropVariants()}function Lb(e){const t=qe.getMyJournal();if(!t)return cf();const o=t.produce?.[e]?.variantsLogged?.map(i=>i.variant)??[];return cf().filter(i=>!o.includes(i))}function aP(e){const t=J.get("plants")??{};return e in t?true:tl(e)?.type==="crop"}function sP(){const t=rt().get().plant;if(!t)return null;let n=null;if(t.currentSlotIndex!==null){const r=t.slots[t.currentSlotIndex];r&&(n=r.species);}return n||(n=t.species),tl(n??"")?.id??n}function lP(e){const t=document.querySelectorAll(`.${rl}`),n=Lb(e);for(const o of t){if(n.length===0){o.remove();continue}const r=Array.from(o.children).map(i=>i.title);if(JSON.stringify(r)!==JSON.stringify(n)){o.replaceChildren();for(const i of n){const a=Mb(i),s=document.createElement("span");s.textContent=a.text,s.title=i,s.style.cssText=a.css,o.appendChild(s);}}}}function cP(){qn!==null&&cancelAnimationFrame(qn),qn=requestAnimationFrame(()=>{qn=null;const e=sP();if(!e)return;const t=Rb();for(const n of t)ho(n);lP(e);});}function dP(e){if(!aP(e))return null;const t=Lb(e);if(t.length===0)return null;const n=document.createElement("div");n.className=rl;for(const o of t){const r=Mb(o),i=document.createElement("span");i.textContent=r.text,i.title=o,i.style.cssText=r.css,n.appendChild(i);}return n}function Rb(){const e=[],t=document.querySelectorAll(`.${Jc}`);for(const o of t)o.offsetParent&&(o.closest("button.chakra-button")||e.push({element:o}));const n=document.querySelectorAll(`.${Qc}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelectorAll(".McFlex");for(const i of r){const a=i.querySelector("p.chakra-text");if(a&&a.textContent&&!a.textContent.includes("%")){e.push({element:i});break}}}return e}function ho(e){if(!e.element.querySelector(`.${rl}`))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;let o=null;const i=rt().get().plant;i&&(i.currentSlotIndex!==null&&i.slots[i.currentSlotIndex]?o=i.slots[i.currentSlotIndex].species:o=i.species);const a=t.textContent?.trim()??"",s=tl(a);if(s?.type==="crop"&&(o=s.id),!o)return;const l=dP(o);l&&(Ut(()=>{n.appendChild(l);}),$o.add(()=>l.remove()));}catch(t){console.warn("[MissingVariantsIndicator] Failed to inject:",t);}}function uP(){const e=Rb();for(const n of e)ho(n);Xa=rt().subscribePlantInfo(()=>{cP();});const t=new MutationObserver(n=>{for(const o of n)o.type==="childList"&&o.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.classList.contains(Jc)&&(r.closest("button.chakra-button")||ho({element:r})),r.querySelectorAll(`.${Jc}`).forEach(s=>{s.closest("button.chakra-button")||ho({element:s});}),r.classList.contains(Qc)&&!r.closest("button.chakra-button")){const s=r.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&ho({element:l});}}r.querySelectorAll(`.${Qc}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const c=l[l.length-1];c.querySelector("p.chakra-text")&&ho({element:c});}}});}});});t.observe(document.body,{childList:true,subtree:true}),uo($o,t);}async function pP(){for(let n=1;n<=5;n++){if(!qe.isReady())try{qe.init();}catch(r){console.warn("[MissingVariantsIndicator] Failed to init journal checker:",r);}if(qe.getMyJournal())return console.log("[MissingVariantsIndicator] Journal data available"),true;n<5&&await new Promise(r=>setTimeout(r,1e3));}return console.warn("[MissingVariantsIndicator] Journal data not available, continuing anyway"),false}const Ru={init(){fr||(fr=true,iP(),uP(),pP().catch(e=>{console.warn("[MissingVariantsIndicator] Error waiting for journal data:",e);}));},destroy(){fr&&(fr=false,Xa&&(Xa(),Xa=null),qn!==null&&(cancelAnimationFrame(qn),qn=null),$o.run(),$o.clear(),$o=Qe(),Zc=false);},isEnabled(){return fr}},Nb=Me.MISSING_VARIANTS_INDICATOR,fP={enabled:false};function Nu(){return Te(Nb,fP)}function gP(e){Ee(Nb,e);}let bi=false;function Ob(){bi||!Nu().enabled||(bi=true,Ru.init(),console.log("✅ [MissingVariantsIndicator] Initialized"));}function $b(){bi&&(Ru.destroy(),bi=false,console.log("🛑 [MissingVariantsIndicator] Destroyed"));}function mP(){return bi}function hP(){return Nu().enabled}function bP(e){const t=Nu();t.enabled!==e&&(t.enabled=e,gP(t),e?Ob():$b());}const Xl={init:Ob,destroy:$b,isReady:mP,isEnabled:hP,setEnabled:bP,render:Ru},Fb=Me.SHOP_NOTIFIER,Db={seed:[],tool:[],egg:[],decor:[]},xP={enabled:false,trackedItems:Db},yP=["seed","tool","egg","decor"];function Bb(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function Gi(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function or(){const e=Te(Fb,xP);return {enabled:e?.enabled??false,trackedItems:Bb(e?.trackedItems)}}function il(e){Ee(Fb,{enabled:e.enabled,trackedItems:Gi(e.trackedItems)});}function vP(e){const n={...or(),...e};return e.trackedItems&&(n.trackedItems=Bb(e.trackedItems)),il(n),n}function Ou(){return or().enabled}function wP(e){vP({enabled:e});}function zb(){return Gi(or().trackedItems)}function Gb(){const e=zb(),t=[];for(const n of yP)for(const o of e[n])t.push({shopType:n,itemId:o});return t}function SP(e,t){const n=or(),o=Gi(n.trackedItems),r=o[e];if(r.includes(t))return;r.push(t),il({...n,trackedItems:o});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(i);}function Hb(e,t){const n=or(),o=Gi(n.trackedItems),r=o[e],i=r.filter(s=>s!==t);if(i.length===r.length)return;o[e]=i,il({...n,trackedItems:o});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(a);}function CP(){const e=or();il({...e,trackedItems:Gi(Db)});}let ks=false;const ed=[];function kP(e,t){const n=zb()[e];if(!n.length)return [];const o=new Set(n);return t.items.filter(r=>o.has(r.id)&&r.isAvailable).map(r=>({itemId:r.id,remaining:r.remaining}))}function ba(e,t){const n=kP(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const o=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(o);}function _P(){if(ks)return;ks=true;const e=co();ed.push(e.subscribeSeedRestock(t=>ba("seed",t)),e.subscribeToolRestock(t=>ba("tool",t)),e.subscribeEggRestock(t=>ba("egg",t)),e.subscribeDecorRestock(t=>ba("decor",t)));}function TP(){if(ks){ks=false;for(const e of ed)e();ed.length=0;}}const jb={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function AP(e,t,n){const o=n.find(i=>typeof i=="object"&&i!==null&&"toolId"in i&&i.toolId===e);return o?(o.quantity??0)>=t:false}function EP(e,t,n){const o=n.find(c=>typeof c=="object"&&c!==null&&"decorId"in c&&c.decorId===e),r=o?o.quantity??0:0,s=Zo().get().decors.all.filter(c=>typeof c=="object"&&c!==null&&"decorId"in c&&c.decorId===e).length;return r+s>=t}function Ub(e,t,n,o){return t==="tool"?AP(e,n,o):t==="decor"?EP(e,n,o):false}function df(e,t){const n=jb[e];if(!n||n.shopType!==t)return  false;const r=Nt().get();return Ub(e,t,n.maxQuantity,r.items)}function uf(){const t=Nt().get(),n=Gb();for(const o of n){const r=jb[o.itemId];r&&r.shopType===o.shopType&&Ub(o.itemId,o.shopType,r.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${o.itemId} (max quantity reached)`),Hb(o.shopType,o.itemId));}}let _s=false,Ka=null;function IP(){if(_s)return;_s=true,Ka=Nt().subscribeStable(()=>{uf();}),uf();}function PP(){_s&&(_s=false,Ka&&(Ka(),Ka=null));}let xi=false;function Wb(){if(xi){console.log("[ShopNotifier] Already initialized");return}if(!Ou()){console.log("[ShopNotifier] Disabled");return}xi=true,_P(),IP(),console.log("[ShopNotifier] Initialized");}function Vb(){xi&&(TP(),PP(),xi=false,console.log("[ShopNotifier] Destroyed"));}function MP(){return xi}function LP(){return Ou()}function RP(e){if(Ou()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}wP(e),e?Wb():Vb(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const Wt={init:Wb,destroy:Vb,isReady:MP,isEnabled:LP,setEnabled:RP,addTrackedItem:SP,removeTrackedItem:Hb,getTrackedItems:Gb,resetTrackedItems:CP},qb=Me.WEATHER_NOTIFIER,NP={enabled:false,trackedWeathers:[]};function Xb(e){return Array.isArray(e)?[...e]:[]}function al(e){return [...e]}function Hi(){const e=Te(qb,NP);return {enabled:e?.enabled??false,trackedWeathers:Xb(e?.trackedWeathers)}}function $u(e){Ee(qb,{enabled:e.enabled,trackedWeathers:al(e.trackedWeathers)});}function OP(e){const n={...Hi(),...e};return e.trackedWeathers&&(n.trackedWeathers=Xb(e.trackedWeathers)),$u(n),n}function Kb(){return Hi().enabled}function $P(e){OP({enabled:e});}function sl(){return al(Hi().trackedWeathers)}function FP(e){return sl().includes(e)}function DP(e){const t=Hi(),n=al(t.trackedWeathers);if(n.includes(e))return;n.push(e);const o=!t.enabled&&n.length>0,r={trackedWeathers:n,enabled:o?true:t.enabled};$u(r);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:o}});window.dispatchEvent(i);const a=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(a);}function BP(e){const t=Hi(),n=al(t.trackedWeathers),o=n.filter(s=>s!==e);if(o.length===n.length)return;const r=t.enabled&&o.length===0,i={trackedWeathers:o,enabled:r?false:t.enabled};$u(i);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:r}});window.dispatchEvent(a);}let Vr=null,Ya="Sunny",Qt=false,qr=null,Ts="";function Yb(e){return `${e.soundId}:${e.volume}:${e.mode}`}function As(e){const t=ge.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:De.CustomSounds.getNotificationConfig("weather")}function zP(e){if(Qt)return;const t=De.CustomSounds.getById(e.soundId);if(t){qr=t.source,Qt=true,Ts=Yb(e);try{De.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{Qt=false,qr=null,Ts="";}}}function Ja(){if(Qt){try{const e=De.getCustomHandle();(!qr||e&&e.url===qr)&&De.CustomSounds.stop();}catch{}Qt=false,qr=null,Ts="";}}function yi(e,t){const n=t??As(e);if(n.mode!=="loop"){Qt&&Ja();return}if(!sl().includes(e)){Qt&&Ja();return}const i=Yb(n);Qt&&i!==Ts&&Ja(),Qt||zP(n);}function Jb(e){const{weatherId:t}=e.detail||{};if(!t)return;const r=Di().get().id,i=As(t);if(r===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),i.mode==="one-shot"&&ex(i),yi(r,i);const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function Qb(){const t=Di().get().id;yi(t);}function Zb(e){if(e.detail?.entityType!=="weather")return;const o=Di().get().id;yi(o);}function GP(){if(Vr){console.log("[WeatherNotifier] Already tracking");return}const e=Di(),t=e.get();Ya=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",Ya),window.addEventListener("gemini:weather-tracked-check",Jb),window.addEventListener("gemini:tracked-weathers-changed",Qb),window.addEventListener(Cn.CUSTOM_SOUND_CHANGE,Zb);const n=As(t.id);yi(t.id,n),Vr=e.subscribeStable(o=>{const r=o.current.id,i=o.previous.id,a=As(r);if(console.log("[WeatherNotifier] Weather changed:",{previous:i,current:r}),yi(r,a),r!==i&&sl().includes(r)){console.log("[WeatherNotifier] Tracked weather detected:",r),a.mode==="one-shot"&&ex(a);const l=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:r}});window.dispatchEvent(l);}Ya=r;}),console.log("[WeatherNotifier] Tracking initialized");}function HP(){window.removeEventListener("gemini:weather-tracked-check",Jb),window.removeEventListener("gemini:tracked-weathers-changed",Qb),window.removeEventListener(Cn.CUSTOM_SOUND_CHANGE,Zb),Vr&&(Vr(),Vr=null,Ya="Sunny",Ja(),console.log("[WeatherNotifier] Tracking stopped"));}function ex(e){try{De.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let vi=false;function tx(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),ox(),nx());}function nx(){if(vi){console.log("[WeatherNotifier] Already initialized");return}if(vi=true,window.addEventListener("gemini:tracked-weathers-changed",tx),!Kb()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),GP(),console.log("[WeatherNotifier] Initialized");}function ox(){vi&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",tx),HP(),vi=false,console.log("[WeatherNotifier] Destroyed"));}function jP(){return vi}const Ko={init:nx,destroy:ox,isReady:jP,isEnabled:Kb,setEnabled:$P,getTrackedWeathers:sl,addTrackedWeather:DP,removeTrackedWeather:BP,isWeatherTracked:FP},UP={enabled:false,threshold:5};function ll(){return Te(Me.PET_HUNGER_NOTIFIER,UP)}function rx(e){Ee(Me.PET_HUNGER_NOTIFIER,e);}function ix(){return ll().enabled}function WP(e){const t=ll();t.enabled=e,rx(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function ax(){return ll().threshold}function VP(e){const t=ll();t.threshold=e,rx(t);}let Xr=null;const Qa=new Set;let Sn=false,Kr=null;function qP(e){if(Sn)return;const t=De.CustomSounds.getById(e.soundId);if(t){Kr=t.source,Sn=true;try{De.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{Sn=false,Kr=null;}}}function td(){if(Sn){try{const e=De.getCustomHandle();(!Kr||e&&e.url===Kr)&&De.CustomSounds.stop();}catch{}Sn=false,Kr=null;}}function XP(e,t){if(t.mode!=="loop"){Sn&&td();return}e?Sn||qP(t):Sn&&td();}function KP(){if(Xr){console.log("[PetHungerNotifier] Already tracking");return}const e=lo(),t=ax();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),Xr=e.subscribe(n=>{const o=n.byLocation.active,r=De.CustomSounds.getNotificationConfig("pet"),i=r.mode==="loop";let a=false;for(const s of o)if(s.hungerPercent<t){if(a=true,!Qa.has(s.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:s.name||s.petSpecies,species:s.petSpecies,hungerPercent:s.hungerPercent.toFixed(2)+"%"}),i||JP(r);const l=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:s}});window.dispatchEvent(l),Qa.add(s.id);}}else Qa.delete(s.id);XP(a,r);}),console.log("[PetHungerNotifier] Tracking initialized");}function YP(){Xr&&(Xr(),Xr=null,Qa.clear(),td(),console.log("[PetHungerNotifier] Tracking stopped"));}function JP(e){try{De.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let wi=false;function sx(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),cx(),lx());}function lx(){if(wi){console.log("[PetHungerNotifier] Already initialized");return}if(wi=true,window.addEventListener("gemini:pet-hunger-config-changed",sx),!ix()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),KP(),console.log("[PetHungerNotifier] Initialized");}function cx(){wi&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",sx),YP(),wi=false,console.log("[PetHungerNotifier] Destroyed"));}function QP(){return wi}const Si={init:lx,destroy:cx,isReady:QP,isEnabled:ix,setEnabled:WP,getThreshold:ax,setThreshold:VP},ZP={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},dx=Me.ARIES_API;function Fu(){return Te(dx,ZP)}function e2(e){Ee(dx,e);}function t2(e){const n={...Fu(),...e};return e2(n),n}let Es=null,Is=null;function pf(e){Es=e;}function ff(e){Is=e;}function n2(){return Es?[...Es]:[]}function o2(){return Is?[...Is]:[]}function gf(){Es=null,Is=null;}function ux(e,t){const n=Fu(),o=new URL(e,n.apiBaseUrl);if(t)for(const[r,i]of Object.entries(t))i!==void 0&&o.searchParams.set(r,String(i));return o.toString()}function cl(e,t){return new Promise(n=>{const o=ux(e,t);GM_xmlhttpRequest({method:"GET",url:o,headers:{},onload:r=>{if(r.status>=200&&r.status<300)try{const i=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:i});}catch(i){console.error("[AriesAPI] GET parse error:",i,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] GET error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] GET request failed:",r),n({status:0,data:null});}});})}function dl(e,t){return new Promise(n=>{const o=ux(e);GM_xmlhttpRequest({method:"POST",url:o,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:r=>{if(r.status>=200&&r.status<300)try{const i=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:i});}catch(i){console.error("[AriesAPI] POST parse error:",i,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] POST error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] POST request failed:",r),n({status:0,data:null});}});})}async function Du(e=50){const{data:t}=await cl("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(o=>({name:o.name,avatarUrl:o.avatar_url??null})):void 0}))}async function r2(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,i=n.toLowerCase(),a=await Du(r),s=[];for(const l of a){if(!l.userSlots||l.userSlots.length===0)continue;const c=l.userSlots.filter(d=>d.name?d.name.toLowerCase().includes(i):false);c.length>0&&s.push({room:l,matchedSlots:c});}return s}async function i2(e){if(!e)return null;const{status:t,data:n}=await cl("get-player-view",{playerId:e});return t===404?null:n}async function ul(e,t){const n=Array.from(new Set((e??[]).map(a=>String(a).trim()).filter(a=>a.length>=3)));if(n.length===0)return [];const o={playerIds:n};t?.sections&&(o.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:r,data:i}=await dl("get-players-view",o);return r!==200||!Array.isArray(i)?[]:i}async function a2(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,i=n.toLowerCase(),a=await Du(r),s=new Map;for(const l of a)if(!(!l.userSlots||l.userSlots.length===0))for(const c of l.userSlots){if(!c.name||!c.name.toLowerCase().includes(i))continue;const u=`${l.id}::${c.name}`;s.has(u)||s.set(u,{playerName:c.name,avatarUrl:c.avatarUrl,roomId:l.id,roomPlayersCount:l.playersCount});}return Array.from(s.values())}async function px(e){if(!e)return [];const{status:t,data:n}=await cl("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function s2(e){const t=await px(e);if(t.length===0)return pf([]),[];const n=await ul(t,{sections:["profile","room"]});return pf(n),[...n]}async function Bu(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await cl("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function l2(e){const{incoming:t}=await Bu(e),n=t.map(r=>r.fromPlayerId);if(n.length===0)return ff([]),[];const o=await ul(n,{sections:["profile"]});return ff(o),[...o]}async function c2(e){const{outgoing:t}=await Bu(e),n=t.map(o=>o.toPlayerId);return n.length===0?[]:ul(n,{sections:["profile"]})}async function d2(e,t){if(!e||!t||e===t)return  false;const{status:n}=await dl("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function u2(e){const{playerId:t,otherPlayerId:n,action:o}=e;if(!t||!n||t===n)return  false;const{status:r}=await dl("friend-respond",{playerId:t,otherPlayerId:n,action:o});return r===204}async function p2(e,t){if(!e||!t||e===t)return  false;const{status:n}=await dl("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let gr=false;const Ps={init(){gr||(gr=true,console.log("[AriesAPI] Initialized"));},destroy(){gr&&(gr=false,gf(),console.log("[AriesAPI] Destroyed"));},isReady(){return gr},getConfig(){return Fu()},updateConfig(e){return t2(e)},fetchRooms:Du,searchRoomsByPlayerName:r2,fetchPlayerView:i2,fetchPlayersView:ul,searchPlayersByName:a2,fetchFriendsIds:px,fetchFriendsWithViews:s2,fetchFriendRequests:Bu,fetchIncomingRequestsWithViews:l2,fetchOutgoingRequestsWithViews:c2,sendFriendRequest:d2,respondFriendRequest:u2,removeFriend:p2,getCachedFriends:n2,getCachedIncomingRequests:o2,clearCache:gf},mf={enabled:true,manualLocks:[],overallRules:[],speciesRules:{}};function nd(){return `rule-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function f2(e){const t={enabled:e.enabled,manualLocks:e.manualLocks||[],overallRules:[],speciesRules:{}},n=e.globalCriteria?.lockByScale?.enabled,o=(e.globalCriteria?.lockedMutations?.length??0)>0;if(n||o){const r={id:nd(),name:"Migrated Global Rule",enabled:true,mode:"lock",sizeCondition:n?{enabled:true,minPercentage:e.globalCriteria.lockByScale.minPercentage}:void 0,mutationCondition:o?{enabled:true,mutations:e.globalCriteria.lockedMutations,matchMode:"any"}:void 0};t.overallRules.push(r);}if(e.speciesOverrides)for(const[r,i]of Object.entries(e.speciesOverrides)){const a=i.lockByScale?.enabled,s=(i.lockedMutations?.length??0)>0;if(a||s){const l={id:nd(),name:`Migrated ${r} Rule`,enabled:true,mode:"lock",sizeCondition:a?{enabled:true,minPercentage:i.lockByScale.minPercentage}:void 0,mutationCondition:s?{enabled:true,mutations:i.lockedMutations,matchMode:"any"}:void 0};t.speciesRules[r]=[l];}}return console.log("[HarvestLocker] Migrated legacy config to new format"),t}function g2(e){const t=e;return t!==null&&typeof t=="object"&&"globalCriteria"in t&&!("overallRules"in t)}function Be(){const e=Te(vt.FEATURE.HARVEST_LOCKER,mf);if(g2(e)){const t=f2(e);return Lt(t),t}return {...mf,...e,manualLocks:e.manualLocks||[],overallRules:e.overallRules||[],speciesRules:e.speciesRules||{}}}function Lt(e){Ee(vt.FEATURE.HARVEST_LOCKER,e);}function fx(e,t,n,o){return {id:nd(),name:e,enabled:true,mode:t,sizeCondition:n,mutationCondition:o}}function m2(e){const t=Be();t.overallRules.push(e),Lt(t);}function h2(e,t){const n=Be();n.speciesRules[e]||(n.speciesRules[e]=[]),n.speciesRules[e].push(t),Lt(n);}function gx(e,t){const n=Be(),o=n.overallRules.findIndex(r=>r.id===e);if(o!==-1){n.overallRules[o]={...n.overallRules[o],...t},Lt(n);return}for(const r of Object.keys(n.speciesRules)){const i=n.speciesRules[r].findIndex(a=>a.id===e);if(i!==-1){n.speciesRules[r][i]={...n.speciesRules[r][i],...t},Lt(n);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function b2(e){const t=Be(),n=t.overallRules.findIndex(o=>o.id===e);if(n!==-1){t.overallRules.splice(n,1),Lt(t);return}for(const o of Object.keys(t.speciesRules)){const r=t.speciesRules[o].findIndex(i=>i.id===e);if(r!==-1){t.speciesRules[o].splice(r,1),t.speciesRules[o].length===0&&delete t.speciesRules[o],Lt(t);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}const Zn=new Set;let Zt=null;const Ms=[];function x2(e){if(Ms.length>0){console.warn("[HarvestLocker] Already started");return}Zt=e;const t=Zo().subscribeStable(n=>{if(!n){Zn.clear();return}hx(n);});Ms.push(t);}function y2(){Ms.forEach(e=>e()),Ms.length=0,Zn.clear(),Zt=null,console.log("[HarvestLocker] Stopped");}function An(e){Zt=e;const t=Zo().get();t&&hx(t);}function mx(e,t){const n=`${e}-${t}`;return Zn.has(n)}function v2(){return Array.from(Zn)}function hx(e){if(Zt){if(Zn.clear(),Zt.manualLocks.forEach(t=>Zn.add(t)),!_2(e)){console.warn("[HarvestLocker] Invalid garden structure");return}e.plants.all.forEach(t=>{t.slots.forEach((n,o)=>{const r=`${t.tileIndex}-${o}`,i=w2(n.species);S2(n,i)&&Zn.add(r);});});}}function w2(e){return Zt?Zt.speciesRules[e]?Zt.speciesRules[e].filter(t=>t.enabled):Zt.overallRules.filter(t=>t.enabled):[]}function S2(e,t){const n=t.filter(r=>r.mode==="lock"),o=t.filter(r=>r.mode==="allow");for(const r of n)if(hf(e,r))return  true;return o.length>0&&!o.some(i=>hf(e,i))}function hf(e,t){const n=[];if(t.sizeCondition?.enabled){const o=k2(e);n.push(o>=t.sizeCondition.minPercentage);}if(t.mutationCondition?.enabled&&t.mutationCondition.mutations.length>0){const o=C2(e.mutations,t.mutationCondition.mutations,t.mutationCondition.matchMode);n.push(o);}return n.length>0&&n.every(o=>o)}function C2(e,t,n){return n==="any"?t.some(o=>e.includes(o)):t.every(o=>e.includes(o))}function k2(e){const n=J.get("plants")?.[e.species];if(!n||typeof n!="object"||!("crop"in n))return 0;const o=n.crop;if(typeof o!="object"||!o)return 0;const{baseTileScale:r,maxScale:i}=o,a=i-r;return a===0?100:(e.targetScale-r)/a*100}function _2(e){return typeof e=="object"&&e!==null&&"plants"in e&&typeof e.plants=="object"&&e.plants!==null&&"all"in e.plants&&Array.isArray(e.plants.all)}const bx=[];function T2(){return bx.slice()}function A2(e){bx.push(e);}function xx(e){try{return JSON.parse(e)}catch{return}}function bf(e){if(typeof e=="string"){const t=xx(e);return t!==void 0?t:e}return e}function yx(e){if(e!=null){if(typeof e=="string"){const t=xx(e);return t!==void 0?yx(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function E2(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ue(e,t,n){const o=typeof t=="boolean"?t:true,r=typeof t=="function"?t:n,i=(a,s)=>{if(yx(a)!==e)return;const c=r(a,s);return c&&typeof c=="object"&&"kind"in c?c:typeof c=="boolean"?c?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return A2(i),i}const mr=new WeakSet,xf=new WeakMap;function I2(e){const t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:T2();if(!o.length)return ()=>{};const r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const h of o){const y=h(g,r(f));if(y){if(y.kind==="drop")return {kind:"drop"};y.kind==="replace"&&(g=y.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,l=null;const c=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(mr.has(f))return  true;const g=f.bind(p);function h(...y){const x=y.length===1?y[0]:y,w=bf(x),v=i(w,E2(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",w);return}if(v?.kind==="replace"){const k=v.message;return y.length>1&&Array.isArray(k)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",k),g(...k)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",k),g(k))}return g(...y)}mr.add(h),xf.set(h,f);try{p.sendMessage=h,mr.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===h&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||mr.has(f))return;function g(h){const y=bf(h),x=i(y,this);if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",y);return}if(x?.kind==="replace"){const w=x.message,v=typeof w=="string"||w instanceof ArrayBuffer||w instanceof Blob?w:JSON.stringify(w);return n&&console.log("[WS] replace outgoing (ws.send)",y,"=>",w),f.call(this,v)}return f.call(this,h)}mr.add(g),xf.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!c()&&u>0){const p=Date.now();l=setInterval(()=>{if(c()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(l){try{clearInterval(l);}catch{}l=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ue(K.HarvestCrop,(e,t)=>{if(!Be().enabled)return  true;const o=e,r=o.slot!==void 0?String(o.slot):void 0,i=o.slotsIndex;return r!==void 0&&typeof i=="number"&&mx(r,i)?(console.log(`[HarvestLocker] Blocked harvest for slot ${r}-${i}`),false):true});let Yo=false;function vx(){if(Yo){console.warn("[HarvestLocker] Already initialized");return}const e=Be();if(!e.enabled){console.log("[HarvestLocker] Disabled");return}Yo=true,x2(e),console.log("[HarvestLocker] Initialized");}function wx(){Yo&&(y2(),Yo=false,console.log("[HarvestLocker] Destroyed"));}function P2(){return Be().enabled}function M2(e){const t=Be();t.enabled=e,Lt(t),e&&!Yo?vx():!e&&Yo&&wx();}function L2(e,t){return mx(e,t)}function R2(){return v2()}function N2(e,t){const n=Be(),o=`${e}-${t}`;n.manualLocks.includes(o)||(n.manualLocks.push(o),Lt(n),An(n));}function O2(e,t){const n=Be(),o=`${e}-${t}`;n.manualLocks=n.manualLocks.filter(r=>r!==o),Lt(n),An(n);}function $2(){const e=Be();e.manualLocks=[],Lt(e),An(e);}function F2(){return Be()}function D2(){return Be().overallRules}function B2(e){return Be().speciesRules[e]||[]}function z2(){const e=Be();return Object.keys(e.speciesRules)}function G2(e,t,n,o){const r=fx(e,t,n,o);return m2(r),An(Be()),r}function H2(e,t,n,o,r){const i=fx(t,n,o,r);return h2(e,i),An(Be()),i}function j2(e,t){gx(e,t),An(Be());}function U2(e){b2(e),An(Be());}function W2(e,t){gx(e,{enabled:t}),An(Be());}const Yt={init:vx,destroy:wx,isEnabled:P2,setEnabled:M2,isLocked:L2,getAllLockedSlots:R2,lockSlot:N2,unlockSlot:O2,clearManualLocks:$2,getOverallRules:D2,getSpeciesRules:B2,getAllSpeciesWithRules:z2,addNewOverallRule:G2,addNewSpeciesRule:H2,modifyRule:j2,removeRule:U2,toggleRule:W2,getConfig:F2};class Sx{constructor(){U(this,"stats");U(this,"STORAGE_KEY",Me.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Te(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Ee(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats();}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats();}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(const r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Fo=null;function V2(){return Fo||(Fo=new Sx),Fo}function q2(){Fo&&(Fo.endSession(),Fo=null);}function Cx(e){const t=Ys(e.xp),n=Mi(e.petSpecies,e.targetScale),o=Li(e.petSpecies,e.xp,n),r=Js(e.petSpecies,t),i=fh(e.petSpecies),a=s_(o,n,i),s=gh(o,n);return {current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:i,hoursToMax:a}}function kx(e){return {...e,strength:Cx(e)}}function _x(e){return e.map(kx)}function X2(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=_x(e),n=t.reduce((l,c)=>l+c.strength.current,0),o=t.reduce((l,c)=>l+c.strength.max,0),r=t.filter(l=>l.strength.isMature).length,i=t.length-r,a=t.reduce((l,c)=>c.strength.max>(l?.strength.max||0)?c:l,t[0]),s=t.reduce((l,c)=>c.strength.max<(l?.strength.max||1/0)?c:l,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:i,strongestPet:a,weakestPet:s}}const K2=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Cx,enrichPetWithStrength:kx,enrichPetsWithStrength:_x,getPetStrengthStats:X2},Symbol.toStringTag,{value:"Module"}));class Tx{constructor(){U(this,"logs",[]);U(this,"maxLogs",1e3);U(this,"unsubscribe",null);U(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=be.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));const{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,o=this.logs.filter(i=>i.timestamp>=n),r=new Map;for(const i of o){r.has(i.abilityId)||r.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=r.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of r.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const o=Date.now()-n,r=this.logs.filter(a=>a.petId===t&&a.timestamp>=o),i=new Map;for(const a of r){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:r.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,i)=>i.count-r.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Xn=null;function Y2(){return Xn||(Xn=new Tx,Xn.init()),Xn}function J2(){Xn&&(Xn.destroy(),Xn=null);}const Q2={StatsTracker:Sx,getStatsTracker:V2,destroyStatsTracker:q2},Z2={AbilityLogger:Tx,getAbilityLogger:Y2,destroyAbilityLogger:J2,...K2},At=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],eM={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function mo(e){return e?eM[e]??0:0}class tM extends Vt{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});U(this,"allPlants",[]);U(this,"allPets",[]);U(this,"sectionElement",null);}async build(n){await NT();const o=n.getRootNode();$e(o,Sh,"auto-favorite-settings-styles");const r=this.createGrid("12px");r.id="auto-favorite-settings",this.sectionElement=r,n.appendChild(r),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await J.waitForAny(3e3).catch(()=>{}),await Promise.all([J.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),J.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=J.get("plants")||{},o=J.get("pets")||{};this.allPlants=Object.keys(n).sort((r,i)=>{const a=n[r]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,l=mo(a)-mo(s);return l!==0?l:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(o).sort((r,i)=>{const a=o[r]?.rarity||null,s=o[i]?.rarity||null,l=mo(a)-mo(s);return l!==0?l:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(Q.isReady())return;const n=1e4,o=100;let r=0;return new Promise(i=>{const a=()=>{Q.isReady()||r>=n?i():(r+=o,setTimeout(a,o));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=m("div",{className:"kv"}),o=md({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),r=_n({checked:_t().get().enabled,onChange:async i=>{const a=_t(),s=a.get();await a.set({...s,enabled:i}),await this.saveConfig();}});return n.append(o.root,r.root),Ne({title:"Auto-Favorite",padding:"lg"},n,m("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=m("div",{className:"u-col"}),o=m("div",{className:"mut-row"});o.appendChild(this.createMutationButton(At[0])),o.appendChild(this.createMutationButton(At[1])),n.appendChild(o);const r=m("div",{className:"mut-row"});r.appendChild(this.createMutationButton(At[2])),r.appendChild(this.createMutationButton(At[3])),r.appendChild(this.createMutationButton(At[4])),n.appendChild(r);const i=m("div",{className:"mut-row"});i.appendChild(this.createMutationButton(At[5])),i.appendChild(this.createMutationButton(At[6])),n.appendChild(i);const a=m("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(At[7])),a.appendChild(this.createMutationButton(At[8])),n.appendChild(a),Ne({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${_t().get().favoriteMutations.length} / ${At.length} active`))}createMutationButton(n){let o=_t().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];o&&i.push("active");const a=m("div",{className:i.join(" ")}),s=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Q.isReady()){const d=Q.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});d.style.width="28px",d.style.height="28px",d.style.objectFit="contain",s.appendChild(d);}}catch{}const l=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),c=m("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},l);if(a.append(s,c),n.id==="Rainbow"||n.id==="Gold"){const d=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Q.isReady()){const u=Q.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",d.appendChild(u);}}catch{}a.append(d);}else {const d=m("div",{style:"width: 28px; flex-shrink: 0;"});a.append(d);}return a.addEventListener("click",async d=>{d.stopPropagation();const u=_t(),p=u.get();if(o){const g=p.favoriteMutations.filter(h=>h!==n.id);await u.set({...p,favoriteMutations:g}),o=false,a.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),o=true,a.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${_t().get().favoriteMutations.length} / ${At.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:_t().get().favoriteProduceList,onUpdate:async n=>{const o=_t(),r=o.get();await o.set({...r,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:_t().get().favoritePetsList,onUpdate:async n=>{const o=_t(),r=o.get();await o.set({...r,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:o,items:r,category:i,selected:a,onUpdate:s}=n;let l=new Set(a),c=r;const d=m("div",{style:"margin-bottom: 8px;"}),u=Rs({placeholder:`Search ${o.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:b=>{const S=b.trim().toLowerCase();S?c=r.filter(_=>_.toLowerCase().includes(S)):c=r,v.setData(h());}});d.appendChild(u.root);const p=m("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Oe({label:"Select All",variant:"default",size:"sm",onClick:()=>{const b=h().map(S=>S.id);v.setSelection(b);}}),g=Oe({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{v.clearSelection();}});p.append(f,g);const h=()=>c.map(b=>({id:b,name:b,rarity:this.getItemRarity(b,i),selected:l.has(b)})),y=b=>{if(!b){const _=m("span",{style:"opacity:0.5;"});return _.textContent="—",_}return er({variant:"rarity",rarity:b,size:"sm"}).root},x=b=>{const S=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(Q.isReady()){let _=i,C=b;i==="plant"&&(["Bamboo","Cactus"].includes(b)&&(_="tallplant"),b==="DawnCelestial"&&(C="DawnCelestialCrop"),b==="MoonCelestial"&&(C="MoonCelestialCrop"),b==="OrangeTulip"&&(C="Tulip"));const I=Q.toCanvas(_,C,{scale:.5});I.style.width="28px",I.style.height="28px",I.style.objectFit="contain",S.appendChild(I);}}catch{}return S},v=Ti({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(b,S)=>b.name.localeCompare(S.name,void 0,{numeric:true,sensitivity:"base"}),render:b=>{const S=m("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),_=x(b.id),C=m("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},b.name);return S.append(_,C),S}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(b,S)=>mo(b.rarity)-mo(S.rarity),render:b=>y(b.rarity)}],data:h(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(l),getRowId:b=>b.id,onSelectionChange:b=>{l.clear(),b.forEach(S=>l.add(S)),s(Array.from(l)),T();}}),k=m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),T=()=>{k.textContent=`${l.size} / ${r.length} selected`;};return T(),Ne({title:`${o} (${l.size}/${r.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},d,p,v.root,k)}getItemRarity(n,o){try{if(o==="pet")return (J.get("pets")||{})[n]?.rarity||null;if(o==="plant"){const r=J.get("plants")||{},i=r[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(r))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=_t().get();try{const{updateSimpleConfig:o}=Ah;await o({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(o){console.error("[AutoFavoriteSettings] Failed to update feature config:",o);}}}function nM(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function oM(e,t){const n=e;let o=e;const r=_i({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==o&&(o=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==o&&(o=a,t?.(a));}});return r.root.className="team-list-item__name-input",r.input.addEventListener("blur",()=>{const i=r.getValue().trim()||n;i!==o&&(o=i,t?.(i));}),r.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),r.input.blur());}),r.root}function Ax(e){const t=m("div",{className:"team-list-item"}),n=e.customIndicator??m("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),o=e.isNameEditable?oM(e.team.name,e.onNameChange):m("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),r=m("div",{className:"team-list-item__sprites"});function i(){const l=be.myPets.get();r.innerHTML="";for(let c=0;c<3;c++){const d=e.team.petIds[c],u=d&&d!=="",p=m("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(c);})),u){let f=l.all.find(g=>g.id===d);if(!f){const g=window.__petDataCache;g&&g.has(d)&&(f=g.get(d));}if(f)try{const g=Q.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),h=document.createElement("canvas");h.width=g.width,h.height=g.height;const y=h.getContext("2d");if(y&&y.drawImage(g,0,0),h.style.width="100%",h.style.height="100%",h.style.objectFit="contain",p.appendChild(h),e.showSlotStyles){const x=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(x),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const h=m("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(h);}else {const g=m("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${d} not found in myPets yet, waiting for update`);let h=false;const y=be.myPets.subscribe(()=>{if(h)return;const w=be.myPets.get().all.find(v=>v.id===d);if(w){h=true,y();try{p.innerHTML="";const v=Q.toCanvas("pet",w.petSpecies,{mutations:w.mutations,scale:1}),k=document.createElement("canvas");k.width=v.width,k.height=v.height;const T=k.getContext("2d");if(T&&T.drawImage(v,0,0),k.style.width="100%",k.style.height="100%",k.style.objectFit="contain",p.appendChild(k),e.showSlotStyles){const b=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(b),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${d} sprite updated`);}catch(v){console.warn(`[TeamListItem] Failed to render sprite for pet ${w.petSpecies}:`,v),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=nM();p.appendChild(f);}r.appendChild(p);}}i();const a=be.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const l=m("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(l);}if(t.appendChild(n),t.appendChild(o),t.appendChild(r),e.onExpandClick){const l=m("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});l.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',l.addEventListener("click",c=>{c.stopPropagation(),e.onExpandClick?.();}),t.appendChild(l);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),a());});return s.observe(document.body,{childList:true,subtree:true}),t}function rM(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ci(e){const{segments:t,selected:n=t[0]?.id??"",size:o="md",fullWidth:r=false,disabled:i=false,onChange:a}=e,s=m("div",{className:"sg-root"});o!=="md"&&s.classList.add(`sg--${o}`),r&&(s.style.width="100%");const l=m("div",{className:"sg-container",role:"tablist"}),c=m("div",{className:"sg-indicator"}),d=t.map(b=>{const S=m("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:b.label});if(S.id=b.id,b.icon){const C=m("span",{className:"sg-icon"}),I=rM(b.icon);I&&C.appendChild(I),S.appendChild(C);}const _=m("span",{className:"sg-label"},b.label);return S.appendChild(_),S.disabled=!!b.disabled,S});l.appendChild(c),d.forEach(b=>l.appendChild(b)),s.appendChild(l);let u=n,p=i;function f(){const b=d.find(S=>S.id===u);b&&requestAnimationFrame(()=>{const S=c,_=b.offsetLeft,C=b.offsetWidth;S.style.width=`${C}px`,S.style.transform=`translateX(${_}px)`;});}function g(){d.forEach(b=>{const S=b.id===u;b.classList.toggle("active",S),b.setAttribute("aria-selected",String(S)),b.disabled=p||!!t.find(_=>_.id===b.id)?.disabled;}),f();}function h(b){const S=b.currentTarget;if(S.disabled)return;x(S.id);}function y(b){if(p)return;const S=d.findIndex(C=>C.id===u);let _=S;if(b.key==="ArrowLeft"||b.key==="ArrowUp"?(b.preventDefault(),_=(S-1+d.length)%d.length):b.key==="ArrowRight"||b.key==="ArrowDown"?(b.preventDefault(),_=(S+1)%d.length):b.key==="Home"?(b.preventDefault(),_=0):b.key==="End"&&(b.preventDefault(),_=d.length-1),_!==S){const C=d[_];C&&!C.disabled&&(x(C.id),C.focus());}}d.forEach(b=>{b.addEventListener("click",h),b.addEventListener("keydown",y);});function x(b){!t.some(_=>_.id===b)||u===b||(u=b,g(),a?.(u));}function w(){return u}function v(b){p=!!b,g();}function k(){d.forEach(b=>{b.removeEventListener("click",h),b.removeEventListener("keydown",y);});}g(),queueMicrotask(()=>{const b=d.find(S=>S.id===u);if(b){const S=c;S.style.transition="none",S.style.width=`${b.offsetWidth}px`,S.style.transform=`translateX(${b.offsetLeft}px)`,requestAnimationFrame(()=>{S.style.removeProperty("transition");});}});const T=s;return T.select=x,T.getSelected=w,T.setDisabled=v,T.destroy=k,T}function Za(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,l=m("div",{className:"lg-checkbox-wrap"}),c=m("input",{className:`lg-checkbox lg-checkbox--${r}`,id:t,type:"checkbox",checked:!!n,disabled:!!o});let d=null;i&&a!=="none"&&(d=m("label",{className:"lg-checkbox-label",htmlFor:t},i)),d&&a==="left"?l.append(d,c):d&&a==="right"?l.append(c,d):l.append(c);let u=!!n,p=!!o;function f(){c.checked=u,c.disabled=p;}function g(S=false){p||(u=!u,f(),S||s?.(u));}function h(){p||g();}function y(S){p||(S.key===" "||S.key==="Enter")&&(S.preventDefault(),g());}c.addEventListener("click",h),c.addEventListener("keydown",y);function x(){return u}function w(S,_=false){u=!!S,f(),_||s?.(u);}function v(S){p=!!S,f();}function k(S){if(!S){d&&(d.remove(),d=null);return}d?d.textContent=S:(d=m("label",{className:"lg-checkbox-label",htmlFor:t},S),l.append(d));}function T(){c.focus();}function b(){c.removeEventListener("click",h),c.removeEventListener("keydown",y);}return f(),{root:l,input:c,isChecked:x,setChecked:w,setDisabled:v,setLabel:k,focus:T,destroy:b}}let hr=0,yf="",vf="";function iM(){return hr===0&&(yf=document.body.style.overflow,vf=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),hr++,()=>{hr=Math.max(0,hr-1),hr===0&&(document.body.style.overflow=yf,document.body.style.touchAction=vf);}}class aM{constructor(t){U(this,"dragState",null);U(this,"longPressState",null);U(this,"options");U(this,"onPointerMove");U(this,"onPointerUp");U(this,"onPointerCancel");U(this,"onLongPressPointerMove");U(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,o){if(this.cleanupLongPress(),he.getAllTeams().findIndex(c=>c.id===o)===-1)return;const a=t.clientX,s=t.clientY,l=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,o);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:s,timeout:l,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,o){const r=this.options.getListContainer();if(this.dragState||!r)return;t.preventDefault();const a=he.getAllTeams().findIndex(p=>p.id===o);if(a===-1)return;const s=n.getBoundingClientRect(),l=r.getBoundingClientRect(),c=n.cloneNode(true);c.classList.add("team-list-item--placeholder"),c.classList.remove("team-list-item--dragging");const d=n.style.touchAction;n.style.touchAction="none";const u=iM();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:c,offsetY:t.clientY-s.top,fromIndex:a,teamId:o,captureTarget:n,touchActionPrev:d,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-l.left}px`,n.style.top=`${s.top-l.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",r.style.position||(r.style.position="relative"),r.insertBefore(c,n.nextSibling),r.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),o=Math.abs(t.clientY-this.longPressState.startY),r=10;(n>r||o>r)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const o=n.getBoundingClientRect();let r=t.clientY-o.top-this.dragState.offsetY;const i=o.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(r=Math.max(-8,Math.min(i+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:o,itemEl:r}=this.dragState,i=Array.from(n.children).filter(l=>l!==r&&l!==o&&l instanceof HTMLElement&&l.classList.contains("team-list-item")),a=new Map;i.forEach(l=>{a.set(l,l.getBoundingClientRect().top);});let s=false;for(const l of i){const c=l.getBoundingClientRect(),d=c.top+c.height/2;if(t<d){o.nextSibling!==l&&n.insertBefore(o,l),s=true;break}}s||n.appendChild(o),i.forEach(l=>{const c=a.get(l),d=l.getBoundingClientRect().top;if(c!==void 0&&c!==d){const u=c-d;l.style.transform=`translateY(${u}px)`,l.style.transition="none",l.offsetHeight,l.style.transition="transform 0.14s ease",l.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:o=false}=t,{itemEl:r,placeholder:i,fromIndex:a,touchActionPrev:s,releaseScrollLock:l,pointerId:c}=this.dragState;if(n.classList.remove("is-reordering"),r.hasPointerCapture(c))try{r.releasePointerCapture(c);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),o){const p=Array.from(n.children).filter(f=>f!==r&&f!==i&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[a]||null;p?n.insertBefore(i,p):n.appendChild(i);}else {const u=Array.from(n.children).filter(f=>f!==r),p=u.indexOf(i);if(p!==-1){const f=u[p];f!==i&&n.insertBefore(i,f);}}if(i.replaceWith(r),i.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),l?.(),!o){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==a){const g=he.getAllTeams().slice(),[h]=g.splice(a,1);g.splice(p,0,h);const y=g.map(x=>x.id);he.reorderTeams(y),this.options.onReorder(y);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class sM{constructor(t={}){U(this,"card",null);U(this,"modeControl",null);U(this,"modeContainer",null);U(this,"teamContent",null);U(this,"listContainer",null);U(this,"teamMode","overview");U(this,"selectedTeamIds",new Set);U(this,"teamCheckboxes",new Map);U(this,"options");U(this,"dragHandler");this.options=t,this.dragHandler=new aM({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!he.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=m("div",{className:"team-card-wrapper"});this.modeContainer=m("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=m("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Ne({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=Ci({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=m("div",{className:"team-card__disabled-state"}),n=m("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),o=Oe({label:"Enable Feature",onClick:()=>{he.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(o),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(o=>o.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=he.getAllTeams(),n=he.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=m("div",{className:"team-card__list-container"}),t.forEach(o=>{const r=n===o.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(o.id));const a=Ax({team:o,isActive:r,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(o.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(o.id,s);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await he.activateTeam(o),this.options.onTeamsUpdated?.();}catch(c){console.error("[TeamCard] Failed to activate team:",c);}}}),a.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,a,o.id):this.dragHandler.startLongPress(s,a,o.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=m("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=m("div",{className:"team-card__actions"}),o=Oe({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(o),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=m("div",{className:"team-card__actions"}),n=Oe({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),o=Oe({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),r=Oe({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});r.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(o),t.appendChild(r),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,o=1;const r=he.getAllTeams(),i=new Set(r.map(a=>a.name));for(;i.has(n);)n=`${t} (${o})`,o++;try{he.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)he.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=he.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){he.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const o=he.getTeam(t);if(!o)return;const r=o.petIds[n];!r||r===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const o=he.getTeam(t);if(!o)return;const r=[...o.petIds];r[n]="",he.updateTeam(t,{petIds:r}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const o=he.getTeam(t);if(!o)return;const i=be.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),a=new Set(o.petIds.filter(f=>f!=="")),s=i.filter(f=>!a.has(f.id));await ke.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const l=ot.detect();(l.platform==="mobile"||l.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const d=be.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,h=[...o.petIds];h[n]=g.id,he.updateTeam(t,{petIds:h}),this.options.onTeamsUpdated?.(),ke.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),To.close().then(()=>{const y=ot.detect();(y.platform==="mobile"||y.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await To.show("inventory",{items:s,favoritedItemIds:[]}),await To.waitForClose();const u=ot.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),d();}createCheckboxIndicator(t){const n=Za({checked:this.selectedTeamIds.has(t),size:"md",onChange:o=>{o?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class lM{constructor(t,n={}){U(this,"root");U(this,"pet");U(this,"options");U(this,"contentSlot",null);U(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const o=document.createElement("div");o.className="base-pet-card__info";const r=document.createElement("div");if(r.className="base-pet-card__name",r.textContent=this.pet.name||this.pet.petSpecies,o.appendChild(r),!this.options.hideStr){const i=document.createElement("div");i.className="base-pet-card__str",this.renderStr(i),o.appendChild(i);}return t.appendChild(o),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const o=this.root.querySelector(".base-pet-card__str");o&&this.renderStr(o);const r=this.root.querySelector(".base-pet-card__sprite-wrapper");r instanceof HTMLElement&&this.renderSprite(r);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const o=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const r=er({label:o,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(r.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(Q.has("pet",this.pet.petSpecies)){const o=Q.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});o.style.width="64px",o.style.height="64px",o.style.objectFit="contain",t.appendChild(o);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}const ze={XP:{BOOST_PAIR:.85,LEVELING_PAIR:.75,PASSIVE_LEVELING:.5,STR_DISTANCE_THRESHOLD:.15},ECONOMY:{DEDICATED_COIN:.9,META_SELLING:.85,PASSIVE_EFFICIENCY:.65,ENDGAME_HARVEST:.95,SYNERGY_BONUS:.1,EARLY_REGROW:.7},HATCHING:{TIER_3_MAX_STR:.95,RAINBOW_HUNTING:.7,COMBO_BONUS:.05},TIER_BONUS:.05,CONFIDENCE_THRESHOLD:.6},re={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]},pl={ALLOWED_PANELS:{"xp-farming":["xp"],"coin-farming":["coin","xp","hatch"],"crop-farming":["growth","coin","xp","hatch"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],hatching:["hatch","xp"],efficiency:["xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}};function st(e,t){return e.abilities.some(n=>t.includes(n))}function Ye(e,t){return e.filter(n=>st(n,t)).length}function cM(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function br(e,t){const n=e.flatMap(o=>o.abilities.filter(r=>t.includes(r))).map(cM);return n.length===0?0:n.reduce((o,r)=>o+r,0)/n.length}function xa(e){const t=ob(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],o={},r=Ye(t,re.XP_BOOST),i=ze.XP.STR_DISTANCE_THRESHOLD,s=t.filter(E=>E.maxStrength===0?false:(E.maxStrength-E.currentStrength)/E.maxStrength>i).length,l=t.filter(E=>E.currentStrength<E.maxStrength).length;if(r>=1&&s>=2)o["xp-farming"]=ze.XP.BOOST_PAIR,n.push(`1 XP Boost + ${s} high-need pets (>${i*100}% STR distance)`);else if(r>=2){const E=br(t,re.XP_BOOST);o["xp-farming"]=ze.XP.LEVELING_PAIR+E*ze.TIER_BONUS,n.push(`${r} XP Boost pets (avg tier ${E.toFixed(1)})`);}else l>=2&&s>=1?(o["xp-farming"]=ze.XP.LEVELING_PAIR,n.push(`${l} leveling pets with ${s} high-need`)):l>=2&&(o["xp-farming"]=ze.XP.PASSIVE_LEVELING,n.push(`${l} pets below max STR`));const c=Ye(t,re.COIN_FINDER),d=Ye(t,re.SELL_BOOST),u=Ye(t,re.CROP_REFUND_HARVEST),p=Ye(t,re.RARE_GRANTERS),f=Ye(t,re.COMMON_GRANTERS),g=t.some(E=>st(E,re.COIN_FINDER)&&(st(E,re.RARE_GRANTERS)||st(E,re.COMMON_GRANTERS)));c>=1&&!g?(o["coin-farming"]=ze.ECONOMY.DEDICATED_COIN,n.push("Dedicated Coin Finder team (no granters)")):d>=1&&u>=1?(o["coin-farming"]=ze.ECONOMY.META_SELLING,n.push("Meta Selling Team (Sell Boost + Crop Refund/Harvest)")):c>=1&&g?(o["coin-farming"]=ze.ECONOMY.PASSIVE_EFFICIENCY,o.efficiency=Math.max(o.efficiency||0,ze.ECONOMY.PASSIVE_EFFICIENCY),n.push("Coin Finder + Granter (passive efficiency)")):(d>=1||u>=1)&&(o["coin-farming"]=Math.max(o["coin-farming"]||0,.7),n.push("Sell/Refund abilities (coin efficiency)"));const h=Ye(t,re.PLANT_GROWTH),y=Ye(t,re.CROP_MUTATION),x=Ye(t,re.CROP_SIZE),w=t.filter(E=>E.abilities.includes("DoubleHarvest")).length,v=t.filter(E=>E.abilities.includes("ProduceRefund")).length,k=t.some(E=>E.abilities.includes("DoubleHarvest")&&E.abilities.includes("ProduceRefund"));if(w>=3){let E=ze.ECONOMY.ENDGAME_HARVEST;k&&(E+=ze.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,E),n.push("Endgame Harvest Team (3x Double Harvest)"+(k?" + capybara synergy":""));}else if(w>=1&&v>=1){let E=.85;k&&(E+=ze.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,E),n.push("Double Harvest + Crop Refund"+(k?" (same pet - capybara)":""));}else y>=1&&w===0&&(o["crop-farming"]=Math.max(o["crop-farming"]||0,ze.ECONOMY.EARLY_REGROW),n.push("Early Game Regrow Team (Crop Mutation)"));if(p>=1){const E=t.some(A=>A.abilities.includes("RainbowGranter")),P=t.some(A=>A.abilities.includes("GoldGranter"));E?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):P?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(o["crop-farming"]=Math.max(o["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const T=h+y+x+f;if(T>=2&&!o["crop-farming"]){const E=(br(t,re.PLANT_GROWTH)+br(t,re.CROP_MUTATION)+br(t,re.CROP_SIZE))/3;o["crop-farming"]=Math.max(o["crop-farming"]||0,.7+E*.03),n.push(`${T} crop-related abilities`);}const b=Ye(t,re.EGG_GROWTH);if(b>=1&&(o["time-reduction"]=.7,n.push(`${b} Egg Growth Boost pet(s)`)),h>=1&&!o["crop-farming"]&&(o["time-reduction"]=Math.max(o["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),p>=1||y>=1){const E=t.some(A=>A.abilities.includes("RainbowGranter")),P=t.some(A=>A.abilities.includes("GoldGranter"));E||P?(o["mutation-hunting"]=.95,n.push(`${E?"Rainbow":"Gold"} Granter (mutation focus)`)):y>=1&&(o["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const S=Ye(t,re.HUNGER_BOOST),_=Ye(t,re.HUNGER_RESTORE);S>=1&&_>=1?(o.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(S>=1||_>=1)&&(o.efficiency=.6,n.push("Hunger management (reduced feeding)"));const C=c+p+f;C>=2&&(o.efficiency=Math.max(o.efficiency||0,.6),n.push(`${C} passive abilities (passive gains)`));const I=Ye(t,re.MAX_STR_BOOST),O=Ye(t,re.HATCH_XP),z=Ye(t,re.PET_MUTATION),j=Ye(t,re.DOUBLE_HATCH),W=Ye(t,re.PET_REFUND);if(I>=1){const E=br(t,re.MAX_STR_BOOST),P=E>=3?ze.HATCHING.TIER_3_MAX_STR:.85;o.hatching=P+E*ze.TIER_BONUS,n.push(`Max Strength Boost (tier ${E.toFixed(1)}) - late-game meta`);}if(z>=1||j>=1||W>=1){const E=z+j+W,P=ze.HATCHING.RAINBOW_HUNTING+E*ze.HATCHING.COMBO_BONUS;o.hatching=Math.max(o.hatching||0,P),n.push(`${E} rainbow hunting abilities`);}O>=1&&!o.hatching&&(o.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const Y=t.filter(E=>st(E,re.MAX_STR_BOOST)||st(E,re.PET_MUTATION)||st(E,re.DOUBLE_HATCH)||st(E,re.PET_REFUND)).length;Y>=Math.ceil(t.length*.67)&&o.hatching&&(o.hatching=Math.max(o.hatching,.97),o["crop-farming"]&&o["crop-farming"]<.97&&t.filter(P=>(st(P,re.CROP_REFUND_HARVEST)||st(P,re.CROP_SIZE)||st(P,re.CROP_MUTATION))&&!st(P,re.PET_REFUND)&&!st(P,re.DOUBLE_HATCH)&&!st(P,re.PET_MUTATION)&&!st(P,re.MAX_STR_BOOST)).length===0&&(delete o["crop-farming"],n.push("Suppressed crop-farming (hatching majority override)")),n.push(`Hatching Majority (${Y}/${t.length} pets) - clear team purpose`));const N=Object.entries(o).sort(([,E],[,P])=>P-E);if(N.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp","growth","coin","hatch"],reasons:["Mixed or unclear purpose"]};const[D,H]=N[0],G=N.slice(1).map(([E,P])=>({purpose:E,confidence:P}));return H<ze.CONFIDENCE_THRESHOLD?{primary:"balanced",confidence:H,secondary:N.map(([E,P])=>({purpose:E,confidence:P})),suggestedFeatures:["xp","growth","coin","hatch"],reasons:[...n,`Low confidence (${(H*100).toFixed(0)}%) - showing all panels`]}:{primary:D,confidence:H,secondary:G,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","growth","xp"],"crop-farming":["growth","coin","xp"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],efficiency:["xp"],hatching:["hatch","growth","xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}[D]||["xp","growth","coin","hatch"],reasons:n}}async function dM(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,o=t.createOscillator(),r=t.createGain();o.connect(r),r.connect(t.destination),o.type="sine",o.frequency.setValueAtTime(800,n),o.frequency.exponentialRampToValueAtTime(400,n+.03),r.gain.setValueAtTime(.12,n),r.gain.exponentialRampToValueAtTime(.001,n+.05),o.start(n),o.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function uM(e={}){const{id:t,variant:n="default",size:o="md",round:r=false,sprite:i=null,onClick:a,disabled:s=false,playSound:l=true,tooltip:c}=e,d=m("button",{className:"gemini-icon-btn",id:t});d.type="button",n!=="default"&&d.classList.add(`gemini-icon-btn--${n}`),o!=="md"&&d.classList.add(`gemini-icon-btn--${o}`),r&&d.classList.add("gemini-icon-btn--round"),c&&(d.title=c),d.disabled=s;const u=m("span",{className:"gemini-icon-btn__content"});d.appendChild(u),i&&u.appendChild(i);const p=m("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",d.appendChild(p),d.addEventListener("click",async g=>{d.disabled||(l&&dM(),a?.(g));});const f=d;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{d.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&d.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{d.disabled=g;},f}const Ex=`
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
`;class pM{constructor(){U(this,"card",null);U(this,"listContainer",null);U(this,"innerContent",null);U(this,"logs",[]);U(this,"filteredLogs",[]);U(this,"unsubscribe",null);U(this,"ITEM_HEIGHT",88);U(this,"BUFFER_SIZE",3);U(this,"VIEWPORT_HEIGHT",480);U(this,"renderedRange",{start:0,end:0});U(this,"scrollListener",null);U(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=lo(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const o=t.get().abilityLogs;this.updateFromAbilityLogs(o);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=J.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=fm(a),l=new Date(n.performedAt),c=l.toLocaleDateString("en-US",{month:"short",day:"numeric"}),d=l.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),u=`${c} ${d}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:s,formattedDate:u}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return er({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=m("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=m("div",{style:"margin-bottom: 0;"}),o=Rs({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:r=>{const i=r.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(o.root),t.appendChild(n),this.listContainer=m("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=m("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=Ne({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,o)=>o.timestamp-n.timestamp);if(t.length===0){const n=m("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let o=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),r=Math.min(this.filteredLogs.length,o+n+this.BUFFER_SIZE*2);if(o===this.renderedRange.start&&r===this.renderedRange.end)return;this.renderedRange={start:o,end:r},this.innerContent.replaceChildren();const i=o*this.ITEM_HEIGHT;if(i>0){const s=m("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=o;s<r;s++){const l=this.filteredLogs[s],c=this.createLogItemCard(l);this.innerContent.appendChild(c);}const a=Math.max(0,(this.filteredLogs.length-r)*this.ITEM_HEIGHT);if(a>0){const s=m("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}createLogItemCard(t){const n=m("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const o=m("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const d=Q.toCanvas("pet",t.petSpecies);d&&(d.style.width="100%",d.style.height="100%",d.style.objectFit="contain",o.appendChild(d));}catch{o.textContent="🐾",o.style.fontSize="24px";}n.appendChild(o);const r=m("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=m("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=m("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=m("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);i.appendChild(a),i.appendChild(s),r.appendChild(i);const l=this.createAbilityBadge(t.abilityId,t.abilityName);r.appendChild(l);const c=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return r.appendChild(c),n.appendChild(r),n}}const Ix=`
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

`,Px=`
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
`,zu=`
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
`,Mx=`
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
`,fM=`
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
`;class gM extends Vt{constructor(n){super({id:"tab-pets",label:"Pets"});U(this,"unsubscribeMyPets");U(this,"lastActiveTeamId",null);U(this,"teamCardPart",null);U(this,"abilityLogsCardPart",null);U(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await ft(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>Zs);return {MGSprite:a}},void 0);await o.init();const r=n.getRootNode();$e(r,Ix,"team-card-styles"),$e(r,Px,"base-pet-card-styles"),$e(r,zu,"badge-styles"),$e(r,Mx,"arcade-button-styles"),$e(r,Ex,"gemini-icon-button-styles"),$e(r,fM,"ability-logs-card-styles");const i=this.createGrid("12px");i.id="pets",n.appendChild(i),this.initializeTeamCardPart(i),this.initializeAbilityLogsCardPart(i),this.unsubscribeMyPets=be.myPets.subscribeStable(()=>{const a=he.getActiveTeamId();a!==this.lastActiveTeamId&&(this.lastActiveTeamId=a,this.teamCardPart?.render());}),this.lastActiveTeamId=he.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new sM({onTeamReordered:r=>{console.log("[PetsSection] Teams reordered:",r);},setHUDOpen:this.deps?.setHUDOpen}));const o=this.teamCardPart.build();n.appendChild(o),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new pM);const o=this.abilityLogsCardPart.build();n.appendChild(o),this.abilityLogsCardPart.render();}}class mM{constructor(t){U(this,"root");U(this,"options");U(this,"headerElement",null);U(this,"petsContainer",null);U(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
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
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),o=Math.floor(t%24);return `${n}d ${o}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const hM={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=sf(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new mM({teamId:e.id});t.appendChild(n.build());const o=cr(e.id);return o&&n.update(o),{update:(r,i)=>{const a=cr(r.id);a&&n.update(a);},destroy:()=>n.destroy(),refresh:()=>{const r=cr(e.id);r&&n.update(r);}}},renderPetSlot:(e,t,n)=>{const o=be.weather.get(),r=o.isActive?o.type:null,i=cr(t.id),a=i?.teamSummary.bonusXpPerHour||0,s=i?.pets||[],l=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),c=Uc(e,r,a,l),d=c.isMaxStrength,u=!!c.xpBoostStats;let p="";if(d)u&&c.xpBoostStats&&(p=`
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
                `);const g=c.maxStrength,h=c.currentStrength,y=Math.min(100,Math.max(0,Math.floor(h/g*100))),x=e.xp%3600/3600*100,w=Math.min(99,Math.max(1,Math.floor(x))),v=c.currentStrength+1,k=c.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${lf(c.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${c.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${v}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${w}%"></div>
                        <span class="stat__percent">${w}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${lf(c.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${c.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${k}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${y}%"></div>
                        <span class="stat__percent">${y}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},renderGroupedSlot:(e,t,n)=>{const o=be.weather.get(),r=o.isActive?o.type:null,a=cr(t.id)?.teamSummary.bonusXpPerHour||0;let s=0,l=0;for(const d of e){const u=Uc(d,r,a,0);u.xpBoostStats&&(s+=u.xpBoostStats.expectedXpPerHour),u.supportingFeeds&&(l+=u.supportingFeeds);}let c="";if(s>0&&(c=`
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
                `;else {const u=sf(t.id);n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(u)}%</span>
                        </div>
                    </div>
                `;}return}n.innerHTML=`<div class="xp-stats-compact xp-stats-grouped">${c}</div>`;},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.some(i=>i.currentStrength<i.maxStrength)?true:n.some(i=>i.abilities.some(a=>re.XP_BOOST.includes(a)))},shouldDisplay:(e,t,n)=>(pl.ALLOWED_PANELS[n.primary]||[]).includes("xp")?!!(t.some(a=>a.currentStrength<a.maxStrength)||t.some(a=>a.abilities.some(s=>re.XP_BOOST.includes(s)))):false,countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.every(r=>r.currentStrength>=r.maxStrength)?n.some(i=>i.abilities.some(a=>re.XP_BOOST.includes(a)))?1:0:2}};function Ge(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function cn(e){if(e<=0)return "0m";const t=Math.floor(e/1e3),n=Math.floor(t/86400),o=Math.floor(t%86400/3600),r=Math.floor(t%3600/60),i=[];return n>0&&i.push(`${n}d`),o>0&&i.push(`${o}h`),(r>0||i.length===0)&&i.push(`${r}m`),i.join(" ")}function dn(e,t){const n=e==="egg"?"pet":"plant",o=Ge("span","sprite-wrapper");if(!t)return o;let r=t;e==="plant"&&(r==="DawnCelestial"&&(r="DawnCelestialCrop"),r==="MoonCelestial"&&(r="MoonCelestialCrop"));try{if(Q.isReady()&&Q.has(n,r)){const i=Q.toCanvas(n,r,{scale:.3});i.style.height="16px",i.style.width="auto",i.style.imageRendering="pixelated",o.appendChild(i);}}catch{}return o}function ya(e,t){const n=Ge("span","stacked-sprites");if(t.length===0)return n;const o=e==="egg"?"pet":"plant",r=4,a=[...new Set(t.map(l=>e==="egg"?l.eggId:l.species).filter(Boolean))].slice(0,r);if(a.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let l=0;l<a.length;l++){let c=a[l];e==="plant"&&c&&(c==="DawnCelestial"&&(c="DawnCelestialCrop"),c==="MoonCelestial"&&(c="MoonCelestialCrop"));try{if(Q.isReady()&&c&&Q.has(o,c)){const d=Q.toCanvas(o,c,{scale:.2});d.style.height="14px",d.style.width="auto",d.style.imageRendering="pixelated",d.style.position="relative",d.style.zIndex=String(r-l),n.appendChild(d),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function un(e,t,n,o,r,i){const a=Ge("div","stat-row"),s=Ge("span","stat__label",e),l=Ge("span","stat__timer",t),c=Ge("span","stat__str-label");c.appendChild(n);const d=Ge("div","stat__progress-mini"),u=Ge("div",`stat__progress-fill ${r}`);u.style.width=`${o}%`,d.appendChild(u);const p=`${o}%`,f=Ge("span","stat__percent",p);return d.appendChild(f),a.appendChild(s),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&a.appendChild(c),a.appendChild(l),a.appendChild(d),a}function wf(e){const t=Ge("div","stat-row stat-row--boost"),n=Ge("span","stat__label","BOOST");t.appendChild(n);const o=Ge("span","stat__values-row");return e.forEach((r,i)=>{const a=Ge("span","stat__boost-item");a.appendChild(r.sprite),a.appendChild(Ge("span","stat__value stat__value--accent",r.text)),o.appendChild(a),i<e.length-1&&o.appendChild(Ge("span","stat__separator"," "));}),t.appendChild(o),t}function Sf(e,t){const n=t==="egg"?ui:pi;let o=0,r=false;const i=[];for(const a of e.abilities)if(a in n){const s=n[a],l=s.procRate*60;o+=l*s.minutesPerProc,r=true,i.push(a);}return {hasBoost:r,minutesPerProc:0,hourlyReduction:o,abilityName:i.join(", ")}}function Cf(e,t){const n=he.getPetsForTeam(e),o=t==="egg"?Tu(n):Au(n);return `${((60+fi(o).timeReductionPerHour)/60).toFixed(2)}x`}function va(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const i=t-r.plantedAt,s=(r.maturedAt-t)/n,l=i+s,c=l>0?i/l*100:0;return o+Math.min(100,Math.max(0,c))},0)/e.length)}function wa(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const i=t-r.startTime,s=(r.endTime-t)/n,l=i+s,c=l>0?i/l*100:0;return o+Math.min(100,Math.max(0,c))},0)/e.length)}function kf(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,i)=>r.maturedAt-i.maturedAt)[0];return {remainingMs:Math.max(0,o.maturedAt-t),name:o.eggId||null}}function _f(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,i)=>r.endTime-i.endTime)[0];return {remainingMs:Math.max(0,o.endTime-t),name:o.species||null}}function Tf(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.maturedAt));return Math.max(0,n-t)}function Af(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.endTime));return Math.max(0,n-t)}function pn(e,t){return e<=0||t<=0?0:Math.round(e/t)}const bM={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=be.myGarden.get(),o=n.eggs.growing.length+n.plants.growing.length;return o===0?null:{text:`${o} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{const i=be.myGarden.get(),a=Date.now(),s=Sf(e,"egg"),l=Sf(e,"plant");if(n.innerHTML="",!s.hasBoost&&!l.hasBoost)return;const c=r?i.eggs.growing.filter(b=>r.has(b.tileIndex)):i.eggs.growing,d=r?i.crops.growing.filter(b=>r.has(b.tileIndex)):i.crops.growing;let u=o;!u&&s.hasBoost!==l.hasBoost&&(u=s.hasBoost?"egg":"plant");const p=u==="egg"&&s.hasBoost||u==="plant"&&l.hasBoost,f=!u,g=Ge("div","growth-stats-compact");if(!p&&!f){const b=o==="egg"?"Egg":"Plant",S=Ge("div","stat-row stat-row--message");S.appendChild(Ge("span","stat__message",`No ${b} Growth Boost, Click the Button to Switch View`)),g.appendChild(S),n.appendChild(g);return}const h=[],y=s.hasBoost&&(u==="egg"||f),x=l.hasBoost&&(u==="plant"||f);if(y){const b=Math.round(s.hourlyReduction/60*100);h.push({text:`+${b}% Speed`,sprite:dn("egg","UncommonEgg")});}if(x){const b=Math.round(l.hourlyReduction/60*100);h.push({text:`+${b}% Speed`,sprite:dn("plant","Carrot")});}h.length>0&&g.appendChild(wf(h));const w=Cf(t,"egg"),v=parseFloat(w.replace("x","")),k=Cf(t,"plant"),T=parseFloat(k.replace("x",""));if(s.hasBoost&&(u==="egg"||f)){const b=kf(c,a),S=pn(b.remainingMs,v),_=c.length>0?va(c,a,v):100,C=S>0?cn(S):"Ready!";g.appendChild(un("NEXT EGG",C,dn("egg",b.name),_,"stat__progress-fill--egg"));}if(l.hasBoost&&(u==="plant"||f)){const b=_f(d,a),S=pn(b.remainingMs,T),_=d.length>0?wa(d,a,T):100,C=S>0?cn(S):"Ready!";g.appendChild(un("NEXT PLANT",C,dn("plant",b.name),_,"stat__progress-fill--plant"));}if(s.hasBoost&&(u==="egg"||f)){const b=c.length>0?va(c,a,v):100,S=Tf(c,a),_=pn(S,v),C=_>0?cn(_):"All Ready!";g.appendChild(un("ALL EGGS",C,ya("egg",c),b,"stat__progress-fill--egg"));}else if(l.hasBoost&&(u==="plant"||f)){const b=d.length>0?wa(d,a,T):100,S=Af(d,a),_=pn(S,T),C=_>0?cn(_):"All Ready!";g.appendChild(un("ALL PLANTS",C,ya("plant",d),b,"stat__progress-fill--plant"));}n.appendChild(g);},renderGroupedSlot:(e,t,n,o,r)=>{const i=be.myGarden.get(),a=Date.now(),s=Tu(e),l=Au(e),c=fi(s),d=fi(l);n.innerHTML="";const u=c.timeReductionPerHour>0,p=d.timeReductionPerHour>0;if(!u&&!p)return;const f=Ge("div","growth-stats-compact growth-stats-grouped"),g=r?i.eggs.growing.filter(b=>r.has(b.tileIndex)):i.eggs.growing,h=r?i.crops.growing.filter(b=>r.has(b.tileIndex)):i.crops.growing,y=o==="egg"&&u,x=o==="plant"&&p,w=!o,v=(60+c.timeReductionPerHour)/60,k=(60+d.timeReductionPerHour)/60,T=[];if((y||w)&&u){const b=Math.round(c.timeReductionPerHour/60*100);T.push({text:`+${b}% Speed`,sprite:dn("egg","UncommonEgg")});}if((x||w)&&p){const b=Math.round(d.timeReductionPerHour/60*100);T.push({text:`+${b}% Speed`,sprite:dn("plant","Carrot")});}if(T.length>0&&f.appendChild(wf(T)),(y||w)&&u){const b=kf(g,a),S=pn(b.remainingMs,v),_=g.length>0?va(g,a,v):100,C=S>0?cn(S):"Ready!";f.appendChild(un("NEXT EGG",C,dn("egg",b.name),_,"stat__progress-fill--egg"));}if((x||w)&&p){const b=_f(h,a),S=pn(b.remainingMs,k),_=h.length>0?wa(h,a,k):100,C=S>0?cn(S):"Ready!";f.appendChild(un("NEXT PLANT",C,dn("plant",b.name),_,"stat__progress-fill--plant"));}if((y||w)&&u){const b=g.length>0?va(g,a,v):100,S=Tf(g,a),_=pn(S,v),C=_>0?cn(_):"All Ready!";f.appendChild(un("ALL EGGS",C,ya("egg",g),b,"stat__progress-fill--egg"));}else if((x||w)&&p){const b=h.length>0?wa(h,a,k):100,S=Af(h,a),_=pn(S,k),C=_>0?cn(_):"All Ready!";f.appendChild(un("ALL PLANTS",C,ya("plant",h),b,"stat__progress-fill--plant"));}n.appendChild(f);},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return Ro(n)||No(n)},shouldDisplay:(e,t,n)=>{const r=(pl.ALLOWED_PANELS[n.primary]||[]).includes("growth"),i=Ro(t)||No(t);return r&&i},countRows:(e,t,n)=>{const o=Array.isArray(e)?e:[e],r=Ro(o),i=No(o);if(!r&&!i)return 0;if(n==="egg"||n==="plant")return 2;let a=0;return r&&(a+=2),i&&(a+=2),a}},fl=1.5,Ar=["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],Er=["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],Ir=["RainDance","SnowGranter","FrostGranter","GoldGranter","RainbowGranter"],Pr=["DoubleHarvest"],Mr=["ProduceRefund"];function en(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function fn(e){if(e>=1e12)return `${(e/1e12).toFixed(2)}T`;if(e>=1e9)return `${(e/1e9).toFixed(2)}B`;if(e>=1e6)return `${(e/1e6).toFixed(2)}M`;if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)}k`:`${t.toFixed(1)}k`}return String(Math.round(e))}function rr(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,scaleIncreasePercentage:n.baseParameters?.scaleIncreasePercentage??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0,grantedMutations:n.baseParameters?.grantedMutations??[],requiredWeather:n.baseParameters?.requiredWeather??null}:null}function Fe(e,t){return e.abilities.some(n=>t.includes(n))}function ji(e,t,n){if(e.hunger<=0)return  false;const o=rr(t);return !(!o||o.requiredWeather&&n!==o.requiredWeather)}function Ui(e){return (e.currentStrength<0||e.currentStrength>100)&&console.warn(`[Gemini] Invalid strength: ${e.currentStrength} for pet ${e.name||"unknown"}`),(e.maxStrength<80||e.maxStrength>100)&&console.warn(`[Gemini] Unexpected maxStrength: ${e.maxStrength} for pet ${e.name||"unknown"} (expected 80-100)`),e.currentStrength/100}function gl(e,t){return Math.min(100,e*t)}function xM(e,t,n,o,r=fl){const i=Ks(e);if(!i)return 0;const a=Pt(e,t,n)*r,s=Math.min(t*(1+o/100),i.maxScale),l=Pt(e,s,n)*r;return Math.max(0,l-a)}function Lx(e,t,n,o,r=fl){if(n.includes(o))return 0;const i=Pt(e,t,n)*r,a=[...n,o],s=Pt(e,t,a)*r;return Math.max(0,s-i)}function Kl(e,t,n){const o=en("div","stat-row");return o.appendChild(en("span","stat__label",e)),o.appendChild(en("span","stat__value",t)),o.appendChild(en("span","stat__timer",n)),o}function Ef(e,t,n){const o=en("div","stat-row");return o.appendChild(en("span","stat__label",e)),o.appendChild(en("span","stat__value",t)),o.appendChild(en("span","stat__timer",n)),o}function yM(e,t,n){const r=be.myGarden.get().crops.mature,i=n?r.filter(c=>n.has(String(c.tileIndex))):r;if(i.length===0)return {perProc:0,perHour:0};let a=0,s=0;for(const c of e){const d=Ui(c);for(const u of Ar){if(!c.abilities.includes(u)||!ji(c,u,t))continue;const p=rr(u);if(!p)continue;const f=gl(p.baseProbability,d),g=p.scaleIncreasePercentage*d,h=f/100*60;let y=0,x=0;for(const v of i){const k=Math.max(1,Math.floor(v.fruitCount)),T=xM(v.species,v.targetScale,v.mutations,g);y+=T*k,x+=k;}const w=x>0?y/x:0;a+=w*h,s+=h;}}return {perProc:s>0?a/s:0,perHour:a}}function vM(e,t,n){const r=be.myGarden.get().crops.mature,i=be.weather.get(),a=J.get("weather"),s=n?r.filter(y=>n.has(String(y.tileIndex))):r;if(s.length===0||!i.isActive||!a)return {perProc:0,perHour:0};const l=a[i.type];if(!l?.mutator)return {perProc:0,perHour:0};const c=l.mutator.chancePerMinutePerCrop??0,d=l.mutator.mutation??"";let u=0;for(const y of e){const x=Ui(y);for(const w of Er){if(!y.abilities.includes(w)||!ji(y,w,t))continue;const v=rr(w);if(!v)continue;const k=v.mutationChanceIncreasePercentage*x;u+=k;}}const p=c*(u/100),f=s.length*(p/100)*60;let g=0;for(const y of s){const x=Lx(y.species,y.targetScale,y.mutations,d);g+=x;}const h=s.length>0?g/s.length:0;return {perProc:h,perHour:f*h}}function wM(e,t,n){const r=be.myGarden.get().crops.mature,i=n?r.filter(c=>n.has(String(c.tileIndex))):r;if(i.length===0)return {perProc:0,perHour:0};let a=0,s=0;for(const c of e){const d=Ui(c);for(const u of Ir){if(!c.abilities.includes(u)||!ji(c,u,t))continue;const p=rr(u);if(!p)continue;const g=gl(p.baseProbability,d)/100*60,h=p.grantedMutations;if(h.length===0)continue;const y=h[0];let x=0,w=0;for(const T of i){if(y==="Gold"||y==="Rainbow"){const C=T.mutations.includes("Gold"),I=T.mutations.includes("Rainbow");if(C||I)continue}else if(T.mutations.includes(y))continue;const S=Math.max(1,Math.floor(T.fruitCount)),_=Lx(T.species,T.targetScale,T.mutations,y);x+=_*S,w+=S;}const k=(w>0?x/w:0)*g;a+=k,s+=g;}}return {perProc:s>0?a/s:0,perHour:a}}function SM(e,t,n){const o=be.myGarden.get(),r=o.crops.all,i=o.crops.mature,a=n?r.filter(p=>n.has(String(p.tileIndex))):r,s=n?i.filter(p=>n.has(String(p.tileIndex))):i,l=s.length>0?s:a;if(l.length===0)return {expectedCrops:0,expectedCoins:0};let c=0;for(const p of e){const f=Ui(p);for(const g of Pr){if(!p.abilities.includes(g)||!ji(p,g,t))continue;const h=rr(g);if(!h)continue;const y=gl(h.baseProbability,f);c+=y/100;}}const d=l.length*c;let u=0;for(const p of l){const f=Pt(p.species,p.targetScale,p.mutations)*fl;u+=f*c;}return {expectedCrops:d,expectedCoins:u}}function CM(e,t,n){const o=be.myGarden.get(),r=o.crops.all,i=o.crops.mature,a=n?r.filter(p=>n.has(String(p.tileIndex))):r,s=n?i.filter(p=>n.has(String(p.tileIndex))):i,l=s.length>0?s:a;if(l.length===0)return {expectedCrops:0,expectedCoins:0};let c=0;for(const p of e){const f=Ui(p);for(const g of Mr){if(!p.abilities.includes(g)||!ji(p,g,t))continue;const h=rr(g);if(!h)continue;const y=gl(h.baseProbability,f);c+=y/100;}}const d=l.length*c;let u=0;for(const p of l){const f=Pt(p.species,p.targetScale,p.mutations)*fl;u+=f*c;}return {expectedCrops:d,expectedCoins:u}}const od={id:"coin",label:"Value",icon:"💰",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=be.myGarden.get(),o=n.crops.all.length;return o===0?null:{text:`${o} crops`,variant:"neutral",tooltip:`${n.crops.mature.length} mature, ${n.crops.growing.length} growing`,priority:7}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{const i=[e];od.renderGroupedSlot&&od.renderGroupedSlot(i,t,n,o,r);},renderGroupedSlot:(e,t,n,o,r)=>{const i=be.weather.get(),a=i.isActive?i.type:null;n.innerHTML="";const s=en("div","value-stats-compact"),l=e.some(f=>Fe(f,Ar)),c=e.some(f=>Fe(f,Er)),d=e.some(f=>Fe(f,Ir)),u=e.some(f=>Fe(f,Pr)),p=e.some(f=>Fe(f,Mr));if(!(!l&&!c&&!d&&!u&&!p)){if(l){const f=yM(e,a,r);s.appendChild(Kl("SIZE BOOST",`+${fn(f.perProc)}/proc`,`+${fn(f.perHour)}/hr`));}if(c){const f=vM(e,a,r);s.appendChild(Kl("MUTATION BOOST",`+${fn(f.perProc)}/proc`,`+${fn(f.perHour)}/hr`));}if(d){const f=wM(e,a,r);s.appendChild(Kl("GRANTERS",`+${fn(f.perProc)}/proc`,`+${fn(f.perHour)}/hr`));}if(u){const f=SM(e,a,r);s.appendChild(Ef("EXTRA HARVEST",`+${f.expectedCrops.toFixed(1)} crops`,`+${fn(f.expectedCoins)} coins`));}if(p){const f=CM(e,a,r);s.appendChild(Ef("CROP REFUND",`+${f.expectedCrops.toFixed(1)} crops`,`+${fn(f.expectedCoins)} coins`));}n.appendChild(s);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>Fe(o,Ar)||Fe(o,Er)||Fe(o,Ir)||Fe(o,Pr)||Fe(o,Mr)),shouldDisplay:(e,t,n)=>{const r=(pl.ALLOWED_PANELS[n.primary]||[]).includes("coin"),i=t.some(a=>Fe(a,Ar)||Fe(a,Er)||Fe(a,Ir)||Fe(a,Pr)||Fe(a,Mr));return r&&i},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>Fe(r,Ar))&&o++,n.some(r=>Fe(r,Er))&&o++,n.some(r=>Fe(r,Ir))&&o++,n.some(r=>Fe(r,Pr))&&o++,n.some(r=>Fe(r,Mr))&&o++,o}},bo=["DoubleHatch"],xo=["PetRefund","PetRefundII"],yo=["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"];function ut(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function Rx(e){const t=J.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0}:null}function it(e,t){return e.abilities.some(n=>t.includes(n))}function Gu(e){return e.hunger>0}function Nx(e){return e.currentStrength/e.maxStrength}function Ox(e,t){return Math.min(100,e*t)}function kM(e){const t=ut("span","sprite-wrapper");try{if(Q.isReady()&&Q.has("pet",e)){const n=Q.toCanvas("pet",e,{scale:.6});n.style.height="32px",n.style.width="auto",n.style.imageRendering="pixelated",t.appendChild(n);}}catch{t.textContent="🥚";}return t}function Sa(e,t){const n=ut("div","stat-row");n.appendChild(ut("span","stat__label",e));const o=ut("div","stat__sprite-grid");for(const r of t){if(r.value<=0)continue;const i=ut("div","stat__sprite-item");i.appendChild(kM(r.eggId));const a=ut("span","stat__sprite-value",r.value.toFixed(1));i.appendChild(a),o.appendChild(i);}return n.appendChild(o),n}function If(e,t,n,o){const r=ut("div","stat-row");r.appendChild(ut("span","stat__label","PET MUTATION"));const i=ut("span","stat__values-row"),a=ut("span","stat__value stat__value--rainbow",`${e}% (${n})`);a.style.backgroundImage="var(--rainbow-text-gradient)",a.style.webkitBackgroundClip="text",a.style.webkitTextFillColor="transparent",a.style.backgroundClip="text",i.appendChild(a),i.appendChild(ut("span","stat__separator"," | "));const s=ut("span","stat__value stat__value--gold",`${t}% (${o})`);return i.appendChild(s),r.appendChild(i),r}function Hu(){const e=be.myInventory.get(),t=new Map;for(const n of e.items)if(n.itemType==="Egg"&&n.eggId){const o=t.get(n.eggId)||0;t.set(n.eggId,o+(n.quantity||1));}return t}function ju(e){const t=be.myGarden.get(),n=new Map,o=e?t.eggs.all.filter(r=>e.has(String(r.tileIndex))):t.eggs.all;for(const r of o){const i=n.get(r.eggId)||0;n.set(r.eggId,i+1);}return n}function Pf(e,t){const n=t?ju(t):Hu(),o=[];let r=0;for(const i of e){if(!Gu(i))continue;const a=Nx(i);for(const s of bo){if(!i.abilities.includes(s))continue;const l=Rx(s);if(!l)continue;const c=Ox(l.baseProbability,a);r+=c/100;}}for(const[i,a]of n){const s=a*r;o.push({eggId:i,value:s});}return o}function Mf(e,t){const n=t?ju(t):Hu(),o=[];let r=0;for(const i of e){if(!Gu(i))continue;const a=Nx(i);for(const s of xo){if(!i.abilities.includes(s))continue;const l=Rx(s);if(!l)continue;const c=Ox(l.baseProbability,a);r+=c/100;}}for(const[i,a]of n){const s=a*r;o.push({eggId:i,value:s});}return o}function Lf(e,t){const n=t?ju(t):Hu(),o=Array.from(n.values()).reduce((f,g)=>f+g,0);let r=0,i=0;for(const f of e){if(!Gu(f))continue;yo.some(h=>f.abilities.includes(h))&&(r+=f.currentStrength*1e-4,i+=f.currentStrength*.001);}const a=J.get("mutations");let s=1,l=.1;if(a){const f=a.Gold,g=a.Rainbow;f?.baseChance!==void 0&&(s=f.baseChance),g?.baseChance!==void 0&&(l=g.baseChance);}const c=s+i,d=l+r,u=o*c/100,p=o*d/100;return {goldChance:c,rainbowChance:d,expectedGold:u,expectedRainbow:p}}const _M={id:"hatch",label:"Hatching",icon:"🥚",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const o=be.myInventory.get().items.filter(r=>r.itemType==="Egg").reduce((r,i)=>r+(i.quantity||1),0);return o===0?null:{text:`${o} eggs`,variant:"neutral",tooltip:`${o} eggs in inventory`,priority:6}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o,r)=>{n.innerHTML="";const i=ut("div","hatching-stats-compact"),a=it(e,bo),s=it(e,xo),l=it(e,yo);if(!a&&!s&&!l)return;const c=[e];if(a){const d=Pf(c,r);d.length>0&&i.appendChild(Sa("DOUBLE HATCH",d));}if(s){const d=Mf(c,r);d.length>0&&i.appendChild(Sa("PET REFUND",d));}if(l){const d=Lf(c,r),u=d.rainbowChance.toFixed(4),p=d.goldChance.toFixed(2),f=d.expectedRainbow<.01?`~${(d.expectedRainbow*100).toFixed(1)}%e`:d.expectedRainbow.toFixed(2),g=d.expectedGold.toFixed(2);i.appendChild(If(u,p,f,g));}n.appendChild(i);},renderGroupedSlot:(e,t,n,o,r)=>{n.innerHTML="";const i=ut("div","hatching-stats-compact"),a=e.some(c=>it(c,bo)),s=e.some(c=>it(c,xo)),l=e.some(c=>it(c,yo));if(!(!a&&!s&&!l)){if(a){const c=Pf(e,r);c.length>0&&i.appendChild(Sa("DOUBLE HATCH",c));}if(s){const c=Mf(e,r);c.length>0&&i.appendChild(Sa("PET REFUND",c));}if(l){const c=Lf(e,r),d=c.rainbowChance.toFixed(4),u=c.goldChance.toFixed(2),p=c.expectedRainbow<.01?`~${(c.expectedRainbow*100).toFixed(1)}%e`:c.expectedRainbow.toFixed(2),f=c.expectedGold.toFixed(2);i.appendChild(If(d,u,p,f));}n.appendChild(i);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>it(o,bo)||it(o,xo)||it(o,yo)),shouldDisplay:(e,t,n)=>{const r=(pl.ALLOWED_PANELS[n.primary]||[]).includes("hatch"),i=t.some(a=>it(a,bo)||it(a,xo)||it(a,yo));return r&&i},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>it(r,bo))&&o++,n.some(r=>it(r,xo))&&o++,n.some(r=>it(r,yo))&&o++,o}},Rf=[hM,bM,od,_M];function TM(e){let t=e;return t=t.replace(/_NEW$/,""),t=t.replace(/^Snowy/,""),t=t.replace(/(I|II|III|IV)$/,""),t}function $x(e){return new Set(e.abilities.map(TM))}function xr(e,t){if(e.size!==t.size)return  false;for(const n of e)if(!t.has(n))return  false;return  true}function Nf(e,t){return $x(e).has(t)}function AM(e,t){if(e.length<2)return {shouldGroup:false,matchingPets:[],remainingPets:e};if(t){const a=t==="egg"?"EggGrowthBoost":"PlantGrowthBoost",s=e.filter(c=>Nf(c,a)),l=e.filter(c=>!Nf(c,a));return s.length>=2?{shouldGroup:true,matchingPets:s,remainingPets:l}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const n=e.map(a=>({pet:a,abilities:$x(a)}));if(e.length===3){const[a,s,l]=n;if(xr(a.abilities,s.abilities)&&xr(a.abilities,l.abilities))return {shouldGroup:true,matchingPets:[a.pet,s.pet,l.pet],remainingPets:[]}}const[o,r,i]=n;return xr(o.abilities,r.abilities)?{shouldGroup:true,matchingPets:[o.pet,r.pet],remainingPets:i?[i.pet]:[]}:i&&xr(o.abilities,i.abilities)?{shouldGroup:true,matchingPets:[o.pet,i.pet],remainingPets:[r.pet]}:i&&xr(r.abilities,i.abilities)?{shouldGroup:true,matchingPets:[r.pet,i.pet],remainingPets:[o.pet]}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const EM=3;function IM(e,t){const n=e.abilities||[],o=c=>n.some(d=>c.includes(d));if((o(re.DOUBLE_HATCH)||o(re.PET_REFUND)||o(re.PET_MUTATION)||o(re.MAX_STR_BOOST))&&t.some(c=>c.id==="hatch"))return "hatch";if((o(re.COIN_FINDER)||o(re.SELL_BOOST)||o(re.CROP_REFUND_HARVEST)||o(re.CROP_SIZE)||o(re.CROP_MUTATION)||o(re.RARE_GRANTERS)||o(re.COMMON_GRANTERS))&&t.some(c=>c.id==="coin"))return "coin";if((o(re.EGG_GROWTH)||o(re.PLANT_GROWTH))&&t.some(c=>c.id==="growth"))return "growth";const s=e.currentStrength<e.maxStrength,l=o(re.XP_BOOST);return (s||l)&&t.some(c=>c.id==="xp")?"xp":t[0]?.id||"xp"}class PM{constructor(t){U(this,"expandedTeams",new Map);U(this,"featureUpdateInterval",null);U(this,"options");U(this,"tileFilter");this.options=t;}setTileFilter(t){this.tileFilter=t,this.refreshAllPanels();}refreshAllPanels(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t,n=false,o){const r=this.options.getListContainer(),i=he.getTeam(t);if(!i||!r)return;const a=he.getPetsForTeam(i),s=be.myPets.get(),l=xa(i),c=Rf.filter(k=>!(!k.isAvailable()||k.shouldDisplay&&!k.shouldDisplay(i,a,l)));if(c.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const d=l.primary==="time-reduction"||Ro(a)||No(a);let u;if(d){const k=Ro(a),T=No(a),b=be.myGarden.get(),S=b.eggs.growing.length>0,_=b.crops.growing.length>0;k&&T?_&&!S?u="plant":S&&!_?u="egg":u="plant":T?u="plant":k&&(u="egg");}const p=m("div",{className:"team-expanded-container"}),f=[];let g=n?{shouldGroup:false,matchingPets:[],remainingPets:a}:this.analyzeTeamForGrouping(i,a,u);const h=c.some(k=>k.id==="growth"||k.id==="hatch"||k.id==="coin");if(g.shouldGroup&&!h&&(g.matchingPets.every(T=>T.currentStrength>=T.maxStrength)||(g={shouldGroup:false,matchingPets:[],remainingPets:a})),g.shouldGroup&&g.matchingPets.length>=2){const k=c.filter(S=>!S.hasContent||S.hasContent(g.matchingPets,i)),T=k.find(S=>S.id==="growth"||S.id==="hatch"||S.id==="coin")||k[0]||c[0],b=this.createGroupedPetRow(i,g.matchingPets,c,T,u,t);p.appendChild(b.container),f.push(b.cardState);for(const S of g.remainingPets){const _=i.petIds.indexOf(S.id),C=this.createIndividualPetRow(i,S,_,c,u,t);p.appendChild(C.container),f.push(C.cardState);}}else for(let k=0;k<3;k++){const T=i.petIds[k],b=T?s.all.find(_=>_.id===T)??null:null,S=this.createIndividualPetRow(i,b,k,c,u,t,o);p.appendChild(S.container),f.push(S.cardState);}this.expandedTeams.set(t,{cards:f,expandedAt:Date.now(),container:p,growthViewType:u});const y=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(p,a,t,y);const w=he.getAllTeams().findIndex(k=>k.id===t),v=Array.from(r.children).filter(k=>k instanceof HTMLElement&&k.classList.contains("team-list-item"));w!==-1&&w<v.length&&v[w].insertAdjacentElement("afterend",p),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const o of n.cards)o.shell&&o.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,o,r){const i=he.getTeam(o),a=i?xa(i):null,s=this.expandedTeams.get(o),l=a?.primary==="time-reduction"||Ro(n)||No(n),c=r??(l?"growth":"xp");s&&(s.currentBarMode=c),c==="growth"?this.renderGrowthSummaryBar(t,n,o):this.renderXpProgressBar(t,n);}updateProgressBarForFeature(t,n){const o=this.expandedTeams.get(t);if(!o)return;const r=he.getTeam(t);if(!r||n!=="xp"&&n!=="growth")return;const i=he.getPetsForTeam(r),a=n==="xp"?"xp":"growth";if(o.currentBarMode===a)return;const s=o.container.querySelector(".growth-summary-overhaul"),l=o.container.querySelector(".team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)");s&&s.remove(),l&&l.remove(),this.addProgressBar(o.container,i,t,a);}renderXpProgressBar(t,n){if(n.some(r=>r.currentStrength<r.maxStrength)&&n.length>0){const r=Math.round(n.reduce((c,d)=>c+d.currentStrength/d.maxStrength,0)/n.length*100),i=m("div",{className:"team-progress-bar"}),a=r<33?"low":r<67?"medium":"high",s=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});s.style.width=`${r}%`;const l=m("div",{className:"team-progress-bar__percent",textContent:`${r}%`});i.appendChild(s),i.appendChild(l),t.prepend(i);}}renderGrowthSummaryBar(t,n,o){const r=this.expandedTeams.get(o),i=r?.growthViewType||"plant",a=be.myGarden.get(),s=Date.now(),l=i==="egg"?a.eggs.growing:a.crops.growing,c=this.tileFilter?l.filter(N=>this.tileFilter.has(N.tileIndex)):l,d=c.length,u=Tu(n),p=Au(n),f=fi(u).timeReductionPerHour,g=fi(p).timeReductionPerHour,h=Math.round(i==="egg"?f:g);let y=d>0?0:100;if(d>0){const N=(60+h)/60;y=Math.round(c.reduce((D,H)=>{const G=i==="egg"?H.plantedAt:H.startTime,q=i==="egg"?H.maturedAt:H.endTime,E=s-G,A=(q-s)/N,M=E+A,R=M>0?E/M*100:0;return D+Math.min(100,Math.max(0,R))},0)/d);}let x=c.find(N=>N.tileIndex===r?.pinnedItemId);!x&&d>0&&(x=[...c].sort((N,D)=>{const H=i==="egg"?N.maturedAt:N.endTime,G=i==="egg"?D.maturedAt:D.endTime;return H-G})[0]);const w=m("div",{className:"growth-summary-overhaul"}),v=m("div",{className:`team-progress-bar team-progress-bar--${i}`}),k=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});k.style.width=`${y}%`;const T=N=>{const D=Math.floor(N/60),H=N%60;return D>0&&H>0?`${D}h ${H}m/h`:D>0?`${D}h/h`:`${H}m/h`};h>0&&((60+h)/60).toFixed(2)+"";const b=m("div",{className:"team-progress-bar__overlay"});b.innerHTML=`
            <span class="bar-percent">${y}%</span>
            <span class="bar-info">${d} total +${T(h)}</span>
        `,v.appendChild(k),v.appendChild(b);const S=m("div",{className:"growth-next-item"});if(x){let N=i==="egg"?x.eggId:x.species;const D=i==="egg"?"pet":"plant";i==="plant"&&N&&(N==="DawnCelestial"&&(N="DawnCelestialCrop"),N==="MoonCelestial"&&(N="MoonCelestialCrop"));const H=i==="egg"?x.maturedAt:x.endTime;i==="egg"?x.plantedAt:x.startTime;const G=(60+h)/60,q=Math.max(0,Math.round((H-s)/G)),E=s+q,P=new Date(E),A=P.getDate()!==new Date().getDate(),M=P.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),R=`${A?"Tomorrow ":""}${M}`,L=V=>{const te=Math.floor(V/1e3),ne=Math.floor(te/60),ae=Math.floor(ne/60);return ae>0?`${ae}h ${ne%60}m ${te%60}s`:ne>0?`${ne}m ${te%60}s`:`${te}s`},F=m("div",{className:"growth-next-sprite"});try{if(Q.isReady()&&Q.has(D,N)){const V=Q.toCanvas(D,N,{scale:.3});V.style.height="20px",V.style.width="auto",V.style.imageRendering="pixelated",F.appendChild(V);}else F.textContent=i==="egg"?"🥚":"🌱";}catch(V){console.warn("[GrowthSummary] Sprite error:",V),F.textContent=i==="egg"?"🥚":"🌱";}S.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${L(q)}</span>
                    <span class="growth-next-date">| ${R}</span>
                </div>
            `,S.prepend(F);}else S.innerHTML='<span class="empty-text">No items growing</span>';const _=m("div",{className:"growth-overhaul-controls"}),C=i==="egg"?"UncommonEgg":"Carrot",I=i==="egg"?"pet":"plant";let O=null;try{Q.isReady()&&Q.has(I,C)&&(O=Q.toCanvas(I,C,{scale:.35}));}catch{}const z=uM({variant:i==="egg"?"egg":"plant",sprite:O,playSound:true,tooltip:`Switch to ${i==="egg"?"plants":"eggs"}`,onClick:N=>{N.stopPropagation(),r&&(r.growthViewType=i==="egg"?"plant":"egg",r.pinnedItemId=void 0,this.updateGrowthSummary(o));}}),j=m("button",{className:"growth-dropdown-overhaul",textContent:"▼"});j.onclick=N=>{N.stopPropagation(),this.showGrowthDropdown(j,c,i,o);},f>0&&g>0&&_.appendChild(z),_.appendChild(j),w.appendChild(v),w.appendChild(S),w.appendChild(_);const Y=t.querySelector(".growth-summary-overhaul");Y?Y.replaceWith(w):t.prepend(w);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const o=he.getTeam(t);if(!o)return;const r=he.getPetsForTeam(o);this.renderGrowthSummaryBar(n.container,r,t);const i=this.analyzeTeamForGrouping(o,r,n.growthViewType),a=n.cards.some(l=>l.slotIndex===-1),s=i.shouldGroup&&i.matchingPets.length>=2;if(a!==s){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}if(a&&s){const l=n.cards.find(c=>c.slotIndex===-1);if(l?.shell&&(l.shell.root.classList.contains("base-pet-card--grouped")?3:l.shell.root.classList.contains("base-pet-card--grouped-2")?2:0)!==i.matchingPets.length){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}}this.updateGroupedCardsViewType(t,n),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const o=he.getTeam(t);if(!o)return;const r=be.myPets.get();for(const i of n.cards){const a=o.petIds[i.slotIndex],s=a?r.all.find(l=>l.id===a):null;if(s&&i.shell&&(i.shell.update(s),i.featureData.renderPetSlot))try{const l=i.shell.getContentSlot();i.featureData.renderPetSlot(s,o,l,n.growthViewType,this.tileFilter);const c=s.currentStrength>=s.maxStrength,d=l.children.length>0||l.textContent.trim().length>0;i.shell.setCentered(c&&!d);}catch(l){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,l);}}}updateGroupedCardsViewType(t,n){const o=he.getTeam(t);if(o){for(const r of n.cards)if(r.slotIndex===-1&&r.shell){const i=r.shell.getContentSlot();if(r.featureData.renderGroupedSlot&&r.shell.root.classList.contains("base-pet-card--grouped")){i.innerHTML="";const a=he.getPetsForTeam(o);r.featureData.renderGroupedSlot(a,o,i,n.growthViewType,this.tileFilter);const s=i.children.length>0||i.textContent.trim().length>0;r.shell.setCentered(!s);}}}}showGrowthDropdown(t,n,o,r){const i=document.querySelector(".growth-dropdown-menu");if(i){const c=i.getAttribute("data-owner-id")===r&&i.getAttribute("data-view-type")===o;if(i.remove(),c)return}const a=m("div",{className:"growth-dropdown-menu"});if(a.setAttribute("data-owner-id",r),a.setAttribute("data-view-type",o),n.length===0){const c=m("div",{className:"growth-dropdown-option"});c.textContent="No items growing",a.appendChild(c);}else {const c=o==="egg"?"pet":"plant";n.forEach(d=>{const u=d.tileIndex;let p=o==="egg"?d.eggId:d.species;o==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=m("div",{className:"growth-dropdown-option"}),g=m("span",{className:"dropdown-sprite"});try{if(Q.isReady()&&Q.has(c,p)){const v=Q.toCanvas(c,p,{scale:.3});v.style.height="16px",v.style.width="auto",v.style.imageRendering="pixelated",g.appendChild(v);}else g.textContent=o==="egg"?"🥚":"🌱";}catch{g.textContent=o==="egg"?"🥚":"🌱";}const h=o==="egg"?d.maturedAt:d.endTime,x=new Date(h).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),w=m("span",{className:"dropdown-text"});w.textContent=`${p} - ${x}`,f.appendChild(g),f.appendChild(w),f.onclick=v=>{v.stopPropagation();const k=this.expandedTeams.get(r);k&&(k.pinnedItemId=u,this.updateGrowthSummary(r)),a.remove();},a.appendChild(f);});}const s=t.getBoundingClientRect();a.style.position="fixed",a.style.bottom=`${window.innerHeight-s.top+4}px`,a.style.top="auto",a.style.left="auto",a.style.right=`${window.innerWidth-s.right}px`,a.style.marginTop="0",a.style.zIndex="999999",document.body.appendChild(a);const l=c=>{!a.contains(c.target)&&c.target!==t&&(a.remove(),document.removeEventListener("click",l,true));};setTimeout(()=>document.addEventListener("click",l,true),10);}createIndividualPetRow(t,n,o,r,i,a,s){const l=n?r.filter(T=>!T.hasContent||T.hasContent(n,t)):r,c=l.length>0?l:r;let d=c[0];if(s)d=c.find(T=>T.id===s)||c[0];else if(n){const T=IM(n,c);d=c.find(b=>b.id===T)||c[0];}else {const b=xa(t)?.suggestedFeatures||[];let S=false;for(const _ of b){const C=c.find(I=>I.id===_);if(C){d=C,S=true;break}}S||(i?d=c.find(_=>_.id==="growth")||c[0]:d=c.find(_=>_.id==="xp")||c[0]);}const u=m("div",{className:"expanded-pet-row"}),p=m("div",{className:"pet-row__header"}),f=m("button",{textContent:"<",className:"pet-row__nav"}),g=m("div",{textContent:`${d.icon} ${d.label.toUpperCase()}`,className:"pet-label"}),h=m("button",{textContent:">",className:"pet-row__nav"});let y=null;n&&(y=new lM(n));const x={slotIndex:o,currentFeatureId:d.id,shell:y,featureData:d},w=T=>{const b=c[T];if(b.id==="growth"){const S=he.getPetsForTeam(t),_=this.expandedTeams.get(a),C=this.analyzeTeamForGrouping(t,S,_?.growthViewType);if(C.shouldGroup&&C.matchingPets.length>=2){this.collapseAndReexpandForGrowth(a);return}}if(g.textContent=`${b.icon} ${b.label.toUpperCase()}`,y&&n){const S=y.getContentSlot();if(S.innerHTML="",b.renderPetSlot){const I=this.expandedTeams.get(a);b.renderPetSlot(n,t,S,I?.growthViewType,this.tileFilter);}const _=n.currentStrength>=n.maxStrength,C=S.children.length>0||S.textContent.trim().length>0;y.setCentered(_&&!C);}x.currentFeatureId=b.id,x.featureData=b,p.className=`pet-row__header pet-row__header--${b.id}`,this.updateProgressBarForFeature(a,b.id);};p.className=`pet-row__header pet-row__header--${d.id}`;let v=c.findIndex(T=>T.id===d.id);f.addEventListener("click",T=>{T.stopPropagation(),v=(v-1+c.length)%c.length,w(v);}),h.addEventListener("click",T=>{T.stopPropagation(),v=(v+1)%c.length,w(v);}),c.length>1&&p.appendChild(f),p.appendChild(g),c.length>1&&p.appendChild(h);let k;if(y&&n){if(k=y.build(),d.renderPetSlot){const T=y.getContentSlot();d.renderPetSlot(n,t,T,i,this.tileFilter);const b=n.currentStrength>=n.maxStrength,S=T.children.length>0||T.textContent.trim().length>0;y.setCentered(b&&!S);}}else k=m("div",{className:"pet-row__content pet-row__content--empty"}),k.innerHTML=`
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;return u.appendChild(p),u.appendChild(k),x.container=u,{container:u,cardState:x}}createGroupedPetRow(t,n,o,r,i,a){const s=o.filter(S=>!S.hasContent||S.hasContent(n,t)),l=s.length>0?s:o;if(this.shouldUseCombinedPanel(l,n,t,i))return this.createCombinedPanelRow(t,n,l,i,a);const c=m("div",{className:"expanded-pet-row expanded-pet-row--grouped"}),d=m("div",{className:"pet-row__header"}),u=m("button",{textContent:"<",className:"pet-row__nav"}),p=m("div",{textContent:`${r.icon} ${r.label.toUpperCase()}`,className:"pet-label"}),f=m("button",{textContent:">",className:"pet-row__nav"}),g=m("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),h=m("div",{className:"base-pet-card__left"}),y=m("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const S of n)try{const _=S.mutations||[];if(Q.has("pet",S.petSpecies)){const C=Q.toCanvas("pet",S.petSpecies,{mutations:_,scale:1,boundsMode:"padded"});C.style.imageRendering="pixelated",y.appendChild(C);}}catch{}h.appendChild(y);const x=m("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const S of n){const C=S.currentStrength>=S.maxStrength?`MAX ${S.maxStrength}`:`STR ${S.currentStrength}/${S.maxStrength}`,I=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});x.appendChild(I);}h.appendChild(x),g.appendChild(h);const w=m("div",{className:"base-pet-card__content"});g.appendChild(w);const v={root:g,getContentSlot:()=>w,setCentered:S=>{g.classList.toggle("base-pet-card--centered",S);},destroy:()=>{g.remove();},update:()=>{x.innerHTML="";for(const S of n){const C=S.currentStrength>=S.maxStrength?`MAX ${S.maxStrength}`:`STR ${S.currentStrength}/${S.maxStrength}`,I=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});x.appendChild(I);}}},k={slotIndex:-1,currentFeatureId:r.id,shell:v,featureData:r},T=S=>{const _=l[S];if(_.id==="xp"&&!n.every(O=>O.currentStrength>=O.maxStrength)){this.collapseAndReexpandForXP(a);return}if(p.textContent=`${_.icon} ${_.label.toUpperCase()}`,w.innerHTML="",_.renderGroupedSlot){const I=this.expandedTeams.get(a);_.renderGroupedSlot(n,t,w,I?.growthViewType,this.tileFilter);}else if(_.renderPetSlot){const I=this.expandedTeams.get(a);_.renderPetSlot(n[0],t,w,I?.growthViewType,this.tileFilter);}const C=w.children.length>0||w.textContent.trim().length>0;v.setCentered(!C),k.currentFeatureId=_.id,k.featureData=_,d.className=`pet-row__header pet-row__header--${_.id}`;};d.className=`pet-row__header pet-row__header--${r.id}`;let b=l.findIndex(S=>S.id===r.id);return u.addEventListener("click",S=>{S.stopPropagation(),b=(b-1+l.length)%l.length,T(b);}),f.addEventListener("click",S=>{S.stopPropagation(),b=(b+1)%l.length,T(b);}),l.length>1&&d.appendChild(u),d.appendChild(p),l.length>1&&d.appendChild(f),r.renderGroupedSlot?r.renderGroupedSlot(n,t,w,i,this.tileFilter):r.renderPetSlot&&r.renderPetSlot(n[0],t,w,i,this.tileFilter),c.appendChild(d),c.appendChild(g),g.classList.add("base-pet-card--grouped"),{container:c,cardState:{...k,container:c}}}collapseAndReexpandForXP(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,true,"xp"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,true,"xp"),n.container.style.opacity="1";});});}collapseAndReexpandForGrowth(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,false,"growth"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,false,"growth"),n.container.style.opacity="1";});});}rebuildInPlace(t,n,o){const r=this.expandedTeams.get(t);if(!r)return;const i=he.getTeam(t);if(!i)return;const a=he.getPetsForTeam(i),s=be.myPets.get(),l=this.getAvailableFeaturesForTeam(i,a),c=r.growthViewType;for(const h of r.cards)h.shell&&h.shell.destroy(),h.container&&h.container.parentNode&&h.container.remove();const d=r.container.querySelector(".team-progress-bar");d&&d.remove();const u=[];let p=n?{shouldGroup:false,matchingPets:[],remainingPets:a}:this.analyzeTeamForGrouping(i,a,c);const f=l.some(h=>h.id==="growth"||h.id==="hatch"||h.id==="coin");if(p.shouldGroup&&!f&&(p.matchingPets.every(y=>y.currentStrength>=y.maxStrength)||(p={shouldGroup:false,matchingPets:[],remainingPets:a})),p.shouldGroup&&p.matchingPets.length>=2){const h=l.filter(w=>!w.hasContent||w.hasContent(p.matchingPets,i)),y=h.find(w=>w.id==="growth"||w.id==="hatch"||w.id==="coin")||h[0]||l[0],x=this.createGroupedPetRow(i,p.matchingPets,l,y,c,t);r.container.appendChild(x.container),u.push(x.cardState);for(const w of p.remainingPets){const v=i.petIds.indexOf(w.id),k=this.createIndividualPetRow(i,w,v,l,c,t);r.container.appendChild(k.container),u.push(k.cardState);}}else for(let h=0;h<3;h++){const y=i.petIds[h],x=y?s.all.find(v=>v.id===y)??null:null,w=this.createIndividualPetRow(i,x,h,l,c,t,o);r.container.appendChild(w.container),u.push(w.cardState);}r.cards=u;const g=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(r.container,a,t,g);}getAvailableFeaturesForTeam(t,n){return xa(t),Rf.filter(o=>o.isAvailable())}countTotalRows(t,n,o,r){let i=0;for(const a of t)a.countRows?i+=a.countRows(n,o,r):a.hasContent?.(n,o)&&(i+=1);return i}shouldUseCombinedPanel(t,n,o,r){return t.length<2?false:this.countTotalRows(t,n,o,r)<=EM}createCombinedPanelRow(t,n,o,r,i){const a=m("div",{className:"expanded-pet-row expanded-pet-row--combined"}),s=m("div",{className:"pet-row__header pet-row__header--combined"}),l=m("span",{className:"combined-panel__icons",textContent:o.map(x=>x.icon).join(" ")});s.appendChild(l);const c=m("div",{textContent:"COMBINED",className:"pet-label"});s.appendChild(c);const d=m("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),u=m("div",{className:"base-pet-card__left"}),p=m("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const x of n)try{const w=x.mutations||[];if(Q.has("pet",x.petSpecies)){const v=Q.toCanvas("pet",x.petSpecies,{mutations:w,scale:1,boundsMode:"padded"});v.style.imageRendering="pixelated",p.appendChild(v);}}catch{}u.appendChild(p);const f=m("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const x of n){const v=x.currentStrength>=x.maxStrength?`MAX ${x.maxStrength}`:`STR ${x.currentStrength}/${x.maxStrength}`,k=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:v});f.appendChild(k);}u.appendChild(f),d.appendChild(u);const g=m("div",{className:"base-pet-card__content base-pet-card__content--combined"});for(const x of o){const w=m("div",{className:`combined-section combined-section--${x.id}`}),v=m("span",{className:"combined-section__icon",textContent:x.icon});w.appendChild(v);const k=m("div",{className:"combined-section__content"});x.renderGroupedSlot?x.renderGroupedSlot(n,t,k,r,this.tileFilter):x.renderPetSlot&&x.renderPetSlot(n[0],t,k,r,this.tileFilter),(k.children.length>0||k.textContent?.trim())&&(w.appendChild(k),g.appendChild(w));}d.appendChild(g);const y={slotIndex:-1,currentFeatureId:"combined",shell:{root:d,getContentSlot:()=>g,setCentered:x=>{d.classList.toggle("base-pet-card--centered",x);},destroy:()=>{d.remove();},update:()=>{f.innerHTML="";for(const x of n){const v=x.currentStrength>=x.maxStrength?`MAX ${x.maxStrength}`:`STR ${x.currentStrength}/${x.maxStrength}`,k=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:v});f.appendChild(k);}},build:()=>d},container:a,featureData:o[0]};return a.appendChild(s),a.appendChild(d),{container:a,cardState:y}}analyzeTeamForGrouping(t,n,o){const r=c=>(c.abilities||[]).some(u=>re.MAX_STR_BOOST.includes(u)||re.PET_MUTATION.includes(u)||re.DOUBLE_HATCH.includes(u)||re.PET_REFUND.includes(u)),i=n.filter(r);if(i.length>=2&&i.length<=3){const c=n.filter(d=>!i.includes(d));return {shouldGroup:true,matchingPets:i,remainingPets:c}}const a=["DoubleHarvest","ProduceRefund","ProduceRefundII"],s=c=>(c.abilities||[]).some(u=>a.includes(u)),l=n.filter(s);if(l.length>=2&&l.length<=3&&!l.some(d=>(d.abilities||[]).some(p=>re.EGG_GROWTH.includes(p)||re.PLANT_GROWTH.includes(p)||re.CROP_MUTATION.includes(p)))){const d=n.filter(u=>!l.includes(u));return {shouldGroup:true,matchingPets:l,remainingPets:d}}return AM(n,o)}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=ot.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}const MM={calculationScope:"all",selectedTileIndices:[],expandedTeamIds:[]};let Ve=null,Yl=null;async function LM(){return Ve||(Yl||(Yl=ro("tab-trackers",{version:3,defaults:MM})),Ve=await Yl,Ve)}function Do(){if(!Ve)throw new Error("[TrackersState] State not initialized. Call initTrackersState() first.");return Ve}function RM(e){if(!Ve)return;const t=Ve.get();t.expandedTeamIds.includes(e)?Ve.update({expandedTeamIds:t.expandedTeamIds.filter(o=>o!==e)}):Ve.update({expandedTeamIds:[...t.expandedTeamIds,e]});}function NM(e){Ve&&Ve.update({calculationScope:e});}function Jl(e){if(!Ve)return;const t=Ve.get();t.selectedTileIndices.includes(e)?Ve.update({selectedTileIndices:t.selectedTileIndices.filter(o=>o!==e)}):Ve.update({selectedTileIndices:[...t.selectedTileIndices,e]});}function OM(){Ve&&Ve.update({selectedTileIndices:[]});}class $M{constructor(t={}){U(this,"dropdown",null);U(this,"options");U(this,"isDragging",false);U(this,"dragSelectMode",null);this.options=t,document.addEventListener("pointerup",()=>{this.isDragging=false,this.dragSelectMode=null;});}build(){if(this.dropdown)return this.dropdown;this.dropdown=m("div",{className:"tile-grid-selector"});const t=this.buildHeader();this.dropdown.appendChild(t);const n=this.buildGrids();return this.dropdown.appendChild(n),this.dropdown}show(){this.dropdown||this.build(),this.dropdown&&!this.dropdown.parentElement&&(this.options.container||document.body).appendChild(this.dropdown),this.dropdown&&this.dropdown.classList.add("tile-grid-selector--visible"),this.renderGrids();}hide(){this.dropdown&&this.dropdown.classList.remove("tile-grid-selector--visible");}destroy(){this.dropdown?.parentElement&&this.dropdown.parentElement.removeChild(this.dropdown),this.dropdown=null;}buildHeader(){const t=m("div",{className:"tile-grid-selector__header"}),o=Do().get().selectedTileIndices.length,r=m("div",{className:"tile-grid-selector__info",textContent:`${o} tile${o!==1?"s":""} selected`}),i=m("button",{className:"tile-grid-selector__btn",textContent:"Clear All"});i.addEventListener("click",()=>{OM(),this.renderGrids(),this.options.onChange&&this.options.onChange();});const a=m("button",{className:"tile-grid-selector__close-btn",textContent:"×",title:"Close"});return a.addEventListener("click",()=>{this.hide();}),t.appendChild(r),t.appendChild(i),t.appendChild(a),t}buildGrids(){const t=m("div",{className:"tile-grid-selector__grids"}),n=m("div",{className:"tile-grid-selector__grid",id:"tile-grid-1"}),o=m("div",{className:"tile-grid-selector__grid",id:"tile-grid-2"});return t.appendChild(n),t.appendChild(o),t}renderGrids(){const t=this.dropdown?.querySelector("#tile-grid-1"),n=this.dropdown?.querySelector("#tile-grid-2");if(!t||!n)return;t.innerHTML="",n.innerHTML="";const o=be.myGarden.get(),r=be.gameMap.get(),i=Do().get();if(!o.garden||!r)return;const a=o.mySlotIndex;if(a===null)return;const s=r.userSlots[a];if(!s)return;const l=s.dirtTiles,c=new Set(i.selectedTileIndices),d=o.garden.tileObjects,u=[...new Set(l.map(b=>b.position.x))].sort((b,S)=>b-S);let p=0,f=u[Math.floor(u.length/2)];for(let b=1;b<u.length;b++){const S=u[b]-u[b-1];S>p&&(p=S,f=(u[b]+u[b-1])/2);}const g=l.filter(b=>b.position.x<f),h=l.filter(b=>b.position.x>=f),y=b=>{if(b.length===0)return {minX:0,maxX:9,minY:0,maxY:9};const S=b.map(C=>C.position.x),_=b.map(C=>C.position.y);return {minX:Math.min(...S),maxX:Math.max(...S),minY:Math.min(..._),maxY:Math.max(..._)}},x=y(g),w=y(h),v=new Map,k=new Map;for(const b of g){const S=b.position.x-x.minX,_=b.position.y-x.minY;v.set(`${_},${S}`,b);}for(const b of h){const S=b.position.x-w.minX,_=b.position.y-w.minY;k.set(`${_},${S}`,b);}for(let b=0;b<10;b++)for(let S=0;S<10;S++){const _=v.get(`${b},${S}`)||null,C=this.buildTileElement(_,_&&d[_.localIndex.toString()]||null,_?c.has(_.localIndex.toString()):false);t.appendChild(C);}for(let b=0;b<10;b++)for(let S=0;S<10;S++){const _=k.get(`${b},${S}`)||null,C=this.buildTileElement(_,_&&d[_.localIndex.toString()]||null,_?c.has(_.localIndex.toString()):false);n.appendChild(C);}const T=this.dropdown?.querySelector(".tile-grid-selector__info");T&&(T.textContent=`${c.size} tile${c.size!==1?"s":""} selected`);}buildTileElement(t,n,o){const r=m("button",{className:"tile-grid-selector__tile"});if(!t)return r.classList.add("tile-grid-selector__tile--null"),r.disabled=true,r;if(o&&r.classList.add("tile-grid-selector__tile--selected"),n?r.classList.add("tile-grid-selector__tile--occupied"):r.classList.add("tile-grid-selector__tile--empty"),n&&Q.isReady()){const i=this.getSpriteForTileObject(n);i&&r.appendChild(i);}return r.addEventListener("pointerdown",i=>{i.preventDefault(),this.isDragging=true,this.dragSelectMode=o?"deselect":"select",Jl(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.();}),r.addEventListener("pointerenter",()=>{if(!this.isDragging||!this.dragSelectMode)return;const a=Do().get().selectedTileIndices.includes(t.localIndex.toString());this.dragSelectMode==="select"&&!a?(Jl(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.()):this.dragSelectMode==="deselect"&&a&&(Jl(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.());}),r}getSpriteForTileObject(t){try{if(t.objectType==="plant"){let n=t.species;if(n==="DawnCelestial"&&(n="DawnCelestialCrop"),n==="MoonCelestial"&&(n="MoonCelestialCrop"),Q.has("plant",n)){const o=Q.toCanvas("plant",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}else if(t.objectType==="egg"){const n=t.eggId;if(Q.has("pet",n)){const o=Q.toCanvas("pet",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}else if(t.objectType==="decor"){const n=t.decorId;if(Q.has("decor",n)){const o=Q.toCanvas("decor",n,{scale:.25});return o.style.height="100%",o.style.width="100%",o.style.objectFit="contain",o.style.imageRendering="pixelated",o}}}catch(n){console.warn("[TileGridSelector] Failed to load sprite:",n);}return null}}class FM{constructor(t){U(this,"card",null);U(this,"scopeControl",null);U(this,"scopeContainer",null);U(this,"content",null);U(this,"listContainer",null);U(this,"options");U(this,"tileGridOverlay",null);U(this,"expansionHandler");this.options=t,this.expansionHandler=new PM({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createCard()}destroy(){this.expansionHandler.destroy(),this.scopeControl&&(this.scopeControl.destroy(),this.scopeControl=null),this.tileGridOverlay&&(this.tileGridOverlay.destroy?.(),this.tileGridOverlay=null),this.card=null,this.scopeContainer=null,this.content=null,this.listContainer=null;}render(){if(!this.card)return;if(!he.isEnabled()){this.renderDisabledState();return}this.scopeContainer&&(this.scopeContainer.style.display="flex"),this.ensureScopeControl(),this.renderTeamList();}getListContainer(){return this.listContainer}createCard(){const t=m("div",{className:"tracker-card-wrapper"});this.scopeContainer=m("div",{className:"tracker-card__scope-container"}),t.appendChild(this.scopeContainer),this.content=m("div",{className:"tracker-card__content"}),t.appendChild(this.content);const n=Ne({title:"Trackers",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureScopeControl(){if(!this.scopeContainer)return;const t=Do().get();if(!this.scopeControl){this.scopeControl=Ci({segments:[{id:"all",label:"All Tiles"},{id:"selected",label:"Selected Tiles"}],selected:t.calculationScope,onChange:n=>{const o=n;NM(o),o==="selected"?this.showTileGridOverlay():this.tileGridOverlay?.hide(),this.renderTeamList();}}),this.scopeContainer.appendChild(this.scopeControl);return}this.scopeControl.getSelected()!==t.calculationScope&&this.scopeControl.select(t.calculationScope);}showTileGridOverlay(){this.tileGridOverlay||(this.tileGridOverlay=new $M({onChange:()=>{this.renderTeamList();},container:this.scopeContainer||void 0}),this.tileGridOverlay.build()),this.tileGridOverlay.show();}renderDisabledState(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.listContainer=null,this.scopeContainer&&(this.scopeContainer.style.display="none");const t=m("div",{className:"tracker-card__disabled-state"}),n=m("div",{textContent:"Pet Teams feature is not enabled",className:"tracker-card__disabled-message"});t.appendChild(n),this.content.replaceChildren(t);}renderTeamList(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.content.replaceChildren();const t=he.getAllTeams(),n=he.getActiveTeamId(),o=Do().get(),r=o.calculationScope==="selected"?new Set(o.selectedTileIndices):void 0;if(this.expansionHandler.setTileFilter(r),t.length===0){this.renderEmptyState();return}this.listContainer=m("div",{className:"tracker-card__list-container"}),t.forEach(i=>{const a=n===i.id,s=o.expandedTeamIds.includes(i.id),l=Ax({team:i,isActive:a,hideDragHandle:true,isNameEditable:false,isExpanded:s,onExpandClick:()=>{this.handleExpandToggle(i.id);}});l.setAttribute("data-team-id",i.id),l.addEventListener("click",c=>{c.stopPropagation();}),this.listContainer.appendChild(l),s&&this.expansionHandler.expand(i.id);}),this.content.appendChild(this.listContainer);}renderEmptyState(){if(!this.content)return;const t=m("div",{className:"tracker-card__empty-state"}),n=m("div",{textContent:"No teams created yet.",className:"tracker-card__empty-message"}),o=m("div",{textContent:"Create teams in the Pets tab to view trackers.",className:"tracker-card__empty-hint"});t.appendChild(n),t.appendChild(o),this.content.appendChild(t);}handleExpandToggle(t){RM(t),this.expansionHandler.toggle(t);const n=this.listContainer?.querySelector(`[data-team-id="${t}"]`);if(n){const o=Do().get().expandedTeamIds.includes(t),r=n.querySelector(".team-list-item__expand");r&&r.classList.toggle("team-list-item__expand--open",o);}}}const DM=`
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
`,BM=`
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
`,zM=`
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

`,GM=`
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
`,HM=`
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
`,jM=`
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
`;class UM extends Vt{constructor(n){super({id:"tab-trackers",label:"Trackers"});U(this,"deps");U(this,"trackerCardPart",null);U(this,"unsubscribeMyPets");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await ft(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>Zs);return {MGSprite:a}},void 0);await o.init(),await LM();const r=n.getRootNode();this.injectStyles(r);const i=this.createGrid("12px");i.id="trackers",n.appendChild(i),this.initializeTrackerCard(i),this.unsubscribeMyPets=be.myPets.subscribeStable(()=>{this.trackerCardPart?.render();});}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.trackerCardPart&&(this.trackerCardPart.destroy(),this.trackerCardPart=null);}unmount(){this.destroy().catch(console.error),super.unmount();}injectStyles(n){$e(n,DM,"tracker-card-styles"),$e(n,BM,"tile-grid-overlay-styles"),$e(n,zM,"team-card-styles"),$e(n,GM,"feature-card-styles"),$e(n,HM,"team-xp-panel-styles"),$e(n,jM,"growth-panel-styles"),$e(n,Px,"base-pet-card-styles"),$e(n,zu,"badge-styles"),$e(n,Mx,"arcade-button-styles"),$e(n,Ex,"gemini-icon-button-styles");}initializeTrackerCard(n){this.trackerCardPart||(this.trackerCardPart=new FM({setHUDOpen:this.deps?.setHUDOpen}));const o=this.trackerCardPart.build();n.appendChild(o),this.trackerCardPart.render();}}const WM=`
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
`;async function VM(){}const qM={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},Of={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},Uu={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},Wu={seed:"seed",tool:null,egg:null,decor:null},$f={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function XM(e,t){try{const n=Uu[t],o=J.get(n);if(!o||typeof o!="object")return null;const r=o[e];if(!r)return null;const i=Wu[t];return (i?r[i]:r)?.spriteId??null}catch(n){return console.warn(`[ShopNotifier] Failed to get spriteId for ${e}:`,n),null}}function KM(e,t){try{const n=Uu[t],o=J.get(n);if(!o||typeof o!="object")return null;const r=o[e];if(!r)return null;const i=Wu[t],s=(i?r[i]:r)?.rarity;return s?String(s).toLowerCase():null}catch{return null}}function YM(e,t){try{const n=Uu[t],o=J.get(n);if(!o||typeof o!="object")return e;const r=o[e];if(!r)return e;const i=Wu[t];return (i?r[i]:r)?.name??e}catch(n){return console.warn(`[ShopNotifier] Failed to get name for ${e}:`,n),e}}function JM(e){const n=Wt.getTrackedItems().filter(o=>o.shopType===e).map(o=>o.itemId);return new Set(n)}function Fx(e,t){const n=JM(t);return e.items.map(o=>({...o,rarity:KM(o.id,t),spriteId:XM(o.id,t),itemName:YM(o.id,t),isTracked:n.has(o.id)}))}function QM(e,t){const n=Fx(e,t);return Ti({columns:[{key:"icon",header:"",width:"40px",align:"center",sortable:false,render:i=>{const a=m("div",{className:"shop-item-icon"});if(i.spriteId){const s=Q.toCanvas(i.spriteId);s?(s.style.maxWidth="32px",s.style.maxHeight="32px",s.style.width="auto",s.style.height="auto",s.style.imageRendering="auto",s.style.display="block",a.appendChild(s)):a.textContent=Of[t];}else a.textContent=Of[t];return a}},{key:"itemName",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(i,a)=>i.itemName.localeCompare(a.itemName,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",width:"120px",align:"left",sortable:true,sortFn:(i,a)=>{const s=i.rarity?$f[i.rarity.toLowerCase()]??999:999,l=a.rarity?$f[a.rarity.toLowerCase()]??999:999;return s-l},render:i=>{const a=m("div",{className:"shop-item-rarity"}),s=er({variant:"rarity",rarity:i.rarity});return a.appendChild(s.root),a}},{key:"toggle",header:"Track",width:"60px",align:"center",sortable:false,render:i=>{const a=m("div",{className:"shop-item-toggle"}),s=_n({checked:i.isTracked,size:"sm",onChange:l=>{i.isTracked=l,l?Wt.addTrackedItem(t,i.id):Wt.removeTrackedItem(t,i.id);}});return a.appendChild(s.root),a}}],data:n,maxHeight:360,stickyHeader:true,zebra:true,compact:true,getRowId:i=>i.id})}function ZM(e){const{shopType:t}=e,n=co(),o=n.getShop(t);let r=null,i=null,a=null;function s(){return i=QM(o,t),r=Ne({id:`shop-card-${t}`,title:qM[t],expandable:true,defaultExpanded:true,stateKey:`shop-${t}`,variant:"soft",padding:"none",divider:false},i.root),r.classList.add(`shop-card--${t}`),r}function l(){if(!i)return;const d=n.getShop(t),u=Fx(d,t);i.setData(u);}function c(){a&&(a(),a=null),i&&(i.destroy(),i=null),r=null;}return a=n.subscribeStable(d=>{const u=d.byType[t];u&&JSON.stringify(o.items)!==JSON.stringify(u.items)&&(Object.assign(o,u),l());}),{root:s(),refresh:l,destroy:c}}const eL=["seed","tool","egg","decor"];class tL extends Vt{constructor(){super({id:"tab-shop-notifier",label:"Shop Alerts"});U(this,"sectionElement",null);U(this,"shopCards",new Map);}async build(n){await VM();const o=n.getRootNode();$e(o,WM,"shop-notifier-styles");const r=this.createGrid("12px");r.id="shop-notifier-section",this.sectionElement=r;const{MGData:i}=await ft(async()=>{const{MGData:a}=await Promise.resolve().then(()=>Zs);return {MGData:a}},void 0);await Promise.all([i.waitFor("plants"),i.waitFor("items"),i.waitFor("eggs"),i.waitFor("decor")]),this.buildParts(),n.appendChild(r);}render(n){super.render(n);}buildParts(){if(this.sectionElement)for(const n of eL){const o=ZM({shopType:n});this.shopCards.set(n,o),this.sectionElement.appendChild(o.root);}}async destroy(){for(const n of this.shopCards.values())n.destroy?.();this.shopCards.clear(),this.sectionElement=null;}}const nL=`
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
`,Ff={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function oL(){const e=await ro("tab-alerts",{version:1,defaults:Ff,sanitize:r=>({ui:{expandedCards:Go(Ff.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Go(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}const rL={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},Df={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},iL={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},aL={seed:"seed",tool:null,egg:null,decor:null},Bf={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function Vu(e,t,n){try{const o=iL[t],r=J.get(o);if(!r||typeof r!="object")return null;const i=r[e];if(!i||typeof i!="object")return null;const a=aL[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch(o){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,o),null}}function sL(e,t){return Vu(e,t,"spriteId")}function lL(e,t){const n=Vu(e,t,"rarity");return n?String(n).toLowerCase():null}function cL(e,t){return Vu(e,t,"name")??e}function dL(){const e=Wt.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function zf(e){const t=dL(),n=[],o=["seed","tool","egg","decor"];for(const r of o){const i=e.byType[r];if(i)for(const a of i.items){const s=`${r}:${a.id}`;n.push({...a,shopType:r,rarity:lL(a.id,r),spriteId:sL(a.id,r),itemName:cL(a.id,r),isTracked:t.has(s),hasCustomSound:ge.hasItemCustomSound("shop",a.id,r)});}}return n}const uL=`
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
`,pL={size:"md",closeOnBackdrop:true,closeOnEscape:true};function fL(e){const t={...pL,...e};let n=false,o=null,r=null,i=null,a=null,s=null;function l(){g(),t.onClose?.();}function c(T){t.closeOnBackdrop&&T.target===r&&l();}function d(T){t.closeOnEscape&&T.key==="Escape"&&l();}function u(){if(!i)return;const T=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),b=Array.from(i.querySelectorAll(T));if(b.length===0)return;const S=b[0],_=b[b.length-1];S.focus();const C=I=>{I.key==="Tab"&&(I.shiftKey?document.activeElement===S&&(I.preventDefault(),_.focus()):document.activeElement===_&&(I.preventDefault(),S.focus()));};i.addEventListener("keydown",C),a=()=>{i?.removeEventListener("keydown",C);};}function p(){o=m("div",{className:"modal-container"}),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-labelledby","modal-title");const T=m("style");T.textContent=uL,o.appendChild(T),r=m("div",{className:"modal-backdrop"}),r.addEventListener("click",c),o.appendChild(r),i=m("div",{className:`modal-dialog modal-dialog--${t.size}`});const b=m("div",{className:"modal-header"}),S=m("h2",{className:"modal-title",id:"modal-title"},t.title);b.appendChild(S);const _=m("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");_.addEventListener("click",l),b.appendChild(_),i.appendChild(b);const C=m("div",{className:"modal-body"});if(C.appendChild(t.content),i.appendChild(C),t.footer){const I=m("div",{className:"modal-footer"});I.appendChild(t.footer),i.appendChild(I);}return r.appendChild(i),o}function f(){if(!o)return;const T=o.getBoundingClientRect(),b=window.innerWidth,S=window.innerHeight;Math.abs(T.left)>1||Math.abs(T.top)>1||Math.abs(T.width-b)>1||Math.abs(T.height-S)>1?(o.style.left=`${-T.left}px`,o.style.top=`${-T.top}px`,o.style.width=`${b}px`,o.style.height=`${S}px`):(o.style.left="0px",o.style.top="0px",o.style.width="100%",o.style.height="100%");}function g(){!n||!o||(o.classList.remove("is-open"),n=false,a&&(a(),a=null),document.removeEventListener("keydown",d),s?.(),s=null,setTimeout(()=>{o?.remove();},200));}function h(){n&&g(),r?.removeEventListener("click",c),a&&(a(),a=null),document.removeEventListener("keydown",d),s?.(),s=null,o?.remove(),o=null,r=null,i=null;}const y=p();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(y),requestAnimationFrame(f);const k=()=>f();return window.addEventListener("resize",k),s=()=>{window.removeEventListener("resize",k);},requestAnimationFrame(()=>{o?.classList.add("is-open"),n=true,u(),document.addEventListener("keydown",d);}),{root:y,close:g,destroy:h}}function qu(e={}){const{id:t,min:n=0,max:o=100,step:r=1,value:i=n,label:a,showValue:s=true,disabled:l=false,onInput:c,onChange:d}=e,u=m("div",{className:"slider"}),p=m("div",{className:"slider-row"}),f=m("div",{className:"slider-track"}),g=m("div",{className:"slider-range"});f.appendChild(g);const h=m("input",{id:t,type:"range",min:String(n),max:String(o),step:String(r),value:String(i),disabled:l});h.addEventListener("input",S=>{x(),c?.(v(),S);}),h.addEventListener("change",S=>d?.(v(),S));function y(){const S=o-n;return S===0?0:(v()-n)/S}function x(){const S=Math.max(0,Math.min(1,y()));g.style.width=`${S*100}%`,b&&(b.textContent=String(v()));}function w(S){h.value=String(S),x();}function v(){return Number(h.value)}function k(S){h.disabled=!!S;}let T=null,b=null;return a&&(T=m("span",{className:"slider-label"},a),p.appendChild(T)),f.appendChild(h),p.appendChild(f),s&&(b=m("span",{className:"slider-value"},String(i)),p.appendChild(b)),u.append(p),x(),{root:u,input:h,setValue:w,getValue:v,setDisabled:k}}const Gf=`
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
`,gL={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},Hf={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},mL=220;function hL(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function bL(e){const t=hL();if(t){$e(t,Gf,"customSoundModal");return}const n=m("style");n.textContent=Gf,e.appendChild(n);}function Dx(e){const t={...gL,...e};let n=null,o=null,r=null,i=null,a=null,s=null,l=null,c=null,d=null,u=false,p=false,f=null;function g(){d?.(),d=null,c&&(c.pause(),c.currentTime=0),c=null,r?.setLabel("Play");}async function h(){if(c){g();return}if(!l)return;const z=ge.getById(l.soundId);if(!z){console.error(`[CustomSoundModal] Sound not found: ${l.soundId}`);return}const j=new Audio(z.source);j.volume=l.volume/100,c=j;const W=()=>{g();},Y=()=>{g(),console.error(`[CustomSoundModal] Failed to play sound: ${z.name}`);};j.addEventListener("ended",W),j.addEventListener("error",Y),d=()=>{j.removeEventListener("ended",W),j.removeEventListener("error",Y);};try{await j.play(),r?.setLabel("Stop");}catch(N){g(),console.error("[CustomSoundModal] Failed to play sound:",N);}}function y(){s&&l&&(s.textContent=Hf[l.mode]);}function x(){u||f!==null||(f=window.setTimeout(()=>{k();},mL));}function w(){u||p||(p=true,g(),t.onClose?.(),x());}function v(){u||(n?.close(),w());}function k(){u||(u=true,p=true,f!==null&&(window.clearTimeout(f),f=null),g(),o&&(o.destroy(),o=null),a&&(a.destroy(),a=null),i=null,r=null,s=null,l=null,n&&(n.destroy(),n=null));}function T(){const z=m("span",{className:"custom-sound-modal-title"});let j=false;if(e.spriteId)try{const Y=Q.toCanvas(e.spriteId);if(Y){const N=m("span",{className:"custom-sound-modal-title-icon"});Y.className="custom-sound-modal-title-sprite",N.appendChild(Y),z.appendChild(N),j=!0;}}catch{}if(!j&&e.icon){const Y=m("span",{className:"custom-sound-modal-title-icon"},e.icon);z.appendChild(Y);}const W=m("span",{className:"custom-sound-modal-title-text"},e.entityName);return z.appendChild(W),z}function b(){const z=m("div",{className:"custom-sound-modal-body"}),j=ge.getItemCustomSound(e.entityType,e.entityId,e.shopType),W=ge.getNotificationConfig(e.entityType);l=j?{soundId:j.soundId,volume:j.volume,mode:j.mode}:{soundId:W.soundId,volume:W.volume,mode:W.mode};const Y=ge.getAll().map(M=>({value:M.id,label:M.name})),N=m("div",{className:"custom-sound-modal-row"}),D=m("label",{className:"custom-sound-modal-label"},"Sound");N.appendChild(D);const H=m("div",{className:"custom-sound-modal-controls"});o=kn({value:l.soundId,options:Y,size:"sm",onChange:M=>{l&&(l.soundId=M),g();}}),H.appendChild(o.root),r=Oe({label:"Play",variant:"default",size:"sm",onClick:()=>h()}),H.appendChild(r),N.appendChild(H),z.appendChild(N);const G=m("div",{className:"custom-sound-modal-row"}),q=m("label",{className:"custom-sound-modal-label"},"Volume");G.appendChild(q),i=qu({min:0,max:100,step:1,value:l.volume,showValue:true,onChange:M=>{l&&(l.volume=M),c&&(c.volume=M/100);}}),G.appendChild(i.root),z.appendChild(G);const E=m("div",{className:"custom-sound-modal-row"}),P=m("label",{className:"custom-sound-modal-label"},"Mode");E.appendChild(P);const A=m("div",{className:"custom-sound-modal-mode-controls"});return a=kn({value:l.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:M=>{l&&(l.mode=M),y();}}),A.appendChild(a.root),s=m("div",{className:"custom-sound-modal-mode-description"},Hf[l.mode]),A.appendChild(s),E.appendChild(A),z.appendChild(E),z}function S(){const z=m("div",{className:"custom-sound-modal-footer"}),j=Oe({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),v();}});z.appendChild(j);const W=m("div",{style:"flex: 1"});z.appendChild(W);const Y=Oe({label:"Cancel",variant:"default",size:"sm",onClick:()=>v()});z.appendChild(Y);const N=Oe({label:"Save",variant:"primary",size:"sm",onClick:()=>{l&&e.onSave({...l}),v();}});return z.appendChild(N),z}const _=b(),C=S(),I=m("div");bL(I),I.appendChild(_),n=fL({title:e.entityName||t.title,content:I,footer:C,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:w}),n.root.classList.add("custom-sound-modal");const O=n.root.querySelector(".modal-title");return O&&O.replaceChildren(T()),{root:n.root,close:v,destroy:k}}const xL=["seed","tool","egg","decor"],yL=new Set(xL);function Ql(e){const[t,...n]=e.split(":");return !t||n.length===0||!yL.has(t)?null:{shopType:t,itemId:n.join(":")}}const vL=500,jf=10,wL=800;function SL(e){const{rows:t}=e,n=new Map;let o=null,r=false;const i=new Map;let a=null,s=null,l=null,c=null,d=null,u=false;function p(A,M){M?A.classList.add("has-custom-sound"):A.classList.remove("has-custom-sound");}function f(A){const M=Ql(A);return M?ge.hasItemCustomSound("shop",M.itemId,M.shopType):false}function g(A){if(!o)return null;const M=o.root.querySelectorAll(".lg-tr-body");for(const R of M)if(R.dataset.id===A)return R;return null}function h(A,M){const R=g(A);if(!R)return;const L=M??f(A);p(R,L);}function y(){if(!o)return;o.root.querySelectorAll(".lg-tr-body").forEach(M=>{const R=M.dataset.id;R&&p(M,f(R));});}function x(){r||(r=true,requestAnimationFrame(()=>{r=false,y();}));}function w(A){i.clear();for(const M of A)i.set(`${M.shopType}:${M.id}`,M);}function v(A){const M=Ql(A);return M?ge.hasItemCustomSound("shop",M.itemId,M.shopType):false}function k(A){const M=Ql(A);if(!M||!ge.hasItemCustomSound("shop",M.itemId,M.shopType))return;ge.removeItemCustomSound("shop",M.itemId,M.shopType);const R=i.get(A);R&&(R.hasCustomSound=false),h(A,false),x();}function T(){s!==null&&(window.clearTimeout(s),s=null),a=null;}function b(A){a=A,s!==null&&window.clearTimeout(s),s=window.setTimeout(()=>{s=null,a=null;},wL);}function S(){l!==null&&(window.clearTimeout(l),l=null),c=null,d=null,u=false;}if(o=Ti({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(A,M)=>A.itemName.localeCompare(M.itemName,void 0,{numeric:true,sensitivity:"base"}),render:A=>{const M=m("div",{className:"shop-item-cell"}),R=m("div",{className:"shop-item-icon"});if(A.spriteId){const F=Q.toCanvas(A.spriteId);F?(F.className="shop-item-sprite",R.appendChild(F)):R.textContent=Df[A.shopType];}else R.textContent=Df[A.shopType];const L=m("div",{className:"shop-item-name"});return L.textContent=A.itemName,M.appendChild(R),M.appendChild(L),M}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(A,M)=>{const R=A.rarity?Bf[A.rarity.toLowerCase()]??999:999,L=M.rarity?Bf[M.rarity.toLowerCase()]??999:999;return R-L},render:A=>{const M=m("div",{className:"shop-item-rarity"}),R=er({variant:"rarity",rarity:A.rarity});return M.appendChild(R.root),M}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:A=>{const M=m("div",{className:"shop-item-notify"}),R=df(A.id,A.shopType),L=_n({checked:A.isTracked,disabled:R,size:"sm",onChange:V=>{A.isTracked=V,V?Wt.addTrackedItem(A.shopType,A.id):Wt.removeTrackedItem(A.shopType,A.id);}}),F=`${A.shopType}:${A.id}`;return n.set(F,L),M.appendChild(L.root),M}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:A=>`${A.shopType}:${A.id}`,onSortChange:()=>{x();},onRowClick:(A,M,R)=>{const L=`${A.shopType}:${A.id}`;if(a){if(a===L){T();return}T();}R.target.closest(".shop-item-notify")||Dx({entityType:"shop",entityId:A.id,entityName:A.itemName,spriteId:A.spriteId,shopType:A.shopType,onSave:V=>{V===null?(ge.removeItemCustomSound("shop",A.id,A.shopType),A.hasCustomSound=false,h(L,false)):(ge.setItemCustomSound("shop",A.id,V,A.shopType),A.hasCustomSound=true,h(L,true));}});}}),!o)throw new Error("[ShopsCard] Failed to create items table");w(t);const C=o.root,I=A=>{const M=A.target;if(M.closest(".shop-item-notify"))return;const L=M.closest(".lg-tr-body")?.dataset.id;!L||!v(L)||(A.preventDefault(),A.stopPropagation(),b(L),k(L));},O=A=>{if(A.pointerType==="mouse"||A.button!==0)return;const M=A.target;if(M.closest(".shop-item-notify"))return;const L=M.closest(".lg-tr-body")?.dataset.id;!L||!v(L)||(S(),c=L,d={x:A.clientX,y:A.clientY},l=window.setTimeout(()=>{l=null,c&&(u=true,b(c),k(c));},vL));},z=A=>{if(!d||!c||u)return;const M=A.clientX-d.x,R=A.clientY-d.y;M*M+R*R>jf*jf&&S();},j=()=>{S();},W=()=>{S();};C.addEventListener("contextmenu",I),C.addEventListener("pointerdown",O),C.addEventListener("pointermove",z),C.addEventListener("pointerup",j),C.addEventListener("pointercancel",W);const Y=o.setData.bind(o);o.setData=A=>{w(A),Y(A),x();},x();const N=A=>{for(const[M,R]of n.entries()){const[L,F]=M.split(":");if(A&&L!==A)continue;const V=df(F,L);R.setDisabled(V);}},H=Nt().subscribeStable(()=>{N();}),G=Zo(),q=G.subscribeDecorPlaced(()=>{N("decor");}),E=G.subscribeDecorRemoved(()=>{N("decor");}),P=o.destroy.bind(o);return o.destroy=()=>{H(),q(),E(),C.removeEventListener("contextmenu",I),C.removeEventListener("pointerdown",O),C.removeEventListener("pointermove",z),C.removeEventListener("pointerup",j),C.removeEventListener("pointercancel",W),S(),T(),n.clear(),i.clear(),P();},o}function CL(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function kL(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=m("div",{className:"select"});for(const d of Array.from(e.classList))d.startsWith("select--")&&r.classList.add(d);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const i=m("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=m("span",{className:"select-value"},t),l=m("span",{className:"select-caret"},a);i.append(s,l),r.appendChild(i),o.appendChild(r);const c=Math.ceil(i.getBoundingClientRect().width);return r.remove(),c}function _L(e,t){const n=CL(t);if(!n)return;let o=0;const r=6,i=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(i);return}const a=kL(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function TL(e){const t=co(),n=t.get();let o=null,r=[],i=[];const a={selectedShopType:"all",searchQuery:""},s={shopTypeSelect:null,searchInput:null,tableHandle:null};let l=0,c=new Set;function d(y,x){if(y.size!==x.size)return  false;for(const w of y)if(!x.has(w))return  false;return  true}function u(){if(!s.tableHandle)return;const y=r.filter(x=>!(a.selectedShopType!=="all"&&x.shopType!==a.selectedShopType||a.searchQuery&&!x.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));i=y,s.tableHandle.setData(y);}function p(){const y=m("div",{className:"shops-card-filters"}),w=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(k=>({value:k,label:rL[k]}))];s.shopTypeSelect=kn({value:"all",options:w,size:"sm",onChange:k=>{a.selectedShopType=k,u();}});const v=s.shopTypeSelect.root;return v.style.minWidth="0",v.style.width="auto",_L(v,w.map(k=>k.label)),s.searchInput=Rs({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:k=>{a.searchQuery=k.trim(),u();}}),y.appendChild(s.shopTypeSelect.root),y.appendChild(s.searchInput.root),y}function f(){r=zf(n),i=[...r],l=r.length,c=new Set(r.map(T=>T.shopType));const y=m("div");s.tableHandle=SL({rows:i});const x=p();y.appendChild(x),y.appendChild(s.tableHandle.root);const w=m("div",{className:"shops-card-hint"}),v=m("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),k=m("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return w.append(v,k),y.appendChild(w),o=Ne({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},y),o}function g(){const y=t.get(),x=zf(y),w=x.length,v=new Set(x.map(T=>T.shopType));(w!==l||!d(v,c))&&(l=w,c=v,r=x,u());}function h(){if(s.tableHandle&&(s.tableHandle.destroy(),s.tableHandle=null),s.shopTypeSelect&&(s.shopTypeSelect.destroy(),s.shopTypeSelect=null),s.searchInput){const y=s.searchInput.root.__cleanup;y&&y(),s.searchInput=null;}o=null;}return {root:f(),refresh:g,destroy:h}}const AL=".mp3,.wav,.ogg,audio/*",EL=250*1024,IL=3;function PL(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function ML(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function LL(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function Bx(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function RL(e,t){const n=Bx(t);if(!n.length)return  true;const o=e.name.toLowerCase(),r=e.type.toLowerCase();return n.some(i=>{const a=i.toLowerCase();if(a.startsWith("."))return o.endsWith(a);if(a.endsWith("/*")){const s=a.slice(0,-1);return r.startsWith(s)}return r===a})}function NL(e){const n=Bx(e).map(o=>o.startsWith(".")?o.slice(1).toUpperCase():o.endsWith("/*")?"Audio":o.includes("/")&&o.split("/")[1]?.toUpperCase()||o.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function OL(e={}){const{id:t,className:n,label:o="Add sounds",hint:r,accept:i=AL,multiple:a=true,disabled:s=false,maxSizeBytes:l=EL,maxItems:c,emptyLabel:d="No sounds added yet",onItemsChange:u,onFilesAdded:p,onError:f}=e;let g=[],h=0,y=null,x=false,w=!!s,v=null,k=null,T=null;const b=new Map,S=new Map,_=Number.isFinite(c)?Math.max(1,Number(c)):a?Number.POSITIVE_INFINITY:1,C=m("div",{className:"sound-picker",id:t});n&&C.classList.add(...n.split(" ").filter(Boolean)),w&&C.classList.add("is-disabled");const I=m("div",{className:"sound-picker__header"}),O=m("div",{className:"sound-picker__label"},o),z=r??`${NL(i)} - Max ${LL(l)}`,j=m("div",{className:"sound-picker__hint"},z);I.append(O,j);const W=m("div",{className:"sound-picker__zone",role:"button",tabIndex:w?-1:0,"aria-disabled":String(w)}),Y=m("div",{className:"sound-picker__zone-text"}),N=m("div",{className:"sound-picker__zone-title"},"Drop audio files here"),D=m("div",{className:"sound-picker__zone-subtitle"},"or click to browse");Y.append(N,D);const H=Oe({label:a?"Choose files":"Choose file",size:"sm",onClick:B=>{B.preventDefault(),w||G.click();},disabled:w});H.classList.add("sound-picker__pick");const G=m("input",{className:"sound-picker__input",type:"file",accept:i,multiple:a?true:void 0,disabled:w,tabIndex:-1});W.append(Y,H,G);const q=m("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),E=m("div",{className:"sound-picker__list",role:"list"});C.append(I,W,q,E);function P(B,Z="info"){const ee=B??"";q.textContent=ee,q.classList.toggle("is-error",Z==="error");}function A(B){f?.(B),P(B.message,"error");}function M(){for(const B of b.values())try{B.destroy();}catch{}b.clear();}function R(B){const Z=S.get(B.id);if(Z)return Z;const ee=B.file.__sourceUrl;if(ee)return S.set(B.id,ee),ee;const se=URL.createObjectURL(B.file);return S.set(B.id,se),se}function L(B){const Z=S.get(B);Z&&(Z.startsWith("blob:")&&URL.revokeObjectURL(Z),S.delete(B));}function F(){T?.(),T=null,v&&(v.pause(),v.currentTime=0),v=null,k=null;}function V(){E.querySelectorAll(".sound-picker__item").forEach(Z=>{const ee=Z.dataset.id,se=Z.querySelector(".sound-picker__item-btn--play");if(!ee||!se)return;const oe=!!v&&k===ee&&!v.paused;se.textContent=oe?"Stop":"Play",Z.classList.toggle("is-playing",oe);});}function te(B){if(w)return;if(k===B.id){F(),V();return}F();const Z=R(B),ee=new Audio(Z);v=ee,k=B.id;const se=()=>{k===B.id&&(F(),V());},oe=()=>{k===B.id&&(F(),V(),A({code:"type",file:B.file,message:`Unable to play ${B.name}`}));};ee.addEventListener("ended",se),ee.addEventListener("error",oe),T=()=>{ee.removeEventListener("ended",se),ee.removeEventListener("error",oe);},ee.play().then(()=>{V();}).catch(()=>{F(),V(),A({code:"type",file:B.file,message:`Unable to play ${B.name}`});});}function ne(){if(M(),E.classList.toggle("is-scrollable",g.length>IL),!g.length){const Z=m("div",{className:"sound-picker__empty"});Z.append(typeof d=="string"?document.createTextNode(d):d),E.replaceChildren(Z);return}const B=g.map(Z=>ae(Z));if(E.replaceChildren(...B),y){const Z=b.get(y);Z&&requestAnimationFrame(()=>Z.focus());}V();}function ae(B){const Z=y===B.id,ee=m("div",{className:"sound-picker__item",role:"listitem","data-id":B.id}),se=m("div",{className:"sound-picker__item-top"});m("div",{className:"sound-picker__item-bottom"});const oe=m("div",{className:"sound-picker__item-name"});if(Z&&!w){const we=_i({value:B.name,blockGameKeys:true,onEnter:Re=>{je(B.id,Re);}});we.root.classList.add("sound-picker__rename"),we.input.classList.add("input--sm"),we.input.setAttribute("aria-label","Rename sound"),we.input.addEventListener("keydown",Re=>{Re.key==="Escape"&&(Re.preventDefault(),et());}),we.input.addEventListener("blur",()=>{if(x){x=false;return}je(B.id,we.getValue());}),b.set(B.id,we),oe.appendChild(we.root);}else {const we=m("div",{className:"sound-picker__item-label",title:B.name},B.name);oe.appendChild(we);}const ce=m("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(Z&&!w){const we=m("button",{className:"sound-picker__item-btn",type:"button",disabled:w},"Save");we.addEventListener("click",()=>{const Se=b.get(B.id);je(B.id,Se?.getValue()??B.name);});const Re=m("button",{className:"sound-picker__item-btn",type:"button",disabled:w},"Cancel");Re.addEventListener("pointerdown",()=>{x=true;}),Re.addEventListener("click",()=>et()),ce.append(we,Re);}else {const we=m("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:w},k===B.id?"Stop":"Play");we.addEventListener("click",()=>te(B));const Re=m("button",{className:"sound-picker__item-btn",type:"button",disabled:w},"Rename");Re.addEventListener("click",()=>{w||(y=B.id,ne());});const Se=m("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:w},"Remove");Se.addEventListener("click",()=>Ae(B.id)),ce.append(we,Re,Se);}return se.append(oe,ce),ee.append(se),ee}function fe(){return g.slice()}function xe(B){const Z=B.slice(),ee=new Set(Z.map(se=>se.id));for(const se of Array.from(S.keys()))ee.has(se)||L(se);k&&!ee.has(k)&&F(),g=Z,y=null,ne(),u?.(fe());}function Le(B){if(w)return;const Z=Array.from(B??[]);if(!Z.length)return;const ee=[],se=[];for(const Se of Z){if(i&&!RL(Se,i)){se.push({code:"type",file:Se,message:`Unsupported file type: ${Se.name}`});continue}if(Number.isFinite(l)&&Se.size>l){se.push({code:"size",file:Se,maxSizeBytes:l,message:`File too large: ${Se.name}`});continue}ee.push({id:PL(),file:Se,name:ML(Se),size:Se.size,type:Se.type});}if(!ee.length){se.length&&A(se[0]);return}const oe=a?g.slice():[],ce=Number.isFinite(_)?Math.max(0,_-oe.length):ee.length;if(ce<=0){A({code:"limit",message:`Maximum of ${Math.max(1,_)} files reached`});return}const we=ee.slice(0,ce),Re=a?oe.concat(we):we.slice(0,1);xe(Re),P(null),p?.(we.slice()),se.length&&A(se[0]);}function ve(B,Z){const ee=Z.trim();if(!ee){A({code:"name",message:"Name cannot be empty"});return}const se=g.map(oe=>oe.id===B?{...oe,name:ee}:oe);xe(se),P(null);}function je(B,Z){const ee=Z.trim();if(!ee){A({code:"name",message:"Name cannot be empty"});return}ve(B,ee);}function et(){y=null,P(null),ne();}function Ae(B){const Z=g.filter(ee=>ee.id!==B);xe(Z),P(null);}function tt(){F(),xe([]),P(null);}function Xt(B){w=!!B,C.classList.toggle("is-disabled",w),W.setAttribute("aria-disabled",String(w)),W.tabIndex=w?-1:0,G.disabled=w,H.setDisabled(w),w&&F(),ne();}function po(){w||G.click();}const En=B=>{if(w)return;const Z=B.target;Z&&Z.closest(".sound-picker__pick")||G.click();},In=B=>{w||(B.key==="Enter"||B.key===" ")&&(B.preventDefault(),G.click());},Wi=B=>{w||!B.dataTransfer||!B.dataTransfer.types.includes("Files")||(B.preventDefault(),h+=1,W.classList.add("is-dragover"));},Vi=B=>{w||!B.dataTransfer||!B.dataTransfer.types.includes("Files")||(B.preventDefault(),B.dataTransfer.dropEffect="copy");},qi=B=>{w||W.classList.contains("is-dragover")&&(B.preventDefault(),h=Math.max(0,h-1),h<=0&&(h=0,W.classList.remove("is-dragover")));},Xi=B=>{w||!B.dataTransfer||!B.dataTransfer.files.length||(B.preventDefault(),h=0,W.classList.remove("is-dragover"),Le(B.dataTransfer.files));},ie=()=>{if(w){G.value="";return}G.files&&Le(G.files),G.value="";};return W.addEventListener("click",En),W.addEventListener("keydown",In),W.addEventListener("dragenter",Wi),W.addEventListener("dragover",Vi),W.addEventListener("dragleave",qi),W.addEventListener("drop",Xi),G.addEventListener("change",ie),ne(),{root:C,getItems:fe,setItems:xe,addFiles:Le,renameItem:ve,removeItem:Ae,clear:tt,setDisabled:Xt,openPicker:po,setStatus:P,destroy(){M(),F();for(const B of Array.from(S.keys()))L(B);W.removeEventListener("click",En),W.removeEventListener("keydown",In),W.removeEventListener("dragenter",Wi),W.removeEventListener("dragover",Vi),W.removeEventListener("dragleave",qi),W.removeEventListener("drop",Xi),G.removeEventListener("change",ie),C.remove();}}}const Uf={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function $L(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function FL(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=m("div",{className:"select"});for(const d of Array.from(e.classList))d.startsWith("select--")&&r.classList.add(d);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const i=m("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=m("span",{className:"select-value"},t),l=m("span",{className:"select-caret"},a);i.append(s,l),r.appendChild(i),o.appendChild(r);const c=Math.ceil(i.getBoundingClientRect().width);return r.remove(),c}function DL(e,t){const n=$L(t);if(!n)return;let o=0;const r=6,i=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(i);return}const a=FL(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function BL(e){let t=null,n=null,o=null;const r=new Map,i=new Map,a=new Map;let s=null,l=null,c=null;function d(){c?.(),c=null,s&&(s.pause(),s.currentTime=0),s=null,l=null;}function u(){if(!o)return;o.querySelectorAll(".notification-item").forEach(b=>{const S=b.dataset.type,_=b.querySelector(".notification-item-play");if(!S||!_)return;const C=!!s&&l===S&&!s.paused;_.textContent=C?"Stop":"Play",b.classList.toggle("is-playing",C);});}async function p(T){if(l===T){d(),u();return}d();const b=ge.getNotificationConfig(T),S=ge.getById(b.soundId);if(!S){console.error(`[SettingCard] Sound not found: ${b.soundId}`);return}const _=new Audio(S.source);_.volume=b.volume/100,s=_,l=T;const C=()=>{l===T&&(d(),u());},I=()=>{l===T&&(d(),u(),console.error(`[SettingCard] Failed to play sound: ${S.name}`));};_.addEventListener("ended",C),_.addEventListener("error",I),c=()=>{_.removeEventListener("ended",C),_.removeEventListener("error",I);};try{await _.play(),u();}catch(O){d(),u(),console.error("[SettingCard] Failed to play sound:",O);}}function f(T,b){if(T.startsWith("data:"))try{const S=T.split(","),_=S[0].match(/:(.*?);/)?.[1]||"audio/mpeg",C=atob(S[1]),I=C.length,O=new Uint8Array(I);for(let z=0;z<I;z++)O[z]=C.charCodeAt(z);return new File([O],b,{type:_})}catch(S){return console.error("[SettingCard] Failed to convert data URL to File:",S),new File([],b,{type:"audio/mpeg"})}return new File([],b,{type:"audio/mpeg"})}function g(){const b=ge.getAll().map(S=>({value:S.id,label:S.name}));for(const[S,_]of r){const C=ge.getNotificationConfig(S);_.setOptions(b),_.setValue(C.soundId);}}function h(T,b,S){const _=m("div",{className:"notification-item","data-type":T}),C=m("div",{className:"notification-item-label"},b);_.appendChild(C);const I=m("div",{className:"notification-item-description"},S);_.appendChild(I);const O=m("div",{className:"notification-item-controls"}),z=ge.getNotificationConfig(T),W=ge.getAll().map(P=>({value:P.id,label:P.name})),Y=kn({value:z.soundId,options:W,size:"sm",onChange:P=>{const A=ge.getNotificationConfig(T);ge.setNotificationConfig(T,{soundId:P,volume:A.volume,mode:A.mode});}});r.set(T,Y);const N=m("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");N.addEventListener("click",()=>{p(T);}),O.appendChild(Y.root),O.appendChild(N),_.appendChild(O);const D=qu({min:0,max:100,step:1,value:z.volume,showValue:true,onChange:P=>{const A=ge.getNotificationConfig(T);ge.setNotificationConfig(T,{soundId:A.soundId,volume:P,mode:A.mode});}});a.set(T,D),_.appendChild(D.root);const H=m("div",{className:"notification-mode-row"}),G=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],q=kn({value:z.mode,options:G,size:"sm",onChange:P=>{const A=ge.getNotificationConfig(T);ge.setNotificationConfig(T,{soundId:A.soundId,volume:A.volume,mode:P}),y(T);}});i.set(T,q),q.root.classList.add("shrink"),DL(q.root,G.map(P=>P.label)),H.appendChild(q.root);const E=m("div",{className:"notification-mode-description"},Uf[T][z.mode]);return H.appendChild(E),_.appendChild(H),_}function y(T){if(!o)return;const b=o.querySelector(`[data-type="${T}"]`);if(!b)return;const S=ge.getNotificationConfig(T),_=b.querySelector(".notification-mode-description");_&&(_.textContent=Uf[T][S.mode]);}function x(){const T=m("div",{className:"alerts-settings-body"});ge.init(),o=m("div",{className:"notification-settings"}),o.appendChild(h("shop","Shops restock","Default sound for shop restock alerts")),o.appendChild(h("pet","Pet events","Default sound for pet event alerts")),o.appendChild(h("weather","Weather events","Default sound for weather event alerts")),T.appendChild(o);const b=m("div",{className:"alerts-settings-divider"});T.appendChild(b);const S=ge.getAll().map(_=>{const C=f(_.source,_.name);return C.__sourceUrl=_.source,{id:_.id,file:C,name:_.name,size:0,type:_.type}});return n=OL({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:Uo.MAX_SOUNDS,maxSizeBytes:Uo.MAX_SIZE_BYTES,multiple:true,onItemsChange:_=>{w(_),g();},onFilesAdded:_=>{v(_),setTimeout(()=>{g();},100);}}),n.setItems(S),T.appendChild(n.root),t=Ne({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},T),t}function w(T){const b=new Set(ge.getAll().map(C=>C.id)),S=new Set(T.map(C=>C.id)),_=[];for(const C of b)if(!S.has(C)){_.push(C);try{ge.remove(C);}catch(I){console.error(`[SettingCard] Failed to remove sound ${C}:`,I);}}if(_.length>0){const C=["shop","pet","weather"];for(const I of C){const O=ge.getNotificationConfig(I);if(_.includes(O.soundId)){ge.setNotificationConfig(I,{soundId:"default-notification",volume:O.volume,mode:O.mode});const z=a.get(I);z&&z.setValue(O.volume);}}}for(const C of T)if(b.has(C.id)){const I=ge.getById(C.id);if(I&&I.name!==C.name)try{ge.update(C.id,{name:C.name});}catch(O){console.error(`[SettingCard] Failed to rename sound ${C.id}:`,O);}}}function v(T){for(const b of T)if(!ge.getById(b.id)){const S=new FileReader;S.onload=_=>{const C=_.target?.result;try{const I=ge.add(b.name,C,"upload");if(n&&I.id!==b.id){const O=n.getItems().map(z=>z.id===b.id?{...z,id:I.id}:z);n.setItems(O);}}catch(I){console.error(`[SettingCard] Failed to add sound ${b.name}:`,I);}},S.onerror=()=>{console.error(`[SettingCard] Failed to read file ${b.name}`);},S.readAsDataURL(b.file);}}function k(){d(),n&&(n.destroy(),n=null);for(const T of r.values())T.destroy();r.clear();for(const T of i.values())T.destroy();i.clear(),a.clear(),t=null;}return {root:x(),destroy:k}}function zL(e){try{const t=J.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function GL(e){try{const t=J.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function HL(e){try{const t=J.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const o=n.mutator;if(!o||typeof o!="object")return "No effects";const r=o.mutation;if(!r)return "No effects";const i=J.get("mutations");if(!i||typeof i!="object")return r;const a=i[r];return !a||typeof a!="object"?r:a.name||r}catch{return "No effects"}}function Wf(){const e=J.get("weather");if(!e||typeof e!="object")return [];const t=Ko.getTrackedWeathers(),n=new Set(t),o=[];for(const r of Object.keys(e)){if(r==="Sunny")continue;const i={weatherId:r,weatherName:zL(r),spriteId:GL(r),effects:HL(r),isTracked:n.has(r),hasCustomSound:ge.hasItemCustomSound("weather",r)};o.push(i);}return o.sort((r,i)=>r.weatherName.localeCompare(i.weatherName)),o}const jL=500,Vf=10,UL=800;function WL(e){const{rows:t}=e;let n=null,o=false;const r=new Map;let i=null,a=null,s=null,l=null,c=null,d=false;function u(N,D){D?N.classList.add("has-custom-sound"):N.classList.remove("has-custom-sound");}function p(N){return ge.hasItemCustomSound("weather",N)}function f(N){if(!n)return null;const D=n.root.querySelectorAll(".lg-tr-body");for(const H of D)if(H.dataset.id===N)return H;return null}function g(N,D){const H=f(N);if(!H)return;const G=D??p(N);u(H,G);}function h(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(D=>{const H=D.dataset.id;H&&u(D,p(H));});}function y(){o||(o=true,requestAnimationFrame(()=>{o=false,h();}));}function x(N){r.clear();for(const D of N)r.set(D.weatherId,D);}function w(N){return ge.hasItemCustomSound("weather",N)}function v(N){if(!ge.hasItemCustomSound("weather",N))return;ge.removeItemCustomSound("weather",N);const D=r.get(N);D&&(D.hasCustomSound=false),g(N,false),y();}function k(){a!==null&&(window.clearTimeout(a),a=null),i=null;}function T(N){i=N,a!==null&&window.clearTimeout(a),a=window.setTimeout(()=>{a=null,i=null;},UL);}function b(){s!==null&&(window.clearTimeout(s),s=null),l=null,c=null,d=false;}if(n=Ti({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(N,D)=>N.weatherName.localeCompare(D.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:N=>{const D=m("div",{className:"weather-item-cell"}),H=m("div",{className:"weather-item-icon"});if(N.spriteId){const q=Q.toCanvas(N.spriteId);q?(q.className="weather-item-sprite",H.appendChild(q)):H.textContent=qf(N.weatherId);}else H.textContent=qf(N.weatherId);const G=m("div",{className:"weather-item-name"});return G.textContent=N.weatherName,D.appendChild(H),D.appendChild(G),D}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:N=>{const D=m("div",{className:"weather-item-effects"});return D.textContent=N.effects,D}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:N=>{const D=m("div",{className:"weather-item-notify"}),H=_n({checked:N.isTracked,disabled:false,size:"sm",onChange:G=>{N.isTracked=G,G?Ko.addTrackedWeather(N.weatherId):Ko.removeTrackedWeather(N.weatherId);}});return D.appendChild(H.root),D}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:N=>N.weatherId,onSortChange:()=>{y();},onRowClick:(N,D,H)=>{const G=N.weatherId;if(i){if(i===G){k();return}k();}H.target.closest(".weather-item-notify")||Dx({entityType:"weather",entityId:N.weatherId,entityName:N.weatherName,spriteId:N.spriteId,onSave:E=>{E===null?(ge.removeItemCustomSound("weather",N.weatherId),N.hasCustomSound=false,g(G,false)):(ge.setItemCustomSound("weather",N.weatherId,E),N.hasCustomSound=true,g(G,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");x(t);const _=n.root,C=N=>{const D=N.target;if(D.closest(".weather-item-notify"))return;const G=D.closest(".lg-tr-body")?.dataset.id;!G||!w(G)||(N.preventDefault(),N.stopPropagation(),T(G),v(G));},I=N=>{if(N.pointerType==="mouse"||N.button!==0)return;const D=N.target;if(D.closest(".weather-item-notify"))return;const G=D.closest(".lg-tr-body")?.dataset.id;!G||!w(G)||(b(),l=G,c={x:N.clientX,y:N.clientY},s=window.setTimeout(()=>{s=null,l&&(d=true,T(l),v(l));},jL));},O=N=>{if(!c||!l||d)return;const D=N.clientX-c.x,H=N.clientY-c.y;D*D+H*H>Vf*Vf&&b();},z=()=>{b();},j=()=>{b();};_.addEventListener("contextmenu",C),_.addEventListener("pointerdown",I),_.addEventListener("pointermove",O),_.addEventListener("pointerup",z),_.addEventListener("pointercancel",j);const W=n.setData.bind(n);n.setData=N=>{x(N),W(N),y();},y();const Y=n.destroy.bind(n);return n.destroy=()=>{_.removeEventListener("contextmenu",C),_.removeEventListener("pointerdown",I),_.removeEventListener("pointermove",O),_.removeEventListener("pointerup",z),_.removeEventListener("pointercancel",j),b(),k(),r.clear(),Y();},n}function qf(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function VL(e){let t=null,n=[];const o={tableHandle:null};let r=0;function i(){n=Wf(),r=n.length;const l=m("div");o.tableHandle=WL({rows:n}),l.appendChild(o.tableHandle.root);const c=m("div",{className:"weather-card-hint"}),d=m("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),u=m("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return c.append(d,u),l.appendChild(c),t=Ne({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},l),t}function a(){const l=Wf(),c=l.length;c!==r&&(r=c,n=l,o.tableHandle?.setData(l));}function s(){o.tableHandle&&(o.tableHandle.destroy(),o.tableHandle=null),t=null;}return {root:i(),refresh:a,destroy:s}}function qL(e){let t=null,n=null;function o(){const i=m("div",{className:"pet-card-body"}),a=m("div",{className:"pet-card-row"}),s=md({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=_n({checked:Si.isEnabled(),onChange:l=>{Si.setEnabled(l);}}),a.appendChild(s.root),a.appendChild(n.root),i.appendChild(a),t=Ne({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},i),t}function r(){n&&(n.destroy(),n=null),t=null;}return {root:o(),destroy:r}}class XL extends Vt{constructor(){super({id:"tab-alerts",label:"Alerts"});U(this,"sectionElement",null);U(this,"state",null);U(this,"settingCard",null);U(this,"shopsCard",null);U(this,"weatherCard",null);U(this,"petCard",null);}async build(n){this.state=await oL();const o=n.getRootNode();$e(o,nL,"alerts-styles");const r=this.createGrid("12px");r.id="alerts-section",this.sectionElement=r;const{MGData:i}=await ft(async()=>{const{MGData:c}=await Promise.resolve().then(()=>Zs);return {MGData:c}},void 0),a=["plants","items","eggs","decor","weather","mutations"],s=await Promise.allSettled(a.map(c=>i.waitFor(c))),l=a.filter((c,d)=>s[d]?.status==="rejected");l.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",l.join(", ")),this.buildParts(),n.appendChild(r);}render(n){const o=this.shopsCard,r=this.weatherCard,i=this.petCard,a=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=o,this.weatherCard=r,this.petCard=i,this.settingCard=a;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=TL({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:o=>this.state.setCardExpanded("shops",o)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=qL({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:o=>this.state.setCardExpanded("pet",o)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=VL({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:o=>this.state.setCardExpanded("weather",o)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=BL({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:o=>this.state.setCardExpanded("settings",o)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const KL={Store:{select:ke.select.bind(ke),set:ke.set.bind(ke),subscribe:ke.subscribe.bind(ke),subscribeImmediate:ke.subscribeImmediate.bind(ke)},Globals:be,Modules:{Version:wd,Assets:io,Manifest:nn,Data:J,Environment:ot,CustomModal:To,Sprite:Q,Tile:an,Pixi:js,Audio:De,Cosmetic:Zd,Calculators:hh,ShopActions:Hn},Features:{AutoFavorite:Ah,Journal:qe,BulkFavorite:Hc,Achievements:yE,Tracker:Q2,AntiAfk:Po,Pets:Z2,PetTeam:he,XPTracker:Wc,CropValueIndicator:Ua,CropSizeIndicator:qa,ShopNotifier:Wt,WeatherNotifier:Ko,PetHungerNotifier:Si,AriesAPI:Ps,HarvestLocker:Yt},WebSocket:{chat:e1,emote:t1,wish:n1,kickPlayer:o1,setPlayerData:qs,usurpHost:r1,reportSpeakingStart:i1,setSelectedGame:a1,voteForGame:s1,requestGame:l1,restartGame:c1,ping:d1,checkWeatherStatus:f1,move:u1,playerPosition:ih,teleport:p1,moveInventoryItem:g1,dropObject:m1,pickupObject:h1,toggleFavoriteItem:Xs,putItemInStorage:Wd,retrieveItemFromStorage:Vd,moveStorageItem:b1,logItems:x1,plantSeed:y1,waterPlant:v1,harvestCrop:w1,sellAllCrops:S1,purchaseDecor:qd,purchaseEgg:Xd,purchaseTool:Kd,purchaseSeed:Yd,plantEgg:C1,hatchEgg:k1,plantGardenPlant:_1,potPlant:T1,mutationPotion:A1,pickupDecor:E1,placeDecor:I1,removeGardenObject:P1,placePet:ah,feedPet:M1,petPositions:L1,swapPet:sh,storePet:lh,namePet:R1,sellPet:N1},_internal:{getGlobals:Kt,initGlobals:vh,destroyGlobals:bT}};function YL(){const e=X;e.Gemini=KL,e.MGSprite=Q,e.MGData=J,e.MGPixi=js,e.MGAssets=io,e.MGEnvironment=ot;}const JL={lastSelectedSlot:"bottom"};async function QL(){const e=await ro("tab-avatar-ui",{version:1,defaults:JL}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const o=e.get();t.forEach(r=>r(o));},subscribe:n=>(t.push(n),()=>{const o=t.indexOf(n);o!==-1&&t.splice(o,1);})}}const Xf=`
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
`;class ZL extends Vt{constructor(){super({id:"tab-avatar",label:"Avatar"});U(this,"previewOutfit",{top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png"});U(this,"previewContainer",null);U(this,"menuContainer",null);U(this,"menuCard",null);U(this,"loadoutsContainer",null);U(this,"currentSlot",null);U(this,"uiState",null);U(this,"cleanups",[]);}async build(n){const[o,r,i]=await Promise.all([Ud(),QL(),ai().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"}))]);this.uiState=r,this.previewOutfit={top:i.top,mid:i.mid,bottom:i.bottom,expression:i.expression},Gk().catch(v=>console.warn("[AvatarSection] Discovery failed:",v)),gn.init();const a=this.createContainer("avatar-section"),s=n.getRootNode();if(s instanceof ShadowRoot)$e(s,Xf,"avatar-section-styles");else {const v=m("style");v.textContent=Xf,a.appendChild(v);}n.appendChild(a);const l=m("div",{className:"avatar-main-layout"});a.appendChild(l);const c=m("div",{className:"avatar-slots-column"});l.appendChild(c),[{label:"Expression",key:"expression"},{label:"Top (Hat)",key:"top"},{label:"Mid (Face)",key:"mid"},{label:"Bottom (Outfit)",key:"bottom"}].forEach(v=>{const k=Oe({label:v.label,fullWidth:true,size:"sm",onClick:()=>this.showMenu(v.key)});c.appendChild(k);});const u=m("div",{className:"avatar-action-group"});c.appendChild(u);const p=Oe({label:"Apply to World",variant:"primary",fullWidth:true,onClick:async()=>{p.setLoading(true),await Qd(this.previewOutfit),p.setLoading(false),p.setLabel("Success!"),setTimeout(()=>p.setLabel("Apply to World"),2e3);}});u.appendChild(p);const f=Oe({label:"Reset",variant:"danger",fullWidth:true,size:"sm",onClick:async()=>{await dh();const v=await ai();this.previewOutfit={...v},this.updatePreview();}});u.appendChild(f);const g=m("div",{className:"avatar-preview-area"});l.appendChild(g);const h=Ne({title:"Live Preview",variant:"soft"});this.previewContainer=m("div",{className:"avatar-preview-box"}),h.querySelector(".card-body")?.appendChild(this.previewContainer),g.appendChild(h),this.updatePreview(),this.menuCard=Ne({title:"Select Item",variant:"outline"}),this.menuCard.className+=" avatar-selection-area",this.menuContainer=m("div",{className:"avatar-items-grid"}),this.menuCard.querySelector(".card-body")?.appendChild(this.menuContainer),this.menuCard.style.display="none",a.appendChild(this.menuCard);const y=m("div",{className:"avatar-loadouts-area"});a.appendChild(y);const x=m("div",{className:"loadout-header-row"});y.appendChild(x),x.appendChild(m("h3",{className:"loadout-title"},"Saved Outfits"));const w=Oe({label:"+ Save Current",size:"sm",onClick:()=>this.handleSaveCurrent()});x.appendChild(w),this.loadoutsContainer=m("div",{className:"avatar-loadouts-grid"}),y.appendChild(this.loadoutsContainer),this.cleanups.push(gn.subscribe(()=>this.renderLoadouts())),this.renderLoadouts();}updatePreview(){if(!this.previewContainer)return;this.previewContainer.innerHTML="";const n=ii();[{f:this.previewOutfit.bottom,z:1},{f:this.previewOutfit.mid,z:2},{f:this.previewOutfit.top,z:3},{f:this.previewOutfit.expression,z:4}].forEach(r=>{const i=r.f===Ec;if(!r.f||r.f.includes("_Blank.png")||i)return;const a=m("img",{src:`${n}${r.f}`,className:"avatar-preview-layer",style:{zIndex:String(r.z)},onerror:()=>a.style.display="none"});this.previewContainer.appendChild(a);});}async showMenu(n){if(!this.menuContainer||!this.menuCard)return;this.currentSlot=n;const o={top:"Top",mid:"Mid",bottom:"Bottom",expression:"Expression"},r=await nh({type:o[n]});this.menuContainer.innerHTML="",this.menuCard.style.display="block";const i=this.menuCard.querySelector(".card-title");i&&(i.textContent=`Selection: ${o[n]} (${r.length-1} variants)`),r.forEach(a=>{const s=this.previewOutfit[n]===a.filename,l=a.displayName==="None",c=m("div",{className:`avatar-item-btn ${s?"active":""}`,"data-filename":a.filename||"null",onclick:()=>this.selectItem(a)});if(l)c.appendChild(m("div",{className:"none-placeholder"},"∅"));else {const d=m("img",{src:a.url,className:"avatar-item-img",onerror:()=>d.style.display="none"});c.appendChild(d);}c.appendChild(m("div",{className:"avatar-item-label"},l?"None":a.displayName)),this.menuContainer.appendChild(c);}),this.menuCard.scrollIntoView({behavior:"smooth",block:"start"});}selectItem(n){!this.currentSlot||!this.menuContainer||(this.previewOutfit[this.currentSlot]=n.filename,this.updatePreview(),this.menuContainer.querySelectorAll(".avatar-item-btn").forEach(o=>{const r=o.getAttribute("data-filename")===(n.filename||"null");o.classList.toggle("active",r);}));}renderLoadouts(){if(!this.loadoutsContainer)return;this.loadoutsContainer.innerHTML="";const n=gn.get();if(n.length===0){this.loadoutsContainer.innerHTML='<div style="grid-column: 1/-1; opacity: 0.5; text-align: center; padding: 20px;">No outfits saved yet.</div>';return}n.forEach(o=>{const r=m("div",{className:"loadout-card"}),i=m("div",{className:"loadout-mini-preview"}),a=ii();[{f:o.bottom,z:1},{f:o.mid,z:2},{f:o.top,z:3},{f:o.expression,z:4}].forEach(p=>{const f=p.f===Ec;if(!p.f||p.f.includes("_Blank.png")||f)return;const g=m("img",{src:`${a}${p.f}`,className:"loadout-mini-layer",style:{zIndex:String(p.z)},onerror:()=>g.style.display="none"});i.appendChild(g);}),r.appendChild(i);const l=m("div",{className:"loadout-header"}),c=_i({value:o.name,placeholder:"Unnamed Outfit",mode:"alphanumeric",allowSpaces:true,maxLength:24,blockGameKeys:true,onChange:p=>{gn.rename(o.id,p);}});c.input.addEventListener("keydown",p=>p.stopPropagation(),true),c.input.addEventListener("keyup",p=>p.stopPropagation(),true),c.input.addEventListener("keypress",p=>p.stopPropagation(),true),c.root.classList.add("loadout-name-input"),l.appendChild(c.root);const d=m("div",{className:"icon-btn",onclick:p=>{p.stopPropagation(),confirm("Delete this outfit?")&&gn.delete(o.id);}},"🗑️");l.appendChild(d),r.appendChild(l);const u=Oe({label:"Wear",size:"sm",fullWidth:true,onClick:async()=>{u.setLoading(true),await gn.wear(o.id),this.previewOutfit={top:o.top,mid:o.mid,bottom:o.bottom,expression:o.expression},this.updatePreview(),u.setLoading(false);}});r.appendChild(u),this.loadoutsContainer.appendChild(r);});}async handleSaveCurrent(){await gn.save("",this.previewOutfit),setTimeout(()=>{if(!this.loadoutsContainer)return;const n=this.loadoutsContainer.querySelectorAll(".loadout-card"),r=n[n.length-1]?.querySelector("input");r&&(r.focus(),r.select());},100);}async destroy(){this.cleanups.forEach(n=>n()),this.cleanups=[],super.destroy();}}const rd={ui:{expandedCards:{public:true}}};async function eR(){const e=await ro("tab-room",{version:1,defaults:rd,sanitize:r=>({ui:{expandedCards:Go(rd.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Go(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}const tR=`
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
`;function nR(e){return /^I-\d+-GC-\d+-\d+$/.test(e)?"discord":"web"}function oR(e){const t=m("span",{className:`rooms-list__badge rooms-list__badge--${e}`});return t.textContent=e==="discord"?"Discord":"Web",t}function rR(e,t=16){return e.length<=t?e:`${e.slice(0,t)}...`}function iR(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,e}function aR(e,t){const n=t==="all"?e:e.filter(o=>o.playerCount<o.maxPlayers);switch(t){case "5-6":return n.filter(o=>o.playerCount>=5);case "4":return n.filter(o=>o.playerCount===4);case "1-3":return n.filter(o=>o.playerCount>=1&&o.playerCount<=3);default:return n}}function sR(e){const t=l=>l.toString().padStart(2,"0"),n=t(e.getHours()),o=t(e.getMinutes()),r=t(e.getSeconds()),i=t(e.getDate()),a=t(e.getMonth()+1),s=e.getFullYear();return `${i}/${a}/${s} ${n}:${o}:${r}`}function lR(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 50 50"),e.setAttribute("width","50"),e.setAttribute("height","50"),e.innerHTML=`
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `,e}function cR(e={}){const{rooms:t=[],onJoinRoom:n,onCopyRoomId:o,onRefresh:r,emptyMessage:i="No rooms available",joinEnabled:a=false,initialFilter:s="5-6",onFilterChange:l}=e;let c=s,d=t;const u=m("div",{className:"rooms-list"}),p=m("style");p.textContent=tR,u.appendChild(p);const f=m("div",{className:"rooms-list__header-bar"}),h=kn({options:[{value:"5-6",label:"5-6 players"},{value:"4",label:"4 players"},{value:"1-3",label:"1-3 players"},{value:"all",label:"All"}],value:s,onChange:j=>{c=j,l?.(c),O(d);}});f.appendChild(h.root);const y=Oe({label:"Refresh rooms",variant:"default",size:"sm",iconLeft:"",onClick:()=>{r?.();}});f.appendChild(y),u.appendChild(f);const x=m("div",{style:"position: relative;"}),w=m("div",{className:"rooms-list__container"});x.appendChild(w);const v=m("div",{className:"rooms-list__loading-overlay"});v.style.display="none";const k=lR();v.appendChild(k),x.appendChild(v),u.appendChild(x);const T=m("div",{className:"rooms-list__footer"}),b=m("div",{className:"rooms-list__aries-badge"});b.textContent="Powered by Aries",T.appendChild(b);const S=m("div",{className:"rooms-list__timestamp"});S.style.display="none",T.appendChild(S),u.appendChild(T);const _=[h,{remove:()=>y.remove()}],C=[];function I(j){const W=nR(j.id),Y=m("div",{className:"rooms-list__item"}),N=m("div",{className:"rooms-list__top-row"}),D=oR(W);N.appendChild(D);const H=m("span",{className:"rooms-list__id"});H.textContent=rR(j.id,20),H.title=j.id,N.appendChild(H);const G=iR(),q=m("button",{className:"rooms-list__copy-btn"});q.type="button",q.title="Copy room ID",q.appendChild(G),q.addEventListener("click",F=>{F.stopPropagation(),o?.(j.id);}),N.appendChild(q),Y.appendChild(N);const E=m("div",{className:"rooms-list__bottom-row"}),P=m("div",{className:"rooms-list__bottom-left"}),A=m("div",{className:"rooms-list__avatars"});for(let F=0;F<j.maxPlayers;F++){const V=m("div",{className:`rooms-list__avatar ${F<j.playerCount?"rooms-list__avatar--filled":"rooms-list__avatar--empty"}`});if(j.playerAvatars&&j.playerAvatars[F]){const te=j.playerAvatars[F];if(te.avatarUrl){const ne=m("img",{src:te.avatarUrl,alt:te.name});ne.style.width="100%",ne.style.height="100%",ne.style.objectFit="cover",V.appendChild(ne);}else V.textContent="👤";V.title=te.name;}else F<j.playerCount&&(V.textContent="👤");A.appendChild(V);}P.appendChild(A);const M=m("span",{className:"rooms-list__count"});M.textContent=`${j.playerCount}/${j.maxPlayers}`,P.appendChild(M),E.appendChild(P);const R=j.playerCount>=j.maxPlayers,L=Oe({label:"Join",variant:"primary",size:"sm",disabled:!a||R,onClick:()=>{n?.(j.id);}});return C.push(L),E.appendChild(L),Y.appendChild(E),Y}function O(j){w.innerHTML="",C.forEach(Y=>{Y.destroy?Y.destroy():Y.remove&&Y.remove();}),C.length=0;const W=aR(j,c);if(W.length===0){const Y=m("div",{className:"rooms-list__empty"});Y.textContent=i,w.appendChild(Y);}else W.forEach(Y=>{const N=I(Y);w.appendChild(N);});}return O(t),{root:u,setRooms(j){d=j,O(j);},setFilter(j){c=j,h.setValue(j),O(d);},setLastUpdated(j){S.textContent=sR(j),S.style.display="block";},setLoading(j){j?(v.style.display="flex",v.style.opacity="0",v.offsetWidth,v.style.opacity="1"):(v.style.opacity="0",setTimeout(()=>{v.style.display="none";},300));},destroy(){C.forEach(j=>{j.destroy?j.destroy():j.remove&&j.remove();}),C.length=0,_.forEach(j=>{j.destroy?j.destroy():j.remove&&j.remove();}),_.length=0,u.remove();}}}async function dR(e){const{state:t,defaultExpanded:n=true,onExpandChange:o}=e;let r=null,i=false;const a=!ot.isDiscord(),s=ot.isDiscord(),c=ot.detect().origin;async function d(){try{return (await Ps.fetchRooms(1e3)).map(h=>({id:h.id,playerCount:h.playersCount,maxPlayers:6,playerAvatars:h.userSlots?.map(y=>({name:y.name,avatarUrl:y.avatarUrl}))}))}catch(g){return console.error("[Room] Failed to fetch rooms:",g),[]}}async function u(){if(!(i||!r)){i=true,r.setLoading(true);try{const g=await d(),h=new Date;r.setRooms(g),r.setLastUpdated(h),console.log(`[Room] Fetched ${g.length} rooms from Aries API`);}catch(g){console.error("[Room] Failed to refresh rooms:",g);}finally{i=false,r.setLoading(false);}}}const p=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"});r=cR({rooms:[],joinEnabled:a,onJoinRoom:g=>{const h=`${c}/r/${g}`;window.open(h,"_blank"),console.log(`[Room] Opening room: ${h}`);},onCopyRoomId:g=>{navigator.clipboard.writeText(g).then(()=>{console.log(`[Room] Room ID copied to clipboard: ${g}`);}).catch(h=>{console.error("[Room] Failed to copy room ID:",h);});},onRefresh:()=>{u();},emptyMessage:"No public rooms available",initialFilter:"5-6"}),p.appendChild(r.root);const f=Ne({title:"Public",subtitle:s?"List of available public rooms (view only on Discord)":"List of available public rooms",padding:"lg",expandable:true,defaultExpanded:n,onExpandChange:g=>{o?.(g),t.setCardExpanded("public",g),g&&!i&&u();}},p);return n&&u(),{root:f,destroy(){r&&(r.destroy(),r=null);}}}class uR extends Vt{constructor(n){super({id:"tab-room",label:"Room"});U(this,"publicCardHandle",null);this.deps=n;}destroy(){this.publicCardHandle&&(this.publicCardHandle.destroy(),this.publicCardHandle=null);}async build(n){const o=this.createGrid("12px");o.id="room",n.appendChild(o);let r;try{r=await eR();}catch{r={get:()=>rd,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=r.get();this.publicCardHandle=await dR({state:r,defaultExpanded:!!i.ui.expandedCards.public}),o.appendChild(this.publicCardHandle.root);}}function Kf(e){const{mode:t,species:n,ruleId:o,initialData:r,onSave:i,onDelete:a,onCancel:s,mountRoot:l}=e;let c=r?.name??"",d=r?.ruleMode??"lock",u=r?.sizeCondition?.enabled??false,p=r?.sizeCondition?.minPercentage??75,f=null;const g=r?.mutationCondition?.mutations??[],h=g.filter(R=>["none","Gold","Rainbow"].includes(R));let y=h.length>0?h:["none"],x=h.length>0,w=r?.mutationCondition?.enabled??false,v=g.filter(R=>!["Gold","Rainbow"].includes(R));w&&v.length===0&&(v=["none"]);let k=r?.mutationCondition?.matchMode??"any",T=true,b=true,S=true;const _=m("div",{style:`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(4px);
        `}),C=m("div",{className:"harvest-locker-modal",style:`
            background: var(--bg);
            border: 1px solid color-mix(in oklab, var(--fg) 10%, transparent);
            border-radius: 12px;
            padding: 20px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `});function I(){C.replaceChildren();const R=m("div",{style:"margin-bottom: 20px;"}),L=m("h2",{style:"font-size: 18px; font-weight: 600; margin-bottom: 16px; color: var(--fg);"},t==="overall"?"Create Overall Rule":`Create Rule: ${n||"Species"}`);R.appendChild(L);const F=m("div",{style:"display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px;"}),V=m("div",{style:"flex: 1; display: flex; flex-direction: column; gap: 6px;"}),te=m("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Rule Name");V.appendChild(te);const ne=_i({placeholder:"e.g., Lock Large Frozen",value:c,maxLength:30,blockGameKeys:true,onChange:Le=>{c=Le,P();}});V.appendChild(ne.root),F.appendChild(V);const ae=m("div",{style:"display: flex; flex-direction: column; gap: 6px;"}),fe=m("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Mode");ae.appendChild(fe);const xe=Ci({segments:[{id:"lock",label:"Lock"},{id:"allow",label:"Allow"}],selected:d,onChange:Le=>{d=Le,I();}});ae.appendChild(xe),F.appendChild(ae),R.appendChild(F),C.appendChild(R),C.appendChild(O()),C.appendChild(z()),C.appendChild(W()),C.appendChild(N()),C.appendChild(q());}function O(){const R=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),L=m("div",{style:"display: flex; align-items: center; gap: 12px;"}),F=Za({checked:u,label:"Enable",size:"md",onChange:ne=>{u=ne,I();}});L.appendChild(F.root);let V=null;if(u&&(V=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},d==="lock"?`Lock plants smaller than ${p}%`:`Allow harvesting plants smaller than ${p}%`),L.appendChild(V)),R.appendChild(L),u){const ne=m("div",{style:"display: flex; flex-direction: column; gap: 4px;"}),ae=m("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),fe=m("div",{style:"font-size: 12px; color: var(--fg); font-weight: 500;"},"Minimum Size"),xe=m("span",{style:"font-size: 12px; font-weight: 600; color: var(--accent);"},`${p}%`);ae.appendChild(fe),ae.appendChild(xe),ne.appendChild(ae);const Le=qu({min:50,max:100,step:1,value:p,showValue:false,onInput:ve=>{p=ve,xe.textContent=`${ve}%`,V&&(V.textContent=d==="lock"?`Lock plants smaller than ${ve}%`:`Allow harvesting plants smaller than ${ve}%`);},onChange:ve=>{p=ve,I();}});ne.appendChild(Le.root),R.appendChild(ne);}const te=Ne({title:"Size",variant:"soft",padding:"md",expandable:true,defaultExpanded:T,onExpandChange:ne=>{T=ne;}},R);return te.style.marginBottom="16px",te}function z(){const R=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),L=m("div",{style:"display: flex; align-items: center; gap: 12px;"}),F=Za({checked:x,label:"Enable",size:"md",onChange:te=>{x=te,I();}});if(L.appendChild(F.root),x){const te=y.map(ae=>ae==="none"?"normal":ae.toLowerCase()).join(", "),ne=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},d==="lock"?`Lock ${te} plants`:`Allow ${te} plants`);L.appendChild(ne);}if(R.appendChild(L),x){const te=["none","Gold","Rainbow"],ne=m("div",{style:`
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                    gap: 8px;
                `});te.forEach(ae=>{const fe=j(ae);ne.appendChild(fe);}),R.appendChild(ne);}const V=Ne({title:"Color Mutation",variant:"soft",padding:"md",expandable:true,defaultExpanded:b,onExpandChange:te=>{b=te;}},R);return V.style.marginBottom="16px",V}function j(R){const L=y.includes(R),F=m("div",{style:`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 8px;
                cursor: pointer;
                border-radius: 6px;
                background: ${L?"color-mix(in oklab, var(--accent) 20%, transparent)":"color-mix(in oklab, var(--fg) 5%, transparent)"};
                border: 1px solid ${L?"var(--accent)":"color-mix(in oklab, var(--fg) 10%, transparent)"};
                transition: all 0.15s ease;
            `});F.addEventListener("click",()=>{if(L){const ne=y.filter(ae=>ae!==R);if(ne.length===0)return;y=ne;}else {if(y.length>=3)return;y.push(R);}I();}),F.addEventListener("mouseenter",()=>{L||(F.style.background="color-mix(in oklab, var(--fg) 10%, transparent)");}),F.addEventListener("mouseleave",()=>{L||(F.style.background="color-mix(in oklab, var(--fg) 5%, transparent)");});const V=m("div",{style:"display: flex; align-items: center; justify-content: center;"});if(R==="none"){const ne=m("div",{style:`
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, color-mix(in oklab, var(--fg) 8%, transparent) 0%, color-mix(in oklab, var(--fg) 15%, transparent) 100%);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: 300;
                    color: color-mix(in oklab, var(--fg) 40%, transparent);
                `},"—");V.appendChild(ne);}else if(Q.isReady())try{const fe=J.get("mutations")?.[R]?.spriteId;if(fe){const xe=Q.toCanvas(fe,{boundsMode:"padded"});xe&&(xe.style.maxWidth="32px",xe.style.maxHeight="32px",xe.style.width="auto",xe.style.height="auto",xe.style.display="block",V.appendChild(xe));}else throw new Error(`No sprite ID found for ${R}`)}catch(ne){console.warn(`[RuleEditorModal] Failed to load sprite for color mutation: ${R}`,ne);const ae=m("div",{style:`
                        width: 32px;
                        height: 32px;
                        background: ${R==="Gold"?"#FFD700":"linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%)"};
                        border-radius: 4px;
                    `});V.appendChild(ae);}F.appendChild(V);const te=m("div",{style:"font-size: 10px; color: var(--fg); text-align: center; font-weight: 500;"},R==="none"?"None":R);return F.appendChild(te),F}function W(){const R=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),L=m("div",{style:"display: flex; align-items: center; gap: 12px;"}),F=Za({checked:w,label:"Enable",size:"md",onChange:te=>{w=te,I();}});if(L.appendChild(F.root),w&&v.length>0){const te=J.get("mutations"),ne=v.map(xe=>xe==="none"?"normal":te?.[xe]?.name||xe).join(", "),ae=k==="all"?"AND":"OR",fe=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},d==="lock"?`Lock ${ne} plants (${ae})`:`Allow ${ne} plants (${ae})`);L.appendChild(fe);}if(R.appendChild(L),w){const te=m("div",{style:"display: flex; justify-content: center;"}),ne=Ci({segments:[{id:"any",label:"Any"},{id:"all",label:"All"}],selected:k,onChange:ae=>{if(k=ae,ae==="all"){const fe=["Wet","Chilled","Frozen"],xe=["Dawnlit","Ambershine","Dawncharged","Ambercharged"],Le=v.filter(et=>fe.includes(et)),ve=v.filter(et=>xe.includes(et)),je=[];Le.length>0&&je.push(Le[0]),ve.length>0&&je.length<2&&je.push(ve[0]),v=je;}I();}});te.appendChild(ne),R.appendChild(te);}if(w){const ne=["none",...A()],ae=m("div",{style:`
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
                    gap: 8px;
                    max-height: 300px;
                    overflow-y: auto;
                `});ne.forEach(fe=>{const xe=Y(fe);ae.appendChild(xe);}),R.appendChild(ae);}const V=Ne({title:"Weather Mutation",variant:"soft",padding:"md",expandable:true,defaultExpanded:S,onExpandChange:te=>{S=te;}},R);return V.style.marginBottom="16px",V}function Y(R){const L=v.includes(R),F=m("div",{style:`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 8px;
                background: ${L?"color-mix(in oklab, var(--accent) 20%, transparent)":"color-mix(in oklab, var(--fg) 5%, transparent)"};
                border: 1px solid ${L?"var(--accent)":"color-mix(in oklab, var(--fg) 10%, transparent)"};
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
            `});F.addEventListener("click",()=>{if(L)v=v.filter(fe=>fe!==R);else {if(k==="all"&&R!=="none"){const fe=["Wet","Chilled","Frozen"],xe=["Dawnlit","Ambershine","Dawncharged","Ambercharged"];if(fe.includes(R)?v=v.filter(ve=>!fe.includes(ve)):xe.includes(R)&&(v=v.filter(ve=>!xe.includes(ve))),v.filter(ve=>ve!=="none").length>=2)return}v.push(R);}I();}),F.addEventListener("mouseenter",()=>{L||(F.style.background="color-mix(in oklab, var(--fg) 10%, transparent)");}),F.addEventListener("mouseleave",()=>{L||(F.style.background="color-mix(in oklab, var(--fg) 5%, transparent)");});const V=m("div",{style:"display: flex; align-items: center; justify-content: center;"});if(R==="none"){const fe=m("div",{style:`
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, color-mix(in oklab, var(--fg) 8%, transparent) 0%, color-mix(in oklab, var(--fg) 15%, transparent) 100%);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: 300;
                    color: color-mix(in oklab, var(--fg) 40%, transparent);
                `},"—");V.appendChild(fe);}else if(Q.isReady())try{const Le=J.get("mutations")?.[R]?.spriteId;if(Le){const ve=Q.toCanvas(Le,{boundsMode:"padded"});ve&&(ve.style.maxWidth="32px",ve.style.maxHeight="32px",ve.style.width="auto",ve.style.height="auto",ve.style.display="block",V.appendChild(ve));}else throw new Error(`No sprite ID found for ${R}`)}catch(fe){console.warn(`[RuleEditorModal] Failed to load sprite for mutation: ${R}`,fe);const xe=m("div",{style:`
                        width: 40px;
                        height: 40px;
                        background: ${L?"var(--accent)":"color-mix(in oklab, var(--fg) 20%, transparent)"};
                        border-radius: 4px;
                    `});V.appendChild(xe);}else {const fe=m("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 10%, transparent); border-radius: 4px;"});V.appendChild(fe);}F.appendChild(V);const te=J.get("mutations"),ne=R==="none"?"None":te?.[R]?.name||R,ae=m("div",{style:"font-size: 10px; color: var(--fg); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},ne);return F.appendChild(ae),F}function N(){const R=m("div",{style:"display: flex; flex-direction: column; gap: 8px;"}),L=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); text-align: center; line-height: 1.4;"},d==="lock"?"Preview of plants that will be blocked from harvesting":"Preview of plants that will be harvestable");R.appendChild(L);const F=m("div",{className:"harvest-locker-preview-grid"});R.appendChild(F),requestAnimationFrame(()=>{const{previews:te,remaining:ne}=H(F);if(te.forEach(ae=>{F.appendChild(ae);}),ne>0){const ae=m("div",{style:`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 48px;
                        height: 48px;
                        background: color-mix(in oklab, var(--accent) 15%, transparent);
                        border: 1px dashed var(--accent);
                        border-radius: 6px;
                        font-size: 12px;
                        font-weight: 600;
                        color: var(--accent);
                        flex-shrink: 0;
                    `},`+${ne}`);F.appendChild(ae);}});const V=Ne({title:"Preview",variant:"soft",padding:"md",expandable:false},R);return V.style.marginBottom="16px",V}function D(){const R=[],L=w?v.filter(Ae=>Ae!=="none"):[],F=x?y.filter(Ae=>Ae!=="none"):[],V=w&&v.includes("none"),te=x&&y.includes("none");if(L.length===0&&F.length===0||!w&&!x)return R.push([]),R;const ne=["Wet","Chilled","Frozen"],ae=["Dawnlit","Ambershine","Dawncharged","Ambercharged"],fe=L.filter(Ae=>ne.includes(Ae)),xe=L.filter(Ae=>ae.includes(Ae)),Le=(Ae,tt)=>{Ae.length===0&&tt.length===0?R.push([]):Ae.length===0?tt.forEach(Xt=>{R.push([...Xt]);}):tt.length===0?Ae.forEach(Xt=>{R.push([...Xt]);}):Ae.forEach(Xt=>{tt.forEach(po=>{R.push([...Xt,...po]);});});},ve=[];if(V&&ve.push([]),k==="all"&&L.length>0){const Ae=fe.length>1,tt=xe.length>1;if(Ae||tt)return [];ve.push(L);}else k==="any"&&L.length>0&&(L.forEach(Ae=>{ve.push([Ae]);}),fe.forEach(Ae=>{xe.forEach(tt=>{ve.push([Ae,tt]);});}));const je=[];return te&&je.push([]),F.forEach(Ae=>{je.push([Ae]);}),Le(ve,je),Array.from(new Set(R.map(Ae=>Ae.sort().join(",")))).map(Ae=>Ae.split(",").filter(Boolean))}function H(R){const L=[],F=n||"Starweaver",V=R.offsetWidth||C.offsetWidth||600,te=48,ne=6,ae=Math.max(4,Math.floor((V+ne)/(te+ne))),fe=Math.max(7,ae*2-1);if(!(u||w||x))return L.push(G(F,[])),{previews:L,remaining:0};const Le=D();if(Le.length===0){const et=m("div",{style:"padding: 12px; text-align: center; color: #ef4444; font-size: 12px;"},"⚠️ Invalid mutation combination");return L.push(et),{previews:L,remaining:0}}const ve=Math.min(Le.length,fe);for(let et=0;et<ve;et++)L.push(G(F,Le[et]));const je=Math.max(0,Le.length-fe);return {previews:L,remaining:je}}function G(R,L){const F=m("div",{style:`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                padding: 4px;
                background: color-mix(in oklab, var(--fg) 5%, transparent);
                border: 1px solid color-mix(in oklab, var(--fg) 10%, transparent);
                border-radius: 6px;
                flex-shrink: 0;
            `});if(Q.isReady())try{const ne=J.get("plants")?.[R]?.crop?.spriteId;if(ne){const ae=Q.toCanvas(ne,{mutations:L.length>0?L:void 0,boundsMode:"padded"});ae&&(ae.style.maxWidth="40px",ae.style.maxHeight="40px",ae.style.width="auto",ae.style.height="auto",ae.style.display="block",F.appendChild(ae));}else throw new Error(`No sprite ID found for ${R}`)}catch(V){console.warn(`[RuleEditorModal] Failed to load sprite for plant: ${R}`,V);const te=m("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--accent) 20%, transparent); border-radius: 4px;"});F.appendChild(te);}else {const V=m("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--accent) 20%, transparent); border-radius: 4px;"});F.appendChild(V);}return F}function q(){const R=m("div",{style:"display: flex; gap: 8px; justify-content: space-between;"}),L=m("div",{style:"display: flex; gap: 8px;"}),F=Oe({label:"Delete Rule",variant:"danger",onClick:()=>{o&&a&&a(),M();}});L.appendChild(F),R.appendChild(L);const V=m("div",{style:"display: flex; gap: 8px;"}),te=Oe({label:"Cancel",variant:"default",onClick:()=>{s?.(),M();}});V.appendChild(te);const ne=Oe({label:"Save",variant:"primary",disabled:!E(),onClick:()=>{if(!E())return;const ae={name:c.trim(),ruleMode:d};u&&(ae.sizeCondition={enabled:true,minPercentage:p});const fe=[];w&&fe.push(...v),x&&fe.push(...y),fe.length>0&&(ae.mutationCondition={enabled:true,mutations:fe,matchMode:k}),i(ae),M();}});return V.appendChild(ne),f=ne,R.appendChild(V),R}function E(){return !(!c.trim()||!u&&!x&&!w||w&&v.length===0||x&&y.length===0)}function P(){f&&(f.disabled=!E());}function A(){if(!Q.isReady())return console.warn("[RuleEditorModal] MGSprite not ready yet"),[];try{return Q.getMutationNames().filter(L=>L!=="Gold"&&L!=="Rainbow")}catch(R){return console.error("[RuleEditorModal] Failed to get mutation names:",R),[]}}function M(){_.remove();}return _.appendChild(C),I(),(l??document.body).appendChild(_),_.addEventListener("click",R=>{R.target===_&&(s?.(),M());}),{root:_,destroy:M}}class pR{constructor(t={}){U(this,"card",null);U(this,"modeContainer",null);U(this,"content",null);U(this,"options");U(this,"cleanups",[]);U(this,"modeControl",null);U(this,"speciesSelect",null);U(this,"createButton",null);U(this,"mode","overall");U(this,"selectedSpecies",null);U(this,"rules",[]);this.options=t;}build(){return this.card?this.card:this.createCard()}destroy(){this.cleanups.forEach(t=>t()),this.cleanups.length=0,this.modeControl?.destroy?.(),this.modeControl=null,this.modeContainer=null,this.speciesSelect?.destroy?.(),this.speciesSelect=null,this.createButton=null,this.card=null,this.content=null;}render(){this.card&&(this.loadRules(),this.ensureModeControl(),this.renderContent());}createCard(){const t=m("div",{className:"harvest-locker-card-wrapper"});return this.modeContainer=m("div",{className:"harvest-locker-card__mode-container"}),t.appendChild(this.modeContainer),this.content=m("div",{className:"harvest-locker-card__content"}),t.appendChild(this.content),this.card=Ne({title:"Harvest Rules",subtitle:"Configure harvest locking rules",expandable:true,defaultExpanded:this.options.defaultExpanded??true},t),this.loadRules(),this.renderContent(),this.card}loadRules(){this.mode==="overall"?this.rules=Yt.getOverallRules():this.rules=this.selectedSpecies?Yt.getSpeciesRules(this.selectedSpecies):[];}getAvailableSpecies(){const t=J.get("plants");return t?Object.keys(t).filter(n=>{const o=t[n];return o&&typeof o=="object"&&"crop"in o}).map(n=>({value:n,label:n})).sort((n,o)=>n.label.localeCompare(o.label)):[]}renderContent(){this.content&&(this.content.replaceChildren(),this.mode==="bySpecies"&&this.renderSpeciesSelector(),this.renderRulesList(),this.renderActionButtons());}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=Ci({segments:[{id:"overall",label:"Overall"},{id:"bySpecies",label:"By Species"}],selected:this.mode,onChange:t=>{this.mode=t,this.loadRules(),this.renderContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.mode&&this.modeControl.select(this.mode);}}renderSpeciesSelector(){if(!this.content)return;const t=this.getAvailableSpecies();if(t.length===0){const o=m("div",{className:"harvest-locker-card__message harvest-locker-card__message--compact"},"No species available");this.content.appendChild(o);return}this.speciesSelect=kn({options:t,placeholder:"Select a species...",value:this.selectedSpecies??void 0,onChange:o=>{this.selectedSpecies=o,this.loadRules(),this.renderContent();}});const n=m("div",{className:"harvest-locker-card__control"});n.appendChild(this.speciesSelect.root),this.content.appendChild(n);}renderRulesList(){if(!this.content)return;if(this.mode==="bySpecies"&&!this.selectedSpecies){const n=m("div",{className:"harvest-locker-card__message"},"Select a species to view and manage rules");this.content.appendChild(n);return}if(this.rules.length===0){const n=m("div",{className:"harvest-locker-card__empty"},"No rules yet. Click 'Create Rule' to add one.");this.content.appendChild(n);return}const t=m("div",{className:"harvest-locker-card__list"});this.rules.forEach(n=>{const o=this.createRuleItem(n);t.appendChild(o);}),this.content.appendChild(t);}createRuleItem(t){const n=m("div",{className:"harvest-locker-rule-item"}),o=m("div",{className:"harvest-locker-rule-item__name"},t.name);n.appendChild(o);const r=m("div",{className:"harvest-locker-rule-item__badge"},t.mode);n.appendChild(r),n.addEventListener("contextmenu",s=>{s.preventDefault(),this.handleDeleteRule(t.id);});let i=null,a=false;return n.addEventListener("touchstart",()=>{a=false,i=window.setTimeout(()=>{a=true,this.handleDeleteRule(t.id),navigator.vibrate&&navigator.vibrate(50);},500);}),n.addEventListener("touchend",()=>{i&&(clearTimeout(i),i=null),a||this.handleEditRule(t);}),n.addEventListener("touchmove",()=>{i&&(clearTimeout(i),i=null);}),n.addEventListener("click",()=>{this.handleEditRule(t);}),n}renderActionButtons(){if(!this.content||this.mode==="bySpecies"&&!this.selectedSpecies)return;const t=m("div",{className:"harvest-locker-card__actions"});this.createButton=Oe({label:"Create Rule",variant:"primary",onClick:()=>this.handleCreateRule()}),t.appendChild(this.createButton),this.content.appendChild(t);}handleCreateRule(){Kf({mode:this.mode==="overall"?"overall":"species",species:this.selectedSpecies,mountRoot:this.card?.getRootNode()instanceof ShadowRoot?this.card.getRootNode():void 0,onSave:t=>{this.mode==="overall"?Yt.addNewOverallRule(t.name,t.ruleMode,t.sizeCondition,t.mutationCondition):this.selectedSpecies&&Yt.addNewSpeciesRule(this.selectedSpecies,t.name,t.ruleMode,t.sizeCondition,t.mutationCondition),this.loadRules(),this.renderContent();}});}handleEditRule(t){Kf({mode:this.mode==="overall"?"overall":"species",species:this.selectedSpecies,ruleId:t.id,mountRoot:this.card?.getRootNode()instanceof ShadowRoot?this.card.getRootNode():void 0,initialData:{name:t.name,ruleMode:t.mode,sizeCondition:t.sizeCondition,mutationCondition:t.mutationCondition},onSave:n=>{Yt.modifyRule(t.id,{name:n.name,mode:n.ruleMode,sizeCondition:n.sizeCondition,mutationCondition:n.mutationCondition}),this.loadRules(),this.renderContent();},onDelete:()=>{this.handleDeleteRule(t.id);}});}handleDeleteRule(t){Yt.removeRule(t),this.loadRules(),this.renderContent();}}const fR=`
.harvest-locker-card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
    overflow-x: hidden;
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
    color: var(--muted);
    font-size: 14px;
}

.harvest-locker-card__message--compact {
    padding: 12px;
}

.harvest-locker-card__control {
    margin-bottom: 16px;
}

.harvest-locker-card__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}

/* Scrollable after 4 items (assuming ~60px per item + gap) */
.harvest-locker-card__list:has(.harvest-locker-rule-item:nth-child(5)) {
    max-height: 272px; /* 4 items * (60px + 8px gap) */
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
`;class gR extends Vt{constructor(){super({id:"tab-locker",label:"Locker"});U(this,"harvestLockerCardPart",null);}build(n){const o=n.getRootNode();$e(o,fR,"harvest-locker-card-styles");const r=this.createGrid("12px");r.id="locker",n.appendChild(r),this.initializeHarvestLockerCardPart(r);}destroy(){this.harvestLockerCardPart&&(this.harvestLockerCardPart.destroy(),this.harvestLockerCardPart=null);}initializeHarvestLockerCardPart(n){this.harvestLockerCardPart||(this.harvestLockerCardPart=new pR({defaultExpanded:true}));const o=this.harvestLockerCardPart.build();n.appendChild(o),this.harvestLockerCardPart.render();}}let Zl=null,ec=null,tc=null;function mR(){return Zl||(Zl=new LT),Zl}function zx(){return ec||(ec=new XL),ec}function Gx(){return tc||(tc=new tL),tc}function hR(e){return [new dv(e),new tM,zx(),Gx(),new gM(e),new UM(e),new ZL,new uR(e),new gR]}async function bR(){const e=zx(),t=Gx(),n=mR();await Promise.all([e.preload(),t.preload(),n.preload()]);}function xR(e){const{shadow:t,initialOpen:n}=e,o=m("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=m("div",{className:"gemini-tabbar"}),i=m("div",{className:"gemini-content",id:"content"}),a=m("div",{className:"gemini-resizer",title:"Resize"}),s=m("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");o.append(r,i,a);const l=m("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:l}}function yR(e){const{resizer:t,host:n,shadow:o,onWidthChange:r,initialWidth:i,minWidth:a,maxWidth:s}=e;let l=a,c=s;function d(){const k=ot.detect(),T=Math.round(X.visualViewport?.width??X.innerWidth??0);if(k.platform==="mobile"||k.os==="ios"||k.os==="android"){const b=getComputedStyle(o.host),S=parseFloat(b.getPropertyValue("--inset-l"))||0,_=parseFloat(b.getPropertyValue("--inset-r"))||0,C=Math.max(280,T-Math.round(S+_));l=280,c=C;}else l=a,c=s;return {min:l,max:c}}function u(k){return Math.max(l,Math.min(c,Number(k)||i))}function p(k){const T=u(k);n.style.setProperty("--w",`${T}px`),r(T);}d();const f=ot.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let h=false;const y=k=>{if(!h)return;k.preventDefault();const T=Math.round(X.innerWidth-k.clientX);p(T);},x=()=>{h&&(h=false,document.body.style.cursor="",X.removeEventListener("mousemove",y),X.removeEventListener("mouseup",x));},w=k=>{g&&(k.preventDefault(),h=true,document.body.style.cursor="ew-resize",X.addEventListener("mousemove",y),X.addEventListener("mouseup",x));};t.addEventListener("mousedown",w);function v(){t.removeEventListener("mousedown",w),X.removeEventListener("mousemove",y),X.removeEventListener("mouseup",x);}return {calculateResponsiveBounds:d,constrainWidthToLimits:u,setHudWidth:p,destroy:v}}function vR(e){const{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(l){const c=t.classList.contains("open");if(i&&l.key==="Escape"&&c){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const wR=`
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
`,SR=`
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
`,CR=`
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
`,kR=`
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
`,_R=`
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
  
`,TR=`
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
`,AR=`
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
`,ER=`
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
`,IR=`
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
`,PR=`
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
`,MR=`
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
`,LR=`
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
`,RR=`
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
`,NR=`
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
`,OR=`
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
`,$R=`
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
`,FR=`
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
`,DR=`
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
`,BR=`
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
`,zR=`
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
`,GR=`
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
`,HR=`
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
`,jR=`
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
`,UR=`
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
`,WR={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function VR(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,WR),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function qR(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function XR(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:l,buildSections:c,initialTab:d,onTabChange:u,toggleCombo:p=L=>L.ctrlKey&&L.shiftKey&&L.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:h=720}=e,{host:y,shadow:x}=VR(t),w=[[SR,"variables"],[CR,"primitives"],[kR,"utilities"],[wR,"hud"],[_R,"card"],[zu,"badge"],[TR,"button"],[RR,"checkbox"],[AR,"input"],[ER,"label"],[IR,"navTabs"],[PR,"searchBar"],[MR,"select"],[LR,"switch"],[NR,"table"],[OR,"teamListItem"],[$R,"timeRangePicker"],[FR,"tooltip"],[DR,"slider"],[BR,"reorderableList"],[zR,"colorPicker"],[GR,"log"],[HR,"segmentedControl"],[jR,"soundPicker"],[UR,"settings"],[Ix,"teamCard"],[Sh,"autoFavoriteSettings"]];for(let L=0;L<w.length;L++){const[F,V]=w[L];$e(x,F,V),L%5===4&&await qR();}const{panel:v,tabbar:k,content:T,resizer:b,closeButton:S,wrapper:_}=xR({shadow:x,initialOpen:o});function C(L){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:L},bubbles:true})),i?.(L);}function I(L){const F=v.classList.contains("open");v.classList.toggle("open",L),v.setAttribute("aria-hidden",L?"false":"true"),L!==F&&C(L);}I(o),S.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation(),I(false);});const O=ov({host:y,themes:a,initialTheme:s,onThemeChange:l}),z=yR({resizer:b,host:y,shadow:x,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:h});z.setHudWidth(n);const j=c({applyTheme:O.applyTheme,initialTheme:s,getCurrentTheme:O.getCurrentTheme,setHUDWidth:z.setHudWidth,setHUDOpen:I}),W=new iy(j,T,{applyTheme:O.applyTheme,getCurrentTheme:O.getCurrentTheme}),Y=j.map(L=>({id:L.id,label:L.label})),N=d&&j.some(L=>L.id===d)?d:Y[0]?.id||"",D=ry(Y,N,L=>{W.activate(L),u?.(L);});D.root.style.flex="1 1 auto",D.root.style.minWidth="0",k.append(D.root,S);const H={"tab-auto-favorite":"autoFavorite","tab-pets":"pets"};function G(){const L=Te(Me.CONFIG,{autoFavorite:{enabled:true},pets:{enabled:true}});for(const[F,V]of Object.entries(H))L[V]?.enabled??true?D.showTab(F):D.hideTab(F);}function q(L){const{key:F}=L.detail;(F===Me.CONFIG||F==="feature:config")&&G();}window.addEventListener(Cn.STORAGE_CHANGE,q),G();let E=N;if(!D.isTabVisible(N)){const L=D.getVisibleTabs();L.length>0&&(E=L[0]);}E&&W.activate(E);const P=vR({panel:v,onToggle:()=>I(!v.classList.contains("open")),onClose:()=>I(false),toggleCombo:p,closeOnEscape:f}),A=()=>{D.recalc();const L=parseInt(getComputedStyle(y).getPropertyValue("--w"))||n;z.calculateResponsiveBounds(),z.setHudWidth(L);};X.addEventListener("resize",A);const M=L=>{const F=L.detail?.width;F?z.setHudWidth(F):z.setHudWidth(n),D.recalc();};y.addEventListener("gemini:layout-resize",M);function R(){window.removeEventListener(Cn.STORAGE_CHANGE,q),P.destroy(),z.destroy(),X.removeEventListener("resize",A),y.removeEventListener("gemini:layout-resize",M);}return {host:y,shadow:x,wrapper:_,panel:v,content:T,setOpen:I,setWidth:z.setHudWidth,sections:j,manager:W,nav:D,destroy:R}}const ko={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Lr={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function KR(){return {isOpen:Te(ko.isOpen,Lr.isOpen),width:Te(ko.width,Lr.width),theme:Te(ko.theme,Lr.theme),activeTab:Te(ko.activeTab,Lr.activeTab)}}function Ca(e,t){Ee(ko[e],t);}function YR(e,t){return Te(ko[e],t)}const JR="https://i.imgur.com/IMkhMur.png",QR="Stats";function ZR(e){let t=e.iconUrl||JR;const n=e.ariaLabel||"Open MGH";let o=null,r=null,i=null,a=false,s=null,l=null;const c=["Chat","Leaderboard","Stats","Open Activity Log"],d=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function u(){const T=document.querySelector(c.map(S=>`button[aria-label="${d(S)}"]`).join(","));if(!T)return null;let b=T.parentElement;for(;b&&b!==document.body;){if(c.reduce((_,C)=>_+b.querySelectorAll(`button[aria-label="${d(C)}"]`).length,0)>=2)return b;b=b.parentElement;}return null}function f(T){const b=Array.from(T.querySelectorAll("button[aria-label]"));if(!b.length)return {refBtn:null,refWrapper:null};const S=b.filter(W=>W.dataset.mghBtn!=="true"&&(W.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),_=S.length?S:b,C=_.find(W=>(W.getAttribute("aria-label")||"").toLowerCase()===QR.toLowerCase())||null,I=_.length>=2?_.length-2:_.length-1,O=C||_[I],z=O.parentElement,j=z&&z.parentElement===T&&z.tagName==="DIV"?z:null;return {refBtn:O,refWrapper:j}}function g(T,b,S){const _=T.cloneNode(false);_.type="button",_.setAttribute("aria-label",b),_.title=b,_.dataset.mghBtn="true",_.style.pointerEvents="auto",_.removeAttribute("id");const C=document.createElement("img");return C.src=S,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",_.appendChild(C),_.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.();}catch{}}),_}function h(){if(a)return  false;a=true;let T=false;try{const b=u();if(!b)return !1;s!==b&&(s=b);const{refBtn:S,refWrapper:_}=f(b);if(!S)return !1;r=b.querySelector('div[data-mgh-wrapper="true"]'),!r&&_&&(r=_.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),T=!0);const C=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=C),o||(o=g(S,n,t),r?r.appendChild(o):o.parentElement!==b&&b.appendChild(o),T=!0),r&&r.parentElement!==b&&(b.appendChild(r),T=!0);const I=b;if(I&&I!==l){try{v.disconnect();}catch{}l=I,v.observe(l,{childList:!0,subtree:!0});}return T}finally{a=false;}}const y=document.getElementById("App")||document.body;let x=null,w=false;const v=new MutationObserver(()=>{w&&o&&document.contains(o)||(o&&!document.contains(o)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),w=false,o=null,r=null),x===null&&(x=window.setTimeout(()=>{if(x=null,h()&&o&&document.contains(o)&&(w=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),r)){const b=r.parentElement;b&&b.lastElementChild!==r&&b.appendChild(r);}},100)));});return h()&&o&&document.contains(o)?(w=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),v.observe(y,{childList:true,subtree:true}),i=()=>v.disconnect(),()=>{try{i?.();}catch{}try{r?.remove();}catch{}}}const Hx=[];function eN(){return Hx.slice()}function Yf(e){Hx.push(e);}function tN(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function nN(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const nc=Symbol.for("ariesmod.ws.handlers.patched");function Xe(e,t){if(typeof e=="string"){const r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return Yf(i),i}const n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Yf(o),o}function oN(e,t=eN(),n={}){const o=n.pageWindow??window,r=!!n.debug;if(e[nc])return ()=>{};e[nc]=true;const i={ws:e,pageWindow:o,debug:r},a=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,i)===!0)return}catch(f){r&&console.error("[WS] handler error",f,u);}},s=u=>{const p=nN(u.data),f=tN(p);a({kind:"message",raw:u.data,data:p,type:f});},l=u=>{a({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},c=u=>a({kind:"open",event:u}),d=u=>a({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",c),e.addEventListener("error",d),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",l);}catch{}try{e.removeEventListener("open",c);}catch{}try{e.removeEventListener("error",d);}catch{}try{delete e[nc];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Xe(Rt.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Xe(Rt.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Xe(Rt.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Xe(Rt.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Xe(Rt.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Xe(Rt.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Xe(Rt.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Xe(Rt.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Xe(Rt.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Xe(Rt.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Xe(sn.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Xe(sn.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Xe(sn.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Xe(sn.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Xe(sn.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Xe(sn.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Xe(sn.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Xe(sn.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});ue(K.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));ue(K.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));ue(K.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));ue(K.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));ue(K.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));ue(K.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));ue(K.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));ue(K.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));ue(K.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));ue(K.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));ue(K.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));ue(K.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));ue(K.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));ue(K.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));ue(K.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));ue(K.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));ue(K.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));ue(K.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));ue(K.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));ue(K.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));ue(K.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));ue(K.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));ue(K.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));ue(K.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));ue(K.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));ue(K.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));ue(K.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));ue(K.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));ue(K.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));ue(K.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));ue(K.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");ue(K.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));ue(K.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));ue(K.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));ue(K.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));ue(K.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));ue(K.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));ue(K.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));ue(K.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));ue(K.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));ue(K.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));ue(K.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));ue(K.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));ue(K.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));ue(K.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));ue(K.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));ue(K.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function rN(e={}){const t=e.pageWindow??X,n=e.pollMs??500,o=!!e.debug,r=[];r.push(qk(t,{debug:o})),r.push(I2({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=oN(s,e.handlers,{debug:o,pageWindow:t}));};return a(hs(t).ws),r.push(rh(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>hs(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let ka=null;function iN(e={}){return ka||(ka=rN(e),ka)}function aN(e,t){const n=new MutationObserver(r=>{for(const i of r)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const l of s)t(l);}});n.observe(document.body,{childList:true,subtree:true});const o=document.querySelectorAll(e);for(const r of o)t(r);return {disconnect:()=>n.disconnect()}}function sN(e,t){const n=new MutationObserver(o=>{for(const r of o)for(const i of r.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const jx=768,Jf=6,oc=62,rc=50,lN=.5,cN=.4,_a=36,Ta=28,dN=6,id=4,uN=8,pN=100,fN=200,Qf=14,Zf=3,gN=40,mN=50,eg=2147483646,Rr="gemini-bulk-favorite-sidebar",hN="gemini-bulk-favorite-top-row",bN="gemini-bulk-favorite-bottom-row",ad="gemini-qol-bulkFavorite-styles",xN=`
/* Desktop: vertical scrollable list next to inventory */
#${Rr} {
  display: flex;
  flex-direction: column;
  gap: ${dN}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${eg};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${id}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${eg};
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

#${Rr}::-webkit-scrollbar {
  width: 4px;
}

#${Rr}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${Rr}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${oc}px;
  height: ${oc}px;
  min-width: ${oc}px;
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
  width: ${rc}px;
  height: ${rc}px;
  min-width: ${rc}px;
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
  width: ${_a}px;
  height: ${_a}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${Ta}px;
  height: ${Ta}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Zf}px;
  right: ${Zf}px;
  width: ${Qf}px;
  height: ${Qf}px;
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
  width: ${_a}px;
  height: ${_a}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${Ta}px;
  height: ${Ta}px;
  font-size: 14px;
}
`,yN='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',vN='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function wN(e){const{species:t,itemCount:n,isFavorited:o,isMobile:r,onClick:i}=e,a=m("button",{className:`gemini-qol-bulkFavorite-btn${r?" mobile":""}`,title:`${o?"Unfavorite":"Favorite"} all ${n} ${t}`});return a.dataset.species=t,a.appendChild(SN(t,r)),a.appendChild(CN(o)),a.appendChild(kN(t)),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),i();}),a}function SN(e,t){try{if(!Q.isReady()||!Q.has("plant",e))return tg(e);const n=t?cN:lN,o=Q.toCanvas("plant",e,{scale:n});return o.className="gemini-qol-bulkFavorite-sprite",o}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),tg(e)}}function tg(e){return m("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function CN(e){const t=m("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?yN:vN,t}function kN(e){return m("span",{className:"gemini-qol-bulkFavorite-label"},e)}let Bt=null,zt=null,Dt=null,es=false,Yr=null,Nr=false,Bo=null;const sd=[];function Aa(e){sd.push(e);}function _N(){for(const e of sd)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}sd.length=0;}function Ux(){return window.innerWidth<=jx}function TN(e){return new Promise(t=>setTimeout(t,e))}function Wx(){if(es)return;if(document.getElementById(ad)){es=true;return}const e=document.createElement("style");e.id=ad,e.textContent=xN,document.head.appendChild(e),es=true;}function AN(){document.getElementById(ad)?.remove(),es=false;}function EN(){const e=Nt().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const r of e.items){const i=r;if(i.itemType!=="Produce")continue;const a=i.species,s=i.id;if(!a||!s)continue;const l=n.get(a);l?l.push(s):n.set(a,[s]);}const o=[];for(const[r,i]of n){const a=i.length>0&&i.every(s=>t.has(s));o.push({species:r,itemIds:i,allFavorited:a});}return o.sort((r,i)=>r.species.localeCompare(i.species)),o}async function IN(e){const t=Nt().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),o=[];for(const a of t.items){const s=a;if(s.itemType!=="Produce"||s.species!==e)continue;const l=s.id;l&&o.push({id:l,favorited:n.has(l)});}if(o.length===0)return;const r=o.every(a=>a.favorited),i=r?o.filter(a=>a.favorited):o.filter(a=>!a.favorited);console.log(`🔄 [BulkFavorite] ${r?"Unfavoriting":"Favoriting"} ${i.length}/${o.length} ${e}`);for(const a of i)Xs(a.id),await TN(gN);}function ld(e,t){const{species:n,itemIds:o,allFavorited:r}=e;return wN({species:n,itemCount:o.length,isFavorited:r,isMobile:t,onClick:()=>IN(n)})}function PN(e){const t=m("div",{id:Rr}),n=e.getBoundingClientRect(),o=Math.max(window.innerHeight-pN,fN);return t.style.maxHeight=`${o}px`,t.style.position="fixed",t.style.left=`${n.right+uN}px`,t.style.top=`${n.top}px`,t}function ng(e,t,n){const o=m("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),r=t.getBoundingClientRect();return n==="top"?o.style.bottom=`${window.innerHeight-r.top+id}px`:o.style.top=`${r.bottom+id}px`,o.style.left=`${r.left}px`,o.style.maxWidth=`${r.width}px`,o}function og(){const e=EN();Ux()?LN(e):MN(e);}function MN(e){if(Bt){if(Bt.innerHTML="",e.length===0){Bt.style.display="none";return}Bt.style.display="flex";for(const t of e)Bt.appendChild(ld(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function LN(e){if(!zt||!Dt)return;if(zt.innerHTML="",Dt.innerHTML="",e.length===0){zt.style.display="none",Dt.style.display="none";return}zt.style.display="flex";const t=e.slice(0,Jf),n=e.slice(Jf);for(const o of t)zt.appendChild(ld(o,true));if(n.length>0){Dt.style.display="flex";for(const o of n)Dt.appendChild(ld(o,true));}else Dt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function RN(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=jx)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const o=window.innerWidth/2;let r=null,i=0;const a=e.querySelectorAll(".McFlex, .McGrid");for(const s of a){const l=s.getBoundingClientRect();if(l.width<200||l.height<200||l.width>window.innerWidth-100)continue;const c=l.left+l.width/2,d=1-Math.abs(c-o)/o,p=l.width*l.height*d;p>i&&(r=s,i=p);}if(r){const s=r.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),r}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let zo=null;function cd(){zo&&clearTimeout(zo),zo=setTimeout(()=>{NN();},mN);}function NN(){const e=RN();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),Jr(),Wx(),Yr=e,Ux()?(zt=ng(hN,e,"top"),Dt=ng(bN,e,"bottom"),document.body.appendChild(zt),document.body.appendChild(Dt)):(Bt=PN(e),document.body.appendChild(Bt)),og(),Bo&&Bo(),Bo=Nt().subscribeFavorites(()=>{Nr&&og();});}function Jr(){zo&&(clearTimeout(zo),zo=null),Bo&&(Bo(),Bo=null),Bt?.remove(),Bt=null,zt?.remove(),zt=null,Dt?.remove(),Dt=null,Yr=null;}function ON(){Jr();}async function dd(){if(!zi().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}Wx();const t=await Bs.onChangeNow(r=>{const i=r==="inventory";i!==Nr&&(Nr=i,i?cd():Jr());}),n=aN(".McGrid",()=>{Nr&&(Bt||zt||cd());}),o=sN(".McGrid",r=>{Yr&&Yr===r&&Jr();});Aa(()=>t()),Aa(()=>n.disconnect()),Aa(()=>o.disconnect()),Aa(()=>{Jr(),Nr=false,Yr=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function ud(){_N(),AN(),console.log("🛑 [BulkFavorite] Stopped");}function $N(e){const t=zi();t.enabled=e,e?dd():ud();}let Ea=false;const FN={init(){Ea||(dd(),Ea=true);},destroy(){Ea&&(ud(),Ea=false);},isEnabled(){return Kh()},renderButton:cd,removeButton:ON,startWatching:dd,stopWatching:ud,setEnabled:$N},DN=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,BN=`
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
`;let rg=false;function zN(){if(rg)return;rg=true;const e=document.createElement("style");e.textContent=BN,document.head.appendChild(e);}const ig=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],ag=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function GN(){const e=document.querySelector(ig.map(n=>`button[aria-label="${ag(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(ig.reduce((o,r)=>o+t.querySelectorAll(`button[aria-label="${ag(r)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function HN(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(s=>s.dataset.alertBtn!=="true"&&(s.getAttribute("aria-label")||"")!=="Alerts"),o=n.length?n:t,r=o[o.length-1]||null,i=r?.parentElement,a=i&&i.parentElement===e&&i.tagName==="DIV"?i:null;return {refBtn:r,refWrapper:a}}function jN(e,t,n){const o=e.cloneNode(false);o.type="button",o.setAttribute("aria-label",t),o.title=t,o.dataset.alertBtn="true",o.style.pointerEvents="auto",o.style.position="relative",o.removeAttribute("id");const r=document.createElement("div");return r.innerHTML=n,r.dataset.alertIcon="true",r.style.pointerEvents="none",r.style.userSelect="none",r.style.width="76%",r.style.height="76%",r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.margin="auto",o.appendChild(r),o}function UN(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function WN(e){zN();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:DN,n=e.ariaLabel||"Alerts";let o=null,r=null,i=null,a=null,s=false,l=null,c=null,d=null;function u(){if(s)return  false;s=true;let x=false;try{const w=GN();if(!w)return !1;l!==w&&(l=w);const{refBtn:v,refWrapper:k}=HN(w);if(!v)return !1;r=w.querySelector('div[data-alert-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.alertWrapper="true",r.removeAttribute("id"),x=!0);const T=r?.querySelector('button[data-alert-btn="true"]')||null;o||(o=T),o||(o=jN(v,n,t),o.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation();try{e.onClick?.();}catch{}}),i=UN(),o.appendChild(i),r?r.appendChild(o):o.parentElement!==w&&w.appendChild(o),x=!0),r&&r.parentElement!==w&&(w.appendChild(r),x=!0);const b=w;if(b&&b!==c){try{h.disconnect();}catch{}c=b,h.observe(c,{childList:!0,subtree:!0});}return x}finally{s=false;}}const p=document.getElementById("App")||document.body;let f=null,g=false;const h=new MutationObserver(()=>{g&&o&&document.contains(o)||(o&&!document.contains(o)&&(g=false,o=null,i=null,r=null),f===null&&(f=window.setTimeout(()=>{if(f=null,u()&&o&&document.contains(o)&&(g=true,r)){const w=r.parentElement;w&&w.lastElementChild!==r&&w.appendChild(r);}},100)));});return u()&&o&&document.contains(o)&&(g=true),h.observe(p,{childList:true,subtree:true}),a=()=>h.disconnect(),{get root(){return o},updateBadge(x){i&&(x>0?(i.textContent=String(x),i.style.display="flex"):i.style.display="none");},ring(){if(!o)return;const x=o.querySelector('[data-alert-icon="true"]');x&&(x.classList.add("alert-btn-ringing"),setTimeout(()=>{x?.classList.remove("alert-btn-ringing");},600));},startRinging(){o&&(d!==null&&clearInterval(d),this.ring(),d=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(d!==null&&(clearInterval(d),d=null),o){const x=o.querySelector('[data-alert-icon="true"]');x&&x.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{a?.();}catch{}try{r?.remove();}catch{}}}}const VN=`
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
`;function qN(e,t){const n=m("div",{className:"alert-item-row"}),o=m("div",{className:"alert-item-sprite"});if(e.spriteId)try{const c=Q.toCanvas(e.spriteId,{scale:.35});c?o.appendChild(c):o.textContent="?";}catch{o.textContent="?";}else o.textContent="?";const r=m("div",{className:"alert-item-info"}),i=m("div",{className:"alert-item-name"},e.itemName),a=m("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);r.appendChild(i),r.appendChild(a);const s=m("div",{className:"alert-item-actions"}),l=m("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return l.addEventListener("click",c=>{c.stopPropagation(),t?.(e);}),s.appendChild(l),n.appendChild(o),n.appendChild(r),n.appendChild(s),n}function XN(){const e=m("div",{className:"alert-overlay-empty"}),t=m("div",{className:"alert-overlay-empty-icon"},"🔔"),n=m("div",{className:"alert-overlay-empty-text"},"No items available"),o=m("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(o),e}function sg(e,t){const n=t.getBoundingClientRect(),o=340,r=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let i=n.bottom+r,a=window.innerWidth-n.right;const s=i+480>window.innerHeight,l=n.right-o<r;s?(e.style.bottom=`${window.innerHeight-n.top+r}px`,e.style.top="auto"):e.style.top=`${i}px`,e.style.right=`${a}px`,l&&(e.style.right="auto",e.style.left=`${r}px`);}function KN(e){const{items:t,anchorElement:n,onClose:o,onBuyAll:r}=e,i=m("div",{className:"alert-overlay"}),a=YR("theme",Lr.theme),s=_o[a];let l="";s&&(l=`.alert-overlay {
    ${Object.entries(s).map(([w,v])=>`${w}: ${v};`).join(`
    `)}
  }

`);const c=document.createElement("style");c.textContent=l+VN,i.appendChild(c);const d=m("div",{className:"alert-overlay-header"}),u=m("div",{className:"alert-overlay-title"},"Available Items"),p=m("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");p.addEventListener("click",x=>{x.stopPropagation(),o?.();}),d.appendChild(u),d.appendChild(p);const f=m("div",{className:"alert-overlay-list"});i.appendChild(d),i.appendChild(f);const g=x=>{if(f.replaceChildren(),x.length===0)f.appendChild(XN());else for(const w of x){const v=qN(w,r);f.appendChild(v);}};g(t),sg(i,n);const h=()=>{sg(i,n);};window.addEventListener("resize",h);const y=x=>{const w=x.target;!i.contains(w)&&!n.contains(w)&&o?.();};return document.addEventListener("click",y,{capture:true}),{root:i,updateItems:g,destroy(){window.removeEventListener("resize",h),document.removeEventListener("click",y,{capture:true}),i.remove();}}}const YN={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},JN={seed:"seed",tool:null,egg:null,decor:null};function Vx(e,t,n){try{const o=YN[t],r=J.get(o);if(!r||typeof r!="object")return null;const i=r[e];if(!i||typeof i!="object")return null;const a=JN[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch{return null}}function QN(e,t){return Vx(e,t,"spriteId")}function ZN(e,t){return Vx(e,t,"name")??e}function eO(e,t){const n=Wt.getTrackedItems(),o=new Set(n.filter(i=>i.shopType===e).map(i=>i.itemId));return o.size===0?[]:t.items.filter(i=>{const a=o.has(i.id),s=i.isAvailable;return a&&s}).map(i=>({shopType:e,itemId:i.id,itemName:ZN(i.id,e),spriteId:QN(i.id,e),remaining:i.remaining,price:i.price}))}function Or(){const t=co().get(),n=["seed","tool","egg","decor"],o=[];for(const r of n){const i=t.byType[r];if(i){const a=eO(r,i);o.push(...a);}}return o}function tO(e){return co().subscribeStable(()=>{const o=Or();e(o);})}function nO(){let e=null,t=null,n=null,o=false,r=[],i=[],a="",s=0,l=0,c=false,d=null,u=[],p=0,f=false;const g=()=>{try{return De.CustomSounds.getNotificationConfig("shop")}catch{return null}},h=(E,P)=>{try{const A=ge.getItemCustomSound("shop",E,P);return A?{soundId:A.soundId,volume:A.volume,mode:A.mode}:null}catch{return null}},y=E=>`${E.soundId}:${E.volume}`,x=(E,P,A,M)=>{P.has(A)||(E.push({soundId:A,volume:M}),P.add(A));},w=(E,P)=>{const A=[],M=new Set;let R=false;const L=[];for(const F of E){const V=h(F.itemId,F.shopType);V?V.mode==="one-shot"&&L.push({soundId:V.soundId,volume:V.volume}):P?.mode==="one-shot"&&(R=true);}R&&P&&x(A,M,P.soundId,P.volume);for(const F of L)x(A,M,F.soundId,F.volume);return A},v=(E,P)=>{const A=[],M=new Set;let R=false;const L=[];for(const F of E){const V=h(F.itemId,F.shopType);V?V.mode==="loop"&&L.push({soundId:V.soundId,volume:V.volume}):P?.mode==="loop"&&(R=true);}R&&P&&x(A,M,P.soundId,P.volume);for(const F of L)x(A,M,F.soundId,F.volume);return A},k=(E,P,A,M=false)=>{if(!A())return;const R=ge.getById(E.soundId);if(!R){P();return}M&&(d=R.source),De.playCustom(R.source,{volume:E.volume/100}).then(L=>{if(!A())return;const F=L.audio,V=()=>{A()&&P();};F.addEventListener("ended",V,{once:true});}).catch(()=>{A()&&P();});},T=()=>{if(!c||i.length===0)return;const E=i[s];s=(s+1)%i.length;const P=l,A=()=>c&&l===P;k(E,()=>{A()&&T();},A,true);},b=()=>{c||i.length===0||(c=true,s>=i.length&&(s=0),T());},S=()=>{if(c){l+=1,c=false;try{const E=De.getCustomHandle();(!d||E&&E.url===d)&&De.CustomSounds.stop();}catch{}d=null;}},_=()=>{S(),i=[],a="",s=0,d=null;},C=()=>{if(u.length===0){f=false,b();return}f=true;const E=u.shift(),P=p,A=()=>f&&p===P;k(E,()=>{A()&&C();},A);},I=(E,P)=>{const A=P??g(),M=w(E,A);if(M.length===0)return;const R=new Set(u.map(L=>L.soundId));for(const L of M)R.has(L.soundId)||(u.push(L),R.add(L.soundId));f||(p+=1,S(),C());},O=(E,P)=>{const A=P??g(),M=v(E,A);if(M.length===0){_();return}const R=M.map(y).join("|"),L=R!==a;i=M,a=R,L&&(s=0,c&&S()),!f&&(c||b());},z=E=>{const P=r.length>0,A=E.length>0;r=E,e?.updateBadge(E.length),A?P||e?.startRinging():P&&e?.stopRinging();},j=()=>{if(o||!e?.root)return;const E=Or();t=KN({items:E,anchorElement:e.root,onClose:W,onBuyAll:P=>{switch(P.shopType){case "seed":Hn.seed.buyAll(P.itemId);break;case "egg":Hn.egg.buyAll(P.itemId);break;case "decor":Hn.decor.buyAll(P.itemId);break;case "tool":Hn.tool.buyAll(P.itemId);break}}}),document.body.appendChild(t.root),o=true;},W=()=>{!o||!t||(t.destroy(),t=null,o=false);},Y=()=>{o?W():j();},N=E=>{if(z(E),o&&t&&t.updateItems(E),O(E),E.length>0){const P=new CustomEvent("gemini:alert-available",{detail:{items:E}});window.dispatchEvent(P);}},D=()=>{const E=Or(),P=new Set(r.map(L=>`${L.shopType}:${L.itemId}`)),A=E.filter(L=>!P.has(`${L.shopType}:${L.itemId}`)),M=A.length>0;z(E),o&&t&&t.updateItems(E);const R=g();O(E,R),M&&I(A,R);};e=WN({onClick:Y,ariaLabel:"Alerts"}),n=tO(N),window.addEventListener("gemini:tracked-items-changed",D);const H=E=>{const P=E,{shopType:A,items:M}=P.detail;if(!M||M.length===0)return;const R=M.map(L=>({itemId:L.itemId,shopType:A}));I(R,g());};window.addEventListener("gemini:shop-restock-tracked",H);const G=E=>{if(E.detail?.entityType!=="shop")return;const A=Or();O(A,g());};window.addEventListener(Cn.CUSTOM_SOUND_CHANGE,G);const q=(E=1,P=10)=>{if(co().get().all.some(L=>L.items.length>0)||E>=P){const L=Or();z(L);const F=g();O(L,F),L.length>0&&I(L,F);}else setTimeout(()=>q(E+1,P),500);};return q(),{destroy(){W(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",D),window.removeEventListener("gemini:shop-restock-tracked",H),window.removeEventListener(Cn.CUSTOM_SOUND_CHANGE,G),e?.destroy(),e=null,u=[],p+=1,f=false,_();}}}const oO=`
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
`,ic={seed:"SeedSilo",pet:"PetHutch",decor:"DecorShed"};function lg(e){return Array.isArray(e)?e.filter(t=>typeof t=="object"&&t!==null&&"items"in t):[]}function rO(e){if(typeof e=="string")return e;if(e&&typeof e=="object"&&"decorId"in e){const t=e.decorId;return typeof t=="string"?t:null}return null}function ac(e,t){return e.filter(o=>rO(o.decorId)===t).flatMap(o=>o.items??[])}function cg(e){if(!e.length)return 0;const t=J.get("plants");return t?e.reduce((n,o)=>{const i=t[o.species]?.seed?.coinPrice??0;return n+i*(o.quantity??0)},0):0}function dg(e){if(!e.length)return 0;const t=J.get("decor");return t?e.reduce((n,o)=>{const i=t[o.decorId]?.coinPrice??0;return n+i*(o.quantity??0)},0):0}function iO(e){const t=J.get("pets");if(!t)return 0;const n=t[e.petSpecies],o=n?.maturitySellPrice??n?.sellPrice??0,r=Mi(e.petSpecies,e.targetScale),i=Li(e.petSpecies,e.xp,r),s=gh(i,r)*e.targetScale,l=eu(e.mutations??[]);return Math.round(o*s*l)}function ug(e){return e.length?e.reduce((t,n)=>t+iO(n),0):0}function aO(){return {async start(e){const t=[],n=(l,c)=>{const d=ac(l,ic.seed).filter(g=>g.itemType==="Seed"),u=cg(d),p=c.filter(g=>g.itemType==="Seed"),f=cg(p);e({kind:"seed",storageValue:u,inventoryValue:f,totalValue:u+f});},o=(l,c)=>{const d=ac(l,ic.decor).filter(g=>g.itemType==="Decor"),u=dg(d),p=c.filter(g=>g.itemType==="Decor"),f=dg(p);e({kind:"decor",storageValue:u,inventoryValue:f,totalValue:u+f});},r=(l,c)=>{const d=ac(l,ic.pet).filter(g=>g.itemType==="Pet"),u=ug(d),p=c.filter(g=>g.itemType==="Pet"),f=ug(p);e({kind:"pet",storageValue:u,inventoryValue:f,totalValue:u+f});},i=l=>{const c=lg(l?.storages??[]),d=l?.items??[];n(c,d),o(c,d),r(c,d);},a=l=>{const c=lg(l);n(c,[]),o(c,[]),r(c,[]);};let s=null;try{s=await ke.subscribeImmediate("myInventoryAtom",i);}catch(l){console.warn("[StorageValueIndicator] Failed to subscribe myInventoryAtom",l);try{s=await ke.subscribeImmediate("myItemStoragesAtom",a);}catch(c){console.warn("[StorageValueIndicator] Failed to subscribe myItemStoragesAtom",c);}}return s&&t.push(s),()=>{for(const l of t)try{l();}catch{}t.length=0;}}}}const sO={seed:"Seeds in Silo",pet:"Pets in Hutch",decor:"Decor in Shed"},pg="gemini-qol-storageValue-styles",lO="gemini-qol-storageValue",qx="gemini-qol-storageValue-text",cO={seedSilo:"seed",petHutch:"pet",decorShed:"decor"};let on=Qe(),ki=false,ts=false,oo=null,pd=null,St=null,Qr="",Ia=null,rn={seed:{storage:0,inventory:0,total:0},pet:{storage:0,inventory:0,total:0},decor:{storage:0,inventory:0,total:0}},Kn=null;function Xx(){if(ts)return;if(document.getElementById(pg)){ts=true;return}const e=document.createElement("style");e.id=pg,e.textContent=oO,document.head.appendChild(e),on.add(()=>e.remove()),ts=true;}function Xu(){St?.remove(),St=null,pd=null,Qr="";}function fd(e){if(!St)return;const t=St.querySelector(`.${qx}`);t&&(t.textContent=Yx(e),St.dataset.rawValue=String(Math.round(e)),St.title=`${e.toLocaleString()} coins`);}function ns(){if(!St||!oo)return;const e=rn[oo];St.dataset.rawValue=String(Math.round(e.total)),St.title=`${e.storage.toLocaleString()} + ${e.inventory.toLocaleString()}`;}function Kx(){const e=rn.seed,t=rn.pet,n=rn.decor;return `${e.storage}|${e.inventory}|${e.total}|${t.storage}|${t.inventory}|${t.total}|${n.storage}|${n.inventory}|${n.total}`}function dO(e){const t=document.createElement("div");t.className=lO,t.dataset.rawValue=String(Math.round(e)),t.title=`${e.toLocaleString()} coins`;const n=document.createElement("div");n.className="gemini-qol-storageValue-sprite";const o=document.createElement("canvas");o.width=20,o.height=20,n.appendChild(o);const r=document.createElement("div");r.className=qx,r.textContent=Yx(e),t.appendChild(n),t.appendChild(r);try{const i=Q.toCanvas("ui","Coin");if(i){const a=o.getContext("2d");if(a){const s=Math.min(o.width/i.width,o.height/i.height),l=i.width*s,c=i.height*s,d=(o.width-l)/2,u=(o.height-c)/2;a.drawImage(i,d,u,l,c);}}}catch(i){console.warn("[StorageValueIndicator] Failed to render coin sprite:",i);}return t}function Yx(e){const t=Math.round(e);if(t>=1e15)return `${(t/1e15).toFixed(2)}Q`;if(t>=1e12)return `${(t/1e12).toFixed(2)}T`;if(t>=1e9)return `${(t/1e9).toFixed(2)}B`;if(t>=1e6)return `${(t/1e6).toFixed(2)}M`;if(t>=1e3){const n=t/1e3;return n>=100?`${Math.round(n)}K`:`${n.toFixed(1)}K`}return String(t)}function os(e){const t=sO[e],n=document.querySelectorAll(".chakra-text, p, span");for(const o of n){if(o.textContent?.trim()!==t||!o.offsetParent)continue;const i=o.closest(".McGrid");if(!(!i||!i.querySelector(".McFlex")))return i}return null}function Jx(){return os("seed")?"seed":os("pet")?"pet":os("decor")?"decor":null}function uO(e){const t=os(e);if(!t)return;const n=Kx();if(t===pd&&St?.isConnected){n!==Qr&&(Qr=n,fd(rn[e].total),ns()),fd(rn[e].total),ns();return}Xu(),pd=t;const o=dO(rn[e].total);St=o,Qr=n,ns();const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="flex-start",r.style.position="relative",r.style.minHeight="20px",r.appendChild(o),t.insertBefore(r,t.firstChild),on.add(()=>r.remove());}function gd(e){if(e!==oo){if(oo=e,!e){Xu();return}Xx(),uO(e);}}async function pO(){if(Ia)return;Ia=await aO().start(({kind:t,storageValue:n,inventoryValue:o,totalValue:r})=>{rn[t]={storage:n,inventory:o,total:r},oo===t&&St&&(Qr=Kx(),fd(r),ns());}),on.add(()=>{Ia?.(),Ia=null;});}function rs(){const e=oo??Jx();gd(e);}function fO(){Kn!==null&&clearTimeout(Kn),Kn=window.setTimeout(()=>{Kn=null,tr()||Ut(()=>rs());},200);}function gO(){setTimeout(rs,100),setTimeout(rs,400),setTimeout(rs,800);const e=new MutationObserver(()=>{tr()||fO();});e.observe(document.body,{childList:true,subtree:true}),uo(on,e),on.add(()=>{Kn!==null&&(clearTimeout(Kn),Kn=null);});}function mO(){ki||(ki=true,Xx(),pO(),Bs.onChangeNow(e=>{const t=e?cO[String(e)]??null:null;if(t){gd(t);return}const n=Jx();gd(n);}).then(e=>{on.add(()=>e());}),gO());}function hO(){ki&&(ki=false,Xu(),on.run(),on.clear(),on=Qe(),ts=false,oo=null,rn={seed:{storage:0,inventory:0,total:0},pet:{storage:0,inventory:0,total:0},decor:{storage:0,inventory:0,total:0}});}function bO(){return ki}const xO={init:mO,destroy:hO,isEnabled:bO};function yO(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=rh(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),iN({debug:false}),()=>{t?.(),t=null;}}async function vO(e){e.logStep("Atoms","Prewarming Jotai store...");try{await bm(),await Ds({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function wO(e){e.logStep("Globals","Initializing global variables...");try{vh(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function SO(e){e.logStep("API","Exposing Gemini API...");try{YL(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function sc(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function CO(e){e.logStep("HUD","Loading HUD preferences..."),await sc();const t=KR();await sc();const n=await XR({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Ca("width",o),onOpenChange:o=>Ca("isOpen",o),themes:_o,initialTheme:t.theme,onThemeChange:o=>Ca("theme",o),buildSections:o=>hR({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme,setHUDWidth:o.setHUDWidth,setHUDOpen:o.setHUDOpen}),initialTab:t.activeTab,onTabChange:o=>Ca("activeTab",o)});return await sc(),e.logStep("HUD","HUD ready","success"),n}async function kO(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await wh(o=>{o.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):o.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${o.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function _O(e){try{Q.isReady()||await Q.init(),J.resolveSprites();const t=[],n=J.get("plants");if(n)for(const l of Object.values(n))l?.seed?.spriteId&&t.push(l.seed.spriteId),l?.plant?.spriteId&&t.push(l.plant.spriteId),l?.crop?.spriteId&&t.push(l.crop.spriteId);const o=J.get("pets");if(o)for(const l of Object.values(o))l?.spriteId&&t.push(l.spriteId);const r=J.get("items");if(r)for(const l of Object.values(r))l?.spriteId&&t.push(l.spriteId);const i=J.get("eggs");if(i)for(const l of Object.values(i))l?.spriteId&&t.push(l.spriteId);const a=J.get("decor");if(a)for(const l of Object.values(a))l?.spriteId&&t.push(l.spriteId);const s=[...new Set(t)];s.length>0&&await Q.warmup(s,()=>{},5);}catch(t){console.warn("[Bootstrap] Sprite warmup failed",t);}}async function TO(e){e.logStep("Sections","Preloading UI sections...");try{await bR(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function AO(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:Po.init.bind(Po)},{name:"PetTeam",init:he.init.bind(he)},{name:"BulkFavorite",init:Hc.init.bind(Hc)},{name:"XPTracker",init:Wc.init.bind(Wc)},{name:"CropValueIndicator",init:Ua.init.bind(Ua)},{name:"CropSizeIndicator",init:qa.init.bind(qa)},{name:"ShopNotifier",init:Wt.init.bind(Wt)},{name:"WeatherNotifier",init:Ko.init.bind(Ko)},{name:"PetHungerNotifier",init:Si.init.bind(Si)},{name:"AriesAPI",init:Ps.init.bind(Ps)},{name:"HarvestLocker",init:Yt.init.bind(Yt)},{name:"MissingVariantsIndicator",init:Xl.init.bind(Xl)},{name:"Journal",init:qe.init.bind(qe)}];let n=0;for(const o of t)try{o.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(r){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${o.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${o.name} init failed`,r);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const o=ls();o.register({id:"bulkFavoriteInject",name:"Bulk Favorite Inject",description:"Quick favorite/unfavorite multiple mutations",injection:FN,storageKey:Me.BULK_FAVORITE,defaultEnabled:!1}),o.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:Ua.render,storageKey:Me.CROP_VALUE_INDICATOR,defaultEnabled:!1}),o.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:qa.render,storageKey:Me.CROP_SIZE_INDICATOR,defaultEnabled:!1}),o.register({id:"missingVariantsIndicator",name:"Missing Variants",description:"Shows colored letters for unlogged crop variants",injection:Xl.render,storageKey:Me.MISSING_VARIANTS_INDICATOR,defaultEnabled:!1}),o.register({id:"storageValueIndicator",name:"Storage Value",description:"Shows total coin value for storage modals",injection:xO,storageKey:mn.STORAGE_VALUE_INDICATOR,defaultEnabled:!0}),o.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(o){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",o);}}$g();iS();(async function(){py();const e=ny({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=yO(e),await vO(e),wO(e),SO(e),await kO(e),await Promise.all([(async()=>{AO(e);})(),(async()=>{await _O(e);})()]),await TO(e),e.succeed("Gemini is ready!");}catch(o){e.fail("Failed to initialize the mod.",o);}finally{t?.();}const n=await CO(e);ZR({onClick:()=>n.setOpen(true)}),nO();})();

})();