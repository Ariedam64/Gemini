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
  var zm=Object.defineProperty;var Gm=(e,t,n)=>t in e?zm(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var U=(e,t,n)=>Gm(e,typeof t!="symbol"?t+"":t,n);function m(e,t=null,...n){const o=document.createElement(e);for(const[r,a]of Object.entries(t||{}))a!=null&&(r==="style"?typeof a=="string"?o.setAttribute("style",a):typeof a=="object"&&Object.assign(o.style,a):r.startsWith("on")&&typeof a=="function"?o[r.toLowerCase()]=a:r in o?o[r]=a:o.setAttribute(r,String(a)));for(const r of n)r==null||r===false||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}const zr="https://i.imgur.com/k5WuC32.png",Oc="gemini-loader-style",an="gemini-loader",Lu=80;function Hm(){if(document.getElementById(Oc))return;const e=document.createElement("style");e.id=Oc,e.textContent=`
    /* ===== Loader Variables ===== */
    #${an} {
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
    #${an} {
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

    #${an}.gemini-loader--error .gemini-loader__actions {
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
    #${an}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${an}.gemini-loader--error .gemini-loader__spinner {
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
      #${an} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function Gr(e,t,n){const o=m("div",{className:`gemini-loader__log ${n}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>Lu;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function jm(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(zr);return}GM_xmlhttpRequest({method:"GET",url:zr,responseType:"blob",onload:t=>{const n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(zr),o.readAsDataURL(n);},onerror:()=>e(zr)});})}function Um(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Hm();const n=m("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=m("div",{className:"gemini-loader__logs"}),r=m("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=m("div",{className:"gemini-loader__spinner"},r);jm().then(b=>{r.src=b;});const i=m("div",{className:"gemini-loader__card"},m("div",{className:"gemini-loader__header"},a,m("div",{className:"gemini-loader__titles"},m("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=m("div",{id:an},i);(document.body||document.documentElement).appendChild(s);const l=m("div",{className:"gemini-loader__actions"},m("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);const d=b=>{n.textContent=b;},c=new Map,u=(b,h)=>{b.className=`gemini-loader__log ${h}`;};return {log:(b,h="info")=>Gr(o,b,h),logStep:(b,h,v="info")=>{const _=String(b||"").trim();if(!_){Gr(o,h,v);return}const k=c.get(_);if(k){k.el.lastElementChild&&(k.el.lastElementChild.textContent=h),k.tone!==v&&(u(k.el,v),k.tone=v);return}const w=m("div",{className:`gemini-loader__log ${v}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:h}));for(c.set(_,{el:w,tone:v}),o.appendChild(w);o.childElementCount>Lu;){const y=o.firstElementChild;if(!y)break;const S=Array.from(c.entries()).find(([,I])=>I.el===y)?.[0];S&&c.delete(S),y.remove();}o.scrollTop=o.scrollHeight;},setSubtitle:d,succeed:(b,h=600)=>{b&&Gr(o,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h);},fail:(b,h)=>{Gr(o,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h);}}}const $c=150,Wm=30;function Vm(e,t,n){const o=m("div",{className:"lg-pill",id:"pill"}),r=e.map(C=>{const A=m("button",{className:"lg-tab"},C.label);return A.setAttribute("data-target",C.id),A}),a=m("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),i=new Map(e.map(C=>[C.id,true])),s=new Map(r.map((C,A)=>[e[A].id,C]));function l(C){const A=document.createElementNS("http://www.w3.org/2000/svg","svg");A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("fill","none"),A.setAttribute("stroke","currentColor"),A.setAttribute("stroke-width","2"),A.setAttribute("stroke-linecap","round"),A.setAttribute("stroke-linejoin","round");const R=document.createElementNS("http://www.w3.org/2000/svg","polyline");return R.setAttribute("points",C==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),A.appendChild(R),A}const d=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(l("left"));const c=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});c.appendChild(l("right"));const p=m("div",{className:"lg-tabs-wrapper"},d,a,c);let f=0,g=0,x=false;function b(){const C=a.scrollLeft>0,A=a.scrollLeft<a.scrollWidth-a.clientWidth-1;d.classList.toggle("disabled",!C),c.classList.toggle("disabled",!A);}d.addEventListener("click",()=>{a.scrollBy({left:-$c,behavior:"smooth"}),setTimeout(b,300);}),c.addEventListener("click",()=>{a.scrollBy({left:$c,behavior:"smooth"}),setTimeout(b,300);}),a.addEventListener("wheel",C=>{Math.abs(C.deltaY)>Math.abs(C.deltaX)&&(C.preventDefault(),a.scrollLeft+=C.deltaY,b());},{passive:false});let h=0;a.addEventListener("touchstart",C=>{const A=C.touches[0];f=A.clientX,g=A.clientY,x=false,h=a.scrollLeft;},{passive:true}),a.addEventListener("touchmove",C=>{if(x)return;const A=C.touches[0],R=A.clientX-f,$=A.clientY-g;if(Math.abs($)>Math.abs(R)){x=true;return}Math.abs(R)>Wm&&(C.preventDefault(),a.scrollLeft=h-R);},{passive:false}),a.addEventListener("touchend",()=>{b();},{passive:true}),a.addEventListener("scroll",b,{passive:true});function v(C){const A=r.find(R=>R.dataset.target===C)||r[0];A&&requestAnimationFrame(()=>{const R=A.offsetLeft,$=A.offsetWidth;o.style.width=`${$}px`,o.style.transform=`translateX(${R}px)`;const Y=a.scrollLeft,B=Y,j=Y+a.clientWidth,N=R-12,O=R+$+12;N<B?a.scrollTo({left:N,behavior:"smooth"}):O>j&&a.scrollTo({left:O-a.clientWidth,behavior:"smooth"}),setTimeout(b,300);});}function _(){for(const[C,A]of i)if(A)return C;return null}function k(C){const A=s.get(C);if(A)if(i.set(C,false),A.style.display="none",S===C){const R=_();R&&I(R);}else y();}function w(C){const A=s.get(C);A&&(i.set(C,true),A.style.display="",y());}function y(){v(S),b();}let S=t||(e[0]?.id??"");function I(C){i.get(C)&&(S=C,r.forEach(A=>A.classList.toggle("active",A.dataset.target===C)),v(C),n(C));}return r.forEach(C=>C.addEventListener("click",()=>I(C.dataset.target))),queueMicrotask(()=>{v(S),b();}),{root:p,activate:I,recalc:y,getActive:()=>S,showTab:w,hideTab:k,isTabVisible:C=>i.get(C)??false,getVisibleTabs:()=>[...i.entries()].filter(([C,A])=>A).map(([C])=>C)}}class wn{constructor(t){U(this,"id");U(this,"label");U(this,"container",null);U(this,"cleanupFunctions",[]);U(this,"preloadedContent",null);U(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=m("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const o=n?`gemini-section ${n}`:"gemini-section";return m("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=m("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class qm{constructor(t,n,o){U(this,"sections");U(this,"activeId",null);U(this,"container");U(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const jt="gemini:",Xm={STATE:"hud:state",THEME:"hud:theme"},Km={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test"},Ym={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},Jm={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},ke={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config"},Qm={AUTO_RELOAD:"dev:auto-reload"},to={HUD:Xm,SECTION:Km,MODULE:Ym,GLOBAL:Jm,FEATURE:ke,DEV:Qm},qt={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change"};function Se(e,t){try{const n=e.startsWith(jt)?e:jt+e,o=GM_getValue(n);return o==null?t:typeof o=="string"?JSON.parse(o):o}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function _e(e,t){try{const n=e.startsWith(jt)?e:jt+e,o=e.startsWith(jt)?e.slice(jt.length):e,r=JSON.stringify(t);GM_setValue(n,r),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:o,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Zm(e){try{const t=e.startsWith(jt)?e:jt+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function eh(){try{const e="gemini:",t=[];for(let r=0;r<localStorage.length;r++){const a=localStorage.key(r);a&&a.startsWith(e)&&t.push(a);}for(const r of t)try{const a=localStorage.getItem(r);if(a!==null){const i=JSON.parse(a),s=r.slice(e.length);_e(s,i),console.log(`[Gemini Storage] Migrated key: ${r}`);}}catch(a){console.warn(`[Gemini Storage] Failed to migrate key "${r}":`,a);}const n="gemini.sections",o=GM_getValue(n);o!=null&&(_e("sections",o),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Ru="gemini.sections";function Nu(){const e=Se(Ru,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function th(e){_e(Ru,e);}async function nh(e){return Nu()[e]}function oh(e,t){const n=Nu();th({...n,[e]:t});}function Oa(e,t){return {...e,...t??{}}}async function rh(e){const t=await nh(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){oh(e.path,n);}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,r();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,r();}function l(){r();}return {get:a,set:i,update:s,save:l}}async function no(e,t){const{path:n=e,...o}=t;return rh({path:n,...o})}let ah=0;const Hr=new Map;function Be(e={},...t){const{id:n,className:o,variant:r="default",padding:a="md",interactive:i=false,expandable:s=false,defaultExpanded:l=true,onExpandChange:d,mediaTop:c,title:u,subtitle:p,badge:f,actions:g,footer:x,divider:b=false,tone:h="neutral",stateKey:v}=e,_=m("div",{className:"card",id:n,tabIndex:i?0:void 0});_.classList.add(`card--${r}`,`card--p-${a}`),i&&_.classList.add("card--interactive"),h!=="neutral"&&_.classList.add(`card--tone-${h}`),o&&_.classList.add(...o.split(" ").filter(Boolean)),s&&_.classList.add("card--expandable");const k=s?v??n??(typeof u=="string"?`title:${u}`:null):null;let w=!s||l;k&&Hr.has(k)&&(w=!!Hr.get(k));let y=null,S=null,I=null,C=null,A=null;const R=n?`${n}-collapse`:`card-collapse-${++ah}`,$=()=>{if(C!==null&&(cancelAnimationFrame(C),C=null),A){const z=A;A=null,z();}},Y=(z,D)=>{if(!I)return;$();const H=I;if(H.setAttribute("aria-hidden",String(!z)),!D){H.classList.remove("card-collapse--animating"),H.style.display=z?"":"none",H.style.height="",H.style.opacity="";return}if(H.classList.add("card-collapse--animating"),H.style.display="",z){H.style.height="auto";const M=H.scrollHeight;if(!M){H.classList.remove("card-collapse--animating"),H.style.display="",H.style.height="",H.style.opacity="";return}H.style.height="0px",H.style.opacity="0",H.offsetHeight,C=requestAnimationFrame(()=>{C=null,H.style.height=`${M}px`,H.style.opacity="1";});}else {const M=H.scrollHeight;if(!M){H.classList.remove("card-collapse--animating"),H.style.display="none",H.style.height="",H.style.opacity="";return}H.style.height=`${M}px`,H.style.opacity="1",H.offsetHeight,C=requestAnimationFrame(()=>{C=null,H.style.height="0px",H.style.opacity="0";});}const E=()=>{H.classList.remove("card-collapse--animating"),H.style.height="",z||(H.style.display="none"),H.style.opacity="";};let P=null;const T=M=>{M.target===H&&(P!==null&&(clearTimeout(P),P=null),H.removeEventListener("transitionend",T),H.removeEventListener("transitioncancel",T),A=null,E());};A=()=>{P!==null&&(clearTimeout(P),P=null),H.removeEventListener("transitionend",T),H.removeEventListener("transitioncancel",T),A=null,E();},H.addEventListener("transitionend",T),H.addEventListener("transitioncancel",T),P=window.setTimeout(()=>{A?.();},420);};function B(z){const D=document.createElementNS("http://www.w3.org/2000/svg","svg");return D.setAttribute("viewBox","0 0 24 24"),D.setAttribute("width","16"),D.setAttribute("height","16"),D.innerHTML=z==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',D}function j(z,D=true,H=true){w=z,_.classList.toggle("card--collapsed",!w),_.classList.toggle("card--expanded",w),y&&(y.dataset.expanded=String(w),y.setAttribute("aria-expanded",String(w))),S&&(S.setAttribute("aria-expanded",String(w)),S.classList.toggle("card-toggle--collapsed",!w),S.setAttribute("aria-label",w?"Replier le contenu":"Deplier le contenu"),S.replaceChildren(B(w?"up":"down"))),s?Y(w,H):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),D&&d&&d(w),k&&Hr.set(k,w);}if(c){const z=m("div",{className:"card-media"});z.append(c),_.appendChild(z);}const N=!!(u||p||f||g&&g.length||s);if(N){y=m("div",{className:"card-header"});const z=m("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const E=m("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&E.append(typeof f=="string"?m("span",{className:"badge"},f):f),z.appendChild(E);}if(p){const E=m("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);z.appendChild(E);}(z.childNodes.length||s)&&y.appendChild(z);const D=m("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),H=m("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(E=>H.appendChild(E)),H.childNodes.length&&D.appendChild(H),s&&(S=m("button",{className:"card-toggle",type:"button",ariaExpanded:String(w),ariaControls:R,ariaLabel:w?"Replier le contenu":"Deplier le contenu"}),S.textContent=w?"▲":"▼",S.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation(),j(!w);}),D.appendChild(S),y.classList.add("card-header--expandable"),y.addEventListener("click",E=>{const P=E.target;P?.closest(".card-actions")||P?.closest(".card-toggle")||j(!w);})),D.childNodes.length&&y.appendChild(D),_.appendChild(y);}I=m("div",{className:"card-collapse",id:R,ariaHidden:s?String(!w):"false"}),_.appendChild(I),b&&N&&I.appendChild(m("div",{className:"card-divider"}));const O=m("div",{className:"card-body"});if(O.append(...t),I.appendChild(O),x){b&&I.appendChild(m("div",{className:"card-divider"}));const z=m("div",{className:"card-footer"});z.append(x),I.appendChild(z);}return S&&S.setAttribute("aria-controls",R),j(w,false,false),k&&Hr.set(k,w),_}let $a=false;const Da=new Set,et=e=>{const t=document.activeElement;for(const n of Da)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function ih(){$a||($a=true,window.addEventListener("keydown",et,true),window.addEventListener("keypress",et,true),window.addEventListener("keyup",et,true),document.addEventListener("keydown",et,true),document.addEventListener("keypress",et,true),document.addEventListener("keyup",et,true));}function sh(){$a&&(Da.size>0||($a=false,window.removeEventListener("keydown",et,true),window.removeEventListener("keypress",et,true),window.removeEventListener("keyup",et,true),document.removeEventListener("keydown",et,true),document.removeEventListener("keypress",et,true),document.removeEventListener("keyup",et,true)));}let ln=null;const ks=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),ln!==null&&(window.clearTimeout(ln),ln=null),document.removeEventListener("click",ks,true);};function lh(){document.addEventListener("click",ks,true),ln!==null&&window.clearTimeout(ln),ln=window.setTimeout(()=>{document.removeEventListener("click",ks,true),ln=null;},500);}function Xn(e){const{id:t,value:n=null,options:o,placeholder:r="Select...",size:a="md",disabled:i=false,blockGameKeys:s=true,onChange:l,onOpenChange:d}=e,c=m("div",{className:"select",id:t}),u=m("button",{className:"select-trigger",type:"button"}),p=m("span",{className:"select-value"},r),f=m("span",{className:"select-caret"},"▾");u.append(p,f);const g=m("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});c.classList.add(`select--${a}`);let x=false,b=n,h=null,v=!!i;function _(E){return E==null?r:(e.options||o).find(T=>T.value===E)?.label??r}function k(E){p.textContent=_(E),g.querySelectorAll(".select-option").forEach(P=>{const T=P.dataset.value,M=E!=null&&T===E;P.classList.toggle("selected",M),P.setAttribute("aria-selected",String(M));});}function w(E){g.replaceChildren(),E.forEach(P=>{const T=m("button",{className:"select-option"+(P.disabled?" disabled":""),type:"button",role:"option","data-value":P.value,"aria-selected":String(P.value===b),tabindex:"-1"},P.label);P.value===b&&T.classList.add("selected"),P.disabled||T.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),M.pointerType&&M.pointerType!=="mouse"&&lh(),R(P.value,{notify:true}),C();},{capture:true}),g.appendChild(T);});}function y(){u.setAttribute("aria-expanded",String(x)),g.setAttribute("aria-hidden",String(!x));}function S(){const E=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${E.width}px`});}function I(){x||v||(x=true,c.classList.add("open"),y(),S(),document.addEventListener("mousedown",N,true),document.addEventListener("scroll",O,true),window.addEventListener("resize",z),g.focus({preventScroll:true}),s&&(ih(),Da.add(c),h=()=>{Da.delete(c),sh();}),d?.(true));}function C(){x&&(x=false,c.classList.remove("open"),y(),document.removeEventListener("mousedown",N,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",z),u.focus({preventScroll:true}),h?.(),h=null,d?.(false));}function A(){x?C():I();}function R(E,P={}){const T=b;b=E,k(b),P.notify!==false&&T!==E&&l?.(E);}function $(){return b}function Y(E){const P=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!P.length)return;const T=P.findIndex(X=>X.classList.contains("active")),M=P[(T+(E===1?1:P.length-1))%P.length];P.forEach(X=>X.classList.remove("active")),M.classList.add("active"),M.focus({preventScroll:true}),M.scrollIntoView({block:"nearest"});}function B(E){(E.key===" "||E.key==="Enter"||E.key==="ArrowDown")&&(E.preventDefault(),I());}function j(E){if(E.key==="Escape"){E.preventDefault(),C();return}if(E.key==="Enter"||E.key===" "){const P=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");P&&!P.classList.contains("disabled")&&(E.preventDefault(),R(P.dataset.value,{notify:true}),C());return}if(E.key==="ArrowDown"){E.preventDefault(),Y(1);return}if(E.key==="ArrowUp"){E.preventDefault(),Y(-1);return}}function N(E){c.contains(E.target)||C();}function O(){x&&S();}function z(){x&&S();}function D(E){v=!!E,u.disabled=v,c.classList.toggle("disabled",v),v&&C();}function H(E){e.options=E,w(E),E.some(P=>P.value===b)||(b=null,k(null));}return c.append(u,g),u.addEventListener("pointerdown",E=>{E.preventDefault(),E.stopPropagation(),A();},{capture:true}),u.addEventListener("keydown",B),g.addEventListener("keydown",j),w(o),n!=null?(b=n,k(b)):k(null),y(),D(v),{root:c,open:I,close:C,toggle:A,getValue:$,setValue:R,setOptions:H,setDisabled:D,destroy(){document.removeEventListener("mousedown",N,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",z),h?.(),h=null;}}}function gl(e={}){const{id:t,text:n="",htmlFor:o,tone:r="default",size:a="md",layout:i="inline",variant:s="text",required:l=false,disabled:d=false,tooltip:c,hint:u,icon:p,suffix:f,onClick:g}=e,x=m("div",{className:"lg-label-wrap",id:t}),b=m("label",{className:"lg-label",...o?{htmlFor:o}:{},...c?{title:c}:{}});if(p){const R=typeof p=="string"?m("span",{className:"lg-label-ico"},p):p;R.classList?.add?.("lg-label-ico"),b.appendChild(R);}const h=m("span",{className:"lg-label-text"},n);b.appendChild(h);const v=m("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&b.appendChild(v);let _=null;if(f!=null){_=typeof f=="string"?document.createTextNode(f):f;const R=m("span",{className:"lg-label-suffix"});R.appendChild(_),b.appendChild(R);}const k=u?m("div",{className:"lg-label-hint"},u):null;x.classList.add(`lg-label--${i}`),x.classList.add(`lg-label--${a}`),s==="title"&&x.classList.add("lg-label--title"),w(r),d&&x.classList.add("is-disabled"),x.appendChild(b),k&&x.appendChild(k),g&&b.addEventListener("click",g);function w(R){x.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),x.classList.add(`lg-label--${R}`);}function y(R){h.textContent=R;}function S(R){w(R);}function I(R){R&&!v.isConnected&&b.appendChild(v),!R&&v.isConnected&&v.remove(),R?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required");}function C(R){x.classList.toggle("is-disabled",!!R);}function A(R){!R&&k&&k.isConnected?k.remove():R&&k?k.textContent=R:R&&!k&&x.appendChild(m("div",{className:"lg-label-hint"},R));}return {root:x,labelEl:b,hintEl:k,setText:y,setTone:S,setRequired:I,setDisabled:C,setHint:A}}function _o(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function jr(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const o=_o(e);return o&&n.appendChild(o),n}function ch(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function rt(e={}){const{label:t="",id:n,variant:o="default",size:r="md",iconLeft:a,iconRight:i,loading:s=false,tooltip:l,type:d="button",onClick:c,disabled:u=false,fullWidth:p=false}=e,f=m("button",{className:"btn",id:n});f.type=d,o==="primary"&&f.classList.add("primary"),o==="danger"&&f.classList.add("danger"),r==="sm"&&f.classList.add("btn--sm"),l&&(f.title=l),p&&(f.style.width="100%");const g=ch(),x=a?jr(a,"left"):null,b=i?jr(i,"right"):null,h=document.createElement("span");h.className="btn-label";const v=_o(t);v&&h.appendChild(v),!v&&(x||b)&&f.classList.add("btn--icon"),f.appendChild(g),x&&f.appendChild(x),f.appendChild(h),b&&f.appendChild(b);const _=u||s;f.disabled=_,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",c&&f.addEventListener("click",c);const k=f;return k.setLoading=w=>{f.setAttribute("aria-busy",String(!!w)),g.style.display=w?"inline-block":"none",f.disabled=w||u;},k.setDisabled=w=>{f.disabled=w||f.getAttribute("aria-busy")==="true";},k.setLabel=w=>{h.replaceChildren();const y=_o(w);y&&h.appendChild(y),!y&&(x||b)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},k.setIconLeft=w=>{if(w==null){x?.remove();return}x?x.replaceChildren(_o(w)):f.insertBefore(jr(w,"left"),h);},k.setIconRight=w=>{if(w==null){b?.remove();return}b?b.replaceChildren(_o(w)):f.appendChild(jr(w,"right"));},k.setVariant=w=>{f.classList.remove("primary","danger"),w==="primary"&&f.classList.add("primary"),w==="danger"&&f.classList.add("danger");},k}function hn(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:a,labelSide:i="right",onChange:s}=e,l=m("div",{className:"lg-switch-wrap"}),d=m("button",{className:`lg-switch lg-switch--${r}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!o),title:a??"Basculer"}),c=m("span",{className:"lg-switch-track"}),u=m("span",{className:"lg-switch-thumb"});d.append(c,u);let p=null;a&&i!=="none"&&(p=m("span",{className:"lg-switch-label"},a)),p&&i==="left"?l.append(p,d):p&&i==="right"?l.append(d,p):l.append(d);let f=!!n,g=!!o;function x(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function b(C=false){g||(f=!f,x(),C||s?.(f));}function h(C){C.preventDefault(),b();}function v(C){g||((C.key===" "||C.key==="Enter")&&(C.preventDefault(),b()),C.key==="ArrowLeft"&&(C.preventDefault(),k(false)),C.key==="ArrowRight"&&(C.preventDefault(),k(true)));}d.addEventListener("click",h),d.addEventListener("keydown",v);function _(){return f}function k(C,A=false){f=!!C,x(),A||s?.(f);}function w(C){g=!!C,x();}function y(C){if(!C){p&&(p.remove(),p=null);return}p?p.textContent=C:(p=m("span",{className:"lg-switch-label"},C),l.append(p));}function S(){d.focus();}function I(){d.removeEventListener("click",h),d.removeEventListener("keydown",v);}return x(),{root:l,button:d,isChecked:_,setChecked:k,setDisabled:w,setLabel:y,focus:S,destroy:I}}let Fu=null,ml=null;function dh(){return Fu}function uh(e){Fu=e,ml=null;}function Ou(){return ml}function ph(e){ml=e;}function fh(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function $u(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const r=n.platform.toLowerCase();if(r.includes("windows"))return "windows";if(r.includes("mac"))return "mac";if(r.includes("android"))return "android";if(r.includes("chrome os")||r.includes("cros"))return "chromeos";if(r.includes("linux"))return "linux";if(r.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Du(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),o=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),r=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(o)return "Edge";if(r)return "Opera";if(a)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function gh(){const e=dh();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function mh(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Bu(){try{return window.top!==window.self}catch{return  true}}function hh(){const e=Bu(),t=mh(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function ai(){const e=Ou();if(e)return e;const t=hh(),n=gh(),o=$u(),r=Du(),a=Bu(),i=window.screen||{},s=window.visualViewport,l=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(s?.width??l),u=Math.round(s?.height??d),p=Math.round(i.width||0),f=Math.round(i.height||0),g=Math.round(i.availWidth||p),x=Math.round(i.availHeight||f),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,h={surface:t,host:location.hostname,origin:location.origin,isInIframe:a,platform:n,browser:r,os:o,viewportWidth:l,viewportHeight:d,visualViewportWidth:c,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:x,dpr:b,orientation:fh()};return ph(h),h}function bh(){return ai().surface==="discord"}function xh(){return ai().platform==="mobile"}function yh(){ai();}function vh(){return Ou()!==null}const Ye={init:yh,isReady:vh,detect:ai,isDiscord:bh,isMobile:xh,detectOS:$u,detectBrowser:Du,setPlatformOverride:uh};let Ba=false;const To=new Set;function wh(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const tt=e=>{const t=wh();if(t){for(const n of To)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Sh(){Ba||(Ba=true,window.addEventListener("keydown",tt,true),window.addEventListener("keypress",tt,true),window.addEventListener("keyup",tt,true),document.addEventListener("keydown",tt,true),document.addEventListener("keypress",tt,true),document.addEventListener("keyup",tt,true));}function Ch(){Ba&&(Ba=false,window.removeEventListener("keydown",tt,true),window.removeEventListener("keypress",tt,true),window.removeEventListener("keyup",tt,true),document.removeEventListener("keydown",tt,true),document.removeEventListener("keypress",tt,true),document.removeEventListener("keyup",tt,true));}function kh(e){return To.size===0&&Sh(),To.add(e),()=>{To.delete(e),To.size===0&&Ch();}}function Ih(e,t,n,o){let r;switch(e){case "digits":r="0-9";break;case "alpha":r="\\p{L}";break;case "alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function _h(e,t){return t?e.replace(t,""):e}function Th(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t);})}function hl(e={}){const{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:a=false,allowDashes:i=false,allowUnderscore:s=false,maxLength:l,blockGameKeys:d=true,debounceMs:c=0,onChange:u,onEnter:p,label:f}=e,g=m("div",{className:"lg-input-wrap"}),x=m("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(x.maxLength=l),o&&(x.value=o),f){const R=m("div",{className:"lg-input-label"},f);g.appendChild(R);}g.appendChild(x);const b=Ih(r,a,i,s),h=()=>{const R=x.selectionStart??x.value.length,$=x.value.length,Y=_h(x.value,b);if(Y!==x.value){x.value=Y;const B=$-Y.length,j=Math.max(0,R-B);x.setSelectionRange(j,j);}},v=Th(()=>u?.(x.value),c);x.addEventListener("input",()=>{h(),v();}),x.addEventListener("paste",()=>queueMicrotask(()=>{h(),v();})),x.addEventListener("keydown",R=>{R.key==="Enter"&&p?.(x.value);});const _=d?kh(x):()=>{};function k(){return x.value}function w(R){x.value=R??"",h(),v();}function y(){x.focus();}function S(){x.blur();}function I(R){x.disabled=!!R;}function C(){return document.activeElement===x}function A(){_();}return {root:g,input:x,getValue:k,setValue:w,focus:y,blur:S,setDisabled:I,isFocused:C,destroy:A}}function Le(e,t,n){return Math.min(n,Math.max(t,e))}function Go({h:e,s:t,v:n,a:o}){const r=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(r%2-1));let s=0,l=0,d=0;switch(Math.floor(r)){case 0:s=a,l=i;break;case 1:s=i,l=a;break;case 2:l=a,d=i;break;case 3:l=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}const u=n-a,p=Math.round((s+u)*255),f=Math.round((l+u)*255),g=Math.round((d+u)*255);return {r:Le(p,0,255),g:Le(f,0,255),b:Le(g,0,255),a:Le(o,0,1)}}function zu({r:e,g:t,b:n,a:o}){const r=Le(e,0,255)/255,a=Le(t,0,255)/255,i=Le(n,0,255)/255,s=Math.max(r,a,i),l=Math.min(r,a,i),d=s-l;let c=0;d!==0&&(s===r?c=60*((a-i)/d%6):s===a?c=60*((i-r)/d+2):c=60*((r-a)/d+4)),c<0&&(c+=360);const u=s===0?0:d/s;return {h:c,s:u,v:s,a:Le(o,0,1)}}function bl({r:e,g:t,b:n}){const o=r=>Le(Math.round(r),0,255).toString(16).padStart(2,"0");return `#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Eh({r:e,g:t,b:n,a:o}){const r=Le(Math.round(o*255),0,255);return `${bl({r:e,g:t,b:n})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function Eo({r:e,g:t,b:n,a:o}){const r=Math.round(o*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${r})`}function Nn(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return {r:o,g:r,b:a,a:n/255}}function Is(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Nn(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;const r=Number(o[0]),a=Number(o[1]),i=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return [r,a,i,s].some(l=>Number.isNaN(l))?null:{r,g:a,b:i,a:s}}return null}function Ah(e,t){const n=Is(e)??Nn(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Le(t,0,1)),zu(n)}function Ph(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Mh(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Zt(e){const t=Go(e),n=Go({...e,a:1});return {hsva:{...e},hex:bl(n),hexa:Eh(t),rgba:Eo(t),alpha:e.a}}function Lh(e={}){const{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:a=false,detectMobile:i,onInput:s,onChange:l}=e,c=i?i():Ye.detect().platform==="mobile";let u=Ah(o,r);const p=Be({id:t,className:"color-picker",title:n,padding:c?"md":"lg",variant:"soft",expandable:!c,defaultExpanded:!c&&a});p.classList.add(c?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),x=m("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(x):f?f.prepend(x):p.prepend(x);const b=p.querySelector(".card-toggle");!c&&b&&x.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click();});const h=p.querySelector(".card-collapse");let v=null,_=null,k=null,w=null,y=null,S=null,I=null,C=null,A=null,R="hex";function $(O){const z=Zt(u);O==="input"?s?.(z):l?.(z);}function Y(){const O=Zt(u);if(x.style.setProperty("--cp-preview-color",O.rgba),x.setAttribute("aria-label",`${n}: ${O.hexa}`),!c&&v&&_&&k&&w&&y&&S&&I){const z=Go({...u,s:1,v:1,a:1}),D=Eo(z);v.style.setProperty("--cp-palette-hue",D),_.style.left=`${u.s*100}%`,_.style.top=`${(1-u.v)*100}%`,k.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Eo({...z,a:1})} 0%, ${Eo({...z,a:0})} 100%)`),w.style.top=`${(1-u.a)*100}%`,y.style.setProperty("--cp-hue-color",Eo(Go({...u,v:1,s:1,a:1}))),S.style.left=`${u.h/360*100}%`;const H=u.a===1?O.hex:O.hexa,E=O.rgba,P=R==="hex"?H:E;I!==document.activeElement&&(I.value=P),I.setAttribute("aria-label",`${R.toUpperCase()} code for ${n}`),I.placeholder=R==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",R==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=R,C&&(C.textContent=R.toUpperCase(),C.setAttribute("aria-label",R==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),C.setAttribute("aria-pressed",R==="rgba"?"true":"false"),C.classList.toggle("is-alt",R==="rgba"));}A&&A!==document.activeElement&&(A.value=O.hex);}function B(O,z=null){u={h:(O.h%360+360)%360,s:Le(O.s,0,1),v:Le(O.v,0,1),a:Le(O.a,0,1)},Y(),z&&$(z);}function j(O,z=null){B(zu(O),z);}function N(O,z,D){O.addEventListener("pointerdown",H=>{H.preventDefault();const E=H.pointerId,P=M=>{M.pointerId===E&&z(M);},T=M=>{M.pointerId===E&&(document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",T),document.removeEventListener("pointercancel",T),D?.(M));};z(H),document.addEventListener("pointermove",P),document.addEventListener("pointerup",T),document.addEventListener("pointercancel",T);});}if(!c&&h){const O=h.querySelector(".card-body");if(O){O.classList.add("color-picker__body"),_=m("div",{className:"color-picker__palette-cursor"}),v=m("div",{className:"color-picker__palette"},_),w=m("div",{className:"color-picker__alpha-thumb"}),k=m("div",{className:"color-picker__alpha"},w),S=m("div",{className:"color-picker__hue-thumb"}),y=m("div",{className:"color-picker__hue"},S);const z=m("div",{className:"color-picker__main"},v,k),D=m("div",{className:"color-picker__hue-row"},y),H=hl({blockGameKeys:true});I=H.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=false,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),C=m("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),H.root.classList.add("color-picker__hex-wrap");const E=m("div",{className:"color-picker__hex-row"},C,H.root);O.replaceChildren(z,D,E),N(v,T=>{if(!v||!_)return;const M=v.getBoundingClientRect(),X=Le((T.clientX-M.left)/M.width,0,1),G=Le((T.clientY-M.top)/M.height,0,1);B({...u,s:X,v:1-G},"input");},()=>$("change")),N(k,T=>{if(!k)return;const M=k.getBoundingClientRect(),X=Le((T.clientY-M.top)/M.height,0,1);B({...u,a:1-X},"input");},()=>$("change")),N(y,T=>{if(!y)return;const M=y.getBoundingClientRect(),X=Le((T.clientX-M.left)/M.width,0,1);B({...u,h:X*360},"input");},()=>$("change")),C.addEventListener("click",()=>{if(R=R==="hex"?"rgba":"hex",I){const T=Zt(u);I.value=R==="hex"?u.a===1?T.hex:T.hexa:T.rgba;}Y(),I?.focus(),I?.select();}),I.addEventListener("input",()=>{if(R==="hex"){const T=Ph(I.value);if(T!==I.value){const M=I.selectionStart??T.length;I.value=T,I.setSelectionRange(M,M);}}});const P=()=>{const T=I.value;if(R==="hex"){const M=Nn(T);if(!M){I.value=u.a===1?Zt(u).hex:Zt(u).hexa;return}const X=T.startsWith("#")?T.slice(1):T,G=X.length===4||X.length===8;M.a=G?M.a:u.a,j(M,"change");}else {const M=Mh(T),X=Is(M);if(!X){I.value=Zt(u).rgba;return}j(X,"change");}};I.addEventListener("change",P),I.addEventListener("blur",P),I.addEventListener("keydown",T=>{T.key==="Enter"&&(P(),I.blur());});}}return c&&(h&&h.remove(),A=m("input",{className:"color-picker__native",type:"color",value:bl(Go({...u,a:1}))}),x.addEventListener("click",()=>A.click()),A.addEventListener("input",()=>{const O=Nn(A.value);O&&(O.a=u.a,j(O,"input"),$("change"));}),p.appendChild(A)),Y(),{root:p,isMobile:c,getValue:()=>Zt(u),setValue:(O,z)=>{const D=Is(O)??Nn(O)??Nn("#FFFFFF");D&&(typeof z=="number"&&(D.a=z),j(D,null));}}}const Rh=window;function Nh(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Rh}const Fh=Nh(),q=Fh;function Oh(e){try{return !!e.isSecureContext}catch{return  false}}function xl(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Gu(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function $h(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Dh(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Bh(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function zh(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Oh(q))return {ok:false,method:"clipboard-write"};if(!await $h())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Gh(e,t){try{const n=t||xl(),o=Dh(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy");}catch{r=!1;}return o.remove(),{ok:r,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Hh(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let o=false;if(n!==e)try{t.textContent=e,o=!0;}catch{}const r=Bh(t);o&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const a=Gu()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:r,method:"selection",hint:a}}async function jh(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const o=await zh(n);if(o.ok)return o;const r=t.injectionRoot||xl(t.valueNode||void 0),a=Gh(n,r);if(a.ok)return a;const i=Hh(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Ye.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Uh(e,t,n={}){const o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);const a=document.createElement("div");a.textContent=r,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";const i=xl(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);const s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150);},1200);}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();const a=(t()??"").toString(),i=await jh(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?o("Copié"):i.method==="selection"&&o(i.hint||(Gu()?"⌘C pour copier":"Ctrl+C pour copier")):o("Impossible de copier");});}const $n={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function Wh(e){const{host:t,themes:n,initialTheme:o,onThemeChange:r}=e;let a=o,i=null,s=false;function l(c){const u=n[c]||n[a]||{};t.setAttribute("data-theme",c),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(i!==null&&clearTimeout(i),i=q.setTimeout(()=>{t.classList.remove("theme-anim"),i=null;},320)):s=true,a=c,r?.(c);}function d(){return a}return l(o),{applyTheme:l,getCurrentTheme:d}}const _s={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,system:false}}};async function Vh(){const e=await no("tab-settings",{version:1,defaults:_s,sanitize:r=>({ui:{expandedCards:Oa(_s.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const a=e.get();e.update({ui:{...a.ui,...r,expandedCards:Oa(a.ui.expandedCards,r.expandedCards)}});}function n(r,a){const i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[r]:!!a}}});}function o(r){const a=e.get();n(r,!a.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}class qh{constructor(){U(this,"injections",new Map);U(this,"state",{});U(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(r){console.error(`[InjectionRegistry] Failed to init ${t}:`,r);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const o=this.injections.get(t);if(!o){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?o.injection.init():o.injection.destroy(),console.log(`[InjectionRegistry] ${o.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const o=Se(n.storageKey,n.defaultEnabled??false);this.state[t]=o;}saveState(t){const n=this.injections.get(t);n&&_e(n.storageKey,this.state[t]);}}let ji=null;function Hu(){return ji||(ji=new qh),ji}function ju(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Xh(){return Object.keys($n).map(e=>({value:e,label:ju(e)}))}const Kh=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function Yh(e){return ju(e.replace(/^--/,""))}function Jh(e){return e.alpha<1?e.rgba:e.hex}const $t={pets:{enabled:true},journalChecker:{enabled:true},autoFavorite:{enabled:true},bulkFavorite:{enabled:false},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class Qh extends wn{constructor(n){super({id:"tab-settings",label:"Settings"});U(this,"featureConfig",$t);this.deps=n;}async build(n){const o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await Vh();}catch{r={get:()=>_s,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const a=r.get(),i=Se(ke.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(i);const s=Object.keys($n),l=this.deps.getCurrentTheme?.()??this.deps.initialTheme,d=s.includes(l)?l:s[0]??"dark";let c=d;const u=gl({text:"Theme",tone:"muted",size:"lg"}),p=Xn({options:Xh(),value:d,onChange:v=>{c=v,this.deps.applyTheme(v),this.renderThemePickers(v,f,c);}}),f=m("div",{className:"settings-theme-grid"}),g=Be({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:v=>r.setCardExpanded("style",v)},m("div",{className:"kv settings-theme-row"},u.root,p.root),f);this.renderThemePickers(d,f,c);const x=this.createHUDSectionsCard({defaultExpanded:!!a.ui.expandedCards.hudSections,onExpandChange:v=>r.setCardExpanded("hudSections",v)}),b=this.createEnhancementsCard({defaultExpanded:!!a.ui.expandedCards.enhancements,onExpandChange:v=>r.setCardExpanded("enhancements",v)}),h=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:v=>r.setCardExpanded("system",v)});o.appendChild(g),o.appendChild(x),o.appendChild(b),o.appendChild(h);}mergeFeatureConfig(n){return {pets:{...$t.pets,...n.pets},journalChecker:{...$t.journalChecker,...n.journalChecker},autoFavorite:{...$t.autoFavorite,...n.autoFavorite},bulkFavorite:{...$t.bulkFavorite,...n.bulkFavorite},cropSizeIndicator:{...$t.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...$t.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...$t.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){_e(ke.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const o=(r,a,i,s,l=false,d=false)=>{const c=m("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${l?"0":"12px"} 0 ${d?"0":"12px"} 0;
          ${d?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${a?"1":"0.5"};
        `}),u=m("div"),p=m("div",{style:"font-weight: 500; margin-bottom: 4px;"},r),f=m("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);u.append(p,f);const g=hn({checked:a,onChange:x=>{c.style.opacity=x?"1":"0.5",i(x);}});return c.append(u,g.root),c};return Be({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},o("Auto-Favorite",this.featureConfig.autoFavorite.enabled,r=>{this.featureConfig.autoFavorite.enabled=r,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),o("Journal Checker",this.featureConfig.journalChecker.enabled,r=>{this.featureConfig.journalChecker.enabled=r,this.saveFeatureConfig();},"Track collection completion progress"),o("Pets",this.featureConfig.pets.enabled,r=>{this.featureConfig.pets.enabled=r,this.saveFeatureConfig();},"Pet management and team tracking",false,true)))}createSectionRow(n,o,r,a,i=false,s=false){const l=m("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${i?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${o?"1":"0.5"};
      `}),d=m("div"),c=m("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),u=m("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},a);d.append(c,u);const p=hn({checked:o,onChange:f=>{l.style.opacity=f?"1":"0.5",r(f);}});return l.append(d,p.root),l}createEnhancementsCard(n){const o=Hu(),a=[...o.getAll()].sort((s,l)=>s.name.localeCompare(l.name)),i=a.map((s,l)=>{const d=l===0,c=l===a.length-1,u=o.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{o.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,d,c)});return Be({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},m("div",{},...i))}renderThemePickers(n,o,r){const a=$n[n];if(o.replaceChildren(),!!a)for(const i of Kh){const s=a[i];if(s==null)continue;const l=Lh({label:Yh(i),value:s,defaultExpanded:false,onInput:d=>this.updateThemeVar(n,i,d,r),onChange:d=>this.updateThemeVar(n,i,d,r)});o.appendChild(l.root);}}updateThemeVar(n,o,r,a){const i=$n[n];i&&(i[o]=Jh(r),a===n&&this.deps.applyTheme(n));}createEnvCard(n){const o=n?.defaultExpanded??false,r=n?.onExpandChange,a=(h,v)=>{const _=m("div",{className:"kv kv--inline-mobile"}),k=m("label",{},h),w=m("div",{className:"ro"});return typeof v=="string"?w.textContent=v:w.append(v),_.append(k,w),_},i=m("code",{},"—"),s=m("span",{},"—"),l=m("span",{},"—"),d=m("span",{},"—"),c=m("span",{},"—"),u=m("span",{},"—"),p=()=>{const h=Ye.detect();l.textContent=h.surface,d.textContent=h.platform,c.textContent=h.browser??"Unknown",u.textContent=h.os??"Unknown",i.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No";},f=rt({label:"Copy JSON",variant:"primary",size:"sm"});Uh(f,()=>{const h=Ye.detect();return JSON.stringify(h,null,2)});const g=m("div",{style:"width:100%;display:flex;justify-content:center;"},f),x=Be({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:o,onExpandChange:r},a("Surface",l),a("Platform",d),a("Browser",c),a("OS",u),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p();};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),x}}function ii(e){const{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:a=true,zebra:i=true,animations:s=true,respectReducedMotion:l=true,compact:d=false,maxHeight:c,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:x=false,getRowId:b=(oe,F)=>String(F),onSortChange:h,onSelectionChange:v,onRowClick:_}=e;let k=n.slice(),w=o.slice(),y=o.slice(),S=null,I=null,C=1;const A=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,R=!!s&&!(l&&A),$=m("div",{className:"lg-table-wrap",id:t});if(c!=null){const oe=typeof c=="number"?`${c}px`:c;$.style.setProperty("--tbl-max-h",oe);}const Y=m("div",{className:"lg-table"}),B=m("div",{className:"lg-thead"}),j=m("div",{className:"lg-tbody"}),N=m("div",{className:"lg-tfoot"});a&&$.classList.add("sticky"),i&&$.classList.add("zebra"),d&&$.classList.add("compact"),u&&$.classList.add("selectable");const O=p==="switch"?"52px":"36px";$.style.setProperty("--check-w",O);function z(oe){return oe==="center"?"center":oe==="right"?"flex-end":"flex-start"}function D(){const oe=k.map(K=>{const Q=(K.width||"1fr").trim();return /\bfr$/.test(Q)?`minmax(0, ${Q})`:Q}),F=(u?[O,...oe]:oe).join(" ");$.style.setProperty("--lg-cols",F);}D();function H(){return r?Math.max(1,Math.ceil(w.length/r)):1}function E(){if(!r)return w;const oe=(C-1)*r;return w.slice(oe,oe+r)}function P(){if(!S||!I)return;const oe=k.find(Q=>String(Q.key)===S),F=I==="asc"?1:-1,K=oe?.sortFn?(Q,re)=>F*oe.sortFn(Q,re):(Q,re)=>{const Z=Q[S],ie=re[S];return Z==null&&ie==null?0:Z==null?-1*F:ie==null?1*F:typeof Z=="number"&&typeof ie=="number"?F*(Z-ie):F*String(Z).localeCompare(String(ie),void 0,{numeric:true,sensitivity:"base"})};w.sort(K);}const T=new Set(g);function M(){return Array.from(T)}const X=new Map;function G(oe){T.clear(),oe.forEach(F=>T.add(F)),Te(),X.forEach((F,K)=>{F.setChecked(T.has(K),true);}),Yt(),v?.(M());}function V(){T.clear(),Te(),X.forEach(oe=>oe.setChecked(false,true)),Yt(),v?.(M());}let ne=null;function Te(){if(!ne)return;const oe=E();if(!oe.length){ne.indeterminate=false,ne.checked=false;return}const F=oe.map((Q,re)=>b(Q,(C-1)*(r||0)+re)),K=F.reduce((Q,re)=>Q+(T.has(re)?1:0),0);ne.checked=K===F.length,ne.indeterminate=K>0&&K<F.length;}let Xe=false;function zi(){Xe=false;const oe=j.offsetWidth-j.clientWidth;B.style.paddingRight=oe>0?`${oe}px`:"0px";}function Ft(){Xe||(Xe=true,requestAnimationFrame(zi));}const Tt=new ResizeObserver(()=>Ft()),Tn=()=>Ft();function Nr(){B.replaceChildren();const oe=m("div",{className:"lg-tr lg-tr-head"});if(u){const F=m("div",{className:"lg-th lg-th-check"});x||(ne=m("input",{type:"checkbox"}),ne.addEventListener("change",()=>{const K=E(),Q=ne.checked;K.forEach((re,Z)=>{const ie=b(re,(C-1)*(r||0)+Z);Q?T.add(ie):T.delete(ie);}),v?.(M()),Yt();}),F.appendChild(ne)),oe.appendChild(F);}k.forEach(F=>{const K=m("button",{className:"lg-th",type:"button",title:F.title||F.header});K.textContent=F.header,F.align&&K.style.setProperty("--col-justify",z(F.align)),F.sortable&&K.classList.add("sortable"),S===String(F.key)&&I?K.setAttribute("data-sort",I):K.removeAttribute("data-sort"),F.sortable&&K.addEventListener("click",()=>{const Q=String(F.key);S!==Q?(S=Q,I="asc"):(I=I==="asc"?"desc":I==="desc"?null:"asc",I||(S=null,w=y.slice())),h?.(S,I),S&&I&&P(),Qt();}),oe.appendChild(K);}),B.appendChild(oe);try{Tt.disconnect();}catch{}Tt.observe(j),Ft();}function Kt(oe){return Array.from(oe.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function po(oe){return oe.querySelector(".lg-td, .lg-td-check")}function fo(oe){const F=po(oe);return F?F.getBoundingClientRect():null}function Yt(){const oe=E(),F=new Map;Array.from(j.children).forEach(Z=>{const ie=Z,me=ie.getAttribute("data-id");if(!me)return;const Ce=fo(ie);Ce&&F.set(me,Ce);});const K=new Map;Array.from(j.children).forEach(Z=>{const ie=Z,me=ie.getAttribute("data-id");me&&K.set(me,ie);});const Q=[];for(let Z=0;Z<oe.length;Z++){const ie=oe[Z],me=(r?(C-1)*r:0)+Z,Ce=b(ie,me);Q.push(Ce);let he=K.get(Ce);he||(he=Gi(ie,me),R&&Kt(he).forEach(go=>{go.style.transform="translateY(6px)",go.style.opacity="0";})),j.appendChild(he);}const re=[];if(K.forEach((Z,ie)=>{Q.includes(ie)||re.push(Z);}),!R){re.forEach(Z=>Z.remove()),Te(),Ft();return}Q.forEach(Z=>{const ie=j.querySelector(`.lg-tr-body[data-id="${Z}"]`);if(!ie)return;const me=fo(ie),Ce=F.get(Z),he=Kt(ie);if(Ce&&me){const xt=Ce.left-me.left,En=Ce.top-me.top;he.forEach(Ot=>{Ot.style.transition="none",Ot.style.transform=`translate(${xt}px, ${En}px)`,Ot.style.opacity="1";}),po(ie)?.getBoundingClientRect(),he.forEach(Ot=>{Ot.style.willChange="transform, opacity",Ot.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(Ot=>{Ot.style.transform="translate(0,0)";});});}else he.forEach(xt=>{xt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(xt=>{xt.style.transform="translate(0,0)",xt.style.opacity="1";});});const Hi=xt=>{(xt.propertyName==="transform"||xt.propertyName==="opacity")&&(he.forEach(En=>{En.style.willChange="",En.style.transition="",En.style.transform="",En.style.opacity="";}),xt.currentTarget.removeEventListener("transitionend",Hi));},go=he[0];go&&go.addEventListener("transitionend",Hi);}),re.forEach(Z=>{const ie=Kt(Z);ie.forEach(he=>{he.style.willChange="transform, opacity",he.style.transition="transform .18s ease, opacity .18s ease",he.style.opacity="0",he.style.transform="translateY(-6px)";});const me=he=>{he.propertyName==="opacity"&&(he.currentTarget.removeEventListener("transitionend",me),Z.remove());},Ce=ie[0];Ce?Ce.addEventListener("transitionend",me):Z.remove();}),Te(),Ft();}function Gi(oe,F){const K=b(oe,F),Q=m("div",{className:"lg-tr lg-tr-body","data-id":K});if(u){const re=m("div",{className:"lg-td lg-td-check"});if(p==="switch"){const Z=hn({size:"sm",checked:T.has(K),onChange:ie=>{ie?T.add(K):T.delete(K),Te(),v?.(M());}});X.set(K,Z),re.appendChild(Z.root);}else {const Z=m("input",{type:"checkbox",className:"lg-row-check"});Z.checked=T.has(K),Z.addEventListener("change",ie=>{ie.stopPropagation(),Z.checked?T.add(K):T.delete(K),Te(),v?.(M());}),Z.addEventListener("click",ie=>ie.stopPropagation()),re.appendChild(Z);}Q.appendChild(re);}return k.forEach(re=>{const Z=m("div",{className:"lg-td"});re.align&&Z.style.setProperty("--col-justify",z(re.align));let ie=re.render?re.render(oe,F):String(oe[re.key]??"");typeof ie=="string"?Z.textContent=ie:Z.appendChild(ie),Q.appendChild(Z);}),(_||u&&f)&&(Q.classList.add("clickable"),Q.addEventListener("click",re=>{if(!re.target.closest(".lg-td-check")){if(u&&f){const Z=!T.has(K);if(Z?T.add(K):T.delete(K),Te(),p==="switch"){const ie=X.get(K);ie&&ie.setChecked(Z,true);}else {const ie=Q.querySelector(".lg-row-check");ie&&(ie.checked=Z);}v?.(M());}_?.(oe,F,re);}})),Q}function Fr(){if(N.replaceChildren(),!r)return;const oe=H(),F=m("div",{className:"lg-pager"}),K=m("button",{className:"btn",type:"button"},"←"),Q=m("button",{className:"btn",type:"button"},"→"),re=m("span",{className:"lg-pager-info"},`${C} / ${oe}`);K.disabled=C<=1,Q.disabled=C>=oe,K.addEventListener("click",()=>Jt(C-1)),Q.addEventListener("click",()=>Jt(C+1)),F.append(K,re,Q),N.appendChild(F);}function Jt(oe){const F=H();C=Math.min(Math.max(1,oe),F),Yt(),Fr();}function Qt(){D(),Nr(),Yt(),Fr();}function Or(oe){y=oe.slice(),w=oe.slice(),S&&I&&P(),Jt(1);}function $r(oe){k=oe.slice(),Qt();}function Dr(oe,F="asc"){S=oe,I=oe?F:null,S&&I?P():w=y.slice(),Qt();}function Br(){try{Tt.disconnect();}catch{}window.removeEventListener("resize",Tn);}return Y.append(B,j,N),$.appendChild(Y),window.addEventListener("resize",Tn),Qt(),{root:$,setData:Or,setColumns:$r,sortBy:Dr,getSelection:M,setSelection:G,clearSelection:V,setPage:Jt,getState:()=>({page:C,pageCount:H(),sortKey:S,sortDir:I}),destroy:Br}}let za=false;const Ao=new Set;function Zh(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const nt=e=>{const t=Zh();if(t){for(const n of Ao)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function eb(){za||(za=true,window.addEventListener("keydown",nt,true),window.addEventListener("keypress",nt,true),window.addEventListener("keyup",nt,true),document.addEventListener("keydown",nt,true),document.addEventListener("keypress",nt,true),document.addEventListener("keyup",nt,true));}function tb(){za&&(za=false,window.removeEventListener("keydown",nt,true),window.removeEventListener("keypress",nt,true),window.removeEventListener("keyup",nt,true),document.removeEventListener("keydown",nt,true),document.removeEventListener("keypress",nt,true),document.removeEventListener("keyup",nt,true));}function nb(e){return Ao.size===0&&eb(),Ao.add(e),()=>{Ao.delete(e),Ao.size===0&&tb();}}function Ur(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function ob(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function si(e={}){const{id:t,placeholder:n="Search...",value:o="",size:r="md",disabled:a=false,autoFocus:i=false,onChange:s,onSearch:l,autoSearch:d=false,debounceMs:c=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:x="Clear",ariaLabel:b,submitLabel:h,loading:v=false,blockGameKeys:_=true}=e,k=m("div",{className:"search"+(r?` search--${r}`:""),id:t}),w=m("span",{className:"search-ico search-ico--left"});if(p){const V=Ur(p);V&&w.appendChild(V);}else w.textContent="🔎",w.style.opacity=".9";const y=m("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":b||n}),S=m("span",{className:"search-ico search-ico--right"});if(f){const V=Ur(f);V&&S.appendChild(V);}const I=ob();I.classList.add("search-spinner");const C=g?m("button",{className:"search-clear",type:"button",title:x},"×"):null,A=h!=null?m("button",{className:"btn search-submit",type:"button"},h):null,R=m("div",{className:"search-field"},w,y,S,I,...C?[C]:[]);k.append(R,...A?[A]:[]);let $=!!a,Y=null;function B(V){I.style.display=V?"inline-block":"none",k.classList.toggle("is-loading",V);}function j(){Y!=null&&(window.clearTimeout(Y),Y=null);}function N(V){j(),c>0?Y=window.setTimeout(()=>{Y=null,V();},c):V();}function O(){s?.(y.value),d&&l&&l(y.value);}y.addEventListener("input",()=>{N(O);}),y.addEventListener("keydown",V=>{V.key==="Enter"?(V.preventDefault(),j(),l?.(y.value)):V.key==="Escape"&&(y.value.length>0?H("",{notify:true}):y.blur());}),C&&C.addEventListener("click",()=>H("",{notify:true})),A&&A.addEventListener("click",()=>l?.(y.value));let z=()=>{};if(_&&(z=nb(y)),u){const V=ne=>{if(ne.key===u&&!ne.ctrlKey&&!ne.metaKey&&!ne.altKey){const Te=document.activeElement;Te&&(Te.tagName==="INPUT"||Te.tagName==="TEXTAREA"||Te.isContentEditable)||(ne.preventDefault(),y.focus());}};window.addEventListener("keydown",V,true),k.__cleanup=()=>{window.removeEventListener("keydown",V,true),z();};}else k.__cleanup=()=>{z();};function D(V){$=!!V,y.disabled=$,C&&(C.disabled=$),A&&(A.disabled=$),k.classList.toggle("disabled",$);}function H(V,ne={}){const Te=y.value;y.value=V??"",ne.notify&&Te!==V&&N(O);}function E(){return y.value}function P(){y.focus();}function T(){y.blur();}function M(V){y.placeholder=V;}function X(V){H("",V);}return D($),B(v),i&&P(),{root:k,input:y,getValue:E,setValue:H,focus:P,blur:T,setDisabled:D,setPlaceholder:M,clear:X,setLoading:B,setIconLeft(V){w.replaceChildren();const ne=Ur(V??"🔎");ne&&w.appendChild(ne);},setIconRight(V){S.replaceChildren();const ne=Ur(V??"");ne&&S.appendChild(ne);}}}const li=e=>new Promise(t=>setTimeout(t,e)),ft=e=>{try{return e()}catch{return}},kt=(e,t,n)=>Math.max(t,Math.min(n,e)),rb=e=>kt(e,0,1);async function Dc(e,t,n){const o=performance.now();for(;performance.now()-o<t;){const r=await Promise.race([e,li(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}let yl=null;function Uu(){return yl}function ab(e){yl=e;}function Wu(){return yl!==null}const ib=/\/(?:r\/\d+\/)?version\/([^/]+)/,sb=15e3,lb=50;function cb(){return q?.document??(typeof document<"u"?document:null)}function vl(e={}){if(Wu())return;const t=e.doc??cb();if(!t)return;const n=t.scripts;for(let o=0;o<n.length;o++){const a=n.item(o)?.src;if(!a)continue;const i=a.match(ib);if(i?.[1]){ab(i[1]);return}}}function db(){return vl(),Uu()}function ub(){return Wu()}async function pb(e={}){const t=e.timeoutMs??sb,n=performance.now();for(;performance.now()-n<t;){vl();const o=Uu();if(o)return o;await li(lb);}throw new Error("MGVersion timeout (gameVersion not found)")}const wl={init:vl,isReady:ub,get:db,wait:pb},fb=q?.location?.origin||"https://magicgarden.gg";function Vu(){return typeof GM_xmlhttpRequest=="function"}function qu(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))});})}async function Sl(e){if(Vu())return JSON.parse((await qu(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Xu(e){if(Vu())return (await qu(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function gb(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),r=q?.Image||Image,a=new r;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(o),t(a);},a.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"));},a.src=o;})}const Mt=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),mb=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Bc=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):mb(e)+String(t||"");let Cl=null,Ku=null;function hb(){return Cl}function bb(){return Ku}function xb(e){Cl=e;}function yb(e){Ku=e;}function Yu(){return Cl!==null}const vb=15e3;async function wb(e={}){Yu()||await kl(e);}async function kl(e={}){const t=hb();if(t)return t;const n=bb();if(n)return n;const o=(async()=>{const r=e.gameVersion??await wl.wait({timeoutMs:vb}),a=`${fb}/version/${r}/assets/`;return xb(a),a})();return yb(o),o}async function Sb(e){const t=await kl();return Mt(t,e)}function Cb(){return Yu()}const Sn={init:wb,isReady:Cb,base:kl,url:Sb},Ju=new Map;function kb(e){return Ju.get(e)}function Ib(e,t){Ju.set(e,t);}const Qu="manifest.json";let Ts=null;async function _b(){Ts||(Ts=await Zu());}function Tb(){return Ts!==null}async function Zu(e={}){const t=e.baseUrl??await Sn.base(),n=kb(t);if(n)return n;const o=Sl(Mt(t,Qu));return Ib(t,o),o}function Eb(e,t){return e.bundles.find(n=>n.name===t)??null}function Ab(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const o of n.src??[])typeof o=="string"&&o.endsWith(".json")&&o!==Qu&&t.add(o);return Array.from(t)}const Lt={init:_b,isReady:Tb,load:Zu,getBundle:Eb,listJsonFromBundle:Ab},Pb=q,pt=Pb.Object??Object,ci=pt.keys,Ga=pt.values,Ha=pt.entries,zc=new WeakSet;function Mb(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const se=Mb(),en={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Lb=["Rain","Frost","Dawn","AmberMoon"],Gc=/main-[^/]+\.js(\?|$)/,Rb=6,Nb=150,Fb=2e3,Ob=200,$b=50,Db=10,Bb=1e3,Es="ProduceScaleBoost",tn=(e,t)=>t.every(n=>e.includes(n));function nn(e,t){se.data[e]==null&&(se.data[e]=t,ja()&&np());}function ja(){return Object.values(se.data).every(e=>e!=null)}function ep(e,t){if(!e||typeof e!="object"||zc.has(e))return;zc.add(e);let n;try{n=ci(e);}catch{return}if(!n||n.length===0)return;const o=e;let r;if(!se.data.items&&tn(n,en.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&nn("items",o)),!se.data.decor&&tn(n,en.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&nn("decor",o)),!se.data.mutations&&tn(n,en.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&nn("mutations",o)),!se.data.eggs&&tn(n,en.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&nn("eggs",o)),!se.data.pets&&tn(n,en.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&nn("pets",o)),!se.data.abilities&&tn(n,en.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&nn("abilities",o)),!se.data.plants&&tn(n,en.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&nn("plants",o)),!(t>=Rb))for(const a of n){let i;try{i=o[a];}catch{continue}i&&typeof i=="object"&&ep(i,t+1);}}function wa(e){try{ep(e,0);}catch{}}function tp(){if(!se.isHookInstalled){if(pt.__MG_HOOKED__){se.isHookInstalled=true;return}pt.__MG_HOOKED__=true,se.isHookInstalled=true;try{pt.keys=function(t){return wa(t),ci.apply(this,arguments)},Ga&&(pt.values=function(t){return wa(t),Ga.apply(this,arguments)}),Ha&&(pt.entries=function(t){return wa(t),Ha.apply(this,arguments)});}catch{}}}function np(){if(se.isHookInstalled){try{pt.keys=ci,Ga&&(pt.values=Ga),Ha&&(pt.entries=Ha);}catch{}se.isHookInstalled=false;}}function zb(){if(se.scanInterval||ja())return;const e=()=>{if(ja()||se.scanAttempts>Nb){op();return}se.scanAttempts++;try{ci(q).forEach(t=>{try{wa(q[t]);}catch{}});}catch{}};e(),se.scanInterval=setInterval(e,Fb);}function op(){se.scanInterval&&(clearInterval(se.scanInterval),se.scanInterval=null);}const Hc=q;function Gb(){try{for(const e of Hc.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Gc.test(t))return t}}catch{}try{for(const e of Hc.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Gc.test(t))return t}}catch{}return null}function Hb(e,t){const n=[];let o=e.indexOf(t);for(;o!==-1;)n.push(o),o=e.indexOf(t,o+t.length);return n}function di(e,t){let n=0,o="",r=false;for(let a=t;a<e.length;a++){const i=e[a];if(o){if(r){r=false;continue}if(i==="\\"){r=true;continue}i===o&&(o="");continue}if(i==='"'||i==="'"||i==="`"){o=i;continue}if(i==="{")n++;else if(i==="}"&&--n===0)return e.slice(t,a+1)}return null}function jb(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const o=e.indexOf("=",n);if(o<0||o>t)return null;const r=e.indexOf("{",o);return r<0||r>t?null:di(e,r)}let Ui=null,mo=null;async function rp(){return Ui||mo||(mo=(async()=>{const e=Gb();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return Ui=n,n}catch{return null}finally{mo=null;}})(),mo)}function Ub(e){const t={};let n=false;for(const o of Lb){const r=e?.[o];if(!r||typeof r!="object")continue;const a=r.iconSpriteKey||null,{iconSpriteKey:i,...s}=r;t[o]={weatherId:o,spriteId:a,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}function Wb(e,t){const n=Math.max(0,t-3e3),o=e.substring(n,t),r=/Rain:\{/,a=o.match(r);if(!a||a.index===void 0)return null;const i=n+a.index;let s=-1;for(let l=i-1;l>=Math.max(0,i-200);l--)if(e[l]==="{"){s=l;break}return s<0?null:di(e,s)}function Vb(e){return e.replace(/\$t\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"').replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"')}async function qb(){if(se.data.weather)return  true;const e=await rp();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=jb(e,t)??Wb(e,t);if(!n)return  false;const o=Vb(n);let r;try{r=Function('"use strict";return('+o+")")();}catch{return  false}const a=Ub(r);return a?(se.data.weather=a,true):false}function Xb(){if(se.weatherPollingTimer)return;se.weatherPollAttempts=0;const e=setInterval(async()=>{(await qb()||++se.weatherPollAttempts>Ob)&&(clearInterval(e),se.weatherPollingTimer=null);},$b);se.weatherPollingTimer=e;}function Kb(){se.weatherPollingTimer&&(clearInterval(se.weatherPollingTimer),se.weatherPollingTimer=null);}const Yb={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function Jb(e){const t=Hb(e,Es);if(!t.length)return null;for(const n of t){const o=Math.max(0,n-4e3),r=Math.min(e.length,n+4e3),i=e.slice(o,r).lastIndexOf("switch(");if(i===-1)continue;const s=o+i,l=e.indexOf("{",s);if(l===-1)continue;const d=di(e,l);if(d&&d.includes(Es)&&(d.includes('bg:"')||d.includes("bg:'")))return d}return null}function Qb(e){const t={},n=[],o=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,r=(i,s)=>{const l=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),d=i.match(l);return d?d[2]:null};let a;for(;(a=o.exec(e))!==null;){if(a[2]){n.push(a[2]);continue}const i=a[0];if(i.startsWith("default")){n.length=0;continue}if(!i.startsWith("return"))continue;const s=e.indexOf("{",a.index);if(s===-1){n.length=0;continue}const l=di(e,s);if(!l){n.length=0;continue}const d=r(l,"bg");if(!d){n.length=0;continue}const c=r(l,"hover")||d;for(const u of n)t[u]||(t[u]={bg:d,hover:c});n.length=0;}return Object.keys(t).length?t:null}async function Zb(){const e=await rp();if(!e)return null;const t=Jb(e);return t?Qb(t):null}function ex(e){const t=e[Es];return t!=null&&typeof t=="object"&&"color"in t}async function tx(){if(!se.data.abilities)return  false;const e=se.data.abilities;if(ex(e))return  true;const t=await Zb();if(!t)return  false;const n={};for(const[o,r]of Object.entries(e)){const a=t[o]||Yb;n[o]={...r,color:{bg:a.bg,hover:a.hover}};}return se.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function nx(){if(se.colorPollingTimer)return;se.colorPollAttempts=0;const e=setInterval(async()=>{(await tx()||++se.colorPollAttempts>Db)&&(clearInterval(e),se.colorPollingTimer=null);},Bb);se.colorPollingTimer=e;}function ox(){se.colorPollingTimer&&(clearInterval(se.colorPollingTimer),se.colorPollingTimer=null);}function rx(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function ax(){return {lru:new Map,cost:0,srcCanvas:new Map}}function ix(){return {cache:new Map,maxEntries:200}}const sx={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},lx={enabled:true,maxEntries:200},$e=rx(),cx=ax(),dx={...sx},ux=ix(),px={...lx};function Ue(){return $e}function Kn(){return cx}function or(){return dx}function rr(){return ux}function As(){return px}function ap(){return $e.ready}const jc=Function.prototype.bind,xe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let ip,sp,lp;const fx=new Promise(e=>{ip=e;}),gx=new Promise(e=>{sp=e;}),mx=new Promise(e=>{lp=e;});function hx(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function bx(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function xx(e){xe.engine=e,xe.tos=bx(e)||null,xe.app=e.app||null,xe.renderer=e.app?.renderer||null,xe.ticker=e.app?.ticker||null,xe.stage=e.app?.stage||null;try{ip(e);}catch{}try{xe.app&&sp(xe.app);}catch{}try{xe.renderer&&lp(xe.renderer);}catch{}}function Il(){return xe.engine?true:(xe._bindPatched||(xe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=jc.call(this,e,...t);try{!xe.engine&&hx(e)&&(Function.prototype.bind=jc,xe._bindPatched=!1,xx(e));}catch{}return n}),false)}Il();async function yx(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(xe.engine)return  true;Il(),await li(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function vx(e=15e3){return xe.engine||await yx(e),true}function wx(){return xe.engine&&xe.app?{ok:true,engine:xe.engine,tos:xe.tos,app:xe.app}:(Il(),{ok:false,engine:xe.engine,tos:xe.tos,app:xe.app,note:"Not captured. Wait for room, or reload."})}const ot={engineReady:fx,appReady:gx,rendererReady:mx,engine:()=>xe.engine,tos:()=>xe.tos,app:()=>xe.app,renderer:()=>xe.renderer,ticker:()=>xe.ticker,stage:()=>xe.stage,PIXI:()=>q.PIXI||null,init:vx,hook:wx,ready:()=>!!xe.engine};function Ua(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function vr(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Ua(o):`sprite/${n}/${o}`}function ar(e,t,n,o){const r=vr(e,t);if(n.has(r)||o.has(r))return r;const a=String(t||"").trim();if(n.has(a)||o.has(a))return a;const i=Ua(a);return n.has(i)||o.has(i)?i:r}function Sx(e,t,n=25e3){const o=[e],r=new Set;let a=0;for(;o.length&&a++<n;){const i=o.pop();if(!i||r.has(i))continue;if(r.add(i),t(i))return i;const s=i.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l]);}return null}function Cx(e){const t=q.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,o=Sx(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function kx(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return Cx(e)}catch{await li(50);}throw new Error("Constructors timeout")}const on=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function Ix(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Wi(e,t,n,o,r){return new e(t,n,o,r)}function _x(e,t,n,o,r,a,i){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:a||0});}catch{s=new e(t.baseTexture||t,n,o,r||void 0,a||0);}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.();}catch{}return s}function Tx(e,t,n,o){const{Texture:r,Rectangle:a}=o;for(const[i,s]of Object.entries(e.frames)){const l=s.frame,d=!!s.rotated,c=d?2:0,u=d?l.h:l.w,p=d?l.w:l.h,f=Wi(a,l.x,l.y,u,p),g=s.sourceSize||{w:l.w,h:l.h},x=Wi(a,0,0,g.w,g.h);let b=null;if(s.trimmed&&s.spriteSourceSize){const h=s.spriteSourceSize;b=Wi(a,h.x,h.y,h.w,h.h);}n.set(i,_x(r,t,f,x,b,c,s.anchor||null));}}function Ex(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;const a=r.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(o,a);}}function Ax(e,t){const n=(o,r)=>{const a=String(o||"").trim(),i=String(r||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i));};for(const o of Object.keys(e.frames||{})){const r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2]);}}async function Px(e,t){const n=await Lt.load({baseUrl:e}),o=Lt.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");const r=Lt.listJsonFromBundle(o),a=new Set,i=new Map,s=new Map,l=new Map;async function d(c){if(a.has(c))return;a.add(c);const u=await Sl(Mt(e,c));if(!Ix(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const b of p)await d(Bc(c,b));const f=Bc(c,u.meta.image),g=await gb(await Xu(Mt(e,f))),x=t.Texture.from(g);Tx(u,x,i,t),Ex(u,i,s),Ax(u,l);}for(const c of r)await d(c);return {textures:i,animations:s,categoryIndex:l}}let Wr=null;async function Mx(){return $e.ready?true:Wr||(Wr=(async()=>{const e=performance.now();on("init start");const t=await Dc(ot.appReady,15e3,"PIXI app");on("app ready");const n=await Dc(ot.rendererReady,15e3,"PIXI renderer");on("renderer ready"),$e.app=t,$e.renderer=n||t?.renderer||null,$e.ctors=await kx(t),on("constructors resolved"),$e.baseUrl=await Sn.base(),on("base url",$e.baseUrl);const{textures:o,animations:r,categoryIndex:a}=await Px($e.baseUrl,$e.ctors);return $e.textures=o,$e.animations=r,$e.categoryIndex=a,on("atlases loaded","textures",$e.textures.size,"animations",$e.animations.size,"categories",$e.categoryIndex?.size??0),$e.ready=true,on("ready in",Math.round(performance.now()-e),"ms"),true})(),Wr)}const Yn={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},cp=Object.keys(Yn),Lx=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Uc=new Map(Lx.map((e,t)=>[e,t]));function Wa(e){return [...new Set(e.filter(Boolean))].sort((n,o)=>(Uc.get(n)??1/0)-(Uc.get(o)??1/0))}const Rx=["Wet","Chilled","Frozen"],Nx=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Fx={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Ox={Pepper:.5,Banana:.6},$x=256,Dx=.5,Bx=2;function dp(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=Wa(e),n=zx(e),o=Gx(e);return {muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function zx(e){const t=e.filter((r,a,i)=>Yn[r]&&i.indexOf(r)===a);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?Wa(t.filter(r=>!Rx.includes(r))):Wa(t)}function Gx(e){const t=e.filter((n,o,r)=>Yn[n]?.overlayTall&&r.indexOf(n)===o);return Wa(t)}function Vi(e,t){return e.map(n=>({name:n,meta:Yn[n],overlayTall:Yn[n]?.overlayTall??null,isTall:t}))}const Hx={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Vr=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(const r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function jx(e){return Vr.has(e)?e:Vr.has("overlay")?"overlay":Vr.has("screen")?"screen":Vr.has("lighter")?"lighter":"source-atop"}function Ux(e,t,n,o,r=false){const a=(o-90)*Math.PI/180,i=t/2,s=n/2;if(!r){const u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}const l=Math.cos(a),d=Math.sin(a),c=Math.abs(l)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-l*c,s-d*c,i+l*c,s+d*c)}function Wc(e,t,n,o,r=false){const a=o.colors?.length?o.colors:["#fff"],i=o.ang!=null?Ux(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,l)=>i.addColorStop(l/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n);}function Wx(e,t,n,o){const r=Hx[n];if(!r)return;const a={...r};n==="Rainbow"&&o&&a.angTall!=null&&(a.ang=a.angTall);const i=n==="Rainbow"&&o,s=t.width,l=t.height;e.save();const d=a.masked?jx(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){const c=document.createElement("canvas");c.width=s,c.height=l;const u=c.getContext("2d");u.imageSmoothingEnabled=false,Wc(u,s,l,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(c,0,0);}else Wc(e,s,l,a,i);e.restore();}function Vx(e){return /tallplant/i.test(e)}function _l(e){const t=String(e||"").split("/");return t[t.length-1]||""}function up(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function qx(e,t){const n=String(e||"").toLowerCase();for(const o of t.keys()){const r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){const i=t.get(o);if(i)return {tex:i,key:o}}}return null}function Xx(e,t,n,o){if(!t)return null;const r=_l(e),a=up(t);for(const i of a){const s=[`sprite/mutation/${i}${r}`,`sprite/mutation/${i}-${r}`,`sprite/mutation/${i}_${r}`,`sprite/mutation/${i}/${r}`,`sprite/mutation/${i}`];for(const l of s){const d=n.get(l);if(d)return {tex:d,key:l}}{const l=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(l);if(d)return {tex:d,key:l};const c=`sprite/mutation-overlay/${i}`,u=n.get(c);if(u)return {tex:u,key:c};const p=qx(t,n);if(p)return p}}return null}function Kx(e,t,n,o){if(!t)return null;const r=Yn[t];if(n&&r?.tallIconOverride){const s=o.get(r.tallIconOverride);if(s)return s}const a=_l(e),i=up(t);for(const s of i){const l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(const d of l){const c=o.get(d);if(c)return c}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,c=o.get(d);if(c)return c;const u=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(u);if(p)return p}}return null}function Yx(e,t,n){const o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0;let s=Ox[t]??a;const l=r>o*1.5;let d=Fx[t]??(l?i:.4);const c={x:(s-a)*o,y:(d-i)*r},u=Math.min(o,r),p=Math.min(1.5,u/$x);let f=Dx*p;return n&&(f*=Bx),{width:o,height:r,anchorX:a,anchorY:i,offset:c,iconScale:f}}function pp(e,t){return `${t.sig}::${e}`}function fp(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Jx(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function Qx(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-fp(o??null));}}function gp(e,t){const n=e.lru.get(t);return n?(Jx(e,t,n),n):null}function mp(e,t,n,o){e.lru.set(t,n),e.cost+=fp(n),Qx(e,o);}function Zx(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function ey(e,t){return e.srcCanvas.get(t)??null}function ty(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){const r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r);}}function ui(e,t,n,o,r){const a=ey(o,e);if(a)return a;let i=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const l=new n.Sprite(e),d=t.extract.canvas(l);if(l.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const c=Math.round(d.width/s),u=Math.round(d.height/s);i=document.createElement("canvas"),i.width=c,i.height=u;const p=i.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,c,u));}else i=d;}}catch{}if(!i){const l=e?.frame||e?._frame,d=e?.orig||e?._orig,c=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!l||!p)throw new Error("textureToCanvas fail");i=document.createElement("canvas");const f=Math.max(1,(d?.width??l.width)|0),g=Math.max(1,(d?.height??l.height)|0),x=c?.x??0,b=c?.y??0;i.width=f,i.height=g;const h=i.getContext("2d");h.imageSmoothingEnabled=false,u===true||u===2||u===8?(h.save(),h.translate(x+l.height/2,b+l.width/2),h.rotate(-Math.PI/2),h.drawImage(p,l.x,l.y,l.width,l.height,-l.width/2,-l.height/2,l.width,l.height),h.restore()):h.drawImage(p,l.x,l.y,l.width,l.height,x,b,l.width,l.height);}return ty(o,e,i,r),i}function ny(e,t,n,o,r,a,i,s){const{w:l,h:d,aX:c,aY:u,basePos:p}=t,f=[];for(const g of n){const x=new o.Sprite(e);x.anchor?.set?.(c,u),x.position.set(p.x,p.y),x.zIndex=1;const b=document.createElement("canvas");b.width=l,b.height=d;const h=b.getContext("2d");h.imageSmoothingEnabled=false,h.save(),h.translate(l*c,d*u),h.drawImage(ui(e,r,o,a,i),-l*c,-d*u),h.restore(),Wx(h,b,g.name,g.isTall);const v=o.Texture.from(b,{resolution:e.resolution??1});s.push(v),x.texture=v,f.push(x);}return f}function oy(e,t,n,o,r,a,i,s,l,d){const{aX:c,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&o.get(f.overlayTall)&&{tex:o.get(f.overlayTall),key:f.overlayTall}||Xx(e,f.name,o);if(!g?.tex)continue;const x=ui(g.tex,a,r,i,s);if(!x)continue;const b=x.width,h={x:0,y:0},v={x:u.x-c*b,y:0},_=document.createElement("canvas");_.width=b,_.height=x.height;const k=_.getContext("2d");if(!k)continue;k.imageSmoothingEnabled=false,k.drawImage(x,0,0),k.globalCompositeOperation="destination-in",k.drawImage(l,-v.x,-0);const w=r.Texture.from(_,{resolution:g.tex.resolution??1});d.push(w);const y=new r.Sprite(w);y.anchor?.set?.(h.x,h.y),y.position.set(v.x,v.y),y.scale.set(1),y.alpha=1,y.zIndex=3,p.push(y);}return p}function ry(e,t,n,o,r,a){const{basePos:i}=t,s=[];for(const l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;const d=Kx(e,l.name,l.isTall,o);if(!d)continue;const c=new r.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;c.anchor?.set?.(u,p),c.position.set(i.x+a.offset.x,i.y+a.offset.y),c.scale.set(a.iconScale),l.isTall&&(c.zIndex=-1),Nx.has(l.name)&&(c.zIndex=10),c.zIndex||(c.zIndex=2),s.push(c);}return s}function hp(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;const{Container:r,Sprite:a,Texture:i}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,c=e?.defaultAnchor?.y??.5,u={x:s*d,y:l*c},p=ui(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),f=new r;f.sortableChildren=!0;const g=new a(e);g.anchor?.set?.(d,c),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const x=Vx(t),b=Vi(n.muts,x),h=Vi(n.overlayMuts,x),v=Vi(n.selectedMuts,x),_=[],k={w:s,h:l,aX:d,aY:c,basePos:u},w=_l(t),y=Yx(e,w,x);ny(e,k,b,o.ctors,o.renderer,o.cacheState,o.cacheConfig,_).forEach(B=>f.addChild(B)),x&&oy(t,k,h,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,_).forEach(j=>f.addChild(j)),ry(t,k,v,o.textures,o.ctors,y).forEach(B=>f.addChild(B));let C={x:0,y:0,width:s,height:l};try{const B=f.getLocalBounds?.()||f.getBounds?.(!0);B&&Number.isFinite(B.width)&&Number.isFinite(B.height)&&(C={x:B.x,y:B.y,width:B.width,height:B.height});}catch{}const{Rectangle:A}=o.ctors,R=A?new A(0,0,s,l):void 0;let $=null;if(typeof o.renderer.generateTexture=="function"?$=o.renderer.generateTexture(f,{resolution:1,region:R}):o.renderer.textureGenerator?.generateTexture&&($=o.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:R})),!$)throw new Error("no render texture");const Y=$ instanceof i?$:i.from(o.renderer.extract.canvas($));try{Y.__mg_base={baseX:-C.x,baseY:-C.y,baseW:s,baseH:l,texW:C.width,texH:C.height};}catch{}$&&$!==Y&&$.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{Y.__mg_gen=!0,Y.label=`${t}|${n.sig}`;}catch{}return Y}catch{return null}}function ay(e,t,n,o){if(!e||e.length<2)return null;const r=[];for(const a of e){const i=hp(a,t,n,o);i&&r.push(i);}return r.length>=2?r:null}function bp(e,t,n,o,r){const a=t.scale??1,i=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",l=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${a}|f${i}|m${s}|ax${l}|ay${d}|bm${n}|bp${r}|p${o}`}function iy(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function sy(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,a=1/0;for(const[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,r=i);r&&e.cache.delete(r);}e.cache.set(n,{canvas:o,lastAccess:performance.now()});}}function Vc(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function ly(e){e.cache.clear();}function cy(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function dy(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function uy(e,t,n,o,r,a,i,s=5,l=0){if(!t.ready||!a.enabled)return 0;const d=e.length;let c=0;i?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=ar(null,f,t.textures,t.animations),x={scale:1},b=yp(x),h=vp(b,x),v=Sp(b,x.boundsPadding),_=bp(g,x,b,h,v);r.cache.has(_)||Ps(t,n,o,null,f,x,r,a),c++;}catch{c++;}i?.(c,d),u+s<d&&await dy();}return c}function py(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function fy(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Tl(e,t,n,o,r,a){if(!n.length)return t;const i=dp(n);if(!i.sig)return t;const s=pp(e,i),l=gp(r,s);if(l?.tex)return l.tex;const d=hp(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return d?(mp(r,s,{isAnim:false,tex:d},a),d):t}function xp(e,t,n,o,r,a){if(!n.length)return t;const i=dp(n);if(!i.sig)return t;const s=pp(e,i),l=gp(r,s);if(l?.isAnim&&l.frames?.length)return l.frames;const d=ay(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return d?(mp(r,s,{isAnim:true,frames:d},a),d):t}function qc(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");const i=ar(o,r,e.textures,e.animations),s=a.mutations||[],l=a.parent||fy(e)||py(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,c=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?c/2:a.y??c/2;let f;const g=e.animations.get(i);if(g&&g.length>=2){const h=xp(i,g,s,e,t,n),v=e.ctors.AnimatedSprite;if(v)f=new v(h),f.animationSpeed=a.fps?a.fps/60:a.speed??.15,f.loop=a.loop??true,f.play();else {const _=new e.ctors.Sprite(h[0]),w=1e3/Math.max(1,a.fps||8);let y=0,S=0;const I=C=>{const A=e.app.ticker?.deltaMS??C*16.666666666666668;if(y+=A,y<w)return;const R=y/w|0;y%=w,S=(S+R)%h.length,_.texture=h[S];};_.__mgTick=I,e.app.ticker?.add?.(I),f=_;}}else {const h=e.textures.get(i);if(!h)throw new Error(`Unknown sprite/anim key: ${i}`);const v=Tl(i,h,s,e,t,n);f=new e.ctors.Sprite(v);}const x=a.anchorX??f.texture?.defaultAnchor?.x??.5,b=a.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(x,b),f.position.set(u,p),f.scale.set(a.scale??1),f.alpha=a.alpha??1,f.rotation=a.rotation??0,f.zIndex=a.zIndex??999999,l.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function gy(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const Xc=new Map;function yp(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function vp(e,t){return e==="mutations"?t.pad??2:t.pad??0}function ho(e){return Number.isFinite(e)?Math.max(0,e):0}function wp(e){if(typeof e=="number"){const t=ho(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:ho(e.top??0),right:ho(e.right??0),bottom:ho(e.bottom??0),left:ho(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Sp(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=wp(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function Cp(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function kp(e,t,n){const o=e?.__mg_base;return o&&Number.isFinite(o.baseX)&&Number.isFinite(o.baseY)&&Number.isFinite(o.baseW)&&Number.isFinite(o.baseH)&&Number.isFinite(o.texW)&&Number.isFinite(o.texH)?o:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function my(e,t,n,o,r,a){const i=`${e}|f${t}`,s=Xc.get(i);if(s)return s;const l=Cp(n),d={top:0,right:0,bottom:0,left:0};for(const c of cp){const u=Tl(e,n,[c],o,r,a),p=kp(u,l.w,l.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),x=Math.max(0,p.texW-p.baseX-p.baseW),b=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),x>d.right&&(d.right=x),b>d.bottom&&(d.bottom=b);}return Xc.set(i,d),d}function Ps(e,t,n,o,r,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");const l=ar(o,r,e.textures,e.animations),d=yp(a),c=vp(d,a),u=Sp(d,a.boundsPadding),p=i&&s?.enabled?bp(l,a,d,c,u):null;if(p&&i&&s?.enabled){const _=iy(i,p);if(_)return Vc(_)}const f=a.mutations||[],g=e.animations.get(l),x=Math.max(0,(a.frameIndex??0)|0);let b,h;if(g?.length)if(b=g[x%g.length],f.length){const _=xp(l,g,f,e,t,n);h=_[x%_.length];}else h=b;else {const _=e.textures.get(l);if(!_)throw new Error(`Unknown sprite/anim key: ${l}`);b=_,h=Tl(l,_,f,e,t,n);}let v;if(d==="mutations"){const _=new e.ctors.Sprite(h),k=a.anchorX??_.texture?.defaultAnchor?.x??.5,w=a.anchorY??_.texture?.defaultAnchor?.y??.5;_.anchor?.set?.(k,w),_.scale.set(a.scale??1);const y=new e.ctors.Container;y.addChild(_);try{y.updateTransform?.();}catch{}const S=_.getBounds?.(true)||{x:0,y:0,width:_.width,height:_.height};_.position.set(-S.x+c,-S.y+c),v=gy(e,y);try{y.destroy?.({children:!0});}catch{}}else {const _=a.scale??1;let k=wp(a.boundsPadding);d==="padded"&&a.boundsPadding==null&&(k=my(l,x,b,e,t,n)),c&&(k={top:k.top+c,right:k.right+c,bottom:k.bottom+c,left:k.left+c});const w=Cp(b),y=kp(h,w.w,w.h),S=Math.max(1,Math.ceil((w.w+k.left+k.right)*_)),I=Math.max(1,Math.ceil((w.h+k.top+k.bottom)*_));v=document.createElement("canvas"),v.width=S,v.height=I;const C=v.getContext("2d");if(C){C.imageSmoothingEnabled=false;const A=ui(h,e.renderer,e.ctors,t,n),R=(k.left-y.baseX)*_,$=(k.top-y.baseY)*_;C.drawImage(A,R,$,A.width*_,A.height*_);}}return p&&i&&s?.enabled?(sy(i,s,p,v),Vc(v)):v}function hy(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function by(e,t){return e.defaultParent=t,true}function xy(e,t){return e.defaultParent=t,true}function Cn(){if(!ap())throw new Error("MGSprite not ready yet")}function yy(e,t,n){return typeof t=="string"?qc(Ue(),Kn(),or(),e,t,n||{}):qc(Ue(),Kn(),or(),null,e,t||{})}function vy(e,t,n){return typeof t=="string"?Ps(Ue(),Kn(),or(),e,t,n||{},rr(),As()):Ps(Ue(),Kn(),or(),null,e,t||{},rr(),As())}function wy(){hy(Ue());}function Sy(e){return by(Ue(),e)}function Cy(e){return xy(Ue(),e)}function ky(e,t){const n=Ue(),o=typeof t=="string"?ar(e,t,n.textures,n.animations):ar(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function Iy(){Cn();const e=Ue().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function _y(e){Cn();const t=String(e||"").trim();if(!t)return [];const n=Ue().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Ty(e,t){Cn();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return  false;const r=Ue().categoryIndex;if(!r)return  false;const a=n.toLowerCase(),i=o.toLowerCase();for(const[s,l]of r.entries())if(s.toLowerCase()===a){for(const d of l.values())if(d.toLowerCase()===i)return  true}return  false}function Ey(e){Cn();const t=Ue().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),o=[];for(const[r,a]of t.entries())for(const i of a.values()){const s=vr(r,i);(!n||s.toLowerCase().startsWith(n))&&o.push(s);}return o.sort((r,a)=>r.localeCompare(a))}function Ay(e){Cn();const t=String(e||"").trim();if(!t)return null;const n=Ua(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;const r=o[1],a=o[2],i=Ue().categoryIndex,s=r.toLowerCase(),l=a.toLowerCase();let d=r,c=a;if(i){const u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=i.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===l);if(!f)return null;c=f;}return {category:d,id:c,key:vr(d,c)}}function Py(e,t){Cn();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");const r=Ue().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");const a=n.toLowerCase(),i=o.toLowerCase(),s=Array.from(r.keys()).find(c=>c.toLowerCase()===a)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(l.values()).find(c=>c.toLowerCase()===i)||o;if(!l.has(d))throw new Error(`Unknown sprite id: ${n}/${o}`);return vr(s,d)}function My(){Zx(Kn());}function Ly(){ly(rr());}function Ry(){return cy(rr())}function Ny(){return [...cp]}async function Fy(e,t,n=10,o=0){return Cn(),uy(e,Ue(),Kn(),or(),rr(),As(),t,n,o)}const J={init:Mx,isReady:ap,show:yy,toCanvas:vy,clear:wy,attach:Sy,attachProvider:Cy,has:ky,key:(e,t)=>vr(e,t),getCategories:Iy,getCategoryId:_y,hasId:Ty,listIds:Ey,getIdInfo:Ay,getIdPath:Py,clearMutationCache:My,clearToCanvasCache:Ly,getToCanvasCacheStats:Ry,getMutationNames:Ny,warmup:Fy};function Oy(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function $y(e,t=[]){const n=new Set,o=r=>{const a=String(r||"").trim();a&&n.add(a);};o(e);for(const r of t)o(r);for(const r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Ip(e,t,n,o=[],r=[]){if(!J)return console.warn("[MGData] MGSprite not available in pickSpriteId"),null;const a=$y(e,o);if(!a.length)return null;const i=[t,...r].filter(c=>typeof c=="string"),s=c=>{const u=String(c||"").trim();if(!u)return null;for(const p of a)try{if(J.has(p,u))return J.getIdPath(p,u)}catch{}return null};for(const c of i){const u=s(c);if(u)return u}const l=Oy(n||""),d=s(l||n||"");if(d)return d;try{for(const c of a){const u=J.listIds(`sprite/${c}/`),p=i.map(g=>String(g||"").toLowerCase()),f=String(n||l||"").toLowerCase();for(const g of u){const b=(g.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===f)return g}for(const g of u){const b=(g.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&(b.includes(h)||h.includes(b)))||f&&(b.includes(f)||f.includes(b)))return g}}}catch{}return null}function Ze(e,t,n,o,r=[],a=[]){if(!e||typeof e!="object")return;const i=e.tileRef;if(!i||typeof i!="object")return;const s=String(i.spritesheet||t||"").trim(),l=Ip(s,n,o,r,a);if(l)try{e.spriteId=l;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const c of Object.values(d))Ze(c,s,n,o);if(e.immatureTileRef){const c={tileRef:e.immatureTileRef};Ze(c,s,n,o),c.spriteId&&(e.immatureSpriteId=c.spriteId);}if(e.topmostLayerTileRef){const c={tileRef:e.topmostLayerTileRef};Ze(c,s,n,o),c.spriteId&&(e.topmostLayerSpriteId=c.spriteId);}e.activeState&&typeof e.activeState=="object"&&Ze(e.activeState,s,n,e.activeState?.name||o);}function Dy(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;const r=t[0],a=t.slice(1);return Ip(e,r,n??null,o,a)}function By(e){for(const[t,n]of Object.entries(e.items||{}))Ze(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Ze(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Ze(n,"mutations",t,n?.name,["mutation"]);const o=Dy("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Ze(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Ze(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const o=n;o.seed&&Ze(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&Ze(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&Ze(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function zy(){try{console.log("[MGData] Resolving sprites..."),By(se.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const _p=5e3,Tp=50;function Ep(e){return new Promise(t=>setTimeout(t,e))}function Gy(e){return se.data[e]}function Hy(){return {...se.data}}function jy(e){return se.data[e]!=null}async function Uy(e,t=_p,n=Tp){const o=Date.now();for(;Date.now()-o<t;){const r=se.data[e];if(r!=null)return r;await Ep(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Wy(e=_p,t=Tp){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(se.data).some(o=>o!=null))return {...se.data};await Ep(t);}throw new Error("MGData.waitForAnyData: timeout")}const Ap=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Pp(e){return Ap.includes(e)}function Mp(e){return e.filter(t=>Pp(t.action))}function Kc(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${o}s`:`${o}s`}function qi(e){return e?.name||e?.petSpecies||"Unknown Pet"}function Lp(e){const{action:t,parameters:n}=e,o=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${o.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${o.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const r=qi(o.targetPet),a=o.hungerRestoreAmount||0,s=o.pet?.id===o.targetPet?.id?"itself":r;return `Restored ${a} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${o.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${o.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const r=o.growSlot?.species||"Unknown",a=o.sellPrice||0;return `Ate ${r} for ${a} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const r=qi(o.targetPet),a=o.strengthIncrease||0;return `Boosted ${r}'s size by +${a.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const r=qi(o.targetPet);return `Gave +${o.bonusXp||0} XP to ${r}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${o.eggId||"Unknown Egg"}`;case "ProduceRefund":{const r=o.cropsRefunded?.length||0;return `Refunded ${r} ${r===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${o.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const r=o.mutation||"Unknown";return `Made ${o.growSlot?.species||"Unknown"} turn ${r}`}case "PetXpBoost":case "PetXpBoostII":{const r=o.bonusXp||0,a=o.petsAffected?.length||0;return `Gave +${r} XP to ${a} ${a===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const r=o.secondsReduced||0,a=o.eggsAffected?.length||0,i=Kc(r);return `Reduced ${a} ${a===1?"egg":"eggs"} growth by ${i}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const r=o.secondsReduced||0,a=o.numPlantsAffected||0,i=Kc(r);return `Reduced ${a} ${a===1?"plant":"plants"} growth by ${i}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const r=o.scaleIncreasePercentage||0,a=o.numPlantsAffected||0;return `Boosted ${a} ${a===1?"crop":"crops"} size by +${r.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const te={async init(){tp(),zb(),Xb(),nx();},isReady:ja,get:Gy,getAll:Hy,has:jy,waitFor:Uy,waitForAny:Wy,resolveSprites:zy,cleanup(){np(),op(),Kb(),ox();}},Vy=new Map;function qy(){return Vy}function Ms(){return q.jotaiAtomCache?.cache}function Wt(e){const t=qy(),n=t.get(e);if(n)return n;const o=Ms();if(!o)return null;for(const r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function Xy(){const e=q;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:o=>{const r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{const a=n.get(o);a&&a.add(r);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:false};}const Ky={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function oo(){return Ky}const Yy="__JOTAI_STORE_READY__";let Yc=false;const Ls=new Set;function qr(){if(!Yc){Yc=true;for(const e of Ls)try{e();}catch{}try{const e=q.CustomEvent||CustomEvent;q.dispatchEvent?.(new e(Yy));}catch{}}}function Jy(e){Ls.add(e);const t=Ns();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Ls.delete(e);}}async function Qy(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Ns();if(!(o.via&&!o.polyfill))return new Promise((r,a)=>{let i=false;const s=Jy(()=>{i||(i=true,s(),r());}),l=Date.now();(async()=>{for(;!i&&Date.now()-l<t;){const c=Ns();if(c.via&&!c.polyfill){if(i)return;i=true,s(),r();return}await ir(n);}i||(i=true,s(),a(new Error("Store not captured within timeout")));})();})}const ir=e=>new Promise(t=>setTimeout(t,e));function Rp(){try{const e=q.Event||Event;q.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Rs(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Xi(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Rs(e))return e;const o=["store","value","current","state","s","baseStore"];for(const r of o)try{const a=e[r];if(Rs(a))return a}catch{}return null}function Np(){const e=oo(),t=q.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);r&&(n+=r.size||0);}if(n===0)return null;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);if(r)for(const a of r){const i=new Set,s=[a.current];for(;s.length;){const l=s.pop();if(!(!l||i.has(l))){i.add(l);try{const d=l?.pendingProps?.value;if(Rs(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=l?.memoizedState,c=0;for(;d&&c<15;){c++;const u=Xi(d);if(u)return e.lastCapturedVia="fiber",u;const p=Xi(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(l?.stateNode){const d=Xi(l.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate);}}}}return null}function Fp(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Zy(e=5e3){const t=Date.now();let n=Ms();for(;!n&&Date.now()-t<e;)await ir(100),n=Ms();if(!n)throw new Error("jotaiAtomCache.cache not found");const o=oo();let r=null,a=null;const i=[],s=()=>{for(const d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const c=d.write;d.__origWrite=c,d.write=function(u,p,...f){return a||(r=u,a=p,s()),c.call(this,u,p,...f)},i.push(d);}Rp();const l=Date.now();for(;!a&&Date.now()-l<e;)await ir(50);return a?(o.lastCapturedVia="write",{get:d=>r(d),set:(d,c)=>a(d,c),sub:(d,c)=>{let u;try{u=r(d);}catch{}const p=setInterval(()=>{let f;try{f=r(d);}catch{return}if(f!==u){u=f;try{c();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",Fp())}async function e0(e=1e4){const t=oo();Rp();const n=Date.now();for(;Date.now()-n<e;){const o=Np();if(o)return o;await ir(50);}return t.lastCapturedVia="polyfill",Fp()}async function El(){const e=oo();if(e.baseStore&&!e.baseStore.__polyfill)return qr(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await ir(25);if(e.baseStore)return e.baseStore.__polyfill||qr(),e.baseStore}e.captureInProgress=true;try{const t=Np();if(t)return e.baseStore=t,qr(),t;try{const o=await Zy(5e3);return e.baseStore=o,o.__polyfill||qr(),o}catch(o){e.captureError=o;}const n=await e0();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Ns(){const e=oo();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function t0(){const e=await El(),t=new WeakMap,n=async r=>{let a=t.get(r);if(a)return a;a={last:void 0,has:false,subs:new Set},t.set(r,a);try{a.last=e.get(r),a.has=!0;}catch{}const i=e.sub(r,()=>{let s;try{s=e.get(r);}catch{return}const l=a.last,d=!Object.is(s,l)||!a.has;if(a.last=s,a.has=true,d)for(const c of a.subs)try{c(s,l);}catch{}});return a.unsubUpstream=i,a};return {async get(r){const a=await n(r);if(a.has)return a.last;const i=e.get(r);return a.last=i,a.has=true,i},async set(r,a){await e.set(r,a);const i=await n(r);i.last=a,i.has=true;},async sub(r,a){const i=await n(r);if(i.subs.add(a),i.has)try{a(i.last,i.last);}catch{}return ()=>{i.subs.delete(a);}},getShadow(r){return t.get(r)?.last},hasShadow(r){return !!t.get(r)?.has},async ensureWatch(r){await n(r);},async asStore(){return {get:r=>this.get(r),set:(r,a)=>this.set(r,a),sub:(r,a)=>{let i=null;return this.sub(r,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Sa(){const e=oo();return e.mirror||(e.mirror=await t0()),e.mirror}const ye={async select(e){const t=await Sa(),n=Wt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Sa(),o=Wt(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t);},async subscribe(e,t){const n=await Sa(),o=Wt(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r);}catch{}})},async subscribeImmediate(e,t){const n=await ye.select(e);try{t(n);}catch{}return ye.subscribe(e,t)}};async function n0(){await Sa();}function Al(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function sr(e,t){const n=Al(t);let o=e;for(const r of n){if(o==null)return;o=o[r];}return o}function o0(e,t,n){const o=Al(t);if(!o.length)return n;const r=Array.isArray(e)?[...e]:{...e??{}};let a=r;for(let i=0;i<o.length-1;i++){const s=o[i],l=a[s],d=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};a[s]=d,a=d;}return a[o[o.length-1]]=n,r}function Jc(e,t){const n={};for(const o of t)n[o]=o.includes(".")?sr(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function r0(e,t,n){const o=n.mode??"auto";function r(d){const c=t?sr(d,t):d,u=new Map;if(c==null)return {signatures:u,keys:[]};const p=Array.isArray(c);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<c.length;g++){const x=c[g],b=n.key?n.key(x,g,d):g,h=n.sig?n.sig(x,g,d):n.fields?Jc(x,n.fields):JSON.stringify(x);u.set(b,h);}else for(const[g,x]of Object.entries(c)){const b=n.key?n.key(x,g,d):g,h=n.sig?n.sig(x,g,d):n.fields?Jc(x,n.fields):JSON.stringify(x);u.set(b,h);}return {signatures:u,keys:Array.from(u.keys())}}function a(d,c){if(d===c)return  true;if(!d||!c||d.size!==c.size)return  false;for(const[u,p]of d)if(c.get(u)!==p)return  false;return  true}async function i(d){let c=null;return ye.subscribeImmediate(e,u=>{const p=t?sr(u,t):u,{signatures:f}=r(p);if(!a(c,f)){const g=new Set([...c?Array.from(c.keys()):[],...Array.from(f.keys())]),x=[];for(const b of g){const h=c?.get(b)??"__NONE__",v=f.get(b)??"__NONE__";h!==v&&x.push(b);}c=f,d({value:p,changedKeys:x});}})}async function s(d,c){return i(({value:u,changedKeys:p})=>{p.includes(d)&&c({value:u});})}async function l(d,c){const u=new Set(d);return i(({value:p,changedKeys:f})=>{const g=f.filter(x=>u.has(x));g.length&&c({value:p,changedKeys:g});})}return {sub:i,subKey:s,subKeys:l}}const Fn=new Map;function a0(e,t){const n=Fn.get(e);if(n)try{n();}catch{}return Fn.set(e,t),()=>{try{t();}catch{}Fn.get(e)===t&&Fn.delete(e);}}function ve(e,t={}){const{path:n,write:o="replace"}=t,r=n?`${e}:${Al(n).join(".")}`:e;async function a(){const u=await ye.select(e);return n?sr(u,n):u}async function i(u){if(typeof o=="function"){const g=await ye.select(e),x=o(u,g);return ye.set(e,x)}const p=await ye.select(e),f=n?o0(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ye.set(e,{...p,...u}):ye.set(e,f)}async function s(u){const p=await a(),f=u(p);return await i(f),f}async function l(u,p,f){let g;const x=h=>{const v=n?sr(h,n):h;if(typeof g>"u"||!f(g,v)){const _=g;g=v,p(v,_);}},b=u?await ye.subscribeImmediate(e,x):await ye.subscribe(e,x);return a0(r,b)}function d(){const u=Fn.get(r);if(u){try{u();}catch{}Fn.delete(r);}}function c(u){return r0(e,u?.path??n,u)}return {label:r,get:a,set:i,update:s,onChange:(u,p=Object.is)=>l(false,u,p),onChangeNow:(u,p=Object.is)=>l(true,u,p),asSignature:c,stopOnChange:d}}function L(e){return ve(e)}L("positionAtom");L("lastPositionInMyGardenAtom");L("playerDirectionAtom");L("stateAtom");L("quinoaDataAtom");L("currentTimeAtom");L("actionAtom");L("isPressAndHoldActionAtom");L("mapAtom");L("tileSizeAtom");ve("mapAtom",{path:"cols"});ve("mapAtom",{path:"rows"});ve("mapAtom",{path:"spawnTiles"});ve("mapAtom",{path:"locations.seedShop.spawnTileIdx"});ve("mapAtom",{path:"locations.eggShop.spawnTileIdx"});ve("mapAtom",{path:"locations.toolShop.spawnTileIdx"});ve("mapAtom",{path:"locations.decorShop.spawnTileIdx"});ve("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});ve("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});ve("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});ve("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});ve("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});L("playerAtom");L("myDataAtom");L("myUserSlotIdxAtom");L("isSpectatingAtom");L("myCoinsCountAtom");L("numPlayersAtom");ve("playerAtom",{path:"id"});ve("myDataAtom",{path:"activityLogs"});L("userSlotsAtom");L("filteredUserSlotsAtom");L("myUserSlotAtom");L("spectatorsAtom");ve("stateAtom",{path:"child"});ve("stateAtom",{path:"child.data"});ve("stateAtom",{path:"child.data.shops"});const i0=ve("stateAtom",{path:"child.data.userSlots"}),s0=ve("stateAtom",{path:"data.players"}),l0=ve("stateAtom",{path:"data.hostPlayerId"});L("myInventoryAtom");L("myInventoryItemsAtom");L("isMyInventoryAtMaxLengthAtom");L("myFavoritedItemIdsAtom");L("myCropInventoryAtom");L("mySeedInventoryAtom");L("myToolInventoryAtom");L("myEggInventoryAtom");L("myDecorInventoryAtom");L("myPetInventoryAtom");ve("myInventoryAtom",{path:"favoritedItemIds"});L("itemTypeFiltersAtom");L("myItemStoragesAtom");L("myPetHutchStoragesAtom");L("myPetHutchItemsAtom");L("myPetHutchPetItemsAtom");L("myNumPetHutchItemsAtom");L("myValidatedSelectedItemIndexAtom");L("isSelectedItemAtomSuspended");L("mySelectedItemAtom");L("mySelectedItemNameAtom");L("mySelectedItemRotationsAtom");L("mySelectedItemRotationAtom");L("setSelectedIndexToEndAtom");L("myPossiblyNoLongerValidSelectedItemIndexAtom");L("myCurrentGlobalTileIndexAtom");L("myCurrentGardenTileAtom");L("myCurrentGardenObjectAtom");L("myOwnCurrentGardenObjectAtom");L("myOwnCurrentDirtTileIndexAtom");L("myCurrentGardenObjectNameAtom");L("isInMyGardenAtom");L("myGardenBoardwalkTileObjectsAtom");const c0=ve("myDataAtom",{path:"garden"});ve("myDataAtom",{path:"garden.tileObjects"});ve("myOwnCurrentGardenObjectAtom",{path:"objectType"});L("myCurrentStablePlantObjectInfoAtom");L("myCurrentSortedGrowSlotIndicesAtom");L("myCurrentGrowSlotIndexAtom");L("myCurrentGrowSlotsAtom");L("myCurrentGrowSlotAtom");L("secondsUntilCurrentGrowSlotMaturesAtom");L("isCurrentGrowSlotMatureAtom");L("numGrowSlotsAtom");L("myCurrentEggAtom");L("petInfosAtom");L("myPetInfosAtom");L("myPetSlotInfosAtom");L("myPrimitivePetSlotsAtom");L("myNonPrimitivePetSlotsAtom");L("expandedPetSlotIdAtom");L("myPetsProgressAtom");L("myActiveCropMutationPetsAtom");L("totalPetSellPriceAtom");L("selectedPetHasNewVariantsAtom");const d0=L("shopsAtom"),u0=L("myShopPurchasesAtom");L("seedShopAtom");L("seedShopInventoryAtom");L("seedShopRestockSecondsAtom");L("seedShopCustomRestockInventoryAtom");L("eggShopAtom");L("eggShopInventoryAtom");L("eggShopRestockSecondsAtom");L("eggShopCustomRestockInventoryAtom");L("toolShopAtom");L("toolShopInventoryAtom");L("toolShopRestockSecondsAtom");L("toolShopCustomRestockInventoryAtom");L("decorShopAtom");L("decorShopInventoryAtom");L("decorShopRestockSecondsAtom");L("decorShopCustomRestockInventoryAtom");L("isDecorShopAboutToRestockAtom");ve("shopsAtom",{path:"seed"});ve("shopsAtom",{path:"tool"});ve("shopsAtom",{path:"egg"});ve("shopsAtom",{path:"decor"});L("myCropItemsAtom");L("myCropItemsToSellAtom");L("totalCropSellPriceAtom");L("friendBonusMultiplierAtom");L("myJournalAtom");L("myCropJournalAtom");L("myPetJournalAtom");L("myStatsAtom");L("myActivityLogsAtom");L("newLogsAtom");L("hasNewLogsAtom");L("newCropLogsFromSellingAtom");L("hasNewCropLogsFromSellingAtom");L("myCompletedTasksAtom");L("myActiveTasksAtom");L("isWelcomeToastVisibleAtom");L("shouldCloseWelcomeToastAtom");L("isInitialMoveToDirtPatchToastVisibleAtom");L("isFirstPlantSeedActiveAtom");L("isThirdSeedPlantActiveAtom");L("isThirdSeedPlantCompletedAtom");L("isDemoTouchpadVisibleAtom");L("areShopAnnouncersEnabledAtom");L("arePresentablesEnabledAtom");L("isEmptyDirtTileHighlightedAtom");L("isPlantTileHighlightedAtom");L("isItemHiglightedInHotbarAtom");L("isItemHighlightedInModalAtom");L("isMyGardenButtonHighlightedAtom");L("isSellButtonHighlightedAtom");L("isShopButtonHighlightedAtom");L("isInstaGrowButtonHiddenAtom");L("isActionButtonHighlightedAtom");L("isGardenItemInfoCardHiddenAtom");L("isSeedPurchaseButtonHighlightedAtom");L("isFirstSeedPurchaseActiveAtom");L("isFirstCropHarvestActiveAtom");L("isWeatherStatusHighlightedAtom");L("weatherAtom");const Pl=L("activeModalAtom");L("hotkeyBeingPressedAtom");L("avatarTriggerAnimationAtom");L("avatarDataAtom");L("emoteDataAtom");L("otherUserSlotsAtom");L("otherPlayerPositionsAtom");L("otherPlayerSelectedItemsAtom");L("otherPlayerLastActionsAtom");L("traderBunnyPlayerId");L("npcPlayersAtom");L("npcQuinoaUsersAtom");L("numNpcAvatarsAtom");L("traderBunnyEmoteTimeoutAtom");L("traderBunnyEmoteAtom");L("unsortedLeaderboardAtom");L("currentGardenNameAtom");L("quinoaEngineAtom");L("quinoaInitializationErrorAtom");L("avgPingAtom");L("serverClientTimeOffsetAtom");L("isEstablishingShotRunningAtom");L("isEstablishingShotCompleteAtom");const be={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function pi(){return be}function p0(){return be.initialized}function kn(){return be.isCustom&&be.activeModal!==null}function bn(){return be.activeModal}function Op(e){return !be.shadow||be.shadow.modal!==e?null:be.shadow.data}function f0(e){be.initialized=e;}function Ml(e){be.activeModal=e;}function Ll(e){be.isCustom=e;}function $p(e,t){be.shadow={modal:e,data:t,timestamp:Date.now()};}function Dp(){be.shadow=null;}function Qc(e,t){be.patchedAtoms.add(e),be.originalReads.set(e,t);}function g0(e){return be.originalReads.get(e)}function Fs(e){return be.patchedAtoms.has(e)}function m0(e){be.patchedAtoms.delete(e),be.originalReads.delete(e);}function h0(e){be.unsubscribes.push(e);}function b0(){for(const e of be.unsubscribes)try{e();}catch{}be.unsubscribes.length=0;}function x0(e){return be.listeners.onOpen.add(e),()=>be.listeners.onOpen.delete(e)}function Bp(e){return be.listeners.onClose.add(e),()=>be.listeners.onClose.delete(e)}function zp(e){for(const t of Array.from(be.listeners.onOpen))try{t(e);}catch{}}function Rl(e){for(const t of Array.from(be.listeners.onClose))try{t(e);}catch{}}function y0(){b0(),be.initialized=false,be.activeModal=null,be.isCustom=false,be.shadow=null,be.patchedAtoms.clear(),be.originalReads.clear(),be.listeners.onOpen.clear(),be.listeners.onClose.clear();}const Nl={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Gp(e){return Nl[e]}function v0(e){const t=Nl[e],n=[];for(const o of t.atoms)n.push(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)n.push(o.atomLabel);return n}const w0=new Set(["inventory","journal","stats","activityLog","petHutch"]),S0=new Set(["seedShop","eggShop","toolShop","decorShop"]),C0=new Set(["leaderboard"]);function k0(e,t,n,o){return function(a){const i=kn(),s=bn();if(i&&s===o){const l=Op(o);if(l!==null){let d;if(n.dataKey==="_full"?d=l:d=l[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function I0(e,t,n,o,r){return function(i){if(kn()&&bn()===r){const s=Op(r);if(s!==null){const l=s[n];if(l!==void 0)return t(i),o(l)}}return t(i)}}function _0(e){const t=Gp(e);for(const n of t.atoms){const o=Wt(n.atomLabel);if(!o||Fs(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const a=k0(n.atomLabel,r,n,e);o.read=a,Qc(n.atomLabel,r);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const o=Wt(n.atomLabel);if(!o||Fs(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const a=I0(n.atomLabel,r,n.sourceKey,n.deriveFn,e);o.read=a,Qc(n.atomLabel,r);}}async function fi(e){const t=Gp(e);for(const o of t.atoms)Zc(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)Zc(o.atomLabel);const n=await El();await Hp(n,e);}async function T0(e){const t=await El();await Hp(t,e);const n=v0(e);for(const o of n){const r=Wt(o);if(r)try{t.get(r);}catch{}}}function Zc(e){if(!Fs(e))return;const t=Wt(e),n=g0(e);t&&n&&(t.read=n),m0(e);}async function Hp(e,t){const n=w0.has(t),o=S0.has(t),r=C0.has(t);if(!n&&!o&&!r)return;const a=Wt("stateAtom");if(a)try{const i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||o){const l=i.child,d=l?.data;if(l&&d&&typeof d=="object"){let c=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,x=g&&typeof g=="object"?{...g}:g;return {...f,data:x}});c={...c??d,userSlots:u};}if(o&&d.shops&&typeof d.shops=="object"&&(c={...c??d,shops:{...d.shops}}),c){const u={...l,data:c};s={...i,child:u};}}}if(r){const l=i.data;if(l&&Array.isArray(l.players)){const d={...l,players:[...l.players]};s={...s??i,data:d};}}if(!s)return;await e.set(a,s);}catch{}}async function E0(){for(const e of Object.keys(Nl))await fi(e);}let Xr=null,Ho=null;async function A0(){if(pi().initialized)return;Ho=await ye.select("activeModalAtom"),Xr=setInterval(async()=>{try{const n=await ye.select("activeModalAtom"),o=Ho;o!==n&&(Ho=n,P0(n,o));}catch{}},50),h0(()=>{Xr&&(clearInterval(Xr),Xr=null);}),f0(true);}function P0(e,t){const n=kn(),o=bn();e===null&&t!==null&&(n&&o===t?M0("native"):n||Rl({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&zp({modal:e,isCustom:false});}async function M0(e){const t=bn();t&&(Dp(),Ll(false),Ml(null),await fi(t),Rl({modal:t,wasCustom:true,closedBy:e}));}async function L0(e,t){if(!pi().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");kn()&&await jp(),$p(e,t),Ll(true),Ml(e),_0(e),await T0(e),await Pl.set(e),Ho=e,zp({modal:e,isCustom:true});}function R0(e,t){const n=pi();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const r={...n.shadow.data,...t};$p(e,r);}async function jp(){const e=pi();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Dp(),Ll(false),Ml(null),await Pl.set(null),Ho=null,await fi(t),Rl({modal:t,wasCustom:true,closedBy:"api"});}function N0(){return new Promise(e=>{if(!kn()){e();return}const t=Bp(()=>{t(),e();});})}async function F0(){if(kn()){const e=bn();e&&await fi(e);}await E0(),y0();}const Dn={async init(){return A0()},isReady(){return p0()},async show(e,t){return L0(e,t)},update(e,t){return R0(e,t)},async close(){return jp()},isOpen(){return bn()!==null},isCustomOpen(){return kn()},getActiveModal(){return bn()},waitForClose(){return N0()},onOpen(e){return x0(e)},onClose(e){return Bp(e)},async destroy(){return F0()}};function O0(){return {ready:false,xform:null,xformAt:0}}const at=O0();function Up(){return at.ready}function ro(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function wr(){return ot.tos()}function Fl(){return ot.engine()}function $0(){const e=wr()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Ol(e,t){const n=$0();return n?t*n+e|0:null}let Kr=null;async function D0(e=15e3){return at.ready?true:Kr||(Kr=(async()=>{if(await ot.init(e),!wr())throw new Error("MGTile: engine captured but tileObject system not found");return at.ready=true,true})(),Kr)}function gn(e,t,n=true){const o=wr(),r=Ol(e,t);if(!o||r==null)return {gidx:null,tv:null};let a=o.tileViews?.get?.(r)||null;if(!a&&n&&typeof o.getOrCreateTileView=="function")try{a=o.getOrCreateTileView(r);}catch{}return {gidx:r,tv:a||null}}function Ki(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function $l(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Bn(e,t,n,o={}){const r=o.ensureView!==false,a=o.forceUpdate!==false,i=Fl(),{gidx:s,tv:l}=gn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:l.tileObject}}function gi(e,t,n={}){const o=n.ensureView!==false,r=n.clone!==false,{gidx:a,tv:i}=gn(Number(e),Number(t),o);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return {tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};const s=i.tileObject;return {tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:r?ro(s):s}}function B0(e,t,n={}){return Bn(e,t,null,n)}function z0(e,t,n,o={}){const a=gi(e,t,{...o,clone:false}).tileView?.tileObject;$l(a,"plant");const i=ro(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Ki(i.slots[s],n.slotPatch),Bn(e,t,i,o)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!i.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);Ki(i.slots[l],s[l]);}}else if(s&&typeof s=="object")for(const l of Object.keys(s)){const d=Number(l)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Ki(i.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Bn(e,t,i,o)}return Bn(e,t,i,o)}function G0(e,t,n,o={}){const a=gi(e,t,{...o,clone:false}).tileView?.tileObject;$l(a,"decor");const i=ro(a);return "rotation"in n&&(i.rotation=Number(n.rotation)),Bn(e,t,i,o)}function H0(e,t,n,o={}){const a=gi(e,t,{...o,clone:false}).tileView?.tileObject;$l(a,"egg");const i=ro(a);return "plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Bn(e,t,i,o)}function j0(e,t,n,o={}){const r=o.ensureView!==false,a=o.forceUpdate!==false,i=Fl(),{gidx:s,tv:l}=gn(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");const d=l.tileObject,c=typeof n=="function"?n(ro(d)):n;if(l.onDataChanged(c),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:l.tileObject}}function U0(e,t,n={}){const o=n.ensureView!==false,{gidx:r,tv:a}=gn(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!a)return {ok:true,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};const i=n.clone!==false,s=a.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:i?ro(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Yi(e){if(!e)return null;const t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const r of n)if(t(e[r]))return e[r];if(t(e))return e;const o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const r of o)if(t(r))return r;try{for(const r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function Ca(e){const t=ft(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=ft(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function W0(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Ca(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function V0(){const e=wr(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(const[a,i]of r){if(a<0||i<0||a>=t||o&&i>=o)continue;const s=gn(a,i,true).tv,l=a+1<t?gn(a+1,i,true).tv:null,d=gn(a,i+1,true).tv,c=Yi(s),u=Yi(l),p=Yi(d);if(!c||!u||!p)continue;const f=Ca(c),g=Ca(u),x=Ca(p);if(!f||!g||!x)continue;const b={x:g.x-f.x,y:g.y-f.y},h={x:x.x-f.x,y:x.y-f.y},v=b.x*h.y-b.y*h.x;if(!Number.isFinite(v)||Math.abs(v)<1e-6)continue;const _=1/v,k={a:h.y*_,b:-h.x*_,c:-b.y*_,d:b.x*_},w={x:f.x-a*b.x-i*h.x,y:f.y-a*b.y-i*h.y},y=W0(c),S=y==="center"?w:{x:w.x+.5*(b.x+h.x),y:w.y+.5*(b.y+h.y)};return {ok:true,cols:t,rows:o,vx:b,vy:h,inv:k,anchorMode:y,originCenter:S}}return null}function Wp(){return at.xform=V0(),at.xformAt=Date.now(),{ok:!!at.xform?.ok,xform:at.xform}}function q0(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!at.xform?.ok||t.forceRebuild||Date.now()-at.xformAt>n)&&Wp();const o=at.xform;if(!o?.ok)return null;const r=e.x-o.originCenter.x,a=e.y-o.originCenter.y,i=o.inv.a*r+o.inv.b*a,s=o.inv.c*r+o.inv.d*a,l=Math.floor(i),d=Math.floor(s),c=[[l,d],[l+1,d],[l,d+1],[l+1,d+1]];let u=null,p=1/0;for(const[f,g]of c){if(f<0||g<0||f>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;const x=o.originCenter.x+f*o.vx.x+g*o.vy.x,b=o.originCenter.y+f*o.vx.y+g*o.vy.y,h=(e.x-x)**2+(e.y-b)**2;h<p&&(p=h,u={tx:f,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=Ol(u.tx,u.ty),u):null}function X0(e,t){const n=at.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function lt(){if(!Up())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function K0(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Rt={init:D0,isReady:Up,hook:ot.hook,engine:Fl,tos:wr,gidx:(e,t)=>Ol(Number(e),Number(t)),getTileObject:(e,t,n={})=>(lt(),gi(e,t,n)),inspect:(e,t,n={})=>(lt(),U0(e,t,n)),setTileEmpty:(e,t,n={})=>(lt(),B0(e,t,n)),setTilePlant:(e,t,n,o={})=>(lt(),z0(e,t,n,o)),setTileDecor:(e,t,n,o={})=>(lt(),G0(e,t,n,o)),setTileEgg:(e,t,n,o={})=>(lt(),H0(e,t,n,o)),setTileObjectRaw:(e,t,n,o={})=>(lt(),j0(e,t,n,o)),rebuildTransform:()=>(lt(),Wp()),pointToTile:(e,t={})=>(lt(),q0(e,t)),tileToPoint:(e,t)=>(lt(),X0(e,t)),getTransform:()=>(lt(),at.xform),help:K0};function Y0(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const ae=Y0();function Vp(){return ae.ready}async function J0(e=15e3){if(ae.ready)return Os(),true;if(await ot.init(e),ae.app=ot.app(),ae.ticker=ot.ticker(),ae.renderer=ot.renderer(),ae.stage=ot.stage(),!ae.app||!ae.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return ae.ready=true,Os(),true}function Os(){const e=q;return e.$PIXI=e.PIXI||null,e.$app=ae.app||null,e.$renderer=ae.renderer||null,e.$stage=ae.stage||null,e.$ticker=ae.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:ae.ready},e.__MG_PIXI__}function Dl(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function $s(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function Va(e){return !!(e&&typeof e.tint=="number")}function xn(e){return !!(e&&typeof e.alpha=="number")}function ka(e,t,n){return e+(t-e)*n}function Q0(e,t,n){const o=e>>16&255,r=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,l=t&255,d=ka(o,i,n)|0,c=ka(r,s,n)|0,u=ka(a,l,n)|0;return d<<16|c<<8|u}function Z0(e,t=900){const n=[],o=[e];for(;o.length&&n.length<t;){const r=o.pop();if(!r)continue;Va(r)&&n.push(r);const a=r.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)o.push(a[i]);}return n}function ev(e,t=25e3){const n=[],o=[e];let r=0;for(;o.length&&r++<t;){const a=o.pop();if(!a)continue;xn(a)&&n.push(a);const i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)o.push(i[s]);}return n}const tv=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Ds(e){if(!e)return null;if($s(e))return e;if(!Dl(e))return null;for(const t of tv){const n=e[t];if($s(n))return n}return null}function nv(e,t){const n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){const{o:a,d:i}=n.shift();if(!(!a||i>r)&&!o.has(a)){if(o.add(a),Array.isArray(a)){if(a.length===t){const s=new Array(t);let l=true;for(let d=0;d<t;d++){const c=Ds(a[d]);if(!c){l=false;break}s[d]=c;}if(l)return s}for(const s of a)n.push({o:s,d:i+1});continue}if(Dl(a)){const s=a;for(const l of Object.keys(s))n.push({o:s[l],d:i+1});}}}return null}function qp(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const o of e){let r,a;if(Array.isArray(o))r=o[0],a=o[1];else if(Dl(o))r=o.x??o.tx,a=o.y??o.ty;else continue;if(r=Number(r),a=Number(a),!Number.isFinite(r)||!Number.isFinite(a))continue;r|=0,a|=0;const i=`${r},${a}`;t.has(i)||(t.add(i),n.push({x:r,y:a}));}return n}function ov(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const o=qp(t);return ae.tileSets.set(n,o),{ok:true,name:n,count:o.length}}function rv(e){return ae.tileSets.delete(String(e||"").trim())}function av(){return Array.from(ae.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Xp(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Bl(e){const n=Rt.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Xp(e))return {entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){const a=String(e.tileSet||"").trim(),i=ae.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);o=i;}else o=qp(e.tiles||[]);const r=new Map;for(const a of o){const i=Rt.getTileObject(a.x,a.y,{ensureView:true,clone:false});i?.tileView&&i.gidx!=null&&r.set(i.gidx,i.tileView);}return {entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function zl(e){const t=ae.highlights.get(e);if(!t)return  false;ft(()=>ae.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&xn(t.root)&&ft(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&Va(n.o)&&ft(()=>{n.o.tint=n.baseTint;});return ae.highlights.delete(e),true}function Kp(e=null){for(const t of Array.from(ae.highlights.keys()))e&&!String(t).startsWith(e)||zl(t);return  true}function Yp(e,t={}){if(!$s(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(ae.highlights.has(n))return n;const o=xn(e)?Number(e.alpha):null,r=kt(Number(t.minAlpha??.12),0,1),a=kt(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=kt(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,c=[];if(d)for(const f of Z0(e))c.push({o:f,baseTint:f.tint});else Va(e)&&c.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*i)+1)/2,x=g*g*(3-2*g);o!=null&&xn(e)&&(e.alpha=kt(ka(r,a,x)*o,0,1));const b=x*l;for(const h of c)h.o&&Va(h.o)&&(h.o.tint=Q0(h.baseTint,s,b));};return ae.ticker?.add(p),ae.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:c}),n}function iv(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const o of n)if(String(o||"").toLowerCase()===t)return  true;return  false}function Jp(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:o,gidxSet:r}=Bl(t),a=`hlmut:${n}:`;if(t.clear===true)if(!r)Kp(a);else for(const u of Array.from(ae.highlights.keys())){if(!u.startsWith(a))continue;const p=u.split(":"),f=Number(p[2]);r.has(f)&&zl(u);}const i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,l=0,d=0,c=0;for(const[u,p]of o){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let x=false;const b=[];for(let _=0;_<g.length;_++)iv(g[_],n)&&(b.push(_),x=true);if(!x)continue;s++,l+=b.length;const h=p?.childView?.plantVisual||p?.childView||p,v=nv(h,g.length);if(!v){c+=b.length;continue}for(const _ of b){const k=v[_];if(!k){c++;continue}const w=`${a}${u}:${_}`;ae.highlights.has(w)||(Yp(k,{key:w,...i}),d++);}}return {ok:true,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:d,failedSlots:c}}function sv(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=ae.watches.get(o);a&&clearInterval(a);const i=setInterval(()=>{ft(()=>Jp(n,{...t,clear:!1}));},r);return ae.watches.set(o,i),{ok:true,key:o,mutation:n,intervalMs:r}}function lv(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const o=t.toLowerCase();let r=0;for(const[a,i]of Array.from(ae.watches.entries()))a.startsWith(`watchmut:${o}:`)&&(clearInterval(i),ae.watches.delete(a),r++);return r>0}const n=ae.watches.get(t);return n?(clearInterval(n),ae.watches.delete(t),true):false}function cv(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Ds(t)||Ds(e?.displayObject)||null}function Qp(e){const t=ae.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&xn(n.o)&&Number.isFinite(n.baseAlpha)&&ft(()=>{n.o.alpha=n.baseAlpha;});return ae.fades.delete(e),true}function Bs(e=null){for(const t of Array.from(ae.fades.keys()))e&&!String(t).startsWith(e)||Qp(t);return  true}function Zp(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const o=`fade:${n}:`;if(!Xp(t))return Bs(o);const{gidxSet:r}=Bl(t);if(!r)return Bs(o);for(const a of Array.from(ae.fades.keys())){if(!a.startsWith(o))continue;const i=Number(a.slice(o.length));r.has(i)&&Qp(a);}return  true}function ef(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const o=kt(Number(t.alpha??.2),0,1),r=t.deep===true,{entries:a,gidxSet:i}=Bl(t),s=`fade:${n}:`;t.clear===true&&Zp(n,t);let l=0,d=0,c=0,u=0;for(const[p,f]of a){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;l++;const x=String(g.species||"").trim().toLowerCase();if(!x||x!==n)continue;d++;const b=cv(f);if(!b||!xn(b)){u++;continue}const h=`${s}${p}`;if(ae.fades.has(h)){ft(()=>{b.alpha=o;}),c++;continue}const v=r?ev(b):[b],_=[];for(const k of v)xn(k)&&_.push({o:k,baseAlpha:Number(k.alpha)});for(const k of _)ft(()=>{k.o.alpha=o;});ae.fades.set(h,{targets:_}),c++;}return {ok:true,species:n,alpha:o,deep:r,filtered:!!i,plantsSeen:l,matchedPlants:d,applied:c,failed:u,totalFades:ae.fades.size}}function dv(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=ae.fadeWatches.get(o);a&&clearInterval(a);const i=setInterval(()=>{ft(()=>ef(n,{...t,clear:!1}));},r);return ae.fadeWatches.set(o,i),{ok:true,key:o,species:n,intervalMs:r}}function uv(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const o=t.toLowerCase();let r=0;for(const[a,i]of Array.from(ae.fadeWatches.entries()))a.startsWith(`watchfade:${o}:`)&&(clearInterval(i),ae.fadeWatches.delete(a),r++);return r>0}const n=ae.fadeWatches.get(t);return n?(clearInterval(n),ae.fadeWatches.delete(t),true):false}function pv(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function fv(e,t,n={}){const o=Number(e)|0,r=Number(t)|0,a=n.ensureView!==false,i=Rt.getTileObject(o,r,{ensureView:a,clone:false}),s=i?.tileView||null,l=s?.tileObject,d={ok:true,tx:o,ty:r,gidx:i?.gidx??Rt.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?pv(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&ft(()=>console.log("[MGPixi.inspectTile]",d)),d}function gv(e,t,n){const o=q.PIXI;if(!o)return;let r=ae.stage.getChildByName("gemini-overlay");r||(r=new o.Container,r.name="gemini-overlay",ae.stage.addChild(r));const a=n.key;let i=r.getChildByName(a);i||(i=new o.Graphics,i.name=a,r.addChild(i));const s=Rt.tileToPoint(e,t);if(!s)return;i.clear(),i.lineStyle(2,n.tint??65280,n.alpha??1),i.beginFill(n.tint??65280,(n.alpha??1)*.2);const l=Rt.getTransform(),d=l?Math.hypot(l.vx.x,l.vx.y):32,c=l?Math.hypot(l.vy.x,l.vy.y):32;i.drawRect(0,0,d,c),i.endFill(),i.x=s.x,i.y=s.y,l&&(i.rotation=Math.atan2(l.vx.y,l.vx.x));}function mv(e){const t=ae.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Fe(){if(!Vp())throw new Error("MGPixi: call MGPixi.init() first")}const mi={init:J0,isReady:Vp,expose:Os,get app(){return ae.app},get renderer(){return ae.renderer},get stage(){return ae.stage},get ticker(){return ae.ticker},get PIXI(){return q.PIXI||null},defineTileSet:(e,t)=>(Fe(),ov(e,t)),deleteTileSet:e=>(Fe(),rv(e)),listTileSets:()=>(Fe(),av()),highlightPulse:(e,t)=>(Fe(),Yp(e,t)),stopHighlight:e=>(Fe(),zl(e)),clearHighlights:e=>(Fe(),Kp(e)),drawOverlayBox:(e,t,n)=>(Fe(),gv(e,t,n)),stopOverlay:e=>(Fe(),mv(e)),highlightMutation:(e,t)=>(Fe(),Jp(e,t)),watchMutation:(e,t)=>(Fe(),sv(e,t)),stopWatchMutation:e=>(Fe(),lv(e)),inspectTile:(e,t,n)=>(Fe(),fv(e,t,n)),fadeSpecies:(e,t)=>(Fe(),ef(e,t)),clearSpeciesFade:(e,t)=>(Fe(),Zp(e,t)),clearFades:e=>(Fe(),Bs(e)),watchFadeSpecies:(e,t)=>(Fe(),dv(e,t)),stopWatchFadeSpecies:e=>(Fe(),uv(e))};function hv(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const le=hv();function tf(){return le.ready}const ed=q??window;async function nf(){const e=le.ctx;if(e)return e;const t=ed.AudioContext||ed.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return le.ctx=n,n}async function of(){if(le.ctx&&le.ctx.state==="suspended")try{await le.ctx.resume();}catch{}}const bv={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},xv={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},jo=.001,Uo=.2;function td(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n);}catch{o=n;}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){const r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function lr(e){const t=bv[e],n=xv[e];if(!t)return {atom:Uo,vol100:Yr(Uo)};const o=td(t,NaN);if(Number.isFinite(o)){const a=kt(o,0,1);return {atom:a,vol100:Yr(a)}}if(n){const a=td(n,NaN);if(Number.isFinite(a)){const i=kt(a,0,1);return {atom:i,vol100:Yr(i)}}}const r=Uo;return {atom:r,vol100:Yr(r)}}function yv(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const o=(kt(t,1,100)-1)/99;return jo+o*(Uo-jo)}function Yr(e){const t=kt(Number(e),0,1);if(t<=jo)return 0;const n=(t-jo)/(Uo-jo);return Math.round(1+n*99)}function rf(e,t){if(t==null)return lr(e).atom;const n=yv(t);return n===null?lr(e).atom:rb(n)}function vv(e){const t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r);};for(const o of Object.keys(e||{})){const r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o);}for(const[o,r]of Array.from(t.entries()))r.sort((a,i)=>a.localeCompare(i)),t.set(o,r);le.sfx.groups=t;}function wv(e){const t=le.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=le.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Sv(){if(le.sfx.buffer)return le.sfx.buffer;if(!le.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await nf();await of();const n=await(await Xu(le.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,a)=>{const i=e.decodeAudioData(n,r,a);i?.then&&i.then(r,a);});return le.sfx.buffer=o,o}async function Cv(e,t={}){if(!le.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const o=wv(n),r=le.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);const a=await nf();await of();const i=await Sv(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),d=Math.max(.01,l-s),c=rf("sfx",t.volume),u=a.createGain();u.gain.value=c,u.connect(a.destination);const p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:o,source:p,start:s,end:l,duration:d,volume:c}}const kv=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Iv=function(e){return "/"+e},nd={},ao=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let l=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");r=l(n.map(d=>{if(d=Iv(d),d in nd)return;nd[d]=true;const c=d.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":kv,c||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),c)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function a(i){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return r.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},Jn={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},_v={sounds:[],itemCustomSounds:[],version:1},yt={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class Gl extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class Tv extends Gl{constructor(){super(`Maximum number of sounds reached (${Jn.MAX_SOUNDS})`),this.name="SoundLimitError";}}class Ev extends Gl{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${Jn.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class Av extends Gl{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function Pv(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||Hl(t),t}function hi(){const e=Se(to.MODULE.AUDIO_CUSTOM_SOUNDS,_v);return Pv(e)}function Hl(e){_e(to.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function od(){return hi().sounds}function bi(e){const t=hi();t.sounds=e,Hl(t);}function xi(){return hi().itemCustomSounds}function af(e){const t=hi();t.itemCustomSounds=e,Hl(t);}function Mv(e){const t={shop:{soundId:e.shop?.soundId??yt.shop.soundId,volume:e.shop?.volume??yt.shop.volume,mode:e.shop?.mode??yt.shop.mode},pet:{soundId:e.pet?.soundId??yt.pet.soundId,volume:e.pet?.volume??yt.pet.volume,mode:e.pet?.mode??yt.pet.mode},weather:{soundId:e.weather?.soundId??yt.weather.soundId,volume:e.weather?.volume??yt.weather.volume,mode:e.weather?.mode??yt.weather.mode}};return t!==e&&Ul(t),t}function jl(){const e=Se(to.MODULE.AUDIO_NOTIFICATION_SETTINGS,yt);return Mv(e)}function Ul(e){_e(to.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const Lv="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",sf=[{id:"default-notification",name:"Default",source:Lv,type:"upload",createdAt:0}];function Rv(e){const t=new Set(e.map(o=>o.id)),n=sf.filter(o=>!t.has(o.id));return n.length===0?e:[...e,...n]}function lf(e){return sf.some(t=>t.id===e)}function Nv(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const r=e.slice(n+1).length*3/4;return Math.round(r)}function cf(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=Nv(e);if(t>0&&t>Jn.MAX_SIZE_BYTES)throw new Ev(t)}function df(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function Fv(e){if(e>=Jn.MAX_SOUNDS)throw new Tv}let st=[],zs=false;function _t(){zs||uf();}function Ov(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function uf(){if(zs)return;let e=od();e=Rv(e),e.length!==od().length&&bi(e),st=e,zs=true,console.log(`[CustomSounds] Initialized with ${st.length} sounds`);}function $v(){return _t(),[...st]}function pf(e){return _t(),st.find(t=>t.id===e)}function Dv(e,t,n){_t(),df(e),cf(t),Fv(st.length);const o={id:Ov(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return st.push(o),bi(st),console.log(`[CustomSounds] Added sound: ${o.name} (${o.id})`),o}function Bv(e){if(_t(),lf(e))throw new Error("Cannot remove default sounds");const t=st.findIndex(o=>o.id===e);if(t===-1)return  false;const n=st.splice(t,1)[0];return bi(st),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function zv(e,t){if(_t(),lf(e))throw new Error("Cannot update default sounds");const n=st.find(o=>o.id===e);return n?(t.name!==void 0&&(df(t.name),n.name=t.name.trim()),t.source!==void 0&&(cf(t.source),n.source=t.source.trim()),bi(st),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function Gv(e,t={}){_t();const n=pf(e);if(!n)throw new Av(e);const{MGAudio:o}=await ao(async()=>{const{MGAudio:r}=await Promise.resolve().then(()=>hf);return {MGAudio:r}},void 0);try{await o.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(r){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,r),r}}function Hv(){ao(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>hf);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function jv(){return jl()}function Uv(e){return jl()[e]}function Wv(e,t){const n=jl();n[e]=t,Ul(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function Vv(e){Ul(e),console.log("[CustomSounds] Updated all notification settings");}function Qn(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function ff(e,t,n){_t();const o=xi(),r=Qn(e,t,n);return o.find(a=>Qn(a.entityType,a.entityId,a.shopType)===r)??null}function qv(e,t,n,o){_t();const r=xi(),a=Qn(e,t,o),i=r.findIndex(l=>Qn(l.entityType,l.entityId,l.shopType)===a),s={entityType:e,entityId:t,shopType:o,soundId:n.soundId,volume:n.volume,mode:n.mode};i!==-1?r[i]=s:r.push(s),af(r),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(qt.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:o,config:n}}));}function Xv(e,t,n){_t();const o=xi(),r=Qn(e,t,n),a=o.findIndex(i=>Qn(i.entityType,i.entityId,i.shopType)===r);return a===-1?false:(o.splice(a,1),af(o),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(qt.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function Kv(e,t,n){return ff(e,t,n)!==null}function Yv(e){return _t(),xi().filter(n=>n.entityType===e)}const de={init:uf,getAll:$v,getById:pf,add:Dv,remove:Bv,update:zv,play:Gv,stop:Hv,getNotificationSettings:jv,getNotificationConfig:Uv,setNotificationConfig:Wv,setNotificationSettings:Vv,getItemCustomSound:ff,setItemCustomSound:qv,removeItemCustomSound:Xv,hasItemCustomSound:Kv,getItemCustomSoundsByType:Yv};let Jr=null;async function Jv(){return le.ready?true:Jr||(Jr=(async()=>{le.baseUrl=await Sn.base();const e=await Lt.load({baseUrl:le.baseUrl}),t=Lt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string")continue;const r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){const a=r[1].toLowerCase(),i=r[2];le.urls[a].set(i,Mt(le.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(le.sfx.mp3Url=Mt(le.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(le.sfx.atlasUrl=Mt(le.baseUrl,o));}if(!le.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return le.sfx.atlas=await Sl(le.sfx.atlasUrl),vv(le.sfx.atlas),de.init(),le.ready=true,true})(),Jr)}function gf(e){if(e!=="music"&&e!=="ambience")return  false;const t=le.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return le.tracks[e]=null,true}function Qv(e,t,n={}){if(!le.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const o=le.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);gf(e);const r=new Audio(o);return r.loop=!!n.loop,r.volume=rf(e,n.volume),r.preload="auto",r.play().catch(()=>{}),le.tracks[e]=r,r}function Zv(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(le.urls[n].keys()).sort():n==="sfx"?le.sfx.atlas?t.groups?Array.from(le.sfx.groups.keys()).sort():Object.keys(le.sfx.atlas).sort():[]:[]}function ew(){return ["sfx","music","ambience"]}function tw(){return Array.from(le.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function nw(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return  false;const r=le.urls[n],a=o.toLowerCase();for(const i of Array.from(r.keys()))if(i.toLowerCase()===a)return  true;return  false}function ow(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const o of Array.from(le.sfx.groups.keys()))if(o.toLowerCase()===n)return  true;return  false}function rw(e,t){const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const r=le.urls[n],a=o.toLowerCase();for(const[i,s]of Array.from(r.entries()))if(i.toLowerCase()===a)return s;return null}function aw(){return le.tracks.music&&(le.tracks.music.volume=lr("music").atom),le.tracks.ambience&&(le.tracks.ambience.volume=lr("ambience").atom),true}let Ke=null;async function iw(e,t={}){mf();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const o={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,Ke?.audio===n&&(Ke=null));},setVolume:r=>{n.volume=Math.max(0,Math.min(1,r));},isPlaying:()=>!n.paused&&!n.ended};Ke=o;try{await new Promise((r,a)=>{const i=setTimeout(()=>{a(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(i),n.removeEventListener("canplay",l),n.removeEventListener("error",d);},l=()=>{s(),r();},d=()=>{s(),a(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(i),r()):(n.addEventListener("canplay",l,{once:!0}),n.addEventListener("error",d,{once:!0}));}),await n.play();}catch(r){throw Ke=null,r}return n.addEventListener("ended",()=>{Ke?.audio===n&&(Ke=null);}),o}function mf(){return Ke?(Ke.stop(),Ke=null,true):false}function sw(e){return Ke?(Ke.setVolume(e),true):false}function lw(){return Ke?.isPlaying()??false}function cw(){return Ke}function We(){if(!tf())throw new Error("MGAudio not ready yet")}async function dw(e,t,n={}){const o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return Cv(r,n);if(o==="music"||o==="ambience")return Qv(o,r,n);throw new Error(`Unknown category: ${o}`)}const Ae={init:Jv,isReady:tf,play:dw,stop:e=>(We(),gf(e)),list:(e,t)=>(We(),Zv(e,t)),refreshVolumes:()=>(We(),aw()),categoryVolume:e=>(We(),lr(e)),getCategories:()=>(We(),ew()),getGroups:()=>(We(),tw()),hasTrack:(e,t)=>(We(),nw(e,t)),hasGroup:e=>(We(),ow(e)),getTrackUrl:(e,t)=>(We(),rw(e,t)),playCustom:async(e,t)=>(We(),iw(e,t)),stopCustom:()=>(We(),mf()),setCustomVolume:e=>(We(),sw(e)),isCustomPlaying:()=>(We(),lw()),getCustomHandle:()=>(We(),cw()),CustomSounds:de},hf=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:Ae},Symbol.toStringTag,{value:"Module"}));function uw(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const we=uw();function bf(){return we.ready}let Qr=null;async function pw(){return we.ready?true:Qr||(Qr=(async()=>{we.baseUrl=await Sn.base();const e=await Lt.load({baseUrl:we.baseUrl}),t=Lt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");we.byCat.clear(),we.byBase.clear();for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;const a=o.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;const s=a.slice(0,i),l=a.slice(i+1),d=Mt(we.baseUrl,o);we.byBase.set(a,d),we.byCat.has(s)||we.byCat.set(s,new Map),we.byCat.get(s).set(l,d);}return we.ready=true,true})(),Qr)}function Gs(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function fw(e,t){if(t===void 0){const a=Gs(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}const n=String(e||"").trim(),o=Gs(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){const a=o.indexOf("_");return {cat:o.slice(0,a),asset:o.slice(a+1),base:o}}return {cat:n,asset:o.replace(/^.+?_/,""),base:r}}function gw(){return Array.from(we.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function mw(e){const t=we.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Hs(e,t){const{cat:n,asset:o,base:r}=fw(e,t),a=we.byBase.get(r);if(a)return a;const s=we.byCat.get(n)?.get(o);if(s)return s;if(!we.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return Mt(we.baseUrl,`cosmetic/${r}.png`)}const rd=q?.document??document;function hw(){if(we.overlay)return we.overlay;const e=rd.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),rd.documentElement.appendChild(e),we.overlay=e,e}function bw(){const e=we.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function xw(e){return we.defaultParent=e,true}const yw=q?.document??document;function js(e,t,n){if(!we.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const a=r!==void 0?Hs(e,r):Hs(e),i=yw.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=o.alt!=null?String(o.alt):Gs(r??e),o.className&&(i.className=String(o.className)),o.width!=null&&(i.style.width=String(o.width)),o.height!=null&&(i.style.height=String(o.height)),o.opacity!=null&&(i.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(const[s,l]of Object.entries(o.style))try{i.style[s]=String(l);}catch{}return i}function vw(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const a=o.parent||bw()||hw(),i=r!==void 0?js(e,r,o):js(e,o);if(a===we.overlay||o.center||o.x!=null||o.y!=null||o.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(o.zIndex??999999);const l=o.scale??1,d=o.rotation??0;if(o.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${d}rad)`;else {const c=o.x??innerWidth/2,u=o.y??innerHeight/2;i.style.left=`${c}px`,i.style.top=`${u}px`,i.style.transform=`scale(${l}) rotate(${d}rad)`,o.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${d}rad)`);}}return a.appendChild(i),we.live.add(i),i.__mgDestroy=()=>{try{i.remove();}catch{}we.live.delete(i);},i}function ww(){for(const e of Array.from(we.live))e.__mgDestroy?.();}function rn(){if(!bf())throw new Error("MGCosmetic not ready yet")}const Wl={init:pw,isReady:bf,categories:()=>(rn(),gw()),list:e=>(rn(),mw(e)),url:((e,t)=>(rn(),Hs(e,t))),create:((e,t,n)=>(rn(),js(e,t,n))),show:((e,t,n)=>(rn(),vw(e,t,n))),attach:e=>(rn(),xw(e)),clear:()=>(rn(),ww())},Po={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6},Sw=new Set(["Gold","Rainbow"]),Cw=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function xf(e){let t=1,n=0,o=0;for(const r of e)r==="Gold"||r==="Rainbow"?r==="Rainbow"?t=Po.Rainbow:t===1&&(t=Po.Gold):r in Po&&(n+=Po[r],o++);return t*(1+n-o)}function kw(e){return Po[e]??null}function Iw(e){return Sw.has(e)}function _w(e){return Cw.has(e)}function Tw(e){return _w(e)}function Vl(e,t){const n=yi(e);if(!n)return 50;const o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;const r=(t-1)/(o-1);return Math.floor(50+50*r)}function gt(e,t,n){const o=yi(e);if(!o)return 0;const r=o.baseSellPrice,a=xf(n);return Math.round(r*t*a)}function Ew(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const o=t-e,r=n-e;return Math.floor(r/o*100)}function Aw(e,t){return t>=e}function yi(e){const t=te.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const yf=3600,Ji=80,Pw=100,Mo=30;function vi(e){return e/yf}function wi(e,t){const n=Sr(e);if(!n)return Ji;const o=n.maxScale;if(t<=1)return Ji;if(t>=o)return Pw;const r=(t-1)/(o-1);return Math.floor(Ji+20*r)}function Si(e,t,n){const o=Sr(e);if(!o)return n-Mo;const r=o.hoursToMature,a=t/yf,i=Mo/r,s=Math.min(i*a,Mo),l=n-Mo;return Math.floor(l+s)}function Ci(e,t){const n=Sr(e);return n?t>=n.hoursToMature:false}function vf(e){const t=Sr(e);return t?Mo/t.hoursToMature:0}function Mw(e,t,n){const o=t-e;return o<=0||n<=0?0:o/n}function Sr(e){const t=te.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Lw(e,t){return t<=0?1:Math.min(1,e/t)}const Re=3600,Zr=80,ad=100,It=30,Rw={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Cr(e){const t=te.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function Nw(e){return e/Re}function kr(e,t){const n=Cr(e);if(!n)return Zr;const{maxScale:o}=n;if(t<=1)return Zr;if(t>=o)return ad;const r=(t-1)/(o-1);return Math.floor(Zr+(ad-Zr)*r)}function Fw(e){return e-It}function Ow(e){const t=Cr(e);return !t||t.hoursToMature<=0?0:It/t.hoursToMature}function Ir(e,t,n){const o=Cr(e);if(!o)return n-It;const r=t/Re,a=It/o.hoursToMature,i=Math.min(a*r,It),s=n-It;return Math.floor(s+i)}function wf(e,t,n){const o=Cr(e);if(!o)return 0;const r=n-It,a=t-r;if(a<=0)return 0;const i=It/o.hoursToMature;return i<=0?0:a/i*Re}function ql(e,t,n,o,r=Re){const i=wf(e,n,o)-t;return i<=0?0:r<=0?1/0:i/r}function ki(e,t,n,o=Re){return ql(e,t,n,n,o)}function Xl(e,t,n,o,r=Re){if(n>=o)return 0;const a=n+1;return ql(e,t,a,o,r)}function $w(e,t){return e>=t}function Dw(e,t){const n=t-It,r=(e-n)/It*100;return Math.min(100,Math.max(0,r))}const Bw=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:Nw,calculateCurrentStrength:Ir,calculateHoursToMaxStrength:ki,calculateHoursToNextStrength:Xl,calculateHoursToStrength:ql,calculateMaxStrength:kr,calculateStartingStrength:Fw,calculateStrengthPerHour:Ow,calculateStrengthProgress:Dw,calculateXpForStrength:wf,getSpeciesData:Cr,isPetMature:$w},Symbol.toStringTag,{value:"Module"}));function Kl(e){const t=te.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const o=Rw[e];return o?n.coinsToFullyReplenishHunger/o*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function zw(e,t){return e<=0?0:t<=0?1/0:e/t}function Yl(e,t,n,o){if(e<=0||n<=0)return 0;const r=t/n;if(r>=e)return 0;const a=e-r,i=o/n;return Math.ceil(a/i)}function Jl(e,t,n){const o=te.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const a=r.coinsToFullyReplenishHunger,i=Kl(e);return Yl(n,t,i,a)}function cr(e,t,n){const o=te.get("pets");if(!o)return 0;const r=o[e];if(!r?.coinsToFullyReplenishHunger)return 0;const a=r.coinsToFullyReplenishHunger,i=Kl(e);return Yl(n,t,i,a)}function Ql(e,t,n,o,r,a){return e?t&&a>0?cr(n,o,a):0:cr(n,o,r)}const Gw=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:Ql,calculateFeedsForDuration:Yl,calculateFeedsToMaxStrength:cr,calculateFeedsToNextStrength:Jl,calculateHoursUntilStarving:zw,getHungerDrainPerHour:Kl},Symbol.toStringTag,{value:"Module"})),Sf={init(){},isReady(){return  true},crop:{calculateSize:Vl,calculateSellPrice:gt,calculateProgress:Ew,isReady:Aw,getData:yi},pet:{calculateAge:vi,calculateMaxStrength:wi,calculateCurrentStrength:Si,isMature:Ci,calculateStrengthPerHour:vf,getData:Sr},mutation:{calculateMultiplier:xf,getValue:kw,isGrowth:Iw,isEnvironmental:Tw},xp:Bw,feed:Gw},Hw=100,Qi=[];function Us(e,t,n){let o="";if(n&&typeof n=="object"){if(t==="PartialState"){const r=n.op||"",a=n.path||"";let i="";if("value"in n){const s=n.value;i=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(r||a)o=`PartialState : ${r} ${a} ${i}`.trim();else {const s=Object.keys(n).filter(l=>l!=="type");s.length>0&&(o=`PartialState - {${s.join(", ")}}`);}}if(!o&&n.event&&(o+=`${n.event} `),!o&&n.op&&(o+=`op:${n.op} `),!o&&n.data){const r=Object.keys(n.data);r.length>0&&(o+=`{${r.slice(0,3).join(",")}${r.length>3?"...":""}}`);}else !o&&Array.isArray(n)&&(o+=`[${n.length} items]`);}else typeof n=="string"&&(o=n.slice(0,50));Qi.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:o.trim()||"-"}),Qi.length>Hw&&Qi.shift();}const Ve={nativeCtor:null,captured:[],latestOpen:null},id=Symbol.for("ariesmod.ws.capture.wrapped"),sd=Symbol.for("ariesmod.ws.capture.native"),Cf=1;function Ws(e){return !!e&&e.readyState===Cf}function jw(){if(Ws(Ve.latestOpen))return Ve.latestOpen;for(let e=Ve.captured.length-1;e>=0;e--){const t=Ve.captured[e];if(Ws(t))return t}return null}function Uw(e,t){Ve.captured.push(e),Ve.captured.length>25&&Ve.captured.splice(0,Ve.captured.length-25);const n=()=>{Ve.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Ve.latestOpen===e&&(Ve.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",o=>{try{const r=JSON.parse(o.data);Us("in",r.type||"unknown",r);}catch{Us("in","raw",o.data);}}),e.readyState===Cf&&n();}function Ww(e=q,t={}){const n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return ()=>{};if(o[id])return Ve.nativeCtor=o[sd]??Ve.nativeCtor??null,()=>{};const r=o;Ve.nativeCtor=r;function a(i,s){const l=s!==void 0?new r(i,s):new r(i);try{Uw(l,n);}catch{}return l}try{a.prototype=r.prototype;}catch{}try{Object.setPrototypeOf(a,r);}catch{}try{a.CONNECTING=r.CONNECTING,a.OPEN=r.OPEN,a.CLOSING=r.CLOSING,a.CLOSED=r.CLOSED;}catch{}a[id]=true,a[sd]=r;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===a&&(e.WebSocket=r);}catch{}}}function Vw(e=q){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function qa(e=q){const t=jw();if(t)return {ws:t,source:"captured"};const n=Vw(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function kf(e,t={}){const n=t.pageWindow??q,o=t.intervalMs??500,r=!!t.debug;let a=null,i=null;const s=()=>{const d=qa(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,r&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const l=setInterval(s,o);return ()=>clearInterval(l)}function qw(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Xw(e,t=q){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}const{ws:o}=qa(t);if(!o)return {ok:false,reason:"no-ws"};if(!Ws(o))return {ok:false,reason:"not-open"};const r=qw(e);if(r==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const a=JSON.parse(r);Us("out",a.type||"unknown",a);}catch{}try{return o.send(r),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}}function Kw(e,t={},n=q){return Xw({type:e,...t},n)}const Nt={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},W={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var ht=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(ht||{});new Set(Object.values(Nt));new Set(Object.values(W));const Yw=["Room","Quinoa"],Jw={Room:["Room"],Quinoa:Yw};function ue(e,t={},n=q){const o=t,{scopePath:r,scope:a,...i}=o,s=typeof r=="string"?r:a,l=Array.isArray(r)?r:s==="Room"||s==="Quinoa"?Jw[s]:null;return Kw(e,l?{scopePath:l,...i}:i,n)}function Qw(e,t=q){return ue(W.Chat,{scope:"Room",message:e},t)}function Zw(e,t=q){return ue(W.Emote,{scope:"Room",emoteType:e},t)}function eS(e,t=q){return ue(W.Wish,{scope:"Quinoa",wish:e},t)}function tS(e,t=q){return ue(W.KickPlayer,{scope:"Room",playerId:e},t)}function nS(e,t=q){return ue(W.SetPlayerData,{scope:"Room",data:e},t)}function oS(e=q){return ue(W.UsurpHost,{scope:"Quinoa"},e)}function rS(e=q){return ue(W.ReportSpeakingStart,{scope:"Quinoa"},e)}function aS(e,t=q){return ue(W.SetSelectedGame,{scope:"Room",gameId:e},t)}function iS(e,t=q){return ue(W.VoteForGame,{scope:"Room",gameId:e},t)}function sS(e,t=q){return ue(W.RequestGame,{scope:"Room",gameId:e},t)}function lS(e=q){return ue(W.RestartGame,{scope:"Room"},e)}function cS(e,t=q){return ue(W.Ping,{scope:"Quinoa",id:e},t)}function If(e,t,n=q){return ue(W.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const dS=If;function uS(e,t,n=q){return ue(W.Teleport,{scope:"Quinoa",x:e,y:t},n)}function pS(e=q){return ue(W.CheckWeatherStatus,{scope:"Quinoa"},e)}function fS(e,t,n=q){return ue(W.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function gS(e,t=q){return ue(W.DropObject,{scope:"Quinoa",slotIndex:e},t)}function mS(e,t=q){return ue(W.PickupObject,{scope:"Quinoa",objectId:e},t)}function Ii(e,t=q){return ue(W.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Zl(e,t="PetHutch",n=q){return ue(W.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function ec(e,t="PetHutch",n=q){return ue(W.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function hS(e,t,n=q){return ue(W.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function bS(e=q){return ue(W.LogItems,{scope:"Quinoa"},e)}function xS(e,t,n,o=q){return ue(W.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},o)}function yS(e,t=q){return ue(W.WaterPlant,{scope:"Quinoa",plantId:e},t)}function vS(e,t=q){return ue(W.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function wS(e=q){return ue(W.SellAllCrops,{scope:"Quinoa"},e)}function tc(e,t=q){return ue(W.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function nc(e,t=q){return ue(W.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function oc(e,t=q){return ue(W.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function rc(e,t=q){return ue(W.PurchaseSeed,{scope:"Quinoa",species:e},t)}function SS(e,t,n,o=q){return ue(W.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},o)}function CS(e,t=q){return ue(W.HatchEgg,{scope:"Quinoa",eggId:e},t)}function kS(e,t,n,o=q){return ue(W.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},o)}function IS(e,t,n=q){return ue(W.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function _S(e,t,n=q){return ue(W.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function TS(e,t=q){return ue(W.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function ES(e,t,n,o=q){return ue(W.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},o)}function AS(e,t=q){return ue(W.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function _f(e,t={x:0,y:0},n="Dirt",o=0,r=q){return ue(W.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:o},r)}function PS(e,t,n=q){return ue(W.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function MS(e,t=q){return ue(W.PetPositions,{scope:"Quinoa",positions:e},t)}function Tf(e,t,n=q){return ue(W.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function Ef(e,t=q){return ue(W.StorePet,{scope:"Quinoa",itemId:e},t)}function LS(e,t,n=q){return ue(W.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function RS(e,t=q){return ue(W.SellPet,{scope:"Quinoa",petId:e},t)}function mt(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let i=0;i<e.length;i++)if(!mt(e[i],t[i]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return  false;for(const i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!mt(n[i],o[i]))return  false;return  true}const ld={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},cd={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function NS(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function FS(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function OS(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function $S(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function DS(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,o=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function dd(e){return {position:NS(e),tile:FS(e),garden:OS(e),object:$S(e),plant:DS(e)}}function ud(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function BS(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!mt(e.data,t.data)}function zS(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!mt(e.sortedSlotIndices,t.sortedSlotIndices)?true:!mt(e.slots,t.slots)}function GS(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function HS(){let e=cd,t=cd,n=false;const o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(ld),s=new Set;function l(){if(s.size<i.length)return;const c=dd(a);if(!mt(e,c)&&(t=e,e=c,!!n)){for(const u of r.all)u(e,t);if(ud(t)!==ud(e))for(const u of r.stable)u(e,t);if(BS(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of r.object)p(u);}if(zS(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of r.plantInfo)p(u);}if(GS(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of r.garden)p(u);}}}async function d(){if(n)return;const c=i.map(async u=>{const p=ld[u],f=await ye.subscribe(p,g=>{a[u]=g,s.add(u),l();});o.push(f);});await Promise.all(c),n=true,s.size===i.length&&(e=dd(a));}return d(),{get(){return e},subscribe(c,u){return r.all.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>r.all.delete(c)},subscribeStable(c,u){return r.stable.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>r.stable.delete(c)},subscribeObject(c,u){return r.object.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.object,previous:e.object}),()=>r.object.delete(c)},subscribePlantInfo(c,u){return r.plantInfo.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(c)},subscribeGarden(c,u){return r.garden.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.garden,previous:e.garden}),()=>r.garden.delete(c)},destroy(){for(const c of o)c();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=false;}}}let Zi=null;function Je(){return Zi||(Zi=HS()),Zi}function jS(){let e=null;const t=[],n=new Set,o={},r=new Set,a=2;function i(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function l(u,p){const{cols:f,rows:g}=u,x=f*g,b=new Set,h=new Set,v=new Map,_=[],k=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],w=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],y=Math.max(k.length,w.length);for(let C=0;C<y;C++){const A=k[C]??[],R=w[C]??[],$=A.map((B,j)=>(b.add(B),v.set(B,C),{globalIndex:B,localIndex:j,position:i(f,B)})),Y=R.map((B,j)=>(h.add(B),v.set(B,C),{globalIndex:B,localIndex:j,position:i(f,B)}));_.push({userSlotIdx:C,dirtTiles:$,boardwalkTiles:Y,allTiles:[...$,...Y]});}const S=u.spawnTiles.map(C=>i(f,C)),I={};if(u.locations)for(const[C,A]of Object.entries(u.locations)){const R=A.spawnTileIdx??[];I[C]={name:C,spawnTiles:R,spawnPositions:R.map($=>i(f,$))};}return {cols:f,rows:g,totalTiles:x,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:S,locations:I,userSlots:_,globalToXY(C){return i(f,C)},xyToGlobal(C,A){return s(f,C,A)},getTileOwner(C){return v.get(C)??null},isDirtTile(C){return b.has(C)},isBoardwalkTile(C){return h.has(C)}}}function d(){if(r.size<a||e)return;const u=o.map,p=o.tileSize??0;if(u){e=l(u,p);for(const f of n)f(e);n.clear();}}async function c(){const u=await ye.subscribe("mapAtom",f=>{o.map=f,r.add("map"),d();});t.push(u);const p=await ye.subscribe("tileSizeAtom",f=>{o.tileSize=f,r.add("tileSize"),d();});t.push(p);}return c(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let es=null;function Vs(){return es||(es=jS()),es}function US(){const e=te.get("mutations");return e?Object.keys(e):[]}function Af(){const e={};for(const t of US())e[t]=[];return e}function qs(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Af()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function WS(e,t,n,o){const r=t.slots.filter(a=>o>=a.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function VS(e,t,n,o,r){return {tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime}}function qS(e,t,n,o){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function pd(e,t,n,o){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function fd(e,t){const{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return qs();const a=t().get(),i=a?.userSlots[o],s=i?.dirtTiles??[],l=i?.boardwalkTiles??[],d=[],c=[],u=[],p={},f=[],g=[],x=[],b=[],h=Af(),v=[],_=[],k=[],w={},y=[],S=[],I={},C=new Set,A=new Set;for(const[B,j]of Object.entries(n.tileObjects)){const N=parseInt(B,10);C.add(N);const O=a?a.globalToXY(N):{x:0,y:0};if(j.objectType==="plant"){const z=j,D=WS(B,z,O,r);d.push(D),D.isMature?c.push(D):u.push(D),p[D.species]||(p[D.species]=[]),p[D.species].push(D);for(let H=0;H<z.slots.length;H++){const E=z.slots[H],P=VS(B,O,H,E,r);if(f.push(P),P.isMature?g.push(P):x.push(P),P.mutations.length>0){b.push(P);for(const T of P.mutations)h[T]||(h[T]=[]),h[T].push(P);}}}else if(j.objectType==="egg"){const D=qS(B,j,O,r);v.push(D),w[D.eggId]||(w[D.eggId]=[]),w[D.eggId].push(D),D.isMature?_.push(D):k.push(D);}else if(j.objectType==="decor"){const D=pd(B,j,O,"tileObjects");y.push(D),I[D.decorId]||(I[D.decorId]=[]),I[D.decorId].push(D);}}for(const[B,j]of Object.entries(n.boardwalkTileObjects)){const N=parseInt(B,10);A.add(N);const O=a?a.globalToXY(N):{x:0,y:0},D=pd(B,j,O,"boardwalk");S.push(D),I[D.decorId]||(I[D.decorId]=[]),I[D.decorId].push(D);}const R=[...y,...S],$=s.filter(B=>!C.has(B.localIndex)),Y=l.filter(B=>!A.has(B.localIndex));return {garden:n,mySlotIndex:o,plants:{all:d,mature:c,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:x,mutated:{all:b,byMutation:h}},eggs:{all:v,mature:_,growing:k,byType:w,count:v.length},decors:{tileObjects:y,boardwalk:S,all:R,byType:I,count:R.length},tiles:{tileObjects:s,boardwalk:l,empty:{tileObjects:$,boardwalk:Y}},counts:{plants:d.length,maturePlants:c.length,crops:f.length,matureCrops:g.length,eggs:v.length,matureEggs:_.length,decors:R.length,emptyTileObjects:$.length,emptyBoardwalk:Y.length}}}function gd(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function XS(e,t){const n=new Set(e.map(i=>i.tileIndex)),o=new Set(t.map(i=>i.tileIndex)),r=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!o.has(i.tileIndex));return {added:r,removed:a}}function KS(e,t,n){const o=new Set(e.map(a=>a.tileIndex)),r=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!o.has(a.tileIndex)&&r.has(a.tileIndex))}function YS(e,t,n){const o=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),r=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{const i=`${a.tileIndex}:${a.slotIndex}`;return !o.has(i)&&r.has(i)})}function JS(e,t,n){const o=new Set(e.map(a=>a.tileIndex)),r=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!o.has(a.tileIndex)&&r.has(a.tileIndex))}function QS(e,t){const n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(const r of t){const a=o.get(r.tileIndex);if(!a)continue;const i=Math.min(a.slots.length,r.slots.length);for(let s=0;s<i;s++){const l=new Set(a.slots[s].mutations),d=new Set(r.slots[s].mutations),c=[...d].filter(p=>!l.has(p)),u=[...l].filter(p=>!d.has(p));if(c.length>0||u.length>0){const p=Date.now(),f=r.slots[s],g={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:c,removed:u});}}}return n}function ZS(e,t,n){const o=[],r=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(const i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(const i of e){const s=r.get(i.tileIndex);if(!s)continue;const l=Math.min(i.slots.length,s.slots.length);for(let d=0;d<l;d++){const c=i.slots[d],u=s.slots[d];if(c.startTime!==u.startTime){const p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:true};o.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){const c=a.get(`${i.tileIndex}:${d}`);if(!c||!c.isMature)continue;const u=i.slots[d];if(!u)continue;const p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};o.push({crop:p,remainingSlots:s.slotsCount});}}return o}function eC(e,t){const n=new Set(e.map(i=>i.tileIndex)),o=new Set(t.map(i=>i.tileIndex)),r=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!o.has(i.tileIndex));return {added:r,removed:a}}function tC(e,t){const n=l=>`${l.tileIndex}:${l.location}`,o=l=>`${l.tileIndex}:${l.location}`,r=new Set(e.map(n)),a=new Set(t.map(o)),i=t.filter(l=>!r.has(o(l))),s=e.filter(l=>!a.has(n(l)));return {added:i,removed:s}}function nC(){let e=qs(),t=qs(),n=false;const o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function l(){if(i.size<s)return;const c=fd(a,Vs);if(mt(e,c)||(t=e,e=c,!n))return;for(const _ of r.all)_(e,t);if(gd(t)!==gd(e))for(const _ of r.stable)_(e,t);const u=XS(t.plants.all,e.plants.all);for(const _ of u.added)for(const k of r.plantAdded)k({plant:_});for(const _ of u.removed)for(const k of r.plantRemoved)k({plant:_,tileIndex:_.tileIndex});const p=KS(t.plants.mature,e.plants.mature,e.plants.all);for(const _ of p)for(const k of r.plantMatured)k({plant:_});const f=QS(t.plants.all,e.plants.all);for(const _ of f)for(const k of r.cropMutated)k(_);const g=YS(t.crops.mature,e.crops.mature,e.crops.all);for(const _ of g)for(const k of r.cropMatured)k({crop:_});const x=ZS(t.plants.all,e.plants.all,t.crops.all);for(const _ of x)for(const k of r.cropHarvested)k(_);const b=eC(t.eggs.all,e.eggs.all);for(const _ of b.added)for(const k of r.eggPlaced)k({egg:_});for(const _ of b.removed)for(const k of r.eggRemoved)k({egg:_});const h=JS(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const _ of h)for(const k of r.eggMatured)k({egg:_});const v=tC(t.decors.all,e.decors.all);for(const _ of v.added)for(const k of r.decorPlaced)k({decor:_});for(const _ of v.removed)for(const k of r.decorRemoved)k({decor:_});}async function d(){if(n)return;const c=await c0.onChangeNow(p=>{a.garden=p,i.add("garden"),l();});o.push(c);const u=await ye.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),l();});o.push(u),n=true,i.size===s&&(e=fd(a,Vs));}return d(),{get(){return e},subscribe(c,u){return r.all.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>r.all.delete(c)},subscribeStable(c,u){return r.stable.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>r.stable.delete(c)},subscribePlantAdded(c,u){if(r.plantAdded.add(c),u?.immediate&&n&&i.size===s)for(const p of e.plants.all)c({plant:p});return ()=>r.plantAdded.delete(c)},subscribePlantRemoved(c,u){return r.plantRemoved.add(c),()=>r.plantRemoved.delete(c)},subscribePlantMatured(c,u){if(r.plantMatured.add(c),u?.immediate&&n&&i.size===s)for(const p of e.plants.mature)c({plant:p});return ()=>r.plantMatured.delete(c)},subscribeCropMutated(c,u){if(r.cropMutated.add(c),u?.immediate&&n&&i.size===s)for(const p of e.crops.mutated.all)c({crop:p,added:p.mutations,removed:[]});return ()=>r.cropMutated.delete(c)},subscribeCropMatured(c,u){if(r.cropMatured.add(c),u?.immediate&&n&&i.size===s)for(const p of e.crops.mature)c({crop:p});return ()=>r.cropMatured.delete(c)},subscribeCropHarvested(c,u){return r.cropHarvested.add(c),()=>r.cropHarvested.delete(c)},subscribeEggPlaced(c,u){if(r.eggPlaced.add(c),u?.immediate&&n&&i.size===s)for(const p of e.eggs.all)c({egg:p});return ()=>r.eggPlaced.delete(c)},subscribeEggRemoved(c,u){return r.eggRemoved.add(c),()=>r.eggRemoved.delete(c)},subscribeEggMatured(c,u){if(r.eggMatured.add(c),u?.immediate&&n&&i.size===s)for(const p of e.eggs.mature)c({egg:p});return ()=>r.eggMatured.delete(c)},subscribeDecorPlaced(c,u){if(r.decorPlaced.add(c),u?.immediate&&n&&i.size===s)for(const p of e.decors.all)c({decor:p});return ()=>r.decorPlaced.delete(c)},subscribeDecorRemoved(c,u){return r.decorRemoved.add(c),()=>r.decorRemoved.delete(c)},destroy(){for(const c of o)c();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=false;}}}let ts=null;function _i(){return ts||(ts=nC()),ts}const md={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function hd(e,t){const n=vi(e.xp),o=wi(e.petSpecies,e.targetScale),r=Si(e.petSpecies,e.xp,o),a=Ci(e.petSpecies,n),l=te.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,d=e.hunger/l*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:d,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:a}}function oC(e,t){const o=t[e.slot.id]?.lastAbilityTrigger??null,r=vi(e.slot.xp),a=wi(e.slot.petSpecies,e.slot.targetScale),i=Si(e.slot.petSpecies,e.slot.xp,a),s=Ci(e.slot.petSpecies,r),c=te.get("pets")?.[e.slot.petSpecies]?.coinsToFullyReplenishHunger??1,u=e.slot.hunger/c*100;return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,hungerPercent:u,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:i,maxStrength:a,isMature:s}}const bd=500;let vt=[],Ia=0;function rC(){try{const e=Se(to.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Ia=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function aC(e){try{_e(to.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function iC(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function sC(e){if(!e||!Array.isArray(e))return;const t=Mp(e),n=[];for(const o of t)if(o.timestamp>Ia){const r=iC(o);r&&n.push(r);}n.length!==0&&(Ia=Math.max(...n.map(o=>o.performedAt),Ia),vt=[...n,...vt],vt.length>bd&&(vt=vt.slice(0,bd)),aC(vt),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${vt.length})`));}function xd(e){const t=new Set,n=[];for(const f of e.active??[]){const g=oC(f,e.slotInfos??{});n.push(g),t.add(g.id);}const o=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=hd(f,"inventory");o.push(g),t.add(g.id);}const r=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=hd(f,"hutch");r.push(g),t.add(g.id);}const a=[...n,...o,...r],i=e.expandedPetSlotId??null,s=i?a.find(f=>f.id===i)??null:null,c=_i().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:a,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:a.length},hutch:{hasHutch:c,currentItems:u,maxItems:25},expandedPetSlotId:i,expandedPet:s,abilityLogs:[...vt]}}const yd={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function lC(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function vd(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function cC(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(vd),o=t.all.map(vd);return lC(n,o)}function dC(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const a=o.get(r.id);a&&a.location!==r.location&&n.push({pet:r,from:a.location,to:r.location});}return n}function uC(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){if(!r.lastAbilityTrigger)continue;const i=o.get(r.id)?.lastAbilityTrigger;(!i||i.abilityId!==r.lastAbilityTrigger.abilityId||i.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger});}return n}function pC(e,t){const n=new Set(e.all.map(i=>i.id)),o=new Set(t.all.map(i=>i.id)),r=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!o.has(i.id));return r.length===0&&a.length===0?null:{added:r,removed:a,counts:t.counts}}function fC(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const a=o.get(r.id);a&&r.growthStage>a.growthStage&&n.push({pet:r,previousStage:a.growthStage,newStage:r.growthStage});}return n}function gC(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const a=o.get(r.id);a&&r.currentStrength>a.currentStrength&&n.push({pet:r,previousStrength:a.currentStrength,newStrength:r.currentStrength});}return n}function mC(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const a=o.get(r.id);a&&r.currentStrength===r.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:r});}return n}function hC(){let e=yd,t=yd,n=false;const o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(md),s=new Set;function l(){if(s.size<i.length)return;if(a.activityLogs){const h=a.activityLogs?.activityLogs||a.activityLogs;Array.isArray(h)&&sC(h);}const c=xd(a);if(mt(e,c)||(t=e,e=c,!n))return;for(const h of r.all)h(e,t);if(!cC(t,e))for(const h of r.stable)h(e,t);const u=dC(t,e);for(const h of u)for(const v of r.location)v(h);const p=uC(t,e);for(const h of p)for(const v of r.ability)v(h);const f=pC(t,e);if(f)for(const h of r.count)h(f);const g=fC(t,e);for(const h of g)for(const v of r.growth)v(h);const x=gC(t,e);for(const h of x)for(const v of r.strengthGain)v(h);const b=mC(t,e);for(const h of b)for(const v of r.maxStrength)v(h);if(t.expandedPetSlotId!==e.expandedPetSlotId){const h={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const v of r.expandedPet)v(h);}}async function d(){if(n)return;vt=rC(),console.log(`[myPets] Loaded ${vt.length} ability logs from storage`);const c=i.map(async u=>{const p=md[u],f=await ye.subscribe(p,g=>{a[u]=g,s.add(u),l();});o.push(f);});await Promise.all(c),n=true,s.size===i.length&&(e=xd(a));}return d(),{get(){return e},subscribe(c,u){return r.all.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>r.all.delete(c)},subscribeStable(c,u){return r.stable.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>r.stable.delete(c)},subscribeLocation(c,u){if(r.location.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)c({pet:p,from:p.location,to:p.location});return ()=>r.location.delete(c)},subscribeAbility(c,u){if(r.ability.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.lastAbilityTrigger&&c({pet:p,trigger:p.lastAbilityTrigger});return ()=>r.ability.delete(c)},subscribeCount(c,u){return r.count.add(c),u?.immediate&&n&&s.size===i.length&&c({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(c)},subscribeExpandedPet(c,u){return r.expandedPet.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(c)},subscribeGrowth(c,u){if(r.growth.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)c({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>r.growth.delete(c)},subscribeStrengthGain(c,u){if(r.strengthGain.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)c({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>r.strengthGain.delete(c)},subscribeMaxStrength(c,u){if(r.maxStrength.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.currentStrength===p.maxStrength&&c({pet:p});return ()=>r.maxStrength.delete(c)},destroy(){for(const c of o)c();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=false;}}}let ns=null;function In(){return ns||(ns=hC()),ns}const wd={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Sd={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Cd(e){const t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex;let a=null;return r!==null&&r>=0&&r<n.length&&(a={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??false,selectedItem:a}}function kd(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function bC(e,t){return kd(e)===kd(t)}function xC(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function ea(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function yC(e,t){const n=new Set(e.map(ea)),o=new Set(t.map(ea)),r=t.filter(i=>!n.has(ea(i))),a=e.filter(i=>!o.has(ea(i)));return r.length===0&&a.length===0?null:{added:r,removed:a,counts:{before:e.length,after:t.length}}}function vC(e,t){const n=new Set(e),o=new Set(t),r=t.filter(i=>!n.has(i)),a=e.filter(i=>!o.has(i));return r.length===0&&a.length===0?null:{added:r,removed:a,current:t}}function wC(){let e=Sd,t=Sd,n=false;const o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(wd),s=new Set;function l(){if(s.size<i.length)return;const c=Cd(a);if(mt(e,c)||(t=e,e=c,!n))return;for(const f of r.all)f(e,t);if(!bC(t,e))for(const f of r.stable)f(e,t);if(xC(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of r.selection)g(f);}const u=yC(t.items,e.items);if(u)for(const f of r.items)f(u);const p=vC(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of r.favorites)f(p);}async function d(){if(n)return;const c=i.map(async u=>{const p=wd[u],f=await ye.subscribe(p,g=>{a[u]=g,s.add(u),l();});o.push(f);});await Promise.all(c),n=true,s.size===i.length&&(e=Cd(a));}return d(),{get(){return e},subscribe(c,u){return r.all.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>r.all.delete(c)},subscribeStable(c,u){return r.stable.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>r.stable.delete(c)},subscribeSelection(c,u){return r.selection.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(c)},subscribeItems(c,u){return r.items.add(c),u?.immediate&&n&&s.size===i.length&&c({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(c)},subscribeFavorites(c,u){return r.favorites.add(c),u?.immediate&&n&&s.size===i.length&&c({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(c)},destroy(){for(const c of o)c();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=false;}}}let os=null;function bt(){return os||(os=wC()),os}const Xs={all:[],host:null,myPlayer:null,count:0};function SC(e,t,n){const o=n.get(e.id),r=o?.slot,a=r?.data,i=r?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function Id(e){const t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[],r=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Xs;const a=new Map;Array.isArray(o)&&o.forEach((d,c)=>{d?.type==="user"&&d?.playerId&&a.set(d.playerId,{slot:d,index:c});});const i=t.map(d=>SC(d,n,a)),s=i.find(d=>d.isHost)??null,l=r!==null?i.find(d=>d.slotIndex===r)??null:null;return {all:i,host:s,myPlayer:l,count:i.length}}function _d(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function CC(e,t){const n=[],o=new Set(e.map(a=>a.id)),r=new Set(t.map(a=>a.id));for(const a of t)o.has(a.id)||n.push({player:a,type:"join"});for(const a of e)r.has(a.id)||n.push({player:a,type:"leave"});return n}function kC(e,t){const n=[],o=new Map(e.map(r=>[r.id,r]));for(const r of t){const a=o.get(r.id);a&&a.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected});}return n}function IC(){let e=Xs,t=Xs,n=false;const o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=4;function l(){if(i.size<s)return;const c=Id(a);if(mt(e,c)||(t=e,e=c,!n))return;for(const x of r.all)x(e,t);if(_d(t)!==_d(e))for(const x of r.stable)x(e,t);const u=CC(t.all,e.all);for(const x of u)for(const b of r.joinLeave)b(x);const p=kC(t.all,e.all);for(const x of p)for(const b of r.connection)b(x);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const x={current:e.host,previous:t.host};for(const b of r.host)b(x);}}async function d(){if(n)return;const c=await s0.onChangeNow(g=>{a.players=g,i.add("players"),l();});o.push(c);const u=await l0.onChangeNow(g=>{a.hostPlayerId=g,i.add("hostPlayerId"),l();});o.push(u);const p=await i0.onChangeNow(g=>{a.userSlots=g,i.add("userSlots"),l();});o.push(p);const f=await ye.subscribe("myUserSlotIdxAtom",g=>{a.myUserSlotIndex=g,i.add("myUserSlotIndex"),l();});o.push(f),n=true,i.size===s&&(e=Id(a));}return d(),{get(){return e},subscribe(c,u){return r.all.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>r.all.delete(c)},subscribeStable(c,u){return r.stable.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>r.stable.delete(c)},subscribeJoinLeave(c,u){if(r.joinLeave.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)c({player:p,type:"join"});return ()=>r.joinLeave.delete(c)},subscribeConnection(c,u){if(r.connection.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)c({player:p,isConnected:p.isConnected});return ()=>r.connection.delete(c)},subscribeHost(c,u){return r.host.add(c),u?.immediate&&n&&i.size===s&&c({current:e.host,previous:e.host}),()=>r.host.delete(c)},destroy(){for(const c of o)c();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=false;}}}let rs=null;function Pf(){return rs||(rs=IC()),rs}const _r=["seed","tool","egg","decor"];function _C(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function TC(e,t,n){const o=_C(e,t),r=n[o]??0,a=Math.max(0,e.initialStock-r);return {id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:a,isAvailable:a>0}}function EC(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const r=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>TC(d,e,r)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,l=s>0?Date.now()+s*1e3:null;return {type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:l}}function Td(e){const t=e.shops,n=e.purchases??{},o=_r.map(s=>EC(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},a=o.filter(s=>s.restockAt!==null);let i=null;if(a.length>0){const l=a.sort((d,c)=>(d.restockAt??0)-(c.restockAt??0))[0];i={shop:l.type,seconds:l.secondsUntilRestock,at:l.restockAt};}return {all:o,byType:r,nextRestock:i}}const Ed={all:_r.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Ad(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function AC(e,t){const n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function PC(e,t){const n=[];for(const o of _r){const r=e.byType[o],a=t.byType[o],i=new Map(r.items.map(s=>[s.id,s]));for(const s of a.items){const l=i.get(s.id);l&&s.purchased>l.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-l.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function MC(e,t){const n=[];for(const o of _r){const r=e.byType[o],a=t.byType[o],i=new Map(r.items.map(s=>[s.id,s]));for(const s of a.items){const l=i.get(s.id);l&&l.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:l.isAvailable,isAvailable:s.isAvailable});}}return n}function LC(){let e=Ed,t=Ed,n=false;const o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function l(){if(i.size<s)return;const c=Td(a);if(mt(e,c)||(t=e,e=c,!n))return;for(const g of r.all)g(e,t);if(Ad(t)!==Ad(e))for(const g of r.stable)g(e,t);const u={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(const g of _r){const x=AC(t.byType[g],e.byType[g]);if(x)for(const b of u[g])b(x);}const p=PC(t,e);for(const g of p)for(const x of r.purchase)x(g);const f=MC(t,e);for(const g of f)for(const x of r.availability)x(g);}async function d(){if(n)return;const c=await d0.onChangeNow(p=>{a.shops=p,i.add("shops"),l();});o.push(c);const u=await u0.onChangeNow(p=>{a.purchases=p,i.add("purchases"),l();});o.push(u),n=true,i.size===s&&(e=Td(a));}return d(),{get(){return e},getShop(c){return e.byType[c]},getItem(c,u){return e.byType[c].items.find(f=>f.id===u)??null},subscribe(c,u){return r.all.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>r.all.delete(c)},subscribeStable(c,u){return r.stable.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>r.stable.delete(c)},subscribeSeedRestock(c,u){return r.seedRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(c)},subscribeToolRestock(c,u){return r.toolRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(c)},subscribeEggRestock(c,u){return r.eggRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(c)},subscribeDecorRestock(c,u){return r.decorRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(c)},subscribePurchase(c,u){if(r.purchase.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&c({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>r.purchase.delete(c)},subscribeAvailability(c,u){if(r.availability.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)c({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>r.availability.delete(c)},destroy(){for(const c of o)c();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=false;}}}let as=null;function io(){return as||(as=LC()),as}function Mf(e){const t=e||"Sunny",r=te.get("weather")?.[t]?.name||t;return {id:t,name:r,startTime:null,endTime:null,remainingSeconds:0}}function Pd(){return Mf(null)}function RC(){let e=Pd(),t=Pd(),n=null,o=false,r=null;const a={all:new Set,stable:new Set};function i(l){const d=(l||"Sunny")!==(n||"Sunny");n=l;const c=Mf(l),u=e.id!==c.id;if(t=e,e=c,!!o){if(d)for(const p of a.all)p(e,t);if(u){const p={current:e,previous:t};for(const f of a.stable)f(p);}}}async function s(){o||(r=await ye.subscribe("weatherAtom",l=>{i(l);}),o=true);}return s(),{get(){return e},subscribe(l,d){return a.all.add(l),d?.immediate!==false&&o&&l(e,e),()=>a.all.delete(l)},subscribeStable(l,d){return a.stable.add(l),d?.immediate&&o&&l({current:e,previous:e}),()=>a.stable.delete(l)},destroy(){r?.(),r=null,a.all.clear(),a.stable.clear(),o=false;}}}let is=null;function Tr(){return is||(is=RC()),is}let De=null;function Lf(){return De||(De={currentTile:Je(),myPets:In(),gameMap:Vs(),myInventory:bt(),players:Pf(),shops:io(),weather:Tr(),myGarden:_i()},De)}function Et(){if(!De)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return De}function NC(){De&&(De.currentTile.destroy(),De.myPets.destroy(),De.gameMap.destroy(),De.myInventory.destroy(),De.players.destroy(),De.shops.destroy(),De.weather.destroy(),De.myGarden.destroy(),De=null);}const fe={get currentTile(){return Et().currentTile},get myPets(){return Et().myPets},get gameMap(){return Et().gameMap},get myInventory(){return Et().myInventory},get players(){return Et().players},get shops(){return Et().shops},get weather(){return Et().weather},get myGarden(){return Et().myGarden}};function FC(e){const t=rc(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function OC(e){const o=fe.shops.getShop("seed").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const r=o.remaining,a=[];let i=0;for(let s=0;s<r;s++){const l=rc(e);l.ok?i++:a.push(l.reason||`Failed to purchase seed ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}function $C(e){const t=nc(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function DC(e){const o=fe.shops.getShop("egg").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const r=o.remaining,a=[];let i=0;for(let s=0;s<r;s++){const l=nc(e);l.ok?i++:a.push(l.reason||`Failed to purchase egg ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}function BC(e){const t=tc(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function zC(e){const o=fe.shops.getShop("decor").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const r=o.remaining,a=[];let i=0;for(let s=0;s<r;s++){const l=tc(e);l.ok?i++:a.push(l.reason||`Failed to purchase decor ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}function GC(e){const t=oc(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function HC(e){const o=fe.shops.getShop("tool").items.find(s=>s.id===e);if(!o)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const r=o.remaining,a=[];let i=0;for(let s=0;s<r;s++){const l=oc(e);l.ok?i++:a.push(l.reason||`Failed to purchase tool ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}let ss=false;const cn={init(){ss||(ss=true,console.log("[MGShopActions] Initialized"));},isReady(){return ss},seed:{buy:FC,buyAll:OC},egg:{buy:$C,buyAll:DC},decor:{buy:BC,buyAll:zC},tool:{buy:GC,buyAll:HC}};async function Rf(e){const t=[{name:"Data",init:()=>te.init()},{name:"CustomModal",init:()=>Dn.init()},{name:"Sprites",init:()=>J.init()},{name:"TileObjectSystem",init:()=>Rt.init()},{name:"Pixi",init:()=>mi.init()},{name:"Audio",init:()=>Ae.init()},{name:"Cosmetics",init:()=>Wl.init()},{name:"ShopActions",init:()=>cn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const ac=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:Sn,MGAudio:Ae,MGCalculators:Sf,MGCosmetic:Wl,MGCustomModal:Dn,MGData:te,MGEnvironment:Ye,MGManifest:Lt,MGPixi:mi,MGPixiHooks:ot,MGShopActions:cn,MGSprite:J,MGTile:Rt,MGVersion:wl,PET_ABILITY_ACTIONS:Ap,filterPetAbilityLogs:Mp,formatAbilityLog:Lp,initAllModules:Rf,isPetAbilityAction:Pp},Symbol.toStringTag,{value:"Module"}));function jC(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function UC(e){return e.toLowerCase()}function Er(e={}){const{id:t,label:n="",type:o="neutral",tone:r="soft",border:a,withBorder:i,pill:s=true,size:l="md",onClick:d,variant:c="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=m("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),l==="sm"?g.classList.add("badge--sm"):l==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),d&&g.addEventListener("click",d);let x=false,b=i;function h(){x||(b===false?g.style.border="none":g.style.border="");}function v(C,A=r){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${C}`,`badge--${A}`),h();}function _(C){const A=(C??"").trim();A?(g.style.border=A,x=true):(x=false,h());}function k(C){b=C,h();}function w(C){g.textContent=C;}function y(C,A=r){v(C,A);}function S(C){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const A=jC(C);if(!A){g.textContent=String(C??"—");return}g.textContent=A,g.classList.add("badge--rarity",`badge--rarity-${UC(A)}`);}function I(C,A){const $=te.get("abilities")?.[C],Y=$?.color,B=Y?.bg||"rgba(100, 100, 100, 0.9)",j=Y?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=A||$?.name||C||"Unknown Ability",g.style.background=B,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const N=()=>{g.style.background=j;},O=()=>{g.style.background=B;};g.removeEventListener("mouseenter",N),g.removeEventListener("mouseleave",O),g.addEventListener("mouseenter",N),g.addEventListener("mouseleave",O);}return c==="rarity"?S(u):c==="ability"?I(p,f):(g.textContent=n,v(o,r),typeof i=="boolean"&&k(i),a&&_(a)),{root:g,setLabel:w,setType:y,setBorder:_,setWithBorder:k,setRarity:S,setAbility:I}}const WC={expanded:false,sort:{key:null,dir:null},search:""},VC={categories:{}};async function qC(){const e=await no("tab-test",{version:2,defaults:VC,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...WC}}function n(a,i){const s=e.get(),l=t(a);e.update({categories:{...s.categories,[a]:{...l,expanded:i}}});}function o(a,i,s){const l=e.get(),d=t(a);e.update({categories:{...l.categories,[a]:{...d,sort:{key:i,dir:s}}}});}function r(a,i){const s=e.get(),l=t(a);e.update({categories:{...s.categories,[a]:{...l,search:i}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}const XC={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function ta(e){return e?XC[e]??0:0}class KC extends wn{constructor(){super({id:"tab-test",label:"Test"});U(this,"stateCtrl",null);}async build(n){this.stateCtrl=await qC();const o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o);}renderSprite(n){const o=m("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const r=n.spriteId;requestAnimationFrame(()=>{try{const a=J.toCanvas(r,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",o.appendChild(a);}catch{o.textContent="-";}});}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){const r=m("span",{style:"opacity:0.5;"});return r.textContent="—",r}return Er({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,a){const i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;const f=p.toLowerCase();return r.filter(g=>g.name.toLowerCase().includes(f))},l=ii({columns:a,data:s(i.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});i.sort.key&&i.sort.dir&&l.sortBy(i.sort.key,i.sort.dir);const d=si({placeholder:"Search...",value:i.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),l.setData(s(f));}}),c=m("div",{style:"margin-bottom:8px;"});c.appendChild(d.root);const u=m("div");return u.appendChild(c),u.appendChild(l.root),Be({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){const r=te.get("plants");if(!r)return null;for(const i of Object.values(r))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;const a=o.toLowerCase();for(const i of Object.values(r)){const s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){const o=te.get("pets");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){const o=te.get("items");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){const o=te.get("decor");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){const o=te.get("eggs");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){const a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){const i=this.findPlantBySprite(o,r);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){const i=this.findPetBySpriteId(o);if(i?.rarity)return i.rarity}if(a==="item"){const i=this.findItemBySpriteId(o);if(i?.rarity)return i.rarity}if(a==="decor"){const i=this.findDecorBySpriteId(o);if(i?.rarity)return i.rarity}if(a==="egg"){const i=this.findEggBySpriteId(o);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4);})}async buildSpriteTables(n){const o=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>ta(a.rarity)-ta(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!J.isReady())try{await J.init();}catch{return}const r=J.getCategories();for(let a=0;a<r.length;a++){await this.yieldToMain(8);const i=r[a],l=J.getCategoryId(i).map(d=>{const c=`sprite/${i}/${d}`;return {name:d,spriteId:c,rarity:this.getRarityForSprite(i,c,d)}});if(l.sort((d,c)=>ta(d.rarity)-ta(c.rarity)),l.length>0){const d=this.createDataCard(i,this.formatCategoryName(i),l,o);n.appendChild(d);}}}}function Ie(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o);}const Nf=`
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
`,YC={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let sn=null;async function JC(){if(sn)return sn;sn=await no("tab-auto-favorite",{version:1,defaults:YC});const e=Se(ke.AUTO_FAVORITE_UI,null);return e&&(await sn.set(e),Zm(ke.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),sn}function ct(){if(!sn)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return sn}const ic=ke.AUTO_FAVORITE,Ff={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function yn(){return Se(ic,Ff)}function sc(e){_e(ic,e);}function Of(e){const n={...yn(),...e};return sc(n),n}function lc(e){const t=yn();return t.mode="simple",t.simple={...t.simple,...e},sc(t),t}function QC(e){lc({favoriteSpecies:e});}function ZC(e){lc({favoriteMutations:e});}function Md(){return yn().enabled}let _a=null;const Wo=new Set;function Ks(){const e=yn();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Wo.clear(),_a=bt().subscribeItems(t=>{if(t.added.length>0){const n=yn();for(const o of t.added)tk(o,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function $f(){_a&&(_a(),_a=null),Wo.clear(),console.log("🛑 [AutoFavorite] Stopped");}function ek(e){const t=yn();t.enabled=e,t.simple.enabled=e,Of(t),e?Ks():$f();}function tk(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Wo.has(e.id)||e.isFavorited||e.favorited)&&Df(e,t.simple)){Wo.add(e.id);try{Ii(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(o){console.error("[AutoFavorite] WebSocket error:",o),Wo.delete(e.id);}}}function Df(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(r=>t.favoriteMutations.includes(r))):false}function nk(){return Object.keys(te.get("mutations")??{})}const cc={init(){this.isReady()||Ks();},isReady(){return Md()},DEFAULT_CONFIG:Ff,STORAGE_KEY:ic,loadConfig:yn,saveConfig:sc,updateConfig:Of,updateSimpleConfig:lc,setFavoriteSpecies:QC,setFavoriteMutations:ZC,isEnabled:Md,start:Ks,stop:$f,setEnabled:ek,shouldFavorite:Df,getGameMutations:nk},dc=ke.JOURNAL_CHECKER,Bf={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function so(){return Se(dc,Bf)}function Ti(e){_e(dc,e);}function Ld(){return so().enabled}function ok(e){const t=so();t.autoRefresh=e,Ti(t);}function rk(e){const t=so();t.refreshIntervalMs=e,Ti(t);}let ls=null,Rd=null;function zf(){try{return Pf().get().myPlayer?.journal||null}catch{return null}}function ak(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Gf(){const e=te.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Hf(){const e=te.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,o])=>!("tileRef"in o)).map(([n])=>n),"Max Weight"]}function ik(){return Object.keys(te.get("mutations")??{})}function jf(e){const n=(te.get("pets")??{})[e];if(!n)return [];const o=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(r=>o.add(r)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(r=>o.add(r)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(r=>{Array.isArray(r)&&r.forEach(a=>o.add(a));}),[...o]}function Uf(e){const t=te.get("plants")??{},n=Object.keys(t),o=Gf(),r=e?.produce??{},a=[];let i=0;for(const d of n){const u=r[d]?.variantsLogged?.map(f=>f.variant)??[],p=o.filter(f=>!u.includes(f));i+=u.length,a.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:o.length,variantsPercentage:o.length>0?u.length/o.length*100:0,isComplete:p.length===0});}const s=n.length*o.length,l=a.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0}}function Wf(e){const t=te.get("pets")??{},n=Object.keys(t),o=Hf(),r=e?.pets??{},a=[];let i=0,s=0,l=0,d=0;for(const u of n){const p=r[u],f=p?.variantsLogged?.map(v=>v.variant)??[],g=p?.abilitiesLogged?.map(v=>v.ability)??[],x=o.filter(v=>!f.includes(v)),b=jf(u),h=b.filter(v=>!g.includes(v));s+=o.length,i+=f.length,d+=b.length,l+=Math.min(g.length,b.length),a.push({species:u,variantsLogged:f,variantsMissing:x,variantsTotal:o.length,variantsPercentage:o.length>0?f.length/o.length*100:0,abilitiesLogged:g,abilitiesMissing:h,abilitiesTotal:b.length,abilitiesPercentage:b.length>0?g.length/b.length*100:0,isComplete:x.length===0&&(b.length===0||h.length===0)});}const c=a.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0,abilitiesTotal:d,abilitiesLogged:l,abilitiesPercentage:d>0?l/d*100:0}}async function Ei(e=false){await te.waitForAny();const t=zf(),n=ak(t);if(!e&&ls&&n===Rd)return ls;const o={plants:Uf(t),pets:Wf(t),lastUpdated:Date.now()};return ls=o,Rd=n,o}async function sk(){const e=await Ei();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let Vo=null;function Ys(){const e=so();e.enabled&&(e.autoRefresh&&!Vo&&(Vo=setInterval(async()=>{const t=await Ei();uc(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function Vf(){Vo&&(clearInterval(Vo),Vo=null);}function lk(e){const t=so();t.enabled=e,Ti(t),e?Ys():Vf();}function uc(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function ck(){const e=await Ei();return uc(e),e}const qf={init(){this.isReady()||Ys();},isReady(){return Ld()},DEFAULT_CONFIG:Bf,STORAGE_KEY:dc,loadConfig:so,saveConfig:Ti,isEnabled:Ld,setAutoRefresh:ok,setRefreshInterval:rk,getMyJournal:zf,getCropVariants:Gf,getPetVariants:Hf,getAllMutations:ik,getPetAbilities:jf,calculateProduceProgress:Uf,calculatePetProgress:Wf,aggregateJournalProgress:Ei,getMissingSummary:sk,start:Ys,stop:Vf,setEnabled:lk,refresh:ck,dispatchUpdate:uc},pc=ke.BULK_FAVORITE,Xf={enabled:false,position:"top-right"};function Ar(){return Se(pc,Xf)}function Kf(e){_e(pc,e);}function dk(e){const t=Ar();t.position=e,Kf(t);}function Yf(){return Ar().enabled}function uk(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function pk(e){const t=bt().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let o=0;for(const r of t.items){if(!uk(r))continue;const a=n.has(r.id);e&&a||!e&&!a||(await Ii(r.id,e),o++,await fk(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${o} items`),o}function fk(e){return new Promise(t=>setTimeout(t,e))}let na=false;const Xa={init(){na||(na=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return na},DEFAULT_CONFIG:Xf,STORAGE_KEY:pc,loadConfig:Ar,saveConfig:Kf,isEnabled:Yf,setPosition:dk,bulkFavorite:pk,destroy(){na=false;}};class gk{constructor(){U(this,"achievements",new Map);U(this,"data");U(this,"STORAGE_KEY",ke.ACHIEVEMENTS);U(this,"onUnlockCallbacks",[]);U(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Se(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){_e(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const o=this.isUnlocked(t),r=await n.checkProgress(),a={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;const s=r>=n.target;return !o&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:a}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const o=await this.checkAchievement(n);t.push(o);}return t}unlock(t,n){const o=this.achievements.get(t);if(!o)return;const r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return {total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Unlock callback error:",o);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Progress callback error:",o);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let qo=null;function dt(){return qo||(qo=new gk),qo}function mk(){qo&&(qo=null);}let oa=false;const Jf={init(){oa||(dt(),oa=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return oa},getManager(){return dt()},register:(...e)=>dt().register(...e),registerMany:(...e)=>dt().registerMany(...e),isUnlocked:(...e)=>dt().isUnlocked(...e),getAll:()=>dt().getAllAchievements(),getUnlocked:()=>dt().getUnlockedAchievements(),getStats:()=>dt().getCompletionStats(),checkAll:()=>dt().checkAllAchievements(),onUnlock:(...e)=>dt().onUnlock(...e),onProgress:(...e)=>dt().onProgress(...e),destroy(){mk(),oa=false;}},hk={enabled:true},Qf=ke.ANTI_AFK,bk=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],xk=25e3,yk=1,vk=1e-5,ge={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function wk(){const e=(t,n)=>{const o=r=>{r.stopImmediatePropagation(),r.preventDefault?.();};t.addEventListener(n,o,{capture:true}),ge.listeners.push({type:n,handler:o,target:t});};for(const t of bk)e(document,t),e(window,t);}function Sk(){for(const{type:e,handler:t,target:n}of ge.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ge.listeners.length=0;}function Ck(){const e=Object.getPrototypeOf(document);ge.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ge.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ge.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function kk(){const e=Object.getPrototypeOf(document);try{ge.savedProps.hidden&&Object.defineProperty(e,"hidden",ge.savedProps.hidden);}catch{}try{ge.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ge.savedProps.visibilityState);}catch{}try{ge.savedProps.hasFocus&&(document.hasFocus=ge.savedProps.hasFocus);}catch{}}function Ka(){ge.audioCtx&&ge.audioCtx.state!=="running"&&ge.audioCtx.resume?.().catch(()=>{});}function Ik(){try{const e=window.AudioContext||window.webkitAudioContext;ge.audioCtx=new e({latencyHint:"interactive"}),ge.gainNode=ge.audioCtx.createGain(),ge.gainNode.gain.value=vk,ge.oscillator=ge.audioCtx.createOscillator(),ge.oscillator.frequency.value=yk,ge.oscillator.connect(ge.gainNode).connect(ge.audioCtx.destination),ge.oscillator.start(),document.addEventListener("visibilitychange",Ka,{capture:!0}),window.addEventListener("focus",Ka,{capture:!0});}catch{Zf();}}function Zf(){try{ge.oscillator?.stop();}catch{}try{ge.oscillator?.disconnect(),ge.gainNode?.disconnect();}catch{}try{ge.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Ka,{capture:true}),window.removeEventListener("focus",Ka,{capture:true}),ge.oscillator=null,ge.gainNode=null,ge.audioCtx=null;}function _k(){const e=document.querySelector("canvas")||document.body||document.documentElement;ge.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},xk);}function Tk(){ge.heartbeatInterval!==null&&(clearInterval(ge.heartbeatInterval),ge.heartbeatInterval=null);}function cs(){Ck(),wk(),Ik(),_k();}function ds(){Tk(),Zf(),Sk(),kk();}let ra=false,Qe=false;function An(){return Se(Qf,hk)}function us(e){_e(Qf,e);}const mn={init(){if(ra)return;const e=An();ra=true,e.enabled?(cs(),Qe=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return ra},isRunning(){return Qe},isEnabled(){return An().enabled},enable(){const e=An();e.enabled=true,us(e),Qe||(cs(),Qe=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=An();e.enabled=false,us(e),Qe&&(ds(),Qe=false,console.log("[MGAntiAfk] Disabled"));},toggle(){mn.isEnabled()?mn.disable():mn.enable();},getConfig(){return An()},updateConfig(e){const n={...An(),...e};us(n),n.enabled&&!Qe?(cs(),Qe=true):!n.enabled&&Qe&&(ds(),Qe=false);},destroy(){Qe&&(ds(),Qe=false),ra=false,console.log("[MGAntiAfk] Destroyed");}},eg=ke.PET_TEAM,Ek={enabled:false,teams:[],activeTeamId:null},fc=3,Nd=50,ze="";function Ge(){return Se(eg,Ek)}function _n(e){_e(eg,e);}function Ak(e){const n={...Ge(),...e};return _n(n),n}function Pk(){return Ge().enabled}function Mk(e){Ak({enabled:e});}function Lk(){return crypto.randomUUID()}function Js(){return Date.now()}function tg(e=[]){const t=[...e];for(;t.length<fc;)t.push(ze);return [t[0]||ze,t[1]||ze,t[2]||ze]}function ng(e,t){const n=Ge(),o=e.trim();return o?!n.teams.some(r=>r.name.trim()===o&&r.id!==t):false}function og(e,t){const n=Ge();if(!e.some(a=>a!==ze))return  true;const r=[...e].sort().join(",");return !n.teams.some(a=>a.id===t?false:[...a.petIds].sort().join(",")===r)}function rg(e){const n=In().get(),o=new Set(n.all.map(a=>a.id)),r=Ge();for(const a of r.teams)for(const i of a.petIds)i!==ze&&o.add(i);for(const a of e)if(a!==ze&&!o.has(a))return  false;return  true}function ag(e){const n=In().get(),o=new Map(n.all.map(a=>[a.id,a])),r=[];for(const a of e.petIds){if(a===ze)continue;const i=o.get(a);i&&r.push(i);}return r}function Rk(e){return e.petIds.every(t=>t!==ze)}function Nk(e){const t=[];for(let n=0;n<fc;n++)e.petIds[n]===ze&&t.push(n);return t}function Fk(e){return e.petIds.filter(t=>t!==ze).length}function Ok(e){return e.petIds.every(t=>t===ze)}function $k(e,t){return e.petIds.includes(t)}function Dk(e,t){return e.petIds.indexOf(t)}function Bk(e,t=[]){const n=Ge();if(n.teams.length>=Nd)throw new Error(`Maximum number of teams (${Nd}) reached`);if(!ng(e))throw new Error(`Team name "${e}" already exists`);const o=e.trim();if(!o)throw new Error("Team name cannot be empty");const r=tg(t);if(!rg(r))throw new Error("One or more pet IDs do not exist");if(!og(r))throw new Error("A team with this exact composition already exists");const a={id:Lk(),name:o,petIds:r,createdAt:Js(),updatedAt:Js()};return n.teams.push(a),_n(n),a}function ig(e,t){const n=Ge(),o=n.teams.findIndex(i=>i.id===e);if(o===-1)return null;const r=n.teams[o];if(t.name!==void 0){const i=t.name.trim();if(!i)throw new Error("Team name cannot be empty");if(!ng(i,e))throw new Error(`Team name "${i}" already exists`);t.name=i;}if(t.petIds!==void 0){const i=tg(t.petIds);if(!rg(i))throw new Error("One or more pet IDs do not exist");if(!og(i,e))throw new Error("A team with this exact composition already exists");t.petIds=i;}const a={...r,...t,id:r.id,createdAt:r.createdAt,updatedAt:Js()};return n.teams[o]=a,_n(n),a}function zk(e){const t=Ge(),n=t.teams.length;return t.teams=t.teams.filter(o=>o.id!==e),t.teams.length===n?false:(_n(t),true)}function Gk(e){return Ge().teams.find(n=>n.id===e)??null}function Hk(){return [...Ge().teams]}function jk(e){const t=Ge(),n=e.trim();return t.teams.find(o=>o.name.trim()===n)??null}function Uk(e){const t=Ge(),n=new Map(t.teams.map(o=>[o.id,o]));if(e.length!==t.teams.length)return  false;for(const o of e)if(!n.has(o))return  false;return t.teams=e.map(o=>n.get(o)),_n(t),true}function Wk(e,t){try{return ig(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function Vk(){const n=In().get().byLocation.active.map(r=>r.id).sort(),o=Ge();for(const r of o.teams){const a=r.petIds.filter(i=>i!=="").sort();if(a.length===n.length&&a.every((i,s)=>i===n[s]))return r.id}return null}function sg(){const e=Vk(),t=Ge();return e!==t.activeTeamId&&(t.activeTeamId=e,_n(t)),e}function lg(e){const t=Ge();t.activeTeamId=e,_n(t);}function qk(e){return sg()===e}function Xk(e){const t=In(),n=bt(),o=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const a=o.byLocation.active,i=e.petIds.filter(c=>c!==ze).sort(),s=a.map(c=>c.id).sort();if(JSON.stringify(i)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const l=o.hutch,d=l.hasHutch?l.maxItems-l.currentItems:0;Kk(e.petIds,d,o),lg(e.id),console.log("[PetTeam] Team activated successfully");}function Kk(e,t,n){const o=n.byLocation.active;let r=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<fc;a++){const i=e[a],s=o[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${s?.id.slice(0,8)??"empty"}, target=${i.slice(0,8)||"empty"}, hutchSpace=${r}`),s?.id===i){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(i===ze&&s){const l=r>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${l}`),Yk(s.id,l),l&&r--;continue}if(!s&&i!==ze){const d=n.all.find(c=>c.id===i)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${d}`),d&&r++,Jk(i,n);continue}if(s&&i!==ze){const d=n.all.find(u=>u.id===i)?.location==="hutch";d&&r++;const c=r>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${d}, storeInHutch=${c}`),Qk(s.id,i,n,c),c&&r--;continue}}console.log(`[PetTeam] Swap complete, ${r} hutch spaces remaining`);}function Yk(e,t){Ef(e),t&&Zl(e);}function Jk(e,t){const n=t.all.find(o=>o.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&ec(e),_f(e);}function Qk(e,t,n,o){const r=n.all.find(a=>a.id===t);if(!r){console.warn(`[PetTeam] Pet ${t} not found`);return}r.location==="hutch"&&ec(t),Tf(e,t),o&&Zl(e);}let aa=false;const pe={init(){if(aa)return;if(!Ge().enabled){console.log("[PetTeam] Feature disabled");return}aa=true,console.log("[PetTeam] Feature initialized");},destroy(){aa&&(aa=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:Pk,setEnabled:Mk,createTeam:Bk,updateTeam:ig,deleteTeam:zk,renameTeam:Wk,getTeam:Gk,getAllTeams:Hk,getTeamByName:jk,reorderTeams:Uk,getPetsForTeam:ag,isTeamFull:Rk,getEmptySlots:Nk,getFilledSlotCount:Fk,isTeamEmpty:Ok,isPetInTeam:$k,getPetSlotIndex:Dk,getActiveTeamId:sg,setActiveTeamId:lg,isActiveTeam:qk,activateTeam:Xk},Zk=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],cg=ke.XP_TRACKER,e1={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},zn="XP Tracker",Gn="[XpTracker]";function lo(){return Se(cg,e1)}function dg(e){_e(cg,e);}function ug(e){const n={...lo(),...e};return dg(n),n}function pg(){return lo().enabled}function t1(e){ug({enabled:e});}function gc(e){return Zk.includes(e)}function n1(e){const t=te.get("abilities");if(!t)return null;const n=t[e];return !n||!gc(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function fg(e){return e.filter(gc)}function gg(e){return e.some(gc)}function o1(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function mg(e,t,n,o=100){const r=n1(e);if(!r)return null;const a=o1(e),i=r.requiredWeather,s=i===null||n===i,l=t/o,d=l*l,c=r.baseProbability,u=r.bonusXp,p=c,f=Math.floor(u*d),g=p/100*60,x=s?Math.floor(g*f):0;return {abilityId:e,abilityName:r.name,tier:a,baseChancePerMinute:c,actualChancePerMinute:p,baseXpPerProc:u,actualXpPerProc:f,expectedProcsPerHour:g,expectedXpPerHour:x,requiredWeather:i,isActive:s}}function hg(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const o of e){const r=fg(o.abilities);for(const a of r){const i=mg(a,o.strength,t,o.maxStrength||100);i&&(n.boosters.push({petId:o.petId,petName:o.petName,stats:i}),i.isActive&&(n.totalBonusXpPerHour+=i.expectedXpPerHour,n.totalProcsPerHour+=i.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function bg(e,t,n,o=100){const r=fg(e);return r.length===0?null:mg(r[0],t,n,o)}function Fd(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function r1(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function a1(e,t){return e.species.localeCompare(t.species)}function i1(e,t){return t.currentStrength-e.currentStrength}function s1(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function l1(e,t){return e.name.localeCompare(t.name)}function c1(e){switch(e){case "closestToMax":return Fd;case "furthestFromMax":return r1;case "species":return a1;case "strength":return i1;case "location":return s1;case "name":return l1;default:return Fd}}function xg(e,t){const n=c1(t);return [...e].sort(n)}function d1(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function u1(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function yg(e,t){let n=e;return n=d1(n,t.filterSpecies),n=u1(n,t.filterHasXpBoost),n=xg(n,t.sortBy),n}function bo(e){const t=pe.getTeam(e);if(!t)return null;const n=vg(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:Re,bonusXpPerHour:0,totalXpPerHour:Re,activeBoosterCount:0,totalProcsPerHour:0}};const o=fe.weather.get(),r=o.isActive?o.type:null,a=n.filter(c=>!c.isMature||gg(c.abilities)).filter(c=>c.hunger>0).map(c=>({petId:c.id,petName:c.name??"",abilities:c.abilities,strength:c.currentStrength})),i=hg(a,r),s=[],l=p1(n,i.totalBonusXpPerHour);for(const c of n){const u=Qs(c,r,i.totalBonusXpPerHour,l);s.push(u);}const d={baseXpPerHour:Re,bonusXpPerHour:i.totalBonusXpPerHour,totalXpPerHour:Re+i.totalBonusXpPerHour,activeBoosterCount:i.activeBoosterCount,totalProcsPerHour:i.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:d}}function vg(e){const t=fe.myPets.get(),n=[];for(const o of e.petIds){if(!o)continue;const r=t.all.find(a=>a.id===o);r&&n.push(r);}return n}function p1(e,t){let n=0;for(const o of e){const r=kr(o.petSpecies,o.targetScale);if(Ir(o.petSpecies,o.xp,r)>=r)continue;const i=o.hunger>0?Re+t:0,s=ki(o.petSpecies,o.xp,r,i>0?i:Re);n=Math.max(n,s);}return n}function Qs(e,t,n,o){const r=kr(e.petSpecies,e.targetScale),a=Ir(e.petSpecies,e.xp,r),i=a>=r,s=e.hunger<=0,d=s?0:(s?0:Re)+n,c=bg(e.abilities,a,t),u=i?null:Xl(e.petSpecies,e.xp,a,r,d>0?d:Re),p=ki(e.petSpecies,e.xp,r,d>0?d:Re),f=u!==null?Jl(e.petSpecies,e.hunger,u):null,g=cr(e.petSpecies,e.hunger,p),x=i&&c&&o>0?Ql(true,true,e.petSpecies,e.hunger,0,o):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:a,maxStrength:r,isMaxStrength:i,xpPerHour:d,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:c,supportingFeeds:x,mutations:e.mutations,targetScale:e.targetScale}}function Od(e){const t=pe.getTeam(e);if(!t)return 0;const n=vg(t);if(n.length===0)return 0;const o=n.map(r=>{const a=kr(r.petSpecies,r.targetScale);return Ir(r.petSpecies,r.xp,a)/a*100});return o.reduce((r,a)=>r+a,0)/o.length}function $d(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let Zn=false,Ta=null,Ai=[],mc=null;function f1(e,t,n){const o=kr(e.petSpecies,e.targetScale),r=Ir(e.petSpecies,e.xp,o),a=r>=o,i=e.hunger<=0,s=i?0:Re,l=bg(e.abilities,r,t);l?.isActive&&l.expectedXpPerHour;const d=e.location==="active"&&!i?s+n:0,c=Xl(e.petSpecies,e.xp,r,o,d>0?d:Re),u=ki(e.petSpecies,e.xp,o,d>0?d:Re),p=Jl(e.petSpecies,e.hunger,c),f=cr(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:i,currentStrength:r,maxStrength:o,isMaxStrength:a,hoursToNextStrength:c,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:d,xpBoostStats:l,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function wg(){const e=fe.myPets.get(),t=fe.weather.get(),n=t.isActive?t.type:null,r=e.byLocation.active.filter(l=>!l.isMature||gg(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),a=hg(r,n);mc=a;const i=[];for(const l of e.all){const d=f1({id:l.id,petSpecies:l.petSpecies,name:l.name??"",xp:l.xp,hunger:l.hunger,targetScale:l.targetScale,abilities:l.abilities,mutations:l.mutations,location:l.location},n,a.totalBonusXpPerHour);i.push(d);}const s=Math.max(0,...i.map(l=>l.hoursToMaxStrength));for(const l of i)l.isMaxStrength&&l.xpBoostStats&&(l.feedsToMaxStrength=Ql(true,true,l.species,l.hunger,0,s));return i}function Sg(){if(Zn)return;if(!lo().enabled){console.log(`${Gn} ${zn} disabled`);return}console.log(`${Gn} Initializing ${zn}...`),te.isReady()&&(Ai=wg()),Zn=true,console.log(`${Gn} ${zn} initialized`);}function hc(){return Zn&&te.isReady()}function bc(){return hc()?Ai:[]}function g1(){return bc().filter(e=>e.location==="active")}function m1(){return mc}function xc(){hc()&&(Ai=wg());}function h1(e){yc();const t=lo(),n=e??t.updateIntervalMs;Ta=setInterval(()=>{pg()&&xc();},n);}function yc(){Ta&&(clearInterval(Ta),Ta=null);}function Cg(){Zn&&(yc(),Zn=false,Ai=[],mc=null,console.log(`${Gn} ${zn} destroyed`));}function b1(){const e=lo();return yg(bc(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function x1(e){t1(e),e?(Zn=false,Sg(),te.isReady()&&xc(),console.log(`${Gn} ${zn} enabled`)):(Cg(),console.log(`${Gn} ${zn} disabled`));}const Ya={init:Sg,isReady:hc,destroy:Cg,loadConfig:lo,saveConfig:dg,updateConfig:ug,isEnabled:pg,setEnabled:x1,getAllPetsProgress:bc,getActivePetsProgress:g1,getCombinedBoostStats:m1,getFilteredPets:b1,refresh:xc,startAutoUpdate:h1,stopAutoUpdate:yc,sortPets:xg,filterAndSortPets:yg},dr={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},ur={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(dr),...Object.keys(ur)];function vc(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in dr){const r=dr[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function wc(e){const t=[];for(const n of e)for(const o of n.abilities)if(o in ur){const r=ur[o];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:o,procRate:r.procRate,minutesPerProc:r.minutesPerProc});}return t}function pr(e){let t=0,n=0;for(const o of e){const r=o.procRate*60;t+=r,n+=r*o.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Hn(e){return e.some(t=>t.abilities.some(n=>n in dr))}function jn(e){return e.some(t=>t.abilities.some(n=>n in ur))}let Xo=null,Ut=0;function kg(){const t=Je().get().plant;if(!t){Ut=0;return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;if(!n){Ut=0;return}Ut=gt(n.species,n.targetScale,n.mutations||[]),console.log(`[CropValueIndicator] Updated crop value: ${Ut} coins`);}function y1(e){const{current:t}=e;if(kg(),!t){console.log("[CropValueIndicator] No plant on current tile");return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n?console.log(`[CropValueIndicator] 💰 Crop Price: ${Ut} coins`,{species:t.species,slot:{index:t.currentSlotIndex,scale:n.targetScale,mutations:n.mutations||[]},plantInfo:{totalSlots:t.slots.length,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex}}):console.log("[CropValueIndicator] Plant Info:",{species:t.species,currentSlotIndex:t.currentSlotIndex,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex,totalSlots:t.slots.length,currentSlot:n,cropValue:Ut>0?`${Ut} coins`:"N/A"});}function v1(){Xo&&(console.warn("[CropValueIndicator] Already monitoring, cleaning up previous subscription"),Ig()),console.log("[CropValueIndicator] Starting plant info monitoring..."),kg(),Xo=Je().subscribePlantInfo(y1,{immediate:true}),console.log("[CropValueIndicator] Monitoring started");}function Ig(){Xo&&(console.log("[CropValueIndicator] Stopping monitoring..."),Xo(),Xo=null,Ut=0,console.log("[CropValueIndicator] Monitoring stopped"));}function Pi(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function _g(e,t){e.add(()=>t.disconnect());}const Zs="css-qnqsp4",el="css-v439q6";let Un=Pi(),tl=false,xo=false,Ea=null,nl=null,dn=null;const w1=`
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
`;function S1(){if(tl)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=w1,document.head.appendChild(e),Un.add(()=>e.remove()),tl=true,console.log("[CropValueIndicator.render] Styles injected");}function C1(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const o=document.createElement("canvas");o.width=20,o.height=20,n.appendChild(o);const r=document.createElement("div");r.className="gemini-qol-cropPrice-text",r.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(r);try{const a=J.toCanvas("ui","Coin");if(a&&o.parentElement){const i=o.getContext("2d");if(i){const s=Math.min(o.width/a.width,o.height/a.height),l=a.width*s,d=a.height*s,c=(o.width-l)/2,u=(o.height-d)/2;i.drawImage(a,c,u,l,d);}}}catch(a){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",a);}return t}function k1(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const o of n){const r=o.textContent?.trim();if(!r)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(r)&&t.push(r);}return t}function I1(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const o=n.textContent?.trim();if(!o)continue;const r=o.match(/^([\d.]+)\s*kg$/i);if(r)return parseFloat(r[1])}return 1}function _1(){const e=[],t=document.querySelectorAll(`.${Zs}`);for(const o of t)o.offsetParent&&(o.closest("button.chakra-button")||e.push({element:o}));const n=document.querySelectorAll(`.${el}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelectorAll(":scope > .McFlex > .McFlex");if(r.length>0){const a=r[r.length-1];a.querySelector("p.chakra-text")&&e.push({element:a});}}return e}function T1(){const t=Je().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?gt(n.species,n.targetScale,n.mutations||[]):0}function E1(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(".gemini-qol-cropPrice-text");r&&(r.textContent=e>0?e.toLocaleString():"");}console.log("[CropValueIndicator.render] 🔄 Updated all prices:",{species:t.species,scale:t.targetScale,mutations:t.mutations||[],price:e,count:n.length});}function A1(){dn!==null&&cancelAnimationFrame(dn),dn=requestAnimationFrame(()=>{dn=null;const e=T1();if(e===nl)return;nl=e;const n=Je().get().plant;if(!n)return;const o=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;o&&E1(e,o);});}function yo(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t){console.log("[CropValueIndicator.render] No name element found in tooltip");return}const n=t.closest(".McFlex");if(!n){console.log("[CropValueIndicator.render] No McFlex container found");return}const r=Je().get().plant;let a=0;if(r&&r.currentSlotIndex!==null){const s=r.slots[r.currentSlotIndex];s&&(a=gt(s.species,s.targetScale,s.mutations||[]));}if(a===0){const s=t.textContent?.trim();if(s){const l=I1(n),d=k1(n);a=gt(s,l,d);}}const i=C1(a);n.appendChild(i),Un.add(()=>i.remove()),console.log("[CropValueIndicator.render] ✅ Injected price:",{price:a});}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function P1(){const e=_1();for(const n of e)yo(n);Ea=Je().subscribePlantInfo(()=>{A1();});const t=new MutationObserver(n=>{for(const o of n)o.type==="childList"&&o.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.classList.contains(Zs)&&(r.closest("button.chakra-button")||yo({element:r})),r.querySelectorAll(`.${Zs}`).forEach(s=>{s.closest("button.chakra-button")||yo({element:s});}),r.classList.contains(el)&&!r.closest("button.chakra-button")){const s=r.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&!l.querySelector(".gemini-qol-cropPrice")&&yo({element:l});}}r.querySelectorAll(`.${el}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const d=l[l.length-1];d.querySelector("p.chakra-text")&&!d.querySelector(".gemini-qol-cropPrice")&&yo({element:d});}}});}});});t.observe(document.body,{childList:true,subtree:true}),_g(Un,t),console.log("[CropValueIndicator.render] Started observing crops");}const M1={init(){if(xo){console.log("[CropValueIndicator.render] Already initialized");return}xo=true,S1(),P1(),console.log("✅ [CropValueIndicator.render] Initialized");},destroy(){xo&&(xo=false,dn!==null&&(cancelAnimationFrame(dn),dn=null),Ea&&(Ea(),Ea=null),Un.run(),Un.clear(),Un=Pi(),tl=false,nl=null,console.log("🛑 [CropValueIndicator.render] Destroyed"));},isEnabled(){return xo}},Tg=ke.CROP_VALUE_INDICATOR,L1={enabled:false};function Sc(){return Se(Tg,L1)}function R1(e){_e(Tg,e);}let fr=false;function Eg(){if(fr){console.log("[CropValueIndicator] Already initialized");return}if(!Sc().enabled){console.log("[CropValueIndicator] Disabled");return}fr=true,console.log("[CropValueIndicator] Initializing..."),v1(),console.log("[CropValueIndicator] Initialized successfully");}function Ag(){fr&&(console.log("[CropValueIndicator] Destroying..."),Ig(),fr=false,console.log("[CropValueIndicator] Destroyed"));}function N1(){return fr}function F1(){return Sc().enabled}function O1(e){const t=Sc();if(t.enabled===e){console.log(`[CropValueIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,R1(t),e?Eg():Ag(),console.log(`[CropValueIndicator] ${e?"Enabled":"Disabled"}`);}const Ko={init:Eg,destroy:Ag,isReady:N1,isEnabled:F1,setEnabled:O1,render:M1},gr="css-qnqsp4",Cc="css-1cdcuw7",kc='[role="tooltip"]';let Aa=Pi(),vo=false,Pa=null,ol=null,un=null;function $1(){const e=[],t=document.querySelectorAll(`.${gr}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const o=n.querySelector(`.${Cc}`);o&&e.push({element:n,weightElement:o});}return e}function D1(){const t=Je().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Vl(n.species,n.targetScale):0}function B1(e,t){const n=document.querySelectorAll(`.${gr}`);for(const o of n){if(!o.offsetParent||o.closest("button.chakra-button"))continue;const r=o.querySelector(`.${Cc}`);if(r){const a=r.querySelector("svg"),i=`${e}%`;r.textContent=i,a&&r.appendChild(a);}}Ja(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function z1(){un!==null&&cancelAnimationFrame(un),un=requestAnimationFrame(()=>{un=null;const e=D1();if(e===ol)return;ol=e;const n=Je().get().plant;if(!n)return;const o=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;o&&B1(e,o);});}function Pg(e,t){const n=te.get("plants");if(!n)return "";const o=n[e];return o?.crop?.baseWeight?`${(o.crop.baseWeight*t).toFixed(2)} kg`:""}function Ja(){const e=document.querySelectorAll(kc),n=Je().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=Pg(o.species,o.targetScale);for(const a of e){if(!a.offsetParent)continue;const i=a.textContent?.trim();i&&i.startsWith("Size:")&&r&&(a.textContent=r);}}function ps(){const e=$1();for(const t of e)if(t.weightElement)try{const o=Je().get().plant;if(o&&o.currentSlotIndex!==null){const r=o.slots[o.currentSlotIndex];if(r){const a=Vl(r.species,r.targetScale),i=t.weightElement.querySelector("svg");t.weightElement.textContent=`${a}%`,i&&t.weightElement.appendChild(i);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}Ja();}function G1(){const e=document.querySelectorAll(`.${gr}`),n=Je().get().plant;if(!n||n.currentSlotIndex===null)return;const o=n.slots[n.currentSlotIndex];if(!o)return;const r=Pg(o.species,o.targetScale);for(const i of e){if(!i.offsetParent||i.closest("button.chakra-button"))continue;const s=i.querySelector(`.${Cc}`);if(s){const l=s.querySelector("svg");s.textContent=r,l&&s.appendChild(l);}}const a=document.querySelectorAll(kc);for(const i of a){if(!i.offsetParent)continue;const s=i.textContent?.trim();s&&!s.includes("kg")&&(i.textContent=r);}console.log("[CropSizeIndicator.render] Restored crop weights");}function H1(){ps(),Pa=Je().subscribePlantInfo(()=>{z1();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.hasAttribute("role")&&o.getAttribute("role")==="tooltip"){const i=o.textContent?.trim();i&&i.startsWith("Size:")&&Ja();}o.classList.contains(gr)&&(o.closest("button.chakra-button")||ps()),o.querySelectorAll(`.${gr}`).length>0&&ps(),o.querySelectorAll(kc).forEach(i=>{const s=i.textContent?.trim();s&&s.startsWith("Size:")&&Ja();});}});});e.observe(document.body,{childList:true,subtree:true}),_g(Aa,e),console.log("[CropSizeIndicator.render] Started observing crops");}const Ic={init(){if(vo){console.log("[CropSizeIndicator.render] Already initialized");return}vo=true,H1(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){vo&&(vo=false,G1(),un!==null&&(cancelAnimationFrame(un),un=null),Pa&&(Pa(),Pa=null),Aa.run(),Aa.clear(),Aa=Pi(),ol=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return vo}},Mg=ke.CROP_SIZE_INDICATOR,j1={enabled:false};function _c(){return Se(Mg,j1)}function U1(e){_e(Mg,e);}let mr=false;function Lg(){if(mr){console.log("[CropSizeIndicator] Already initialized");return}if(!_c().enabled){console.log("[CropSizeIndicator] Disabled");return}mr=true,console.log("[CropSizeIndicator] Initializing..."),Ic.init(),console.log("[CropSizeIndicator] Initialized successfully");}function Rg(){mr&&(console.log("[CropSizeIndicator] Destroying..."),Ic.destroy(),mr=false,console.log("[CropSizeIndicator] Destroyed"));}function W1(){return mr}function V1(){return _c().enabled}function q1(e){const t=_c();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,U1(t),e?Lg():Rg(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const Yo={init:Lg,destroy:Rg,isReady:W1,isEnabled:V1,setEnabled:q1,render:Ic},Ng=ke.SHOP_NOTIFIER,Fg={seed:[],tool:[],egg:[],decor:[]},X1={enabled:false,trackedItems:Fg},K1=["seed","tool","egg","decor"];function Og(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function Pr(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function co(){const e=Se(Ng,X1);return {enabled:e?.enabled??false,trackedItems:Og(e?.trackedItems)}}function Mi(e){_e(Ng,{enabled:e.enabled,trackedItems:Pr(e.trackedItems)});}function Y1(e){const n={...co(),...e};return e.trackedItems&&(n.trackedItems=Og(e.trackedItems)),Mi(n),n}function Tc(){return co().enabled}function J1(e){Y1({enabled:e});}function $g(){return Pr(co().trackedItems)}function Dg(){const e=$g(),t=[];for(const n of K1)for(const o of e[n])t.push({shopType:n,itemId:o});return t}function Q1(e,t){const n=co(),o=Pr(n.trackedItems),r=o[e];if(r.includes(t))return;r.push(t),Mi({...n,trackedItems:o});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(a);}function Bg(e,t){const n=co(),o=Pr(n.trackedItems),r=o[e],a=r.filter(s=>s!==t);if(a.length===r.length)return;o[e]=a,Mi({...n,trackedItems:o});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(i);}function Z1(){const e=co();Mi({...e,trackedItems:Pr(Fg)});}let Qa=false;const rl=[];function eI(e,t){const n=$g()[e];if(!n.length)return [];const o=new Set(n);return t.items.filter(r=>o.has(r.id)&&r.isAvailable).map(r=>({itemId:r.id,remaining:r.remaining}))}function ia(e,t){const n=eI(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const o=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(o);}function tI(){if(Qa)return;Qa=true;const e=io();rl.push(e.subscribeSeedRestock(t=>ia("seed",t)),e.subscribeToolRestock(t=>ia("tool",t)),e.subscribeEggRestock(t=>ia("egg",t)),e.subscribeDecorRestock(t=>ia("decor",t)));}function nI(){if(Qa){Qa=false;for(const e of rl)e();rl.length=0;}}const zg={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function oI(e,t,n){const o=n.find(a=>typeof a=="object"&&a!==null&&"toolId"in a&&a.toolId===e);return o?(o.quantity??0)>=t:false}function rI(e,t,n){const o=n.find(d=>typeof d=="object"&&d!==null&&"decorId"in d&&d.decorId===e),r=o?o.quantity??0:0,s=_i().get().decors.all.filter(d=>typeof d=="object"&&d!==null&&"decorId"in d&&d.decorId===e).length;return r+s>=t}function Gg(e,t,n,o){return t==="tool"?oI(e,n,o):t==="decor"?rI(e,n,o):false}function Dd(e,t){const n=zg[e];if(!n||n.shopType!==t)return  false;const r=bt().get();return Gg(e,t,n.maxQuantity,r.items)}function Bd(){const t=bt().get(),n=Dg();for(const o of n){const r=zg[o.itemId];r&&r.shopType===o.shopType&&Gg(o.itemId,o.shopType,r.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${o.itemId} (max quantity reached)`),Bg(o.shopType,o.itemId));}}let Za=false,Ma=null;function aI(){if(Za)return;Za=true,Ma=bt().subscribeStable(()=>{Bd();}),Bd();}function iI(){Za&&(Za=false,Ma&&(Ma(),Ma=null));}let hr=false;function Hg(){if(hr){console.log("[ShopNotifier] Already initialized");return}if(!Tc()){console.log("[ShopNotifier] Disabled");return}hr=true,tI(),aI(),console.log("[ShopNotifier] Initialized");}function jg(){hr&&(nI(),iI(),hr=false,console.log("[ShopNotifier] Destroyed"));}function sI(){return hr}function lI(){return Tc()}function cI(e){if(Tc()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}J1(e),e?Hg():jg(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const Xt={init:Hg,destroy:jg,isReady:sI,isEnabled:lI,setEnabled:cI,addTrackedItem:Q1,removeTrackedItem:Bg,getTrackedItems:Dg,resetTrackedItems:Z1},Ug=ke.WEATHER_NOTIFIER,dI={enabled:false,trackedWeathers:[]};function Wg(e){return Array.isArray(e)?[...e]:[]}function Li(e){return [...e]}function Mr(){const e=Se(Ug,dI);return {enabled:e?.enabled??false,trackedWeathers:Wg(e?.trackedWeathers)}}function Ec(e){_e(Ug,{enabled:e.enabled,trackedWeathers:Li(e.trackedWeathers)});}function uI(e){const n={...Mr(),...e};return e.trackedWeathers&&(n.trackedWeathers=Wg(e.trackedWeathers)),Ec(n),n}function Vg(){return Mr().enabled}function pI(e){uI({enabled:e});}function Ri(){return Li(Mr().trackedWeathers)}function fI(e){return Ri().includes(e)}function gI(e){const t=Mr(),n=Li(t.trackedWeathers);if(n.includes(e))return;n.push(e);const o=!t.enabled&&n.length>0,r={trackedWeathers:n,enabled:o?true:t.enabled};Ec(r);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:o}});window.dispatchEvent(a);const i=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(i);}function mI(e){const t=Mr(),n=Li(t.trackedWeathers),o=n.filter(s=>s!==e);if(o.length===n.length)return;const r=t.enabled&&o.length===0,a={trackedWeathers:o,enabled:r?false:t.enabled};Ec(a);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:r}});window.dispatchEvent(i);}let Jo=null,La="Sunny",At=false,Qo=null,ei="";function qg(e){return `${e.soundId}:${e.volume}:${e.mode}`}function ti(e){const t=de.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:Ae.CustomSounds.getNotificationConfig("weather")}function hI(e){if(At)return;const t=Ae.CustomSounds.getById(e.soundId);if(t){Qo=t.source,At=true,ei=qg(e);try{Ae.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{At=false,Qo=null,ei="";}}}function Ra(){if(At){try{const e=Ae.getCustomHandle();(!Qo||e&&e.url===Qo)&&Ae.CustomSounds.stop();}catch{}At=false,Qo=null,ei="";}}function br(e,t){const n=t??ti(e);if(n.mode!=="loop"){At&&Ra();return}if(!Ri().includes(e)){At&&Ra();return}const a=qg(n);At&&a!==ei&&Ra(),At||hI(n);}function Xg(e){const{weatherId:t}=e.detail||{};if(!t)return;const r=Tr().get().id,a=ti(t);if(r===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),a.mode==="one-shot"&&Jg(a),br(r,a);const i=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(i);}}function Kg(){const t=Tr().get().id;br(t);}function Yg(e){if(e.detail?.entityType!=="weather")return;const o=Tr().get().id;br(o);}function bI(){if(Jo){console.log("[WeatherNotifier] Already tracking");return}const e=Tr(),t=e.get();La=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",La),window.addEventListener("gemini:weather-tracked-check",Xg),window.addEventListener("gemini:tracked-weathers-changed",Kg),window.addEventListener(qt.CUSTOM_SOUND_CHANGE,Yg);const n=ti(t.id);br(t.id,n),Jo=e.subscribeStable(o=>{const r=o.current.id,a=o.previous.id,i=ti(r);if(console.log("[WeatherNotifier] Weather changed:",{previous:a,current:r}),br(r,i),r!==a&&Ri().includes(r)){console.log("[WeatherNotifier] Tracked weather detected:",r),i.mode==="one-shot"&&Jg(i);const l=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:r}});window.dispatchEvent(l);}La=r;}),console.log("[WeatherNotifier] Tracking initialized");}function xI(){window.removeEventListener("gemini:weather-tracked-check",Xg),window.removeEventListener("gemini:tracked-weathers-changed",Kg),window.removeEventListener(qt.CUSTOM_SOUND_CHANGE,Yg),Jo&&(Jo(),Jo=null,La="Sunny",Ra(),console.log("[WeatherNotifier] Tracking stopped"));}function Jg(e){try{Ae.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let xr=false;function Qg(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),em(),Zg());}function Zg(){if(xr){console.log("[WeatherNotifier] Already initialized");return}if(xr=true,window.addEventListener("gemini:tracked-weathers-changed",Qg),!Vg()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),bI(),console.log("[WeatherNotifier] Initialized");}function em(){xr&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",Qg),xI(),xr=false,console.log("[WeatherNotifier] Destroyed"));}function yI(){return xr}const vn={init:Zg,destroy:em,isReady:yI,isEnabled:Vg,setEnabled:pI,getTrackedWeathers:Ri,addTrackedWeather:gI,removeTrackedWeather:mI,isWeatherTracked:fI},vI={enabled:false,threshold:5};function Ni(){return Se(ke.PET_HUNGER_NOTIFIER,vI)}function tm(e){_e(ke.PET_HUNGER_NOTIFIER,e);}function nm(){return Ni().enabled}function wI(e){const t=Ni();t.enabled=e,tm(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function om(){return Ni().threshold}function SI(e){const t=Ni();t.threshold=e,tm(t);}let Zo=null;const Na=new Set;let Vt=false,er=null;function CI(e){if(Vt)return;const t=Ae.CustomSounds.getById(e.soundId);if(t){er=t.source,Vt=true;try{Ae.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{Vt=false,er=null;}}}function al(){if(Vt){try{const e=Ae.getCustomHandle();(!er||e&&e.url===er)&&Ae.CustomSounds.stop();}catch{}Vt=false,er=null;}}function kI(e,t){if(t.mode!=="loop"){Vt&&al();return}e?Vt||CI(t):Vt&&al();}function II(){if(Zo){console.log("[PetHungerNotifier] Already tracking");return}const e=In(),t=om();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),Zo=e.subscribe(n=>{const o=n.byLocation.active,r=Ae.CustomSounds.getNotificationConfig("pet"),a=r.mode==="loop";let i=false;for(const s of o)if(s.hungerPercent<t){if(i=true,!Na.has(s.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:s.name||s.petSpecies,species:s.petSpecies,hungerPercent:s.hungerPercent.toFixed(2)+"%"}),a||TI(r);const l=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:s}});window.dispatchEvent(l),Na.add(s.id);}}else Na.delete(s.id);kI(i,r);}),console.log("[PetHungerNotifier] Tracking initialized");}function _I(){Zo&&(Zo(),Zo=null,Na.clear(),al(),console.log("[PetHungerNotifier] Tracking stopped"));}function TI(e){try{Ae.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let yr=false;function rm(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),im(),am());}function am(){if(yr){console.log("[PetHungerNotifier] Already initialized");return}if(yr=true,window.addEventListener("gemini:pet-hunger-config-changed",rm),!nm()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),II(),console.log("[PetHungerNotifier] Initialized");}function im(){yr&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",rm),_I(),yr=false,console.log("[PetHungerNotifier] Destroyed"));}function EI(){return yr}const eo={init:am,destroy:im,isReady:EI,isEnabled:nm,setEnabled:wI,getThreshold:om,setThreshold:SI},AI={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},sm=ke.ARIES_API;function Ac(){return Se(sm,AI)}function PI(e){_e(sm,e);}function MI(e){const n={...Ac(),...e};return PI(n),n}let ni=null,oi=null;function zd(e){ni=e;}function Gd(e){oi=e;}function LI(){return ni?[...ni]:[]}function RI(){return oi?[...oi]:[]}function Hd(){ni=null,oi=null;}function lm(e,t){const n=Ac(),o=new URL(e,n.apiBaseUrl);if(t)for(const[r,a]of Object.entries(t))a!==void 0&&o.searchParams.set(r,String(a));return o.toString()}function Fi(e,t){return new Promise(n=>{const o=lm(e,t);GM_xmlhttpRequest({method:"GET",url:o,headers:{},onload:r=>{if(r.status>=200&&r.status<300)try{const a=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:a});}catch(a){console.error("[AriesAPI] GET parse error:",a,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] GET error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] GET request failed:",r),n({status:0,data:null});}});})}function Oi(e,t){return new Promise(n=>{const o=lm(e);GM_xmlhttpRequest({method:"POST",url:o,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:r=>{if(r.status>=200&&r.status<300)try{const a=r.responseText?JSON.parse(r.responseText):null;n({status:r.status,data:a});}catch(a){console.error("[AriesAPI] POST parse error:",a,r.responseText),n({status:r.status,data:null});}else console.error("[AriesAPI] POST error:",r.status,r.responseText),n({status:r.status,data:null});},onerror:r=>{console.error("[AriesAPI] POST request failed:",r),n({status:0,data:null});}});})}async function Pc(e=50){const{data:t}=await Fi("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(o=>({name:o.name,avatarUrl:o.avatar_url??null})):void 0}))}async function NI(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,a=n.toLowerCase(),i=await Pc(r),s=[];for(const l of i){if(!l.userSlots||l.userSlots.length===0)continue;const d=l.userSlots.filter(c=>c.name?c.name.toLowerCase().includes(a):false);d.length>0&&s.push({room:l,matchedSlots:d});}return s}async function FI(e){if(!e)return null;const{status:t,data:n}=await Fi("get-player-view",{playerId:e});return t===404?null:n}async function $i(e,t){const n=Array.from(new Set((e??[]).map(i=>String(i).trim()).filter(i=>i.length>=3)));if(n.length===0)return [];const o={playerIds:n};t?.sections&&(o.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:r,data:a}=await Oi("get-players-view",o);return r!==200||!Array.isArray(a)?[]:a}async function OI(e,t){const n=e.trim(),o=t?.minQueryLength??2;if(n.length<o)return [];const r=t?.limitRooms??200,a=n.toLowerCase(),i=await Pc(r),s=new Map;for(const l of i)if(!(!l.userSlots||l.userSlots.length===0))for(const d of l.userSlots){if(!d.name||!d.name.toLowerCase().includes(a))continue;const u=`${l.id}::${d.name}`;s.has(u)||s.set(u,{playerName:d.name,avatarUrl:d.avatarUrl,roomId:l.id,roomPlayersCount:l.playersCount});}return Array.from(s.values())}async function cm(e){if(!e)return [];const{status:t,data:n}=await Fi("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function $I(e){const t=await cm(e);if(t.length===0)return zd([]),[];const n=await $i(t,{sections:["profile","room"]});return zd(n),[...n]}async function Mc(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await Fi("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function DI(e){const{incoming:t}=await Mc(e),n=t.map(r=>r.fromPlayerId);if(n.length===0)return Gd([]),[];const o=await $i(n,{sections:["profile"]});return Gd(o),[...o]}async function BI(e){const{outgoing:t}=await Mc(e),n=t.map(o=>o.toPlayerId);return n.length===0?[]:$i(n,{sections:["profile"]})}async function zI(e,t){if(!e||!t||e===t)return  false;const{status:n}=await Oi("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function GI(e){const{playerId:t,otherPlayerId:n,action:o}=e;if(!t||!n||t===n)return  false;const{status:r}=await Oi("friend-respond",{playerId:t,otherPlayerId:n,action:o});return r===204}async function HI(e,t){if(!e||!t||e===t)return  false;const{status:n}=await Oi("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let wo=false;const ri={init(){wo||(wo=true,console.log("[AriesAPI] Initialized"));},destroy(){wo&&(wo=false,Hd(),console.log("[AriesAPI] Destroyed"));},isReady(){return wo},getConfig(){return Ac()},updateConfig(e){return MI(e)},fetchRooms:Pc,searchRoomsByPlayerName:NI,fetchPlayerView:FI,fetchPlayersView:$i,searchPlayersByName:OI,fetchFriendsIds:cm,fetchFriendsWithViews:$I,fetchFriendRequests:Mc,fetchIncomingRequestsWithViews:DI,fetchOutgoingRequestsWithViews:BI,sendFriendRequest:zI,respondFriendRequest:GI,removeFriend:HI,getCachedFriends:LI,getCachedIncomingRequests:RI,clearCache:Hd};class dm{constructor(){U(this,"stats");U(this,"STORAGE_KEY",ke.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Se(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){_e(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats();}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats();}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(const r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Wn=null;function jI(){return Wn||(Wn=new dm),Wn}function UI(){Wn&&(Wn.endSession(),Wn=null);}function um(e){const t=vi(e.xp),n=wi(e.petSpecies,e.targetScale),o=Si(e.petSpecies,e.xp,n),r=Ci(e.petSpecies,t),a=vf(e.petSpecies),i=Mw(o,n,a),s=Lw(o,n);return {current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:a,hoursToMax:i}}function pm(e){return {...e,strength:um(e)}}function fm(e){return e.map(pm)}function WI(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=fm(e),n=t.reduce((l,d)=>l+d.strength.current,0),o=t.reduce((l,d)=>l+d.strength.max,0),r=t.filter(l=>l.strength.isMature).length,a=t.length-r,i=t.reduce((l,d)=>d.strength.max>(l?.strength.max||0)?d:l,t[0]),s=t.reduce((l,d)=>d.strength.max<(l?.strength.max||1/0)?d:l,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:a,strongestPet:i,weakestPet:s}}const VI=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:um,enrichPetWithStrength:pm,enrichPetsWithStrength:fm,getPetStrengthStats:WI},Symbol.toStringTag,{value:"Module"}));class gm{constructor(){U(this,"logs",[]);U(this,"maxLogs",1e3);U(this,"unsubscribe",null);U(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=fe.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));const{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,o=this.logs.filter(a=>a.timestamp>=n),r=new Map;for(const a of o){r.has(a.abilityId)||r.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const i=r.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp);}for(const a of r.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const o=Date.now()-n,r=this.logs.filter(i=>i.petId===t&&i.timestamp>=o),a=new Map;for(const i of r){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp);}for(const i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return {totalProcs:r.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,a)=>a.count-r.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let pn=null;function qI(){return pn||(pn=new gm,pn.init()),pn}function XI(){pn&&(pn.destroy(),pn=null);}const mm={StatsTracker:dm,getStatsTracker:jI,destroyStatsTracker:UI},hm={AbilityLogger:gm,getAbilityLogger:qI,destroyAbilityLogger:XI,...VI},KI=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:Jf,MGAntiAfk:mn,MGAriesAPI:ri,MGAutoFavorite:cc,MGBulkFavorite:Xa,MGCropSizeIndicator:Yo,MGCropValueIndicator:Ko,MGJournalChecker:qf,MGPetHungerNotifier:eo,MGPetTeam:pe,MGPets:hm,MGShopNotifier:Xt,MGTracker:mm,MGWeatherNotifier:vn,MGXPTracker:Ya},Symbol.toStringTag,{value:"Module"})),ut=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],YI={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Pn(e){return e?YI[e]??0:0}class JI extends wn{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});U(this,"allPlants",[]);U(this,"allPets",[]);U(this,"sectionElement",null);}async build(n){await JC();const o=n.getRootNode();Ie(o,Nf,"auto-favorite-settings-styles");const r=this.createGrid("12px");r.id="auto-favorite-settings",this.sectionElement=r,n.appendChild(r),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await te.waitForAny(3e3).catch(()=>{}),await Promise.all([te.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),te.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=te.get("plants")||{},o=te.get("pets")||{};this.allPlants=Object.keys(n).sort((r,a)=>{const i=n[r]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,l=Pn(i)-Pn(s);return l!==0?l:r.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(o).sort((r,a)=>{const i=o[r]?.rarity||null,s=o[a]?.rarity||null,l=Pn(i)-Pn(s);return l!==0?l:r.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(J.isReady())return;const n=1e4,o=100;let r=0;return new Promise(a=>{const i=()=>{J.isReady()||r>=n?a():(r+=o,setTimeout(i,o));};i();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=m("div",{className:"kv"}),o=gl({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),r=hn({checked:ct().get().enabled,onChange:async a=>{const i=ct(),s=i.get();await i.set({...s,enabled:a}),await this.saveConfig();}});return n.append(o.root,r.root),Be({title:"Auto-Favorite",padding:"lg"},n,m("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=m("div",{className:"u-col"}),o=m("div",{className:"mut-row"});o.appendChild(this.createMutationButton(ut[0])),o.appendChild(this.createMutationButton(ut[1])),n.appendChild(o);const r=m("div",{className:"mut-row"});r.appendChild(this.createMutationButton(ut[2])),r.appendChild(this.createMutationButton(ut[3])),r.appendChild(this.createMutationButton(ut[4])),n.appendChild(r);const a=m("div",{className:"mut-row"});a.appendChild(this.createMutationButton(ut[5])),a.appendChild(this.createMutationButton(ut[6])),n.appendChild(a);const i=m("div",{className:"mut-row"});return i.appendChild(this.createMutationButton(ut[7])),i.appendChild(this.createMutationButton(ut[8])),n.appendChild(i),Be({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${ct().get().favoriteMutations.length} / ${ut.length} active`))}createMutationButton(n){let o=ct().get().favoriteMutations.includes(n.id);const a=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];o&&a.push("active");const i=m("div",{className:a.join(" ")}),s=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(J.isReady()){const c=J.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});c.style.width="28px",c.style.height="28px",c.style.objectFit="contain",s.appendChild(c);}}catch{}const l=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=m("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},l);if(i.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const c=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(J.isReady()){const u=J.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",c.appendChild(u);}}catch{}i.append(c);}else {const c=m("div",{style:"width: 28px; flex-shrink: 0;"});i.append(c);}return i.addEventListener("click",async c=>{c.stopPropagation();const u=ct(),p=u.get();if(o){const g=p.favoriteMutations.filter(x=>x!==n.id);await u.set({...p,favoriteMutations:g}),o=false,i.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),o=true,i.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${ct().get().favoriteMutations.length} / ${ut.length} active`);}),i}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:ct().get().favoriteProduceList,onUpdate:async n=>{const o=ct(),r=o.get();await o.set({...r,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:ct().get().favoritePetsList,onUpdate:async n=>{const o=ct(),r=o.get();await o.set({...r,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:o,items:r,category:a,selected:i,onUpdate:s}=n;let l=new Set(i),d=r;const c=m("div",{style:"margin-bottom: 8px;"}),u=si({placeholder:`Search ${o.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:y=>{const S=y.trim().toLowerCase();S?d=r.filter(I=>I.toLowerCase().includes(S)):d=r,_.setData(x());}});c.appendChild(u.root);const p=m("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=rt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const y=x().map(S=>S.id);_.setSelection(y);}}),g=rt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{_.clearSelection();}});p.append(f,g);const x=()=>d.map(y=>({id:y,name:y,rarity:this.getItemRarity(y,a),selected:l.has(y)})),b=y=>{if(!y){const I=m("span",{style:"opacity:0.5;"});return I.textContent="—",I}return Er({variant:"rarity",rarity:y,size:"sm"}).root},h=y=>{const S=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(J.isReady()){let I=a,C=y;a==="plant"&&(["Bamboo","Cactus"].includes(y)&&(I="tallplant"),y==="DawnCelestial"&&(C="DawnCelestialCrop"),y==="MoonCelestial"&&(C="MoonCelestialCrop"),y==="OrangeTulip"&&(C="Tulip"));const A=J.toCanvas(I,C,{scale:.5});A.style.width="28px",A.style.height="28px",A.style.objectFit="contain",S.appendChild(A);}}catch{}return S},_=ii({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(y,S)=>y.name.localeCompare(S.name,void 0,{numeric:true,sensitivity:"base"}),render:y=>{const S=m("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),I=h(y.id),C=m("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},y.name);return S.append(I,C),S}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(y,S)=>Pn(y.rarity)-Pn(S.rarity),render:y=>b(y.rarity)}],data:x(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(l),getRowId:y=>y.id,onSelectionChange:y=>{l.clear(),y.forEach(S=>l.add(S)),s(Array.from(l)),w();}}),k=m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),w=()=>{k.textContent=`${l.size} / ${r.length} selected`;};return w(),Be({title:`${o} (${l.size}/${r.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},c,p,_.root,k)}getItemRarity(n,o){try{if(o==="pet")return (te.get("pets")||{})[n]?.rarity||null;if(o==="plant"){const r=te.get("plants")||{},a=r[n];if(a?.seed?.rarity)return a.seed.rarity;const i=n.toLowerCase();for(const s of Object.values(r))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=ct().get();try{const{updateSimpleConfig:o}=cc;await o({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(o){console.error("[AutoFavoriteSettings] Failed to update feature config:",o);}}}const QI=`
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
`,ZI=`
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
`;function e_(e){const{count:t,expanded:n=false,onClick:o}=e,r=m("div",{className:"see-more"}),a=m("span",{className:"see-more-link"},fs(t,n));o&&a.addEventListener("click",o),r.appendChild(a);const i=r;return i.setCount=s=>{a.textContent=fs(s,n);},i.setExpanded=s=>{a.textContent=fs(t,s);},i}function fs(e,t){return t?"− Show less":`+ and ${e} more...`}const t_=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",n_=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",o_={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function jd(e){return e?o_[e]??0:0}function Ud(e,t){try{if(t==="pets")return (te.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (te.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function r_({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:o,onToggleExpand:r}){const a=m("div",{className:"journal-content"}),i=m("div",{className:"journal-header"},"Garden Journal");if(a.appendChild(i),t!=="all"){const s=t==="plants"?e.plants:e.pets,l=m("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),c=m("span",{className:"percentage"},`Collected ${d}%`),u=m("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);l.appendChild(c),l.appendChild(u),a.appendChild(l);}return t==="all"?(a.appendChild(sa("Produce",e.plants,"plants",n.has("plants"),o,()=>r("plants"),true)),a.appendChild(sa("Pets",e.pets,"pets",n.has("pets"),o,()=>r("pets"),true))):t==="plants"?a.appendChild(sa("Produce",e.plants,"plants",n.has("plants"),o,()=>r("plants"))):a.appendChild(sa("Pets",e.pets,"pets",n.has("pets"),o,()=>r("pets"))),a}function sa(e,t,n,o,r,a,i=false){const s=m("div",{style:"display: flex; flex-direction: column;"}),l=m("div",{style:`
            max-height: ${o?"480px":"none"};
            overflow-y: ${o?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=m("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),c=m("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(J.isReady()){const b=n==="plants"?"plant":"pet",h=n==="plants"?"Carrot":"CommonEgg";if(J.has(b,h)){const v=J.toCanvas(b,h,{scale:.3});v.style.maxWidth="20px",v.style.maxHeight="20px",v.style.display="block",c.appendChild(v);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=m("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(c,f),s.appendChild(d),i){const b=m("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),h=Math.floor(t.variantsLogged/t.variantsTotal*100),v=m("span",{className:"percentage"},`Collected ${h}%`),_=m("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);b.appendChild(v),b.appendChild(_),s.appendChild(b);}const g=[...t.speciesDetails].sort((b,h)=>{const v=Ud(b.species,n),_=Ud(h.species,n),k=jd(v)-jd(_);return k!==0?k:b.species.localeCompare(h.species,void 0,{numeric:true,sensitivity:"base"})}),x=o?g:g.slice(0,5);for(const b of x)l.appendChild(a_(b,n,r));if(s.appendChild(l),t.speciesDetails.length>5){const b=e_({count:t.speciesDetails.length-5,expanded:o,onClick:()=>{a();}});s.appendChild(b);}else s.appendChild(m("div",{style:"height: 28px;"}));return s}function a_(e,t,n){const o=m("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),r=m("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",g=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(g="DawnCelestialCrop"),e.species==="MoonCelestial"&&(g="MoonCelestialCrop"),e.species==="OrangeTulip"&&(g="Tulip"));const x=e.isComplete?["Rainbow"]:[],b=(v,_)=>{try{if(J.has(v,_))return J.toCanvas(v,_,{scale:.4,mutations:x})}catch{}return null},h=b(f,g)||(t==="plants"?b("tallplant",g):null)||b(f,g.toLowerCase())||(t==="plants"?b("tallplant",g.toLowerCase()):null);h?(h.style.maxWidth="32px",h.style.maxHeight="32px",h.style.display="block",r.appendChild(h)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const a=m("div",{style:"flex: 1; position: relative; height: 22px;"}),i=m("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=t_(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const l=m("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});i.appendChild(l);const d=m("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);a.append(i,d);const c=n_(e.variantsPercentage),u=m("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${c};`},`${Math.round(e.variantsPercentage)}%`);return o.append(r,a,u),o}function i_({species:e,category:t,onBack:n}){const o=m("div",{className:"journal-content"}),r=m("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");o.appendChild(r);const a=m("div",{className:"journal-header"},e.species);o.appendChild(a);const i=m("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);o.appendChild(i);const s=m("div",{className:"journal-grid"}),l=[...e.variantsLogged,...e.variantsMissing].sort((d,c)=>d==="Normal"?-1:c==="Normal"||d==="Max Weight"?1:c==="Max Weight"?-1:d.localeCompare(c));for(const d of l){const c=e.variantsLogged.includes(d);s.appendChild(s_(e.species,d,t,c));}return o.appendChild(s),o}function s_(e,t,n,o){const r=m("div",{className:"journal-stamp-wrapper"}),a=m("div",{className:"journal-stamp",style:o?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",c=e;n==="plants"&&(e==="DawnCelestial"&&(c="DawnCelestialCrop"),e==="MoonCelestial"&&(c="MoonCelestialCrop"),e==="OrangeTulip"&&(c="Tulip"));const u=(f,g)=>{try{const x=t==="Max Weight"?.72:.6;if(J.has(f,g))return J.toCanvas(f,g,{mutations:s,scale:x,boundsMode:"padded"})}catch{}return null},p=u(d,c)||(n==="plants"?u("tallplant",c):null)||u(d,c.toLowerCase())||(n==="plants"?u("tallplant",c.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",a.appendChild(p));}catch{}const i=m("div",{className:"journal-stamp-label"},t);return r.append(a,i),r}const l_=`
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
`;function c_(e){const{label:t,tabId:n,tabIndex:o,active:r=false,onClick:a}=e,i=m("button",{className:`tab ${r?"active":""}`,"data-tab":n,"data-tab-index":String(o)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,o))})`;i.style.setProperty("--tab-color",s),a&&i.addEventListener("click",a);const l=i;return l.setActive=d=>{d?i.classList.add("active"):i.classList.remove("active");},l.setLabel=d=>{i.textContent=d;},l}const d_=`
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
`,u_={activeTab:"all",expandedCategories:[]};let fn=null;async function p_(){return fn||(fn=await no("tab-journal-checker",{version:1,defaults:u_}),fn)}function la(){if(!fn)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return fn}function ca(){return fn!==null}const f_=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class g_ extends wn{constructor(){super({id:"tab-journal-checker",label:"Journal"});U(this,"progress",null);U(this,"currentView",{type:"overview"});}async build(n){this.container=n,await p_(),await J.init(),console.log("[JournalChecker] Sprite categories:",J.getCategories());const o=n.getRootNode();Ie(o,QI,"journal-checker-styles"),Ie(o,l_,"journal-tab-styles"),Ie(o,d_,"journal-progress-bar-styles"),Ie(o,ZI,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const r=(a=>{this.progress=a.detail,this.refresh();});window.addEventListener("gemini:journal-updated",r),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",r);});}async updateProgress(){try{const{MGJournalChecker:n}=await ao(async()=>{const{MGJournalChecker:o}=await Promise.resolve().then(()=>KI);return {MGJournalChecker:o}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return ca()?la().get().activeTab:"all"}set activeTab(n){ca()&&la().update({activeTab:n});}get expandedCategories(){return ca()?new Set(la().get().expandedCategories):new Set}setExpandedCategories(n){ca()&&la().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(m("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(r_({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,o)=>{this.currentView={type:"species",species:n,category:o},this.refresh();},onToggleExpand:n=>{const o=this.expandedCategories;o.has(n)?o.delete(n):o.add(n),this.setExpandedCategories(o),this.refresh();}})):this.container.appendChild(i_({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=m("div",{className:"journal-tabs-container"});return f_.forEach((o,r)=>{const a=c_({label:o.label,tabId:o.id,tabIndex:r+1,active:this.activeTab===o.id,onClick:()=>{this.activeTab=o.id,this.refresh();}});n.appendChild(a);}),n}}function m_(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function h_(e,t){const n=e;let o=e;const r=hl({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:a=>{const i=a.trim();i&&i!==o&&(o=i,t?.(i));},onEnter:a=>{const i=a.trim()||n;i!==o&&(o=i,t?.(i));}});return r.root.className="team-list-item__name-input",r.input.addEventListener("blur",()=>{const a=r.getValue().trim()||n;a!==o&&(o=a,t?.(a));}),r.input.addEventListener("keydown",a=>{a.key==="Escape"&&(a.preventDefault(),r.input.blur());}),r.root}function bm(e){const t=m("div",{className:"team-list-item"}),n=e.customIndicator??m("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),o=e.isNameEditable?h_(e.team.name,e.onNameChange):m("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),r=m("div",{className:"team-list-item__sprites"});function a(){const l=fe.myPets.get();r.innerHTML="";for(let d=0;d<3;d++){const c=e.team.petIds[d],u=c&&c!=="",p=m("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=l.all.find(g=>g.id===c);if(!f){const g=window.__petDataCache;g&&g.has(c)&&(f=g.get(c));}if(f)try{const g=J.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),x=document.createElement("canvas");x.width=g.width,x.height=g.height;const b=x.getContext("2d");if(b&&b.drawImage(g,0,0),x.style.width="100%",x.style.height="100%",x.style.objectFit="contain",p.appendChild(x),e.showSlotStyles){const h=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(h),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const x=m("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(x);}else {const g=m("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${c} not found in myPets yet, waiting for update`);let x=false;const b=fe.myPets.subscribe(()=>{if(x)return;const v=fe.myPets.get().all.find(_=>_.id===c);if(v){x=true,b();try{p.innerHTML="";const _=J.toCanvas("pet",v.petSpecies,{mutations:v.mutations,scale:1}),k=document.createElement("canvas");k.width=_.width,k.height=_.height;const w=k.getContext("2d");if(w&&w.drawImage(_,0,0),k.style.width="100%",k.style.height="100%",k.style.objectFit="contain",p.appendChild(k),e.showSlotStyles){const y=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(y),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${c} sprite updated`);}catch(_){console.warn(`[TeamListItem] Failed to render sprite for pet ${v.petSpecies}:`,_),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=m_();p.appendChild(f);}r.appendChild(p);}}a();const i=fe.myPets.subscribe(()=>{a();});if(!e.hideDragHandle){const l=m("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(l);}if(t.appendChild(n),t.appendChild(o),t.appendChild(r),e.onExpandClick){const l=m("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});l.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',l.addEventListener("click",d=>{d.stopPropagation(),e.onExpandClick?.();}),t.appendChild(l);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),i());});return s.observe(document.body,{childList:true,subtree:true}),t}function b_(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function xm(e){const{segments:t,selected:n=t[0]?.id??"",size:o="md",fullWidth:r=false,disabled:a=false,onChange:i}=e,s=m("div",{className:"sg-root"});o!=="md"&&s.classList.add(`sg--${o}`),r&&(s.style.width="100%");const l=m("div",{className:"sg-container",role:"tablist"}),d=m("div",{className:"sg-indicator"}),c=t.map(y=>{const S=m("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:y.label});if(S.id=y.id,y.icon){const C=m("span",{className:"sg-icon"}),A=b_(y.icon);A&&C.appendChild(A),S.appendChild(C);}const I=m("span",{className:"sg-label"},y.label);return S.appendChild(I),S.disabled=!!y.disabled,S});l.appendChild(d),c.forEach(y=>l.appendChild(y)),s.appendChild(l);let u=n,p=a;function f(){const y=c.find(S=>S.id===u);y&&requestAnimationFrame(()=>{const S=d,I=y.offsetLeft,C=y.offsetWidth;S.style.width=`${C}px`,S.style.transform=`translateX(${I}px)`;});}function g(){c.forEach(y=>{const S=y.id===u;y.classList.toggle("active",S),y.setAttribute("aria-selected",String(S)),y.disabled=p||!!t.find(I=>I.id===y.id)?.disabled;}),f();}function x(y){const S=y.currentTarget;if(S.disabled)return;h(S.id);}function b(y){if(p)return;const S=c.findIndex(C=>C.id===u);let I=S;if(y.key==="ArrowLeft"||y.key==="ArrowUp"?(y.preventDefault(),I=(S-1+c.length)%c.length):y.key==="ArrowRight"||y.key==="ArrowDown"?(y.preventDefault(),I=(S+1)%c.length):y.key==="Home"?(y.preventDefault(),I=0):y.key==="End"&&(y.preventDefault(),I=c.length-1),I!==S){const C=c[I];C&&!C.disabled&&(h(C.id),C.focus());}}c.forEach(y=>{y.addEventListener("click",x),y.addEventListener("keydown",b);});function h(y){!t.some(I=>I.id===y)||u===y||(u=y,g(),i?.(u));}function v(){return u}function _(y){p=!!y,g();}function k(){c.forEach(y=>{y.removeEventListener("click",x),y.removeEventListener("keydown",b);});}g(),queueMicrotask(()=>{const y=c.find(S=>S.id===u);if(y){const S=d;S.style.width=`${y.offsetWidth}px`,S.style.transform=`translateX(${y.offsetLeft}px)`;}});const w=s;return w.select=h,w.getSelected=v,w.setDisabled=_,w.destroy=k,w}function x_(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:a,labelSide:i="right",onChange:s}=e,l=m("div",{className:"lg-checkbox-wrap"}),d=m("input",{className:`lg-checkbox lg-checkbox--${r}`,id:t,type:"checkbox",checked:!!n,disabled:!!o});let c=null;a&&i!=="none"&&(c=m("label",{className:"lg-checkbox-label",htmlFor:t},a)),c&&i==="left"?l.append(c,d):c&&i==="right"?l.append(d,c):l.append(d);let u=!!n,p=!!o;function f(){d.checked=u,d.disabled=p;}function g(S=false){p||(u=!u,f(),S||s?.(u));}function x(){p||g();}function b(S){p||(S.key===" "||S.key==="Enter")&&(S.preventDefault(),g());}d.addEventListener("click",x),d.addEventListener("keydown",b);function h(){return u}function v(S,I=false){u=!!S,f(),I||s?.(u);}function _(S){p=!!S,f();}function k(S){if(!S){c&&(c.remove(),c=null);return}c?c.textContent=S:(c=m("label",{className:"lg-checkbox-label",htmlFor:t},S),l.append(c));}function w(){d.focus();}function y(){d.removeEventListener("click",x),d.removeEventListener("keydown",b);}return f(),{root:l,input:d,isChecked:h,setChecked:v,setDisabled:_,setLabel:k,focus:w,destroy:y}}let So=0,Wd="",Vd="";function y_(){return So===0&&(Wd=document.body.style.overflow,Vd=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),So++,()=>{So=Math.max(0,So-1),So===0&&(document.body.style.overflow=Wd,document.body.style.touchAction=Vd);}}class v_{constructor(t){U(this,"dragState",null);U(this,"longPressState",null);U(this,"options");U(this,"onPointerMove");U(this,"onPointerUp");U(this,"onPointerCancel");U(this,"onLongPressPointerMove");U(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,o){if(this.cleanupLongPress(),pe.getAllTeams().findIndex(d=>d.id===o)===-1)return;const i=t.clientX,s=t.clientY,l=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,o);},500);this.longPressState={pointerId:t.pointerId,startX:i,startY:s,timeout:l,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,o){const r=this.options.getListContainer();if(this.dragState||!r)return;t.preventDefault();const i=pe.getAllTeams().findIndex(p=>p.id===o);if(i===-1)return;const s=n.getBoundingClientRect(),l=r.getBoundingClientRect(),d=n.cloneNode(true);d.classList.add("team-list-item--placeholder"),d.classList.remove("team-list-item--dragging");const c=n.style.touchAction;n.style.touchAction="none";const u=y_();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:d,offsetY:t.clientY-s.top,fromIndex:i,teamId:o,captureTarget:n,touchActionPrev:c,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-l.left}px`,n.style.top=`${s.top-l.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",r.style.position||(r.style.position="relative"),r.insertBefore(d,n.nextSibling),r.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),o=Math.abs(t.clientY-this.longPressState.startY),r=10;(n>r||o>r)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const o=n.getBoundingClientRect();let r=t.clientY-o.top-this.dragState.offsetY;const a=o.height-this.dragState.itemEl.offsetHeight;Number.isFinite(a)&&(r=Math.max(-8,Math.min(a+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:o,itemEl:r}=this.dragState,a=Array.from(n.children).filter(l=>l!==r&&l!==o&&l instanceof HTMLElement&&l.classList.contains("team-list-item")),i=new Map;a.forEach(l=>{i.set(l,l.getBoundingClientRect().top);});let s=false;for(const l of a){const d=l.getBoundingClientRect(),c=d.top+d.height/2;if(t<c){o.nextSibling!==l&&n.insertBefore(o,l),s=true;break}}s||n.appendChild(o),a.forEach(l=>{const d=i.get(l),c=l.getBoundingClientRect().top;if(d!==void 0&&d!==c){const u=d-c;l.style.transform=`translateY(${u}px)`,l.style.transition="none",l.offsetHeight,l.style.transition="transform 0.14s ease",l.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:o=false}=t,{itemEl:r,placeholder:a,fromIndex:i,touchActionPrev:s,releaseScrollLock:l,pointerId:d}=this.dragState;if(n.classList.remove("is-reordering"),r.hasPointerCapture(d))try{r.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),o){const p=Array.from(n.children).filter(f=>f!==r&&f!==a&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?n.insertBefore(a,p):n.appendChild(a);}else {const u=Array.from(n.children).filter(f=>f!==r),p=u.indexOf(a);if(p!==-1){const f=u[p];f!==a&&n.insertBefore(a,f);}}if(a.replaceWith(r),a.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),l?.(),!o){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==i){const g=pe.getAllTeams().slice(),[x]=g.splice(i,1);g.splice(p,0,x);const b=g.map(h=>h.id);pe.reorderTeams(b),this.options.onReorder(b);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class w_{constructor(t={}){U(this,"card",null);U(this,"modeControl",null);U(this,"modeContainer",null);U(this,"teamContent",null);U(this,"listContainer",null);U(this,"teamMode","overview");U(this,"selectedTeamIds",new Set);U(this,"teamCheckboxes",new Map);U(this,"options");U(this,"dragHandler");this.options=t,this.dragHandler=new v_({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!pe.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=m("div",{className:"team-card-wrapper"});this.modeContainer=m("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=m("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Be({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=xm({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=m("div",{className:"team-card__disabled-state"}),n=m("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),o=rt({label:"Enable Feature",onClick:()=>{pe.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(o),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(o=>o.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=pe.getAllTeams(),n=pe.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=m("div",{className:"team-card__list-container"}),t.forEach(o=>{const r=n===o.id;let a;this.teamMode==="manage"&&(a=this.createCheckboxIndicator(o.id));const i=bm({team:o,isActive:r,customIndicator:a?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(o.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(o.id,s);}:void 0});this.teamMode==="manage"&&i.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(i.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){i.classList.add("team-list-item--clicked"),setTimeout(()=>{i.classList.remove("team-list-item--clicked");},300);try{await pe.activateTeam(o),this.options.onTeamsUpdated?.();}catch(d){console.error("[TeamCard] Failed to activate team:",d);}}}),i.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,i,o.id):this.dragHandler.startLongPress(s,i,o.id);})),this.listContainer.appendChild(i);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=m("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=m("div",{className:"team-card__actions"}),o=rt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(o),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=m("div",{className:"team-card__actions"}),n=rt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),o=rt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});o.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(o),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,o=1;const r=pe.getAllTeams(),a=new Set(r.map(i=>i.name));for(;a.has(n);)n=`${t} (${o})`,o++;try{pe.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)pe.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleRenameTeam(t,n){pe.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const o=pe.getTeam(t);if(!o)return;const r=o.petIds[n];!r||r===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const o=pe.getTeam(t);if(!o)return;const r=[...o.petIds];r[n]="",pe.updateTeam(t,{petIds:r}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const o=pe.getTeam(t);if(!o)return;const a=fe.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),i=new Set(o.petIds.filter(f=>f!=="")),s=a.filter(f=>!i.has(f.id));await ye.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const l=Ye.detect();(l.platform==="mobile"||l.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const c=fe.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,x=[...o.petIds];x[n]=g.id,pe.updateTeam(t,{petIds:x}),this.options.onTeamsUpdated?.(),ye.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),Dn.close().then(()=>{const b=Ye.detect();(b.platform==="mobile"||b.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await Dn.show("inventory",{items:s,favoritedItemIds:[]}),await Dn.waitForClose();const u=Ye.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),c();}createCheckboxIndicator(t){const n=x_({checked:this.selectedTeamIds.has(t),size:"md",onChange:o=>{o?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class S_{constructor(t,n={}){U(this,"root");U(this,"pet");U(this,"options");U(this,"contentSlot",null);U(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const o=document.createElement("div");o.className="base-pet-card__info";const r=document.createElement("div");if(r.className="base-pet-card__name",r.textContent=this.pet.name||this.pet.petSpecies,o.appendChild(r),!this.options.hideStr){const a=document.createElement("div");a.className="base-pet-card__str",this.renderStr(a),o.appendChild(a);}return t.appendChild(o),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const o=this.root.querySelector(".base-pet-card__str");o&&this.renderStr(o);const r=this.root.querySelector(".base-pet-card__sprite-wrapper");r instanceof HTMLElement&&this.renderSprite(r);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const o=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const r=Er({label:o,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(r.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(J.has("pet",this.pet.petSpecies)){const o=J.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});o.style.width="64px",o.style.height="64px",o.style.objectFit="contain",t.appendChild(o);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}const Pe={XP:{BOOST_PAIR:.85,LEVELING_PAIR:.75,PASSIVE_LEVELING:.5,STR_DISTANCE_THRESHOLD:.15},ECONOMY:{DEDICATED_COIN:.9,META_SELLING:.85,PASSIVE_EFFICIENCY:.65,ENDGAME_HARVEST:.95,SYNERGY_BONUS:.1,EARLY_REGROW:.7},HATCHING:{TIER_3_MAX_STR:.95,RAINBOW_HUNTING:.7,COMBO_BONUS:.05},TIER_BONUS:.05,CONFIDENCE_THRESHOLD:.6},ee={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]},Di={ALLOWED_PANELS:{"xp-farming":["xp"],"coin-farming":["coin","xp","hatch"],"crop-farming":["growth","coin","xp","hatch"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],hatching:["hatch","xp"],efficiency:["xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}};function je(e,t){return e.abilities.some(n=>t.includes(n))}function Oe(e,t){return e.filter(n=>je(n,t)).length}function C_(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function Co(e,t){const n=e.flatMap(o=>o.abilities.filter(r=>t.includes(r))).map(C_);return n.length===0?0:n.reduce((o,r)=>o+r,0)/n.length}function da(e){const t=ag(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],o={},r=Oe(t,ee.XP_BOOST),a=Pe.XP.STR_DISTANCE_THRESHOLD,s=t.filter(E=>E.maxStrength===0?false:(E.maxStrength-E.currentStrength)/E.maxStrength>a).length,l=t.filter(E=>E.currentStrength<E.maxStrength).length;if(r>=1&&s>=2)o["xp-farming"]=Pe.XP.BOOST_PAIR,n.push(`1 XP Boost + ${s} high-need pets (>${a*100}% STR distance)`);else if(r>=2){const E=Co(t,ee.XP_BOOST);o["xp-farming"]=Pe.XP.LEVELING_PAIR+E*Pe.TIER_BONUS,n.push(`${r} XP Boost pets (avg tier ${E.toFixed(1)})`);}else l>=2&&s>=1?(o["xp-farming"]=Pe.XP.LEVELING_PAIR,n.push(`${l} leveling pets with ${s} high-need`)):l>=2&&(o["xp-farming"]=Pe.XP.PASSIVE_LEVELING,n.push(`${l} pets below max STR`));const d=Oe(t,ee.COIN_FINDER),c=Oe(t,ee.SELL_BOOST),u=Oe(t,ee.CROP_REFUND_HARVEST),p=Oe(t,ee.RARE_GRANTERS),f=Oe(t,ee.COMMON_GRANTERS),g=t.some(E=>je(E,ee.COIN_FINDER)&&(je(E,ee.RARE_GRANTERS)||je(E,ee.COMMON_GRANTERS)));d>=1&&!g?(o["coin-farming"]=Pe.ECONOMY.DEDICATED_COIN,n.push("Dedicated Coin Finder team (no granters)")):c>=1&&u>=1?(o["coin-farming"]=Pe.ECONOMY.META_SELLING,n.push("Meta Selling Team (Sell Boost + Crop Refund/Harvest)")):d>=1&&g?(o["coin-farming"]=Pe.ECONOMY.PASSIVE_EFFICIENCY,o.efficiency=Math.max(o.efficiency||0,Pe.ECONOMY.PASSIVE_EFFICIENCY),n.push("Coin Finder + Granter (passive efficiency)")):(c>=1||u>=1)&&(o["coin-farming"]=Math.max(o["coin-farming"]||0,.7),n.push("Sell/Refund abilities (coin efficiency)"));const x=Oe(t,ee.PLANT_GROWTH),b=Oe(t,ee.CROP_MUTATION),h=Oe(t,ee.CROP_SIZE),v=t.filter(E=>E.abilities.includes("DoubleHarvest")).length,_=t.filter(E=>E.abilities.includes("ProduceRefund")).length,k=t.some(E=>E.abilities.includes("DoubleHarvest")&&E.abilities.includes("ProduceRefund"));if(v>=3){let E=Pe.ECONOMY.ENDGAME_HARVEST;k&&(E+=Pe.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,E),n.push("Endgame Harvest Team (3x Double Harvest)"+(k?" + capybara synergy":""));}else if(v>=1&&_>=1){let E=.85;k&&(E+=Pe.ECONOMY.SYNERGY_BONUS),o["crop-farming"]=Math.max(o["crop-farming"]||0,E),n.push("Double Harvest + Crop Refund"+(k?" (same pet - capybara)":""));}else b>=1&&v===0&&(o["crop-farming"]=Math.max(o["crop-farming"]||0,Pe.ECONOMY.EARLY_REGROW),n.push("Early Game Regrow Team (Crop Mutation)"));if(p>=1){const E=t.some(T=>T.abilities.includes("RainbowGranter")),P=t.some(T=>T.abilities.includes("GoldGranter"));E?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):P?(o["crop-farming"]=Math.max(o["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(o["crop-farming"]=Math.max(o["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const w=x+b+h+f;if(w>=2&&!o["crop-farming"]){const E=(Co(t,ee.PLANT_GROWTH)+Co(t,ee.CROP_MUTATION)+Co(t,ee.CROP_SIZE))/3;o["crop-farming"]=Math.max(o["crop-farming"]||0,.7+E*.03),n.push(`${w} crop-related abilities`);}const y=Oe(t,ee.EGG_GROWTH);if(y>=1&&(o["time-reduction"]=.7,n.push(`${y} Egg Growth Boost pet(s)`)),x>=1&&!o["crop-farming"]&&(o["time-reduction"]=Math.max(o["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),p>=1||b>=1){const E=t.some(T=>T.abilities.includes("RainbowGranter")),P=t.some(T=>T.abilities.includes("GoldGranter"));E||P?(o["mutation-hunting"]=.95,n.push(`${E?"Rainbow":"Gold"} Granter (mutation focus)`)):b>=1&&(o["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const S=Oe(t,ee.HUNGER_BOOST),I=Oe(t,ee.HUNGER_RESTORE);S>=1&&I>=1?(o.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(S>=1||I>=1)&&(o.efficiency=.6,n.push("Hunger management (reduced feeding)"));const C=d+p+f;C>=2&&(o.efficiency=Math.max(o.efficiency||0,.6),n.push(`${C} passive abilities (passive gains)`));const A=Oe(t,ee.MAX_STR_BOOST),R=Oe(t,ee.HATCH_XP),$=Oe(t,ee.PET_MUTATION),Y=Oe(t,ee.DOUBLE_HATCH),B=Oe(t,ee.PET_REFUND);if(A>=1){const E=Co(t,ee.MAX_STR_BOOST),P=E>=3?Pe.HATCHING.TIER_3_MAX_STR:.85;o.hatching=P+E*Pe.TIER_BONUS,n.push(`Max Strength Boost (tier ${E.toFixed(1)}) - late-game meta`);}if($>=1||Y>=1||B>=1){const E=$+Y+B,P=Pe.HATCHING.RAINBOW_HUNTING+E*Pe.HATCHING.COMBO_BONUS;o.hatching=Math.max(o.hatching||0,P),n.push(`${E} rainbow hunting abilities`);}R>=1&&!o.hatching&&(o.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const j=t.filter(E=>je(E,ee.MAX_STR_BOOST)||je(E,ee.PET_MUTATION)||je(E,ee.DOUBLE_HATCH)||je(E,ee.PET_REFUND)).length;j>=Math.ceil(t.length*.67)&&o.hatching&&(o.hatching=Math.max(o.hatching,.97),o["crop-farming"]&&o["crop-farming"]<.97&&t.filter(P=>(je(P,ee.CROP_REFUND_HARVEST)||je(P,ee.CROP_SIZE)||je(P,ee.CROP_MUTATION))&&!je(P,ee.PET_REFUND)&&!je(P,ee.DOUBLE_HATCH)&&!je(P,ee.PET_MUTATION)&&!je(P,ee.MAX_STR_BOOST)).length===0&&(delete o["crop-farming"],n.push("Suppressed crop-farming (hatching majority override)")),n.push(`Hatching Majority (${j}/${t.length} pets) - clear team purpose`));const N=Object.entries(o).sort(([,E],[,P])=>P-E);if(N.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp","growth","coin","hatch"],reasons:["Mixed or unclear purpose"]};const[O,z]=N[0],D=N.slice(1).map(([E,P])=>({purpose:E,confidence:P}));return z<Pe.CONFIDENCE_THRESHOLD?{primary:"balanced",confidence:z,secondary:N.map(([E,P])=>({purpose:E,confidence:P})),suggestedFeatures:["xp","growth","coin","hatch"],reasons:[...n,`Low confidence (${(z*100).toFixed(0)}%) - showing all panels`]}:{primary:O,confidence:z,secondary:D,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","growth","xp"],"crop-farming":["growth","coin","xp"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],efficiency:["xp"],hatching:["hatch","growth","xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}[O]||["xp","growth","coin","hatch"],reasons:n}}async function k_(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,o=t.createOscillator(),r=t.createGain();o.connect(r),r.connect(t.destination),o.type="sine",o.frequency.setValueAtTime(800,n),o.frequency.exponentialRampToValueAtTime(400,n+.03),r.gain.setValueAtTime(.12,n),r.gain.exponentialRampToValueAtTime(.001,n+.05),o.start(n),o.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function I_(e={}){const{id:t,variant:n="default",size:o="md",round:r=false,sprite:a=null,onClick:i,disabled:s=false,playSound:l=true,tooltip:d}=e,c=m("button",{className:"gemini-icon-btn",id:t});c.type="button",n!=="default"&&c.classList.add(`gemini-icon-btn--${n}`),o!=="md"&&c.classList.add(`gemini-icon-btn--${o}`),r&&c.classList.add("gemini-icon-btn--round"),d&&(c.title=d),c.disabled=s;const u=m("span",{className:"gemini-icon-btn__content"});c.appendChild(u),a&&u.appendChild(a);const p=m("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",c.appendChild(p),c.addEventListener("click",async g=>{c.disabled||(l&&k_(),i?.(g));});const f=c;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{c.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&c.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{c.disabled=g;},f}const ym=`
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
`;class __{constructor(){U(this,"card",null);U(this,"listContainer",null);U(this,"innerContent",null);U(this,"logs",[]);U(this,"filteredLogs",[]);U(this,"unsubscribe",null);U(this,"ITEM_HEIGHT",88);U(this,"BUFFER_SIZE",3);U(this,"VIEWPORT_HEIGHT",480);U(this,"renderedRange",{start:0,end:0});U(this,"scrollListener",null);U(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=In(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const o=t.get().abilityLogs;this.updateFromAbilityLogs(o);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const a=te.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",i={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=Lp(i),l=new Date(n.performedAt),d=l.toLocaleDateString("en-US",{month:"short",day:"numeric"}),c=l.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),u=`${d} ${c}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:a,abilityId:n.abilityId,description:s,formattedDate:u}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return Er({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=m("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=m("div",{style:"margin-bottom: 0;"}),o=si({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:r=>{const a=r.trim().toLowerCase();a?this.filteredLogs=this.logs.filter(i=>i.petName.toLowerCase().includes(a)||i.petSpecies.toLowerCase().includes(a)||i.abilityName.toLowerCase().includes(a)||i.description.toLowerCase().includes(a)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(o.root),t.appendChild(n),this.listContainer=m("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=m("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=Be({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,o)=>o.timestamp-n.timestamp);if(t.length===0){const n=m("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let o=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),r=Math.min(this.filteredLogs.length,o+n+this.BUFFER_SIZE*2);if(o===this.renderedRange.start&&r===this.renderedRange.end)return;this.renderedRange={start:o,end:r},this.innerContent.replaceChildren();const a=o*this.ITEM_HEIGHT;if(a>0){const s=m("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=o;s<r;s++){const l=this.filteredLogs[s],d=this.createLogItemCard(l);this.innerContent.appendChild(d);}const i=Math.max(0,(this.filteredLogs.length-r)*this.ITEM_HEIGHT);if(i>0){const s=m("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}createLogItemCard(t){const n=m("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const o=m("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const c=J.toCanvas("pet",t.petSpecies);c&&(c.style.width="100%",c.style.height="100%",c.style.objectFit="contain",o.appendChild(c));}catch{o.textContent="🐾",o.style.fontSize="24px";}n.appendChild(o);const r=m("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),a=m("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),i=m("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=m("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);a.appendChild(i),a.appendChild(s),r.appendChild(a);const l=this.createAbilityBadge(t.abilityId,t.abilityName);r.appendChild(l);const d=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return r.appendChild(d),n.appendChild(r),n}}const vm=`
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

`,wm=`
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
`,Lc=`
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
`,Sm=`
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
`,T_=`
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
`;class E_ extends wn{constructor(n){super({id:"tab-pets",label:"Pets"});U(this,"unsubscribeMyPets");U(this,"lastActiveTeamId",null);U(this,"teamCardPart",null);U(this,"abilityLogsCardPart",null);U(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await ao(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>ac);return {MGSprite:i}},void 0);await o.init();const r=n.getRootNode();Ie(r,vm,"team-card-styles"),Ie(r,wm,"base-pet-card-styles"),Ie(r,Lc,"badge-styles"),Ie(r,Sm,"arcade-button-styles"),Ie(r,ym,"gemini-icon-button-styles"),Ie(r,T_,"ability-logs-card-styles");const a=this.createGrid("12px");a.id="pets",n.appendChild(a),this.initializeTeamCardPart(a),this.initializeAbilityLogsCardPart(a),this.unsubscribeMyPets=fe.myPets.subscribeStable(()=>{const i=pe.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=pe.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new w_({onTeamReordered:r=>{console.log("[PetsSection] Teams reordered:",r);},setHUDOpen:this.deps?.setHUDOpen}));const o=this.teamCardPart.build();n.appendChild(o),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new __);const o=this.abilityLogsCardPart.build();n.appendChild(o),this.abilityLogsCardPart.render();}}class A_{constructor(t){U(this,"root");U(this,"options");U(this,"headerElement",null);U(this,"petsContainer",null);U(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${t.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `);}updatePets(t){if(this.petsContainer){this.petsContainer.innerHTML="";for(const n of t){const o=this.buildPetCard(n);this.petsContainer.appendChild(o);}}}buildPetCard(t){const n=document.createElement("div");n.className="xp-pet-card",t.isStarving&&n.classList.add("xp-pet-card--starving"),t.isMaxStrength&&n.classList.add("xp-pet-card--max");const o=document.createElement("div");o.className="xp-pet-card__sprite";const r=document.createElement("div");r.className="xp-pet-card__sprite-wrapper";try{const c=t.mutations;if(J.has("pet",t.species)){const u=J.toCanvas("pet",t.species,{mutations:c,scale:1,boundsMode:"padded"});u.style.width="64px",u.style.height="64px",u.style.objectFit="contain",u.style.display="block",r.appendChild(u);}else r.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}catch(c){console.warn(`[TeamXpPanel] Failed to render sprite for ${t.species}:`,c),r.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}o.appendChild(r);const a=document.createElement("div");if(a.className="xp-pet-card__badges",t.isMaxStrength&&(a.innerHTML+='<span class="xp-badge xp-badge--max">MAX</span>'),t.isStarving&&(a.innerHTML+='<span class="xp-badge xp-badge--starving">STARVING</span>'),t.xpBoostStats){const c=t.xpBoostStats.tier==="Snowy"?"❄":"⚡";a.innerHTML+=`<span class="xp-badge xp-badge--boost">${c}${t.xpBoostStats.tier}</span>`;}o.appendChild(a);const i=document.createElement("div");i.className="xp-pet-card__str-display",i.innerHTML=`
            <span class="xp-str__label">STR</span>
            <span class="xp-str__current">${t.currentStrength}</span>
            <span class="xp-str__separator">/</span>
            <span class="xp-str__max">${t.maxStrength}</span>
        `,o.appendChild(i),n.appendChild(o);const s=document.createElement("div");s.className="xp-pet-card__stats";const l=document.createElement("div");l.className="xp-pet-card__name",l.textContent=t.name||t.species,s.appendChild(l);const d=document.createElement("table");return d.className="xp-stats-table",t.isStarving?d.innerHTML=`
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
            `,s.appendChild(d),n.appendChild(s),n}buildProgressWithStats(t,n){const o=n==="next"?t.hoursToNextStrength:t.hoursToMaxStrength,r=n==="next"?t.feedsToNextStrength:t.feedsToMaxStrength,a=t.currentStrength-Math.floor(t.currentStrength),i=Math.floor(n==="next"?a*100:t.currentStrength/t.maxStrength*100),s=n==="next"?Math.min(99,Math.max(1,i)):Math.min(100,Math.max(0,i)),l=s<33?"low":s<67?"medium":"high";return `
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
        `}updateFooter(t,n){if(!this.footerElement)return;if(t.activeBoosterCount===0){this.footerElement.innerHTML="",this.footerElement.classList.add("xp-panel__footer--hidden");return}this.footerElement.classList.remove("xp-panel__footer--hidden");const r=n.filter(a=>a.xpBoostStats?.isActive).map(a=>a.name||a.species).join(", ");this.footerElement.innerHTML=`
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
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),o=Math.floor(t%24);return `${n}d ${o}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const P_={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=Od(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new A_({teamId:e.id});t.appendChild(n.build());const o=bo(e.id);return o&&n.update(o),{update:(r,a)=>{const i=bo(r.id);i&&n.update(i);},destroy:()=>n.destroy(),refresh:()=>{const r=bo(e.id);r&&n.update(r);}}},renderPetSlot:(e,t,n)=>{const o=fe.weather.get(),r=o.isActive?o.type:null,a=bo(t.id),i=a?.teamSummary.bonusXpPerHour||0,s=a?.pets||[],l=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),d=Qs(e,r,i,l),c=d.isMaxStrength,u=!!d.xpBoostStats;let p="";if(c)u&&d.xpBoostStats&&(p=`
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
                `);const g=d.maxStrength,x=d.currentStrength,b=Math.min(100,Math.max(0,Math.floor(x/g*100))),h=e.xp%3600/3600*100,v=Math.min(99,Math.max(1,Math.floor(h))),_=d.currentStrength+1,k=d.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${$d(d.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${_}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${v}%"></div>
                        <span class="stat__percent">${v}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${$d(d.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${k}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${b}%"></div>
                        <span class="stat__percent">${b}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},renderGroupedSlot:(e,t,n)=>{const o=fe.weather.get(),r=o.isActive?o.type:null,i=bo(t.id)?.teamSummary.bonusXpPerHour||0;let s=0,l=0;for(const c of e){const u=Qs(c,r,i,0);u.xpBoostStats&&(s+=u.xpBoostStats.expectedXpPerHour),u.supportingFeeds&&(l+=u.supportingFeeds);}let d="";if(s>0&&(d=`
                <div class="stat-row stat-row--boost">
                    <span class="stat__label">TEAM BOOST</span>
                    <span class="stat__value stat__value--accent">+${s.toLocaleString()} XP/h</span>
                </div>
            `,l>0&&(d+=`
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
                `;else {const u=Od(t.id);n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(u)}%</span>
                        </div>
                    </div>
                `;}return}n.innerHTML=`<div class="xp-stats-compact xp-stats-grouped">${d}</div>`;},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.some(a=>a.currentStrength<a.maxStrength)?true:n.some(a=>a.abilities.some(i=>ee.XP_BOOST.includes(i)))},shouldDisplay:(e,t,n)=>(Di.ALLOWED_PANELS[n.primary]||[]).includes("xp")?!!(t.some(i=>i.currentStrength<i.maxStrength)||t.some(i=>i.abilities.some(s=>ee.XP_BOOST.includes(s)))):false,countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.every(r=>r.currentStrength>=r.maxStrength)?n.some(a=>a.abilities.some(i=>ee.XP_BOOST.includes(i)))?1:0:2}};function Me(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function Dt(e){if(e<=0)return "0m";const t=Math.floor(e/1e3),n=Math.floor(t/86400),o=Math.floor(t%86400/3600),r=Math.floor(t%3600/60),a=[];return n>0&&a.push(`${n}d`),o>0&&a.push(`${o}h`),(r>0||a.length===0)&&a.push(`${r}m`),a.join(" ")}function Bt(e,t){const n=e==="egg"?"pet":"plant",o=Me("span","sprite-wrapper");if(!t)return o;let r=t;e==="plant"&&(r==="DawnCelestial"&&(r="DawnCelestialCrop"),r==="MoonCelestial"&&(r="MoonCelestialCrop"));try{if(J.isReady()&&J.has(n,r)){const a=J.toCanvas(n,r,{scale:.3});a.style.height="16px",a.style.width="auto",a.style.imageRendering="pixelated",o.appendChild(a);}}catch{}return o}function ua(e,t){const n=Me("span","stacked-sprites");if(t.length===0)return n;const o=e==="egg"?"pet":"plant",r=4,i=[...new Set(t.map(l=>e==="egg"?l.eggId:l.species).filter(Boolean))].slice(0,r);if(i.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let l=0;l<i.length;l++){let d=i[l];e==="plant"&&d&&(d==="DawnCelestial"&&(d="DawnCelestialCrop"),d==="MoonCelestial"&&(d="MoonCelestialCrop"));try{if(J.isReady()&&d&&J.has(o,d)){const c=J.toCanvas(o,d,{scale:.2});c.style.height="14px",c.style.width="auto",c.style.imageRendering="pixelated",c.style.position="relative",c.style.zIndex=String(r-l),n.appendChild(c),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function zt(e,t,n,o,r,a){const i=Me("div","stat-row"),s=Me("span","stat__label",e),l=Me("span","stat__timer",t),d=Me("span","stat__str-label");d.appendChild(n);const c=Me("div","stat__progress-mini"),u=Me("div",`stat__progress-fill ${r}`);u.style.width=`${o}%`,c.appendChild(u);const p=`${o}%`,f=Me("span","stat__percent",p);return c.appendChild(f),i.appendChild(s),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&i.appendChild(d),i.appendChild(l),i.appendChild(c),i}function qd(e){const t=Me("div","stat-row stat-row--boost"),n=Me("span","stat__label","BOOST");t.appendChild(n);const o=Me("span","stat__values-row");return e.forEach((r,a)=>{const i=Me("span","stat__boost-item");i.appendChild(r.sprite),i.appendChild(Me("span","stat__value stat__value--accent",r.text)),o.appendChild(i),a<e.length-1&&o.appendChild(Me("span","stat__separator"," "));}),t.appendChild(o),t}function Xd(e,t){const n=t==="egg"?dr:ur;let o=0,r=false;const a=[];for(const i of e.abilities)if(i in n){const s=n[i],l=s.procRate*60;o+=l*s.minutesPerProc,r=true,a.push(i);}return {hasBoost:r,minutesPerProc:0,hourlyReduction:o,abilityName:a.join(", ")}}function Kd(e,t){const n=pe.getPetsForTeam(e),o=t==="egg"?vc(n):wc(n);return `${((60+pr(o).timeReductionPerHour)/60).toFixed(2)}x`}function pa(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const a=t-r.plantedAt,s=(r.maturedAt-t)/n,l=a+s,d=l>0?a/l*100:0;return o+Math.min(100,Math.max(0,d))},0)/e.length)}function fa(e,t,n=1){return e.length===0?0:Math.round(e.reduce((o,r)=>{const a=t-r.startTime,s=(r.endTime-t)/n,l=a+s,d=l>0?a/l*100:0;return o+Math.min(100,Math.max(0,d))},0)/e.length)}function Yd(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,a)=>r.maturedAt-a.maturedAt)[0];return {remainingMs:Math.max(0,o.maturedAt-t),name:o.eggId||null}}function Jd(e,t){if(e.length===0)return {remainingMs:0,name:null};const o=[...e].sort((r,a)=>r.endTime-a.endTime)[0];return {remainingMs:Math.max(0,o.endTime-t),name:o.species||null}}function Qd(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.maturedAt));return Math.max(0,n-t)}function Zd(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(o=>o.endTime));return Math.max(0,n-t)}function Gt(e,t){return e<=0||t<=0?0:Math.round(e/t)}const M_={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=fe.myGarden.get(),o=n.eggs.growing.length+n.plants.growing.length;return o===0?null:{text:`${o} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,o)=>{const r=fe.myGarden.get(),a=Date.now(),i=Xd(e,"egg"),s=Xd(e,"plant");if(n.innerHTML="",!i.hasBoost&&!s.hasBoost)return;const l=r.eggs.growing,d=r.crops.growing;let c=o;!c&&i.hasBoost!==s.hasBoost&&(c=i.hasBoost?"egg":"plant");const u=c==="egg"&&i.hasBoost||c==="plant"&&s.hasBoost,p=!c,f=Me("div","growth-stats-compact");if(!u&&!p){const w=o==="egg"?"Egg":"Plant",y=Me("div","stat-row stat-row--message");y.appendChild(Me("span","stat__message",`No ${w} Growth Boost, Click the Button to Switch View`)),f.appendChild(y),n.appendChild(f);return}const g=[],x=i.hasBoost&&(c==="egg"||p),b=s.hasBoost&&(c==="plant"||p);if(x){const w=Math.round(i.hourlyReduction/60*100);g.push({text:`+${w}% Speed`,sprite:Bt("egg","UncommonEgg")});}if(b){const w=Math.round(s.hourlyReduction/60*100);g.push({text:`+${w}% Speed`,sprite:Bt("plant","Carrot")});}g.length>0&&f.appendChild(qd(g));const h=Kd(t,"egg"),v=parseFloat(h.replace("x","")),_=Kd(t,"plant"),k=parseFloat(_.replace("x",""));if(i.hasBoost&&(c==="egg"||p)){const w=Yd(l,a),y=Gt(w.remainingMs,v),S=l.length>0?pa(l,a,v):100,I=y>0?Dt(y):"Ready!";f.appendChild(zt("NEXT EGG",I,Bt("egg",w.name),S,"stat__progress-fill--egg"));}if(s.hasBoost&&(c==="plant"||p)){const w=Jd(d,a),y=Gt(w.remainingMs,k),S=d.length>0?fa(d,a,k):100,I=y>0?Dt(y):"Ready!";f.appendChild(zt("NEXT PLANT",I,Bt("plant",w.name),S,"stat__progress-fill--plant"));}if(i.hasBoost&&(c==="egg"||p)){const w=l.length>0?pa(l,a,v):100,y=Qd(l,a),S=Gt(y,v),I=S>0?Dt(S):"All Ready!";f.appendChild(zt("ALL EGGS",I,ua("egg",l),w,"stat__progress-fill--egg"));}else if(s.hasBoost&&(c==="plant"||p)){const w=d.length>0?fa(d,a,k):100,y=Zd(d,a),S=Gt(y,k),I=S>0?Dt(S):"All Ready!";f.appendChild(zt("ALL PLANTS",I,ua("plant",d),w,"stat__progress-fill--plant"));}n.appendChild(f);},renderGroupedSlot:(e,t,n,o)=>{const r=fe.myGarden.get(),a=Date.now(),i=vc(e),s=wc(e),l=pr(i),d=pr(s);n.innerHTML="";const c=l.timeReductionPerHour>0,u=d.timeReductionPerHour>0;if(!c&&!u)return;const p=Me("div","growth-stats-compact growth-stats-grouped"),f=r.eggs.growing,g=r.crops.growing,x=o==="egg"&&c,b=o==="plant"&&u,h=!o,v=(60+l.timeReductionPerHour)/60,_=(60+d.timeReductionPerHour)/60,k=[];if((x||h)&&c){const w=Math.round(l.timeReductionPerHour/60*100);k.push({text:`+${w}% Speed`,sprite:Bt("egg","UncommonEgg")});}if((b||h)&&u){const w=Math.round(d.timeReductionPerHour/60*100);k.push({text:`+${w}% Speed`,sprite:Bt("plant","Carrot")});}if(k.length>0&&p.appendChild(qd(k)),(x||h)&&c){const w=Yd(f,a),y=Gt(w.remainingMs,v),S=f.length>0?pa(f,a,v):100,I=y>0?Dt(y):"Ready!";p.appendChild(zt("NEXT EGG",I,Bt("egg",w.name),S,"stat__progress-fill--egg"));}if((b||h)&&u){const w=Jd(g,a),y=Gt(w.remainingMs,_),S=g.length>0?fa(g,a,_):100,I=y>0?Dt(y):"Ready!";p.appendChild(zt("NEXT PLANT",I,Bt("plant",w.name),S,"stat__progress-fill--plant"));}if((x||h)&&c){const w=f.length>0?pa(f,a,v):100,y=Qd(f,a),S=Gt(y,v),I=S>0?Dt(S):"All Ready!";p.appendChild(zt("ALL EGGS",I,ua("egg",f),w,"stat__progress-fill--egg"));}else if((b||h)&&u){const w=g.length>0?fa(g,a,_):100,y=Zd(g,a),S=Gt(y,_),I=S>0?Dt(S):"All Ready!";p.appendChild(zt("ALL PLANTS",I,ua("plant",g),w,"stat__progress-fill--plant"));}n.appendChild(p);},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return Hn(n)||jn(n)},shouldDisplay:(e,t,n)=>{const r=(Di.ALLOWED_PANELS[n.primary]||[]).includes("growth"),a=Hn(t)||jn(t);return r&&a},countRows:(e,t,n)=>{const o=Array.isArray(e)?e:[e],r=Hn(o),a=jn(o);if(!r&&!a)return 0;if(n==="egg"||n==="plant")return 2;let i=0;return r&&(i+=2),a&&(i+=2),i}},Lo=["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],Ro=["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],No=["RainDance","SnowGranter","FrostGranter","GoldGranter","RainbowGranter"],Fo=["DoubleHarvest"],Oo=["ProduceRefund"];function Pt(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function Ht(e){if(e>=1e12)return `${(e/1e12).toFixed(2)}T`;if(e>=1e9)return `${(e/1e9).toFixed(2)}B`;if(e>=1e6)return `${(e/1e6).toFixed(2)}M`;if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)}k`:`${t.toFixed(1)}k`}return String(Math.round(e))}function uo(e){const t=te.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,scaleIncreasePercentage:n.baseParameters?.scaleIncreasePercentage??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0,grantedMutations:n.baseParameters?.grantedMutations??[],requiredWeather:n.baseParameters?.requiredWeather??null}:null}function Ee(e,t){return e.abilities.some(n=>t.includes(n))}function Lr(e,t,n){if(e.hunger<=0)return  false;const o=uo(t);return !(!o||o.requiredWeather&&n!==o.requiredWeather)}function Rr(e){return e.currentStrength/e.maxStrength}function Bi(e,t){return Math.min(100,e*t)}function L_(e,t,n,o){const r=yi(e);if(!r)return 0;const a=gt(e,t,n),i=Math.min(t*(1+o/100),r.maxScale),s=gt(e,i,n);return Math.max(0,s-a)}function Cm(e,t,n,o){if(n.includes(o))return 0;const r=gt(e,t,n),a=[...n,o],i=gt(e,t,a);return Math.max(0,i-r)}function gs(e,t,n){const o=Pt("div","stat-row");return o.appendChild(Pt("span","stat__label",e)),o.appendChild(Pt("span","stat__value",t)),o.appendChild(Pt("span","stat__timer",n)),o}function eu(e,t,n){const o=Pt("div","stat-row");return o.appendChild(Pt("span","stat__label",e)),o.appendChild(Pt("span","stat__value",t)),o.appendChild(Pt("span","stat__timer",n)),o}function R_(e,t){const o=fe.myGarden.get().crops.all;if(o.length===0)return {perProc:0,perHour:0};let r=0,a=0;for(const l of e){const d=Rr(l);for(const c of Lo){if(!l.abilities.includes(c)||!Lr(l,c,t))continue;const u=uo(c);if(!u)continue;const p=Bi(u.baseProbability,d),f=u.scaleIncreasePercentage*d,g=p/100*60;let x=0;for(const h of o){const v=L_(h.species,h.targetScale,h.mutations,f);x+=v;}const b=x/o.length;r+=g,a+=b;}}const i=e.length>0?a/e.length:0,s=r*i;return {perProc:i,perHour:s}}function N_(e,t){const o=fe.myGarden.get().crops.all,r=fe.weather.get(),a=te.get("weather");if(o.length===0||!r.isActive||!a)return {perProc:0,perHour:0};const i=a[r.type];if(!i?.mutator)return {perProc:0,perHour:0};const s=i.mutator.chancePerMinutePerCrop??0,l=i.mutator.mutation??"";let d=0;for(const g of e){const x=Rr(g);for(const b of Ro){if(!g.abilities.includes(b)||!Lr(g,b,t))continue;const h=uo(b);if(!h)continue;const v=h.mutationChanceIncreasePercentage*x;d+=v;}}const c=s*(d/100),u=o.length*(c/100)*60;let p=0;for(const g of o){const x=Cm(g.species,g.targetScale,g.mutations,l);p+=x;}const f=o.length>0?p/o.length:0;return {perProc:f,perHour:u*f}}function F_(e,t){const o=fe.myGarden.get().crops.all;if(o.length===0)return {perProc:0,perHour:0};let r=0,a=0;for(const l of e){const d=Rr(l);for(const c of No){if(!l.abilities.includes(c)||!Lr(l,c,t))continue;const u=uo(c);if(!u)continue;const f=Bi(u.baseProbability,d)/100*60,g=u.grantedMutations;if(g.length===0)continue;const x=g[0];let b=0;for(const v of o){const _=Cm(v.species,v.targetScale,v.mutations,x);b+=_;}const h=b/o.length;r+=f,a+=h;}}const i=e.length>0?a/e.length:0,s=r*i;return {perProc:i,perHour:s}}function O_(e,t){const n=fe.myGarden.get(),o=n.crops.mature.length>0?n.crops.mature:n.crops.all;if(o.length===0)return {expectedCrops:0,expectedCoins:0};let r=0;for(const s of e){const l=Rr(s);for(const d of Fo){if(!s.abilities.includes(d)||!Lr(s,d,t))continue;const c=uo(d);if(!c)continue;const u=Bi(c.baseProbability,l);r+=u/100;}}const a=o.length*r;let i=0;for(const s of o){const l=gt(s.species,s.targetScale,s.mutations);i+=l*r;}return {expectedCrops:a,expectedCoins:i}}function $_(e,t){const n=fe.myGarden.get(),o=n.crops.mature.length>0?n.crops.mature:n.crops.all;if(o.length===0)return {expectedCrops:0,expectedCoins:0};let r=0;for(const s of e){const l=Rr(s);for(const d of Oo){if(!s.abilities.includes(d)||!Lr(s,d,t))continue;const c=uo(d);if(!c)continue;const u=Bi(c.baseProbability,l);r+=u/100;}}const a=o.length*r;let i=0;for(const s of o){const l=gt(s.species,s.targetScale,s.mutations);i+=l*r;}return {expectedCrops:a,expectedCoins:i}}const il={id:"coin",label:"Value",icon:"💰",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=fe.myGarden.get(),o=n.crops.all.length;return o===0?null:{text:`${o} crops`,variant:"neutral",tooltip:`${n.crops.mature.length} mature, ${n.crops.growing.length} growing`,priority:7}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n)=>{const o=[e];il.renderGroupedSlot&&il.renderGroupedSlot(o,t,n);},renderGroupedSlot:(e,t,n)=>{const o=fe.weather.get(),r=o.isActive?o.type:null;n.innerHTML="";const a=Pt("div","value-stats-compact"),i=e.some(u=>Ee(u,Lo)),s=e.some(u=>Ee(u,Ro)),l=e.some(u=>Ee(u,No)),d=e.some(u=>Ee(u,Fo)),c=e.some(u=>Ee(u,Oo));if(!(!i&&!s&&!l&&!d&&!c)){if(i){const u=R_(e,r);a.appendChild(gs("SIZE BOOST",`+${Ht(u.perProc)}/proc`,`+${Ht(u.perHour)}/hr`));}if(s){const u=N_(e,r);a.appendChild(gs("MUTATION BOOST",`+${Ht(u.perProc)}/proc`,`+${Ht(u.perHour)}/hr`));}if(l){const u=F_(e,r);a.appendChild(gs("GRANTERS",`+${Ht(u.perProc)}/proc`,`+${Ht(u.perHour)}/hr`));}if(d){const u=O_(e,r);a.appendChild(eu("EXTRA HARVEST",`+${u.expectedCrops.toFixed(1)} crops`,`+${Ht(u.expectedCoins)} coins`));}if(c){const u=$_(e,r);a.appendChild(eu("CROP REFUND",`+${u.expectedCrops.toFixed(1)} crops`,`+${Ht(u.expectedCoins)} coins`));}n.appendChild(a);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>Ee(o,Lo)||Ee(o,Ro)||Ee(o,No)||Ee(o,Fo)||Ee(o,Oo)),shouldDisplay:(e,t,n)=>{const r=(Di.ALLOWED_PANELS[n.primary]||[]).includes("coin"),a=t.some(i=>Ee(i,Lo)||Ee(i,Ro)||Ee(i,No)||Ee(i,Fo)||Ee(i,Oo));return r&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>Ee(r,Lo))&&o++,n.some(r=>Ee(r,Ro))&&o++,n.some(r=>Ee(r,No))&&o++,n.some(r=>Ee(r,Fo))&&o++,n.some(r=>Ee(r,Oo))&&o++,o}},Mn=["DoubleHatch"],Ln=["PetRefund","PetRefundII"],Rn=["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"];function qe(e,t,n){const o=document.createElement(e);return t&&(o.className=t),n&&(o.textContent=n),o}function km(e){const t=te.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0}:null}function He(e,t){return e.abilities.some(n=>t.includes(n))}function Rc(e){return e.hunger>0}function Im(e){return e.currentStrength/e.maxStrength}function _m(e,t){return Math.min(100,e*t)}function D_(e){const t=qe("span","sprite-wrapper");try{if(J.isReady()&&J.has("pet",e)){const n=J.toCanvas("pet",e,{scale:.6});n.style.height="32px",n.style.width="auto",n.style.imageRendering="pixelated",t.appendChild(n);}}catch{t.textContent="🥚";}return t}function ga(e,t){const n=qe("div","stat-row");n.appendChild(qe("span","stat__label",e));const o=qe("div","stat__sprite-grid");for(const r of t){if(r.value<=0)continue;const a=qe("div","stat__sprite-item");a.appendChild(D_(r.eggId));const i=qe("span","stat__sprite-value",r.value.toFixed(1));a.appendChild(i),o.appendChild(a);}return n.appendChild(o),n}function tu(e,t,n,o){const r=qe("div","stat-row");r.appendChild(qe("span","stat__label","PET MUTATION"));const a=qe("span","stat__values-row"),i=qe("span","stat__value stat__value--rainbow",`${e}% (${n})`);i.style.backgroundImage="var(--rainbow-text-gradient)",i.style.webkitBackgroundClip="text",i.style.webkitTextFillColor="transparent",i.style.backgroundClip="text",a.appendChild(i),a.appendChild(qe("span","stat__separator"," | "));const s=qe("span","stat__value stat__value--gold",`${t}% (${o})`);return a.appendChild(s),r.appendChild(a),r}function Nc(){const e=fe.myInventory.get(),t=new Map;for(const n of e.items)if(n.itemType==="Egg"&&n.eggId){const o=t.get(n.eggId)||0;t.set(n.eggId,o+(n.quantity||1));}return t}function nu(e){const t=Nc(),n=[];let o=0;for(const r of e){if(!Rc(r))continue;const a=Im(r);for(const i of Mn){if(!r.abilities.includes(i))continue;const s=km(i);if(!s)continue;const l=_m(s.baseProbability,a);o+=l/100;}}for(const[r,a]of t){const i=a*o;n.push({eggId:r,value:i});}return n}function ou(e){const t=Nc(),n=[];let o=0;for(const r of e){if(!Rc(r))continue;const a=Im(r);for(const i of Ln){if(!r.abilities.includes(i))continue;const s=km(i);if(!s)continue;const l=_m(s.baseProbability,a);o+=l/100;}}for(const[r,a]of t){const i=a*o;n.push({eggId:r,value:i});}return n}function ru(e){const t=Nc(),n=Array.from(t.values()).reduce((p,f)=>p+f,0);let o=0,r=0;for(const p of e){if(!Rc(p))continue;Rn.some(g=>p.abilities.includes(g))&&(o+=p.currentStrength*1e-4,r+=p.currentStrength*.001);}const a=te.get("mutations");let i=1,s=.1;if(a){const p=a.Gold,f=a.Rainbow;p?.baseChance!==void 0&&(i=p.baseChance),f?.baseChance!==void 0&&(s=f.baseChance);}const l=i+r,d=s+o,c=n*l/100,u=n*d/100;return {goldChance:l,rainbowChance:d,expectedGold:c,expectedRainbow:u}}const B_={id:"hatch",label:"Hatching",icon:"🥚",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const o=fe.myInventory.get().items.filter(r=>r.itemType==="Egg").reduce((r,a)=>r+(a.quantity||1),0);return o===0?null:{text:`${o} eggs`,variant:"neutral",tooltip:`${o} eggs in inventory`,priority:6}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n)=>{n.innerHTML="";const o=qe("div","hatching-stats-compact"),r=He(e,Mn),a=He(e,Ln),i=He(e,Rn);if(!r&&!a&&!i)return;const s=[e];if(r){const l=nu(s);l.length>0&&o.appendChild(ga("DOUBLE HATCH",l));}if(a){const l=ou(s);l.length>0&&o.appendChild(ga("PET REFUND",l));}if(i){const l=ru(s),d=l.rainbowChance.toFixed(4),c=l.goldChance.toFixed(2),u=l.expectedRainbow<.01?`~${(l.expectedRainbow*100).toFixed(1)}%e`:l.expectedRainbow.toFixed(2),p=l.expectedGold.toFixed(2);o.appendChild(tu(d,c,u,p));}n.appendChild(o);},renderGroupedSlot:(e,t,n)=>{n.innerHTML="";const o=qe("div","hatching-stats-compact"),r=e.some(s=>He(s,Mn)),a=e.some(s=>He(s,Ln)),i=e.some(s=>He(s,Rn));if(!(!r&&!a&&!i)){if(r){const s=nu(e);s.length>0&&o.appendChild(ga("DOUBLE HATCH",s));}if(a){const s=ou(e);s.length>0&&o.appendChild(ga("PET REFUND",s));}if(i){const s=ru(e),l=s.rainbowChance.toFixed(4),d=s.goldChance.toFixed(2),c=s.expectedRainbow<.01?`~${(s.expectedRainbow*100).toFixed(1)}%e`:s.expectedRainbow.toFixed(2),u=s.expectedGold.toFixed(2);o.appendChild(tu(l,d,c,u));}n.appendChild(o);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(o=>He(o,Mn)||He(o,Ln)||He(o,Rn)),shouldDisplay:(e,t,n)=>{const r=(Di.ALLOWED_PANELS[n.primary]||[]).includes("hatch"),a=t.some(i=>He(i,Mn)||He(i,Ln)||He(i,Rn));return r&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let o=0;return n.some(r=>He(r,Mn))&&o++,n.some(r=>He(r,Ln))&&o++,n.some(r=>He(r,Rn))&&o++,o}},au=[P_,M_,il,B_];function z_(e){let t=e;return t=t.replace(/_NEW$/,""),t=t.replace(/^Snowy/,""),t=t.replace(/(I|II|III|IV)$/,""),t}function Tm(e){return new Set(e.abilities.map(z_))}function ko(e,t){if(e.size!==t.size)return  false;for(const n of e)if(!t.has(n))return  false;return  true}function iu(e,t){return Tm(e).has(t)}function G_(e,t){if(e.length<2)return {shouldGroup:false,matchingPets:[],remainingPets:e};if(t){const i=t==="egg"?"EggGrowthBoost":"PlantGrowthBoost",s=e.filter(d=>iu(d,i)),l=e.filter(d=>!iu(d,i));return s.length>=2?{shouldGroup:true,matchingPets:s,remainingPets:l}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const n=e.map(i=>({pet:i,abilities:Tm(i)}));if(e.length===3){const[i,s,l]=n;if(ko(i.abilities,s.abilities)&&ko(i.abilities,l.abilities))return {shouldGroup:true,matchingPets:[i.pet,s.pet,l.pet],remainingPets:[]}}const[o,r,a]=n;return ko(o.abilities,r.abilities)?{shouldGroup:true,matchingPets:[o.pet,r.pet],remainingPets:a?[a.pet]:[]}:a&&ko(o.abilities,a.abilities)?{shouldGroup:true,matchingPets:[o.pet,a.pet],remainingPets:[r.pet]}:a&&ko(r.abilities,a.abilities)?{shouldGroup:true,matchingPets:[r.pet,a.pet],remainingPets:[o.pet]}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const H_=3;function j_(e,t){const n=e.abilities||[],o=d=>n.some(c=>d.includes(c));if((o(ee.DOUBLE_HATCH)||o(ee.PET_REFUND)||o(ee.PET_MUTATION)||o(ee.MAX_STR_BOOST))&&t.some(d=>d.id==="hatch"))return "hatch";if((o(ee.COIN_FINDER)||o(ee.SELL_BOOST)||o(ee.CROP_REFUND_HARVEST)||o(ee.CROP_SIZE)||o(ee.CROP_MUTATION)||o(ee.RARE_GRANTERS)||o(ee.COMMON_GRANTERS))&&t.some(d=>d.id==="coin"))return "coin";if((o(ee.EGG_GROWTH)||o(ee.PLANT_GROWTH))&&t.some(d=>d.id==="growth"))return "growth";const s=e.currentStrength<e.maxStrength,l=o(ee.XP_BOOST);return (s||l)&&t.some(d=>d.id==="xp")?"xp":t[0]?.id||"xp"}class U_{constructor(t){U(this,"expandedTeams",new Map);U(this,"featureUpdateInterval",null);U(this,"options");this.options=t;}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t,n=false,o){const r=this.options.getListContainer(),a=pe.getTeam(t);if(!a||!r)return;const i=pe.getPetsForTeam(a),s=fe.myPets.get(),l=da(a),d=au.filter(k=>!(!k.isAvailable()||k.shouldDisplay&&!k.shouldDisplay(a,i,l)));if(d.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const c=l.primary==="time-reduction"||Hn(i)||jn(i);let u;if(c){const k=Hn(i),w=jn(i),y=fe.myGarden.get(),S=y.eggs.growing.length>0,I=y.crops.growing.length>0;k&&w?I&&!S?u="plant":S&&!I?u="egg":u="plant":w?u="plant":k&&(u="egg");}const p=m("div",{className:"team-expanded-container"}),f=[];let g=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,u);const x=d.some(k=>k.id==="growth"||k.id==="hatch"||k.id==="coin");if(g.shouldGroup&&!x&&(g.matchingPets.every(w=>w.currentStrength>=w.maxStrength)||(g={shouldGroup:false,matchingPets:[],remainingPets:i})),g.shouldGroup&&g.matchingPets.length>=2){const k=d.filter(S=>!S.hasContent||S.hasContent(g.matchingPets,a)),w=k.find(S=>S.id==="growth"||S.id==="hatch"||S.id==="coin")||k[0]||d[0],y=this.createGroupedPetRow(a,g.matchingPets,d,w,u,t);p.appendChild(y.container),f.push(y.cardState);for(const S of g.remainingPets){const I=a.petIds.indexOf(S.id),C=this.createIndividualPetRow(a,S,I,d,u,t);p.appendChild(C.container),f.push(C.cardState);}}else for(let k=0;k<3;k++){const w=a.petIds[k],y=w?s.all.find(I=>I.id===w)??null:null,S=this.createIndividualPetRow(a,y,k,d,u,t,o);p.appendChild(S.container),f.push(S.cardState);}this.expandedTeams.set(t,{cards:f,expandedAt:Date.now(),container:p,growthViewType:u});const b=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(p,i,t,b);const v=pe.getAllTeams().findIndex(k=>k.id===t),_=Array.from(r.children).filter(k=>k instanceof HTMLElement&&k.classList.contains("team-list-item"));v!==-1&&v<_.length&&_[v].insertAdjacentElement("afterend",p),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const o of n.cards)o.shell&&o.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,o,r){const a=pe.getTeam(o),i=a?da(a):null,s=this.expandedTeams.get(o),l=i?.primary==="time-reduction"||Hn(n)||jn(n),d=r??(l?"growth":"xp");s&&(s.currentBarMode=d),d==="growth"?this.renderGrowthSummaryBar(t,n,o):this.renderXpProgressBar(t,n);}updateProgressBarForFeature(t,n){const o=this.expandedTeams.get(t);if(!o)return;const r=pe.getTeam(t);if(!r||n!=="xp"&&n!=="growth")return;const a=pe.getPetsForTeam(r),i=n==="xp"?"xp":"growth";if(o.currentBarMode===i)return;const s=o.container.querySelector(".growth-summary-overhaul"),l=o.container.querySelector(".team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)");s&&s.remove(),l&&l.remove(),this.addProgressBar(o.container,a,t,i);}renderXpProgressBar(t,n){if(n.some(r=>r.currentStrength<r.maxStrength)&&n.length>0){const r=Math.round(n.reduce((d,c)=>d+c.currentStrength/c.maxStrength,0)/n.length*100),a=m("div",{className:"team-progress-bar"}),i=r<33?"low":r<67?"medium":"high",s=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});s.style.width=`${r}%`;const l=m("div",{className:"team-progress-bar__percent",textContent:`${r}%`});a.appendChild(s),a.appendChild(l),t.prepend(a);}}renderGrowthSummaryBar(t,n,o){const r=this.expandedTeams.get(o),a=r?.growthViewType||"plant",i=fe.myGarden.get(),s=Date.now(),l=a==="egg"?i.eggs.growing:i.crops.growing,d=l.length,c=vc(n),u=wc(n),p=pr(c).timeReductionPerHour,f=pr(u).timeReductionPerHour,g=Math.round(a==="egg"?p:f);let x=d>0?0:100;if(d>0){const j=(60+g)/60;x=Math.round(l.reduce((N,O)=>{const z=a==="egg"?O.plantedAt:O.startTime,D=a==="egg"?O.maturedAt:O.endTime,H=s-z,P=(D-s)/j,T=H+P,M=T>0?H/T*100:0;return N+Math.min(100,Math.max(0,M))},0)/d);}let b=l.find(j=>j.tileIndex===r?.pinnedItemId);!b&&d>0&&(b=[...l].sort((j,N)=>{const O=a==="egg"?j.maturedAt:j.endTime,z=a==="egg"?N.maturedAt:N.endTime;return O-z})[0]);const h=m("div",{className:"growth-summary-overhaul"}),v=m("div",{className:`team-progress-bar team-progress-bar--${a}`}),_=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});_.style.width=`${x}%`;const k=j=>{const N=Math.floor(j/60),O=j%60;return N>0&&O>0?`${N}h ${O}m/h`:N>0?`${N}h/h`:`${O}m/h`};g>0&&((60+g)/60).toFixed(2)+"";const w=m("div",{className:"team-progress-bar__overlay"});w.innerHTML=`
            <span class="bar-percent">${x}%</span>
            <span class="bar-info">${d} total +${k(g)}</span>
        `,v.appendChild(_),v.appendChild(w);const y=m("div",{className:"growth-next-item"});if(b){let j=a==="egg"?b.eggId:b.species;const N=a==="egg"?"pet":"plant";a==="plant"&&j&&(j==="DawnCelestial"&&(j="DawnCelestialCrop"),j==="MoonCelestial"&&(j="MoonCelestialCrop"));const O=a==="egg"?b.maturedAt:b.endTime;a==="egg"?b.plantedAt:b.startTime;const z=(60+g)/60,D=Math.max(0,Math.round((O-s)/z)),H=s+D,E=new Date(H),P=E.getDate()!==new Date().getDate(),T=E.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),M=`${P?"Tomorrow ":""}${T}`,X=V=>{const ne=Math.floor(V/1e3),Te=Math.floor(ne/60),Xe=Math.floor(Te/60);return Xe>0?`${Xe}h ${Te%60}m ${ne%60}s`:Te>0?`${Te}m ${ne%60}s`:`${ne}s`},G=m("div",{className:"growth-next-sprite"});try{if(J.isReady()&&J.has(N,j)){const V=J.toCanvas(N,j,{scale:.3});V.style.height="20px",V.style.width="auto",V.style.imageRendering="pixelated",G.appendChild(V);}else G.textContent=a==="egg"?"🥚":"🌱";}catch(V){console.warn("[GrowthSummary] Sprite error:",V),G.textContent=a==="egg"?"🥚":"🌱";}y.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${X(D)}</span>
                    <span class="growth-next-date">| ${M}</span>
                </div>
            `,y.prepend(G);}else y.innerHTML='<span class="empty-text">No items growing</span>';const S=m("div",{className:"growth-overhaul-controls"}),I=a==="egg"?"UncommonEgg":"Carrot",C=a==="egg"?"pet":"plant";let A=null;try{J.isReady()&&J.has(C,I)&&(A=J.toCanvas(C,I,{scale:.35}));}catch{}const R=I_({variant:a==="egg"?"egg":"plant",sprite:A,playSound:true,tooltip:`Switch to ${a==="egg"?"plants":"eggs"}`,onClick:j=>{j.stopPropagation(),r&&(r.growthViewType=a==="egg"?"plant":"egg",r.pinnedItemId=void 0,this.updateGrowthSummary(o));}}),$=m("button",{className:"growth-dropdown-overhaul",textContent:"▼"});$.onclick=j=>{j.stopPropagation(),this.showGrowthDropdown($,l,a,o);},p>0&&f>0&&S.appendChild(R),S.appendChild($),h.appendChild(v),h.appendChild(y),h.appendChild(S);const B=t.querySelector(".growth-summary-overhaul");B?B.replaceWith(h):t.prepend(h);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const o=pe.getTeam(t);if(!o)return;const r=pe.getPetsForTeam(o);this.renderGrowthSummaryBar(n.container,r,t);const a=this.analyzeTeamForGrouping(o,r,n.growthViewType),i=n.cards.some(l=>l.slotIndex===-1),s=a.shouldGroup&&a.matchingPets.length>=2;if(i!==s){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}if(i&&s){const l=n.cards.find(d=>d.slotIndex===-1);if(l?.shell&&(l.shell.root.classList.contains("base-pet-card--grouped")?3:l.shell.root.classList.contains("base-pet-card--grouped-2")?2:0)!==a.matchingPets.length){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}}this.updateGroupedCardsViewType(t,n),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const o=pe.getTeam(t);if(!o)return;const r=fe.myPets.get();for(const a of n.cards){const i=o.petIds[a.slotIndex],s=i?r.all.find(l=>l.id===i):null;if(s&&a.shell&&(a.shell.update(s),a.featureData.renderPetSlot))try{const l=a.shell.getContentSlot();a.featureData.renderPetSlot(s,o,l,n.growthViewType);const d=s.currentStrength>=s.maxStrength,c=l.children.length>0||l.textContent.trim().length>0;a.shell.setCentered(d&&!c);}catch(l){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,l);}}}updateGroupedCardsViewType(t,n){const o=pe.getTeam(t);if(o){for(const r of n.cards)if(r.slotIndex===-1&&r.shell){const a=r.shell.getContentSlot();if(r.featureData.renderGroupedSlot&&r.shell.root.classList.contains("base-pet-card--grouped")){a.innerHTML="";const i=pe.getPetsForTeam(o);r.featureData.renderGroupedSlot(i,o,a,n.growthViewType);const s=a.children.length>0||a.textContent.trim().length>0;r.shell.setCentered(!s);}}}}showGrowthDropdown(t,n,o,r){const a=document.querySelector(".growth-dropdown-menu");if(a){const d=a.getAttribute("data-owner-id")===r&&a.getAttribute("data-view-type")===o;if(a.remove(),d)return}const i=m("div",{className:"growth-dropdown-menu"});if(i.setAttribute("data-owner-id",r),i.setAttribute("data-view-type",o),n.length===0){const d=m("div",{className:"growth-dropdown-option"});d.textContent="No items growing",i.appendChild(d);}else {const d=o==="egg"?"pet":"plant";n.forEach(c=>{const u=c.tileIndex;let p=o==="egg"?c.eggId:c.species;o==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=m("div",{className:"growth-dropdown-option"}),g=m("span",{className:"dropdown-sprite"});try{if(J.isReady()&&J.has(d,p)){const _=J.toCanvas(d,p,{scale:.3});_.style.height="16px",_.style.width="auto",_.style.imageRendering="pixelated",g.appendChild(_);}else g.textContent=o==="egg"?"🥚":"🌱";}catch{g.textContent=o==="egg"?"🥚":"🌱";}const x=o==="egg"?c.maturedAt:c.endTime,h=new Date(x).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),v=m("span",{className:"dropdown-text"});v.textContent=`${p} - ${h}`,f.appendChild(g),f.appendChild(v),f.onclick=_=>{_.stopPropagation();const k=this.expandedTeams.get(r);k&&(k.pinnedItemId=u,this.updateGrowthSummary(r)),i.remove();},i.appendChild(f);});}const s=t.getBoundingClientRect();i.style.position="fixed",i.style.bottom=`${window.innerHeight-s.top+4}px`,i.style.top="auto",i.style.left="auto",i.style.right=`${window.innerWidth-s.right}px`,i.style.marginTop="0",i.style.zIndex="999999",document.body.appendChild(i);const l=d=>{!i.contains(d.target)&&d.target!==t&&(i.remove(),document.removeEventListener("click",l,true));};setTimeout(()=>document.addEventListener("click",l,true),10);}createIndividualPetRow(t,n,o,r,a,i,s){const l=n?r.filter(w=>!w.hasContent||w.hasContent(n,t)):r,d=l.length>0?l:r;let c=d[0];if(s)c=d.find(w=>w.id===s)||d[0];else if(n){const w=j_(n,d);c=d.find(y=>y.id===w)||d[0];}else {const y=da(t)?.suggestedFeatures||[];let S=false;for(const I of y){const C=d.find(A=>A.id===I);if(C){c=C,S=true;break}}S||(a?c=d.find(I=>I.id==="growth")||d[0]:c=d.find(I=>I.id==="xp")||d[0]);}const u=m("div",{className:"expanded-pet-row"}),p=m("div",{className:"pet-row__header"}),f=m("button",{textContent:"<",className:"pet-row__nav"}),g=m("div",{textContent:`${c.icon} ${c.label.toUpperCase()}`,className:"pet-label"}),x=m("button",{textContent:">",className:"pet-row__nav"});let b=null;n&&(b=new S_(n));const h={slotIndex:o,currentFeatureId:c.id,shell:b,featureData:c},v=w=>{const y=d[w];if(y.id==="growth"){const S=pe.getPetsForTeam(t),I=this.expandedTeams.get(i),C=this.analyzeTeamForGrouping(t,S,I?.growthViewType);if(C.shouldGroup&&C.matchingPets.length>=2){this.collapseAndReexpandForGrowth(i);return}}if(g.textContent=`${y.icon} ${y.label.toUpperCase()}`,b&&n){const S=b.getContentSlot();if(S.innerHTML="",y.renderPetSlot){const A=this.expandedTeams.get(i);y.renderPetSlot(n,t,S,A?.growthViewType);}const I=n.currentStrength>=n.maxStrength,C=S.children.length>0||S.textContent.trim().length>0;b.setCentered(I&&!C);}h.currentFeatureId=y.id,h.featureData=y,p.className=`pet-row__header pet-row__header--${y.id}`,this.updateProgressBarForFeature(i,y.id);};p.className=`pet-row__header pet-row__header--${c.id}`;let _=d.findIndex(w=>w.id===c.id);f.addEventListener("click",w=>{w.stopPropagation(),_=(_-1+d.length)%d.length,v(_);}),x.addEventListener("click",w=>{w.stopPropagation(),_=(_+1)%d.length,v(_);}),d.length>1&&p.appendChild(f),p.appendChild(g),d.length>1&&p.appendChild(x);let k;if(b&&n){if(k=b.build(),c.renderPetSlot){const w=b.getContentSlot();c.renderPetSlot(n,t,w,a);const y=n.currentStrength>=n.maxStrength,S=w.children.length>0||w.textContent.trim().length>0;b.setCentered(y&&!S);}}else k=m("div",{className:"pet-row__content pet-row__content--empty"}),k.innerHTML=`
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;return u.appendChild(p),u.appendChild(k),h.container=u,{container:u,cardState:h}}createGroupedPetRow(t,n,o,r,a,i){const s=o.filter(S=>!S.hasContent||S.hasContent(n,t)),l=s.length>0?s:o;if(this.shouldUseCombinedPanel(l,n,t,a))return this.createCombinedPanelRow(t,n,l,a,i);const d=m("div",{className:"expanded-pet-row expanded-pet-row--grouped"}),c=m("div",{className:"pet-row__header"}),u=m("button",{textContent:"<",className:"pet-row__nav"}),p=m("div",{textContent:`${r.icon} ${r.label.toUpperCase()}`,className:"pet-label"}),f=m("button",{textContent:">",className:"pet-row__nav"}),g=m("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),x=m("div",{className:"base-pet-card__left"}),b=m("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const S of n)try{const I=S.mutations||[];if(J.has("pet",S.petSpecies)){const C=J.toCanvas("pet",S.petSpecies,{mutations:I,scale:1,boundsMode:"padded"});C.style.imageRendering="pixelated",b.appendChild(C);}}catch{}x.appendChild(b);const h=m("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const S of n){const C=S.currentStrength>=S.maxStrength?`MAX ${S.maxStrength}`:`STR ${S.currentStrength}/${S.maxStrength}`,A=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});h.appendChild(A);}x.appendChild(h),g.appendChild(x);const v=m("div",{className:"base-pet-card__content"});g.appendChild(v);const _={root:g,getContentSlot:()=>v,setCentered:S=>{g.classList.toggle("base-pet-card--centered",S);},destroy:()=>{g.remove();},update:()=>{h.innerHTML="";for(const S of n){const C=S.currentStrength>=S.maxStrength?`MAX ${S.maxStrength}`:`STR ${S.currentStrength}/${S.maxStrength}`,A=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});h.appendChild(A);}}},k={slotIndex:-1,currentFeatureId:r.id,shell:_,featureData:r},w=S=>{const I=l[S];if(I.id==="xp"&&!n.every(R=>R.currentStrength>=R.maxStrength)){this.collapseAndReexpandForXP(i);return}if(p.textContent=`${I.icon} ${I.label.toUpperCase()}`,v.innerHTML="",I.renderGroupedSlot){const A=this.expandedTeams.get(i);I.renderGroupedSlot(n,t,v,A?.growthViewType);}else if(I.renderPetSlot){const A=this.expandedTeams.get(i);I.renderPetSlot(n[0],t,v,A?.growthViewType);}const C=v.children.length>0||v.textContent.trim().length>0;_.setCentered(!C),k.currentFeatureId=I.id,k.featureData=I,c.className=`pet-row__header pet-row__header--${I.id}`;};c.className=`pet-row__header pet-row__header--${r.id}`;let y=l.findIndex(S=>S.id===r.id);return u.addEventListener("click",S=>{S.stopPropagation(),y=(y-1+l.length)%l.length,w(y);}),f.addEventListener("click",S=>{S.stopPropagation(),y=(y+1)%l.length,w(y);}),l.length>1&&c.appendChild(u),c.appendChild(p),l.length>1&&c.appendChild(f),r.renderGroupedSlot?r.renderGroupedSlot(n,t,v,a):r.renderPetSlot&&r.renderPetSlot(n[0],t,v,a),d.appendChild(c),d.appendChild(g),g.classList.add("base-pet-card--grouped"),{container:d,cardState:{...k,container:d}}}collapseAndReexpandForXP(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,true,"xp"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,true,"xp"),n.container.style.opacity="1";});});}collapseAndReexpandForGrowth(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,false,"growth"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,false,"growth"),n.container.style.opacity="1";});});}rebuildInPlace(t,n,o){const r=this.expandedTeams.get(t);if(!r)return;const a=pe.getTeam(t);if(!a)return;const i=pe.getPetsForTeam(a),s=fe.myPets.get(),l=this.getAvailableFeaturesForTeam(a,i),d=r.growthViewType;for(const x of r.cards)x.shell&&x.shell.destroy(),x.container&&x.container.parentNode&&x.container.remove();const c=r.container.querySelector(".team-progress-bar");c&&c.remove();const u=[];let p=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,d);const f=l.some(x=>x.id==="growth"||x.id==="hatch"||x.id==="coin");if(p.shouldGroup&&!f&&(p.matchingPets.every(b=>b.currentStrength>=b.maxStrength)||(p={shouldGroup:false,matchingPets:[],remainingPets:i})),p.shouldGroup&&p.matchingPets.length>=2){const x=l.filter(v=>!v.hasContent||v.hasContent(p.matchingPets,a)),b=x.find(v=>v.id==="growth"||v.id==="hatch"||v.id==="coin")||x[0]||l[0],h=this.createGroupedPetRow(a,p.matchingPets,l,b,d,t);r.container.appendChild(h.container),u.push(h.cardState);for(const v of p.remainingPets){const _=a.petIds.indexOf(v.id),k=this.createIndividualPetRow(a,v,_,l,d,t);r.container.appendChild(k.container),u.push(k.cardState);}}else for(let x=0;x<3;x++){const b=a.petIds[x],h=b?s.all.find(_=>_.id===b)??null:null,v=this.createIndividualPetRow(a,h,x,l,d,t,o);r.container.appendChild(v.container),u.push(v.cardState);}r.cards=u;const g=o==="xp"?"xp":o==="growth"?"growth":void 0;this.addProgressBar(r.container,i,t,g);}getAvailableFeaturesForTeam(t,n){return da(t),au.filter(o=>o.isAvailable())}countTotalRows(t,n,o,r){let a=0;for(const i of t)i.countRows?a+=i.countRows(n,o,r):i.hasContent?.(n,o)&&(a+=1);return a}shouldUseCombinedPanel(t,n,o,r){return t.length<2?false:this.countTotalRows(t,n,o,r)<=H_}createCombinedPanelRow(t,n,o,r,a){const i=m("div",{className:"expanded-pet-row expanded-pet-row--combined"}),s=m("div",{className:"pet-row__header pet-row__header--combined"}),l=m("span",{className:"combined-panel__icons",textContent:o.map(h=>h.icon).join(" ")});s.appendChild(l);const d=m("div",{textContent:"COMBINED",className:"pet-label"});s.appendChild(d);const c=m("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),u=m("div",{className:"base-pet-card__left"}),p=m("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const h of n)try{const v=h.mutations||[];if(J.has("pet",h.petSpecies)){const _=J.toCanvas("pet",h.petSpecies,{mutations:v,scale:1,boundsMode:"padded"});_.style.imageRendering="pixelated",p.appendChild(_);}}catch{}u.appendChild(p);const f=m("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const h of n){const _=h.currentStrength>=h.maxStrength?`MAX ${h.maxStrength}`:`STR ${h.currentStrength}/${h.maxStrength}`,k=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:_});f.appendChild(k);}u.appendChild(f),c.appendChild(u);const g=m("div",{className:"base-pet-card__content base-pet-card__content--combined"});for(const h of o){const v=m("div",{className:`combined-section combined-section--${h.id}`}),_=m("span",{className:"combined-section__icon",textContent:h.icon});v.appendChild(_);const k=m("div",{className:"combined-section__content"});h.renderGroupedSlot?h.renderGroupedSlot(n,t,k,r):h.renderPetSlot&&h.renderPetSlot(n[0],t,k,r),(k.children.length>0||k.textContent?.trim())&&(v.appendChild(k),g.appendChild(v));}c.appendChild(g);const b={slotIndex:-1,currentFeatureId:"combined",shell:{root:c,getContentSlot:()=>g,setCentered:h=>{c.classList.toggle("base-pet-card--centered",h);},destroy:()=>{c.remove();},update:()=>{f.innerHTML="";for(const h of n){const _=h.currentStrength>=h.maxStrength?`MAX ${h.maxStrength}`:`STR ${h.currentStrength}/${h.maxStrength}`,k=m("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:_});f.appendChild(k);}},build:()=>c},container:i,featureData:o[0]};return i.appendChild(s),i.appendChild(c),{container:i,cardState:b}}analyzeTeamForGrouping(t,n,o){const r=d=>(d.abilities||[]).some(u=>ee.MAX_STR_BOOST.includes(u)||ee.PET_MUTATION.includes(u)||ee.DOUBLE_HATCH.includes(u)||ee.PET_REFUND.includes(u)),a=n.filter(r);if(a.length>=2&&a.length<=3){const d=n.filter(c=>!a.includes(c));return {shouldGroup:true,matchingPets:a,remainingPets:d}}const i=["DoubleHarvest","ProduceRefund","ProduceRefundII"],s=d=>(d.abilities||[]).some(u=>i.includes(u)),l=n.filter(s);if(l.length>=2&&l.length<=3&&!l.some(c=>(c.abilities||[]).some(p=>ee.EGG_GROWTH.includes(p)||ee.PLANT_GROWTH.includes(p)||ee.CROP_MUTATION.includes(p)))){const c=n.filter(u=>!l.includes(u));return {shouldGroup:true,matchingPets:l,remainingPets:c}}return G_(n,o)}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=Ye.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}const W_={mode:"simple",expandedTeamIds:[]};let it=null,ms=null;async function V_(){return it||(ms||(ms=no("tab-trackers",{version:2,defaults:W_})),it=await ms,it)}function hs(){if(!it)throw new Error("[TrackersState] State not initialized. Call initTrackersState() first.");return it}function q_(e){if(!it)return;const t=it.get();t.expandedTeamIds.includes(e)?it.update({expandedTeamIds:t.expandedTeamIds.filter(o=>o!==e)}):it.update({expandedTeamIds:[...t.expandedTeamIds,e]});}function X_(e){it&&it.update({mode:e});}class K_{constructor(t){U(this,"card",null);U(this,"modeControl",null);U(this,"modeContainer",null);U(this,"content",null);U(this,"listContainer",null);U(this,"options");U(this,"expansionHandler");this.options=t,this.expansionHandler=new U_({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createCard()}destroy(){this.expansionHandler.destroy(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.card=null,this.modeContainer=null,this.content=null,this.listContainer=null;}render(){if(!this.card)return;if(!pe.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamList();}getListContainer(){return this.listContainer}createCard(){const t=m("div",{className:"tracker-card-wrapper"});this.modeContainer=m("div",{className:"tracker-card__mode-container"}),t.appendChild(this.modeContainer),this.content=m("div",{className:"tracker-card__content"}),t.appendChild(this.content);const n=Be({title:"Trackers",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(!this.modeContainer)return;const t=hs().get();if(!this.modeControl){this.modeControl=xm({segments:[{id:"simple",label:"Simple"},{id:"detailed",label:"Detailed"}],selected:t.mode,onChange:n=>{X_(n),this.renderTeamList();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==t.mode&&this.modeControl.select(t.mode);}renderDisabledState(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=m("div",{className:"tracker-card__disabled-state"}),n=m("div",{textContent:"Pet Teams feature is not enabled",className:"tracker-card__disabled-message"});t.appendChild(n),this.content.replaceChildren(t);}renderTeamList(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.content.replaceChildren();const t=pe.getAllTeams(),n=pe.getActiveTeamId(),o=hs().get();if(t.length===0){this.renderEmptyState();return}this.listContainer=m("div",{className:"tracker-card__list-container"}),t.forEach(r=>{const a=n===r.id,i=o.expandedTeamIds.includes(r.id),s=bm({team:r,isActive:a,hideDragHandle:true,isNameEditable:false,isExpanded:i,onExpandClick:()=>{this.handleExpandToggle(r.id);}});s.setAttribute("data-team-id",r.id),s.addEventListener("click",l=>{l.stopPropagation();}),this.listContainer.appendChild(s),i&&this.expansionHandler.expand(r.id);}),this.content.appendChild(this.listContainer);}renderEmptyState(){if(!this.content)return;const t=m("div",{className:"tracker-card__empty-state"}),n=m("div",{textContent:"No teams created yet.",className:"tracker-card__empty-message"}),o=m("div",{textContent:"Create teams in the Pets tab to view trackers.",className:"tracker-card__empty-hint"});t.appendChild(n),t.appendChild(o),this.content.appendChild(t);}handleExpandToggle(t){q_(t),this.expansionHandler.toggle(t);const n=this.listContainer?.querySelector(`[data-team-id="${t}"]`);if(n){const o=hs().get().expandedTeamIds.includes(t),r=n.querySelector(".team-list-item__expand");r&&r.classList.toggle("team-list-item__expand--open",o);}}}const Y_=`
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
/* Mode Container (Simple / Detailed toggle)                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

.tracker-card__mode-container {
  display: flex;
  justify-content: center;
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
`,J_=`
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
}

.team-progress-bar__fill {
    height: 100%;
    border-radius: 7px;
    transition: width 0.3s ease;
}

/* Color coding for team progress bar */
.team-progress-bar__fill--low {
    background: linear-gradient(90deg, color-mix(in srgb, var(--xp-fill) 30%, transparent), color-mix(in srgb, var(--xp-fill) 50%, transparent));
}
.team-progress-bar__fill--medium {
    background: linear-gradient(90deg, color-mix(in srgb, var(--xp-fill) 50%, transparent), color-mix(in srgb, var(--xp-fill) 80%, transparent));
}
.team-progress-bar__fill--high {
    background: linear-gradient(90deg, color-mix(in srgb, var(--xp-fill) 80%, transparent), var(--xp-fill));
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

`,Q_=`
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
`,Z_=`
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
`,eT=`
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
`;class tT extends wn{constructor(n){super({id:"tab-trackers",label:"Trackers"});U(this,"deps");U(this,"trackerCardPart",null);U(this,"unsubscribeMyPets");this.deps=n;}async build(n){this.container=n;const{MGSprite:o}=await ao(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>ac);return {MGSprite:i}},void 0);await o.init(),await V_();const r=n.getRootNode();this.injectStyles(r);const a=this.createGrid("12px");a.id="trackers",n.appendChild(a),this.initializeTrackerCard(a),this.unsubscribeMyPets=fe.myPets.subscribeStable(()=>{this.trackerCardPart?.render();});}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.trackerCardPart&&(this.trackerCardPart.destroy(),this.trackerCardPart=null);}unmount(){this.destroy().catch(console.error),super.unmount();}injectStyles(n){Ie(n,Y_,"tracker-card-styles"),Ie(n,J_,"team-card-styles"),Ie(n,Q_,"feature-card-styles"),Ie(n,Z_,"team-xp-panel-styles"),Ie(n,eT,"growth-panel-styles"),Ie(n,wm,"base-pet-card-styles"),Ie(n,Lc,"badge-styles"),Ie(n,Sm,"arcade-button-styles"),Ie(n,ym,"gemini-icon-button-styles");}initializeTrackerCard(n){this.trackerCardPart||(this.trackerCardPart=new K_({setHUDOpen:this.deps?.setHUDOpen}));const o=this.trackerCardPart.build();n.appendChild(o),this.trackerCardPart.render();}}const nT=`
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
`,su={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function oT(){const e=await no("tab-alerts",{version:1,defaults:su,sanitize:r=>({ui:{expandedCards:Oa(su.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const a=e.get();e.update({ui:{...a.ui,...r,expandedCards:Oa(a.ui.expandedCards,r.expandedCards)}});}function n(r,a){const i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[r]:!!a}}});}function o(r){const a=e.get();n(r,!a.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}const rT={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},lu={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},aT={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},iT={seed:"seed",tool:null,egg:null,decor:null},cu={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function Fc(e,t,n){try{const o=aT[t],r=te.get(o);if(!r||typeof r!="object")return null;const a=r[e];if(!a||typeof a!="object")return null;const i=iT[t],s=i?a[i]:a;return !s||typeof s!="object"?null:s[n]??null}catch(o){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,o),null}}function sT(e,t){return Fc(e,t,"spriteId")}function lT(e,t){const n=Fc(e,t,"rarity");return n?String(n).toLowerCase():null}function cT(e,t){return Fc(e,t,"name")??e}function dT(){const e=Xt.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function du(e){const t=dT(),n=[],o=["seed","tool","egg","decor"];for(const r of o){const a=e.byType[r];if(a)for(const i of a.items){const s=`${r}:${i.id}`;n.push({...i,shopType:r,rarity:lT(i.id,r),spriteId:sT(i.id,r),itemName:cT(i.id,r),isTracked:t.has(s),hasCustomSound:de.hasItemCustomSound("shop",i.id,r)});}}return n}const uT=`
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
`,pT={size:"md",closeOnBackdrop:true,closeOnEscape:true};function fT(e){const t={...pT,...e};let n=false,o=null,r=null,a=null,i=null,s=null;function l(){g(),t.onClose?.();}function d(w){t.closeOnBackdrop&&w.target===r&&l();}function c(w){t.closeOnEscape&&w.key==="Escape"&&l();}function u(){if(!a)return;const w=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),y=Array.from(a.querySelectorAll(w));if(y.length===0)return;const S=y[0],I=y[y.length-1];S.focus();const C=A=>{A.key==="Tab"&&(A.shiftKey?document.activeElement===S&&(A.preventDefault(),I.focus()):document.activeElement===I&&(A.preventDefault(),S.focus()));};a.addEventListener("keydown",C),i=()=>{a?.removeEventListener("keydown",C);};}function p(){o=m("div",{className:"modal-container"}),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-labelledby","modal-title");const w=m("style");w.textContent=uT,o.appendChild(w),r=m("div",{className:"modal-backdrop"}),r.addEventListener("click",d),o.appendChild(r),a=m("div",{className:`modal-dialog modal-dialog--${t.size}`});const y=m("div",{className:"modal-header"}),S=m("h2",{className:"modal-title",id:"modal-title"},t.title);y.appendChild(S);const I=m("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");I.addEventListener("click",l),y.appendChild(I),a.appendChild(y);const C=m("div",{className:"modal-body"});if(C.appendChild(t.content),a.appendChild(C),t.footer){const A=m("div",{className:"modal-footer"});A.appendChild(t.footer),a.appendChild(A);}return r.appendChild(a),o}function f(){if(!o)return;const w=o.getBoundingClientRect(),y=window.innerWidth,S=window.innerHeight;Math.abs(w.left)>1||Math.abs(w.top)>1||Math.abs(w.width-y)>1||Math.abs(w.height-S)>1?(o.style.left=`${-w.left}px`,o.style.top=`${-w.top}px`,o.style.width=`${y}px`,o.style.height=`${S}px`):(o.style.left="0px",o.style.top="0px",o.style.width="100%",o.style.height="100%");}function g(){!n||!o||(o.classList.remove("is-open"),n=false,i&&(i(),i=null),document.removeEventListener("keydown",c),s?.(),s=null,setTimeout(()=>{o?.remove();},200));}function x(){n&&g(),r?.removeEventListener("click",d),i&&(i(),i=null),document.removeEventListener("keydown",c),s?.(),s=null,o?.remove(),o=null,r=null,a=null;}const b=p();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(b),requestAnimationFrame(f);const k=()=>f();return window.addEventListener("resize",k),s=()=>{window.removeEventListener("resize",k);},requestAnimationFrame(()=>{o?.classList.add("is-open"),n=true,u(),document.addEventListener("keydown",c);}),{root:b,close:g,destroy:x}}function Em(e={}){const{id:t,min:n=0,max:o=100,step:r=1,value:a=n,label:i,showValue:s=true,disabled:l=false,onInput:d,onChange:c}=e,u=m("div",{className:"slider"}),p=m("div",{className:"slider-row"}),f=m("div",{className:"slider-track"}),g=m("div",{className:"slider-range"});f.appendChild(g);const x=m("input",{id:t,type:"range",min:String(n),max:String(o),step:String(r),value:String(a),disabled:l});x.addEventListener("input",S=>{h(),d?.(_(),S);}),x.addEventListener("change",S=>c?.(_(),S));function b(){const S=o-n;return S===0?0:(_()-n)/S}function h(){const S=Math.max(0,Math.min(1,b()));g.style.width=`${S*100}%`,y&&(y.textContent=String(_()));}function v(S){x.value=String(S),h();}function _(){return Number(x.value)}function k(S){x.disabled=!!S;}let w=null,y=null;return i&&(w=m("span",{className:"slider-label"},i),p.appendChild(w)),f.appendChild(x),p.appendChild(f),s&&(y=m("span",{className:"slider-value"},String(a)),p.appendChild(y)),u.append(p),h(),{root:u,input:x,setValue:v,getValue:_,setDisabled:k}}const uu=`
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
`,gT={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},pu={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},mT=220;function hT(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function bT(e){const t=hT();if(t){Ie(t,uu,"customSoundModal");return}const n=m("style");n.textContent=uu,e.appendChild(n);}function Am(e){const t={...gT,...e};let n=null,o=null,r=null,a=null,i=null,s=null,l=null,d=null,c=null,u=false,p=false,f=null;function g(){c?.(),c=null,d&&(d.pause(),d.currentTime=0),d=null,r?.setLabel("Play");}async function x(){if(d){g();return}if(!l)return;const $=de.getById(l.soundId);if(!$){console.error(`[CustomSoundModal] Sound not found: ${l.soundId}`);return}const Y=new Audio($.source);Y.volume=l.volume/100,d=Y;const B=()=>{g();},j=()=>{g(),console.error(`[CustomSoundModal] Failed to play sound: ${$.name}`);};Y.addEventListener("ended",B),Y.addEventListener("error",j),c=()=>{Y.removeEventListener("ended",B),Y.removeEventListener("error",j);};try{await Y.play(),r?.setLabel("Stop");}catch(N){g(),console.error("[CustomSoundModal] Failed to play sound:",N);}}function b(){s&&l&&(s.textContent=pu[l.mode]);}function h(){u||f!==null||(f=window.setTimeout(()=>{k();},mT));}function v(){u||p||(p=true,g(),t.onClose?.(),h());}function _(){u||(n?.close(),v());}function k(){u||(u=true,p=true,f!==null&&(window.clearTimeout(f),f=null),g(),o&&(o.destroy(),o=null),i&&(i.destroy(),i=null),a=null,r=null,s=null,l=null,n&&(n.destroy(),n=null));}function w(){const $=m("span",{className:"custom-sound-modal-title"});let Y=false;if(e.spriteId)try{const j=J.toCanvas(e.spriteId);if(j){const N=m("span",{className:"custom-sound-modal-title-icon"});j.className="custom-sound-modal-title-sprite",N.appendChild(j),$.appendChild(N),Y=!0;}}catch{}if(!Y&&e.icon){const j=m("span",{className:"custom-sound-modal-title-icon"},e.icon);$.appendChild(j);}const B=m("span",{className:"custom-sound-modal-title-text"},e.entityName);return $.appendChild(B),$}function y(){const $=m("div",{className:"custom-sound-modal-body"}),Y=de.getItemCustomSound(e.entityType,e.entityId,e.shopType),B=de.getNotificationConfig(e.entityType);l=Y?{soundId:Y.soundId,volume:Y.volume,mode:Y.mode}:{soundId:B.soundId,volume:B.volume,mode:B.mode};const j=de.getAll().map(M=>({value:M.id,label:M.name})),N=m("div",{className:"custom-sound-modal-row"}),O=m("label",{className:"custom-sound-modal-label"},"Sound");N.appendChild(O);const z=m("div",{className:"custom-sound-modal-controls"});o=Xn({value:l.soundId,options:j,size:"sm",onChange:M=>{l&&(l.soundId=M),g();}}),z.appendChild(o.root),r=rt({label:"Play",variant:"default",size:"sm",onClick:()=>x()}),z.appendChild(r),N.appendChild(z),$.appendChild(N);const D=m("div",{className:"custom-sound-modal-row"}),H=m("label",{className:"custom-sound-modal-label"},"Volume");D.appendChild(H),a=Em({min:0,max:100,step:1,value:l.volume,showValue:true,onChange:M=>{l&&(l.volume=M),d&&(d.volume=M/100);}}),D.appendChild(a.root),$.appendChild(D);const E=m("div",{className:"custom-sound-modal-row"}),P=m("label",{className:"custom-sound-modal-label"},"Mode");E.appendChild(P);const T=m("div",{className:"custom-sound-modal-mode-controls"});return i=Xn({value:l.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:M=>{l&&(l.mode=M),b();}}),T.appendChild(i.root),s=m("div",{className:"custom-sound-modal-mode-description"},pu[l.mode]),T.appendChild(s),E.appendChild(T),$.appendChild(E),$}function S(){const $=m("div",{className:"custom-sound-modal-footer"}),Y=rt({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),_();}});$.appendChild(Y);const B=m("div",{style:"flex: 1"});$.appendChild(B);const j=rt({label:"Cancel",variant:"default",size:"sm",onClick:()=>_()});$.appendChild(j);const N=rt({label:"Save",variant:"primary",size:"sm",onClick:()=>{l&&e.onSave({...l}),_();}});return $.appendChild(N),$}const I=y(),C=S(),A=m("div");bT(A),A.appendChild(I),n=fT({title:e.entityName||t.title,content:A,footer:C,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:v}),n.root.classList.add("custom-sound-modal");const R=n.root.querySelector(".modal-title");return R&&R.replaceChildren(w()),{root:n.root,close:_,destroy:k}}const xT=["seed","tool","egg","decor"],yT=new Set(xT);function bs(e){const[t,...n]=e.split(":");return !t||n.length===0||!yT.has(t)?null:{shopType:t,itemId:n.join(":")}}const vT=500,fu=10,wT=800;function ST(e){const{rows:t}=e,n=new Map;let o=null,r=false;const a=new Map;let i=null,s=null,l=null,d=null,c=null,u=false;function p(T,M){M?T.classList.add("has-custom-sound"):T.classList.remove("has-custom-sound");}function f(T){const M=bs(T);return M?de.hasItemCustomSound("shop",M.itemId,M.shopType):false}function g(T){if(!o)return null;const M=o.root.querySelectorAll(".lg-tr-body");for(const X of M)if(X.dataset.id===T)return X;return null}function x(T,M){const X=g(T);if(!X)return;const G=M??f(T);p(X,G);}function b(){if(!o)return;o.root.querySelectorAll(".lg-tr-body").forEach(M=>{const X=M.dataset.id;X&&p(M,f(X));});}function h(){r||(r=true,requestAnimationFrame(()=>{r=false,b();}));}function v(T){a.clear();for(const M of T)a.set(`${M.shopType}:${M.id}`,M);}function _(T){const M=bs(T);return M?de.hasItemCustomSound("shop",M.itemId,M.shopType):false}function k(T){const M=bs(T);if(!M||!de.hasItemCustomSound("shop",M.itemId,M.shopType))return;de.removeItemCustomSound("shop",M.itemId,M.shopType);const X=a.get(T);X&&(X.hasCustomSound=false),x(T,false),h();}function w(){s!==null&&(window.clearTimeout(s),s=null),i=null;}function y(T){i=T,s!==null&&window.clearTimeout(s),s=window.setTimeout(()=>{s=null,i=null;},wT);}function S(){l!==null&&(window.clearTimeout(l),l=null),d=null,c=null,u=false;}if(o=ii({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(T,M)=>T.itemName.localeCompare(M.itemName,void 0,{numeric:true,sensitivity:"base"}),render:T=>{const M=m("div",{className:"shop-item-cell"}),X=m("div",{className:"shop-item-icon"});if(T.spriteId){const V=J.toCanvas(T.spriteId);V?(V.className="shop-item-sprite",X.appendChild(V)):X.textContent=lu[T.shopType];}else X.textContent=lu[T.shopType];const G=m("div",{className:"shop-item-name"});return G.textContent=T.itemName,M.appendChild(X),M.appendChild(G),M}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(T,M)=>{const X=T.rarity?cu[T.rarity.toLowerCase()]??999:999,G=M.rarity?cu[M.rarity.toLowerCase()]??999:999;return X-G},render:T=>{const M=m("div",{className:"shop-item-rarity"}),X=Er({variant:"rarity",rarity:T.rarity});return M.appendChild(X.root),M}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:T=>{const M=m("div",{className:"shop-item-notify"}),X=Dd(T.id,T.shopType),G=hn({checked:T.isTracked,disabled:X,size:"sm",onChange:ne=>{T.isTracked=ne,ne?Xt.addTrackedItem(T.shopType,T.id):Xt.removeTrackedItem(T.shopType,T.id);}}),V=`${T.shopType}:${T.id}`;return n.set(V,G),M.appendChild(G.root),M}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:T=>`${T.shopType}:${T.id}`,onSortChange:()=>{h();},onRowClick:(T,M,X)=>{const G=`${T.shopType}:${T.id}`;if(i){if(i===G){w();return}w();}X.target.closest(".shop-item-notify")||Am({entityType:"shop",entityId:T.id,entityName:T.itemName,spriteId:T.spriteId,shopType:T.shopType,onSave:ne=>{ne===null?(de.removeItemCustomSound("shop",T.id,T.shopType),T.hasCustomSound=false,x(G,false)):(de.setItemCustomSound("shop",T.id,ne,T.shopType),T.hasCustomSound=true,x(G,true));}});}}),!o)throw new Error("[ShopsCard] Failed to create items table");v(t);const C=o.root,A=T=>{const M=T.target;if(M.closest(".shop-item-notify"))return;const G=M.closest(".lg-tr-body")?.dataset.id;!G||!_(G)||(T.preventDefault(),T.stopPropagation(),y(G),k(G));},R=T=>{if(T.pointerType==="mouse"||T.button!==0)return;const M=T.target;if(M.closest(".shop-item-notify"))return;const G=M.closest(".lg-tr-body")?.dataset.id;!G||!_(G)||(S(),d=G,c={x:T.clientX,y:T.clientY},l=window.setTimeout(()=>{l=null,d&&(u=true,y(d),k(d));},vT));},$=T=>{if(!c||!d||u)return;const M=T.clientX-c.x,X=T.clientY-c.y;M*M+X*X>fu*fu&&S();},Y=()=>{S();},B=()=>{S();};C.addEventListener("contextmenu",A),C.addEventListener("pointerdown",R),C.addEventListener("pointermove",$),C.addEventListener("pointerup",Y),C.addEventListener("pointercancel",B);const j=o.setData.bind(o);o.setData=T=>{v(T),j(T),h();},h();const N=T=>{for(const[M,X]of n.entries()){const[G,V]=M.split(":");if(T&&G!==T)continue;const ne=Dd(V,G);X.setDisabled(ne);}},z=bt().subscribeStable(()=>{N();}),D=_i(),H=D.subscribeDecorPlaced(()=>{N("decor");}),E=D.subscribeDecorRemoved(()=>{N("decor");}),P=o.destroy.bind(o);return o.destroy=()=>{z(),H(),E(),C.removeEventListener("contextmenu",A),C.removeEventListener("pointerdown",R),C.removeEventListener("pointermove",$),C.removeEventListener("pointerup",Y),C.removeEventListener("pointercancel",B),S(),w(),n.clear(),a.clear(),P();},o}function CT(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function kT(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=m("div",{className:"select"});for(const c of Array.from(e.classList))c.startsWith("select--")&&r.classList.add(c);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const a=m("button",{className:"select-trigger",type:"button"});a.style.width="auto",a.style.minWidth="0",a.style.whiteSpace="nowrap";const i=e.querySelector(".select-caret")?.textContent||"v",s=m("span",{className:"select-value"},t),l=m("span",{className:"select-caret"},i);a.append(s,l),r.appendChild(a),o.appendChild(r);const d=Math.ceil(a.getBoundingClientRect().width);return r.remove(),d}function IT(e,t){const n=CT(t);if(!n)return;let o=0;const r=6,a=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(a);return}const i=kT(e,n);i>0&&(e.style.width=`${i}px`,e.style.minWidth=`${i}px`);};requestAnimationFrame(a);}function _T(e){const t=io(),n=t.get();let o=null,r=[],a=[];const i={selectedShopType:"all",searchQuery:""},s={shopTypeSelect:null,searchInput:null,tableHandle:null};let l=0,d=new Set;function c(b,h){if(b.size!==h.size)return  false;for(const v of b)if(!h.has(v))return  false;return  true}function u(){if(!s.tableHandle)return;const b=r.filter(h=>!(i.selectedShopType!=="all"&&h.shopType!==i.selectedShopType||i.searchQuery&&!h.itemName.toLowerCase().includes(i.searchQuery.toLowerCase())));a=b,s.tableHandle.setData(b);}function p(){const b=m("div",{className:"shops-card-filters"}),v=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(k=>({value:k,label:rT[k]}))];s.shopTypeSelect=Xn({value:"all",options:v,size:"sm",onChange:k=>{i.selectedShopType=k,u();}});const _=s.shopTypeSelect.root;return _.style.minWidth="0",_.style.width="auto",IT(_,v.map(k=>k.label)),s.searchInput=si({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:k=>{i.searchQuery=k.trim(),u();}}),b.appendChild(s.shopTypeSelect.root),b.appendChild(s.searchInput.root),b}function f(){r=du(n),a=[...r],l=r.length,d=new Set(r.map(w=>w.shopType));const b=m("div");s.tableHandle=ST({rows:a});const h=p();b.appendChild(h),b.appendChild(s.tableHandle.root);const v=m("div",{className:"shops-card-hint"}),_=m("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),k=m("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return v.append(_,k),b.appendChild(v),o=Be({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},b),o}function g(){const b=t.get(),h=du(b),v=h.length,_=new Set(h.map(w=>w.shopType));(v!==l||!c(_,d))&&(l=v,d=_,r=h,u());}function x(){if(s.tableHandle&&(s.tableHandle.destroy(),s.tableHandle=null),s.shopTypeSelect&&(s.shopTypeSelect.destroy(),s.shopTypeSelect=null),s.searchInput){const b=s.searchInput.root.__cleanup;b&&b(),s.searchInput=null;}o=null;}return {root:f(),refresh:g,destroy:x}}const TT=".mp3,.wav,.ogg,audio/*",ET=250*1024,AT=3;function PT(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function MT(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function LT(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function Pm(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function RT(e,t){const n=Pm(t);if(!n.length)return  true;const o=e.name.toLowerCase(),r=e.type.toLowerCase();return n.some(a=>{const i=a.toLowerCase();if(i.startsWith("."))return o.endsWith(i);if(i.endsWith("/*")){const s=i.slice(0,-1);return r.startsWith(s)}return r===i})}function NT(e){const n=Pm(e).map(o=>o.startsWith(".")?o.slice(1).toUpperCase():o.endsWith("/*")?"Audio":o.includes("/")&&o.split("/")[1]?.toUpperCase()||o.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function FT(e={}){const{id:t,className:n,label:o="Add sounds",hint:r,accept:a=TT,multiple:i=true,disabled:s=false,maxSizeBytes:l=ET,maxItems:d,emptyLabel:c="No sounds added yet",onItemsChange:u,onFilesAdded:p,onError:f}=e;let g=[],x=0,b=null,h=false,v=!!s,_=null,k=null,w=null;const y=new Map,S=new Map,I=Number.isFinite(d)?Math.max(1,Number(d)):i?Number.POSITIVE_INFINITY:1,C=m("div",{className:"sound-picker",id:t});n&&C.classList.add(...n.split(" ").filter(Boolean)),v&&C.classList.add("is-disabled");const A=m("div",{className:"sound-picker__header"}),R=m("div",{className:"sound-picker__label"},o),$=r??`${NT(a)} - Max ${LT(l)}`,Y=m("div",{className:"sound-picker__hint"},$);A.append(R,Y);const B=m("div",{className:"sound-picker__zone",role:"button",tabIndex:v?-1:0,"aria-disabled":String(v)}),j=m("div",{className:"sound-picker__zone-text"}),N=m("div",{className:"sound-picker__zone-title"},"Drop audio files here"),O=m("div",{className:"sound-picker__zone-subtitle"},"or click to browse");j.append(N,O);const z=rt({label:i?"Choose files":"Choose file",size:"sm",onClick:F=>{F.preventDefault(),v||D.click();},disabled:v});z.classList.add("sound-picker__pick");const D=m("input",{className:"sound-picker__input",type:"file",accept:a,multiple:i?true:void 0,disabled:v,tabIndex:-1});B.append(j,z,D);const H=m("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),E=m("div",{className:"sound-picker__list",role:"list"});C.append(A,B,H,E);function P(F,K="info"){const Q=F??"";H.textContent=Q,H.classList.toggle("is-error",K==="error");}function T(F){f?.(F),P(F.message,"error");}function M(){for(const F of y.values())try{F.destroy();}catch{}y.clear();}function X(F){const K=S.get(F.id);if(K)return K;const Q=F.file.__sourceUrl;if(Q)return S.set(F.id,Q),Q;const re=URL.createObjectURL(F.file);return S.set(F.id,re),re}function G(F){const K=S.get(F);K&&(K.startsWith("blob:")&&URL.revokeObjectURL(K),S.delete(F));}function V(){w?.(),w=null,_&&(_.pause(),_.currentTime=0),_=null,k=null;}function ne(){E.querySelectorAll(".sound-picker__item").forEach(K=>{const Q=K.dataset.id,re=K.querySelector(".sound-picker__item-btn--play");if(!Q||!re)return;const Z=!!_&&k===Q&&!_.paused;re.textContent=Z?"Stop":"Play",K.classList.toggle("is-playing",Z);});}function Te(F){if(v)return;if(k===F.id){V(),ne();return}V();const K=X(F),Q=new Audio(K);_=Q,k=F.id;const re=()=>{k===F.id&&(V(),ne());},Z=()=>{k===F.id&&(V(),ne(),T({code:"type",file:F.file,message:`Unable to play ${F.name}`}));};Q.addEventListener("ended",re),Q.addEventListener("error",Z),w=()=>{Q.removeEventListener("ended",re),Q.removeEventListener("error",Z);},Q.play().then(()=>{ne();}).catch(()=>{V(),ne(),T({code:"type",file:F.file,message:`Unable to play ${F.name}`});});}function Xe(){if(M(),E.classList.toggle("is-scrollable",g.length>AT),!g.length){const K=m("div",{className:"sound-picker__empty"});K.append(typeof c=="string"?document.createTextNode(c):c),E.replaceChildren(K);return}const F=g.map(K=>zi(K));if(E.replaceChildren(...F),b){const K=y.get(b);K&&requestAnimationFrame(()=>K.focus());}ne();}function zi(F){const K=b===F.id,Q=m("div",{className:"sound-picker__item",role:"listitem","data-id":F.id}),re=m("div",{className:"sound-picker__item-top"});m("div",{className:"sound-picker__item-bottom"});const Z=m("div",{className:"sound-picker__item-name"});if(K&&!v){const me=hl({value:F.name,blockGameKeys:true,onEnter:Ce=>{Kt(F.id,Ce);}});me.root.classList.add("sound-picker__rename"),me.input.classList.add("input--sm"),me.input.setAttribute("aria-label","Rename sound"),me.input.addEventListener("keydown",Ce=>{Ce.key==="Escape"&&(Ce.preventDefault(),po());}),me.input.addEventListener("blur",()=>{if(h){h=false;return}Kt(F.id,me.getValue());}),y.set(F.id,me),Z.appendChild(me.root);}else {const me=m("div",{className:"sound-picker__item-label",title:F.name},F.name);Z.appendChild(me);}const ie=m("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(K&&!v){const me=m("button",{className:"sound-picker__item-btn",type:"button",disabled:v},"Save");me.addEventListener("click",()=>{const he=y.get(F.id);Kt(F.id,he?.getValue()??F.name);});const Ce=m("button",{className:"sound-picker__item-btn",type:"button",disabled:v},"Cancel");Ce.addEventListener("pointerdown",()=>{h=true;}),Ce.addEventListener("click",()=>po()),ie.append(me,Ce);}else {const me=m("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:v},k===F.id?"Stop":"Play");me.addEventListener("click",()=>Te(F));const Ce=m("button",{className:"sound-picker__item-btn",type:"button",disabled:v},"Rename");Ce.addEventListener("click",()=>{v||(b=F.id,Xe());});const he=m("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:v},"Remove");he.addEventListener("click",()=>fo(F.id)),ie.append(me,Ce,he);}return re.append(Z,ie),Q.append(re),Q}function Ft(){return g.slice()}function Tt(F){const K=F.slice(),Q=new Set(K.map(re=>re.id));for(const re of Array.from(S.keys()))Q.has(re)||G(re);k&&!Q.has(k)&&V(),g=K,b=null,Xe(),u?.(Ft());}function Tn(F){if(v)return;const K=Array.from(F??[]);if(!K.length)return;const Q=[],re=[];for(const he of K){if(a&&!RT(he,a)){re.push({code:"type",file:he,message:`Unsupported file type: ${he.name}`});continue}if(Number.isFinite(l)&&he.size>l){re.push({code:"size",file:he,maxSizeBytes:l,message:`File too large: ${he.name}`});continue}Q.push({id:PT(),file:he,name:MT(he),size:he.size,type:he.type});}if(!Q.length){re.length&&T(re[0]);return}const Z=i?g.slice():[],ie=Number.isFinite(I)?Math.max(0,I-Z.length):Q.length;if(ie<=0){T({code:"limit",message:`Maximum of ${Math.max(1,I)} files reached`});return}const me=Q.slice(0,ie),Ce=i?Z.concat(me):me.slice(0,1);Tt(Ce),P(null),p?.(me.slice()),re.length&&T(re[0]);}function Nr(F,K){const Q=K.trim();if(!Q){T({code:"name",message:"Name cannot be empty"});return}const re=g.map(Z=>Z.id===F?{...Z,name:Q}:Z);Tt(re),P(null);}function Kt(F,K){const Q=K.trim();if(!Q){T({code:"name",message:"Name cannot be empty"});return}Nr(F,Q);}function po(){b=null,P(null),Xe();}function fo(F){const K=g.filter(Q=>Q.id!==F);Tt(K),P(null);}function Yt(){V(),Tt([]),P(null);}function Gi(F){v=!!F,C.classList.toggle("is-disabled",v),B.setAttribute("aria-disabled",String(v)),B.tabIndex=v?-1:0,D.disabled=v,z.setDisabled(v),v&&V(),Xe();}function Fr(){v||D.click();}const Jt=F=>{if(v)return;const K=F.target;K&&K.closest(".sound-picker__pick")||D.click();},Qt=F=>{v||(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),D.click());},Or=F=>{v||!F.dataTransfer||!F.dataTransfer.types.includes("Files")||(F.preventDefault(),x+=1,B.classList.add("is-dragover"));},$r=F=>{v||!F.dataTransfer||!F.dataTransfer.types.includes("Files")||(F.preventDefault(),F.dataTransfer.dropEffect="copy");},Dr=F=>{v||B.classList.contains("is-dragover")&&(F.preventDefault(),x=Math.max(0,x-1),x<=0&&(x=0,B.classList.remove("is-dragover")));},Br=F=>{v||!F.dataTransfer||!F.dataTransfer.files.length||(F.preventDefault(),x=0,B.classList.remove("is-dragover"),Tn(F.dataTransfer.files));},oe=()=>{if(v){D.value="";return}D.files&&Tn(D.files),D.value="";};return B.addEventListener("click",Jt),B.addEventListener("keydown",Qt),B.addEventListener("dragenter",Or),B.addEventListener("dragover",$r),B.addEventListener("dragleave",Dr),B.addEventListener("drop",Br),D.addEventListener("change",oe),Xe(),{root:C,getItems:Ft,setItems:Tt,addFiles:Tn,renameItem:Nr,removeItem:fo,clear:Yt,setDisabled:Gi,openPicker:Fr,setStatus:P,destroy(){M(),V();for(const F of Array.from(S.keys()))G(F);B.removeEventListener("click",Jt),B.removeEventListener("keydown",Qt),B.removeEventListener("dragenter",Or),B.removeEventListener("dragover",$r),B.removeEventListener("dragleave",Dr),B.removeEventListener("drop",Br),D.removeEventListener("change",oe),C.remove();}}}const gu={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function OT(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function $T(e,t){const n=e.getRootNode(),o=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!o)return 0;const r=m("div",{className:"select"});for(const c of Array.from(e.classList))c.startsWith("select--")&&r.classList.add(c);r.style.position="absolute",r.style.visibility="hidden",r.style.pointerEvents="none",r.style.left="-9999px",r.style.top="-9999px",r.style.minWidth="0";const a=m("button",{className:"select-trigger",type:"button"});a.style.width="auto",a.style.minWidth="0",a.style.whiteSpace="nowrap";const i=e.querySelector(".select-caret")?.textContent||"v",s=m("span",{className:"select-value"},t),l=m("span",{className:"select-caret"},i);a.append(s,l),r.appendChild(a),o.appendChild(r);const d=Math.ceil(a.getBoundingClientRect().width);return r.remove(),d}function DT(e,t){const n=OT(t);if(!n)return;let o=0;const r=6,a=()=>{if(o+=1,!e.isConnected){o<r&&requestAnimationFrame(a);return}const i=$T(e,n);i>0&&(e.style.width=`${i}px`,e.style.minWidth=`${i}px`);};requestAnimationFrame(a);}function BT(e){let t=null,n=null,o=null;const r=new Map,a=new Map,i=new Map;let s=null,l=null,d=null;function c(){d?.(),d=null,s&&(s.pause(),s.currentTime=0),s=null,l=null;}function u(){if(!o)return;o.querySelectorAll(".notification-item").forEach(y=>{const S=y.dataset.type,I=y.querySelector(".notification-item-play");if(!S||!I)return;const C=!!s&&l===S&&!s.paused;I.textContent=C?"Stop":"Play",y.classList.toggle("is-playing",C);});}async function p(w){if(l===w){c(),u();return}c();const y=de.getNotificationConfig(w),S=de.getById(y.soundId);if(!S){console.error(`[SettingCard] Sound not found: ${y.soundId}`);return}const I=new Audio(S.source);I.volume=y.volume/100,s=I,l=w;const C=()=>{l===w&&(c(),u());},A=()=>{l===w&&(c(),u(),console.error(`[SettingCard] Failed to play sound: ${S.name}`));};I.addEventListener("ended",C),I.addEventListener("error",A),d=()=>{I.removeEventListener("ended",C),I.removeEventListener("error",A);};try{await I.play(),u();}catch(R){c(),u(),console.error("[SettingCard] Failed to play sound:",R);}}function f(w,y){if(w.startsWith("data:"))try{const S=w.split(","),I=S[0].match(/:(.*?);/)?.[1]||"audio/mpeg",C=atob(S[1]),A=C.length,R=new Uint8Array(A);for(let $=0;$<A;$++)R[$]=C.charCodeAt($);return new File([R],y,{type:I})}catch(S){return console.error("[SettingCard] Failed to convert data URL to File:",S),new File([],y,{type:"audio/mpeg"})}return new File([],y,{type:"audio/mpeg"})}function g(){const y=de.getAll().map(S=>({value:S.id,label:S.name}));for(const[S,I]of r){const C=de.getNotificationConfig(S);I.setOptions(y),I.setValue(C.soundId);}}function x(w,y,S){const I=m("div",{className:"notification-item","data-type":w}),C=m("div",{className:"notification-item-label"},y);I.appendChild(C);const A=m("div",{className:"notification-item-description"},S);I.appendChild(A);const R=m("div",{className:"notification-item-controls"}),$=de.getNotificationConfig(w),B=de.getAll().map(P=>({value:P.id,label:P.name})),j=Xn({value:$.soundId,options:B,size:"sm",onChange:P=>{const T=de.getNotificationConfig(w);de.setNotificationConfig(w,{soundId:P,volume:T.volume,mode:T.mode});}});r.set(w,j);const N=m("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");N.addEventListener("click",()=>{p(w);}),R.appendChild(j.root),R.appendChild(N),I.appendChild(R);const O=Em({min:0,max:100,step:1,value:$.volume,showValue:true,onChange:P=>{const T=de.getNotificationConfig(w);de.setNotificationConfig(w,{soundId:T.soundId,volume:P,mode:T.mode});}});i.set(w,O),I.appendChild(O.root);const z=m("div",{className:"notification-mode-row"}),D=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],H=Xn({value:$.mode,options:D,size:"sm",onChange:P=>{const T=de.getNotificationConfig(w);de.setNotificationConfig(w,{soundId:T.soundId,volume:T.volume,mode:P}),b(w);}});a.set(w,H),H.root.classList.add("shrink"),DT(H.root,D.map(P=>P.label)),z.appendChild(H.root);const E=m("div",{className:"notification-mode-description"},gu[w][$.mode]);return z.appendChild(E),I.appendChild(z),I}function b(w){if(!o)return;const y=o.querySelector(`[data-type="${w}"]`);if(!y)return;const S=de.getNotificationConfig(w),I=y.querySelector(".notification-mode-description");I&&(I.textContent=gu[w][S.mode]);}function h(){const w=m("div",{className:"alerts-settings-body"});de.init(),o=m("div",{className:"notification-settings"}),o.appendChild(x("shop","Shops restock","Default sound for shop restock alerts")),o.appendChild(x("pet","Pet events","Default sound for pet event alerts")),o.appendChild(x("weather","Weather events","Default sound for weather event alerts")),w.appendChild(o);const y=m("div",{className:"alerts-settings-divider"});w.appendChild(y);const S=de.getAll().map(I=>{const C=f(I.source,I.name);return C.__sourceUrl=I.source,{id:I.id,file:C,name:I.name,size:0,type:I.type}});return n=FT({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:Jn.MAX_SOUNDS,maxSizeBytes:Jn.MAX_SIZE_BYTES,multiple:true,onItemsChange:I=>{v(I),g();},onFilesAdded:I=>{_(I),setTimeout(()=>{g();},100);}}),n.setItems(S),w.appendChild(n.root),t=Be({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},w),t}function v(w){const y=new Set(de.getAll().map(C=>C.id)),S=new Set(w.map(C=>C.id)),I=[];for(const C of y)if(!S.has(C)){I.push(C);try{de.remove(C);}catch(A){console.error(`[SettingCard] Failed to remove sound ${C}:`,A);}}if(I.length>0){const C=["shop","pet","weather"];for(const A of C){const R=de.getNotificationConfig(A);if(I.includes(R.soundId)){de.setNotificationConfig(A,{soundId:"default-notification",volume:R.volume,mode:R.mode});const $=i.get(A);$&&$.setValue(R.volume);}}}for(const C of w)if(y.has(C.id)){const A=de.getById(C.id);if(A&&A.name!==C.name)try{de.update(C.id,{name:C.name});}catch(R){console.error(`[SettingCard] Failed to rename sound ${C.id}:`,R);}}}function _(w){for(const y of w)if(!de.getById(y.id)){const S=new FileReader;S.onload=I=>{const C=I.target?.result;try{const A=de.add(y.name,C,"upload");if(n&&A.id!==y.id){const R=n.getItems().map($=>$.id===y.id?{...$,id:A.id}:$);n.setItems(R);}}catch(A){console.error(`[SettingCard] Failed to add sound ${y.name}:`,A);}},S.onerror=()=>{console.error(`[SettingCard] Failed to read file ${y.name}`);},S.readAsDataURL(y.file);}}function k(){c(),n&&(n.destroy(),n=null);for(const w of r.values())w.destroy();r.clear();for(const w of a.values())w.destroy();a.clear(),i.clear(),t=null;}return {root:h(),destroy:k}}function zT(e){try{const t=te.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function GT(e){try{const t=te.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function HT(e){try{const t=te.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const o=n.mutator;if(!o||typeof o!="object")return "No effects";const r=o.mutation;if(!r)return "No effects";const a=te.get("mutations");if(!a||typeof a!="object")return r;const i=a[r];return !i||typeof i!="object"?r:i.name||r}catch{return "No effects"}}function mu(){const e=te.get("weather");if(!e||typeof e!="object")return [];const t=vn.getTrackedWeathers(),n=new Set(t),o=[];for(const r of Object.keys(e)){if(r==="Sunny")continue;const a={weatherId:r,weatherName:zT(r),spriteId:GT(r),effects:HT(r),isTracked:n.has(r),hasCustomSound:de.hasItemCustomSound("weather",r)};o.push(a);}return o.sort((r,a)=>r.weatherName.localeCompare(a.weatherName)),o}const jT=500,hu=10,UT=800;function WT(e){const{rows:t}=e;let n=null,o=false;const r=new Map;let a=null,i=null,s=null,l=null,d=null,c=false;function u(N,O){O?N.classList.add("has-custom-sound"):N.classList.remove("has-custom-sound");}function p(N){return de.hasItemCustomSound("weather",N)}function f(N){if(!n)return null;const O=n.root.querySelectorAll(".lg-tr-body");for(const z of O)if(z.dataset.id===N)return z;return null}function g(N,O){const z=f(N);if(!z)return;const D=O??p(N);u(z,D);}function x(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(O=>{const z=O.dataset.id;z&&u(O,p(z));});}function b(){o||(o=true,requestAnimationFrame(()=>{o=false,x();}));}function h(N){r.clear();for(const O of N)r.set(O.weatherId,O);}function v(N){return de.hasItemCustomSound("weather",N)}function _(N){if(!de.hasItemCustomSound("weather",N))return;de.removeItemCustomSound("weather",N);const O=r.get(N);O&&(O.hasCustomSound=false),g(N,false),b();}function k(){i!==null&&(window.clearTimeout(i),i=null),a=null;}function w(N){a=N,i!==null&&window.clearTimeout(i),i=window.setTimeout(()=>{i=null,a=null;},UT);}function y(){s!==null&&(window.clearTimeout(s),s=null),l=null,d=null,c=false;}if(n=ii({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(N,O)=>N.weatherName.localeCompare(O.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:N=>{const O=m("div",{className:"weather-item-cell"}),z=m("div",{className:"weather-item-icon"});if(N.spriteId){const H=J.toCanvas(N.spriteId);H?(H.className="weather-item-sprite",z.appendChild(H)):z.textContent=bu(N.weatherId);}else z.textContent=bu(N.weatherId);const D=m("div",{className:"weather-item-name"});return D.textContent=N.weatherName,O.appendChild(z),O.appendChild(D),O}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:N=>{const O=m("div",{className:"weather-item-effects"});return O.textContent=N.effects,O}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:N=>{const O=m("div",{className:"weather-item-notify"}),z=hn({checked:N.isTracked,disabled:false,size:"sm",onChange:D=>{N.isTracked=D,D?vn.addTrackedWeather(N.weatherId):vn.removeTrackedWeather(N.weatherId);}});return O.appendChild(z.root),O}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:N=>N.weatherId,onSortChange:()=>{b();},onRowClick:(N,O,z)=>{const D=N.weatherId;if(a){if(a===D){k();return}k();}z.target.closest(".weather-item-notify")||Am({entityType:"weather",entityId:N.weatherId,entityName:N.weatherName,spriteId:N.spriteId,onSave:E=>{E===null?(de.removeItemCustomSound("weather",N.weatherId),N.hasCustomSound=false,g(D,false)):(de.setItemCustomSound("weather",N.weatherId,E),N.hasCustomSound=true,g(D,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");h(t);const I=n.root,C=N=>{const O=N.target;if(O.closest(".weather-item-notify"))return;const D=O.closest(".lg-tr-body")?.dataset.id;!D||!v(D)||(N.preventDefault(),N.stopPropagation(),w(D),_(D));},A=N=>{if(N.pointerType==="mouse"||N.button!==0)return;const O=N.target;if(O.closest(".weather-item-notify"))return;const D=O.closest(".lg-tr-body")?.dataset.id;!D||!v(D)||(y(),l=D,d={x:N.clientX,y:N.clientY},s=window.setTimeout(()=>{s=null,l&&(c=true,w(l),_(l));},jT));},R=N=>{if(!d||!l||c)return;const O=N.clientX-d.x,z=N.clientY-d.y;O*O+z*z>hu*hu&&y();},$=()=>{y();},Y=()=>{y();};I.addEventListener("contextmenu",C),I.addEventListener("pointerdown",A),I.addEventListener("pointermove",R),I.addEventListener("pointerup",$),I.addEventListener("pointercancel",Y);const B=n.setData.bind(n);n.setData=N=>{h(N),B(N),b();},b();const j=n.destroy.bind(n);return n.destroy=()=>{I.removeEventListener("contextmenu",C),I.removeEventListener("pointerdown",A),I.removeEventListener("pointermove",R),I.removeEventListener("pointerup",$),I.removeEventListener("pointercancel",Y),y(),k(),r.clear(),j();},n}function bu(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function VT(e){let t=null,n=[];const o={tableHandle:null};let r=0;function a(){n=mu(),r=n.length;const l=m("div");o.tableHandle=WT({rows:n}),l.appendChild(o.tableHandle.root);const d=m("div",{className:"weather-card-hint"}),c=m("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),u=m("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return d.append(c,u),l.appendChild(d),t=Be({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},l),t}function i(){const l=mu(),d=l.length;d!==r&&(r=d,n=l,o.tableHandle?.setData(l));}function s(){o.tableHandle&&(o.tableHandle.destroy(),o.tableHandle=null),t=null;}return {root:a(),refresh:i,destroy:s}}function qT(e){let t=null,n=null;function o(){const a=m("div",{className:"pet-card-body"}),i=m("div",{className:"pet-card-row"}),s=gl({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=hn({checked:eo.isEnabled(),onChange:l=>{eo.setEnabled(l);}}),i.appendChild(s.root),i.appendChild(n.root),a.appendChild(i),t=Be({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},a),t}function r(){n&&(n.destroy(),n=null),t=null;}return {root:o(),destroy:r}}class XT extends wn{constructor(){super({id:"tab-alerts",label:"Alerts"});U(this,"sectionElement",null);U(this,"state",null);U(this,"settingCard",null);U(this,"shopsCard",null);U(this,"weatherCard",null);U(this,"petCard",null);}async build(n){this.state=await oT();const o=n.getRootNode();Ie(o,nT,"alerts-styles");const r=this.createGrid("12px");r.id="alerts-section",this.sectionElement=r;const{MGData:a}=await ao(async()=>{const{MGData:d}=await Promise.resolve().then(()=>ac);return {MGData:d}},void 0),i=["plants","items","eggs","decor","weather","mutations"],s=await Promise.allSettled(i.map(d=>a.waitFor(d))),l=i.filter((d,c)=>s[c]?.status==="rejected");l.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",l.join(", ")),this.buildParts(),n.appendChild(r);}render(n){const o=this.shopsCard,r=this.weatherCard,a=this.petCard,i=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=o,this.weatherCard=r,this.petCard=a,this.settingCard=i;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=_T({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:o=>this.state.setCardExpanded("shops",o)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=qT({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:o=>this.state.setCardExpanded("pet",o)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=VT({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:o=>this.state.setCardExpanded("weather",o)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=BT({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:o=>this.state.setCardExpanded("settings",o)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const KT={Store:{select:ye.select.bind(ye),set:ye.set.bind(ye),subscribe:ye.subscribe.bind(ye),subscribeImmediate:ye.subscribeImmediate.bind(ye)},Globals:fe,Modules:{Version:wl,Assets:Sn,Manifest:Lt,Data:te,Environment:Ye,CustomModal:Dn,Sprite:J,Tile:Rt,Pixi:mi,Audio:Ae,Cosmetic:Wl,Calculators:Sf,ShopActions:cn},Features:{AutoFavorite:cc,JournalChecker:qf,BulkFavorite:Xa,Achievements:Jf,Tracker:mm,AntiAfk:mn,Pets:hm,PetTeam:pe,XPTracker:Ya,CropValueIndicator:Ko,CropSizeIndicator:Yo,ShopNotifier:Xt,WeatherNotifier:vn,PetHungerNotifier:eo,AriesAPI:ri},WebSocket:{chat:Qw,emote:Zw,wish:eS,kickPlayer:tS,setPlayerData:nS,usurpHost:oS,reportSpeakingStart:rS,setSelectedGame:aS,voteForGame:iS,requestGame:sS,restartGame:lS,ping:cS,checkWeatherStatus:pS,move:dS,playerPosition:If,teleport:uS,moveInventoryItem:fS,dropObject:gS,pickupObject:mS,toggleFavoriteItem:Ii,putItemInStorage:Zl,retrieveItemFromStorage:ec,moveStorageItem:hS,logItems:bS,plantSeed:xS,waterPlant:yS,harvestCrop:vS,sellAllCrops:wS,purchaseDecor:tc,purchaseEgg:nc,purchaseTool:oc,purchaseSeed:rc,plantEgg:SS,hatchEgg:CS,plantGardenPlant:kS,potPlant:IS,mutationPotion:_S,pickupDecor:TS,placeDecor:ES,removeGardenObject:AS,placePet:_f,feedPet:PS,petPositions:MS,swapPet:Tf,storePet:Ef,namePet:LS,sellPet:RS},_internal:{getGlobals:Et,initGlobals:Lf,destroyGlobals:NC}};function YT(){const e=q;e.Gemini=KT,e.MGSprite=J,e.MGData=te,e.MGPixi=mi,e.MGAssets=Sn,e.MGEnvironment=Ye;}let xs=null,ys=null;function JT(){return xs||(xs=new KC),xs}function Mm(){return ys||(ys=new XT),ys}function QT(e){return [new Qh(e),new JI,new g_,Mm(),new E_(e),new tT(e)]}async function ZT(){const e=Mm(),t=JT();await Promise.all([e.preload(),t.preload()]);}function eE(e){const{shadow:t,initialOpen:n}=e,o=m("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=m("div",{className:"gemini-tabbar"}),a=m("div",{className:"gemini-content",id:"content"}),i=m("div",{className:"gemini-resizer",title:"Resize"}),s=m("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");o.append(r,a,i);const l=m("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:a,resizer:i,closeButton:s,wrapper:l}}function tE(e){const{resizer:t,host:n,shadow:o,onWidthChange:r,initialWidth:a,minWidth:i,maxWidth:s}=e;let l=i,d=s;function c(){const k=Ye.detect(),w=Math.round(q.visualViewport?.width??q.innerWidth??0);if(k.platform==="mobile"||k.os==="ios"||k.os==="android"){const y=getComputedStyle(o.host),S=parseFloat(y.getPropertyValue("--inset-l"))||0,I=parseFloat(y.getPropertyValue("--inset-r"))||0,C=Math.max(280,w-Math.round(S+I));l=280,d=C;}else l=i,d=s;return {min:l,max:d}}function u(k){return Math.max(l,Math.min(d,Number(k)||a))}function p(k){const w=u(k);n.style.setProperty("--w",`${w}px`),r(w);}c();const f=Ye.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let x=false;const b=k=>{if(!x)return;k.preventDefault();const w=Math.round(q.innerWidth-k.clientX);p(w);},h=()=>{x&&(x=false,document.body.style.cursor="",q.removeEventListener("mousemove",b),q.removeEventListener("mouseup",h));},v=k=>{g&&(k.preventDefault(),x=true,document.body.style.cursor="ew-resize",q.addEventListener("mousemove",b),q.addEventListener("mouseup",h));};t.addEventListener("mousedown",v);function _(){t.removeEventListener("mousedown",v),q.removeEventListener("mousemove",b),q.removeEventListener("mouseup",h);}return {calculateResponsiveBounds:c,constrainWidthToLimits:u,setHudWidth:p,destroy:_}}function nE(e){const{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:a=true}=e;function i(l){const d=t.classList.contains("open");if(a&&l.key==="Escape"&&d){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n());}document.addEventListener("keydown",i,{capture:true});function s(){document.removeEventListener("keydown",i,{capture:true});}return {destroy:s}}const oE=`
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
`,rE=`
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
`,aE=`
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
`,iE=`
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
`,sE=`
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
  
`,lE=`
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
`,cE=`
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
`,dE=`
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
`,uE=`
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
`,pE=`
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
`,fE=`
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
`,gE=`
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
`,mE=`
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
`,hE=`
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
`,bE=`
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
`,xE=`
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
`,yE=`
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
`,vE=`
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
`,wE=`
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
`,SE=`
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
`,CE=`
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
`,kE=`
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
`,IE=`
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
`,_E=`
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
`,TE={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function EE(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,TE),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function AE(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function PE(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:l,buildSections:d,initialTab:c,onTabChange:u,toggleCombo:p=G=>G.ctrlKey&&G.shiftKey&&G.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:x=720}=e,{host:b,shadow:h}=EE(t),v=[[rE,"variables"],[aE,"primitives"],[iE,"utilities"],[oE,"hud"],[sE,"card"],[Lc,"badge"],[lE,"button"],[mE,"checkbox"],[cE,"input"],[dE,"label"],[uE,"navTabs"],[pE,"searchBar"],[fE,"select"],[gE,"switch"],[hE,"table"],[bE,"teamListItem"],[xE,"timeRangePicker"],[yE,"tooltip"],[vE,"slider"],[wE,"reorderableList"],[SE,"colorPicker"],[CE,"log"],[kE,"segmentedControl"],[IE,"soundPicker"],[_E,"settings"],[vm,"teamCard"],[Nf,"autoFavoriteSettings"]];for(let G=0;G<v.length;G++){const[V,ne]=v[G];Ie(h,V,ne),G%5===4&&await AE();}const{panel:_,tabbar:k,content:w,resizer:y,closeButton:S,wrapper:I}=eE({shadow:h,initialOpen:o});function C(G){_.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:G},bubbles:true})),a?.(G);}function A(G){const V=_.classList.contains("open");_.classList.toggle("open",G),_.setAttribute("aria-hidden",G?"false":"true"),G!==V&&C(G);}A(o),S.addEventListener("click",G=>{G.preventDefault(),G.stopPropagation(),A(false);});const R=Wh({host:b,themes:i,initialTheme:s,onThemeChange:l}),$=tE({resizer:y,host:b,shadow:h,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:x});$.setHudWidth(n);const Y=d({applyTheme:R.applyTheme,initialTheme:s,getCurrentTheme:R.getCurrentTheme,setHUDWidth:$.setHudWidth,setHUDOpen:A}),B=new qm(Y,w,{applyTheme:R.applyTheme,getCurrentTheme:R.getCurrentTheme}),j=Y.map(G=>({id:G.id,label:G.label})),N=c&&Y.some(G=>G.id===c)?c:j[0]?.id||"",O=Vm(j,N,G=>{B.activate(G),u?.(G);});O.root.style.flex="1 1 auto",O.root.style.minWidth="0",k.append(O.root,S);const z={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function D(){const G=Se(ke.CONFIG,{autoFavorite:{enabled:true},journalChecker:{enabled:true},pets:{enabled:true}});for(const[V,ne]of Object.entries(z))G[ne]?.enabled??true?O.showTab(V):O.hideTab(V);}function H(G){const{key:V}=G.detail;(V===ke.CONFIG||V==="feature:config")&&D();}window.addEventListener(qt.STORAGE_CHANGE,H),D();let E=N;if(!O.isTabVisible(N)){const G=O.getVisibleTabs();G.length>0&&(E=G[0]);}E&&B.activate(E);const P=nE({panel:_,onToggle:()=>A(!_.classList.contains("open")),onClose:()=>A(false),toggleCombo:p,closeOnEscape:f}),T=()=>{O.recalc();const G=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;$.calculateResponsiveBounds(),$.setHudWidth(G);};q.addEventListener("resize",T);const M=G=>{const V=G.detail?.width;V?$.setHudWidth(V):$.setHudWidth(n),O.recalc();};b.addEventListener("gemini:layout-resize",M);function X(){window.removeEventListener(qt.STORAGE_CHANGE,H),P.destroy(),$.destroy(),q.removeEventListener("resize",T),b.removeEventListener("gemini:layout-resize",M);}return {host:b,shadow:h,wrapper:I,panel:_,content:w,setOpen:A,setWidth:$.setHudWidth,sections:Y,manager:B,nav:O,destroy:X}}const On={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},$o={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function ME(){return {isOpen:Se(On.isOpen,$o.isOpen),width:Se(On.width,$o.width),theme:Se(On.theme,$o.theme),activeTab:Se(On.activeTab,$o.activeTab)}}function ma(e,t){_e(On[e],t);}function LE(e,t){return Se(On[e],t)}const RE="https://i.imgur.com/IMkhMur.png",NE="Stats";function FE(e){let t=e.iconUrl||RE;const n=e.ariaLabel||"Open MGH";let o=null,r=null,a=null,i=false,s=null,l=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],c=w=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(w):w.replace(/"/g,'\\"')}catch{return w}};function u(){const w=document.querySelector(d.map(S=>`button[aria-label="${c(S)}"]`).join(","));if(!w)return null;let y=w.parentElement;for(;y&&y!==document.body;){if(d.reduce((I,C)=>I+y.querySelectorAll(`button[aria-label="${c(C)}"]`).length,0)>=2)return y;y=y.parentElement;}return null}function f(w){const y=Array.from(w.querySelectorAll("button[aria-label]"));if(!y.length)return {refBtn:null,refWrapper:null};const S=y.filter(B=>B.dataset.mghBtn!=="true"&&(B.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),I=S.length?S:y,C=I.find(B=>(B.getAttribute("aria-label")||"").toLowerCase()===NE.toLowerCase())||null,A=I.length>=2?I.length-2:I.length-1,R=C||I[A],$=R.parentElement,Y=$&&$.parentElement===w&&$.tagName==="DIV"?$:null;return {refBtn:R,refWrapper:Y}}function g(w,y,S){const I=w.cloneNode(false);I.type="button",I.setAttribute("aria-label",y),I.title=y,I.dataset.mghBtn="true",I.style.pointerEvents="auto",I.removeAttribute("id");const C=document.createElement("img");return C.src=S,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",I.appendChild(C),I.addEventListener("click",A=>{A.preventDefault(),A.stopPropagation();try{e.onClick?.();}catch{}}),I}function x(){if(i)return  false;i=true;let w=false;try{const y=u();if(!y)return !1;s!==y&&(s=y);const{refBtn:S,refWrapper:I}=f(y);if(!S)return !1;r=y.querySelector('div[data-mgh-wrapper="true"]'),!r&&I&&(r=I.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),w=!0);const C=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=C),o||(o=g(S,n,t),r?r.appendChild(o):o.parentElement!==y&&y.appendChild(o),w=!0),r&&r.parentElement!==y&&(y.appendChild(r),w=!0);const A=y;if(A&&A!==l){try{_.disconnect();}catch{}l=A,_.observe(l,{childList:!0,subtree:!0});}return w}finally{i=false;}}const b=document.getElementById("App")||document.body;let h=null,v=false;const _=new MutationObserver(()=>{v&&o&&document.contains(o)||(o&&!document.contains(o)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),v=false,o=null,r=null),h===null&&(h=window.setTimeout(()=>{if(h=null,x()&&o&&document.contains(o)&&(v=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),r)){const y=r.parentElement;y&&y.lastElementChild!==r&&y.appendChild(r);}},100)));});return x()&&o&&document.contains(o)?(v=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),_.observe(b,{childList:true,subtree:true}),a=()=>_.disconnect(),()=>{try{a?.();}catch{}try{r?.remove();}catch{}}}const Lm=[];function OE(){return Lm.slice()}function $E(e){Lm.push(e);}function Rm(e){try{return JSON.parse(e)}catch{return}}function xu(e){if(typeof e=="string"){const t=Rm(e);return t!==void 0?t:e}return e}function Nm(e){if(e!=null){if(typeof e=="string"){const t=Rm(e);return t!==void 0?Nm(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function DE(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ce(e,t,n){const o=typeof t=="boolean"?t:true,r=typeof t=="function"?t:n,a=(i,s)=>{if(Nm(i)!==e)return;const d=r(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return $E(a),a}const Io=new WeakSet,yu=new WeakMap;function BE(e){const t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:OE();if(!o.length)return ()=>{};const r=p=>({ws:p,pageWindow:t,debug:n}),a=(p,f)=>{let g=p;for(const x of o){const b=x(g,r(f));if(b){if(b.kind==="drop")return {kind:"drop"};b.kind==="replace"&&(g=b.message);}}return g!==p?{kind:"replace",message:g}:void 0};let i=null,s=null,l=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Io.has(f))return  true;const g=f.bind(p);function x(...b){const h=b.length===1?b[0]:b,v=xu(h),_=a(v,DE(t));if(_?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",v);return}if(_?.kind==="replace"){const k=_.message;return b.length>1&&Array.isArray(k)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",v,"=>",k),g(...k)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",v,"=>",k),g(k))}return g(...b)}Io.add(x),yu.set(x,f);try{p.sendMessage=x,Io.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return i=()=>{try{p.sendMessage===x&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Io.has(f))return;function g(x){const b=xu(x),h=a(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){const v=h.message,_=typeof v=="string"||v instanceof ArrayBuffer||v instanceof Blob?v:JSON.stringify(v);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",v),f.call(this,_)}return f.call(this,x)}Io.add(g),yu.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();l=setInterval(()=>{if(d()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(l){try{clearInterval(l);}catch{}l=null;}if(i){try{i();}catch{}i=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const Fm=[];function zE(){return Fm.slice()}function vu(e){Fm.push(e);}function GE(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function HE(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const vs=Symbol.for("ariesmod.ws.handlers.patched");function Ne(e,t){if(typeof e=="string"){const r=e,a={match:i=>i.kind==="message"&&i.type===r,handle:t};return vu(a),a}const n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return vu(o),o}function jE(e,t=zE(),n={}){const o=n.pageWindow??window,r=!!n.debug;if(e[vs])return ()=>{};e[vs]=true;const a={ws:e,pageWindow:o,debug:r},i=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(f){r&&console.error("[WS] handler error",f,u);}},s=u=>{const p=HE(u.data),f=GE(p);i({kind:"message",raw:u.data,data:p,type:f});},l=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>i({kind:"open",event:u}),c=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",d),e.addEventListener("error",c),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",l);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",c);}catch{}try{delete e[vs];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Ne(ht.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Ne(ht.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Ne(ht.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Ne(ht.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Ne(ht.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Ne(ht.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Ne(ht.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Ne(ht.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Ne(ht.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Ne(ht.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Ne(Nt.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Ne(Nt.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Ne(Nt.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Ne(Nt.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Ne(Nt.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Ne(Nt.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Ne(Nt.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Ne(Nt.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});ce(W.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));ce(W.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));ce(W.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));ce(W.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));ce(W.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));ce(W.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));ce(W.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));ce(W.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));ce(W.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));ce(W.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));ce(W.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));ce(W.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));ce(W.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));ce(W.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));ce(W.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));ce(W.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));ce(W.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));ce(W.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));ce(W.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));ce(W.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));ce(W.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));ce(W.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));ce(W.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));ce(W.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));ce(W.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));ce(W.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));ce(W.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));ce(W.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));ce(W.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));ce(W.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));ce(W.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");ce(W.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));ce(W.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));ce(W.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));ce(W.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));ce(W.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));ce(W.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));ce(W.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));ce(W.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));ce(W.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));ce(W.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));ce(W.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));ce(W.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));ce(W.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));ce(W.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));ce(W.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));ce(W.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function UE(e={}){const t=e.pageWindow??q,n=e.pollMs??500,o=!!e.debug,r=[];r.push(Ww(t,{debug:o})),r.push(BE({pageWindow:t,middlewares:e.middlewares,debug:o}));let a=null;const i=s=>{if(a){try{a();}catch{}a=null;}s&&(a=jE(s,e.handlers,{debug:o,pageWindow:t}));};return i(qa(t).ws),r.push(kf(s=>i(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>qa(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]();}catch{}if(a){try{a();}catch{}a=null;}}}}let ha=null;function WE(e={}){return ha||(ha=UE(e),ha)}function VE(e,t){const n=new MutationObserver(r=>{for(const a of r)for(const i of a.addedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const s=i.querySelectorAll(e);for(const l of s)t(l);}});n.observe(document.body,{childList:true,subtree:true});const o=document.querySelectorAll(e);for(const r of o)t(r);return {disconnect:()=>n.disconnect()}}function qE(e,t){const n=new MutationObserver(o=>{for(const r of o)for(const a of r.removedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const i=a.querySelectorAll(e);for(const s of i)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const Om=768,wu=6,ws=62,Ss=50,XE=.5,KE=.4,ba=36,xa=28,YE=6,sl=4,JE=8,QE=100,ZE=200,Su=14,Cu=3,eA=40,tA=50,ku=2147483646,Do="gemini-bulk-favorite-sidebar",nA="gemini-bulk-favorite-top-row",oA="gemini-bulk-favorite-bottom-row",ll="gemini-qol-bulkFavorite-styles",rA=`
/* Desktop: vertical scrollable list next to inventory */
#${Do} {
  display: flex;
  flex-direction: column;
  gap: ${YE}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${ku};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${sl}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${ku};
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

#${Do}::-webkit-scrollbar {
  width: 4px;
}

#${Do}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${Do}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${ws}px;
  height: ${ws}px;
  min-width: ${ws}px;
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
  width: ${Ss}px;
  height: ${Ss}px;
  min-width: ${Ss}px;
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
  width: ${ba}px;
  height: ${ba}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${xa}px;
  height: ${xa}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Cu}px;
  right: ${Cu}px;
  width: ${Su}px;
  height: ${Su}px;
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
  width: ${ba}px;
  height: ${ba}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${xa}px;
  height: ${xa}px;
  font-size: 14px;
}
`,aA='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',iA='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function sA(e){const{species:t,itemCount:n,isFavorited:o,isMobile:r,onClick:a}=e,i=m("button",{className:`gemini-qol-bulkFavorite-btn${r?" mobile":""}`,title:`${o?"Unfavorite":"Favorite"} all ${n} ${t}`});return i.dataset.species=t,i.appendChild(lA(t,r)),i.appendChild(cA(o)),i.appendChild(dA(t)),i.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),a();}),i}function lA(e,t){try{if(!J.isReady()||!J.has("plant",e))return Iu(e);const n=t?KE:XE,o=J.toCanvas("plant",e,{scale:n});return o.className="gemini-qol-bulkFavorite-sprite",o}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Iu(e)}}function Iu(e){return m("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function cA(e){const t=m("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?aA:iA,t}function dA(e){return m("span",{className:"gemini-qol-bulkFavorite-label"},e)}let St=null,Ct=null,wt=null,Fa=false,tr=null,Bo=false,Vn=null;const cl=[];function ya(e){cl.push(e);}function uA(){for(const e of cl)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}cl.length=0;}function $m(){return window.innerWidth<=Om}function pA(e){return new Promise(t=>setTimeout(t,e))}function Dm(){if(Fa)return;if(document.getElementById(ll)){Fa=true;return}const e=document.createElement("style");e.id=ll,e.textContent=rA,document.head.appendChild(e),Fa=true;}function fA(){document.getElementById(ll)?.remove(),Fa=false;}function gA(){const e=bt().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const r of e.items){const a=r;if(a.itemType!=="Produce")continue;const i=a.species,s=a.id;if(!i||!s)continue;const l=n.get(i);l?l.push(s):n.set(i,[s]);}const o=[];for(const[r,a]of n){const i=a.length>0&&a.every(s=>t.has(s));o.push({species:r,itemIds:a,allFavorited:i});}return o.sort((r,a)=>r.species.localeCompare(a.species)),o}async function mA(e){const t=bt().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),o=[];for(const i of t.items){const s=i;if(s.itemType!=="Produce"||s.species!==e)continue;const l=s.id;l&&o.push({id:l,favorited:n.has(l)});}if(o.length===0)return;const r=o.every(i=>i.favorited),a=r?o.filter(i=>i.favorited):o.filter(i=>!i.favorited);console.log(`🔄 [BulkFavorite] ${r?"Unfavoriting":"Favoriting"} ${a.length}/${o.length} ${e}`);for(const i of a)Ii(i.id),await pA(eA);}function dl(e,t){const{species:n,itemIds:o,allFavorited:r}=e;return sA({species:n,itemCount:o.length,isFavorited:r,isMobile:t,onClick:()=>mA(n)})}function hA(e){const t=m("div",{id:Do}),n=e.getBoundingClientRect(),o=Math.max(window.innerHeight-QE,ZE);return t.style.maxHeight=`${o}px`,t.style.position="fixed",t.style.left=`${n.right+JE}px`,t.style.top=`${n.top}px`,t}function _u(e,t,n){const o=m("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),r=t.getBoundingClientRect();return n==="top"?o.style.bottom=`${window.innerHeight-r.top+sl}px`:o.style.top=`${r.bottom+sl}px`,o.style.left=`${r.left}px`,o.style.maxWidth=`${r.width}px`,o}function Tu(){const e=gA();$m()?xA(e):bA(e);}function bA(e){if(St){if(St.innerHTML="",e.length===0){St.style.display="none";return}St.style.display="flex";for(const t of e)St.appendChild(dl(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function xA(e){if(!Ct||!wt)return;if(Ct.innerHTML="",wt.innerHTML="",e.length===0){Ct.style.display="none",wt.style.display="none";return}Ct.style.display="flex";const t=e.slice(0,wu),n=e.slice(wu);for(const o of t)Ct.appendChild(dl(o,true));if(n.length>0){wt.style.display="flex";for(const o of n)wt.appendChild(dl(o,true));}else wt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function yA(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=Om)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const o=window.innerWidth/2;let r=null,a=0;const i=e.querySelectorAll(".McFlex, .McGrid");for(const s of i){const l=s.getBoundingClientRect();if(l.width<200||l.height<200||l.width>window.innerWidth-100)continue;const d=l.left+l.width/2,c=1-Math.abs(d-o)/o,p=l.width*l.height*c;p>a&&(r=s,a=p);}if(r){const s=r.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),r}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let qn=null;function ul(){qn&&clearTimeout(qn),qn=setTimeout(()=>{vA();},tA);}function vA(){const e=yA();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),nr(),Dm(),tr=e,$m()?(Ct=_u(nA,e,"top"),wt=_u(oA,e,"bottom"),document.body.appendChild(Ct),document.body.appendChild(wt)):(St=hA(e),document.body.appendChild(St)),Tu(),Vn&&Vn(),Vn=bt().subscribeFavorites(()=>{Bo&&Tu();});}function nr(){qn&&(clearTimeout(qn),qn=null),Vn&&(Vn(),Vn=null),St?.remove(),St=null,Ct?.remove(),Ct=null,wt?.remove(),wt=null,tr=null;}function wA(){nr();}async function pl(){if(!Ar().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}Dm();const t=await Pl.onChangeNow(r=>{const a=r==="inventory";a!==Bo&&(Bo=a,a?ul():nr());}),n=VE(".McGrid",()=>{Bo&&(St||Ct||ul());}),o=qE(".McGrid",r=>{tr&&tr===r&&nr();});ya(()=>t()),ya(()=>n.disconnect()),ya(()=>o.disconnect()),ya(()=>{nr(),Bo=false,tr=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function fl(){uA(),fA(),console.log("🛑 [BulkFavorite] Stopped");}function SA(e){const t=Ar();t.enabled=e,e?pl():fl();}let va=false;const CA={init(){va||(pl(),va=true);},destroy(){va&&(fl(),va=false);},isEnabled(){return Yf()},renderButton:ul,removeButton:wA,startWatching:pl,stopWatching:fl,setEnabled:SA},kA=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,IA=`
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
`;let Eu=false;function _A(){if(Eu)return;Eu=true;const e=document.createElement("style");e.textContent=IA,document.head.appendChild(e);}const Au=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],Pu=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function TA(){const e=document.querySelector(Au.map(n=>`button[aria-label="${Pu(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(Au.reduce((o,r)=>o+t.querySelectorAll(`button[aria-label="${Pu(r)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function EA(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(s=>s.dataset.alertBtn!=="true"&&(s.getAttribute("aria-label")||"")!=="Alerts"),o=n.length?n:t,r=o[o.length-1]||null,a=r?.parentElement,i=a&&a.parentElement===e&&a.tagName==="DIV"?a:null;return {refBtn:r,refWrapper:i}}function AA(e,t,n){const o=e.cloneNode(false);o.type="button",o.setAttribute("aria-label",t),o.title=t,o.dataset.alertBtn="true",o.style.pointerEvents="auto",o.style.position="relative",o.removeAttribute("id");const r=document.createElement("div");return r.innerHTML=n,r.dataset.alertIcon="true",r.style.pointerEvents="none",r.style.userSelect="none",r.style.width="76%",r.style.height="76%",r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.margin="auto",o.appendChild(r),o}function PA(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function MA(e){_A();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:kA,n=e.ariaLabel||"Alerts";let o=null,r=null,a=null,i=null,s=false,l=null,d=null,c=null;function u(){if(s)return  false;s=true;let h=false;try{const v=TA();if(!v)return !1;l!==v&&(l=v);const{refBtn:_,refWrapper:k}=EA(v);if(!_)return !1;r=v.querySelector('div[data-alert-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.alertWrapper="true",r.removeAttribute("id"),h=!0);const w=r?.querySelector('button[data-alert-btn="true"]')||null;o||(o=w),o||(o=AA(_,n,t),o.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation();try{e.onClick?.();}catch{}}),a=PA(),o.appendChild(a),r?r.appendChild(o):o.parentElement!==v&&v.appendChild(o),h=!0),r&&r.parentElement!==v&&(v.appendChild(r),h=!0);const y=v;if(y&&y!==d){try{x.disconnect();}catch{}d=y,x.observe(d,{childList:!0,subtree:!0});}return h}finally{s=false;}}const p=document.getElementById("App")||document.body;let f=null,g=false;const x=new MutationObserver(()=>{g&&o&&document.contains(o)||(o&&!document.contains(o)&&(g=false,o=null,a=null,r=null),f===null&&(f=window.setTimeout(()=>{if(f=null,u()&&o&&document.contains(o)&&(g=true,r)){const v=r.parentElement;v&&v.lastElementChild!==r&&v.appendChild(r);}},100)));});return u()&&o&&document.contains(o)&&(g=true),x.observe(p,{childList:true,subtree:true}),i=()=>x.disconnect(),{get root(){return o},updateBadge(h){a&&(h>0?(a.textContent=String(h),a.style.display="flex"):a.style.display="none");},ring(){if(!o)return;const h=o.querySelector('[data-alert-icon="true"]');h&&(h.classList.add("alert-btn-ringing"),setTimeout(()=>{h?.classList.remove("alert-btn-ringing");},600));},startRinging(){o&&(c!==null&&clearInterval(c),this.ring(),c=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(c!==null&&(clearInterval(c),c=null),o){const h=o.querySelector('[data-alert-icon="true"]');h&&h.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{i?.();}catch{}try{r?.remove();}catch{}}}}const LA=`
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
`;function RA(e,t){const n=m("div",{className:"alert-item-row"}),o=m("div",{className:"alert-item-sprite"});if(e.spriteId)try{const d=J.toCanvas(e.spriteId,{scale:.35});d?o.appendChild(d):o.textContent="?";}catch{o.textContent="?";}else o.textContent="?";const r=m("div",{className:"alert-item-info"}),a=m("div",{className:"alert-item-name"},e.itemName),i=m("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);r.appendChild(a),r.appendChild(i);const s=m("div",{className:"alert-item-actions"}),l=m("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return l.addEventListener("click",d=>{d.stopPropagation(),t?.(e);}),s.appendChild(l),n.appendChild(o),n.appendChild(r),n.appendChild(s),n}function NA(){const e=m("div",{className:"alert-overlay-empty"}),t=m("div",{className:"alert-overlay-empty-icon"},"🔔"),n=m("div",{className:"alert-overlay-empty-text"},"No items available"),o=m("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(o),e}function Mu(e,t){const n=t.getBoundingClientRect(),o=340,r=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let a=n.bottom+r,i=window.innerWidth-n.right;const s=a+480>window.innerHeight,l=n.right-o<r;s?(e.style.bottom=`${window.innerHeight-n.top+r}px`,e.style.top="auto"):e.style.top=`${a}px`,e.style.right=`${i}px`,l&&(e.style.right="auto",e.style.left=`${r}px`);}function FA(e){const{items:t,anchorElement:n,onClose:o,onBuyAll:r}=e,a=m("div",{className:"alert-overlay"}),i=LE("theme",$o.theme),s=$n[i];let l="";s&&(l=`.alert-overlay {
    ${Object.entries(s).map(([v,_])=>`${v}: ${_};`).join(`
    `)}
  }

`);const d=document.createElement("style");d.textContent=l+LA,a.appendChild(d);const c=m("div",{className:"alert-overlay-header"}),u=m("div",{className:"alert-overlay-title"},"Available Items"),p=m("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");p.addEventListener("click",h=>{h.stopPropagation(),o?.();}),c.appendChild(u),c.appendChild(p);const f=m("div",{className:"alert-overlay-list"});a.appendChild(c),a.appendChild(f);const g=h=>{if(f.replaceChildren(),h.length===0)f.appendChild(NA());else for(const v of h){const _=RA(v,r);f.appendChild(_);}};g(t),Mu(a,n);const x=()=>{Mu(a,n);};window.addEventListener("resize",x);const b=h=>{const v=h.target;!a.contains(v)&&!n.contains(v)&&o?.();};return document.addEventListener("click",b,{capture:true}),{root:a,updateItems:g,destroy(){window.removeEventListener("resize",x),document.removeEventListener("click",b,{capture:true}),a.remove();}}}const OA={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},$A={seed:"seed",tool:null,egg:null,decor:null};function Bm(e,t,n){try{const o=OA[t],r=te.get(o);if(!r||typeof r!="object")return null;const a=r[e];if(!a||typeof a!="object")return null;const i=$A[t],s=i?a[i]:a;return !s||typeof s!="object"?null:s[n]??null}catch{return null}}function DA(e,t){return Bm(e,t,"spriteId")}function BA(e,t){return Bm(e,t,"name")??e}function zA(e,t){const n=Xt.getTrackedItems(),o=new Set(n.filter(a=>a.shopType===e).map(a=>a.itemId));return o.size===0?[]:t.items.filter(a=>{const i=o.has(a.id),s=a.isAvailable;return i&&s}).map(a=>({shopType:e,itemId:a.id,itemName:BA(a.id,e),spriteId:DA(a.id,e),remaining:a.remaining,price:a.price}))}function zo(){const t=io().get(),n=["seed","tool","egg","decor"],o=[];for(const r of n){const a=t.byType[r];if(a){const i=zA(r,a);o.push(...i);}}return o}function GA(e){return io().subscribeStable(()=>{const o=zo();e(o);})}function HA(){let e=null,t=null,n=null,o=false,r=[],a=[],i="",s=0,l=0,d=false,c=null,u=[],p=0,f=false;const g=()=>{try{return Ae.CustomSounds.getNotificationConfig("shop")}catch{return null}},x=(E,P)=>{try{const T=de.getItemCustomSound("shop",E,P);return T?{soundId:T.soundId,volume:T.volume,mode:T.mode}:null}catch{return null}},b=E=>`${E.soundId}:${E.volume}`,h=(E,P,T,M)=>{P.has(T)||(E.push({soundId:T,volume:M}),P.add(T));},v=(E,P)=>{const T=[],M=new Set;let X=false;const G=[];for(const V of E){const ne=x(V.itemId,V.shopType);ne?ne.mode==="one-shot"&&G.push({soundId:ne.soundId,volume:ne.volume}):P?.mode==="one-shot"&&(X=true);}X&&P&&h(T,M,P.soundId,P.volume);for(const V of G)h(T,M,V.soundId,V.volume);return T},_=(E,P)=>{const T=[],M=new Set;let X=false;const G=[];for(const V of E){const ne=x(V.itemId,V.shopType);ne?ne.mode==="loop"&&G.push({soundId:ne.soundId,volume:ne.volume}):P?.mode==="loop"&&(X=true);}X&&P&&h(T,M,P.soundId,P.volume);for(const V of G)h(T,M,V.soundId,V.volume);return T},k=(E,P,T,M=false)=>{if(!T())return;const X=de.getById(E.soundId);if(!X){P();return}M&&(c=X.source),Ae.playCustom(X.source,{volume:E.volume/100}).then(G=>{if(!T())return;const V=G.audio,ne=()=>{T()&&P();};V.addEventListener("ended",ne,{once:true});}).catch(()=>{T()&&P();});},w=()=>{if(!d||a.length===0)return;const E=a[s];s=(s+1)%a.length;const P=l,T=()=>d&&l===P;k(E,()=>{T()&&w();},T,true);},y=()=>{d||a.length===0||(d=true,s>=a.length&&(s=0),w());},S=()=>{if(d){l+=1,d=false;try{const E=Ae.getCustomHandle();(!c||E&&E.url===c)&&Ae.CustomSounds.stop();}catch{}c=null;}},I=()=>{S(),a=[],i="",s=0,c=null;},C=()=>{if(u.length===0){f=false,y();return}f=true;const E=u.shift(),P=p,T=()=>f&&p===P;k(E,()=>{T()&&C();},T);},A=(E,P)=>{const T=P??g(),M=v(E,T);if(M.length===0)return;const X=new Set(u.map(G=>G.soundId));for(const G of M)X.has(G.soundId)||(u.push(G),X.add(G.soundId));f||(p+=1,S(),C());},R=(E,P)=>{const T=P??g(),M=_(E,T);if(M.length===0){I();return}const X=M.map(b).join("|"),G=X!==i;a=M,i=X,G&&(s=0,d&&S()),!f&&(d||y());},$=E=>{const P=r.length>0,T=E.length>0;r=E,e?.updateBadge(E.length),T?P||e?.startRinging():P&&e?.stopRinging();},Y=()=>{if(o||!e?.root)return;const E=zo();t=FA({items:E,anchorElement:e.root,onClose:B,onBuyAll:P=>{switch(P.shopType){case "seed":cn.seed.buyAll(P.itemId);break;case "egg":cn.egg.buyAll(P.itemId);break;case "decor":cn.decor.buyAll(P.itemId);break;case "tool":cn.tool.buyAll(P.itemId);break}}}),document.body.appendChild(t.root),o=true;},B=()=>{!o||!t||(t.destroy(),t=null,o=false);},j=()=>{o?B():Y();},N=E=>{if($(E),o&&t&&t.updateItems(E),R(E),E.length>0){const P=new CustomEvent("gemini:alert-available",{detail:{items:E}});window.dispatchEvent(P);}},O=()=>{const E=zo(),P=new Set(r.map(G=>`${G.shopType}:${G.itemId}`)),T=E.filter(G=>!P.has(`${G.shopType}:${G.itemId}`)),M=T.length>0;$(E),o&&t&&t.updateItems(E);const X=g();R(E,X),M&&A(T,X);};e=MA({onClick:j,ariaLabel:"Alerts"}),n=GA(N),window.addEventListener("gemini:tracked-items-changed",O);const z=E=>{const P=E,{shopType:T,items:M}=P.detail;if(!M||M.length===0)return;const X=M.map(G=>({itemId:G.itemId,shopType:T}));A(X,g());};window.addEventListener("gemini:shop-restock-tracked",z);const D=E=>{if(E.detail?.entityType!=="shop")return;const T=zo();R(T,g());};window.addEventListener(qt.CUSTOM_SOUND_CHANGE,D);const H=(E=1,P=10)=>{if(io().get().all.some(G=>G.items.length>0)||E>=P){const G=zo();$(G);const V=g();R(G,V),G.length>0&&A(G,V);}else setTimeout(()=>H(E+1,P),500);};return H(),{destroy(){B(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",O),window.removeEventListener("gemini:shop-restock-tracked",z),window.removeEventListener(qt.CUSTOM_SOUND_CHANGE,D),e?.destroy(),e=null,u=[],p+=1,f=false,I();}}}function jA(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=kf(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),WE({debug:false}),()=>{t?.(),t=null;}}async function UA(e){e.logStep("Atoms","Prewarming Jotai store...");try{await n0(),await Qy({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function WA(e){e.logStep("Globals","Initializing global variables...");try{Lf(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function VA(e){e.logStep("API","Exposing Gemini API...");try{YT(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Cs(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function qA(e){e.logStep("HUD","Loading HUD preferences..."),await Cs();const t=ME();await Cs();const n=await PE({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>ma("width",o),onOpenChange:o=>ma("isOpen",o),themes:$n,initialTheme:t.theme,onThemeChange:o=>ma("theme",o),buildSections:o=>QT({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme,setHUDWidth:o.setHUDWidth,setHUDOpen:o.setHUDOpen}),initialTab:t.activeTab,onTabChange:o=>ma("activeTab",o)});return await Cs(),e.logStep("HUD","HUD ready","success"),n}async function XA(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Rf(o=>{o.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):o.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${o.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function KA(e){try{J.isReady()||await J.init(),te.resolveSprites();const t=[],n=te.get("plants");if(n)for(const l of Object.values(n))l?.seed?.spriteId&&t.push(l.seed.spriteId),l?.plant?.spriteId&&t.push(l.plant.spriteId),l?.crop?.spriteId&&t.push(l.crop.spriteId);const o=te.get("pets");if(o)for(const l of Object.values(o))l?.spriteId&&t.push(l.spriteId);const r=te.get("items");if(r)for(const l of Object.values(r))l?.spriteId&&t.push(l.spriteId);const a=te.get("eggs");if(a)for(const l of Object.values(a))l?.spriteId&&t.push(l.spriteId);const i=te.get("decor");if(i)for(const l of Object.values(i))l?.spriteId&&t.push(l.spriteId);const s=[...new Set(t)];s.length>0&&await J.warmup(s,()=>{},5);}catch(t){console.warn("[Bootstrap] Sprite warmup failed",t);}}async function YA(e){e.logStep("Sections","Preloading UI sections...");try{await ZT(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function JA(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:mn.init.bind(mn)},{name:"PetTeam",init:pe.init.bind(pe)},{name:"BulkFavorite",init:Xa.init.bind(Xa)},{name:"XPTracker",init:Ya.init.bind(Ya)},{name:"CropValueIndicator",init:Ko.init.bind(Ko)},{name:"CropSizeIndicator",init:Yo.init.bind(Yo)},{name:"ShopNotifier",init:Xt.init.bind(Xt)},{name:"WeatherNotifier",init:vn.init.bind(vn)},{name:"PetHungerNotifier",init:eo.init.bind(eo)},{name:"AriesAPI",init:ri.init.bind(ri)}];let n=0;for(const o of t)try{o.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(r){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${o.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${o.name} init failed`,r);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const o=Hu();o.register({id:"bulkFavoriteInject",name:"Bulk Favorite Inject",description:"Quick favorite/unfavorite multiple mutations",injection:CA,storageKey:ke.BULK_FAVORITE,defaultEnabled:!1}),o.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:Ko.render,storageKey:ke.CROP_VALUE_INDICATOR,defaultEnabled:!1}),o.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:Yo.render,storageKey:ke.CROP_SIZE_INDICATOR,defaultEnabled:!1}),o.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(o){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",o);}}tp();Xy();(async function(){eh();const e=Um({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=jA(e),await UA(e),WA(e),VA(e),await XA(e),await Promise.all([(async()=>{JA(e);})(),(async()=>{await KA(e);})()]),await YA(e),e.succeed("Gemini is ready!");}catch(o){e.fail("Failed to initialize the mod.",o);}finally{t?.();}const n=await qA(e);FE({onClick:()=>n.setOpen(true)}),HA();})();

})();