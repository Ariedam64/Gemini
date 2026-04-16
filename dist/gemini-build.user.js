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
// @connect      magicgarden.gg
// @connect      mg-api.ariedam.fr
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
  var zv=Object.defineProperty;var jv=(e,t,n)=>t in e?zv(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var xe=(e,t,n)=>jv(e,typeof t!="symbol"?t+"":t,n);function w(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const pa="https://i.imgur.com/k5WuC32.png",fp="gemini-loader-style",Cr="gemini-loader",Qf=80;function Gv(){if(document.getElementById(fp))return;const e=document.createElement("style");e.id=fp,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Cr} {
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
    #${Cr} {
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

    #${Cr}.gemini-loader--error .gemini-loader__actions {
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
    #${Cr}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Cr}.gemini-loader--error .gemini-loader__spinner {
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
      #${Cr} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function fa(e,t,n){const r=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Qf;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Uv(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(pa);return}GM_xmlhttpRequest({method:"GET",url:pa,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(pa),r.readAsDataURL(n);},onerror:()=>e(pa)});})}function Wv(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Gv();const n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=w("div",{className:"gemini-loader__logs"}),o=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=w("div",{className:"gemini-loader__spinner"},o);Uv().then(P=>{o.src=P;});const a=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},i,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),l=w("div",{id:Cr},a);(document.body||document.documentElement).appendChild(l);const u=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>l.remove()}));a.appendChild(u),l.style.setProperty("--loader-blur",`${t}px`);const f=P=>{n.textContent=P;},p=new Map,m=(P,I)=>{P.className=`gemini-loader__log ${I}`;};return {log:(P,I="info")=>fa(r,P,I),logStep:(P,I,T="info")=>{const N=String(P||"").trim();if(!N){fa(r,I,T);return}const z=p.get(N);if(z){z.el.lastElementChild&&(z.el.lastElementChild.textContent=I),z.tone!==T&&(m(z.el,T),z.tone=T);return}const O=w("div",{className:`gemini-loader__log ${T}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:I}));for(p.set(N,{el:O,tone:T}),r.appendChild(O);r.childElementCount>Qf;){const M=r.firstElementChild;if(!M)break;const F=Array.from(p.entries()).find(([,L])=>L.el===M)?.[0];F&&p.delete(F),M.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:f,succeed:(P,I=600)=>{P&&fa(r,P,"success"),l.classList.add("gemini-loader--closing"),setTimeout(()=>l.remove(),I);},fail:(P,I)=>{fa(r,P,"error"),f("Something went wrong. Check the console for details."),l.classList.add("gemini-loader--error"),console.error("[Gemini loader]",P,I);}}}const hp=150,Hv=30;function Vv(e,t,n){const r=w("div",{className:"lg-pill",id:"pill"}),o=e.map(C=>{const E=w("button",{className:"lg-tab"},C.label);return E.setAttribute("data-target",C.id),E}),i=w("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=new Map(e.map(C=>[C.id,true])),l=new Map(o.map((C,E)=>[e[E].id,C]));function u(C){const E=document.createElementNS("http://www.w3.org/2000/svg","svg");E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.setAttribute("stroke","currentColor"),E.setAttribute("stroke-width","2"),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round");const B=document.createElementNS("http://www.w3.org/2000/svg","polyline");return B.setAttribute("points",C==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),E.appendChild(B),E}const f=w("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});f.appendChild(u("left"));const p=w("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});p.appendChild(u("right"));const v=w("div",{className:"lg-tabs-wrapper"},f,i,p);let y=0,b=0,A=false;function P(){const C=i.scrollLeft>0,E=i.scrollLeft<i.scrollWidth-i.clientWidth-1;f.classList.toggle("disabled",!C),p.classList.toggle("disabled",!E);}f.addEventListener("click",()=>{i.scrollBy({left:-hp,behavior:"smooth"}),setTimeout(P,300);}),p.addEventListener("click",()=>{i.scrollBy({left:hp,behavior:"smooth"}),setTimeout(P,300);}),i.addEventListener("wheel",C=>{Math.abs(C.deltaY)>Math.abs(C.deltaX)&&(C.preventDefault(),i.scrollLeft+=C.deltaY,P());},{passive:false});let I=0;i.addEventListener("touchstart",C=>{const E=C.touches[0];y=E.clientX,b=E.clientY,A=false,I=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",C=>{if(A)return;const E=C.touches[0],B=E.clientX-y,j=E.clientY-b;if(Math.abs(j)>Math.abs(B)){A=true;return}Math.abs(B)>Hv&&(C.preventDefault(),i.scrollLeft=I-B);},{passive:false}),i.addEventListener("touchend",()=>{P();},{passive:true}),i.addEventListener("scroll",P,{passive:true});function T(C){const E=o.find(B=>B.dataset.target===C)||o[0];E&&requestAnimationFrame(()=>{const B=E.offsetLeft,j=E.offsetWidth;r.style.width=`${j}px`,r.style.transform=`translateX(${B}px)`;const V=i.scrollLeft,U=V,ce=V+i.clientWidth,Y=B-12,ie=B+j+12;Y<U?i.scrollTo({left:Y,behavior:"smooth"}):ie>ce&&i.scrollTo({left:ie-i.clientWidth,behavior:"smooth"}),setTimeout(P,300);});}function N(){for(const[C,E]of a)if(E)return C;return null}function z(C){const E=l.get(C);if(E)if(a.set(C,false),E.style.display="none",F===C){const B=N();B&&L(B);}else M();}function O(C){const E=l.get(C);E&&(a.set(C,true),E.style.display="",M());}function M(){T(F),P();}let F=t||(e[0]?.id??"");function L(C){a.get(C)&&(F=C,o.forEach(E=>E.classList.toggle("active",E.dataset.target===C)),T(C),n(C));}return o.forEach(C=>C.addEventListener("click",()=>L(C.dataset.target))),queueMicrotask(()=>{T(F),P();}),{root:v,activate:L,recalc:M,getActive:()=>F,showTab:O,hideTab:z,isTabVisible:C=>a.get(C)??false,getVisibleTabs:()=>[...a.entries()].filter(([C,E])=>E).map(([C])=>C)}}class Br{constructor(t){xe(this,"id");xe(this,"label");xe(this,"container",null);xe(this,"cleanupFunctions",[]);xe(this,"preloadedContent",null);xe(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=w("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Kv{constructor(t,n,r){xe(this,"sections");xe(this,"activeId",null);xe(this,"container");xe(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const Jr="gemini:",Yv={STATE:"hud:state",THEME:"hud:theme"},qv={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},Xv={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},Qv={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},At={ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config",HARVEST_LOCKER:"feature:harvestLocker:config",EGG_LOCKER:"feature:eggLocker:config",DECOR_LOCKER:"feature:decorLocker:config"},Jv={},Zv={AUTO_RELOAD:"dev:auto-reload"},$t={HUD:Yv,SECTION:qv,MODULE:Xv,GLOBAL:Qv,FEATURE:At,INJECT:Jv,DEV:Zv},ft={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change",HARVEST_LOCKER_LOCKS_UPDATED:"gemini:harvestLocker-locks-updated",EGG_LOCKER_LOCKS_UPDATED:"gemini:eggLocker-locks-updated",DECOR_LOCKER_LOCKS_UPDATED:"gemini:decorLocker-locks-updated"};function at(e,t){try{const n=e.startsWith(Jr)?e:Jr+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function st(e,t){try{const n=e.startsWith(Jr)?e:Jr+e,r=e.startsWith(Jr)?e.slice(Jr.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function ey(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),l=o.slice(e.length);st(l,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(st("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Jf="gemini.sections";function Zf(){const e=at(Jf,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function ty(e){st(Jf,e);}async function ny(e){return Zf()[e]}function ry(e,t){const n=Zf();ty({...n,[e]:t});}function go(e,t){return {...e,...t??{}}}async function oy(e){const t=await ny(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((f=>JSON.parse(JSON.stringify(f)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){ry(e.path,n);}function i(){return n}function a(f){n=e.sanitize?e.sanitize(f):f,o();}function l(f){const m=Object.assign((v=>JSON.parse(JSON.stringify(v)))(n),{});typeof f=="function"?f(m):Object.assign(m,f),n=e.sanitize?e.sanitize(m):m,o();}function u(){o();}return {get:i,set:a,update:l,save:u}}async function _o(e,t){const{path:n=e,...r}=t;return oy({path:n,...r})}let iy=0;const ha=new Map;function pt(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:l=false,defaultExpanded:u=true,onExpandChange:f,mediaTop:p,title:m,subtitle:v,badge:y,actions:b,footer:A,divider:P=false,tone:I="neutral",stateKey:T}=e,N=w("div",{className:"card",id:n,tabIndex:a?0:void 0});N.classList.add(`card--${o}`,`card--p-${i}`),a&&N.classList.add("card--interactive"),I!=="neutral"&&N.classList.add(`card--tone-${I}`),r&&N.classList.add(...r.split(" ").filter(Boolean)),l&&N.classList.add("card--expandable");const z=l?T??n??(typeof m=="string"?`title:${m}`:null):null;let O=!l||u;z&&ha.has(z)&&(O=!!ha.get(z));let M=null,F=null,L=null,C=null,E=null;const B=n?`${n}-collapse`:`card-collapse-${++iy}`,j=()=>{if(C!==null&&(cancelAnimationFrame(C),C=null),E){const se=E;E=null,se();}},V=(se,ae)=>{if(!L)return;j();const ne=L;if(ne.setAttribute("aria-hidden",String(!se)),!ae){ne.classList.remove("card-collapse--animating"),ne.style.display=se?"":"none",ne.style.height="",ne.style.opacity="";return}if(ne.classList.add("card-collapse--animating"),ne.style.display="",se){ne.style.height="auto";const $=ne.scrollHeight;if(!$){ne.classList.remove("card-collapse--animating"),ne.style.display="",ne.style.height="",ne.style.opacity="";return}ne.style.height="0px",ne.style.opacity="0",ne.offsetHeight,C=requestAnimationFrame(()=>{C=null,ne.style.height=`${$}px`,ne.style.opacity="1";});}else {const $=ne.scrollHeight;if(!$){ne.classList.remove("card-collapse--animating"),ne.style.display="none",ne.style.height="",ne.style.opacity="";return}ne.style.height=`${$}px`,ne.style.opacity="1",ne.offsetHeight,C=requestAnimationFrame(()=>{C=null,ne.style.height="0px",ne.style.opacity="0";});}const q=()=>{ne.classList.remove("card-collapse--animating"),ne.style.height="",se||(ne.style.display="none"),ne.style.opacity="";};let Z=null;const R=$=>{$.target===ne&&(Z!==null&&(clearTimeout(Z),Z=null),ne.removeEventListener("transitionend",R),ne.removeEventListener("transitioncancel",R),E=null,q());};E=()=>{Z!==null&&(clearTimeout(Z),Z=null),ne.removeEventListener("transitionend",R),ne.removeEventListener("transitioncancel",R),E=null,q();},ne.addEventListener("transitionend",R),ne.addEventListener("transitioncancel",R),Z=window.setTimeout(()=>{E?.();},420);};function U(se){const ae=document.createElementNS("http://www.w3.org/2000/svg","svg");return ae.setAttribute("viewBox","0 0 24 24"),ae.setAttribute("width","16"),ae.setAttribute("height","16"),ae.innerHTML=se==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',ae}function ce(se,ae=true,ne=true){O=se,N.classList.toggle("card--collapsed",!O),N.classList.toggle("card--expanded",O),M&&(M.dataset.expanded=String(O),M.setAttribute("aria-expanded",String(O))),F&&(F.setAttribute("aria-expanded",String(O)),F.classList.toggle("card-toggle--collapsed",!O),F.setAttribute("aria-label",O?"Replier le contenu":"Deplier le contenu"),F.replaceChildren(U(O?"up":"down"))),l?V(O,ne):L&&(L.style.display="",L.style.height="",L.style.opacity="",L.setAttribute("aria-hidden","false")),ae&&f&&f(O),z&&ha.set(z,O);}if(p){const se=w("div",{className:"card-media"});se.append(p),N.appendChild(se);}const Y=!!(m||v||y||b&&b.length||l);if(Y){M=w("div",{className:"card-header"});const se=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(m){const q=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},m);y&&q.append(typeof y=="string"?w("span",{className:"badge"},y):y),se.appendChild(q);}if(v){const q=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},v);se.appendChild(q);}(se.childNodes.length||l)&&M.appendChild(se);const ae=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),ne=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});b?.forEach(q=>ne.appendChild(q)),ne.childNodes.length&&ae.appendChild(ne),l&&(F=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(O),ariaControls:B,ariaLabel:O?"Replier le contenu":"Deplier le contenu"}),F.textContent=O?"▲":"▼",F.addEventListener("click",q=>{q.preventDefault(),q.stopPropagation(),ce(!O);}),ae.appendChild(F),M.classList.add("card-header--expandable"),M.addEventListener("click",q=>{const Z=q.target;Z?.closest(".card-actions")||Z?.closest(".card-toggle")||ce(!O);})),ae.childNodes.length&&M.appendChild(ae),N.appendChild(M);}L=w("div",{className:"card-collapse",id:B,ariaHidden:l?String(!O):"false"}),N.appendChild(L),P&&Y&&L.appendChild(w("div",{className:"card-divider"}));const ie=w("div",{className:"card-body"});if(ie.append(...t),L.appendChild(ie),A){P&&L.appendChild(w("div",{className:"card-divider"}));const se=w("div",{className:"card-footer"});se.append(A),L.appendChild(se);}return F&&F.setAttribute("aria-controls",B),ce(O,false,false),z&&ha.set(z,O),N}let ds=false;const us=new Set,ln=e=>{const t=document.activeElement;for(const n of us)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function ay(){ds||(ds=true,window.addEventListener("keydown",ln,true),window.addEventListener("keypress",ln,true),window.addEventListener("keyup",ln,true),document.addEventListener("keydown",ln,true),document.addEventListener("keypress",ln,true),document.addEventListener("keyup",ln,true));}function sy(){ds&&(us.size>0||(ds=false,window.removeEventListener("keydown",ln,true),window.removeEventListener("keypress",ln,true),window.removeEventListener("keyup",ln,true),document.removeEventListener("keydown",ln,true),document.removeEventListener("keypress",ln,true),document.removeEventListener("keyup",ln,true)));}let kr=null;const xc=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),kr!==null&&(window.clearTimeout(kr),kr=null),document.removeEventListener("click",xc,true);};function ly(){document.addEventListener("click",xc,true),kr!==null&&window.clearTimeout(kr),kr=window.setTimeout(()=>{document.removeEventListener("click",xc,true),kr=null;},500);}function Fr(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:l=true,onChange:u,onOpenChange:f}=e,p=w("div",{className:"select",id:t}),m=w("button",{className:"select-trigger",type:"button"}),v=w("span",{className:"select-value"},o),y=w("span",{className:"select-caret"},"▾");m.append(v,y);const b=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});p.classList.add(`select--${i}`);let A=false,P=n,I=null,T=!!a;function N(q){return q==null?o:(e.options||r).find(R=>R.value===q)?.label??o}function z(q){v.textContent=N(q),b.querySelectorAll(".select-option").forEach(Z=>{const R=Z.dataset.value,$=q!=null&&R===q;Z.classList.toggle("selected",$),Z.setAttribute("aria-selected",String($));});}function O(q){b.replaceChildren(),q.forEach(Z=>{const R=w("button",{className:"select-option"+(Z.disabled?" disabled":""),type:"button",role:"option","data-value":Z.value,"aria-selected":String(Z.value===P),tabindex:"-1"},Z.label);Z.value===P&&R.classList.add("selected"),Z.disabled||R.addEventListener("pointerdown",$=>{$.preventDefault(),$.stopPropagation(),$.pointerType&&$.pointerType!=="mouse"&&ly(),B(Z.value,{notify:true}),C();},{capture:true}),b.appendChild(R);});}function M(){m.setAttribute("aria-expanded",String(A)),b.setAttribute("aria-hidden",String(!A));}function F(){const q=m.getBoundingClientRect();Object.assign(b.style,{minWidth:`${q.width}px`});}function L(){A||T||(A=true,p.classList.add("open"),M(),F(),document.addEventListener("mousedown",Y,true),document.addEventListener("scroll",ie,true),window.addEventListener("resize",se),b.focus({preventScroll:true}),l&&(ay(),us.add(p),I=()=>{us.delete(p),sy();}),f?.(true));}function C(){A&&(A=false,p.classList.remove("open"),M(),document.removeEventListener("mousedown",Y,true),document.removeEventListener("scroll",ie,true),window.removeEventListener("resize",se),m.focus({preventScroll:true}),I?.(),I=null,f?.(false));}function E(){A?C():L();}function B(q,Z={}){const R=P;P=q,z(P),Z.notify!==false&&R!==q&&u?.(q);}function j(){return P}function V(q){const Z=Array.from(b.querySelectorAll(".select-option:not(.disabled)"));if(!Z.length)return;const R=Z.findIndex(Q=>Q.classList.contains("active")),$=Z[(R+(q===1?1:Z.length-1))%Z.length];Z.forEach(Q=>Q.classList.remove("active")),$.classList.add("active"),$.focus({preventScroll:true}),$.scrollIntoView({block:"nearest"});}function U(q){(q.key===" "||q.key==="Enter"||q.key==="ArrowDown")&&(q.preventDefault(),L());}function ce(q){if(q.key==="Escape"){q.preventDefault(),C();return}if(q.key==="Enter"||q.key===" "){const Z=b.querySelector(".select-option.active")||b.querySelector(".select-option.selected");Z&&!Z.classList.contains("disabled")&&(q.preventDefault(),B(Z.dataset.value,{notify:true}),C());return}if(q.key==="ArrowDown"){q.preventDefault(),V(1);return}if(q.key==="ArrowUp"){q.preventDefault(),V(-1);return}}function Y(q){p.contains(q.target)||C();}function ie(){A&&F();}function se(){A&&F();}function ae(q){T=!!q,m.disabled=T,p.classList.toggle("disabled",T),T&&C();}function ne(q){e.options=q,O(q),q.some(Z=>Z.value===P)||(P=null,z(null));}return p.append(m,b),m.addEventListener("pointerdown",q=>{q.preventDefault(),q.stopPropagation(),E();},{capture:true}),m.addEventListener("keydown",U),b.addEventListener("keydown",ce),O(r),n!=null?(P=n,z(P)):z(null),M(),ae(T),{root:p,open:L,close:C,toggle:E,getValue:j,setValue:B,setOptions:ne,setDisabled:ae,destroy(){document.removeEventListener("mousedown",Y,true),document.removeEventListener("scroll",ie,true),window.removeEventListener("resize",se),I?.(),I=null;}}}function eh(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:l="text",required:u=false,disabled:f=false,tooltip:p,hint:m,icon:v,suffix:y,onClick:b}=e,A=w("div",{className:"lg-label-wrap",id:t}),P=w("label",{className:"lg-label",...r?{htmlFor:r}:{},...p?{title:p}:{}});if(v){const B=typeof v=="string"?w("span",{className:"lg-label-ico"},v):v;B.classList?.add?.("lg-label-ico"),P.appendChild(B);}const I=w("span",{className:"lg-label-text"},n);P.appendChild(I);const T=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&P.appendChild(T);let N=null;if(y!=null){N=typeof y=="string"?document.createTextNode(y):y;const B=w("span",{className:"lg-label-suffix"});B.appendChild(N),P.appendChild(B);}const z=m?w("div",{className:"lg-label-hint"},m):null;A.classList.add(`lg-label--${a}`),A.classList.add(`lg-label--${i}`),l==="title"&&A.classList.add("lg-label--title"),O(o),f&&A.classList.add("is-disabled"),A.appendChild(P),z&&A.appendChild(z),b&&P.addEventListener("click",b);function O(B){A.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),A.classList.add(`lg-label--${B}`);}function M(B){I.textContent=B;}function F(B){O(B);}function L(B){B&&!T.isConnected&&P.appendChild(T),!B&&T.isConnected&&T.remove(),B?P.setAttribute("aria-required","true"):P.removeAttribute("aria-required");}function C(B){A.classList.toggle("is-disabled",!!B);}function E(B){!B&&z&&z.isConnected?z.remove():B&&z?z.textContent=B:B&&!z&&A.appendChild(w("div",{className:"lg-label-hint"},B));}return {root:A,labelEl:P,hintEl:z,setText:M,setTone:F,setRequired:L,setDisabled:C,setHint:E}}function ti(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function ma(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=ti(e);return r&&n.appendChild(r),n}function cy(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function kt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:l=false,tooltip:u,type:f="button",onClick:p,disabled:m=false,fullWidth:v=false}=e,y=w("button",{className:"btn",id:n});y.type=f,r==="primary"&&y.classList.add("primary"),r==="danger"&&y.classList.add("danger"),o==="sm"&&y.classList.add("btn--sm"),u&&(y.title=u),v&&(y.style.width="100%");const b=cy(),A=i?ma(i,"left"):null,P=a?ma(a,"right"):null,I=document.createElement("span");I.className="btn-label";const T=ti(t);T&&I.appendChild(T),!T&&(A||P)&&y.classList.add("btn--icon"),y.appendChild(b),A&&y.appendChild(A),y.appendChild(I),P&&y.appendChild(P);const N=m||l;y.disabled=N,y.setAttribute("aria-busy",String(!!l)),b.style.display=l?"inline-block":"none",p&&y.addEventListener("click",p);const z=y;return z.setLoading=O=>{y.setAttribute("aria-busy",String(!!O)),b.style.display=O?"inline-block":"none",y.disabled=O||m;},z.setDisabled=O=>{y.disabled=O||y.getAttribute("aria-busy")==="true";},z.setLabel=O=>{I.replaceChildren();const M=ti(O);M&&I.appendChild(M),!M&&(A||P)?y.classList.add("btn--icon"):y.classList.remove("btn--icon");},z.setIconLeft=O=>{if(O==null){A?.remove();return}A?A.replaceChildren(ti(O)):y.insertBefore(ma(O,"left"),I);},z.setIconRight=O=>{if(O==null){P?.remove();return}P?P.replaceChildren(ti(O)):y.appendChild(ma(O,"right"));},z.setVariant=O=>{y.classList.remove("primary","danger"),O==="primary"&&y.classList.add("primary"),O==="danger"&&y.classList.add("danger");},z}function Or(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:l}=e,u=w("div",{className:"lg-switch-wrap"}),f=w("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),p=w("span",{className:"lg-switch-track"}),m=w("span",{className:"lg-switch-thumb"});f.append(p,m);let v=null;i&&a!=="none"&&(v=w("span",{className:"lg-switch-label"},i)),v&&a==="left"?u.append(v,f):v&&a==="right"?u.append(f,v):u.append(f);let y=!!n,b=!!r;function A(){f.classList.toggle("on",y),f.setAttribute("aria-checked",String(y)),f.disabled=b,f.setAttribute("aria-disabled",String(b));}function P(C=false){b||(y=!y,A(),C||l?.(y));}function I(C){C.preventDefault(),P();}function T(C){b||((C.key===" "||C.key==="Enter")&&(C.preventDefault(),P()),C.key==="ArrowLeft"&&(C.preventDefault(),z(false)),C.key==="ArrowRight"&&(C.preventDefault(),z(true)));}f.addEventListener("click",I),f.addEventListener("keydown",T);function N(){return y}function z(C,E=false){y=!!C,A(),E||l?.(y);}function O(C){b=!!C,A();}function M(C){if(!C){v&&(v.remove(),v=null);return}v?v.textContent=C:(v=w("span",{className:"lg-switch-label"},C),u.append(v));}function F(){f.focus();}function L(){f.removeEventListener("click",I),f.removeEventListener("keydown",T);}return A(),{root:u,button:f,isChecked:N,setChecked:z,setDisabled:O,setLabel:M,focus:F,destroy:L}}let th=null,md=null;function dy(){return th}function uy(e){th=e,md=null;}function nh(){return md}function py(e){md=e;}function fy(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function rh(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function oh(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function hy(){const e=dy();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function my(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function ih(){try{return window.top!==window.self}catch{return  true}}function gy(){const e=ih(),t=my(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Bs(){const e=nh();if(e)return e;const t=gy(),n=hy(),r=rh(),o=oh(),i=ih(),a=window.screen||{},l=window.visualViewport,u=Math.round(window.innerWidth||document.documentElement.clientWidth||0),f=Math.round(window.innerHeight||document.documentElement.clientHeight||0),p=Math.round(l?.width??u),m=Math.round(l?.height??f),v=Math.round(a.width||0),y=Math.round(a.height||0),b=Math.round(a.availWidth||v),A=Math.round(a.availHeight||y),P=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,I={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:u,viewportHeight:f,visualViewportWidth:p,visualViewportHeight:m,screenWidth:v,screenHeight:y,availScreenWidth:b,availScreenHeight:A,dpr:P,orientation:fy()};return py(I),I}function by(){return Bs().surface==="discord"}function vy(){return Bs().platform==="mobile"}function yy(){Bs();}function xy(){return nh()!==null}const Rt={init:yy,isReady:xy,detect:Bs,isDiscord:by,isMobile:vy,detectOS:rh,detectBrowser:oh,setPlatformOverride:uy};let ps=false;const ni=new Set;function wy(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const cn=e=>{const t=wy();if(t){for(const n of ni)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Cy(){ps||(ps=true,window.addEventListener("keydown",cn,true),window.addEventListener("keypress",cn,true),window.addEventListener("keyup",cn,true),document.addEventListener("keydown",cn,true),document.addEventListener("keypress",cn,true),document.addEventListener("keyup",cn,true));}function ky(){ps&&(ps=false,window.removeEventListener("keydown",cn,true),window.removeEventListener("keypress",cn,true),window.removeEventListener("keyup",cn,true),document.removeEventListener("keydown",cn,true),document.removeEventListener("keypress",cn,true),document.removeEventListener("keyup",cn,true));}function Sy(e){return ni.size===0&&Cy(),ni.add(e),()=>{ni.delete(e),ni.size===0&&ky();}}function Ay(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function Ey(e,t){return t?e.replace(t,""):e}function _y(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function zs(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:l=false,maxLength:u,blockGameKeys:f=true,debounceMs:p=0,onChange:m,onEnter:v,label:y}=e,b=w("div",{className:"lg-input-wrap"}),A=w("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(A.maxLength=u),r&&(A.value=r),y){const B=w("div",{className:"lg-input-label"},y);b.appendChild(B);}b.appendChild(A);const P=Ay(o,i,a,l),I=()=>{const B=A.selectionStart??A.value.length,j=A.value.length,V=Ey(A.value,P);if(V!==A.value){A.value=V;const U=j-V.length,ce=Math.max(0,B-U);A.setSelectionRange(ce,ce);}},T=_y(()=>m?.(A.value),p);A.addEventListener("input",()=>{I(),T();}),A.addEventListener("paste",()=>queueMicrotask(()=>{I(),T();})),A.addEventListener("keydown",B=>{B.key==="Enter"&&v?.(A.value);});const N=f?Sy(A):()=>{};function z(){return A.value}function O(B){A.value=B??"",I(),T();}function M(){A.focus();}function F(){A.blur();}function L(B){A.disabled=!!B;}function C(){return document.activeElement===A}function E(){N();}return {root:b,input:A,getValue:z,setValue:O,focus:M,blur:F,setDisabled:L,isFocused:C,destroy:E}}function Tt(e,t,n){return Math.min(n,Math.max(t,e))}function ui({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let l=0,u=0,f=0;switch(Math.floor(o)){case 0:l=i,u=a;break;case 1:l=a,u=i;break;case 2:u=i,f=a;break;case 3:u=a,f=i;break;case 4:l=a,f=i;break;default:l=i,f=a;break}const m=n-i,v=Math.round((l+m)*255),y=Math.round((u+m)*255),b=Math.round((f+m)*255);return {r:Tt(v,0,255),g:Tt(y,0,255),b:Tt(b,0,255),a:Tt(r,0,1)}}function ah({r:e,g:t,b:n,a:r}){const o=Tt(e,0,255)/255,i=Tt(t,0,255)/255,a=Tt(n,0,255)/255,l=Math.max(o,i,a),u=Math.min(o,i,a),f=l-u;let p=0;f!==0&&(l===o?p=60*((i-a)/f%6):l===i?p=60*((a-o)/f+2):p=60*((o-i)/f+4)),p<0&&(p+=360);const m=l===0?0:f/l;return {h:p,s:m,v:l,a:Tt(r,0,1)}}function gd({r:e,g:t,b:n}){const r=o=>Tt(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function Iy({r:e,g:t,b:n,a:r}){const o=Tt(Math.round(r*255),0,255);return `${gd({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function ri({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Zr(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function wc(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Zr(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),l=r[3]!=null?Number(r[3]):1;return [o,i,a,l].some(u=>Number.isNaN(u))?null:{r:o,g:i,b:a,a:l}}return null}function Ty(e,t){const n=wc(e)??Zr(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Tt(t,0,1)),ah(n)}function Py(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Ly(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function yr(e){const t=ui(e),n=ui({...e,a:1});return {hsva:{...e},hex:gd(n),hexa:Iy(t),rgba:ri(t),alpha:e.a}}function My(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:l,onChange:u}=e,p=a?a():Rt.detect().platform==="mobile";let m=Ty(r,o);const v=pt({id:t,className:"color-picker",title:n,padding:p?"md":"lg",variant:"soft",expandable:!p,defaultExpanded:!p&&i});v.classList.add(p?"color-picker--mobile":"color-picker--desktop");const y=v.querySelector(".card-header");y&&y.classList.add("color-picker__header");const b=y?.querySelector(".card-title"),A=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});b?b.prepend(A):y?y.prepend(A):v.prepend(A);const P=v.querySelector(".card-toggle");!p&&P&&A.addEventListener("click",()=>{v.classList.contains("card--collapsed")&&P.click();});const I=v.querySelector(".card-collapse");let T=null,N=null,z=null,O=null,M=null,F=null,L=null,C=null,E=null,B="hex";function j(ie){const se=yr(m);ie==="input"?l?.(se):u?.(se);}function V(){const ie=yr(m);if(A.style.setProperty("--cp-preview-color",ie.rgba),A.setAttribute("aria-label",`${n}: ${ie.hexa}`),!p&&T&&N&&z&&O&&M&&F&&L){const se=ui({...m,s:1,v:1,a:1}),ae=ri(se);T.style.setProperty("--cp-palette-hue",ae),N.style.left=`${m.s*100}%`,N.style.top=`${(1-m.v)*100}%`,z.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ri({...se,a:1})} 0%, ${ri({...se,a:0})} 100%)`),O.style.top=`${(1-m.a)*100}%`,M.style.setProperty("--cp-hue-color",ri(ui({...m,v:1,s:1,a:1}))),F.style.left=`${m.h/360*100}%`;const ne=m.a===1?ie.hex:ie.hexa,q=ie.rgba,Z=B==="hex"?ne:q;L!==document.activeElement&&(L.value=Z),L.setAttribute("aria-label",`${B.toUpperCase()} code for ${n}`),L.placeholder=B==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",B==="hex"?L.maxLength=9:L.removeAttribute("maxLength"),L.dataset.mode=B,C&&(C.textContent=B.toUpperCase(),C.setAttribute("aria-label",B==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),C.setAttribute("aria-pressed",B==="rgba"?"true":"false"),C.classList.toggle("is-alt",B==="rgba"));}E&&E!==document.activeElement&&(E.value=ie.hex);}function U(ie,se=null){m={h:(ie.h%360+360)%360,s:Tt(ie.s,0,1),v:Tt(ie.v,0,1),a:Tt(ie.a,0,1)},V(),se&&j(se);}function ce(ie,se=null){U(ah(ie),se);}function Y(ie,se,ae){ie.addEventListener("pointerdown",ne=>{ne.preventDefault();const q=ne.pointerId,Z=$=>{$.pointerId===q&&se($);},R=$=>{$.pointerId===q&&(document.removeEventListener("pointermove",Z),document.removeEventListener("pointerup",R),document.removeEventListener("pointercancel",R),ae?.($));};se(ne),document.addEventListener("pointermove",Z),document.addEventListener("pointerup",R),document.addEventListener("pointercancel",R);});}if(!p&&I){const ie=I.querySelector(".card-body");if(ie){ie.classList.add("color-picker__body"),N=w("div",{className:"color-picker__palette-cursor"}),T=w("div",{className:"color-picker__palette"},N),O=w("div",{className:"color-picker__alpha-thumb"}),z=w("div",{className:"color-picker__alpha"},O),F=w("div",{className:"color-picker__hue-thumb"}),M=w("div",{className:"color-picker__hue"},F);const se=w("div",{className:"color-picker__main"},T,z),ae=w("div",{className:"color-picker__hue-row"},M),ne=zs({blockGameKeys:true});L=ne.input,L.classList.add("color-picker__hex-input"),L.value="",L.maxLength=9,L.spellcheck=false,L.inputMode="text",L.setAttribute("aria-label",`Hex code for ${n}`),C=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),ne.root.classList.add("color-picker__hex-wrap");const q=w("div",{className:"color-picker__hex-row"},C,ne.root);ie.replaceChildren(se,ae,q),Y(T,R=>{if(!T||!N)return;const $=T.getBoundingClientRect(),Q=Tt((R.clientX-$.left)/$.width,0,1),re=Tt((R.clientY-$.top)/$.height,0,1);U({...m,s:Q,v:1-re},"input");},()=>j("change")),Y(z,R=>{if(!z)return;const $=z.getBoundingClientRect(),Q=Tt((R.clientY-$.top)/$.height,0,1);U({...m,a:1-Q},"input");},()=>j("change")),Y(M,R=>{if(!M)return;const $=M.getBoundingClientRect(),Q=Tt((R.clientX-$.left)/$.width,0,1);U({...m,h:Q*360},"input");},()=>j("change")),C.addEventListener("click",()=>{if(B=B==="hex"?"rgba":"hex",L){const R=yr(m);L.value=B==="hex"?m.a===1?R.hex:R.hexa:R.rgba;}V(),L?.focus(),L?.select();}),L.addEventListener("input",()=>{if(B==="hex"){const R=Py(L.value);if(R!==L.value){const $=L.selectionStart??R.length;L.value=R,L.setSelectionRange($,$);}}});const Z=()=>{const R=L.value;if(B==="hex"){const $=Zr(R);if(!$){L.value=m.a===1?yr(m).hex:yr(m).hexa;return}const Q=R.startsWith("#")?R.slice(1):R,re=Q.length===4||Q.length===8;$.a=re?$.a:m.a,ce($,"change");}else {const $=Ly(R),Q=wc($);if(!Q){L.value=yr(m).rgba;return}ce(Q,"change");}};L.addEventListener("change",Z),L.addEventListener("blur",Z),L.addEventListener("keydown",R=>{R.key==="Enter"&&(Z(),L.blur());});}}return p&&(I&&I.remove(),E=w("input",{className:"color-picker__native",type:"color",value:gd(ui({...m,a:1}))}),A.addEventListener("click",()=>E.click()),E.addEventListener("input",()=>{const ie=Zr(E.value);ie&&(ie.a=m.a,ce(ie,"input"),j("change"));}),v.appendChild(E)),V(),{root:v,isMobile:p,getValue:()=>yr(m),setValue:(ie,se)=>{const ae=wc(ie)??Zr(ie)??Zr("#FFFFFF");ae&&(typeof se=="number"&&(ae.a=se),ce(ae,null));}}}const Ry=window;function Fy(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Ry}const Oy=Fy(),fe=Oy;function Ny(e){try{return !!e.isSecureContext}catch{return  false}}function bd(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function sh(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Dy(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function $y(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function By(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function zy(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Ny(fe))return {ok:false,method:"clipboard-write"};if(!await Dy())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function jy(e,t){try{const n=t||bd(),r=$y(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Gy(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=By(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=sh()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function Uy(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await zy(n);if(r.ok)return r;const o=t.injectionRoot||bd(t.valueNode||void 0),i=jy(n,o);if(i.ok)return i;const a=Gy(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Rt.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Wy(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=bd(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const l=e.getBoundingClientRect();i.style.left=`${l.right-8}px`,i.style.top=`${l.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await Uy(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(sh()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const oo={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function Hy(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,l=false;function u(p){const m=n[p]||n[i]||{};t.setAttribute("data-theme",p),l&&t.classList.add("theme-anim");for(const[v,y]of Object.entries(m))t.style.setProperty(v,y);l?(a!==null&&clearTimeout(a),a=fe.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):l=true,i=p,o?.(p);}function f(){return i}return u(r),{applyTheme:u,getCurrentTheme:f}}const Cc={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,system:false}}};async function Vy(){const e=await _o("tab-settings",{version:2,defaults:Cc,sanitize:o=>({ui:{expandedCards:go(Cc.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:go(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}class Ky{constructor(){xe(this,"injections",new Map);xe(this,"state",{});xe(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(o){console.error(`[InjectionRegistry] Failed to init ${t}:`,o);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const r=this.injections.get(t);if(!r){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?r.injection.init():r.injection.destroy(),console.log(`[InjectionRegistry] ${r.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const r=at(n.storageKey,n.defaultEnabled??false);this.state[t]=r;}saveState(t){const n=this.injections.get(t);n&&st(n.storageKey,this.state[t]);}}let Nl=null;function lh(){return Nl||(Nl=new Ky),Nl}function ch(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Yy(){return Object.keys(oo).map(e=>({value:e,label:ch(e)}))}const qy=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--accent-3"];function Xy(e){return ch(e.replace(/^--/,""))}function Qy(e){return e.alpha<1?e.rgba:e.hex}const Vn={pets:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class Jy extends Br{constructor(n){super({id:"tab-settings",label:"Settings"});xe(this,"featureConfig",Vn);this.deps=n;}async build(n){const r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await Vy();}catch{o={get:()=>Cc,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get(),a=at(At.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(a);const l=Object.keys(oo),u=this.deps.getCurrentTheme?.()??this.deps.initialTheme,f=l.includes(u)?u:l[0]??"dark";let p=f;const m=eh({text:"Theme",tone:"muted",size:"lg"}),v=Fr({options:Yy(),value:f,onChange:T=>{p=T,this.deps.applyTheme(T),this.renderThemePickers(T,y,p);}}),y=w("div",{className:"settings-theme-grid"}),b=pt({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:T=>o.setCardExpanded("style",T)},w("div",{className:"kv settings-theme-row"},m.root,v.root),y);this.renderThemePickers(f,y,p);const A=this.createHUDSectionsCard({defaultExpanded:!!i.ui.expandedCards.hudSections,onExpandChange:T=>o.setCardExpanded("hudSections",T)}),P=this.createEnhancementsCard({defaultExpanded:!!i.ui.expandedCards.enhancements,onExpandChange:T=>o.setCardExpanded("enhancements",T)}),I=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:T=>o.setCardExpanded("system",T)});r.appendChild(b),r.appendChild(A),r.appendChild(P),r.appendChild(I);}mergeFeatureConfig(n){return {pets:{...Vn.pets,...n.pets},locker:{...Vn.locker,...n.locker},alerts:{...Vn.alerts,...n.alerts},avatar:{...Vn.avatar,...n.avatar},room:{...Vn.room,...n.room},cropSizeIndicator:{...Vn.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Vn.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Vn.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){st(At.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const r=(o,i,a,l,u=false,f=false)=>{const p=w("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${u?"0":"12px"} 0 ${f?"0":"12px"} 0;
          ${f?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${i?"1":"0.5"};
        `}),m=w("div"),v=w("div",{style:"font-weight: 500; margin-bottom: 4px;"},o),y=w("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},l);m.append(v,y);const b=Or({checked:i,onChange:A=>{p.style.opacity=A?"1":"0.5",a(A);}});return p.append(m,b.root),p};return pt({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},w("div",{},r("Pets",this.featureConfig.pets.enabled,o=>{this.featureConfig.pets.enabled=o,this.saveFeatureConfig();},"Pet management and team tracking"),r("Locker",this.featureConfig.locker.enabled,o=>{this.featureConfig.locker.enabled=o,this.saveFeatureConfig();},"Configure crop, egg, and decor blockers"),r("Alerts",this.featureConfig.alerts.enabled,o=>{this.featureConfig.alerts.enabled=o,this.saveFeatureConfig();},"Event notifications and alerts"),r("Avatar",this.featureConfig.avatar.enabled,o=>{this.featureConfig.avatar.enabled=o,this.saveFeatureConfig();},"Avatar customization and loadouts"),r("Room",this.featureConfig.room.enabled,o=>{this.featureConfig.room.enabled=o,this.saveFeatureConfig();},"Public room browser",false,true)))}createSectionRow(n,r,o,i,a=false,l=false){const u=w("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${a?"0":"12px"} 0 ${l?"0":"12px"} 0;
        ${l?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${r?"1":"0.5"};
      `}),f=w("div"),p=w("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),m=w("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},i);f.append(p,m);const v=Or({checked:r,onChange:y=>{u.style.opacity=y?"1":"0.5",o(y);}});return u.append(f,v.root),u}createEnhancementsCard(n){const r=lh(),i=[...r.getAll()].sort((l,u)=>l.name.localeCompare(u.name)),a=i.map((l,u)=>{const f=u===0,p=u===i.length-1,m=r.isEnabled(l.id);return this.createSectionRow(l.name,m,v=>{r.setEnabled(l.id,v),this.saveFeatureConfig();},l.description,f,p)});return pt({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},w("div",{},...a))}renderThemePickers(n,r,o){const i=oo[n];if(r.replaceChildren(),!!i)for(const a of qy){const l=i[a];if(l==null)continue;const u=My({label:Xy(a),value:l,defaultExpanded:false,onInput:f=>this.updateThemeVar(n,a,f,o),onChange:f=>this.updateThemeVar(n,a,f,o)});r.appendChild(u.root);}}updateThemeVar(n,r,o,i){const a=oo[n];a&&(a[r]=Qy(o),i===n&&this.deps.applyTheme(n));}createEnvCard(n){const r=n?.defaultExpanded??false,o=n?.onExpandChange,i=(I,T)=>{const N=w("div",{className:"kv kv--inline-mobile"}),z=w("label",{},I),O=w("div",{className:"ro"});return typeof T=="string"?O.textContent=T:O.append(T),N.append(z,O),N},a=w("code",{},"—"),l=w("span",{},"—"),u=w("span",{},"—"),f=w("span",{},"—"),p=w("span",{},"—"),m=w("span",{},"—"),v=()=>{const I=Rt.detect();u.textContent=I.surface??"Unknown",f.textContent=I.platform??"Unknown",p.textContent=I.browser??"Unknown",m.textContent=I.os??"Unknown",a.textContent=I.host??"Unknown",l.textContent=I.isInIframe?"Yes":"No";},y=kt({label:"Copy JSON",variant:"primary",size:"sm"});Wy(y,()=>{const I=Rt.detect();return JSON.stringify(I,null,2)});const b=w("div",{style:"width:100%;display:flex;justify-content:center;"},y),A=pt({title:"System",variant:"soft",padding:"lg",footer:b,expandable:true,defaultExpanded:r,onExpandChange:o},i("Surface",u),i("Platform",f),i("Browser",p),i("OS",m),i("Host",a),i("Iframe",l)),P=()=>{document.hidden||v();};return document.addEventListener("visibilitychange",P),v(),this.addCleanup(()=>document.removeEventListener("visibilitychange",P)),A}}function vd(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:l=true,respectReducedMotion:u=true,compact:f=false,maxHeight:p,selectable:m=false,selectionType:v="switch",selectOnRowClick:y=false,initialSelection:b=[],hideHeaderCheckbox:A=false,getRowId:P=(d,h)=>String(h),onSortChange:I,onSelectionChange:T,onRowClick:N}=e;let z=n.slice(),O=r.slice(),M=r.slice(),F=null,L=null,C=1;const E=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,B=!!l&&!(u&&E),j=w("div",{className:"lg-table-wrap",id:t});if(p!=null){const d=typeof p=="number"?`${p}px`:p;j.style.setProperty("--tbl-max-h",d);}const V=w("div",{className:"lg-table"}),U=w("div",{className:"lg-thead"}),ce=w("div",{className:"lg-tbody"}),Y=w("div",{className:"lg-tfoot"});i&&j.classList.add("sticky"),a&&j.classList.add("zebra"),f&&j.classList.add("compact"),m&&j.classList.add("selectable");const ie=v==="switch"?"52px":"36px";j.style.setProperty("--check-w",ie);function se(d){return d==="center"?"center":d==="right"?"flex-end":"flex-start"}function ae(){const d=z.map(S=>{const G=(S.width||"1fr").trim();return /\bfr$/.test(G)?`minmax(0, ${G})`:G}),h=(m?[ie,...d]:d).join(" ");j.style.setProperty("--lg-cols",h);}ae();function ne(){return o?Math.max(1,Math.ceil(O.length/o)):1}function q(){if(!o)return O;const d=(C-1)*o;return O.slice(d,d+o)}function Z(){if(!F||!L)return;const d=z.find(G=>String(G.key)===F),h=L==="asc"?1:-1,S=d?.sortFn?(G,W)=>h*d.sortFn(G,W):(G,W)=>{const J=G[F],de=W[F];return J==null&&de==null?0:J==null?-1*h:de==null?1*h:typeof J=="number"&&typeof de=="number"?h*(J-de):h*String(J).localeCompare(String(de),void 0,{numeric:true,sensitivity:"base"})};O.sort(S);}const R=new Set(b);function $(){return Array.from(R)}const Q=new Map;function re(d){R.clear(),d.forEach(h=>R.add(h)),_e(),Q.forEach((h,S)=>{h.setChecked(R.has(S),true);}),Ne(),T?.($());}function le(){R.clear(),_e(),Q.forEach(d=>d.setChecked(false,true)),Ne(),T?.($());}let ve=null;function _e(){if(!ve)return;const d=q();if(!d.length){ve.indeterminate=false,ve.checked=false;return}const h=d.map((G,W)=>P(G,(C-1)*(o||0)+W)),S=h.reduce((G,W)=>G+(R.has(W)?1:0),0);ve.checked=S===h.length,ve.indeterminate=S>0&&S<h.length;}let $e=false;function bt(){$e=false;const d=ce.offsetWidth-ce.clientWidth;U.style.paddingRight=d>0?`${d}px`:"0px";}function Bt(){$e||($e=true,requestAnimationFrame(bt));}const ct=new ResizeObserver(()=>Bt()),Et=()=>Bt();function Wt(){U.replaceChildren();const d=w("div",{className:"lg-tr lg-tr-head"});if(m){const h=w("div",{className:"lg-th lg-th-check"});A||(ve=w("input",{type:"checkbox"}),ve.addEventListener("change",()=>{const S=q(),G=ve.checked;S.forEach((W,J)=>{const de=P(W,(C-1)*(o||0)+J);G?R.add(de):R.delete(de);}),T?.($()),Ne();}),h.appendChild(ve)),d.appendChild(h);}z.forEach(h=>{const S=w("button",{className:"lg-th",type:"button",title:h.title||h.header});S.textContent=h.header,h.align&&S.style.setProperty("--col-justify",se(h.align)),h.sortable&&S.classList.add("sortable"),F===String(h.key)&&L?S.setAttribute("data-sort",L):S.removeAttribute("data-sort"),h.sortable&&S.addEventListener("click",()=>{const G=String(h.key);F!==G?(F=G,L="asc"):(L=L==="asc"?"desc":L==="desc"?null:"asc",L||(F=null,O=M.slice())),I?.(F,L),F&&L&&Z(),wt();}),d.appendChild(S);}),U.appendChild(d);try{ct.disconnect();}catch{}ct.observe(ce),Bt();}function Lt(d){return Array.from(d.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Ht(d){return d.querySelector(".lg-td, .lg-td-check")}function tt(d){const h=Ht(d);return h?h.getBoundingClientRect():null}function Ne(){const d=q(),h=new Map;Array.from(ce.children).forEach(J=>{const de=J,ye=de.getAttribute("data-id");if(!ye)return;const ge=tt(de);ge&&h.set(ye,ge);});const S=new Map;Array.from(ce.children).forEach(J=>{const de=J,ye=de.getAttribute("data-id");ye&&S.set(ye,de);});const G=[];for(let J=0;J<d.length;J++){const de=d[J],ye=(o?(C-1)*o:0)+J,ge=P(de,ye);G.push(ge);let we=S.get(ge);we||(we=mn(de,ye),B&&Lt(we).forEach(it=>{it.style.transform="translateY(6px)",it.style.opacity="0";})),ce.appendChild(we);}const W=[];if(S.forEach((J,de)=>{G.includes(de)||W.push(J);}),!B){W.forEach(J=>J.remove()),_e(),Bt();return}G.forEach(J=>{const de=ce.querySelector(`.lg-tr-body[data-id="${J}"]`);if(!de)return;const ye=tt(de),ge=h.get(J),we=Lt(de);if(ge&&ye){const Ve=ge.left-ye.left,_t=ge.top-ye.top;we.forEach(mt=>{mt.style.transition="none",mt.style.transform=`translate(${Ve}px, ${_t}px)`,mt.style.opacity="1";}),Ht(de)?.getBoundingClientRect(),we.forEach(mt=>{mt.style.willChange="transform, opacity",mt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{we.forEach(mt=>{mt.style.transform="translate(0,0)";});});}else we.forEach(Ve=>{Ve.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{we.forEach(Ve=>{Ve.style.transform="translate(0,0)",Ve.style.opacity="1";});});const Je=Ve=>{(Ve.propertyName==="transform"||Ve.propertyName==="opacity")&&(we.forEach(_t=>{_t.style.willChange="",_t.style.transition="",_t.style.transform="",_t.style.opacity="";}),Ve.currentTarget.removeEventListener("transitionend",Je));},it=we[0];it&&it.addEventListener("transitionend",Je);}),W.forEach(J=>{const de=Lt(J);de.forEach(we=>{we.style.willChange="transform, opacity",we.style.transition="transform .18s ease, opacity .18s ease",we.style.opacity="0",we.style.transform="translateY(-6px)";});const ye=we=>{we.propertyName==="opacity"&&(we.currentTarget.removeEventListener("transitionend",ye),J.remove());},ge=de[0];ge?ge.addEventListener("transitionend",ye):J.remove();}),_e(),Bt();}function mn(d,h){const S=P(d,h),G=w("div",{className:"lg-tr lg-tr-body","data-id":S});if(m){const W=w("div",{className:"lg-td lg-td-check"});if(v==="switch"){const J=Or({size:"sm",checked:R.has(S),onChange:de=>{de?R.add(S):R.delete(S),_e(),T?.($());}});Q.set(S,J),W.appendChild(J.root);}else {const J=w("input",{type:"checkbox",className:"lg-row-check"});J.checked=R.has(S),J.addEventListener("change",de=>{de.stopPropagation(),J.checked?R.add(S):R.delete(S),_e(),T?.($());}),J.addEventListener("click",de=>de.stopPropagation()),W.appendChild(J);}G.appendChild(W);}return z.forEach(W=>{const J=w("div",{className:"lg-td"});W.align&&J.style.setProperty("--col-justify",se(W.align));let de=W.render?W.render(d,h):String(d[W.key]??"");typeof de=="string"?J.textContent=de:J.appendChild(de),G.appendChild(J);}),(N||m&&y)&&(G.classList.add("clickable"),G.addEventListener("click",W=>{if(!W.target.closest(".lg-td-check")){if(m&&y){const J=!R.has(S);if(J?R.add(S):R.delete(S),_e(),v==="switch"){const de=Q.get(S);de&&de.setChecked(J,true);}else {const de=G.querySelector(".lg-row-check");de&&(de.checked=J);}T?.($());}N?.(d,h,W);}})),G}function gn(){if(Y.replaceChildren(),!o)return;const d=ne(),h=w("div",{className:"lg-pager"}),S=w("button",{className:"btn",type:"button"},"←"),G=w("button",{className:"btn",type:"button"},"→"),W=w("span",{className:"lg-pager-info"},`${C} / ${d}`);S.disabled=C<=1,G.disabled=C>=d,S.addEventListener("click",()=>ut(C-1)),G.addEventListener("click",()=>ut(C+1)),h.append(S,W,G),Y.appendChild(h);}function ut(d){const h=ne();C=Math.min(Math.max(1,d),h),Ne(),gn();}function wt(){ae(),Wt(),Ne(),gn();}function Vt(d){M=d.slice(),O=d.slice(),F&&L&&Z(),ut(1);}function Sn(d){z=d.slice(),wt();}function tn(d,h="asc"){F=d,L=d?h:null,F&&L?Z():O=M.slice(),wt();}function k(){try{ct.disconnect();}catch{}window.removeEventListener("resize",Et);}return V.append(U,ce,Y),j.appendChild(V),window.addEventListener("resize",Et),wt(),{root:j,setData:Vt,setColumns:Sn,sortBy:tn,getSelection:$,setSelection:re,clearSelection:le,setPage:ut,getState:()=>({page:C,pageCount:ne(),sortKey:F,sortDir:L}),destroy:k}}let fs=false;const oi=new Set;function Zy(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const dn=e=>{const t=Zy();if(t){for(const n of oi)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function e0(){fs||(fs=true,window.addEventListener("keydown",dn,true),window.addEventListener("keypress",dn,true),window.addEventListener("keyup",dn,true),document.addEventListener("keydown",dn,true),document.addEventListener("keypress",dn,true),document.addEventListener("keyup",dn,true));}function t0(){fs&&(fs=false,window.removeEventListener("keydown",dn,true),window.removeEventListener("keypress",dn,true),window.removeEventListener("keyup",dn,true),document.removeEventListener("keydown",dn,true),document.removeEventListener("keypress",dn,true),document.removeEventListener("keyup",dn,true));}function n0(e){return oi.size===0&&e0(),oi.add(e),()=>{oi.delete(e),oi.size===0&&t0();}}function ga(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function r0(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function js(e={}){const{id:t,placeholder:n="Search...",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:l,onSearch:u,autoSearch:f=false,debounceMs:p=0,focusKey:m="/",iconLeft:v,iconRight:y,withClear:b=true,clearTitle:A="Clear",ariaLabel:P,submitLabel:I,loading:T=false,blockGameKeys:N=true}=e,z=w("div",{className:"search"+(o?` search--${o}`:""),id:t}),O=w("span",{className:"search-ico search-ico--left"});if(v){const le=ga(v);le&&O.appendChild(le);}else O.textContent="🔎",O.style.opacity=".9";const M=w("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":P||n}),F=w("span",{className:"search-ico search-ico--right"});if(y){const le=ga(y);le&&F.appendChild(le);}const L=r0();L.classList.add("search-spinner");const C=b?w("button",{className:"search-clear",type:"button",title:A},"×"):null,E=I!=null?w("button",{className:"btn search-submit",type:"button"},I):null,B=w("div",{className:"search-field"},O,M,F,L,...C?[C]:[]);z.append(B,...E?[E]:[]);let j=!!i,V=null;function U(le){L.style.display=le?"inline-block":"none",z.classList.toggle("is-loading",le);}function ce(){V!=null&&(window.clearTimeout(V),V=null);}function Y(le){ce(),p>0?V=window.setTimeout(()=>{V=null,le();},p):le();}function ie(){l?.(M.value),f&&u&&u(M.value);}M.addEventListener("input",()=>{Y(ie);}),M.addEventListener("keydown",le=>{le.key==="Enter"?(le.preventDefault(),ce(),u?.(M.value)):le.key==="Escape"&&(M.value.length>0?ne("",{notify:true}):M.blur());}),C&&C.addEventListener("click",()=>ne("",{notify:true})),E&&E.addEventListener("click",()=>u?.(M.value));let se=()=>{};if(N&&(se=n0(M)),m){const le=ve=>{if(ve.key===m&&!ve.ctrlKey&&!ve.metaKey&&!ve.altKey){const _e=document.activeElement;_e&&(_e.tagName==="INPUT"||_e.tagName==="TEXTAREA"||_e.isContentEditable)||(ve.preventDefault(),M.focus());}};window.addEventListener("keydown",le,true),z.__cleanup=()=>{window.removeEventListener("keydown",le,true),se();};}else z.__cleanup=()=>{se();};function ae(le){j=!!le,M.disabled=j,C&&(C.disabled=j),E&&(E.disabled=j),z.classList.toggle("disabled",j);}function ne(le,ve={}){const _e=M.value;M.value=le??"",ve.notify&&_e!==le&&Y(ie);}function q(){return M.value}function Z(){M.focus();}function R(){M.blur();}function $(le){M.placeholder=le;}function Q(le){ne("",le);}return ae(j),U(T),a&&Z(),{root:z,input:M,getValue:q,setValue:ne,focus:Z,blur:R,setDisabled:ae,setPlaceholder:$,clear:Q,setLoading:U,setIconLeft(le){O.replaceChildren();const ve=ga(le??"🔎");ve&&O.appendChild(ve);},setIconRight(le){F.replaceChildren();const ve=ga(le??"");ve&&F.appendChild(ve);}}}const dh=e=>new Promise(t=>setTimeout(t,e)),yn=e=>{try{return e()}catch{return}},Rn=(e,t,n)=>Math.max(t,Math.min(n,e)),o0=e=>Rn(e,0,1);let yd=null;function uh(){return yd}function i0(e){yd=e;}function ph(){return yd!==null}const a0=/\/(?:r\/\d+\/)?version\/([^/]+)/,s0=15e3,l0=50;function c0(){return fe?.document??(typeof document<"u"?document:null)}function xd(e={}){if(ph())return;const t=e.doc??c0();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(a0);if(a?.[1]){i0(a[1]);return}}}function d0(){return xd(),uh()}function u0(){return ph()}async function p0(e={}){const t=e.timeoutMs??s0,n=performance.now();for(;performance.now()-n<t;){xd();const r=uh();if(r)return r;await dh(l0);}throw new Error("MGVersion timeout (gameVersion not found)")}const wd={init:xd,isReady:u0,get:d0,wait:p0},f0=fe?.location?.origin||"https://magicgarden.gg";function fh(){return typeof GM_xmlhttpRequest=="function"}function hh(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function mh(e){if(fh())return JSON.parse((await hh(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function h0(e){if(fh())return (await hh(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}const Pr=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,"");let Cd=null,gh=null;function m0(){return Cd}function g0(){return gh}function b0(e){Cd=e;}function v0(e){gh=e;}function bh(){return Cd!==null}const y0=15e3;async function x0(e={}){bh()||await kd(e);}async function kd(e={}){const t=m0();if(t)return t;const n=g0();if(n)return n;const r=(async()=>{const o=e.gameVersion??await wd.wait({timeoutMs:y0}),i=`${f0}/version/${o}/assets/`;return b0(i),i})();return v0(r),r}async function w0(e){const t=await kd();return Pr(t,e)}function C0(){return bh()}const Io={init:x0,isReady:C0,base:kd,url:w0},vh=new Map;function k0(e){return vh.get(e)}function S0(e,t){vh.set(e,t);}const yh="manifest.json";let kc=null;async function A0(){kc||(kc=await xh());}function E0(){return kc!==null}async function xh(e={}){const t=e.baseUrl??await Io.base(),n=k0(t);if(n)return n;const r=mh(Pr(t,yh));return S0(t,r),r}function _0(e,t){return e.bundles.find(n=>n.name===t)??null}function I0(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==yh&&t.add(r);return Array.from(t)}const bo={init:A0,isReady:E0,load:xh,getBundle:_0,listJsonFromBundle:I0},T0={items:"items",decor:"decor",mutations:"mutations",eggs:"eggs",pets:"pets",abilities:"abilities",plants:"plants",weathers:"weather"};function P0(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},ready:false}}const jt=P0(),mp="https://mg-api.ariedam.fr/data";async function L0(){if(jt.ready)return;console.log("[MGData] Fetching game data from API...");const e=await new Promise((n,r)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(mp).then(o=>{if(!o.ok)r(new Error(`[MGData] API request failed: ${o.status}`));else return o.json()}).then(o=>n(o)).catch(r);return}GM_xmlhttpRequest({method:"GET",url:mp,responseType:"json",onload(o){if(o.status<200||o.status>=300){r(new Error(`[MGData] API request failed: ${o.status}`));return}n(o.response);},onerror(){r(new Error("[MGData] Network error"));}});});for(const[n,r]of Object.entries(T0)){const o=e[n];o&&typeof o=="object"&&(jt.data[r]=o);}jt.ready=true;const t=Object.entries(jt.data).filter(([,n])=>n!==null).map(([n])=>n);console.log(`[MGData] Data loaded: ${t.join(", ")}`);}const M0=/\/assets\/sprites\/(.+?)\.png/,R0={"mutation-overlays":"mutation-overlay"};function F0(e){const t=R0[e];return t||(e.endsWith("s")&&e.length>1?e.slice(0,-1):e)}function Kn(e){if(!e||typeof e!="string")return null;const t=e.match(M0);if(!t)return null;const n=t[1],r=n.indexOf("/");if(r>0){const o=n.slice(0,r),i=n.slice(r);return `sprite/${F0(o)}${i}`}return `sprite/${n}`}function O0(e){for(const[,t]of Object.entries(e.items||{})){const n=t,r=Kn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.decor||{})){const n=t,r=Kn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.mutations||{})){const n=t,r=Kn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.eggs||{})){const n=t,r=Kn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.pets||{})){const n=t,r=Kn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.weather||{})){const n=t,r=Kn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.plants||{})){const n=t;if(n.seed){const r=Kn(n.seed.sprite);r&&(n.seed.spriteId=r);}if(n.plant){const r=Kn(n.plant.sprite);r&&(n.plant.spriteId=r);}if(n.crop){const r=Kn(n.crop.sprite);r&&(n.crop.spriteId=r);}}}function N0(){try{console.log("[MGData] Resolving sprites..."),O0(jt.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] Sprite resolution failed",e);}catch{}}}const wh=1e4,Ch=50;function kh(e){return new Promise(t=>setTimeout(t,e))}function D0(e){return jt.data[e]}function $0(){return {...jt.data}}function B0(e){return jt.data[e]!=null}async function z0(e,t=wh){const n=jt.data[e];if(n!=null)return n;const r=Date.now();for(;Date.now()-r<t;){await kh(Ch);const o=jt.data[e];if(o!=null)return o}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function j0(e=wh){if(jt.ready)return {...jt.data};const t=Date.now();for(;Date.now()-t<e;){if(jt.ready)return {...jt.data};await kh(Ch);}throw new Error("MGData.waitForAnyData: timeout")}const Sh=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Ah(e){return Sh.includes(e)}function Eh(e){return e.filter(t=>Ah(t.action))}function gp(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function Dl(e){return e?.name||e?.petSpecies||"Unknown Pet"}function _h(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=Dl(r.targetPet),i=r.hungerRestoreAmount||0,l=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${i} hunger to ${l}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",i=r.sellPrice||0;return `Ate ${o} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=Dl(r.targetPet),i=r.strengthIncrease||0;return `Boosted ${o}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=Dl(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,i=r.petsAffected?.length||0;return `Gave +${o} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,i=r.eggsAffected?.length||0,a=gp(o);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,i=r.numPlantsAffected||0,a=gp(o);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,i=r.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const Oe={async init(){await L0();},isReady(){return jt.ready},get:D0,getAll:$0,has:B0,waitFor:z0,waitForAny:j0,resolveSprites:N0,cleanup(){}},G0=new Map;function U0(){return G0}function Sc(){return fe.jotaiAtomCache?.cache}function lr(e){const t=U0(),n=t.get(e);if(n)return n;const r=Sc();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function W0(){const e=fe;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const H0={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function To(){return H0}const V0="__JOTAI_STORE_READY__";let bp=false;const Ac=new Set;function ba(){if(!bp){bp=true;for(const e of Ac)try{e();}catch{}try{const e=fe.CustomEvent||CustomEvent;fe.dispatchEvent?.(new e(V0));}catch{}}}function K0(e){Ac.add(e);const t=_c();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Ac.delete(e);}}async function Sd(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=_c();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const l=K0(()=>{a||(a=true,l(),o());}),u=Date.now();(async()=>{for(;!a&&Date.now()-u<t;){const p=_c();if(p.via&&!p.polyfill){if(a)return;a=true,l(),o();return}await Ci(n);}a||(a=true,l(),i(new Error("Store not captured within timeout")));})();})}const Ci=e=>new Promise(t=>setTimeout(t,e));function Ih(){try{const e=fe.Event||Event;fe.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Ec(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function $l(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Ec(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(Ec(i))return i}catch{}return null}function Th(){const e=To(),t=fe.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,l=[i.current];for(;l.length;){const u=l.pop();if(!(!u||a.has(u))){a.add(u);try{const f=u?.pendingProps?.value;if(Ec(f))return e.lastCapturedVia="fiber",f}catch{}try{let f=u?.memoizedState,p=0;for(;f&&p<15;){p++;const m=$l(f);if(m)return e.lastCapturedVia="fiber",m;const v=$l(f.memoizedState);if(v)return e.lastCapturedVia="fiber",v;f=f.next;}}catch{}try{if(u?.stateNode){const f=$l(u.stateNode);if(f)return e.lastCapturedVia="fiber",f}}catch{}u.child&&l.push(u.child),u.sibling&&l.push(u.sibling),u.alternate&&l.push(u.alternate);}}}}return null}function Ph(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Y0(e=5e3){const t=Date.now();let n=Sc();for(;!n&&Date.now()-t<e;)await Ci(100),n=Sc();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=To();let o=null,i=null;const a=[],l=()=>{for(const f of a)try{f.__origWrite&&(f.write=f.__origWrite,delete f.__origWrite);}catch{}};for(const f of n.values()){if(!f||typeof f.write!="function"||f.__origWrite)continue;const p=f.write;f.__origWrite=p,f.write=function(m,v,...y){return i||(o=m,i=v,l()),p.call(this,m,v,...y)},a.push(f);}Ih();const u=Date.now();for(;!i&&Date.now()-u<e;)await Ci(50);return i?(r.lastCapturedVia="write",{get:f=>o(f),set:(f,p)=>i(f,p),sub:(f,p)=>{let m;try{m=o(f);}catch{}const v=setInterval(()=>{let y;try{y=o(f);}catch{return}if(y!==m){m=y;try{p();}catch{}}},100);return ()=>clearInterval(v)}}):(l(),r.lastCapturedVia="polyfill",Ph())}async function q0(e=1e4){const t=To();Ih();const n=Date.now();for(;Date.now()-n<e;){const r=Th();if(r)return r;await Ci(50);}return t.lastCapturedVia="polyfill",Ph()}async function Ad(){const e=To();if(e.baseStore&&!e.baseStore.__polyfill)return ba(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Ci(25);if(e.baseStore)return e.baseStore.__polyfill||ba(),e.baseStore}e.captureInProgress=true;try{const t=Th();if(t)return e.baseStore=t,ba(),t;try{const r=await Y0(5e3);return e.baseStore=r,r.__polyfill||ba(),r}catch(r){e.captureError=r;}const n=await q0();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function _c(){const e=To();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function X0(){const e=await Ad(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let l;try{l=e.get(o);}catch{return}const u=i.last,f=!Object.is(l,u)||!i.has;if(i.last=l,i.has=true,f)for(const p of i.subs)try{p(l,u);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(l=>a=l),()=>a?.()}}}}}async function Ha(){const e=To();return e.mirror||(e.mirror=await X0()),e.mirror}const Xe={async select(e){const t=await Ha(),n=lr(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Ha(),r=lr(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Ha(),r=lr(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await Xe.select(e);try{t(n);}catch{}return Xe.subscribe(e,t)}};async function Lh(){await Ha();}const Di=Object.freeze(Object.defineProperty({__proto__:null,Store:Xe,prewarm:Lh,waitForStore:Sd},Symbol.toStringTag,{value:"Module"}));function Ed(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function ki(e,t){const n=Ed(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Q0(e,t,n){const r=Ed(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const l=r[a],u=i[l],f=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};i[l]=f,i=f;}return i[r[r.length-1]]=n,o}function vp(e,t){const n={};for(const r of t)n[r]=r.includes(".")?ki(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function J0(e,t,n){const r=n.mode??"auto";function o(f){const p=t?ki(f,t):f,m=new Map;if(p==null)return {signatures:m,keys:[]};const v=Array.isArray(p);if((r==="array"||r==="auto"&&v)&&v)for(let b=0;b<p.length;b++){const A=p[b],P=n.key?n.key(A,b,f):b,I=n.sig?n.sig(A,b,f):n.fields?vp(A,n.fields):JSON.stringify(A);m.set(P,I);}else for(const[b,A]of Object.entries(p)){const P=n.key?n.key(A,b,f):b,I=n.sig?n.sig(A,b,f):n.fields?vp(A,n.fields):JSON.stringify(A);m.set(P,I);}return {signatures:m,keys:Array.from(m.keys())}}function i(f,p){if(f===p)return  true;if(!f||!p||f.size!==p.size)return  false;for(const[m,v]of f)if(p.get(m)!==v)return  false;return  true}async function a(f){let p=null;return Xe.subscribeImmediate(e,m=>{const v=t?ki(m,t):m,{signatures:y}=o(v);if(!i(p,y)){const b=new Set([...p?Array.from(p.keys()):[],...Array.from(y.keys())]),A=[];for(const P of b){const I=p?.get(P)??"__NONE__",T=y.get(P)??"__NONE__";I!==T&&A.push(P);}p=y,f({value:v,changedKeys:A});}})}async function l(f,p){return a(({value:m,changedKeys:v})=>{v.includes(f)&&p({value:m});})}async function u(f,p){const m=new Set(f);return a(({value:v,changedKeys:y})=>{const b=y.filter(A=>m.has(A));b.length&&p({value:v,changedKeys:b});})}return {sub:a,subKey:l,subKeys:u}}const eo=new Map;function Z0(e,t){const n=eo.get(e);if(n)try{n();}catch{}return eo.set(e,t),()=>{try{t();}catch{}eo.get(e)===t&&eo.delete(e);}}function et(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${Ed(n).join(".")}`:e;async function i(){const m=await Xe.select(e);return n?ki(m,n):m}async function a(m){if(typeof r=="function"){const b=await Xe.select(e),A=r(m,b);return Xe.set(e,A)}const v=await Xe.select(e),y=n?Q0(v,n,m):m;return r==="merge-shallow"&&!n&&v&&typeof v=="object"&&typeof m=="object"?Xe.set(e,{...v,...m}):Xe.set(e,y)}async function l(m){const v=await i(),y=m(v);return await a(y),y}async function u(m,v,y){let b;const A=I=>{const T=n?ki(I,n):I;if(typeof b>"u"||!y(b,T)){const N=b;b=T,v(T,N);}},P=m?await Xe.subscribeImmediate(e,A):await Xe.subscribe(e,A);return Z0(o,P)}function f(){const m=eo.get(o);if(m){try{m();}catch{}eo.delete(o);}}function p(m){return J0(e,m?.path??n,m)}return {label:o,get:i,set:a,update:l,onChange:(m,v=Object.is)=>u(false,m,v),onChangeNow:(m,v=Object.is)=>u(true,m,v),asSignature:p,stopOnChange:f}}function te(e){return et(e)}te("positionAtom");te("lastPositionInMyGardenAtom");te("playerDirectionAtom");te("stateAtom");te("quinoaDataAtom");te("currentTimeAtom");te("actionAtom");te("isPressAndHoldActionAtom");te("mapAtom");te("tileSizeAtom");et("mapAtom",{path:"cols"});et("mapAtom",{path:"rows"});et("mapAtom",{path:"spawnTiles"});et("mapAtom",{path:"locations.seedShop.spawnTileIdx"});et("mapAtom",{path:"locations.eggShop.spawnTileIdx"});et("mapAtom",{path:"locations.toolShop.spawnTileIdx"});et("mapAtom",{path:"locations.decorShop.spawnTileIdx"});et("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});et("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});et("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});et("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});et("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});te("playerAtom");te("myDataAtom");te("myUserSlotIdxAtom");te("isSpectatingAtom");te("myCoinsCountAtom");te("numPlayersAtom");et("playerAtom",{path:"id"});et("myDataAtom",{path:"activityLogs"});te("userSlotsAtom");te("filteredUserSlotsAtom");te("myUserSlotAtom");te("spectatorsAtom");et("stateAtom",{path:"child"});et("stateAtom",{path:"child.data"});et("stateAtom",{path:"child.data.shops"});const ex=et("stateAtom",{path:"child.data.userSlots"}),tx=et("stateAtom",{path:"data.players"}),nx=et("stateAtom",{path:"data.hostPlayerId"});te("myInventoryAtom");te("myInventoryItemsAtom");te("isMyInventoryAtMaxLengthAtom");te("myFavoritedItemIdsAtom");te("myCropInventoryAtom");te("mySeedInventoryAtom");te("myToolInventoryAtom");te("myEggInventoryAtom");te("myDecorInventoryAtom");te("myPetInventoryAtom");et("myInventoryAtom",{path:"favoritedItemIds"});te("itemTypeFiltersAtom");te("myItemStoragesAtom");te("myPetHutchStoragesAtom");te("myPetHutchItemsAtom");te("myPetHutchPetItemsAtom");te("myNumPetHutchItemsAtom");te("myValidatedSelectedItemIndexAtom");te("isSelectedItemAtomSuspended");te("mySelectedItemAtom");te("mySelectedItemNameAtom");te("mySelectedItemRotationsAtom");te("mySelectedItemRotationAtom");te("setSelectedIndexToEndAtom");te("myPossiblyNoLongerValidSelectedItemIndexAtom");te("mySelectedItemIdAtom");te("myCurrentGlobalTileIndexAtom");te("myCurrentGardenTileAtom");te("myCurrentGardenObjectAtom");te("myOwnCurrentGardenObjectAtom");te("myOwnCurrentDirtTileIndexAtom");te("myCurrentGardenObjectNameAtom");te("isInMyGardenAtom");te("myGardenBoardwalkTileObjectsAtom");const rx=et("myDataAtom",{path:"garden"});et("myDataAtom",{path:"garden.tileObjects"});et("myOwnCurrentGardenObjectAtom",{path:"objectType"});te("myCurrentStablePlantObjectInfoAtom");te("myCurrentSortedGrowSlotIndicesAtom");te("mySelectedSlotIdAtom");te("myCurrentGrowSlotsAtom");te("myCurrentGrowSlotAtom");te("secondsUntilCurrentGrowSlotMaturesAtom");te("isCurrentGrowSlotMatureAtom");te("numGrowSlotsAtom");te("myCurrentEggAtom");te("myPetSlotInfosAtom");te("myPrimitivePetSlotsAtom");te("myNonPrimitivePetSlotsAtom");te("myPetsProgressAtom");te("myActiveCropMutationPetsAtom");te("totalPetSellPriceAtom");te("selectedPetHasNewVariantsAtom");const ox=te("shopsAtom"),ix=et("myDataAtom",{path:"shopPurchases"});te("seedShopAtom");te("seedShopInventoryAtom");te("seedShopRestockSecondsAtom");te("seedShopCustomRestockInventoryAtom");te("eggShopAtom");te("eggShopInventoryAtom");te("eggShopRestockSecondsAtom");te("eggShopCustomRestockInventoryAtom");te("toolShopAtom");te("toolShopInventoryAtom");te("toolShopRestockSecondsAtom");te("toolShopCustomRestockInventoryAtom");te("decorShopAtom");te("decorShopInventoryAtom");te("decorShopRestockSecondsAtom");te("decorShopCustomRestockInventoryAtom");te("isDecorShopAboutToRestockAtom");et("shopsAtom",{path:"seed"});et("shopsAtom",{path:"tool"});et("shopsAtom",{path:"egg"});et("shopsAtom",{path:"decor"});te("myCropItemsAtom");te("myCropItemsToSellAtom");te("totalCropSellPriceAtom");te("friendBonusMultiplierAtom");te("myJournalAtom");te("myCropJournalAtom");te("myPetJournalAtom");te("myStatsAtom");te("myActivityLogsAtom");te("newLogsAtom");te("hasNewLogsAtom");te("newCropLogsFromSellingAtom");te("hasNewCropLogsFromSellingAtom");te("myCompletedTasksAtom");te("myActiveTasksAtom");te("isWelcomeToastVisibleAtom");te("shouldCloseWelcomeToastAtom");te("isInitialMoveToDirtPatchToastVisibleAtom");te("isFirstPlantSeedActiveAtom");te("isThirdSeedPlantActiveAtom");te("isThirdSeedPlantCompletedAtom");te("isDemoTouchpadVisibleAtom");te("areShopAnnouncersEnabledAtom");te("arePresentablesEnabledAtom");te("isEmptyDirtTileHighlightedAtom");te("isPlantTileHighlightedAtom");te("isItemHiglightedInHotbarAtom");te("isItemHighlightedInModalAtom");te("isMyGardenButtonHighlightedAtom");te("isSellButtonHighlightedAtom");te("isShopButtonHighlightedAtom");te("isInstaGrowButtonHiddenAtom");te("isActionButtonHighlightedAtom");te("isGardenItemInfoCardHiddenAtom");te("isSeedPurchaseButtonHighlightedAtom");te("isFirstSeedPurchaseActiveAtom");te("isFirstCropHarvestActiveAtom");te("isWeatherStatusHighlightedAtom");te("weatherAtom");const Mh=te("activeModalAtom"),_d=te("inventoryModalIsActiveAtom");te("hotkeyBeingPressedAtom");te("avatarTriggerAnimationAtom");te("avatarDataAtom");te("emoteDataAtom");te("otherUserSlotsAtom");te("otherPlayerPositionsAtom");te("otherPlayerSelectedItemsAtom");te("otherPlayerLastActionsAtom");te("traderBunnyPlayerId");te("npcPlayersAtom");te("npcQuinoaUsersAtom");te("numNpcAvatarsAtom");te("traderBunnyEmoteTimeoutAtom");te("traderBunnyEmoteAtom");te("unsortedLeaderboardAtom");te("currentGardenPlayer");te("quinoaEngineAtom");te("quinoaInitializationErrorAtom");te("avgPingAtom");te("serverClientTimeOffsetAtom");te("isEstablishingShotRunningAtom");te("isEstablishingShotCompleteAtom");const He={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Gs(){return He}function ax(){return He.initialized}function zr(){return He.isCustom&&He.activeModal!==null}function Nr(){return He.activeModal}function Rh(e){return !He.shadow||He.shadow.modal!==e?null:He.shadow.data}function sx(e){He.initialized=e;}function Id(e){He.activeModal=e;}function Td(e){He.isCustom=e;}function Fh(e,t){He.shadow={modal:e,data:t,timestamp:Date.now()};}function Oh(){He.shadow=null;}function yp(e,t){He.patchedAtoms.add(e),He.originalReads.set(e,t);}function lx(e){return He.originalReads.get(e)}function Ic(e){return He.patchedAtoms.has(e)}function cx(e){He.patchedAtoms.delete(e),He.originalReads.delete(e);}function dx(e){He.unsubscribes.push(e);}function ux(){for(const e of He.unsubscribes)try{e();}catch{}He.unsubscribes.length=0;}function px(e){return He.listeners.onOpen.add(e),()=>He.listeners.onOpen.delete(e)}function Nh(e){return He.listeners.onClose.add(e),()=>He.listeners.onClose.delete(e)}function Dh(e){for(const t of Array.from(He.listeners.onOpen))try{t(e);}catch{}}function Pd(e){for(const t of Array.from(He.listeners.onClose))try{t(e);}catch{}}function fx(){ux(),He.initialized=false,He.activeModal=null,He.isCustom=false,He.shadow=null,He.patchedAtoms.clear(),He.originalReads.clear(),He.listeners.onOpen.clear(),He.listeners.onClose.clear();}const Ld={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function $h(e){return Ld[e]}function hx(e){const t=Ld[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const mx=new Set(["inventory","journal","stats","activityLog","petHutch"]),gx=new Set(["seedShop","eggShop","toolShop","decorShop"]),bx=new Set(["leaderboard"]);function vx(e,t,n,r){return function(i){const a=zr(),l=Nr();if(a&&l===r){const u=Rh(r);if(u!==null){let f;if(n.dataKey==="_full"?f=u:f=u[n.dataKey],f!==void 0)return t(i),n.transform?n.transform(f):f}}return t(i)}}function yx(e,t,n,r,o){return function(a){if(zr()&&Nr()===o){const l=Rh(o);if(l!==null){const u=l[n];if(u!==void 0)return t(a),r(u)}}return t(a)}}function xx(e){const t=$h(e);for(const n of t.atoms){const r=lr(n.atomLabel);if(!r||Ic(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=vx(n.atomLabel,o,n,e);r.read=i,yp(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=lr(n.atomLabel);if(!r||Ic(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=yx(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,yp(n.atomLabel,o);}}async function Us(e){const t=$h(e);for(const r of t.atoms)xp(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)xp(r.atomLabel);const n=await Ad();await Bh(n,e);}async function wx(e){const t=await Ad();await Bh(t,e);const n=hx(e);for(const r of n){const o=lr(r);if(o)try{t.get(o);}catch{}}}function xp(e){if(!Ic(e))return;const t=lr(e),n=lx(e);t&&n&&(t.read=n),cx(e);}async function Bh(e,t){const n=mx.has(t),r=gx.has(t),o=bx.has(t);if(!n&&!r&&!o)return;const i=lr("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let l=null;if(n||r){const u=a.child,f=u?.data;if(u&&f&&typeof f=="object"){let p=null;if(n&&Array.isArray(f.userSlots)){const m=f.userSlots.map(v=>{if(!v||typeof v!="object")return v;const y=v,b=y.data,A=b&&typeof b=="object"?{...b}:b;return {...y,data:A}});p={...p??f,userSlots:m};}if(r&&f.shops&&typeof f.shops=="object"&&(p={...p??f,shops:{...f.shops}}),p){const m={...u,data:p};l={...a,child:m};}}}if(o){const u=a.data;if(u&&Array.isArray(u.players)){const f={...u,players:[...u.players]};l={...l??a,data:f};}}if(!l)return;await e.set(i,l);}catch{}}async function Cx(){for(const e of Object.keys(Ld))await Us(e);}let va=null,pi=null;async function kx(){if(Gs().initialized)return;pi=await Xe.select("activeModalAtom"),va=setInterval(async()=>{try{const n=await Xe.select("activeModalAtom"),r=pi;r!==n&&(pi=n,Sx(n,r));}catch{}},50),dx(()=>{va&&(clearInterval(va),va=null);}),sx(true);}function Sx(e,t){const n=zr(),r=Nr();e===null&&t!==null&&(n&&r===t?Ax("native"):n||Pd({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Dh({modal:e,isCustom:false});}async function Ax(e){const t=Nr();t&&(Oh(),Td(false),Id(null),t==="inventory"&&await _d.set(false),await Us(t),Pd({modal:t,wasCustom:true,closedBy:e}));}async function Ex(e,t){if(!Gs().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");zr()&&await zh(),Fh(e,t),Td(true),Id(e),xx(e),await wx(e),e==="inventory"&&await _d.set(true),await Mh.set(e),pi=e,Dh({modal:e,isCustom:true});}function _x(e,t){const n=Gs();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Fh(e,o);}async function zh(){const e=Gs();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Oh(),Td(false),Id(null),t==="inventory"&&await _d.set(false),await Mh.set(null),pi=null,await Us(t),Pd({modal:t,wasCustom:true,closedBy:"api"});}function Ix(){return new Promise(e=>{if(!zr()){e();return}const t=Nh(()=>{t(),e();});})}async function Tx(){if(zr()){const e=Nr();e&&await Us(e);}await Cx(),fx();}const io={async init(){return kx()},isReady(){return ax()},async show(e,t){return Ex(e,t)},update(e,t){return _x(e,t)},async close(){return zh()},isOpen(){return Nr()!==null},isCustomOpen(){return zr()},getActiveModal(){return Nr()},waitForClose(){return Ix()},onOpen(e){return px(e)},onClose(e){return Nh(e)},async destroy(){return Tx()}};function Px(){return {ready:false,app:null,renderer:null,ctors:null,textures:new Map,animations:new Map,spriteMeta:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null,catalogKeys:new Set,animationFrameIds:new Map,loadingPromises:new Map,spritePngUrlResolver:null}}function Lx(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Mx(){return {cache:new Map,maxEntries:200}}const Rx={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Fx={enabled:true,maxEntries:200},sn=Px(),Ox=Lx(),Nx={...Rx},Dx=Mx(),$x={...Fx};function Ut(){return sn}function vo(){return Ox}function Si(){return Nx}function Ai(){return Dx}function Tc(){return $x}function jh(){return sn.ready}function hs(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function $i(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?hs(r):`sprite/${n}/${r}`}function Pc(e,t,n,r){const o=$i(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=hs(i);return n.has(a)||r.has(a)?a:o}const Sr=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},Bx="https://mg-api.ariedam.fr/assets/sprite-data?full=1",wp="https://mg-api.ariedam.fr/assets/sprites";let ii=new Map;function zx(e){const t=e.startsWith("sprite/")?e.slice(7):e,n=t.indexOf("/");if(n>0){const r=t.slice(0,n),o=t.slice(n),i=ii.get(r)??r;return `${wp}/${i}${o}.png`}return `${wp}/${t}.png`}function jx(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(e).then(r=>{if(!r.ok)n(new Error(`HTTP ${r.status} for ${e}`));else return r.json()}).then(r=>t(r)).catch(n);return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"json",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}t(r.response);},onerror(){n(new Error(`Network error: ${e}`));}});})}function Gx(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){const r=new Image;r.crossOrigin="anonymous",r.onload=()=>t(r),r.onerror=()=>n(new Error(`Failed to load: ${e}`)),r.src=e;return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"blob",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}const o=r.response,i=URL.createObjectURL(o),a=new Image;a.onload=()=>{URL.revokeObjectURL(i),t(a);},a.onerror=()=>{URL.revokeObjectURL(i),n(new Error(`Failed to decode: ${e}`));},a.src=i;},onerror(){n(new Error(`Network error: ${e}`));}});})}function Ux(e){const t=new Map;for(const n of e){const r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)continue;const[,o,i]=r;t.has(o)||t.set(o,new Set),t.get(o).add(i);}return t}function Wx(e){return {anchor:e.anchor??{x:.5,y:.5},sourceSize:e.sourceSize??{w:0,h:0},trimmed:e.trimmed??false,trimOffset:{x:e.spriteSourceSize?.x??0,y:e.spriteSourceSize?.y??0}}}async function Hx(){Sr("fetching sprite catalog from API...");const e=await jx(Bx),t=e.items??e.categories?.flatMap(f=>f.items)??[];if(Sr(`catalog received: ${t.length} entries`),e.categories){ii=new Map;for(const f of e.categories)for(const p of f.items??[]){if(!p.id)continue;const m=/^sprite\/([^/]+)\//.exec(p.id);if(!m)continue;const v=m[1];(!ii.get(v)||v===f.cat)&&ii.set(v,f.cat);}Sr("category mapping:",Object.fromEntries(ii));}await new Promise(f=>setTimeout(f,0));const n=t.filter(f=>f.type==="frame"),r=t.filter(f=>f.type==="animation"),o=new Map,i=new Set;for(const f of n)o.set(f.id,Wx(f)),i.add(f.id);const a=new Map;for(const f of r)f.frames.length>=2&&(a.set(f.id,f.frames),i.add(f.id));await new Promise(f=>setTimeout(f,0));const l=[...i],u=Ux(l);return Sr(`indexed ${u.size} categories, ${a.size} animations, ${i.size} total keys`),{catalogKeys:i,meta:o,animationFrameIds:a,categoryIndex:u,pngUrlResolver:zx}}let ya=null;async function Vx(){return sn.ready?true:ya||(ya=(async()=>{const e=performance.now();Sr("init start");const{catalogKeys:t,meta:n,animationFrameIds:r,categoryIndex:o,pngUrlResolver:i}=await Hx();return sn.catalogKeys=t,sn.spriteMeta=n,sn.animationFrameIds=r,sn.categoryIndex=o,sn.spritePngUrlResolver=i,Sr("catalog loaded","keys",sn.catalogKeys.size,"animations",sn.animationFrameIds.size,"categories",sn.categoryIndex?.size??0),sn.ready=true,Sr("ready in",Math.round(performance.now()-e),"ms"),true})(),ya)}function Gh(e,t){const n=t.textures.get(e);if(n)return Promise.resolve(n);const r=t.loadingPromises.get(e);if(r)return r;if(!t.catalogKeys.has(e)||!t.spritePngUrlResolver)return Promise.resolve(null);const o=t.spritePngUrlResolver(e),i=Gx(o).then(a=>(t.textures.set(e,a),t.loadingPromises.delete(e),a)).catch(()=>(t.loadingPromises.delete(e),null));return t.loadingPromises.set(e,i),i}async function Uh(e,t){const n=new Map,r=e.map(async o=>{const i=await Gh(o,t);n.set(o,i);});return await Promise.all(r),n}const dr={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Thunderstruck:{overlayTall:"sprite/mutation-overlay/ThunderstruckTallPlant",tallIconOverride:"sprite/mutation/ThunderstruckGround"},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Kx=Object.keys(dr),Yx=["Gold","Rainbow","Wet","Chilled","Frozen","Thunderstruck","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Cp=new Map(Yx.map((e,t)=>[e,t]));function ms(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(Cp.get(n)??1/0)-(Cp.get(r)??1/0))}const qx=["Wet","Chilled","Frozen","Thunderstruck"],Xx=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Qx={Banana:.68,Beet:.65,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Jx={Pepper:.6,Banana:.6},Zx=256,ew=.5,tw=2;function Wh(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=ms(e),n=nw(e),r=rw(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function nw(e){const t=e.filter((o,i,a)=>dr[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?ms(t.filter(o=>!qx.includes(o))):ms(t)}function rw(e){const t=e.filter((n,r,o)=>dr[n]?.overlayTall&&o.indexOf(n)===r);return ms(t)}function fi(e,t){return e.map(n=>({name:n,meta:dr[n],overlayTall:dr[n]?.overlayTall??null,isTall:t}))}const ow={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Thunderstruck:{op:"source-atop",colors:["rgb(16, 141, 163)"],a:.4},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},xa=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function iw(e){return xa.has(e)?e:xa.has("overlay")?"overlay":xa.has("screen")?"screen":xa.has("lighter")?"lighter":"source-atop"}function aw(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,l=n/2;if(!o){const m=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*m,l-Math.sin(i)*m,a+Math.cos(i)*m,l+Math.sin(i)*m)}const u=Math.cos(i),f=Math.sin(i),p=Math.abs(u)*t/2+Math.abs(f)*n/2;return e.createLinearGradient(a-u*p,l-f*p,a+u*p,l+f*p)}function kp(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?aw(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((l,u)=>a.addColorStop(u/(i.length-1),l)),e.fillStyle=a,e.fillRect(0,0,t,n);}function sw(e,t,n,r){const o=ow[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,l=t.width,u=t.height;e.save();const f=i.masked?iw(i.op):"source-in";if(e.globalCompositeOperation=f,i.a!=null&&(e.globalAlpha=i.a),i.masked){const p=document.createElement("canvas");p.width=l,p.height=u;const m=p.getContext("2d");m.imageSmoothingEnabled=false,kp(m,l,u,i,a),m.globalCompositeOperation="destination-in",m.drawImage(t,0,0),e.drawImage(p,0,0);}else kp(e,l,u,i,a);e.restore();}function Bi(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Ei(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];case "Thunderstruck":return ["Thunderstruck","ThunderstruckGround"];default:return [e]}}function lw(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function cw(e,t,n,r){if(!t)return null;const o=Bi(e),i=Ei(t);for(const a of i){const l=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const u of l){const f=n.get(u);if(f)return {tex:f,key:u}}{const u=`sprite/mutation-overlay/${a}TallPlant`,f=n.get(u);if(f)return {tex:f,key:u};const p=`sprite/mutation-overlay/${a}`,m=n.get(p);if(m)return {tex:m,key:p};const v=lw(t,n);if(v)return v}}return null}function dw(e,t,n,r){if(!t)return null;const o=dr[t];if(n&&o?.tallIconOverride){const l=r.get(o.tallIconOverride);if(l)return l}const i=Bi(e),a=Ei(t);for(const l of a){const u=[`sprite/mutation/${l}Icon`,`sprite/mutation/${l}`,`sprite/mutation/${l}${i}`,`sprite/mutation/${l}-${i}`,`sprite/mutation/${l}_${i}`,`sprite/mutation/${l}/${i}`];for(const f of u){const p=r.get(f);if(p)return p}if(n){const f=`sprite/mutation-overlay/${l}TallPlantIcon`,p=r.get(f);if(p)return p;const m=`sprite/mutation-overlay/${l}TallPlant`,v=r.get(m);if(v)return v}}return null}function uw(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let l=Jx[t]??i;const u=o>r*1.5;let f=Qx[t]??(u?a:.4);const p={x:(l-i)*r,y:(f-a)*o},m=Math.min(r,o),v=Math.min(1.5,m/Zx);let y=ew*v;return n&&(y*=tw),{width:r,height:o,anchorX:i,anchorY:a,offset:p,iconScale:y}}function pw(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,l=t.mutations?.slice().sort().join(",")||"",u=t.anchorX??.5,f=t.anchorY??.5;return `${e}|s${i}|f${a}|m${l}|ax${u}|ay${f}|bm${n}|bp${o}|p${r}`}function fw(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function hw(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,l]of e.cache)l.lastAccess<i&&(i=l.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function Lc(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function mw(e){e.cache.clear();}function gw(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function bw(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function vw(e,t,n,r,o,i,a,l=5,u=0){if(!t.ready||!i.enabled)return 0;const f=e.length;let p=0;a?.(0,f);for(let m=0;m<f;m+=l){const v=e.slice(m,m+l);for(const y of v)try{await Rc(t,n,r,null,y,{scale:1},o,i),p++;}catch{p++;}a?.(p,f),m+l<f&&await bw();}return p}function Mc(e){if(e instanceof HTMLCanvasElement)return Lc(e);if(e instanceof HTMLImageElement){const t=document.createElement("canvas");t.width=e.naturalWidth||e.width,t.height=e.naturalHeight||e.height;const n=t.getContext("2d");return n&&(n.imageSmoothingEnabled=false,n.drawImage(e,0,0)),t}throw new Error("Cannot convert to canvas: unknown source type")}async function yw(e,t,n){const r=Wh(t);if(!r.sig)return;const o=new Set,i=n.spriteMeta.get(e),a=i?.anchor?.y??.5,l=i?.sourceSize,u=l?.w??1,f=l?.h??1,p=a>.8&&f>u*1.8,m=fi(r.selectedMuts,p),v=fi(r.overlayMuts,p);for(const b of m){if(b.name==="Gold"||b.name==="Rainbow")continue;const A=dr[b.name];b.isTall&&A?.tallIconOverride&&o.add(A.tallIconOverride);const P=Bi(e);for(const I of Ei(b.name))o.add(`sprite/mutation/${I}Icon`),o.add(`sprite/mutation/${I}`),o.add(`sprite/mutation/${I}${P}`);}if(p)for(const b of v){b.overlayTall&&o.add(b.overlayTall);for(const A of Ei(b.name))o.add(`sprite/mutation-overlay/${A}TallPlant`),o.add(`sprite/mutation-overlay/${A}`),o.add(`sprite/mutation/${A}`);}const y=[...o].filter(b=>n.catalogKeys.has(b)&&!n.textures.has(b));y.length>0&&await Uh(y,n);}function xw(e,t,n,r){const o=dr[t];if(n&&o?.tallIconOverride&&r.has(o.tallIconOverride))return o.tallIconOverride;const i=Bi(e),a=Ei(t);for(const l of a){const u=[`sprite/mutation/${l}Icon`,`sprite/mutation/${l}`,`sprite/mutation/${l}${i}`];for(const f of u)if(r.has(f))return f}return null}function ww(e,t,n,r,o){const i=Wh(n);if(!i.sig)return e;const a=e.width,l=e.height,u=o.get(t),f=u?.anchor?.x??.5,p=u?.anchor?.y??.5,m={x:a*f,y:l*p},v=p>.8&&l>a*1.8,y=fi(i.muts,v),b=fi(i.overlayMuts,v),A=fi(i.selectedMuts,v),P=Bi(t),T=uw({width:a,height:l,defaultAnchor:{x:f,y:p}},P,v),N=[];for(const M of A){if(M.name==="Gold"||M.name==="Rainbow")continue;const F=dw(t,M.name,M.isTall,r);if(F)try{const L=Mc(F),C=L.width*T.iconScale,E=L.height*T.iconScale,B=xw(t,M.name,M.isTall,r),j=B?o.get(B):null,V=j?.anchor?.x??.5,U=j?.anchor?.y??.5,ce=m.x+T.offset.x-C*V,Y=m.y+T.offset.y-E*U;let ie=2;M.isTall&&(ie=-1),Xx.has(M.name)&&(ie=10),N.push({canvas:L,x:ce,y:Y,sw:C,sh:E,z:ie});}catch{}}const z=document.createElement("canvas");z.width=a,z.height=l;const O=z.getContext("2d");O.imageSmoothingEnabled=false;for(const M of N)M.z===-1&&O.drawImage(M.canvas,M.x,M.y,M.sw,M.sh);O.drawImage(e,0,0);for(const M of y){const F=document.createElement("canvas");F.width=a,F.height=l;const L=F.getContext("2d");L.imageSmoothingEnabled=false,L.drawImage(e,0,0),sw(L,F,M.name,M.isTall),O.drawImage(F,0,0);}for(const M of N)M.z===2&&O.drawImage(M.canvas,M.x,M.y,M.sw,M.sh);if(v)for(const M of b){const F=M.overlayTall,L=F&&r.get(F)?{tex:r.get(F),key:F}:cw(t,M.name,r);if(L?.tex)try{const C=Mc(L.tex),E=C.width,B=C.height,j=m.x-f*E,V=0,U=document.createElement("canvas");U.width=E,U.height=B;const ce=U.getContext("2d");if(!ce)continue;ce.imageSmoothingEnabled=!1,ce.drawImage(C,0,0),ce.globalCompositeOperation="destination-in",ce.drawImage(e,-j,-V),O.drawImage(U,j,V);}catch{}}for(const M of N)M.z===10&&O.drawImage(M.canvas,M.x,M.y,M.sw,M.sh);return z}function Cw(e){return e.boundsMode?e.boundsMode:"base"}function kw(e,t){return t.pad??0}function Yo(e){return Number.isFinite(e)?Math.max(0,e):0}function Hh(e){if(typeof e=="number"){const t=Yo(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Yo(e.top??0),right:Yo(e.right??0),bottom:Yo(e.bottom??0),left:Yo(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Sw(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Hh(t);return `${n.top},${n.right},${n.bottom},${n.left}`}async function Rc(e,t,n,r,o,i={},a,l){if(!e.ready)throw new Error("MGSprite not ready yet");const u=Pc(r,o,e.catalogKeys,e.animationFrameIds),f=Cw(i),p=kw(f,i),m=Sw(f,i.boundsPadding),v=a&&l?.enabled?pw(u,i,f,p,m):null;if(v&&a&&l?.enabled){const C=fw(a,v);if(C)return Lc(C)}const y=i.mutations||[],b=e.animationFrameIds.get(u);b?.length?await Uh(b,e):await Gh(u,e),y.length>0&&await yw(u,y,e);const A=Math.max(0,(i.frameIndex??0)|0);let P;if(b?.length){const C=b.map(E=>e.textures.get(E)).filter(Boolean);P=C.length>0?C[A%C.length]:null;}else P=e.textures.get(u);if(!P)throw new Error(`Unknown sprite/anim key: ${u}`);let I=Mc(P);y.length>0&&(I=ww(I,u,y,e.textures,e.spriteMeta));const T=i.scale??1,N=Hh(i.boundsPadding),z=I.width,O=I.height,M=Math.max(1,Math.ceil((z+N.left+N.right+p*2)*T)),F=Math.max(1,Math.ceil((O+N.top+N.bottom+p*2)*T));let L;if(T===1&&!p&&!N.top&&!N.right&&!N.bottom&&!N.left)L=I;else {L=document.createElement("canvas"),L.width=M,L.height=F;const C=L.getContext("2d");if(C){C.imageSmoothingEnabled=false;const E=(N.left+p)*T,B=(N.top+p)*T;C.drawImage(I,E,B,z*T,O*T);}}return v&&a&&l?.enabled?(hw(a,l,v,L),Lc(L)):L}function Sp(e,t,n,r,o,i={}){throw e.ready?!e.app||!e.ctors?new Error("MGSprite.show() requires PIXI (not available - use toCanvas() instead)"):new Error("MGSprite.show() is not supported in API-only mode"):new Error("MGSprite not ready yet")}function Aw(e){for(const t of Array.from(e.live)){const n=t.__mgDestroy;typeof n=="function"&&n.call(t);}}function Ew(e,t){return e.defaultParent=t,true}function _w(e,t){return e.defaultParent=t,true}function Iw(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function jr(){if(!jh())throw new Error("MGSprite not ready yet")}function Tw(e,t,n){return typeof t=="string"?Sp(Ut(),vo(),Si(),e,t,n||{}):Sp(Ut(),vo(),Si(),null,e,t||{})}function Pw(e,t,n){return typeof t=="string"?Rc(Ut(),vo(),Si(),e,t,n||{},Ai(),Tc()):Rc(Ut(),vo(),Si(),null,e,t||{},Ai(),Tc())}function Lw(){Aw(Ut());}function Mw(e){return Ew(Ut(),e)}function Rw(e){return _w(Ut(),e)}function Fw(e,t){const n=Ut(),r=typeof t=="string"?Pc(e,t,n.catalogKeys,n.animationFrameIds):Pc(null,e,n.catalogKeys,n.animationFrameIds);return n.catalogKeys.has(r)||n.animationFrameIds.has(r)}function Ow(){jr();const e=Ut().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Nw(e){jr();const t=String(e||"").trim();if(!t)return [];const n=Ut().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Dw(e,t){jr();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Ut().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[l,u]of o.entries())if(l.toLowerCase()===i){for(const f of u.values())if(f.toLowerCase()===a)return  true}return  false}function $w(e){jr();const t=Ut().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const l=$i(o,a);(!n||l.toLowerCase().startsWith(n))&&r.push(l);}return r.sort((o,i)=>o.localeCompare(i))}function Bw(e){jr();const t=String(e||"").trim();if(!t)return null;const n=hs(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Ut().categoryIndex,l=o.toLowerCase(),u=i.toLowerCase();let f=o,p=i;if(a){const m=Array.from(a.keys()).find(b=>b.toLowerCase()===l);if(!m)return null;f=m;const v=a.get(m);if(!v)return null;const y=Array.from(v.values()).find(b=>b.toLowerCase()===u);if(!y)return null;p=y;}return {category:f,id:p,key:$i(f,p)}}function zw(e,t){jr();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Ut().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),l=Array.from(o.keys()).find(p=>p.toLowerCase()===i)||n,u=o.get(l);if(!u)throw new Error(`Unknown sprite category: ${n}`);const f=Array.from(u.values()).find(p=>p.toLowerCase()===a)||r;if(!u.has(f))throw new Error(`Unknown sprite id: ${n}/${r}`);return $i(l,f)}function jw(){Iw(vo());}function Gw(){mw(Ai());}function Uw(){return gw(Ai())}function Ww(){return [...Kx]}async function Hw(e,t,n=10,r=0){return jr(),vw(e,Ut(),vo(),Si(),Ai(),Tc(),t,n,r)}const Qe={init:Vx,isReady:jh,show:Tw,toCanvas:Pw,clear:Lw,attach:Mw,attachProvider:Rw,has:Fw,key:(e,t)=>$i(e,t),getCategories:Ow,getCategoryId:Nw,hasId:Dw,listIds:$w,getIdInfo:Bw,getIdPath:zw,clearMutationCache:jw,clearToCanvasCache:Gw,getToCanvasCacheStats:Uw,getMutationNames:Ww,warmup:Hw};function Vw(){return {ready:false,xform:null,xformAt:0}}const pn=Vw();function Vh(){return pn.ready}const Ap=Function.prototype.bind,qe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Kh,Yh,qh;const Kw=new Promise(e=>{Kh=e;}),Yw=new Promise(e=>{Yh=e;}),qw=new Promise(e=>{qh=e;});function Xw(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Qw(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Jw(e){qe.engine=e,qe.tos=Qw(e)||null,qe.app=e.app||null,qe.renderer=e.app?.renderer||null,qe.ticker=e.app?.ticker||null,qe.stage=e.app?.stage||null;try{Kh(e);}catch{}try{qe.app&&Yh(qe.app);}catch{}try{qe.renderer&&qh(qe.renderer);}catch{}}function Md(){return qe.engine?true:(qe._bindPatched||(qe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Ap.call(this,e,...t);try{!qe.engine&&Xw(e)&&(Function.prototype.bind=Ap,qe._bindPatched=!1,Jw(e));}catch{}return n}),false)}Md();async function Zw(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(qe.engine)return  true;Md(),await dh(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function eC(e=15e3){return qe.engine||await Zw(e),true}function tC(){return qe.engine&&qe.app?{ok:true,engine:qe.engine,tos:qe.tos,app:qe.app}:(Md(),{ok:false,engine:qe.engine,tos:qe.tos,app:qe.app,note:"Not captured. Wait for room, or reload."})}const Mn={engineReady:Kw,appReady:Yw,rendererReady:qw,engine:()=>qe.engine,tos:()=>qe.tos,app:()=>qe.app,renderer:()=>qe.renderer,ticker:()=>qe.ticker,stage:()=>qe.stage,PIXI:()=>fe.PIXI||null,init:eC,hook:tC,ready:()=>!!qe.engine};function Po(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function zi(){return Mn.tos()}function Rd(){return Mn.engine()}function nC(){const e=zi()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Fd(e,t){const n=nC();return n?t*n+e|0:null}let wa=null;async function rC(e=15e3){return pn.ready?true:wa||(wa=(async()=>{if(await Mn.init(e),!zi())throw new Error("MGTile: engine captured but tileObject system not found");return pn.ready=true,true})(),wa)}function Lr(e,t,n=true){const r=zi(),o=Fd(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function Bl(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Od(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function ao(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Rd(),{gidx:l,tv:u}=Lr(Number(e),Number(t),o);if(l==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");const f=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:l,before:f,after:u.tileObject}}function Ws(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=Lr(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const l=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Po(l):l}}function oC(e,t,n={}){return ao(e,t,null,n)}function iC(e,t,n,r={}){const i=Ws(e,t,{...r,clone:false}).tileView?.tileObject;Od(i,"plant");const a=Po(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const l=Number(n.slotIdx)|0;if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);return Bl(a.slots[l],n.slotPatch),ao(e,t,a,r)}if("slots"in n){const l=n.slots;if(Array.isArray(l)){for(let u=0;u<l.length;u++)if(l[u]!=null){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);Bl(a.slots[u],l[u]);}}else if(l&&typeof l=="object")for(const u of Object.keys(l)){const f=Number(u)|0;if(Number.isFinite(f)){if(!a.slots[f])throw new Error(`MGTile: plant slot ${f} doesn't exist`);Bl(a.slots[f],l[f]);}}else throw new Error("MGTile: patch.slots must be array or object map");return ao(e,t,a,r)}return ao(e,t,a,r)}function aC(e,t,n,r={}){const i=Ws(e,t,{...r,clone:false}).tileView?.tileObject;Od(i,"decor");const a=Po(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),ao(e,t,a,r)}function sC(e,t,n,r={}){const i=Ws(e,t,{...r,clone:false}).tileView?.tileObject;Od(i,"egg");const a=Po(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),ao(e,t,a,r)}function lC(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Rd(),{gidx:l,tv:u}=Lr(Number(e),Number(t),o);if(l==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");const f=u.tileObject,p=typeof n=="function"?n(Po(f)):n;if(u.onDataChanged(p),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:l,before:f,after:u.tileObject}}function cC(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=Lr(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,l=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:l?.objectType??null,tileObject:a?Po(l):l,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function zl(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Va(e){const t=yn(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=yn(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function dC(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Va(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function uC(){const e=zi(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const l=Lr(i,a,true).tv,u=i+1<t?Lr(i+1,a,true).tv:null,f=Lr(i,a+1,true).tv,p=zl(l),m=zl(u),v=zl(f);if(!p||!m||!v)continue;const y=Va(p),b=Va(m),A=Va(v);if(!y||!b||!A)continue;const P={x:b.x-y.x,y:b.y-y.y},I={x:A.x-y.x,y:A.y-y.y},T=P.x*I.y-P.y*I.x;if(!Number.isFinite(T)||Math.abs(T)<1e-6)continue;const N=1/T,z={a:I.y*N,b:-I.x*N,c:-P.y*N,d:P.x*N},O={x:y.x-i*P.x-a*I.x,y:y.y-i*P.y-a*I.y},M=dC(p),F=M==="center"?O:{x:O.x+.5*(P.x+I.x),y:O.y+.5*(P.y+I.y)};return {ok:true,cols:t,rows:r,vx:P,vy:I,inv:z,anchorMode:M,originCenter:F}}return null}function Xh(){return pn.xform=uC(),pn.xformAt=Date.now(),{ok:!!pn.xform?.ok,xform:pn.xform}}function pC(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!pn.xform?.ok||t.forceRebuild||Date.now()-pn.xformAt>n)&&Xh();const r=pn.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,l=r.inv.c*o+r.inv.d*i,u=Math.floor(a),f=Math.floor(l),p=[[u,f],[u+1,f],[u,f+1],[u+1,f+1]];let m=null,v=1/0;for(const[y,b]of p){if(y<0||b<0||y>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&b>=r.rows)continue;const A=r.originCenter.x+y*r.vx.x+b*r.vy.x,P=r.originCenter.y+y*r.vx.y+b*r.vy.y,I=(e.x-A)**2+(e.y-P)**2;I<v&&(v=I,m={tx:y,ty:b,fx:a,fy:l,x:e.x,y:e.y,gidx:null});}return m?(m.gidx=Fd(m.tx,m.ty),m):null}function fC(e,t){const n=pn.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function bn(){if(!Vh())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function hC(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Zn={init:rC,isReady:Vh,hook:Mn.hook,engine:Rd,tos:zi,gidx:(e,t)=>Fd(Number(e),Number(t)),getTileObject:(e,t,n={})=>(bn(),Ws(e,t,n)),inspect:(e,t,n={})=>(bn(),cC(e,t,n)),setTileEmpty:(e,t,n={})=>(bn(),oC(e,t,n)),setTilePlant:(e,t,n,r={})=>(bn(),iC(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(bn(),aC(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(bn(),sC(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(bn(),lC(e,t,n,r)),rebuildTransform:()=>(bn(),Xh()),pointToTile:(e,t={})=>(bn(),pC(e,t)),tileToPoint:(e,t)=>(bn(),fC(e,t)),getTransform:()=>(bn(),pn.xform),help:hC};function mC(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const Ie=mC();function Qh(){return Ie.ready}async function gC(e=15e3){if(Ie.ready)return Fc(),true;if(await Mn.init(e),Ie.app=Mn.app(),Ie.ticker=Mn.ticker(),Ie.renderer=Mn.renderer(),Ie.stage=Mn.stage(),!Ie.app||!Ie.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return Ie.ready=true,Fc(),true}function Fc(){const e=fe;return e.$PIXI=e.PIXI||null,e.$app=Ie.app||null,e.$renderer=Ie.renderer||null,e.$stage=Ie.stage||null,e.$ticker=Ie.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:Ie.ready},e.__MG_PIXI__}function Nd(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Oc(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function gs(e){return !!(e&&typeof e.tint=="number")}function Dr(e){return !!(e&&typeof e.alpha=="number")}function Ka(e,t,n){return e+(t-e)*n}function bC(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,l=t>>8&255,u=t&255,f=Ka(r,a,n)|0,p=Ka(o,l,n)|0,m=Ka(i,u,n)|0;return f<<16|p<<8|m}function vC(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;gs(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function yC(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;Dr(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let l=a.length-1;l>=0;l--)r.push(a[l]);}return n}const xC=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Nc(e){if(!e)return null;if(Oc(e))return e;if(!Nd(e))return null;for(const t of xC){const n=e[t];if(Oc(n))return n}return null}function wC(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const l=new Array(t);let u=true;for(let f=0;f<t;f++){const p=Nc(i[f]);if(!p){u=false;break}l[f]=p;}if(u)return l}for(const l of i)n.push({o:l,d:a+1});continue}if(Nd(i)){const l=i;for(const u of Object.keys(l))n.push({o:l[u],d:a+1});}}}return null}function Jh(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Nd(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function CC(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=Jh(t);return Ie.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function kC(e){return Ie.tileSets.delete(String(e||"").trim())}function SC(){return Array.from(Ie.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Zh(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Dd(e){const n=Zn.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Zh(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=Ie.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=Jh(e.tiles||[]);const o=new Map;for(const i of r){const a=Zn.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function $d(e){const t=Ie.highlights.get(e);if(!t)return  false;yn(()=>Ie.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Dr(t.root)&&yn(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&gs(n.o)&&yn(()=>{n.o.tint=n.baseTint;});return Ie.highlights.delete(e),true}function em(e=null){for(const t of Array.from(Ie.highlights.keys()))e&&!String(t).startsWith(e)||$d(t);return  true}function tm(e,t={}){if(!Oc(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(Ie.highlights.has(n))return n;const r=Dr(e)?Number(e.alpha):null,o=Rn(Number(t.minAlpha??.12),0,1),i=Rn(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),l=(t.tint??8386303)>>>0,u=Rn(Number(t.tintMix??.85),0,1),f=t.deepTint!==false,p=[];if(f)for(const y of vC(e))p.push({o:y,baseTint:y.tint});else gs(e)&&p.push({o:e,baseTint:e.tint});const m=performance.now(),v=()=>{const y=(performance.now()-m)/1e3,b=(Math.sin(y*Math.PI*2*a)+1)/2,A=b*b*(3-2*b);r!=null&&Dr(e)&&(e.alpha=Rn(Ka(o,i,A)*r,0,1));const P=A*u;for(const I of p)I.o&&gs(I.o)&&(I.o.tint=bC(I.baseTint,l,P));};return Ie.ticker?.add(v),Ie.highlights.set(n,{root:e,tick:v,baseAlpha:r,tint:p}),n}function AC(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function nm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=Dd(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)em(i);else for(const m of Array.from(Ie.highlights.keys())){if(!m.startsWith(i))continue;const v=m.split(":"),y=Number(v[2]);o.has(y)&&$d(m);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let l=0,u=0,f=0,p=0;for(const[m,v]of r){const y=v?.tileObject;if(!y||y.objectType!=="plant")continue;const b=y.slots;if(!Array.isArray(b)||b.length===0)continue;let A=false;const P=[];for(let N=0;N<b.length;N++)AC(b[N],n)&&(P.push(N),A=true);if(!A)continue;l++,u+=P.length;const I=v?.childView?.plantVisual||v?.childView||v,T=wC(I,b.length);if(!T){p+=P.length;continue}for(const N of P){const z=T[N];if(!z){p++;continue}const O=`${i}${m}:${N}`;Ie.highlights.has(O)||(tm(z,{key:O,...a}),f++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:l,matchedSlots:u,newHighlights:f,failedSlots:p}}function EC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Ie.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{yn(()=>nm(n,{...t,clear:!1}));},o);return Ie.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function _C(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Ie.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),Ie.watches.delete(i),o++);return o>0}const n=Ie.watches.get(t);return n?(clearInterval(n),Ie.watches.delete(t),true):false}function IC(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Nc(t)||Nc(e?.displayObject)||null}function rm(e){const t=Ie.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Dr(n.o)&&Number.isFinite(n.baseAlpha)&&yn(()=>{n.o.alpha=n.baseAlpha;});return Ie.fades.delete(e),true}function Dc(e=null){for(const t of Array.from(Ie.fades.keys()))e&&!String(t).startsWith(e)||rm(t);return  true}function om(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!Zh(t))return Dc(r);const{gidxSet:o}=Dd(t);if(!o)return Dc(r);for(const i of Array.from(Ie.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&rm(i);}return  true}function im(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=Rn(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=Dd(t),l=`fade:${n}:`;t.clear===true&&om(n,t);let u=0,f=0,p=0,m=0;for(const[v,y]of i){const b=y?.tileObject;if(!b||b.objectType!=="plant")continue;u++;const A=String(b.species||"").trim().toLowerCase();if(!A||A!==n)continue;f++;const P=IC(y);if(!P||!Dr(P)){m++;continue}const I=`${l}${v}`;if(Ie.fades.has(I)){yn(()=>{P.alpha=r;}),p++;continue}const T=o?yC(P):[P],N=[];for(const z of T)Dr(z)&&N.push({o:z,baseAlpha:Number(z.alpha)});for(const z of N)yn(()=>{z.o.alpha=r;});Ie.fades.set(I,{targets:N}),p++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:u,matchedPlants:f,applied:p,failed:m,totalFades:Ie.fades.size}}function TC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Ie.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{yn(()=>im(n,{...t,clear:!1}));},o);return Ie.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function PC(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Ie.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),Ie.fadeWatches.delete(i),o++);return o>0}const n=Ie.fadeWatches.get(t);return n?(clearInterval(n),Ie.fadeWatches.delete(t),true):false}function LC(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function MC(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=Zn.getTileObject(r,o,{ensureView:i,clone:false}),l=a?.tileView||null,u=l?.tileObject,f={ok:true,tx:r,ty:o,gidx:a?.gidx??Zn.gidx?.(r,o)??null,hasTileView:!!l,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?LC(u):u?{objectType:u.objectType??null}:null,display:l?l.childView?.plantVisual||l.childView||l.displayObject||l:null};return n.log!==false&&yn(()=>console.log("[MGPixi.inspectTile]",f)),f}function RC(e,t,n){const r=fe.PIXI;if(!r)return;let o=Ie.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",Ie.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const l=Zn.tileToPoint(e,t);if(!l)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const u=Zn.getTransform(),f=u?Math.hypot(u.vx.x,u.vx.y):32,p=u?Math.hypot(u.vy.x,u.vy.y):32;a.drawRect(0,0,f,p),a.endFill(),a.x=l.x,a.y=l.y,u&&(a.rotation=Math.atan2(u.vx.y,u.vx.x));}function FC(e){const t=Ie.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Mt(){if(!Qh())throw new Error("MGPixi: call MGPixi.init() first")}const Hs={init:gC,isReady:Qh,expose:Fc,get app(){return Ie.app},get renderer(){return Ie.renderer},get stage(){return Ie.stage},get ticker(){return Ie.ticker},get PIXI(){return fe.PIXI||null},defineTileSet:(e,t)=>(Mt(),CC(e,t)),deleteTileSet:e=>(Mt(),kC(e)),listTileSets:()=>(Mt(),SC()),highlightPulse:(e,t)=>(Mt(),tm(e,t)),stopHighlight:e=>(Mt(),$d(e)),clearHighlights:e=>(Mt(),em(e)),drawOverlayBox:(e,t,n)=>(Mt(),RC(e,t,n)),stopOverlay:e=>(Mt(),FC(e)),highlightMutation:(e,t)=>(Mt(),nm(e,t)),watchMutation:(e,t)=>(Mt(),EC(e,t)),stopWatchMutation:e=>(Mt(),_C(e)),inspectTile:(e,t,n)=>(Mt(),MC(e,t,n)),fadeSpecies:(e,t)=>(Mt(),im(e,t)),clearSpeciesFade:(e,t)=>(Mt(),om(e,t)),clearFades:e=>(Mt(),Dc(e)),watchFadeSpecies:(e,t)=>(Mt(),TC(e,t)),stopWatchFadeSpecies:e=>(Mt(),PC(e))},OC=["Top","Mid","Bottom","DiscordAvatarPlaceholder"],jl={AVATAR:/avatarelements[^"'`\s]*\.riv/,EMOTES:/emotes[^"'`\s]*\.riv/,UI:/(giftbox|currency|bread|donut|streak|countdown|loader)[^"'`\s]*\.riv/},am=new Map;let bs=[],sm=false;function NC(e){return am.get(e)}function DC(e,t){am.set(e,t);}function Vs(){return [...bs]}function $C(e){bs=e;}function lm(e){bs.some(t=>t.url===e.url)||bs.push(e);}function BC(){return sm}function Ep(e){sm=e;}const so=[];let xr=null;function zC(){if(xr)return xr;const e=window.fetch;window.fetch=function(r,o){const i=Ip(r);return i&&i.endsWith(".riv")&&_p(i),e.call(this,r,o)},xr=()=>{window.fetch===t&&(window.fetch=e),xr=null;};function t(n,r){const o=Ip(n);return o&&o.endsWith(".riv")&&_p(o),e.call(window,n,r)}return window.fetch=t,xr=()=>{window.fetch===t&&(window.fetch=e),xr=null;},xr}function _p(e){const t=Rt.detect(),n=e.startsWith("/")?`${t.origin}${e}`:e,r=dm(e),o=um(e),i={name:o,url:n,type:r};lm(i),console.log(`[MGRiveLoader] Intercepted .riv fetch: ${o} (${r})`,n);for(let a=so.length-1;a>=0;a--){const l=so[a];l.type===r&&(clearTimeout(l.timer),l.resolve(i),so.splice(a,1));}}async function jC(){const t=Rt.detect().origin,n=Array.from(document.scripts),r=[];for(const i of n){const a=i.textContent||"",l=Tp(a,t);r.push(...l);}for(const i of n)if(i.src)try{if(new URL(i.src).origin!==t)continue;const l=await fetch(i.src);if(!l.ok)continue;const u=await l.text(),f=Tp(u,t);r.push(...f);}catch(a){console.debug("[MGRiveLoader] Failed to fetch script:",i.src,a);}const o=Array.from(new Map(r.map(i=>[i.url,i])).values());for(const i of o)lm(i);return Vs()}async function GC(){zC();const e=await jC();return $C(e),console.log(`[MGRiveLoader] Discovered ${e.length} .riv files:`,e),e}function UC(e,t=3e4){const n=Vs().find(r=>r.type===e);return n?Promise.resolve(n):new Promise(r=>{const o=setTimeout(()=>{const i=so.findIndex(a=>a.resolve===r);i!==-1&&so.splice(i,1),console.warn(`[MGRiveLoader] Timed out waiting for ${e} .riv file`),r(null);},t);so.push({type:e,resolve:r,timer:o});})}async function cm(){const e=Vs().find(n=>n.type==="avatar");if(e)return e;console.log("[MGRiveLoader] Avatar .riv not found yet, waiting for game to load it...");const t=await UC("avatar",3e4);return t||console.warn("[MGRiveLoader] Could not find avatar .riv file"),t}function Ip(e){return typeof e=="string"?e:e instanceof URL?e.href:e instanceof Request?e.url:null}function Tp(e,t){const n=[],r=new Set,o=/["'`]([^"'`]*\.riv)["'`]/g;let i;for(;(i=o.exec(e))!==null;){const a=i[1],l=dm(a);if(l==="other"&&!a.endsWith(".riv")||r.has(a))continue;r.add(a);const u=a.startsWith("/")?`${t}${a}`:a;n.push({name:um(a),url:u,type:l});}return n}function dm(e){return jl.AVATAR.test(e)?"avatar":jl.EMOTES.test(e)?"emote":jl.UI.test(e)?"ui":"other"}function um(e){const t=e.split("/");return t[t.length-1].replace(/-[a-zA-Z0-9_]+\.riv$/,"")}var Ya={exports:{}},WC=Ya.exports,Pp;function HC(){return Pp||(Pp=1,(function(e,t){(function(r,o){e.exports=o();})(WC,()=>(()=>{var n=[,((a,l,u)=>{u.r(l),u.d(l,{default:()=>p});var f=(()=>{var m=typeof document<"u"?document.currentScript?.src:void 0;return(function(v={}){var y,b=v,A,P,I=new Promise((s,c)=>{A=s,P=c;}),T=typeof window=="object",N=typeof importScripts=="function";function z(){function s(H){const K=x;g=c=0,x=new Map,K.forEach(oe=>{try{oe(H);}catch(ee){console.error(ee);}}),this.ob(),_&&_.Qb();}let c=0,g=0,x=new Map,_=null,D=null;this.requestAnimationFrame=function(H){c||(c=requestAnimationFrame(s.bind(this)));const K=++g;return x.set(K,H),K},this.cancelAnimationFrame=function(H){x.delete(H),c&&x.size==0&&(cancelAnimationFrame(c),c=0);},this.Ob=function(H){D&&(document.body.remove(D),D=null),H||(D=document.createElement("div"),D.style.backgroundColor="black",D.style.position="fixed",D.style.right=0,D.style.top=0,D.style.color="white",D.style.padding="4px",D.innerHTML="RIVE FPS",H=function(K){D.innerHTML="RIVE FPS "+K.toFixed(1);},document.body.appendChild(D)),_=new function(){let K=0,oe=0;this.Qb=function(){var ee=performance.now();oe?(++K,ee-=oe,1e3<ee&&(H(1e3*K/ee),K=oe=0)):(oe=ee,K=0);};};},this.Lb=function(){D&&(document.body.remove(D),D=null),_=null;},this.ob=function(){};}function O(s){console.assert(true);const c=new Map;let g=-1/0;this.push=function(x){return x=x+((1<<s)-1)>>s,c.has(x)&&clearTimeout(c.get(x)),c.set(x,setTimeout(function(){c.delete(x),c.length==0?g=-1/0:x==g&&(g=Math.max(...c.keys()),console.assert(g<x));},1e3)),g=Math.max(x,g),g<<s};}const M=b.onRuntimeInitialized;b.onRuntimeInitialized=function(){M&&M();let s=b.decodeAudio;b.decodeAudio=function(_,D){_=s(_),D(_);};let c=b.decodeFont;b.decodeFont=function(_,D){_=c(_),D(_);};const g=b.FileAssetLoader;b.ptrToAsset=_=>{let D=b.ptrToFileAsset(_);return D.isImage?b.ptrToImageAsset(_):D.isFont?b.ptrToFontAsset(_):D.isAudio?b.ptrToAudioAsset(_):D},b.CustomFileAssetLoader=g.extend("CustomFileAssetLoader",{__construct:function({loadContents:_}){this.__parent.__construct.call(this),this.Eb=_;},loadContents:function(_,D){return _=b.ptrToAsset(_),this.Eb(_,D)}}),b.CDNFileAssetLoader=g.extend("CDNFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this);},loadContents:function(_){let D=b.ptrToAsset(_);return _=D.cdnUuid,_===""?false:((function(H,K){var oe=new XMLHttpRequest;oe.responseType="arraybuffer",oe.onreadystatechange=function(){oe.readyState==4&&oe.status==200&&K(oe);},oe.open("GET",H,true),oe.send(null);})(D.cdnBaseUrl+"/"+_,H=>{D.decode(new Uint8Array(H.response));}),true)}}),b.FallbackFileAssetLoader=g.extend("FallbackFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this),this.kb=[];},addLoader:function(_){this.kb.push(_);},loadContents:function(_,D){for(let H of this.kb)if(H.loadContents(_,D))return  true;return  false}});let x=b.computeAlignment;b.computeAlignment=function(_,D,H,K,oe=1){return x.call(this,_,D,H,K,oe)};};const F="createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(" "),L=new function(){function s(){if(!c){let De=function(Ge,ke,rt){if(ke=pe.createShader(ke),pe.shaderSource(ke,rt),pe.compileShader(ke),rt=pe.getShaderInfoLog(ke),0<(rt||"").length)throw rt;pe.attachShader(Ge,ke);};var X=document.createElement("canvas"),be={alpha:1,depth:0,stencil:0,antialias:0,premultipliedAlpha:1,preserveDrawingBuffer:0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:1,explicitSwapControl:1,renderViaOffscreenBackBuffer:1};let pe;if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){if(pe=X.getContext("webgl",be),g=1,!pe)return console.log("No WebGL support. Image mesh will not be drawn."),false}else if(pe=X.getContext("webgl2",be))g=2;else if(pe=X.getContext("webgl",be))g=1;else return console.log("No WebGL support. Image mesh will not be drawn."),false;if(pe=new Proxy(pe,{get(Ge,ke){if(Ge.isContextLost()){if(oe||(console.error("Cannot render the mesh because the GL Context was lost. Tried to invoke ",ke),oe=true),typeof Ge[ke]=="function")return function(){}}else return typeof Ge[ke]=="function"?function(...rt){return Ge[ke].apply(Ge,rt)}:Ge[ke]},set(Ge,ke,rt){if(Ge.isContextLost())oe||(console.error("Cannot render the mesh because the GL Context was lost. Tried to set property "+ke),oe=true);else return Ge[ke]=rt,true}}),x=Math.min(pe.getParameter(pe.MAX_RENDERBUFFER_SIZE),pe.getParameter(pe.MAX_TEXTURE_SIZE)),X=pe.createProgram(),De(X,pe.VERTEX_SHADER,`attribute vec2 vertex;
                attribute vec2 uv;
                uniform vec4 mat;
                uniform vec2 translate;
                varying vec2 st;
                void main() {
                    st = uv;
                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);
                }`),De(X,pe.FRAGMENT_SHADER,`precision highp float;
                uniform sampler2D image;
                varying vec2 st;
                void main() {
                    gl_FragColor = texture2D(image, st);
                }`),pe.bindAttribLocation(X,0,"vertex"),pe.bindAttribLocation(X,1,"uv"),pe.linkProgram(X),be=pe.getProgramInfoLog(X),0<(be||"").trim().length)throw be;_=pe.getUniformLocation(X,"mat"),D=pe.getUniformLocation(X,"translate"),pe.useProgram(X),pe.bindBuffer(pe.ARRAY_BUFFER,pe.createBuffer()),pe.enableVertexAttribArray(0),pe.enableVertexAttribArray(1),pe.bindBuffer(pe.ELEMENT_ARRAY_BUFFER,pe.createBuffer()),pe.uniform1i(pe.getUniformLocation(X,"image"),0),pe.pixelStorei(pe.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true),c=pe;}return  true}let c=null,g=0,x=0,_=null,D=null,H=0,K=0,oe=false;s(),this.bc=function(){return s(),x},this.Kb=function(X){c.deleteTexture&&c.deleteTexture(X);},this.Jb=function(X){if(!s())return null;const be=c.createTexture();return be?(c.bindTexture(c.TEXTURE_2D,be),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,X),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR),g==2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR_MIPMAP_LINEAR),c.generateMipmap(c.TEXTURE_2D)):c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR),be):null};const ee=new O(8),me=new O(8),Se=new O(10),Ae=new O(10);this.Nb=function(X,be,pe,De,Ge){if(s()){var ke=ee.push(X),rt=me.push(be);if(c.canvas){(c.canvas.width!=ke||c.canvas.height!=rt)&&(c.canvas.width=ke,c.canvas.height=rt),c.viewport(0,rt-be,X,be),c.disable(c.SCISSOR_TEST),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.enable(c.SCISSOR_TEST),pe.sort((Ye,In)=>In.vb-Ye.vb),ke=Se.push(De),H!=ke&&(c.bufferData(c.ARRAY_BUFFER,8*ke,c.DYNAMIC_DRAW),H=ke),ke=0;for(var It of pe)c.bufferSubData(c.ARRAY_BUFFER,ke,It.Ta),ke+=4*It.Ta.length;console.assert(ke==4*De);for(var Jt of pe)c.bufferSubData(c.ARRAY_BUFFER,ke,Jt.Bb),ke+=4*Jt.Bb.length;console.assert(ke==8*De),ke=Ae.push(Ge),K!=ke&&(c.bufferData(c.ELEMENT_ARRAY_BUFFER,2*ke,c.DYNAMIC_DRAW),K=ke),It=0;for(var gr of pe)c.bufferSubData(c.ELEMENT_ARRAY_BUFFER,It,gr.indices),It+=2*gr.indices.length;console.assert(It==2*Ge),gr=0,Jt=true,ke=It=0;for(const Ye of pe){Ye.image.Ja!=gr&&(c.bindTexture(c.TEXTURE_2D,Ye.image.Ia||null),gr=Ye.image.Ja),Ye.hc?(c.scissor(Ye.Za,rt-Ye.$a-Ye.jb,Ye.uc,Ye.jb),Jt=true):Jt&&(c.scissor(0,rt-be,X,be),Jt=false),pe=2/X;const In=-2/be;c.uniform4f(_,Ye.ha[0]*pe*Ye.Aa,Ye.ha[1]*In*Ye.Ba,Ye.ha[2]*pe*Ye.Aa,Ye.ha[3]*In*Ye.Ba),c.uniform2f(D,Ye.ha[4]*pe*Ye.Aa+pe*(Ye.Za-Ye.cc*Ye.Aa)-1,Ye.ha[5]*In*Ye.Ba+In*(Ye.$a-Ye.dc*Ye.Ba)+1),c.vertexAttribPointer(0,2,c.FLOAT,false,0,ke),c.vertexAttribPointer(1,2,c.FLOAT,false,0,ke+4*De),c.drawElements(c.TRIANGLES,Ye.indices.length,c.UNSIGNED_SHORT,It),ke+=4*Ye.Ta.length,It+=2*Ye.indices.length;}console.assert(ke==4*De),console.assert(It==2*Ge);}}},this.canvas=function(){return s()&&c.canvas};},C=b.onRuntimeInitialized;b.onRuntimeInitialized=function(){function s(ue){switch(ue){case ee.srcOver:return "source-over";case ee.screen:return "screen";case ee.overlay:return "overlay";case ee.darken:return "darken";case ee.lighten:return "lighten";case ee.colorDodge:return "color-dodge";case ee.colorBurn:return "color-burn";case ee.hardLight:return "hard-light";case ee.softLight:return "soft-light";case ee.difference:return "difference";case ee.exclusion:return "exclusion";case ee.multiply:return "multiply";case ee.hue:return "hue";case ee.saturation:return "saturation";case ee.color:return "color";case ee.luminosity:return "luminosity"}}function c(ue){return "rgba("+((16711680&ue)>>>16)+","+((65280&ue)>>>8)+","+((255&ue)>>>0)+","+((4278190080&ue)>>>24)/255+")"}function g(){0<rt.length&&(L.Nb(ke.drawWidth(),ke.drawHeight(),rt,It,Jt),rt=[],Jt=It=0,ke.reset(512,512));for(const ue of Ge){for(const Ce of ue.I)Ce();ue.I=[];}Ge.clear();}C&&C();var x=b.RenderPaintStyle;const _=b.RenderPath,D=b.RenderPaint,H=b.Renderer,K=b.StrokeCap,oe=b.StrokeJoin,ee=b.BlendMode,me=x.fill,Se=x.stroke,Ae=b.FillRule.evenOdd;let X=1;var be=b.RenderImage.extend("CanvasRenderImage",{__construct:function({la:ue,wa:Ce}={}){this.__parent.__construct.call(this),this.Ja=X,X=X+1&2147483647||1,this.la=ue,this.wa=Ce;},__destruct:function(){this.Ia&&(L.Kb(this.Ia),URL.revokeObjectURL(this.Wa)),this.__parent.__destruct.call(this);},decode:function(ue){var Ce=this;Ce.wa&&Ce.wa(Ce);var Ue=new Image;Ce.Wa=URL.createObjectURL(new Blob([ue],{type:"image/png"})),Ue.onload=function(){Ce.Db=Ue,Ce.Ia=L.Jb(Ue),Ce.size(Ue.width,Ue.height),Ce.la&&Ce.la(Ce);},Ue.src=Ce.Wa;}}),pe=_.extend("CanvasRenderPath",{__construct:function(){this.__parent.__construct.call(this),this.U=new Path2D;},rewind:function(){this.U=new Path2D;},addPath:function(ue,Ce,Ue,Be,Ze,We,ze){var nt=this.U,Tn=nt.addPath;ue=ue.U;const vt=new DOMMatrix;vt.a=Ce,vt.b=Ue,vt.c=Be,vt.d=Ze,vt.e=We,vt.f=ze,Tn.call(nt,ue,vt);},fillRule:function(ue){this.Va=ue;},moveTo:function(ue,Ce){this.U.moveTo(ue,Ce);},lineTo:function(ue,Ce){this.U.lineTo(ue,Ce);},cubicTo:function(ue,Ce,Ue,Be,Ze,We){this.U.bezierCurveTo(ue,Ce,Ue,Be,Ze,We);},close:function(){this.U.closePath();}}),De=D.extend("CanvasRenderPaint",{color:function(ue){this.Xa=c(ue);},thickness:function(ue){this.Gb=ue;},join:function(ue){switch(ue){case oe.miter:this.Ha="miter";break;case oe.round:this.Ha="round";break;case oe.bevel:this.Ha="bevel";}},cap:function(ue){switch(ue){case K.butt:this.Ga="butt";break;case K.round:this.Ga="round";break;case K.square:this.Ga="square";}},style:function(ue){this.Fb=ue;},blendMode:function(ue){this.Cb=s(ue);},clearGradient:function(){this.ja=null;},linearGradient:function(ue,Ce,Ue,Be){this.ja={xb:ue,yb:Ce,cb:Ue,eb:Be,Qa:[]};},radialGradient:function(ue,Ce,Ue,Be){this.ja={xb:ue,yb:Ce,cb:Ue,eb:Be,Qa:[],ac:true};},addStop:function(ue,Ce){this.ja.Qa.push({color:ue,stop:Ce});},completeGradient:function(){},draw:function(ue,Ce,Ue,Be){let Ze=this.Fb;var We=this.Xa,ze=this.ja;const nt=ue.globalCompositeOperation,Tn=ue.globalAlpha;if(ue.globalCompositeOperation=this.Cb,ue.globalAlpha=Be,ze!=null){We=ze.xb;const Zt=ze.yb,Ct=ze.cb;var vt=ze.eb;Be=ze.Qa,ze.ac?(ze=Ct-We,vt-=Zt,We=ue.createRadialGradient(We,Zt,0,We,Zt,Math.sqrt(ze*ze+vt*vt))):We=ue.createLinearGradient(We,Zt,Ct,vt);for(let Yr=0,ua=Be.length;Yr<ua;Yr++)ze=Be[Yr],We.addColorStop(ze.stop,c(ze.color));this.Xa=We,this.ja=null;}switch(Ze){case Se:ue.strokeStyle=We,ue.lineWidth=this.Gb,ue.lineCap=this.Ga,ue.lineJoin=this.Ha,ue.stroke(Ce);break;case me:ue.fillStyle=We,ue.fill(Ce,Ue);}ue.globalCompositeOperation=nt,ue.globalAlpha=Tn;}});const Ge=new Set;let ke=null,rt=[],It=0,Jt=0;var gr=b.CanvasRenderer=H.extend("Renderer",{__construct:function(ue){this.__parent.__construct.call(this),this.T=[1,0,0,1,0,0],this.G=[1],this.B=ue.getContext("2d"),this.Ua=ue,this.I=[];},save:function(){this.T.push(...this.T.slice(this.T.length-6)),this.G.push(this.G[this.G.length-1]),this.I.push(this.B.save.bind(this.B));},restore:function(){const ue=this.T.length-6;if(6>ue)throw "restore() called without matching save().";this.T.splice(ue),this.G.pop(),this.I.push(this.B.restore.bind(this.B));},transform:function(ue,Ce,Ue,Be,Ze,We){const ze=this.T,nt=ze.length-6;ze.splice(nt,6,ze[nt]*ue+ze[nt+2]*Ce,ze[nt+1]*ue+ze[nt+3]*Ce,ze[nt]*Ue+ze[nt+2]*Be,ze[nt+1]*Ue+ze[nt+3]*Be,ze[nt]*Ze+ze[nt+2]*We+ze[nt+4],ze[nt+1]*Ze+ze[nt+3]*We+ze[nt+5]),this.I.push(this.B.transform.bind(this.B,ue,Ce,Ue,Be,Ze,We));},rotate:function(ue){const Ce=Math.sin(ue);ue=Math.cos(ue),this.transform(ue,Ce,-Ce,ue,0,0);},modulateOpacity:function(ue){this.G[this.G.length-1]*=ue;},_drawPath:function(ue,Ce){this.I.push(Ce.draw.bind(Ce,this.B,ue.U,ue.Va===Ae?"evenodd":"nonzero",Math.max(0,this.G[this.G.length-1])));},_drawRiveImage:function(ue,Ce,Ue,Be){var Ze=ue.Db;if(Ze){var We=this.B,ze=s(Ue),nt=Math.max(0,Be*this.G[this.G.length-1]);this.I.push(function(){We.globalCompositeOperation=ze,We.globalAlpha=nt,We.drawImage(Ze,0,0),We.globalAlpha=1;});}},_getMatrix:function(ue){const Ce=this.T,Ue=Ce.length-6;for(let Be=0;6>Be;++Be)ue[Be]=Ce[Ue+Be];},_drawImageMesh:function(ue,Ce,Ue,Be,Ze,We,ze,nt,Tn,vt,Zt){Ce=this.B.canvas.width;var Ct=this.B.canvas.height;const Yr=vt-nt,ua=Zt-Tn;nt=Math.max(nt,0),Tn=Math.max(Tn,0),vt=Math.min(vt,Ce),Zt=Math.min(Zt,Ct);const Vo=vt-nt,Ko=Zt-Tn;if(console.assert(Vo<=Math.min(Yr,Ce)),console.assert(Ko<=Math.min(ua,Ct)),!(0>=Vo||0>=Ko)){vt=Vo<Yr||Ko<ua,Ce=Zt=1;var br=Math.ceil(Vo*Zt),vr=Math.ceil(Ko*Ce);Ct=L.bc(),br>Ct&&(Zt*=Ct/br,br=Ct),vr>Ct&&(Ce*=Ct/vr,vr=Ct),ke||(ke=new b.DynamicRectanizer(Ct),ke.reset(512,512)),Ct=ke.addRect(br,vr),0>Ct&&(g(),Ge.add(this),Ct=ke.addRect(br,vr),console.assert(0<=Ct));var dp=Ct&65535,up=Ct>>16;rt.push({ha:this.T.slice(this.T.length-6),image:ue,Za:dp,$a:up,cc:nt,dc:Tn,uc:br,jb:vr,Aa:Zt,Ba:Ce,Ta:new Float32Array(Ze),Bb:new Float32Array(We),indices:new Uint16Array(ze),hc:vt,vb:ue.Ja<<1|(vt?1:0)}),It+=Ze.length,Jt+=ze.length;var qr=this.B,$v=s(Ue),Bv=Math.max(0,Be*this.G[this.G.length-1]);this.I.push(function(){qr.save(),qr.resetTransform(),qr.globalCompositeOperation=$v,qr.globalAlpha=Bv;const pp=L.canvas();pp&&qr.drawImage(pp,dp,up,br,vr,nt,Tn,Vo,Ko),qr.restore();});}},_clipPath:function(ue){this.I.push(this.B.clip.bind(this.B,ue.U,ue.Va===Ae?"evenodd":"nonzero"));},clear:function(){Ge.add(this),this.I.push(this.B.clearRect.bind(this.B,0,0,this.Ua.width,this.Ua.height));},flush:function(){},translate:function(ue,Ce){this.transform(1,0,0,1,ue,Ce);}});b.makeRenderer=function(ue){const Ce=new gr(ue),Ue=Ce.B;return new Proxy(Ce,{get(Be,Ze){if(typeof Be[Ze]=="function")return function(...We){return Be[Ze].apply(Be,We)};if(typeof Ue[Ze]=="function"){if(-1<F.indexOf(Ze))throw Error("RiveException: Method call to '"+Ze+"()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.");return function(...We){Ce.I.push(Ue[Ze].bind(Ue,...We));}}return Be[Ze]},set(Be,Ze,We){if(Ze in Ue)return Ce.I.push(()=>{Ue[Ze]=We;}),true}})},b.decodeImage=function(ue,Ce){new be({la:Ce}).decode(ue);},b.renderFactory={makeRenderPaint:function(){return new De},makeRenderPath:function(){return new pe},makeRenderImage:function(){let ue=In;return new be({wa:()=>{ue.total++;},la:()=>{if(ue.loaded++,ue.loaded===ue.total){const Ce=ue.ready;Ce&&(Ce(),ue.ready=null);}}})}};let Ye=b.load,In=null;b.load=function(ue,Ce,Ue=true){const Be=new b.FallbackFileAssetLoader;return Ce!==void 0&&Be.addLoader(Ce),Ue&&(Ce=new b.CDNFileAssetLoader,Be.addLoader(Ce)),new Promise(function(Ze){let We=null;In={total:0,loaded:0,ready:function(){Ze(We);}},We=Ye(ue,Be),In.total==0&&Ze(We);})};let Dv=b.RendererWrapper.prototype.align;b.RendererWrapper.prototype.align=function(ue,Ce,Ue,Be,Ze=1){Dv.call(this,ue,Ce,Ue,Be,Ze);},x=new z,b.requestAnimationFrame=x.requestAnimationFrame.bind(x),b.cancelAnimationFrame=x.cancelAnimationFrame.bind(x),b.enableFPSCounter=x.Ob.bind(x),b.disableFPSCounter=x.Lb,x.ob=g,b.resolveAnimationFrame=g,b.cleanup=function(){ke&&ke.delete();};};var E=Object.assign({},b),B="./this.program",j="",V,U;(T||N)&&(N?j=self.location.href:typeof document<"u"&&document.currentScript&&(j=document.currentScript.src),m&&(j=m),j.startsWith("blob:")?j="":j=j.substr(0,j.replace(/[?#].*/,"").lastIndexOf("/")+1),N&&(U=s=>{var c=new XMLHttpRequest;return c.open("GET",s,false),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),V=(s,c,g)=>{if(Ht(s)){var x=new XMLHttpRequest;x.open("GET",s,true),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?c(x.response):g();},x.onerror=g,x.send(null);}else fetch(s,{credentials:"same-origin"}).then(_=>_.ok?_.arrayBuffer():Promise.reject(Error(_.status+" : "+_.url))).then(c,g);});var ce=b.print||console.log.bind(console),Y=b.printErr||console.error.bind(console);Object.assign(b,E),E=null,b.thisProgram&&(B=b.thisProgram);var ie;b.wasmBinary&&(ie=b.wasmBinary);var se,ae=false,ne,q,Z,R,$,Q,re,le;function ve(){var s=se.buffer;b.HEAP8=ne=new Int8Array(s),b.HEAP16=Z=new Int16Array(s),b.HEAPU8=q=new Uint8Array(s),b.HEAPU16=R=new Uint16Array(s),b.HEAP32=$=new Int32Array(s),b.HEAPU32=Q=new Uint32Array(s),b.HEAPF32=re=new Float32Array(s),b.HEAPF64=le=new Float64Array(s);}var _e=[],$e=[],bt=[];function Bt(){var s=b.preRun.shift();_e.unshift(s);}var ct=0,Et=null;function Wt(s){throw b.onAbort?.(s),s="Aborted("+s+")",Y(s),ae=true,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),P(s),s}var Lt=s=>s.startsWith("data:application/octet-stream;base64,"),Ht=s=>s.startsWith("file://"),tt;function Ne(s){if(s==tt&&ie)return new Uint8Array(ie);if(U)return U(s);throw "both async and sync fetching of the wasm failed"}function mn(s){return ie?Promise.resolve().then(()=>Ne(s)):new Promise((c,g)=>{V(s,x=>c(new Uint8Array(x)),()=>{try{c(Ne(s));}catch(x){g(x);}});})}function gn(s,c,g){return mn(s).then(x=>WebAssembly.instantiate(x,c)).then(g,x=>{Y(`failed to asynchronously prepare wasm: ${x}`),Wt(x);})}function ut(s,c){var g=tt;return ie||typeof WebAssembly.instantiateStreaming!="function"||Lt(g)||Ht(g)||typeof fetch!="function"?gn(g,s,c):fetch(g,{credentials:"same-origin"}).then(x=>WebAssembly.instantiateStreaming(x,s).then(c,function(_){return Y(`wasm streaming compile failed: ${_}`),Y("falling back to ArrayBuffer instantiation"),gn(g,s,c)}))}var wt,Vt,Sn={490930:(s,c,g,x,_)=>{if(typeof window>"u"||(window.AudioContext||window.webkitAudioContext)===void 0)return 0;if(typeof window.h>"u"){window.h={za:0},window.h.J={},window.h.J.xa=s,window.h.J.capture=c,window.h.J.Ka=g,window.h.ga={},window.h.ga.stopped=x,window.h.ga.wb=_;let D=window.h;D.D=[],D.sc=function(H){for(var K=0;K<D.D.length;++K)if(D.D[K]==null)return D.D[K]=H,K;return D.D.push(H),D.D.length-1},D.Ab=function(H){for(D.D[H]=null;0<D.D.length&&D.D[D.D.length-1]==null;)D.D.pop();},D.Pc=function(H){for(var K=0;K<D.D.length;++K)if(D.D[K]==H)return D.Ab(K)},D.qa=function(H){return D.D[H]},D.Sa=["touchend","click"],D.unlock=function(){for(var H=0;H<D.D.length;++H){var K=D.D[H];K!=null&&K.L!=null&&K.state===D.ga.wb&&K.L.resume().then(()=>{rp(K.pb);},oe=>{console.error("Failed to resume audiocontext",oe);});}D.Sa.map(function(oe){document.removeEventListener(oe,D.unlock,true);});},D.Sa.map(function(H){document.addEventListener(H,D.unlock,true);});}return window.h.za+=1,1},493108:()=>{typeof window.h<"u"&&(window.h.Sa.map(function(s){document.removeEventListener(s,window.h.unlock,true);}),--window.h.za,window.h.za===0&&delete window.h);},493412:()=>navigator.mediaDevices!==void 0&&navigator.mediaDevices.getUserMedia!==void 0,493516:()=>{try{var s=new(window.AudioContext||window.webkitAudioContext),c=s.sampleRate;return s.close(),c}catch{return 0}},493687:(s,c,g,x,_,D)=>{if(typeof window.h>"u")return  -1;var H={},K={};return s==window.h.J.xa&&g!=0&&(K.sampleRate=g),H.L=new(window.AudioContext||window.webkitAudioContext)(K),H.L.suspend(),H.state=window.h.ga.stopped,g=0,s!=window.h.J.xa&&(g=c),H.Z=H.L.createScriptProcessor(x,g,c),H.Z.onaudioprocess=function(oe){if((H.ra==null||H.ra.length==0)&&(H.ra=new Float32Array(re.buffer,_,x*c)),s==window.h.J.capture||s==window.h.J.Ka){for(var ee=0;ee<c;ee+=1)for(var me=oe.inputBuffer.getChannelData(ee),Se=H.ra,Ae=0;Ae<x;Ae+=1)Se[Ae*c+ee]=me[Ae];op(D,x,_);}if(s==window.h.J.xa||s==window.h.J.Ka)for(ip(D,x,_),ee=0;ee<oe.outputBuffer.numberOfChannels;++ee)for(me=oe.outputBuffer.getChannelData(ee),Se=H.ra,Ae=0;Ae<x;Ae+=1)me[Ae]=Se[Ae*c+ee];else for(ee=0;ee<oe.outputBuffer.numberOfChannels;++ee)oe.outputBuffer.getChannelData(ee).fill(0);},s!=window.h.J.capture&&s!=window.h.J.Ka||navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(function(oe){H.Ca=H.L.createMediaStreamSource(oe),H.Ca.connect(H.Z),H.Z.connect(H.L.destination);}).catch(function(oe){console.log("Failed to get user media: "+oe);}),s==window.h.J.xa&&H.Z.connect(H.L.destination),H.pb=D,window.h.sc(H)},496564:s=>window.h.qa(s).L.sampleRate,496637:s=>{s=window.h.qa(s),s.Z!==void 0&&(s.Z.onaudioprocess=function(){},s.Z.disconnect(),s.Z=void 0),s.Ca!==void 0&&(s.Ca.disconnect(),s.Ca=void 0),s.L.close(),s.L=void 0,s.pb=void 0;},497037:s=>{window.h.Ab(s);},497087:s=>{s=window.h.qa(s),s.L.resume(),s.state=window.h.ga.wb;},497226:s=>{s=window.h.qa(s),s.L.suspend(),s.state=window.h.ga.stopped;}},tn=s=>{for(;0<s.length;)s.shift()(b);};function k(){var s=$[+$o>>2];return $o+=4,s}var d=(s,c)=>{for(var g=0,x=s.length-1;0<=x;x--){var _=s[x];_==="."?s.splice(x,1):_===".."?(s.splice(x,1),g++):g&&(s.splice(x,1),g--);}if(c)for(;g;g--)s.unshift("..");return s},h=s=>{var c=s.charAt(0)==="/",g=s.substr(-1)==="/";return (s=d(s.split("/").filter(x=>!!x),!c).join("/"))||c||(s="."),s&&g&&(s+="/"),(c?"/":"")+s},S=s=>{var c=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(s).slice(1);return s=c[0],c=c[1],!s&&!c?".":(c&&(c=c.substr(0,c.length-1)),s+c)},G=s=>{if(s==="/")return "/";s=h(s),s=s.replace(/\/$/,"");var c=s.lastIndexOf("/");return c===-1?s:s.substr(c+1)},W=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return s=>crypto.getRandomValues(s);Wt("initRandomDevice");},J=s=>(J=W())(s),de=(...s)=>{for(var c="",g=false,x=s.length-1;-1<=x&&!g;x--){if(g=0<=x?s[x]:"/",typeof g!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!g)return "";c=g+"/"+c,g=g.charAt(0)==="/";}return c=d(c.split("/").filter(_=>!!_),!g).join("/"),(g?"/":"")+c||"."},ye=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,ge=(s,c,g)=>{var x=c+g;for(g=c;s[g]&&!(g>=x);)++g;if(16<g-c&&s.buffer&&ye)return ye.decode(s.subarray(c,g));for(x="";c<g;){var _=s[c++];if(_&128){var D=s[c++]&63;if((_&224)==192)x+=String.fromCharCode((_&31)<<6|D);else {var H=s[c++]&63;_=(_&240)==224?(_&15)<<12|D<<6|H:(_&7)<<18|D<<12|H<<6|s[c++]&63,65536>_?x+=String.fromCharCode(_):(_-=65536,x+=String.fromCharCode(55296|_>>10,56320|_&1023));}}else x+=String.fromCharCode(_);}return x},we=[],Je=s=>{for(var c=0,g=0;g<s.length;++g){var x=s.charCodeAt(g);127>=x?c++:2047>=x?c+=2:55296<=x&&57343>=x?(c+=4,++g):c+=3;}return c},it=(s,c,g,x)=>{if(!(0<x))return 0;var _=g;x=g+x-1;for(var D=0;D<s.length;++D){var H=s.charCodeAt(D);if(55296<=H&&57343>=H){var K=s.charCodeAt(++D);H=65536+((H&1023)<<10)|K&1023;}if(127>=H){if(g>=x)break;c[g++]=H;}else {if(2047>=H){if(g+1>=x)break;c[g++]=192|H>>6;}else {if(65535>=H){if(g+2>=x)break;c[g++]=224|H>>12;}else {if(g+3>=x)break;c[g++]=240|H>>18,c[g++]=128|H>>12&63;}c[g++]=128|H>>6&63;}c[g++]=128|H&63;}}return c[g]=0,g-_};function Ve(s,c){var g=Array(Je(s)+1);return s=it(s,g,0,g.length),c&&(g.length=s),g}var _t=[];function mt(s,c){_t[s]={input:[],H:[],W:c},ml(s,qt);}var qt={open(s){var c=_t[s.node.ya];if(!c)throw new Ee(43);s.s=c,s.seekable=false;},close(s){s.s.W.pa(s.s);},pa(s){s.s.W.pa(s.s);},read(s,c,g,x){if(!s.s||!s.s.W.ib)throw new Ee(60);for(var _=0,D=0;D<x;D++){try{var H=s.s.W.ib(s.s);}catch{throw new Ee(29)}if(H===void 0&&_===0)throw new Ee(6);if(H==null)break;_++,c[g+D]=H;}return _&&(s.node.timestamp=Date.now()),_},write(s,c,g,x){if(!s.s||!s.s.W.Na)throw new Ee(60);try{for(var _=0;_<x;_++)s.s.W.Na(s.s,c[g+_]);}catch{throw new Ee(29)}return x&&(s.node.timestamp=Date.now()),_}},Xt={ib(){e:{if(!we.length){var s=null;if(typeof window<"u"&&typeof window.prompt=="function"&&(s=window.prompt("Input: "),s!==null&&(s+=`
`)),!s){s=null;break e}we=Ve(s,true);}s=we.shift();}return s},Na(s,c){c===null||c===10?(ce(ge(s.H,0)),s.H=[]):c!=0&&s.H.push(c);},pa(s){s.H&&0<s.H.length&&(ce(ge(s.H,0)),s.H=[]);},Yb(){return {Ac:25856,Cc:5,zc:191,Bc:35387,yc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Zb(){return 0},$b(){return [24,80]}},nn={Na(s,c){c===null||c===10?(Y(ge(s.H,0)),s.H=[]):c!=0&&s.H.push(c);},pa(s){s.H&&0<s.H.length&&(Y(ge(s.H,0)),s.H=[]);}};function Bn(s,c){var g=s.l?s.l.length:0;g>=c||(c=Math.max(c,g*(1048576>g?2:1.125)>>>0),g!=0&&(c=Math.max(c,256)),g=s.l,s.l=new Uint8Array(c),0<s.v&&s.l.set(g.subarray(0,s.v),0));}var Fe={O:null,V(){return Fe.createNode(null,"/",16895,0)},createNode(s,c,g,x){if((g&61440)===24576||(g&61440)===4096)throw new Ee(63);return Fe.O||(Fe.O={dir:{node:{Y:Fe.j.Y,R:Fe.j.R,ka:Fe.j.ka,ua:Fe.j.ua,tb:Fe.j.tb,zb:Fe.j.zb,ub:Fe.j.ub,sb:Fe.j.sb,Da:Fe.j.Da},stream:{ba:Fe.m.ba}},file:{node:{Y:Fe.j.Y,R:Fe.j.R},stream:{ba:Fe.m.ba,read:Fe.m.read,write:Fe.m.write,Ya:Fe.m.Ya,lb:Fe.m.lb,nb:Fe.m.nb}},link:{node:{Y:Fe.j.Y,R:Fe.j.R,ma:Fe.j.ma},stream:{}},ab:{node:{Y:Fe.j.Y,R:Fe.j.R},stream:lv}}),g=Pu(s,c,g,x),(g.mode&61440)===16384?(g.j=Fe.O.dir.node,g.m=Fe.O.dir.stream,g.l={}):(g.mode&61440)===32768?(g.j=Fe.O.file.node,g.m=Fe.O.file.stream,g.v=0,g.l=null):(g.mode&61440)===40960?(g.j=Fe.O.link.node,g.m=Fe.O.link.stream):(g.mode&61440)===8192&&(g.j=Fe.O.ab.node,g.m=Fe.O.ab.stream),g.timestamp=Date.now(),s&&(s.l[c]=g,s.timestamp=g.timestamp),g},Gc(s){return s.l?s.l.subarray?s.l.subarray(0,s.v):new Uint8Array(s.l):new Uint8Array(0)},j:{Y(s){var c={};return c.Ec=(s.mode&61440)===8192?s.id:1,c.Ic=s.id,c.mode=s.mode,c.Lc=1,c.uid=0,c.Hc=0,c.ya=s.ya,(s.mode&61440)===16384?c.size=4096:(s.mode&61440)===32768?c.size=s.v:(s.mode&61440)===40960?c.size=s.link.length:c.size=0,c.wc=new Date(s.timestamp),c.Kc=new Date(s.timestamp),c.Dc=new Date(s.timestamp),c.Hb=4096,c.xc=Math.ceil(c.size/c.Hb),c},R(s,c){if(c.mode!==void 0&&(s.mode=c.mode),c.timestamp!==void 0&&(s.timestamp=c.timestamp),c.size!==void 0&&(c=c.size,s.v!=c))if(c==0)s.l=null,s.v=0;else {var g=s.l;s.l=new Uint8Array(c),g&&s.l.set(g.subarray(0,Math.min(c,s.v))),s.v=c;}},ka(){throw hl[44]},ua(s,c,g,x){return Fe.createNode(s,c,g,x)},tb(s,c,g){if((s.mode&61440)===16384){try{var x=qi(c,g);}catch{}if(x)for(var _ in x.l)throw new Ee(55)}delete s.parent.l[s.name],s.parent.timestamp=Date.now(),s.name=g,c.l[g]=s,c.timestamp=s.parent.timestamp;},zb(s,c){delete s.l[c],s.timestamp=Date.now();},ub(s,c){var g=qi(s,c),x;for(x in g.l)throw new Ee(55);delete s.l[c],s.timestamp=Date.now();},sb(s){var c=[".",".."],g;for(g of Object.keys(s.l))c.push(g);return c},Da(s,c,g){return s=Fe.createNode(s,c,41471,0),s.link=g,s},ma(s){if((s.mode&61440)!==40960)throw new Ee(28);return s.link}},m:{read(s,c,g,x,_){var D=s.node.l;if(_>=s.node.v)return 0;if(s=Math.min(s.node.v-_,x),8<s&&D.subarray)c.set(D.subarray(_,_+s),g);else for(x=0;x<s;x++)c[g+x]=D[_+x];return s},write(s,c,g,x,_,D){if(c.buffer===ne.buffer&&(D=false),!x)return 0;if(s=s.node,s.timestamp=Date.now(),c.subarray&&(!s.l||s.l.subarray)){if(D)return s.l=c.subarray(g,g+x),s.v=x;if(s.v===0&&_===0)return s.l=c.slice(g,g+x),s.v=x;if(_+x<=s.v)return s.l.set(c.subarray(g,g+x),_),x}if(Bn(s,_+x),s.l.subarray&&c.subarray)s.l.set(c.subarray(g,g+x),_);else for(D=0;D<x;D++)s.l[_+D]=c[g+D];return s.v=Math.max(s.v,_+x),x},ba(s,c,g){if(g===1?c+=s.position:g===2&&(s.node.mode&61440)===32768&&(c+=s.node.v),0>c)throw new Ee(28);return c},Ya(s,c,g){Bn(s.node,c+g),s.node.v=Math.max(s.node.v,c+g);},lb(s,c,g,x,_){if((s.node.mode&61440)!==32768)throw new Ee(43);if(s=s.node.l,_&2||s.buffer!==ne.buffer){if((0<g||g+c<s.length)&&(s.subarray?s=s.subarray(g,g+c):s=Array.prototype.slice.call(s,g,g+c)),g=true,Wt(),c=void 0,!c)throw new Ee(48);ne.set(s,c);}else g=false,c=s.byteOffset;return {o:c,vc:g}},nb(s,c,g,x){return Fe.m.write(s,c,0,x,g,false),0}}},zn=(s,c)=>{var g=0;return s&&(g|=365),c&&(g|=146),g},rn=null,Ke={},on=[],ov=1,No=null,_u=true,Ee=class{constructor(s){this.name="ErrnoError",this.aa=s;}},hl={},iv=class{constructor(){this.h={},this.node=null;}get flags(){return this.h.flags}set flags(s){this.h.flags=s;}get position(){return this.h.position}set position(s){this.h.position=s;}},av=class{constructor(s,c,g,x){s||(s=this),this.parent=s,this.V=s.V,this.va=null,this.id=ov++,this.name=c,this.mode=g,this.j={},this.m={},this.ya=x;}get read(){return (this.mode&365)===365}set read(s){s?this.mode|=365:this.mode&=-366;}get write(){return (this.mode&146)===146}set write(s){s?this.mode|=146:this.mode&=-147;}};function fr(s,c={}){if(s=de(s),!s)return {path:"",node:null};if(c=Object.assign({hb:true,Pa:0},c),8<c.Pa)throw new Ee(32);s=s.split("/").filter(H=>!!H);for(var g=rn,x="/",_=0;_<s.length;_++){var D=_===s.length-1;if(D&&c.parent)break;if(g=qi(g,s[_]),x=h(x+"/"+s[_]),g.va&&(!D||D&&c.hb)&&(g=g.va.root),!D||c.gb){for(D=0;(g.mode&61440)===40960;)if(g=cv(x),x=de(S(x),g),g=fr(x,{Pa:c.Pa+1}).node,40<D++)throw new Ee(32)}}return {path:x,node:g}}function Iu(s){for(var c;;){if(s===s.parent)return s=s.V.mb,c?s[s.length-1]!=="/"?`${s}/${c}`:s+c:s;c=c?`${s.name}/${c}`:s.name,s=s.parent;}}function Tu(s,c){for(var g=0,x=0;x<c.length;x++)g=(g<<5)-g+c.charCodeAt(x)|0;return (s+g>>>0)%No.length}function qi(s,c){var g=(s.mode&61440)===16384?(g=Xi(s,"x"))?g:s.j.ka?0:2:54;if(g)throw new Ee(g);for(g=No[Tu(s.id,c)];g;g=g.fc){var x=g.name;if(g.parent.id===s.id&&x===c)return g}return s.j.ka(s,c)}function Pu(s,c,g,x){return s=new av(s,c,g,x),c=Tu(s.parent.id,s.name),s.fc=No[c],No[c]=s}function Lu(s){var c=["r","w","rw"][s&3];return s&512&&(c+="w"),c}function Xi(s,c){if(_u)return 0;if(!c.includes("r")||s.mode&292){if(c.includes("w")&&!(s.mode&146)||c.includes("x")&&!(s.mode&73))return 2}else return 2;return 0}function Mu(s,c){try{return qi(s,c),20}catch{}return Xi(s,"wx")}function nr(s){if(s=on[s],!s)throw new Ee(8);return s}function Ru(s,c=-1){if(s=Object.assign(new iv,s),c==-1)e:{for(c=0;4096>=c;c++)if(!on[c])break e;throw new Ee(33)}return s.X=c,on[c]=s}function sv(s,c=-1){return s=Ru(s,c),s.m?.Fc?.(s),s}var lv={open(s){s.m=Ke[s.node.ya].m,s.m.open?.(s);},ba(){throw new Ee(70)}};function ml(s,c){Ke[s]={m:c};}function Fu(s,c){var g=c==="/";if(g&&rn)throw new Ee(10);if(!g&&c){var x=fr(c,{hb:false});if(c=x.path,x=x.node,x.va)throw new Ee(10);if((x.mode&61440)!==16384)throw new Ee(54)}c={type:s,Nc:{},mb:c,ec:[]},s=s.V(c),s.V=c,c.root=s,g?rn=s:x&&(x.va=c,x.V&&x.V.ec.push(c));}function gl(s,c,g){var x=fr(s,{parent:true}).node;if(s=G(s),!s||s==="."||s==="..")throw new Ee(28);var _=Mu(x,s);if(_)throw new Ee(_);if(!x.j.ua)throw new Ee(63);return x.j.ua(x,s,c,g)}function jn(s){return gl(s,16895,0)}function Qi(s,c,g){typeof g>"u"&&(g=c,c=438),gl(s,c|8192,g);}function bl(s,c){if(!de(s))throw new Ee(44);var g=fr(c,{parent:true}).node;if(!g)throw new Ee(44);c=G(c);var x=Mu(g,c);if(x)throw new Ee(x);if(!g.j.Da)throw new Ee(63);g.j.Da(g,c,s);}function cv(s){if(s=fr(s).node,!s)throw new Ee(44);if(!s.j.ma)throw new Ee(28);return de(Iu(s.parent),s.j.ma(s))}function Ji(s,c,g){if(s==="")throw new Ee(44);if(typeof c=="string"){var x={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[c];if(typeof x>"u")throw Error(`Unknown file open mode: ${c}`);c=x;}if(g=c&64?(typeof g>"u"?438:g)&4095|32768:0,typeof s=="object")var _=s;else {s=h(s);try{_=fr(s,{gb:!(c&131072)}).node;}catch{}}if(x=false,c&64)if(_){if(c&128)throw new Ee(20)}else _=gl(s,g,0),x=true;if(!_)throw new Ee(44);if((_.mode&61440)===8192&&(c&=-513),c&65536&&(_.mode&61440)!==16384)throw new Ee(54);if(!x&&(g=_?(_.mode&61440)===40960?32:(_.mode&61440)===16384&&(Lu(c)!=="r"||c&512)?31:Xi(_,Lu(c)):44))throw new Ee(g);if(c&512&&!x){if(g=_,g=typeof g=="string"?fr(g,{gb:true}).node:g,!g.j.R)throw new Ee(63);if((g.mode&61440)===16384)throw new Ee(31);if((g.mode&61440)!==32768)throw new Ee(28);if(x=Xi(g,"w"))throw new Ee(x);g.j.R(g,{size:0,timestamp:Date.now()});}return c&=-131713,_=Ru({node:_,path:Iu(_),flags:c,seekable:true,position:0,m:_.m,tc:[],error:false}),_.m.open&&_.m.open(_),!b.logReadFiles||c&1||(vl||(vl={}),s in vl||(vl[s]=1)),_}function Ou(s,c,g){if(s.X===null)throw new Ee(8);if(!s.seekable||!s.m.ba)throw new Ee(70);if(g!=0&&g!=1&&g!=2)throw new Ee(28);s.position=s.m.ba(s,c,g),s.tc=[];}var Nu;function Do(s,c,g){s=h("/dev/"+s);var x=zn(!!c,!!g);Du||(Du=64);var _=Du++<<8|0;ml(_,{open(D){D.seekable=false;},close(){g?.buffer?.length&&g(10);},read(D,H,K,oe){for(var ee=0,me=0;me<oe;me++){try{var Se=c();}catch{throw new Ee(29)}if(Se===void 0&&ee===0)throw new Ee(6);if(Se==null)break;ee++,H[K+me]=Se;}return ee&&(D.node.timestamp=Date.now()),ee},write(D,H,K,oe){for(var ee=0;ee<oe;ee++)try{g(H[K+ee]);}catch{throw new Ee(29)}return oe&&(D.node.timestamp=Date.now()),ee}}),Qi(s,x,_);}var Du,hr={},vl,$o=void 0,Hr=(s,c)=>Object.defineProperty(c,"name",{value:s}),yl=[],Gn=[],Me,An=s=>{if(!s)throw new Me("Cannot use deleted val. handle = "+s);return Gn[s]},En=s=>{switch(s){case void 0:return 2;case null:return 4;case  true:return 6;case  false:return 8;default:const c=yl.pop()||Gn.length;return Gn[c]=s,Gn[c+1]=1,c}},$u=s=>{var c=Error,g=Hr(s,function(x){this.name=s,this.message=x,x=Error(x).stack,x!==void 0&&(this.stack=this.toString()+`
`+x.replace(/^Error(:[^\n]*)?\n/,""));});return g.prototype=Object.create(c.prototype),g.prototype.constructor=g,g.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},g},Bu,zu,gt=s=>{for(var c="";q[s];)c+=zu[q[s++]];return c},Bo=[],xl=()=>{for(;Bo.length;){var s=Bo.pop();s.g.fa=false,s.delete();}},zo,Un={},wl=(s,c)=>{if(c===void 0)throw new Me("ptr should not be undefined");for(;s.C;)c=s.na(c),s=s.C;return c},mr={},ju=s=>{s=np(s);var c=gt(s);return Hn(s),c},jo=(s,c)=>{var g=mr[s];if(g===void 0)throw s=`${c} has unknown type ${ju(s)}`,new Me(s);return g},Zi=()=>{},Cl=false,Gu=(s,c,g)=>c===g?s:g.C===void 0?null:(s=Gu(s,c,g.C),s===null?null:g.Mb(s)),Uu={},dv=(s,c)=>(c=wl(s,c),Un[c]),Go,ea=(s,c)=>{if(!c.u||!c.o)throw new Go("makeClassHandle requires ptr and ptrType");if(!!c.K!=!!c.F)throw new Go("Both smartPtrType and smartPtr must be specified");return c.count={value:1},Vr(Object.create(s,{g:{value:c,writable:true}}))},Vr=s=>typeof FinalizationRegistry>"u"?(Vr=c=>c,s):(Cl=new FinalizationRegistry(c=>{c=c.g,--c.count.value,c.count.value===0&&(c.F?c.K.P(c.F):c.u.i.P(c.o));}),Vr=c=>{var g=c.g;return g.F&&Cl.register(c,{g},c),c},Zi=c=>{Cl.unregister(c);},Vr(s)),ta={},Uo=s=>{for(;s.length;){var c=s.pop();s.pop()(c);}};function Wo(s){return this.fromWireType(Q[s>>2])}var Kr={},na={},Qt=(s,c,g)=>{function x(K){if(K=g(K),K.length!==s.length)throw new Go("Mismatched type converter count");for(var oe=0;oe<s.length;++oe)_n(s[oe],K[oe]);}s.forEach(function(K){na[K]=c;});var _=Array(c.length),D=[],H=0;c.forEach((K,oe)=>{mr.hasOwnProperty(K)?_[oe]=mr[K]:(D.push(K),Kr.hasOwnProperty(K)||(Kr[K]=[]),Kr[K].push(()=>{_[oe]=mr[K],++H,H===D.length&&x(_);}));}),D.length===0&&x(_);};function uv(s,c,g={}){var x=c.name;if(!s)throw new Me(`type "${x}" must have a positive integer typeid pointer`);if(mr.hasOwnProperty(s)){if(g.Wb)return;throw new Me(`Cannot register type '${x}' twice`)}mr[s]=c,delete na[s],Kr.hasOwnProperty(s)&&(c=Kr[s],delete Kr[s],c.forEach(_=>_()));}function _n(s,c,g={}){if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");return uv(s,c,g)}var kl=s=>{throw new Me(s.g.u.i.name+" instance already deleted")};function ra(){}var Sl=(s,c,g)=>{if(s[c].A===void 0){var x=s[c];s[c]=function(..._){if(!s[c].A.hasOwnProperty(_.length))throw new Me(`Function '${g}' called with an invalid number of arguments (${_.length}) - expects one of (${s[c].A})!`);return s[c].A[_.length].apply(this,_)},s[c].A=[],s[c].A[x.ea]=x;}},Al=(s,c,g)=>{if(b.hasOwnProperty(s)){if(g===void 0||b[s].A!==void 0&&b[s].A[g]!==void 0)throw new Me(`Cannot register public name '${s}' twice`);if(Sl(b,s,s),b.hasOwnProperty(g))throw new Me(`Cannot register multiple overloads of a function with the same number of arguments (${g})!`);b[s].A[g]=c;}else b[s]=c,g!==void 0&&(b[s].Mc=g);},pv=s=>{if(s===void 0)return "_unknown";s=s.replace(/[^a-zA-Z0-9_]/g,"$");var c=s.charCodeAt(0);return 48<=c&&57>=c?`_${s}`:s};function fv(s,c,g,x,_,D,H,K){this.name=s,this.constructor=c,this.N=g,this.P=x,this.C=_,this.Rb=D,this.na=H,this.Mb=K,this.qb=[];}var oa=(s,c,g)=>{for(;c!==g;){if(!c.na)throw new Me(`Expected null or instance of ${g.name}, got an instance of ${c.name}`);s=c.na(s),c=c.C;}return s};function hv(s,c){if(c===null){if(this.Ma)throw new Me(`null is not a valid ${this.name}`);return 0}if(!c.g)throw new Me(`Cannot pass "${Tl(c)}" as a ${this.name}`);if(!c.g.o)throw new Me(`Cannot pass deleted object as a pointer of type ${this.name}`);return oa(c.g.o,c.g.u.i,this.i)}function mv(s,c){if(c===null){if(this.Ma)throw new Me(`null is not a valid ${this.name}`);if(this.ta){var g=this.Oa();return s!==null&&s.push(this.P,g),g}return 0}if(!c||!c.g)throw new Me(`Cannot pass "${Tl(c)}" as a ${this.name}`);if(!c.g.o)throw new Me(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.sa&&c.g.u.sa)throw new Me(`Cannot convert argument of type ${c.g.K?c.g.K.name:c.g.u.name} to parameter type ${this.name}`);if(g=oa(c.g.o,c.g.u.i,this.i),this.ta){if(c.g.F===void 0)throw new Me("Passing raw pointer to smart pointer is illegal");switch(this.nc){case 0:if(c.g.K===this)g=c.g.F;else throw new Me(`Cannot convert argument of type ${c.g.K?c.g.K.name:c.g.u.name} to parameter type ${this.name}`);break;case 1:g=c.g.F;break;case 2:if(c.g.K===this)g=c.g.F;else {var x=c.clone();g=this.jc(g,En(()=>x.delete())),s!==null&&s.push(this.P,g);}break;default:throw new Me("Unsupporting sharing policy")}}return g}function gv(s,c){if(c===null){if(this.Ma)throw new Me(`null is not a valid ${this.name}`);return 0}if(!c.g)throw new Me(`Cannot pass "${Tl(c)}" as a ${this.name}`);if(!c.g.o)throw new Me(`Cannot pass deleted object as a pointer of type ${this.name}`);if(c.g.u.sa)throw new Me(`Cannot convert argument of type ${c.g.u.name} to parameter type ${this.name}`);return oa(c.g.o,c.g.u.i,this.i)}function ia(s,c,g,x,_,D,H,K,oe,ee,me){this.name=s,this.i=c,this.Ma=g,this.sa=x,this.ta=_,this.ic=D,this.nc=H,this.rb=K,this.Oa=oe,this.jc=ee,this.P=me,_||c.C!==void 0?this.toWireType=mv:(this.toWireType=x?hv:gv,this.M=null);}var Wu=(s,c,g)=>{if(!b.hasOwnProperty(s))throw new Go("Replacing nonexistent public symbol");b[s].A!==void 0&&g!==void 0?b[s].A[g]=c:(b[s]=c,b[s].ea=g);},aa=[],Hu,El=s=>{var c=aa[s];return c||(s>=aa.length&&(aa.length=s+1),aa[s]=c=Hu.get(s)),c},bv=(s,c,g=[])=>(s.includes("j")?(s=s.replace(/p/g,"i"),c=(0, b["dynCall_"+s])(c,...g)):c=El(c)(...g),c),vv=(s,c)=>(...g)=>bv(s,c,g),Ot=(s,c)=>{s=gt(s);var g=s.includes("j")?vv(s,c):El(c);if(typeof g!="function")throw new Me(`unknown function pointer with signature ${s}: ${c}`);return g},Vu,Wn=(s,c)=>{function g(D){_[D]||mr[D]||(na[D]?na[D].forEach(g):(x.push(D),_[D]=true));}var x=[],_={};throw c.forEach(g),new Vu(`${s}: `+x.map(ju).join([", "]))};function yv(s){for(var c=1;c<s.length;++c)if(s[c]!==null&&s[c].M===void 0)return  true;return  false}function sa(s,c,g,x,_){var D=c.length;if(2>D)throw new Me("argTypes array size mismatch! Must at least get return value and 'this' types!");var H=c[1]!==null&&g!==null,K=yv(c),oe=c[0].name!=="void",ee=D-2,me=Array(ee),Se=[],Ae=[];return Hr(s,function(...X){if(X.length!==ee)throw new Me(`function ${s} called with ${X.length} arguments, expected ${ee}`);if(Ae.length=0,Se.length=H?2:1,Se[0]=_,H){var be=c[1].toWireType(Ae,this);Se[1]=be;}for(var pe=0;pe<ee;++pe)me[pe]=c[pe+2].toWireType(Ae,X[pe]),Se.push(me[pe]);if(X=x(...Se),K)Uo(Ae);else for(pe=H?1:2;pe<c.length;pe++){var De=pe===1?be:me[pe-2];c[pe].M!==null&&c[pe].M(De);}return be=oe?c[0].fromWireType(X):void 0,be})}var la=(s,c)=>{for(var g=[],x=0;x<s;x++)g.push(Q[c+4*x>>2]);return g},_l=s=>{s=s.trim();const c=s.indexOf("(");return c!==-1?s.substr(0,c):s},Ku=(s,c,g)=>{if(!(s instanceof Object))throw new Me(`${g} with invalid "this": ${s}`);if(!(s instanceof c.i.constructor))throw new Me(`${g} incompatible with "this" of type ${s.constructor.name}`);if(!s.g.o)throw new Me(`cannot call emscripten binding method ${g} on deleted object`);return oa(s.g.o,s.g.u.i,c.i)},Il=s=>{9<s&&--Gn[s+1]===0&&(Gn[s]=void 0,yl.push(s));},xv={name:"emscripten::val",fromWireType:s=>{var c=An(s);return Il(s),c},toWireType:(s,c)=>En(c),argPackAdvance:8,readValueFromPointer:Wo,M:null},wv=(s,c,g)=>{switch(c){case 1:return g?function(x){return this.fromWireType(ne[x])}:function(x){return this.fromWireType(q[x])};case 2:return g?function(x){return this.fromWireType(Z[x>>1])}:function(x){return this.fromWireType(R[x>>1])};case 4:return g?function(x){return this.fromWireType($[x>>2])}:function(x){return this.fromWireType(Q[x>>2])};default:throw new TypeError(`invalid integer width (${c}): ${s}`)}},Tl=s=>{if(s===null)return "null";var c=typeof s;return c==="object"||c==="array"||c==="function"?s.toString():""+s},Cv=(s,c)=>{switch(c){case 4:return function(g){return this.fromWireType(re[g>>2])};case 8:return function(g){return this.fromWireType(le[g>>3])};default:throw new TypeError(`invalid float width (${c}): ${s}`)}},kv=(s,c,g)=>{switch(c){case 1:return g?x=>ne[x]:x=>q[x];case 2:return g?x=>Z[x>>1]:x=>R[x>>1];case 4:return g?x=>$[x>>2]:x=>Q[x>>2];default:throw new TypeError(`invalid integer width (${c}): ${s}`)}},Yu=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Sv=(s,c)=>{for(var g=s>>1,x=g+c/2;!(g>=x)&&R[g];)++g;if(g<<=1,32<g-s&&Yu)return Yu.decode(q.subarray(s,g));for(g="",x=0;!(x>=c/2);++x){var _=Z[s+2*x>>1];if(_==0)break;g+=String.fromCharCode(_);}return g},Av=(s,c,g)=>{if(g??(g=2147483647),2>g)return 0;g-=2;var x=c;g=g<2*s.length?g/2:s.length;for(var _=0;_<g;++_)Z[c>>1]=s.charCodeAt(_),c+=2;return Z[c>>1]=0,c-x},Ev=s=>2*s.length,_v=(s,c)=>{for(var g=0,x="";!(g>=c/4);){var _=$[s+4*g>>2];if(_==0)break;++g,65536<=_?(_-=65536,x+=String.fromCharCode(55296|_>>10,56320|_&1023)):x+=String.fromCharCode(_);}return x},Iv=(s,c,g)=>{if(g??(g=2147483647),4>g)return 0;var x=c;g=x+g-4;for(var _=0;_<s.length;++_){var D=s.charCodeAt(_);if(55296<=D&&57343>=D){var H=s.charCodeAt(++_);D=65536+((D&1023)<<10)|H&1023;}if($[c>>2]=D,c+=4,c+4>g)break}return $[c>>2]=0,c-x},Tv=s=>{for(var c=0,g=0;g<s.length;++g){var x=s.charCodeAt(g);55296<=x&&57343>=x&&++g,c+=4;}return c},qu=(s,c,g)=>{var x=[];return s=s.toWireType(x,g),x.length&&(Q[c>>2]=En(x)),s},Pv={},Pl=s=>{var c=Pv[s];return c===void 0?gt(s):c},Ll=[],Lv=s=>{var c=Ll.length;return Ll.push(s),c},Mv=(s,c)=>{for(var g=Array(s),x=0;x<s;++x)g[x]=jo(Q[c+4*x>>2],"parameter "+x);return g},Rv=Reflect.construct,Ho=s=>s%4===0&&(s%100!==0||s%400===0),Fv=[0,31,60,91,121,152,182,213,244,274,305,335],Ov=[0,31,59,90,120,151,181,212,243,273,304,334],Ml=[],Rl={},Xu=()=>{if(!Fl){var s={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:B||"./this.program"},c;for(c in Rl)Rl[c]===void 0?delete s[c]:s[c]=Rl[c];var g=[];for(c in s)g.push(`${c}=${s[c]}`);Fl=g;}return Fl},Fl,Qu=[31,29,31,30,31,30,31,31,30,31,30,31],Ju=[31,28,31,30,31,30,31,31,30,31,30,31],Zu=(s,c,g,x)=>{function _(X,be,pe){for(X=typeof X=="number"?X.toString():X||"";X.length<be;)X=pe[0]+X;return X}function D(X,be){return _(X,be,"0")}function H(X,be){function pe(Ge){return 0>Ge?-1:0<Ge?1:0}var De;return (De=pe(X.getFullYear()-be.getFullYear()))===0&&(De=pe(X.getMonth()-be.getMonth()))===0&&(De=pe(X.getDate()-be.getDate())),De}function K(X){switch(X.getDay()){case 0:return new Date(X.getFullYear()-1,11,29);case 1:return X;case 2:return new Date(X.getFullYear(),0,3);case 3:return new Date(X.getFullYear(),0,2);case 4:return new Date(X.getFullYear(),0,1);case 5:return new Date(X.getFullYear()-1,11,31);case 6:return new Date(X.getFullYear()-1,11,30)}}function oe(X){var be=X.ca;for(X=new Date(new Date(X.da+1900,0,1).getTime());0<be;){var pe=X.getMonth(),De=(Ho(X.getFullYear())?Qu:Ju)[pe];if(be>De-X.getDate())be-=De-X.getDate()+1,X.setDate(1),11>pe?X.setMonth(pe+1):(X.setMonth(0),X.setFullYear(X.getFullYear()+1));else {X.setDate(X.getDate()+be);break}}return pe=new Date(X.getFullYear()+1,0,4),be=K(new Date(X.getFullYear(),0,4)),pe=K(pe),0>=H(be,X)?0>=H(pe,X)?X.getFullYear()+1:X.getFullYear():X.getFullYear()-1}var ee=Q[x+40>>2];x={qc:$[x>>2],pc:$[x+4>>2],Ea:$[x+8>>2],Ra:$[x+12>>2],Fa:$[x+16>>2],da:$[x+20>>2],S:$[x+24>>2],ca:$[x+28>>2],Oc:$[x+32>>2],oc:$[x+36>>2],rc:ee&&ee?ge(q,ee):""},g=g?ge(q,g):"",ee={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var me in ee)g=g.replace(new RegExp(me,"g"),ee[me]);var Se="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Ae="January February March April May June July August September October November December".split(" ");ee={"%a":X=>Se[X.S].substring(0,3),"%A":X=>Se[X.S],"%b":X=>Ae[X.Fa].substring(0,3),"%B":X=>Ae[X.Fa],"%C":X=>D((X.da+1900)/100|0,2),"%d":X=>D(X.Ra,2),"%e":X=>_(X.Ra,2," "),"%g":X=>oe(X).toString().substring(2),"%G":oe,"%H":X=>D(X.Ea,2),"%I":X=>(X=X.Ea,X==0?X=12:12<X&&(X-=12),D(X,2)),"%j":X=>{for(var be=0,pe=0;pe<=X.Fa-1;be+=(Ho(X.da+1900)?Qu:Ju)[pe++]);return D(X.Ra+be,3)},"%m":X=>D(X.Fa+1,2),"%M":X=>D(X.pc,2),"%n":()=>`
`,"%p":X=>0<=X.Ea&&12>X.Ea?"AM":"PM","%S":X=>D(X.qc,2),"%t":()=>"	","%u":X=>X.S||7,"%U":X=>D(Math.floor((X.ca+7-X.S)/7),2),"%V":X=>{var be=Math.floor((X.ca+7-(X.S+6)%7)/7);if(2>=(X.S+371-X.ca-2)%7&&be++,be)be==53&&(pe=(X.S+371-X.ca)%7,pe==4||pe==3&&Ho(X.da)||(be=1));else {be=52;var pe=(X.S+7-X.ca-1)%7;(pe==4||pe==5&&Ho(X.da%400-1))&&be++;}return D(be,2)},"%w":X=>X.S,"%W":X=>D(Math.floor((X.ca+7-(X.S+6)%7)/7),2),"%y":X=>(X.da+1900).toString().substring(2),"%Y":X=>X.da+1900,"%z":X=>{X=X.oc;var be=0<=X;return X=Math.abs(X)/60,(be?"+":"-")+("0000"+(X/60*100+X%60)).slice(-4)},"%Z":X=>X.rc,"%%":()=>"%"},g=g.replace(/%%/g,"\0\0");for(me in ee)g.includes(me)&&(g=g.replace(new RegExp(me,"g"),ee[me](x)));return g=g.replace(/\0\0/g,"%"),me=Ve(g,false),me.length>c?0:(ne.set(me,s),me.length-1)};[44].forEach(s=>{hl[s]=new Ee(s),hl[s].stack="<generic error, no stack>";}),No=Array(4096),Fu(Fe,"/"),jn("/tmp"),jn("/home"),jn("/home/web_user"),(function(){jn("/dev"),ml(259,{read:()=>0,write:(x,_,D,H)=>H}),Qi("/dev/null",259),mt(1280,Xt),mt(1536,nn),Qi("/dev/tty",1280),Qi("/dev/tty1",1536);var s=new Uint8Array(1024),c=0,g=()=>(c===0&&(c=J(s).byteLength),s[--c]);Do("random",g),Do("urandom",g),jn("/dev/shm"),jn("/dev/shm/tmp");})(),(function(){jn("/proc");var s=jn("/proc/self");jn("/proc/self/fd"),Fu({V(){var c=Pu(s,"fd",16895,73);return c.j={ka(g,x){var _=nr(+x);return g={parent:null,V:{mb:"fake"},j:{ma:()=>_.path}},g.parent=g}},c}},"/proc/self/fd");})(),Me=b.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError";}},Gn.push(0,1,void 0,1,null,1,true,1,false,1),b.count_emval_handles=()=>Gn.length/2-5-yl.length,Bu=b.PureVirtualError=$u("PureVirtualError");for(var ep=Array(256),ca=0;256>ca;++ca)ep[ca]=String.fromCharCode(ca);zu=ep,b.getInheritedInstanceCount=()=>Object.keys(Un).length,b.getLiveInheritedInstances=()=>{var s=[],c;for(c in Un)Un.hasOwnProperty(c)&&s.push(Un[c]);return s},b.flushPendingDeletes=xl,b.setDelayFunction=s=>{zo=s,Bo.length&&zo&&zo(xl);},Go=b.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError";}},Object.assign(ra.prototype,{isAliasOf:function(s){if(!(this instanceof ra&&s instanceof ra))return  false;var c=this.g.u.i,g=this.g.o;s.g=s.g;var x=s.g.u.i;for(s=s.g.o;c.C;)g=c.na(g),c=c.C;for(;x.C;)s=x.na(s),x=x.C;return c===x&&g===s},clone:function(){if(this.g.o||kl(this),this.g.ia)return this.g.count.value+=1,this;var s=Vr,c=Object,g=c.create,x=Object.getPrototypeOf(this),_=this.g;return s=s(g.call(c,x,{g:{value:{count:_.count,fa:_.fa,ia:_.ia,o:_.o,u:_.u,F:_.F,K:_.K}}})),s.g.count.value+=1,s.g.fa=false,s},delete(){if(this.g.o||kl(this),this.g.fa&&!this.g.ia)throw new Me("Object already scheduled for deletion");Zi(this);var s=this.g;--s.count.value,s.count.value===0&&(s.F?s.K.P(s.F):s.u.i.P(s.o)),this.g.ia||(this.g.F=void 0,this.g.o=void 0);},isDeleted:function(){return !this.g.o},deleteLater:function(){if(this.g.o||kl(this),this.g.fa&&!this.g.ia)throw new Me("Object already scheduled for deletion");return Bo.push(this),Bo.length===1&&zo&&zo(xl),this.g.fa=true,this}}),Object.assign(ia.prototype,{Sb(s){return this.rb&&(s=this.rb(s)),s},bb(s){this.P?.(s);},argPackAdvance:8,readValueFromPointer:Wo,fromWireType:function(s){function c(){return this.ta?ea(this.i.N,{u:this.ic,o:g,K:this,F:s}):ea(this.i.N,{u:this,o:s})}var g=this.Sb(s);if(!g)return this.bb(s),null;var x=dv(this.i,g);if(x!==void 0)return x.g.count.value===0?(x.g.o=g,x.g.F=s,x.clone()):(x=x.clone(),this.bb(s),x);if(x=this.i.Rb(g),x=Uu[x],!x)return c.call(this);x=this.sa?x.Ib:x.pointerType;var _=Gu(g,this.i,x.i);return _===null?c.call(this):this.ta?ea(x.i.N,{u:x,o:_,K:this,F:s}):ea(x.i.N,{u:x,o:_})}}),Vu=b.UnboundTypeError=$u("UnboundTypeError");var tp={__syscall_fcntl64:function(s,c,g){$o=g;try{var x=nr(s);switch(c){case 0:var _=k();if(0>_)break;for(;on[_];)_++;return sv(x,_).X;case 1:case 2:return 0;case 3:return x.flags;case 4:return _=k(),x.flags|=_,0;case 12:return _=k(),Z[_+0>>1]=2,0;case 13:case 14:return 0}return -28}catch(D){if(typeof hr>"u"||D.name!=="ErrnoError")throw D;return -D.aa}},__syscall_ioctl:function(s,c,g){$o=g;try{var x=nr(s);switch(c){case 21509:return x.s?0:-59;case 21505:if(!x.s)return -59;if(x.s.W.Yb){s=[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var _=k();$[_>>2]=25856,$[_+4>>2]=5,$[_+8>>2]=191,$[_+12>>2]=35387;for(var D=0;32>D;D++)ne[_+D+17]=s[D]||0;}return 0;case 21510:case 21511:case 21512:return x.s?0:-59;case 21506:case 21507:case 21508:if(!x.s)return -59;if(x.s.W.Zb)for(_=k(),s=[],D=0;32>D;D++)s.push(ne[_+D+17]);return 0;case 21519:return x.s?(_=k(),$[_>>2]=0):-59;case 21520:return x.s?-28:-59;case 21531:if(_=k(),!x.m.Xb)throw new Ee(59);return x.m.Xb(x,c,_);case 21523:return x.s?(x.s.W.$b&&(D=[24,80],_=k(),Z[_>>1]=D[0],Z[_+2>>1]=D[1]),0):-59;case 21524:return x.s?0:-59;case 21515:return x.s?0:-59;default:return -28}}catch(H){if(typeof hr>"u"||H.name!=="ErrnoError")throw H;return -H.aa}},__syscall_openat:function(s,c,g,x){$o=x;try{c=c?ge(q,c):"";var _=c;if(_.charAt(0)==="/")c=_;else {var D=s===-100?"/":nr(s).path;if(_.length==0)throw new Ee(44);c=h(D+"/"+_);}var H=x?k():0;return Ji(c,g,H).X}catch(K){if(typeof hr>"u"||K.name!=="ErrnoError")throw K;return -K.aa}},_abort_js:()=>{Wt("");},_embind_create_inheriting_constructor:(s,c,g)=>{s=gt(s),c=jo(c,"wrapper"),g=An(g);var x=c.i,_=x.N,D=x.C.N,H=x.C.constructor;return s=Hr(s,function(...K){x.C.qb.forEach(function(oe){if(this[oe]===D[oe])throw new Bu(`Pure virtual function ${oe} must be implemented in JavaScript`)}.bind(this)),Object.defineProperty(this,"__parent",{value:_}),this.__construct(...K);}),_.__construct=function(...K){if(this===_)throw new Me("Pass correct 'this' to __construct");K=H.implement(this,...K),Zi(K);var oe=K.g;if(K.notifyOnDestruction(),oe.ia=true,Object.defineProperties(this,{g:{value:oe}}),Vr(this),K=oe.o,K=wl(x,K),Un.hasOwnProperty(K))throw new Me(`Tried to register registered instance: ${K}`);Un[K]=this;},_.__destruct=function(){if(this===_)throw new Me("Pass correct 'this' to __destruct");Zi(this);var K=this.g.o;if(K=wl(x,K),Un.hasOwnProperty(K))delete Un[K];else throw new Me(`Tried to unregister unregistered instance: ${K}`)},s.prototype=Object.create(_),Object.assign(s.prototype,g),En(s)},_embind_finalize_value_object:s=>{var c=ta[s];delete ta[s];var g=c.Oa,x=c.P,_=c.fb,D=_.map(H=>H.Vb).concat(_.map(H=>H.lc));Qt([s],D,H=>{var K={};return _.forEach((oe,ee)=>{var me=H[ee],Se=oe.Tb,Ae=oe.Ub,X=H[ee+_.length],be=oe.kc,pe=oe.mc;K[oe.Pb]={read:De=>me.fromWireType(Se(Ae,De)),write:(De,Ge)=>{var ke=[];be(pe,De,X.toWireType(ke,Ge)),Uo(ke);}};}),[{name:c.name,fromWireType:oe=>{var ee={},me;for(me in K)ee[me]=K[me].read(oe);return x(oe),ee},toWireType:(oe,ee)=>{for(var me in K)if(!(me in ee))throw new TypeError(`Missing field: "${me}"`);var Se=g();for(me in K)K[me].write(Se,ee[me]);return oe!==null&&oe.push(x,Se),Se},argPackAdvance:8,readValueFromPointer:Wo,M:x}]});},_embind_register_bigint:()=>{},_embind_register_bool:(s,c,g,x)=>{c=gt(c),_n(s,{name:c,fromWireType:function(_){return !!_},toWireType:function(_,D){return D?g:x},argPackAdvance:8,readValueFromPointer:function(_){return this.fromWireType(q[_])},M:null});},_embind_register_class:(s,c,g,x,_,D,H,K,oe,ee,me,Se,Ae)=>{me=gt(me),D=Ot(_,D),K&&(K=Ot(H,K)),ee&&(ee=Ot(oe,ee)),Ae=Ot(Se,Ae);var X=pv(me);Al(X,function(){Wn(`Cannot construct ${me} due to unbound types`,[x]);}),Qt([s,c,g],x?[x]:[],be=>{if(be=be[0],x)var pe=be.i,De=pe.N;else De=ra.prototype;be=Hr(me,function(...It){if(Object.getPrototypeOf(this)!==Ge)throw new Me("Use 'new' to construct "+me);if(ke.$===void 0)throw new Me(me+" has no accessible constructor");var Jt=ke.$[It.length];if(Jt===void 0)throw new Me(`Tried to invoke ctor of ${me} with invalid number of parameters (${It.length}) - expected (${Object.keys(ke.$).toString()}) parameters instead!`);return Jt.apply(this,It)});var Ge=Object.create(De,{constructor:{value:be}});be.prototype=Ge;var ke=new fv(me,be,Ge,Ae,pe,D,K,ee);if(ke.C){var rt;(rt=ke.C).oa??(rt.oa=[]),ke.C.oa.push(ke);}return pe=new ia(me,ke,true,false,false),rt=new ia(me+"*",ke,false,false,false),De=new ia(me+" const*",ke,false,true,false),Uu[s]={pointerType:rt,Ib:De},Wu(X,be),[pe,rt,De]});},_embind_register_class_class_function:(s,c,g,x,_,D,H)=>{var K=la(g,x);c=gt(c),c=_l(c),D=Ot(_,D),Qt([],[s],oe=>{function ee(){Wn(`Cannot call ${me} due to unbound types`,K);}oe=oe[0];var me=`${oe.name}.${c}`;c.startsWith("@@")&&(c=Symbol[c.substring(2)]);var Se=oe.i.constructor;return Se[c]===void 0?(ee.ea=g-1,Se[c]=ee):(Sl(Se,c,me),Se[c].A[g-1]=ee),Qt([],K,Ae=>{if(Ae=sa(me,[Ae[0],null].concat(Ae.slice(1)),null,D,H),Se[c].A===void 0?(Ae.ea=g-1,Se[c]=Ae):Se[c].A[g-1]=Ae,oe.i.oa)for(const X of oe.i.oa)X.constructor.hasOwnProperty(c)||(X.constructor[c]=Ae);return []}),[]});},_embind_register_class_class_property:(s,c,g,x,_,D,H,K)=>{c=gt(c),D=Ot(_,D),Qt([],[s],oe=>{oe=oe[0];var ee=`${oe.name}.${c}`,me={get(){Wn(`Cannot access ${ee} due to unbound types`,[g]);},enumerable:true,configurable:true};return me.set=K?()=>{Wn(`Cannot access ${ee} due to unbound types`,[g]);}:()=>{throw new Me(`${ee} is a read-only property`)},Object.defineProperty(oe.i.constructor,c,me),Qt([],[g],Se=>{Se=Se[0];var Ae={get(){return Se.fromWireType(D(x))},enumerable:true};return K&&(K=Ot(H,K),Ae.set=X=>{var be=[];K(x,Se.toWireType(be,X)),Uo(be);}),Object.defineProperty(oe.i.constructor,c,Ae),[]}),[]});},_embind_register_class_constructor:(s,c,g,x,_,D)=>{var H=la(c,g);_=Ot(x,_),Qt([],[s],K=>{K=K[0];var oe=`constructor ${K.name}`;if(K.i.$===void 0&&(K.i.$=[]),K.i.$[c-1]!==void 0)throw new Me(`Cannot register multiple constructors with identical number of parameters (${c-1}) for class '${K.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return K.i.$[c-1]=()=>{Wn(`Cannot construct ${K.name} due to unbound types`,H);},Qt([],H,ee=>(ee.splice(1,0,null),K.i.$[c-1]=sa(oe,ee,null,_,D),[])),[]});},_embind_register_class_function:(s,c,g,x,_,D,H,K)=>{var oe=la(g,x);c=gt(c),c=_l(c),D=Ot(_,D),Qt([],[s],ee=>{function me(){Wn(`Cannot call ${Se} due to unbound types`,oe);}ee=ee[0];var Se=`${ee.name}.${c}`;c.startsWith("@@")&&(c=Symbol[c.substring(2)]),K&&ee.i.qb.push(c);var Ae=ee.i.N,X=Ae[c];return X===void 0||X.A===void 0&&X.className!==ee.name&&X.ea===g-2?(me.ea=g-2,me.className=ee.name,Ae[c]=me):(Sl(Ae,c,Se),Ae[c].A[g-2]=me),Qt([],oe,be=>(be=sa(Se,be,ee,D,H),Ae[c].A===void 0?(be.ea=g-2,Ae[c]=be):Ae[c].A[g-2]=be,[])),[]});},_embind_register_class_property:(s,c,g,x,_,D,H,K,oe,ee)=>{c=gt(c),_=Ot(x,_),Qt([],[s],me=>{me=me[0];var Se=`${me.name}.${c}`,Ae={get(){Wn(`Cannot access ${Se} due to unbound types`,[g,H]);},enumerable:true,configurable:true};return Ae.set=oe?()=>Wn(`Cannot access ${Se} due to unbound types`,[g,H]):()=>{throw new Me(Se+" is a read-only property")},Object.defineProperty(me.i.N,c,Ae),Qt([],oe?[g,H]:[g],X=>{var be=X[0],pe={get(){var Ge=Ku(this,me,Se+" getter");return be.fromWireType(_(D,Ge))},enumerable:true};if(oe){oe=Ot(K,oe);var De=X[1];pe.set=function(Ge){var ke=Ku(this,me,Se+" setter"),rt=[];oe(ee,ke,De.toWireType(rt,Ge)),Uo(rt);};}return Object.defineProperty(me.i.N,c,pe),[]}),[]});},_embind_register_emval:s=>_n(s,xv),_embind_register_enum:(s,c,g,x)=>{function _(){}c=gt(c),_.values={},_n(s,{name:c,constructor:_,fromWireType:function(D){return this.constructor.values[D]},toWireType:(D,H)=>H.value,argPackAdvance:8,readValueFromPointer:wv(c,g,x),M:null}),Al(c,_);},_embind_register_enum_value:(s,c,g)=>{var x=jo(s,"enum");c=gt(c),s=x.constructor,x=Object.create(x.constructor.prototype,{value:{value:g},constructor:{value:Hr(`${x.name}_${c}`,function(){})}}),s.values[g]=x,s[c]=x;},_embind_register_float:(s,c,g)=>{c=gt(c),_n(s,{name:c,fromWireType:x=>x,toWireType:(x,_)=>_,argPackAdvance:8,readValueFromPointer:Cv(c,g),M:null});},_embind_register_function:(s,c,g,x,_,D)=>{var H=la(c,g);s=gt(s),s=_l(s),_=Ot(x,_),Al(s,function(){Wn(`Cannot call ${s} due to unbound types`,H);},c-1),Qt([],H,K=>(Wu(s,sa(s,[K[0],null].concat(K.slice(1)),null,_,D),c-1),[]));},_embind_register_integer:(s,c,g,x,_)=>{if(c=gt(c),_===-1&&(_=4294967295),_=K=>K,x===0){var D=32-8*g;_=K=>K<<D>>>D;}var H=c.includes("unsigned")?function(K,oe){return oe>>>0}:function(K,oe){return oe};_n(s,{name:c,fromWireType:_,toWireType:H,argPackAdvance:8,readValueFromPointer:kv(c,g,x!==0),M:null});},_embind_register_memory_view:(s,c,g)=>{function x(D){return new _(ne.buffer,Q[D+4>>2],Q[D>>2])}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][c];g=gt(g),_n(s,{name:g,fromWireType:x,argPackAdvance:8,readValueFromPointer:x},{Wb:true});},_embind_register_std_string:(s,c)=>{c=gt(c);var g=c==="std::string";_n(s,{name:c,fromWireType:function(x){var _=Q[x>>2],D=x+4;if(g)for(var H=D,K=0;K<=_;++K){var oe=D+K;if(K==_||q[oe]==0){if(H=H?ge(q,H,oe-H):"",ee===void 0)var ee=H;else ee+="\0",ee+=H;H=oe+1;}}else {for(ee=Array(_),K=0;K<_;++K)ee[K]=String.fromCharCode(q[D+K]);ee=ee.join("");}return Hn(x),ee},toWireType:function(x,_){_ instanceof ArrayBuffer&&(_=new Uint8Array(_));var D=typeof _=="string";if(!(D||_ instanceof Uint8Array||_ instanceof Uint8ClampedArray||_ instanceof Int8Array))throw new Me("Cannot pass non-string to std::string");var H=g&&D?Je(_):_.length,K=Ol(4+H+1),oe=K+4;if(Q[K>>2]=H,g&&D)it(_,q,oe,H+1);else if(D)for(D=0;D<H;++D){var ee=_.charCodeAt(D);if(255<ee)throw Hn(oe),new Me("String has UTF-16 code units that do not fit in 8 bits");q[oe+D]=ee;}else for(D=0;D<H;++D)q[oe+D]=_[D];return x!==null&&x.push(Hn,K),K},argPackAdvance:8,readValueFromPointer:Wo,M(x){Hn(x);}});},_embind_register_std_wstring:(s,c,g)=>{if(g=gt(g),c===2)var x=Sv,_=Av,D=Ev,H=K=>R[K>>1];else c===4&&(x=_v,_=Iv,D=Tv,H=K=>Q[K>>2]);_n(s,{name:g,fromWireType:K=>{for(var oe=Q[K>>2],ee,me=K+4,Se=0;Se<=oe;++Se){var Ae=K+4+Se*c;(Se==oe||H(Ae)==0)&&(me=x(me,Ae-me),ee===void 0?ee=me:(ee+="\0",ee+=me),me=Ae+c);}return Hn(K),ee},toWireType:(K,oe)=>{if(typeof oe!="string")throw new Me(`Cannot pass non-string to C++ string type ${g}`);var ee=D(oe),me=Ol(4+ee+c);return Q[me>>2]=ee/c,_(oe,me+4,ee+c),K!==null&&K.push(Hn,me),me},argPackAdvance:8,readValueFromPointer:Wo,M(K){Hn(K);}});},_embind_register_value_object:(s,c,g,x,_,D)=>{ta[s]={name:gt(c),Oa:Ot(g,x),P:Ot(_,D),fb:[]};},_embind_register_value_object_field:(s,c,g,x,_,D,H,K,oe,ee)=>{ta[s].fb.push({Pb:gt(c),Vb:g,Tb:Ot(x,_),Ub:D,lc:H,kc:Ot(K,oe),mc:ee});},_embind_register_void:(s,c)=>{c=gt(c),_n(s,{Jc:true,name:c,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}});},_emscripten_get_now_is_monotonic:()=>1,_emscripten_memcpy_js:(s,c,g)=>q.copyWithin(s,c,c+g),_emscripten_throw_longjmp:()=>{throw 1/0},_emval_as:(s,c,g)=>(s=An(s),c=jo(c,"emval::as"),qu(c,g,s)),_emval_call_method:(s,c,g,x,_)=>(s=Ll[s],c=An(c),g=Pl(g),s(c,c[g],x,_)),_emval_decref:Il,_emval_get_method_caller:(s,c,g)=>{var x=Mv(s,c),_=x.shift();s--;var D=Array(s);return c=`methodCaller<(${x.map(H=>H.name).join(", ")}) => ${_.name}>`,Lv(Hr(c,(H,K,oe,ee)=>{for(var me=0,Se=0;Se<s;++Se)D[Se]=x[Se].readValueFromPointer(ee+me),me+=x[Se].argPackAdvance;return H=g===1?Rv(K,D):K.apply(H,D),qu(_,oe,H)}))},_emval_get_module_property:s=>(s=Pl(s),En(b[s])),_emval_get_property:(s,c)=>(s=An(s),c=An(c),En(s[c])),_emval_incref:s=>{9<s&&(Gn[s+1]+=1);},_emval_new_array:()=>En([]),_emval_new_cstring:s=>En(Pl(s)),_emval_new_object:()=>En({}),_emval_run_destructors:s=>{var c=An(s);Uo(c),Il(s);},_emval_set_property:(s,c,g)=>{s=An(s),c=An(c),g=An(g),s[c]=g;},_emval_take_value:(s,c)=>(s=jo(s,"_emval_take_value"),s=s.readValueFromPointer(c),En(s)),_gmtime_js:function(s,c,g){s=new Date(1e3*(c+2097152>>>0<4194305-!!s?(s>>>0)+4294967296*c:NaN)),$[g>>2]=s.getUTCSeconds(),$[g+4>>2]=s.getUTCMinutes(),$[g+8>>2]=s.getUTCHours(),$[g+12>>2]=s.getUTCDate(),$[g+16>>2]=s.getUTCMonth(),$[g+20>>2]=s.getUTCFullYear()-1900,$[g+24>>2]=s.getUTCDay(),$[g+28>>2]=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0;},_localtime_js:function(s,c,g){s=new Date(1e3*(c+2097152>>>0<4194305-!!s?(s>>>0)+4294967296*c:NaN)),$[g>>2]=s.getSeconds(),$[g+4>>2]=s.getMinutes(),$[g+8>>2]=s.getHours(),$[g+12>>2]=s.getDate(),$[g+16>>2]=s.getMonth(),$[g+20>>2]=s.getFullYear()-1900,$[g+24>>2]=s.getDay(),$[g+28>>2]=(Ho(s.getFullYear())?Fv:Ov)[s.getMonth()]+s.getDate()-1|0,$[g+36>>2]=-(60*s.getTimezoneOffset()),c=new Date(s.getFullYear(),6,1).getTimezoneOffset();var x=new Date(s.getFullYear(),0,1).getTimezoneOffset();$[g+32>>2]=(c!=x&&s.getTimezoneOffset()==Math.min(x,c))|0;},_tzset_js:(s,c,g,x)=>{var _=new Date().getFullYear(),D=new Date(_,0,1),H=new Date(_,6,1);_=D.getTimezoneOffset();var K=H.getTimezoneOffset();Q[s>>2]=60*Math.max(_,K),$[c>>2]=+(_!=K),s=oe=>oe.toLocaleTimeString(void 0,{hour12:false,timeZoneName:"short"}).split(" ")[1],D=s(D),H=s(H),K<_?(it(D,q,g,17),it(H,q,x,17)):(it(D,q,x,17),it(H,q,g,17));},emscripten_asm_const_int:(s,c,g)=>{Ml.length=0;for(var x;x=q[c++];){var _=x!=105;_&=x!=112,g+=_&&g%8?4:0,Ml.push(x==112?Q[g>>2]:x==105?$[g>>2]:le[g>>3]),g+=_?8:4;}return Sn[s](...Ml)},emscripten_date_now:()=>Date.now(),emscripten_get_now:()=>performance.now(),emscripten_resize_heap:s=>{var c=q.length;if(s>>>=0,2147483648<s)return  false;for(var g=1;4>=g;g*=2){var x=c*(1+.2/g);x=Math.min(x,s+100663296);var _=Math;x=Math.max(s,x);e:{_=(_.min.call(_,2147483648,x+(65536-x%65536)%65536)-se.buffer.byteLength+65535)/65536;try{se.grow(_),ve();var D=1;break e}catch{}D=void 0;}if(D)return  true}return  false},environ_get:(s,c)=>{var g=0;return Xu().forEach((x,_)=>{var D=c+g;for(_=Q[s+4*_>>2]=D,D=0;D<x.length;++D)ne[_++]=x.charCodeAt(D);ne[_]=0,g+=x.length+1;}),0},environ_sizes_get:(s,c)=>{var g=Xu();Q[s>>2]=g.length;var x=0;return g.forEach(_=>x+=_.length+1),Q[c>>2]=x,0},fd_close:function(s){try{var c=nr(s);if(c.X===null)throw new Ee(8);c.La&&(c.La=null);try{c.m.close&&c.m.close(c);}catch(g){throw g}finally{on[c.X]=null;}return c.X=null,0}catch(g){if(typeof hr>"u"||g.name!=="ErrnoError")throw g;return g.aa}},fd_read:function(s,c,g,x){try{e:{var _=nr(s);s=c;for(var D,H=c=0;H<g;H++){var K=Q[s>>2],oe=Q[s+4>>2];s+=8;var ee=_,me=D,Se=ne;if(0>oe||0>me)throw new Ee(28);if(ee.X===null)throw new Ee(8);if((ee.flags&2097155)===1)throw new Ee(8);if((ee.node.mode&61440)===16384)throw new Ee(31);if(!ee.m.read)throw new Ee(28);var Ae=typeof me<"u";if(!Ae)me=ee.position;else if(!ee.seekable)throw new Ee(70);var X=ee.m.read(ee,Se,K,oe,me);Ae||(ee.position+=X);var be=X;if(0>be){var pe=-1;break e}if(c+=be,be<oe)break;typeof D<"u"&&(D+=be);}pe=c;}return Q[x>>2]=pe,0}catch(De){if(typeof hr>"u"||De.name!=="ErrnoError")throw De;return De.aa}},fd_seek:function(s,c,g,x,_){c=g+2097152>>>0<4194305-!!c?(c>>>0)+4294967296*g:NaN;try{if(isNaN(c))return 61;var D=nr(s);return Ou(D,c,x),Vt=[D.position>>>0,(wt=D.position,1<=+Math.abs(wt)?0<wt?+Math.floor(wt/4294967296)>>>0:~~+Math.ceil((wt-+(~~wt>>>0))/4294967296)>>>0:0)],$[_>>2]=Vt[0],$[_+4>>2]=Vt[1],D.La&&c===0&&x===0&&(D.La=null),0}catch(H){if(typeof hr>"u"||H.name!=="ErrnoError")throw H;return H.aa}},fd_write:function(s,c,g,x){try{e:{var _=nr(s);s=c;for(var D,H=c=0;H<g;H++){var K=Q[s>>2],oe=Q[s+4>>2];s+=8;var ee=_,me=K,Se=oe,Ae=D,X=ne;if(0>Se||0>Ae)throw new Ee(28);if(ee.X===null)throw new Ee(8);if((ee.flags&2097155)===0)throw new Ee(8);if((ee.node.mode&61440)===16384)throw new Ee(31);if(!ee.m.write)throw new Ee(28);ee.seekable&&ee.flags&1024&&Ou(ee,0,2);var be=typeof Ae<"u";if(!be)Ae=ee.position;else if(!ee.seekable)throw new Ee(70);var pe=ee.m.write(ee,X,me,Se,Ae,void 0);be||(ee.position+=pe);var De=pe;if(0>De){var Ge=-1;break e}c+=De,typeof D<"u"&&(D+=De);}Ge=c;}return Q[x>>2]=Ge,0}catch(ke){if(typeof hr>"u"||ke.name!=="ErrnoError")throw ke;return ke.aa}},invoke_vii:Nv,isWindowsBrowser:function(){return  -1<navigator.platform.indexOf("Win")},strftime:Zu,strftime_l:(s,c,g,x)=>Zu(s,c,g,x)},lt=(function(){function s(g){return lt=g.exports,se=lt.memory,ve(),Hu=lt.__indirect_function_table,$e.unshift(lt.__wasm_call_ctors),ct--,b.monitorRunDependencies?.(ct),ct==0&&Et&&(g=Et,Et=null,g()),lt}var c={env:tp,wasi_snapshot_preview1:tp};if(ct++,b.monitorRunDependencies?.(ct),b.instantiateWasm)try{return b.instantiateWasm(c,s)}catch(g){Y(`Module.instantiateWasm callback failed with error: ${g}`),P(g);}return tt||(tt=Lt("canvas_advanced.wasm")?"canvas_advanced.wasm":b.locateFile?b.locateFile("canvas_advanced.wasm",j):j+"canvas_advanced.wasm"),ut(c,function(g){s(g.instance);}).catch(P),{}})(),Hn=s=>(Hn=lt.free)(s),Ol=s=>(Ol=lt.malloc)(s),np=s=>(np=lt.__getTypeName)(s),rp=b._ma_device__on_notification_unlocked=s=>(rp=b._ma_device__on_notification_unlocked=lt.ma_device__on_notification_unlocked)(s);b._ma_malloc_emscripten=(s,c)=>(b._ma_malloc_emscripten=lt.ma_malloc_emscripten)(s,c),b._ma_free_emscripten=(s,c)=>(b._ma_free_emscripten=lt.ma_free_emscripten)(s,c);var op=b._ma_device_process_pcm_frames_capture__webaudio=(s,c,g)=>(op=b._ma_device_process_pcm_frames_capture__webaudio=lt.ma_device_process_pcm_frames_capture__webaudio)(s,c,g),ip=b._ma_device_process_pcm_frames_playback__webaudio=(s,c,g)=>(ip=b._ma_device_process_pcm_frames_playback__webaudio=lt.ma_device_process_pcm_frames_playback__webaudio)(s,c,g),ap=(s,c)=>(ap=lt.setThrew)(s,c),sp=s=>(sp=lt._emscripten_stack_restore)(s),lp=()=>(lp=lt.emscripten_stack_get_current)();b.dynCall_iiji=(s,c,g,x,_)=>(b.dynCall_iiji=lt.dynCall_iiji)(s,c,g,x,_),b.dynCall_jiji=(s,c,g,x,_)=>(b.dynCall_jiji=lt.dynCall_jiji)(s,c,g,x,_),b.dynCall_iiiji=(s,c,g,x,_,D)=>(b.dynCall_iiiji=lt.dynCall_iiiji)(s,c,g,x,_,D),b.dynCall_iij=(s,c,g,x)=>(b.dynCall_iij=lt.dynCall_iij)(s,c,g,x),b.dynCall_jii=(s,c,g)=>(b.dynCall_jii=lt.dynCall_jii)(s,c,g),b.dynCall_viijii=(s,c,g,x,_,D,H)=>(b.dynCall_viijii=lt.dynCall_viijii)(s,c,g,x,_,D,H),b.dynCall_iiiiij=(s,c,g,x,_,D,H)=>(b.dynCall_iiiiij=lt.dynCall_iiiiij)(s,c,g,x,_,D,H),b.dynCall_iiiiijj=(s,c,g,x,_,D,H,K,oe)=>(b.dynCall_iiiiijj=lt.dynCall_iiiiijj)(s,c,g,x,_,D,H,K,oe),b.dynCall_iiiiiijj=(s,c,g,x,_,D,H,K,oe,ee)=>(b.dynCall_iiiiiijj=lt.dynCall_iiiiiijj)(s,c,g,x,_,D,H,K,oe,ee);function Nv(s,c,g){var x=lp();try{El(s)(c,g);}catch(_){if(sp(x),_!==_+0)throw _;ap(1,0);}}var da;Et=function s(){da||cp(),da||(Et=s);};function cp(){function s(){if(!da&&(da=true,b.calledRun=true,!ae)){if(b.noFSInit||Nu||(Nu=true,b.stdin=b.stdin,b.stdout=b.stdout,b.stderr=b.stderr,b.stdin?Do("stdin",b.stdin):bl("/dev/tty","/dev/stdin"),b.stdout?Do("stdout",null,b.stdout):bl("/dev/tty","/dev/stdout"),b.stderr?Do("stderr",null,b.stderr):bl("/dev/tty1","/dev/stderr"),Ji("/dev/stdin",0),Ji("/dev/stdout",1),Ji("/dev/stderr",1)),_u=false,tn($e),A(b),b.onRuntimeInitialized&&b.onRuntimeInitialized(),b.postRun)for(typeof b.postRun=="function"&&(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();bt.unshift(c);}tn(bt);}}if(!(0<ct)){if(b.preRun)for(typeof b.preRun=="function"&&(b.preRun=[b.preRun]);b.preRun.length;)Bt();tn(_e),0<ct||(b.setStatus?(b.setStatus("Running..."),setTimeout(function(){setTimeout(function(){b.setStatus("");},1),s();},1)):s());}}if(b.preInit)for(typeof b.preInit=="function"&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();return cp(),y=I,y})})();const p=f;}),(a=>{a.exports=JSON.parse(`{"name":"@rive-app/canvas","version":"2.34.3","description":"Rive's canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive_fallback.wasm","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}`);}),((a,l,u)=>{u.r(l),u.d(l,{Animation:()=>f.Animation});var f=u(4);}),((a,l,u)=>{u.r(l),u.d(l,{Animation:()=>f});var f=(function(){function p(m,v,y,b){this.animation=m,this.artboard=v,this.playing=b,this.loopCount=0,this.scrubTo=null,this.instance=new y.LinearAnimationInstance(m,v);}return Object.defineProperty(p.prototype,"name",{get:function(){return this.animation.name},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"time",{get:function(){return this.instance.time},set:function(m){this.instance.time=m;},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"loopValue",{get:function(){return this.animation.loopValue},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"needsScrub",{get:function(){return this.scrubTo!==null},enumerable:false,configurable:true}),p.prototype.advance=function(m){this.scrubTo===null?this.instance.advance(m):(this.instance.time=0,this.instance.advance(this.scrubTo),this.scrubTo=null);},p.prototype.apply=function(m){this.instance.apply(m);},p.prototype.cleanup=function(){this.instance.delete();},p})();}),((a,l,u)=>{u.r(l),u.d(l,{AudioAssetWrapper:()=>m.AudioAssetWrapper,AudioWrapper:()=>m.AudioWrapper,BLANK_URL:()=>p.BLANK_URL,CustomFileAssetLoaderWrapper:()=>m.CustomFileAssetLoaderWrapper,FileAssetWrapper:()=>m.FileAssetWrapper,FileFinalizer:()=>m.FileFinalizer,FontAssetWrapper:()=>m.FontAssetWrapper,FontWrapper:()=>m.FontWrapper,ImageAssetWrapper:()=>m.ImageAssetWrapper,ImageWrapper:()=>m.ImageWrapper,createFinalization:()=>m.createFinalization,finalizationRegistry:()=>m.finalizationRegistry,registerTouchInteractions:()=>f.registerTouchInteractions,sanitizeUrl:()=>p.sanitizeUrl});var f=u(6),p=u(7),m=u(8);}),((a,l,u)=>{u.r(l),u.d(l,{registerTouchInteractions:()=>m});var f=void 0,p=function(v,y,b){var A,P,I=[];if(["touchstart","touchmove"].indexOf(v.type)>-1&&(!((A=v.changedTouches)===null||A===void 0)&&A.length)){y||v.preventDefault();for(var T=0,N=b?v.changedTouches.length:1;T<N;){var z=v.changedTouches[T];I.push({clientX:z.clientX,clientY:z.clientY,identifier:z.identifier}),T++;}}else if(v.type==="touchend"&&(!((P=v.changedTouches)===null||P===void 0)&&P.length))for(var T=0,N=b?v.changedTouches.length:1;T<N;){var z=v.changedTouches[T];I.push({clientX:z.clientX,clientY:z.clientY,identifier:z.identifier}),T++;}else I.push({clientX:v.clientX,clientY:v.clientY,identifier:0});return I},m=function(v){var y=v.canvas,b=v.artboard,A=v.stateMachines,P=A===void 0?[]:A,I=v.renderer,T=v.rive,N=v.fit,z=v.alignment,O=v.isTouchScrollEnabled,M=O===void 0?false:O,F=v.dispatchPointerExit,L=F===void 0?true:F,C=v.enableMultiTouch,E=C===void 0?false:C,B=v.layoutScaleFactor,j=B===void 0?1:B;if(!y||!P.length||!I||!T||!b||typeof window>"u")return null;var V=null,U=false,ce=function(ie){if(U&&ie instanceof MouseEvent){ie.type=="mouseup"&&(U=false);return}U=M&&ie.type==="touchend"&&V==="touchstart",V=ie.type;var se=ie.currentTarget.getBoundingClientRect(),ae=p(ie,M,E),ne=T.computeAlignment(N,z,{minX:0,minY:0,maxX:se.width,maxY:se.height},b.bounds,j),q=new T.Mat2D;switch(ne.invert(q),ae.forEach(function(tt){var Ne=tt.clientX,mn=tt.clientY;if(!(!Ne&&!mn)){var gn=Ne-se.left,ut=mn-se.top,wt=new T.Vec2D(gn,ut),Vt=T.mapXY(q,wt),Sn=Vt.x(),tn=Vt.y();tt.transformedX=Sn,tt.transformedY=tn,Vt.delete(),wt.delete();}}),q.delete(),ne.delete(),ie.type){case "mouseout":for(var Z=function(tt){L?ae.forEach(function(Ne){tt.pointerExit(Ne.transformedX,Ne.transformedY,Ne.identifier);}):ae.forEach(function(Ne){tt.pointerMove(Ne.transformedX,Ne.transformedY,Ne.identifier);});},R=0,$=P;R<$.length;R++){var Q=$[R];Z(Q);}break;case "touchmove":case "mouseover":case "mousemove":{for(var re=function(tt){ae.forEach(function(Ne){tt.pointerMove(Ne.transformedX,Ne.transformedY,Ne.identifier);});},le=0,ve=P;le<ve.length;le++){var Q=ve[le];re(Q);}break}case "touchstart":case "mousedown":{for(var _e=function(tt){ae.forEach(function(Ne){tt.pointerDown(Ne.transformedX,Ne.transformedY,Ne.identifier);});},$e=0,bt=P;$e<bt.length;$e++){var Q=bt[$e];_e(Q);}break}case "touchend":{for(var Bt=function(tt){ae.forEach(function(Ne){tt.pointerUp(Ne.transformedX,Ne.transformedY,Ne.identifier),tt.pointerExit(Ne.transformedX,Ne.transformedY,Ne.identifier);});},ct=0,Et=P;ct<Et.length;ct++){var Q=Et[ct];Bt(Q);}break}case "mouseup":{for(var Wt=function(tt){ae.forEach(function(Ne){tt.pointerUp(Ne.transformedX,Ne.transformedY,Ne.identifier);});},Lt=0,Ht=P;Lt<Ht.length;Lt++){var Q=Ht[Lt];Wt(Q);}break}}},Y=ce.bind(f);return y.addEventListener("mouseover",Y),y.addEventListener("mouseout",Y),y.addEventListener("mousemove",Y),y.addEventListener("mousedown",Y),y.addEventListener("mouseup",Y),y.addEventListener("touchmove",Y,{passive:M}),y.addEventListener("touchstart",Y,{passive:M}),y.addEventListener("touchend",Y),function(){y.removeEventListener("mouseover",Y),y.removeEventListener("mouseout",Y),y.removeEventListener("mousemove",Y),y.removeEventListener("mousedown",Y),y.removeEventListener("mouseup",Y),y.removeEventListener("touchmove",Y),y.removeEventListener("touchstart",Y),y.removeEventListener("touchend",Y);}};}),((a,l,u)=>{u.r(l),u.d(l,{BLANK_URL:()=>A,sanitizeUrl:()=>T});var f=/^([^\w]*)(javascript|data|vbscript)/im,p=/&#(\w+)(^\w|;)?/g,m=/&(newline|tab);/gi,v=/[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,y=/^.+(:|&colon;)/gim,b=[".","/"],A="about:blank";function P(N){return b.indexOf(N[0])>-1}function I(N){var z=N.replace(v,"");return z.replace(p,function(O,M){return String.fromCharCode(M)})}function T(N){if(!N)return A;var z=I(N).replace(m,"").replace(v,"").trim();if(!z)return A;if(P(z))return z;var O=z.match(y);if(!O)return z;var M=O[0];return f.test(M)?A:z}}),((a,l,u)=>{u.r(l),u.d(l,{AudioAssetWrapper:()=>N,AudioWrapper:()=>b,CustomFileAssetLoaderWrapper:()=>P,FileAssetWrapper:()=>I,FileFinalizer:()=>p,FontAssetWrapper:()=>z,FontWrapper:()=>A,ImageAssetWrapper:()=>T,ImageWrapper:()=>y,createFinalization:()=>L,finalizationRegistry:()=>F});var f=(function(){var C=function(E,B){return C=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,V){j.__proto__=V;}||function(j,V){for(var U in V)Object.prototype.hasOwnProperty.call(V,U)&&(j[U]=V[U]);},C(E,B)};return function(E,B){if(typeof B!="function"&&B!==null)throw new TypeError("Class extends value "+String(B)+" is not a constructor or null");C(E,B);function j(){this.constructor=E;}E.prototype=B===null?Object.create(B):(j.prototype=B.prototype,new j);}})(),p=(function(){function C(E){this.selfUnref=false,this._file=E;}return C.prototype.unref=function(){this._file&&this._file.unref();},C})(),m=(function(){function C(E){this._finalizableObject=E;}return C.prototype.unref=function(){this._finalizableObject.unref();},C})(),v=(function(){function C(){this.selfUnref=false;}return C.prototype.unref=function(){},C})(),y=(function(C){f(E,C);function E(B){var j=C.call(this)||this;return j._nativeImage=B,j}return Object.defineProperty(E.prototype,"nativeImage",{get:function(){return this._nativeImage},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeImage.unref();},E})(v),b=(function(C){f(E,C);function E(B){var j=C.call(this)||this;return j._nativeAudio=B,j}return Object.defineProperty(E.prototype,"nativeAudio",{get:function(){return this._nativeAudio},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeAudio.unref();},E})(v),A=(function(C){f(E,C);function E(B){var j=C.call(this)||this;return j._nativeFont=B,j}return Object.defineProperty(E.prototype,"nativeFont",{get:function(){return this._nativeFont},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeFont.unref();},E})(v),P=(function(){function C(E,B){this._assetLoaderCallback=B,this.assetLoader=new E.CustomFileAssetLoader({loadContents:this.loadContents.bind(this)});}return C.prototype.loadContents=function(E,B){var j;return E.isImage?j=new T(E):E.isAudio?j=new N(E):E.isFont&&(j=new z(E)),this._assetLoaderCallback(j,B)},C})(),I=(function(){function C(E){this._nativeFileAsset=E;}return C.prototype.decode=function(E){this._nativeFileAsset.decode(E);},Object.defineProperty(C.prototype,"name",{get:function(){return this._nativeFileAsset.name},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"fileExtension",{get:function(){return this._nativeFileAsset.fileExtension},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"uniqueFilename",{get:function(){return this._nativeFileAsset.uniqueFilename},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isAudio",{get:function(){return this._nativeFileAsset.isAudio},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isImage",{get:function(){return this._nativeFileAsset.isImage},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isFont",{get:function(){return this._nativeFileAsset.isFont},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"cdnUuid",{get:function(){return this._nativeFileAsset.cdnUuid},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"nativeFileAsset",{get:function(){return this._nativeFileAsset},enumerable:false,configurable:true}),C})(),T=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setRenderImage=function(B){this._nativeFileAsset.setRenderImage(B.nativeImage);},E})(I),N=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setAudioSource=function(B){this._nativeFileAsset.setAudioSource(B.nativeAudio);},E})(I),z=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setFont=function(B){this._nativeFileAsset.setFont(B.nativeFont);},E})(I),O=(function(){function C(E){}return C.prototype.register=function(E){E.selfUnref=true;},C.prototype.unregister=function(E){},C})(),M=typeof FinalizationRegistry<"u"?FinalizationRegistry:O,F=new M(function(C){C?.unref();}),L=function(C,E){var B=new m(E);F.register(C,B);};})],r={};function o(a){var l=r[a];if(l!==void 0)return l.exports;var u=r[a]={exports:{}};return n[a](u,u.exports,o),u.exports}o.d=(a,l)=>{for(var u in l)o.o(l,u)&&!o.o(a,u)&&Object.defineProperty(a,u,{enumerable:true,get:l[u]});},o.o=(a,l)=>Object.prototype.hasOwnProperty.call(a,l),o.r=a=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:true});};var i={};return (()=>{o.r(i),o.d(i,{Alignment:()=>T,DataEnum:()=>ve,DrawOptimizationOptions:()=>N,EventType:()=>U,Fit:()=>I,Layout:()=>z,LoopType:()=>ce,Rive:()=>re,RiveEventType:()=>L,RiveFile:()=>Q,RuntimeLoader:()=>O,StateMachineInput:()=>F,StateMachineInputType:()=>M,Testing:()=>wt,ViewModel:()=>le,ViewModelInstance:()=>$e,ViewModelInstanceArtboard:()=>mn,ViewModelInstanceAssetImage:()=>Ne,ViewModelInstanceBoolean:()=>Et,ViewModelInstanceColor:()=>tt,ViewModelInstanceEnum:()=>Lt,ViewModelInstanceList:()=>Ht,ViewModelInstanceNumber:()=>ct,ViewModelInstanceString:()=>Bt,ViewModelInstanceTrigger:()=>Wt,ViewModelInstanceValue:()=>bt,decodeAudio:()=>Vt,decodeFont:()=>tn,decodeImage:()=>Sn});var a=o(1),l=o(2),u=o(3),f=o(5),p=(function(){var k=function(d,h){return k=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(S,G){S.__proto__=G;}||function(S,G){for(var W in G)Object.prototype.hasOwnProperty.call(G,W)&&(S[W]=G[W]);},k(d,h)};return function(d,h){if(typeof h!="function"&&h!==null)throw new TypeError("Class extends value "+String(h)+" is not a constructor or null");k(d,h);function S(){this.constructor=d;}d.prototype=h===null?Object.create(h):(S.prototype=h.prototype,new S);}})(),m=function(){return m=Object.assign||function(k){for(var d,h=1,S=arguments.length;h<S;h++){d=arguments[h];for(var G in d)Object.prototype.hasOwnProperty.call(d,G)&&(k[G]=d[G]);}return k},m.apply(this,arguments)},v=function(k,d,h,S){function G(W){return W instanceof h?W:new h(function(J){J(W);})}return new(h||(h=Promise))(function(W,J){function de(we){try{ge(S.next(we));}catch(Je){J(Je);}}function ye(we){try{ge(S.throw(we));}catch(Je){J(Je);}}function ge(we){we.done?W(we.value):G(we.value).then(de,ye);}ge((S=S.apply(k,[])).next());})},y=function(k,d){var h={label:0,sent:function(){if(W[0]&1)throw W[1];return W[1]},trys:[],ops:[]},S,G,W,J=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return J.next=de(0),J.throw=de(1),J.return=de(2),typeof Symbol=="function"&&(J[Symbol.iterator]=function(){return this}),J;function de(ge){return function(we){return ye([ge,we])}}function ye(ge){if(S)throw new TypeError("Generator is already executing.");for(;J&&(J=0,ge[0]&&(h=0)),h;)try{if(S=1,G&&(W=ge[0]&2?G.return:ge[0]?G.throw||((W=G.return)&&W.call(G),0):G.next)&&!(W=W.call(G,ge[1])).done)return W;switch(G=0,W&&(ge=[ge[0]&2,W.value]),ge[0]){case 0:case 1:W=ge;break;case 4:return h.label++,{value:ge[1],done:!1};case 5:h.label++,G=ge[1],ge=[0];continue;case 7:ge=h.ops.pop(),h.trys.pop();continue;default:if(W=h.trys,!(W=W.length>0&&W[W.length-1])&&(ge[0]===6||ge[0]===2)){h=0;continue}if(ge[0]===3&&(!W||ge[1]>W[0]&&ge[1]<W[3])){h.label=ge[1];break}if(ge[0]===6&&h.label<W[1]){h.label=W[1],W=ge;break}if(W&&h.label<W[2]){h.label=W[2],h.ops.push(ge);break}W[2]&&h.ops.pop(),h.trys.pop();continue}ge=d.call(k,h);}catch(we){ge=[6,we],G=0;}finally{S=W=0;}if(ge[0]&5)throw ge[1];return {value:ge[0]?ge[1]:void 0,done:true}}},b=function(k,d,h){for(var S=0,G=d.length,W;S<G;S++)(W||!(S in d))&&(W||(W=Array.prototype.slice.call(d,0,S)),W[S]=d[S]);return k.concat(W||Array.prototype.slice.call(d))},A=(function(k){p(d,k);function d(){var h=k!==null&&k.apply(this,arguments)||this;return h.isHandledError=true,h}return d})(Error),P=function(k){return k&&k.isHandledError?k.message:"Problem loading file; may be corrupt!"},I;(function(k){k.Cover="cover",k.Contain="contain",k.Fill="fill",k.FitWidth="fitWidth",k.FitHeight="fitHeight",k.None="none",k.ScaleDown="scaleDown",k.Layout="layout";})(I||(I={}));var T;(function(k){k.Center="center",k.TopLeft="topLeft",k.TopCenter="topCenter",k.TopRight="topRight",k.CenterLeft="centerLeft",k.CenterRight="centerRight",k.BottomLeft="bottomLeft",k.BottomCenter="bottomCenter",k.BottomRight="bottomRight";})(T||(T={}));var N;(function(k){k.AlwaysDraw="alwaysDraw",k.DrawOnChanged="drawOnChanged";})(N||(N={}));var z=(function(){function k(d){var h,S,G,W,J,de,ye;this.fit=(h=d?.fit)!==null&&h!==void 0?h:I.Contain,this.alignment=(S=d?.alignment)!==null&&S!==void 0?S:T.Center,this.layoutScaleFactor=(G=d?.layoutScaleFactor)!==null&&G!==void 0?G:1,this.minX=(W=d?.minX)!==null&&W!==void 0?W:0,this.minY=(J=d?.minY)!==null&&J!==void 0?J:0,this.maxX=(de=d?.maxX)!==null&&de!==void 0?de:0,this.maxY=(ye=d?.maxY)!==null&&ye!==void 0?ye:0;}return k.new=function(d){var h=d.fit,S=d.alignment,G=d.minX,W=d.minY,J=d.maxX,de=d.maxY;return console.warn("This function is deprecated: please use `new Layout({})` instead"),new k({fit:h,alignment:S,minX:G,minY:W,maxX:J,maxY:de})},k.prototype.copyWith=function(d){var h=d.fit,S=d.alignment,G=d.layoutScaleFactor,W=d.minX,J=d.minY,de=d.maxX,ye=d.maxY;return new k({fit:h??this.fit,alignment:S??this.alignment,layoutScaleFactor:G??this.layoutScaleFactor,minX:W??this.minX,minY:J??this.minY,maxX:de??this.maxX,maxY:ye??this.maxY})},k.prototype.runtimeFit=function(d){if(this.cachedRuntimeFit)return this.cachedRuntimeFit;var h;return this.fit===I.Cover?h=d.Fit.cover:this.fit===I.Contain?h=d.Fit.contain:this.fit===I.Fill?h=d.Fit.fill:this.fit===I.FitWidth?h=d.Fit.fitWidth:this.fit===I.FitHeight?h=d.Fit.fitHeight:this.fit===I.ScaleDown?h=d.Fit.scaleDown:this.fit===I.Layout?h=d.Fit.layout:h=d.Fit.none,this.cachedRuntimeFit=h,h},k.prototype.runtimeAlignment=function(d){if(this.cachedRuntimeAlignment)return this.cachedRuntimeAlignment;var h;return this.alignment===T.TopLeft?h=d.Alignment.topLeft:this.alignment===T.TopCenter?h=d.Alignment.topCenter:this.alignment===T.TopRight?h=d.Alignment.topRight:this.alignment===T.CenterLeft?h=d.Alignment.centerLeft:this.alignment===T.CenterRight?h=d.Alignment.centerRight:this.alignment===T.BottomLeft?h=d.Alignment.bottomLeft:this.alignment===T.BottomCenter?h=d.Alignment.bottomCenter:this.alignment===T.BottomRight?h=d.Alignment.bottomRight:h=d.Alignment.center,this.cachedRuntimeAlignment=h,h},k})(),O=(function(){function k(){}return k.loadRuntime=function(){a.default({locateFile:function(){return k.wasmURL}}).then(function(d){var h;for(k.runtime=d;k.callBackQueue.length>0;)(h=k.callBackQueue.shift())===null||h===void 0||h(k.runtime);}).catch(function(d){var h={message:d?.message||"Unknown error",type:d?.name||"Error",wasmError:d instanceof WebAssembly.CompileError||d instanceof WebAssembly.RuntimeError,originalError:d};console.debug("Rive WASM load error details:",h);var S="https://cdn.jsdelivr.net/npm/".concat(l.name,"@").concat(l.version,"/rive_fallback.wasm");if(k.wasmURL.toLowerCase()!==S)console.warn("Failed to load WASM from ".concat(k.wasmURL," (").concat(h.message,"), trying jsdelivr as a backup")),k.setWasmUrl(S),k.loadRuntime();else {var G=["Could not load Rive WASM file from ".concat(k.wasmURL," or ").concat(S,"."),"Possible reasons:","- Network connection is down","- WebAssembly is not supported in this environment","- The WASM file is corrupted or incompatible",`
Error details:`,"- Type: ".concat(h.type),"- Message: ".concat(h.message),"- WebAssembly-specific error: ".concat(h.wasmError),`
To resolve, you may need to:`,"1. Check your network connection","2. Set a new WASM source via RuntimeLoader.setWasmUrl()","3. Call RuntimeLoader.loadRuntime() again"].join(`
`);console.error(G);}});},k.getInstance=function(d){k.isLoading||(k.isLoading=true,k.loadRuntime()),k.runtime?d(k.runtime):k.callBackQueue.push(d);},k.awaitInstance=function(){return new Promise(function(d){return k.getInstance(function(h){return d(h)})})},k.setWasmUrl=function(d){k.wasmURL=d;},k.getWasmUrl=function(){return k.wasmURL},k.isLoading=false,k.callBackQueue=[],k.wasmURL="https://unpkg.com/".concat(l.name,"@").concat(l.version,"/rive.wasm"),k})(),M;(function(k){k[k.Number=56]="Number",k[k.Trigger=58]="Trigger",k[k.Boolean=59]="Boolean";})(M||(M={}));var F=(function(){function k(d,h){this.type=d,this.runtimeInput=h;}return Object.defineProperty(k.prototype,"name",{get:function(){return this.runtimeInput.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"value",{get:function(){return this.runtimeInput.value},set:function(d){this.runtimeInput.value=d;},enumerable:false,configurable:true}),k.prototype.fire=function(){this.type===M.Trigger&&this.runtimeInput.fire();},k.prototype.delete=function(){this.runtimeInput=null;},k})(),L;(function(k){k[k.General=128]="General",k[k.OpenUrl=131]="OpenUrl";})(L||(L={}));var C=(function(){function k(d){this.isBindableArtboard=false,this.isBindableArtboard=d;}return k})(),E=(function(k){p(d,k);function d(h,S){var G=k.call(this,false)||this;return G.nativeArtboard=h,G.file=S,G}return d})(C),B=(function(k){p(d,k);function d(h){var S=k.call(this,true)||this;return S.selfUnref=false,S.nativeArtboard=h,S}return Object.defineProperty(d.prototype,"viewModel",{set:function(h){this.nativeViewModel=h.nativeInstance;},enumerable:false,configurable:true}),d.prototype.destroy=function(){var h;this.selfUnref&&(this.nativeArtboard.unref(),(h=this.nativeViewModel)===null||h===void 0||h.unref());},d})(C),j=(function(){function k(d,h,S,G){this.stateMachine=d,this.playing=S,this.artboard=G,this.inputs=[],this.instance=new h.StateMachineInstance(d,G),this.initInputs(h);}return Object.defineProperty(k.prototype,"name",{get:function(){return this.stateMachine.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"statesChanged",{get:function(){for(var d=[],h=0;h<this.instance.stateChangedCount();h++)d.push(this.instance.stateChangedNameByIndex(h));return d},enumerable:false,configurable:true}),k.prototype.advance=function(d){this.instance.advance(d);},k.prototype.advanceAndApply=function(d){this.instance.advanceAndApply(d);},k.prototype.reportedEventCount=function(){return this.instance.reportedEventCount()},k.prototype.reportedEventAt=function(d){return this.instance.reportedEventAt(d)},k.prototype.initInputs=function(d){for(var h=0;h<this.instance.inputCount();h++){var S=this.instance.input(h);this.inputs.push(this.mapRuntimeInput(S,d));}},k.prototype.mapRuntimeInput=function(d,h){if(d.type===h.SMIInput.bool)return new F(M.Boolean,d.asBool());if(d.type===h.SMIInput.number)return new F(M.Number,d.asNumber());if(d.type===h.SMIInput.trigger)return new F(M.Trigger,d.asTrigger())},k.prototype.cleanup=function(){this.inputs.forEach(function(d){d.delete();}),this.inputs.length=0,this.instance.delete();},k.prototype.bindViewModelInstance=function(d){d.runtimeInstance!=null&&this.instance.bindViewModelInstance(d.runtimeInstance);},k})(),V=(function(){function k(d,h,S,G,W){G===void 0&&(G=[]),W===void 0&&(W=[]),this.runtime=d,this.artboard=h,this.eventManager=S,this.animations=G,this.stateMachines=W;}return k.prototype.add=function(d,h,S){if(S===void 0&&(S=true),d=ut(d),d.length===0)this.animations.forEach(function(Ve){return Ve.playing=h}),this.stateMachines.forEach(function(Ve){return Ve.playing=h});else for(var G=this.animations.map(function(Ve){return Ve.name}),W=this.stateMachines.map(function(Ve){return Ve.name}),J=0;J<d.length;J++){var de=G.indexOf(d[J]),ye=W.indexOf(d[J]);if(de>=0||ye>=0)de>=0?this.animations[de].playing=h:this.stateMachines[ye].playing=h;else {var ge=this.artboard.animationByName(d[J]);if(ge){var we=new u.Animation(ge,this.artboard,this.runtime,h);we.advance(0),we.apply(1),this.animations.push(we);}else {var Je=this.artboard.stateMachineByName(d[J]);if(Je){var it=new j(Je,this.runtime,h,this.artboard);this.stateMachines.push(it);}}}}return S&&(h?this.eventManager.fire({type:U.Play,data:this.playing}):this.eventManager.fire({type:U.Pause,data:this.paused})),h?this.playing:this.paused},k.prototype.initLinearAnimations=function(d,h){for(var S=this.animations.map(function(ye){return ye.name}),G=0;G<d.length;G++){var W=S.indexOf(d[G]);if(W>=0)this.animations[W].playing=h;else {var J=this.artboard.animationByName(d[G]);if(J){var de=new u.Animation(J,this.artboard,this.runtime,h);de.advance(0),de.apply(1),this.animations.push(de);}else console.error("Animation with name ".concat(d[G]," not found."));}}},k.prototype.initStateMachines=function(d,h){for(var S=this.stateMachines.map(function(ye){return ye.name}),G=0;G<d.length;G++){var W=S.indexOf(d[G]);if(W>=0)this.stateMachines[W].playing=h;else {var J=this.artboard.stateMachineByName(d[G]);if(J){var de=new j(J,this.runtime,h,this.artboard);this.stateMachines.push(de);}else console.warn("State Machine with name ".concat(d[G]," not found.")),this.initLinearAnimations([d[G]],h);}}},k.prototype.play=function(d){return this.add(d,true)},k.prototype.advanceIfPaused=function(){this.stateMachines.forEach(function(d){d.playing||d.advanceAndApply(0);});},k.prototype.pause=function(d){return this.add(d,false)},k.prototype.scrub=function(d,h){var S=this.animations.filter(function(G){return d.includes(G.name)});return S.forEach(function(G){return G.scrubTo=h}),S.map(function(G){return G.name})},Object.defineProperty(k.prototype,"playing",{get:function(){return this.animations.filter(function(d){return d.playing}).map(function(d){return d.name}).concat(this.stateMachines.filter(function(d){return d.playing}).map(function(d){return d.name}))},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"paused",{get:function(){return this.animations.filter(function(d){return !d.playing}).map(function(d){return d.name}).concat(this.stateMachines.filter(function(d){return !d.playing}).map(function(d){return d.name}))},enumerable:false,configurable:true}),k.prototype.stop=function(d){var h=this;d=ut(d);var S=[];if(d.length===0)S=this.animations.map(function(J){return J.name}).concat(this.stateMachines.map(function(J){return J.name})),this.animations.forEach(function(J){return J.cleanup()}),this.stateMachines.forEach(function(J){return J.cleanup()}),this.animations.splice(0,this.animations.length),this.stateMachines.splice(0,this.stateMachines.length);else {var G=this.animations.filter(function(J){return d.includes(J.name)});G.forEach(function(J){J.cleanup(),h.animations.splice(h.animations.indexOf(J),1);});var W=this.stateMachines.filter(function(J){return d.includes(J.name)});W.forEach(function(J){J.cleanup(),h.stateMachines.splice(h.stateMachines.indexOf(J),1);}),S=G.map(function(J){return J.name}).concat(W.map(function(J){return J.name}));}return this.eventManager.fire({type:U.Stop,data:S}),S},Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animations.reduce(function(d,h){return d||h.playing},false)||this.stateMachines.reduce(function(d,h){return d||h.playing},false)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return !this.isPlaying&&(this.animations.length>0||this.stateMachines.length>0)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){return this.animations.length===0&&this.stateMachines.length===0},enumerable:false,configurable:true}),k.prototype.atLeastOne=function(d,h){h===void 0&&(h=true);var S;return this.animations.length===0&&this.stateMachines.length===0&&(this.artboard.animationCount()>0?this.add([S=this.artboard.animationByIndex(0).name],d,h):this.artboard.stateMachineCount()>0&&this.add([S=this.artboard.stateMachineByIndex(0).name],d,h)),S},k.prototype.handleLooping=function(){for(var d=0,h=this.animations.filter(function(G){return G.playing});d<h.length;d++){var S=h[d];S.loopValue===0&&S.loopCount?(S.loopCount=0,this.stop(S.name)):S.loopValue===1&&S.loopCount?(this.eventManager.fire({type:U.Loop,data:{animation:S.name,type:ce.Loop}}),S.loopCount=0):S.loopValue===2&&S.loopCount>1&&(this.eventManager.fire({type:U.Loop,data:{animation:S.name,type:ce.PingPong}}),S.loopCount=0);}},k.prototype.handleStateChanges=function(){for(var d=[],h=0,S=this.stateMachines.filter(function(W){return W.playing});h<S.length;h++){var G=S[h];d.push.apply(d,G.statesChanged);}d.length>0&&this.eventManager.fire({type:U.StateChange,data:d});},k.prototype.handleAdvancing=function(d){this.eventManager.fire({type:U.Advance,data:d});},k})(),U;(function(k){k.Load="load",k.LoadError="loaderror",k.Play="play",k.Pause="pause",k.Stop="stop",k.Loop="loop",k.Draw="draw",k.Advance="advance",k.StateChange="statechange",k.RiveEvent="riveevent",k.AudioStatusChange="audiostatuschange";})(U||(U={}));var ce;(function(k){k.OneShot="oneshot",k.Loop="loop",k.PingPong="pingpong";})(ce||(ce={}));var Y=(function(){function k(d){d===void 0&&(d=[]),this.listeners=d;}return k.prototype.getListeners=function(d){return this.listeners.filter(function(h){return h.type===d})},k.prototype.add=function(d){this.listeners.includes(d)||this.listeners.push(d);},k.prototype.remove=function(d){for(var h=0;h<this.listeners.length;h++){var S=this.listeners[h];if(S.type===d.type&&S.callback===d.callback){this.listeners.splice(h,1);break}}},k.prototype.removeAll=function(d){var h=this;d?this.listeners.filter(function(S){return S.type===d}).forEach(function(S){return h.remove(S)}):this.listeners.splice(0,this.listeners.length);},k.prototype.fire=function(d){var h=this.getListeners(d.type);h.forEach(function(S){return S.callback(d)});},k})(),ie=(function(){function k(d){this.eventManager=d,this.queue=[];}return k.prototype.add=function(d){this.queue.push(d);},k.prototype.process=function(){for(;this.queue.length>0;){var d=this.queue.shift();d?.action&&d.action(),d?.event&&this.eventManager.fire(d.event);}},k})(),se;(function(k){k[k.AVAILABLE=0]="AVAILABLE",k[k.UNAVAILABLE=1]="UNAVAILABLE";})(se||(se={}));var ae=(function(k){p(d,k);function d(){var h=k!==null&&k.apply(this,arguments)||this;return h._started=false,h._enabled=false,h._status=se.UNAVAILABLE,h}return d.prototype.delay=function(h){return v(this,void 0,void 0,function(){return y(this,function(S){return [2,new Promise(function(G){return setTimeout(G,h)})]})})},d.prototype.timeout=function(){return v(this,void 0,void 0,function(){return y(this,function(h){return [2,new Promise(function(S,G){return setTimeout(G,50)})]})})},d.prototype.reportToListeners=function(){this.fire({type:U.AudioStatusChange}),this.removeAll();},d.prototype.enableAudio=function(){return v(this,void 0,void 0,function(){return y(this,function(h){return this._enabled||(this._enabled=true,this._status=se.AVAILABLE,this.reportToListeners()),[2]})})},d.prototype.testAudio=function(){return v(this,void 0,void 0,function(){return y(this,function(h){switch(h.label){case 0:if(!(this._status===se.UNAVAILABLE&&this._audioContext!==null))return [3,4];h.label=1;case 1:return h.trys.push([1,3,,4]),[4,Promise.race([this._audioContext.resume(),this.timeout()])];case 2:return h.sent(),this.enableAudio(),[3,4];case 3:return h.sent(),[3,4];case 4:return [2]}})})},d.prototype._establishAudio=function(){return v(this,void 0,void 0,function(){return y(this,function(h){switch(h.label){case 0:return this._started?[3,5]:(this._started=true,typeof window>"u"?(this.enableAudio(),[3,5]):[3,1]);case 1:this._audioContext=new AudioContext,this.listenForUserAction(),h.label=2;case 2:return this._status!==se.UNAVAILABLE?[3,5]:[4,this.testAudio()];case 3:return h.sent(),[4,this.delay(1e3)];case 4:return h.sent(),[3,2];case 5:return [2]}})})},d.prototype.listenForUserAction=function(){var h=this,S=function(){return v(h,void 0,void 0,function(){return y(this,function(G){return this.enableAudio(),[2]})})};document.addEventListener("pointerdown",S,{once:true});},d.prototype.establishAudio=function(){return v(this,void 0,void 0,function(){return y(this,function(h){return this._establishAudio(),[2]})})},Object.defineProperty(d.prototype,"systemVolume",{get:function(){return this._status===se.UNAVAILABLE?(this.testAudio(),0):1},enumerable:false,configurable:true}),Object.defineProperty(d.prototype,"status",{get:function(){return this._status},enumerable:false,configurable:true}),d})(Y),ne=new ae,q=(function(){function k(){}return k.prototype.observe=function(){},k.prototype.unobserve=function(){},k.prototype.disconnect=function(){},k})(),Z=globalThis.ResizeObserver||q,R=(function(){function k(){var d=this;this._elementsMap=new Map,this._onObservedEntry=function(h){var S=d._elementsMap.get(h.target);S!==null?S.onResize(h.target.clientWidth==0||h.target.clientHeight==0):d._resizeObserver.unobserve(h.target);},this._onObserved=function(h){h.forEach(d._onObservedEntry);},this._resizeObserver=new Z(this._onObserved);}return k.prototype.add=function(d,h){var S={onResize:h,element:d};return this._elementsMap.set(d,S),this._resizeObserver.observe(d),S},k.prototype.remove=function(d){this._resizeObserver.unobserve(d.element),this._elementsMap.delete(d.element);},k})(),$=new R,Q=(function(){function k(d){this.enableRiveAssetCDN=true,this.referenceCount=0,this.destroyed=false,this.selfUnref=false,this.bindableArtboards=[],this.src=d.src,this.buffer=d.buffer,d.assetLoader&&(this.assetLoader=d.assetLoader),this.enableRiveAssetCDN=typeof d.enableRiveAssetCDN=="boolean"?d.enableRiveAssetCDN:true,this.eventManager=new Y,d.onLoad&&this.on(U.Load,d.onLoad),d.onLoadError&&this.on(U.LoadError,d.onLoadError);}return k.prototype.releaseFile=function(){var d;this.selfUnref&&((d=this.file)===null||d===void 0||d.unref()),this.file=null;},k.prototype.releaseBindableArtboards=function(){this.bindableArtboards.forEach(function(d){return d.destroy()});},k.prototype.initData=function(){return v(this,void 0,void 0,function(){var d,h,S,G,W;return y(this,function(J){switch(J.label){case 0:return this.src?(d=this,[4,gn(this.src)]):[3,2];case 1:d.buffer=J.sent(),J.label=2;case 2:return this.destroyed?[2]:(this.assetLoader&&(S=new f.CustomFileAssetLoaderWrapper(this.runtime,this.assetLoader),h=S.assetLoader),G=this,[4,this.runtime.load(new Uint8Array(this.buffer),h,this.enableRiveAssetCDN)]);case 3:return G.file=J.sent(),W=new f.FileFinalizer(this.file),f.finalizationRegistry.register(this,W),this.destroyed?(this.releaseFile(),[2]):(this.file!==null?this.eventManager.fire({type:U.Load,data:this}):this.fireLoadError(k.fileLoadErrorMessage),[2])}})})},k.prototype.init=function(){return v(this,void 0,void 0,function(){var d,h;return y(this,function(S){switch(S.label){case 0:if(!this.src&&!this.buffer)return this.fireLoadError(k.missingErrorMessage),[2];S.label=1;case 1:return S.trys.push([1,4,,5]),d=this,[4,O.awaitInstance()];case 2:return d.runtime=S.sent(),this.destroyed?[2]:[4,this.initData()];case 3:return S.sent(),[3,5];case 4:return h=S.sent(),this.fireLoadError(h instanceof Error?h.message:k.fileLoadErrorMessage),[3,5];case 5:return [2]}})})},k.prototype.fireLoadError=function(d){throw this.eventManager.fire({type:U.LoadError,data:d}),new Error(d)},k.prototype.on=function(d,h){this.eventManager.add({type:d,callback:h});},k.prototype.off=function(d,h){this.eventManager.remove({type:d,callback:h});},k.prototype.cleanup=function(){this.referenceCount-=1,this.referenceCount<=0&&(this.removeAllRiveEventListeners(),this.releaseFile(),this.releaseBindableArtboards(),this.destroyed=true);},k.prototype.removeAllRiveEventListeners=function(d){this.eventManager.removeAll(d);},k.prototype.getInstance=function(){if(this.file!==null)return this.referenceCount+=1,this.file},k.prototype.destroyIfUnused=function(){this.referenceCount<=0&&this.cleanup();},k.prototype.createBindableArtboard=function(d){if(d!=null){var h=new B(d);return (0, f.createFinalization)(h,h.nativeArtboard),this.bindableArtboards.push(h),h}return null},k.prototype.getArtboard=function(d){var h=this.file.artboardByName(d);if(h!=null)return new E(h,this)},k.prototype.getBindableArtboard=function(d){var h=this.file.bindableArtboardByName(d);return this.createBindableArtboard(h)},k.prototype.getDefaultBindableArtboard=function(){var d=this.file.bindableArtboardDefault();return this.createBindableArtboard(d)},k.prototype.internalBindableArtboardFromArtboard=function(d){var h=this.file.internalBindableArtboardFromArtboard(d);return this.createBindableArtboard(h)},k.prototype.viewModelByName=function(d){var h=this.file.viewModelByName(d);return h!==null?new le(h):null},k.missingErrorMessage="Rive source file or data buffer required",k.fileLoadErrorMessage="The file failed to load",k})(),re=(function(){function k(d){var h=this,S,G;this.loaded=false,this.destroyed=false,this._observed=null,this.readyForPlaying=false,this.artboard=null,this.eventCleanup=null,this.shouldDisableRiveListeners=false,this.automaticallyHandleEvents=false,this.dispatchPointerExit=true,this.enableMultiTouch=false,this.enableRiveAssetCDN=true,this._volume=1,this._artboardWidth=void 0,this._artboardHeight=void 0,this._devicePixelRatioUsed=1,this._hasZeroSize=false,this._needsRedraw=false,this._currentCanvasWidth=0,this._currentCanvasHeight=0,this._audioEventListener=null,this._boundDraw=null,this._viewModelInstance=null,this._dataEnums=null,this.drawOptimization=N.DrawOnChanged,this.durations=[],this.frameTimes=[],this.frameCount=0,this.isTouchScrollEnabled=false,this.onCanvasResize=function(W){var J=h._hasZeroSize!==W;h._hasZeroSize=W,W?(!h._layout.maxX||!h._layout.maxY)&&h.resizeToCanvas():J&&h.resizeDrawingSurfaceToCanvas();},this.renderSecondTimer=0,this._boundDraw=this.draw.bind(this),this.canvas=d.canvas,d.canvas.constructor===HTMLCanvasElement&&(this._observed=$.add(this.canvas,this.onCanvasResize)),this._currentCanvasWidth=this.canvas.width,this._currentCanvasHeight=this.canvas.height,this.src=d.src,this.buffer=d.buffer,this.riveFile=d.riveFile,this.layout=(S=d.layout)!==null&&S!==void 0?S:new z,this.shouldDisableRiveListeners=!!d.shouldDisableRiveListeners,this.isTouchScrollEnabled=!!d.isTouchScrollEnabled,this.automaticallyHandleEvents=!!d.automaticallyHandleEvents,this.dispatchPointerExit=d.dispatchPointerExit===false?d.dispatchPointerExit:this.dispatchPointerExit,this.enableMultiTouch=!!d.enableMultiTouch,this.drawOptimization=(G=d.drawingOptions)!==null&&G!==void 0?G:this.drawOptimization,this.enableRiveAssetCDN=d.enableRiveAssetCDN===void 0?true:d.enableRiveAssetCDN,this.eventManager=new Y,d.onLoad&&this.on(U.Load,d.onLoad),d.onLoadError&&this.on(U.LoadError,d.onLoadError),d.onPlay&&this.on(U.Play,d.onPlay),d.onPause&&this.on(U.Pause,d.onPause),d.onStop&&this.on(U.Stop,d.onStop),d.onLoop&&this.on(U.Loop,d.onLoop),d.onStateChange&&this.on(U.StateChange,d.onStateChange),d.onAdvance&&this.on(U.Advance,d.onAdvance),d.onload&&!d.onLoad&&this.on(U.Load,d.onload),d.onloaderror&&!d.onLoadError&&this.on(U.LoadError,d.onloaderror),d.onplay&&!d.onPlay&&this.on(U.Play,d.onplay),d.onpause&&!d.onPause&&this.on(U.Pause,d.onpause),d.onstop&&!d.onStop&&this.on(U.Stop,d.onstop),d.onloop&&!d.onLoop&&this.on(U.Loop,d.onloop),d.onstatechange&&!d.onStateChange&&this.on(U.StateChange,d.onstatechange),d.assetLoader&&(this.assetLoader=d.assetLoader),this.taskQueue=new ie(this.eventManager),this.init({src:this.src,buffer:this.buffer,riveFile:this.riveFile,autoplay:d.autoplay,autoBind:d.autoBind,animations:d.animations,stateMachines:d.stateMachines,artboard:d.artboard,useOffscreenRenderer:d.useOffscreenRenderer});}return Object.defineProperty(k.prototype,"viewModelCount",{get:function(){return this.file.viewModelCount()},enumerable:false,configurable:true}),k.new=function(d){return console.warn("This function is deprecated: please use `new Rive({})` instead"),new k(d)},k.prototype.onSystemAudioChanged=function(){this.volume=this._volume;},k.prototype.init=function(d){var h=this,S=d.src,G=d.buffer,W=d.riveFile,J=d.animations,de=d.stateMachines,ye=d.artboard,ge=d.autoplay,we=ge===void 0?false:ge,Je=d.useOffscreenRenderer,it=Je===void 0?false:Je,Ve=d.autoBind,_t=Ve===void 0?false:Ve;if(!this.destroyed){if(this.src=S,this.buffer=G,this.riveFile=W,!this.src&&!this.buffer&&!this.riveFile)throw new A(k.missingErrorMessage);var mt=ut(J),qt=ut(de);this.loaded=false,this.readyForPlaying=false,O.awaitInstance().then(function(Xt){h.destroyed||(h.runtime=Xt,h.removeRiveListeners(),h.deleteRiveRenderer(),h.renderer=h.runtime.makeRenderer(h.canvas,it),h.canvas.width||h.canvas.height||h.resizeDrawingSurfaceToCanvas(),h.initData(ye,mt,qt,we,_t).then(function(nn){if(nn)return h.setupRiveListeners()}).catch(function(nn){console.error(nn);}));}).catch(function(Xt){console.error(Xt);});}},k.prototype.setupRiveListeners=function(d){var h=this;if(this.eventCleanup&&this.eventCleanup(),!this.shouldDisableRiveListeners){var S=(this.animator.stateMachines||[]).filter(function(de){return de.playing&&h.runtime.hasListeners(de.instance)}).map(function(de){return de.instance}),G=this.isTouchScrollEnabled,W=this.dispatchPointerExit,J=this.enableMultiTouch;d&&"isTouchScrollEnabled"in d&&(G=d.isTouchScrollEnabled),this.eventCleanup=(0, f.registerTouchInteractions)({canvas:this.canvas,artboard:this.artboard,stateMachines:S,renderer:this.renderer,rive:this.runtime,fit:this._layout.runtimeFit(this.runtime),alignment:this._layout.runtimeAlignment(this.runtime),isTouchScrollEnabled:G,dispatchPointerExit:W,enableMultiTouch:J,layoutScaleFactor:this._layout.layoutScaleFactor});}},k.prototype.removeRiveListeners=function(){this.eventCleanup&&(this.eventCleanup(),this.eventCleanup=null);},k.prototype.initializeAudio=function(){var d=this,h;ne.status==se.UNAVAILABLE&&!((h=this.artboard)===null||h===void 0)&&h.hasAudio&&this._audioEventListener===null&&(this._audioEventListener={type:U.AudioStatusChange,callback:function(){return d.onSystemAudioChanged()}},ne.add(this._audioEventListener),ne.establishAudio());},k.prototype.initArtboardSize=function(){this.artboard&&(this._artboardWidth=this.artboard.width=this._artboardWidth||this.artboard.width,this._artboardHeight=this.artboard.height=this._artboardHeight||this.artboard.height);},k.prototype.initData=function(d,h,S,G,W){return v(this,void 0,void 0,function(){var J,de,ye,ge;return y(this,function(we){switch(we.label){case 0:return we.trys.push([0,3,,4]),this.riveFile!=null?[3,2]:(J=new Q({src:this.src,buffer:this.buffer,enableRiveAssetCDN:this.enableRiveAssetCDN,assetLoader:this.assetLoader}),this.riveFile=J,[4,J.init()]);case 1:if(we.sent(),this.destroyed)return J.destroyIfUnused(),[2,false];we.label=2;case 2:return this.file=this.riveFile.getInstance(),this.initArtboard(d,h,S,G,W),this.initArtboardSize(),this.initializeAudio(),this.loaded=true,this.eventManager.fire({type:U.Load,data:(ge=this.src)!==null&&ge!==void 0?ge:"buffer"}),this.animator.advanceIfPaused(),this.readyForPlaying=true,this.taskQueue.process(),this.drawFrame(),[2,true];case 3:return de=we.sent(),ye=P(de),console.warn(ye),this.eventManager.fire({type:U.LoadError,data:ye}),[2,Promise.reject(ye)];case 4:return [2]}})})},k.prototype.initArtboard=function(d,h,S,G,W){if(this.file){var J=d?this.file.artboardByName(d):this.file.defaultArtboard();if(!J){var de="Invalid artboard name or no default artboard";console.warn(de),this.eventManager.fire({type:U.LoadError,data:de});return}this.artboard=J,J.volume=this._volume*ne.systemVolume,this.animator=new V(this.runtime,this.artboard,this.eventManager);var ye;if(h.length>0||S.length>0?(ye=h.concat(S),this.animator.initLinearAnimations(h,G),this.animator.initStateMachines(S,G)):ye=[this.animator.atLeastOne(G,false)],this.taskQueue.add({event:{type:G?U.Play:U.Pause,data:ye}}),W){var ge=this.file.defaultArtboardViewModel(J);if(ge!==null){var we=ge.defaultInstance();if(we!==null){var Je=new $e(we,null);(0, f.createFinalization)(Je,Je.runtimeInstance),this.bindViewModelInstance(Je);}}}}},k.prototype.drawFrame=function(){var d,h;!((d=document?.timeline)===null||d===void 0)&&d.currentTime?this.loaded&&this.artboard&&!this.frameRequestId&&(this._boundDraw(document.timeline.currentTime),(h=this.runtime)===null||h===void 0||h.resolveAnimationFrame()):this.scheduleRendering();},k.prototype._canvasSizeChanged=function(){var d=false;return this.canvas&&(this.canvas.width!==this._currentCanvasWidth&&(this._currentCanvasWidth=this.canvas.width,d=true),this.canvas.height!==this._currentCanvasHeight&&(this._currentCanvasHeight=this.canvas.height,d=true)),d},k.prototype.draw=function(d,h){var S;this.frameRequestId=null;var G=performance.now();this.lastRenderTime||(this.lastRenderTime=d),this.renderSecondTimer+=d-this.lastRenderTime,this.renderSecondTimer>5e3&&(this.renderSecondTimer=0,h?.());var W=(d-this.lastRenderTime)/1e3;this.lastRenderTime=d;for(var J=this.animator.animations.filter(function(on){return on.playing||on.needsScrub}).sort(function(on){return on.needsScrub?-1:1}),de=0,ye=J;de<ye.length;de++){var ge=ye[de];ge.advance(W),ge.instance.didLoop&&(ge.loopCount+=1),ge.apply(1);}for(var we=this.animator.stateMachines.filter(function(on){return on.playing}),Je=0,it=we;Je<it.length;Je++){var Ve=it[Je],_t=Ve.reportedEventCount();if(_t)for(var mt=0;mt<_t;mt++){var qt=Ve.reportedEventAt(mt);if(qt)if(qt.type===L.OpenUrl){if(this.eventManager.fire({type:U.RiveEvent,data:qt}),this.automaticallyHandleEvents){var Xt=document.createElement("a"),nn=qt,Bn=nn.url,Fe=nn.target,zn=(0, f.sanitizeUrl)(Bn);Bn&&Xt.setAttribute("href",zn),Fe&&Xt.setAttribute("target",Fe),zn&&zn!==f.BLANK_URL&&Xt.click();}}else this.eventManager.fire({type:U.RiveEvent,data:qt});}Ve.advanceAndApply(W);}this.animator.stateMachines.length==0&&this.artboard.advance(W);var rn=this.renderer;this._hasZeroSize||(this.drawOptimization==N.AlwaysDraw||this.artboard.didChange()||this._needsRedraw||this._canvasSizeChanged())&&(rn.clear(),rn.save(),this.alignRenderer(),this.artboard.draw(rn),rn.restore(),rn.flush(),this._needsRedraw=false),this.animator.handleLooping(),this.animator.handleStateChanges(),this.animator.handleAdvancing(W),this.frameCount++;var Ke=performance.now();for(this.frameTimes.push(Ke),this.durations.push(Ke-G);this.frameTimes[0]<=Ke-1e3;)this.frameTimes.shift(),this.durations.shift();(S=this._viewModelInstance)===null||S===void 0||S.handleCallbacks(),this.animator.isPlaying?this.scheduleRendering():this.animator.isPaused?this.lastRenderTime=0:this.animator.isStopped&&(this.lastRenderTime=0);},k.prototype.alignRenderer=function(){var d=this,h=d.renderer,S=d.runtime,G=d._layout,W=d.artboard;h.align(G.runtimeFit(S),G.runtimeAlignment(S),{minX:G.minX,minY:G.minY,maxX:G.maxX,maxY:G.maxY},W.bounds,this._devicePixelRatioUsed*G.layoutScaleFactor);},Object.defineProperty(k.prototype,"fps",{get:function(){return this.durations.length},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"frameTime",{get:function(){return this.durations.length===0?0:(this.durations.reduce(function(d,h){return d+h},0)/this.durations.length).toFixed(4)},enumerable:false,configurable:true}),k.prototype.cleanup=function(){var d,h;this.destroyed=true,this.stopRendering(),this.cleanupInstances(),this._observed!==null&&$.remove(this._observed),this.removeRiveListeners(),this.file&&((d=this.riveFile)===null||d===void 0||d.cleanup(),this.file=null),this.riveFile=null,this.deleteRiveRenderer(),this._audioEventListener!==null&&(ne.remove(this._audioEventListener),this._audioEventListener=null),(h=this._viewModelInstance)===null||h===void 0||h.cleanup(),this._viewModelInstance=null,this._dataEnums=null;},k.prototype.deleteRiveRenderer=function(){var d;(d=this.renderer)===null||d===void 0||d.delete(),this.renderer=null;},k.prototype.cleanupInstances=function(){this.eventCleanup!==null&&this.eventCleanup(),this.stop(),this.artboard&&(this.artboard.delete(),this.artboard=null);},k.prototype.retrieveTextRun=function(d){var h;if(!d){console.warn("No text run name provided");return}if(!this.artboard){console.warn("Tried to access text run, but the Artboard is null");return}var S=this.artboard.textRun(d);if(!S){console.warn("Could not access a text run with name '".concat(d,"' in the '").concat((h=this.artboard)===null||h===void 0?void 0:h.name,"' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."));return}return S},k.prototype.getTextRunValue=function(d){var h=this.retrieveTextRun(d);return h?h.text:void 0},k.prototype.setTextRunValue=function(d,h){var S=this.retrieveTextRun(d);S&&(S.text=h);},k.prototype.play=function(d,h){var S=this;if(d=ut(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return S.play(d,h)}});return}this.animator.play(d),this.eventCleanup&&this.eventCleanup(),this.setupRiveListeners(),this.startRendering();},k.prototype.pause=function(d){var h=this;if(d=ut(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return h.pause(d)}});return}this.eventCleanup&&this.eventCleanup(),this.animator.pause(d);},k.prototype.scrub=function(d,h){var S=this;if(d=ut(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return S.scrub(d,h)}});return}this.animator.scrub(d,h||0),this.drawFrame();},k.prototype.stop=function(d){var h=this;if(d=ut(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return h.stop(d)}});return}this.animator&&this.animator.stop(d),this.eventCleanup&&this.eventCleanup();},k.prototype.reset=function(d){var h,S,G=d?.artboard,W=ut(d?.animations),J=ut(d?.stateMachines),de=(h=d?.autoplay)!==null&&h!==void 0?h:false,ye=(S=d?.autoBind)!==null&&S!==void 0?S:false;this.cleanupInstances(),this.initArtboard(G,W,J,de,ye),this.taskQueue.process();},k.prototype.load=function(d){this.file=null,this.stop(),this.init(d);},Object.defineProperty(k.prototype,"layout",{get:function(){return this._layout},set:function(d){this._layout=d,(!d.maxX||!d.maxY)&&this.resizeToCanvas(),this.loaded&&!this.animator.isPlaying&&this.drawFrame();},enumerable:false,configurable:true}),k.prototype.resizeToCanvas=function(){this._layout=this.layout.copyWith({minX:0,minY:0,maxX:this.canvas.width,maxY:this.canvas.height});},k.prototype.resizeDrawingSurfaceToCanvas=function(d){if(this.canvas instanceof HTMLCanvasElement&&window){var h=this.canvas.getBoundingClientRect(),S=h.width,G=h.height,W=d||window.devicePixelRatio||1;if(this.devicePixelRatioUsed=W,this.canvas.width=W*S,this.canvas.height=W*G,this._needsRedraw=true,this.resizeToCanvas(),this.drawFrame(),this.layout.fit===I.Layout){var J=this._layout.layoutScaleFactor;this.artboard.width=S/J,this.artboard.height=G/J;}}},Object.defineProperty(k.prototype,"source",{get:function(){return this.src},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"activeArtboard",{get:function(){return this.artboard?this.artboard.name:""},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"animationNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var d=[],h=0;h<this.artboard.animationCount();h++)d.push(this.artboard.animationByIndex(h).name);return d},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"stateMachineNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var d=[],h=0;h<this.artboard.stateMachineCount();h++)d.push(this.artboard.stateMachineByIndex(h).name);return d},enumerable:false,configurable:true}),k.prototype.stateMachineInputs=function(d){if(this.loaded){var h=this.animator.stateMachines.find(function(S){return S.name===d});return h?.inputs}},k.prototype.retrieveInputAtPath=function(d,h){if(!d){console.warn("No input name provided for path '".concat(h,"'"));return}if(!this.artboard){console.warn("Tried to access input: '".concat(d,"', at path: '").concat(h,"', but the Artboard is null"));return}var S=this.artboard.inputByPath(d,h);if(!S){console.warn("Could not access an input with name: '".concat(d,"', at path:'").concat(h,"'"));return}return S},k.prototype.setBooleanStateAtPath=function(d,h,S){var G=this.retrieveInputAtPath(d,S);G&&(G.type===M.Boolean?G.asBool().value=h:console.warn("Input with name: '".concat(d,"', at path:'").concat(S,"' is not a boolean")));},k.prototype.setNumberStateAtPath=function(d,h,S){var G=this.retrieveInputAtPath(d,S);G&&(G.type===M.Number?G.asNumber().value=h:console.warn("Input with name: '".concat(d,"', at path:'").concat(S,"' is not a number")));},k.prototype.fireStateAtPath=function(d,h){var S=this.retrieveInputAtPath(d,h);S&&(S.type===M.Trigger?S.asTrigger().fire():console.warn("Input with name: '".concat(d,"', at path:'").concat(h,"' is not a trigger")));},k.prototype.retrieveTextAtPath=function(d,h){if(!d){console.warn("No text name provided for path '".concat(h,"'"));return}if(!h){console.warn("No path provided for text '".concat(d,"'"));return}if(!this.artboard){console.warn("Tried to access text: '".concat(d,"', at path: '").concat(h,"', but the Artboard is null"));return}var S=this.artboard.textByPath(d,h);if(!S){console.warn("Could not access text with name: '".concat(d,"', at path:'").concat(h,"'"));return}return S},k.prototype.getTextRunValueAtPath=function(d,h){var S=this.retrieveTextAtPath(d,h);if(!S){console.warn("Could not get text with name: '".concat(d,"', at path:'").concat(h,"'"));return}return S.text},k.prototype.setTextRunValueAtPath=function(d,h,S){var G=this.retrieveTextAtPath(d,S);if(!G){console.warn("Could not set text with name: '".concat(d,"', at path:'").concat(S,"'"));return}G.text=h;},Object.defineProperty(k.prototype,"playingStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(d){return d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"playingAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(d){return d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(d){return !d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(d){return !d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animator.isPlaying},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return this.animator.isPaused},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){var d,h;return (h=(d=this.animator)===null||d===void 0?void 0:d.isStopped)!==null&&h!==void 0?h:true},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"bounds",{get:function(){return this.artboard?this.artboard.bounds:void 0},enumerable:false,configurable:true}),k.prototype.on=function(d,h){this.eventManager.add({type:d,callback:h});},k.prototype.off=function(d,h){this.eventManager.remove({type:d,callback:h});},k.prototype.unsubscribe=function(d,h){console.warn("This function is deprecated: please use `off()` instead."),this.off(d,h);},k.prototype.removeAllRiveEventListeners=function(d){this.eventManager.removeAll(d);},k.prototype.unsubscribeAll=function(d){console.warn("This function is deprecated: please use `removeAllRiveEventListeners()` instead."),this.removeAllRiveEventListeners(d);},k.prototype.stopRendering=function(){this.loaded&&this.frameRequestId&&(this.runtime.cancelAnimationFrame?this.runtime.cancelAnimationFrame(this.frameRequestId):cancelAnimationFrame(this.frameRequestId),this.frameRequestId=null);},k.prototype.startRendering=function(){this.drawFrame();},k.prototype.scheduleRendering=function(){this.loaded&&this.artboard&&!this.frameRequestId&&(this.runtime.requestAnimationFrame?this.frameRequestId=this.runtime.requestAnimationFrame(this._boundDraw):this.frameRequestId=requestAnimationFrame(this._boundDraw));},k.prototype.enableFPSCounter=function(d){this.runtime.enableFPSCounter(d);},k.prototype.disableFPSCounter=function(){this.runtime.disableFPSCounter();},Object.defineProperty(k.prototype,"contents",{get:function(){if(this.loaded){for(var d={artboards:[]},h=0;h<this.file.artboardCount();h++){for(var S=this.file.artboardByIndex(h),G={name:S.name,animations:[],stateMachines:[]},W=0;W<S.animationCount();W++){var J=S.animationByIndex(W);G.animations.push(J.name);}for(var de=0;de<S.stateMachineCount();de++){for(var ye=S.stateMachineByIndex(de),ge=ye.name,we=new this.runtime.StateMachineInstance(ye,S),Je=[],it=0;it<we.inputCount();it++){var Ve=we.input(it);Je.push({name:Ve.name,type:Ve.type});}G.stateMachines.push({name:ge,inputs:Je});}d.artboards.push(G);}return d}},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"volume",{get:function(){return this.artboard&&this.artboard.volume!==this._volume&&(this._volume=this.artboard.volume),this._volume},set:function(d){this._volume=d,this.artboard&&(this.artboard.volume=d*ne.systemVolume);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardWidth",{get:function(){var d;return this.artboard?this.artboard.width:(d=this._artboardWidth)!==null&&d!==void 0?d:0},set:function(d){this._artboardWidth=d,this.artboard&&(this.artboard.width=d);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardHeight",{get:function(){var d;return this.artboard?this.artboard.height:(d=this._artboardHeight)!==null&&d!==void 0?d:0},set:function(d){this._artboardHeight=d,this.artboard&&(this.artboard.height=d);},enumerable:false,configurable:true}),k.prototype.resetArtboardSize=function(){this.artboard?(this.artboard.resetArtboardSize(),this._artboardWidth=this.artboard.width,this._artboardHeight=this.artboard.height):(this._artboardWidth=void 0,this._artboardHeight=void 0);},Object.defineProperty(k.prototype,"devicePixelRatioUsed",{get:function(){return this._devicePixelRatioUsed},set:function(d){this._devicePixelRatioUsed=d;},enumerable:false,configurable:true}),k.prototype.bindViewModelInstance=function(d){var h;this.artboard&&!this.destroyed&&d&&d.runtimeInstance&&(d.internalIncrementReferenceCount(),(h=this._viewModelInstance)===null||h===void 0||h.cleanup(),this._viewModelInstance=d,this.animator.stateMachines.length>0?this.animator.stateMachines.forEach(function(S){return S.bindViewModelInstance(d)}):this.artboard.bindViewModelInstance(d.runtimeInstance));},Object.defineProperty(k.prototype,"viewModelInstance",{get:function(){return this._viewModelInstance},enumerable:false,configurable:true}),k.prototype.viewModelByIndex=function(d){var h=this.file.viewModelByIndex(d);return h!==null?new le(h):null},k.prototype.viewModelByName=function(d){var h;return (h=this.riveFile)===null||h===void 0?void 0:h.viewModelByName(d)},k.prototype.enums=function(){if(this._dataEnums===null){var d=this.file.enums();this._dataEnums=d.map(function(h){return new ve(h)});}return this._dataEnums},k.prototype.defaultViewModel=function(){if(this.artboard){var d=this.file.defaultArtboardViewModel(this.artboard);if(d)return new le(d)}return null},k.prototype.getArtboard=function(d){var h,S;return (S=(h=this.riveFile)===null||h===void 0?void 0:h.getArtboard(d))!==null&&S!==void 0?S:null},k.prototype.getBindableArtboard=function(d){var h,S;return (S=(h=this.riveFile)===null||h===void 0?void 0:h.getBindableArtboard(d))!==null&&S!==void 0?S:null},k.prototype.getDefaultBindableArtboard=function(){var d,h;return (h=(d=this.riveFile)===null||d===void 0?void 0:d.getDefaultBindableArtboard())!==null&&h!==void 0?h:null},k.missingErrorMessage="Rive source file or data buffer required",k.cleanupErrorMessage="Attempt to use file after calling cleanup.",k})(),le=(function(){function k(d){this._viewModel=d;}return Object.defineProperty(k.prototype,"instanceCount",{get:function(){return this._viewModel.instanceCount},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModel.name},enumerable:false,configurable:true}),k.prototype.instanceByIndex=function(d){var h=this._viewModel.instanceByIndex(d);if(h!==null){var S=new $e(h,null);return (0, f.createFinalization)(S,h),S}return null},k.prototype.instanceByName=function(d){var h=this._viewModel.instanceByName(d);if(h!==null){var S=new $e(h,null);return (0, f.createFinalization)(S,h),S}return null},k.prototype.defaultInstance=function(){var d=this._viewModel.defaultInstance();if(d!==null){var h=new $e(d,null);return (0, f.createFinalization)(h,d),h}return null},k.prototype.instance=function(){var d=this._viewModel.instance();if(d!==null){var h=new $e(d,null);return (0, f.createFinalization)(h,d),h}return null},Object.defineProperty(k.prototype,"properties",{get:function(){return this._viewModel.getProperties()},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"instanceNames",{get:function(){return this._viewModel.getInstanceNames()},enumerable:false,configurable:true}),k})(),ve=(function(){function k(d){this._dataEnum=d;}return Object.defineProperty(k.prototype,"name",{get:function(){return this._dataEnum.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"values",{get:function(){return this._dataEnum.values},enumerable:false,configurable:true}),k})(),_e;(function(k){k.Number="number",k.String="string",k.Boolean="boolean",k.Color="color",k.Trigger="trigger",k.Enum="enum",k.List="list",k.Image="image",k.Artboard="artboard";})(_e||(_e={}));var $e=(function(){function k(d,h){this._parents=[],this._children=[],this._viewModelInstances=new Map,this._propertiesWithCallbacks=[],this._referenceCount=0,this.selfUnref=false,this._runtimeInstance=d,h!==null&&this._parents.push(h);}return Object.defineProperty(k.prototype,"runtimeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"nativeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),k.prototype.handleCallbacks=function(){this._propertiesWithCallbacks.length!==0&&(this._propertiesWithCallbacks.forEach(function(d){d.handleCallbacks();}),this._propertiesWithCallbacks.forEach(function(d){d.clearChanges();})),this._children.forEach(function(d){return d.handleCallbacks()});},k.prototype.addParent=function(d){this._parents.includes(d)||(this._parents.push(d),(this._propertiesWithCallbacks.length>0||this._children.length>0)&&d.addToViewModelCallbacks(this));},k.prototype.removeParent=function(d){var h=this._parents.indexOf(d);if(h!==-1){var S=this._parents[h];S.removeFromViewModelCallbacks(this),this._parents.splice(h,1);}},k.prototype.addToPropertyCallbacks=function(d){var h=this;this._propertiesWithCallbacks.includes(d)||(this._propertiesWithCallbacks.push(d),this._propertiesWithCallbacks.length>0&&this._parents.forEach(function(S){S.addToViewModelCallbacks(h);}));},k.prototype.removeFromPropertyCallbacks=function(d){var h=this;this._propertiesWithCallbacks.includes(d)&&(this._propertiesWithCallbacks=this._propertiesWithCallbacks.filter(function(S){return S!==d}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(S){S.removeFromViewModelCallbacks(h);}));},k.prototype.addToViewModelCallbacks=function(d){var h=this;this._children.includes(d)||(this._children.push(d),this._parents.forEach(function(S){S.addToViewModelCallbacks(h);}));},k.prototype.removeFromViewModelCallbacks=function(d){var h=this;this._children.includes(d)&&(this._children=this._children.filter(function(S){return S!==d}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(S){S.removeFromViewModelCallbacks(h);}));},k.prototype.clearCallbacks=function(){this._propertiesWithCallbacks.forEach(function(d){d.clearCallbacks();});},k.prototype.propertyFromPath=function(d,h){var S=d.split("/");return this.propertyFromPathSegments(S,0,h)},k.prototype.viewModelFromPathSegments=function(d,h){var S=this.internalViewModelInstance(d[h]);return S!==null?h==d.length-1?S:S.viewModelFromPathSegments(d,h++):null},k.prototype.propertyFromPathSegments=function(d,h,S){var G,W,J,de,ye,ge,we,Je,it,Ve,_t,mt,qt,Xt,nn,Bn,Fe,zn;if(h<d.length-1){var rn=this.internalViewModelInstance(d[h]);return rn!==null?rn.propertyFromPathSegments(d,h+1,S):null}var Ke=null;switch(S){case _e.Number:if(Ke=(W=(G=this._runtimeInstance)===null||G===void 0?void 0:G.number(d[h]))!==null&&W!==void 0?W:null,Ke!==null)return new ct(Ke,this);break;case _e.String:if(Ke=(de=(J=this._runtimeInstance)===null||J===void 0?void 0:J.string(d[h]))!==null&&de!==void 0?de:null,Ke!==null)return new Bt(Ke,this);break;case _e.Boolean:if(Ke=(ge=(ye=this._runtimeInstance)===null||ye===void 0?void 0:ye.boolean(d[h]))!==null&&ge!==void 0?ge:null,Ke!==null)return new Et(Ke,this);break;case _e.Color:if(Ke=(Je=(we=this._runtimeInstance)===null||we===void 0?void 0:we.color(d[h]))!==null&&Je!==void 0?Je:null,Ke!==null)return new tt(Ke,this);break;case _e.Trigger:if(Ke=(Ve=(it=this._runtimeInstance)===null||it===void 0?void 0:it.trigger(d[h]))!==null&&Ve!==void 0?Ve:null,Ke!==null)return new Wt(Ke,this);break;case _e.Enum:if(Ke=(mt=(_t=this._runtimeInstance)===null||_t===void 0?void 0:_t.enum(d[h]))!==null&&mt!==void 0?mt:null,Ke!==null)return new Lt(Ke,this);break;case _e.List:if(Ke=(Xt=(qt=this._runtimeInstance)===null||qt===void 0?void 0:qt.list(d[h]))!==null&&Xt!==void 0?Xt:null,Ke!==null)return new Ht(Ke,this);break;case _e.Image:if(Ke=(Bn=(nn=this._runtimeInstance)===null||nn===void 0?void 0:nn.image(d[h]))!==null&&Bn!==void 0?Bn:null,Ke!==null)return new Ne(Ke,this);break;case _e.Artboard:if(Ke=(zn=(Fe=this._runtimeInstance)===null||Fe===void 0?void 0:Fe.artboard(d[h]))!==null&&zn!==void 0?zn:null,Ke!==null)return new mn(Ke,this);break}return null},k.prototype.internalViewModelInstance=function(d){var h;if(this._viewModelInstances.has(d))return this._viewModelInstances.get(d);var S=(h=this._runtimeInstance)===null||h===void 0?void 0:h.viewModel(d);if(S!==null){var G=new k(S,this);return (0, f.createFinalization)(G,S),G.internalIncrementReferenceCount(),this._viewModelInstances.set(d,G),G}return null},k.prototype.number=function(d){var h=this.propertyFromPath(d,_e.Number);return h},k.prototype.string=function(d){var h=this.propertyFromPath(d,_e.String);return h},k.prototype.boolean=function(d){var h=this.propertyFromPath(d,_e.Boolean);return h},k.prototype.color=function(d){var h=this.propertyFromPath(d,_e.Color);return h},k.prototype.trigger=function(d){var h=this.propertyFromPath(d,_e.Trigger);return h},k.prototype.enum=function(d){var h=this.propertyFromPath(d,_e.Enum);return h},k.prototype.list=function(d){var h=this.propertyFromPath(d,_e.List);return h},k.prototype.image=function(d){var h=this.propertyFromPath(d,_e.Image);return h},k.prototype.artboard=function(d){var h=this.propertyFromPath(d,_e.Artboard);return h},k.prototype.viewModel=function(d){var h=d.split("/"),S=h.length>1?this.viewModelFromPathSegments(h.slice(0,h.length-1),0):this;return S!=null?S.internalViewModelInstance(h[h.length-1]):null},k.prototype.internalReplaceViewModel=function(d,h){var S;if(h.runtimeInstance!==null){var G=((S=this._runtimeInstance)===null||S===void 0?void 0:S.replaceViewModel(d,h.runtimeInstance))||false;if(G){h.internalIncrementReferenceCount();var W=this.internalViewModelInstance(d);W!==null&&(W.removeParent(this),this._children.includes(W)&&(this._children=this._children.filter(function(J){return J!==W})),W.cleanup()),this._viewModelInstances.set(d,h),h.addParent(this);}return G}return  false},k.prototype.replaceViewModel=function(d,h){var S,G=d.split("/"),W=G.length>1?this.viewModelFromPathSegments(G.slice(0,G.length-1),0):this;return (S=W?.internalReplaceViewModel(G[G.length-1],h))!==null&&S!==void 0?S:false},k.prototype.incrementReferenceCount=function(){var d;this._referenceCount++,(d=this._runtimeInstance)===null||d===void 0||d.incrementReferenceCount();},k.prototype.decrementReferenceCount=function(){var d;this._referenceCount--,(d=this._runtimeInstance)===null||d===void 0||d.decrementReferenceCount();},Object.defineProperty(k.prototype,"properties",{get:function(){var d;return ((d=this._runtimeInstance)===null||d===void 0?void 0:d.getProperties().map(function(h){return m({},h)}))||[]},enumerable:false,configurable:true}),k.prototype.internalIncrementReferenceCount=function(){this._referenceCount++;},k.prototype.cleanup=function(){var d=this,h;if(this._referenceCount--,this._referenceCount<=0){this.selfUnref&&((h=this._runtimeInstance)===null||h===void 0||h.unref()),this._runtimeInstance=null,this.clearCallbacks(),this._propertiesWithCallbacks=[],this._viewModelInstances.forEach(function(W){W.cleanup();}),this._viewModelInstances.clear();var S=b([],this._children);this._children.length=0;var G=b([],this._parents);this._parents.length=0,S.forEach(function(W){W.removeParent(d);}),G.forEach(function(W){W.removeFromViewModelCallbacks(d);});}},k})(),bt=(function(){function k(d,h){this.callbacks=[],this._viewModelInstanceValue=d,this._parentViewModel=h;}return k.prototype.on=function(d){this.callbacks.length===0&&this._viewModelInstanceValue.clearChanges(),this.callbacks.includes(d)||(this.callbacks.push(d),this._parentViewModel.addToPropertyCallbacks(this));},k.prototype.off=function(d){d?this.callbacks=this.callbacks.filter(function(h){return h!==d}):this.callbacks.length=0,this.callbacks.length===0&&this._parentViewModel.removeFromPropertyCallbacks(this);},k.prototype.internalHandleCallback=function(d){},k.prototype.handleCallbacks=function(){var d=this;this._viewModelInstanceValue.hasChanged&&this.callbacks.forEach(function(h){d.internalHandleCallback(h);});},k.prototype.clearChanges=function(){this._viewModelInstanceValue.clearChanges();},k.prototype.clearCallbacks=function(){this.callbacks.length=0;},Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModelInstanceValue.name},enumerable:false,configurable:true}),k})(),Bt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(bt),ct=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(bt),Et=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(bt),Wt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return d.prototype.trigger=function(){return this._viewModelInstanceValue.trigger()},d.prototype.internalHandleCallback=function(h){h();},d})(bt),Lt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),Object.defineProperty(d.prototype,"valueIndex",{get:function(){return this._viewModelInstanceValue.valueIndex},set:function(h){this._viewModelInstanceValue.valueIndex=h;},enumerable:false,configurable:true}),Object.defineProperty(d.prototype,"values",{get:function(){return this._viewModelInstanceValue.values},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(bt),Ht=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"length",{get:function(){return this._viewModelInstanceValue.size},enumerable:false,configurable:true}),d.prototype.addInstance=function(h){h.runtimeInstance!=null&&(this._viewModelInstanceValue.addInstance(h.runtimeInstance),h.addParent(this._parentViewModel));},d.prototype.addInstanceAt=function(h,S){return h.runtimeInstance!=null&&this._viewModelInstanceValue.addInstanceAt(h.runtimeInstance,S)?(h.addParent(this._parentViewModel),true):false},d.prototype.removeInstance=function(h){h.runtimeInstance!=null&&(this._viewModelInstanceValue.removeInstance(h.runtimeInstance),h.removeParent(this._parentViewModel));},d.prototype.removeInstanceAt=function(h){this._viewModelInstanceValue.removeInstanceAt(h);},d.prototype.instanceAt=function(h){var S=this._viewModelInstanceValue.instanceAt(h);if(S!=null){var G=new $e(S,this._parentViewModel);return (0, f.createFinalization)(G,S),G}return null},d.prototype.swap=function(h,S){this._viewModelInstanceValue.swap(h,S);},d.prototype.internalHandleCallback=function(h){h();},d})(bt),tt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.rgb=function(h,S,G){this._viewModelInstanceValue.rgb(h,S,G);},d.prototype.rgba=function(h,S,G,W){this._viewModelInstanceValue.argb(W,h,S,G);},d.prototype.argb=function(h,S,G,W){this._viewModelInstanceValue.argb(h,S,G,W);},d.prototype.alpha=function(h){this._viewModelInstanceValue.alpha(h);},d.prototype.opacity=function(h){this._viewModelInstanceValue.alpha(Math.round(Math.max(0,Math.min(1,h))*255));},d.prototype.internalHandleCallback=function(h){h(this.value);},d})(bt),Ne=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{set:function(h){var S;this._viewModelInstanceValue.value((S=h?.nativeImage)!==null&&S!==void 0?S:null);},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h();},d})(bt),mn=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{set:function(h){var S,G,W;h.isBindableArtboard?W=h:W=h.file.internalBindableArtboardFromArtboard(h.nativeArtboard),this._viewModelInstanceValue.value((S=W?.nativeArtboard)!==null&&S!==void 0?S:null),W?.nativeViewModel&&this._viewModelInstanceValue.viewModelInstance((G=W?.nativeViewModel)!==null&&G!==void 0?G:null);},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h();},d})(bt),gn=function(k){return v(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Request(k),[4,fetch(d)];case 1:return h=G.sent(),[4,h.arrayBuffer()];case 2:return S=G.sent(),[2,S]}})})},ut=function(k){return typeof k=="string"?[k]:k instanceof Array?k:[]},wt={EventManager:Y,TaskQueueManager:ie},Vt=function(k){return v(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Promise(function(W){return O.getInstance(function(J){J.decodeAudio(k,W);})}),[4,d];case 1:return h=G.sent(),S=new f.AudioWrapper(h),f.finalizationRegistry.register(S,h),[2,S]}})})},Sn=function(k){return v(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Promise(function(W){return O.getInstance(function(J){J.decodeImage(k,W);})}),[4,d];case 1:return h=G.sent(),S=new f.ImageWrapper(h),f.finalizationRegistry.register(S,h),[2,S]}})})},tn=function(k){return v(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Promise(function(W){return O.getInstance(function(J){J.decodeFont(k,W);})}),[4,d];case 1:return h=G.sent(),S=new f.FontWrapper(h),f.finalizationRegistry.register(S,h),[2,S]}})})};})(),i})());})(Ya)),Ya.exports}var Bd=HC();async function zd(e){const t=NC(e);if(t)return console.log(`[MGRiveLoader] Using cached RiveFile: ${e}`),t;console.log(`[MGRiveLoader] Loading RiveFile from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to load RiveFile: ${e} (${n.status})`);const r=await n.arrayBuffer(),o={};let i=null;if(await new Promise((l,u)=>{i=new Bd.RiveFile({buffer:r,assetLoader:f=>f.isImage&&OC.includes(f.name)?(o[f.name]=f,console.log(`[MGRiveLoader] Captured image asset: ${f.name}`),true):false,onLoad:()=>{console.log(`[MGRiveLoader] RiveFile loaded: ${e}`),l();},onLoadError:f=>{console.error("[MGRiveLoader] RiveFile load error:",f),u(f);}}),i.init().catch(f=>{console.error("[MGRiveLoader] Failed to initialize RiveFile:",f),u(f);});}),!i)throw new Error(`[MGRiveLoader] Failed to create RiveFile for ${e}`);i.getInstance();const a={riveFile:i,imageAssets:o,url:e,loadedAt:Date.now()};return DC(e,a),a}const pm=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],VC=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),KC=function(e){return "/"+e},Lp={},xn=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let u=function(f){return Promise.all(f.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");o=u(n.map(f=>{if(f=KC(f),f in Lp)return;Lp[f]=true;const p=f.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${m}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":VC,p||(v.as="script"),v.crossOrigin="",v.href=f,l&&v.setAttribute("nonce",l),document.head.appendChild(v),p)return new Promise((y,b)=>{v.addEventListener("load",y),v.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${f}`)));})}));}function i(a){const l=new Event("vite:preloadError",{cancelable:true});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return o.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Ca={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3},$c=["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"];async function fm(){try{const{Store:e}=await xn(async()=>{const{Store:o}=await Promise.resolve().then(()=>Di);return {Store:o}},void 0),t=await e.select("myDataAtom");if(!t||typeof t!="object")throw new Error("myDataAtom not available");const n=t.cosmetic,r=t.name;return {avatar:n?.avatar||[...$c],color:n?.color||"Red",name:r||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:[...$c],color:"Red",name:"Player"}}}function hm(e,t){const n=t?[...t]:[...$c];return e.bottom&&(n[Ca.BOTTOM]=e.bottom),e.mid&&(n[Ca.MID]=e.mid),e.top&&(n[Ca.TOP]=e.top),e.expression&&(n[Ca.EXPRESSION]=e.expression),n}const mm="Expression_Stressed.png";function YC(){try{return Array.from(fe.document.querySelectorAll("script")).find(r=>r.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function qC(){return fe.location.pathname.split("/").pop()||"UNKNOWN"}async function XC(){try{const e=YC(),t=qC(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,r=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function Gl(){return  false}const rr={ownedFilenames:new Set,loaded:false,error:null},QC=[];function Ul(){QC.forEach(e=>e());}async function gm(){try{await Sd();const{Store:e}=await xn(async()=>{const{Store:r}=await Promise.resolve().then(()=>Di);return {Store:r}},void 0);if(!await e.select("isUserAuthenticatedAtom")){rr.loaded=!0,Ul();return}const n=await XC();rr.ownedFilenames=new Set(n.map(r=>r.cosmeticFilename)),rr.loaded=!0,rr.error=null,Ul();}catch(e){rr.error=e,rr.loaded=true,Ul();}}function JC(e){return rr.ownedFilenames.has(e)}function ZC(){return rr.loaded}const Bc=[];let Mp=false,Rp=false;function ek(){Rp||(Rp=true,ok().then(()=>{}).catch(()=>{}));}ek();let Fp=false;async function tk(){Fp||(await gm(),Fp=true);}function Gr(){try{const t=Array.from(fe.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${fe.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}function nk(e,t){if(!t)return e;let n=e;if(t.type){const r=Array.isArray(t.type)?t.type:[t.type];n=n.filter(o=>r.includes(o.type));}if(t.availability){const r=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(o=>r.includes(o.availability));}if(t.search){const r=t.search.toLowerCase();n=n.filter(o=>o.displayName.toLowerCase().includes(r));}return n}function rk(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:JC(n.filename))}async function ok(){if(!Mp)try{const e=Gr(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const i=((await n.json())?.bundles||[]).find(l=>l.name==="cosmetic"||l.name==="cosmetics");if(!i)return;const a=new Set(pm.map(l=>l.filename));for(const l of i.assets||[])for(const u of l.src||[]){if(typeof u!="string")continue;const f=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(u);if(!f)continue;const p=f[1],m=f[2],v=`${m}.png`;if(a.has(v))continue;const y=m.split("_");if(y.length<2)continue;const b=y[0],A=y.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");Bc.push({id:v,filename:v,type:b,displayName:A,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${p}/`)}${v}`}),a.add(v);}Mp=!0,console.log(`[Avatar] Discovered ${Bc.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function ji(e){const t=Gr(),n=Bc.map(f=>({...f,url:f.url||`${t}${f.filename}`})),r=pm.map(f=>({...f,url:`${t}${f.filename}`})),o=new Set,i=[];for(const f of n)o.has(f.filename)||(i.push(f),o.add(f.filename));for(const f of r)o.has(f.filename)||(i.push(f),o.add(f.filename));const l=[...[],...i];let u=nk(l,e);return u=rk(u,e),u}async function bm(e){return await tk(),ji(e)}function ik(e){return ji(e).map(t=>t.url)}async function Ks(){const{avatar:e,color:t}=await fm();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function ak(){const e=await fm(),t=await Ks(),n=ji(),r={};return n.forEach(o=>{r[o.type]=(r[o.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:r,allItems:n,assetBaseUrl:Gr()}}const sk="_Blank.png";let ka=null;function lk(){if(ka)return Promise.resolve(ka);const e=document.createElement("canvas");return e.width=1,e.height=1,new Promise((t,n)=>{e.toBlob(r=>{if(!r){n(new Error("[MGRiveLoader] Failed to create transparent PNG"));return}r.arrayBuffer().then(o=>{ka=new Uint8Array(o),t(ka);},n);},"image/png");})}async function Wl(e,t,n){let r;if(t.includes(sk))r=await lk();else {const i=await fetch(`${n}${t}`).then(a=>a.arrayBuffer());r=new Uint8Array(i);}const o=await Bd.decodeImage(r);e.setRenderImage(o),o.unref();}async function vm(e,t){const{imageAssets:n}=e,r=Gr(),o=[];t.top&&n.Top&&o.push(Wl(n.Top,t.top,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Top:",i))),t.mid&&n.Mid&&o.push(Wl(n.Mid,t.mid,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Mid:",i))),t.bottom&&n.Bottom&&o.push(Wl(n.Bottom,t.bottom,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Bottom:",i))),await Promise.all(o);}async function ck(e){const{canvas:t,outfit:n,riveUrl:r,stateMachine:o="State Machine 1",autoplay:i=true}=e;let a=r;if(!a){const p=await cm();if(!p)throw new Error("[MGRiveLoader] Could not find avatar .riv file");a=p.url;}console.log(`[MGRiveLoader] Creating Rive instance from: ${a}`);const l=await zd(a),u=new Bd.Rive({riveFile:l.riveFile,canvas:t,autoplay:i,stateMachines:o});if(console.log("[MGRiveLoader] Rive instance created"),await vm(l,n),n.expression&&n.expression!=="Expression_Blank.png"){const m=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(n.expression);if(m!==-1&&u.stateMachineInputs("State Machine 1")){const v=u.stateMachineInputs("State Machine 1").find(y=>y.name==="expression");v&&(v.value=m,console.log(`[MGRiveLoader] Set expression: ${n.expression} (index ${m})`),u.drawFrame());}}return console.log("[MGRiveLoader] Outfit applied"),{rive:u,cacheEntry:l,outfit:{...n},play(){u.play();},pause(){u.pause();},triggerAnimation(p){const m=u.stateMachineInputs(o);if(!m)return  false;const v=m.find(y=>y.name===p);return v?(typeof v.fire=="function"?v.fire():v.value=true,true):false},randomAnimation(){const p=u.stateMachineInputs(o);if(!p||p.length===0)return  false;const m=p.filter(y=>typeof y.fire=="function");return m.length===0?false:(m[Math.floor(Math.random()*m.length)].fire(),true)},destroy(){u.cleanup();}}}async function dk(e,t){if(console.log("[MGRiveLoader] Updating outfit"),await vm(e.cacheEntry,t),t.expression&&t.expression!=="Expression_Blank.png"){const r=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(t.expression);if(r!==-1&&e.rive.stateMachineInputs("State Machine 1")){const o=e.rive.stateMachineInputs("State Machine 1").find(i=>i.name==="expression");o&&(o.value=r,console.log(`[MGRiveLoader] Set expression: ${t.expression} (index ${r})`),e.rive.drawFrame());}}e.outfit={...t},console.log("[MGRiveLoader] Outfit updated");}let Op=false;async function uk(){if(!Op){Op=true;try{await GC(),Ep(!0),console.log("[MGRiveLoader] Initialized");}catch(e){throw console.error("[MGRiveLoader] Initialization failed:",e),Ep(false),e}}}function pk(){return BC()}function fk(){return Vs()}async function hk(e){return await zd(e)}async function mk(){const e=await cm();return e?await zd(e.url):null}async function gk(e){return await ck(e)}async function bk(e,t){return await dk(e,t)}const yo={init:uk,isReady:pk,list:fk,getRiveFile:hk,getAvatarRiveFile:mk,createInstance:gk,updateOutfit:bk};function vk(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const Le=vk();function ym(){return Le.ready}const Np=fe??window;async function xm(){const e=Le.ctx;if(e)return e;const t=Np.AudioContext||Np.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return Le.ctx=n,n}async function wm(){if(Le.ctx&&Le.ctx.state==="suspended")try{await Le.ctx.resume();}catch{}}const yk={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},xk={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},hi=.001,mi=.2;function Dp(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function _i(e){const t=yk[e],n=xk[e];if(!t)return {atom:mi,vol100:Sa(mi)};const r=Dp(t,NaN);if(Number.isFinite(r)){const i=Rn(r,0,1);return {atom:i,vol100:Sa(i)}}if(n){const i=Dp(n,NaN);if(Number.isFinite(i)){const a=Rn(i,0,1);return {atom:a,vol100:Sa(a)}}}const o=mi;return {atom:o,vol100:Sa(o)}}function wk(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(Rn(t,1,100)-1)/99;return hi+r*(mi-hi)}function Sa(e){const t=Rn(Number(e),0,1);if(t<=hi)return 0;const n=(t-hi)/(mi-hi);return Math.round(1+n*99)}function Cm(e,t){if(t==null)return _i(e).atom;const n=wk(t);return n===null?_i(e).atom:o0(n)}function Ck(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);Le.sfx.groups=t;}function kk(e){const t=Le.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=Le.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Sk(){if(Le.sfx.buffer)return Le.sfx.buffer;if(!Le.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await xm();await wm();const n=await(await h0(Le.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return Le.sfx.buffer=r,r}async function Ak(e,t={}){if(!Le.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=kk(n),o=Le.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await xm();await wm();const a=await Sk(),l=Math.max(0,+o.start||0),u=Math.max(l,+o.end||l),f=Math.max(.01,u-l),p=Cm("sfx",t.volume),m=i.createGain();m.gain.value=p,m.connect(i.destination);const v=i.createBufferSource();return v.buffer=a,v.connect(m),v.start(0,l,f),{name:r,source:v,start:l,end:u,duration:f,volume:p}}const xo={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},Ek={sounds:[],itemCustomSounds:[],version:1},Pn={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class jd extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class _k extends jd{constructor(){super(`Maximum number of sounds reached (${xo.MAX_SOUNDS})`),this.name="SoundLimitError";}}class Ik extends jd{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${xo.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class Tk extends jd{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function Pk(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||Gd(t),t}function Ys(){const e=at($t.MODULE.AUDIO_CUSTOM_SOUNDS,Ek);return Pk(e)}function Gd(e){st($t.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function $p(){return Ys().sounds}function qs(e){const t=Ys();t.sounds=e,Gd(t);}function Xs(){return Ys().itemCustomSounds}function km(e){const t=Ys();t.itemCustomSounds=e,Gd(t);}function Lk(e){const t={shop:{soundId:e.shop?.soundId??Pn.shop.soundId,volume:e.shop?.volume??Pn.shop.volume,mode:e.shop?.mode??Pn.shop.mode},pet:{soundId:e.pet?.soundId??Pn.pet.soundId,volume:e.pet?.volume??Pn.pet.volume,mode:e.pet?.mode??Pn.pet.mode},weather:{soundId:e.weather?.soundId??Pn.weather.soundId,volume:e.weather?.volume??Pn.weather.volume,mode:e.weather?.mode??Pn.weather.mode}};return t!==e&&Wd(t),t}function Ud(){const e=at($t.MODULE.AUDIO_NOTIFICATION_SETTINGS,Pn);return Lk(e)}function Wd(e){st($t.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const Mk="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",Sm=[{id:"default-notification",name:"Default",source:Mk,type:"upload",createdAt:0}];function Rk(e){const t=new Set(e.map(r=>r.id)),n=Sm.filter(r=>!t.has(r.id));return n.length===0?e:[...e,...n]}function Am(e){return Sm.some(t=>t.id===e)}function Fk(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const o=e.slice(n+1).length*3/4;return Math.round(o)}function Em(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=Fk(e);if(t>0&&t>xo.MAX_SIZE_BYTES)throw new Ik(t)}function _m(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function Ok(e){if(e>=xo.MAX_SOUNDS)throw new _k}let fn=[],zc=false;function $n(){zc||Im();}function Nk(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function Im(){if(zc)return;let e=$p();e=Rk(e),e.length!==$p().length&&qs(e),fn=e,zc=true,console.log(`[CustomSounds] Initialized with ${fn.length} sounds`);}function Dk(){return $n(),[...fn]}function Tm(e){return $n(),fn.find(t=>t.id===e)}function $k(e,t,n){$n(),_m(e),Em(t),Ok(fn.length);const r={id:Nk(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return fn.push(r),qs(fn),console.log(`[CustomSounds] Added sound: ${r.name} (${r.id})`),r}function Bk(e){if($n(),Am(e))throw new Error("Cannot remove default sounds");const t=fn.findIndex(r=>r.id===e);if(t===-1)return  false;const n=fn.splice(t,1)[0];return qs(fn),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function zk(e,t){if($n(),Am(e))throw new Error("Cannot update default sounds");const n=fn.find(r=>r.id===e);return n?(t.name!==void 0&&(_m(t.name),n.name=t.name.trim()),t.source!==void 0&&(Em(t.source),n.source=t.source.trim()),qs(fn),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function jk(e,t={}){$n();const n=Tm(e);if(!n)throw new Tk(e);const{MGAudio:r}=await xn(async()=>{const{MGAudio:o}=await Promise.resolve().then(()=>Rm);return {MGAudio:o}},void 0);try{await r.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(o){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,o),o}}function Gk(){xn(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>Rm);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function Uk(){return Ud()}function Wk(e){return Ud()[e]}function Hk(e,t){const n=Ud();n[e]=t,Wd(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function Vk(e){Wd(e),console.log("[CustomSounds] Updated all notification settings");}function wo(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function Pm(e,t,n){$n();const r=Xs(),o=wo(e,t,n);return r.find(i=>wo(i.entityType,i.entityId,i.shopType)===o)??null}function Kk(e,t,n,r){$n();const o=Xs(),i=wo(e,t,r),a=o.findIndex(u=>wo(u.entityType,u.entityId,u.shopType)===i),l={entityType:e,entityId:t,shopType:r,soundId:n.soundId,volume:n.volume,mode:n.mode};a!==-1?o[a]=l:o.push(l),km(o),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(ft.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:r,config:n}}));}function Yk(e,t,n){$n();const r=Xs(),o=wo(e,t,n),i=r.findIndex(a=>wo(a.entityType,a.entityId,a.shopType)===o);return i===-1?false:(r.splice(i,1),km(r),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(ft.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function qk(e,t,n){return Pm(e,t,n)!==null}function Xk(e){return $n(),Xs().filter(n=>n.entityType===e)}const Re={init:Im,getAll:Dk,getById:Tm,add:$k,remove:Bk,update:zk,play:jk,stop:Gk,getNotificationSettings:Uk,getNotificationConfig:Wk,setNotificationConfig:Hk,setNotificationSettings:Vk,getItemCustomSound:Pm,setItemCustomSound:Kk,removeItemCustomSound:Yk,hasItemCustomSound:qk,getItemCustomSoundsByType:Xk};let Aa=null;async function Qk(){return Le.ready?true:Aa||(Aa=(async()=>{Le.baseUrl=await Io.base();const e=await bo.load({baseUrl:Le.baseUrl}),t=bo.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];Le.urls[i].set(a,Pr(Le.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(Le.sfx.mp3Url=Pr(Le.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(Le.sfx.atlasUrl=Pr(Le.baseUrl,r));}if(!Le.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return Le.sfx.atlas=await mh(Le.sfx.atlasUrl),Ck(Le.sfx.atlas),Re.init(),Le.ready=true,true})(),Aa)}function Lm(e){if(e!=="music"&&e!=="ambience")return  false;const t=Le.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return Le.tracks[e]=null,true}function Jk(e,t,n={}){if(!Le.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=Le.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Lm(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=Cm(e,n.volume),o.preload="auto",o.play().catch(()=>{}),Le.tracks[e]=o,o}function Zk(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(Le.urls[n].keys()).sort():n==="sfx"?Le.sfx.atlas?t.groups?Array.from(Le.sfx.groups.keys()).sort():Object.keys(Le.sfx.atlas).sort():[]:[]}function eS(){return ["sfx","music","ambience"]}function tS(){return Array.from(Le.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function nS(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=Le.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function rS(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(Le.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function oS(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=Le.urls[n],i=r.toLowerCase();for(const[a,l]of Array.from(o.entries()))if(a.toLowerCase()===i)return l;return null}function iS(){return Le.tracks.music&&(Le.tracks.music.volume=_i("music").atom),Le.tracks.ambience&&(Le.tracks.ambience.volume=_i("ambience").atom),true}let en=null;async function aS(e,t={}){Mm();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const r={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,en?.audio===n&&(en=null));},setVolume:o=>{n.volume=Math.max(0,Math.min(1,o));},isPlaying:()=>!n.paused&&!n.ended};en=r;try{await new Promise((o,i)=>{const a=setTimeout(()=>{i(new Error("Audio load timeout"));},5e3),l=()=>{clearTimeout(a),n.removeEventListener("canplay",u),n.removeEventListener("error",f);},u=()=>{l(),o();},f=()=>{l(),i(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(a),o()):(n.addEventListener("canplay",u,{once:!0}),n.addEventListener("error",f,{once:!0}));}),await n.play();}catch(o){throw en=null,o}return n.addEventListener("ended",()=>{en?.audio===n&&(en=null);}),r}function Mm(){return en?(en.stop(),en=null,true):false}function sS(e){return en?(en.setVolume(e),true):false}function lS(){return en?.isPlaying()??false}function cS(){return en}function Kt(){if(!ym())throw new Error("MGAudio not ready yet")}async function dS(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Ak(o,n);if(r==="music"||r==="ambience")return Jk(r,o,n);throw new Error(`Unknown category: ${r}`)}const yt={init:Qk,isReady:ym,play:dS,stop:e=>(Kt(),Lm(e)),list:(e,t)=>(Kt(),Zk(e,t)),refreshVolumes:()=>(Kt(),iS()),categoryVolume:e=>(Kt(),_i(e)),getCategories:()=>(Kt(),eS()),getGroups:()=>(Kt(),tS()),hasTrack:(e,t)=>(Kt(),nS(e,t)),hasGroup:e=>(Kt(),rS(e)),getTrackUrl:(e,t)=>(Kt(),oS(e,t)),playCustom:async(e,t)=>(Kt(),aS(e,t)),stopCustom:()=>(Kt(),Mm()),setCustomVolume:e=>(Kt(),sS(e)),isCustomPlaying:()=>(Kt(),lS()),getCustomHandle:()=>(Kt(),cS()),CustomSounds:Re},Rm=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:yt},Symbol.toStringTag,{value:"Module"}));function uS(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const ot=uS();function Fm(){return ot.ready}let Ea=null;async function pS(){return ot.ready?true:Ea||(Ea=(async()=>{ot.baseUrl=await Io.base();const e=await bo.load({baseUrl:ot.baseUrl}),t=bo.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ot.byCat.clear(),ot.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const l=i.slice(0,a),u=i.slice(a+1),f=Pr(ot.baseUrl,r);ot.byBase.set(i,f),ot.byCat.has(l)||ot.byCat.set(l,new Map),ot.byCat.get(l).set(u,f);}return ot.ready=true,true})(),Ea)}function jc(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function fS(e,t){if(t===void 0){const i=jc(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=jc(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function hS(){return Array.from(ot.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function mS(e){const t=ot.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Gc(e,t){const{cat:n,asset:r,base:o}=fS(e,t),i=ot.byBase.get(o);if(i)return i;const l=ot.byCat.get(n)?.get(r);if(l)return l;if(!ot.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Pr(ot.baseUrl,`cosmetic/${o}.png`)}const Bp=fe?.document??document;function gS(){if(ot.overlay)return ot.overlay;const e=Bp.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Bp.documentElement.appendChild(e),ot.overlay=e,e}function bS(){const e=ot.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function vS(e){return ot.defaultParent=e,true}const yS=fe?.document??document;function Uc(e,t,n){if(!ot.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?Gc(e,o):Gc(e),a=yS.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):jc(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[l,u]of Object.entries(r.style))try{a.style[l]=String(u);}catch{}return a}function xS(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||bS()||gS(),a=o!==void 0?Uc(e,o,r):Uc(e,r);if(i===ot.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const u=r.scale??1,f=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${f}rad)`;else {const p=r.x??innerWidth/2,m=r.y??innerHeight/2;a.style.left=`${p}px`,a.style.top=`${m}px`,a.style.transform=`scale(${u}) rotate(${f}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${f}rad)`);}}return i.appendChild(a),ot.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}ot.live.delete(a);},a}function wS(){for(const e of Array.from(ot.live))e.__mgDestroy?.();}const CS=100,Hl=[];function Wc(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const l=n.value;a=typeof l=="object"?`{${Object.keys(l||{}).slice(0,2).join(",")}}`:String(l);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const l=Object.keys(n).filter(u=>u!=="type");l.length>0&&(r=`PartialState - {${l.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));Hl.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),Hl.length>CS&&Hl.shift();}const Yt={nativeCtor:null,captured:[],latestOpen:null},zp=Symbol.for("ariesmod.ws.capture.wrapped"),jp=Symbol.for("ariesmod.ws.capture.native"),Om=1;function Hc(e){return !!e&&e.readyState===Om}function kS(){if(Hc(Yt.latestOpen))return Yt.latestOpen;for(let e=Yt.captured.length-1;e>=0;e--){const t=Yt.captured[e];if(Hc(t))return t}return null}function SS(e,t){Yt.captured.push(e),Yt.captured.length>25&&Yt.captured.splice(0,Yt.captured.length-25);const n=()=>{Yt.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Yt.latestOpen===e&&(Yt.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Wc("in",o.type||"unknown",o);}catch{Wc("in","raw",r.data);}}),e.readyState===Om&&n();}function AS(e=fe,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[zp])return Yt.nativeCtor=r[jp]??Yt.nativeCtor??null,()=>{};const o=r;Yt.nativeCtor=o;function i(a,l){const u=l!==void 0?new o(a,l):new o(a);try{SS(u,n);}catch{}return u}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[zp]=true,i[jp]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function ES(e=fe){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function vs(e=fe){const t=kS();if(t)return {ws:t,source:"captured"};const n=ES(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Nm(e,t={}){const n=t.pageWindow??fe,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const l=()=>{const f=vs(n);(f.ws!==i||f.source!==a)&&(i=f.ws,a=f.source,o&&console.log("[WS] best socket changed:",f.source,f.ws),e(f));};l();const u=setInterval(l,r);return ()=>clearInterval(u)}function _S(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function IS(e,t=fe){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=vs(t);if(!r)return {ok:false,reason:"no-ws"};if(!Hc(r))return {ok:false,reason:"not-open"};const o=_S(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);Wc("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function TS(e,t={},n=fe){return IS({type:e,...t},n)}const er={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},he={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",ToggleLockItem:"ToggleLockItem",SetSelectedItem:"SetSelectedItem",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",GrowEgg:"GrowEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",CropCleanser:"CropCleanser",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",SwapPetFromStorage:"SwapPetFromStorage",PickupPet:"PickupPet",MovePetSlot:"MovePetSlot",NamePet:"NamePet",SellPet:"SellPet",ThrowSnowball:"ThrowSnowball",CheckFriendBonus:"CheckFriendBonus",ReportSpeakingStart:"ReportSpeakingStart"};var Cn=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Cn||{});new Set(Object.values(er));new Set(Object.values(he));const PS=["Room","Quinoa"],LS={Room:["Room"],Quinoa:PS};function Te(e,t={},n=fe){const r=t,{scopePath:o,scope:i,...a}=r,l=typeof o=="string"?o:i,u=Array.isArray(o)?o:l==="Room"||l==="Quinoa"?LS[l]:null;return TS(e,u?{scopePath:u,...a}:a,n)}function MS(e,t=fe){return Te(he.Chat,{scope:"Room",message:e},t)}function RS(e,t=fe){return Te(he.Emote,{scope:"Room",emoteType:e},t)}function FS(e,t=fe){return Te(he.Wish,{scope:"Quinoa",wish:e},t)}function OS(e,t=fe){return Te(he.KickPlayer,{scope:"Room",playerId:e},t)}function Qs(e,t=fe){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:r}=e;return Te(he.SetPlayerData,{scope:"Room",name:n,cosmetic:r},t)}function NS(e=fe){return Te(he.UsurpHost,{scope:"Quinoa"},e)}function DS(e=fe){return Te(he.ReportSpeakingStart,{scope:"Quinoa"},e)}function $S(e,t=fe){return Te(he.SetSelectedGame,{scope:"Room",gameId:e},t)}function BS(e,t=fe){return Te(he.VoteForGame,{scope:"Room",gameId:e},t)}function zS(e=fe){return Te(he.RestartGame,{scope:"Room"},e)}function jS(e,t=fe){return Te(he.Ping,{scope:"Quinoa",id:e},t)}function Dm(e,t,n=fe){return Te(he.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const GS=Dm;function US(e,t,n=fe){return Te(he.Teleport,{scope:"Quinoa",x:e,y:t},n)}function WS(e=fe){return Te(he.CheckWeatherStatus,{scope:"Quinoa"},e)}function HS(e,t,n=fe){return Te(he.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function VS(e,t=fe){return Te(he.DropObject,{scope:"Quinoa",slotIndex:e},t)}function KS(e,t=fe){return Te(he.PickupObject,{scope:"Quinoa",objectId:e},t)}function $m(e,t=fe){return Te(he.ToggleLockItem,{scope:"Quinoa",itemId:e},t)}const YS=$m;function qS(e,t=fe){return Te(he.SetSelectedItem,{scope:"Quinoa",itemIndex:e},t)}function Hd(e,t="PetHutch",n,r,o=fe){return Te(he.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toStorageIndex:n},...r!==void 0&&{quantity:r}},o)}function Vd(e,t="PetHutch",n,r,o=fe){return Te(he.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toInventoryIndex:n},...r!==void 0&&{quantity:r}},o)}function XS(e,t,n,r=fe){return Te(he.MoveStorageItem,{scope:"Quinoa",itemId:e,storageId:t,toStorageIndex:n},r)}function QS(e=fe){return Te(he.LogItems,{scope:"Quinoa"},e)}function JS(e,t,n=fe){return Te(he.PlantSeed,{scope:"Quinoa",slot:e,species:t},n)}function ZS(e,t=fe){return Te(he.WaterPlant,{scope:"Quinoa",slot:e},t)}function e1(e,t,n=fe){return Te(he.HarvestCrop,{scope:"Quinoa",slot:e,...t!==void 0&&{slotsIndex:t}},n)}function t1(e=fe){return Te(he.SellAllCrops,{scope:"Quinoa"},e)}function Kd(e,t=fe){return Te(he.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Yd(e,t=fe){return Te(he.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function qd(e,t=fe){return Te(he.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Xd(e,t=fe){return Te(he.PurchaseSeed,{scope:"Quinoa",species:e},t)}function Bm(e,t,n=fe){return Te(he.GrowEgg,{scope:"Quinoa",slot:e,eggId:t},n)}const n1=Bm;function r1(e,t=fe){return Te(he.HatchEgg,{scope:"Quinoa",slot:e},t)}function o1(e,t,n=fe){return Te(he.PlantGardenPlant,{scope:"Quinoa",slot:e,itemId:t},n)}function i1(e,t=fe){return Te(he.PotPlant,{scope:"Quinoa",slot:e},t)}function a1(e,t,n,r=fe){return Te(he.MutationPotion,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t,mutation:n},r)}function s1(e,t,n=fe){return Te(he.CropCleanser,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t},n)}function l1(e,t,n=fe){return Te(he.PickupDecor,{scope:"Quinoa",tileType:e,localTileIndex:t},n)}function c1(e,t,n,r,o=fe){return Te(he.PlaceDecor,{scope:"Quinoa",decorId:e,tileType:t,localTileIndex:n,...r!==void 0&&{rotation:r}},o)}function d1(e,t,n=fe){return Te(he.RemoveGardenObject,{scope:"Quinoa",slot:e,slotType:t},n)}function zm(e,t={x:0,y:0},n="Dirt",r=0,o=fe){return Te(he.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function u1(e,t,n=fe){return Te(he.FeedPet,{scope:"Quinoa",petItemId:e,cropItemId:t},n)}function p1(e,t=fe){return Te(he.PetPositions,{scope:"Quinoa",petPositions:e},t)}function jm(e,t,n=fe){return Te(he.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function f1(e,t,n,r=fe){return Te(he.SwapPetFromStorage,{scope:"Quinoa",petSlotId:e,storagePetId:t,storageId:n},r)}function Gm(e,t=fe){return Te(he.PickupPet,{scope:"Quinoa",petId:e},t)}function h1(e,t,n=fe){return Te(he.MovePetSlot,{scope:"Quinoa",movePetSlotId:e,toPetSlotIndex:t},n)}function m1(e,t,n=fe){return Te(he.NamePet,{scope:"Quinoa",petItemId:e,name:t},n)}function g1(e,t=fe){return Te(he.SellPet,{scope:"Quinoa",itemId:e},t)}function b1(e=fe){return Te(he.ThrowSnowball,{scope:"Quinoa"},e)}function v1(e=fe){return Te(he.CheckFriendBonus,{scope:"Quinoa"},e)}async function Um(e){try{const t=await Ks(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],r=e.color!==void 0?e.color:t.color,o=Qs({cosmetic:{color:r,avatar:n}},fe);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:o}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function y1(){return Um({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const ai=new Map;function x1(e){if(ai.has(e))return ai.get(e);const t=new Promise((n,r)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>n(o),o.onerror=()=>{ai.delete(e),r(new Error(`Failed to load image: ${e}`));},o.src=e;});return ai.set(e,t),t}function w1(){ai.clear();}function C1(e){return ji().find(r=>r.filename===e)?.url||""}async function k1(e,t={}){const n=document.createElement("canvas"),r=t.width||400,o=t.height||400,i=t.scale||1;n.width=r*i,n.height=o*i;const a=n.getContext("2d");if(!a)throw new Error("Failed to get canvas 2D context");if(a.imageSmoothingEnabled=i!==1,e.color){const p={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};a.fillStyle=p[e.color]||"#FF0000",a.fillRect(0,0,n.width,n.height);}const u=[e.bottom,e.mid,e.top,e.expression].filter(p=>!!p).map(p=>C1(p));return (await Promise.all(u.map(p=>x1(p)))).forEach(p=>{a.drawImage(p,0,0,n.width,n.height);}),n}let Qd=null,lo=null,Ar=null,ir=null;function Vl(e){return Gr()+e}async function S1(e){try{const{Store:t}=await xn(async()=>{const{Store:a}=await Promise.resolve().then(()=>Di);return {Store:a}},void 0),n=await t.select("myDataAtom"),r=n?.cosmetic?.avatar||[],o=hm(e,r),i=e.color||n?.cosmetic?.color||"Red";return Qd={avatar:o,color:i},E1(),_1(o),console.log("[Avatar] Rendered avatar override:",o),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function A1(){Qd=null,lo&&(clearInterval(lo),lo=null),Ar&&(Ar.disconnect(),Ar=null);const e=fe.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),ir&&(ir.remove(),ir=null),console.log("[Avatar] Cleared override"),true}function E1(){if(ir)return;const e=fe.document;ir=e.createElement("style"),ir.id="gemini-avatar-override-styles",ir.textContent=`
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
    `,e.head.appendChild(ir);}function _1(e){lo&&clearInterval(lo),Ar&&Ar.disconnect();const t=fe.document,n=()=>{const o=t.querySelectorAll(".Avatar");let i=0;o.forEach(a=>{const l=Array.from(a.querySelectorAll("img"));if(l.length===4){let f=false;l.forEach((p,m)=>{const v=Vl(e[m]);p.src!==v&&(f=true);}),f&&(l.forEach((p,m)=>{p.src=Vl(e[m]),p.setAttribute("data-gemini-override",e[m]);}),i++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const f=t.createElement("div");f.className="gemini-avatar-overlay",e.forEach(p=>{const m=t.createElement("img");m.src=Vl(p),m.setAttribute("data-gemini-cosmetic",p),f.appendChild(m);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(f),i++;}}),i>0&&console.log(`[Avatar] Re-applied ${i} override(s) (React reverted)`);};n(),lo=setInterval(n,500),Ar=new MutationObserver(()=>{setTimeout(n,10);});const r=t.querySelector(".game-root")||t.querySelector("#root")||t.body;Ar.observe(r,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function I1(){return Qd}function T1(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===mm.toLowerCase()}function P1(e){return e.some(T1)}let ys=null,to=null;fe.Gemini_AvatarOverride=null;async function Wm(e){try{const{Store:t}=await xn(async()=>{const{Store:A}=await Promise.resolve().then(()=>Di);return {Store:A}},void 0),{getPlayers:n}=await xn(async()=>{const{getPlayers:A}=await Promise.resolve().then(()=>ag);return {getPlayers:A}},void 0);Gl();const i=n().get().myPlayer;if(!i)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=i.id,l=i.cosmetic.avatar;fe.MagicCircle_PlayerId=a,to||(to=[...l]);let u=hm(e,l);const f=P1(u);Gl(),ys=u,fe.Gemini_AvatarOverride=u,console.log("[WorldAvatar] Applying override:",u);const p=await t.select("stateAtom");if(!p?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const m=p.data.players.findIndex(A=>A.id===a);if(m===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const v=p.data.players[m],y=[...p.data.players];y[m]={...v,cosmetic:{...v.cosmetic,avatar:u}};const b={...p,data:{...p.data,players:y}};return await t.set("stateAtom",b),Gl()&&f||Qs({name:i.name,cosmetic:{...i.cosmetic,avatar:u}},fe),!0}catch{return  false}}async function L1(){if(!ys||!to)return  true;try{const{Store:e}=await xn(async()=>{const{Store:m}=await Promise.resolve().then(()=>Di);return {Store:m}},void 0),{getPlayers:t}=await xn(async()=>{const{getPlayers:m}=await Promise.resolve().then(()=>ag);return {getPlayers:m}},void 0);fe.Gemini_AvatarOverride=null;const o=t().get().myPlayer;if(!o)return !1;const i=o.id,a=await e.select("stateAtom");if(!a?.data?.players)return !1;const l=a.data.players.findIndex(m=>m.id===i);if(l===-1)return !1;const u=a.data.players[l],f=[...a.data.players];f[l]={...u,cosmetic:{...u.cosmetic,avatar:to}};const p={...a,data:{...a.data,players:f}};return await e.set("stateAtom",p),Qs({name:o.name,cosmetic:{...o.cosmetic,avatar:to}},fe),ys=null,to=null,!0}catch{return  false}}function M1(){return ys}let Nt=[];const qa=[],Gp=()=>{qa.forEach(e=>e([...Nt]));},Mr={init(){Nt=at($t.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...Nt]},async save(e,t,n){if(!n){const i=Nt.find(a=>a.top===t.top&&a.mid===t.mid&&a.bottom===t.bottom&&a.expression===t.expression);if(i)return i.id}const r=n||Math.random().toString(36).substring(2,9),o={...t,id:r,name:e,createdAt:n&&Nt.find(i=>i.id===n)?.createdAt||Date.now()};if(n){const i=Nt.findIndex(a=>a.id===n);i!==-1?Nt[i]=o:Nt.push(o);}else Nt.push(o);return st($t.SECTION.AVATAR_LOADOUTS,Nt),Gp(),r},delete(e){Nt=Nt.filter(t=>t.id!==e),st($t.SECTION.AVATAR_LOADOUTS,Nt),Gp();},rename(e,t){const n=Nt.find(r=>r.id===e);n&&(n.name=t,st($t.SECTION.AVATAR_LOADOUTS,Nt));},async wear(e){const t=Nt.find(r=>r.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await Wm(n)},subscribe(e){return qa.push(e),()=>{const t=qa.indexOf(e);t!==-1&&qa.splice(t,1);}}},Hm={init:gm,isReady:()=>ZC(),list:ji,listAsync:bm,listUrls:ik,get:Ks,debug:ak,set:Um,blank:y1,Loadouts:Mr,toCanvas:k1,clearImageCache:w1,render:S1,clearOverride:A1,getOverride:I1,renderWorld:Wm,clearWorldOverride:L1,getWorldOverride:M1};function wr(){if(!Fm())throw new Error("MGCosmetic not ready yet")}const Jd={init:pS,isReady:Fm,categories:()=>(wr(),hS()),list:e=>(wr(),mS(e)),url:((e,t)=>(wr(),Gc(e,t))),create:((e,t,n)=>(wr(),Uc(e,t,n))),show:((e,t,n)=>(wr(),xS(e,t,n))),attach:e=>(wr(),vS(e)),clear:()=>(wr(),wS()),Avatar:Hm},Up={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function Vm(e){const t=Oe.get("mutations");if(!t)return Up[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?Up[e]??null:n.coinMultiplier}const Kl=new Map;function Yl(e){if(Kl.has(e))return Kl.get(e);const t=Vm(e)??1;return Kl.set(e,t),t}const R1=new Set(["Gold","Rainbow"]),F1=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function Km(e){let t=1,n=0,r=0;for(const o of e)if(o==="Gold"||o==="Rainbow")o==="Rainbow"?t=Yl("Rainbow"):t===1&&(t=Yl("Gold"));else {const i=Yl(o);i>1&&(n+=i,r++);}return t*(1+n-r)}function O1(e){return Vm(e)}function N1(e){return R1.has(e)}function D1(e){return F1.has(e)}function $1(e){return D1(e)}function Zd(e,t){const n=eu(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function Ii(e,t,n){const r=eu(e);if(!r)return 0;const o=r.baseSellPrice,i=Km(n);return Math.round(o*t*i)}function B1(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function z1(e,t){return t>=e}function eu(e){const t=Oe.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Ym=3600,ql=80,j1=100,si=30;function Js(e){return e/Ym}function Zs(e,t){const n=Gi(e);if(!n)return ql;const r=n.maxScale;if(t<=1)return ql;if(t>=r)return j1;const o=(t-1)/(r-1);return Math.floor(ql+20*o)}function el(e,t,n){const r=Gi(e);if(!r)return n-si;const o=r.hoursToMature,i=t/Ym,a=si/o,l=Math.min(a*i,si),u=n-si;return Math.floor(u+l)}function tl(e,t){const n=Gi(e);return n?t>=n.hoursToMature:false}function qm(e){const t=Gi(e);return t?si/t.hoursToMature:0}function G1(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Gi(e){const t=Oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function U1(e,t){return t<=0?1:Math.min(1,e/t)}const Qn=3600,_a=80,Wp=100,Fn=30,W1={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Ui(e){const t=Oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function H1(e){return e/Qn}function Xm(e,t){const n=Ui(e);if(!n)return _a;const{maxScale:r}=n;if(t<=1)return _a;if(t>=r)return Wp;const o=(t-1)/(r-1);return Math.floor(_a+(Wp-_a)*o)}function V1(e){return e-Fn}function K1(e){const t=Ui(e);return !t||t.hoursToMature<=0?0:Fn/t.hoursToMature}function Qm(e,t,n){const r=Ui(e);if(!r)return n-Fn;const o=t/Qn,i=Fn/r.hoursToMature,a=Math.min(i*o,Fn),l=n-Fn;return Math.floor(l+a)}function Jm(e,t,n){const r=Ui(e);if(!r)return 0;const o=n-Fn,i=t-o;if(i<=0)return 0;const a=Fn/r.hoursToMature;return a<=0?0:i/a*Qn}function tu(e,t,n,r,o=Qn){const a=Jm(e,n,r)-t;return a<=0?0:o<=0?1/0:a/o}function Zm(e,t,n,r=Qn){return tu(e,t,n,n,r)}function eg(e,t,n,r,o=Qn){if(n>=r)return 0;const i=n+1;return tu(e,t,i,r,o)}function Y1(e,t){return e>=t}function q1(e,t){const n=t-Fn,o=(e-n)/Fn*100;return Math.min(100,Math.max(0,o))}const X1=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:H1,calculateCurrentStrength:Qm,calculateHoursToMaxStrength:Zm,calculateHoursToNextStrength:eg,calculateHoursToStrength:tu,calculateMaxStrength:Xm,calculateStartingStrength:V1,calculateStrengthPerHour:K1,calculateStrengthProgress:q1,calculateXpForStrength:Jm,getSpeciesData:Ui,isPetMature:Y1},Symbol.toStringTag,{value:"Module"}));function nu(e){const t=Oe.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=W1[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function Q1(e,t){return e<=0?0:t<=0?1/0:e/t}function ru(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const i=e-o,a=r/n;return Math.ceil(i/a)}function tg(e,t,n){const r=Oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=nu(e);return ru(n,t,a,i)}function xs(e,t,n){const r=Oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=nu(e);return ru(n,t,a,i)}function ng(e,t,n,r,o,i){return e?t&&i>0?xs(n,r,i):0:xs(n,r,o)}const J1=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:ng,calculateFeedsForDuration:ru,calculateFeedsToMaxStrength:xs,calculateFeedsToNextStrength:tg,calculateHoursUntilStarving:Q1,getHungerDrainPerHour:nu},Symbol.toStringTag,{value:"Module"})),rg={init(){},isReady(){return  true},crop:{calculateSize:Zd,calculateSellPrice:Ii,calculateProgress:B1,isReady:z1,getData:eu},pet:{calculateAge:Js,calculateMaxStrength:Zs,calculateCurrentStrength:el,isMature:tl,calculateStrengthPerHour:qm,getData:Gi},mutation:{calculateMultiplier:Km,getValue:O1,isGrowth:N1,isEnvironmental:$1},xp:X1,feed:J1};function wn(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!wn(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!wn(n[a],r[a]))return  false;return  true}const Hp={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenPlayer",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"mySelectedSlotIdAtom"},Vp={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function Z1(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function eA(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function tA(e){const t=e.currentGardenTile;return {name:e.gardenName?.name??null,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function nA(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function rA(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Kp(e){return {position:Z1(e),tile:eA(e),garden:tA(e),object:nA(e),plant:rA(e)}}function Yp(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function oA(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!wn(e.data,t.data)}function iA(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!wn(e.sortedSlotIndices,t.sortedSlotIndices)?true:!wn(e.slots,t.slots)}function aA(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function sA(){let e=Vp,t=Vp,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(Hp),l=new Set;let u=false;function f(){if(u=false,l.size<a.length)return;const v=Kp(i);if(!wn(e,v)&&(t=e,e=v,!!n)){for(const y of o.all)y(e,t);if(Yp(t)!==Yp(e))for(const y of o.stable)y(e,t);if(oA(t.object,e.object)){const y={current:e.object,previous:t.object};for(const b of o.object)b(y);}if(iA(t.plant,e.plant)){const y={current:e.plant,previous:t.plant};for(const b of o.plantInfo)b(y);}if(aA(t.garden,e.garden)){const y={current:e.garden,previous:t.garden};for(const b of o.garden)b(y);}}}function p(){u||(u=true,queueMicrotask(f));}async function m(){if(n)return;const v=a.map(async y=>{const b=Hp[y],A=await Xe.subscribe(b,P=>{i[y]=P,l.add(y),p();});r.push(A);});await Promise.all(v),n=true,l.size===a.length&&(e=Kp(i));}return m(),{get(){return e},subscribe(v,y){return o.all.add(v),y?.immediate!==false&&n&&l.size===a.length&&v(e,e),()=>o.all.delete(v)},subscribeStable(v,y){return o.stable.add(v),y?.immediate!==false&&n&&l.size===a.length&&v(e,e),()=>o.stable.delete(v)},subscribeObject(v,y){return o.object.add(v),y?.immediate&&n&&l.size===a.length&&v({current:e.object,previous:e.object}),()=>o.object.delete(v)},subscribePlantInfo(v,y){return o.plantInfo.add(v),y?.immediate&&n&&l.size===a.length&&v({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(v)},subscribeGarden(v,y){return o.garden.add(v),y?.immediate&&n&&l.size===a.length&&v({current:e.garden,previous:e.garden}),()=>o.garden.delete(v)},destroy(){for(const v of r)v();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Xl=null;function xt(){return Xl||(Xl=sA()),Xl}function lA(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(m,v){return {x:v%m,y:Math.floor(v/m)}}function l(m,v,y){return y*m+v}function u(m,v){const{cols:y,rows:b}=m,A=y*b,P=new Set,I=new Set,T=new Map,N=[],z=m.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],O=m.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],M=Math.max(z.length,O.length);for(let C=0;C<M;C++){const E=z[C]??[],B=O[C]??[],j=E.map((U,ce)=>(P.add(U),T.set(U,C),{globalIndex:U,localIndex:ce,position:a(y,U)})),V=B.map((U,ce)=>(I.add(U),T.set(U,C),{globalIndex:U,localIndex:ce,position:a(y,U)}));N.push({userSlotIdx:C,dirtTiles:j,boardwalkTiles:V,allTiles:[...j,...V]});}const F=m.spawnTiles.map(C=>a(y,C)),L={};if(m.locations)for(const[C,E]of Object.entries(m.locations)){const B=E.spawnTileIdx??[];L[C]={name:C,spawnTiles:B,spawnPositions:B.map(j=>a(y,j))};}return {cols:y,rows:b,totalTiles:A,tileSize:v,spawnTiles:m.spawnTiles,spawnPositions:F,locations:L,userSlots:N,globalToXY(C){return a(y,C)},xyToGlobal(C,E){return l(y,C,E)},getTileOwner(C){return T.get(C)??null},isDirtTile(C){return P.has(C)},isBoardwalkTile(C){return I.has(C)}}}function f(){if(o.size<i||e)return;const m=r.map,v=r.tileSize??0;if(m){e=u(m,v);for(const y of n)y(e);n.clear();}}async function p(){const m=await Xe.subscribe("mapAtom",y=>{r.map=y,o.add("map"),f();});t.push(m);const v=await Xe.subscribe("tileSizeAtom",y=>{r.tileSize=y,o.add("tileSize"),f();});t.push(v);}return p(),{get(){return e},isReady(){return e!==null},onReady(m,v){return e?(v?.immediate!==false&&m(e),()=>{}):(n.add(m),()=>n.delete(m))},destroy(){for(const m of t)m();t.length=0,e=null,n.clear();}}}let Ql=null;function Vc(){return Ql||(Ql=lA()),Ql}function cA(){const e=Oe.get("mutations");return e?Object.keys(e):[]}function og(){const e={};for(const t of cA())e[t]=[];return e}function Kc(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:og()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function qp(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function dA(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function uA(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime,fruitCount:1}}function pA(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Xp(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Qp(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Kc();const i=t().get(),a=i?.userSlots[r],l=a?.dirtTiles??[],u=a?.boardwalkTiles??[],f=[],p=[],m=[],v={},y=[],b=[],A=[],P=[],I=og(),T=[],N=[],z=[],O={},M=[],F=[],L={},C=new Set,E=new Set;for(const[U,ce]of Object.entries(n.tileObjects)){const Y=parseInt(U,10);C.add(Y);const ie=i?i.globalToXY(Y):{x:0,y:0};if(ce.objectType==="plant"){const se=ce,ae=dA(U,se,ie,o);f.push(ae),ae.isMature?p.push(ae):m.push(ae),v[ae.species]||(v[ae.species]=[]),v[ae.species].push(ae);for(let ne=0;ne<se.slots.length;ne++){const q=se.slots[ne],Z=uA(U,ie,ne,q,o);if(y.push(Z),Z.isMature?b.push(Z):A.push(Z),Z.mutations.length>0){P.push(Z);for(const R of Z.mutations)I[R]||(I[R]=[]),I[R].push(Z);}}}else if(ce.objectType==="egg"){const ae=pA(U,ce,ie,o);T.push(ae),O[ae.eggId]||(O[ae.eggId]=[]),O[ae.eggId].push(ae),ae.isMature?N.push(ae):z.push(ae);}else if(ce.objectType==="decor"){const ae=Xp(U,ce,ie,"tileObjects");M.push(ae),L[ae.decorId]||(L[ae.decorId]=[]),L[ae.decorId].push(ae);}}for(const[U,ce]of Object.entries(n.boardwalkTileObjects)){const Y=parseInt(U,10);E.add(Y);const ie=i?i.globalToXY(Y):{x:0,y:0},ae=Xp(U,ce,ie,"boardwalk");F.push(ae),L[ae.decorId]||(L[ae.decorId]=[]),L[ae.decorId].push(ae);}const B=[...M,...F],j=l.filter(U=>!C.has(U.localIndex)),V=u.filter(U=>!E.has(U.localIndex));return {garden:n,mySlotIndex:r,plants:{all:f,mature:p,growing:m,bySpecies:v,count:f.length},crops:{all:y,mature:b,growing:A,mutated:{all:P,byMutation:I}},eggs:{all:T,mature:N,growing:z,byType:O,count:T.length},decors:{tileObjects:M,boardwalk:F,all:B,byType:L,count:B.length},tiles:{tileObjects:l,boardwalk:u,empty:{tileObjects:j,boardwalk:V}},counts:{plants:f.length,maturePlants:p.length,crops:y.length,matureCrops:b.length,eggs:T.length,matureEggs:N.length,decors:B.length,emptyTileObjects:j.length,emptyBoardwalk:V.length}}}function fA(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function hA(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function mA(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function gA(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function bA(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let l=0;l<a;l++){const u=new Set(i.slots[l].mutations),f=new Set(o.slots[l].mutations),p=[...f].filter(v=>!u.has(v)),m=[...u].filter(v=>!f.has(v));if(p.length>0||m.length>0){const v=Date.now(),y=o.slots[l],b={tileIndex:o.tileIndex,position:o.position,slotIndex:l,species:y.species,startTime:y.startTime,endTime:y.endTime,targetScale:y.targetScale,mutations:[...y.mutations],isMature:v>=y.endTime,fruitCount:1};n.push({crop:b,added:p,removed:m});}}}return n}function vA(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const l=o.get(a.tileIndex);if(!l)continue;const u=Math.min(a.slots.length,l.slots.length);for(let f=0;f<u;f++){const p=a.slots[f],m=l.slots[f];if(p.startTime!==m.startTime){const v=i.get(`${a.tileIndex}:${f}`);if(!v||!v.isMature)continue;const y={tileIndex:a.tileIndex,position:a.position,slotIndex:f,species:p.species,startTime:p.startTime,endTime:p.endTime,targetScale:p.targetScale,mutations:[...p.mutations],isMature:true,fruitCount:1};r.push({crop:y,remainingSlots:l.slotsCount});}}if(l.slotsCount<a.slotsCount)for(let f=l.slotsCount;f<a.slotsCount;f++){const p=i.get(`${a.tileIndex}:${f}`);if(!p||!p.isMature)continue;const m=a.slots[f];if(!m)continue;const v={tileIndex:a.tileIndex,position:a.position,slotIndex:f,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:true,fruitCount:1};r.push({crop:v,remainingSlots:l.slotsCount});}}return r}function yA(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function xA(e,t){const n=u=>`${u.tileIndex}:${u.location}`,r=u=>`${u.tileIndex}:${u.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(u=>!o.has(r(u))),l=e.filter(u=>!i.has(n(u)));return {added:a,removed:l}}function wA(){let e=Kc(),t=Kc(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,l=2;function u(){if(a.size<l)return;const p=Qp(i,Vc);if(wn(e,p)||(t=e,e=p,!n))return;for(const N of o.all)N(e,t);if(qp(t)!==qp(e))for(const N of o.stable)N(e,t);const m=fA(t.plants.all,e.plants.all);for(const N of m.added)for(const z of o.plantAdded)z({plant:N});for(const N of m.removed)for(const z of o.plantRemoved)z({plant:N,tileIndex:N.tileIndex});const v=hA(t.plants.mature,e.plants.mature,e.plants.all);for(const N of v)for(const z of o.plantMatured)z({plant:N});const y=bA(t.plants.all,e.plants.all);for(const N of y)for(const z of o.cropMutated)z(N);const b=mA(t.crops.mature,e.crops.mature,e.crops.all);for(const N of b)for(const z of o.cropMatured)z({crop:N});const A=vA(t.plants.all,e.plants.all,t.crops.all);for(const N of A)for(const z of o.cropHarvested)z(N);const P=yA(t.eggs.all,e.eggs.all);for(const N of P.added)for(const z of o.eggPlaced)z({egg:N});for(const N of P.removed)for(const z of o.eggRemoved)z({egg:N});const I=gA(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const N of I)for(const z of o.eggMatured)z({egg:N});const T=xA(t.decors.all,e.decors.all);for(const N of T.added)for(const z of o.decorPlaced)z({decor:N});for(const N of T.removed)for(const z of o.decorRemoved)z({decor:N});}async function f(){if(n)return;const p=await rx.onChangeNow(v=>{i.garden=v,a.add("garden"),u();});r.push(p);const m=await Xe.subscribe("myUserSlotIdxAtom",v=>{i.mySlotIndex=v,a.add("mySlotIndex"),u();});r.push(m),n=true,a.size===l&&(e=Qp(i,Vc));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribePlantAdded(p,m){if(o.plantAdded.add(p),m?.immediate&&n&&a.size===l)for(const v of e.plants.all)p({plant:v});return ()=>o.plantAdded.delete(p)},subscribePlantRemoved(p,m){return o.plantRemoved.add(p),()=>o.plantRemoved.delete(p)},subscribePlantMatured(p,m){if(o.plantMatured.add(p),m?.immediate&&n&&a.size===l)for(const v of e.plants.mature)p({plant:v});return ()=>o.plantMatured.delete(p)},subscribeCropMutated(p,m){if(o.cropMutated.add(p),m?.immediate&&n&&a.size===l)for(const v of e.crops.mutated.all)p({crop:v,added:v.mutations,removed:[]});return ()=>o.cropMutated.delete(p)},subscribeCropMatured(p,m){if(o.cropMatured.add(p),m?.immediate&&n&&a.size===l)for(const v of e.crops.mature)p({crop:v});return ()=>o.cropMatured.delete(p)},subscribeCropHarvested(p,m){return o.cropHarvested.add(p),()=>o.cropHarvested.delete(p)},subscribeEggPlaced(p,m){if(o.eggPlaced.add(p),m?.immediate&&n&&a.size===l)for(const v of e.eggs.all)p({egg:v});return ()=>o.eggPlaced.delete(p)},subscribeEggRemoved(p,m){return o.eggRemoved.add(p),()=>o.eggRemoved.delete(p)},subscribeEggMatured(p,m){if(o.eggMatured.add(p),m?.immediate&&n&&a.size===l)for(const v of e.eggs.mature)p({egg:v});return ()=>o.eggMatured.delete(p)},subscribeDecorPlaced(p,m){if(o.decorPlaced.add(p),m?.immediate&&n&&a.size===l)for(const v of e.decors.all)p({decor:v});return ()=>o.decorPlaced.delete(p)},subscribeDecorRemoved(p,m){return o.decorRemoved.add(p),()=>o.decorRemoved.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let Jl=null;function Ur(){return Jl||(Jl=wA()),Jl}const Jp={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPrimitivePetSlotsAtom",slotInfos:"myPetSlotInfosAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Zp(e,t){const n=Js(e.xp),r=Zs(e.petSpecies,e.targetScale),o=el(e.petSpecies,e.xp,r),i=tl(e.petSpecies,n),u=Oe.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,f=e.hunger/u*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:f,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function CA(e,t){const n=t[e.id],r=n?.lastAbilityTrigger??null,o=n?.position??null,i=Js(e.xp),a=Zs(e.petSpecies,e.targetScale),l=el(e.petSpecies,e.xp,a),u=tl(e.petSpecies,i),m=Oe.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,v=e.hunger/m*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:v,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:"active",position:o?{x:o.x,y:o.y}:null,lastAbilityTrigger:r,growthStage:i,currentStrength:l,maxStrength:a,isMature:u}}const ef=500;let Ln=[],Xa=0;function kA(){try{const e=at($t.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Xa=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function SA(e){try{st($t.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function AA(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function EA(e){if(!e||!Array.isArray(e))return;const t=Eh(e),n=[];for(const r of t)if(r.timestamp>Xa){const o=AA(r);o&&n.push(o);}n.length!==0&&(Xa=Math.max(...n.map(r=>r.performedAt),Xa),Ln=[...n,...Ln],Ln.length>ef&&(Ln=Ln.slice(0,ef)),SA(Ln),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${Ln.length})`));}function tf(e){const t=new Set,n=[];for(const m of e.active??[]){const v=CA(m,e.slotInfos??{});n.push(v),t.add(v.id);}const r=[];for(const m of e.inventory??[]){if(t.has(m.id))continue;const v=Zp(m,"inventory");r.push(v),t.add(v.id);}const o=[];for(const m of e.hutch??[]){if(t.has(m.id))continue;const v=Zp(m,"hutch");o.push(v),t.add(v.id);}const i=[...n,...r,...o],u=Ur().get().decors.all.some(m=>m.decorId==="PetHutch"),f=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},hutch:{hasHutch:u,currentItems:f,maxItems:25},abilityLogs:[...Ln]}}const nf={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},abilityLogs:[]};function _A(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function rf(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function IA(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(rf),r=t.all.map(rf);return _A(n,r)}function TA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function PA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function LA(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function MA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function RA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function FA(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function OA(){let e=nf,t=nf,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Jp),l=new Set;function u(){if(l.size<a.length)return;if(i.activityLogs){const I=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(I)&&EA(I);}const p=tf(i);if(wn(e,p)||(t=e,e=p,!n))return;for(const I of o.all)I(e,t);if(!IA(t,e))for(const I of o.stable)I(e,t);const m=TA(t,e);for(const I of m)for(const T of o.location)T(I);const v=PA(t,e);for(const I of v)for(const T of o.ability)T(I);const y=LA(t,e);if(y)for(const I of o.count)I(y);const b=MA(t,e);for(const I of b)for(const T of o.growth)T(I);const A=RA(t,e);for(const I of A)for(const T of o.strengthGain)T(I);const P=FA(t,e);for(const I of P)for(const T of o.maxStrength)T(I);}async function f(){if(n)return;Ln=kA(),console.log(`[myPets] Loaded ${Ln.length} ability logs from storage`);const p=a.map(async m=>{const v=Jp[m],y=await Xe.subscribe(v,b=>{i[m]=b,l.add(m),u();});r.push(y);});await Promise.all(p),n=true,l.size===a.length&&(e=tf(i));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.stable.delete(p)},subscribeLocation(p,m){if(o.location.add(p),m?.immediate&&n&&l.size===a.length)for(const v of e.all)p({pet:v,from:v.location,to:v.location});return ()=>o.location.delete(p)},subscribeAbility(p,m){if(o.ability.add(p),m?.immediate&&n&&l.size===a.length)for(const v of e.all)v.lastAbilityTrigger&&p({pet:v,trigger:v.lastAbilityTrigger});return ()=>o.ability.delete(p)},subscribeCount(p,m){return o.count.add(p),m?.immediate&&n&&l.size===a.length&&p({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(p)},subscribeGrowth(p,m){if(o.growth.add(p),m?.immediate&&n&&l.size===a.length)for(const v of e.all)p({pet:v,previousStage:v.growthStage,newStage:v.growthStage});return ()=>o.growth.delete(p)},subscribeStrengthGain(p,m){if(o.strengthGain.add(p),m?.immediate&&n&&l.size===a.length)for(const v of e.all)p({pet:v,previousStrength:v.currentStrength,newStrength:v.currentStrength});return ()=>o.strengthGain.delete(p)},subscribeMaxStrength(p,m){if(o.maxStrength.add(p),m?.immediate&&n&&l.size===a.length)for(const v of e.all)v.currentStrength===v.maxStrength&&p({pet:v});return ()=>o.maxStrength.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let Zl=null;function Wr(){return Zl||(Zl=OA()),Zl}const of={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},af={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function sf(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function lf(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function NA(e,t){return lf(e)===lf(t)}function DA(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Ia(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function $A(e,t){const n=new Set(e.map(Ia)),r=new Set(t.map(Ia)),o=t.filter(a=>!n.has(Ia(a))),i=e.filter(a=>!r.has(Ia(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function BA(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function zA(){let e=af,t=af,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(of),l=new Set;function u(){if(l.size<a.length)return;const p=sf(i);if(wn(e,p)||(t=e,e=p,!n))return;for(const y of o.all)y(e,t);if(!NA(t,e))for(const y of o.stable)y(e,t);if(DA(t.selectedItem,e.selectedItem)){const y={current:e.selectedItem,previous:t.selectedItem};for(const b of o.selection)b(y);}const m=$A(t.items,e.items);if(m)for(const y of o.items)y(m);const v=BA(t.favoritedItemIds,e.favoritedItemIds);if(v)for(const y of o.favorites)y(v);}async function f(){if(n)return;const p=a.map(async m=>{const v=of[m],y=await Xe.subscribe(v,b=>{i[m]=b,l.add(m),u();});r.push(y);});await Promise.all(p),n=true,l.size===a.length&&(e=sf(i));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.stable.delete(p)},subscribeSelection(p,m){return o.selection.add(p),m?.immediate&&n&&l.size===a.length&&p({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(p)},subscribeItems(p,m){return o.items.add(p),m?.immediate&&n&&l.size===a.length&&p({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(p)},subscribeFavorites(p,m){return o.favorites.add(p),m?.immediate&&n&&l.size===a.length&&p({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let ec=null;function Lo(){return ec||(ec=zA()),ec}const Yc={all:[],host:null,myPlayer:null,count:0};function jA(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function cf(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Yc;const i=new Map;Array.isArray(r)&&r.forEach((f,p)=>{f?.type==="user"&&f?.playerId&&i.set(f.playerId,{slot:f,index:p});});const a=t.map(f=>jA(f,n,i)),l=a.find(f=>f.isHost)??null,u=o!==null?a.find(f=>f.slotIndex===o)??null:null;return {all:a,host:l,myPlayer:u,count:a.length}}function df(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function GA(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function UA(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function WA(){let e=Yc,t=Yc,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,l=4;function u(){if(a.size<l)return;const p=cf(i);if(wn(e,p)||(t=e,e=p,!n))return;for(const A of o.all)A(e,t);if(df(t)!==df(e))for(const A of o.stable)A(e,t);const m=GA(t.all,e.all);for(const A of m)for(const P of o.joinLeave)P(A);const v=UA(t.all,e.all);for(const A of v)for(const P of o.connection)P(A);const y=t.host?.id??null,b=e.host?.id??null;if(y!==b){const A={current:e.host,previous:t.host};for(const P of o.host)P(A);}}async function f(){if(n)return;const p=await tx.onChangeNow(b=>{i.players=b,a.add("players"),u();});r.push(p);const m=await nx.onChangeNow(b=>{i.hostPlayerId=b,a.add("hostPlayerId"),u();});r.push(m);const v=await ex.onChangeNow(b=>{i.userSlots=b,a.add("userSlots"),u();});r.push(v);const y=await Xe.subscribe("myUserSlotIdxAtom",b=>{i.myUserSlotIndex=b,a.add("myUserSlotIndex"),u();});r.push(y),n=true,a.size===l&&(e=cf(i));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribeJoinLeave(p,m){if(o.joinLeave.add(p),m?.immediate&&n&&a.size===l)for(const v of e.all)p({player:v,type:"join"});return ()=>o.joinLeave.delete(p)},subscribeConnection(p,m){if(o.connection.add(p),m?.immediate&&n&&a.size===l)for(const v of e.all)p({player:v,isConnected:v.isConnected});return ()=>o.connection.delete(p)},subscribeHost(p,m){return o.host.add(p),m?.immediate&&n&&a.size===l&&p({current:e.host,previous:e.host}),()=>o.host.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let tc=null;function ig(){return tc||(tc=WA()),tc}const ag=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:ig},Symbol.toStringTag,{value:"Module"})),Wi=["seed","tool","egg","decor"];function HA(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function VA(e,t,n){const r=HA(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0,price:e.price}}function KA(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(f=>VA(f,e,o)),a=i.filter(f=>f.isAvailable).length,l=t.secondsUntilRestock??0,u=l>0?Date.now()+l*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:l,restockAt:u}}function uf(e){const t=e.shops,n=e.purchases??{},r=Wi.map(l=>KA(l,t?.[l],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(l=>l.restockAt!==null);let a=null;if(i.length>0){const u=i.sort((f,p)=>(f.restockAt??0)-(p.restockAt??0))[0];a={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt};}return {all:r,byType:o,nextRestock:a}}const pf={all:Wi.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function ff(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function YA(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function qA(e,t){const n=[];for(const r of Wi){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(l=>[l.id,l]));for(const l of i.items){const u=a.get(l.id);u&&l.purchased>u.purchased&&n.push({shopType:r,itemId:l.id,quantity:l.purchased-u.purchased,newPurchased:l.purchased,remaining:l.remaining});}}return n}function XA(e,t){const n=[];for(const r of Wi){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(l=>[l.id,l]));for(const l of i.items){const u=a.get(l.id);u&&u.isAvailable!==l.isAvailable&&n.push({shopType:r,itemId:l.id,wasAvailable:u.isAvailable,isAvailable:l.isAvailable});}}return n}function QA(){let e=pf,t=pf,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,l=2;function u(){if(a.size<l)return;const p=uf(i);if(wn(e,p)||(t=e,e=p,!n))return;for(const b of o.all)b(e,t);if(ff(t)!==ff(e))for(const b of o.stable)b(e,t);const m={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const b of Wi){const A=YA(t.byType[b],e.byType[b]);if(A)for(const P of m[b])P(A);}const v=qA(t,e);for(const b of v)for(const A of o.purchase)A(b);const y=XA(t,e);for(const b of y)for(const A of o.availability)A(b);}async function f(){if(n)return;const p=await ox.onChangeNow(v=>{i.shops=v,a.add("shops"),u();});r.push(p);const m=await ix.onChangeNow(v=>{i.purchases=v,a.add("purchases"),u();});r.push(m),n=true,a.size===l&&(e=uf(i));}return f(),{get(){return e},getShop(p){return e.byType[p]},getItem(p,m){return e.byType[p].items.find(y=>y.id===m)??null},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribeSeedRestock(p,m){return o.seedRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(p)},subscribeToolRestock(p,m){return o.toolRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(p)},subscribeEggRestock(p,m){return o.eggRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(p)},subscribeDecorRestock(p,m){return o.decorRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(p)},subscribePurchase(p,m){if(o.purchase.add(p),m?.immediate&&n&&a.size===l)for(const v of e.all)for(const y of v.items)y.purchased>0&&p({shopType:v.type,itemId:y.id,quantity:y.purchased,newPurchased:y.purchased,remaining:y.remaining});return ()=>o.purchase.delete(p)},subscribeAvailability(p,m){if(o.availability.add(p),m?.immediate&&n&&a.size===l)for(const v of e.all)for(const y of v.items)p({shopType:v.type,itemId:y.id,wasAvailable:y.isAvailable,isAvailable:y.isAvailable});return ()=>o.availability.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let nc=null;function Mo(){return nc||(nc=QA()),nc}function sg(e){const t=e||"Sunny",o=Oe.get("weather")?.[t]?.name||t;return {id:t,name:o,isActive:t!=="Sunny",type:t,startTime:null,endTime:null,remainingSeconds:0}}function hf(){return sg(null)}function JA(){let e=hf(),t=hf(),n=null,r=false,o=null;const i={all:new Set,stable:new Set};function a(u){const f=(u||"Sunny")!==(n||"Sunny");n=u;const p=sg(u),m=e.id!==p.id;if(t=e,e=p,!!r){if(f)for(const v of i.all)v(e,t);if(m){const v={current:e,previous:t};for(const y of i.stable)y(v);}}}async function l(){r||(o=await Xe.subscribe("weatherAtom",u=>{a(u);}),r=true);}return l(),{get(){return e},subscribe(u,f){return i.all.add(u),f?.immediate!==false&&r&&u(e,e),()=>i.all.delete(u)},subscribeStable(u,f){return i.stable.add(u),f?.immediate&&r&&u({current:e,previous:e}),()=>i.stable.delete(u)},destroy(){o?.(),o=null,i.all.clear(),i.stable.clear(),r=false;}}}let rc=null;function Hi(){return rc||(rc=JA()),rc}let Dt=null;function lg(){return Dt||(Dt={currentTile:xt(),myPets:Wr(),gameMap:Vc(),myInventory:Lo(),players:ig(),shops:Mo(),weather:Hi(),myGarden:Ur()},Dt)}function Yn(){if(!Dt)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Dt}function ZA(){Dt&&(Dt.currentTile.destroy(),Dt.myPets.destroy(),Dt.gameMap.destroy(),Dt.myInventory.destroy(),Dt.players.destroy(),Dt.shops.destroy(),Dt.weather.destroy(),Dt.myGarden.destroy(),Dt=null);}const Gt={get currentTile(){return Yn().currentTile},get myPets(){return Yn().myPets},get gameMap(){return Yn().gameMap},get myInventory(){return Yn().myInventory},get players(){return Yn().players},get shops(){return Yn().shops},get weather(){return Yn().weather},get myGarden(){return Yn().myGarden}};function eE(e){const t=Xd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function tE(e){const r=Gt.shops.getShop("seed").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=Xd(e);u.ok?a++:i.push(u.reason||`Failed to purchase seed ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function nE(e){const t=Yd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function rE(e){const r=Gt.shops.getShop("egg").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=Yd(e);u.ok?a++:i.push(u.reason||`Failed to purchase egg ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function oE(e){const t=Kd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function iE(e){const r=Gt.shops.getShop("decor").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=Kd(e);u.ok?a++:i.push(u.reason||`Failed to purchase decor ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function aE(e){const t=qd(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function sE(e){const r=Gt.shops.getShop("tool").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=qd(e);u.ok?a++:i.push(u.reason||`Failed to purchase tool ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}let oc=false;const Er={init(){oc||(oc=true,console.log("[MGShopActions] Initialized"));},isReady(){return oc},seed:{buy:eE,buyAll:tE},egg:{buy:nE,buyAll:rE},decor:{buy:oE,buyAll:iE},tool:{buy:aE,buyAll:sE}};async function cg(e){const t=[{name:"Data",init:()=>Oe.init()},{name:"CustomModal",init:()=>io.init()},{name:"Sprites",init:()=>Qe.init()},{name:"TileObjectSystem",init:()=>Zn.init()},{name:"Pixi",init:()=>Hs.init()},{name:"RiveLoader",init:()=>yo.init()},{name:"Audio",init:()=>yt.init()},{name:"Cosmetics",init:()=>Jd.init()},{name:"ShopActions",init:()=>Er.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const dg=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:Io,MGAudio:yt,MGCalculators:rg,MGCosmetic:Jd,MGCustomModal:io,MGData:Oe,MGEnvironment:Rt,MGManifest:bo,MGPixi:Hs,MGPixiHooks:Mn,MGRiveLoader:yo,MGShopActions:Er,MGSprite:Qe,MGTile:Zn,MGVersion:wd,PET_ABILITY_ACTIONS:Sh,filterPetAbilityLogs:Eh,formatAbilityLog:_h,initAllModules:cg,isPetAbilityAction:Ah},Symbol.toStringTag,{value:"Module"}));function lE(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"||t==="mythic"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function cE(e){return e.toLowerCase()}function ou(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:l=true,size:u="md",onClick:f,variant:p="default",rarity:m=null,abilityId:v="",abilityName:y=""}=e,b=w("span",{className:"badge",id:t});l&&b.classList.add("badge--pill"),u==="sm"?b.classList.add("badge--sm"):u==="lg"?b.classList.add("badge--lg"):b.classList.add("badge--md"),f&&b.addEventListener("click",f);let A=false,P=a;function I(){A||(P===false?b.style.border="none":b.style.border="");}function T(C,E=o){b.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),b.classList.add(`badge--${C}`,`badge--${E}`),I();}function N(C){const E=(C??"").trim();E?(b.style.border=E,A=true):(A=false,I());}function z(C){P=C,I();}function O(C){b.textContent=C;}function M(C,E=o){T(C,E);}function F(C){b.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),b.style.background="",b.style.backgroundSize="",b.style.animation="",b.style.color="",b.style.webkitTextStroke="";const E=lE(C);if(!E){b.textContent=String(C??"—");return}b.textContent=E,b.classList.add("badge--rarity",`badge--rarity-${cE(E)}`);}function L(C,E){const j=Oe.get("abilities")?.[C],V=j?.color,U=V||"rgba(100, 100, 100, 0.9)",ce=V?`${V}`:"rgba(150, 150, 150, 1)";b.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),b.classList.add("badge--ability"),b.textContent=E||j?.name||C||"Unknown Ability",b.style.background=U,b.style.color="white",b.style.border="none",b.style.webkitTextStroke="",b.style.animation="",b.style.backgroundSize="";const Y=()=>{b.style.background=ce;},ie=()=>{b.style.background=U;};b.removeEventListener("mouseenter",Y),b.removeEventListener("mouseleave",ie),b.addEventListener("mouseenter",Y),b.addEventListener("mouseleave",ie);}return p==="rarity"?F(m):p==="ability"?L(v,y):(b.textContent=n,T(r,o),typeof a=="boolean"&&z(a),i&&N(i)),{root:b,setLabel:O,setType:M,setBorder:N,setWithBorder:z,setRarity:F,setAbility:L}}const dE={expanded:false,sort:{key:null,dir:null},search:""},uE={categories:{}};async function pE(){const e=await _o("tab-test",{version:2,defaults:uE,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...dE}}function n(i,a){const l=e.get(),u=t(i);e.update({categories:{...l.categories,[i]:{...u,expanded:a}}});}function r(i,a,l){const u=e.get(),f=t(i);e.update({categories:{...u.categories,[i]:{...f,sort:{key:a,dir:l}}}});}function o(i,a){const l=e.get(),u=t(i);e.update({categories:{...l.categories,[i]:{...u,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const fE={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Ta(e){return e?fE[e]??0:0}class hE extends Br{constructor(){super({id:"tab-test",label:"Test"});xe(this,"stateCtrl",null);}async build(n){this.stateCtrl=await pE();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=w("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(async()=>{try{const i=await Qe.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=w("span",{style:"opacity:0.5;"});return o.textContent="—",o}return ou({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),l=v=>{if(!v)return o;const y=v.toLowerCase();return o.filter(b=>b.name.toLowerCase().includes(y))},u=vd({columns:i,data:l(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:v=>v.spriteId,onSortChange:(v,y)=>{this.stateCtrl.setCategorySort(n,v,y);}});a.sort.key&&a.sort.dir&&u.sortBy(a.sort.key,a.sort.dir);const f=js({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:v=>{const y=v.trim();this.stateCtrl.setCategorySearch(n,y),u.setData(l(y));}}),p=w("div",{style:"margin-bottom:8px;"});p.appendChild(f.root);const m=w("div");return m.appendChild(p),m.appendChild(u.root),pt({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:v=>{this.stateCtrl.setCategoryExpanded(n,v);}},m)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=Oe.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const l=(a?.seed?.name||"").toLowerCase();if(l===i||l===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=Oe.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=Oe.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=Oe.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=Oe.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>Ta(i.rarity)-Ta(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!Qe.isReady())try{await Qe.init();}catch{return}const o=Qe.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],u=Qe.getCategoryId(a).map(f=>{const p=`sprite/${a}/${f}`;return {name:f,spriteId:p,rarity:this.getRarityForSprite(a,p,f)}});if(u.sort((f,p)=>Ta(f.rarity)-Ta(p.rarity)),u.length>0){const f=this.createDataCard(a,this.formatCategoryName(a),u,r);n.appendChild(f);}}}}function mE(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function gE(e,t){const n=e;let r=e;const o=zs({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==r&&(r=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==r&&(r=a,t?.(a));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const i=o.getValue().trim()||n;i!==r&&(r=i,t?.(i));}),o.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),o.input.blur());}),o.root}function bE(e){const t=w("div",{className:"team-list-item"}),n=e.customIndicator??w("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?gE(e.team.name,e.onNameChange):w("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=w("div",{className:"team-list-item__sprites"});async function i(){const u=Gt.myPets.get();o.innerHTML="";for(let f=0;f<3;f++){const p=e.team.petIds[f],m=p&&p!=="",v=w("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!m?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(v.style.cursor="pointer",v.addEventListener("click",()=>{e.onSlotClick(f);})),m){let y=u.all.find(b=>b.id===p);if(!y){const b=window.__petDataCache;b&&b.has(p)&&(y=b.get(p));}if(y)try{const b=await Qe.toCanvas("pet",y.petSpecies,{mutations:y.mutations,scale:1}),A=document.createElement("canvas");A.width=b.width,A.height=b.height;const P=A.getContext("2d");if(P&&P.drawImage(b,0,0),A.style.width="100%",A.style.height="100%",A.style.objectFit="contain",v.appendChild(A),e.showSlotStyles){const I=w("div",{className:"team-list-item__sprite-slot-overlay"});v.appendChild(I),v.classList.add("team-list-item__sprite-slot--filled");}}catch(b){console.warn(`[TeamListItem] Failed to render sprite for pet ${y.petSpecies}:`,b);const A=w("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});v.appendChild(A);}else {const b=w("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});v.appendChild(b),console.warn(`[TeamListItem] Pet ${p} not found in myPets yet, waiting for update`);let A=false;const P=Gt.myPets.subscribe(async()=>{if(A)return;const T=Gt.myPets.get().all.find(N=>N.id===p);if(T){A=true,P();try{v.innerHTML="";const N=await Qe.toCanvas("pet",T.petSpecies,{mutations:T.mutations,scale:1}),z=document.createElement("canvas");z.width=N.width,z.height=N.height;const O=z.getContext("2d");if(O&&O.drawImage(N,0,0),z.style.width="100%",z.style.height="100%",z.style.objectFit="contain",v.appendChild(z),e.showSlotStyles){const M=w("div",{className:"team-list-item__sprite-slot-overlay"});v.appendChild(M),v.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${p} sprite updated`);}catch(N){console.warn(`[TeamListItem] Failed to render sprite for pet ${T.petSpecies}:`,N),v.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!m){const y=mE();v.appendChild(y);}o.appendChild(v);}}i();const a=Gt.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const u=w("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(u);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const u=w("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});u.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',u.addEventListener("click",f=>{f.stopPropagation(),e.onExpandClick?.();}),t.appendChild(u);}const l=new MutationObserver(()=>{document.contains(t)||(l.disconnect(),a());});return l.observe(document.body,{childList:true,subtree:true}),t}function vE(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ro(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,l=w("div",{className:"sg-root"});r!=="md"&&l.classList.add(`sg--${r}`),o&&(l.style.width="100%");const u=w("div",{className:"sg-container",role:"tablist"}),f=w("div",{className:"sg-indicator"}),p=t.map(F=>{const L=w("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:F.label});if(L.id=F.id,F.icon){const E=w("span",{className:"sg-icon"}),B=vE(F.icon);B&&E.appendChild(B),L.appendChild(E);}const C=w("span",{className:"sg-label"},F.label);return L.appendChild(C),L.disabled=!!F.disabled,L});u.appendChild(f),p.forEach(F=>u.appendChild(F)),l.appendChild(u);let m=n,v=i,y=null;function b(){const F=p.find(L=>L.id===m);F&&requestAnimationFrame(()=>{const L=f,C=F.offsetLeft,E=F.offsetWidth;L.style.width=`${E}px`,L.style.transform=`translateX(${C}px)`;});}function A(){p.forEach(F=>{const L=F.id===m;F.classList.toggle("active",L),F.setAttribute("aria-selected",String(L)),F.disabled=v||!!t.find(C=>C.id===F.id)?.disabled;}),b();}function P(F){const L=F.currentTarget;if(L.disabled)return;T(L.id);}function I(F){if(v)return;const L=p.findIndex(E=>E.id===m);let C=L;if(F.key==="ArrowLeft"||F.key==="ArrowUp"?(F.preventDefault(),C=(L-1+p.length)%p.length):F.key==="ArrowRight"||F.key==="ArrowDown"?(F.preventDefault(),C=(L+1)%p.length):F.key==="Home"?(F.preventDefault(),C=0):F.key==="End"&&(F.preventDefault(),C=p.length-1),C!==L){const E=p[C];E&&!E.disabled&&(T(E.id),E.focus());}}p.forEach(F=>{F.addEventListener("click",P),F.addEventListener("keydown",I);});function T(F){!t.some(C=>C.id===F)||m===F||(m=F,A(),a?.(m));}function N(){return m}function z(F){v=!!F,A();}function O(){p.forEach(F=>{F.removeEventListener("click",P),F.removeEventListener("keydown",I);}),y?.disconnect(),y=null;}A(),y=new ResizeObserver(()=>{const F=p.find(L=>L.id===m);if(F&&F.offsetWidth>0){const L=f;L.style.transition="none",L.style.width=`${F.offsetWidth}px`,L.style.transform=`translateX(${F.offsetLeft}px)`,requestAnimationFrame(()=>{L.style.removeProperty("transition");}),y?.disconnect(),y=null;}}),y.observe(u);const M=l;return M.select=T,M.getSelected=N,M.setDisabled=z,M.destroy=O,M}function nl(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:l}=e,u=w("div",{className:"lg-checkbox-wrap"}),f=w("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let p=null;i&&a!=="none"&&(p=w("label",{className:"lg-checkbox-label"},i),p.addEventListener("click",A)),p&&a==="left"?u.append(p,f):p&&a==="right"?u.append(f,p):u.append(f);let m=!!n,v=!!r;function y(){f.checked=m,f.disabled=v;}function b(F=false){v||(m=!m,y(),F||l?.(m));}function A(){v||b();}function P(F){v||(F.key===" "||F.key==="Enter")&&(F.preventDefault(),b());}f.addEventListener("click",A),f.addEventListener("keydown",P);function I(){return m}function T(F,L=false){m=!!F,y(),L||l?.(m);}function N(F){v=!!F,y();}function z(F){if(!F){p&&(p.remove(),p=null);return}p?p.textContent=F:(p=w("label",{className:"lg-checkbox-label"},F),p.addEventListener("click",A),u.append(p));}function O(){f.focus();}function M(){f.removeEventListener("click",A),f.removeEventListener("keydown",P),p&&p.removeEventListener("click",A);}return y(),{root:u,input:f,isChecked:I,setChecked:T,setDisabled:N,setLabel:z,focus:O,destroy:M}}const ug=At.PET_TEAM,yE={enabled:false,teams:[],activeTeamId:null},iu=3,mf=50,St="";function Ft(){return at(ug,yE)}function ur(e){st(ug,e);}function xE(e){const n={...Ft(),...e};return ur(n),n}function wE(){return Ft().enabled}function CE(e){xE({enabled:e});}function kE(){return crypto.randomUUID()}function qc(){return Date.now()}function pg(e=[]){const t=[...e];for(;t.length<iu;)t.push(St);return [t[0]||St,t[1]||St,t[2]||St]}function fg(e,t){const n=Ft(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function hg(e,t){const n=Ft();if(!e.some(i=>i!==St))return  true;const o=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===o)}function mg(e){const n=Wr().get(),r=new Set(n.all.map(i=>i.id)),o=Ft();for(const i of o.teams)for(const a of i.petIds)a!==St&&r.add(a);for(const i of e)if(i!==St&&!r.has(i))return  false;return  true}function SE(e){const n=Wr().get(),r=new Map(n.all.map(i=>[i.id,i])),o=[];for(const i of e.petIds){if(i===St)continue;const a=r.get(i);a&&o.push(a);}return o}function AE(e){return e.petIds.every(t=>t!==St)}function EE(e){const t=[];for(let n=0;n<iu;n++)e.petIds[n]===St&&t.push(n);return t}function _E(e){return e.petIds.filter(t=>t!==St).length}function IE(e){return e.petIds.every(t=>t===St)}function TE(e,t){return e.petIds.includes(t)}function PE(e,t){return e.petIds.indexOf(t)}function LE(e,t=[]){const n=Ft();if(n.teams.length>=mf)throw new Error(`Maximum number of teams (${mf}) reached`);if(!fg(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=pg(t);if(!mg(o))throw new Error("One or more pet IDs do not exist");if(!hg(o))throw new Error("A team with this exact composition already exists");const i={id:kE(),name:r,petIds:o,createdAt:qc(),updatedAt:qc()};return n.teams.push(i),ur(n),i}function gg(e,t){const n=Ft(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!fg(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=pg(t.petIds);if(!mg(a))throw new Error("One or more pet IDs do not exist");if(!hg(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:qc()};return n.teams[r]=i,ur(n),i}function ME(e){const t=Ft(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(ur(t),true)}function RE(e){return Ft().teams.find(n=>n.id===e)??null}function FE(){return [...Ft().teams]}function OE(e){const t=Ft(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function NE(e){const t=Ft(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),ur(t),true}function DE(e,t){try{return gg(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function $E(){const n=Wr().get().byLocation.active.map(o=>o.id).sort(),r=Ft();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,l)=>a===n[l]))return o.id}return null}function bg(){const e=$E(),t=Ft();return e!==t.activeTeamId&&(t.activeTeamId=e,ur(t)),e}function vg(e){const t=Ft();t.activeTeamId=e,ur(t);}function BE(e){return bg()===e}function zE(e){const t=Wr(),n=Lo(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=r.byLocation.active,a=e.petIds.filter(p=>p!==St).sort(),l=i.map(p=>p.id).sort();if(JSON.stringify(a)===JSON.stringify(l)){console.log("[PetTeam] Team already active");return}const u=r.hutch,f=u.hasHutch?u.maxItems-u.currentItems:0;jE(e.petIds,f,r),vg(e.id),console.log("[PetTeam] Team activated successfully");}function jE(e,t,n){const r=n.byLocation.active;let o=t,i=0;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<iu;a++){const l=e[a],u=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${u?.id.slice(0,8)??"empty"}, target=${l.slice(0,8)||"empty"}, hutchSpace=${o}`),u?.id===l){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(l===St&&u){const f=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${f}`),GE(u.id,f),f&&o--;continue}if(!u&&l!==St){const p=n.all.find(m=>m.id===l)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${p}`),p&&o++,WE(l,n,i),i++;continue}if(u&&l!==St){const p=n.all.find(v=>v.id===l)?.location==="hutch";p&&o++;const m=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${p}, storeInHutch=${m}`),HE(u.id,l,n,m),m&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function GE(e,t){Gm(e),t&&Hd(e);}function UE(e){const t=Ur().get(),n=t.tiles.tileObjects[e]??t.tiles.tileObjects[0];return n?{position:n.position,tileType:"Dirt",localTileIndex:n.localIndex}:{position:{x:0,y:0},tileType:"Dirt",localTileIndex:0}}function WE(e,t,n){const r=t.all.find(l=>l.id===e);if(!r){console.warn(`[PetTeam] Pet ${e} not found`);return}r.location==="hutch"&&Vd(e);const{position:o,tileType:i,localTileIndex:a}=UE(n);zm(e,o,i,a);}function HE(e,t,n,r){const o=n.all.find(i=>i.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&Vd(t),jm(e,t),r&&Hd(e);}function VE(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function KE(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(r=>r&&typeof r=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function YE(e){const t=Date.now(),n=e.slots||[],r=[typeof n[0]=="string"?n[0]:St,typeof n[1]=="string"?n[1]:St,typeof n[2]=="string"?n[2]:St];return {name:e.name?.trim()||"Imported Team",petIds:r,createdAt:t,updatedAt:t}}function qE(){const e={success:false,source:"none",imported:0,errors:[]};if(!VE())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=KE();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=Ft();n.teams=[],n.activeTeamId=null;const r=new Set;for(const o of t)try{const i=YE(o);let a=i.name;if(r.has(a)){let u=1;for(;r.has(`${a} (${u})`);)u++;a=`${a} (${u})`;}r.add(a);const l={id:crypto.randomUUID(),name:a,petIds:i.petIds,createdAt:i.createdAt,updatedAt:i.updatedAt};n.teams.push(l),e.imported++;}catch(i){const a=i instanceof Error?i.message:String(i);e.errors.push(`Failed to import "${o.name}": ${a}`);}return e.imported>0&&(ur(n),e.success=true,e.source="aries"),e}let Pa=false;const dt={init(){if(Pa)return;if(!Ft().enabled){console.log("[PetTeam] Feature disabled");return}Pa=true,console.log("[PetTeam] Feature initialized");},destroy(){Pa&&(Pa=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:wE,setEnabled:CE,createTeam:LE,updateTeam:gg,deleteTeam:ME,renameTeam:DE,getTeam:RE,getAllTeams:FE,getTeamByName:OE,reorderTeams:NE,getPetsForTeam:SE,isTeamFull:AE,getEmptySlots:EE,getFilledSlotCount:_E,isTeamEmpty:IE,isPetInTeam:TE,getPetSlotIndex:PE,getActiveTeamId:bg,setActiveTeamId:vg,isActiveTeam:BE,activateTeam:zE,importFromAries:qE};let qo=0,gf="",bf="";function XE(){return qo===0&&(gf=document.body.style.overflow,bf=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),qo++,()=>{qo=Math.max(0,qo-1),qo===0&&(document.body.style.overflow=gf,document.body.style.touchAction=bf);}}class QE{constructor(t){xe(this,"dragState",null);xe(this,"longPressState",null);xe(this,"options");xe(this,"onPointerMove");xe(this,"onPointerUp");xe(this,"onPointerCancel");xe(this,"onLongPressPointerMove");xe(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),dt.getAllTeams().findIndex(f=>f.id===r)===-1)return;const a=t.clientX,l=t.clientY,u=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:l,timeout:u,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const a=dt.getAllTeams().findIndex(v=>v.id===r);if(a===-1)return;const l=n.getBoundingClientRect(),u=o.getBoundingClientRect(),f=n.cloneNode(true);f.classList.add("team-list-item--placeholder"),f.classList.remove("team-list-item--dragging");const p=n.style.touchAction;n.style.touchAction="none";const m=XE();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:f,offsetY:t.clientY-l.top,fromIndex:a,teamId:r,captureTarget:n,touchActionPrev:p,releaseScrollLock:m},n.classList.add("team-list-item--dragging"),n.style.width=`${l.width}px`,n.style.height=`${l.height}px`,n.style.left=`${l.left-u.left}px`,n.style.top=`${l.top-u.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(f,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const i=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(o=Math.max(-8,Math.min(i+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,i=Array.from(n.children).filter(u=>u!==o&&u!==r&&u instanceof HTMLElement&&u.classList.contains("team-list-item")),a=new Map;i.forEach(u=>{a.set(u,u.getBoundingClientRect().top);});let l=false;for(const u of i){const f=u.getBoundingClientRect(),p=f.top+f.height/2;if(t<p){r.nextSibling!==u&&n.insertBefore(r,u),l=true;break}}l||n.appendChild(r),i.forEach(u=>{const f=a.get(u),p=u.getBoundingClientRect().top;if(f!==void 0&&f!==p){const m=f-p;u.style.transform=`translateY(${m}px)`,u.style.transition="none",u.offsetHeight,u.style.transition="transform 0.14s ease",u.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:i,fromIndex:a,touchActionPrev:l,releaseScrollLock:u,pointerId:f}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(f))try{o.releasePointerCapture(f);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const v=Array.from(n.children).filter(y=>y!==o&&y!==i&&y instanceof HTMLElement&&y.classList.contains("team-list-item"))[a]||null;v?n.insertBefore(i,v):n.appendChild(i);}else {const m=Array.from(n.children).filter(y=>y!==o),v=m.indexOf(i);if(v!==-1){const y=m[v];y!==i&&n.insertBefore(i,y);}}if(i.replaceWith(o),i.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=l??"",Array.from(n.children).filter(m=>m instanceof HTMLElement&&m.classList.contains("team-list-item")).forEach(m=>{m.style.transform="",m.style.transition="";}),u?.(),!r){const v=Array.from(n.children).filter(y=>y instanceof HTMLElement&&y.classList.contains("team-list-item")).indexOf(o);if(v!==-1&&v!==a){const b=dt.getAllTeams().slice(),[A]=b.splice(a,1);b.splice(v,0,A);const P=b.map(I=>I.id);dt.reorderTeams(P),this.options.onReorder(P);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class JE{constructor(t={}){xe(this,"card",null);xe(this,"modeControl",null);xe(this,"modeContainer",null);xe(this,"teamContent",null);xe(this,"listContainer",null);xe(this,"teamMode","overview");xe(this,"selectedTeamIds",new Set);xe(this,"teamCheckboxes",new Map);xe(this,"options");xe(this,"dragHandler");this.options=t,this.dragHandler=new QE({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!dt.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=w("div",{className:"team-card-wrapper"});this.modeContainer=w("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=w("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=pt({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=Ro({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=w("div",{className:"team-card__disabled-state"}),n=w("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=kt({label:"Enable Feature",onClick:()=>{dt.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=dt.getAllTeams(),n=dt.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=w("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=bE({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:l=>{this.handleRenameTeam(r.id,l);},onSlotClick:this.teamMode==="manage"?l=>{this.handleRemovePet(r.id,l);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async l=>{if(!l.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await dt.activateTeam(r),this.options.onTeamsUpdated?.();}catch(f){console.error("[TeamCard] Failed to activate team:",f);}}}),a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(l,a,r.id):this.dragHandler.startLongPress(l,a,r.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=w("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=w("div",{className:"team-card__actions"}),r=kt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=w("div",{className:"team-card__actions"}),n=kt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=kt({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),o=kt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});o.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),t.appendChild(o),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=dt.getAllTeams(),i=new Set(o.map(a=>a.name));for(;i.has(n);)n=`${t} (${r})`,r++;try{dt.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)dt.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=dt.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){dt.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const r=dt.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=dt.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",dt.updateTeam(t,{petIds:o}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const r=dt.getTeam(t);if(!r)return;const i=Gt.myPets.get().all.map(y=>({id:y.id,itemType:"Pet",petSpecies:y.petSpecies,name:y.name??null,xp:y.xp,hunger:y.hunger,mutations:y.mutations||[],targetScale:y.targetScale,abilities:y.abilities||[]})),a=new Set(r.petIds.filter(y=>y!=="")),l=i.filter(y=>!a.has(y.id));await Xe.set("mySelectedItemIdAtom",null);const u=Rt.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const p=Gt.myInventory.subscribeSelection(y=>{if(y.current&&y.current.item){const b=y.current.item,A=[...r.petIds];A[n]=b.id,dt.updateTeam(t,{petIds:A}),this.options.onTeamsUpdated?.(),Xe.set("mySelectedItemIdAtom",null),io.close().then(()=>{const P=Rt.detect();(P.platform==="mobile"||P.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await io.show("inventory",{items:l,favoritedItemIds:[]}),await io.waitForClose();const m=Rt.detect();(m.platform==="mobile"||m.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),p();}createCheckboxIndicator(t){const n=nl({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}const ZE=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],yg=At.XP_TRACKER,e_={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},co="XP Tracker",uo="[XpTracker]";function Fo(){return at(yg,e_)}function xg(e){st(yg,e);}function wg(e){const n={...Fo(),...e};return xg(n),n}function Cg(){return Fo().enabled}function t_(e){wg({enabled:e});}function au(e){return ZE.includes(e)}function n_(e){const t=Oe.get("abilities");if(!t)return null;const n=t[e];return !n||!au(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function kg(e){return e.filter(au)}function r_(e){return e.some(au)}function o_(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function Sg(e,t,n,r=100){const o=n_(e);if(!o)return null;const i=o_(e),a=o.requiredWeather,l=a===null||n===a,u=t/r,f=u*u,p=o.baseProbability,m=o.bonusXp,v=p,y=Math.floor(m*f),b=v/100*60,A=l?Math.floor(b*y):0;return {abilityId:e,abilityName:o.name,tier:i,baseChancePerMinute:p,actualChancePerMinute:v,baseXpPerProc:m,actualXpPerProc:y,expectedProcsPerHour:b,expectedXpPerHour:A,requiredWeather:a,isActive:l}}function i_(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=kg(r.abilities);for(const i of o){const a=Sg(i,r.strength,t,r.maxStrength||100);a&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:a}),a.isActive&&(n.totalBonusXpPerHour+=a.expectedXpPerHour,n.totalProcsPerHour+=a.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function a_(e,t,n,r=100){const o=kg(e);return o.length===0?null:Sg(o[0],t,n,r)}function vf(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function s_(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function l_(e,t){return e.species.localeCompare(t.species)}function c_(e,t){return t.currentStrength-e.currentStrength}function d_(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function u_(e,t){return e.name.localeCompare(t.name)}function p_(e){switch(e){case "closestToMax":return vf;case "furthestFromMax":return s_;case "species":return l_;case "strength":return c_;case "location":return d_;case "name":return u_;default:return vf}}function Ag(e,t){const n=p_(t);return [...e].sort(n)}function f_(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function h_(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function Eg(e,t){let n=e;return n=f_(n,t.filterSpecies),n=h_(n,t.filterHasXpBoost),n=Ag(n,t.sortBy),n}let Co=false,Qa=null,rl=[],su=null;function m_(e,t,n){const r=Xm(e.petSpecies,e.targetScale),o=Qm(e.petSpecies,e.xp,r),i=o>=r,a=e.hunger<=0,l=a?0:Qn,u=a_(e.abilities,o,t);u?.isActive&&u.expectedXpPerHour;const f=e.location==="active"&&!a?l+n:0,p=eg(e.petSpecies,e.xp,o,r,f>0?f:Qn),m=Zm(e.petSpecies,e.xp,r,f>0?f:Qn),v=tg(e.petSpecies,e.hunger,p),y=xs(e.petSpecies,e.hunger,m);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:a,currentStrength:o,maxStrength:r,isMaxStrength:i,hoursToNextStrength:p,hoursToMaxStrength:m,feedsToNextStrength:v,feedsToMaxStrength:y,baseXpPerHour:l,totalXpPerHour:f,xpBoostStats:u,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function _g(){const e=Gt.myPets.get(),t=Gt.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(u=>!u.isMature||r_(u.abilities)).filter(u=>u.hunger>0).map(u=>({petId:u.id,petName:u.name??"",abilities:u.abilities,strength:u.currentStrength})),i=i_(o,n);su=i;const a=[];for(const u of e.all){const f=m_({id:u.id,petSpecies:u.petSpecies,name:u.name??"",xp:u.xp,hunger:u.hunger,targetScale:u.targetScale,abilities:u.abilities,mutations:u.mutations,location:u.location},n,i.totalBonusXpPerHour);a.push(f);}const l=Math.max(0,...a.map(u=>u.hoursToMaxStrength));for(const u of a)u.isMaxStrength&&u.xpBoostStats&&(u.feedsToMaxStrength=ng(true,true,u.species,u.hunger,0,l));return a}function Ig(){if(Co)return;if(!Fo().enabled){console.log(`${uo} ${co} disabled`);return}console.log(`${uo} Initializing ${co}...`),Oe.isReady()&&(rl=_g()),Co=true,console.log(`${uo} ${co} initialized`);}function lu(){return Co&&Oe.isReady()}function cu(){return lu()?rl:[]}function g_(){return cu().filter(e=>e.location==="active")}function b_(){return su}function du(){lu()&&(rl=_g());}function v_(e){uu();const t=Fo(),n=e??t.updateIntervalMs;Qa=setInterval(()=>{Cg()&&du();},n);}function uu(){Qa&&(clearInterval(Qa),Qa=null);}function Tg(){Co&&(uu(),Co=false,rl=[],su=null,console.log(`${uo} ${co} destroyed`));}function y_(){const e=Fo();return Eg(cu(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function x_(e){t_(e),e?(Co=false,Ig(),Oe.isReady()&&du(),console.log(`${uo} ${co} enabled`)):(Tg(),console.log(`${uo} ${co} disabled`));}const Xc={init:Ig,isReady:lu,destroy:Tg,loadConfig:Fo,saveConfig:xg,updateConfig:wg,isEnabled:Cg,setEnabled:x_,getAllPetsProgress:cu,getActivePetsProgress:g_,getCombinedBoostStats:b_,getFilteredPets:y_,refresh:du,startAutoUpdate:v_,stopAutoUpdate:uu,sortPets:Ag,filterAndSortPets:Eg},w_={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},C_={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(w_),...Object.keys(C_)];const k_=`
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
`;class S_{constructor(){xe(this,"card",null);xe(this,"listContainer",null);xe(this,"innerContent",null);xe(this,"logs",[]);xe(this,"filteredLogs",[]);xe(this,"unsubscribe",null);xe(this,"ITEM_HEIGHT",88);xe(this,"BUFFER_SIZE",3);xe(this,"VIEWPORT_HEIGHT",480);xe(this,"renderedRange",{start:0,end:0});xe(this,"scrollListener",null);xe(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=Wr(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const r=t.get().abilityLogs;this.updateFromAbilityLogs(r);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=Oe.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},l=_h(a),u=new Date(n.performedAt),f=u.toLocaleDateString("en-US",{month:"short",day:"numeric"}),p=u.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),m=`${f} ${p}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:l,formattedDate:m}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return ou({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=w("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=w("div",{style:"margin-bottom: 0;"}),r=js({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const i=o.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=w("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=w("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=pt({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=w("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}async handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let r=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),o=Math.min(this.filteredLogs.length,r+n+this.BUFFER_SIZE*2);if(r===this.renderedRange.start&&o===this.renderedRange.end)return;this.renderedRange={start:r,end:o},this.innerContent.replaceChildren();const i=r*this.ITEM_HEIGHT;if(i>0){const l=w("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(l);}for(let l=r;l<o;l++){const u=this.filteredLogs[l],f=await this.createLogItemCard(u);this.innerContent.appendChild(f);}const a=Math.max(0,(this.filteredLogs.length-o)*this.ITEM_HEIGHT);if(a>0){const l=w("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(l);}}async createLogItemCard(t){const n=w("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const r=w("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const p=await Qe.toCanvas("pet",t.petSpecies);p&&(p.style.width="100%",p.style.height="100%",p.style.objectFit="contain",r.appendChild(p));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=w("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=w("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=w("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),l=w("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);i.appendChild(a),i.appendChild(l),o.appendChild(i);const u=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(u);const f=w("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(f),n.appendChild(o),n}}function un(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Pg=`
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

`,A_=`
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
`,Lg=`
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
`,E_=`
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
`,__=`
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
`;class I_ extends Br{constructor(n){super({id:"tab-pets",label:"Pets"});xe(this,"unsubscribeMyPets");xe(this,"lastActiveTeamId",null);xe(this,"teamCardPart",null);xe(this,"abilityLogsCardPart",null);xe(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await xn(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>dg);return {MGSprite:a}},void 0);await r.init();const o=n.getRootNode();un(o,Pg,"team-card-styles"),un(o,A_,"base-pet-card-styles"),un(o,Lg,"badge-styles"),un(o,E_,"arcade-button-styles"),un(o,k_,"gemini-icon-button-styles"),un(o,__,"ability-logs-card-styles");const i=this.createGrid("12px");i.id="pets",n.appendChild(i),this.initializeTeamCardPart(i),this.initializeAbilityLogsCardPart(i),this.unsubscribeMyPets=Gt.myPets.subscribeStable(()=>{const a=dt.getActiveTeamId();a!==this.lastActiveTeamId&&(this.lastActiveTeamId=a,this.teamCardPart?.render());}),this.lastActiveTeamId=dt.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new JE({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new S_);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const T_=`
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
`,yf={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function P_(){const e=await _o("tab-alerts",{version:1,defaults:yf,sanitize:o=>({ui:{expandedCards:go(yf.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:go(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const Mg=At.SHOP_NOTIFIER,Rg={seed:[],tool:[],egg:[],decor:[]},L_={enabled:false,trackedItems:Rg},M_=["seed","tool","egg","decor"];function Fg(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function Vi(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function Oo(){const e=at(Mg,L_);return {enabled:e?.enabled??false,trackedItems:Fg(e?.trackedItems)}}function ol(e){st(Mg,{enabled:e.enabled,trackedItems:Vi(e.trackedItems)});}function R_(e){const n={...Oo(),...e};return e.trackedItems&&(n.trackedItems=Fg(e.trackedItems)),ol(n),n}function pu(){return Oo().enabled}function F_(e){R_({enabled:e});}function Og(){return Vi(Oo().trackedItems)}function Ng(){const e=Og(),t=[];for(const n of M_)for(const r of e[n])t.push({shopType:n,itemId:r});return t}function O_(e,t){const n=Oo(),r=Vi(n.trackedItems),o=r[e];if(o.includes(t))return;o.push(t),ol({...n,trackedItems:r});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(i);}function Dg(e,t){const n=Oo(),r=Vi(n.trackedItems),o=r[e],i=o.filter(l=>l!==t);if(i.length===o.length)return;r[e]=i,ol({...n,trackedItems:r});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(a);}function N_(){const e=Oo();ol({...e,trackedItems:Vi(Rg)});}let ws=false;const Qc=[];function D_(e,t){const n=Og()[e];if(!n.length)return [];const r=new Set(n);return t.items.filter(o=>r.has(o.id)&&o.isAvailable).map(o=>({itemId:o.id,remaining:o.remaining}))}function La(e,t){const n=D_(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const r=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(r);}function $_(){if(ws)return;ws=true;const e=Mo();Qc.push(e.subscribeSeedRestock(t=>La("seed",t)),e.subscribeToolRestock(t=>La("tool",t)),e.subscribeEggRestock(t=>La("egg",t)),e.subscribeDecorRestock(t=>La("decor",t)));}function B_(){if(ws){ws=false;for(const e of Qc)e();Qc.length=0;}}const $g={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function z_(e,t,n){const r=n.find(i=>typeof i=="object"&&i!==null&&"toolId"in i&&i.toolId===e);return r?(r.quantity??0)>=t:false}function j_(e,t,n){const r=n.find(f=>typeof f=="object"&&f!==null&&"decorId"in f&&f.decorId===e),o=r?r.quantity??0:0,l=Ur().get().decors.all.filter(f=>typeof f=="object"&&f!==null&&"decorId"in f&&f.decorId===e).length;return o+l>=t}function Bg(e,t,n,r){return t==="tool"?z_(e,n,r):t==="decor"?j_(e,n,r):false}function xf(e,t){const n=$g[e];if(!n||n.shopType!==t)return  false;const o=Lo().get();return Bg(e,t,n.maxQuantity,o.items)}function wf(){const t=Lo().get(),n=Ng();for(const r of n){const o=$g[r.itemId];o&&o.shopType===r.shopType&&Bg(r.itemId,r.shopType,o.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${r.itemId} (max quantity reached)`),Dg(r.shopType,r.itemId));}}let Cs=false,Ja=null;function G_(){if(Cs)return;Cs=true,Ja=Lo().subscribeStable(()=>{wf();}),wf();}function U_(){Cs&&(Cs=false,Ja&&(Ja(),Ja=null));}let Ti=false;function zg(){if(Ti){console.log("[ShopNotifier] Already initialized");return}if(!pu()){console.log("[ShopNotifier] Disabled");return}Ti=true,$_(),G_(),console.log("[ShopNotifier] Initialized");}function jg(){Ti&&(B_(),U_(),Ti=false,console.log("[ShopNotifier] Destroyed"));}function W_(){return Ti}function H_(){return pu()}function V_(e){if(pu()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}F_(e),e?zg():jg(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const $r={init:zg,destroy:jg,isReady:W_,isEnabled:H_,setEnabled:V_,addTrackedItem:O_,removeTrackedItem:Dg,getTrackedItems:Ng,resetTrackedItems:N_},K_={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},ic={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},Y_={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},q_={seed:"seed",tool:null,egg:null,decor:null},Cf={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function fu(e,t,n){try{const r=Y_[t],o=Oe.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=q_[t],l=a?i[a]:i;return !l||typeof l!="object"?null:l[n]??null}catch(r){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,r),null}}function X_(e,t){return fu(e,t,"spriteId")}function Q_(e,t){const n=fu(e,t,"rarity");return n?String(n).toLowerCase():null}function J_(e,t){return fu(e,t,"name")??e}function Z_(){const e=$r.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function kf(e){const t=Z_(),n=[],r=["seed","tool","egg","decor"];for(const o of r){const i=e.byType[o];if(i)for(const a of i.items){const l=`${o}:${a.id}`;n.push({...a,shopType:o,rarity:Q_(a.id,o),spriteId:X_(a.id,o),itemName:J_(a.id,o),isTracked:t.has(l),hasCustomSound:Re.hasItemCustomSound("shop",a.id,o)});}}return n}const eI=`
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
`,tI={size:"md",closeOnBackdrop:true,closeOnEscape:true};function hu(e){const t={...tI,...e};let n=false,r=null,o=null,i=null,a=null,l=null;function u(){b(),t.onClose?.();}function f(O){t.closeOnBackdrop&&O.target===o&&u();}function p(O){t.closeOnEscape&&O.key==="Escape"&&u();}function m(){if(!i)return;const O=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),M=Array.from(i.querySelectorAll(O));if(M.length===0)return;const F=M[0],L=M[M.length-1];F.focus();const C=E=>{E.key==="Tab"&&(E.shiftKey?document.activeElement===F&&(E.preventDefault(),L.focus()):document.activeElement===L&&(E.preventDefault(),F.focus()));};i.addEventListener("keydown",C),a=()=>{i?.removeEventListener("keydown",C);};}function v(){r=w("div",{className:"modal-container"}),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-labelledby","modal-title");const O=w("style");O.textContent=eI,r.appendChild(O),o=w("div",{className:"modal-backdrop"}),o.addEventListener("click",f),r.appendChild(o),i=w("div",{className:`modal-dialog modal-dialog--${t.size}`});const M=w("div",{className:"modal-header"}),F=w("h2",{className:"modal-title",id:"modal-title"},t.title);if(t.subtitle){const E=w("div",{className:"modal-title-group"});E.appendChild(F),E.appendChild(w("p",{className:"modal-subtitle"},t.subtitle)),M.appendChild(E);}else M.appendChild(F);const L=w("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");L.addEventListener("click",u),M.appendChild(L),i.appendChild(M);const C=w("div",{className:"modal-body"});if(C.appendChild(t.content),i.appendChild(C),t.footer){const E=w("div",{className:"modal-footer"});E.appendChild(t.footer),i.appendChild(E);}return o.appendChild(i),r}function y(){if(!r)return;const O=r.getBoundingClientRect(),M=window.innerWidth,F=window.innerHeight;Math.abs(O.left)>1||Math.abs(O.top)>1||Math.abs(O.width-M)>1||Math.abs(O.height-F)>1?(r.style.left=`${-O.left}px`,r.style.top=`${-O.top}px`,r.style.width=`${M}px`,r.style.height=`${F}px`):(r.style.left="0px",r.style.top="0px",r.style.width="100%",r.style.height="100%");}function b(){!n||!r||(r.classList.remove("is-open"),n=false,a&&(a(),a=null),document.removeEventListener("keydown",p),l?.(),l=null,setTimeout(()=>{r?.remove();},200));}function A(){n&&b(),o?.removeEventListener("click",f),a&&(a(),a=null),document.removeEventListener("keydown",p),l?.(),l=null,r?.remove(),r=null,o=null,i=null;}const P=v();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(P),requestAnimationFrame(y);const z=()=>y();return window.addEventListener("resize",z),l=()=>{window.removeEventListener("resize",z);},requestAnimationFrame(()=>{r?.classList.add("is-open"),n=true,m(),document.addEventListener("keydown",p);}),{root:P,close:b,destroy:A}}function mu(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:i=n,label:a,showValue:l=true,disabled:u=false,onInput:f,onChange:p}=e,m=w("div",{className:"slider"}),v=w("div",{className:"slider-row"}),y=w("div",{className:"slider-track"}),b=w("div",{className:"slider-range"});y.appendChild(b);const A=w("input",{id:t,type:"range",min:String(n),max:String(r),step:String(o),value:String(i),disabled:u});A.addEventListener("input",F=>{I(),f?.(N(),F);}),A.addEventListener("change",F=>p?.(N(),F));function P(){const F=r-n;return F===0?0:(N()-n)/F}function I(){const F=Math.max(0,Math.min(1,P()));b.style.width=`${F*100}%`,M&&(M.textContent=String(N()));}function T(F){A.value=String(F),I();}function N(){return Number(A.value)}function z(F){A.disabled=!!F;}let O=null,M=null;return a&&(O=w("span",{className:"slider-label"},a),v.appendChild(O)),y.appendChild(A),v.appendChild(y),l&&(M=w("span",{className:"slider-value"},String(i)),v.appendChild(M)),m.append(v),I(),{root:m,input:A,setValue:T,getValue:N,setDisabled:z}}const Sf=`
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
`,nI={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},Af={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},rI=220;function oI(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function iI(e){const t=oI();if(t){un(t,Sf,"customSoundModal");return}const n=w("style");n.textContent=Sf,e.appendChild(n);}function Gg(e){const t={...nI,...e};let n=null,r=null,o=null,i=null,a=null,l=null,u=null,f=null,p=null,m=false,v=false,y=null;function b(){p?.(),p=null,f&&(f.pause(),f.currentTime=0),f=null,o?.setLabel("Play");}async function A(){if(f){b();return}if(!u)return;const j=Re.getById(u.soundId);if(!j){console.error(`[CustomSoundModal] Sound not found: ${u.soundId}`);return}const V=new Audio(j.source);V.volume=u.volume/100,f=V;const U=()=>{b();},ce=()=>{b(),console.error(`[CustomSoundModal] Failed to play sound: ${j.name}`);};V.addEventListener("ended",U),V.addEventListener("error",ce),p=()=>{V.removeEventListener("ended",U),V.removeEventListener("error",ce);};try{await V.play(),o?.setLabel("Stop");}catch(Y){b(),console.error("[CustomSoundModal] Failed to play sound:",Y);}}function P(){l&&u&&(l.textContent=Af[u.mode]);}function I(){m||y!==null||(y=window.setTimeout(()=>{z();},rI));}function T(){m||v||(v=true,b(),t.onClose?.(),I());}function N(){m||(n?.close(),T());}function z(){m||(m=true,v=true,y!==null&&(window.clearTimeout(y),y=null),b(),r&&(r.destroy(),r=null),a&&(a.destroy(),a=null),i=null,o=null,l=null,u=null,n&&(n.destroy(),n=null));}async function O(){const j=w("span",{className:"custom-sound-modal-title"});let V=false;if(e.spriteId)try{const ce=await Qe.toCanvas(e.spriteId);if(ce){const Y=w("span",{className:"custom-sound-modal-title-icon"});ce.className="custom-sound-modal-title-sprite",Y.appendChild(ce),j.appendChild(Y),V=!0;}}catch{}if(!V&&e.icon){const ce=w("span",{className:"custom-sound-modal-title-icon"},e.icon);j.appendChild(ce);}const U=w("span",{className:"custom-sound-modal-title-text"},e.entityName);return j.appendChild(U),j}function M(){const j=w("div",{className:"custom-sound-modal-body"}),V=Re.getItemCustomSound(e.entityType,e.entityId,e.shopType),U=Re.getNotificationConfig(e.entityType);u=V?{soundId:V.soundId,volume:V.volume,mode:V.mode}:{soundId:U.soundId,volume:U.volume,mode:U.mode};const ce=Re.getAll().map($=>({value:$.id,label:$.name})),Y=w("div",{className:"custom-sound-modal-row"}),ie=w("label",{className:"custom-sound-modal-label"},"Sound");Y.appendChild(ie);const se=w("div",{className:"custom-sound-modal-controls"});r=Fr({value:u.soundId,options:ce,size:"sm",onChange:$=>{u&&(u.soundId=$),b();}}),se.appendChild(r.root),o=kt({label:"Play",variant:"default",size:"sm",onClick:()=>A()}),se.appendChild(o),Y.appendChild(se),j.appendChild(Y);const ae=w("div",{className:"custom-sound-modal-row"}),ne=w("label",{className:"custom-sound-modal-label"},"Volume");ae.appendChild(ne),i=mu({min:0,max:100,step:1,value:u.volume,showValue:true,onChange:$=>{u&&(u.volume=$),f&&(f.volume=$/100);}}),ae.appendChild(i.root),j.appendChild(ae);const q=w("div",{className:"custom-sound-modal-row"}),Z=w("label",{className:"custom-sound-modal-label"},"Mode");q.appendChild(Z);const R=w("div",{className:"custom-sound-modal-mode-controls"});return a=Fr({value:u.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:$=>{u&&(u.mode=$),P();}}),R.appendChild(a.root),l=w("div",{className:"custom-sound-modal-mode-description"},Af[u.mode]),R.appendChild(l),q.appendChild(R),j.appendChild(q),j}function F(){const j=w("div",{className:"custom-sound-modal-footer"}),V=kt({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),N();}});j.appendChild(V);const U=w("div",{style:"flex: 1"});j.appendChild(U);const ce=kt({label:"Cancel",variant:"default",size:"sm",onClick:()=>N()});j.appendChild(ce);const Y=kt({label:"Save",variant:"primary",size:"sm",onClick:()=>{u&&e.onSave({...u}),N();}});return j.appendChild(Y),j}const L=M(),C=F(),E=w("div");iI(E),E.appendChild(L),n=hu({title:e.entityName||t.title,content:E,footer:C,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:T}),n.root.classList.add("custom-sound-modal");const B=n.root.querySelector(".modal-title");return B&&O().then(j=>B.replaceChildren(j)),{root:n.root,close:N,destroy:z}}const aI=["seed","tool","egg","decor"],sI=new Set(aI);function ac(e){const[t,...n]=e.split(":");return !t||n.length===0||!sI.has(t)?null:{shopType:t,itemId:n.join(":")}}const lI=500,Ef=10,cI=800;function dI(e){const{rows:t}=e,n=new Map;let r=null,o=false;const i=new Map;let a=null,l=null,u=null,f=null,p=null,m=false;function v(R,$){$?R.classList.add("has-custom-sound"):R.classList.remove("has-custom-sound");}function y(R){const $=ac(R);return $?Re.hasItemCustomSound("shop",$.itemId,$.shopType):false}function b(R){if(!r)return null;const $=r.root.querySelectorAll(".lg-tr-body");for(const Q of $)if(Q.dataset.id===R)return Q;return null}function A(R,$){const Q=b(R);if(!Q)return;const re=$??y(R);v(Q,re);}function P(){if(!r)return;r.root.querySelectorAll(".lg-tr-body").forEach($=>{const Q=$.dataset.id;Q&&v($,y(Q));});}function I(){o||(o=true,requestAnimationFrame(()=>{o=false,P();}));}function T(R){i.clear();for(const $ of R)i.set(`${$.shopType}:${$.id}`,$);}function N(R){const $=ac(R);return $?Re.hasItemCustomSound("shop",$.itemId,$.shopType):false}function z(R){const $=ac(R);if(!$||!Re.hasItemCustomSound("shop",$.itemId,$.shopType))return;Re.removeItemCustomSound("shop",$.itemId,$.shopType);const Q=i.get(R);Q&&(Q.hasCustomSound=false),A(R,false),I();}function O(){l!==null&&(window.clearTimeout(l),l=null),a=null;}function M(R){a=R,l!==null&&window.clearTimeout(l),l=window.setTimeout(()=>{l=null,a=null;},cI);}function F(){u!==null&&(window.clearTimeout(u),u=null),f=null,p=null,m=false;}if(r=vd({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(R,$)=>R.itemName.localeCompare($.itemName,void 0,{numeric:true,sensitivity:"base"}),render:R=>{const $=w("div",{className:"shop-item-cell"}),Q=w("div",{className:"shop-item-icon"});R.spriteId?Qe.toCanvas(R.spriteId).then(le=>{le?(le.className="shop-item-sprite",Q.appendChild(le)):Q.textContent=ic[R.shopType];}).catch(()=>{Q.textContent=ic[R.shopType];}):Q.textContent=ic[R.shopType];const re=w("div",{className:"shop-item-name"});return re.textContent=R.itemName,$.appendChild(Q),$.appendChild(re),$}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(R,$)=>{const Q=R.rarity?Cf[R.rarity.toLowerCase()]??999:999,re=$.rarity?Cf[$.rarity.toLowerCase()]??999:999;return Q-re},render:R=>{const $=w("div",{className:"shop-item-rarity"}),Q=ou({variant:"rarity",rarity:R.rarity});return $.appendChild(Q.root),$}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:R=>{const $=w("div",{className:"shop-item-notify"}),Q=xf(R.id,R.shopType),re=Or({checked:R.isTracked,disabled:Q,size:"sm",onChange:ve=>{R.isTracked=ve,ve?$r.addTrackedItem(R.shopType,R.id):$r.removeTrackedItem(R.shopType,R.id);}}),le=`${R.shopType}:${R.id}`;return n.set(le,re),$.appendChild(re.root),$}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:R=>`${R.shopType}:${R.id}`,onSortChange:()=>{I();},onRowClick:(R,$,Q)=>{const re=`${R.shopType}:${R.id}`;if(a){if(a===re){O();return}O();}Q.target.closest(".shop-item-notify")||Gg({entityType:"shop",entityId:R.id,entityName:R.itemName,spriteId:R.spriteId,shopType:R.shopType,onSave:ve=>{ve===null?(Re.removeItemCustomSound("shop",R.id,R.shopType),R.hasCustomSound=false,A(re,false)):(Re.setItemCustomSound("shop",R.id,ve,R.shopType),R.hasCustomSound=true,A(re,true));}});}}),!r)throw new Error("[ShopsCard] Failed to create items table");T(t);const C=r.root,E=R=>{const $=R.target;if($.closest(".shop-item-notify"))return;const re=$.closest(".lg-tr-body")?.dataset.id;!re||!N(re)||(R.preventDefault(),R.stopPropagation(),M(re),z(re));},B=R=>{if(R.pointerType==="mouse"||R.button!==0)return;const $=R.target;if($.closest(".shop-item-notify"))return;const re=$.closest(".lg-tr-body")?.dataset.id;!re||!N(re)||(F(),f=re,p={x:R.clientX,y:R.clientY},u=window.setTimeout(()=>{u=null,f&&(m=true,M(f),z(f));},lI));},j=R=>{if(!p||!f||m)return;const $=R.clientX-p.x,Q=R.clientY-p.y;$*$+Q*Q>Ef*Ef&&F();},V=()=>{F();},U=()=>{F();};C.addEventListener("contextmenu",E),C.addEventListener("pointerdown",B),C.addEventListener("pointermove",j),C.addEventListener("pointerup",V),C.addEventListener("pointercancel",U);const ce=r.setData.bind(r);r.setData=R=>{T(R),ce(R),I();},I();const Y=R=>{for(const[$,Q]of n.entries()){const[re,le]=$.split(":");if(R&&re!==R)continue;const ve=xf(le,re);Q.setDisabled(ve);}},se=Lo().subscribeStable(()=>{Y();}),ae=Ur(),ne=ae.subscribeDecorPlaced(()=>{Y("decor");}),q=ae.subscribeDecorRemoved(()=>{Y("decor");}),Z=r.destroy.bind(r);return r.destroy=()=>{se(),ne(),q(),C.removeEventListener("contextmenu",E),C.removeEventListener("pointerdown",B),C.removeEventListener("pointermove",j),C.removeEventListener("pointerup",V),C.removeEventListener("pointercancel",U),F(),O(),n.clear(),i.clear(),Z();},r}function uI(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function pI(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=w("div",{className:"select"});for(const p of Array.from(e.classList))p.startsWith("select--")&&o.classList.add(p);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=w("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",l=w("span",{className:"select-value"},t),u=w("span",{className:"select-caret"},a);i.append(l,u),o.appendChild(i),r.appendChild(o);const f=Math.ceil(i.getBoundingClientRect().width);return o.remove(),f}function fI(e,t){const n=uI(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=pI(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function hI(e){const t=Mo(),n=t.get();let r=null,o=[],i=[];const a={selectedShopType:"all",searchQuery:""},l={shopTypeSelect:null,searchInput:null,tableHandle:null};let u=0,f=new Set;function p(P,I){if(P.size!==I.size)return  false;for(const T of P)if(!I.has(T))return  false;return  true}function m(){if(!l.tableHandle)return;const P=o.filter(I=>!(a.selectedShopType!=="all"&&I.shopType!==a.selectedShopType||a.searchQuery&&!I.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));i=P,l.tableHandle.setData(P);}function v(){const P=w("div",{className:"shops-card-filters"}),T=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(z=>({value:z,label:K_[z]}))];l.shopTypeSelect=Fr({value:"all",options:T,size:"sm",onChange:z=>{a.selectedShopType=z,m();}});const N=l.shopTypeSelect.root;return N.style.minWidth="0",N.style.width="auto",fI(N,T.map(z=>z.label)),l.searchInput=js({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:z=>{a.searchQuery=z.trim(),m();}}),P.appendChild(l.shopTypeSelect.root),P.appendChild(l.searchInput.root),P}function y(){o=kf(n),i=[...o],u=o.length,f=new Set(o.map(O=>O.shopType));const P=w("div");l.tableHandle=dI({rows:i});const I=v();P.appendChild(I),P.appendChild(l.tableHandle.root);const T=w("div",{className:"shops-card-hint"}),N=w("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),z=w("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return T.append(N,z),P.appendChild(T),r=pt({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},P),r}function b(){const P=t.get(),I=kf(P),T=I.length,N=new Set(I.map(O=>O.shopType));(T!==u||!p(N,f))&&(u=T,f=N,o=I,m());}function A(){if(l.tableHandle&&(l.tableHandle.destroy(),l.tableHandle=null),l.shopTypeSelect&&(l.shopTypeSelect.destroy(),l.shopTypeSelect=null),l.searchInput){const P=l.searchInput.root.__cleanup;P&&P(),l.searchInput=null;}r=null;}return {root:y(),refresh:b,destroy:A}}const mI=".mp3,.wav,.ogg,audio/*",gI=250*1024,bI=3;function vI(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function yI(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function xI(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function Ug(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function wI(e,t){const n=Ug(t);if(!n.length)return  true;const r=e.name.toLowerCase(),o=e.type.toLowerCase();return n.some(i=>{const a=i.toLowerCase();if(a.startsWith("."))return r.endsWith(a);if(a.endsWith("/*")){const l=a.slice(0,-1);return o.startsWith(l)}return o===a})}function CI(e){const n=Ug(e).map(r=>r.startsWith(".")?r.slice(1).toUpperCase():r.endsWith("/*")?"Audio":r.includes("/")&&r.split("/")[1]?.toUpperCase()||r.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function kI(e={}){const{id:t,className:n,label:r="Add sounds",hint:o,accept:i=mI,multiple:a=true,disabled:l=false,maxSizeBytes:u=gI,maxItems:f,emptyLabel:p="No sounds added yet",onItemsChange:m,onFilesAdded:v,onError:y}=e;let b=[],A=0,P=null,I=false,T=!!l,N=null,z=null,O=null;const M=new Map,F=new Map,L=Number.isFinite(f)?Math.max(1,Number(f)):a?Number.POSITIVE_INFINITY:1,C=w("div",{className:"sound-picker",id:t});n&&C.classList.add(...n.split(" ").filter(Boolean)),T&&C.classList.add("is-disabled");const E=w("div",{className:"sound-picker__header"}),B=w("div",{className:"sound-picker__label"},r),j=o??`${CI(i)} - Max ${xI(u)}`,V=w("div",{className:"sound-picker__hint"},j);E.append(B,V);const U=w("div",{className:"sound-picker__zone",role:"button",tabIndex:T?-1:0,"aria-disabled":String(T)}),ce=w("div",{className:"sound-picker__zone-text"}),Y=w("div",{className:"sound-picker__zone-title"},"Drop audio files here"),ie=w("div",{className:"sound-picker__zone-subtitle"},"or click to browse");ce.append(Y,ie);const se=kt({label:a?"Choose files":"Choose file",size:"sm",onClick:h=>{h.preventDefault(),T||ae.click();},disabled:T});se.classList.add("sound-picker__pick");const ae=w("input",{className:"sound-picker__input",type:"file",accept:i,multiple:a?true:void 0,disabled:T,tabIndex:-1});U.append(ce,se,ae);const ne=w("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),q=w("div",{className:"sound-picker__list",role:"list"});C.append(E,U,ne,q);function Z(h,S="info"){const G=h??"";ne.textContent=G,ne.classList.toggle("is-error",S==="error");}function R(h){y?.(h),Z(h.message,"error");}function $(){for(const h of M.values())try{h.destroy();}catch{}M.clear();}function Q(h){const S=F.get(h.id);if(S)return S;const G=h.file.__sourceUrl;if(G)return F.set(h.id,G),G;const W=URL.createObjectURL(h.file);return F.set(h.id,W),W}function re(h){const S=F.get(h);S&&(S.startsWith("blob:")&&URL.revokeObjectURL(S),F.delete(h));}function le(){O?.(),O=null,N&&(N.pause(),N.currentTime=0),N=null,z=null;}function ve(){q.querySelectorAll(".sound-picker__item").forEach(S=>{const G=S.dataset.id,W=S.querySelector(".sound-picker__item-btn--play");if(!G||!W)return;const J=!!N&&z===G&&!N.paused;W.textContent=J?"Stop":"Play",S.classList.toggle("is-playing",J);});}function _e(h){if(T)return;if(z===h.id){le(),ve();return}le();const S=Q(h),G=new Audio(S);N=G,z=h.id;const W=()=>{z===h.id&&(le(),ve());},J=()=>{z===h.id&&(le(),ve(),R({code:"type",file:h.file,message:`Unable to play ${h.name}`}));};G.addEventListener("ended",W),G.addEventListener("error",J),O=()=>{G.removeEventListener("ended",W),G.removeEventListener("error",J);},G.play().then(()=>{ve();}).catch(()=>{le(),ve(),R({code:"type",file:h.file,message:`Unable to play ${h.name}`});});}function $e(){if($(),q.classList.toggle("is-scrollable",b.length>bI),!b.length){const S=w("div",{className:"sound-picker__empty"});S.append(typeof p=="string"?document.createTextNode(p):p),q.replaceChildren(S);return}const h=b.map(S=>bt(S));if(q.replaceChildren(...h),P){const S=M.get(P);S&&requestAnimationFrame(()=>S.focus());}ve();}function bt(h){const S=P===h.id,G=w("div",{className:"sound-picker__item",role:"listitem","data-id":h.id}),W=w("div",{className:"sound-picker__item-top"});w("div",{className:"sound-picker__item-bottom"});const J=w("div",{className:"sound-picker__item-name"});if(S&&!T){const ye=zs({value:h.name,blockGameKeys:true,onEnter:ge=>{Lt(h.id,ge);}});ye.root.classList.add("sound-picker__rename"),ye.input.classList.add("input--sm"),ye.input.setAttribute("aria-label","Rename sound"),ye.input.addEventListener("keydown",ge=>{ge.key==="Escape"&&(ge.preventDefault(),Ht());}),ye.input.addEventListener("blur",()=>{if(I){I=false;return}Lt(h.id,ye.getValue());}),M.set(h.id,ye),J.appendChild(ye.root);}else {const ye=w("div",{className:"sound-picker__item-label",title:h.name},h.name);J.appendChild(ye);}const de=w("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(S&&!T){const ye=w("button",{className:"sound-picker__item-btn",type:"button",disabled:T},"Save");ye.addEventListener("click",()=>{const we=M.get(h.id);Lt(h.id,we?.getValue()??h.name);});const ge=w("button",{className:"sound-picker__item-btn",type:"button",disabled:T},"Cancel");ge.addEventListener("pointerdown",()=>{I=true;}),ge.addEventListener("click",()=>Ht()),de.append(ye,ge);}else {const ye=w("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:T},z===h.id?"Stop":"Play");ye.addEventListener("click",()=>_e(h));const ge=w("button",{className:"sound-picker__item-btn",type:"button",disabled:T},"Rename");ge.addEventListener("click",()=>{T||(P=h.id,$e());});const we=w("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:T},"Remove");we.addEventListener("click",()=>tt(h.id)),de.append(ye,ge,we);}return W.append(J,de),G.append(W),G}function Bt(){return b.slice()}function ct(h){const S=h.slice(),G=new Set(S.map(W=>W.id));for(const W of Array.from(F.keys()))G.has(W)||re(W);z&&!G.has(z)&&le(),b=S,P=null,$e(),m?.(Bt());}function Et(h){if(T)return;const S=Array.from(h??[]);if(!S.length)return;const G=[],W=[];for(const we of S){if(i&&!wI(we,i)){W.push({code:"type",file:we,message:`Unsupported file type: ${we.name}`});continue}if(Number.isFinite(u)&&we.size>u){W.push({code:"size",file:we,maxSizeBytes:u,message:`File too large: ${we.name}`});continue}G.push({id:vI(),file:we,name:yI(we),size:we.size,type:we.type});}if(!G.length){W.length&&R(W[0]);return}const J=a?b.slice():[],de=Number.isFinite(L)?Math.max(0,L-J.length):G.length;if(de<=0){R({code:"limit",message:`Maximum of ${Math.max(1,L)} files reached`});return}const ye=G.slice(0,de),ge=a?J.concat(ye):ye.slice(0,1);ct(ge),Z(null),v?.(ye.slice()),W.length&&R(W[0]);}function Wt(h,S){const G=S.trim();if(!G){R({code:"name",message:"Name cannot be empty"});return}const W=b.map(J=>J.id===h?{...J,name:G}:J);ct(W),Z(null);}function Lt(h,S){const G=S.trim();if(!G){R({code:"name",message:"Name cannot be empty"});return}Wt(h,G);}function Ht(){P=null,Z(null),$e();}function tt(h){const S=b.filter(G=>G.id!==h);ct(S),Z(null);}function Ne(){le(),ct([]),Z(null);}function mn(h){T=!!h,C.classList.toggle("is-disabled",T),U.setAttribute("aria-disabled",String(T)),U.tabIndex=T?-1:0,ae.disabled=T,se.setDisabled(T),T&&le(),$e();}function gn(){T||ae.click();}const ut=h=>{if(T)return;const S=h.target;S&&S.closest(".sound-picker__pick")||ae.click();},wt=h=>{T||(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),ae.click());},Vt=h=>{T||!h.dataTransfer||!h.dataTransfer.types.includes("Files")||(h.preventDefault(),A+=1,U.classList.add("is-dragover"));},Sn=h=>{T||!h.dataTransfer||!h.dataTransfer.types.includes("Files")||(h.preventDefault(),h.dataTransfer.dropEffect="copy");},tn=h=>{T||U.classList.contains("is-dragover")&&(h.preventDefault(),A=Math.max(0,A-1),A<=0&&(A=0,U.classList.remove("is-dragover")));},k=h=>{T||!h.dataTransfer||!h.dataTransfer.files.length||(h.preventDefault(),A=0,U.classList.remove("is-dragover"),Et(h.dataTransfer.files));},d=()=>{if(T){ae.value="";return}ae.files&&Et(ae.files),ae.value="";};return U.addEventListener("click",ut),U.addEventListener("keydown",wt),U.addEventListener("dragenter",Vt),U.addEventListener("dragover",Sn),U.addEventListener("dragleave",tn),U.addEventListener("drop",k),ae.addEventListener("change",d),$e(),{root:C,getItems:Bt,setItems:ct,addFiles:Et,renameItem:Wt,removeItem:tt,clear:Ne,setDisabled:mn,openPicker:gn,setStatus:Z,destroy(){$(),le();for(const h of Array.from(F.keys()))re(h);U.removeEventListener("click",ut),U.removeEventListener("keydown",wt),U.removeEventListener("dragenter",Vt),U.removeEventListener("dragover",Sn),U.removeEventListener("dragleave",tn),U.removeEventListener("drop",k),ae.removeEventListener("change",d),C.remove();}}}const _f={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function SI(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function AI(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=w("div",{className:"select"});for(const p of Array.from(e.classList))p.startsWith("select--")&&o.classList.add(p);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=w("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",l=w("span",{className:"select-value"},t),u=w("span",{className:"select-caret"},a);i.append(l,u),o.appendChild(i),r.appendChild(o);const f=Math.ceil(i.getBoundingClientRect().width);return o.remove(),f}function EI(e,t){const n=SI(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=AI(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function _I(e){let t=null,n=null,r=null;const o=new Map,i=new Map,a=new Map;let l=null,u=null,f=null;function p(){f?.(),f=null,l&&(l.pause(),l.currentTime=0),l=null,u=null;}function m(){if(!r)return;r.querySelectorAll(".notification-item").forEach(M=>{const F=M.dataset.type,L=M.querySelector(".notification-item-play");if(!F||!L)return;const C=!!l&&u===F&&!l.paused;L.textContent=C?"Stop":"Play",M.classList.toggle("is-playing",C);});}async function v(O){if(u===O){p(),m();return}p();const M=Re.getNotificationConfig(O),F=Re.getById(M.soundId);if(!F){console.error(`[SettingCard] Sound not found: ${M.soundId}`);return}const L=new Audio(F.source);L.volume=M.volume/100,l=L,u=O;const C=()=>{u===O&&(p(),m());},E=()=>{u===O&&(p(),m(),console.error(`[SettingCard] Failed to play sound: ${F.name}`));};L.addEventListener("ended",C),L.addEventListener("error",E),f=()=>{L.removeEventListener("ended",C),L.removeEventListener("error",E);};try{await L.play(),m();}catch(B){p(),m(),console.error("[SettingCard] Failed to play sound:",B);}}function y(O,M){if(O.startsWith("data:"))try{const F=O.split(","),L=F[0].match(/:(.*?);/)?.[1]||"audio/mpeg",C=atob(F[1]),E=C.length,B=new Uint8Array(E);for(let j=0;j<E;j++)B[j]=C.charCodeAt(j);return new File([B],M,{type:L})}catch(F){return console.error("[SettingCard] Failed to convert data URL to File:",F),new File([],M,{type:"audio/mpeg"})}return new File([],M,{type:"audio/mpeg"})}function b(){const M=Re.getAll().map(F=>({value:F.id,label:F.name}));for(const[F,L]of o){const C=Re.getNotificationConfig(F);L.setOptions(M),L.setValue(C.soundId);}}function A(O,M,F){const L=w("div",{className:"notification-item","data-type":O}),C=w("div",{className:"notification-item-label"},M);L.appendChild(C);const E=w("div",{className:"notification-item-description"},F);L.appendChild(E);const B=w("div",{className:"notification-item-controls"}),j=Re.getNotificationConfig(O),U=Re.getAll().map(Z=>({value:Z.id,label:Z.name})),ce=Fr({value:j.soundId,options:U,size:"sm",onChange:Z=>{const R=Re.getNotificationConfig(O);Re.setNotificationConfig(O,{soundId:Z,volume:R.volume,mode:R.mode});}});o.set(O,ce);const Y=w("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");Y.addEventListener("click",()=>{v(O);}),B.appendChild(ce.root),B.appendChild(Y),L.appendChild(B);const ie=mu({min:0,max:100,step:1,value:j.volume,showValue:true,onChange:Z=>{const R=Re.getNotificationConfig(O);Re.setNotificationConfig(O,{soundId:R.soundId,volume:Z,mode:R.mode});}});a.set(O,ie),L.appendChild(ie.root);const se=w("div",{className:"notification-mode-row"}),ae=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],ne=Fr({value:j.mode,options:ae,size:"sm",onChange:Z=>{const R=Re.getNotificationConfig(O);Re.setNotificationConfig(O,{soundId:R.soundId,volume:R.volume,mode:Z}),P(O);}});i.set(O,ne),ne.root.classList.add("shrink"),EI(ne.root,ae.map(Z=>Z.label)),se.appendChild(ne.root);const q=w("div",{className:"notification-mode-description"},_f[O][j.mode]);return se.appendChild(q),L.appendChild(se),L}function P(O){if(!r)return;const M=r.querySelector(`[data-type="${O}"]`);if(!M)return;const F=Re.getNotificationConfig(O),L=M.querySelector(".notification-mode-description");L&&(L.textContent=_f[O][F.mode]);}function I(){const O=w("div",{className:"alerts-settings-body"});Re.init(),r=w("div",{className:"notification-settings"}),r.appendChild(A("shop","Shops restock","Default sound for shop restock alerts")),r.appendChild(A("pet","Pet events","Default sound for pet event alerts")),r.appendChild(A("weather","Weather events","Default sound for weather event alerts")),O.appendChild(r);const M=w("div",{className:"alerts-settings-divider"});O.appendChild(M);const F=Re.getAll().map(L=>{const C=y(L.source,L.name);return C.__sourceUrl=L.source,{id:L.id,file:C,name:L.name,size:0,type:L.type}});return n=kI({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:xo.MAX_SOUNDS,maxSizeBytes:xo.MAX_SIZE_BYTES,multiple:true,onItemsChange:L=>{T(L),b();},onFilesAdded:L=>{N(L),setTimeout(()=>{b();},100);}}),n.setItems(F),O.appendChild(n.root),t=pt({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},O),t}function T(O){const M=new Set(Re.getAll().map(C=>C.id)),F=new Set(O.map(C=>C.id)),L=[];for(const C of M)if(!F.has(C)){L.push(C);try{Re.remove(C);}catch(E){console.error(`[SettingCard] Failed to remove sound ${C}:`,E);}}if(L.length>0){const C=["shop","pet","weather"];for(const E of C){const B=Re.getNotificationConfig(E);if(L.includes(B.soundId)){Re.setNotificationConfig(E,{soundId:"default-notification",volume:B.volume,mode:B.mode});const j=a.get(E);j&&j.setValue(B.volume);}}}for(const C of O)if(M.has(C.id)){const E=Re.getById(C.id);if(E&&E.name!==C.name)try{Re.update(C.id,{name:C.name});}catch(B){console.error(`[SettingCard] Failed to rename sound ${C.id}:`,B);}}}function N(O){for(const M of O)if(!Re.getById(M.id)){const F=new FileReader;F.onload=L=>{const C=L.target?.result;try{const E=Re.add(M.name,C,"upload");if(n&&E.id!==M.id){const B=n.getItems().map(j=>j.id===M.id?{...j,id:E.id}:j);n.setItems(B);}}catch(E){console.error(`[SettingCard] Failed to add sound ${M.name}:`,E);}},F.onerror=()=>{console.error(`[SettingCard] Failed to read file ${M.name}`);},F.readAsDataURL(M.file);}}function z(){p(),n&&(n.destroy(),n=null);for(const O of o.values())O.destroy();o.clear();for(const O of i.values())O.destroy();i.clear(),a.clear(),t=null;}return {root:I(),destroy:z}}const Wg=At.WEATHER_NOTIFIER,II={enabled:false,trackedWeathers:[]};function Hg(e){return Array.isArray(e)?[...e]:[]}function il(e){return [...e]}function Ki(){const e=at(Wg,II);return {enabled:e?.enabled??false,trackedWeathers:Hg(e?.trackedWeathers)}}function gu(e){st(Wg,{enabled:e.enabled,trackedWeathers:il(e.trackedWeathers)});}function TI(e){const n={...Ki(),...e};return e.trackedWeathers&&(n.trackedWeathers=Hg(e.trackedWeathers)),gu(n),n}function Vg(){return Ki().enabled}function PI(e){TI({enabled:e});}function al(){return il(Ki().trackedWeathers)}function LI(e){return al().includes(e)}function MI(e){const t=Ki(),n=il(t.trackedWeathers);if(n.includes(e))return;n.push(e);const r=!t.enabled&&n.length>0,o={trackedWeathers:n,enabled:r?true:t.enabled};gu(o);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:r}});window.dispatchEvent(i);const a=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(a);}function RI(e){const t=Ki(),n=il(t.trackedWeathers),r=n.filter(l=>l!==e);if(r.length===n.length)return;const o=t.enabled&&r.length===0,i={trackedWeathers:r,enabled:o?false:t.enabled};gu(i);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:o}});window.dispatchEvent(a);}let gi=null,Za="Sunny",qn=false,bi=null,ks="";function Kg(e){return `${e.soundId}:${e.volume}:${e.mode}`}function Ss(e){const t=Re.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:yt.CustomSounds.getNotificationConfig("weather")}function FI(e){if(qn)return;const t=yt.CustomSounds.getById(e.soundId);if(t){bi=t.source,qn=true,ks=Kg(e);try{yt.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{qn=false,bi=null,ks="";}}}function es(){if(qn){try{const e=yt.getCustomHandle();(!bi||e&&e.url===bi)&&yt.CustomSounds.stop();}catch{}qn=false,bi=null,ks="";}}function Pi(e,t){const n=t??Ss(e);if(n.mode!=="loop"){qn&&es();return}if(!al().includes(e)){qn&&es();return}const i=Kg(n);qn&&i!==ks&&es(),qn||FI(n);}function Yg(e){const{weatherId:t}=e.detail||{};if(!t)return;const o=Hi().get().id,i=Ss(t);if(o===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),i.mode==="one-shot"&&Qg(i),Pi(o,i);const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function qg(){const t=Hi().get().id;Pi(t);}function Xg(e){if(e.detail?.entityType!=="weather")return;const r=Hi().get().id;Pi(r);}function OI(){if(gi){console.log("[WeatherNotifier] Already tracking");return}const e=Hi(),t=e.get();Za=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",Za),window.addEventListener("gemini:weather-tracked-check",Yg),window.addEventListener("gemini:tracked-weathers-changed",qg),window.addEventListener(ft.CUSTOM_SOUND_CHANGE,Xg);const n=Ss(t.id);Pi(t.id,n),gi=e.subscribeStable(r=>{const o=r.current.id,i=r.previous.id,a=Ss(o);if(console.log("[WeatherNotifier] Weather changed:",{previous:i,current:o}),Pi(o,a),o!==i&&al().includes(o)){console.log("[WeatherNotifier] Tracked weather detected:",o),a.mode==="one-shot"&&Qg(a);const u=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:o}});window.dispatchEvent(u);}Za=o;}),console.log("[WeatherNotifier] Tracking initialized");}function NI(){window.removeEventListener("gemini:weather-tracked-check",Yg),window.removeEventListener("gemini:tracked-weathers-changed",qg),window.removeEventListener(ft.CUSTOM_SOUND_CHANGE,Xg),gi&&(gi(),gi=null,Za="Sunny",es(),console.log("[WeatherNotifier] Tracking stopped"));}function Qg(e){try{yt.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let Li=false;function Jg(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),eb(),Zg());}function Zg(){if(Li){console.log("[WeatherNotifier] Already initialized");return}if(Li=true,window.addEventListener("gemini:tracked-weathers-changed",Jg),!Vg()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),OI(),console.log("[WeatherNotifier] Initialized");}function eb(){Li&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",Jg),NI(),Li=false,console.log("[WeatherNotifier] Destroyed"));}function DI(){return Li}const ko={init:Zg,destroy:eb,isReady:DI,isEnabled:Vg,setEnabled:PI,getTrackedWeathers:al,addTrackedWeather:MI,removeTrackedWeather:RI,isWeatherTracked:LI};function $I(e){try{const t=Oe.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function BI(e){try{const t=Oe.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function zI(e){try{const t=Oe.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const r=n.mutator;if(!r||typeof r!="object")return "No effects";const o=r.mutation;if(!o)return "No effects";const i=Oe.get("mutations");if(!i||typeof i!="object")return o;const a=i[o];return !a||typeof a!="object"?o:a.name||o}catch{return "No effects"}}function If(){const e=Oe.get("weather");if(!e||typeof e!="object")return [];const t=ko.getTrackedWeathers(),n=new Set(t),r=[];for(const o of Object.keys(e)){if(o==="Sunny")continue;const i={weatherId:o,weatherName:$I(o),spriteId:BI(o),effects:zI(o),isTracked:n.has(o),hasCustomSound:Re.hasItemCustomSound("weather",o)};r.push(i);}return r.sort((o,i)=>o.weatherName.localeCompare(i.weatherName)),r}const jI=500,Tf=10,GI=800;function UI(e){const{rows:t}=e;let n=null,r=false;const o=new Map;let i=null,a=null,l=null,u=null,f=null,p=false;function m(Y,ie){ie?Y.classList.add("has-custom-sound"):Y.classList.remove("has-custom-sound");}function v(Y){return Re.hasItemCustomSound("weather",Y)}function y(Y){if(!n)return null;const ie=n.root.querySelectorAll(".lg-tr-body");for(const se of ie)if(se.dataset.id===Y)return se;return null}function b(Y,ie){const se=y(Y);if(!se)return;const ae=ie??v(Y);m(se,ae);}function A(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(ie=>{const se=ie.dataset.id;se&&m(ie,v(se));});}function P(){r||(r=true,requestAnimationFrame(()=>{r=false,A();}));}function I(Y){o.clear();for(const ie of Y)o.set(ie.weatherId,ie);}function T(Y){return Re.hasItemCustomSound("weather",Y)}function N(Y){if(!Re.hasItemCustomSound("weather",Y))return;Re.removeItemCustomSound("weather",Y);const ie=o.get(Y);ie&&(ie.hasCustomSound=false),b(Y,false),P();}function z(){a!==null&&(window.clearTimeout(a),a=null),i=null;}function O(Y){i=Y,a!==null&&window.clearTimeout(a),a=window.setTimeout(()=>{a=null,i=null;},GI);}function M(){l!==null&&(window.clearTimeout(l),l=null),u=null,f=null,p=false;}if(n=vd({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(Y,ie)=>Y.weatherName.localeCompare(ie.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:Y=>{const ie=w("div",{className:"weather-item-cell"}),se=w("div",{className:"weather-item-icon"});Y.spriteId&&Qe.has(Y.spriteId)?Qe.toCanvas(Y.spriteId).then(ne=>{ne.className="weather-item-sprite",se.appendChild(ne);}).catch(()=>{se.textContent=Pf(Y.weatherId);}):se.textContent=Pf(Y.weatherId);const ae=w("div",{className:"weather-item-name"});return ae.textContent=Y.weatherName,ie.appendChild(se),ie.appendChild(ae),ie}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:Y=>{const ie=w("div",{className:"weather-item-effects"});return ie.textContent=Y.effects,ie}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:Y=>{const ie=w("div",{className:"weather-item-notify"}),se=Or({checked:Y.isTracked,disabled:false,size:"sm",onChange:ae=>{Y.isTracked=ae,ae?ko.addTrackedWeather(Y.weatherId):ko.removeTrackedWeather(Y.weatherId);}});return ie.appendChild(se.root),ie}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:Y=>Y.weatherId,onSortChange:()=>{P();},onRowClick:(Y,ie,se)=>{const ae=Y.weatherId;if(i){if(i===ae){z();return}z();}se.target.closest(".weather-item-notify")||Gg({entityType:"weather",entityId:Y.weatherId,entityName:Y.weatherName,spriteId:Y.spriteId,onSave:q=>{q===null?(Re.removeItemCustomSound("weather",Y.weatherId),Y.hasCustomSound=false,b(ae,false)):(Re.setItemCustomSound("weather",Y.weatherId,q),Y.hasCustomSound=true,b(ae,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");I(t);const L=n.root,C=Y=>{const ie=Y.target;if(ie.closest(".weather-item-notify"))return;const ae=ie.closest(".lg-tr-body")?.dataset.id;!ae||!T(ae)||(Y.preventDefault(),Y.stopPropagation(),O(ae),N(ae));},E=Y=>{if(Y.pointerType==="mouse"||Y.button!==0)return;const ie=Y.target;if(ie.closest(".weather-item-notify"))return;const ae=ie.closest(".lg-tr-body")?.dataset.id;!ae||!T(ae)||(M(),u=ae,f={x:Y.clientX,y:Y.clientY},l=window.setTimeout(()=>{l=null,u&&(p=true,O(u),N(u));},jI));},B=Y=>{if(!f||!u||p)return;const ie=Y.clientX-f.x,se=Y.clientY-f.y;ie*ie+se*se>Tf*Tf&&M();},j=()=>{M();},V=()=>{M();};L.addEventListener("contextmenu",C),L.addEventListener("pointerdown",E),L.addEventListener("pointermove",B),L.addEventListener("pointerup",j),L.addEventListener("pointercancel",V);const U=n.setData.bind(n);n.setData=Y=>{I(Y),U(Y),P();},P();const ce=n.destroy.bind(n);return n.destroy=()=>{L.removeEventListener("contextmenu",C),L.removeEventListener("pointerdown",E),L.removeEventListener("pointermove",B),L.removeEventListener("pointerup",j),L.removeEventListener("pointercancel",V),M(),z(),o.clear(),ce();},n}function Pf(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function WI(e){let t=null,n=[];const r={tableHandle:null};let o=0;function i(){n=If(),o=n.length;const u=w("div");r.tableHandle=UI({rows:n}),u.appendChild(r.tableHandle.root);const f=w("div",{className:"weather-card-hint"}),p=w("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),m=w("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return f.append(p,m),u.appendChild(f),t=pt({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},u),t}function a(){const u=If(),f=u.length;f!==o&&(o=f,n=u,r.tableHandle?.setData(u));}function l(){r.tableHandle&&(r.tableHandle.destroy(),r.tableHandle=null),t=null;}return {root:i(),refresh:a,destroy:l}}const HI={enabled:false,threshold:5};function sl(){return at(At.PET_HUNGER_NOTIFIER,HI)}function tb(e){st(At.PET_HUNGER_NOTIFIER,e);}function nb(){return sl().enabled}function VI(e){const t=sl();t.enabled=e,tb(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function rb(){return sl().threshold}function KI(e){const t=sl();t.threshold=e,tb(t);}let vi=null;const ts=new Set;let cr=false,yi=null;function YI(e){if(cr)return;const t=yt.CustomSounds.getById(e.soundId);if(t){yi=t.source,cr=true;try{yt.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{cr=false,yi=null;}}}function Jc(){if(cr){try{const e=yt.getCustomHandle();(!yi||e&&e.url===yi)&&yt.CustomSounds.stop();}catch{}cr=false,yi=null;}}function qI(e,t){if(t.mode!=="loop"){cr&&Jc();return}e?cr||YI(t):cr&&Jc();}function XI(){if(vi){console.log("[PetHungerNotifier] Already tracking");return}const e=Wr(),t=rb();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),vi=e.subscribe(n=>{const r=n.byLocation.active,o=yt.CustomSounds.getNotificationConfig("pet"),i=o.mode==="loop";let a=false;for(const l of r)if(l.hungerPercent<t){if(a=true,!ts.has(l.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:l.name||l.petSpecies,species:l.petSpecies,hungerPercent:l.hungerPercent.toFixed(2)+"%"}),i||JI(o);const u=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:l}});window.dispatchEvent(u),ts.add(l.id);}}else ts.delete(l.id);qI(a,o);}),console.log("[PetHungerNotifier] Tracking initialized");}function QI(){vi&&(vi(),vi=null,ts.clear(),Jc(),console.log("[PetHungerNotifier] Tracking stopped"));}function JI(e){try{yt.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let Mi=false;function ob(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),ab(),ib());}function ib(){if(Mi){console.log("[PetHungerNotifier] Already initialized");return}if(Mi=true,window.addEventListener("gemini:pet-hunger-config-changed",ob),!nb()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),XI(),console.log("[PetHungerNotifier] Initialized");}function ab(){Mi&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",ob),QI(),Mi=false,console.log("[PetHungerNotifier] Destroyed"));}function ZI(){return Mi}const Ri={init:ib,destroy:ab,isReady:ZI,isEnabled:nb,setEnabled:VI,getThreshold:rb,setThreshold:KI};function e2(e){let t=null,n=null;function r(){const i=w("div",{className:"pet-card-body"}),a=w("div",{className:"pet-card-row"}),l=eh({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=Or({checked:Ri.isEnabled(),onChange:u=>{Ri.setEnabled(u);}}),a.appendChild(l.root),a.appendChild(n.root),i.appendChild(a),t=pt({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},i),t}function o(){n&&(n.destroy(),n=null),t=null;}return {root:r(),destroy:o}}class t2 extends Br{constructor(){super({id:"tab-alerts",label:"Alerts"});xe(this,"sectionElement",null);xe(this,"state",null);xe(this,"settingCard",null);xe(this,"shopsCard",null);xe(this,"weatherCard",null);xe(this,"petCard",null);}async build(n){this.state=await P_();const r=n.getRootNode();un(r,T_,"alerts-styles");const o=this.createGrid("12px");o.id="alerts-section",this.sectionElement=o;const{MGData:i}=await xn(async()=>{const{MGData:f}=await Promise.resolve().then(()=>dg);return {MGData:f}},void 0),a=["plants","items","eggs","decor","weather","mutations"],l=await Promise.allSettled(a.map(f=>i.waitFor(f))),u=a.filter((f,p)=>l[p]?.status==="rejected");u.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",u.join(", ")),this.buildParts(),n.appendChild(o);}render(n){const r=this.shopsCard,o=this.weatherCard,i=this.petCard,a=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=r,this.weatherCard=o,this.petCard=i,this.settingCard=a;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=hI({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:r=>this.state.setCardExpanded("shops",r)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=e2({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:r=>this.state.setCardExpanded("pet",r)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=WI({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:r=>this.state.setCardExpanded("weather",r)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=_I({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:r=>this.state.setCardExpanded("settings",r)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const n2={enabled:true},sb=At.ANTI_AFK,r2=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],o2=25e3,i2=1,a2=1e-5,je={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function s2(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),je.listeners.push({type:n,handler:r,target:t});};for(const t of r2)e(document,t),e(window,t);}function l2(){for(const{type:e,handler:t,target:n}of je.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}je.listeners.length=0;}function c2(){const e=Object.getPrototypeOf(document);je.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),je.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),je.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function d2(){const e=Object.getPrototypeOf(document);try{je.savedProps.hidden&&Object.defineProperty(e,"hidden",je.savedProps.hidden);}catch{}try{je.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",je.savedProps.visibilityState);}catch{}try{je.savedProps.hasFocus&&(document.hasFocus=je.savedProps.hasFocus);}catch{}}function As(){je.audioCtx&&je.audioCtx.state!=="running"&&je.audioCtx.resume?.().catch(()=>{});}function u2(){try{const e=window.AudioContext||window.webkitAudioContext;je.audioCtx=new e({latencyHint:"interactive"}),je.gainNode=je.audioCtx.createGain(),je.gainNode.gain.value=a2,je.oscillator=je.audioCtx.createOscillator(),je.oscillator.frequency.value=i2,je.oscillator.connect(je.gainNode).connect(je.audioCtx.destination),je.oscillator.start(),document.addEventListener("visibilitychange",As,{capture:!0}),window.addEventListener("focus",As,{capture:!0});}catch{lb();}}function lb(){try{je.oscillator?.stop();}catch{}try{je.oscillator?.disconnect(),je.gainNode?.disconnect();}catch{}try{je.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",As,{capture:true}),window.removeEventListener("focus",As,{capture:true}),je.oscillator=null,je.gainNode=null,je.audioCtx=null;}function p2(){const e=document.querySelector("canvas")||document.body||document.documentElement;je.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},o2);}function f2(){je.heartbeatInterval!==null&&(clearInterval(je.heartbeatInterval),je.heartbeatInterval=null);}function sc(){c2(),s2(),u2(),p2();}function lc(){f2(),lb(),l2(),d2();}let Ma=false,an=false;function Xr(){return at(sb,n2)}function cc(e){st(sb,e);}const po={init(){if(Ma)return;const e=Xr();Ma=true,e.enabled?(sc(),an=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Ma},isRunning(){return an},isEnabled(){return Xr().enabled},enable(){const e=Xr();e.enabled=true,cc(e),an||(sc(),an=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=Xr();e.enabled=false,cc(e),an&&(lc(),an=false,console.log("[MGAntiAfk] Disabled"));},toggle(){po.isEnabled()?po.disable():po.enable();},getConfig(){return Xr()},updateConfig(e){const n={...Xr(),...e};cc(n),n.enabled&&!an?(sc(),an=true):!n.enabled&&an&&(lc(),an=false);},destroy(){an&&(lc(),an=false),Ma=false,console.log("[MGAntiAfk] Destroyed");}};class h2{constructor(){xe(this,"achievements",new Map);xe(this,"data");xe(this,"STORAGE_KEY",At.ACHIEVEMENTS);xe(this,"onUnlockCallbacks",[]);xe(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return at(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){st(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const l=o>=n.target;return !r&&l?this.unlock(t,i):l||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:l,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let xi=null;function vn(){return xi||(xi=new h2),xi}function m2(){xi&&(xi=null);}let Ra=false;const g2={init(){Ra||(vn(),Ra=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Ra},getManager(){return vn()},register:(...e)=>vn().register(...e),registerMany:(...e)=>vn().registerMany(...e),isUnlocked:(...e)=>vn().isUnlocked(...e),getAll:()=>vn().getAllAchievements(),getUnlocked:()=>vn().getUnlockedAchievements(),getStats:()=>vn().getCompletionStats(),checkAll:()=>vn().checkAllAchievements(),onUnlock:(...e)=>vn().onUnlock(...e),onProgress:(...e)=>vn().onProgress(...e),destroy(){m2(),Ra=false;}};let wi=null;function cb(){const t=xt().get().plant;if(!t)return;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n&&Ii(n.species,n.targetScale,n.mutations||[]);}function b2(e){cb();}function v2(){wi&&db(),cb(),wi=xt().subscribePlantInfo(b2,{immediate:true});}function db(){wi&&(wi(),wi=null);}function ll(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function ub(e,t){e.add(()=>t.disconnect());}const Es="css-1cdcuw7",Zc="css-v439q6";let fo=ll(),ed=false,Xo=false,ns=null,td=null,_r=null;const y2=`
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
`;function x2(){if(ed)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=y2,document.head.appendChild(e),fo.add(()=>e.remove()),ed=true;}async function w2(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const r=document.createElement("canvas");r.width=20,r.height=20,n.appendChild(r);const o=document.createElement("div");o.className="gemini-qol-cropPrice-text",o.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(o);try{const i=await Qe.toCanvas("ui","Coin");if(i&&r.parentElement){const a=r.getContext("2d");if(a){const l=Math.min(r.width/i.width,r.height/i.height),u=i.width*l,f=i.height*l,p=(r.width-u)/2,m=(r.height-f)/2;a.drawImage(i,p,m,u,f);}}}catch(i){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",i);}return t}function C2(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const r of n){const o=r.textContent?.trim();if(!o)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(o)&&t.push(o);}return t}function k2(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const r=n.textContent?.trim();if(!r)continue;const o=r.match(/^([\d.]+)\s*kg$/i);if(o)return parseFloat(o[1])}return 1}function S2(){const e=[],t=new Set,n=document.querySelectorAll(`p.${Es}`);for(const o of n){const i=o.getBoundingClientRect();if(i.width===0&&i.height===0||o.closest("button.chakra-button"))continue;const a=o.closest(".McFlex");!a||t.has(a)||(t.add(a),e.push({element:a}));}const r=document.querySelectorAll(`.${Zc}`);for(const o of r){const i=o.getBoundingClientRect();if(i.width===0&&i.height===0||o.closest("button.chakra-button"))continue;const a=o.querySelectorAll(":scope > .McFlex > .McFlex");if(a.length>0){const l=a[a.length-1];l.querySelector("p.chakra-text")&&!t.has(l)&&(t.add(l),e.push({element:l}));}}return e}function A2(e){const t=document.querySelectorAll(".gemini-qol-cropPrice");for(const n of t){const r=n.getBoundingClientRect();if(r.width===0&&r.height===0||n.closest("button.chakra-button"))continue;const o=n.querySelector(".gemini-qol-cropPrice-text");o&&(o.textContent=e>0?e.toLocaleString():"");}}function E2(){const t=xt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Ii(n.species,n.targetScale,n.mutations||[]):0}function _2(){_r!==null&&cancelAnimationFrame(_r),_r=requestAnimationFrame(()=>{_r=null;const e=E2();e!==td&&(td=e,A2(e));});}async function Qo(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const n=xt().get().plant;let r=0;if(n&&n.currentSlotIndex!==null){const i=n.slots[n.currentSlotIndex];i&&(r=Ii(i.species,i.targetScale,i.mutations||[]));}if(r===0){const l=[...(e.element.parentElement??e.element).querySelectorAll("p.chakra-text")].find(u=>!u.classList.contains(Es));if(l){const u=l.textContent?.trim();if(u){const f=k2(e.element),p=C2(e.element);r=Ii(u,f,p);}}}const o=await w2(r);e.element.appendChild(o),fo.add(()=>o.remove());}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function I2(){const e=S2();for(const n of e)Qo(n);ns=xt().subscribePlantInfo(()=>{_2();});const t=new MutationObserver(n=>{for(const r of n)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.tagName==="P"&&o.classList.contains(Es)&&!o.closest("button.chakra-button")){const l=o.closest(".McFlex");l&&Qo({element:l});}if(o.querySelectorAll(`p.${Es}`).forEach(l=>{if(!l.closest("button.chakra-button")){const u=l.closest(".McFlex");u&&Qo({element:u});}}),o.classList.contains(Zc)&&!o.closest("button.chakra-button")){const l=o.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const u=l[l.length-1];u.querySelector("p.chakra-text")&&!u.querySelector(".gemini-qol-cropPrice")&&Qo({element:u});}}o.querySelectorAll(`.${Zc}`).forEach(l=>{if(!l.closest("button.chakra-button")){const u=l.querySelectorAll(":scope > .McFlex > .McFlex");if(u.length>0){const f=u[u.length-1];f.querySelector("p.chakra-text")&&!f.querySelector(".gemini-qol-cropPrice")&&Qo({element:f});}}});}});});t.observe(document.body,{childList:true,subtree:true}),ub(fo,t);}const T2={init(){Xo||(Xo=true,x2(),I2());},destroy(){Xo&&(Xo=false,_r!==null&&(cancelAnimationFrame(_r),_r=null),ns&&(ns(),ns=null),fo.run(),fo.clear(),fo=ll(),ed=false,td=null);},isEnabled(){return Xo}},pb=At.CROP_VALUE_INDICATOR,P2={enabled:false};function bu(){return at(pb,P2)}function L2(e){st(pb,e);}let Fi=false;function fb(){Fi||!bu().enabled||(Fi=true,v2());}function hb(){Fi&&(db(),Fi=false);}function M2(){return Fi}function R2(){return bu().enabled}function F2(e){const t=bu();t.enabled!==e&&(t.enabled=e,L2(t),e?fb():hb());}const rs={init:fb,destroy:hb,isReady:M2,isEnabled:R2,setEnabled:F2,render:T2},Oi="css-1cdcuw7",vu='[role="tooltip"]';let os=ll(),Jo=false,is=null,nd=null,Ir=null;function O2(){const t=xt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Zd(n.species,n.targetScale):0}function mb(e,t){const n=Oe.get("plants");if(!n)return "";const r=n[e];return r?.crop?.baseWeight?`${(r.crop.baseWeight*t).toFixed(2)} kg`:""}function _s(){const e=document.querySelectorAll(vu),n=xt().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=mb(r.species,r.targetScale);for(const i of e){const a=i.getBoundingClientRect();if(a.width===0&&a.height===0)continue;const l=i.textContent?.trim();l&&l.startsWith("Size:")&&o&&(i.textContent=o);}}function N2(e,t){const n=document.querySelectorAll(`p.${Oi}`);for(const r of n){const o=r.getBoundingClientRect();if(o.width===0&&o.height===0||r.closest("button.chakra-button"))continue;const i=r.querySelector("svg");r.textContent=`${e}%`,i&&r.appendChild(i);}_s();}function D2(){Ir!==null&&cancelAnimationFrame(Ir),Ir=requestAnimationFrame(()=>{Ir=null;const e=O2();if(e===nd)return;nd=e;const n=xt().get().plant;!n||!(n.currentSlotIndex!==null&&n.slots[n.currentSlotIndex])||N2(e);});}function dc(){const t=xt().get().plant;if(!t||t.currentSlotIndex===null)return;const n=t.slots[t.currentSlotIndex];if(!n)return;const r=Zd(n.species,n.targetScale),o=document.querySelectorAll(`p.${Oi}`);for(const i of o){const a=i.getBoundingClientRect();if(!(a.width===0&&a.height===0)&&!i.closest("button.chakra-button"))try{const l=i.querySelector("svg");i.textContent=`${r}%`,l&&i.appendChild(l);}catch(l){console.warn("[CropSizeIndicator.render] Failed to update size:",l);}}_s();}function $2(){const t=xt().get().plant;if(!t||t.currentSlotIndex===null)return;const n=t.slots[t.currentSlotIndex];if(!n)return;const r=mb(n.species,n.targetScale),o=document.querySelectorAll(`p.${Oi}`);for(const a of o){const l=a.getBoundingClientRect();if(l.width===0&&l.height===0||a.closest("button.chakra-button"))continue;const u=a.querySelector("svg");a.textContent=r,u&&a.appendChild(u);}const i=document.querySelectorAll(vu);for(const a of i){const l=a.getBoundingClientRect();if(l.width===0&&l.height===0)continue;const u=a.textContent?.trim();u&&!u.includes("kg")&&(a.textContent=r);}}function B2(){dc(),is=xt().subscribePlantInfo(()=>{D2();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.tagName==="P"&&r.classList.contains(Oi)&&(r.closest("button.chakra-button")||dc()),r.querySelectorAll(`p.${Oi}`).length>0&&dc(),r.hasAttribute("role")&&r.getAttribute("role")==="tooltip"){const a=r.textContent?.trim();a&&a.startsWith("Size:")&&_s();}r.querySelectorAll(vu).forEach(a=>{const l=a.textContent?.trim();l&&l.startsWith("Size:")&&_s();});}});});e.observe(document.body,{childList:true,subtree:true}),ub(os,e);}const yu={init(){Jo||(Jo=true,B2());},destroy(){Jo&&(Jo=false,$2(),Ir!==null&&(cancelAnimationFrame(Ir),Ir=null),is&&(is(),is=null),os.run(),os.clear(),os=ll(),nd=null);},isEnabled(){return Jo}},gb=At.CROP_SIZE_INDICATOR,z2={enabled:false};function xu(){return at(gb,z2)}function j2(e){st(gb,e);}let Ni=false;function bb(){if(Ni){console.log("[CropSizeIndicator] Already initialized");return}if(!xu().enabled){console.log("[CropSizeIndicator] Disabled");return}Ni=true,console.log("[CropSizeIndicator] Initializing..."),yu.init(),console.log("[CropSizeIndicator] Initialized successfully");}function vb(){Ni&&(console.log("[CropSizeIndicator] Destroying..."),yu.destroy(),Ni=false,console.log("[CropSizeIndicator] Destroyed"));}function G2(){return Ni}function U2(){return xu().enabled}function W2(e){const t=xu();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,j2(t),e?bb():vb(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const as={init:bb,destroy:vb,isReady:G2,isEnabled:U2,setEnabled:W2,render:yu},H2={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},yb=At.ARIES_API;function wu(){return at(yb,H2)}function V2(e){st(yb,e);}function K2(e){const n={...wu(),...e};return V2(n),n}let Is=null,Ts=null;function Lf(e){Is=e;}function Mf(e){Ts=e;}function Y2(){return Is?[...Is]:[]}function q2(){return Ts?[...Ts]:[]}function Rf(){Is=null,Ts=null;}function xb(e,t){const n=wu(),r=new URL(e,n.apiBaseUrl);if(t)for(const[o,i]of Object.entries(t))i!==void 0&&r.searchParams.set(o,String(i));return r.toString()}function cl(e,t){return new Promise(n=>{const r=xb(e,t);GM_xmlhttpRequest({method:"GET",url:r,headers:{},onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] GET parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] GET error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] GET request failed:",o),n({status:0,data:null});}});})}function dl(e,t){return new Promise(n=>{const r=xb(e);GM_xmlhttpRequest({method:"POST",url:r,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] POST parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] POST error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] POST request failed:",o),n({status:0,data:null});}});})}async function Cu(e=50){const{data:t}=await cl("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(r=>({name:r.name,avatarUrl:r.avatar_url??null})):void 0}))}async function X2(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Cu(o),l=[];for(const u of a){if(!u.userSlots||u.userSlots.length===0)continue;const f=u.userSlots.filter(p=>p.name?p.name.toLowerCase().includes(i):false);f.length>0&&l.push({room:u,matchedSlots:f});}return l}async function Q2(e){if(!e)return null;const{status:t,data:n}=await cl("get-player-view",{playerId:e});return t===404?null:n}async function ul(e,t){const n=Array.from(new Set((e??[]).map(a=>String(a).trim()).filter(a=>a.length>=3)));if(n.length===0)return [];const r={playerIds:n};t?.sections&&(r.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:o,data:i}=await dl("get-players-view",r);return o!==200||!Array.isArray(i)?[]:i}async function J2(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Cu(o),l=new Map;for(const u of a)if(!(!u.userSlots||u.userSlots.length===0))for(const f of u.userSlots){if(!f.name||!f.name.toLowerCase().includes(i))continue;const m=`${u.id}::${f.name}`;l.has(m)||l.set(m,{playerName:f.name,avatarUrl:f.avatarUrl,roomId:u.id,roomPlayersCount:u.playersCount});}return Array.from(l.values())}async function wb(e){if(!e)return [];const{status:t,data:n}=await cl("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function Z2(e){const t=await wb(e);if(t.length===0)return Lf([]),[];const n=await ul(t,{sections:["profile","room"]});return Lf(n),[...n]}async function ku(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await cl("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function eT(e){const{incoming:t}=await ku(e),n=t.map(o=>o.fromPlayerId);if(n.length===0)return Mf([]),[];const r=await ul(n,{sections:["profile"]});return Mf(r),[...r]}async function tT(e){const{outgoing:t}=await ku(e),n=t.map(r=>r.toPlayerId);return n.length===0?[]:ul(n,{sections:["profile"]})}async function nT(e,t){if(!e||!t||e===t)return  false;const{status:n}=await dl("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function rT(e){const{playerId:t,otherPlayerId:n,action:r}=e;if(!t||!n||t===n)return  false;const{status:o}=await dl("friend-respond",{playerId:t,otherPlayerId:n,action:r});return o===204}async function oT(e,t){if(!e||!t||e===t)return  false;const{status:n}=await dl("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let Zo=false;const Ps={init(){Zo||(Zo=true,console.log("[AriesAPI] Initialized"));},destroy(){Zo&&(Zo=false,Rf(),console.log("[AriesAPI] Destroyed"));},isReady(){return Zo},getConfig(){return wu()},updateConfig(e){return K2(e)},fetchRooms:Cu,searchRoomsByPlayerName:X2,fetchPlayerView:Q2,fetchPlayersView:ul,searchPlayersByName:J2,fetchFriendsIds:wb,fetchFriendsWithViews:Z2,fetchFriendRequests:ku,fetchIncomingRequestsWithViews:eT,fetchOutgoingRequestsWithViews:tT,sendFriendRequest:nT,respondFriendRequest:rT,removeFriend:oT,getCachedFriends:Y2,getCachedIncomingRequests:q2,clearCache:Rf},Ff={enabled:true,manualLocks:[],overallRules:[],speciesRules:{}};function Ls(){return `rule-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function iT(e){const t={enabled:e.enabled,manualLocks:e.manualLocks||[],overallRules:[],speciesRules:{}},n=e.globalCriteria?.lockByScale?.enabled,r=(e.globalCriteria?.lockedMutations?.length??0)>0;if(n||r){const o={id:Ls(),name:"Migrated Global Rule",enabled:true,mode:"lock",sizeCondition:n?{enabled:true,minPercentage:e.globalCriteria.lockByScale.minPercentage}:void 0,mutationCondition:r?{enabled:true,mutations:e.globalCriteria.lockedMutations,matchMode:"any"}:void 0};t.overallRules.push(o);}if(e.speciesOverrides)for(const[o,i]of Object.entries(e.speciesOverrides)){const a=i.lockByScale?.enabled,l=(i.lockedMutations?.length??0)>0;if(a||l){const u={id:Ls(),name:`Migrated ${o} Rule`,enabled:true,mode:"lock",sizeCondition:a?{enabled:true,minPercentage:i.lockByScale.minPercentage}:void 0,mutationCondition:l?{enabled:true,mutations:i.lockedMutations,matchMode:"any"}:void 0};t.speciesRules[o]=[u];}}return console.log("[HarvestLocker] Migrated legacy config to new format"),t}function aT(e){const t=e;return t!==null&&typeof t=="object"&&"globalCriteria"in t&&!("overallRules"in t)}function ht(){const e=at($t.FEATURE.HARVEST_LOCKER,Ff);if(aT(e)){const t=iT(e);return hn(t),t}return {...Ff,...e,manualLocks:e.manualLocks||[],overallRules:e.overallRules||[],speciesRules:e.speciesRules||{}}}function hn(e){st($t.FEATURE.HARVEST_LOCKER,e);}function Cb(e,t,n,r){return {id:Ls(),name:e,enabled:true,mode:t,sizeCondition:n,mutationCondition:r}}function sT(e){const t=ht();t.overallRules.push(e),hn(t);}function lT(e,t){const n=ht();n.speciesRules[e]||(n.speciesRules[e]=[]),n.speciesRules[e].push(t),hn(n);}function kb(e,t){const n=ht(),r=n.overallRules.findIndex(o=>o.id===e);if(r!==-1){n.overallRules[r]={...n.overallRules[r],...t},hn(n);return}for(const o of Object.keys(n.speciesRules)){const i=n.speciesRules[o].findIndex(a=>a.id===e);if(i!==-1){n.speciesRules[o][i]={...n.speciesRules[o][i],...t},hn(n);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function cT(e){const t=ht(),n=t.overallRules.findIndex(r=>r.id===e);if(n!==-1){t.overallRules.splice(n,1),hn(t);return}for(const r of Object.keys(t.speciesRules)){const o=t.speciesRules[r].findIndex(i=>i.id===e);if(o!==-1){t.speciesRules[r].splice(o,1),t.speciesRules[r].length===0&&delete t.speciesRules[r],hn(t);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function dT(e,t){const n=ht(),r=n.overallRules.find(i=>i.id===e);if(!r){console.warn(`[HarvestLocker] Rule ${e} not found`);return}const o={...r,id:Ls(),name:`${r.name} (${t})`};n.speciesRules[t]||(n.speciesRules[t]=[]),n.speciesRules[t].push(o),hn(n);}const Rr=new Set;let Xn=null;const Ms=[];function uT(e){if(Ms.length>0){console.warn("[HarvestLocker] Already started");return}Xn=e;const t=Ur().subscribeStable(n=>{if(!n){Rr.clear();return}Sb(n);});Ms.push(t);}function pT(){Ms.forEach(e=>e()),Ms.length=0,Rr.clear(),Xn=null,console.log("[HarvestLocker] Stopped");}function pr(e){Xn=e;const t=Ur().get();t&&Sb(t);}function Su(e,t){const n=`${e}-${t}`;return Rr.has(n)}function fT(){return Array.from(Rr)}function Sb(e){if(Xn){if(Rr.clear(),Xn.manualLocks.forEach(t=>Rr.add(t)),!vT(e)){console.warn("[HarvestLocker] Invalid garden structure"),window.dispatchEvent(new CustomEvent(ft.HARVEST_LOCKER_LOCKS_UPDATED));return}e.plants.all.forEach(t=>{t.slots.forEach((n,r)=>{const o=`${t.tileIndex}-${r}`,i=hT(n.species);mT(n,i)&&Rr.add(o);});}),window.dispatchEvent(new CustomEvent(ft.HARVEST_LOCKER_LOCKS_UPDATED));}}function hT(e){return Xn?Xn.speciesRules[e]?Xn.speciesRules[e].filter(t=>t.enabled):Xn.overallRules.filter(t=>t.enabled):[]}function mT(e,t){const n=t.filter(o=>o.mode==="lock"),r=t.filter(o=>o.mode==="allow");for(const o of n)if(Of(e,o))return  true;return r.length>0&&!r.some(i=>Of(e,i))}function Of(e,t){const n=[];if(t.sizeCondition?.enabled){const r=bT(e),o=t.sizeCondition.sizeMode??"max";n.push(o==="max"?r>=t.sizeCondition.minPercentage:r<=t.sizeCondition.minPercentage);}if(t.mutationCondition?.enabled&&t.mutationCondition.mutations.length>0){const r=gT(e.mutations,t.mutationCondition.mutations,t.mutationCondition.matchMode);n.push(r);}return n.length>0&&n.every(r=>r)}function gT(e,t,n){const r=t.includes("none"),o=t.filter(a=>a!=="none"),i=r&&e.length===0;return n==="any"?i?true:o.some(a=>e.includes(a)):r&&e.length>0?false:o.length===0?i:o.every(a=>e.includes(a))}function bT(e){const n=Oe.get("plants")?.[e.species];if(!n||typeof n!="object"||!("crop"in n))return 0;const r=n.crop;if(typeof r!="object"||!r)return 0;const{baseTileScale:o,maxScale:i}=r,a=i-o;return a===0?100:(e.targetScale-o)/a*100}function vT(e){return typeof e=="object"&&e!==null&&"plants"in e&&typeof e.plants=="object"&&e.plants!==null&&"all"in e.plants&&Array.isArray(e.plants.all)}const Rs=new Set,Fs=new Set;let ho=null;function Ab(){ho||(ho=new MutationObserver(e=>{for(const t of e){for(const n of t.addedNodes)if(n instanceof Element)for(const r of Rs){n.matches(r.selector)&&r.callback(n);const o=n.querySelectorAll(r.selector);for(const i of o)r.callback(i);}for(const n of t.removedNodes)if(n instanceof Element)for(const r of Fs){n.matches(r.selector)&&r.callback(n);const o=n.querySelectorAll(r.selector);for(const i of o)r.callback(i);}}}),ho.observe(document.body,{childList:true,subtree:true}));}function Eb(){Rs.size===0&&Fs.size===0&&ho&&(ho.disconnect(),ho=null);}function Au(e,t){Ab();const n={selector:e,callback:t};Rs.add(n);const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>{Rs.delete(n),Eb();}}}function Eu(e,t){Ab();const n={selector:e,callback:t};return Fs.add(n),{disconnect:()=>{Fs.delete(n),Eb();}}}const yT=`
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
`,Nf="css-qnqsp4",_b="gemini-qol-harvestLocker-locked",rd="gemini-qol-harvestLocker-lock-icon",od="gemini-qol-harvestLocker-styles",xT='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let On=null,ss=false;const id=[];function Fa(e){id.push(e);}function wT(){for(const e of id)try{e();}catch(t){console.warn("[HarvestLocker Inject] Cleanup error:",t);}id.length=0;}function CT(){if(ss)return;if(document.getElementById(od)){ss=true;return}const e=document.createElement("style");e.id=od,e.textContent=yT,document.head.appendChild(e),ss=true;}function kT(){document.getElementById(od)?.remove(),ss=false;}function ST(e){if(e.classList.add(_b),!e.querySelector(`#${rd}`)){const t=document.createElement("div");t.id=rd,t.innerHTML=xT,e.appendChild(t);}}function Os(e){e.classList.remove(_b),e.querySelector(`#${rd}`)?.remove();}function uc(){if(!On)return;const e=xt().get();if(!e.plant||e.position.localIndex===null||e.plant.nextHarvestSlotIndex===null){Os(On);return}const t=String(e.position.localIndex),n=e.plant.nextHarvestSlotIndex;Su(t,n)?ST(On):Os(On);}function AT(){CT();const e=Au(`.${Nf}`,o=>{On=o,uc();});Fa(()=>e.disconnect());const t=Eu(`.${Nf}`,o=>{On===o&&(Os(o),On=null);});Fa(()=>t.disconnect());const n=xt().subscribePlantInfo(()=>{uc();});Fa(n);const r=()=>uc();window.addEventListener(ft.HARVEST_LOCKER_LOCKS_UPDATED,r),Fa(()=>window.removeEventListener(ft.HARVEST_LOCKER_LOCKS_UPDATED,r)),console.log("[HarvestLocker Inject] Started");}function ET(){On&&(Os(On),On=null),wT(),kT(),console.log("[HarvestLocker Inject] Stopped");}let Oa=false;const Ib={init(){Oa||(AT(),Oa=true);},destroy(){Oa&&(ET(),Oa=false);},isEnabled(){return ht().enabled}},Tb=[];function _T(){return Tb.slice()}function IT(e){Tb.push(e);}function Pb(e){try{return JSON.parse(e)}catch{return}}function Df(e){if(typeof e=="string"){const t=Pb(e);return t!==void 0?t:e}return e}function Lb(e){if(e!=null){if(typeof e=="string"){const t=Pb(e);return t!==void 0?Lb(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function TT(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Pe(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,l)=>{if(Lb(a)!==e)return;const f=o(a,l);return f&&typeof f=="object"&&"kind"in f?f:typeof f=="boolean"?f?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return IT(i),i}const ei=new WeakSet,$f=new WeakMap;function PT(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:_T();if(!r.length)return ()=>{};const o=v=>({ws:v,pageWindow:t,debug:n}),i=(v,y)=>{let b=v;for(const A of r){const P=A(b,o(y));if(P){if(P.kind==="drop")return {kind:"drop"};P.kind==="replace"&&(b=P.message);}}return b!==v?{kind:"replace",message:b}:void 0};let a=null,l=null,u=null;const f=()=>{const v=t?.MagicCircle_RoomConnection,y=v?.sendMessage;if(!v||typeof y!="function")return  false;if(ei.has(y))return  true;const b=y.bind(v);function A(...P){const I=P.length===1?P[0]:P,T=Df(I),N=i(T,TT(t));if(N?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",T);return}if(N?.kind==="replace"){const z=N.message;return P.length>1&&Array.isArray(z)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",T,"=>",z),b(...z)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",T,"=>",z),b(z))}return b(...P)}ei.add(A),$f.set(A,y);try{v.sendMessage=A,ei.add(v.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{v.sendMessage===A&&(v.sendMessage=y);}catch{}},true};(()=>{const v=t?.WebSocket?.prototype,y=v?.send;if(typeof y!="function"||ei.has(y))return;function b(A){const P=Df(A),I=i(P,this);if(I?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",P);return}if(I?.kind==="replace"){const T=I.message,N=typeof T=="string"||T instanceof ArrayBuffer||T instanceof Blob?T:JSON.stringify(T);return n&&console.log("[WS] replace outgoing (ws.send)",P,"=>",T),y.call(this,N)}return y.call(this,A)}ei.add(b),$f.set(b,y);try{v.send=b,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}l=()=>{try{v.send===b&&(v.send=y);}catch{}};})();const m=e.waitForRoomConnectionMs??4e3;if(!f()&&m>0){const v=Date.now();u=setInterval(()=>{if(f()){clearInterval(u),u=null;return}Date.now()-v>m&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(u){try{clearInterval(u);}catch{}u=null;}if(a){try{a();}catch{}a=null;}if(l){try{l();}catch{}l=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Pe(he.HarvestCrop,(e,t)=>{if(!ht().enabled)return  true;const r=e,o=r.slot!==void 0?String(r.slot):void 0,i=r.slotsIndex;return o!==void 0&&typeof i=="number"&&Su(o,i)?(console.log(`[HarvestLocker] Blocked harvest for slot ${o}-${i}`),false):true});let So=false;function Mb(){if(So){console.warn("[HarvestLocker] Already initialized");return}const e=ht();if(!e.enabled){console.log("[HarvestLocker] Disabled");return}So=true,uT(e),Ib.init(),console.log("[HarvestLocker] Initialized");}function Rb(){So&&(Ib.destroy(),pT(),So=false,console.log("[HarvestLocker] Destroyed"));}function LT(){return ht().enabled}function MT(e){const t=ht();t.enabled=e,hn(t),e&&!So?Mb():!e&&So&&Rb();}function RT(e,t){return Su(e,t)}function FT(){return fT()}function OT(e,t){const n=ht(),r=`${e}-${t}`;n.manualLocks.includes(r)||(n.manualLocks.push(r),hn(n),pr(n));}function NT(e,t){const n=ht(),r=`${e}-${t}`;n.manualLocks=n.manualLocks.filter(o=>o!==r),hn(n),pr(n);}function DT(){const e=ht();e.manualLocks=[],hn(e),pr(e);}function $T(){return ht()}function BT(){return ht().overallRules}function zT(e){return ht().speciesRules[e]||[]}function jT(){const e=ht();return Object.keys(e.speciesRules)}function GT(e,t,n,r){const o=Cb(e,t,n,r);return sT(o),pr(ht()),o}function UT(e,t,n,r,o){const i=Cb(t,n,r,o);return lT(e,i),pr(ht()),i}function WT(e,t){kb(e,t),pr(ht());}function HT(e){cT(e),pr(ht());}function VT(e,t){kb(e,{enabled:t}),pr(ht());}const zt={init:Mb,destroy:Rb,isEnabled:LT,setEnabled:MT,isLocked:RT,getAllLockedSlots:FT,lockSlot:OT,unlockSlot:NT,clearManualLocks:DT,getOverallRules:BT,getSpeciesRules:zT,getAllSpeciesWithRules:jT,addNewOverallRule:GT,addNewSpeciesRule:UT,modifyRule:WT,removeRule:HT,toggleRule:VT,cloneRuleToSpecies:dT,getConfig:$T},Bf={enabled:true,blockedEggs:[]};function tr(){const e=at($t.FEATURE.EGG_LOCKER,Bf);return {...Bf,...e,blockedEggs:e.blockedEggs||[]}}function pl(e){st($t.FEATURE.EGG_LOCKER,e);}function KT(e){const t=tr();t.blockedEggs.includes(e)||(t.blockedEggs.push(e),pl(t),window.dispatchEvent(new CustomEvent(ft.EGG_LOCKER_LOCKS_UPDATED)));}function YT(e){const t=tr();t.blockedEggs=t.blockedEggs.filter(n=>n!==e),pl(t),window.dispatchEvent(new CustomEvent(ft.EGG_LOCKER_LOCKS_UPDATED));}const qT=`
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
`,zf="css-qnqsp4",Fb="gemini-qol-eggLocker-locked",ad="gemini-qol-eggLocker-lock-icon",sd="gemini-qol-eggLocker-styles",XT='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Nn=null,ls=false;const ld=[];function Na(e){ld.push(e);}function QT(){for(const e of ld)try{e();}catch(t){console.warn("[EggLocker Inject] Cleanup error:",t);}ld.length=0;}function JT(){if(ls)return;if(document.getElementById(sd)){ls=true;return}const e=document.createElement("style");e.id=sd,e.textContent=qT,document.head.appendChild(e),ls=true;}function ZT(){document.getElementById(sd)?.remove(),ls=false;}function eP(e){if(e.classList.add(Fb),!e.querySelector(`#${ad}`)){const t=document.createElement("div");t.id=ad,t.innerHTML=XT,e.appendChild(t);}}function Ns(e){e.classList.remove(Fb),e.querySelector(`#${ad}`)?.remove();}function pc(){if(!Nn)return;const e=xt().get();if(e.object.type!=="egg"||!e.object.data){Ns(Nn);return}const t=e.object.data;ar.getBlockedEggs().includes(t.eggId)?eP(Nn):Ns(Nn);}function tP(){JT();const e=Au(`.${zf}`,o=>{Nn=o,pc();});Na(()=>e.disconnect());const t=Eu(`.${zf}`,o=>{Nn===o&&(Ns(o),Nn=null);});Na(()=>t.disconnect());const n=xt().subscribeObject(()=>{pc();});Na(n);const r=()=>pc();window.addEventListener(ft.EGG_LOCKER_LOCKS_UPDATED,r),Na(()=>window.removeEventListener(ft.EGG_LOCKER_LOCKS_UPDATED,r)),console.log("[EggLocker Inject] Started");}function nP(){Nn&&(Ns(Nn),Nn=null),QT(),ZT(),console.log("[EggLocker Inject] Stopped");}let Da=false;const Ob={init(){Da||(tP(),Da=true);},destroy(){Da&&(nP(),Da=false);},isEnabled(){return tr().enabled}};Pe(he.HatchEgg,()=>{const e=tr();if(!e.enabled)return  true;const t=xt().get();if(t.object.type!=="egg"||!t.object.data)return  true;const n=t.object.data.eggId;return e.blockedEggs.includes(n)?(console.log(`[EggLocker] Blocked hatch for ${n}`),false):(console.log(`[EggLocker] Allowed hatch for ${n}`),true)});let Ao=false;function Nb(){if(Ao)return;if(!tr().enabled){console.log("[EggLocker] Disabled");return}Ao=true,Ob.init(),console.log("[EggLocker] Initialized");}function Db(){Ao&&(Ob.destroy(),Ao=false,console.log("[EggLocker] Destroyed"));}function rP(){return tr().enabled}function oP(e){const t=tr();t.enabled=e,pl(t),e&&!Ao?Nb():!e&&Ao&&Db();}function iP(){const e=Oe.get("eggs");return e?Object.keys(e):[]}function aP(){return tr().blockedEggs}function sP(e){KT(e);}function lP(e){YT(e);}function cP(){const e=tr();e.blockedEggs=[],pl(e);}const ar={init:Nb,destroy:Db,isEnabled:rP,setEnabled:oP,getAvailableEggs:iP,getBlockedEggs:aP,blockEgg:sP,unblockEgg:lP,clearBlocks:cP},jf={enabled:true,blockedDecors:[]};function kn(){const e=at($t.FEATURE.DECOR_LOCKER,jf);return {...jf,...e,blockedDecors:e.blockedDecors||[]}}function Yi(e){st($t.FEATURE.DECOR_LOCKER,e);}function dP(e){const t=kn();t.blockedDecors.includes(e)||(t.blockedDecors.push(e),Yi(t),window.dispatchEvent(new CustomEvent(ft.DECOR_LOCKER_LOCKS_UPDATED)));}function uP(e){const t=kn();t.blockedDecors=t.blockedDecors.filter(n=>n!==e),Yi(t),window.dispatchEvent(new CustomEvent(ft.DECOR_LOCKER_LOCKS_UPDATED));}const pP=`
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
`,Gf="css-qnqsp4",$b="gemini-qol-decorLocker-locked",cd="gemini-qol-decorLocker-lock-icon",dd="gemini-qol-decorLocker-styles",fP='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Dn=null,cs=false;const ud=[];function $a(e){ud.push(e);}function hP(){for(const e of ud)try{e();}catch(t){console.warn("[DecorLocker Inject] Cleanup error:",t);}ud.length=0;}function mP(){if(cs)return;if(document.getElementById(dd)){cs=true;return}const e=document.createElement("style");e.id=dd,e.textContent=pP,document.head.appendChild(e),cs=true;}function gP(){document.getElementById(dd)?.remove(),cs=false;}function bP(e){if(e.classList.add($b),!e.querySelector(`#${cd}`)){const t=document.createElement("div");t.id=cd,t.innerHTML=fP,e.appendChild(t);}}function Ds(e){e.classList.remove($b),e.querySelector(`#${cd}`)?.remove();}function fc(){if(!Dn)return;const e=xt().get();if(e.object.type!=="decor"||!e.object.data){Ds(Dn);return}const t=e.object.data;sr.isDecorBlocked(t.decorId)?bP(Dn):Ds(Dn);}function vP(){mP();const e=Au(`.${Gf}`,o=>{Dn=o,fc();});$a(()=>e.disconnect());const t=Eu(`.${Gf}`,o=>{Dn===o&&(Ds(o),Dn=null);});$a(()=>t.disconnect());const n=xt().subscribeObject(()=>{fc();});$a(n);const r=()=>fc();window.addEventListener(ft.DECOR_LOCKER_LOCKS_UPDATED,r),$a(()=>window.removeEventListener(ft.DECOR_LOCKER_LOCKS_UPDATED,r)),console.log("[DecorLocker Inject] Started");}function yP(){Dn&&(Ds(Dn),Dn=null),hP(),gP(),console.log("[DecorLocker Inject] Stopped");}let Ba=false;const Bb={init(){Ba||(vP(),Ba=true);},destroy(){Ba&&(yP(),Ba=false);},isEnabled(){return kn().enabled}};Pe(he.PickupDecor,()=>{const e=kn();if(!e.enabled)return  true;const t=xt().get();if(!t.object||t.object.type!=="decor"||!t.object.data)return  true;const n=t.object.data.decorId;return e.blockedDecors.includes(n)?(console.log(`[DecorLocker] Blocked pickup for ${n}`),false):(console.log(`[DecorLocker] Allowed pickup for ${n}`),true)});let Eo=false;function zb(){if(Eo)return;if(!kn().enabled){console.log("[DecorLocker] Disabled");return}Eo=true,Bb.init(),console.log("[DecorLocker] Initialized");}function jb(){Eo&&(Bb.destroy(),Eo=false,console.log("[DecorLocker] Destroyed"));}function xP(){return kn().enabled}function wP(e){const t=kn();t.enabled=e,Yi(t),e&&!Eo?zb():!e&&Eo&&jb();}function Gb(){const e=Oe.get("decor");return e?Object.keys(e):[]}function CP(){return kn().blockedDecors}function kP(e){return kn().blockedDecors.includes(e)}function SP(e){dP(e);}function AP(e){uP(e);}function EP(){const e=Gb(),t=kn();t.blockedDecors=e,Yi(t),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function Ub(){const e=kn();e.blockedDecors=[],Yi(e),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function _P(){Ub();}const sr={init:zb,destroy:jb,isEnabled:xP,setEnabled:wP,getAvailableDecors:Gb,getBlockedDecors:CP,isDecorBlocked:kP,blockDecor:SP,unblockDecor:AP,blockAllDecors:EP,unblockAllDecors:Ub,clearBlocks:_P};class Wb{constructor(){xe(this,"stats");xe(this,"STORAGE_KEY",At.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return at(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){st(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let mo=null;function IP(){return mo||(mo=new Wb),mo}function TP(){mo&&(mo.endSession(),mo=null);}function Hb(e){const t=Js(e.xp),n=Zs(e.petSpecies,e.targetScale),r=el(e.petSpecies,e.xp,n),o=tl(e.petSpecies,t),i=qm(e.petSpecies),a=G1(r,n,i),l=U1(r,n);return {current:r,max:n,progress:l,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function Vb(e){return {...e,strength:Hb(e)}}function Kb(e){return e.map(Vb)}function PP(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Kb(e),n=t.reduce((u,f)=>u+f.strength.current,0),r=t.reduce((u,f)=>u+f.strength.max,0),o=t.filter(u=>u.strength.isMature).length,i=t.length-o,a=t.reduce((u,f)=>f.strength.max>(u?.strength.max||0)?f:u,t[0]),l=t.reduce((u,f)=>f.strength.max<(u?.strength.max||1/0)?f:u,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:l}}const LP=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Hb,enrichPetWithStrength:Vb,enrichPetsWithStrength:Kb,getPetStrengthStats:PP},Symbol.toStringTag,{value:"Module"}));class Yb{constructor(){xe(this,"logs",[]);xe(this,"maxLogs",1e3);xe(this,"unsubscribe",null);xe(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=Gt.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const l=i.get(a.abilityId);l.count++,(!l.lastProc||a.timestamp>l.lastProc)&&(l.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Tr=null;function MP(){return Tr||(Tr=new Yb,Tr.init()),Tr}function RP(){Tr&&(Tr.destroy(),Tr=null);}const FP={StatsTracker:Wb,getStatsTracker:IP,destroyStatsTracker:TP},OP={AbilityLogger:Yb,getAbilityLogger:MP,destroyAbilityLogger:RP,...LP},NP={Store:{select:Xe.select.bind(Xe),set:Xe.set.bind(Xe),subscribe:Xe.subscribe.bind(Xe),subscribeImmediate:Xe.subscribeImmediate.bind(Xe)},Globals:Gt,Modules:{Version:wd,Assets:Io,Manifest:bo,Data:Oe,Environment:Rt,CustomModal:io,Sprite:Qe,Tile:Zn,Pixi:Hs,RiveLoader:yo,Audio:yt,Cosmetic:Jd,Calculators:rg,ShopActions:Er},Features:{Achievements:g2,Tracker:FP,AntiAfk:po,Pets:OP,PetTeam:dt,XPTracker:Xc,CropValueIndicator:rs,CropSizeIndicator:as,ShopNotifier:$r,WeatherNotifier:ko,PetHungerNotifier:Ri,AriesAPI:Ps,HarvestLocker:zt,EggLocker:ar,DecorLocker:sr},WebSocket:{chat:MS,emote:RS,wish:FS,kickPlayer:OS,setPlayerData:Qs,usurpHost:NS,reportSpeakingStart:DS,setSelectedGame:$S,voteForGame:BS,restartGame:zS,ping:jS,checkWeatherStatus:WS,move:GS,playerPosition:Dm,teleport:US,moveInventoryItem:HS,dropObject:VS,pickupObject:KS,toggleLockItem:$m,toggleFavoriteItem:YS,setSelectedItem:qS,putItemInStorage:Hd,retrieveItemFromStorage:Vd,moveStorageItem:XS,logItems:QS,plantSeed:JS,waterPlant:ZS,harvestCrop:e1,sellAllCrops:t1,purchaseDecor:Kd,purchaseEgg:Yd,purchaseTool:qd,purchaseSeed:Xd,growEgg:Bm,plantEgg:n1,hatchEgg:r1,plantGardenPlant:o1,potPlant:i1,mutationPotion:a1,cropCleanser:s1,pickupDecor:l1,placeDecor:c1,removeGardenObject:d1,placePet:zm,feedPet:u1,petPositions:p1,swapPet:jm,swapPetFromStorage:f1,pickupPet:Gm,movePetSlot:h1,namePet:m1,sellPet:g1,throwSnowball:b1,checkFriendBonus:v1},_internal:{getGlobals:Yn,initGlobals:lg,destroyGlobals:ZA}};function DP(){const e=fe;e.Gemini=NP,e.MGSprite=Qe,e.MGData=Oe,e.MGPixi=Hs,e.MGRiveLoader=yo,e.MGAssets=Io,e.MGEnvironment=Rt;}const $P=`
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
`,BP="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA2CAYAAACY0PQ8AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKnSURBVHgB7ZuPddMwEMY/9zFAmAAxAWUCzASwAWGDbsDrBs0EJBMAE9SdAHeCqBOQDcQdkuu8Ngk6ubbPcn7v3VP0LCe5zyfJ+ldgBJxzC0oWh64VRWExMAVeiOCYIbsM6Rt4Rw1ahw1k7ILZkOf0IaRsNYm2Q0eSRSCn2dmS7ANax8eARajJ7sgqEqVC35DzhuzW6WVLZiQ+iSOBfwTjPfVYLEXE29jCFxBAApTQLwDD0XoZW1gkAnz9mwqL2IKi6uB8D/AH0+B1bM8hioTwpRb6sZKuU1odmDvo515SOEWEGvqpJIVTRLDQTyUpnPKeYCjZQjHUHoj8EkdCGOBo7iorCEmpDoxmEUSNIpMqgubGUfzfUkV4gF4shKSKYKGXwSLBQidJkyy5iZDUYOfWO4h7BiZJhDEmQyOxSCA1EpJ/sGcsEugigkYGbRMYC30MLoJGziKkNti5RUISZxGQmQhhNlxMbpEwuAgGmXCOBOLVfiasNZYha+GXuu2Rew30cVKEMElchiwPu+unBb4dWer+TbZ8UnbhdLI84HjpvG/bA+WvuEyxp9D/ptEt2ZpsE/Iap92/0tNdO99LLMk+oX3yx3jfiPA93BSDDVZCHxze/OpcCu5ZNSLwSnNSo5IBu8JNa7m9F7iLnGsEPMIiTGn3SS9chCnqKSy390XdvDH+wnzZNL0Dtwvc78+tfbBkH/9FQqgS15gf1zwseBxAUeaGkhXmw4rfLvnDsx0dVDX4whfkzYYEWDaZZ0PpcDHniFjtC3ASHmHx67TLB/blClKc39G+dtPnhxPufM9JjFvnJ4pOIt3bbCj5DN9wRu8iH5gKftftTeyGjS4nXwz8uJ0nLsY++VLBO/4zZRXqJc9AGbRnoN6Fz411Zf8sFNs92jNQFh35C3Y0hc/7VYYmAAAAAElFTkSuQmCC",zP="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA/CAYAAACxdtubAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKfSURBVHgB7ZuPdZswEMY//DqAuwGdwM4EJRPUG9TdoCM0G7QT1NkgmSB0gngDkwnKBvQ+W+LJBJCUxnnoyO89/hgL0McdJ50sZxigaZpcNgekRy3LpyzLavfgYuSEr0iTpSzb7sFsqLRYlNbMkSZ7seiVe6DXoiJyi3RFkrVoKNwDQ66bqtu6bNwPz1w34SDU5Swo9Vl0Cx0wKLVW7ROqwW0tn+3OmeuK265l8wg91OK6H7nTtWgBXSxt9O0K/QJ9HN/TVqgo58tbQB8rrlyLrqETdh6WrtANdEJPzV2hK+ilmIPrktVRqGk/l9DL2lpUs0jSBiPNbkvaYJRDOVao5oh7ZIGZMDvX1R51T/motKMNlDO7d1Q9sxNaQTnvFtWGFfoE5Vihe+hmPxehT3MRWh6Fml+cSuildJuXP9BJJYbcu0JL6KTkqhUqqkvoFHvP1aLvoCLotnfc6Qrd4fSTuBZKu3Mm1ETfX9DDjd3pm6zBYRVO1kh9eOVeDDc8h0GRVb+7H4bStJ9IO6PZicEq98DYFLlCNg9ID3rkVVfoYOJt2tUUXfimK5JkvrPEsrRqgTSgy37r+yJEKKMv5x7lmDYVTi7b2w/wjhmZE68x/eB0OySSBA2OGZ+fenYzmlPHjAJOPTmvxr70vqOWqc8TFK8b1RJsUSavmG6Hv/QViB3Anmoa561XrNAdpsmdr0CUUNNbqhBHFViuNmVjg17Z1xPq8gHxMMf7HVi2kuWaFTEdjxzP0z+WsU2YndP/iPA08RaXgt3CJowfeAE8L/D6l20F+NRl+eupxIv/aUHrU4Tn+rx/jksjN9k0w2IP/1sJ8zAPI0K3eCsGKvPwWk/aXH/XY8noucXBPSNPhdhrymFGxfHKmAfHpTb3iO64/AONOretDlUMVwAAAABJRU5ErkJggg==",jP="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA8CAYAAAA5S9daAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKgSURBVHgB7ZvvdYIwEMBPXr/XTtBs0I5gJ+kI7QbtCI7QTXSD4gTiBLJBmoMEA1wC+CSpF37vReEAIZfL/ckTAA9Syg/VzvL+Oar25ernyqMAob6OwIun1WpVdoWZ54I18ENQQp8SSuAH2adFCeDxCQh6FGCE8gdkf7OB6zhZg7MvixJgWAlJsPgE8FiC6v8rMEMngD1SS5bIgc2mXnDnCEqYTb3gzhGU0KeEZ+CHoISpWcILJUxNCaSzJ5WgQskaeEaHNRUmXZbAMTIYeoObjT2REb0BTtESRFfgUsIL8KUX+pfpAItjrOiVljo8noE3raV3yhIE8EfYO4sSYFFCRapKaKUA2dAJTHmydyglcM4RDK2BpkIkqxVmF/bKc8sSOK4wu7BL6u50SGEqGJoBz1wHEqAZ8K4SBKSD0xI4rjC7eDQb/8ES3nQLTWMJrRCpPCZWj6Gdo0lcQleupYqS1b0bS4i0wpxjSavL2gLC0qw829MhRmQ4Wds5hKca9KwrCIzd8QOEpxr42JaQO7ZDIfDDVkKM6rGwtmMooUoJYk4HdIhNx9V2AeH/KBZ9OlAjX0BYojvGw0jZnAj8qJQQqYQuCFlwv4C5grGE2OHRJ5ubV6OE2OHRJ5ubdSxLyKmXLyKlz40lhM4RTp5joa3hMZoleI75FDQH0XxCfuWxOWiiwx7CUniO7SEsF6WreLlRbSfnZ3DxRIZ5DXGn2sb1AEK1b1m/SzjLzUco4VfOw1HWfRvvA2WtkE9Za+1Wo7Mdcd8feRvwmXey7oNw3e/B9zC6stvqZtLrDdQ5N4ZV3J8aWYoR5+A8fYdpmBwDr8UaZG9XqT4eYAL6R1s/LGvTQmUI3XD/WX93Gz7ofvhOrXuUcCmxC2v/BJdOl3rAruIPOjGfbeyq8HcAAAAASUVORK5CYII=",GP="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABACAYAAACNx/A2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEh0lEQVR42u3cX2iVdRzH8bPV2tIJGhYzU4iCpJssUsLQpASVyqALLS0M0lC7qFTIBL0ISugmmERFKlZKClLeLIqlTU2kWOKfUmeaEzd109zcdua2s3NeQZybDu6fZ+fsOTvPG763Pz7PGx5+z++c7+8bmf32c5FsFgowGjOwAhuwDVWowWW0Ig7oRgsu4k9UYhPW4zU8ijuT62e9siVtBKZhNb5CFY7gLC7iGqKI651utOEKLuA0fkclPsEyPIjCnBeIIkzFamzBPlxADPFkJUjWwEggWeLJiuIvfI+P8ToeyDmBGIvpWIVKNCOWrITMkkAM3ajDDryBx1AaaIEoxSNYh1PoQMzQkUAnojiE5OutJHACcRfW4BSiiAsWMbSiGotREgiBKMQi7EUj4oJNN+qxG7OGTCAKcT8+wh/ollt04RDexZisCkQxZuEbROUucTTiU0xHUcYFohjP4iC6DA/asRdzUZwxgSjGfJw0/IjjBF7CiEEXiBIsxt+GN7VYhlGDJhC3YQFq5AdnsAQjB0vgbFTLL05gIe5ISyAex0/yk2rMvWWBGI8v5TcVmHyrAtehTX4Tx+coG5BAzMNpIdCElf0WiLHYLQQAjmBGfwWuQqOQVLaiqFeBuBf7hdyM81jSl8D30SykJypQfFOBGIvfhPRGA1b0JPBNXBHSF1UouZnAPcH/RVkQqMOL/xOIh1ArpD+0Y3uqwHdwVRr0eKJJgwDnOYl7/hOIAnyHG+kGzUTogGZqxKtJgcbgbLpBgyIyS3mi2J4U6ClcHw4Cs5znJEojWInraYTNSOjg59GEKRFsRHSgYUOBmrA0ggp05KvANDK1YUMER9Ad8LB95hmCTB34NoLzSIQCB0wMhyO4FvzXRRAzJVAXQWfwwwrqV0FbBLEcChy0PIkIrufIh2sQ88QjOId4pgOnc9hPY91MC4xGUIVOSEdiph4yE+sbHBI438tJJH2RAJkWmEamdOjCvggWoEUGyJrAoaEd5RGMQx0gFNh/mjE/GcB2tAFySqKhow5lyRCeQQNSCaxMQ0sHdqX+K1clIKTKEjwa8HSqwPm4JKQvurCrp9aOLegQ0hvH8URPAifhgJCeuIzVfbW3zcujjvyB0IqNGN2fDtWlqBcC0IkdmDSQHum3wk0FdGI3pgy0yfx2LMcZJOQnHdiKSbd6T2QkFuBAnnVuJXAJH+K+dG8qFWMGtuRJ73QC+7EMZYN5W3Mc1uJgjt8T7o0abMY0FGbivnABJmMbatEu94nhIvbgZZRm48p/EWZiJ+rRkmMbTQJRNOBnvIJRWR06gUKU4UmsxzE040ZAN5w4bqAV51COOZiI4qEee3I3pmEpPsNRtKILsSESGkcMXWjFcWzCcszEhKBOLhqP57EWm1GJGrQgnubYp1RSxz91I45/cBw/4Au8hxcwMbCTi3oZFTAZS1COCvyKYziLelxDG7oQ7+dop3Y04TJqcQqH8Qt24QMsxMO4I6dmZ/U9PsAEzMEKbMDX+BHVOIeraEUsZWLbVdTiKPZhJ8qxBoswFaNRkM1n+he4a3+KgaBGGQAAAABJRU5ErkJggg==",Uf={expression:{label:"Expression",type:"Expression",icon:GP},top:{label:"Top",type:"Top",icon:BP},mid:{label:"Mid",type:"Mid",icon:zP},bottom:{label:"Bottom",type:"Bottom",icon:jP}},UP={expression:"Expression_Default.png",top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png"};function WP(e={}){const{initialOutfit:t={},onChange:n,width:r="100%",useRiveAnimation:o=false}=e;let i={...UP,...t},a="bottom",l={expression:[],top:[],mid:[],bottom:[]},u={expression:0,top:0,mid:0,bottom:0},f,p,m,v={},y=false,b=0,A=0,P=null,I=null;const T=[],N=w("div",{className:"avatar-builder"});N.style.width=r;const z=w("style");z.textContent=$P,N.appendChild(z);const O=w("div",{className:"avatar-builder-preview-area"});N.appendChild(O);const M=w("div",{className:"avatar-builder-avatar-wrapper"});O.appendChild(M),f=w("div",{className:"avatar-builder-preview-container"}),M.appendChild(f);const F=w("button",{className:"avatar-builder-arrow avatar-builder-arrow-left",onclick:()=>Y(-1)});F.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',M.appendChild(F);const L=w("button",{className:"avatar-builder-arrow avatar-builder-arrow-right",onclick:()=>Y(1)});L.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',M.appendChild(L),f.addEventListener("mousedown",se),f.addEventListener("touchstart",se,{passive:true}),T.push(()=>{f.removeEventListener("mousedown",se),f.removeEventListener("touchstart",se);}),p=w("div",{className:"avatar-builder-item-name"},"Loading..."),O.appendChild(p),m=w("div",{className:"avatar-builder-dots-indicator"}),O.appendChild(m);const C=w("div",{className:"avatar-builder-category-row"});N.appendChild(C),Object.entries(Uf).forEach(([R,$])=>{const Q=R,re=w("button",{className:`avatar-builder-category-btn ${Q===a?"active":""}`,onclick:()=>ce(Q),title:$.label}),le=w("img",{src:$.icon,alt:$.label,className:"category-icon"});re.appendChild(le),v[Q]=re,C.appendChild(re);}),E().then(()=>{B(),V(),U();});async function E(){const R=["expression","top","mid","bottom"];await Promise.all(R.map(async $=>{const Q=await bm({type:Uf[$].type});l[$]=Q;const re=i[$],le=Q.findIndex(ve=>ve.filename===re);u[$]=le>=0?le:0;}));}function B(){if(o)P?yo.updateOutfit(P,i).catch(R=>{console.error("[AvatarBuilder] Failed to update Rive outfit:",R);}):j();else {f.innerHTML="";const R=Gr();[{slot:"bottom",zIndex:1},{slot:"mid",zIndex:2},{slot:"top",zIndex:3},{slot:"expression",zIndex:4}].forEach(({slot:Q,zIndex:re})=>{const le=i[Q];if(!le)return;const ve=le===mm;if(le.includes("_Blank.png")||ve)return;const $e=w("img",{src:`${R}${le}`,className:`avatar-builder-layer ${Q===a?"active":""}`,style:{zIndex:String(re)},onerror:()=>$e.style.display="none"});f.appendChild($e);});}}async function j(){if(!(!o||P))try{f.innerHTML="",I=w("canvas",{className:"avatar-builder-rive-canvas",width:260,height:260}),f.appendChild(I),P=await yo.createInstance({canvas:I,outfit:i,autoplay:!0}),console.log("[AvatarBuilder] Rive animation initialized");}catch(R){console.error("[AvatarBuilder] Failed to initialize Rive:",R),console.warn("[AvatarBuilder] Falling back to static images"),I&&(I.remove(),I=null),P=null,B();}}function V(){const R=l[a],$=u[a];if(!R||R.length===0){p.textContent="Loading...";return}const Q=R[$];p.textContent=Q?.displayName||"Unknown";}function U(){const R=l[a],$=u[a],Q=R.length;if(Q===0){m.innerHTML="";return}m.innerHTML=`<span class="dots-text">${$+1} / ${Q}</span>`;const re=Math.min(Q,10),le=w("div",{className:"dots-container"}),ve=Q>1?Math.round($/(Q-1)*(re-1)):0;for(let _e=0;_e<re;_e++){const $e=w("span",{className:`dot ${_e===ve?"active":""}`});le.appendChild($e);}m.appendChild(le);}function ce(R){a=R,Object.entries(v).forEach(([$,Q])=>{Q.classList.toggle("active",$===R);}),B(),V(),U();}function Y(R){const $=l[a];if(!$||$.length===0)return;let Q=u[a]+R;Q<0&&(Q=$.length-1),Q>=$.length&&(Q=0),u[a]=Q;const re=$[Q];i[a]=re.filename,n&&n({slot:a,item:re}),ie(R>0?"left":"right"),B(),V(),U();}function ie(R){const $=R==="left"?-20:20;f.style.transform=`translateX(${$}px)`,f.style.opacity="0.5",setTimeout(()=>{f.style.transform="translateX(0)",f.style.opacity="1";},150);}function se(R){y=true,b="touches"in R?R.touches[0].clientX:R.clientX,A=0;const $=re=>{if(!y)return;A=("touches"in re?re.touches[0].clientX:re.clientX)-b,f.style.transform=`translateX(${A*.3}px)`;},Q=()=>{if(y){if(y=false,f.style.transform="translateX(0)",Math.abs(A)>50){const re=A>0?-1:1;Y(re);}document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",Q),document.removeEventListener("touchmove",$),document.removeEventListener("touchend",Q);}};document.addEventListener("mousemove",$),document.addEventListener("mouseup",Q),document.addEventListener("touchmove",$),document.addEventListener("touchend",Q);}function ae(){return {...i}}function ne(R){i={...i,...R},Object.entries(R).forEach(([$,Q])=>{const re=$;if(!Q||!l[re])return;const le=l[re].findIndex(ve=>ve.filename===Q);le>=0&&(u[re]=le);}),B(),V(),U();}function q(R){ce(R);}function Z(){P&&(P.destroy(),P=null),I&&(I.remove(),I=null),T.forEach(R=>R()),T.length=0,N.remove();}return {root:N,getOutfit:ae,setOutfit:ne,setCategory:q,destroy:Z}}const HP={lastSelectedSlot:"bottom",builderExpanded:true,outfitsExpanded:true,loadoutsExpanded:true};async function VP(){const e=await _o("tab-avatar-ui",{version:1,defaults:HP}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const r=e.get();t.forEach(o=>o(r));},subscribe:n=>(t.push(n),()=>{const r=t.indexOf(n);r!==-1&&t.splice(r,1);})}}const KP=`
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
`,YP=500,Wf=10,qP=800;function qb(e={}){const{onApply:t,layout:n="carousel"}=e;let r=null;function o(){if(!r)return;r.innerHTML="";const p=Mr.get();if(p.length===0){r.appendChild(w("div",{className:"outfits-loadout-empty"},"No saved outfits yet."));return}const m=Gr();if(n==="grid"){const v=w("div",{className:"outfits-loadout-grid"});p.forEach(y=>{v.appendChild(i(y,m));}),r.appendChild(v);}else {const v=w("div",{className:"outfits-loadout-carousel"});p.forEach(y=>{v.appendChild(i(y,m));}),a(v),r.appendChild(v);}}function i(p,m){const v=w("div",{className:"outfits-loadout-card"});let y=false,b=null;const A=()=>{y=true,b&&clearTimeout(b),b=setTimeout(()=>{y=false;},qP),Mr.delete(p.id);};v.addEventListener("click",()=>{y||(t?t(p):Hm.set({top:p.top,mid:p.mid,bottom:p.bottom,expression:p.expression}));}),v.addEventListener("contextmenu",M=>{M.preventDefault(),M.stopPropagation(),A();});let P=null,I=null,T=false;const N=()=>{P&&(clearTimeout(P),P=null),I=null,T=false;};v.addEventListener("pointerdown",M=>{M.pointerType!=="mouse"&&M.button===0&&(N(),I={x:M.clientX,y:M.clientY},P=setTimeout(()=>{P=null,I&&(T=true,A());},YP));}),v.addEventListener("pointermove",M=>{if(!I||T)return;const F=M.clientX-I.x,L=M.clientY-I.y;F*F+L*L>Wf*Wf&&N();}),v.addEventListener("pointerup",N),v.addEventListener("pointercancel",N);const z=w("div",{className:"outfits-loadout-preview"});return [p.bottom,p.mid,p.top,p.expression].forEach((M,F)=>{if(!M||M.includes("_Blank"))return;const L=w("img",{className:"outfits-loadout-layer",style:{zIndex:String(F+1)}});L.src=`${m}${M}`,L.onerror=()=>L.remove(),z.appendChild(L);}),v.appendChild(z),v}function a(p){let m=false,v=0,y=0;const b=I=>{m=true,v=("touches"in I?I.touches[0].clientX:I.clientX)-p.offsetLeft,y=p.scrollLeft;},A=I=>{if(!m)return;I.preventDefault();const T=("touches"in I?I.touches[0].clientX:I.clientX)-p.offsetLeft;p.scrollLeft=y-(T-v);},P=()=>{m=false;};p.addEventListener("mousedown",b),p.addEventListener("touchstart",b,{passive:true}),p.addEventListener("mousemove",A),p.addEventListener("touchmove",A,{passive:false}),p.addEventListener("mouseup",P),p.addEventListener("mouseleave",P),p.addEventListener("touchend",P);}const l=w("style");l.textContent=KP,r=w("div"),o();const u=w("div");u.appendChild(l),u.appendChild(r);const f=Mr.subscribe(()=>o());return {root:u,destroy(){f(),r=null;}}}function XP(e={}){const{title:t="Outfits",defaultExpanded:n=true,onExpandChange:r,onApply:o,layout:i,showHint:a=false}=e,l=qb({onApply:o,layout:i}),u=pt({title:t,variant:"soft",expandable:true,defaultExpanded:n,onExpandChange:r}),f=u.querySelector(".card-body");if(f&&(f.appendChild(l.root),a)){const p=w("div",{className:"outfits-loadout-hint"});p.innerHTML=`
                <span class="outfits-loadout-hint__desktop">Click to apply · Right-click to delete</span>
                <span class="outfits-loadout-hint__mobile">Tap to apply · Hold to delete</span>
            `,f.appendChild(p);}return {root:u,destroy:()=>l.destroy()}}const QP=`
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
`;class JP extends Br{constructor(){super({id:"tab-avatar",label:"Avatar"});xe(this,"avatarBuilder",null);xe(this,"uiState",null);}async build(n){Mr.init(),this.uiState=await VP();const r=await Ks().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})),o={top:r.top,mid:r.mid,bottom:r.bottom,expression:r.expression},i=this.createContainer("avatar-section");n.appendChild(i);const a=w("style");a.textContent=QP,i.appendChild(a);const l=pt({title:"Avatar editor",variant:"glass",expandable:true,defaultExpanded:this.uiState.get().builderExpanded,onExpandChange:p=>{this.uiState?.update({builderExpanded:p});}});this.avatarBuilder=WP({initialOutfit:o,useRiveAnimation:true});const u=l.querySelector(".card-body");if(u){u.appendChild(this.avatarBuilder.root);const p=w("button",{className:"avatar-save-btn"});p.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save this outfit',p.addEventListener("click",()=>this.handleSave()),u.appendChild(p),u.appendChild(w("hr",{className:"avatar-outfits-divider"}));const m=qb({onApply:v=>this.avatarBuilder?.setOutfit(v)});u.appendChild(m.root),this.addCleanup(()=>m.destroy());}i.appendChild(l);const f=XP({title:"Outfits loadout",defaultExpanded:this.uiState.get().loadoutsExpanded,onExpandChange:p=>{this.uiState?.update({loadoutsExpanded:p});},layout:"grid",showHint:true});f.root.style.marginTop="12px",i.appendChild(f.root),this.addCleanup(()=>f.destroy());}async handleSave(){if(!this.avatarBuilder)return;const n=this.avatarBuilder.getOutfit(),o=`Outfit ${Mr.get().length+1}`;await Mr.save(o,n);}async destroy(){this.avatarBuilder&&(this.avatarBuilder.destroy(),this.avatarBuilder=null),super.destroy();}}const pd={ui:{expandedCards:{public:true}}};async function ZP(){const e=await _o("tab-room",{version:1,defaults:pd,sanitize:o=>({ui:{expandedCards:go(pd.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:go(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const eL=`
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
`;function tL(e){return /^I-\d+-GC-\d+-\d+$/.test(e)?"discord":"web"}function nL(e){const t=w("span",{className:`rooms-list__badge rooms-list__badge--${e}`});return t.textContent=e==="discord"?"Discord":"Web",t}function rL(e,t=16){return e.length<=t?e:`${e.slice(0,t)}...`}function oL(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,e}function iL(e,t){const n=t==="all"?e:e.filter(r=>r.playerCount<r.maxPlayers);switch(t){case "5-6":return n.filter(r=>r.playerCount>=5);case "4":return n.filter(r=>r.playerCount===4);case "1-3":return n.filter(r=>r.playerCount>=1&&r.playerCount<=3);default:return n}}function aL(e){const t=u=>u.toString().padStart(2,"0"),n=t(e.getHours()),r=t(e.getMinutes()),o=t(e.getSeconds()),i=t(e.getDate()),a=t(e.getMonth()+1),l=e.getFullYear();return `${i}/${a}/${l} ${n}:${r}:${o}`}function sL(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 50 50"),e.setAttribute("width","50"),e.setAttribute("height","50"),e.innerHTML=`
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `,e}function lL(e={}){const{rooms:t=[],onJoinRoom:n,onCopyRoomId:r,onRefresh:o,emptyMessage:i="No rooms available",joinEnabled:a=false,initialFilter:l="5-6",onFilterChange:u}=e;let f=l,p=t;const m=w("div",{className:"rooms-list"}),v=w("style");v.textContent=eL,m.appendChild(v);const y=w("div",{className:"rooms-list__header-bar"}),A=Fr({options:[{value:"5-6",label:"5-6 players"},{value:"4",label:"4 players"},{value:"1-3",label:"1-3 players"},{value:"all",label:"All"}],value:l,onChange:V=>{f=V,u?.(f),B(p);}});y.appendChild(A.root);const P=kt({label:"Refresh rooms",variant:"default",size:"sm",iconLeft:"",onClick:()=>{o?.();}});y.appendChild(P),m.appendChild(y);const I=w("div",{style:"position: relative;"}),T=w("div",{className:"rooms-list__container"});I.appendChild(T);const N=w("div",{className:"rooms-list__loading-overlay"});N.style.display="none";const z=sL();N.appendChild(z),I.appendChild(N),m.appendChild(I);const O=w("div",{className:"rooms-list__footer"}),M=w("div",{className:"rooms-list__aries-badge"});M.textContent="Powered by Aries",O.appendChild(M);const F=w("div",{className:"rooms-list__timestamp"});F.style.display="none",O.appendChild(F),m.appendChild(O);const L=[A,{remove:()=>P.remove()}],C=[];function E(V){const U=tL(V.id),ce=w("div",{className:"rooms-list__item"}),Y=w("div",{className:"rooms-list__top-row"}),ie=nL(U);Y.appendChild(ie);const se=w("span",{className:"rooms-list__id"});se.textContent=rL(V.id,20),se.title=V.id,Y.appendChild(se);const ae=oL(),ne=w("button",{className:"rooms-list__copy-btn"});ne.type="button",ne.title="Copy room ID",ne.appendChild(ae),ne.addEventListener("click",le=>{le.stopPropagation(),r?.(V.id);}),Y.appendChild(ne),ce.appendChild(Y);const q=w("div",{className:"rooms-list__bottom-row"}),Z=w("div",{className:"rooms-list__bottom-left"}),R=w("div",{className:"rooms-list__avatars"});for(let le=0;le<V.maxPlayers;le++){const ve=w("div",{className:`rooms-list__avatar ${le<V.playerCount?"rooms-list__avatar--filled":"rooms-list__avatar--empty"}`});if(V.playerAvatars&&V.playerAvatars[le]){const _e=V.playerAvatars[le];if(_e.avatarUrl){const $e=w("img",{src:_e.avatarUrl,alt:_e.name});$e.style.width="100%",$e.style.height="100%",$e.style.objectFit="cover",ve.appendChild($e);}else ve.textContent="👤";ve.title=_e.name;}else le<V.playerCount&&(ve.textContent="👤");R.appendChild(ve);}Z.appendChild(R);const $=w("span",{className:"rooms-list__count"});$.textContent=`${V.playerCount}/${V.maxPlayers}`,Z.appendChild($),q.appendChild(Z);const Q=V.playerCount>=V.maxPlayers,re=kt({label:"Join",variant:"primary",size:"sm",disabled:!a||Q,onClick:()=>{n?.(V.id);}});return C.push(re),q.appendChild(re),ce.appendChild(q),ce}function B(V){T.innerHTML="",C.forEach(ce=>{ce.destroy?ce.destroy():ce.remove&&ce.remove();}),C.length=0;const U=iL(V,f);if(U.length===0){const ce=w("div",{className:"rooms-list__empty"});ce.textContent=i,T.appendChild(ce);}else U.forEach(ce=>{const Y=E(ce);T.appendChild(Y);});}return B(t),{root:m,setRooms(V){p=V,B(V);},setFilter(V){f=V,A.setValue(V),B(p);},setLastUpdated(V){F.textContent=aL(V),F.style.display="block";},setLoading(V){V?(N.style.display="flex",N.style.opacity="0",N.offsetWidth,N.style.opacity="1"):(N.style.opacity="0",setTimeout(()=>{N.style.display="none";},300));},destroy(){C.forEach(V=>{V.destroy?V.destroy():V.remove&&V.remove();}),C.length=0,L.forEach(V=>{V.destroy?V.destroy():V.remove&&V.remove();}),L.length=0,m.remove();}}}async function cL(e){const{state:t,defaultExpanded:n=true,onExpandChange:r}=e;let o=null,i=false;const a=!Rt.isDiscord(),l=Rt.isDiscord(),f=Rt.detect().origin;async function p(){try{return (await Ps.fetchRooms(1e3)).map(A=>({id:A.id,playerCount:A.playersCount,maxPlayers:6,playerAvatars:A.userSlots?.map(P=>({name:P.name,avatarUrl:P.avatarUrl}))}))}catch(b){return console.error("[Room] Failed to fetch rooms:",b),[]}}async function m(){if(!(i||!o)){i=true,o.setLoading(true);try{const b=await p(),A=new Date;o.setRooms(b),o.setLastUpdated(A),console.log(`[Room] Fetched ${b.length} rooms from Aries API`);}catch(b){console.error("[Room] Failed to refresh rooms:",b);}finally{i=false,o.setLoading(false);}}}const v=w("div",{style:"display: flex; flex-direction: column; gap: 12px;"});o=lL({rooms:[],joinEnabled:a,onJoinRoom:b=>{const A=`${f}/r/${b}`;window.open(A,"_blank"),console.log(`[Room] Opening room: ${A}`);},onCopyRoomId:b=>{navigator.clipboard.writeText(b).then(()=>{console.log(`[Room] Room ID copied to clipboard: ${b}`);}).catch(A=>{console.error("[Room] Failed to copy room ID:",A);});},onRefresh:()=>{m();},emptyMessage:"No public rooms available",initialFilter:"5-6"}),v.appendChild(o.root);const y=pt({title:"Public",subtitle:l?"List of available public rooms (view only on Discord)":"List of available public rooms",padding:"lg",expandable:true,defaultExpanded:n,onExpandChange:b=>{r?.(b),t.setCardExpanded("public",b),b&&!i&&m();}},v);return n&&m(),{root:y,destroy(){o&&(o.destroy(),o=null);}}}class dL extends Br{constructor(n){super({id:"tab-room",label:"Room"});xe(this,"publicCardHandle",null);this.deps=n;}destroy(){this.publicCardHandle&&(this.publicCardHandle.destroy(),this.publicCardHandle=null);}async build(n){const r=this.createGrid("12px");r.id="room",n.appendChild(r);let o;try{o=await ZP();}catch{o={get:()=>pd,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get();this.publicCardHandle=await cL({state:o,defaultExpanded:!!i.ui.expandedCards.public}),r.appendChild(this.publicCardHandle.root);}}const uL=10,pL=16;function fL(e){const{selectedSpecies:t,onChange:n,placeholder:r="Search plants...",speciesRuleCount:o={},onSearchChange:i}=e;let a=t??null,l=[],u=[];const f=[],p=new Map;let m=null;const v=w("div",{className:"plant-selector"}),y=js({placeholder:r,blockGameKeys:true,withClear:true,debounceMs:150,onChange:C=>N(C)});v.appendChild(y.root),f.push(()=>{const C=y.root.__cleanup;C&&C();});const b=w("div",{className:"plant-selector__grid"});v.appendChild(b),f.push(()=>{m!==null&&(cancelAnimationFrame(m),m=null),p.clear();});async function A(C,E){if(Qe.isReady())try{const B=await Qe.toCanvas(C,{boundsMode:"padded"});B&&(B.style.maxWidth="40px",B.style.maxHeight="40px",B.style.width="auto",B.style.height="auto",B.style.display="block",E.replaceChildren(B));}catch(B){console.warn("[PlantSelector] Failed to load sprite:",B);}}function P(){if(p.size===0){m=null;return}const C=[],E=p.entries();for(let B=0;B<uL;B++){const j=E.next();if(j.done)break;C.push(j.value);}for(const[B,j]of C)A(j,B),p.delete(B);p.size>0?m=requestAnimationFrame(()=>{setTimeout(P,pL);}):m=null;}function I(){m===null&&(m=requestAnimationFrame(()=>{P();}));}function T(){try{const C=Oe.get("plants");if(!C){console.warn("[PlantSelector] No plants data available");return}l=Object.entries(C).filter(([,E])=>E&&typeof E=="object"&&"crop"in E).map(([E,B])=>({name:E,spriteId:B.crop?.spriteId||null})),u=[...l],z();}catch(C){console.error("[PlantSelector] Failed to load plants:",C);}}function N(C){if(!C.trim())u=[...l];else {const E=C.toLowerCase();u=l.filter(B=>B.name.toLowerCase().includes(E));}i?.(C),z();}function z(){const C=b.scrollTop;if(m!==null&&(cancelAnimationFrame(m),m=null),p.clear(),b.replaceChildren(),u.length===0){const B=w("div",{className:"plant-selector__empty"},"No plants found");b.appendChild(B);return}const E=document.createDocumentFragment();u.forEach(B=>{const j=O(B);E.appendChild(j);}),b.appendChild(E),b.scrollTop=C,p.size>0&&I();}function O(C){const E=o[C.name]??0,B=w("div",{className:`plant-selector__item ${a===C.name?"plant-selector__item--selected":""}`});if(E>0){const ce=w("div",{className:"plant-selector__badge"},String(E));B.appendChild(ce);}B.addEventListener("click",()=>{a=C.name,n(C.name),z();});const j=w("div",{className:"plant-selector__sprite"}),V=w("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 8%, transparent); border-radius: 4px;"});j.appendChild(V),C.spriteId&&Qe.isReady()&&p.set(j,C.spriteId),B.appendChild(j);const U=w("div",{className:"plant-selector__name"},C.name);return B.appendChild(U),B}T();function M(){return a}function F(C){a=C,z();}function L(){f.forEach(C=>C()),f.length=0;}return {root:v,getSelected:M,setSelected:F,destroy:L}}async function fl(e,t,n){const{size:r,mutations:o}=n;if(!Qe.isReady()){t.appendChild(li(r));return}try{const l=Oe.get("plants")?.[e]?.crop?.spriteId;if(!l){t.appendChild(li(r));return}const u=await Qe.toCanvas(l,{mutations:o&&o.length>0?o:void 0,boundsMode:"padded"});u?(Xb(u,r),t.appendChild(u)):t.appendChild(li(r));}catch(i){console.warn(`[SpriteRenderer] Failed to render plant sprite for ${e}:`,i),t.appendChild(li(r));}}async function hL(e,t,n){if(!Qe.isReady()){t.appendChild(za(e,n));return}try{const i=`sprite/ui/Mutation${{Ambershine:"Amberlit"}[e]??e}`;if(!Qe.has(i)){t.appendChild(za(e,n));return}const a=await Qe.toCanvas(i);a?(Xb(a,n),t.appendChild(a)):t.appendChild(za(e,n));}catch(r){console.warn(`[SpriteRenderer] Failed to render mutation sprite for ${e}:`,r),t.appendChild(za(e,n));}}function li(e){return w("div",{style:`
            width: ${e}px;
            height: ${e}px;
            background: color-mix(in oklab, var(--accent) 20%, transparent);
            border-radius: 4px;
        `})}function mL(e){return w("div",{style:`
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
        `},"—")}function za(e,t){return e==="Gold"?w("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: #FFD700;
                border-radius: 4px;
            `}):e==="Rainbow"?w("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%);
                border-radius: 4px;
            `}):li(t)}function Xb(e,t){e.style.maxWidth=`${t}px`,e.style.maxHeight=`${t}px`,e.style.width="auto",e.style.height="auto",e.style.display="block";}const or=["none","Gold","Rainbow"],$s={wet:["Wet","Chilled","Frozen"],lunar:["Dawnlit","Ambershine","Dawncharged","Ambercharged"]};function Qb(){if(!Qe.isReady())return console.warn("[MutationData] MGSprite not ready yet"),[];try{return Qe.getMutationNames().filter(t=>t!=="Gold"&&t!=="Rainbow")}catch(e){return console.error("[MutationData] Failed to get mutation names:",e),[]}}function Jb(e){if(e==="none")return "Normal";try{return Oe.get("mutations")?.[e]?.name||e}catch{return e}}function gL(e){return e.map(t=>t==="none"?"none":Jb(t).toLowerCase()).join(", ")}function bL(){return Qb()}function Qr(e){const n=bL().indexOf(e);return n===-1?1/0:n}function fd(e){return $s.wet.includes(e)}function hd(e){return $s.lunar.includes(e)}function vL(e){const t=e.filter(o=>fd(o)),n=e.filter(o=>hd(o)),r=[];return t.length>0&&r.push(t[0]),n.length>0&&r.length<2&&r.push(n[0]),r}function ja(e){const t=[e.mode];if(e.sizeCondition?.enabled&&t.push(`size:${e.sizeCondition.minPercentage}`),e.mutationCondition?.enabled){const n=[...e.mutationCondition.mutations].sort();t.push(`mut:${e.mutationCondition.matchMode}:${n.join(",")}`);}return t.join("|")}const yL=32;function Zb(e){const{mutationId:t,isSelected:n,onToggle:r,size:o=yL}=e;let i=n,a=false;const l=w("div",{style:`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.15s ease;
        `});m(),l.addEventListener("click",r),l.addEventListener("mouseenter",()=>{!i&&!a&&(l.style.background="color-mix(in oklab, var(--fg) 10%, transparent)");}),l.addEventListener("mouseleave",()=>{!i&&!a&&(l.style.background="color-mix(in oklab, var(--fg) 5%, transparent)");});const u=w("div",{style:"display: flex; align-items: center; justify-content: center;"});t==="none"?u.appendChild(mL(o)):hL(t,u,o),l.appendChild(u);const f=e.label??Jb(t),p=w("div",{style:`
            font-size: 10px;
            color: var(--fg);
            text-align: center;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        `},f);l.appendChild(p);function m(){i?(l.style.background="color-mix(in oklab, var(--accent) 20%, transparent)",l.style.border="1px solid var(--accent)"):(l.style.background="color-mix(in oklab, var(--fg) 5%, transparent)",l.style.border="1px solid color-mix(in oklab, var(--fg) 10%, transparent)");}function v(b){i=b,m();}function y(b){a=b,l.style.opacity=a?"0.35":"1",l.style.pointerEvents=a?"none":"",l.style.cursor=a?"default":"pointer";}return {root:l,setSelected:v,setDisabled:y}}function xL(e){const{enabled:t,percentage:n,sizeMode:r,ruleMode:o,onEnabledChange:i,onPercentageChange:a,onSizeModeChange:l,expanded:u=false,onExpandChange:f}=e;let p=t,m=n,v=r,y=o,b=null,A=null,P=null;const I=w("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),T=w("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");z();const N=pt({title:"Size",subtitle:"Growth size threshold",actions:[T],variant:"soft",padding:"md",expandable:true,defaultExpanded:u,onExpandChange:f},I);function z(){I.replaceChildren(),T.style.display=p?"":"none";const L=w("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=nl({checked:p,label:"Enable",size:"md",onChange:Y=>{p=Y,i(Y),z();}});L.appendChild(C.root),p&&(b=w("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},O()),L.appendChild(b)),I.appendChild(L);const E=w("div",{style:p?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),B=w("div",{style:"display: flex; justify-content: center;"}),j=Ro({segments:[{id:"min",label:"Minimum"},{id:"max",label:"Maximum"}],selected:v,onChange:Y=>{v=Y,l(v),z();}});B.appendChild(j),E.appendChild(B),P=w("div",{style:"display: flex; flex-direction: column; gap: 4px;"});const V=w("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),U=w("div",{style:"font-size: 12px; color: var(--fg); font-weight: 500;"},"Size Threshold");A=w("span",{style:"font-size: 12px; font-weight: 600; color: var(--accent);"},`${m}%`),V.appendChild(U),V.appendChild(A),P.appendChild(V);const ce=mu({min:50,max:100,step:1,value:m,showValue:false,onInput:Y=>{m=Y,A&&(A.textContent=`${Y}%`),b&&(b.textContent=O());},onChange:Y=>{m=Y,a(Y);}});P.appendChild(ce.root),E.appendChild(P),I.appendChild(E);}function O(){const L=v==="min"?"at most":"at least";return y==="lock"?`Lock plants ${L} ${m}% grown`:`Allow plants ${L} ${m}% grown`}function M(L){y=L,b&&(b.textContent=O());}function F(){b=null,A=null,P=null;}return {root:N,setRuleMode:M,destroy:F}}function wL(e){const{enabled:t,selected:n,ruleMode:r,onEnabledChange:o,onSelectionChange:i,expanded:a=false,onExpandChange:l}=e;let u=t,f=[...n],p=r,m=null;const v=[],y=w("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),b=w("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");P();const A=pt({title:"Color Mutation",subtitle:"Gold / Rainbow color variants",actions:[b],variant:"soft",padding:"md",expandable:true,defaultExpanded:a,onExpandChange:l},y);function P(){y.replaceChildren(),v.length=0,b.style.display=u?"":"none";const L=w("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=nl({checked:u,label:"Enable",size:"md",onChange:j=>{u=j,o(j),P();}});L.appendChild(C.root),u&&(m=w("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},z()),L.appendChild(m)),y.appendChild(L);const E=w("div",{style:u?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),B=w("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 8px;
            `});or.forEach(j=>{const V=f.includes(j),U=Zb({mutationId:j,isSelected:V,onToggle:()=>I(j)});v.push(U),B.appendChild(U.root);}),E.appendChild(B),y.appendChild(E);}function I(L){if(f.includes(L)){const E=f.filter(B=>B!==L);if(E.length===0)return;f=E;}else {if(f.length>=3)return;f=[...f,L];}i(f),T(),N();}function T(){m&&(m.textContent=z());}function N(){or.forEach((L,C)=>{const E=v[C];E&&E.setSelected(f.includes(L));});}function z(){const L=f.map(C=>C==="none"?"normal":C.toLowerCase()).join(", ");return p==="lock"?`Lock ${L} plants`:`Allow ${L} plants`}function O(L){p=L,T();}function M(){return [...f]}function F(){m=null,v.length=0;}return {root:A,setRuleMode:O,getSelection:M,destroy:F}}function CL(e){const{enabled:t,selected:n,matchMode:r,ruleMode:o,onEnabledChange:i,onSelectionChange:a,onMatchModeChange:l,expanded:u=false,onExpandChange:f}=e;let p=t,m=[...n],v=r,y=o,b=null;const A=new Map,P=w("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),I=w("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");N();const T=pt({title:"Weather Mutation",subtitle:"Weather-based mutation variants",actions:[I],variant:"soft",padding:"md",expandable:true,defaultExpanded:u,onExpandChange:f},P);function N(){P.replaceChildren(),A.clear(),I.style.display=p?"":"none";const j=w("div",{style:"display: flex; align-items: center; gap: 12px;"}),V=nl({checked:p,label:"Enable",size:"md",onChange:ne=>{p=ne,i(ne),N();}});j.appendChild(V.root),p&&(b=w("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"}),m.length>0&&(b.textContent=F()),j.appendChild(b)),P.appendChild(j);const U=w("div",{style:(p?"":"opacity: 0.4; pointer-events: none;")+" display: flex; flex-direction: column; gap: 12px; transition: opacity 0.2s ease;"}),ce=w("div",{style:"display: flex; justify-content: center;"}),Y=Ro({segments:[{id:"any",label:"Any"},{id:"all",label:"All"}],selected:v,onChange:ne=>{v=ne,ne==="all"&&(m=vL(m),a(m)),l(v),N();}});ce.appendChild(Y),U.appendChild(ce);const se=["none",...Qb()],ae=w("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
                gap: 8px;
                max-height: 300px;
                overflow-y: auto;
            `});se.forEach(ne=>{const q=m.includes(ne),Z=Zb({mutationId:ne,isSelected:q,onToggle:()=>z(ne),label:ne==="none"?"None":void 0});A.set(ne,Z),ae.appendChild(Z.root);}),U.appendChild(ae),P.appendChild(U);}function z(j){if(v==="all")if(j==="none")m.length===1&&m[0]==="none"?m=[]:m=["none"];else {if(m.includes("none"))return;m.includes(j)?m=m.filter(V=>V!==j):(fd(j)?m=m.filter(V=>!fd(V)):hd(j)&&(m=m.filter(V=>!hd(V))),m=[...m,j]);}else m.includes(j)?m=m.filter(V=>V!==j):m=[...m,j];a(m),O(),M();}function O(){b&&(b.textContent=m.length>0?F():"");}function M(){const j=v==="all"&&m.includes("none");A.forEach((V,U)=>{V.setSelected(m.includes(U)),V.setDisabled(j&&U!=="none");});}function F(){const j=gL(m),V=v==="all"?"AND":"OR";return y==="lock"?`Lock ${j} plants (${V})`:`Allow ${j} plants (${V})`}function L(j){y=j,O();}function C(){return [...m]}function E(){return v}function B(){b=null,A.clear();}return {root:T,setRuleMode:L,getSelection:C,getMatchMode:E,destroy:B}}const kL=60;function SL(e){let t={...e},n=null,r=null;const o=w("div",{style:"display: flex; flex-direction: column; gap: 8px;"}),i=w("div",{style:"display: flex; justify-content: center;"}),a=w("div",{className:"harvest-locker-preview-grid"});o.appendChild(i),o.appendChild(a);const l=w("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `});t.sizeEnabled&&t.sizePercentage!==void 0&&(l.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,l.style.display="");const u=pt({title:"Preview",subtitle:p(),actions:[l],variant:"soft",padding:"md",expandable:true,defaultExpanded:true},o),f=u.querySelector(".card-subtitle");m();function p(){return t.ruleMode==="lock"?"Preview of plants that will be blocked from harvesting":"Preview of plants that will be harvestable"}function m(){n!==null&&(cancelAnimationFrame(n),n=null),f&&(f.textContent=p()),t.sizeEnabled&&t.sizePercentage!==void 0?(l.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,l.style.display=""):l.style.display="none";const I=t.colorEnabled?or.filter(T=>t.colorMutations.includes(T)):[];if(I.length>=2){r&&!I.includes(r)&&(r=I[0]),r||(r=I[0]),i.replaceChildren();const T=Ro({segments:I.map(N=>({id:N,label:N==="none"?"Normal":N})),selected:r,onChange:N=>{r=N,m();}});i.appendChild(T);}else r=null,i.replaceChildren();a.replaceChildren(),n=requestAnimationFrame(()=>{v().forEach(N=>{a.appendChild(N);});});}function v(){const I=[],T=t.species||"Starweaver";if(!(t.sizeEnabled||t.colorEnabled||t.weatherEnabled))return I.push(b(T,[])),I;const z=y();if(z.sort((M,F)=>{const L=Math.max(0,...M.map(j=>or.indexOf(j))),C=Math.max(0,...F.map(j=>or.indexOf(j)));if(L!==C)return L-C;const E=M.filter(j=>!or.includes(j)).sort((j,V)=>Qr(j)-Qr(V)),B=F.filter(j=>!or.includes(j)).sort((j,V)=>Qr(j)-Qr(V));if(E.length!==B.length)return E.length-B.length;for(let j=0;j<E.length;j++){const V=Qr(E[j])-Qr(B[j]);if(V!==0)return V}return 0}),z.length===0){const M=w("div",{style:"padding: 12px; text-align: center; color: #ef4444; font-size: 12px;"},"Invalid mutation combination");return I.push(M),I}return (r?z.filter(M=>{const F=M.filter(L=>or.includes(L)&&L!=="none");return r==="none"?F.length===0:F.includes(r)}):z).forEach(M=>{I.push(b(T,M));}),I}function y(){const I=[],T=t.weatherEnabled?t.weatherMutations.filter(j=>j!=="none"):[],N=t.colorEnabled?t.colorMutations.filter(j=>j!=="none"):[],z=t.weatherEnabled&&t.weatherMutations.includes("none"),O=t.colorEnabled&&t.colorMutations.includes("none");if(T.length===0&&N.length===0||!t.weatherEnabled&&!t.colorEnabled)return I.push([]),I;const M=T.filter(j=>$s.wet.includes(j)),F=T.filter(j=>$s.lunar.includes(j)),L=(j,V)=>{j.length===0&&V.length===0?I.push([]):j.length===0?V.forEach(U=>{I.push([...U]);}):V.length===0?j.forEach(U=>{I.push([...U]);}):j.forEach(U=>{V.forEach(ce=>{I.push([...U,...ce]);});});},C=[];if(z&&C.push([]),t.weatherMatchMode==="all"&&T.length>0){const j=M.length>1,V=F.length>1;if(j||V)return [];C.push(T);}else t.weatherMatchMode==="any"&&T.length>0&&(T.forEach(j=>{C.push([j]);}),M.forEach(j=>{F.forEach(V=>{C.push([j,V]);});}));const E=[];return O&&E.push([]),N.forEach(j=>{E.push([j]);}),L(C,E),Array.from(new Set(I.map(j=>j.sort().join(",")))).map(j=>j.split(",").filter(Boolean))}function b(I,T){const N=w("div",{style:"flex-shrink: 0;"});return fl(I,N,{size:kL,mutations:T}),N}function A(I){t={...t,...I},m();}function P(){n!==null&&(cancelAnimationFrame(n),n=null),a.replaceChildren();}return {root:u,update:A,destroy:P}}function Hf(e){const{mode:t,species:n,ruleId:r,initialData:o,onSave:i,onDelete:a,onCancel:l}=e;let u=o?.name??"",f=o?.ruleMode??"lock",p=o?.sizeCondition?.enabled??false,m=o?.sizeCondition?.minPercentage??75,v=o?.sizeCondition?.sizeMode??"max";const y=o?.mutationCondition?.mutations??[],b=y.filter(R=>["none","Gold","Rainbow"].includes(R));let A=b.length>0,P=b.length>0?b:["none"];const I=y.filter(R=>!["none","Gold","Rainbow"].includes(R));let T=I.length>0,N=I.length>0?I:["none"],z=o?.mutationCondition?.matchMode??"any",O=null,M=null,F=null,L=null,C=null,E=null,B=null;const j=ce(),V=ie();B=hu({title:U(),content:j,footer:V,size:"lg",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{l?.();}});function U(){if(t!=="species"||!n)return r?"Edit Overall Rule":"Create Overall Rule";const R=w("div",{style:"display: flex; align-items: center; gap: 10px;"}),$=w("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});fl(n,$,{size:24}),R.appendChild($);const Q=w("span",{},`${n} — Override Rule`);return R.appendChild(Q),R}function ce(){const R=w("div",{style:"display: flex; flex-direction: column; gap: 16px;"});if(t==="species"){const $=w("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 60%, transparent); padding: 8px 10px; background: color-mix(in oklab, var(--accent) 8%, transparent); border-radius: 6px; border-left: 3px solid var(--accent);"},"Global rules still apply. This override takes priority for this species only.");R.appendChild($);}return R.appendChild(Y()),O=xL({enabled:p,percentage:m,sizeMode:v,ruleMode:f,onEnabledChange:$=>{p=$,ae(),ne();},onPercentageChange:$=>{m=$,ne();},onSizeModeChange:$=>{v=$,ne();}}),R.appendChild(O.root),M=wL({enabled:A,selected:P,ruleMode:f,onEnabledChange:$=>{A=$,ae(),ne();},onSelectionChange:$=>{P=$,ne();}}),R.appendChild(M.root),F=CL({enabled:T,selected:N,matchMode:z,ruleMode:f,onEnabledChange:$=>{T=$,ae(),ne();},onSelectionChange:$=>{N=$,ne();},onMatchModeChange:$=>{z=$,ne();}}),R.appendChild(F.root),L=SL({species:t==="overall"?"Carrot":n,ruleMode:f,sizeEnabled:p,sizePercentage:m,sizeMode:v,colorEnabled:A,colorMutations:P,weatherEnabled:T,weatherMutations:N,weatherMatchMode:z}),R.appendChild(L.root),R}function Y(){const R=w("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),$=w("div",{style:"display: flex; gap: 12px; align-items: flex-start;"}),Q=w("div",{style:"flex: 1; display: flex; flex-direction: column; gap: 6px;"}),re=w("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Rule Name");Q.appendChild(re),C=zs({placeholder:"e.g., Lock Large Frozen",value:u,maxLength:30,blockGameKeys:true,onChange:$e=>{u=$e,ae();}}),Q.appendChild(C.root),$.appendChild(Q);const le=w("div",{style:"display: flex; flex-direction: column; gap: 6px;"}),ve=w("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Mode");le.appendChild(ve);const _e=Ro({segments:[{id:"lock",label:"Lock"},{id:"allow",label:"Allow"}],selected:f,onChange:$e=>{f=$e,O?.setRuleMode(f),M?.setRuleMode(f),F?.setRuleMode(f),ne();}});return le.appendChild(_e),$.appendChild(le),R.appendChild($),R}function ie(){const R=w("div",{style:"display: flex; gap: 8px; justify-content: space-between; width: 100%;"}),$=w("div",{style:"display: flex; gap: 8px;"});if(r&&a){const ve=kt({label:"Delete Rule",variant:"danger",onClick:()=>{a(),Z();}});$.appendChild(ve);}R.appendChild($);const Q=w("div",{style:"display: flex; gap: 8px;"}),re=kt({label:"Cancel",variant:"default",onClick:()=>{l?.(),Z();}});Q.appendChild(re);const le=kt({label:"Save",variant:"primary",disabled:!se(),onClick:q});return E=le,Q.appendChild(le),R.appendChild(Q),R}function se(){return !(!u.trim()||!p&&!A&&!T)}function ae(){E&&(E.disabled=!se());}function ne(){L?.update({ruleMode:f,sizeEnabled:p,sizePercentage:m,sizeMode:v,colorEnabled:A,colorMutations:P,weatherEnabled:T,weatherMutations:N,weatherMatchMode:z});}function q(){if(!se())return;const R={name:u.trim(),ruleMode:f};p&&(R.sizeCondition={enabled:true,minPercentage:m,sizeMode:v});const $=[];T&&$.push(...N),A&&$.push(...P),$.length>0&&(R.mutationCondition={enabled:true,mutations:$,matchMode:z}),i(R),Z();}function Z(){O?.destroy(),M?.destroy(),F?.destroy(),L?.destroy(),C?.destroy(),B?.destroy(),O=null,M=null,F=null,L=null,C=null,E=null,B=null;}return {root:B.root,destroy:Z}}function AL(e){const{species:t,existingRules:n,onSelect:r}=e;let o=null;const i=u(),a=f();o=hu({title:l(),subtitle:"Select a rule to assign to this species",content:i,footer:a,size:"md",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{}});function l(){const b=w("div",{style:"display: flex; align-items: center; gap: 10px;"}),A=w("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});return fl(t,A,{size:24}),b.appendChild(A),b.appendChild(w("span",{},`${t} — Assign Rule`)),b}function u(){const b=w("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(n.length===0){const A=w("div",{style:"padding: 20px; text-align: center; color: var(--muted); font-size: 14px;"},"No overall rules available");b.appendChild(A);}else n.forEach(A=>{b.appendChild(p(A));});return b}function f(){const b=w("div",{style:"display: flex; gap: 8px; justify-content: flex-end;"}),A=kt({label:"Cancel",variant:"default",onClick:()=>{y();}});return b.appendChild(A),b}function p(b){const A=w("div",{className:"harvest-locker-rule-item",style:"flex-direction: column; align-items: flex-start; gap: 8px;"});A.addEventListener("click",()=>{zt.cloneRuleToSpecies(b.id,t),r(b.id),y();});const P=w("div",{style:"display: flex; align-items: center; justify-content: space-between; width: 100%;"});P.appendChild(w("div",{className:"harvest-locker-rule-item__name"},b.name)),P.appendChild(w("div",{className:"harvest-locker-rule-item__badge"},b.mode)),A.appendChild(P);const I=m(b);return I.childNodes.length>0&&A.appendChild(I),A}function m(b){const A=w("div",{style:"display: flex; flex-wrap: wrap; gap: 4px;"});return b.sizeCondition?.enabled&&A.appendChild(v(`Size ≥ ${b.sizeCondition.minPercentage}%`)),b.mutationCondition?.enabled&&b.mutationCondition.mutations.forEach(P=>{A.appendChild(v(P==="none"?"Normal":P));}),A}function v(b){return w("div",{style:`
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 500;
                color: color-mix(in oklab, var(--fg) 75%, transparent);
                background: color-mix(in oklab, var(--fg) 8%, transparent);
                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
            `},b)}function y(){o?.destroy(),o=null;}return {root:o.root,destroy:y}}const EL={ui:{harvestLockerMode:"overall",selectedSpecies:null,searchQuery:"",harvestLockerExpanded:true,eggLockerExpanded:true,decorLockerExpanded:true}};let no=null,hc=null;async function _L(){return no||(hc||(hc=_o("tab-locker",{version:1,defaults:EL,sanitize:e=>({ui:{harvestLockerMode:e.ui?.harvestLockerMode==="bySpecies"?"bySpecies":"overall",selectedSpecies:typeof e.ui?.selectedSpecies=="string"?e.ui.selectedSpecies:null,searchQuery:typeof e.ui?.searchQuery=="string"?e.ui.searchQuery:"",harvestLockerExpanded:typeof e.ui?.harvestLockerExpanded=="boolean"?e.ui.harvestLockerExpanded:true,eggLockerExpanded:typeof e.ui?.eggLockerExpanded=="boolean"?e.ui.eggLockerExpanded:true,decorLockerExpanded:typeof e.ui?.decorLockerExpanded=="boolean"?e.ui.decorLockerExpanded:true}})})),no=await hc,no)}function Jn(){if(!no)throw new Error("[LockerState] State not initialized. Call initLockerState() first.");return no}function IL(e){const t=Jn();t.update({ui:{...t.get().ui,harvestLockerMode:e}});}function TL(e){const t=Jn();t.update({ui:{...t.get().ui,selectedSpecies:e}});}function PL(e){const t=Jn();t.update({ui:{...t.get().ui,searchQuery:e}});}function LL(e){const t=Jn();t.update({ui:{...t.get().ui,harvestLockerExpanded:e}});}function ML(e){const t=Jn();t.update({ui:{...t.get().ui,eggLockerExpanded:e}});}function RL(e){const t=Jn();t.update({ui:{...t.get().ui,decorLockerExpanded:e}});}function FL(e={}){let t=e.defaultMode??"overall",n=e.defaultSelectedSpecies??null,r=[],o=null,i=null,a=null,l=null,u=null,f=null;const p=[];o=m();function m(){const E=w("div",{className:"harvest-locker-card-wrapper"});i=w("div",{className:"harvest-locker-card__mode-container"}),E.appendChild(i),a=w("div",{className:"harvest-locker-card__content"}),E.appendChild(a);const B=pt({title:"Crop Harvest",subtitle:"Prevent harvesting specific crops",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},E);return v(),b(),y(),B}function v(){t==="overall"?r=zt.getOverallRules():r=n?zt.getSpeciesRules(n):[];}function y(){a&&(a.replaceChildren(),t==="bySpecies"&&(A(),n&&P()),I(),N());}function b(){if(i){if(!l){l=Ro({segments:[{id:"overall",label:"Overall"},{id:"bySpecies",label:"By Species"}],selected:t,onChange:E=>{t=E,IL(t),v(),y();}}),i.appendChild(l);return}l.getSelected()!==t&&l.select(t);}}function A(){if(!a)return;const E=Oe.get("plants");if(!E||Object.keys(E).length===0){const U=w("div",{className:"harvest-locker-card__message harvest-locker-card__message--compact"},"No species available");a.appendChild(U);return}const B=zt.getConfig(),j={};Object.entries(B.speciesRules).forEach(([U,ce])=>{j[U]=ce.length;}),u=fL({selectedSpecies:n??void 0,placeholder:"Search plants...",speciesRuleCount:j,onChange:U=>{n=U,TL(U),v(),y();},onSearchChange:U=>{PL(U);}});const V=w("div",{className:"harvest-locker-card__control"});V.appendChild(u.root),a.appendChild(V);}function P(){if(!a||!n)return;const E=w("div",{className:"harvest-locker-card__species-section-header"}),B=w("div",{className:"harvest-locker-card__species-section-sprite"});fl(n,B,{size:36}),E.appendChild(B);const j=w("div",{className:"harvest-locker-card__species-section-text"}),V=w("div",{className:"harvest-locker-card__species-section-name"},n);j.appendChild(V);const U=w("div",{className:"harvest-locker-card__species-section-label"},"SELECTED");j.appendChild(U),E.appendChild(j),a.appendChild(E);}function I(){if(!a)return;if(t==="bySpecies"&&!n){const U=w("div",{className:"harvest-locker-card__message"},"Select a species to view and manage rules");a.appendChild(U);return}const E=w("div",{className:"harvest-locker-card__rules-section"}),B=w("div",{className:"harvest-locker-card__rules-section-label"},"Rules");if(E.appendChild(B),r.length===0){const U=w("div",{className:"harvest-locker-card__empty"},"No rules yet");E.appendChild(U),a.appendChild(E);return}const j=w("div",{className:"harvest-locker-card__list"});r.forEach(U=>{const ce=T(U);j.appendChild(ce);}),E.appendChild(j);const V=w("div",{className:"harvest-locker-card__rules-hint"});V.appendChild(w("span",{className:"harvest-locker-card__rules-hint--desktop"},"Click to edit · Right-click to delete")),V.appendChild(w("span",{className:"harvest-locker-card__rules-hint--mobile"},"Tap to edit · Long-press to delete")),E.appendChild(V),a.appendChild(E);}function T(E){const B=w("div",{className:"harvest-locker-rule-item"}),j=w("div",{className:"harvest-locker-rule-item__name"},E.name);B.appendChild(j);const V=w("div",{className:"harvest-locker-rule-item__badge"},E.mode);B.appendChild(V),B.addEventListener("contextmenu",Y=>{Y.preventDefault(),M(E.id);});let U=null,ce=false;return B.addEventListener("touchstart",()=>{ce=false,U=window.setTimeout(()=>{ce=true,M(E.id),navigator.vibrate&&navigator.vibrate(50);},500);}),B.addEventListener("touchend",()=>{U&&(clearTimeout(U),U=null),ce||O(E);}),B.addEventListener("touchmove",()=>{U&&(clearTimeout(U),U=null);}),B.addEventListener("click",()=>{O(E);}),B}function N(){if(!a||t==="bySpecies"&&!n)return;const E=w("div",{className:"harvest-locker-card__actions"});if(t==="bySpecies"&&n){const B=zt.getOverallRules();if(B.length>0){const j=zt.getSpeciesRules(n),V=new Set(j.map(Y=>ja(Y))),U=B.filter(Y=>!V.has(ja(Y))),ce=kt({label:"Add Existing Rule",variant:"default",disabled:U.length===0,onClick:()=>F()});E.appendChild(ce);}}f=kt({label:t==="bySpecies"?"Create Override Rule":"Create Rule",variant:"primary",onClick:()=>z()}),E.appendChild(f),a.appendChild(E);}function z(){Hf({mode:t==="overall"?"overall":"species",species:n,onSave:E=>{t==="overall"?zt.addNewOverallRule(E.name,E.ruleMode,E.sizeCondition,E.mutationCondition):n&&zt.addNewSpeciesRule(n,E.name,E.ruleMode,E.sizeCondition,E.mutationCondition),v(),y();}});}function O(E){Hf({mode:t==="overall"?"overall":"species",species:n,ruleId:E.id,initialData:{name:E.name,ruleMode:E.mode,sizeCondition:E.sizeCondition,mutationCondition:E.mutationCondition},onSave:B=>{zt.modifyRule(E.id,{name:B.name,mode:B.ruleMode,sizeCondition:B.sizeCondition,mutationCondition:B.mutationCondition}),v(),y();},onDelete:()=>{M(E.id);}});}function M(E){zt.removeRule(E),v(),y();}function F(){if(t!=="bySpecies"||!n)return;const E=zt.getOverallRules();if(E.length===0)return;const B=zt.getSpeciesRules(n),j=new Set(B.map(U=>ja(U))),V=E.filter(U=>!j.has(ja(U)));V.length!==0&&AL({species:n,existingRules:V,onSelect:()=>{v(),y();}});}function L(){v(),b(),y();}function C(){p.forEach(E=>E()),p.length=0,l?.destroy?.(),l=null,u?.destroy?.(),u=null,f=null,i=null,a=null,o=null;}return {root:o,render:L,destroy:C}}class OL{constructor(t={}){xe(this,"handle",null);xe(this,"options");this.options=t;}build(){return this.handle||(this.handle=FL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const NL=`
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
`;function DL(e){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.innerHTML=e?'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>':'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',t}async function $L(e,t,n){if(!Qe.isReady()){t.appendChild(Ga(n));return}try{const o=Oe.get("eggs")?.[e]?.spriteId;if(!o){t.appendChild(Ga(n));return}const i=await Qe.toCanvas(o,{boundsMode:"padded"});i?(i.style.maxWidth=`${n}px`,i.style.maxHeight=`${n}px`,i.style.width="auto",i.style.height="auto",i.style.display="block",t.appendChild(i)):t.appendChild(Ga(n));}catch{t.appendChild(Ga(n));}}function Ga(e){return w("div",{style:`width:${e}px;height:${e}px;background:color-mix(in oklab, var(--accent) 20%, transparent);border-radius:6px;`})}function BL(e={}){let t=null,n=null;n=r();function r(){return t=w("div",{className:"egg-locker-card__wrapper"}),o(),pt({title:"Egg Hatching",subtitle:"Prevent hatching specific eggs",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t)}function o(){if(!t)return;t.replaceChildren();const u=ar.getAvailableEggs();if(u.length===0){t.appendChild(w("div",{className:"egg-locker-card__empty"},"No eggs available"));return}const f=new Set(ar.getBlockedEggs()),p=Oe.get("eggs"),m=w("div",{className:"egg-locker-card__grid"});for(const v of u){const y=p?.[v]?.name??v;m.appendChild(i(v,f.has(v),y));}t.appendChild(m);}function i(u,f,p){const m=w("div",{className:"egg-locker-item"+(f?" egg-locker-item--locked":"")}),v=w("div",{className:"egg-locker-item__sprite"});$L(u,v,48),m.appendChild(v),m.appendChild(w("div",{className:"egg-locker-item__name"},p));const y=w("div",{className:"egg-locker-item__lock"+(f?" egg-locker-item__lock--locked":"")});return y.appendChild(DL(f)),m.appendChild(y),m.addEventListener("click",()=>{f?ar.unblockEgg(u):ar.blockEgg(u),o();}),m}function a(){o();}function l(){t=null,n=null;}return {root:n,render:a,destroy:l}}class zL{constructor(t={}){xe(this,"handle",null);xe(this,"options");this.options=t;}build(){return this.handle||(this.handle=BL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const jL=`
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
`;function GL(e={}){let t=null,n=null,r=null,o=null;const i=[];n=a();function a(){t=w("div",{className:"decor-locker-card__wrapper",style:"display: flex; flex-direction: column; gap: 16px;"}),l();const p=pt({title:"Decor Pickup",subtitle:"Prevent decor pickups",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t),m=()=>u();return window.addEventListener(ft.DECOR_LOCKER_LOCKS_UPDATED,m),i.push(()=>window.removeEventListener(ft.DECOR_LOCKER_LOCKS_UPDATED,m)),p}function l(){if(!t)return;const p=sr.getAvailableDecors().length,v=sr.getBlockedDecors().length===p&&p>0;if(r)r.setChecked(v,true),o&&(o.textContent=v?"Decors Unpickable":"Decors Pickable");else {t.replaceChildren();const y=w("div",{style:`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: color-mix(in oklab, var(--accent) 10%, transparent);
                    border-radius: 8px;
                `});o=w("div",{style:"font-size: 14px; font-weight: 500;"},v?"Decors Unpickable":"Decors Pickable"),r=Or({checked:v,size:"md",onChange:b=>{b?sr.blockAllDecors():sr.unblockAllDecors();}}),i.push(()=>r?.destroy()),y.appendChild(o),y.appendChild(r.root),t.appendChild(y);}}function u(){l();}function f(){i.forEach(p=>p()),i.length=0,t=null,n=null;}return {root:n,render:u,destroy:f}}class UL{constructor(t={}){xe(this,"handle",null);xe(this,"options");this.options=t;}build(){return this.handle||(this.handle=GL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const WL=`
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
`;class HL extends Br{constructor(){super({id:"tab-locker",label:"Locker"});xe(this,"harvestLockerCardPart",null);xe(this,"eggLockerCardPart",null);xe(this,"decorLockerCardPart",null);}async preload(){await _L();}build(n){const r=n.getRootNode();un(r,NL,"harvest-locker-card-styles"),un(r,WL,"plant-selector-styles"),un(r,jL,"egg-locker-card-styles");const o=this.createGrid("12px");o.id="locker",n.appendChild(o),this.initializeHarvestLockerCardPart(o),this.initializeEggLockerCardPart(o),this.initializeDecorLockerCardPart(o);}render(n){const r=this.harvestLockerCardPart,o=this.eggLockerCardPart,i=this.decorLockerCardPart;this.harvestLockerCardPart=null,this.eggLockerCardPart=null,this.decorLockerCardPart=null,super.render(n),this.harvestLockerCardPart=r,this.eggLockerCardPart=o,this.decorLockerCardPart=i;}destroy(){this.harvestLockerCardPart&&(this.harvestLockerCardPart.destroy(),this.harvestLockerCardPart=null),this.eggLockerCardPart&&(this.eggLockerCardPart.destroy(),this.eggLockerCardPart=null),this.decorLockerCardPart&&(this.decorLockerCardPart.destroy(),this.decorLockerCardPart=null);}initializeHarvestLockerCardPart(n){if(!this.harvestLockerCardPart){const o=Jn();this.harvestLockerCardPart=new OL({defaultExpanded:o.get().ui.harvestLockerExpanded,defaultMode:o.get().ui.harvestLockerMode,defaultSelectedSpecies:o.get().ui.selectedSpecies,defaultSearchQuery:o.get().ui.searchQuery,onExpandChange:LL});}const r=this.harvestLockerCardPart.build();n.appendChild(r),this.harvestLockerCardPart.render();}initializeEggLockerCardPart(n){if(!this.eggLockerCardPart){const o=Jn();this.eggLockerCardPart=new zL({defaultExpanded:o.get().ui.eggLockerExpanded,onExpandChange:ML});}const r=this.eggLockerCardPart.build();n.appendChild(r),this.eggLockerCardPart.render();}initializeDecorLockerCardPart(n){if(!this.decorLockerCardPart){const o=Jn();this.decorLockerCardPart=new UL({defaultExpanded:o.get().ui.decorLockerExpanded,onExpandChange:RL});}const r=this.decorLockerCardPart.build();n.appendChild(r),this.decorLockerCardPart.render();}}let mc=null,gc=null,bc=null;function VL(){return mc||(mc=new hE),mc}function ev(){return gc||(gc=new t2),gc}function tv(){return bc||(bc=new HL),bc}function KL(e){return [new Jy(e),ev(),new I_(e),new JP,new dL(e),tv()]}async function YL(){const e=ev(),t=tv(),n=VL();await Promise.all([e.preload(),t.preload(),n.preload()]);}function qL(e){const{shadow:t,initialOpen:n}=e,r=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=w("div",{className:"gemini-tabbar"}),i=w("div",{className:"gemini-content",id:"content"}),a=w("div",{className:"gemini-resizer",title:"Resize"}),l=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const u=w("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:i,resizer:a,closeButton:l,wrapper:u}}function XL(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:l}=e;let u=a,f=l;function p(){const z=Rt.detect(),O=Math.round(fe.visualViewport?.width??fe.innerWidth??0);if(z.platform==="mobile"||z.os==="ios"||z.os==="android"){const M=getComputedStyle(r.host),F=parseFloat(M.getPropertyValue("--inset-l"))||0,L=parseFloat(M.getPropertyValue("--inset-r"))||0,C=Math.max(280,O-Math.round(F+L));u=280,f=C;}else u=a,f=l;return {min:u,max:f}}function m(z){return Math.max(u,Math.min(f,Number(z)||i))}function v(z){const O=m(z);n.style.setProperty("--w",`${O}px`),o(O);}p();const y=Rt.detect(),b=!(y.platform==="mobile"||y.os==="ios"||y.os==="android");let A=false;const P=z=>{if(!A)return;z.preventDefault();const O=Math.round(fe.innerWidth-z.clientX);v(O);},I=()=>{A&&(A=false,document.body.style.cursor="",fe.removeEventListener("mousemove",P),fe.removeEventListener("mouseup",I));},T=z=>{b&&(z.preventDefault(),A=true,document.body.style.cursor="ew-resize",fe.addEventListener("mousemove",P),fe.addEventListener("mouseup",I));};t.addEventListener("mousedown",T);function N(){t.removeEventListener("mousedown",T),fe.removeEventListener("mousemove",P),fe.removeEventListener("mouseup",I);}return {calculateResponsiveBounds:p,constrainWidthToLimits:m,setHudWidth:v,destroy:N}}function QL(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(u){const f=t.classList.contains("open");if(i&&u.key==="Escape"&&f){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function l(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:l}}const JL=`
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
`,ZL=`
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
`,eM=`
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
`,tM=`
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
`,nM=`
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
  
`,rM=`
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
`,oM=`
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
`,iM=`
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
`,aM=`
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
`,sM=`
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
`,lM=`
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
`,cM=`
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
`,dM=`
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
`,uM=`
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
`,pM=`
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
`,fM=`
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
`,hM=`
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
`,mM=`
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
`,gM=`
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
`,bM=`
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
`,vM=`
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
`,yM=`
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
`,xM=`
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
`,wM=`
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
`,CM={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function kM(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,CM),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function SM(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function AM(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:l,onThemeChange:u,buildSections:f,initialTab:p,onTabChange:m,toggleCombo:v=re=>re.ctrlKey&&re.shiftKey&&re.key.toLowerCase()==="u",closeOnEscape:y=true,minWidth:b=420,maxWidth:A=720}=e,{host:P,shadow:I}=kM(t),T=[[ZL,"variables"],[eM,"primitives"],[tM,"utilities"],[JL,"hud"],[nM,"card"],[Lg,"badge"],[rM,"button"],[dM,"checkbox"],[oM,"input"],[iM,"label"],[aM,"navTabs"],[sM,"searchBar"],[lM,"select"],[cM,"switch"],[uM,"table"],[pM,"teamListItem"],[fM,"timeRangePicker"],[hM,"tooltip"],[mM,"slider"],[gM,"reorderableList"],[bM,"colorPicker"],[vM,"log"],[yM,"segmentedControl"],[xM,"soundPicker"],[wM,"settings"],[Pg,"teamCard"]];for(let re=0;re<T.length;re++){const[le,ve]=T[re];un(I,le,ve),re%5===4&&await SM();}const{panel:N,tabbar:z,content:O,resizer:M,closeButton:F,wrapper:L}=qL({shadow:I,initialOpen:r});function C(re){N.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:re},bubbles:true})),i?.(re);}function E(re){const le=N.classList.contains("open");N.classList.toggle("open",re),N.setAttribute("aria-hidden",re?"false":"true"),re!==le&&C(re);}E(r),F.addEventListener("click",re=>{re.preventDefault(),re.stopPropagation(),E(false);});const B=Hy({host:P,themes:a,initialTheme:l,onThemeChange:u}),j=XL({resizer:M,host:P,shadow:I,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:b,maxWidth:A});j.setHudWidth(n);const V=f({applyTheme:B.applyTheme,initialTheme:l,getCurrentTheme:B.getCurrentTheme,setHUDWidth:j.setHudWidth,setHUDOpen:E}),U=new Kv(V,O,{applyTheme:B.applyTheme,getCurrentTheme:B.getCurrentTheme}),ce=V.map(re=>({id:re.id,label:re.label})),Y=p&&V.some(re=>re.id===p)?p:ce[0]?.id||"",ie=Vv(ce,Y,re=>{U.activate(re),m?.(re);});ie.root.style.flex="1 1 auto",ie.root.style.minWidth="0",z.append(ie.root,F);const se={"tab-pets":"pets","tab-locker":"locker","tab-alerts":"alerts","tab-avatar":"avatar","tab-room":"room"};function ae(){const re=at(At.CONFIG,{pets:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true}});for(const[le,ve]of Object.entries(se))re[ve]?.enabled??true?ie.showTab(le):ie.hideTab(le);}function ne(re){const{key:le}=re.detail;(le===At.CONFIG||le==="feature:config")&&ae();}window.addEventListener(ft.STORAGE_CHANGE,ne),ae();let q=Y;if(!ie.isTabVisible(Y)){const re=ie.getVisibleTabs();re.length>0&&(q=re[0]);}q&&U.activate(q);const Z=QL({panel:N,onToggle:()=>E(!N.classList.contains("open")),onClose:()=>E(false),toggleCombo:v,closeOnEscape:y}),R=()=>{ie.recalc();const re=parseInt(getComputedStyle(P).getPropertyValue("--w"))||n;j.calculateResponsiveBounds(),j.setHudWidth(re);};fe.addEventListener("resize",R);const $=re=>{const le=re.detail?.width;le?j.setHudWidth(le):j.setHudWidth(n),ie.recalc();};P.addEventListener("gemini:layout-resize",$);function Q(){window.removeEventListener(ft.STORAGE_CHANGE,ne),Z.destroy(),j.destroy(),fe.removeEventListener("resize",R),P.removeEventListener("gemini:layout-resize",$);}return {host:P,shadow:I,wrapper:L,panel:N,content:O,setOpen:E,setWidth:j.setHudWidth,sections:V,manager:U,nav:ie,destroy:Q}}const ro={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},ci={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function EM(){return {isOpen:at(ro.isOpen,ci.isOpen),width:at(ro.width,ci.width),theme:at(ro.theme,ci.theme),activeTab:at(ro.activeTab,ci.activeTab)}}function Ua(e,t){st(ro[e],t);}function _M(e,t){return at(ro[e],t)}const IM="https://i.imgur.com/IMkhMur.png",TM="Stats";function PM(e){let t=e.iconUrl||IM;const n=e.ariaLabel||"Open Gemini";let r=null,o=null,i=null,a=false,l=null,u=null;const f=["Chat","Leaderboard","Stats","Open Activity Log"],p=O=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(O):O.replace(/"/g,'\\"')}catch{return O}};function m(){const O=document.querySelector(f.map(F=>`button[aria-label="${p(F)}"]`).join(","));if(!O)return null;let M=O.parentElement;for(;M&&M!==document.body;){if(f.reduce((L,C)=>L+M.querySelectorAll(`button[aria-label="${p(C)}"]`).length,0)>=2)return M;M=M.parentElement;}return null}function y(O){const M=Array.from(O.querySelectorAll("button[aria-label]"));if(!M.length)return {refBtn:null,refWrapper:null};const F=M.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),L=F.length?F:M,C=L.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===TM.toLowerCase())||null,E=L.length>=2?L.length-2:L.length-1,B=C||L[E],j=B.parentElement,V=j&&j.parentElement===O&&j.tagName==="DIV"?j:null;return {refBtn:B,refWrapper:V}}function b(O,M,F){const L=O.cloneNode(false);L.type="button",L.setAttribute("aria-label",M),L.title=M,L.dataset.mghBtn="true",L.style.pointerEvents="auto",L.removeAttribute("id");const C=document.createElement("img");return C.src=F,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",L.appendChild(C),L.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();try{e.onClick?.();}catch{}}),L}function A(){if(a)return  false;a=true;let O=false;try{const M=m();if(!M)return !1;l!==M&&(l=M);const{refBtn:F,refWrapper:L}=y(M);if(!F)return !1;o=M.querySelector('div[data-mgh-wrapper="true"]'),!o&&L&&(o=L.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),O=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=b(F,n,t),o?o.appendChild(r):r.parentElement!==M&&M.appendChild(r),O=!0),o&&o.parentElement!==M&&(M.appendChild(o),O=!0);const E=M;if(E&&E!==u){try{N.disconnect();}catch{}u=E,N.observe(u,{childList:!0,subtree:!0});}return O}finally{a=false;}}const P=document.getElementById("App")||document.body;let I=null,T=false;const N=new MutationObserver(()=>{T&&r&&document.contains(r)||(r&&!document.contains(r)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),T=false,r=null,o=null),I===null&&(I=window.setTimeout(()=>{if(I=null,A()&&r&&document.contains(r)&&(T=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),o)){const M=o.parentElement;M&&M.lastElementChild!==o&&M.appendChild(o);}},100)));});return A()&&r&&document.contains(r)?(T=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),N.observe(P,{childList:true,subtree:true}),i=()=>N.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const nv=[];function LM(){return nv.slice()}function Vf(e){nv.push(e);}function MM(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function RM(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const vc=Symbol.for("ariesmod.ws.handlers.patched");function Pt(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return Vf(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Vf(r),r}function FM(e,t=LM(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[vc])return ()=>{};e[vc]=true;const i={ws:e,pageWindow:r,debug:o},a=m=>{for(const v of t)try{if(!v.match(m))continue;if(v.handle(m,i)===!0)return}catch(y){o&&console.error("[WS] handler error",y,m);}},l=m=>{const v=RM(m.data),y=MM(v);a({kind:"message",raw:m.data,data:v,type:y});},u=m=>{a({kind:"close",code:m.code,reason:m.reason,wasClean:m.wasClean,event:m});},f=m=>a({kind:"open",event:m}),p=m=>a({kind:"error",event:m});return e.addEventListener("message",l),e.addEventListener("close",u),e.addEventListener("open",f),e.addEventListener("error",p),()=>{try{e.removeEventListener("message",l);}catch{}try{e.removeEventListener("close",u);}catch{}try{e.removeEventListener("open",f);}catch{}try{e.removeEventListener("error",p);}catch{}try{delete e[vc];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Pt(Cn.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Pt(Cn.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Pt(Cn.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Pt(Cn.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Pt(Cn.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Pt(Cn.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Pt(Cn.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Pt(Cn.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Pt(Cn.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Pt(Cn.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Pt(er.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Pt(er.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Pt(er.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Pt(er.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Pt(er.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Pt(er.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Pt(er.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Pt(er.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});Pe(he.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));Pe(he.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));Pe(he.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));Pe(he.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));Pe(he.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));Pe(he.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));Pe(he.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));Pe(he.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));Pe(he.GrowEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] GrowEgg"),true));Pe(he.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));Pe(he.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));Pe(he.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));Pe(he.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));Pe(he.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));Pe(he.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));Pe(he.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));Pe(he.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));Pe(he.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));Pe(he.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));Pe(he.ToggleLockItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleLockItem"),true));Pe(he.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));Pe(he.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));Pe(he.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));Pe(he.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));Pe(he.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));Pe(he.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));Pe(he.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));Pe(he.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));Pe(he.SwapPetFromStorage,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPetFromStorage"),true));Pe(he.PickupPet,(e,t)=>(t.debug&&console.log("[MW][Pets] PickupPet"),true));Pe(he.MovePetSlot,(e,t)=>(t.debug&&console.log("[MW][Pets] MovePetSlot"),true));Pe(he.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));Pe(he.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));Pe(he.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));Pe(he.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));Pe(he.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));Pe(he.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));Pe(he.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));Pe(he.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));Pe(he.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));Pe(he.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));Pe(he.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));Pe(he.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));Pe(he.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));Pe(he.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));Pe(he.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));Pe(he.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function OM(e={}){const t=e.pageWindow??fe,n=e.pollMs??500,r=!!e.debug,o=[];o.push(AS(t,{debug:r})),o.push(PT({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=l=>{if(i){try{i();}catch{}i=null;}l&&(i=FM(l,e.handlers,{debug:r,pageWindow:t}));};return a(vs(t).ws),o.push(Nm(l=>a(l.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>vs(t).ws,dispose:()=>{for(let l=o.length-1;l>=0;l--)try{o[l]();}catch{}if(i){try{i();}catch{}i=null;}}}}let Wa=null;function NM(e={}){return Wa||(Wa=OM(e),Wa)}const DM=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,$M=`
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
`;let Kf=false;function BM(){if(Kf)return;Kf=true;const e=document.createElement("style");e.textContent=$M,document.head.appendChild(e);}const Yf=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],qf=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function zM(){const e=document.querySelector(Yf.map(n=>`button[aria-label="${qf(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(Yf.reduce((r,o)=>r+t.querySelectorAll(`button[aria-label="${qf(o)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function jM(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(l=>l.dataset.alertBtn!=="true"&&(l.getAttribute("aria-label")||"")!=="Alerts"),r=n.length?n:t,o=r[r.length-1]||null,i=o?.parentElement,a=i&&i.parentElement===e&&i.tagName==="DIV"?i:null;return {refBtn:o,refWrapper:a}}function GM(e,t,n){const r=e.cloneNode(false);r.type="button",r.setAttribute("aria-label",t),r.title=t,r.dataset.alertBtn="true",r.style.pointerEvents="auto",r.style.position="relative",r.removeAttribute("id");const o=document.createElement("div");return o.innerHTML=n,o.dataset.alertIcon="true",o.style.pointerEvents="none",o.style.userSelect="none",o.style.width="76%",o.style.height="76%",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.margin="auto",r.appendChild(o),r}function UM(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function WM(e){BM();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:DM,n=e.ariaLabel||"Alerts";let r=null,o=null,i=null,a=null,l=false,u=null,f=null,p=null;function m(){if(l)return  false;l=true;let I=false;try{const T=zM();if(!T)return !1;u!==T&&(u=T);const{refBtn:N,refWrapper:z}=jM(T);if(!N)return !1;o=T.querySelector('div[data-alert-wrapper="true"]'),!o&&z&&(o=z.cloneNode(!1),o.dataset.alertWrapper="true",o.removeAttribute("id"),I=!0);const O=o?.querySelector('button[data-alert-btn="true"]')||null;r||(r=O),r||(r=GM(N,n,t),r.addEventListener("click",F=>{F.preventDefault(),F.stopPropagation();try{e.onClick?.();}catch{}}),i=UM(),r.appendChild(i),o?o.appendChild(r):r.parentElement!==T&&T.appendChild(r),I=!0),o&&o.parentElement!==T&&(T.appendChild(o),I=!0);const M=T;if(M&&M!==f){try{A.disconnect();}catch{}f=M,A.observe(f,{childList:!0,subtree:!0});}return I}finally{l=false;}}const v=document.getElementById("App")||document.body;let y=null,b=false;const A=new MutationObserver(()=>{b&&r&&document.contains(r)||(r&&!document.contains(r)&&(b=false,r=null,i=null,o=null),y===null&&(y=window.setTimeout(()=>{if(y=null,m()&&r&&document.contains(r)&&(b=true,o)){const T=o.parentElement;T&&T.lastElementChild!==o&&T.appendChild(o);}},100)));});return m()&&r&&document.contains(r)&&(b=true),A.observe(v,{childList:true,subtree:true}),a=()=>A.disconnect(),{get root(){return r},updateBadge(I){i&&(I>0?(i.textContent=String(I),i.style.display="flex"):i.style.display="none");},ring(){if(!r)return;const I=r.querySelector('[data-alert-icon="true"]');I&&(I.classList.add("alert-btn-ringing"),setTimeout(()=>{I?.classList.remove("alert-btn-ringing");},600));},startRinging(){r&&(p!==null&&clearInterval(p),this.ring(),p=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(p!==null&&(clearInterval(p),p=null),r){const I=r.querySelector('[data-alert-icon="true"]');I&&I.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{a?.();}catch{}try{o?.remove();}catch{}}}}const HM=`
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
`;async function VM(e,t){const n=w("div",{className:"alert-item-row"}),r=w("div",{className:"alert-item-sprite"});if(e.spriteId)try{const f=await Qe.toCanvas(e.spriteId,{scale:.35});f?r.appendChild(f):r.textContent="?";}catch{r.textContent="?";}else r.textContent="?";const o=w("div",{className:"alert-item-info"}),i=w("div",{className:"alert-item-name"},e.itemName),a=w("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);o.appendChild(i),o.appendChild(a);const l=w("div",{className:"alert-item-actions"}),u=w("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return u.addEventListener("click",f=>{f.stopPropagation(),t?.(e);}),l.appendChild(u),n.appendChild(r),n.appendChild(o),n.appendChild(l),n}function KM(){const e=w("div",{className:"alert-overlay-empty"}),t=w("div",{className:"alert-overlay-empty-icon"},"🔔"),n=w("div",{className:"alert-overlay-empty-text"},"No items available"),r=w("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(r),e}function Xf(e,t){const n=t.getBoundingClientRect(),r=340,o=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let i=n.bottom+o,a=window.innerWidth-n.right;const l=i+480>window.innerHeight,u=n.right-r<o;l?(e.style.bottom=`${window.innerHeight-n.top+o}px`,e.style.top="auto"):e.style.top=`${i}px`,e.style.right=`${a}px`,u&&(e.style.right="auto",e.style.left=`${o}px`);}function YM(e){const{items:t,anchorElement:n,onClose:r,onBuyAll:o}=e,i=w("div",{className:"alert-overlay"}),a=_M("theme",ci.theme),l=oo[a];let u="";l&&(u=`.alert-overlay {
    ${Object.entries(l).map(([T,N])=>`${T}: ${N};`).join(`
    `)}
  }

`);const f=document.createElement("style");f.textContent=u+HM,i.appendChild(f);const p=w("div",{className:"alert-overlay-header"}),m=w("div",{className:"alert-overlay-title"},"Available Items"),v=w("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");v.addEventListener("click",I=>{I.stopPropagation(),r?.();}),p.appendChild(m),p.appendChild(v);const y=w("div",{className:"alert-overlay-list"});i.appendChild(p),i.appendChild(y);const b=async I=>{if(y.replaceChildren(),I.length===0)y.appendChild(KM());else for(const T of I){const N=await VM(T,o);y.appendChild(N);}};b(t),Xf(i,n);const A=()=>{Xf(i,n);};window.addEventListener("resize",A);const P=I=>{const T=I.target;!i.contains(T)&&!n.contains(T)&&r?.();};return document.addEventListener("click",P,{capture:true}),{root:i,updateItems:b,destroy(){window.removeEventListener("resize",A),document.removeEventListener("click",P,{capture:true}),i.remove();}}}const qM={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},XM={seed:"seed",tool:null,egg:null,decor:null};function rv(e,t,n){try{const r=qM[t],o=Oe.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=XM[t],l=a?i[a]:i;return !l||typeof l!="object"?null:l[n]??null}catch{return null}}function QM(e,t){return rv(e,t,"spriteId")}function JM(e,t){return rv(e,t,"name")??e}function ZM(e,t){const n=$r.getTrackedItems(),r=new Set(n.filter(i=>i.shopType===e).map(i=>i.itemId));return r.size===0?[]:t.items.filter(i=>{const a=r.has(i.id),l=i.isAvailable;return a&&l}).map(i=>({shopType:e,itemId:i.id,itemName:JM(i.id,e),spriteId:QM(i.id,e),remaining:i.remaining,price:i.price}))}function di(){const t=Mo().get(),n=["seed","tool","egg","decor"],r=[];for(const o of n){const i=t.byType[o];if(i){const a=ZM(o,i);r.push(...a);}}return r}function eR(e){return Mo().subscribeStable(()=>{const r=di();e(r);})}function tR(){let e=null,t=null,n=null,r=false,o=[],i=[],a="",l=0,u=0,f=false,p=null,m=[],v=0,y=false;const b=()=>{try{return yt.CustomSounds.getNotificationConfig("shop")}catch{return null}},A=(q,Z)=>{try{const R=Re.getItemCustomSound("shop",q,Z);return R?{soundId:R.soundId,volume:R.volume,mode:R.mode}:null}catch{return null}},P=q=>`${q.soundId}:${q.volume}`,I=(q,Z,R,$)=>{Z.has(R)||(q.push({soundId:R,volume:$}),Z.add(R));},T=(q,Z)=>{const R=[],$=new Set;let Q=false;const re=[];for(const le of q){const ve=A(le.itemId,le.shopType);ve?ve.mode==="one-shot"&&re.push({soundId:ve.soundId,volume:ve.volume}):Z?.mode==="one-shot"&&(Q=true);}Q&&Z&&I(R,$,Z.soundId,Z.volume);for(const le of re)I(R,$,le.soundId,le.volume);return R},N=(q,Z)=>{const R=[],$=new Set;let Q=false;const re=[];for(const le of q){const ve=A(le.itemId,le.shopType);ve?ve.mode==="loop"&&re.push({soundId:ve.soundId,volume:ve.volume}):Z?.mode==="loop"&&(Q=true);}Q&&Z&&I(R,$,Z.soundId,Z.volume);for(const le of re)I(R,$,le.soundId,le.volume);return R},z=(q,Z,R,$=false)=>{if(!R())return;const Q=Re.getById(q.soundId);if(!Q){Z();return}$&&(p=Q.source),yt.playCustom(Q.source,{volume:q.volume/100}).then(re=>{if(!R())return;const le=re.audio,ve=()=>{R()&&Z();};le.addEventListener("ended",ve,{once:true});}).catch(()=>{R()&&Z();});},O=()=>{if(!f||i.length===0)return;const q=i[l];l=(l+1)%i.length;const Z=u,R=()=>f&&u===Z;z(q,()=>{R()&&O();},R,true);},M=()=>{f||i.length===0||(f=true,l>=i.length&&(l=0),O());},F=()=>{if(f){u+=1,f=false;try{const q=yt.getCustomHandle();(!p||q&&q.url===p)&&yt.CustomSounds.stop();}catch{}p=null;}},L=()=>{F(),i=[],a="",l=0,p=null;},C=()=>{if(m.length===0){y=false,M();return}y=true;const q=m.shift(),Z=v,R=()=>y&&v===Z;z(q,()=>{R()&&C();},R);},E=(q,Z)=>{const R=Z??b(),$=T(q,R);if($.length===0)return;const Q=new Set(m.map(re=>re.soundId));for(const re of $)Q.has(re.soundId)||(m.push(re),Q.add(re.soundId));y||(v+=1,F(),C());},B=(q,Z)=>{const R=Z??b(),$=N(q,R);if($.length===0){L();return}const Q=$.map(P).join("|"),re=Q!==a;i=$,a=Q,re&&(l=0,f&&F()),!y&&(f||M());},j=q=>{const Z=o.length>0,R=q.length>0;o=q,e?.updateBadge(q.length),R?Z||e?.startRinging():Z&&e?.stopRinging();},V=()=>{if(r||!e?.root)return;const q=di();t=YM({items:q,anchorElement:e.root,onClose:U,onBuyAll:Z=>{switch(Z.shopType){case "seed":Er.seed.buyAll(Z.itemId);break;case "egg":Er.egg.buyAll(Z.itemId);break;case "decor":Er.decor.buyAll(Z.itemId);break;case "tool":Er.tool.buyAll(Z.itemId);break}}}),document.body.appendChild(t.root),r=true;},U=()=>{!r||!t||(t.destroy(),t=null,r=false);},ce=()=>{r?U():V();},Y=q=>{if(j(q),r&&t&&t.updateItems(q),B(q),q.length>0){const Z=new CustomEvent("gemini:alert-available",{detail:{items:q}});window.dispatchEvent(Z);}},ie=()=>{const q=di(),Z=new Set(o.map(re=>`${re.shopType}:${re.itemId}`)),R=q.filter(re=>!Z.has(`${re.shopType}:${re.itemId}`)),$=R.length>0;j(q),r&&t&&t.updateItems(q);const Q=b();B(q,Q),$&&E(R,Q);};e=WM({onClick:ce,ariaLabel:"Alerts"}),n=eR(Y),window.addEventListener("gemini:tracked-items-changed",ie);const se=q=>{const Z=q,{shopType:R,items:$}=Z.detail;if(!$||$.length===0)return;const Q=$.map(re=>({itemId:re.itemId,shopType:R}));E(Q,b());};window.addEventListener("gemini:shop-restock-tracked",se);const ae=q=>{if(q.detail?.entityType!=="shop")return;const R=di();B(R,b());};window.addEventListener(ft.CUSTOM_SOUND_CHANGE,ae);const ne=(q=1,Z=10)=>{if(Mo().get().all.some(re=>re.items.length>0)||q>=Z){const re=di();j(re);const le=b();B(re,le),re.length>0&&E(re,le);}else setTimeout(()=>ne(q+1,Z),500);};return ne(),{destroy(){U(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",ie),window.removeEventListener("gemini:shop-restock-tracked",se),window.removeEventListener(ft.CUSTOM_SOUND_CHANGE,ae),e?.destroy(),e=null,m=[],v+=1,y=false,L();}}}function nR(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Nm(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),NM({debug:false}),()=>{t?.(),t=null;}}async function rR(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Lh(),await Sd({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function oR(e){e.logStep("Globals","Initializing global variables...");try{lg(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function iR(e){e.logStep("API","Exposing Gemini API...");try{DP(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function yc(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function aR(e){e.logStep("HUD","Loading HUD preferences..."),await yc();const t=EM();await yc();const n=await AM({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Ua("width",r),onOpenChange:r=>Ua("isOpen",r),themes:oo,initialTheme:t.theme,onThemeChange:r=>Ua("theme",r),buildSections:r=>KL({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Ua("activeTab",r)});return await yc(),e.logStep("HUD","HUD ready","success"),n}async function sR(e){e.setSubtitle("Activating Gemini modules...");let t=0,n=0;await cg(r=>{r.status==="start"?n++:r.status==="success"?(t++,e.logStep("Modules",`Loading modules... (${t}/${n})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${t}/${n}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${n}/${n})`,"success");}async function lR(e){try{Qe.isReady()||await Qe.init(),Oe.resolveSprites();}catch(t){console.warn("[Bootstrap] Sprite init failed",t);}}async function cR(e){e.logStep("Sections","Preloading UI sections...");try{await YL(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function dR(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:po.init.bind(po)},{name:"PetTeam",init:dt.init.bind(dt)},{name:"XPTracker",init:Xc.init.bind(Xc)},{name:"CropValueIndicator",init:rs.init.bind(rs)},{name:"CropSizeIndicator",init:as.init.bind(as)},{name:"ShopNotifier",init:$r.init.bind($r)},{name:"WeatherNotifier",init:ko.init.bind(ko)},{name:"PetHungerNotifier",init:Ri.init.bind(Ri)},{name:"AriesAPI",init:Ps.init.bind(Ps)},{name:"HarvestLocker",init:zt.init.bind(zt)},{name:"EggLocker",init:ar.init.bind(ar)},{name:"DecorLocker",init:sr.init.bind(sr)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const r=lh();r.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:rs.render,storageKey:At.CROP_VALUE_INDICATOR,defaultEnabled:!1}),r.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:as.render,storageKey:At.CROP_SIZE_INDICATOR,defaultEnabled:!1}),r.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(r){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",r);}}W0();(async function(){ey();const e=Wv({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=nR(e),await rR(e),oR(e),iR(e),await sR(e),await Promise.all([(async()=>{dR(e);})(),(async()=>{await lR(e);})()]),await cR(e),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await aR(e);PM({onClick:()=>n.setOpen(true)}),tR();})();

})();