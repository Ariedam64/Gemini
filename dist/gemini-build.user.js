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
  var py=Object.defineProperty;var fy=(e,t,n)=>t in e?py(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var ve=(e,t,n)=>fy(e,typeof t!="symbol"?t+"":t,n);function x(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const xa="https://i.imgur.com/k5WuC32.png",Ip="gemini-loader-style",_r="gemini-loader",mh=80;function hy(){if(document.getElementById(Ip))return;const e=document.createElement("style");e.id=Ip,e.textContent=`
    /* ===== Loader Variables ===== */
    #${_r} {
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
    #${_r} {
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

    #${_r}.gemini-loader--error .gemini-loader__actions {
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
    #${_r}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${_r}.gemini-loader--error .gemini-loader__spinner {
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
      #${_r} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function wa(e,t,n){const r=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>mh;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function my(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(xa);return}GM_xmlhttpRequest({method:"GET",url:xa,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(xa),r.readAsDataURL(n);},onerror:()=>e(xa)});})}function gy(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;hy();const n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=x("div",{className:"gemini-loader__logs"}),o=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=x("div",{className:"gemini-loader__spinner"},o);my().then(M=>{o.src=M;});const a=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},i,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),l=x("div",{id:_r},a);(document.body||document.documentElement).appendChild(l);const u=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>l.remove()}));a.appendChild(u),l.style.setProperty("--loader-blur",`${t}px`);const f=M=>{n.textContent=M;},p=new Map,m=(M,I)=>{M.className=`gemini-loader__log ${I}`;};return {log:(M,I="info")=>wa(r,M,I),logStep:(M,I,L="info")=>{const D=String(M||"").trim();if(!D){wa(r,I,L);return}const z=p.get(D);if(z){z.el.lastElementChild&&(z.el.lastElementChild.textContent=I),z.tone!==L&&(m(z.el,L),z.tone=L);return}const O=x("div",{className:`gemini-loader__log ${L}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:I}));for(p.set(D,{el:O,tone:L}),r.appendChild(O);r.childElementCount>mh;){const T=r.firstElementChild;if(!T)break;const R=Array.from(p.entries()).find(([,P])=>P.el===T)?.[0];R&&p.delete(R),T.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:f,succeed:(M,I=600)=>{M&&wa(r,M,"success"),l.classList.add("gemini-loader--closing"),setTimeout(()=>l.remove(),I);},fail:(M,I)=>{wa(r,M,"error"),f("Something went wrong. Check the console for details."),l.classList.add("gemini-loader--error"),console.error("[Gemini loader]",M,I);}}}const Tp=150,by=30;function vy(e,t,n){const r=x("div",{className:"lg-pill",id:"pill"}),o=e.map(C=>{const E=x("button",{className:"lg-tab"},C.label);return E.setAttribute("data-target",C.id),E}),i=x("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=new Map(e.map(C=>[C.id,true])),l=new Map(o.map((C,E)=>[e[E].id,C]));function u(C){const E=document.createElementNS("http://www.w3.org/2000/svg","svg");E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.setAttribute("stroke","currentColor"),E.setAttribute("stroke-width","2"),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round");const B=document.createElementNS("http://www.w3.org/2000/svg","polyline");return B.setAttribute("points",C==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),E.appendChild(B),E}const f=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});f.appendChild(u("left"));const p=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});p.appendChild(u("right"));const b=x("div",{className:"lg-tabs-wrapper"},f,i,p);let y=0,g=0,A=false;function M(){const C=i.scrollLeft>0,E=i.scrollLeft<i.scrollWidth-i.clientWidth-1;f.classList.toggle("disabled",!C),p.classList.toggle("disabled",!E);}f.addEventListener("click",()=>{i.scrollBy({left:-Tp,behavior:"smooth"}),setTimeout(M,300);}),p.addEventListener("click",()=>{i.scrollBy({left:Tp,behavior:"smooth"}),setTimeout(M,300);}),i.addEventListener("wheel",C=>{Math.abs(C.deltaY)>Math.abs(C.deltaX)&&(C.preventDefault(),i.scrollLeft+=C.deltaY,M());},{passive:false});let I=0;i.addEventListener("touchstart",C=>{const E=C.touches[0];y=E.clientX,g=E.clientY,A=false,I=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",C=>{if(A)return;const E=C.touches[0],B=E.clientX-y,j=E.clientY-g;if(Math.abs(j)>Math.abs(B)){A=true;return}Math.abs(B)>by&&(C.preventDefault(),i.scrollLeft=I-B);},{passive:false}),i.addEventListener("touchend",()=>{M();},{passive:true}),i.addEventListener("scroll",M,{passive:true});function L(C){const E=o.find(B=>B.dataset.target===C)||o[0];E&&requestAnimationFrame(()=>{const B=E.offsetLeft,j=E.offsetWidth;r.style.width=`${j}px`,r.style.transform=`translateX(${B}px)`;const V=i.scrollLeft,U=V,ce=V+i.clientWidth,Y=B-12,ie=B+j+12;Y<U?i.scrollTo({left:Y,behavior:"smooth"}):ie>ce&&i.scrollTo({left:ie-i.clientWidth,behavior:"smooth"}),setTimeout(M,300);});}function D(){for(const[C,E]of a)if(E)return C;return null}function z(C){const E=l.get(C);if(E)if(a.set(C,false),E.style.display="none",R===C){const B=D();B&&P(B);}else T();}function O(C){const E=l.get(C);E&&(a.set(C,true),E.style.display="",T());}function T(){L(R),M();}let R=t||(e[0]?.id??"");function P(C){a.get(C)&&(R=C,o.forEach(E=>E.classList.toggle("active",E.dataset.target===C)),L(C),n(C));}return o.forEach(C=>C.addEventListener("click",()=>P(C.dataset.target))),queueMicrotask(()=>{L(R),M();}),{root:b,activate:P,recalc:T,getActive:()=>R,showTab:O,hideTab:z,isTabVisible:C=>a.get(C)??false,getVisibleTabs:()=>[...a.entries()].filter(([C,E])=>E).map(([C])=>C)}}class mr{constructor(t){ve(this,"id");ve(this,"label");ve(this,"container",null);ve(this,"cleanupFunctions",[]);ve(this,"preloadedContent",null);ve(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=x("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class yy{constructor(t,n,r){ve(this,"sections");ve(this,"activeId",null);ve(this,"container");ve(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const lr="gemini:",xy={STATE:"hud:state",THEME:"hud:theme"},wy={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},Cy={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},ky={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},ft={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config",HARVEST_LOCKER:"feature:harvestLocker:config",EGG_LOCKER:"feature:eggLocker:config",DECOR_LOCKER:"feature:decorLocker:config"},Sy={},Ay={AUTO_RELOAD:"dev:auto-reload"},$t={HUD:xy,SECTION:wy,MODULE:Cy,GLOBAL:ky,FEATURE:ft,INJECT:Sy,DEV:Ay},ht={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change",HARVEST_LOCKER_LOCKS_UPDATED:"gemini:harvestLocker-locks-updated",EGG_LOCKER_LOCKS_UPDATED:"gemini:eggLocker-locks-updated",DECOR_LOCKER_LOCKS_UPDATED:"gemini:decorLocker-locks-updated"};function rt(e,t){try{const n=e.startsWith(lr)?e:lr+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function st(e,t){try{const n=e.startsWith(lr)?e:lr+e,r=e.startsWith(lr)?e.slice(lr.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Ey(e){try{const t=e.startsWith(lr)?e:lr+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function _y(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),l=o.slice(e.length);st(l,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(st("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const gh="gemini.sections";function bh(){const e=rt(gh,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Iy(e){st(gh,e);}async function Ty(e){return bh()[e]}function Py(e,t){const n=bh();Iy({...n,[e]:t});}function ko(e,t){return {...e,...t??{}}}async function My(e){const t=await Ty(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((f=>JSON.parse(JSON.stringify(f)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Py(e.path,n);}function i(){return n}function a(f){n=e.sanitize?e.sanitize(f):f,o();}function l(f){const m=Object.assign((b=>JSON.parse(JSON.stringify(b)))(n),{});typeof f=="function"?f(m):Object.assign(m,f),n=e.sanitize?e.sanitize(m):m,o();}function u(){o();}return {get:i,set:a,update:l,save:u}}async function Hr(e,t){const{path:n=e,...r}=t;return My({path:n,...r})}let Ly=0;const Ca=new Map;function ct(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:l=false,defaultExpanded:u=true,onExpandChange:f,mediaTop:p,title:m,subtitle:b,badge:y,actions:g,footer:A,divider:M=false,tone:I="neutral",stateKey:L}=e,D=x("div",{className:"card",id:n,tabIndex:a?0:void 0});D.classList.add(`card--${o}`,`card--p-${i}`),a&&D.classList.add("card--interactive"),I!=="neutral"&&D.classList.add(`card--tone-${I}`),r&&D.classList.add(...r.split(" ").filter(Boolean)),l&&D.classList.add("card--expandable");const z=l?L??n??(typeof m=="string"?`title:${m}`:null):null;let O=!l||u;z&&Ca.has(z)&&(O=!!Ca.get(z));let T=null,R=null,P=null,C=null,E=null;const B=n?`${n}-collapse`:`card-collapse-${++Ly}`,j=()=>{if(C!==null&&(cancelAnimationFrame(C),C=null),E){const se=E;E=null,se();}},V=(se,ae)=>{if(!P)return;j();const ne=P;if(ne.setAttribute("aria-hidden",String(!se)),!ae){ne.classList.remove("card-collapse--animating"),ne.style.display=se?"":"none",ne.style.height="",ne.style.opacity="";return}if(ne.classList.add("card-collapse--animating"),ne.style.display="",se){ne.style.height="auto";const $=ne.scrollHeight;if(!$){ne.classList.remove("card-collapse--animating"),ne.style.display="",ne.style.height="",ne.style.opacity="";return}ne.style.height="0px",ne.style.opacity="0",ne.offsetHeight,C=requestAnimationFrame(()=>{C=null,ne.style.height=`${$}px`,ne.style.opacity="1";});}else {const $=ne.scrollHeight;if(!$){ne.classList.remove("card-collapse--animating"),ne.style.display="none",ne.style.height="",ne.style.opacity="";return}ne.style.height=`${$}px`,ne.style.opacity="1",ne.offsetHeight,C=requestAnimationFrame(()=>{C=null,ne.style.height="0px",ne.style.opacity="0";});}const q=()=>{ne.classList.remove("card-collapse--animating"),ne.style.height="",se||(ne.style.display="none"),ne.style.opacity="";};let Z=null;const F=$=>{$.target===ne&&(Z!==null&&(clearTimeout(Z),Z=null),ne.removeEventListener("transitionend",F),ne.removeEventListener("transitioncancel",F),E=null,q());};E=()=>{Z!==null&&(clearTimeout(Z),Z=null),ne.removeEventListener("transitionend",F),ne.removeEventListener("transitioncancel",F),E=null,q();},ne.addEventListener("transitionend",F),ne.addEventListener("transitioncancel",F),Z=window.setTimeout(()=>{E?.();},420);};function U(se){const ae=document.createElementNS("http://www.w3.org/2000/svg","svg");return ae.setAttribute("viewBox","0 0 24 24"),ae.setAttribute("width","16"),ae.setAttribute("height","16"),ae.innerHTML=se==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',ae}function ce(se,ae=true,ne=true){O=se,D.classList.toggle("card--collapsed",!O),D.classList.toggle("card--expanded",O),T&&(T.dataset.expanded=String(O),T.setAttribute("aria-expanded",String(O))),R&&(R.setAttribute("aria-expanded",String(O)),R.classList.toggle("card-toggle--collapsed",!O),R.setAttribute("aria-label",O?"Replier le contenu":"Deplier le contenu"),R.replaceChildren(U(O?"up":"down"))),l?V(O,ne):P&&(P.style.display="",P.style.height="",P.style.opacity="",P.setAttribute("aria-hidden","false")),ae&&f&&f(O),z&&Ca.set(z,O);}if(p){const se=x("div",{className:"card-media"});se.append(p),D.appendChild(se);}const Y=!!(m||b||y||g&&g.length||l);if(Y){T=x("div",{className:"card-header"});const se=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(m){const q=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},m);y&&q.append(typeof y=="string"?x("span",{className:"badge"},y):y),se.appendChild(q);}if(b){const q=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},b);se.appendChild(q);}(se.childNodes.length||l)&&T.appendChild(se);const ae=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),ne=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(q=>ne.appendChild(q)),ne.childNodes.length&&ae.appendChild(ne),l&&(R=x("button",{className:"card-toggle",type:"button",ariaExpanded:String(O),ariaControls:B,ariaLabel:O?"Replier le contenu":"Deplier le contenu"}),R.textContent=O?"▲":"▼",R.addEventListener("click",q=>{q.preventDefault(),q.stopPropagation(),ce(!O);}),ae.appendChild(R),T.classList.add("card-header--expandable"),T.addEventListener("click",q=>{const Z=q.target;Z?.closest(".card-actions")||Z?.closest(".card-toggle")||ce(!O);})),ae.childNodes.length&&T.appendChild(ae),D.appendChild(T);}P=x("div",{className:"card-collapse",id:B,ariaHidden:l?String(!O):"false"}),D.appendChild(P),M&&Y&&P.appendChild(x("div",{className:"card-divider"}));const ie=x("div",{className:"card-body"});if(ie.append(...t),P.appendChild(ie),A){M&&P.appendChild(x("div",{className:"card-divider"}));const se=x("div",{className:"card-footer"});se.append(A),P.appendChild(se);}return R&&R.setAttribute("aria-controls",B),ce(O,false,false),z&&Ca.set(z,O),D}let ys=false;const xs=new Set,cn=e=>{const t=document.activeElement;for(const n of xs)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Ry(){ys||(ys=true,window.addEventListener("keydown",cn,true),window.addEventListener("keypress",cn,true),window.addEventListener("keyup",cn,true),document.addEventListener("keydown",cn,true),document.addEventListener("keypress",cn,true),document.addEventListener("keyup",cn,true));}function Fy(){ys&&(xs.size>0||(ys=false,window.removeEventListener("keydown",cn,true),window.removeEventListener("keypress",cn,true),window.removeEventListener("keyup",cn,true),document.removeEventListener("keydown",cn,true),document.removeEventListener("keypress",cn,true),document.removeEventListener("keyup",cn,true)));}let Tr=null;const Pc=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),Tr!==null&&(window.clearTimeout(Tr),Tr=null),document.removeEventListener("click",Pc,true);};function Oy(){document.addEventListener("click",Pc,true),Tr!==null&&window.clearTimeout(Tr),Tr=window.setTimeout(()=>{document.removeEventListener("click",Pc,true),Tr=null;},500);}function zr(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:l=true,onChange:u,onOpenChange:f}=e,p=x("div",{className:"select",id:t}),m=x("button",{className:"select-trigger",type:"button"}),b=x("span",{className:"select-value"},o),y=x("span",{className:"select-caret"},"▾");m.append(b,y);const g=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});p.classList.add(`select--${i}`);let A=false,M=n,I=null,L=!!a;function D(q){return q==null?o:(e.options||r).find(F=>F.value===q)?.label??o}function z(q){b.textContent=D(q),g.querySelectorAll(".select-option").forEach(Z=>{const F=Z.dataset.value,$=q!=null&&F===q;Z.classList.toggle("selected",$),Z.setAttribute("aria-selected",String($));});}function O(q){g.replaceChildren(),q.forEach(Z=>{const F=x("button",{className:"select-option"+(Z.disabled?" disabled":""),type:"button",role:"option","data-value":Z.value,"aria-selected":String(Z.value===M),tabindex:"-1"},Z.label);Z.value===M&&F.classList.add("selected"),Z.disabled||F.addEventListener("pointerdown",$=>{$.preventDefault(),$.stopPropagation(),$.pointerType&&$.pointerType!=="mouse"&&Oy(),B(Z.value,{notify:true}),C();},{capture:true}),g.appendChild(F);});}function T(){m.setAttribute("aria-expanded",String(A)),g.setAttribute("aria-hidden",String(!A));}function R(){const q=m.getBoundingClientRect();Object.assign(g.style,{minWidth:`${q.width}px`});}function P(){A||L||(A=true,p.classList.add("open"),T(),R(),document.addEventListener("mousedown",Y,true),document.addEventListener("scroll",ie,true),window.addEventListener("resize",se),g.focus({preventScroll:true}),l&&(Ry(),xs.add(p),I=()=>{xs.delete(p),Fy();}),f?.(true));}function C(){A&&(A=false,p.classList.remove("open"),T(),document.removeEventListener("mousedown",Y,true),document.removeEventListener("scroll",ie,true),window.removeEventListener("resize",se),m.focus({preventScroll:true}),I?.(),I=null,f?.(false));}function E(){A?C():P();}function B(q,Z={}){const F=M;M=q,z(M),Z.notify!==false&&F!==q&&u?.(q);}function j(){return M}function V(q){const Z=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!Z.length)return;const F=Z.findIndex(Q=>Q.classList.contains("active")),$=Z[(F+(q===1?1:Z.length-1))%Z.length];Z.forEach(Q=>Q.classList.remove("active")),$.classList.add("active"),$.focus({preventScroll:true}),$.scrollIntoView({block:"nearest"});}function U(q){(q.key===" "||q.key==="Enter"||q.key==="ArrowDown")&&(q.preventDefault(),P());}function ce(q){if(q.key==="Escape"){q.preventDefault(),C();return}if(q.key==="Enter"||q.key===" "){const Z=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");Z&&!Z.classList.contains("disabled")&&(q.preventDefault(),B(Z.dataset.value,{notify:true}),C());return}if(q.key==="ArrowDown"){q.preventDefault(),V(1);return}if(q.key==="ArrowUp"){q.preventDefault(),V(-1);return}}function Y(q){p.contains(q.target)||C();}function ie(){A&&R();}function se(){A&&R();}function ae(q){L=!!q,m.disabled=L,p.classList.toggle("disabled",L),L&&C();}function ne(q){e.options=q,O(q),q.some(Z=>Z.value===M)||(M=null,z(null));}return p.append(m,g),m.addEventListener("pointerdown",q=>{q.preventDefault(),q.stopPropagation(),E();},{capture:true}),m.addEventListener("keydown",U),g.addEventListener("keydown",ce),O(r),n!=null?(M=n,z(M)):z(null),T(),ae(L),{root:p,open:P,close:C,toggle:E,getValue:j,setValue:B,setOptions:ne,setDisabled:ae,destroy(){document.removeEventListener("mousedown",Y,true),document.removeEventListener("scroll",ie,true),window.removeEventListener("resize",se),I?.(),I=null;}}}function _d(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:l="text",required:u=false,disabled:f=false,tooltip:p,hint:m,icon:b,suffix:y,onClick:g}=e,A=x("div",{className:"lg-label-wrap",id:t}),M=x("label",{className:"lg-label",...r?{htmlFor:r}:{},...p?{title:p}:{}});if(b){const B=typeof b=="string"?x("span",{className:"lg-label-ico"},b):b;B.classList?.add?.("lg-label-ico"),M.appendChild(B);}const I=x("span",{className:"lg-label-text"},n);M.appendChild(I);const L=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&M.appendChild(L);let D=null;if(y!=null){D=typeof y=="string"?document.createTextNode(y):y;const B=x("span",{className:"lg-label-suffix"});B.appendChild(D),M.appendChild(B);}const z=m?x("div",{className:"lg-label-hint"},m):null;A.classList.add(`lg-label--${a}`),A.classList.add(`lg-label--${i}`),l==="title"&&A.classList.add("lg-label--title"),O(o),f&&A.classList.add("is-disabled"),A.appendChild(M),z&&A.appendChild(z),g&&M.addEventListener("click",g);function O(B){A.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),A.classList.add(`lg-label--${B}`);}function T(B){I.textContent=B;}function R(B){O(B);}function P(B){B&&!L.isConnected&&M.appendChild(L),!B&&L.isConnected&&L.remove(),B?M.setAttribute("aria-required","true"):M.removeAttribute("aria-required");}function C(B){A.classList.toggle("is-disabled",!!B);}function E(B){!B&&z&&z.isConnected?z.remove():B&&z?z.textContent=B:B&&!z&&A.appendChild(x("div",{className:"lg-label-hint"},B));}return {root:A,labelEl:M,hintEl:z,setText:T,setTone:R,setRequired:P,setDisabled:C,setHint:E}}function ai(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function ka(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=ai(e);return r&&n.appendChild(r),n}function Dy(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function vt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:l=false,tooltip:u,type:f="button",onClick:p,disabled:m=false,fullWidth:b=false}=e,y=x("button",{className:"btn",id:n});y.type=f,r==="primary"&&y.classList.add("primary"),r==="danger"&&y.classList.add("danger"),o==="sm"&&y.classList.add("btn--sm"),u&&(y.title=u),b&&(y.style.width="100%");const g=Dy(),A=i?ka(i,"left"):null,M=a?ka(a,"right"):null,I=document.createElement("span");I.className="btn-label";const L=ai(t);L&&I.appendChild(L),!L&&(A||M)&&y.classList.add("btn--icon"),y.appendChild(g),A&&y.appendChild(A),y.appendChild(I),M&&y.appendChild(M);const D=m||l;y.disabled=D,y.setAttribute("aria-busy",String(!!l)),g.style.display=l?"inline-block":"none",p&&y.addEventListener("click",p);const z=y;return z.setLoading=O=>{y.setAttribute("aria-busy",String(!!O)),g.style.display=O?"inline-block":"none",y.disabled=O||m;},z.setDisabled=O=>{y.disabled=O||y.getAttribute("aria-busy")==="true";},z.setLabel=O=>{I.replaceChildren();const T=ai(O);T&&I.appendChild(T),!T&&(A||M)?y.classList.add("btn--icon"):y.classList.remove("btn--icon");},z.setIconLeft=O=>{if(O==null){A?.remove();return}A?A.replaceChildren(ai(O)):y.insertBefore(ka(O,"left"),I);},z.setIconRight=O=>{if(O==null){M?.remove();return}M?M.replaceChildren(ai(O)):y.appendChild(ka(O,"right"));},z.setVariant=O=>{y.classList.remove("primary","danger"),O==="primary"&&y.classList.add("primary"),O==="danger"&&y.classList.add("danger");},z}function fr(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:l}=e,u=x("div",{className:"lg-switch-wrap"}),f=x("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),p=x("span",{className:"lg-switch-track"}),m=x("span",{className:"lg-switch-thumb"});f.append(p,m);let b=null;i&&a!=="none"&&(b=x("span",{className:"lg-switch-label"},i)),b&&a==="left"?u.append(b,f):b&&a==="right"?u.append(f,b):u.append(f);let y=!!n,g=!!r;function A(){f.classList.toggle("on",y),f.setAttribute("aria-checked",String(y)),f.disabled=g,f.setAttribute("aria-disabled",String(g));}function M(C=false){g||(y=!y,A(),C||l?.(y));}function I(C){C.preventDefault(),M();}function L(C){g||((C.key===" "||C.key==="Enter")&&(C.preventDefault(),M()),C.key==="ArrowLeft"&&(C.preventDefault(),z(false)),C.key==="ArrowRight"&&(C.preventDefault(),z(true)));}f.addEventListener("click",I),f.addEventListener("keydown",L);function D(){return y}function z(C,E=false){y=!!C,A(),E||l?.(y);}function O(C){g=!!C,A();}function T(C){if(!C){b&&(b.remove(),b=null);return}b?b.textContent=C:(b=x("span",{className:"lg-switch-label"},C),u.append(b));}function R(){f.focus();}function P(){f.removeEventListener("click",I),f.removeEventListener("keydown",L);}return A(),{root:u,button:f,isChecked:D,setChecked:z,setDisabled:O,setLabel:T,focus:R,destroy:P}}let vh=null,Id=null;function Ny(){return vh}function $y(e){vh=e,Id=null;}function yh(){return Id}function By(e){Id=e;}function zy(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function xh(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function wh(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function jy(){const e=Ny();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Gy(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Ch(){try{return window.top!==window.self}catch{return  true}}function Uy(){const e=Ch(),t=Gy(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Ks(){const e=yh();if(e)return e;const t=Uy(),n=jy(),r=xh(),o=wh(),i=Ch(),a=window.screen||{},l=window.visualViewport,u=Math.round(window.innerWidth||document.documentElement.clientWidth||0),f=Math.round(window.innerHeight||document.documentElement.clientHeight||0),p=Math.round(l?.width??u),m=Math.round(l?.height??f),b=Math.round(a.width||0),y=Math.round(a.height||0),g=Math.round(a.availWidth||b),A=Math.round(a.availHeight||y),M=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,I={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:u,viewportHeight:f,visualViewportWidth:p,visualViewportHeight:m,screenWidth:b,screenHeight:y,availScreenWidth:g,availScreenHeight:A,dpr:M,orientation:zy()};return By(I),I}function Wy(){return Ks().surface==="discord"}function Hy(){return Ks().platform==="mobile"}function Vy(){Ks();}function Ky(){return yh()!==null}const Rt={init:Vy,isReady:Ky,detect:Ks,isDiscord:Wy,isMobile:Hy,detectOS:xh,detectBrowser:wh,setPlatformOverride:$y};let ws=false;const si=new Set;function Yy(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const dn=e=>{const t=Yy();if(t){for(const n of si)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function qy(){ws||(ws=true,window.addEventListener("keydown",dn,true),window.addEventListener("keypress",dn,true),window.addEventListener("keyup",dn,true),document.addEventListener("keydown",dn,true),document.addEventListener("keypress",dn,true),document.addEventListener("keyup",dn,true));}function Xy(){ws&&(ws=false,window.removeEventListener("keydown",dn,true),window.removeEventListener("keypress",dn,true),window.removeEventListener("keyup",dn,true),document.removeEventListener("keydown",dn,true),document.removeEventListener("keypress",dn,true),document.removeEventListener("keyup",dn,true));}function Qy(e){return si.size===0&&qy(),si.add(e),()=>{si.delete(e),si.size===0&&Xy();}}function Jy(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function Zy(e,t){return t?e.replace(t,""):e}function e0(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function Ys(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:l=false,maxLength:u,blockGameKeys:f=true,debounceMs:p=0,onChange:m,onEnter:b,label:y}=e,g=x("div",{className:"lg-input-wrap"}),A=x("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(A.maxLength=u),r&&(A.value=r),y){const B=x("div",{className:"lg-input-label"},y);g.appendChild(B);}g.appendChild(A);const M=Jy(o,i,a,l),I=()=>{const B=A.selectionStart??A.value.length,j=A.value.length,V=Zy(A.value,M);if(V!==A.value){A.value=V;const U=j-V.length,ce=Math.max(0,B-U);A.setSelectionRange(ce,ce);}},L=e0(()=>m?.(A.value),p);A.addEventListener("input",()=>{I(),L();}),A.addEventListener("paste",()=>queueMicrotask(()=>{I(),L();})),A.addEventListener("keydown",B=>{B.key==="Enter"&&b?.(A.value);});const D=f?Qy(A):()=>{};function z(){return A.value}function O(B){A.value=B??"",I(),L();}function T(){A.focus();}function R(){A.blur();}function P(B){A.disabled=!!B;}function C(){return document.activeElement===A}function E(){D();}return {root:g,input:A,getValue:z,setValue:O,focus:T,blur:R,setDisabled:P,isFocused:C,destroy:E}}function Tt(e,t,n){return Math.min(n,Math.max(t,e))}function gi({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let l=0,u=0,f=0;switch(Math.floor(o)){case 0:l=i,u=a;break;case 1:l=a,u=i;break;case 2:u=i,f=a;break;case 3:u=a,f=i;break;case 4:l=a,f=i;break;default:l=i,f=a;break}const m=n-i,b=Math.round((l+m)*255),y=Math.round((u+m)*255),g=Math.round((f+m)*255);return {r:Tt(b,0,255),g:Tt(y,0,255),b:Tt(g,0,255),a:Tt(r,0,1)}}function kh({r:e,g:t,b:n,a:r}){const o=Tt(e,0,255)/255,i=Tt(t,0,255)/255,a=Tt(n,0,255)/255,l=Math.max(o,i,a),u=Math.min(o,i,a),f=l-u;let p=0;f!==0&&(l===o?p=60*((i-a)/f%6):l===i?p=60*((a-o)/f+2):p=60*((o-i)/f+4)),p<0&&(p+=360);const m=l===0?0:f/l;return {h:p,s:m,v:l,a:Tt(r,0,1)}}function Td({r:e,g:t,b:n}){const r=o=>Tt(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function t0({r:e,g:t,b:n,a:r}){const o=Tt(Math.round(r*255),0,255);return `${Td({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function li({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function ao(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function Mc(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return ao(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),l=r[3]!=null?Number(r[3]):1;return [o,i,a,l].some(u=>Number.isNaN(u))?null:{r:o,g:i,b:a,a:l}}return null}function n0(e,t){const n=Mc(e)??ao(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Tt(t,0,1)),kh(n)}function r0(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function o0(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Sr(e){const t=gi(e),n=gi({...e,a:1});return {hsva:{...e},hex:Td(n),hexa:t0(t),rgba:li(t),alpha:e.a}}function i0(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:l,onChange:u}=e,p=a?a():Rt.detect().platform==="mobile";let m=n0(r,o);const b=ct({id:t,className:"color-picker",title:n,padding:p?"md":"lg",variant:"soft",expandable:!p,defaultExpanded:!p&&i});b.classList.add(p?"color-picker--mobile":"color-picker--desktop");const y=b.querySelector(".card-header");y&&y.classList.add("color-picker__header");const g=y?.querySelector(".card-title"),A=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(A):y?y.prepend(A):b.prepend(A);const M=b.querySelector(".card-toggle");!p&&M&&A.addEventListener("click",()=>{b.classList.contains("card--collapsed")&&M.click();});const I=b.querySelector(".card-collapse");let L=null,D=null,z=null,O=null,T=null,R=null,P=null,C=null,E=null,B="hex";function j(ie){const se=Sr(m);ie==="input"?l?.(se):u?.(se);}function V(){const ie=Sr(m);if(A.style.setProperty("--cp-preview-color",ie.rgba),A.setAttribute("aria-label",`${n}: ${ie.hexa}`),!p&&L&&D&&z&&O&&T&&R&&P){const se=gi({...m,s:1,v:1,a:1}),ae=li(se);L.style.setProperty("--cp-palette-hue",ae),D.style.left=`${m.s*100}%`,D.style.top=`${(1-m.v)*100}%`,z.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${li({...se,a:1})} 0%, ${li({...se,a:0})} 100%)`),O.style.top=`${(1-m.a)*100}%`,T.style.setProperty("--cp-hue-color",li(gi({...m,v:1,s:1,a:1}))),R.style.left=`${m.h/360*100}%`;const ne=m.a===1?ie.hex:ie.hexa,q=ie.rgba,Z=B==="hex"?ne:q;P!==document.activeElement&&(P.value=Z),P.setAttribute("aria-label",`${B.toUpperCase()} code for ${n}`),P.placeholder=B==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",B==="hex"?P.maxLength=9:P.removeAttribute("maxLength"),P.dataset.mode=B,C&&(C.textContent=B.toUpperCase(),C.setAttribute("aria-label",B==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),C.setAttribute("aria-pressed",B==="rgba"?"true":"false"),C.classList.toggle("is-alt",B==="rgba"));}E&&E!==document.activeElement&&(E.value=ie.hex);}function U(ie,se=null){m={h:(ie.h%360+360)%360,s:Tt(ie.s,0,1),v:Tt(ie.v,0,1),a:Tt(ie.a,0,1)},V(),se&&j(se);}function ce(ie,se=null){U(kh(ie),se);}function Y(ie,se,ae){ie.addEventListener("pointerdown",ne=>{ne.preventDefault();const q=ne.pointerId,Z=$=>{$.pointerId===q&&se($);},F=$=>{$.pointerId===q&&(document.removeEventListener("pointermove",Z),document.removeEventListener("pointerup",F),document.removeEventListener("pointercancel",F),ae?.($));};se(ne),document.addEventListener("pointermove",Z),document.addEventListener("pointerup",F),document.addEventListener("pointercancel",F);});}if(!p&&I){const ie=I.querySelector(".card-body");if(ie){ie.classList.add("color-picker__body"),D=x("div",{className:"color-picker__palette-cursor"}),L=x("div",{className:"color-picker__palette"},D),O=x("div",{className:"color-picker__alpha-thumb"}),z=x("div",{className:"color-picker__alpha"},O),R=x("div",{className:"color-picker__hue-thumb"}),T=x("div",{className:"color-picker__hue"},R);const se=x("div",{className:"color-picker__main"},L,z),ae=x("div",{className:"color-picker__hue-row"},T),ne=Ys({blockGameKeys:true});P=ne.input,P.classList.add("color-picker__hex-input"),P.value="",P.maxLength=9,P.spellcheck=false,P.inputMode="text",P.setAttribute("aria-label",`Hex code for ${n}`),C=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),ne.root.classList.add("color-picker__hex-wrap");const q=x("div",{className:"color-picker__hex-row"},C,ne.root);ie.replaceChildren(se,ae,q),Y(L,F=>{if(!L||!D)return;const $=L.getBoundingClientRect(),Q=Tt((F.clientX-$.left)/$.width,0,1),re=Tt((F.clientY-$.top)/$.height,0,1);U({...m,s:Q,v:1-re},"input");},()=>j("change")),Y(z,F=>{if(!z)return;const $=z.getBoundingClientRect(),Q=Tt((F.clientY-$.top)/$.height,0,1);U({...m,a:1-Q},"input");},()=>j("change")),Y(T,F=>{if(!T)return;const $=T.getBoundingClientRect(),Q=Tt((F.clientX-$.left)/$.width,0,1);U({...m,h:Q*360},"input");},()=>j("change")),C.addEventListener("click",()=>{if(B=B==="hex"?"rgba":"hex",P){const F=Sr(m);P.value=B==="hex"?m.a===1?F.hex:F.hexa:F.rgba;}V(),P?.focus(),P?.select();}),P.addEventListener("input",()=>{if(B==="hex"){const F=r0(P.value);if(F!==P.value){const $=P.selectionStart??F.length;P.value=F,P.setSelectionRange($,$);}}});const Z=()=>{const F=P.value;if(B==="hex"){const $=ao(F);if(!$){P.value=m.a===1?Sr(m).hex:Sr(m).hexa;return}const Q=F.startsWith("#")?F.slice(1):F,re=Q.length===4||Q.length===8;$.a=re?$.a:m.a,ce($,"change");}else {const $=o0(F),Q=Mc($);if(!Q){P.value=Sr(m).rgba;return}ce(Q,"change");}};P.addEventListener("change",Z),P.addEventListener("blur",Z),P.addEventListener("keydown",F=>{F.key==="Enter"&&(Z(),P.blur());});}}return p&&(I&&I.remove(),E=x("input",{className:"color-picker__native",type:"color",value:Td(gi({...m,a:1}))}),A.addEventListener("click",()=>E.click()),E.addEventListener("input",()=>{const ie=ao(E.value);ie&&(ie.a=m.a,ce(ie,"input"),j("change"));}),b.appendChild(E)),V(),{root:b,isMobile:p,getValue:()=>Sr(m),setValue:(ie,se)=>{const ae=Mc(ie)??ao(ie)??ao("#FFFFFF");ae&&(typeof se=="number"&&(ae.a=se),ce(ae,null));}}}const a0=window;function s0(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:a0}const l0=s0(),fe=l0;function c0(e){try{return !!e.isSecureContext}catch{return  false}}function Pd(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Sh(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function d0(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function u0(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function p0(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function f0(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!c0(fe))return {ok:false,method:"clipboard-write"};if(!await d0())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function h0(e,t){try{const n=t||Pd(),r=u0(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function m0(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=p0(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=Sh()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function g0(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await f0(n);if(r.ok)return r;const o=t.injectionRoot||Pd(t.valueNode||void 0),i=h0(n,o);if(i.ok)return i;const a=m0(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Rt.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function b0(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=Pd(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const l=e.getBoundingClientRect();i.style.left=`${l.right-8}px`,i.style.top=`${l.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await g0(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(Sh()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const po={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function v0(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,l=false;function u(p){const m=n[p]||n[i]||{};t.setAttribute("data-theme",p),l&&t.classList.add("theme-anim");for(const[b,y]of Object.entries(m))t.style.setProperty(b,y);l?(a!==null&&clearTimeout(a),a=fe.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):l=true,i=p,o?.(p);}function f(){return i}return u(r),{applyTheme:u,getCurrentTheme:f}}const Lc={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,system:false}}};async function y0(){const e=await Hr("tab-settings",{version:2,defaults:Lc,sanitize:o=>({ui:{expandedCards:ko(Lc.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:ko(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}class x0{constructor(){ve(this,"injections",new Map);ve(this,"state",{});ve(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(o){console.error(`[InjectionRegistry] Failed to init ${t}:`,o);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const r=this.injections.get(t);if(!r){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?r.injection.init():r.injection.destroy(),console.log(`[InjectionRegistry] ${r.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const r=rt(n.storageKey,n.defaultEnabled??false);this.state[t]=r;}saveState(t){const n=this.injections.get(t);n&&st(n.storageKey,this.state[t]);}}let Vl=null;function Ah(){return Vl||(Vl=new x0),Vl}function Eh(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function w0(){return Object.keys(po).map(e=>({value:e,label:Eh(e)}))}const C0=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--accent-3"];function k0(e){return Eh(e.replace(/^--/,""))}function S0(e){return e.alpha<1?e.rgba:e.hex}const Ln={pets:{enabled:true},autoFavorite:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class A0 extends mr{constructor(n){super({id:"tab-settings",label:"Settings"});ve(this,"featureConfig",Ln);this.deps=n;}async build(n){const r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await y0();}catch{o={get:()=>Lc,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get(),a=rt(ft.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(a);const l=Object.keys(po),u=this.deps.getCurrentTheme?.()??this.deps.initialTheme,f=l.includes(u)?u:l[0]??"dark";let p=f;const m=_d({text:"Theme",tone:"muted",size:"lg"}),b=zr({options:w0(),value:f,onChange:L=>{p=L,this.deps.applyTheme(L),this.renderThemePickers(L,y,p);}}),y=x("div",{className:"settings-theme-grid"}),g=ct({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:L=>o.setCardExpanded("style",L)},x("div",{className:"kv settings-theme-row"},m.root,b.root),y);this.renderThemePickers(f,y,p);const A=this.createHUDSectionsCard({defaultExpanded:!!i.ui.expandedCards.hudSections,onExpandChange:L=>o.setCardExpanded("hudSections",L)}),M=this.createEnhancementsCard({defaultExpanded:!!i.ui.expandedCards.enhancements,onExpandChange:L=>o.setCardExpanded("enhancements",L)}),I=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:L=>o.setCardExpanded("system",L)});r.appendChild(g),r.appendChild(A),r.appendChild(M),r.appendChild(I);}mergeFeatureConfig(n){return {pets:{...Ln.pets,...n.pets},autoFavorite:{...Ln.autoFavorite,...n.autoFavorite},locker:{...Ln.locker,...n.locker},alerts:{...Ln.alerts,...n.alerts},avatar:{...Ln.avatar,...n.avatar},room:{...Ln.room,...n.room},cropSizeIndicator:{...Ln.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Ln.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Ln.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){st(ft.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const r=(o,i,a,l,u=false,f=false)=>{const p=x("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${u?"0":"12px"} 0 ${f?"0":"12px"} 0;
          ${f?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${i?"1":"0.5"};
        `}),m=x("div"),b=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},o),y=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},l);m.append(b,y);const g=fr({checked:i,onChange:A=>{p.style.opacity=A?"1":"0.5",a(A);}});return p.append(m,g.root),p};return ct({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},r("Auto-Favorite",this.featureConfig.autoFavorite.enabled,o=>{this.featureConfig.autoFavorite.enabled=o,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),r("Pets",this.featureConfig.pets.enabled,o=>{this.featureConfig.pets.enabled=o,this.saveFeatureConfig();},"Pet management and team tracking"),r("Locker",this.featureConfig.locker.enabled,o=>{this.featureConfig.locker.enabled=o,this.saveFeatureConfig();},"Configure crop, egg, and decor blockers"),r("Alerts",this.featureConfig.alerts.enabled,o=>{this.featureConfig.alerts.enabled=o,this.saveFeatureConfig();},"Event notifications and alerts"),r("Avatar",this.featureConfig.avatar.enabled,o=>{this.featureConfig.avatar.enabled=o,this.saveFeatureConfig();},"Avatar customization and loadouts"),r("Room",this.featureConfig.room.enabled,o=>{this.featureConfig.room.enabled=o,this.saveFeatureConfig();},"Public room browser",false,true)))}createSectionRow(n,r,o,i,a=false,l=false){const u=x("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${a?"0":"12px"} 0 ${l?"0":"12px"} 0;
        ${l?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${r?"1":"0.5"};
      `}),f=x("div"),p=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),m=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},i);f.append(p,m);const b=fr({checked:r,onChange:y=>{u.style.opacity=y?"1":"0.5",o(y);}});return u.append(f,b.root),u}createEnhancementsCard(n){const r=Ah(),i=[...r.getAll()].sort((l,u)=>l.name.localeCompare(u.name)),a=i.map((l,u)=>{const f=u===0,p=u===i.length-1,m=r.isEnabled(l.id);return this.createSectionRow(l.name,m,b=>{r.setEnabled(l.id,b),this.saveFeatureConfig();},l.description,f,p)});return ct({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},...a))}renderThemePickers(n,r,o){const i=po[n];if(r.replaceChildren(),!!i)for(const a of C0){const l=i[a];if(l==null)continue;const u=i0({label:k0(a),value:l,defaultExpanded:false,onInput:f=>this.updateThemeVar(n,a,f,o),onChange:f=>this.updateThemeVar(n,a,f,o)});r.appendChild(u.root);}}updateThemeVar(n,r,o,i){const a=po[n];a&&(a[r]=S0(o),i===n&&this.deps.applyTheme(n));}createEnvCard(n){const r=n?.defaultExpanded??false,o=n?.onExpandChange,i=(I,L)=>{const D=x("div",{className:"kv kv--inline-mobile"}),z=x("label",{},I),O=x("div",{className:"ro"});return typeof L=="string"?O.textContent=L:O.append(L),D.append(z,O),D},a=x("code",{},"—"),l=x("span",{},"—"),u=x("span",{},"—"),f=x("span",{},"—"),p=x("span",{},"—"),m=x("span",{},"—"),b=()=>{const I=Rt.detect();u.textContent=I.surface??"Unknown",f.textContent=I.platform??"Unknown",p.textContent=I.browser??"Unknown",m.textContent=I.os??"Unknown",a.textContent=I.host??"Unknown",l.textContent=I.isInIframe?"Yes":"No";},y=vt({label:"Copy JSON",variant:"primary",size:"sm"});b0(y,()=>{const I=Rt.detect();return JSON.stringify(I,null,2)});const g=x("div",{style:"width:100%;display:flex;justify-content:center;"},y),A=ct({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:r,onExpandChange:o},i("Surface",u),i("Platform",f),i("Browser",p),i("OS",m),i("Host",a),i("Iframe",l)),M=()=>{document.hidden||b();};return document.addEventListener("visibilitychange",M),b(),this.addCleanup(()=>document.removeEventListener("visibilitychange",M)),A}}function qs(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:l=true,respectReducedMotion:u=true,compact:f=false,maxHeight:p,selectable:m=false,selectionType:b="switch",selectOnRowClick:y=false,initialSelection:g=[],hideHeaderCheckbox:A=false,getRowId:M=(d,h)=>String(h),onSortChange:I,onSelectionChange:L,onRowClick:D}=e;let z=n.slice(),O=r.slice(),T=r.slice(),R=null,P=null,C=1;const E=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,B=!!l&&!(u&&E),j=x("div",{className:"lg-table-wrap",id:t});if(p!=null){const d=typeof p=="number"?`${p}px`:p;j.style.setProperty("--tbl-max-h",d);}const V=x("div",{className:"lg-table"}),U=x("div",{className:"lg-thead"}),ce=x("div",{className:"lg-tbody"}),Y=x("div",{className:"lg-tfoot"});i&&j.classList.add("sticky"),a&&j.classList.add("zebra"),f&&j.classList.add("compact"),m&&j.classList.add("selectable");const ie=b==="switch"?"52px":"36px";j.style.setProperty("--check-w",ie);function se(d){return d==="center"?"center":d==="right"?"flex-end":"flex-start"}function ae(){const d=z.map(S=>{const G=(S.width||"1fr").trim();return /\bfr$/.test(G)?`minmax(0, ${G})`:G}),h=(m?[ie,...d]:d).join(" ");j.style.setProperty("--lg-cols",h);}ae();function ne(){return o?Math.max(1,Math.ceil(O.length/o)):1}function q(){if(!o)return O;const d=(C-1)*o;return O.slice(d,d+o)}function Z(){if(!R||!P)return;const d=z.find(G=>String(G.key)===R),h=P==="asc"?1:-1,S=d?.sortFn?(G,W)=>h*d.sortFn(G,W):(G,W)=>{const J=G[R],de=W[R];return J==null&&de==null?0:J==null?-1*h:de==null?1*h:typeof J=="number"&&typeof de=="number"?h*(J-de):h*String(J).localeCompare(String(de),void 0,{numeric:true,sensitivity:"base"})};O.sort(S);}const F=new Set(g);function $(){return Array.from(F)}const Q=new Map;function re(d){F.clear(),d.forEach(h=>F.add(h)),_e(),Q.forEach((h,S)=>{h.setChecked(F.has(S),true);}),De(),L?.($());}function le(){F.clear(),_e(),Q.forEach(d=>d.setChecked(false,true)),De(),L?.($());}let ye=null;function _e(){if(!ye)return;const d=q();if(!d.length){ye.indeterminate=false,ye.checked=false;return}const h=d.map((G,W)=>M(G,(C-1)*(o||0)+W)),S=h.reduce((G,W)=>G+(F.has(W)?1:0),0);ye.checked=S===h.length,ye.indeterminate=S>0&&S<h.length;}let Be=false;function xt(){Be=false;const d=ce.offsetWidth-ce.clientWidth;U.style.paddingRight=d>0?`${d}px`:"0px";}function Bt(){Be||(Be=true,requestAnimationFrame(xt));}const dt=new ResizeObserver(()=>Bt()),Et=()=>Bt();function Wt(){U.replaceChildren();const d=x("div",{className:"lg-tr lg-tr-head"});if(m){const h=x("div",{className:"lg-th lg-th-check"});A||(ye=x("input",{type:"checkbox"}),ye.addEventListener("change",()=>{const S=q(),G=ye.checked;S.forEach((W,J)=>{const de=M(W,(C-1)*(o||0)+J);G?F.add(de):F.delete(de);}),L?.($()),De();}),h.appendChild(ye)),d.appendChild(h);}z.forEach(h=>{const S=x("button",{className:"lg-th",type:"button",title:h.title||h.header});S.textContent=h.header,h.align&&S.style.setProperty("--col-justify",se(h.align)),h.sortable&&S.classList.add("sortable"),R===String(h.key)&&P?S.setAttribute("data-sort",P):S.removeAttribute("data-sort"),h.sortable&&S.addEventListener("click",()=>{const G=String(h.key);R!==G?(R=G,P="asc"):(P=P==="asc"?"desc":P==="desc"?null:"asc",P||(R=null,O=T.slice())),I?.(R,P),R&&P&&Z(),kt();}),d.appendChild(S);}),U.appendChild(d);try{dt.disconnect();}catch{}dt.observe(ce),Bt();}function Mt(d){return Array.from(d.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Ht(d){return d.querySelector(".lg-td, .lg-td-check")}function tt(d){const h=Ht(d);return h?h.getBoundingClientRect():null}function De(){const d=q(),h=new Map;Array.from(ce.children).forEach(J=>{const de=J,xe=de.getAttribute("data-id");if(!xe)return;const ge=tt(de);ge&&h.set(xe,ge);});const S=new Map;Array.from(ce.children).forEach(J=>{const de=J,xe=de.getAttribute("data-id");xe&&S.set(xe,de);});const G=[];for(let J=0;J<d.length;J++){const de=d[J],xe=(o?(C-1)*o:0)+J,ge=M(de,xe);G.push(ge);let we=S.get(ge);we||(we=mn(de,xe),B&&Mt(we).forEach(at=>{at.style.transform="translateY(6px)",at.style.opacity="0";})),ce.appendChild(we);}const W=[];if(S.forEach((J,de)=>{G.includes(de)||W.push(J);}),!B){W.forEach(J=>J.remove()),_e(),Bt();return}G.forEach(J=>{const de=ce.querySelector(`.lg-tr-body[data-id="${J}"]`);if(!de)return;const xe=tt(de),ge=h.get(J),we=Mt(de);if(ge&&xe){const Ke=ge.left-xe.left,_t=ge.top-xe.top;we.forEach(gt=>{gt.style.transition="none",gt.style.transform=`translate(${Ke}px, ${_t}px)`,gt.style.opacity="1";}),Ht(de)?.getBoundingClientRect(),we.forEach(gt=>{gt.style.willChange="transform, opacity",gt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{we.forEach(gt=>{gt.style.transform="translate(0,0)";});});}else we.forEach(Ke=>{Ke.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{we.forEach(Ke=>{Ke.style.transform="translate(0,0)",Ke.style.opacity="1";});});const Je=Ke=>{(Ke.propertyName==="transform"||Ke.propertyName==="opacity")&&(we.forEach(_t=>{_t.style.willChange="",_t.style.transition="",_t.style.transform="",_t.style.opacity="";}),Ke.currentTarget.removeEventListener("transitionend",Je));},at=we[0];at&&at.addEventListener("transitionend",Je);}),W.forEach(J=>{const de=Mt(J);de.forEach(we=>{we.style.willChange="transform, opacity",we.style.transition="transform .18s ease, opacity .18s ease",we.style.opacity="0",we.style.transform="translateY(-6px)";});const xe=we=>{we.propertyName==="opacity"&&(we.currentTarget.removeEventListener("transitionend",xe),J.remove());},ge=de[0];ge?ge.addEventListener("transitionend",xe):J.remove();}),_e(),Bt();}function mn(d,h){const S=M(d,h),G=x("div",{className:"lg-tr lg-tr-body","data-id":S});if(m){const W=x("div",{className:"lg-td lg-td-check"});if(b==="switch"){const J=fr({size:"sm",checked:F.has(S),onChange:de=>{de?F.add(S):F.delete(S),_e(),L?.($());}});Q.set(S,J),W.appendChild(J.root);}else {const J=x("input",{type:"checkbox",className:"lg-row-check"});J.checked=F.has(S),J.addEventListener("change",de=>{de.stopPropagation(),J.checked?F.add(S):F.delete(S),_e(),L?.($());}),J.addEventListener("click",de=>de.stopPropagation()),W.appendChild(J);}G.appendChild(W);}return z.forEach(W=>{const J=x("div",{className:"lg-td"});W.align&&J.style.setProperty("--col-justify",se(W.align));let de=W.render?W.render(d,h):String(d[W.key]??"");typeof de=="string"?J.textContent=de:J.appendChild(de),G.appendChild(J);}),(D||m&&y)&&(G.classList.add("clickable"),G.addEventListener("click",W=>{if(!W.target.closest(".lg-td-check")){if(m&&y){const J=!F.has(S);if(J?F.add(S):F.delete(S),_e(),b==="switch"){const de=Q.get(S);de&&de.setChecked(J,true);}else {const de=G.querySelector(".lg-row-check");de&&(de.checked=J);}L?.($());}D?.(d,h,W);}})),G}function gn(){if(Y.replaceChildren(),!o)return;const d=ne(),h=x("div",{className:"lg-pager"}),S=x("button",{className:"btn",type:"button"},"←"),G=x("button",{className:"btn",type:"button"},"→"),W=x("span",{className:"lg-pager-info"},`${C} / ${d}`);S.disabled=C<=1,G.disabled=C>=d,S.addEventListener("click",()=>pt(C-1)),G.addEventListener("click",()=>pt(C+1)),h.append(S,W,G),Y.appendChild(h);}function pt(d){const h=ne();C=Math.min(Math.max(1,d),h),De(),gn();}function kt(){ae(),Wt(),De(),gn();}function Vt(d){T=d.slice(),O=d.slice(),R&&P&&Z(),pt(1);}function En(d){z=d.slice(),kt();}function nn(d,h="asc"){R=d,P=d?h:null,R&&P?Z():O=T.slice(),kt();}function k(){try{dt.disconnect();}catch{}window.removeEventListener("resize",Et);}return V.append(U,ce,Y),j.appendChild(V),window.addEventListener("resize",Et),kt(),{root:j,setData:Vt,setColumns:En,sortBy:nn,getSelection:$,setSelection:re,clearSelection:le,setPage:pt,getState:()=>({page:C,pageCount:ne(),sortKey:R,sortDir:P}),destroy:k}}let Cs=false;const ci=new Set;function E0(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const un=e=>{const t=E0();if(t){for(const n of ci)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function _0(){Cs||(Cs=true,window.addEventListener("keydown",un,true),window.addEventListener("keypress",un,true),window.addEventListener("keyup",un,true),document.addEventListener("keydown",un,true),document.addEventListener("keypress",un,true),document.addEventListener("keyup",un,true));}function I0(){Cs&&(Cs=false,window.removeEventListener("keydown",un,true),window.removeEventListener("keypress",un,true),window.removeEventListener("keyup",un,true),document.removeEventListener("keydown",un,true),document.removeEventListener("keypress",un,true),document.removeEventListener("keyup",un,true));}function T0(e){return ci.size===0&&_0(),ci.add(e),()=>{ci.delete(e),ci.size===0&&I0();}}function Sa(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function P0(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Wi(e={}){const{id:t,placeholder:n="Search...",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:l,onSearch:u,autoSearch:f=false,debounceMs:p=0,focusKey:m="/",iconLeft:b,iconRight:y,withClear:g=true,clearTitle:A="Clear",ariaLabel:M,submitLabel:I,loading:L=false,blockGameKeys:D=true}=e,z=x("div",{className:"search"+(o?` search--${o}`:""),id:t}),O=x("span",{className:"search-ico search-ico--left"});if(b){const le=Sa(b);le&&O.appendChild(le);}else O.textContent="🔎",O.style.opacity=".9";const T=x("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":M||n}),R=x("span",{className:"search-ico search-ico--right"});if(y){const le=Sa(y);le&&R.appendChild(le);}const P=P0();P.classList.add("search-spinner");const C=g?x("button",{className:"search-clear",type:"button",title:A},"×"):null,E=I!=null?x("button",{className:"btn search-submit",type:"button"},I):null,B=x("div",{className:"search-field"},O,T,R,P,...C?[C]:[]);z.append(B,...E?[E]:[]);let j=!!i,V=null;function U(le){P.style.display=le?"inline-block":"none",z.classList.toggle("is-loading",le);}function ce(){V!=null&&(window.clearTimeout(V),V=null);}function Y(le){ce(),p>0?V=window.setTimeout(()=>{V=null,le();},p):le();}function ie(){l?.(T.value),f&&u&&u(T.value);}T.addEventListener("input",()=>{Y(ie);}),T.addEventListener("keydown",le=>{le.key==="Enter"?(le.preventDefault(),ce(),u?.(T.value)):le.key==="Escape"&&(T.value.length>0?ne("",{notify:true}):T.blur());}),C&&C.addEventListener("click",()=>ne("",{notify:true})),E&&E.addEventListener("click",()=>u?.(T.value));let se=()=>{};if(D&&(se=T0(T)),m){const le=ye=>{if(ye.key===m&&!ye.ctrlKey&&!ye.metaKey&&!ye.altKey){const _e=document.activeElement;_e&&(_e.tagName==="INPUT"||_e.tagName==="TEXTAREA"||_e.isContentEditable)||(ye.preventDefault(),T.focus());}};window.addEventListener("keydown",le,true),z.__cleanup=()=>{window.removeEventListener("keydown",le,true),se();};}else z.__cleanup=()=>{se();};function ae(le){j=!!le,T.disabled=j,C&&(C.disabled=j),E&&(E.disabled=j),z.classList.toggle("disabled",j);}function ne(le,ye={}){const _e=T.value;T.value=le??"",ye.notify&&_e!==le&&Y(ie);}function q(){return T.value}function Z(){T.focus();}function F(){T.blur();}function $(le){T.placeholder=le;}function Q(le){ne("",le);}return ae(j),U(L),a&&Z(),{root:z,input:T,getValue:q,setValue:ne,focus:Z,blur:F,setDisabled:ae,setPlaceholder:$,clear:Q,setLoading:U,setIconLeft(le){O.replaceChildren();const ye=Sa(le??"🔎");ye&&O.appendChild(ye);},setIconRight(le){R.replaceChildren();const ye=Sa(le??"");ye&&R.appendChild(ye);}}}const _h=e=>new Promise(t=>setTimeout(t,e)),wn=e=>{try{return e()}catch{return}},Dn=(e,t,n)=>Math.max(t,Math.min(n,e)),M0=e=>Dn(e,0,1);let Md=null;function Ih(){return Md}function L0(e){Md=e;}function Th(){return Md!==null}const R0=/\/(?:r\/\d+\/)?version\/([^/]+)/,F0=15e3,O0=50;function D0(){return fe?.document??(typeof document<"u"?document:null)}function Ld(e={}){if(Th())return;const t=e.doc??D0();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(R0);if(a?.[1]){L0(a[1]);return}}}function N0(){return Ld(),Ih()}function $0(){return Th()}async function B0(e={}){const t=e.timeoutMs??F0,n=performance.now();for(;performance.now()-n<t;){Ld();const r=Ih();if(r)return r;await _h(O0);}throw new Error("MGVersion timeout (gameVersion not found)")}const Rd={init:Ld,isReady:$0,get:N0,wait:B0},z0=fe?.location?.origin||"https://magicgarden.gg";function Ph(){return typeof GM_xmlhttpRequest=="function"}function Mh(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function Lh(e){if(Ph())return JSON.parse((await Mh(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function j0(e){if(Ph())return (await Mh(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}const Dr=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,"");let Fd=null,Rh=null;function G0(){return Fd}function U0(){return Rh}function W0(e){Fd=e;}function H0(e){Rh=e;}function Fh(){return Fd!==null}const V0=15e3;async function K0(e={}){Fh()||await Od(e);}async function Od(e={}){const t=G0();if(t)return t;const n=U0();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Rd.wait({timeoutMs:V0}),i=`${z0}/version/${o}/assets/`;return W0(i),i})();return H0(r),r}async function Y0(e){const t=await Od();return Dr(t,e)}function q0(){return Fh()}const Fo={init:K0,isReady:q0,base:Od,url:Y0},Oh=new Map;function X0(e){return Oh.get(e)}function Q0(e,t){Oh.set(e,t);}const Dh="manifest.json";let Rc=null;async function J0(){Rc||(Rc=await Nh());}function Z0(){return Rc!==null}async function Nh(e={}){const t=e.baseUrl??await Fo.base(),n=X0(t);if(n)return n;const r=Lh(Dr(t,Dh));return Q0(t,r),r}function ex(e,t){return e.bundles.find(n=>n.name===t)??null}function tx(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Dh&&t.add(r);return Array.from(t)}const So={init:J0,isReady:Z0,load:Nh,getBundle:ex,listJsonFromBundle:tx},nx={items:"items",decor:"decor",mutations:"mutations",eggs:"eggs",pets:"pets",abilities:"abilities",plants:"plants",weathers:"weather"};function rx(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},ready:false}}const jt=rx(),Pp="https://mg-api.ariedam.fr/data";async function ox(){if(jt.ready)return;console.log("[MGData] Fetching game data from API...");const e=await new Promise((n,r)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(Pp).then(o=>{if(!o.ok)r(new Error(`[MGData] API request failed: ${o.status}`));else return o.json()}).then(o=>n(o)).catch(r);return}GM_xmlhttpRequest({method:"GET",url:Pp,responseType:"json",onload(o){if(o.status<200||o.status>=300){r(new Error(`[MGData] API request failed: ${o.status}`));return}n(o.response);},onerror(){r(new Error("[MGData] Network error"));}});});for(const[n,r]of Object.entries(nx)){const o=e[n];o&&typeof o=="object"&&(jt.data[r]=o);}jt.ready=true;const t=Object.entries(jt.data).filter(([,n])=>n!==null).map(([n])=>n);console.log(`[MGData] Data loaded: ${t.join(", ")}`);}const ix=/\/assets\/sprites\/(.+?)\.png/,ax={"mutation-overlays":"mutation-overlay"};function sx(e){const t=ax[e];return t||(e.endsWith("s")&&e.length>1?e.slice(0,-1):e)}function qn(e){if(!e||typeof e!="string")return null;const t=e.match(ix);if(!t)return null;const n=t[1],r=n.indexOf("/");if(r>0){const o=n.slice(0,r),i=n.slice(r);return `sprite/${sx(o)}${i}`}return `sprite/${n}`}function lx(e){for(const[,t]of Object.entries(e.items||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.decor||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.mutations||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.eggs||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.pets||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.weather||{})){const n=t,r=qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.plants||{})){const n=t;if(n.seed){const r=qn(n.seed.sprite);r&&(n.seed.spriteId=r);}if(n.plant){const r=qn(n.plant.sprite);r&&(n.plant.spriteId=r);}if(n.crop){const r=qn(n.crop.sprite);r&&(n.crop.spriteId=r);}}}function cx(){try{console.log("[MGData] Resolving sprites..."),lx(jt.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] Sprite resolution failed",e);}catch{}}}const $h=1e4,Bh=50;function zh(e){return new Promise(t=>setTimeout(t,e))}function dx(e){return jt.data[e]}function ux(){return {...jt.data}}function px(e){return jt.data[e]!=null}async function fx(e,t=$h){const n=jt.data[e];if(n!=null)return n;const r=Date.now();for(;Date.now()-r<t;){await zh(Bh);const o=jt.data[e];if(o!=null)return o}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function hx(e=$h){if(jt.ready)return {...jt.data};const t=Date.now();for(;Date.now()-t<e;){if(jt.ready)return {...jt.data};await zh(Bh);}throw new Error("MGData.waitForAnyData: timeout")}const jh=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Gh(e){return jh.includes(e)}function Uh(e){return e.filter(t=>Gh(t.action))}function Mp(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function Kl(e){return e?.name||e?.petSpecies||"Unknown Pet"}function Wh(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=Kl(r.targetPet),i=r.hungerRestoreAmount||0,l=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${i} hunger to ${l}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",i=r.sellPrice||0;return `Ate ${o} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=Kl(r.targetPet),i=r.strengthIncrease||0;return `Boosted ${o}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=Kl(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,i=r.petsAffected?.length||0;return `Gave +${o} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,i=r.eggsAffected?.length||0,a=Mp(o);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,i=r.numPlantsAffected||0,a=Mp(o);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,i=r.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const Te={async init(){await ox();},isReady(){return jt.ready},get:dx,getAll:ux,has:px,waitFor:fx,waitForAny:hx,resolveSprites:cx,cleanup(){}},mx=new Map;function gx(){return mx}function Fc(){return fe.jotaiAtomCache?.cache}function ur(e){const t=gx(),n=t.get(e);if(n)return n;const r=Fc();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function bx(){const e=fe;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const vx={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Oo(){return vx}const yx="__JOTAI_STORE_READY__";let Lp=false;const Oc=new Set;function Aa(){if(!Lp){Lp=true;for(const e of Oc)try{e();}catch{}try{const e=fe.CustomEvent||CustomEvent;fe.dispatchEvent?.(new e(yx));}catch{}}}function xx(e){Oc.add(e);const t=Nc();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Oc.delete(e);}}async function Dd(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Nc();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const l=xx(()=>{a||(a=true,l(),o());}),u=Date.now();(async()=>{for(;!a&&Date.now()-u<t;){const p=Nc();if(p.via&&!p.polyfill){if(a)return;a=true,l(),o();return}await Ti(n);}a||(a=true,l(),i(new Error("Store not captured within timeout")));})();})}const Ti=e=>new Promise(t=>setTimeout(t,e));function Hh(){try{const e=fe.Event||Event;fe.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Dc(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Yl(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Dc(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(Dc(i))return i}catch{}return null}function Vh(){const e=Oo(),t=fe.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,l=[i.current];for(;l.length;){const u=l.pop();if(!(!u||a.has(u))){a.add(u);try{const f=u?.pendingProps?.value;if(Dc(f))return e.lastCapturedVia="fiber",f}catch{}try{let f=u?.memoizedState,p=0;for(;f&&p<15;){p++;const m=Yl(f);if(m)return e.lastCapturedVia="fiber",m;const b=Yl(f.memoizedState);if(b)return e.lastCapturedVia="fiber",b;f=f.next;}}catch{}try{if(u?.stateNode){const f=Yl(u.stateNode);if(f)return e.lastCapturedVia="fiber",f}}catch{}u.child&&l.push(u.child),u.sibling&&l.push(u.sibling),u.alternate&&l.push(u.alternate);}}}}return null}function Kh(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function wx(e=5e3){const t=Date.now();let n=Fc();for(;!n&&Date.now()-t<e;)await Ti(100),n=Fc();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=Oo();let o=null,i=null;const a=[],l=()=>{for(const f of a)try{f.__origWrite&&(f.write=f.__origWrite,delete f.__origWrite);}catch{}};for(const f of n.values()){if(!f||typeof f.write!="function"||f.__origWrite)continue;const p=f.write;f.__origWrite=p,f.write=function(m,b,...y){return i||(o=m,i=b,l()),p.call(this,m,b,...y)},a.push(f);}Hh();const u=Date.now();for(;!i&&Date.now()-u<e;)await Ti(50);return i?(r.lastCapturedVia="write",{get:f=>o(f),set:(f,p)=>i(f,p),sub:(f,p)=>{let m;try{m=o(f);}catch{}const b=setInterval(()=>{let y;try{y=o(f);}catch{return}if(y!==m){m=y;try{p();}catch{}}},100);return ()=>clearInterval(b)}}):(l(),r.lastCapturedVia="polyfill",Kh())}async function Cx(e=1e4){const t=Oo();Hh();const n=Date.now();for(;Date.now()-n<e;){const r=Vh();if(r)return r;await Ti(50);}return t.lastCapturedVia="polyfill",Kh()}async function Nd(){const e=Oo();if(e.baseStore&&!e.baseStore.__polyfill)return Aa(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Ti(25);if(e.baseStore)return e.baseStore.__polyfill||Aa(),e.baseStore}e.captureInProgress=true;try{const t=Vh();if(t)return e.baseStore=t,Aa(),t;try{const r=await wx(5e3);return e.baseStore=r,r.__polyfill||Aa(),r}catch(r){e.captureError=r;}const n=await Cx();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Nc(){const e=Oo();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function kx(){const e=await Nd(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let l;try{l=e.get(o);}catch{return}const u=i.last,f=!Object.is(l,u)||!i.has;if(i.last=l,i.has=true,f)for(const p of i.subs)try{p(l,u);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(l=>a=l),()=>a?.()}}}}}async function Za(){const e=Oo();return e.mirror||(e.mirror=await kx()),e.mirror}const Qe={async select(e){const t=await Za(),n=ur(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Za(),r=ur(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Za(),r=ur(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await Qe.select(e);try{t(n);}catch{}return Qe.subscribe(e,t)}};async function Yh(){await Za();}const Hi=Object.freeze(Object.defineProperty({__proto__:null,Store:Qe,prewarm:Yh,waitForStore:Dd},Symbol.toStringTag,{value:"Module"}));function $d(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Pi(e,t){const n=$d(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Sx(e,t,n){const r=$d(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const l=r[a],u=i[l],f=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};i[l]=f,i=f;}return i[r[r.length-1]]=n,o}function Rp(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Pi(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Ax(e,t,n){const r=n.mode??"auto";function o(f){const p=t?Pi(f,t):f,m=new Map;if(p==null)return {signatures:m,keys:[]};const b=Array.isArray(p);if((r==="array"||r==="auto"&&b)&&b)for(let g=0;g<p.length;g++){const A=p[g],M=n.key?n.key(A,g,f):g,I=n.sig?n.sig(A,g,f):n.fields?Rp(A,n.fields):JSON.stringify(A);m.set(M,I);}else for(const[g,A]of Object.entries(p)){const M=n.key?n.key(A,g,f):g,I=n.sig?n.sig(A,g,f):n.fields?Rp(A,n.fields):JSON.stringify(A);m.set(M,I);}return {signatures:m,keys:Array.from(m.keys())}}function i(f,p){if(f===p)return  true;if(!f||!p||f.size!==p.size)return  false;for(const[m,b]of f)if(p.get(m)!==b)return  false;return  true}async function a(f){let p=null;return Qe.subscribeImmediate(e,m=>{const b=t?Pi(m,t):m,{signatures:y}=o(b);if(!i(p,y)){const g=new Set([...p?Array.from(p.keys()):[],...Array.from(y.keys())]),A=[];for(const M of g){const I=p?.get(M)??"__NONE__",L=y.get(M)??"__NONE__";I!==L&&A.push(M);}p=y,f({value:b,changedKeys:A});}})}async function l(f,p){return a(({value:m,changedKeys:b})=>{b.includes(f)&&p({value:m});})}async function u(f,p){const m=new Set(f);return a(({value:b,changedKeys:y})=>{const g=y.filter(A=>m.has(A));g.length&&p({value:b,changedKeys:g});})}return {sub:a,subKey:l,subKeys:u}}const so=new Map;function Ex(e,t){const n=so.get(e);if(n)try{n();}catch{}return so.set(e,t),()=>{try{t();}catch{}so.get(e)===t&&so.delete(e);}}function et(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${$d(n).join(".")}`:e;async function i(){const m=await Qe.select(e);return n?Pi(m,n):m}async function a(m){if(typeof r=="function"){const g=await Qe.select(e),A=r(m,g);return Qe.set(e,A)}const b=await Qe.select(e),y=n?Sx(b,n,m):m;return r==="merge-shallow"&&!n&&b&&typeof b=="object"&&typeof m=="object"?Qe.set(e,{...b,...m}):Qe.set(e,y)}async function l(m){const b=await i(),y=m(b);return await a(y),y}async function u(m,b,y){let g;const A=I=>{const L=n?Pi(I,n):I;if(typeof g>"u"||!y(g,L)){const D=g;g=L,b(L,D);}},M=m?await Qe.subscribeImmediate(e,A):await Qe.subscribe(e,A);return Ex(o,M)}function f(){const m=so.get(o);if(m){try{m();}catch{}so.delete(o);}}function p(m){return Ax(e,m?.path??n,m)}return {label:o,get:i,set:a,update:l,onChange:(m,b=Object.is)=>u(false,m,b),onChangeNow:(m,b=Object.is)=>u(true,m,b),asSignature:p,stopOnChange:f}}function te(e){return et(e)}te("positionAtom");te("lastPositionInMyGardenAtom");te("playerDirectionAtom");te("stateAtom");te("quinoaDataAtom");te("currentTimeAtom");te("actionAtom");te("isPressAndHoldActionAtom");te("mapAtom");te("tileSizeAtom");et("mapAtom",{path:"cols"});et("mapAtom",{path:"rows"});et("mapAtom",{path:"spawnTiles"});et("mapAtom",{path:"locations.seedShop.spawnTileIdx"});et("mapAtom",{path:"locations.eggShop.spawnTileIdx"});et("mapAtom",{path:"locations.toolShop.spawnTileIdx"});et("mapAtom",{path:"locations.decorShop.spawnTileIdx"});et("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});et("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});et("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});et("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});et("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});te("playerAtom");te("myDataAtom");te("myUserSlotIdxAtom");te("isSpectatingAtom");te("myCoinsCountAtom");te("numPlayersAtom");et("playerAtom",{path:"id"});et("myDataAtom",{path:"activityLogs"});te("userSlotsAtom");te("filteredUserSlotsAtom");te("myUserSlotAtom");te("spectatorsAtom");et("stateAtom",{path:"child"});et("stateAtom",{path:"child.data"});et("stateAtom",{path:"child.data.shops"});const _x=et("stateAtom",{path:"child.data.userSlots"}),Ix=et("stateAtom",{path:"data.players"}),Tx=et("stateAtom",{path:"data.hostPlayerId"});te("myInventoryAtom");te("myInventoryItemsAtom");te("isMyInventoryAtMaxLengthAtom");te("myFavoritedItemIdsAtom");te("myCropInventoryAtom");te("mySeedInventoryAtom");te("myToolInventoryAtom");te("myEggInventoryAtom");te("myDecorInventoryAtom");te("myPetInventoryAtom");et("myInventoryAtom",{path:"favoritedItemIds"});te("itemTypeFiltersAtom");te("myItemStoragesAtom");te("myPetHutchStoragesAtom");te("myPetHutchItemsAtom");te("myPetHutchPetItemsAtom");te("myNumPetHutchItemsAtom");te("myValidatedSelectedItemIndexAtom");te("isSelectedItemAtomSuspended");te("mySelectedItemAtom");te("mySelectedItemNameAtom");te("mySelectedItemRotationsAtom");te("mySelectedItemRotationAtom");te("setSelectedIndexToEndAtom");te("myPossiblyNoLongerValidSelectedItemIndexAtom");te("mySelectedItemIdAtom");te("myCurrentGlobalTileIndexAtom");te("myCurrentGardenTileAtom");te("myCurrentGardenObjectAtom");te("myOwnCurrentGardenObjectAtom");te("myOwnCurrentDirtTileIndexAtom");te("myCurrentGardenObjectNameAtom");te("isInMyGardenAtom");te("myGardenBoardwalkTileObjectsAtom");const Px=et("myDataAtom",{path:"garden"});et("myDataAtom",{path:"garden.tileObjects"});et("myOwnCurrentGardenObjectAtom",{path:"objectType"});te("myCurrentStablePlantObjectInfoAtom");te("myCurrentSortedGrowSlotIndicesAtom");te("mySelectedSlotIdAtom");te("myCurrentGrowSlotsAtom");te("myCurrentGrowSlotAtom");te("secondsUntilCurrentGrowSlotMaturesAtom");te("isCurrentGrowSlotMatureAtom");te("numGrowSlotsAtom");te("myCurrentEggAtom");te("myPetSlotInfosAtom");te("myPrimitivePetSlotsAtom");te("myNonPrimitivePetSlotsAtom");te("myPetsProgressAtom");te("myActiveCropMutationPetsAtom");te("totalPetSellPriceAtom");te("selectedPetHasNewVariantsAtom");const Mx=te("shopsAtom"),Lx=et("myDataAtom",{path:"shopPurchases"});te("seedShopAtom");te("seedShopInventoryAtom");te("seedShopRestockSecondsAtom");te("seedShopCustomRestockInventoryAtom");te("eggShopAtom");te("eggShopInventoryAtom");te("eggShopRestockSecondsAtom");te("eggShopCustomRestockInventoryAtom");te("toolShopAtom");te("toolShopInventoryAtom");te("toolShopRestockSecondsAtom");te("toolShopCustomRestockInventoryAtom");te("decorShopAtom");te("decorShopInventoryAtom");te("decorShopRestockSecondsAtom");te("decorShopCustomRestockInventoryAtom");te("isDecorShopAboutToRestockAtom");et("shopsAtom",{path:"seed"});et("shopsAtom",{path:"tool"});et("shopsAtom",{path:"egg"});et("shopsAtom",{path:"decor"});te("myCropItemsAtom");te("myCropItemsToSellAtom");te("totalCropSellPriceAtom");te("friendBonusMultiplierAtom");te("myJournalAtom");te("myCropJournalAtom");te("myPetJournalAtom");te("myStatsAtom");te("myActivityLogsAtom");te("newLogsAtom");te("hasNewLogsAtom");te("newCropLogsFromSellingAtom");te("hasNewCropLogsFromSellingAtom");te("myCompletedTasksAtom");te("myActiveTasksAtom");te("isWelcomeToastVisibleAtom");te("shouldCloseWelcomeToastAtom");te("isInitialMoveToDirtPatchToastVisibleAtom");te("isFirstPlantSeedActiveAtom");te("isThirdSeedPlantActiveAtom");te("isThirdSeedPlantCompletedAtom");te("isDemoTouchpadVisibleAtom");te("areShopAnnouncersEnabledAtom");te("arePresentablesEnabledAtom");te("isEmptyDirtTileHighlightedAtom");te("isPlantTileHighlightedAtom");te("isItemHiglightedInHotbarAtom");te("isItemHighlightedInModalAtom");te("isMyGardenButtonHighlightedAtom");te("isSellButtonHighlightedAtom");te("isShopButtonHighlightedAtom");te("isInstaGrowButtonHiddenAtom");te("isActionButtonHighlightedAtom");te("isGardenItemInfoCardHiddenAtom");te("isSeedPurchaseButtonHighlightedAtom");te("isFirstSeedPurchaseActiveAtom");te("isFirstCropHarvestActiveAtom");te("isWeatherStatusHighlightedAtom");te("weatherAtom");const qh=te("activeModalAtom"),Bd=te("inventoryModalIsActiveAtom");te("hotkeyBeingPressedAtom");te("avatarTriggerAnimationAtom");te("avatarDataAtom");te("emoteDataAtom");te("otherUserSlotsAtom");te("otherPlayerPositionsAtom");te("otherPlayerSelectedItemsAtom");te("otherPlayerLastActionsAtom");te("traderBunnyPlayerId");te("npcPlayersAtom");te("npcQuinoaUsersAtom");te("numNpcAvatarsAtom");te("traderBunnyEmoteTimeoutAtom");te("traderBunnyEmoteAtom");te("unsortedLeaderboardAtom");te("currentGardenPlayer");te("quinoaEngineAtom");te("quinoaInitializationErrorAtom");te("avgPingAtom");te("serverClientTimeOffsetAtom");te("isEstablishingShotRunningAtom");te("isEstablishingShotCompleteAtom");const Ve={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Xs(){return Ve}function Rx(){return Ve.initialized}function Vr(){return Ve.isCustom&&Ve.activeModal!==null}function jr(){return Ve.activeModal}function Xh(e){return !Ve.shadow||Ve.shadow.modal!==e?null:Ve.shadow.data}function Fx(e){Ve.initialized=e;}function zd(e){Ve.activeModal=e;}function jd(e){Ve.isCustom=e;}function Qh(e,t){Ve.shadow={modal:e,data:t,timestamp:Date.now()};}function Jh(){Ve.shadow=null;}function Fp(e,t){Ve.patchedAtoms.add(e),Ve.originalReads.set(e,t);}function Ox(e){return Ve.originalReads.get(e)}function $c(e){return Ve.patchedAtoms.has(e)}function Dx(e){Ve.patchedAtoms.delete(e),Ve.originalReads.delete(e);}function Nx(e){Ve.unsubscribes.push(e);}function $x(){for(const e of Ve.unsubscribes)try{e();}catch{}Ve.unsubscribes.length=0;}function Bx(e){return Ve.listeners.onOpen.add(e),()=>Ve.listeners.onOpen.delete(e)}function Zh(e){return Ve.listeners.onClose.add(e),()=>Ve.listeners.onClose.delete(e)}function em(e){for(const t of Array.from(Ve.listeners.onOpen))try{t(e);}catch{}}function Gd(e){for(const t of Array.from(Ve.listeners.onClose))try{t(e);}catch{}}function zx(){$x(),Ve.initialized=false,Ve.activeModal=null,Ve.isCustom=false,Ve.shadow=null,Ve.patchedAtoms.clear(),Ve.originalReads.clear(),Ve.listeners.onOpen.clear(),Ve.listeners.onClose.clear();}const Ud={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function tm(e){return Ud[e]}function jx(e){const t=Ud[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const Gx=new Set(["inventory","journal","stats","activityLog","petHutch"]),Ux=new Set(["seedShop","eggShop","toolShop","decorShop"]),Wx=new Set(["leaderboard"]);function Hx(e,t,n,r){return function(i){const a=Vr(),l=jr();if(a&&l===r){const u=Xh(r);if(u!==null){let f;if(n.dataKey==="_full"?f=u:f=u[n.dataKey],f!==void 0)return t(i),n.transform?n.transform(f):f}}return t(i)}}function Vx(e,t,n,r,o){return function(a){if(Vr()&&jr()===o){const l=Xh(o);if(l!==null){const u=l[n];if(u!==void 0)return t(a),r(u)}}return t(a)}}function Kx(e){const t=tm(e);for(const n of t.atoms){const r=ur(n.atomLabel);if(!r||$c(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=Hx(n.atomLabel,o,n,e);r.read=i,Fp(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=ur(n.atomLabel);if(!r||$c(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=Vx(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,Fp(n.atomLabel,o);}}async function Qs(e){const t=tm(e);for(const r of t.atoms)Op(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)Op(r.atomLabel);const n=await Nd();await nm(n,e);}async function Yx(e){const t=await Nd();await nm(t,e);const n=jx(e);for(const r of n){const o=ur(r);if(o)try{t.get(o);}catch{}}}function Op(e){if(!$c(e))return;const t=ur(e),n=Ox(e);t&&n&&(t.read=n),Dx(e);}async function nm(e,t){const n=Gx.has(t),r=Ux.has(t),o=Wx.has(t);if(!n&&!r&&!o)return;const i=ur("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let l=null;if(n||r){const u=a.child,f=u?.data;if(u&&f&&typeof f=="object"){let p=null;if(n&&Array.isArray(f.userSlots)){const m=f.userSlots.map(b=>{if(!b||typeof b!="object")return b;const y=b,g=y.data,A=g&&typeof g=="object"?{...g}:g;return {...y,data:A}});p={...p??f,userSlots:m};}if(r&&f.shops&&typeof f.shops=="object"&&(p={...p??f,shops:{...f.shops}}),p){const m={...u,data:p};l={...a,child:m};}}}if(o){const u=a.data;if(u&&Array.isArray(u.players)){const f={...u,players:[...u.players]};l={...l??a,data:f};}}if(!l)return;await e.set(i,l);}catch{}}async function qx(){for(const e of Object.keys(Ud))await Qs(e);}let Ea=null,bi=null;async function Xx(){if(Xs().initialized)return;bi=await Qe.select("activeModalAtom"),Ea=setInterval(async()=>{try{const n=await Qe.select("activeModalAtom"),r=bi;r!==n&&(bi=n,Qx(n,r));}catch{}},50),Nx(()=>{Ea&&(clearInterval(Ea),Ea=null);}),Fx(true);}function Qx(e,t){const n=Vr(),r=jr();e===null&&t!==null&&(n&&r===t?Jx("native"):n||Gd({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&em({modal:e,isCustom:false});}async function Jx(e){const t=jr();t&&(Jh(),jd(false),zd(null),t==="inventory"&&await Bd.set(false),await Qs(t),Gd({modal:t,wasCustom:true,closedBy:e}));}async function Zx(e,t){if(!Xs().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Vr()&&await rm(),Qh(e,t),jd(true),zd(e),Kx(e),await Yx(e),e==="inventory"&&await Bd.set(true),await qh.set(e),bi=e,em({modal:e,isCustom:true});}function ew(e,t){const n=Xs();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Qh(e,o);}async function rm(){const e=Xs();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Jh(),jd(false),zd(null),t==="inventory"&&await Bd.set(false),await qh.set(null),bi=null,await Qs(t),Gd({modal:t,wasCustom:true,closedBy:"api"});}function tw(){return new Promise(e=>{if(!Vr()){e();return}const t=Zh(()=>{t(),e();});})}async function nw(){if(Vr()){const e=jr();e&&await Qs(e);}await qx(),zx();}const fo={async init(){return Xx()},isReady(){return Rx()},async show(e,t){return Zx(e,t)},update(e,t){return ew(e,t)},async close(){return rm()},isOpen(){return jr()!==null},isCustomOpen(){return Vr()},getActiveModal(){return jr()},waitForClose(){return tw()},onOpen(e){return Bx(e)},onClose(e){return Zh(e)},async destroy(){return nw()}};function rw(){return {ready:false,app:null,renderer:null,ctors:null,textures:new Map,animations:new Map,spriteMeta:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null,catalogKeys:new Set,animationFrameIds:new Map,loadingPromises:new Map,spritePngUrlResolver:null}}function ow(){return {lru:new Map,cost:0,srcCanvas:new Map}}function iw(){return {cache:new Map,maxEntries:200}}const aw={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},sw={enabled:true,maxEntries:200},ln=rw(),lw=ow(),cw={...aw},dw=iw(),uw={...sw};function Ut(){return ln}function Ao(){return lw}function Mi(){return cw}function Li(){return dw}function Bc(){return uw}function om(){return ln.ready}function ks(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Vi(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?ks(r):`sprite/${n}/${r}`}function zc(e,t,n,r){const o=Vi(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=ks(i);return n.has(a)||r.has(a)?a:o}const Pr=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},pw="https://mg-api.ariedam.fr/assets/sprite-data?full=1",Dp="https://mg-api.ariedam.fr/assets/sprites";let di=new Map;function fw(e){const t=e.startsWith("sprite/")?e.slice(7):e,n=t.indexOf("/");if(n>0){const r=t.slice(0,n),o=t.slice(n),i=di.get(r)??r;return `${Dp}/${i}${o}.png`}return `${Dp}/${t}.png`}function hw(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(e).then(r=>{if(!r.ok)n(new Error(`HTTP ${r.status} for ${e}`));else return r.json()}).then(r=>t(r)).catch(n);return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"json",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}t(r.response);},onerror(){n(new Error(`Network error: ${e}`));}});})}function mw(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){const r=new Image;r.crossOrigin="anonymous",r.onload=()=>t(r),r.onerror=()=>n(new Error(`Failed to load: ${e}`)),r.src=e;return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"blob",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}const o=r.response,i=URL.createObjectURL(o),a=new Image;a.onload=()=>{URL.revokeObjectURL(i),t(a);},a.onerror=()=>{URL.revokeObjectURL(i),n(new Error(`Failed to decode: ${e}`));},a.src=i;},onerror(){n(new Error(`Network error: ${e}`));}});})}function gw(e){const t=new Map;for(const n of e){const r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)continue;const[,o,i]=r;t.has(o)||t.set(o,new Set),t.get(o).add(i);}return t}function bw(e){return {anchor:e.anchor??{x:.5,y:.5},sourceSize:e.sourceSize??{w:0,h:0},trimmed:e.trimmed??false,trimOffset:{x:e.spriteSourceSize?.x??0,y:e.spriteSourceSize?.y??0}}}async function vw(){Pr("fetching sprite catalog from API...");const e=await hw(pw),t=e.items??e.categories?.flatMap(f=>f.items)??[];if(Pr(`catalog received: ${t.length} entries`),e.categories){di=new Map;for(const f of e.categories)for(const p of f.items??[]){if(!p.id)continue;const m=/^sprite\/([^/]+)\//.exec(p.id);if(!m)continue;const b=m[1];(!di.get(b)||b===f.cat)&&di.set(b,f.cat);}Pr("category mapping:",Object.fromEntries(di));}await new Promise(f=>setTimeout(f,0));const n=t.filter(f=>f.type==="frame"),r=t.filter(f=>f.type==="animation"),o=new Map,i=new Set;for(const f of n)o.set(f.id,bw(f)),i.add(f.id);const a=new Map;for(const f of r)f.frames.length>=2&&(a.set(f.id,f.frames),i.add(f.id));await new Promise(f=>setTimeout(f,0));const l=[...i],u=gw(l);return Pr(`indexed ${u.size} categories, ${a.size} animations, ${i.size} total keys`),{catalogKeys:i,meta:o,animationFrameIds:a,categoryIndex:u,pngUrlResolver:fw}}let _a=null;async function yw(){return ln.ready?true:_a||(_a=(async()=>{const e=performance.now();Pr("init start");const{catalogKeys:t,meta:n,animationFrameIds:r,categoryIndex:o,pngUrlResolver:i}=await vw();return ln.catalogKeys=t,ln.spriteMeta=n,ln.animationFrameIds=r,ln.categoryIndex=o,ln.spritePngUrlResolver=i,Pr("catalog loaded","keys",ln.catalogKeys.size,"animations",ln.animationFrameIds.size,"categories",ln.categoryIndex?.size??0),ln.ready=true,Pr("ready in",Math.round(performance.now()-e),"ms"),true})(),_a)}function im(e,t){const n=t.textures.get(e);if(n)return Promise.resolve(n);const r=t.loadingPromises.get(e);if(r)return r;if(!t.catalogKeys.has(e)||!t.spritePngUrlResolver)return Promise.resolve(null);const o=t.spritePngUrlResolver(e),i=mw(o).then(a=>(t.textures.set(e,a),t.loadingPromises.delete(e),a)).catch(()=>(t.loadingPromises.delete(e),null));return t.loadingPromises.set(e,i),i}async function am(e,t){const n=new Map,r=e.map(async o=>{const i=await im(o,t);n.set(o,i);});return await Promise.all(r),n}const hr={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Thunderstruck:{overlayTall:"sprite/mutation-overlay/ThunderstruckTallPlant",tallIconOverride:"sprite/mutation/ThunderstruckGround"},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},xw=Object.keys(hr),ww=["Gold","Rainbow","Wet","Chilled","Frozen","Thunderstruck","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Np=new Map(ww.map((e,t)=>[e,t]));function Ss(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(Np.get(n)??1/0)-(Np.get(r)??1/0))}const Cw=["Wet","Chilled","Frozen","Thunderstruck"],kw=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Sw={Banana:.68,Beet:.65,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Aw={Pepper:.6,Banana:.6},Ew=256,_w=.5,Iw=2;function sm(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=Ss(e),n=Tw(e),r=Pw(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function Tw(e){const t=e.filter((o,i,a)=>hr[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?Ss(t.filter(o=>!Cw.includes(o))):Ss(t)}function Pw(e){const t=e.filter((n,r,o)=>hr[n]?.overlayTall&&o.indexOf(n)===r);return Ss(t)}function vi(e,t){return e.map(n=>({name:n,meta:hr[n],overlayTall:hr[n]?.overlayTall??null,isTall:t}))}const Mw={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Thunderstruck:{op:"source-atop",colors:["rgb(16, 141, 163)"],a:.4},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Ia=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function Lw(e){return Ia.has(e)?e:Ia.has("overlay")?"overlay":Ia.has("screen")?"screen":Ia.has("lighter")?"lighter":"source-atop"}function Rw(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,l=n/2;if(!o){const m=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*m,l-Math.sin(i)*m,a+Math.cos(i)*m,l+Math.sin(i)*m)}const u=Math.cos(i),f=Math.sin(i),p=Math.abs(u)*t/2+Math.abs(f)*n/2;return e.createLinearGradient(a-u*p,l-f*p,a+u*p,l+f*p)}function $p(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?Rw(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((l,u)=>a.addColorStop(u/(i.length-1),l)),e.fillStyle=a,e.fillRect(0,0,t,n);}function Fw(e,t,n,r){const o=Mw[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,l=t.width,u=t.height;e.save();const f=i.masked?Lw(i.op):"source-in";if(e.globalCompositeOperation=f,i.a!=null&&(e.globalAlpha=i.a),i.masked){const p=document.createElement("canvas");p.width=l,p.height=u;const m=p.getContext("2d");m.imageSmoothingEnabled=false,$p(m,l,u,i,a),m.globalCompositeOperation="destination-in",m.drawImage(t,0,0),e.drawImage(p,0,0);}else $p(e,l,u,i,a);e.restore();}function Ki(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Ri(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];case "Thunderstruck":return ["Thunderstruck","ThunderstruckGround"];default:return [e]}}function Ow(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function Dw(e,t,n,r){if(!t)return null;const o=Ki(e),i=Ri(t);for(const a of i){const l=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const u of l){const f=n.get(u);if(f)return {tex:f,key:u}}{const u=`sprite/mutation-overlay/${a}TallPlant`,f=n.get(u);if(f)return {tex:f,key:u};const p=`sprite/mutation-overlay/${a}`,m=n.get(p);if(m)return {tex:m,key:p};const b=Ow(t,n);if(b)return b}}return null}function Nw(e,t,n,r){if(!t)return null;const o=hr[t];if(n&&o?.tallIconOverride){const l=r.get(o.tallIconOverride);if(l)return l}const i=Ki(e),a=Ri(t);for(const l of a){const u=[`sprite/mutation/${l}Icon`,`sprite/mutation/${l}`,`sprite/mutation/${l}${i}`,`sprite/mutation/${l}-${i}`,`sprite/mutation/${l}_${i}`,`sprite/mutation/${l}/${i}`];for(const f of u){const p=r.get(f);if(p)return p}if(n){const f=`sprite/mutation-overlay/${l}TallPlantIcon`,p=r.get(f);if(p)return p;const m=`sprite/mutation-overlay/${l}TallPlant`,b=r.get(m);if(b)return b}}return null}function $w(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let l=Aw[t]??i;const u=o>r*1.5;let f=Sw[t]??(u?a:.4);const p={x:(l-i)*r,y:(f-a)*o},m=Math.min(r,o),b=Math.min(1.5,m/Ew);let y=_w*b;return n&&(y*=Iw),{width:r,height:o,anchorX:i,anchorY:a,offset:p,iconScale:y}}function Bw(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,l=t.mutations?.slice().sort().join(",")||"",u=t.anchorX??.5,f=t.anchorY??.5;return `${e}|s${i}|f${a}|m${l}|ax${u}|ay${f}|bm${n}|bp${o}|p${r}`}function zw(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function jw(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,l]of e.cache)l.lastAccess<i&&(i=l.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function jc(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Gw(e){e.cache.clear();}function Uw(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Ww(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Hw(e,t,n,r,o,i,a,l=5,u=0){if(!t.ready||!i.enabled)return 0;const f=e.length;let p=0;a?.(0,f);for(let m=0;m<f;m+=l){const b=e.slice(m,m+l);for(const y of b)try{await Uc(t,n,r,null,y,{scale:1},o,i),p++;}catch{p++;}a?.(p,f),m+l<f&&await Ww();}return p}function Gc(e){if(e instanceof HTMLCanvasElement)return jc(e);if(e instanceof HTMLImageElement){const t=document.createElement("canvas");t.width=e.naturalWidth||e.width,t.height=e.naturalHeight||e.height;const n=t.getContext("2d");return n&&(n.imageSmoothingEnabled=false,n.drawImage(e,0,0)),t}throw new Error("Cannot convert to canvas: unknown source type")}async function Vw(e,t,n){const r=sm(t);if(!r.sig)return;const o=new Set,i=n.spriteMeta.get(e),a=i?.anchor?.y??.5,l=i?.sourceSize,u=l?.w??1,f=l?.h??1,p=a>.8&&f>u*1.8,m=vi(r.selectedMuts,p),b=vi(r.overlayMuts,p);for(const g of m){if(g.name==="Gold"||g.name==="Rainbow")continue;const A=hr[g.name];g.isTall&&A?.tallIconOverride&&o.add(A.tallIconOverride);const M=Ki(e);for(const I of Ri(g.name))o.add(`sprite/mutation/${I}Icon`),o.add(`sprite/mutation/${I}`),o.add(`sprite/mutation/${I}${M}`);}if(p)for(const g of b){g.overlayTall&&o.add(g.overlayTall);for(const A of Ri(g.name))o.add(`sprite/mutation-overlay/${A}TallPlant`),o.add(`sprite/mutation-overlay/${A}`),o.add(`sprite/mutation/${A}`);}const y=[...o].filter(g=>n.catalogKeys.has(g)&&!n.textures.has(g));y.length>0&&await am(y,n);}function Kw(e,t,n,r){const o=hr[t];if(n&&o?.tallIconOverride&&r.has(o.tallIconOverride))return o.tallIconOverride;const i=Ki(e),a=Ri(t);for(const l of a){const u=[`sprite/mutation/${l}Icon`,`sprite/mutation/${l}`,`sprite/mutation/${l}${i}`];for(const f of u)if(r.has(f))return f}return null}function Yw(e,t,n,r,o){const i=sm(n);if(!i.sig)return e;const a=e.width,l=e.height,u=o.get(t),f=u?.anchor?.x??.5,p=u?.anchor?.y??.5,m={x:a*f,y:l*p},b=p>.8&&l>a*1.8,y=vi(i.muts,b),g=vi(i.overlayMuts,b),A=vi(i.selectedMuts,b),M=Ki(t),L=$w({width:a,height:l,defaultAnchor:{x:f,y:p}},M,b),D=[];for(const T of A){if(T.name==="Gold"||T.name==="Rainbow")continue;const R=Nw(t,T.name,T.isTall,r);if(R)try{const P=Gc(R),C=P.width*L.iconScale,E=P.height*L.iconScale,B=Kw(t,T.name,T.isTall,r),j=B?o.get(B):null,V=j?.anchor?.x??.5,U=j?.anchor?.y??.5,ce=m.x+L.offset.x-C*V,Y=m.y+L.offset.y-E*U;let ie=2;T.isTall&&(ie=-1),kw.has(T.name)&&(ie=10),D.push({canvas:P,x:ce,y:Y,sw:C,sh:E,z:ie});}catch{}}const z=document.createElement("canvas");z.width=a,z.height=l;const O=z.getContext("2d");O.imageSmoothingEnabled=false;for(const T of D)T.z===-1&&O.drawImage(T.canvas,T.x,T.y,T.sw,T.sh);O.drawImage(e,0,0);for(const T of y){const R=document.createElement("canvas");R.width=a,R.height=l;const P=R.getContext("2d");P.imageSmoothingEnabled=false,P.drawImage(e,0,0),Fw(P,R,T.name,T.isTall),O.drawImage(R,0,0);}for(const T of D)T.z===2&&O.drawImage(T.canvas,T.x,T.y,T.sw,T.sh);if(b)for(const T of g){const R=T.overlayTall,P=R&&r.get(R)?{tex:r.get(R),key:R}:Dw(t,T.name,r);if(P?.tex)try{const C=Gc(P.tex),E=C.width,B=C.height,j=m.x-f*E,V=0,U=document.createElement("canvas");U.width=E,U.height=B;const ce=U.getContext("2d");if(!ce)continue;ce.imageSmoothingEnabled=!1,ce.drawImage(C,0,0),ce.globalCompositeOperation="destination-in",ce.drawImage(e,-j,-V),O.drawImage(U,j,V);}catch{}}for(const T of D)T.z===10&&O.drawImage(T.canvas,T.x,T.y,T.sw,T.sh);return z}function qw(e){return e.boundsMode?e.boundsMode:"base"}function Xw(e,t){return t.pad??0}function Zo(e){return Number.isFinite(e)?Math.max(0,e):0}function lm(e){if(typeof e=="number"){const t=Zo(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Zo(e.top??0),right:Zo(e.right??0),bottom:Zo(e.bottom??0),left:Zo(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Qw(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=lm(t);return `${n.top},${n.right},${n.bottom},${n.left}`}async function Uc(e,t,n,r,o,i={},a,l){if(!e.ready)throw new Error("MGSprite not ready yet");const u=zc(r,o,e.catalogKeys,e.animationFrameIds),f=qw(i),p=Xw(f,i),m=Qw(f,i.boundsPadding),b=a&&l?.enabled?Bw(u,i,f,p,m):null;if(b&&a&&l?.enabled){const C=zw(a,b);if(C)return jc(C)}const y=i.mutations||[],g=e.animationFrameIds.get(u);g?.length?await am(g,e):await im(u,e),y.length>0&&await Vw(u,y,e);const A=Math.max(0,(i.frameIndex??0)|0);let M;if(g?.length){const C=g.map(E=>e.textures.get(E)).filter(Boolean);M=C.length>0?C[A%C.length]:null;}else M=e.textures.get(u);if(!M)throw new Error(`Unknown sprite/anim key: ${u}`);let I=Gc(M);y.length>0&&(I=Yw(I,u,y,e.textures,e.spriteMeta));const L=i.scale??1,D=lm(i.boundsPadding),z=I.width,O=I.height,T=Math.max(1,Math.ceil((z+D.left+D.right+p*2)*L)),R=Math.max(1,Math.ceil((O+D.top+D.bottom+p*2)*L));let P;if(L===1&&!p&&!D.top&&!D.right&&!D.bottom&&!D.left)P=I;else {P=document.createElement("canvas"),P.width=T,P.height=R;const C=P.getContext("2d");if(C){C.imageSmoothingEnabled=false;const E=(D.left+p)*L,B=(D.top+p)*L;C.drawImage(I,E,B,z*L,O*L);}}return b&&a&&l?.enabled?(jw(a,l,b,P),jc(P)):P}function Bp(e,t,n,r,o,i={}){throw e.ready?!e.app||!e.ctors?new Error("MGSprite.show() requires PIXI (not available - use toCanvas() instead)"):new Error("MGSprite.show() is not supported in API-only mode"):new Error("MGSprite not ready yet")}function Jw(e){for(const t of Array.from(e.live)){const n=t.__mgDestroy;typeof n=="function"&&n.call(t);}}function Zw(e,t){return e.defaultParent=t,true}function eC(e,t){return e.defaultParent=t,true}function tC(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Kr(){if(!om())throw new Error("MGSprite not ready yet")}function nC(e,t,n){return typeof t=="string"?Bp(Ut(),Ao(),Mi(),e,t,n||{}):Bp(Ut(),Ao(),Mi(),null,e,t||{})}function rC(e,t,n){return typeof t=="string"?Uc(Ut(),Ao(),Mi(),e,t,n||{},Li(),Bc()):Uc(Ut(),Ao(),Mi(),null,e,t||{},Li(),Bc())}function oC(){Jw(Ut());}function iC(e){return Zw(Ut(),e)}function aC(e){return eC(Ut(),e)}function sC(e,t){const n=Ut(),r=typeof t=="string"?zc(e,t,n.catalogKeys,n.animationFrameIds):zc(null,e,n.catalogKeys,n.animationFrameIds);return n.catalogKeys.has(r)||n.animationFrameIds.has(r)}function lC(){Kr();const e=Ut().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function cC(e){Kr();const t=String(e||"").trim();if(!t)return [];const n=Ut().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function dC(e,t){Kr();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Ut().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[l,u]of o.entries())if(l.toLowerCase()===i){for(const f of u.values())if(f.toLowerCase()===a)return  true}return  false}function uC(e){Kr();const t=Ut().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const l=Vi(o,a);(!n||l.toLowerCase().startsWith(n))&&r.push(l);}return r.sort((o,i)=>o.localeCompare(i))}function pC(e){Kr();const t=String(e||"").trim();if(!t)return null;const n=ks(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Ut().categoryIndex,l=o.toLowerCase(),u=i.toLowerCase();let f=o,p=i;if(a){const m=Array.from(a.keys()).find(g=>g.toLowerCase()===l);if(!m)return null;f=m;const b=a.get(m);if(!b)return null;const y=Array.from(b.values()).find(g=>g.toLowerCase()===u);if(!y)return null;p=y;}return {category:f,id:p,key:Vi(f,p)}}function fC(e,t){Kr();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Ut().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),l=Array.from(o.keys()).find(p=>p.toLowerCase()===i)||n,u=o.get(l);if(!u)throw new Error(`Unknown sprite category: ${n}`);const f=Array.from(u.values()).find(p=>p.toLowerCase()===a)||r;if(!u.has(f))throw new Error(`Unknown sprite id: ${n}/${r}`);return Vi(l,f)}function hC(){tC(Ao());}function mC(){Gw(Li());}function gC(){return Uw(Li())}function bC(){return [...xw]}async function vC(e,t,n=10,r=0){return Kr(),Hw(e,Ut(),Ao(),Mi(),Li(),Bc(),t,n,r)}const $e={init:yw,isReady:om,show:nC,toCanvas:rC,clear:oC,attach:iC,attachProvider:aC,has:sC,key:(e,t)=>Vi(e,t),getCategories:lC,getCategoryId:cC,hasId:dC,listIds:uC,getIdInfo:pC,getIdPath:fC,clearMutationCache:hC,clearToCanvasCache:mC,getToCanvasCacheStats:gC,getMutationNames:bC,warmup:vC};function yC(){return {ready:false,xform:null,xformAt:0}}const pn=yC();function cm(){return pn.ready}const zp=Function.prototype.bind,Xe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let dm,um,pm;const xC=new Promise(e=>{dm=e;}),wC=new Promise(e=>{um=e;}),CC=new Promise(e=>{pm=e;});function kC(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function SC(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function AC(e){Xe.engine=e,Xe.tos=SC(e)||null,Xe.app=e.app||null,Xe.renderer=e.app?.renderer||null,Xe.ticker=e.app?.ticker||null,Xe.stage=e.app?.stage||null;try{dm(e);}catch{}try{Xe.app&&um(Xe.app);}catch{}try{Xe.renderer&&pm(Xe.renderer);}catch{}}function Wd(){return Xe.engine?true:(Xe._bindPatched||(Xe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=zp.call(this,e,...t);try{!Xe.engine&&kC(e)&&(Function.prototype.bind=zp,Xe._bindPatched=!1,AC(e));}catch{}return n}),false)}Wd();async function EC(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(Xe.engine)return  true;Wd(),await _h(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function _C(e=15e3){return Xe.engine||await EC(e),true}function IC(){return Xe.engine&&Xe.app?{ok:true,engine:Xe.engine,tos:Xe.tos,app:Xe.app}:(Wd(),{ok:false,engine:Xe.engine,tos:Xe.tos,app:Xe.app,note:"Not captured. Wait for room, or reload."})}const On={engineReady:xC,appReady:wC,rendererReady:CC,engine:()=>Xe.engine,tos:()=>Xe.tos,app:()=>Xe.app,renderer:()=>Xe.renderer,ticker:()=>Xe.ticker,stage:()=>Xe.stage,PIXI:()=>fe.PIXI||null,init:_C,hook:IC,ready:()=>!!Xe.engine};function Do(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Yi(){return On.tos()}function Hd(){return On.engine()}function TC(){const e=Yi()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Vd(e,t){const n=TC();return n?t*n+e|0:null}let Ta=null;async function PC(e=15e3){return pn.ready?true:Ta||(Ta=(async()=>{if(await On.init(e),!Yi())throw new Error("MGTile: engine captured but tileObject system not found");return pn.ready=true,true})(),Ta)}function Nr(e,t,n=true){const r=Yi(),o=Vd(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function ql(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Kd(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function ho(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Hd(),{gidx:l,tv:u}=Nr(Number(e),Number(t),o);if(l==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");const f=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:l,before:f,after:u.tileObject}}function Js(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=Nr(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const l=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Do(l):l}}function MC(e,t,n={}){return ho(e,t,null,n)}function LC(e,t,n,r={}){const i=Js(e,t,{...r,clone:false}).tileView?.tileObject;Kd(i,"plant");const a=Do(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const l=Number(n.slotIdx)|0;if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);return ql(a.slots[l],n.slotPatch),ho(e,t,a,r)}if("slots"in n){const l=n.slots;if(Array.isArray(l)){for(let u=0;u<l.length;u++)if(l[u]!=null){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);ql(a.slots[u],l[u]);}}else if(l&&typeof l=="object")for(const u of Object.keys(l)){const f=Number(u)|0;if(Number.isFinite(f)){if(!a.slots[f])throw new Error(`MGTile: plant slot ${f} doesn't exist`);ql(a.slots[f],l[f]);}}else throw new Error("MGTile: patch.slots must be array or object map");return ho(e,t,a,r)}return ho(e,t,a,r)}function RC(e,t,n,r={}){const i=Js(e,t,{...r,clone:false}).tileView?.tileObject;Kd(i,"decor");const a=Do(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),ho(e,t,a,r)}function FC(e,t,n,r={}){const i=Js(e,t,{...r,clone:false}).tileView?.tileObject;Kd(i,"egg");const a=Do(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),ho(e,t,a,r)}function OC(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Hd(),{gidx:l,tv:u}=Nr(Number(e),Number(t),o);if(l==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");const f=u.tileObject,p=typeof n=="function"?n(Do(f)):n;if(u.onDataChanged(p),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:l,before:f,after:u.tileObject}}function DC(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=Nr(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,l=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:l?.objectType??null,tileObject:a?Do(l):l,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Xl(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function es(e){const t=wn(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=wn(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function NC(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=es(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function $C(){const e=Yi(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const l=Nr(i,a,true).tv,u=i+1<t?Nr(i+1,a,true).tv:null,f=Nr(i,a+1,true).tv,p=Xl(l),m=Xl(u),b=Xl(f);if(!p||!m||!b)continue;const y=es(p),g=es(m),A=es(b);if(!y||!g||!A)continue;const M={x:g.x-y.x,y:g.y-y.y},I={x:A.x-y.x,y:A.y-y.y},L=M.x*I.y-M.y*I.x;if(!Number.isFinite(L)||Math.abs(L)<1e-6)continue;const D=1/L,z={a:I.y*D,b:-I.x*D,c:-M.y*D,d:M.x*D},O={x:y.x-i*M.x-a*I.x,y:y.y-i*M.y-a*I.y},T=NC(p),R=T==="center"?O:{x:O.x+.5*(M.x+I.x),y:O.y+.5*(M.y+I.y)};return {ok:true,cols:t,rows:r,vx:M,vy:I,inv:z,anchorMode:T,originCenter:R}}return null}function fm(){return pn.xform=$C(),pn.xformAt=Date.now(),{ok:!!pn.xform?.ok,xform:pn.xform}}function BC(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!pn.xform?.ok||t.forceRebuild||Date.now()-pn.xformAt>n)&&fm();const r=pn.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,l=r.inv.c*o+r.inv.d*i,u=Math.floor(a),f=Math.floor(l),p=[[u,f],[u+1,f],[u,f+1],[u+1,f+1]];let m=null,b=1/0;for(const[y,g]of p){if(y<0||g<0||y>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const A=r.originCenter.x+y*r.vx.x+g*r.vy.x,M=r.originCenter.y+y*r.vx.y+g*r.vy.y,I=(e.x-A)**2+(e.y-M)**2;I<b&&(b=I,m={tx:y,ty:g,fx:a,fy:l,x:e.x,y:e.y,gidx:null});}return m?(m.gidx=Vd(m.tx,m.ty),m):null}function zC(e,t){const n=pn.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function bn(){if(!cm())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function jC(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const tr={init:PC,isReady:cm,hook:On.hook,engine:Hd,tos:Yi,gidx:(e,t)=>Vd(Number(e),Number(t)),getTileObject:(e,t,n={})=>(bn(),Js(e,t,n)),inspect:(e,t,n={})=>(bn(),DC(e,t,n)),setTileEmpty:(e,t,n={})=>(bn(),MC(e,t,n)),setTilePlant:(e,t,n,r={})=>(bn(),LC(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(bn(),RC(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(bn(),FC(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(bn(),OC(e,t,n,r)),rebuildTransform:()=>(bn(),fm()),pointToTile:(e,t={})=>(bn(),BC(e,t)),tileToPoint:(e,t)=>(bn(),zC(e,t)),getTransform:()=>(bn(),pn.xform),help:jC};function GC(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const Ie=GC();function hm(){return Ie.ready}async function UC(e=15e3){if(Ie.ready)return Wc(),true;if(await On.init(e),Ie.app=On.app(),Ie.ticker=On.ticker(),Ie.renderer=On.renderer(),Ie.stage=On.stage(),!Ie.app||!Ie.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return Ie.ready=true,Wc(),true}function Wc(){const e=fe;return e.$PIXI=e.PIXI||null,e.$app=Ie.app||null,e.$renderer=Ie.renderer||null,e.$stage=Ie.stage||null,e.$ticker=Ie.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:Ie.ready},e.__MG_PIXI__}function Yd(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Hc(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function As(e){return !!(e&&typeof e.tint=="number")}function Gr(e){return !!(e&&typeof e.alpha=="number")}function ts(e,t,n){return e+(t-e)*n}function WC(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,l=t>>8&255,u=t&255,f=ts(r,a,n)|0,p=ts(o,l,n)|0,m=ts(i,u,n)|0;return f<<16|p<<8|m}function HC(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;As(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function VC(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;Gr(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let l=a.length-1;l>=0;l--)r.push(a[l]);}return n}const KC=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Vc(e){if(!e)return null;if(Hc(e))return e;if(!Yd(e))return null;for(const t of KC){const n=e[t];if(Hc(n))return n}return null}function YC(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const l=new Array(t);let u=true;for(let f=0;f<t;f++){const p=Vc(i[f]);if(!p){u=false;break}l[f]=p;}if(u)return l}for(const l of i)n.push({o:l,d:a+1});continue}if(Yd(i)){const l=i;for(const u of Object.keys(l))n.push({o:l[u],d:a+1});}}}return null}function mm(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Yd(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function qC(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=mm(t);return Ie.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function XC(e){return Ie.tileSets.delete(String(e||"").trim())}function QC(){return Array.from(Ie.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function gm(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function qd(e){const n=tr.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!gm(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=Ie.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=mm(e.tiles||[]);const o=new Map;for(const i of r){const a=tr.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Xd(e){const t=Ie.highlights.get(e);if(!t)return  false;wn(()=>Ie.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Gr(t.root)&&wn(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&As(n.o)&&wn(()=>{n.o.tint=n.baseTint;});return Ie.highlights.delete(e),true}function bm(e=null){for(const t of Array.from(Ie.highlights.keys()))e&&!String(t).startsWith(e)||Xd(t);return  true}function vm(e,t={}){if(!Hc(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(Ie.highlights.has(n))return n;const r=Gr(e)?Number(e.alpha):null,o=Dn(Number(t.minAlpha??.12),0,1),i=Dn(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),l=(t.tint??8386303)>>>0,u=Dn(Number(t.tintMix??.85),0,1),f=t.deepTint!==false,p=[];if(f)for(const y of HC(e))p.push({o:y,baseTint:y.tint});else As(e)&&p.push({o:e,baseTint:e.tint});const m=performance.now(),b=()=>{const y=(performance.now()-m)/1e3,g=(Math.sin(y*Math.PI*2*a)+1)/2,A=g*g*(3-2*g);r!=null&&Gr(e)&&(e.alpha=Dn(ts(o,i,A)*r,0,1));const M=A*u;for(const I of p)I.o&&As(I.o)&&(I.o.tint=WC(I.baseTint,l,M));};return Ie.ticker?.add(b),Ie.highlights.set(n,{root:e,tick:b,baseAlpha:r,tint:p}),n}function JC(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function ym(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=qd(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)bm(i);else for(const m of Array.from(Ie.highlights.keys())){if(!m.startsWith(i))continue;const b=m.split(":"),y=Number(b[2]);o.has(y)&&Xd(m);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let l=0,u=0,f=0,p=0;for(const[m,b]of r){const y=b?.tileObject;if(!y||y.objectType!=="plant")continue;const g=y.slots;if(!Array.isArray(g)||g.length===0)continue;let A=false;const M=[];for(let D=0;D<g.length;D++)JC(g[D],n)&&(M.push(D),A=true);if(!A)continue;l++,u+=M.length;const I=b?.childView?.plantVisual||b?.childView||b,L=YC(I,g.length);if(!L){p+=M.length;continue}for(const D of M){const z=L[D];if(!z){p++;continue}const O=`${i}${m}:${D}`;Ie.highlights.has(O)||(vm(z,{key:O,...a}),f++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:l,matchedSlots:u,newHighlights:f,failedSlots:p}}function ZC(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Ie.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{wn(()=>ym(n,{...t,clear:!1}));},o);return Ie.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function ek(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Ie.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),Ie.watches.delete(i),o++);return o>0}const n=Ie.watches.get(t);return n?(clearInterval(n),Ie.watches.delete(t),true):false}function tk(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Vc(t)||Vc(e?.displayObject)||null}function xm(e){const t=Ie.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Gr(n.o)&&Number.isFinite(n.baseAlpha)&&wn(()=>{n.o.alpha=n.baseAlpha;});return Ie.fades.delete(e),true}function Kc(e=null){for(const t of Array.from(Ie.fades.keys()))e&&!String(t).startsWith(e)||xm(t);return  true}function wm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!gm(t))return Kc(r);const{gidxSet:o}=qd(t);if(!o)return Kc(r);for(const i of Array.from(Ie.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&xm(i);}return  true}function Cm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=Dn(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=qd(t),l=`fade:${n}:`;t.clear===true&&wm(n,t);let u=0,f=0,p=0,m=0;for(const[b,y]of i){const g=y?.tileObject;if(!g||g.objectType!=="plant")continue;u++;const A=String(g.species||"").trim().toLowerCase();if(!A||A!==n)continue;f++;const M=tk(y);if(!M||!Gr(M)){m++;continue}const I=`${l}${b}`;if(Ie.fades.has(I)){wn(()=>{M.alpha=r;}),p++;continue}const L=o?VC(M):[M],D=[];for(const z of L)Gr(z)&&D.push({o:z,baseAlpha:Number(z.alpha)});for(const z of D)wn(()=>{z.o.alpha=r;});Ie.fades.set(I,{targets:D}),p++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:u,matchedPlants:f,applied:p,failed:m,totalFades:Ie.fades.size}}function nk(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Ie.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{wn(()=>Cm(n,{...t,clear:!1}));},o);return Ie.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function rk(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Ie.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),Ie.fadeWatches.delete(i),o++);return o>0}const n=Ie.fadeWatches.get(t);return n?(clearInterval(n),Ie.fadeWatches.delete(t),true):false}function ok(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function ik(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=tr.getTileObject(r,o,{ensureView:i,clone:false}),l=a?.tileView||null,u=l?.tileObject,f={ok:true,tx:r,ty:o,gidx:a?.gidx??tr.gidx?.(r,o)??null,hasTileView:!!l,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?ok(u):u?{objectType:u.objectType??null}:null,display:l?l.childView?.plantVisual||l.childView||l.displayObject||l:null};return n.log!==false&&wn(()=>console.log("[MGPixi.inspectTile]",f)),f}function ak(e,t,n){const r=fe.PIXI;if(!r)return;let o=Ie.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",Ie.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const l=tr.tileToPoint(e,t);if(!l)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const u=tr.getTransform(),f=u?Math.hypot(u.vx.x,u.vx.y):32,p=u?Math.hypot(u.vy.x,u.vy.y):32;a.drawRect(0,0,f,p),a.endFill(),a.x=l.x,a.y=l.y,u&&(a.rotation=Math.atan2(u.vx.y,u.vx.x));}function sk(e){const t=Ie.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Lt(){if(!hm())throw new Error("MGPixi: call MGPixi.init() first")}const Zs={init:UC,isReady:hm,expose:Wc,get app(){return Ie.app},get renderer(){return Ie.renderer},get stage(){return Ie.stage},get ticker(){return Ie.ticker},get PIXI(){return fe.PIXI||null},defineTileSet:(e,t)=>(Lt(),qC(e,t)),deleteTileSet:e=>(Lt(),XC(e)),listTileSets:()=>(Lt(),QC()),highlightPulse:(e,t)=>(Lt(),vm(e,t)),stopHighlight:e=>(Lt(),Xd(e)),clearHighlights:e=>(Lt(),bm(e)),drawOverlayBox:(e,t,n)=>(Lt(),ak(e,t,n)),stopOverlay:e=>(Lt(),sk(e)),highlightMutation:(e,t)=>(Lt(),ym(e,t)),watchMutation:(e,t)=>(Lt(),ZC(e,t)),stopWatchMutation:e=>(Lt(),ek(e)),inspectTile:(e,t,n)=>(Lt(),ik(e,t,n)),fadeSpecies:(e,t)=>(Lt(),Cm(e,t)),clearSpeciesFade:(e,t)=>(Lt(),wm(e,t)),clearFades:e=>(Lt(),Kc(e)),watchFadeSpecies:(e,t)=>(Lt(),nk(e,t)),stopWatchFadeSpecies:e=>(Lt(),rk(e))},lk=["Top","Mid","Bottom","DiscordAvatarPlaceholder"],Ql={AVATAR:/avatarelements[^"'`\s]*\.riv/,EMOTES:/emotes[^"'`\s]*\.riv/,UI:/(giftbox|currency|bread|donut|streak|countdown|loader)[^"'`\s]*\.riv/},km=new Map;let Es=[],Sm=false;function ck(e){return km.get(e)}function dk(e,t){km.set(e,t);}function el(){return [...Es]}function uk(e){Es=e;}function Am(e){Es.some(t=>t.url===e.url)||Es.push(e);}function pk(){return Sm}function jp(e){Sm=e;}const mo=[];let Ar=null;function fk(){if(Ar)return Ar;const e=window.fetch;window.fetch=function(r,o){const i=Up(r);return i&&i.endsWith(".riv")&&Gp(i),e.call(this,r,o)},Ar=()=>{window.fetch===t&&(window.fetch=e),Ar=null;};function t(n,r){const o=Up(n);return o&&o.endsWith(".riv")&&Gp(o),e.call(window,n,r)}return window.fetch=t,Ar=()=>{window.fetch===t&&(window.fetch=e),Ar=null;},Ar}function Gp(e){const t=Rt.detect(),n=e.startsWith("/")?`${t.origin}${e}`:e,r=_m(e),o=Im(e),i={name:o,url:n,type:r};Am(i),console.log(`[MGRiveLoader] Intercepted .riv fetch: ${o} (${r})`,n);for(let a=mo.length-1;a>=0;a--){const l=mo[a];l.type===r&&(clearTimeout(l.timer),l.resolve(i),mo.splice(a,1));}}async function hk(){const t=Rt.detect().origin,n=Array.from(document.scripts),r=[];for(const i of n){const a=i.textContent||"",l=Wp(a,t);r.push(...l);}for(const i of n)if(i.src)try{if(new URL(i.src).origin!==t)continue;const l=await fetch(i.src);if(!l.ok)continue;const u=await l.text(),f=Wp(u,t);r.push(...f);}catch(a){console.debug("[MGRiveLoader] Failed to fetch script:",i.src,a);}const o=Array.from(new Map(r.map(i=>[i.url,i])).values());for(const i of o)Am(i);return el()}async function mk(){fk();const e=await hk();return uk(e),console.log(`[MGRiveLoader] Discovered ${e.length} .riv files:`,e),e}function gk(e,t=3e4){const n=el().find(r=>r.type===e);return n?Promise.resolve(n):new Promise(r=>{const o=setTimeout(()=>{const i=mo.findIndex(a=>a.resolve===r);i!==-1&&mo.splice(i,1),console.warn(`[MGRiveLoader] Timed out waiting for ${e} .riv file`),r(null);},t);mo.push({type:e,resolve:r,timer:o});})}async function Em(){const e=el().find(n=>n.type==="avatar");if(e)return e;console.log("[MGRiveLoader] Avatar .riv not found yet, waiting for game to load it...");const t=await gk("avatar",3e4);return t||console.warn("[MGRiveLoader] Could not find avatar .riv file"),t}function Up(e){return typeof e=="string"?e:e instanceof URL?e.href:e instanceof Request?e.url:null}function Wp(e,t){const n=[],r=new Set,o=/["'`]([^"'`]*\.riv)["'`]/g;let i;for(;(i=o.exec(e))!==null;){const a=i[1],l=_m(a);if(l==="other"&&!a.endsWith(".riv")||r.has(a))continue;r.add(a);const u=a.startsWith("/")?`${t}${a}`:a;n.push({name:Im(a),url:u,type:l});}return n}function _m(e){return Ql.AVATAR.test(e)?"avatar":Ql.EMOTES.test(e)?"emote":Ql.UI.test(e)?"ui":"other"}function Im(e){const t=e.split("/");return t[t.length-1].replace(/-[a-zA-Z0-9_]+\.riv$/,"")}var ns={exports:{}},bk=ns.exports,Hp;function vk(){return Hp||(Hp=1,(function(e,t){(function(r,o){e.exports=o();})(bk,()=>(()=>{var n=[,((a,l,u)=>{u.r(l),u.d(l,{default:()=>p});var f=(()=>{var m=typeof document<"u"?document.currentScript?.src:void 0;return(function(b={}){var y,g=b,A,M,I=new Promise((s,c)=>{A=s,M=c;}),L=typeof window=="object",D=typeof importScripts=="function";function z(){function s(H){const K=w;v=c=0,w=new Map,K.forEach(oe=>{try{oe(H);}catch(ee){console.error(ee);}}),this.ob(),_&&_.Qb();}let c=0,v=0,w=new Map,_=null,N=null;this.requestAnimationFrame=function(H){c||(c=requestAnimationFrame(s.bind(this)));const K=++v;return w.set(K,H),K},this.cancelAnimationFrame=function(H){w.delete(H),c&&w.size==0&&(cancelAnimationFrame(c),c=0);},this.Ob=function(H){N&&(document.body.remove(N),N=null),H||(N=document.createElement("div"),N.style.backgroundColor="black",N.style.position="fixed",N.style.right=0,N.style.top=0,N.style.color="white",N.style.padding="4px",N.innerHTML="RIVE FPS",H=function(K){N.innerHTML="RIVE FPS "+K.toFixed(1);},document.body.appendChild(N)),_=new function(){let K=0,oe=0;this.Qb=function(){var ee=performance.now();oe?(++K,ee-=oe,1e3<ee&&(H(1e3*K/ee),K=oe=0)):(oe=ee,K=0);};};},this.Lb=function(){N&&(document.body.remove(N),N=null),_=null;},this.ob=function(){};}function O(s){console.assert(true);const c=new Map;let v=-1/0;this.push=function(w){return w=w+((1<<s)-1)>>s,c.has(w)&&clearTimeout(c.get(w)),c.set(w,setTimeout(function(){c.delete(w),c.length==0?v=-1/0:w==v&&(v=Math.max(...c.keys()),console.assert(v<w));},1e3)),v=Math.max(w,v),v<<s};}const T=g.onRuntimeInitialized;g.onRuntimeInitialized=function(){T&&T();let s=g.decodeAudio;g.decodeAudio=function(_,N){_=s(_),N(_);};let c=g.decodeFont;g.decodeFont=function(_,N){_=c(_),N(_);};const v=g.FileAssetLoader;g.ptrToAsset=_=>{let N=g.ptrToFileAsset(_);return N.isImage?g.ptrToImageAsset(_):N.isFont?g.ptrToFontAsset(_):N.isAudio?g.ptrToAudioAsset(_):N},g.CustomFileAssetLoader=v.extend("CustomFileAssetLoader",{__construct:function({loadContents:_}){this.__parent.__construct.call(this),this.Eb=_;},loadContents:function(_,N){return _=g.ptrToAsset(_),this.Eb(_,N)}}),g.CDNFileAssetLoader=v.extend("CDNFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this);},loadContents:function(_){let N=g.ptrToAsset(_);return _=N.cdnUuid,_===""?false:((function(H,K){var oe=new XMLHttpRequest;oe.responseType="arraybuffer",oe.onreadystatechange=function(){oe.readyState==4&&oe.status==200&&K(oe);},oe.open("GET",H,true),oe.send(null);})(N.cdnBaseUrl+"/"+_,H=>{N.decode(new Uint8Array(H.response));}),true)}}),g.FallbackFileAssetLoader=v.extend("FallbackFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this),this.kb=[];},addLoader:function(_){this.kb.push(_);},loadContents:function(_,N){for(let H of this.kb)if(H.loadContents(_,N))return  true;return  false}});let w=g.computeAlignment;g.computeAlignment=function(_,N,H,K,oe=1){return w.call(this,_,N,H,K,oe)};};const R="createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(" "),P=new function(){function s(){if(!c){let Ne=function(Ue,ke,ot){if(ke=pe.createShader(ke),pe.shaderSource(ke,ot),pe.compileShader(ke),ot=pe.getShaderInfoLog(ke),0<(ot||"").length)throw ot;pe.attachShader(Ue,ke);};var X=document.createElement("canvas"),be={alpha:1,depth:0,stencil:0,antialias:0,premultipliedAlpha:1,preserveDrawingBuffer:0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:1,explicitSwapControl:1,renderViaOffscreenBackBuffer:1};let pe;if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){if(pe=X.getContext("webgl",be),v=1,!pe)return console.log("No WebGL support. Image mesh will not be drawn."),false}else if(pe=X.getContext("webgl2",be))v=2;else if(pe=X.getContext("webgl",be))v=1;else return console.log("No WebGL support. Image mesh will not be drawn."),false;if(pe=new Proxy(pe,{get(Ue,ke){if(Ue.isContextLost()){if(oe||(console.error("Cannot render the mesh because the GL Context was lost. Tried to invoke ",ke),oe=true),typeof Ue[ke]=="function")return function(){}}else return typeof Ue[ke]=="function"?function(...ot){return Ue[ke].apply(Ue,ot)}:Ue[ke]},set(Ue,ke,ot){if(Ue.isContextLost())oe||(console.error("Cannot render the mesh because the GL Context was lost. Tried to set property "+ke),oe=true);else return Ue[ke]=ot,true}}),w=Math.min(pe.getParameter(pe.MAX_RENDERBUFFER_SIZE),pe.getParameter(pe.MAX_TEXTURE_SIZE)),X=pe.createProgram(),Ne(X,pe.VERTEX_SHADER,`attribute vec2 vertex;
                attribute vec2 uv;
                uniform vec4 mat;
                uniform vec2 translate;
                varying vec2 st;
                void main() {
                    st = uv;
                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);
                }`),Ne(X,pe.FRAGMENT_SHADER,`precision highp float;
                uniform sampler2D image;
                varying vec2 st;
                void main() {
                    gl_FragColor = texture2D(image, st);
                }`),pe.bindAttribLocation(X,0,"vertex"),pe.bindAttribLocation(X,1,"uv"),pe.linkProgram(X),be=pe.getProgramInfoLog(X),0<(be||"").trim().length)throw be;_=pe.getUniformLocation(X,"mat"),N=pe.getUniformLocation(X,"translate"),pe.useProgram(X),pe.bindBuffer(pe.ARRAY_BUFFER,pe.createBuffer()),pe.enableVertexAttribArray(0),pe.enableVertexAttribArray(1),pe.bindBuffer(pe.ELEMENT_ARRAY_BUFFER,pe.createBuffer()),pe.uniform1i(pe.getUniformLocation(X,"image"),0),pe.pixelStorei(pe.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true),c=pe;}return  true}let c=null,v=0,w=0,_=null,N=null,H=0,K=0,oe=false;s(),this.bc=function(){return s(),w},this.Kb=function(X){c.deleteTexture&&c.deleteTexture(X);},this.Jb=function(X){if(!s())return null;const be=c.createTexture();return be?(c.bindTexture(c.TEXTURE_2D,be),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,X),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR),v==2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR_MIPMAP_LINEAR),c.generateMipmap(c.TEXTURE_2D)):c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR),be):null};const ee=new O(8),me=new O(8),Se=new O(10),Ae=new O(10);this.Nb=function(X,be,pe,Ne,Ue){if(s()){var ke=ee.push(X),ot=me.push(be);if(c.canvas){(c.canvas.width!=ke||c.canvas.height!=ot)&&(c.canvas.width=ke,c.canvas.height=ot),c.viewport(0,ot-be,X,be),c.disable(c.SCISSOR_TEST),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),c.enable(c.SCISSOR_TEST),pe.sort((qe,Pn)=>Pn.vb-qe.vb),ke=Se.push(Ne),H!=ke&&(c.bufferData(c.ARRAY_BUFFER,8*ke,c.DYNAMIC_DRAW),H=ke),ke=0;for(var It of pe)c.bufferSubData(c.ARRAY_BUFFER,ke,It.Ta),ke+=4*It.Ta.length;console.assert(ke==4*Ne);for(var Jt of pe)c.bufferSubData(c.ARRAY_BUFFER,ke,Jt.Bb),ke+=4*Jt.Bb.length;console.assert(ke==8*Ne),ke=Ae.push(Ue),K!=ke&&(c.bufferData(c.ELEMENT_ARRAY_BUFFER,2*ke,c.DYNAMIC_DRAW),K=ke),It=0;for(var wr of pe)c.bufferSubData(c.ELEMENT_ARRAY_BUFFER,It,wr.indices),It+=2*wr.indices.length;console.assert(It==2*Ue),wr=0,Jt=true,ke=It=0;for(const qe of pe){qe.image.Ja!=wr&&(c.bindTexture(c.TEXTURE_2D,qe.image.Ia||null),wr=qe.image.Ja),qe.hc?(c.scissor(qe.Za,ot-qe.$a-qe.jb,qe.uc,qe.jb),Jt=true):Jt&&(c.scissor(0,ot-be,X,be),Jt=false),pe=2/X;const Pn=-2/be;c.uniform4f(_,qe.ha[0]*pe*qe.Aa,qe.ha[1]*Pn*qe.Ba,qe.ha[2]*pe*qe.Aa,qe.ha[3]*Pn*qe.Ba),c.uniform2f(N,qe.ha[4]*pe*qe.Aa+pe*(qe.Za-qe.cc*qe.Aa)-1,qe.ha[5]*Pn*qe.Ba+Pn*(qe.$a-qe.dc*qe.Ba)+1),c.vertexAttribPointer(0,2,c.FLOAT,false,0,ke),c.vertexAttribPointer(1,2,c.FLOAT,false,0,ke+4*Ne),c.drawElements(c.TRIANGLES,qe.indices.length,c.UNSIGNED_SHORT,It),ke+=4*qe.Ta.length,It+=2*qe.indices.length;}console.assert(ke==4*Ne),console.assert(It==2*Ue);}}},this.canvas=function(){return s()&&c.canvas};},C=g.onRuntimeInitialized;g.onRuntimeInitialized=function(){function s(ue){switch(ue){case ee.srcOver:return "source-over";case ee.screen:return "screen";case ee.overlay:return "overlay";case ee.darken:return "darken";case ee.lighten:return "lighten";case ee.colorDodge:return "color-dodge";case ee.colorBurn:return "color-burn";case ee.hardLight:return "hard-light";case ee.softLight:return "soft-light";case ee.difference:return "difference";case ee.exclusion:return "exclusion";case ee.multiply:return "multiply";case ee.hue:return "hue";case ee.saturation:return "saturation";case ee.color:return "color";case ee.luminosity:return "luminosity"}}function c(ue){return "rgba("+((16711680&ue)>>>16)+","+((65280&ue)>>>8)+","+((255&ue)>>>0)+","+((4278190080&ue)>>>24)/255+")"}function v(){0<ot.length&&(P.Nb(ke.drawWidth(),ke.drawHeight(),ot,It,Jt),ot=[],Jt=It=0,ke.reset(512,512));for(const ue of Ue){for(const Ce of ue.I)Ce();ue.I=[];}Ue.clear();}C&&C();var w=g.RenderPaintStyle;const _=g.RenderPath,N=g.RenderPaint,H=g.Renderer,K=g.StrokeCap,oe=g.StrokeJoin,ee=g.BlendMode,me=w.fill,Se=w.stroke,Ae=g.FillRule.evenOdd;let X=1;var be=g.RenderImage.extend("CanvasRenderImage",{__construct:function({la:ue,wa:Ce}={}){this.__parent.__construct.call(this),this.Ja=X,X=X+1&2147483647||1,this.la=ue,this.wa=Ce;},__destruct:function(){this.Ia&&(P.Kb(this.Ia),URL.revokeObjectURL(this.Wa)),this.__parent.__destruct.call(this);},decode:function(ue){var Ce=this;Ce.wa&&Ce.wa(Ce);var We=new Image;Ce.Wa=URL.createObjectURL(new Blob([ue],{type:"image/png"})),We.onload=function(){Ce.Db=We,Ce.Ia=P.Jb(We),Ce.size(We.width,We.height),Ce.la&&Ce.la(Ce);},We.src=Ce.Wa;}}),pe=_.extend("CanvasRenderPath",{__construct:function(){this.__parent.__construct.call(this),this.U=new Path2D;},rewind:function(){this.U=new Path2D;},addPath:function(ue,Ce,We,ze,Ze,He,je){var nt=this.U,Mn=nt.addPath;ue=ue.U;const wt=new DOMMatrix;wt.a=Ce,wt.b=We,wt.c=ze,wt.d=Ze,wt.e=He,wt.f=je,Mn.call(nt,ue,wt);},fillRule:function(ue){this.Va=ue;},moveTo:function(ue,Ce){this.U.moveTo(ue,Ce);},lineTo:function(ue,Ce){this.U.lineTo(ue,Ce);},cubicTo:function(ue,Ce,We,ze,Ze,He){this.U.bezierCurveTo(ue,Ce,We,ze,Ze,He);},close:function(){this.U.closePath();}}),Ne=N.extend("CanvasRenderPaint",{color:function(ue){this.Xa=c(ue);},thickness:function(ue){this.Gb=ue;},join:function(ue){switch(ue){case oe.miter:this.Ha="miter";break;case oe.round:this.Ha="round";break;case oe.bevel:this.Ha="bevel";}},cap:function(ue){switch(ue){case K.butt:this.Ga="butt";break;case K.round:this.Ga="round";break;case K.square:this.Ga="square";}},style:function(ue){this.Fb=ue;},blendMode:function(ue){this.Cb=s(ue);},clearGradient:function(){this.ja=null;},linearGradient:function(ue,Ce,We,ze){this.ja={xb:ue,yb:Ce,cb:We,eb:ze,Qa:[]};},radialGradient:function(ue,Ce,We,ze){this.ja={xb:ue,yb:Ce,cb:We,eb:ze,Qa:[],ac:true};},addStop:function(ue,Ce){this.ja.Qa.push({color:ue,stop:Ce});},completeGradient:function(){},draw:function(ue,Ce,We,ze){let Ze=this.Fb;var He=this.Xa,je=this.ja;const nt=ue.globalCompositeOperation,Mn=ue.globalAlpha;if(ue.globalCompositeOperation=this.Cb,ue.globalAlpha=ze,je!=null){He=je.xb;const Zt=je.yb,St=je.cb;var wt=je.eb;ze=je.Qa,je.ac?(je=St-He,wt-=Zt,He=ue.createRadialGradient(He,Zt,0,He,Zt,Math.sqrt(je*je+wt*wt))):He=ue.createLinearGradient(He,Zt,St,wt);for(let to=0,ya=ze.length;to<ya;to++)je=ze[to],He.addColorStop(je.stop,c(je.color));this.Xa=He,this.ja=null;}switch(Ze){case Se:ue.strokeStyle=He,ue.lineWidth=this.Gb,ue.lineCap=this.Ga,ue.lineJoin=this.Ha,ue.stroke(Ce);break;case me:ue.fillStyle=He,ue.fill(Ce,We);}ue.globalCompositeOperation=nt,ue.globalAlpha=Mn;}});const Ue=new Set;let ke=null,ot=[],It=0,Jt=0;var wr=g.CanvasRenderer=H.extend("Renderer",{__construct:function(ue){this.__parent.__construct.call(this),this.T=[1,0,0,1,0,0],this.G=[1],this.B=ue.getContext("2d"),this.Ua=ue,this.I=[];},save:function(){this.T.push(...this.T.slice(this.T.length-6)),this.G.push(this.G[this.G.length-1]),this.I.push(this.B.save.bind(this.B));},restore:function(){const ue=this.T.length-6;if(6>ue)throw "restore() called without matching save().";this.T.splice(ue),this.G.pop(),this.I.push(this.B.restore.bind(this.B));},transform:function(ue,Ce,We,ze,Ze,He){const je=this.T,nt=je.length-6;je.splice(nt,6,je[nt]*ue+je[nt+2]*Ce,je[nt+1]*ue+je[nt+3]*Ce,je[nt]*We+je[nt+2]*ze,je[nt+1]*We+je[nt+3]*ze,je[nt]*Ze+je[nt+2]*He+je[nt+4],je[nt+1]*Ze+je[nt+3]*He+je[nt+5]),this.I.push(this.B.transform.bind(this.B,ue,Ce,We,ze,Ze,He));},rotate:function(ue){const Ce=Math.sin(ue);ue=Math.cos(ue),this.transform(ue,Ce,-Ce,ue,0,0);},modulateOpacity:function(ue){this.G[this.G.length-1]*=ue;},_drawPath:function(ue,Ce){this.I.push(Ce.draw.bind(Ce,this.B,ue.U,ue.Va===Ae?"evenodd":"nonzero",Math.max(0,this.G[this.G.length-1])));},_drawRiveImage:function(ue,Ce,We,ze){var Ze=ue.Db;if(Ze){var He=this.B,je=s(We),nt=Math.max(0,ze*this.G[this.G.length-1]);this.I.push(function(){He.globalCompositeOperation=je,He.globalAlpha=nt,He.drawImage(Ze,0,0),He.globalAlpha=1;});}},_getMatrix:function(ue){const Ce=this.T,We=Ce.length-6;for(let ze=0;6>ze;++ze)ue[ze]=Ce[We+ze];},_drawImageMesh:function(ue,Ce,We,ze,Ze,He,je,nt,Mn,wt,Zt){Ce=this.B.canvas.width;var St=this.B.canvas.height;const to=wt-nt,ya=Zt-Mn;nt=Math.max(nt,0),Mn=Math.max(Mn,0),wt=Math.min(wt,Ce),Zt=Math.min(Zt,St);const Qo=wt-nt,Jo=Zt-Mn;if(console.assert(Qo<=Math.min(to,Ce)),console.assert(Jo<=Math.min(ya,St)),!(0>=Qo||0>=Jo)){wt=Qo<to||Jo<ya,Ce=Zt=1;var Cr=Math.ceil(Qo*Zt),kr=Math.ceil(Jo*Ce);St=P.bc(),Cr>St&&(Zt*=St/Cr,Cr=St),kr>St&&(Ce*=St/kr,kr=St),ke||(ke=new g.DynamicRectanizer(St),ke.reset(512,512)),St=ke.addRect(Cr,kr),0>St&&(v(),Ue.add(this),St=ke.addRect(Cr,kr),console.assert(0<=St));var Ap=St&65535,Ep=St>>16;ot.push({ha:this.T.slice(this.T.length-6),image:ue,Za:Ap,$a:Ep,cc:nt,dc:Mn,uc:Cr,jb:kr,Aa:Zt,Ba:Ce,Ta:new Float32Array(Ze),Bb:new Float32Array(He),indices:new Uint16Array(je),hc:wt,vb:ue.Ja<<1|(wt?1:0)}),It+=Ze.length,Jt+=je.length;var no=this.B,dy=s(We),uy=Math.max(0,ze*this.G[this.G.length-1]);this.I.push(function(){no.save(),no.resetTransform(),no.globalCompositeOperation=dy,no.globalAlpha=uy;const _p=P.canvas();_p&&no.drawImage(_p,Ap,Ep,Cr,kr,nt,Mn,Qo,Jo),no.restore();});}},_clipPath:function(ue){this.I.push(this.B.clip.bind(this.B,ue.U,ue.Va===Ae?"evenodd":"nonzero"));},clear:function(){Ue.add(this),this.I.push(this.B.clearRect.bind(this.B,0,0,this.Ua.width,this.Ua.height));},flush:function(){},translate:function(ue,Ce){this.transform(1,0,0,1,ue,Ce);}});g.makeRenderer=function(ue){const Ce=new wr(ue),We=Ce.B;return new Proxy(Ce,{get(ze,Ze){if(typeof ze[Ze]=="function")return function(...He){return ze[Ze].apply(ze,He)};if(typeof We[Ze]=="function"){if(-1<R.indexOf(Ze))throw Error("RiveException: Method call to '"+Ze+"()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.");return function(...He){Ce.I.push(We[Ze].bind(We,...He));}}return ze[Ze]},set(ze,Ze,He){if(Ze in We)return Ce.I.push(()=>{We[Ze]=He;}),true}})},g.decodeImage=function(ue,Ce){new be({la:Ce}).decode(ue);},g.renderFactory={makeRenderPaint:function(){return new Ne},makeRenderPath:function(){return new pe},makeRenderImage:function(){let ue=Pn;return new be({wa:()=>{ue.total++;},la:()=>{if(ue.loaded++,ue.loaded===ue.total){const Ce=ue.ready;Ce&&(Ce(),ue.ready=null);}}})}};let qe=g.load,Pn=null;g.load=function(ue,Ce,We=true){const ze=new g.FallbackFileAssetLoader;return Ce!==void 0&&ze.addLoader(Ce),We&&(Ce=new g.CDNFileAssetLoader,ze.addLoader(Ce)),new Promise(function(Ze){let He=null;Pn={total:0,loaded:0,ready:function(){Ze(He);}},He=qe(ue,ze),Pn.total==0&&Ze(He);})};let cy=g.RendererWrapper.prototype.align;g.RendererWrapper.prototype.align=function(ue,Ce,We,ze,Ze=1){cy.call(this,ue,Ce,We,ze,Ze);},w=new z,g.requestAnimationFrame=w.requestAnimationFrame.bind(w),g.cancelAnimationFrame=w.cancelAnimationFrame.bind(w),g.enableFPSCounter=w.Ob.bind(w),g.disableFPSCounter=w.Lb,w.ob=v,g.resolveAnimationFrame=v,g.cleanup=function(){ke&&ke.delete();};};var E=Object.assign({},g),B="./this.program",j="",V,U;(L||D)&&(D?j=self.location.href:typeof document<"u"&&document.currentScript&&(j=document.currentScript.src),m&&(j=m),j.startsWith("blob:")?j="":j=j.substr(0,j.replace(/[?#].*/,"").lastIndexOf("/")+1),D&&(U=s=>{var c=new XMLHttpRequest;return c.open("GET",s,false),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),V=(s,c,v)=>{if(Ht(s)){var w=new XMLHttpRequest;w.open("GET",s,true),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?c(w.response):v();},w.onerror=v,w.send(null);}else fetch(s,{credentials:"same-origin"}).then(_=>_.ok?_.arrayBuffer():Promise.reject(Error(_.status+" : "+_.url))).then(c,v);});var ce=g.print||console.log.bind(console),Y=g.printErr||console.error.bind(console);Object.assign(g,E),E=null,g.thisProgram&&(B=g.thisProgram);var ie;g.wasmBinary&&(ie=g.wasmBinary);var se,ae=false,ne,q,Z,F,$,Q,re,le;function ye(){var s=se.buffer;g.HEAP8=ne=new Int8Array(s),g.HEAP16=Z=new Int16Array(s),g.HEAPU8=q=new Uint8Array(s),g.HEAPU16=F=new Uint16Array(s),g.HEAP32=$=new Int32Array(s),g.HEAPU32=Q=new Uint32Array(s),g.HEAPF32=re=new Float32Array(s),g.HEAPF64=le=new Float64Array(s);}var _e=[],Be=[],xt=[];function Bt(){var s=g.preRun.shift();_e.unshift(s);}var dt=0,Et=null;function Wt(s){throw g.onAbort?.(s),s="Aborted("+s+")",Y(s),ae=true,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),M(s),s}var Mt=s=>s.startsWith("data:application/octet-stream;base64,"),Ht=s=>s.startsWith("file://"),tt;function De(s){if(s==tt&&ie)return new Uint8Array(ie);if(U)return U(s);throw "both async and sync fetching of the wasm failed"}function mn(s){return ie?Promise.resolve().then(()=>De(s)):new Promise((c,v)=>{V(s,w=>c(new Uint8Array(w)),()=>{try{c(De(s));}catch(w){v(w);}});})}function gn(s,c,v){return mn(s).then(w=>WebAssembly.instantiate(w,c)).then(v,w=>{Y(`failed to asynchronously prepare wasm: ${w}`),Wt(w);})}function pt(s,c){var v=tt;return ie||typeof WebAssembly.instantiateStreaming!="function"||Mt(v)||Ht(v)||typeof fetch!="function"?gn(v,s,c):fetch(v,{credentials:"same-origin"}).then(w=>WebAssembly.instantiateStreaming(w,s).then(c,function(_){return Y(`wasm streaming compile failed: ${_}`),Y("falling back to ArrayBuffer instantiation"),gn(v,s,c)}))}var kt,Vt,En={490930:(s,c,v,w,_)=>{if(typeof window>"u"||(window.AudioContext||window.webkitAudioContext)===void 0)return 0;if(typeof window.h>"u"){window.h={za:0},window.h.J={},window.h.J.xa=s,window.h.J.capture=c,window.h.J.Ka=v,window.h.ga={},window.h.ga.stopped=w,window.h.ga.wb=_;let N=window.h;N.D=[],N.sc=function(H){for(var K=0;K<N.D.length;++K)if(N.D[K]==null)return N.D[K]=H,K;return N.D.push(H),N.D.length-1},N.Ab=function(H){for(N.D[H]=null;0<N.D.length&&N.D[N.D.length-1]==null;)N.D.pop();},N.Pc=function(H){for(var K=0;K<N.D.length;++K)if(N.D[K]==H)return N.Ab(K)},N.qa=function(H){return N.D[H]},N.Sa=["touchend","click"],N.unlock=function(){for(var H=0;H<N.D.length;++H){var K=N.D[H];K!=null&&K.L!=null&&K.state===N.ga.wb&&K.L.resume().then(()=>{vp(K.pb);},oe=>{console.error("Failed to resume audiocontext",oe);});}N.Sa.map(function(oe){document.removeEventListener(oe,N.unlock,true);});},N.Sa.map(function(H){document.addEventListener(H,N.unlock,true);});}return window.h.za+=1,1},493108:()=>{typeof window.h<"u"&&(window.h.Sa.map(function(s){document.removeEventListener(s,window.h.unlock,true);}),--window.h.za,window.h.za===0&&delete window.h);},493412:()=>navigator.mediaDevices!==void 0&&navigator.mediaDevices.getUserMedia!==void 0,493516:()=>{try{var s=new(window.AudioContext||window.webkitAudioContext),c=s.sampleRate;return s.close(),c}catch{return 0}},493687:(s,c,v,w,_,N)=>{if(typeof window.h>"u")return  -1;var H={},K={};return s==window.h.J.xa&&v!=0&&(K.sampleRate=v),H.L=new(window.AudioContext||window.webkitAudioContext)(K),H.L.suspend(),H.state=window.h.ga.stopped,v=0,s!=window.h.J.xa&&(v=c),H.Z=H.L.createScriptProcessor(w,v,c),H.Z.onaudioprocess=function(oe){if((H.ra==null||H.ra.length==0)&&(H.ra=new Float32Array(re.buffer,_,w*c)),s==window.h.J.capture||s==window.h.J.Ka){for(var ee=0;ee<c;ee+=1)for(var me=oe.inputBuffer.getChannelData(ee),Se=H.ra,Ae=0;Ae<w;Ae+=1)Se[Ae*c+ee]=me[Ae];yp(N,w,_);}if(s==window.h.J.xa||s==window.h.J.Ka)for(xp(N,w,_),ee=0;ee<oe.outputBuffer.numberOfChannels;++ee)for(me=oe.outputBuffer.getChannelData(ee),Se=H.ra,Ae=0;Ae<w;Ae+=1)me[Ae]=Se[Ae*c+ee];else for(ee=0;ee<oe.outputBuffer.numberOfChannels;++ee)oe.outputBuffer.getChannelData(ee).fill(0);},s!=window.h.J.capture&&s!=window.h.J.Ka||navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(function(oe){H.Ca=H.L.createMediaStreamSource(oe),H.Ca.connect(H.Z),H.Z.connect(H.L.destination);}).catch(function(oe){console.log("Failed to get user media: "+oe);}),s==window.h.J.xa&&H.Z.connect(H.L.destination),H.pb=N,window.h.sc(H)},496564:s=>window.h.qa(s).L.sampleRate,496637:s=>{s=window.h.qa(s),s.Z!==void 0&&(s.Z.onaudioprocess=function(){},s.Z.disconnect(),s.Z=void 0),s.Ca!==void 0&&(s.Ca.disconnect(),s.Ca=void 0),s.L.close(),s.L=void 0,s.pb=void 0;},497037:s=>{window.h.Ab(s);},497087:s=>{s=window.h.qa(s),s.L.resume(),s.state=window.h.ga.wb;},497226:s=>{s=window.h.qa(s),s.L.suspend(),s.state=window.h.ga.stopped;}},nn=s=>{for(;0<s.length;)s.shift()(g);};function k(){var s=$[+Uo>>2];return Uo+=4,s}var d=(s,c)=>{for(var v=0,w=s.length-1;0<=w;w--){var _=s[w];_==="."?s.splice(w,1):_===".."?(s.splice(w,1),v++):v&&(s.splice(w,1),v--);}if(c)for(;v;v--)s.unshift("..");return s},h=s=>{var c=s.charAt(0)==="/",v=s.substr(-1)==="/";return (s=d(s.split("/").filter(w=>!!w),!c).join("/"))||c||(s="."),s&&v&&(s+="/"),(c?"/":"")+s},S=s=>{var c=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(s).slice(1);return s=c[0],c=c[1],!s&&!c?".":(c&&(c=c.substr(0,c.length-1)),s+c)},G=s=>{if(s==="/")return "/";s=h(s),s=s.replace(/\/$/,"");var c=s.lastIndexOf("/");return c===-1?s:s.substr(c+1)},W=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return s=>crypto.getRandomValues(s);Wt("initRandomDevice");},J=s=>(J=W())(s),de=(...s)=>{for(var c="",v=false,w=s.length-1;-1<=w&&!v;w--){if(v=0<=w?s[w]:"/",typeof v!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!v)return "";c=v+"/"+c,v=v.charAt(0)==="/";}return c=d(c.split("/").filter(_=>!!_),!v).join("/"),(v?"/":"")+c||"."},xe=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,ge=(s,c,v)=>{var w=c+v;for(v=c;s[v]&&!(v>=w);)++v;if(16<v-c&&s.buffer&&xe)return xe.decode(s.subarray(c,v));for(w="";c<v;){var _=s[c++];if(_&128){var N=s[c++]&63;if((_&224)==192)w+=String.fromCharCode((_&31)<<6|N);else {var H=s[c++]&63;_=(_&240)==224?(_&15)<<12|N<<6|H:(_&7)<<18|N<<12|H<<6|s[c++]&63,65536>_?w+=String.fromCharCode(_):(_-=65536,w+=String.fromCharCode(55296|_>>10,56320|_&1023));}}else w+=String.fromCharCode(_);}return w},we=[],Je=s=>{for(var c=0,v=0;v<s.length;++v){var w=s.charCodeAt(v);127>=w?c++:2047>=w?c+=2:55296<=w&&57343>=w?(c+=4,++v):c+=3;}return c},at=(s,c,v,w)=>{if(!(0<w))return 0;var _=v;w=v+w-1;for(var N=0;N<s.length;++N){var H=s.charCodeAt(N);if(55296<=H&&57343>=H){var K=s.charCodeAt(++N);H=65536+((H&1023)<<10)|K&1023;}if(127>=H){if(v>=w)break;c[v++]=H;}else {if(2047>=H){if(v+1>=w)break;c[v++]=192|H>>6;}else {if(65535>=H){if(v+2>=w)break;c[v++]=224|H>>12;}else {if(v+3>=w)break;c[v++]=240|H>>18,c[v++]=128|H>>12&63;}c[v++]=128|H>>6&63;}c[v++]=128|H&63;}}return c[v]=0,v-_};function Ke(s,c){var v=Array(Je(s)+1);return s=at(s,v,0,v.length),c&&(v.length=s),v}var _t=[];function gt(s,c){_t[s]={input:[],H:[],W:c},Al(s,qt);}var qt={open(s){var c=_t[s.node.ya];if(!c)throw new Ee(43);s.s=c,s.seekable=false;},close(s){s.s.W.pa(s.s);},pa(s){s.s.W.pa(s.s);},read(s,c,v,w){if(!s.s||!s.s.W.ib)throw new Ee(60);for(var _=0,N=0;N<w;N++){try{var H=s.s.W.ib(s.s);}catch{throw new Ee(29)}if(H===void 0&&_===0)throw new Ee(6);if(H==null)break;_++,c[v+N]=H;}return _&&(s.node.timestamp=Date.now()),_},write(s,c,v,w){if(!s.s||!s.s.W.Na)throw new Ee(60);try{for(var _=0;_<w;_++)s.s.W.Na(s.s,c[v+_]);}catch{throw new Ee(29)}return w&&(s.node.timestamp=Date.now()),_}},Xt={ib(){e:{if(!we.length){var s=null;if(typeof window<"u"&&typeof window.prompt=="function"&&(s=window.prompt("Input: "),s!==null&&(s+=`
`)),!s){s=null;break e}we=Ke(s,true);}s=we.shift();}return s},Na(s,c){c===null||c===10?(ce(ge(s.H,0)),s.H=[]):c!=0&&s.H.push(c);},pa(s){s.H&&0<s.H.length&&(ce(ge(s.H,0)),s.H=[]);},Yb(){return {Ac:25856,Cc:5,zc:191,Bc:35387,yc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Zb(){return 0},$b(){return [24,80]}},rn={Na(s,c){c===null||c===10?(Y(ge(s.H,0)),s.H=[]):c!=0&&s.H.push(c);},pa(s){s.H&&0<s.H.length&&(Y(ge(s.H,0)),s.H=[]);}};function Gn(s,c){var v=s.l?s.l.length:0;v>=c||(c=Math.max(c,v*(1048576>v?2:1.125)>>>0),v!=0&&(c=Math.max(c,256)),v=s.l,s.l=new Uint8Array(c),0<s.v&&s.l.set(v.subarray(0,s.v),0));}var Oe={O:null,V(){return Oe.createNode(null,"/",16895,0)},createNode(s,c,v,w){if((v&61440)===24576||(v&61440)===4096)throw new Ee(63);return Oe.O||(Oe.O={dir:{node:{Y:Oe.j.Y,R:Oe.j.R,ka:Oe.j.ka,ua:Oe.j.ua,tb:Oe.j.tb,zb:Oe.j.zb,ub:Oe.j.ub,sb:Oe.j.sb,Da:Oe.j.Da},stream:{ba:Oe.m.ba}},file:{node:{Y:Oe.j.Y,R:Oe.j.R},stream:{ba:Oe.m.ba,read:Oe.m.read,write:Oe.m.write,Ya:Oe.m.Ya,lb:Oe.m.lb,nb:Oe.m.nb}},link:{node:{Y:Oe.j.Y,R:Oe.j.R,ma:Oe.j.ma},stream:{}},ab:{node:{Y:Oe.j.Y,R:Oe.j.R},stream:Fv}}),v=Hu(s,c,v,w),(v.mode&61440)===16384?(v.j=Oe.O.dir.node,v.m=Oe.O.dir.stream,v.l={}):(v.mode&61440)===32768?(v.j=Oe.O.file.node,v.m=Oe.O.file.stream,v.v=0,v.l=null):(v.mode&61440)===40960?(v.j=Oe.O.link.node,v.m=Oe.O.link.stream):(v.mode&61440)===8192&&(v.j=Oe.O.ab.node,v.m=Oe.O.ab.stream),v.timestamp=Date.now(),s&&(s.l[c]=v,s.timestamp=v.timestamp),v},Gc(s){return s.l?s.l.subarray?s.l.subarray(0,s.v):new Uint8Array(s.l):new Uint8Array(0)},j:{Y(s){var c={};return c.Ec=(s.mode&61440)===8192?s.id:1,c.Ic=s.id,c.mode=s.mode,c.Lc=1,c.uid=0,c.Hc=0,c.ya=s.ya,(s.mode&61440)===16384?c.size=4096:(s.mode&61440)===32768?c.size=s.v:(s.mode&61440)===40960?c.size=s.link.length:c.size=0,c.wc=new Date(s.timestamp),c.Kc=new Date(s.timestamp),c.Dc=new Date(s.timestamp),c.Hb=4096,c.xc=Math.ceil(c.size/c.Hb),c},R(s,c){if(c.mode!==void 0&&(s.mode=c.mode),c.timestamp!==void 0&&(s.timestamp=c.timestamp),c.size!==void 0&&(c=c.size,s.v!=c))if(c==0)s.l=null,s.v=0;else {var v=s.l;s.l=new Uint8Array(c),v&&s.l.set(v.subarray(0,Math.min(c,s.v))),s.v=c;}},ka(){throw Sl[44]},ua(s,c,v,w){return Oe.createNode(s,c,v,w)},tb(s,c,v){if((s.mode&61440)===16384){try{var w=ra(c,v);}catch{}if(w)for(var _ in w.l)throw new Ee(55)}delete s.parent.l[s.name],s.parent.timestamp=Date.now(),s.name=v,c.l[v]=s,c.timestamp=s.parent.timestamp;},zb(s,c){delete s.l[c],s.timestamp=Date.now();},ub(s,c){var v=ra(s,c),w;for(w in v.l)throw new Ee(55);delete s.l[c],s.timestamp=Date.now();},sb(s){var c=[".",".."],v;for(v of Object.keys(s.l))c.push(v);return c},Da(s,c,v){return s=Oe.createNode(s,c,41471,0),s.link=v,s},ma(s){if((s.mode&61440)!==40960)throw new Ee(28);return s.link}},m:{read(s,c,v,w,_){var N=s.node.l;if(_>=s.node.v)return 0;if(s=Math.min(s.node.v-_,w),8<s&&N.subarray)c.set(N.subarray(_,_+s),v);else for(w=0;w<s;w++)c[v+w]=N[_+w];return s},write(s,c,v,w,_,N){if(c.buffer===ne.buffer&&(N=false),!w)return 0;if(s=s.node,s.timestamp=Date.now(),c.subarray&&(!s.l||s.l.subarray)){if(N)return s.l=c.subarray(v,v+w),s.v=w;if(s.v===0&&_===0)return s.l=c.slice(v,v+w),s.v=w;if(_+w<=s.v)return s.l.set(c.subarray(v,v+w),_),w}if(Gn(s,_+w),s.l.subarray&&c.subarray)s.l.set(c.subarray(v,v+w),_);else for(N=0;N<w;N++)s.l[_+N]=c[v+N];return s.v=Math.max(s.v,_+w),w},ba(s,c,v){if(v===1?c+=s.position:v===2&&(s.node.mode&61440)===32768&&(c+=s.node.v),0>c)throw new Ee(28);return c},Ya(s,c,v){Gn(s.node,c+v),s.node.v=Math.max(s.node.v,c+v);},lb(s,c,v,w,_){if((s.node.mode&61440)!==32768)throw new Ee(43);if(s=s.node.l,_&2||s.buffer!==ne.buffer){if((0<v||v+c<s.length)&&(s.subarray?s=s.subarray(v,v+c):s=Array.prototype.slice.call(s,v,v+c)),v=true,Wt(),c=void 0,!c)throw new Ee(48);ne.set(s,c);}else v=false,c=s.byteOffset;return {o:c,vc:v}},nb(s,c,v,w){return Oe.m.write(s,c,0,w,v,false),0}}},Un=(s,c)=>{var v=0;return s&&(v|=365),c&&(v|=146),v},on=null,Ye={},an=[],Pv=1,jo=null,Gu=true,Ee=class{constructor(s){this.name="ErrnoError",this.aa=s;}},Sl={},Mv=class{constructor(){this.h={},this.node=null;}get flags(){return this.h.flags}set flags(s){this.h.flags=s;}get position(){return this.h.position}set position(s){this.h.position=s;}},Lv=class{constructor(s,c,v,w){s||(s=this),this.parent=s,this.V=s.V,this.va=null,this.id=Pv++,this.name=c,this.mode=v,this.j={},this.m={},this.ya=w;}get read(){return (this.mode&365)===365}set read(s){s?this.mode|=365:this.mode&=-366;}get write(){return (this.mode&146)===146}set write(s){s?this.mode|=146:this.mode&=-147;}};function vr(s,c={}){if(s=de(s),!s)return {path:"",node:null};if(c=Object.assign({hb:true,Pa:0},c),8<c.Pa)throw new Ee(32);s=s.split("/").filter(H=>!!H);for(var v=on,w="/",_=0;_<s.length;_++){var N=_===s.length-1;if(N&&c.parent)break;if(v=ra(v,s[_]),w=h(w+"/"+s[_]),v.va&&(!N||N&&c.hb)&&(v=v.va.root),!N||c.gb){for(N=0;(v.mode&61440)===40960;)if(v=Ov(w),w=de(S(w),v),v=vr(w,{Pa:c.Pa+1}).node,40<N++)throw new Ee(32)}}return {path:w,node:v}}function Uu(s){for(var c;;){if(s===s.parent)return s=s.V.mb,c?s[s.length-1]!=="/"?`${s}/${c}`:s+c:s;c=c?`${s.name}/${c}`:s.name,s=s.parent;}}function Wu(s,c){for(var v=0,w=0;w<c.length;w++)v=(v<<5)-v+c.charCodeAt(w)|0;return (s+v>>>0)%jo.length}function ra(s,c){var v=(s.mode&61440)===16384?(v=oa(s,"x"))?v:s.j.ka?0:2:54;if(v)throw new Ee(v);for(v=jo[Wu(s.id,c)];v;v=v.fc){var w=v.name;if(v.parent.id===s.id&&w===c)return v}return s.j.ka(s,c)}function Hu(s,c,v,w){return s=new Lv(s,c,v,w),c=Wu(s.parent.id,s.name),s.fc=jo[c],jo[c]=s}function Vu(s){var c=["r","w","rw"][s&3];return s&512&&(c+="w"),c}function oa(s,c){if(Gu)return 0;if(!c.includes("r")||s.mode&292){if(c.includes("w")&&!(s.mode&146)||c.includes("x")&&!(s.mode&73))return 2}else return 2;return 0}function Ku(s,c){try{return ra(s,c),20}catch{}return oa(s,"wx")}function or(s){if(s=an[s],!s)throw new Ee(8);return s}function Yu(s,c=-1){if(s=Object.assign(new Mv,s),c==-1)e:{for(c=0;4096>=c;c++)if(!an[c])break e;throw new Ee(33)}return s.X=c,an[c]=s}function Rv(s,c=-1){return s=Yu(s,c),s.m?.Fc?.(s),s}var Fv={open(s){s.m=Ye[s.node.ya].m,s.m.open?.(s);},ba(){throw new Ee(70)}};function Al(s,c){Ye[s]={m:c};}function qu(s,c){var v=c==="/";if(v&&on)throw new Ee(10);if(!v&&c){var w=vr(c,{hb:false});if(c=w.path,w=w.node,w.va)throw new Ee(10);if((w.mode&61440)!==16384)throw new Ee(54)}c={type:s,Nc:{},mb:c,ec:[]},s=s.V(c),s.V=c,c.root=s,v?on=s:w&&(w.va=c,w.V&&w.V.ec.push(c));}function El(s,c,v){var w=vr(s,{parent:true}).node;if(s=G(s),!s||s==="."||s==="..")throw new Ee(28);var _=Ku(w,s);if(_)throw new Ee(_);if(!w.j.ua)throw new Ee(63);return w.j.ua(w,s,c,v)}function Wn(s){return El(s,16895,0)}function ia(s,c,v){typeof v>"u"&&(v=c,c=438),El(s,c|8192,v);}function _l(s,c){if(!de(s))throw new Ee(44);var v=vr(c,{parent:true}).node;if(!v)throw new Ee(44);c=G(c);var w=Ku(v,c);if(w)throw new Ee(w);if(!v.j.Da)throw new Ee(63);v.j.Da(v,c,s);}function Ov(s){if(s=vr(s).node,!s)throw new Ee(44);if(!s.j.ma)throw new Ee(28);return de(Uu(s.parent),s.j.ma(s))}function aa(s,c,v){if(s==="")throw new Ee(44);if(typeof c=="string"){var w={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[c];if(typeof w>"u")throw Error(`Unknown file open mode: ${c}`);c=w;}if(v=c&64?(typeof v>"u"?438:v)&4095|32768:0,typeof s=="object")var _=s;else {s=h(s);try{_=vr(s,{gb:!(c&131072)}).node;}catch{}}if(w=false,c&64)if(_){if(c&128)throw new Ee(20)}else _=El(s,v,0),w=true;if(!_)throw new Ee(44);if((_.mode&61440)===8192&&(c&=-513),c&65536&&(_.mode&61440)!==16384)throw new Ee(54);if(!w&&(v=_?(_.mode&61440)===40960?32:(_.mode&61440)===16384&&(Vu(c)!=="r"||c&512)?31:oa(_,Vu(c)):44))throw new Ee(v);if(c&512&&!w){if(v=_,v=typeof v=="string"?vr(v,{gb:true}).node:v,!v.j.R)throw new Ee(63);if((v.mode&61440)===16384)throw new Ee(31);if((v.mode&61440)!==32768)throw new Ee(28);if(w=oa(v,"w"))throw new Ee(w);v.j.R(v,{size:0,timestamp:Date.now()});}return c&=-131713,_=Yu({node:_,path:Uu(_),flags:c,seekable:true,position:0,m:_.m,tc:[],error:false}),_.m.open&&_.m.open(_),!g.logReadFiles||c&1||(Il||(Il={}),s in Il||(Il[s]=1)),_}function Xu(s,c,v){if(s.X===null)throw new Ee(8);if(!s.seekable||!s.m.ba)throw new Ee(70);if(v!=0&&v!=1&&v!=2)throw new Ee(28);s.position=s.m.ba(s,c,v),s.tc=[];}var Qu;function Go(s,c,v){s=h("/dev/"+s);var w=Un(!!c,!!v);Ju||(Ju=64);var _=Ju++<<8|0;Al(_,{open(N){N.seekable=false;},close(){v?.buffer?.length&&v(10);},read(N,H,K,oe){for(var ee=0,me=0;me<oe;me++){try{var Se=c();}catch{throw new Ee(29)}if(Se===void 0&&ee===0)throw new Ee(6);if(Se==null)break;ee++,H[K+me]=Se;}return ee&&(N.node.timestamp=Date.now()),ee},write(N,H,K,oe){for(var ee=0;ee<oe;ee++)try{v(H[K+ee]);}catch{throw new Ee(29)}return oe&&(N.node.timestamp=Date.now()),ee}}),ia(s,w,_);}var Ju,yr={},Il,Uo=void 0,Jr=(s,c)=>Object.defineProperty(c,"name",{value:s}),Tl=[],Hn=[],Re,_n=s=>{if(!s)throw new Re("Cannot use deleted val. handle = "+s);return Hn[s]},In=s=>{switch(s){case void 0:return 2;case null:return 4;case  true:return 6;case  false:return 8;default:const c=Tl.pop()||Hn.length;return Hn[c]=s,Hn[c+1]=1,c}},Zu=s=>{var c=Error,v=Jr(s,function(w){this.name=s,this.message=w,w=Error(w).stack,w!==void 0&&(this.stack=this.toString()+`
`+w.replace(/^Error(:[^\n]*)?\n/,""));});return v.prototype=Object.create(c.prototype),v.prototype.constructor=v,v.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},v},ep,tp,bt=s=>{for(var c="";q[s];)c+=tp[q[s++]];return c},Wo=[],Pl=()=>{for(;Wo.length;){var s=Wo.pop();s.g.fa=false,s.delete();}},Ho,Vn={},Ml=(s,c)=>{if(c===void 0)throw new Re("ptr should not be undefined");for(;s.C;)c=s.na(c),s=s.C;return c},xr={},np=s=>{s=bp(s);var c=bt(s);return Yn(s),c},Vo=(s,c)=>{var v=xr[s];if(v===void 0)throw s=`${c} has unknown type ${np(s)}`,new Re(s);return v},sa=()=>{},Ll=false,rp=(s,c,v)=>c===v?s:v.C===void 0?null:(s=rp(s,c,v.C),s===null?null:v.Mb(s)),op={},Dv=(s,c)=>(c=Ml(s,c),Vn[c]),Ko,la=(s,c)=>{if(!c.u||!c.o)throw new Ko("makeClassHandle requires ptr and ptrType");if(!!c.K!=!!c.F)throw new Ko("Both smartPtrType and smartPtr must be specified");return c.count={value:1},Zr(Object.create(s,{g:{value:c,writable:true}}))},Zr=s=>typeof FinalizationRegistry>"u"?(Zr=c=>c,s):(Ll=new FinalizationRegistry(c=>{c=c.g,--c.count.value,c.count.value===0&&(c.F?c.K.P(c.F):c.u.i.P(c.o));}),Zr=c=>{var v=c.g;return v.F&&Ll.register(c,{g:v},c),c},sa=c=>{Ll.unregister(c);},Zr(s)),ca={},Yo=s=>{for(;s.length;){var c=s.pop();s.pop()(c);}};function qo(s){return this.fromWireType(Q[s>>2])}var eo={},da={},Qt=(s,c,v)=>{function w(K){if(K=v(K),K.length!==s.length)throw new Ko("Mismatched type converter count");for(var oe=0;oe<s.length;++oe)Tn(s[oe],K[oe]);}s.forEach(function(K){da[K]=c;});var _=Array(c.length),N=[],H=0;c.forEach((K,oe)=>{xr.hasOwnProperty(K)?_[oe]=xr[K]:(N.push(K),eo.hasOwnProperty(K)||(eo[K]=[]),eo[K].push(()=>{_[oe]=xr[K],++H,H===N.length&&w(_);}));}),N.length===0&&w(_);};function Nv(s,c,v={}){var w=c.name;if(!s)throw new Re(`type "${w}" must have a positive integer typeid pointer`);if(xr.hasOwnProperty(s)){if(v.Wb)return;throw new Re(`Cannot register type '${w}' twice`)}xr[s]=c,delete da[s],eo.hasOwnProperty(s)&&(c=eo[s],delete eo[s],c.forEach(_=>_()));}function Tn(s,c,v={}){if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");return Nv(s,c,v)}var Rl=s=>{throw new Re(s.g.u.i.name+" instance already deleted")};function ua(){}var Fl=(s,c,v)=>{if(s[c].A===void 0){var w=s[c];s[c]=function(..._){if(!s[c].A.hasOwnProperty(_.length))throw new Re(`Function '${v}' called with an invalid number of arguments (${_.length}) - expects one of (${s[c].A})!`);return s[c].A[_.length].apply(this,_)},s[c].A=[],s[c].A[w.ea]=w;}},Ol=(s,c,v)=>{if(g.hasOwnProperty(s)){if(v===void 0||g[s].A!==void 0&&g[s].A[v]!==void 0)throw new Re(`Cannot register public name '${s}' twice`);if(Fl(g,s,s),g.hasOwnProperty(v))throw new Re(`Cannot register multiple overloads of a function with the same number of arguments (${v})!`);g[s].A[v]=c;}else g[s]=c,v!==void 0&&(g[s].Mc=v);},$v=s=>{if(s===void 0)return "_unknown";s=s.replace(/[^a-zA-Z0-9_]/g,"$");var c=s.charCodeAt(0);return 48<=c&&57>=c?`_${s}`:s};function Bv(s,c,v,w,_,N,H,K){this.name=s,this.constructor=c,this.N=v,this.P=w,this.C=_,this.Rb=N,this.na=H,this.Mb=K,this.qb=[];}var pa=(s,c,v)=>{for(;c!==v;){if(!c.na)throw new Re(`Expected null or instance of ${v.name}, got an instance of ${c.name}`);s=c.na(s),c=c.C;}return s};function zv(s,c){if(c===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);return 0}if(!c.g)throw new Re(`Cannot pass "${Bl(c)}" as a ${this.name}`);if(!c.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);return pa(c.g.o,c.g.u.i,this.i)}function jv(s,c){if(c===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);if(this.ta){var v=this.Oa();return s!==null&&s.push(this.P,v),v}return 0}if(!c||!c.g)throw new Re(`Cannot pass "${Bl(c)}" as a ${this.name}`);if(!c.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.sa&&c.g.u.sa)throw new Re(`Cannot convert argument of type ${c.g.K?c.g.K.name:c.g.u.name} to parameter type ${this.name}`);if(v=pa(c.g.o,c.g.u.i,this.i),this.ta){if(c.g.F===void 0)throw new Re("Passing raw pointer to smart pointer is illegal");switch(this.nc){case 0:if(c.g.K===this)v=c.g.F;else throw new Re(`Cannot convert argument of type ${c.g.K?c.g.K.name:c.g.u.name} to parameter type ${this.name}`);break;case 1:v=c.g.F;break;case 2:if(c.g.K===this)v=c.g.F;else {var w=c.clone();v=this.jc(v,In(()=>w.delete())),s!==null&&s.push(this.P,v);}break;default:throw new Re("Unsupporting sharing policy")}}return v}function Gv(s,c){if(c===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);return 0}if(!c.g)throw new Re(`Cannot pass "${Bl(c)}" as a ${this.name}`);if(!c.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);if(c.g.u.sa)throw new Re(`Cannot convert argument of type ${c.g.u.name} to parameter type ${this.name}`);return pa(c.g.o,c.g.u.i,this.i)}function fa(s,c,v,w,_,N,H,K,oe,ee,me){this.name=s,this.i=c,this.Ma=v,this.sa=w,this.ta=_,this.ic=N,this.nc=H,this.rb=K,this.Oa=oe,this.jc=ee,this.P=me,_||c.C!==void 0?this.toWireType=jv:(this.toWireType=w?zv:Gv,this.M=null);}var ip=(s,c,v)=>{if(!g.hasOwnProperty(s))throw new Ko("Replacing nonexistent public symbol");g[s].A!==void 0&&v!==void 0?g[s].A[v]=c:(g[s]=c,g[s].ea=v);},ha=[],ap,Dl=s=>{var c=ha[s];return c||(s>=ha.length&&(ha.length=s+1),ha[s]=c=ap.get(s)),c},Uv=(s,c,v=[])=>(s.includes("j")?(s=s.replace(/p/g,"i"),c=(0, g["dynCall_"+s])(c,...v)):c=Dl(c)(...v),c),Wv=(s,c)=>(...v)=>Uv(s,c,v),Ot=(s,c)=>{s=bt(s);var v=s.includes("j")?Wv(s,c):Dl(c);if(typeof v!="function")throw new Re(`unknown function pointer with signature ${s}: ${c}`);return v},sp,Kn=(s,c)=>{function v(N){_[N]||xr[N]||(da[N]?da[N].forEach(v):(w.push(N),_[N]=true));}var w=[],_={};throw c.forEach(v),new sp(`${s}: `+w.map(np).join([", "]))};function Hv(s){for(var c=1;c<s.length;++c)if(s[c]!==null&&s[c].M===void 0)return  true;return  false}function ma(s,c,v,w,_){var N=c.length;if(2>N)throw new Re("argTypes array size mismatch! Must at least get return value and 'this' types!");var H=c[1]!==null&&v!==null,K=Hv(c),oe=c[0].name!=="void",ee=N-2,me=Array(ee),Se=[],Ae=[];return Jr(s,function(...X){if(X.length!==ee)throw new Re(`function ${s} called with ${X.length} arguments, expected ${ee}`);if(Ae.length=0,Se.length=H?2:1,Se[0]=_,H){var be=c[1].toWireType(Ae,this);Se[1]=be;}for(var pe=0;pe<ee;++pe)me[pe]=c[pe+2].toWireType(Ae,X[pe]),Se.push(me[pe]);if(X=w(...Se),K)Yo(Ae);else for(pe=H?1:2;pe<c.length;pe++){var Ne=pe===1?be:me[pe-2];c[pe].M!==null&&c[pe].M(Ne);}return be=oe?c[0].fromWireType(X):void 0,be})}var ga=(s,c)=>{for(var v=[],w=0;w<s;w++)v.push(Q[c+4*w>>2]);return v},Nl=s=>{s=s.trim();const c=s.indexOf("(");return c!==-1?s.substr(0,c):s},lp=(s,c,v)=>{if(!(s instanceof Object))throw new Re(`${v} with invalid "this": ${s}`);if(!(s instanceof c.i.constructor))throw new Re(`${v} incompatible with "this" of type ${s.constructor.name}`);if(!s.g.o)throw new Re(`cannot call emscripten binding method ${v} on deleted object`);return pa(s.g.o,s.g.u.i,c.i)},$l=s=>{9<s&&--Hn[s+1]===0&&(Hn[s]=void 0,Tl.push(s));},Vv={name:"emscripten::val",fromWireType:s=>{var c=_n(s);return $l(s),c},toWireType:(s,c)=>In(c),argPackAdvance:8,readValueFromPointer:qo,M:null},Kv=(s,c,v)=>{switch(c){case 1:return v?function(w){return this.fromWireType(ne[w])}:function(w){return this.fromWireType(q[w])};case 2:return v?function(w){return this.fromWireType(Z[w>>1])}:function(w){return this.fromWireType(F[w>>1])};case 4:return v?function(w){return this.fromWireType($[w>>2])}:function(w){return this.fromWireType(Q[w>>2])};default:throw new TypeError(`invalid integer width (${c}): ${s}`)}},Bl=s=>{if(s===null)return "null";var c=typeof s;return c==="object"||c==="array"||c==="function"?s.toString():""+s},Yv=(s,c)=>{switch(c){case 4:return function(v){return this.fromWireType(re[v>>2])};case 8:return function(v){return this.fromWireType(le[v>>3])};default:throw new TypeError(`invalid float width (${c}): ${s}`)}},qv=(s,c,v)=>{switch(c){case 1:return v?w=>ne[w]:w=>q[w];case 2:return v?w=>Z[w>>1]:w=>F[w>>1];case 4:return v?w=>$[w>>2]:w=>Q[w>>2];default:throw new TypeError(`invalid integer width (${c}): ${s}`)}},cp=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Xv=(s,c)=>{for(var v=s>>1,w=v+c/2;!(v>=w)&&F[v];)++v;if(v<<=1,32<v-s&&cp)return cp.decode(q.subarray(s,v));for(v="",w=0;!(w>=c/2);++w){var _=Z[s+2*w>>1];if(_==0)break;v+=String.fromCharCode(_);}return v},Qv=(s,c,v)=>{if(v??(v=2147483647),2>v)return 0;v-=2;var w=c;v=v<2*s.length?v/2:s.length;for(var _=0;_<v;++_)Z[c>>1]=s.charCodeAt(_),c+=2;return Z[c>>1]=0,c-w},Jv=s=>2*s.length,Zv=(s,c)=>{for(var v=0,w="";!(v>=c/4);){var _=$[s+4*v>>2];if(_==0)break;++v,65536<=_?(_-=65536,w+=String.fromCharCode(55296|_>>10,56320|_&1023)):w+=String.fromCharCode(_);}return w},ey=(s,c,v)=>{if(v??(v=2147483647),4>v)return 0;var w=c;v=w+v-4;for(var _=0;_<s.length;++_){var N=s.charCodeAt(_);if(55296<=N&&57343>=N){var H=s.charCodeAt(++_);N=65536+((N&1023)<<10)|H&1023;}if($[c>>2]=N,c+=4,c+4>v)break}return $[c>>2]=0,c-w},ty=s=>{for(var c=0,v=0;v<s.length;++v){var w=s.charCodeAt(v);55296<=w&&57343>=w&&++v,c+=4;}return c},dp=(s,c,v)=>{var w=[];return s=s.toWireType(w,v),w.length&&(Q[c>>2]=In(w)),s},ny={},zl=s=>{var c=ny[s];return c===void 0?bt(s):c},jl=[],ry=s=>{var c=jl.length;return jl.push(s),c},oy=(s,c)=>{for(var v=Array(s),w=0;w<s;++w)v[w]=Vo(Q[c+4*w>>2],"parameter "+w);return v},iy=Reflect.construct,Xo=s=>s%4===0&&(s%100!==0||s%400===0),ay=[0,31,60,91,121,152,182,213,244,274,305,335],sy=[0,31,59,90,120,151,181,212,243,273,304,334],Gl=[],Ul={},up=()=>{if(!Wl){var s={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:B||"./this.program"},c;for(c in Ul)Ul[c]===void 0?delete s[c]:s[c]=Ul[c];var v=[];for(c in s)v.push(`${c}=${s[c]}`);Wl=v;}return Wl},Wl,pp=[31,29,31,30,31,30,31,31,30,31,30,31],fp=[31,28,31,30,31,30,31,31,30,31,30,31],hp=(s,c,v,w)=>{function _(X,be,pe){for(X=typeof X=="number"?X.toString():X||"";X.length<be;)X=pe[0]+X;return X}function N(X,be){return _(X,be,"0")}function H(X,be){function pe(Ue){return 0>Ue?-1:0<Ue?1:0}var Ne;return (Ne=pe(X.getFullYear()-be.getFullYear()))===0&&(Ne=pe(X.getMonth()-be.getMonth()))===0&&(Ne=pe(X.getDate()-be.getDate())),Ne}function K(X){switch(X.getDay()){case 0:return new Date(X.getFullYear()-1,11,29);case 1:return X;case 2:return new Date(X.getFullYear(),0,3);case 3:return new Date(X.getFullYear(),0,2);case 4:return new Date(X.getFullYear(),0,1);case 5:return new Date(X.getFullYear()-1,11,31);case 6:return new Date(X.getFullYear()-1,11,30)}}function oe(X){var be=X.ca;for(X=new Date(new Date(X.da+1900,0,1).getTime());0<be;){var pe=X.getMonth(),Ne=(Xo(X.getFullYear())?pp:fp)[pe];if(be>Ne-X.getDate())be-=Ne-X.getDate()+1,X.setDate(1),11>pe?X.setMonth(pe+1):(X.setMonth(0),X.setFullYear(X.getFullYear()+1));else {X.setDate(X.getDate()+be);break}}return pe=new Date(X.getFullYear()+1,0,4),be=K(new Date(X.getFullYear(),0,4)),pe=K(pe),0>=H(be,X)?0>=H(pe,X)?X.getFullYear()+1:X.getFullYear():X.getFullYear()-1}var ee=Q[w+40>>2];w={qc:$[w>>2],pc:$[w+4>>2],Ea:$[w+8>>2],Ra:$[w+12>>2],Fa:$[w+16>>2],da:$[w+20>>2],S:$[w+24>>2],ca:$[w+28>>2],Oc:$[w+32>>2],oc:$[w+36>>2],rc:ee&&ee?ge(q,ee):""},v=v?ge(q,v):"",ee={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var me in ee)v=v.replace(new RegExp(me,"g"),ee[me]);var Se="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Ae="January February March April May June July August September October November December".split(" ");ee={"%a":X=>Se[X.S].substring(0,3),"%A":X=>Se[X.S],"%b":X=>Ae[X.Fa].substring(0,3),"%B":X=>Ae[X.Fa],"%C":X=>N((X.da+1900)/100|0,2),"%d":X=>N(X.Ra,2),"%e":X=>_(X.Ra,2," "),"%g":X=>oe(X).toString().substring(2),"%G":oe,"%H":X=>N(X.Ea,2),"%I":X=>(X=X.Ea,X==0?X=12:12<X&&(X-=12),N(X,2)),"%j":X=>{for(var be=0,pe=0;pe<=X.Fa-1;be+=(Xo(X.da+1900)?pp:fp)[pe++]);return N(X.Ra+be,3)},"%m":X=>N(X.Fa+1,2),"%M":X=>N(X.pc,2),"%n":()=>`
`,"%p":X=>0<=X.Ea&&12>X.Ea?"AM":"PM","%S":X=>N(X.qc,2),"%t":()=>"	","%u":X=>X.S||7,"%U":X=>N(Math.floor((X.ca+7-X.S)/7),2),"%V":X=>{var be=Math.floor((X.ca+7-(X.S+6)%7)/7);if(2>=(X.S+371-X.ca-2)%7&&be++,be)be==53&&(pe=(X.S+371-X.ca)%7,pe==4||pe==3&&Xo(X.da)||(be=1));else {be=52;var pe=(X.S+7-X.ca-1)%7;(pe==4||pe==5&&Xo(X.da%400-1))&&be++;}return N(be,2)},"%w":X=>X.S,"%W":X=>N(Math.floor((X.ca+7-(X.S+6)%7)/7),2),"%y":X=>(X.da+1900).toString().substring(2),"%Y":X=>X.da+1900,"%z":X=>{X=X.oc;var be=0<=X;return X=Math.abs(X)/60,(be?"+":"-")+("0000"+(X/60*100+X%60)).slice(-4)},"%Z":X=>X.rc,"%%":()=>"%"},v=v.replace(/%%/g,"\0\0");for(me in ee)v.includes(me)&&(v=v.replace(new RegExp(me,"g"),ee[me](w)));return v=v.replace(/\0\0/g,"%"),me=Ke(v,false),me.length>c?0:(ne.set(me,s),me.length-1)};[44].forEach(s=>{Sl[s]=new Ee(s),Sl[s].stack="<generic error, no stack>";}),jo=Array(4096),qu(Oe,"/"),Wn("/tmp"),Wn("/home"),Wn("/home/web_user"),(function(){Wn("/dev"),Al(259,{read:()=>0,write:(w,_,N,H)=>H}),ia("/dev/null",259),gt(1280,Xt),gt(1536,rn),ia("/dev/tty",1280),ia("/dev/tty1",1536);var s=new Uint8Array(1024),c=0,v=()=>(c===0&&(c=J(s).byteLength),s[--c]);Go("random",v),Go("urandom",v),Wn("/dev/shm"),Wn("/dev/shm/tmp");})(),(function(){Wn("/proc");var s=Wn("/proc/self");Wn("/proc/self/fd"),qu({V(){var c=Hu(s,"fd",16895,73);return c.j={ka(v,w){var _=or(+w);return v={parent:null,V:{mb:"fake"},j:{ma:()=>_.path}},v.parent=v}},c}},"/proc/self/fd");})(),Re=g.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError";}},Hn.push(0,1,void 0,1,null,1,true,1,false,1),g.count_emval_handles=()=>Hn.length/2-5-Tl.length,ep=g.PureVirtualError=Zu("PureVirtualError");for(var mp=Array(256),ba=0;256>ba;++ba)mp[ba]=String.fromCharCode(ba);tp=mp,g.getInheritedInstanceCount=()=>Object.keys(Vn).length,g.getLiveInheritedInstances=()=>{var s=[],c;for(c in Vn)Vn.hasOwnProperty(c)&&s.push(Vn[c]);return s},g.flushPendingDeletes=Pl,g.setDelayFunction=s=>{Ho=s,Wo.length&&Ho&&Ho(Pl);},Ko=g.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError";}},Object.assign(ua.prototype,{isAliasOf:function(s){if(!(this instanceof ua&&s instanceof ua))return  false;var c=this.g.u.i,v=this.g.o;s.g=s.g;var w=s.g.u.i;for(s=s.g.o;c.C;)v=c.na(v),c=c.C;for(;w.C;)s=w.na(s),w=w.C;return c===w&&v===s},clone:function(){if(this.g.o||Rl(this),this.g.ia)return this.g.count.value+=1,this;var s=Zr,c=Object,v=c.create,w=Object.getPrototypeOf(this),_=this.g;return s=s(v.call(c,w,{g:{value:{count:_.count,fa:_.fa,ia:_.ia,o:_.o,u:_.u,F:_.F,K:_.K}}})),s.g.count.value+=1,s.g.fa=false,s},delete(){if(this.g.o||Rl(this),this.g.fa&&!this.g.ia)throw new Re("Object already scheduled for deletion");sa(this);var s=this.g;--s.count.value,s.count.value===0&&(s.F?s.K.P(s.F):s.u.i.P(s.o)),this.g.ia||(this.g.F=void 0,this.g.o=void 0);},isDeleted:function(){return !this.g.o},deleteLater:function(){if(this.g.o||Rl(this),this.g.fa&&!this.g.ia)throw new Re("Object already scheduled for deletion");return Wo.push(this),Wo.length===1&&Ho&&Ho(Pl),this.g.fa=true,this}}),Object.assign(fa.prototype,{Sb(s){return this.rb&&(s=this.rb(s)),s},bb(s){this.P?.(s);},argPackAdvance:8,readValueFromPointer:qo,fromWireType:function(s){function c(){return this.ta?la(this.i.N,{u:this.ic,o:v,K:this,F:s}):la(this.i.N,{u:this,o:s})}var v=this.Sb(s);if(!v)return this.bb(s),null;var w=Dv(this.i,v);if(w!==void 0)return w.g.count.value===0?(w.g.o=v,w.g.F=s,w.clone()):(w=w.clone(),this.bb(s),w);if(w=this.i.Rb(v),w=op[w],!w)return c.call(this);w=this.sa?w.Ib:w.pointerType;var _=rp(v,this.i,w.i);return _===null?c.call(this):this.ta?la(w.i.N,{u:w,o:_,K:this,F:s}):la(w.i.N,{u:w,o:_})}}),sp=g.UnboundTypeError=Zu("UnboundTypeError");var gp={__syscall_fcntl64:function(s,c,v){Uo=v;try{var w=or(s);switch(c){case 0:var _=k();if(0>_)break;for(;an[_];)_++;return Rv(w,_).X;case 1:case 2:return 0;case 3:return w.flags;case 4:return _=k(),w.flags|=_,0;case 12:return _=k(),Z[_+0>>1]=2,0;case 13:case 14:return 0}return -28}catch(N){if(typeof yr>"u"||N.name!=="ErrnoError")throw N;return -N.aa}},__syscall_ioctl:function(s,c,v){Uo=v;try{var w=or(s);switch(c){case 21509:return w.s?0:-59;case 21505:if(!w.s)return -59;if(w.s.W.Yb){s=[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var _=k();$[_>>2]=25856,$[_+4>>2]=5,$[_+8>>2]=191,$[_+12>>2]=35387;for(var N=0;32>N;N++)ne[_+N+17]=s[N]||0;}return 0;case 21510:case 21511:case 21512:return w.s?0:-59;case 21506:case 21507:case 21508:if(!w.s)return -59;if(w.s.W.Zb)for(_=k(),s=[],N=0;32>N;N++)s.push(ne[_+N+17]);return 0;case 21519:return w.s?(_=k(),$[_>>2]=0):-59;case 21520:return w.s?-28:-59;case 21531:if(_=k(),!w.m.Xb)throw new Ee(59);return w.m.Xb(w,c,_);case 21523:return w.s?(w.s.W.$b&&(N=[24,80],_=k(),Z[_>>1]=N[0],Z[_+2>>1]=N[1]),0):-59;case 21524:return w.s?0:-59;case 21515:return w.s?0:-59;default:return -28}}catch(H){if(typeof yr>"u"||H.name!=="ErrnoError")throw H;return -H.aa}},__syscall_openat:function(s,c,v,w){Uo=w;try{c=c?ge(q,c):"";var _=c;if(_.charAt(0)==="/")c=_;else {var N=s===-100?"/":or(s).path;if(_.length==0)throw new Ee(44);c=h(N+"/"+_);}var H=w?k():0;return aa(c,v,H).X}catch(K){if(typeof yr>"u"||K.name!=="ErrnoError")throw K;return -K.aa}},_abort_js:()=>{Wt("");},_embind_create_inheriting_constructor:(s,c,v)=>{s=bt(s),c=Vo(c,"wrapper"),v=_n(v);var w=c.i,_=w.N,N=w.C.N,H=w.C.constructor;return s=Jr(s,function(...K){w.C.qb.forEach(function(oe){if(this[oe]===N[oe])throw new ep(`Pure virtual function ${oe} must be implemented in JavaScript`)}.bind(this)),Object.defineProperty(this,"__parent",{value:_}),this.__construct(...K);}),_.__construct=function(...K){if(this===_)throw new Re("Pass correct 'this' to __construct");K=H.implement(this,...K),sa(K);var oe=K.g;if(K.notifyOnDestruction(),oe.ia=true,Object.defineProperties(this,{g:{value:oe}}),Zr(this),K=oe.o,K=Ml(w,K),Vn.hasOwnProperty(K))throw new Re(`Tried to register registered instance: ${K}`);Vn[K]=this;},_.__destruct=function(){if(this===_)throw new Re("Pass correct 'this' to __destruct");sa(this);var K=this.g.o;if(K=Ml(w,K),Vn.hasOwnProperty(K))delete Vn[K];else throw new Re(`Tried to unregister unregistered instance: ${K}`)},s.prototype=Object.create(_),Object.assign(s.prototype,v),In(s)},_embind_finalize_value_object:s=>{var c=ca[s];delete ca[s];var v=c.Oa,w=c.P,_=c.fb,N=_.map(H=>H.Vb).concat(_.map(H=>H.lc));Qt([s],N,H=>{var K={};return _.forEach((oe,ee)=>{var me=H[ee],Se=oe.Tb,Ae=oe.Ub,X=H[ee+_.length],be=oe.kc,pe=oe.mc;K[oe.Pb]={read:Ne=>me.fromWireType(Se(Ae,Ne)),write:(Ne,Ue)=>{var ke=[];be(pe,Ne,X.toWireType(ke,Ue)),Yo(ke);}};}),[{name:c.name,fromWireType:oe=>{var ee={},me;for(me in K)ee[me]=K[me].read(oe);return w(oe),ee},toWireType:(oe,ee)=>{for(var me in K)if(!(me in ee))throw new TypeError(`Missing field: "${me}"`);var Se=v();for(me in K)K[me].write(Se,ee[me]);return oe!==null&&oe.push(w,Se),Se},argPackAdvance:8,readValueFromPointer:qo,M:w}]});},_embind_register_bigint:()=>{},_embind_register_bool:(s,c,v,w)=>{c=bt(c),Tn(s,{name:c,fromWireType:function(_){return !!_},toWireType:function(_,N){return N?v:w},argPackAdvance:8,readValueFromPointer:function(_){return this.fromWireType(q[_])},M:null});},_embind_register_class:(s,c,v,w,_,N,H,K,oe,ee,me,Se,Ae)=>{me=bt(me),N=Ot(_,N),K&&(K=Ot(H,K)),ee&&(ee=Ot(oe,ee)),Ae=Ot(Se,Ae);var X=$v(me);Ol(X,function(){Kn(`Cannot construct ${me} due to unbound types`,[w]);}),Qt([s,c,v],w?[w]:[],be=>{if(be=be[0],w)var pe=be.i,Ne=pe.N;else Ne=ua.prototype;be=Jr(me,function(...It){if(Object.getPrototypeOf(this)!==Ue)throw new Re("Use 'new' to construct "+me);if(ke.$===void 0)throw new Re(me+" has no accessible constructor");var Jt=ke.$[It.length];if(Jt===void 0)throw new Re(`Tried to invoke ctor of ${me} with invalid number of parameters (${It.length}) - expected (${Object.keys(ke.$).toString()}) parameters instead!`);return Jt.apply(this,It)});var Ue=Object.create(Ne,{constructor:{value:be}});be.prototype=Ue;var ke=new Bv(me,be,Ue,Ae,pe,N,K,ee);if(ke.C){var ot;(ot=ke.C).oa??(ot.oa=[]),ke.C.oa.push(ke);}return pe=new fa(me,ke,true,false,false),ot=new fa(me+"*",ke,false,false,false),Ne=new fa(me+" const*",ke,false,true,false),op[s]={pointerType:ot,Ib:Ne},ip(X,be),[pe,ot,Ne]});},_embind_register_class_class_function:(s,c,v,w,_,N,H)=>{var K=ga(v,w);c=bt(c),c=Nl(c),N=Ot(_,N),Qt([],[s],oe=>{function ee(){Kn(`Cannot call ${me} due to unbound types`,K);}oe=oe[0];var me=`${oe.name}.${c}`;c.startsWith("@@")&&(c=Symbol[c.substring(2)]);var Se=oe.i.constructor;return Se[c]===void 0?(ee.ea=v-1,Se[c]=ee):(Fl(Se,c,me),Se[c].A[v-1]=ee),Qt([],K,Ae=>{if(Ae=ma(me,[Ae[0],null].concat(Ae.slice(1)),null,N,H),Se[c].A===void 0?(Ae.ea=v-1,Se[c]=Ae):Se[c].A[v-1]=Ae,oe.i.oa)for(const X of oe.i.oa)X.constructor.hasOwnProperty(c)||(X.constructor[c]=Ae);return []}),[]});},_embind_register_class_class_property:(s,c,v,w,_,N,H,K)=>{c=bt(c),N=Ot(_,N),Qt([],[s],oe=>{oe=oe[0];var ee=`${oe.name}.${c}`,me={get(){Kn(`Cannot access ${ee} due to unbound types`,[v]);},enumerable:true,configurable:true};return me.set=K?()=>{Kn(`Cannot access ${ee} due to unbound types`,[v]);}:()=>{throw new Re(`${ee} is a read-only property`)},Object.defineProperty(oe.i.constructor,c,me),Qt([],[v],Se=>{Se=Se[0];var Ae={get(){return Se.fromWireType(N(w))},enumerable:true};return K&&(K=Ot(H,K),Ae.set=X=>{var be=[];K(w,Se.toWireType(be,X)),Yo(be);}),Object.defineProperty(oe.i.constructor,c,Ae),[]}),[]});},_embind_register_class_constructor:(s,c,v,w,_,N)=>{var H=ga(c,v);_=Ot(w,_),Qt([],[s],K=>{K=K[0];var oe=`constructor ${K.name}`;if(K.i.$===void 0&&(K.i.$=[]),K.i.$[c-1]!==void 0)throw new Re(`Cannot register multiple constructors with identical number of parameters (${c-1}) for class '${K.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return K.i.$[c-1]=()=>{Kn(`Cannot construct ${K.name} due to unbound types`,H);},Qt([],H,ee=>(ee.splice(1,0,null),K.i.$[c-1]=ma(oe,ee,null,_,N),[])),[]});},_embind_register_class_function:(s,c,v,w,_,N,H,K)=>{var oe=ga(v,w);c=bt(c),c=Nl(c),N=Ot(_,N),Qt([],[s],ee=>{function me(){Kn(`Cannot call ${Se} due to unbound types`,oe);}ee=ee[0];var Se=`${ee.name}.${c}`;c.startsWith("@@")&&(c=Symbol[c.substring(2)]),K&&ee.i.qb.push(c);var Ae=ee.i.N,X=Ae[c];return X===void 0||X.A===void 0&&X.className!==ee.name&&X.ea===v-2?(me.ea=v-2,me.className=ee.name,Ae[c]=me):(Fl(Ae,c,Se),Ae[c].A[v-2]=me),Qt([],oe,be=>(be=ma(Se,be,ee,N,H),Ae[c].A===void 0?(be.ea=v-2,Ae[c]=be):Ae[c].A[v-2]=be,[])),[]});},_embind_register_class_property:(s,c,v,w,_,N,H,K,oe,ee)=>{c=bt(c),_=Ot(w,_),Qt([],[s],me=>{me=me[0];var Se=`${me.name}.${c}`,Ae={get(){Kn(`Cannot access ${Se} due to unbound types`,[v,H]);},enumerable:true,configurable:true};return Ae.set=oe?()=>Kn(`Cannot access ${Se} due to unbound types`,[v,H]):()=>{throw new Re(Se+" is a read-only property")},Object.defineProperty(me.i.N,c,Ae),Qt([],oe?[v,H]:[v],X=>{var be=X[0],pe={get(){var Ue=lp(this,me,Se+" getter");return be.fromWireType(_(N,Ue))},enumerable:true};if(oe){oe=Ot(K,oe);var Ne=X[1];pe.set=function(Ue){var ke=lp(this,me,Se+" setter"),ot=[];oe(ee,ke,Ne.toWireType(ot,Ue)),Yo(ot);};}return Object.defineProperty(me.i.N,c,pe),[]}),[]});},_embind_register_emval:s=>Tn(s,Vv),_embind_register_enum:(s,c,v,w)=>{function _(){}c=bt(c),_.values={},Tn(s,{name:c,constructor:_,fromWireType:function(N){return this.constructor.values[N]},toWireType:(N,H)=>H.value,argPackAdvance:8,readValueFromPointer:Kv(c,v,w),M:null}),Ol(c,_);},_embind_register_enum_value:(s,c,v)=>{var w=Vo(s,"enum");c=bt(c),s=w.constructor,w=Object.create(w.constructor.prototype,{value:{value:v},constructor:{value:Jr(`${w.name}_${c}`,function(){})}}),s.values[v]=w,s[c]=w;},_embind_register_float:(s,c,v)=>{c=bt(c),Tn(s,{name:c,fromWireType:w=>w,toWireType:(w,_)=>_,argPackAdvance:8,readValueFromPointer:Yv(c,v),M:null});},_embind_register_function:(s,c,v,w,_,N)=>{var H=ga(c,v);s=bt(s),s=Nl(s),_=Ot(w,_),Ol(s,function(){Kn(`Cannot call ${s} due to unbound types`,H);},c-1),Qt([],H,K=>(ip(s,ma(s,[K[0],null].concat(K.slice(1)),null,_,N),c-1),[]));},_embind_register_integer:(s,c,v,w,_)=>{if(c=bt(c),_===-1&&(_=4294967295),_=K=>K,w===0){var N=32-8*v;_=K=>K<<N>>>N;}var H=c.includes("unsigned")?function(K,oe){return oe>>>0}:function(K,oe){return oe};Tn(s,{name:c,fromWireType:_,toWireType:H,argPackAdvance:8,readValueFromPointer:qv(c,v,w!==0),M:null});},_embind_register_memory_view:(s,c,v)=>{function w(N){return new _(ne.buffer,Q[N+4>>2],Q[N>>2])}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][c];v=bt(v),Tn(s,{name:v,fromWireType:w,argPackAdvance:8,readValueFromPointer:w},{Wb:true});},_embind_register_std_string:(s,c)=>{c=bt(c);var v=c==="std::string";Tn(s,{name:c,fromWireType:function(w){var _=Q[w>>2],N=w+4;if(v)for(var H=N,K=0;K<=_;++K){var oe=N+K;if(K==_||q[oe]==0){if(H=H?ge(q,H,oe-H):"",ee===void 0)var ee=H;else ee+="\0",ee+=H;H=oe+1;}}else {for(ee=Array(_),K=0;K<_;++K)ee[K]=String.fromCharCode(q[N+K]);ee=ee.join("");}return Yn(w),ee},toWireType:function(w,_){_ instanceof ArrayBuffer&&(_=new Uint8Array(_));var N=typeof _=="string";if(!(N||_ instanceof Uint8Array||_ instanceof Uint8ClampedArray||_ instanceof Int8Array))throw new Re("Cannot pass non-string to std::string");var H=v&&N?Je(_):_.length,K=Hl(4+H+1),oe=K+4;if(Q[K>>2]=H,v&&N)at(_,q,oe,H+1);else if(N)for(N=0;N<H;++N){var ee=_.charCodeAt(N);if(255<ee)throw Yn(oe),new Re("String has UTF-16 code units that do not fit in 8 bits");q[oe+N]=ee;}else for(N=0;N<H;++N)q[oe+N]=_[N];return w!==null&&w.push(Yn,K),K},argPackAdvance:8,readValueFromPointer:qo,M(w){Yn(w);}});},_embind_register_std_wstring:(s,c,v)=>{if(v=bt(v),c===2)var w=Xv,_=Qv,N=Jv,H=K=>F[K>>1];else c===4&&(w=Zv,_=ey,N=ty,H=K=>Q[K>>2]);Tn(s,{name:v,fromWireType:K=>{for(var oe=Q[K>>2],ee,me=K+4,Se=0;Se<=oe;++Se){var Ae=K+4+Se*c;(Se==oe||H(Ae)==0)&&(me=w(me,Ae-me),ee===void 0?ee=me:(ee+="\0",ee+=me),me=Ae+c);}return Yn(K),ee},toWireType:(K,oe)=>{if(typeof oe!="string")throw new Re(`Cannot pass non-string to C++ string type ${v}`);var ee=N(oe),me=Hl(4+ee+c);return Q[me>>2]=ee/c,_(oe,me+4,ee+c),K!==null&&K.push(Yn,me),me},argPackAdvance:8,readValueFromPointer:qo,M(K){Yn(K);}});},_embind_register_value_object:(s,c,v,w,_,N)=>{ca[s]={name:bt(c),Oa:Ot(v,w),P:Ot(_,N),fb:[]};},_embind_register_value_object_field:(s,c,v,w,_,N,H,K,oe,ee)=>{ca[s].fb.push({Pb:bt(c),Vb:v,Tb:Ot(w,_),Ub:N,lc:H,kc:Ot(K,oe),mc:ee});},_embind_register_void:(s,c)=>{c=bt(c),Tn(s,{Jc:true,name:c,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}});},_emscripten_get_now_is_monotonic:()=>1,_emscripten_memcpy_js:(s,c,v)=>q.copyWithin(s,c,c+v),_emscripten_throw_longjmp:()=>{throw 1/0},_emval_as:(s,c,v)=>(s=_n(s),c=Vo(c,"emval::as"),dp(c,v,s)),_emval_call_method:(s,c,v,w,_)=>(s=jl[s],c=_n(c),v=zl(v),s(c,c[v],w,_)),_emval_decref:$l,_emval_get_method_caller:(s,c,v)=>{var w=oy(s,c),_=w.shift();s--;var N=Array(s);return c=`methodCaller<(${w.map(H=>H.name).join(", ")}) => ${_.name}>`,ry(Jr(c,(H,K,oe,ee)=>{for(var me=0,Se=0;Se<s;++Se)N[Se]=w[Se].readValueFromPointer(ee+me),me+=w[Se].argPackAdvance;return H=v===1?iy(K,N):K.apply(H,N),dp(_,oe,H)}))},_emval_get_module_property:s=>(s=zl(s),In(g[s])),_emval_get_property:(s,c)=>(s=_n(s),c=_n(c),In(s[c])),_emval_incref:s=>{9<s&&(Hn[s+1]+=1);},_emval_new_array:()=>In([]),_emval_new_cstring:s=>In(zl(s)),_emval_new_object:()=>In({}),_emval_run_destructors:s=>{var c=_n(s);Yo(c),$l(s);},_emval_set_property:(s,c,v)=>{s=_n(s),c=_n(c),v=_n(v),s[c]=v;},_emval_take_value:(s,c)=>(s=Vo(s,"_emval_take_value"),s=s.readValueFromPointer(c),In(s)),_gmtime_js:function(s,c,v){s=new Date(1e3*(c+2097152>>>0<4194305-!!s?(s>>>0)+4294967296*c:NaN)),$[v>>2]=s.getUTCSeconds(),$[v+4>>2]=s.getUTCMinutes(),$[v+8>>2]=s.getUTCHours(),$[v+12>>2]=s.getUTCDate(),$[v+16>>2]=s.getUTCMonth(),$[v+20>>2]=s.getUTCFullYear()-1900,$[v+24>>2]=s.getUTCDay(),$[v+28>>2]=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0;},_localtime_js:function(s,c,v){s=new Date(1e3*(c+2097152>>>0<4194305-!!s?(s>>>0)+4294967296*c:NaN)),$[v>>2]=s.getSeconds(),$[v+4>>2]=s.getMinutes(),$[v+8>>2]=s.getHours(),$[v+12>>2]=s.getDate(),$[v+16>>2]=s.getMonth(),$[v+20>>2]=s.getFullYear()-1900,$[v+24>>2]=s.getDay(),$[v+28>>2]=(Xo(s.getFullYear())?ay:sy)[s.getMonth()]+s.getDate()-1|0,$[v+36>>2]=-(60*s.getTimezoneOffset()),c=new Date(s.getFullYear(),6,1).getTimezoneOffset();var w=new Date(s.getFullYear(),0,1).getTimezoneOffset();$[v+32>>2]=(c!=w&&s.getTimezoneOffset()==Math.min(w,c))|0;},_tzset_js:(s,c,v,w)=>{var _=new Date().getFullYear(),N=new Date(_,0,1),H=new Date(_,6,1);_=N.getTimezoneOffset();var K=H.getTimezoneOffset();Q[s>>2]=60*Math.max(_,K),$[c>>2]=+(_!=K),s=oe=>oe.toLocaleTimeString(void 0,{hour12:false,timeZoneName:"short"}).split(" ")[1],N=s(N),H=s(H),K<_?(at(N,q,v,17),at(H,q,w,17)):(at(N,q,w,17),at(H,q,v,17));},emscripten_asm_const_int:(s,c,v)=>{Gl.length=0;for(var w;w=q[c++];){var _=w!=105;_&=w!=112,v+=_&&v%8?4:0,Gl.push(w==112?Q[v>>2]:w==105?$[v>>2]:le[v>>3]),v+=_?8:4;}return En[s](...Gl)},emscripten_date_now:()=>Date.now(),emscripten_get_now:()=>performance.now(),emscripten_resize_heap:s=>{var c=q.length;if(s>>>=0,2147483648<s)return  false;for(var v=1;4>=v;v*=2){var w=c*(1+.2/v);w=Math.min(w,s+100663296);var _=Math;w=Math.max(s,w);e:{_=(_.min.call(_,2147483648,w+(65536-w%65536)%65536)-se.buffer.byteLength+65535)/65536;try{se.grow(_),ye();var N=1;break e}catch{}N=void 0;}if(N)return  true}return  false},environ_get:(s,c)=>{var v=0;return up().forEach((w,_)=>{var N=c+v;for(_=Q[s+4*_>>2]=N,N=0;N<w.length;++N)ne[_++]=w.charCodeAt(N);ne[_]=0,v+=w.length+1;}),0},environ_sizes_get:(s,c)=>{var v=up();Q[s>>2]=v.length;var w=0;return v.forEach(_=>w+=_.length+1),Q[c>>2]=w,0},fd_close:function(s){try{var c=or(s);if(c.X===null)throw new Ee(8);c.La&&(c.La=null);try{c.m.close&&c.m.close(c);}catch(v){throw v}finally{an[c.X]=null;}return c.X=null,0}catch(v){if(typeof yr>"u"||v.name!=="ErrnoError")throw v;return v.aa}},fd_read:function(s,c,v,w){try{e:{var _=or(s);s=c;for(var N,H=c=0;H<v;H++){var K=Q[s>>2],oe=Q[s+4>>2];s+=8;var ee=_,me=N,Se=ne;if(0>oe||0>me)throw new Ee(28);if(ee.X===null)throw new Ee(8);if((ee.flags&2097155)===1)throw new Ee(8);if((ee.node.mode&61440)===16384)throw new Ee(31);if(!ee.m.read)throw new Ee(28);var Ae=typeof me<"u";if(!Ae)me=ee.position;else if(!ee.seekable)throw new Ee(70);var X=ee.m.read(ee,Se,K,oe,me);Ae||(ee.position+=X);var be=X;if(0>be){var pe=-1;break e}if(c+=be,be<oe)break;typeof N<"u"&&(N+=be);}pe=c;}return Q[w>>2]=pe,0}catch(Ne){if(typeof yr>"u"||Ne.name!=="ErrnoError")throw Ne;return Ne.aa}},fd_seek:function(s,c,v,w,_){c=v+2097152>>>0<4194305-!!c?(c>>>0)+4294967296*v:NaN;try{if(isNaN(c))return 61;var N=or(s);return Xu(N,c,w),Vt=[N.position>>>0,(kt=N.position,1<=+Math.abs(kt)?0<kt?+Math.floor(kt/4294967296)>>>0:~~+Math.ceil((kt-+(~~kt>>>0))/4294967296)>>>0:0)],$[_>>2]=Vt[0],$[_+4>>2]=Vt[1],N.La&&c===0&&w===0&&(N.La=null),0}catch(H){if(typeof yr>"u"||H.name!=="ErrnoError")throw H;return H.aa}},fd_write:function(s,c,v,w){try{e:{var _=or(s);s=c;for(var N,H=c=0;H<v;H++){var K=Q[s>>2],oe=Q[s+4>>2];s+=8;var ee=_,me=K,Se=oe,Ae=N,X=ne;if(0>Se||0>Ae)throw new Ee(28);if(ee.X===null)throw new Ee(8);if((ee.flags&2097155)===0)throw new Ee(8);if((ee.node.mode&61440)===16384)throw new Ee(31);if(!ee.m.write)throw new Ee(28);ee.seekable&&ee.flags&1024&&Xu(ee,0,2);var be=typeof Ae<"u";if(!be)Ae=ee.position;else if(!ee.seekable)throw new Ee(70);var pe=ee.m.write(ee,X,me,Se,Ae,void 0);be||(ee.position+=pe);var Ne=pe;if(0>Ne){var Ue=-1;break e}c+=Ne,typeof N<"u"&&(N+=Ne);}Ue=c;}return Q[w>>2]=Ue,0}catch(ke){if(typeof yr>"u"||ke.name!=="ErrnoError")throw ke;return ke.aa}},invoke_vii:ly,isWindowsBrowser:function(){return  -1<navigator.platform.indexOf("Win")},strftime:hp,strftime_l:(s,c,v,w)=>hp(s,c,v,w)},lt=(function(){function s(v){return lt=v.exports,se=lt.memory,ye(),ap=lt.__indirect_function_table,Be.unshift(lt.__wasm_call_ctors),dt--,g.monitorRunDependencies?.(dt),dt==0&&Et&&(v=Et,Et=null,v()),lt}var c={env:gp,wasi_snapshot_preview1:gp};if(dt++,g.monitorRunDependencies?.(dt),g.instantiateWasm)try{return g.instantiateWasm(c,s)}catch(v){Y(`Module.instantiateWasm callback failed with error: ${v}`),M(v);}return tt||(tt=Mt("canvas_advanced.wasm")?"canvas_advanced.wasm":g.locateFile?g.locateFile("canvas_advanced.wasm",j):j+"canvas_advanced.wasm"),pt(c,function(v){s(v.instance);}).catch(M),{}})(),Yn=s=>(Yn=lt.free)(s),Hl=s=>(Hl=lt.malloc)(s),bp=s=>(bp=lt.__getTypeName)(s),vp=g._ma_device__on_notification_unlocked=s=>(vp=g._ma_device__on_notification_unlocked=lt.ma_device__on_notification_unlocked)(s);g._ma_malloc_emscripten=(s,c)=>(g._ma_malloc_emscripten=lt.ma_malloc_emscripten)(s,c),g._ma_free_emscripten=(s,c)=>(g._ma_free_emscripten=lt.ma_free_emscripten)(s,c);var yp=g._ma_device_process_pcm_frames_capture__webaudio=(s,c,v)=>(yp=g._ma_device_process_pcm_frames_capture__webaudio=lt.ma_device_process_pcm_frames_capture__webaudio)(s,c,v),xp=g._ma_device_process_pcm_frames_playback__webaudio=(s,c,v)=>(xp=g._ma_device_process_pcm_frames_playback__webaudio=lt.ma_device_process_pcm_frames_playback__webaudio)(s,c,v),wp=(s,c)=>(wp=lt.setThrew)(s,c),Cp=s=>(Cp=lt._emscripten_stack_restore)(s),kp=()=>(kp=lt.emscripten_stack_get_current)();g.dynCall_iiji=(s,c,v,w,_)=>(g.dynCall_iiji=lt.dynCall_iiji)(s,c,v,w,_),g.dynCall_jiji=(s,c,v,w,_)=>(g.dynCall_jiji=lt.dynCall_jiji)(s,c,v,w,_),g.dynCall_iiiji=(s,c,v,w,_,N)=>(g.dynCall_iiiji=lt.dynCall_iiiji)(s,c,v,w,_,N),g.dynCall_iij=(s,c,v,w)=>(g.dynCall_iij=lt.dynCall_iij)(s,c,v,w),g.dynCall_jii=(s,c,v)=>(g.dynCall_jii=lt.dynCall_jii)(s,c,v),g.dynCall_viijii=(s,c,v,w,_,N,H)=>(g.dynCall_viijii=lt.dynCall_viijii)(s,c,v,w,_,N,H),g.dynCall_iiiiij=(s,c,v,w,_,N,H)=>(g.dynCall_iiiiij=lt.dynCall_iiiiij)(s,c,v,w,_,N,H),g.dynCall_iiiiijj=(s,c,v,w,_,N,H,K,oe)=>(g.dynCall_iiiiijj=lt.dynCall_iiiiijj)(s,c,v,w,_,N,H,K,oe),g.dynCall_iiiiiijj=(s,c,v,w,_,N,H,K,oe,ee)=>(g.dynCall_iiiiiijj=lt.dynCall_iiiiiijj)(s,c,v,w,_,N,H,K,oe,ee);function ly(s,c,v){var w=kp();try{Dl(s)(c,v);}catch(_){if(Cp(w),_!==_+0)throw _;wp(1,0);}}var va;Et=function s(){va||Sp(),va||(Et=s);};function Sp(){function s(){if(!va&&(va=true,g.calledRun=true,!ae)){if(g.noFSInit||Qu||(Qu=true,g.stdin=g.stdin,g.stdout=g.stdout,g.stderr=g.stderr,g.stdin?Go("stdin",g.stdin):_l("/dev/tty","/dev/stdin"),g.stdout?Go("stdout",null,g.stdout):_l("/dev/tty","/dev/stdout"),g.stderr?Go("stderr",null,g.stderr):_l("/dev/tty1","/dev/stderr"),aa("/dev/stdin",0),aa("/dev/stdout",1),aa("/dev/stderr",1)),Gu=false,nn(Be),A(g),g.onRuntimeInitialized&&g.onRuntimeInitialized(),g.postRun)for(typeof g.postRun=="function"&&(g.postRun=[g.postRun]);g.postRun.length;){var c=g.postRun.shift();xt.unshift(c);}nn(xt);}}if(!(0<dt)){if(g.preRun)for(typeof g.preRun=="function"&&(g.preRun=[g.preRun]);g.preRun.length;)Bt();nn(_e),0<dt||(g.setStatus?(g.setStatus("Running..."),setTimeout(function(){setTimeout(function(){g.setStatus("");},1),s();},1)):s());}}if(g.preInit)for(typeof g.preInit=="function"&&(g.preInit=[g.preInit]);0<g.preInit.length;)g.preInit.pop()();return Sp(),y=I,y})})();const p=f;}),(a=>{a.exports=JSON.parse(`{"name":"@rive-app/canvas","version":"2.34.3","description":"Rive's canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive_fallback.wasm","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}`);}),((a,l,u)=>{u.r(l),u.d(l,{Animation:()=>f.Animation});var f=u(4);}),((a,l,u)=>{u.r(l),u.d(l,{Animation:()=>f});var f=(function(){function p(m,b,y,g){this.animation=m,this.artboard=b,this.playing=g,this.loopCount=0,this.scrubTo=null,this.instance=new y.LinearAnimationInstance(m,b);}return Object.defineProperty(p.prototype,"name",{get:function(){return this.animation.name},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"time",{get:function(){return this.instance.time},set:function(m){this.instance.time=m;},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"loopValue",{get:function(){return this.animation.loopValue},enumerable:false,configurable:true}),Object.defineProperty(p.prototype,"needsScrub",{get:function(){return this.scrubTo!==null},enumerable:false,configurable:true}),p.prototype.advance=function(m){this.scrubTo===null?this.instance.advance(m):(this.instance.time=0,this.instance.advance(this.scrubTo),this.scrubTo=null);},p.prototype.apply=function(m){this.instance.apply(m);},p.prototype.cleanup=function(){this.instance.delete();},p})();}),((a,l,u)=>{u.r(l),u.d(l,{AudioAssetWrapper:()=>m.AudioAssetWrapper,AudioWrapper:()=>m.AudioWrapper,BLANK_URL:()=>p.BLANK_URL,CustomFileAssetLoaderWrapper:()=>m.CustomFileAssetLoaderWrapper,FileAssetWrapper:()=>m.FileAssetWrapper,FileFinalizer:()=>m.FileFinalizer,FontAssetWrapper:()=>m.FontAssetWrapper,FontWrapper:()=>m.FontWrapper,ImageAssetWrapper:()=>m.ImageAssetWrapper,ImageWrapper:()=>m.ImageWrapper,createFinalization:()=>m.createFinalization,finalizationRegistry:()=>m.finalizationRegistry,registerTouchInteractions:()=>f.registerTouchInteractions,sanitizeUrl:()=>p.sanitizeUrl});var f=u(6),p=u(7),m=u(8);}),((a,l,u)=>{u.r(l),u.d(l,{registerTouchInteractions:()=>m});var f=void 0,p=function(b,y,g){var A,M,I=[];if(["touchstart","touchmove"].indexOf(b.type)>-1&&(!((A=b.changedTouches)===null||A===void 0)&&A.length)){y||b.preventDefault();for(var L=0,D=g?b.changedTouches.length:1;L<D;){var z=b.changedTouches[L];I.push({clientX:z.clientX,clientY:z.clientY,identifier:z.identifier}),L++;}}else if(b.type==="touchend"&&(!((M=b.changedTouches)===null||M===void 0)&&M.length))for(var L=0,D=g?b.changedTouches.length:1;L<D;){var z=b.changedTouches[L];I.push({clientX:z.clientX,clientY:z.clientY,identifier:z.identifier}),L++;}else I.push({clientX:b.clientX,clientY:b.clientY,identifier:0});return I},m=function(b){var y=b.canvas,g=b.artboard,A=b.stateMachines,M=A===void 0?[]:A,I=b.renderer,L=b.rive,D=b.fit,z=b.alignment,O=b.isTouchScrollEnabled,T=O===void 0?false:O,R=b.dispatchPointerExit,P=R===void 0?true:R,C=b.enableMultiTouch,E=C===void 0?false:C,B=b.layoutScaleFactor,j=B===void 0?1:B;if(!y||!M.length||!I||!L||!g||typeof window>"u")return null;var V=null,U=false,ce=function(ie){if(U&&ie instanceof MouseEvent){ie.type=="mouseup"&&(U=false);return}U=T&&ie.type==="touchend"&&V==="touchstart",V=ie.type;var se=ie.currentTarget.getBoundingClientRect(),ae=p(ie,T,E),ne=L.computeAlignment(D,z,{minX:0,minY:0,maxX:se.width,maxY:se.height},g.bounds,j),q=new L.Mat2D;switch(ne.invert(q),ae.forEach(function(tt){var De=tt.clientX,mn=tt.clientY;if(!(!De&&!mn)){var gn=De-se.left,pt=mn-se.top,kt=new L.Vec2D(gn,pt),Vt=L.mapXY(q,kt),En=Vt.x(),nn=Vt.y();tt.transformedX=En,tt.transformedY=nn,Vt.delete(),kt.delete();}}),q.delete(),ne.delete(),ie.type){case "mouseout":for(var Z=function(tt){P?ae.forEach(function(De){tt.pointerExit(De.transformedX,De.transformedY,De.identifier);}):ae.forEach(function(De){tt.pointerMove(De.transformedX,De.transformedY,De.identifier);});},F=0,$=M;F<$.length;F++){var Q=$[F];Z(Q);}break;case "touchmove":case "mouseover":case "mousemove":{for(var re=function(tt){ae.forEach(function(De){tt.pointerMove(De.transformedX,De.transformedY,De.identifier);});},le=0,ye=M;le<ye.length;le++){var Q=ye[le];re(Q);}break}case "touchstart":case "mousedown":{for(var _e=function(tt){ae.forEach(function(De){tt.pointerDown(De.transformedX,De.transformedY,De.identifier);});},Be=0,xt=M;Be<xt.length;Be++){var Q=xt[Be];_e(Q);}break}case "touchend":{for(var Bt=function(tt){ae.forEach(function(De){tt.pointerUp(De.transformedX,De.transformedY,De.identifier),tt.pointerExit(De.transformedX,De.transformedY,De.identifier);});},dt=0,Et=M;dt<Et.length;dt++){var Q=Et[dt];Bt(Q);}break}case "mouseup":{for(var Wt=function(tt){ae.forEach(function(De){tt.pointerUp(De.transformedX,De.transformedY,De.identifier);});},Mt=0,Ht=M;Mt<Ht.length;Mt++){var Q=Ht[Mt];Wt(Q);}break}}},Y=ce.bind(f);return y.addEventListener("mouseover",Y),y.addEventListener("mouseout",Y),y.addEventListener("mousemove",Y),y.addEventListener("mousedown",Y),y.addEventListener("mouseup",Y),y.addEventListener("touchmove",Y,{passive:T}),y.addEventListener("touchstart",Y,{passive:T}),y.addEventListener("touchend",Y),function(){y.removeEventListener("mouseover",Y),y.removeEventListener("mouseout",Y),y.removeEventListener("mousemove",Y),y.removeEventListener("mousedown",Y),y.removeEventListener("mouseup",Y),y.removeEventListener("touchmove",Y),y.removeEventListener("touchstart",Y),y.removeEventListener("touchend",Y);}};}),((a,l,u)=>{u.r(l),u.d(l,{BLANK_URL:()=>A,sanitizeUrl:()=>L});var f=/^([^\w]*)(javascript|data|vbscript)/im,p=/&#(\w+)(^\w|;)?/g,m=/&(newline|tab);/gi,b=/[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,y=/^.+(:|&colon;)/gim,g=[".","/"],A="about:blank";function M(D){return g.indexOf(D[0])>-1}function I(D){var z=D.replace(b,"");return z.replace(p,function(O,T){return String.fromCharCode(T)})}function L(D){if(!D)return A;var z=I(D).replace(m,"").replace(b,"").trim();if(!z)return A;if(M(z))return z;var O=z.match(y);if(!O)return z;var T=O[0];return f.test(T)?A:z}}),((a,l,u)=>{u.r(l),u.d(l,{AudioAssetWrapper:()=>D,AudioWrapper:()=>g,CustomFileAssetLoaderWrapper:()=>M,FileAssetWrapper:()=>I,FileFinalizer:()=>p,FontAssetWrapper:()=>z,FontWrapper:()=>A,ImageAssetWrapper:()=>L,ImageWrapper:()=>y,createFinalization:()=>P,finalizationRegistry:()=>R});var f=(function(){var C=function(E,B){return C=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,V){j.__proto__=V;}||function(j,V){for(var U in V)Object.prototype.hasOwnProperty.call(V,U)&&(j[U]=V[U]);},C(E,B)};return function(E,B){if(typeof B!="function"&&B!==null)throw new TypeError("Class extends value "+String(B)+" is not a constructor or null");C(E,B);function j(){this.constructor=E;}E.prototype=B===null?Object.create(B):(j.prototype=B.prototype,new j);}})(),p=(function(){function C(E){this.selfUnref=false,this._file=E;}return C.prototype.unref=function(){this._file&&this._file.unref();},C})(),m=(function(){function C(E){this._finalizableObject=E;}return C.prototype.unref=function(){this._finalizableObject.unref();},C})(),b=(function(){function C(){this.selfUnref=false;}return C.prototype.unref=function(){},C})(),y=(function(C){f(E,C);function E(B){var j=C.call(this)||this;return j._nativeImage=B,j}return Object.defineProperty(E.prototype,"nativeImage",{get:function(){return this._nativeImage},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeImage.unref();},E})(b),g=(function(C){f(E,C);function E(B){var j=C.call(this)||this;return j._nativeAudio=B,j}return Object.defineProperty(E.prototype,"nativeAudio",{get:function(){return this._nativeAudio},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeAudio.unref();},E})(b),A=(function(C){f(E,C);function E(B){var j=C.call(this)||this;return j._nativeFont=B,j}return Object.defineProperty(E.prototype,"nativeFont",{get:function(){return this._nativeFont},enumerable:false,configurable:true}),E.prototype.unref=function(){this.selfUnref&&this._nativeFont.unref();},E})(b),M=(function(){function C(E,B){this._assetLoaderCallback=B,this.assetLoader=new E.CustomFileAssetLoader({loadContents:this.loadContents.bind(this)});}return C.prototype.loadContents=function(E,B){var j;return E.isImage?j=new L(E):E.isAudio?j=new D(E):E.isFont&&(j=new z(E)),this._assetLoaderCallback(j,B)},C})(),I=(function(){function C(E){this._nativeFileAsset=E;}return C.prototype.decode=function(E){this._nativeFileAsset.decode(E);},Object.defineProperty(C.prototype,"name",{get:function(){return this._nativeFileAsset.name},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"fileExtension",{get:function(){return this._nativeFileAsset.fileExtension},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"uniqueFilename",{get:function(){return this._nativeFileAsset.uniqueFilename},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isAudio",{get:function(){return this._nativeFileAsset.isAudio},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isImage",{get:function(){return this._nativeFileAsset.isImage},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isFont",{get:function(){return this._nativeFileAsset.isFont},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"cdnUuid",{get:function(){return this._nativeFileAsset.cdnUuid},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"nativeFileAsset",{get:function(){return this._nativeFileAsset},enumerable:false,configurable:true}),C})(),L=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setRenderImage=function(B){this._nativeFileAsset.setRenderImage(B.nativeImage);},E})(I),D=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setAudioSource=function(B){this._nativeFileAsset.setAudioSource(B.nativeAudio);},E})(I),z=(function(C){f(E,C);function E(){return C!==null&&C.apply(this,arguments)||this}return E.prototype.setFont=function(B){this._nativeFileAsset.setFont(B.nativeFont);},E})(I),O=(function(){function C(E){}return C.prototype.register=function(E){E.selfUnref=true;},C.prototype.unregister=function(E){},C})(),T=typeof FinalizationRegistry<"u"?FinalizationRegistry:O,R=new T(function(C){C?.unref();}),P=function(C,E){var B=new m(E);R.register(C,B);};})],r={};function o(a){var l=r[a];if(l!==void 0)return l.exports;var u=r[a]={exports:{}};return n[a](u,u.exports,o),u.exports}o.d=(a,l)=>{for(var u in l)o.o(l,u)&&!o.o(a,u)&&Object.defineProperty(a,u,{enumerable:true,get:l[u]});},o.o=(a,l)=>Object.prototype.hasOwnProperty.call(a,l),o.r=a=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:true});};var i={};return (()=>{o.r(i),o.d(i,{Alignment:()=>L,DataEnum:()=>ye,DrawOptimizationOptions:()=>D,EventType:()=>U,Fit:()=>I,Layout:()=>z,LoopType:()=>ce,Rive:()=>re,RiveEventType:()=>P,RiveFile:()=>Q,RuntimeLoader:()=>O,StateMachineInput:()=>R,StateMachineInputType:()=>T,Testing:()=>kt,ViewModel:()=>le,ViewModelInstance:()=>Be,ViewModelInstanceArtboard:()=>mn,ViewModelInstanceAssetImage:()=>De,ViewModelInstanceBoolean:()=>Et,ViewModelInstanceColor:()=>tt,ViewModelInstanceEnum:()=>Mt,ViewModelInstanceList:()=>Ht,ViewModelInstanceNumber:()=>dt,ViewModelInstanceString:()=>Bt,ViewModelInstanceTrigger:()=>Wt,ViewModelInstanceValue:()=>xt,decodeAudio:()=>Vt,decodeFont:()=>nn,decodeImage:()=>En});var a=o(1),l=o(2),u=o(3),f=o(5),p=(function(){var k=function(d,h){return k=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(S,G){S.__proto__=G;}||function(S,G){for(var W in G)Object.prototype.hasOwnProperty.call(G,W)&&(S[W]=G[W]);},k(d,h)};return function(d,h){if(typeof h!="function"&&h!==null)throw new TypeError("Class extends value "+String(h)+" is not a constructor or null");k(d,h);function S(){this.constructor=d;}d.prototype=h===null?Object.create(h):(S.prototype=h.prototype,new S);}})(),m=function(){return m=Object.assign||function(k){for(var d,h=1,S=arguments.length;h<S;h++){d=arguments[h];for(var G in d)Object.prototype.hasOwnProperty.call(d,G)&&(k[G]=d[G]);}return k},m.apply(this,arguments)},b=function(k,d,h,S){function G(W){return W instanceof h?W:new h(function(J){J(W);})}return new(h||(h=Promise))(function(W,J){function de(we){try{ge(S.next(we));}catch(Je){J(Je);}}function xe(we){try{ge(S.throw(we));}catch(Je){J(Je);}}function ge(we){we.done?W(we.value):G(we.value).then(de,xe);}ge((S=S.apply(k,[])).next());})},y=function(k,d){var h={label:0,sent:function(){if(W[0]&1)throw W[1];return W[1]},trys:[],ops:[]},S,G,W,J=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return J.next=de(0),J.throw=de(1),J.return=de(2),typeof Symbol=="function"&&(J[Symbol.iterator]=function(){return this}),J;function de(ge){return function(we){return xe([ge,we])}}function xe(ge){if(S)throw new TypeError("Generator is already executing.");for(;J&&(J=0,ge[0]&&(h=0)),h;)try{if(S=1,G&&(W=ge[0]&2?G.return:ge[0]?G.throw||((W=G.return)&&W.call(G),0):G.next)&&!(W=W.call(G,ge[1])).done)return W;switch(G=0,W&&(ge=[ge[0]&2,W.value]),ge[0]){case 0:case 1:W=ge;break;case 4:return h.label++,{value:ge[1],done:!1};case 5:h.label++,G=ge[1],ge=[0];continue;case 7:ge=h.ops.pop(),h.trys.pop();continue;default:if(W=h.trys,!(W=W.length>0&&W[W.length-1])&&(ge[0]===6||ge[0]===2)){h=0;continue}if(ge[0]===3&&(!W||ge[1]>W[0]&&ge[1]<W[3])){h.label=ge[1];break}if(ge[0]===6&&h.label<W[1]){h.label=W[1],W=ge;break}if(W&&h.label<W[2]){h.label=W[2],h.ops.push(ge);break}W[2]&&h.ops.pop(),h.trys.pop();continue}ge=d.call(k,h);}catch(we){ge=[6,we],G=0;}finally{S=W=0;}if(ge[0]&5)throw ge[1];return {value:ge[0]?ge[1]:void 0,done:true}}},g=function(k,d,h){for(var S=0,G=d.length,W;S<G;S++)(W||!(S in d))&&(W||(W=Array.prototype.slice.call(d,0,S)),W[S]=d[S]);return k.concat(W||Array.prototype.slice.call(d))},A=(function(k){p(d,k);function d(){var h=k!==null&&k.apply(this,arguments)||this;return h.isHandledError=true,h}return d})(Error),M=function(k){return k&&k.isHandledError?k.message:"Problem loading file; may be corrupt!"},I;(function(k){k.Cover="cover",k.Contain="contain",k.Fill="fill",k.FitWidth="fitWidth",k.FitHeight="fitHeight",k.None="none",k.ScaleDown="scaleDown",k.Layout="layout";})(I||(I={}));var L;(function(k){k.Center="center",k.TopLeft="topLeft",k.TopCenter="topCenter",k.TopRight="topRight",k.CenterLeft="centerLeft",k.CenterRight="centerRight",k.BottomLeft="bottomLeft",k.BottomCenter="bottomCenter",k.BottomRight="bottomRight";})(L||(L={}));var D;(function(k){k.AlwaysDraw="alwaysDraw",k.DrawOnChanged="drawOnChanged";})(D||(D={}));var z=(function(){function k(d){var h,S,G,W,J,de,xe;this.fit=(h=d?.fit)!==null&&h!==void 0?h:I.Contain,this.alignment=(S=d?.alignment)!==null&&S!==void 0?S:L.Center,this.layoutScaleFactor=(G=d?.layoutScaleFactor)!==null&&G!==void 0?G:1,this.minX=(W=d?.minX)!==null&&W!==void 0?W:0,this.minY=(J=d?.minY)!==null&&J!==void 0?J:0,this.maxX=(de=d?.maxX)!==null&&de!==void 0?de:0,this.maxY=(xe=d?.maxY)!==null&&xe!==void 0?xe:0;}return k.new=function(d){var h=d.fit,S=d.alignment,G=d.minX,W=d.minY,J=d.maxX,de=d.maxY;return console.warn("This function is deprecated: please use `new Layout({})` instead"),new k({fit:h,alignment:S,minX:G,minY:W,maxX:J,maxY:de})},k.prototype.copyWith=function(d){var h=d.fit,S=d.alignment,G=d.layoutScaleFactor,W=d.minX,J=d.minY,de=d.maxX,xe=d.maxY;return new k({fit:h??this.fit,alignment:S??this.alignment,layoutScaleFactor:G??this.layoutScaleFactor,minX:W??this.minX,minY:J??this.minY,maxX:de??this.maxX,maxY:xe??this.maxY})},k.prototype.runtimeFit=function(d){if(this.cachedRuntimeFit)return this.cachedRuntimeFit;var h;return this.fit===I.Cover?h=d.Fit.cover:this.fit===I.Contain?h=d.Fit.contain:this.fit===I.Fill?h=d.Fit.fill:this.fit===I.FitWidth?h=d.Fit.fitWidth:this.fit===I.FitHeight?h=d.Fit.fitHeight:this.fit===I.ScaleDown?h=d.Fit.scaleDown:this.fit===I.Layout?h=d.Fit.layout:h=d.Fit.none,this.cachedRuntimeFit=h,h},k.prototype.runtimeAlignment=function(d){if(this.cachedRuntimeAlignment)return this.cachedRuntimeAlignment;var h;return this.alignment===L.TopLeft?h=d.Alignment.topLeft:this.alignment===L.TopCenter?h=d.Alignment.topCenter:this.alignment===L.TopRight?h=d.Alignment.topRight:this.alignment===L.CenterLeft?h=d.Alignment.centerLeft:this.alignment===L.CenterRight?h=d.Alignment.centerRight:this.alignment===L.BottomLeft?h=d.Alignment.bottomLeft:this.alignment===L.BottomCenter?h=d.Alignment.bottomCenter:this.alignment===L.BottomRight?h=d.Alignment.bottomRight:h=d.Alignment.center,this.cachedRuntimeAlignment=h,h},k})(),O=(function(){function k(){}return k.loadRuntime=function(){a.default({locateFile:function(){return k.wasmURL}}).then(function(d){var h;for(k.runtime=d;k.callBackQueue.length>0;)(h=k.callBackQueue.shift())===null||h===void 0||h(k.runtime);}).catch(function(d){var h={message:d?.message||"Unknown error",type:d?.name||"Error",wasmError:d instanceof WebAssembly.CompileError||d instanceof WebAssembly.RuntimeError,originalError:d};console.debug("Rive WASM load error details:",h);var S="https://cdn.jsdelivr.net/npm/".concat(l.name,"@").concat(l.version,"/rive_fallback.wasm");if(k.wasmURL.toLowerCase()!==S)console.warn("Failed to load WASM from ".concat(k.wasmURL," (").concat(h.message,"), trying jsdelivr as a backup")),k.setWasmUrl(S),k.loadRuntime();else {var G=["Could not load Rive WASM file from ".concat(k.wasmURL," or ").concat(S,"."),"Possible reasons:","- Network connection is down","- WebAssembly is not supported in this environment","- The WASM file is corrupted or incompatible",`
Error details:`,"- Type: ".concat(h.type),"- Message: ".concat(h.message),"- WebAssembly-specific error: ".concat(h.wasmError),`
To resolve, you may need to:`,"1. Check your network connection","2. Set a new WASM source via RuntimeLoader.setWasmUrl()","3. Call RuntimeLoader.loadRuntime() again"].join(`
`);console.error(G);}});},k.getInstance=function(d){k.isLoading||(k.isLoading=true,k.loadRuntime()),k.runtime?d(k.runtime):k.callBackQueue.push(d);},k.awaitInstance=function(){return new Promise(function(d){return k.getInstance(function(h){return d(h)})})},k.setWasmUrl=function(d){k.wasmURL=d;},k.getWasmUrl=function(){return k.wasmURL},k.isLoading=false,k.callBackQueue=[],k.wasmURL="https://unpkg.com/".concat(l.name,"@").concat(l.version,"/rive.wasm"),k})(),T;(function(k){k[k.Number=56]="Number",k[k.Trigger=58]="Trigger",k[k.Boolean=59]="Boolean";})(T||(T={}));var R=(function(){function k(d,h){this.type=d,this.runtimeInput=h;}return Object.defineProperty(k.prototype,"name",{get:function(){return this.runtimeInput.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"value",{get:function(){return this.runtimeInput.value},set:function(d){this.runtimeInput.value=d;},enumerable:false,configurable:true}),k.prototype.fire=function(){this.type===T.Trigger&&this.runtimeInput.fire();},k.prototype.delete=function(){this.runtimeInput=null;},k})(),P;(function(k){k[k.General=128]="General",k[k.OpenUrl=131]="OpenUrl";})(P||(P={}));var C=(function(){function k(d){this.isBindableArtboard=false,this.isBindableArtboard=d;}return k})(),E=(function(k){p(d,k);function d(h,S){var G=k.call(this,false)||this;return G.nativeArtboard=h,G.file=S,G}return d})(C),B=(function(k){p(d,k);function d(h){var S=k.call(this,true)||this;return S.selfUnref=false,S.nativeArtboard=h,S}return Object.defineProperty(d.prototype,"viewModel",{set:function(h){this.nativeViewModel=h.nativeInstance;},enumerable:false,configurable:true}),d.prototype.destroy=function(){var h;this.selfUnref&&(this.nativeArtboard.unref(),(h=this.nativeViewModel)===null||h===void 0||h.unref());},d})(C),j=(function(){function k(d,h,S,G){this.stateMachine=d,this.playing=S,this.artboard=G,this.inputs=[],this.instance=new h.StateMachineInstance(d,G),this.initInputs(h);}return Object.defineProperty(k.prototype,"name",{get:function(){return this.stateMachine.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"statesChanged",{get:function(){for(var d=[],h=0;h<this.instance.stateChangedCount();h++)d.push(this.instance.stateChangedNameByIndex(h));return d},enumerable:false,configurable:true}),k.prototype.advance=function(d){this.instance.advance(d);},k.prototype.advanceAndApply=function(d){this.instance.advanceAndApply(d);},k.prototype.reportedEventCount=function(){return this.instance.reportedEventCount()},k.prototype.reportedEventAt=function(d){return this.instance.reportedEventAt(d)},k.prototype.initInputs=function(d){for(var h=0;h<this.instance.inputCount();h++){var S=this.instance.input(h);this.inputs.push(this.mapRuntimeInput(S,d));}},k.prototype.mapRuntimeInput=function(d,h){if(d.type===h.SMIInput.bool)return new R(T.Boolean,d.asBool());if(d.type===h.SMIInput.number)return new R(T.Number,d.asNumber());if(d.type===h.SMIInput.trigger)return new R(T.Trigger,d.asTrigger())},k.prototype.cleanup=function(){this.inputs.forEach(function(d){d.delete();}),this.inputs.length=0,this.instance.delete();},k.prototype.bindViewModelInstance=function(d){d.runtimeInstance!=null&&this.instance.bindViewModelInstance(d.runtimeInstance);},k})(),V=(function(){function k(d,h,S,G,W){G===void 0&&(G=[]),W===void 0&&(W=[]),this.runtime=d,this.artboard=h,this.eventManager=S,this.animations=G,this.stateMachines=W;}return k.prototype.add=function(d,h,S){if(S===void 0&&(S=true),d=pt(d),d.length===0)this.animations.forEach(function(Ke){return Ke.playing=h}),this.stateMachines.forEach(function(Ke){return Ke.playing=h});else for(var G=this.animations.map(function(Ke){return Ke.name}),W=this.stateMachines.map(function(Ke){return Ke.name}),J=0;J<d.length;J++){var de=G.indexOf(d[J]),xe=W.indexOf(d[J]);if(de>=0||xe>=0)de>=0?this.animations[de].playing=h:this.stateMachines[xe].playing=h;else {var ge=this.artboard.animationByName(d[J]);if(ge){var we=new u.Animation(ge,this.artboard,this.runtime,h);we.advance(0),we.apply(1),this.animations.push(we);}else {var Je=this.artboard.stateMachineByName(d[J]);if(Je){var at=new j(Je,this.runtime,h,this.artboard);this.stateMachines.push(at);}}}}return S&&(h?this.eventManager.fire({type:U.Play,data:this.playing}):this.eventManager.fire({type:U.Pause,data:this.paused})),h?this.playing:this.paused},k.prototype.initLinearAnimations=function(d,h){for(var S=this.animations.map(function(xe){return xe.name}),G=0;G<d.length;G++){var W=S.indexOf(d[G]);if(W>=0)this.animations[W].playing=h;else {var J=this.artboard.animationByName(d[G]);if(J){var de=new u.Animation(J,this.artboard,this.runtime,h);de.advance(0),de.apply(1),this.animations.push(de);}else console.error("Animation with name ".concat(d[G]," not found."));}}},k.prototype.initStateMachines=function(d,h){for(var S=this.stateMachines.map(function(xe){return xe.name}),G=0;G<d.length;G++){var W=S.indexOf(d[G]);if(W>=0)this.stateMachines[W].playing=h;else {var J=this.artboard.stateMachineByName(d[G]);if(J){var de=new j(J,this.runtime,h,this.artboard);this.stateMachines.push(de);}else console.warn("State Machine with name ".concat(d[G]," not found.")),this.initLinearAnimations([d[G]],h);}}},k.prototype.play=function(d){return this.add(d,true)},k.prototype.advanceIfPaused=function(){this.stateMachines.forEach(function(d){d.playing||d.advanceAndApply(0);});},k.prototype.pause=function(d){return this.add(d,false)},k.prototype.scrub=function(d,h){var S=this.animations.filter(function(G){return d.includes(G.name)});return S.forEach(function(G){return G.scrubTo=h}),S.map(function(G){return G.name})},Object.defineProperty(k.prototype,"playing",{get:function(){return this.animations.filter(function(d){return d.playing}).map(function(d){return d.name}).concat(this.stateMachines.filter(function(d){return d.playing}).map(function(d){return d.name}))},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"paused",{get:function(){return this.animations.filter(function(d){return !d.playing}).map(function(d){return d.name}).concat(this.stateMachines.filter(function(d){return !d.playing}).map(function(d){return d.name}))},enumerable:false,configurable:true}),k.prototype.stop=function(d){var h=this;d=pt(d);var S=[];if(d.length===0)S=this.animations.map(function(J){return J.name}).concat(this.stateMachines.map(function(J){return J.name})),this.animations.forEach(function(J){return J.cleanup()}),this.stateMachines.forEach(function(J){return J.cleanup()}),this.animations.splice(0,this.animations.length),this.stateMachines.splice(0,this.stateMachines.length);else {var G=this.animations.filter(function(J){return d.includes(J.name)});G.forEach(function(J){J.cleanup(),h.animations.splice(h.animations.indexOf(J),1);});var W=this.stateMachines.filter(function(J){return d.includes(J.name)});W.forEach(function(J){J.cleanup(),h.stateMachines.splice(h.stateMachines.indexOf(J),1);}),S=G.map(function(J){return J.name}).concat(W.map(function(J){return J.name}));}return this.eventManager.fire({type:U.Stop,data:S}),S},Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animations.reduce(function(d,h){return d||h.playing},false)||this.stateMachines.reduce(function(d,h){return d||h.playing},false)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return !this.isPlaying&&(this.animations.length>0||this.stateMachines.length>0)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){return this.animations.length===0&&this.stateMachines.length===0},enumerable:false,configurable:true}),k.prototype.atLeastOne=function(d,h){h===void 0&&(h=true);var S;return this.animations.length===0&&this.stateMachines.length===0&&(this.artboard.animationCount()>0?this.add([S=this.artboard.animationByIndex(0).name],d,h):this.artboard.stateMachineCount()>0&&this.add([S=this.artboard.stateMachineByIndex(0).name],d,h)),S},k.prototype.handleLooping=function(){for(var d=0,h=this.animations.filter(function(G){return G.playing});d<h.length;d++){var S=h[d];S.loopValue===0&&S.loopCount?(S.loopCount=0,this.stop(S.name)):S.loopValue===1&&S.loopCount?(this.eventManager.fire({type:U.Loop,data:{animation:S.name,type:ce.Loop}}),S.loopCount=0):S.loopValue===2&&S.loopCount>1&&(this.eventManager.fire({type:U.Loop,data:{animation:S.name,type:ce.PingPong}}),S.loopCount=0);}},k.prototype.handleStateChanges=function(){for(var d=[],h=0,S=this.stateMachines.filter(function(W){return W.playing});h<S.length;h++){var G=S[h];d.push.apply(d,G.statesChanged);}d.length>0&&this.eventManager.fire({type:U.StateChange,data:d});},k.prototype.handleAdvancing=function(d){this.eventManager.fire({type:U.Advance,data:d});},k})(),U;(function(k){k.Load="load",k.LoadError="loaderror",k.Play="play",k.Pause="pause",k.Stop="stop",k.Loop="loop",k.Draw="draw",k.Advance="advance",k.StateChange="statechange",k.RiveEvent="riveevent",k.AudioStatusChange="audiostatuschange";})(U||(U={}));var ce;(function(k){k.OneShot="oneshot",k.Loop="loop",k.PingPong="pingpong";})(ce||(ce={}));var Y=(function(){function k(d){d===void 0&&(d=[]),this.listeners=d;}return k.prototype.getListeners=function(d){return this.listeners.filter(function(h){return h.type===d})},k.prototype.add=function(d){this.listeners.includes(d)||this.listeners.push(d);},k.prototype.remove=function(d){for(var h=0;h<this.listeners.length;h++){var S=this.listeners[h];if(S.type===d.type&&S.callback===d.callback){this.listeners.splice(h,1);break}}},k.prototype.removeAll=function(d){var h=this;d?this.listeners.filter(function(S){return S.type===d}).forEach(function(S){return h.remove(S)}):this.listeners.splice(0,this.listeners.length);},k.prototype.fire=function(d){var h=this.getListeners(d.type);h.forEach(function(S){return S.callback(d)});},k})(),ie=(function(){function k(d){this.eventManager=d,this.queue=[];}return k.prototype.add=function(d){this.queue.push(d);},k.prototype.process=function(){for(;this.queue.length>0;){var d=this.queue.shift();d?.action&&d.action(),d?.event&&this.eventManager.fire(d.event);}},k})(),se;(function(k){k[k.AVAILABLE=0]="AVAILABLE",k[k.UNAVAILABLE=1]="UNAVAILABLE";})(se||(se={}));var ae=(function(k){p(d,k);function d(){var h=k!==null&&k.apply(this,arguments)||this;return h._started=false,h._enabled=false,h._status=se.UNAVAILABLE,h}return d.prototype.delay=function(h){return b(this,void 0,void 0,function(){return y(this,function(S){return [2,new Promise(function(G){return setTimeout(G,h)})]})})},d.prototype.timeout=function(){return b(this,void 0,void 0,function(){return y(this,function(h){return [2,new Promise(function(S,G){return setTimeout(G,50)})]})})},d.prototype.reportToListeners=function(){this.fire({type:U.AudioStatusChange}),this.removeAll();},d.prototype.enableAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(h){return this._enabled||(this._enabled=true,this._status=se.AVAILABLE,this.reportToListeners()),[2]})})},d.prototype.testAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(h){switch(h.label){case 0:if(!(this._status===se.UNAVAILABLE&&this._audioContext!==null))return [3,4];h.label=1;case 1:return h.trys.push([1,3,,4]),[4,Promise.race([this._audioContext.resume(),this.timeout()])];case 2:return h.sent(),this.enableAudio(),[3,4];case 3:return h.sent(),[3,4];case 4:return [2]}})})},d.prototype._establishAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(h){switch(h.label){case 0:return this._started?[3,5]:(this._started=true,typeof window>"u"?(this.enableAudio(),[3,5]):[3,1]);case 1:this._audioContext=new AudioContext,this.listenForUserAction(),h.label=2;case 2:return this._status!==se.UNAVAILABLE?[3,5]:[4,this.testAudio()];case 3:return h.sent(),[4,this.delay(1e3)];case 4:return h.sent(),[3,2];case 5:return [2]}})})},d.prototype.listenForUserAction=function(){var h=this,S=function(){return b(h,void 0,void 0,function(){return y(this,function(G){return this.enableAudio(),[2]})})};document.addEventListener("pointerdown",S,{once:true});},d.prototype.establishAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(h){return this._establishAudio(),[2]})})},Object.defineProperty(d.prototype,"systemVolume",{get:function(){return this._status===se.UNAVAILABLE?(this.testAudio(),0):1},enumerable:false,configurable:true}),Object.defineProperty(d.prototype,"status",{get:function(){return this._status},enumerable:false,configurable:true}),d})(Y),ne=new ae,q=(function(){function k(){}return k.prototype.observe=function(){},k.prototype.unobserve=function(){},k.prototype.disconnect=function(){},k})(),Z=globalThis.ResizeObserver||q,F=(function(){function k(){var d=this;this._elementsMap=new Map,this._onObservedEntry=function(h){var S=d._elementsMap.get(h.target);S!==null?S.onResize(h.target.clientWidth==0||h.target.clientHeight==0):d._resizeObserver.unobserve(h.target);},this._onObserved=function(h){h.forEach(d._onObservedEntry);},this._resizeObserver=new Z(this._onObserved);}return k.prototype.add=function(d,h){var S={onResize:h,element:d};return this._elementsMap.set(d,S),this._resizeObserver.observe(d),S},k.prototype.remove=function(d){this._resizeObserver.unobserve(d.element),this._elementsMap.delete(d.element);},k})(),$=new F,Q=(function(){function k(d){this.enableRiveAssetCDN=true,this.referenceCount=0,this.destroyed=false,this.selfUnref=false,this.bindableArtboards=[],this.src=d.src,this.buffer=d.buffer,d.assetLoader&&(this.assetLoader=d.assetLoader),this.enableRiveAssetCDN=typeof d.enableRiveAssetCDN=="boolean"?d.enableRiveAssetCDN:true,this.eventManager=new Y,d.onLoad&&this.on(U.Load,d.onLoad),d.onLoadError&&this.on(U.LoadError,d.onLoadError);}return k.prototype.releaseFile=function(){var d;this.selfUnref&&((d=this.file)===null||d===void 0||d.unref()),this.file=null;},k.prototype.releaseBindableArtboards=function(){this.bindableArtboards.forEach(function(d){return d.destroy()});},k.prototype.initData=function(){return b(this,void 0,void 0,function(){var d,h,S,G,W;return y(this,function(J){switch(J.label){case 0:return this.src?(d=this,[4,gn(this.src)]):[3,2];case 1:d.buffer=J.sent(),J.label=2;case 2:return this.destroyed?[2]:(this.assetLoader&&(S=new f.CustomFileAssetLoaderWrapper(this.runtime,this.assetLoader),h=S.assetLoader),G=this,[4,this.runtime.load(new Uint8Array(this.buffer),h,this.enableRiveAssetCDN)]);case 3:return G.file=J.sent(),W=new f.FileFinalizer(this.file),f.finalizationRegistry.register(this,W),this.destroyed?(this.releaseFile(),[2]):(this.file!==null?this.eventManager.fire({type:U.Load,data:this}):this.fireLoadError(k.fileLoadErrorMessage),[2])}})})},k.prototype.init=function(){return b(this,void 0,void 0,function(){var d,h;return y(this,function(S){switch(S.label){case 0:if(!this.src&&!this.buffer)return this.fireLoadError(k.missingErrorMessage),[2];S.label=1;case 1:return S.trys.push([1,4,,5]),d=this,[4,O.awaitInstance()];case 2:return d.runtime=S.sent(),this.destroyed?[2]:[4,this.initData()];case 3:return S.sent(),[3,5];case 4:return h=S.sent(),this.fireLoadError(h instanceof Error?h.message:k.fileLoadErrorMessage),[3,5];case 5:return [2]}})})},k.prototype.fireLoadError=function(d){throw this.eventManager.fire({type:U.LoadError,data:d}),new Error(d)},k.prototype.on=function(d,h){this.eventManager.add({type:d,callback:h});},k.prototype.off=function(d,h){this.eventManager.remove({type:d,callback:h});},k.prototype.cleanup=function(){this.referenceCount-=1,this.referenceCount<=0&&(this.removeAllRiveEventListeners(),this.releaseFile(),this.releaseBindableArtboards(),this.destroyed=true);},k.prototype.removeAllRiveEventListeners=function(d){this.eventManager.removeAll(d);},k.prototype.getInstance=function(){if(this.file!==null)return this.referenceCount+=1,this.file},k.prototype.destroyIfUnused=function(){this.referenceCount<=0&&this.cleanup();},k.prototype.createBindableArtboard=function(d){if(d!=null){var h=new B(d);return (0, f.createFinalization)(h,h.nativeArtboard),this.bindableArtboards.push(h),h}return null},k.prototype.getArtboard=function(d){var h=this.file.artboardByName(d);if(h!=null)return new E(h,this)},k.prototype.getBindableArtboard=function(d){var h=this.file.bindableArtboardByName(d);return this.createBindableArtboard(h)},k.prototype.getDefaultBindableArtboard=function(){var d=this.file.bindableArtboardDefault();return this.createBindableArtboard(d)},k.prototype.internalBindableArtboardFromArtboard=function(d){var h=this.file.internalBindableArtboardFromArtboard(d);return this.createBindableArtboard(h)},k.prototype.viewModelByName=function(d){var h=this.file.viewModelByName(d);return h!==null?new le(h):null},k.missingErrorMessage="Rive source file or data buffer required",k.fileLoadErrorMessage="The file failed to load",k})(),re=(function(){function k(d){var h=this,S,G;this.loaded=false,this.destroyed=false,this._observed=null,this.readyForPlaying=false,this.artboard=null,this.eventCleanup=null,this.shouldDisableRiveListeners=false,this.automaticallyHandleEvents=false,this.dispatchPointerExit=true,this.enableMultiTouch=false,this.enableRiveAssetCDN=true,this._volume=1,this._artboardWidth=void 0,this._artboardHeight=void 0,this._devicePixelRatioUsed=1,this._hasZeroSize=false,this._needsRedraw=false,this._currentCanvasWidth=0,this._currentCanvasHeight=0,this._audioEventListener=null,this._boundDraw=null,this._viewModelInstance=null,this._dataEnums=null,this.drawOptimization=D.DrawOnChanged,this.durations=[],this.frameTimes=[],this.frameCount=0,this.isTouchScrollEnabled=false,this.onCanvasResize=function(W){var J=h._hasZeroSize!==W;h._hasZeroSize=W,W?(!h._layout.maxX||!h._layout.maxY)&&h.resizeToCanvas():J&&h.resizeDrawingSurfaceToCanvas();},this.renderSecondTimer=0,this._boundDraw=this.draw.bind(this),this.canvas=d.canvas,d.canvas.constructor===HTMLCanvasElement&&(this._observed=$.add(this.canvas,this.onCanvasResize)),this._currentCanvasWidth=this.canvas.width,this._currentCanvasHeight=this.canvas.height,this.src=d.src,this.buffer=d.buffer,this.riveFile=d.riveFile,this.layout=(S=d.layout)!==null&&S!==void 0?S:new z,this.shouldDisableRiveListeners=!!d.shouldDisableRiveListeners,this.isTouchScrollEnabled=!!d.isTouchScrollEnabled,this.automaticallyHandleEvents=!!d.automaticallyHandleEvents,this.dispatchPointerExit=d.dispatchPointerExit===false?d.dispatchPointerExit:this.dispatchPointerExit,this.enableMultiTouch=!!d.enableMultiTouch,this.drawOptimization=(G=d.drawingOptions)!==null&&G!==void 0?G:this.drawOptimization,this.enableRiveAssetCDN=d.enableRiveAssetCDN===void 0?true:d.enableRiveAssetCDN,this.eventManager=new Y,d.onLoad&&this.on(U.Load,d.onLoad),d.onLoadError&&this.on(U.LoadError,d.onLoadError),d.onPlay&&this.on(U.Play,d.onPlay),d.onPause&&this.on(U.Pause,d.onPause),d.onStop&&this.on(U.Stop,d.onStop),d.onLoop&&this.on(U.Loop,d.onLoop),d.onStateChange&&this.on(U.StateChange,d.onStateChange),d.onAdvance&&this.on(U.Advance,d.onAdvance),d.onload&&!d.onLoad&&this.on(U.Load,d.onload),d.onloaderror&&!d.onLoadError&&this.on(U.LoadError,d.onloaderror),d.onplay&&!d.onPlay&&this.on(U.Play,d.onplay),d.onpause&&!d.onPause&&this.on(U.Pause,d.onpause),d.onstop&&!d.onStop&&this.on(U.Stop,d.onstop),d.onloop&&!d.onLoop&&this.on(U.Loop,d.onloop),d.onstatechange&&!d.onStateChange&&this.on(U.StateChange,d.onstatechange),d.assetLoader&&(this.assetLoader=d.assetLoader),this.taskQueue=new ie(this.eventManager),this.init({src:this.src,buffer:this.buffer,riveFile:this.riveFile,autoplay:d.autoplay,autoBind:d.autoBind,animations:d.animations,stateMachines:d.stateMachines,artboard:d.artboard,useOffscreenRenderer:d.useOffscreenRenderer});}return Object.defineProperty(k.prototype,"viewModelCount",{get:function(){return this.file.viewModelCount()},enumerable:false,configurable:true}),k.new=function(d){return console.warn("This function is deprecated: please use `new Rive({})` instead"),new k(d)},k.prototype.onSystemAudioChanged=function(){this.volume=this._volume;},k.prototype.init=function(d){var h=this,S=d.src,G=d.buffer,W=d.riveFile,J=d.animations,de=d.stateMachines,xe=d.artboard,ge=d.autoplay,we=ge===void 0?false:ge,Je=d.useOffscreenRenderer,at=Je===void 0?false:Je,Ke=d.autoBind,_t=Ke===void 0?false:Ke;if(!this.destroyed){if(this.src=S,this.buffer=G,this.riveFile=W,!this.src&&!this.buffer&&!this.riveFile)throw new A(k.missingErrorMessage);var gt=pt(J),qt=pt(de);this.loaded=false,this.readyForPlaying=false,O.awaitInstance().then(function(Xt){h.destroyed||(h.runtime=Xt,h.removeRiveListeners(),h.deleteRiveRenderer(),h.renderer=h.runtime.makeRenderer(h.canvas,at),h.canvas.width||h.canvas.height||h.resizeDrawingSurfaceToCanvas(),h.initData(xe,gt,qt,we,_t).then(function(rn){if(rn)return h.setupRiveListeners()}).catch(function(rn){console.error(rn);}));}).catch(function(Xt){console.error(Xt);});}},k.prototype.setupRiveListeners=function(d){var h=this;if(this.eventCleanup&&this.eventCleanup(),!this.shouldDisableRiveListeners){var S=(this.animator.stateMachines||[]).filter(function(de){return de.playing&&h.runtime.hasListeners(de.instance)}).map(function(de){return de.instance}),G=this.isTouchScrollEnabled,W=this.dispatchPointerExit,J=this.enableMultiTouch;d&&"isTouchScrollEnabled"in d&&(G=d.isTouchScrollEnabled),this.eventCleanup=(0, f.registerTouchInteractions)({canvas:this.canvas,artboard:this.artboard,stateMachines:S,renderer:this.renderer,rive:this.runtime,fit:this._layout.runtimeFit(this.runtime),alignment:this._layout.runtimeAlignment(this.runtime),isTouchScrollEnabled:G,dispatchPointerExit:W,enableMultiTouch:J,layoutScaleFactor:this._layout.layoutScaleFactor});}},k.prototype.removeRiveListeners=function(){this.eventCleanup&&(this.eventCleanup(),this.eventCleanup=null);},k.prototype.initializeAudio=function(){var d=this,h;ne.status==se.UNAVAILABLE&&!((h=this.artboard)===null||h===void 0)&&h.hasAudio&&this._audioEventListener===null&&(this._audioEventListener={type:U.AudioStatusChange,callback:function(){return d.onSystemAudioChanged()}},ne.add(this._audioEventListener),ne.establishAudio());},k.prototype.initArtboardSize=function(){this.artboard&&(this._artboardWidth=this.artboard.width=this._artboardWidth||this.artboard.width,this._artboardHeight=this.artboard.height=this._artboardHeight||this.artboard.height);},k.prototype.initData=function(d,h,S,G,W){return b(this,void 0,void 0,function(){var J,de,xe,ge;return y(this,function(we){switch(we.label){case 0:return we.trys.push([0,3,,4]),this.riveFile!=null?[3,2]:(J=new Q({src:this.src,buffer:this.buffer,enableRiveAssetCDN:this.enableRiveAssetCDN,assetLoader:this.assetLoader}),this.riveFile=J,[4,J.init()]);case 1:if(we.sent(),this.destroyed)return J.destroyIfUnused(),[2,false];we.label=2;case 2:return this.file=this.riveFile.getInstance(),this.initArtboard(d,h,S,G,W),this.initArtboardSize(),this.initializeAudio(),this.loaded=true,this.eventManager.fire({type:U.Load,data:(ge=this.src)!==null&&ge!==void 0?ge:"buffer"}),this.animator.advanceIfPaused(),this.readyForPlaying=true,this.taskQueue.process(),this.drawFrame(),[2,true];case 3:return de=we.sent(),xe=M(de),console.warn(xe),this.eventManager.fire({type:U.LoadError,data:xe}),[2,Promise.reject(xe)];case 4:return [2]}})})},k.prototype.initArtboard=function(d,h,S,G,W){if(this.file){var J=d?this.file.artboardByName(d):this.file.defaultArtboard();if(!J){var de="Invalid artboard name or no default artboard";console.warn(de),this.eventManager.fire({type:U.LoadError,data:de});return}this.artboard=J,J.volume=this._volume*ne.systemVolume,this.animator=new V(this.runtime,this.artboard,this.eventManager);var xe;if(h.length>0||S.length>0?(xe=h.concat(S),this.animator.initLinearAnimations(h,G),this.animator.initStateMachines(S,G)):xe=[this.animator.atLeastOne(G,false)],this.taskQueue.add({event:{type:G?U.Play:U.Pause,data:xe}}),W){var ge=this.file.defaultArtboardViewModel(J);if(ge!==null){var we=ge.defaultInstance();if(we!==null){var Je=new Be(we,null);(0, f.createFinalization)(Je,Je.runtimeInstance),this.bindViewModelInstance(Je);}}}}},k.prototype.drawFrame=function(){var d,h;!((d=document?.timeline)===null||d===void 0)&&d.currentTime?this.loaded&&this.artboard&&!this.frameRequestId&&(this._boundDraw(document.timeline.currentTime),(h=this.runtime)===null||h===void 0||h.resolveAnimationFrame()):this.scheduleRendering();},k.prototype._canvasSizeChanged=function(){var d=false;return this.canvas&&(this.canvas.width!==this._currentCanvasWidth&&(this._currentCanvasWidth=this.canvas.width,d=true),this.canvas.height!==this._currentCanvasHeight&&(this._currentCanvasHeight=this.canvas.height,d=true)),d},k.prototype.draw=function(d,h){var S;this.frameRequestId=null;var G=performance.now();this.lastRenderTime||(this.lastRenderTime=d),this.renderSecondTimer+=d-this.lastRenderTime,this.renderSecondTimer>5e3&&(this.renderSecondTimer=0,h?.());var W=(d-this.lastRenderTime)/1e3;this.lastRenderTime=d;for(var J=this.animator.animations.filter(function(an){return an.playing||an.needsScrub}).sort(function(an){return an.needsScrub?-1:1}),de=0,xe=J;de<xe.length;de++){var ge=xe[de];ge.advance(W),ge.instance.didLoop&&(ge.loopCount+=1),ge.apply(1);}for(var we=this.animator.stateMachines.filter(function(an){return an.playing}),Je=0,at=we;Je<at.length;Je++){var Ke=at[Je],_t=Ke.reportedEventCount();if(_t)for(var gt=0;gt<_t;gt++){var qt=Ke.reportedEventAt(gt);if(qt)if(qt.type===P.OpenUrl){if(this.eventManager.fire({type:U.RiveEvent,data:qt}),this.automaticallyHandleEvents){var Xt=document.createElement("a"),rn=qt,Gn=rn.url,Oe=rn.target,Un=(0, f.sanitizeUrl)(Gn);Gn&&Xt.setAttribute("href",Un),Oe&&Xt.setAttribute("target",Oe),Un&&Un!==f.BLANK_URL&&Xt.click();}}else this.eventManager.fire({type:U.RiveEvent,data:qt});}Ke.advanceAndApply(W);}this.animator.stateMachines.length==0&&this.artboard.advance(W);var on=this.renderer;this._hasZeroSize||(this.drawOptimization==D.AlwaysDraw||this.artboard.didChange()||this._needsRedraw||this._canvasSizeChanged())&&(on.clear(),on.save(),this.alignRenderer(),this.artboard.draw(on),on.restore(),on.flush(),this._needsRedraw=false),this.animator.handleLooping(),this.animator.handleStateChanges(),this.animator.handleAdvancing(W),this.frameCount++;var Ye=performance.now();for(this.frameTimes.push(Ye),this.durations.push(Ye-G);this.frameTimes[0]<=Ye-1e3;)this.frameTimes.shift(),this.durations.shift();(S=this._viewModelInstance)===null||S===void 0||S.handleCallbacks(),this.animator.isPlaying?this.scheduleRendering():this.animator.isPaused?this.lastRenderTime=0:this.animator.isStopped&&(this.lastRenderTime=0);},k.prototype.alignRenderer=function(){var d=this,h=d.renderer,S=d.runtime,G=d._layout,W=d.artboard;h.align(G.runtimeFit(S),G.runtimeAlignment(S),{minX:G.minX,minY:G.minY,maxX:G.maxX,maxY:G.maxY},W.bounds,this._devicePixelRatioUsed*G.layoutScaleFactor);},Object.defineProperty(k.prototype,"fps",{get:function(){return this.durations.length},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"frameTime",{get:function(){return this.durations.length===0?0:(this.durations.reduce(function(d,h){return d+h},0)/this.durations.length).toFixed(4)},enumerable:false,configurable:true}),k.prototype.cleanup=function(){var d,h;this.destroyed=true,this.stopRendering(),this.cleanupInstances(),this._observed!==null&&$.remove(this._observed),this.removeRiveListeners(),this.file&&((d=this.riveFile)===null||d===void 0||d.cleanup(),this.file=null),this.riveFile=null,this.deleteRiveRenderer(),this._audioEventListener!==null&&(ne.remove(this._audioEventListener),this._audioEventListener=null),(h=this._viewModelInstance)===null||h===void 0||h.cleanup(),this._viewModelInstance=null,this._dataEnums=null;},k.prototype.deleteRiveRenderer=function(){var d;(d=this.renderer)===null||d===void 0||d.delete(),this.renderer=null;},k.prototype.cleanupInstances=function(){this.eventCleanup!==null&&this.eventCleanup(),this.stop(),this.artboard&&(this.artboard.delete(),this.artboard=null);},k.prototype.retrieveTextRun=function(d){var h;if(!d){console.warn("No text run name provided");return}if(!this.artboard){console.warn("Tried to access text run, but the Artboard is null");return}var S=this.artboard.textRun(d);if(!S){console.warn("Could not access a text run with name '".concat(d,"' in the '").concat((h=this.artboard)===null||h===void 0?void 0:h.name,"' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."));return}return S},k.prototype.getTextRunValue=function(d){var h=this.retrieveTextRun(d);return h?h.text:void 0},k.prototype.setTextRunValue=function(d,h){var S=this.retrieveTextRun(d);S&&(S.text=h);},k.prototype.play=function(d,h){var S=this;if(d=pt(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return S.play(d,h)}});return}this.animator.play(d),this.eventCleanup&&this.eventCleanup(),this.setupRiveListeners(),this.startRendering();},k.prototype.pause=function(d){var h=this;if(d=pt(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return h.pause(d)}});return}this.eventCleanup&&this.eventCleanup(),this.animator.pause(d);},k.prototype.scrub=function(d,h){var S=this;if(d=pt(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return S.scrub(d,h)}});return}this.animator.scrub(d,h||0),this.drawFrame();},k.prototype.stop=function(d){var h=this;if(d=pt(d),!this.readyForPlaying){this.taskQueue.add({action:function(){return h.stop(d)}});return}this.animator&&this.animator.stop(d),this.eventCleanup&&this.eventCleanup();},k.prototype.reset=function(d){var h,S,G=d?.artboard,W=pt(d?.animations),J=pt(d?.stateMachines),de=(h=d?.autoplay)!==null&&h!==void 0?h:false,xe=(S=d?.autoBind)!==null&&S!==void 0?S:false;this.cleanupInstances(),this.initArtboard(G,W,J,de,xe),this.taskQueue.process();},k.prototype.load=function(d){this.file=null,this.stop(),this.init(d);},Object.defineProperty(k.prototype,"layout",{get:function(){return this._layout},set:function(d){this._layout=d,(!d.maxX||!d.maxY)&&this.resizeToCanvas(),this.loaded&&!this.animator.isPlaying&&this.drawFrame();},enumerable:false,configurable:true}),k.prototype.resizeToCanvas=function(){this._layout=this.layout.copyWith({minX:0,minY:0,maxX:this.canvas.width,maxY:this.canvas.height});},k.prototype.resizeDrawingSurfaceToCanvas=function(d){if(this.canvas instanceof HTMLCanvasElement&&window){var h=this.canvas.getBoundingClientRect(),S=h.width,G=h.height,W=d||window.devicePixelRatio||1;if(this.devicePixelRatioUsed=W,this.canvas.width=W*S,this.canvas.height=W*G,this._needsRedraw=true,this.resizeToCanvas(),this.drawFrame(),this.layout.fit===I.Layout){var J=this._layout.layoutScaleFactor;this.artboard.width=S/J,this.artboard.height=G/J;}}},Object.defineProperty(k.prototype,"source",{get:function(){return this.src},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"activeArtboard",{get:function(){return this.artboard?this.artboard.name:""},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"animationNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var d=[],h=0;h<this.artboard.animationCount();h++)d.push(this.artboard.animationByIndex(h).name);return d},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"stateMachineNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var d=[],h=0;h<this.artboard.stateMachineCount();h++)d.push(this.artboard.stateMachineByIndex(h).name);return d},enumerable:false,configurable:true}),k.prototype.stateMachineInputs=function(d){if(this.loaded){var h=this.animator.stateMachines.find(function(S){return S.name===d});return h?.inputs}},k.prototype.retrieveInputAtPath=function(d,h){if(!d){console.warn("No input name provided for path '".concat(h,"'"));return}if(!this.artboard){console.warn("Tried to access input: '".concat(d,"', at path: '").concat(h,"', but the Artboard is null"));return}var S=this.artboard.inputByPath(d,h);if(!S){console.warn("Could not access an input with name: '".concat(d,"', at path:'").concat(h,"'"));return}return S},k.prototype.setBooleanStateAtPath=function(d,h,S){var G=this.retrieveInputAtPath(d,S);G&&(G.type===T.Boolean?G.asBool().value=h:console.warn("Input with name: '".concat(d,"', at path:'").concat(S,"' is not a boolean")));},k.prototype.setNumberStateAtPath=function(d,h,S){var G=this.retrieveInputAtPath(d,S);G&&(G.type===T.Number?G.asNumber().value=h:console.warn("Input with name: '".concat(d,"', at path:'").concat(S,"' is not a number")));},k.prototype.fireStateAtPath=function(d,h){var S=this.retrieveInputAtPath(d,h);S&&(S.type===T.Trigger?S.asTrigger().fire():console.warn("Input with name: '".concat(d,"', at path:'").concat(h,"' is not a trigger")));},k.prototype.retrieveTextAtPath=function(d,h){if(!d){console.warn("No text name provided for path '".concat(h,"'"));return}if(!h){console.warn("No path provided for text '".concat(d,"'"));return}if(!this.artboard){console.warn("Tried to access text: '".concat(d,"', at path: '").concat(h,"', but the Artboard is null"));return}var S=this.artboard.textByPath(d,h);if(!S){console.warn("Could not access text with name: '".concat(d,"', at path:'").concat(h,"'"));return}return S},k.prototype.getTextRunValueAtPath=function(d,h){var S=this.retrieveTextAtPath(d,h);if(!S){console.warn("Could not get text with name: '".concat(d,"', at path:'").concat(h,"'"));return}return S.text},k.prototype.setTextRunValueAtPath=function(d,h,S){var G=this.retrieveTextAtPath(d,S);if(!G){console.warn("Could not set text with name: '".concat(d,"', at path:'").concat(S,"'"));return}G.text=h;},Object.defineProperty(k.prototype,"playingStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(d){return d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"playingAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(d){return d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(d){return !d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(d){return !d.playing}).map(function(d){return d.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animator.isPlaying},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return this.animator.isPaused},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){var d,h;return (h=(d=this.animator)===null||d===void 0?void 0:d.isStopped)!==null&&h!==void 0?h:true},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"bounds",{get:function(){return this.artboard?this.artboard.bounds:void 0},enumerable:false,configurable:true}),k.prototype.on=function(d,h){this.eventManager.add({type:d,callback:h});},k.prototype.off=function(d,h){this.eventManager.remove({type:d,callback:h});},k.prototype.unsubscribe=function(d,h){console.warn("This function is deprecated: please use `off()` instead."),this.off(d,h);},k.prototype.removeAllRiveEventListeners=function(d){this.eventManager.removeAll(d);},k.prototype.unsubscribeAll=function(d){console.warn("This function is deprecated: please use `removeAllRiveEventListeners()` instead."),this.removeAllRiveEventListeners(d);},k.prototype.stopRendering=function(){this.loaded&&this.frameRequestId&&(this.runtime.cancelAnimationFrame?this.runtime.cancelAnimationFrame(this.frameRequestId):cancelAnimationFrame(this.frameRequestId),this.frameRequestId=null);},k.prototype.startRendering=function(){this.drawFrame();},k.prototype.scheduleRendering=function(){this.loaded&&this.artboard&&!this.frameRequestId&&(this.runtime.requestAnimationFrame?this.frameRequestId=this.runtime.requestAnimationFrame(this._boundDraw):this.frameRequestId=requestAnimationFrame(this._boundDraw));},k.prototype.enableFPSCounter=function(d){this.runtime.enableFPSCounter(d);},k.prototype.disableFPSCounter=function(){this.runtime.disableFPSCounter();},Object.defineProperty(k.prototype,"contents",{get:function(){if(this.loaded){for(var d={artboards:[]},h=0;h<this.file.artboardCount();h++){for(var S=this.file.artboardByIndex(h),G={name:S.name,animations:[],stateMachines:[]},W=0;W<S.animationCount();W++){var J=S.animationByIndex(W);G.animations.push(J.name);}for(var de=0;de<S.stateMachineCount();de++){for(var xe=S.stateMachineByIndex(de),ge=xe.name,we=new this.runtime.StateMachineInstance(xe,S),Je=[],at=0;at<we.inputCount();at++){var Ke=we.input(at);Je.push({name:Ke.name,type:Ke.type});}G.stateMachines.push({name:ge,inputs:Je});}d.artboards.push(G);}return d}},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"volume",{get:function(){return this.artboard&&this.artboard.volume!==this._volume&&(this._volume=this.artboard.volume),this._volume},set:function(d){this._volume=d,this.artboard&&(this.artboard.volume=d*ne.systemVolume);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardWidth",{get:function(){var d;return this.artboard?this.artboard.width:(d=this._artboardWidth)!==null&&d!==void 0?d:0},set:function(d){this._artboardWidth=d,this.artboard&&(this.artboard.width=d);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardHeight",{get:function(){var d;return this.artboard?this.artboard.height:(d=this._artboardHeight)!==null&&d!==void 0?d:0},set:function(d){this._artboardHeight=d,this.artboard&&(this.artboard.height=d);},enumerable:false,configurable:true}),k.prototype.resetArtboardSize=function(){this.artboard?(this.artboard.resetArtboardSize(),this._artboardWidth=this.artboard.width,this._artboardHeight=this.artboard.height):(this._artboardWidth=void 0,this._artboardHeight=void 0);},Object.defineProperty(k.prototype,"devicePixelRatioUsed",{get:function(){return this._devicePixelRatioUsed},set:function(d){this._devicePixelRatioUsed=d;},enumerable:false,configurable:true}),k.prototype.bindViewModelInstance=function(d){var h;this.artboard&&!this.destroyed&&d&&d.runtimeInstance&&(d.internalIncrementReferenceCount(),(h=this._viewModelInstance)===null||h===void 0||h.cleanup(),this._viewModelInstance=d,this.animator.stateMachines.length>0?this.animator.stateMachines.forEach(function(S){return S.bindViewModelInstance(d)}):this.artboard.bindViewModelInstance(d.runtimeInstance));},Object.defineProperty(k.prototype,"viewModelInstance",{get:function(){return this._viewModelInstance},enumerable:false,configurable:true}),k.prototype.viewModelByIndex=function(d){var h=this.file.viewModelByIndex(d);return h!==null?new le(h):null},k.prototype.viewModelByName=function(d){var h;return (h=this.riveFile)===null||h===void 0?void 0:h.viewModelByName(d)},k.prototype.enums=function(){if(this._dataEnums===null){var d=this.file.enums();this._dataEnums=d.map(function(h){return new ye(h)});}return this._dataEnums},k.prototype.defaultViewModel=function(){if(this.artboard){var d=this.file.defaultArtboardViewModel(this.artboard);if(d)return new le(d)}return null},k.prototype.getArtboard=function(d){var h,S;return (S=(h=this.riveFile)===null||h===void 0?void 0:h.getArtboard(d))!==null&&S!==void 0?S:null},k.prototype.getBindableArtboard=function(d){var h,S;return (S=(h=this.riveFile)===null||h===void 0?void 0:h.getBindableArtboard(d))!==null&&S!==void 0?S:null},k.prototype.getDefaultBindableArtboard=function(){var d,h;return (h=(d=this.riveFile)===null||d===void 0?void 0:d.getDefaultBindableArtboard())!==null&&h!==void 0?h:null},k.missingErrorMessage="Rive source file or data buffer required",k.cleanupErrorMessage="Attempt to use file after calling cleanup.",k})(),le=(function(){function k(d){this._viewModel=d;}return Object.defineProperty(k.prototype,"instanceCount",{get:function(){return this._viewModel.instanceCount},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModel.name},enumerable:false,configurable:true}),k.prototype.instanceByIndex=function(d){var h=this._viewModel.instanceByIndex(d);if(h!==null){var S=new Be(h,null);return (0, f.createFinalization)(S,h),S}return null},k.prototype.instanceByName=function(d){var h=this._viewModel.instanceByName(d);if(h!==null){var S=new Be(h,null);return (0, f.createFinalization)(S,h),S}return null},k.prototype.defaultInstance=function(){var d=this._viewModel.defaultInstance();if(d!==null){var h=new Be(d,null);return (0, f.createFinalization)(h,d),h}return null},k.prototype.instance=function(){var d=this._viewModel.instance();if(d!==null){var h=new Be(d,null);return (0, f.createFinalization)(h,d),h}return null},Object.defineProperty(k.prototype,"properties",{get:function(){return this._viewModel.getProperties()},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"instanceNames",{get:function(){return this._viewModel.getInstanceNames()},enumerable:false,configurable:true}),k})(),ye=(function(){function k(d){this._dataEnum=d;}return Object.defineProperty(k.prototype,"name",{get:function(){return this._dataEnum.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"values",{get:function(){return this._dataEnum.values},enumerable:false,configurable:true}),k})(),_e;(function(k){k.Number="number",k.String="string",k.Boolean="boolean",k.Color="color",k.Trigger="trigger",k.Enum="enum",k.List="list",k.Image="image",k.Artboard="artboard";})(_e||(_e={}));var Be=(function(){function k(d,h){this._parents=[],this._children=[],this._viewModelInstances=new Map,this._propertiesWithCallbacks=[],this._referenceCount=0,this.selfUnref=false,this._runtimeInstance=d,h!==null&&this._parents.push(h);}return Object.defineProperty(k.prototype,"runtimeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"nativeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),k.prototype.handleCallbacks=function(){this._propertiesWithCallbacks.length!==0&&(this._propertiesWithCallbacks.forEach(function(d){d.handleCallbacks();}),this._propertiesWithCallbacks.forEach(function(d){d.clearChanges();})),this._children.forEach(function(d){return d.handleCallbacks()});},k.prototype.addParent=function(d){this._parents.includes(d)||(this._parents.push(d),(this._propertiesWithCallbacks.length>0||this._children.length>0)&&d.addToViewModelCallbacks(this));},k.prototype.removeParent=function(d){var h=this._parents.indexOf(d);if(h!==-1){var S=this._parents[h];S.removeFromViewModelCallbacks(this),this._parents.splice(h,1);}},k.prototype.addToPropertyCallbacks=function(d){var h=this;this._propertiesWithCallbacks.includes(d)||(this._propertiesWithCallbacks.push(d),this._propertiesWithCallbacks.length>0&&this._parents.forEach(function(S){S.addToViewModelCallbacks(h);}));},k.prototype.removeFromPropertyCallbacks=function(d){var h=this;this._propertiesWithCallbacks.includes(d)&&(this._propertiesWithCallbacks=this._propertiesWithCallbacks.filter(function(S){return S!==d}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(S){S.removeFromViewModelCallbacks(h);}));},k.prototype.addToViewModelCallbacks=function(d){var h=this;this._children.includes(d)||(this._children.push(d),this._parents.forEach(function(S){S.addToViewModelCallbacks(h);}));},k.prototype.removeFromViewModelCallbacks=function(d){var h=this;this._children.includes(d)&&(this._children=this._children.filter(function(S){return S!==d}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(S){S.removeFromViewModelCallbacks(h);}));},k.prototype.clearCallbacks=function(){this._propertiesWithCallbacks.forEach(function(d){d.clearCallbacks();});},k.prototype.propertyFromPath=function(d,h){var S=d.split("/");return this.propertyFromPathSegments(S,0,h)},k.prototype.viewModelFromPathSegments=function(d,h){var S=this.internalViewModelInstance(d[h]);return S!==null?h==d.length-1?S:S.viewModelFromPathSegments(d,h++):null},k.prototype.propertyFromPathSegments=function(d,h,S){var G,W,J,de,xe,ge,we,Je,at,Ke,_t,gt,qt,Xt,rn,Gn,Oe,Un;if(h<d.length-1){var on=this.internalViewModelInstance(d[h]);return on!==null?on.propertyFromPathSegments(d,h+1,S):null}var Ye=null;switch(S){case _e.Number:if(Ye=(W=(G=this._runtimeInstance)===null||G===void 0?void 0:G.number(d[h]))!==null&&W!==void 0?W:null,Ye!==null)return new dt(Ye,this);break;case _e.String:if(Ye=(de=(J=this._runtimeInstance)===null||J===void 0?void 0:J.string(d[h]))!==null&&de!==void 0?de:null,Ye!==null)return new Bt(Ye,this);break;case _e.Boolean:if(Ye=(ge=(xe=this._runtimeInstance)===null||xe===void 0?void 0:xe.boolean(d[h]))!==null&&ge!==void 0?ge:null,Ye!==null)return new Et(Ye,this);break;case _e.Color:if(Ye=(Je=(we=this._runtimeInstance)===null||we===void 0?void 0:we.color(d[h]))!==null&&Je!==void 0?Je:null,Ye!==null)return new tt(Ye,this);break;case _e.Trigger:if(Ye=(Ke=(at=this._runtimeInstance)===null||at===void 0?void 0:at.trigger(d[h]))!==null&&Ke!==void 0?Ke:null,Ye!==null)return new Wt(Ye,this);break;case _e.Enum:if(Ye=(gt=(_t=this._runtimeInstance)===null||_t===void 0?void 0:_t.enum(d[h]))!==null&&gt!==void 0?gt:null,Ye!==null)return new Mt(Ye,this);break;case _e.List:if(Ye=(Xt=(qt=this._runtimeInstance)===null||qt===void 0?void 0:qt.list(d[h]))!==null&&Xt!==void 0?Xt:null,Ye!==null)return new Ht(Ye,this);break;case _e.Image:if(Ye=(Gn=(rn=this._runtimeInstance)===null||rn===void 0?void 0:rn.image(d[h]))!==null&&Gn!==void 0?Gn:null,Ye!==null)return new De(Ye,this);break;case _e.Artboard:if(Ye=(Un=(Oe=this._runtimeInstance)===null||Oe===void 0?void 0:Oe.artboard(d[h]))!==null&&Un!==void 0?Un:null,Ye!==null)return new mn(Ye,this);break}return null},k.prototype.internalViewModelInstance=function(d){var h;if(this._viewModelInstances.has(d))return this._viewModelInstances.get(d);var S=(h=this._runtimeInstance)===null||h===void 0?void 0:h.viewModel(d);if(S!==null){var G=new k(S,this);return (0, f.createFinalization)(G,S),G.internalIncrementReferenceCount(),this._viewModelInstances.set(d,G),G}return null},k.prototype.number=function(d){var h=this.propertyFromPath(d,_e.Number);return h},k.prototype.string=function(d){var h=this.propertyFromPath(d,_e.String);return h},k.prototype.boolean=function(d){var h=this.propertyFromPath(d,_e.Boolean);return h},k.prototype.color=function(d){var h=this.propertyFromPath(d,_e.Color);return h},k.prototype.trigger=function(d){var h=this.propertyFromPath(d,_e.Trigger);return h},k.prototype.enum=function(d){var h=this.propertyFromPath(d,_e.Enum);return h},k.prototype.list=function(d){var h=this.propertyFromPath(d,_e.List);return h},k.prototype.image=function(d){var h=this.propertyFromPath(d,_e.Image);return h},k.prototype.artboard=function(d){var h=this.propertyFromPath(d,_e.Artboard);return h},k.prototype.viewModel=function(d){var h=d.split("/"),S=h.length>1?this.viewModelFromPathSegments(h.slice(0,h.length-1),0):this;return S!=null?S.internalViewModelInstance(h[h.length-1]):null},k.prototype.internalReplaceViewModel=function(d,h){var S;if(h.runtimeInstance!==null){var G=((S=this._runtimeInstance)===null||S===void 0?void 0:S.replaceViewModel(d,h.runtimeInstance))||false;if(G){h.internalIncrementReferenceCount();var W=this.internalViewModelInstance(d);W!==null&&(W.removeParent(this),this._children.includes(W)&&(this._children=this._children.filter(function(J){return J!==W})),W.cleanup()),this._viewModelInstances.set(d,h),h.addParent(this);}return G}return  false},k.prototype.replaceViewModel=function(d,h){var S,G=d.split("/"),W=G.length>1?this.viewModelFromPathSegments(G.slice(0,G.length-1),0):this;return (S=W?.internalReplaceViewModel(G[G.length-1],h))!==null&&S!==void 0?S:false},k.prototype.incrementReferenceCount=function(){var d;this._referenceCount++,(d=this._runtimeInstance)===null||d===void 0||d.incrementReferenceCount();},k.prototype.decrementReferenceCount=function(){var d;this._referenceCount--,(d=this._runtimeInstance)===null||d===void 0||d.decrementReferenceCount();},Object.defineProperty(k.prototype,"properties",{get:function(){var d;return ((d=this._runtimeInstance)===null||d===void 0?void 0:d.getProperties().map(function(h){return m({},h)}))||[]},enumerable:false,configurable:true}),k.prototype.internalIncrementReferenceCount=function(){this._referenceCount++;},k.prototype.cleanup=function(){var d=this,h;if(this._referenceCount--,this._referenceCount<=0){this.selfUnref&&((h=this._runtimeInstance)===null||h===void 0||h.unref()),this._runtimeInstance=null,this.clearCallbacks(),this._propertiesWithCallbacks=[],this._viewModelInstances.forEach(function(W){W.cleanup();}),this._viewModelInstances.clear();var S=g([],this._children);this._children.length=0;var G=g([],this._parents);this._parents.length=0,S.forEach(function(W){W.removeParent(d);}),G.forEach(function(W){W.removeFromViewModelCallbacks(d);});}},k})(),xt=(function(){function k(d,h){this.callbacks=[],this._viewModelInstanceValue=d,this._parentViewModel=h;}return k.prototype.on=function(d){this.callbacks.length===0&&this._viewModelInstanceValue.clearChanges(),this.callbacks.includes(d)||(this.callbacks.push(d),this._parentViewModel.addToPropertyCallbacks(this));},k.prototype.off=function(d){d?this.callbacks=this.callbacks.filter(function(h){return h!==d}):this.callbacks.length=0,this.callbacks.length===0&&this._parentViewModel.removeFromPropertyCallbacks(this);},k.prototype.internalHandleCallback=function(d){},k.prototype.handleCallbacks=function(){var d=this;this._viewModelInstanceValue.hasChanged&&this.callbacks.forEach(function(h){d.internalHandleCallback(h);});},k.prototype.clearChanges=function(){this._viewModelInstanceValue.clearChanges();},k.prototype.clearCallbacks=function(){this.callbacks.length=0;},Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModelInstanceValue.name},enumerable:false,configurable:true}),k})(),Bt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(xt),dt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(xt),Et=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(xt),Wt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return d.prototype.trigger=function(){return this._viewModelInstanceValue.trigger()},d.prototype.internalHandleCallback=function(h){h();},d})(xt),Mt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),Object.defineProperty(d.prototype,"valueIndex",{get:function(){return this._viewModelInstanceValue.valueIndex},set:function(h){this._viewModelInstanceValue.valueIndex=h;},enumerable:false,configurable:true}),Object.defineProperty(d.prototype,"values",{get:function(){return this._viewModelInstanceValue.values},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h(this.value);},d})(xt),Ht=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"length",{get:function(){return this._viewModelInstanceValue.size},enumerable:false,configurable:true}),d.prototype.addInstance=function(h){h.runtimeInstance!=null&&(this._viewModelInstanceValue.addInstance(h.runtimeInstance),h.addParent(this._parentViewModel));},d.prototype.addInstanceAt=function(h,S){return h.runtimeInstance!=null&&this._viewModelInstanceValue.addInstanceAt(h.runtimeInstance,S)?(h.addParent(this._parentViewModel),true):false},d.prototype.removeInstance=function(h){h.runtimeInstance!=null&&(this._viewModelInstanceValue.removeInstance(h.runtimeInstance),h.removeParent(this._parentViewModel));},d.prototype.removeInstanceAt=function(h){this._viewModelInstanceValue.removeInstanceAt(h);},d.prototype.instanceAt=function(h){var S=this._viewModelInstanceValue.instanceAt(h);if(S!=null){var G=new Be(S,this._parentViewModel);return (0, f.createFinalization)(G,S),G}return null},d.prototype.swap=function(h,S){this._viewModelInstanceValue.swap(h,S);},d.prototype.internalHandleCallback=function(h){h();},d})(xt),tt=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(h){this._viewModelInstanceValue.value=h;},enumerable:false,configurable:true}),d.prototype.rgb=function(h,S,G){this._viewModelInstanceValue.rgb(h,S,G);},d.prototype.rgba=function(h,S,G,W){this._viewModelInstanceValue.argb(W,h,S,G);},d.prototype.argb=function(h,S,G,W){this._viewModelInstanceValue.argb(h,S,G,W);},d.prototype.alpha=function(h){this._viewModelInstanceValue.alpha(h);},d.prototype.opacity=function(h){this._viewModelInstanceValue.alpha(Math.round(Math.max(0,Math.min(1,h))*255));},d.prototype.internalHandleCallback=function(h){h(this.value);},d})(xt),De=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{set:function(h){var S;this._viewModelInstanceValue.value((S=h?.nativeImage)!==null&&S!==void 0?S:null);},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h();},d})(xt),mn=(function(k){p(d,k);function d(h,S){return k.call(this,h,S)||this}return Object.defineProperty(d.prototype,"value",{set:function(h){var S,G,W;h.isBindableArtboard?W=h:W=h.file.internalBindableArtboardFromArtboard(h.nativeArtboard),this._viewModelInstanceValue.value((S=W?.nativeArtboard)!==null&&S!==void 0?S:null),W?.nativeViewModel&&this._viewModelInstanceValue.viewModelInstance((G=W?.nativeViewModel)!==null&&G!==void 0?G:null);},enumerable:false,configurable:true}),d.prototype.internalHandleCallback=function(h){h();},d})(xt),gn=function(k){return b(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Request(k),[4,fetch(d)];case 1:return h=G.sent(),[4,h.arrayBuffer()];case 2:return S=G.sent(),[2,S]}})})},pt=function(k){return typeof k=="string"?[k]:k instanceof Array?k:[]},kt={EventManager:Y,TaskQueueManager:ie},Vt=function(k){return b(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Promise(function(W){return O.getInstance(function(J){J.decodeAudio(k,W);})}),[4,d];case 1:return h=G.sent(),S=new f.AudioWrapper(h),f.finalizationRegistry.register(S,h),[2,S]}})})},En=function(k){return b(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Promise(function(W){return O.getInstance(function(J){J.decodeImage(k,W);})}),[4,d];case 1:return h=G.sent(),S=new f.ImageWrapper(h),f.finalizationRegistry.register(S,h),[2,S]}})})},nn=function(k){return b(void 0,void 0,void 0,function(){var d,h,S;return y(this,function(G){switch(G.label){case 0:return d=new Promise(function(W){return O.getInstance(function(J){J.decodeFont(k,W);})}),[4,d];case 1:return h=G.sent(),S=new f.FontWrapper(h),f.finalizationRegistry.register(S,h),[2,S]}})})};})(),i})());})(ns)),ns.exports}var Qd=vk();async function Jd(e){const t=ck(e);if(t)return console.log(`[MGRiveLoader] Using cached RiveFile: ${e}`),t;console.log(`[MGRiveLoader] Loading RiveFile from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to load RiveFile: ${e} (${n.status})`);const r=await n.arrayBuffer(),o={};let i=null;if(await new Promise((l,u)=>{i=new Qd.RiveFile({buffer:r,assetLoader:f=>f.isImage&&lk.includes(f.name)?(o[f.name]=f,console.log(`[MGRiveLoader] Captured image asset: ${f.name}`),true):false,onLoad:()=>{console.log(`[MGRiveLoader] RiveFile loaded: ${e}`),l();},onLoadError:f=>{console.error("[MGRiveLoader] RiveFile load error:",f),u(f);}}),i.init().catch(f=>{console.error("[MGRiveLoader] Failed to initialize RiveFile:",f),u(f);});}),!i)throw new Error(`[MGRiveLoader] Failed to create RiveFile for ${e}`);i.getInstance();const a={riveFile:i,imageAssets:o,url:e,loadedAt:Date.now()};return dk(e,a),a}const Tm=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],yk=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),xk=function(e){return "/"+e},Vp={},Cn=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let u=function(f){return Promise.all(f.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");o=u(n.map(f=>{if(f=xk(f),f in Vp)return;Vp[f]=true;const p=f.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${m}`))return;const b=document.createElement("link");if(b.rel=p?"stylesheet":yk,p||(b.as="script"),b.crossOrigin="",b.href=f,l&&b.setAttribute("nonce",l),document.head.appendChild(b),p)return new Promise((y,g)=>{b.addEventListener("load",y),b.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${f}`)));})}));}function i(a){const l=new Event("vite:preloadError",{cancelable:true});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return o.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Pa={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3},Yc=["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"];async function Pm(){try{const{Store:e}=await Cn(async()=>{const{Store:o}=await Promise.resolve().then(()=>Hi);return {Store:o}},void 0),t=await e.select("myDataAtom");if(!t||typeof t!="object")throw new Error("myDataAtom not available");const n=t.cosmetic,r=t.name;return {avatar:n?.avatar||[...Yc],color:n?.color||"Red",name:r||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:[...Yc],color:"Red",name:"Player"}}}function Mm(e,t){const n=t?[...t]:[...Yc];return e.bottom&&(n[Pa.BOTTOM]=e.bottom),e.mid&&(n[Pa.MID]=e.mid),e.top&&(n[Pa.TOP]=e.top),e.expression&&(n[Pa.EXPRESSION]=e.expression),n}const Lm="Expression_Stressed.png";function wk(){try{return Array.from(fe.document.querySelectorAll("script")).find(r=>r.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function Ck(){return fe.location.pathname.split("/").pop()||"UNKNOWN"}async function kk(){try{const e=wk(),t=Ck(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,r=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function Jl(){return  false}const ir={ownedFilenames:new Set,loaded:false,error:null},Sk=[];function Zl(){Sk.forEach(e=>e());}async function Rm(){try{await Dd();const{Store:e}=await Cn(async()=>{const{Store:r}=await Promise.resolve().then(()=>Hi);return {Store:r}},void 0);if(!await e.select("isUserAuthenticatedAtom")){ir.loaded=!0,Zl();return}const n=await kk();ir.ownedFilenames=new Set(n.map(r=>r.cosmeticFilename)),ir.loaded=!0,ir.error=null,Zl();}catch(e){ir.error=e,ir.loaded=true,Zl();}}function Ak(e){return ir.ownedFilenames.has(e)}function Ek(){return ir.loaded}const qc=[];let Kp=false,Yp=false;function _k(){Yp||(Yp=true,Mk().then(()=>{}).catch(()=>{}));}_k();let qp=false;async function Ik(){qp||(await Rm(),qp=true);}function Yr(){try{const t=Array.from(fe.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${fe.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}function Tk(e,t){if(!t)return e;let n=e;if(t.type){const r=Array.isArray(t.type)?t.type:[t.type];n=n.filter(o=>r.includes(o.type));}if(t.availability){const r=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(o=>r.includes(o.availability));}if(t.search){const r=t.search.toLowerCase();n=n.filter(o=>o.displayName.toLowerCase().includes(r));}return n}function Pk(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:Ak(n.filename))}async function Mk(){if(!Kp)try{const e=Yr(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const i=((await n.json())?.bundles||[]).find(l=>l.name==="cosmetic"||l.name==="cosmetics");if(!i)return;const a=new Set(Tm.map(l=>l.filename));for(const l of i.assets||[])for(const u of l.src||[]){if(typeof u!="string")continue;const f=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(u);if(!f)continue;const p=f[1],m=f[2],b=`${m}.png`;if(a.has(b))continue;const y=m.split("_");if(y.length<2)continue;const g=y[0],A=y.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");qc.push({id:b,filename:b,type:g,displayName:A,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${p}/`)}${b}`}),a.add(b);}Kp=!0,console.log(`[Avatar] Discovered ${qc.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function qi(e){const t=Yr(),n=qc.map(f=>({...f,url:f.url||`${t}${f.filename}`})),r=Tm.map(f=>({...f,url:`${t}${f.filename}`})),o=new Set,i=[];for(const f of n)o.has(f.filename)||(i.push(f),o.add(f.filename));for(const f of r)o.has(f.filename)||(i.push(f),o.add(f.filename));const l=[...[],...i];let u=Tk(l,e);return u=Pk(u,e),u}async function Fm(e){return await Ik(),qi(e)}function Lk(e){return qi(e).map(t=>t.url)}async function tl(){const{avatar:e,color:t}=await Pm();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function Rk(){const e=await Pm(),t=await tl(),n=qi(),r={};return n.forEach(o=>{r[o.type]=(r[o.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:r,allItems:n,assetBaseUrl:Yr()}}const Fk="_Blank.png";let Ma=null;function Ok(){if(Ma)return Promise.resolve(Ma);const e=document.createElement("canvas");return e.width=1,e.height=1,new Promise((t,n)=>{e.toBlob(r=>{if(!r){n(new Error("[MGRiveLoader] Failed to create transparent PNG"));return}r.arrayBuffer().then(o=>{Ma=new Uint8Array(o),t(Ma);},n);},"image/png");})}async function ec(e,t,n){let r;if(t.includes(Fk))r=await Ok();else {const i=await fetch(`${n}${t}`).then(a=>a.arrayBuffer());r=new Uint8Array(i);}const o=await Qd.decodeImage(r);e.setRenderImage(o),o.unref();}async function Om(e,t){const{imageAssets:n}=e,r=Yr(),o=[];t.top&&n.Top&&o.push(ec(n.Top,t.top,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Top:",i))),t.mid&&n.Mid&&o.push(ec(n.Mid,t.mid,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Mid:",i))),t.bottom&&n.Bottom&&o.push(ec(n.Bottom,t.bottom,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Bottom:",i))),await Promise.all(o);}async function Dk(e){const{canvas:t,outfit:n,riveUrl:r,stateMachine:o="State Machine 1",autoplay:i=true}=e;let a=r;if(!a){const p=await Em();if(!p)throw new Error("[MGRiveLoader] Could not find avatar .riv file");a=p.url;}console.log(`[MGRiveLoader] Creating Rive instance from: ${a}`);const l=await Jd(a),u=new Qd.Rive({riveFile:l.riveFile,canvas:t,autoplay:i,stateMachines:o});if(console.log("[MGRiveLoader] Rive instance created"),await Om(l,n),n.expression&&n.expression!=="Expression_Blank.png"){const m=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(n.expression);if(m!==-1&&u.stateMachineInputs("State Machine 1")){const b=u.stateMachineInputs("State Machine 1").find(y=>y.name==="expression");b&&(b.value=m,console.log(`[MGRiveLoader] Set expression: ${n.expression} (index ${m})`),u.drawFrame());}}return console.log("[MGRiveLoader] Outfit applied"),{rive:u,cacheEntry:l,outfit:{...n},play(){u.play();},pause(){u.pause();},triggerAnimation(p){const m=u.stateMachineInputs(o);if(!m)return  false;const b=m.find(y=>y.name===p);return b?(typeof b.fire=="function"?b.fire():b.value=true,true):false},randomAnimation(){const p=u.stateMachineInputs(o);if(!p||p.length===0)return  false;const m=p.filter(y=>typeof y.fire=="function");return m.length===0?false:(m[Math.floor(Math.random()*m.length)].fire(),true)},destroy(){u.cleanup();}}}async function Nk(e,t){if(console.log("[MGRiveLoader] Updating outfit"),await Om(e.cacheEntry,t),t.expression&&t.expression!=="Expression_Blank.png"){const r=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(t.expression);if(r!==-1&&e.rive.stateMachineInputs("State Machine 1")){const o=e.rive.stateMachineInputs("State Machine 1").find(i=>i.name==="expression");o&&(o.value=r,console.log(`[MGRiveLoader] Set expression: ${t.expression} (index ${r})`),e.rive.drawFrame());}}e.outfit={...t},console.log("[MGRiveLoader] Outfit updated");}let Xp=false;async function $k(){if(!Xp){Xp=true;try{await mk(),jp(!0),console.log("[MGRiveLoader] Initialized");}catch(e){throw console.error("[MGRiveLoader] Initialization failed:",e),jp(false),e}}}function Bk(){return pk()}function zk(){return el()}async function jk(e){return await Jd(e)}async function Gk(){const e=await Em();return e?await Jd(e.url):null}async function Uk(e){return await Dk(e)}async function Wk(e,t){return await Nk(e,t)}const Eo={init:$k,isReady:Bk,list:zk,getRiveFile:jk,getAvatarRiveFile:Gk,createInstance:Uk,updateOutfit:Wk};function Hk(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const Le=Hk();function Dm(){return Le.ready}const Qp=fe??window;async function Nm(){const e=Le.ctx;if(e)return e;const t=Qp.AudioContext||Qp.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return Le.ctx=n,n}async function $m(){if(Le.ctx&&Le.ctx.state==="suspended")try{await Le.ctx.resume();}catch{}}const Vk={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Kk={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},yi=.001,xi=.2;function Jp(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Fi(e){const t=Vk[e],n=Kk[e];if(!t)return {atom:xi,vol100:La(xi)};const r=Jp(t,NaN);if(Number.isFinite(r)){const i=Dn(r,0,1);return {atom:i,vol100:La(i)}}if(n){const i=Jp(n,NaN);if(Number.isFinite(i)){const a=Dn(i,0,1);return {atom:a,vol100:La(a)}}}const o=xi;return {atom:o,vol100:La(o)}}function Yk(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(Dn(t,1,100)-1)/99;return yi+r*(xi-yi)}function La(e){const t=Dn(Number(e),0,1);if(t<=yi)return 0;const n=(t-yi)/(xi-yi);return Math.round(1+n*99)}function Bm(e,t){if(t==null)return Fi(e).atom;const n=Yk(t);return n===null?Fi(e).atom:M0(n)}function qk(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);Le.sfx.groups=t;}function Xk(e){const t=Le.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=Le.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Qk(){if(Le.sfx.buffer)return Le.sfx.buffer;if(!Le.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Nm();await $m();const n=await(await j0(Le.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return Le.sfx.buffer=r,r}async function Jk(e,t={}){if(!Le.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=Xk(n),o=Le.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await Nm();await $m();const a=await Qk(),l=Math.max(0,+o.start||0),u=Math.max(l,+o.end||l),f=Math.max(.01,u-l),p=Bm("sfx",t.volume),m=i.createGain();m.gain.value=p,m.connect(i.destination);const b=i.createBufferSource();return b.buffer=a,b.connect(m),b.start(0,l,f),{name:r,source:b,start:l,end:u,duration:f,volume:p}}const _o={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},Zk={sounds:[],itemCustomSounds:[],version:1},Rn={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class Zd extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class eS extends Zd{constructor(){super(`Maximum number of sounds reached (${_o.MAX_SOUNDS})`),this.name="SoundLimitError";}}class tS extends Zd{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${_o.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class nS extends Zd{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function rS(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||eu(t),t}function nl(){const e=rt($t.MODULE.AUDIO_CUSTOM_SOUNDS,Zk);return rS(e)}function eu(e){st($t.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function Zp(){return nl().sounds}function rl(e){const t=nl();t.sounds=e,eu(t);}function ol(){return nl().itemCustomSounds}function zm(e){const t=nl();t.itemCustomSounds=e,eu(t);}function oS(e){const t={shop:{soundId:e.shop?.soundId??Rn.shop.soundId,volume:e.shop?.volume??Rn.shop.volume,mode:e.shop?.mode??Rn.shop.mode},pet:{soundId:e.pet?.soundId??Rn.pet.soundId,volume:e.pet?.volume??Rn.pet.volume,mode:e.pet?.mode??Rn.pet.mode},weather:{soundId:e.weather?.soundId??Rn.weather.soundId,volume:e.weather?.volume??Rn.weather.volume,mode:e.weather?.mode??Rn.weather.mode}};return t!==e&&nu(t),t}function tu(){const e=rt($t.MODULE.AUDIO_NOTIFICATION_SETTINGS,Rn);return oS(e)}function nu(e){st($t.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const iS="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",jm=[{id:"default-notification",name:"Default",source:iS,type:"upload",createdAt:0}];function aS(e){const t=new Set(e.map(r=>r.id)),n=jm.filter(r=>!t.has(r.id));return n.length===0?e:[...e,...n]}function Gm(e){return jm.some(t=>t.id===e)}function sS(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const o=e.slice(n+1).length*3/4;return Math.round(o)}function Um(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=sS(e);if(t>0&&t>_o.MAX_SIZE_BYTES)throw new tS(t)}function Wm(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function lS(e){if(e>=_o.MAX_SOUNDS)throw new eS}let fn=[],Xc=false;function jn(){Xc||Hm();}function cS(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function Hm(){if(Xc)return;let e=Zp();e=aS(e),e.length!==Zp().length&&rl(e),fn=e,Xc=true,console.log(`[CustomSounds] Initialized with ${fn.length} sounds`);}function dS(){return jn(),[...fn]}function Vm(e){return jn(),fn.find(t=>t.id===e)}function uS(e,t,n){jn(),Wm(e),Um(t),lS(fn.length);const r={id:cS(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return fn.push(r),rl(fn),console.log(`[CustomSounds] Added sound: ${r.name} (${r.id})`),r}function pS(e){if(jn(),Gm(e))throw new Error("Cannot remove default sounds");const t=fn.findIndex(r=>r.id===e);if(t===-1)return  false;const n=fn.splice(t,1)[0];return rl(fn),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function fS(e,t){if(jn(),Gm(e))throw new Error("Cannot update default sounds");const n=fn.find(r=>r.id===e);return n?(t.name!==void 0&&(Wm(t.name),n.name=t.name.trim()),t.source!==void 0&&(Um(t.source),n.source=t.source.trim()),rl(fn),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function hS(e,t={}){jn();const n=Vm(e);if(!n)throw new nS(e);const{MGAudio:r}=await Cn(async()=>{const{MGAudio:o}=await Promise.resolve().then(()=>Xm);return {MGAudio:o}},void 0);try{await r.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(o){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,o),o}}function mS(){Cn(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>Xm);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function gS(){return tu()}function bS(e){return tu()[e]}function vS(e,t){const n=tu();n[e]=t,nu(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function yS(e){nu(e),console.log("[CustomSounds] Updated all notification settings");}function Io(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function Km(e,t,n){jn();const r=ol(),o=Io(e,t,n);return r.find(i=>Io(i.entityType,i.entityId,i.shopType)===o)??null}function xS(e,t,n,r){jn();const o=ol(),i=Io(e,t,r),a=o.findIndex(u=>Io(u.entityType,u.entityId,u.shopType)===i),l={entityType:e,entityId:t,shopType:r,soundId:n.soundId,volume:n.volume,mode:n.mode};a!==-1?o[a]=l:o.push(l),zm(o),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(ht.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:r,config:n}}));}function wS(e,t,n){jn();const r=ol(),o=Io(e,t,n),i=r.findIndex(a=>Io(a.entityType,a.entityId,a.shopType)===o);return i===-1?false:(r.splice(i,1),zm(r),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(ht.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function CS(e,t,n){return Km(e,t,n)!==null}function kS(e){return jn(),ol().filter(n=>n.entityType===e)}const Fe={init:Hm,getAll:dS,getById:Vm,add:uS,remove:pS,update:fS,play:hS,stop:mS,getNotificationSettings:gS,getNotificationConfig:bS,setNotificationConfig:vS,setNotificationSettings:yS,getItemCustomSound:Km,setItemCustomSound:xS,removeItemCustomSound:wS,hasItemCustomSound:CS,getItemCustomSoundsByType:kS};let Ra=null;async function SS(){return Le.ready?true:Ra||(Ra=(async()=>{Le.baseUrl=await Fo.base();const e=await So.load({baseUrl:Le.baseUrl}),t=So.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];Le.urls[i].set(a,Dr(Le.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(Le.sfx.mp3Url=Dr(Le.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(Le.sfx.atlasUrl=Dr(Le.baseUrl,r));}if(!Le.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return Le.sfx.atlas=await Lh(Le.sfx.atlasUrl),qk(Le.sfx.atlas),Fe.init(),Le.ready=true,true})(),Ra)}function Ym(e){if(e!=="music"&&e!=="ambience")return  false;const t=Le.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return Le.tracks[e]=null,true}function AS(e,t,n={}){if(!Le.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=Le.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Ym(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=Bm(e,n.volume),o.preload="auto",o.play().catch(()=>{}),Le.tracks[e]=o,o}function ES(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(Le.urls[n].keys()).sort():n==="sfx"?Le.sfx.atlas?t.groups?Array.from(Le.sfx.groups.keys()).sort():Object.keys(Le.sfx.atlas).sort():[]:[]}function _S(){return ["sfx","music","ambience"]}function IS(){return Array.from(Le.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function TS(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=Le.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function PS(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(Le.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function MS(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=Le.urls[n],i=r.toLowerCase();for(const[a,l]of Array.from(o.entries()))if(a.toLowerCase()===i)return l;return null}function LS(){return Le.tracks.music&&(Le.tracks.music.volume=Fi("music").atom),Le.tracks.ambience&&(Le.tracks.ambience.volume=Fi("ambience").atom),true}let en=null;async function RS(e,t={}){qm();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const r={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,en?.audio===n&&(en=null));},setVolume:o=>{n.volume=Math.max(0,Math.min(1,o));},isPlaying:()=>!n.paused&&!n.ended};en=r;try{await new Promise((o,i)=>{const a=setTimeout(()=>{i(new Error("Audio load timeout"));},5e3),l=()=>{clearTimeout(a),n.removeEventListener("canplay",u),n.removeEventListener("error",f);},u=()=>{l(),o();},f=()=>{l(),i(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(a),o()):(n.addEventListener("canplay",u,{once:!0}),n.addEventListener("error",f,{once:!0}));}),await n.play();}catch(o){throw en=null,o}return n.addEventListener("ended",()=>{en?.audio===n&&(en=null);}),r}function qm(){return en?(en.stop(),en=null,true):false}function FS(e){return en?(en.setVolume(e),true):false}function OS(){return en?.isPlaying()??false}function DS(){return en}function Kt(){if(!Dm())throw new Error("MGAudio not ready yet")}async function NS(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Jk(o,n);if(r==="music"||r==="ambience")return AS(r,o,n);throw new Error(`Unknown category: ${r}`)}const Ct={init:SS,isReady:Dm,play:NS,stop:e=>(Kt(),Ym(e)),list:(e,t)=>(Kt(),ES(e,t)),refreshVolumes:()=>(Kt(),LS()),categoryVolume:e=>(Kt(),Fi(e)),getCategories:()=>(Kt(),_S()),getGroups:()=>(Kt(),IS()),hasTrack:(e,t)=>(Kt(),TS(e,t)),hasGroup:e=>(Kt(),PS(e)),getTrackUrl:(e,t)=>(Kt(),MS(e,t)),playCustom:async(e,t)=>(Kt(),RS(e,t)),stopCustom:()=>(Kt(),qm()),setCustomVolume:e=>(Kt(),FS(e)),isCustomPlaying:()=>(Kt(),OS()),getCustomHandle:()=>(Kt(),DS()),CustomSounds:Fe},Xm=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:Ct},Symbol.toStringTag,{value:"Module"}));function $S(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const it=$S();function Qm(){return it.ready}let Fa=null;async function BS(){return it.ready?true:Fa||(Fa=(async()=>{it.baseUrl=await Fo.base();const e=await So.load({baseUrl:it.baseUrl}),t=So.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");it.byCat.clear(),it.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const l=i.slice(0,a),u=i.slice(a+1),f=Dr(it.baseUrl,r);it.byBase.set(i,f),it.byCat.has(l)||it.byCat.set(l,new Map),it.byCat.get(l).set(u,f);}return it.ready=true,true})(),Fa)}function Qc(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function zS(e,t){if(t===void 0){const i=Qc(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=Qc(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function jS(){return Array.from(it.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function GS(e){const t=it.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Jc(e,t){const{cat:n,asset:r,base:o}=zS(e,t),i=it.byBase.get(o);if(i)return i;const l=it.byCat.get(n)?.get(r);if(l)return l;if(!it.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Dr(it.baseUrl,`cosmetic/${o}.png`)}const ef=fe?.document??document;function US(){if(it.overlay)return it.overlay;const e=ef.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),ef.documentElement.appendChild(e),it.overlay=e,e}function WS(){const e=it.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function HS(e){return it.defaultParent=e,true}const VS=fe?.document??document;function Zc(e,t,n){if(!it.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?Jc(e,o):Jc(e),a=VS.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):Qc(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[l,u]of Object.entries(r.style))try{a.style[l]=String(u);}catch{}return a}function KS(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||WS()||US(),a=o!==void 0?Zc(e,o,r):Zc(e,r);if(i===it.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const u=r.scale??1,f=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${f}rad)`;else {const p=r.x??innerWidth/2,m=r.y??innerHeight/2;a.style.left=`${p}px`,a.style.top=`${m}px`,a.style.transform=`scale(${u}) rotate(${f}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${f}rad)`);}}return i.appendChild(a),it.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}it.live.delete(a);},a}function YS(){for(const e of Array.from(it.live))e.__mgDestroy?.();}const qS=100,tc=[];function ed(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const l=n.value;a=typeof l=="object"?`{${Object.keys(l||{}).slice(0,2).join(",")}}`:String(l);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const l=Object.keys(n).filter(u=>u!=="type");l.length>0&&(r=`PartialState - {${l.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));tc.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),tc.length>qS&&tc.shift();}const Yt={nativeCtor:null,captured:[],latestOpen:null},tf=Symbol.for("ariesmod.ws.capture.wrapped"),nf=Symbol.for("ariesmod.ws.capture.native"),Jm=1;function td(e){return !!e&&e.readyState===Jm}function XS(){if(td(Yt.latestOpen))return Yt.latestOpen;for(let e=Yt.captured.length-1;e>=0;e--){const t=Yt.captured[e];if(td(t))return t}return null}function QS(e,t){Yt.captured.push(e),Yt.captured.length>25&&Yt.captured.splice(0,Yt.captured.length-25);const n=()=>{Yt.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Yt.latestOpen===e&&(Yt.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);ed("in",o.type||"unknown",o);}catch{ed("in","raw",r.data);}}),e.readyState===Jm&&n();}function JS(e=fe,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[tf])return Yt.nativeCtor=r[nf]??Yt.nativeCtor??null,()=>{};const o=r;Yt.nativeCtor=o;function i(a,l){const u=l!==void 0?new o(a,l):new o(a);try{QS(u,n);}catch{}return u}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[tf]=true,i[nf]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function ZS(e=fe){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function _s(e=fe){const t=XS();if(t)return {ws:t,source:"captured"};const n=ZS(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Zm(e,t={}){const n=t.pageWindow??fe,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const l=()=>{const f=_s(n);(f.ws!==i||f.source!==a)&&(i=f.ws,a=f.source,o&&console.log("[WS] best socket changed:",f.source,f.ws),e(f));};l();const u=setInterval(l,r);return ()=>clearInterval(u)}function e1(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function t1(e,t=fe){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=_s(t);if(!r)return {ok:false,reason:"no-ws"};if(!td(r))return {ok:false,reason:"not-open"};const o=e1(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);ed("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function n1(e,t={},n=fe){return t1({type:e,...t},n)}const nr={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},he={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",ToggleLockItem:"ToggleLockItem",SetSelectedItem:"SetSelectedItem",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",GrowEgg:"GrowEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",CropCleanser:"CropCleanser",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",SwapPetFromStorage:"SwapPetFromStorage",PickupPet:"PickupPet",MovePetSlot:"MovePetSlot",NamePet:"NamePet",SellPet:"SellPet",ThrowSnowball:"ThrowSnowball",CheckFriendBonus:"CheckFriendBonus",ReportSpeakingStart:"ReportSpeakingStart"};var Sn=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Sn||{});new Set(Object.values(nr));new Set(Object.values(he));const r1=["Room","Quinoa"],o1={Room:["Room"],Quinoa:r1};function Pe(e,t={},n=fe){const r=t,{scopePath:o,scope:i,...a}=r,l=typeof o=="string"?o:i,u=Array.isArray(o)?o:l==="Room"||l==="Quinoa"?o1[l]:null;return n1(e,u?{scopePath:u,...a}:a,n)}function i1(e,t=fe){return Pe(he.Chat,{scope:"Room",message:e},t)}function a1(e,t=fe){return Pe(he.Emote,{scope:"Room",emoteType:e},t)}function s1(e,t=fe){return Pe(he.Wish,{scope:"Quinoa",wish:e},t)}function l1(e,t=fe){return Pe(he.KickPlayer,{scope:"Room",playerId:e},t)}function il(e,t=fe){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:r}=e;return Pe(he.SetPlayerData,{scope:"Room",name:n,cosmetic:r},t)}function c1(e=fe){return Pe(he.UsurpHost,{scope:"Quinoa"},e)}function d1(e=fe){return Pe(he.ReportSpeakingStart,{scope:"Quinoa"},e)}function u1(e,t=fe){return Pe(he.SetSelectedGame,{scope:"Room",gameId:e},t)}function p1(e,t=fe){return Pe(he.VoteForGame,{scope:"Room",gameId:e},t)}function f1(e=fe){return Pe(he.RestartGame,{scope:"Room"},e)}function h1(e,t=fe){return Pe(he.Ping,{scope:"Quinoa",id:e},t)}function eg(e,t,n=fe){return Pe(he.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const m1=eg;function g1(e,t,n=fe){return Pe(he.Teleport,{scope:"Quinoa",x:e,y:t},n)}function b1(e=fe){return Pe(he.CheckWeatherStatus,{scope:"Quinoa"},e)}function v1(e,t,n=fe){return Pe(he.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function y1(e,t=fe){return Pe(he.DropObject,{scope:"Quinoa",slotIndex:e},t)}function x1(e,t=fe){return Pe(he.PickupObject,{scope:"Quinoa",objectId:e},t)}function tg(e,t=fe){return Pe(he.ToggleLockItem,{scope:"Quinoa",itemId:e},t)}const ng=tg;function w1(e,t=fe){return Pe(he.SetSelectedItem,{scope:"Quinoa",itemIndex:e},t)}function ru(e,t="PetHutch",n,r,o=fe){return Pe(he.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toStorageIndex:n},...r!==void 0&&{quantity:r}},o)}function ou(e,t="PetHutch",n,r,o=fe){return Pe(he.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toInventoryIndex:n},...r!==void 0&&{quantity:r}},o)}function C1(e,t,n,r=fe){return Pe(he.MoveStorageItem,{scope:"Quinoa",itemId:e,storageId:t,toStorageIndex:n},r)}function k1(e=fe){return Pe(he.LogItems,{scope:"Quinoa"},e)}function S1(e,t,n=fe){return Pe(he.PlantSeed,{scope:"Quinoa",slot:e,species:t},n)}function A1(e,t=fe){return Pe(he.WaterPlant,{scope:"Quinoa",slot:e},t)}function E1(e,t,n=fe){return Pe(he.HarvestCrop,{scope:"Quinoa",slot:e,...t!==void 0&&{slotsIndex:t}},n)}function _1(e=fe){return Pe(he.SellAllCrops,{scope:"Quinoa"},e)}function iu(e,t=fe){return Pe(he.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function au(e,t=fe){return Pe(he.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function su(e,t=fe){return Pe(he.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function lu(e,t=fe){return Pe(he.PurchaseSeed,{scope:"Quinoa",species:e},t)}function rg(e,t,n=fe){return Pe(he.GrowEgg,{scope:"Quinoa",slot:e,eggId:t},n)}const I1=rg;function T1(e,t=fe){return Pe(he.HatchEgg,{scope:"Quinoa",slot:e},t)}function P1(e,t,n=fe){return Pe(he.PlantGardenPlant,{scope:"Quinoa",slot:e,itemId:t},n)}function M1(e,t=fe){return Pe(he.PotPlant,{scope:"Quinoa",slot:e},t)}function L1(e,t,n,r=fe){return Pe(he.MutationPotion,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t,mutation:n},r)}function R1(e,t,n=fe){return Pe(he.CropCleanser,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t},n)}function F1(e,t,n=fe){return Pe(he.PickupDecor,{scope:"Quinoa",tileType:e,localTileIndex:t},n)}function O1(e,t,n,r,o=fe){return Pe(he.PlaceDecor,{scope:"Quinoa",decorId:e,tileType:t,localTileIndex:n,...r!==void 0&&{rotation:r}},o)}function D1(e,t,n=fe){return Pe(he.RemoveGardenObject,{scope:"Quinoa",slot:e,slotType:t},n)}function og(e,t={x:0,y:0},n="Dirt",r=0,o=fe){return Pe(he.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function N1(e,t,n=fe){return Pe(he.FeedPet,{scope:"Quinoa",petItemId:e,cropItemId:t},n)}function $1(e,t=fe){return Pe(he.PetPositions,{scope:"Quinoa",petPositions:e},t)}function ig(e,t,n=fe){return Pe(he.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function B1(e,t,n,r=fe){return Pe(he.SwapPetFromStorage,{scope:"Quinoa",petSlotId:e,storagePetId:t,storageId:n},r)}function ag(e,t=fe){return Pe(he.PickupPet,{scope:"Quinoa",petId:e},t)}function z1(e,t,n=fe){return Pe(he.MovePetSlot,{scope:"Quinoa",movePetSlotId:e,toPetSlotIndex:t},n)}function j1(e,t,n=fe){return Pe(he.NamePet,{scope:"Quinoa",petItemId:e,name:t},n)}function G1(e,t=fe){return Pe(he.SellPet,{scope:"Quinoa",itemId:e},t)}function U1(e=fe){return Pe(he.ThrowSnowball,{scope:"Quinoa"},e)}function W1(e=fe){return Pe(he.CheckFriendBonus,{scope:"Quinoa"},e)}async function sg(e){try{const t=await tl(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],r=e.color!==void 0?e.color:t.color,o=il({cosmetic:{color:r,avatar:n}},fe);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:o}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function H1(){return sg({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const ui=new Map;function V1(e){if(ui.has(e))return ui.get(e);const t=new Promise((n,r)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>n(o),o.onerror=()=>{ui.delete(e),r(new Error(`Failed to load image: ${e}`));},o.src=e;});return ui.set(e,t),t}function K1(){ui.clear();}function Y1(e){return qi().find(r=>r.filename===e)?.url||""}async function q1(e,t={}){const n=document.createElement("canvas"),r=t.width||400,o=t.height||400,i=t.scale||1;n.width=r*i,n.height=o*i;const a=n.getContext("2d");if(!a)throw new Error("Failed to get canvas 2D context");if(a.imageSmoothingEnabled=i!==1,e.color){const p={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};a.fillStyle=p[e.color]||"#FF0000",a.fillRect(0,0,n.width,n.height);}const u=[e.bottom,e.mid,e.top,e.expression].filter(p=>!!p).map(p=>Y1(p));return (await Promise.all(u.map(p=>V1(p)))).forEach(p=>{a.drawImage(p,0,0,n.width,n.height);}),n}let cu=null,go=null,Mr=null,sr=null;function nc(e){return Yr()+e}async function X1(e){try{const{Store:t}=await Cn(async()=>{const{Store:a}=await Promise.resolve().then(()=>Hi);return {Store:a}},void 0),n=await t.select("myDataAtom"),r=n?.cosmetic?.avatar||[],o=Mm(e,r),i=e.color||n?.cosmetic?.color||"Red";return cu={avatar:o,color:i},J1(),Z1(o),console.log("[Avatar] Rendered avatar override:",o),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function Q1(){cu=null,go&&(clearInterval(go),go=null),Mr&&(Mr.disconnect(),Mr=null);const e=fe.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),sr&&(sr.remove(),sr=null),console.log("[Avatar] Cleared override"),true}function J1(){if(sr)return;const e=fe.document;sr=e.createElement("style"),sr.id="gemini-avatar-override-styles",sr.textContent=`
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
    `,e.head.appendChild(sr);}function Z1(e){go&&clearInterval(go),Mr&&Mr.disconnect();const t=fe.document,n=()=>{const o=t.querySelectorAll(".Avatar");let i=0;o.forEach(a=>{const l=Array.from(a.querySelectorAll("img"));if(l.length===4){let f=false;l.forEach((p,m)=>{const b=nc(e[m]);p.src!==b&&(f=true);}),f&&(l.forEach((p,m)=>{p.src=nc(e[m]),p.setAttribute("data-gemini-override",e[m]);}),i++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const f=t.createElement("div");f.className="gemini-avatar-overlay",e.forEach(p=>{const m=t.createElement("img");m.src=nc(p),m.setAttribute("data-gemini-cosmetic",p),f.appendChild(m);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(f),i++;}}),i>0&&console.log(`[Avatar] Re-applied ${i} override(s) (React reverted)`);};n(),go=setInterval(n,500),Mr=new MutationObserver(()=>{setTimeout(n,10);});const r=t.querySelector(".game-root")||t.querySelector("#root")||t.body;Mr.observe(r,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function eA(){return cu}function tA(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===Lm.toLowerCase()}function nA(e){return e.some(tA)}let Is=null,lo=null;fe.Gemini_AvatarOverride=null;async function lg(e){try{const{Store:t}=await Cn(async()=>{const{Store:A}=await Promise.resolve().then(()=>Hi);return {Store:A}},void 0),{getPlayers:n}=await Cn(async()=>{const{getPlayers:A}=await Promise.resolve().then(()=>Eg);return {getPlayers:A}},void 0);Jl();const i=n().get().myPlayer;if(!i)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=i.id,l=i.cosmetic.avatar;fe.MagicCircle_PlayerId=a,lo||(lo=[...l]);let u=Mm(e,l);const f=nA(u);Jl(),Is=u,fe.Gemini_AvatarOverride=u,console.log("[WorldAvatar] Applying override:",u);const p=await t.select("stateAtom");if(!p?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const m=p.data.players.findIndex(A=>A.id===a);if(m===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const b=p.data.players[m],y=[...p.data.players];y[m]={...b,cosmetic:{...b.cosmetic,avatar:u}};const g={...p,data:{...p.data,players:y}};return await t.set("stateAtom",g),Jl()&&f||il({name:i.name,cosmetic:{...i.cosmetic,avatar:u}},fe),!0}catch{return  false}}async function rA(){if(!Is||!lo)return  true;try{const{Store:e}=await Cn(async()=>{const{Store:m}=await Promise.resolve().then(()=>Hi);return {Store:m}},void 0),{getPlayers:t}=await Cn(async()=>{const{getPlayers:m}=await Promise.resolve().then(()=>Eg);return {getPlayers:m}},void 0);fe.Gemini_AvatarOverride=null;const o=t().get().myPlayer;if(!o)return !1;const i=o.id,a=await e.select("stateAtom");if(!a?.data?.players)return !1;const l=a.data.players.findIndex(m=>m.id===i);if(l===-1)return !1;const u=a.data.players[l],f=[...a.data.players];f[l]={...u,cosmetic:{...u.cosmetic,avatar:lo}};const p={...a,data:{...a.data,players:f}};return await e.set("stateAtom",p),il({name:o.name,cosmetic:{...o.cosmetic,avatar:lo}},fe),Is=null,lo=null,!0}catch{return  false}}function oA(){return Is}let Dt=[];const rs=[],rf=()=>{rs.forEach(e=>e([...Dt]));},$r={init(){Dt=rt($t.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...Dt]},async save(e,t,n){if(!n){const i=Dt.find(a=>a.top===t.top&&a.mid===t.mid&&a.bottom===t.bottom&&a.expression===t.expression);if(i)return i.id}const r=n||Math.random().toString(36).substring(2,9),o={...t,id:r,name:e,createdAt:n&&Dt.find(i=>i.id===n)?.createdAt||Date.now()};if(n){const i=Dt.findIndex(a=>a.id===n);i!==-1?Dt[i]=o:Dt.push(o);}else Dt.push(o);return st($t.SECTION.AVATAR_LOADOUTS,Dt),rf(),r},delete(e){Dt=Dt.filter(t=>t.id!==e),st($t.SECTION.AVATAR_LOADOUTS,Dt),rf();},rename(e,t){const n=Dt.find(r=>r.id===e);n&&(n.name=t,st($t.SECTION.AVATAR_LOADOUTS,Dt));},async wear(e){const t=Dt.find(r=>r.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await lg(n)},subscribe(e){return rs.push(e),()=>{const t=rs.indexOf(e);t!==-1&&rs.splice(t,1);}}},cg={init:Rm,isReady:()=>Ek(),list:qi,listAsync:Fm,listUrls:Lk,get:tl,debug:Rk,set:sg,blank:H1,Loadouts:$r,toCanvas:q1,clearImageCache:K1,render:X1,clearOverride:Q1,getOverride:eA,renderWorld:lg,clearWorldOverride:rA,getWorldOverride:oA};function Er(){if(!Qm())throw new Error("MGCosmetic not ready yet")}const du={init:BS,isReady:Qm,categories:()=>(Er(),jS()),list:e=>(Er(),GS(e)),url:((e,t)=>(Er(),Jc(e,t))),create:((e,t,n)=>(Er(),Zc(e,t,n))),show:((e,t,n)=>(Er(),KS(e,t,n))),attach:e=>(Er(),HS(e)),clear:()=>(Er(),YS()),Avatar:cg},of={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function dg(e){const t=Te.get("mutations");if(!t)return of[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?of[e]??null:n.coinMultiplier}const rc=new Map;function oc(e){if(rc.has(e))return rc.get(e);const t=dg(e)??1;return rc.set(e,t),t}const iA=new Set(["Gold","Rainbow"]),aA=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function ug(e){let t=1,n=0,r=0;for(const o of e)if(o==="Gold"||o==="Rainbow")o==="Rainbow"?t=oc("Rainbow"):t===1&&(t=oc("Gold"));else {const i=oc(o);i>1&&(n+=i,r++);}return t*(1+n-r)}function sA(e){return dg(e)}function lA(e){return iA.has(e)}function cA(e){return aA.has(e)}function dA(e){return cA(e)}function uu(e,t){const n=pu(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function Oi(e,t,n){const r=pu(e);if(!r)return 0;const o=r.baseSellPrice,i=ug(n);return Math.round(o*t*i)}function uA(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function pA(e,t){return t>=e}function pu(e){const t=Te.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const pg=3600,ic=80,fA=100,pi=30;function al(e){return e/pg}function sl(e,t){const n=Xi(e);if(!n)return ic;const r=n.maxScale;if(t<=1)return ic;if(t>=r)return fA;const o=(t-1)/(r-1);return Math.floor(ic+20*o)}function ll(e,t,n){const r=Xi(e);if(!r)return n-pi;const o=r.hoursToMature,i=t/pg,a=pi/o,l=Math.min(a*i,pi),u=n-pi;return Math.floor(u+l)}function cl(e,t){const n=Xi(e);return n?t>=n.hoursToMature:false}function fg(e){const t=Xi(e);return t?pi/t.hoursToMature:0}function hA(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Xi(e){const t=Te.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function mA(e,t){return t<=0?1:Math.min(1,e/t)}const Zn=3600,Oa=80,af=100,Nn=30,gA={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Qi(e){const t=Te.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function bA(e){return e/Zn}function hg(e,t){const n=Qi(e);if(!n)return Oa;const{maxScale:r}=n;if(t<=1)return Oa;if(t>=r)return af;const o=(t-1)/(r-1);return Math.floor(Oa+(af-Oa)*o)}function vA(e){return e-Nn}function yA(e){const t=Qi(e);return !t||t.hoursToMature<=0?0:Nn/t.hoursToMature}function mg(e,t,n){const r=Qi(e);if(!r)return n-Nn;const o=t/Zn,i=Nn/r.hoursToMature,a=Math.min(i*o,Nn),l=n-Nn;return Math.floor(l+a)}function gg(e,t,n){const r=Qi(e);if(!r)return 0;const o=n-Nn,i=t-o;if(i<=0)return 0;const a=Nn/r.hoursToMature;return a<=0?0:i/a*Zn}function fu(e,t,n,r,o=Zn){const a=gg(e,n,r)-t;return a<=0?0:o<=0?1/0:a/o}function bg(e,t,n,r=Zn){return fu(e,t,n,n,r)}function vg(e,t,n,r,o=Zn){if(n>=r)return 0;const i=n+1;return fu(e,t,i,r,o)}function xA(e,t){return e>=t}function wA(e,t){const n=t-Nn,o=(e-n)/Nn*100;return Math.min(100,Math.max(0,o))}const CA=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:bA,calculateCurrentStrength:mg,calculateHoursToMaxStrength:bg,calculateHoursToNextStrength:vg,calculateHoursToStrength:fu,calculateMaxStrength:hg,calculateStartingStrength:vA,calculateStrengthPerHour:yA,calculateStrengthProgress:wA,calculateXpForStrength:gg,getSpeciesData:Qi,isPetMature:xA},Symbol.toStringTag,{value:"Module"}));function hu(e){const t=Te.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=gA[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function kA(e,t){return e<=0?0:t<=0?1/0:e/t}function mu(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const i=e-o,a=r/n;return Math.ceil(i/a)}function yg(e,t,n){const r=Te.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=hu(e);return mu(n,t,a,i)}function Ts(e,t,n){const r=Te.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=hu(e);return mu(n,t,a,i)}function xg(e,t,n,r,o,i){return e?t&&i>0?Ts(n,r,i):0:Ts(n,r,o)}const SA=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:xg,calculateFeedsForDuration:mu,calculateFeedsToMaxStrength:Ts,calculateFeedsToNextStrength:yg,calculateHoursUntilStarving:kA,getHungerDrainPerHour:hu},Symbol.toStringTag,{value:"Module"})),wg={init(){},isReady(){return  true},crop:{calculateSize:uu,calculateSellPrice:Oi,calculateProgress:uA,isReady:pA,getData:pu},pet:{calculateAge:al,calculateMaxStrength:sl,calculateCurrentStrength:ll,isMature:cl,calculateStrengthPerHour:fg,getData:Xi},mutation:{calculateMultiplier:ug,getValue:sA,isGrowth:lA,isEnvironmental:dA},xp:CA,feed:SA};function kn(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!kn(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!kn(n[a],r[a]))return  false;return  true}const sf=3e3,wi=new Map;let lf=false;function Cg(){lf||(lf=true,setInterval(()=>{if(wi.size===0)return;const e=[];for(const[t,n]of wi)e.push({key:t,calls:n.calls,totalMs:n.totalMs.toFixed(2),avgMs:n.calls>0?(n.totalMs/n.calls).toFixed(2):"0"});e.sort((t,n)=>parseFloat(n.totalMs)-parseFloat(t.totalMs)),console.log(`%c[Gemini PerfLog] Last ${sf/1e3}s:`,"color: #ff6b6b; font-weight: bold"),console.table(e),wi.clear();},sf));}function kg(e){let t=wi.get(e);return t||(t={calls:0,totalMs:0},wi.set(e,t)),t}function dl(e){Cg();const t=performance.now();return ()=>{const n=performance.now()-t,r=kg(e);r.calls++,r.totalMs+=n;}}function AA(e){Cg();const t=kg(e);t.calls++;}const cf={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenPlayer",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"mySelectedSlotIdAtom"},df={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function EA(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function _A(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function IA(e){const t=e.currentGardenTile;return {name:e.gardenName?.name??null,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function TA(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function PA(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function uf(e){return {position:EA(e),tile:_A(e),garden:IA(e),object:TA(e),plant:PA(e)}}function pf(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function MA(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!kn(e.data,t.data)}function LA(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!kn(e.sortedSlotIndices,t.sortedSlotIndices)?true:!kn(e.slots,t.slots)}function RA(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function FA(){let e=df,t=df,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(cf),l=new Set;let u=false;function f(){if(u=false,l.size<a.length)return;const b=dl("currentTile.flush"),y=uf(i);if(kn(e,y)){b();return}if(t=e,e=y,!!n){for(const g of o.all)g(e,t);if(pf(t)!==pf(e))for(const g of o.stable)g(e,t);if(MA(t.object,e.object)){const g={current:e.object,previous:t.object};for(const A of o.object)A(g);}if(LA(t.plant,e.plant)){const g={current:e.plant,previous:t.plant};for(const A of o.plantInfo)A(g);}if(RA(t.garden,e.garden)){const g={current:e.garden,previous:t.garden};for(const A of o.garden)A(g);}b();}}function p(){u||(u=true,queueMicrotask(f));}async function m(){if(n)return;const b=a.map(async y=>{const g=cf[y],A=await Qe.subscribe(g,M=>{AA(`atom:${y}`),i[y]=M,l.add(y),p();});r.push(A);});await Promise.all(b),n=true,l.size===a.length&&(e=uf(i));}return m(),{get(){return e},subscribe(b,y){return o.all.add(b),y?.immediate!==false&&n&&l.size===a.length&&b(e,e),()=>o.all.delete(b)},subscribeStable(b,y){return o.stable.add(b),y?.immediate!==false&&n&&l.size===a.length&&b(e,e),()=>o.stable.delete(b)},subscribeObject(b,y){return o.object.add(b),y?.immediate&&n&&l.size===a.length&&b({current:e.object,previous:e.object}),()=>o.object.delete(b)},subscribePlantInfo(b,y){return o.plantInfo.add(b),y?.immediate&&n&&l.size===a.length&&b({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(b)},subscribeGarden(b,y){return o.garden.add(b),y?.immediate&&n&&l.size===a.length&&b({current:e.garden,previous:e.garden}),()=>o.garden.delete(b)},destroy(){for(const b of r)b();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let ac=null;function yt(){return ac||(ac=FA()),ac}function OA(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(m,b){return {x:b%m,y:Math.floor(b/m)}}function l(m,b,y){return y*m+b}function u(m,b){const{cols:y,rows:g}=m,A=y*g,M=new Set,I=new Set,L=new Map,D=[],z=m.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],O=m.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],T=Math.max(z.length,O.length);for(let C=0;C<T;C++){const E=z[C]??[],B=O[C]??[],j=E.map((U,ce)=>(M.add(U),L.set(U,C),{globalIndex:U,localIndex:ce,position:a(y,U)})),V=B.map((U,ce)=>(I.add(U),L.set(U,C),{globalIndex:U,localIndex:ce,position:a(y,U)}));D.push({userSlotIdx:C,dirtTiles:j,boardwalkTiles:V,allTiles:[...j,...V]});}const R=m.spawnTiles.map(C=>a(y,C)),P={};if(m.locations)for(const[C,E]of Object.entries(m.locations)){const B=E.spawnTileIdx??[];P[C]={name:C,spawnTiles:B,spawnPositions:B.map(j=>a(y,j))};}return {cols:y,rows:g,totalTiles:A,tileSize:b,spawnTiles:m.spawnTiles,spawnPositions:R,locations:P,userSlots:D,globalToXY(C){return a(y,C)},xyToGlobal(C,E){return l(y,C,E)},getTileOwner(C){return L.get(C)??null},isDirtTile(C){return M.has(C)},isBoardwalkTile(C){return I.has(C)}}}function f(){if(o.size<i||e)return;const m=r.map,b=r.tileSize??0;if(m){e=u(m,b);for(const y of n)y(e);n.clear();}}async function p(){const m=await Qe.subscribe("mapAtom",y=>{r.map=y,o.add("map"),f();});t.push(m);const b=await Qe.subscribe("tileSizeAtom",y=>{r.tileSize=y,o.add("tileSize"),f();});t.push(b);}return p(),{get(){return e},isReady(){return e!==null},onReady(m,b){return e?(b?.immediate!==false&&m(e),()=>{}):(n.add(m),()=>n.delete(m))},destroy(){for(const m of t)m();t.length=0,e=null,n.clear();}}}let sc=null;function nd(){return sc||(sc=OA()),sc}function DA(){const e=Te.get("mutations");return e?Object.keys(e):[]}function Sg(){const e={};for(const t of DA())e[t]=[];return e}function rd(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Sg()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function ff(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function NA(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function $A(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime,fruitCount:1}}function BA(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function hf(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function mf(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return rd();const i=t().get(),a=i?.userSlots[r],l=a?.dirtTiles??[],u=a?.boardwalkTiles??[],f=[],p=[],m=[],b={},y=[],g=[],A=[],M=[],I=Sg(),L=[],D=[],z=[],O={},T=[],R=[],P={},C=new Set,E=new Set;for(const[U,ce]of Object.entries(n.tileObjects)){const Y=parseInt(U,10);C.add(Y);const ie=i?i.globalToXY(Y):{x:0,y:0};if(ce.objectType==="plant"){const se=ce,ae=NA(U,se,ie,o);f.push(ae),ae.isMature?p.push(ae):m.push(ae),b[ae.species]||(b[ae.species]=[]),b[ae.species].push(ae);for(let ne=0;ne<se.slots.length;ne++){const q=se.slots[ne],Z=$A(U,ie,ne,q,o);if(y.push(Z),Z.isMature?g.push(Z):A.push(Z),Z.mutations.length>0){M.push(Z);for(const F of Z.mutations)I[F]||(I[F]=[]),I[F].push(Z);}}}else if(ce.objectType==="egg"){const ae=BA(U,ce,ie,o);L.push(ae),O[ae.eggId]||(O[ae.eggId]=[]),O[ae.eggId].push(ae),ae.isMature?D.push(ae):z.push(ae);}else if(ce.objectType==="decor"){const ae=hf(U,ce,ie,"tileObjects");T.push(ae),P[ae.decorId]||(P[ae.decorId]=[]),P[ae.decorId].push(ae);}}for(const[U,ce]of Object.entries(n.boardwalkTileObjects)){const Y=parseInt(U,10);E.add(Y);const ie=i?i.globalToXY(Y):{x:0,y:0},ae=hf(U,ce,ie,"boardwalk");R.push(ae),P[ae.decorId]||(P[ae.decorId]=[]),P[ae.decorId].push(ae);}const B=[...T,...R],j=l.filter(U=>!C.has(U.localIndex)),V=u.filter(U=>!E.has(U.localIndex));return {garden:n,mySlotIndex:r,plants:{all:f,mature:p,growing:m,bySpecies:b,count:f.length},crops:{all:y,mature:g,growing:A,mutated:{all:M,byMutation:I}},eggs:{all:L,mature:D,growing:z,byType:O,count:L.length},decors:{tileObjects:T,boardwalk:R,all:B,byType:P,count:B.length},tiles:{tileObjects:l,boardwalk:u,empty:{tileObjects:j,boardwalk:V}},counts:{plants:f.length,maturePlants:p.length,crops:y.length,matureCrops:g.length,eggs:L.length,matureEggs:D.length,decors:B.length,emptyTileObjects:j.length,emptyBoardwalk:V.length}}}function zA(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function jA(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function GA(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function UA(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function WA(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let l=0;l<a;l++){const u=new Set(i.slots[l].mutations),f=new Set(o.slots[l].mutations),p=[...f].filter(b=>!u.has(b)),m=[...u].filter(b=>!f.has(b));if(p.length>0||m.length>0){const b=Date.now(),y=o.slots[l],g={tileIndex:o.tileIndex,position:o.position,slotIndex:l,species:y.species,startTime:y.startTime,endTime:y.endTime,targetScale:y.targetScale,mutations:[...y.mutations],isMature:b>=y.endTime,fruitCount:1};n.push({crop:g,added:p,removed:m});}}}return n}function HA(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const l=o.get(a.tileIndex);if(!l)continue;const u=Math.min(a.slots.length,l.slots.length);for(let f=0;f<u;f++){const p=a.slots[f],m=l.slots[f];if(p.startTime!==m.startTime){const b=i.get(`${a.tileIndex}:${f}`);if(!b||!b.isMature)continue;const y={tileIndex:a.tileIndex,position:a.position,slotIndex:f,species:p.species,startTime:p.startTime,endTime:p.endTime,targetScale:p.targetScale,mutations:[...p.mutations],isMature:true,fruitCount:1};r.push({crop:y,remainingSlots:l.slotsCount});}}if(l.slotsCount<a.slotsCount)for(let f=l.slotsCount;f<a.slotsCount;f++){const p=i.get(`${a.tileIndex}:${f}`);if(!p||!p.isMature)continue;const m=a.slots[f];if(!m)continue;const b={tileIndex:a.tileIndex,position:a.position,slotIndex:f,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:true,fruitCount:1};r.push({crop:b,remainingSlots:l.slotsCount});}}return r}function VA(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function KA(e,t){const n=u=>`${u.tileIndex}:${u.location}`,r=u=>`${u.tileIndex}:${u.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(u=>!o.has(r(u))),l=e.filter(u=>!i.has(n(u)));return {added:a,removed:l}}function YA(){let e=rd(),t=rd(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,l=2;function u(){if(a.size<l)return;const p=mf(i,nd);if(kn(e,p)||(t=e,e=p,!n))return;for(const D of o.all)D(e,t);if(ff(t)!==ff(e))for(const D of o.stable)D(e,t);const m=zA(t.plants.all,e.plants.all);for(const D of m.added)for(const z of o.plantAdded)z({plant:D});for(const D of m.removed)for(const z of o.plantRemoved)z({plant:D,tileIndex:D.tileIndex});const b=jA(t.plants.mature,e.plants.mature,e.plants.all);for(const D of b)for(const z of o.plantMatured)z({plant:D});const y=WA(t.plants.all,e.plants.all);for(const D of y)for(const z of o.cropMutated)z(D);const g=GA(t.crops.mature,e.crops.mature,e.crops.all);for(const D of g)for(const z of o.cropMatured)z({crop:D});const A=HA(t.plants.all,e.plants.all,t.crops.all);for(const D of A)for(const z of o.cropHarvested)z(D);const M=VA(t.eggs.all,e.eggs.all);for(const D of M.added)for(const z of o.eggPlaced)z({egg:D});for(const D of M.removed)for(const z of o.eggRemoved)z({egg:D});const I=UA(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const D of I)for(const z of o.eggMatured)z({egg:D});const L=KA(t.decors.all,e.decors.all);for(const D of L.added)for(const z of o.decorPlaced)z({decor:D});for(const D of L.removed)for(const z of o.decorRemoved)z({decor:D});}async function f(){if(n)return;const p=await Px.onChangeNow(b=>{i.garden=b,a.add("garden"),u();});r.push(p);const m=await Qe.subscribe("myUserSlotIdxAtom",b=>{i.mySlotIndex=b,a.add("mySlotIndex"),u();});r.push(m),n=true,a.size===l&&(e=mf(i,nd));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribePlantAdded(p,m){if(o.plantAdded.add(p),m?.immediate&&n&&a.size===l)for(const b of e.plants.all)p({plant:b});return ()=>o.plantAdded.delete(p)},subscribePlantRemoved(p,m){return o.plantRemoved.add(p),()=>o.plantRemoved.delete(p)},subscribePlantMatured(p,m){if(o.plantMatured.add(p),m?.immediate&&n&&a.size===l)for(const b of e.plants.mature)p({plant:b});return ()=>o.plantMatured.delete(p)},subscribeCropMutated(p,m){if(o.cropMutated.add(p),m?.immediate&&n&&a.size===l)for(const b of e.crops.mutated.all)p({crop:b,added:b.mutations,removed:[]});return ()=>o.cropMutated.delete(p)},subscribeCropMatured(p,m){if(o.cropMatured.add(p),m?.immediate&&n&&a.size===l)for(const b of e.crops.mature)p({crop:b});return ()=>o.cropMatured.delete(p)},subscribeCropHarvested(p,m){return o.cropHarvested.add(p),()=>o.cropHarvested.delete(p)},subscribeEggPlaced(p,m){if(o.eggPlaced.add(p),m?.immediate&&n&&a.size===l)for(const b of e.eggs.all)p({egg:b});return ()=>o.eggPlaced.delete(p)},subscribeEggRemoved(p,m){return o.eggRemoved.add(p),()=>o.eggRemoved.delete(p)},subscribeEggMatured(p,m){if(o.eggMatured.add(p),m?.immediate&&n&&a.size===l)for(const b of e.eggs.mature)p({egg:b});return ()=>o.eggMatured.delete(p)},subscribeDecorPlaced(p,m){if(o.decorPlaced.add(p),m?.immediate&&n&&a.size===l)for(const b of e.decors.all)p({decor:b});return ()=>o.decorPlaced.delete(p)},subscribeDecorRemoved(p,m){return o.decorRemoved.add(p),()=>o.decorRemoved.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let lc=null;function qr(){return lc||(lc=YA()),lc}const gf={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPrimitivePetSlotsAtom",slotInfos:"myPetSlotInfosAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function bf(e,t){const n=al(e.xp),r=sl(e.petSpecies,e.targetScale),o=ll(e.petSpecies,e.xp,r),i=cl(e.petSpecies,n),u=Te.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,f=e.hunger/u*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:f,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function qA(e,t){const n=t[e.id],r=n?.lastAbilityTrigger??null,o=n?.position??null,i=al(e.xp),a=sl(e.petSpecies,e.targetScale),l=ll(e.petSpecies,e.xp,a),u=cl(e.petSpecies,i),m=Te.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,b=e.hunger/m*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:b,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:"active",position:o?{x:o.x,y:o.y}:null,lastAbilityTrigger:r,growthStage:i,currentStrength:l,maxStrength:a,isMature:u}}const vf=500;let Fn=[],os=0;function XA(){try{const e=rt($t.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(os=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function QA(e){try{st($t.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function JA(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function ZA(e){if(!e||!Array.isArray(e))return;const t=Uh(e),n=[];for(const r of t)if(r.timestamp>os){const o=JA(r);o&&n.push(o);}n.length!==0&&(os=Math.max(...n.map(r=>r.performedAt),os),Fn=[...n,...Fn],Fn.length>vf&&(Fn=Fn.slice(0,vf)),QA(Fn),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${Fn.length})`));}function yf(e){const t=new Set,n=[];for(const m of e.active??[]){const b=qA(m,e.slotInfos??{});n.push(b),t.add(b.id);}const r=[];for(const m of e.inventory??[]){if(t.has(m.id))continue;const b=bf(m,"inventory");r.push(b),t.add(b.id);}const o=[];for(const m of e.hutch??[]){if(t.has(m.id))continue;const b=bf(m,"hutch");o.push(b),t.add(b.id);}const i=[...n,...r,...o],u=qr().get().decors.all.some(m=>m.decorId==="PetHutch"),f=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},hutch:{hasHutch:u,currentItems:f,maxItems:25},abilityLogs:[...Fn]}}const xf={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},abilityLogs:[]};function eE(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function wf(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function tE(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(wf),r=t.all.map(wf);return eE(n,r)}function nE(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function rE(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function oE(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function iE(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function aE(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function sE(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function lE(){let e=xf,t=xf,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(gf),l=new Set;function u(){if(l.size<a.length)return;if(i.activityLogs){const I=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(I)&&ZA(I);}const p=yf(i);if(kn(e,p)||(t=e,e=p,!n))return;for(const I of o.all)I(e,t);if(!tE(t,e))for(const I of o.stable)I(e,t);const m=nE(t,e);for(const I of m)for(const L of o.location)L(I);const b=rE(t,e);for(const I of b)for(const L of o.ability)L(I);const y=oE(t,e);if(y)for(const I of o.count)I(y);const g=iE(t,e);for(const I of g)for(const L of o.growth)L(I);const A=aE(t,e);for(const I of A)for(const L of o.strengthGain)L(I);const M=sE(t,e);for(const I of M)for(const L of o.maxStrength)L(I);}async function f(){if(n)return;Fn=XA(),console.log(`[myPets] Loaded ${Fn.length} ability logs from storage`);const p=a.map(async m=>{const b=gf[m],y=await Qe.subscribe(b,g=>{i[m]=g,l.add(m),u();});r.push(y);});await Promise.all(p),n=true,l.size===a.length&&(e=yf(i));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.stable.delete(p)},subscribeLocation(p,m){if(o.location.add(p),m?.immediate&&n&&l.size===a.length)for(const b of e.all)p({pet:b,from:b.location,to:b.location});return ()=>o.location.delete(p)},subscribeAbility(p,m){if(o.ability.add(p),m?.immediate&&n&&l.size===a.length)for(const b of e.all)b.lastAbilityTrigger&&p({pet:b,trigger:b.lastAbilityTrigger});return ()=>o.ability.delete(p)},subscribeCount(p,m){return o.count.add(p),m?.immediate&&n&&l.size===a.length&&p({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(p)},subscribeGrowth(p,m){if(o.growth.add(p),m?.immediate&&n&&l.size===a.length)for(const b of e.all)p({pet:b,previousStage:b.growthStage,newStage:b.growthStage});return ()=>o.growth.delete(p)},subscribeStrengthGain(p,m){if(o.strengthGain.add(p),m?.immediate&&n&&l.size===a.length)for(const b of e.all)p({pet:b,previousStrength:b.currentStrength,newStrength:b.currentStrength});return ()=>o.strengthGain.delete(p)},subscribeMaxStrength(p,m){if(o.maxStrength.add(p),m?.immediate&&n&&l.size===a.length)for(const b of e.all)b.currentStrength===b.maxStrength&&p({pet:b});return ()=>o.maxStrength.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let cc=null;function Xr(){return cc||(cc=lE()),cc}const Cf={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},kf={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Sf(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Af(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function cE(e,t){return Af(e)===Af(t)}function dE(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Da(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function uE(e,t){const n=new Set(e.map(Da)),r=new Set(t.map(Da)),o=t.filter(a=>!n.has(Da(a))),i=e.filter(a=>!r.has(Da(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function pE(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function fE(){let e=kf,t=kf,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Cf),l=new Set;function u(){if(l.size<a.length)return;const p=Sf(i);if(kn(e,p)||(t=e,e=p,!n))return;for(const y of o.all)y(e,t);if(!cE(t,e))for(const y of o.stable)y(e,t);if(dE(t.selectedItem,e.selectedItem)){const y={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(y);}const m=uE(t.items,e.items);if(m)for(const y of o.items)y(m);const b=pE(t.favoritedItemIds,e.favoritedItemIds);if(b)for(const y of o.favorites)y(b);}async function f(){if(n)return;const p=a.map(async m=>{const b=Cf[m],y=await Qe.subscribe(b,g=>{i[m]=g,l.add(m),u();});r.push(y);});await Promise.all(p),n=true,l.size===a.length&&(e=Sf(i));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&l.size===a.length&&p(e,e),()=>o.stable.delete(p)},subscribeSelection(p,m){return o.selection.add(p),m?.immediate&&n&&l.size===a.length&&p({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(p)},subscribeItems(p,m){return o.items.add(p),m?.immediate&&n&&l.size===a.length&&p({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(p)},subscribeFavorites(p,m){return o.favorites.add(p),m?.immediate&&n&&l.size===a.length&&p({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let dc=null;function Qr(){return dc||(dc=fE()),dc}const od={all:[],host:null,myPlayer:null,count:0};function hE(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Ef(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return od;const i=new Map;Array.isArray(r)&&r.forEach((f,p)=>{f?.type==="user"&&f?.playerId&&i.set(f.playerId,{slot:f,index:p});});const a=t.map(f=>hE(f,n,i)),l=a.find(f=>f.isHost)??null,u=o!==null?a.find(f=>f.slotIndex===o)??null:null;return {all:a,host:l,myPlayer:u,count:a.length}}function _f(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function mE(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function gE(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function bE(){let e=od,t=od,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,l=4;function u(){if(a.size<l)return;const p=Ef(i);if(kn(e,p)||(t=e,e=p,!n))return;for(const A of o.all)A(e,t);if(_f(t)!==_f(e))for(const A of o.stable)A(e,t);const m=mE(t.all,e.all);for(const A of m)for(const M of o.joinLeave)M(A);const b=gE(t.all,e.all);for(const A of b)for(const M of o.connection)M(A);const y=t.host?.id??null,g=e.host?.id??null;if(y!==g){const A={current:e.host,previous:t.host};for(const M of o.host)M(A);}}async function f(){if(n)return;const p=await Ix.onChangeNow(g=>{i.players=g,a.add("players"),u();});r.push(p);const m=await Tx.onChangeNow(g=>{i.hostPlayerId=g,a.add("hostPlayerId"),u();});r.push(m);const b=await _x.onChangeNow(g=>{i.userSlots=g,a.add("userSlots"),u();});r.push(b);const y=await Qe.subscribe("myUserSlotIdxAtom",g=>{i.myUserSlotIndex=g,a.add("myUserSlotIndex"),u();});r.push(y),n=true,a.size===l&&(e=Ef(i));}return f(),{get(){return e},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribeJoinLeave(p,m){if(o.joinLeave.add(p),m?.immediate&&n&&a.size===l)for(const b of e.all)p({player:b,type:"join"});return ()=>o.joinLeave.delete(p)},subscribeConnection(p,m){if(o.connection.add(p),m?.immediate&&n&&a.size===l)for(const b of e.all)p({player:b,isConnected:b.isConnected});return ()=>o.connection.delete(p)},subscribeHost(p,m){return o.host.add(p),m?.immediate&&n&&a.size===l&&p({current:e.host,previous:e.host}),()=>o.host.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let uc=null;function Ag(){return uc||(uc=bE()),uc}const Eg=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:Ag},Symbol.toStringTag,{value:"Module"})),Ji=["seed","tool","egg","decor"];function vE(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function yE(e,t,n){const r=vE(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0,price:e.price}}function xE(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(f=>yE(f,e,o)),a=i.filter(f=>f.isAvailable).length,l=t.secondsUntilRestock??0,u=l>0?Date.now()+l*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:l,restockAt:u}}function If(e){const t=e.shops,n=e.purchases??{},r=Ji.map(l=>xE(l,t?.[l],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(l=>l.restockAt!==null);let a=null;if(i.length>0){const u=i.sort((f,p)=>(f.restockAt??0)-(p.restockAt??0))[0];a={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt};}return {all:r,byType:o,nextRestock:a}}const Tf={all:Ji.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Pf(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function wE(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function CE(e,t){const n=[];for(const r of Ji){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(l=>[l.id,l]));for(const l of i.items){const u=a.get(l.id);u&&l.purchased>u.purchased&&n.push({shopType:r,itemId:l.id,quantity:l.purchased-u.purchased,newPurchased:l.purchased,remaining:l.remaining});}}return n}function kE(e,t){const n=[];for(const r of Ji){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(l=>[l.id,l]));for(const l of i.items){const u=a.get(l.id);u&&u.isAvailable!==l.isAvailable&&n.push({shopType:r,itemId:l.id,wasAvailable:u.isAvailable,isAvailable:l.isAvailable});}}return n}function SE(){let e=Tf,t=Tf,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,l=2;function u(){if(a.size<l)return;const p=If(i);if(kn(e,p)||(t=e,e=p,!n))return;for(const g of o.all)g(e,t);if(Pf(t)!==Pf(e))for(const g of o.stable)g(e,t);const m={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of Ji){const A=wE(t.byType[g],e.byType[g]);if(A)for(const M of m[g])M(A);}const b=CE(t,e);for(const g of b)for(const A of o.purchase)A(g);const y=kE(t,e);for(const g of y)for(const A of o.availability)A(g);}async function f(){if(n)return;const p=await Mx.onChangeNow(b=>{i.shops=b,a.add("shops"),u();});r.push(p);const m=await Lx.onChangeNow(b=>{i.purchases=b,a.add("purchases"),u();});r.push(m),n=true,a.size===l&&(e=If(i));}return f(),{get(){return e},getShop(p){return e.byType[p]},getItem(p,m){return e.byType[p].items.find(y=>y.id===m)??null},subscribe(p,m){return o.all.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.all.delete(p)},subscribeStable(p,m){return o.stable.add(p),m?.immediate!==false&&n&&a.size===l&&p(e,e),()=>o.stable.delete(p)},subscribeSeedRestock(p,m){return o.seedRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(p)},subscribeToolRestock(p,m){return o.toolRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(p)},subscribeEggRestock(p,m){return o.eggRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(p)},subscribeDecorRestock(p,m){return o.decorRestock.add(p),m?.immediate&&n&&a.size===l&&p({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(p)},subscribePurchase(p,m){if(o.purchase.add(p),m?.immediate&&n&&a.size===l)for(const b of e.all)for(const y of b.items)y.purchased>0&&p({shopType:b.type,itemId:y.id,quantity:y.purchased,newPurchased:y.purchased,remaining:y.remaining});return ()=>o.purchase.delete(p)},subscribeAvailability(p,m){if(o.availability.add(p),m?.immediate&&n&&a.size===l)for(const b of e.all)for(const y of b.items)p({shopType:b.type,itemId:y.id,wasAvailable:y.isAvailable,isAvailable:y.isAvailable});return ()=>o.availability.delete(p)},destroy(){for(const p of r)p();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let pc=null;function No(){return pc||(pc=SE()),pc}function _g(e){const t=e||"Sunny",o=Te.get("weather")?.[t]?.name||t;return {id:t,name:o,isActive:t!=="Sunny",type:t,startTime:null,endTime:null,remainingSeconds:0}}function Mf(){return _g(null)}function AE(){let e=Mf(),t=Mf(),n=null,r=false,o=null;const i={all:new Set,stable:new Set};function a(u){const f=(u||"Sunny")!==(n||"Sunny");n=u;const p=_g(u),m=e.id!==p.id;if(t=e,e=p,!!r){if(f)for(const b of i.all)b(e,t);if(m){const b={current:e,previous:t};for(const y of i.stable)y(b);}}}async function l(){r||(o=await Qe.subscribe("weatherAtom",u=>{a(u);}),r=true);}return l(),{get(){return e},subscribe(u,f){return i.all.add(u),f?.immediate!==false&&r&&u(e,e),()=>i.all.delete(u)},subscribeStable(u,f){return i.stable.add(u),f?.immediate&&r&&u({current:e,previous:e}),()=>i.stable.delete(u)},destroy(){o?.(),o=null,i.all.clear(),i.stable.clear(),r=false;}}}let fc=null;function Zi(){return fc||(fc=AE()),fc}let Nt=null;function Ig(){return Nt||(Nt={currentTile:yt(),myPets:Xr(),gameMap:nd(),myInventory:Qr(),players:Ag(),shops:No(),weather:Zi(),myGarden:qr()},Nt)}function Xn(){if(!Nt)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Nt}function EE(){Nt&&(Nt.currentTile.destroy(),Nt.myPets.destroy(),Nt.gameMap.destroy(),Nt.myInventory.destroy(),Nt.players.destroy(),Nt.shops.destroy(),Nt.weather.destroy(),Nt.myGarden.destroy(),Nt=null);}const Gt={get currentTile(){return Xn().currentTile},get myPets(){return Xn().myPets},get gameMap(){return Xn().gameMap},get myInventory(){return Xn().myInventory},get players(){return Xn().players},get shops(){return Xn().shops},get weather(){return Xn().weather},get myGarden(){return Xn().myGarden}};function _E(e){const t=lu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function IE(e){const r=Gt.shops.getShop("seed").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=lu(e);u.ok?a++:i.push(u.reason||`Failed to purchase seed ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function TE(e){const t=au(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function PE(e){const r=Gt.shops.getShop("egg").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=au(e);u.ok?a++:i.push(u.reason||`Failed to purchase egg ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function ME(e){const t=iu(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function LE(e){const r=Gt.shops.getShop("decor").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=iu(e);u.ok?a++:i.push(u.reason||`Failed to purchase decor ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function RE(e){const t=su(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function FE(e){const r=Gt.shops.getShop("tool").items.find(l=>l.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let l=0;l<o;l++){const u=su(e);u.ok?a++:i.push(u.reason||`Failed to purchase tool ${l+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}let hc=false;const Lr={init(){hc||(hc=true,console.log("[MGShopActions] Initialized"));},isReady(){return hc},seed:{buy:_E,buyAll:IE},egg:{buy:TE,buyAll:PE},decor:{buy:ME,buyAll:LE},tool:{buy:RE,buyAll:FE}};async function Tg(e){const t=[{name:"Data",init:()=>Te.init()},{name:"CustomModal",init:()=>fo.init()},{name:"Sprites",init:()=>$e.init()},{name:"TileObjectSystem",init:()=>tr.init()},{name:"Pixi",init:()=>Zs.init()},{name:"RiveLoader",init:()=>Eo.init()},{name:"Audio",init:()=>Ct.init()},{name:"Cosmetics",init:()=>du.init()},{name:"ShopActions",init:()=>Lr.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Pg=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:Fo,MGAudio:Ct,MGCalculators:wg,MGCosmetic:du,MGCustomModal:fo,MGData:Te,MGEnvironment:Rt,MGManifest:So,MGPixi:Zs,MGPixiHooks:On,MGRiveLoader:Eo,MGShopActions:Lr,MGSprite:$e,MGTile:tr,MGVersion:Rd,PET_ABILITY_ACTIONS:jh,filterPetAbilityLogs:Uh,formatAbilityLog:Wh,initAllModules:Tg,isPetAbilityAction:Gh},Symbol.toStringTag,{value:"Module"}));function OE(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"||t==="mythic"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function DE(e){return e.toLowerCase()}function ul(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:l=true,size:u="md",onClick:f,variant:p="default",rarity:m=null,abilityId:b="",abilityName:y=""}=e,g=x("span",{className:"badge",id:t});l&&g.classList.add("badge--pill"),u==="sm"?g.classList.add("badge--sm"):u==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),f&&g.addEventListener("click",f);let A=false,M=a;function I(){A||(M===false?g.style.border="none":g.style.border="");}function L(C,E=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${C}`,`badge--${E}`),I();}function D(C){const E=(C??"").trim();E?(g.style.border=E,A=true):(A=false,I());}function z(C){M=C,I();}function O(C){g.textContent=C;}function T(C,E=o){L(C,E);}function R(C){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const E=OE(C);if(!E){g.textContent=String(C??"—");return}g.textContent=E,g.classList.add("badge--rarity",`badge--rarity-${DE(E)}`);}function P(C,E){const j=Te.get("abilities")?.[C],V=j?.color,U=V||"rgba(100, 100, 100, 0.9)",ce=V?`${V}`:"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=E||j?.name||C||"Unknown Ability",g.style.background=U,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const Y=()=>{g.style.background=ce;},ie=()=>{g.style.background=U;};g.removeEventListener("mouseenter",Y),g.removeEventListener("mouseleave",ie),g.addEventListener("mouseenter",Y),g.addEventListener("mouseleave",ie);}return p==="rarity"?R(m):p==="ability"?P(b,y):(g.textContent=n,L(r,o),typeof a=="boolean"&&z(a),i&&D(i)),{root:g,setLabel:O,setType:T,setBorder:D,setWithBorder:z,setRarity:R,setAbility:P}}const NE={expanded:false,sort:{key:null,dir:null},search:""},$E={categories:{}};async function BE(){const e=await Hr("tab-test",{version:2,defaults:$E,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...NE}}function n(i,a){const l=e.get(),u=t(i);e.update({categories:{...l.categories,[i]:{...u,expanded:a}}});}function r(i,a,l){const u=e.get(),f=t(i);e.update({categories:{...u.categories,[i]:{...f,sort:{key:a,dir:l}}}});}function o(i,a){const l=e.get(),u=t(i);e.update({categories:{...l.categories,[i]:{...u,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const zE={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Na(e){return e?zE[e]??0:0}class jE extends mr{constructor(){super({id:"tab-test",label:"Test"});ve(this,"stateCtrl",null);}async build(n){this.stateCtrl=await BE();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=x("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(async()=>{try{const i=await $e.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=x("span",{style:"opacity:0.5;"});return o.textContent="—",o}return ul({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),l=b=>{if(!b)return o;const y=b.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(y))},u=qs({columns:i,data:l(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:b=>b.spriteId,onSortChange:(b,y)=>{this.stateCtrl.setCategorySort(n,b,y);}});a.sort.key&&a.sort.dir&&u.sortBy(a.sort.key,a.sort.dir);const f=Wi({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:b=>{const y=b.trim();this.stateCtrl.setCategorySearch(n,y),u.setData(l(y));}}),p=x("div",{style:"margin-bottom:8px;"});p.appendChild(f.root);const m=x("div");return m.appendChild(p),m.appendChild(u.root),ct({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:b=>{this.stateCtrl.setCategoryExpanded(n,b);}},m)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=Te.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const l=(a?.seed?.name||"").toLowerCase();if(l===i||l===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=Te.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=Te.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=Te.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=Te.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>Na(i.rarity)-Na(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!$e.isReady())try{await $e.init();}catch{return}const o=$e.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],u=$e.getCategoryId(a).map(f=>{const p=`sprite/${a}/${f}`;return {name:f,spriteId:p,rarity:this.getRarityForSprite(a,p,f)}});if(u.sort((f,p)=>Na(f.rarity)-Na(p.rarity)),u.length>0){const f=this.createDataCard(a,this.formatCategoryName(a),u,r);n.appendChild(f);}}}}function tn(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Mg=`
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
`,GE={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Ir=null;async function UE(){if(Ir)return Ir;Ir=await Hr("tab-auto-favorite",{version:1,defaults:GE});const e=rt(ft.AUTO_FAVORITE_UI,null);return e&&(await Ir.set(e),Ey(ft.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Ir}function vn(){if(!Ir)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Ir}const gu=ft.AUTO_FAVORITE,Lg={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function Ur(){return rt(gu,Lg)}function bu(e){st(gu,e);}function Rg(e){const n={...Ur(),...e};return bu(n),n}function vu(e){const t=Ur();return t.mode="simple",t.simple={...t.simple,...e},bu(t),t}function WE(e){vu({favoriteSpecies:e});}function HE(e){vu({favoriteMutations:e});}function Lf(){return Ur().enabled}let is=null;const Ci=new Set;function id(){const e=Ur();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Ci.clear(),is=Qr().subscribeItems(t=>{if(t.added.length>0){const n=Ur();for(const r of t.added)KE(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Fg(){is&&(is(),is=null),Ci.clear(),console.log("🛑 [AutoFavorite] Stopped");}function VE(e){const t=Ur();t.enabled=e,t.simple.enabled=e,Rg(t),e?id():Fg();}function KE(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Ci.has(e.id)||e.isFavorited||e.favorited)&&Og(e,t.simple)){Ci.add(e.id);try{ng(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),Ci.delete(e.id);}}}function Og(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function YE(){return Object.keys(Te.get("mutations")??{})}const Dg={init(){this.isReady()||id();},isReady(){return Lf()},DEFAULT_CONFIG:Lg,STORAGE_KEY:gu,loadConfig:Ur,saveConfig:bu,updateConfig:Rg,updateSimpleConfig:vu,setFavoriteSpecies:WE,setFavoriteMutations:HE,isEnabled:Lf,start:id,stop:Fg,setEnabled:VE,shouldFavorite:Og,getGameMutations:YE};class qE{constructor(){ve(this,"achievements",new Map);ve(this,"data");ve(this,"STORAGE_KEY",ft.ACHIEVEMENTS);ve(this,"onUnlockCallbacks",[]);ve(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return rt(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){st(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const l=o>=n.target;return !r&&l?this.unlock(t,i):l||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:l,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let ki=null;function yn(){return ki||(ki=new qE),ki}function XE(){ki&&(ki=null);}let $a=false;const QE={init(){$a||(yn(),$a=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return $a},getManager(){return yn()},register:(...e)=>yn().register(...e),registerMany:(...e)=>yn().registerMany(...e),isUnlocked:(...e)=>yn().isUnlocked(...e),getAll:()=>yn().getAllAchievements(),getUnlocked:()=>yn().getUnlockedAchievements(),getStats:()=>yn().getCompletionStats(),checkAll:()=>yn().checkAllAchievements(),onUnlock:(...e)=>yn().onUnlock(...e),onProgress:(...e)=>yn().onProgress(...e),destroy(){XE(),$a=false;}},JE={enabled:true},Ng=ft.ANTI_AFK,ZE=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],e_=25e3,t_=1,n_=1e-5,Ge={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function r_(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),Ge.listeners.push({type:n,handler:r,target:t});};for(const t of ZE)e(document,t),e(window,t);}function o_(){for(const{type:e,handler:t,target:n}of Ge.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}Ge.listeners.length=0;}function i_(){const e=Object.getPrototypeOf(document);Ge.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),Ge.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),Ge.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function a_(){const e=Object.getPrototypeOf(document);try{Ge.savedProps.hidden&&Object.defineProperty(e,"hidden",Ge.savedProps.hidden);}catch{}try{Ge.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",Ge.savedProps.visibilityState);}catch{}try{Ge.savedProps.hasFocus&&(document.hasFocus=Ge.savedProps.hasFocus);}catch{}}function Ps(){Ge.audioCtx&&Ge.audioCtx.state!=="running"&&Ge.audioCtx.resume?.().catch(()=>{});}function s_(){try{const e=window.AudioContext||window.webkitAudioContext;Ge.audioCtx=new e({latencyHint:"interactive"}),Ge.gainNode=Ge.audioCtx.createGain(),Ge.gainNode.gain.value=n_,Ge.oscillator=Ge.audioCtx.createOscillator(),Ge.oscillator.frequency.value=t_,Ge.oscillator.connect(Ge.gainNode).connect(Ge.audioCtx.destination),Ge.oscillator.start(),document.addEventListener("visibilitychange",Ps,{capture:!0}),window.addEventListener("focus",Ps,{capture:!0});}catch{$g();}}function $g(){try{Ge.oscillator?.stop();}catch{}try{Ge.oscillator?.disconnect(),Ge.gainNode?.disconnect();}catch{}try{Ge.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Ps,{capture:true}),window.removeEventListener("focus",Ps,{capture:true}),Ge.oscillator=null,Ge.gainNode=null,Ge.audioCtx=null;}function l_(){const e=document.querySelector("canvas")||document.body||document.documentElement;Ge.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},e_);}function c_(){Ge.heartbeatInterval!==null&&(clearInterval(Ge.heartbeatInterval),Ge.heartbeatInterval=null);}function mc(){i_(),r_(),s_(),l_();}function gc(){c_(),$g(),o_(),a_();}let Ba=false,sn=false;function ro(){return rt(Ng,JE)}function bc(e){st(Ng,e);}const bo={init(){if(Ba)return;const e=ro();Ba=true,e.enabled?(mc(),sn=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Ba},isRunning(){return sn},isEnabled(){return ro().enabled},enable(){const e=ro();e.enabled=true,bc(e),sn||(mc(),sn=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=ro();e.enabled=false,bc(e),sn&&(gc(),sn=false,console.log("[MGAntiAfk] Disabled"));},toggle(){bo.isEnabled()?bo.disable():bo.enable();},getConfig(){return ro()},updateConfig(e){const n={...ro(),...e};bc(n),n.enabled&&!sn?(mc(),sn=true):!n.enabled&&sn&&(gc(),sn=false);},destroy(){sn&&(gc(),sn=false),Ba=false,console.log("[MGAntiAfk] Destroyed");}},Bg=ft.PET_TEAM,d_={enabled:false,teams:[],activeTeamId:null},yu=3,Rf=50,At="";function Ft(){return rt(Bg,d_)}function gr(e){st(Bg,e);}function u_(e){const n={...Ft(),...e};return gr(n),n}function p_(){return Ft().enabled}function f_(e){u_({enabled:e});}function h_(){return crypto.randomUUID()}function ad(){return Date.now()}function zg(e=[]){const t=[...e];for(;t.length<yu;)t.push(At);return [t[0]||At,t[1]||At,t[2]||At]}function jg(e,t){const n=Ft(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function Gg(e,t){const n=Ft();if(!e.some(i=>i!==At))return  true;const o=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===o)}function Ug(e){const n=Xr().get(),r=new Set(n.all.map(i=>i.id)),o=Ft();for(const i of o.teams)for(const a of i.petIds)a!==At&&r.add(a);for(const i of e)if(i!==At&&!r.has(i))return  false;return  true}function m_(e){const n=Xr().get(),r=new Map(n.all.map(i=>[i.id,i])),o=[];for(const i of e.petIds){if(i===At)continue;const a=r.get(i);a&&o.push(a);}return o}function g_(e){return e.petIds.every(t=>t!==At)}function b_(e){const t=[];for(let n=0;n<yu;n++)e.petIds[n]===At&&t.push(n);return t}function v_(e){return e.petIds.filter(t=>t!==At).length}function y_(e){return e.petIds.every(t=>t===At)}function x_(e,t){return e.petIds.includes(t)}function w_(e,t){return e.petIds.indexOf(t)}function C_(e,t=[]){const n=Ft();if(n.teams.length>=Rf)throw new Error(`Maximum number of teams (${Rf}) reached`);if(!jg(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=zg(t);if(!Ug(o))throw new Error("One or more pet IDs do not exist");if(!Gg(o))throw new Error("A team with this exact composition already exists");const i={id:h_(),name:r,petIds:o,createdAt:ad(),updatedAt:ad()};return n.teams.push(i),gr(n),i}function Wg(e,t){const n=Ft(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!jg(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=zg(t.petIds);if(!Ug(a))throw new Error("One or more pet IDs do not exist");if(!Gg(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:ad()};return n.teams[r]=i,gr(n),i}function k_(e){const t=Ft(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(gr(t),true)}function S_(e){return Ft().teams.find(n=>n.id===e)??null}function A_(){return [...Ft().teams]}function E_(e){const t=Ft(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function __(e){const t=Ft(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),gr(t),true}function I_(e,t){try{return Wg(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function T_(){const n=Xr().get().byLocation.active.map(o=>o.id).sort(),r=Ft();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,l)=>a===n[l]))return o.id}return null}function Hg(){const e=T_(),t=Ft();return e!==t.activeTeamId&&(t.activeTeamId=e,gr(t)),e}function Vg(e){const t=Ft();t.activeTeamId=e,gr(t);}function P_(e){return Hg()===e}function M_(e){const t=Xr(),n=Qr(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=r.byLocation.active,a=e.petIds.filter(p=>p!==At).sort(),l=i.map(p=>p.id).sort();if(JSON.stringify(a)===JSON.stringify(l)){console.log("[PetTeam] Team already active");return}const u=r.hutch,f=u.hasHutch?u.maxItems-u.currentItems:0;L_(e.petIds,f,r),Vg(e.id),console.log("[PetTeam] Team activated successfully");}function L_(e,t,n){const r=n.byLocation.active;let o=t,i=0;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<yu;a++){const l=e[a],u=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${u?.id.slice(0,8)??"empty"}, target=${l.slice(0,8)||"empty"}, hutchSpace=${o}`),u?.id===l){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(l===At&&u){const f=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${f}`),R_(u.id,f),f&&o--;continue}if(!u&&l!==At){const p=n.all.find(m=>m.id===l)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${p}`),p&&o++,O_(l,n,i),i++;continue}if(u&&l!==At){const p=n.all.find(b=>b.id===l)?.location==="hutch";p&&o++;const m=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${p}, storeInHutch=${m}`),D_(u.id,l,n,m),m&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function R_(e,t){ag(e),t&&ru(e);}function F_(e){const t=qr().get(),n=t.tiles.tileObjects[e]??t.tiles.tileObjects[0];return n?{position:n.position,tileType:"Dirt",localTileIndex:n.localIndex}:{position:{x:0,y:0},tileType:"Dirt",localTileIndex:0}}function O_(e,t,n){const r=t.all.find(l=>l.id===e);if(!r){console.warn(`[PetTeam] Pet ${e} not found`);return}r.location==="hutch"&&ou(e);const{position:o,tileType:i,localTileIndex:a}=F_(n);og(e,o,i,a);}function D_(e,t,n,r){const o=n.all.find(i=>i.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&ou(t),ig(e,t),r&&ru(e);}function N_(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function $_(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(r=>r&&typeof r=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function B_(e){const t=Date.now(),n=e.slots||[],r=[typeof n[0]=="string"?n[0]:At,typeof n[1]=="string"?n[1]:At,typeof n[2]=="string"?n[2]:At];return {name:e.name?.trim()||"Imported Team",petIds:r,createdAt:t,updatedAt:t}}function z_(){const e={success:false,source:"none",imported:0,errors:[]};if(!N_())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=$_();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=Ft();n.teams=[],n.activeTeamId=null;const r=new Set;for(const o of t)try{const i=B_(o);let a=i.name;if(r.has(a)){let u=1;for(;r.has(`${a} (${u})`);)u++;a=`${a} (${u})`;}r.add(a);const l={id:crypto.randomUUID(),name:a,petIds:i.petIds,createdAt:i.createdAt,updatedAt:i.updatedAt};n.teams.push(l),e.imported++;}catch(i){const a=i instanceof Error?i.message:String(i);e.errors.push(`Failed to import "${o.name}": ${a}`);}return e.imported>0&&(gr(n),e.success=true,e.source="aries"),e}let za=false;const ut={init(){if(za)return;if(!Ft().enabled){console.log("[PetTeam] Feature disabled");return}za=true,console.log("[PetTeam] Feature initialized");},destroy(){za&&(za=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:p_,setEnabled:f_,createTeam:C_,updateTeam:Wg,deleteTeam:k_,renameTeam:I_,getTeam:S_,getAllTeams:A_,getTeamByName:E_,reorderTeams:__,getPetsForTeam:m_,isTeamFull:g_,getEmptySlots:b_,getFilledSlotCount:v_,isTeamEmpty:y_,isPetInTeam:x_,getPetSlotIndex:w_,getActiveTeamId:Hg,setActiveTeamId:Vg,isActiveTeam:P_,activateTeam:M_,importFromAries:z_},j_=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],Kg=ft.XP_TRACKER,G_={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},vo="XP Tracker",yo="[XpTracker]";function $o(){return rt(Kg,G_)}function Yg(e){st(Kg,e);}function qg(e){const n={...$o(),...e};return Yg(n),n}function Xg(){return $o().enabled}function U_(e){qg({enabled:e});}function xu(e){return j_.includes(e)}function W_(e){const t=Te.get("abilities");if(!t)return null;const n=t[e];return !n||!xu(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function Qg(e){return e.filter(xu)}function H_(e){return e.some(xu)}function V_(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function Jg(e,t,n,r=100){const o=W_(e);if(!o)return null;const i=V_(e),a=o.requiredWeather,l=a===null||n===a,u=t/r,f=u*u,p=o.baseProbability,m=o.bonusXp,b=p,y=Math.floor(m*f),g=b/100*60,A=l?Math.floor(g*y):0;return {abilityId:e,abilityName:o.name,tier:i,baseChancePerMinute:p,actualChancePerMinute:b,baseXpPerProc:m,actualXpPerProc:y,expectedProcsPerHour:g,expectedXpPerHour:A,requiredWeather:a,isActive:l}}function K_(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=Qg(r.abilities);for(const i of o){const a=Jg(i,r.strength,t,r.maxStrength||100);a&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:a}),a.isActive&&(n.totalBonusXpPerHour+=a.expectedXpPerHour,n.totalProcsPerHour+=a.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function Y_(e,t,n,r=100){const o=Qg(e);return o.length===0?null:Jg(o[0],t,n,r)}function Ff(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function q_(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function X_(e,t){return e.species.localeCompare(t.species)}function Q_(e,t){return t.currentStrength-e.currentStrength}function J_(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function Z_(e,t){return e.name.localeCompare(t.name)}function eI(e){switch(e){case "closestToMax":return Ff;case "furthestFromMax":return q_;case "species":return X_;case "strength":return Q_;case "location":return J_;case "name":return Z_;default:return Ff}}function Zg(e,t){const n=eI(t);return [...e].sort(n)}function tI(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function nI(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function eb(e,t){let n=e;return n=tI(n,t.filterSpecies),n=nI(n,t.filterHasXpBoost),n=Zg(n,t.sortBy),n}let To=false,as=null,pl=[],wu=null;function rI(e,t,n){const r=hg(e.petSpecies,e.targetScale),o=mg(e.petSpecies,e.xp,r),i=o>=r,a=e.hunger<=0,l=a?0:Zn,u=Y_(e.abilities,o,t);u?.isActive&&u.expectedXpPerHour;const f=e.location==="active"&&!a?l+n:0,p=vg(e.petSpecies,e.xp,o,r,f>0?f:Zn),m=bg(e.petSpecies,e.xp,r,f>0?f:Zn),b=yg(e.petSpecies,e.hunger,p),y=Ts(e.petSpecies,e.hunger,m);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:a,currentStrength:o,maxStrength:r,isMaxStrength:i,hoursToNextStrength:p,hoursToMaxStrength:m,feedsToNextStrength:b,feedsToMaxStrength:y,baseXpPerHour:l,totalXpPerHour:f,xpBoostStats:u,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function tb(){const e=Gt.myPets.get(),t=Gt.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(u=>!u.isMature||H_(u.abilities)).filter(u=>u.hunger>0).map(u=>({petId:u.id,petName:u.name??"",abilities:u.abilities,strength:u.currentStrength})),i=K_(o,n);wu=i;const a=[];for(const u of e.all){const f=rI({id:u.id,petSpecies:u.petSpecies,name:u.name??"",xp:u.xp,hunger:u.hunger,targetScale:u.targetScale,abilities:u.abilities,mutations:u.mutations,location:u.location},n,i.totalBonusXpPerHour);a.push(f);}const l=Math.max(0,...a.map(u=>u.hoursToMaxStrength));for(const u of a)u.isMaxStrength&&u.xpBoostStats&&(u.feedsToMaxStrength=xg(true,true,u.species,u.hunger,0,l));return a}function nb(){if(To)return;if(!$o().enabled){console.log(`${yo} ${vo} disabled`);return}console.log(`${yo} Initializing ${vo}...`),Te.isReady()&&(pl=tb()),To=true,console.log(`${yo} ${vo} initialized`);}function Cu(){return To&&Te.isReady()}function ku(){return Cu()?pl:[]}function oI(){return ku().filter(e=>e.location==="active")}function iI(){return wu}function Su(){Cu()&&(pl=tb());}function aI(e){Au();const t=$o(),n=e??t.updateIntervalMs;as=setInterval(()=>{Xg()&&Su();},n);}function Au(){as&&(clearInterval(as),as=null);}function rb(){To&&(Au(),To=false,pl=[],wu=null,console.log(`${yo} ${vo} destroyed`));}function sI(){const e=$o();return eb(ku(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function lI(e){U_(e),e?(To=false,nb(),Te.isReady()&&Su(),console.log(`${yo} ${vo} enabled`)):(rb(),console.log(`${yo} ${vo} disabled`));}const sd={init:nb,isReady:Cu,destroy:rb,loadConfig:$o,saveConfig:Yg,updateConfig:qg,isEnabled:Xg,setEnabled:lI,getAllPetsProgress:ku,getActivePetsProgress:oI,getCombinedBoostStats:iI,getFilteredPets:sI,refresh:Su,startAutoUpdate:aI,stopAutoUpdate:Au,sortPets:Zg,filterAndSortPets:eb},cI={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},dI={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(cI),...Object.keys(dI)];let Si=null;function ob(){const t=yt().get().plant;if(!t)return;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n&&Oi(n.species,n.targetScale,n.mutations||[]);}function uI(e){ob();}function pI(){Si&&ib(),ob(),Si=yt().subscribePlantInfo(uI,{immediate:true});}function ib(){Si&&(Si(),Si=null);}function fl(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function ab(e,t){e.add(()=>t.disconnect());}const ld="css-qnqsp4",cd="css-v439q6";let xo=fl(),dd=false,ei=false,ss=null,ud=null,Rr=null;const fI=`
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
`;function hI(){if(dd)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=fI,document.head.appendChild(e),xo.add(()=>e.remove()),dd=true;}async function mI(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const r=document.createElement("canvas");r.width=20,r.height=20,n.appendChild(r);const o=document.createElement("div");o.className="gemini-qol-cropPrice-text",o.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(o);try{const i=await $e.toCanvas("ui","Coin");if(i&&r.parentElement){const a=r.getContext("2d");if(a){const l=Math.min(r.width/i.width,r.height/i.height),u=i.width*l,f=i.height*l,p=(r.width-u)/2,m=(r.height-f)/2;a.drawImage(i,p,m,u,f);}}}catch(i){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",i);}return t}function gI(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const r of n){const o=r.textContent?.trim();if(!o)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(o)&&t.push(o);}return t}function bI(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const r=n.textContent?.trim();if(!r)continue;const o=r.match(/^([\d.]+)\s*kg$/i);if(o)return parseFloat(o[1])}return 1}function vI(){const e=[],t=document.querySelectorAll(`.${ld}`);for(const r of t)r.offsetParent&&(r.closest("button.chakra-button")||e.push({element:r}));const n=document.querySelectorAll(`.${cd}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelectorAll(":scope > .McFlex > .McFlex");if(o.length>0){const i=o[o.length-1];i.querySelector("p.chakra-text")&&e.push({element:i});}}return e}function yI(){const t=yt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Oi(n.species,n.targetScale,n.mutations||[]):0}function xI(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(".gemini-qol-cropPrice-text");o&&(o.textContent=e>0?e.toLocaleString():"");}}function wI(){Rr!==null&&cancelAnimationFrame(Rr),Rr=requestAnimationFrame(()=>{Rr=null;const e=yI();if(e===ud)return;ud=e;const n=yt().get().plant;!n||!(n.currentSlotIndex!==null&&n.slots[n.currentSlotIndex])||xI(e);});}async function ti(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;const o=yt().get().plant;let i=0,a=null;if(o&&o.currentSlotIndex!==null){const u=o.slots[o.currentSlotIndex];u&&(a=u.species,i=Oi(u.species,u.targetScale,u.mutations||[]));}if(i===0){const u=t.textContent?.trim();if(u){a=u;const f=bI(n),p=gI(n);i=Oi(u,f,p);}}const l=await mI(i);n.appendChild(l),xo.add(()=>l.remove());}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function CI(){const e=vI();for(const n of e)ti(n);ss=yt().subscribePlantInfo(()=>{wI();});const t=new MutationObserver(n=>{const r=dl("MO:cropValueIndicator");for(const o of n)o.type==="childList"&&o.addedNodes.forEach(i=>{if(i instanceof HTMLElement){if(i.classList.contains(ld)&&(i.closest("button.chakra-button")||ti({element:i})),i.querySelectorAll(`.${ld}`).forEach(u=>{u.closest("button.chakra-button")||ti({element:u});}),i.classList.contains(cd)&&!i.closest("button.chakra-button")){const u=i.querySelectorAll(":scope > .McFlex > .McFlex");if(u.length>0){const f=u[u.length-1];f.querySelector("p.chakra-text")&&!f.querySelector(".gemini-qol-cropPrice")&&ti({element:f});}}i.querySelectorAll(`.${cd}`).forEach(u=>{if(!u.closest("button.chakra-button")){const f=u.querySelectorAll(":scope > .McFlex > .McFlex");if(f.length>0){const p=f[f.length-1];p.querySelector("p.chakra-text")&&!p.querySelector(".gemini-qol-cropPrice")&&ti({element:p});}}});}});r();});t.observe(document.body,{childList:true,subtree:true}),ab(xo,t);}const kI={init(){ei||(ei=true,hI(),CI());},destroy(){ei&&(ei=false,Rr!==null&&(cancelAnimationFrame(Rr),Rr=null),ss&&(ss(),ss=null),xo.run(),xo.clear(),xo=fl(),dd=false,ud=null);},isEnabled(){return ei}},sb=ft.CROP_VALUE_INDICATOR,SI={enabled:false};function Eu(){return rt(sb,SI)}function AI(e){st(sb,e);}let Di=false;function lb(){Di||!Eu().enabled||(Di=true,pI());}function cb(){Di&&(ib(),Di=false);}function EI(){return Di}function _I(){return Eu().enabled}function II(e){const t=Eu();t.enabled!==e&&(t.enabled=e,AI(t),e?lb():cb());}const ls={init:lb,destroy:cb,isReady:EI,isEnabled:_I,setEnabled:II,render:kI},Ni="css-qnqsp4",_u="css-1cdcuw7",Iu='[role="tooltip"]';let cs=fl(),ni=false,ds=null,pd=null,Fr=null;function TI(){const e=[],t=document.querySelectorAll(`.${Ni}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const r=n.querySelector(`.${_u}`);r&&e.push({element:n,weightElement:r});}return e}function PI(){const t=yt().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?uu(n.species,n.targetScale):0}function MI(e,t){const n=document.querySelectorAll(`.${Ni}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(`.${_u}`);if(o){const i=o.querySelector("svg"),a=`${e}%`;o.textContent=a,i&&o.appendChild(i);}}Ms(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function LI(){Fr!==null&&cancelAnimationFrame(Fr),Fr=requestAnimationFrame(()=>{Fr=null;const e=PI();if(e===pd)return;pd=e;const n=yt().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&MI(e,r);});}function db(e,t){const n=Te.get("plants");if(!n)return "";const r=n[e];return r?.crop?.baseWeight?`${(r.crop.baseWeight*t).toFixed(2)} kg`:""}function Ms(){const e=document.querySelectorAll(Iu),n=yt().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=db(r.species,r.targetScale);for(const i of e){if(!i.offsetParent)continue;const a=i.textContent?.trim();a&&a.startsWith("Size:")&&o&&(i.textContent=o);}}function vc(){const e=TI();for(const t of e)if(t.weightElement)try{const r=yt().get().plant;if(r&&r.currentSlotIndex!==null){const o=r.slots[r.currentSlotIndex];if(o){const i=uu(o.species,o.targetScale),a=t.weightElement.querySelector("svg");t.weightElement.textContent=`${i}%`,a&&t.weightElement.appendChild(a);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}Ms();}function RI(){const e=document.querySelectorAll(`.${Ni}`),n=yt().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=db(r.species,r.targetScale);for(const a of e){if(!a.offsetParent||a.closest("button.chakra-button"))continue;const l=a.querySelector(`.${_u}`);if(l){const u=l.querySelector("svg");l.textContent=o,u&&l.appendChild(u);}}const i=document.querySelectorAll(Iu);for(const a of i){if(!a.offsetParent)continue;const l=a.textContent?.trim();l&&!l.includes("kg")&&(a.textContent=o);}console.log("[CropSizeIndicator.render] Restored crop weights");}function FI(){vc(),ds=yt().subscribePlantInfo(()=>{LI();});const e=new MutationObserver(t=>{const n=dl("MO:cropSizeIndicator");for(const r of t)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.hasAttribute("role")&&o.getAttribute("role")==="tooltip"){const l=o.textContent?.trim();l&&l.startsWith("Size:")&&Ms();}o.classList.contains(Ni)&&(o.closest("button.chakra-button")||vc()),o.querySelectorAll(`.${Ni}`).length>0&&vc(),o.querySelectorAll(Iu).forEach(l=>{const u=l.textContent?.trim();u&&u.startsWith("Size:")&&Ms();});}});n();});e.observe(document.body,{childList:true,subtree:true}),ab(cs,e),console.log("[CropSizeIndicator.render] Started observing crops");}const Tu={init(){if(ni){console.log("[CropSizeIndicator.render] Already initialized");return}ni=true,FI(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){ni&&(ni=false,RI(),Fr!==null&&(cancelAnimationFrame(Fr),Fr=null),ds&&(ds(),ds=null),cs.run(),cs.clear(),cs=fl(),pd=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return ni}},ub=ft.CROP_SIZE_INDICATOR,OI={enabled:false};function Pu(){return rt(ub,OI)}function DI(e){st(ub,e);}let $i=false;function pb(){if($i){console.log("[CropSizeIndicator] Already initialized");return}if(!Pu().enabled){console.log("[CropSizeIndicator] Disabled");return}$i=true,console.log("[CropSizeIndicator] Initializing..."),Tu.init(),console.log("[CropSizeIndicator] Initialized successfully");}function fb(){$i&&(console.log("[CropSizeIndicator] Destroying..."),Tu.destroy(),$i=false,console.log("[CropSizeIndicator] Destroyed"));}function NI(){return $i}function $I(){return Pu().enabled}function BI(e){const t=Pu();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,DI(t),e?pb():fb(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const us={init:pb,destroy:fb,isReady:NI,isEnabled:$I,setEnabled:BI,render:Tu},hb=ft.SHOP_NOTIFIER,mb={seed:[],tool:[],egg:[],decor:[]},zI={enabled:false,trackedItems:mb},jI=["seed","tool","egg","decor"];function gb(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function ea(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function Bo(){const e=rt(hb,zI);return {enabled:e?.enabled??false,trackedItems:gb(e?.trackedItems)}}function hl(e){st(hb,{enabled:e.enabled,trackedItems:ea(e.trackedItems)});}function GI(e){const n={...Bo(),...e};return e.trackedItems&&(n.trackedItems=gb(e.trackedItems)),hl(n),n}function Mu(){return Bo().enabled}function UI(e){GI({enabled:e});}function bb(){return ea(Bo().trackedItems)}function vb(){const e=bb(),t=[];for(const n of jI)for(const r of e[n])t.push({shopType:n,itemId:r});return t}function WI(e,t){const n=Bo(),r=ea(n.trackedItems),o=r[e];if(o.includes(t))return;o.push(t),hl({...n,trackedItems:r});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(i);}function yb(e,t){const n=Bo(),r=ea(n.trackedItems),o=r[e],i=o.filter(l=>l!==t);if(i.length===o.length)return;r[e]=i,hl({...n,trackedItems:r});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(a);}function HI(){const e=Bo();hl({...e,trackedItems:ea(mb)});}let Ls=false;const fd=[];function VI(e,t){const n=bb()[e];if(!n.length)return [];const r=new Set(n);return t.items.filter(o=>r.has(o.id)&&o.isAvailable).map(o=>({itemId:o.id,remaining:o.remaining}))}function ja(e,t){const n=VI(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const r=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(r);}function KI(){if(Ls)return;Ls=true;const e=No();fd.push(e.subscribeSeedRestock(t=>ja("seed",t)),e.subscribeToolRestock(t=>ja("tool",t)),e.subscribeEggRestock(t=>ja("egg",t)),e.subscribeDecorRestock(t=>ja("decor",t)));}function YI(){if(Ls){Ls=false;for(const e of fd)e();fd.length=0;}}const xb={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function qI(e,t,n){const r=n.find(i=>typeof i=="object"&&i!==null&&"toolId"in i&&i.toolId===e);return r?(r.quantity??0)>=t:false}function XI(e,t,n){const r=n.find(f=>typeof f=="object"&&f!==null&&"decorId"in f&&f.decorId===e),o=r?r.quantity??0:0,l=qr().get().decors.all.filter(f=>typeof f=="object"&&f!==null&&"decorId"in f&&f.decorId===e).length;return o+l>=t}function wb(e,t,n,r){return t==="tool"?qI(e,n,r):t==="decor"?XI(e,n,r):false}function Of(e,t){const n=xb[e];if(!n||n.shopType!==t)return  false;const o=Qr().get();return wb(e,t,n.maxQuantity,o.items)}function Df(){const t=Qr().get(),n=vb();for(const r of n){const o=xb[r.itemId];o&&o.shopType===r.shopType&&wb(r.itemId,r.shopType,o.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${r.itemId} (max quantity reached)`),yb(r.shopType,r.itemId));}}let Rs=false,ps=null;function QI(){if(Rs)return;Rs=true,ps=Qr().subscribeStable(()=>{Df();}),Df();}function JI(){Rs&&(Rs=false,ps&&(ps(),ps=null));}let Bi=false;function Cb(){if(Bi){console.log("[ShopNotifier] Already initialized");return}if(!Mu()){console.log("[ShopNotifier] Disabled");return}Bi=true,KI(),QI(),console.log("[ShopNotifier] Initialized");}function kb(){Bi&&(YI(),JI(),Bi=false,console.log("[ShopNotifier] Destroyed"));}function ZI(){return Bi}function e2(){return Mu()}function t2(e){if(Mu()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}UI(e),e?Cb():kb(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const Wr={init:Cb,destroy:kb,isReady:ZI,isEnabled:e2,setEnabled:t2,addTrackedItem:WI,removeTrackedItem:yb,getTrackedItems:vb,resetTrackedItems:HI},Sb=ft.WEATHER_NOTIFIER,n2={enabled:false,trackedWeathers:[]};function Ab(e){return Array.isArray(e)?[...e]:[]}function ml(e){return [...e]}function ta(){const e=rt(Sb,n2);return {enabled:e?.enabled??false,trackedWeathers:Ab(e?.trackedWeathers)}}function Lu(e){st(Sb,{enabled:e.enabled,trackedWeathers:ml(e.trackedWeathers)});}function r2(e){const n={...ta(),...e};return e.trackedWeathers&&(n.trackedWeathers=Ab(e.trackedWeathers)),Lu(n),n}function Eb(){return ta().enabled}function o2(e){r2({enabled:e});}function gl(){return ml(ta().trackedWeathers)}function i2(e){return gl().includes(e)}function a2(e){const t=ta(),n=ml(t.trackedWeathers);if(n.includes(e))return;n.push(e);const r=!t.enabled&&n.length>0,o={trackedWeathers:n,enabled:r?true:t.enabled};Lu(o);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:r}});window.dispatchEvent(i);const a=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(a);}function s2(e){const t=ta(),n=ml(t.trackedWeathers),r=n.filter(l=>l!==e);if(r.length===n.length)return;const o=t.enabled&&r.length===0,i={trackedWeathers:r,enabled:o?false:t.enabled};Lu(i);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:o}});window.dispatchEvent(a);}let Ai=null,fs="Sunny",Qn=false,Ei=null,Fs="";function _b(e){return `${e.soundId}:${e.volume}:${e.mode}`}function Os(e){const t=Fe.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:Ct.CustomSounds.getNotificationConfig("weather")}function l2(e){if(Qn)return;const t=Ct.CustomSounds.getById(e.soundId);if(t){Ei=t.source,Qn=true,Fs=_b(e);try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{Qn=false,Ei=null,Fs="";}}}function hs(){if(Qn){try{const e=Ct.getCustomHandle();(!Ei||e&&e.url===Ei)&&Ct.CustomSounds.stop();}catch{}Qn=false,Ei=null,Fs="";}}function zi(e,t){const n=t??Os(e);if(n.mode!=="loop"){Qn&&hs();return}if(!gl().includes(e)){Qn&&hs();return}const i=_b(n);Qn&&i!==Fs&&hs(),Qn||l2(n);}function Ib(e){const{weatherId:t}=e.detail||{};if(!t)return;const o=Zi().get().id,i=Os(t);if(o===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),i.mode==="one-shot"&&Mb(i),zi(o,i);const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function Tb(){const t=Zi().get().id;zi(t);}function Pb(e){if(e.detail?.entityType!=="weather")return;const r=Zi().get().id;zi(r);}function c2(){if(Ai){console.log("[WeatherNotifier] Already tracking");return}const e=Zi(),t=e.get();fs=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",fs),window.addEventListener("gemini:weather-tracked-check",Ib),window.addEventListener("gemini:tracked-weathers-changed",Tb),window.addEventListener(ht.CUSTOM_SOUND_CHANGE,Pb);const n=Os(t.id);zi(t.id,n),Ai=e.subscribeStable(r=>{const o=r.current.id,i=r.previous.id,a=Os(o);if(console.log("[WeatherNotifier] Weather changed:",{previous:i,current:o}),zi(o,a),o!==i&&gl().includes(o)){console.log("[WeatherNotifier] Tracked weather detected:",o),a.mode==="one-shot"&&Mb(a);const u=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:o}});window.dispatchEvent(u);}fs=o;}),console.log("[WeatherNotifier] Tracking initialized");}function d2(){window.removeEventListener("gemini:weather-tracked-check",Ib),window.removeEventListener("gemini:tracked-weathers-changed",Tb),window.removeEventListener(ht.CUSTOM_SOUND_CHANGE,Pb),Ai&&(Ai(),Ai=null,fs="Sunny",hs(),console.log("[WeatherNotifier] Tracking stopped"));}function Mb(e){try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let ji=false;function Lb(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),Fb(),Rb());}function Rb(){if(ji){console.log("[WeatherNotifier] Already initialized");return}if(ji=true,window.addEventListener("gemini:tracked-weathers-changed",Lb),!Eb()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),c2(),console.log("[WeatherNotifier] Initialized");}function Fb(){ji&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",Lb),d2(),ji=false,console.log("[WeatherNotifier] Destroyed"));}function u2(){return ji}const Po={init:Rb,destroy:Fb,isReady:u2,isEnabled:Eb,setEnabled:o2,getTrackedWeathers:gl,addTrackedWeather:a2,removeTrackedWeather:s2,isWeatherTracked:i2},p2={enabled:false,threshold:5};function bl(){return rt(ft.PET_HUNGER_NOTIFIER,p2)}function Ob(e){st(ft.PET_HUNGER_NOTIFIER,e);}function Db(){return bl().enabled}function f2(e){const t=bl();t.enabled=e,Ob(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function Nb(){return bl().threshold}function h2(e){const t=bl();t.threshold=e,Ob(t);}let _i=null;const ms=new Set;let pr=false,Ii=null;function m2(e){if(pr)return;const t=Ct.CustomSounds.getById(e.soundId);if(t){Ii=t.source,pr=true;try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{pr=false,Ii=null;}}}function hd(){if(pr){try{const e=Ct.getCustomHandle();(!Ii||e&&e.url===Ii)&&Ct.CustomSounds.stop();}catch{}pr=false,Ii=null;}}function g2(e,t){if(t.mode!=="loop"){pr&&hd();return}e?pr||m2(t):pr&&hd();}function b2(){if(_i){console.log("[PetHungerNotifier] Already tracking");return}const e=Xr(),t=Nb();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),_i=e.subscribe(n=>{const r=n.byLocation.active,o=Ct.CustomSounds.getNotificationConfig("pet"),i=o.mode==="loop";let a=false;for(const l of r)if(l.hungerPercent<t){if(a=true,!ms.has(l.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:l.name||l.petSpecies,species:l.petSpecies,hungerPercent:l.hungerPercent.toFixed(2)+"%"}),i||y2(o);const u=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:l}});window.dispatchEvent(u),ms.add(l.id);}}else ms.delete(l.id);g2(a,o);}),console.log("[PetHungerNotifier] Tracking initialized");}function v2(){_i&&(_i(),_i=null,ms.clear(),hd(),console.log("[PetHungerNotifier] Tracking stopped"));}function y2(e){try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let Gi=false;function $b(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),zb(),Bb());}function Bb(){if(Gi){console.log("[PetHungerNotifier] Already initialized");return}if(Gi=true,window.addEventListener("gemini:pet-hunger-config-changed",$b),!Db()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),b2(),console.log("[PetHungerNotifier] Initialized");}function zb(){Gi&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",$b),v2(),Gi=false,console.log("[PetHungerNotifier] Destroyed"));}function x2(){return Gi}const Ui={init:Bb,destroy:zb,isReady:x2,isEnabled:Db,setEnabled:f2,getThreshold:Nb,setThreshold:h2},w2={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},jb=ft.ARIES_API;function Ru(){return rt(jb,w2)}function C2(e){st(jb,e);}function k2(e){const n={...Ru(),...e};return C2(n),n}let Ds=null,Ns=null;function Nf(e){Ds=e;}function $f(e){Ns=e;}function S2(){return Ds?[...Ds]:[]}function A2(){return Ns?[...Ns]:[]}function Bf(){Ds=null,Ns=null;}function Gb(e,t){const n=Ru(),r=new URL(e,n.apiBaseUrl);if(t)for(const[o,i]of Object.entries(t))i!==void 0&&r.searchParams.set(o,String(i));return r.toString()}function vl(e,t){return new Promise(n=>{const r=Gb(e,t);GM_xmlhttpRequest({method:"GET",url:r,headers:{},onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] GET parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] GET error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] GET request failed:",o),n({status:0,data:null});}});})}function yl(e,t){return new Promise(n=>{const r=Gb(e);GM_xmlhttpRequest({method:"POST",url:r,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] POST parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] POST error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] POST request failed:",o),n({status:0,data:null});}});})}async function Fu(e=50){const{data:t}=await vl("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(r=>({name:r.name,avatarUrl:r.avatar_url??null})):void 0}))}async function E2(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Fu(o),l=[];for(const u of a){if(!u.userSlots||u.userSlots.length===0)continue;const f=u.userSlots.filter(p=>p.name?p.name.toLowerCase().includes(i):false);f.length>0&&l.push({room:u,matchedSlots:f});}return l}async function _2(e){if(!e)return null;const{status:t,data:n}=await vl("get-player-view",{playerId:e});return t===404?null:n}async function xl(e,t){const n=Array.from(new Set((e??[]).map(a=>String(a).trim()).filter(a=>a.length>=3)));if(n.length===0)return [];const r={playerIds:n};t?.sections&&(r.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:o,data:i}=await yl("get-players-view",r);return o!==200||!Array.isArray(i)?[]:i}async function I2(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Fu(o),l=new Map;for(const u of a)if(!(!u.userSlots||u.userSlots.length===0))for(const f of u.userSlots){if(!f.name||!f.name.toLowerCase().includes(i))continue;const m=`${u.id}::${f.name}`;l.has(m)||l.set(m,{playerName:f.name,avatarUrl:f.avatarUrl,roomId:u.id,roomPlayersCount:u.playersCount});}return Array.from(l.values())}async function Ub(e){if(!e)return [];const{status:t,data:n}=await vl("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function T2(e){const t=await Ub(e);if(t.length===0)return Nf([]),[];const n=await xl(t,{sections:["profile","room"]});return Nf(n),[...n]}async function Ou(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await vl("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function P2(e){const{incoming:t}=await Ou(e),n=t.map(o=>o.fromPlayerId);if(n.length===0)return $f([]),[];const r=await xl(n,{sections:["profile"]});return $f(r),[...r]}async function M2(e){const{outgoing:t}=await Ou(e),n=t.map(r=>r.toPlayerId);return n.length===0?[]:xl(n,{sections:["profile"]})}async function L2(e,t){if(!e||!t||e===t)return  false;const{status:n}=await yl("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function R2(e){const{playerId:t,otherPlayerId:n,action:r}=e;if(!t||!n||t===n)return  false;const{status:o}=await yl("friend-respond",{playerId:t,otherPlayerId:n,action:r});return o===204}async function F2(e,t){if(!e||!t||e===t)return  false;const{status:n}=await yl("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let ri=false;const $s={init(){ri||(ri=true,console.log("[AriesAPI] Initialized"));},destroy(){ri&&(ri=false,Bf(),console.log("[AriesAPI] Destroyed"));},isReady(){return ri},getConfig(){return Ru()},updateConfig(e){return k2(e)},fetchRooms:Fu,searchRoomsByPlayerName:E2,fetchPlayerView:_2,fetchPlayersView:xl,searchPlayersByName:I2,fetchFriendsIds:Ub,fetchFriendsWithViews:T2,fetchFriendRequests:Ou,fetchIncomingRequestsWithViews:P2,fetchOutgoingRequestsWithViews:M2,sendFriendRequest:L2,respondFriendRequest:R2,removeFriend:F2,getCachedFriends:S2,getCachedIncomingRequests:A2,clearCache:Bf},zf={enabled:true,manualLocks:[],overallRules:[],speciesRules:{}};function Bs(){return `rule-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function O2(e){const t={enabled:e.enabled,manualLocks:e.manualLocks||[],overallRules:[],speciesRules:{}},n=e.globalCriteria?.lockByScale?.enabled,r=(e.globalCriteria?.lockedMutations?.length??0)>0;if(n||r){const o={id:Bs(),name:"Migrated Global Rule",enabled:true,mode:"lock",sizeCondition:n?{enabled:true,minPercentage:e.globalCriteria.lockByScale.minPercentage}:void 0,mutationCondition:r?{enabled:true,mutations:e.globalCriteria.lockedMutations,matchMode:"any"}:void 0};t.overallRules.push(o);}if(e.speciesOverrides)for(const[o,i]of Object.entries(e.speciesOverrides)){const a=i.lockByScale?.enabled,l=(i.lockedMutations?.length??0)>0;if(a||l){const u={id:Bs(),name:`Migrated ${o} Rule`,enabled:true,mode:"lock",sizeCondition:a?{enabled:true,minPercentage:i.lockByScale.minPercentage}:void 0,mutationCondition:l?{enabled:true,mutations:i.lockedMutations,matchMode:"any"}:void 0};t.speciesRules[o]=[u];}}return console.log("[HarvestLocker] Migrated legacy config to new format"),t}function D2(e){const t=e;return t!==null&&typeof t=="object"&&"globalCriteria"in t&&!("overallRules"in t)}function mt(){const e=rt($t.FEATURE.HARVEST_LOCKER,zf);if(D2(e)){const t=O2(e);return hn(t),t}return {...zf,...e,manualLocks:e.manualLocks||[],overallRules:e.overallRules||[],speciesRules:e.speciesRules||{}}}function hn(e){st($t.FEATURE.HARVEST_LOCKER,e);}function Wb(e,t,n,r){return {id:Bs(),name:e,enabled:true,mode:t,sizeCondition:n,mutationCondition:r}}function N2(e){const t=mt();t.overallRules.push(e),hn(t);}function $2(e,t){const n=mt();n.speciesRules[e]||(n.speciesRules[e]=[]),n.speciesRules[e].push(t),hn(n);}function Hb(e,t){const n=mt(),r=n.overallRules.findIndex(o=>o.id===e);if(r!==-1){n.overallRules[r]={...n.overallRules[r],...t},hn(n);return}for(const o of Object.keys(n.speciesRules)){const i=n.speciesRules[o].findIndex(a=>a.id===e);if(i!==-1){n.speciesRules[o][i]={...n.speciesRules[o][i],...t},hn(n);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function B2(e){const t=mt(),n=t.overallRules.findIndex(r=>r.id===e);if(n!==-1){t.overallRules.splice(n,1),hn(t);return}for(const r of Object.keys(t.speciesRules)){const o=t.speciesRules[r].findIndex(i=>i.id===e);if(o!==-1){t.speciesRules[r].splice(o,1),t.speciesRules[r].length===0&&delete t.speciesRules[r],hn(t);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function z2(e,t){const n=mt(),r=n.overallRules.find(i=>i.id===e);if(!r){console.warn(`[HarvestLocker] Rule ${e} not found`);return}const o={...r,id:Bs(),name:`${r.name} (${t})`};n.speciesRules[t]||(n.speciesRules[t]=[]),n.speciesRules[t].push(o),hn(n);}const Br=new Set;let Jn=null;const zs=[];function j2(e){if(zs.length>0){console.warn("[HarvestLocker] Already started");return}Jn=e;const t=qr().subscribeStable(n=>{if(!n){Br.clear();return}Vb(n);});zs.push(t);}function G2(){zs.forEach(e=>e()),zs.length=0,Br.clear(),Jn=null,console.log("[HarvestLocker] Stopped");}function br(e){Jn=e;const t=qr().get();t&&Vb(t);}function Du(e,t){const n=`${e}-${t}`;return Br.has(n)}function U2(){return Array.from(Br)}function Vb(e){if(Jn){if(Br.clear(),Jn.manualLocks.forEach(t=>Br.add(t)),!Y2(e)){console.warn("[HarvestLocker] Invalid garden structure"),window.dispatchEvent(new CustomEvent(ht.HARVEST_LOCKER_LOCKS_UPDATED));return}e.plants.all.forEach(t=>{t.slots.forEach((n,r)=>{const o=`${t.tileIndex}-${r}`,i=W2(n.species);H2(n,i)&&Br.add(o);});}),window.dispatchEvent(new CustomEvent(ht.HARVEST_LOCKER_LOCKS_UPDATED));}}function W2(e){return Jn?Jn.speciesRules[e]?Jn.speciesRules[e].filter(t=>t.enabled):Jn.overallRules.filter(t=>t.enabled):[]}function H2(e,t){const n=t.filter(o=>o.mode==="lock"),r=t.filter(o=>o.mode==="allow");for(const o of n)if(jf(e,o))return  true;return r.length>0&&!r.some(i=>jf(e,i))}function jf(e,t){const n=[];if(t.sizeCondition?.enabled){const r=K2(e),o=t.sizeCondition.sizeMode??"max";n.push(o==="max"?r>=t.sizeCondition.minPercentage:r<=t.sizeCondition.minPercentage);}if(t.mutationCondition?.enabled&&t.mutationCondition.mutations.length>0){const r=V2(e.mutations,t.mutationCondition.mutations,t.mutationCondition.matchMode);n.push(r);}return n.length>0&&n.every(r=>r)}function V2(e,t,n){const r=t.includes("none"),o=t.filter(a=>a!=="none"),i=r&&e.length===0;return n==="any"?i?true:o.some(a=>e.includes(a)):r&&e.length>0?false:o.length===0?i:o.every(a=>e.includes(a))}function K2(e){const n=Te.get("plants")?.[e.species];if(!n||typeof n!="object"||!("crop"in n))return 0;const r=n.crop;if(typeof r!="object"||!r)return 0;const{baseTileScale:o,maxScale:i}=r,a=i-o;return a===0?100:(e.targetScale-o)/a*100}function Y2(e){return typeof e=="object"&&e!==null&&"plants"in e&&typeof e.plants=="object"&&e.plants!==null&&"all"in e.plants&&Array.isArray(e.plants.all)}const js=new Set,Gs=new Set;let wo=null;function Kb(){wo||(wo=new MutationObserver(e=>{const t=dl("MO:shared-hub");for(const n of e){for(const r of n.addedNodes)if(r instanceof Element)for(const o of js){r.matches(o.selector)&&o.callback(r);const i=r.querySelectorAll(o.selector);for(const a of i)o.callback(a);}for(const r of n.removedNodes)if(r instanceof Element)for(const o of Gs){r.matches(o.selector)&&o.callback(r);const i=r.querySelectorAll(o.selector);for(const a of i)o.callback(a);}}t();}),wo.observe(document.body,{childList:true,subtree:true}));}function Yb(){js.size===0&&Gs.size===0&&wo&&(wo.disconnect(),wo=null);}function Nu(e,t){Kb();const n={selector:e,callback:t};js.add(n);const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>{js.delete(n),Yb();}}}function $u(e,t){Kb();const n={selector:e,callback:t};return Gs.add(n),{disconnect:()=>{Gs.delete(n),Yb();}}}const q2=`
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
`,Gf="css-qnqsp4",qb="gemini-qol-harvestLocker-locked",md="gemini-qol-harvestLocker-lock-icon",gd="gemini-qol-harvestLocker-styles",X2='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let $n=null,gs=false;const bd=[];function Ga(e){bd.push(e);}function Q2(){for(const e of bd)try{e();}catch(t){console.warn("[HarvestLocker Inject] Cleanup error:",t);}bd.length=0;}function J2(){if(gs)return;if(document.getElementById(gd)){gs=true;return}const e=document.createElement("style");e.id=gd,e.textContent=q2,document.head.appendChild(e),gs=true;}function Z2(){document.getElementById(gd)?.remove(),gs=false;}function eT(e){if(e.classList.add(qb),!e.querySelector(`#${md}`)){const t=document.createElement("div");t.id=md,t.innerHTML=X2,e.appendChild(t);}}function Us(e){e.classList.remove(qb),e.querySelector(`#${md}`)?.remove();}function yc(){if(!$n)return;const e=yt().get();if(!e.plant||e.position.localIndex===null||e.plant.nextHarvestSlotIndex===null){Us($n);return}const t=String(e.position.localIndex),n=e.plant.nextHarvestSlotIndex;Du(t,n)?eT($n):Us($n);}function tT(){J2();const e=Nu(`.${Gf}`,o=>{$n=o,yc();});Ga(()=>e.disconnect());const t=$u(`.${Gf}`,o=>{$n===o&&(Us(o),$n=null);});Ga(()=>t.disconnect());const n=yt().subscribePlantInfo(()=>{yc();});Ga(n);const r=()=>yc();window.addEventListener(ht.HARVEST_LOCKER_LOCKS_UPDATED,r),Ga(()=>window.removeEventListener(ht.HARVEST_LOCKER_LOCKS_UPDATED,r)),console.log("[HarvestLocker Inject] Started");}function nT(){$n&&(Us($n),$n=null),Q2(),Z2(),console.log("[HarvestLocker Inject] Stopped");}let Ua=false;const Xb={init(){Ua||(tT(),Ua=true);},destroy(){Ua&&(nT(),Ua=false);},isEnabled(){return mt().enabled}},Qb=[];function rT(){return Qb.slice()}function oT(e){Qb.push(e);}function Jb(e){try{return JSON.parse(e)}catch{return}}function Uf(e){if(typeof e=="string"){const t=Jb(e);return t!==void 0?t:e}return e}function Zb(e){if(e!=null){if(typeof e=="string"){const t=Jb(e);return t!==void 0?Zb(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function iT(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Me(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,l)=>{if(Zb(a)!==e)return;const f=o(a,l);return f&&typeof f=="object"&&"kind"in f?f:typeof f=="boolean"?f?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return oT(i),i}const oi=new WeakSet,Wf=new WeakMap;function aT(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:rT();if(!r.length)return ()=>{};const o=b=>({ws:b,pageWindow:t,debug:n}),i=(b,y)=>{let g=b;for(const A of r){const M=A(g,o(y));if(M){if(M.kind==="drop")return {kind:"drop"};M.kind==="replace"&&(g=M.message);}}return g!==b?{kind:"replace",message:g}:void 0};let a=null,l=null,u=null;const f=()=>{const b=t?.MagicCircle_RoomConnection,y=b?.sendMessage;if(!b||typeof y!="function")return  false;if(oi.has(y))return  true;const g=y.bind(b);function A(...M){const I=M.length===1?M[0]:M,L=Uf(I),D=i(L,iT(t));if(D?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",L);return}if(D?.kind==="replace"){const z=D.message;return M.length>1&&Array.isArray(z)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",L,"=>",z),g(...z)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",L,"=>",z),g(z))}return g(...M)}oi.add(A),Wf.set(A,y);try{b.sendMessage=A,oi.add(b.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{b.sendMessage===A&&(b.sendMessage=y);}catch{}},true};(()=>{const b=t?.WebSocket?.prototype,y=b?.send;if(typeof y!="function"||oi.has(y))return;function g(A){const M=Uf(A),I=i(M,this);if(I?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",M);return}if(I?.kind==="replace"){const L=I.message,D=typeof L=="string"||L instanceof ArrayBuffer||L instanceof Blob?L:JSON.stringify(L);return n&&console.log("[WS] replace outgoing (ws.send)",M,"=>",L),y.call(this,D)}return y.call(this,A)}oi.add(g),Wf.set(g,y);try{b.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}l=()=>{try{b.send===g&&(b.send=y);}catch{}};})();const m=e.waitForRoomConnectionMs??4e3;if(!f()&&m>0){const b=Date.now();u=setInterval(()=>{if(f()){clearInterval(u),u=null;return}Date.now()-b>m&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(u){try{clearInterval(u);}catch{}u=null;}if(a){try{a();}catch{}a=null;}if(l){try{l();}catch{}l=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Me(he.HarvestCrop,(e,t)=>{if(!mt().enabled)return  true;const r=e,o=r.slot!==void 0?String(r.slot):void 0,i=r.slotsIndex;return o!==void 0&&typeof i=="number"&&Du(o,i)?(console.log(`[HarvestLocker] Blocked harvest for slot ${o}-${i}`),false):true});let Mo=false;function ev(){if(Mo){console.warn("[HarvestLocker] Already initialized");return}const e=mt();if(!e.enabled){console.log("[HarvestLocker] Disabled");return}Mo=true,j2(e),Xb.init(),console.log("[HarvestLocker] Initialized");}function tv(){Mo&&(Xb.destroy(),G2(),Mo=false,console.log("[HarvestLocker] Destroyed"));}function sT(){return mt().enabled}function lT(e){const t=mt();t.enabled=e,hn(t),e&&!Mo?ev():!e&&Mo&&tv();}function cT(e,t){return Du(e,t)}function dT(){return U2()}function uT(e,t){const n=mt(),r=`${e}-${t}`;n.manualLocks.includes(r)||(n.manualLocks.push(r),hn(n),br(n));}function pT(e,t){const n=mt(),r=`${e}-${t}`;n.manualLocks=n.manualLocks.filter(o=>o!==r),hn(n),br(n);}function fT(){const e=mt();e.manualLocks=[],hn(e),br(e);}function hT(){return mt()}function mT(){return mt().overallRules}function gT(e){return mt().speciesRules[e]||[]}function bT(){const e=mt();return Object.keys(e.speciesRules)}function vT(e,t,n,r){const o=Wb(e,t,n,r);return N2(o),br(mt()),o}function yT(e,t,n,r,o){const i=Wb(t,n,r,o);return $2(e,i),br(mt()),i}function xT(e,t){Hb(e,t),br(mt());}function wT(e){B2(e),br(mt());}function CT(e,t){Hb(e,{enabled:t}),br(mt());}const zt={init:ev,destroy:tv,isEnabled:sT,setEnabled:lT,isLocked:cT,getAllLockedSlots:dT,lockSlot:uT,unlockSlot:pT,clearManualLocks:fT,getOverallRules:mT,getSpeciesRules:gT,getAllSpeciesWithRules:bT,addNewOverallRule:vT,addNewSpeciesRule:yT,modifyRule:xT,removeRule:wT,toggleRule:CT,cloneRuleToSpecies:z2,getConfig:hT},Hf={enabled:true,blockedEggs:[]};function rr(){const e=rt($t.FEATURE.EGG_LOCKER,Hf);return {...Hf,...e,blockedEggs:e.blockedEggs||[]}}function wl(e){st($t.FEATURE.EGG_LOCKER,e);}function kT(e){const t=rr();t.blockedEggs.includes(e)||(t.blockedEggs.push(e),wl(t),window.dispatchEvent(new CustomEvent(ht.EGG_LOCKER_LOCKS_UPDATED)));}function ST(e){const t=rr();t.blockedEggs=t.blockedEggs.filter(n=>n!==e),wl(t),window.dispatchEvent(new CustomEvent(ht.EGG_LOCKER_LOCKS_UPDATED));}const AT=`
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
`,Vf="css-qnqsp4",nv="gemini-qol-eggLocker-locked",vd="gemini-qol-eggLocker-lock-icon",yd="gemini-qol-eggLocker-styles",ET='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Bn=null,bs=false;const xd=[];function Wa(e){xd.push(e);}function _T(){for(const e of xd)try{e();}catch(t){console.warn("[EggLocker Inject] Cleanup error:",t);}xd.length=0;}function IT(){if(bs)return;if(document.getElementById(yd)){bs=true;return}const e=document.createElement("style");e.id=yd,e.textContent=AT,document.head.appendChild(e),bs=true;}function TT(){document.getElementById(yd)?.remove(),bs=false;}function PT(e){if(e.classList.add(nv),!e.querySelector(`#${vd}`)){const t=document.createElement("div");t.id=vd,t.innerHTML=ET,e.appendChild(t);}}function Ws(e){e.classList.remove(nv),e.querySelector(`#${vd}`)?.remove();}function xc(){if(!Bn)return;const e=yt().get();if(e.object.type!=="egg"||!e.object.data){Ws(Bn);return}const t=e.object.data;cr.getBlockedEggs().includes(t.eggId)?PT(Bn):Ws(Bn);}function MT(){IT();const e=Nu(`.${Vf}`,o=>{Bn=o,xc();});Wa(()=>e.disconnect());const t=$u(`.${Vf}`,o=>{Bn===o&&(Ws(o),Bn=null);});Wa(()=>t.disconnect());const n=yt().subscribeObject(()=>{xc();});Wa(n);const r=()=>xc();window.addEventListener(ht.EGG_LOCKER_LOCKS_UPDATED,r),Wa(()=>window.removeEventListener(ht.EGG_LOCKER_LOCKS_UPDATED,r)),console.log("[EggLocker Inject] Started");}function LT(){Bn&&(Ws(Bn),Bn=null),_T(),TT(),console.log("[EggLocker Inject] Stopped");}let Ha=false;const rv={init(){Ha||(MT(),Ha=true);},destroy(){Ha&&(LT(),Ha=false);},isEnabled(){return rr().enabled}};Me(he.HatchEgg,()=>{const e=rr();if(!e.enabled)return  true;const t=yt().get();if(t.object.type!=="egg"||!t.object.data)return  true;const n=t.object.data.eggId;return e.blockedEggs.includes(n)?(console.log(`[EggLocker] Blocked hatch for ${n}`),false):(console.log(`[EggLocker] Allowed hatch for ${n}`),true)});let Lo=false;function ov(){if(Lo)return;if(!rr().enabled){console.log("[EggLocker] Disabled");return}Lo=true,rv.init(),console.log("[EggLocker] Initialized");}function iv(){Lo&&(rv.destroy(),Lo=false,console.log("[EggLocker] Destroyed"));}function RT(){return rr().enabled}function FT(e){const t=rr();t.enabled=e,wl(t),e&&!Lo?ov():!e&&Lo&&iv();}function OT(){const e=Te.get("eggs");return e?Object.keys(e):[]}function DT(){return rr().blockedEggs}function NT(e){kT(e);}function $T(e){ST(e);}function BT(){const e=rr();e.blockedEggs=[],wl(e);}const cr={init:ov,destroy:iv,isEnabled:RT,setEnabled:FT,getAvailableEggs:OT,getBlockedEggs:DT,blockEgg:NT,unblockEgg:$T,clearBlocks:BT},Kf={enabled:true,blockedDecors:[]};function An(){const e=rt($t.FEATURE.DECOR_LOCKER,Kf);return {...Kf,...e,blockedDecors:e.blockedDecors||[]}}function na(e){st($t.FEATURE.DECOR_LOCKER,e);}function zT(e){const t=An();t.blockedDecors.includes(e)||(t.blockedDecors.push(e),na(t),window.dispatchEvent(new CustomEvent(ht.DECOR_LOCKER_LOCKS_UPDATED)));}function jT(e){const t=An();t.blockedDecors=t.blockedDecors.filter(n=>n!==e),na(t),window.dispatchEvent(new CustomEvent(ht.DECOR_LOCKER_LOCKS_UPDATED));}const GT=`
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
`,Yf="css-qnqsp4",av="gemini-qol-decorLocker-locked",wd="gemini-qol-decorLocker-lock-icon",Cd="gemini-qol-decorLocker-styles",UT='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let zn=null,vs=false;const kd=[];function Va(e){kd.push(e);}function WT(){for(const e of kd)try{e();}catch(t){console.warn("[DecorLocker Inject] Cleanup error:",t);}kd.length=0;}function HT(){if(vs)return;if(document.getElementById(Cd)){vs=true;return}const e=document.createElement("style");e.id=Cd,e.textContent=GT,document.head.appendChild(e),vs=true;}function VT(){document.getElementById(Cd)?.remove(),vs=false;}function KT(e){if(e.classList.add(av),!e.querySelector(`#${wd}`)){const t=document.createElement("div");t.id=wd,t.innerHTML=UT,e.appendChild(t);}}function Hs(e){e.classList.remove(av),e.querySelector(`#${wd}`)?.remove();}function wc(){if(!zn)return;const e=yt().get();if(e.object.type!=="decor"||!e.object.data){Hs(zn);return}const t=e.object.data;dr.isDecorBlocked(t.decorId)?KT(zn):Hs(zn);}function YT(){HT();const e=Nu(`.${Yf}`,o=>{zn=o,wc();});Va(()=>e.disconnect());const t=$u(`.${Yf}`,o=>{zn===o&&(Hs(o),zn=null);});Va(()=>t.disconnect());const n=yt().subscribeObject(()=>{wc();});Va(n);const r=()=>wc();window.addEventListener(ht.DECOR_LOCKER_LOCKS_UPDATED,r),Va(()=>window.removeEventListener(ht.DECOR_LOCKER_LOCKS_UPDATED,r)),console.log("[DecorLocker Inject] Started");}function qT(){zn&&(Hs(zn),zn=null),WT(),VT(),console.log("[DecorLocker Inject] Stopped");}let Ka=false;const sv={init(){Ka||(YT(),Ka=true);},destroy(){Ka&&(qT(),Ka=false);},isEnabled(){return An().enabled}};Me(he.PickupDecor,()=>{const e=An();if(!e.enabled)return  true;const t=yt().get();if(!t.object||t.object.type!=="decor"||!t.object.data)return  true;const n=t.object.data.decorId;return e.blockedDecors.includes(n)?(console.log(`[DecorLocker] Blocked pickup for ${n}`),false):(console.log(`[DecorLocker] Allowed pickup for ${n}`),true)});let Ro=false;function lv(){if(Ro)return;if(!An().enabled){console.log("[DecorLocker] Disabled");return}Ro=true,sv.init(),console.log("[DecorLocker] Initialized");}function cv(){Ro&&(sv.destroy(),Ro=false,console.log("[DecorLocker] Destroyed"));}function XT(){return An().enabled}function QT(e){const t=An();t.enabled=e,na(t),e&&!Ro?lv():!e&&Ro&&cv();}function dv(){const e=Te.get("decor");return e?Object.keys(e):[]}function JT(){return An().blockedDecors}function ZT(e){return An().blockedDecors.includes(e)}function eP(e){zT(e);}function tP(e){jT(e);}function nP(){const e=dv(),t=An();t.blockedDecors=e,na(t),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function uv(){const e=An();e.blockedDecors=[],na(e),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function rP(){uv();}const dr={init:lv,destroy:cv,isEnabled:XT,setEnabled:QT,getAvailableDecors:dv,getBlockedDecors:JT,isDecorBlocked:ZT,blockDecor:eP,unblockDecor:tP,blockAllDecors:nP,unblockAllDecors:uv,clearBlocks:rP};class pv{constructor(){ve(this,"stats");ve(this,"STORAGE_KEY",ft.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return rt(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){st(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Co=null;function oP(){return Co||(Co=new pv),Co}function iP(){Co&&(Co.endSession(),Co=null);}function fv(e){const t=al(e.xp),n=sl(e.petSpecies,e.targetScale),r=ll(e.petSpecies,e.xp,n),o=cl(e.petSpecies,t),i=fg(e.petSpecies),a=hA(r,n,i),l=mA(r,n);return {current:r,max:n,progress:l,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function hv(e){return {...e,strength:fv(e)}}function mv(e){return e.map(hv)}function aP(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=mv(e),n=t.reduce((u,f)=>u+f.strength.current,0),r=t.reduce((u,f)=>u+f.strength.max,0),o=t.filter(u=>u.strength.isMature).length,i=t.length-o,a=t.reduce((u,f)=>f.strength.max>(u?.strength.max||0)?f:u,t[0]),l=t.reduce((u,f)=>f.strength.max<(u?.strength.max||1/0)?f:u,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:l}}const sP=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:fv,enrichPetWithStrength:hv,enrichPetsWithStrength:mv,getPetStrengthStats:aP},Symbol.toStringTag,{value:"Module"}));class gv{constructor(){ve(this,"logs",[]);ve(this,"maxLogs",1e3);ve(this,"unsubscribe",null);ve(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=Gt.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const l=i.get(a.abilityId);l.count++,(!l.lastProc||a.timestamp>l.lastProc)&&(l.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Or=null;function lP(){return Or||(Or=new gv,Or.init()),Or}function cP(){Or&&(Or.destroy(),Or=null);}const dP={StatsTracker:pv,getStatsTracker:oP,destroyStatsTracker:iP},uP={AbilityLogger:gv,getAbilityLogger:lP,destroyAbilityLogger:cP,...sP},xn=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],pP={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function oo(e){return e?pP[e]??0:0}class fP extends mr{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});ve(this,"allPlants",[]);ve(this,"allPets",[]);ve(this,"sectionElement",null);}async build(n){await UE();const r=n.getRootNode();tn(r,Mg,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await Te.waitForAny(3e3).catch(()=>{}),await Promise.all([Te.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),Te.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=Te.get("plants")||{},r=Te.get("pets")||{};this.allPlants=Object.keys(n).sort((o,i)=>{const a=n[o]?.seed?.rarity||null,l=n[i]?.seed?.rarity||null,u=oo(a)-oo(l);return u!==0?u:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,i)=>{const a=r[o]?.rarity||null,l=r[i]?.rarity||null,u=oo(a)-oo(l);return u!==0?u:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if($e.isReady())return;const n=1e4,r=100;let o=0;return new Promise(i=>{const a=()=>{$e.isReady()||o>=n?i():(o+=r,setTimeout(a,r));};a();})}async renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(await this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=x("div",{className:"kv"}),r=_d({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=fr({checked:vn().get().enabled,onChange:async i=>{const a=vn(),l=a.get();await a.set({...l,enabled:i}),await this.saveConfig();}});return n.append(r.root,o.root),ct({title:"Auto-Favorite",padding:"lg"},n,x("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}async createMutationsCard(){const n=x("div",{className:"u-col"}),r=x("div",{className:"mut-row"});r.appendChild(await this.createMutationButton(xn[0])),r.appendChild(await this.createMutationButton(xn[1])),n.appendChild(r);const o=x("div",{className:"mut-row"});o.appendChild(await this.createMutationButton(xn[2])),o.appendChild(await this.createMutationButton(xn[3])),o.appendChild(await this.createMutationButton(xn[4])),n.appendChild(o);const i=x("div",{className:"mut-row"});i.appendChild(await this.createMutationButton(xn[5])),i.appendChild(await this.createMutationButton(xn[6])),n.appendChild(i);const a=x("div",{className:"mut-row"});return a.appendChild(await this.createMutationButton(xn[7])),a.appendChild(await this.createMutationButton(xn[8])),n.appendChild(a),ct({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${vn().get().favoriteMutations.length} / ${xn.length} active`))}async createMutationButton(n){let r=vn().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&i.push("active");const a=x("div",{className:i.join(" ")}),l=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if($e.isReady()){const p=await $e.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});p.style.width="28px",p.style.height="28px",p.style.objectFit="contain",l.appendChild(p);}}catch{}const u=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),f=x("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},u);if(a.append(l,f),n.id==="Rainbow"||n.id==="Gold"){const p=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if($e.isReady()){const m=await $e.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});m.style.width="28px",m.style.height="28px",m.style.objectFit="contain",p.appendChild(m);}}catch{}a.append(p);}else {const p=x("div",{style:"width: 28px; flex-shrink: 0;"});a.append(p);}return a.addEventListener("click",async p=>{p.stopPropagation();const m=vn(),b=m.get();if(r){const g=b.favoriteMutations.filter(A=>A!==n.id);await m.set({...b,favoriteMutations:g}),r=false,a.classList.remove("active");}else {const g=[...b.favoriteMutations,n.id];await m.set({...b,favoriteMutations:g}),r=true,a.classList.add("active");}await this.saveConfig();const y=this.sectionElement?.querySelector(".card p");y&&(y.textContent=`${vn().get().favoriteMutations.length} / ${xn.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:vn().get().favoriteProduceList,onUpdate:async n=>{const r=vn(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:vn().get().favoritePetsList,onUpdate:async n=>{const r=vn(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:i,selected:a,onUpdate:l}=n;let u=new Set(a),f=o;const p=x("div",{style:"margin-bottom: 8px;"}),m=Wi({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:T=>{const R=T.trim().toLowerCase();R?f=o.filter(P=>P.toLowerCase().includes(R)):f=o,D.setData(A());}});p.appendChild(m.root);const b=x("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),y=vt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const T=A().map(R=>R.id);D.setSelection(T);}}),g=vt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{D.clearSelection();}});b.append(y,g);const A=()=>f.map(T=>({id:T,name:T,rarity:this.getItemRarity(T,i),selected:u.has(T)})),M=T=>{if(!T){const P=x("span",{style:"opacity:0.5;"});return P.textContent="—",P}return ul({variant:"rarity",rarity:T,size:"sm"}).root},I=async T=>{const R=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if($e.isReady()){let P=i,C=T;i==="plant"&&(["Bamboo","Cactus"].includes(T)&&(P="tallplant"),T==="DawnCelestial"&&(C="DawnCelestialCrop"),T==="MoonCelestial"&&(C="MoonCelestialCrop"),T==="OrangeTulip"&&(C="Tulip"));const E=await $e.toCanvas(P,C,{scale:.5});E.style.width="28px",E.style.height="28px",E.style.objectFit="contain",R.appendChild(E);}}catch{}return R},D=qs({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(T,R)=>T.name.localeCompare(R.name,void 0,{numeric:true,sensitivity:"base"}),render:T=>{const R=x("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),P=x("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},T.name);return I(T.id).then(C=>{R.prepend(C);}),R.append(P),R}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(T,R)=>oo(T.rarity)-oo(R.rarity),render:T=>M(T.rarity)}],data:A(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(u),getRowId:T=>T.id,onSelectionChange:T=>{u.clear(),T.forEach(R=>u.add(R)),l(Array.from(u)),O();}}),z=x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),O=()=>{z.textContent=`${u.size} / ${o.length} selected`;};return O(),ct({title:`${r} (${u.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},p,b,D.root,z)}getItemRarity(n,r){try{if(r==="pet")return (Te.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=Te.get("plants")||{},i=o[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const l of Object.values(o))if(l?.seed?.name?.toLowerCase()===a||l?.plant?.name?.toLowerCase()===a)return l.seed.rarity}}catch{}return null}async saveConfig(){const n=vn().get();try{const{updateSimpleConfig:r}=Dg;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}function hP(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function mP(e,t){const n=e;let r=e;const o=Ys({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==r&&(r=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==r&&(r=a,t?.(a));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const i=o.getValue().trim()||n;i!==r&&(r=i,t?.(i));}),o.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),o.input.blur());}),o.root}function gP(e){const t=x("div",{className:"team-list-item"}),n=e.customIndicator??x("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?mP(e.team.name,e.onNameChange):x("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=x("div",{className:"team-list-item__sprites"});async function i(){const u=Gt.myPets.get();o.innerHTML="";for(let f=0;f<3;f++){const p=e.team.petIds[f],m=p&&p!=="",b=x("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!m?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(b.style.cursor="pointer",b.addEventListener("click",()=>{e.onSlotClick(f);})),m){let y=u.all.find(g=>g.id===p);if(!y){const g=window.__petDataCache;g&&g.has(p)&&(y=g.get(p));}if(y)try{const g=await $e.toCanvas("pet",y.petSpecies,{mutations:y.mutations,scale:1}),A=document.createElement("canvas");A.width=g.width,A.height=g.height;const M=A.getContext("2d");if(M&&M.drawImage(g,0,0),A.style.width="100%",A.style.height="100%",A.style.objectFit="contain",b.appendChild(A),e.showSlotStyles){const I=x("div",{className:"team-list-item__sprite-slot-overlay"});b.appendChild(I),b.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${y.petSpecies}:`,g);const A=x("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});b.appendChild(A);}else {const g=x("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});b.appendChild(g),console.warn(`[TeamListItem] Pet ${p} not found in myPets yet, waiting for update`);let A=false;const M=Gt.myPets.subscribe(async()=>{if(A)return;const L=Gt.myPets.get().all.find(D=>D.id===p);if(L){A=true,M();try{b.innerHTML="";const D=await $e.toCanvas("pet",L.petSpecies,{mutations:L.mutations,scale:1}),z=document.createElement("canvas");z.width=D.width,z.height=D.height;const O=z.getContext("2d");if(O&&O.drawImage(D,0,0),z.style.width="100%",z.style.height="100%",z.style.objectFit="contain",b.appendChild(z),e.showSlotStyles){const T=x("div",{className:"team-list-item__sprite-slot-overlay"});b.appendChild(T),b.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${p} sprite updated`);}catch(D){console.warn(`[TeamListItem] Failed to render sprite for pet ${L.petSpecies}:`,D),b.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!m){const y=hP();b.appendChild(y);}o.appendChild(b);}}i();const a=Gt.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const u=x("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(u);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const u=x("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});u.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',u.addEventListener("click",f=>{f.stopPropagation(),e.onExpandClick?.();}),t.appendChild(u);}const l=new MutationObserver(()=>{document.contains(t)||(l.disconnect(),a());});return l.observe(document.body,{childList:true,subtree:true}),t}function bP(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function zo(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,l=x("div",{className:"sg-root"});r!=="md"&&l.classList.add(`sg--${r}`),o&&(l.style.width="100%");const u=x("div",{className:"sg-container",role:"tablist"}),f=x("div",{className:"sg-indicator"}),p=t.map(R=>{const P=x("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:R.label});if(P.id=R.id,R.icon){const E=x("span",{className:"sg-icon"}),B=bP(R.icon);B&&E.appendChild(B),P.appendChild(E);}const C=x("span",{className:"sg-label"},R.label);return P.appendChild(C),P.disabled=!!R.disabled,P});u.appendChild(f),p.forEach(R=>u.appendChild(R)),l.appendChild(u);let m=n,b=i,y=null;function g(){const R=p.find(P=>P.id===m);R&&requestAnimationFrame(()=>{const P=f,C=R.offsetLeft,E=R.offsetWidth;P.style.width=`${E}px`,P.style.transform=`translateX(${C}px)`;});}function A(){p.forEach(R=>{const P=R.id===m;R.classList.toggle("active",P),R.setAttribute("aria-selected",String(P)),R.disabled=b||!!t.find(C=>C.id===R.id)?.disabled;}),g();}function M(R){const P=R.currentTarget;if(P.disabled)return;L(P.id);}function I(R){if(b)return;const P=p.findIndex(E=>E.id===m);let C=P;if(R.key==="ArrowLeft"||R.key==="ArrowUp"?(R.preventDefault(),C=(P-1+p.length)%p.length):R.key==="ArrowRight"||R.key==="ArrowDown"?(R.preventDefault(),C=(P+1)%p.length):R.key==="Home"?(R.preventDefault(),C=0):R.key==="End"&&(R.preventDefault(),C=p.length-1),C!==P){const E=p[C];E&&!E.disabled&&(L(E.id),E.focus());}}p.forEach(R=>{R.addEventListener("click",M),R.addEventListener("keydown",I);});function L(R){!t.some(C=>C.id===R)||m===R||(m=R,A(),a?.(m));}function D(){return m}function z(R){b=!!R,A();}function O(){p.forEach(R=>{R.removeEventListener("click",M),R.removeEventListener("keydown",I);}),y?.disconnect(),y=null;}A(),y=new ResizeObserver(()=>{const R=p.find(P=>P.id===m);if(R&&R.offsetWidth>0){const P=f;P.style.transition="none",P.style.width=`${R.offsetWidth}px`,P.style.transform=`translateX(${R.offsetLeft}px)`,requestAnimationFrame(()=>{P.style.removeProperty("transition");}),y?.disconnect(),y=null;}}),y.observe(u);const T=l;return T.select=L,T.getSelected=D,T.setDisabled=z,T.destroy=O,T}function Cl(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:l}=e,u=x("div",{className:"lg-checkbox-wrap"}),f=x("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let p=null;i&&a!=="none"&&(p=x("label",{className:"lg-checkbox-label"},i),p.addEventListener("click",A)),p&&a==="left"?u.append(p,f):p&&a==="right"?u.append(f,p):u.append(f);let m=!!n,b=!!r;function y(){f.checked=m,f.disabled=b;}function g(R=false){b||(m=!m,y(),R||l?.(m));}function A(){b||g();}function M(R){b||(R.key===" "||R.key==="Enter")&&(R.preventDefault(),g());}f.addEventListener("click",A),f.addEventListener("keydown",M);function I(){return m}function L(R,P=false){m=!!R,y(),P||l?.(m);}function D(R){b=!!R,y();}function z(R){if(!R){p&&(p.remove(),p=null);return}p?p.textContent=R:(p=x("label",{className:"lg-checkbox-label"},R),p.addEventListener("click",A),u.append(p));}function O(){f.focus();}function T(){f.removeEventListener("click",A),f.removeEventListener("keydown",M),p&&p.removeEventListener("click",A);}return y(),{root:u,input:f,isChecked:I,setChecked:L,setDisabled:D,setLabel:z,focus:O,destroy:T}}let ii=0,qf="",Xf="";function vP(){return ii===0&&(qf=document.body.style.overflow,Xf=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),ii++,()=>{ii=Math.max(0,ii-1),ii===0&&(document.body.style.overflow=qf,document.body.style.touchAction=Xf);}}class yP{constructor(t){ve(this,"dragState",null);ve(this,"longPressState",null);ve(this,"options");ve(this,"onPointerMove");ve(this,"onPointerUp");ve(this,"onPointerCancel");ve(this,"onLongPressPointerMove");ve(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),ut.getAllTeams().findIndex(f=>f.id===r)===-1)return;const a=t.clientX,l=t.clientY,u=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:l,timeout:u,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const a=ut.getAllTeams().findIndex(b=>b.id===r);if(a===-1)return;const l=n.getBoundingClientRect(),u=o.getBoundingClientRect(),f=n.cloneNode(true);f.classList.add("team-list-item--placeholder"),f.classList.remove("team-list-item--dragging");const p=n.style.touchAction;n.style.touchAction="none";const m=vP();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:f,offsetY:t.clientY-l.top,fromIndex:a,teamId:r,captureTarget:n,touchActionPrev:p,releaseScrollLock:m},n.classList.add("team-list-item--dragging"),n.style.width=`${l.width}px`,n.style.height=`${l.height}px`,n.style.left=`${l.left-u.left}px`,n.style.top=`${l.top-u.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(f,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const i=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(o=Math.max(-8,Math.min(i+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,i=Array.from(n.children).filter(u=>u!==o&&u!==r&&u instanceof HTMLElement&&u.classList.contains("team-list-item")),a=new Map;i.forEach(u=>{a.set(u,u.getBoundingClientRect().top);});let l=false;for(const u of i){const f=u.getBoundingClientRect(),p=f.top+f.height/2;if(t<p){r.nextSibling!==u&&n.insertBefore(r,u),l=true;break}}l||n.appendChild(r),i.forEach(u=>{const f=a.get(u),p=u.getBoundingClientRect().top;if(f!==void 0&&f!==p){const m=f-p;u.style.transform=`translateY(${m}px)`,u.style.transition="none",u.offsetHeight,u.style.transition="transform 0.14s ease",u.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:i,fromIndex:a,touchActionPrev:l,releaseScrollLock:u,pointerId:f}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(f))try{o.releasePointerCapture(f);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const b=Array.from(n.children).filter(y=>y!==o&&y!==i&&y instanceof HTMLElement&&y.classList.contains("team-list-item"))[a]||null;b?n.insertBefore(i,b):n.appendChild(i);}else {const m=Array.from(n.children).filter(y=>y!==o),b=m.indexOf(i);if(b!==-1){const y=m[b];y!==i&&n.insertBefore(i,y);}}if(i.replaceWith(o),i.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=l??"",Array.from(n.children).filter(m=>m instanceof HTMLElement&&m.classList.contains("team-list-item")).forEach(m=>{m.style.transform="",m.style.transition="";}),u?.(),!r){const b=Array.from(n.children).filter(y=>y instanceof HTMLElement&&y.classList.contains("team-list-item")).indexOf(o);if(b!==-1&&b!==a){const g=ut.getAllTeams().slice(),[A]=g.splice(a,1);g.splice(b,0,A);const M=g.map(I=>I.id);ut.reorderTeams(M),this.options.onReorder(M);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class xP{constructor(t={}){ve(this,"card",null);ve(this,"modeControl",null);ve(this,"modeContainer",null);ve(this,"teamContent",null);ve(this,"listContainer",null);ve(this,"teamMode","overview");ve(this,"selectedTeamIds",new Set);ve(this,"teamCheckboxes",new Map);ve(this,"options");ve(this,"dragHandler");this.options=t,this.dragHandler=new yP({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!ut.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=x("div",{className:"team-card-wrapper"});this.modeContainer=x("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=x("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=ct({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=zo({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=x("div",{className:"team-card__disabled-state"}),n=x("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=vt({label:"Enable Feature",onClick:()=>{ut.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=ut.getAllTeams(),n=ut.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=x("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=gP({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:l=>{this.handleRenameTeam(r.id,l);},onSlotClick:this.teamMode==="manage"?l=>{this.handleRemovePet(r.id,l);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async l=>{if(!l.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await ut.activateTeam(r),this.options.onTeamsUpdated?.();}catch(f){console.error("[TeamCard] Failed to activate team:",f);}}}),a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(l,a,r.id):this.dragHandler.startLongPress(l,a,r.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=x("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=x("div",{className:"team-card__actions"}),r=vt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=x("div",{className:"team-card__actions"}),n=vt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=vt({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),o=vt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});o.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),t.appendChild(o),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=ut.getAllTeams(),i=new Set(o.map(a=>a.name));for(;i.has(n);)n=`${t} (${r})`,r++;try{ut.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)ut.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=ut.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){ut.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const r=ut.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=ut.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",ut.updateTeam(t,{petIds:o}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const r=ut.getTeam(t);if(!r)return;const i=Gt.myPets.get().all.map(y=>({id:y.id,itemType:"Pet",petSpecies:y.petSpecies,name:y.name??null,xp:y.xp,hunger:y.hunger,mutations:y.mutations||[],targetScale:y.targetScale,abilities:y.abilities||[]})),a=new Set(r.petIds.filter(y=>y!=="")),l=i.filter(y=>!a.has(y.id));await Qe.set("mySelectedItemIdAtom",null);const u=Rt.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const p=Gt.myInventory.subscribeSelection(y=>{if(y.current&&y.current.item){const g=y.current.item,A=[...r.petIds];A[n]=g.id,ut.updateTeam(t,{petIds:A}),this.options.onTeamsUpdated?.(),Qe.set("mySelectedItemIdAtom",null),fo.close().then(()=>{const M=Rt.detect();(M.platform==="mobile"||M.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await fo.show("inventory",{items:l,favoritedItemIds:[]}),await fo.waitForClose();const m=Rt.detect();(m.platform==="mobile"||m.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),p();}createCheckboxIndicator(t){const n=Cl({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}const wP=`
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
`;class CP{constructor(){ve(this,"card",null);ve(this,"listContainer",null);ve(this,"innerContent",null);ve(this,"logs",[]);ve(this,"filteredLogs",[]);ve(this,"unsubscribe",null);ve(this,"ITEM_HEIGHT",88);ve(this,"BUFFER_SIZE",3);ve(this,"VIEWPORT_HEIGHT",480);ve(this,"renderedRange",{start:0,end:0});ve(this,"scrollListener",null);ve(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=Xr(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const r=t.get().abilityLogs;this.updateFromAbilityLogs(r);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=Te.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},l=Wh(a),u=new Date(n.performedAt),f=u.toLocaleDateString("en-US",{month:"short",day:"numeric"}),p=u.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),m=`${f} ${p}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:l,formattedDate:m}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return ul({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=x("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=x("div",{style:"margin-bottom: 0;"}),r=Wi({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const i=o.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=x("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=x("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=ct({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=x("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}async handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let r=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),o=Math.min(this.filteredLogs.length,r+n+this.BUFFER_SIZE*2);if(r===this.renderedRange.start&&o===this.renderedRange.end)return;this.renderedRange={start:r,end:o},this.innerContent.replaceChildren();const i=r*this.ITEM_HEIGHT;if(i>0){const l=x("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(l);}for(let l=r;l<o;l++){const u=this.filteredLogs[l],f=await this.createLogItemCard(u);this.innerContent.appendChild(f);}const a=Math.max(0,(this.filteredLogs.length-o)*this.ITEM_HEIGHT);if(a>0){const l=x("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(l);}}async createLogItemCard(t){const n=x("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const r=x("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const p=await $e.toCanvas("pet",t.petSpecies);p&&(p.style.width="100%",p.style.height="100%",p.style.objectFit="contain",r.appendChild(p));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=x("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=x("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=x("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),l=x("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);i.appendChild(a),i.appendChild(l),o.appendChild(i);const u=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(u);const f=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(f),n.appendChild(o),n}}const bv=`
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

`,kP=`
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
`,vv=`
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
`,SP=`
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
`,AP=`
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
`;class EP extends mr{constructor(n){super({id:"tab-pets",label:"Pets"});ve(this,"unsubscribeMyPets");ve(this,"lastActiveTeamId",null);ve(this,"teamCardPart",null);ve(this,"abilityLogsCardPart",null);ve(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Cn(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>Pg);return {MGSprite:a}},void 0);await r.init();const o=n.getRootNode();tn(o,bv,"team-card-styles"),tn(o,kP,"base-pet-card-styles"),tn(o,vv,"badge-styles"),tn(o,SP,"arcade-button-styles"),tn(o,wP,"gemini-icon-button-styles"),tn(o,AP,"ability-logs-card-styles");const i=this.createGrid("12px");i.id="pets",n.appendChild(i),this.initializeTeamCardPart(i),this.initializeAbilityLogsCardPart(i),this.unsubscribeMyPets=Gt.myPets.subscribeStable(()=>{const a=ut.getActiveTeamId();a!==this.lastActiveTeamId&&(this.lastActiveTeamId=a,this.teamCardPart?.render());}),this.lastActiveTeamId=ut.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new xP({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new CP);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const _P=`
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
`,Qf={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function IP(){const e=await Hr("tab-alerts",{version:1,defaults:Qf,sanitize:o=>({ui:{expandedCards:ko(Qf.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:ko(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const TP={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},Cc={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},PP={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},MP={seed:"seed",tool:null,egg:null,decor:null},Jf={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function Bu(e,t,n){try{const r=PP[t],o=Te.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=MP[t],l=a?i[a]:i;return !l||typeof l!="object"?null:l[n]??null}catch(r){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,r),null}}function LP(e,t){return Bu(e,t,"spriteId")}function RP(e,t){const n=Bu(e,t,"rarity");return n?String(n).toLowerCase():null}function FP(e,t){return Bu(e,t,"name")??e}function OP(){const e=Wr.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function Zf(e){const t=OP(),n=[],r=["seed","tool","egg","decor"];for(const o of r){const i=e.byType[o];if(i)for(const a of i.items){const l=`${o}:${a.id}`;n.push({...a,shopType:o,rarity:RP(a.id,o),spriteId:LP(a.id,o),itemName:FP(a.id,o),isTracked:t.has(l),hasCustomSound:Fe.hasItemCustomSound("shop",a.id,o)});}}return n}const DP=`
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
`,NP={size:"md",closeOnBackdrop:true,closeOnEscape:true};function zu(e){const t={...NP,...e};let n=false,r=null,o=null,i=null,a=null,l=null;function u(){g(),t.onClose?.();}function f(O){t.closeOnBackdrop&&O.target===o&&u();}function p(O){t.closeOnEscape&&O.key==="Escape"&&u();}function m(){if(!i)return;const O=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),T=Array.from(i.querySelectorAll(O));if(T.length===0)return;const R=T[0],P=T[T.length-1];R.focus();const C=E=>{E.key==="Tab"&&(E.shiftKey?document.activeElement===R&&(E.preventDefault(),P.focus()):document.activeElement===P&&(E.preventDefault(),R.focus()));};i.addEventListener("keydown",C),a=()=>{i?.removeEventListener("keydown",C);};}function b(){r=x("div",{className:"modal-container"}),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-labelledby","modal-title");const O=x("style");O.textContent=DP,r.appendChild(O),o=x("div",{className:"modal-backdrop"}),o.addEventListener("click",f),r.appendChild(o),i=x("div",{className:`modal-dialog modal-dialog--${t.size}`});const T=x("div",{className:"modal-header"}),R=x("h2",{className:"modal-title",id:"modal-title"},t.title);if(t.subtitle){const E=x("div",{className:"modal-title-group"});E.appendChild(R),E.appendChild(x("p",{className:"modal-subtitle"},t.subtitle)),T.appendChild(E);}else T.appendChild(R);const P=x("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");P.addEventListener("click",u),T.appendChild(P),i.appendChild(T);const C=x("div",{className:"modal-body"});if(C.appendChild(t.content),i.appendChild(C),t.footer){const E=x("div",{className:"modal-footer"});E.appendChild(t.footer),i.appendChild(E);}return o.appendChild(i),r}function y(){if(!r)return;const O=r.getBoundingClientRect(),T=window.innerWidth,R=window.innerHeight;Math.abs(O.left)>1||Math.abs(O.top)>1||Math.abs(O.width-T)>1||Math.abs(O.height-R)>1?(r.style.left=`${-O.left}px`,r.style.top=`${-O.top}px`,r.style.width=`${T}px`,r.style.height=`${R}px`):(r.style.left="0px",r.style.top="0px",r.style.width="100%",r.style.height="100%");}function g(){!n||!r||(r.classList.remove("is-open"),n=false,a&&(a(),a=null),document.removeEventListener("keydown",p),l?.(),l=null,setTimeout(()=>{r?.remove();},200));}function A(){n&&g(),o?.removeEventListener("click",f),a&&(a(),a=null),document.removeEventListener("keydown",p),l?.(),l=null,r?.remove(),r=null,o=null,i=null;}const M=b();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(M),requestAnimationFrame(y);const z=()=>y();return window.addEventListener("resize",z),l=()=>{window.removeEventListener("resize",z);},requestAnimationFrame(()=>{r?.classList.add("is-open"),n=true,m(),document.addEventListener("keydown",p);}),{root:M,close:g,destroy:A}}function ju(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:i=n,label:a,showValue:l=true,disabled:u=false,onInput:f,onChange:p}=e,m=x("div",{className:"slider"}),b=x("div",{className:"slider-row"}),y=x("div",{className:"slider-track"}),g=x("div",{className:"slider-range"});y.appendChild(g);const A=x("input",{id:t,type:"range",min:String(n),max:String(r),step:String(o),value:String(i),disabled:u});A.addEventListener("input",R=>{I(),f?.(D(),R);}),A.addEventListener("change",R=>p?.(D(),R));function M(){const R=r-n;return R===0?0:(D()-n)/R}function I(){const R=Math.max(0,Math.min(1,M()));g.style.width=`${R*100}%`,T&&(T.textContent=String(D()));}function L(R){A.value=String(R),I();}function D(){return Number(A.value)}function z(R){A.disabled=!!R;}let O=null,T=null;return a&&(O=x("span",{className:"slider-label"},a),b.appendChild(O)),y.appendChild(A),b.appendChild(y),l&&(T=x("span",{className:"slider-value"},String(i)),b.appendChild(T)),m.append(b),I(),{root:m,input:A,setValue:L,getValue:D,setDisabled:z}}const eh=`
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
`,$P={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},th={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},BP=220;function zP(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function jP(e){const t=zP();if(t){tn(t,eh,"customSoundModal");return}const n=x("style");n.textContent=eh,e.appendChild(n);}function yv(e){const t={...$P,...e};let n=null,r=null,o=null,i=null,a=null,l=null,u=null,f=null,p=null,m=false,b=false,y=null;function g(){p?.(),p=null,f&&(f.pause(),f.currentTime=0),f=null,o?.setLabel("Play");}async function A(){if(f){g();return}if(!u)return;const j=Fe.getById(u.soundId);if(!j){console.error(`[CustomSoundModal] Sound not found: ${u.soundId}`);return}const V=new Audio(j.source);V.volume=u.volume/100,f=V;const U=()=>{g();},ce=()=>{g(),console.error(`[CustomSoundModal] Failed to play sound: ${j.name}`);};V.addEventListener("ended",U),V.addEventListener("error",ce),p=()=>{V.removeEventListener("ended",U),V.removeEventListener("error",ce);};try{await V.play(),o?.setLabel("Stop");}catch(Y){g(),console.error("[CustomSoundModal] Failed to play sound:",Y);}}function M(){l&&u&&(l.textContent=th[u.mode]);}function I(){m||y!==null||(y=window.setTimeout(()=>{z();},BP));}function L(){m||b||(b=true,g(),t.onClose?.(),I());}function D(){m||(n?.close(),L());}function z(){m||(m=true,b=true,y!==null&&(window.clearTimeout(y),y=null),g(),r&&(r.destroy(),r=null),a&&(a.destroy(),a=null),i=null,o=null,l=null,u=null,n&&(n.destroy(),n=null));}async function O(){const j=x("span",{className:"custom-sound-modal-title"});let V=false;if(e.spriteId)try{const ce=await $e.toCanvas(e.spriteId);if(ce){const Y=x("span",{className:"custom-sound-modal-title-icon"});ce.className="custom-sound-modal-title-sprite",Y.appendChild(ce),j.appendChild(Y),V=!0;}}catch{}if(!V&&e.icon){const ce=x("span",{className:"custom-sound-modal-title-icon"},e.icon);j.appendChild(ce);}const U=x("span",{className:"custom-sound-modal-title-text"},e.entityName);return j.appendChild(U),j}function T(){const j=x("div",{className:"custom-sound-modal-body"}),V=Fe.getItemCustomSound(e.entityType,e.entityId,e.shopType),U=Fe.getNotificationConfig(e.entityType);u=V?{soundId:V.soundId,volume:V.volume,mode:V.mode}:{soundId:U.soundId,volume:U.volume,mode:U.mode};const ce=Fe.getAll().map($=>({value:$.id,label:$.name})),Y=x("div",{className:"custom-sound-modal-row"}),ie=x("label",{className:"custom-sound-modal-label"},"Sound");Y.appendChild(ie);const se=x("div",{className:"custom-sound-modal-controls"});r=zr({value:u.soundId,options:ce,size:"sm",onChange:$=>{u&&(u.soundId=$),g();}}),se.appendChild(r.root),o=vt({label:"Play",variant:"default",size:"sm",onClick:()=>A()}),se.appendChild(o),Y.appendChild(se),j.appendChild(Y);const ae=x("div",{className:"custom-sound-modal-row"}),ne=x("label",{className:"custom-sound-modal-label"},"Volume");ae.appendChild(ne),i=ju({min:0,max:100,step:1,value:u.volume,showValue:true,onChange:$=>{u&&(u.volume=$),f&&(f.volume=$/100);}}),ae.appendChild(i.root),j.appendChild(ae);const q=x("div",{className:"custom-sound-modal-row"}),Z=x("label",{className:"custom-sound-modal-label"},"Mode");q.appendChild(Z);const F=x("div",{className:"custom-sound-modal-mode-controls"});return a=zr({value:u.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:$=>{u&&(u.mode=$),M();}}),F.appendChild(a.root),l=x("div",{className:"custom-sound-modal-mode-description"},th[u.mode]),F.appendChild(l),q.appendChild(F),j.appendChild(q),j}function R(){const j=x("div",{className:"custom-sound-modal-footer"}),V=vt({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),D();}});j.appendChild(V);const U=x("div",{style:"flex: 1"});j.appendChild(U);const ce=vt({label:"Cancel",variant:"default",size:"sm",onClick:()=>D()});j.appendChild(ce);const Y=vt({label:"Save",variant:"primary",size:"sm",onClick:()=>{u&&e.onSave({...u}),D();}});return j.appendChild(Y),j}const P=T(),C=R(),E=x("div");jP(E),E.appendChild(P),n=zu({title:e.entityName||t.title,content:E,footer:C,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:L}),n.root.classList.add("custom-sound-modal");const B=n.root.querySelector(".modal-title");return B&&O().then(j=>B.replaceChildren(j)),{root:n.root,close:D,destroy:z}}const GP=["seed","tool","egg","decor"],UP=new Set(GP);function kc(e){const[t,...n]=e.split(":");return !t||n.length===0||!UP.has(t)?null:{shopType:t,itemId:n.join(":")}}const WP=500,nh=10,HP=800;function VP(e){const{rows:t}=e,n=new Map;let r=null,o=false;const i=new Map;let a=null,l=null,u=null,f=null,p=null,m=false;function b(F,$){$?F.classList.add("has-custom-sound"):F.classList.remove("has-custom-sound");}function y(F){const $=kc(F);return $?Fe.hasItemCustomSound("shop",$.itemId,$.shopType):false}function g(F){if(!r)return null;const $=r.root.querySelectorAll(".lg-tr-body");for(const Q of $)if(Q.dataset.id===F)return Q;return null}function A(F,$){const Q=g(F);if(!Q)return;const re=$??y(F);b(Q,re);}function M(){if(!r)return;r.root.querySelectorAll(".lg-tr-body").forEach($=>{const Q=$.dataset.id;Q&&b($,y(Q));});}function I(){o||(o=true,requestAnimationFrame(()=>{o=false,M();}));}function L(F){i.clear();for(const $ of F)i.set(`${$.shopType}:${$.id}`,$);}function D(F){const $=kc(F);return $?Fe.hasItemCustomSound("shop",$.itemId,$.shopType):false}function z(F){const $=kc(F);if(!$||!Fe.hasItemCustomSound("shop",$.itemId,$.shopType))return;Fe.removeItemCustomSound("shop",$.itemId,$.shopType);const Q=i.get(F);Q&&(Q.hasCustomSound=false),A(F,false),I();}function O(){l!==null&&(window.clearTimeout(l),l=null),a=null;}function T(F){a=F,l!==null&&window.clearTimeout(l),l=window.setTimeout(()=>{l=null,a=null;},HP);}function R(){u!==null&&(window.clearTimeout(u),u=null),f=null,p=null,m=false;}if(r=qs({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(F,$)=>F.itemName.localeCompare($.itemName,void 0,{numeric:true,sensitivity:"base"}),render:F=>{const $=x("div",{className:"shop-item-cell"}),Q=x("div",{className:"shop-item-icon"});F.spriteId?$e.toCanvas(F.spriteId).then(le=>{le?(le.className="shop-item-sprite",Q.appendChild(le)):Q.textContent=Cc[F.shopType];}).catch(()=>{Q.textContent=Cc[F.shopType];}):Q.textContent=Cc[F.shopType];const re=x("div",{className:"shop-item-name"});return re.textContent=F.itemName,$.appendChild(Q),$.appendChild(re),$}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(F,$)=>{const Q=F.rarity?Jf[F.rarity.toLowerCase()]??999:999,re=$.rarity?Jf[$.rarity.toLowerCase()]??999:999;return Q-re},render:F=>{const $=x("div",{className:"shop-item-rarity"}),Q=ul({variant:"rarity",rarity:F.rarity});return $.appendChild(Q.root),$}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:F=>{const $=x("div",{className:"shop-item-notify"}),Q=Of(F.id,F.shopType),re=fr({checked:F.isTracked,disabled:Q,size:"sm",onChange:ye=>{F.isTracked=ye,ye?Wr.addTrackedItem(F.shopType,F.id):Wr.removeTrackedItem(F.shopType,F.id);}}),le=`${F.shopType}:${F.id}`;return n.set(le,re),$.appendChild(re.root),$}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:F=>`${F.shopType}:${F.id}`,onSortChange:()=>{I();},onRowClick:(F,$,Q)=>{const re=`${F.shopType}:${F.id}`;if(a){if(a===re){O();return}O();}Q.target.closest(".shop-item-notify")||yv({entityType:"shop",entityId:F.id,entityName:F.itemName,spriteId:F.spriteId,shopType:F.shopType,onSave:ye=>{ye===null?(Fe.removeItemCustomSound("shop",F.id,F.shopType),F.hasCustomSound=false,A(re,false)):(Fe.setItemCustomSound("shop",F.id,ye,F.shopType),F.hasCustomSound=true,A(re,true));}});}}),!r)throw new Error("[ShopsCard] Failed to create items table");L(t);const C=r.root,E=F=>{const $=F.target;if($.closest(".shop-item-notify"))return;const re=$.closest(".lg-tr-body")?.dataset.id;!re||!D(re)||(F.preventDefault(),F.stopPropagation(),T(re),z(re));},B=F=>{if(F.pointerType==="mouse"||F.button!==0)return;const $=F.target;if($.closest(".shop-item-notify"))return;const re=$.closest(".lg-tr-body")?.dataset.id;!re||!D(re)||(R(),f=re,p={x:F.clientX,y:F.clientY},u=window.setTimeout(()=>{u=null,f&&(m=true,T(f),z(f));},WP));},j=F=>{if(!p||!f||m)return;const $=F.clientX-p.x,Q=F.clientY-p.y;$*$+Q*Q>nh*nh&&R();},V=()=>{R();},U=()=>{R();};C.addEventListener("contextmenu",E),C.addEventListener("pointerdown",B),C.addEventListener("pointermove",j),C.addEventListener("pointerup",V),C.addEventListener("pointercancel",U);const ce=r.setData.bind(r);r.setData=F=>{L(F),ce(F),I();},I();const Y=F=>{for(const[$,Q]of n.entries()){const[re,le]=$.split(":");if(F&&re!==F)continue;const ye=Of(le,re);Q.setDisabled(ye);}},se=Qr().subscribeStable(()=>{Y();}),ae=qr(),ne=ae.subscribeDecorPlaced(()=>{Y("decor");}),q=ae.subscribeDecorRemoved(()=>{Y("decor");}),Z=r.destroy.bind(r);return r.destroy=()=>{se(),ne(),q(),C.removeEventListener("contextmenu",E),C.removeEventListener("pointerdown",B),C.removeEventListener("pointermove",j),C.removeEventListener("pointerup",V),C.removeEventListener("pointercancel",U),R(),O(),n.clear(),i.clear(),Z();},r}function KP(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function YP(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=x("div",{className:"select"});for(const p of Array.from(e.classList))p.startsWith("select--")&&o.classList.add(p);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=x("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",l=x("span",{className:"select-value"},t),u=x("span",{className:"select-caret"},a);i.append(l,u),o.appendChild(i),r.appendChild(o);const f=Math.ceil(i.getBoundingClientRect().width);return o.remove(),f}function qP(e,t){const n=KP(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=YP(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function XP(e){const t=No(),n=t.get();let r=null,o=[],i=[];const a={selectedShopType:"all",searchQuery:""},l={shopTypeSelect:null,searchInput:null,tableHandle:null};let u=0,f=new Set;function p(M,I){if(M.size!==I.size)return  false;for(const L of M)if(!I.has(L))return  false;return  true}function m(){if(!l.tableHandle)return;const M=o.filter(I=>!(a.selectedShopType!=="all"&&I.shopType!==a.selectedShopType||a.searchQuery&&!I.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));i=M,l.tableHandle.setData(M);}function b(){const M=x("div",{className:"shops-card-filters"}),L=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(z=>({value:z,label:TP[z]}))];l.shopTypeSelect=zr({value:"all",options:L,size:"sm",onChange:z=>{a.selectedShopType=z,m();}});const D=l.shopTypeSelect.root;return D.style.minWidth="0",D.style.width="auto",qP(D,L.map(z=>z.label)),l.searchInput=Wi({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:z=>{a.searchQuery=z.trim(),m();}}),M.appendChild(l.shopTypeSelect.root),M.appendChild(l.searchInput.root),M}function y(){o=Zf(n),i=[...o],u=o.length,f=new Set(o.map(O=>O.shopType));const M=x("div");l.tableHandle=VP({rows:i});const I=b();M.appendChild(I),M.appendChild(l.tableHandle.root);const L=x("div",{className:"shops-card-hint"}),D=x("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),z=x("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return L.append(D,z),M.appendChild(L),r=ct({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},M),r}function g(){const M=t.get(),I=Zf(M),L=I.length,D=new Set(I.map(O=>O.shopType));(L!==u||!p(D,f))&&(u=L,f=D,o=I,m());}function A(){if(l.tableHandle&&(l.tableHandle.destroy(),l.tableHandle=null),l.shopTypeSelect&&(l.shopTypeSelect.destroy(),l.shopTypeSelect=null),l.searchInput){const M=l.searchInput.root.__cleanup;M&&M(),l.searchInput=null;}r=null;}return {root:y(),refresh:g,destroy:A}}const QP=".mp3,.wav,.ogg,audio/*",JP=250*1024,ZP=3;function eM(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function tM(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function nM(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function xv(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function rM(e,t){const n=xv(t);if(!n.length)return  true;const r=e.name.toLowerCase(),o=e.type.toLowerCase();return n.some(i=>{const a=i.toLowerCase();if(a.startsWith("."))return r.endsWith(a);if(a.endsWith("/*")){const l=a.slice(0,-1);return o.startsWith(l)}return o===a})}function oM(e){const n=xv(e).map(r=>r.startsWith(".")?r.slice(1).toUpperCase():r.endsWith("/*")?"Audio":r.includes("/")&&r.split("/")[1]?.toUpperCase()||r.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function iM(e={}){const{id:t,className:n,label:r="Add sounds",hint:o,accept:i=QP,multiple:a=true,disabled:l=false,maxSizeBytes:u=JP,maxItems:f,emptyLabel:p="No sounds added yet",onItemsChange:m,onFilesAdded:b,onError:y}=e;let g=[],A=0,M=null,I=false,L=!!l,D=null,z=null,O=null;const T=new Map,R=new Map,P=Number.isFinite(f)?Math.max(1,Number(f)):a?Number.POSITIVE_INFINITY:1,C=x("div",{className:"sound-picker",id:t});n&&C.classList.add(...n.split(" ").filter(Boolean)),L&&C.classList.add("is-disabled");const E=x("div",{className:"sound-picker__header"}),B=x("div",{className:"sound-picker__label"},r),j=o??`${oM(i)} - Max ${nM(u)}`,V=x("div",{className:"sound-picker__hint"},j);E.append(B,V);const U=x("div",{className:"sound-picker__zone",role:"button",tabIndex:L?-1:0,"aria-disabled":String(L)}),ce=x("div",{className:"sound-picker__zone-text"}),Y=x("div",{className:"sound-picker__zone-title"},"Drop audio files here"),ie=x("div",{className:"sound-picker__zone-subtitle"},"or click to browse");ce.append(Y,ie);const se=vt({label:a?"Choose files":"Choose file",size:"sm",onClick:h=>{h.preventDefault(),L||ae.click();},disabled:L});se.classList.add("sound-picker__pick");const ae=x("input",{className:"sound-picker__input",type:"file",accept:i,multiple:a?true:void 0,disabled:L,tabIndex:-1});U.append(ce,se,ae);const ne=x("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),q=x("div",{className:"sound-picker__list",role:"list"});C.append(E,U,ne,q);function Z(h,S="info"){const G=h??"";ne.textContent=G,ne.classList.toggle("is-error",S==="error");}function F(h){y?.(h),Z(h.message,"error");}function $(){for(const h of T.values())try{h.destroy();}catch{}T.clear();}function Q(h){const S=R.get(h.id);if(S)return S;const G=h.file.__sourceUrl;if(G)return R.set(h.id,G),G;const W=URL.createObjectURL(h.file);return R.set(h.id,W),W}function re(h){const S=R.get(h);S&&(S.startsWith("blob:")&&URL.revokeObjectURL(S),R.delete(h));}function le(){O?.(),O=null,D&&(D.pause(),D.currentTime=0),D=null,z=null;}function ye(){q.querySelectorAll(".sound-picker__item").forEach(S=>{const G=S.dataset.id,W=S.querySelector(".sound-picker__item-btn--play");if(!G||!W)return;const J=!!D&&z===G&&!D.paused;W.textContent=J?"Stop":"Play",S.classList.toggle("is-playing",J);});}function _e(h){if(L)return;if(z===h.id){le(),ye();return}le();const S=Q(h),G=new Audio(S);D=G,z=h.id;const W=()=>{z===h.id&&(le(),ye());},J=()=>{z===h.id&&(le(),ye(),F({code:"type",file:h.file,message:`Unable to play ${h.name}`}));};G.addEventListener("ended",W),G.addEventListener("error",J),O=()=>{G.removeEventListener("ended",W),G.removeEventListener("error",J);},G.play().then(()=>{ye();}).catch(()=>{le(),ye(),F({code:"type",file:h.file,message:`Unable to play ${h.name}`});});}function Be(){if($(),q.classList.toggle("is-scrollable",g.length>ZP),!g.length){const S=x("div",{className:"sound-picker__empty"});S.append(typeof p=="string"?document.createTextNode(p):p),q.replaceChildren(S);return}const h=g.map(S=>xt(S));if(q.replaceChildren(...h),M){const S=T.get(M);S&&requestAnimationFrame(()=>S.focus());}ye();}function xt(h){const S=M===h.id,G=x("div",{className:"sound-picker__item",role:"listitem","data-id":h.id}),W=x("div",{className:"sound-picker__item-top"});x("div",{className:"sound-picker__item-bottom"});const J=x("div",{className:"sound-picker__item-name"});if(S&&!L){const xe=Ys({value:h.name,blockGameKeys:true,onEnter:ge=>{Mt(h.id,ge);}});xe.root.classList.add("sound-picker__rename"),xe.input.classList.add("input--sm"),xe.input.setAttribute("aria-label","Rename sound"),xe.input.addEventListener("keydown",ge=>{ge.key==="Escape"&&(ge.preventDefault(),Ht());}),xe.input.addEventListener("blur",()=>{if(I){I=false;return}Mt(h.id,xe.getValue());}),T.set(h.id,xe),J.appendChild(xe.root);}else {const xe=x("div",{className:"sound-picker__item-label",title:h.name},h.name);J.appendChild(xe);}const de=x("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(S&&!L){const xe=x("button",{className:"sound-picker__item-btn",type:"button",disabled:L},"Save");xe.addEventListener("click",()=>{const we=T.get(h.id);Mt(h.id,we?.getValue()??h.name);});const ge=x("button",{className:"sound-picker__item-btn",type:"button",disabled:L},"Cancel");ge.addEventListener("pointerdown",()=>{I=true;}),ge.addEventListener("click",()=>Ht()),de.append(xe,ge);}else {const xe=x("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:L},z===h.id?"Stop":"Play");xe.addEventListener("click",()=>_e(h));const ge=x("button",{className:"sound-picker__item-btn",type:"button",disabled:L},"Rename");ge.addEventListener("click",()=>{L||(M=h.id,Be());});const we=x("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:L},"Remove");we.addEventListener("click",()=>tt(h.id)),de.append(xe,ge,we);}return W.append(J,de),G.append(W),G}function Bt(){return g.slice()}function dt(h){const S=h.slice(),G=new Set(S.map(W=>W.id));for(const W of Array.from(R.keys()))G.has(W)||re(W);z&&!G.has(z)&&le(),g=S,M=null,Be(),m?.(Bt());}function Et(h){if(L)return;const S=Array.from(h??[]);if(!S.length)return;const G=[],W=[];for(const we of S){if(i&&!rM(we,i)){W.push({code:"type",file:we,message:`Unsupported file type: ${we.name}`});continue}if(Number.isFinite(u)&&we.size>u){W.push({code:"size",file:we,maxSizeBytes:u,message:`File too large: ${we.name}`});continue}G.push({id:eM(),file:we,name:tM(we),size:we.size,type:we.type});}if(!G.length){W.length&&F(W[0]);return}const J=a?g.slice():[],de=Number.isFinite(P)?Math.max(0,P-J.length):G.length;if(de<=0){F({code:"limit",message:`Maximum of ${Math.max(1,P)} files reached`});return}const xe=G.slice(0,de),ge=a?J.concat(xe):xe.slice(0,1);dt(ge),Z(null),b?.(xe.slice()),W.length&&F(W[0]);}function Wt(h,S){const G=S.trim();if(!G){F({code:"name",message:"Name cannot be empty"});return}const W=g.map(J=>J.id===h?{...J,name:G}:J);dt(W),Z(null);}function Mt(h,S){const G=S.trim();if(!G){F({code:"name",message:"Name cannot be empty"});return}Wt(h,G);}function Ht(){M=null,Z(null),Be();}function tt(h){const S=g.filter(G=>G.id!==h);dt(S),Z(null);}function De(){le(),dt([]),Z(null);}function mn(h){L=!!h,C.classList.toggle("is-disabled",L),U.setAttribute("aria-disabled",String(L)),U.tabIndex=L?-1:0,ae.disabled=L,se.setDisabled(L),L&&le(),Be();}function gn(){L||ae.click();}const pt=h=>{if(L)return;const S=h.target;S&&S.closest(".sound-picker__pick")||ae.click();},kt=h=>{L||(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),ae.click());},Vt=h=>{L||!h.dataTransfer||!h.dataTransfer.types.includes("Files")||(h.preventDefault(),A+=1,U.classList.add("is-dragover"));},En=h=>{L||!h.dataTransfer||!h.dataTransfer.types.includes("Files")||(h.preventDefault(),h.dataTransfer.dropEffect="copy");},nn=h=>{L||U.classList.contains("is-dragover")&&(h.preventDefault(),A=Math.max(0,A-1),A<=0&&(A=0,U.classList.remove("is-dragover")));},k=h=>{L||!h.dataTransfer||!h.dataTransfer.files.length||(h.preventDefault(),A=0,U.classList.remove("is-dragover"),Et(h.dataTransfer.files));},d=()=>{if(L){ae.value="";return}ae.files&&Et(ae.files),ae.value="";};return U.addEventListener("click",pt),U.addEventListener("keydown",kt),U.addEventListener("dragenter",Vt),U.addEventListener("dragover",En),U.addEventListener("dragleave",nn),U.addEventListener("drop",k),ae.addEventListener("change",d),Be(),{root:C,getItems:Bt,setItems:dt,addFiles:Et,renameItem:Wt,removeItem:tt,clear:De,setDisabled:mn,openPicker:gn,setStatus:Z,destroy(){$(),le();for(const h of Array.from(R.keys()))re(h);U.removeEventListener("click",pt),U.removeEventListener("keydown",kt),U.removeEventListener("dragenter",Vt),U.removeEventListener("dragover",En),U.removeEventListener("dragleave",nn),U.removeEventListener("drop",k),ae.removeEventListener("change",d),C.remove();}}}const rh={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function aM(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function sM(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=x("div",{className:"select"});for(const p of Array.from(e.classList))p.startsWith("select--")&&o.classList.add(p);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=x("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",l=x("span",{className:"select-value"},t),u=x("span",{className:"select-caret"},a);i.append(l,u),o.appendChild(i),r.appendChild(o);const f=Math.ceil(i.getBoundingClientRect().width);return o.remove(),f}function lM(e,t){const n=aM(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=sM(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function cM(e){let t=null,n=null,r=null;const o=new Map,i=new Map,a=new Map;let l=null,u=null,f=null;function p(){f?.(),f=null,l&&(l.pause(),l.currentTime=0),l=null,u=null;}function m(){if(!r)return;r.querySelectorAll(".notification-item").forEach(T=>{const R=T.dataset.type,P=T.querySelector(".notification-item-play");if(!R||!P)return;const C=!!l&&u===R&&!l.paused;P.textContent=C?"Stop":"Play",T.classList.toggle("is-playing",C);});}async function b(O){if(u===O){p(),m();return}p();const T=Fe.getNotificationConfig(O),R=Fe.getById(T.soundId);if(!R){console.error(`[SettingCard] Sound not found: ${T.soundId}`);return}const P=new Audio(R.source);P.volume=T.volume/100,l=P,u=O;const C=()=>{u===O&&(p(),m());},E=()=>{u===O&&(p(),m(),console.error(`[SettingCard] Failed to play sound: ${R.name}`));};P.addEventListener("ended",C),P.addEventListener("error",E),f=()=>{P.removeEventListener("ended",C),P.removeEventListener("error",E);};try{await P.play(),m();}catch(B){p(),m(),console.error("[SettingCard] Failed to play sound:",B);}}function y(O,T){if(O.startsWith("data:"))try{const R=O.split(","),P=R[0].match(/:(.*?);/)?.[1]||"audio/mpeg",C=atob(R[1]),E=C.length,B=new Uint8Array(E);for(let j=0;j<E;j++)B[j]=C.charCodeAt(j);return new File([B],T,{type:P})}catch(R){return console.error("[SettingCard] Failed to convert data URL to File:",R),new File([],T,{type:"audio/mpeg"})}return new File([],T,{type:"audio/mpeg"})}function g(){const T=Fe.getAll().map(R=>({value:R.id,label:R.name}));for(const[R,P]of o){const C=Fe.getNotificationConfig(R);P.setOptions(T),P.setValue(C.soundId);}}function A(O,T,R){const P=x("div",{className:"notification-item","data-type":O}),C=x("div",{className:"notification-item-label"},T);P.appendChild(C);const E=x("div",{className:"notification-item-description"},R);P.appendChild(E);const B=x("div",{className:"notification-item-controls"}),j=Fe.getNotificationConfig(O),U=Fe.getAll().map(Z=>({value:Z.id,label:Z.name})),ce=zr({value:j.soundId,options:U,size:"sm",onChange:Z=>{const F=Fe.getNotificationConfig(O);Fe.setNotificationConfig(O,{soundId:Z,volume:F.volume,mode:F.mode});}});o.set(O,ce);const Y=x("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");Y.addEventListener("click",()=>{b(O);}),B.appendChild(ce.root),B.appendChild(Y),P.appendChild(B);const ie=ju({min:0,max:100,step:1,value:j.volume,showValue:true,onChange:Z=>{const F=Fe.getNotificationConfig(O);Fe.setNotificationConfig(O,{soundId:F.soundId,volume:Z,mode:F.mode});}});a.set(O,ie),P.appendChild(ie.root);const se=x("div",{className:"notification-mode-row"}),ae=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],ne=zr({value:j.mode,options:ae,size:"sm",onChange:Z=>{const F=Fe.getNotificationConfig(O);Fe.setNotificationConfig(O,{soundId:F.soundId,volume:F.volume,mode:Z}),M(O);}});i.set(O,ne),ne.root.classList.add("shrink"),lM(ne.root,ae.map(Z=>Z.label)),se.appendChild(ne.root);const q=x("div",{className:"notification-mode-description"},rh[O][j.mode]);return se.appendChild(q),P.appendChild(se),P}function M(O){if(!r)return;const T=r.querySelector(`[data-type="${O}"]`);if(!T)return;const R=Fe.getNotificationConfig(O),P=T.querySelector(".notification-mode-description");P&&(P.textContent=rh[O][R.mode]);}function I(){const O=x("div",{className:"alerts-settings-body"});Fe.init(),r=x("div",{className:"notification-settings"}),r.appendChild(A("shop","Shops restock","Default sound for shop restock alerts")),r.appendChild(A("pet","Pet events","Default sound for pet event alerts")),r.appendChild(A("weather","Weather events","Default sound for weather event alerts")),O.appendChild(r);const T=x("div",{className:"alerts-settings-divider"});O.appendChild(T);const R=Fe.getAll().map(P=>{const C=y(P.source,P.name);return C.__sourceUrl=P.source,{id:P.id,file:C,name:P.name,size:0,type:P.type}});return n=iM({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:_o.MAX_SOUNDS,maxSizeBytes:_o.MAX_SIZE_BYTES,multiple:true,onItemsChange:P=>{L(P),g();},onFilesAdded:P=>{D(P),setTimeout(()=>{g();},100);}}),n.setItems(R),O.appendChild(n.root),t=ct({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},O),t}function L(O){const T=new Set(Fe.getAll().map(C=>C.id)),R=new Set(O.map(C=>C.id)),P=[];for(const C of T)if(!R.has(C)){P.push(C);try{Fe.remove(C);}catch(E){console.error(`[SettingCard] Failed to remove sound ${C}:`,E);}}if(P.length>0){const C=["shop","pet","weather"];for(const E of C){const B=Fe.getNotificationConfig(E);if(P.includes(B.soundId)){Fe.setNotificationConfig(E,{soundId:"default-notification",volume:B.volume,mode:B.mode});const j=a.get(E);j&&j.setValue(B.volume);}}}for(const C of O)if(T.has(C.id)){const E=Fe.getById(C.id);if(E&&E.name!==C.name)try{Fe.update(C.id,{name:C.name});}catch(B){console.error(`[SettingCard] Failed to rename sound ${C.id}:`,B);}}}function D(O){for(const T of O)if(!Fe.getById(T.id)){const R=new FileReader;R.onload=P=>{const C=P.target?.result;try{const E=Fe.add(T.name,C,"upload");if(n&&E.id!==T.id){const B=n.getItems().map(j=>j.id===T.id?{...j,id:E.id}:j);n.setItems(B);}}catch(E){console.error(`[SettingCard] Failed to add sound ${T.name}:`,E);}},R.onerror=()=>{console.error(`[SettingCard] Failed to read file ${T.name}`);},R.readAsDataURL(T.file);}}function z(){p(),n&&(n.destroy(),n=null);for(const O of o.values())O.destroy();o.clear();for(const O of i.values())O.destroy();i.clear(),a.clear(),t=null;}return {root:I(),destroy:z}}function dM(e){try{const t=Te.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function uM(e){try{const t=Te.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function pM(e){try{const t=Te.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const r=n.mutator;if(!r||typeof r!="object")return "No effects";const o=r.mutation;if(!o)return "No effects";const i=Te.get("mutations");if(!i||typeof i!="object")return o;const a=i[o];return !a||typeof a!="object"?o:a.name||o}catch{return "No effects"}}function oh(){const e=Te.get("weather");if(!e||typeof e!="object")return [];const t=Po.getTrackedWeathers(),n=new Set(t),r=[];for(const o of Object.keys(e)){if(o==="Sunny")continue;const i={weatherId:o,weatherName:dM(o),spriteId:uM(o),effects:pM(o),isTracked:n.has(o),hasCustomSound:Fe.hasItemCustomSound("weather",o)};r.push(i);}return r.sort((o,i)=>o.weatherName.localeCompare(i.weatherName)),r}const fM=500,ih=10,hM=800;function mM(e){const{rows:t}=e;let n=null,r=false;const o=new Map;let i=null,a=null,l=null,u=null,f=null,p=false;function m(Y,ie){ie?Y.classList.add("has-custom-sound"):Y.classList.remove("has-custom-sound");}function b(Y){return Fe.hasItemCustomSound("weather",Y)}function y(Y){if(!n)return null;const ie=n.root.querySelectorAll(".lg-tr-body");for(const se of ie)if(se.dataset.id===Y)return se;return null}function g(Y,ie){const se=y(Y);if(!se)return;const ae=ie??b(Y);m(se,ae);}function A(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(ie=>{const se=ie.dataset.id;se&&m(ie,b(se));});}function M(){r||(r=true,requestAnimationFrame(()=>{r=false,A();}));}function I(Y){o.clear();for(const ie of Y)o.set(ie.weatherId,ie);}function L(Y){return Fe.hasItemCustomSound("weather",Y)}function D(Y){if(!Fe.hasItemCustomSound("weather",Y))return;Fe.removeItemCustomSound("weather",Y);const ie=o.get(Y);ie&&(ie.hasCustomSound=false),g(Y,false),M();}function z(){a!==null&&(window.clearTimeout(a),a=null),i=null;}function O(Y){i=Y,a!==null&&window.clearTimeout(a),a=window.setTimeout(()=>{a=null,i=null;},hM);}function T(){l!==null&&(window.clearTimeout(l),l=null),u=null,f=null,p=false;}if(n=qs({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(Y,ie)=>Y.weatherName.localeCompare(ie.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:Y=>{const ie=x("div",{className:"weather-item-cell"}),se=x("div",{className:"weather-item-icon"});Y.spriteId&&$e.has(Y.spriteId)?$e.toCanvas(Y.spriteId).then(ne=>{ne.className="weather-item-sprite",se.appendChild(ne);}).catch(()=>{se.textContent=ah(Y.weatherId);}):se.textContent=ah(Y.weatherId);const ae=x("div",{className:"weather-item-name"});return ae.textContent=Y.weatherName,ie.appendChild(se),ie.appendChild(ae),ie}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:Y=>{const ie=x("div",{className:"weather-item-effects"});return ie.textContent=Y.effects,ie}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:Y=>{const ie=x("div",{className:"weather-item-notify"}),se=fr({checked:Y.isTracked,disabled:false,size:"sm",onChange:ae=>{Y.isTracked=ae,ae?Po.addTrackedWeather(Y.weatherId):Po.removeTrackedWeather(Y.weatherId);}});return ie.appendChild(se.root),ie}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:Y=>Y.weatherId,onSortChange:()=>{M();},onRowClick:(Y,ie,se)=>{const ae=Y.weatherId;if(i){if(i===ae){z();return}z();}se.target.closest(".weather-item-notify")||yv({entityType:"weather",entityId:Y.weatherId,entityName:Y.weatherName,spriteId:Y.spriteId,onSave:q=>{q===null?(Fe.removeItemCustomSound("weather",Y.weatherId),Y.hasCustomSound=false,g(ae,false)):(Fe.setItemCustomSound("weather",Y.weatherId,q),Y.hasCustomSound=true,g(ae,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");I(t);const P=n.root,C=Y=>{const ie=Y.target;if(ie.closest(".weather-item-notify"))return;const ae=ie.closest(".lg-tr-body")?.dataset.id;!ae||!L(ae)||(Y.preventDefault(),Y.stopPropagation(),O(ae),D(ae));},E=Y=>{if(Y.pointerType==="mouse"||Y.button!==0)return;const ie=Y.target;if(ie.closest(".weather-item-notify"))return;const ae=ie.closest(".lg-tr-body")?.dataset.id;!ae||!L(ae)||(T(),u=ae,f={x:Y.clientX,y:Y.clientY},l=window.setTimeout(()=>{l=null,u&&(p=true,O(u),D(u));},fM));},B=Y=>{if(!f||!u||p)return;const ie=Y.clientX-f.x,se=Y.clientY-f.y;ie*ie+se*se>ih*ih&&T();},j=()=>{T();},V=()=>{T();};P.addEventListener("contextmenu",C),P.addEventListener("pointerdown",E),P.addEventListener("pointermove",B),P.addEventListener("pointerup",j),P.addEventListener("pointercancel",V);const U=n.setData.bind(n);n.setData=Y=>{I(Y),U(Y),M();},M();const ce=n.destroy.bind(n);return n.destroy=()=>{P.removeEventListener("contextmenu",C),P.removeEventListener("pointerdown",E),P.removeEventListener("pointermove",B),P.removeEventListener("pointerup",j),P.removeEventListener("pointercancel",V),T(),z(),o.clear(),ce();},n}function ah(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function gM(e){let t=null,n=[];const r={tableHandle:null};let o=0;function i(){n=oh(),o=n.length;const u=x("div");r.tableHandle=mM({rows:n}),u.appendChild(r.tableHandle.root);const f=x("div",{className:"weather-card-hint"}),p=x("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),m=x("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return f.append(p,m),u.appendChild(f),t=ct({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},u),t}function a(){const u=oh(),f=u.length;f!==o&&(o=f,n=u,r.tableHandle?.setData(u));}function l(){r.tableHandle&&(r.tableHandle.destroy(),r.tableHandle=null),t=null;}return {root:i(),refresh:a,destroy:l}}function bM(e){let t=null,n=null;function r(){const i=x("div",{className:"pet-card-body"}),a=x("div",{className:"pet-card-row"}),l=_d({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=fr({checked:Ui.isEnabled(),onChange:u=>{Ui.setEnabled(u);}}),a.appendChild(l.root),a.appendChild(n.root),i.appendChild(a),t=ct({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},i),t}function o(){n&&(n.destroy(),n=null),t=null;}return {root:r(),destroy:o}}class vM extends mr{constructor(){super({id:"tab-alerts",label:"Alerts"});ve(this,"sectionElement",null);ve(this,"state",null);ve(this,"settingCard",null);ve(this,"shopsCard",null);ve(this,"weatherCard",null);ve(this,"petCard",null);}async build(n){this.state=await IP();const r=n.getRootNode();tn(r,_P,"alerts-styles");const o=this.createGrid("12px");o.id="alerts-section",this.sectionElement=o;const{MGData:i}=await Cn(async()=>{const{MGData:f}=await Promise.resolve().then(()=>Pg);return {MGData:f}},void 0),a=["plants","items","eggs","decor","weather","mutations"],l=await Promise.allSettled(a.map(f=>i.waitFor(f))),u=a.filter((f,p)=>l[p]?.status==="rejected");u.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",u.join(", ")),this.buildParts(),n.appendChild(o);}render(n){const r=this.shopsCard,o=this.weatherCard,i=this.petCard,a=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=r,this.weatherCard=o,this.petCard=i,this.settingCard=a;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=XP({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:r=>this.state.setCardExpanded("shops",r)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=bM({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:r=>this.state.setCardExpanded("pet",r)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=gM({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:r=>this.state.setCardExpanded("weather",r)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=cM({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:r=>this.state.setCardExpanded("settings",r)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const yM={Store:{select:Qe.select.bind(Qe),set:Qe.set.bind(Qe),subscribe:Qe.subscribe.bind(Qe),subscribeImmediate:Qe.subscribeImmediate.bind(Qe)},Globals:Gt,Modules:{Version:Rd,Assets:Fo,Manifest:So,Data:Te,Environment:Rt,CustomModal:fo,Sprite:$e,Tile:tr,Pixi:Zs,RiveLoader:Eo,Audio:Ct,Cosmetic:du,Calculators:wg,ShopActions:Lr},Features:{AutoFavorite:Dg,Achievements:QE,Tracker:dP,AntiAfk:bo,Pets:uP,PetTeam:ut,XPTracker:sd,CropValueIndicator:ls,CropSizeIndicator:us,ShopNotifier:Wr,WeatherNotifier:Po,PetHungerNotifier:Ui,AriesAPI:$s,HarvestLocker:zt,EggLocker:cr,DecorLocker:dr},WebSocket:{chat:i1,emote:a1,wish:s1,kickPlayer:l1,setPlayerData:il,usurpHost:c1,reportSpeakingStart:d1,setSelectedGame:u1,voteForGame:p1,restartGame:f1,ping:h1,checkWeatherStatus:b1,move:m1,playerPosition:eg,teleport:g1,moveInventoryItem:v1,dropObject:y1,pickupObject:x1,toggleLockItem:tg,toggleFavoriteItem:ng,setSelectedItem:w1,putItemInStorage:ru,retrieveItemFromStorage:ou,moveStorageItem:C1,logItems:k1,plantSeed:S1,waterPlant:A1,harvestCrop:E1,sellAllCrops:_1,purchaseDecor:iu,purchaseEgg:au,purchaseTool:su,purchaseSeed:lu,growEgg:rg,plantEgg:I1,hatchEgg:T1,plantGardenPlant:P1,potPlant:M1,mutationPotion:L1,cropCleanser:R1,pickupDecor:F1,placeDecor:O1,removeGardenObject:D1,placePet:og,feedPet:N1,petPositions:$1,swapPet:ig,swapPetFromStorage:B1,pickupPet:ag,movePetSlot:z1,namePet:j1,sellPet:G1,throwSnowball:U1,checkFriendBonus:W1},_internal:{getGlobals:Xn,initGlobals:Ig,destroyGlobals:EE}};function xM(){const e=fe;e.Gemini=yM,e.MGSprite=$e,e.MGData=Te,e.MGPixi=Zs,e.MGRiveLoader=Eo,e.MGAssets=Fo,e.MGEnvironment=Rt;}const wM=`
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
`,CM="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA2CAYAAACY0PQ8AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKnSURBVHgB7ZuPddMwEMY/9zFAmAAxAWUCzASwAWGDbsDrBs0EJBMAE9SdAHeCqBOQDcQdkuu8Ngk6ubbPcn7v3VP0LCe5zyfJ+ldgBJxzC0oWh64VRWExMAVeiOCYIbsM6Rt4Rw1ahw1k7ILZkOf0IaRsNYm2Q0eSRSCn2dmS7ANax8eARajJ7sgqEqVC35DzhuzW6WVLZiQ+iSOBfwTjPfVYLEXE29jCFxBAApTQLwDD0XoZW1gkAnz9mwqL2IKi6uB8D/AH0+B1bM8hioTwpRb6sZKuU1odmDvo515SOEWEGvqpJIVTRLDQTyUpnPKeYCjZQjHUHoj8EkdCGOBo7iorCEmpDoxmEUSNIpMqgubGUfzfUkV4gF4shKSKYKGXwSLBQidJkyy5iZDUYOfWO4h7BiZJhDEmQyOxSCA1EpJ/sGcsEugigkYGbRMYC30MLoJGziKkNti5RUISZxGQmQhhNlxMbpEwuAgGmXCOBOLVfiasNZYha+GXuu2Rew30cVKEMElchiwPu+unBb4dWer+TbZ8UnbhdLI84HjpvG/bA+WvuEyxp9D/ptEt2ZpsE/Iap92/0tNdO99LLMk+oX3yx3jfiPA93BSDDVZCHxze/OpcCu5ZNSLwSnNSo5IBu8JNa7m9F7iLnGsEPMIiTGn3SS9chCnqKSy390XdvDH+wnzZNL0Dtwvc78+tfbBkH/9FQqgS15gf1zwseBxAUeaGkhXmw4rfLvnDsx0dVDX4whfkzYYEWDaZZ0PpcDHniFjtC3ASHmHx67TLB/blClKc39G+dtPnhxPufM9JjFvnJ4pOIt3bbCj5DN9wRu8iH5gKftftTeyGjS4nXwz8uJ0nLsY++VLBO/4zZRXqJc9AGbRnoN6Fz411Zf8sFNs92jNQFh35C3Y0hc/7VYYmAAAAAElFTkSuQmCC",kM="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA/CAYAAACxdtubAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKfSURBVHgB7ZuPdZswEMY//DqAuwGdwM4EJRPUG9TdoCM0G7QT1NkgmSB0gngDkwnKBvQ+W+LJBJCUxnnoyO89/hgL0McdJ50sZxigaZpcNgekRy3LpyzLavfgYuSEr0iTpSzb7sFsqLRYlNbMkSZ7seiVe6DXoiJyi3RFkrVoKNwDQ66bqtu6bNwPz1w34SDU5Swo9Vl0Cx0wKLVW7ROqwW0tn+3OmeuK265l8wg91OK6H7nTtWgBXSxt9O0K/QJ9HN/TVqgo58tbQB8rrlyLrqETdh6WrtANdEJPzV2hK+ilmIPrktVRqGk/l9DL2lpUs0jSBiPNbkvaYJRDOVao5oh7ZIGZMDvX1R51T/motKMNlDO7d1Q9sxNaQTnvFtWGFfoE5Vihe+hmPxehT3MRWh6Fml+cSuildJuXP9BJJYbcu0JL6KTkqhUqqkvoFHvP1aLvoCLotnfc6Qrd4fSTuBZKu3Mm1ETfX9DDjd3pm6zBYRVO1kh9eOVeDDc8h0GRVb+7H4bStJ9IO6PZicEq98DYFLlCNg9ID3rkVVfoYOJt2tUUXfimK5JkvrPEsrRqgTSgy37r+yJEKKMv5x7lmDYVTi7b2w/wjhmZE68x/eB0OySSBA2OGZ+fenYzmlPHjAJOPTmvxr70vqOWqc8TFK8b1RJsUSavmG6Hv/QViB3Anmoa561XrNAdpsmdr0CUUNNbqhBHFViuNmVjg17Z1xPq8gHxMMf7HVi2kuWaFTEdjxzP0z+WsU2YndP/iPA08RaXgt3CJowfeAE8L/D6l20F+NRl+eupxIv/aUHrU4Tn+rx/jksjN9k0w2IP/1sJ8zAPI0K3eCsGKvPwWk/aXH/XY8noucXBPSNPhdhrymFGxfHKmAfHpTb3iO64/AONOretDlUMVwAAAABJRU5ErkJggg==",SM="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA8CAYAAAA5S9daAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKgSURBVHgB7ZvvdYIwEMBPXr/XTtBs0I5gJ+kI7QbtCI7QTXSD4gTiBLJBmoMEA1wC+CSpF37vReEAIZfL/ckTAA9Syg/VzvL+Oar25ernyqMAob6OwIun1WpVdoWZ54I18ENQQp8SSuAH2adFCeDxCQh6FGCE8gdkf7OB6zhZg7MvixJgWAlJsPgE8FiC6v8rMEMngD1SS5bIgc2mXnDnCEqYTb3gzhGU0KeEZ+CHoISpWcILJUxNCaSzJ5WgQskaeEaHNRUmXZbAMTIYeoObjT2REb0BTtESRFfgUsIL8KUX+pfpAItjrOiVljo8noE3raV3yhIE8EfYO4sSYFFCRapKaKUA2dAJTHmydyglcM4RDK2BpkIkqxVmF/bKc8sSOK4wu7BL6u50SGEqGJoBz1wHEqAZ8K4SBKSD0xI4rjC7eDQb/8ES3nQLTWMJrRCpPCZWj6Gdo0lcQleupYqS1b0bS4i0wpxjSavL2gLC0qw829MhRmQ4Wds5hKca9KwrCIzd8QOEpxr42JaQO7ZDIfDDVkKM6rGwtmMooUoJYk4HdIhNx9V2AeH/KBZ9OlAjX0BYojvGw0jZnAj8qJQQqYQuCFlwv4C5grGE2OHRJ5ubV6OE2OHRJ5ubdSxLyKmXLyKlz40lhM4RTp5joa3hMZoleI75FDQH0XxCfuWxOWiiwx7CUniO7SEsF6WreLlRbSfnZ3DxRIZ5DXGn2sb1AEK1b1m/SzjLzUco4VfOw1HWfRvvA2WtkE9Za+1Wo7Mdcd8feRvwmXey7oNw3e/B9zC6stvqZtLrDdQ5N4ZV3J8aWYoR5+A8fYdpmBwDr8UaZG9XqT4eYAL6R1s/LGvTQmUI3XD/WX93Gz7ofvhOrXuUcCmxC2v/BJdOl3rAruIPOjGfbeyq8HcAAAAASUVORK5CYII=",AM="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABACAYAAACNx/A2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEh0lEQVR42u3cX2iVdRzH8bPV2tIJGhYzU4iCpJssUsLQpASVyqALLS0M0lC7qFTIBL0ISugmmERFKlZKClLeLIqlTU2kWOKfUmeaEzd109zcdua2s3NeQZybDu6fZ+fsOTvPG763Pz7PGx5+z++c7+8bmf32c5FsFgowGjOwAhuwDVWowWW0Ig7oRgsu4k9UYhPW4zU8ijuT62e9siVtBKZhNb5CFY7gLC7iGqKI651utOEKLuA0fkclPsEyPIjCnBeIIkzFamzBPlxADPFkJUjWwEggWeLJiuIvfI+P8ToeyDmBGIvpWIVKNCOWrITMkkAM3ajDDryBx1AaaIEoxSNYh1PoQMzQkUAnojiE5OutJHACcRfW4BSiiAsWMbSiGotREgiBKMQi7EUj4oJNN+qxG7OGTCAKcT8+wh/ollt04RDexZisCkQxZuEbROUucTTiU0xHUcYFohjP4iC6DA/asRdzUZwxgSjGfJw0/IjjBF7CiEEXiBIsxt+GN7VYhlGDJhC3YQFq5AdnsAQjB0vgbFTLL05gIe5ISyAex0/yk2rMvWWBGI8v5TcVmHyrAtehTX4Tx+coG5BAzMNpIdCElf0WiLHYLQQAjmBGfwWuQqOQVLaiqFeBuBf7hdyM81jSl8D30SykJypQfFOBGIvfhPRGA1b0JPBNXBHSF1UouZnAPcH/RVkQqMOL/xOIh1ArpD+0Y3uqwHdwVRr0eKJJgwDnOYl7/hOIAnyHG+kGzUTogGZqxKtJgcbgbLpBgyIyS3mi2J4U6ClcHw4Cs5znJEojWInraYTNSOjg59GEKRFsRHSgYUOBmrA0ggp05KvANDK1YUMER9Ad8LB95hmCTB34NoLzSIQCB0wMhyO4FvzXRRAzJVAXQWfwwwrqV0FbBLEcChy0PIkIrufIh2sQ88QjOId4pgOnc9hPY91MC4xGUIVOSEdiph4yE+sbHBI438tJJH2RAJkWmEamdOjCvggWoEUGyJrAoaEd5RGMQx0gFNh/mjE/GcB2tAFySqKhow5lyRCeQQNSCaxMQ0sHdqX+K1clIKTKEjwa8HSqwPm4JKQvurCrp9aOLegQ0hvH8URPAifhgJCeuIzVfbW3zcujjvyB0IqNGN2fDtWlqBcC0IkdmDSQHum3wk0FdGI3pgy0yfx2LMcZJOQnHdiKSbd6T2QkFuBAnnVuJXAJH+K+dG8qFWMGtuRJ73QC+7EMZYN5W3Mc1uJgjt8T7o0abMY0FGbivnABJmMbatEu94nhIvbgZZRm48p/EWZiJ+rRkmMbTQJRNOBnvIJRWR06gUKU4UmsxzE040ZAN5w4bqAV51COOZiI4qEee3I3pmEpPsNRtKILsSESGkcMXWjFcWzCcszEhKBOLhqP57EWm1GJGrQgnubYp1RSxz91I45/cBw/4Au8hxcwMbCTi3oZFTAZS1COCvyKYziLelxDG7oQ7+dop3Y04TJqcQqH8Qt24QMsxMO4I6dmZ/U9PsAEzMEKbMDX+BHVOIeraEUsZWLbVdTiKPZhJ8qxBoswFaNRkM1n+he4a3+KgaBGGQAAAABJRU5ErkJggg==",sh={expression:{label:"Expression",type:"Expression",icon:AM},top:{label:"Top",type:"Top",icon:CM},mid:{label:"Mid",type:"Mid",icon:kM},bottom:{label:"Bottom",type:"Bottom",icon:SM}},EM={expression:"Expression_Default.png",top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png"};function _M(e={}){const{initialOutfit:t={},onChange:n,width:r="100%",useRiveAnimation:o=false}=e;let i={...EM,...t},a="bottom",l={expression:[],top:[],mid:[],bottom:[]},u={expression:0,top:0,mid:0,bottom:0},f,p,m,b={},y=false,g=0,A=0,M=null,I=null;const L=[],D=x("div",{className:"avatar-builder"});D.style.width=r;const z=x("style");z.textContent=wM,D.appendChild(z);const O=x("div",{className:"avatar-builder-preview-area"});D.appendChild(O);const T=x("div",{className:"avatar-builder-avatar-wrapper"});O.appendChild(T),f=x("div",{className:"avatar-builder-preview-container"}),T.appendChild(f);const R=x("button",{className:"avatar-builder-arrow avatar-builder-arrow-left",onclick:()=>Y(-1)});R.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',T.appendChild(R);const P=x("button",{className:"avatar-builder-arrow avatar-builder-arrow-right",onclick:()=>Y(1)});P.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',T.appendChild(P),f.addEventListener("mousedown",se),f.addEventListener("touchstart",se,{passive:true}),L.push(()=>{f.removeEventListener("mousedown",se),f.removeEventListener("touchstart",se);}),p=x("div",{className:"avatar-builder-item-name"},"Loading..."),O.appendChild(p),m=x("div",{className:"avatar-builder-dots-indicator"}),O.appendChild(m);const C=x("div",{className:"avatar-builder-category-row"});D.appendChild(C),Object.entries(sh).forEach(([F,$])=>{const Q=F,re=x("button",{className:`avatar-builder-category-btn ${Q===a?"active":""}`,onclick:()=>ce(Q),title:$.label}),le=x("img",{src:$.icon,alt:$.label,className:"category-icon"});re.appendChild(le),b[Q]=re,C.appendChild(re);}),E().then(()=>{B(),V(),U();});async function E(){const F=["expression","top","mid","bottom"];await Promise.all(F.map(async $=>{const Q=await Fm({type:sh[$].type});l[$]=Q;const re=i[$],le=Q.findIndex(ye=>ye.filename===re);u[$]=le>=0?le:0;}));}function B(){if(o)M?Eo.updateOutfit(M,i).catch(F=>{console.error("[AvatarBuilder] Failed to update Rive outfit:",F);}):j();else {f.innerHTML="";const F=Yr();[{slot:"bottom",zIndex:1},{slot:"mid",zIndex:2},{slot:"top",zIndex:3},{slot:"expression",zIndex:4}].forEach(({slot:Q,zIndex:re})=>{const le=i[Q];if(!le)return;const ye=le===Lm;if(le.includes("_Blank.png")||ye)return;const Be=x("img",{src:`${F}${le}`,className:`avatar-builder-layer ${Q===a?"active":""}`,style:{zIndex:String(re)},onerror:()=>Be.style.display="none"});f.appendChild(Be);});}}async function j(){if(!(!o||M))try{f.innerHTML="",I=x("canvas",{className:"avatar-builder-rive-canvas",width:260,height:260}),f.appendChild(I),M=await Eo.createInstance({canvas:I,outfit:i,autoplay:!0}),console.log("[AvatarBuilder] Rive animation initialized");}catch(F){console.error("[AvatarBuilder] Failed to initialize Rive:",F),console.warn("[AvatarBuilder] Falling back to static images"),I&&(I.remove(),I=null),M=null,B();}}function V(){const F=l[a],$=u[a];if(!F||F.length===0){p.textContent="Loading...";return}const Q=F[$];p.textContent=Q?.displayName||"Unknown";}function U(){const F=l[a],$=u[a],Q=F.length;if(Q===0){m.innerHTML="";return}m.innerHTML=`<span class="dots-text">${$+1} / ${Q}</span>`;const re=Math.min(Q,10),le=x("div",{className:"dots-container"}),ye=Q>1?Math.round($/(Q-1)*(re-1)):0;for(let _e=0;_e<re;_e++){const Be=x("span",{className:`dot ${_e===ye?"active":""}`});le.appendChild(Be);}m.appendChild(le);}function ce(F){a=F,Object.entries(b).forEach(([$,Q])=>{Q.classList.toggle("active",$===F);}),B(),V(),U();}function Y(F){const $=l[a];if(!$||$.length===0)return;let Q=u[a]+F;Q<0&&(Q=$.length-1),Q>=$.length&&(Q=0),u[a]=Q;const re=$[Q];i[a]=re.filename,n&&n({slot:a,item:re}),ie(F>0?"left":"right"),B(),V(),U();}function ie(F){const $=F==="left"?-20:20;f.style.transform=`translateX(${$}px)`,f.style.opacity="0.5",setTimeout(()=>{f.style.transform="translateX(0)",f.style.opacity="1";},150);}function se(F){y=true,g="touches"in F?F.touches[0].clientX:F.clientX,A=0;const $=re=>{if(!y)return;A=("touches"in re?re.touches[0].clientX:re.clientX)-g,f.style.transform=`translateX(${A*.3}px)`;},Q=()=>{if(y){if(y=false,f.style.transform="translateX(0)",Math.abs(A)>50){const re=A>0?-1:1;Y(re);}document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",Q),document.removeEventListener("touchmove",$),document.removeEventListener("touchend",Q);}};document.addEventListener("mousemove",$),document.addEventListener("mouseup",Q),document.addEventListener("touchmove",$),document.addEventListener("touchend",Q);}function ae(){return {...i}}function ne(F){i={...i,...F},Object.entries(F).forEach(([$,Q])=>{const re=$;if(!Q||!l[re])return;const le=l[re].findIndex(ye=>ye.filename===Q);le>=0&&(u[re]=le);}),B(),V(),U();}function q(F){ce(F);}function Z(){M&&(M.destroy(),M=null),I&&(I.remove(),I=null),L.forEach(F=>F()),L.length=0,D.remove();}return {root:D,getOutfit:ae,setOutfit:ne,setCategory:q,destroy:Z}}const IM={lastSelectedSlot:"bottom",builderExpanded:true,outfitsExpanded:true,loadoutsExpanded:true};async function TM(){const e=await Hr("tab-avatar-ui",{version:1,defaults:IM}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const r=e.get();t.forEach(o=>o(r));},subscribe:n=>(t.push(n),()=>{const r=t.indexOf(n);r!==-1&&t.splice(r,1);})}}const PM=`
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
`,MM=500,lh=10,LM=800;function wv(e={}){const{onApply:t,layout:n="carousel"}=e;let r=null;function o(){if(!r)return;r.innerHTML="";const p=$r.get();if(p.length===0){r.appendChild(x("div",{className:"outfits-loadout-empty"},"No saved outfits yet."));return}const m=Yr();if(n==="grid"){const b=x("div",{className:"outfits-loadout-grid"});p.forEach(y=>{b.appendChild(i(y,m));}),r.appendChild(b);}else {const b=x("div",{className:"outfits-loadout-carousel"});p.forEach(y=>{b.appendChild(i(y,m));}),a(b),r.appendChild(b);}}function i(p,m){const b=x("div",{className:"outfits-loadout-card"});let y=false,g=null;const A=()=>{y=true,g&&clearTimeout(g),g=setTimeout(()=>{y=false;},LM),$r.delete(p.id);};b.addEventListener("click",()=>{y||(t?t(p):cg.set({top:p.top,mid:p.mid,bottom:p.bottom,expression:p.expression}));}),b.addEventListener("contextmenu",T=>{T.preventDefault(),T.stopPropagation(),A();});let M=null,I=null,L=false;const D=()=>{M&&(clearTimeout(M),M=null),I=null,L=false;};b.addEventListener("pointerdown",T=>{T.pointerType!=="mouse"&&T.button===0&&(D(),I={x:T.clientX,y:T.clientY},M=setTimeout(()=>{M=null,I&&(L=true,A());},MM));}),b.addEventListener("pointermove",T=>{if(!I||L)return;const R=T.clientX-I.x,P=T.clientY-I.y;R*R+P*P>lh*lh&&D();}),b.addEventListener("pointerup",D),b.addEventListener("pointercancel",D);const z=x("div",{className:"outfits-loadout-preview"});return [p.bottom,p.mid,p.top,p.expression].forEach((T,R)=>{if(!T||T.includes("_Blank"))return;const P=x("img",{className:"outfits-loadout-layer",style:{zIndex:String(R+1)}});P.src=`${m}${T}`,P.onerror=()=>P.remove(),z.appendChild(P);}),b.appendChild(z),b}function a(p){let m=false,b=0,y=0;const g=I=>{m=true,b=("touches"in I?I.touches[0].clientX:I.clientX)-p.offsetLeft,y=p.scrollLeft;},A=I=>{if(!m)return;I.preventDefault();const L=("touches"in I?I.touches[0].clientX:I.clientX)-p.offsetLeft;p.scrollLeft=y-(L-b);},M=()=>{m=false;};p.addEventListener("mousedown",g),p.addEventListener("touchstart",g,{passive:true}),p.addEventListener("mousemove",A),p.addEventListener("touchmove",A,{passive:false}),p.addEventListener("mouseup",M),p.addEventListener("mouseleave",M),p.addEventListener("touchend",M);}const l=x("style");l.textContent=PM,r=x("div"),o();const u=x("div");u.appendChild(l),u.appendChild(r);const f=$r.subscribe(()=>o());return {root:u,destroy(){f(),r=null;}}}function RM(e={}){const{title:t="Outfits",defaultExpanded:n=true,onExpandChange:r,onApply:o,layout:i,showHint:a=false}=e,l=wv({onApply:o,layout:i}),u=ct({title:t,variant:"soft",expandable:true,defaultExpanded:n,onExpandChange:r}),f=u.querySelector(".card-body");if(f&&(f.appendChild(l.root),a)){const p=x("div",{className:"outfits-loadout-hint"});p.innerHTML=`
                <span class="outfits-loadout-hint__desktop">Click to apply · Right-click to delete</span>
                <span class="outfits-loadout-hint__mobile">Tap to apply · Hold to delete</span>
            `,f.appendChild(p);}return {root:u,destroy:()=>l.destroy()}}const FM=`
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
`;class OM extends mr{constructor(){super({id:"tab-avatar",label:"Avatar"});ve(this,"avatarBuilder",null);ve(this,"uiState",null);}async build(n){$r.init(),this.uiState=await TM();const r=await tl().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})),o={top:r.top,mid:r.mid,bottom:r.bottom,expression:r.expression},i=this.createContainer("avatar-section");n.appendChild(i);const a=x("style");a.textContent=FM,i.appendChild(a);const l=ct({title:"Avatar editor",variant:"glass",expandable:true,defaultExpanded:this.uiState.get().builderExpanded,onExpandChange:p=>{this.uiState?.update({builderExpanded:p});}});this.avatarBuilder=_M({initialOutfit:o,useRiveAnimation:true});const u=l.querySelector(".card-body");if(u){u.appendChild(this.avatarBuilder.root);const p=x("button",{className:"avatar-save-btn"});p.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save this outfit',p.addEventListener("click",()=>this.handleSave()),u.appendChild(p),u.appendChild(x("hr",{className:"avatar-outfits-divider"}));const m=wv({onApply:b=>this.avatarBuilder?.setOutfit(b)});u.appendChild(m.root),this.addCleanup(()=>m.destroy());}i.appendChild(l);const f=RM({title:"Outfits loadout",defaultExpanded:this.uiState.get().loadoutsExpanded,onExpandChange:p=>{this.uiState?.update({loadoutsExpanded:p});},layout:"grid",showHint:true});f.root.style.marginTop="12px",i.appendChild(f.root),this.addCleanup(()=>f.destroy());}async handleSave(){if(!this.avatarBuilder)return;const n=this.avatarBuilder.getOutfit(),o=`Outfit ${$r.get().length+1}`;await $r.save(o,n);}async destroy(){this.avatarBuilder&&(this.avatarBuilder.destroy(),this.avatarBuilder=null),super.destroy();}}const Sd={ui:{expandedCards:{public:true}}};async function DM(){const e=await Hr("tab-room",{version:1,defaults:Sd,sanitize:o=>({ui:{expandedCards:ko(Sd.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:ko(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const NM=`
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
`;function $M(e){return /^I-\d+-GC-\d+-\d+$/.test(e)?"discord":"web"}function BM(e){const t=x("span",{className:`rooms-list__badge rooms-list__badge--${e}`});return t.textContent=e==="discord"?"Discord":"Web",t}function zM(e,t=16){return e.length<=t?e:`${e.slice(0,t)}...`}function jM(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,e}function GM(e,t){const n=t==="all"?e:e.filter(r=>r.playerCount<r.maxPlayers);switch(t){case "5-6":return n.filter(r=>r.playerCount>=5);case "4":return n.filter(r=>r.playerCount===4);case "1-3":return n.filter(r=>r.playerCount>=1&&r.playerCount<=3);default:return n}}function UM(e){const t=u=>u.toString().padStart(2,"0"),n=t(e.getHours()),r=t(e.getMinutes()),o=t(e.getSeconds()),i=t(e.getDate()),a=t(e.getMonth()+1),l=e.getFullYear();return `${i}/${a}/${l} ${n}:${r}:${o}`}function WM(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 50 50"),e.setAttribute("width","50"),e.setAttribute("height","50"),e.innerHTML=`
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `,e}function HM(e={}){const{rooms:t=[],onJoinRoom:n,onCopyRoomId:r,onRefresh:o,emptyMessage:i="No rooms available",joinEnabled:a=false,initialFilter:l="5-6",onFilterChange:u}=e;let f=l,p=t;const m=x("div",{className:"rooms-list"}),b=x("style");b.textContent=NM,m.appendChild(b);const y=x("div",{className:"rooms-list__header-bar"}),A=zr({options:[{value:"5-6",label:"5-6 players"},{value:"4",label:"4 players"},{value:"1-3",label:"1-3 players"},{value:"all",label:"All"}],value:l,onChange:V=>{f=V,u?.(f),B(p);}});y.appendChild(A.root);const M=vt({label:"Refresh rooms",variant:"default",size:"sm",iconLeft:"",onClick:()=>{o?.();}});y.appendChild(M),m.appendChild(y);const I=x("div",{style:"position: relative;"}),L=x("div",{className:"rooms-list__container"});I.appendChild(L);const D=x("div",{className:"rooms-list__loading-overlay"});D.style.display="none";const z=WM();D.appendChild(z),I.appendChild(D),m.appendChild(I);const O=x("div",{className:"rooms-list__footer"}),T=x("div",{className:"rooms-list__aries-badge"});T.textContent="Powered by Aries",O.appendChild(T);const R=x("div",{className:"rooms-list__timestamp"});R.style.display="none",O.appendChild(R),m.appendChild(O);const P=[A,{remove:()=>M.remove()}],C=[];function E(V){const U=$M(V.id),ce=x("div",{className:"rooms-list__item"}),Y=x("div",{className:"rooms-list__top-row"}),ie=BM(U);Y.appendChild(ie);const se=x("span",{className:"rooms-list__id"});se.textContent=zM(V.id,20),se.title=V.id,Y.appendChild(se);const ae=jM(),ne=x("button",{className:"rooms-list__copy-btn"});ne.type="button",ne.title="Copy room ID",ne.appendChild(ae),ne.addEventListener("click",le=>{le.stopPropagation(),r?.(V.id);}),Y.appendChild(ne),ce.appendChild(Y);const q=x("div",{className:"rooms-list__bottom-row"}),Z=x("div",{className:"rooms-list__bottom-left"}),F=x("div",{className:"rooms-list__avatars"});for(let le=0;le<V.maxPlayers;le++){const ye=x("div",{className:`rooms-list__avatar ${le<V.playerCount?"rooms-list__avatar--filled":"rooms-list__avatar--empty"}`});if(V.playerAvatars&&V.playerAvatars[le]){const _e=V.playerAvatars[le];if(_e.avatarUrl){const Be=x("img",{src:_e.avatarUrl,alt:_e.name});Be.style.width="100%",Be.style.height="100%",Be.style.objectFit="cover",ye.appendChild(Be);}else ye.textContent="👤";ye.title=_e.name;}else le<V.playerCount&&(ye.textContent="👤");F.appendChild(ye);}Z.appendChild(F);const $=x("span",{className:"rooms-list__count"});$.textContent=`${V.playerCount}/${V.maxPlayers}`,Z.appendChild($),q.appendChild(Z);const Q=V.playerCount>=V.maxPlayers,re=vt({label:"Join",variant:"primary",size:"sm",disabled:!a||Q,onClick:()=>{n?.(V.id);}});return C.push(re),q.appendChild(re),ce.appendChild(q),ce}function B(V){L.innerHTML="",C.forEach(ce=>{ce.destroy?ce.destroy():ce.remove&&ce.remove();}),C.length=0;const U=GM(V,f);if(U.length===0){const ce=x("div",{className:"rooms-list__empty"});ce.textContent=i,L.appendChild(ce);}else U.forEach(ce=>{const Y=E(ce);L.appendChild(Y);});}return B(t),{root:m,setRooms(V){p=V,B(V);},setFilter(V){f=V,A.setValue(V),B(p);},setLastUpdated(V){R.textContent=UM(V),R.style.display="block";},setLoading(V){V?(D.style.display="flex",D.style.opacity="0",D.offsetWidth,D.style.opacity="1"):(D.style.opacity="0",setTimeout(()=>{D.style.display="none";},300));},destroy(){C.forEach(V=>{V.destroy?V.destroy():V.remove&&V.remove();}),C.length=0,P.forEach(V=>{V.destroy?V.destroy():V.remove&&V.remove();}),P.length=0,m.remove();}}}async function VM(e){const{state:t,defaultExpanded:n=true,onExpandChange:r}=e;let o=null,i=false;const a=!Rt.isDiscord(),l=Rt.isDiscord(),f=Rt.detect().origin;async function p(){try{return (await $s.fetchRooms(1e3)).map(A=>({id:A.id,playerCount:A.playersCount,maxPlayers:6,playerAvatars:A.userSlots?.map(M=>({name:M.name,avatarUrl:M.avatarUrl}))}))}catch(g){return console.error("[Room] Failed to fetch rooms:",g),[]}}async function m(){if(!(i||!o)){i=true,o.setLoading(true);try{const g=await p(),A=new Date;o.setRooms(g),o.setLastUpdated(A),console.log(`[Room] Fetched ${g.length} rooms from Aries API`);}catch(g){console.error("[Room] Failed to refresh rooms:",g);}finally{i=false,o.setLoading(false);}}}const b=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"});o=HM({rooms:[],joinEnabled:a,onJoinRoom:g=>{const A=`${f}/r/${g}`;window.open(A,"_blank"),console.log(`[Room] Opening room: ${A}`);},onCopyRoomId:g=>{navigator.clipboard.writeText(g).then(()=>{console.log(`[Room] Room ID copied to clipboard: ${g}`);}).catch(A=>{console.error("[Room] Failed to copy room ID:",A);});},onRefresh:()=>{m();},emptyMessage:"No public rooms available",initialFilter:"5-6"}),b.appendChild(o.root);const y=ct({title:"Public",subtitle:l?"List of available public rooms (view only on Discord)":"List of available public rooms",padding:"lg",expandable:true,defaultExpanded:n,onExpandChange:g=>{r?.(g),t.setCardExpanded("public",g),g&&!i&&m();}},b);return n&&m(),{root:y,destroy(){o&&(o.destroy(),o=null);}}}class KM extends mr{constructor(n){super({id:"tab-room",label:"Room"});ve(this,"publicCardHandle",null);this.deps=n;}destroy(){this.publicCardHandle&&(this.publicCardHandle.destroy(),this.publicCardHandle=null);}async build(n){const r=this.createGrid("12px");r.id="room",n.appendChild(r);let o;try{o=await DM();}catch{o={get:()=>Sd,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get();this.publicCardHandle=await VM({state:o,defaultExpanded:!!i.ui.expandedCards.public}),r.appendChild(this.publicCardHandle.root);}}const YM=10,qM=16;function XM(e){const{selectedSpecies:t,onChange:n,placeholder:r="Search plants...",speciesRuleCount:o={},onSearchChange:i}=e;let a=t??null,l=[],u=[];const f=[],p=new Map;let m=null;const b=x("div",{className:"plant-selector"}),y=Wi({placeholder:r,blockGameKeys:true,withClear:true,debounceMs:150,onChange:C=>D(C)});b.appendChild(y.root),f.push(()=>{const C=y.root.__cleanup;C&&C();});const g=x("div",{className:"plant-selector__grid"});b.appendChild(g),f.push(()=>{m!==null&&(cancelAnimationFrame(m),m=null),p.clear();});async function A(C,E){if($e.isReady())try{const B=await $e.toCanvas(C,{boundsMode:"padded"});B&&(B.style.maxWidth="40px",B.style.maxHeight="40px",B.style.width="auto",B.style.height="auto",B.style.display="block",E.replaceChildren(B));}catch(B){console.warn("[PlantSelector] Failed to load sprite:",B);}}function M(){if(p.size===0){m=null;return}const C=[],E=p.entries();for(let B=0;B<YM;B++){const j=E.next();if(j.done)break;C.push(j.value);}for(const[B,j]of C)A(j,B),p.delete(B);p.size>0?m=requestAnimationFrame(()=>{setTimeout(M,qM);}):m=null;}function I(){m===null&&(m=requestAnimationFrame(()=>{M();}));}function L(){try{const C=Te.get("plants");if(!C){console.warn("[PlantSelector] No plants data available");return}l=Object.entries(C).filter(([,E])=>E&&typeof E=="object"&&"crop"in E).map(([E,B])=>({name:E,spriteId:B.crop?.spriteId||null})),u=[...l],z();}catch(C){console.error("[PlantSelector] Failed to load plants:",C);}}function D(C){if(!C.trim())u=[...l];else {const E=C.toLowerCase();u=l.filter(B=>B.name.toLowerCase().includes(E));}i?.(C),z();}function z(){const C=g.scrollTop;if(m!==null&&(cancelAnimationFrame(m),m=null),p.clear(),g.replaceChildren(),u.length===0){const B=x("div",{className:"plant-selector__empty"},"No plants found");g.appendChild(B);return}const E=document.createDocumentFragment();u.forEach(B=>{const j=O(B);E.appendChild(j);}),g.appendChild(E),g.scrollTop=C,p.size>0&&I();}function O(C){const E=o[C.name]??0,B=x("div",{className:`plant-selector__item ${a===C.name?"plant-selector__item--selected":""}`});if(E>0){const ce=x("div",{className:"plant-selector__badge"},String(E));B.appendChild(ce);}B.addEventListener("click",()=>{a=C.name,n(C.name),z();});const j=x("div",{className:"plant-selector__sprite"}),V=x("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 8%, transparent); border-radius: 4px;"});j.appendChild(V),C.spriteId&&$e.isReady()&&p.set(j,C.spriteId),B.appendChild(j);const U=x("div",{className:"plant-selector__name"},C.name);return B.appendChild(U),B}L();function T(){return a}function R(C){a=C,z();}function P(){f.forEach(C=>C()),f.length=0;}return {root:b,getSelected:T,setSelected:R,destroy:P}}async function kl(e,t,n){const{size:r,mutations:o}=n;if(!$e.isReady()){t.appendChild(fi(r));return}try{const l=Te.get("plants")?.[e]?.crop?.spriteId;if(!l){t.appendChild(fi(r));return}const u=await $e.toCanvas(l,{mutations:o&&o.length>0?o:void 0,boundsMode:"padded"});u?(Cv(u,r),t.appendChild(u)):t.appendChild(fi(r));}catch(i){console.warn(`[SpriteRenderer] Failed to render plant sprite for ${e}:`,i),t.appendChild(fi(r));}}async function QM(e,t,n){if(!$e.isReady()){t.appendChild(Ya(e,n));return}try{const i=`sprite/ui/Mutation${{Ambershine:"Amberlit"}[e]??e}`;if(!$e.has(i)){t.appendChild(Ya(e,n));return}const a=await $e.toCanvas(i);a?(Cv(a,n),t.appendChild(a)):t.appendChild(Ya(e,n));}catch(r){console.warn(`[SpriteRenderer] Failed to render mutation sprite for ${e}:`,r),t.appendChild(Ya(e,n));}}function fi(e){return x("div",{style:`
            width: ${e}px;
            height: ${e}px;
            background: color-mix(in oklab, var(--accent) 20%, transparent);
            border-radius: 4px;
        `})}function JM(e){return x("div",{style:`
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
        `},"—")}function Ya(e,t){return e==="Gold"?x("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: #FFD700;
                border-radius: 4px;
            `}):e==="Rainbow"?x("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%);
                border-radius: 4px;
            `}):fi(t)}function Cv(e,t){e.style.maxWidth=`${t}px`,e.style.maxHeight=`${t}px`,e.style.width="auto",e.style.height="auto",e.style.display="block";}const ar=["none","Gold","Rainbow"],Vs={wet:["Wet","Chilled","Frozen"],lunar:["Dawnlit","Ambershine","Dawncharged","Ambercharged"]};function kv(){if(!$e.isReady())return console.warn("[MutationData] MGSprite not ready yet"),[];try{return $e.getMutationNames().filter(t=>t!=="Gold"&&t!=="Rainbow")}catch(e){return console.error("[MutationData] Failed to get mutation names:",e),[]}}function Sv(e){if(e==="none")return "Normal";try{return Te.get("mutations")?.[e]?.name||e}catch{return e}}function ZM(e){return e.map(t=>t==="none"?"none":Sv(t).toLowerCase()).join(", ")}function eL(){return kv()}function io(e){const n=eL().indexOf(e);return n===-1?1/0:n}function Ad(e){return Vs.wet.includes(e)}function Ed(e){return Vs.lunar.includes(e)}function tL(e){const t=e.filter(o=>Ad(o)),n=e.filter(o=>Ed(o)),r=[];return t.length>0&&r.push(t[0]),n.length>0&&r.length<2&&r.push(n[0]),r}function qa(e){const t=[e.mode];if(e.sizeCondition?.enabled&&t.push(`size:${e.sizeCondition.minPercentage}`),e.mutationCondition?.enabled){const n=[...e.mutationCondition.mutations].sort();t.push(`mut:${e.mutationCondition.matchMode}:${n.join(",")}`);}return t.join("|")}const nL=32;function Av(e){const{mutationId:t,isSelected:n,onToggle:r,size:o=nL}=e;let i=n,a=false;const l=x("div",{style:`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.15s ease;
        `});m(),l.addEventListener("click",r),l.addEventListener("mouseenter",()=>{!i&&!a&&(l.style.background="color-mix(in oklab, var(--fg) 10%, transparent)");}),l.addEventListener("mouseleave",()=>{!i&&!a&&(l.style.background="color-mix(in oklab, var(--fg) 5%, transparent)");});const u=x("div",{style:"display: flex; align-items: center; justify-content: center;"});t==="none"?u.appendChild(JM(o)):QM(t,u,o),l.appendChild(u);const f=e.label??Sv(t),p=x("div",{style:`
            font-size: 10px;
            color: var(--fg);
            text-align: center;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        `},f);l.appendChild(p);function m(){i?(l.style.background="color-mix(in oklab, var(--accent) 20%, transparent)",l.style.border="1px solid var(--accent)"):(l.style.background="color-mix(in oklab, var(--fg) 5%, transparent)",l.style.border="1px solid color-mix(in oklab, var(--fg) 10%, transparent)");}function b(g){i=g,m();}function y(g){a=g,l.style.opacity=a?"0.35":"1",l.style.pointerEvents=a?"none":"",l.style.cursor=a?"default":"pointer";}return {root:l,setSelected:b,setDisabled:y}}function rL(e){const{enabled:t,percentage:n,sizeMode:r,ruleMode:o,onEnabledChange:i,onPercentageChange:a,onSizeModeChange:l,expanded:u=false,onExpandChange:f}=e;let p=t,m=n,b=r,y=o,g=null,A=null,M=null;const I=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),L=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");z();const D=ct({title:"Size",subtitle:"Growth size threshold",actions:[L],variant:"soft",padding:"md",expandable:true,defaultExpanded:u,onExpandChange:f},I);function z(){I.replaceChildren(),L.style.display=p?"":"none";const P=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=Cl({checked:p,label:"Enable",size:"md",onChange:Y=>{p=Y,i(Y),z();}});P.appendChild(C.root),p&&(g=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},O()),P.appendChild(g)),I.appendChild(P);const E=x("div",{style:p?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),B=x("div",{style:"display: flex; justify-content: center;"}),j=zo({segments:[{id:"min",label:"Minimum"},{id:"max",label:"Maximum"}],selected:b,onChange:Y=>{b=Y,l(b),z();}});B.appendChild(j),E.appendChild(B),M=x("div",{style:"display: flex; flex-direction: column; gap: 4px;"});const V=x("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),U=x("div",{style:"font-size: 12px; color: var(--fg); font-weight: 500;"},"Size Threshold");A=x("span",{style:"font-size: 12px; font-weight: 600; color: var(--accent);"},`${m}%`),V.appendChild(U),V.appendChild(A),M.appendChild(V);const ce=ju({min:50,max:100,step:1,value:m,showValue:false,onInput:Y=>{m=Y,A&&(A.textContent=`${Y}%`),g&&(g.textContent=O());},onChange:Y=>{m=Y,a(Y);}});M.appendChild(ce.root),E.appendChild(M),I.appendChild(E);}function O(){const P=b==="min"?"at most":"at least";return y==="lock"?`Lock plants ${P} ${m}% grown`:`Allow plants ${P} ${m}% grown`}function T(P){y=P,g&&(g.textContent=O());}function R(){g=null,A=null,M=null;}return {root:D,setRuleMode:T,destroy:R}}function oL(e){const{enabled:t,selected:n,ruleMode:r,onEnabledChange:o,onSelectionChange:i,expanded:a=false,onExpandChange:l}=e;let u=t,f=[...n],p=r,m=null;const b=[],y=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),g=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");M();const A=ct({title:"Color Mutation",subtitle:"Gold / Rainbow color variants",actions:[g],variant:"soft",padding:"md",expandable:true,defaultExpanded:a,onExpandChange:l},y);function M(){y.replaceChildren(),b.length=0,g.style.display=u?"":"none";const P=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=Cl({checked:u,label:"Enable",size:"md",onChange:j=>{u=j,o(j),M();}});P.appendChild(C.root),u&&(m=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},z()),P.appendChild(m)),y.appendChild(P);const E=x("div",{style:u?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),B=x("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 8px;
            `});ar.forEach(j=>{const V=f.includes(j),U=Av({mutationId:j,isSelected:V,onToggle:()=>I(j)});b.push(U),B.appendChild(U.root);}),E.appendChild(B),y.appendChild(E);}function I(P){if(f.includes(P)){const E=f.filter(B=>B!==P);if(E.length===0)return;f=E;}else {if(f.length>=3)return;f=[...f,P];}i(f),L(),D();}function L(){m&&(m.textContent=z());}function D(){ar.forEach((P,C)=>{const E=b[C];E&&E.setSelected(f.includes(P));});}function z(){const P=f.map(C=>C==="none"?"normal":C.toLowerCase()).join(", ");return p==="lock"?`Lock ${P} plants`:`Allow ${P} plants`}function O(P){p=P,L();}function T(){return [...f]}function R(){m=null,b.length=0;}return {root:A,setRuleMode:O,getSelection:T,destroy:R}}function iL(e){const{enabled:t,selected:n,matchMode:r,ruleMode:o,onEnabledChange:i,onSelectionChange:a,onMatchModeChange:l,expanded:u=false,onExpandChange:f}=e;let p=t,m=[...n],b=r,y=o,g=null;const A=new Map,M=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),I=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");D();const L=ct({title:"Weather Mutation",subtitle:"Weather-based mutation variants",actions:[I],variant:"soft",padding:"md",expandable:true,defaultExpanded:u,onExpandChange:f},M);function D(){M.replaceChildren(),A.clear(),I.style.display=p?"":"none";const j=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),V=Cl({checked:p,label:"Enable",size:"md",onChange:ne=>{p=ne,i(ne),D();}});j.appendChild(V.root),p&&(g=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"}),m.length>0&&(g.textContent=R()),j.appendChild(g)),M.appendChild(j);const U=x("div",{style:(p?"":"opacity: 0.4; pointer-events: none;")+" display: flex; flex-direction: column; gap: 12px; transition: opacity 0.2s ease;"}),ce=x("div",{style:"display: flex; justify-content: center;"}),Y=zo({segments:[{id:"any",label:"Any"},{id:"all",label:"All"}],selected:b,onChange:ne=>{b=ne,ne==="all"&&(m=tL(m),a(m)),l(b),D();}});ce.appendChild(Y),U.appendChild(ce);const se=["none",...kv()],ae=x("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
                gap: 8px;
                max-height: 300px;
                overflow-y: auto;
            `});se.forEach(ne=>{const q=m.includes(ne),Z=Av({mutationId:ne,isSelected:q,onToggle:()=>z(ne),label:ne==="none"?"None":void 0});A.set(ne,Z),ae.appendChild(Z.root);}),U.appendChild(ae),M.appendChild(U);}function z(j){if(b==="all")if(j==="none")m.length===1&&m[0]==="none"?m=[]:m=["none"];else {if(m.includes("none"))return;m.includes(j)?m=m.filter(V=>V!==j):(Ad(j)?m=m.filter(V=>!Ad(V)):Ed(j)&&(m=m.filter(V=>!Ed(V))),m=[...m,j]);}else m.includes(j)?m=m.filter(V=>V!==j):m=[...m,j];a(m),O(),T();}function O(){g&&(g.textContent=m.length>0?R():"");}function T(){const j=b==="all"&&m.includes("none");A.forEach((V,U)=>{V.setSelected(m.includes(U)),V.setDisabled(j&&U!=="none");});}function R(){const j=ZM(m),V=b==="all"?"AND":"OR";return y==="lock"?`Lock ${j} plants (${V})`:`Allow ${j} plants (${V})`}function P(j){y=j,O();}function C(){return [...m]}function E(){return b}function B(){g=null,A.clear();}return {root:L,setRuleMode:P,getSelection:C,getMatchMode:E,destroy:B}}const aL=60;function sL(e){let t={...e},n=null,r=null;const o=x("div",{style:"display: flex; flex-direction: column; gap: 8px;"}),i=x("div",{style:"display: flex; justify-content: center;"}),a=x("div",{className:"harvest-locker-preview-grid"});o.appendChild(i),o.appendChild(a);const l=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `});t.sizeEnabled&&t.sizePercentage!==void 0&&(l.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,l.style.display="");const u=ct({title:"Preview",subtitle:p(),actions:[l],variant:"soft",padding:"md",expandable:true,defaultExpanded:true},o),f=u.querySelector(".card-subtitle");m();function p(){return t.ruleMode==="lock"?"Preview of plants that will be blocked from harvesting":"Preview of plants that will be harvestable"}function m(){n!==null&&(cancelAnimationFrame(n),n=null),f&&(f.textContent=p()),t.sizeEnabled&&t.sizePercentage!==void 0?(l.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,l.style.display=""):l.style.display="none";const I=t.colorEnabled?ar.filter(L=>t.colorMutations.includes(L)):[];if(I.length>=2){r&&!I.includes(r)&&(r=I[0]),r||(r=I[0]),i.replaceChildren();const L=zo({segments:I.map(D=>({id:D,label:D==="none"?"Normal":D})),selected:r,onChange:D=>{r=D,m();}});i.appendChild(L);}else r=null,i.replaceChildren();a.replaceChildren(),n=requestAnimationFrame(()=>{b().forEach(D=>{a.appendChild(D);});});}function b(){const I=[],L=t.species||"Starweaver";if(!(t.sizeEnabled||t.colorEnabled||t.weatherEnabled))return I.push(g(L,[])),I;const z=y();if(z.sort((T,R)=>{const P=Math.max(0,...T.map(j=>ar.indexOf(j))),C=Math.max(0,...R.map(j=>ar.indexOf(j)));if(P!==C)return P-C;const E=T.filter(j=>!ar.includes(j)).sort((j,V)=>io(j)-io(V)),B=R.filter(j=>!ar.includes(j)).sort((j,V)=>io(j)-io(V));if(E.length!==B.length)return E.length-B.length;for(let j=0;j<E.length;j++){const V=io(E[j])-io(B[j]);if(V!==0)return V}return 0}),z.length===0){const T=x("div",{style:"padding: 12px; text-align: center; color: #ef4444; font-size: 12px;"},"Invalid mutation combination");return I.push(T),I}return (r?z.filter(T=>{const R=T.filter(P=>ar.includes(P)&&P!=="none");return r==="none"?R.length===0:R.includes(r)}):z).forEach(T=>{I.push(g(L,T));}),I}function y(){const I=[],L=t.weatherEnabled?t.weatherMutations.filter(j=>j!=="none"):[],D=t.colorEnabled?t.colorMutations.filter(j=>j!=="none"):[],z=t.weatherEnabled&&t.weatherMutations.includes("none"),O=t.colorEnabled&&t.colorMutations.includes("none");if(L.length===0&&D.length===0||!t.weatherEnabled&&!t.colorEnabled)return I.push([]),I;const T=L.filter(j=>Vs.wet.includes(j)),R=L.filter(j=>Vs.lunar.includes(j)),P=(j,V)=>{j.length===0&&V.length===0?I.push([]):j.length===0?V.forEach(U=>{I.push([...U]);}):V.length===0?j.forEach(U=>{I.push([...U]);}):j.forEach(U=>{V.forEach(ce=>{I.push([...U,...ce]);});});},C=[];if(z&&C.push([]),t.weatherMatchMode==="all"&&L.length>0){const j=T.length>1,V=R.length>1;if(j||V)return [];C.push(L);}else t.weatherMatchMode==="any"&&L.length>0&&(L.forEach(j=>{C.push([j]);}),T.forEach(j=>{R.forEach(V=>{C.push([j,V]);});}));const E=[];return O&&E.push([]),D.forEach(j=>{E.push([j]);}),P(C,E),Array.from(new Set(I.map(j=>j.sort().join(",")))).map(j=>j.split(",").filter(Boolean))}function g(I,L){const D=x("div",{style:"flex-shrink: 0;"});return kl(I,D,{size:aL,mutations:L}),D}function A(I){t={...t,...I},m();}function M(){n!==null&&(cancelAnimationFrame(n),n=null),a.replaceChildren();}return {root:u,update:A,destroy:M}}function ch(e){const{mode:t,species:n,ruleId:r,initialData:o,onSave:i,onDelete:a,onCancel:l}=e;let u=o?.name??"",f=o?.ruleMode??"lock",p=o?.sizeCondition?.enabled??false,m=o?.sizeCondition?.minPercentage??75,b=o?.sizeCondition?.sizeMode??"max";const y=o?.mutationCondition?.mutations??[],g=y.filter(F=>["none","Gold","Rainbow"].includes(F));let A=g.length>0,M=g.length>0?g:["none"];const I=y.filter(F=>!["none","Gold","Rainbow"].includes(F));let L=I.length>0,D=I.length>0?I:["none"],z=o?.mutationCondition?.matchMode??"any",O=null,T=null,R=null,P=null,C=null,E=null,B=null;const j=ce(),V=ie();B=zu({title:U(),content:j,footer:V,size:"lg",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{l?.();}});function U(){if(t!=="species"||!n)return r?"Edit Overall Rule":"Create Overall Rule";const F=x("div",{style:"display: flex; align-items: center; gap: 10px;"}),$=x("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});kl(n,$,{size:24}),F.appendChild($);const Q=x("span",{},`${n} — Override Rule`);return F.appendChild(Q),F}function ce(){const F=x("div",{style:"display: flex; flex-direction: column; gap: 16px;"});if(t==="species"){const $=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 60%, transparent); padding: 8px 10px; background: color-mix(in oklab, var(--accent) 8%, transparent); border-radius: 6px; border-left: 3px solid var(--accent);"},"Global rules still apply. This override takes priority for this species only.");F.appendChild($);}return F.appendChild(Y()),O=rL({enabled:p,percentage:m,sizeMode:b,ruleMode:f,onEnabledChange:$=>{p=$,ae(),ne();},onPercentageChange:$=>{m=$,ne();},onSizeModeChange:$=>{b=$,ne();}}),F.appendChild(O.root),T=oL({enabled:A,selected:M,ruleMode:f,onEnabledChange:$=>{A=$,ae(),ne();},onSelectionChange:$=>{M=$,ne();}}),F.appendChild(T.root),R=iL({enabled:L,selected:D,matchMode:z,ruleMode:f,onEnabledChange:$=>{L=$,ae(),ne();},onSelectionChange:$=>{D=$,ne();},onMatchModeChange:$=>{z=$,ne();}}),F.appendChild(R.root),P=sL({species:t==="overall"?"Carrot":n,ruleMode:f,sizeEnabled:p,sizePercentage:m,sizeMode:b,colorEnabled:A,colorMutations:M,weatherEnabled:L,weatherMutations:D,weatherMatchMode:z}),F.appendChild(P.root),F}function Y(){const F=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),$=x("div",{style:"display: flex; gap: 12px; align-items: flex-start;"}),Q=x("div",{style:"flex: 1; display: flex; flex-direction: column; gap: 6px;"}),re=x("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Rule Name");Q.appendChild(re),C=Ys({placeholder:"e.g., Lock Large Frozen",value:u,maxLength:30,blockGameKeys:true,onChange:Be=>{u=Be,ae();}}),Q.appendChild(C.root),$.appendChild(Q);const le=x("div",{style:"display: flex; flex-direction: column; gap: 6px;"}),ye=x("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Mode");le.appendChild(ye);const _e=zo({segments:[{id:"lock",label:"Lock"},{id:"allow",label:"Allow"}],selected:f,onChange:Be=>{f=Be,O?.setRuleMode(f),T?.setRuleMode(f),R?.setRuleMode(f),ne();}});return le.appendChild(_e),$.appendChild(le),F.appendChild($),F}function ie(){const F=x("div",{style:"display: flex; gap: 8px; justify-content: space-between; width: 100%;"}),$=x("div",{style:"display: flex; gap: 8px;"});if(r&&a){const ye=vt({label:"Delete Rule",variant:"danger",onClick:()=>{a(),Z();}});$.appendChild(ye);}F.appendChild($);const Q=x("div",{style:"display: flex; gap: 8px;"}),re=vt({label:"Cancel",variant:"default",onClick:()=>{l?.(),Z();}});Q.appendChild(re);const le=vt({label:"Save",variant:"primary",disabled:!se(),onClick:q});return E=le,Q.appendChild(le),F.appendChild(Q),F}function se(){return !(!u.trim()||!p&&!A&&!L)}function ae(){E&&(E.disabled=!se());}function ne(){P?.update({ruleMode:f,sizeEnabled:p,sizePercentage:m,sizeMode:b,colorEnabled:A,colorMutations:M,weatherEnabled:L,weatherMutations:D,weatherMatchMode:z});}function q(){if(!se())return;const F={name:u.trim(),ruleMode:f};p&&(F.sizeCondition={enabled:true,minPercentage:m,sizeMode:b});const $=[];L&&$.push(...D),A&&$.push(...M),$.length>0&&(F.mutationCondition={enabled:true,mutations:$,matchMode:z}),i(F),Z();}function Z(){O?.destroy(),T?.destroy(),R?.destroy(),P?.destroy(),C?.destroy(),B?.destroy(),O=null,T=null,R=null,P=null,C=null,E=null,B=null;}return {root:B.root,destroy:Z}}function lL(e){const{species:t,existingRules:n,onSelect:r}=e;let o=null;const i=u(),a=f();o=zu({title:l(),subtitle:"Select a rule to assign to this species",content:i,footer:a,size:"md",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{}});function l(){const g=x("div",{style:"display: flex; align-items: center; gap: 10px;"}),A=x("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});return kl(t,A,{size:24}),g.appendChild(A),g.appendChild(x("span",{},`${t} — Assign Rule`)),g}function u(){const g=x("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(n.length===0){const A=x("div",{style:"padding: 20px; text-align: center; color: var(--muted); font-size: 14px;"},"No overall rules available");g.appendChild(A);}else n.forEach(A=>{g.appendChild(p(A));});return g}function f(){const g=x("div",{style:"display: flex; gap: 8px; justify-content: flex-end;"}),A=vt({label:"Cancel",variant:"default",onClick:()=>{y();}});return g.appendChild(A),g}function p(g){const A=x("div",{className:"harvest-locker-rule-item",style:"flex-direction: column; align-items: flex-start; gap: 8px;"});A.addEventListener("click",()=>{zt.cloneRuleToSpecies(g.id,t),r(g.id),y();});const M=x("div",{style:"display: flex; align-items: center; justify-content: space-between; width: 100%;"});M.appendChild(x("div",{className:"harvest-locker-rule-item__name"},g.name)),M.appendChild(x("div",{className:"harvest-locker-rule-item__badge"},g.mode)),A.appendChild(M);const I=m(g);return I.childNodes.length>0&&A.appendChild(I),A}function m(g){const A=x("div",{style:"display: flex; flex-wrap: wrap; gap: 4px;"});return g.sizeCondition?.enabled&&A.appendChild(b(`Size ≥ ${g.sizeCondition.minPercentage}%`)),g.mutationCondition?.enabled&&g.mutationCondition.mutations.forEach(M=>{A.appendChild(b(M==="none"?"Normal":M));}),A}function b(g){return x("div",{style:`
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 500;
                color: color-mix(in oklab, var(--fg) 75%, transparent);
                background: color-mix(in oklab, var(--fg) 8%, transparent);
                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
            `},g)}function y(){o?.destroy(),o=null;}return {root:o.root,destroy:y}}const cL={ui:{harvestLockerMode:"overall",selectedSpecies:null,searchQuery:"",harvestLockerExpanded:true,eggLockerExpanded:true,decorLockerExpanded:true}};let co=null,Sc=null;async function dL(){return co||(Sc||(Sc=Hr("tab-locker",{version:1,defaults:cL,sanitize:e=>({ui:{harvestLockerMode:e.ui?.harvestLockerMode==="bySpecies"?"bySpecies":"overall",selectedSpecies:typeof e.ui?.selectedSpecies=="string"?e.ui.selectedSpecies:null,searchQuery:typeof e.ui?.searchQuery=="string"?e.ui.searchQuery:"",harvestLockerExpanded:typeof e.ui?.harvestLockerExpanded=="boolean"?e.ui.harvestLockerExpanded:true,eggLockerExpanded:typeof e.ui?.eggLockerExpanded=="boolean"?e.ui.eggLockerExpanded:true,decorLockerExpanded:typeof e.ui?.decorLockerExpanded=="boolean"?e.ui.decorLockerExpanded:true}})})),co=await Sc,co)}function er(){if(!co)throw new Error("[LockerState] State not initialized. Call initLockerState() first.");return co}function uL(e){const t=er();t.update({ui:{...t.get().ui,harvestLockerMode:e}});}function pL(e){const t=er();t.update({ui:{...t.get().ui,selectedSpecies:e}});}function fL(e){const t=er();t.update({ui:{...t.get().ui,searchQuery:e}});}function hL(e){const t=er();t.update({ui:{...t.get().ui,harvestLockerExpanded:e}});}function mL(e){const t=er();t.update({ui:{...t.get().ui,eggLockerExpanded:e}});}function gL(e){const t=er();t.update({ui:{...t.get().ui,decorLockerExpanded:e}});}function bL(e={}){let t=e.defaultMode??"overall",n=e.defaultSelectedSpecies??null,r=[],o=null,i=null,a=null,l=null,u=null,f=null;const p=[];o=m();function m(){const E=x("div",{className:"harvest-locker-card-wrapper"});i=x("div",{className:"harvest-locker-card__mode-container"}),E.appendChild(i),a=x("div",{className:"harvest-locker-card__content"}),E.appendChild(a);const B=ct({title:"Crop Harvest",subtitle:"Prevent harvesting specific crops",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},E);return b(),g(),y(),B}function b(){t==="overall"?r=zt.getOverallRules():r=n?zt.getSpeciesRules(n):[];}function y(){a&&(a.replaceChildren(),t==="bySpecies"&&(A(),n&&M()),I(),D());}function g(){if(i){if(!l){l=zo({segments:[{id:"overall",label:"Overall"},{id:"bySpecies",label:"By Species"}],selected:t,onChange:E=>{t=E,uL(t),b(),y();}}),i.appendChild(l);return}l.getSelected()!==t&&l.select(t);}}function A(){if(!a)return;const E=Te.get("plants");if(!E||Object.keys(E).length===0){const U=x("div",{className:"harvest-locker-card__message harvest-locker-card__message--compact"},"No species available");a.appendChild(U);return}const B=zt.getConfig(),j={};Object.entries(B.speciesRules).forEach(([U,ce])=>{j[U]=ce.length;}),u=XM({selectedSpecies:n??void 0,placeholder:"Search plants...",speciesRuleCount:j,onChange:U=>{n=U,pL(U),b(),y();},onSearchChange:U=>{fL(U);}});const V=x("div",{className:"harvest-locker-card__control"});V.appendChild(u.root),a.appendChild(V);}function M(){if(!a||!n)return;const E=x("div",{className:"harvest-locker-card__species-section-header"}),B=x("div",{className:"harvest-locker-card__species-section-sprite"});kl(n,B,{size:36}),E.appendChild(B);const j=x("div",{className:"harvest-locker-card__species-section-text"}),V=x("div",{className:"harvest-locker-card__species-section-name"},n);j.appendChild(V);const U=x("div",{className:"harvest-locker-card__species-section-label"},"SELECTED");j.appendChild(U),E.appendChild(j),a.appendChild(E);}function I(){if(!a)return;if(t==="bySpecies"&&!n){const U=x("div",{className:"harvest-locker-card__message"},"Select a species to view and manage rules");a.appendChild(U);return}const E=x("div",{className:"harvest-locker-card__rules-section"}),B=x("div",{className:"harvest-locker-card__rules-section-label"},"Rules");if(E.appendChild(B),r.length===0){const U=x("div",{className:"harvest-locker-card__empty"},"No rules yet");E.appendChild(U),a.appendChild(E);return}const j=x("div",{className:"harvest-locker-card__list"});r.forEach(U=>{const ce=L(U);j.appendChild(ce);}),E.appendChild(j);const V=x("div",{className:"harvest-locker-card__rules-hint"});V.appendChild(x("span",{className:"harvest-locker-card__rules-hint--desktop"},"Click to edit · Right-click to delete")),V.appendChild(x("span",{className:"harvest-locker-card__rules-hint--mobile"},"Tap to edit · Long-press to delete")),E.appendChild(V),a.appendChild(E);}function L(E){const B=x("div",{className:"harvest-locker-rule-item"}),j=x("div",{className:"harvest-locker-rule-item__name"},E.name);B.appendChild(j);const V=x("div",{className:"harvest-locker-rule-item__badge"},E.mode);B.appendChild(V),B.addEventListener("contextmenu",Y=>{Y.preventDefault(),T(E.id);});let U=null,ce=false;return B.addEventListener("touchstart",()=>{ce=false,U=window.setTimeout(()=>{ce=true,T(E.id),navigator.vibrate&&navigator.vibrate(50);},500);}),B.addEventListener("touchend",()=>{U&&(clearTimeout(U),U=null),ce||O(E);}),B.addEventListener("touchmove",()=>{U&&(clearTimeout(U),U=null);}),B.addEventListener("click",()=>{O(E);}),B}function D(){if(!a||t==="bySpecies"&&!n)return;const E=x("div",{className:"harvest-locker-card__actions"});if(t==="bySpecies"&&n){const B=zt.getOverallRules();if(B.length>0){const j=zt.getSpeciesRules(n),V=new Set(j.map(Y=>qa(Y))),U=B.filter(Y=>!V.has(qa(Y))),ce=vt({label:"Add Existing Rule",variant:"default",disabled:U.length===0,onClick:()=>R()});E.appendChild(ce);}}f=vt({label:t==="bySpecies"?"Create Override Rule":"Create Rule",variant:"primary",onClick:()=>z()}),E.appendChild(f),a.appendChild(E);}function z(){ch({mode:t==="overall"?"overall":"species",species:n,onSave:E=>{t==="overall"?zt.addNewOverallRule(E.name,E.ruleMode,E.sizeCondition,E.mutationCondition):n&&zt.addNewSpeciesRule(n,E.name,E.ruleMode,E.sizeCondition,E.mutationCondition),b(),y();}});}function O(E){ch({mode:t==="overall"?"overall":"species",species:n,ruleId:E.id,initialData:{name:E.name,ruleMode:E.mode,sizeCondition:E.sizeCondition,mutationCondition:E.mutationCondition},onSave:B=>{zt.modifyRule(E.id,{name:B.name,mode:B.ruleMode,sizeCondition:B.sizeCondition,mutationCondition:B.mutationCondition}),b(),y();},onDelete:()=>{T(E.id);}});}function T(E){zt.removeRule(E),b(),y();}function R(){if(t!=="bySpecies"||!n)return;const E=zt.getOverallRules();if(E.length===0)return;const B=zt.getSpeciesRules(n),j=new Set(B.map(U=>qa(U))),V=E.filter(U=>!j.has(qa(U)));V.length!==0&&lL({species:n,existingRules:V,onSelect:()=>{b(),y();}});}function P(){b(),g(),y();}function C(){p.forEach(E=>E()),p.length=0,l?.destroy?.(),l=null,u?.destroy?.(),u=null,f=null,i=null,a=null,o=null;}return {root:o,render:P,destroy:C}}class vL{constructor(t={}){ve(this,"handle",null);ve(this,"options");this.options=t;}build(){return this.handle||(this.handle=bL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const yL=`
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
`;function xL(e){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.innerHTML=e?'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>':'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',t}async function wL(e,t,n){if(!$e.isReady()){t.appendChild(Xa(n));return}try{const o=Te.get("eggs")?.[e]?.spriteId;if(!o){t.appendChild(Xa(n));return}const i=await $e.toCanvas(o,{boundsMode:"padded"});i?(i.style.maxWidth=`${n}px`,i.style.maxHeight=`${n}px`,i.style.width="auto",i.style.height="auto",i.style.display="block",t.appendChild(i)):t.appendChild(Xa(n));}catch{t.appendChild(Xa(n));}}function Xa(e){return x("div",{style:`width:${e}px;height:${e}px;background:color-mix(in oklab, var(--accent) 20%, transparent);border-radius:6px;`})}function CL(e={}){let t=null,n=null;n=r();function r(){return t=x("div",{className:"egg-locker-card__wrapper"}),o(),ct({title:"Egg Hatching",subtitle:"Prevent hatching specific eggs",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t)}function o(){if(!t)return;t.replaceChildren();const u=cr.getAvailableEggs();if(u.length===0){t.appendChild(x("div",{className:"egg-locker-card__empty"},"No eggs available"));return}const f=new Set(cr.getBlockedEggs()),p=Te.get("eggs"),m=x("div",{className:"egg-locker-card__grid"});for(const b of u){const y=p?.[b]?.name??b;m.appendChild(i(b,f.has(b),y));}t.appendChild(m);}function i(u,f,p){const m=x("div",{className:"egg-locker-item"+(f?" egg-locker-item--locked":"")}),b=x("div",{className:"egg-locker-item__sprite"});wL(u,b,48),m.appendChild(b),m.appendChild(x("div",{className:"egg-locker-item__name"},p));const y=x("div",{className:"egg-locker-item__lock"+(f?" egg-locker-item__lock--locked":"")});return y.appendChild(xL(f)),m.appendChild(y),m.addEventListener("click",()=>{f?cr.unblockEgg(u):cr.blockEgg(u),o();}),m}function a(){o();}function l(){t=null,n=null;}return {root:n,render:a,destroy:l}}class kL{constructor(t={}){ve(this,"handle",null);ve(this,"options");this.options=t;}build(){return this.handle||(this.handle=CL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const SL=`
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
`;function AL(e={}){let t=null,n=null,r=null,o=null;const i=[];n=a();function a(){t=x("div",{className:"decor-locker-card__wrapper",style:"display: flex; flex-direction: column; gap: 16px;"}),l();const p=ct({title:"Decor Pickup",subtitle:"Prevent decor pickups",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t),m=()=>u();return window.addEventListener(ht.DECOR_LOCKER_LOCKS_UPDATED,m),i.push(()=>window.removeEventListener(ht.DECOR_LOCKER_LOCKS_UPDATED,m)),p}function l(){if(!t)return;const p=dr.getAvailableDecors().length,b=dr.getBlockedDecors().length===p&&p>0;if(r)r.setChecked(b,true),o&&(o.textContent=b?"Decors Unpickable":"Decors Pickable");else {t.replaceChildren();const y=x("div",{style:`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: color-mix(in oklab, var(--accent) 10%, transparent);
                    border-radius: 8px;
                `});o=x("div",{style:"font-size: 14px; font-weight: 500;"},b?"Decors Unpickable":"Decors Pickable"),r=fr({checked:b,size:"md",onChange:g=>{g?dr.blockAllDecors():dr.unblockAllDecors();}}),i.push(()=>r?.destroy()),y.appendChild(o),y.appendChild(r.root),t.appendChild(y);}}function u(){l();}function f(){i.forEach(p=>p()),i.length=0,t=null,n=null;}return {root:n,render:u,destroy:f}}class EL{constructor(t={}){ve(this,"handle",null);ve(this,"options");this.options=t;}build(){return this.handle||(this.handle=AL(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const _L=`
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
`;class IL extends mr{constructor(){super({id:"tab-locker",label:"Locker"});ve(this,"harvestLockerCardPart",null);ve(this,"eggLockerCardPart",null);ve(this,"decorLockerCardPart",null);}async preload(){await dL();}build(n){const r=n.getRootNode();tn(r,yL,"harvest-locker-card-styles"),tn(r,_L,"plant-selector-styles"),tn(r,SL,"egg-locker-card-styles");const o=this.createGrid("12px");o.id="locker",n.appendChild(o),this.initializeHarvestLockerCardPart(o),this.initializeEggLockerCardPart(o),this.initializeDecorLockerCardPart(o);}render(n){const r=this.harvestLockerCardPart,o=this.eggLockerCardPart,i=this.decorLockerCardPart;this.harvestLockerCardPart=null,this.eggLockerCardPart=null,this.decorLockerCardPart=null,super.render(n),this.harvestLockerCardPart=r,this.eggLockerCardPart=o,this.decorLockerCardPart=i;}destroy(){this.harvestLockerCardPart&&(this.harvestLockerCardPart.destroy(),this.harvestLockerCardPart=null),this.eggLockerCardPart&&(this.eggLockerCardPart.destroy(),this.eggLockerCardPart=null),this.decorLockerCardPart&&(this.decorLockerCardPart.destroy(),this.decorLockerCardPart=null);}initializeHarvestLockerCardPart(n){if(!this.harvestLockerCardPart){const o=er();this.harvestLockerCardPart=new vL({defaultExpanded:o.get().ui.harvestLockerExpanded,defaultMode:o.get().ui.harvestLockerMode,defaultSelectedSpecies:o.get().ui.selectedSpecies,defaultSearchQuery:o.get().ui.searchQuery,onExpandChange:hL});}const r=this.harvestLockerCardPart.build();n.appendChild(r),this.harvestLockerCardPart.render();}initializeEggLockerCardPart(n){if(!this.eggLockerCardPart){const o=er();this.eggLockerCardPart=new kL({defaultExpanded:o.get().ui.eggLockerExpanded,onExpandChange:mL});}const r=this.eggLockerCardPart.build();n.appendChild(r),this.eggLockerCardPart.render();}initializeDecorLockerCardPart(n){if(!this.decorLockerCardPart){const o=er();this.decorLockerCardPart=new EL({defaultExpanded:o.get().ui.decorLockerExpanded,onExpandChange:gL});}const r=this.decorLockerCardPart.build();n.appendChild(r),this.decorLockerCardPart.render();}}let Ac=null,Ec=null,_c=null;function TL(){return Ac||(Ac=new jE),Ac}function Ev(){return Ec||(Ec=new vM),Ec}function _v(){return _c||(_c=new IL),_c}function PL(e){return [new A0(e),new fP,Ev(),new EP(e),new OM,new KM(e),_v()]}async function ML(){const e=Ev(),t=_v(),n=TL();await Promise.all([e.preload(),t.preload(),n.preload()]);}function LL(e){const{shadow:t,initialOpen:n}=e,r=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=x("div",{className:"gemini-tabbar"}),i=x("div",{className:"gemini-content",id:"content"}),a=x("div",{className:"gemini-resizer",title:"Resize"}),l=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const u=x("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:i,resizer:a,closeButton:l,wrapper:u}}function RL(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:l}=e;let u=a,f=l;function p(){const z=Rt.detect(),O=Math.round(fe.visualViewport?.width??fe.innerWidth??0);if(z.platform==="mobile"||z.os==="ios"||z.os==="android"){const T=getComputedStyle(r.host),R=parseFloat(T.getPropertyValue("--inset-l"))||0,P=parseFloat(T.getPropertyValue("--inset-r"))||0,C=Math.max(280,O-Math.round(R+P));u=280,f=C;}else u=a,f=l;return {min:u,max:f}}function m(z){return Math.max(u,Math.min(f,Number(z)||i))}function b(z){const O=m(z);n.style.setProperty("--w",`${O}px`),o(O);}p();const y=Rt.detect(),g=!(y.platform==="mobile"||y.os==="ios"||y.os==="android");let A=false;const M=z=>{if(!A)return;z.preventDefault();const O=Math.round(fe.innerWidth-z.clientX);b(O);},I=()=>{A&&(A=false,document.body.style.cursor="",fe.removeEventListener("mousemove",M),fe.removeEventListener("mouseup",I));},L=z=>{g&&(z.preventDefault(),A=true,document.body.style.cursor="ew-resize",fe.addEventListener("mousemove",M),fe.addEventListener("mouseup",I));};t.addEventListener("mousedown",L);function D(){t.removeEventListener("mousedown",L),fe.removeEventListener("mousemove",M),fe.removeEventListener("mouseup",I);}return {calculateResponsiveBounds:p,constrainWidthToLimits:m,setHudWidth:b,destroy:D}}function FL(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(u){const f=t.classList.contains("open");if(i&&u.key==="Escape"&&f){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function l(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:l}}const OL=`
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
`,DL=`
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
`,NL=`
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
`,$L=`
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
`,BL=`
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
  
`,zL=`
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
`,jL=`
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
`,GL=`
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
`,UL=`
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
`,WL=`
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
`,HL=`
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
`,VL=`
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
`,KL=`
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
`,YL=`
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
`,qL=`
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
`,XL=`
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
`,QL=`
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
`,JL=`
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
`,ZL=`
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
`,eR=`
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
`,tR=`
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
`,nR=`
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
`,rR=`
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
`,oR=`
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
`,iR={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function aR(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,iR),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function sR(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function lR(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:l,onThemeChange:u,buildSections:f,initialTab:p,onTabChange:m,toggleCombo:b=re=>re.ctrlKey&&re.shiftKey&&re.key.toLowerCase()==="u",closeOnEscape:y=true,minWidth:g=420,maxWidth:A=720}=e,{host:M,shadow:I}=aR(t),L=[[DL,"variables"],[NL,"primitives"],[$L,"utilities"],[OL,"hud"],[BL,"card"],[vv,"badge"],[zL,"button"],[KL,"checkbox"],[jL,"input"],[GL,"label"],[UL,"navTabs"],[WL,"searchBar"],[HL,"select"],[VL,"switch"],[YL,"table"],[qL,"teamListItem"],[XL,"timeRangePicker"],[QL,"tooltip"],[JL,"slider"],[ZL,"reorderableList"],[eR,"colorPicker"],[tR,"log"],[nR,"segmentedControl"],[rR,"soundPicker"],[oR,"settings"],[bv,"teamCard"],[Mg,"autoFavoriteSettings"]];for(let re=0;re<L.length;re++){const[le,ye]=L[re];tn(I,le,ye),re%5===4&&await sR();}const{panel:D,tabbar:z,content:O,resizer:T,closeButton:R,wrapper:P}=LL({shadow:I,initialOpen:r});function C(re){D.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:re},bubbles:true})),i?.(re);}function E(re){const le=D.classList.contains("open");D.classList.toggle("open",re),D.setAttribute("aria-hidden",re?"false":"true"),re!==le&&C(re);}E(r),R.addEventListener("click",re=>{re.preventDefault(),re.stopPropagation(),E(false);});const B=v0({host:M,themes:a,initialTheme:l,onThemeChange:u}),j=RL({resizer:T,host:M,shadow:I,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:A});j.setHudWidth(n);const V=f({applyTheme:B.applyTheme,initialTheme:l,getCurrentTheme:B.getCurrentTheme,setHUDWidth:j.setHudWidth,setHUDOpen:E}),U=new yy(V,O,{applyTheme:B.applyTheme,getCurrentTheme:B.getCurrentTheme}),ce=V.map(re=>({id:re.id,label:re.label})),Y=p&&V.some(re=>re.id===p)?p:ce[0]?.id||"",ie=vy(ce,Y,re=>{U.activate(re),m?.(re);});ie.root.style.flex="1 1 auto",ie.root.style.minWidth="0",z.append(ie.root,R);const se={"tab-auto-favorite":"autoFavorite","tab-pets":"pets","tab-locker":"locker","tab-alerts":"alerts","tab-avatar":"avatar","tab-room":"room"};function ae(){const re=rt(ft.CONFIG,{autoFavorite:{enabled:true},pets:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true}});for(const[le,ye]of Object.entries(se))re[ye]?.enabled??true?ie.showTab(le):ie.hideTab(le);}function ne(re){const{key:le}=re.detail;(le===ft.CONFIG||le==="feature:config")&&ae();}window.addEventListener(ht.STORAGE_CHANGE,ne),ae();let q=Y;if(!ie.isTabVisible(Y)){const re=ie.getVisibleTabs();re.length>0&&(q=re[0]);}q&&U.activate(q);const Z=FL({panel:D,onToggle:()=>E(!D.classList.contains("open")),onClose:()=>E(false),toggleCombo:b,closeOnEscape:y}),F=()=>{ie.recalc();const re=parseInt(getComputedStyle(M).getPropertyValue("--w"))||n;j.calculateResponsiveBounds(),j.setHudWidth(re);};fe.addEventListener("resize",F);const $=re=>{const le=re.detail?.width;le?j.setHudWidth(le):j.setHudWidth(n),ie.recalc();};M.addEventListener("gemini:layout-resize",$);function Q(){window.removeEventListener(ht.STORAGE_CHANGE,ne),Z.destroy(),j.destroy(),fe.removeEventListener("resize",F),M.removeEventListener("gemini:layout-resize",$);}return {host:M,shadow:I,wrapper:P,panel:D,content:O,setOpen:E,setWidth:j.setHudWidth,sections:V,manager:U,nav:ie,destroy:Q}}const uo={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},hi={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function cR(){return {isOpen:rt(uo.isOpen,hi.isOpen),width:rt(uo.width,hi.width),theme:rt(uo.theme,hi.theme),activeTab:rt(uo.activeTab,hi.activeTab)}}function Qa(e,t){st(uo[e],t);}function dR(e,t){return rt(uo[e],t)}const uR="https://i.imgur.com/IMkhMur.png",pR="Stats";function fR(e){let t=e.iconUrl||uR;const n=e.ariaLabel||"Open Gemini";let r=null,o=null,i=null,a=false,l=null,u=null;const f=["Chat","Leaderboard","Stats","Open Activity Log"],p=O=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(O):O.replace(/"/g,'\\"')}catch{return O}};function m(){const O=document.querySelector(f.map(R=>`button[aria-label="${p(R)}"]`).join(","));if(!O)return null;let T=O.parentElement;for(;T&&T!==document.body;){if(f.reduce((P,C)=>P+T.querySelectorAll(`button[aria-label="${p(C)}"]`).length,0)>=2)return T;T=T.parentElement;}return null}function y(O){const T=Array.from(O.querySelectorAll("button[aria-label]"));if(!T.length)return {refBtn:null,refWrapper:null};const R=T.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),P=R.length?R:T,C=P.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===pR.toLowerCase())||null,E=P.length>=2?P.length-2:P.length-1,B=C||P[E],j=B.parentElement,V=j&&j.parentElement===O&&j.tagName==="DIV"?j:null;return {refBtn:B,refWrapper:V}}function g(O,T,R){const P=O.cloneNode(false);P.type="button",P.setAttribute("aria-label",T),P.title=T,P.dataset.mghBtn="true",P.style.pointerEvents="auto",P.removeAttribute("id");const C=document.createElement("img");return C.src=R,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",P.appendChild(C),P.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();try{e.onClick?.();}catch{}}),P}function A(){if(a)return  false;a=true;let O=false;try{const T=m();if(!T)return !1;l!==T&&(l=T);const{refBtn:R,refWrapper:P}=y(T);if(!R)return !1;o=T.querySelector('div[data-mgh-wrapper="true"]'),!o&&P&&(o=P.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),O=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=g(R,n,t),o?o.appendChild(r):r.parentElement!==T&&T.appendChild(r),O=!0),o&&o.parentElement!==T&&(T.appendChild(o),O=!0);const E=T;if(E&&E!==u){try{D.disconnect();}catch{}u=E,D.observe(u,{childList:!0,subtree:!0});}return O}finally{a=false;}}const M=document.getElementById("App")||document.body;let I=null,L=false;const D=new MutationObserver(()=>{L&&r&&document.contains(r)||(r&&!document.contains(r)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),L=false,r=null,o=null),I===null&&(I=window.setTimeout(()=>{if(I=null,A()&&r&&document.contains(r)&&(L=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),o)){const T=o.parentElement;T&&T.lastElementChild!==o&&T.appendChild(o);}},100)));});return A()&&r&&document.contains(r)?(L=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),D.observe(M,{childList:true,subtree:true}),i=()=>D.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const Iv=[];function hR(){return Iv.slice()}function dh(e){Iv.push(e);}function mR(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function gR(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Ic=Symbol.for("ariesmod.ws.handlers.patched");function Pt(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return dh(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return dh(r),r}function bR(e,t=hR(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Ic])return ()=>{};e[Ic]=true;const i={ws:e,pageWindow:r,debug:o},a=m=>{for(const b of t)try{if(!b.match(m))continue;if(b.handle(m,i)===!0)return}catch(y){o&&console.error("[WS] handler error",y,m);}},l=m=>{const b=gR(m.data),y=mR(b);a({kind:"message",raw:m.data,data:b,type:y});},u=m=>{a({kind:"close",code:m.code,reason:m.reason,wasClean:m.wasClean,event:m});},f=m=>a({kind:"open",event:m}),p=m=>a({kind:"error",event:m});return e.addEventListener("message",l),e.addEventListener("close",u),e.addEventListener("open",f),e.addEventListener("error",p),()=>{try{e.removeEventListener("message",l);}catch{}try{e.removeEventListener("close",u);}catch{}try{e.removeEventListener("open",f);}catch{}try{e.removeEventListener("error",p);}catch{}try{delete e[Ic];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Pt(Sn.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Pt(Sn.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Pt(Sn.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Pt(Sn.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Pt(Sn.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Pt(Sn.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Pt(Sn.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Pt(Sn.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Pt(Sn.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Pt(Sn.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Pt(nr.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Pt(nr.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Pt(nr.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Pt(nr.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Pt(nr.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Pt(nr.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Pt(nr.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Pt(nr.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});Me(he.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));Me(he.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));Me(he.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));Me(he.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));Me(he.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));Me(he.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));Me(he.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));Me(he.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));Me(he.GrowEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] GrowEgg"),true));Me(he.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));Me(he.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));Me(he.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));Me(he.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));Me(he.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));Me(he.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));Me(he.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));Me(he.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));Me(he.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));Me(he.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));Me(he.ToggleLockItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleLockItem"),true));Me(he.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));Me(he.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));Me(he.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));Me(he.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));Me(he.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));Me(he.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));Me(he.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));Me(he.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));Me(he.SwapPetFromStorage,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPetFromStorage"),true));Me(he.PickupPet,(e,t)=>(t.debug&&console.log("[MW][Pets] PickupPet"),true));Me(he.MovePetSlot,(e,t)=>(t.debug&&console.log("[MW][Pets] MovePetSlot"),true));Me(he.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));Me(he.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));Me(he.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));Me(he.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));Me(he.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));Me(he.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));Me(he.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));Me(he.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));Me(he.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));Me(he.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));Me(he.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));Me(he.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));Me(he.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));Me(he.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));Me(he.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));Me(he.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function vR(e={}){const t=e.pageWindow??fe,n=e.pollMs??500,r=!!e.debug,o=[];o.push(JS(t,{debug:r})),o.push(aT({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=l=>{if(i){try{i();}catch{}i=null;}l&&(i=bR(l,e.handlers,{debug:r,pageWindow:t}));};return a(_s(t).ws),o.push(Zm(l=>a(l.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>_s(t).ws,dispose:()=>{for(let l=o.length-1;l>=0;l--)try{o[l]();}catch{}if(i){try{i();}catch{}i=null;}}}}let Ja=null;function yR(e={}){return Ja||(Ja=vR(e),Ja)}const xR=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,wR=`
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
`;let uh=false;function CR(){if(uh)return;uh=true;const e=document.createElement("style");e.textContent=wR,document.head.appendChild(e);}const ph=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],fh=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function kR(){const e=document.querySelector(ph.map(n=>`button[aria-label="${fh(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(ph.reduce((r,o)=>r+t.querySelectorAll(`button[aria-label="${fh(o)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function SR(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(l=>l.dataset.alertBtn!=="true"&&(l.getAttribute("aria-label")||"")!=="Alerts"),r=n.length?n:t,o=r[r.length-1]||null,i=o?.parentElement,a=i&&i.parentElement===e&&i.tagName==="DIV"?i:null;return {refBtn:o,refWrapper:a}}function AR(e,t,n){const r=e.cloneNode(false);r.type="button",r.setAttribute("aria-label",t),r.title=t,r.dataset.alertBtn="true",r.style.pointerEvents="auto",r.style.position="relative",r.removeAttribute("id");const o=document.createElement("div");return o.innerHTML=n,o.dataset.alertIcon="true",o.style.pointerEvents="none",o.style.userSelect="none",o.style.width="76%",o.style.height="76%",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.margin="auto",r.appendChild(o),r}function ER(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function _R(e){CR();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:xR,n=e.ariaLabel||"Alerts";let r=null,o=null,i=null,a=null,l=false,u=null,f=null,p=null;function m(){if(l)return  false;l=true;let I=false;try{const L=kR();if(!L)return !1;u!==L&&(u=L);const{refBtn:D,refWrapper:z}=SR(L);if(!D)return !1;o=L.querySelector('div[data-alert-wrapper="true"]'),!o&&z&&(o=z.cloneNode(!1),o.dataset.alertWrapper="true",o.removeAttribute("id"),I=!0);const O=o?.querySelector('button[data-alert-btn="true"]')||null;r||(r=O),r||(r=AR(D,n,t),r.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation();try{e.onClick?.();}catch{}}),i=ER(),r.appendChild(i),o?o.appendChild(r):r.parentElement!==L&&L.appendChild(r),I=!0),o&&o.parentElement!==L&&(L.appendChild(o),I=!0);const T=L;if(T&&T!==f){try{A.disconnect();}catch{}f=T,A.observe(f,{childList:!0,subtree:!0});}return I}finally{l=false;}}const b=document.getElementById("App")||document.body;let y=null,g=false;const A=new MutationObserver(()=>{g&&r&&document.contains(r)||(r&&!document.contains(r)&&(g=false,r=null,i=null,o=null),y===null&&(y=window.setTimeout(()=>{if(y=null,m()&&r&&document.contains(r)&&(g=true,o)){const L=o.parentElement;L&&L.lastElementChild!==o&&L.appendChild(o);}},100)));});return m()&&r&&document.contains(r)&&(g=true),A.observe(b,{childList:true,subtree:true}),a=()=>A.disconnect(),{get root(){return r},updateBadge(I){i&&(I>0?(i.textContent=String(I),i.style.display="flex"):i.style.display="none");},ring(){if(!r)return;const I=r.querySelector('[data-alert-icon="true"]');I&&(I.classList.add("alert-btn-ringing"),setTimeout(()=>{I?.classList.remove("alert-btn-ringing");},600));},startRinging(){r&&(p!==null&&clearInterval(p),this.ring(),p=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(p!==null&&(clearInterval(p),p=null),r){const I=r.querySelector('[data-alert-icon="true"]');I&&I.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{a?.();}catch{}try{o?.remove();}catch{}}}}const IR=`
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
`;async function TR(e,t){const n=x("div",{className:"alert-item-row"}),r=x("div",{className:"alert-item-sprite"});if(e.spriteId)try{const f=await $e.toCanvas(e.spriteId,{scale:.35});f?r.appendChild(f):r.textContent="?";}catch{r.textContent="?";}else r.textContent="?";const o=x("div",{className:"alert-item-info"}),i=x("div",{className:"alert-item-name"},e.itemName),a=x("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);o.appendChild(i),o.appendChild(a);const l=x("div",{className:"alert-item-actions"}),u=x("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return u.addEventListener("click",f=>{f.stopPropagation(),t?.(e);}),l.appendChild(u),n.appendChild(r),n.appendChild(o),n.appendChild(l),n}function PR(){const e=x("div",{className:"alert-overlay-empty"}),t=x("div",{className:"alert-overlay-empty-icon"},"🔔"),n=x("div",{className:"alert-overlay-empty-text"},"No items available"),r=x("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(r),e}function hh(e,t){const n=t.getBoundingClientRect(),r=340,o=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let i=n.bottom+o,a=window.innerWidth-n.right;const l=i+480>window.innerHeight,u=n.right-r<o;l?(e.style.bottom=`${window.innerHeight-n.top+o}px`,e.style.top="auto"):e.style.top=`${i}px`,e.style.right=`${a}px`,u&&(e.style.right="auto",e.style.left=`${o}px`);}function MR(e){const{items:t,anchorElement:n,onClose:r,onBuyAll:o}=e,i=x("div",{className:"alert-overlay"}),a=dR("theme",hi.theme),l=po[a];let u="";l&&(u=`.alert-overlay {
    ${Object.entries(l).map(([L,D])=>`${L}: ${D};`).join(`
    `)}
  }

`);const f=document.createElement("style");f.textContent=u+IR,i.appendChild(f);const p=x("div",{className:"alert-overlay-header"}),m=x("div",{className:"alert-overlay-title"},"Available Items"),b=x("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");b.addEventListener("click",I=>{I.stopPropagation(),r?.();}),p.appendChild(m),p.appendChild(b);const y=x("div",{className:"alert-overlay-list"});i.appendChild(p),i.appendChild(y);const g=async I=>{if(y.replaceChildren(),I.length===0)y.appendChild(PR());else for(const L of I){const D=await TR(L,o);y.appendChild(D);}};g(t),hh(i,n);const A=()=>{hh(i,n);};window.addEventListener("resize",A);const M=I=>{const L=I.target;!i.contains(L)&&!n.contains(L)&&r?.();};return document.addEventListener("click",M,{capture:true}),{root:i,updateItems:g,destroy(){window.removeEventListener("resize",A),document.removeEventListener("click",M,{capture:true}),i.remove();}}}const LR={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},RR={seed:"seed",tool:null,egg:null,decor:null};function Tv(e,t,n){try{const r=LR[t],o=Te.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=RR[t],l=a?i[a]:i;return !l||typeof l!="object"?null:l[n]??null}catch{return null}}function FR(e,t){return Tv(e,t,"spriteId")}function OR(e,t){return Tv(e,t,"name")??e}function DR(e,t){const n=Wr.getTrackedItems(),r=new Set(n.filter(i=>i.shopType===e).map(i=>i.itemId));return r.size===0?[]:t.items.filter(i=>{const a=r.has(i.id),l=i.isAvailable;return a&&l}).map(i=>({shopType:e,itemId:i.id,itemName:OR(i.id,e),spriteId:FR(i.id,e),remaining:i.remaining,price:i.price}))}function mi(){const t=No().get(),n=["seed","tool","egg","decor"],r=[];for(const o of n){const i=t.byType[o];if(i){const a=DR(o,i);r.push(...a);}}return r}function NR(e){return No().subscribeStable(()=>{const r=mi();e(r);})}function $R(){let e=null,t=null,n=null,r=false,o=[],i=[],a="",l=0,u=0,f=false,p=null,m=[],b=0,y=false;const g=()=>{try{return Ct.CustomSounds.getNotificationConfig("shop")}catch{return null}},A=(q,Z)=>{try{const F=Fe.getItemCustomSound("shop",q,Z);return F?{soundId:F.soundId,volume:F.volume,mode:F.mode}:null}catch{return null}},M=q=>`${q.soundId}:${q.volume}`,I=(q,Z,F,$)=>{Z.has(F)||(q.push({soundId:F,volume:$}),Z.add(F));},L=(q,Z)=>{const F=[],$=new Set;let Q=false;const re=[];for(const le of q){const ye=A(le.itemId,le.shopType);ye?ye.mode==="one-shot"&&re.push({soundId:ye.soundId,volume:ye.volume}):Z?.mode==="one-shot"&&(Q=true);}Q&&Z&&I(F,$,Z.soundId,Z.volume);for(const le of re)I(F,$,le.soundId,le.volume);return F},D=(q,Z)=>{const F=[],$=new Set;let Q=false;const re=[];for(const le of q){const ye=A(le.itemId,le.shopType);ye?ye.mode==="loop"&&re.push({soundId:ye.soundId,volume:ye.volume}):Z?.mode==="loop"&&(Q=true);}Q&&Z&&I(F,$,Z.soundId,Z.volume);for(const le of re)I(F,$,le.soundId,le.volume);return F},z=(q,Z,F,$=false)=>{if(!F())return;const Q=Fe.getById(q.soundId);if(!Q){Z();return}$&&(p=Q.source),Ct.playCustom(Q.source,{volume:q.volume/100}).then(re=>{if(!F())return;const le=re.audio,ye=()=>{F()&&Z();};le.addEventListener("ended",ye,{once:true});}).catch(()=>{F()&&Z();});},O=()=>{if(!f||i.length===0)return;const q=i[l];l=(l+1)%i.length;const Z=u,F=()=>f&&u===Z;z(q,()=>{F()&&O();},F,true);},T=()=>{f||i.length===0||(f=true,l>=i.length&&(l=0),O());},R=()=>{if(f){u+=1,f=false;try{const q=Ct.getCustomHandle();(!p||q&&q.url===p)&&Ct.CustomSounds.stop();}catch{}p=null;}},P=()=>{R(),i=[],a="",l=0,p=null;},C=()=>{if(m.length===0){y=false,T();return}y=true;const q=m.shift(),Z=b,F=()=>y&&b===Z;z(q,()=>{F()&&C();},F);},E=(q,Z)=>{const F=Z??g(),$=L(q,F);if($.length===0)return;const Q=new Set(m.map(re=>re.soundId));for(const re of $)Q.has(re.soundId)||(m.push(re),Q.add(re.soundId));y||(b+=1,R(),C());},B=(q,Z)=>{const F=Z??g(),$=D(q,F);if($.length===0){P();return}const Q=$.map(M).join("|"),re=Q!==a;i=$,a=Q,re&&(l=0,f&&R()),!y&&(f||T());},j=q=>{const Z=o.length>0,F=q.length>0;o=q,e?.updateBadge(q.length),F?Z||e?.startRinging():Z&&e?.stopRinging();},V=()=>{if(r||!e?.root)return;const q=mi();t=MR({items:q,anchorElement:e.root,onClose:U,onBuyAll:Z=>{switch(Z.shopType){case "seed":Lr.seed.buyAll(Z.itemId);break;case "egg":Lr.egg.buyAll(Z.itemId);break;case "decor":Lr.decor.buyAll(Z.itemId);break;case "tool":Lr.tool.buyAll(Z.itemId);break}}}),document.body.appendChild(t.root),r=true;},U=()=>{!r||!t||(t.destroy(),t=null,r=false);},ce=()=>{r?U():V();},Y=q=>{if(j(q),r&&t&&t.updateItems(q),B(q),q.length>0){const Z=new CustomEvent("gemini:alert-available",{detail:{items:q}});window.dispatchEvent(Z);}},ie=()=>{const q=mi(),Z=new Set(o.map(re=>`${re.shopType}:${re.itemId}`)),F=q.filter(re=>!Z.has(`${re.shopType}:${re.itemId}`)),$=F.length>0;j(q),r&&t&&t.updateItems(q);const Q=g();B(q,Q),$&&E(F,Q);};e=_R({onClick:ce,ariaLabel:"Alerts"}),n=NR(Y),window.addEventListener("gemini:tracked-items-changed",ie);const se=q=>{const Z=q,{shopType:F,items:$}=Z.detail;if(!$||$.length===0)return;const Q=$.map(re=>({itemId:re.itemId,shopType:F}));E(Q,g());};window.addEventListener("gemini:shop-restock-tracked",se);const ae=q=>{if(q.detail?.entityType!=="shop")return;const F=mi();B(F,g());};window.addEventListener(ht.CUSTOM_SOUND_CHANGE,ae);const ne=(q=1,Z=10)=>{if(No().get().all.some(re=>re.items.length>0)||q>=Z){const re=mi();j(re);const le=g();B(re,le),re.length>0&&E(re,le);}else setTimeout(()=>ne(q+1,Z),500);};return ne(),{destroy(){U(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",ie),window.removeEventListener("gemini:shop-restock-tracked",se),window.removeEventListener(ht.CUSTOM_SOUND_CHANGE,ae),e?.destroy(),e=null,m=[],b+=1,y=false,P();}}}function BR(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Zm(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),yR({debug:false}),()=>{t?.(),t=null;}}async function zR(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Yh(),await Dd({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function jR(e){e.logStep("Globals","Initializing global variables...");try{Ig(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function GR(e){e.logStep("API","Exposing Gemini API...");try{xM(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Tc(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function UR(e){e.logStep("HUD","Loading HUD preferences..."),await Tc();const t=cR();await Tc();const n=await lR({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Qa("width",r),onOpenChange:r=>Qa("isOpen",r),themes:po,initialTheme:t.theme,onThemeChange:r=>Qa("theme",r),buildSections:r=>PL({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Qa("activeTab",r)});return await Tc(),e.logStep("HUD","HUD ready","success"),n}async function WR(e){e.setSubtitle("Activating Gemini modules...");let t=0,n=0;await Tg(r=>{r.status==="start"?n++:r.status==="success"?(t++,e.logStep("Modules",`Loading modules... (${t}/${n})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${t}/${n}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${n}/${n})`,"success");}async function HR(e){try{$e.isReady()||await $e.init(),Te.resolveSprites();}catch(t){console.warn("[Bootstrap] Sprite init failed",t);}}async function VR(e){e.logStep("Sections","Preloading UI sections...");try{await ML(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function KR(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:bo.init.bind(bo)},{name:"PetTeam",init:ut.init.bind(ut)},{name:"XPTracker",init:sd.init.bind(sd)},{name:"CropValueIndicator",init:ls.init.bind(ls)},{name:"CropSizeIndicator",init:us.init.bind(us)},{name:"ShopNotifier",init:Wr.init.bind(Wr)},{name:"WeatherNotifier",init:Po.init.bind(Po)},{name:"PetHungerNotifier",init:Ui.init.bind(Ui)},{name:"AriesAPI",init:$s.init.bind($s)},{name:"HarvestLocker",init:zt.init.bind(zt)},{name:"EggLocker",init:cr.init.bind(cr)},{name:"DecorLocker",init:dr.init.bind(dr)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const r=Ah();r.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:ls.render,storageKey:ft.CROP_VALUE_INDICATOR,defaultEnabled:!1}),r.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:us.render,storageKey:ft.CROP_SIZE_INDICATOR,defaultEnabled:!1}),r.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(r){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",r);}}bx();(async function(){_y();const e=gy({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=BR(e),await zR(e),jR(e),GR(e),await WR(e),await Promise.all([(async()=>{KR(e);})(),(async()=>{await HR(e);})()]),await VR(e),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await UR(e);fR({onClick:()=>n.setOpen(true)}),$R();})();

})();