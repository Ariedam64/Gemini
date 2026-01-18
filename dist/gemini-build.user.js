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
  var xg=Object.defineProperty;var yg=(e,t,n)=>t in e?xg(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var R=(e,t,n)=>yg(e,typeof t!="symbol"?t+"":t,n);function x(e,t=null,...n){const r=document.createElement(e);for(const[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const lo="https://i.imgur.com/k5WuC32.png",jl="gemini-loader-style",Vt="gemini-loader",Sd=80;function vg(){if(document.getElementById(jl))return;const e=document.createElement("style");e.id=jl,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Vt} {
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
    #${Vt} {
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

    #${Vt}.gemini-loader--error .gemini-loader__actions {
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
    #${Vt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Vt}.gemini-loader--error .gemini-loader__spinner {
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
      #${Vt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function co(e,t,n){const r=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Sd;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function wg(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(lo);return}GM_xmlhttpRequest({method:"GET",url:lo,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(lo),r.readAsDataURL(n);},onerror:()=>e(lo)});})}function Sg(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;vg();const n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=x("div",{className:"gemini-loader__logs"}),o=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=x("div",{className:"gemini-loader__spinner"},o);wg().then(b=>{o.src=b;});const i=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},a,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=x("div",{id:Vt},i);(document.body||document.documentElement).appendChild(s);const c=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const d=b=>{n.textContent=b;},l=new Map,u=(b,y)=>{b.className=`gemini-loader__log ${y}`;};return {log:(b,y="info")=>co(r,b,y),logStep:(b,y,S="info")=>{const C=String(b||"").trim();if(!C){co(r,y,S);return}const v=l.get(C);if(v){v.el.lastElementChild&&(v.el.lastElementChild.textContent=y),v.tone!==S&&(u(v.el,S),v.tone=S);return}const T=x("div",{className:`gemini-loader__log ${S}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:y}));for(l.set(C,{el:T,tone:S}),r.appendChild(T);r.childElementCount>Sd;){const h=r.firstElementChild;if(!h)break;const w=Array.from(l.entries()).find(([,_])=>_.el===h)?.[0];w&&l.delete(w),h.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(b,y=600)=>{b&&co(r,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),y);},fail:(b,y)=>{co(r,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,y);}}}const Ul=150,Cg=30;function kg(e,t,n){const r=x("div",{className:"lg-pill",id:"pill"}),o=e.map(k=>{const P=x("button",{className:"lg-tab"},k.label);return P.setAttribute("data-target",k.id),P}),a=x("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=new Map(e.map(k=>[k.id,true])),s=new Map(o.map((k,P)=>[e[P].id,k]));function c(k){const P=document.createElementNS("http://www.w3.org/2000/svg","svg");P.setAttribute("viewBox","0 0 24 24"),P.setAttribute("fill","none"),P.setAttribute("stroke","currentColor"),P.setAttribute("stroke-width","2"),P.setAttribute("stroke-linecap","round"),P.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","polyline");return E.setAttribute("points",k==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),P.appendChild(E),P}const d=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(c("left"));const l=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});l.appendChild(c("right"));const p=x("div",{className:"lg-tabs-wrapper"},d,a,l);let f=0,g=0,m=false;function b(){const k=a.scrollLeft>0,P=a.scrollLeft<a.scrollWidth-a.clientWidth-1;d.classList.toggle("disabled",!k),l.classList.toggle("disabled",!P);}d.addEventListener("click",()=>{a.scrollBy({left:-Ul,behavior:"smooth"}),setTimeout(b,300);}),l.addEventListener("click",()=>{a.scrollBy({left:Ul,behavior:"smooth"}),setTimeout(b,300);}),a.addEventListener("wheel",k=>{Math.abs(k.deltaY)>Math.abs(k.deltaX)&&(k.preventDefault(),a.scrollLeft+=k.deltaY,b());},{passive:false});let y=0;a.addEventListener("touchstart",k=>{const P=k.touches[0];f=P.clientX,g=P.clientY,m=false,y=a.scrollLeft;},{passive:true}),a.addEventListener("touchmove",k=>{if(m)return;const P=k.touches[0],E=P.clientX-f,G=P.clientY-g;if(Math.abs(G)>Math.abs(E)){m=true;return}Math.abs(E)>Cg&&(k.preventDefault(),a.scrollLeft=y-E);},{passive:false}),a.addEventListener("touchend",()=>{b();},{passive:true}),a.addEventListener("scroll",b,{passive:true});function S(k){const P=o.find(E=>E.dataset.target===k)||o[0];P&&requestAnimationFrame(()=>{const E=P.offsetLeft,G=P.offsetWidth;r.style.width=`${G}px`,r.style.transform=`translateX(${E}px)`;const J=a.scrollLeft,j=J,q=J+a.clientWidth,U=E-12,O=E+G+12;U<j?a.scrollTo({left:U,behavior:"smooth"}):O>q&&a.scrollTo({left:O-a.clientWidth,behavior:"smooth"}),setTimeout(b,300);});}function C(){for(const[k,P]of i)if(P)return k;return null}function v(k){const P=s.get(k);if(P)if(i.set(k,false),P.style.display="none",w===k){const E=C();E&&_(E);}else h();}function T(k){const P=s.get(k);P&&(i.set(k,true),P.style.display="",h());}function h(){S(w),b();}let w=t||(e[0]?.id??"");function _(k){i.get(k)&&(w=k,o.forEach(P=>P.classList.toggle("active",P.dataset.target===k)),S(k),n(k));}return o.forEach(k=>k.addEventListener("click",()=>_(k.dataset.target))),queueMicrotask(()=>{S(w),b();}),{root:p,activate:_,recalc:h,getActive:()=>w,showTab:T,hideTab:v,isTabVisible:k=>i.get(k)??false,getVisibleTabs:()=>[...i.entries()].filter(([k,P])=>P).map(([k])=>k)}}class sn{constructor(t){R(this,"id");R(this,"label");R(this,"container",null);R(this,"cleanupFunctions",[]);R(this,"preloadedContent",null);R(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=x("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class _g{constructor(t,n,r){R(this,"sections");R(this,"activeId",null);R(this,"container");R(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const Ot="gemini:",Tg={STATE:"hud:state",THEME:"hud:theme"},Pg={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test"},Ag={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds"},Ig={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},Se={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config"},Eg={AUTO_RELOAD:"dev:auto-reload"},Sa={HUD:Tg,SECTION:Pg,MODULE:Ag,GLOBAL:Ig,FEATURE:Se,DEV:Eg},Wl={STORAGE_CHANGE:"gemini:storage:change"};function we(e,t){try{const n=e.startsWith(Ot)?e:Ot+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Ae(e,t){try{const n=e.startsWith(Ot)?e:Ot+e,r=e.startsWith(Ot)?e.slice(Ot.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Mg(e){try{const t=e.startsWith(Ot)?e:Ot+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function Rg(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const a=localStorage.key(o);a&&a.startsWith(e)&&t.push(a);}for(const o of t)try{const a=localStorage.getItem(o);if(a!==null){const i=JSON.parse(a),s=o.slice(e.length);Ae(s,i),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(a){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,a);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Ae("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Cd="gemini.sections";function kd(){const e=we(Cd,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Ng(e){Ae(Cd,e);}async function Lg(e){return kd()[e]}function Fg(e,t){const n=kd();Ng({...n,[e]:t});}function Vl(e,t){return {...e,...t??{}}}async function Bg(e){const t=await Lg(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Fg(e.path,n);}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function c(){o();}return {get:a,set:i,update:s,save:c}}async function Vr(e,t){const{path:n=e,...r}=t;return Bg({path:n,...r})}let Og=0;const uo=new Map;function Xe(e={},...t){const{id:n,className:r,variant:o="default",padding:a="md",interactive:i=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:f,actions:g,footer:m,divider:b=false,tone:y="neutral",stateKey:S}=e,C=x("div",{className:"card",id:n,tabIndex:i?0:void 0});C.classList.add(`card--${o}`,`card--p-${a}`),i&&C.classList.add("card--interactive"),y!=="neutral"&&C.classList.add(`card--tone-${y}`),r&&C.classList.add(...r.split(" ").filter(Boolean)),s&&C.classList.add("card--expandable");const v=s?S??n??(typeof u=="string"?`title:${u}`:null):null;let T=!s||c;v&&uo.has(v)&&(T=!!uo.get(v));let h=null,w=null,_=null,k=null,P=null;const E=n?`${n}-collapse`:`card-collapse-${++Og}`,G=()=>{if(k!==null&&(cancelAnimationFrame(k),k=null),P){const $=P;P=null,$();}},J=($,z)=>{if(!_)return;G();const D=_;if(D.setAttribute("aria-hidden",String(!$)),!z){D.classList.remove("card-collapse--animating"),D.style.display=$?"":"none",D.style.height="",D.style.opacity="";return}if(D.classList.add("card-collapse--animating"),D.style.display="",$){D.style.height="auto";const W=D.scrollHeight;if(!W){D.classList.remove("card-collapse--animating"),D.style.display="",D.style.height="",D.style.opacity="";return}D.style.height="0px",D.style.opacity="0",D.offsetHeight,k=requestAnimationFrame(()=>{k=null,D.style.height=`${W}px`,D.style.opacity="1";});}else {const W=D.scrollHeight;if(!W){D.classList.remove("card-collapse--animating"),D.style.display="none",D.style.height="",D.style.opacity="";return}D.style.height=`${W}px`,D.style.opacity="1",D.offsetHeight,k=requestAnimationFrame(()=>{k=null,D.style.height="0px",D.style.opacity="0";});}const I=()=>{D.classList.remove("card-collapse--animating"),D.style.height="",$||(D.style.display="none"),D.style.opacity="";};let F=null;const B=W=>{W.target===D&&(F!==null&&(clearTimeout(F),F=null),D.removeEventListener("transitionend",B),D.removeEventListener("transitioncancel",B),P=null,I());};P=()=>{F!==null&&(clearTimeout(F),F=null),D.removeEventListener("transitionend",B),D.removeEventListener("transitioncancel",B),P=null,I();},D.addEventListener("transitionend",B),D.addEventListener("transitioncancel",B),F=window.setTimeout(()=>{P?.();},420);};function j($){const z=document.createElementNS("http://www.w3.org/2000/svg","svg");return z.setAttribute("viewBox","0 0 24 24"),z.setAttribute("width","16"),z.setAttribute("height","16"),z.innerHTML=$==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',z}function q($,z=true,D=true){T=$,C.classList.toggle("card--collapsed",!T),C.classList.toggle("card--expanded",T),h&&(h.dataset.expanded=String(T),h.setAttribute("aria-expanded",String(T))),w&&(w.setAttribute("aria-expanded",String(T)),w.classList.toggle("card-toggle--collapsed",!T),w.setAttribute("aria-label",T?"Replier le contenu":"Deplier le contenu"),w.replaceChildren(j(T?"up":"down"))),s?J(T,D):_&&(_.style.display="",_.style.height="",_.style.opacity="",_.setAttribute("aria-hidden","false")),z&&d&&d(T),v&&uo.set(v,T);}if(l){const $=x("div",{className:"card-media"});$.append(l),C.appendChild($);}const U=!!(u||p||f||g&&g.length||s);if(U){h=x("div",{className:"card-header"});const $=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const I=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&I.append(typeof f=="string"?x("span",{className:"badge"},f):f),$.appendChild(I);}if(p){const I=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);$.appendChild(I);}($.childNodes.length||s)&&h.appendChild($);const z=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),D=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(I=>D.appendChild(I)),D.childNodes.length&&z.appendChild(D),s&&(w=x("button",{className:"card-toggle",type:"button",ariaExpanded:String(T),ariaControls:E,ariaLabel:T?"Replier le contenu":"Deplier le contenu"}),w.textContent=T?"▲":"▼",w.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),q(!T);}),z.appendChild(w),h.classList.add("card-header--expandable"),h.addEventListener("click",I=>{const F=I.target;F?.closest(".card-actions")||F?.closest(".card-toggle")||q(!T);})),z.childNodes.length&&h.appendChild(z),C.appendChild(h);}_=x("div",{className:"card-collapse",id:E,ariaHidden:s?String(!T):"false"}),C.appendChild(_),b&&U&&_.appendChild(x("div",{className:"card-divider"}));const O=x("div",{className:"card-body"});if(O.append(...t),_.appendChild(O),m){b&&_.appendChild(x("div",{className:"card-divider"}));const $=x("div",{className:"card-footer"});$.append(m),_.appendChild($);}return w&&w.setAttribute("aria-controls",E),q(T,false,false),v&&uo.set(v,T),C}let aa=false;const ia=new Set,et=e=>{const t=document.activeElement;for(const n of ia)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Dg(){aa||(aa=true,window.addEventListener("keydown",et,true),window.addEventListener("keypress",et,true),window.addEventListener("keyup",et,true),document.addEventListener("keydown",et,true),document.addEventListener("keypress",et,true),document.addEventListener("keyup",et,true));}function $g(){aa&&(ia.size>0||(aa=false,window.removeEventListener("keydown",et,true),window.removeEventListener("keypress",et,true),window.removeEventListener("keyup",et,true),document.removeEventListener("keydown",et,true),document.removeEventListener("keypress",et,true),document.removeEventListener("keyup",et,true)));}function Gg(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=false,blockGameKeys:s=true,onChange:c,onOpenChange:d}=e,l=x("div",{className:"select",id:t}),u=x("button",{className:"select-trigger",type:"button"}),p=x("span",{className:"select-value"},o),f=x("span",{className:"select-caret"},"▾");u.append(p,f);const g=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let m=false,b=n,y=null,S=!!i;function C(I){return I==null?o:(e.options||r).find(B=>B.value===I)?.label??o}function v(I){p.textContent=C(I),g.querySelectorAll(".select-option").forEach(F=>{const B=F.dataset.value,W=I!=null&&B===I;F.classList.toggle("selected",W),F.setAttribute("aria-selected",String(W));});}function T(I){g.replaceChildren(),I.forEach(F=>{const B=x("button",{className:"select-option"+(F.disabled?" disabled":""),type:"button",role:"option","data-value":F.value,"aria-selected":String(F.value===b),tabindex:"-1"},F.label);F.value===b&&B.classList.add("selected"),F.disabled||B.addEventListener("pointerdown",W=>{W.preventDefault(),W.stopPropagation(),E(F.value,{notify:true}),k();},{capture:true}),g.appendChild(B);});}function h(){u.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function w(){const I=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${I.width}px`});}function _(){m||S||(m=true,l.classList.add("open"),h(),w(),document.addEventListener("mousedown",U,true),document.addEventListener("scroll",O,true),window.addEventListener("resize",$),g.focus({preventScroll:true}),s&&(Dg(),ia.add(l),y=()=>{ia.delete(l),$g();}),d?.(true));}function k(){m&&(m=false,l.classList.remove("open"),h(),document.removeEventListener("mousedown",U,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",$),u.focus({preventScroll:true}),y?.(),y=null,d?.(false));}function P(){m?k():_();}function E(I,F={}){const B=b;b=I,v(b),F.notify!==false&&B!==I&&c?.(I);}function G(){return b}function J(I){const F=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!F.length)return;const B=F.findIndex(be=>be.classList.contains("active")),W=F[(B+(I===1?1:F.length-1))%F.length];F.forEach(be=>be.classList.remove("active")),W.classList.add("active"),W.focus({preventScroll:true}),W.scrollIntoView({block:"nearest"});}function j(I){(I.key===" "||I.key==="Enter"||I.key==="ArrowDown")&&(I.preventDefault(),_());}function q(I){if(I.key==="Escape"){I.preventDefault(),k();return}if(I.key==="Enter"||I.key===" "){const F=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");F&&!F.classList.contains("disabled")&&(I.preventDefault(),E(F.dataset.value,{notify:true}),k());return}if(I.key==="ArrowDown"){I.preventDefault(),J(1);return}if(I.key==="ArrowUp"){I.preventDefault(),J(-1);return}}function U(I){l.contains(I.target)||k();}function O(){m&&w();}function $(){m&&w();}function z(I){S=!!I,u.disabled=S,l.classList.toggle("disabled",S),S&&k();}function D(I){e.options=I,T(I),I.some(F=>F.value===b)||(b=null,v(null));}return l.append(u,g),u.addEventListener("pointerdown",I=>{I.preventDefault(),I.stopPropagation(),P();},{capture:true}),u.addEventListener("keydown",j),g.addEventListener("keydown",q),T(r),n!=null?(b=n,v(b)):v(null),h(),z(S),{root:l,open:_,close:k,toggle:P,getValue:G,setValue:E,setOptions:D,setDisabled:z,destroy(){document.removeEventListener("mousedown",U,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",$),y?.(),y=null;}}}function _d(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:c=false,disabled:d=false,tooltip:l,hint:u,icon:p,suffix:f,onClick:g}=e,m=x("div",{className:"lg-label-wrap",id:t}),b=x("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const E=typeof p=="string"?x("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),b.appendChild(E);}const y=x("span",{className:"lg-label-text"},n);b.appendChild(y);const S=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&b.appendChild(S);let C=null;if(f!=null){C=typeof f=="string"?document.createTextNode(f):f;const E=x("span",{className:"lg-label-suffix"});E.appendChild(C),b.appendChild(E);}const v=u?x("div",{className:"lg-label-hint"},u):null;m.classList.add(`lg-label--${i}`),m.classList.add(`lg-label--${a}`),s==="title"&&m.classList.add("lg-label--title"),T(o),d&&m.classList.add("is-disabled"),m.appendChild(b),v&&m.appendChild(v),g&&b.addEventListener("click",g);function T(E){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${E}`);}function h(E){y.textContent=E;}function w(E){T(E);}function _(E){E&&!S.isConnected&&b.appendChild(S),!E&&S.isConnected&&S.remove(),E?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required");}function k(E){m.classList.toggle("is-disabled",!!E);}function P(E){!E&&v&&v.isConnected?v.remove():E&&v?v.textContent=E:E&&!v&&m.appendChild(x("div",{className:"lg-label-hint"},E));}return {root:m,labelEl:b,hintEl:v,setText:h,setTone:w,setRequired:_,setDisabled:k,setHint:P}}function rr(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function po(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=rr(e);return r&&n.appendChild(r),n}function zg(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function qt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=false,tooltip:c,type:d="button",onClick:l,disabled:u=false,fullWidth:p=false}=e,f=x("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=zg(),m=a?po(a,"left"):null,b=i?po(i,"right"):null,y=document.createElement("span");y.className="btn-label";const S=rr(t);S&&y.appendChild(S),!S&&(m||b)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(y),b&&f.appendChild(b);const C=u||s;f.disabled=C,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const v=f;return v.setLoading=T=>{f.setAttribute("aria-busy",String(!!T)),g.style.display=T?"inline-block":"none",f.disabled=T||u;},v.setDisabled=T=>{f.disabled=T||f.getAttribute("aria-busy")==="true";},v.setLabel=T=>{y.replaceChildren();const h=rr(T);h&&y.appendChild(h),!h&&(m||b)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},v.setIconLeft=T=>{if(T==null){m?.remove();return}m?m.replaceChildren(rr(T)):f.insertBefore(po(T,"left"),y);},v.setIconRight=T=>{if(T==null){b?.remove();return}b?b.replaceChildren(rr(T)):f.appendChild(po(T,"right"));},v.setVariant=T=>{f.classList.remove("primary","danger"),T==="primary"&&f.classList.add("primary"),T==="danger"&&f.classList.add("danger");},v}function Mr(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=x("div",{className:"lg-switch-wrap"}),d=x("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),l=x("span",{className:"lg-switch-track"}),u=x("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;a&&i!=="none"&&(p=x("span",{className:"lg-switch-label"},a)),p&&i==="left"?c.append(p,d):p&&i==="right"?c.append(d,p):c.append(d);let f=!!n,g=!!r;function m(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function b(k=false){g||(f=!f,m(),k||s?.(f));}function y(k){k.preventDefault(),b();}function S(k){g||((k.key===" "||k.key==="Enter")&&(k.preventDefault(),b()),k.key==="ArrowLeft"&&(k.preventDefault(),v(false)),k.key==="ArrowRight"&&(k.preventDefault(),v(true)));}d.addEventListener("click",y),d.addEventListener("keydown",S);function C(){return f}function v(k,P=false){f=!!k,m(),P||s?.(f);}function T(k){g=!!k,m();}function h(k){if(!k){p&&(p.remove(),p=null);return}p?p.textContent=k:(p=x("span",{className:"lg-switch-label"},k),c.append(p));}function w(){d.focus();}function _(){d.removeEventListener("click",y),d.removeEventListener("keydown",S);}return m(),{root:c,button:d,isChecked:C,setChecked:v,setDisabled:T,setLabel:h,focus:w,destroy:_}}let Td=null,Ss=null;function Hg(){return Td}function jg(e){Td=e,Ss=null;}function Pd(){return Ss}function Ug(e){Ss=e;}function Wg(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function Ad(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Id(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return "Edge";if(o)return "Opera";if(a)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Vg(){const e=Hg();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Xg(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Ed(){try{return window.top!==window.self}catch{return  true}}function qg(){const e=Ed(),t=Xg(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Ca(){const e=Pd();if(e)return e;const t=qg(),n=Vg(),r=Ad(),o=Id(),a=Ed(),i=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),u=Math.round(s?.height??d),p=Math.round(i.width||0),f=Math.round(i.height||0),g=Math.round(i.availWidth||p),m=Math.round(i.availHeight||f),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,y={surface:t,host:location.hostname,origin:location.origin,isInIframe:a,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:d,visualViewportWidth:l,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:b,orientation:Wg()};return Ug(y),y}function Kg(){return Ca().surface==="discord"}function Yg(){return Ca().platform==="mobile"}function Jg(){Ca();}function Qg(){return Pd()!==null}const qe={init:Jg,isReady:Qg,detect:Ca,isDiscord:Kg,isMobile:Yg,detectOS:Ad,detectBrowser:Id,setPlatformOverride:jg};let sa=false;const or=new Set;function Zg(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const tt=e=>{const t=Zg();if(t){for(const n of or)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function em(){sa||(sa=true,window.addEventListener("keydown",tt,true),window.addEventListener("keypress",tt,true),window.addEventListener("keyup",tt,true),document.addEventListener("keydown",tt,true),document.addEventListener("keypress",tt,true),document.addEventListener("keyup",tt,true));}function tm(){sa&&(sa=false,window.removeEventListener("keydown",tt,true),window.removeEventListener("keypress",tt,true),window.removeEventListener("keyup",tt,true),document.removeEventListener("keydown",tt,true),document.removeEventListener("keypress",tt,true),document.removeEventListener("keyup",tt,true));}function nm(e){return or.size===0&&em(),or.add(e),()=>{or.delete(e),or.size===0&&tm();}}function rm(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function om(e,t){return t?e.replace(t,""):e}function am(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function Md(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=false,allowDashes:i=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:d=true,debounceMs:l=0,onChange:u,onEnter:p,label:f}=e,g=x("div",{className:"lg-input-wrap"}),m=x("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),r&&(m.value=r),f){const E=x("div",{className:"lg-input-label"},f);g.appendChild(E);}g.appendChild(m);const b=rm(o,a,i,s),y=()=>{const E=m.selectionStart??m.value.length,G=m.value.length,J=om(m.value,b);if(J!==m.value){m.value=J;const j=G-J.length,q=Math.max(0,E-j);m.setSelectionRange(q,q);}},S=am(()=>u?.(m.value),l);m.addEventListener("input",()=>{y(),S();}),m.addEventListener("paste",()=>queueMicrotask(()=>{y(),S();})),m.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(m.value);});const C=d?nm(m):()=>{};function v(){return m.value}function T(E){m.value=E??"",y(),S();}function h(){m.focus();}function w(){m.blur();}function _(E){m.disabled=!!E;}function k(){return document.activeElement===m}function P(){C();}return {root:g,input:m,getValue:v,setValue:T,focus:h,blur:w,setDisabled:_,isFocused:k,destroy:P}}function Ie(e,t,n){return Math.min(n,Math.max(t,e))}function br({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1));let s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=a,c=i;break;case 1:s=i,c=a;break;case 2:c=a,d=i;break;case 3:c=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}const u=n-a,p=Math.round((s+u)*255),f=Math.round((c+u)*255),g=Math.round((d+u)*255);return {r:Ie(p,0,255),g:Ie(f,0,255),b:Ie(g,0,255),a:Ie(r,0,1)}}function Rd({r:e,g:t,b:n,a:r}){const o=Ie(e,0,255)/255,a=Ie(t,0,255)/255,i=Ie(n,0,255)/255,s=Math.max(o,a,i),c=Math.min(o,a,i),d=s-c;let l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);const u=s===0?0:d/s;return {h:l,s:u,v:s,a:Ie(r,0,1)}}function Cs({r:e,g:t,b:n}){const r=o=>Ie(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function im({r:e,g:t,b:n,a:r}){const o=Ie(Math.round(r*255),0,255);return `${Cs({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function ar({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function vn(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return {r,g:o,b:a,a:n/255}}function Ni(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return vn(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,a,i,s].some(c=>Number.isNaN(c))?null:{r:o,g:a,b:i,a:s}}return null}function sm(e,t){const n=Ni(e)??vn(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Ie(t,0,1)),Rd(n)}function lm(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function cm(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Gt(e){const t=br(e),n=br({...e,a:1});return {hsva:{...e},hex:Cs(n),hexa:im(t),rgba:ar(t),alpha:e.a}}function dm(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=false,detectMobile:i,onInput:s,onChange:c}=e,l=i?i():qe.detect().platform==="mobile";let u=sm(r,o);const p=Xe({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const b=p.querySelector(".card-toggle");!l&&b&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click();});const y=p.querySelector(".card-collapse");let S=null,C=null,v=null,T=null,h=null,w=null,_=null,k=null,P=null,E="hex";function G(O){const $=Gt(u);O==="input"?s?.($):c?.($);}function J(){const O=Gt(u);if(m.style.setProperty("--cp-preview-color",O.rgba),m.setAttribute("aria-label",`${n}: ${O.hexa}`),!l&&S&&C&&v&&T&&h&&w&&_){const $=br({...u,s:1,v:1,a:1}),z=ar($);S.style.setProperty("--cp-palette-hue",z),C.style.left=`${u.s*100}%`,C.style.top=`${(1-u.v)*100}%`,v.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ar({...$,a:1})} 0%, ${ar({...$,a:0})} 100%)`),T.style.top=`${(1-u.a)*100}%`,h.style.setProperty("--cp-hue-color",ar(br({...u,v:1,s:1,a:1}))),w.style.left=`${u.h/360*100}%`;const D=u.a===1?O.hex:O.hexa,I=O.rgba,F=E==="hex"?D:I;_!==document.activeElement&&(_.value=F),_.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),_.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?_.maxLength=9:_.removeAttribute("maxLength"),_.dataset.mode=E,k&&(k.textContent=E.toUpperCase(),k.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),k.setAttribute("aria-pressed",E==="rgba"?"true":"false"),k.classList.toggle("is-alt",E==="rgba"));}P&&P!==document.activeElement&&(P.value=O.hex);}function j(O,$=null){u={h:(O.h%360+360)%360,s:Ie(O.s,0,1),v:Ie(O.v,0,1),a:Ie(O.a,0,1)},J(),$&&G($);}function q(O,$=null){j(Rd(O),$);}function U(O,$,z){O.addEventListener("pointerdown",D=>{D.preventDefault();const I=D.pointerId,F=W=>{W.pointerId===I&&$(W);},B=W=>{W.pointerId===I&&(document.removeEventListener("pointermove",F),document.removeEventListener("pointerup",B),document.removeEventListener("pointercancel",B),z?.(W));};$(D),document.addEventListener("pointermove",F),document.addEventListener("pointerup",B),document.addEventListener("pointercancel",B);});}if(!l&&y){const O=y.querySelector(".card-body");if(O){O.classList.add("color-picker__body"),C=x("div",{className:"color-picker__palette-cursor"}),S=x("div",{className:"color-picker__palette"},C),T=x("div",{className:"color-picker__alpha-thumb"}),v=x("div",{className:"color-picker__alpha"},T),w=x("div",{className:"color-picker__hue-thumb"}),h=x("div",{className:"color-picker__hue"},w);const $=x("div",{className:"color-picker__main"},S,v),z=x("div",{className:"color-picker__hue-row"},h),D=Md({blockGameKeys:true});_=D.input,_.classList.add("color-picker__hex-input"),_.value="",_.maxLength=9,_.spellcheck=false,_.inputMode="text",_.setAttribute("aria-label",`Hex code for ${n}`),k=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),D.root.classList.add("color-picker__hex-wrap");const I=x("div",{className:"color-picker__hex-row"},k,D.root);O.replaceChildren($,z,I),U(S,B=>{if(!S||!C)return;const W=S.getBoundingClientRect(),be=Ie((B.clientX-W.left)/W.width,0,1),ee=Ie((B.clientY-W.top)/W.height,0,1);j({...u,s:be,v:1-ee},"input");},()=>G("change")),U(v,B=>{if(!v)return;const W=v.getBoundingClientRect(),be=Ie((B.clientY-W.top)/W.height,0,1);j({...u,a:1-be},"input");},()=>G("change")),U(h,B=>{if(!h)return;const W=h.getBoundingClientRect(),be=Ie((B.clientX-W.left)/W.width,0,1);j({...u,h:be*360},"input");},()=>G("change")),k.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",_){const B=Gt(u);_.value=E==="hex"?u.a===1?B.hex:B.hexa:B.rgba;}J(),_?.focus(),_?.select();}),_.addEventListener("input",()=>{if(E==="hex"){const B=lm(_.value);if(B!==_.value){const W=_.selectionStart??B.length;_.value=B,_.setSelectionRange(W,W);}}});const F=()=>{const B=_.value;if(E==="hex"){const W=vn(B);if(!W){_.value=u.a===1?Gt(u).hex:Gt(u).hexa;return}const be=B.startsWith("#")?B.slice(1):B,ee=be.length===4||be.length===8;W.a=ee?W.a:u.a,q(W,"change");}else {const W=cm(B),be=Ni(W);if(!be){_.value=Gt(u).rgba;return}q(be,"change");}};_.addEventListener("change",F),_.addEventListener("blur",F),_.addEventListener("keydown",B=>{B.key==="Enter"&&(F(),_.blur());});}}return l&&(y&&y.remove(),P=x("input",{className:"color-picker__native",type:"color",value:Cs(br({...u,a:1}))}),m.addEventListener("click",()=>P.click()),P.addEventListener("input",()=>{const O=vn(P.value);O&&(O.a=u.a,q(O,"input"),G("change"));}),p.appendChild(P)),J(),{root:p,isMobile:l,getValue:()=>Gt(u),setValue:(O,$)=>{const z=Ni(O)??vn(O)??vn("#FFFFFF");z&&(typeof $=="number"&&(z.a=$),q(z,null));}}}const um=window;function pm(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:um}const fm=pm(),N=fm;function gm(e){try{return !!e.isSecureContext}catch{return  false}}function ks(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Nd(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function mm(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function hm(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function bm(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function xm(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!gm(N))return {ok:false,method:"clipboard-write"};if(!await mm())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function ym(e,t){try{const n=t||ks(),r=hm(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function vm(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=bm(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const a=Nd()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:a}}async function wm(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await xm(n);if(r.ok)return r;const o=t.injectionRoot||ks(t.valueNode||void 0),a=ym(n,o);if(a.ok)return a;const i=vm(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(qe.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Sm(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";const i=ks(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);const s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const a=(t()??"").toString(),i=await wm(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copié"):i.method==="selection"&&r(i.hint||(Nd()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const xr={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function Cm(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let a=r,i=null,s=false;function c(l){const u=n[l]||n[a]||{};t.setAttribute("data-theme",l),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(i!==null&&clearTimeout(i),i=N.setTimeout(()=>{t.classList.remove("theme-anim"),i=null;},320)):s=true,a=l,o?.(l);}function d(){return a}return c(r),{applyTheme:c,getCurrentTheme:d}}const Li={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,system:false}}};async function km(){const e=await Vr("tab-settings",{version:1,defaults:Li,sanitize:o=>({ui:{expandedCards:Vl(Li.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const a=e.get();e.update({ui:{...a.ui,...o,expandedCards:Vl(a.ui.expandedCards,o.expandedCards)}});}function n(o,a){const i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}});}function r(o){const a=e.get();n(o,!a.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}class _m{constructor(){R(this,"injections",new Map);R(this,"state",{});R(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(o){console.error(`[InjectionRegistry] Failed to init ${t}:`,o);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const r=this.injections.get(t);if(!r){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?r.injection.init():r.injection.destroy(),console.log(`[InjectionRegistry] ${r.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const r=we(n.storageKey,n.defaultEnabled??false);this.state[t]=r;}saveState(t){const n=this.injections.get(t);n&&Ae(n.storageKey,this.state[t]);}}let Qa=null;function Ld(){return Qa||(Qa=new _m),Qa}function Fd(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Tm(){return Object.keys(xr).map(e=>({value:e,label:Fd(e)}))}const Pm=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function Am(e){return Fd(e.replace(/^--/,""))}function Im(e){return e.alpha<1?e.rgba:e.hex}const Et={pets:{enabled:true},journalChecker:{enabled:true},autoFavorite:{enabled:true},bulkFavorite:{enabled:false},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class Em extends sn{constructor(n){super({id:"tab-settings",label:"Settings"});R(this,"featureConfig",Et);this.deps=n;}async build(n){const r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await km();}catch{o={get:()=>Li,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const a=o.get(),i=we(Se.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(i);const s=Object.keys(xr),c=this.deps.getCurrentTheme?.()??this.deps.initialTheme,d=s.includes(c)?c:s[0]??"dark";let l=d;const u=_d({text:"Theme",tone:"muted",size:"lg"}),p=Gg({options:Tm(),value:d,onChange:S=>{l=S,this.deps.applyTheme(S),this.renderThemePickers(S,f,l);}}),f=x("div",{className:"settings-theme-grid"}),g=Xe({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:S=>o.setCardExpanded("style",S)},x("div",{className:"kv settings-theme-row"},u.root,p.root),f);this.renderThemePickers(d,f,l);const m=this.createHUDSectionsCard({defaultExpanded:!!a.ui.expandedCards.hudSections,onExpandChange:S=>o.setCardExpanded("hudSections",S)}),b=this.createEnhancementsCard({defaultExpanded:!!a.ui.expandedCards.enhancements,onExpandChange:S=>o.setCardExpanded("enhancements",S)}),y=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:S=>o.setCardExpanded("system",S)});r.appendChild(g),r.appendChild(m),r.appendChild(b),r.appendChild(y);}mergeFeatureConfig(n){return {pets:{...Et.pets,...n.pets},journalChecker:{...Et.journalChecker,...n.journalChecker},autoFavorite:{...Et.autoFavorite,...n.autoFavorite},bulkFavorite:{...Et.bulkFavorite,...n.bulkFavorite},cropSizeIndicator:{...Et.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Et.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Et.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){Ae(Se.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const r=(o,a,i,s,c=false,d=false)=>{const l=x("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${c?"0":"12px"} 0 ${d?"0":"12px"} 0;
          ${d?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${a?"1":"0.5"};
        `}),u=x("div"),p=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},o),f=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);u.append(p,f);const g=Mr({checked:a,onChange:m=>{l.style.opacity=m?"1":"0.5",i(m);}});return l.append(u,g.root),l};return Xe({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},r("Auto-Favorite",this.featureConfig.autoFavorite.enabled,o=>{this.featureConfig.autoFavorite.enabled=o,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),r("Journal Checker",this.featureConfig.journalChecker.enabled,o=>{this.featureConfig.journalChecker.enabled=o,this.saveFeatureConfig();},"Track collection completion progress"),r("Pets",this.featureConfig.pets.enabled,o=>{this.featureConfig.pets.enabled=o,this.saveFeatureConfig();},"Pet management and team tracking",false,true)))}createSectionRow(n,r,o,a,i=false,s=false){const c=x("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${i?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${r?"1":"0.5"};
      `}),d=x("div"),l=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),u=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},a);d.append(l,u);const p=Mr({checked:r,onChange:f=>{c.style.opacity=f?"1":"0.5",o(f);}});return c.append(d,p.root),c}createEnhancementsCard(n){const r=Ld(),a=[...r.getAll()].sort((s,c)=>s.name.localeCompare(c.name)),i=a.map((s,c)=>{const d=c===0,l=c===a.length-1,u=r.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{r.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,d,l)});return Xe({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},...i))}renderThemePickers(n,r,o){const a=xr[n];if(r.replaceChildren(),!!a)for(const i of Pm){const s=a[i];if(s==null)continue;const c=dm({label:Am(i),value:s,defaultExpanded:false,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(c.root);}}updateThemeVar(n,r,o,a){const i=xr[n];i&&(i[r]=Im(o),a===n&&this.deps.applyTheme(n));}createEnvCard(n){const r=n?.defaultExpanded??false,o=n?.onExpandChange,a=(y,S)=>{const C=x("div",{className:"kv kv--inline-mobile"}),v=x("label",{},y),T=x("div",{className:"ro"});return typeof S=="string"?T.textContent=S:T.append(S),C.append(v,T),C},i=x("code",{},"—"),s=x("span",{},"—"),c=x("span",{},"—"),d=x("span",{},"—"),l=x("span",{},"—"),u=x("span",{},"—"),p=()=>{const y=qe.detect();c.textContent=y.surface,d.textContent=y.platform,l.textContent=y.browser??"Unknown",u.textContent=y.os??"Unknown",i.textContent=y.host,s.textContent=y.isInIframe?"Yes":"No";},f=qt({label:"Copy JSON",variant:"primary",size:"sm"});Sm(f,()=>{const y=qe.detect();return JSON.stringify(y,null,2)});const g=x("div",{style:"width:100%;display:flex;justify-content:center;"},f),m=Xe({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:r,onExpandChange:o},a("Surface",c),a("Platform",d),a("Browser",l),a("OS",u),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p();};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),m}}function _s(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=true,zebra:i=true,animations:s=true,respectReducedMotion:c=true,compact:d=false,maxHeight:l,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:b=(X,te)=>String(te),onSortChange:y,onSelectionChange:S,onRowClick:C}=e;let v=n.slice(),T=r.slice(),h=r.slice(),w=null,_=null,k=1;const P=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,E=!!s&&!(c&&P),G=x("div",{className:"lg-table-wrap",id:t});if(l!=null){const X=typeof l=="number"?`${l}px`:l;G.style.setProperty("--tbl-max-h",X);}const J=x("div",{className:"lg-table"}),j=x("div",{className:"lg-thead"}),q=x("div",{className:"lg-tbody"}),U=x("div",{className:"lg-tfoot"});a&&G.classList.add("sticky"),i&&G.classList.add("zebra"),d&&G.classList.add("compact"),u&&G.classList.add("selectable");const O=p==="switch"?"52px":"36px";G.style.setProperty("--check-w",O);function $(X){return X==="center"?"center":X==="right"?"flex-end":"flex-start"}function z(){const X=v.map(le=>{const fe=(le.width||"1fr").trim();return /\bfr$/.test(fe)?`minmax(0, ${fe})`:fe}),te=(u?[O,...X]:X).join(" ");G.style.setProperty("--lg-cols",te);}z();function D(){return o?Math.max(1,Math.ceil(T.length/o)):1}function I(){if(!o)return T;const X=(k-1)*o;return T.slice(X,X+o)}function F(){if(!w||!_)return;const X=v.find(fe=>String(fe.key)===w),te=_==="asc"?1:-1,le=X?.sortFn?(fe,xe)=>te*X.sortFn(fe,xe):(fe,xe)=>{const ae=fe[w],se=xe[w];return ae==null&&se==null?0:ae==null?-1*te:se==null?1*te:typeof ae=="number"&&typeof se=="number"?te*(ae-se):te*String(ae).localeCompare(String(se),void 0,{numeric:true,sensitivity:"base"})};T.sort(le);}const B=new Set(g);function W(){return Array.from(B)}const be=new Map;function ee(X){B.clear(),X.forEach(te=>B.add(te)),Ce(),be.forEach((te,le)=>{te.setChecked(B.has(le),true);}),Wn(),S?.(W());}function Q(){B.clear(),Ce(),be.forEach(X=>X.setChecked(false,true)),Wn(),S?.(W());}let ue=null;function Ce(){if(!ue)return;const X=I();if(!X.length){ue.indeterminate=false,ue.checked=false;return}const te=X.map((fe,xe)=>b(fe,(k-1)*(o||0)+xe)),le=te.reduce((fe,xe)=>fe+(B.has(xe)?1:0),0);ue.checked=le===te.length,ue.indeterminate=le>0&&le<te.length;}function St(){const X=q.offsetWidth-q.clientWidth;j.style.paddingRight=X>0?`${X}px`:"0px";}function fn(){requestAnimationFrame(St);}const Ka=new ResizeObserver(()=>St()),$l=()=>St();function pg(){j.replaceChildren();const X=x("div",{className:"lg-tr lg-tr-head"});if(u){const te=x("div",{className:"lg-th lg-th-check"});m||(ue=x("input",{type:"checkbox"}),ue.addEventListener("change",()=>{const le=I(),fe=ue.checked;le.forEach((xe,ae)=>{const se=b(xe,(k-1)*(o||0)+ae);fe?B.add(se):B.delete(se);}),S?.(W()),Wn();}),te.appendChild(ue)),X.appendChild(te);}v.forEach(te=>{const le=x("button",{className:"lg-th",type:"button",title:te.title||te.header});le.textContent=te.header,te.align&&le.style.setProperty("--col-justify",$(te.align)),te.sortable&&le.classList.add("sortable"),w===String(te.key)&&_?le.setAttribute("data-sort",_):le.removeAttribute("data-sort"),te.sortable&&le.addEventListener("click",()=>{const fe=String(te.key);w!==fe?(w=fe,_="asc"):(_=_==="asc"?"desc":_==="desc"?null:"asc",_||(w=null,T=h.slice())),y?.(w,_),w&&_&&F(),so();}),X.appendChild(le);}),j.appendChild(X);try{Ka.disconnect();}catch{}Ka.observe(q),fn();}function Ya(X){return Array.from(X.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Gl(X){return X.querySelector(".lg-td, .lg-td-check")}function zl(X){const te=Gl(X);return te?te.getBoundingClientRect():null}function Wn(){const X=I(),te=new Map;Array.from(q.children).forEach(ae=>{const se=ae,$e=se.getAttribute("data-id");if(!$e)return;const Je=zl(se);Je&&te.set($e,Je);});const le=new Map;Array.from(q.children).forEach(ae=>{const se=ae,$e=se.getAttribute("data-id");$e&&le.set($e,se);});const fe=[];for(let ae=0;ae<X.length;ae++){const se=X[ae],$e=(o?(k-1)*o:0)+ae,Je=b(se,$e);fe.push(Je);let ke=le.get(Je);ke||(ke=fg(se,$e),E&&Ya(ke).forEach(Vn=>{Vn.style.transform="translateY(6px)",Vn.style.opacity="0";})),q.appendChild(ke);}const xe=[];if(le.forEach((ae,se)=>{fe.includes(se)||xe.push(ae);}),!E){xe.forEach(ae=>ae.remove()),Ce(),fn();return}fe.forEach(ae=>{const se=q.querySelector(`.lg-tr-body[data-id="${ae}"]`);if(!se)return;const $e=zl(se),Je=te.get(ae),ke=Ya(se);if(Je&&$e){const mt=Je.left-$e.left,gn=Je.top-$e.top;ke.forEach(It=>{It.style.transition="none",It.style.transform=`translate(${mt}px, ${gn}px)`,It.style.opacity="1";}),Gl(se)?.getBoundingClientRect(),ke.forEach(It=>{It.style.willChange="transform, opacity",It.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ke.forEach(It=>{It.style.transform="translate(0,0)";});});}else ke.forEach(mt=>{mt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ke.forEach(mt=>{mt.style.transform="translate(0,0)",mt.style.opacity="1";});});const Ja=mt=>{(mt.propertyName==="transform"||mt.propertyName==="opacity")&&(ke.forEach(gn=>{gn.style.willChange="",gn.style.transition="",gn.style.transform="",gn.style.opacity="";}),mt.currentTarget.removeEventListener("transitionend",Ja));},Vn=ke[0];Vn&&Vn.addEventListener("transitionend",Ja);}),xe.forEach(ae=>{const se=Ya(ae);se.forEach(ke=>{ke.style.willChange="transform, opacity",ke.style.transition="transform .18s ease, opacity .18s ease",ke.style.opacity="0",ke.style.transform="translateY(-6px)";});const $e=ke=>{ke.propertyName==="opacity"&&(ke.currentTarget.removeEventListener("transitionend",$e),ae.remove());},Je=se[0];Je?Je.addEventListener("transitionend",$e):ae.remove();}),Ce(),fn();}function fg(X,te){const le=b(X,te),fe=x("div",{className:"lg-tr lg-tr-body","data-id":le});if(u){const xe=x("div",{className:"lg-td lg-td-check"});if(p==="switch"){const ae=Mr({size:"sm",checked:B.has(le),onChange:se=>{se?B.add(le):B.delete(le),Ce(),S?.(W());}});be.set(le,ae),xe.appendChild(ae.root);}else {const ae=x("input",{type:"checkbox",className:"lg-row-check"});ae.checked=B.has(le),ae.addEventListener("change",se=>{se.stopPropagation(),ae.checked?B.add(le):B.delete(le),Ce(),S?.(W());}),ae.addEventListener("click",se=>se.stopPropagation()),xe.appendChild(ae);}fe.appendChild(xe);}return v.forEach(xe=>{const ae=x("div",{className:"lg-td"});xe.align&&ae.style.setProperty("--col-justify",$(xe.align));let se=xe.render?xe.render(X,te):String(X[xe.key]??"");typeof se=="string"?ae.textContent=se:ae.appendChild(se),fe.appendChild(ae);}),(C||u&&f)&&(fe.classList.add("clickable"),fe.addEventListener("click",xe=>{if(!xe.target.closest(".lg-td-check")){if(u&&f){const ae=!B.has(le);if(ae?B.add(le):B.delete(le),Ce(),p==="switch"){const se=be.get(le);se&&se.setChecked(ae,true);}else {const se=fe.querySelector(".lg-row-check");se&&(se.checked=ae);}S?.(W());}C?.(X,te,xe);}})),fe}function Hl(){if(U.replaceChildren(),!o)return;const X=D(),te=x("div",{className:"lg-pager"}),le=x("button",{className:"btn",type:"button"},"←"),fe=x("button",{className:"btn",type:"button"},"→"),xe=x("span",{className:"lg-pager-info"},`${k} / ${X}`);le.disabled=k<=1,fe.disabled=k>=X,le.addEventListener("click",()=>io(k-1)),fe.addEventListener("click",()=>io(k+1)),te.append(le,xe,fe),U.appendChild(te);}function io(X){const te=D();k=Math.min(Math.max(1,X),te),Wn(),Hl();}function so(){z(),pg(),Wn(),Hl();}function gg(X){h=X.slice(),T=X.slice(),w&&_&&F(),io(1);}function mg(X){v=X.slice(),so();}function hg(X,te="asc"){w=X,_=X?te:null,w&&_?F():T=h.slice(),so();}function bg(){try{Ka.disconnect();}catch{}window.removeEventListener("resize",$l);}return J.append(j,q,U),G.appendChild(J),window.addEventListener("resize",$l),so(),{root:G,setData:gg,setColumns:mg,sortBy:hg,getSelection:W,setSelection:ee,clearSelection:Q,setPage:io,getState:()=>({page:k,pageCount:D(),sortKey:w,sortDir:_}),destroy:bg}}let la=false;const ir=new Set;function Mm(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const nt=e=>{const t=Mm();if(t){for(const n of ir)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Rm(){la||(la=true,window.addEventListener("keydown",nt,true),window.addEventListener("keypress",nt,true),window.addEventListener("keyup",nt,true),document.addEventListener("keydown",nt,true),document.addEventListener("keypress",nt,true),document.addEventListener("keyup",nt,true));}function Nm(){la&&(la=false,window.removeEventListener("keydown",nt,true),window.removeEventListener("keypress",nt,true),window.removeEventListener("keyup",nt,true),document.removeEventListener("keydown",nt,true),document.removeEventListener("keypress",nt,true),document.removeEventListener("keyup",nt,true));}function Lm(e){return ir.size===0&&Rm(),ir.add(e),()=>{ir.delete(e),ir.size===0&&Nm();}}function fo(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Fm(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Ts(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:a=false,autoFocus:i=false,onChange:s,onSearch:c,autoSearch:d=false,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:b,submitLabel:y,loading:S=false,blockGameKeys:C=true}=e,v=x("div",{className:"search"+(o?` search--${o}`:""),id:t}),T=x("span",{className:"search-ico search-ico--left"});if(p){const Q=fo(p);Q&&T.appendChild(Q);}else T.textContent="🔎",T.style.opacity=".9";const h=x("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":b||n}),w=x("span",{className:"search-ico search-ico--right"});if(f){const Q=fo(f);Q&&w.appendChild(Q);}const _=Fm();_.classList.add("search-spinner");const k=g?x("button",{className:"search-clear",type:"button",title:m},"×"):null,P=y!=null?x("button",{className:"btn search-submit",type:"button"},y):null,E=x("div",{className:"search-field"},T,h,w,_,...k?[k]:[]);v.append(E,...P?[P]:[]);let G=!!a,J=null;function j(Q){_.style.display=Q?"inline-block":"none",v.classList.toggle("is-loading",Q);}function q(){J!=null&&(window.clearTimeout(J),J=null);}function U(Q){q(),l>0?J=window.setTimeout(()=>{J=null,Q();},l):Q();}function O(){s?.(h.value),d&&c&&c(h.value);}h.addEventListener("input",()=>{U(O);}),h.addEventListener("keydown",Q=>{Q.key==="Enter"?(Q.preventDefault(),q(),c?.(h.value)):Q.key==="Escape"&&(h.value.length>0?D("",{notify:true}):h.blur());}),k&&k.addEventListener("click",()=>D("",{notify:true})),P&&P.addEventListener("click",()=>c?.(h.value));let $=()=>{};if(C&&($=Lm(h)),u){const Q=ue=>{if(ue.key===u&&!ue.ctrlKey&&!ue.metaKey&&!ue.altKey){const Ce=document.activeElement;Ce&&(Ce.tagName==="INPUT"||Ce.tagName==="TEXTAREA"||Ce.isContentEditable)||(ue.preventDefault(),h.focus());}};window.addEventListener("keydown",Q,true),v.__cleanup=()=>{window.removeEventListener("keydown",Q,true),$();};}else v.__cleanup=()=>{$();};function z(Q){G=!!Q,h.disabled=G,k&&(k.disabled=G),P&&(P.disabled=G),v.classList.toggle("disabled",G);}function D(Q,ue={}){const Ce=h.value;h.value=Q??"",ue.notify&&Ce!==Q&&U(O);}function I(){return h.value}function F(){h.focus();}function B(){h.blur();}function W(Q){h.placeholder=Q;}function be(Q){D("",Q);}return z(G),j(S),i&&F(),{root:v,input:h,getValue:I,setValue:D,focus:F,blur:B,setDisabled:z,setPlaceholder:W,clear:be,setLoading:j,setIconLeft(Q){T.replaceChildren();const ue=fo(Q??"🔎");ue&&T.appendChild(ue);},setIconRight(Q){w.replaceChildren();const ue=fo(Q??"");ue&&w.appendChild(ue);}}}const ka=e=>new Promise(t=>setTimeout(t,e)),ut=e=>{try{return e()}catch{return}},vt=(e,t,n)=>Math.max(t,Math.min(n,e)),Bm=e=>vt(e,0,1);async function Xl(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,ka(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}let Ps=null;function Bd(){return Ps}function Om(e){Ps=e;}function Od(){return Ps!==null}const Dm=/\/(?:r\/\d+\/)?version\/([^/]+)/,$m=15e3,Gm=50;function zm(){return N?.document??(typeof document<"u"?document:null)}function As(e={}){if(Od())return;const t=e.doc??zm();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const a=n.item(r)?.src;if(!a)continue;const i=a.match(Dm);if(i?.[1]){Om(i[1]);return}}}function Hm(){return As(),Bd()}function jm(){return Od()}async function Um(e={}){const t=e.timeoutMs??$m,n=performance.now();for(;performance.now()-n<t;){As();const r=Bd();if(r)return r;await ka(Gm);}throw new Error("MGVersion timeout (gameVersion not found)")}const Is={init:As,isReady:jm,get:Hm,wait:Um},Wm=N?.location?.origin||"https://magicgarden.gg";function Dd(){return typeof GM_xmlhttpRequest=="function"}function $d(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function Es(e){if(Dd())return JSON.parse((await $d(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Gd(e){if(Dd())return (await $d(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Vm(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=N?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a);},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},a.src=r;})}const _t=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Xm=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",ql=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Xm(e)+String(t||"");let Ms=null,zd=null;function qm(){return Ms}function Km(){return zd}function Ym(e){Ms=e;}function Jm(e){zd=e;}function Hd(){return Ms!==null}const Qm=15e3;async function Zm(e={}){Hd()||await Rs(e);}async function Rs(e={}){const t=qm();if(t)return t;const n=Km();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Is.wait({timeoutMs:Qm}),a=`${Wm}/version/${o}/assets/`;return Ym(a),a})();return Jm(r),r}async function eh(e){const t=await Rs();return _t(t,e)}function th(){return Hd()}const ln={init:Zm,isReady:th,base:Rs,url:eh},jd=new Map;function nh(e){return jd.get(e)}function rh(e,t){jd.set(e,t);}const Ud="manifest.json";let Fi=null;async function oh(){Fi||(Fi=await Wd());}function ah(){return Fi!==null}async function Wd(e={}){const t=e.baseUrl??await ln.base(),n=nh(t);if(n)return n;const r=Es(_t(t,Ud));return rh(t,r),r}function ih(e,t){return e.bundles.find(n=>n.name===t)??null}function sh(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Ud&&t.add(r);return Array.from(t)}const Tt={init:oh,isReady:ah,load:Wd,getBundle:ih,listJsonFromBundle:sh},lh=N,dt=lh.Object??Object,_a=dt.keys,ca=dt.values,da=dt.entries,Kl=new WeakSet;function ch(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const Z=ch(),zt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},dh=["Rain","Frost","Dawn","AmberMoon"],Yl=/main-[^/]+\.js(\?|$)/,uh=6,ph=150,fh=2e3,gh=200,mh=50,hh=10,bh=1e3,Bi="ProduceScaleBoost",Ht=(e,t)=>t.every(n=>e.includes(n));function jt(e,t){Z.data[e]==null&&(Z.data[e]=t,ua()&&qd());}function ua(){return Object.values(Z.data).every(e=>e!=null)}function Vd(e,t){if(!e||typeof e!="object"||Kl.has(e))return;Kl.add(e);let n;try{n=_a(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!Z.data.items&&Ht(n,zt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&jt("items",r)),!Z.data.decor&&Ht(n,zt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&jt("decor",r)),!Z.data.mutations&&Ht(n,zt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&jt("mutations",r)),!Z.data.eggs&&Ht(n,zt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&jt("eggs",r)),!Z.data.pets&&Ht(n,zt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&jt("pets",r)),!Z.data.abilities&&Ht(n,zt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&jt("abilities",r)),!Z.data.plants&&Ht(n,zt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&jt("plants",r)),!(t>=uh))for(const a of n){let i;try{i=r[a];}catch{continue}i&&typeof i=="object"&&Vd(i,t+1);}}function qo(e){try{Vd(e,0);}catch{}}function Xd(){if(!Z.isHookInstalled){if(dt.__MG_HOOKED__){Z.isHookInstalled=true;return}dt.__MG_HOOKED__=true,Z.isHookInstalled=true;try{dt.keys=function(t){return qo(t),_a.apply(this,arguments)},ca&&(dt.values=function(t){return qo(t),ca.apply(this,arguments)}),da&&(dt.entries=function(t){return qo(t),da.apply(this,arguments)});}catch{}}}function qd(){if(Z.isHookInstalled){try{dt.keys=_a,ca&&(dt.values=ca),da&&(dt.entries=da);}catch{}Z.isHookInstalled=false;}}function xh(){if(Z.scanInterval||ua())return;const e=()=>{if(ua()||Z.scanAttempts>ph){Kd();return}Z.scanAttempts++;try{_a(N).forEach(t=>{try{qo(N[t]);}catch{}});}catch{}};e(),Z.scanInterval=setInterval(e,fh);}function Kd(){Z.scanInterval&&(clearInterval(Z.scanInterval),Z.scanInterval=null);}const Jl=N;function yh(){try{for(const e of Jl.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Yl.test(t))return t}}catch{}try{for(const e of Jl.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Yl.test(t))return t}}catch{}return null}function vh(e,t){const n=[];let r=e.indexOf(t);for(;r!==-1;)n.push(r),r=e.indexOf(t,r+t.length);return n}function Ns(e,t){let n=0,r="",o=false;for(let a=t;a<e.length;a++){const i=e[a];if(r){if(o){o=false;continue}if(i==="\\"){o=true;continue}i===r&&(r="");continue}if(i==='"'||i==="'"||i==="`"){r=i;continue}if(i==="{")n++;else if(i==="}"&&--n===0)return e.slice(t,a+1)}return null}function wh(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);return o<0||o>t?null:Ns(e,o)}let Za=null,Xn=null;async function Yd(){return Za||Xn||(Xn=(async()=>{const e=yh();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return Za=n,n}catch{return null}finally{Xn=null;}})(),Xn)}function Sh(e){const t={};let n=false;for(const r of dh){const o=e?.[r];if(!o||typeof o!="object")continue;const a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Ch(){if(Z.data.weather)return  true;const e=await Yd();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=wh(e,t);if(!n)return  false;const r=n.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let o;try{o=Function('"use strict";return('+r+")")();}catch{return  false}const a=Sh(o);return a?(Z.data.weather=a,true):false}function kh(){if(Z.weatherPollingTimer)return;Z.weatherPollAttempts=0;const e=setInterval(async()=>{(await Ch()||++Z.weatherPollAttempts>gh)&&(clearInterval(e),Z.weatherPollingTimer=null);},mh);Z.weatherPollingTimer=e;}function _h(){Z.weatherPollingTimer&&(clearInterval(Z.weatherPollingTimer),Z.weatherPollingTimer=null);}const Th={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function Ph(e){const t=vh(e,Bi);if(!t.length)return null;for(const n of t){const r=Math.max(0,n-4e3),o=Math.min(e.length,n+4e3),i=e.slice(r,o).lastIndexOf("switch(");if(i===-1)continue;const s=r+i,c=e.indexOf("{",s);if(c===-1)continue;const d=Ns(e,c);if(d&&d.includes(Bi)&&(d.includes('bg:"')||d.includes("bg:'")))return d}return null}function Ah(e){const t={},n=[],r=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,o=(i,s)=>{const c=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),d=i.match(c);return d?d[2]:null};let a;for(;(a=r.exec(e))!==null;){if(a[2]){n.push(a[2]);continue}const i=a[0];if(i.startsWith("default")){n.length=0;continue}if(!i.startsWith("return"))continue;const s=e.indexOf("{",a.index);if(s===-1){n.length=0;continue}const c=Ns(e,s);if(!c){n.length=0;continue}const d=o(c,"bg");if(!d){n.length=0;continue}const l=o(c,"hover")||d;for(const u of n)t[u]||(t[u]={bg:d,hover:l});n.length=0;}return Object.keys(t).length?t:null}async function Ih(){const e=await Yd();if(!e)return null;const t=Ph(e);return t?Ah(t):null}function Eh(e){const t=e[Bi];return t!=null&&typeof t=="object"&&"color"in t}async function Mh(){if(!Z.data.abilities)return  false;const e=Z.data.abilities;if(Eh(e))return  true;const t=await Ih();if(!t)return  false;const n={};for(const[r,o]of Object.entries(e)){const a=t[r]||Th;n[r]={...o,color:{bg:a.bg,hover:a.hover}};}return Z.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function Rh(){if(Z.colorPollingTimer)return;Z.colorPollAttempts=0;const e=setInterval(async()=>{(await Mh()||++Z.colorPollAttempts>hh)&&(clearInterval(e),Z.colorPollingTimer=null);},bh);Z.colorPollingTimer=e;}function Nh(){Z.colorPollingTimer&&(clearInterval(Z.colorPollingTimer),Z.colorPollingTimer=null);}function Lh(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function Fh(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Bh(){return {cache:new Map,maxEntries:200}}const Oh={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Dh={enabled:true,maxEntries:200},Fe=Lh(),$h=Fh(),Gh={...Oh},zh=Bh(),Hh={...Dh};function He(){return Fe}function Ln(){return $h}function Rr(){return Gh}function Nr(){return zh}function Oi(){return Hh}function Jd(){return Fe.ready}const Ql=Function.prototype.bind,ge={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Qd,Zd,eu;const jh=new Promise(e=>{Qd=e;}),Uh=new Promise(e=>{Zd=e;}),Wh=new Promise(e=>{eu=e;});function Vh(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Xh(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function qh(e){ge.engine=e,ge.tos=Xh(e)||null,ge.app=e.app||null,ge.renderer=e.app?.renderer||null,ge.ticker=e.app?.ticker||null,ge.stage=e.app?.stage||null;try{Qd(e);}catch{}try{ge.app&&Zd(ge.app);}catch{}try{ge.renderer&&eu(ge.renderer);}catch{}}function Ls(){return ge.engine?true:(ge._bindPatched||(ge._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Ql.call(this,e,...t);try{!ge.engine&&Vh(e)&&(Function.prototype.bind=Ql,ge._bindPatched=!1,qh(e));}catch{}return n}),false)}Ls();async function Kh(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(ge.engine)return  true;Ls(),await ka(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Yh(e=15e3){return ge.engine||await Kh(e),true}function Jh(){return ge.engine&&ge.app?{ok:true,engine:ge.engine,tos:ge.tos,app:ge.app}:(Ls(),{ok:false,engine:ge.engine,tos:ge.tos,app:ge.app,note:"Not captured. Wait for room, or reload."})}const rt={engineReady:jh,appReady:Uh,rendererReady:Wh,engine:()=>ge.engine,tos:()=>ge.tos,app:()=>ge.app,renderer:()=>ge.renderer,ticker:()=>ge.ticker,stage:()=>ge.stage,PIXI:()=>N.PIXI||null,init:Yh,hook:Jh,ready:()=>!!ge.engine};function pa(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Xr(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?pa(r):`sprite/${n}/${r}`}function Lr(e,t,n,r){const o=Xr(e,t);if(n.has(o)||r.has(o))return o;const a=String(t||"").trim();if(n.has(a)||r.has(a))return a;const i=pa(a);return n.has(i)||r.has(i)?i:o}function Qh(e,t,n=25e3){const r=[e],o=new Set;let a=0;for(;r.length&&a++<n;){const i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;const s=i.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function Zh(e){const t=N.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=Qh(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function eb(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return Zh(e)}catch{await ka(50);}throw new Error("Constructors timeout")}const Ut=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function tb(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function ei(e,t,n,r,o){return new e(t,n,r,o)}function nb(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0);}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.();}catch{}return s}function rb(e,t,n,r){const{Texture:o,Rectangle:a}=r;for(const[i,s]of Object.entries(e.frames)){const c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,f=ei(a,c.x,c.y,u,p),g=s.sourceSize||{w:c.w,h:c.h},m=ei(a,0,0,g.w,g.h);let b=null;if(s.trimmed&&s.spriteSourceSize){const y=s.spriteSourceSize;b=ei(a,y.x,y.y,y.w,y.h);}n.set(i,nb(o,t,f,m,b,l,s.anchor||null));}}function ob(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a);}}function ab(e,t){const n=(r,o)=>{const a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function ib(e,t){const n=await Tt.load({baseUrl:e}),r=Tt.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=Tt.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,c=new Map;async function d(l){if(a.has(l))return;a.add(l);const u=await Es(_t(e,l));if(!tb(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const b of p)await d(ql(l,b));const f=ql(l,u.meta.image),g=await Vm(await Gd(_t(e,f))),m=t.Texture.from(g);rb(u,m,i,t),ob(u,i,s),ab(u,c);}for(const l of o)await d(l);return {textures:i,animations:s,categoryIndex:c}}let go=null;async function sb(){return Fe.ready?true:go||(go=(async()=>{const e=performance.now();Ut("init start");const t=await Xl(rt.appReady,15e3,"PIXI app");Ut("app ready");const n=await Xl(rt.rendererReady,15e3,"PIXI renderer");Ut("renderer ready"),Fe.app=t,Fe.renderer=n||t?.renderer||null,Fe.ctors=await eb(t),Ut("constructors resolved"),Fe.baseUrl=await ln.base(),Ut("base url",Fe.baseUrl);const{textures:r,animations:o,categoryIndex:a}=await ib(Fe.baseUrl,Fe.ctors);return Fe.textures=r,Fe.animations=o,Fe.categoryIndex=a,Ut("atlases loaded","textures",Fe.textures.size,"animations",Fe.animations.size,"categories",Fe.categoryIndex?.size??0),Fe.ready=true,Ut("ready in",Math.round(performance.now()-e),"ms"),true})(),go)}const Fn={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},tu=Object.keys(Fn),lb=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Zl=new Map(lb.map((e,t)=>[e,t]));function fa(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(Zl.get(n)??1/0)-(Zl.get(r)??1/0))}const cb=["Wet","Chilled","Frozen"],db=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),ub={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},pb={Pepper:.5,Banana:.6},fb=256,gb=.5,mb=2;function nu(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=fa(e),n=hb(e),r=bb(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function hb(e){const t=e.filter((o,a,i)=>Fn[o]&&i.indexOf(o)===a);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?fa(t.filter(o=>!cb.includes(o))):fa(t)}function bb(e){const t=e.filter((n,r,o)=>Fn[n]?.overlayTall&&o.indexOf(n)===r);return fa(t)}function ti(e,t){return e.map(n=>({name:n,meta:Fn[n],overlayTall:Fn[n]?.overlayTall??null,isTall:t}))}const xb={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},mo=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function yb(e){return mo.has(e)?e:mo.has("overlay")?"overlay":mo.has("screen")?"screen":mo.has("lighter")?"lighter":"source-atop"}function vb(e,t,n,r,o=false){const a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}const c=Math.cos(a),d=Math.sin(a),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-c*l,s-d*l,i+c*l,s+d*l)}function ec(e,t,n,r,o=false){const a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?vb(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,c)=>i.addColorStop(c/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n);}function wb(e,t,n,r){const o=xb[n];if(!o)return;const a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);const i=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const d=a.masked?yb(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const u=l.getContext("2d");u.imageSmoothingEnabled=false,ec(u,s,c,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0);}else ec(e,s,c,a,i);e.restore();}function Sb(e){return /tallplant/i.test(e)}function Fs(e){const t=String(e||"").split("/");return t[t.length-1]||""}function ru(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function Cb(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const i=t.get(r);if(i)return {tex:i,key:r}}}return null}function kb(e,t,n,r){if(!t)return null;const o=Fs(e),a=ru(t);for(const i of a){const s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(const c of s){const d=n.get(c);if(d)return {tex:d,key:c}}{const c=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(c);if(d)return {tex:d,key:c};const l=`sprite/mutation-overlay/${i}`,u=n.get(l);if(u)return {tex:u,key:l};const p=Cb(t,n);if(p)return p}}return null}function _b(e,t,n,r){if(!t)return null;const o=Fn[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const a=Fs(e),i=ru(t);for(const s of i){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(const d of c){const l=r.get(d);if(l)return l}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function Tb(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0;let s=pb[t]??a;const c=o>r*1.5;let d=ub[t]??(c?i:.4);const l={x:(s-a)*r,y:(d-i)*o},u=Math.min(r,o),p=Math.min(1.5,u/fb);let f=gb*p;return n&&(f*=mb),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:f}}function ou(e,t){return `${t.sig}::${e}`}function au(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Pb(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function Ab(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-au(r??null));}}function iu(e,t){const n=e.lru.get(t);return n?(Pb(e,t,n),n):null}function su(e,t,n,r){e.lru.set(t,n),e.cost+=au(n),Ab(e,r);}function Ib(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Eb(e,t){return e.srcCanvas.get(t)??null}function Mb(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function Ta(e,t,n,r,o){const a=Eb(r,e);if(a)return a;let i=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),d=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const l=Math.round(d.width/s),u=Math.round(d.height/s);i=document.createElement("canvas"),i.width=l,i.height=u;const p=i.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,l,u));}else i=d;}}catch{}if(!i){const c=e?.frame||e?._frame,d=e?.orig||e?._orig,l=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");i=document.createElement("canvas");const f=Math.max(1,(d?.width??c.width)|0),g=Math.max(1,(d?.height??c.height)|0),m=l?.x??0,b=l?.y??0;i.width=f,i.height=g;const y=i.getContext("2d");y.imageSmoothingEnabled=false,u===true||u===2||u===8?(y.save(),y.translate(m+c.height/2,b+c.width/2),y.rotate(-Math.PI/2),y.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),y.restore()):y.drawImage(p,c.x,c.y,c.width,c.height,m,b,c.width,c.height);}return Mb(r,e,i,o),i}function Rb(e,t,n,r,o,a,i,s){const{w:c,h:d,aX:l,aY:u,basePos:p}=t,f=[];for(const g of n){const m=new r.Sprite(e);m.anchor?.set?.(l,u),m.position.set(p.x,p.y),m.zIndex=1;const b=document.createElement("canvas");b.width=c,b.height=d;const y=b.getContext("2d");y.imageSmoothingEnabled=false,y.save(),y.translate(c*l,d*u),y.drawImage(Ta(e,o,r,a,i),-c*l,-d*u),y.restore(),wb(y,b,g.name,g.isTall);const S=r.Texture.from(b,{resolution:e.resolution??1});s.push(S),m.texture=S,f.push(m);}return f}function Nb(e,t,n,r,o,a,i,s,c,d){const{aX:l,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||kb(e,f.name,r);if(!g?.tex)continue;const m=Ta(g.tex,a,o,i,s);if(!m)continue;const b=m.width,y={x:0,y:0},S={x:u.x-l*b,y:0},C=document.createElement("canvas");C.width=b,C.height=m.height;const v=C.getContext("2d");if(!v)continue;v.imageSmoothingEnabled=false,v.drawImage(m,0,0),v.globalCompositeOperation="destination-in",v.drawImage(c,-S.x,-0);const T=o.Texture.from(C,{resolution:g.tex.resolution??1});d.push(T);const h=new o.Sprite(T);h.anchor?.set?.(y.x,y.y),h.position.set(S.x,S.y),h.scale.set(1),h.alpha=1,h.zIndex=3,p.push(h);}return p}function Lb(e,t,n,r,o,a){const{basePos:i}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const d=_b(e,c.name,c.isTall,r);if(!d)continue;const l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),c.isTall&&(l.zIndex=-1),db.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function lu(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=Ta(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new a(e);g.anchor?.set?.(d,l),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const m=Sb(t),b=ti(n.muts,m),y=ti(n.overlayMuts,m),S=ti(n.selectedMuts,m),C=[],v={w:s,h:c,aX:d,aY:l,basePos:u},T=Fs(t),h=Tb(e,T,m);Rb(e,v,b,r.ctors,r.renderer,r.cacheState,r.cacheConfig,C).forEach(j=>f.addChild(j)),m&&Nb(t,v,y,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,C).forEach(q=>f.addChild(q)),Lb(t,v,S,r.textures,r.ctors,h).forEach(j=>f.addChild(j));let k={x:0,y:0,width:s,height:c};try{const j=f.getLocalBounds?.()||f.getBounds?.(!0);j&&Number.isFinite(j.width)&&Number.isFinite(j.height)&&(k={x:j.x,y:j.y,width:j.width,height:j.height});}catch{}const{Rectangle:P}=r.ctors,E=P?new P(0,0,s,c):void 0;let G=null;if(typeof r.renderer.generateTexture=="function"?G=r.renderer.generateTexture(f,{resolution:1,region:E}):r.renderer.textureGenerator?.generateTexture&&(G=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:E})),!G)throw new Error("no render texture");const J=G instanceof i?G:i.from(r.renderer.extract.canvas(G));try{J.__mg_base={baseX:-k.x,baseY:-k.y,baseW:s,baseH:c,texW:k.width,texH:k.height};}catch{}G&&G!==J&&G.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{J.__mg_gen=!0,J.label=`${t}|${n.sig}`;}catch{}return J}catch{return null}}function Fb(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const a of e){const i=lu(a,t,n,r);i&&o.push(i);}return o.length>=2?o:null}function cu(e,t,n,r,o){const a=t.scale??1,i=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${a}|f${i}|m${s}|ax${c}|ay${d}|bm${n}|bp${o}|p${r}`}function Bb(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Ob(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(const[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function tc(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Db(e){e.cache.clear();}function $b(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Gb(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function zb(e,t,n,r,o,a,i,s=5,c=0){if(!t.ready||!a.enabled)return 0;const d=e.length;let l=0;i?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=Lr(null,f,t.textures,t.animations),m={scale:1},b=uu(m),y=pu(b,m),S=gu(b,m.boundsPadding),C=cu(g,m,b,y,S);o.cache.has(C)||Di(t,n,r,null,f,m,o,a),l++;}catch{l++;}i?.(l,d),u+s<d&&await Gb();}return l}function Hb(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function jb(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Bs(e,t,n,r,o,a){if(!n.length)return t;const i=nu(n);if(!i.sig)return t;const s=ou(e,i),c=iu(o,s);if(c?.tex)return c.tex;const d=lu(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(su(o,s,{isAnim:false,tex:d},a),d):t}function du(e,t,n,r,o,a){if(!n.length)return t;const i=nu(n);if(!i.sig)return t;const s=ou(e,i),c=iu(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const d=Fb(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(su(o,s,{isAnim:true,frames:d},a),d):t}function nc(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");const i=Lr(r,o,e.textures,e.animations),s=a.mutations||[],c=a.parent||jb(e)||Hb(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2;let f;const g=e.animations.get(i);if(g&&g.length>=2){const y=du(i,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(y),f.animationSpeed=a.fps?a.fps/60:a.speed??.15,f.loop=a.loop??true,f.play();else {const C=new e.ctors.Sprite(y[0]),T=1e3/Math.max(1,a.fps||8);let h=0,w=0;const _=k=>{const P=e.app.ticker?.deltaMS??k*16.666666666666668;if(h+=P,h<T)return;const E=h/T|0;h%=T,w=(w+E)%y.length,C.texture=y[w];};C.__mgTick=_,e.app.ticker?.add?.(_),f=C;}}else {const y=e.textures.get(i);if(!y)throw new Error(`Unknown sprite/anim key: ${i}`);const S=Bs(i,y,s,e,t,n);f=new e.ctors.Sprite(S);}const m=a.anchorX??f.texture?.defaultAnchor?.x??.5,b=a.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,b),f.position.set(u,p),f.scale.set(a.scale??1),f.alpha=a.alpha??1,f.rotation=a.rotation??0,f.zIndex=a.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Ub(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const rc=new Map;function uu(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function pu(e,t){return e==="mutations"?t.pad??2:t.pad??0}function qn(e){return Number.isFinite(e)?Math.max(0,e):0}function fu(e){if(typeof e=="number"){const t=qn(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:qn(e.top??0),right:qn(e.right??0),bottom:qn(e.bottom??0),left:qn(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function gu(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=fu(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function mu(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function hu(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function Wb(e,t,n,r,o,a){const i=`${e}|f${t}`,s=rc.get(i);if(s)return s;const c=mu(n),d={top:0,right:0,bottom:0,left:0};for(const l of tu){const u=Bs(e,n,[l],r,o,a),p=hu(u,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),b=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),m>d.right&&(d.right=m),b>d.bottom&&(d.bottom=b);}return rc.set(i,d),d}function Di(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=Lr(r,o,e.textures,e.animations),d=uu(a),l=pu(d,a),u=gu(d,a.boundsPadding),p=i&&s?.enabled?cu(c,a,d,l,u):null;if(p&&i&&s?.enabled){const C=Bb(i,p);if(C)return tc(C)}const f=a.mutations||[],g=e.animations.get(c),m=Math.max(0,(a.frameIndex??0)|0);let b,y;if(g?.length)if(b=g[m%g.length],f.length){const C=du(c,g,f,e,t,n);y=C[m%C.length];}else y=b;else {const C=e.textures.get(c);if(!C)throw new Error(`Unknown sprite/anim key: ${c}`);b=C,y=Bs(c,C,f,e,t,n);}let S;if(d==="mutations"){const C=new e.ctors.Sprite(y),v=a.anchorX??C.texture?.defaultAnchor?.x??.5,T=a.anchorY??C.texture?.defaultAnchor?.y??.5;C.anchor?.set?.(v,T),C.scale.set(a.scale??1);const h=new e.ctors.Container;h.addChild(C);try{h.updateTransform?.();}catch{}const w=C.getBounds?.(true)||{x:0,y:0,width:C.width,height:C.height};C.position.set(-w.x+l,-w.y+l),S=Ub(e,h);try{h.destroy?.({children:!0});}catch{}}else {const C=a.scale??1;let v=fu(a.boundsPadding);d==="padded"&&a.boundsPadding==null&&(v=Wb(c,m,b,e,t,n)),l&&(v={top:v.top+l,right:v.right+l,bottom:v.bottom+l,left:v.left+l});const T=mu(b),h=hu(y,T.w,T.h),w=Math.max(1,Math.ceil((T.w+v.left+v.right)*C)),_=Math.max(1,Math.ceil((T.h+v.top+v.bottom)*C));S=document.createElement("canvas"),S.width=w,S.height=_;const k=S.getContext("2d");if(k){k.imageSmoothingEnabled=false;const P=Ta(y,e.renderer,e.ctors,t,n),E=(v.left-h.baseX)*C,G=(v.top-h.baseY)*C;k.drawImage(P,E,G,P.width*C,P.height*C);}}return p&&i&&s?.enabled?(Ob(i,s,p,S),tc(S)):S}function Vb(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Xb(e,t){return e.defaultParent=t,true}function qb(e,t){return e.defaultParent=t,true}function cn(){if(!Jd())throw new Error("MGSprite not ready yet")}function Kb(e,t,n){return typeof t=="string"?nc(He(),Ln(),Rr(),e,t,n||{}):nc(He(),Ln(),Rr(),null,e,t||{})}function Yb(e,t,n){return typeof t=="string"?Di(He(),Ln(),Rr(),e,t,n||{},Nr(),Oi()):Di(He(),Ln(),Rr(),null,e,t||{},Nr(),Oi())}function Jb(){Vb(He());}function Qb(e){return Xb(He(),e)}function Zb(e){return qb(He(),e)}function ex(e,t){const n=He(),r=typeof t=="string"?Lr(e,t,n.textures,n.animations):Lr(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function tx(){cn();const e=He().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function nx(e){cn();const t=String(e||"").trim();if(!t)return [];const n=He().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function rx(e,t){cn();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=He().categoryIndex;if(!o)return  false;const a=n.toLowerCase(),i=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===a){for(const d of c.values())if(d.toLowerCase()===i)return  true}return  false}function ox(e){cn();const t=He().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,a]of t.entries())for(const i of a.values()){const s=Xr(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,a)=>o.localeCompare(a))}function ax(e){cn();const t=String(e||"").trim();if(!t)return null;const n=pa(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],a=r[2],i=He().categoryIndex,s=o.toLowerCase(),c=a.toLowerCase();let d=o,l=a;if(i){const u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=i.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:d,id:l,key:Xr(d,l)}}function ix(e,t){cn();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=He().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(c.values()).find(l=>l.toLowerCase()===i)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Xr(s,d)}function sx(){Ib(Ln());}function lx(){Db(Nr());}function cx(){return $b(Nr())}function dx(){return [...tu]}async function ux(e,t,n=10,r=0){return cn(),zb(e,He(),Ln(),Rr(),Nr(),Oi(),t,n,r)}const H={init:sb,isReady:Jd,show:Kb,toCanvas:Yb,clear:Jb,attach:Qb,attachProvider:Zb,has:ex,key:(e,t)=>Xr(e,t),getCategories:tx,getCategoryId:nx,hasId:rx,listIds:ox,getIdInfo:ax,getIdPath:ix,clearMutationCache:sx,clearToCanvasCache:lx,getToCanvasCacheStats:cx,getMutationNames:dx,warmup:ux};function px(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function fx(e,t=[]){const n=new Set,r=o=>{const a=String(o||"").trim();a&&n.add(a);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function bu(e,t,n,r=[],o=[]){if(!H)return console.warn("[MGData] MGSprite not available in pickSpriteId"),null;const a=fx(e,r);if(!a.length)return null;const i=[t,...o].filter(l=>typeof l=="string"),s=l=>{const u=String(l||"").trim();if(!u)return null;for(const p of a)try{if(H.has(p,u))return H.getIdPath(p,u)}catch{}return null};for(const l of i){const u=s(l);if(u)return u}const c=px(n||""),d=s(c||n||"");if(d)return d;try{for(const l of a){const u=H.listIds(`sprite/${l}/`),p=i.map(g=>String(g||"").toLowerCase()),f=String(n||c||"").toLowerCase();for(const g of u){const b=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&y===b)||b===f)return g}for(const g of u){const b=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&(b.includes(y)||y.includes(b)))||f&&(b.includes(f)||f.includes(b)))return g}}}catch{}return null}function Ze(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;const i=e.tileRef;if(!i||typeof i!="object")return;const s=String(i.spritesheet||t||"").trim(),c=bu(s,n,r,o,a);if(c)try{e.spriteId=c;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const l of Object.values(d))Ze(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Ze(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Ze(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Ze(e.activeState,s,n,e.activeState?.name||r);}function gx(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],a=t.slice(1);return bu(e,o,n??null,r,a)}function mx(e){for(const[t,n]of Object.entries(e.items||{}))Ze(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Ze(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Ze(n,"mutations",t,n?.name,["mutation"]);const r=gx("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Ze(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Ze(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&Ze(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&Ze(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&Ze(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function hx(){try{console.log("[MGData] Resolving sprites..."),mx(Z.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const xu=1e4,yu=50;function vu(e){return new Promise(t=>setTimeout(t,e))}function bx(e){return Z.data[e]}function xx(){return {...Z.data}}function yx(e){return Z.data[e]!=null}async function vx(e,t=xu,n=yu){const r=Date.now();for(;Date.now()-r<t;){const o=Z.data[e];if(o!=null)return o;await vu(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function wx(e=xu,t=yu){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Z.data).some(r=>r!=null))return {...Z.data};await vu(t);}throw new Error("MGData.waitForAnyData: timeout")}const wu=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Su(e){return wu.includes(e)}function Cu(e){return e.filter(t=>Su(t.action))}function oc(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function ni(e){return e?.name||e?.petSpecies||"Unknown Pet"}function ku(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=ni(r.targetPet),a=r.hungerRestoreAmount||0,s=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${a} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",a=r.sellPrice||0;return `Ate ${o} for ${a} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=ni(r.targetPet),a=r.strengthIncrease||0;return `Boosted ${o}'s size by +${a.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=ni(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,a=r.petsAffected?.length||0;return `Gave +${o} XP to ${a} ${a===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,a=r.eggsAffected?.length||0,i=oc(o);return `Reduced ${a} ${a===1?"egg":"eggs"} growth by ${i}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,a=r.numPlantsAffected||0,i=oc(o);return `Reduced ${a} ${a===1?"plant":"plants"} growth by ${i}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,a=r.numPlantsAffected||0;return `Boosted ${a} ${a===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const Y={async init(){Xd(),xh(),kh(),Rh();},isReady:ua,get:bx,getAll:xx,has:yx,waitFor:vx,waitForAny:wx,resolveSprites:hx,cleanup(){qd(),Kd(),_h(),Nh();}},Sx=new Map;function Cx(){return Sx}function $i(){return N.jotaiAtomCache?.cache}function $t(e){const t=Cx(),n=t.get(e);if(n)return n;const r=$i();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function kx(){const e=N;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const a=n.get(r);a&&a.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const _x={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function On(){return _x}const Tx="__JOTAI_STORE_READY__";let ac=false;const Gi=new Set;function ho(){if(!ac){ac=true;for(const e of Gi)try{e();}catch{}try{const e=N.CustomEvent||CustomEvent;N.dispatchEvent?.(new e(Tx));}catch{}}}function Px(e){Gi.add(e);const t=Hi();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Gi.delete(e);}}async function _u(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Hi();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=false;const s=Px(()=>{i||(i=true,s(),o());}),c=Date.now();(async()=>{for(;!i&&Date.now()-c<t;){const l=Hi();if(l.via&&!l.polyfill){if(i)return;i=true,s(),o();return}await Fr(n);}i||(i=true,s(),a(new Error("Store not captured within timeout")));})();})}const Fr=e=>new Promise(t=>setTimeout(t,e));function Tu(){try{const e=N.Event||Event;N.dispatchEvent?.(new e("visibilitychange"));}catch{}}function zi(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function ri(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(zi(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const a=e[o];if(zi(a))return a}catch{}return null}function Pu(){const e=On(),t=N.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const a of o){const i=new Set,s=[a.current];for(;s.length;){const c=s.pop();if(!(!c||i.has(c))){i.add(c);try{const d=c?.pendingProps?.value;if(zi(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;const u=ri(d);if(u)return e.lastCapturedVia="fiber",u;const p=ri(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(c?.stateNode){const d=ri(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Au(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Ax(e=5e3){const t=Date.now();let n=$i();for(;!n&&Date.now()-t<e;)await Fr(100),n=$i();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=On();let o=null,a=null;const i=[],s=()=>{for(const d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const l=d.write;d.__origWrite=l,d.write=function(u,p,...f){return a||(o=u,a=p,s()),l.call(this,u,p,...f)},i.push(d);}Tu();const c=Date.now();for(;!a&&Date.now()-c<e;)await Fr(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Au())}async function Ix(e=1e4){const t=On();Tu();const n=Date.now();for(;Date.now()-n<e;){const r=Pu();if(r)return r;await Fr(50);}return t.lastCapturedVia="polyfill",Au()}async function Os(){const e=On();if(e.baseStore&&!e.baseStore.__polyfill)return ho(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Fr(25);if(e.baseStore)return e.baseStore.__polyfill||ho(),e.baseStore}e.captureInProgress=true;try{const t=Pu();if(t)return e.baseStore=t,ho(),t;try{const r=await Ax(5e3);return e.baseStore=r,r.__polyfill||ho(),r}catch(r){e.captureError=r;}const n=await Ix();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Hi(){const e=On();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Ex(){const e=await Os(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:false,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0;}catch{}const i=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=a.last,d=!Object.is(s,c)||!a.has;if(a.last=s,a.has=true,d)for(const l of a.subs)try{l(s,c);}catch{}});return a.unsubUpstream=i,a};return {async get(o){const a=await n(o);if(a.has)return a.last;const i=e.get(o);return a.last=i,a.has=true,i},async set(o,a){await e.set(o,a);const i=await n(o);i.last=a,i.has=true;},async sub(o,a){const i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last);}catch{}return ()=>{i.subs.delete(a);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Ko(){const e=On();return e.mirror||(e.mirror=await Ex()),e.mirror}const me={async select(e){const t=await Ko(),n=$t(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Ko(),r=$t(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Ko(),r=$t(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await me.select(e);try{t(n);}catch{}return me.subscribe(e,t)}};async function Iu(){await Ko();}const qr=Object.freeze(Object.defineProperty({__proto__:null,Store:me,prewarm:Iu,waitForStore:_u},Symbol.toStringTag,{value:"Module"}));function Ds(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Br(e,t){const n=Ds(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Mx(e,t,n){const r=Ds(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let a=o;for(let i=0;i<r.length-1;i++){const s=r[i],c=a[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};a[s]=d,a=d;}return a[r[r.length-1]]=n,o}function ic(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Br(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Rx(e,t,n){const r=n.mode??"auto";function o(d){const l=t?Br(d,t):d,u=new Map;if(l==null)return {signatures:u,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],b=n.key?n.key(m,g,d):g,y=n.sig?n.sig(m,g,d):n.fields?ic(m,n.fields):JSON.stringify(m);u.set(b,y);}else for(const[g,m]of Object.entries(l)){const b=n.key?n.key(m,g,d):g,y=n.sig?n.sig(m,g,d):n.fields?ic(m,n.fields):JSON.stringify(m);u.set(b,y);}return {signatures:u,keys:Array.from(u.keys())}}function a(d,l){if(d===l)return  true;if(!d||!l||d.size!==l.size)return  false;for(const[u,p]of d)if(l.get(u)!==p)return  false;return  true}async function i(d){let l=null;return me.subscribeImmediate(e,u=>{const p=t?Br(u,t):u,{signatures:f}=o(p);if(!a(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const b of g){const y=l?.get(b)??"__NONE__",S=f.get(b)??"__NONE__";y!==S&&m.push(b);}l=f,d({value:p,changedKeys:m});}})}async function s(d,l){return i(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u});})}async function c(d,l){const u=new Set(d);return i(({value:p,changedKeys:f})=>{const g=f.filter(m=>u.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:i,subKey:s,subKeys:c}}const wn=new Map;function Nx(e,t){const n=wn.get(e);if(n)try{n();}catch{}return wn.set(e,t),()=>{try{t();}catch{}wn.get(e)===t&&wn.delete(e);}}function he(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${Ds(n).join(".")}`:e;async function a(){const u=await me.select(e);return n?Br(u,n):u}async function i(u){if(typeof r=="function"){const g=await me.select(e),m=r(u,g);return me.set(e,m)}const p=await me.select(e),f=n?Mx(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?me.set(e,{...p,...u}):me.set(e,f)}async function s(u){const p=await a(),f=u(p);return await i(f),f}async function c(u,p,f){let g;const m=y=>{const S=n?Br(y,n):y;if(typeof g>"u"||!f(g,S)){const C=g;g=S,p(S,C);}},b=u?await me.subscribeImmediate(e,m):await me.subscribe(e,m);return Nx(o,b)}function d(){const u=wn.get(o);if(u){try{u();}catch{}wn.delete(o);}}function l(u){return Rx(e,u?.path??n,u)}return {label:o,get:a,set:i,update:s,onChange:(u,p=Object.is)=>c(false,u,p),onChangeNow:(u,p=Object.is)=>c(true,u,p),asSignature:l,stopOnChange:d}}function A(e){return he(e)}A("positionAtom");A("lastPositionInMyGardenAtom");A("playerDirectionAtom");A("stateAtom");A("quinoaDataAtom");A("currentTimeAtom");A("actionAtom");A("isPressAndHoldActionAtom");A("mapAtom");A("tileSizeAtom");he("mapAtom",{path:"cols"});he("mapAtom",{path:"rows"});he("mapAtom",{path:"spawnTiles"});he("mapAtom",{path:"locations.seedShop.spawnTileIdx"});he("mapAtom",{path:"locations.eggShop.spawnTileIdx"});he("mapAtom",{path:"locations.toolShop.spawnTileIdx"});he("mapAtom",{path:"locations.decorShop.spawnTileIdx"});he("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});he("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});he("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});he("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});he("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});A("playerAtom");A("myDataAtom");A("myUserSlotIdxAtom");A("isSpectatingAtom");A("myCoinsCountAtom");A("numPlayersAtom");he("playerAtom",{path:"id"});he("myDataAtom",{path:"activityLogs"});A("userSlotsAtom");A("filteredUserSlotsAtom");A("myUserSlotAtom");A("spectatorsAtom");he("stateAtom",{path:"child"});he("stateAtom",{path:"child.data"});he("stateAtom",{path:"child.data.shops"});const Lx=he("stateAtom",{path:"child.data.userSlots"}),Fx=he("stateAtom",{path:"data.players"}),Bx=he("stateAtom",{path:"data.hostPlayerId"});A("myInventoryAtom");A("myInventoryItemsAtom");A("isMyInventoryAtMaxLengthAtom");A("myFavoritedItemIdsAtom");A("myCropInventoryAtom");A("mySeedInventoryAtom");A("myToolInventoryAtom");A("myEggInventoryAtom");A("myDecorInventoryAtom");A("myPetInventoryAtom");he("myInventoryAtom",{path:"favoritedItemIds"});A("itemTypeFiltersAtom");A("myItemStoragesAtom");A("myPetHutchStoragesAtom");A("myPetHutchItemsAtom");A("myPetHutchPetItemsAtom");A("myNumPetHutchItemsAtom");A("myValidatedSelectedItemIndexAtom");A("isSelectedItemAtomSuspended");A("mySelectedItemAtom");A("mySelectedItemNameAtom");A("mySelectedItemRotationsAtom");A("mySelectedItemRotationAtom");A("setSelectedIndexToEndAtom");A("myPossiblyNoLongerValidSelectedItemIndexAtom");A("myCurrentGlobalTileIndexAtom");A("myCurrentGardenTileAtom");A("myCurrentGardenObjectAtom");A("myOwnCurrentGardenObjectAtom");A("myOwnCurrentDirtTileIndexAtom");A("myCurrentGardenObjectNameAtom");A("isInMyGardenAtom");A("myGardenBoardwalkTileObjectsAtom");const Ox=he("myDataAtom",{path:"garden"});he("myDataAtom",{path:"garden.tileObjects"});he("myOwnCurrentGardenObjectAtom",{path:"objectType"});A("myCurrentStablePlantObjectInfoAtom");A("myCurrentSortedGrowSlotIndicesAtom");A("myCurrentGrowSlotIndexAtom");A("myCurrentGrowSlotsAtom");A("myCurrentGrowSlotAtom");A("secondsUntilCurrentGrowSlotMaturesAtom");A("isCurrentGrowSlotMatureAtom");A("numGrowSlotsAtom");A("myCurrentEggAtom");A("petInfosAtom");A("myPetInfosAtom");A("myPetSlotInfosAtom");A("myPrimitivePetSlotsAtom");A("myNonPrimitivePetSlotsAtom");A("expandedPetSlotIdAtom");A("myPetsProgressAtom");A("myActiveCropMutationPetsAtom");A("totalPetSellPriceAtom");A("selectedPetHasNewVariantsAtom");const Dx=A("shopsAtom"),$x=A("myShopPurchasesAtom");A("seedShopAtom");A("seedShopInventoryAtom");A("seedShopRestockSecondsAtom");A("seedShopCustomRestockInventoryAtom");A("eggShopAtom");A("eggShopInventoryAtom");A("eggShopRestockSecondsAtom");A("eggShopCustomRestockInventoryAtom");A("toolShopAtom");A("toolShopInventoryAtom");A("toolShopRestockSecondsAtom");A("toolShopCustomRestockInventoryAtom");A("decorShopAtom");A("decorShopInventoryAtom");A("decorShopRestockSecondsAtom");A("decorShopCustomRestockInventoryAtom");A("isDecorShopAboutToRestockAtom");he("shopsAtom",{path:"seed"});he("shopsAtom",{path:"tool"});he("shopsAtom",{path:"egg"});he("shopsAtom",{path:"decor"});A("myCropItemsAtom");A("myCropItemsToSellAtom");A("totalCropSellPriceAtom");A("friendBonusMultiplierAtom");A("myJournalAtom");A("myCropJournalAtom");A("myPetJournalAtom");A("myStatsAtom");A("myActivityLogsAtom");A("newLogsAtom");A("hasNewLogsAtom");A("newCropLogsFromSellingAtom");A("hasNewCropLogsFromSellingAtom");A("myCompletedTasksAtom");A("myActiveTasksAtom");A("isWelcomeToastVisibleAtom");A("shouldCloseWelcomeToastAtom");A("isInitialMoveToDirtPatchToastVisibleAtom");A("isFirstPlantSeedActiveAtom");A("isThirdSeedPlantActiveAtom");A("isThirdSeedPlantCompletedAtom");A("isDemoTouchpadVisibleAtom");A("areShopAnnouncersEnabledAtom");A("arePresentablesEnabledAtom");A("isEmptyDirtTileHighlightedAtom");A("isPlantTileHighlightedAtom");A("isItemHiglightedInHotbarAtom");A("isItemHighlightedInModalAtom");A("isMyGardenButtonHighlightedAtom");A("isSellButtonHighlightedAtom");A("isShopButtonHighlightedAtom");A("isInstaGrowButtonHiddenAtom");A("isActionButtonHighlightedAtom");A("isGardenItemInfoCardHiddenAtom");A("isSeedPurchaseButtonHighlightedAtom");A("isFirstSeedPurchaseActiveAtom");A("isFirstCropHarvestActiveAtom");A("isWeatherStatusHighlightedAtom");const Gx=A("weatherAtom"),$s=A("activeModalAtom");A("hotkeyBeingPressedAtom");A("avatarTriggerAnimationAtom");A("avatarDataAtom");A("emoteDataAtom");A("otherUserSlotsAtom");A("otherPlayerPositionsAtom");A("otherPlayerSelectedItemsAtom");A("otherPlayerLastActionsAtom");A("traderBunnyPlayerId");A("npcPlayersAtom");A("npcQuinoaUsersAtom");A("numNpcAvatarsAtom");A("traderBunnyEmoteTimeoutAtom");A("traderBunnyEmoteAtom");A("unsortedLeaderboardAtom");A("currentGardenNameAtom");A("quinoaEngineAtom");A("quinoaInitializationErrorAtom");A("avgPingAtom");A("serverClientTimeOffsetAtom");A("isEstablishingShotRunningAtom");A("isEstablishingShotCompleteAtom");const pe={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Pa(){return pe}function zx(){return pe.initialized}function dn(){return pe.isCustom&&pe.activeModal!==null}function nn(){return pe.activeModal}function Eu(e){return !pe.shadow||pe.shadow.modal!==e?null:pe.shadow.data}function Hx(e){pe.initialized=e;}function Gs(e){pe.activeModal=e;}function zs(e){pe.isCustom=e;}function Mu(e,t){pe.shadow={modal:e,data:t,timestamp:Date.now()};}function Ru(){pe.shadow=null;}function sc(e,t){pe.patchedAtoms.add(e),pe.originalReads.set(e,t);}function jx(e){return pe.originalReads.get(e)}function ji(e){return pe.patchedAtoms.has(e)}function Ux(e){pe.patchedAtoms.delete(e),pe.originalReads.delete(e);}function Wx(e){pe.unsubscribes.push(e);}function Vx(){for(const e of pe.unsubscribes)try{e();}catch{}pe.unsubscribes.length=0;}function Xx(e){return pe.listeners.onOpen.add(e),()=>pe.listeners.onOpen.delete(e)}function Nu(e){return pe.listeners.onClose.add(e),()=>pe.listeners.onClose.delete(e)}function Lu(e){for(const t of Array.from(pe.listeners.onOpen))try{t(e);}catch{}}function Hs(e){for(const t of Array.from(pe.listeners.onClose))try{t(e);}catch{}}function qx(){Vx(),pe.initialized=false,pe.activeModal=null,pe.isCustom=false,pe.shadow=null,pe.patchedAtoms.clear(),pe.originalReads.clear(),pe.listeners.onOpen.clear(),pe.listeners.onClose.clear();}const js={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Fu(e){return js[e]}function Kx(e){const t=js[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const Yx=new Set(["inventory","journal","stats","activityLog","petHutch"]),Jx=new Set(["seedShop","eggShop","toolShop","decorShop"]),Qx=new Set(["leaderboard"]);function Zx(e,t,n,r){return function(a){const i=dn(),s=nn();if(i&&s===r){const c=Eu(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function ey(e,t,n,r,o){return function(i){if(dn()&&nn()===o){const s=Eu(o);if(s!==null){const c=s[n];if(c!==void 0)return t(i),r(c)}}return t(i)}}function ty(e){const t=Fu(e);for(const n of t.atoms){const r=$t(n.atomLabel);if(!r||ji(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=Zx(n.atomLabel,o,n,e);r.read=a,sc(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=$t(n.atomLabel);if(!r||ji(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=ey(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,sc(n.atomLabel,o);}}async function Aa(e){const t=Fu(e);for(const r of t.atoms)lc(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)lc(r.atomLabel);const n=await Os();await Bu(n,e);}async function ny(e){const t=await Os();await Bu(t,e);const n=Kx(e);for(const r of n){const o=$t(r);if(o)try{t.get(o);}catch{}}}function lc(e){if(!ji(e))return;const t=$t(e),n=jx(e);t&&n&&(t.read=n),Ux(e);}async function Bu(e,t){const n=Yx.has(t),r=Jx.has(t),o=Qx.has(t);if(!n&&!r&&!o)return;const a=$t("stateAtom");if(a)try{const i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){const c=i.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){const u={...c,data:l};s={...i,child:u};}}}if(o){const c=i.data;if(c&&Array.isArray(c.players)){const d={...c,players:[...c.players]};s={...s??i,data:d};}}if(!s)return;await e.set(a,s);}catch{}}async function ry(){for(const e of Object.keys(js))await Aa(e);}let bo=null,yr=null;async function oy(){if(Pa().initialized)return;yr=await me.select("activeModalAtom"),bo=setInterval(async()=>{try{const n=await me.select("activeModalAtom"),r=yr;r!==n&&(yr=n,ay(n,r));}catch{}},50),Wx(()=>{bo&&(clearInterval(bo),bo=null);}),Hx(true);}function ay(e,t){const n=dn(),r=nn();e===null&&t!==null&&(n&&r===t?iy("native"):n||Hs({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Lu({modal:e,isCustom:false});}async function iy(e){const t=nn();t&&(Ru(),zs(false),Gs(null),await Aa(t),Hs({modal:t,wasCustom:true,closedBy:e}));}async function sy(e,t){if(!Pa().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");dn()&&await Ou(),Mu(e,t),zs(true),Gs(e),ty(e),await ny(e),await $s.set(e),yr=e,Lu({modal:e,isCustom:true});}function ly(e,t){const n=Pa();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Mu(e,o);}async function Ou(){const e=Pa();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Ru(),zs(false),Gs(null),await $s.set(null),yr=null,await Aa(t),Hs({modal:t,wasCustom:true,closedBy:"api"});}function cy(){return new Promise(e=>{if(!dn()){e();return}const t=Nu(()=>{t(),e();});})}async function dy(){if(dn()){const e=nn();e&&await Aa(e);}await ry(),qx();}const Sn={async init(){return oy()},isReady(){return zx()},async show(e,t){return sy(e,t)},update(e,t){return ly(e,t)},async close(){return Ou()},isOpen(){return nn()!==null},isCustomOpen(){return dn()},getActiveModal(){return nn()},waitForClose(){return cy()},onOpen(e){return Xx(e)},onClose(e){return Nu(e)},async destroy(){return dy()}};function uy(){return {ready:false,xform:null,xformAt:0}}const ot=uy();function Du(){return ot.ready}function Dn(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Kr(){return rt.tos()}function Us(){return rt.engine()}function py(){const e=Kr()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Ws(e,t){const n=py();return n?t*n+e|0:null}let xo=null;async function fy(e=15e3){return ot.ready?true:xo||(xo=(async()=>{if(await rt.init(e),!Kr())throw new Error("MGTile: engine captured but tileObject system not found");return ot.ready=true,true})(),xo)}function en(e,t,n=true){const r=Kr(),o=Ws(e,t);if(!r||o==null)return {gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:a||null}}function oi(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Vs(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Cn(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=Us(),{gidx:s,tv:c}=en(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Ia(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:a,tv:i}=en(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return {tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};const s=i.tileObject;return {tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?Dn(s):s}}function gy(e,t,n={}){return Cn(e,t,null,n)}function my(e,t,n,r={}){const a=Ia(e,t,{...r,clone:false}).tileView?.tileObject;Vs(a,"plant");const i=Dn(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return oi(i.slots[s],n.slotPatch),Cn(e,t,i,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);oi(i.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const d=Number(c)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);oi(i.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Cn(e,t,i,r)}return Cn(e,t,i,r)}function hy(e,t,n,r={}){const a=Ia(e,t,{...r,clone:false}).tileView?.tileObject;Vs(a,"decor");const i=Dn(a);return "rotation"in n&&(i.rotation=Number(n.rotation)),Cn(e,t,i,r)}function by(e,t,n,r={}){const a=Ia(e,t,{...r,clone:false}).tileView?.tileObject;Vs(a,"egg");const i=Dn(a);return "plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Cn(e,t,i,r)}function xy(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=Us(),{gidx:s,tv:c}=en(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const d=c.tileObject,l=typeof n=="function"?n(Dn(d)):n;if(c.onDataChanged(l),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function yy(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:a}=en(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const i=n.clone!==false,s=a.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?Dn(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function ai(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Yo(e){const t=ut(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=ut(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function vy(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Yo(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function wy(){const e=Kr(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;const s=en(a,i,true).tv,c=a+1<t?en(a+1,i,true).tv:null,d=en(a,i+1,true).tv,l=ai(s),u=ai(c),p=ai(d);if(!l||!u||!p)continue;const f=Yo(l),g=Yo(u),m=Yo(p);if(!f||!g||!m)continue;const b={x:g.x-f.x,y:g.y-f.y},y={x:m.x-f.x,y:m.y-f.y},S=b.x*y.y-b.y*y.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const C=1/S,v={a:y.y*C,b:-y.x*C,c:-b.y*C,d:b.x*C},T={x:f.x-a*b.x-i*y.x,y:f.y-a*b.y-i*y.y},h=vy(l),w=h==="center"?T:{x:T.x+.5*(b.x+y.x),y:T.y+.5*(b.y+y.y)};return {ok:true,cols:t,rows:r,vx:b,vy:y,inv:v,anchorMode:h,originCenter:w}}return null}function $u(){return ot.xform=wy(),ot.xformAt=Date.now(),{ok:!!ot.xform?.ok,xform:ot.xform}}function Sy(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!ot.xform?.ok||t.forceRebuild||Date.now()-ot.xformAt>n)&&$u();const r=ot.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,c=Math.floor(i),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]];let u=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const m=r.originCenter.x+f*r.vx.x+g*r.vy.x,b=r.originCenter.y+f*r.vx.y+g*r.vy.y,y=(e.x-m)**2+(e.y-b)**2;y<p&&(p=y,u={tx:f,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=Ws(u.tx,u.ty),u):null}function Cy(e,t){const n=ot.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function it(){if(!Du())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function ky(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Pt={init:fy,isReady:Du,hook:rt.hook,engine:Us,tos:Kr,gidx:(e,t)=>Ws(Number(e),Number(t)),getTileObject:(e,t,n={})=>(it(),Ia(e,t,n)),inspect:(e,t,n={})=>(it(),yy(e,t,n)),setTileEmpty:(e,t,n={})=>(it(),gy(e,t,n)),setTilePlant:(e,t,n,r={})=>(it(),my(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(it(),hy(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(it(),by(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(it(),xy(e,t,n,r)),rebuildTransform:()=>(it(),$u()),pointToTile:(e,t={})=>(it(),Sy(e,t)),tileToPoint:(e,t)=>(it(),Cy(e,t)),getTransform:()=>(it(),ot.xform),help:ky};function _y(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const K=_y();function Gu(){return K.ready}async function Ty(e=15e3){if(K.ready)return Ui(),true;if(await rt.init(e),K.app=rt.app(),K.ticker=rt.ticker(),K.renderer=rt.renderer(),K.stage=rt.stage(),!K.app||!K.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return K.ready=true,Ui(),true}function Ui(){const e=N;return e.$PIXI=e.PIXI||null,e.$app=K.app||null,e.$renderer=K.renderer||null,e.$stage=K.stage||null,e.$ticker=K.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:K.ready},e.__MG_PIXI__}function Xs(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Wi(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function ga(e){return !!(e&&typeof e.tint=="number")}function rn(e){return !!(e&&typeof e.alpha=="number")}function Jo(e,t,n){return e+(t-e)*n}function Py(e,t,n){const r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,c=t&255,d=Jo(r,i,n)|0,l=Jo(o,s,n)|0,u=Jo(a,c,n)|0;return d<<16|l<<8|u}function Ay(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;ga(o)&&n.push(o);const a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i]);}return n}function Iy(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const a=r.pop();if(!a)continue;rn(a)&&n.push(a);const i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s]);}return n}const Ey=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Vi(e){if(!e)return null;if(Wi(e))return e;if(!Xs(e))return null;for(const t of Ey){const n=e[t];if(Wi(n))return n}return null}function My(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){const s=new Array(t);let c=true;for(let d=0;d<t;d++){const l=Vi(a[d]);if(!l){c=false;break}s[d]=l;}if(c)return s}for(const s of a)n.push({o:s,d:i+1});continue}if(Xs(a)){const s=a;for(const c of Object.keys(s))n.push({o:s[c],d:i+1});}}}return null}function zu(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(Xs(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;const i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}));}return n}function Ry(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=zu(t);return K.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function Ny(e){return K.tileSets.delete(String(e||"").trim())}function Ly(){return Array.from(K.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Hu(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function qs(e){const n=Pt.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Hu(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const a=String(e.tileSet||"").trim(),i=K.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i;}else r=zu(e.tiles||[]);const o=new Map;for(const a of r){const i=Pt.getTileObject(a.x,a.y,{ensureView:true,clone:false});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Ks(e){const t=K.highlights.get(e);if(!t)return  false;ut(()=>K.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&rn(t.root)&&ut(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&ga(n.o)&&ut(()=>{n.o.tint=n.baseTint;});return K.highlights.delete(e),true}function ju(e=null){for(const t of Array.from(K.highlights.keys()))e&&!String(t).startsWith(e)||Ks(t);return  true}function Uu(e,t={}){if(!Wi(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(K.highlights.has(n))return n;const r=rn(e)?Number(e.alpha):null,o=vt(Number(t.minAlpha??.12),0,1),a=vt(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=vt(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,l=[];if(d)for(const f of Ay(e))l.push({o:f,baseTint:f.tint});else ga(e)&&l.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*i)+1)/2,m=g*g*(3-2*g);r!=null&&rn(e)&&(e.alpha=vt(Jo(o,a,m)*r,0,1));const b=m*c;for(const y of l)y.o&&ga(y.o)&&(y.o.tint=Py(y.baseTint,s,b));};return K.ticker?.add(p),K.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function Fy(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function Wu(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=qs(t),a=`hlmut:${n}:`;if(t.clear===true)if(!o)ju(a);else for(const u of Array.from(K.highlights.keys())){if(!u.startsWith(a))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&Ks(u);}const i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,d=0,l=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const b=[];for(let C=0;C<g.length;C++)Fy(g[C],n)&&(b.push(C),m=true);if(!m)continue;s++,c+=b.length;const y=p?.childView?.plantVisual||p?.childView||p,S=My(y,g.length);if(!S){l+=b.length;continue}for(const C of b){const v=S[C];if(!v){l++;continue}const T=`${a}${u}:${C}`;K.highlights.has(T)||(Uu(v,{key:T,...i}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function By(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=K.watches.get(r);a&&clearInterval(a);const i=setInterval(()=>{ut(()=>Wu(n,{...t,clear:!1}));},o);return K.watches.set(r,i),{ok:true,key:r,mutation:n,intervalMs:o}}function Oy(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(K.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),K.watches.delete(a),o++);return o>0}const n=K.watches.get(t);return n?(clearInterval(n),K.watches.delete(t),true):false}function Dy(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Vi(t)||Vi(e?.displayObject)||null}function Vu(e){const t=K.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&rn(n.o)&&Number.isFinite(n.baseAlpha)&&ut(()=>{n.o.alpha=n.baseAlpha;});return K.fades.delete(e),true}function Xi(e=null){for(const t of Array.from(K.fades.keys()))e&&!String(t).startsWith(e)||Vu(t);return  true}function Xu(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!Hu(t))return Xi(r);const{gidxSet:o}=qs(t);if(!o)return Xi(r);for(const a of Array.from(K.fades.keys())){if(!a.startsWith(r))continue;const i=Number(a.slice(r.length));o.has(i)&&Vu(a);}return  true}function qu(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=vt(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:a,gidxSet:i}=qs(t),s=`fade:${n}:`;t.clear===true&&Xu(n,t);let c=0,d=0,l=0,u=0;for(const[p,f]of a){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;d++;const b=Dy(f);if(!b||!rn(b)){u++;continue}const y=`${s}${p}`;if(K.fades.has(y)){ut(()=>{b.alpha=r;}),l++;continue}const S=o?Iy(b):[b],C=[];for(const v of S)rn(v)&&C.push({o:v,baseAlpha:Number(v.alpha)});for(const v of C)ut(()=>{v.o.alpha=r;});K.fades.set(y,{targets:C}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:K.fades.size}}function $y(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=K.fadeWatches.get(r);a&&clearInterval(a);const i=setInterval(()=>{ut(()=>qu(n,{...t,clear:!1}));},o);return K.fadeWatches.set(r,i),{ok:true,key:r,species:n,intervalMs:o}}function Gy(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(K.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),K.fadeWatches.delete(a),o++);return o>0}const n=K.fadeWatches.get(t);return n?(clearInterval(n),K.fadeWatches.delete(t),true):false}function zy(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Hy(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==false,i=Pt.getTileObject(r,o,{ensureView:a,clone:false}),s=i?.tileView||null,c=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:i?.gidx??Pt.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?zy(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&ut(()=>console.log("[MGPixi.inspectTile]",d)),d}function jy(e,t,n){const r=N.PIXI;if(!r)return;let o=K.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",K.stage.addChild(o));const a=n.key;let i=o.getChildByName(a);i||(i=new r.Graphics,i.name=a,o.addChild(i));const s=Pt.tileToPoint(e,t);if(!s)return;i.clear(),i.lineStyle(2,n.tint??65280,n.alpha??1),i.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=Pt.getTransform(),d=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;i.drawRect(0,0,d,l),i.endFill(),i.x=s.x,i.y=s.y,c&&(i.rotation=Math.atan2(c.vx.y,c.vx.x));}function Uy(e){const t=K.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Ne(){if(!Gu())throw new Error("MGPixi: call MGPixi.init() first")}const Ea={init:Ty,isReady:Gu,expose:Ui,get app(){return K.app},get renderer(){return K.renderer},get stage(){return K.stage},get ticker(){return K.ticker},get PIXI(){return N.PIXI||null},defineTileSet:(e,t)=>(Ne(),Ry(e,t)),deleteTileSet:e=>(Ne(),Ny(e)),listTileSets:()=>(Ne(),Ly()),highlightPulse:(e,t)=>(Ne(),Uu(e,t)),stopHighlight:e=>(Ne(),Ks(e)),clearHighlights:e=>(Ne(),ju(e)),drawOverlayBox:(e,t,n)=>(Ne(),jy(e,t,n)),stopOverlay:e=>(Ne(),Uy(e)),highlightMutation:(e,t)=>(Ne(),Wu(e,t)),watchMutation:(e,t)=>(Ne(),By(e,t)),stopWatchMutation:e=>(Ne(),Oy(e)),inspectTile:(e,t,n)=>(Ne(),Hy(e,t,n)),fadeSpecies:(e,t)=>(Ne(),qu(e,t)),clearSpeciesFade:(e,t)=>(Ne(),Xu(e,t)),clearFades:e=>(Ne(),Xi(e)),watchFadeSpecies:(e,t)=>(Ne(),$y(e,t)),stopWatchFadeSpecies:e=>(Ne(),Gy(e))};function Wy(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const ne=Wy();function Ku(){return ne.ready}const cc=N??window;async function Yu(){const e=ne.ctx;if(e)return e;const t=cc.AudioContext||cc.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return ne.ctx=n,n}async function Ju(){if(ne.ctx&&ne.ctx.state==="suspended")try{await ne.ctx.resume();}catch{}}const Vy={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Xy={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},vr=.001,wr=.2;function dc(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Or(e){const t=Vy[e],n=Xy[e];if(!t)return {atom:wr,vol100:yo(wr)};const r=dc(t,NaN);if(Number.isFinite(r)){const a=vt(r,0,1);return {atom:a,vol100:yo(a)}}if(n){const a=dc(n,NaN);if(Number.isFinite(a)){const i=vt(a,0,1);return {atom:i,vol100:yo(i)}}}const o=wr;return {atom:o,vol100:yo(o)}}function qy(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(vt(t,1,100)-1)/99;return vr+r*(wr-vr)}function yo(e){const t=vt(Number(e),0,1);if(t<=vr)return 0;const n=(t-vr)/(wr-vr);return Math.round(1+n*99)}function Qu(e,t){if(t==null)return Or(e).atom;const n=qy(t);return n===null?Or(e).atom:Bm(n)}function Ky(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);ne.sfx.groups=t;}function Yy(e){const t=ne.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=ne.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Jy(){if(ne.sfx.buffer)return ne.sfx.buffer;if(!ne.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Yu();await Ju();const n=await(await Gd(ne.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{const i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a);});return ne.sfx.buffer=r,r}async function Qy(e,t={}){if(!ne.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=Yy(n),o=ne.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const a=await Yu();await Ju();const i=await Jy(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=Qu("sfx",t.volume),u=a.createGain();u.gain.value=l,u.connect(a.destination);const p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}const Zy=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),e0=function(e){return "/"+e},uc={},Ke=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");o=c(n.map(d=>{if(d=e0(d),d in uc)return;uc[d]=true;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Zy,l||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function a(i){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},Ma={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},t0={sounds:[],version:1};class Ys extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class n0 extends Ys{constructor(){super(`Maximum number of sounds reached (${Ma.MAX_SOUNDS})`),this.name="SoundLimitError";}}class r0 extends Ys{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${Ma.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class o0 extends Ys{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function a0(){return we(Sa.MODULE.AUDIO_CUSTOM_SOUNDS,t0)}function i0(e){Ae(Sa.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function pc(){return a0().sounds}function Ra(e){i0({sounds:e,version:1});}const s0="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",Zu=[{id:"default-notification",name:"Default",source:s0,type:"upload",createdAt:0}];function l0(e){const t=new Set(e.map(r=>r.id)),n=Zu.filter(r=>!t.has(r.id));return n.length===0?e:[...e,...n]}function ep(e){return Zu.some(t=>t.id===e)}function c0(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const o=e.slice(n+1).length*3/4;return Math.round(o)}function tp(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=c0(e);if(t>0&&t>Ma.MAX_SIZE_BYTES)throw new r0(t)}function np(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function d0(e){if(e>=Ma.MAX_SOUNDS)throw new n0}let at=[],qi=false;function $n(){qi||rp();}function u0(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function rp(){if(qi)return;let e=pc();e=l0(e),e.length!==pc().length&&Ra(e),at=e,qi=true,console.log(`[CustomSounds] Initialized with ${at.length} sounds`);}function p0(){return $n(),[...at]}function op(e){return $n(),at.find(t=>t.id===e)}function f0(e,t,n){$n(),np(e),tp(t),d0(at.length);const r={id:u0(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return at.push(r),Ra(at),console.log(`[CustomSounds] Added sound: ${r.name} (${r.id})`),r}function g0(e){if($n(),ep(e))throw new Error("Cannot remove default sounds");const t=at.findIndex(r=>r.id===e);if(t===-1)return  false;const n=at.splice(t,1)[0];return Ra(at),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function m0(e,t){if($n(),ep(e))throw new Error("Cannot update default sounds");const n=at.find(r=>r.id===e);return n?(t.name!==void 0&&(np(t.name),n.name=t.name.trim()),t.source!==void 0&&(tp(t.source),n.source=t.source.trim()),Ra(at),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function h0(e,t={}){$n();const n=op(e);if(!n)throw new o0(e);const{MGAudio:r}=await Ke(async()=>{const{MGAudio:o}=await Promise.resolve().then(()=>lp);return {MGAudio:o}},void 0);try{await r.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(o){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,o),o}}function b0(){Ke(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>lp);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}const ap={init:rp,getAll:p0,getById:op,add:f0,remove:g0,update:m0,play:h0,stop:b0};let vo=null;async function x0(){return ne.ready?true:vo||(vo=(async()=>{ne.baseUrl=await ln.base();const e=await Tt.load({baseUrl:ne.baseUrl}),t=Tt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const a=o[1].toLowerCase(),i=o[2];ne.urls[a].set(i,_t(ne.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(ne.sfx.mp3Url=_t(ne.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(ne.sfx.atlasUrl=_t(ne.baseUrl,r));}if(!ne.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return ne.sfx.atlas=await Es(ne.sfx.atlasUrl),Ky(ne.sfx.atlas),ap.init(),ne.ready=true,true})(),vo)}function ip(e){if(e!=="music"&&e!=="ambience")return  false;const t=ne.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return ne.tracks[e]=null,true}function y0(e,t,n={}){if(!ne.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=ne.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);ip(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=Qu(e,n.volume),o.preload="auto",o.play().catch(()=>{}),ne.tracks[e]=o,o}function v0(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(ne.urls[n].keys()).sort():n==="sfx"?ne.sfx.atlas?t.groups?Array.from(ne.sfx.groups.keys()).sort():Object.keys(ne.sfx.atlas).sort():[]:[]}function w0(){return ["sfx","music","ambience"]}function S0(){return Array.from(ne.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function C0(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=ne.urls[n],a=r.toLowerCase();for(const i of Array.from(o.keys()))if(i.toLowerCase()===a)return  true;return  false}function k0(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(ne.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function _0(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=ne.urls[n],a=r.toLowerCase();for(const[i,s]of Array.from(o.entries()))if(i.toLowerCase()===a)return s;return null}function T0(){return ne.tracks.music&&(ne.tracks.music.volume=Or("music").atom),ne.tracks.ambience&&(ne.tracks.ambience.volume=Or("ambience").atom),true}let Ve=null;async function P0(e,t={}){sp();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const r={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,Ve?.audio===n&&(Ve=null));},setVolume:o=>{n.volume=Math.max(0,Math.min(1,o));},isPlaying:()=>!n.paused&&!n.ended};Ve=r;try{await new Promise((o,a)=>{const i=setTimeout(()=>{a(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(i),n.removeEventListener("canplay",c),n.removeEventListener("error",d);},c=()=>{s(),o();},d=()=>{s(),a(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(i),o()):(n.addEventListener("canplay",c,{once:!0}),n.addEventListener("error",d,{once:!0}));}),await n.play();}catch(o){throw Ve=null,o}return n.addEventListener("ended",()=>{Ve?.audio===n&&(Ve=null);}),r}function sp(){return Ve?(Ve.stop(),Ve=null,true):false}function A0(e){return Ve?(Ve.setVolume(e),true):false}function I0(){return Ve?.isPlaying()??false}function E0(){return Ve}function je(){if(!Ku())throw new Error("MGAudio not ready yet")}async function M0(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Qy(o,n);if(r==="music"||r==="ambience")return y0(r,o,n);throw new Error(`Unknown category: ${r}`)}const Na={init:x0,isReady:Ku,play:M0,stop:e=>(je(),ip(e)),list:(e,t)=>(je(),v0(e,t)),refreshVolumes:()=>(je(),T0()),categoryVolume:e=>(je(),Or(e)),getCategories:()=>(je(),w0()),getGroups:()=>(je(),S0()),hasTrack:(e,t)=>(je(),C0(e,t)),hasGroup:e=>(je(),k0(e)),getTrackUrl:(e,t)=>(je(),_0(e,t)),playCustom:async(e,t)=>(je(),P0(e,t)),stopCustom:()=>(je(),sp()),setCustomVolume:e=>(je(),A0(e)),isCustomPlaying:()=>(je(),I0()),getCustomHandle:()=>(je(),E0()),CustomSounds:ap},lp=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:Na},Symbol.toStringTag,{value:"Module"}));function R0(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const ye=R0();function cp(){return ye.ready}let wo=null;async function N0(){return ye.ready?true:wo||(wo=(async()=>{ye.baseUrl=await ln.base();const e=await Tt.load({baseUrl:ye.baseUrl}),t=Tt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ye.byCat.clear(),ye.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;const s=a.slice(0,i),c=a.slice(i+1),d=_t(ye.baseUrl,r);ye.byBase.set(a,d),ye.byCat.has(s)||ye.byCat.set(s,new Map),ye.byCat.get(s).set(c,d);}return ye.ready=true,true})(),wo)}function Ki(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function L0(e,t){if(t===void 0){const a=Ki(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}const n=String(e||"").trim(),r=Ki(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const a=r.indexOf("_");return {cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function F0(){return Array.from(ye.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function B0(e){const t=ye.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Yi(e,t){const{cat:n,asset:r,base:o}=L0(e,t),a=ye.byBase.get(o);if(a)return a;const s=ye.byCat.get(n)?.get(r);if(s)return s;if(!ye.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return _t(ye.baseUrl,`cosmetic/${o}.png`)}const fc=N?.document??document;function O0(){if(ye.overlay)return ye.overlay;const e=fc.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),fc.documentElement.appendChild(e),ye.overlay=e,e}function D0(){const e=ye.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function $0(e){return ye.defaultParent=e,true}const G0=N?.document??document;function Ji(e,t,n){if(!ye.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=o!==void 0?Yi(e,o):Yi(e),i=G0.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Ki(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{i.style[s]=String(c);}catch{}return i}function z0(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=r.parent||D0()||O0(),i=o!==void 0?Ji(e,o,r):Ji(e,r);if(a===ye.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else {const l=r.x??innerWidth/2,u=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${u}px`,i.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`);}}return a.appendChild(i),ye.live.add(i),i.__mgDestroy=()=>{try{i.remove();}catch{}ye.live.delete(i);},i}function H0(){for(const e of Array.from(ye.live))e.__mgDestroy?.();}const M={D:25,C:65,B:330,A:1170,AA:1e4},dp=[{id:"Expression_Vampire.png",filename:"Expression_Vampire.png",type:"Expression",availability:"purchasable",displayName:"Vampire",price:M.A},{id:"Mid_Skull.png",filename:"Mid_Skull.png",type:"Mid",availability:"purchasable",displayName:"Skull",price:M.B},{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0},{id:"Bottom_DefaultBlack.png",filename:"Bottom_DefaultBlack.png",type:"Bottom",availability:"purchasable",displayName:"Black",price:M.D},{id:"Bottom_DefaultBlue.png",filename:"Bottom_DefaultBlue.png",type:"Bottom",availability:"purchasable",displayName:"Blue",price:M.D},{id:"Bottom_DefaultGreen.png",filename:"Bottom_DefaultGreen.png",type:"Bottom",availability:"purchasable",displayName:"Green",price:M.D},{id:"Bottom_DefaultPink.png",filename:"Bottom_DefaultPink.png",type:"Bottom",availability:"purchasable",displayName:"Pink",price:M.D},{id:"Bottom_DefaultPurple.png",filename:"Bottom_DefaultPurple.png",type:"Bottom",availability:"purchasable",displayName:"Purple",price:M.D},{id:"Bottom_DefaultRed.png",filename:"Bottom_DefaultRed.png",type:"Bottom",availability:"purchasable",displayName:"Red",price:M.D},{id:"Bottom_DefaultYellow.png",filename:"Bottom_DefaultYellow.png",type:"Bottom",availability:"purchasable",displayName:"Yellow",price:M.D},{id:"Bottom_RainbowShirt.png",filename:"Bottom_RainbowShirt.png",type:"Bottom",availability:"claimable",displayName:"I Survived",price:0},{id:"Mid_DefaultBlack.png",filename:"Mid_DefaultBlack.png",type:"Mid",availability:"purchasable",displayName:"Black",price:M.D},{id:"Mid_DefaultBlue.png",filename:"Mid_DefaultBlue.png",type:"Mid",availability:"purchasable",displayName:"Blue",price:M.D},{id:"Mid_DefaultGreen.png",filename:"Mid_DefaultGreen.png",type:"Mid",availability:"purchasable",displayName:"Green",price:M.D},{id:"Mid_DefaultPink.png",filename:"Mid_DefaultPink.png",type:"Mid",availability:"purchasable",displayName:"Pink",price:M.D},{id:"Mid_DefaultPurple.png",filename:"Mid_DefaultPurple.png",type:"Mid",availability:"purchasable",displayName:"Purple",price:M.D},{id:"Mid_DefaultRed.png",filename:"Mid_DefaultRed.png",type:"Mid",availability:"purchasable",displayName:"Red",price:M.D},{id:"Mid_DefaultYellow.png",filename:"Mid_DefaultYellow.png",type:"Mid",availability:"purchasable",displayName:"Yellow",price:M.D},{id:"Top_DefaultBlack.png",filename:"Top_DefaultBlack.png",type:"Top",availability:"purchasable",displayName:"Black",price:M.D},{id:"Top_DefaultBlue.png",filename:"Top_DefaultBlue.png",type:"Top",availability:"purchasable",displayName:"Blue",price:M.D},{id:"Top_DefaultGreen.png",filename:"Top_DefaultGreen.png",type:"Top",availability:"purchasable",displayName:"Green",price:M.D},{id:"Top_DefaultPink.png",filename:"Top_DefaultPink.png",type:"Top",availability:"purchasable",displayName:"Pink",price:M.D},{id:"Top_DefaultPurple.png",filename:"Top_DefaultPurple.png",type:"Top",availability:"purchasable",displayName:"Purple",price:M.D},{id:"Top_DefaultRed.png",filename:"Top_DefaultRed.png",type:"Top",availability:"purchasable",displayName:"Red",price:M.D},{id:"Top_DefaultYellow.png",filename:"Top_DefaultYellow.png",type:"Top",availability:"purchasable",displayName:"Yellow",price:M.D},{id:"Bottom_WizardRobe.png",filename:"Bottom_WizardRobe.png",type:"Bottom",availability:"purchasable",displayName:"Wizard",price:M.A},{id:"Top_AviatorHat.png",filename:"Top_AviatorHat.png",type:"Top",availability:"purchasable",displayName:"Aviator",price:M.A},{id:"Top_BallCap.png",filename:"Top_BallCap.png",type:"Top",availability:"purchasable",displayName:"Ball Cap",price:M.A},{id:"Top_Beach.png",filename:"Top_Beach.png",type:"Top",availability:"purchasable",displayName:"Beach",price:M.B},{id:"Top_Brain.png",filename:"Top_Brain.png",type:"Top",availability:"purchasable",displayName:"Brain",price:M.C},{id:"Top_Cactus.png",filename:"Top_Cactus.png",type:"Top",availability:"purchasable",displayName:"Cactus",price:M.C},{id:"Top_CatBeanie.png",filename:"Top_CatBeanie.png",type:"Top",availability:"purchasable",displayName:"Cat Beanie",price:M.C},{id:"Top_Fedora.png",filename:"Top_Fedora.png",type:"Top",availability:"purchasable",displayName:"Fedora",price:M.C},{id:"Top_HardHat.png",filename:"Top_HardHat.png",type:"Top",availability:"purchasable",displayName:"Hard Hat",price:M.B},{id:"Top_HotCocoa.png",filename:"Top_HotCocoa.png",type:"Top",availability:"purchasable",displayName:"Hot Cocoa",price:M.C},{id:"Top_IceCream.png",filename:"Top_IceCream.png",type:"Top",availability:"purchasable",displayName:"Ice Cream",price:M.B},{id:"Top_Moon.png",filename:"Top_Moon.png",type:"Top",availability:"purchasable",displayName:"Moon",price:M.C},{id:"Top_Mushroom.png",filename:"Top_Mushroom.png",type:"Top",availability:"purchasable",displayName:"Mushroom",price:M.A},{id:"Top_Nest.png",filename:"Top_Nest.png",type:"Top",availability:"purchasable",displayName:"Bird Nest",price:M.A},{id:"Top_PaintCan.png",filename:"Top_PaintCan.png",type:"Top",availability:"purchasable",displayName:"Paint Can",price:M.A},{id:"Top_PirateHat.png",filename:"Top_PirateHat.png",type:"Top",availability:"purchasable",displayName:"Pirate",price:M.A},{id:"Top_Pond.png",filename:"Top_Pond.png",type:"Top",availability:"purchasable",displayName:"Pond",price:M.A},{id:"Top_Ramen.png",filename:"Top_Ramen.png",type:"Top",availability:"purchasable",displayName:"Ramen",price:M.A},{id:"Top_StrawTop.png",filename:"Top_StrawTop.png",type:"Top",availability:"purchasable",displayName:"Straw Top",price:M.C},{id:"Top_Submarine.png",filename:"Top_Submarine.png",type:"Top",availability:"purchasable",displayName:"Submarine",price:M.C},{id:"Top_TopHat.png",filename:"Top_TopHat.png",type:"Top",availability:"purchasable",displayName:"Top Hat",price:M.B},{id:"Top_UFO.png",filename:"Top_UFO.png",type:"Top",availability:"purchasable",displayName:"UFO",price:M.A},{id:"Top_CozyAntlers.png",filename:"Top_CozyAntlers.png",type:"Top",availability:"purchasable",displayName:"Cozy Antlers",price:M.A},{id:"Top_PomPomBeanie.png",filename:"Top_PomPomBeanie.png",type:"Top",availability:"purchasable",displayName:"Pom Pom Beanie",price:M.B},{id:"Top_SnowBeanie.png",filename:"Top_SnowBeanie.png",type:"Top",availability:"purchasable",displayName:"Snow Beanie",price:M.C},{id:"Mid_Axolotl.png",filename:"Mid_Axolotl.png",type:"Mid",availability:"purchasable",displayName:"Axolotl",price:M.A},{id:"Mid_Boba.png",filename:"Mid_Boba.png",type:"Mid",availability:"purchasable",displayName:"Boba",price:M.A},{id:"Mid_Cat.png",filename:"Mid_Cat.png",type:"Mid",availability:"purchasable",displayName:"Cat",price:M.C},{id:"Mid_Cup.png",filename:"Mid_Cup.png",type:"Mid",availability:"purchasable",displayName:"Cup",price:M.C},{id:"Mid_Dog.png",filename:"Mid_Dog.png",type:"Mid",availability:"purchasable",displayName:"Dog",price:M.C},{id:"Mid_Frog.png",filename:"Mid_Frog.png",type:"Mid",availability:"purchasable",displayName:"Frog",price:M.C},{id:"Mid_Koala.png",filename:"Mid_Koala.png",type:"Mid",availability:"purchasable",displayName:"Koala",price:M.C},{id:"Mid_Ladybug.png",filename:"Mid_Ladybug.png",type:"Mid",availability:"purchasable",displayName:"Ladybug",price:M.A},{id:"Mid_Monkey.png",filename:"Mid_Monkey.png",type:"Mid",availability:"purchasable",displayName:"Monkey",price:M.B},{id:"Mid_Narwhal.png",filename:"Mid_Narwhal.png",type:"Mid",availability:"purchasable",displayName:"Narwhal",price:M.B},{id:"Mid_Owl.png",filename:"Mid_Owl.png",type:"Mid",availability:"purchasable",displayName:"Owl",price:M.B},{id:"Mid_Penguin.png",filename:"Mid_Penguin.png",type:"Mid",availability:"purchasable",displayName:"Penguin",price:M.C},{id:"Mid_Rhino.png",filename:"Mid_Rhino.png",type:"Mid",availability:"purchasable",displayName:"Rhino",price:M.A},{id:"Mid_Robot.png",filename:"Mid_Robot.png",type:"Mid",availability:"purchasable",displayName:"Robot",price:M.A},{id:"Mid_Sloth.png",filename:"Mid_Sloth.png",type:"Mid",availability:"purchasable",displayName:"Sloth",price:M.C},{id:"Mid_Tree.png",filename:"Mid_Tree.png",type:"Mid",availability:"purchasable",displayName:"Tree",price:M.A},{id:"Mid_Zombie.png",filename:"Mid_Zombie.png",type:"Mid",availability:"purchasable",displayName:"Zombie",price:M.B},{id:"Bottom_Backpacking.png",filename:"Bottom_Backpacking.png",type:"Bottom",availability:"purchasable",displayName:"Backpack",price:M.A},{id:"Bottom_Barista.png",filename:"Bottom_Barista.png",type:"Bottom",availability:"purchasable",displayName:"Barista",price:M.C},{id:"Bottom_Basket.png",filename:"Bottom_Basket.png",type:"Bottom",availability:"purchasable",displayName:"Basket",price:M.C},{id:"Bottom_Bathrobe.png",filename:"Bottom_Bathrobe.png",type:"Bottom",availability:"purchasable",displayName:"Bathrobe",price:M.C},{id:"Bottom_Dress.png",filename:"Bottom_Dress.png",type:"Bottom",availability:"purchasable",displayName:"Dress",price:M.C},{id:"Bottom_Dress_02.png",filename:"Bottom_Dress_02.png",type:"Bottom",availability:"purchasable",displayName:"Dress 2",price:M.B},{id:"Bottom_Dress_03.png",filename:"Bottom_Dress_03.png",type:"Bottom",availability:"purchasable",displayName:"Dress 3",price:M.C},{id:"Bottom_Dress_04.png",filename:"Bottom_Dress_04.png",type:"Bottom",availability:"purchasable",displayName:"Dress 4",price:M.C},{id:"Bottom_Dress_05.png",filename:"Bottom_Dress_05.png",type:"Bottom",availability:"purchasable",displayName:"Dress 5",price:M.A},{id:"Bottom_DressShirt.png",filename:"Bottom_DressShirt.png",type:"Bottom",availability:"purchasable",displayName:"Dress Shirt",price:M.C},{id:"Bottom_Floatie.png",filename:"Bottom_Floatie.png",type:"Bottom",availability:"purchasable",displayName:"Floatie",price:M.A},{id:"Bottom_HazmatSuit.png",filename:"Bottom_HazmatSuit.png",type:"Bottom",availability:"purchasable",displayName:"Hazmat",price:M.B},{id:"Bottom_Overalls.png",filename:"Bottom_Overalls.png",type:"Bottom",availability:"purchasable",displayName:"Overalls",price:M.C},{id:"Bottom_ProfessorJacket.png",filename:"Bottom_ProfessorJacket.png",type:"Bottom",availability:"purchasable",displayName:"Professor",price:M.B},{id:"Bottom_Robot.png",filename:"Bottom_Robot.png",type:"Bottom",availability:"purchasable",displayName:"Robot",price:M.B},{id:"Bottom_SpaceSuit.png",filename:"Bottom_SpaceSuit.png",type:"Bottom",availability:"purchasable",displayName:"Space Suit",price:M.A},{id:"Bottom_Tuxedo.png",filename:"Bottom_Tuxedo.png",type:"Bottom",availability:"purchasable",displayName:"Tuxedo",price:M.B},{id:"Top_DiscordPopsicle.png",filename:"Top_DiscordPopsicle.png",type:"Top",availability:"authenticated",displayName:"Discord",price:50},{id:"Top_Beret.png",filename:"Top_Beret.png",type:"Top",availability:"purchasable",displayName:"Béret",price:M.C},{id:"Top_ChefHat.png",filename:"Top_ChefHat.png",type:"Top",availability:"purchasable",displayName:"Chef Hat",price:M.A},{id:"Top_ChurchHat.png",filename:"Top_ChurchHat.png",type:"Top",availability:"purchasable",displayName:"Church Hat",price:M.B},{id:"Top_DevilHorns.png",filename:"Top_DevilHorns.png",type:"Top",availability:"purchasable",displayName:"Devil Horns",price:M.A},{id:"Top_SunHat.png",filename:"Top_SunHat.png",type:"Top",availability:"purchasable",displayName:"Sun Hat",price:M.B},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0},{id:"Expression_Alarmed.png",filename:"Expression_Alarmed.png",type:"Expression",availability:"purchasable",displayName:"Alarmed",price:M.D},{id:"Expression_Annoyed.png",filename:"Expression_Annoyed.png",type:"Expression",availability:"purchasable",displayName:"Annoyed",price:M.D},{id:"Expression_Bashful.png",filename:"Expression_Bashful.png",type:"Expression",availability:"purchasable",displayName:"Bashful",price:M.D},{id:"Expression_Calm3.png",filename:"Expression_Calm3.png",type:"Expression",availability:"purchasable",displayName:"Calm",price:M.D},{id:"Expression_Crying.png",filename:"Expression_Crying.png",type:"Expression",availability:"purchasable",displayName:"Crying",price:M.D},{id:"Expression_Cute.png",filename:"Expression_Cute.png",type:"Expression",availability:"purchasable",displayName:"Cute",price:M.D},{id:"Expression_Derpy.png",filename:"Expression_Derpy.png",type:"Expression",availability:"purchasable",displayName:"Derpy",price:M.D},{id:"Expression_Loopy.png",filename:"Expression_Loopy.png",type:"Expression",availability:"purchasable",displayName:"Loopy",price:M.AA},{id:"Expression_SoHappy.png",filename:"Expression_SoHappy.png",type:"Expression",availability:"purchasable",displayName:"So Happy",price:M.AA},{id:"Expression_Stressed.png",filename:"Expression_Stressed.png",type:"Expression",availability:"purchasable",displayName:"Stressed",price:M.AA},{id:"Expression_Happy.png",filename:"Expression_Happy.png",type:"Expression",availability:"purchasable",displayName:"Happy",price:M.D},{id:"Expression_Mad.png",filename:"Expression_Mad.png",type:"Expression",availability:"purchasable",displayName:"Mad",price:M.D},{id:"Expression_Pouty.png",filename:"Expression_Pouty.png",type:"Expression",availability:"purchasable",displayName:"Pouty",price:M.D},{id:"Expression_Shocked.png",filename:"Expression_Shocked.png",type:"Expression",availability:"purchasable",displayName:"Shocked",price:M.D},{id:"Expression_Thinking.png",filename:"Expression_Thinking.png",type:"Expression",availability:"purchasable",displayName:"Thinking",price:M.D},{id:"Expression_Tired.png",filename:"Expression_Tired.png",type:"Expression",availability:"purchasable",displayName:"Tired",price:M.D},{id:"Top_Chelle_Lilypad.png",filename:"Top_Chelle_Lilypad.png",type:"Top",availability:"claimable",displayName:"Chelle",price:0},{id:"Top_KylieRouge_Sunflower.png",filename:"Top_KylieRouge_Sunflower.png",type:"Top",availability:"claimable",displayName:"Kylie Rouge",price:0},{id:"Top_Custom_Minecraft.png",filename:"Top_Custom_Minecraft.png",type:"Top",availability:"claimable",displayName:"Minecraft",price:0},{id:"Top_Custom_Midjourney.png",filename:"Top_Custom_Midjourney.png",type:"Top",availability:"claimable",displayName:"Midjourney",price:0},{id:"Top_Custom_GoodFriend.png",filename:"Top_Custom_GoodFriend.png",type:"Top",availability:"claimable",displayName:"GOODFRIEND",price:0},{id:"Top_Custom_ForbiddenMethod.png",filename:"Top_Custom_ForbiddenMethod.png",type:"Top",availability:"claimable",displayName:"Forbidden Method",price:0},{id:"Top_Custom_Roblox.png",filename:"Top_Custom_Roblox.png",type:"Top",availability:"claimable",displayName:"Roblox",price:0},{id:"Top_Custom_EnglishLanguage.png",filename:"Top_Custom_EnglishLanguage.png",type:"Top",availability:"claimable",displayName:"English",price:0},{id:"Top_Custom_MagicCircle.png",filename:"Top_Custom_MagicCircle.png",type:"Top",availability:"claimable",displayName:"Magic Circle",price:0},{id:"Top_Custom_MrBeast.png",filename:"Top_Custom_MrBeast.png",type:"Top",availability:"claimable",displayName:"Straw Hat",price:0},{id:"Top_Custom_Fortnite.png",filename:"Top_Custom_Fortnite.png",type:"Top",availability:"claimable",displayName:"Supply Drop",price:0},{id:"Top_DonutHalo.png",filename:"Top_DonutHalo.png",type:"Top",availability:"claimable",displayName:"Donut Halo",price:0},{id:"Red",filename:"Banner_Checkers.png",type:"Color",availability:"default",displayName:"Red",price:0},{id:"Orange",filename:"Banner_Fire.png",type:"Color",availability:"default",displayName:"Orange",price:0},{id:"Yellow",filename:"Banner_StarsYellow.png",type:"Color",availability:"default",displayName:"Yellow",price:0},{id:"Green",filename:"Banner_Leaves.png",type:"Color",availability:"default",displayName:"Green",price:0},{id:"Blue",filename:"Banner_Stripes.png",type:"Color",availability:"default",displayName:"Blue",price:0},{id:"Purple",filename:"Banner_StarsPurple.png",type:"Color",availability:"default",displayName:"Purple",price:0},{id:"White",filename:"Banner_Tiles.png",type:"Color",availability:"default",displayName:"Grey",price:0},{id:"Black",filename:"Banner_Zigzags.png",type:"Color",availability:"default",displayName:"Black",price:0},{id:"Mid_Calico.png",filename:"Mid_Calico.png",type:"Mid",availability:"claimable",displayName:"Calico Cat",price:0},{id:"Top_Hachimaki.png",filename:"Top_Hachimaki.png",type:"Top",availability:"claimable",displayName:"Hachimaki",price:0},{id:"Bottom_Gi.png",filename:"Bottom_Gi.png",type:"Bottom",availability:"claimable",displayName:"Fighter Gi",price:0},{id:"Mid_Pug.png",filename:"Mid_Pug.png",type:"Mid",availability:"claimable",displayName:"Pug",price:0},{id:"Top_GnomeHat.png",filename:"Top_GnomeHat.png",type:"Top",availability:"claimable",displayName:"Gnome Hat",price:0},{id:"Bottom_Pot.png",filename:"Bottom_Pot.png",type:"Bottom",availability:"claimable",displayName:"Tin Pot",price:0},{id:"Mid_Panda.png",filename:"Mid_Panda.png",type:"Mid",availability:"claimable",displayName:"Panda",price:0},{id:"Top_WizardHat.png",filename:"Top_WizardHat.png",type:"Top",availability:"claimable",displayName:"Wizard Hat",price:0},{id:"Bottom_GolfPolo.png",filename:"Bottom_GolfPolo.png",type:"Bottom",availability:"claimable",displayName:"Golf Polo",price:0},{id:"Mid_Watermelon.png",filename:"Mid_Watermelon.png",type:"Mid",availability:"claimable",displayName:"Watermelon",price:0},{id:"Top_Strawberry.png",filename:"Top_Strawberry.png",type:"Top",availability:"claimable",displayName:"Strawberry",price:0},{id:"Bottom_Sushi.png",filename:"Bottom_Sushi.png",type:"Bottom",availability:"claimable",displayName:"Sushi Roll",price:0},{id:"Mid_Bee.png",filename:"Mid_Bee.png",type:"Mid",availability:"claimable",displayName:"Bee",price:0},{id:"Top_Acorn.png",filename:"Top_Acorn.png",type:"Top",availability:"claimable",displayName:"Acorn",price:0}],So={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};function up(){try{const t=Array.from(N.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${N.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}async function pp(){try{const{Store:e}=await Ke(async()=>{const{Store:o}=await Promise.resolve().then(()=>qr);return {Store:o}},void 0),t=await e.select("myDataAtom");if(console.log("[Avatar Debug] myDataAtom:",t),!t||typeof t!="object")throw new Error("myDataAtom not available");const n=t.cosmetic,r=t.name;return console.log("[Avatar Debug] cosmetic:",n),console.log("[Avatar Debug] avatar array:",n?.avatar),console.log("[Avatar Debug] color:",n?.color),{avatar:n?.avatar||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:n?.color||"Red",name:r||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:"Red",name:"Player"}}}function j0(e,t){if(!t)return e;let n=e;if(t.type){const r=Array.isArray(t.type)?t.type:[t.type];n=n.filter(o=>r.includes(o.type));}if(t.availability){const r=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(o=>r.includes(o.availability));}if(t.search){const r=t.search.toLowerCase();n=n.filter(o=>o.displayName.toLowerCase().includes(r));}return n}function La(e){const t=up(),n=dp.map(r=>({...r,url:`${t}${r.filename}`}));return j0(n,e)}function U0(e){return La(e).map(t=>t.url)}async function fp(){const e=await pp();return {bottom:e.avatar[So.BOTTOM]||"Bottom_DefaultGray.png",mid:e.avatar[So.MID]||"Mid_DefaultGray.png",top:e.avatar[So.TOP]||"Top_DefaultGray.png",expression:e.avatar[So.EXPRESSION]||"Expression_Default.png",color:e.color,array:e.avatar}}async function W0(){const e=await pp(),t=await fp(),n=La(),r={};return n.forEach(o=>{r[o.type]=(r[o.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:r,allItems:n,assetBaseUrl:up()}}const V0=100,ii=[];function Qi(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",a=n.path||"";let i="";if("value"in n){const s=n.value;i=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||a)r=`PartialState : ${o} ${a} ${i}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));ii.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),ii.length>V0&&ii.shift();}const Ue={nativeCtor:null,captured:[],latestOpen:null},gc=Symbol.for("ariesmod.ws.capture.wrapped"),mc=Symbol.for("ariesmod.ws.capture.native"),gp=1;function Zi(e){return !!e&&e.readyState===gp}function X0(){if(Zi(Ue.latestOpen))return Ue.latestOpen;for(let e=Ue.captured.length-1;e>=0;e--){const t=Ue.captured[e];if(Zi(t))return t}return null}function q0(e,t){Ue.captured.push(e),Ue.captured.length>25&&Ue.captured.splice(0,Ue.captured.length-25);const n=()=>{Ue.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Ue.latestOpen===e&&(Ue.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Qi("in",o.type||"unknown",o);}catch{Qi("in","raw",r.data);}}),e.readyState===gp&&n();}function K0(e=N,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[gc])return Ue.nativeCtor=r[mc]??Ue.nativeCtor??null,()=>{};const o=r;Ue.nativeCtor=o;function a(i,s){const c=s!==void 0?new o(i,s):new o(i);try{q0(c,n);}catch{}return c}try{a.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(a,o);}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED;}catch{}a[gc]=true,a[mc]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===a&&(e.WebSocket=o);}catch{}}}function Y0(e=N){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ma(e=N){const t=X0();if(t)return {ws:t,source:"captured"};const n=Y0(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function mp(e,t={}){const n=t.pageWindow??N,r=t.intervalMs??500,o=!!t.debug;let a=null,i=null;const s=()=>{const d=ma(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function J0(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Q0(e,t=N){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}const{ws:r}=ma(t);if(!r)return {ok:false,reason:"no-ws"};if(!Zi(r))return {ok:false,reason:"not-open"};const o=J0(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const a=JSON.parse(o);Qi("out",a.type||"unknown",a);}catch{}try{return r.send(o),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}}function Z0(e,t={},n=N){return Q0({type:e,...t},n)}const At={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},L={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var gt=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(gt||{});new Set(Object.values(At));new Set(Object.values(L));const ev=["Room","Quinoa"],tv={Room:["Room"],Quinoa:ev};function oe(e,t={},n=N){const r=t,{scopePath:o,scope:a,...i}=r,s=typeof o=="string"?o:a,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?tv[s]:null;return Z0(e,c?{scopePath:c,...i}:i,n)}function nv(e,t=N){return oe(L.Chat,{scope:"Room",message:e},t)}function rv(e,t=N){return oe(L.Emote,{scope:"Room",emoteType:e},t)}function ov(e,t=N){return oe(L.Wish,{scope:"Quinoa",wish:e},t)}function av(e,t=N){return oe(L.KickPlayer,{scope:"Room",playerId:e},t)}function hp(e,t=N){return oe(L.SetPlayerData,{scope:"Room",data:e},t)}function iv(e=N){return oe(L.UsurpHost,{scope:"Quinoa"},e)}function sv(e=N){return oe(L.ReportSpeakingStart,{scope:"Quinoa"},e)}function lv(e,t=N){return oe(L.SetSelectedGame,{scope:"Room",gameId:e},t)}function cv(e,t=N){return oe(L.VoteForGame,{scope:"Room",gameId:e},t)}function dv(e,t=N){return oe(L.RequestGame,{scope:"Room",gameId:e},t)}function uv(e=N){return oe(L.RestartGame,{scope:"Room"},e)}function pv(e,t=N){return oe(L.Ping,{scope:"Quinoa",id:e},t)}function bp(e,t,n=N){return oe(L.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const fv=bp;function gv(e,t,n=N){return oe(L.Teleport,{scope:"Quinoa",x:e,y:t},n)}function mv(e=N){return oe(L.CheckWeatherStatus,{scope:"Quinoa"},e)}function hv(e,t,n=N){return oe(L.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function bv(e,t=N){return oe(L.DropObject,{scope:"Quinoa",slotIndex:e},t)}function xv(e,t=N){return oe(L.PickupObject,{scope:"Quinoa",objectId:e},t)}function Fa(e,t=N){return oe(L.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Js(e,t="PetHutch",n=N){return oe(L.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Qs(e,t="PetHutch",n=N){return oe(L.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function yv(e,t,n=N){return oe(L.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function vv(e=N){return oe(L.LogItems,{scope:"Quinoa"},e)}function wv(e,t,n,r=N){return oe(L.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function Sv(e,t=N){return oe(L.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Cv(e,t=N){return oe(L.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function kv(e=N){return oe(L.SellAllCrops,{scope:"Quinoa"},e)}function _v(e,t=N){return oe(L.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Tv(e,t=N){return oe(L.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function Pv(e,t=N){return oe(L.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Av(e,t=N){return oe(L.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function Iv(e,t,n,r=N){return oe(L.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function Ev(e,t=N){return oe(L.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Mv(e,t,n,r=N){return oe(L.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function Rv(e,t,n=N){return oe(L.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Nv(e,t,n=N){return oe(L.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function Lv(e,t=N){return oe(L.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Fv(e,t,n,r=N){return oe(L.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function Bv(e,t=N){return oe(L.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function xp(e,t={x:0,y:0},n="Dirt",r=0,o=N){return oe(L.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function Ov(e,t,n=N){return oe(L.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function Dv(e,t=N){return oe(L.PetPositions,{scope:"Quinoa",positions:e},t)}function yp(e,t,n=N){return oe(L.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function vp(e,t=N){return oe(L.StorePet,{scope:"Quinoa",itemId:e},t)}function $v(e,t,n=N){return oe(L.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function Gv(e,t=N){return oe(L.SellPet,{scope:"Quinoa",petId:e},t)}const Co={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};async function zv(){try{const{Store:e}=await Ke(async()=>{const{Store:o}=await Promise.resolve().then(()=>qr);return {Store:o}},void 0),t=await e.select("myDataAtom");if(!t||typeof t!="object")throw new Error("myDataAtom not available");const n=t.cosmetic,r=t.name;return {avatar:n?.avatar||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:n?.color||"Red",name:r||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"],color:"Red",name:"Player"}}}async function wp(e){try{const t=await zv(),n=[...t.avatar];e.bottom!==void 0&&(n[Co.BOTTOM]=e.bottom),e.mid!==void 0&&(n[Co.MID]=e.mid),e.top!==void 0&&(n[Co.TOP]=e.top),e.expression!==void 0&&(n[Co.EXPRESSION]=e.expression);const r=e.color!==void 0?e.color:t.color,o=dp.map(i=>i.filename);[e.bottom,e.mid,e.top,e.expression].forEach(i=>{i&&!o.includes(i)&&console.warn(`[Avatar] Cosmetic not found in catalog: ${i}`);});const a=hp({name:t.name,cosmetic:{color:r,avatar:n}},N);return console.log("[Avatar] Set outfit:",{outfit:e,result:a}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function Hv(){return wp({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}function jv(e){return new Promise((t,n)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>t(r),r.onerror=()=>n(new Error(`Failed to load image: ${e}`)),r.src=e;})}function Uv(e){return La().find(r=>r.filename===e)?.url||""}async function Wv(e,t={}){const n=document.createElement("canvas"),r=t.width||400,o=t.height||400,a=t.scale||1;n.width=r*a,n.height=o*a;const i=n.getContext("2d");if(!i)throw new Error("Failed to get canvas 2D context");if(i.imageSmoothingEnabled=a!==1,e.color){const l={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};i.fillStyle=l[e.color]||"#FF0000",i.fillRect(0,0,n.width,n.height);}const c=[e.bottom,e.mid,e.top,e.expression].filter(l=>!!l).map(l=>Uv(l));return (await Promise.all(c.map(l=>jv(l)))).forEach(l=>{i.drawImage(l,0,0,n.width,n.height);}),n}const ko={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3};let Zs=null,kn=null,Kt=null,Bt=null;function Vv(){try{const t=Array.from(N.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return `${N.location.origin}/assets/cosmetic/`}catch{return "https://magicgarden.gg/assets/cosmetic/"}}function si(e){return Vv()+e}function Xv(e,t){const r=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(r[ko.BOTTOM]=e.bottom),e.mid&&(r[ko.MID]=e.mid),e.top&&(r[ko.TOP]=e.top),e.expression&&(r[ko.EXPRESSION]=e.expression),r}async function qv(e){try{const{Store:t}=await Ke(async()=>{const{Store:i}=await Promise.resolve().then(()=>qr);return {Store:i}},void 0),n=await t.select("myDataAtom"),r=n?.cosmetic?.avatar||[],o=Xv(e,r),a=e.color||n?.cosmetic?.color||"Red";return Zs={avatar:o,color:a},Yv(),Jv(o),console.log("[Avatar] Rendered avatar override:",o),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function Kv(){Zs=null,kn&&(clearInterval(kn),kn=null),Kt&&(Kt.disconnect(),Kt=null);const e=N.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),Bt&&(Bt.remove(),Bt=null),console.log("[Avatar] Cleared override"),true}function Yv(){if(Bt)return;const e=N.document;Bt=e.createElement("style"),Bt.id="gemini-avatar-override-styles",Bt.textContent=`
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
    `,e.head.appendChild(Bt);}function Jv(e){kn&&clearInterval(kn),Kt&&Kt.disconnect();const t=N.document,n=()=>{const r=t.querySelectorAll(".Avatar");let o=0;r.forEach(a=>{const i=Array.from(a.querySelectorAll("img"));if(i.length===4){let c=false;i.forEach((d,l)=>{const u=si(e[l]);d.src!==u&&(c=true);}),c&&(i.forEach((d,l)=>{d.src=si(e[l]),d.setAttribute("data-gemini-override",e[l]);}),o++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const c=t.createElement("div");c.className="gemini-avatar-overlay",e.forEach(d=>{const l=t.createElement("img");l.src=si(d),l.setAttribute("data-gemini-cosmetic",d),c.appendChild(l);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(c),o++;}}),o>0&&console.log(`[Avatar] Re-applied ${o} override(s) (React reverted)`);};n(),kn=setInterval(n,100),Kt=new MutationObserver(()=>{setTimeout(n,10);}),Kt.observe(t.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (100ms + MutationObserver)");}function Qv(){return Zs}const li={BOTTOM:0,MID:1,TOP:2};let ha=null,Sr=null;function Zv(e,t){const r=[...t||["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"]];return e.bottom&&(r[li.BOTTOM]=e.bottom),e.mid&&(r[li.MID]=e.mid),e.top&&(r[li.TOP]=e.top),r}async function ew(e){try{const{Store:t}=await Ke(async()=>{const{Store:g}=await Promise.resolve().then(()=>qr);return {Store:g}},void 0),{getPlayers:n}=await Ke(async()=>{const{getPlayers:g}=await Promise.resolve().then(()=>Np);return {getPlayers:g}},void 0),a=n().get().myPlayer;if(!a)return console.error("[WorldAvatar] myPlayer not available"),!1;const i=a.id,s=a.cosmetic.avatar;Sr||(Sr=[...s]);const c=Zv(e,s);ha=c,console.log("[WorldAvatar] Current avatar:",s),console.log("[WorldAvatar] New avatar:",c);const d=await t.select("stateAtom");if(!d?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const l=d.data.players.findIndex(g=>g.id===i);if(l===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const u=d.data.players[l],p=[...d.data.players];p[l]={...u,cosmetic:{...u.cosmetic,avatar:c}};const f={...d,data:{...d.data,players:p}};return await t.set("stateAtom",f),console.log("[WorldAvatar] ✓ Override applied successfully!"),console.log("[WorldAvatar] Your avatar should update immediately."),console.log("[WorldAvatar] Note: The override is temporary and may be reverted by the game."),console.log("[WorldAvatar] Call renderWorld() again if you need to re-apply it."),!0}catch(t){return console.error("[WorldAvatar] Failed to render world avatar:",t),false}}async function tw(){if(!ha||!Sr)return console.log("[WorldAvatar] No override to clear"),true;try{const{Store:e}=await Ke(async()=>{const{Store:u}=await Promise.resolve().then(()=>qr);return {Store:u}},void 0),{getPlayers:t}=await Ke(async()=>{const{getPlayers:u}=await Promise.resolve().then(()=>Np);return {getPlayers:u}},void 0),o=t().get().myPlayer;if(!o)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=o.id,i=await e.select("stateAtom");if(!i?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const s=i.data.players.findIndex(u=>u.id===a);if(s===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const c=i.data.players[s],d=[...i.data.players];d[s]={...c,cosmetic:{...c.cosmetic,avatar:Sr}};const l={...i,data:{...i.data,players:d}};return await e.set("stateAtom",l),ha=null,Sr=null,console.log("[WorldAvatar] ✓ Override cleared, original avatar restored"),!0}catch(e){return console.error("[WorldAvatar] Failed to clear:",e),false}}function nw(){return ha}const rw={list:La,listUrls:U0,get:fp,debug:W0,set:wp,blank:Hv,toCanvas:Wv,render:qv,clearOverride:Kv,getOverride:Qv,renderWorld:ew,clearWorldOverride:tw,getWorldOverride:nw};function Wt(){if(!cp())throw new Error("MGCosmetic not ready yet")}const el={init:N0,isReady:cp,categories:()=>(Wt(),F0()),list:e=>(Wt(),B0(e)),url:((e,t)=>(Wt(),Yi(e,t))),create:((e,t,n)=>(Wt(),Ji(e,t,n))),show:((e,t,n)=>(Wt(),z0(e,t,n))),attach:e=>(Wt(),$0(e)),clear:()=>(Wt(),H0()),Avatar:rw},sr={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6},ow=new Set(["Gold","Rainbow"]),aw=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function Sp(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=sr.Rainbow:t===1&&(t=sr.Gold):o in sr&&(n+=sr[o],r++);return t*(1+n-r)}function iw(e){return sr[e]??null}function sw(e){return ow.has(e)}function lw(e){return aw.has(e)}function cw(e){return lw(e)}function tl(e,t){const n=Ba(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function pt(e,t,n){const r=Ba(e);if(!r)return 0;const o=r.baseSellPrice,a=Sp(n);return Math.round(o*t*a)}function dw(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function uw(e,t){return t>=e}function Ba(e){const t=Y.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Cp=3600,ci=80,pw=100,lr=30;function Oa(e){return e/Cp}function Da(e,t){const n=Yr(e);if(!n)return ci;const r=n.maxScale;if(t<=1)return ci;if(t>=r)return pw;const o=(t-1)/(r-1);return Math.floor(ci+20*o)}function $a(e,t,n){const r=Yr(e);if(!r)return n-lr;const o=r.hoursToMature,a=t/Cp,i=lr/o,s=Math.min(i*a,lr),c=n-lr;return Math.floor(c+s)}function Ga(e,t){const n=Yr(e);return n?t>=n.hoursToMature:false}function kp(e){const t=Yr(e);return t?lr/t.hoursToMature:0}function fw(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Yr(e){const t=Y.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function gw(e,t){return t<=0?1:Math.min(1,e/t)}const Ee=3600,_o=80,hc=100,wt=30,mw={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Jr(e){const t=Y.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function hw(e){return e/Ee}function Qr(e,t){const n=Jr(e);if(!n)return _o;const{maxScale:r}=n;if(t<=1)return _o;if(t>=r)return hc;const o=(t-1)/(r-1);return Math.floor(_o+(hc-_o)*o)}function bw(e){return e-wt}function xw(e){const t=Jr(e);return !t||t.hoursToMature<=0?0:wt/t.hoursToMature}function Zr(e,t,n){const r=Jr(e);if(!r)return n-wt;const o=t/Ee,a=wt/r.hoursToMature,i=Math.min(a*o,wt),s=n-wt;return Math.floor(s+i)}function _p(e,t,n){const r=Jr(e);if(!r)return 0;const o=n-wt,a=t-o;if(a<=0)return 0;const i=wt/r.hoursToMature;return i<=0?0:a/i*Ee}function nl(e,t,n,r,o=Ee){const i=_p(e,n,r)-t;return i<=0?0:o<=0?1/0:i/o}function za(e,t,n,r=Ee){return nl(e,t,n,n,r)}function rl(e,t,n,r,o=Ee){if(n>=r)return 0;const a=n+1;return nl(e,t,a,r,o)}function yw(e,t){return e>=t}function vw(e,t){const n=t-wt,o=(e-n)/wt*100;return Math.min(100,Math.max(0,o))}const ww=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:hw,calculateCurrentStrength:Zr,calculateHoursToMaxStrength:za,calculateHoursToNextStrength:rl,calculateHoursToStrength:nl,calculateMaxStrength:Qr,calculateStartingStrength:bw,calculateStrengthPerHour:xw,calculateStrengthProgress:vw,calculateXpForStrength:_p,getSpeciesData:Jr,isPetMature:yw},Symbol.toStringTag,{value:"Module"}));function ol(e){const t=Y.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=mw[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function Sw(e,t){return e<=0?0:t<=0?1/0:e/t}function al(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const a=e-o,i=r/n;return Math.ceil(a/i)}function il(e,t,n){const r=Y.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=ol(e);return al(n,t,i,a)}function Dr(e,t,n){const r=Y.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=ol(e);return al(n,t,i,a)}function sl(e,t,n,r,o,a){return e?t&&a>0?Dr(n,r,a):0:Dr(n,r,o)}const Cw=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:sl,calculateFeedsForDuration:al,calculateFeedsToMaxStrength:Dr,calculateFeedsToNextStrength:il,calculateHoursUntilStarving:Sw,getHungerDrainPerHour:ol},Symbol.toStringTag,{value:"Module"})),Tp={init(){},isReady(){return  true},crop:{calculateSize:tl,calculateSellPrice:pt,calculateProgress:dw,isReady:uw,getData:Ba},pet:{calculateAge:Oa,calculateMaxStrength:Da,calculateCurrentStrength:$a,isMature:Ga,calculateStrengthPerHour:kp,getData:Yr},mutation:{calculateMultiplier:Sp,getValue:iw,isGrowth:sw,isEnvironmental:cw},xp:ww,feed:Cw};async function Pp(e){const t=[{name:"Data",init:()=>Y.init()},{name:"CustomModal",init:()=>Sn.init()},{name:"Sprites",init:()=>H.init()},{name:"TileObjectSystem",init:()=>Pt.init()},{name:"Pixi",init:()=>Ea.init()},{name:"Audio",init:()=>Na.init()},{name:"Cosmetics",init:()=>el.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const ll=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:ln,MGAudio:Na,MGCalculators:Tp,MGCosmetic:el,MGCustomModal:Sn,MGData:Y,MGEnvironment:qe,MGManifest:Tt,MGPixi:Ea,MGPixiHooks:rt,MGSprite:H,MGTile:Pt,MGVersion:Is,PET_ABILITY_ACTIONS:wu,filterPetAbilityLogs:Cu,formatAbilityLog:ku,initAllModules:Pp,isPetAbilityAction:Su},Symbol.toStringTag,{value:"Module"}));function kw(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function _w(e){return e.toLowerCase()}function eo(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=true,size:c="md",onClick:d,variant:l="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=x("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),c==="sm"?g.classList.add("badge--sm"):c==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),d&&g.addEventListener("click",d);let m=false,b=i;function y(){m||(b===false?g.style.border="none":g.style.border="");}function S(k,P=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${k}`,`badge--${P}`),y();}function C(k){const P=(k??"").trim();P?(g.style.border=P,m=true):(m=false,y());}function v(k){b=k,y();}function T(k){g.textContent=k;}function h(k,P=o){S(k,P);}function w(k){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const P=kw(k);if(!P){g.textContent=String(k??"—");return}g.textContent=P,g.classList.add("badge--rarity",`badge--rarity-${_w(P)}`);}function _(k,P){const G=Y.get("abilities")?.[k],J=G?.color,j=J?.bg||"rgba(100, 100, 100, 0.9)",q=J?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=P||G?.name||k||"Unknown Ability",g.style.background=j,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const U=()=>{g.style.background=q;},O=()=>{g.style.background=j;};g.removeEventListener("mouseenter",U),g.removeEventListener("mouseleave",O),g.addEventListener("mouseenter",U),g.addEventListener("mouseleave",O);}return l==="rarity"?w(u):l==="ability"?_(p,f):(g.textContent=n,S(r,o),typeof i=="boolean"&&v(i),a&&C(a)),{root:g,setLabel:T,setType:h,setBorder:C,setWithBorder:v,setRarity:w,setAbility:_}}const Tw={expanded:false,sort:{key:null,dir:null},search:""},Pw={categories:{}};async function Aw(){const e=await Vr("tab-test",{version:2,defaults:Pw,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...Tw}}function n(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,expanded:i}}});}function r(a,i,s){const c=e.get(),d=t(a);e.update({categories:{...c.categories,[a]:{...d,sort:{key:i,dir:s}}}});}function o(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,search:i}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const Iw={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function To(e){return e?Iw[e]??0:0}class Ew extends sn{constructor(){super({id:"tab-test",label:"Test"});R(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Aw();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=x("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const a=H.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=x("span",{style:"opacity:0.5;"});return o.textContent="—",o}return eo({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){const i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},c=_s({columns:a,data:s(i.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});i.sort.key&&i.sort.dir&&c.sortBy(i.sort.key,i.sort.dir);const d=Ts({placeholder:"Search...",value:i.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=x("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);const u=x("div");return u.appendChild(l),u.appendChild(c.root),Xe({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=Y.get("plants");if(!o)return null;for(const i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;const a=r.toLowerCase();for(const i of Object.values(o)){const s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){const r=Y.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=Y.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=Y.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=Y.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){const i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){const i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){const i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){const i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){const i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>To(a.rarity)-To(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!H.isReady())try{await H.init();}catch{return}const o=H.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);const i=o[a],c=H.getCategoryId(i).map(d=>{const l=`sprite/${i}/${d}`;return {name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(c.sort((d,l)=>To(d.rarity)-To(l.rarity)),c.length>0){const d=this.createDataCard(i,this.formatCategoryName(i),c,r);n.appendChild(d);}}}}function ve(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Ap=`
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
`,Mw={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Xt=null;async function Rw(){if(Xt)return Xt;Xt=await Vr("tab-auto-favorite",{version:1,defaults:Mw});const e=we(Se.AUTO_FAVORITE_UI,null);return e&&(await Xt.set(e),Mg(Se.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Xt}function st(){if(!Xt)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Xt}const cl=Se.AUTO_FAVORITE,Ip={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function on(){return we(cl,Ip)}function dl(e){Ae(cl,e);}function Ep(e){const n={...on(),...e};return dl(n),n}function ul(e){const t=on();return t.mode="simple",t.simple={...t.simple,...e},dl(t),t}function Nw(e){ul({favoriteSpecies:e});}function Lw(e){ul({favoriteMutations:e});}function bc(){return on().enabled}function ft(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let i=0;i<e.length;i++)if(!ft(e[i],t[i]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return  false;for(const i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!ft(n[i],r[i]))return  false;return  true}const xc={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},yc={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function Fw(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Bw(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Ow(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function Dw(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function $w(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function vc(e){return {position:Fw(e),tile:Bw(e),garden:Ow(e),object:Dw(e),plant:$w(e)}}function wc(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Gw(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!ft(e.data,t.data)}function zw(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!ft(e.sortedSlotIndices,t.sortedSlotIndices)?true:!ft(e.slots,t.slots)}function Hw(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function jw(){let e=yc,t=yc,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(xc),s=new Set;function c(){if(s.size<i.length)return;const l=vc(a);if(!ft(e,l)&&(t=e,e=l,!!n)){for(const u of o.all)u(e,t);if(wc(t)!==wc(e))for(const u of o.stable)u(e,t);if(Gw(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(zw(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(Hw(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const l=i.map(async u=>{const p=xc[u],f=await me.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=vc(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let di=null;function Ye(){return di||(di=jw()),di}function Uw(){let e=null;const t=[],n=new Set,r={},o=new Set,a=2;function i(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function c(u,p){const{cols:f,rows:g}=u,m=f*g,b=new Set,y=new Set,S=new Map,C=[],v=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],T=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],h=Math.max(v.length,T.length);for(let k=0;k<h;k++){const P=v[k]??[],E=T[k]??[],G=P.map((j,q)=>(b.add(j),S.set(j,k),{globalIndex:j,localIndex:q,position:i(f,j)})),J=E.map((j,q)=>(y.add(j),S.set(j,k),{globalIndex:j,localIndex:q,position:i(f,j)}));C.push({userSlotIdx:k,dirtTiles:G,boardwalkTiles:J,allTiles:[...G,...J]});}const w=u.spawnTiles.map(k=>i(f,k)),_={};if(u.locations)for(const[k,P]of Object.entries(u.locations)){const E=P.spawnTileIdx??[];_[k]={name:k,spawnTiles:E,spawnPositions:E.map(G=>i(f,G))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:w,locations:_,userSlots:C,globalToXY(k){return i(f,k)},xyToGlobal(k,P){return s(f,k,P)},getTileOwner(k){return S.get(k)??null},isDirtTile(k){return b.has(k)},isBoardwalkTile(k){return y.has(k)}}}function d(){if(o.size<a||e)return;const u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(const f of n)f(e);n.clear();}}async function l(){const u=await me.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await me.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let ui=null;function es(){return ui||(ui=Uw()),ui}function Ww(){const e=Y.get("mutations");return e?Object.keys(e):[]}function Mp(){const e={};for(const t of Ww())e[t]=[];return e}function ts(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Mp()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Vw(e,t,n,r){const o=t.slots.filter(a=>r>=a.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function Xw(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function qw(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Sc(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Cc(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return ts();const a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],c=i?.boardwalkTiles??[],d=[],l=[],u=[],p={},f=[],g=[],m=[],b=[],y=Mp(),S=[],C=[],v=[],T={},h=[],w=[],_={},k=new Set,P=new Set;for(const[j,q]of Object.entries(n.tileObjects)){const U=parseInt(j,10);k.add(U);const O=a?a.globalToXY(U):{x:0,y:0};if(q.objectType==="plant"){const $=q,z=Vw(j,$,O,o);d.push(z),z.isMature?l.push(z):u.push(z),p[z.species]||(p[z.species]=[]),p[z.species].push(z);for(let D=0;D<$.slots.length;D++){const I=$.slots[D],F=Xw(j,O,D,I,o);if(f.push(F),F.isMature?g.push(F):m.push(F),F.mutations.length>0){b.push(F);for(const B of F.mutations)y[B]||(y[B]=[]),y[B].push(F);}}}else if(q.objectType==="egg"){const z=qw(j,q,O,o);S.push(z),T[z.eggId]||(T[z.eggId]=[]),T[z.eggId].push(z),z.isMature?C.push(z):v.push(z);}else if(q.objectType==="decor"){const z=Sc(j,q,O,"tileObjects");h.push(z),_[z.decorId]||(_[z.decorId]=[]),_[z.decorId].push(z);}}for(const[j,q]of Object.entries(n.boardwalkTileObjects)){const U=parseInt(j,10);P.add(U);const O=a?a.globalToXY(U):{x:0,y:0},z=Sc(j,q,O,"boardwalk");w.push(z),_[z.decorId]||(_[z.decorId]=[]),_[z.decorId].push(z);}const E=[...h,...w],G=s.filter(j=>!k.has(j.localIndex)),J=c.filter(j=>!P.has(j.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:m,mutated:{all:b,byMutation:y}},eggs:{all:S,mature:C,growing:v,byType:T,count:S.length},decors:{tileObjects:h,boardwalk:w,all:E,byType:_,count:E.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:G,boardwalk:J}},counts:{plants:d.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:S.length,matureEggs:C.length,decors:E.length,emptyTileObjects:G.length,emptyBoardwalk:J.length}}}function kc(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Kw(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function Yw(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Jw(e,t,n){const r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{const i=`${a.tileIndex}:${a.slotIndex}`;return !r.has(i)&&o.has(i)})}function Qw(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Zw(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const a=r.get(o.tileIndex);if(!a)continue;const i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){const c=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:u});}}}return n}function eS(e,t,n){const r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(const i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(const i of e){const s=o.get(i.tileIndex);if(!s)continue;const c=Math.min(i.slots.length,s.slots.length);for(let d=0;d<c;d++){const l=i.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){const p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){const l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;const u=i.slots[d];if(!u)continue;const p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function tS(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function nS(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!a.has(n(c)));return {added:i,removed:s}}function rS(){let e=ts(),t=ts(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=Cc(a,es);if(ft(e,l)||(t=e,e=l,!n))return;for(const C of o.all)C(e,t);if(kc(t)!==kc(e))for(const C of o.stable)C(e,t);const u=Kw(t.plants.all,e.plants.all);for(const C of u.added)for(const v of o.plantAdded)v({plant:C});for(const C of u.removed)for(const v of o.plantRemoved)v({plant:C,tileIndex:C.tileIndex});const p=Yw(t.plants.mature,e.plants.mature,e.plants.all);for(const C of p)for(const v of o.plantMatured)v({plant:C});const f=Zw(t.plants.all,e.plants.all);for(const C of f)for(const v of o.cropMutated)v(C);const g=Jw(t.crops.mature,e.crops.mature,e.crops.all);for(const C of g)for(const v of o.cropMatured)v({crop:C});const m=eS(t.plants.all,e.plants.all,t.crops.all);for(const C of m)for(const v of o.cropHarvested)v(C);const b=tS(t.eggs.all,e.eggs.all);for(const C of b.added)for(const v of o.eggPlaced)v({egg:C});for(const C of b.removed)for(const v of o.eggRemoved)v({egg:C});const y=Qw(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const C of y)for(const v of o.eggMatured)v({egg:C});const S=nS(t.decors.all,e.decors.all);for(const C of S.added)for(const v of o.decorPlaced)v({decor:C});for(const C of S.removed)for(const v of o.decorRemoved)v({decor:C});}async function d(){if(n)return;const l=await Ox.onChangeNow(p=>{a.garden=p,i.add("garden"),c();});r.push(l);const u=await me.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),c();});r.push(u),n=true,i.size===s&&(e=Cc(a,es));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let pi=null;function Rp(){return pi||(pi=rS()),pi}const _c={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Tc(e,t){const n=Oa(e.xp),r=Da(e.petSpecies,e.targetScale),o=$a(e.petSpecies,e.xp,r),a=Ga(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function oS(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=Oa(e.slot.xp),a=Da(e.slot.petSpecies,e.slot.targetScale),i=$a(e.slot.petSpecies,e.slot.xp,a),s=Ga(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}const Pc=500;let ht=[],Qo=0;function aS(){try{const e=we(Sa.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Qo=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function iS(e){try{Ae(Sa.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function sS(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function lS(e){if(!e||!Array.isArray(e))return;const t=Cu(e),n=[];for(const r of t)if(r.timestamp>Qo){const o=sS(r);o&&n.push(o);}n.length!==0&&(Qo=Math.max(...n.map(r=>r.performedAt),Qo),ht=[...n,...ht],ht.length>Pc&&(ht=ht.slice(0,Pc)),iS(ht),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${ht.length})`));}function Ac(e){const t=new Set,n=[];for(const f of e.active??[]){const g=oS(f,e.slotInfos??{});n.push(g),t.add(g.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Tc(f,"inventory");r.push(g),t.add(g.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Tc(f,"hutch");o.push(g),t.add(g.id);}const a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(f=>f.id===i)??null:null,l=Rp().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},hutch:{hasHutch:l,currentItems:u,maxItems:25},expandedPetSlotId:i,expandedPet:s,abilityLogs:[...ht]}}const Ic={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function cS(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Ec(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function dS(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Ec),r=t.all.map(Ec);return cS(n,r)}function uS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location});}return n}function pS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function fS(e,t){const n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function gS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage});}return n}function mS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength});}return n}function hS(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o});}return n}function bS(){let e=Ic,t=Ic,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(_c),s=new Set;function c(){if(s.size<i.length)return;if(a.activityLogs){const y=a.activityLogs?.activityLogs||a.activityLogs;Array.isArray(y)&&lS(y);}const l=Ac(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const y of o.all)y(e,t);if(!dS(t,e))for(const y of o.stable)y(e,t);const u=uS(t,e);for(const y of u)for(const S of o.location)S(y);const p=pS(t,e);for(const y of p)for(const S of o.ability)S(y);const f=fS(t,e);if(f)for(const y of o.count)y(f);const g=gS(t,e);for(const y of g)for(const S of o.growth)S(y);const m=mS(t,e);for(const y of m)for(const S of o.strengthGain)S(y);const b=hS(t,e);for(const y of b)for(const S of o.maxStrength)S(y);if(t.expandedPetSlotId!==e.expandedPetSlotId){const y={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of o.expandedPet)S(y);}}async function d(){if(n)return;ht=aS(),console.log(`[myPets] Loaded ${ht.length} ability logs from storage`);const l=i.map(async u=>{const p=_c[u],f=await me.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=Ac(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let fi=null;function Gn(){return fi||(fi=bS()),fi}const Mc={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Rc={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Nc(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:a}}function Lc(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function xS(e,t){return Lc(e)===Lc(t)}function yS(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Po(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function vS(e,t){const n=new Set(e.map(Po)),r=new Set(t.map(Po)),o=t.filter(i=>!n.has(Po(i))),a=e.filter(i=>!r.has(Po(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function wS(e,t){const n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function SS(){let e=Rc,t=Rc,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Mc),s=new Set;function c(){if(s.size<i.length)return;const l=Nc(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!xS(t,e))for(const f of o.stable)f(e,t);if(yS(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const u=vS(t.items,e.items);if(u)for(const f of o.items)f(u);const p=wS(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const l=i.map(async u=>{const p=Mc[u],f=await me.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=Nc(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let gi=null;function un(){return gi||(gi=SS()),gi}const ns={all:[],host:null,myPlayer:null,count:0};function CS(e,t,n){const r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Fc(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return ns;const a=new Map;Array.isArray(r)&&r.forEach((d,l)=>{d?.type==="user"&&d?.playerId&&a.set(d.playerId,{slot:d,index:l});});const i=t.map(d=>CS(d,n,a)),s=i.find(d=>d.isHost)??null,c=o!==null?i.find(d=>d.slotIndex===o)??null:null;return {all:i,host:s,myPlayer:c,count:i.length}}function Bc(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function kS(e,t){const n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(const a of t)r.has(a.id)||n.push({player:a,type:"join"});for(const a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function _S(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function TS(){let e=ns,t=ns,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=4;function c(){if(i.size<s)return;const l=Fc(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(Bc(t)!==Bc(e))for(const m of o.stable)m(e,t);const u=kS(t.all,e.all);for(const m of u)for(const b of o.joinLeave)b(m);const p=_S(t.all,e.all);for(const m of p)for(const b of o.connection)b(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const b of o.host)b(m);}}async function d(){if(n)return;const l=await Fx.onChangeNow(g=>{a.players=g,i.add("players"),c();});r.push(l);const u=await Bx.onChangeNow(g=>{a.hostPlayerId=g,i.add("hostPlayerId"),c();});r.push(u);const p=await Lx.onChangeNow(g=>{a.userSlots=g,i.add("userSlots"),c();});r.push(p);const f=await me.subscribe("myUserSlotIdxAtom",g=>{a.myUserSlotIndex=g,i.add("myUserSlotIndex"),c();});r.push(f),n=true,i.size===s&&(e=Fc(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let mi=null;function pl(){return mi||(mi=TS()),mi}const Np=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:pl},Symbol.toStringTag,{value:"Module"})),to=["seed","tool","egg","decor"];function PS(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function AS(e,t,n){const r=PS(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function IS(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>AS(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:c}}function Oc(e){const t=e.shops,n=e.purchases??{},r=to.map(s=>IS(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null);let i=null;if(a.length>0){const c=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:i}}const Dc={all:to.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function $c(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function ES(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function MS(e,t){const n=[];for(const r of to){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function RS(e,t){const n=[];for(const r of to){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function NS(){let e=Dc,t=Dc,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=Oc(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if($c(t)!==$c(e))for(const g of o.stable)g(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of to){const m=ES(t.byType[g],e.byType[g]);if(m)for(const b of u[g])b(m);}const p=MS(t,e);for(const g of p)for(const m of o.purchase)m(g);const f=RS(t,e);for(const g of f)for(const m of o.availability)m(g);}async function d(){if(n)return;const l=await Dx.onChangeNow(p=>{a.shops=p,i.add("shops"),c();});r.push(l);const u=await $x.onChangeNow(p=>{a.purchases=p,i.add("purchases"),c();});r.push(u),n=true,i.size===s&&(e=Oc(a));}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(f=>f.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let hi=null;function fl(){return hi||(hi=NS()),hi}const LS=["Sunny","Rain","Frost","Dawn","AmberMoon"];function FS(e){return LS.includes(e)}const rs={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function BS(e){if(!e)return rs;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return {type:FS(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function OS(){let e=rs,t=rs,n=false,r=null;const o={all:new Set,change:new Set};function a(s){const c=BS(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const d={current:e,previous:t};for(const l of o.change)l(d);}}}async function i(){n||(r=await Gx.onChangeNow(s=>{a(s);}),n=true);}return i(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let bi=null;function DS(){return bi||(bi=OS()),bi}let Be=null;function Lp(){return Be||(Be={currentTile:Ye(),myPets:Gn(),gameMap:es(),myInventory:un(),players:pl(),shops:fl(),weather:DS(),myGarden:Rp()},Be)}function Ct(){if(!Be)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Be}function $S(){Be&&(Be.currentTile.destroy(),Be.myPets.destroy(),Be.gameMap.destroy(),Be.myInventory.destroy(),Be.players.destroy(),Be.shops.destroy(),Be.weather.destroy(),Be.myGarden.destroy(),Be=null);}const de={get currentTile(){return Ct().currentTile},get myPets(){return Ct().myPets},get gameMap(){return Ct().gameMap},get myInventory(){return Ct().myInventory},get players(){return Ct().players},get shops(){return Ct().shops},get weather(){return Ct().weather},get myGarden(){return Ct().myGarden}};let Zo=null;const Cr=new Set;function os(){const e=on();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Cr.clear(),Zo=un().subscribeItems(t=>{if(t.added.length>0){const n=on();for(const r of t.added)zS(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Fp(){Zo&&(Zo(),Zo=null),Cr.clear(),console.log("🛑 [AutoFavorite] Stopped");}function GS(e){const t=on();t.enabled=e,t.simple.enabled=e,Ep(t),e?os():Fp();}function zS(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Cr.has(e.id)||e.isFavorited||e.favorited)&&Bp(e,t.simple)){Cr.add(e.id);try{Fa(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),Cr.delete(e.id);}}}function Bp(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function HS(){return Object.keys(Y.get("mutations")??{})}const gl={init(){this.isReady()||os();},isReady(){return bc()},DEFAULT_CONFIG:Ip,STORAGE_KEY:cl,loadConfig:on,saveConfig:dl,updateConfig:Ep,updateSimpleConfig:ul,setFavoriteSpecies:Nw,setFavoriteMutations:Lw,isEnabled:bc,start:os,stop:Fp,setEnabled:GS,shouldFavorite:Bp,getGameMutations:HS},ml=Se.JOURNAL_CHECKER,Op={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function zn(){return we(ml,Op)}function Ha(e){Ae(ml,e);}function Gc(){return zn().enabled}function jS(e){const t=zn();t.autoRefresh=e,Ha(t);}function US(e){const t=zn();t.refreshIntervalMs=e,Ha(t);}let xi=null,zc=null;function Dp(){try{return pl().get().myPlayer?.journal||null}catch{return null}}function WS(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function $p(){const e=Y.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Gp(){const e=Y.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function VS(){return Object.keys(Y.get("mutations")??{})}function zp(e){const n=(Y.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(a=>r.add(a));}),[...r]}function Hp(e){const t=Y.get("plants")??{},n=Object.keys(t),r=$p(),o=e?.produce??{},a=[];let i=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));i+=u.length,a.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=a.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0}}function jp(e){const t=Y.get("pets")??{},n=Object.keys(t),r=Gp(),o=e?.pets??{},a=[];let i=0,s=0,c=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(S=>S.variant)??[],g=p?.abilitiesLogged?.map(S=>S.ability)??[],m=r.filter(S=>!f.includes(S)),b=zp(u),y=b.filter(S=>!g.includes(S));s+=r.length,i+=f.length,d+=b.length,c+=Math.min(g.length,b.length),a.push({species:u,variantsLogged:f,variantsMissing:m,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:y,abilitiesTotal:b.length,abilitiesPercentage:b.length>0?g.length/b.length*100:0,isComplete:m.length===0&&(b.length===0||y.length===0)});}const l=a.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0,abilitiesTotal:d,abilitiesLogged:c,abilitiesPercentage:d>0?c/d*100:0}}async function ja(e=false){await Y.waitForAny();const t=Dp(),n=WS(t);if(!e&&xi&&n===zc)return xi;const r={plants:Hp(t),pets:jp(t),lastUpdated:Date.now()};return xi=r,zc=n,r}async function XS(){const e=await ja();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let kr=null;function as(){const e=zn();e.enabled&&(e.autoRefresh&&!kr&&(kr=setInterval(async()=>{const t=await ja();hl(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function Up(){kr&&(clearInterval(kr),kr=null);}function qS(e){const t=zn();t.enabled=e,Ha(t),e?as():Up();}function hl(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function KS(){const e=await ja();return hl(e),e}const Wp={init(){this.isReady()||as();},isReady(){return Gc()},DEFAULT_CONFIG:Op,STORAGE_KEY:ml,loadConfig:zn,saveConfig:Ha,isEnabled:Gc,setAutoRefresh:jS,setRefreshInterval:US,getMyJournal:Dp,getCropVariants:$p,getPetVariants:Gp,getAllMutations:VS,getPetAbilities:zp,calculateProduceProgress:Hp,calculatePetProgress:jp,aggregateJournalProgress:ja,getMissingSummary:XS,start:as,stop:Up,setEnabled:qS,refresh:KS,dispatchUpdate:hl},bl=Se.BULK_FAVORITE,Vp={enabled:false,position:"top-right"};function no(){return we(bl,Vp)}function Xp(e){Ae(bl,e);}function YS(e){const t=no();t.position=e,Xp(t);}function qp(){return no().enabled}function JS(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function QS(e){const t=un().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!JS(o))continue;const a=n.has(o.id);e&&a||!e&&!a||(await Fa(o.id,e),r++,await ZS(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function ZS(e){return new Promise(t=>setTimeout(t,e))}let Ao=false;const ba={init(){Ao||(Ao=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return Ao},DEFAULT_CONFIG:Vp,STORAGE_KEY:bl,loadConfig:no,saveConfig:Xp,isEnabled:qp,setPosition:YS,bulkFavorite:QS,destroy(){Ao=false;}};class eC{constructor(){R(this,"achievements",new Map);R(this,"data");R(this,"STORAGE_KEY",Se.ACHIEVEMENTS);R(this,"onUnlockCallbacks",[]);R(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return we(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Ae(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;const s=o>=n.target;return !r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let _r=null;function lt(){return _r||(_r=new eC),_r}function tC(){_r&&(_r=null);}let Io=false;const Kp={init(){Io||(lt(),Io=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Io},getManager(){return lt()},register:(...e)=>lt().register(...e),registerMany:(...e)=>lt().registerMany(...e),isUnlocked:(...e)=>lt().isUnlocked(...e),getAll:()=>lt().getAllAchievements(),getUnlocked:()=>lt().getUnlockedAchievements(),getStats:()=>lt().getCompletionStats(),checkAll:()=>lt().checkAllAchievements(),onUnlock:(...e)=>lt().onUnlock(...e),onProgress:(...e)=>lt().onProgress(...e),destroy(){tC(),Io=false;}},nC={enabled:true},Yp=Se.ANTI_AFK,rC=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],oC=25e3,aC=1,iC=1e-5,ce={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function sC(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),ce.listeners.push({type:n,handler:r,target:t});};for(const t of rC)e(document,t),e(window,t);}function lC(){for(const{type:e,handler:t,target:n}of ce.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ce.listeners.length=0;}function cC(){const e=Object.getPrototypeOf(document);ce.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ce.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ce.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function dC(){const e=Object.getPrototypeOf(document);try{ce.savedProps.hidden&&Object.defineProperty(e,"hidden",ce.savedProps.hidden);}catch{}try{ce.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ce.savedProps.visibilityState);}catch{}try{ce.savedProps.hasFocus&&(document.hasFocus=ce.savedProps.hasFocus);}catch{}}function xa(){ce.audioCtx&&ce.audioCtx.state!=="running"&&ce.audioCtx.resume?.().catch(()=>{});}function uC(){try{const e=window.AudioContext||window.webkitAudioContext;ce.audioCtx=new e({latencyHint:"interactive"}),ce.gainNode=ce.audioCtx.createGain(),ce.gainNode.gain.value=iC,ce.oscillator=ce.audioCtx.createOscillator(),ce.oscillator.frequency.value=aC,ce.oscillator.connect(ce.gainNode).connect(ce.audioCtx.destination),ce.oscillator.start(),document.addEventListener("visibilitychange",xa,{capture:!0}),window.addEventListener("focus",xa,{capture:!0});}catch{Jp();}}function Jp(){try{ce.oscillator?.stop();}catch{}try{ce.oscillator?.disconnect(),ce.gainNode?.disconnect();}catch{}try{ce.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",xa,{capture:true}),window.removeEventListener("focus",xa,{capture:true}),ce.oscillator=null,ce.gainNode=null,ce.audioCtx=null;}function pC(){const e=document.querySelector("canvas")||document.body||document.documentElement;ce.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},oC);}function fC(){ce.heartbeatInterval!==null&&(clearInterval(ce.heartbeatInterval),ce.heartbeatInterval=null);}function yi(){cC(),sC(),uC(),pC();}function vi(){fC(),Jp(),lC(),dC();}let Eo=false,Qe=false;function mn(){return we(Yp,nC)}function wi(e){Ae(Yp,e);}const tn={init(){if(Eo)return;const e=mn();Eo=true,e.enabled?(yi(),Qe=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Eo},isRunning(){return Qe},isEnabled(){return mn().enabled},enable(){const e=mn();e.enabled=true,wi(e),Qe||(yi(),Qe=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=mn();e.enabled=false,wi(e),Qe&&(vi(),Qe=false,console.log("[MGAntiAfk] Disabled"));},toggle(){tn.isEnabled()?tn.disable():tn.enable();},getConfig(){return mn()},updateConfig(e){const n={...mn(),...e};wi(n),n.enabled&&!Qe?(yi(),Qe=true):!n.enabled&&Qe&&(vi(),Qe=false);},destroy(){Qe&&(vi(),Qe=false),Eo=false,console.log("[MGAntiAfk] Destroyed");}},Qp=Se.PET_TEAM,gC={enabled:false,teams:[],activeTeamId:null},xl=3,Hc=50,Oe="";function De(){return we(Qp,gC)}function pn(e){Ae(Qp,e);}function mC(e){const n={...De(),...e};return pn(n),n}function hC(){return De().enabled}function bC(e){mC({enabled:e});}function xC(){return crypto.randomUUID()}function is(){return Date.now()}function Zp(e=[]){const t=[...e];for(;t.length<xl;)t.push(Oe);return [t[0]||Oe,t[1]||Oe,t[2]||Oe]}function ef(e,t){const n=De(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function tf(e,t){const n=De();if(!e.some(a=>a!==Oe))return  true;const o=[...e].sort().join(",");return !n.teams.some(a=>a.id===t?false:[...a.petIds].sort().join(",")===o)}function nf(e){const n=Gn().get(),r=new Set(n.all.map(a=>a.id)),o=De();for(const a of o.teams)for(const i of a.petIds)i!==Oe&&r.add(i);for(const a of e)if(a!==Oe&&!r.has(a))return  false;return  true}function rf(e){const n=Gn().get(),r=new Map(n.all.map(a=>[a.id,a])),o=[];for(const a of e.petIds){if(a===Oe)continue;const i=r.get(a);i&&o.push(i);}return o}function yC(e){return e.petIds.every(t=>t!==Oe)}function vC(e){const t=[];for(let n=0;n<xl;n++)e.petIds[n]===Oe&&t.push(n);return t}function wC(e){return e.petIds.filter(t=>t!==Oe).length}function SC(e){return e.petIds.every(t=>t===Oe)}function CC(e,t){return e.petIds.includes(t)}function kC(e,t){return e.petIds.indexOf(t)}function _C(e,t=[]){const n=De();if(n.teams.length>=Hc)throw new Error(`Maximum number of teams (${Hc}) reached`);if(!ef(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=Zp(t);if(!nf(o))throw new Error("One or more pet IDs do not exist");if(!tf(o))throw new Error("A team with this exact composition already exists");const a={id:xC(),name:r,petIds:o,createdAt:is(),updatedAt:is()};return n.teams.push(a),pn(n),a}function of(e,t){const n=De(),r=n.teams.findIndex(i=>i.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const i=t.name.trim();if(!i)throw new Error("Team name cannot be empty");if(!ef(i,e))throw new Error(`Team name "${i}" already exists`);t.name=i;}if(t.petIds!==void 0){const i=Zp(t.petIds);if(!nf(i))throw new Error("One or more pet IDs do not exist");if(!tf(i,e))throw new Error("A team with this exact composition already exists");t.petIds=i;}const a={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:is()};return n.teams[r]=a,pn(n),a}function TC(e){const t=De(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(pn(t),true)}function PC(e){return De().teams.find(n=>n.id===e)??null}function AC(){return [...De().teams]}function IC(e){const t=De(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function EC(e){const t=De(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),pn(t),true}function MC(e,t){try{return of(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function RC(){const n=Gn().get().byLocation.active.map(o=>o.id).sort(),r=De();for(const o of r.teams){const a=o.petIds.filter(i=>i!=="").sort();if(a.length===n.length&&a.every((i,s)=>i===n[s]))return o.id}return null}function af(){const e=RC(),t=De();return e!==t.activeTeamId&&(t.activeTeamId=e,pn(t)),e}function sf(e){const t=De();t.activeTeamId=e,pn(t);}function NC(e){return af()===e}function LC(e){const t=Gn(),n=un(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const a=r.byLocation.active,i=e.petIds.filter(l=>l!==Oe).sort(),s=a.map(l=>l.id).sort();if(JSON.stringify(i)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const c=r.hutch,d=c.hasHutch?c.maxItems-c.currentItems:0;FC(e.petIds,d,r),sf(e.id),console.log("[PetTeam] Team activated successfully");}function FC(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<xl;a++){const i=e[a],s=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${s?.id.slice(0,8)??"empty"}, target=${i.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===i){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(i===Oe&&s){const c=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${c}`),BC(s.id,c),c&&o--;continue}if(!s&&i!==Oe){const d=n.all.find(l=>l.id===i)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${d}`),d&&o++,OC(i,n);continue}if(s&&i!==Oe){const d=n.all.find(u=>u.id===i)?.location==="hutch";d&&o++;const l=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${d}, storeInHutch=${l}`),DC(s.id,i,n,l),l&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function BC(e,t){vp(e),t&&Js(e);}function OC(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&Qs(e),xp(e);}function DC(e,t,n,r){const o=n.all.find(a=>a.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&Qs(t),yp(e,t),r&&Js(e);}let Mo=false;const ie={init(){if(Mo)return;if(!De().enabled){console.log("[PetTeam] Feature disabled");return}Mo=true,console.log("[PetTeam] Feature initialized");},destroy(){Mo&&(Mo=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:hC,setEnabled:bC,createTeam:_C,updateTeam:of,deleteTeam:TC,renameTeam:MC,getTeam:PC,getAllTeams:AC,getTeamByName:IC,reorderTeams:EC,getPetsForTeam:rf,isTeamFull:yC,getEmptySlots:vC,getFilledSlotCount:wC,isTeamEmpty:SC,isPetInTeam:CC,getPetSlotIndex:kC,getActiveTeamId:af,setActiveTeamId:sf,isActiveTeam:NC,activateTeam:LC},$C=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],lf=Se.XP_TRACKER,GC={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},_n="XP Tracker",Tn="[XpTracker]";function Hn(){return we(lf,GC)}function cf(e){Ae(lf,e);}function df(e){const n={...Hn(),...e};return cf(n),n}function uf(){return Hn().enabled}function zC(e){df({enabled:e});}function yl(e){return $C.includes(e)}function HC(e){const t=Y.get("abilities");if(!t)return null;const n=t[e];return !n||!yl(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function pf(e){return e.filter(yl)}function ff(e){return e.some(yl)}function jC(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function gf(e,t,n,r=100){const o=HC(e);if(!o)return null;const a=jC(e),i=o.requiredWeather,s=i===null||n===i,c=t/r,d=c*c,l=o.baseProbability,u=o.bonusXp,p=l,f=Math.floor(u*d),g=p/100*60,m=s?Math.floor(g*f):0;return {abilityId:e,abilityName:o.name,tier:a,baseChancePerMinute:l,actualChancePerMinute:p,baseXpPerProc:u,actualXpPerProc:f,expectedProcsPerHour:g,expectedXpPerHour:m,requiredWeather:i,isActive:s}}function mf(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=pf(r.abilities);for(const a of o){const i=gf(a,r.strength,t,r.maxStrength||100);i&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:i}),i.isActive&&(n.totalBonusXpPerHour+=i.expectedXpPerHour,n.totalProcsPerHour+=i.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function hf(e,t,n,r=100){const o=pf(e);return o.length===0?null:gf(o[0],t,n,r)}function jc(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function UC(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function WC(e,t){return e.species.localeCompare(t.species)}function VC(e,t){return t.currentStrength-e.currentStrength}function XC(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function qC(e,t){return e.name.localeCompare(t.name)}function KC(e){switch(e){case "closestToMax":return jc;case "furthestFromMax":return UC;case "species":return WC;case "strength":return VC;case "location":return XC;case "name":return qC;default:return jc}}function bf(e,t){const n=KC(t);return [...e].sort(n)}function YC(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function JC(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function xf(e,t){let n=e;return n=YC(n,t.filterSpecies),n=JC(n,t.filterHasXpBoost),n=bf(n,t.sortBy),n}function Kn(e){const t=ie.getTeam(e);if(!t)return null;const n=yf(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:Ee,bonusXpPerHour:0,totalXpPerHour:Ee,activeBoosterCount:0,totalProcsPerHour:0}};const r=de.weather.get(),o=r.isActive?r.type:null,a=n.filter(l=>!l.isMature||ff(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),i=mf(a,o),s=[],c=QC(n,i.totalBonusXpPerHour);for(const l of n){const u=ss(l,o,i.totalBonusXpPerHour,c);s.push(u);}const d={baseXpPerHour:Ee,bonusXpPerHour:i.totalBonusXpPerHour,totalXpPerHour:Ee+i.totalBonusXpPerHour,activeBoosterCount:i.activeBoosterCount,totalProcsPerHour:i.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:d}}function yf(e){const t=de.myPets.get(),n=[];for(const r of e.petIds){if(!r)continue;const o=t.all.find(a=>a.id===r);o&&n.push(o);}return n}function QC(e,t){let n=0;for(const r of e){const o=Qr(r.petSpecies,r.targetScale);if(Zr(r.petSpecies,r.xp,o)>=o)continue;const i=r.hunger>0?Ee+t:0,s=za(r.petSpecies,r.xp,o,i>0?i:Ee);n=Math.max(n,s);}return n}function ss(e,t,n,r){const o=Qr(e.petSpecies,e.targetScale),a=Zr(e.petSpecies,e.xp,o),i=a>=o,s=e.hunger<=0,d=s?0:(s?0:Ee)+n,l=hf(e.abilities,a,t),u=i?null:rl(e.petSpecies,e.xp,a,o,d>0?d:Ee),p=za(e.petSpecies,e.xp,o,d>0?d:Ee),f=u!==null?il(e.petSpecies,e.hunger,u):null,g=Dr(e.petSpecies,e.hunger,p),m=i&&l&&r>0?sl(true,true,e.petSpecies,e.hunger,0,r):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:a,maxStrength:o,isMaxStrength:i,xpPerHour:d,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:l,supportingFeeds:m,mutations:e.mutations,targetScale:e.targetScale}}function Uc(e){const t=ie.getTeam(e);if(!t)return 0;const n=yf(t);if(n.length===0)return 0;const r=n.map(o=>{const a=Qr(o.petSpecies,o.targetScale);return Zr(o.petSpecies,o.xp,a)/a*100});return r.reduce((o,a)=>o+a,0)/r.length}function Wc(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let Bn=false,ea=null,Ua=[],vl=null;function ZC(e,t,n){const r=Qr(e.petSpecies,e.targetScale),o=Zr(e.petSpecies,e.xp,r),a=o>=r,i=e.hunger<=0,s=i?0:Ee,c=hf(e.abilities,o,t);c?.isActive&&c.expectedXpPerHour;const d=e.location==="active"&&!i?s+n:0,l=rl(e.petSpecies,e.xp,o,r,d>0?d:Ee),u=za(e.petSpecies,e.xp,r,d>0?d:Ee),p=il(e.petSpecies,e.hunger,l),f=Dr(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:i,currentStrength:o,maxStrength:r,isMaxStrength:a,hoursToNextStrength:l,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:d,xpBoostStats:c,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function vf(){const e=de.myPets.get(),t=de.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(c=>!c.isMature||ff(c.abilities)).filter(c=>c.hunger>0).map(c=>({petId:c.id,petName:c.name??"",abilities:c.abilities,strength:c.currentStrength})),a=mf(o,n);vl=a;const i=[];for(const c of e.all){const d=ZC({id:c.id,petSpecies:c.petSpecies,name:c.name??"",xp:c.xp,hunger:c.hunger,targetScale:c.targetScale,abilities:c.abilities,mutations:c.mutations,location:c.location},n,a.totalBonusXpPerHour);i.push(d);}const s=Math.max(0,...i.map(c=>c.hoursToMaxStrength));for(const c of i)c.isMaxStrength&&c.xpBoostStats&&(c.feedsToMaxStrength=sl(true,true,c.species,c.hunger,0,s));return i}function wf(){if(Bn)return;if(!Hn().enabled){console.log(`${Tn} ${_n} disabled`);return}console.log(`${Tn} Initializing ${_n}...`),Y.isReady()&&(Ua=vf()),Bn=true,console.log(`${Tn} ${_n} initialized`);}function wl(){return Bn&&Y.isReady()}function Sl(){return wl()?Ua:[]}function e1(){return Sl().filter(e=>e.location==="active")}function t1(){return vl}function Cl(){wl()&&(Ua=vf());}function n1(e){kl();const t=Hn(),n=e??t.updateIntervalMs;ea=setInterval(()=>{uf()&&Cl();},n);}function kl(){ea&&(clearInterval(ea),ea=null);}function Sf(){Bn&&(kl(),Bn=false,Ua=[],vl=null,console.log(`${Tn} ${_n} destroyed`));}function r1(){const e=Hn();return xf(Sl(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function o1(e){zC(e),e?(Bn=false,wf(),Y.isReady()&&Cl(),console.log(`${Tn} ${_n} enabled`)):(Sf(),console.log(`${Tn} ${_n} disabled`));}const ya={init:wf,isReady:wl,destroy:Sf,loadConfig:Hn,saveConfig:cf,updateConfig:df,isEnabled:uf,setEnabled:o1,getAllPetsProgress:Sl,getActivePetsProgress:e1,getCombinedBoostStats:t1,getFilteredPets:r1,refresh:Cl,startAutoUpdate:n1,stopAutoUpdate:kl,sortPets:bf,filterAndSortPets:xf},$r={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},Gr={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys($r),...Object.keys(Gr)];function _l(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in $r){const o=$r[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function Tl(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in Gr){const o=Gr[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function zr(e){let t=0,n=0;for(const r of e){const o=r.procRate*60;t+=o,n+=o*r.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Pn(e){return e.some(t=>t.abilities.some(n=>n in $r))}function An(e){return e.some(t=>t.abilities.some(n=>n in Gr))}let Tr=null,Dt=0;function Cf(){const t=Ye().get().plant;if(!t){Dt=0;return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;if(!n){Dt=0;return}Dt=pt(n.species,n.targetScale,n.mutations||[]),console.log(`[CropValueIndicator] Updated crop value: ${Dt} coins`);}function a1(e){const{current:t}=e;if(Cf(),!t){console.log("[CropValueIndicator] No plant on current tile");return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n?console.log(`[CropValueIndicator] 💰 Crop Price: ${Dt} coins`,{species:t.species,slot:{index:t.currentSlotIndex,scale:n.targetScale,mutations:n.mutations||[]},plantInfo:{totalSlots:t.slots.length,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex}}):console.log("[CropValueIndicator] Plant Info:",{species:t.species,currentSlotIndex:t.currentSlotIndex,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex,totalSlots:t.slots.length,currentSlot:n,cropValue:Dt>0?`${Dt} coins`:"N/A"});}function i1(){Tr&&(console.warn("[CropValueIndicator] Already monitoring, cleaning up previous subscription"),kf()),console.log("[CropValueIndicator] Starting plant info monitoring..."),Cf(),Tr=Ye().subscribePlantInfo(a1,{immediate:true}),console.log("[CropValueIndicator] Monitoring started");}function kf(){Tr&&(console.log("[CropValueIndicator] Stopping monitoring..."),Tr(),Tr=null,Dt=0,console.log("[CropValueIndicator] Monitoring stopped"));}function Wa(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function _f(e,t){e.add(()=>t.disconnect());}const ls="css-qnqsp4",cs="css-v439q6";let In=Wa(),ds=false,Yn=false,ta=null,us=null,Yt=null;const s1=`
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
`;function l1(){if(ds)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=s1,document.head.appendChild(e),In.add(()=>e.remove()),ds=true,console.log("[CropValueIndicator.render] Styles injected");}function c1(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const r=document.createElement("canvas");r.width=20,r.height=20,n.appendChild(r);const o=document.createElement("div");o.className="gemini-qol-cropPrice-text",o.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(o);try{const a=H.toCanvas("ui","Coin");if(a&&r.parentElement){const i=r.getContext("2d");if(i){const s=Math.min(r.width/a.width,r.height/a.height),c=a.width*s,d=a.height*s,l=(r.width-c)/2,u=(r.height-d)/2;i.drawImage(a,l,u,c,d);}}}catch(a){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",a);}return t}function d1(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const r of n){const o=r.textContent?.trim();if(!o)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(o)&&t.push(o);}return t}function u1(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const r=n.textContent?.trim();if(!r)continue;const o=r.match(/^([\d.]+)\s*kg$/i);if(o)return parseFloat(o[1])}return 1}function p1(){const e=[],t=document.querySelectorAll(`.${ls}`);for(const r of t)r.offsetParent&&(r.closest("button.chakra-button")||e.push({element:r}));const n=document.querySelectorAll(`.${cs}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelectorAll(":scope > .McFlex > .McFlex");if(o.length>0){const a=o[o.length-1];a.querySelector("p.chakra-text")&&e.push({element:a});}}return e}function f1(){const t=Ye().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?pt(n.species,n.targetScale,n.mutations||[]):0}function g1(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(".gemini-qol-cropPrice-text");o&&(o.textContent=e>0?e.toLocaleString():"");}console.log("[CropValueIndicator.render] 🔄 Updated all prices:",{species:t.species,scale:t.targetScale,mutations:t.mutations||[],price:e,count:n.length});}function m1(){Yt!==null&&cancelAnimationFrame(Yt),Yt=requestAnimationFrame(()=>{Yt=null;const e=f1();if(e===us)return;us=e;const n=Ye().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&g1(e,r);});}function Jn(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t){console.log("[CropValueIndicator.render] No name element found in tooltip");return}const n=t.closest(".McFlex");if(!n){console.log("[CropValueIndicator.render] No McFlex container found");return}const o=Ye().get().plant;let a=0;if(o&&o.currentSlotIndex!==null){const s=o.slots[o.currentSlotIndex];s&&(a=pt(s.species,s.targetScale,s.mutations||[]));}if(a===0){const s=t.textContent?.trim();if(s){const c=u1(n),d=d1(n);a=pt(s,c,d);}}const i=c1(a);n.appendChild(i),In.add(()=>i.remove()),console.log("[CropValueIndicator.render] ✅ Injected price:",{price:a});}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function h1(){const e=p1();for(const n of e)Jn(n);ta=Ye().subscribePlantInfo(()=>{m1();});const t=new MutationObserver(n=>{for(const r of n)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.classList.contains(ls)&&(o.closest("button.chakra-button")||Jn({element:o})),o.querySelectorAll(`.${ls}`).forEach(s=>{s.closest("button.chakra-button")||Jn({element:s});}),o.classList.contains(cs)&&!o.closest("button.chakra-button")){const s=o.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const c=s[s.length-1];c.querySelector("p.chakra-text")&&!c.querySelector(".gemini-qol-cropPrice")&&Jn({element:c});}}o.querySelectorAll(`.${cs}`).forEach(s=>{if(!s.closest("button.chakra-button")){const c=s.querySelectorAll(":scope > .McFlex > .McFlex");if(c.length>0){const d=c[c.length-1];d.querySelector("p.chakra-text")&&!d.querySelector(".gemini-qol-cropPrice")&&Jn({element:d});}}});}});});t.observe(document.body,{childList:true,subtree:true}),_f(In,t),console.log("[CropValueIndicator.render] Started observing crops");}const b1={init(){if(Yn){console.log("[CropValueIndicator.render] Already initialized");return}Yn=true,l1(),h1(),console.log("✅ [CropValueIndicator.render] Initialized");},destroy(){Yn&&(Yn=false,Yt!==null&&(cancelAnimationFrame(Yt),Yt=null),ta&&(ta(),ta=null),In.run(),In.clear(),In=Wa(),ds=false,us=null,console.log("🛑 [CropValueIndicator.render] Destroyed"));},isEnabled(){return Yn}},Tf=Se.CROP_VALUE_INDICATOR,x1={enabled:false};function Pl(){return we(Tf,x1)}function y1(e){Ae(Tf,e);}let Hr=false;function Pf(){if(Hr){console.log("[CropValueIndicator] Already initialized");return}if(!Pl().enabled){console.log("[CropValueIndicator] Disabled");return}Hr=true,console.log("[CropValueIndicator] Initializing..."),i1(),console.log("[CropValueIndicator] Initialized successfully");}function Af(){Hr&&(console.log("[CropValueIndicator] Destroying..."),kf(),Hr=false,console.log("[CropValueIndicator] Destroyed"));}function v1(){return Hr}function w1(){return Pl().enabled}function S1(e){const t=Pl();if(t.enabled===e){console.log(`[CropValueIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,y1(t),e?Pf():Af(),console.log(`[CropValueIndicator] ${e?"Enabled":"Disabled"}`);}const Pr={init:Pf,destroy:Af,isReady:v1,isEnabled:w1,setEnabled:S1,render:b1},jr="css-qnqsp4",Al="css-1cdcuw7",Il='[role="tooltip"]';let na=Wa(),Qn=false,ra=null,ps=null,Jt=null;function C1(){const e=[],t=document.querySelectorAll(`.${jr}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const r=n.querySelector(`.${Al}`);r&&e.push({element:n,weightElement:r});}return e}function k1(){const t=Ye().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?tl(n.species,n.targetScale):0}function _1(e,t){const n=document.querySelectorAll(`.${jr}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(`.${Al}`);if(o){const a=o.querySelector("svg"),i=`${e}%`;o.textContent=i,a&&o.appendChild(a);}}va(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function T1(){Jt!==null&&cancelAnimationFrame(Jt),Jt=requestAnimationFrame(()=>{Jt=null;const e=k1();if(e===ps)return;ps=e;const n=Ye().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&_1(e,r);});}function If(e,t){const n=Y.get("plants");if(!n)return "";const r=n[e];return r?.crop?.baseWeight?`${(r.crop.baseWeight*t).toFixed(2)} kg`:""}function va(){const e=document.querySelectorAll(Il),n=Ye().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=If(r.species,r.targetScale);for(const a of e){if(!a.offsetParent)continue;const i=a.textContent?.trim();i&&i.startsWith("Size:")&&o&&(a.textContent=o);}}function Si(){const e=C1();for(const t of e)if(t.weightElement)try{const r=Ye().get().plant;if(r&&r.currentSlotIndex!==null){const o=r.slots[r.currentSlotIndex];if(o){const a=tl(o.species,o.targetScale),i=t.weightElement.querySelector("svg");t.weightElement.textContent=`${a}%`,i&&t.weightElement.appendChild(i);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}va();}function P1(){const e=document.querySelectorAll(`.${jr}`),n=Ye().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=If(r.species,r.targetScale);for(const i of e){if(!i.offsetParent||i.closest("button.chakra-button"))continue;const s=i.querySelector(`.${Al}`);if(s){const c=s.querySelector("svg");s.textContent=o,c&&s.appendChild(c);}}const a=document.querySelectorAll(Il);for(const i of a){if(!i.offsetParent)continue;const s=i.textContent?.trim();s&&!s.includes("kg")&&(i.textContent=o);}console.log("[CropSizeIndicator.render] Restored crop weights");}function A1(){Si(),ra=Ye().subscribePlantInfo(()=>{T1();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.hasAttribute("role")&&r.getAttribute("role")==="tooltip"){const i=r.textContent?.trim();i&&i.startsWith("Size:")&&va();}r.classList.contains(jr)&&(r.closest("button.chakra-button")||Si()),r.querySelectorAll(`.${jr}`).length>0&&Si(),r.querySelectorAll(Il).forEach(i=>{const s=i.textContent?.trim();s&&s.startsWith("Size:")&&va();});}});});e.observe(document.body,{childList:true,subtree:true}),_f(na,e),console.log("[CropSizeIndicator.render] Started observing crops");}const El={init(){if(Qn){console.log("[CropSizeIndicator.render] Already initialized");return}Qn=true,A1(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){Qn&&(Qn=false,P1(),Jt!==null&&(cancelAnimationFrame(Jt),Jt=null),ra&&(ra(),ra=null),na.run(),na.clear(),na=Wa(),ps=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return Qn}},Ef=Se.CROP_SIZE_INDICATOR,I1={enabled:false};function Ml(){return we(Ef,I1)}function E1(e){Ae(Ef,e);}let Ur=false;function Mf(){if(Ur){console.log("[CropSizeIndicator] Already initialized");return}if(!Ml().enabled){console.log("[CropSizeIndicator] Disabled");return}Ur=true,console.log("[CropSizeIndicator] Initializing..."),El.init(),console.log("[CropSizeIndicator] Initialized successfully");}function Rf(){Ur&&(console.log("[CropSizeIndicator] Destroying..."),El.destroy(),Ur=false,console.log("[CropSizeIndicator] Destroyed"));}function M1(){return Ur}function R1(){return Ml().enabled}function N1(e){const t=Ml();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,E1(t),e?Mf():Rf(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const Ar={init:Mf,destroy:Rf,isReady:M1,isEnabled:R1,setEnabled:N1,render:El},Nf=Se.SHOP_NOTIFIER,Lf={seed:[],tool:[],egg:[],decor:[]},L1={enabled:false,trackedItems:Lf},F1=["seed","tool","egg","decor"];function Ff(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function ro(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function jn(){const e=we(Nf,L1);return {enabled:e?.enabled??false,trackedItems:Ff(e?.trackedItems)}}function Va(e){Ae(Nf,{enabled:e.enabled,trackedItems:ro(e.trackedItems)});}function B1(e){const n={...jn(),...e};return e.trackedItems&&(n.trackedItems=Ff(e.trackedItems)),Va(n),n}function Rl(){return jn().enabled}function O1(e){B1({enabled:e});}function Bf(){return ro(jn().trackedItems)}function D1(){const e=Bf(),t=[];for(const n of F1)for(const r of e[n])t.push({shopType:n,itemId:r});return t}function $1(e,t){const n=jn(),r=ro(n.trackedItems),o=r[e];o.includes(t)||(o.push(t),Va({...n,trackedItems:r}));}function G1(e,t){const n=jn(),r=ro(n.trackedItems),o=r[e],a=o.filter(i=>i!==t);a.length!==o.length&&(r[e]=a,Va({...n,trackedItems:r}));}function z1(){const e=jn();Va({...e,trackedItems:ro(Lf)});}let wa=false;const fs=[];function H1(e,t){const n=Bf()[e];if(!n.length)return [];const r=new Set(n);return t.items.filter(o=>r.has(o.id)&&o.isAvailable).map(o=>({itemId:o.id,remaining:o.remaining}))}function Ro(e,t){const n=H1(e,t.shop);n.length&&console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});}function j1(){if(wa)return;wa=true;const e=fl();fs.push(e.subscribeSeedRestock(t=>Ro("seed",t)),e.subscribeToolRestock(t=>Ro("tool",t)),e.subscribeEggRestock(t=>Ro("egg",t)),e.subscribeDecorRestock(t=>Ro("decor",t)));}function U1(){if(wa){wa=false;for(const e of fs)e();fs.length=0;}}let Wr=false;function Of(){if(Wr){console.log("[ShopNotifier] Already initialized");return}if(!Rl()){console.log("[ShopNotifier] Disabled");return}Wr=true,j1(),console.log("[ShopNotifier] Initialized");}function Df(){Wr&&(U1(),Wr=false,console.log("[ShopNotifier] Destroyed"));}function W1(){return Wr}function V1(){return Rl()}function X1(e){if(Rl()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}O1(e),e?Of():Df(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const an={init:Of,destroy:Df,isReady:W1,isEnabled:V1,setEnabled:X1,addTrackedItem:$1,removeTrackedItem:G1,getTrackedItems:D1,resetTrackedItems:z1};class $f{constructor(){R(this,"stats");R(this,"STORAGE_KEY",Se.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return we(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Ae(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let En=null;function q1(){return En||(En=new $f),En}function K1(){En&&(En.endSession(),En=null);}function Gf(e){const t=Oa(e.xp),n=Da(e.petSpecies,e.targetScale),r=$a(e.petSpecies,e.xp,n),o=Ga(e.petSpecies,t),a=kp(e.petSpecies),i=fw(r,n,a),s=gw(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function zf(e){return {...e,strength:Gf(e)}}function Hf(e){return e.map(zf)}function Y1(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Hf(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,a=t.length-o,i=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}const J1=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Gf,enrichPetWithStrength:zf,enrichPetsWithStrength:Hf,getPetStrengthStats:Y1},Symbol.toStringTag,{value:"Module"}));class jf{constructor(){R(this,"logs",[]);R(this,"maxLogs",1e3);R(this,"unsubscribe",null);R(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=de.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(const a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp);}for(const a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(const i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp);}for(const i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return {totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Qt=null;function Q1(){return Qt||(Qt=new jf,Qt.init()),Qt}function Z1(){Qt&&(Qt.destroy(),Qt=null);}const Uf={StatsTracker:$f,getStatsTracker:q1,destroyStatsTracker:K1},Wf={AbilityLogger:jf,getAbilityLogger:Q1,destroyAbilityLogger:Z1,...J1},ek=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:Kp,MGAntiAfk:tn,MGAutoFavorite:gl,MGBulkFavorite:ba,MGCropSizeIndicator:Ar,MGCropValueIndicator:Pr,MGJournalChecker:Wp,MGPetTeam:ie,MGPets:Wf,MGShopNotifier:an,MGTracker:Uf,MGXPTracker:ya},Symbol.toStringTag,{value:"Module"})),ct=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],tk={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function hn(e){return e?tk[e]??0:0}class nk extends sn{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});R(this,"allPlants",[]);R(this,"allPets",[]);R(this,"sectionElement",null);}async build(n){await Rw();const r=n.getRootNode();ve(r,Ap,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await Y.waitForAny(3e3).catch(()=>{}),await Promise.all([Y.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),Y.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=Y.get("plants")||{},r=Y.get("pets")||{};this.allPlants=Object.keys(n).sort((o,a)=>{const i=n[o]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,c=hn(i)-hn(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,a)=>{const i=r[o]?.rarity||null,s=r[a]?.rarity||null,c=hn(i)-hn(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(H.isReady())return;const n=1e4,r=100;let o=0;return new Promise(a=>{const i=()=>{H.isReady()||o>=n?a():(o+=r,setTimeout(i,r));};i();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=x("div",{className:"kv"}),r=_d({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Mr({checked:st().get().enabled,onChange:async a=>{const i=st(),s=i.get();await i.set({...s,enabled:a}),await this.saveConfig();}});return n.append(r.root,o.root),Xe({title:"Auto-Favorite",padding:"lg"},n,x("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=x("div",{className:"u-col"}),r=x("div",{className:"mut-row"});r.appendChild(this.createMutationButton(ct[0])),r.appendChild(this.createMutationButton(ct[1])),n.appendChild(r);const o=x("div",{className:"mut-row"});o.appendChild(this.createMutationButton(ct[2])),o.appendChild(this.createMutationButton(ct[3])),o.appendChild(this.createMutationButton(ct[4])),n.appendChild(o);const a=x("div",{className:"mut-row"});a.appendChild(this.createMutationButton(ct[5])),a.appendChild(this.createMutationButton(ct[6])),n.appendChild(a);const i=x("div",{className:"mut-row"});return i.appendChild(this.createMutationButton(ct[7])),i.appendChild(this.createMutationButton(ct[8])),n.appendChild(i),Xe({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${st().get().favoriteMutations.length} / ${ct.length} active`))}createMutationButton(n){let r=st().get().favoriteMutations.includes(n.id);const a=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&a.push("active");const i=x("div",{className:a.join(" ")}),s=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(H.isReady()){const l=H.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});l.style.width="28px",l.style.height="28px",l.style.objectFit="contain",s.appendChild(l);}}catch{}const c=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=x("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},c);if(i.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const l=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(H.isReady()){const u=H.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",l.appendChild(u);}}catch{}i.append(l);}else {const l=x("div",{style:"width: 28px; flex-shrink: 0;"});i.append(l);}return i.addEventListener("click",async l=>{l.stopPropagation();const u=st(),p=u.get();if(r){const g=p.favoriteMutations.filter(m=>m!==n.id);await u.set({...p,favoriteMutations:g}),r=false,i.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),r=true,i.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${st().get().favoriteMutations.length} / ${ct.length} active`);}),i}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:st().get().favoriteProduceList,onUpdate:async n=>{const r=st(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:st().get().favoritePetsList,onUpdate:async n=>{const r=st(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:a,selected:i,onUpdate:s}=n;let c=new Set(i),d=o;const l=x("div",{style:"margin-bottom: 8px;"}),u=Ts({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:h=>{const w=h.trim().toLowerCase();w?d=o.filter(_=>_.toLowerCase().includes(w)):d=o,C.setData(m());}});l.appendChild(u.root);const p=x("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=qt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const h=m().map(w=>w.id);C.setSelection(h);}}),g=qt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{C.clearSelection();}});p.append(f,g);const m=()=>d.map(h=>({id:h,name:h,rarity:this.getItemRarity(h,a),selected:c.has(h)})),b=h=>{if(!h){const _=x("span",{style:"opacity:0.5;"});return _.textContent="—",_}return eo({variant:"rarity",rarity:h,size:"sm"}).root},y=h=>{const w=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(H.isReady()){let _=a,k=h;a==="plant"&&(["Bamboo","Cactus"].includes(h)&&(_="tallplant"),h==="DawnCelestial"&&(k="DawnCelestialCrop"),h==="MoonCelestial"&&(k="MoonCelestialCrop"),h==="OrangeTulip"&&(k="Tulip"));const P=H.toCanvas(_,k,{scale:.5});P.style.width="28px",P.style.height="28px",P.style.objectFit="contain",w.appendChild(P);}}catch{}return w},C=_s({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(h,w)=>h.name.localeCompare(w.name,void 0,{numeric:true,sensitivity:"base"}),render:h=>{const w=x("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),_=y(h.id),k=x("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},h.name);return w.append(_,k),w}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(h,w)=>hn(h.rarity)-hn(w.rarity),render:h=>b(h.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:h=>h.id,onSelectionChange:h=>{c.clear(),h.forEach(w=>c.add(w)),s(Array.from(c)),T();}}),v=x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),T=()=>{v.textContent=`${c.size} / ${o.length} selected`;};return T(),Xe({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,C.root,v)}getItemRarity(n,r){try{if(r==="pet")return (Y.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=Y.get("plants")||{},a=o[n];if(a?.seed?.rarity)return a.seed.rarity;const i=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=st().get();try{const{updateSimpleConfig:r}=gl;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}const rk=`
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
`,ok=`
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
`;function ak(e){const{count:t,expanded:n=false,onClick:r}=e,o=x("div",{className:"see-more"}),a=x("span",{className:"see-more-link"},Ci(t,n));r&&a.addEventListener("click",r),o.appendChild(a);const i=o;return i.setCount=s=>{a.textContent=Ci(s,n);},i.setExpanded=s=>{a.textContent=Ci(t,s);},i}function Ci(e,t){return t?"− Show less":`+ and ${e} more...`}const ik=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",sk=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",lk={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Vc(e){return e?lk[e]??0:0}function Xc(e,t){try{if(t==="pets")return (Y.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (Y.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function ck({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const a=x("div",{className:"journal-content"}),i=x("div",{className:"journal-header"},"Garden Journal");if(a.appendChild(i),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=x("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),l=x("span",{className:"percentage"},`Collected ${d}%`),u=x("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(u),a.appendChild(c);}return t==="all"?(a.appendChild(No("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),a.appendChild(No("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?a.appendChild(No("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):a.appendChild(No("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),a}function No(e,t,n,r,o,a,i=false){const s=x("div",{style:"display: flex; flex-direction: column;"}),c=x("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=x("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=x("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(H.isReady()){const b=n==="plants"?"plant":"pet",y=n==="plants"?"Carrot":"CommonEgg";if(H.has(b,y)){const S=H.toCanvas(b,y,{scale:.3});S.style.maxWidth="20px",S.style.maxHeight="20px",S.style.display="block",l.appendChild(S);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=x("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(l,f),s.appendChild(d),i){const b=x("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),y=Math.floor(t.variantsLogged/t.variantsTotal*100),S=x("span",{className:"percentage"},`Collected ${y}%`),C=x("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);b.appendChild(S),b.appendChild(C),s.appendChild(b);}const g=[...t.speciesDetails].sort((b,y)=>{const S=Xc(b.species,n),C=Xc(y.species,n),v=Vc(S)-Vc(C);return v!==0?v:b.species.localeCompare(y.species,void 0,{numeric:true,sensitivity:"base"})}),m=r?g:g.slice(0,5);for(const b of m)c.appendChild(dk(b,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const b=ak({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{a();}});s.appendChild(b);}else s.appendChild(x("div",{style:"height: 28px;"}));return s}function dk(e,t,n){const r=x("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=x("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",g=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(g="DawnCelestialCrop"),e.species==="MoonCelestial"&&(g="MoonCelestialCrop"),e.species==="OrangeTulip"&&(g="Tulip"));const m=e.isComplete?["Rainbow"]:[],b=(S,C)=>{try{if(H.has(S,C))return H.toCanvas(S,C,{scale:.4,mutations:m})}catch{}return null},y=b(f,g)||(t==="plants"?b("tallplant",g):null)||b(f,g.toLowerCase())||(t==="plants"?b("tallplant",g.toLowerCase()):null);y?(y.style.maxWidth="32px",y.style.maxHeight="32px",y.style.display="block",o.appendChild(y)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const a=x("div",{style:"flex: 1; position: relative; height: 22px;"}),i=x("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=ik(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const c=x("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});i.appendChild(c);const d=x("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);a.append(i,d);const l=sk(e.variantsPercentage),u=x("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${l};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,a,u),r}function uk({species:e,category:t,onBack:n}){const r=x("div",{className:"journal-content"}),o=x("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const a=x("div",{className:"journal-header"},e.species);r.appendChild(a);const i=x("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(i);const s=x("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((d,l)=>d==="Normal"?-1:l==="Normal"||d==="Max Weight"?1:l==="Max Weight"?-1:d.localeCompare(l));for(const d of c){const l=e.variantsLogged.includes(d);s.appendChild(pk(e.species,d,t,l));}return r.appendChild(s),r}function pk(e,t,n,r){const o=x("div",{className:"journal-stamp-wrapper"}),a=x("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const u=(f,g)=>{try{const m=t==="Max Weight"?.72:.6;if(H.has(f,g))return H.toCanvas(f,g,{mutations:s,scale:m,boundsMode:"padded"})}catch{}return null},p=u(d,l)||(n==="plants"?u("tallplant",l):null)||u(d,l.toLowerCase())||(n==="plants"?u("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",a.appendChild(p));}catch{}const i=x("div",{className:"journal-stamp-label"},t);return o.append(a,i),o}const fk=`
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
`;function gk(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:a}=e,i=x("button",{className:`tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;i.style.setProperty("--tab-color",s),a&&i.addEventListener("click",a);const c=i;return c.setActive=d=>{d?i.classList.add("active"):i.classList.remove("active");},c.setLabel=d=>{i.textContent=d;},c}const mk=`
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
`,hk={activeTab:"all",expandedCategories:[]};let Zt=null;async function bk(){return Zt||(Zt=await Vr("tab-journal-checker",{version:1,defaults:hk}),Zt)}function Lo(){if(!Zt)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return Zt}function Fo(){return Zt!==null}const xk=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class yk extends sn{constructor(){super({id:"tab-journal-checker",label:"Journal"});R(this,"progress",null);R(this,"currentView",{type:"overview"});}async build(n){this.container=n,await bk(),await H.init(),console.log("[JournalChecker] Sprite categories:",H.getCategories());const r=n.getRootNode();ve(r,rk,"journal-checker-styles"),ve(r,fk,"journal-tab-styles"),ve(r,mk,"journal-progress-bar-styles"),ve(r,ok,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(a=>{this.progress=a.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await Ke(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>ek);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return Fo()?Lo().get().activeTab:"all"}set activeTab(n){Fo()&&Lo().update({activeTab:n});}get expandedCategories(){return Fo()?new Set(Lo().get().expandedCategories):new Set}setExpandedCategories(n){Fo()&&Lo().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(x("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(ck({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(uk({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=x("div",{className:"journal-tabs-container"});return xk.forEach((r,o)=>{const a=gk({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(a);}),n}}function vk(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function wk(e,t){const n=e;let r=e;const o=Md({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:a=>{const i=a.trim();i&&i!==r&&(r=i,t?.(i));},onEnter:a=>{const i=a.trim()||n;i!==r&&(r=i,t?.(i));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const a=o.getValue().trim()||n;a!==r&&(r=a,t?.(a));}),o.input.addEventListener("keydown",a=>{a.key==="Escape"&&(a.preventDefault(),o.input.blur());}),o.root}function Vf(e){const t=x("div",{className:"team-list-item"}),n=e.customIndicator??x("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?wk(e.team.name,e.onNameChange):x("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=x("div",{className:"team-list-item__sprites"});function a(){const c=de.myPets.get();o.innerHTML="";for(let d=0;d<3;d++){const l=e.team.petIds[d],u=l&&l!=="",p=x("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=c.all.find(g=>g.id===l);if(!f){const g=window.__petDataCache;g&&g.has(l)&&(f=g.get(l));}if(f)try{const g=H.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),m=document.createElement("canvas");m.width=g.width,m.height=g.height;const b=m.getContext("2d");if(b&&b.drawImage(g,0,0),m.style.width="100%",m.style.height="100%",m.style.objectFit="contain",p.appendChild(m),e.showSlotStyles){const y=x("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(y),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const m=x("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(m);}else {const g=x("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${l} not found in myPets yet, waiting for update`);let m=false;const b=de.myPets.subscribe(()=>{if(m)return;const S=de.myPets.get().all.find(C=>C.id===l);if(S){m=true,b();try{p.innerHTML="";const C=H.toCanvas("pet",S.petSpecies,{mutations:S.mutations,scale:1}),v=document.createElement("canvas");v.width=C.width,v.height=C.height;const T=v.getContext("2d");if(T&&T.drawImage(C,0,0),v.style.width="100%",v.style.height="100%",v.style.objectFit="contain",p.appendChild(v),e.showSlotStyles){const h=x("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(h),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${l} sprite updated`);}catch(C){console.warn(`[TeamListItem] Failed to render sprite for pet ${S.petSpecies}:`,C),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=vk();p.appendChild(f);}o.appendChild(p);}}a();const i=de.myPets.subscribe(()=>{a();});if(!e.hideDragHandle){const c=x("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(c);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const c=x("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});c.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',c.addEventListener("click",d=>{d.stopPropagation(),e.onExpandClick?.();}),t.appendChild(c);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),i());});return s.observe(document.body,{childList:true,subtree:true}),t}function Sk(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Xf(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:a=false,onChange:i}=e,s=x("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=x("div",{className:"sg-container",role:"tablist"}),d=x("div",{className:"sg-indicator"}),l=t.map(h=>{const w=x("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:h.label});if(w.id=h.id,h.icon){const k=x("span",{className:"sg-icon"}),P=Sk(h.icon);P&&k.appendChild(P),w.appendChild(k);}const _=x("span",{className:"sg-label"},h.label);return w.appendChild(_),w.disabled=!!h.disabled,w});c.appendChild(d),l.forEach(h=>c.appendChild(h)),s.appendChild(c);let u=n,p=a;function f(){const h=l.find(w=>w.id===u);h&&requestAnimationFrame(()=>{const w=d,_=h.offsetLeft,k=h.offsetWidth;w.style.width=`${k}px`,w.style.transform=`translateX(${_}px)`;});}function g(){l.forEach(h=>{const w=h.id===u;h.classList.toggle("active",w),h.setAttribute("aria-selected",String(w)),h.disabled=p||!!t.find(_=>_.id===h.id)?.disabled;}),f();}function m(h){const w=h.currentTarget;if(w.disabled)return;y(w.id);}function b(h){if(p)return;const w=l.findIndex(k=>k.id===u);let _=w;if(h.key==="ArrowLeft"||h.key==="ArrowUp"?(h.preventDefault(),_=(w-1+l.length)%l.length):h.key==="ArrowRight"||h.key==="ArrowDown"?(h.preventDefault(),_=(w+1)%l.length):h.key==="Home"?(h.preventDefault(),_=0):h.key==="End"&&(h.preventDefault(),_=l.length-1),_!==w){const k=l[_];k&&!k.disabled&&(y(k.id),k.focus());}}l.forEach(h=>{h.addEventListener("click",m),h.addEventListener("keydown",b);});function y(h){!t.some(_=>_.id===h)||u===h||(u=h,g(),i?.(u));}function S(){return u}function C(h){p=!!h,g();}function v(){l.forEach(h=>{h.removeEventListener("click",m),h.removeEventListener("keydown",b);});}g(),queueMicrotask(()=>{const h=l.find(w=>w.id===u);if(h){const w=d;w.style.width=`${h.offsetWidth}px`,w.style.transform=`translateX(${h.offsetLeft}px)`;}});const T=s;return T.select=y,T.getSelected=S,T.setDisabled=C,T.destroy=v,T}function Ck(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=x("div",{className:"lg-checkbox-wrap"}),d=x("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let l=null;a&&i!=="none"&&(l=x("label",{className:"lg-checkbox-label",htmlFor:t},a)),l&&i==="left"?c.append(l,d):l&&i==="right"?c.append(d,l):c.append(d);let u=!!n,p=!!r;function f(){d.checked=u,d.disabled=p;}function g(w=false){p||(u=!u,f(),w||s?.(u));}function m(){p||g();}function b(w){p||(w.key===" "||w.key==="Enter")&&(w.preventDefault(),g());}d.addEventListener("click",m),d.addEventListener("keydown",b);function y(){return u}function S(w,_=false){u=!!w,f(),_||s?.(u);}function C(w){p=!!w,f();}function v(w){if(!w){l&&(l.remove(),l=null);return}l?l.textContent=w:(l=x("label",{className:"lg-checkbox-label",htmlFor:t},w),c.append(l));}function T(){d.focus();}function h(){d.removeEventListener("click",m),d.removeEventListener("keydown",b);}return f(),{root:c,input:d,isChecked:y,setChecked:S,setDisabled:C,setLabel:v,focus:T,destroy:h}}let Zn=0,qc="",Kc="";function kk(){return Zn===0&&(qc=document.body.style.overflow,Kc=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),Zn++,()=>{Zn=Math.max(0,Zn-1),Zn===0&&(document.body.style.overflow=qc,document.body.style.touchAction=Kc);}}class _k{constructor(t){R(this,"dragState",null);R(this,"longPressState",null);R(this,"options");R(this,"onPointerMove");R(this,"onPointerUp");R(this,"onPointerCancel");R(this,"onLongPressPointerMove");R(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),ie.getAllTeams().findIndex(d=>d.id===r)===-1)return;const i=t.clientX,s=t.clientY,c=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:i,startY:s,timeout:c,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const i=ie.getAllTeams().findIndex(p=>p.id===r);if(i===-1)return;const s=n.getBoundingClientRect(),c=o.getBoundingClientRect(),d=n.cloneNode(true);d.classList.add("team-list-item--placeholder"),d.classList.remove("team-list-item--dragging");const l=n.style.touchAction;n.style.touchAction="none";const u=kk();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:d,offsetY:t.clientY-s.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:l,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-c.left}px`,n.style.top=`${s.top-c.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(d,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const a=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(a)&&(o=Math.max(-8,Math.min(a+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,a=Array.from(n.children).filter(c=>c!==o&&c!==r&&c instanceof HTMLElement&&c.classList.contains("team-list-item")),i=new Map;a.forEach(c=>{i.set(c,c.getBoundingClientRect().top);});let s=false;for(const c of a){const d=c.getBoundingClientRect(),l=d.top+d.height/2;if(t<l){r.nextSibling!==c&&n.insertBefore(r,c),s=true;break}}s||n.appendChild(r),a.forEach(c=>{const d=i.get(c),l=c.getBoundingClientRect().top;if(d!==void 0&&d!==l){const u=d-l;c.style.transform=`translateY(${u}px)`,c.style.transition="none",c.offsetHeight,c.style.transition="transform 0.14s ease",c.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:a,fromIndex:i,touchActionPrev:s,releaseScrollLock:c,pointerId:d}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(d))try{o.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const p=Array.from(n.children).filter(f=>f!==o&&f!==a&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?n.insertBefore(a,p):n.appendChild(a);}else {const u=Array.from(n.children).filter(f=>f!==o),p=u.indexOf(a);if(p!==-1){const f=u[p];f!==a&&n.insertBefore(a,f);}}if(a.replaceWith(o),a.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),c?.(),!r){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(o);if(p!==-1&&p!==i){const g=ie.getAllTeams().slice(),[m]=g.splice(i,1);g.splice(p,0,m);const b=g.map(y=>y.id);ie.reorderTeams(b),this.options.onReorder(b);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class Tk{constructor(t={}){R(this,"card",null);R(this,"modeControl",null);R(this,"modeContainer",null);R(this,"teamContent",null);R(this,"listContainer",null);R(this,"teamMode","overview");R(this,"selectedTeamIds",new Set);R(this,"teamCheckboxes",new Map);R(this,"options");R(this,"dragHandler");this.options=t,this.dragHandler=new _k({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!ie.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=x("div",{className:"team-card-wrapper"});this.modeContainer=x("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=x("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Xe({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=Xf({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=x("div",{className:"team-card__disabled-state"}),n=x("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=qt({label:"Enable Feature",onClick:()=>{ie.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=ie.getAllTeams(),n=ie.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=x("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let a;this.teamMode==="manage"&&(a=this.createCheckboxIndicator(r.id));const i=Vf({team:r,isActive:o,customIndicator:a?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0});this.teamMode==="manage"&&i.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(i.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){i.classList.add("team-list-item--clicked"),setTimeout(()=>{i.classList.remove("team-list-item--clicked");},300);try{await ie.activateTeam(r),this.options.onTeamsUpdated?.();}catch(d){console.error("[TeamCard] Failed to activate team:",d);}}}),i.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,i,r.id):this.dragHandler.startLongPress(s,i,r.id);})),this.listContainer.appendChild(i);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=x("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=x("div",{className:"team-card__actions"}),r=qt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=x("div",{className:"team-card__actions"}),n=qt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=qt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});r.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=ie.getAllTeams(),a=new Set(o.map(i=>i.name));for(;a.has(n);)n=`${t} (${r})`,r++;try{ie.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)ie.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleRenameTeam(t,n){ie.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const r=ie.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=ie.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",ie.updateTeam(t,{petIds:o}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const r=ie.getTeam(t);if(!r)return;const a=de.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),i=new Set(r.petIds.filter(f=>f!=="")),s=a.filter(f=>!i.has(f.id));await me.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const c=qe.detect();(c.platform==="mobile"||c.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const l=de.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,m=[...r.petIds];m[n]=g.id,ie.updateTeam(t,{petIds:m}),this.options.onTeamsUpdated?.(),me.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),Sn.close().then(()=>{const b=qe.detect();(b.platform==="mobile"||b.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await Sn.show("inventory",{items:s,favoritedItemIds:[]}),await Sn.waitForClose();const u=qe.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),l();}createCheckboxIndicator(t){const n=Ck({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class Pk{constructor(t,n={}){R(this,"root");R(this,"pet");R(this,"options");R(this,"contentSlot",null);R(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const r=document.createElement("div");r.className="base-pet-card__info";const o=document.createElement("div");if(o.className="base-pet-card__name",o.textContent=this.pet.name||this.pet.petSpecies,r.appendChild(o),!this.options.hideStr){const a=document.createElement("div");a.className="base-pet-card__str",this.renderStr(a),r.appendChild(a);}return t.appendChild(r),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const r=this.root.querySelector(".base-pet-card__str");r&&this.renderStr(r);const o=this.root.querySelector(".base-pet-card__sprite-wrapper");o instanceof HTMLElement&&this.renderSprite(o);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const r=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const o=eo({label:r,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(o.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(H.has("pet",this.pet.petSpecies)){const r=H.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});r.style.width="64px",r.style.height="64px",r.style.objectFit="contain",t.appendChild(r);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}const Te={XP:{BOOST_PAIR:.85,LEVELING_PAIR:.75,PASSIVE_LEVELING:.5,STR_DISTANCE_THRESHOLD:.15},ECONOMY:{DEDICATED_COIN:.9,META_SELLING:.85,PASSIVE_EFFICIENCY:.65,ENDGAME_HARVEST:.95,SYNERGY_BONUS:.1,EARLY_REGROW:.7},HATCHING:{TIER_3_MAX_STR:.95,RAINBOW_HUNTING:.7,COMBO_BONUS:.05},TIER_BONUS:.05,CONFIDENCE_THRESHOLD:.6},V={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]},Xa={ALLOWED_PANELS:{"xp-farming":["xp"],"coin-farming":["coin","xp","hatch"],"crop-farming":["growth","coin","xp","hatch"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],hatching:["hatch","xp"],efficiency:["xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}};function ze(e,t){return e.abilities.some(n=>t.includes(n))}function Le(e,t){return e.filter(n=>ze(n,t)).length}function Ak(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function er(e,t){const n=e.flatMap(r=>r.abilities.filter(o=>t.includes(o))).map(Ak);return n.length===0?0:n.reduce((r,o)=>r+o,0)/n.length}function Bo(e){const t=rf(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],r={},o=Le(t,V.XP_BOOST),a=Te.XP.STR_DISTANCE_THRESHOLD,s=t.filter(I=>I.maxStrength===0?false:(I.maxStrength-I.currentStrength)/I.maxStrength>a).length,c=t.filter(I=>I.currentStrength<I.maxStrength).length;if(o>=1&&s>=2)r["xp-farming"]=Te.XP.BOOST_PAIR,n.push(`1 XP Boost + ${s} high-need pets (>${a*100}% STR distance)`);else if(o>=2){const I=er(t,V.XP_BOOST);r["xp-farming"]=Te.XP.LEVELING_PAIR+I*Te.TIER_BONUS,n.push(`${o} XP Boost pets (avg tier ${I.toFixed(1)})`);}else c>=2&&s>=1?(r["xp-farming"]=Te.XP.LEVELING_PAIR,n.push(`${c} leveling pets with ${s} high-need`)):c>=2&&(r["xp-farming"]=Te.XP.PASSIVE_LEVELING,n.push(`${c} pets below max STR`));const d=Le(t,V.COIN_FINDER),l=Le(t,V.SELL_BOOST),u=Le(t,V.CROP_REFUND_HARVEST),p=Le(t,V.RARE_GRANTERS),f=Le(t,V.COMMON_GRANTERS),g=t.some(I=>ze(I,V.COIN_FINDER)&&(ze(I,V.RARE_GRANTERS)||ze(I,V.COMMON_GRANTERS)));d>=1&&!g?(r["coin-farming"]=Te.ECONOMY.DEDICATED_COIN,n.push("Dedicated Coin Finder team (no granters)")):l>=1&&u>=1?(r["coin-farming"]=Te.ECONOMY.META_SELLING,n.push("Meta Selling Team (Sell Boost + Crop Refund/Harvest)")):d>=1&&g?(r["coin-farming"]=Te.ECONOMY.PASSIVE_EFFICIENCY,r.efficiency=Math.max(r.efficiency||0,Te.ECONOMY.PASSIVE_EFFICIENCY),n.push("Coin Finder + Granter (passive efficiency)")):(l>=1||u>=1)&&(r["coin-farming"]=Math.max(r["coin-farming"]||0,.7),n.push("Sell/Refund abilities (coin efficiency)"));const m=Le(t,V.PLANT_GROWTH),b=Le(t,V.CROP_MUTATION),y=Le(t,V.CROP_SIZE),S=t.filter(I=>I.abilities.includes("DoubleHarvest")).length,C=t.filter(I=>I.abilities.includes("ProduceRefund")).length,v=t.some(I=>I.abilities.includes("DoubleHarvest")&&I.abilities.includes("ProduceRefund"));if(S>=3){let I=Te.ECONOMY.ENDGAME_HARVEST;v&&(I+=Te.ECONOMY.SYNERGY_BONUS),r["crop-farming"]=Math.max(r["crop-farming"]||0,I),n.push("Endgame Harvest Team (3x Double Harvest)"+(v?" + capybara synergy":""));}else if(S>=1&&C>=1){let I=.85;v&&(I+=Te.ECONOMY.SYNERGY_BONUS),r["crop-farming"]=Math.max(r["crop-farming"]||0,I),n.push("Double Harvest + Crop Refund"+(v?" (same pet - capybara)":""));}else b>=1&&S===0&&(r["crop-farming"]=Math.max(r["crop-farming"]||0,Te.ECONOMY.EARLY_REGROW),n.push("Early Game Regrow Team (Crop Mutation)"));if(p>=1){const I=t.some(B=>B.abilities.includes("RainbowGranter")),F=t.some(B=>B.abilities.includes("GoldGranter"));I?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):F?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(r["crop-farming"]=Math.max(r["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const T=m+b+y+f;if(T>=2&&!r["crop-farming"]){const I=(er(t,V.PLANT_GROWTH)+er(t,V.CROP_MUTATION)+er(t,V.CROP_SIZE))/3;r["crop-farming"]=Math.max(r["crop-farming"]||0,.7+I*.03),n.push(`${T} crop-related abilities`);}const h=Le(t,V.EGG_GROWTH);if(h>=1&&(r["time-reduction"]=.7,n.push(`${h} Egg Growth Boost pet(s)`)),m>=1&&!r["crop-farming"]&&(r["time-reduction"]=Math.max(r["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),p>=1||b>=1){const I=t.some(B=>B.abilities.includes("RainbowGranter")),F=t.some(B=>B.abilities.includes("GoldGranter"));I||F?(r["mutation-hunting"]=.95,n.push(`${I?"Rainbow":"Gold"} Granter (mutation focus)`)):b>=1&&(r["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const w=Le(t,V.HUNGER_BOOST),_=Le(t,V.HUNGER_RESTORE);w>=1&&_>=1?(r.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(w>=1||_>=1)&&(r.efficiency=.6,n.push("Hunger management (reduced feeding)"));const k=d+p+f;k>=2&&(r.efficiency=Math.max(r.efficiency||0,.6),n.push(`${k} passive abilities (passive gains)`));const P=Le(t,V.MAX_STR_BOOST),E=Le(t,V.HATCH_XP),G=Le(t,V.PET_MUTATION),J=Le(t,V.DOUBLE_HATCH),j=Le(t,V.PET_REFUND);if(P>=1){const I=er(t,V.MAX_STR_BOOST),F=I>=3?Te.HATCHING.TIER_3_MAX_STR:.85;r.hatching=F+I*Te.TIER_BONUS,n.push(`Max Strength Boost (tier ${I.toFixed(1)}) - late-game meta`);}if(G>=1||J>=1||j>=1){const I=G+J+j,F=Te.HATCHING.RAINBOW_HUNTING+I*Te.HATCHING.COMBO_BONUS;r.hatching=Math.max(r.hatching||0,F),n.push(`${I} rainbow hunting abilities`);}E>=1&&!r.hatching&&(r.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const q=t.filter(I=>ze(I,V.MAX_STR_BOOST)||ze(I,V.PET_MUTATION)||ze(I,V.DOUBLE_HATCH)||ze(I,V.PET_REFUND)).length;q>=Math.ceil(t.length*.67)&&r.hatching&&(r.hatching=Math.max(r.hatching,.97),r["crop-farming"]&&r["crop-farming"]<.97&&t.filter(F=>(ze(F,V.CROP_REFUND_HARVEST)||ze(F,V.CROP_SIZE)||ze(F,V.CROP_MUTATION))&&!ze(F,V.PET_REFUND)&&!ze(F,V.DOUBLE_HATCH)&&!ze(F,V.PET_MUTATION)&&!ze(F,V.MAX_STR_BOOST)).length===0&&(delete r["crop-farming"],n.push("Suppressed crop-farming (hatching majority override)")),n.push(`Hatching Majority (${q}/${t.length} pets) - clear team purpose`));const U=Object.entries(r).sort(([,I],[,F])=>F-I);if(U.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp","growth","coin","hatch"],reasons:["Mixed or unclear purpose"]};const[O,$]=U[0],z=U.slice(1).map(([I,F])=>({purpose:I,confidence:F}));return $<Te.CONFIDENCE_THRESHOLD?{primary:"balanced",confidence:$,secondary:U.map(([I,F])=>({purpose:I,confidence:F})),suggestedFeatures:["xp","growth","coin","hatch"],reasons:[...n,`Low confidence (${($*100).toFixed(0)}%) - showing all panels`]}:{primary:O,confidence:$,secondary:z,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","growth","xp"],"crop-farming":["growth","coin","xp"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],efficiency:["xp"],hatching:["hatch","growth","xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}[O]||["xp","growth","coin","hatch"],reasons:n}}async function Ik(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,r=t.createOscillator(),o=t.createGain();r.connect(o),o.connect(t.destination),r.type="sine",r.frequency.setValueAtTime(800,n),r.frequency.exponentialRampToValueAtTime(400,n+.03),o.gain.setValueAtTime(.12,n),o.gain.exponentialRampToValueAtTime(.001,n+.05),r.start(n),r.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function Ek(e={}){const{id:t,variant:n="default",size:r="md",round:o=false,sprite:a=null,onClick:i,disabled:s=false,playSound:c=true,tooltip:d}=e,l=x("button",{className:"gemini-icon-btn",id:t});l.type="button",n!=="default"&&l.classList.add(`gemini-icon-btn--${n}`),r!=="md"&&l.classList.add(`gemini-icon-btn--${r}`),o&&l.classList.add("gemini-icon-btn--round"),d&&(l.title=d),l.disabled=s;const u=x("span",{className:"gemini-icon-btn__content"});l.appendChild(u),a&&u.appendChild(a);const p=x("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",l.appendChild(p),l.addEventListener("click",async g=>{l.disabled||(c&&Ik(),i?.(g));});const f=l;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{l.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&l.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{l.disabled=g;},f}const qf=`
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
`;class Mk{constructor(){R(this,"card",null);R(this,"listContainer",null);R(this,"innerContent",null);R(this,"logs",[]);R(this,"filteredLogs",[]);R(this,"unsubscribe",null);R(this,"ITEM_HEIGHT",88);R(this,"BUFFER_SIZE",3);R(this,"VIEWPORT_HEIGHT",480);R(this,"renderedRange",{start:0,end:0});R(this,"scrollListener",null);R(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=Gn(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const r=t.get().abilityLogs;this.updateFromAbilityLogs(r);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const a=Y.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",i={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=ku(i),c=new Date(n.performedAt),d=c.toLocaleDateString("en-US",{month:"short",day:"numeric"}),l=c.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),u=`${d} ${l}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:a,abilityId:n.abilityId,description:s,formattedDate:u}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return eo({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=x("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=x("div",{style:"margin-bottom: 0;"}),r=Ts({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const a=o.trim().toLowerCase();a?this.filteredLogs=this.logs.filter(i=>i.petName.toLowerCase().includes(a)||i.petSpecies.toLowerCase().includes(a)||i.abilityName.toLowerCase().includes(a)||i.description.toLowerCase().includes(a)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=x("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=x("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=Xe({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=x("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let r=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),o=Math.min(this.filteredLogs.length,r+n+this.BUFFER_SIZE*2);if(r===this.renderedRange.start&&o===this.renderedRange.end)return;this.renderedRange={start:r,end:o},this.innerContent.replaceChildren();const a=r*this.ITEM_HEIGHT;if(a>0){const s=x("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=r;s<o;s++){const c=this.filteredLogs[s],d=this.createLogItemCard(c);this.innerContent.appendChild(d);}const i=Math.max(0,(this.filteredLogs.length-o)*this.ITEM_HEIGHT);if(i>0){const s=x("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}createLogItemCard(t){const n=x("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const r=x("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const l=H.toCanvas("pet",t.petSpecies);l&&(l.style.width="100%",l.style.height="100%",l.style.objectFit="contain",r.appendChild(l));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=x("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),a=x("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),i=x("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=x("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);a.appendChild(i),a.appendChild(s),o.appendChild(a);const c=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(c);const d=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(d),n.appendChild(o),n}}const Kf=`
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

`,Yf=`
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
`,Nl=`
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
`,Jf=`
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
`,Rk=`
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
`;class Nk extends sn{constructor(n){super({id:"tab-pets",label:"Pets"});R(this,"unsubscribeMyPets");R(this,"lastActiveTeamId",null);R(this,"teamCardPart",null);R(this,"abilityLogsCardPart",null);R(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Ke(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>ll);return {MGSprite:i}},void 0);await r.init();const o=n.getRootNode();ve(o,Kf,"team-card-styles"),ve(o,Yf,"base-pet-card-styles"),ve(o,Nl,"badge-styles"),ve(o,Jf,"arcade-button-styles"),ve(o,qf,"gemini-icon-button-styles"),ve(o,Rk,"ability-logs-card-styles");const a=this.createGrid("12px");a.id="pets",n.appendChild(a),this.initializeTeamCardPart(a),this.initializeAbilityLogsCardPart(a),this.unsubscribeMyPets=de.myPets.subscribeStable(()=>{const i=ie.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=ie.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new Tk({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new Mk);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}class Lk{constructor(t){R(this,"root");R(this,"options");R(this,"headerElement",null);R(this,"petsContainer",null);R(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${t.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `);}updatePets(t){if(this.petsContainer){this.petsContainer.innerHTML="";for(const n of t){const r=this.buildPetCard(n);this.petsContainer.appendChild(r);}}}buildPetCard(t){const n=document.createElement("div");n.className="xp-pet-card",t.isStarving&&n.classList.add("xp-pet-card--starving"),t.isMaxStrength&&n.classList.add("xp-pet-card--max");const r=document.createElement("div");r.className="xp-pet-card__sprite";const o=document.createElement("div");o.className="xp-pet-card__sprite-wrapper";try{const l=t.mutations;if(H.has("pet",t.species)){const u=H.toCanvas("pet",t.species,{mutations:l,scale:1,boundsMode:"padded"});u.style.width="64px",u.style.height="64px",u.style.objectFit="contain",u.style.display="block",o.appendChild(u);}else o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}catch(l){console.warn(`[TeamXpPanel] Failed to render sprite for ${t.species}:`,l),o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}r.appendChild(o);const a=document.createElement("div");if(a.className="xp-pet-card__badges",t.isMaxStrength&&(a.innerHTML+='<span class="xp-badge xp-badge--max">MAX</span>'),t.isStarving&&(a.innerHTML+='<span class="xp-badge xp-badge--starving">STARVING</span>'),t.xpBoostStats){const l=t.xpBoostStats.tier==="Snowy"?"❄":"⚡";a.innerHTML+=`<span class="xp-badge xp-badge--boost">${l}${t.xpBoostStats.tier}</span>`;}r.appendChild(a);const i=document.createElement("div");i.className="xp-pet-card__str-display",i.innerHTML=`
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
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),r=Math.floor(t%24);return `${n}d ${r}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const Fk={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=Uc(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new Lk({teamId:e.id});t.appendChild(n.build());const r=Kn(e.id);return r&&n.update(r),{update:(o,a)=>{const i=Kn(o.id);i&&n.update(i);},destroy:()=>n.destroy(),refresh:()=>{const o=Kn(e.id);o&&n.update(o);}}},renderPetSlot:(e,t,n)=>{const r=de.weather.get(),o=r.isActive?r.type:null,a=Kn(t.id),i=a?.teamSummary.bonusXpPerHour||0,s=a?.pets||[],c=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),d=ss(e,o,i,c),l=d.isMaxStrength,u=!!d.xpBoostStats;let p="";if(l)u&&d.xpBoostStats&&(p=`
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
                `);const g=d.maxStrength,m=d.currentStrength,b=Math.min(100,Math.max(0,Math.floor(m/g*100))),y=e.xp%3600/3600*100,S=Math.min(99,Math.max(1,Math.floor(y))),C=d.currentStrength+1,v=d.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${Wc(d.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${C}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${S}%"></div>
                        <span class="stat__percent">${S}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${Wc(d.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${v}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${b}%"></div>
                        <span class="stat__percent">${b}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},renderGroupedSlot:(e,t,n)=>{const r=de.weather.get(),o=r.isActive?r.type:null,i=Kn(t.id)?.teamSummary.bonusXpPerHour||0;let s=0,c=0;for(const l of e){const u=ss(l,o,i,0);u.xpBoostStats&&(s+=u.xpBoostStats.expectedXpPerHour),u.supportingFeeds&&(c+=u.supportingFeeds);}let d="";if(s>0&&(d=`
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
                `;else {const u=Uc(t.id);n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(u)}%</span>
                        </div>
                    </div>
                `;}return}n.innerHTML=`<div class="xp-stats-compact xp-stats-grouped">${d}</div>`;},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.some(a=>a.currentStrength<a.maxStrength)?true:n.some(a=>a.abilities.some(i=>V.XP_BOOST.includes(i)))},shouldDisplay:(e,t,n)=>(Xa.ALLOWED_PANELS[n.primary]||[]).includes("xp")?!!(t.some(i=>i.currentStrength<i.maxStrength)||t.some(i=>i.abilities.some(s=>V.XP_BOOST.includes(s)))):false,countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.every(o=>o.currentStrength>=o.maxStrength)?n.some(a=>a.abilities.some(i=>V.XP_BOOST.includes(i)))?1:0:2}};function Pe(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Mt(e){if(e<=0)return "0m";const t=Math.floor(e/1e3),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),o=Math.floor(t%3600/60),a=[];return n>0&&a.push(`${n}d`),r>0&&a.push(`${r}h`),(o>0||a.length===0)&&a.push(`${o}m`),a.join(" ")}function Rt(e,t){const n=e==="egg"?"pet":"plant",r=Pe("span","sprite-wrapper");if(!t)return r;let o=t;e==="plant"&&(o==="DawnCelestial"&&(o="DawnCelestialCrop"),o==="MoonCelestial"&&(o="MoonCelestialCrop"));try{if(H.isReady()&&H.has(n,o)){const a=H.toCanvas(n,o,{scale:.3});a.style.height="16px",a.style.width="auto",a.style.imageRendering="pixelated",r.appendChild(a);}}catch{}return r}function Oo(e,t){const n=Pe("span","stacked-sprites");if(t.length===0)return n;const r=e==="egg"?"pet":"plant",o=4,i=[...new Set(t.map(c=>e==="egg"?c.eggId:c.species).filter(Boolean))].slice(0,o);if(i.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let c=0;c<i.length;c++){let d=i[c];e==="plant"&&d&&(d==="DawnCelestial"&&(d="DawnCelestialCrop"),d==="MoonCelestial"&&(d="MoonCelestialCrop"));try{if(H.isReady()&&d&&H.has(r,d)){const l=H.toCanvas(r,d,{scale:.2});l.style.height="14px",l.style.width="auto",l.style.imageRendering="pixelated",l.style.position="relative",l.style.zIndex=String(o-c),n.appendChild(l),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function Nt(e,t,n,r,o,a){const i=Pe("div","stat-row"),s=Pe("span","stat__label",e),c=Pe("span","stat__timer",t),d=Pe("span","stat__str-label");d.appendChild(n);const l=Pe("div","stat__progress-mini"),u=Pe("div",`stat__progress-fill ${o}`);u.style.width=`${r}%`,l.appendChild(u);const p=`${r}%`,f=Pe("span","stat__percent",p);return l.appendChild(f),i.appendChild(s),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&i.appendChild(d),i.appendChild(c),i.appendChild(l),i}function Yc(e){const t=Pe("div","stat-row stat-row--boost"),n=Pe("span","stat__label","BOOST");t.appendChild(n);const r=Pe("span","stat__values-row");return e.forEach((o,a)=>{const i=Pe("span","stat__boost-item");i.appendChild(o.sprite),i.appendChild(Pe("span","stat__value stat__value--accent",o.text)),r.appendChild(i),a<e.length-1&&r.appendChild(Pe("span","stat__separator"," "));}),t.appendChild(r),t}function Jc(e,t){const n=t==="egg"?$r:Gr;let r=0,o=false;const a=[];for(const i of e.abilities)if(i in n){const s=n[i],c=s.procRate*60;r+=c*s.minutesPerProc,o=true,a.push(i);}return {hasBoost:o,minutesPerProc:0,hourlyReduction:r,abilityName:a.join(", ")}}function Qc(e,t){const n=ie.getPetsForTeam(e),r=t==="egg"?_l(n):Tl(n);return `${((60+zr(r).timeReductionPerHour)/60).toFixed(2)}x`}function Do(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.plantedAt,s=(o.maturedAt-t)/n,c=a+s,d=c>0?a/c*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function $o(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.startTime,s=(o.endTime-t)/n,c=a+s,d=c>0?a/c*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function Zc(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.maturedAt-a.maturedAt)[0];return {remainingMs:Math.max(0,r.maturedAt-t),name:r.eggId||null}}function ed(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.endTime-a.endTime)[0];return {remainingMs:Math.max(0,r.endTime-t),name:r.species||null}}function td(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(r=>r.maturedAt));return Math.max(0,n-t)}function nd(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(r=>r.endTime));return Math.max(0,n-t)}function Lt(e,t){return e<=0||t<=0?0:Math.round(e/t)}const Bk={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=de.myGarden.get(),r=n.eggs.growing.length+n.plants.growing.length;return r===0?null:{text:`${r} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r,o)=>{const a=de.myGarden.get(),i=Date.now(),s=Jc(e,"egg"),c=Jc(e,"plant");if(n.innerHTML="",!s.hasBoost&&!c.hasBoost)return;const d=o?a.eggs.growing.filter(h=>o.has(h.tileIndex)):a.eggs.growing,l=o?a.crops.growing.filter(h=>o.has(h.tileIndex)):a.crops.growing;let u=r;!u&&s.hasBoost!==c.hasBoost&&(u=s.hasBoost?"egg":"plant");const p=u==="egg"&&s.hasBoost||u==="plant"&&c.hasBoost,f=!u,g=Pe("div","growth-stats-compact");if(!p&&!f){const h=r==="egg"?"Egg":"Plant",w=Pe("div","stat-row stat-row--message");w.appendChild(Pe("span","stat__message",`No ${h} Growth Boost, Click the Button to Switch View`)),g.appendChild(w),n.appendChild(g);return}const m=[],b=s.hasBoost&&(u==="egg"||f),y=c.hasBoost&&(u==="plant"||f);if(b){const h=Math.round(s.hourlyReduction/60*100);m.push({text:`+${h}% Speed`,sprite:Rt("egg","UncommonEgg")});}if(y){const h=Math.round(c.hourlyReduction/60*100);m.push({text:`+${h}% Speed`,sprite:Rt("plant","Carrot")});}m.length>0&&g.appendChild(Yc(m));const S=Qc(t,"egg"),C=parseFloat(S.replace("x","")),v=Qc(t,"plant"),T=parseFloat(v.replace("x",""));if(s.hasBoost&&(u==="egg"||f)){const h=Zc(d,i),w=Lt(h.remainingMs,C),_=d.length>0?Do(d,i,C):100,k=w>0?Mt(w):"Ready!";g.appendChild(Nt("NEXT EGG",k,Rt("egg",h.name),_,"stat__progress-fill--egg"));}if(c.hasBoost&&(u==="plant"||f)){const h=ed(l,i),w=Lt(h.remainingMs,T),_=l.length>0?$o(l,i,T):100,k=w>0?Mt(w):"Ready!";g.appendChild(Nt("NEXT PLANT",k,Rt("plant",h.name),_,"stat__progress-fill--plant"));}if(s.hasBoost&&(u==="egg"||f)){const h=d.length>0?Do(d,i,C):100,w=td(d,i),_=Lt(w,C),k=_>0?Mt(_):"All Ready!";g.appendChild(Nt("ALL EGGS",k,Oo("egg",d),h,"stat__progress-fill--egg"));}else if(c.hasBoost&&(u==="plant"||f)){const h=l.length>0?$o(l,i,T):100,w=nd(l,i),_=Lt(w,T),k=_>0?Mt(_):"All Ready!";g.appendChild(Nt("ALL PLANTS",k,Oo("plant",l),h,"stat__progress-fill--plant"));}n.appendChild(g);},renderGroupedSlot:(e,t,n,r,o)=>{const a=de.myGarden.get(),i=Date.now(),s=_l(e),c=Tl(e),d=zr(s),l=zr(c);n.innerHTML="";const u=d.timeReductionPerHour>0,p=l.timeReductionPerHour>0;if(!u&&!p)return;const f=Pe("div","growth-stats-compact growth-stats-grouped"),g=o?a.eggs.growing.filter(h=>o.has(h.tileIndex)):a.eggs.growing,m=o?a.crops.growing.filter(h=>o.has(h.tileIndex)):a.crops.growing,b=r==="egg"&&u,y=r==="plant"&&p,S=!r,C=(60+d.timeReductionPerHour)/60,v=(60+l.timeReductionPerHour)/60,T=[];if((b||S)&&u){const h=Math.round(d.timeReductionPerHour/60*100);T.push({text:`+${h}% Speed`,sprite:Rt("egg","UncommonEgg")});}if((y||S)&&p){const h=Math.round(l.timeReductionPerHour/60*100);T.push({text:`+${h}% Speed`,sprite:Rt("plant","Carrot")});}if(T.length>0&&f.appendChild(Yc(T)),(b||S)&&u){const h=Zc(g,i),w=Lt(h.remainingMs,C),_=g.length>0?Do(g,i,C):100,k=w>0?Mt(w):"Ready!";f.appendChild(Nt("NEXT EGG",k,Rt("egg",h.name),_,"stat__progress-fill--egg"));}if((y||S)&&p){const h=ed(m,i),w=Lt(h.remainingMs,v),_=m.length>0?$o(m,i,v):100,k=w>0?Mt(w):"Ready!";f.appendChild(Nt("NEXT PLANT",k,Rt("plant",h.name),_,"stat__progress-fill--plant"));}if((b||S)&&u){const h=g.length>0?Do(g,i,C):100,w=td(g,i),_=Lt(w,C),k=_>0?Mt(_):"All Ready!";f.appendChild(Nt("ALL EGGS",k,Oo("egg",g),h,"stat__progress-fill--egg"));}else if((y||S)&&p){const h=m.length>0?$o(m,i,v):100,w=nd(m,i),_=Lt(w,v),k=_>0?Mt(_):"All Ready!";f.appendChild(Nt("ALL PLANTS",k,Oo("plant",m),h,"stat__progress-fill--plant"));}n.appendChild(f);},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return Pn(n)||An(n)},shouldDisplay:(e,t,n)=>{const o=(Xa.ALLOWED_PANELS[n.primary]||[]).includes("growth"),a=Pn(t)||An(t);return o&&a},countRows:(e,t,n)=>{const r=Array.isArray(e)?e:[e],o=Pn(r),a=An(r);if(!o&&!a)return 0;if(n==="egg"||n==="plant")return 2;let i=0;return o&&(i+=2),a&&(i+=2),i}},cr=["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],dr=["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],ur=["RainDance","SnowGranter","FrostGranter","GoldGranter","RainbowGranter"],pr=["DoubleHarvest"],fr=["ProduceRefund"];function kt(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Ft(e){if(e>=1e12)return `${(e/1e12).toFixed(2)}T`;if(e>=1e9)return `${(e/1e9).toFixed(2)}B`;if(e>=1e6)return `${(e/1e6).toFixed(2)}M`;if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)}k`:`${t.toFixed(1)}k`}return String(Math.round(e))}function Un(e){const t=Y.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,scaleIncreasePercentage:n.baseParameters?.scaleIncreasePercentage??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0,grantedMutations:n.baseParameters?.grantedMutations??[],requiredWeather:n.baseParameters?.requiredWeather??null}:null}function _e(e,t){return e.abilities.some(n=>t.includes(n))}function oo(e,t,n){if(e.hunger<=0)return  false;const r=Un(t);return !(!r||r.requiredWeather&&n!==r.requiredWeather)}function ao(e){return e.currentStrength/e.maxStrength}function qa(e,t){return Math.min(100,e*t)}function Ok(e,t,n,r){const o=Ba(e);if(!o)return 0;const a=pt(e,t,n),i=Math.min(t*(1+r/100),o.maxScale),s=pt(e,i,n);return Math.max(0,s-a)}function Qf(e,t,n,r){if(n.includes(r))return 0;const o=pt(e,t,n),a=[...n,r],i=pt(e,t,a);return Math.max(0,i-o)}function ki(e,t,n){const r=kt("div","stat-row");return r.appendChild(kt("span","stat__label",e)),r.appendChild(kt("span","stat__value",t)),r.appendChild(kt("span","stat__timer",n)),r}function rd(e,t,n){const r=kt("div","stat-row");return r.appendChild(kt("span","stat__label",e)),r.appendChild(kt("span","stat__value",t)),r.appendChild(kt("span","stat__timer",n)),r}function Dk(e,t,n){const o=de.myGarden.get().crops.all,a=n?o.filter(l=>n.has(String(l.tileIndex))):o;if(a.length===0)return {perProc:0,perHour:0};let i=0,s=0;for(const l of e){const u=ao(l);for(const p of cr){if(!l.abilities.includes(p)||!oo(l,p,t))continue;const f=Un(p);if(!f)continue;const g=qa(f.baseProbability,u),m=f.scaleIncreasePercentage*u,b=g/100*60;let y=0;for(const C of a){const v=Ok(C.species,C.targetScale,C.mutations,m);y+=v;}const S=y/a.length;i+=b,s+=S;}}const c=e.length>0?s/e.length:0,d=i*c;return {perProc:c,perHour:d}}function $k(e,t,n){const o=de.myGarden.get().crops.all,a=de.weather.get(),i=Y.get("weather"),s=n?o.filter(b=>n.has(String(b.tileIndex))):o;if(s.length===0||!a.isActive||!i)return {perProc:0,perHour:0};const c=i[a.type];if(!c?.mutator)return {perProc:0,perHour:0};const d=c.mutator.chancePerMinutePerCrop??0,l=c.mutator.mutation??"";let u=0;for(const b of e){const y=ao(b);for(const S of dr){if(!b.abilities.includes(S)||!oo(b,S,t))continue;const C=Un(S);if(!C)continue;const v=C.mutationChanceIncreasePercentage*y;u+=v;}}const p=d*(u/100),f=s.length*(p/100)*60;let g=0;for(const b of s){const y=Qf(b.species,b.targetScale,b.mutations,l);g+=y;}const m=s.length>0?g/s.length:0;return {perProc:m,perHour:f*m}}function Gk(e,t,n){const o=de.myGarden.get().crops.all,a=n?o.filter(l=>n.has(String(l.tileIndex))):o;if(a.length===0)return {perProc:0,perHour:0};let i=0,s=0;for(const l of e){const u=ao(l);for(const p of ur){if(!l.abilities.includes(p)||!oo(l,p,t))continue;const f=Un(p);if(!f)continue;const m=qa(f.baseProbability,u)/100*60,b=f.grantedMutations;if(b.length===0)continue;const y=b[0];let S=0;for(const v of a){const T=Qf(v.species,v.targetScale,v.mutations,y);S+=T;}const C=S/a.length;i+=m,s+=C;}}const c=e.length>0?s/e.length:0,d=i*c;return {perProc:c,perHour:d}}function zk(e,t,n){const r=de.myGarden.get(),o=r.crops.all,a=r.crops.mature,i=n?o.filter(p=>n.has(String(p.tileIndex))):o,s=n?a.filter(p=>n.has(String(p.tileIndex))):a,c=s.length>0?s:i;if(c.length===0)return {expectedCrops:0,expectedCoins:0};let d=0;for(const p of e){const f=ao(p);for(const g of pr){if(!p.abilities.includes(g)||!oo(p,g,t))continue;const m=Un(g);if(!m)continue;const b=qa(m.baseProbability,f);d+=b/100;}}const l=c.length*d;let u=0;for(const p of c){const f=pt(p.species,p.targetScale,p.mutations);u+=f*d;}return {expectedCrops:l,expectedCoins:u}}function Hk(e,t,n){const r=de.myGarden.get(),o=r.crops.all,a=r.crops.mature,i=n?o.filter(p=>n.has(String(p.tileIndex))):o,s=n?a.filter(p=>n.has(String(p.tileIndex))):a,c=s.length>0?s:i;if(c.length===0)return {expectedCrops:0,expectedCoins:0};let d=0;for(const p of e){const f=ao(p);for(const g of fr){if(!p.abilities.includes(g)||!oo(p,g,t))continue;const m=Un(g);if(!m)continue;const b=qa(m.baseProbability,f);d+=b/100;}}const l=c.length*d;let u=0;for(const p of c){const f=pt(p.species,p.targetScale,p.mutations);u+=f*d;}return {expectedCrops:l,expectedCoins:u}}const gs={id:"coin",label:"Value",icon:"💰",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=de.myGarden.get(),r=n.crops.all.length;return r===0?null:{text:`${r} crops`,variant:"neutral",tooltip:`${n.crops.mature.length} mature, ${n.crops.growing.length} growing`,priority:7}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r,o)=>{const a=[e];gs.renderGroupedSlot&&gs.renderGroupedSlot(a,t,n,r,o);},renderGroupedSlot:(e,t,n,r,o)=>{const a=de.weather.get(),i=a.isActive?a.type:null;n.innerHTML="";const s=kt("div","value-stats-compact"),c=e.some(f=>_e(f,cr)),d=e.some(f=>_e(f,dr)),l=e.some(f=>_e(f,ur)),u=e.some(f=>_e(f,pr)),p=e.some(f=>_e(f,fr));if(!(!c&&!d&&!l&&!u&&!p)){if(c){const f=Dk(e,i,o);s.appendChild(ki("SIZE BOOST",`+${Ft(f.perProc)}/proc`,`+${Ft(f.perHour)}/hr`));}if(d){const f=$k(e,i,o);s.appendChild(ki("MUTATION BOOST",`+${Ft(f.perProc)}/proc`,`+${Ft(f.perHour)}/hr`));}if(l){const f=Gk(e,i,o);s.appendChild(ki("GRANTERS",`+${Ft(f.perProc)}/proc`,`+${Ft(f.perHour)}/hr`));}if(u){const f=zk(e,i,o);s.appendChild(rd("EXTRA HARVEST",`+${f.expectedCrops.toFixed(1)} crops`,`+${Ft(f.expectedCoins)} coins`));}if(p){const f=Hk(e,i,o);s.appendChild(rd("CROP REFUND",`+${f.expectedCrops.toFixed(1)} crops`,`+${Ft(f.expectedCoins)} coins`));}n.appendChild(s);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(r=>_e(r,cr)||_e(r,dr)||_e(r,ur)||_e(r,pr)||_e(r,fr)),shouldDisplay:(e,t,n)=>{const o=(Xa.ALLOWED_PANELS[n.primary]||[]).includes("coin"),a=t.some(i=>_e(i,cr)||_e(i,dr)||_e(i,ur)||_e(i,pr)||_e(i,fr));return o&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let r=0;return n.some(o=>_e(o,cr))&&r++,n.some(o=>_e(o,dr))&&r++,n.some(o=>_e(o,ur))&&r++,n.some(o=>_e(o,pr))&&r++,n.some(o=>_e(o,fr))&&r++,r}},bn=["DoubleHatch"],xn=["PetRefund","PetRefundII"],yn=["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"];function We(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Zf(e){const t=Y.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0}:null}function Ge(e,t){return e.abilities.some(n=>t.includes(n))}function Ll(e){return e.hunger>0}function eg(e){return e.currentStrength/e.maxStrength}function tg(e,t){return Math.min(100,e*t)}function jk(e){const t=We("span","sprite-wrapper");try{if(H.isReady()&&H.has("pet",e)){const n=H.toCanvas("pet",e,{scale:.6});n.style.height="32px",n.style.width="auto",n.style.imageRendering="pixelated",t.appendChild(n);}}catch{t.textContent="🥚";}return t}function Go(e,t){const n=We("div","stat-row");n.appendChild(We("span","stat__label",e));const r=We("div","stat__sprite-grid");for(const o of t){if(o.value<=0)continue;const a=We("div","stat__sprite-item");a.appendChild(jk(o.eggId));const i=We("span","stat__sprite-value",o.value.toFixed(1));a.appendChild(i),r.appendChild(a);}return n.appendChild(r),n}function od(e,t,n,r){const o=We("div","stat-row");o.appendChild(We("span","stat__label","PET MUTATION"));const a=We("span","stat__values-row"),i=We("span","stat__value stat__value--rainbow",`${e}% (${n})`);i.style.backgroundImage="var(--rainbow-text-gradient)",i.style.webkitBackgroundClip="text",i.style.webkitTextFillColor="transparent",i.style.backgroundClip="text",a.appendChild(i),a.appendChild(We("span","stat__separator"," | "));const s=We("span","stat__value stat__value--gold",`${t}% (${r})`);return a.appendChild(s),o.appendChild(a),o}function Fl(){const e=de.myInventory.get(),t=new Map;for(const n of e.items)if(n.itemType==="Egg"&&n.eggId){const r=t.get(n.eggId)||0;t.set(n.eggId,r+(n.quantity||1));}return t}function Bl(e){const t=de.myGarden.get(),n=new Map,r=e?t.eggs.all.filter(o=>e.has(String(o.tileIndex))):t.eggs.all;for(const o of r){const a=n.get(o.eggId)||0;n.set(o.eggId,a+1);}return n}function ad(e,t){const n=t?Bl(t):Fl(),r=[];let o=0;for(const a of e){if(!Ll(a))continue;const i=eg(a);for(const s of bn){if(!a.abilities.includes(s))continue;const c=Zf(s);if(!c)continue;const d=tg(c.baseProbability,i);o+=d/100;}}for(const[a,i]of n){const s=i*o;r.push({eggId:a,value:s});}return r}function id(e,t){const n=t?Bl(t):Fl(),r=[];let o=0;for(const a of e){if(!Ll(a))continue;const i=eg(a);for(const s of xn){if(!a.abilities.includes(s))continue;const c=Zf(s);if(!c)continue;const d=tg(c.baseProbability,i);o+=d/100;}}for(const[a,i]of n){const s=i*o;r.push({eggId:a,value:s});}return r}function sd(e,t){const n=t?Bl(t):Fl(),r=Array.from(n.values()).reduce((f,g)=>f+g,0);let o=0,a=0;for(const f of e){if(!Ll(f))continue;yn.some(m=>f.abilities.includes(m))&&(o+=f.currentStrength*1e-4,a+=f.currentStrength*.001);}const i=Y.get("mutations");let s=1,c=.1;if(i){const f=i.Gold,g=i.Rainbow;f?.baseChance!==void 0&&(s=f.baseChance),g?.baseChance!==void 0&&(c=g.baseChance);}const d=s+a,l=c+o,u=r*d/100,p=r*l/100;return {goldChance:d,rainbowChance:l,expectedGold:u,expectedRainbow:p}}const Uk={id:"hatch",label:"Hatching",icon:"🥚",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const r=de.myInventory.get().items.filter(o=>o.itemType==="Egg").reduce((o,a)=>o+(a.quantity||1),0);return r===0?null:{text:`${r} eggs`,variant:"neutral",tooltip:`${r} eggs in inventory`,priority:6}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r,o)=>{n.innerHTML="";const a=We("div","hatching-stats-compact"),i=Ge(e,bn),s=Ge(e,xn),c=Ge(e,yn);if(!i&&!s&&!c)return;const d=[e];if(i){const l=ad(d,o);l.length>0&&a.appendChild(Go("DOUBLE HATCH",l));}if(s){const l=id(d,o);l.length>0&&a.appendChild(Go("PET REFUND",l));}if(c){const l=sd(d,o),u=l.rainbowChance.toFixed(4),p=l.goldChance.toFixed(2),f=l.expectedRainbow<.01?`~${(l.expectedRainbow*100).toFixed(1)}%e`:l.expectedRainbow.toFixed(2),g=l.expectedGold.toFixed(2);a.appendChild(od(u,p,f,g));}n.appendChild(a);},renderGroupedSlot:(e,t,n,r,o)=>{n.innerHTML="";const a=We("div","hatching-stats-compact"),i=e.some(d=>Ge(d,bn)),s=e.some(d=>Ge(d,xn)),c=e.some(d=>Ge(d,yn));if(!(!i&&!s&&!c)){if(i){const d=ad(e,o);d.length>0&&a.appendChild(Go("DOUBLE HATCH",d));}if(s){const d=id(e,o);d.length>0&&a.appendChild(Go("PET REFUND",d));}if(c){const d=sd(e,o),l=d.rainbowChance.toFixed(4),u=d.goldChance.toFixed(2),p=d.expectedRainbow<.01?`~${(d.expectedRainbow*100).toFixed(1)}%e`:d.expectedRainbow.toFixed(2),f=d.expectedGold.toFixed(2);a.appendChild(od(l,u,p,f));}n.appendChild(a);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(r=>Ge(r,bn)||Ge(r,xn)||Ge(r,yn)),shouldDisplay:(e,t,n)=>{const o=(Xa.ALLOWED_PANELS[n.primary]||[]).includes("hatch"),a=t.some(i=>Ge(i,bn)||Ge(i,xn)||Ge(i,yn));return o&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let r=0;return n.some(o=>Ge(o,bn))&&r++,n.some(o=>Ge(o,xn))&&r++,n.some(o=>Ge(o,yn))&&r++,r}},ld=[Fk,Bk,gs,Uk];function Wk(e){let t=e;return t=t.replace(/_NEW$/,""),t=t.replace(/^Snowy/,""),t=t.replace(/(I|II|III|IV)$/,""),t}function ng(e){return new Set(e.abilities.map(Wk))}function tr(e,t){if(e.size!==t.size)return  false;for(const n of e)if(!t.has(n))return  false;return  true}function cd(e,t){return ng(e).has(t)}function Vk(e,t){if(e.length<2)return {shouldGroup:false,matchingPets:[],remainingPets:e};if(t){const i=t==="egg"?"EggGrowthBoost":"PlantGrowthBoost",s=e.filter(d=>cd(d,i)),c=e.filter(d=>!cd(d,i));return s.length>=2?{shouldGroup:true,matchingPets:s,remainingPets:c}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const n=e.map(i=>({pet:i,abilities:ng(i)}));if(e.length===3){const[i,s,c]=n;if(tr(i.abilities,s.abilities)&&tr(i.abilities,c.abilities))return {shouldGroup:true,matchingPets:[i.pet,s.pet,c.pet],remainingPets:[]}}const[r,o,a]=n;return tr(r.abilities,o.abilities)?{shouldGroup:true,matchingPets:[r.pet,o.pet],remainingPets:a?[a.pet]:[]}:a&&tr(r.abilities,a.abilities)?{shouldGroup:true,matchingPets:[r.pet,a.pet],remainingPets:[o.pet]}:a&&tr(o.abilities,a.abilities)?{shouldGroup:true,matchingPets:[o.pet,a.pet],remainingPets:[r.pet]}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const Xk=3;function qk(e,t){const n=e.abilities||[],r=d=>n.some(l=>d.includes(l));if((r(V.DOUBLE_HATCH)||r(V.PET_REFUND)||r(V.PET_MUTATION)||r(V.MAX_STR_BOOST))&&t.some(d=>d.id==="hatch"))return "hatch";if((r(V.COIN_FINDER)||r(V.SELL_BOOST)||r(V.CROP_REFUND_HARVEST)||r(V.CROP_SIZE)||r(V.CROP_MUTATION)||r(V.RARE_GRANTERS)||r(V.COMMON_GRANTERS))&&t.some(d=>d.id==="coin"))return "coin";if((r(V.EGG_GROWTH)||r(V.PLANT_GROWTH))&&t.some(d=>d.id==="growth"))return "growth";const s=e.currentStrength<e.maxStrength,c=r(V.XP_BOOST);return (s||c)&&t.some(d=>d.id==="xp")?"xp":t[0]?.id||"xp"}class Kk{constructor(t){R(this,"expandedTeams",new Map);R(this,"featureUpdateInterval",null);R(this,"options");R(this,"tileFilter");this.options=t;}setTileFilter(t){this.tileFilter=t,this.refreshAllPanels();}refreshAllPanels(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t,n=false,r){const o=this.options.getListContainer(),a=ie.getTeam(t);if(!a||!o)return;const i=ie.getPetsForTeam(a),s=de.myPets.get(),c=Bo(a),d=ld.filter(v=>!(!v.isAvailable()||v.shouldDisplay&&!v.shouldDisplay(a,i,c)));if(d.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const l=c.primary==="time-reduction"||Pn(i)||An(i);let u;if(l){const v=Pn(i),T=An(i),h=de.myGarden.get(),w=h.eggs.growing.length>0,_=h.crops.growing.length>0;v&&T?_&&!w?u="plant":w&&!_?u="egg":u="plant":T?u="plant":v&&(u="egg");}const p=x("div",{className:"team-expanded-container"}),f=[];let g=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,u);const m=d.some(v=>v.id==="growth"||v.id==="hatch"||v.id==="coin");if(g.shouldGroup&&!m&&(g.matchingPets.every(T=>T.currentStrength>=T.maxStrength)||(g={shouldGroup:false,matchingPets:[],remainingPets:i})),g.shouldGroup&&g.matchingPets.length>=2){const v=d.filter(w=>!w.hasContent||w.hasContent(g.matchingPets,a)),T=v.find(w=>w.id==="growth"||w.id==="hatch"||w.id==="coin")||v[0]||d[0],h=this.createGroupedPetRow(a,g.matchingPets,d,T,u,t);p.appendChild(h.container),f.push(h.cardState);for(const w of g.remainingPets){const _=a.petIds.indexOf(w.id),k=this.createIndividualPetRow(a,w,_,d,u,t);p.appendChild(k.container),f.push(k.cardState);}}else for(let v=0;v<3;v++){const T=a.petIds[v],h=T?s.all.find(_=>_.id===T)??null:null,w=this.createIndividualPetRow(a,h,v,d,u,t,r);p.appendChild(w.container),f.push(w.cardState);}this.expandedTeams.set(t,{cards:f,expandedAt:Date.now(),container:p,growthViewType:u});const b=r==="xp"?"xp":r==="growth"?"growth":void 0;this.addProgressBar(p,i,t,b);const S=ie.getAllTeams().findIndex(v=>v.id===t),C=Array.from(o.children).filter(v=>v instanceof HTMLElement&&v.classList.contains("team-list-item"));S!==-1&&S<C.length&&C[S].insertAdjacentElement("afterend",p),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const r of n.cards)r.shell&&r.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,r,o){const a=ie.getTeam(r),i=a?Bo(a):null,s=this.expandedTeams.get(r),c=i?.primary==="time-reduction"||Pn(n)||An(n),d=o??(c?"growth":"xp");s&&(s.currentBarMode=d),d==="growth"?this.renderGrowthSummaryBar(t,n,r):this.renderXpProgressBar(t,n);}updateProgressBarForFeature(t,n){const r=this.expandedTeams.get(t);if(!r)return;const o=ie.getTeam(t);if(!o||n!=="xp"&&n!=="growth")return;const a=ie.getPetsForTeam(o),i=n==="xp"?"xp":"growth";if(r.currentBarMode===i)return;const s=r.container.querySelector(".growth-summary-overhaul"),c=r.container.querySelector(".team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)");s&&s.remove(),c&&c.remove(),this.addProgressBar(r.container,a,t,i);}renderXpProgressBar(t,n){if(n.some(o=>o.currentStrength<o.maxStrength)&&n.length>0){const o=Math.round(n.reduce((d,l)=>d+l.currentStrength/l.maxStrength,0)/n.length*100),a=x("div",{className:"team-progress-bar"}),i=o<33?"low":o<67?"medium":"high",s=x("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});s.style.width=`${o}%`;const c=x("div",{className:"team-progress-bar__percent",textContent:`${o}%`});a.appendChild(s),a.appendChild(c),t.prepend(a);}}renderGrowthSummaryBar(t,n,r){const o=this.expandedTeams.get(r),a=o?.growthViewType||"plant",i=de.myGarden.get(),s=Date.now(),c=a==="egg"?i.eggs.growing:i.crops.growing,d=this.tileFilter?c.filter(U=>this.tileFilter.has(U.tileIndex)):c,l=d.length,u=_l(n),p=Tl(n),f=zr(u).timeReductionPerHour,g=zr(p).timeReductionPerHour,m=Math.round(a==="egg"?f:g);let b=l>0?0:100;if(l>0){const U=(60+m)/60;b=Math.round(d.reduce((O,$)=>{const z=a==="egg"?$.plantedAt:$.startTime,D=a==="egg"?$.maturedAt:$.endTime,I=s-z,B=(D-s)/U,W=I+B,be=W>0?I/W*100:0;return O+Math.min(100,Math.max(0,be))},0)/l);}let y=d.find(U=>U.tileIndex===o?.pinnedItemId);!y&&l>0&&(y=[...d].sort((U,O)=>{const $=a==="egg"?U.maturedAt:U.endTime,z=a==="egg"?O.maturedAt:O.endTime;return $-z})[0]);const S=x("div",{className:"growth-summary-overhaul"}),C=x("div",{className:`team-progress-bar team-progress-bar--${a}`}),v=x("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});v.style.width=`${b}%`;const T=U=>{const O=Math.floor(U/60),$=U%60;return O>0&&$>0?`${O}h ${$}m/h`:O>0?`${O}h/h`:`${$}m/h`};m>0&&((60+m)/60).toFixed(2)+"";const h=x("div",{className:"team-progress-bar__overlay"});h.innerHTML=`
            <span class="bar-percent">${b}%</span>
            <span class="bar-info">${l} total +${T(m)}</span>
        `,C.appendChild(v),C.appendChild(h);const w=x("div",{className:"growth-next-item"});if(y){let U=a==="egg"?y.eggId:y.species;const O=a==="egg"?"pet":"plant";a==="plant"&&U&&(U==="DawnCelestial"&&(U="DawnCelestialCrop"),U==="MoonCelestial"&&(U="MoonCelestialCrop"));const $=a==="egg"?y.maturedAt:y.endTime;a==="egg"?y.plantedAt:y.startTime;const z=(60+m)/60,D=Math.max(0,Math.round(($-s)/z)),I=s+D,F=new Date(I),B=F.getDate()!==new Date().getDate(),W=F.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),be=`${B?"Tomorrow ":""}${W}`,ee=ue=>{const Ce=Math.floor(ue/1e3),St=Math.floor(Ce/60),fn=Math.floor(St/60);return fn>0?`${fn}h ${St%60}m ${Ce%60}s`:St>0?`${St}m ${Ce%60}s`:`${Ce}s`},Q=x("div",{className:"growth-next-sprite"});try{if(H.isReady()&&H.has(O,U)){const ue=H.toCanvas(O,U,{scale:.3});ue.style.height="20px",ue.style.width="auto",ue.style.imageRendering="pixelated",Q.appendChild(ue);}else Q.textContent=a==="egg"?"🥚":"🌱";}catch(ue){console.warn("[GrowthSummary] Sprite error:",ue),Q.textContent=a==="egg"?"🥚":"🌱";}w.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${ee(D)}</span>
                    <span class="growth-next-date">| ${be}</span>
                </div>
            `,w.prepend(Q);}else w.innerHTML='<span class="empty-text">No items growing</span>';const _=x("div",{className:"growth-overhaul-controls"}),k=a==="egg"?"UncommonEgg":"Carrot",P=a==="egg"?"pet":"plant";let E=null;try{H.isReady()&&H.has(P,k)&&(E=H.toCanvas(P,k,{scale:.35}));}catch{}const G=Ek({variant:a==="egg"?"egg":"plant",sprite:E,playSound:true,tooltip:`Switch to ${a==="egg"?"plants":"eggs"}`,onClick:U=>{U.stopPropagation(),o&&(o.growthViewType=a==="egg"?"plant":"egg",o.pinnedItemId=void 0,this.updateGrowthSummary(r));}}),J=x("button",{className:"growth-dropdown-overhaul",textContent:"▼"});J.onclick=U=>{U.stopPropagation(),this.showGrowthDropdown(J,d,a,r);},f>0&&g>0&&_.appendChild(G),_.appendChild(J),S.appendChild(C),S.appendChild(w),S.appendChild(_);const q=t.querySelector(".growth-summary-overhaul");q?q.replaceWith(S):t.prepend(S);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const r=ie.getTeam(t);if(!r)return;const o=ie.getPetsForTeam(r);this.renderGrowthSummaryBar(n.container,o,t);const a=this.analyzeTeamForGrouping(r,o,n.growthViewType),i=n.cards.some(c=>c.slotIndex===-1),s=a.shouldGroup&&a.matchingPets.length>=2;if(i!==s){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}if(i&&s){const c=n.cards.find(d=>d.slotIndex===-1);if(c?.shell&&(c.shell.root.classList.contains("base-pet-card--grouped")?3:c.shell.root.classList.contains("base-pet-card--grouped-2")?2:0)!==a.matchingPets.length){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}}this.updateGroupedCardsViewType(t,n),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const r=ie.getTeam(t);if(!r)return;const o=de.myPets.get();for(const a of n.cards){const i=r.petIds[a.slotIndex],s=i?o.all.find(c=>c.id===i):null;if(s&&a.shell&&(a.shell.update(s),a.featureData.renderPetSlot))try{const c=a.shell.getContentSlot();a.featureData.renderPetSlot(s,r,c,n.growthViewType,this.tileFilter);const d=s.currentStrength>=s.maxStrength,l=c.children.length>0||c.textContent.trim().length>0;a.shell.setCentered(d&&!l);}catch(c){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,c);}}}updateGroupedCardsViewType(t,n){const r=ie.getTeam(t);if(r){for(const o of n.cards)if(o.slotIndex===-1&&o.shell){const a=o.shell.getContentSlot();if(o.featureData.renderGroupedSlot&&o.shell.root.classList.contains("base-pet-card--grouped")){a.innerHTML="";const i=ie.getPetsForTeam(r);o.featureData.renderGroupedSlot(i,r,a,n.growthViewType,this.tileFilter);const s=a.children.length>0||a.textContent.trim().length>0;o.shell.setCentered(!s);}}}}showGrowthDropdown(t,n,r,o){const a=document.querySelector(".growth-dropdown-menu");if(a){const d=a.getAttribute("data-owner-id")===o&&a.getAttribute("data-view-type")===r;if(a.remove(),d)return}const i=x("div",{className:"growth-dropdown-menu"});if(i.setAttribute("data-owner-id",o),i.setAttribute("data-view-type",r),n.length===0){const d=x("div",{className:"growth-dropdown-option"});d.textContent="No items growing",i.appendChild(d);}else {const d=r==="egg"?"pet":"plant";n.forEach(l=>{const u=l.tileIndex;let p=r==="egg"?l.eggId:l.species;r==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=x("div",{className:"growth-dropdown-option"}),g=x("span",{className:"dropdown-sprite"});try{if(H.isReady()&&H.has(d,p)){const C=H.toCanvas(d,p,{scale:.3});C.style.height="16px",C.style.width="auto",C.style.imageRendering="pixelated",g.appendChild(C);}else g.textContent=r==="egg"?"🥚":"🌱";}catch{g.textContent=r==="egg"?"🥚":"🌱";}const m=r==="egg"?l.maturedAt:l.endTime,y=new Date(m).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),S=x("span",{className:"dropdown-text"});S.textContent=`${p} - ${y}`,f.appendChild(g),f.appendChild(S),f.onclick=C=>{C.stopPropagation();const v=this.expandedTeams.get(o);v&&(v.pinnedItemId=u,this.updateGrowthSummary(o)),i.remove();},i.appendChild(f);});}const s=t.getBoundingClientRect();i.style.position="fixed",i.style.bottom=`${window.innerHeight-s.top+4}px`,i.style.top="auto",i.style.left="auto",i.style.right=`${window.innerWidth-s.right}px`,i.style.marginTop="0",i.style.zIndex="999999",document.body.appendChild(i);const c=d=>{!i.contains(d.target)&&d.target!==t&&(i.remove(),document.removeEventListener("click",c,true));};setTimeout(()=>document.addEventListener("click",c,true),10);}createIndividualPetRow(t,n,r,o,a,i,s){const c=n?o.filter(T=>!T.hasContent||T.hasContent(n,t)):o,d=c.length>0?c:o;let l=d[0];if(s)l=d.find(T=>T.id===s)||d[0];else if(n){const T=qk(n,d);l=d.find(h=>h.id===T)||d[0];}else {const h=Bo(t)?.suggestedFeatures||[];let w=false;for(const _ of h){const k=d.find(P=>P.id===_);if(k){l=k,w=true;break}}w||(a?l=d.find(_=>_.id==="growth")||d[0]:l=d.find(_=>_.id==="xp")||d[0]);}const u=x("div",{className:"expanded-pet-row"}),p=x("div",{className:"pet-row__header"}),f=x("button",{textContent:"<",className:"pet-row__nav"}),g=x("div",{textContent:`${l.icon} ${l.label.toUpperCase()}`,className:"pet-label"}),m=x("button",{textContent:">",className:"pet-row__nav"});let b=null;n&&(b=new Pk(n));const y={slotIndex:r,currentFeatureId:l.id,shell:b,featureData:l},S=T=>{const h=d[T];if(h.id==="growth"){const w=ie.getPetsForTeam(t),_=this.expandedTeams.get(i),k=this.analyzeTeamForGrouping(t,w,_?.growthViewType);if(k.shouldGroup&&k.matchingPets.length>=2){this.collapseAndReexpandForGrowth(i);return}}if(g.textContent=`${h.icon} ${h.label.toUpperCase()}`,b&&n){const w=b.getContentSlot();if(w.innerHTML="",h.renderPetSlot){const P=this.expandedTeams.get(i);h.renderPetSlot(n,t,w,P?.growthViewType,this.tileFilter);}const _=n.currentStrength>=n.maxStrength,k=w.children.length>0||w.textContent.trim().length>0;b.setCentered(_&&!k);}y.currentFeatureId=h.id,y.featureData=h,p.className=`pet-row__header pet-row__header--${h.id}`,this.updateProgressBarForFeature(i,h.id);};p.className=`pet-row__header pet-row__header--${l.id}`;let C=d.findIndex(T=>T.id===l.id);f.addEventListener("click",T=>{T.stopPropagation(),C=(C-1+d.length)%d.length,S(C);}),m.addEventListener("click",T=>{T.stopPropagation(),C=(C+1)%d.length,S(C);}),d.length>1&&p.appendChild(f),p.appendChild(g),d.length>1&&p.appendChild(m);let v;if(b&&n){if(v=b.build(),l.renderPetSlot){const T=b.getContentSlot();l.renderPetSlot(n,t,T,a,this.tileFilter);const h=n.currentStrength>=n.maxStrength,w=T.children.length>0||T.textContent.trim().length>0;b.setCentered(h&&!w);}}else v=x("div",{className:"pet-row__content pet-row__content--empty"}),v.innerHTML=`
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;return u.appendChild(p),u.appendChild(v),y.container=u,{container:u,cardState:y}}createGroupedPetRow(t,n,r,o,a,i){const s=r.filter(w=>!w.hasContent||w.hasContent(n,t)),c=s.length>0?s:r;if(this.shouldUseCombinedPanel(c,n,t,a))return this.createCombinedPanelRow(t,n,c,a,i);const d=x("div",{className:"expanded-pet-row expanded-pet-row--grouped"}),l=x("div",{className:"pet-row__header"}),u=x("button",{textContent:"<",className:"pet-row__nav"}),p=x("div",{textContent:`${o.icon} ${o.label.toUpperCase()}`,className:"pet-label"}),f=x("button",{textContent:">",className:"pet-row__nav"}),g=x("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),m=x("div",{className:"base-pet-card__left"}),b=x("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const w of n)try{const _=w.mutations||[];if(H.has("pet",w.petSpecies)){const k=H.toCanvas("pet",w.petSpecies,{mutations:_,scale:1,boundsMode:"padded"});k.style.imageRendering="pixelated",b.appendChild(k);}}catch{}m.appendChild(b);const y=x("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const w of n){const k=w.currentStrength>=w.maxStrength?`MAX ${w.maxStrength}`:`STR ${w.currentStrength}/${w.maxStrength}`,P=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:k});y.appendChild(P);}m.appendChild(y),g.appendChild(m);const S=x("div",{className:"base-pet-card__content"});g.appendChild(S);const C={root:g,getContentSlot:()=>S,setCentered:w=>{g.classList.toggle("base-pet-card--centered",w);},destroy:()=>{g.remove();},update:()=>{y.innerHTML="";for(const w of n){const k=w.currentStrength>=w.maxStrength?`MAX ${w.maxStrength}`:`STR ${w.currentStrength}/${w.maxStrength}`,P=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:k});y.appendChild(P);}}},v={slotIndex:-1,currentFeatureId:o.id,shell:C,featureData:o},T=w=>{const _=c[w];if(_.id==="xp"&&!n.every(E=>E.currentStrength>=E.maxStrength)){this.collapseAndReexpandForXP(i);return}if(p.textContent=`${_.icon} ${_.label.toUpperCase()}`,S.innerHTML="",_.renderGroupedSlot){const P=this.expandedTeams.get(i);_.renderGroupedSlot(n,t,S,P?.growthViewType,this.tileFilter);}else if(_.renderPetSlot){const P=this.expandedTeams.get(i);_.renderPetSlot(n[0],t,S,P?.growthViewType,this.tileFilter);}const k=S.children.length>0||S.textContent.trim().length>0;C.setCentered(!k),v.currentFeatureId=_.id,v.featureData=_,l.className=`pet-row__header pet-row__header--${_.id}`;};l.className=`pet-row__header pet-row__header--${o.id}`;let h=c.findIndex(w=>w.id===o.id);return u.addEventListener("click",w=>{w.stopPropagation(),h=(h-1+c.length)%c.length,T(h);}),f.addEventListener("click",w=>{w.stopPropagation(),h=(h+1)%c.length,T(h);}),c.length>1&&l.appendChild(u),l.appendChild(p),c.length>1&&l.appendChild(f),o.renderGroupedSlot?o.renderGroupedSlot(n,t,S,a,this.tileFilter):o.renderPetSlot&&o.renderPetSlot(n[0],t,S,a,this.tileFilter),d.appendChild(l),d.appendChild(g),g.classList.add("base-pet-card--grouped"),{container:d,cardState:{...v,container:d}}}collapseAndReexpandForXP(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,true,"xp"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,true,"xp"),n.container.style.opacity="1";});});}collapseAndReexpandForGrowth(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,false,"growth"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,false,"growth"),n.container.style.opacity="1";});});}rebuildInPlace(t,n,r){const o=this.expandedTeams.get(t);if(!o)return;const a=ie.getTeam(t);if(!a)return;const i=ie.getPetsForTeam(a),s=de.myPets.get(),c=this.getAvailableFeaturesForTeam(a,i),d=o.growthViewType;for(const m of o.cards)m.shell&&m.shell.destroy(),m.container&&m.container.parentNode&&m.container.remove();const l=o.container.querySelector(".team-progress-bar");l&&l.remove();const u=[];let p=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,d);const f=c.some(m=>m.id==="growth"||m.id==="hatch"||m.id==="coin");if(p.shouldGroup&&!f&&(p.matchingPets.every(b=>b.currentStrength>=b.maxStrength)||(p={shouldGroup:false,matchingPets:[],remainingPets:i})),p.shouldGroup&&p.matchingPets.length>=2){const m=c.filter(S=>!S.hasContent||S.hasContent(p.matchingPets,a)),b=m.find(S=>S.id==="growth"||S.id==="hatch"||S.id==="coin")||m[0]||c[0],y=this.createGroupedPetRow(a,p.matchingPets,c,b,d,t);o.container.appendChild(y.container),u.push(y.cardState);for(const S of p.remainingPets){const C=a.petIds.indexOf(S.id),v=this.createIndividualPetRow(a,S,C,c,d,t);o.container.appendChild(v.container),u.push(v.cardState);}}else for(let m=0;m<3;m++){const b=a.petIds[m],y=b?s.all.find(C=>C.id===b)??null:null,S=this.createIndividualPetRow(a,y,m,c,d,t,r);o.container.appendChild(S.container),u.push(S.cardState);}o.cards=u;const g=r==="xp"?"xp":r==="growth"?"growth":void 0;this.addProgressBar(o.container,i,t,g);}getAvailableFeaturesForTeam(t,n){return Bo(t),ld.filter(r=>r.isAvailable())}countTotalRows(t,n,r,o){let a=0;for(const i of t)i.countRows?a+=i.countRows(n,r,o):i.hasContent?.(n,r)&&(a+=1);return a}shouldUseCombinedPanel(t,n,r,o){return t.length<2?false:this.countTotalRows(t,n,r,o)<=Xk}createCombinedPanelRow(t,n,r,o,a){const i=x("div",{className:"expanded-pet-row expanded-pet-row--combined"}),s=x("div",{className:"pet-row__header pet-row__header--combined"}),c=x("span",{className:"combined-panel__icons",textContent:r.map(y=>y.icon).join(" ")});s.appendChild(c);const d=x("div",{textContent:"COMBINED",className:"pet-label"});s.appendChild(d);const l=x("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),u=x("div",{className:"base-pet-card__left"}),p=x("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const y of n)try{const S=y.mutations||[];if(H.has("pet",y.petSpecies)){const C=H.toCanvas("pet",y.petSpecies,{mutations:S,scale:1,boundsMode:"padded"});C.style.imageRendering="pixelated",p.appendChild(C);}}catch{}u.appendChild(p);const f=x("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const y of n){const C=y.currentStrength>=y.maxStrength?`MAX ${y.maxStrength}`:`STR ${y.currentStrength}/${y.maxStrength}`,v=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});f.appendChild(v);}u.appendChild(f),l.appendChild(u);const g=x("div",{className:"base-pet-card__content base-pet-card__content--combined"});for(const y of r){const S=x("div",{className:`combined-section combined-section--${y.id}`}),C=x("span",{className:"combined-section__icon",textContent:y.icon});S.appendChild(C);const v=x("div",{className:"combined-section__content"});y.renderGroupedSlot?y.renderGroupedSlot(n,t,v,o,this.tileFilter):y.renderPetSlot&&y.renderPetSlot(n[0],t,v,o,this.tileFilter),(v.children.length>0||v.textContent?.trim())&&(S.appendChild(v),g.appendChild(S));}l.appendChild(g);const b={slotIndex:-1,currentFeatureId:"combined",shell:{root:l,getContentSlot:()=>g,setCentered:y=>{l.classList.toggle("base-pet-card--centered",y);},destroy:()=>{l.remove();},update:()=>{f.innerHTML="";for(const y of n){const C=y.currentStrength>=y.maxStrength?`MAX ${y.maxStrength}`:`STR ${y.currentStrength}/${y.maxStrength}`,v=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:C});f.appendChild(v);}},build:()=>l},container:i,featureData:r[0]};return i.appendChild(s),i.appendChild(l),{container:i,cardState:b}}analyzeTeamForGrouping(t,n,r){const o=d=>(d.abilities||[]).some(u=>V.MAX_STR_BOOST.includes(u)||V.PET_MUTATION.includes(u)||V.DOUBLE_HATCH.includes(u)||V.PET_REFUND.includes(u)),a=n.filter(o);if(a.length>=2&&a.length<=3){const d=n.filter(l=>!a.includes(l));return {shouldGroup:true,matchingPets:a,remainingPets:d}}const i=["DoubleHarvest","ProduceRefund","ProduceRefundII"],s=d=>(d.abilities||[]).some(u=>i.includes(u)),c=n.filter(s);if(c.length>=2&&c.length<=3&&!c.some(l=>(l.abilities||[]).some(p=>V.EGG_GROWTH.includes(p)||V.PLANT_GROWTH.includes(p)||V.CROP_MUTATION.includes(p)))){const l=n.filter(u=>!c.includes(u));return {shouldGroup:true,matchingPets:c,remainingPets:l}}return Vk(n,r)}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=qe.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}const Yk={calculationScope:"all",selectedTileIndices:[],expandedTeamIds:[]};let Me=null,_i=null;async function Jk(){return Me||(_i||(_i=Vr("tab-trackers",{version:3,defaults:Yk})),Me=await _i,Me)}function Mn(){if(!Me)throw new Error("[TrackersState] State not initialized. Call initTrackersState() first.");return Me}function Qk(e){if(!Me)return;const t=Me.get();t.expandedTeamIds.includes(e)?Me.update({expandedTeamIds:t.expandedTeamIds.filter(r=>r!==e)}):Me.update({expandedTeamIds:[...t.expandedTeamIds,e]});}function Zk(e){Me&&Me.update({calculationScope:e});}function Ti(e){if(!Me)return;const t=Me.get();t.selectedTileIndices.includes(e)?Me.update({selectedTileIndices:t.selectedTileIndices.filter(r=>r!==e)}):Me.update({selectedTileIndices:[...t.selectedTileIndices,e]});}function e_(){Me&&Me.update({selectedTileIndices:[]});}class t_{constructor(t={}){R(this,"dropdown",null);R(this,"options");R(this,"isDragging",false);R(this,"dragSelectMode",null);this.options=t,document.addEventListener("pointerup",()=>{this.isDragging=false,this.dragSelectMode=null;});}build(){if(this.dropdown)return this.dropdown;this.dropdown=x("div",{className:"tile-grid-selector"});const t=this.buildHeader();this.dropdown.appendChild(t);const n=this.buildGrids();return this.dropdown.appendChild(n),this.dropdown}show(){this.dropdown||this.build(),this.dropdown&&!this.dropdown.parentElement&&(this.options.container||document.body).appendChild(this.dropdown),this.dropdown&&this.dropdown.classList.add("tile-grid-selector--visible"),this.renderGrids();}hide(){this.dropdown&&this.dropdown.classList.remove("tile-grid-selector--visible");}destroy(){this.dropdown?.parentElement&&this.dropdown.parentElement.removeChild(this.dropdown),this.dropdown=null;}buildHeader(){const t=x("div",{className:"tile-grid-selector__header"}),r=Mn().get().selectedTileIndices.length,o=x("div",{className:"tile-grid-selector__info",textContent:`${r} tile${r!==1?"s":""} selected`}),a=x("button",{className:"tile-grid-selector__btn",textContent:"Clear All"});a.addEventListener("click",()=>{e_(),this.renderGrids(),this.options.onChange&&this.options.onChange();});const i=x("button",{className:"tile-grid-selector__close-btn",textContent:"×",title:"Close"});return i.addEventListener("click",()=>{this.hide();}),t.appendChild(o),t.appendChild(a),t.appendChild(i),t}buildGrids(){const t=x("div",{className:"tile-grid-selector__grids"}),n=x("div",{className:"tile-grid-selector__grid",id:"tile-grid-1"}),r=x("div",{className:"tile-grid-selector__grid",id:"tile-grid-2"});return t.appendChild(n),t.appendChild(r),t}renderGrids(){const t=this.dropdown?.querySelector("#tile-grid-1"),n=this.dropdown?.querySelector("#tile-grid-2");if(!t||!n)return;t.innerHTML="",n.innerHTML="";const r=de.myGarden.get(),o=de.gameMap.get(),a=Mn().get();if(!r.garden||!o)return;const i=r.mySlotIndex;if(i===null)return;const s=o.userSlots[i];if(!s)return;const c=s.dirtTiles,d=new Set(a.selectedTileIndices),l=r.garden.tileObjects,u=[...new Set(c.map(h=>h.position.x))].sort((h,w)=>h-w);let p=0,f=u[Math.floor(u.length/2)];for(let h=1;h<u.length;h++){const w=u[h]-u[h-1];w>p&&(p=w,f=(u[h]+u[h-1])/2);}const g=c.filter(h=>h.position.x<f),m=c.filter(h=>h.position.x>=f),b=h=>{if(h.length===0)return {minX:0,maxX:9,minY:0,maxY:9};const w=h.map(k=>k.position.x),_=h.map(k=>k.position.y);return {minX:Math.min(...w),maxX:Math.max(...w),minY:Math.min(..._),maxY:Math.max(..._)}},y=b(g),S=b(m),C=new Map,v=new Map;for(const h of g){const w=h.position.x-y.minX,_=h.position.y-y.minY;C.set(`${_},${w}`,h);}for(const h of m){const w=h.position.x-S.minX,_=h.position.y-S.minY;v.set(`${_},${w}`,h);}for(let h=0;h<10;h++)for(let w=0;w<10;w++){const _=C.get(`${h},${w}`)||null,k=this.buildTileElement(_,_&&l[_.localIndex.toString()]||null,_?d.has(_.localIndex.toString()):false);t.appendChild(k);}for(let h=0;h<10;h++)for(let w=0;w<10;w++){const _=v.get(`${h},${w}`)||null,k=this.buildTileElement(_,_&&l[_.localIndex.toString()]||null,_?d.has(_.localIndex.toString()):false);n.appendChild(k);}const T=this.dropdown?.querySelector(".tile-grid-selector__info");T&&(T.textContent=`${d.size} tile${d.size!==1?"s":""} selected`);}buildTileElement(t,n,r){const o=x("button",{className:"tile-grid-selector__tile"});if(!t)return o.classList.add("tile-grid-selector__tile--null"),o.disabled=true,o;if(r&&o.classList.add("tile-grid-selector__tile--selected"),n?o.classList.add("tile-grid-selector__tile--occupied"):o.classList.add("tile-grid-selector__tile--empty"),n&&H.isReady()){const a=this.getSpriteForTileObject(n);a&&o.appendChild(a);}return o.addEventListener("pointerdown",a=>{a.preventDefault(),this.isDragging=true,this.dragSelectMode=r?"deselect":"select",Ti(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.();}),o.addEventListener("pointerenter",()=>{if(!this.isDragging||!this.dragSelectMode)return;const i=Mn().get().selectedTileIndices.includes(t.localIndex.toString());this.dragSelectMode==="select"&&!i?(Ti(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.()):this.dragSelectMode==="deselect"&&i&&(Ti(t.localIndex.toString()),this.renderGrids(),this.options.onChange?.());}),o}getSpriteForTileObject(t){try{if(t.objectType==="plant"){let n=t.species;if(n==="DawnCelestial"&&(n="DawnCelestialCrop"),n==="MoonCelestial"&&(n="MoonCelestialCrop"),H.has("plant",n)){const r=H.toCanvas("plant",n,{scale:.25});return r.style.height="100%",r.style.width="100%",r.style.objectFit="contain",r.style.imageRendering="pixelated",r}}else if(t.objectType==="egg"){const n=t.eggId;if(H.has("pet",n)){const r=H.toCanvas("pet",n,{scale:.25});return r.style.height="100%",r.style.width="100%",r.style.objectFit="contain",r.style.imageRendering="pixelated",r}}else if(t.objectType==="decor"){const n=t.decorId;if(H.has("decor",n)){const r=H.toCanvas("decor",n,{scale:.25});return r.style.height="100%",r.style.width="100%",r.style.objectFit="contain",r.style.imageRendering="pixelated",r}}}catch(n){console.warn("[TileGridSelector] Failed to load sprite:",n);}return null}}class n_{constructor(t){R(this,"card",null);R(this,"scopeControl",null);R(this,"scopeContainer",null);R(this,"content",null);R(this,"listContainer",null);R(this,"options");R(this,"tileGridOverlay",null);R(this,"expansionHandler");this.options=t,this.expansionHandler=new Kk({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createCard()}destroy(){this.expansionHandler.destroy(),this.scopeControl&&(this.scopeControl.destroy(),this.scopeControl=null),this.tileGridOverlay&&(this.tileGridOverlay.destroy?.(),this.tileGridOverlay=null),this.card=null,this.scopeContainer=null,this.content=null,this.listContainer=null;}render(){if(!this.card)return;if(!ie.isEnabled()){this.renderDisabledState();return}this.scopeContainer&&(this.scopeContainer.style.display="flex"),this.ensureScopeControl(),this.renderTeamList();}getListContainer(){return this.listContainer}createCard(){const t=x("div",{className:"tracker-card-wrapper"});this.scopeContainer=x("div",{className:"tracker-card__scope-container"}),t.appendChild(this.scopeContainer),this.content=x("div",{className:"tracker-card__content"}),t.appendChild(this.content);const n=Xe({title:"Trackers",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureScopeControl(){if(!this.scopeContainer)return;const t=Mn().get();if(!this.scopeControl){this.scopeControl=Xf({segments:[{id:"all",label:"All Tiles"},{id:"selected",label:"Selected Tiles"}],selected:t.calculationScope,onChange:n=>{const r=n;Zk(r),r==="selected"?this.showTileGridOverlay():this.tileGridOverlay?.hide(),this.renderTeamList();}}),this.scopeContainer.appendChild(this.scopeControl);return}this.scopeControl.getSelected()!==t.calculationScope&&this.scopeControl.select(t.calculationScope);}showTileGridOverlay(){this.tileGridOverlay||(this.tileGridOverlay=new t_({onChange:()=>{this.renderTeamList();},container:this.scopeContainer||void 0}),this.tileGridOverlay.build()),this.tileGridOverlay.show();}renderDisabledState(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.listContainer=null,this.scopeContainer&&(this.scopeContainer.style.display="none");const t=x("div",{className:"tracker-card__disabled-state"}),n=x("div",{textContent:"Pet Teams feature is not enabled",className:"tracker-card__disabled-message"});t.appendChild(n),this.content.replaceChildren(t);}renderTeamList(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.content.replaceChildren();const t=ie.getAllTeams(),n=ie.getActiveTeamId(),r=Mn().get(),o=r.calculationScope==="selected"?new Set(r.selectedTileIndices):void 0;if(this.expansionHandler.setTileFilter(o),t.length===0){this.renderEmptyState();return}this.listContainer=x("div",{className:"tracker-card__list-container"}),t.forEach(a=>{const i=n===a.id,s=r.expandedTeamIds.includes(a.id),c=Vf({team:a,isActive:i,hideDragHandle:true,isNameEditable:false,isExpanded:s,onExpandClick:()=>{this.handleExpandToggle(a.id);}});c.setAttribute("data-team-id",a.id),c.addEventListener("click",d=>{d.stopPropagation();}),this.listContainer.appendChild(c),s&&this.expansionHandler.expand(a.id);}),this.content.appendChild(this.listContainer);}renderEmptyState(){if(!this.content)return;const t=x("div",{className:"tracker-card__empty-state"}),n=x("div",{textContent:"No teams created yet.",className:"tracker-card__empty-message"}),r=x("div",{textContent:"Create teams in the Pets tab to view trackers.",className:"tracker-card__empty-hint"});t.appendChild(n),t.appendChild(r),this.content.appendChild(t);}handleExpandToggle(t){Qk(t),this.expansionHandler.toggle(t);const n=this.listContainer?.querySelector(`[data-team-id="${t}"]`);if(n){const r=Mn().get().expandedTeamIds.includes(t),o=n.querySelector(".team-list-item__expand");o&&o.classList.toggle("team-list-item__expand--open",r);}}}const r_=`
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
`,o_=`
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
`,a_=`
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

`,i_=`
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
`,s_=`
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
`,l_=`
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
`;class c_ extends sn{constructor(n){super({id:"tab-trackers",label:"Trackers"});R(this,"deps");R(this,"trackerCardPart",null);R(this,"unsubscribeMyPets");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Ke(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>ll);return {MGSprite:i}},void 0);await r.init(),await Jk();const o=n.getRootNode();this.injectStyles(o);const a=this.createGrid("12px");a.id="trackers",n.appendChild(a),this.initializeTrackerCard(a),this.unsubscribeMyPets=de.myPets.subscribeStable(()=>{this.trackerCardPart?.render();});}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.trackerCardPart&&(this.trackerCardPart.destroy(),this.trackerCardPart=null);}unmount(){this.destroy().catch(console.error),super.unmount();}injectStyles(n){ve(n,r_,"tracker-card-styles"),ve(n,o_,"tile-grid-overlay-styles"),ve(n,a_,"team-card-styles"),ve(n,i_,"feature-card-styles"),ve(n,s_,"team-xp-panel-styles"),ve(n,l_,"growth-panel-styles"),ve(n,Yf,"base-pet-card-styles"),ve(n,Nl,"badge-styles"),ve(n,Jf,"arcade-button-styles"),ve(n,qf,"gemini-icon-button-styles");}initializeTrackerCard(n){this.trackerCardPart||(this.trackerCardPart=new n_({setHUDOpen:this.deps?.setHUDOpen}));const r=this.trackerCardPart.build();n.appendChild(r),this.trackerCardPart.render();}}const d_=`
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
`;async function u_(){}const p_={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},dd={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},Ol={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},Dl={seed:"seed",tool:null,egg:null,decor:null},ud={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function f_(e,t){try{const n=Ol[t],r=Y.get(n);if(!r||typeof r!="object")return null;const o=r[e];if(!o)return null;const a=Dl[t];return (a?o[a]:o)?.spriteId??null}catch(n){return console.warn(`[ShopNotifier] Failed to get spriteId for ${e}:`,n),null}}function g_(e,t){try{const n=Ol[t],r=Y.get(n);if(!r||typeof r!="object")return null;const o=r[e];if(!o)return null;const a=Dl[t],s=(a?o[a]:o)?.rarity;return s?String(s).toLowerCase():null}catch{return null}}function m_(e,t){try{const n=Ol[t],r=Y.get(n);if(!r||typeof r!="object")return e;const o=r[e];if(!o)return e;const a=Dl[t];return (a?o[a]:o)?.name??e}catch(n){return console.warn(`[ShopNotifier] Failed to get name for ${e}:`,n),e}}function h_(e){const n=an.getTrackedItems().filter(r=>r.shopType===e).map(r=>r.itemId);return new Set(n)}function rg(e,t){const n=h_(t);return e.items.map(r=>({...r,rarity:g_(r.id,t),spriteId:f_(r.id,t),itemName:m_(r.id,t),isTracked:n.has(r.id)}))}function b_(e,t){const n=rg(e,t);return _s({columns:[{key:"icon",header:"",width:"40px",align:"center",sortable:false,render:a=>{const i=x("div",{className:"shop-item-icon"});if(a.spriteId){const s=H.toCanvas(a.spriteId);s?(s.style.maxWidth="32px",s.style.maxHeight="32px",s.style.width="auto",s.style.height="auto",s.style.imageRendering="auto",s.style.display="block",i.appendChild(s)):i.textContent=dd[t];}else i.textContent=dd[t];return i}},{key:"itemName",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(a,i)=>a.itemName.localeCompare(i.itemName,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",width:"120px",align:"left",sortable:true,sortFn:(a,i)=>{const s=a.rarity?ud[a.rarity.toLowerCase()]??999:999,c=i.rarity?ud[i.rarity.toLowerCase()]??999:999;return s-c},render:a=>{const i=x("div",{className:"shop-item-rarity"}),s=eo({variant:"rarity",rarity:a.rarity});return i.appendChild(s.root),i}},{key:"toggle",header:"Track",width:"60px",align:"center",sortable:false,render:a=>{const i=x("div",{className:"shop-item-toggle"}),s=Mr({checked:a.isTracked,size:"sm",onChange:c=>{a.isTracked=c,c?an.addTrackedItem(t,a.id):an.removeTrackedItem(t,a.id);}});return i.appendChild(s.root),i}}],data:n,maxHeight:360,stickyHeader:true,zebra:true,compact:true,getRowId:a=>a.id})}function x_(e){const{shopType:t}=e,n=fl(),r=n.getShop(t);let o=null,a=null,i=null;function s(){return a=b_(r,t),o=Xe({id:`shop-card-${t}`,title:p_[t],expandable:true,defaultExpanded:true,stateKey:`shop-${t}`,variant:"soft",padding:"none",divider:false},a.root),o.classList.add(`shop-card--${t}`),o}function c(){if(!a)return;const l=n.getShop(t),u=rg(l,t);a.setData(u);}function d(){i&&(i(),i=null),a&&(a.destroy(),a=null),o=null;}return i=n.subscribeStable(l=>{const u=l.byType[t];u&&JSON.stringify(r.items)!==JSON.stringify(u.items)&&(Object.assign(r,u),c());}),{root:s(),refresh:c,destroy:d}}const y_=["seed","tool","egg","decor"];class v_ extends sn{constructor(){super({id:"tab-shop-notifier",label:"Shop Alerts"});R(this,"sectionElement",null);R(this,"shopCards",new Map);}async build(n){await u_();const r=n.getRootNode();ve(r,d_,"shop-notifier-styles");const o=this.createGrid("12px");o.id="shop-notifier-section",this.sectionElement=o;const{MGData:a}=await Ke(async()=>{const{MGData:i}=await Promise.resolve().then(()=>ll);return {MGData:i}},void 0);await Promise.all([a.waitFor("plants"),a.waitFor("items"),a.waitFor("eggs"),a.waitFor("decor")]),this.buildParts(),n.appendChild(o);}render(n){super.render(n);}buildParts(){if(this.sectionElement)for(const n of y_){const r=x_({shopType:n});this.shopCards.set(n,r),this.sectionElement.appendChild(r.root);}}async destroy(){for(const n of this.shopCards.values())n.destroy?.();this.shopCards.clear(),this.sectionElement=null;}}const w_={Store:{select:me.select.bind(me),set:me.set.bind(me),subscribe:me.subscribe.bind(me),subscribeImmediate:me.subscribeImmediate.bind(me)},Globals:de,Modules:{Version:Is,Assets:ln,Manifest:Tt,Data:Y,Environment:qe,CustomModal:Sn,Sprite:H,Tile:Pt,Pixi:Ea,Audio:Na,Cosmetic:el,Calculators:Tp},Features:{AutoFavorite:gl,JournalChecker:Wp,BulkFavorite:ba,Achievements:Kp,Tracker:Uf,AntiAfk:tn,Pets:Wf,PetTeam:ie,XPTracker:ya,CropValueIndicator:Pr,CropSizeIndicator:Ar,ShopNotifier:an},WebSocket:{chat:nv,emote:rv,wish:ov,kickPlayer:av,setPlayerData:hp,usurpHost:iv,reportSpeakingStart:sv,setSelectedGame:lv,voteForGame:cv,requestGame:dv,restartGame:uv,ping:pv,checkWeatherStatus:mv,move:fv,playerPosition:bp,teleport:gv,moveInventoryItem:hv,dropObject:bv,pickupObject:xv,toggleFavoriteItem:Fa,putItemInStorage:Js,retrieveItemFromStorage:Qs,moveStorageItem:yv,logItems:vv,plantSeed:wv,waterPlant:Sv,harvestCrop:Cv,sellAllCrops:kv,purchaseDecor:_v,purchaseEgg:Tv,purchaseTool:Pv,purchaseSeed:Av,plantEgg:Iv,hatchEgg:Ev,plantGardenPlant:Mv,potPlant:Rv,mutationPotion:Nv,pickupDecor:Lv,placeDecor:Fv,removeGardenObject:Bv,placePet:xp,feedPet:Ov,petPositions:Dv,swapPet:yp,storePet:vp,namePet:$v,sellPet:Gv},_internal:{getGlobals:Ct,initGlobals:Lp,destroyGlobals:$S}};function S_(){const e=N;e.Gemini=w_,e.MGSprite=H,e.MGData=Y,e.MGPixi=Ea,e.MGAssets=ln,e.MGEnvironment=qe;}let Pi=null,Ai=null;function C_(){return Pi||(Pi=new Ew),Pi}function og(){return Ai||(Ai=new v_),Ai}function k_(e){return [new Em(e),new nk,new yk,og(),new Nk(e),new c_(e)]}async function __(){const e=og(),t=C_();await Promise.all([e.preload(),t.preload()]);}function T_(e){const{shadow:t,initialOpen:n}=e,r=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=x("div",{className:"gemini-tabbar"}),a=x("div",{className:"gemini-content",id:"content"}),i=x("div",{className:"gemini-resizer",title:"Resize"}),s=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,a,i);const c=x("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:c}}function P_(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:a,minWidth:i,maxWidth:s}=e;let c=i,d=s;function l(){const v=qe.detect(),T=Math.round(N.visualViewport?.width??N.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){const h=getComputedStyle(r.host),w=parseFloat(h.getPropertyValue("--inset-l"))||0,_=parseFloat(h.getPropertyValue("--inset-r"))||0,k=Math.max(280,T-Math.round(w+_));c=280,d=k;}else c=i,d=s;return {min:c,max:d}}function u(v){return Math.max(c,Math.min(d,Number(v)||a))}function p(v){const T=u(v);n.style.setProperty("--w",`${T}px`),o(T);}l();const f=qe.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const b=v=>{if(!m)return;v.preventDefault();const T=Math.round(N.innerWidth-v.clientX);p(T);},y=()=>{m&&(m=false,document.body.style.cursor="",N.removeEventListener("mousemove",b),N.removeEventListener("mouseup",y));},S=v=>{g&&(v.preventDefault(),m=true,document.body.style.cursor="ew-resize",N.addEventListener("mousemove",b),N.addEventListener("mouseup",y));};t.addEventListener("mousedown",S);function C(){t.removeEventListener("mousedown",S),N.removeEventListener("mousemove",b),N.removeEventListener("mouseup",y);}return {calculateResponsiveBounds:l,constrainWidthToLimits:u,setHudWidth:p,destroy:C}}function A_(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:a=true}=e;function i(c){const d=t.classList.contains("open");if(a&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",i,{capture:true});function s(){document.removeEventListener("keydown",i,{capture:true});}return {destroy:s}}const I_=`
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
`,E_=`
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
`,M_=`
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
`,R_=`
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
`,N_=`
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
  
`,L_=`
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
`,F_=`
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
`,B_=`
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
`,O_=`
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
`,D_=`
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
`,$_=`
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
`,G_=`
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
`,z_=`
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
`,H_=`
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
`,j_=`
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
`,U_=`
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
`,W_=`
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
`,V_=`
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
`,X_=`
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
`,q_=`
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
`,K_=`
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
`,Y_=`
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
`,J_=`
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
`,Q_={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Z_(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,Q_),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function eT(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function tT(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=ee=>ee.ctrlKey&&ee.shiftKey&&ee.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:b,shadow:y}=Z_(t),S=[[E_,"variables"],[M_,"primitives"],[R_,"utilities"],[I_,"hud"],[N_,"card"],[Nl,"badge"],[L_,"button"],[z_,"checkbox"],[F_,"input"],[B_,"label"],[O_,"navTabs"],[D_,"searchBar"],[$_,"select"],[G_,"switch"],[H_,"table"],[j_,"teamListItem"],[U_,"timeRangePicker"],[W_,"tooltip"],[V_,"slider"],[X_,"reorderableList"],[q_,"colorPicker"],[K_,"log"],[Y_,"segmentedControl"],[J_,"settings"],[Kf,"teamCard"],[Ap,"autoFavoriteSettings"]];for(let ee=0;ee<S.length;ee++){const[Q,ue]=S[ee];ve(y,Q,ue),ee%5===4&&await eT();}const{panel:C,tabbar:v,content:T,resizer:h,closeButton:w,wrapper:_}=T_({shadow:y,initialOpen:r});function k(ee){C.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:ee},bubbles:true})),a?.(ee);}function P(ee){const Q=C.classList.contains("open");C.classList.toggle("open",ee),C.setAttribute("aria-hidden",ee?"false":"true"),ee!==Q&&k(ee);}P(r),w.addEventListener("click",ee=>{ee.preventDefault(),ee.stopPropagation(),P(false);});const E=Cm({host:b,themes:i,initialTheme:s,onThemeChange:c}),G=P_({resizer:h,host:b,shadow:y,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});G.setHudWidth(n);const J=d({applyTheme:E.applyTheme,initialTheme:s,getCurrentTheme:E.getCurrentTheme,setHUDWidth:G.setHudWidth,setHUDOpen:P}),j=new _g(J,T,{applyTheme:E.applyTheme,getCurrentTheme:E.getCurrentTheme}),q=J.map(ee=>({id:ee.id,label:ee.label})),U=l&&J.some(ee=>ee.id===l)?l:q[0]?.id||"",O=kg(q,U,ee=>{j.activate(ee),u?.(ee);});O.root.style.flex="1 1 auto",O.root.style.minWidth="0",v.append(O.root,w);const $={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function z(){const ee=we(Se.CONFIG,{autoFavorite:{enabled:true},journalChecker:{enabled:true},pets:{enabled:true}});for(const[Q,ue]of Object.entries($))ee[ue]?.enabled??true?O.showTab(Q):O.hideTab(Q);}function D(ee){const{key:Q}=ee.detail;(Q===Se.CONFIG||Q==="feature:config")&&z();}window.addEventListener(Wl.STORAGE_CHANGE,D),z();let I=U;if(!O.isTabVisible(U)){const ee=O.getVisibleTabs();ee.length>0&&(I=ee[0]);}I&&j.activate(I);const F=A_({panel:C,onToggle:()=>P(!C.classList.contains("open")),onClose:()=>P(false),toggleCombo:p,closeOnEscape:f}),B=()=>{O.recalc();const ee=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;G.calculateResponsiveBounds(),G.setHudWidth(ee);};N.addEventListener("resize",B);const W=ee=>{const Q=ee.detail?.width;Q?G.setHudWidth(Q):G.setHudWidth(n),O.recalc();};b.addEventListener("gemini:layout-resize",W);function be(){window.removeEventListener(Wl.STORAGE_CHANGE,D),F.destroy(),G.destroy(),N.removeEventListener("resize",B),b.removeEventListener("gemini:layout-resize",W);}return {host:b,shadow:y,wrapper:_,panel:C,content:T,setOpen:P,setWidth:G.setHudWidth,sections:J,manager:j,nav:O,destroy:be}}const gr={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},zo={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function nT(){return {isOpen:we(gr.isOpen,zo.isOpen),width:we(gr.width,zo.width),theme:we(gr.theme,zo.theme),activeTab:we(gr.activeTab,zo.activeTab)}}function Ho(e,t){Ae(gr[e],t);}const rT="https://i.imgur.com/IMkhMur.png",oT="Stats";function aT(e){let t=e.iconUrl||rT;const n=e.ariaLabel||"Open MGH";let r=null,o=null,a=null,i=false,s=null,c=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],l=C=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(C):C.replace(/"/g,'\\"')}catch{return C}};function u(){const C=document.querySelector(d.map(T=>`button[aria-label="${l(T)}"]`).join(","));if(!C)return null;let v=C.parentElement;for(;v&&v!==document.body;){if(d.reduce((h,w)=>h+v.querySelectorAll(`button[aria-label="${l(w)}"]`).length,0)>=2)return v;v=v.parentElement;}return null}function f(C){const v=Array.from(C.querySelectorAll("button[aria-label]"));if(!v.length)return {refBtn:null,refWrapper:null};const T=v.filter(G=>G.dataset.mghBtn!=="true"&&(G.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),h=T.length?T:v,w=h.find(G=>(G.getAttribute("aria-label")||"").toLowerCase()===oT.toLowerCase())||null,_=h.length>=2?h.length-2:h.length-1,k=w||h[_],P=k.parentElement,E=P&&P.parentElement===C&&P.tagName==="DIV"?P:null;return {refBtn:k,refWrapper:E}}function g(C,v,T){const h=C.cloneNode(false);h.type="button",h.setAttribute("aria-label",v),h.title=v,h.dataset.mghBtn="true",h.style.pointerEvents="auto",h.removeAttribute("id");const w=document.createElement("img");return w.src=T,w.alt="MGH",w.style.pointerEvents="none",w.style.userSelect="none",w.style.width="76%",w.style.height="76%",w.style.objectFit="contain",w.style.display="block",w.style.margin="auto",h.appendChild(w),h.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation();try{e.onClick?.();}catch{}}),h}function m(){if(i)return  false;i=true;let C=false;try{const v=u();if(!v)return !1;s!==v&&(s=v);const{refBtn:T,refWrapper:h}=f(v);if(!T)return !1;o=v.querySelector('div[data-mgh-wrapper="true"]'),!o&&h&&(o=h.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),C=!0);const w=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=w),r||(r=g(T,n,t),o?o.appendChild(r):r.parentElement!==v&&v.appendChild(r),C=!0),o&&o.parentElement!==v&&(v.appendChild(o),C=!0);const _=v;if(_&&_!==c){try{S.disconnect();}catch{}c=_,S.observe(c,{childList:!0,subtree:!0});}return C}finally{i=false;}}const b=document.getElementById("App")||document.body;let y=null;const S=new MutationObserver(C=>{const v=C.every(h=>{const w=Array.from(h.addedNodes||[]),_=Array.from(h.removedNodes||[]),k=w.concat(_);if(k.length===0){const P=h.target;return o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))}return k.every(P=>!!(!(P instanceof HTMLElement)||o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))))}),T=C.some(h=>Array.from(h.removedNodes||[]).some(w=>w instanceof HTMLElement?!!(o&&(w===o||o.contains(w))||r&&(w===r||r.contains(w))):false));v&&!T||y===null&&(y=window.setTimeout(()=>{if(y=null,m()&&o){const w=o.parentElement;w&&w.lastElementChild!==o&&w.appendChild(o);}},150));});return m(),S.observe(b,{childList:true,subtree:true}),a=()=>S.disconnect(),()=>{try{a?.();}catch{}try{o?.remove();}catch{}}}const ag=[];function iT(){return ag.slice()}function sT(e){ag.push(e);}function ig(e){try{return JSON.parse(e)}catch{return}}function pd(e){if(typeof e=="string"){const t=ig(e);return t!==void 0?t:e}return e}function sg(e){if(e!=null){if(typeof e=="string"){const t=ig(e);return t!==void 0?sg(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function lT(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function re(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,a=(i,s)=>{if(sg(i)!==e)return;const d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return sT(a),a}const nr=new WeakSet,fd=new WeakMap;function cT(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:iT();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,f)=>{let g=p;for(const m of r){const b=m(g,o(f));if(b){if(b.kind==="drop")return {kind:"drop"};b.kind==="replace"&&(g=b.message);}}return g!==p?{kind:"replace",message:g}:void 0};let i=null,s=null,c=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(nr.has(f))return  true;const g=f.bind(p);function m(...b){const y=b.length===1?b[0]:b,S=pd(y),C=a(S,lT(t));if(C?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(C?.kind==="replace"){const v=C.message;return b.length>1&&Array.isArray(v)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",v),g(...v)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",v),g(v))}return g(...b)}nr.add(m),fd.set(m,f);try{p.sendMessage=m,nr.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return i=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||nr.has(f))return;function g(m){const b=pd(m),y=a(b,this);if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(y?.kind==="replace"){const S=y.message,C=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",S),f.call(this,C)}return f.call(this,m)}nr.add(g),fd.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(i){try{i();}catch{}i=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const lg=[];function dT(){return lg.slice()}function gd(e){lg.push(e);}function uT(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function pT(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Ii=Symbol.for("ariesmod.ws.handlers.patched");function Re(e,t){if(typeof e=="string"){const o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return gd(a),a}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return gd(r),r}function fT(e,t=dT(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Ii])return ()=>{};e[Ii]=true;const a={ws:e,pageWindow:r,debug:o},i=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=pT(u.data),f=uT(p);i({kind:"message",raw:u.data,data:p,type:f});},c=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>i({kind:"open",event:u}),l=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[Ii];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Re(gt.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Re(gt.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Re(gt.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Re(gt.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Re(gt.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Re(gt.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Re(gt.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Re(gt.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Re(gt.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Re(gt.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Re(At.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Re(At.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Re(At.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Re(At.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Re(At.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Re(At.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Re(At.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Re(At.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});re(L.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));re(L.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));re(L.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));re(L.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));re(L.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));re(L.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));re(L.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));re(L.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));re(L.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));re(L.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));re(L.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));re(L.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));re(L.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));re(L.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));re(L.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));re(L.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));re(L.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));re(L.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));re(L.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));re(L.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));re(L.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));re(L.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));re(L.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));re(L.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));re(L.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));re(L.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));re(L.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));re(L.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));re(L.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));re(L.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));re(L.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");re(L.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));re(L.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));re(L.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));re(L.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));re(L.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));re(L.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));re(L.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));re(L.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));re(L.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));re(L.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));re(L.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));re(L.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));re(L.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));re(L.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));re(L.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));re(L.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function gT(e={}){const t=e.pageWindow??N,n=e.pollMs??500,r=!!e.debug,o=[];o.push(K0(t,{debug:r})),o.push(cT({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null;const i=s=>{if(a){try{a();}catch{}a=null;}s&&(a=fT(s,e.handlers,{debug:r,pageWindow:t}));};return i(ma(t).ws),o.push(mp(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>ma(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(a){try{a();}catch{}a=null;}}}}let jo=null;function mT(e={}){return jo||(jo=gT(e),jo)}function hT(e,t){const n=new MutationObserver(o=>{for(const a of o)for(const i of a.addedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const s=i.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function bT(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const a of o.removedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const i=a.querySelectorAll(e);for(const s of i)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const cg=768,md=6,Ei=62,Mi=50,xT=.5,yT=.4,Uo=36,Wo=28,vT=6,ms=4,wT=8,ST=100,CT=200,hd=14,bd=3,kT=40,_T=50,xd=2147483646,mr="gemini-bulk-favorite-sidebar",TT="gemini-bulk-favorite-top-row",PT="gemini-bulk-favorite-bottom-row",hs="gemini-qol-bulkFavorite-styles",AT=`
/* Desktop: vertical scrollable list next to inventory */
#${mr} {
  display: flex;
  flex-direction: column;
  gap: ${vT}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${xd};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${ms}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${xd};
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

#${mr}::-webkit-scrollbar {
  width: 4px;
}

#${mr}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${mr}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${Ei}px;
  height: ${Ei}px;
  min-width: ${Ei}px;
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
  width: ${Mi}px;
  height: ${Mi}px;
  min-width: ${Mi}px;
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
  width: ${Uo}px;
  height: ${Uo}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${Wo}px;
  height: ${Wo}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${bd}px;
  right: ${bd}px;
  width: ${hd}px;
  height: ${hd}px;
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
  width: ${Uo}px;
  height: ${Uo}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${Wo}px;
  height: ${Wo}px;
  font-size: 14px;
}
`,IT='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',ET='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function MT(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:a}=e,i=x("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return i.dataset.species=t,i.appendChild(RT(t,o)),i.appendChild(NT(r)),i.appendChild(LT(t)),i.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),a();}),i}function RT(e,t){try{if(!H.isReady()||!H.has("plant",e))return yd(e);const n=t?yT:xT,r=H.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),yd(e)}}function yd(e){return x("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function NT(e){const t=x("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?IT:ET,t}function LT(e){return x("span",{className:"gemini-qol-bulkFavorite-label"},e)}let xt=null,yt=null,bt=null,oa=false,Ir=null,hr=false,Rn=null;const bs=[];function Vo(e){bs.push(e);}function FT(){for(const e of bs)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}bs.length=0;}function dg(){return window.innerWidth<=cg}function BT(e){return new Promise(t=>setTimeout(t,e))}function ug(){if(oa)return;if(document.getElementById(hs)){oa=true;return}const e=document.createElement("style");e.id=hs,e.textContent=AT,document.head.appendChild(e),oa=true;}function OT(){document.getElementById(hs)?.remove(),oa=false;}function DT(){const e=un().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const a=o;if(a.itemType!=="Produce")continue;const i=a.species,s=a.id;if(!i||!s)continue;const c=n.get(i);c?c.push(s):n.set(i,[s]);}const r=[];for(const[o,a]of n){const i=a.length>0&&a.every(s=>t.has(s));r.push({species:o,itemIds:a,allFavorited:i});}return r.sort((o,a)=>o.species.localeCompare(a.species)),r}async function $T(e){const t=un().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const i of t.items){const s=i;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(i=>i.favorited),a=o?r.filter(i=>i.favorited):r.filter(i=>!i.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${a.length}/${r.length} ${e}`);for(const i of a)Fa(i.id),await BT(kT);}function xs(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return MT({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>$T(n)})}function GT(e){const t=x("div",{id:mr}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-ST,CT);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+wT}px`,t.style.top=`${n.top}px`,t}function vd(e,t,n){const r=x("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+ms}px`:r.style.top=`${o.bottom+ms}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function wd(){const e=DT();dg()?HT(e):zT(e);}function zT(e){if(xt){if(xt.innerHTML="",e.length===0){xt.style.display="none";return}xt.style.display="flex";for(const t of e)xt.appendChild(xs(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function HT(e){if(!yt||!bt)return;if(yt.innerHTML="",bt.innerHTML="",e.length===0){yt.style.display="none",bt.style.display="none";return}yt.style.display="flex";const t=e.slice(0,md),n=e.slice(md);for(const r of t)yt.appendChild(xs(r,true));if(n.length>0){bt.style.display="flex";for(const r of n)bt.appendChild(xs(r,true));}else bt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function jT(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=cg)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,a=0;const i=e.querySelectorAll(".McFlex, .McGrid");for(const s of i){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const d=c.left+c.width/2,l=1-Math.abs(d-r)/r,p=c.width*c.height*l;p>a&&(o=s,a=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let Nn=null;function ys(){Nn&&clearTimeout(Nn),Nn=setTimeout(()=>{UT();},_T);}function UT(){const e=jT();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),Er(),ug(),Ir=e,dg()?(yt=vd(TT,e,"top"),bt=vd(PT,e,"bottom"),document.body.appendChild(yt),document.body.appendChild(bt)):(xt=GT(e),document.body.appendChild(xt)),wd(),Rn&&Rn(),Rn=un().subscribeFavorites(()=>{hr&&wd();});}function Er(){Nn&&(clearTimeout(Nn),Nn=null),Rn&&(Rn(),Rn=null),xt?.remove(),xt=null,yt?.remove(),yt=null,bt?.remove(),bt=null,Ir=null;}function WT(){Er();}async function vs(){if(!no().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}ug();const t=await $s.onChangeNow(o=>{const a=o==="inventory";a!==hr&&(hr=a,a?ys():Er());}),n=hT(".McGrid",()=>{hr&&(xt||yt||ys());}),r=bT(".McGrid",o=>{Ir&&Ir===o&&Er();});Vo(()=>t()),Vo(()=>n.disconnect()),Vo(()=>r.disconnect()),Vo(()=>{Er(),hr=false,Ir=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function ws(){FT(),OT(),console.log("🛑 [BulkFavorite] Stopped");}function VT(e){const t=no();t.enabled=e,e?vs():ws();}let Xo=false;const XT={init(){Xo||(vs(),Xo=true);},destroy(){Xo&&(ws(),Xo=false);},isEnabled(){return qp()},renderButton:ys,removeButton:WT,startWatching:vs,stopWatching:ws,setEnabled:VT};function qT(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=mp(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),mT({debug:false}),()=>{t?.(),t=null;}}async function KT(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Iu(),await _u({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function YT(e){e.logStep("Globals","Initializing global variables...");try{Lp(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function JT(e){e.logStep("API","Exposing Gemini API...");try{S_(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Ri(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function QT(e){e.logStep("HUD","Loading HUD preferences..."),await Ri();const t=nT();await Ri();const n=await tT({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Ho("width",r),onOpenChange:r=>Ho("isOpen",r),themes:xr,initialTheme:t.theme,onThemeChange:r=>Ho("theme",r),buildSections:r=>k_({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Ho("activeTab",r)});return await Ri(),e.logStep("HUD","HUD ready","success"),n}async function ZT(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Pp(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function eP(e){try{H.isReady()||await H.init(),Y.resolveSprites();const t=[],n=Y.get("plants");if(n)for(const c of Object.values(n))c?.seed?.spriteId&&t.push(c.seed.spriteId),c?.plant?.spriteId&&t.push(c.plant.spriteId),c?.crop?.spriteId&&t.push(c.crop.spriteId);const r=Y.get("pets");if(r)for(const c of Object.values(r))c?.spriteId&&t.push(c.spriteId);const o=Y.get("items");if(o)for(const c of Object.values(o))c?.spriteId&&t.push(c.spriteId);const a=Y.get("eggs");if(a)for(const c of Object.values(a))c?.spriteId&&t.push(c.spriteId);const i=Y.get("decor");if(i)for(const c of Object.values(i))c?.spriteId&&t.push(c.spriteId);const s=[...new Set(t)];s.length>0&&await H.warmup(s,()=>{},5);}catch(t){console.warn("[Bootstrap] Sprite warmup failed",t);}}async function tP(e){e.logStep("Sections","Preloading UI sections...");try{await __(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function nP(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:tn.init.bind(tn)},{name:"PetTeam",init:ie.init.bind(ie)},{name:"BulkFavorite",init:ba.init.bind(ba)},{name:"XPTracker",init:ya.init.bind(ya)},{name:"CropValueIndicator",init:Pr.init.bind(Pr)},{name:"CropSizeIndicator",init:Ar.init.bind(Ar)},{name:"ShopNotifier",init:an.init.bind(an)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const r=Ld();r.register({id:"bulkFavoriteInject",name:"Bulk Favorite Inject",description:"Quick favorite/unfavorite multiple mutations",injection:XT,storageKey:Se.BULK_FAVORITE,defaultEnabled:!1}),r.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:Pr.render,storageKey:Se.CROP_VALUE_INDICATOR,defaultEnabled:!1}),r.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:Ar.render,storageKey:Se.CROP_SIZE_INDICATOR,defaultEnabled:!1}),r.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(r){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",r);}}Xd();kx();(async function(){Rg();const e=Sg({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=qT(e),await KT(e),YT(e),JT(e),await ZT(e),await Promise.all([(async()=>{nP(e);})(),(async()=>{await eP(e);})()]),await tP(e),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await QT(e);aT({onClick:()=>n.setOpen(true)});})();

})();