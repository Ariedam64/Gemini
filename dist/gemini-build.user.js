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
  var X0=Object.defineProperty;var J0=(e,t,n)=>t in e?X0(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var ve=(e,t,n)=>J0(e,typeof t!="symbol"?t+"":t,n);function x(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const Ja="https://i.imgur.com/k5WuC32.png",jf="gemini-loader-style",Or="gemini-loader",Fm=80;function Q0(){if(document.getElementById(jf))return;const e=document.createElement("style");e.id=jf,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Or} {
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
    #${Or} {
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

    #${Or}.gemini-loader--error .gemini-loader__actions {
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
    #${Or}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Or}.gemini-loader--error .gemini-loader__spinner {
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
      #${Or} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function Qa(e,t,n){const r=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Fm;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Z0(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Ja);return}GM_xmlhttpRequest({method:"GET",url:Ja,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(Ja),r.readAsDataURL(n);},onerror:()=>e(Ja)});})}function ex(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Q0();const n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=x("div",{className:"gemini-loader__logs"}),o=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=x("div",{className:"gemini-loader__spinner"},o);Z0().then(I=>{o.src=I;});const a=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},i,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=x("div",{id:Or},a);(document.body||document.documentElement).appendChild(s);const d=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(d),s.style.setProperty("--loader-blur",`${t}px`);const p=I=>{n.textContent=I;},c=new Map,h=(I,E)=>{I.className=`gemini-loader__log ${E}`;};return {log:(I,E="info")=>Qa(r,I,E),logStep:(I,E,M="info")=>{const R=String(I||"").trim();if(!R){Qa(r,E,M);return}const D=c.get(R);if(D){D.el.lastElementChild&&(D.el.lastElementChild.textContent=E),D.tone!==M&&(h(D.el,M),D.tone=M);return}const N=x("div",{className:`gemini-loader__log ${M}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:E}));for(c.set(R,{el:N,tone:M}),r.appendChild(N);r.childElementCount>Fm;){const P=r.firstElementChild;if(!P)break;const F=Array.from(c.entries()).find(([,L])=>L.el===P)?.[0];F&&c.delete(F),P.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:p,succeed:(I,E=600)=>{I&&Qa(r,I,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),E);},fail:(I,E)=>{Qa(r,I,"error"),p("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",I,E);}}}const Gf=150,tx=30;function nx(e,t,n){const r=x("div",{className:"lg-pill",id:"pill"}),o=e.map(C=>{const _=x("button",{className:"lg-tab"},C.label);return _.setAttribute("data-target",C.id),_}),i=x("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=new Map(e.map(C=>[C.id,true])),s=new Map(o.map((C,_)=>[e[_].id,C]));function d(C){const _=document.createElementNS("http://www.w3.org/2000/svg","svg");_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.setAttribute("stroke","currentColor"),_.setAttribute("stroke-width","2"),_.setAttribute("stroke-linecap","round"),_.setAttribute("stroke-linejoin","round");const z=document.createElementNS("http://www.w3.org/2000/svg","polyline");return z.setAttribute("points",C==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),_.appendChild(z),_}const p=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});p.appendChild(d("left"));const c=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});c.appendChild(d("right"));const b=x("div",{className:"lg-tabs-wrapper"},p,i,c);let y=0,g=0,S=false;function I(){const C=i.scrollLeft>0,_=i.scrollLeft<i.scrollWidth-i.clientWidth-1;p.classList.toggle("disabled",!C),c.classList.toggle("disabled",!_);}p.addEventListener("click",()=>{i.scrollBy({left:-Gf,behavior:"smooth"}),setTimeout(I,300);}),c.addEventListener("click",()=>{i.scrollBy({left:Gf,behavior:"smooth"}),setTimeout(I,300);}),i.addEventListener("wheel",C=>{Math.abs(C.deltaY)>Math.abs(C.deltaX)&&(C.preventDefault(),i.scrollLeft+=C.deltaY,I());},{passive:false});let E=0;i.addEventListener("touchstart",C=>{const _=C.touches[0];y=_.clientX,g=_.clientY,S=false,E=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",C=>{if(S)return;const _=C.touches[0],z=_.clientX-y,j=_.clientY-g;if(Math.abs(j)>Math.abs(z)){S=true;return}Math.abs(z)>tx&&(C.preventDefault(),i.scrollLeft=E-z);},{passive:false}),i.addEventListener("touchend",()=>{I();},{passive:true}),i.addEventListener("scroll",I,{passive:true});function M(C){const _=o.find(z=>z.dataset.target===C)||o[0];_&&requestAnimationFrame(()=>{const z=_.offsetLeft,j=_.offsetWidth;r.style.width=`${j}px`,r.style.transform=`translateX(${z}px)`;const V=i.scrollLeft,U=V,ce=V+i.clientWidth,K=z-12,ie=z+j+12;K<U?i.scrollTo({left:K,behavior:"smooth"}):ie>ce&&i.scrollTo({left:ie-i.clientWidth,behavior:"smooth"}),setTimeout(I,300);});}function R(){for(const[C,_]of a)if(_)return C;return null}function D(C){const _=s.get(C);if(_)if(a.set(C,false),_.style.display="none",F===C){const z=R();z&&L(z);}else P();}function N(C){const _=s.get(C);_&&(a.set(C,true),_.style.display="",P());}function P(){M(F),I();}let F=t||(e[0]?.id??"");function L(C){a.get(C)&&(F=C,o.forEach(_=>_.classList.toggle("active",_.dataset.target===C)),M(C),n(C));}return o.forEach(C=>C.addEventListener("click",()=>L(C.dataset.target))),queueMicrotask(()=>{M(F),I();}),{root:b,activate:L,recalc:P,getActive:()=>F,showTab:N,hideTab:D,isTabVisible:C=>a.get(C)??false,getVisibleTabs:()=>[...a.entries()].filter(([C,_])=>_).map(([C])=>C)}}class Cr{constructor(t){ve(this,"id");ve(this,"label");ve(this,"container",null);ve(this,"cleanupFunctions",[]);ve(this,"preloadedContent",null);ve(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=x("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class rx{constructor(t,n,r){ve(this,"sections");ve(this,"activeId",null);ve(this,"container");ve(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const fr="gemini:",ox={STATE:"hud:state",THEME:"hud:theme"},ix={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test",AVATAR_LOADOUTS:"sections:avatar:loadouts"},ax={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds",AUDIO_NOTIFICATION_SETTINGS:"module:audio:notificationSettings"},sx={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},ct={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config",PET_HUNGER_NOTIFIER:"feature:petHungerNotifier:config",ARIES_API:"feature:ariesAPI:config",HARVEST_LOCKER:"feature:harvestLocker:config",EGG_LOCKER:"feature:eggLocker:config",DECOR_LOCKER:"feature:decorLocker:config",MISSING_VARIANTS_INDICATOR:"feature:missingVariantsIndicator:config",JOURNAL:"feature:journal:config"},Nr={ABILITIES_INJECT:"inject:abilitiesInject:config",JOURNAL_HINTS:"inject:journalHints:config",JOURNAL_FILTER_SORT:"inject:journalFilterSort:config",JOURNAL_ALL_TAB:"inject:journalAllTab:config"},lx={AUTO_RELOAD:"dev:auto-reload"},Bt={HUD:ox,SECTION:ix,MODULE:ax,GLOBAL:sx,FEATURE:ct,INJECT:Nr,DEV:lx},mt={STORAGE_CHANGE:"gemini:storage:change",CUSTOM_SOUND_CHANGE:"gemini:custom-sound-change",HARVEST_LOCKER_LOCKS_UPDATED:"gemini:harvestLocker-locks-updated",EGG_LOCKER_LOCKS_UPDATED:"gemini:eggLocker-locks-updated",DECOR_LOCKER_LOCKS_UPDATED:"gemini:decorLocker-locks-updated"};function Qe(e,t){try{const n=e.startsWith(fr)?e:fr+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function tt(e,t){try{const n=e.startsWith(fr)?e:fr+e,r=e.startsWith(fr)?e.slice(fr.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function cx(e){try{const t=e.startsWith(fr)?e:fr+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function dx(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),s=o.slice(e.length);tt(s,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(tt("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Om="gemini.sections";function Nm(){const e=Qe(Om,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function ux(e){tt(Om,e);}async function px(e){return Nm()[e]}function fx(e,t){const n=Nm();ux({...n,[e]:t});}function zo(e,t){return {...e,...t??{}}}async function hx(e){const t=await px(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((p=>JSON.parse(JSON.stringify(p)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){fx(e.path,n);}function i(){return n}function a(p){n=e.sanitize?e.sanitize(p):p,o();}function s(p){const h=Object.assign((b=>JSON.parse(JSON.stringify(b)))(n),{});typeof p=="function"?p(h):Object.assign(h,p),n=e.sanitize?e.sanitize(h):h,o();}function d(){o();}return {get:i,set:a,update:s,save:d}}async function io(e,t){const{path:n=e,...r}=t;return hx({path:n,...r})}let mx=0;const Za=new Map;function lt(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:d=true,onExpandChange:p,mediaTop:c,title:h,subtitle:b,badge:y,actions:g,footer:S,divider:I=false,tone:E="neutral",stateKey:M}=e,R=x("div",{className:"card",id:n,tabIndex:a?0:void 0});R.classList.add(`card--${o}`,`card--p-${i}`),a&&R.classList.add("card--interactive"),E!=="neutral"&&R.classList.add(`card--tone-${E}`),r&&R.classList.add(...r.split(" ").filter(Boolean)),s&&R.classList.add("card--expandable");const D=s?M??n??(typeof h=="string"?`title:${h}`:null):null;let N=!s||d;D&&Za.has(D)&&(N=!!Za.get(D));let P=null,F=null,L=null,C=null,_=null;const z=n?`${n}-collapse`:`card-collapse-${++mx}`,j=()=>{if(C!==null&&(cancelAnimationFrame(C),C=null),_){const se=_;_=null,se();}},V=(se,ae)=>{if(!L)return;j();const ne=L;if(ne.setAttribute("aria-hidden",String(!se)),!ae){ne.classList.remove("card-collapse--animating"),ne.style.display=se?"":"none",ne.style.height="",ne.style.opacity="";return}if(ne.classList.add("card-collapse--animating"),ne.style.display="",se){ne.style.height="auto";const B=ne.scrollHeight;if(!B){ne.classList.remove("card-collapse--animating"),ne.style.display="",ne.style.height="",ne.style.opacity="";return}ne.style.height="0px",ne.style.opacity="0",ne.offsetHeight,C=requestAnimationFrame(()=>{C=null,ne.style.height=`${B}px`,ne.style.opacity="1";});}else {const B=ne.scrollHeight;if(!B){ne.classList.remove("card-collapse--animating"),ne.style.display="none",ne.style.height="",ne.style.opacity="";return}ne.style.height=`${B}px`,ne.style.opacity="1",ne.offsetHeight,C=requestAnimationFrame(()=>{C=null,ne.style.height="0px",ne.style.opacity="0";});}const Y=()=>{ne.classList.remove("card-collapse--animating"),ne.style.height="",se||(ne.style.display="none"),ne.style.opacity="";};let Z=null;const O=B=>{B.target===ne&&(Z!==null&&(clearTimeout(Z),Z=null),ne.removeEventListener("transitionend",O),ne.removeEventListener("transitioncancel",O),_=null,Y());};_=()=>{Z!==null&&(clearTimeout(Z),Z=null),ne.removeEventListener("transitionend",O),ne.removeEventListener("transitioncancel",O),_=null,Y();},ne.addEventListener("transitionend",O),ne.addEventListener("transitioncancel",O),Z=window.setTimeout(()=>{_?.();},420);};function U(se){const ae=document.createElementNS("http://www.w3.org/2000/svg","svg");return ae.setAttribute("viewBox","0 0 24 24"),ae.setAttribute("width","16"),ae.setAttribute("height","16"),ae.innerHTML=se==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',ae}function ce(se,ae=true,ne=true){N=se,R.classList.toggle("card--collapsed",!N),R.classList.toggle("card--expanded",N),P&&(P.dataset.expanded=String(N),P.setAttribute("aria-expanded",String(N))),F&&(F.setAttribute("aria-expanded",String(N)),F.classList.toggle("card-toggle--collapsed",!N),F.setAttribute("aria-label",N?"Replier le contenu":"Deplier le contenu"),F.replaceChildren(U(N?"up":"down"))),s?V(N,ne):L&&(L.style.display="",L.style.height="",L.style.opacity="",L.setAttribute("aria-hidden","false")),ae&&p&&p(N),D&&Za.set(D,N);}if(c){const se=x("div",{className:"card-media"});se.append(c),R.appendChild(se);}const K=!!(h||b||y||g&&g.length||s);if(K){P=x("div",{className:"card-header"});const se=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(h){const Y=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},h);y&&Y.append(typeof y=="string"?x("span",{className:"badge"},y):y),se.appendChild(Y);}if(b){const Y=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},b);se.appendChild(Y);}(se.childNodes.length||s)&&P.appendChild(se);const ae=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),ne=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(Y=>ne.appendChild(Y)),ne.childNodes.length&&ae.appendChild(ne),s&&(F=x("button",{className:"card-toggle",type:"button",ariaExpanded:String(N),ariaControls:z,ariaLabel:N?"Replier le contenu":"Deplier le contenu"}),F.textContent=N?"▲":"▼",F.addEventListener("click",Y=>{Y.preventDefault(),Y.stopPropagation(),ce(!N);}),ae.appendChild(F),P.classList.add("card-header--expandable"),P.addEventListener("click",Y=>{const Z=Y.target;Z?.closest(".card-actions")||Z?.closest(".card-toggle")||ce(!N);})),ae.childNodes.length&&P.appendChild(ae),R.appendChild(P);}L=x("div",{className:"card-collapse",id:z,ariaHidden:s?String(!N):"false"}),R.appendChild(L),I&&K&&L.appendChild(x("div",{className:"card-divider"}));const ie=x("div",{className:"card-body"});if(ie.append(...t),L.appendChild(ie),S){I&&L.appendChild(x("div",{className:"card-divider"}));const se=x("div",{className:"card-footer"});se.append(S),L.appendChild(se);}return F&&F.setAttribute("aria-controls",z),ce(N,false,false),D&&Za.set(D,N),R}let nl=false;const rl=new Set,un=e=>{const t=document.activeElement;for(const n of rl)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function gx(){nl||(nl=true,window.addEventListener("keydown",un,true),window.addEventListener("keypress",un,true),window.addEventListener("keyup",un,true),document.addEventListener("keydown",un,true),document.addEventListener("keypress",un,true),document.addEventListener("keyup",un,true));}function bx(){nl&&(rl.size>0||(nl=false,window.removeEventListener("keydown",un,true),window.removeEventListener("keypress",un,true),window.removeEventListener("keyup",un,true),document.removeEventListener("keydown",un,true),document.removeEventListener("keypress",un,true),document.removeEventListener("keyup",un,true)));}let $r=null;const Sd=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),$r!==null&&(window.clearTimeout($r),$r=null),document.removeEventListener("click",Sd,true);};function vx(){document.addEventListener("click",Sd,true),$r!==null&&window.clearTimeout($r),$r=window.setTimeout(()=>{document.removeEventListener("click",Sd,true),$r=null;},500);}function eo(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:d,onOpenChange:p}=e,c=x("div",{className:"select",id:t}),h=x("button",{className:"select-trigger",type:"button"}),b=x("span",{className:"select-value"},o),y=x("span",{className:"select-caret"},"▾");h.append(b,y);const g=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});c.classList.add(`select--${i}`);let S=false,I=n,E=null,M=!!a;function R(Y){return Y==null?o:(e.options||r).find(O=>O.value===Y)?.label??o}function D(Y){b.textContent=R(Y),g.querySelectorAll(".select-option").forEach(Z=>{const O=Z.dataset.value,B=Y!=null&&O===Y;Z.classList.toggle("selected",B),Z.setAttribute("aria-selected",String(B));});}function N(Y){g.replaceChildren(),Y.forEach(Z=>{const O=x("button",{className:"select-option"+(Z.disabled?" disabled":""),type:"button",role:"option","data-value":Z.value,"aria-selected":String(Z.value===I),tabindex:"-1"},Z.label);Z.value===I&&O.classList.add("selected"),Z.disabled||O.addEventListener("pointerdown",B=>{B.preventDefault(),B.stopPropagation(),B.pointerType&&B.pointerType!=="mouse"&&vx(),z(Z.value,{notify:true}),C();},{capture:true}),g.appendChild(O);});}function P(){h.setAttribute("aria-expanded",String(S)),g.setAttribute("aria-hidden",String(!S));}function F(){const Y=h.getBoundingClientRect();Object.assign(g.style,{minWidth:`${Y.width}px`});}function L(){S||M||(S=true,c.classList.add("open"),P(),F(),document.addEventListener("mousedown",K,true),document.addEventListener("scroll",ie,true),window.addEventListener("resize",se),g.focus({preventScroll:true}),s&&(gx(),rl.add(c),E=()=>{rl.delete(c),bx();}),p?.(true));}function C(){S&&(S=false,c.classList.remove("open"),P(),document.removeEventListener("mousedown",K,true),document.removeEventListener("scroll",ie,true),window.removeEventListener("resize",se),h.focus({preventScroll:true}),E?.(),E=null,p?.(false));}function _(){S?C():L();}function z(Y,Z={}){const O=I;I=Y,D(I),Z.notify!==false&&O!==Y&&d?.(Y);}function j(){return I}function V(Y){const Z=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!Z.length)return;const O=Z.findIndex(J=>J.classList.contains("active")),B=Z[(O+(Y===1?1:Z.length-1))%Z.length];Z.forEach(J=>J.classList.remove("active")),B.classList.add("active"),B.focus({preventScroll:true}),B.scrollIntoView({block:"nearest"});}function U(Y){(Y.key===" "||Y.key==="Enter"||Y.key==="ArrowDown")&&(Y.preventDefault(),L());}function ce(Y){if(Y.key==="Escape"){Y.preventDefault(),C();return}if(Y.key==="Enter"||Y.key===" "){const Z=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");Z&&!Z.classList.contains("disabled")&&(Y.preventDefault(),z(Z.dataset.value,{notify:true}),C());return}if(Y.key==="ArrowDown"){Y.preventDefault(),V(1);return}if(Y.key==="ArrowUp"){Y.preventDefault(),V(-1);return}}function K(Y){c.contains(Y.target)||C();}function ie(){S&&F();}function se(){S&&F();}function ae(Y){M=!!Y,h.disabled=M,c.classList.toggle("disabled",M),M&&C();}function ne(Y){e.options=Y,N(Y),Y.some(Z=>Z.value===I)||(I=null,D(null));}return c.append(h,g),h.addEventListener("pointerdown",Y=>{Y.preventDefault(),Y.stopPropagation(),_();},{capture:true}),h.addEventListener("keydown",U),g.addEventListener("keydown",ce),N(r),n!=null?(I=n,D(I)):D(null),P(),ae(M),{root:c,open:L,close:C,toggle:_,getValue:j,setValue:z,setOptions:ne,setDisabled:ae,destroy(){document.removeEventListener("mousedown",K,true),document.removeEventListener("scroll",ie,true),window.removeEventListener("resize",se),E?.(),E=null;}}}function Pu(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:s="text",required:d=false,disabled:p=false,tooltip:c,hint:h,icon:b,suffix:y,onClick:g}=e,S=x("div",{className:"lg-label-wrap",id:t}),I=x("label",{className:"lg-label",...r?{htmlFor:r}:{},...c?{title:c}:{}});if(b){const z=typeof b=="string"?x("span",{className:"lg-label-ico"},b):b;z.classList?.add?.("lg-label-ico"),I.appendChild(z);}const E=x("span",{className:"lg-label-text"},n);I.appendChild(E);const M=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");d&&I.appendChild(M);let R=null;if(y!=null){R=typeof y=="string"?document.createTextNode(y):y;const z=x("span",{className:"lg-label-suffix"});z.appendChild(R),I.appendChild(z);}const D=h?x("div",{className:"lg-label-hint"},h):null;S.classList.add(`lg-label--${a}`),S.classList.add(`lg-label--${i}`),s==="title"&&S.classList.add("lg-label--title"),N(o),p&&S.classList.add("is-disabled"),S.appendChild(I),D&&S.appendChild(D),g&&I.addEventListener("click",g);function N(z){S.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),S.classList.add(`lg-label--${z}`);}function P(z){E.textContent=z;}function F(z){N(z);}function L(z){z&&!M.isConnected&&I.appendChild(M),!z&&M.isConnected&&M.remove(),z?I.setAttribute("aria-required","true"):I.removeAttribute("aria-required");}function C(z){S.classList.toggle("is-disabled",!!z);}function _(z){!z&&D&&D.isConnected?D.remove():z&&D?D.textContent=z:z&&!D&&S.appendChild(x("div",{className:"lg-label-hint"},z));}return {root:S,labelEl:I,hintEl:D,setText:P,setTone:F,setRequired:L,setDisabled:C,setHint:_}}function Ii(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function es(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=Ii(e);return r&&n.appendChild(r),n}function yx(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function yt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:d,type:p="button",onClick:c,disabled:h=false,fullWidth:b=false}=e,y=x("button",{className:"btn",id:n});y.type=p,r==="primary"&&y.classList.add("primary"),r==="danger"&&y.classList.add("danger"),o==="sm"&&y.classList.add("btn--sm"),d&&(y.title=d),b&&(y.style.width="100%");const g=yx(),S=i?es(i,"left"):null,I=a?es(a,"right"):null,E=document.createElement("span");E.className="btn-label";const M=Ii(t);M&&E.appendChild(M),!M&&(S||I)&&y.classList.add("btn--icon"),y.appendChild(g),S&&y.appendChild(S),y.appendChild(E),I&&y.appendChild(I);const R=h||s;y.disabled=R,y.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",c&&y.addEventListener("click",c);const D=y;return D.setLoading=N=>{y.setAttribute("aria-busy",String(!!N)),g.style.display=N?"inline-block":"none",y.disabled=N||h;},D.setDisabled=N=>{y.disabled=N||y.getAttribute("aria-busy")==="true";},D.setLabel=N=>{E.replaceChildren();const P=Ii(N);P&&E.appendChild(P),!P&&(S||I)?y.classList.add("btn--icon"):y.classList.remove("btn--icon");},D.setIconLeft=N=>{if(N==null){S?.remove();return}S?S.replaceChildren(Ii(N)):y.insertBefore(es(N,"left"),E);},D.setIconRight=N=>{if(N==null){I?.remove();return}I?I.replaceChildren(Ii(N)):y.appendChild(es(N,"right"));},D.setVariant=N=>{y.classList.remove("primary","danger"),N==="primary"&&y.classList.add("primary"),N==="danger"&&y.classList.add("danger");},D}function xr(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,d=x("div",{className:"lg-switch-wrap"}),p=x("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),c=x("span",{className:"lg-switch-track"}),h=x("span",{className:"lg-switch-thumb"});p.append(c,h);let b=null;i&&a!=="none"&&(b=x("span",{className:"lg-switch-label"},i)),b&&a==="left"?d.append(b,p):b&&a==="right"?d.append(p,b):d.append(p);let y=!!n,g=!!r;function S(){p.classList.toggle("on",y),p.setAttribute("aria-checked",String(y)),p.disabled=g,p.setAttribute("aria-disabled",String(g));}function I(C=false){g||(y=!y,S(),C||s?.(y));}function E(C){C.preventDefault(),I();}function M(C){g||((C.key===" "||C.key==="Enter")&&(C.preventDefault(),I()),C.key==="ArrowLeft"&&(C.preventDefault(),D(false)),C.key==="ArrowRight"&&(C.preventDefault(),D(true)));}p.addEventListener("click",E),p.addEventListener("keydown",M);function R(){return y}function D(C,_=false){y=!!C,S(),_||s?.(y);}function N(C){g=!!C,S();}function P(C){if(!C){b&&(b.remove(),b=null);return}b?b.textContent=C:(b=x("span",{className:"lg-switch-label"},C),d.append(b));}function F(){p.focus();}function L(){p.removeEventListener("click",E),p.removeEventListener("keydown",M);}return S(),{root:d,button:p,isChecked:R,setChecked:D,setDisabled:N,setLabel:P,focus:F,destroy:L}}let Dm=null,Lu=null;function xx(){return Dm}function wx(e){Dm=e,Lu=null;}function $m(){return Lu}function Cx(e){Lu=e;}function kx(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function Bm(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function zm(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Sx(){const e=xx();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Ax(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function jm(){try{return window.top!==window.self}catch{return  true}}function Ex(){const e=jm(),t=Ax(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Rl(){const e=$m();if(e)return e;const t=Ex(),n=Sx(),r=Bm(),o=zm(),i=jm(),a=window.screen||{},s=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),p=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(s?.width??d),h=Math.round(s?.height??p),b=Math.round(a.width||0),y=Math.round(a.height||0),g=Math.round(a.availWidth||b),S=Math.round(a.availHeight||y),I=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,E={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:d,viewportHeight:p,visualViewportWidth:c,visualViewportHeight:h,screenWidth:b,screenHeight:y,availScreenWidth:g,availScreenHeight:S,dpr:I,orientation:kx()};return Cx(E),E}function _x(){return Rl().surface==="discord"}function Ix(){return Rl().platform==="mobile"}function Tx(){Rl();}function Px(){return $m()!==null}const Ft={init:Tx,isReady:Px,detect:Rl,isDiscord:_x,isMobile:Ix,detectOS:Bm,detectBrowser:zm,setPlatformOverride:wx};let ol=false;const Ti=new Set;function Lx(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const pn=e=>{const t=Lx();if(t){for(const n of Ti)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Mx(){ol||(ol=true,window.addEventListener("keydown",pn,true),window.addEventListener("keypress",pn,true),window.addEventListener("keyup",pn,true),document.addEventListener("keydown",pn,true),document.addEventListener("keypress",pn,true),document.addEventListener("keyup",pn,true));}function Rx(){ol&&(ol=false,window.removeEventListener("keydown",pn,true),window.removeEventListener("keypress",pn,true),window.removeEventListener("keyup",pn,true),document.removeEventListener("keydown",pn,true),document.removeEventListener("keypress",pn,true),document.removeEventListener("keyup",pn,true));}function Fx(e){return Ti.size===0&&Mx(),Ti.add(e),()=>{Ti.delete(e),Ti.size===0&&Rx();}}function Ox(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function Nx(e,t){return t?e.replace(t,""):e}function Dx(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function Fl(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:d,blockGameKeys:p=true,debounceMs:c=0,onChange:h,onEnter:b,label:y}=e,g=x("div",{className:"lg-input-wrap"}),S=x("input",{className:"input",id:t,placeholder:n});if(typeof d=="number"&&d>0&&(S.maxLength=d),r&&(S.value=r),y){const z=x("div",{className:"lg-input-label"},y);g.appendChild(z);}g.appendChild(S);const I=Ox(o,i,a,s),E=()=>{const z=S.selectionStart??S.value.length,j=S.value.length,V=Nx(S.value,I);if(V!==S.value){S.value=V;const U=j-V.length,ce=Math.max(0,z-U);S.setSelectionRange(ce,ce);}},M=Dx(()=>h?.(S.value),c);S.addEventListener("input",()=>{E(),M();}),S.addEventListener("paste",()=>queueMicrotask(()=>{E(),M();})),S.addEventListener("keydown",z=>{z.key==="Enter"&&b?.(S.value);});const R=p?Fx(S):()=>{};function D(){return S.value}function N(z){S.value=z??"",E(),M();}function P(){S.focus();}function F(){S.blur();}function L(z){S.disabled=!!z;}function C(){return document.activeElement===S}function _(){R();}return {root:g,input:S,getValue:D,setValue:N,focus:P,blur:F,setDisabled:L,isFocused:C,destroy:_}}function Tt(e,t,n){return Math.min(n,Math.max(t,e))}function zi({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let s=0,d=0,p=0;switch(Math.floor(o)){case 0:s=i,d=a;break;case 1:s=a,d=i;break;case 2:d=i,p=a;break;case 3:d=a,p=i;break;case 4:s=a,p=i;break;default:s=i,p=a;break}const h=n-i,b=Math.round((s+h)*255),y=Math.round((d+h)*255),g=Math.round((p+h)*255);return {r:Tt(b,0,255),g:Tt(y,0,255),b:Tt(g,0,255),a:Tt(r,0,1)}}function Gm({r:e,g:t,b:n,a:r}){const o=Tt(e,0,255)/255,i=Tt(t,0,255)/255,a=Tt(n,0,255)/255,s=Math.max(o,i,a),d=Math.min(o,i,a),p=s-d;let c=0;p!==0&&(s===o?c=60*((i-a)/p%6):s===i?c=60*((a-o)/p+2):c=60*((o-i)/p+4)),c<0&&(c+=360);const h=s===0?0:p/s;return {h:c,s:h,v:s,a:Tt(r,0,1)}}function Mu({r:e,g:t,b:n}){const r=o=>Tt(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function $x({r:e,g:t,b:n,a:r}){const o=Tt(Math.round(r*255),0,255);return `${Mu({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function Pi({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Co(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function Ad(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Co(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(d=>d.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,i,a,s].some(d=>Number.isNaN(d))?null:{r:o,g:i,b:a,a:s}}return null}function Bx(e,t){const n=Ad(e)??Co(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Tt(t,0,1)),Gm(n)}function zx(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function jx(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Lr(e){const t=zi(e),n=zi({...e,a:1});return {hsva:{...e},hex:Mu(n),hexa:$x(t),rgba:Pi(t),alpha:e.a}}function Gx(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:d}=e,c=a?a():Ft.detect().platform==="mobile";let h=Bx(r,o);const b=lt({id:t,className:"color-picker",title:n,padding:c?"md":"lg",variant:"soft",expandable:!c,defaultExpanded:!c&&i});b.classList.add(c?"color-picker--mobile":"color-picker--desktop");const y=b.querySelector(".card-header");y&&y.classList.add("color-picker__header");const g=y?.querySelector(".card-title"),S=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(S):y?y.prepend(S):b.prepend(S);const I=b.querySelector(".card-toggle");!c&&I&&S.addEventListener("click",()=>{b.classList.contains("card--collapsed")&&I.click();});const E=b.querySelector(".card-collapse");let M=null,R=null,D=null,N=null,P=null,F=null,L=null,C=null,_=null,z="hex";function j(ie){const se=Lr(h);ie==="input"?s?.(se):d?.(se);}function V(){const ie=Lr(h);if(S.style.setProperty("--cp-preview-color",ie.rgba),S.setAttribute("aria-label",`${n}: ${ie.hexa}`),!c&&M&&R&&D&&N&&P&&F&&L){const se=zi({...h,s:1,v:1,a:1}),ae=Pi(se);M.style.setProperty("--cp-palette-hue",ae),R.style.left=`${h.s*100}%`,R.style.top=`${(1-h.v)*100}%`,D.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Pi({...se,a:1})} 0%, ${Pi({...se,a:0})} 100%)`),N.style.top=`${(1-h.a)*100}%`,P.style.setProperty("--cp-hue-color",Pi(zi({...h,v:1,s:1,a:1}))),F.style.left=`${h.h/360*100}%`;const ne=h.a===1?ie.hex:ie.hexa,Y=ie.rgba,Z=z==="hex"?ne:Y;L!==document.activeElement&&(L.value=Z),L.setAttribute("aria-label",`${z.toUpperCase()} code for ${n}`),L.placeholder=z==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",z==="hex"?L.maxLength=9:L.removeAttribute("maxLength"),L.dataset.mode=z,C&&(C.textContent=z.toUpperCase(),C.setAttribute("aria-label",z==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),C.setAttribute("aria-pressed",z==="rgba"?"true":"false"),C.classList.toggle("is-alt",z==="rgba"));}_&&_!==document.activeElement&&(_.value=ie.hex);}function U(ie,se=null){h={h:(ie.h%360+360)%360,s:Tt(ie.s,0,1),v:Tt(ie.v,0,1),a:Tt(ie.a,0,1)},V(),se&&j(se);}function ce(ie,se=null){U(Gm(ie),se);}function K(ie,se,ae){ie.addEventListener("pointerdown",ne=>{ne.preventDefault();const Y=ne.pointerId,Z=B=>{B.pointerId===Y&&se(B);},O=B=>{B.pointerId===Y&&(document.removeEventListener("pointermove",Z),document.removeEventListener("pointerup",O),document.removeEventListener("pointercancel",O),ae?.(B));};se(ne),document.addEventListener("pointermove",Z),document.addEventListener("pointerup",O),document.addEventListener("pointercancel",O);});}if(!c&&E){const ie=E.querySelector(".card-body");if(ie){ie.classList.add("color-picker__body"),R=x("div",{className:"color-picker__palette-cursor"}),M=x("div",{className:"color-picker__palette"},R),N=x("div",{className:"color-picker__alpha-thumb"}),D=x("div",{className:"color-picker__alpha"},N),F=x("div",{className:"color-picker__hue-thumb"}),P=x("div",{className:"color-picker__hue"},F);const se=x("div",{className:"color-picker__main"},M,D),ae=x("div",{className:"color-picker__hue-row"},P),ne=Fl({blockGameKeys:true});L=ne.input,L.classList.add("color-picker__hex-input"),L.value="",L.maxLength=9,L.spellcheck=false,L.inputMode="text",L.setAttribute("aria-label",`Hex code for ${n}`),C=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),ne.root.classList.add("color-picker__hex-wrap");const Y=x("div",{className:"color-picker__hex-row"},C,ne.root);ie.replaceChildren(se,ae,Y),K(M,O=>{if(!M||!R)return;const B=M.getBoundingClientRect(),J=Tt((O.clientX-B.left)/B.width,0,1),re=Tt((O.clientY-B.top)/B.height,0,1);U({...h,s:J,v:1-re},"input");},()=>j("change")),K(D,O=>{if(!D)return;const B=D.getBoundingClientRect(),J=Tt((O.clientY-B.top)/B.height,0,1);U({...h,a:1-J},"input");},()=>j("change")),K(P,O=>{if(!P)return;const B=P.getBoundingClientRect(),J=Tt((O.clientX-B.left)/B.width,0,1);U({...h,h:J*360},"input");},()=>j("change")),C.addEventListener("click",()=>{if(z=z==="hex"?"rgba":"hex",L){const O=Lr(h);L.value=z==="hex"?h.a===1?O.hex:O.hexa:O.rgba;}V(),L?.focus(),L?.select();}),L.addEventListener("input",()=>{if(z==="hex"){const O=zx(L.value);if(O!==L.value){const B=L.selectionStart??O.length;L.value=O,L.setSelectionRange(B,B);}}});const Z=()=>{const O=L.value;if(z==="hex"){const B=Co(O);if(!B){L.value=h.a===1?Lr(h).hex:Lr(h).hexa;return}const J=O.startsWith("#")?O.slice(1):O,re=J.length===4||J.length===8;B.a=re?B.a:h.a,ce(B,"change");}else {const B=jx(O),J=Ad(B);if(!J){L.value=Lr(h).rgba;return}ce(J,"change");}};L.addEventListener("change",Z),L.addEventListener("blur",Z),L.addEventListener("keydown",O=>{O.key==="Enter"&&(Z(),L.blur());});}}return c&&(E&&E.remove(),_=x("input",{className:"color-picker__native",type:"color",value:Mu(zi({...h,a:1}))}),S.addEventListener("click",()=>_.click()),_.addEventListener("input",()=>{const ie=Co(_.value);ie&&(ie.a=h.a,ce(ie,"input"),j("change"));}),b.appendChild(_)),V(),{root:b,isMobile:c,getValue:()=>Lr(h),setValue:(ie,se)=>{const ae=Ad(ie)??Co(ie)??Co("#FFFFFF");ae&&(typeof se=="number"&&(ae.a=se),ce(ae,null));}}}const Ux=window;function Wx(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Ux}const Hx=Wx(),fe=Hx;function Vx(e){try{return !!e.isSecureContext}catch{return  false}}function Ru(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Um(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function qx(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Kx(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Yx(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Xx(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Vx(fe))return {ok:false,method:"clipboard-write"};if(!await qx())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Jx(e,t){try{const n=t||Ru(),r=Kx(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Qx(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=Yx(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=Um()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function Zx(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await Xx(n);if(r.ok)return r;const o=t.injectionRoot||Ru(t.valueNode||void 0),i=Jx(n,o);if(i.ok)return i;const a=Qx(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Ft.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function ew(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=Ru(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await Zx(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(Um()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const Io={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function tw(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,s=false;function d(c){const h=n[c]||n[i]||{};t.setAttribute("data-theme",c),s&&t.classList.add("theme-anim");for(const[b,y]of Object.entries(h))t.style.setProperty(b,y);s?(a!==null&&clearTimeout(a),a=fe.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=c,o?.(c);}function p(){return i}return d(r),{applyTheme:d,getCurrentTheme:p}}const Ed={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,journal:false,system:false}}};async function nw(){const e=await io("tab-settings",{version:2,defaults:Ed,sanitize:o=>({ui:{expandedCards:zo(Ed.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:zo(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}class rw{constructor(){ve(this,"injections",new Map);ve(this,"state",{});ve(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(o){console.error(`[InjectionRegistry] Failed to init ${t}:`,o);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const r=this.injections.get(t);if(!r){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?r.injection.init():r.injection.destroy(),console.log(`[InjectionRegistry] ${r.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const r=Qe(n.storageKey,n.defaultEnabled??false);this.state[t]=r;}saveState(t){const n=this.injections.get(t);n&&tt(n.storageKey,this.state[t]);}}let Oc=null;function il(){return Oc||(Oc=new rw),Oc}function Wm(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function ow(){return Object.keys(Io).map(e=>({value:e,label:Wm(e)}))}const iw=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function aw(e){return Wm(e.replace(/^--/,""))}function sw(e){return e.alpha<1?e.rgba:e.hex}const Fn={pets:{enabled:true},autoFavorite:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class lw extends Cr{constructor(n){super({id:"tab-settings",label:"Settings"});ve(this,"featureConfig",Fn);this.deps=n;}async build(n){const r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await nw();}catch{o={get:()=>Ed,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get(),a=Qe(ct.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(a);const s=Object.keys(Io),d=this.deps.getCurrentTheme?.()??this.deps.initialTheme,p=s.includes(d)?d:s[0]??"dark";let c=p;const h=Pu({text:"Theme",tone:"muted",size:"lg"}),b=eo({options:ow(),value:p,onChange:R=>{c=R,this.deps.applyTheme(R),this.renderThemePickers(R,y,c);}}),y=x("div",{className:"settings-theme-grid"}),g=lt({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:R=>o.setCardExpanded("style",R)},x("div",{className:"kv settings-theme-row"},h.root,b.root),y);this.renderThemePickers(p,y,c);const S=this.createHUDSectionsCard({defaultExpanded:!!i.ui.expandedCards.hudSections,onExpandChange:R=>o.setCardExpanded("hudSections",R)}),I=this.createEnhancementsCard({defaultExpanded:!!i.ui.expandedCards.enhancements,onExpandChange:R=>o.setCardExpanded("enhancements",R)}),E=this.createJournalCard({defaultExpanded:!!i.ui.expandedCards.journal,onExpandChange:R=>o.setCardExpanded("journal",R)}),M=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:R=>o.setCardExpanded("system",R)});r.appendChild(g),r.appendChild(S),r.appendChild(I),r.appendChild(E),r.appendChild(M);}mergeFeatureConfig(n){return {pets:{...Fn.pets,...n.pets},autoFavorite:{...Fn.autoFavorite,...n.autoFavorite},locker:{...Fn.locker,...n.locker},alerts:{...Fn.alerts,...n.alerts},avatar:{...Fn.avatar,...n.avatar},room:{...Fn.room,...n.room},cropSizeIndicator:{...Fn.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Fn.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Fn.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){tt(ct.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const r=(o,i,a,s,d=false,p=false)=>{const c=x("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${d?"0":"12px"} 0 ${p?"0":"12px"} 0;
          ${p?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${i?"1":"0.5"};
        `}),h=x("div"),b=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},o),y=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);h.append(b,y);const g=xr({checked:i,onChange:S=>{c.style.opacity=S?"1":"0.5",a(S);}});return c.append(h,g.root),c};return lt({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},r("Auto-Favorite",this.featureConfig.autoFavorite.enabled,o=>{this.featureConfig.autoFavorite.enabled=o,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),r("Pets",this.featureConfig.pets.enabled,o=>{this.featureConfig.pets.enabled=o,this.saveFeatureConfig();},"Pet management and team tracking"),r("Locker",this.featureConfig.locker.enabled,o=>{this.featureConfig.locker.enabled=o,this.saveFeatureConfig();},"Configure crop, egg, and decor blockers"),r("Alerts",this.featureConfig.alerts.enabled,o=>{this.featureConfig.alerts.enabled=o,this.saveFeatureConfig();},"Event notifications and alerts"),r("Avatar",this.featureConfig.avatar.enabled,o=>{this.featureConfig.avatar.enabled=o,this.saveFeatureConfig();},"Avatar customization and loadouts"),r("Room",this.featureConfig.room.enabled,o=>{this.featureConfig.room.enabled=o,this.saveFeatureConfig();},"Public room browser",false,true)))}createSectionRow(n,r,o,i,a=false,s=false){const d=x("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${a?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${r?"1":"0.5"};
      `}),p=x("div"),c=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),h=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},i);p.append(c,h);const b=xr({checked:r,onChange:y=>{d.style.opacity=y?"1":"0.5",o(y);}});return d.append(p,b.root),d}createEnhancementsCard(n){const r=il(),i=[...r.getAll().filter(s=>!this.isJournalInjection(s.id))].sort((s,d)=>s.name.localeCompare(d.name)),a=i.map((s,d)=>{const p=d===0,c=d===i.length-1,h=r.isEnabled(s.id);return this.createSectionRow(s.name,h,b=>{r.setEnabled(s.id,b),this.saveFeatureConfig();},s.description,p,c)});return lt({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},...a))}createJournalCard(n){const r=il(),i=[...r.getAll().filter(s=>this.isJournalInjection(s.id)).filter(s=>s.id!=="journalHints"&&s.id!=="journalFilterSort")].sort((s,d)=>s.name.localeCompare(d.name)),a=i.map((s,d)=>{const p=d===0,c=d===i.length-1,h=r.isEnabled(s.id);return this.createSectionRow(s.name,h,b=>{r.setEnabled(s.id,b),this.saveFeatureConfig();},s.description,p,c)});return lt({title:"Journal",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},...a))}isJournalInjection(n){return n==="abilitiesInject"||n==="journalHints"||n==="journalFilterSort"||n==="journalAllTab"||n==="missingVariantsIndicator"}renderThemePickers(n,r,o){const i=Io[n];if(r.replaceChildren(),!!i)for(const a of iw){const s=i[a];if(s==null)continue;const d=Gx({label:aw(a),value:s,defaultExpanded:false,onInput:p=>this.updateThemeVar(n,a,p,o),onChange:p=>this.updateThemeVar(n,a,p,o)});r.appendChild(d.root);}}updateThemeVar(n,r,o,i){const a=Io[n];a&&(a[r]=sw(o),i===n&&this.deps.applyTheme(n));}createEnvCard(n){const r=n?.defaultExpanded??false,o=n?.onExpandChange,i=(E,M)=>{const R=x("div",{className:"kv kv--inline-mobile"}),D=x("label",{},E),N=x("div",{className:"ro"});return typeof M=="string"?N.textContent=M:N.append(M),R.append(D,N),R},a=x("code",{},"—"),s=x("span",{},"—"),d=x("span",{},"—"),p=x("span",{},"—"),c=x("span",{},"—"),h=x("span",{},"—"),b=()=>{const E=Ft.detect();d.textContent=E.surface??"Unknown",p.textContent=E.platform??"Unknown",c.textContent=E.browser??"Unknown",h.textContent=E.os??"Unknown",a.textContent=E.host??"Unknown",s.textContent=E.isInIframe?"Yes":"No";},y=yt({label:"Copy JSON",variant:"primary",size:"sm"});ew(y,()=>{const E=Ft.detect();return JSON.stringify(E,null,2)});const g=x("div",{style:"width:100%;display:flex;justify-content:center;"},y),S=lt({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:r,onExpandChange:o},i("Surface",d),i("Platform",p),i("Browser",c),i("OS",h),i("Host",a),i("Iframe",s)),I=()=>{document.hidden||b();};return document.addEventListener("visibilitychange",I),b(),this.addCleanup(()=>document.removeEventListener("visibilitychange",I)),S}}function Ol(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:d=true,compact:p=false,maxHeight:c,selectable:h=false,selectionType:b="switch",selectOnRowClick:y=false,initialSelection:g=[],hideHeaderCheckbox:S=false,getRowId:I=(f,m)=>String(m),onSortChange:E,onSelectionChange:M,onRowClick:R}=e;let D=n.slice(),N=r.slice(),P=r.slice(),F=null,L=null,C=1;const _=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,z=!!s&&!(d&&_),j=x("div",{className:"lg-table-wrap",id:t});if(c!=null){const f=typeof c=="number"?`${c}px`:c;j.style.setProperty("--tbl-max-h",f);}const V=x("div",{className:"lg-table"}),U=x("div",{className:"lg-thead"}),ce=x("div",{className:"lg-tbody"}),K=x("div",{className:"lg-tfoot"});i&&j.classList.add("sticky"),a&&j.classList.add("zebra"),p&&j.classList.add("compact"),h&&j.classList.add("selectable");const ie=b==="switch"?"52px":"36px";j.style.setProperty("--check-w",ie);function se(f){return f==="center"?"center":f==="right"?"flex-end":"flex-start"}function ae(){const f=D.map(A=>{const G=(A.width||"1fr").trim();return /\bfr$/.test(G)?`minmax(0, ${G})`:G}),m=(h?[ie,...f]:f).join(" ");j.style.setProperty("--lg-cols",m);}ae();function ne(){return o?Math.max(1,Math.ceil(N.length/o)):1}function Y(){if(!o)return N;const f=(C-1)*o;return N.slice(f,f+o)}function Z(){if(!F||!L)return;const f=D.find(G=>String(G.key)===F),m=L==="asc"?1:-1,A=f?.sortFn?(G,W)=>m*f.sortFn(G,W):(G,W)=>{const Q=G[F],de=W[F];return Q==null&&de==null?0:Q==null?-1*m:de==null?1*m:typeof Q=="number"&&typeof de=="number"?m*(Q-de):m*String(Q).localeCompare(String(de),void 0,{numeric:true,sensitivity:"base"})};N.sort(A);}const O=new Set(g);function B(){return Array.from(O)}const J=new Map;function re(f){O.clear(),f.forEach(m=>O.add(m)),Ie(),J.forEach((m,A)=>{m.setChecked(O.has(A),true);}),De(),M?.(B());}function le(){O.clear(),Ie(),J.forEach(f=>f.setChecked(false,true)),De(),M?.(B());}let ye=null;function Ie(){if(!ye)return;const f=Y();if(!f.length){ye.indeterminate=false,ye.checked=false;return}const m=f.map((G,W)=>I(G,(C-1)*(o||0)+W)),A=m.reduce((G,W)=>G+(O.has(W)?1:0),0);ye.checked=A===m.length,ye.indeterminate=A>0&&A<m.length;}let Be=false;function xt(){Be=false;const f=ce.offsetWidth-ce.clientWidth;U.style.paddingRight=f>0?`${f}px`:"0px";}function zt(){Be||(Be=true,requestAnimationFrame(xt));}const ut=new ResizeObserver(()=>zt()),Et=()=>zt();function Vt(){U.replaceChildren();const f=x("div",{className:"lg-tr lg-tr-head"});if(h){const m=x("div",{className:"lg-th lg-th-check"});S||(ye=x("input",{type:"checkbox"}),ye.addEventListener("change",()=>{const A=Y(),G=ye.checked;A.forEach((W,Q)=>{const de=I(W,(C-1)*(o||0)+Q);G?O.add(de):O.delete(de);}),M?.(B()),De();}),m.appendChild(ye)),f.appendChild(m);}D.forEach(m=>{const A=x("button",{className:"lg-th",type:"button",title:m.title||m.header});A.textContent=m.header,m.align&&A.style.setProperty("--col-justify",se(m.align)),m.sortable&&A.classList.add("sortable"),F===String(m.key)&&L?A.setAttribute("data-sort",L):A.removeAttribute("data-sort"),m.sortable&&A.addEventListener("click",()=>{const G=String(m.key);F!==G?(F=G,L="asc"):(L=L==="asc"?"desc":L==="desc"?null:"asc",L||(F=null,N=P.slice())),E?.(F,L),F&&L&&Z(),kt();}),f.appendChild(A);}),U.appendChild(f);try{ut.disconnect();}catch{}ut.observe(ce),zt();}function Mt(f){return Array.from(f.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function qt(f){return f.querySelector(".lg-td, .lg-td-check")}function rt(f){const m=qt(f);return m?m.getBoundingClientRect():null}function De(){const f=Y(),m=new Map;Array.from(ce.children).forEach(Q=>{const de=Q,xe=de.getAttribute("data-id");if(!xe)return;const ge=rt(de);ge&&m.set(xe,ge);});const A=new Map;Array.from(ce.children).forEach(Q=>{const de=Q,xe=de.getAttribute("data-id");xe&&A.set(xe,de);});const G=[];for(let Q=0;Q<f.length;Q++){const de=f[Q],xe=(o?(C-1)*o:0)+Q,ge=I(de,xe);G.push(ge);let we=A.get(ge);we||(we=bn(de,xe),z&&Mt(we).forEach(st=>{st.style.transform="translateY(6px)",st.style.opacity="0";})),ce.appendChild(we);}const W=[];if(A.forEach((Q,de)=>{G.includes(de)||W.push(Q);}),!z){W.forEach(Q=>Q.remove()),Ie(),zt();return}G.forEach(Q=>{const de=ce.querySelector(`.lg-tr-body[data-id="${Q}"]`);if(!de)return;const xe=rt(de),ge=m.get(Q),we=Mt(de);if(ge&&xe){const qe=ge.left-xe.left,_t=ge.top-xe.top;we.forEach(bt=>{bt.style.transition="none",bt.style.transform=`translate(${qe}px, ${_t}px)`,bt.style.opacity="1";}),qt(de)?.getBoundingClientRect(),we.forEach(bt=>{bt.style.willChange="transform, opacity",bt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{we.forEach(bt=>{bt.style.transform="translate(0,0)";});});}else we.forEach(qe=>{qe.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{we.forEach(qe=>{qe.style.transform="translate(0,0)",qe.style.opacity="1";});});const Ze=qe=>{(qe.propertyName==="transform"||qe.propertyName==="opacity")&&(we.forEach(_t=>{_t.style.willChange="",_t.style.transition="",_t.style.transform="",_t.style.opacity="";}),qe.currentTarget.removeEventListener("transitionend",Ze));},st=we[0];st&&st.addEventListener("transitionend",Ze);}),W.forEach(Q=>{const de=Mt(Q);de.forEach(we=>{we.style.willChange="transform, opacity",we.style.transition="transform .18s ease, opacity .18s ease",we.style.opacity="0",we.style.transform="translateY(-6px)";});const xe=we=>{we.propertyName==="opacity"&&(we.currentTarget.removeEventListener("transitionend",xe),Q.remove());},ge=de[0];ge?ge.addEventListener("transitionend",xe):Q.remove();}),Ie(),zt();}function bn(f,m){const A=I(f,m),G=x("div",{className:"lg-tr lg-tr-body","data-id":A});if(h){const W=x("div",{className:"lg-td lg-td-check"});if(b==="switch"){const Q=xr({size:"sm",checked:O.has(A),onChange:de=>{de?O.add(A):O.delete(A),Ie(),M?.(B());}});J.set(A,Q),W.appendChild(Q.root);}else {const Q=x("input",{type:"checkbox",className:"lg-row-check"});Q.checked=O.has(A),Q.addEventListener("change",de=>{de.stopPropagation(),Q.checked?O.add(A):O.delete(A),Ie(),M?.(B());}),Q.addEventListener("click",de=>de.stopPropagation()),W.appendChild(Q);}G.appendChild(W);}return D.forEach(W=>{const Q=x("div",{className:"lg-td"});W.align&&Q.style.setProperty("--col-justify",se(W.align));let de=W.render?W.render(f,m):String(f[W.key]??"");typeof de=="string"?Q.textContent=de:Q.appendChild(de),G.appendChild(Q);}),(R||h&&y)&&(G.classList.add("clickable"),G.addEventListener("click",W=>{if(!W.target.closest(".lg-td-check")){if(h&&y){const Q=!O.has(A);if(Q?O.add(A):O.delete(A),Ie(),b==="switch"){const de=J.get(A);de&&de.setChecked(Q,true);}else {const de=G.querySelector(".lg-row-check");de&&(de.checked=Q);}M?.(B());}R?.(f,m,W);}})),G}function vn(){if(K.replaceChildren(),!o)return;const f=ne(),m=x("div",{className:"lg-pager"}),A=x("button",{className:"btn",type:"button"},"←"),G=x("button",{className:"btn",type:"button"},"→"),W=x("span",{className:"lg-pager-info"},`${C} / ${f}`);A.disabled=C<=1,G.disabled=C>=f,A.addEventListener("click",()=>ht(C-1)),G.addEventListener("click",()=>ht(C+1)),m.append(A,W,G),K.appendChild(m);}function ht(f){const m=ne();C=Math.min(Math.max(1,f),m),De(),vn();}function kt(){ae(),Vt(),De(),vn();}function Kt(f){P=f.slice(),N=f.slice(),F&&L&&Z(),ht(1);}function In(f){D=f.slice(),kt();}function on(f,m="asc"){F=f,L=f?m:null,F&&L?Z():N=P.slice(),kt();}function k(){try{ut.disconnect();}catch{}window.removeEventListener("resize",Et);}return V.append(U,ce,K),j.appendChild(V),window.addEventListener("resize",Et),kt(),{root:j,setData:Kt,setColumns:In,sortBy:on,getSelection:B,setSelection:re,clearSelection:le,setPage:ht,getState:()=>({page:C,pageCount:ne(),sortKey:F,sortDir:L}),destroy:k}}let al=false;const Li=new Set;function cw(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const fn=e=>{const t=cw();if(t){for(const n of Li)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function dw(){al||(al=true,window.addEventListener("keydown",fn,true),window.addEventListener("keypress",fn,true),window.addEventListener("keyup",fn,true),document.addEventListener("keydown",fn,true),document.addEventListener("keypress",fn,true),document.addEventListener("keyup",fn,true));}function uw(){al&&(al=false,window.removeEventListener("keydown",fn,true),window.removeEventListener("keypress",fn,true),window.removeEventListener("keyup",fn,true),document.removeEventListener("keydown",fn,true),document.removeEventListener("keypress",fn,true),document.removeEventListener("keyup",fn,true));}function pw(e){return Li.size===0&&dw(),Li.add(e),()=>{Li.delete(e),Li.size===0&&uw();}}function ts(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function fw(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function xa(e={}){const{id:t,placeholder:n="Search...",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:d,autoSearch:p=false,debounceMs:c=0,focusKey:h="/",iconLeft:b,iconRight:y,withClear:g=true,clearTitle:S="Clear",ariaLabel:I,submitLabel:E,loading:M=false,blockGameKeys:R=true}=e,D=x("div",{className:"search"+(o?` search--${o}`:""),id:t}),N=x("span",{className:"search-ico search-ico--left"});if(b){const le=ts(b);le&&N.appendChild(le);}else N.textContent="🔎",N.style.opacity=".9";const P=x("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":I||n}),F=x("span",{className:"search-ico search-ico--right"});if(y){const le=ts(y);le&&F.appendChild(le);}const L=fw();L.classList.add("search-spinner");const C=g?x("button",{className:"search-clear",type:"button",title:S},"×"):null,_=E!=null?x("button",{className:"btn search-submit",type:"button"},E):null,z=x("div",{className:"search-field"},N,P,F,L,...C?[C]:[]);D.append(z,..._?[_]:[]);let j=!!i,V=null;function U(le){L.style.display=le?"inline-block":"none",D.classList.toggle("is-loading",le);}function ce(){V!=null&&(window.clearTimeout(V),V=null);}function K(le){ce(),c>0?V=window.setTimeout(()=>{V=null,le();},c):le();}function ie(){s?.(P.value),p&&d&&d(P.value);}P.addEventListener("input",()=>{K(ie);}),P.addEventListener("keydown",le=>{le.key==="Enter"?(le.preventDefault(),ce(),d?.(P.value)):le.key==="Escape"&&(P.value.length>0?ne("",{notify:true}):P.blur());}),C&&C.addEventListener("click",()=>ne("",{notify:true})),_&&_.addEventListener("click",()=>d?.(P.value));let se=()=>{};if(R&&(se=pw(P)),h){const le=ye=>{if(ye.key===h&&!ye.ctrlKey&&!ye.metaKey&&!ye.altKey){const Ie=document.activeElement;Ie&&(Ie.tagName==="INPUT"||Ie.tagName==="TEXTAREA"||Ie.isContentEditable)||(ye.preventDefault(),P.focus());}};window.addEventListener("keydown",le,true),D.__cleanup=()=>{window.removeEventListener("keydown",le,true),se();};}else D.__cleanup=()=>{se();};function ae(le){j=!!le,P.disabled=j,C&&(C.disabled=j),_&&(_.disabled=j),D.classList.toggle("disabled",j);}function ne(le,ye={}){const Ie=P.value;P.value=le??"",ye.notify&&Ie!==le&&K(ie);}function Y(){return P.value}function Z(){P.focus();}function O(){P.blur();}function B(le){P.placeholder=le;}function J(le){ne("",le);}return ae(j),U(M),a&&Z(),{root:D,input:P,getValue:Y,setValue:ne,focus:Z,blur:O,setDisabled:ae,setPlaceholder:B,clear:J,setLoading:U,setIconLeft(le){N.replaceChildren();const ye=ts(le??"🔎");ye&&N.appendChild(ye);},setIconRight(le){F.replaceChildren();const ye=ts(le??"");ye&&F.appendChild(ye);}}}const Hm=e=>new Promise(t=>setTimeout(t,e)),kn=e=>{try{return e()}catch{return}},$n=(e,t,n)=>Math.max(t,Math.min(n,e)),hw=e=>$n(e,0,1);let Fu=null;function Vm(){return Fu}function mw(e){Fu=e;}function qm(){return Fu!==null}const gw=/\/(?:r\/\d+\/)?version\/([^/]+)/,bw=15e3,vw=50;function yw(){return fe?.document??(typeof document<"u"?document:null)}function Ou(e={}){if(qm())return;const t=e.doc??yw();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(gw);if(a?.[1]){mw(a[1]);return}}}function xw(){return Ou(),Vm()}function ww(){return qm()}async function Cw(e={}){const t=e.timeoutMs??bw,n=performance.now();for(;performance.now()-n<t;){Ou();const r=Vm();if(r)return r;await Hm(vw);}throw new Error("MGVersion timeout (gameVersion not found)")}const Nu={init:Ou,isReady:ww,get:xw,wait:Cw},kw=fe?.location?.origin||"https://magicgarden.gg";function Km(){return typeof GM_xmlhttpRequest=="function"}function Ym(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function Xm(e){if(Km())return JSON.parse((await Ym(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Sw(e){if(Km())return (await Ym(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}const Kr=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,"");let Du=null,Jm=null;function Qm(){return Du}function Aw(){return Jm}function Ew(e){Du=e;}function _w(e){Jm=e;}function Zm(){return Du!==null}const Iw=15e3;async function Tw(e={}){Zm()||await $u(e);}async function $u(e={}){const t=Qm();if(t)return t;const n=Aw();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Nu.wait({timeoutMs:Iw}),i=`${kw}/version/${o}/assets/`;return Ew(i),i})();return _w(r),r}async function Pw(e){const t=await $u();return Kr(t,e)}function Lw(){return Zm()}const Zo={init:Tw,isReady:Lw,base:$u,url:Pw},eg=new Map;function Mw(e){return eg.get(e)}function Rw(e,t){eg.set(e,t);}const tg="manifest.json";let _d=null;async function Fw(){_d||(_d=await ng());}function Ow(){return _d!==null}async function ng(e={}){const t=e.baseUrl??await Zo.base(),n=Mw(t);if(n)return n;const r=Xm(Kr(t,tg));return Rw(t,r),r}function Nw(e,t){return e.bundles.find(n=>n.name===t)??null}function Dw(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==tg&&t.add(r);return Array.from(t)}const jo={init:Fw,isReady:Ow,load:ng,getBundle:Nw,listJsonFromBundle:Dw},$w={items:"items",decor:"decor",mutations:"mutations",eggs:"eggs",pets:"pets",abilities:"abilities",plants:"plants",weathers:"weather"};function Bw(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},ready:false}}const Gt=Bw(),Uf="https://mg-api.ariedam.fr/data";async function zw(){if(Gt.ready)return;console.log("[MGData] Fetching game data from API...");const e=await new Promise((n,r)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(Uf).then(o=>{if(!o.ok)r(new Error(`[MGData] API request failed: ${o.status}`));else return o.json()}).then(o=>n(o)).catch(r);return}GM_xmlhttpRequest({method:"GET",url:Uf,responseType:"json",onload(o){if(o.status<200||o.status>=300){r(new Error(`[MGData] API request failed: ${o.status}`));return}n(o.response);},onerror(){r(new Error("[MGData] Network error"));}});});for(const[n,r]of Object.entries($w)){const o=e[n];o&&typeof o=="object"&&(Gt.data[r]=o);}Gt.ready=true;const t=Object.entries(Gt.data).filter(([,n])=>n!==null).map(([n])=>n);console.log(`[MGData] Data loaded: ${t.join(", ")}`);}const jw=/\/assets\/sprites\/(.+?)\.png/,Gw={"mutation-overlays":"mutation-overlay"};function Uw(e){const t=Gw[e];return t||(e.endsWith("s")&&e.length>1?e.slice(0,-1):e)}function Qn(e){if(!e||typeof e!="string")return null;const t=e.match(jw);if(!t)return null;const n=t[1],r=n.indexOf("/");if(r>0){const o=n.slice(0,r),i=n.slice(r);return `sprite/${Uw(o)}${i}`}return `sprite/${n}`}function Ww(e){for(const[,t]of Object.entries(e.items||{})){const n=t,r=Qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.decor||{})){const n=t,r=Qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.mutations||{})){const n=t,r=Qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.eggs||{})){const n=t,r=Qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.pets||{})){const n=t,r=Qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.weather||{})){const n=t,r=Qn(n.sprite);r&&(n.spriteId=r);}for(const[,t]of Object.entries(e.plants||{})){const n=t;if(n.seed){const r=Qn(n.seed.sprite);r&&(n.seed.spriteId=r);}if(n.plant){const r=Qn(n.plant.sprite);r&&(n.plant.spriteId=r);}if(n.crop){const r=Qn(n.crop.sprite);r&&(n.crop.spriteId=r);}}}function Hw(){try{console.log("[MGData] Resolving sprites..."),Ww(Gt.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] Sprite resolution failed",e);}catch{}}}const rg=1e4,og=50;function ig(e){return new Promise(t=>setTimeout(t,e))}function Vw(e){return Gt.data[e]}function qw(){return {...Gt.data}}function Kw(e){return Gt.data[e]!=null}async function Yw(e,t=rg){const n=Gt.data[e];if(n!=null)return n;const r=Date.now();for(;Date.now()-r<t;){await ig(og);const o=Gt.data[e];if(o!=null)return o}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Xw(e=rg){if(Gt.ready)return {...Gt.data};const t=Date.now();for(;Date.now()-t<e;){if(Gt.ready)return {...Gt.data};await ig(og);}throw new Error("MGData.waitForAnyData: timeout")}const ag=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function sg(e){return ag.includes(e)}function lg(e){return e.filter(t=>sg(t.action))}function Wf(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function Nc(e){return e?.name||e?.petSpecies||"Unknown Pet"}function cg(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=Nc(r.targetPet),i=r.hungerRestoreAmount||0,s=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${i} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",i=r.sellPrice||0;return `Ate ${o} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=Nc(r.targetPet),i=r.strengthIncrease||0;return `Boosted ${o}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=Nc(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,i=r.petsAffected?.length||0;return `Gave +${o} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,i=r.eggsAffected?.length||0,a=Wf(o);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,i=r.numPlantsAffected||0,a=Wf(o);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,i=r.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const ke={async init(){await zw();},isReady(){return Gt.ready},get:Vw,getAll:qw,has:Kw,waitFor:Yw,waitForAny:Xw,resolveSprites:Hw,cleanup(){}},Jw=new Map;function Qw(){return Jw}function Id(){return fe.jotaiAtomCache?.cache}function br(e){const t=Qw(),n=t.get(e);if(n)return n;const r=Id();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Zw(){const e=fe;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const eC={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function ei(){return eC}const tC="__JOTAI_STORE_READY__";let Hf=false;const Td=new Set;function ns(){if(!Hf){Hf=true;for(const e of Td)try{e();}catch{}try{const e=fe.CustomEvent||CustomEvent;fe.dispatchEvent?.(new e(tC));}catch{}}}function nC(e){Td.add(e);const t=Ld();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Td.delete(e);}}async function Bu(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Ld();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const s=nC(()=>{a||(a=true,s(),o());}),d=Date.now();(async()=>{for(;!a&&Date.now()-d<t;){const c=Ld();if(c.via&&!c.polyfill){if(a)return;a=true,s(),o();return}await ta(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const ta=e=>new Promise(t=>setTimeout(t,e));function dg(){try{const e=fe.Event||Event;fe.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Pd(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Dc(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Pd(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(Pd(i))return i}catch{}return null}function ug(){const e=ei(),t=fe.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,s=[i.current];for(;s.length;){const d=s.pop();if(!(!d||a.has(d))){a.add(d);try{const p=d?.pendingProps?.value;if(Pd(p))return e.lastCapturedVia="fiber",p}catch{}try{let p=d?.memoizedState,c=0;for(;p&&c<15;){c++;const h=Dc(p);if(h)return e.lastCapturedVia="fiber",h;const b=Dc(p.memoizedState);if(b)return e.lastCapturedVia="fiber",b;p=p.next;}}catch{}try{if(d?.stateNode){const p=Dc(d.stateNode);if(p)return e.lastCapturedVia="fiber",p}}catch{}d.child&&s.push(d.child),d.sibling&&s.push(d.sibling),d.alternate&&s.push(d.alternate);}}}}return null}function pg(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function rC(e=5e3){const t=Date.now();let n=Id();for(;!n&&Date.now()-t<e;)await ta(100),n=Id();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=ei();let o=null,i=null;const a=[],s=()=>{for(const p of a)try{p.__origWrite&&(p.write=p.__origWrite,delete p.__origWrite);}catch{}};for(const p of n.values()){if(!p||typeof p.write!="function"||p.__origWrite)continue;const c=p.write;p.__origWrite=c,p.write=function(h,b,...y){return i||(o=h,i=b,s()),c.call(this,h,b,...y)},a.push(p);}dg();const d=Date.now();for(;!i&&Date.now()-d<e;)await ta(50);return i?(r.lastCapturedVia="write",{get:p=>o(p),set:(p,c)=>i(p,c),sub:(p,c)=>{let h;try{h=o(p);}catch{}const b=setInterval(()=>{let y;try{y=o(p);}catch{return}if(y!==h){h=y;try{c();}catch{}}},100);return ()=>clearInterval(b)}}):(s(),r.lastCapturedVia="polyfill",pg())}async function oC(e=1e4){const t=ei();dg();const n=Date.now();for(;Date.now()-n<e;){const r=ug();if(r)return r;await ta(50);}return t.lastCapturedVia="polyfill",pg()}async function zu(){const e=ei();if(e.baseStore&&!e.baseStore.__polyfill)return ns(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await ta(25);if(e.baseStore)return e.baseStore.__polyfill||ns(),e.baseStore}e.captureInProgress=true;try{const t=ug();if(t)return e.baseStore=t,ns(),t;try{const r=await rC(5e3);return e.baseStore=r,r.__polyfill||ns(),r}catch(r){e.captureError=r;}const n=await oC();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Ld(){const e=ei();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function iC(){const e=await zu(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const d=i.last,p=!Object.is(s,d)||!i.has;if(i.last=s,i.has=true,p)for(const c of i.subs)try{c(s,d);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Ps(){const e=ei();return e.mirror||(e.mirror=await iC()),e.mirror}const Je={async select(e){const t=await Ps(),n=br(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Ps(),r=br(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Ps(),r=br(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await Je.select(e);try{t(n);}catch{}return Je.subscribe(e,t)}};async function fg(){await Ps();}const wa=Object.freeze(Object.defineProperty({__proto__:null,Store:Je,prewarm:fg,waitForStore:Bu},Symbol.toStringTag,{value:"Module"}));function ju(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function na(e,t){const n=ju(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function aC(e,t,n){const r=ju(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const s=r[a],d=i[s],p=typeof d=="object"&&d!==null?Array.isArray(d)?[...d]:{...d}:{};i[s]=p,i=p;}return i[r[r.length-1]]=n,o}function Vf(e,t){const n={};for(const r of t)n[r]=r.includes(".")?na(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function sC(e,t,n){const r=n.mode??"auto";function o(p){const c=t?na(p,t):p,h=new Map;if(c==null)return {signatures:h,keys:[]};const b=Array.isArray(c);if((r==="array"||r==="auto"&&b)&&b)for(let g=0;g<c.length;g++){const S=c[g],I=n.key?n.key(S,g,p):g,E=n.sig?n.sig(S,g,p):n.fields?Vf(S,n.fields):JSON.stringify(S);h.set(I,E);}else for(const[g,S]of Object.entries(c)){const I=n.key?n.key(S,g,p):g,E=n.sig?n.sig(S,g,p):n.fields?Vf(S,n.fields):JSON.stringify(S);h.set(I,E);}return {signatures:h,keys:Array.from(h.keys())}}function i(p,c){if(p===c)return  true;if(!p||!c||p.size!==c.size)return  false;for(const[h,b]of p)if(c.get(h)!==b)return  false;return  true}async function a(p){let c=null;return Je.subscribeImmediate(e,h=>{const b=t?na(h,t):h,{signatures:y}=o(b);if(!i(c,y)){const g=new Set([...c?Array.from(c.keys()):[],...Array.from(y.keys())]),S=[];for(const I of g){const E=c?.get(I)??"__NONE__",M=y.get(I)??"__NONE__";E!==M&&S.push(I);}c=y,p({value:b,changedKeys:S});}})}async function s(p,c){return a(({value:h,changedKeys:b})=>{b.includes(p)&&c({value:h});})}async function d(p,c){const h=new Set(p);return a(({value:b,changedKeys:y})=>{const g=y.filter(S=>h.has(S));g.length&&c({value:b,changedKeys:g});})}return {sub:a,subKey:s,subKeys:d}}const ko=new Map;function lC(e,t){const n=ko.get(e);if(n)try{n();}catch{}return ko.set(e,t),()=>{try{t();}catch{}ko.get(e)===t&&ko.delete(e);}}function nt(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${ju(n).join(".")}`:e;async function i(){const h=await Je.select(e);return n?na(h,n):h}async function a(h){if(typeof r=="function"){const g=await Je.select(e),S=r(h,g);return Je.set(e,S)}const b=await Je.select(e),y=n?aC(b,n,h):h;return r==="merge-shallow"&&!n&&b&&typeof b=="object"&&typeof h=="object"?Je.set(e,{...b,...h}):Je.set(e,y)}async function s(h){const b=await i(),y=h(b);return await a(y),y}async function d(h,b,y){let g;const S=E=>{const M=n?na(E,n):E;if(typeof g>"u"||!y(g,M)){const R=g;g=M,b(M,R);}},I=h?await Je.subscribeImmediate(e,S):await Je.subscribe(e,S);return lC(o,I)}function p(){const h=ko.get(o);if(h){try{h();}catch{}ko.delete(o);}}function c(h){return sC(e,h?.path??n,h)}return {label:o,get:i,set:a,update:s,onChange:(h,b=Object.is)=>d(false,h,b),onChangeNow:(h,b=Object.is)=>d(true,h,b),asSignature:c,stopOnChange:p}}function te(e){return nt(e)}te("positionAtom");te("lastPositionInMyGardenAtom");te("playerDirectionAtom");te("stateAtom");te("quinoaDataAtom");te("currentTimeAtom");te("actionAtom");te("isPressAndHoldActionAtom");te("mapAtom");te("tileSizeAtom");nt("mapAtom",{path:"cols"});nt("mapAtom",{path:"rows"});nt("mapAtom",{path:"spawnTiles"});nt("mapAtom",{path:"locations.seedShop.spawnTileIdx"});nt("mapAtom",{path:"locations.eggShop.spawnTileIdx"});nt("mapAtom",{path:"locations.toolShop.spawnTileIdx"});nt("mapAtom",{path:"locations.decorShop.spawnTileIdx"});nt("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});nt("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});nt("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});nt("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});nt("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});te("playerAtom");te("myDataAtom");te("myUserSlotIdxAtom");te("isSpectatingAtom");te("myCoinsCountAtom");te("numPlayersAtom");nt("playerAtom",{path:"id"});nt("myDataAtom",{path:"activityLogs"});te("userSlotsAtom");te("filteredUserSlotsAtom");te("myUserSlotAtom");te("spectatorsAtom");nt("stateAtom",{path:"child"});nt("stateAtom",{path:"child.data"});nt("stateAtom",{path:"child.data.shops"});const cC=nt("stateAtom",{path:"child.data.userSlots"}),dC=nt("stateAtom",{path:"data.players"}),uC=nt("stateAtom",{path:"data.hostPlayerId"});te("myInventoryAtom");te("myInventoryItemsAtom");te("isMyInventoryAtMaxLengthAtom");te("myFavoritedItemIdsAtom");te("myCropInventoryAtom");te("mySeedInventoryAtom");te("myToolInventoryAtom");te("myEggInventoryAtom");te("myDecorInventoryAtom");te("myPetInventoryAtom");nt("myInventoryAtom",{path:"favoritedItemIds"});te("itemTypeFiltersAtom");te("myItemStoragesAtom");te("myPetHutchStoragesAtom");te("myPetHutchItemsAtom");te("myPetHutchPetItemsAtom");te("myNumPetHutchItemsAtom");te("myValidatedSelectedItemIndexAtom");te("isSelectedItemAtomSuspended");te("mySelectedItemAtom");te("mySelectedItemNameAtom");te("mySelectedItemRotationsAtom");te("mySelectedItemRotationAtom");te("setSelectedIndexToEndAtom");te("myPossiblyNoLongerValidSelectedItemIndexAtom");te("mySelectedItemIdAtom");te("myCurrentGlobalTileIndexAtom");te("myCurrentGardenTileAtom");te("myCurrentGardenObjectAtom");te("myOwnCurrentGardenObjectAtom");te("myOwnCurrentDirtTileIndexAtom");te("myCurrentGardenObjectNameAtom");te("isInMyGardenAtom");te("myGardenBoardwalkTileObjectsAtom");const pC=nt("myDataAtom",{path:"garden"});nt("myDataAtom",{path:"garden.tileObjects"});nt("myOwnCurrentGardenObjectAtom",{path:"objectType"});te("myCurrentStablePlantObjectInfoAtom");te("myCurrentSortedGrowSlotIndicesAtom");te("mySelectedSlotIdAtom");te("myCurrentGrowSlotsAtom");te("myCurrentGrowSlotAtom");te("secondsUntilCurrentGrowSlotMaturesAtom");te("isCurrentGrowSlotMatureAtom");te("numGrowSlotsAtom");te("myCurrentEggAtom");te("myPetSlotInfosAtom");te("myPrimitivePetSlotsAtom");te("myNonPrimitivePetSlotsAtom");te("myPetsProgressAtom");te("myActiveCropMutationPetsAtom");te("totalPetSellPriceAtom");te("selectedPetHasNewVariantsAtom");const fC=te("shopsAtom"),hC=nt("myDataAtom",{path:"shopPurchases"});te("seedShopAtom");te("seedShopInventoryAtom");te("seedShopRestockSecondsAtom");te("seedShopCustomRestockInventoryAtom");te("eggShopAtom");te("eggShopInventoryAtom");te("eggShopRestockSecondsAtom");te("eggShopCustomRestockInventoryAtom");te("toolShopAtom");te("toolShopInventoryAtom");te("toolShopRestockSecondsAtom");te("toolShopCustomRestockInventoryAtom");te("decorShopAtom");te("decorShopInventoryAtom");te("decorShopRestockSecondsAtom");te("decorShopCustomRestockInventoryAtom");te("isDecorShopAboutToRestockAtom");nt("shopsAtom",{path:"seed"});nt("shopsAtom",{path:"tool"});nt("shopsAtom",{path:"egg"});nt("shopsAtom",{path:"decor"});te("myCropItemsAtom");te("myCropItemsToSellAtom");te("totalCropSellPriceAtom");te("friendBonusMultiplierAtom");te("myJournalAtom");te("myCropJournalAtom");te("myPetJournalAtom");te("myStatsAtom");te("myActivityLogsAtom");te("newLogsAtom");te("hasNewLogsAtom");te("newCropLogsFromSellingAtom");te("hasNewCropLogsFromSellingAtom");te("myCompletedTasksAtom");te("myActiveTasksAtom");te("isWelcomeToastVisibleAtom");te("shouldCloseWelcomeToastAtom");te("isInitialMoveToDirtPatchToastVisibleAtom");te("isFirstPlantSeedActiveAtom");te("isThirdSeedPlantActiveAtom");te("isThirdSeedPlantCompletedAtom");te("isDemoTouchpadVisibleAtom");te("areShopAnnouncersEnabledAtom");te("arePresentablesEnabledAtom");te("isEmptyDirtTileHighlightedAtom");te("isPlantTileHighlightedAtom");te("isItemHiglightedInHotbarAtom");te("isItemHighlightedInModalAtom");te("isMyGardenButtonHighlightedAtom");te("isSellButtonHighlightedAtom");te("isShopButtonHighlightedAtom");te("isInstaGrowButtonHiddenAtom");te("isActionButtonHighlightedAtom");te("isGardenItemInfoCardHiddenAtom");te("isSeedPurchaseButtonHighlightedAtom");te("isFirstSeedPurchaseActiveAtom");te("isFirstCropHarvestActiveAtom");te("isWeatherStatusHighlightedAtom");te("weatherAtom");const hg=te("activeModalAtom"),Gu=te("inventoryModalIsActiveAtom");te("hotkeyBeingPressedAtom");te("avatarTriggerAnimationAtom");te("avatarDataAtom");te("emoteDataAtom");te("otherUserSlotsAtom");te("otherPlayerPositionsAtom");te("otherPlayerSelectedItemsAtom");te("otherPlayerLastActionsAtom");te("traderBunnyPlayerId");te("npcPlayersAtom");te("npcQuinoaUsersAtom");te("numNpcAvatarsAtom");te("traderBunnyEmoteTimeoutAtom");te("traderBunnyEmoteAtom");te("unsortedLeaderboardAtom");te("currentGardenPlayer");te("quinoaEngineAtom");te("quinoaInitializationErrorAtom");te("avgPingAtom");te("serverClientTimeOffsetAtom");te("isEstablishingShotRunningAtom");te("isEstablishingShotCompleteAtom");const Ve={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Nl(){return Ve}function mC(){return Ve.initialized}function ao(){return Ve.isCustom&&Ve.activeModal!==null}function to(){return Ve.activeModal}function mg(e){return !Ve.shadow||Ve.shadow.modal!==e?null:Ve.shadow.data}function gC(e){Ve.initialized=e;}function Uu(e){Ve.activeModal=e;}function Wu(e){Ve.isCustom=e;}function gg(e,t){Ve.shadow={modal:e,data:t,timestamp:Date.now()};}function bg(){Ve.shadow=null;}function qf(e,t){Ve.patchedAtoms.add(e),Ve.originalReads.set(e,t);}function bC(e){return Ve.originalReads.get(e)}function Md(e){return Ve.patchedAtoms.has(e)}function vC(e){Ve.patchedAtoms.delete(e),Ve.originalReads.delete(e);}function yC(e){Ve.unsubscribes.push(e);}function xC(){for(const e of Ve.unsubscribes)try{e();}catch{}Ve.unsubscribes.length=0;}function wC(e){return Ve.listeners.onOpen.add(e),()=>Ve.listeners.onOpen.delete(e)}function vg(e){return Ve.listeners.onClose.add(e),()=>Ve.listeners.onClose.delete(e)}function yg(e){for(const t of Array.from(Ve.listeners.onOpen))try{t(e);}catch{}}function Hu(e){for(const t of Array.from(Ve.listeners.onClose))try{t(e);}catch{}}function CC(){xC(),Ve.initialized=false,Ve.activeModal=null,Ve.isCustom=false,Ve.shadow=null,Ve.patchedAtoms.clear(),Ve.originalReads.clear(),Ve.listeners.onOpen.clear(),Ve.listeners.onClose.clear();}const Vu={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function xg(e){return Vu[e]}function kC(e){const t=Vu[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const SC=new Set(["inventory","journal","stats","activityLog","petHutch"]),AC=new Set(["seedShop","eggShop","toolShop","decorShop"]),EC=new Set(["leaderboard"]);function _C(e,t,n,r){return function(i){const a=ao(),s=to();if(a&&s===r){const d=mg(r);if(d!==null){let p;if(n.dataKey==="_full"?p=d:p=d[n.dataKey],p!==void 0)return t(i),n.transform?n.transform(p):p}}return t(i)}}function IC(e,t,n,r,o){return function(a){if(ao()&&to()===o){const s=mg(o);if(s!==null){const d=s[n];if(d!==void 0)return t(a),r(d)}}return t(a)}}function TC(e){const t=xg(e);for(const n of t.atoms){const r=br(n.atomLabel);if(!r||Md(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=_C(n.atomLabel,o,n,e);r.read=i,qf(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=br(n.atomLabel);if(!r||Md(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=IC(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,qf(n.atomLabel,o);}}async function Dl(e){const t=xg(e);for(const r of t.atoms)Kf(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)Kf(r.atomLabel);const n=await zu();await wg(n,e);}async function PC(e){const t=await zu();await wg(t,e);const n=kC(e);for(const r of n){const o=br(r);if(o)try{t.get(o);}catch{}}}function Kf(e){if(!Md(e))return;const t=br(e),n=bC(e);t&&n&&(t.read=n),vC(e);}async function wg(e,t){const n=SC.has(t),r=AC.has(t),o=EC.has(t);if(!n&&!r&&!o)return;const i=br("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||r){const d=a.child,p=d?.data;if(d&&p&&typeof p=="object"){let c=null;if(n&&Array.isArray(p.userSlots)){const h=p.userSlots.map(b=>{if(!b||typeof b!="object")return b;const y=b,g=y.data,S=g&&typeof g=="object"?{...g}:g;return {...y,data:S}});c={...c??p,userSlots:h};}if(r&&p.shops&&typeof p.shops=="object"&&(c={...c??p,shops:{...p.shops}}),c){const h={...d,data:c};s={...a,child:h};}}}if(o){const d=a.data;if(d&&Array.isArray(d.players)){const p={...d,players:[...d.players]};s={...s??a,data:p};}}if(!s)return;await e.set(i,s);}catch{}}async function LC(){for(const e of Object.keys(Vu))await Dl(e);}let rs=null,ji=null;async function MC(){if(Nl().initialized)return;ji=await Je.select("activeModalAtom"),rs=setInterval(async()=>{try{const n=await Je.select("activeModalAtom"),r=ji;r!==n&&(ji=n,RC(n,r));}catch{}},50),yC(()=>{rs&&(clearInterval(rs),rs=null);}),gC(true);}function RC(e,t){const n=ao(),r=to();e===null&&t!==null&&(n&&r===t?FC("native"):n||Hu({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&yg({modal:e,isCustom:false});}async function FC(e){const t=to();t&&(bg(),Wu(false),Uu(null),t==="inventory"&&await Gu.set(false),await Dl(t),Hu({modal:t,wasCustom:true,closedBy:e}));}async function OC(e,t){if(!Nl().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");ao()&&await Cg(),gg(e,t),Wu(true),Uu(e),TC(e),await PC(e),e==="inventory"&&await Gu.set(true),await hg.set(e),ji=e,yg({modal:e,isCustom:true});}function NC(e,t){const n=Nl();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};gg(e,o);}async function Cg(){const e=Nl();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;bg(),Wu(false),Uu(null),t==="inventory"&&await Gu.set(false),await hg.set(null),ji=null,await Dl(t),Hu({modal:t,wasCustom:true,closedBy:"api"});}function DC(){return new Promise(e=>{if(!ao()){e();return}const t=vg(()=>{t(),e();});})}async function $C(){if(ao()){const e=to();e&&await Dl(e);}await LC(),CC();}const To={async init(){return MC()},isReady(){return mC()},async show(e,t){return OC(e,t)},update(e,t){return NC(e,t)},async close(){return Cg()},isOpen(){return to()!==null},isCustomOpen(){return ao()},getActiveModal(){return to()},waitForClose(){return DC()},onOpen(e){return wC(e)},onClose(e){return vg(e)},async destroy(){return $C()}};function BC(){return {ready:false,app:null,renderer:null,ctors:null,textures:new Map,animations:new Map,spriteMeta:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null,catalogKeys:new Set,animationFrameIds:new Map,loadingPromises:new Map,spritePngUrlResolver:null}}function zC(){return {lru:new Map,cost:0,srcCanvas:new Map}}function jC(){return {cache:new Map,maxEntries:200}}const GC={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},UC={enabled:true,maxEntries:200},dn=BC(),WC=zC(),HC={...GC},VC=jC(),qC={...UC};function Wt(){return dn}function Go(){return WC}function ra(){return HC}function oa(){return VC}function Rd(){return qC}function kg(){return dn.ready}function sl(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ca(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?sl(r):`sprite/${n}/${r}`}function Fd(e,t,n,r){const o=Ca(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=sl(i);return n.has(a)||r.has(a)?a:o}const Br=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},KC="https://mg-api.ariedam.fr/assets/sprite-data?full=1",Yf="https://mg-api.ariedam.fr/assets/sprites";let Mi=new Map;function YC(e){const t=e.startsWith("sprite/")?e.slice(7):e,n=t.indexOf("/");if(n>0){const r=t.slice(0,n),o=t.slice(n),i=Mi.get(r)??r;return `${Yf}/${i}${o}.png`}return `${Yf}/${t}.png`}function XC(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){fetch(e).then(r=>{if(!r.ok)n(new Error(`HTTP ${r.status} for ${e}`));else return r.json()}).then(r=>t(r)).catch(n);return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"json",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}t(r.response);},onerror(){n(new Error(`Network error: ${e}`));}});})}function JC(e){return new Promise((t,n)=>{if(typeof GM_xmlhttpRequest>"u"){const r=new Image;r.crossOrigin="anonymous",r.onload=()=>t(r),r.onerror=()=>n(new Error(`Failed to load: ${e}`)),r.src=e;return}GM_xmlhttpRequest({method:"GET",url:e,responseType:"blob",onload(r){if(r.status<200||r.status>=300){n(new Error(`HTTP ${r.status} for ${e}`));return}const o=r.response,i=URL.createObjectURL(o),a=new Image;a.onload=()=>{URL.revokeObjectURL(i),t(a);},a.onerror=()=>{URL.revokeObjectURL(i),n(new Error(`Failed to decode: ${e}`));},a.src=i;},onerror(){n(new Error(`Network error: ${e}`));}});})}function QC(e){const t=new Map;for(const n of e){const r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)continue;const[,o,i]=r;t.has(o)||t.set(o,new Set),t.get(o).add(i);}return t}function ZC(e){return {anchor:e.anchor??{x:.5,y:.5},sourceSize:e.sourceSize??{w:0,h:0},trimmed:e.trimmed??false,trimOffset:{x:e.spriteSourceSize?.x??0,y:e.spriteSourceSize?.y??0}}}async function ek(){Br("fetching sprite catalog from API...");const e=await XC(KC),t=e.items??e.categories?.flatMap(p=>p.items)??[];if(Br(`catalog received: ${t.length} entries`),e.categories){Mi=new Map;for(const p of e.categories)for(const c of p.items??[]){if(!c.id)continue;const h=/^sprite\/([^/]+)\//.exec(c.id);if(!h)continue;const b=h[1];(!Mi.get(b)||b===p.cat)&&Mi.set(b,p.cat);}Br("category mapping:",Object.fromEntries(Mi));}await new Promise(p=>setTimeout(p,0));const n=t.filter(p=>p.type==="frame"),r=t.filter(p=>p.type==="animation"),o=new Map,i=new Set;for(const p of n)o.set(p.id,ZC(p)),i.add(p.id);const a=new Map;for(const p of r)p.frames.length>=2&&(a.set(p.id,p.frames),i.add(p.id));await new Promise(p=>setTimeout(p,0));const s=[...i],d=QC(s);return Br(`indexed ${d.size} categories, ${a.size} animations, ${i.size} total keys`),{catalogKeys:i,meta:o,animationFrameIds:a,categoryIndex:d,pngUrlResolver:YC}}let os=null;async function tk(){return dn.ready?true:os||(os=(async()=>{const e=performance.now();Br("init start");const{catalogKeys:t,meta:n,animationFrameIds:r,categoryIndex:o,pngUrlResolver:i}=await ek();return dn.catalogKeys=t,dn.spriteMeta=n,dn.animationFrameIds=r,dn.categoryIndex=o,dn.spritePngUrlResolver=i,Br("catalog loaded","keys",dn.catalogKeys.size,"animations",dn.animationFrameIds.size,"categories",dn.categoryIndex?.size??0),dn.ready=true,Br("ready in",Math.round(performance.now()-e),"ms"),true})(),os)}function Sg(e,t){const n=t.textures.get(e);if(n)return Promise.resolve(n);const r=t.loadingPromises.get(e);if(r)return r;if(!t.catalogKeys.has(e)||!t.spritePngUrlResolver)return Promise.resolve(null);const o=t.spritePngUrlResolver(e),i=JC(o).then(a=>(t.textures.set(e,a),t.loadingPromises.delete(e),a)).catch(()=>(t.loadingPromises.delete(e),null));return t.loadingPromises.set(e,i),i}async function Ag(e,t){const n=new Map,r=e.map(async o=>{const i=await Sg(o,t);n.set(o,i);});return await Promise.all(r),n}const wr={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Thunderstruck:{overlayTall:"sprite/mutation-overlay/ThunderstruckTallPlant",tallIconOverride:"sprite/mutation/ThunderstruckGround"},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},nk=Object.keys(wr),rk=["Gold","Rainbow","Wet","Chilled","Frozen","Thunderstruck","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Xf=new Map(rk.map((e,t)=>[e,t]));function ll(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(Xf.get(n)??1/0)-(Xf.get(r)??1/0))}const ok=["Wet","Chilled","Frozen","Thunderstruck"],ik=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),ak={Banana:.68,Beet:.65,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},sk={Pepper:.6,Banana:.6},lk=256,ck=.5,dk=2;function Eg(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=ll(e),n=uk(e),r=pk(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function uk(e){const t=e.filter((o,i,a)=>wr[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?ll(t.filter(o=>!ok.includes(o))):ll(t)}function pk(e){const t=e.filter((n,r,o)=>wr[n]?.overlayTall&&o.indexOf(n)===r);return ll(t)}function Gi(e,t){return e.map(n=>({name:n,meta:wr[n],overlayTall:wr[n]?.overlayTall??null,isTall:t}))}const fk={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Thunderstruck:{op:"source-atop",colors:["rgb(16, 141, 163)"],a:.4},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},is=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function hk(e){return is.has(e)?e:is.has("overlay")?"overlay":is.has("screen")?"screen":is.has("lighter")?"lighter":"source-atop"}function mk(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,s=n/2;if(!o){const h=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*h,s-Math.sin(i)*h,a+Math.cos(i)*h,s+Math.sin(i)*h)}const d=Math.cos(i),p=Math.sin(i),c=Math.abs(d)*t/2+Math.abs(p)*n/2;return e.createLinearGradient(a-d*c,s-p*c,a+d*c,s+p*c)}function Jf(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?mk(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,d)=>a.addColorStop(d/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function gk(e,t,n,r){const o=fk[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,s=t.width,d=t.height;e.save();const p=i.masked?hk(i.op):"source-in";if(e.globalCompositeOperation=p,i.a!=null&&(e.globalAlpha=i.a),i.masked){const c=document.createElement("canvas");c.width=s,c.height=d;const h=c.getContext("2d");h.imageSmoothingEnabled=false,Jf(h,s,d,i,a),h.globalCompositeOperation="destination-in",h.drawImage(t,0,0),e.drawImage(c,0,0);}else Jf(e,s,d,i,a);e.restore();}function ka(e){const t=String(e||"").split("/");return t[t.length-1]||""}function ia(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];case "Thunderstruck":return ["Thunderstruck","ThunderstruckGround"];default:return [e]}}function bk(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function vk(e,t,n,r){if(!t)return null;const o=ka(e),i=ia(t);for(const a of i){const s=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const d of s){const p=n.get(d);if(p)return {tex:p,key:d}}{const d=`sprite/mutation-overlay/${a}TallPlant`,p=n.get(d);if(p)return {tex:p,key:d};const c=`sprite/mutation-overlay/${a}`,h=n.get(c);if(h)return {tex:h,key:c};const b=bk(t,n);if(b)return b}}return null}function yk(e,t,n,r){if(!t)return null;const o=wr[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const i=ka(e),a=ia(t);for(const s of a){const d=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const p of d){const c=r.get(p);if(c)return c}if(n){const p=`sprite/mutation-overlay/${s}TallPlantIcon`,c=r.get(p);if(c)return c;const h=`sprite/mutation-overlay/${s}TallPlant`,b=r.get(h);if(b)return b}}return null}function xk(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=sk[t]??i;const d=o>r*1.5;let p=ak[t]??(d?a:.4);const c={x:(s-i)*r,y:(p-a)*o},h=Math.min(r,o),b=Math.min(1.5,h/lk);let y=ck*b;return n&&(y*=dk),{width:r,height:o,anchorX:i,anchorY:a,offset:c,iconScale:y}}function wk(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",d=t.anchorX??.5,p=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${d}|ay${p}|bm${n}|bp${o}|p${r}`}function Ck(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function kk(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function Od(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Sk(e){e.cache.clear();}function Ak(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Ek(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function _k(e,t,n,r,o,i,a,s=5,d=0){if(!t.ready||!i.enabled)return 0;const p=e.length;let c=0;a?.(0,p);for(let h=0;h<p;h+=s){const b=e.slice(h,h+s);for(const y of b)try{await Dd(t,n,r,null,y,{scale:1},o,i),c++;}catch{c++;}a?.(c,p),h+s<p&&await Ek();}return c}function Nd(e){if(e instanceof HTMLCanvasElement)return Od(e);if(e instanceof HTMLImageElement){const t=document.createElement("canvas");t.width=e.naturalWidth||e.width,t.height=e.naturalHeight||e.height;const n=t.getContext("2d");return n&&(n.imageSmoothingEnabled=false,n.drawImage(e,0,0)),t}throw new Error("Cannot convert to canvas: unknown source type")}async function Ik(e,t,n){const r=Eg(t);if(!r.sig)return;const o=new Set,i=n.spriteMeta.get(e),a=i?.anchor?.y??.5,s=i?.sourceSize,d=s?.w??1,p=s?.h??1,c=a>.8&&p>d*1.8,h=Gi(r.selectedMuts,c),b=Gi(r.overlayMuts,c);for(const g of h){if(g.name==="Gold"||g.name==="Rainbow")continue;const S=wr[g.name];g.isTall&&S?.tallIconOverride&&o.add(S.tallIconOverride);const I=ka(e);for(const E of ia(g.name))o.add(`sprite/mutation/${E}Icon`),o.add(`sprite/mutation/${E}`),o.add(`sprite/mutation/${E}${I}`);}if(c)for(const g of b){g.overlayTall&&o.add(g.overlayTall);for(const S of ia(g.name))o.add(`sprite/mutation-overlay/${S}TallPlant`),o.add(`sprite/mutation-overlay/${S}`),o.add(`sprite/mutation/${S}`);}const y=[...o].filter(g=>n.catalogKeys.has(g)&&!n.textures.has(g));y.length>0&&await Ag(y,n);}function Tk(e,t,n,r){const o=wr[t];if(n&&o?.tallIconOverride&&r.has(o.tallIconOverride))return o.tallIconOverride;const i=ka(e),a=ia(t);for(const s of a){const d=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`];for(const p of d)if(r.has(p))return p}return null}function Pk(e,t,n,r,o){const i=Eg(n);if(!i.sig)return e;const a=e.width,s=e.height,d=o.get(t),p=d?.anchor?.x??.5,c=d?.anchor?.y??.5,h={x:a*p,y:s*c},b=c>.8&&s>a*1.8,y=Gi(i.muts,b),g=Gi(i.overlayMuts,b),S=Gi(i.selectedMuts,b),I=ka(t),M=xk({width:a,height:s,defaultAnchor:{x:p,y:c}},I,b),R=[];for(const P of S){if(P.name==="Gold"||P.name==="Rainbow")continue;const F=yk(t,P.name,P.isTall,r);if(F)try{const L=Nd(F),C=L.width*M.iconScale,_=L.height*M.iconScale,z=Tk(t,P.name,P.isTall,r),j=z?o.get(z):null,V=j?.anchor?.x??.5,U=j?.anchor?.y??.5,ce=h.x+M.offset.x-C*V,K=h.y+M.offset.y-_*U;let ie=2;P.isTall&&(ie=-1),ik.has(P.name)&&(ie=10),R.push({canvas:L,x:ce,y:K,sw:C,sh:_,z:ie});}catch{}}const D=document.createElement("canvas");D.width=a,D.height=s;const N=D.getContext("2d");N.imageSmoothingEnabled=false;for(const P of R)P.z===-1&&N.drawImage(P.canvas,P.x,P.y,P.sw,P.sh);N.drawImage(e,0,0);for(const P of y){const F=document.createElement("canvas");F.width=a,F.height=s;const L=F.getContext("2d");L.imageSmoothingEnabled=false,L.drawImage(e,0,0),gk(L,F,P.name,P.isTall),N.drawImage(F,0,0);}for(const P of R)P.z===2&&N.drawImage(P.canvas,P.x,P.y,P.sw,P.sh);if(b)for(const P of g){const F=P.overlayTall,L=F&&r.get(F)?{tex:r.get(F),key:F}:vk(t,P.name,r);if(L?.tex)try{const C=Nd(L.tex),_=C.width,z=C.height,j=h.x-p*_,V=0,U=document.createElement("canvas");U.width=_,U.height=z;const ce=U.getContext("2d");if(!ce)continue;ce.imageSmoothingEnabled=!1,ce.drawImage(C,0,0),ce.globalCompositeOperation="destination-in",ce.drawImage(e,-j,-V),N.drawImage(U,j,V);}catch{}}for(const P of R)P.z===10&&N.drawImage(P.canvas,P.x,P.y,P.sw,P.sh);return D}function Lk(e){return e.boundsMode?e.boundsMode:"base"}function Mk(e,t){return t.pad??0}function yi(e){return Number.isFinite(e)?Math.max(0,e):0}function _g(e){if(typeof e=="number"){const t=yi(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:yi(e.top??0),right:yi(e.right??0),bottom:yi(e.bottom??0),left:yi(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Rk(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=_g(t);return `${n.top},${n.right},${n.bottom},${n.left}`}async function Dd(e,t,n,r,o,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const d=Fd(r,o,e.catalogKeys,e.animationFrameIds),p=Lk(i),c=Mk(p,i),h=Rk(p,i.boundsPadding),b=a&&s?.enabled?wk(d,i,p,c,h):null;if(b&&a&&s?.enabled){const C=Ck(a,b);if(C)return Od(C)}const y=i.mutations||[],g=e.animationFrameIds.get(d);g?.length?await Ag(g,e):await Sg(d,e),y.length>0&&await Ik(d,y,e);const S=Math.max(0,(i.frameIndex??0)|0);let I;if(g?.length){const C=g.map(_=>e.textures.get(_)).filter(Boolean);I=C.length>0?C[S%C.length]:null;}else I=e.textures.get(d);if(!I)throw new Error(`Unknown sprite/anim key: ${d}`);let E=Nd(I);y.length>0&&(E=Pk(E,d,y,e.textures,e.spriteMeta));const M=i.scale??1,R=_g(i.boundsPadding),D=E.width,N=E.height,P=Math.max(1,Math.ceil((D+R.left+R.right+c*2)*M)),F=Math.max(1,Math.ceil((N+R.top+R.bottom+c*2)*M));let L;if(M===1&&!c&&!R.top&&!R.right&&!R.bottom&&!R.left)L=E;else {L=document.createElement("canvas"),L.width=P,L.height=F;const C=L.getContext("2d");if(C){C.imageSmoothingEnabled=false;const _=(R.left+c)*M,z=(R.top+c)*M;C.drawImage(E,_,z,D*M,N*M);}}return b&&a&&s?.enabled?(kk(a,s,b,L),Od(L)):L}function Qf(e,t,n,r,o,i={}){throw e.ready?!e.app||!e.ctors?new Error("MGSprite.show() requires PIXI (not available - use toCanvas() instead)"):new Error("MGSprite.show() is not supported in API-only mode"):new Error("MGSprite not ready yet")}function Fk(e){for(const t of Array.from(e.live)){const n=t.__mgDestroy;typeof n=="function"&&n.call(t);}}function Ok(e,t){return e.defaultParent=t,true}function Nk(e,t){return e.defaultParent=t,true}function Dk(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function so(){if(!kg())throw new Error("MGSprite not ready yet")}function $k(e,t,n){return typeof t=="string"?Qf(Wt(),Go(),ra(),e,t,n||{}):Qf(Wt(),Go(),ra(),null,e,t||{})}function Bk(e,t,n){return typeof t=="string"?Dd(Wt(),Go(),ra(),e,t,n||{},oa(),Rd()):Dd(Wt(),Go(),ra(),null,e,t||{},oa(),Rd())}function zk(){Fk(Wt());}function jk(e){return Ok(Wt(),e)}function Gk(e){return Nk(Wt(),e)}function Uk(e,t){const n=Wt(),r=typeof t=="string"?Fd(e,t,n.catalogKeys,n.animationFrameIds):Fd(null,e,n.catalogKeys,n.animationFrameIds);return n.catalogKeys.has(r)||n.animationFrameIds.has(r)}function Wk(){so();const e=Wt().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Hk(e){so();const t=String(e||"").trim();if(!t)return [];const n=Wt().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Vk(e,t){so();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Wt().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[s,d]of o.entries())if(s.toLowerCase()===i){for(const p of d.values())if(p.toLowerCase()===a)return  true}return  false}function qk(e){so();const t=Wt().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const s=Ca(o,a);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,i)=>o.localeCompare(i))}function Kk(e){so();const t=String(e||"").trim();if(!t)return null;const n=sl(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Wt().categoryIndex,s=o.toLowerCase(),d=i.toLowerCase();let p=o,c=i;if(a){const h=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!h)return null;p=h;const b=a.get(h);if(!b)return null;const y=Array.from(b.values()).find(g=>g.toLowerCase()===d);if(!y)return null;c=y;}return {category:p,id:c,key:Ca(p,c)}}function Yk(e,t){so();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Wt().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),s=Array.from(o.keys()).find(c=>c.toLowerCase()===i)||n,d=o.get(s);if(!d)throw new Error(`Unknown sprite category: ${n}`);const p=Array.from(d.values()).find(c=>c.toLowerCase()===a)||r;if(!d.has(p))throw new Error(`Unknown sprite id: ${n}/${r}`);return Ca(s,p)}function Xk(){Dk(Go());}function Jk(){Sk(oa());}function Qk(){return Ak(oa())}function Zk(){return [...nk]}async function eS(e,t,n=10,r=0){return so(),_k(e,Wt(),Go(),ra(),oa(),Rd(),t,n,r)}const Ne={init:tk,isReady:kg,show:$k,toCanvas:Bk,clear:zk,attach:jk,attachProvider:Gk,has:Uk,key:(e,t)=>Ca(e,t),getCategories:Wk,getCategoryId:Hk,hasId:Vk,listIds:qk,getIdInfo:Kk,getIdPath:Yk,clearMutationCache:Xk,clearToCanvasCache:Jk,getToCanvasCacheStats:Qk,getMutationNames:Zk,warmup:eS};function tS(){return {ready:false,xform:null,xformAt:0}}const hn=tS();function Ig(){return hn.ready}const Zf=Function.prototype.bind,Xe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Tg,Pg,Lg;const nS=new Promise(e=>{Tg=e;}),rS=new Promise(e=>{Pg=e;}),oS=new Promise(e=>{Lg=e;});function iS(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function aS(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function sS(e){Xe.engine=e,Xe.tos=aS(e)||null,Xe.app=e.app||null,Xe.renderer=e.app?.renderer||null,Xe.ticker=e.app?.ticker||null,Xe.stage=e.app?.stage||null;try{Tg(e);}catch{}try{Xe.app&&Pg(Xe.app);}catch{}try{Xe.renderer&&Lg(Xe.renderer);}catch{}}function qu(){return Xe.engine?true:(Xe._bindPatched||(Xe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Zf.call(this,e,...t);try{!Xe.engine&&iS(e)&&(Function.prototype.bind=Zf,Xe._bindPatched=!1,sS(e));}catch{}return n}),false)}qu();async function lS(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(Xe.engine)return  true;qu(),await Hm(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function cS(e=15e3){return Xe.engine||await lS(e),true}function dS(){return Xe.engine&&Xe.app?{ok:true,engine:Xe.engine,tos:Xe.tos,app:Xe.app}:(qu(),{ok:false,engine:Xe.engine,tos:Xe.tos,app:Xe.app,note:"Not captured. Wait for room, or reload."})}const Dn={engineReady:nS,appReady:rS,rendererReady:oS,engine:()=>Xe.engine,tos:()=>Xe.tos,app:()=>Xe.app,renderer:()=>Xe.renderer,ticker:()=>Xe.ticker,stage:()=>Xe.stage,PIXI:()=>fe.PIXI||null,init:cS,hook:dS,ready:()=>!!Xe.engine};function ti(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Sa(){return Dn.tos()}function Ku(){return Dn.engine()}function uS(){const e=Sa()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Yu(e,t){const n=uS();return n?t*n+e|0:null}let as=null;async function pS(e=15e3){return hn.ready?true:as||(as=(async()=>{if(await Dn.init(e),!Sa())throw new Error("MGTile: engine captured but tileObject system not found");return hn.ready=true,true})(),as)}function Yr(e,t,n=true){const r=Sa(),o=Yu(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function $c(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Xu(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Po(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Ku(),{gidx:s,tv:d}=Yr(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!d)throw new Error("MGTile: TileView unavailable (not instantiated)");const p=d.tileObject;if(typeof d.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(d.onDataChanged(n),i&&a?.reusableContext&&typeof d.update=="function")try{d.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:p,after:d.tileObject}}function $l(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=Yr(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?ti(s):s}}function fS(e,t,n={}){return Po(e,t,null,n)}function hS(e,t,n,r={}){const i=$l(e,t,{...r,clone:false}).tileView?.tileObject;Xu(i,"plant");const a=ti(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return $c(a.slots[s],n.slotPatch),Po(e,t,a,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let d=0;d<s.length;d++)if(s[d]!=null){if(!a.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);$c(a.slots[d],s[d]);}}else if(s&&typeof s=="object")for(const d of Object.keys(s)){const p=Number(d)|0;if(Number.isFinite(p)){if(!a.slots[p])throw new Error(`MGTile: plant slot ${p} doesn't exist`);$c(a.slots[p],s[p]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Po(e,t,a,r)}return Po(e,t,a,r)}function mS(e,t,n,r={}){const i=$l(e,t,{...r,clone:false}).tileView?.tileObject;Xu(i,"decor");const a=ti(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),Po(e,t,a,r)}function gS(e,t,n,r={}){const i=$l(e,t,{...r,clone:false}).tileView?.tileObject;Xu(i,"egg");const a=ti(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Po(e,t,a,r)}function bS(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Ku(),{gidx:s,tv:d}=Yr(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!d)throw new Error("MGTile: TileView unavailable");const p=d.tileObject,c=typeof n=="function"?n(ti(p)):n;if(d.onDataChanged(c),i&&a?.reusableContext&&typeof d.update=="function")try{d.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:p,after:d.tileObject}}function vS(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=Yr(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:a?ti(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Bc(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Ls(e){const t=kn(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=kn(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function yS(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Ls(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function xS(){const e=Sa(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const s=Yr(i,a,true).tv,d=i+1<t?Yr(i+1,a,true).tv:null,p=Yr(i,a+1,true).tv,c=Bc(s),h=Bc(d),b=Bc(p);if(!c||!h||!b)continue;const y=Ls(c),g=Ls(h),S=Ls(b);if(!y||!g||!S)continue;const I={x:g.x-y.x,y:g.y-y.y},E={x:S.x-y.x,y:S.y-y.y},M=I.x*E.y-I.y*E.x;if(!Number.isFinite(M)||Math.abs(M)<1e-6)continue;const R=1/M,D={a:E.y*R,b:-E.x*R,c:-I.y*R,d:I.x*R},N={x:y.x-i*I.x-a*E.x,y:y.y-i*I.y-a*E.y},P=yS(c),F=P==="center"?N:{x:N.x+.5*(I.x+E.x),y:N.y+.5*(I.y+E.y)};return {ok:true,cols:t,rows:r,vx:I,vy:E,inv:D,anchorMode:P,originCenter:F}}return null}function Mg(){return hn.xform=xS(),hn.xformAt=Date.now(),{ok:!!hn.xform?.ok,xform:hn.xform}}function wS(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!hn.xform?.ok||t.forceRebuild||Date.now()-hn.xformAt>n)&&Mg();const r=hn.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,s=r.inv.c*o+r.inv.d*i,d=Math.floor(a),p=Math.floor(s),c=[[d,p],[d+1,p],[d,p+1],[d+1,p+1]];let h=null,b=1/0;for(const[y,g]of c){if(y<0||g<0||y>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const S=r.originCenter.x+y*r.vx.x+g*r.vy.x,I=r.originCenter.y+y*r.vx.y+g*r.vy.y,E=(e.x-S)**2+(e.y-I)**2;E<b&&(b=E,h={tx:y,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return h?(h.gidx=Yu(h.tx,h.ty),h):null}function CS(e,t){const n=hn.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function yn(){if(!Ig())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function kS(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const ir={init:pS,isReady:Ig,hook:Dn.hook,engine:Ku,tos:Sa,gidx:(e,t)=>Yu(Number(e),Number(t)),getTileObject:(e,t,n={})=>(yn(),$l(e,t,n)),inspect:(e,t,n={})=>(yn(),vS(e,t,n)),setTileEmpty:(e,t,n={})=>(yn(),fS(e,t,n)),setTilePlant:(e,t,n,r={})=>(yn(),hS(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(yn(),mS(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(yn(),gS(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(yn(),bS(e,t,n,r)),rebuildTransform:()=>(yn(),Mg()),pointToTile:(e,t={})=>(yn(),wS(e,t)),tileToPoint:(e,t)=>(yn(),CS(e,t)),getTransform:()=>(yn(),hn.xform),help:kS};function SS(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const Te=SS();function Rg(){return Te.ready}async function AS(e=15e3){if(Te.ready)return $d(),true;if(await Dn.init(e),Te.app=Dn.app(),Te.ticker=Dn.ticker(),Te.renderer=Dn.renderer(),Te.stage=Dn.stage(),!Te.app||!Te.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return Te.ready=true,$d(),true}function $d(){const e=fe;return e.$PIXI=e.PIXI||null,e.$app=Te.app||null,e.$renderer=Te.renderer||null,e.$stage=Te.stage||null,e.$ticker=Te.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:Te.ready},e.__MG_PIXI__}function Ju(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Bd(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function cl(e){return !!(e&&typeof e.tint=="number")}function no(e){return !!(e&&typeof e.alpha=="number")}function Ms(e,t,n){return e+(t-e)*n}function ES(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,d=t&255,p=Ms(r,a,n)|0,c=Ms(o,s,n)|0,h=Ms(i,d,n)|0;return p<<16|c<<8|h}function _S(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;cl(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function IS(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;no(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)r.push(a[s]);}return n}const TS=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function zd(e){if(!e)return null;if(Bd(e))return e;if(!Ju(e))return null;for(const t of TS){const n=e[t];if(Bd(n))return n}return null}function PS(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let d=true;for(let p=0;p<t;p++){const c=zd(i[p]);if(!c){d=false;break}s[p]=c;}if(d)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Ju(i)){const s=i;for(const d of Object.keys(s))n.push({o:s[d],d:a+1});}}}return null}function Fg(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Ju(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function LS(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=Fg(t);return Te.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function MS(e){return Te.tileSets.delete(String(e||"").trim())}function RS(){return Array.from(Te.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Og(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Qu(e){const n=ir.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Og(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=Te.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=Fg(e.tiles||[]);const o=new Map;for(const i of r){const a=ir.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Zu(e){const t=Te.highlights.get(e);if(!t)return  false;kn(()=>Te.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&no(t.root)&&kn(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&cl(n.o)&&kn(()=>{n.o.tint=n.baseTint;});return Te.highlights.delete(e),true}function Ng(e=null){for(const t of Array.from(Te.highlights.keys()))e&&!String(t).startsWith(e)||Zu(t);return  true}function Dg(e,t={}){if(!Bd(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(Te.highlights.has(n))return n;const r=no(e)?Number(e.alpha):null,o=$n(Number(t.minAlpha??.12),0,1),i=$n(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,d=$n(Number(t.tintMix??.85),0,1),p=t.deepTint!==false,c=[];if(p)for(const y of _S(e))c.push({o:y,baseTint:y.tint});else cl(e)&&c.push({o:e,baseTint:e.tint});const h=performance.now(),b=()=>{const y=(performance.now()-h)/1e3,g=(Math.sin(y*Math.PI*2*a)+1)/2,S=g*g*(3-2*g);r!=null&&no(e)&&(e.alpha=$n(Ms(o,i,S)*r,0,1));const I=S*d;for(const E of c)E.o&&cl(E.o)&&(E.o.tint=ES(E.baseTint,s,I));};return Te.ticker?.add(b),Te.highlights.set(n,{root:e,tick:b,baseAlpha:r,tint:c}),n}function FS(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function $g(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=Qu(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)Ng(i);else for(const h of Array.from(Te.highlights.keys())){if(!h.startsWith(i))continue;const b=h.split(":"),y=Number(b[2]);o.has(y)&&Zu(h);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,d=0,p=0,c=0;for(const[h,b]of r){const y=b?.tileObject;if(!y||y.objectType!=="plant")continue;const g=y.slots;if(!Array.isArray(g)||g.length===0)continue;let S=false;const I=[];for(let R=0;R<g.length;R++)FS(g[R],n)&&(I.push(R),S=true);if(!S)continue;s++,d+=I.length;const E=b?.childView?.plantVisual||b?.childView||b,M=PS(E,g.length);if(!M){c+=I.length;continue}for(const R of I){const D=M[R];if(!D){c++;continue}const N=`${i}${h}:${R}`;Te.highlights.has(N)||(Dg(D,{key:N,...a}),p++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:d,newHighlights:p,failedSlots:c}}function OS(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Te.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{kn(()=>$g(n,{...t,clear:!1}));},o);return Te.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function NS(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Te.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),Te.watches.delete(i),o++);return o>0}const n=Te.watches.get(t);return n?(clearInterval(n),Te.watches.delete(t),true):false}function DS(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return zd(t)||zd(e?.displayObject)||null}function Bg(e){const t=Te.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&no(n.o)&&Number.isFinite(n.baseAlpha)&&kn(()=>{n.o.alpha=n.baseAlpha;});return Te.fades.delete(e),true}function jd(e=null){for(const t of Array.from(Te.fades.keys()))e&&!String(t).startsWith(e)||Bg(t);return  true}function zg(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!Og(t))return jd(r);const{gidxSet:o}=Qu(t);if(!o)return jd(r);for(const i of Array.from(Te.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&Bg(i);}return  true}function jg(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=$n(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=Qu(t),s=`fade:${n}:`;t.clear===true&&zg(n,t);let d=0,p=0,c=0,h=0;for(const[b,y]of i){const g=y?.tileObject;if(!g||g.objectType!=="plant")continue;d++;const S=String(g.species||"").trim().toLowerCase();if(!S||S!==n)continue;p++;const I=DS(y);if(!I||!no(I)){h++;continue}const E=`${s}${b}`;if(Te.fades.has(E)){kn(()=>{I.alpha=r;}),c++;continue}const M=o?IS(I):[I],R=[];for(const D of M)no(D)&&R.push({o:D,baseAlpha:Number(D.alpha)});for(const D of R)kn(()=>{D.o.alpha=r;});Te.fades.set(E,{targets:R}),c++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:d,matchedPlants:p,applied:c,failed:h,totalFades:Te.fades.size}}function $S(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=Te.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{kn(()=>jg(n,{...t,clear:!1}));},o);return Te.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function BS(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(Te.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),Te.fadeWatches.delete(i),o++);return o>0}const n=Te.fadeWatches.get(t);return n?(clearInterval(n),Te.fadeWatches.delete(t),true):false}function zS(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function jS(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=ir.getTileObject(r,o,{ensureView:i,clone:false}),s=a?.tileView||null,d=s?.tileObject,p={ok:true,tx:r,ty:o,gidx:a?.gidx??ir.gidx?.(r,o)??null,hasTileView:!!s,objectType:d?.objectType??null,tileObject:d??null,summary:d?.objectType==="plant"?zS(d):d?{objectType:d.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&kn(()=>console.log("[MGPixi.inspectTile]",p)),p}function GS(e,t,n){const r=fe.PIXI;if(!r)return;let o=Te.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",Te.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const s=ir.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const d=ir.getTransform(),p=d?Math.hypot(d.vx.x,d.vx.y):32,c=d?Math.hypot(d.vy.x,d.vy.y):32;a.drawRect(0,0,p,c),a.endFill(),a.x=s.x,a.y=s.y,d&&(a.rotation=Math.atan2(d.vx.y,d.vx.x));}function US(e){const t=Te.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Rt(){if(!Rg())throw new Error("MGPixi: call MGPixi.init() first")}const Bl={init:AS,isReady:Rg,expose:$d,get app(){return Te.app},get renderer(){return Te.renderer},get stage(){return Te.stage},get ticker(){return Te.ticker},get PIXI(){return fe.PIXI||null},defineTileSet:(e,t)=>(Rt(),LS(e,t)),deleteTileSet:e=>(Rt(),MS(e)),listTileSets:()=>(Rt(),RS()),highlightPulse:(e,t)=>(Rt(),Dg(e,t)),stopHighlight:e=>(Rt(),Zu(e)),clearHighlights:e=>(Rt(),Ng(e)),drawOverlayBox:(e,t,n)=>(Rt(),GS(e,t,n)),stopOverlay:e=>(Rt(),US(e)),highlightMutation:(e,t)=>(Rt(),$g(e,t)),watchMutation:(e,t)=>(Rt(),OS(e,t)),stopWatchMutation:e=>(Rt(),NS(e)),inspectTile:(e,t,n)=>(Rt(),jS(e,t,n)),fadeSpecies:(e,t)=>(Rt(),jg(e,t)),clearSpeciesFade:(e,t)=>(Rt(),zg(e,t)),clearFades:e=>(Rt(),jd(e)),watchFadeSpecies:(e,t)=>(Rt(),$S(e,t)),stopWatchFadeSpecies:e=>(Rt(),BS(e))},WS=["Top","Mid","Bottom","DiscordAvatarPlaceholder"],zc={AVATAR:/avatarelements[^"'`\s]*\.riv/,EMOTES:/emotes[^"'`\s]*\.riv/,UI:/(giftbox|currency|bread|donut|streak|countdown|loader)[^"'`\s]*\.riv/},Gg=new Map;let dl=[],Ug=false;function HS(e){return Gg.get(e)}function VS(e,t){Gg.set(e,t);}function zl(){return [...dl]}function qS(e){dl=e;}function Wg(e){dl.some(t=>t.url===e.url)||dl.push(e);}function KS(){return Ug}function eh(e){Ug=e;}const Lo=[];let Mr=null;function YS(){if(Mr)return Mr;const e=window.fetch;window.fetch=function(r,o){const i=nh(r);return i&&i.endsWith(".riv")&&th(i),e.call(this,r,o)},Mr=()=>{window.fetch===t&&(window.fetch=e),Mr=null;};function t(n,r){const o=nh(n);return o&&o.endsWith(".riv")&&th(o),e.call(window,n,r)}return window.fetch=t,Mr=()=>{window.fetch===t&&(window.fetch=e),Mr=null;},Mr}function th(e){const t=Ft.detect(),n=e.startsWith("/")?`${t.origin}${e}`:e,r=Vg(e),o=qg(e),i={name:o,url:n,type:r};Wg(i),console.log(`[MGRiveLoader] Intercepted .riv fetch: ${o} (${r})`,n);for(let a=Lo.length-1;a>=0;a--){const s=Lo[a];s.type===r&&(clearTimeout(s.timer),s.resolve(i),Lo.splice(a,1));}}async function XS(){const t=Ft.detect().origin,n=Array.from(document.scripts),r=[];for(const i of n){const a=i.textContent||"",s=rh(a,t);r.push(...s);}for(const i of n)if(i.src)try{if(new URL(i.src).origin!==t)continue;const s=await fetch(i.src);if(!s.ok)continue;const d=await s.text(),p=rh(d,t);r.push(...p);}catch(a){console.debug("[MGRiveLoader] Failed to fetch script:",i.src,a);}const o=Array.from(new Map(r.map(i=>[i.url,i])).values());for(const i of o)Wg(i);return zl()}async function JS(){YS();const e=await XS();return qS(e),console.log(`[MGRiveLoader] Discovered ${e.length} .riv files:`,e),e}function QS(e,t=3e4){const n=zl().find(r=>r.type===e);return n?Promise.resolve(n):new Promise(r=>{const o=setTimeout(()=>{const i=Lo.findIndex(a=>a.resolve===r);i!==-1&&Lo.splice(i,1),console.warn(`[MGRiveLoader] Timed out waiting for ${e} .riv file`),r(null);},t);Lo.push({type:e,resolve:r,timer:o});})}async function Hg(){const e=zl().find(n=>n.type==="avatar");if(e)return e;console.log("[MGRiveLoader] Avatar .riv not found yet, waiting for game to load it...");const t=await QS("avatar",3e4);return t||console.warn("[MGRiveLoader] Could not find avatar .riv file"),t}function nh(e){return typeof e=="string"?e:e instanceof URL?e.href:e instanceof Request?e.url:null}function rh(e,t){const n=[],r=new Set,o=/["'`]([^"'`]*\.riv)["'`]/g;let i;for(;(i=o.exec(e))!==null;){const a=i[1],s=Vg(a);if(s==="other"&&!a.endsWith(".riv")||r.has(a))continue;r.add(a);const d=a.startsWith("/")?`${t}${a}`:a;n.push({name:qg(a),url:d,type:s});}return n}function Vg(e){return zc.AVATAR.test(e)?"avatar":zc.EMOTES.test(e)?"emote":zc.UI.test(e)?"ui":"other"}function qg(e){const t=e.split("/");return t[t.length-1].replace(/-[a-zA-Z0-9_]+\.riv$/,"")}var Rs={exports:{}},ZS=Rs.exports,oh;function e1(){return oh||(oh=1,(function(e,t){(function(r,o){e.exports=o();})(ZS,()=>(()=>{var n=[,((a,s,d)=>{d.r(s),d.d(s,{default:()=>c});var p=(()=>{var h=typeof document<"u"?document.currentScript?.src:void 0;return(function(b={}){var y,g=b,S,I,E=new Promise((l,u)=>{S=l,I=u;}),M=typeof window=="object",R=typeof importScripts=="function";function D(){function l(H){const q=w;v=u=0,w=new Map,q.forEach(oe=>{try{oe(H);}catch(ee){console.error(ee);}}),this.ob(),T&&T.Qb();}let u=0,v=0,w=new Map,T=null,$=null;this.requestAnimationFrame=function(H){u||(u=requestAnimationFrame(l.bind(this)));const q=++v;return w.set(q,H),q},this.cancelAnimationFrame=function(H){w.delete(H),u&&w.size==0&&(cancelAnimationFrame(u),u=0);},this.Ob=function(H){$&&(document.body.remove($),$=null),H||($=document.createElement("div"),$.style.backgroundColor="black",$.style.position="fixed",$.style.right=0,$.style.top=0,$.style.color="white",$.style.padding="4px",$.innerHTML="RIVE FPS",H=function(q){$.innerHTML="RIVE FPS "+q.toFixed(1);},document.body.appendChild($)),T=new function(){let q=0,oe=0;this.Qb=function(){var ee=performance.now();oe?(++q,ee-=oe,1e3<ee&&(H(1e3*q/ee),q=oe=0)):(oe=ee,q=0);};};},this.Lb=function(){$&&(document.body.remove($),$=null),T=null;},this.ob=function(){};}function N(l){console.assert(true);const u=new Map;let v=-1/0;this.push=function(w){return w=w+((1<<l)-1)>>l,u.has(w)&&clearTimeout(u.get(w)),u.set(w,setTimeout(function(){u.delete(w),u.length==0?v=-1/0:w==v&&(v=Math.max(...u.keys()),console.assert(v<w));},1e3)),v=Math.max(w,v),v<<l};}const P=g.onRuntimeInitialized;g.onRuntimeInitialized=function(){P&&P();let l=g.decodeAudio;g.decodeAudio=function(T,$){T=l(T),$(T);};let u=g.decodeFont;g.decodeFont=function(T,$){T=u(T),$(T);};const v=g.FileAssetLoader;g.ptrToAsset=T=>{let $=g.ptrToFileAsset(T);return $.isImage?g.ptrToImageAsset(T):$.isFont?g.ptrToFontAsset(T):$.isAudio?g.ptrToAudioAsset(T):$},g.CustomFileAssetLoader=v.extend("CustomFileAssetLoader",{__construct:function({loadContents:T}){this.__parent.__construct.call(this),this.Eb=T;},loadContents:function(T,$){return T=g.ptrToAsset(T),this.Eb(T,$)}}),g.CDNFileAssetLoader=v.extend("CDNFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this);},loadContents:function(T){let $=g.ptrToAsset(T);return T=$.cdnUuid,T===""?false:((function(H,q){var oe=new XMLHttpRequest;oe.responseType="arraybuffer",oe.onreadystatechange=function(){oe.readyState==4&&oe.status==200&&q(oe);},oe.open("GET",H,true),oe.send(null);})($.cdnBaseUrl+"/"+T,H=>{$.decode(new Uint8Array(H.response));}),true)}}),g.FallbackFileAssetLoader=v.extend("FallbackFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this),this.kb=[];},addLoader:function(T){this.kb.push(T);},loadContents:function(T,$){for(let H of this.kb)if(H.loadContents(T,$))return  true;return  false}});let w=g.computeAlignment;g.computeAlignment=function(T,$,H,q,oe=1){return w.call(this,T,$,H,q,oe)};};const F="createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(" "),L=new function(){function l(){if(!u){let $e=function(Ue,Se,it){if(Se=pe.createShader(Se),pe.shaderSource(Se,it),pe.compileShader(Se),it=pe.getShaderInfoLog(Se),0<(it||"").length)throw it;pe.attachShader(Ue,Se);};var X=document.createElement("canvas"),be={alpha:1,depth:0,stencil:0,antialias:0,premultipliedAlpha:1,preserveDrawingBuffer:0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:1,explicitSwapControl:1,renderViaOffscreenBackBuffer:1};let pe;if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){if(pe=X.getContext("webgl",be),v=1,!pe)return console.log("No WebGL support. Image mesh will not be drawn."),false}else if(pe=X.getContext("webgl2",be))v=2;else if(pe=X.getContext("webgl",be))v=1;else return console.log("No WebGL support. Image mesh will not be drawn."),false;if(pe=new Proxy(pe,{get(Ue,Se){if(Ue.isContextLost()){if(oe||(console.error("Cannot render the mesh because the GL Context was lost. Tried to invoke ",Se),oe=true),typeof Ue[Se]=="function")return function(){}}else return typeof Ue[Se]=="function"?function(...it){return Ue[Se].apply(Ue,it)}:Ue[Se]},set(Ue,Se,it){if(Ue.isContextLost())oe||(console.error("Cannot render the mesh because the GL Context was lost. Tried to set property "+Se),oe=true);else return Ue[Se]=it,true}}),w=Math.min(pe.getParameter(pe.MAX_RENDERBUFFER_SIZE),pe.getParameter(pe.MAX_TEXTURE_SIZE)),X=pe.createProgram(),$e(X,pe.VERTEX_SHADER,`attribute vec2 vertex;
                attribute vec2 uv;
                uniform vec4 mat;
                uniform vec2 translate;
                varying vec2 st;
                void main() {
                    st = uv;
                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);
                }`),$e(X,pe.FRAGMENT_SHADER,`precision highp float;
                uniform sampler2D image;
                varying vec2 st;
                void main() {
                    gl_FragColor = texture2D(image, st);
                }`),pe.bindAttribLocation(X,0,"vertex"),pe.bindAttribLocation(X,1,"uv"),pe.linkProgram(X),be=pe.getProgramInfoLog(X),0<(be||"").trim().length)throw be;T=pe.getUniformLocation(X,"mat"),$=pe.getUniformLocation(X,"translate"),pe.useProgram(X),pe.bindBuffer(pe.ARRAY_BUFFER,pe.createBuffer()),pe.enableVertexAttribArray(0),pe.enableVertexAttribArray(1),pe.bindBuffer(pe.ELEMENT_ARRAY_BUFFER,pe.createBuffer()),pe.uniform1i(pe.getUniformLocation(X,"image"),0),pe.pixelStorei(pe.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true),u=pe;}return  true}let u=null,v=0,w=0,T=null,$=null,H=0,q=0,oe=false;l(),this.bc=function(){return l(),w},this.Kb=function(X){u.deleteTexture&&u.deleteTexture(X);},this.Jb=function(X){if(!l())return null;const be=u.createTexture();return be?(u.bindTexture(u.TEXTURE_2D,be),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,u.RGBA,u.UNSIGNED_BYTE,X),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),v==2?(u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR_MIPMAP_LINEAR),u.generateMipmap(u.TEXTURE_2D)):u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),be):null};const ee=new N(8),me=new N(8),Ae=new N(10),Ee=new N(10);this.Nb=function(X,be,pe,$e,Ue){if(l()){var Se=ee.push(X),it=me.push(be);if(u.canvas){(u.canvas.width!=Se||u.canvas.height!=it)&&(u.canvas.width=Se,u.canvas.height=it),u.viewport(0,it-be,X,be),u.disable(u.SCISSOR_TEST),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.enable(u.SCISSOR_TEST),pe.sort((Ye,Mn)=>Mn.vb-Ye.vb),Se=Ae.push($e),H!=Se&&(u.bufferData(u.ARRAY_BUFFER,8*Se,u.DYNAMIC_DRAW),H=Se),Se=0;for(var It of pe)u.bufferSubData(u.ARRAY_BUFFER,Se,It.Ta),Se+=4*It.Ta.length;console.assert(Se==4*$e);for(var en of pe)u.bufferSubData(u.ARRAY_BUFFER,Se,en.Bb),Se+=4*en.Bb.length;console.assert(Se==8*$e),Se=Ee.push(Ue),q!=Se&&(u.bufferData(u.ELEMENT_ARRAY_BUFFER,2*Se,u.DYNAMIC_DRAW),q=Se),It=0;for(var Ir of pe)u.bufferSubData(u.ELEMENT_ARRAY_BUFFER,It,Ir.indices),It+=2*Ir.indices.length;console.assert(It==2*Ue),Ir=0,en=true,Se=It=0;for(const Ye of pe){Ye.image.Ja!=Ir&&(u.bindTexture(u.TEXTURE_2D,Ye.image.Ia||null),Ir=Ye.image.Ja),Ye.hc?(u.scissor(Ye.Za,it-Ye.$a-Ye.jb,Ye.uc,Ye.jb),en=true):en&&(u.scissor(0,it-be,X,be),en=false),pe=2/X;const Mn=-2/be;u.uniform4f(T,Ye.ha[0]*pe*Ye.Aa,Ye.ha[1]*Mn*Ye.Ba,Ye.ha[2]*pe*Ye.Aa,Ye.ha[3]*Mn*Ye.Ba),u.uniform2f($,Ye.ha[4]*pe*Ye.Aa+pe*(Ye.Za-Ye.cc*Ye.Aa)-1,Ye.ha[5]*Mn*Ye.Ba+Mn*(Ye.$a-Ye.dc*Ye.Ba)+1),u.vertexAttribPointer(0,2,u.FLOAT,false,0,Se),u.vertexAttribPointer(1,2,u.FLOAT,false,0,Se+4*$e),u.drawElements(u.TRIANGLES,Ye.indices.length,u.UNSIGNED_SHORT,It),Se+=4*Ye.Ta.length,It+=2*Ye.indices.length;}console.assert(Se==4*$e),console.assert(It==2*Ue);}}},this.canvas=function(){return l()&&u.canvas};},C=g.onRuntimeInitialized;g.onRuntimeInitialized=function(){function l(ue){switch(ue){case ee.srcOver:return "source-over";case ee.screen:return "screen";case ee.overlay:return "overlay";case ee.darken:return "darken";case ee.lighten:return "lighten";case ee.colorDodge:return "color-dodge";case ee.colorBurn:return "color-burn";case ee.hardLight:return "hard-light";case ee.softLight:return "soft-light";case ee.difference:return "difference";case ee.exclusion:return "exclusion";case ee.multiply:return "multiply";case ee.hue:return "hue";case ee.saturation:return "saturation";case ee.color:return "color";case ee.luminosity:return "luminosity"}}function u(ue){return "rgba("+((16711680&ue)>>>16)+","+((65280&ue)>>>8)+","+((255&ue)>>>0)+","+((4278190080&ue)>>>24)/255+")"}function v(){0<it.length&&(L.Nb(Se.drawWidth(),Se.drawHeight(),it,It,en),it=[],en=It=0,Se.reset(512,512));for(const ue of Ue){for(const Ce of ue.I)Ce();ue.I=[];}Ue.clear();}C&&C();var w=g.RenderPaintStyle;const T=g.RenderPath,$=g.RenderPaint,H=g.Renderer,q=g.StrokeCap,oe=g.StrokeJoin,ee=g.BlendMode,me=w.fill,Ae=w.stroke,Ee=g.FillRule.evenOdd;let X=1;var be=g.RenderImage.extend("CanvasRenderImage",{__construct:function({la:ue,wa:Ce}={}){this.__parent.__construct.call(this),this.Ja=X,X=X+1&2147483647||1,this.la=ue,this.wa=Ce;},__destruct:function(){this.Ia&&(L.Kb(this.Ia),URL.revokeObjectURL(this.Wa)),this.__parent.__destruct.call(this);},decode:function(ue){var Ce=this;Ce.wa&&Ce.wa(Ce);var We=new Image;Ce.Wa=URL.createObjectURL(new Blob([ue],{type:"image/png"})),We.onload=function(){Ce.Db=We,Ce.Ia=L.Jb(We),Ce.size(We.width,We.height),Ce.la&&Ce.la(Ce);},We.src=Ce.Wa;}}),pe=T.extend("CanvasRenderPath",{__construct:function(){this.__parent.__construct.call(this),this.U=new Path2D;},rewind:function(){this.U=new Path2D;},addPath:function(ue,Ce,We,ze,et,He,je){var ot=this.U,Rn=ot.addPath;ue=ue.U;const wt=new DOMMatrix;wt.a=Ce,wt.b=We,wt.c=ze,wt.d=et,wt.e=He,wt.f=je,Rn.call(ot,ue,wt);},fillRule:function(ue){this.Va=ue;},moveTo:function(ue,Ce){this.U.moveTo(ue,Ce);},lineTo:function(ue,Ce){this.U.lineTo(ue,Ce);},cubicTo:function(ue,Ce,We,ze,et,He){this.U.bezierCurveTo(ue,Ce,We,ze,et,He);},close:function(){this.U.closePath();}}),$e=$.extend("CanvasRenderPaint",{color:function(ue){this.Xa=u(ue);},thickness:function(ue){this.Gb=ue;},join:function(ue){switch(ue){case oe.miter:this.Ha="miter";break;case oe.round:this.Ha="round";break;case oe.bevel:this.Ha="bevel";}},cap:function(ue){switch(ue){case q.butt:this.Ga="butt";break;case q.round:this.Ga="round";break;case q.square:this.Ga="square";}},style:function(ue){this.Fb=ue;},blendMode:function(ue){this.Cb=l(ue);},clearGradient:function(){this.ja=null;},linearGradient:function(ue,Ce,We,ze){this.ja={xb:ue,yb:Ce,cb:We,eb:ze,Qa:[]};},radialGradient:function(ue,Ce,We,ze){this.ja={xb:ue,yb:Ce,cb:We,eb:ze,Qa:[],ac:true};},addStop:function(ue,Ce){this.ja.Qa.push({color:ue,stop:Ce});},completeGradient:function(){},draw:function(ue,Ce,We,ze){let et=this.Fb;var He=this.Xa,je=this.ja;const ot=ue.globalCompositeOperation,Rn=ue.globalAlpha;if(ue.globalCompositeOperation=this.Cb,ue.globalAlpha=ze,je!=null){He=je.xb;const tn=je.yb,St=je.cb;var wt=je.eb;ze=je.Qa,je.ac?(je=St-He,wt-=tn,He=ue.createRadialGradient(He,tn,0,He,tn,Math.sqrt(je*je+wt*wt))):He=ue.createLinearGradient(He,tn,St,wt);for(let go=0,Xa=ze.length;go<Xa;go++)je=ze[go],He.addColorStop(je.stop,u(je.color));this.Xa=He,this.ja=null;}switch(et){case Ae:ue.strokeStyle=He,ue.lineWidth=this.Gb,ue.lineCap=this.Ga,ue.lineJoin=this.Ha,ue.stroke(Ce);break;case me:ue.fillStyle=He,ue.fill(Ce,We);}ue.globalCompositeOperation=ot,ue.globalAlpha=Rn;}});const Ue=new Set;let Se=null,it=[],It=0,en=0;var Ir=g.CanvasRenderer=H.extend("Renderer",{__construct:function(ue){this.__parent.__construct.call(this),this.T=[1,0,0,1,0,0],this.G=[1],this.B=ue.getContext("2d"),this.Ua=ue,this.I=[];},save:function(){this.T.push(...this.T.slice(this.T.length-6)),this.G.push(this.G[this.G.length-1]),this.I.push(this.B.save.bind(this.B));},restore:function(){const ue=this.T.length-6;if(6>ue)throw "restore() called without matching save().";this.T.splice(ue),this.G.pop(),this.I.push(this.B.restore.bind(this.B));},transform:function(ue,Ce,We,ze,et,He){const je=this.T,ot=je.length-6;je.splice(ot,6,je[ot]*ue+je[ot+2]*Ce,je[ot+1]*ue+je[ot+3]*Ce,je[ot]*We+je[ot+2]*ze,je[ot+1]*We+je[ot+3]*ze,je[ot]*et+je[ot+2]*He+je[ot+4],je[ot+1]*et+je[ot+3]*He+je[ot+5]),this.I.push(this.B.transform.bind(this.B,ue,Ce,We,ze,et,He));},rotate:function(ue){const Ce=Math.sin(ue);ue=Math.cos(ue),this.transform(ue,Ce,-Ce,ue,0,0);},modulateOpacity:function(ue){this.G[this.G.length-1]*=ue;},_drawPath:function(ue,Ce){this.I.push(Ce.draw.bind(Ce,this.B,ue.U,ue.Va===Ee?"evenodd":"nonzero",Math.max(0,this.G[this.G.length-1])));},_drawRiveImage:function(ue,Ce,We,ze){var et=ue.Db;if(et){var He=this.B,je=l(We),ot=Math.max(0,ze*this.G[this.G.length-1]);this.I.push(function(){He.globalCompositeOperation=je,He.globalAlpha=ot,He.drawImage(et,0,0),He.globalAlpha=1;});}},_getMatrix:function(ue){const Ce=this.T,We=Ce.length-6;for(let ze=0;6>ze;++ze)ue[ze]=Ce[We+ze];},_drawImageMesh:function(ue,Ce,We,ze,et,He,je,ot,Rn,wt,tn){Ce=this.B.canvas.width;var St=this.B.canvas.height;const go=wt-ot,Xa=tn-Rn;ot=Math.max(ot,0),Rn=Math.max(Rn,0),wt=Math.min(wt,Ce),tn=Math.min(tn,St);const bi=wt-ot,vi=tn-Rn;if(console.assert(bi<=Math.min(go,Ce)),console.assert(vi<=Math.min(Xa,St)),!(0>=bi||0>=vi)){wt=bi<go||vi<Xa,Ce=tn=1;var Tr=Math.ceil(bi*tn),Pr=Math.ceil(vi*Ce);St=L.bc(),Tr>St&&(tn*=St/Tr,Tr=St),Pr>St&&(Ce*=St/Pr,Pr=St),Se||(Se=new g.DynamicRectanizer(St),Se.reset(512,512)),St=Se.addRect(Tr,Pr),0>St&&(v(),Ue.add(this),St=Se.addRect(Tr,Pr),console.assert(0<=St));var $f=St&65535,Bf=St>>16;it.push({ha:this.T.slice(this.T.length-6),image:ue,Za:$f,$a:Bf,cc:ot,dc:Rn,uc:Tr,jb:Pr,Aa:tn,Ba:Ce,Ta:new Float32Array(et),Bb:new Float32Array(He),indices:new Uint16Array(je),hc:wt,vb:ue.Ja<<1|(wt?1:0)}),It+=et.length,en+=je.length;var bo=this.B,K0=l(We),Y0=Math.max(0,ze*this.G[this.G.length-1]);this.I.push(function(){bo.save(),bo.resetTransform(),bo.globalCompositeOperation=K0,bo.globalAlpha=Y0;const zf=L.canvas();zf&&bo.drawImage(zf,$f,Bf,Tr,Pr,ot,Rn,bi,vi),bo.restore();});}},_clipPath:function(ue){this.I.push(this.B.clip.bind(this.B,ue.U,ue.Va===Ee?"evenodd":"nonzero"));},clear:function(){Ue.add(this),this.I.push(this.B.clearRect.bind(this.B,0,0,this.Ua.width,this.Ua.height));},flush:function(){},translate:function(ue,Ce){this.transform(1,0,0,1,ue,Ce);}});g.makeRenderer=function(ue){const Ce=new Ir(ue),We=Ce.B;return new Proxy(Ce,{get(ze,et){if(typeof ze[et]=="function")return function(...He){return ze[et].apply(ze,He)};if(typeof We[et]=="function"){if(-1<F.indexOf(et))throw Error("RiveException: Method call to '"+et+"()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.");return function(...He){Ce.I.push(We[et].bind(We,...He));}}return ze[et]},set(ze,et,He){if(et in We)return Ce.I.push(()=>{We[et]=He;}),true}})},g.decodeImage=function(ue,Ce){new be({la:Ce}).decode(ue);},g.renderFactory={makeRenderPaint:function(){return new $e},makeRenderPath:function(){return new pe},makeRenderImage:function(){let ue=Mn;return new be({wa:()=>{ue.total++;},la:()=>{if(ue.loaded++,ue.loaded===ue.total){const Ce=ue.ready;Ce&&(Ce(),ue.ready=null);}}})}};let Ye=g.load,Mn=null;g.load=function(ue,Ce,We=true){const ze=new g.FallbackFileAssetLoader;return Ce!==void 0&&ze.addLoader(Ce),We&&(Ce=new g.CDNFileAssetLoader,ze.addLoader(Ce)),new Promise(function(et){let He=null;Mn={total:0,loaded:0,ready:function(){et(He);}},He=Ye(ue,ze),Mn.total==0&&et(He);})};let q0=g.RendererWrapper.prototype.align;g.RendererWrapper.prototype.align=function(ue,Ce,We,ze,et=1){q0.call(this,ue,Ce,We,ze,et);},w=new D,g.requestAnimationFrame=w.requestAnimationFrame.bind(w),g.cancelAnimationFrame=w.cancelAnimationFrame.bind(w),g.enableFPSCounter=w.Ob.bind(w),g.disableFPSCounter=w.Lb,w.ob=v,g.resolveAnimationFrame=v,g.cleanup=function(){Se&&Se.delete();};};var _=Object.assign({},g),z="./this.program",j="",V,U;(M||R)&&(R?j=self.location.href:typeof document<"u"&&document.currentScript&&(j=document.currentScript.src),h&&(j=h),j.startsWith("blob:")?j="":j=j.substr(0,j.replace(/[?#].*/,"").lastIndexOf("/")+1),R&&(U=l=>{var u=new XMLHttpRequest;return u.open("GET",l,false),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),V=(l,u,v)=>{if(qt(l)){var w=new XMLHttpRequest;w.open("GET",l,true),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?u(w.response):v();},w.onerror=v,w.send(null);}else fetch(l,{credentials:"same-origin"}).then(T=>T.ok?T.arrayBuffer():Promise.reject(Error(T.status+" : "+T.url))).then(u,v);});var ce=g.print||console.log.bind(console),K=g.printErr||console.error.bind(console);Object.assign(g,_),_=null,g.thisProgram&&(z=g.thisProgram);var ie;g.wasmBinary&&(ie=g.wasmBinary);var se,ae=false,ne,Y,Z,O,B,J,re,le;function ye(){var l=se.buffer;g.HEAP8=ne=new Int8Array(l),g.HEAP16=Z=new Int16Array(l),g.HEAPU8=Y=new Uint8Array(l),g.HEAPU16=O=new Uint16Array(l),g.HEAP32=B=new Int32Array(l),g.HEAPU32=J=new Uint32Array(l),g.HEAPF32=re=new Float32Array(l),g.HEAPF64=le=new Float64Array(l);}var Ie=[],Be=[],xt=[];function zt(){var l=g.preRun.shift();Ie.unshift(l);}var ut=0,Et=null;function Vt(l){throw g.onAbort?.(l),l="Aborted("+l+")",K(l),ae=true,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),I(l),l}var Mt=l=>l.startsWith("data:application/octet-stream;base64,"),qt=l=>l.startsWith("file://"),rt;function De(l){if(l==rt&&ie)return new Uint8Array(ie);if(U)return U(l);throw "both async and sync fetching of the wasm failed"}function bn(l){return ie?Promise.resolve().then(()=>De(l)):new Promise((u,v)=>{V(l,w=>u(new Uint8Array(w)),()=>{try{u(De(l));}catch(w){v(w);}});})}function vn(l,u,v){return bn(l).then(w=>WebAssembly.instantiate(w,u)).then(v,w=>{K(`failed to asynchronously prepare wasm: ${w}`),Vt(w);})}function ht(l,u){var v=rt;return ie||typeof WebAssembly.instantiateStreaming!="function"||Mt(v)||qt(v)||typeof fetch!="function"?vn(v,l,u):fetch(v,{credentials:"same-origin"}).then(w=>WebAssembly.instantiateStreaming(w,l).then(u,function(T){return K(`wasm streaming compile failed: ${T}`),K("falling back to ArrayBuffer instantiation"),vn(v,l,u)}))}var kt,Kt,In={490930:(l,u,v,w,T)=>{if(typeof window>"u"||(window.AudioContext||window.webkitAudioContext)===void 0)return 0;if(typeof window.h>"u"){window.h={za:0},window.h.J={},window.h.J.xa=l,window.h.J.capture=u,window.h.J.Ka=v,window.h.ga={},window.h.ga.stopped=w,window.h.ga.wb=T;let $=window.h;$.D=[],$.sc=function(H){for(var q=0;q<$.D.length;++q)if($.D[q]==null)return $.D[q]=H,q;return $.D.push(H),$.D.length-1},$.Ab=function(H){for($.D[H]=null;0<$.D.length&&$.D[$.D.length-1]==null;)$.D.pop();},$.Pc=function(H){for(var q=0;q<$.D.length;++q)if($.D[q]==H)return $.Ab(q)},$.qa=function(H){return $.D[H]},$.Sa=["touchend","click"],$.unlock=function(){for(var H=0;H<$.D.length;++H){var q=$.D[H];q!=null&&q.L!=null&&q.state===$.ga.wb&&q.L.resume().then(()=>{Lf(q.pb);},oe=>{console.error("Failed to resume audiocontext",oe);});}$.Sa.map(function(oe){document.removeEventListener(oe,$.unlock,true);});},$.Sa.map(function(H){document.addEventListener(H,$.unlock,true);});}return window.h.za+=1,1},493108:()=>{typeof window.h<"u"&&(window.h.Sa.map(function(l){document.removeEventListener(l,window.h.unlock,true);}),--window.h.za,window.h.za===0&&delete window.h);},493412:()=>navigator.mediaDevices!==void 0&&navigator.mediaDevices.getUserMedia!==void 0,493516:()=>{try{var l=new(window.AudioContext||window.webkitAudioContext),u=l.sampleRate;return l.close(),u}catch{return 0}},493687:(l,u,v,w,T,$)=>{if(typeof window.h>"u")return  -1;var H={},q={};return l==window.h.J.xa&&v!=0&&(q.sampleRate=v),H.L=new(window.AudioContext||window.webkitAudioContext)(q),H.L.suspend(),H.state=window.h.ga.stopped,v=0,l!=window.h.J.xa&&(v=u),H.Z=H.L.createScriptProcessor(w,v,u),H.Z.onaudioprocess=function(oe){if((H.ra==null||H.ra.length==0)&&(H.ra=new Float32Array(re.buffer,T,w*u)),l==window.h.J.capture||l==window.h.J.Ka){for(var ee=0;ee<u;ee+=1)for(var me=oe.inputBuffer.getChannelData(ee),Ae=H.ra,Ee=0;Ee<w;Ee+=1)Ae[Ee*u+ee]=me[Ee];Mf($,w,T);}if(l==window.h.J.xa||l==window.h.J.Ka)for(Rf($,w,T),ee=0;ee<oe.outputBuffer.numberOfChannels;++ee)for(me=oe.outputBuffer.getChannelData(ee),Ae=H.ra,Ee=0;Ee<w;Ee+=1)me[Ee]=Ae[Ee*u+ee];else for(ee=0;ee<oe.outputBuffer.numberOfChannels;++ee)oe.outputBuffer.getChannelData(ee).fill(0);},l!=window.h.J.capture&&l!=window.h.J.Ka||navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(function(oe){H.Ca=H.L.createMediaStreamSource(oe),H.Ca.connect(H.Z),H.Z.connect(H.L.destination);}).catch(function(oe){console.log("Failed to get user media: "+oe);}),l==window.h.J.xa&&H.Z.connect(H.L.destination),H.pb=$,window.h.sc(H)},496564:l=>window.h.qa(l).L.sampleRate,496637:l=>{l=window.h.qa(l),l.Z!==void 0&&(l.Z.onaudioprocess=function(){},l.Z.disconnect(),l.Z=void 0),l.Ca!==void 0&&(l.Ca.disconnect(),l.Ca=void 0),l.L.close(),l.L=void 0,l.pb=void 0;},497037:l=>{window.h.Ab(l);},497087:l=>{l=window.h.qa(l),l.L.resume(),l.state=window.h.ga.wb;},497226:l=>{l=window.h.qa(l),l.L.suspend(),l.state=window.h.ga.stopped;}},on=l=>{for(;0<l.length;)l.shift()(g);};function k(){var l=B[+ci>>2];return ci+=4,l}var f=(l,u)=>{for(var v=0,w=l.length-1;0<=w;w--){var T=l[w];T==="."?l.splice(w,1):T===".."?(l.splice(w,1),v++):v&&(l.splice(w,1),v--);}if(u)for(;v;v--)l.unshift("..");return l},m=l=>{var u=l.charAt(0)==="/",v=l.substr(-1)==="/";return (l=f(l.split("/").filter(w=>!!w),!u).join("/"))||u||(l="."),l&&v&&(l+="/"),(u?"/":"")+l},A=l=>{var u=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(l).slice(1);return l=u[0],u=u[1],!l&&!u?".":(u&&(u=u.substr(0,u.length-1)),l+u)},G=l=>{if(l==="/")return "/";l=m(l),l=l.replace(/\/$/,"");var u=l.lastIndexOf("/");return u===-1?l:l.substr(u+1)},W=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return l=>crypto.getRandomValues(l);Vt("initRandomDevice");},Q=l=>(Q=W())(l),de=(...l)=>{for(var u="",v=false,w=l.length-1;-1<=w&&!v;w--){if(v=0<=w?l[w]:"/",typeof v!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!v)return "";u=v+"/"+u,v=v.charAt(0)==="/";}return u=f(u.split("/").filter(T=>!!T),!v).join("/"),(v?"/":"")+u||"."},xe=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,ge=(l,u,v)=>{var w=u+v;for(v=u;l[v]&&!(v>=w);)++v;if(16<v-u&&l.buffer&&xe)return xe.decode(l.subarray(u,v));for(w="";u<v;){var T=l[u++];if(T&128){var $=l[u++]&63;if((T&224)==192)w+=String.fromCharCode((T&31)<<6|$);else {var H=l[u++]&63;T=(T&240)==224?(T&15)<<12|$<<6|H:(T&7)<<18|$<<12|H<<6|l[u++]&63,65536>T?w+=String.fromCharCode(T):(T-=65536,w+=String.fromCharCode(55296|T>>10,56320|T&1023));}}else w+=String.fromCharCode(T);}return w},we=[],Ze=l=>{for(var u=0,v=0;v<l.length;++v){var w=l.charCodeAt(v);127>=w?u++:2047>=w?u+=2:55296<=w&&57343>=w?(u+=4,++v):u+=3;}return u},st=(l,u,v,w)=>{if(!(0<w))return 0;var T=v;w=v+w-1;for(var $=0;$<l.length;++$){var H=l.charCodeAt($);if(55296<=H&&57343>=H){var q=l.charCodeAt(++$);H=65536+((H&1023)<<10)|q&1023;}if(127>=H){if(v>=w)break;u[v++]=H;}else {if(2047>=H){if(v+1>=w)break;u[v++]=192|H>>6;}else {if(65535>=H){if(v+2>=w)break;u[v++]=224|H>>12;}else {if(v+3>=w)break;u[v++]=240|H>>18,u[v++]=128|H>>12&63;}u[v++]=128|H>>6&63;}u[v++]=128|H&63;}}return u[v]=0,v-T};function qe(l,u){var v=Array(Ze(l)+1);return l=st(l,v,0,v.length),u&&(v.length=l),v}var _t=[];function bt(l,u){_t[l]={input:[],H:[],W:u},hc(l,Jt);}var Jt={open(l){var u=_t[l.node.ya];if(!u)throw new _e(43);l.s=u,l.seekable=false;},close(l){l.s.W.pa(l.s);},pa(l){l.s.W.pa(l.s);},read(l,u,v,w){if(!l.s||!l.s.W.ib)throw new _e(60);for(var T=0,$=0;$<w;$++){try{var H=l.s.W.ib(l.s);}catch{throw new _e(29)}if(H===void 0&&T===0)throw new _e(6);if(H==null)break;T++,u[v+$]=H;}return T&&(l.node.timestamp=Date.now()),T},write(l,u,v,w){if(!l.s||!l.s.W.Na)throw new _e(60);try{for(var T=0;T<w;T++)l.s.W.Na(l.s,u[v+T]);}catch{throw new _e(29)}return w&&(l.node.timestamp=Date.now()),T}},Qt={ib(){e:{if(!we.length){var l=null;if(typeof window<"u"&&typeof window.prompt=="function"&&(l=window.prompt("Input: "),l!==null&&(l+=`
`)),!l){l=null;break e}we=qe(l,true);}l=we.shift();}return l},Na(l,u){u===null||u===10?(ce(ge(l.H,0)),l.H=[]):u!=0&&l.H.push(u);},pa(l){l.H&&0<l.H.length&&(ce(ge(l.H,0)),l.H=[]);},Yb(){return {Ac:25856,Cc:5,zc:191,Bc:35387,yc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Zb(){return 0},$b(){return [24,80]}},an={Na(l,u){u===null||u===10?(K(ge(l.H,0)),l.H=[]):u!=0&&l.H.push(u);},pa(l){l.H&&0<l.H.length&&(K(ge(l.H,0)),l.H=[]);}};function Hn(l,u){var v=l.l?l.l.length:0;v>=u||(u=Math.max(u,v*(1048576>v?2:1.125)>>>0),v!=0&&(u=Math.max(u,256)),v=l.l,l.l=new Uint8Array(u),0<l.v&&l.l.set(v.subarray(0,l.v),0));}var Oe={O:null,V(){return Oe.createNode(null,"/",16895,0)},createNode(l,u,v,w){if((v&61440)===24576||(v&61440)===4096)throw new _e(63);return Oe.O||(Oe.O={dir:{node:{Y:Oe.j.Y,R:Oe.j.R,ka:Oe.j.ka,ua:Oe.j.ua,tb:Oe.j.tb,zb:Oe.j.zb,ub:Oe.j.ub,sb:Oe.j.sb,Da:Oe.j.Da},stream:{ba:Oe.m.ba}},file:{node:{Y:Oe.j.Y,R:Oe.j.R},stream:{ba:Oe.m.ba,read:Oe.m.read,write:Oe.m.write,Ya:Oe.m.Ya,lb:Oe.m.lb,nb:Oe.m.nb}},link:{node:{Y:Oe.j.Y,R:Oe.j.R,ma:Oe.j.ma},stream:{}},ab:{node:{Y:Oe.j.Y,R:Oe.j.R},stream:v0}}),v=rf(l,u,v,w),(v.mode&61440)===16384?(v.j=Oe.O.dir.node,v.m=Oe.O.dir.stream,v.l={}):(v.mode&61440)===32768?(v.j=Oe.O.file.node,v.m=Oe.O.file.stream,v.v=0,v.l=null):(v.mode&61440)===40960?(v.j=Oe.O.link.node,v.m=Oe.O.link.stream):(v.mode&61440)===8192&&(v.j=Oe.O.ab.node,v.m=Oe.O.ab.stream),v.timestamp=Date.now(),l&&(l.l[u]=v,l.timestamp=v.timestamp),v},Gc(l){return l.l?l.l.subarray?l.l.subarray(0,l.v):new Uint8Array(l.l):new Uint8Array(0)},j:{Y(l){var u={};return u.Ec=(l.mode&61440)===8192?l.id:1,u.Ic=l.id,u.mode=l.mode,u.Lc=1,u.uid=0,u.Hc=0,u.ya=l.ya,(l.mode&61440)===16384?u.size=4096:(l.mode&61440)===32768?u.size=l.v:(l.mode&61440)===40960?u.size=l.link.length:u.size=0,u.wc=new Date(l.timestamp),u.Kc=new Date(l.timestamp),u.Dc=new Date(l.timestamp),u.Hb=4096,u.xc=Math.ceil(u.size/u.Hb),u},R(l,u){if(u.mode!==void 0&&(l.mode=u.mode),u.timestamp!==void 0&&(l.timestamp=u.timestamp),u.size!==void 0&&(u=u.size,l.v!=u))if(u==0)l.l=null,l.v=0;else {var v=l.l;l.l=new Uint8Array(u),v&&l.l.set(v.subarray(0,Math.min(u,l.v))),l.v=u;}},ka(){throw fc[44]},ua(l,u,v,w){return Oe.createNode(l,u,v,w)},tb(l,u,v){if((l.mode&61440)===16384){try{var w=Fa(u,v);}catch{}if(w)for(var T in w.l)throw new _e(55)}delete l.parent.l[l.name],l.parent.timestamp=Date.now(),l.name=v,u.l[v]=l,u.timestamp=l.parent.timestamp;},zb(l,u){delete l.l[u],l.timestamp=Date.now();},ub(l,u){var v=Fa(l,u),w;for(w in v.l)throw new _e(55);delete l.l[u],l.timestamp=Date.now();},sb(l){var u=[".",".."],v;for(v of Object.keys(l.l))u.push(v);return u},Da(l,u,v){return l=Oe.createNode(l,u,41471,0),l.link=v,l},ma(l){if((l.mode&61440)!==40960)throw new _e(28);return l.link}},m:{read(l,u,v,w,T){var $=l.node.l;if(T>=l.node.v)return 0;if(l=Math.min(l.node.v-T,w),8<l&&$.subarray)u.set($.subarray(T,T+l),v);else for(w=0;w<l;w++)u[v+w]=$[T+w];return l},write(l,u,v,w,T,$){if(u.buffer===ne.buffer&&($=false),!w)return 0;if(l=l.node,l.timestamp=Date.now(),u.subarray&&(!l.l||l.l.subarray)){if($)return l.l=u.subarray(v,v+w),l.v=w;if(l.v===0&&T===0)return l.l=u.slice(v,v+w),l.v=w;if(T+w<=l.v)return l.l.set(u.subarray(v,v+w),T),w}if(Hn(l,T+w),l.l.subarray&&u.subarray)l.l.set(u.subarray(v,v+w),T);else for($=0;$<w;$++)l.l[T+$]=u[v+$];return l.v=Math.max(l.v,T+w),w},ba(l,u,v){if(v===1?u+=l.position:v===2&&(l.node.mode&61440)===32768&&(u+=l.node.v),0>u)throw new _e(28);return u},Ya(l,u,v){Hn(l.node,u+v),l.node.v=Math.max(l.node.v,u+v);},lb(l,u,v,w,T){if((l.node.mode&61440)!==32768)throw new _e(43);if(l=l.node.l,T&2||l.buffer!==ne.buffer){if((0<v||v+u<l.length)&&(l.subarray?l=l.subarray(v,v+u):l=Array.prototype.slice.call(l,v,v+u)),v=true,Vt(),u=void 0,!u)throw new _e(48);ne.set(l,u);}else v=false,u=l.byteOffset;return {o:u,vc:v}},nb(l,u,v,w){return Oe.m.write(l,u,0,w,v,false),0}}},Vn=(l,u)=>{var v=0;return l&&(v|=365),u&&(v|=146),v},sn=null,Ke={},ln=[],h0=1,si=null,ef=true,_e=class{constructor(l){this.name="ErrnoError",this.aa=l;}},fc={},m0=class{constructor(){this.h={},this.node=null;}get flags(){return this.h.flags}set flags(l){this.h.flags=l;}get position(){return this.h.position}set position(l){this.h.position=l;}},g0=class{constructor(l,u,v,w){l||(l=this),this.parent=l,this.V=l.V,this.va=null,this.id=h0++,this.name=u,this.mode=v,this.j={},this.m={},this.ya=w;}get read(){return (this.mode&365)===365}set read(l){l?this.mode|=365:this.mode&=-366;}get write(){return (this.mode&146)===146}set write(l){l?this.mode|=146:this.mode&=-147;}};function Ar(l,u={}){if(l=de(l),!l)return {path:"",node:null};if(u=Object.assign({hb:true,Pa:0},u),8<u.Pa)throw new _e(32);l=l.split("/").filter(H=>!!H);for(var v=sn,w="/",T=0;T<l.length;T++){var $=T===l.length-1;if($&&u.parent)break;if(v=Fa(v,l[T]),w=m(w+"/"+l[T]),v.va&&(!$||$&&u.hb)&&(v=v.va.root),!$||u.gb){for($=0;(v.mode&61440)===40960;)if(v=y0(w),w=de(A(w),v),v=Ar(w,{Pa:u.Pa+1}).node,40<$++)throw new _e(32)}}return {path:w,node:v}}function tf(l){for(var u;;){if(l===l.parent)return l=l.V.mb,u?l[l.length-1]!=="/"?`${l}/${u}`:l+u:l;u=u?`${l.name}/${u}`:l.name,l=l.parent;}}function nf(l,u){for(var v=0,w=0;w<u.length;w++)v=(v<<5)-v+u.charCodeAt(w)|0;return (l+v>>>0)%si.length}function Fa(l,u){var v=(l.mode&61440)===16384?(v=Oa(l,"x"))?v:l.j.ka?0:2:54;if(v)throw new _e(v);for(v=si[nf(l.id,u)];v;v=v.fc){var w=v.name;if(v.parent.id===l.id&&w===u)return v}return l.j.ka(l,u)}function rf(l,u,v,w){return l=new g0(l,u,v,w),u=nf(l.parent.id,l.name),l.fc=si[u],si[u]=l}function of(l){var u=["r","w","rw"][l&3];return l&512&&(u+="w"),u}function Oa(l,u){if(ef)return 0;if(!u.includes("r")||l.mode&292){if(u.includes("w")&&!(l.mode&146)||u.includes("x")&&!(l.mode&73))return 2}else return 2;return 0}function af(l,u){try{return Fa(l,u),20}catch{}return Oa(l,"wx")}function cr(l){if(l=ln[l],!l)throw new _e(8);return l}function sf(l,u=-1){if(l=Object.assign(new m0,l),u==-1)e:{for(u=0;4096>=u;u++)if(!ln[u])break e;throw new _e(33)}return l.X=u,ln[u]=l}function b0(l,u=-1){return l=sf(l,u),l.m?.Fc?.(l),l}var v0={open(l){l.m=Ke[l.node.ya].m,l.m.open?.(l);},ba(){throw new _e(70)}};function hc(l,u){Ke[l]={m:u};}function lf(l,u){var v=u==="/";if(v&&sn)throw new _e(10);if(!v&&u){var w=Ar(u,{hb:false});if(u=w.path,w=w.node,w.va)throw new _e(10);if((w.mode&61440)!==16384)throw new _e(54)}u={type:l,Nc:{},mb:u,ec:[]},l=l.V(u),l.V=u,u.root=l,v?sn=l:w&&(w.va=u,w.V&&w.V.ec.push(u));}function mc(l,u,v){var w=Ar(l,{parent:true}).node;if(l=G(l),!l||l==="."||l==="..")throw new _e(28);var T=af(w,l);if(T)throw new _e(T);if(!w.j.ua)throw new _e(63);return w.j.ua(w,l,u,v)}function qn(l){return mc(l,16895,0)}function Na(l,u,v){typeof v>"u"&&(v=u,u=438),mc(l,u|8192,v);}function gc(l,u){if(!de(l))throw new _e(44);var v=Ar(u,{parent:true}).node;if(!v)throw new _e(44);u=G(u);var w=af(v,u);if(w)throw new _e(w);if(!v.j.Da)throw new _e(63);v.j.Da(v,u,l);}function y0(l){if(l=Ar(l).node,!l)throw new _e(44);if(!l.j.ma)throw new _e(28);return de(tf(l.parent),l.j.ma(l))}function Da(l,u,v){if(l==="")throw new _e(44);if(typeof u=="string"){var w={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[u];if(typeof w>"u")throw Error(`Unknown file open mode: ${u}`);u=w;}if(v=u&64?(typeof v>"u"?438:v)&4095|32768:0,typeof l=="object")var T=l;else {l=m(l);try{T=Ar(l,{gb:!(u&131072)}).node;}catch{}}if(w=false,u&64)if(T){if(u&128)throw new _e(20)}else T=mc(l,v,0),w=true;if(!T)throw new _e(44);if((T.mode&61440)===8192&&(u&=-513),u&65536&&(T.mode&61440)!==16384)throw new _e(54);if(!w&&(v=T?(T.mode&61440)===40960?32:(T.mode&61440)===16384&&(of(u)!=="r"||u&512)?31:Oa(T,of(u)):44))throw new _e(v);if(u&512&&!w){if(v=T,v=typeof v=="string"?Ar(v,{gb:true}).node:v,!v.j.R)throw new _e(63);if((v.mode&61440)===16384)throw new _e(31);if((v.mode&61440)!==32768)throw new _e(28);if(w=Oa(v,"w"))throw new _e(w);v.j.R(v,{size:0,timestamp:Date.now()});}return u&=-131713,T=sf({node:T,path:tf(T),flags:u,seekable:true,position:0,m:T.m,tc:[],error:false}),T.m.open&&T.m.open(T),!g.logReadFiles||u&1||(bc||(bc={}),l in bc||(bc[l]=1)),T}function cf(l,u,v){if(l.X===null)throw new _e(8);if(!l.seekable||!l.m.ba)throw new _e(70);if(v!=0&&v!=1&&v!=2)throw new _e(28);l.position=l.m.ba(l,u,v),l.tc=[];}var df;function li(l,u,v){l=m("/dev/"+l);var w=Vn(!!u,!!v);uf||(uf=64);var T=uf++<<8|0;hc(T,{open($){$.seekable=false;},close(){v?.buffer?.length&&v(10);},read($,H,q,oe){for(var ee=0,me=0;me<oe;me++){try{var Ae=u();}catch{throw new _e(29)}if(Ae===void 0&&ee===0)throw new _e(6);if(Ae==null)break;ee++,H[q+me]=Ae;}return ee&&($.node.timestamp=Date.now()),ee},write($,H,q,oe){for(var ee=0;ee<oe;ee++)try{v(H[q+ee]);}catch{throw new _e(29)}return oe&&($.node.timestamp=Date.now()),ee}}),Na(l,w,T);}var uf,Er={},bc,ci=void 0,fo=(l,u)=>Object.defineProperty(u,"name",{value:l}),vc=[],Kn=[],Re,Tn=l=>{if(!l)throw new Re("Cannot use deleted val. handle = "+l);return Kn[l]},Pn=l=>{switch(l){case void 0:return 2;case null:return 4;case  true:return 6;case  false:return 8;default:const u=vc.pop()||Kn.length;return Kn[u]=l,Kn[u+1]=1,u}},pf=l=>{var u=Error,v=fo(l,function(w){this.name=l,this.message=w,w=Error(w).stack,w!==void 0&&(this.stack=this.toString()+`
`+w.replace(/^Error(:[^\n]*)?\n/,""));});return v.prototype=Object.create(u.prototype),v.prototype.constructor=v,v.prototype.toString=function(){return this.message===void 0?this.name:`${this.name}: ${this.message}`},v},ff,hf,vt=l=>{for(var u="";Y[l];)u+=hf[Y[l++]];return u},di=[],yc=()=>{for(;di.length;){var l=di.pop();l.g.fa=false,l.delete();}},ui,Yn={},xc=(l,u)=>{if(u===void 0)throw new Re("ptr should not be undefined");for(;l.C;)u=l.na(u),l=l.C;return u},_r={},mf=l=>{l=Pf(l);var u=vt(l);return Jn(l),u},pi=(l,u)=>{var v=_r[l];if(v===void 0)throw l=`${u} has unknown type ${mf(l)}`,new Re(l);return v},$a=()=>{},wc=false,gf=(l,u,v)=>u===v?l:v.C===void 0?null:(l=gf(l,u,v.C),l===null?null:v.Mb(l)),bf={},x0=(l,u)=>(u=xc(l,u),Yn[u]),fi,Ba=(l,u)=>{if(!u.u||!u.o)throw new fi("makeClassHandle requires ptr and ptrType");if(!!u.K!=!!u.F)throw new fi("Both smartPtrType and smartPtr must be specified");return u.count={value:1},ho(Object.create(l,{g:{value:u,writable:true}}))},ho=l=>typeof FinalizationRegistry>"u"?(ho=u=>u,l):(wc=new FinalizationRegistry(u=>{u=u.g,--u.count.value,u.count.value===0&&(u.F?u.K.P(u.F):u.u.i.P(u.o));}),ho=u=>{var v=u.g;return v.F&&wc.register(u,{g:v},u),u},$a=u=>{wc.unregister(u);},ho(l)),za={},hi=l=>{for(;l.length;){var u=l.pop();l.pop()(u);}};function mi(l){return this.fromWireType(J[l>>2])}var mo={},ja={},Zt=(l,u,v)=>{function w(q){if(q=v(q),q.length!==l.length)throw new fi("Mismatched type converter count");for(var oe=0;oe<l.length;++oe)Ln(l[oe],q[oe]);}l.forEach(function(q){ja[q]=u;});var T=Array(u.length),$=[],H=0;u.forEach((q,oe)=>{_r.hasOwnProperty(q)?T[oe]=_r[q]:($.push(q),mo.hasOwnProperty(q)||(mo[q]=[]),mo[q].push(()=>{T[oe]=_r[q],++H,H===$.length&&w(T);}));}),$.length===0&&w(T);};function w0(l,u,v={}){var w=u.name;if(!l)throw new Re(`type "${w}" must have a positive integer typeid pointer`);if(_r.hasOwnProperty(l)){if(v.Wb)return;throw new Re(`Cannot register type '${w}' twice`)}_r[l]=u,delete ja[l],mo.hasOwnProperty(l)&&(u=mo[l],delete mo[l],u.forEach(T=>T()));}function Ln(l,u,v={}){if(!("argPackAdvance"in u))throw new TypeError("registerType registeredInstance requires argPackAdvance");return w0(l,u,v)}var Cc=l=>{throw new Re(l.g.u.i.name+" instance already deleted")};function Ga(){}var kc=(l,u,v)=>{if(l[u].A===void 0){var w=l[u];l[u]=function(...T){if(!l[u].A.hasOwnProperty(T.length))throw new Re(`Function '${v}' called with an invalid number of arguments (${T.length}) - expects one of (${l[u].A})!`);return l[u].A[T.length].apply(this,T)},l[u].A=[],l[u].A[w.ea]=w;}},Sc=(l,u,v)=>{if(g.hasOwnProperty(l)){if(v===void 0||g[l].A!==void 0&&g[l].A[v]!==void 0)throw new Re(`Cannot register public name '${l}' twice`);if(kc(g,l,l),g.hasOwnProperty(v))throw new Re(`Cannot register multiple overloads of a function with the same number of arguments (${v})!`);g[l].A[v]=u;}else g[l]=u,v!==void 0&&(g[l].Mc=v);},C0=l=>{if(l===void 0)return "_unknown";l=l.replace(/[^a-zA-Z0-9_]/g,"$");var u=l.charCodeAt(0);return 48<=u&&57>=u?`_${l}`:l};function k0(l,u,v,w,T,$,H,q){this.name=l,this.constructor=u,this.N=v,this.P=w,this.C=T,this.Rb=$,this.na=H,this.Mb=q,this.qb=[];}var Ua=(l,u,v)=>{for(;u!==v;){if(!u.na)throw new Re(`Expected null or instance of ${v.name}, got an instance of ${u.name}`);l=u.na(l),u=u.C;}return l};function S0(l,u){if(u===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);return 0}if(!u.g)throw new Re(`Cannot pass "${Ic(u)}" as a ${this.name}`);if(!u.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);return Ua(u.g.o,u.g.u.i,this.i)}function A0(l,u){if(u===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);if(this.ta){var v=this.Oa();return l!==null&&l.push(this.P,v),v}return 0}if(!u||!u.g)throw new Re(`Cannot pass "${Ic(u)}" as a ${this.name}`);if(!u.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.sa&&u.g.u.sa)throw new Re(`Cannot convert argument of type ${u.g.K?u.g.K.name:u.g.u.name} to parameter type ${this.name}`);if(v=Ua(u.g.o,u.g.u.i,this.i),this.ta){if(u.g.F===void 0)throw new Re("Passing raw pointer to smart pointer is illegal");switch(this.nc){case 0:if(u.g.K===this)v=u.g.F;else throw new Re(`Cannot convert argument of type ${u.g.K?u.g.K.name:u.g.u.name} to parameter type ${this.name}`);break;case 1:v=u.g.F;break;case 2:if(u.g.K===this)v=u.g.F;else {var w=u.clone();v=this.jc(v,Pn(()=>w.delete())),l!==null&&l.push(this.P,v);}break;default:throw new Re("Unsupporting sharing policy")}}return v}function E0(l,u){if(u===null){if(this.Ma)throw new Re(`null is not a valid ${this.name}`);return 0}if(!u.g)throw new Re(`Cannot pass "${Ic(u)}" as a ${this.name}`);if(!u.g.o)throw new Re(`Cannot pass deleted object as a pointer of type ${this.name}`);if(u.g.u.sa)throw new Re(`Cannot convert argument of type ${u.g.u.name} to parameter type ${this.name}`);return Ua(u.g.o,u.g.u.i,this.i)}function Wa(l,u,v,w,T,$,H,q,oe,ee,me){this.name=l,this.i=u,this.Ma=v,this.sa=w,this.ta=T,this.ic=$,this.nc=H,this.rb=q,this.Oa=oe,this.jc=ee,this.P=me,T||u.C!==void 0?this.toWireType=A0:(this.toWireType=w?S0:E0,this.M=null);}var vf=(l,u,v)=>{if(!g.hasOwnProperty(l))throw new fi("Replacing nonexistent public symbol");g[l].A!==void 0&&v!==void 0?g[l].A[v]=u:(g[l]=u,g[l].ea=v);},Ha=[],yf,Ac=l=>{var u=Ha[l];return u||(l>=Ha.length&&(Ha.length=l+1),Ha[l]=u=yf.get(l)),u},_0=(l,u,v=[])=>(l.includes("j")?(l=l.replace(/p/g,"i"),u=(0, g["dynCall_"+l])(u,...v)):u=Ac(u)(...v),u),I0=(l,u)=>(...v)=>_0(l,u,v),Nt=(l,u)=>{l=vt(l);var v=l.includes("j")?I0(l,u):Ac(u);if(typeof v!="function")throw new Re(`unknown function pointer with signature ${l}: ${u}`);return v},xf,Xn=(l,u)=>{function v($){T[$]||_r[$]||(ja[$]?ja[$].forEach(v):(w.push($),T[$]=true));}var w=[],T={};throw u.forEach(v),new xf(`${l}: `+w.map(mf).join([", "]))};function T0(l){for(var u=1;u<l.length;++u)if(l[u]!==null&&l[u].M===void 0)return  true;return  false}function Va(l,u,v,w,T){var $=u.length;if(2>$)throw new Re("argTypes array size mismatch! Must at least get return value and 'this' types!");var H=u[1]!==null&&v!==null,q=T0(u),oe=u[0].name!=="void",ee=$-2,me=Array(ee),Ae=[],Ee=[];return fo(l,function(...X){if(X.length!==ee)throw new Re(`function ${l} called with ${X.length} arguments, expected ${ee}`);if(Ee.length=0,Ae.length=H?2:1,Ae[0]=T,H){var be=u[1].toWireType(Ee,this);Ae[1]=be;}for(var pe=0;pe<ee;++pe)me[pe]=u[pe+2].toWireType(Ee,X[pe]),Ae.push(me[pe]);if(X=w(...Ae),q)hi(Ee);else for(pe=H?1:2;pe<u.length;pe++){var $e=pe===1?be:me[pe-2];u[pe].M!==null&&u[pe].M($e);}return be=oe?u[0].fromWireType(X):void 0,be})}var qa=(l,u)=>{for(var v=[],w=0;w<l;w++)v.push(J[u+4*w>>2]);return v},Ec=l=>{l=l.trim();const u=l.indexOf("(");return u!==-1?l.substr(0,u):l},wf=(l,u,v)=>{if(!(l instanceof Object))throw new Re(`${v} with invalid "this": ${l}`);if(!(l instanceof u.i.constructor))throw new Re(`${v} incompatible with "this" of type ${l.constructor.name}`);if(!l.g.o)throw new Re(`cannot call emscripten binding method ${v} on deleted object`);return Ua(l.g.o,l.g.u.i,u.i)},_c=l=>{9<l&&--Kn[l+1]===0&&(Kn[l]=void 0,vc.push(l));},P0={name:"emscripten::val",fromWireType:l=>{var u=Tn(l);return _c(l),u},toWireType:(l,u)=>Pn(u),argPackAdvance:8,readValueFromPointer:mi,M:null},L0=(l,u,v)=>{switch(u){case 1:return v?function(w){return this.fromWireType(ne[w])}:function(w){return this.fromWireType(Y[w])};case 2:return v?function(w){return this.fromWireType(Z[w>>1])}:function(w){return this.fromWireType(O[w>>1])};case 4:return v?function(w){return this.fromWireType(B[w>>2])}:function(w){return this.fromWireType(J[w>>2])};default:throw new TypeError(`invalid integer width (${u}): ${l}`)}},Ic=l=>{if(l===null)return "null";var u=typeof l;return u==="object"||u==="array"||u==="function"?l.toString():""+l},M0=(l,u)=>{switch(u){case 4:return function(v){return this.fromWireType(re[v>>2])};case 8:return function(v){return this.fromWireType(le[v>>3])};default:throw new TypeError(`invalid float width (${u}): ${l}`)}},R0=(l,u,v)=>{switch(u){case 1:return v?w=>ne[w]:w=>Y[w];case 2:return v?w=>Z[w>>1]:w=>O[w>>1];case 4:return v?w=>B[w>>2]:w=>J[w>>2];default:throw new TypeError(`invalid integer width (${u}): ${l}`)}},Cf=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,F0=(l,u)=>{for(var v=l>>1,w=v+u/2;!(v>=w)&&O[v];)++v;if(v<<=1,32<v-l&&Cf)return Cf.decode(Y.subarray(l,v));for(v="",w=0;!(w>=u/2);++w){var T=Z[l+2*w>>1];if(T==0)break;v+=String.fromCharCode(T);}return v},O0=(l,u,v)=>{if(v??(v=2147483647),2>v)return 0;v-=2;var w=u;v=v<2*l.length?v/2:l.length;for(var T=0;T<v;++T)Z[u>>1]=l.charCodeAt(T),u+=2;return Z[u>>1]=0,u-w},N0=l=>2*l.length,D0=(l,u)=>{for(var v=0,w="";!(v>=u/4);){var T=B[l+4*v>>2];if(T==0)break;++v,65536<=T?(T-=65536,w+=String.fromCharCode(55296|T>>10,56320|T&1023)):w+=String.fromCharCode(T);}return w},$0=(l,u,v)=>{if(v??(v=2147483647),4>v)return 0;var w=u;v=w+v-4;for(var T=0;T<l.length;++T){var $=l.charCodeAt(T);if(55296<=$&&57343>=$){var H=l.charCodeAt(++T);$=65536+(($&1023)<<10)|H&1023;}if(B[u>>2]=$,u+=4,u+4>v)break}return B[u>>2]=0,u-w},B0=l=>{for(var u=0,v=0;v<l.length;++v){var w=l.charCodeAt(v);55296<=w&&57343>=w&&++v,u+=4;}return u},kf=(l,u,v)=>{var w=[];return l=l.toWireType(w,v),w.length&&(J[u>>2]=Pn(w)),l},z0={},Tc=l=>{var u=z0[l];return u===void 0?vt(l):u},Pc=[],j0=l=>{var u=Pc.length;return Pc.push(l),u},G0=(l,u)=>{for(var v=Array(l),w=0;w<l;++w)v[w]=pi(J[u+4*w>>2],"parameter "+w);return v},U0=Reflect.construct,gi=l=>l%4===0&&(l%100!==0||l%400===0),W0=[0,31,60,91,121,152,182,213,244,274,305,335],H0=[0,31,59,90,120,151,181,212,243,273,304,334],Lc=[],Mc={},Sf=()=>{if(!Rc){var l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:z||"./this.program"},u;for(u in Mc)Mc[u]===void 0?delete l[u]:l[u]=Mc[u];var v=[];for(u in l)v.push(`${u}=${l[u]}`);Rc=v;}return Rc},Rc,Af=[31,29,31,30,31,30,31,31,30,31,30,31],Ef=[31,28,31,30,31,30,31,31,30,31,30,31],_f=(l,u,v,w)=>{function T(X,be,pe){for(X=typeof X=="number"?X.toString():X||"";X.length<be;)X=pe[0]+X;return X}function $(X,be){return T(X,be,"0")}function H(X,be){function pe(Ue){return 0>Ue?-1:0<Ue?1:0}var $e;return ($e=pe(X.getFullYear()-be.getFullYear()))===0&&($e=pe(X.getMonth()-be.getMonth()))===0&&($e=pe(X.getDate()-be.getDate())),$e}function q(X){switch(X.getDay()){case 0:return new Date(X.getFullYear()-1,11,29);case 1:return X;case 2:return new Date(X.getFullYear(),0,3);case 3:return new Date(X.getFullYear(),0,2);case 4:return new Date(X.getFullYear(),0,1);case 5:return new Date(X.getFullYear()-1,11,31);case 6:return new Date(X.getFullYear()-1,11,30)}}function oe(X){var be=X.ca;for(X=new Date(new Date(X.da+1900,0,1).getTime());0<be;){var pe=X.getMonth(),$e=(gi(X.getFullYear())?Af:Ef)[pe];if(be>$e-X.getDate())be-=$e-X.getDate()+1,X.setDate(1),11>pe?X.setMonth(pe+1):(X.setMonth(0),X.setFullYear(X.getFullYear()+1));else {X.setDate(X.getDate()+be);break}}return pe=new Date(X.getFullYear()+1,0,4),be=q(new Date(X.getFullYear(),0,4)),pe=q(pe),0>=H(be,X)?0>=H(pe,X)?X.getFullYear()+1:X.getFullYear():X.getFullYear()-1}var ee=J[w+40>>2];w={qc:B[w>>2],pc:B[w+4>>2],Ea:B[w+8>>2],Ra:B[w+12>>2],Fa:B[w+16>>2],da:B[w+20>>2],S:B[w+24>>2],ca:B[w+28>>2],Oc:B[w+32>>2],oc:B[w+36>>2],rc:ee&&ee?ge(Y,ee):""},v=v?ge(Y,v):"",ee={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var me in ee)v=v.replace(new RegExp(me,"g"),ee[me]);var Ae="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Ee="January February March April May June July August September October November December".split(" ");ee={"%a":X=>Ae[X.S].substring(0,3),"%A":X=>Ae[X.S],"%b":X=>Ee[X.Fa].substring(0,3),"%B":X=>Ee[X.Fa],"%C":X=>$((X.da+1900)/100|0,2),"%d":X=>$(X.Ra,2),"%e":X=>T(X.Ra,2," "),"%g":X=>oe(X).toString().substring(2),"%G":oe,"%H":X=>$(X.Ea,2),"%I":X=>(X=X.Ea,X==0?X=12:12<X&&(X-=12),$(X,2)),"%j":X=>{for(var be=0,pe=0;pe<=X.Fa-1;be+=(gi(X.da+1900)?Af:Ef)[pe++]);return $(X.Ra+be,3)},"%m":X=>$(X.Fa+1,2),"%M":X=>$(X.pc,2),"%n":()=>`
`,"%p":X=>0<=X.Ea&&12>X.Ea?"AM":"PM","%S":X=>$(X.qc,2),"%t":()=>"	","%u":X=>X.S||7,"%U":X=>$(Math.floor((X.ca+7-X.S)/7),2),"%V":X=>{var be=Math.floor((X.ca+7-(X.S+6)%7)/7);if(2>=(X.S+371-X.ca-2)%7&&be++,be)be==53&&(pe=(X.S+371-X.ca)%7,pe==4||pe==3&&gi(X.da)||(be=1));else {be=52;var pe=(X.S+7-X.ca-1)%7;(pe==4||pe==5&&gi(X.da%400-1))&&be++;}return $(be,2)},"%w":X=>X.S,"%W":X=>$(Math.floor((X.ca+7-(X.S+6)%7)/7),2),"%y":X=>(X.da+1900).toString().substring(2),"%Y":X=>X.da+1900,"%z":X=>{X=X.oc;var be=0<=X;return X=Math.abs(X)/60,(be?"+":"-")+("0000"+(X/60*100+X%60)).slice(-4)},"%Z":X=>X.rc,"%%":()=>"%"},v=v.replace(/%%/g,"\0\0");for(me in ee)v.includes(me)&&(v=v.replace(new RegExp(me,"g"),ee[me](w)));return v=v.replace(/\0\0/g,"%"),me=qe(v,false),me.length>u?0:(ne.set(me,l),me.length-1)};[44].forEach(l=>{fc[l]=new _e(l),fc[l].stack="<generic error, no stack>";}),si=Array(4096),lf(Oe,"/"),qn("/tmp"),qn("/home"),qn("/home/web_user"),(function(){qn("/dev"),hc(259,{read:()=>0,write:(w,T,$,H)=>H}),Na("/dev/null",259),bt(1280,Qt),bt(1536,an),Na("/dev/tty",1280),Na("/dev/tty1",1536);var l=new Uint8Array(1024),u=0,v=()=>(u===0&&(u=Q(l).byteLength),l[--u]);li("random",v),li("urandom",v),qn("/dev/shm"),qn("/dev/shm/tmp");})(),(function(){qn("/proc");var l=qn("/proc/self");qn("/proc/self/fd"),lf({V(){var u=rf(l,"fd",16895,73);return u.j={ka(v,w){var T=cr(+w);return v={parent:null,V:{mb:"fake"},j:{ma:()=>T.path}},v.parent=v}},u}},"/proc/self/fd");})(),Re=g.BindingError=class extends Error{constructor(l){super(l),this.name="BindingError";}},Kn.push(0,1,void 0,1,null,1,true,1,false,1),g.count_emval_handles=()=>Kn.length/2-5-vc.length,ff=g.PureVirtualError=pf("PureVirtualError");for(var If=Array(256),Ka=0;256>Ka;++Ka)If[Ka]=String.fromCharCode(Ka);hf=If,g.getInheritedInstanceCount=()=>Object.keys(Yn).length,g.getLiveInheritedInstances=()=>{var l=[],u;for(u in Yn)Yn.hasOwnProperty(u)&&l.push(Yn[u]);return l},g.flushPendingDeletes=yc,g.setDelayFunction=l=>{ui=l,di.length&&ui&&ui(yc);},fi=g.InternalError=class extends Error{constructor(l){super(l),this.name="InternalError";}},Object.assign(Ga.prototype,{isAliasOf:function(l){if(!(this instanceof Ga&&l instanceof Ga))return  false;var u=this.g.u.i,v=this.g.o;l.g=l.g;var w=l.g.u.i;for(l=l.g.o;u.C;)v=u.na(v),u=u.C;for(;w.C;)l=w.na(l),w=w.C;return u===w&&v===l},clone:function(){if(this.g.o||Cc(this),this.g.ia)return this.g.count.value+=1,this;var l=ho,u=Object,v=u.create,w=Object.getPrototypeOf(this),T=this.g;return l=l(v.call(u,w,{g:{value:{count:T.count,fa:T.fa,ia:T.ia,o:T.o,u:T.u,F:T.F,K:T.K}}})),l.g.count.value+=1,l.g.fa=false,l},delete(){if(this.g.o||Cc(this),this.g.fa&&!this.g.ia)throw new Re("Object already scheduled for deletion");$a(this);var l=this.g;--l.count.value,l.count.value===0&&(l.F?l.K.P(l.F):l.u.i.P(l.o)),this.g.ia||(this.g.F=void 0,this.g.o=void 0);},isDeleted:function(){return !this.g.o},deleteLater:function(){if(this.g.o||Cc(this),this.g.fa&&!this.g.ia)throw new Re("Object already scheduled for deletion");return di.push(this),di.length===1&&ui&&ui(yc),this.g.fa=true,this}}),Object.assign(Wa.prototype,{Sb(l){return this.rb&&(l=this.rb(l)),l},bb(l){this.P?.(l);},argPackAdvance:8,readValueFromPointer:mi,fromWireType:function(l){function u(){return this.ta?Ba(this.i.N,{u:this.ic,o:v,K:this,F:l}):Ba(this.i.N,{u:this,o:l})}var v=this.Sb(l);if(!v)return this.bb(l),null;var w=x0(this.i,v);if(w!==void 0)return w.g.count.value===0?(w.g.o=v,w.g.F=l,w.clone()):(w=w.clone(),this.bb(l),w);if(w=this.i.Rb(v),w=bf[w],!w)return u.call(this);w=this.sa?w.Ib:w.pointerType;var T=gf(v,this.i,w.i);return T===null?u.call(this):this.ta?Ba(w.i.N,{u:w,o:T,K:this,F:l}):Ba(w.i.N,{u:w,o:T})}}),xf=g.UnboundTypeError=pf("UnboundTypeError");var Tf={__syscall_fcntl64:function(l,u,v){ci=v;try{var w=cr(l);switch(u){case 0:var T=k();if(0>T)break;for(;ln[T];)T++;return b0(w,T).X;case 1:case 2:return 0;case 3:return w.flags;case 4:return T=k(),w.flags|=T,0;case 12:return T=k(),Z[T+0>>1]=2,0;case 13:case 14:return 0}return -28}catch($){if(typeof Er>"u"||$.name!=="ErrnoError")throw $;return -$.aa}},__syscall_ioctl:function(l,u,v){ci=v;try{var w=cr(l);switch(u){case 21509:return w.s?0:-59;case 21505:if(!w.s)return -59;if(w.s.W.Yb){l=[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];var T=k();B[T>>2]=25856,B[T+4>>2]=5,B[T+8>>2]=191,B[T+12>>2]=35387;for(var $=0;32>$;$++)ne[T+$+17]=l[$]||0;}return 0;case 21510:case 21511:case 21512:return w.s?0:-59;case 21506:case 21507:case 21508:if(!w.s)return -59;if(w.s.W.Zb)for(T=k(),l=[],$=0;32>$;$++)l.push(ne[T+$+17]);return 0;case 21519:return w.s?(T=k(),B[T>>2]=0):-59;case 21520:return w.s?-28:-59;case 21531:if(T=k(),!w.m.Xb)throw new _e(59);return w.m.Xb(w,u,T);case 21523:return w.s?(w.s.W.$b&&($=[24,80],T=k(),Z[T>>1]=$[0],Z[T+2>>1]=$[1]),0):-59;case 21524:return w.s?0:-59;case 21515:return w.s?0:-59;default:return -28}}catch(H){if(typeof Er>"u"||H.name!=="ErrnoError")throw H;return -H.aa}},__syscall_openat:function(l,u,v,w){ci=w;try{u=u?ge(Y,u):"";var T=u;if(T.charAt(0)==="/")u=T;else {var $=l===-100?"/":cr(l).path;if(T.length==0)throw new _e(44);u=m($+"/"+T);}var H=w?k():0;return Da(u,v,H).X}catch(q){if(typeof Er>"u"||q.name!=="ErrnoError")throw q;return -q.aa}},_abort_js:()=>{Vt("");},_embind_create_inheriting_constructor:(l,u,v)=>{l=vt(l),u=pi(u,"wrapper"),v=Tn(v);var w=u.i,T=w.N,$=w.C.N,H=w.C.constructor;return l=fo(l,function(...q){w.C.qb.forEach(function(oe){if(this[oe]===$[oe])throw new ff(`Pure virtual function ${oe} must be implemented in JavaScript`)}.bind(this)),Object.defineProperty(this,"__parent",{value:T}),this.__construct(...q);}),T.__construct=function(...q){if(this===T)throw new Re("Pass correct 'this' to __construct");q=H.implement(this,...q),$a(q);var oe=q.g;if(q.notifyOnDestruction(),oe.ia=true,Object.defineProperties(this,{g:{value:oe}}),ho(this),q=oe.o,q=xc(w,q),Yn.hasOwnProperty(q))throw new Re(`Tried to register registered instance: ${q}`);Yn[q]=this;},T.__destruct=function(){if(this===T)throw new Re("Pass correct 'this' to __destruct");$a(this);var q=this.g.o;if(q=xc(w,q),Yn.hasOwnProperty(q))delete Yn[q];else throw new Re(`Tried to unregister unregistered instance: ${q}`)},l.prototype=Object.create(T),Object.assign(l.prototype,v),Pn(l)},_embind_finalize_value_object:l=>{var u=za[l];delete za[l];var v=u.Oa,w=u.P,T=u.fb,$=T.map(H=>H.Vb).concat(T.map(H=>H.lc));Zt([l],$,H=>{var q={};return T.forEach((oe,ee)=>{var me=H[ee],Ae=oe.Tb,Ee=oe.Ub,X=H[ee+T.length],be=oe.kc,pe=oe.mc;q[oe.Pb]={read:$e=>me.fromWireType(Ae(Ee,$e)),write:($e,Ue)=>{var Se=[];be(pe,$e,X.toWireType(Se,Ue)),hi(Se);}};}),[{name:u.name,fromWireType:oe=>{var ee={},me;for(me in q)ee[me]=q[me].read(oe);return w(oe),ee},toWireType:(oe,ee)=>{for(var me in q)if(!(me in ee))throw new TypeError(`Missing field: "${me}"`);var Ae=v();for(me in q)q[me].write(Ae,ee[me]);return oe!==null&&oe.push(w,Ae),Ae},argPackAdvance:8,readValueFromPointer:mi,M:w}]});},_embind_register_bigint:()=>{},_embind_register_bool:(l,u,v,w)=>{u=vt(u),Ln(l,{name:u,fromWireType:function(T){return !!T},toWireType:function(T,$){return $?v:w},argPackAdvance:8,readValueFromPointer:function(T){return this.fromWireType(Y[T])},M:null});},_embind_register_class:(l,u,v,w,T,$,H,q,oe,ee,me,Ae,Ee)=>{me=vt(me),$=Nt(T,$),q&&(q=Nt(H,q)),ee&&(ee=Nt(oe,ee)),Ee=Nt(Ae,Ee);var X=C0(me);Sc(X,function(){Xn(`Cannot construct ${me} due to unbound types`,[w]);}),Zt([l,u,v],w?[w]:[],be=>{if(be=be[0],w)var pe=be.i,$e=pe.N;else $e=Ga.prototype;be=fo(me,function(...It){if(Object.getPrototypeOf(this)!==Ue)throw new Re("Use 'new' to construct "+me);if(Se.$===void 0)throw new Re(me+" has no accessible constructor");var en=Se.$[It.length];if(en===void 0)throw new Re(`Tried to invoke ctor of ${me} with invalid number of parameters (${It.length}) - expected (${Object.keys(Se.$).toString()}) parameters instead!`);return en.apply(this,It)});var Ue=Object.create($e,{constructor:{value:be}});be.prototype=Ue;var Se=new k0(me,be,Ue,Ee,pe,$,q,ee);if(Se.C){var it;(it=Se.C).oa??(it.oa=[]),Se.C.oa.push(Se);}return pe=new Wa(me,Se,true,false,false),it=new Wa(me+"*",Se,false,false,false),$e=new Wa(me+" const*",Se,false,true,false),bf[l]={pointerType:it,Ib:$e},vf(X,be),[pe,it,$e]});},_embind_register_class_class_function:(l,u,v,w,T,$,H)=>{var q=qa(v,w);u=vt(u),u=Ec(u),$=Nt(T,$),Zt([],[l],oe=>{function ee(){Xn(`Cannot call ${me} due to unbound types`,q);}oe=oe[0];var me=`${oe.name}.${u}`;u.startsWith("@@")&&(u=Symbol[u.substring(2)]);var Ae=oe.i.constructor;return Ae[u]===void 0?(ee.ea=v-1,Ae[u]=ee):(kc(Ae,u,me),Ae[u].A[v-1]=ee),Zt([],q,Ee=>{if(Ee=Va(me,[Ee[0],null].concat(Ee.slice(1)),null,$,H),Ae[u].A===void 0?(Ee.ea=v-1,Ae[u]=Ee):Ae[u].A[v-1]=Ee,oe.i.oa)for(const X of oe.i.oa)X.constructor.hasOwnProperty(u)||(X.constructor[u]=Ee);return []}),[]});},_embind_register_class_class_property:(l,u,v,w,T,$,H,q)=>{u=vt(u),$=Nt(T,$),Zt([],[l],oe=>{oe=oe[0];var ee=`${oe.name}.${u}`,me={get(){Xn(`Cannot access ${ee} due to unbound types`,[v]);},enumerable:true,configurable:true};return me.set=q?()=>{Xn(`Cannot access ${ee} due to unbound types`,[v]);}:()=>{throw new Re(`${ee} is a read-only property`)},Object.defineProperty(oe.i.constructor,u,me),Zt([],[v],Ae=>{Ae=Ae[0];var Ee={get(){return Ae.fromWireType($(w))},enumerable:true};return q&&(q=Nt(H,q),Ee.set=X=>{var be=[];q(w,Ae.toWireType(be,X)),hi(be);}),Object.defineProperty(oe.i.constructor,u,Ee),[]}),[]});},_embind_register_class_constructor:(l,u,v,w,T,$)=>{var H=qa(u,v);T=Nt(w,T),Zt([],[l],q=>{q=q[0];var oe=`constructor ${q.name}`;if(q.i.$===void 0&&(q.i.$=[]),q.i.$[u-1]!==void 0)throw new Re(`Cannot register multiple constructors with identical number of parameters (${u-1}) for class '${q.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return q.i.$[u-1]=()=>{Xn(`Cannot construct ${q.name} due to unbound types`,H);},Zt([],H,ee=>(ee.splice(1,0,null),q.i.$[u-1]=Va(oe,ee,null,T,$),[])),[]});},_embind_register_class_function:(l,u,v,w,T,$,H,q)=>{var oe=qa(v,w);u=vt(u),u=Ec(u),$=Nt(T,$),Zt([],[l],ee=>{function me(){Xn(`Cannot call ${Ae} due to unbound types`,oe);}ee=ee[0];var Ae=`${ee.name}.${u}`;u.startsWith("@@")&&(u=Symbol[u.substring(2)]),q&&ee.i.qb.push(u);var Ee=ee.i.N,X=Ee[u];return X===void 0||X.A===void 0&&X.className!==ee.name&&X.ea===v-2?(me.ea=v-2,me.className=ee.name,Ee[u]=me):(kc(Ee,u,Ae),Ee[u].A[v-2]=me),Zt([],oe,be=>(be=Va(Ae,be,ee,$,H),Ee[u].A===void 0?(be.ea=v-2,Ee[u]=be):Ee[u].A[v-2]=be,[])),[]});},_embind_register_class_property:(l,u,v,w,T,$,H,q,oe,ee)=>{u=vt(u),T=Nt(w,T),Zt([],[l],me=>{me=me[0];var Ae=`${me.name}.${u}`,Ee={get(){Xn(`Cannot access ${Ae} due to unbound types`,[v,H]);},enumerable:true,configurable:true};return Ee.set=oe?()=>Xn(`Cannot access ${Ae} due to unbound types`,[v,H]):()=>{throw new Re(Ae+" is a read-only property")},Object.defineProperty(me.i.N,u,Ee),Zt([],oe?[v,H]:[v],X=>{var be=X[0],pe={get(){var Ue=wf(this,me,Ae+" getter");return be.fromWireType(T($,Ue))},enumerable:true};if(oe){oe=Nt(q,oe);var $e=X[1];pe.set=function(Ue){var Se=wf(this,me,Ae+" setter"),it=[];oe(ee,Se,$e.toWireType(it,Ue)),hi(it);};}return Object.defineProperty(me.i.N,u,pe),[]}),[]});},_embind_register_emval:l=>Ln(l,P0),_embind_register_enum:(l,u,v,w)=>{function T(){}u=vt(u),T.values={},Ln(l,{name:u,constructor:T,fromWireType:function($){return this.constructor.values[$]},toWireType:($,H)=>H.value,argPackAdvance:8,readValueFromPointer:L0(u,v,w),M:null}),Sc(u,T);},_embind_register_enum_value:(l,u,v)=>{var w=pi(l,"enum");u=vt(u),l=w.constructor,w=Object.create(w.constructor.prototype,{value:{value:v},constructor:{value:fo(`${w.name}_${u}`,function(){})}}),l.values[v]=w,l[u]=w;},_embind_register_float:(l,u,v)=>{u=vt(u),Ln(l,{name:u,fromWireType:w=>w,toWireType:(w,T)=>T,argPackAdvance:8,readValueFromPointer:M0(u,v),M:null});},_embind_register_function:(l,u,v,w,T,$)=>{var H=qa(u,v);l=vt(l),l=Ec(l),T=Nt(w,T),Sc(l,function(){Xn(`Cannot call ${l} due to unbound types`,H);},u-1),Zt([],H,q=>(vf(l,Va(l,[q[0],null].concat(q.slice(1)),null,T,$),u-1),[]));},_embind_register_integer:(l,u,v,w,T)=>{if(u=vt(u),T===-1&&(T=4294967295),T=q=>q,w===0){var $=32-8*v;T=q=>q<<$>>>$;}var H=u.includes("unsigned")?function(q,oe){return oe>>>0}:function(q,oe){return oe};Ln(l,{name:u,fromWireType:T,toWireType:H,argPackAdvance:8,readValueFromPointer:R0(u,v,w!==0),M:null});},_embind_register_memory_view:(l,u,v)=>{function w($){return new T(ne.buffer,J[$+4>>2],J[$>>2])}var T=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][u];v=vt(v),Ln(l,{name:v,fromWireType:w,argPackAdvance:8,readValueFromPointer:w},{Wb:true});},_embind_register_std_string:(l,u)=>{u=vt(u);var v=u==="std::string";Ln(l,{name:u,fromWireType:function(w){var T=J[w>>2],$=w+4;if(v)for(var H=$,q=0;q<=T;++q){var oe=$+q;if(q==T||Y[oe]==0){if(H=H?ge(Y,H,oe-H):"",ee===void 0)var ee=H;else ee+="\0",ee+=H;H=oe+1;}}else {for(ee=Array(T),q=0;q<T;++q)ee[q]=String.fromCharCode(Y[$+q]);ee=ee.join("");}return Jn(w),ee},toWireType:function(w,T){T instanceof ArrayBuffer&&(T=new Uint8Array(T));var $=typeof T=="string";if(!($||T instanceof Uint8Array||T instanceof Uint8ClampedArray||T instanceof Int8Array))throw new Re("Cannot pass non-string to std::string");var H=v&&$?Ze(T):T.length,q=Fc(4+H+1),oe=q+4;if(J[q>>2]=H,v&&$)st(T,Y,oe,H+1);else if($)for($=0;$<H;++$){var ee=T.charCodeAt($);if(255<ee)throw Jn(oe),new Re("String has UTF-16 code units that do not fit in 8 bits");Y[oe+$]=ee;}else for($=0;$<H;++$)Y[oe+$]=T[$];return w!==null&&w.push(Jn,q),q},argPackAdvance:8,readValueFromPointer:mi,M(w){Jn(w);}});},_embind_register_std_wstring:(l,u,v)=>{if(v=vt(v),u===2)var w=F0,T=O0,$=N0,H=q=>O[q>>1];else u===4&&(w=D0,T=$0,$=B0,H=q=>J[q>>2]);Ln(l,{name:v,fromWireType:q=>{for(var oe=J[q>>2],ee,me=q+4,Ae=0;Ae<=oe;++Ae){var Ee=q+4+Ae*u;(Ae==oe||H(Ee)==0)&&(me=w(me,Ee-me),ee===void 0?ee=me:(ee+="\0",ee+=me),me=Ee+u);}return Jn(q),ee},toWireType:(q,oe)=>{if(typeof oe!="string")throw new Re(`Cannot pass non-string to C++ string type ${v}`);var ee=$(oe),me=Fc(4+ee+u);return J[me>>2]=ee/u,T(oe,me+4,ee+u),q!==null&&q.push(Jn,me),me},argPackAdvance:8,readValueFromPointer:mi,M(q){Jn(q);}});},_embind_register_value_object:(l,u,v,w,T,$)=>{za[l]={name:vt(u),Oa:Nt(v,w),P:Nt(T,$),fb:[]};},_embind_register_value_object_field:(l,u,v,w,T,$,H,q,oe,ee)=>{za[l].fb.push({Pb:vt(u),Vb:v,Tb:Nt(w,T),Ub:$,lc:H,kc:Nt(q,oe),mc:ee});},_embind_register_void:(l,u)=>{u=vt(u),Ln(l,{Jc:true,name:u,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}});},_emscripten_get_now_is_monotonic:()=>1,_emscripten_memcpy_js:(l,u,v)=>Y.copyWithin(l,u,u+v),_emscripten_throw_longjmp:()=>{throw 1/0},_emval_as:(l,u,v)=>(l=Tn(l),u=pi(u,"emval::as"),kf(u,v,l)),_emval_call_method:(l,u,v,w,T)=>(l=Pc[l],u=Tn(u),v=Tc(v),l(u,u[v],w,T)),_emval_decref:_c,_emval_get_method_caller:(l,u,v)=>{var w=G0(l,u),T=w.shift();l--;var $=Array(l);return u=`methodCaller<(${w.map(H=>H.name).join(", ")}) => ${T.name}>`,j0(fo(u,(H,q,oe,ee)=>{for(var me=0,Ae=0;Ae<l;++Ae)$[Ae]=w[Ae].readValueFromPointer(ee+me),me+=w[Ae].argPackAdvance;return H=v===1?U0(q,$):q.apply(H,$),kf(T,oe,H)}))},_emval_get_module_property:l=>(l=Tc(l),Pn(g[l])),_emval_get_property:(l,u)=>(l=Tn(l),u=Tn(u),Pn(l[u])),_emval_incref:l=>{9<l&&(Kn[l+1]+=1);},_emval_new_array:()=>Pn([]),_emval_new_cstring:l=>Pn(Tc(l)),_emval_new_object:()=>Pn({}),_emval_run_destructors:l=>{var u=Tn(l);hi(u),_c(l);},_emval_set_property:(l,u,v)=>{l=Tn(l),u=Tn(u),v=Tn(v),l[u]=v;},_emval_take_value:(l,u)=>(l=pi(l,"_emval_take_value"),l=l.readValueFromPointer(u),Pn(l)),_gmtime_js:function(l,u,v){l=new Date(1e3*(u+2097152>>>0<4194305-!!l?(l>>>0)+4294967296*u:NaN)),B[v>>2]=l.getUTCSeconds(),B[v+4>>2]=l.getUTCMinutes(),B[v+8>>2]=l.getUTCHours(),B[v+12>>2]=l.getUTCDate(),B[v+16>>2]=l.getUTCMonth(),B[v+20>>2]=l.getUTCFullYear()-1900,B[v+24>>2]=l.getUTCDay(),B[v+28>>2]=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0;},_localtime_js:function(l,u,v){l=new Date(1e3*(u+2097152>>>0<4194305-!!l?(l>>>0)+4294967296*u:NaN)),B[v>>2]=l.getSeconds(),B[v+4>>2]=l.getMinutes(),B[v+8>>2]=l.getHours(),B[v+12>>2]=l.getDate(),B[v+16>>2]=l.getMonth(),B[v+20>>2]=l.getFullYear()-1900,B[v+24>>2]=l.getDay(),B[v+28>>2]=(gi(l.getFullYear())?W0:H0)[l.getMonth()]+l.getDate()-1|0,B[v+36>>2]=-(60*l.getTimezoneOffset()),u=new Date(l.getFullYear(),6,1).getTimezoneOffset();var w=new Date(l.getFullYear(),0,1).getTimezoneOffset();B[v+32>>2]=(u!=w&&l.getTimezoneOffset()==Math.min(w,u))|0;},_tzset_js:(l,u,v,w)=>{var T=new Date().getFullYear(),$=new Date(T,0,1),H=new Date(T,6,1);T=$.getTimezoneOffset();var q=H.getTimezoneOffset();J[l>>2]=60*Math.max(T,q),B[u>>2]=+(T!=q),l=oe=>oe.toLocaleTimeString(void 0,{hour12:false,timeZoneName:"short"}).split(" ")[1],$=l($),H=l(H),q<T?(st($,Y,v,17),st(H,Y,w,17)):(st($,Y,w,17),st(H,Y,v,17));},emscripten_asm_const_int:(l,u,v)=>{Lc.length=0;for(var w;w=Y[u++];){var T=w!=105;T&=w!=112,v+=T&&v%8?4:0,Lc.push(w==112?J[v>>2]:w==105?B[v>>2]:le[v>>3]),v+=T?8:4;}return In[l](...Lc)},emscripten_date_now:()=>Date.now(),emscripten_get_now:()=>performance.now(),emscripten_resize_heap:l=>{var u=Y.length;if(l>>>=0,2147483648<l)return  false;for(var v=1;4>=v;v*=2){var w=u*(1+.2/v);w=Math.min(w,l+100663296);var T=Math;w=Math.max(l,w);e:{T=(T.min.call(T,2147483648,w+(65536-w%65536)%65536)-se.buffer.byteLength+65535)/65536;try{se.grow(T),ye();var $=1;break e}catch{}$=void 0;}if($)return  true}return  false},environ_get:(l,u)=>{var v=0;return Sf().forEach((w,T)=>{var $=u+v;for(T=J[l+4*T>>2]=$,$=0;$<w.length;++$)ne[T++]=w.charCodeAt($);ne[T]=0,v+=w.length+1;}),0},environ_sizes_get:(l,u)=>{var v=Sf();J[l>>2]=v.length;var w=0;return v.forEach(T=>w+=T.length+1),J[u>>2]=w,0},fd_close:function(l){try{var u=cr(l);if(u.X===null)throw new _e(8);u.La&&(u.La=null);try{u.m.close&&u.m.close(u);}catch(v){throw v}finally{ln[u.X]=null;}return u.X=null,0}catch(v){if(typeof Er>"u"||v.name!=="ErrnoError")throw v;return v.aa}},fd_read:function(l,u,v,w){try{e:{var T=cr(l);l=u;for(var $,H=u=0;H<v;H++){var q=J[l>>2],oe=J[l+4>>2];l+=8;var ee=T,me=$,Ae=ne;if(0>oe||0>me)throw new _e(28);if(ee.X===null)throw new _e(8);if((ee.flags&2097155)===1)throw new _e(8);if((ee.node.mode&61440)===16384)throw new _e(31);if(!ee.m.read)throw new _e(28);var Ee=typeof me<"u";if(!Ee)me=ee.position;else if(!ee.seekable)throw new _e(70);var X=ee.m.read(ee,Ae,q,oe,me);Ee||(ee.position+=X);var be=X;if(0>be){var pe=-1;break e}if(u+=be,be<oe)break;typeof $<"u"&&($+=be);}pe=u;}return J[w>>2]=pe,0}catch($e){if(typeof Er>"u"||$e.name!=="ErrnoError")throw $e;return $e.aa}},fd_seek:function(l,u,v,w,T){u=v+2097152>>>0<4194305-!!u?(u>>>0)+4294967296*v:NaN;try{if(isNaN(u))return 61;var $=cr(l);return cf($,u,w),Kt=[$.position>>>0,(kt=$.position,1<=+Math.abs(kt)?0<kt?+Math.floor(kt/4294967296)>>>0:~~+Math.ceil((kt-+(~~kt>>>0))/4294967296)>>>0:0)],B[T>>2]=Kt[0],B[T+4>>2]=Kt[1],$.La&&u===0&&w===0&&($.La=null),0}catch(H){if(typeof Er>"u"||H.name!=="ErrnoError")throw H;return H.aa}},fd_write:function(l,u,v,w){try{e:{var T=cr(l);l=u;for(var $,H=u=0;H<v;H++){var q=J[l>>2],oe=J[l+4>>2];l+=8;var ee=T,me=q,Ae=oe,Ee=$,X=ne;if(0>Ae||0>Ee)throw new _e(28);if(ee.X===null)throw new _e(8);if((ee.flags&2097155)===0)throw new _e(8);if((ee.node.mode&61440)===16384)throw new _e(31);if(!ee.m.write)throw new _e(28);ee.seekable&&ee.flags&1024&&cf(ee,0,2);var be=typeof Ee<"u";if(!be)Ee=ee.position;else if(!ee.seekable)throw new _e(70);var pe=ee.m.write(ee,X,me,Ae,Ee,void 0);be||(ee.position+=pe);var $e=pe;if(0>$e){var Ue=-1;break e}u+=$e,typeof $<"u"&&($+=$e);}Ue=u;}return J[w>>2]=Ue,0}catch(Se){if(typeof Er>"u"||Se.name!=="ErrnoError")throw Se;return Se.aa}},invoke_vii:V0,isWindowsBrowser:function(){return  -1<navigator.platform.indexOf("Win")},strftime:_f,strftime_l:(l,u,v,w)=>_f(l,u,v,w)},dt=(function(){function l(v){return dt=v.exports,se=dt.memory,ye(),yf=dt.__indirect_function_table,Be.unshift(dt.__wasm_call_ctors),ut--,g.monitorRunDependencies?.(ut),ut==0&&Et&&(v=Et,Et=null,v()),dt}var u={env:Tf,wasi_snapshot_preview1:Tf};if(ut++,g.monitorRunDependencies?.(ut),g.instantiateWasm)try{return g.instantiateWasm(u,l)}catch(v){K(`Module.instantiateWasm callback failed with error: ${v}`),I(v);}return rt||(rt=Mt("canvas_advanced.wasm")?"canvas_advanced.wasm":g.locateFile?g.locateFile("canvas_advanced.wasm",j):j+"canvas_advanced.wasm"),ht(u,function(v){l(v.instance);}).catch(I),{}})(),Jn=l=>(Jn=dt.free)(l),Fc=l=>(Fc=dt.malloc)(l),Pf=l=>(Pf=dt.__getTypeName)(l),Lf=g._ma_device__on_notification_unlocked=l=>(Lf=g._ma_device__on_notification_unlocked=dt.ma_device__on_notification_unlocked)(l);g._ma_malloc_emscripten=(l,u)=>(g._ma_malloc_emscripten=dt.ma_malloc_emscripten)(l,u),g._ma_free_emscripten=(l,u)=>(g._ma_free_emscripten=dt.ma_free_emscripten)(l,u);var Mf=g._ma_device_process_pcm_frames_capture__webaudio=(l,u,v)=>(Mf=g._ma_device_process_pcm_frames_capture__webaudio=dt.ma_device_process_pcm_frames_capture__webaudio)(l,u,v),Rf=g._ma_device_process_pcm_frames_playback__webaudio=(l,u,v)=>(Rf=g._ma_device_process_pcm_frames_playback__webaudio=dt.ma_device_process_pcm_frames_playback__webaudio)(l,u,v),Ff=(l,u)=>(Ff=dt.setThrew)(l,u),Of=l=>(Of=dt._emscripten_stack_restore)(l),Nf=()=>(Nf=dt.emscripten_stack_get_current)();g.dynCall_iiji=(l,u,v,w,T)=>(g.dynCall_iiji=dt.dynCall_iiji)(l,u,v,w,T),g.dynCall_jiji=(l,u,v,w,T)=>(g.dynCall_jiji=dt.dynCall_jiji)(l,u,v,w,T),g.dynCall_iiiji=(l,u,v,w,T,$)=>(g.dynCall_iiiji=dt.dynCall_iiiji)(l,u,v,w,T,$),g.dynCall_iij=(l,u,v,w)=>(g.dynCall_iij=dt.dynCall_iij)(l,u,v,w),g.dynCall_jii=(l,u,v)=>(g.dynCall_jii=dt.dynCall_jii)(l,u,v),g.dynCall_viijii=(l,u,v,w,T,$,H)=>(g.dynCall_viijii=dt.dynCall_viijii)(l,u,v,w,T,$,H),g.dynCall_iiiiij=(l,u,v,w,T,$,H)=>(g.dynCall_iiiiij=dt.dynCall_iiiiij)(l,u,v,w,T,$,H),g.dynCall_iiiiijj=(l,u,v,w,T,$,H,q,oe)=>(g.dynCall_iiiiijj=dt.dynCall_iiiiijj)(l,u,v,w,T,$,H,q,oe),g.dynCall_iiiiiijj=(l,u,v,w,T,$,H,q,oe,ee)=>(g.dynCall_iiiiiijj=dt.dynCall_iiiiiijj)(l,u,v,w,T,$,H,q,oe,ee);function V0(l,u,v){var w=Nf();try{Ac(l)(u,v);}catch(T){if(Of(w),T!==T+0)throw T;Ff(1,0);}}var Ya;Et=function l(){Ya||Df(),Ya||(Et=l);};function Df(){function l(){if(!Ya&&(Ya=true,g.calledRun=true,!ae)){if(g.noFSInit||df||(df=true,g.stdin=g.stdin,g.stdout=g.stdout,g.stderr=g.stderr,g.stdin?li("stdin",g.stdin):gc("/dev/tty","/dev/stdin"),g.stdout?li("stdout",null,g.stdout):gc("/dev/tty","/dev/stdout"),g.stderr?li("stderr",null,g.stderr):gc("/dev/tty1","/dev/stderr"),Da("/dev/stdin",0),Da("/dev/stdout",1),Da("/dev/stderr",1)),ef=false,on(Be),S(g),g.onRuntimeInitialized&&g.onRuntimeInitialized(),g.postRun)for(typeof g.postRun=="function"&&(g.postRun=[g.postRun]);g.postRun.length;){var u=g.postRun.shift();xt.unshift(u);}on(xt);}}if(!(0<ut)){if(g.preRun)for(typeof g.preRun=="function"&&(g.preRun=[g.preRun]);g.preRun.length;)zt();on(Ie),0<ut||(g.setStatus?(g.setStatus("Running..."),setTimeout(function(){setTimeout(function(){g.setStatus("");},1),l();},1)):l());}}if(g.preInit)for(typeof g.preInit=="function"&&(g.preInit=[g.preInit]);0<g.preInit.length;)g.preInit.pop()();return Df(),y=E,y})})();const c=p;}),(a=>{a.exports=JSON.parse(`{"name":"@rive-app/canvas","version":"2.34.3","description":"Rive's canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive_fallback.wasm","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}`);}),((a,s,d)=>{d.r(s),d.d(s,{Animation:()=>p.Animation});var p=d(4);}),((a,s,d)=>{d.r(s),d.d(s,{Animation:()=>p});var p=(function(){function c(h,b,y,g){this.animation=h,this.artboard=b,this.playing=g,this.loopCount=0,this.scrubTo=null,this.instance=new y.LinearAnimationInstance(h,b);}return Object.defineProperty(c.prototype,"name",{get:function(){return this.animation.name},enumerable:false,configurable:true}),Object.defineProperty(c.prototype,"time",{get:function(){return this.instance.time},set:function(h){this.instance.time=h;},enumerable:false,configurable:true}),Object.defineProperty(c.prototype,"loopValue",{get:function(){return this.animation.loopValue},enumerable:false,configurable:true}),Object.defineProperty(c.prototype,"needsScrub",{get:function(){return this.scrubTo!==null},enumerable:false,configurable:true}),c.prototype.advance=function(h){this.scrubTo===null?this.instance.advance(h):(this.instance.time=0,this.instance.advance(this.scrubTo),this.scrubTo=null);},c.prototype.apply=function(h){this.instance.apply(h);},c.prototype.cleanup=function(){this.instance.delete();},c})();}),((a,s,d)=>{d.r(s),d.d(s,{AudioAssetWrapper:()=>h.AudioAssetWrapper,AudioWrapper:()=>h.AudioWrapper,BLANK_URL:()=>c.BLANK_URL,CustomFileAssetLoaderWrapper:()=>h.CustomFileAssetLoaderWrapper,FileAssetWrapper:()=>h.FileAssetWrapper,FileFinalizer:()=>h.FileFinalizer,FontAssetWrapper:()=>h.FontAssetWrapper,FontWrapper:()=>h.FontWrapper,ImageAssetWrapper:()=>h.ImageAssetWrapper,ImageWrapper:()=>h.ImageWrapper,createFinalization:()=>h.createFinalization,finalizationRegistry:()=>h.finalizationRegistry,registerTouchInteractions:()=>p.registerTouchInteractions,sanitizeUrl:()=>c.sanitizeUrl});var p=d(6),c=d(7),h=d(8);}),((a,s,d)=>{d.r(s),d.d(s,{registerTouchInteractions:()=>h});var p=void 0,c=function(b,y,g){var S,I,E=[];if(["touchstart","touchmove"].indexOf(b.type)>-1&&(!((S=b.changedTouches)===null||S===void 0)&&S.length)){y||b.preventDefault();for(var M=0,R=g?b.changedTouches.length:1;M<R;){var D=b.changedTouches[M];E.push({clientX:D.clientX,clientY:D.clientY,identifier:D.identifier}),M++;}}else if(b.type==="touchend"&&(!((I=b.changedTouches)===null||I===void 0)&&I.length))for(var M=0,R=g?b.changedTouches.length:1;M<R;){var D=b.changedTouches[M];E.push({clientX:D.clientX,clientY:D.clientY,identifier:D.identifier}),M++;}else E.push({clientX:b.clientX,clientY:b.clientY,identifier:0});return E},h=function(b){var y=b.canvas,g=b.artboard,S=b.stateMachines,I=S===void 0?[]:S,E=b.renderer,M=b.rive,R=b.fit,D=b.alignment,N=b.isTouchScrollEnabled,P=N===void 0?false:N,F=b.dispatchPointerExit,L=F===void 0?true:F,C=b.enableMultiTouch,_=C===void 0?false:C,z=b.layoutScaleFactor,j=z===void 0?1:z;if(!y||!I.length||!E||!M||!g||typeof window>"u")return null;var V=null,U=false,ce=function(ie){if(U&&ie instanceof MouseEvent){ie.type=="mouseup"&&(U=false);return}U=P&&ie.type==="touchend"&&V==="touchstart",V=ie.type;var se=ie.currentTarget.getBoundingClientRect(),ae=c(ie,P,_),ne=M.computeAlignment(R,D,{minX:0,minY:0,maxX:se.width,maxY:se.height},g.bounds,j),Y=new M.Mat2D;switch(ne.invert(Y),ae.forEach(function(rt){var De=rt.clientX,bn=rt.clientY;if(!(!De&&!bn)){var vn=De-se.left,ht=bn-se.top,kt=new M.Vec2D(vn,ht),Kt=M.mapXY(Y,kt),In=Kt.x(),on=Kt.y();rt.transformedX=In,rt.transformedY=on,Kt.delete(),kt.delete();}}),Y.delete(),ne.delete(),ie.type){case "mouseout":for(var Z=function(rt){L?ae.forEach(function(De){rt.pointerExit(De.transformedX,De.transformedY,De.identifier);}):ae.forEach(function(De){rt.pointerMove(De.transformedX,De.transformedY,De.identifier);});},O=0,B=I;O<B.length;O++){var J=B[O];Z(J);}break;case "touchmove":case "mouseover":case "mousemove":{for(var re=function(rt){ae.forEach(function(De){rt.pointerMove(De.transformedX,De.transformedY,De.identifier);});},le=0,ye=I;le<ye.length;le++){var J=ye[le];re(J);}break}case "touchstart":case "mousedown":{for(var Ie=function(rt){ae.forEach(function(De){rt.pointerDown(De.transformedX,De.transformedY,De.identifier);});},Be=0,xt=I;Be<xt.length;Be++){var J=xt[Be];Ie(J);}break}case "touchend":{for(var zt=function(rt){ae.forEach(function(De){rt.pointerUp(De.transformedX,De.transformedY,De.identifier),rt.pointerExit(De.transformedX,De.transformedY,De.identifier);});},ut=0,Et=I;ut<Et.length;ut++){var J=Et[ut];zt(J);}break}case "mouseup":{for(var Vt=function(rt){ae.forEach(function(De){rt.pointerUp(De.transformedX,De.transformedY,De.identifier);});},Mt=0,qt=I;Mt<qt.length;Mt++){var J=qt[Mt];Vt(J);}break}}},K=ce.bind(p);return y.addEventListener("mouseover",K),y.addEventListener("mouseout",K),y.addEventListener("mousemove",K),y.addEventListener("mousedown",K),y.addEventListener("mouseup",K),y.addEventListener("touchmove",K,{passive:P}),y.addEventListener("touchstart",K,{passive:P}),y.addEventListener("touchend",K),function(){y.removeEventListener("mouseover",K),y.removeEventListener("mouseout",K),y.removeEventListener("mousemove",K),y.removeEventListener("mousedown",K),y.removeEventListener("mouseup",K),y.removeEventListener("touchmove",K),y.removeEventListener("touchstart",K),y.removeEventListener("touchend",K);}};}),((a,s,d)=>{d.r(s),d.d(s,{BLANK_URL:()=>S,sanitizeUrl:()=>M});var p=/^([^\w]*)(javascript|data|vbscript)/im,c=/&#(\w+)(^\w|;)?/g,h=/&(newline|tab);/gi,b=/[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,y=/^.+(:|&colon;)/gim,g=[".","/"],S="about:blank";function I(R){return g.indexOf(R[0])>-1}function E(R){var D=R.replace(b,"");return D.replace(c,function(N,P){return String.fromCharCode(P)})}function M(R){if(!R)return S;var D=E(R).replace(h,"").replace(b,"").trim();if(!D)return S;if(I(D))return D;var N=D.match(y);if(!N)return D;var P=N[0];return p.test(P)?S:D}}),((a,s,d)=>{d.r(s),d.d(s,{AudioAssetWrapper:()=>R,AudioWrapper:()=>g,CustomFileAssetLoaderWrapper:()=>I,FileAssetWrapper:()=>E,FileFinalizer:()=>c,FontAssetWrapper:()=>D,FontWrapper:()=>S,ImageAssetWrapper:()=>M,ImageWrapper:()=>y,createFinalization:()=>L,finalizationRegistry:()=>F});var p=(function(){var C=function(_,z){return C=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,V){j.__proto__=V;}||function(j,V){for(var U in V)Object.prototype.hasOwnProperty.call(V,U)&&(j[U]=V[U]);},C(_,z)};return function(_,z){if(typeof z!="function"&&z!==null)throw new TypeError("Class extends value "+String(z)+" is not a constructor or null");C(_,z);function j(){this.constructor=_;}_.prototype=z===null?Object.create(z):(j.prototype=z.prototype,new j);}})(),c=(function(){function C(_){this.selfUnref=false,this._file=_;}return C.prototype.unref=function(){this._file&&this._file.unref();},C})(),h=(function(){function C(_){this._finalizableObject=_;}return C.prototype.unref=function(){this._finalizableObject.unref();},C})(),b=(function(){function C(){this.selfUnref=false;}return C.prototype.unref=function(){},C})(),y=(function(C){p(_,C);function _(z){var j=C.call(this)||this;return j._nativeImage=z,j}return Object.defineProperty(_.prototype,"nativeImage",{get:function(){return this._nativeImage},enumerable:false,configurable:true}),_.prototype.unref=function(){this.selfUnref&&this._nativeImage.unref();},_})(b),g=(function(C){p(_,C);function _(z){var j=C.call(this)||this;return j._nativeAudio=z,j}return Object.defineProperty(_.prototype,"nativeAudio",{get:function(){return this._nativeAudio},enumerable:false,configurable:true}),_.prototype.unref=function(){this.selfUnref&&this._nativeAudio.unref();},_})(b),S=(function(C){p(_,C);function _(z){var j=C.call(this)||this;return j._nativeFont=z,j}return Object.defineProperty(_.prototype,"nativeFont",{get:function(){return this._nativeFont},enumerable:false,configurable:true}),_.prototype.unref=function(){this.selfUnref&&this._nativeFont.unref();},_})(b),I=(function(){function C(_,z){this._assetLoaderCallback=z,this.assetLoader=new _.CustomFileAssetLoader({loadContents:this.loadContents.bind(this)});}return C.prototype.loadContents=function(_,z){var j;return _.isImage?j=new M(_):_.isAudio?j=new R(_):_.isFont&&(j=new D(_)),this._assetLoaderCallback(j,z)},C})(),E=(function(){function C(_){this._nativeFileAsset=_;}return C.prototype.decode=function(_){this._nativeFileAsset.decode(_);},Object.defineProperty(C.prototype,"name",{get:function(){return this._nativeFileAsset.name},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"fileExtension",{get:function(){return this._nativeFileAsset.fileExtension},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"uniqueFilename",{get:function(){return this._nativeFileAsset.uniqueFilename},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isAudio",{get:function(){return this._nativeFileAsset.isAudio},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isImage",{get:function(){return this._nativeFileAsset.isImage},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"isFont",{get:function(){return this._nativeFileAsset.isFont},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"cdnUuid",{get:function(){return this._nativeFileAsset.cdnUuid},enumerable:false,configurable:true}),Object.defineProperty(C.prototype,"nativeFileAsset",{get:function(){return this._nativeFileAsset},enumerable:false,configurable:true}),C})(),M=(function(C){p(_,C);function _(){return C!==null&&C.apply(this,arguments)||this}return _.prototype.setRenderImage=function(z){this._nativeFileAsset.setRenderImage(z.nativeImage);},_})(E),R=(function(C){p(_,C);function _(){return C!==null&&C.apply(this,arguments)||this}return _.prototype.setAudioSource=function(z){this._nativeFileAsset.setAudioSource(z.nativeAudio);},_})(E),D=(function(C){p(_,C);function _(){return C!==null&&C.apply(this,arguments)||this}return _.prototype.setFont=function(z){this._nativeFileAsset.setFont(z.nativeFont);},_})(E),N=(function(){function C(_){}return C.prototype.register=function(_){_.selfUnref=true;},C.prototype.unregister=function(_){},C})(),P=typeof FinalizationRegistry<"u"?FinalizationRegistry:N,F=new P(function(C){C?.unref();}),L=function(C,_){var z=new h(_);F.register(C,z);};})],r={};function o(a){var s=r[a];if(s!==void 0)return s.exports;var d=r[a]={exports:{}};return n[a](d,d.exports,o),d.exports}o.d=(a,s)=>{for(var d in s)o.o(s,d)&&!o.o(a,d)&&Object.defineProperty(a,d,{enumerable:true,get:s[d]});},o.o=(a,s)=>Object.prototype.hasOwnProperty.call(a,s),o.r=a=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:true});};var i={};return (()=>{o.r(i),o.d(i,{Alignment:()=>M,DataEnum:()=>ye,DrawOptimizationOptions:()=>R,EventType:()=>U,Fit:()=>E,Layout:()=>D,LoopType:()=>ce,Rive:()=>re,RiveEventType:()=>L,RiveFile:()=>J,RuntimeLoader:()=>N,StateMachineInput:()=>F,StateMachineInputType:()=>P,Testing:()=>kt,ViewModel:()=>le,ViewModelInstance:()=>Be,ViewModelInstanceArtboard:()=>bn,ViewModelInstanceAssetImage:()=>De,ViewModelInstanceBoolean:()=>Et,ViewModelInstanceColor:()=>rt,ViewModelInstanceEnum:()=>Mt,ViewModelInstanceList:()=>qt,ViewModelInstanceNumber:()=>ut,ViewModelInstanceString:()=>zt,ViewModelInstanceTrigger:()=>Vt,ViewModelInstanceValue:()=>xt,decodeAudio:()=>Kt,decodeFont:()=>on,decodeImage:()=>In});var a=o(1),s=o(2),d=o(3),p=o(5),c=(function(){var k=function(f,m){return k=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,G){A.__proto__=G;}||function(A,G){for(var W in G)Object.prototype.hasOwnProperty.call(G,W)&&(A[W]=G[W]);},k(f,m)};return function(f,m){if(typeof m!="function"&&m!==null)throw new TypeError("Class extends value "+String(m)+" is not a constructor or null");k(f,m);function A(){this.constructor=f;}f.prototype=m===null?Object.create(m):(A.prototype=m.prototype,new A);}})(),h=function(){return h=Object.assign||function(k){for(var f,m=1,A=arguments.length;m<A;m++){f=arguments[m];for(var G in f)Object.prototype.hasOwnProperty.call(f,G)&&(k[G]=f[G]);}return k},h.apply(this,arguments)},b=function(k,f,m,A){function G(W){return W instanceof m?W:new m(function(Q){Q(W);})}return new(m||(m=Promise))(function(W,Q){function de(we){try{ge(A.next(we));}catch(Ze){Q(Ze);}}function xe(we){try{ge(A.throw(we));}catch(Ze){Q(Ze);}}function ge(we){we.done?W(we.value):G(we.value).then(de,xe);}ge((A=A.apply(k,[])).next());})},y=function(k,f){var m={label:0,sent:function(){if(W[0]&1)throw W[1];return W[1]},trys:[],ops:[]},A,G,W,Q=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return Q.next=de(0),Q.throw=de(1),Q.return=de(2),typeof Symbol=="function"&&(Q[Symbol.iterator]=function(){return this}),Q;function de(ge){return function(we){return xe([ge,we])}}function xe(ge){if(A)throw new TypeError("Generator is already executing.");for(;Q&&(Q=0,ge[0]&&(m=0)),m;)try{if(A=1,G&&(W=ge[0]&2?G.return:ge[0]?G.throw||((W=G.return)&&W.call(G),0):G.next)&&!(W=W.call(G,ge[1])).done)return W;switch(G=0,W&&(ge=[ge[0]&2,W.value]),ge[0]){case 0:case 1:W=ge;break;case 4:return m.label++,{value:ge[1],done:!1};case 5:m.label++,G=ge[1],ge=[0];continue;case 7:ge=m.ops.pop(),m.trys.pop();continue;default:if(W=m.trys,!(W=W.length>0&&W[W.length-1])&&(ge[0]===6||ge[0]===2)){m=0;continue}if(ge[0]===3&&(!W||ge[1]>W[0]&&ge[1]<W[3])){m.label=ge[1];break}if(ge[0]===6&&m.label<W[1]){m.label=W[1],W=ge;break}if(W&&m.label<W[2]){m.label=W[2],m.ops.push(ge);break}W[2]&&m.ops.pop(),m.trys.pop();continue}ge=f.call(k,m);}catch(we){ge=[6,we],G=0;}finally{A=W=0;}if(ge[0]&5)throw ge[1];return {value:ge[0]?ge[1]:void 0,done:true}}},g=function(k,f,m){for(var A=0,G=f.length,W;A<G;A++)(W||!(A in f))&&(W||(W=Array.prototype.slice.call(f,0,A)),W[A]=f[A]);return k.concat(W||Array.prototype.slice.call(f))},S=(function(k){c(f,k);function f(){var m=k!==null&&k.apply(this,arguments)||this;return m.isHandledError=true,m}return f})(Error),I=function(k){return k&&k.isHandledError?k.message:"Problem loading file; may be corrupt!"},E;(function(k){k.Cover="cover",k.Contain="contain",k.Fill="fill",k.FitWidth="fitWidth",k.FitHeight="fitHeight",k.None="none",k.ScaleDown="scaleDown",k.Layout="layout";})(E||(E={}));var M;(function(k){k.Center="center",k.TopLeft="topLeft",k.TopCenter="topCenter",k.TopRight="topRight",k.CenterLeft="centerLeft",k.CenterRight="centerRight",k.BottomLeft="bottomLeft",k.BottomCenter="bottomCenter",k.BottomRight="bottomRight";})(M||(M={}));var R;(function(k){k.AlwaysDraw="alwaysDraw",k.DrawOnChanged="drawOnChanged";})(R||(R={}));var D=(function(){function k(f){var m,A,G,W,Q,de,xe;this.fit=(m=f?.fit)!==null&&m!==void 0?m:E.Contain,this.alignment=(A=f?.alignment)!==null&&A!==void 0?A:M.Center,this.layoutScaleFactor=(G=f?.layoutScaleFactor)!==null&&G!==void 0?G:1,this.minX=(W=f?.minX)!==null&&W!==void 0?W:0,this.minY=(Q=f?.minY)!==null&&Q!==void 0?Q:0,this.maxX=(de=f?.maxX)!==null&&de!==void 0?de:0,this.maxY=(xe=f?.maxY)!==null&&xe!==void 0?xe:0;}return k.new=function(f){var m=f.fit,A=f.alignment,G=f.minX,W=f.minY,Q=f.maxX,de=f.maxY;return console.warn("This function is deprecated: please use `new Layout({})` instead"),new k({fit:m,alignment:A,minX:G,minY:W,maxX:Q,maxY:de})},k.prototype.copyWith=function(f){var m=f.fit,A=f.alignment,G=f.layoutScaleFactor,W=f.minX,Q=f.minY,de=f.maxX,xe=f.maxY;return new k({fit:m??this.fit,alignment:A??this.alignment,layoutScaleFactor:G??this.layoutScaleFactor,minX:W??this.minX,minY:Q??this.minY,maxX:de??this.maxX,maxY:xe??this.maxY})},k.prototype.runtimeFit=function(f){if(this.cachedRuntimeFit)return this.cachedRuntimeFit;var m;return this.fit===E.Cover?m=f.Fit.cover:this.fit===E.Contain?m=f.Fit.contain:this.fit===E.Fill?m=f.Fit.fill:this.fit===E.FitWidth?m=f.Fit.fitWidth:this.fit===E.FitHeight?m=f.Fit.fitHeight:this.fit===E.ScaleDown?m=f.Fit.scaleDown:this.fit===E.Layout?m=f.Fit.layout:m=f.Fit.none,this.cachedRuntimeFit=m,m},k.prototype.runtimeAlignment=function(f){if(this.cachedRuntimeAlignment)return this.cachedRuntimeAlignment;var m;return this.alignment===M.TopLeft?m=f.Alignment.topLeft:this.alignment===M.TopCenter?m=f.Alignment.topCenter:this.alignment===M.TopRight?m=f.Alignment.topRight:this.alignment===M.CenterLeft?m=f.Alignment.centerLeft:this.alignment===M.CenterRight?m=f.Alignment.centerRight:this.alignment===M.BottomLeft?m=f.Alignment.bottomLeft:this.alignment===M.BottomCenter?m=f.Alignment.bottomCenter:this.alignment===M.BottomRight?m=f.Alignment.bottomRight:m=f.Alignment.center,this.cachedRuntimeAlignment=m,m},k})(),N=(function(){function k(){}return k.loadRuntime=function(){a.default({locateFile:function(){return k.wasmURL}}).then(function(f){var m;for(k.runtime=f;k.callBackQueue.length>0;)(m=k.callBackQueue.shift())===null||m===void 0||m(k.runtime);}).catch(function(f){var m={message:f?.message||"Unknown error",type:f?.name||"Error",wasmError:f instanceof WebAssembly.CompileError||f instanceof WebAssembly.RuntimeError,originalError:f};console.debug("Rive WASM load error details:",m);var A="https://cdn.jsdelivr.net/npm/".concat(s.name,"@").concat(s.version,"/rive_fallback.wasm");if(k.wasmURL.toLowerCase()!==A)console.warn("Failed to load WASM from ".concat(k.wasmURL," (").concat(m.message,"), trying jsdelivr as a backup")),k.setWasmUrl(A),k.loadRuntime();else {var G=["Could not load Rive WASM file from ".concat(k.wasmURL," or ").concat(A,"."),"Possible reasons:","- Network connection is down","- WebAssembly is not supported in this environment","- The WASM file is corrupted or incompatible",`
Error details:`,"- Type: ".concat(m.type),"- Message: ".concat(m.message),"- WebAssembly-specific error: ".concat(m.wasmError),`
To resolve, you may need to:`,"1. Check your network connection","2. Set a new WASM source via RuntimeLoader.setWasmUrl()","3. Call RuntimeLoader.loadRuntime() again"].join(`
`);console.error(G);}});},k.getInstance=function(f){k.isLoading||(k.isLoading=true,k.loadRuntime()),k.runtime?f(k.runtime):k.callBackQueue.push(f);},k.awaitInstance=function(){return new Promise(function(f){return k.getInstance(function(m){return f(m)})})},k.setWasmUrl=function(f){k.wasmURL=f;},k.getWasmUrl=function(){return k.wasmURL},k.isLoading=false,k.callBackQueue=[],k.wasmURL="https://unpkg.com/".concat(s.name,"@").concat(s.version,"/rive.wasm"),k})(),P;(function(k){k[k.Number=56]="Number",k[k.Trigger=58]="Trigger",k[k.Boolean=59]="Boolean";})(P||(P={}));var F=(function(){function k(f,m){this.type=f,this.runtimeInput=m;}return Object.defineProperty(k.prototype,"name",{get:function(){return this.runtimeInput.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"value",{get:function(){return this.runtimeInput.value},set:function(f){this.runtimeInput.value=f;},enumerable:false,configurable:true}),k.prototype.fire=function(){this.type===P.Trigger&&this.runtimeInput.fire();},k.prototype.delete=function(){this.runtimeInput=null;},k})(),L;(function(k){k[k.General=128]="General",k[k.OpenUrl=131]="OpenUrl";})(L||(L={}));var C=(function(){function k(f){this.isBindableArtboard=false,this.isBindableArtboard=f;}return k})(),_=(function(k){c(f,k);function f(m,A){var G=k.call(this,false)||this;return G.nativeArtboard=m,G.file=A,G}return f})(C),z=(function(k){c(f,k);function f(m){var A=k.call(this,true)||this;return A.selfUnref=false,A.nativeArtboard=m,A}return Object.defineProperty(f.prototype,"viewModel",{set:function(m){this.nativeViewModel=m.nativeInstance;},enumerable:false,configurable:true}),f.prototype.destroy=function(){var m;this.selfUnref&&(this.nativeArtboard.unref(),(m=this.nativeViewModel)===null||m===void 0||m.unref());},f})(C),j=(function(){function k(f,m,A,G){this.stateMachine=f,this.playing=A,this.artboard=G,this.inputs=[],this.instance=new m.StateMachineInstance(f,G),this.initInputs(m);}return Object.defineProperty(k.prototype,"name",{get:function(){return this.stateMachine.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"statesChanged",{get:function(){for(var f=[],m=0;m<this.instance.stateChangedCount();m++)f.push(this.instance.stateChangedNameByIndex(m));return f},enumerable:false,configurable:true}),k.prototype.advance=function(f){this.instance.advance(f);},k.prototype.advanceAndApply=function(f){this.instance.advanceAndApply(f);},k.prototype.reportedEventCount=function(){return this.instance.reportedEventCount()},k.prototype.reportedEventAt=function(f){return this.instance.reportedEventAt(f)},k.prototype.initInputs=function(f){for(var m=0;m<this.instance.inputCount();m++){var A=this.instance.input(m);this.inputs.push(this.mapRuntimeInput(A,f));}},k.prototype.mapRuntimeInput=function(f,m){if(f.type===m.SMIInput.bool)return new F(P.Boolean,f.asBool());if(f.type===m.SMIInput.number)return new F(P.Number,f.asNumber());if(f.type===m.SMIInput.trigger)return new F(P.Trigger,f.asTrigger())},k.prototype.cleanup=function(){this.inputs.forEach(function(f){f.delete();}),this.inputs.length=0,this.instance.delete();},k.prototype.bindViewModelInstance=function(f){f.runtimeInstance!=null&&this.instance.bindViewModelInstance(f.runtimeInstance);},k})(),V=(function(){function k(f,m,A,G,W){G===void 0&&(G=[]),W===void 0&&(W=[]),this.runtime=f,this.artboard=m,this.eventManager=A,this.animations=G,this.stateMachines=W;}return k.prototype.add=function(f,m,A){if(A===void 0&&(A=true),f=ht(f),f.length===0)this.animations.forEach(function(qe){return qe.playing=m}),this.stateMachines.forEach(function(qe){return qe.playing=m});else for(var G=this.animations.map(function(qe){return qe.name}),W=this.stateMachines.map(function(qe){return qe.name}),Q=0;Q<f.length;Q++){var de=G.indexOf(f[Q]),xe=W.indexOf(f[Q]);if(de>=0||xe>=0)de>=0?this.animations[de].playing=m:this.stateMachines[xe].playing=m;else {var ge=this.artboard.animationByName(f[Q]);if(ge){var we=new d.Animation(ge,this.artboard,this.runtime,m);we.advance(0),we.apply(1),this.animations.push(we);}else {var Ze=this.artboard.stateMachineByName(f[Q]);if(Ze){var st=new j(Ze,this.runtime,m,this.artboard);this.stateMachines.push(st);}}}}return A&&(m?this.eventManager.fire({type:U.Play,data:this.playing}):this.eventManager.fire({type:U.Pause,data:this.paused})),m?this.playing:this.paused},k.prototype.initLinearAnimations=function(f,m){for(var A=this.animations.map(function(xe){return xe.name}),G=0;G<f.length;G++){var W=A.indexOf(f[G]);if(W>=0)this.animations[W].playing=m;else {var Q=this.artboard.animationByName(f[G]);if(Q){var de=new d.Animation(Q,this.artboard,this.runtime,m);de.advance(0),de.apply(1),this.animations.push(de);}else console.error("Animation with name ".concat(f[G]," not found."));}}},k.prototype.initStateMachines=function(f,m){for(var A=this.stateMachines.map(function(xe){return xe.name}),G=0;G<f.length;G++){var W=A.indexOf(f[G]);if(W>=0)this.stateMachines[W].playing=m;else {var Q=this.artboard.stateMachineByName(f[G]);if(Q){var de=new j(Q,this.runtime,m,this.artboard);this.stateMachines.push(de);}else console.warn("State Machine with name ".concat(f[G]," not found.")),this.initLinearAnimations([f[G]],m);}}},k.prototype.play=function(f){return this.add(f,true)},k.prototype.advanceIfPaused=function(){this.stateMachines.forEach(function(f){f.playing||f.advanceAndApply(0);});},k.prototype.pause=function(f){return this.add(f,false)},k.prototype.scrub=function(f,m){var A=this.animations.filter(function(G){return f.includes(G.name)});return A.forEach(function(G){return G.scrubTo=m}),A.map(function(G){return G.name})},Object.defineProperty(k.prototype,"playing",{get:function(){return this.animations.filter(function(f){return f.playing}).map(function(f){return f.name}).concat(this.stateMachines.filter(function(f){return f.playing}).map(function(f){return f.name}))},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"paused",{get:function(){return this.animations.filter(function(f){return !f.playing}).map(function(f){return f.name}).concat(this.stateMachines.filter(function(f){return !f.playing}).map(function(f){return f.name}))},enumerable:false,configurable:true}),k.prototype.stop=function(f){var m=this;f=ht(f);var A=[];if(f.length===0)A=this.animations.map(function(Q){return Q.name}).concat(this.stateMachines.map(function(Q){return Q.name})),this.animations.forEach(function(Q){return Q.cleanup()}),this.stateMachines.forEach(function(Q){return Q.cleanup()}),this.animations.splice(0,this.animations.length),this.stateMachines.splice(0,this.stateMachines.length);else {var G=this.animations.filter(function(Q){return f.includes(Q.name)});G.forEach(function(Q){Q.cleanup(),m.animations.splice(m.animations.indexOf(Q),1);});var W=this.stateMachines.filter(function(Q){return f.includes(Q.name)});W.forEach(function(Q){Q.cleanup(),m.stateMachines.splice(m.stateMachines.indexOf(Q),1);}),A=G.map(function(Q){return Q.name}).concat(W.map(function(Q){return Q.name}));}return this.eventManager.fire({type:U.Stop,data:A}),A},Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animations.reduce(function(f,m){return f||m.playing},false)||this.stateMachines.reduce(function(f,m){return f||m.playing},false)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return !this.isPlaying&&(this.animations.length>0||this.stateMachines.length>0)},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){return this.animations.length===0&&this.stateMachines.length===0},enumerable:false,configurable:true}),k.prototype.atLeastOne=function(f,m){m===void 0&&(m=true);var A;return this.animations.length===0&&this.stateMachines.length===0&&(this.artboard.animationCount()>0?this.add([A=this.artboard.animationByIndex(0).name],f,m):this.artboard.stateMachineCount()>0&&this.add([A=this.artboard.stateMachineByIndex(0).name],f,m)),A},k.prototype.handleLooping=function(){for(var f=0,m=this.animations.filter(function(G){return G.playing});f<m.length;f++){var A=m[f];A.loopValue===0&&A.loopCount?(A.loopCount=0,this.stop(A.name)):A.loopValue===1&&A.loopCount?(this.eventManager.fire({type:U.Loop,data:{animation:A.name,type:ce.Loop}}),A.loopCount=0):A.loopValue===2&&A.loopCount>1&&(this.eventManager.fire({type:U.Loop,data:{animation:A.name,type:ce.PingPong}}),A.loopCount=0);}},k.prototype.handleStateChanges=function(){for(var f=[],m=0,A=this.stateMachines.filter(function(W){return W.playing});m<A.length;m++){var G=A[m];f.push.apply(f,G.statesChanged);}f.length>0&&this.eventManager.fire({type:U.StateChange,data:f});},k.prototype.handleAdvancing=function(f){this.eventManager.fire({type:U.Advance,data:f});},k})(),U;(function(k){k.Load="load",k.LoadError="loaderror",k.Play="play",k.Pause="pause",k.Stop="stop",k.Loop="loop",k.Draw="draw",k.Advance="advance",k.StateChange="statechange",k.RiveEvent="riveevent",k.AudioStatusChange="audiostatuschange";})(U||(U={}));var ce;(function(k){k.OneShot="oneshot",k.Loop="loop",k.PingPong="pingpong";})(ce||(ce={}));var K=(function(){function k(f){f===void 0&&(f=[]),this.listeners=f;}return k.prototype.getListeners=function(f){return this.listeners.filter(function(m){return m.type===f})},k.prototype.add=function(f){this.listeners.includes(f)||this.listeners.push(f);},k.prototype.remove=function(f){for(var m=0;m<this.listeners.length;m++){var A=this.listeners[m];if(A.type===f.type&&A.callback===f.callback){this.listeners.splice(m,1);break}}},k.prototype.removeAll=function(f){var m=this;f?this.listeners.filter(function(A){return A.type===f}).forEach(function(A){return m.remove(A)}):this.listeners.splice(0,this.listeners.length);},k.prototype.fire=function(f){var m=this.getListeners(f.type);m.forEach(function(A){return A.callback(f)});},k})(),ie=(function(){function k(f){this.eventManager=f,this.queue=[];}return k.prototype.add=function(f){this.queue.push(f);},k.prototype.process=function(){for(;this.queue.length>0;){var f=this.queue.shift();f?.action&&f.action(),f?.event&&this.eventManager.fire(f.event);}},k})(),se;(function(k){k[k.AVAILABLE=0]="AVAILABLE",k[k.UNAVAILABLE=1]="UNAVAILABLE";})(se||(se={}));var ae=(function(k){c(f,k);function f(){var m=k!==null&&k.apply(this,arguments)||this;return m._started=false,m._enabled=false,m._status=se.UNAVAILABLE,m}return f.prototype.delay=function(m){return b(this,void 0,void 0,function(){return y(this,function(A){return [2,new Promise(function(G){return setTimeout(G,m)})]})})},f.prototype.timeout=function(){return b(this,void 0,void 0,function(){return y(this,function(m){return [2,new Promise(function(A,G){return setTimeout(G,50)})]})})},f.prototype.reportToListeners=function(){this.fire({type:U.AudioStatusChange}),this.removeAll();},f.prototype.enableAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(m){return this._enabled||(this._enabled=true,this._status=se.AVAILABLE,this.reportToListeners()),[2]})})},f.prototype.testAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(m){switch(m.label){case 0:if(!(this._status===se.UNAVAILABLE&&this._audioContext!==null))return [3,4];m.label=1;case 1:return m.trys.push([1,3,,4]),[4,Promise.race([this._audioContext.resume(),this.timeout()])];case 2:return m.sent(),this.enableAudio(),[3,4];case 3:return m.sent(),[3,4];case 4:return [2]}})})},f.prototype._establishAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(m){switch(m.label){case 0:return this._started?[3,5]:(this._started=true,typeof window>"u"?(this.enableAudio(),[3,5]):[3,1]);case 1:this._audioContext=new AudioContext,this.listenForUserAction(),m.label=2;case 2:return this._status!==se.UNAVAILABLE?[3,5]:[4,this.testAudio()];case 3:return m.sent(),[4,this.delay(1e3)];case 4:return m.sent(),[3,2];case 5:return [2]}})})},f.prototype.listenForUserAction=function(){var m=this,A=function(){return b(m,void 0,void 0,function(){return y(this,function(G){return this.enableAudio(),[2]})})};document.addEventListener("pointerdown",A,{once:true});},f.prototype.establishAudio=function(){return b(this,void 0,void 0,function(){return y(this,function(m){return this._establishAudio(),[2]})})},Object.defineProperty(f.prototype,"systemVolume",{get:function(){return this._status===se.UNAVAILABLE?(this.testAudio(),0):1},enumerable:false,configurable:true}),Object.defineProperty(f.prototype,"status",{get:function(){return this._status},enumerable:false,configurable:true}),f})(K),ne=new ae,Y=(function(){function k(){}return k.prototype.observe=function(){},k.prototype.unobserve=function(){},k.prototype.disconnect=function(){},k})(),Z=globalThis.ResizeObserver||Y,O=(function(){function k(){var f=this;this._elementsMap=new Map,this._onObservedEntry=function(m){var A=f._elementsMap.get(m.target);A!==null?A.onResize(m.target.clientWidth==0||m.target.clientHeight==0):f._resizeObserver.unobserve(m.target);},this._onObserved=function(m){m.forEach(f._onObservedEntry);},this._resizeObserver=new Z(this._onObserved);}return k.prototype.add=function(f,m){var A={onResize:m,element:f};return this._elementsMap.set(f,A),this._resizeObserver.observe(f),A},k.prototype.remove=function(f){this._resizeObserver.unobserve(f.element),this._elementsMap.delete(f.element);},k})(),B=new O,J=(function(){function k(f){this.enableRiveAssetCDN=true,this.referenceCount=0,this.destroyed=false,this.selfUnref=false,this.bindableArtboards=[],this.src=f.src,this.buffer=f.buffer,f.assetLoader&&(this.assetLoader=f.assetLoader),this.enableRiveAssetCDN=typeof f.enableRiveAssetCDN=="boolean"?f.enableRiveAssetCDN:true,this.eventManager=new K,f.onLoad&&this.on(U.Load,f.onLoad),f.onLoadError&&this.on(U.LoadError,f.onLoadError);}return k.prototype.releaseFile=function(){var f;this.selfUnref&&((f=this.file)===null||f===void 0||f.unref()),this.file=null;},k.prototype.releaseBindableArtboards=function(){this.bindableArtboards.forEach(function(f){return f.destroy()});},k.prototype.initData=function(){return b(this,void 0,void 0,function(){var f,m,A,G,W;return y(this,function(Q){switch(Q.label){case 0:return this.src?(f=this,[4,vn(this.src)]):[3,2];case 1:f.buffer=Q.sent(),Q.label=2;case 2:return this.destroyed?[2]:(this.assetLoader&&(A=new p.CustomFileAssetLoaderWrapper(this.runtime,this.assetLoader),m=A.assetLoader),G=this,[4,this.runtime.load(new Uint8Array(this.buffer),m,this.enableRiveAssetCDN)]);case 3:return G.file=Q.sent(),W=new p.FileFinalizer(this.file),p.finalizationRegistry.register(this,W),this.destroyed?(this.releaseFile(),[2]):(this.file!==null?this.eventManager.fire({type:U.Load,data:this}):this.fireLoadError(k.fileLoadErrorMessage),[2])}})})},k.prototype.init=function(){return b(this,void 0,void 0,function(){var f,m;return y(this,function(A){switch(A.label){case 0:if(!this.src&&!this.buffer)return this.fireLoadError(k.missingErrorMessage),[2];A.label=1;case 1:return A.trys.push([1,4,,5]),f=this,[4,N.awaitInstance()];case 2:return f.runtime=A.sent(),this.destroyed?[2]:[4,this.initData()];case 3:return A.sent(),[3,5];case 4:return m=A.sent(),this.fireLoadError(m instanceof Error?m.message:k.fileLoadErrorMessage),[3,5];case 5:return [2]}})})},k.prototype.fireLoadError=function(f){throw this.eventManager.fire({type:U.LoadError,data:f}),new Error(f)},k.prototype.on=function(f,m){this.eventManager.add({type:f,callback:m});},k.prototype.off=function(f,m){this.eventManager.remove({type:f,callback:m});},k.prototype.cleanup=function(){this.referenceCount-=1,this.referenceCount<=0&&(this.removeAllRiveEventListeners(),this.releaseFile(),this.releaseBindableArtboards(),this.destroyed=true);},k.prototype.removeAllRiveEventListeners=function(f){this.eventManager.removeAll(f);},k.prototype.getInstance=function(){if(this.file!==null)return this.referenceCount+=1,this.file},k.prototype.destroyIfUnused=function(){this.referenceCount<=0&&this.cleanup();},k.prototype.createBindableArtboard=function(f){if(f!=null){var m=new z(f);return (0, p.createFinalization)(m,m.nativeArtboard),this.bindableArtboards.push(m),m}return null},k.prototype.getArtboard=function(f){var m=this.file.artboardByName(f);if(m!=null)return new _(m,this)},k.prototype.getBindableArtboard=function(f){var m=this.file.bindableArtboardByName(f);return this.createBindableArtboard(m)},k.prototype.getDefaultBindableArtboard=function(){var f=this.file.bindableArtboardDefault();return this.createBindableArtboard(f)},k.prototype.internalBindableArtboardFromArtboard=function(f){var m=this.file.internalBindableArtboardFromArtboard(f);return this.createBindableArtboard(m)},k.prototype.viewModelByName=function(f){var m=this.file.viewModelByName(f);return m!==null?new le(m):null},k.missingErrorMessage="Rive source file or data buffer required",k.fileLoadErrorMessage="The file failed to load",k})(),re=(function(){function k(f){var m=this,A,G;this.loaded=false,this.destroyed=false,this._observed=null,this.readyForPlaying=false,this.artboard=null,this.eventCleanup=null,this.shouldDisableRiveListeners=false,this.automaticallyHandleEvents=false,this.dispatchPointerExit=true,this.enableMultiTouch=false,this.enableRiveAssetCDN=true,this._volume=1,this._artboardWidth=void 0,this._artboardHeight=void 0,this._devicePixelRatioUsed=1,this._hasZeroSize=false,this._needsRedraw=false,this._currentCanvasWidth=0,this._currentCanvasHeight=0,this._audioEventListener=null,this._boundDraw=null,this._viewModelInstance=null,this._dataEnums=null,this.drawOptimization=R.DrawOnChanged,this.durations=[],this.frameTimes=[],this.frameCount=0,this.isTouchScrollEnabled=false,this.onCanvasResize=function(W){var Q=m._hasZeroSize!==W;m._hasZeroSize=W,W?(!m._layout.maxX||!m._layout.maxY)&&m.resizeToCanvas():Q&&m.resizeDrawingSurfaceToCanvas();},this.renderSecondTimer=0,this._boundDraw=this.draw.bind(this),this.canvas=f.canvas,f.canvas.constructor===HTMLCanvasElement&&(this._observed=B.add(this.canvas,this.onCanvasResize)),this._currentCanvasWidth=this.canvas.width,this._currentCanvasHeight=this.canvas.height,this.src=f.src,this.buffer=f.buffer,this.riveFile=f.riveFile,this.layout=(A=f.layout)!==null&&A!==void 0?A:new D,this.shouldDisableRiveListeners=!!f.shouldDisableRiveListeners,this.isTouchScrollEnabled=!!f.isTouchScrollEnabled,this.automaticallyHandleEvents=!!f.automaticallyHandleEvents,this.dispatchPointerExit=f.dispatchPointerExit===false?f.dispatchPointerExit:this.dispatchPointerExit,this.enableMultiTouch=!!f.enableMultiTouch,this.drawOptimization=(G=f.drawingOptions)!==null&&G!==void 0?G:this.drawOptimization,this.enableRiveAssetCDN=f.enableRiveAssetCDN===void 0?true:f.enableRiveAssetCDN,this.eventManager=new K,f.onLoad&&this.on(U.Load,f.onLoad),f.onLoadError&&this.on(U.LoadError,f.onLoadError),f.onPlay&&this.on(U.Play,f.onPlay),f.onPause&&this.on(U.Pause,f.onPause),f.onStop&&this.on(U.Stop,f.onStop),f.onLoop&&this.on(U.Loop,f.onLoop),f.onStateChange&&this.on(U.StateChange,f.onStateChange),f.onAdvance&&this.on(U.Advance,f.onAdvance),f.onload&&!f.onLoad&&this.on(U.Load,f.onload),f.onloaderror&&!f.onLoadError&&this.on(U.LoadError,f.onloaderror),f.onplay&&!f.onPlay&&this.on(U.Play,f.onplay),f.onpause&&!f.onPause&&this.on(U.Pause,f.onpause),f.onstop&&!f.onStop&&this.on(U.Stop,f.onstop),f.onloop&&!f.onLoop&&this.on(U.Loop,f.onloop),f.onstatechange&&!f.onStateChange&&this.on(U.StateChange,f.onstatechange),f.assetLoader&&(this.assetLoader=f.assetLoader),this.taskQueue=new ie(this.eventManager),this.init({src:this.src,buffer:this.buffer,riveFile:this.riveFile,autoplay:f.autoplay,autoBind:f.autoBind,animations:f.animations,stateMachines:f.stateMachines,artboard:f.artboard,useOffscreenRenderer:f.useOffscreenRenderer});}return Object.defineProperty(k.prototype,"viewModelCount",{get:function(){return this.file.viewModelCount()},enumerable:false,configurable:true}),k.new=function(f){return console.warn("This function is deprecated: please use `new Rive({})` instead"),new k(f)},k.prototype.onSystemAudioChanged=function(){this.volume=this._volume;},k.prototype.init=function(f){var m=this,A=f.src,G=f.buffer,W=f.riveFile,Q=f.animations,de=f.stateMachines,xe=f.artboard,ge=f.autoplay,we=ge===void 0?false:ge,Ze=f.useOffscreenRenderer,st=Ze===void 0?false:Ze,qe=f.autoBind,_t=qe===void 0?false:qe;if(!this.destroyed){if(this.src=A,this.buffer=G,this.riveFile=W,!this.src&&!this.buffer&&!this.riveFile)throw new S(k.missingErrorMessage);var bt=ht(Q),Jt=ht(de);this.loaded=false,this.readyForPlaying=false,N.awaitInstance().then(function(Qt){m.destroyed||(m.runtime=Qt,m.removeRiveListeners(),m.deleteRiveRenderer(),m.renderer=m.runtime.makeRenderer(m.canvas,st),m.canvas.width||m.canvas.height||m.resizeDrawingSurfaceToCanvas(),m.initData(xe,bt,Jt,we,_t).then(function(an){if(an)return m.setupRiveListeners()}).catch(function(an){console.error(an);}));}).catch(function(Qt){console.error(Qt);});}},k.prototype.setupRiveListeners=function(f){var m=this;if(this.eventCleanup&&this.eventCleanup(),!this.shouldDisableRiveListeners){var A=(this.animator.stateMachines||[]).filter(function(de){return de.playing&&m.runtime.hasListeners(de.instance)}).map(function(de){return de.instance}),G=this.isTouchScrollEnabled,W=this.dispatchPointerExit,Q=this.enableMultiTouch;f&&"isTouchScrollEnabled"in f&&(G=f.isTouchScrollEnabled),this.eventCleanup=(0, p.registerTouchInteractions)({canvas:this.canvas,artboard:this.artboard,stateMachines:A,renderer:this.renderer,rive:this.runtime,fit:this._layout.runtimeFit(this.runtime),alignment:this._layout.runtimeAlignment(this.runtime),isTouchScrollEnabled:G,dispatchPointerExit:W,enableMultiTouch:Q,layoutScaleFactor:this._layout.layoutScaleFactor});}},k.prototype.removeRiveListeners=function(){this.eventCleanup&&(this.eventCleanup(),this.eventCleanup=null);},k.prototype.initializeAudio=function(){var f=this,m;ne.status==se.UNAVAILABLE&&!((m=this.artboard)===null||m===void 0)&&m.hasAudio&&this._audioEventListener===null&&(this._audioEventListener={type:U.AudioStatusChange,callback:function(){return f.onSystemAudioChanged()}},ne.add(this._audioEventListener),ne.establishAudio());},k.prototype.initArtboardSize=function(){this.artboard&&(this._artboardWidth=this.artboard.width=this._artboardWidth||this.artboard.width,this._artboardHeight=this.artboard.height=this._artboardHeight||this.artboard.height);},k.prototype.initData=function(f,m,A,G,W){return b(this,void 0,void 0,function(){var Q,de,xe,ge;return y(this,function(we){switch(we.label){case 0:return we.trys.push([0,3,,4]),this.riveFile!=null?[3,2]:(Q=new J({src:this.src,buffer:this.buffer,enableRiveAssetCDN:this.enableRiveAssetCDN,assetLoader:this.assetLoader}),this.riveFile=Q,[4,Q.init()]);case 1:if(we.sent(),this.destroyed)return Q.destroyIfUnused(),[2,false];we.label=2;case 2:return this.file=this.riveFile.getInstance(),this.initArtboard(f,m,A,G,W),this.initArtboardSize(),this.initializeAudio(),this.loaded=true,this.eventManager.fire({type:U.Load,data:(ge=this.src)!==null&&ge!==void 0?ge:"buffer"}),this.animator.advanceIfPaused(),this.readyForPlaying=true,this.taskQueue.process(),this.drawFrame(),[2,true];case 3:return de=we.sent(),xe=I(de),console.warn(xe),this.eventManager.fire({type:U.LoadError,data:xe}),[2,Promise.reject(xe)];case 4:return [2]}})})},k.prototype.initArtboard=function(f,m,A,G,W){if(this.file){var Q=f?this.file.artboardByName(f):this.file.defaultArtboard();if(!Q){var de="Invalid artboard name or no default artboard";console.warn(de),this.eventManager.fire({type:U.LoadError,data:de});return}this.artboard=Q,Q.volume=this._volume*ne.systemVolume,this.animator=new V(this.runtime,this.artboard,this.eventManager);var xe;if(m.length>0||A.length>0?(xe=m.concat(A),this.animator.initLinearAnimations(m,G),this.animator.initStateMachines(A,G)):xe=[this.animator.atLeastOne(G,false)],this.taskQueue.add({event:{type:G?U.Play:U.Pause,data:xe}}),W){var ge=this.file.defaultArtboardViewModel(Q);if(ge!==null){var we=ge.defaultInstance();if(we!==null){var Ze=new Be(we,null);(0, p.createFinalization)(Ze,Ze.runtimeInstance),this.bindViewModelInstance(Ze);}}}}},k.prototype.drawFrame=function(){var f,m;!((f=document?.timeline)===null||f===void 0)&&f.currentTime?this.loaded&&this.artboard&&!this.frameRequestId&&(this._boundDraw(document.timeline.currentTime),(m=this.runtime)===null||m===void 0||m.resolveAnimationFrame()):this.scheduleRendering();},k.prototype._canvasSizeChanged=function(){var f=false;return this.canvas&&(this.canvas.width!==this._currentCanvasWidth&&(this._currentCanvasWidth=this.canvas.width,f=true),this.canvas.height!==this._currentCanvasHeight&&(this._currentCanvasHeight=this.canvas.height,f=true)),f},k.prototype.draw=function(f,m){var A;this.frameRequestId=null;var G=performance.now();this.lastRenderTime||(this.lastRenderTime=f),this.renderSecondTimer+=f-this.lastRenderTime,this.renderSecondTimer>5e3&&(this.renderSecondTimer=0,m?.());var W=(f-this.lastRenderTime)/1e3;this.lastRenderTime=f;for(var Q=this.animator.animations.filter(function(ln){return ln.playing||ln.needsScrub}).sort(function(ln){return ln.needsScrub?-1:1}),de=0,xe=Q;de<xe.length;de++){var ge=xe[de];ge.advance(W),ge.instance.didLoop&&(ge.loopCount+=1),ge.apply(1);}for(var we=this.animator.stateMachines.filter(function(ln){return ln.playing}),Ze=0,st=we;Ze<st.length;Ze++){var qe=st[Ze],_t=qe.reportedEventCount();if(_t)for(var bt=0;bt<_t;bt++){var Jt=qe.reportedEventAt(bt);if(Jt)if(Jt.type===L.OpenUrl){if(this.eventManager.fire({type:U.RiveEvent,data:Jt}),this.automaticallyHandleEvents){var Qt=document.createElement("a"),an=Jt,Hn=an.url,Oe=an.target,Vn=(0, p.sanitizeUrl)(Hn);Hn&&Qt.setAttribute("href",Vn),Oe&&Qt.setAttribute("target",Oe),Vn&&Vn!==p.BLANK_URL&&Qt.click();}}else this.eventManager.fire({type:U.RiveEvent,data:Jt});}qe.advanceAndApply(W);}this.animator.stateMachines.length==0&&this.artboard.advance(W);var sn=this.renderer;this._hasZeroSize||(this.drawOptimization==R.AlwaysDraw||this.artboard.didChange()||this._needsRedraw||this._canvasSizeChanged())&&(sn.clear(),sn.save(),this.alignRenderer(),this.artboard.draw(sn),sn.restore(),sn.flush(),this._needsRedraw=false),this.animator.handleLooping(),this.animator.handleStateChanges(),this.animator.handleAdvancing(W),this.frameCount++;var Ke=performance.now();for(this.frameTimes.push(Ke),this.durations.push(Ke-G);this.frameTimes[0]<=Ke-1e3;)this.frameTimes.shift(),this.durations.shift();(A=this._viewModelInstance)===null||A===void 0||A.handleCallbacks(),this.animator.isPlaying?this.scheduleRendering():this.animator.isPaused?this.lastRenderTime=0:this.animator.isStopped&&(this.lastRenderTime=0);},k.prototype.alignRenderer=function(){var f=this,m=f.renderer,A=f.runtime,G=f._layout,W=f.artboard;m.align(G.runtimeFit(A),G.runtimeAlignment(A),{minX:G.minX,minY:G.minY,maxX:G.maxX,maxY:G.maxY},W.bounds,this._devicePixelRatioUsed*G.layoutScaleFactor);},Object.defineProperty(k.prototype,"fps",{get:function(){return this.durations.length},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"frameTime",{get:function(){return this.durations.length===0?0:(this.durations.reduce(function(f,m){return f+m},0)/this.durations.length).toFixed(4)},enumerable:false,configurable:true}),k.prototype.cleanup=function(){var f,m;this.destroyed=true,this.stopRendering(),this.cleanupInstances(),this._observed!==null&&B.remove(this._observed),this.removeRiveListeners(),this.file&&((f=this.riveFile)===null||f===void 0||f.cleanup(),this.file=null),this.riveFile=null,this.deleteRiveRenderer(),this._audioEventListener!==null&&(ne.remove(this._audioEventListener),this._audioEventListener=null),(m=this._viewModelInstance)===null||m===void 0||m.cleanup(),this._viewModelInstance=null,this._dataEnums=null;},k.prototype.deleteRiveRenderer=function(){var f;(f=this.renderer)===null||f===void 0||f.delete(),this.renderer=null;},k.prototype.cleanupInstances=function(){this.eventCleanup!==null&&this.eventCleanup(),this.stop(),this.artboard&&(this.artboard.delete(),this.artboard=null);},k.prototype.retrieveTextRun=function(f){var m;if(!f){console.warn("No text run name provided");return}if(!this.artboard){console.warn("Tried to access text run, but the Artboard is null");return}var A=this.artboard.textRun(f);if(!A){console.warn("Could not access a text run with name '".concat(f,"' in the '").concat((m=this.artboard)===null||m===void 0?void 0:m.name,"' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."));return}return A},k.prototype.getTextRunValue=function(f){var m=this.retrieveTextRun(f);return m?m.text:void 0},k.prototype.setTextRunValue=function(f,m){var A=this.retrieveTextRun(f);A&&(A.text=m);},k.prototype.play=function(f,m){var A=this;if(f=ht(f),!this.readyForPlaying){this.taskQueue.add({action:function(){return A.play(f,m)}});return}this.animator.play(f),this.eventCleanup&&this.eventCleanup(),this.setupRiveListeners(),this.startRendering();},k.prototype.pause=function(f){var m=this;if(f=ht(f),!this.readyForPlaying){this.taskQueue.add({action:function(){return m.pause(f)}});return}this.eventCleanup&&this.eventCleanup(),this.animator.pause(f);},k.prototype.scrub=function(f,m){var A=this;if(f=ht(f),!this.readyForPlaying){this.taskQueue.add({action:function(){return A.scrub(f,m)}});return}this.animator.scrub(f,m||0),this.drawFrame();},k.prototype.stop=function(f){var m=this;if(f=ht(f),!this.readyForPlaying){this.taskQueue.add({action:function(){return m.stop(f)}});return}this.animator&&this.animator.stop(f),this.eventCleanup&&this.eventCleanup();},k.prototype.reset=function(f){var m,A,G=f?.artboard,W=ht(f?.animations),Q=ht(f?.stateMachines),de=(m=f?.autoplay)!==null&&m!==void 0?m:false,xe=(A=f?.autoBind)!==null&&A!==void 0?A:false;this.cleanupInstances(),this.initArtboard(G,W,Q,de,xe),this.taskQueue.process();},k.prototype.load=function(f){this.file=null,this.stop(),this.init(f);},Object.defineProperty(k.prototype,"layout",{get:function(){return this._layout},set:function(f){this._layout=f,(!f.maxX||!f.maxY)&&this.resizeToCanvas(),this.loaded&&!this.animator.isPlaying&&this.drawFrame();},enumerable:false,configurable:true}),k.prototype.resizeToCanvas=function(){this._layout=this.layout.copyWith({minX:0,minY:0,maxX:this.canvas.width,maxY:this.canvas.height});},k.prototype.resizeDrawingSurfaceToCanvas=function(f){if(this.canvas instanceof HTMLCanvasElement&&window){var m=this.canvas.getBoundingClientRect(),A=m.width,G=m.height,W=f||window.devicePixelRatio||1;if(this.devicePixelRatioUsed=W,this.canvas.width=W*A,this.canvas.height=W*G,this._needsRedraw=true,this.resizeToCanvas(),this.drawFrame(),this.layout.fit===E.Layout){var Q=this._layout.layoutScaleFactor;this.artboard.width=A/Q,this.artboard.height=G/Q;}}},Object.defineProperty(k.prototype,"source",{get:function(){return this.src},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"activeArtboard",{get:function(){return this.artboard?this.artboard.name:""},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"animationNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var f=[],m=0;m<this.artboard.animationCount();m++)f.push(this.artboard.animationByIndex(m).name);return f},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"stateMachineNames",{get:function(){if(!this.loaded||!this.artboard)return [];for(var f=[],m=0;m<this.artboard.stateMachineCount();m++)f.push(this.artboard.stateMachineByIndex(m).name);return f},enumerable:false,configurable:true}),k.prototype.stateMachineInputs=function(f){if(this.loaded){var m=this.animator.stateMachines.find(function(A){return A.name===f});return m?.inputs}},k.prototype.retrieveInputAtPath=function(f,m){if(!f){console.warn("No input name provided for path '".concat(m,"'"));return}if(!this.artboard){console.warn("Tried to access input: '".concat(f,"', at path: '").concat(m,"', but the Artboard is null"));return}var A=this.artboard.inputByPath(f,m);if(!A){console.warn("Could not access an input with name: '".concat(f,"', at path:'").concat(m,"'"));return}return A},k.prototype.setBooleanStateAtPath=function(f,m,A){var G=this.retrieveInputAtPath(f,A);G&&(G.type===P.Boolean?G.asBool().value=m:console.warn("Input with name: '".concat(f,"', at path:'").concat(A,"' is not a boolean")));},k.prototype.setNumberStateAtPath=function(f,m,A){var G=this.retrieveInputAtPath(f,A);G&&(G.type===P.Number?G.asNumber().value=m:console.warn("Input with name: '".concat(f,"', at path:'").concat(A,"' is not a number")));},k.prototype.fireStateAtPath=function(f,m){var A=this.retrieveInputAtPath(f,m);A&&(A.type===P.Trigger?A.asTrigger().fire():console.warn("Input with name: '".concat(f,"', at path:'").concat(m,"' is not a trigger")));},k.prototype.retrieveTextAtPath=function(f,m){if(!f){console.warn("No text name provided for path '".concat(m,"'"));return}if(!m){console.warn("No path provided for text '".concat(f,"'"));return}if(!this.artboard){console.warn("Tried to access text: '".concat(f,"', at path: '").concat(m,"', but the Artboard is null"));return}var A=this.artboard.textByPath(f,m);if(!A){console.warn("Could not access text with name: '".concat(f,"', at path:'").concat(m,"'"));return}return A},k.prototype.getTextRunValueAtPath=function(f,m){var A=this.retrieveTextAtPath(f,m);if(!A){console.warn("Could not get text with name: '".concat(f,"', at path:'").concat(m,"'"));return}return A.text},k.prototype.setTextRunValueAtPath=function(f,m,A){var G=this.retrieveTextAtPath(f,A);if(!G){console.warn("Could not set text with name: '".concat(f,"', at path:'").concat(A,"'"));return}G.text=m;},Object.defineProperty(k.prototype,"playingStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(f){return f.playing}).map(function(f){return f.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"playingAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(f){return f.playing}).map(function(f){return f.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedAnimationNames",{get:function(){return this.loaded?this.animator.animations.filter(function(f){return !f.playing}).map(function(f){return f.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"pausedStateMachineNames",{get:function(){return this.loaded?this.animator.stateMachines.filter(function(f){return !f.playing}).map(function(f){return f.name}):[]},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPlaying",{get:function(){return this.animator.isPlaying},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isPaused",{get:function(){return this.animator.isPaused},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"isStopped",{get:function(){var f,m;return (m=(f=this.animator)===null||f===void 0?void 0:f.isStopped)!==null&&m!==void 0?m:true},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"bounds",{get:function(){return this.artboard?this.artboard.bounds:void 0},enumerable:false,configurable:true}),k.prototype.on=function(f,m){this.eventManager.add({type:f,callback:m});},k.prototype.off=function(f,m){this.eventManager.remove({type:f,callback:m});},k.prototype.unsubscribe=function(f,m){console.warn("This function is deprecated: please use `off()` instead."),this.off(f,m);},k.prototype.removeAllRiveEventListeners=function(f){this.eventManager.removeAll(f);},k.prototype.unsubscribeAll=function(f){console.warn("This function is deprecated: please use `removeAllRiveEventListeners()` instead."),this.removeAllRiveEventListeners(f);},k.prototype.stopRendering=function(){this.loaded&&this.frameRequestId&&(this.runtime.cancelAnimationFrame?this.runtime.cancelAnimationFrame(this.frameRequestId):cancelAnimationFrame(this.frameRequestId),this.frameRequestId=null);},k.prototype.startRendering=function(){this.drawFrame();},k.prototype.scheduleRendering=function(){this.loaded&&this.artboard&&!this.frameRequestId&&(this.runtime.requestAnimationFrame?this.frameRequestId=this.runtime.requestAnimationFrame(this._boundDraw):this.frameRequestId=requestAnimationFrame(this._boundDraw));},k.prototype.enableFPSCounter=function(f){this.runtime.enableFPSCounter(f);},k.prototype.disableFPSCounter=function(){this.runtime.disableFPSCounter();},Object.defineProperty(k.prototype,"contents",{get:function(){if(this.loaded){for(var f={artboards:[]},m=0;m<this.file.artboardCount();m++){for(var A=this.file.artboardByIndex(m),G={name:A.name,animations:[],stateMachines:[]},W=0;W<A.animationCount();W++){var Q=A.animationByIndex(W);G.animations.push(Q.name);}for(var de=0;de<A.stateMachineCount();de++){for(var xe=A.stateMachineByIndex(de),ge=xe.name,we=new this.runtime.StateMachineInstance(xe,A),Ze=[],st=0;st<we.inputCount();st++){var qe=we.input(st);Ze.push({name:qe.name,type:qe.type});}G.stateMachines.push({name:ge,inputs:Ze});}f.artboards.push(G);}return f}},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"volume",{get:function(){return this.artboard&&this.artboard.volume!==this._volume&&(this._volume=this.artboard.volume),this._volume},set:function(f){this._volume=f,this.artboard&&(this.artboard.volume=f*ne.systemVolume);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardWidth",{get:function(){var f;return this.artboard?this.artboard.width:(f=this._artboardWidth)!==null&&f!==void 0?f:0},set:function(f){this._artboardWidth=f,this.artboard&&(this.artboard.width=f);},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"artboardHeight",{get:function(){var f;return this.artboard?this.artboard.height:(f=this._artboardHeight)!==null&&f!==void 0?f:0},set:function(f){this._artboardHeight=f,this.artboard&&(this.artboard.height=f);},enumerable:false,configurable:true}),k.prototype.resetArtboardSize=function(){this.artboard?(this.artboard.resetArtboardSize(),this._artboardWidth=this.artboard.width,this._artboardHeight=this.artboard.height):(this._artboardWidth=void 0,this._artboardHeight=void 0);},Object.defineProperty(k.prototype,"devicePixelRatioUsed",{get:function(){return this._devicePixelRatioUsed},set:function(f){this._devicePixelRatioUsed=f;},enumerable:false,configurable:true}),k.prototype.bindViewModelInstance=function(f){var m;this.artboard&&!this.destroyed&&f&&f.runtimeInstance&&(f.internalIncrementReferenceCount(),(m=this._viewModelInstance)===null||m===void 0||m.cleanup(),this._viewModelInstance=f,this.animator.stateMachines.length>0?this.animator.stateMachines.forEach(function(A){return A.bindViewModelInstance(f)}):this.artboard.bindViewModelInstance(f.runtimeInstance));},Object.defineProperty(k.prototype,"viewModelInstance",{get:function(){return this._viewModelInstance},enumerable:false,configurable:true}),k.prototype.viewModelByIndex=function(f){var m=this.file.viewModelByIndex(f);return m!==null?new le(m):null},k.prototype.viewModelByName=function(f){var m;return (m=this.riveFile)===null||m===void 0?void 0:m.viewModelByName(f)},k.prototype.enums=function(){if(this._dataEnums===null){var f=this.file.enums();this._dataEnums=f.map(function(m){return new ye(m)});}return this._dataEnums},k.prototype.defaultViewModel=function(){if(this.artboard){var f=this.file.defaultArtboardViewModel(this.artboard);if(f)return new le(f)}return null},k.prototype.getArtboard=function(f){var m,A;return (A=(m=this.riveFile)===null||m===void 0?void 0:m.getArtboard(f))!==null&&A!==void 0?A:null},k.prototype.getBindableArtboard=function(f){var m,A;return (A=(m=this.riveFile)===null||m===void 0?void 0:m.getBindableArtboard(f))!==null&&A!==void 0?A:null},k.prototype.getDefaultBindableArtboard=function(){var f,m;return (m=(f=this.riveFile)===null||f===void 0?void 0:f.getDefaultBindableArtboard())!==null&&m!==void 0?m:null},k.missingErrorMessage="Rive source file or data buffer required",k.cleanupErrorMessage="Attempt to use file after calling cleanup.",k})(),le=(function(){function k(f){this._viewModel=f;}return Object.defineProperty(k.prototype,"instanceCount",{get:function(){return this._viewModel.instanceCount},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModel.name},enumerable:false,configurable:true}),k.prototype.instanceByIndex=function(f){var m=this._viewModel.instanceByIndex(f);if(m!==null){var A=new Be(m,null);return (0, p.createFinalization)(A,m),A}return null},k.prototype.instanceByName=function(f){var m=this._viewModel.instanceByName(f);if(m!==null){var A=new Be(m,null);return (0, p.createFinalization)(A,m),A}return null},k.prototype.defaultInstance=function(){var f=this._viewModel.defaultInstance();if(f!==null){var m=new Be(f,null);return (0, p.createFinalization)(m,f),m}return null},k.prototype.instance=function(){var f=this._viewModel.instance();if(f!==null){var m=new Be(f,null);return (0, p.createFinalization)(m,f),m}return null},Object.defineProperty(k.prototype,"properties",{get:function(){return this._viewModel.getProperties()},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"instanceNames",{get:function(){return this._viewModel.getInstanceNames()},enumerable:false,configurable:true}),k})(),ye=(function(){function k(f){this._dataEnum=f;}return Object.defineProperty(k.prototype,"name",{get:function(){return this._dataEnum.name},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"values",{get:function(){return this._dataEnum.values},enumerable:false,configurable:true}),k})(),Ie;(function(k){k.Number="number",k.String="string",k.Boolean="boolean",k.Color="color",k.Trigger="trigger",k.Enum="enum",k.List="list",k.Image="image",k.Artboard="artboard";})(Ie||(Ie={}));var Be=(function(){function k(f,m){this._parents=[],this._children=[],this._viewModelInstances=new Map,this._propertiesWithCallbacks=[],this._referenceCount=0,this.selfUnref=false,this._runtimeInstance=f,m!==null&&this._parents.push(m);}return Object.defineProperty(k.prototype,"runtimeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),Object.defineProperty(k.prototype,"nativeInstance",{get:function(){return this._runtimeInstance},enumerable:false,configurable:true}),k.prototype.handleCallbacks=function(){this._propertiesWithCallbacks.length!==0&&(this._propertiesWithCallbacks.forEach(function(f){f.handleCallbacks();}),this._propertiesWithCallbacks.forEach(function(f){f.clearChanges();})),this._children.forEach(function(f){return f.handleCallbacks()});},k.prototype.addParent=function(f){this._parents.includes(f)||(this._parents.push(f),(this._propertiesWithCallbacks.length>0||this._children.length>0)&&f.addToViewModelCallbacks(this));},k.prototype.removeParent=function(f){var m=this._parents.indexOf(f);if(m!==-1){var A=this._parents[m];A.removeFromViewModelCallbacks(this),this._parents.splice(m,1);}},k.prototype.addToPropertyCallbacks=function(f){var m=this;this._propertiesWithCallbacks.includes(f)||(this._propertiesWithCallbacks.push(f),this._propertiesWithCallbacks.length>0&&this._parents.forEach(function(A){A.addToViewModelCallbacks(m);}));},k.prototype.removeFromPropertyCallbacks=function(f){var m=this;this._propertiesWithCallbacks.includes(f)&&(this._propertiesWithCallbacks=this._propertiesWithCallbacks.filter(function(A){return A!==f}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(A){A.removeFromViewModelCallbacks(m);}));},k.prototype.addToViewModelCallbacks=function(f){var m=this;this._children.includes(f)||(this._children.push(f),this._parents.forEach(function(A){A.addToViewModelCallbacks(m);}));},k.prototype.removeFromViewModelCallbacks=function(f){var m=this;this._children.includes(f)&&(this._children=this._children.filter(function(A){return A!==f}),this._children.length===0&&this._propertiesWithCallbacks.length===0&&this._parents.forEach(function(A){A.removeFromViewModelCallbacks(m);}));},k.prototype.clearCallbacks=function(){this._propertiesWithCallbacks.forEach(function(f){f.clearCallbacks();});},k.prototype.propertyFromPath=function(f,m){var A=f.split("/");return this.propertyFromPathSegments(A,0,m)},k.prototype.viewModelFromPathSegments=function(f,m){var A=this.internalViewModelInstance(f[m]);return A!==null?m==f.length-1?A:A.viewModelFromPathSegments(f,m++):null},k.prototype.propertyFromPathSegments=function(f,m,A){var G,W,Q,de,xe,ge,we,Ze,st,qe,_t,bt,Jt,Qt,an,Hn,Oe,Vn;if(m<f.length-1){var sn=this.internalViewModelInstance(f[m]);return sn!==null?sn.propertyFromPathSegments(f,m+1,A):null}var Ke=null;switch(A){case Ie.Number:if(Ke=(W=(G=this._runtimeInstance)===null||G===void 0?void 0:G.number(f[m]))!==null&&W!==void 0?W:null,Ke!==null)return new ut(Ke,this);break;case Ie.String:if(Ke=(de=(Q=this._runtimeInstance)===null||Q===void 0?void 0:Q.string(f[m]))!==null&&de!==void 0?de:null,Ke!==null)return new zt(Ke,this);break;case Ie.Boolean:if(Ke=(ge=(xe=this._runtimeInstance)===null||xe===void 0?void 0:xe.boolean(f[m]))!==null&&ge!==void 0?ge:null,Ke!==null)return new Et(Ke,this);break;case Ie.Color:if(Ke=(Ze=(we=this._runtimeInstance)===null||we===void 0?void 0:we.color(f[m]))!==null&&Ze!==void 0?Ze:null,Ke!==null)return new rt(Ke,this);break;case Ie.Trigger:if(Ke=(qe=(st=this._runtimeInstance)===null||st===void 0?void 0:st.trigger(f[m]))!==null&&qe!==void 0?qe:null,Ke!==null)return new Vt(Ke,this);break;case Ie.Enum:if(Ke=(bt=(_t=this._runtimeInstance)===null||_t===void 0?void 0:_t.enum(f[m]))!==null&&bt!==void 0?bt:null,Ke!==null)return new Mt(Ke,this);break;case Ie.List:if(Ke=(Qt=(Jt=this._runtimeInstance)===null||Jt===void 0?void 0:Jt.list(f[m]))!==null&&Qt!==void 0?Qt:null,Ke!==null)return new qt(Ke,this);break;case Ie.Image:if(Ke=(Hn=(an=this._runtimeInstance)===null||an===void 0?void 0:an.image(f[m]))!==null&&Hn!==void 0?Hn:null,Ke!==null)return new De(Ke,this);break;case Ie.Artboard:if(Ke=(Vn=(Oe=this._runtimeInstance)===null||Oe===void 0?void 0:Oe.artboard(f[m]))!==null&&Vn!==void 0?Vn:null,Ke!==null)return new bn(Ke,this);break}return null},k.prototype.internalViewModelInstance=function(f){var m;if(this._viewModelInstances.has(f))return this._viewModelInstances.get(f);var A=(m=this._runtimeInstance)===null||m===void 0?void 0:m.viewModel(f);if(A!==null){var G=new k(A,this);return (0, p.createFinalization)(G,A),G.internalIncrementReferenceCount(),this._viewModelInstances.set(f,G),G}return null},k.prototype.number=function(f){var m=this.propertyFromPath(f,Ie.Number);return m},k.prototype.string=function(f){var m=this.propertyFromPath(f,Ie.String);return m},k.prototype.boolean=function(f){var m=this.propertyFromPath(f,Ie.Boolean);return m},k.prototype.color=function(f){var m=this.propertyFromPath(f,Ie.Color);return m},k.prototype.trigger=function(f){var m=this.propertyFromPath(f,Ie.Trigger);return m},k.prototype.enum=function(f){var m=this.propertyFromPath(f,Ie.Enum);return m},k.prototype.list=function(f){var m=this.propertyFromPath(f,Ie.List);return m},k.prototype.image=function(f){var m=this.propertyFromPath(f,Ie.Image);return m},k.prototype.artboard=function(f){var m=this.propertyFromPath(f,Ie.Artboard);return m},k.prototype.viewModel=function(f){var m=f.split("/"),A=m.length>1?this.viewModelFromPathSegments(m.slice(0,m.length-1),0):this;return A!=null?A.internalViewModelInstance(m[m.length-1]):null},k.prototype.internalReplaceViewModel=function(f,m){var A;if(m.runtimeInstance!==null){var G=((A=this._runtimeInstance)===null||A===void 0?void 0:A.replaceViewModel(f,m.runtimeInstance))||false;if(G){m.internalIncrementReferenceCount();var W=this.internalViewModelInstance(f);W!==null&&(W.removeParent(this),this._children.includes(W)&&(this._children=this._children.filter(function(Q){return Q!==W})),W.cleanup()),this._viewModelInstances.set(f,m),m.addParent(this);}return G}return  false},k.prototype.replaceViewModel=function(f,m){var A,G=f.split("/"),W=G.length>1?this.viewModelFromPathSegments(G.slice(0,G.length-1),0):this;return (A=W?.internalReplaceViewModel(G[G.length-1],m))!==null&&A!==void 0?A:false},k.prototype.incrementReferenceCount=function(){var f;this._referenceCount++,(f=this._runtimeInstance)===null||f===void 0||f.incrementReferenceCount();},k.prototype.decrementReferenceCount=function(){var f;this._referenceCount--,(f=this._runtimeInstance)===null||f===void 0||f.decrementReferenceCount();},Object.defineProperty(k.prototype,"properties",{get:function(){var f;return ((f=this._runtimeInstance)===null||f===void 0?void 0:f.getProperties().map(function(m){return h({},m)}))||[]},enumerable:false,configurable:true}),k.prototype.internalIncrementReferenceCount=function(){this._referenceCount++;},k.prototype.cleanup=function(){var f=this,m;if(this._referenceCount--,this._referenceCount<=0){this.selfUnref&&((m=this._runtimeInstance)===null||m===void 0||m.unref()),this._runtimeInstance=null,this.clearCallbacks(),this._propertiesWithCallbacks=[],this._viewModelInstances.forEach(function(W){W.cleanup();}),this._viewModelInstances.clear();var A=g([],this._children);this._children.length=0;var G=g([],this._parents);this._parents.length=0,A.forEach(function(W){W.removeParent(f);}),G.forEach(function(W){W.removeFromViewModelCallbacks(f);});}},k})(),xt=(function(){function k(f,m){this.callbacks=[],this._viewModelInstanceValue=f,this._parentViewModel=m;}return k.prototype.on=function(f){this.callbacks.length===0&&this._viewModelInstanceValue.clearChanges(),this.callbacks.includes(f)||(this.callbacks.push(f),this._parentViewModel.addToPropertyCallbacks(this));},k.prototype.off=function(f){f?this.callbacks=this.callbacks.filter(function(m){return m!==f}):this.callbacks.length=0,this.callbacks.length===0&&this._parentViewModel.removeFromPropertyCallbacks(this);},k.prototype.internalHandleCallback=function(f){},k.prototype.handleCallbacks=function(){var f=this;this._viewModelInstanceValue.hasChanged&&this.callbacks.forEach(function(m){f.internalHandleCallback(m);});},k.prototype.clearChanges=function(){this._viewModelInstanceValue.clearChanges();},k.prototype.clearCallbacks=function(){this.callbacks.length=0;},Object.defineProperty(k.prototype,"name",{get:function(){return this._viewModelInstanceValue.name},enumerable:false,configurable:true}),k})(),zt=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),f.prototype.internalHandleCallback=function(m){m(this.value);},f})(xt),ut=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),f.prototype.internalHandleCallback=function(m){m(this.value);},f})(xt),Et=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),f.prototype.internalHandleCallback=function(m){m(this.value);},f})(xt),Vt=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return f.prototype.trigger=function(){return this._viewModelInstanceValue.trigger()},f.prototype.internalHandleCallback=function(m){m();},f})(xt),Mt=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),Object.defineProperty(f.prototype,"valueIndex",{get:function(){return this._viewModelInstanceValue.valueIndex},set:function(m){this._viewModelInstanceValue.valueIndex=m;},enumerable:false,configurable:true}),Object.defineProperty(f.prototype,"values",{get:function(){return this._viewModelInstanceValue.values},enumerable:false,configurable:true}),f.prototype.internalHandleCallback=function(m){m(this.value);},f})(xt),qt=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"length",{get:function(){return this._viewModelInstanceValue.size},enumerable:false,configurable:true}),f.prototype.addInstance=function(m){m.runtimeInstance!=null&&(this._viewModelInstanceValue.addInstance(m.runtimeInstance),m.addParent(this._parentViewModel));},f.prototype.addInstanceAt=function(m,A){return m.runtimeInstance!=null&&this._viewModelInstanceValue.addInstanceAt(m.runtimeInstance,A)?(m.addParent(this._parentViewModel),true):false},f.prototype.removeInstance=function(m){m.runtimeInstance!=null&&(this._viewModelInstanceValue.removeInstance(m.runtimeInstance),m.removeParent(this._parentViewModel));},f.prototype.removeInstanceAt=function(m){this._viewModelInstanceValue.removeInstanceAt(m);},f.prototype.instanceAt=function(m){var A=this._viewModelInstanceValue.instanceAt(m);if(A!=null){var G=new Be(A,this._parentViewModel);return (0, p.createFinalization)(G,A),G}return null},f.prototype.swap=function(m,A){this._viewModelInstanceValue.swap(m,A);},f.prototype.internalHandleCallback=function(m){m();},f})(xt),rt=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"value",{get:function(){return this._viewModelInstanceValue.value},set:function(m){this._viewModelInstanceValue.value=m;},enumerable:false,configurable:true}),f.prototype.rgb=function(m,A,G){this._viewModelInstanceValue.rgb(m,A,G);},f.prototype.rgba=function(m,A,G,W){this._viewModelInstanceValue.argb(W,m,A,G);},f.prototype.argb=function(m,A,G,W){this._viewModelInstanceValue.argb(m,A,G,W);},f.prototype.alpha=function(m){this._viewModelInstanceValue.alpha(m);},f.prototype.opacity=function(m){this._viewModelInstanceValue.alpha(Math.round(Math.max(0,Math.min(1,m))*255));},f.prototype.internalHandleCallback=function(m){m(this.value);},f})(xt),De=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"value",{set:function(m){var A;this._viewModelInstanceValue.value((A=m?.nativeImage)!==null&&A!==void 0?A:null);},enumerable:false,configurable:true}),f.prototype.internalHandleCallback=function(m){m();},f})(xt),bn=(function(k){c(f,k);function f(m,A){return k.call(this,m,A)||this}return Object.defineProperty(f.prototype,"value",{set:function(m){var A,G,W;m.isBindableArtboard?W=m:W=m.file.internalBindableArtboardFromArtboard(m.nativeArtboard),this._viewModelInstanceValue.value((A=W?.nativeArtboard)!==null&&A!==void 0?A:null),W?.nativeViewModel&&this._viewModelInstanceValue.viewModelInstance((G=W?.nativeViewModel)!==null&&G!==void 0?G:null);},enumerable:false,configurable:true}),f.prototype.internalHandleCallback=function(m){m();},f})(xt),vn=function(k){return b(void 0,void 0,void 0,function(){var f,m,A;return y(this,function(G){switch(G.label){case 0:return f=new Request(k),[4,fetch(f)];case 1:return m=G.sent(),[4,m.arrayBuffer()];case 2:return A=G.sent(),[2,A]}})})},ht=function(k){return typeof k=="string"?[k]:k instanceof Array?k:[]},kt={EventManager:K,TaskQueueManager:ie},Kt=function(k){return b(void 0,void 0,void 0,function(){var f,m,A;return y(this,function(G){switch(G.label){case 0:return f=new Promise(function(W){return N.getInstance(function(Q){Q.decodeAudio(k,W);})}),[4,f];case 1:return m=G.sent(),A=new p.AudioWrapper(m),p.finalizationRegistry.register(A,m),[2,A]}})})},In=function(k){return b(void 0,void 0,void 0,function(){var f,m,A;return y(this,function(G){switch(G.label){case 0:return f=new Promise(function(W){return N.getInstance(function(Q){Q.decodeImage(k,W);})}),[4,f];case 1:return m=G.sent(),A=new p.ImageWrapper(m),p.finalizationRegistry.register(A,m),[2,A]}})})},on=function(k){return b(void 0,void 0,void 0,function(){var f,m,A;return y(this,function(G){switch(G.label){case 0:return f=new Promise(function(W){return N.getInstance(function(Q){Q.decodeFont(k,W);})}),[4,f];case 1:return m=G.sent(),A=new p.FontWrapper(m),p.finalizationRegistry.register(A,m),[2,A]}})})};})(),i})());})(Rs)),Rs.exports}var ep=e1();async function tp(e){const t=HS(e);if(t)return console.log(`[MGRiveLoader] Using cached RiveFile: ${e}`),t;console.log(`[MGRiveLoader] Loading RiveFile from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to load RiveFile: ${e} (${n.status})`);const r=await n.arrayBuffer(),o={};let i=null;if(await new Promise((s,d)=>{i=new ep.RiveFile({buffer:r,assetLoader:p=>p.isImage&&WS.includes(p.name)?(o[p.name]=p,console.log(`[MGRiveLoader] Captured image asset: ${p.name}`),true):false,onLoad:()=>{console.log(`[MGRiveLoader] RiveFile loaded: ${e}`),s();},onLoadError:p=>{console.error("[MGRiveLoader] RiveFile load error:",p),d(p);}}),i.init().catch(p=>{console.error("[MGRiveLoader] Failed to initialize RiveFile:",p),d(p);});}),!i)throw new Error(`[MGRiveLoader] Failed to create RiveFile for ${e}`);i.getInstance();const a={riveFile:i,imageAssets:o,url:e,loadedAt:Date.now()};return VS(e,a),a}const Kg=[{id:"Top_DefaultGray.png",filename:"Top_DefaultGray.png",type:"Top",availability:"default",displayName:"Default",price:0,url:""},{id:"Mid_DefaultGray.png",filename:"Mid_DefaultGray.png",type:"Mid",availability:"default",displayName:"Default",price:0,url:""},{id:"Bottom_DefaultGray.png",filename:"Bottom_DefaultGray.png",type:"Bottom",availability:"default",displayName:"Default",price:0,url:""},{id:"Expression_Default.png",filename:"Expression_Default.png",type:"Expression",availability:"default",displayName:"Default",price:0,url:""},{id:"Top_Blank.png",filename:"Top_Blank.png",type:"Top",availability:"default",displayName:"None",price:0,url:""},{id:"Mid_Blank.png",filename:"Mid_Blank.png",type:"Mid",availability:"default",displayName:"None",price:0,url:""},{id:"Bottom_Blank.png",filename:"Bottom_Blank.png",type:"Bottom",availability:"default",displayName:"None",price:0,url:""},{id:"Expression_Blank.png",filename:"Expression_Blank.png",type:"Expression",availability:"default",displayName:"None",price:0,url:""}],t1=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),n1=function(e){return "/"+e},ih={},Sn=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let d=function(p){return Promise.all(p.map(c=>Promise.resolve(c).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");o=d(n.map(p=>{if(p=n1(p),p in ih)return;ih[p]=true;const c=p.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${h}`))return;const b=document.createElement("link");if(b.rel=c?"stylesheet":t1,c||(b.as="script"),b.crossOrigin="",b.href=p,s&&b.setAttribute("nonce",s),document.head.appendChild(b),c)return new Promise((y,g)=>{b.addEventListener("load",y),b.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${p}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},ss={BOTTOM:0,MID:1,TOP:2,EXPRESSION:3},Gd=["Bottom_DefaultGray.png","Mid_DefaultGray.png","Top_DefaultGray.png","Expression_Default.png"];async function Yg(){try{const{Store:e}=await Sn(async()=>{const{Store:o}=await Promise.resolve().then(()=>wa);return {Store:o}},void 0),t=await e.select("myDataAtom");if(!t||typeof t!="object")throw new Error("myDataAtom not available");const n=t.cosmetic,r=t.name;return {avatar:n?.avatar||[...Gd],color:n?.color||"Red",name:r||"Player"}}catch(e){return console.error("[Avatar] Failed to get current avatar state:",e),{avatar:[...Gd],color:"Red",name:"Player"}}}function Xg(e,t){const n=t?[...t]:[...Gd];return e.bottom&&(n[ss.BOTTOM]=e.bottom),e.mid&&(n[ss.MID]=e.mid),e.top&&(n[ss.TOP]=e.top),e.expression&&(n[ss.EXPRESSION]=e.expression),n}const Jg="Expression_Stressed.png";function r1(){try{return Array.from(fe.document.querySelectorAll("script")).find(r=>r.src.includes("/version/"))?.src.match(/\/version\/([^/]+)\//)?.[1]||"669ccaa"}catch(e){return console.error("[Avatar API] Failed to get version hash:",e),"669ccaa"}}function o1(){return fe.location.pathname.split("/").pop()||"UNKNOWN"}async function i1(){try{const e=r1(),t=o1(),n=`https://magicgarden.gg/version/${e}/api/rooms/${t}/me/cosmetics`,r=await fetch(n,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.json()}catch(e){return console.error("[Avatar API] Failed to fetch owned cosmetics:",e),[]}}function jc(){return  false}const dr={ownedFilenames:new Set,loaded:false,error:null},a1=[];function Gc(){a1.forEach(e=>e());}async function Qg(){try{await Bu();const{Store:e}=await Sn(async()=>{const{Store:r}=await Promise.resolve().then(()=>wa);return {Store:r}},void 0);if(!await e.select("isUserAuthenticatedAtom")){dr.loaded=!0,Gc();return}const n=await i1();dr.ownedFilenames=new Set(n.map(r=>r.cosmeticFilename)),dr.loaded=!0,dr.error=null,Gc();}catch(e){dr.error=e,dr.loaded=true,Gc();}}function s1(e){return dr.ownedFilenames.has(e)}function l1(){return dr.loaded}const Ud=[];let ah=false,sh=false;function c1(){sh||(sh=true,f1().then(()=>{}).catch(()=>{}));}c1();let lh=false;async function d1(){lh||(await Qg(),lh=true);}function lo(){try{const t=Array.from(fe.document.querySelectorAll("script")).find(n=>n.src.includes("/version/"));if(t){const n=t.src.match(/(https:\/\/.+?\/version\/[^/]+)/);if(n)return `${n[1]}/assets/cosmetic/`}return console.warn("[Avatar] Could not find versioned asset path, using fallback"),`${fe.location.origin}/assets/cosmetic/`}catch(e){return console.error("[Avatar] Failed to get asset base URL:",e),"https://magicgarden.gg/assets/cosmetic/"}}function u1(e,t){if(!t)return e;let n=e;if(t.type){const r=Array.isArray(t.type)?t.type:[t.type];n=n.filter(o=>r.includes(o.type));}if(t.availability){const r=Array.isArray(t.availability)?t.availability:[t.availability];n=n.filter(o=>r.includes(o.availability));}if(t.search){const r=t.search.toLowerCase();n=n.filter(o=>o.displayName.toLowerCase().includes(r));}return n}function p1(e,t){return t?.includeUnowned?e:e.filter(n=>n.availability==="default"?true:s1(n.filename))}async function f1(){if(!ah)try{const e=lo(),t=e.replace(/\/cosmetic\/$/,"/manifest.json"),n=await fetch(t);if(!n.ok)return;const i=((await n.json())?.bundles||[]).find(s=>s.name==="cosmetic"||s.name==="cosmetics");if(!i)return;const a=new Set(Kg.map(s=>s.filename));for(const s of i.assets||[])for(const d of s.src||[]){if(typeof d!="string")continue;const p=/^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(d);if(!p)continue;const c=p[1],h=p[2],b=`${h}.png`;if(a.has(b))continue;const y=h.split("_");if(y.length<2)continue;const g=y[0],S=y.slice(1).join(" ").replace(/([a-z])([A-Z])/g,"$1 $2");Ud.push({id:b,filename:b,type:g,displayName:S,availability:"purchasable",price:0,url:`${e.replace(/\/cosmetic\/$/,`/${c}/`)}${b}`}),a.add(b);}ah=!0,console.log(`[Avatar] Discovered ${Ud.length} new items from manifest`);}catch(e){console.error("[Avatar] Discovery failed:",e);}}function Aa(e){const t=lo(),n=Ud.map(p=>({...p,url:p.url||`${t}${p.filename}`})),r=Kg.map(p=>({...p,url:`${t}${p.filename}`})),o=new Set,i=[];for(const p of n)o.has(p.filename)||(i.push(p),o.add(p.filename));for(const p of r)o.has(p.filename)||(i.push(p),o.add(p.filename));const s=[...[],...i];let d=u1(s,e);return d=p1(d,e),d}async function Zg(e){return await d1(),Aa(e)}function h1(e){return Aa(e).map(t=>t.url)}async function jl(){const{avatar:e,color:t}=await Yg();return {top:e[2],mid:e[1],bottom:e[0],expression:e[3],color:t,array:e}}async function m1(){const e=await Yg(),t=await jl(),n=Aa(),r={};return n.forEach(o=>{r[o.type]=(r[o.type]||0)+1;}),{current:{avatar:e.avatar,color:e.color,parsed:{top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression}},counts:r,allItems:n,assetBaseUrl:lo()}}const g1="_Blank.png";let ls=null;function b1(){if(ls)return Promise.resolve(ls);const e=document.createElement("canvas");return e.width=1,e.height=1,new Promise((t,n)=>{e.toBlob(r=>{if(!r){n(new Error("[MGRiveLoader] Failed to create transparent PNG"));return}r.arrayBuffer().then(o=>{ls=new Uint8Array(o),t(ls);},n);},"image/png");})}async function Uc(e,t,n){let r;if(t.includes(g1))r=await b1();else {const i=await fetch(`${n}${t}`).then(a=>a.arrayBuffer());r=new Uint8Array(i);}const o=await ep.decodeImage(r);e.setRenderImage(o),o.unref();}async function eb(e,t){const{imageAssets:n}=e,r=lo(),o=[];t.top&&n.Top&&o.push(Uc(n.Top,t.top,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Top:",i))),t.mid&&n.Mid&&o.push(Uc(n.Mid,t.mid,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Mid:",i))),t.bottom&&n.Bottom&&o.push(Uc(n.Bottom,t.bottom,r).catch(i=>console.warn("[MGRiveLoader] Failed to load Bottom:",i))),await Promise.all(o);}async function v1(e){const{canvas:t,outfit:n,riveUrl:r,stateMachine:o="State Machine 1",autoplay:i=true}=e;let a=r;if(!a){const c=await Hg();if(!c)throw new Error("[MGRiveLoader] Could not find avatar .riv file");a=c.url;}console.log(`[MGRiveLoader] Creating Rive instance from: ${a}`);const s=await tp(a),d=new ep.Rive({riveFile:s.riveFile,canvas:t,autoplay:i,stateMachines:o});if(console.log("[MGRiveLoader] Rive instance created"),await eb(s,n),n.expression&&n.expression!=="Expression_Blank.png"){const h=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(n.expression);if(h!==-1&&d.stateMachineInputs("State Machine 1")){const b=d.stateMachineInputs("State Machine 1").find(y=>y.name==="expression");b&&(b.value=h,console.log(`[MGRiveLoader] Set expression: ${n.expression} (index ${h})`),d.drawFrame());}}return console.log("[MGRiveLoader] Outfit applied"),{rive:d,cacheEntry:s,outfit:{...n},play(){d.play();},pause(){d.pause();},triggerAnimation(c){const h=d.stateMachineInputs(o);if(!h)return  false;const b=h.find(y=>y.name===c);return b?(typeof b.fire=="function"?b.fire():b.value=true,true):false},randomAnimation(){const c=d.stateMachineInputs(o);if(!c||c.length===0)return  false;const h=c.filter(y=>typeof y.fire=="function");return h.length===0?false:(h[Math.floor(Math.random()*h.length)].fire(),true)},destroy(){d.cleanup();}}}async function y1(e,t){if(console.log("[MGRiveLoader] Updating outfit"),await eb(e.cacheEntry,t),t.expression&&t.expression!=="Expression_Blank.png"){const r=["Expression_Default.png","Expression_Alarmed.png","Expression_Annoyed.png","Expression_Bashful.png","Expression_Calm3.png","Expression_Crying.png","Expression_Cute.png","Expression_Derpy.png","Expression_Happy.png","Expression_Mad.png","Expression_Pouty.png","Expression_Shocked.png","Expression_Thinking.png","Expression_Tired.png","Expression_Loopy.png","Expression_SoHappy.png","Expression_Vampire.png","Expression_Stressed.png"].indexOf(t.expression);if(r!==-1&&e.rive.stateMachineInputs("State Machine 1")){const o=e.rive.stateMachineInputs("State Machine 1").find(i=>i.name==="expression");o&&(o.value=r,console.log(`[MGRiveLoader] Set expression: ${t.expression} (index ${r})`),e.rive.drawFrame());}}e.outfit={...t},console.log("[MGRiveLoader] Outfit updated");}let ch=false;async function x1(){if(!ch){ch=true;try{await JS(),eh(!0),console.log("[MGRiveLoader] Initialized");}catch(e){throw console.error("[MGRiveLoader] Initialization failed:",e),eh(false),e}}}function w1(){return KS()}function C1(){return zl()}async function k1(e){return await tp(e)}async function S1(){const e=await Hg();return e?await tp(e.url):null}async function A1(e){return await v1(e)}async function E1(e,t){return await y1(e,t)}const Uo={init:x1,isReady:w1,list:C1,getRiveFile:k1,getAvatarRiveFile:S1,createInstance:A1,updateOutfit:E1};function _1(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const Me=_1();function tb(){return Me.ready}const dh=fe??window;async function nb(){const e=Me.ctx;if(e)return e;const t=dh.AudioContext||dh.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return Me.ctx=n,n}async function rb(){if(Me.ctx&&Me.ctx.state==="suspended")try{await Me.ctx.resume();}catch{}}const I1={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},T1={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Ui=.001,Wi=.2;function uh(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function aa(e){const t=I1[e],n=T1[e];if(!t)return {atom:Wi,vol100:cs(Wi)};const r=uh(t,NaN);if(Number.isFinite(r)){const i=$n(r,0,1);return {atom:i,vol100:cs(i)}}if(n){const i=uh(n,NaN);if(Number.isFinite(i)){const a=$n(i,0,1);return {atom:a,vol100:cs(a)}}}const o=Wi;return {atom:o,vol100:cs(o)}}function P1(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=($n(t,1,100)-1)/99;return Ui+r*(Wi-Ui)}function cs(e){const t=$n(Number(e),0,1);if(t<=Ui)return 0;const n=(t-Ui)/(Wi-Ui);return Math.round(1+n*99)}function ob(e,t){if(t==null)return aa(e).atom;const n=P1(t);return n===null?aa(e).atom:hw(n)}function L1(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);Me.sfx.groups=t;}function M1(e){const t=Me.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=Me.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function R1(){if(Me.sfx.buffer)return Me.sfx.buffer;if(!Me.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await nb();await rb();const n=await(await Sw(Me.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return Me.sfx.buffer=r,r}async function F1(e,t={}){if(!Me.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=M1(n),o=Me.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await nb();await rb();const a=await R1(),s=Math.max(0,+o.start||0),d=Math.max(s,+o.end||s),p=Math.max(.01,d-s),c=ob("sfx",t.volume),h=i.createGain();h.gain.value=c,h.connect(i.destination);const b=i.createBufferSource();return b.buffer=a,b.connect(h),b.start(0,s,p),{name:r,source:b,start:s,end:d,duration:p,volume:c}}const Wo={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},O1={sounds:[],itemCustomSounds:[],version:1},On={shop:{soundId:"default-notification",volume:80,mode:"one-shot"},pet:{soundId:"default-notification",volume:80,mode:"one-shot"},weather:{soundId:"default-notification",volume:80,mode:"one-shot"}};class np extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class N1 extends np{constructor(){super(`Maximum number of sounds reached (${Wo.MAX_SOUNDS})`),this.name="SoundLimitError";}}class D1 extends np{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${Wo.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class $1 extends np{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function B1(e){const t={sounds:e.sounds??[],itemCustomSounds:e.itemCustomSounds??[],version:e.version??1};return e.itemCustomSounds||rp(t),t}function Gl(){const e=Qe(Bt.MODULE.AUDIO_CUSTOM_SOUNDS,O1);return B1(e)}function rp(e){tt(Bt.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function ph(){return Gl().sounds}function Ul(e){const t=Gl();t.sounds=e,rp(t);}function Wl(){return Gl().itemCustomSounds}function ib(e){const t=Gl();t.itemCustomSounds=e,rp(t);}function z1(e){const t={shop:{soundId:e.shop?.soundId??On.shop.soundId,volume:e.shop?.volume??On.shop.volume,mode:e.shop?.mode??On.shop.mode},pet:{soundId:e.pet?.soundId??On.pet.soundId,volume:e.pet?.volume??On.pet.volume,mode:e.pet?.mode??On.pet.mode},weather:{soundId:e.weather?.soundId??On.weather.soundId,volume:e.weather?.volume??On.weather.volume,mode:e.weather?.mode??On.weather.mode}};return t!==e&&ip(t),t}function op(){const e=Qe(Bt.MODULE.AUDIO_NOTIFICATION_SETTINGS,On);return z1(e)}function ip(e){tt(Bt.MODULE.AUDIO_NOTIFICATION_SETTINGS,e);}const j1="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",ab=[{id:"default-notification",name:"Default",source:j1,type:"upload",createdAt:0}];function G1(e){const t=new Set(e.map(r=>r.id)),n=ab.filter(r=>!t.has(r.id));return n.length===0?e:[...e,...n]}function sb(e){return ab.some(t=>t.id===e)}function U1(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const o=e.slice(n+1).length*3/4;return Math.round(o)}function lb(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=U1(e);if(t>0&&t>Wo.MAX_SIZE_BYTES)throw new D1(t)}function cb(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function W1(e){if(e>=Wo.MAX_SOUNDS)throw new N1}let mn=[],Wd=false;function Wn(){Wd||db();}function H1(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function db(){if(Wd)return;let e=ph();e=G1(e),e.length!==ph().length&&Ul(e),mn=e,Wd=true,console.log(`[CustomSounds] Initialized with ${mn.length} sounds`);}function V1(){return Wn(),[...mn]}function ub(e){return Wn(),mn.find(t=>t.id===e)}function q1(e,t,n){Wn(),cb(e),lb(t),W1(mn.length);const r={id:H1(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return mn.push(r),Ul(mn),console.log(`[CustomSounds] Added sound: ${r.name} (${r.id})`),r}function K1(e){if(Wn(),sb(e))throw new Error("Cannot remove default sounds");const t=mn.findIndex(r=>r.id===e);if(t===-1)return  false;const n=mn.splice(t,1)[0];return Ul(mn),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function Y1(e,t){if(Wn(),sb(e))throw new Error("Cannot update default sounds");const n=mn.find(r=>r.id===e);return n?(t.name!==void 0&&(cb(t.name),n.name=t.name.trim()),t.source!==void 0&&(lb(t.source),n.source=t.source.trim()),Ul(mn),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function X1(e,t={}){Wn();const n=ub(e);if(!n)throw new $1(e);const{MGAudio:r}=await Sn(async()=>{const{MGAudio:o}=await Promise.resolve().then(()=>mb);return {MGAudio:o}},void 0);try{await r.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(o){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,o),o}}function J1(){Sn(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>mb);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}function Q1(){return op()}function Z1(e){return op()[e]}function eA(e,t){const n=op();n[e]=t,ip(n),console.log(`[CustomSounds] Updated notification config for ${e}:`,t);}function tA(e){ip(e),console.log("[CustomSounds] Updated all notification settings");}function Ho(e,t,n){return e==="shop"&&n?`${e}:${n}:${t}`:`${e}:${t}`}function pb(e,t,n){Wn();const r=Wl(),o=Ho(e,t,n);return r.find(i=>Ho(i.entityType,i.entityId,i.shopType)===o)??null}function nA(e,t,n,r){Wn();const o=Wl(),i=Ho(e,t,r),a=o.findIndex(d=>Ho(d.entityType,d.entityId,d.shopType)===i),s={entityType:e,entityId:t,shopType:r,soundId:n.soundId,volume:n.volume,mode:n.mode};a!==-1?o[a]=s:o.push(s),ib(o),console.log(`[CustomSounds] Set custom sound for ${e}:${t}`,n),window.dispatchEvent(new CustomEvent(mt.CUSTOM_SOUND_CHANGE,{detail:{action:"set",entityType:e,entityId:t,shopType:r,config:n}}));}function rA(e,t,n){Wn();const r=Wl(),o=Ho(e,t,n),i=r.findIndex(a=>Ho(a.entityType,a.entityId,a.shopType)===o);return i===-1?false:(r.splice(i,1),ib(r),console.log(`[CustomSounds] Removed custom sound for ${e}:${t}`),window.dispatchEvent(new CustomEvent(mt.CUSTOM_SOUND_CHANGE,{detail:{action:"remove",entityType:e,entityId:t,shopType:n}})),true)}function oA(e,t,n){return pb(e,t,n)!==null}function iA(e){return Wn(),Wl().filter(n=>n.entityType===e)}const Fe={init:db,getAll:V1,getById:ub,add:q1,remove:K1,update:Y1,play:X1,stop:J1,getNotificationSettings:Q1,getNotificationConfig:Z1,setNotificationConfig:eA,setNotificationSettings:tA,getItemCustomSound:pb,setItemCustomSound:nA,removeItemCustomSound:rA,hasItemCustomSound:oA,getItemCustomSoundsByType:iA};let ds=null;async function aA(){return Me.ready?true:ds||(ds=(async()=>{Me.baseUrl=await Zo.base();const e=await jo.load({baseUrl:Me.baseUrl}),t=jo.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];Me.urls[i].set(a,Kr(Me.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(Me.sfx.mp3Url=Kr(Me.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(Me.sfx.atlasUrl=Kr(Me.baseUrl,r));}if(!Me.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return Me.sfx.atlas=await Xm(Me.sfx.atlasUrl),L1(Me.sfx.atlas),Fe.init(),Me.ready=true,true})(),ds)}function fb(e){if(e!=="music"&&e!=="ambience")return  false;const t=Me.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return Me.tracks[e]=null,true}function sA(e,t,n={}){if(!Me.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=Me.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);fb(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=ob(e,n.volume),o.preload="auto",o.play().catch(()=>{}),Me.tracks[e]=o,o}function lA(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(Me.urls[n].keys()).sort():n==="sfx"?Me.sfx.atlas?t.groups?Array.from(Me.sfx.groups.keys()).sort():Object.keys(Me.sfx.atlas).sort():[]:[]}function cA(){return ["sfx","music","ambience"]}function dA(){return Array.from(Me.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function uA(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=Me.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function pA(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(Me.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function fA(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=Me.urls[n],i=r.toLowerCase();for(const[a,s]of Array.from(o.entries()))if(a.toLowerCase()===i)return s;return null}function hA(){return Me.tracks.music&&(Me.tracks.music.volume=aa("music").atom),Me.tracks.ambience&&(Me.tracks.ambience.volume=aa("ambience").atom),true}let nn=null;async function mA(e,t={}){hb();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const r={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,nn?.audio===n&&(nn=null));},setVolume:o=>{n.volume=Math.max(0,Math.min(1,o));},isPlaying:()=>!n.paused&&!n.ended};nn=r;try{await new Promise((o,i)=>{const a=setTimeout(()=>{i(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(a),n.removeEventListener("canplay",d),n.removeEventListener("error",p);},d=()=>{s(),o();},p=()=>{s(),i(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(a),o()):(n.addEventListener("canplay",d,{once:!0}),n.addEventListener("error",p,{once:!0}));}),await n.play();}catch(o){throw nn=null,o}return n.addEventListener("ended",()=>{nn?.audio===n&&(nn=null);}),r}function hb(){return nn?(nn.stop(),nn=null,true):false}function gA(e){return nn?(nn.setVolume(e),true):false}function bA(){return nn?.isPlaying()??false}function vA(){return nn}function Yt(){if(!tb())throw new Error("MGAudio not ready yet")}async function yA(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return F1(o,n);if(r==="music"||r==="ambience")return sA(r,o,n);throw new Error(`Unknown category: ${r}`)}const Ct={init:aA,isReady:tb,play:yA,stop:e=>(Yt(),fb(e)),list:(e,t)=>(Yt(),lA(e,t)),refreshVolumes:()=>(Yt(),hA()),categoryVolume:e=>(Yt(),aa(e)),getCategories:()=>(Yt(),cA()),getGroups:()=>(Yt(),dA()),hasTrack:(e,t)=>(Yt(),uA(e,t)),hasGroup:e=>(Yt(),pA(e)),getTrackUrl:(e,t)=>(Yt(),fA(e,t)),playCustom:async(e,t)=>(Yt(),mA(e,t)),stopCustom:()=>(Yt(),hb()),setCustomVolume:e=>(Yt(),gA(e)),isCustomPlaying:()=>(Yt(),bA()),getCustomHandle:()=>(Yt(),vA()),CustomSounds:Fe},mb=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:Ct},Symbol.toStringTag,{value:"Module"}));function xA(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const at=xA();function gb(){return at.ready}let us=null;async function wA(){return at.ready?true:us||(us=(async()=>{at.baseUrl=await Zo.base();const e=await jo.load({baseUrl:at.baseUrl}),t=jo.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");at.byCat.clear(),at.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),d=i.slice(a+1),p=Kr(at.baseUrl,r);at.byBase.set(i,p),at.byCat.has(s)||at.byCat.set(s,new Map),at.byCat.get(s).set(d,p);}return at.ready=true,true})(),us)}function Hd(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function CA(e,t){if(t===void 0){const i=Hd(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=Hd(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function kA(){return Array.from(at.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function SA(e){const t=at.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Vd(e,t){const{cat:n,asset:r,base:o}=CA(e,t),i=at.byBase.get(o);if(i)return i;const s=at.byCat.get(n)?.get(r);if(s)return s;if(!at.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Kr(at.baseUrl,`cosmetic/${o}.png`)}const fh=fe?.document??document;function AA(){if(at.overlay)return at.overlay;const e=fh.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),fh.documentElement.appendChild(e),at.overlay=e,e}function EA(){const e=at.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function _A(e){return at.defaultParent=e,true}const IA=fe?.document??document;function qd(e,t,n){if(!at.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?Vd(e,o):Vd(e),a=IA.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):Hd(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,d]of Object.entries(r.style))try{a.style[s]=String(d);}catch{}return a}function TA(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||EA()||AA(),a=o!==void 0?qd(e,o,r):qd(e,r);if(i===at.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const d=r.scale??1,p=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${d}) rotate(${p}rad)`;else {const c=r.x??innerWidth/2,h=r.y??innerHeight/2;a.style.left=`${c}px`,a.style.top=`${h}px`,a.style.transform=`scale(${d}) rotate(${p}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${d}) rotate(${p}rad)`);}}return i.appendChild(a),at.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}at.live.delete(a);},a}function PA(){for(const e of Array.from(at.live))e.__mgDestroy?.();}const LA=100,Wc=[];function Kd(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(d=>d!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));Wc.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),Wc.length>LA&&Wc.shift();}const Xt={nativeCtor:null,captured:[],latestOpen:null},hh=Symbol.for("ariesmod.ws.capture.wrapped"),mh=Symbol.for("ariesmod.ws.capture.native"),bb=1;function Yd(e){return !!e&&e.readyState===bb}function MA(){if(Yd(Xt.latestOpen))return Xt.latestOpen;for(let e=Xt.captured.length-1;e>=0;e--){const t=Xt.captured[e];if(Yd(t))return t}return null}function RA(e,t){Xt.captured.push(e),Xt.captured.length>25&&Xt.captured.splice(0,Xt.captured.length-25);const n=()=>{Xt.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Xt.latestOpen===e&&(Xt.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Kd("in",o.type||"unknown",o);}catch{Kd("in","raw",r.data);}}),e.readyState===bb&&n();}function FA(e=fe,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[hh])return Xt.nativeCtor=r[mh]??Xt.nativeCtor??null,()=>{};const o=r;Xt.nativeCtor=o;function i(a,s){const d=s!==void 0?new o(a,s):new o(a);try{RA(d,n);}catch{}return d}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[hh]=true,i[mh]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function OA(e=fe){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ul(e=fe){const t=MA();if(t)return {ws:t,source:"captured"};const n=OA(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function vb(e,t={}){const n=t.pageWindow??fe,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const s=()=>{const p=ul(n);(p.ws!==i||p.source!==a)&&(i=p.ws,a=p.source,o&&console.log("[WS] best socket changed:",p.source,p.ws),e(p));};s();const d=setInterval(s,r);return ()=>clearInterval(d)}function NA(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function DA(e,t=fe){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=ul(t);if(!r)return {ok:false,reason:"no-ws"};if(!Yd(r))return {ok:false,reason:"not-open"};const o=NA(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);Kd("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function $A(e,t={},n=fe){return DA({type:e,...t},n)}const sr={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},he={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",ToggleLockItem:"ToggleLockItem",SetSelectedItem:"SetSelectedItem",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",GrowEgg:"GrowEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",CropCleanser:"CropCleanser",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",SwapPetFromStorage:"SwapPetFromStorage",PickupPet:"PickupPet",MovePetSlot:"MovePetSlot",NamePet:"NamePet",SellPet:"SellPet",ThrowSnowball:"ThrowSnowball",CheckFriendBonus:"CheckFriendBonus",ReportSpeakingStart:"ReportSpeakingStart"};var En=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(En||{});new Set(Object.values(sr));new Set(Object.values(he));const BA=["Room","Quinoa"],zA={Room:["Room"],Quinoa:BA};function Pe(e,t={},n=fe){const r=t,{scopePath:o,scope:i,...a}=r,s=typeof o=="string"?o:i,d=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?zA[s]:null;return $A(e,d?{scopePath:d,...a}:a,n)}function jA(e,t=fe){return Pe(he.Chat,{scope:"Room",message:e},t)}function GA(e,t=fe){return Pe(he.Emote,{scope:"Room",emoteType:e},t)}function UA(e,t=fe){return Pe(he.Wish,{scope:"Quinoa",wish:e},t)}function WA(e,t=fe){return Pe(he.KickPlayer,{scope:"Room",playerId:e},t)}function Hl(e,t=fe){console.log("[Gemini][WS] setPlayerData:",e);const{name:n,cosmetic:r}=e;return Pe(he.SetPlayerData,{scope:"Room",name:n,cosmetic:r},t)}function HA(e=fe){return Pe(he.UsurpHost,{scope:"Quinoa"},e)}function VA(e=fe){return Pe(he.ReportSpeakingStart,{scope:"Quinoa"},e)}function qA(e,t=fe){return Pe(he.SetSelectedGame,{scope:"Room",gameId:e},t)}function KA(e,t=fe){return Pe(he.VoteForGame,{scope:"Room",gameId:e},t)}function YA(e=fe){return Pe(he.RestartGame,{scope:"Room"},e)}function XA(e,t=fe){return Pe(he.Ping,{scope:"Quinoa",id:e},t)}function yb(e,t,n=fe){return Pe(he.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const JA=yb;function QA(e,t,n=fe){return Pe(he.Teleport,{scope:"Quinoa",x:e,y:t},n)}function ZA(e=fe){return Pe(he.CheckWeatherStatus,{scope:"Quinoa"},e)}function eE(e,t,n=fe){return Pe(he.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function tE(e,t=fe){return Pe(he.DropObject,{scope:"Quinoa",slotIndex:e},t)}function nE(e,t=fe){return Pe(he.PickupObject,{scope:"Quinoa",objectId:e},t)}function xb(e,t=fe){return Pe(he.ToggleLockItem,{scope:"Quinoa",itemId:e},t)}const wb=xb;function rE(e,t=fe){return Pe(he.SetSelectedItem,{scope:"Quinoa",itemIndex:e},t)}function ap(e,t="PetHutch",n,r,o=fe){return Pe(he.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toStorageIndex:n},...r!==void 0&&{quantity:r}},o)}function sp(e,t="PetHutch",n,r,o=fe){return Pe(he.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t,...n!==void 0&&{toInventoryIndex:n},...r!==void 0&&{quantity:r}},o)}function oE(e,t,n,r=fe){return Pe(he.MoveStorageItem,{scope:"Quinoa",itemId:e,storageId:t,toStorageIndex:n},r)}function iE(e=fe){return Pe(he.LogItems,{scope:"Quinoa"},e)}function aE(e,t,n=fe){return Pe(he.PlantSeed,{scope:"Quinoa",slot:e,species:t},n)}function sE(e,t=fe){return Pe(he.WaterPlant,{scope:"Quinoa",slot:e},t)}function lE(e,t,n=fe){return Pe(he.HarvestCrop,{scope:"Quinoa",slot:e,...t!==void 0&&{slotsIndex:t}},n)}function cE(e=fe){return Pe(he.SellAllCrops,{scope:"Quinoa"},e)}function lp(e,t=fe){return Pe(he.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function cp(e,t=fe){return Pe(he.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function dp(e,t=fe){return Pe(he.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function up(e,t=fe){return Pe(he.PurchaseSeed,{scope:"Quinoa",species:e},t)}function Cb(e,t,n=fe){return Pe(he.GrowEgg,{scope:"Quinoa",slot:e,eggId:t},n)}const dE=Cb;function uE(e,t=fe){return Pe(he.HatchEgg,{scope:"Quinoa",slot:e},t)}function pE(e,t,n=fe){return Pe(he.PlantGardenPlant,{scope:"Quinoa",slot:e,itemId:t},n)}function fE(e,t=fe){return Pe(he.PotPlant,{scope:"Quinoa",slot:e},t)}function hE(e,t,n,r=fe){return Pe(he.MutationPotion,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t,mutation:n},r)}function mE(e,t,n=fe){return Pe(he.CropCleanser,{scope:"Quinoa",tileObjectIdx:e,growSlotIdx:t},n)}function gE(e,t,n=fe){return Pe(he.PickupDecor,{scope:"Quinoa",tileType:e,localTileIndex:t},n)}function bE(e,t,n,r,o=fe){return Pe(he.PlaceDecor,{scope:"Quinoa",decorId:e,tileType:t,localTileIndex:n,...r!==void 0&&{rotation:r}},o)}function vE(e,t,n=fe){return Pe(he.RemoveGardenObject,{scope:"Quinoa",slot:e,slotType:t},n)}function kb(e,t={x:0,y:0},n="Dirt",r=0,o=fe){return Pe(he.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function yE(e,t,n=fe){return Pe(he.FeedPet,{scope:"Quinoa",petItemId:e,cropItemId:t},n)}function xE(e,t=fe){return Pe(he.PetPositions,{scope:"Quinoa",petPositions:e},t)}function Sb(e,t,n=fe){return Pe(he.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function wE(e,t,n,r=fe){return Pe(he.SwapPetFromStorage,{scope:"Quinoa",petSlotId:e,storagePetId:t,storageId:n},r)}function Ab(e,t=fe){return Pe(he.PickupPet,{scope:"Quinoa",petId:e},t)}function CE(e,t,n=fe){return Pe(he.MovePetSlot,{scope:"Quinoa",movePetSlotId:e,toPetSlotIndex:t},n)}function kE(e,t,n=fe){return Pe(he.NamePet,{scope:"Quinoa",petItemId:e,name:t},n)}function SE(e,t=fe){return Pe(he.SellPet,{scope:"Quinoa",itemId:e},t)}function AE(e=fe){return Pe(he.ThrowSnowball,{scope:"Quinoa"},e)}function EE(e=fe){return Pe(he.CheckFriendBonus,{scope:"Quinoa"},e)}async function Eb(e){try{const t=await jl(),n=[e.bottom!==void 0?e.bottom:t.bottom,e.mid!==void 0?e.mid:t.mid,e.top!==void 0?e.top:t.top,e.expression!==void 0?e.expression:t.expression],r=e.color!==void 0?e.color:t.color,o=Hl({cosmetic:{color:r,avatar:n}},fe);return console.log("[Avatar] Set outfit:",{outfit:e,finalAvatar:n,result:o}),!0}catch(t){return console.error("[Avatar] Failed to set outfit:",t),false}}async function _E(){return Eb({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})}const Ri=new Map;function IE(e){if(Ri.has(e))return Ri.get(e);const t=new Promise((n,r)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>n(o),o.onerror=()=>{Ri.delete(e),r(new Error(`Failed to load image: ${e}`));},o.src=e;});return Ri.set(e,t),t}function TE(){Ri.clear();}function PE(e){return Aa().find(r=>r.filename===e)?.url||""}async function LE(e,t={}){const n=document.createElement("canvas"),r=t.width||400,o=t.height||400,i=t.scale||1;n.width=r*i,n.height=o*i;const a=n.getContext("2d");if(!a)throw new Error("Failed to get canvas 2D context");if(a.imageSmoothingEnabled=i!==1,e.color){const c={Red:"#FF0000",Blue:"#0000FF",Green:"#00FF00",Yellow:"#FFFF00",Purple:"#800080",Orange:"#FFA500",Pink:"#FFC0CB",Brown:"#A52A2A"};a.fillStyle=c[e.color]||"#FF0000",a.fillRect(0,0,n.width,n.height);}const d=[e.bottom,e.mid,e.top,e.expression].filter(c=>!!c).map(c=>PE(c));return (await Promise.all(d.map(c=>IE(c)))).forEach(c=>{a.drawImage(c,0,0,n.width,n.height);}),n}let pp=null,Mo=null,zr=null,pr=null;function Hc(e){return lo()+e}async function ME(e){try{const{Store:t}=await Sn(async()=>{const{Store:a}=await Promise.resolve().then(()=>wa);return {Store:a}},void 0),n=await t.select("myDataAtom"),r=n?.cosmetic?.avatar||[],o=Xg(e,r),i=e.color||n?.cosmetic?.color||"Red";return pp={avatar:o,color:i},FE(),OE(o),console.log("[Avatar] Rendered avatar override:",o),!0}catch(t){return console.error("[Avatar] Failed to render avatar:",t),false}}async function RE(){pp=null,Mo&&(clearInterval(Mo),Mo=null),zr&&(zr.disconnect(),zr=null);const e=fe.document;return e.querySelectorAll("[data-gemini-avatar-overridden]").forEach(t=>{t.removeAttribute("data-gemini-avatar-overridden");}),e.querySelectorAll(".gemini-avatar-overlay").forEach(t=>t.remove()),e.querySelectorAll("img[data-gemini-override]").forEach(t=>{t.removeAttribute("data-gemini-override");}),pr&&(pr.remove(),pr=null),console.log("[Avatar] Cleared override"),true}function FE(){if(pr)return;const e=fe.document;pr=e.createElement("style"),pr.id="gemini-avatar-override-styles",pr.textContent=`
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
    `,e.head.appendChild(pr);}function OE(e){Mo&&clearInterval(Mo),zr&&zr.disconnect();const t=fe.document,n=()=>{const o=t.querySelectorAll(".Avatar");let i=0;o.forEach(a=>{const s=Array.from(a.querySelectorAll("img"));if(s.length===4){let p=false;s.forEach((c,h)=>{const b=Hc(e[h]);c.src!==b&&(p=true);}),p&&(s.forEach((c,h)=>{c.src=Hc(e[h]),c.setAttribute("data-gemini-override",e[h]);}),i++);return}if(a.querySelector("canvas")&&!a.querySelector(".gemini-avatar-overlay")){a.setAttribute("data-gemini-avatar-overridden","true");const p=t.createElement("div");p.className="gemini-avatar-overlay",e.forEach(c=>{const h=t.createElement("img");h.src=Hc(c),h.setAttribute("data-gemini-cosmetic",c),p.appendChild(h);}),window.getComputedStyle(a).position==="static"&&(a.style.position="relative"),a.appendChild(p),i++;}}),i>0&&console.log(`[Avatar] Re-applied ${i} override(s) (React reverted)`);};n(),Mo=setInterval(n,500),zr=new MutationObserver(()=>{setTimeout(n,10);});const r=t.querySelector(".game-root")||t.querySelector("#root")||t.body;zr.observe(r,{childList:true,subtree:true,attributeFilter:["src"]}),console.log("[Avatar] Aggressive monitor started (500ms + MutationObserver)");}function NE(){return pp}function DE(e){if(!e)return  false;const t=e.toLowerCase();return t.includes("_blank")||t.includes("_none")||t===Jg.toLowerCase()}function $E(e){return e.some(DE)}let pl=null,So=null;fe.Gemini_AvatarOverride=null;async function _b(e){try{const{Store:t}=await Sn(async()=>{const{Store:S}=await Promise.resolve().then(()=>wa);return {Store:S}},void 0),{getPlayers:n}=await Sn(async()=>{const{getPlayers:S}=await Promise.resolve().then(()=>Gb);return {getPlayers:S}},void 0);jc();const i=n().get().myPlayer;if(!i)return console.error("[WorldAvatar] myPlayer not available"),!1;const a=i.id,s=i.cosmetic.avatar;fe.MagicCircle_PlayerId=a,So||(So=[...s]);let d=Xg(e,s);const p=$E(d);jc(),pl=d,fe.Gemini_AvatarOverride=d,console.log("[WorldAvatar] Applying override:",d);const c=await t.select("stateAtom");if(!c?.data?.players)return console.error("[WorldAvatar] stateAtom.data.players not available"),!1;const h=c.data.players.findIndex(S=>S.id===a);if(h===-1)return console.error("[WorldAvatar] Current player not found in players array"),!1;const b=c.data.players[h],y=[...c.data.players];y[h]={...b,cosmetic:{...b.cosmetic,avatar:d}};const g={...c,data:{...c.data,players:y}};return await t.set("stateAtom",g),jc()&&p||Hl({name:i.name,cosmetic:{...i.cosmetic,avatar:d}},fe),!0}catch{return  false}}async function BE(){if(!pl||!So)return  true;try{const{Store:e}=await Sn(async()=>{const{Store:h}=await Promise.resolve().then(()=>wa);return {Store:h}},void 0),{getPlayers:t}=await Sn(async()=>{const{getPlayers:h}=await Promise.resolve().then(()=>Gb);return {getPlayers:h}},void 0);fe.Gemini_AvatarOverride=null;const o=t().get().myPlayer;if(!o)return !1;const i=o.id,a=await e.select("stateAtom");if(!a?.data?.players)return !1;const s=a.data.players.findIndex(h=>h.id===i);if(s===-1)return !1;const d=a.data.players[s],p=[...a.data.players];p[s]={...d,cosmetic:{...d.cosmetic,avatar:So}};const c={...a,data:{...a.data,players:p}};return await e.set("stateAtom",c),Hl({name:o.name,cosmetic:{...o.cosmetic,avatar:So}},fe),pl=null,So=null,!0}catch{return  false}}function zE(){return pl}let Dt=[];const Fs=[],gh=()=>{Fs.forEach(e=>e([...Dt]));},Xr={init(){Dt=Qe(Bt.SECTION.AVATAR_LOADOUTS,[]);},get(){return [...Dt]},async save(e,t,n){if(!n){const i=Dt.find(a=>a.top===t.top&&a.mid===t.mid&&a.bottom===t.bottom&&a.expression===t.expression);if(i)return i.id}const r=n||Math.random().toString(36).substring(2,9),o={...t,id:r,name:e,createdAt:n&&Dt.find(i=>i.id===n)?.createdAt||Date.now()};if(n){const i=Dt.findIndex(a=>a.id===n);i!==-1?Dt[i]=o:Dt.push(o);}else Dt.push(o);return tt(Bt.SECTION.AVATAR_LOADOUTS,Dt),gh(),r},delete(e){Dt=Dt.filter(t=>t.id!==e),tt(Bt.SECTION.AVATAR_LOADOUTS,Dt),gh();},rename(e,t){const n=Dt.find(r=>r.id===e);n&&(n.name=t,tt(Bt.SECTION.AVATAR_LOADOUTS,Dt));},async wear(e){const t=Dt.find(r=>r.id===e);if(!t)return  false;const n={top:t.top,mid:t.mid,bottom:t.bottom,expression:t.expression};return await _b(n)},subscribe(e){return Fs.push(e),()=>{const t=Fs.indexOf(e);t!==-1&&Fs.splice(t,1);}}},Ib={init:Qg,isReady:()=>l1(),list:Aa,listAsync:Zg,listUrls:h1,get:jl,debug:m1,set:Eb,blank:_E,Loadouts:Xr,toCanvas:LE,clearImageCache:TE,render:ME,clearOverride:RE,getOverride:NE,renderWorld:_b,clearWorldOverride:BE,getWorldOverride:zE};function Rr(){if(!gb())throw new Error("MGCosmetic not ready yet")}const fp={init:wA,isReady:gb,categories:()=>(Rr(),kA()),list:e=>(Rr(),SA(e)),url:((e,t)=>(Rr(),Vd(e,t))),create:((e,t,n)=>(Rr(),qd(e,t,n))),show:((e,t,n)=>(Rr(),TA(e,t,n))),attach:e=>(Rr(),_A(e)),clear:()=>(Rr(),PA()),Avatar:Ib},bh={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6};function Tb(e){const t=ke.get("mutations");if(!t)return bh[e]??null;const n=t[e];return !n||typeof n.coinMultiplier!="number"?bh[e]??null:n.coinMultiplier}const Vc=new Map;function qc(e){if(Vc.has(e))return Vc.get(e);const t=Tb(e)??1;return Vc.set(e,t),t}const jE=new Set(["Gold","Rainbow"]),GE=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function Pb(e){let t=1,n=0,r=0;for(const o of e)if(o==="Gold"||o==="Rainbow")o==="Rainbow"?t=qc("Rainbow"):t===1&&(t=qc("Gold"));else {const i=qc(o);i>1&&(n+=i,r++);}return t*(1+n-r)}function UE(e){return Tb(e)}function WE(e){return jE.has(e)}function HE(e){return GE.has(e)}function VE(e){return HE(e)}function hp(e,t){const n=mp(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function sa(e,t,n){const r=mp(e);if(!r)return 0;const o=r.baseSellPrice,i=Pb(n);return Math.round(o*t*i)}function qE(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function KE(e,t){return t>=e}function mp(e){const t=ke.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Lb=3600,Kc=80,YE=100,Fi=30;function Vl(e){return e/Lb}function ql(e,t){const n=Ea(e);if(!n)return Kc;const r=n.maxScale;if(t<=1)return Kc;if(t>=r)return YE;const o=(t-1)/(r-1);return Math.floor(Kc+20*o)}function Kl(e,t,n){const r=Ea(e);if(!r)return n-Fi;const o=r.hoursToMature,i=t/Lb,a=Fi/o,s=Math.min(a*i,Fi),d=n-Fi;return Math.floor(d+s)}function Yl(e,t){const n=Ea(e);return n?t>=n.hoursToMature:false}function Mb(e){const t=Ea(e);return t?Fi/t.hoursToMature:0}function XE(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Ea(e){const t=ke.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function JE(e,t){return t<=0?1:Math.min(1,e/t)}const rr=3600,ps=80,vh=100,Bn=30,QE={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function _a(e){const t=ke.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function ZE(e){return e/rr}function Rb(e,t){const n=_a(e);if(!n)return ps;const{maxScale:r}=n;if(t<=1)return ps;if(t>=r)return vh;const o=(t-1)/(r-1);return Math.floor(ps+(vh-ps)*o)}function e_(e){return e-Bn}function t_(e){const t=_a(e);return !t||t.hoursToMature<=0?0:Bn/t.hoursToMature}function Fb(e,t,n){const r=_a(e);if(!r)return n-Bn;const o=t/rr,i=Bn/r.hoursToMature,a=Math.min(i*o,Bn),s=n-Bn;return Math.floor(s+a)}function Ob(e,t,n){const r=_a(e);if(!r)return 0;const o=n-Bn,i=t-o;if(i<=0)return 0;const a=Bn/r.hoursToMature;return a<=0?0:i/a*rr}function gp(e,t,n,r,o=rr){const a=Ob(e,n,r)-t;return a<=0?0:o<=0?1/0:a/o}function Nb(e,t,n,r=rr){return gp(e,t,n,n,r)}function Db(e,t,n,r,o=rr){if(n>=r)return 0;const i=n+1;return gp(e,t,i,r,o)}function n_(e,t){return e>=t}function r_(e,t){const n=t-Bn,o=(e-n)/Bn*100;return Math.min(100,Math.max(0,o))}const o_=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:ZE,calculateCurrentStrength:Fb,calculateHoursToMaxStrength:Nb,calculateHoursToNextStrength:Db,calculateHoursToStrength:gp,calculateMaxStrength:Rb,calculateStartingStrength:e_,calculateStrengthPerHour:t_,calculateStrengthProgress:r_,calculateXpForStrength:Ob,getSpeciesData:_a,isPetMature:n_},Symbol.toStringTag,{value:"Module"}));function bp(e){const t=ke.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=QE[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function i_(e,t){return e<=0?0:t<=0?1/0:e/t}function vp(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const i=e-o,a=r/n;return Math.ceil(i/a)}function $b(e,t,n){const r=ke.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=bp(e);return vp(n,t,a,i)}function fl(e,t,n){const r=ke.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const i=o.coinsToFullyReplenishHunger,a=bp(e);return vp(n,t,a,i)}function Bb(e,t,n,r,o,i){return e?t&&i>0?fl(n,r,i):0:fl(n,r,o)}const a_=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:Bb,calculateFeedsForDuration:vp,calculateFeedsToMaxStrength:fl,calculateFeedsToNextStrength:$b,calculateHoursUntilStarving:i_,getHungerDrainPerHour:bp},Symbol.toStringTag,{value:"Module"})),zb={init(){},isReady(){return  true},crop:{calculateSize:hp,calculateSellPrice:sa,calculateProgress:qE,isReady:KE,getData:mp},pet:{calculateAge:Vl,calculateMaxStrength:ql,calculateCurrentStrength:Kl,isMature:Yl,calculateStrengthPerHour:Mb,getData:Ea},mutation:{calculateMultiplier:Pb,getValue:UE,isGrowth:WE,isEnvironmental:VE},xp:o_,feed:a_};function An(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!An(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!An(n[a],r[a]))return  false;return  true}const yh={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenPlayer",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"mySelectedSlotIdAtom"},xh={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function s_(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function l_(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function c_(e){const t=e.currentGardenTile;return {name:e.gardenName?.name??null,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function d_(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function u_(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function wh(e){return {position:s_(e),tile:l_(e),garden:c_(e),object:d_(e),plant:u_(e)}}function Ch(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function p_(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!An(e.data,t.data)}function f_(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!An(e.sortedSlotIndices,t.sortedSlotIndices)?true:!An(e.slots,t.slots)}function h_(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function m_(){let e=xh,t=xh,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(yh),s=new Set;function d(){if(s.size<a.length)return;const c=wh(i);if(!An(e,c)&&(t=e,e=c,!!n)){for(const h of o.all)h(e,t);if(Ch(t)!==Ch(e))for(const h of o.stable)h(e,t);if(p_(t.object,e.object)){const h={current:e.object,previous:t.object};for(const b of o.object)b(h);}if(f_(t.plant,e.plant)){const h={current:e.plant,previous:t.plant};for(const b of o.plantInfo)b(h);}if(h_(t.garden,e.garden)){const h={current:e.garden,previous:t.garden};for(const b of o.garden)b(h);}}}async function p(){if(n)return;const c=a.map(async h=>{const b=yh[h],y=await Je.subscribe(b,g=>{i[h]=g,s.add(h),d();});r.push(y);});await Promise.all(c),n=true,s.size===a.length&&(e=wh(i));}return p(),{get(){return e},subscribe(c,h){return o.all.add(c),h?.immediate!==false&&n&&s.size===a.length&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,h){return o.stable.add(c),h?.immediate!==false&&n&&s.size===a.length&&c(e,e),()=>o.stable.delete(c)},subscribeObject(c,h){return o.object.add(c),h?.immediate&&n&&s.size===a.length&&c({current:e.object,previous:e.object}),()=>o.object.delete(c)},subscribePlantInfo(c,h){return o.plantInfo.add(c),h?.immediate&&n&&s.size===a.length&&c({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(c)},subscribeGarden(c,h){return o.garden.add(c),h?.immediate&&n&&s.size===a.length&&c({current:e.garden,previous:e.garden}),()=>o.garden.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Yc=null;function ft(){return Yc||(Yc=m_()),Yc}function g_(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(h,b){return {x:b%h,y:Math.floor(b/h)}}function s(h,b,y){return y*h+b}function d(h,b){const{cols:y,rows:g}=h,S=y*g,I=new Set,E=new Set,M=new Map,R=[],D=h.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],N=h.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],P=Math.max(D.length,N.length);for(let C=0;C<P;C++){const _=D[C]??[],z=N[C]??[],j=_.map((U,ce)=>(I.add(U),M.set(U,C),{globalIndex:U,localIndex:ce,position:a(y,U)})),V=z.map((U,ce)=>(E.add(U),M.set(U,C),{globalIndex:U,localIndex:ce,position:a(y,U)}));R.push({userSlotIdx:C,dirtTiles:j,boardwalkTiles:V,allTiles:[...j,...V]});}const F=h.spawnTiles.map(C=>a(y,C)),L={};if(h.locations)for(const[C,_]of Object.entries(h.locations)){const z=_.spawnTileIdx??[];L[C]={name:C,spawnTiles:z,spawnPositions:z.map(j=>a(y,j))};}return {cols:y,rows:g,totalTiles:S,tileSize:b,spawnTiles:h.spawnTiles,spawnPositions:F,locations:L,userSlots:R,globalToXY(C){return a(y,C)},xyToGlobal(C,_){return s(y,C,_)},getTileOwner(C){return M.get(C)??null},isDirtTile(C){return I.has(C)},isBoardwalkTile(C){return E.has(C)}}}function p(){if(o.size<i||e)return;const h=r.map,b=r.tileSize??0;if(h){e=d(h,b);for(const y of n)y(e);n.clear();}}async function c(){const h=await Je.subscribe("mapAtom",y=>{r.map=y,o.add("map"),p();});t.push(h);const b=await Je.subscribe("tileSizeAtom",y=>{r.tileSize=y,o.add("tileSize"),p();});t.push(b);}return c(),{get(){return e},isReady(){return e!==null},onReady(h,b){return e?(b?.immediate!==false&&h(e),()=>{}):(n.add(h),()=>n.delete(h))},destroy(){for(const h of t)h();t.length=0,e=null,n.clear();}}}let Xc=null;function Xd(){return Xc||(Xc=g_()),Xc}function b_(){const e=ke.get("mutations");return e?Object.keys(e):[]}function jb(){const e={};for(const t of b_())e[t]=[];return e}function Jd(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:jb()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function kh(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function v_(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function y_(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime,fruitCount:1}}function x_(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Sh(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Ah(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Jd();const i=t().get(),a=i?.userSlots[r],s=a?.dirtTiles??[],d=a?.boardwalkTiles??[],p=[],c=[],h=[],b={},y=[],g=[],S=[],I=[],E=jb(),M=[],R=[],D=[],N={},P=[],F=[],L={},C=new Set,_=new Set;for(const[U,ce]of Object.entries(n.tileObjects)){const K=parseInt(U,10);C.add(K);const ie=i?i.globalToXY(K):{x:0,y:0};if(ce.objectType==="plant"){const se=ce,ae=v_(U,se,ie,o);p.push(ae),ae.isMature?c.push(ae):h.push(ae),b[ae.species]||(b[ae.species]=[]),b[ae.species].push(ae);for(let ne=0;ne<se.slots.length;ne++){const Y=se.slots[ne],Z=y_(U,ie,ne,Y,o);if(y.push(Z),Z.isMature?g.push(Z):S.push(Z),Z.mutations.length>0){I.push(Z);for(const O of Z.mutations)E[O]||(E[O]=[]),E[O].push(Z);}}}else if(ce.objectType==="egg"){const ae=x_(U,ce,ie,o);M.push(ae),N[ae.eggId]||(N[ae.eggId]=[]),N[ae.eggId].push(ae),ae.isMature?R.push(ae):D.push(ae);}else if(ce.objectType==="decor"){const ae=Sh(U,ce,ie,"tileObjects");P.push(ae),L[ae.decorId]||(L[ae.decorId]=[]),L[ae.decorId].push(ae);}}for(const[U,ce]of Object.entries(n.boardwalkTileObjects)){const K=parseInt(U,10);_.add(K);const ie=i?i.globalToXY(K):{x:0,y:0},ae=Sh(U,ce,ie,"boardwalk");F.push(ae),L[ae.decorId]||(L[ae.decorId]=[]),L[ae.decorId].push(ae);}const z=[...P,...F],j=s.filter(U=>!C.has(U.localIndex)),V=d.filter(U=>!_.has(U.localIndex));return {garden:n,mySlotIndex:r,plants:{all:p,mature:c,growing:h,bySpecies:b,count:p.length},crops:{all:y,mature:g,growing:S,mutated:{all:I,byMutation:E}},eggs:{all:M,mature:R,growing:D,byType:N,count:M.length},decors:{tileObjects:P,boardwalk:F,all:z,byType:L,count:z.length},tiles:{tileObjects:s,boardwalk:d,empty:{tileObjects:j,boardwalk:V}},counts:{plants:p.length,maturePlants:c.length,crops:y.length,matureCrops:g.length,eggs:M.length,matureEggs:R.length,decors:z.length,emptyTileObjects:j.length,emptyBoardwalk:V.length}}}function w_(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function C_(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function k_(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function S_(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function A_(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let s=0;s<a;s++){const d=new Set(i.slots[s].mutations),p=new Set(o.slots[s].mutations),c=[...p].filter(b=>!d.has(b)),h=[...d].filter(b=>!p.has(b));if(c.length>0||h.length>0){const b=Date.now(),y=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:y.species,startTime:y.startTime,endTime:y.endTime,targetScale:y.targetScale,mutations:[...y.mutations],isMature:b>=y.endTime,fruitCount:1};n.push({crop:g,added:c,removed:h});}}}return n}function E_(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=o.get(a.tileIndex);if(!s)continue;const d=Math.min(a.slots.length,s.slots.length);for(let p=0;p<d;p++){const c=a.slots[p],h=s.slots[p];if(c.startTime!==h.startTime){const b=i.get(`${a.tileIndex}:${p}`);if(!b||!b.isMature)continue;const y={tileIndex:a.tileIndex,position:a.position,slotIndex:p,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:true,fruitCount:1};r.push({crop:y,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let p=s.slotsCount;p<a.slotsCount;p++){const c=i.get(`${a.tileIndex}:${p}`);if(!c||!c.isMature)continue;const h=a.slots[p];if(!h)continue;const b={tileIndex:a.tileIndex,position:a.position,slotIndex:p,species:h.species,startTime:h.startTime,endTime:h.endTime,targetScale:h.targetScale,mutations:[...h.mutations],isMature:true,fruitCount:1};r.push({crop:b,remainingSlots:s.slotsCount});}}return r}function __(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function I_(e,t){const n=d=>`${d.tileIndex}:${d.location}`,r=d=>`${d.tileIndex}:${d.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(d=>!o.has(r(d))),s=e.filter(d=>!i.has(n(d)));return {added:a,removed:s}}function T_(){let e=Jd(),t=Jd(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function d(){if(a.size<s)return;const c=Ah(i,Xd);if(An(e,c)||(t=e,e=c,!n))return;for(const R of o.all)R(e,t);if(kh(t)!==kh(e))for(const R of o.stable)R(e,t);const h=w_(t.plants.all,e.plants.all);for(const R of h.added)for(const D of o.plantAdded)D({plant:R});for(const R of h.removed)for(const D of o.plantRemoved)D({plant:R,tileIndex:R.tileIndex});const b=C_(t.plants.mature,e.plants.mature,e.plants.all);for(const R of b)for(const D of o.plantMatured)D({plant:R});const y=A_(t.plants.all,e.plants.all);for(const R of y)for(const D of o.cropMutated)D(R);const g=k_(t.crops.mature,e.crops.mature,e.crops.all);for(const R of g)for(const D of o.cropMatured)D({crop:R});const S=E_(t.plants.all,e.plants.all,t.crops.all);for(const R of S)for(const D of o.cropHarvested)D(R);const I=__(t.eggs.all,e.eggs.all);for(const R of I.added)for(const D of o.eggPlaced)D({egg:R});for(const R of I.removed)for(const D of o.eggRemoved)D({egg:R});const E=S_(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const R of E)for(const D of o.eggMatured)D({egg:R});const M=I_(t.decors.all,e.decors.all);for(const R of M.added)for(const D of o.decorPlaced)D({decor:R});for(const R of M.removed)for(const D of o.decorRemoved)D({decor:R});}async function p(){if(n)return;const c=await pC.onChangeNow(b=>{i.garden=b,a.add("garden"),d();});r.push(c);const h=await Je.subscribe("myUserSlotIdxAtom",b=>{i.mySlotIndex=b,a.add("mySlotIndex"),d();});r.push(h),n=true,a.size===s&&(e=Ah(i,Xd));}return p(),{get(){return e},subscribe(c,h){return o.all.add(c),h?.immediate!==false&&n&&a.size===s&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,h){return o.stable.add(c),h?.immediate!==false&&n&&a.size===s&&c(e,e),()=>o.stable.delete(c)},subscribePlantAdded(c,h){if(o.plantAdded.add(c),h?.immediate&&n&&a.size===s)for(const b of e.plants.all)c({plant:b});return ()=>o.plantAdded.delete(c)},subscribePlantRemoved(c,h){return o.plantRemoved.add(c),()=>o.plantRemoved.delete(c)},subscribePlantMatured(c,h){if(o.plantMatured.add(c),h?.immediate&&n&&a.size===s)for(const b of e.plants.mature)c({plant:b});return ()=>o.plantMatured.delete(c)},subscribeCropMutated(c,h){if(o.cropMutated.add(c),h?.immediate&&n&&a.size===s)for(const b of e.crops.mutated.all)c({crop:b,added:b.mutations,removed:[]});return ()=>o.cropMutated.delete(c)},subscribeCropMatured(c,h){if(o.cropMatured.add(c),h?.immediate&&n&&a.size===s)for(const b of e.crops.mature)c({crop:b});return ()=>o.cropMatured.delete(c)},subscribeCropHarvested(c,h){return o.cropHarvested.add(c),()=>o.cropHarvested.delete(c)},subscribeEggPlaced(c,h){if(o.eggPlaced.add(c),h?.immediate&&n&&a.size===s)for(const b of e.eggs.all)c({egg:b});return ()=>o.eggPlaced.delete(c)},subscribeEggRemoved(c,h){return o.eggRemoved.add(c),()=>o.eggRemoved.delete(c)},subscribeEggMatured(c,h){if(o.eggMatured.add(c),h?.immediate&&n&&a.size===s)for(const b of e.eggs.mature)c({egg:b});return ()=>o.eggMatured.delete(c)},subscribeDecorPlaced(c,h){if(o.decorPlaced.add(c),h?.immediate&&n&&a.size===s)for(const b of e.decors.all)c({decor:b});return ()=>o.decorPlaced.delete(c)},subscribeDecorRemoved(c,h){return o.decorRemoved.add(c),()=>o.decorRemoved.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let Jc=null;function co(){return Jc||(Jc=T_()),Jc}const Eh={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPrimitivePetSlotsAtom",slotInfos:"myPetSlotInfosAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function _h(e,t){const n=Vl(e.xp),r=ql(e.petSpecies,e.targetScale),o=Kl(e.petSpecies,e.xp,r),i=Yl(e.petSpecies,n),d=ke.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,p=e.hunger/d*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:p,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function P_(e,t){const n=t[e.id],r=n?.lastAbilityTrigger??null,o=n?.position??null,i=Vl(e.xp),a=ql(e.petSpecies,e.targetScale),s=Kl(e.petSpecies,e.xp,a),d=Yl(e.petSpecies,i),h=ke.get("pets")?.[e.petSpecies]?.coinsToFullyReplenishHunger??1,b=e.hunger/h*100;return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,hungerPercent:b,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:"active",position:o?{x:o.x,y:o.y}:null,lastAbilityTrigger:r,growthStage:i,currentStrength:s,maxStrength:a,isMature:d}}const Ih=500;let Nn=[],Os=0;function L_(){try{const e=Qe(Bt.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Os=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function M_(e){try{tt(Bt.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function R_(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function F_(e){if(!e||!Array.isArray(e))return;const t=lg(e),n=[];for(const r of t)if(r.timestamp>Os){const o=R_(r);o&&n.push(o);}n.length!==0&&(Os=Math.max(...n.map(r=>r.performedAt),Os),Nn=[...n,...Nn],Nn.length>Ih&&(Nn=Nn.slice(0,Ih)),M_(Nn),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${Nn.length})`));}function Th(e){const t=new Set,n=[];for(const h of e.active??[]){const b=P_(h,e.slotInfos??{});n.push(b),t.add(b.id);}const r=[];for(const h of e.inventory??[]){if(t.has(h.id))continue;const b=_h(h,"inventory");r.push(b),t.add(b.id);}const o=[];for(const h of e.hutch??[]){if(t.has(h.id))continue;const b=_h(h,"hutch");o.push(b),t.add(b.id);}const i=[...n,...r,...o],d=co().get().decors.all.some(h=>h.decorId==="PetHutch"),p=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},hutch:{hasHutch:d,currentItems:p,maxItems:25},abilityLogs:[...Nn]}}const Ph={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},abilityLogs:[]};function O_(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Lh(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function N_(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Lh),r=t.all.map(Lh);return O_(n,r)}function D_(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function $_(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function B_(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function z_(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function j_(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function G_(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function U_(){let e=Ph,t=Ph,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Eh),s=new Set;function d(){if(s.size<a.length)return;if(i.activityLogs){const E=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(E)&&F_(E);}const c=Th(i);if(An(e,c)||(t=e,e=c,!n))return;for(const E of o.all)E(e,t);if(!N_(t,e))for(const E of o.stable)E(e,t);const h=D_(t,e);for(const E of h)for(const M of o.location)M(E);const b=$_(t,e);for(const E of b)for(const M of o.ability)M(E);const y=B_(t,e);if(y)for(const E of o.count)E(y);const g=z_(t,e);for(const E of g)for(const M of o.growth)M(E);const S=j_(t,e);for(const E of S)for(const M of o.strengthGain)M(E);const I=G_(t,e);for(const E of I)for(const M of o.maxStrength)M(E);}async function p(){if(n)return;Nn=L_(),console.log(`[myPets] Loaded ${Nn.length} ability logs from storage`);const c=a.map(async h=>{const b=Eh[h],y=await Je.subscribe(b,g=>{i[h]=g,s.add(h),d();});r.push(y);});await Promise.all(c),n=true,s.size===a.length&&(e=Th(i));}return p(),{get(){return e},subscribe(c,h){return o.all.add(c),h?.immediate!==false&&n&&s.size===a.length&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,h){return o.stable.add(c),h?.immediate!==false&&n&&s.size===a.length&&c(e,e),()=>o.stable.delete(c)},subscribeLocation(c,h){if(o.location.add(c),h?.immediate&&n&&s.size===a.length)for(const b of e.all)c({pet:b,from:b.location,to:b.location});return ()=>o.location.delete(c)},subscribeAbility(c,h){if(o.ability.add(c),h?.immediate&&n&&s.size===a.length)for(const b of e.all)b.lastAbilityTrigger&&c({pet:b,trigger:b.lastAbilityTrigger});return ()=>o.ability.delete(c)},subscribeCount(c,h){return o.count.add(c),h?.immediate&&n&&s.size===a.length&&c({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(c)},subscribeGrowth(c,h){if(o.growth.add(c),h?.immediate&&n&&s.size===a.length)for(const b of e.all)c({pet:b,previousStage:b.growthStage,newStage:b.growthStage});return ()=>o.growth.delete(c)},subscribeStrengthGain(c,h){if(o.strengthGain.add(c),h?.immediate&&n&&s.size===a.length)for(const b of e.all)c({pet:b,previousStrength:b.currentStrength,newStrength:b.currentStrength});return ()=>o.strengthGain.delete(c)},subscribeMaxStrength(c,h){if(o.maxStrength.add(c),h?.immediate&&n&&s.size===a.length)for(const b of e.all)b.currentStrength===b.maxStrength&&c({pet:b});return ()=>o.maxStrength.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let Qc=null;function uo(){return Qc||(Qc=U_()),Qc}const Mh={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Rh={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Fh(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Oh(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function W_(e,t){return Oh(e)===Oh(t)}function H_(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function fs(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function V_(e,t){const n=new Set(e.map(fs)),r=new Set(t.map(fs)),o=t.filter(a=>!n.has(fs(a))),i=e.filter(a=>!r.has(fs(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function q_(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function K_(){let e=Rh,t=Rh,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Mh),s=new Set;function d(){if(s.size<a.length)return;const c=Fh(i);if(An(e,c)||(t=e,e=c,!n))return;for(const y of o.all)y(e,t);if(!W_(t,e))for(const y of o.stable)y(e,t);if(H_(t.selectedItem,e.selectedItem)){const y={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(y);}const h=V_(t.items,e.items);if(h)for(const y of o.items)y(h);const b=q_(t.favoritedItemIds,e.favoritedItemIds);if(b)for(const y of o.favorites)y(b);}async function p(){if(n)return;const c=a.map(async h=>{const b=Mh[h],y=await Je.subscribe(b,g=>{i[h]=g,s.add(h),d();});r.push(y);});await Promise.all(c),n=true,s.size===a.length&&(e=Fh(i));}return p(),{get(){return e},subscribe(c,h){return o.all.add(c),h?.immediate!==false&&n&&s.size===a.length&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,h){return o.stable.add(c),h?.immediate!==false&&n&&s.size===a.length&&c(e,e),()=>o.stable.delete(c)},subscribeSelection(c,h){return o.selection.add(c),h?.immediate&&n&&s.size===a.length&&c({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(c)},subscribeItems(c,h){return o.items.add(c),h?.immediate&&n&&s.size===a.length&&c({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(c)},subscribeFavorites(c,h){return o.favorites.add(c),h?.immediate&&n&&s.size===a.length&&c({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let Zc=null;function po(){return Zc||(Zc=K_()),Zc}const Qd={all:[],host:null,myPlayer:null,count:0};function Y_(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Nh(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Qd;const i=new Map;Array.isArray(r)&&r.forEach((p,c)=>{p?.type==="user"&&p?.playerId&&i.set(p.playerId,{slot:p,index:c});});const a=t.map(p=>Y_(p,n,i)),s=a.find(p=>p.isHost)??null,d=o!==null?a.find(p=>p.slotIndex===o)??null:null;return {all:a,host:s,myPlayer:d,count:a.length}}function Dh(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function X_(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function J_(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function Q_(){let e=Qd,t=Qd,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=4;function d(){if(a.size<s)return;const c=Nh(i);if(An(e,c)||(t=e,e=c,!n))return;for(const S of o.all)S(e,t);if(Dh(t)!==Dh(e))for(const S of o.stable)S(e,t);const h=X_(t.all,e.all);for(const S of h)for(const I of o.joinLeave)I(S);const b=J_(t.all,e.all);for(const S of b)for(const I of o.connection)I(S);const y=t.host?.id??null,g=e.host?.id??null;if(y!==g){const S={current:e.host,previous:t.host};for(const I of o.host)I(S);}}async function p(){if(n)return;const c=await dC.onChangeNow(g=>{i.players=g,a.add("players"),d();});r.push(c);const h=await uC.onChangeNow(g=>{i.hostPlayerId=g,a.add("hostPlayerId"),d();});r.push(h);const b=await cC.onChangeNow(g=>{i.userSlots=g,a.add("userSlots"),d();});r.push(b);const y=await Je.subscribe("myUserSlotIdxAtom",g=>{i.myUserSlotIndex=g,a.add("myUserSlotIndex"),d();});r.push(y),n=true,a.size===s&&(e=Nh(i));}return p(),{get(){return e},subscribe(c,h){return o.all.add(c),h?.immediate!==false&&n&&a.size===s&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,h){return o.stable.add(c),h?.immediate!==false&&n&&a.size===s&&c(e,e),()=>o.stable.delete(c)},subscribeJoinLeave(c,h){if(o.joinLeave.add(c),h?.immediate&&n&&a.size===s)for(const b of e.all)c({player:b,type:"join"});return ()=>o.joinLeave.delete(c)},subscribeConnection(c,h){if(o.connection.add(c),h?.immediate&&n&&a.size===s)for(const b of e.all)c({player:b,isConnected:b.isConnected});return ()=>o.connection.delete(c)},subscribeHost(c,h){return o.host.add(c),h?.immediate&&n&&a.size===s&&c({current:e.host,previous:e.host}),()=>o.host.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let ed=null;function yp(){return ed||(ed=Q_()),ed}const Gb=Object.freeze(Object.defineProperty({__proto__:null,getPlayers:yp},Symbol.toStringTag,{value:"Module"})),Ia=["seed","tool","egg","decor"];function Z_(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function eI(e,t,n){const r=Z_(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0,price:e.price}}function tI(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(p=>eI(p,e,o)),a=i.filter(p=>p.isAvailable).length,s=t.secondsUntilRestock??0,d=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:d}}function $h(e){const t=e.shops,n=e.purchases??{},r=Ia.map(s=>tI(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const d=i.sort((p,c)=>(p.restockAt??0)-(c.restockAt??0))[0];a={shop:d.type,seconds:d.secondsUntilRestock,at:d.restockAt};}return {all:r,byType:o,nextRestock:a}}const Bh={all:Ia.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function zh(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function nI(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function rI(e,t){const n=[];for(const r of Ia){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const d=a.get(s.id);d&&s.purchased>d.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-d.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function oI(e,t){const n=[];for(const r of Ia){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const d=a.get(s.id);d&&d.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:d.isAvailable,isAvailable:s.isAvailable});}}return n}function iI(){let e=Bh,t=Bh,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function d(){if(a.size<s)return;const c=$h(i);if(An(e,c)||(t=e,e=c,!n))return;for(const g of o.all)g(e,t);if(zh(t)!==zh(e))for(const g of o.stable)g(e,t);const h={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of Ia){const S=nI(t.byType[g],e.byType[g]);if(S)for(const I of h[g])I(S);}const b=rI(t,e);for(const g of b)for(const S of o.purchase)S(g);const y=oI(t,e);for(const g of y)for(const S of o.availability)S(g);}async function p(){if(n)return;const c=await fC.onChangeNow(b=>{i.shops=b,a.add("shops"),d();});r.push(c);const h=await hC.onChangeNow(b=>{i.purchases=b,a.add("purchases"),d();});r.push(h),n=true,a.size===s&&(e=$h(i));}return p(),{get(){return e},getShop(c){return e.byType[c]},getItem(c,h){return e.byType[c].items.find(y=>y.id===h)??null},subscribe(c,h){return o.all.add(c),h?.immediate!==false&&n&&a.size===s&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,h){return o.stable.add(c),h?.immediate!==false&&n&&a.size===s&&c(e,e),()=>o.stable.delete(c)},subscribeSeedRestock(c,h){return o.seedRestock.add(c),h?.immediate&&n&&a.size===s&&c({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(c)},subscribeToolRestock(c,h){return o.toolRestock.add(c),h?.immediate&&n&&a.size===s&&c({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(c)},subscribeEggRestock(c,h){return o.eggRestock.add(c),h?.immediate&&n&&a.size===s&&c({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(c)},subscribeDecorRestock(c,h){return o.decorRestock.add(c),h?.immediate&&n&&a.size===s&&c({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(c)},subscribePurchase(c,h){if(o.purchase.add(c),h?.immediate&&n&&a.size===s)for(const b of e.all)for(const y of b.items)y.purchased>0&&c({shopType:b.type,itemId:y.id,quantity:y.purchased,newPurchased:y.purchased,remaining:y.remaining});return ()=>o.purchase.delete(c)},subscribeAvailability(c,h){if(o.availability.add(c),h?.immediate&&n&&a.size===s)for(const b of e.all)for(const y of b.items)c({shopType:b.type,itemId:y.id,wasAvailable:y.isAvailable,isAvailable:y.isAvailable});return ()=>o.availability.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let td=null;function ni(){return td||(td=iI()),td}function Ub(e){const t=e||"Sunny",o=ke.get("weather")?.[t]?.name||t;return {id:t,name:o,isActive:t!=="Sunny",type:t,startTime:null,endTime:null,remainingSeconds:0}}function jh(){return Ub(null)}function aI(){let e=jh(),t=jh(),n=null,r=false,o=null;const i={all:new Set,stable:new Set};function a(d){const p=(d||"Sunny")!==(n||"Sunny");n=d;const c=Ub(d),h=e.id!==c.id;if(t=e,e=c,!!r){if(p)for(const b of i.all)b(e,t);if(h){const b={current:e,previous:t};for(const y of i.stable)y(b);}}}async function s(){r||(o=await Je.subscribe("weatherAtom",d=>{a(d);}),r=true);}return s(),{get(){return e},subscribe(d,p){return i.all.add(d),p?.immediate!==false&&r&&d(e,e),()=>i.all.delete(d)},subscribeStable(d,p){return i.stable.add(d),p?.immediate&&r&&d({current:e,previous:e}),()=>i.stable.delete(d)},destroy(){o?.(),o=null,i.all.clear(),i.stable.clear(),r=false;}}}let nd=null;function Ta(){return nd||(nd=aI()),nd}let $t=null;function Wb(){return $t||($t={currentTile:ft(),myPets:uo(),gameMap:Xd(),myInventory:po(),players:yp(),shops:ni(),weather:Ta(),myGarden:co()},$t)}function Zn(){if(!$t)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return $t}function sI(){$t&&($t.currentTile.destroy(),$t.myPets.destroy(),$t.gameMap.destroy(),$t.myInventory.destroy(),$t.players.destroy(),$t.shops.destroy(),$t.weather.destroy(),$t.myGarden.destroy(),$t=null);}const Ut={get currentTile(){return Zn().currentTile},get myPets(){return Zn().myPets},get gameMap(){return Zn().gameMap},get myInventory(){return Zn().myInventory},get players(){return Zn().players},get shops(){return Zn().shops},get weather(){return Zn().weather},get myGarden(){return Zn().myGarden}};function lI(e){const t=up(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function cI(e){const r=Ut.shops.getShop("seed").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let s=0;s<o;s++){const d=up(e);d.ok?a++:i.push(d.reason||`Failed to purchase seed ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function dI(e){const t=cp(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function uI(e){const r=Ut.shops.getShop("egg").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let s=0;s<o;s++){const d=cp(e);d.ok?a++:i.push(d.reason||`Failed to purchase egg ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function pI(e){const t=lp(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function fI(e){const r=Ut.shops.getShop("decor").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let s=0;s<o;s++){const d=lp(e);d.ok?a++:i.push(d.reason||`Failed to purchase decor ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}function hI(e){const t=dp(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function mI(e){const r=Ut.shops.getShop("tool").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const o=r.remaining,i=[];let a=0;for(let s=0;s<o;s++){const d=dp(e);d.ok?a++:i.push(d.reason||`Failed to purchase tool ${s+1}`);}return {ok:a>0,itemId:e,totalPurchased:a,errors:i}}let rd=false;const jr={init(){rd||(rd=true,console.log("[MGShopActions] Initialized"));},isReady(){return rd},seed:{buy:lI,buyAll:cI},egg:{buy:dI,buyAll:uI},decor:{buy:pI,buyAll:fI},tool:{buy:hI,buyAll:mI}};async function Hb(e){const t=[{name:"Data",init:()=>ke.init()},{name:"CustomModal",init:()=>To.init()},{name:"Sprites",init:()=>Ne.init()},{name:"TileObjectSystem",init:()=>ir.init()},{name:"Pixi",init:()=>Bl.init()},{name:"RiveLoader",init:()=>Uo.init()},{name:"Audio",init:()=>Ct.init()},{name:"Cosmetics",init:()=>fp.init()},{name:"ShopActions",init:()=>jr.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Vb=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:Zo,MGAudio:Ct,MGCalculators:zb,MGCosmetic:fp,MGCustomModal:To,MGData:ke,MGEnvironment:Ft,MGManifest:jo,MGPixi:Bl,MGPixiHooks:Dn,MGRiveLoader:Uo,MGShopActions:jr,MGSprite:Ne,MGTile:ir,MGVersion:Nu,PET_ABILITY_ACTIONS:ag,filterPetAbilityLogs:lg,formatAbilityLog:cg,initAllModules:Hb,isPetAbilityAction:sg},Symbol.toStringTag,{value:"Module"}));function gI(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"||t==="mythic"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function bI(e){return e.toLowerCase()}function Xl(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:s=true,size:d="md",onClick:p,variant:c="default",rarity:h=null,abilityId:b="",abilityName:y=""}=e,g=x("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),d==="sm"?g.classList.add("badge--sm"):d==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),p&&g.addEventListener("click",p);let S=false,I=a;function E(){S||(I===false?g.style.border="none":g.style.border="");}function M(C,_=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${C}`,`badge--${_}`),E();}function R(C){const _=(C??"").trim();_?(g.style.border=_,S=true):(S=false,E());}function D(C){I=C,E();}function N(C){g.textContent=C;}function P(C,_=o){M(C,_);}function F(C){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const _=gI(C);if(!_){g.textContent=String(C??"—");return}g.textContent=_,g.classList.add("badge--rarity",`badge--rarity-${bI(_)}`);}function L(C,_){const j=ke.get("abilities")?.[C],V=j?.color,U=V||"rgba(100, 100, 100, 0.9)",ce=V?`${V}`:"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=_||j?.name||C||"Unknown Ability",g.style.background=U,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const K=()=>{g.style.background=ce;},ie=()=>{g.style.background=U;};g.removeEventListener("mouseenter",K),g.removeEventListener("mouseleave",ie),g.addEventListener("mouseenter",K),g.addEventListener("mouseleave",ie);}return c==="rarity"?F(h):c==="ability"?L(b,y):(g.textContent=n,M(r,o),typeof a=="boolean"&&D(a),i&&R(i)),{root:g,setLabel:N,setType:P,setBorder:R,setWithBorder:D,setRarity:F,setAbility:L}}const vI={expanded:false,sort:{key:null,dir:null},search:""},yI={categories:{}};async function xI(){const e=await io("tab-test",{version:2,defaults:yI,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...vI}}function n(i,a){const s=e.get(),d=t(i);e.update({categories:{...s.categories,[i]:{...d,expanded:a}}});}function r(i,a,s){const d=e.get(),p=t(i);e.update({categories:{...d.categories,[i]:{...p,sort:{key:a,dir:s}}}});}function o(i,a){const s=e.get(),d=t(i);e.update({categories:{...s.categories,[i]:{...d,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const wI={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function hs(e){return e?wI[e]??0:0}class CI extends Cr{constructor(){super({id:"tab-test",label:"Test"});ve(this,"stateCtrl",null);}async build(n){this.stateCtrl=await xI();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=x("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(async()=>{try{const i=await Ne.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=x("span",{style:"opacity:0.5;"});return o.textContent="—",o}return Xl({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),s=b=>{if(!b)return o;const y=b.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(y))},d=Ol({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:b=>b.spriteId,onSortChange:(b,y)=>{this.stateCtrl.setCategorySort(n,b,y);}});a.sort.key&&a.sort.dir&&d.sortBy(a.sort.key,a.sort.dir);const p=xa({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:b=>{const y=b.trim();this.stateCtrl.setCategorySearch(n,y),d.setData(s(y));}}),c=x("div",{style:"margin-bottom:8px;"});c.appendChild(p.root);const h=x("div");return h.appendChild(c),h.appendChild(d.root),lt({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:b=>{this.stateCtrl.setCategoryExpanded(n,b);}},h)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=ke.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=ke.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=ke.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=ke.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=ke.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>hs(i.rarity)-hs(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!Ne.isReady())try{await Ne.init();}catch{return}const o=Ne.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],d=Ne.getCategoryId(a).map(p=>{const c=`sprite/${a}/${p}`;return {name:p,spriteId:c,rarity:this.getRarityForSprite(a,c,p)}});if(d.sort((p,c)=>hs(p.rarity)-hs(c.rarity)),d.length>0){const p=this.createDataCard(a,this.formatCategoryName(a),d,r);n.appendChild(p);}}}}function rn(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const qb=`
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
`,kI={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Dr=null;async function SI(){if(Dr)return Dr;Dr=await io("tab-auto-favorite",{version:1,defaults:kI});const e=Qe(ct.AUTO_FAVORITE_UI,null);return e&&(await Dr.set(e),cx(ct.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Dr}function xn(){if(!Dr)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Dr}const xp=ct.AUTO_FAVORITE,Kb={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function ro(){return Qe(xp,Kb)}function wp(e){tt(xp,e);}function Yb(e){const n={...ro(),...e};return wp(n),n}function Cp(e){const t=ro();return t.mode="simple",t.simple={...t.simple,...e},wp(t),t}function AI(e){Cp({favoriteSpecies:e});}function EI(e){Cp({favoriteMutations:e});}function Gh(){return ro().enabled}let Ns=null;const Hi=new Set;function Zd(){const e=ro();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Hi.clear(),Ns=po().subscribeItems(t=>{if(t.added.length>0){const n=ro();for(const r of t.added)II(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Xb(){Ns&&(Ns(),Ns=null),Hi.clear(),console.log("🛑 [AutoFavorite] Stopped");}function _I(e){const t=ro();t.enabled=e,t.simple.enabled=e,Yb(t),e?Zd():Xb();}function II(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Hi.has(e.id)||e.isFavorited||e.favorited)&&Jb(e,t.simple)){Hi.add(e.id);try{wb(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),Hi.delete(e.id);}}}function Jb(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function TI(){return Object.keys(ke.get("mutations")??{})}const Qb={init(){this.isReady()||Zd();},isReady(){return Gh()},DEFAULT_CONFIG:Kb,STORAGE_KEY:xp,loadConfig:ro,saveConfig:wp,updateConfig:Yb,updateSimpleConfig:Cp,setFavoriteSpecies:AI,setFavoriteMutations:EI,isEnabled:Gh,start:Zd,stop:Xb,setEnabled:_I,shouldFavorite:Jb,getGameMutations:TI};let od=null,Uh=null;function Zb(){try{return yp().get().myPlayer?.journal||null}catch{return null}}function PI(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function ev(){const e=ke.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function tv(){return ["Normal","Gold","Rainbow","Max Weight"]}function LI(){return Object.keys(ke.get("mutations")??{})}function nv(e){const n=(ke.get("pets")??{})[e];if(!n?.innateAbilityWeights||typeof n.innateAbilityWeights!="object")return [];const r=n.innateAbilityWeights,o=["RainbowGranter","GoldGranter"];return Object.keys(r).filter(i=>!o.includes(i))}function rv(e){const t=ke.get("plants")??{},n=Object.keys(t),r=ev(),o=e?.produce??{},i=[];let a=0;for(const p of n){const h=o[p]?.variantsLogged?.map(y=>y.variant)??[],b=r.filter(y=>!h.includes(y));a+=h.length,i.push({species:p,variantsLogged:h,variantsMissing:b,variantsTotal:r.length,variantsPercentage:r.length>0?h.length/r.length*100:0,isComplete:b.length===0});}const s=n.length*r.length,d=i.filter(p=>p.variantsLogged.length>0).length;return {total:n.length,logged:d,percentage:n.length>0?d/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function ov(e){const t=ke.get("pets")??{},n=Object.keys(t),r=tv(),o=e?.pets??{},i=[];let a=0,s=0,d=0,p=0;for(const h of n){const b=o[h],y=b?.variantsLogged?.map(R=>R.variant)??[],g=b?.abilitiesLogged?.map(R=>R.ability)??[],S=r.filter(R=>!y.includes(R)),I=nv(h),E=g.filter(R=>I.includes(R)),M=I.filter(R=>!E.includes(R));s+=r.length,a+=y.length,p+=I.length,d+=Math.min(E.length,I.length),i.push({species:h,variantsLogged:y,variantsMissing:S,variantsTotal:r.length,variantsPercentage:r.length>0?y.length/r.length*100:0,abilitiesLogged:E,abilitiesMissing:M,abilitiesTotal:I.length,abilitiesPercentage:I.length>0?E.length/I.length*100:0,isComplete:S.length===0&&(I.length===0||M.length===0)});}const c=i.filter(h=>h.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:p,abilitiesLogged:d,abilitiesPercentage:p>0?d/p*100:0}}async function Jl(e=false){await ke.waitForAny();const t=Zb(),n=PI(t);if(!e&&od&&n===Uh)return od;const r={plants:rv(t),pets:ov(t),lastUpdated:Date.now()};return od=r,Uh=n,r}async function MI(){const e=await Jl();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let Vi=null,eu=false;function RI(){eu||(eu=true,Vi||(Vi=setInterval(async()=>{const e=await Jl();kp(e);},3e4)),console.log("[Journal] Started"));}function FI(){Vi&&(clearInterval(Vi),Vi=null),eu=false;}function kp(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function OI(){const e=await Jl();return kp(e),e}function NI(e){try{const t=Pt.getMyJournal();if(!t?.pets)return [];const n=t.pets[e];return n?.abilitiesLogged?n.abilitiesLogged.map(r=>r.ability):[]}catch(t){return console.error("[AbilitiesInject] Failed to get logged abilities:",t),[]}}function DI(e,t){try{const n=Pt.getMyJournal();if(!n?.pets)return;const r=n.pets[e];return r?.abilitiesLogged?r.abilitiesLogged.find(i=>i.ability===t)?.createdAt:void 0}catch(n){console.error("[AbilitiesInject] Failed to get ability log date:",n);return}}function Sp(e){try{const t=ke.getAll();if(!t?.pets)return [];const n=t.pets[e];if(!n)return [];if(n.innateAbilityWeights&&typeof n.innateAbilityWeights=="object"){const r=n.innateAbilityWeights,o=["RainbowGranter","GoldGranter"];return Object.entries(r).filter(([i])=>!o.includes(i)).sort(([,i],[,a])=>a-i).map(([i])=>i)}return []}catch(t){return console.error("[AbilitiesInject] Failed to get all abilities:",t),[]}}function $I(e){try{const t=ke.getAll();if(!t?.abilities)return e;const n=t.abilities[e];if(!n)return e;const r=n.name;if(typeof r=="string")return r;const o=n.displayName;return typeof o=="string"?o:e}catch(t){return console.error("[AbilitiesInject] Failed to get ability name:",t),e}}function Ap(e){try{const t=["RainbowGranter","GoldGranter"],n=NI(e),r=Sp(e),o=n.filter(d=>!t.includes(d)),i=r.filter(d=>!o.includes(d)),a=r.length,s=a>0?o.length/a*100:0;return {logged:o,missing:i,total:a,percentage:s}}catch(t){return console.error("[AbilitiesInject] Failed to calculate progress:",t),{logged:[],missing:[],total:0,percentage:0}}}function BI(e){const t=new Date(e),n=t.toLocaleDateString("en-US",{month:"short"}),r=t.getDate(),o=t.getFullYear();return `${n} ${r}, ${o}`}function zI(e){const r=ke.get("abilities")?.[e]?.color||"rgba(100, 100, 100, 0.9)";return {bg:r,hover:r}}async function jI(e,t,n,r){const o=n?DI(e,t):void 0,i=document.createElement("div");i.className="gemini-ability-entry",i.style.cssText=`
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    align-items: center;
    justify-items: center;
  `;const a=r?"80px":"100px",s=document.createElement("div");if(s.className="gemini-ability-stamp",o){const p=`Logged on ${BI(o)}`;s.style.cursor="help";let c=null;s.addEventListener("mouseenter",()=>{c=document.createElement("div"),c.textContent=p,c.style.cssText=`
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
      `,document.body.appendChild(c);const h=s.getBoundingClientRect(),b=c.offsetHeight,y=c.offsetWidth;let g=h.left+h.width/2-y/2,S=h.top-b-8;S<8&&(S=h.bottom+8),g<8&&(g=8),g+y>window.innerWidth-8&&(g=window.innerWidth-y-8),c.style.left=`${g}px`,c.style.top=`${S}px`,requestAnimationFrame(()=>{c&&(c.style.opacity="1",c.style.transform="scale(1)");});}),s.addEventListener("mouseleave",()=>{c&&(c.remove(),c=null);});}const d=Qm();d||console.error("[AbilitiesInject] Base URL not available - modules may not be initialized"),s.style.cssText=`
    position: relative;
    width: ${a};
    height: ${a};
    display: flex;
    align-items: center;
    justify-content: center;
    ${d?`background-image: url(${d}ui/Stamp.webp);`:""}
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `;try{const p=await Ne.toCanvas("pet",e,{scale:.7,boundsMode:"padded"});if(p){const c=r?"56px":"70px";p.style.position="absolute",p.style.top="50%",p.style.left="50%",p.style.transform="translate(-50%, -50%)",p.style.width=c,p.style.height=c,p.style.objectFit="contain",p.style.imageRendering="pixelated",p.style.zIndex="1",n||(p.style.filter="grayscale(1) brightness(0.16)"),s.appendChild(p);}else {const c=document.createElement("div");c.textContent="ðŸ¾",c.style.fontSize="32px",c.style.position="absolute",c.style.top="50%",c.style.left="50%",c.style.transform="translate(-50%, -50%)",c.style.zIndex="1",s.appendChild(c);}}catch(p){console.warn("[AbilitiesInject] Failed to load pet sprite:",e,p);const c=document.createElement("div");c.textContent="ðŸ¾",c.style.fontSize="32px",c.style.position="absolute",c.style.top="50%",c.style.left="50%",c.style.transform="translate(-50%, -50%)",c.style.zIndex="1",s.appendChild(c);}if(n){const p=$I(t),c=zI(t),h=document.createElement("div");h.className="gemini-ability-badge",h.textContent=p,h.style.cssText=`
      background: ${c.bg};
      color: white;
      padding: 4px;
      border-radius: 10px;
      min-width: ${r?"80px":"90px"};
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${r?"12px":"14px"};
      font-weight: bold;
      text-align: center;
    `,i.appendChild(s),i.appendChild(h);}else {const p=document.createElement("div");p.className="gemini-ability-badge",p.style.cssText=`
      background: var(--paper, var(--soft));
      padding: 4px;
      border-radius: 10px;
      min-width: ${r?"80px":"90px"};
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    `;const c=document.createElement("span");c.style.cssText=`
      font-size: ${r?"12px":"14px"};
      color: var(--fg);
      text-align: center;
      font-weight: normal;
      width: 100%;
    `,c.textContent="???",p.appendChild(c),i.appendChild(s),i.appendChild(p);}return i}async function GI(e,t,n){const r=[...e.logged,...e.missing];return await Promise.all(r.map(o=>{const i=e.logged.includes(o);return jI(t,o,i,n)}))}const Ao="p.chakra-text.css-1qd26jh",Ep="p.chakra-text.css-12b1ql2";let Vo=[],tu=null,qi=null,la=false,hl=false;const Wh="gemini-ability-entry";let Ds=false;const Jr="gemini-overview-updated";let id=null;function UI(){const e=document.querySelector(Ao);if(!e)return null;const t=e.textContent?.trim();if(!t||t==="???"||!document.querySelector(Ep))return null;const r=document.querySelectorAll("div.McGrid");let o=null;for(const i of r){const a=i.textContent||"",s=a.includes("Normal"),d=a.includes("Gold"),p=a.includes("Max Weight"),c=a.includes("Rainbow"),h=a.includes("???"),b=[s,d,p,c,h].filter(Boolean).length,y=a.includes("Crops")||a.includes("Pets"),g=a.includes("Collected"),S=a.includes("Back");if(b>=2&&!y&&!g&&!S){o=i;break}}return o?{speciesName:t,variantGrid:o}:null}function iv(e){const t=ke.get("pets")??{};for(const[r,o]of Object.entries(t)){const i=o;if(i.name===e||i.displayName===e||r===e)return r}const n=e.toLowerCase();for(const[r,o]of Object.entries(t)){const i=o,a=typeof i.name=="string"?i.name:void 0,s=typeof i.displayName=="string"?i.displayName:void 0;if(a&&a.toLowerCase()===n||s&&s.toLowerCase()===n||r.toLowerCase()===n)return r}return n.replace(/\s+/g,"")}function av(e){const t=ke.get("pets")??{};return e in t}function ml(){const e=document.querySelector(".gemini-journal-allTab");if(e){const o=e.querySelector(".gemini-allTab-tab");if(o instanceof HTMLElement&&o.offsetHeight>25)return "All"}const t=document.querySelectorAll("button");let n=null,r=null;for(const o of t){const i=o.textContent?.trim();i==="Crops"&&(n=o),i==="Pets"&&(r=o);}if(!n&&!r)return null;if(n&&r){const o=n.offsetHeight,i=r.offsetHeight;if(o>i)return "Crops";if(i>o)return "Pets";if(n.getAttribute("aria-selected")==="true")return "Crops";if(r.getAttribute("aria-selected")==="true")return "Pets"}return r&&r.offsetParent?"Pets":n&&n.offsetParent?"Crops":null}function sv(){if(!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.includes("GARDEN JOURNAL"))||!Array.from(document.querySelectorAll("p.chakra-text")).find(i=>i.textContent?.match(/Collected\s+\d+%/)))return  false;const n=document.querySelector(Ao);return n&&!n.textContent?.includes("GARDEN")?false:ml()==="Pets"}function WI(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(S=>S.textContent?.match(/Collected\s+\d+%/));if(!e||ml()!=="Pets")return  false;if(e.classList.contains(Jr))return  true;const n=e.querySelector("span.chakra-text");if(!n)return  false;const r=n.textContent?.match(/\((\d+)\/(\d+)\)/);if(!r)return  false;const o=parseInt(r[1],10),i=parseInt(r[2],10),a=ke.get("pets")??{},s=Object.keys(a).length*4,d=s*.25;if(Math.abs(i-s)>d)return  false;if(!e.hasAttribute("data-original-percent")){const S=e.textContent?.match(/Collected\s+(\d+)%/);S&&e.setAttribute("data-original-percent",S[1]);}n.hasAttribute("data-original-count")||n.setAttribute("data-original-count",n.textContent||"");let p=0,c=0;for(const S of Object.keys(a)){const I=Sp(S),E=Ap(S);p+=I.length,c+=E.logged.length;}const h=o+c,b=i+p,y=Math.floor(h/b*100),g=e.childNodes[0];return g&&g.nodeType===Node.TEXT_NODE&&(g.textContent=`Collected ${y}% `),n.textContent=`(${h}/${b})`,e.classList.add(Jr),true}function HI(){ke.get("pets");const e=document.querySelectorAll("p.chakra-text");for(const t of e){const n=t.textContent||"";if(!n.match(/^\d+\/\d+$/)||t.classList.contains(Jr))continue;const r=n.match(/^(\d+)\/(\d+)$/);if(!r)continue;const o=parseInt(r[1],10),i=parseInt(r[2],10);let a=null,s=t,d=false;for(;s&&!d;){if(s.classList.contains("McGrid")){const S=s.querySelectorAll("p.chakra-text");for(const I of S){const E=I.textContent||"";if(E!=="???"&&!E.includes("/")&&E.length>2&&E.length<30){a=I,d=true;break}}}s=s.parentElement;}if(!a)continue;const p=a.textContent?.trim();if(!p)continue;const c=iv(p);if(!c||!av(c))continue;const h=Sp(c),b=Ap(c);if(h.length===0)continue;const y=o+b.logged.length,g=i+h.length;t.textContent=`${y}/${g}`,t.classList.add(Jr);}}function VI(){if(!sv()){Ds=false;return}if(!Ds)try{const e=WI();HI(),e&&(Ds=!0);}catch(e){console.error("[AbilitiesInject] Failed to update overview page:",e);}}function nu(){const e=Array.from(document.querySelectorAll("p.chakra-text")).find(t=>t.hasAttribute("data-original-percent"));if(e){const t=e.getAttribute("data-original-percent");if(t){const r=e.childNodes[0];r&&r.nodeType===Node.TEXT_NODE&&(r.textContent=`Collected ${t}% `);}e.removeAttribute("data-original-percent"),e.classList.remove(Jr);const n=e.querySelector("span.chakra-text");if(n){const r=n.getAttribute("data-original-count");r&&(n.textContent=r),n.removeAttribute("data-original-count");}}document.querySelectorAll(`.${Jr}`).forEach(t=>{t.classList.remove(Jr);}),Ds=false;}function qI(){return window.innerWidth<768}function KI(e,t){const n=document.querySelector(Ep);if(!n)return;const r=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!r)return;const o=parseInt(r[1],10),i=parseInt(r[2],10),a=o+e,s=i+t;n.textContent=`Collected ${a}/${s}`;}async function YI(e,t){try{hl=!0,er();const n=Ap(t);if(n.total===0)return;const r=await GI(n,t,qI());for(const o of r)e.appendChild(o),Vo.push(o);KI(n.logged.length,n.total),Oi={logged:n.logged.length,total:n.total};}catch(n){console.error("[AbilitiesInject] Failed to inject:",n),er();}finally{setTimeout(()=>{hl=false;},0);}}function XI(e,t){const n=document.querySelector(Ep);if(!n)return;const r=n.textContent?.match(/Collected (\d+)\/(\d+)/);if(!r)return;const o=parseInt(r[1],10),i=parseInt(r[2],10),a=o-e,s=i-t;n.textContent=`Collected ${a}/${s}`;}let Oi=null;function er(){Oi&&(XI(Oi.logged,Oi.total),Oi=null);for(const e of Vo)e.remove();Vo=[],tu=null,hl=false;}function Fr(){if(hl)return;const e=ml();e!==id&&(id==="Pets"&&e!=="Pets"&&(nu(),er()),id=e);const t=ml();if(sv()&&t==="Pets"){er(),VI();return}nu();const n=UI();if(!n){er();return}const r=iv(n.speciesName);if(!r){er();return}if(!av(r)){er();return}r===tu&&Vo.length>0&&Vo[0].isConnected||(tu=r,YI(n.variantGrid,r));}function JI(){Fr(),setTimeout(()=>{Fr();},100),setTimeout(()=>{Fr();},500),setTimeout(()=>{Fr();},1e3),qi=new MutationObserver(e=>{for(const t of e)t.type==="childList"&&(t.addedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Wh)||Vo.includes(n))return;const r=n.textContent||"";(r.includes("GARDEN JOURNAL")||r.includes("Collected")||r.includes("Chicken")||r.includes("Bunny"))&&Fr(),(n.matches?.(Ao)||n.querySelector?.(Ao))&&Fr(),(n.matches?.("div.McGrid")||n.querySelector?.("div.McGrid"))&&Fr();}}),t.removedNodes.forEach(n=>{if(n instanceof HTMLElement){if(n.classList.contains(Wh))return;(n.matches?.(Ao)||n.querySelector?.(Ao))&&er();}}));}),qi.observe(document.body,{childList:true,subtree:true});}function QI(){qi&&(qi.disconnect(),qi=null),er(),nu();}function ZI(){la||(la=true,JI());}function eT(){la&&(la=false,QI());}function tT(){return la}const nT={init:ZI,destroy:eT,isEnabled:tT};function Ht(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function ri(e,t){e.add(()=>t.disconnect());}let $s=false;function Ql(){return $s}function ar(e){if(!$s){$s=true;try{e();}finally{$s=false;}}}const rT={Normal:"Normal: Harvest a {cropName} and log it without any mutations.",Wet:"Wet is the most common mutation, gained during the Rain weather event.",Chilled:"The Chilled mutation is gained during the Snow weather event.",Frozen:"The Frozen mutation is obtained from Wet crops during the Snow weather event, or Chilled crops during Rain.",Dawnlit:"The Dawnlit mutation is gained during the Dawn weather event.",Ambershine:"The Amberlit mutation is gained during the Amber Moon weather event.",Gold:"Gold is a rare mutation that appears in 1% of newly planted crops. Pets with the Gold Granter ability have a small chance to apply the Gold mutation to a random crop.",Rainbow:"Rainbow is a very rare mutation that appears in 0.1% of newly planted crops.  Pets with the Rainbow Granter ability have a small chance to apply the Rainbow mutation to a random crop.",Dawncharged:"Dawnbound: During the Dawn lunar event, place a {cropName} with the Dawnlit mutation adjacent to a Dawnbinder crop.",Ambercharged:"Amberbound: During the Amber Moon lunar event, place a {cropName} with the Amberlit mutation adjacent to a Moonbinder crop.","Max Weight":"Max weight applies only to size 100 crops (the largest possible). The size of a crop can be checked by hovering over its weight. Obtaining weight 100 crops can be achieved through Crop Size Boost pets."},oT={Normal:"Hatch a {petName} without any mutations",Gold:"All pets have a 1% base chance to hatch with the gold mutation; increase these chances with the Pet Mutation Boost abilities.",Rainbow:"All pets have a 0.1% base chance to hatch with the rainbow mutation; increase these chances with the Pet Mutation Boost abilities.","Max Weight":"Hatch a {petName} with a Max STR of 100, using Max Strength Boost ability is recommended while hatching"},iT={CommonEgg:["Worm","Snail","Bee"],UncommonEgg:["Chicken","Bunny","Dragonfly"],RareEgg:["Pig","Cow","Turkey"],WinterEgg:["SnowFox","Stoat","WhiteCaribou"],LegendaryEgg:["Squirrel","Turtle","Goat"],MythicalEgg:["Butterfly","Peacock","Capybara"]},aT={CommonEgg:"Common Eggs",UncommonEgg:"Uncommon Eggs",RareEgg:"Rare Eggs",WinterEgg:"Winter Eggs",LegendaryEgg:"Legendary Eggs",MythicalEgg:"Mythical Eggs"};function sT(e){for(const[t,n]of Object.entries(iT))if(n.includes(e))return aT[t]||t;return "Eggs"}function lT(e){return `Keep hatching ${sT(e)} to get a pet with this ability`}function cT(e,t){const n=rT[e];return n?n.replace(/\{cropName\}/g,t):`Obtain a ${e} ${t}`}function dT(e,t){const n=oT[e];return n?n.replace(/\{petName\}/g,t):`Obtain a ${e} ${t}`}let Bs=null;function uT(e){const t=document.createElement("div");return t.className="gemini-journal-hint",t.textContent=e,t.style.cssText=`
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
  `,t}function pT(e,t){const n=t.getBoundingClientRect(),r=240,o=8;let i=n.left+n.width/2-r/2,a=n.top-40-o;i<8&&(i=8),i+r>window.innerWidth-8&&(i=window.innerWidth-r-8),a<8&&(a=n.bottom+o),e.style.left=`${i}px`,e.style.top=`${a}px`;}function Hh(e,t){gl();const n=uT(t);document.body.appendChild(n),pT(n,e),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="scale(1)";}),Bs=n;}function gl(){Bs&&(Bs.remove(),Bs=null);}function Zl(e){const t=ke.get("plants")??{};for(const[o,i]of Object.entries(t)){const a=i;if(a?.crop?.name===e)return {id:o,type:"crop"};if(a?.plant?.name===e)return {id:o,type:"crop"};if(o===e)return {id:o,type:"crop"}}const n=ke.get("pets")??{};for(const[o,i]of Object.entries(n)){const a=i;if(a?.name===e)return {id:o,type:"pet"};if(a?.displayName===e)return {id:o,type:"pet"};if(o===e)return {id:o,type:"pet"}}const r=e.toLowerCase();for(const[o,i]of Object.entries(t)){const a=i;if(a?.crop?.name?.toLowerCase()===r)return {id:o,type:"crop"};if(a?.plant?.name?.toLowerCase()===r)return {id:o,type:"crop"};if(o.toLowerCase()===r)return {id:o,type:"crop"}}for(const[o,i]of Object.entries(n)){const a=i;if(a?.name?.toLowerCase()===r)return {id:o,type:"pet"};if(a?.displayName?.toLowerCase()===r)return {id:o,type:"pet"};if(o.toLowerCase()===r)return {id:o,type:"pet"}}return null}function lv(e,t){if(t==="crop"){const r=(ke.get("plants")??{})[e];return r?.crop?.name||r?.plant?.name||e}else {const r=(ke.get("pets")??{})[e];return r?.name||r?.displayName||e}}let Ki=Ht(),qo=false;const cv="gemini-hint-attached";function fT(){const e=document.querySelectorAll(".chakra-text, p, span");for(const t of e){const n=t.textContent?.trim();if(n&&n!=="???"&&!n.includes("/")&&!n.includes("%")&&!(n==="Crops"||n==="Pets"||n==="All")&&!(n.includes("GARDEN")||n.includes("JOURNAL"))&&!n.includes("Collected")&&n.length>=3&&n.length<=20){const r=Zl(n);if(r)return {displayName:n,id:r.id,type:r.type}}}return null}function hT(){const e=document.querySelectorAll("button");for(const t of e){const n=t.textContent?.trim(),r=t.querySelector('[class*="MotionMcFlex"], .MotionMcFlex, div[style*="height: 35px"]');if(r&&r.offsetHeight>=30){if(n==="Crops")return "crops";if(n==="Pets")return "pets"}}return null}function mT(){const e=[],t=document.querySelectorAll("p"),n=document.querySelectorAll("span"),r=[...t,...n];for(const o of r){if(o.textContent?.trim()!=="???"||!o.offsetParent)continue;let a=o.parentElement,s=null;for(let d=0;d<4&&a&&!s;d++){const p=a.parentElement;if(!p)break;for(const c of Array.from(p.children)){if(!(c instanceof HTMLElement)||c===a)continue;const h=b=>{if(dv(b))return  true;for(const y of Array.from(b.children))if(y instanceof HTMLElement&&h(y))return  true;return  false};if(h(c)){s=p;break}}a=p;}s&&(s.classList.contains(cv)||e.push(s));}return e}function gT(){return Pt.getCropVariants()}function ru(){return Pt.getPetVariants()}function Vh(e,t){return (t==="crops"?gT():ru())[e]??null}function dv(e){return e.style.backgroundImage&&e.style.backgroundImage.includes("Stamp")?true:window.getComputedStyle(e).backgroundImage.includes("Stamp")}function bT(e){let t=e.parentElement;for(let n=0;n<8&&t;n++){const r=t.querySelectorAll("div"),o=[];for(const i of r)dv(i)&&o.push(i);if(o.length>=4)return o;t=t.parentElement;}return []}function vT(e,t){let n=e.parentElement;for(let r=0;r<6&&n;r++){const o=[];for(const i of t)n.contains(i)&&o.push(i);if(o.length===1){const i=o[0];return t.indexOf(i)}n=n.parentElement;}return  -1}function yT(e,t){return t>ru().length&&e>=ru().length?"ability":"variant"}function xT(e){const t=fT();if(!t)return;const n=hT();if(!n)return;const r=bT(e);if(r.length===0)return;const o=vT(e,r);if(o===-1)return;let i="";if(n==="crops"){const p=Vh(o,"crops");if(!p)return;i=cT(p,t.displayName);}else if(n==="pets")if(yT(o,r.length)==="variant"){const c=Vh(o,"pets");if(!c)return;i=dT(c,t.displayName);}else i=lT(t.id);e.classList.add(cv);const a=()=>Hh(e,i),s=()=>gl(),d=p=>{p.stopPropagation(),Hh(e,i),setTimeout(()=>gl(),3e3);};e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",s),e.addEventListener("click",d),Ki.add(()=>{e.removeEventListener("mouseenter",a),e.removeEventListener("mouseleave",s),e.removeEventListener("click",d);});}function uv(){const e=mT();if(e.length!==0)for(const t of e)xT(t);}function wT(){const e=new MutationObserver(()=>{qo&&uv();});e.observe(document.body,{childList:true,subtree:true}),ri(Ki,e);}function CT(){qo||(qo=true,uv(),wT());}function kT(){qo&&(qo=false,Ki.run(),Ki.clear(),Ki=Ht(),gl());}function ST(){return qo}const AT=Object.freeze(Object.defineProperty({__proto__:null,destroy:kT,init:CT,isEnabled:ST},Symbol.toStringTag,{value:"Module"}));function Pa(){const e=document.querySelectorAll('.chakra-box, [class*="Box"], div');for(const n of e)if(n.style.backgroundImage?.includes("GardenJournal")||window.getComputedStyle(n).backgroundImage?.includes("GardenJournal"))return n;const t=document.querySelectorAll(".chakra-text, p, span");for(const n of t)if(n.textContent?.includes("GARDEN JOURNAL")){let r=n.parentElement;for(let o=0;o<10&&r;o++){if(r.classList.contains("McGrid")||r.querySelector(".McGrid"))return r;r=r.parentElement;}}return null}function ET(){const e=Pa();if(!e)return null;const t=e.querySelectorAll(".McFlex");for(const n of t){const r=window.getComputedStyle(n);if((r.overflowY==="auto"||r.overflowY==="scroll")&&n.querySelector(":scope > .McGrid"))return n}return null}function pv(){const e=Pa();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}let Ro=Ht(),ca=false,hr={filter:"all",sort:"default"};const fv="gemini-journal-filterSort";function _T(){const e=Pa();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t)if((n.textContent?.trim()??"").match(/Collected\s+\d+%/i))return n;return null}function IT(){const e=ET();return e?Array.from(e.querySelectorAll(":scope > .McGrid")).filter(n=>(n.textContent??"").match(/\d+\/\d+/)!==null):[]}function TT(){const e=document.createElement("div");e.className=fv,e.style.cssText=`
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
    `,n.value=hr.filter,n.onchange=()=>{hr.filter=n.value,ar(()=>ou());};const r=document.createElement("span");r.textContent="Sort:",r.style.cssText="color: #A88A6B; font-size: 11px; margin-left: 8px;";const o=document.createElement("select");for(const[i,a]of [["default","Default"],["alphabetical","A-Z"],["progress","By Progress"]]){const s=document.createElement("option");s.value=i,s.textContent=a,o.appendChild(s);}return o.style.cssText=n.style.cssText,o.value=hr.sort,o.onchange=()=>{hr.sort=o.value,ar(()=>ou());},e.append(t,n,r,o),e}function PT(e,t){const n=e.querySelectorAll(".chakra-text, p, span");let r="",o=0;for(const i of n){const a=i.textContent?.trim()??"",s=a.match(/^(\d+)\/(\d+)$/);if(s){const d=parseInt(s[1]),p=parseInt(s[2]);o=p>0?d/p*100:0;continue}a!=="???"&&!a.includes("%")&&a.length>=2&&a.length<=25&&(r=a);}return !r&&o===0?null:{el:e,name:r||"???",progress:o,originalOrder:t}}function ou(){const e=IT();if(e.length===0)return;const t=[];if(e.forEach((r,o)=>{const i=PT(r,o);i&&t.push(i);}),t.length===0)return;for(const r of t){let o=true;hr.filter==="missing"?o=r.progress<100:hr.filter==="collected"&&(o=r.progress===100),r.el.style.display=o?"":"none";}let n;switch(hr.sort){case "alphabetical":n=[...t].sort((r,o)=>r.name.localeCompare(o.name));break;case "progress":n=[...t].sort((r,o)=>o.progress-r.progress);break;default:n=[...t].sort((r,o)=>r.originalOrder-o.originalOrder);}n.forEach((r,o)=>{r.el.style.order=String(o);});}function LT(){if(document.querySelector(`.${fv}`))return;const e=_T();if(!e||!e.closest(".McFlex"))return;const n=TT(),r=e.nextElementSibling;if(r&&e.parentElement)e.parentElement.insertBefore(n,r);else if(e.parentElement)e.parentElement.appendChild(n);else return;Ro.add(()=>n.remove());}function zs(){ar(()=>{LT(),ou();});}let Gr=null;function MT(){Gr!==null&&clearTimeout(Gr),Gr=window.setTimeout(()=>{Ql()||zs(),Gr=null;},200);}function RT(){setTimeout(zs,100),setTimeout(zs,400),setTimeout(zs,800);const e=new MutationObserver(()=>{Ql()||MT();});e.observe(document.body,{childList:true,subtree:true}),ri(Ro,e),Ro.add(()=>{Gr!==null&&(clearTimeout(Gr),Gr=null);});}function FT(){hr={filter:"all",sort:"default"},Ro.run(),Ro.clear(),Ro=Ht();}function OT(){ca||(ca=true,RT(),console.log("[JournalFilterSort] Initialized"));}function NT(){ca&&(ca=false,FT(),console.log("[JournalFilterSort] Destroyed"));}function DT(){return ca}const $T=Object.freeze(Object.defineProperty({__proto__:null,destroy:NT,init:OT,isEnabled:DT},Symbol.toStringTag,{value:"Module"}));let Un=Ht(),vr=Ht(),da=false,Qr=false;const ec="gemini-journal-allTab",iu="gemini-journal-allOverlay";let Ni="all",bl="default";function hv(){const e=Pa();if(!e)return null;const t=e.querySelectorAll(".chakra-text, p, span");for(const n of t){const r=n.textContent?.trim();if(r==="Crops"||r==="Pets"){const o=n.closest("button");if(o){const i=o.parentElement;if(i&&i.querySelectorAll("button").length>=2)return i}}}return null}function _p(){const e=hv();if(!e)return {crops:null,pets:null};let t=null,n=null;const r=e.querySelectorAll("button");for(const o of r){const i=o.textContent?.trim();i==="Crops"&&(t=o),i==="Pets"&&(n=o);}return {crops:t,pets:n}}function BT(){const{crops:e,pets:t}=_p();[e,t].forEach(n=>{if(!n)return;const r=n.querySelector("div");if(r){const o=r.querySelector("div");o instanceof HTMLElement&&(o.style.height="20px");}});}function mv(){const e=Pa();if(!e)return null;const t=e.querySelectorAll(".McGrid");for(const n of t){const r=n.querySelectorAll(":scope > .McFlex");for(const o of r){const i=window.getComputedStyle(o);if((i.overflow==="hidden"||i.overflowY==="hidden")&&(o.textContent?.includes("JOURNAL")||o.querySelector(".McGrid")))return o}}return null}function zT(e){return e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F"}function jT(){const e=document.createElement("button");e.className=ec,e.type="button",e.style.cssText=`
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
    `;const n=window.innerWidth<768,r=document.createElement("div");r.className="gemini-allTab-tab",r.style.cssText=`
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
    `;const o=document.createElement("span");o.textContent="All",o.style.cssText=`
        font-size: ${n?"12px":"14px"};
        font-weight: bold;
        color: white;
        position: relative;
        z-index: 2;
    `,r.appendChild(o),t.appendChild(r),e.appendChild(t);const i=()=>{const a=window.innerWidth<768;r.style.width=a?"70px":"100px",o.style.fontSize=a?"12px":"14px";};return window.addEventListener("resize",i),Un.add(()=>window.removeEventListener("resize",i)),e.onmouseenter=()=>{Qr||(r.style.height="25px");},e.onmouseleave=()=>{Qr||(r.style.height="20px");},e.onclick=a=>{a.preventDefault(),a.stopPropagation(),ar(()=>HT());},e}async function GT(e,t){const n=document.createElement("div");n.style.cssText=`
        display: grid;
        grid-template-columns: 50px 1fr;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    `;const r=document.createElement("div");r.style.cssText=`
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    `;const o=e.variantsLogged.length===0;if(o){const S=document.createElement("span");S.textContent="?",S.style.cssText="font-size: 24px; color: rgba(168, 138, 107, 0.6); font-weight: bold;",r.appendChild(S);}else try{if(Ne.isReady()){const S=t==="crop"?"plant":"pet";let I=e.species;t==="crop"&&(e.species==="DawnCelestial"&&(I="DawnCelestialCrop"),e.species==="MoonCelestial"&&(I="MoonCelestialCrop"),e.species==="OrangeTulip"&&(I="Tulip"));const E=async(R,D)=>{try{if(Ne.has(R,D))return await Ne.toCanvas(R,D,{scale:.5})}catch{}return null},M=await E(S,I)||(t==="crop"?await E("tallplant",I):null)||await E(S,I.toLowerCase())||(t==="crop"?await E("tallplant",I.toLowerCase()):null);if(M)M.style.cssText="max-width: 46px; max-height: 46px; display: block;",r.appendChild(M);else {const R=document.createElement("span");R.textContent=t==="crop"?"🌱":"🐾",R.style.cssText="font-size: 20px;",r.appendChild(R);}}else {const S=document.createElement("span");S.textContent=t==="crop"?"🌱":"🐾",S.style.cssText="font-size: 20px;",r.appendChild(S);}}catch{const S=document.createElement("span");S.textContent=t==="crop"?"🌱":"🐾",S.style.cssText="font-size: 20px;",r.appendChild(S);}let i,a,s;if(t==="pet"){const S=e.abilitiesLogged?.length??0,I=e.abilitiesTotal??0;i=e.variantsLogged.length+S,a=e.variantsTotal+I,s=a>0?i/a*100:0;}else i=e.variantsLogged.length,a=e.variantsTotal,s=e.variantsPercentage;const d=zT(s),p=document.createElement("div");p.style.cssText=`
        position: relative;
        background: #D4C4A8;
        border-radius: 5px;
        padding: 6px 12px;
        overflow: hidden;
        flex: 1;
        min-width: 0;
    `;const c=document.createElement("div");c.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${s}%;
        background: ${d};
        border-radius: inherit;
        transition: width 0.3s ease;
    `;const h=document.createElement("div");h.style.cssText=`
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        position: relative;
        z-index: 1;
    `;const b=lv(e.species,t),y=document.createElement("span");y.style.cssText="font-weight: bold; font-size: 13px; color: #3D3325; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",y.textContent=o?"???":b;const g=document.createElement("span");return g.style.cssText=`font-size: 12px; font-weight: bold; color: ${s<100?"#8B6914":"#3D3325"}; margin-left: 4px; flex-shrink: 0;`,g.textContent=`${i}/${a}`,h.append(y,g),p.append(c,h),n.append(r,p),n.onclick=S=>{S.preventDefault(),S.stopPropagation(),UT(e.species,t);},n.onmouseenter=()=>{n.style.opacity="0.8";},n.onmouseleave=()=>{n.style.opacity="1";},n}function UT(e,t){ar(()=>Ip()),setTimeout(()=>{const{crops:n,pets:r}=_p(),o=t==="crop"?n:r;o&&(o.click(),setTimeout(()=>{const i=mv();if(!i)return;const a=i.querySelectorAll(".McGrid");for(const s of a){const d=s.textContent??"";if(d.toLowerCase().includes(e.toLowerCase())||d.includes(lv(e,t))){s.click();break}}setTimeout(()=>{ar(()=>bv());},100);},200));},100);}async function qh(e,t,n){const r=document.createElement("div");r.style.cssText="margin-bottom: 16px;";let o=0,i=0;for(const h of t)n==="pet"?(o+=h.variantsLogged.length+(h.abilitiesLogged?.length??0),i+=h.variantsTotal+(h.abilitiesTotal??0)):(o+=h.variantsLogged.length,i+=h.variantsTotal);const a=document.createElement("div"),s=n==="crop"?"#7cb342":"#9575cd";a.style.cssText=`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        margin-bottom: 12px;
        border-bottom: 2px solid rgba(212, 196, 168, 0.3);
    `;const d=document.createElement("span");d.textContent=e,d.style.cssText=`font-size: 16px; font-weight: 600; font-family: shrikhand, serif; color: ${s}; text-transform: uppercase;`;const p=document.createElement("span");p.textContent=`${o}/${i}`,p.style.cssText="color: #A88A6B; font-size: 12px; font-weight: bold;",a.append(d,p);const c=document.createElement("div");c.style.cssText="display: flex; flex-direction: column; gap: 12px; padding: 0 4px;";for(const h of t)c.appendChild(await GT(h,n));return r.append(a,c),r}async function gv(){const e=Pt.getMyJournal(),t=Pt.calculateProduceProgress(e),n=Pt.calculatePetProgress(e),r=document.createElement("div");r.className="gemini-journal-allContent",r.style.cssText=`
        padding: 12px 16px;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;const o=document.createElement("div");o.style.cssText="text-align: center; padding-bottom: 8px;";const i=document.createElement("p");i.textContent="GARDEN JOURNAL",i.style.cssText="font-size: 20px; font-weight: bold; font-family: shrikhand, serif; color: #4F6981; margin-bottom: 4px;";const a=t.variantsLogged+n.variantsLogged+(n.abilitiesLogged??0),s=t.variantsTotal+n.variantsTotal+(n.abilitiesTotal??0),d=Math.floor(a/s*100),p=document.createElement("p");p.style.cssText="font-size: 14px; font-weight: bold; color: #4F6981; margin-top: -2px;",p.textContent=`Collected ${d}% `;const c=document.createElement("span");c.className="chakra-text",c.style.cssText="color: #A88A6B; font-size: 12px; font-weight: bold;",c.textContent=`(${a}/${s})`,p.appendChild(c);const h=document.createElement("div");h.style.cssText="height: 4px; background: #D4C4A8; border-radius: 9999px; opacity: 0.5; margin: 8px 0;",o.append(i,p,h);const b=document.createElement("div");b.style.cssText=`
        display: flex;
        gap: 12px;
        padding: 6px 0;
        margin-bottom: 8px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    `;const y=document.createElement("span");y.textContent="Filter:",y.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold;";const g=document.createElement("select");for(const[D,N]of [["all","All"],["missing","Missing"],["complete","Complete"]]){const P=document.createElement("option");P.value=D,P.textContent=N,g.appendChild(P);}g.value=Ni,g.style.cssText=`
        background: #D4C8B8;
        color: #3D3325;
        border: 1px solid #8B7355;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 10px;
        cursor: pointer;
    `,g.onchange=()=>{Ni=g.value,Yh();};const S=document.createElement("span");S.textContent="Sort:",S.style.cssText="color: #A88A6B; font-size: 11px; font-weight: bold; margin-left: 8px;";const I=document.createElement("select");for(const[D,N]of [["default","Default"],["az","A-Z"],["progress","By Progress"]]){const P=document.createElement("option");P.value=D,P.textContent=N,I.appendChild(P);}I.value=bl,I.style.cssText=g.style.cssText,I.onchange=()=>{bl=I.value,Yh();},b.append(y,g,S,I);const E=document.createElement("div");E.className="gemini-all-scroll",E.style.cssText=`
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
    `,WT();const M=Kh(t.speciesDetails,"crop"),R=Kh(n.speciesDetails,"pet");if(M.length>0&&E.appendChild(await qh("Crops",M,"crop")),R.length>0&&E.appendChild(await qh("Pets",R,"pet")),M.length===0&&R.length===0){const D=document.createElement("div");D.style.cssText="text-align: center; padding: 40px 20px; color: #A88A6B; font-size: 14px;",D.textContent=Ni==="missing"?"All entries are complete!":Ni==="complete"?"No complete entries yet.":"No entries found.",E.appendChild(D);}return r.append(o,b,E),r}function Kh(e,t){let n=e.filter(r=>{let o,i;t==="pet"?(o=r.variantsLogged.length+(r.abilitiesLogged?.length??0),i=r.variantsTotal+(r.abilitiesTotal??0)):(o=r.variantsLogged.length,i=r.variantsTotal);const a=i>0?o/i*100:0;switch(Ni){case "missing":return a<100;case "complete":return a>=100;default:return  true}});return bl==="az"?n=[...n].sort((r,o)=>r.species.localeCompare(o.species)):bl==="progress"&&(n=[...n].sort((r,o)=>{const i=t==="pet"?r.variantsLogged.length+(r.abilitiesLogged?.length??0):r.variantsLogged.length,a=t==="pet"?r.variantsTotal+(r.abilitiesTotal??0):r.variantsTotal,s=a>0?i/a:0,d=t==="pet"?o.variantsLogged.length+(o.abilitiesLogged?.length??0):o.variantsLogged.length,p=t==="pet"?o.variantsTotal+(o.abilitiesTotal??0):o.variantsTotal;return (p>0?d/p:0)-s})),n}let ad=false;function WT(){if(ad)return;ad=true;const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e),Un.add(()=>{e.remove(),ad=false;});}async function Yh(){const e=document.querySelector(`.${iu}`);if(e){for(;e.firstChild;)e.firstChild.remove();e.appendChild(await gv());}}async function HT(){if(Qr)return;Qr=true;const t=document.querySelector(`.${ec}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="35px"),BT();const n=mv();if(!n){console.warn("[JournalAllTab] Cannot activate All tab: content wrapper not found"),Qr=false;return}const r=[];for(const a of Array.from(n.children))a instanceof HTMLElement&&!a.classList.contains(iu)&&(r.push(a),a.style.visibility="hidden");vr.add(()=>{for(const a of r)a.style.visibility="";});const o=document.createElement("div");o.className=iu,o.style.cssText=`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: transparent;
        display: flex;
        flex-direction: column;
    `,window.getComputedStyle(n).position==="static"&&(n.style.position="relative",vr.add(()=>{n.style.position="";})),o.appendChild(await gv()),n.appendChild(o),vr.add(()=>o.remove()),VT(),console.log("[JournalAllTab] All tab activated");}function VT(){const e=pv();if(!e)return;const t=Pt.getMyJournal(),n=Pt.calculateProduceProgress(t),r=Pt.calculatePetProgress(t),o=n.variantsLogged+r.variantsLogged+(r.abilitiesLogged??0),i=n.variantsTotal+r.variantsTotal+(r.abilitiesTotal??0),a=Math.floor(o/i*100);if(!e.hasAttribute("data-original-percent")){const p=e.textContent?.match(/Collected\s+(\d+)%/);p&&e.setAttribute("data-original-percent",p[1]);}const s=e.querySelector("span.chakra-text");s&&!s.hasAttribute("data-original-count")&&s.setAttribute("data-original-count",s.textContent||"");const d=e.childNodes[0];d&&d.nodeType===Node.TEXT_NODE&&(d.textContent=`Collected ${a}% `),s&&(s.textContent=`(${o}/${i})`);}function qT(){const e=pv();if(!e)return;const t=e.getAttribute("data-original-percent");if(t){const r=e.childNodes[0];r&&r.nodeType===Node.TEXT_NODE&&(r.textContent=`Collected ${t}% `),e.removeAttribute("data-original-percent");}const n=e.querySelector("span.chakra-text");if(n){const r=n.getAttribute("data-original-count");r&&(n.textContent=r),n.removeAttribute("data-original-count");}}function Ip(){if(!Qr)return;Qr=false;const t=document.querySelector(`.${ec}`)?.querySelector(".gemini-allTab-tab");t&&(t.style.height="20px"),vr.run(),vr=Ht(),qT(),console.log("[JournalAllTab] All tab deactivated");}function bv(){const e=hv();if(!e||e.querySelector(`.${ec}`))return;const{crops:t,pets:n}=_p();if(!t)return;const r=jT();e.insertBefore(r,t),Un.add(()=>r.remove());const o=()=>{ar(()=>Ip());};t&&(t.addEventListener("click",o),Un.add(()=>t.removeEventListener("click",o))),n&&(n.addEventListener("click",o),Un.add(()=>n.removeEventListener("click",o))),console.log("[JournalAllTab] Tab injected");}function js(){ar(()=>{bv();});}let Ur=null;function KT(){Ur!==null&&clearTimeout(Ur),Ur=window.setTimeout(()=>{Ql()||js(),Ur=null;},200);}function YT(){setTimeout(js,100),setTimeout(js,400),setTimeout(js,800);const e=new MutationObserver(()=>{Ql()||KT();});e.observe(document.body,{childList:true,subtree:true}),ri(Un,e),Un.add(()=>{Ur!==null&&(clearTimeout(Ur),Ur=null);});}function XT(){Ip(),vr.run(),vr.clear(),Un.run(),Un.clear(),vr=Ht(),Un=Ht();}function JT(){da||(da=true,YT(),console.log("[JournalAllTab] Initialized"));}function QT(){da&&(da=false,XT(),console.log("[JournalAllTab] Destroyed"));}function ZT(){return da}const e2=Object.freeze(Object.defineProperty({__proto__:null,destroy:QT,init:JT,isEnabled:ZT},Symbol.toStringTag,{value:"Module"}));function t2(){const e=il();tt(Nr.JOURNAL_HINTS,true),tt(Nr.JOURNAL_FILTER_SORT,true),e.register({id:"abilitiesInject",name:"Journal Abilities",description:"Shows pet abilities in journal modal",injection:nT,storageKey:Nr.ABILITIES_INJECT,defaultEnabled:true}),e.register({id:"journalHints",name:"Journal Hints",description:"Shows hints for missing journal entries on hover",injection:AT,storageKey:Nr.JOURNAL_HINTS,defaultEnabled:true}),e.register({id:"journalFilterSort",name:"Journal Filter/Sort",description:"Adds filter and sort controls to journal overview",injection:$T,storageKey:Nr.JOURNAL_FILTER_SORT,defaultEnabled:true}),e.register({id:"journalAllTab",name:"Journal All Tab",description:"Adds an All tab showing combined crops and pets view",injection:e2,storageKey:Nr.JOURNAL_ALL_TAB,defaultEnabled:true});}const Xh=ct.JOURNAL,sd={injections:{abilitiesInject:true,journalHints:true,journalFilterSort:true,journalAllTab:true}};function n2(){const e=Qe(Xh,null);return e||(Qe(ct.JOURNAL_CHECKER,null)&&tt(Xh,sd),sd)}let xi=false;const Pt={init(){xi||(xi=true,n2(),RI(),t2());},destroy(){xi&&(xi=false,FI());},isReady(){return xi},getProgress(){return null},getMyJournal:Zb,getCropVariants:ev,getPetVariants:tv,getAllMutations:LI,getPetAbilities:nv,calculateProduceProgress:rv,calculatePetProgress:ov,aggregateJournalProgress:Jl,getMissingSummary:MI,refresh:OI,dispatchUpdate:kp};class r2{constructor(){ve(this,"achievements",new Map);ve(this,"data");ve(this,"STORAGE_KEY",ct.ACHIEVEMENTS);ve(this,"onUnlockCallbacks",[]);ve(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Qe(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){tt(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=o>=n.target;return !r&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Yi=null;function wn(){return Yi||(Yi=new r2),Yi}function o2(){Yi&&(Yi=null);}let ms=false;const i2={init(){ms||(wn(),ms=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return ms},getManager(){return wn()},register:(...e)=>wn().register(...e),registerMany:(...e)=>wn().registerMany(...e),isUnlocked:(...e)=>wn().isUnlocked(...e),getAll:()=>wn().getAllAchievements(),getUnlocked:()=>wn().getUnlockedAchievements(),getStats:()=>wn().getCompletionStats(),checkAll:()=>wn().checkAllAchievements(),onUnlock:(...e)=>wn().onUnlock(...e),onProgress:(...e)=>wn().onProgress(...e),destroy(){o2(),ms=false;}},a2={enabled:true},vv=ct.ANTI_AFK,s2=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],l2=25e3,c2=1,d2=1e-5,Ge={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function u2(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),Ge.listeners.push({type:n,handler:r,target:t});};for(const t of s2)e(document,t),e(window,t);}function p2(){for(const{type:e,handler:t,target:n}of Ge.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}Ge.listeners.length=0;}function f2(){const e=Object.getPrototypeOf(document);Ge.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),Ge.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),Ge.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function h2(){const e=Object.getPrototypeOf(document);try{Ge.savedProps.hidden&&Object.defineProperty(e,"hidden",Ge.savedProps.hidden);}catch{}try{Ge.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",Ge.savedProps.visibilityState);}catch{}try{Ge.savedProps.hasFocus&&(document.hasFocus=Ge.savedProps.hasFocus);}catch{}}function vl(){Ge.audioCtx&&Ge.audioCtx.state!=="running"&&Ge.audioCtx.resume?.().catch(()=>{});}function m2(){try{const e=window.AudioContext||window.webkitAudioContext;Ge.audioCtx=new e({latencyHint:"interactive"}),Ge.gainNode=Ge.audioCtx.createGain(),Ge.gainNode.gain.value=d2,Ge.oscillator=Ge.audioCtx.createOscillator(),Ge.oscillator.frequency.value=c2,Ge.oscillator.connect(Ge.gainNode).connect(Ge.audioCtx.destination),Ge.oscillator.start(),document.addEventListener("visibilitychange",vl,{capture:!0}),window.addEventListener("focus",vl,{capture:!0});}catch{yv();}}function yv(){try{Ge.oscillator?.stop();}catch{}try{Ge.oscillator?.disconnect(),Ge.gainNode?.disconnect();}catch{}try{Ge.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",vl,{capture:true}),window.removeEventListener("focus",vl,{capture:true}),Ge.oscillator=null,Ge.gainNode=null,Ge.audioCtx=null;}function g2(){const e=document.querySelector("canvas")||document.body||document.documentElement;Ge.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},l2);}function b2(){Ge.heartbeatInterval!==null&&(clearInterval(Ge.heartbeatInterval),Ge.heartbeatInterval=null);}function ld(){f2(),u2(),m2(),g2();}function cd(){b2(),yv(),p2(),h2();}let gs=false,cn=false;function vo(){return Qe(vv,a2)}function dd(e){tt(vv,e);}const Fo={init(){if(gs)return;const e=vo();gs=true,e.enabled?(ld(),cn=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return gs},isRunning(){return cn},isEnabled(){return vo().enabled},enable(){const e=vo();e.enabled=true,dd(e),cn||(ld(),cn=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=vo();e.enabled=false,dd(e),cn&&(cd(),cn=false,console.log("[MGAntiAfk] Disabled"));},toggle(){Fo.isEnabled()?Fo.disable():Fo.enable();},getConfig(){return vo()},updateConfig(e){const n={...vo(),...e};dd(n),n.enabled&&!cn?(ld(),cn=true):!n.enabled&&cn&&(cd(),cn=false);},destroy(){cn&&(cd(),cn=false),gs=false,console.log("[MGAntiAfk] Destroyed");}},xv=ct.PET_TEAM,v2={enabled:false,teams:[],activeTeamId:null},Tp=3,Jh=50,At="";function Ot(){return Qe(xv,v2)}function kr(e){tt(xv,e);}function y2(e){const n={...Ot(),...e};return kr(n),n}function x2(){return Ot().enabled}function w2(e){y2({enabled:e});}function C2(){return crypto.randomUUID()}function au(){return Date.now()}function wv(e=[]){const t=[...e];for(;t.length<Tp;)t.push(At);return [t[0]||At,t[1]||At,t[2]||At]}function Cv(e,t){const n=Ot(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function kv(e,t){const n=Ot();if(!e.some(i=>i!==At))return  true;const o=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===o)}function Sv(e){const n=uo().get(),r=new Set(n.all.map(i=>i.id)),o=Ot();for(const i of o.teams)for(const a of i.petIds)a!==At&&r.add(a);for(const i of e)if(i!==At&&!r.has(i))return  false;return  true}function k2(e){const n=uo().get(),r=new Map(n.all.map(i=>[i.id,i])),o=[];for(const i of e.petIds){if(i===At)continue;const a=r.get(i);a&&o.push(a);}return o}function S2(e){return e.petIds.every(t=>t!==At)}function A2(e){const t=[];for(let n=0;n<Tp;n++)e.petIds[n]===At&&t.push(n);return t}function E2(e){return e.petIds.filter(t=>t!==At).length}function _2(e){return e.petIds.every(t=>t===At)}function I2(e,t){return e.petIds.includes(t)}function T2(e,t){return e.petIds.indexOf(t)}function P2(e,t=[]){const n=Ot();if(n.teams.length>=Jh)throw new Error(`Maximum number of teams (${Jh}) reached`);if(!Cv(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=wv(t);if(!Sv(o))throw new Error("One or more pet IDs do not exist");if(!kv(o))throw new Error("A team with this exact composition already exists");const i={id:C2(),name:r,petIds:o,createdAt:au(),updatedAt:au()};return n.teams.push(i),kr(n),i}function Av(e,t){const n=Ot(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!Cv(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=wv(t.petIds);if(!Sv(a))throw new Error("One or more pet IDs do not exist");if(!kv(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:au()};return n.teams[r]=i,kr(n),i}function L2(e){const t=Ot(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(kr(t),true)}function M2(e){return Ot().teams.find(n=>n.id===e)??null}function R2(){return [...Ot().teams]}function F2(e){const t=Ot(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function O2(e){const t=Ot(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),kr(t),true}function N2(e,t){try{return Av(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function D2(){const n=uo().get().byLocation.active.map(o=>o.id).sort(),r=Ot();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return o.id}return null}function Ev(){const e=D2(),t=Ot();return e!==t.activeTeamId&&(t.activeTeamId=e,kr(t)),e}function _v(e){const t=Ot();t.activeTeamId=e,kr(t);}function $2(e){return Ev()===e}function B2(e){const t=uo(),n=po(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=r.byLocation.active,a=e.petIds.filter(c=>c!==At).sort(),s=i.map(c=>c.id).sort();if(JSON.stringify(a)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const d=r.hutch,p=d.hasHutch?d.maxItems-d.currentItems:0;z2(e.petIds,p,r),_v(e.id),console.log("[PetTeam] Team activated successfully");}function z2(e,t,n){const r=n.byLocation.active;let o=t,i=0;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<Tp;a++){const s=e[a],d=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${d?.id.slice(0,8)??"empty"}, target=${s.slice(0,8)||"empty"}, hutchSpace=${o}`),d?.id===s){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(s===At&&d){const p=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${p}`),j2(d.id,p),p&&o--;continue}if(!d&&s!==At){const c=n.all.find(h=>h.id===s)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${c}`),c&&o++,U2(s,n,i),i++;continue}if(d&&s!==At){const c=n.all.find(b=>b.id===s)?.location==="hutch";c&&o++;const h=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${c}, storeInHutch=${h}`),W2(d.id,s,n,h),h&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function j2(e,t){Ab(e),t&&ap(e);}function G2(e){const t=co().get(),n=t.tiles.tileObjects[e]??t.tiles.tileObjects[0];return n?{position:n.position,tileType:"Dirt",localTileIndex:n.localIndex}:{position:{x:0,y:0},tileType:"Dirt",localTileIndex:0}}function U2(e,t,n){const r=t.all.find(s=>s.id===e);if(!r){console.warn(`[PetTeam] Pet ${e} not found`);return}r.location==="hutch"&&sp(e);const{position:o,tileType:i,localTileIndex:a}=G2(n);kb(e,o,i,a);}function W2(e,t,n,r){const o=n.all.find(i=>i.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&sp(t),Sb(e,t),r&&ap(e);}function H2(){try{return localStorage.getItem("aries_mod")!==null}catch(e){return console.warn("[PetTeam] Failed to access localStorage:",e),false}}function V2(){try{const e=localStorage.getItem("aries_mod");if(!e)return [];const n=JSON.parse(e)?.pets?.teams;return Array.isArray(n)?n.filter(r=>r&&typeof r=="object"):[]}catch(e){return console.warn("[PetTeam] Failed to read Aries teams:",e),[]}}function q2(e){const t=Date.now(),n=e.slots||[],r=[typeof n[0]=="string"?n[0]:At,typeof n[1]=="string"?n[1]:At,typeof n[2]=="string"?n[2]:At];return {name:e.name?.trim()||"Imported Team",petIds:r,createdAt:t,updatedAt:t}}function K2(){const e={success:false,source:"none",imported:0,errors:[]};if(!H2())return e.errors.push("Aries mod not detected. Install Aries mod first."),e;const t=V2();if(t.length===0)return e.errors.push("No teams found in Aries mod. Create teams in Aries first."),e;const n=Ot();n.teams=[],n.activeTeamId=null;const r=new Set;for(const o of t)try{const i=q2(o);let a=i.name;if(r.has(a)){let d=1;for(;r.has(`${a} (${d})`);)d++;a=`${a} (${d})`;}r.add(a);const s={id:crypto.randomUUID(),name:a,petIds:i.petIds,createdAt:i.createdAt,updatedAt:i.updatedAt};n.teams.push(s),e.imported++;}catch(i){const a=i instanceof Error?i.message:String(i);e.errors.push(`Failed to import "${o.name}": ${a}`);}return e.imported>0&&(kr(n),e.success=true,e.source="aries"),e}let bs=false;const pt={init(){if(bs)return;if(!Ot().enabled){console.log("[PetTeam] Feature disabled");return}bs=true,console.log("[PetTeam] Feature initialized");},destroy(){bs&&(bs=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:x2,setEnabled:w2,createTeam:P2,updateTeam:Av,deleteTeam:L2,renameTeam:N2,getTeam:M2,getAllTeams:R2,getTeamByName:F2,reorderTeams:O2,getPetsForTeam:k2,isTeamFull:S2,getEmptySlots:A2,getFilledSlotCount:E2,isTeamEmpty:_2,isPetInTeam:I2,getPetSlotIndex:T2,getActiveTeamId:Ev,setActiveTeamId:_v,isActiveTeam:$2,activateTeam:B2,importFromAries:K2},Y2=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],Iv=ct.XP_TRACKER,X2={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},Oo="XP Tracker",No="[XpTracker]";function oi(){return Qe(Iv,X2)}function Tv(e){tt(Iv,e);}function Pv(e){const n={...oi(),...e};return Tv(n),n}function Lv(){return oi().enabled}function J2(e){Pv({enabled:e});}function Pp(e){return Y2.includes(e)}function Q2(e){const t=ke.get("abilities");if(!t)return null;const n=t[e];return !n||!Pp(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function Mv(e){return e.filter(Pp)}function Z2(e){return e.some(Pp)}function eP(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function Rv(e,t,n,r=100){const o=Q2(e);if(!o)return null;const i=eP(e),a=o.requiredWeather,s=a===null||n===a,d=t/r,p=d*d,c=o.baseProbability,h=o.bonusXp,b=c,y=Math.floor(h*p),g=b/100*60,S=s?Math.floor(g*y):0;return {abilityId:e,abilityName:o.name,tier:i,baseChancePerMinute:c,actualChancePerMinute:b,baseXpPerProc:h,actualXpPerProc:y,expectedProcsPerHour:g,expectedXpPerHour:S,requiredWeather:a,isActive:s}}function tP(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=Mv(r.abilities);for(const i of o){const a=Rv(i,r.strength,t,r.maxStrength||100);a&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:a}),a.isActive&&(n.totalBonusXpPerHour+=a.expectedXpPerHour,n.totalProcsPerHour+=a.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function nP(e,t,n,r=100){const o=Mv(e);return o.length===0?null:Rv(o[0],t,n,r)}function Qh(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function rP(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function oP(e,t){return e.species.localeCompare(t.species)}function iP(e,t){return t.currentStrength-e.currentStrength}function aP(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function sP(e,t){return e.name.localeCompare(t.name)}function lP(e){switch(e){case "closestToMax":return Qh;case "furthestFromMax":return rP;case "species":return oP;case "strength":return iP;case "location":return aP;case "name":return sP;default:return Qh}}function Fv(e,t){const n=lP(t);return [...e].sort(n)}function cP(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function dP(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function Ov(e,t){let n=e;return n=cP(n,t.filterSpecies),n=dP(n,t.filterHasXpBoost),n=Fv(n,t.sortBy),n}let Ko=false,Gs=null,tc=[],Lp=null;function uP(e,t,n){const r=Rb(e.petSpecies,e.targetScale),o=Fb(e.petSpecies,e.xp,r),i=o>=r,a=e.hunger<=0,s=a?0:rr,d=nP(e.abilities,o,t);d?.isActive&&d.expectedXpPerHour;const p=e.location==="active"&&!a?s+n:0,c=Db(e.petSpecies,e.xp,o,r,p>0?p:rr),h=Nb(e.petSpecies,e.xp,r,p>0?p:rr),b=$b(e.petSpecies,e.hunger,c),y=fl(e.petSpecies,e.hunger,h);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:a,currentStrength:o,maxStrength:r,isMaxStrength:i,hoursToNextStrength:c,hoursToMaxStrength:h,feedsToNextStrength:b,feedsToMaxStrength:y,baseXpPerHour:s,totalXpPerHour:p,xpBoostStats:d,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function Nv(){const e=Ut.myPets.get(),t=Ut.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(d=>!d.isMature||Z2(d.abilities)).filter(d=>d.hunger>0).map(d=>({petId:d.id,petName:d.name??"",abilities:d.abilities,strength:d.currentStrength})),i=tP(o,n);Lp=i;const a=[];for(const d of e.all){const p=uP({id:d.id,petSpecies:d.petSpecies,name:d.name??"",xp:d.xp,hunger:d.hunger,targetScale:d.targetScale,abilities:d.abilities,mutations:d.mutations,location:d.location},n,i.totalBonusXpPerHour);a.push(p);}const s=Math.max(0,...a.map(d=>d.hoursToMaxStrength));for(const d of a)d.isMaxStrength&&d.xpBoostStats&&(d.feedsToMaxStrength=Bb(true,true,d.species,d.hunger,0,s));return a}function Dv(){if(Ko)return;if(!oi().enabled){console.log(`${No} ${Oo} disabled`);return}console.log(`${No} Initializing ${Oo}...`),ke.isReady()&&(tc=Nv()),Ko=true,console.log(`${No} ${Oo} initialized`);}function Mp(){return Ko&&ke.isReady()}function Rp(){return Mp()?tc:[]}function pP(){return Rp().filter(e=>e.location==="active")}function fP(){return Lp}function Fp(){Mp()&&(tc=Nv());}function hP(e){Op();const t=oi(),n=e??t.updateIntervalMs;Gs=setInterval(()=>{Lv()&&Fp();},n);}function Op(){Gs&&(clearInterval(Gs),Gs=null);}function $v(){Ko&&(Op(),Ko=false,tc=[],Lp=null,console.log(`${No} ${Oo} destroyed`));}function mP(){const e=oi();return Ov(Rp(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function gP(e){J2(e),e?(Ko=false,Dv(),ke.isReady()&&Fp(),console.log(`${No} ${Oo} enabled`)):($v(),console.log(`${No} ${Oo} disabled`));}const su={init:Dv,isReady:Mp,destroy:$v,loadConfig:oi,saveConfig:Tv,updateConfig:Pv,isEnabled:Lv,setEnabled:gP,getAllPetsProgress:Rp,getActivePetsProgress:pP,getCombinedBoostStats:fP,getFilteredPets:mP,refresh:Fp,startAutoUpdate:hP,stopAutoUpdate:Op,sortPets:Fv,filterAndSortPets:Ov},bP={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},vP={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(bP),...Object.keys(vP)];let Xi=null;function Bv(){const t=ft().get().plant;if(!t)return;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n&&sa(n.species,n.targetScale,n.mutations||[]);}function yP(e){Bv();}function xP(){Xi&&zv(),Bv(),Xi=ft().subscribePlantInfo(yP,{immediate:true});}function zv(){Xi&&(Xi(),Xi=null);}const lu="css-qnqsp4",cu="css-v439q6";let Do=Ht(),du=false,wi=false,Us=null,uu=null,Wr=null;const wP=`
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
`;function CP(){if(du)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=wP,document.head.appendChild(e),Do.add(()=>e.remove()),du=true;}async function kP(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const r=document.createElement("canvas");r.width=20,r.height=20,n.appendChild(r);const o=document.createElement("div");o.className="gemini-qol-cropPrice-text",o.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(o);try{const i=await Ne.toCanvas("ui","Coin");if(i&&r.parentElement){const a=r.getContext("2d");if(a){const s=Math.min(r.width/i.width,r.height/i.height),d=i.width*s,p=i.height*s,c=(r.width-d)/2,h=(r.height-p)/2;a.drawImage(i,c,h,d,p);}}}catch(i){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",i);}return t}function SP(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const r of n){const o=r.textContent?.trim();if(!o)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(o)&&t.push(o);}return t}function AP(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const r=n.textContent?.trim();if(!r)continue;const o=r.match(/^([\d.]+)\s*kg$/i);if(o)return parseFloat(o[1])}return 1}function EP(){const e=[],t=document.querySelectorAll(`.${lu}`);for(const r of t)r.offsetParent&&(r.closest("button.chakra-button")||e.push({element:r}));const n=document.querySelectorAll(`.${cu}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelectorAll(":scope > .McFlex > .McFlex");if(o.length>0){const i=o[o.length-1];i.querySelector("p.chakra-text")&&e.push({element:i});}}return e}function _P(){const t=ft().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?sa(n.species,n.targetScale,n.mutations||[]):0}function IP(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(".gemini-qol-cropPrice-text");o&&(o.textContent=e>0?e.toLocaleString():"");}}function TP(){Wr!==null&&cancelAnimationFrame(Wr),Wr=requestAnimationFrame(()=>{Wr=null;const e=_P();if(e===uu)return;uu=e;const n=ft().get().plant;!n||!(n.currentSlotIndex!==null&&n.slots[n.currentSlotIndex])||IP(e);});}async function Ci(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;const o=ft().get().plant;let i=0,a=null;if(o&&o.currentSlotIndex!==null){const d=o.slots[o.currentSlotIndex];d&&(a=d.species,i=sa(d.species,d.targetScale,d.mutations||[]));}if(i===0){const d=t.textContent?.trim();if(d){a=d;const p=AP(n),c=SP(n);i=sa(d,p,c);}}const s=await kP(i);n.appendChild(s),Do.add(()=>s.remove());}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function PP(){const e=EP();for(const n of e)Ci(n);Us=ft().subscribePlantInfo(()=>{TP();});const t=new MutationObserver(n=>{for(const r of n)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.classList.contains(lu)&&(o.closest("button.chakra-button")||Ci({element:o})),o.querySelectorAll(`.${lu}`).forEach(s=>{s.closest("button.chakra-button")||Ci({element:s});}),o.classList.contains(cu)&&!o.closest("button.chakra-button")){const s=o.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const d=s[s.length-1];d.querySelector("p.chakra-text")&&!d.querySelector(".gemini-qol-cropPrice")&&Ci({element:d});}}o.querySelectorAll(`.${cu}`).forEach(s=>{if(!s.closest("button.chakra-button")){const d=s.querySelectorAll(":scope > .McFlex > .McFlex");if(d.length>0){const p=d[d.length-1];p.querySelector("p.chakra-text")&&!p.querySelector(".gemini-qol-cropPrice")&&Ci({element:p});}}});}});});t.observe(document.body,{childList:true,subtree:true}),ri(Do,t);}const LP={init(){wi||(wi=true,CP(),PP());},destroy(){wi&&(wi=false,Wr!==null&&(cancelAnimationFrame(Wr),Wr=null),Us&&(Us(),Us=null),Do.run(),Do.clear(),Do=Ht(),du=false,uu=null);},isEnabled(){return wi}},jv=ct.CROP_VALUE_INDICATOR,MP={enabled:false};function Np(){return Qe(jv,MP)}function RP(e){tt(jv,e);}let ua=false;function Gv(){ua||!Np().enabled||(ua=true,xP());}function Uv(){ua&&(zv(),ua=false);}function FP(){return ua}function OP(){return Np().enabled}function NP(e){const t=Np();t.enabled!==e&&(t.enabled=e,RP(t),e?Gv():Uv());}const Ws={init:Gv,destroy:Uv,isReady:FP,isEnabled:OP,setEnabled:NP,render:LP},pa="css-qnqsp4",Dp="css-1cdcuw7",$p='[role="tooltip"]';let Hs=Ht(),ki=false,Vs=null,pu=null,Hr=null;function DP(){const e=[],t=document.querySelectorAll(`.${pa}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const r=n.querySelector(`.${Dp}`);r&&e.push({element:n,weightElement:r});}return e}function $P(){const t=ft().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?hp(n.species,n.targetScale):0}function BP(e,t){const n=document.querySelectorAll(`.${pa}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(`.${Dp}`);if(o){const i=o.querySelector("svg"),a=`${e}%`;o.textContent=a,i&&o.appendChild(i);}}yl(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function zP(){Hr!==null&&cancelAnimationFrame(Hr),Hr=requestAnimationFrame(()=>{Hr=null;const e=$P();if(e===pu)return;pu=e;const n=ft().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&BP(e,r);});}function Wv(e,t){const n=ke.get("plants");if(!n)return "";const r=n[e];return r?.crop?.baseWeight?`${(r.crop.baseWeight*t).toFixed(2)} kg`:""}function yl(){const e=document.querySelectorAll($p),n=ft().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=Wv(r.species,r.targetScale);for(const i of e){if(!i.offsetParent)continue;const a=i.textContent?.trim();a&&a.startsWith("Size:")&&o&&(i.textContent=o);}}function ud(){const e=DP();for(const t of e)if(t.weightElement)try{const r=ft().get().plant;if(r&&r.currentSlotIndex!==null){const o=r.slots[r.currentSlotIndex];if(o){const i=hp(o.species,o.targetScale),a=t.weightElement.querySelector("svg");t.weightElement.textContent=`${i}%`,a&&t.weightElement.appendChild(a);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}yl();}function jP(){const e=document.querySelectorAll(`.${pa}`),n=ft().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=Wv(r.species,r.targetScale);for(const a of e){if(!a.offsetParent||a.closest("button.chakra-button"))continue;const s=a.querySelector(`.${Dp}`);if(s){const d=s.querySelector("svg");s.textContent=o,d&&s.appendChild(d);}}const i=document.querySelectorAll($p);for(const a of i){if(!a.offsetParent)continue;const s=a.textContent?.trim();s&&!s.includes("kg")&&(a.textContent=o);}console.log("[CropSizeIndicator.render] Restored crop weights");}function GP(){ud(),Vs=ft().subscribePlantInfo(()=>{zP();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.hasAttribute("role")&&r.getAttribute("role")==="tooltip"){const a=r.textContent?.trim();a&&a.startsWith("Size:")&&yl();}r.classList.contains(pa)&&(r.closest("button.chakra-button")||ud()),r.querySelectorAll(`.${pa}`).length>0&&ud(),r.querySelectorAll($p).forEach(a=>{const s=a.textContent?.trim();s&&s.startsWith("Size:")&&yl();});}});});e.observe(document.body,{childList:true,subtree:true}),ri(Hs,e),console.log("[CropSizeIndicator.render] Started observing crops");}const Bp={init(){if(ki){console.log("[CropSizeIndicator.render] Already initialized");return}ki=true,GP(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){ki&&(ki=false,jP(),Hr!==null&&(cancelAnimationFrame(Hr),Hr=null),Vs&&(Vs(),Vs=null),Hs.run(),Hs.clear(),Hs=Ht(),pu=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return ki}},Hv=ct.CROP_SIZE_INDICATOR,UP={enabled:false};function zp(){return Qe(Hv,UP)}function WP(e){tt(Hv,e);}let fa=false;function Vv(){if(fa){console.log("[CropSizeIndicator] Already initialized");return}if(!zp().enabled){console.log("[CropSizeIndicator] Disabled");return}fa=true,console.log("[CropSizeIndicator] Initializing..."),Bp.init(),console.log("[CropSizeIndicator] Initialized successfully");}function qv(){fa&&(console.log("[CropSizeIndicator] Destroying..."),Bp.destroy(),fa=false,console.log("[CropSizeIndicator] Destroyed"));}function HP(){return fa}function VP(){return zp().enabled}function qP(e){const t=zp();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,WP(t),e?Vv():qv(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const qs={init:Vv,destroy:qv,isReady:HP,isEnabled:VP,setEnabled:qP,render:Bp},KP={Normal:{letter:"N",color:"#A88A6B",bold:false},Wet:{letter:"W",color:"rgba(76, 204, 204, 1)",bold:false},Chilled:{letter:"C",color:"rgba(144, 184, 204, 1)",bold:false},Frozen:{letter:"F",color:"rgba(148, 160, 204, 1)",bold:false},Dawnlit:{letter:"D",color:"rgb(245, 155, 225)",bold:false},Ambershine:{letter:"A",color:"rgb(255, 180, 120)",bold:false},Gold:{letter:"G",color:"linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)",bold:true,isGradient:true},Rainbow:{letter:"R",color:"linear-gradient(110deg, #ff003c, #ff9a00, #f0ff00, #30ff00, #00fbff, #0018ff, #e100ff)",bold:true,isGradient:true},Dawncharged:{letter:"D",color:"rgb(200, 150, 255)",bold:true},Ambercharged:{letter:"A",color:"rgb(250, 140, 75)",bold:true},"Max Weight":{letter:"S",color:"#717171",bold:false}};function YP(e){const t=KP[e];if(!t){const r=document.createElement("span");return r.textContent=e.charAt(0).toUpperCase(),r.style.cssText="color: #888; font-size: 18px;",r}const n=document.createElement("span");return n.textContent=t.letter,n.title=e,t.isGradient?n.style.cssText=`
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
        `,n}function Kv(e){const t=YP(e),n=t.textContent??e.charAt(0).toUpperCase(),r=t.getAttribute("style")??"";return {text:n,css:r}}const fu="css-qnqsp4",hu="css-v439q6",nc="gemini-qol-missingVariants";let $o=Ht(),mu=false,Si=false,Ks=null,Vr=null;const XP=`
  .${nc} {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;function JP(){if(mu)return;const e=document.createElement("style");e.id="gemini-qol-missingVariants-styles",e.textContent=XP,document.head.appendChild(e),$o.add(()=>e.remove()),mu=true;}function Zh(){return Pt.getCropVariants()}function Yv(e){const t=Pt.getMyJournal();if(!t)return Zh();const r=t.produce?.[e]?.variantsLogged?.map(i=>i.variant)??[];return Zh().filter(i=>!r.includes(i))}function QP(e){const t=ke.get("plants")??{};return e in t?true:Zl(e)?.type==="crop"}function ZP(){const t=ft().get().plant;if(!t)return null;let n=null;if(t.currentSlotIndex!==null){const o=t.slots[t.currentSlotIndex];o&&(n=o.species);}return n||(n=t.species),Zl(n??"")?.id??n}function eL(e){const t=document.querySelectorAll(`.${nc}`),n=Yv(e);for(const r of t){if(n.length===0){r.remove();continue}const o=Array.from(r.children).map(i=>i.title);if(JSON.stringify(o)!==JSON.stringify(n)){r.replaceChildren();for(const i of n){const a=Kv(i),s=document.createElement("span");s.textContent=a.text,s.title=i,s.style.cssText=a.css,r.appendChild(s);}}}}function tL(){Vr!==null&&cancelAnimationFrame(Vr),Vr=requestAnimationFrame(()=>{Vr=null;const e=ZP();if(!e)return;const t=Xv();for(const n of t)wo(n);eL(e);});}function nL(e){if(!QP(e))return null;const t=Yv(e);if(t.length===0)return null;const n=document.createElement("div");n.className=nc;for(const r of t){const o=Kv(r),i=document.createElement("span");i.textContent=o.text,i.title=r,i.style.cssText=o.css,n.appendChild(i);}return n}function Xv(){const e=[],t=document.querySelectorAll(`.${fu}`);for(const r of t)r.offsetParent&&(r.closest("button.chakra-button")||e.push({element:r}));const n=document.querySelectorAll(`.${hu}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelectorAll(".McFlex");for(const i of o){const a=i.querySelector("p.chakra-text");if(a&&a.textContent&&!a.textContent.includes("%")){e.push({element:i});break}}}return e}function wo(e){if(!e.element.querySelector(`.${nc}`))try{const t=e.element.querySelector("p.chakra-text");if(!t)return;const n=t.closest(".McFlex");if(!n)return;let r=null;const i=ft().get().plant;i&&(i.currentSlotIndex!==null&&i.slots[i.currentSlotIndex]?r=i.slots[i.currentSlotIndex].species:r=i.species);const a=t.textContent?.trim()??"",s=Zl(a);if(s?.type==="crop"&&(r=s.id),!r)return;const d=nL(r);d&&(ar(()=>{n.appendChild(d);}),$o.add(()=>d.remove()));}catch(t){console.warn("[MissingVariantsIndicator] Failed to inject:",t);}}function rL(){const e=Xv();for(const n of e)wo(n);Ks=ft().subscribePlantInfo(()=>{tL();});const t=new MutationObserver(n=>{for(const r of n)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.classList.contains(fu)&&(o.closest("button.chakra-button")||wo({element:o})),o.querySelectorAll(`.${fu}`).forEach(s=>{s.closest("button.chakra-button")||wo({element:s});}),o.classList.contains(hu)&&!o.closest("button.chakra-button")){const s=o.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const d=s[s.length-1];d.querySelector("p.chakra-text")&&wo({element:d});}}o.querySelectorAll(`.${hu}`).forEach(s=>{if(!s.closest("button.chakra-button")){const d=s.querySelectorAll(":scope > .McFlex > .McFlex");if(d.length>0){const p=d[d.length-1];p.querySelector("p.chakra-text")&&wo({element:p});}}});}});});t.observe(document.body,{childList:true,subtree:true}),ri($o,t);}async function oL(){for(let n=1;n<=5;n++){if(!Pt.isReady())try{Pt.init();}catch(o){console.warn("[MissingVariantsIndicator] Failed to init journal checker:",o);}if(Pt.getMyJournal())return console.log("[MissingVariantsIndicator] Journal data available"),true;n<5&&await new Promise(o=>setTimeout(o,1e3));}return console.warn("[MissingVariantsIndicator] Journal data not available, continuing anyway"),false}const jp={init(){Si||(Si=true,JP(),rL(),oL().catch(e=>{console.warn("[MissingVariantsIndicator] Error waiting for journal data:",e);}));},destroy(){Si&&(Si=false,Ks&&(Ks(),Ks=null),Vr!==null&&(cancelAnimationFrame(Vr),Vr=null),$o.run(),$o.clear(),$o=Ht(),mu=false);},isEnabled(){return Si}},Jv=ct.MISSING_VARIANTS_INDICATOR,iL={enabled:false};function Gp(){return Qe(Jv,iL)}function aL(e){tt(Jv,e);}let ha=false;function Qv(){ha||!Gp().enabled||(ha=true,jp.init(),console.log("✅ [MissingVariantsIndicator] Initialized"));}function Zv(){ha&&(jp.destroy(),ha=false,console.log("🛑 [MissingVariantsIndicator] Destroyed"));}function sL(){return ha}function lL(){return Gp().enabled}function cL(e){const t=Gp();t.enabled!==e&&(t.enabled=e,aL(t),e?Qv():Zv());}const pd={init:Qv,destroy:Zv,isReady:sL,isEnabled:lL,setEnabled:cL,render:jp},ey=ct.SHOP_NOTIFIER,ty={seed:[],tool:[],egg:[],decor:[]},dL={enabled:false,trackedItems:ty},uL=["seed","tool","egg","decor"];function ny(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function La(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function ii(){const e=Qe(ey,dL);return {enabled:e?.enabled??false,trackedItems:ny(e?.trackedItems)}}function rc(e){tt(ey,{enabled:e.enabled,trackedItems:La(e.trackedItems)});}function pL(e){const n={...ii(),...e};return e.trackedItems&&(n.trackedItems=ny(e.trackedItems)),rc(n),n}function Up(){return ii().enabled}function fL(e){pL({enabled:e});}function ry(){return La(ii().trackedItems)}function oy(){const e=ry(),t=[];for(const n of uL)for(const r of e[n])t.push({shopType:n,itemId:r});return t}function hL(e,t){const n=ii(),r=La(n.trackedItems),o=r[e];if(o.includes(t))return;o.push(t),rc({...n,trackedItems:r});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(i);}function iy(e,t){const n=ii(),r=La(n.trackedItems),o=r[e],i=o.filter(s=>s!==t);if(i.length===o.length)return;r[e]=i,rc({...n,trackedItems:r});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(a);}function mL(){const e=ii();rc({...e,trackedItems:La(ty)});}let xl=false;const gu=[];function gL(e,t){const n=ry()[e];if(!n.length)return [];const r=new Set(n);return t.items.filter(o=>r.has(o.id)&&o.isAvailable).map(o=>({itemId:o.id,remaining:o.remaining}))}function vs(e,t){const n=gL(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const r=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(r);}function bL(){if(xl)return;xl=true;const e=ni();gu.push(e.subscribeSeedRestock(t=>vs("seed",t)),e.subscribeToolRestock(t=>vs("tool",t)),e.subscribeEggRestock(t=>vs("egg",t)),e.subscribeDecorRestock(t=>vs("decor",t)));}function vL(){if(xl){xl=false;for(const e of gu)e();gu.length=0;}}const ay={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function yL(e,t,n){const r=n.find(i=>typeof i=="object"&&i!==null&&"toolId"in i&&i.toolId===e);return r?(r.quantity??0)>=t:false}function xL(e,t,n){const r=n.find(p=>typeof p=="object"&&p!==null&&"decorId"in p&&p.decorId===e),o=r?r.quantity??0:0,s=co().get().decors.all.filter(p=>typeof p=="object"&&p!==null&&"decorId"in p&&p.decorId===e).length;return o+s>=t}function sy(e,t,n,r){return t==="tool"?yL(e,n,r):t==="decor"?xL(e,n,r):false}function em(e,t){const n=ay[e];if(!n||n.shopType!==t)return  false;const o=po().get();return sy(e,t,n.maxQuantity,o.items)}function tm(){const t=po().get(),n=oy();for(const r of n){const o=ay[r.itemId];o&&o.shopType===r.shopType&&sy(r.itemId,r.shopType,o.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${r.itemId} (max quantity reached)`),iy(r.shopType,r.itemId));}}let wl=false,Ys=null;function wL(){if(wl)return;wl=true,Ys=po().subscribeStable(()=>{tm();}),tm();}function CL(){wl&&(wl=false,Ys&&(Ys(),Ys=null));}let ma=false;function ly(){if(ma){console.log("[ShopNotifier] Already initialized");return}if(!Up()){console.log("[ShopNotifier] Disabled");return}ma=true,bL(),wL(),console.log("[ShopNotifier] Initialized");}function cy(){ma&&(vL(),CL(),ma=false,console.log("[ShopNotifier] Destroyed"));}function kL(){return ma}function SL(){return Up()}function AL(e){if(Up()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}fL(e),e?ly():cy(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const oo={init:ly,destroy:cy,isReady:kL,isEnabled:SL,setEnabled:AL,addTrackedItem:hL,removeTrackedItem:iy,getTrackedItems:oy,resetTrackedItems:mL},dy=ct.WEATHER_NOTIFIER,EL={enabled:false,trackedWeathers:[]};function uy(e){return Array.isArray(e)?[...e]:[]}function oc(e){return [...e]}function Ma(){const e=Qe(dy,EL);return {enabled:e?.enabled??false,trackedWeathers:uy(e?.trackedWeathers)}}function Wp(e){tt(dy,{enabled:e.enabled,trackedWeathers:oc(e.trackedWeathers)});}function _L(e){const n={...Ma(),...e};return e.trackedWeathers&&(n.trackedWeathers=uy(e.trackedWeathers)),Wp(n),n}function py(){return Ma().enabled}function IL(e){_L({enabled:e});}function ic(){return oc(Ma().trackedWeathers)}function TL(e){return ic().includes(e)}function PL(e){const t=Ma(),n=oc(t.trackedWeathers);if(n.includes(e))return;n.push(e);const r=!t.enabled&&n.length>0,o={trackedWeathers:n,enabled:r?true:t.enabled};Wp(o);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:r}});window.dispatchEvent(i);const a=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(a);}function LL(e){const t=Ma(),n=oc(t.trackedWeathers),r=n.filter(s=>s!==e);if(r.length===n.length)return;const o=t.enabled&&r.length===0,i={trackedWeathers:r,enabled:o?false:t.enabled};Wp(i);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:o}});window.dispatchEvent(a);}let Ji=null,Xs="Sunny",tr=false,Qi=null,Cl="";function fy(e){return `${e.soundId}:${e.volume}:${e.mode}`}function kl(e){const t=Fe.getItemCustomSound("weather",e);return t?{soundId:t.soundId,volume:t.volume,mode:t.mode}:Ct.CustomSounds.getNotificationConfig("weather")}function ML(e){if(tr)return;const t=Ct.CustomSounds.getById(e.soundId);if(t){Qi=t.source,tr=true,Cl=fy(e);try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{tr=false,Qi=null,Cl="";}}}function Js(){if(tr){try{const e=Ct.getCustomHandle();(!Qi||e&&e.url===Qi)&&Ct.CustomSounds.stop();}catch{}tr=false,Qi=null,Cl="";}}function ga(e,t){const n=t??kl(e);if(n.mode!=="loop"){tr&&Js();return}if(!ic().includes(e)){tr&&Js();return}const i=fy(n);tr&&i!==Cl&&Js(),tr||ML(n);}function hy(e){const{weatherId:t}=e.detail||{};if(!t)return;const o=Ta().get().id,i=kl(t);if(o===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),i.mode==="one-shot"&&by(i),ga(o,i);const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function my(){const t=Ta().get().id;ga(t);}function gy(e){if(e.detail?.entityType!=="weather")return;const r=Ta().get().id;ga(r);}function RL(){if(Ji){console.log("[WeatherNotifier] Already tracking");return}const e=Ta(),t=e.get();Xs=t.id,console.log("[WeatherNotifier] Starting tracking, initial weather:",Xs),window.addEventListener("gemini:weather-tracked-check",hy),window.addEventListener("gemini:tracked-weathers-changed",my),window.addEventListener(mt.CUSTOM_SOUND_CHANGE,gy);const n=kl(t.id);ga(t.id,n),Ji=e.subscribeStable(r=>{const o=r.current.id,i=r.previous.id,a=kl(o);if(console.log("[WeatherNotifier] Weather changed:",{previous:i,current:o}),ga(o,a),o!==i&&ic().includes(o)){console.log("[WeatherNotifier] Tracked weather detected:",o),a.mode==="one-shot"&&by(a);const d=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:o}});window.dispatchEvent(d);}Xs=o;}),console.log("[WeatherNotifier] Tracking initialized");}function FL(){window.removeEventListener("gemini:weather-tracked-check",hy),window.removeEventListener("gemini:tracked-weathers-changed",my),window.removeEventListener(mt.CUSTOM_SOUND_CHANGE,gy),Ji&&(Ji(),Ji=null,Xs="Sunny",Js(),console.log("[WeatherNotifier] Tracking stopped"));}function by(e){try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[WeatherNotifier] Failed to play notification sound:",t);}}let ba=false;function vy(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),xy(),yy());}function yy(){if(ba){console.log("[WeatherNotifier] Already initialized");return}if(ba=true,window.addEventListener("gemini:tracked-weathers-changed",vy),!py()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),RL(),console.log("[WeatherNotifier] Initialized");}function xy(){ba&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",vy),FL(),ba=false,console.log("[WeatherNotifier] Destroyed"));}function OL(){return ba}const Yo={init:yy,destroy:xy,isReady:OL,isEnabled:py,setEnabled:IL,getTrackedWeathers:ic,addTrackedWeather:PL,removeTrackedWeather:LL,isWeatherTracked:TL},NL={enabled:false,threshold:5};function ac(){return Qe(ct.PET_HUNGER_NOTIFIER,NL)}function wy(e){tt(ct.PET_HUNGER_NOTIFIER,e);}function Cy(){return ac().enabled}function DL(e){const t=ac();t.enabled=e,wy(t);const n=new CustomEvent("gemini:pet-hunger-config-changed",{detail:{shouldReinit:true}});window.dispatchEvent(n);}function ky(){return ac().threshold}function $L(e){const t=ac();t.threshold=e,wy(t);}let Zi=null;const Qs=new Set;let yr=false,ea=null;function BL(e){if(yr)return;const t=Ct.CustomSounds.getById(e.soundId);if(t){ea=t.source,yr=true;try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100,loop:!0});}catch{yr=false,ea=null;}}}function bu(){if(yr){try{const e=Ct.getCustomHandle();(!ea||e&&e.url===ea)&&Ct.CustomSounds.stop();}catch{}yr=false,ea=null;}}function zL(e,t){if(t.mode!=="loop"){yr&&bu();return}e?yr||BL(t):yr&&bu();}function jL(){if(Zi){console.log("[PetHungerNotifier] Already tracking");return}const e=uo(),t=ky();console.log("[PetHungerNotifier] Starting tracking, threshold:",t+"%"),Zi=e.subscribe(n=>{const r=n.byLocation.active,o=Ct.CustomSounds.getNotificationConfig("pet"),i=o.mode==="loop";let a=false;for(const s of r)if(s.hungerPercent<t){if(a=true,!Qs.has(s.id)){console.log("[PetHungerNotifier] Pet hunger low:",{name:s.name||s.petSpecies,species:s.petSpecies,hungerPercent:s.hungerPercent.toFixed(2)+"%"}),i||UL(o);const d=new CustomEvent("gemini:pet-hunger-low",{detail:{pet:s}});window.dispatchEvent(d),Qs.add(s.id);}}else Qs.delete(s.id);zL(a,o);}),console.log("[PetHungerNotifier] Tracking initialized");}function GL(){Zi&&(Zi(),Zi=null,Qs.clear(),bu(),console.log("[PetHungerNotifier] Tracking stopped"));}function UL(e){try{Ct.CustomSounds.play(e.soundId,{volume:e.volume/100});}catch(t){console.warn("[PetHungerNotifier] Failed to play notification sound:",t);}}let va=false;function Sy(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[PetHungerNotifier] Config changed, reinitializing..."),Ey(),Ay());}function Ay(){if(va){console.log("[PetHungerNotifier] Already initialized");return}if(va=true,window.addEventListener("gemini:pet-hunger-config-changed",Sy),!Cy()){console.log("[PetHungerNotifier] Disabled");return}console.log("[PetHungerNotifier] Initializing"),jL(),console.log("[PetHungerNotifier] Initialized");}function Ey(){va&&(console.log("[PetHungerNotifier] Destroying"),window.removeEventListener("gemini:pet-hunger-config-changed",Sy),GL(),va=false,console.log("[PetHungerNotifier] Destroyed"));}function WL(){return va}const ya={init:Ay,destroy:Ey,isReady:WL,isEnabled:Cy,setEnabled:DL,getThreshold:ky,setThreshold:$L},HL={apiBaseUrl:"https://ariesmod-api.ariedam.fr/"},_y=ct.ARIES_API;function Hp(){return Qe(_y,HL)}function VL(e){tt(_y,e);}function qL(e){const n={...Hp(),...e};return VL(n),n}let Sl=null,Al=null;function nm(e){Sl=e;}function rm(e){Al=e;}function KL(){return Sl?[...Sl]:[]}function YL(){return Al?[...Al]:[]}function om(){Sl=null,Al=null;}function Iy(e,t){const n=Hp(),r=new URL(e,n.apiBaseUrl);if(t)for(const[o,i]of Object.entries(t))i!==void 0&&r.searchParams.set(o,String(i));return r.toString()}function sc(e,t){return new Promise(n=>{const r=Iy(e,t);GM_xmlhttpRequest({method:"GET",url:r,headers:{},onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] GET parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] GET error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] GET request failed:",o),n({status:0,data:null});}});})}function lc(e,t){return new Promise(n=>{const r=Iy(e);GM_xmlhttpRequest({method:"POST",url:r,headers:{"Content-Type":"application/json"},data:JSON.stringify(t),onload:o=>{if(o.status>=200&&o.status<300)try{const i=o.responseText?JSON.parse(o.responseText):null;n({status:o.status,data:i});}catch(i){console.error("[AriesAPI] POST parse error:",i,o.responseText),n({status:o.status,data:null});}else console.error("[AriesAPI] POST error:",o.status,o.responseText),n({status:o.status,data:null});},onerror:o=>{console.error("[AriesAPI] POST request failed:",o),n({status:0,data:null});}});})}async function Vp(e=50){const{data:t}=await sc("rooms",{limit:e});return !t||!Array.isArray(t)?[]:t.map(n=>({id:n.id,isPrivate:n.is_private,playersCount:n.players_count??0,lastUpdatedAt:n.last_updated_at,lastUpdatedByPlayerId:n.last_updated_by_player_id,userSlots:Array.isArray(n.user_slots)?n.user_slots.map(r=>({name:r.name,avatarUrl:r.avatar_url??null})):void 0}))}async function XL(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Vp(o),s=[];for(const d of a){if(!d.userSlots||d.userSlots.length===0)continue;const p=d.userSlots.filter(c=>c.name?c.name.toLowerCase().includes(i):false);p.length>0&&s.push({room:d,matchedSlots:p});}return s}async function JL(e){if(!e)return null;const{status:t,data:n}=await sc("get-player-view",{playerId:e});return t===404?null:n}async function cc(e,t){const n=Array.from(new Set((e??[]).map(a=>String(a).trim()).filter(a=>a.length>=3)));if(n.length===0)return [];const r={playerIds:n};t?.sections&&(r.sections=Array.isArray(t.sections)?t.sections:[t.sections]);const{status:o,data:i}=await lc("get-players-view",r);return o!==200||!Array.isArray(i)?[]:i}async function QL(e,t){const n=e.trim(),r=t?.minQueryLength??2;if(n.length<r)return [];const o=t?.limitRooms??200,i=n.toLowerCase(),a=await Vp(o),s=new Map;for(const d of a)if(!(!d.userSlots||d.userSlots.length===0))for(const p of d.userSlots){if(!p.name||!p.name.toLowerCase().includes(i))continue;const h=`${d.id}::${p.name}`;s.has(h)||s.set(h,{playerName:p.name,avatarUrl:p.avatarUrl,roomId:d.id,roomPlayersCount:d.playersCount});}return Array.from(s.values())}async function Ty(e){if(!e)return [];const{status:t,data:n}=await sc("list-friends",{playerId:e});return t!==200||!n||!Array.isArray(n.friends)?[]:n.friends}async function ZL(e){const t=await Ty(e);if(t.length===0)return nm([]),[];const n=await cc(t,{sections:["profile","room"]});return nm(n),[...n]}async function qp(e){if(!e)return {playerId:"",incoming:[],outgoing:[]};const{status:t,data:n}=await sc("list-friend-requests",{playerId:e});return t!==200||!n?{playerId:e,incoming:[],outgoing:[]}:{playerId:n.playerId,incoming:Array.isArray(n.incoming)?n.incoming:[],outgoing:Array.isArray(n.outgoing)?n.outgoing:[]}}async function eM(e){const{incoming:t}=await qp(e),n=t.map(o=>o.fromPlayerId);if(n.length===0)return rm([]),[];const r=await cc(n,{sections:["profile"]});return rm(r),[...r]}async function tM(e){const{outgoing:t}=await qp(e),n=t.map(r=>r.toPlayerId);return n.length===0?[]:cc(n,{sections:["profile"]})}async function nM(e,t){if(!e||!t||e===t)return  false;const{status:n}=await lc("friend-request",{fromPlayerId:e,toPlayerId:t});return n===204?true:(n===409&&console.warn("[AriesAPI] friend-request conflict (already exists)"),false)}async function rM(e){const{playerId:t,otherPlayerId:n,action:r}=e;if(!t||!n||t===n)return  false;const{status:o}=await lc("friend-respond",{playerId:t,otherPlayerId:n,action:r});return o===204}async function oM(e,t){if(!e||!t||e===t)return  false;const{status:n}=await lc("friend-remove",{playerId:e,otherPlayerId:t});return n===204}let Ai=false;const El={init(){Ai||(Ai=true,console.log("[AriesAPI] Initialized"));},destroy(){Ai&&(Ai=false,om(),console.log("[AriesAPI] Destroyed"));},isReady(){return Ai},getConfig(){return Hp()},updateConfig(e){return qL(e)},fetchRooms:Vp,searchRoomsByPlayerName:XL,fetchPlayerView:JL,fetchPlayersView:cc,searchPlayersByName:QL,fetchFriendsIds:Ty,fetchFriendsWithViews:ZL,fetchFriendRequests:qp,fetchIncomingRequestsWithViews:eM,fetchOutgoingRequestsWithViews:tM,sendFriendRequest:nM,respondFriendRequest:rM,removeFriend:oM,getCachedFriends:KL,getCachedIncomingRequests:YL,clearCache:om},im={enabled:true,manualLocks:[],overallRules:[],speciesRules:{}};function _l(){return `rule-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function iM(e){const t={enabled:e.enabled,manualLocks:e.manualLocks||[],overallRules:[],speciesRules:{}},n=e.globalCriteria?.lockByScale?.enabled,r=(e.globalCriteria?.lockedMutations?.length??0)>0;if(n||r){const o={id:_l(),name:"Migrated Global Rule",enabled:true,mode:"lock",sizeCondition:n?{enabled:true,minPercentage:e.globalCriteria.lockByScale.minPercentage}:void 0,mutationCondition:r?{enabled:true,mutations:e.globalCriteria.lockedMutations,matchMode:"any"}:void 0};t.overallRules.push(o);}if(e.speciesOverrides)for(const[o,i]of Object.entries(e.speciesOverrides)){const a=i.lockByScale?.enabled,s=(i.lockedMutations?.length??0)>0;if(a||s){const d={id:_l(),name:`Migrated ${o} Rule`,enabled:true,mode:"lock",sizeCondition:a?{enabled:true,minPercentage:i.lockByScale.minPercentage}:void 0,mutationCondition:s?{enabled:true,mutations:i.lockedMutations,matchMode:"any"}:void 0};t.speciesRules[o]=[d];}}return console.log("[HarvestLocker] Migrated legacy config to new format"),t}function aM(e){const t=e;return t!==null&&typeof t=="object"&&"globalCriteria"in t&&!("overallRules"in t)}function gt(){const e=Qe(Bt.FEATURE.HARVEST_LOCKER,im);if(aM(e)){const t=iM(e);return gn(t),t}return {...im,...e,manualLocks:e.manualLocks||[],overallRules:e.overallRules||[],speciesRules:e.speciesRules||{}}}function gn(e){tt(Bt.FEATURE.HARVEST_LOCKER,e);}function Py(e,t,n,r){return {id:_l(),name:e,enabled:true,mode:t,sizeCondition:n,mutationCondition:r}}function sM(e){const t=gt();t.overallRules.push(e),gn(t);}function lM(e,t){const n=gt();n.speciesRules[e]||(n.speciesRules[e]=[]),n.speciesRules[e].push(t),gn(n);}function Ly(e,t){const n=gt(),r=n.overallRules.findIndex(o=>o.id===e);if(r!==-1){n.overallRules[r]={...n.overallRules[r],...t},gn(n);return}for(const o of Object.keys(n.speciesRules)){const i=n.speciesRules[o].findIndex(a=>a.id===e);if(i!==-1){n.speciesRules[o][i]={...n.speciesRules[o][i],...t},gn(n);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function cM(e){const t=gt(),n=t.overallRules.findIndex(r=>r.id===e);if(n!==-1){t.overallRules.splice(n,1),gn(t);return}for(const r of Object.keys(t.speciesRules)){const o=t.speciesRules[r].findIndex(i=>i.id===e);if(o!==-1){t.speciesRules[r].splice(o,1),t.speciesRules[r].length===0&&delete t.speciesRules[r],gn(t);return}}console.warn(`[HarvestLocker] Rule ${e} not found`);}function dM(e,t){const n=gt(),r=n.overallRules.find(i=>i.id===e);if(!r){console.warn(`[HarvestLocker] Rule ${e} not found`);return}const o={...r,id:_l(),name:`${r.name} (${t})`};n.speciesRules[t]||(n.speciesRules[t]=[]),n.speciesRules[t].push(o),gn(n);}const Zr=new Set;let nr=null;const Il=[];function uM(e){if(Il.length>0){console.warn("[HarvestLocker] Already started");return}nr=e;const t=co().subscribeStable(n=>{if(!n){Zr.clear();return}My(n);});Il.push(t);}function pM(){Il.forEach(e=>e()),Il.length=0,Zr.clear(),nr=null,console.log("[HarvestLocker] Stopped");}function Sr(e){nr=e;const t=co().get();t&&My(t);}function Kp(e,t){const n=`${e}-${t}`;return Zr.has(n)}function fM(){return Array.from(Zr)}function My(e){if(nr){if(Zr.clear(),nr.manualLocks.forEach(t=>Zr.add(t)),!vM(e)){console.warn("[HarvestLocker] Invalid garden structure"),window.dispatchEvent(new CustomEvent(mt.HARVEST_LOCKER_LOCKS_UPDATED));return}e.plants.all.forEach(t=>{t.slots.forEach((n,r)=>{const o=`${t.tileIndex}-${r}`,i=hM(n.species);mM(n,i)&&Zr.add(o);});}),window.dispatchEvent(new CustomEvent(mt.HARVEST_LOCKER_LOCKS_UPDATED));}}function hM(e){return nr?nr.speciesRules[e]?nr.speciesRules[e].filter(t=>t.enabled):nr.overallRules.filter(t=>t.enabled):[]}function mM(e,t){const n=t.filter(o=>o.mode==="lock"),r=t.filter(o=>o.mode==="allow");for(const o of n)if(am(e,o))return  true;return r.length>0&&!r.some(i=>am(e,i))}function am(e,t){const n=[];if(t.sizeCondition?.enabled){const r=bM(e),o=t.sizeCondition.sizeMode??"max";n.push(o==="max"?r>=t.sizeCondition.minPercentage:r<=t.sizeCondition.minPercentage);}if(t.mutationCondition?.enabled&&t.mutationCondition.mutations.length>0){const r=gM(e.mutations,t.mutationCondition.mutations,t.mutationCondition.matchMode);n.push(r);}return n.length>0&&n.every(r=>r)}function gM(e,t,n){const r=t.includes("none"),o=t.filter(a=>a!=="none"),i=r&&e.length===0;return n==="any"?i?true:o.some(a=>e.includes(a)):r&&e.length>0?false:o.length===0?i:o.every(a=>e.includes(a))}function bM(e){const n=ke.get("plants")?.[e.species];if(!n||typeof n!="object"||!("crop"in n))return 0;const r=n.crop;if(typeof r!="object"||!r)return 0;const{baseTileScale:o,maxScale:i}=r,a=i-o;return a===0?100:(e.targetScale-o)/a*100}function vM(e){return typeof e=="object"&&e!==null&&"plants"in e&&typeof e.plants=="object"&&e.plants!==null&&"all"in e.plants&&Array.isArray(e.plants.all)}function Yp(e,t){const n=new MutationObserver(o=>{for(const i of o)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const d of s)t(d);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function Xp(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const i of o.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const yM=`
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
`,sm="css-qnqsp4",Ry="gemini-qol-harvestLocker-locked",vu="gemini-qol-harvestLocker-lock-icon",yu="gemini-qol-harvestLocker-styles",xM='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let zn=null,Zs=false;const xu=[];function ys(e){xu.push(e);}function wM(){for(const e of xu)try{e();}catch(t){console.warn("[HarvestLocker Inject] Cleanup error:",t);}xu.length=0;}function CM(){if(Zs)return;if(document.getElementById(yu)){Zs=true;return}const e=document.createElement("style");e.id=yu,e.textContent=yM,document.head.appendChild(e),Zs=true;}function kM(){document.getElementById(yu)?.remove(),Zs=false;}function SM(e){if(e.classList.add(Ry),!e.querySelector(`#${vu}`)){const t=document.createElement("div");t.id=vu,t.innerHTML=xM,e.appendChild(t);}}function Tl(e){e.classList.remove(Ry),e.querySelector(`#${vu}`)?.remove();}function fd(){if(!zn)return;const e=ft().get();if(!e.plant||e.position.localIndex===null||e.plant.nextHarvestSlotIndex===null){Tl(zn),console.log("[HarvestLocker Inject] No plant data — overlay removed");return}const t=String(e.position.localIndex),n=e.plant.nextHarvestSlotIndex;Kp(t,n)?(SM(zn),console.log(`[HarvestLocker Inject] LOCKED — overlay applied (${e.plant.species} tile:${t} slot:${n})`)):(Tl(zn),console.log(`[HarvestLocker Inject] unlocked — overlay removed (${e.plant.species} tile:${t} slot:${n})`));}function AM(){CM();const e=Yp(`.${sm}`,o=>{zn=o,fd();});ys(()=>e.disconnect());const t=Xp(`.${sm}`,o=>{zn===o&&(Tl(o),zn=null);});ys(()=>t.disconnect());const n=ft().subscribePlantInfo(()=>{fd();});ys(n);const r=()=>fd();window.addEventListener(mt.HARVEST_LOCKER_LOCKS_UPDATED,r),ys(()=>window.removeEventListener(mt.HARVEST_LOCKER_LOCKS_UPDATED,r)),console.log("[HarvestLocker Inject] Started");}function EM(){zn&&(Tl(zn),zn=null),wM(),kM(),console.log("[HarvestLocker Inject] Stopped");}let xs=false;const Fy={init(){xs||(AM(),xs=true);},destroy(){xs&&(EM(),xs=false);},isEnabled(){return gt().enabled}},Oy=[];function _M(){return Oy.slice()}function IM(e){Oy.push(e);}function Ny(e){try{return JSON.parse(e)}catch{return}}function lm(e){if(typeof e=="string"){const t=Ny(e);return t!==void 0?t:e}return e}function Dy(e){if(e!=null){if(typeof e=="string"){const t=Ny(e);return t!==void 0?Dy(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function TM(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Le(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,s)=>{if(Dy(a)!==e)return;const p=o(a,s);return p&&typeof p=="object"&&"kind"in p?p:typeof p=="boolean"?p?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return IM(i),i}const Ei=new WeakSet,cm=new WeakMap;function PM(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:_M();if(!r.length)return ()=>{};const o=b=>({ws:b,pageWindow:t,debug:n}),i=(b,y)=>{let g=b;for(const S of r){const I=S(g,o(y));if(I){if(I.kind==="drop")return {kind:"drop"};I.kind==="replace"&&(g=I.message);}}return g!==b?{kind:"replace",message:g}:void 0};let a=null,s=null,d=null;const p=()=>{const b=t?.MagicCircle_RoomConnection,y=b?.sendMessage;if(!b||typeof y!="function")return  false;if(Ei.has(y))return  true;const g=y.bind(b);function S(...I){const E=I.length===1?I[0]:I,M=lm(E),R=i(M,TM(t));if(R?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",M);return}if(R?.kind==="replace"){const D=R.message;return I.length>1&&Array.isArray(D)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",M,"=>",D),g(...D)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",M,"=>",D),g(D))}return g(...I)}Ei.add(S),cm.set(S,y);try{b.sendMessage=S,Ei.add(b.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{b.sendMessage===S&&(b.sendMessage=y);}catch{}},true};(()=>{const b=t?.WebSocket?.prototype,y=b?.send;if(typeof y!="function"||Ei.has(y))return;function g(S){const I=lm(S),E=i(I,this);if(E?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",I);return}if(E?.kind==="replace"){const M=E.message,R=typeof M=="string"||M instanceof ArrayBuffer||M instanceof Blob?M:JSON.stringify(M);return n&&console.log("[WS] replace outgoing (ws.send)",I,"=>",M),y.call(this,R)}return y.call(this,S)}Ei.add(g),cm.set(g,y);try{b.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{b.send===g&&(b.send=y);}catch{}};})();const h=e.waitForRoomConnectionMs??4e3;if(!p()&&h>0){const b=Date.now();d=setInterval(()=>{if(p()){clearInterval(d),d=null;return}Date.now()-b>h&&(clearInterval(d),d=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(d){try{clearInterval(d);}catch{}d=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Le(he.HarvestCrop,(e,t)=>{if(!gt().enabled)return  true;const r=e,o=r.slot!==void 0?String(r.slot):void 0,i=r.slotsIndex;return o!==void 0&&typeof i=="number"&&Kp(o,i)?(console.log(`[HarvestLocker] Blocked harvest for slot ${o}-${i}`),false):true});let Xo=false;function $y(){if(Xo){console.warn("[HarvestLocker] Already initialized");return}const e=gt();if(!e.enabled){console.log("[HarvestLocker] Disabled");return}Xo=true,uM(e),Fy.init(),console.log("[HarvestLocker] Initialized");}function By(){Xo&&(Fy.destroy(),pM(),Xo=false,console.log("[HarvestLocker] Destroyed"));}function LM(){return gt().enabled}function MM(e){const t=gt();t.enabled=e,gn(t),e&&!Xo?$y():!e&&Xo&&By();}function RM(e,t){return Kp(e,t)}function FM(){return fM()}function OM(e,t){const n=gt(),r=`${e}-${t}`;n.manualLocks.includes(r)||(n.manualLocks.push(r),gn(n),Sr(n));}function NM(e,t){const n=gt(),r=`${e}-${t}`;n.manualLocks=n.manualLocks.filter(o=>o!==r),gn(n),Sr(n);}function DM(){const e=gt();e.manualLocks=[],gn(e),Sr(e);}function $M(){return gt()}function BM(){return gt().overallRules}function zM(e){return gt().speciesRules[e]||[]}function jM(){const e=gt();return Object.keys(e.speciesRules)}function GM(e,t,n,r){const o=Py(e,t,n,r);return sM(o),Sr(gt()),o}function UM(e,t,n,r,o){const i=Py(t,n,r,o);return lM(e,i),Sr(gt()),i}function WM(e,t){Ly(e,t),Sr(gt());}function HM(e){cM(e),Sr(gt());}function VM(e,t){Ly(e,{enabled:t}),Sr(gt());}const jt={init:$y,destroy:By,isEnabled:LM,setEnabled:MM,isLocked:RM,getAllLockedSlots:FM,lockSlot:OM,unlockSlot:NM,clearManualLocks:DM,getOverallRules:BM,getSpeciesRules:zM,getAllSpeciesWithRules:jM,addNewOverallRule:GM,addNewSpeciesRule:UM,modifyRule:WM,removeRule:HM,toggleRule:VM,cloneRuleToSpecies:dM,getConfig:$M},dm={enabled:true,blockedEggs:[]};function lr(){const e=Qe(Bt.FEATURE.EGG_LOCKER,dm);return {...dm,...e,blockedEggs:e.blockedEggs||[]}}function dc(e){tt(Bt.FEATURE.EGG_LOCKER,e);}function qM(e){const t=lr();t.blockedEggs.includes(e)||(t.blockedEggs.push(e),dc(t),window.dispatchEvent(new CustomEvent(mt.EGG_LOCKER_LOCKS_UPDATED)));}function KM(e){const t=lr();t.blockedEggs=t.blockedEggs.filter(n=>n!==e),dc(t),window.dispatchEvent(new CustomEvent(mt.EGG_LOCKER_LOCKS_UPDATED));}const YM=`
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
`,um="css-qnqsp4",zy="gemini-qol-eggLocker-locked",wu="gemini-qol-eggLocker-lock-icon",Cu="gemini-qol-eggLocker-styles",XM='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let jn=null,el=false;const ku=[];function ws(e){ku.push(e);}function JM(){for(const e of ku)try{e();}catch(t){console.warn("[EggLocker Inject] Cleanup error:",t);}ku.length=0;}function QM(){if(el)return;if(document.getElementById(Cu)){el=true;return}const e=document.createElement("style");e.id=Cu,e.textContent=YM,document.head.appendChild(e),el=true;}function ZM(){document.getElementById(Cu)?.remove(),el=false;}function eR(e){if(e.classList.add(zy),!e.querySelector(`#${wu}`)){const t=document.createElement("div");t.id=wu,t.innerHTML=XM,e.appendChild(t);}}function Pl(e){e.classList.remove(zy),e.querySelector(`#${wu}`)?.remove();}function hd(){if(!jn)return;const e=ft().get();if(e.object.type!=="egg"||!e.object.data){Pl(jn);return}const t=e.object.data;mr.getBlockedEggs().includes(t.eggId)?(eR(jn),console.log(`[EggLocker Inject] LOCKED — overlay applied (${t.eggId})`)):(Pl(jn),console.log(`[EggLocker Inject] unlocked — overlay removed (${t.eggId})`));}function tR(){QM();const e=Yp(`.${um}`,o=>{jn=o,hd();});ws(()=>e.disconnect());const t=Xp(`.${um}`,o=>{jn===o&&(Pl(o),jn=null);});ws(()=>t.disconnect());const n=ft().subscribeObject(()=>{hd();});ws(n);const r=()=>hd();window.addEventListener(mt.EGG_LOCKER_LOCKS_UPDATED,r),ws(()=>window.removeEventListener(mt.EGG_LOCKER_LOCKS_UPDATED,r)),console.log("[EggLocker Inject] Started");}function nR(){jn&&(Pl(jn),jn=null),JM(),ZM(),console.log("[EggLocker Inject] Stopped");}let Cs=false;const jy={init(){Cs||(tR(),Cs=true);},destroy(){Cs&&(nR(),Cs=false);},isEnabled(){return lr().enabled}};Le(he.HatchEgg,()=>{const e=lr();if(!e.enabled)return  true;const t=ft().get();if(t.object.type!=="egg"||!t.object.data)return  true;const n=t.object.data.eggId;return e.blockedEggs.includes(n)?(console.log(`[EggLocker] Blocked hatch for ${n}`),false):(console.log(`[EggLocker] Allowed hatch for ${n}`),true)});let Jo=false;function Gy(){if(Jo)return;if(!lr().enabled){console.log("[EggLocker] Disabled");return}Jo=true,jy.init(),console.log("[EggLocker] Initialized");}function Uy(){Jo&&(jy.destroy(),Jo=false,console.log("[EggLocker] Destroyed"));}function rR(){return lr().enabled}function oR(e){const t=lr();t.enabled=e,dc(t),e&&!Jo?Gy():!e&&Jo&&Uy();}function iR(){const e=ke.get("eggs");return e?Object.keys(e):[]}function aR(){return lr().blockedEggs}function sR(e){qM(e);}function lR(e){KM(e);}function cR(){const e=lr();e.blockedEggs=[],dc(e);}const mr={init:Gy,destroy:Uy,isEnabled:rR,setEnabled:oR,getAvailableEggs:iR,getBlockedEggs:aR,blockEgg:sR,unblockEgg:lR,clearBlocks:cR},pm={enabled:true,blockedDecors:[]};function _n(){const e=Qe(Bt.FEATURE.DECOR_LOCKER,pm);return {...pm,...e,blockedDecors:e.blockedDecors||[]}}function Ra(e){tt(Bt.FEATURE.DECOR_LOCKER,e);}function dR(e){const t=_n();t.blockedDecors.includes(e)||(t.blockedDecors.push(e),Ra(t),window.dispatchEvent(new CustomEvent(mt.DECOR_LOCKER_LOCKS_UPDATED)));}function uR(e){const t=_n();t.blockedDecors=t.blockedDecors.filter(n=>n!==e),Ra(t),window.dispatchEvent(new CustomEvent(mt.DECOR_LOCKER_LOCKS_UPDATED));}const pR=`
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
`,fm="css-qnqsp4",Wy="gemini-qol-decorLocker-locked",Su="gemini-qol-decorLocker-lock-icon",Au="gemini-qol-decorLocker-styles",fR='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';let Gn=null,tl=false;const Eu=[];function ks(e){Eu.push(e);}function hR(){for(const e of Eu)try{e();}catch(t){console.warn("[DecorLocker Inject] Cleanup error:",t);}Eu.length=0;}function mR(){if(tl)return;if(document.getElementById(Au)){tl=true;return}const e=document.createElement("style");e.id=Au,e.textContent=pR,document.head.appendChild(e),tl=true;}function gR(){document.getElementById(Au)?.remove(),tl=false;}function bR(e){if(e.classList.add(Wy),!e.querySelector(`#${Su}`)){const t=document.createElement("div");t.id=Su,t.innerHTML=fR,e.appendChild(t);}}function Ll(e){e.classList.remove(Wy),e.querySelector(`#${Su}`)?.remove();}function md(){if(!Gn)return;const e=ft().get();if(e.object.type!=="decor"||!e.object.data){Ll(Gn);return}const t=e.object.data;gr.isDecorBlocked(t.decorId)?(bR(Gn),console.log(`[DecorLocker Inject] LOCKED — overlay applied (${t.decorId})`)):(Ll(Gn),console.log(`[DecorLocker Inject] unlocked — overlay removed (${t.decorId})`));}function vR(){mR();const e=Yp(`.${fm}`,o=>{Gn=o,md();});ks(()=>e.disconnect());const t=Xp(`.${fm}`,o=>{Gn===o&&(Ll(o),Gn=null);});ks(()=>t.disconnect());const n=ft().subscribeObject(()=>{md();});ks(n);const r=()=>md();window.addEventListener(mt.DECOR_LOCKER_LOCKS_UPDATED,r),ks(()=>window.removeEventListener(mt.DECOR_LOCKER_LOCKS_UPDATED,r)),console.log("[DecorLocker Inject] Started");}function yR(){Gn&&(Ll(Gn),Gn=null),hR(),gR(),console.log("[DecorLocker Inject] Stopped");}let Ss=false;const Hy={init(){Ss||(vR(),Ss=true);},destroy(){Ss&&(yR(),Ss=false);},isEnabled(){return _n().enabled}};Le(he.PickupDecor,()=>{const e=_n();if(!e.enabled)return  true;const t=ft().get();if(!t.object||t.object.type!=="decor"||!t.object.data)return  true;const n=t.object.data.decorId;return e.blockedDecors.includes(n)?(console.log(`[DecorLocker] Blocked pickup for ${n}`),false):(console.log(`[DecorLocker] Allowed pickup for ${n}`),true)});let Qo=false;function Vy(){if(Qo)return;if(!_n().enabled){console.log("[DecorLocker] Disabled");return}Qo=true,Hy.init(),console.log("[DecorLocker] Initialized");}function qy(){Qo&&(Hy.destroy(),Qo=false,console.log("[DecorLocker] Destroyed"));}function xR(){return _n().enabled}function wR(e){const t=_n();t.enabled=e,Ra(t),e&&!Qo?Vy():!e&&Qo&&qy();}function Ky(){const e=ke.get("decor");return e?Object.keys(e):[]}function CR(){return _n().blockedDecors}function kR(e){return _n().blockedDecors.includes(e)}function SR(e){dR(e);}function AR(e){uR(e);}function ER(){const e=Ky(),t=_n();t.blockedDecors=e,Ra(t),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function Yy(){const e=_n();e.blockedDecors=[],Ra(e),window.dispatchEvent(new CustomEvent("gemini:decorLocker-locks-updated"));}function _R(){Yy();}const gr={init:Vy,destroy:qy,isEnabled:xR,setEnabled:wR,getAvailableDecors:Ky,getBlockedDecors:CR,isDecorBlocked:kR,blockDecor:SR,unblockDecor:AR,blockAllDecors:ER,unblockAllDecors:Yy,clearBlocks:_R};class Xy{constructor(){ve(this,"stats");ve(this,"STORAGE_KEY",ct.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Qe(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){tt(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Bo=null;function IR(){return Bo||(Bo=new Xy),Bo}function TR(){Bo&&(Bo.endSession(),Bo=null);}function Jy(e){const t=Vl(e.xp),n=ql(e.petSpecies,e.targetScale),r=Kl(e.petSpecies,e.xp,n),o=Yl(e.petSpecies,t),i=Mb(e.petSpecies),a=XE(r,n,i),s=JE(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function Qy(e){return {...e,strength:Jy(e)}}function Zy(e){return e.map(Qy)}function PR(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Zy(e),n=t.reduce((d,p)=>d+p.strength.current,0),r=t.reduce((d,p)=>d+p.strength.max,0),o=t.filter(d=>d.strength.isMature).length,i=t.length-o,a=t.reduce((d,p)=>p.strength.max>(d?.strength.max||0)?p:d,t[0]),s=t.reduce((d,p)=>p.strength.max<(d?.strength.max||1/0)?p:d,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:s}}const LR=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Jy,enrichPetWithStrength:Qy,enrichPetsWithStrength:Zy,getPetStrengthStats:PR},Symbol.toStringTag,{value:"Module"}));class e0{constructor(){ve(this,"logs",[]);ve(this,"maxLogs",1e3);ve(this,"unsubscribe",null);ve(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=Ut.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let qr=null;function MR(){return qr||(qr=new e0,qr.init()),qr}function RR(){qr&&(qr.destroy(),qr=null);}const FR={StatsTracker:Xy,getStatsTracker:IR,destroyStatsTracker:TR},OR={AbilityLogger:e0,getAbilityLogger:MR,destroyAbilityLogger:RR,...LR},Cn=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],NR={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function yo(e){return e?NR[e]??0:0}class DR extends Cr{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});ve(this,"allPlants",[]);ve(this,"allPets",[]);ve(this,"sectionElement",null);}async build(n){await SI();const r=n.getRootNode();rn(r,qb,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await ke.waitForAny(3e3).catch(()=>{}),await Promise.all([ke.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),ke.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=ke.get("plants")||{},r=ke.get("pets")||{};this.allPlants=Object.keys(n).sort((o,i)=>{const a=n[o]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,d=yo(a)-yo(s);return d!==0?d:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,i)=>{const a=r[o]?.rarity||null,s=r[i]?.rarity||null,d=yo(a)-yo(s);return d!==0?d:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(Ne.isReady())return;const n=1e4,r=100;let o=0;return new Promise(i=>{const a=()=>{Ne.isReady()||o>=n?i():(o+=r,setTimeout(a,r));};a();})}async renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(await this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=x("div",{className:"kv"}),r=Pu({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=xr({checked:xn().get().enabled,onChange:async i=>{const a=xn(),s=a.get();await a.set({...s,enabled:i}),await this.saveConfig();}});return n.append(r.root,o.root),lt({title:"Auto-Favorite",padding:"lg"},n,x("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}async createMutationsCard(){const n=x("div",{className:"u-col"}),r=x("div",{className:"mut-row"});r.appendChild(await this.createMutationButton(Cn[0])),r.appendChild(await this.createMutationButton(Cn[1])),n.appendChild(r);const o=x("div",{className:"mut-row"});o.appendChild(await this.createMutationButton(Cn[2])),o.appendChild(await this.createMutationButton(Cn[3])),o.appendChild(await this.createMutationButton(Cn[4])),n.appendChild(o);const i=x("div",{className:"mut-row"});i.appendChild(await this.createMutationButton(Cn[5])),i.appendChild(await this.createMutationButton(Cn[6])),n.appendChild(i);const a=x("div",{className:"mut-row"});return a.appendChild(await this.createMutationButton(Cn[7])),a.appendChild(await this.createMutationButton(Cn[8])),n.appendChild(a),lt({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${xn().get().favoriteMutations.length} / ${Cn.length} active`))}async createMutationButton(n){let r=xn().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&i.push("active");const a=x("div",{className:i.join(" ")}),s=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Ne.isReady()){const c=await Ne.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});c.style.width="28px",c.style.height="28px",c.style.objectFit="contain",s.appendChild(c);}}catch{}const d=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),p=x("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},d);if(a.append(s,p),n.id==="Rainbow"||n.id==="Gold"){const c=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(Ne.isReady()){const h=await Ne.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});h.style.width="28px",h.style.height="28px",h.style.objectFit="contain",c.appendChild(h);}}catch{}a.append(c);}else {const c=x("div",{style:"width: 28px; flex-shrink: 0;"});a.append(c);}return a.addEventListener("click",async c=>{c.stopPropagation();const h=xn(),b=h.get();if(r){const g=b.favoriteMutations.filter(S=>S!==n.id);await h.set({...b,favoriteMutations:g}),r=false,a.classList.remove("active");}else {const g=[...b.favoriteMutations,n.id];await h.set({...b,favoriteMutations:g}),r=true,a.classList.add("active");}await this.saveConfig();const y=this.sectionElement?.querySelector(".card p");y&&(y.textContent=`${xn().get().favoriteMutations.length} / ${Cn.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:xn().get().favoriteProduceList,onUpdate:async n=>{const r=xn(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:xn().get().favoritePetsList,onUpdate:async n=>{const r=xn(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:i,selected:a,onUpdate:s}=n;let d=new Set(a),p=o;const c=x("div",{style:"margin-bottom: 8px;"}),h=xa({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:P=>{const F=P.trim().toLowerCase();F?p=o.filter(L=>L.toLowerCase().includes(F)):p=o,R.setData(S());}});c.appendChild(h.root);const b=x("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),y=yt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const P=S().map(F=>F.id);R.setSelection(P);}}),g=yt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{R.clearSelection();}});b.append(y,g);const S=()=>p.map(P=>({id:P,name:P,rarity:this.getItemRarity(P,i),selected:d.has(P)})),I=P=>{if(!P){const L=x("span",{style:"opacity:0.5;"});return L.textContent="—",L}return Xl({variant:"rarity",rarity:P,size:"sm"}).root},E=async P=>{const F=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(Ne.isReady()){let L=i,C=P;i==="plant"&&(["Bamboo","Cactus"].includes(P)&&(L="tallplant"),P==="DawnCelestial"&&(C="DawnCelestialCrop"),P==="MoonCelestial"&&(C="MoonCelestialCrop"),P==="OrangeTulip"&&(C="Tulip"));const _=await Ne.toCanvas(L,C,{scale:.5});_.style.width="28px",_.style.height="28px",_.style.objectFit="contain",F.appendChild(_);}}catch{}return F},R=Ol({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(P,F)=>P.name.localeCompare(F.name,void 0,{numeric:true,sensitivity:"base"}),render:P=>{const F=x("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),L=x("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},P.name);return E(P.id).then(C=>{F.prepend(C);}),F.append(L),F}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(P,F)=>yo(P.rarity)-yo(F.rarity),render:P=>I(P.rarity)}],data:S(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(d),getRowId:P=>P.id,onSelectionChange:P=>{d.clear(),P.forEach(F=>d.add(F)),s(Array.from(d)),N();}}),D=x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),N=()=>{D.textContent=`${d.size} / ${o.length} selected`;};return N(),lt({title:`${r} (${d.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},c,b,R.root,D)}getItemRarity(n,r){try{if(r==="pet")return (ke.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=ke.get("plants")||{},i=o[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=xn().get();try{const{updateSimpleConfig:r}=Qb;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}function $R(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function BR(e,t){const n=e;let r=e;const o=Fl({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==r&&(r=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==r&&(r=a,t?.(a));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const i=o.getValue().trim()||n;i!==r&&(r=i,t?.(i));}),o.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),o.input.blur());}),o.root}function zR(e){const t=x("div",{className:"team-list-item"}),n=e.customIndicator??x("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?BR(e.team.name,e.onNameChange):x("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=x("div",{className:"team-list-item__sprites"});async function i(){const d=Ut.myPets.get();o.innerHTML="";for(let p=0;p<3;p++){const c=e.team.petIds[p],h=c&&c!=="",b=x("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!h?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(b.style.cursor="pointer",b.addEventListener("click",()=>{e.onSlotClick(p);})),h){let y=d.all.find(g=>g.id===c);if(!y){const g=window.__petDataCache;g&&g.has(c)&&(y=g.get(c));}if(y)try{const g=await Ne.toCanvas("pet",y.petSpecies,{mutations:y.mutations,scale:1}),S=document.createElement("canvas");S.width=g.width,S.height=g.height;const I=S.getContext("2d");if(I&&I.drawImage(g,0,0),S.style.width="100%",S.style.height="100%",S.style.objectFit="contain",b.appendChild(S),e.showSlotStyles){const E=x("div",{className:"team-list-item__sprite-slot-overlay"});b.appendChild(E),b.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${y.petSpecies}:`,g);const S=x("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});b.appendChild(S);}else {const g=x("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});b.appendChild(g),console.warn(`[TeamListItem] Pet ${c} not found in myPets yet, waiting for update`);let S=false;const I=Ut.myPets.subscribe(async()=>{if(S)return;const M=Ut.myPets.get().all.find(R=>R.id===c);if(M){S=true,I();try{b.innerHTML="";const R=await Ne.toCanvas("pet",M.petSpecies,{mutations:M.mutations,scale:1}),D=document.createElement("canvas");D.width=R.width,D.height=R.height;const N=D.getContext("2d");if(N&&N.drawImage(R,0,0),D.style.width="100%",D.style.height="100%",D.style.objectFit="contain",b.appendChild(D),e.showSlotStyles){const P=x("div",{className:"team-list-item__sprite-slot-overlay"});b.appendChild(P),b.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${c} sprite updated`);}catch(R){console.warn(`[TeamListItem] Failed to render sprite for pet ${M.petSpecies}:`,R),b.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!h){const y=$R();b.appendChild(y);}o.appendChild(b);}}i();const a=Ut.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const d=x("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(d);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const d=x("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});d.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',d.addEventListener("click",p=>{p.stopPropagation(),e.onExpandClick?.();}),t.appendChild(d);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),a());});return s.observe(document.body,{childList:true,subtree:true}),t}function jR(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function ai(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,s=x("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const d=x("div",{className:"sg-container",role:"tablist"}),p=x("div",{className:"sg-indicator"}),c=t.map(F=>{const L=x("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:F.label});if(L.id=F.id,F.icon){const _=x("span",{className:"sg-icon"}),z=jR(F.icon);z&&_.appendChild(z),L.appendChild(_);}const C=x("span",{className:"sg-label"},F.label);return L.appendChild(C),L.disabled=!!F.disabled,L});d.appendChild(p),c.forEach(F=>d.appendChild(F)),s.appendChild(d);let h=n,b=i,y=null;function g(){const F=c.find(L=>L.id===h);F&&requestAnimationFrame(()=>{const L=p,C=F.offsetLeft,_=F.offsetWidth;L.style.width=`${_}px`,L.style.transform=`translateX(${C}px)`;});}function S(){c.forEach(F=>{const L=F.id===h;F.classList.toggle("active",L),F.setAttribute("aria-selected",String(L)),F.disabled=b||!!t.find(C=>C.id===F.id)?.disabled;}),g();}function I(F){const L=F.currentTarget;if(L.disabled)return;M(L.id);}function E(F){if(b)return;const L=c.findIndex(_=>_.id===h);let C=L;if(F.key==="ArrowLeft"||F.key==="ArrowUp"?(F.preventDefault(),C=(L-1+c.length)%c.length):F.key==="ArrowRight"||F.key==="ArrowDown"?(F.preventDefault(),C=(L+1)%c.length):F.key==="Home"?(F.preventDefault(),C=0):F.key==="End"&&(F.preventDefault(),C=c.length-1),C!==L){const _=c[C];_&&!_.disabled&&(M(_.id),_.focus());}}c.forEach(F=>{F.addEventListener("click",I),F.addEventListener("keydown",E);});function M(F){!t.some(C=>C.id===F)||h===F||(h=F,S(),a?.(h));}function R(){return h}function D(F){b=!!F,S();}function N(){c.forEach(F=>{F.removeEventListener("click",I),F.removeEventListener("keydown",E);}),y?.disconnect(),y=null;}S(),y=new ResizeObserver(()=>{const F=c.find(L=>L.id===h);if(F&&F.offsetWidth>0){const L=p;L.style.transition="none",L.style.width=`${F.offsetWidth}px`,L.style.transform=`translateX(${F.offsetLeft}px)`,requestAnimationFrame(()=>{L.style.removeProperty("transition");}),y?.disconnect(),y=null;}}),y.observe(d);const P=s;return P.select=M,P.getSelected=R,P.setDisabled=D,P.destroy=N,P}function uc(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,d=x("div",{className:"lg-checkbox-wrap"}),p=x("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let c=null;i&&a!=="none"&&(c=x("label",{className:"lg-checkbox-label"},i),c.addEventListener("click",S)),c&&a==="left"?d.append(c,p):c&&a==="right"?d.append(p,c):d.append(p);let h=!!n,b=!!r;function y(){p.checked=h,p.disabled=b;}function g(F=false){b||(h=!h,y(),F||s?.(h));}function S(){b||g();}function I(F){b||(F.key===" "||F.key==="Enter")&&(F.preventDefault(),g());}p.addEventListener("click",S),p.addEventListener("keydown",I);function E(){return h}function M(F,L=false){h=!!F,y(),L||s?.(h);}function R(F){b=!!F,y();}function D(F){if(!F){c&&(c.remove(),c=null);return}c?c.textContent=F:(c=x("label",{className:"lg-checkbox-label"},F),c.addEventListener("click",S),d.append(c));}function N(){p.focus();}function P(){p.removeEventListener("click",S),p.removeEventListener("keydown",I),c&&c.removeEventListener("click",S);}return y(),{root:d,input:p,isChecked:E,setChecked:M,setDisabled:R,setLabel:D,focus:N,destroy:P}}let _i=0,hm="",mm="";function GR(){return _i===0&&(hm=document.body.style.overflow,mm=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),_i++,()=>{_i=Math.max(0,_i-1),_i===0&&(document.body.style.overflow=hm,document.body.style.touchAction=mm);}}class UR{constructor(t){ve(this,"dragState",null);ve(this,"longPressState",null);ve(this,"options");ve(this,"onPointerMove");ve(this,"onPointerUp");ve(this,"onPointerCancel");ve(this,"onLongPressPointerMove");ve(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),pt.getAllTeams().findIndex(p=>p.id===r)===-1)return;const a=t.clientX,s=t.clientY,d=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:s,timeout:d,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const a=pt.getAllTeams().findIndex(b=>b.id===r);if(a===-1)return;const s=n.getBoundingClientRect(),d=o.getBoundingClientRect(),p=n.cloneNode(true);p.classList.add("team-list-item--placeholder"),p.classList.remove("team-list-item--dragging");const c=n.style.touchAction;n.style.touchAction="none";const h=GR();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:p,offsetY:t.clientY-s.top,fromIndex:a,teamId:r,captureTarget:n,touchActionPrev:c,releaseScrollLock:h},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-d.left}px`,n.style.top=`${s.top-d.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(p,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const i=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(i)&&(o=Math.max(-8,Math.min(i+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,i=Array.from(n.children).filter(d=>d!==o&&d!==r&&d instanceof HTMLElement&&d.classList.contains("team-list-item")),a=new Map;i.forEach(d=>{a.set(d,d.getBoundingClientRect().top);});let s=false;for(const d of i){const p=d.getBoundingClientRect(),c=p.top+p.height/2;if(t<c){r.nextSibling!==d&&n.insertBefore(r,d),s=true;break}}s||n.appendChild(r),i.forEach(d=>{const p=a.get(d),c=d.getBoundingClientRect().top;if(p!==void 0&&p!==c){const h=p-c;d.style.transform=`translateY(${h}px)`,d.style.transition="none",d.offsetHeight,d.style.transition="transform 0.14s ease",d.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:i,fromIndex:a,touchActionPrev:s,releaseScrollLock:d,pointerId:p}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(p))try{o.releasePointerCapture(p);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const b=Array.from(n.children).filter(y=>y!==o&&y!==i&&y instanceof HTMLElement&&y.classList.contains("team-list-item"))[a]||null;b?n.insertBefore(i,b):n.appendChild(i);}else {const h=Array.from(n.children).filter(y=>y!==o),b=h.indexOf(i);if(b!==-1){const y=h[b];y!==i&&n.insertBefore(i,y);}}if(i.replaceWith(o),i.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=s??"",Array.from(n.children).filter(h=>h instanceof HTMLElement&&h.classList.contains("team-list-item")).forEach(h=>{h.style.transform="",h.style.transition="";}),d?.(),!r){const b=Array.from(n.children).filter(y=>y instanceof HTMLElement&&y.classList.contains("team-list-item")).indexOf(o);if(b!==-1&&b!==a){const g=pt.getAllTeams().slice(),[S]=g.splice(a,1);g.splice(b,0,S);const I=g.map(E=>E.id);pt.reorderTeams(I),this.options.onReorder(I);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class WR{constructor(t={}){ve(this,"card",null);ve(this,"modeControl",null);ve(this,"modeContainer",null);ve(this,"teamContent",null);ve(this,"listContainer",null);ve(this,"teamMode","overview");ve(this,"selectedTeamIds",new Set);ve(this,"teamCheckboxes",new Map);ve(this,"options");ve(this,"dragHandler");this.options=t,this.dragHandler=new UR({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!pt.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=x("div",{className:"team-card-wrapper"});this.modeContainer=x("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=x("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=lt({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=ai({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=x("div",{className:"team-card__disabled-state"}),n=x("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=yt({label:"Enable Feature",onClick:()=>{pt.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=pt.getAllTeams(),n=pt.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=x("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=zR({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await pt.activateTeam(r),this.options.onTeamsUpdated?.();}catch(p){console.error("[TeamCard] Failed to activate team:",p);}}}),a.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,a,r.id):this.dragHandler.startLongPress(s,a,r.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=x("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=x("div",{className:"team-card__actions"}),r=yt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=x("div",{className:"team-card__actions"}),n=yt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=yt({label:"Import from Aries",variant:"default",onClick:()=>{this.handleImportFromAries();}}),o=yt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});o.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),t.appendChild(o),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=pt.getAllTeams(),i=new Set(o.map(a=>a.name));for(;i.has(n);)n=`${t} (${r})`,r++;try{pt.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)pt.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleImportFromAries(){try{const t=pt.importFromAries();t.success?(console.log(`[PetTeam] Successfully imported ${t.imported} team${t.imported===1?"":"s"} from Aries mod`),this.render(),this.options.onTeamsUpdated?.()):console.error("[PetTeam] Import failed:",t.errors.join(", "));}catch(t){console.error("[PetTeam] Import error:",t);}}handleRenameTeam(t,n){pt.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const r=pt.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=pt.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",pt.updateTeam(t,{petIds:o}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const r=pt.getTeam(t);if(!r)return;const i=Ut.myPets.get().all.map(y=>({id:y.id,itemType:"Pet",petSpecies:y.petSpecies,name:y.name??null,xp:y.xp,hunger:y.hunger,mutations:y.mutations||[],targetScale:y.targetScale,abilities:y.abilities||[]})),a=new Set(r.petIds.filter(y=>y!=="")),s=i.filter(y=>!a.has(y.id));await Je.set("mySelectedItemIdAtom",null);const d=Ft.detect();(d.platform==="mobile"||d.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const c=Ut.myInventory.subscribeSelection(y=>{if(y.current&&y.current.item){const g=y.current.item,S=[...r.petIds];S[n]=g.id,pt.updateTeam(t,{petIds:S}),this.options.onTeamsUpdated?.(),Je.set("mySelectedItemIdAtom",null),To.close().then(()=>{const I=Ft.detect();(I.platform==="mobile"||I.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await To.show("inventory",{items:s,favoritedItemIds:[]}),await To.waitForClose();const h=Ft.detect();(h.platform==="mobile"||h.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),c();}createCheckboxIndicator(t){const n=uc({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}const HR=`
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
`;class VR{constructor(){ve(this,"card",null);ve(this,"listContainer",null);ve(this,"innerContent",null);ve(this,"logs",[]);ve(this,"filteredLogs",[]);ve(this,"unsubscribe",null);ve(this,"ITEM_HEIGHT",88);ve(this,"BUFFER_SIZE",3);ve(this,"VIEWPORT_HEIGHT",480);ve(this,"renderedRange",{start:0,end:0});ve(this,"scrollListener",null);ve(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=uo(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const r=t.get().abilityLogs;this.updateFromAbilityLogs(r);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=ke.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=cg(a),d=new Date(n.performedAt),p=d.toLocaleDateString("en-US",{month:"short",day:"numeric"}),c=d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),h=`${p} ${c}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:s,formattedDate:h}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return Xl({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=x("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=x("div",{style:"margin-bottom: 0;"}),r=xa({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const i=o.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=x("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=x("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=lt({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=x("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}async handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let r=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),o=Math.min(this.filteredLogs.length,r+n+this.BUFFER_SIZE*2);if(r===this.renderedRange.start&&o===this.renderedRange.end)return;this.renderedRange={start:r,end:o},this.innerContent.replaceChildren();const i=r*this.ITEM_HEIGHT;if(i>0){const s=x("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=r;s<o;s++){const d=this.filteredLogs[s],p=await this.createLogItemCard(d);this.innerContent.appendChild(p);}const a=Math.max(0,(this.filteredLogs.length-o)*this.ITEM_HEIGHT);if(a>0){const s=x("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}async createLogItemCard(t){const n=x("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const r=x("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const c=await Ne.toCanvas("pet",t.petSpecies);c&&(c.style.width="100%",c.style.height="100%",c.style.objectFit="contain",r.appendChild(c));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=x("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=x("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=x("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=x("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);i.appendChild(a),i.appendChild(s),o.appendChild(i);const d=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(d);const p=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(p),n.appendChild(o),n}}const t0=`
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

`,qR=`
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
`,n0=`
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
`,KR=`
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
`,YR=`
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
`;class XR extends Cr{constructor(n){super({id:"tab-pets",label:"Pets"});ve(this,"unsubscribeMyPets");ve(this,"lastActiveTeamId",null);ve(this,"teamCardPart",null);ve(this,"abilityLogsCardPart",null);ve(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Sn(async()=>{const{MGSprite:a}=await Promise.resolve().then(()=>Vb);return {MGSprite:a}},void 0);await r.init();const o=n.getRootNode();rn(o,t0,"team-card-styles"),rn(o,qR,"base-pet-card-styles"),rn(o,n0,"badge-styles"),rn(o,KR,"arcade-button-styles"),rn(o,HR,"gemini-icon-button-styles"),rn(o,YR,"ability-logs-card-styles");const i=this.createGrid("12px");i.id="pets",n.appendChild(i),this.initializeTeamCardPart(i),this.initializeAbilityLogsCardPart(i),this.unsubscribeMyPets=Ut.myPets.subscribeStable(()=>{const a=pt.getActiveTeamId();a!==this.lastActiveTeamId&&(this.lastActiveTeamId=a,this.teamCardPart?.render());}),this.lastActiveTeamId=pt.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new WR({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new VR);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const JR=`
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
`,gm={ui:{expandedCards:{settings:true,shops:false,weather:false,pet:false}}};async function QR(){const e=await io("tab-alerts",{version:1,defaults:gm,sanitize:o=>({ui:{expandedCards:zo(gm.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:zo(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const ZR={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},gd={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},eF={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},tF={seed:"seed",tool:null,egg:null,decor:null},bm={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function Jp(e,t,n){try{const r=eF[t],o=ke.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=tF[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch(r){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,r),null}}function nF(e,t){return Jp(e,t,"spriteId")}function rF(e,t){const n=Jp(e,t,"rarity");return n?String(n).toLowerCase():null}function oF(e,t){return Jp(e,t,"name")??e}function iF(){const e=oo.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function vm(e){const t=iF(),n=[],r=["seed","tool","egg","decor"];for(const o of r){const i=e.byType[o];if(i)for(const a of i.items){const s=`${o}:${a.id}`;n.push({...a,shopType:o,rarity:rF(a.id,o),spriteId:nF(a.id,o),itemName:oF(a.id,o),isTracked:t.has(s),hasCustomSound:Fe.hasItemCustomSound("shop",a.id,o)});}}return n}const aF=`
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
`,sF={size:"md",closeOnBackdrop:true,closeOnEscape:true};function Qp(e){const t={...sF,...e};let n=false,r=null,o=null,i=null,a=null,s=null;function d(){g(),t.onClose?.();}function p(N){t.closeOnBackdrop&&N.target===o&&d();}function c(N){t.closeOnEscape&&N.key==="Escape"&&d();}function h(){if(!i)return;const N=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),P=Array.from(i.querySelectorAll(N));if(P.length===0)return;const F=P[0],L=P[P.length-1];F.focus();const C=_=>{_.key==="Tab"&&(_.shiftKey?document.activeElement===F&&(_.preventDefault(),L.focus()):document.activeElement===L&&(_.preventDefault(),F.focus()));};i.addEventListener("keydown",C),a=()=>{i?.removeEventListener("keydown",C);};}function b(){r=x("div",{className:"modal-container"}),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-labelledby","modal-title");const N=x("style");N.textContent=aF,r.appendChild(N),o=x("div",{className:"modal-backdrop"}),o.addEventListener("click",p),r.appendChild(o),i=x("div",{className:`modal-dialog modal-dialog--${t.size}`});const P=x("div",{className:"modal-header"}),F=x("h2",{className:"modal-title",id:"modal-title"},t.title);if(t.subtitle){const _=x("div",{className:"modal-title-group"});_.appendChild(F),_.appendChild(x("p",{className:"modal-subtitle"},t.subtitle)),P.appendChild(_);}else P.appendChild(F);const L=x("button",{className:"modal-close",type:"button","aria-label":"Close modal"},"×");L.addEventListener("click",d),P.appendChild(L),i.appendChild(P);const C=x("div",{className:"modal-body"});if(C.appendChild(t.content),i.appendChild(C),t.footer){const _=x("div",{className:"modal-footer"});_.appendChild(t.footer),i.appendChild(_);}return o.appendChild(i),r}function y(){if(!r)return;const N=r.getBoundingClientRect(),P=window.innerWidth,F=window.innerHeight;Math.abs(N.left)>1||Math.abs(N.top)>1||Math.abs(N.width-P)>1||Math.abs(N.height-F)>1?(r.style.left=`${-N.left}px`,r.style.top=`${-N.top}px`,r.style.width=`${P}px`,r.style.height=`${F}px`):(r.style.left="0px",r.style.top="0px",r.style.width="100%",r.style.height="100%");}function g(){!n||!r||(r.classList.remove("is-open"),n=false,a&&(a(),a=null),document.removeEventListener("keydown",c),s?.(),s=null,setTimeout(()=>{r?.remove();},200));}function S(){n&&g(),o?.removeEventListener("click",p),a&&(a(),a=null),document.removeEventListener("keydown",c),s?.(),s=null,r?.remove(),r=null,o=null,i=null;}const I=b();((document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot||document.body||document.documentElement).appendChild(I),requestAnimationFrame(y);const D=()=>y();return window.addEventListener("resize",D),s=()=>{window.removeEventListener("resize",D);},requestAnimationFrame(()=>{r?.classList.add("is-open"),n=true,h(),document.addEventListener("keydown",c);}),{root:I,close:g,destroy:S}}function Zp(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:i=n,label:a,showValue:s=true,disabled:d=false,onInput:p,onChange:c}=e,h=x("div",{className:"slider"}),b=x("div",{className:"slider-row"}),y=x("div",{className:"slider-track"}),g=x("div",{className:"slider-range"});y.appendChild(g);const S=x("input",{id:t,type:"range",min:String(n),max:String(r),step:String(o),value:String(i),disabled:d});S.addEventListener("input",F=>{E(),p?.(R(),F);}),S.addEventListener("change",F=>c?.(R(),F));function I(){const F=r-n;return F===0?0:(R()-n)/F}function E(){const F=Math.max(0,Math.min(1,I()));g.style.width=`${F*100}%`,P&&(P.textContent=String(R()));}function M(F){S.value=String(F),E();}function R(){return Number(S.value)}function D(F){S.disabled=!!F;}let N=null,P=null;return a&&(N=x("span",{className:"slider-label"},a),b.appendChild(N)),y.appendChild(S),b.appendChild(y),s&&(P=x("span",{className:"slider-value"},String(i)),b.appendChild(P)),h.append(b),E(),{root:h,input:S,setValue:M,getValue:R,setDisabled:D}}const ym=`
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
`,lF={title:"Custom Sound",size:"md",closeOnBackdrop:true,closeOnEscape:true},xm={"one-shot":"Play sound once when event occurs",loop:"Loop sound while event is active"},cF=220;function dF(){return (document.querySelector("#gemini-hud-root")||document.querySelector("#gemini-root")||document.querySelector("#gemini-hud-container"))?.shadowRoot??null}function uF(e){const t=dF();if(t){rn(t,ym,"customSoundModal");return}const n=x("style");n.textContent=ym,e.appendChild(n);}function r0(e){const t={...lF,...e};let n=null,r=null,o=null,i=null,a=null,s=null,d=null,p=null,c=null,h=false,b=false,y=null;function g(){c?.(),c=null,p&&(p.pause(),p.currentTime=0),p=null,o?.setLabel("Play");}async function S(){if(p){g();return}if(!d)return;const j=Fe.getById(d.soundId);if(!j){console.error(`[CustomSoundModal] Sound not found: ${d.soundId}`);return}const V=new Audio(j.source);V.volume=d.volume/100,p=V;const U=()=>{g();},ce=()=>{g(),console.error(`[CustomSoundModal] Failed to play sound: ${j.name}`);};V.addEventListener("ended",U),V.addEventListener("error",ce),c=()=>{V.removeEventListener("ended",U),V.removeEventListener("error",ce);};try{await V.play(),o?.setLabel("Stop");}catch(K){g(),console.error("[CustomSoundModal] Failed to play sound:",K);}}function I(){s&&d&&(s.textContent=xm[d.mode]);}function E(){h||y!==null||(y=window.setTimeout(()=>{D();},cF));}function M(){h||b||(b=true,g(),t.onClose?.(),E());}function R(){h||(n?.close(),M());}function D(){h||(h=true,b=true,y!==null&&(window.clearTimeout(y),y=null),g(),r&&(r.destroy(),r=null),a&&(a.destroy(),a=null),i=null,o=null,s=null,d=null,n&&(n.destroy(),n=null));}async function N(){const j=x("span",{className:"custom-sound-modal-title"});let V=false;if(e.spriteId)try{const ce=await Ne.toCanvas(e.spriteId);if(ce){const K=x("span",{className:"custom-sound-modal-title-icon"});ce.className="custom-sound-modal-title-sprite",K.appendChild(ce),j.appendChild(K),V=!0;}}catch{}if(!V&&e.icon){const ce=x("span",{className:"custom-sound-modal-title-icon"},e.icon);j.appendChild(ce);}const U=x("span",{className:"custom-sound-modal-title-text"},e.entityName);return j.appendChild(U),j}function P(){const j=x("div",{className:"custom-sound-modal-body"}),V=Fe.getItemCustomSound(e.entityType,e.entityId,e.shopType),U=Fe.getNotificationConfig(e.entityType);d=V?{soundId:V.soundId,volume:V.volume,mode:V.mode}:{soundId:U.soundId,volume:U.volume,mode:U.mode};const ce=Fe.getAll().map(B=>({value:B.id,label:B.name})),K=x("div",{className:"custom-sound-modal-row"}),ie=x("label",{className:"custom-sound-modal-label"},"Sound");K.appendChild(ie);const se=x("div",{className:"custom-sound-modal-controls"});r=eo({value:d.soundId,options:ce,size:"sm",onChange:B=>{d&&(d.soundId=B),g();}}),se.appendChild(r.root),o=yt({label:"Play",variant:"default",size:"sm",onClick:()=>S()}),se.appendChild(o),K.appendChild(se),j.appendChild(K);const ae=x("div",{className:"custom-sound-modal-row"}),ne=x("label",{className:"custom-sound-modal-label"},"Volume");ae.appendChild(ne),i=Zp({min:0,max:100,step:1,value:d.volume,showValue:true,onChange:B=>{d&&(d.volume=B),p&&(p.volume=B/100);}}),ae.appendChild(i.root),j.appendChild(ae);const Y=x("div",{className:"custom-sound-modal-row"}),Z=x("label",{className:"custom-sound-modal-label"},"Mode");Y.appendChild(Z);const O=x("div",{className:"custom-sound-modal-mode-controls"});return a=eo({value:d.mode,options:[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],size:"sm",onChange:B=>{d&&(d.mode=B),I();}}),O.appendChild(a.root),s=x("div",{className:"custom-sound-modal-mode-description"},xm[d.mode]),O.appendChild(s),Y.appendChild(O),j.appendChild(Y),j}function F(){const j=x("div",{className:"custom-sound-modal-footer"}),V=yt({label:"Reset",variant:"danger",size:"sm",onClick:()=>{e.onSave(null),R();}});j.appendChild(V);const U=x("div",{style:"flex: 1"});j.appendChild(U);const ce=yt({label:"Cancel",variant:"default",size:"sm",onClick:()=>R()});j.appendChild(ce);const K=yt({label:"Save",variant:"primary",size:"sm",onClick:()=>{d&&e.onSave({...d}),R();}});return j.appendChild(K),j}const L=P(),C=F(),_=x("div");uF(_),_.appendChild(L),n=Qp({title:e.entityName||t.title,content:_,footer:C,size:t.size,closeOnBackdrop:t.closeOnBackdrop,closeOnEscape:t.closeOnEscape,onClose:M}),n.root.classList.add("custom-sound-modal");const z=n.root.querySelector(".modal-title");return z&&N().then(j=>z.replaceChildren(j)),{root:n.root,close:R,destroy:D}}const pF=["seed","tool","egg","decor"],fF=new Set(pF);function bd(e){const[t,...n]=e.split(":");return !t||n.length===0||!fF.has(t)?null:{shopType:t,itemId:n.join(":")}}const hF=500,wm=10,mF=800;function gF(e){const{rows:t}=e,n=new Map;let r=null,o=false;const i=new Map;let a=null,s=null,d=null,p=null,c=null,h=false;function b(O,B){B?O.classList.add("has-custom-sound"):O.classList.remove("has-custom-sound");}function y(O){const B=bd(O);return B?Fe.hasItemCustomSound("shop",B.itemId,B.shopType):false}function g(O){if(!r)return null;const B=r.root.querySelectorAll(".lg-tr-body");for(const J of B)if(J.dataset.id===O)return J;return null}function S(O,B){const J=g(O);if(!J)return;const re=B??y(O);b(J,re);}function I(){if(!r)return;r.root.querySelectorAll(".lg-tr-body").forEach(B=>{const J=B.dataset.id;J&&b(B,y(J));});}function E(){o||(o=true,requestAnimationFrame(()=>{o=false,I();}));}function M(O){i.clear();for(const B of O)i.set(`${B.shopType}:${B.id}`,B);}function R(O){const B=bd(O);return B?Fe.hasItemCustomSound("shop",B.itemId,B.shopType):false}function D(O){const B=bd(O);if(!B||!Fe.hasItemCustomSound("shop",B.itemId,B.shopType))return;Fe.removeItemCustomSound("shop",B.itemId,B.shopType);const J=i.get(O);J&&(J.hasCustomSound=false),S(O,false),E();}function N(){s!==null&&(window.clearTimeout(s),s=null),a=null;}function P(O){a=O,s!==null&&window.clearTimeout(s),s=window.setTimeout(()=>{s=null,a=null;},mF);}function F(){d!==null&&(window.clearTimeout(d),d=null),p=null,c=null,h=false;}if(r=Ol({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(O,B)=>O.itemName.localeCompare(B.itemName,void 0,{numeric:true,sensitivity:"base"}),render:O=>{const B=x("div",{className:"shop-item-cell"}),J=x("div",{className:"shop-item-icon"});O.spriteId?Ne.toCanvas(O.spriteId).then(le=>{le?(le.className="shop-item-sprite",J.appendChild(le)):J.textContent=gd[O.shopType];}).catch(()=>{J.textContent=gd[O.shopType];}):J.textContent=gd[O.shopType];const re=x("div",{className:"shop-item-name"});return re.textContent=O.itemName,B.appendChild(J),B.appendChild(re),B}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(O,B)=>{const J=O.rarity?bm[O.rarity.toLowerCase()]??999:999,re=B.rarity?bm[B.rarity.toLowerCase()]??999:999;return J-re},render:O=>{const B=x("div",{className:"shop-item-rarity"}),J=Xl({variant:"rarity",rarity:O.rarity});return B.appendChild(J.root),B}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:O=>{const B=x("div",{className:"shop-item-notify"}),J=em(O.id,O.shopType),re=xr({checked:O.isTracked,disabled:J,size:"sm",onChange:ye=>{O.isTracked=ye,ye?oo.addTrackedItem(O.shopType,O.id):oo.removeTrackedItem(O.shopType,O.id);}}),le=`${O.shopType}:${O.id}`;return n.set(le,re),B.appendChild(re.root),B}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:O=>`${O.shopType}:${O.id}`,onSortChange:()=>{E();},onRowClick:(O,B,J)=>{const re=`${O.shopType}:${O.id}`;if(a){if(a===re){N();return}N();}J.target.closest(".shop-item-notify")||r0({entityType:"shop",entityId:O.id,entityName:O.itemName,spriteId:O.spriteId,shopType:O.shopType,onSave:ye=>{ye===null?(Fe.removeItemCustomSound("shop",O.id,O.shopType),O.hasCustomSound=false,S(re,false)):(Fe.setItemCustomSound("shop",O.id,ye,O.shopType),O.hasCustomSound=true,S(re,true));}});}}),!r)throw new Error("[ShopsCard] Failed to create items table");M(t);const C=r.root,_=O=>{const B=O.target;if(B.closest(".shop-item-notify"))return;const re=B.closest(".lg-tr-body")?.dataset.id;!re||!R(re)||(O.preventDefault(),O.stopPropagation(),P(re),D(re));},z=O=>{if(O.pointerType==="mouse"||O.button!==0)return;const B=O.target;if(B.closest(".shop-item-notify"))return;const re=B.closest(".lg-tr-body")?.dataset.id;!re||!R(re)||(F(),p=re,c={x:O.clientX,y:O.clientY},d=window.setTimeout(()=>{d=null,p&&(h=true,P(p),D(p));},hF));},j=O=>{if(!c||!p||h)return;const B=O.clientX-c.x,J=O.clientY-c.y;B*B+J*J>wm*wm&&F();},V=()=>{F();},U=()=>{F();};C.addEventListener("contextmenu",_),C.addEventListener("pointerdown",z),C.addEventListener("pointermove",j),C.addEventListener("pointerup",V),C.addEventListener("pointercancel",U);const ce=r.setData.bind(r);r.setData=O=>{M(O),ce(O),E();},E();const K=O=>{for(const[B,J]of n.entries()){const[re,le]=B.split(":");if(O&&re!==O)continue;const ye=em(le,re);J.setDisabled(ye);}},se=po().subscribeStable(()=>{K();}),ae=co(),ne=ae.subscribeDecorPlaced(()=>{K("decor");}),Y=ae.subscribeDecorRemoved(()=>{K("decor");}),Z=r.destroy.bind(r);return r.destroy=()=>{se(),ne(),Y(),C.removeEventListener("contextmenu",_),C.removeEventListener("pointerdown",z),C.removeEventListener("pointermove",j),C.removeEventListener("pointerup",V),C.removeEventListener("pointercancel",U),F(),N(),n.clear(),i.clear(),Z();},r}function bF(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function vF(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=x("div",{className:"select"});for(const c of Array.from(e.classList))c.startsWith("select--")&&o.classList.add(c);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=x("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=x("span",{className:"select-value"},t),d=x("span",{className:"select-caret"},a);i.append(s,d),o.appendChild(i),r.appendChild(o);const p=Math.ceil(i.getBoundingClientRect().width);return o.remove(),p}function yF(e,t){const n=bF(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=vF(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function xF(e){const t=ni(),n=t.get();let r=null,o=[],i=[];const a={selectedShopType:"all",searchQuery:""},s={shopTypeSelect:null,searchInput:null,tableHandle:null};let d=0,p=new Set;function c(I,E){if(I.size!==E.size)return  false;for(const M of I)if(!E.has(M))return  false;return  true}function h(){if(!s.tableHandle)return;const I=o.filter(E=>!(a.selectedShopType!=="all"&&E.shopType!==a.selectedShopType||a.searchQuery&&!E.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));i=I,s.tableHandle.setData(I);}function b(){const I=x("div",{className:"shops-card-filters"}),M=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(D=>({value:D,label:ZR[D]}))];s.shopTypeSelect=eo({value:"all",options:M,size:"sm",onChange:D=>{a.selectedShopType=D,h();}});const R=s.shopTypeSelect.root;return R.style.minWidth="0",R.style.width="auto",yF(R,M.map(D=>D.label)),s.searchInput=xa({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:D=>{a.searchQuery=D.trim(),h();}}),I.appendChild(s.shopTypeSelect.root),I.appendChild(s.searchInput.root),I}function y(){o=vm(n),i=[...o],d=o.length,p=new Set(o.map(N=>N.shopType));const I=x("div");s.tableHandle=gF({rows:i});const E=b();I.appendChild(E),I.appendChild(s.tableHandle.root);const M=x("div",{className:"shops-card-hint"}),R=x("span",{className:"shops-card-hint-desktop"},"Click an item to set a custom sound alert. Right-click to reset"),D=x("span",{className:"shops-card-hint-mobile"},"Tap an item to set a custom sound alert. Long-press to reset");return M.append(R,D),I.appendChild(M),r=lt({id:"shops-card",title:"Shops restock",subtitle:"Get notified when tracked items restock",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"shops",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},I),r}function g(){const I=t.get(),E=vm(I),M=E.length,R=new Set(E.map(N=>N.shopType));(M!==d||!c(R,p))&&(d=M,p=R,o=E,h());}function S(){if(s.tableHandle&&(s.tableHandle.destroy(),s.tableHandle=null),s.shopTypeSelect&&(s.shopTypeSelect.destroy(),s.shopTypeSelect=null),s.searchInput){const I=s.searchInput.root.__cleanup;I&&I(),s.searchInput=null;}r=null;}return {root:y(),refresh:g,destroy:S}}const wF=".mp3,.wav,.ogg,audio/*",CF=250*1024,kF=3;function SF(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`}function AF(e){const t=e.name||"Untitled",n=t.lastIndexOf(".");return n<=0?t:t.slice(0,n)||t}function EF(e){if(!Number.isFinite(e))return "0 B";if(e<1024)return `${e} B`;const t=e/1024;return t<1024?`${Math.round(t)} KB`:`${(t/1024).toFixed(1)} MB`}function o0(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function _F(e,t){const n=o0(t);if(!n.length)return  true;const r=e.name.toLowerCase(),o=e.type.toLowerCase();return n.some(i=>{const a=i.toLowerCase();if(a.startsWith("."))return r.endsWith(a);if(a.endsWith("/*")){const s=a.slice(0,-1);return o.startsWith(s)}return o===a})}function IF(e){const n=o0(e).map(r=>r.startsWith(".")?r.slice(1).toUpperCase():r.endsWith("/*")?"Audio":r.includes("/")&&r.split("/")[1]?.toUpperCase()||r.toUpperCase()).filter(Boolean);return n.length?n.join(", "):"Audio"}function TF(e={}){const{id:t,className:n,label:r="Add sounds",hint:o,accept:i=wF,multiple:a=true,disabled:s=false,maxSizeBytes:d=CF,maxItems:p,emptyLabel:c="No sounds added yet",onItemsChange:h,onFilesAdded:b,onError:y}=e;let g=[],S=0,I=null,E=false,M=!!s,R=null,D=null,N=null;const P=new Map,F=new Map,L=Number.isFinite(p)?Math.max(1,Number(p)):a?Number.POSITIVE_INFINITY:1,C=x("div",{className:"sound-picker",id:t});n&&C.classList.add(...n.split(" ").filter(Boolean)),M&&C.classList.add("is-disabled");const _=x("div",{className:"sound-picker__header"}),z=x("div",{className:"sound-picker__label"},r),j=o??`${IF(i)} - Max ${EF(d)}`,V=x("div",{className:"sound-picker__hint"},j);_.append(z,V);const U=x("div",{className:"sound-picker__zone",role:"button",tabIndex:M?-1:0,"aria-disabled":String(M)}),ce=x("div",{className:"sound-picker__zone-text"}),K=x("div",{className:"sound-picker__zone-title"},"Drop audio files here"),ie=x("div",{className:"sound-picker__zone-subtitle"},"or click to browse");ce.append(K,ie);const se=yt({label:a?"Choose files":"Choose file",size:"sm",onClick:m=>{m.preventDefault(),M||ae.click();},disabled:M});se.classList.add("sound-picker__pick");const ae=x("input",{className:"sound-picker__input",type:"file",accept:i,multiple:a?true:void 0,disabled:M,tabIndex:-1});U.append(ce,se,ae);const ne=x("div",{className:"sound-picker__status",role:"status","aria-live":"polite"}),Y=x("div",{className:"sound-picker__list",role:"list"});C.append(_,U,ne,Y);function Z(m,A="info"){const G=m??"";ne.textContent=G,ne.classList.toggle("is-error",A==="error");}function O(m){y?.(m),Z(m.message,"error");}function B(){for(const m of P.values())try{m.destroy();}catch{}P.clear();}function J(m){const A=F.get(m.id);if(A)return A;const G=m.file.__sourceUrl;if(G)return F.set(m.id,G),G;const W=URL.createObjectURL(m.file);return F.set(m.id,W),W}function re(m){const A=F.get(m);A&&(A.startsWith("blob:")&&URL.revokeObjectURL(A),F.delete(m));}function le(){N?.(),N=null,R&&(R.pause(),R.currentTime=0),R=null,D=null;}function ye(){Y.querySelectorAll(".sound-picker__item").forEach(A=>{const G=A.dataset.id,W=A.querySelector(".sound-picker__item-btn--play");if(!G||!W)return;const Q=!!R&&D===G&&!R.paused;W.textContent=Q?"Stop":"Play",A.classList.toggle("is-playing",Q);});}function Ie(m){if(M)return;if(D===m.id){le(),ye();return}le();const A=J(m),G=new Audio(A);R=G,D=m.id;const W=()=>{D===m.id&&(le(),ye());},Q=()=>{D===m.id&&(le(),ye(),O({code:"type",file:m.file,message:`Unable to play ${m.name}`}));};G.addEventListener("ended",W),G.addEventListener("error",Q),N=()=>{G.removeEventListener("ended",W),G.removeEventListener("error",Q);},G.play().then(()=>{ye();}).catch(()=>{le(),ye(),O({code:"type",file:m.file,message:`Unable to play ${m.name}`});});}function Be(){if(B(),Y.classList.toggle("is-scrollable",g.length>kF),!g.length){const A=x("div",{className:"sound-picker__empty"});A.append(typeof c=="string"?document.createTextNode(c):c),Y.replaceChildren(A);return}const m=g.map(A=>xt(A));if(Y.replaceChildren(...m),I){const A=P.get(I);A&&requestAnimationFrame(()=>A.focus());}ye();}function xt(m){const A=I===m.id,G=x("div",{className:"sound-picker__item",role:"listitem","data-id":m.id}),W=x("div",{className:"sound-picker__item-top"});x("div",{className:"sound-picker__item-bottom"});const Q=x("div",{className:"sound-picker__item-name"});if(A&&!M){const xe=Fl({value:m.name,blockGameKeys:true,onEnter:ge=>{Mt(m.id,ge);}});xe.root.classList.add("sound-picker__rename"),xe.input.classList.add("input--sm"),xe.input.setAttribute("aria-label","Rename sound"),xe.input.addEventListener("keydown",ge=>{ge.key==="Escape"&&(ge.preventDefault(),qt());}),xe.input.addEventListener("blur",()=>{if(E){E=false;return}Mt(m.id,xe.getValue());}),P.set(m.id,xe),Q.appendChild(xe.root);}else {const xe=x("div",{className:"sound-picker__item-label",title:m.name},m.name);Q.appendChild(xe);}const de=x("div",{className:"sound-picker__item-actions","aria-label":"Sound actions"});if(A&&!M){const xe=x("button",{className:"sound-picker__item-btn",type:"button",disabled:M},"Save");xe.addEventListener("click",()=>{const we=P.get(m.id);Mt(m.id,we?.getValue()??m.name);});const ge=x("button",{className:"sound-picker__item-btn",type:"button",disabled:M},"Cancel");ge.addEventListener("pointerdown",()=>{E=true;}),ge.addEventListener("click",()=>qt()),de.append(xe,ge);}else {const xe=x("button",{className:"sound-picker__item-btn sound-picker__item-btn--play",type:"button",disabled:M},D===m.id?"Stop":"Play");xe.addEventListener("click",()=>Ie(m));const ge=x("button",{className:"sound-picker__item-btn",type:"button",disabled:M},"Rename");ge.addEventListener("click",()=>{M||(I=m.id,Be());});const we=x("button",{className:"sound-picker__item-btn sound-picker__item-btn--danger",type:"button",disabled:M},"Remove");we.addEventListener("click",()=>rt(m.id)),de.append(xe,ge,we);}return W.append(Q,de),G.append(W),G}function zt(){return g.slice()}function ut(m){const A=m.slice(),G=new Set(A.map(W=>W.id));for(const W of Array.from(F.keys()))G.has(W)||re(W);D&&!G.has(D)&&le(),g=A,I=null,Be(),h?.(zt());}function Et(m){if(M)return;const A=Array.from(m??[]);if(!A.length)return;const G=[],W=[];for(const we of A){if(i&&!_F(we,i)){W.push({code:"type",file:we,message:`Unsupported file type: ${we.name}`});continue}if(Number.isFinite(d)&&we.size>d){W.push({code:"size",file:we,maxSizeBytes:d,message:`File too large: ${we.name}`});continue}G.push({id:SF(),file:we,name:AF(we),size:we.size,type:we.type});}if(!G.length){W.length&&O(W[0]);return}const Q=a?g.slice():[],de=Number.isFinite(L)?Math.max(0,L-Q.length):G.length;if(de<=0){O({code:"limit",message:`Maximum of ${Math.max(1,L)} files reached`});return}const xe=G.slice(0,de),ge=a?Q.concat(xe):xe.slice(0,1);ut(ge),Z(null),b?.(xe.slice()),W.length&&O(W[0]);}function Vt(m,A){const G=A.trim();if(!G){O({code:"name",message:"Name cannot be empty"});return}const W=g.map(Q=>Q.id===m?{...Q,name:G}:Q);ut(W),Z(null);}function Mt(m,A){const G=A.trim();if(!G){O({code:"name",message:"Name cannot be empty"});return}Vt(m,G);}function qt(){I=null,Z(null),Be();}function rt(m){const A=g.filter(G=>G.id!==m);ut(A),Z(null);}function De(){le(),ut([]),Z(null);}function bn(m){M=!!m,C.classList.toggle("is-disabled",M),U.setAttribute("aria-disabled",String(M)),U.tabIndex=M?-1:0,ae.disabled=M,se.setDisabled(M),M&&le(),Be();}function vn(){M||ae.click();}const ht=m=>{if(M)return;const A=m.target;A&&A.closest(".sound-picker__pick")||ae.click();},kt=m=>{M||(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),ae.click());},Kt=m=>{M||!m.dataTransfer||!m.dataTransfer.types.includes("Files")||(m.preventDefault(),S+=1,U.classList.add("is-dragover"));},In=m=>{M||!m.dataTransfer||!m.dataTransfer.types.includes("Files")||(m.preventDefault(),m.dataTransfer.dropEffect="copy");},on=m=>{M||U.classList.contains("is-dragover")&&(m.preventDefault(),S=Math.max(0,S-1),S<=0&&(S=0,U.classList.remove("is-dragover")));},k=m=>{M||!m.dataTransfer||!m.dataTransfer.files.length||(m.preventDefault(),S=0,U.classList.remove("is-dragover"),Et(m.dataTransfer.files));},f=()=>{if(M){ae.value="";return}ae.files&&Et(ae.files),ae.value="";};return U.addEventListener("click",ht),U.addEventListener("keydown",kt),U.addEventListener("dragenter",Kt),U.addEventListener("dragover",In),U.addEventListener("dragleave",on),U.addEventListener("drop",k),ae.addEventListener("change",f),Be(),{root:C,getItems:zt,setItems:ut,addFiles:Et,renameItem:Vt,removeItem:rt,clear:De,setDisabled:bn,openPicker:vn,setStatus:Z,destroy(){B(),le();for(const m of Array.from(F.keys()))re(m);U.removeEventListener("click",ht),U.removeEventListener("keydown",kt),U.removeEventListener("dragenter",Kt),U.removeEventListener("dragover",In),U.removeEventListener("dragleave",on),U.removeEventListener("drop",k),ae.removeEventListener("change",f),C.remove();}}}const Cm={shop:{"one-shot":"Play sound once when item appears",loop:"Loop sound while item is available in shop"},pet:{"one-shot":"Play sound once when pet event occurs",loop:"Loop sound while pet event is active"},weather:{"one-shot":"Play sound once when weather occurs",loop:"Loop sound while weather is active"}};function PF(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function LF(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=x("div",{className:"select"});for(const c of Array.from(e.classList))c.startsWith("select--")&&o.classList.add(c);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const i=x("button",{className:"select-trigger",type:"button"});i.style.width="auto",i.style.minWidth="0",i.style.whiteSpace="nowrap";const a=e.querySelector(".select-caret")?.textContent||"v",s=x("span",{className:"select-value"},t),d=x("span",{className:"select-caret"},a);i.append(s,d),o.appendChild(i),r.appendChild(o);const p=Math.ceil(i.getBoundingClientRect().width);return o.remove(),p}function MF(e,t){const n=PF(t);if(!n)return;let r=0;const o=6,i=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(i);return}const a=LF(e,n);a>0&&(e.style.width=`${a}px`,e.style.minWidth=`${a}px`);};requestAnimationFrame(i);}function RF(e){let t=null,n=null,r=null;const o=new Map,i=new Map,a=new Map;let s=null,d=null,p=null;function c(){p?.(),p=null,s&&(s.pause(),s.currentTime=0),s=null,d=null;}function h(){if(!r)return;r.querySelectorAll(".notification-item").forEach(P=>{const F=P.dataset.type,L=P.querySelector(".notification-item-play");if(!F||!L)return;const C=!!s&&d===F&&!s.paused;L.textContent=C?"Stop":"Play",P.classList.toggle("is-playing",C);});}async function b(N){if(d===N){c(),h();return}c();const P=Fe.getNotificationConfig(N),F=Fe.getById(P.soundId);if(!F){console.error(`[SettingCard] Sound not found: ${P.soundId}`);return}const L=new Audio(F.source);L.volume=P.volume/100,s=L,d=N;const C=()=>{d===N&&(c(),h());},_=()=>{d===N&&(c(),h(),console.error(`[SettingCard] Failed to play sound: ${F.name}`));};L.addEventListener("ended",C),L.addEventListener("error",_),p=()=>{L.removeEventListener("ended",C),L.removeEventListener("error",_);};try{await L.play(),h();}catch(z){c(),h(),console.error("[SettingCard] Failed to play sound:",z);}}function y(N,P){if(N.startsWith("data:"))try{const F=N.split(","),L=F[0].match(/:(.*?);/)?.[1]||"audio/mpeg",C=atob(F[1]),_=C.length,z=new Uint8Array(_);for(let j=0;j<_;j++)z[j]=C.charCodeAt(j);return new File([z],P,{type:L})}catch(F){return console.error("[SettingCard] Failed to convert data URL to File:",F),new File([],P,{type:"audio/mpeg"})}return new File([],P,{type:"audio/mpeg"})}function g(){const P=Fe.getAll().map(F=>({value:F.id,label:F.name}));for(const[F,L]of o){const C=Fe.getNotificationConfig(F);L.setOptions(P),L.setValue(C.soundId);}}function S(N,P,F){const L=x("div",{className:"notification-item","data-type":N}),C=x("div",{className:"notification-item-label"},P);L.appendChild(C);const _=x("div",{className:"notification-item-description"},F);L.appendChild(_);const z=x("div",{className:"notification-item-controls"}),j=Fe.getNotificationConfig(N),U=Fe.getAll().map(Z=>({value:Z.id,label:Z.name})),ce=eo({value:j.soundId,options:U,size:"sm",onChange:Z=>{const O=Fe.getNotificationConfig(N);Fe.setNotificationConfig(N,{soundId:Z,volume:O.volume,mode:O.mode});}});o.set(N,ce);const K=x("button",{className:"notification-item-play",type:"button",title:"Test sound"},"Play");K.addEventListener("click",()=>{b(N);}),z.appendChild(ce.root),z.appendChild(K),L.appendChild(z);const ie=Zp({min:0,max:100,step:1,value:j.volume,showValue:true,onChange:Z=>{const O=Fe.getNotificationConfig(N);Fe.setNotificationConfig(N,{soundId:O.soundId,volume:Z,mode:O.mode});}});a.set(N,ie),L.appendChild(ie.root);const se=x("div",{className:"notification-mode-row"}),ae=[{value:"one-shot",label:"One-shot"},{value:"loop",label:"Loop"}],ne=eo({value:j.mode,options:ae,size:"sm",onChange:Z=>{const O=Fe.getNotificationConfig(N);Fe.setNotificationConfig(N,{soundId:O.soundId,volume:O.volume,mode:Z}),I(N);}});i.set(N,ne),ne.root.classList.add("shrink"),MF(ne.root,ae.map(Z=>Z.label)),se.appendChild(ne.root);const Y=x("div",{className:"notification-mode-description"},Cm[N][j.mode]);return se.appendChild(Y),L.appendChild(se),L}function I(N){if(!r)return;const P=r.querySelector(`[data-type="${N}"]`);if(!P)return;const F=Fe.getNotificationConfig(N),L=P.querySelector(".notification-mode-description");L&&(L.textContent=Cm[N][F.mode]);}function E(){const N=x("div",{className:"alerts-settings-body"});Fe.init(),r=x("div",{className:"notification-settings"}),r.appendChild(S("shop","Shops restock","Default sound for shop restock alerts")),r.appendChild(S("pet","Pet events","Default sound for pet event alerts")),r.appendChild(S("weather","Weather events","Default sound for weather event alerts")),N.appendChild(r);const P=x("div",{className:"alerts-settings-divider"});N.appendChild(P);const F=Fe.getAll().map(L=>{const C=y(L.source,L.name);return C.__sourceUrl=L.source,{id:L.id,file:C,name:L.name,size:0,type:L.type}});return n=TF({label:"Notification sounds",hint:"Upload or drop audio files for alerts",maxItems:Wo.MAX_SOUNDS,maxSizeBytes:Wo.MAX_SIZE_BYTES,multiple:true,onItemsChange:L=>{M(L),g();},onFilesAdded:L=>{R(L),setTimeout(()=>{g();},100);}}),n.setItems(F),N.appendChild(n.root),t=lt({id:"alerts-settings-card",title:"Settings",subtitle:"Manage notification sounds",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"settings",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},N),t}function M(N){const P=new Set(Fe.getAll().map(C=>C.id)),F=new Set(N.map(C=>C.id)),L=[];for(const C of P)if(!F.has(C)){L.push(C);try{Fe.remove(C);}catch(_){console.error(`[SettingCard] Failed to remove sound ${C}:`,_);}}if(L.length>0){const C=["shop","pet","weather"];for(const _ of C){const z=Fe.getNotificationConfig(_);if(L.includes(z.soundId)){Fe.setNotificationConfig(_,{soundId:"default-notification",volume:z.volume,mode:z.mode});const j=a.get(_);j&&j.setValue(z.volume);}}}for(const C of N)if(P.has(C.id)){const _=Fe.getById(C.id);if(_&&_.name!==C.name)try{Fe.update(C.id,{name:C.name});}catch(z){console.error(`[SettingCard] Failed to rename sound ${C.id}:`,z);}}}function R(N){for(const P of N)if(!Fe.getById(P.id)){const F=new FileReader;F.onload=L=>{const C=L.target?.result;try{const _=Fe.add(P.name,C,"upload");if(n&&_.id!==P.id){const z=n.getItems().map(j=>j.id===P.id?{...j,id:_.id}:j);n.setItems(z);}}catch(_){console.error(`[SettingCard] Failed to add sound ${P.name}:`,_);}},F.onerror=()=>{console.error(`[SettingCard] Failed to read file ${P.name}`);},F.readAsDataURL(P.file);}}function D(){c(),n&&(n.destroy(),n=null);for(const N of o.values())N.destroy();o.clear();for(const N of i.values())N.destroy();i.clear(),a.clear(),t=null;}return {root:E(),destroy:D}}function FF(e){try{const t=ke.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function OF(e){try{const t=ke.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function NF(e){try{const t=ke.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const r=n.mutator;if(!r||typeof r!="object")return "No effects";const o=r.mutation;if(!o)return "No effects";const i=ke.get("mutations");if(!i||typeof i!="object")return o;const a=i[o];return !a||typeof a!="object"?o:a.name||o}catch{return "No effects"}}function km(){const e=ke.get("weather");if(!e||typeof e!="object")return [];const t=Yo.getTrackedWeathers(),n=new Set(t),r=[];for(const o of Object.keys(e)){if(o==="Sunny")continue;const i={weatherId:o,weatherName:FF(o),spriteId:OF(o),effects:NF(o),isTracked:n.has(o),hasCustomSound:Fe.hasItemCustomSound("weather",o)};r.push(i);}return r.sort((o,i)=>o.weatherName.localeCompare(i.weatherName)),r}const DF=500,Sm=10,$F=800;function BF(e){const{rows:t}=e;let n=null,r=false;const o=new Map;let i=null,a=null,s=null,d=null,p=null,c=false;function h(K,ie){ie?K.classList.add("has-custom-sound"):K.classList.remove("has-custom-sound");}function b(K){return Fe.hasItemCustomSound("weather",K)}function y(K){if(!n)return null;const ie=n.root.querySelectorAll(".lg-tr-body");for(const se of ie)if(se.dataset.id===K)return se;return null}function g(K,ie){const se=y(K);if(!se)return;const ae=ie??b(K);h(se,ae);}function S(){if(!n)return;n.root.querySelectorAll(".lg-tr-body").forEach(ie=>{const se=ie.dataset.id;se&&h(ie,b(se));});}function I(){r||(r=true,requestAnimationFrame(()=>{r=false,S();}));}function E(K){o.clear();for(const ie of K)o.set(ie.weatherId,ie);}function M(K){return Fe.hasItemCustomSound("weather",K)}function R(K){if(!Fe.hasItemCustomSound("weather",K))return;Fe.removeItemCustomSound("weather",K);const ie=o.get(K);ie&&(ie.hasCustomSound=false),g(K,false),I();}function D(){a!==null&&(window.clearTimeout(a),a=null),i=null;}function N(K){i=K,a!==null&&window.clearTimeout(a),a=window.setTimeout(()=>{a=null,i=null;},$F);}function P(){s!==null&&(window.clearTimeout(s),s=null),d=null,p=null,c=false;}if(n=Ol({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(K,ie)=>K.weatherName.localeCompare(ie.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:K=>{const ie=x("div",{className:"weather-item-cell"}),se=x("div",{className:"weather-item-icon"});K.spriteId&&Ne.has(K.spriteId)?Ne.toCanvas(K.spriteId).then(ne=>{ne.className="weather-item-sprite",se.appendChild(ne);}).catch(()=>{se.textContent=Am(K.weatherId);}):se.textContent=Am(K.weatherId);const ae=x("div",{className:"weather-item-name"});return ae.textContent=K.weatherName,ie.appendChild(se),ie.appendChild(ae),ie}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:K=>{const ie=x("div",{className:"weather-item-effects"});return ie.textContent=K.effects,ie}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:K=>{const ie=x("div",{className:"weather-item-notify"}),se=xr({checked:K.isTracked,disabled:false,size:"sm",onChange:ae=>{K.isTracked=ae,ae?Yo.addTrackedWeather(K.weatherId):Yo.removeTrackedWeather(K.weatherId);}});return ie.appendChild(se.root),ie}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:K=>K.weatherId,onSortChange:()=>{I();},onRowClick:(K,ie,se)=>{const ae=K.weatherId;if(i){if(i===ae){D();return}D();}se.target.closest(".weather-item-notify")||r0({entityType:"weather",entityId:K.weatherId,entityName:K.weatherName,spriteId:K.spriteId,onSave:Y=>{Y===null?(Fe.removeItemCustomSound("weather",K.weatherId),K.hasCustomSound=false,g(ae,false)):(Fe.setItemCustomSound("weather",K.weatherId,Y),K.hasCustomSound=true,g(ae,true));}});}}),!n)throw new Error("[WeatherCard] Failed to create weather table");E(t);const L=n.root,C=K=>{const ie=K.target;if(ie.closest(".weather-item-notify"))return;const ae=ie.closest(".lg-tr-body")?.dataset.id;!ae||!M(ae)||(K.preventDefault(),K.stopPropagation(),N(ae),R(ae));},_=K=>{if(K.pointerType==="mouse"||K.button!==0)return;const ie=K.target;if(ie.closest(".weather-item-notify"))return;const ae=ie.closest(".lg-tr-body")?.dataset.id;!ae||!M(ae)||(P(),d=ae,p={x:K.clientX,y:K.clientY},s=window.setTimeout(()=>{s=null,d&&(c=true,N(d),R(d));},DF));},z=K=>{if(!p||!d||c)return;const ie=K.clientX-p.x,se=K.clientY-p.y;ie*ie+se*se>Sm*Sm&&P();},j=()=>{P();},V=()=>{P();};L.addEventListener("contextmenu",C),L.addEventListener("pointerdown",_),L.addEventListener("pointermove",z),L.addEventListener("pointerup",j),L.addEventListener("pointercancel",V);const U=n.setData.bind(n);n.setData=K=>{E(K),U(K),I();},I();const ce=n.destroy.bind(n);return n.destroy=()=>{L.removeEventListener("contextmenu",C),L.removeEventListener("pointerdown",_),L.removeEventListener("pointermove",z),L.removeEventListener("pointerup",j),L.removeEventListener("pointercancel",V),P(),D(),o.clear(),ce();},n}function Am(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function zF(e){let t=null,n=[];const r={tableHandle:null};let o=0;function i(){n=km(),o=n.length;const d=x("div");r.tableHandle=BF({rows:n}),d.appendChild(r.tableHandle.root);const p=x("div",{className:"weather-card-hint"}),c=x("span",{className:"weather-card-hint-desktop"},"Click a weather to set a custom sound alert. Right-click to reset"),h=x("span",{className:"weather-card-hint-mobile"},"Tap a weather to set a custom sound alert. Long-press to reset");return p.append(c,h),d.appendChild(p),t=lt({id:"weather-card",title:"Weather events",subtitle:"Get notified when specific weather appears",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"weather",variant:"soft",padding:"none",divider:false,onExpandChange:e?.onExpandChange},d),t}function a(){const d=km(),p=d.length;p!==o&&(o=p,n=d,r.tableHandle?.setData(d));}function s(){r.tableHandle&&(r.tableHandle.destroy(),r.tableHandle=null),t=null;}return {root:i(),refresh:a,destroy:s}}function jF(e){let t=null,n=null;function r(){const i=x("div",{className:"pet-card-body"}),a=x("div",{className:"pet-card-row"}),s=Pu({text:"Hunger alert",hint:"Notifies when active pets drop below 5% hunger",variant:"text"});return n=xr({checked:ya.isEnabled(),onChange:d=>{ya.setEnabled(d);}}),a.appendChild(s.root),a.appendChild(n.root),i.appendChild(a),t=lt({id:"pet-hunger-card",title:"Pet events",subtitle:"Get notified about pet-related events",expandable:true,defaultExpanded:e?.defaultExpanded??true,stateKey:"pet",variant:"soft",padding:"sm",divider:false,onExpandChange:e?.onExpandChange},i),t}function o(){n&&(n.destroy(),n=null),t=null;}return {root:r(),destroy:o}}class GF extends Cr{constructor(){super({id:"tab-alerts",label:"Alerts"});ve(this,"sectionElement",null);ve(this,"state",null);ve(this,"settingCard",null);ve(this,"shopsCard",null);ve(this,"weatherCard",null);ve(this,"petCard",null);}async build(n){this.state=await QR();const r=n.getRootNode();rn(r,JR,"alerts-styles");const o=this.createGrid("12px");o.id="alerts-section",this.sectionElement=o;const{MGData:i}=await Sn(async()=>{const{MGData:p}=await Promise.resolve().then(()=>Vb);return {MGData:p}},void 0),a=["plants","items","eggs","decor","weather","mutations"],s=await Promise.allSettled(a.map(p=>i.waitFor(p))),d=a.filter((p,c)=>s[c]?.status==="rejected");d.length>0&&console.warn("[AlertsSection] MGData incomplete, building with empty tables:",d.join(", ")),this.buildParts(),n.appendChild(o);}render(n){const r=this.shopsCard,o=this.weatherCard,i=this.petCard,a=this.settingCard;this.settingCard=null,this.shopsCard=null,this.weatherCard=null,this.petCard=null,super.render(n),this.shopsCard=r,this.weatherCard=o,this.petCard=i,this.settingCard=a;}buildParts(){if(!this.sectionElement||!this.state)return;const n=this.state.get();this.shopsCard=xF({defaultExpanded:n.ui.expandedCards.shops,onExpandChange:r=>this.state.setCardExpanded("shops",r)}),this.sectionElement.appendChild(this.shopsCard.root),this.petCard=jF({defaultExpanded:n.ui.expandedCards.pet,onExpandChange:r=>this.state.setCardExpanded("pet",r)}),this.sectionElement.appendChild(this.petCard.root),this.weatherCard=zF({defaultExpanded:n.ui.expandedCards.weather,onExpandChange:r=>this.state.setCardExpanded("weather",r)}),this.sectionElement.appendChild(this.weatherCard.root),this.settingCard=RF({defaultExpanded:n.ui.expandedCards.settings,onExpandChange:r=>this.state.setCardExpanded("settings",r)}),this.sectionElement.appendChild(this.settingCard.root);}async destroy(){this.settingCard&&(this.settingCard.destroy(),this.settingCard=null),this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.petCard&&(this.petCard.destroy(),this.petCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const UF={Store:{select:Je.select.bind(Je),set:Je.set.bind(Je),subscribe:Je.subscribe.bind(Je),subscribeImmediate:Je.subscribeImmediate.bind(Je)},Globals:Ut,Modules:{Version:Nu,Assets:Zo,Manifest:jo,Data:ke,Environment:Ft,CustomModal:To,Sprite:Ne,Tile:ir,Pixi:Bl,RiveLoader:Uo,Audio:Ct,Cosmetic:fp,Calculators:zb,ShopActions:jr},Features:{AutoFavorite:Qb,Journal:Pt,Achievements:i2,Tracker:FR,AntiAfk:Fo,Pets:OR,PetTeam:pt,XPTracker:su,CropValueIndicator:Ws,CropSizeIndicator:qs,ShopNotifier:oo,WeatherNotifier:Yo,PetHungerNotifier:ya,AriesAPI:El,HarvestLocker:jt,EggLocker:mr,DecorLocker:gr},WebSocket:{chat:jA,emote:GA,wish:UA,kickPlayer:WA,setPlayerData:Hl,usurpHost:HA,reportSpeakingStart:VA,setSelectedGame:qA,voteForGame:KA,restartGame:YA,ping:XA,checkWeatherStatus:ZA,move:JA,playerPosition:yb,teleport:QA,moveInventoryItem:eE,dropObject:tE,pickupObject:nE,toggleLockItem:xb,toggleFavoriteItem:wb,setSelectedItem:rE,putItemInStorage:ap,retrieveItemFromStorage:sp,moveStorageItem:oE,logItems:iE,plantSeed:aE,waterPlant:sE,harvestCrop:lE,sellAllCrops:cE,purchaseDecor:lp,purchaseEgg:cp,purchaseTool:dp,purchaseSeed:up,growEgg:Cb,plantEgg:dE,hatchEgg:uE,plantGardenPlant:pE,potPlant:fE,mutationPotion:hE,cropCleanser:mE,pickupDecor:gE,placeDecor:bE,removeGardenObject:vE,placePet:kb,feedPet:yE,petPositions:xE,swapPet:Sb,swapPetFromStorage:wE,pickupPet:Ab,movePetSlot:CE,namePet:kE,sellPet:SE,throwSnowball:AE,checkFriendBonus:EE},_internal:{getGlobals:Zn,initGlobals:Wb,destroyGlobals:sI}};function WF(){const e=fe;e.Gemini=UF,e.MGSprite=Ne,e.MGData=ke,e.MGPixi=Bl,e.MGRiveLoader=Uo,e.MGAssets=Zo,e.MGEnvironment=Ft;}const HF=`
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
`,VF="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA2CAYAAACY0PQ8AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKnSURBVHgB7ZuPddMwEMY/9zFAmAAxAWUCzASwAWGDbsDrBs0EJBMAE9SdAHeCqBOQDcQdkuu8Ngk6ubbPcn7v3VP0LCe5zyfJ+ldgBJxzC0oWh64VRWExMAVeiOCYIbsM6Rt4Rw1ahw1k7ILZkOf0IaRsNYm2Q0eSRSCn2dmS7ANax8eARajJ7sgqEqVC35DzhuzW6WVLZiQ+iSOBfwTjPfVYLEXE29jCFxBAApTQLwDD0XoZW1gkAnz9mwqL2IKi6uB8D/AH0+B1bM8hioTwpRb6sZKuU1odmDvo515SOEWEGvqpJIVTRLDQTyUpnPKeYCjZQjHUHoj8EkdCGOBo7iorCEmpDoxmEUSNIpMqgubGUfzfUkV4gF4shKSKYKGXwSLBQidJkyy5iZDUYOfWO4h7BiZJhDEmQyOxSCA1EpJ/sGcsEugigkYGbRMYC30MLoJGziKkNti5RUISZxGQmQhhNlxMbpEwuAgGmXCOBOLVfiasNZYha+GXuu2Rew30cVKEMElchiwPu+unBb4dWer+TbZ8UnbhdLI84HjpvG/bA+WvuEyxp9D/ptEt2ZpsE/Iap92/0tNdO99LLMk+oX3yx3jfiPA93BSDDVZCHxze/OpcCu5ZNSLwSnNSo5IBu8JNa7m9F7iLnGsEPMIiTGn3SS9chCnqKSy390XdvDH+wnzZNL0Dtwvc78+tfbBkH/9FQqgS15gf1zwseBxAUeaGkhXmw4rfLvnDsx0dVDX4whfkzYYEWDaZZ0PpcDHniFjtC3ASHmHx67TLB/blClKc39G+dtPnhxPufM9JjFvnJ4pOIt3bbCj5DN9wRu8iH5gKftftTeyGjS4nXwz8uJ0nLsY++VLBO/4zZRXqJc9AGbRnoN6Fz411Zf8sFNs92jNQFh35C3Y0hc/7VYYmAAAAAElFTkSuQmCC",qF="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA/CAYAAACxdtubAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKfSURBVHgB7ZuPdZswEMY//DqAuwGdwM4EJRPUG9TdoCM0G7QT1NkgmSB0gngDkwnKBvQ+W+LJBJCUxnnoyO89/hgL0McdJ50sZxigaZpcNgekRy3LpyzLavfgYuSEr0iTpSzb7sFsqLRYlNbMkSZ7seiVe6DXoiJyi3RFkrVoKNwDQ66bqtu6bNwPz1w34SDU5Swo9Vl0Cx0wKLVW7ROqwW0tn+3OmeuK265l8wg91OK6H7nTtWgBXSxt9O0K/QJ9HN/TVqgo58tbQB8rrlyLrqETdh6WrtANdEJPzV2hK+ilmIPrktVRqGk/l9DL2lpUs0jSBiPNbkvaYJRDOVao5oh7ZIGZMDvX1R51T/motKMNlDO7d1Q9sxNaQTnvFtWGFfoE5Vihe+hmPxehT3MRWh6Fml+cSuildJuXP9BJJYbcu0JL6KTkqhUqqkvoFHvP1aLvoCLotnfc6Qrd4fSTuBZKu3Mm1ETfX9DDjd3pm6zBYRVO1kh9eOVeDDc8h0GRVb+7H4bStJ9IO6PZicEq98DYFLlCNg9ID3rkVVfoYOJt2tUUXfimK5JkvrPEsrRqgTSgy37r+yJEKKMv5x7lmDYVTi7b2w/wjhmZE68x/eB0OySSBA2OGZ+fenYzmlPHjAJOPTmvxr70vqOWqc8TFK8b1RJsUSavmG6Hv/QViB3Anmoa561XrNAdpsmdr0CUUNNbqhBHFViuNmVjg17Z1xPq8gHxMMf7HVi2kuWaFTEdjxzP0z+WsU2YndP/iPA08RaXgt3CJowfeAE8L/D6l20F+NRl+eupxIv/aUHrU4Tn+rx/jksjN9k0w2IP/1sJ8zAPI0K3eCsGKvPwWk/aXH/XY8noucXBPSNPhdhrymFGxfHKmAfHpTb3iO64/AONOretDlUMVwAAAABJRU5ErkJggg==",KF="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA8CAYAAAA5S9daAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKgSURBVHgB7ZvvdYIwEMBPXr/XTtBs0I5gJ+kI7QbtCI7QTXSD4gTiBLJBmoMEA1wC+CSpF37vReEAIZfL/ckTAA9Syg/VzvL+Oar25ernyqMAob6OwIun1WpVdoWZ54I18ENQQp8SSuAH2adFCeDxCQh6FGCE8gdkf7OB6zhZg7MvixJgWAlJsPgE8FiC6v8rMEMngD1SS5bIgc2mXnDnCEqYTb3gzhGU0KeEZ+CHoISpWcILJUxNCaSzJ5WgQskaeEaHNRUmXZbAMTIYeoObjT2REb0BTtESRFfgUsIL8KUX+pfpAItjrOiVljo8noE3raV3yhIE8EfYO4sSYFFCRapKaKUA2dAJTHmydyglcM4RDK2BpkIkqxVmF/bKc8sSOK4wu7BL6u50SGEqGJoBz1wHEqAZ8K4SBKSD0xI4rjC7eDQb/8ES3nQLTWMJrRCpPCZWj6Gdo0lcQleupYqS1b0bS4i0wpxjSavL2gLC0qw829MhRmQ4Wds5hKca9KwrCIzd8QOEpxr42JaQO7ZDIfDDVkKM6rGwtmMooUoJYk4HdIhNx9V2AeH/KBZ9OlAjX0BYojvGw0jZnAj8qJQQqYQuCFlwv4C5grGE2OHRJ5ubV6OE2OHRJ5ubdSxLyKmXLyKlz40lhM4RTp5joa3hMZoleI75FDQH0XxCfuWxOWiiwx7CUniO7SEsF6WreLlRbSfnZ3DxRIZ5DXGn2sb1AEK1b1m/SzjLzUco4VfOw1HWfRvvA2WtkE9Za+1Wo7Mdcd8feRvwmXey7oNw3e/B9zC6stvqZtLrDdQ5N4ZV3J8aWYoR5+A8fYdpmBwDr8UaZG9XqT4eYAL6R1s/LGvTQmUI3XD/WX93Gz7ofvhOrXuUcCmxC2v/BJdOl3rAruIPOjGfbeyq8HcAAAAASUVORK5CYII=",YF="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABACAYAAACNx/A2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEh0lEQVR42u3cX2iVdRzH8bPV2tIJGhYzU4iCpJssUsLQpASVyqALLS0M0lC7qFTIBL0ISugmmERFKlZKClLeLIqlTU2kWOKfUmeaEzd109zcdua2s3NeQZybDu6fZ+fsOTvPG763Pz7PGx5+z++c7+8bmf32c5FsFgowGjOwAhuwDVWowWW0Ig7oRgsu4k9UYhPW4zU8ijuT62e9siVtBKZhNb5CFY7gLC7iGqKI651utOEKLuA0fkclPsEyPIjCnBeIIkzFamzBPlxADPFkJUjWwEggWeLJiuIvfI+P8ToeyDmBGIvpWIVKNCOWrITMkkAM3ajDDryBx1AaaIEoxSNYh1PoQMzQkUAnojiE5OutJHACcRfW4BSiiAsWMbSiGotREgiBKMQi7EUj4oJNN+qxG7OGTCAKcT8+wh/ollt04RDexZisCkQxZuEbROUucTTiU0xHUcYFohjP4iC6DA/asRdzUZwxgSjGfJw0/IjjBF7CiEEXiBIsxt+GN7VYhlGDJhC3YQFq5AdnsAQjB0vgbFTLL05gIe5ISyAex0/yk2rMvWWBGI8v5TcVmHyrAtehTX4Tx+coG5BAzMNpIdCElf0WiLHYLQQAjmBGfwWuQqOQVLaiqFeBuBf7hdyM81jSl8D30SykJypQfFOBGIvfhPRGA1b0JPBNXBHSF1UouZnAPcH/RVkQqMOL/xOIh1ArpD+0Y3uqwHdwVRr0eKJJgwDnOYl7/hOIAnyHG+kGzUTogGZqxKtJgcbgbLpBgyIyS3mi2J4U6ClcHw4Cs5znJEojWInraYTNSOjg59GEKRFsRHSgYUOBmrA0ggp05KvANDK1YUMER9Ad8LB95hmCTB34NoLzSIQCB0wMhyO4FvzXRRAzJVAXQWfwwwrqV0FbBLEcChy0PIkIrufIh2sQ88QjOId4pgOnc9hPY91MC4xGUIVOSEdiph4yE+sbHBI438tJJH2RAJkWmEamdOjCvggWoEUGyJrAoaEd5RGMQx0gFNh/mjE/GcB2tAFySqKhow5lyRCeQQNSCaxMQ0sHdqX+K1clIKTKEjwa8HSqwPm4JKQvurCrp9aOLegQ0hvH8URPAifhgJCeuIzVfbW3zcujjvyB0IqNGN2fDtWlqBcC0IkdmDSQHum3wk0FdGI3pgy0yfx2LMcZJOQnHdiKSbd6T2QkFuBAnnVuJXAJH+K+dG8qFWMGtuRJ73QC+7EMZYN5W3Mc1uJgjt8T7o0abMY0FGbivnABJmMbatEu94nhIvbgZZRm48p/EWZiJ+rRkmMbTQJRNOBnvIJRWR06gUKU4UmsxzE040ZAN5w4bqAV51COOZiI4qEee3I3pmEpPsNRtKILsSESGkcMXWjFcWzCcszEhKBOLhqP57EWm1GJGrQgnubYp1RSxz91I45/cBw/4Au8hxcwMbCTi3oZFTAZS1COCvyKYziLelxDG7oQ7+dop3Y04TJqcQqH8Qt24QMsxMO4I6dmZ/U9PsAEzMEKbMDX+BHVOIeraEUsZWLbVdTiKPZhJ8qxBoswFaNRkM1n+he4a3+KgaBGGQAAAABJRU5ErkJggg==",Em={expression:{label:"Expression",type:"Expression",icon:YF},top:{label:"Top",type:"Top",icon:VF},mid:{label:"Mid",type:"Mid",icon:qF},bottom:{label:"Bottom",type:"Bottom",icon:KF}},XF={expression:"Expression_Default.png",top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png"};function JF(e={}){const{initialOutfit:t={},onChange:n,width:r="100%",useRiveAnimation:o=false}=e;let i={...XF,...t},a="bottom",s={expression:[],top:[],mid:[],bottom:[]},d={expression:0,top:0,mid:0,bottom:0},p,c,h,b={},y=false,g=0,S=0,I=null,E=null;const M=[],R=x("div",{className:"avatar-builder"});R.style.width=r;const D=x("style");D.textContent=HF,R.appendChild(D);const N=x("div",{className:"avatar-builder-preview-area"});R.appendChild(N);const P=x("div",{className:"avatar-builder-avatar-wrapper"});N.appendChild(P),p=x("div",{className:"avatar-builder-preview-container"}),P.appendChild(p);const F=x("button",{className:"avatar-builder-arrow avatar-builder-arrow-left",onclick:()=>K(-1)});F.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',P.appendChild(F);const L=x("button",{className:"avatar-builder-arrow avatar-builder-arrow-right",onclick:()=>K(1)});L.innerHTML='<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',P.appendChild(L),p.addEventListener("mousedown",se),p.addEventListener("touchstart",se,{passive:true}),M.push(()=>{p.removeEventListener("mousedown",se),p.removeEventListener("touchstart",se);}),c=x("div",{className:"avatar-builder-item-name"},"Loading..."),N.appendChild(c),h=x("div",{className:"avatar-builder-dots-indicator"}),N.appendChild(h);const C=x("div",{className:"avatar-builder-category-row"});R.appendChild(C),Object.entries(Em).forEach(([O,B])=>{const J=O,re=x("button",{className:`avatar-builder-category-btn ${J===a?"active":""}`,onclick:()=>ce(J),title:B.label}),le=x("img",{src:B.icon,alt:B.label,className:"category-icon"});re.appendChild(le),b[J]=re,C.appendChild(re);}),_().then(()=>{z(),V(),U();});async function _(){const O=["expression","top","mid","bottom"];await Promise.all(O.map(async B=>{const J=await Zg({type:Em[B].type});s[B]=J;const re=i[B],le=J.findIndex(ye=>ye.filename===re);d[B]=le>=0?le:0;}));}function z(){if(o)I?Uo.updateOutfit(I,i).catch(O=>{console.error("[AvatarBuilder] Failed to update Rive outfit:",O);}):j();else {p.innerHTML="";const O=lo();[{slot:"bottom",zIndex:1},{slot:"mid",zIndex:2},{slot:"top",zIndex:3},{slot:"expression",zIndex:4}].forEach(({slot:J,zIndex:re})=>{const le=i[J];if(!le)return;const ye=le===Jg;if(le.includes("_Blank.png")||ye)return;const Be=x("img",{src:`${O}${le}`,className:`avatar-builder-layer ${J===a?"active":""}`,style:{zIndex:String(re)},onerror:()=>Be.style.display="none"});p.appendChild(Be);});}}async function j(){if(!(!o||I))try{p.innerHTML="",E=x("canvas",{className:"avatar-builder-rive-canvas",width:260,height:260}),p.appendChild(E),I=await Uo.createInstance({canvas:E,outfit:i,autoplay:!0}),console.log("[AvatarBuilder] Rive animation initialized");}catch(O){console.error("[AvatarBuilder] Failed to initialize Rive:",O),console.warn("[AvatarBuilder] Falling back to static images"),E&&(E.remove(),E=null),I=null,z();}}function V(){const O=s[a],B=d[a];if(!O||O.length===0){c.textContent="Loading...";return}const J=O[B];c.textContent=J?.displayName||"Unknown";}function U(){const O=s[a],B=d[a],J=O.length;if(J===0){h.innerHTML="";return}h.innerHTML=`<span class="dots-text">${B+1} / ${J}</span>`;const re=Math.min(J,10),le=x("div",{className:"dots-container"}),ye=J>1?Math.round(B/(J-1)*(re-1)):0;for(let Ie=0;Ie<re;Ie++){const Be=x("span",{className:`dot ${Ie===ye?"active":""}`});le.appendChild(Be);}h.appendChild(le);}function ce(O){a=O,Object.entries(b).forEach(([B,J])=>{J.classList.toggle("active",B===O);}),z(),V(),U();}function K(O){const B=s[a];if(!B||B.length===0)return;let J=d[a]+O;J<0&&(J=B.length-1),J>=B.length&&(J=0),d[a]=J;const re=B[J];i[a]=re.filename,n&&n({slot:a,item:re}),ie(O>0?"left":"right"),z(),V(),U();}function ie(O){const B=O==="left"?-20:20;p.style.transform=`translateX(${B}px)`,p.style.opacity="0.5",setTimeout(()=>{p.style.transform="translateX(0)",p.style.opacity="1";},150);}function se(O){y=true,g="touches"in O?O.touches[0].clientX:O.clientX,S=0;const B=re=>{if(!y)return;S=("touches"in re?re.touches[0].clientX:re.clientX)-g,p.style.transform=`translateX(${S*.3}px)`;},J=()=>{if(y){if(y=false,p.style.transform="translateX(0)",Math.abs(S)>50){const re=S>0?-1:1;K(re);}document.removeEventListener("mousemove",B),document.removeEventListener("mouseup",J),document.removeEventListener("touchmove",B),document.removeEventListener("touchend",J);}};document.addEventListener("mousemove",B),document.addEventListener("mouseup",J),document.addEventListener("touchmove",B),document.addEventListener("touchend",J);}function ae(){return {...i}}function ne(O){i={...i,...O},Object.entries(O).forEach(([B,J])=>{const re=B;if(!J||!s[re])return;const le=s[re].findIndex(ye=>ye.filename===J);le>=0&&(d[re]=le);}),z(),V(),U();}function Y(O){ce(O);}function Z(){I&&(I.destroy(),I=null),E&&(E.remove(),E=null),M.forEach(O=>O()),M.length=0,R.remove();}return {root:R,getOutfit:ae,setOutfit:ne,setCategory:Y,destroy:Z}}const QF={lastSelectedSlot:"bottom",builderExpanded:true,outfitsExpanded:true,loadoutsExpanded:true};async function ZF(){const e=await io("tab-avatar-ui",{version:1,defaults:QF}),t=[];return {get:()=>e.get(),update:n=>{e.update(n);const r=e.get();t.forEach(o=>o(r));},subscribe:n=>(t.push(n),()=>{const r=t.indexOf(n);r!==-1&&t.splice(r,1);})}}const eO=`
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
`,tO=500,_m=10,nO=800;function i0(e={}){const{onApply:t,layout:n="carousel"}=e;let r=null;function o(){if(!r)return;r.innerHTML="";const c=Xr.get();if(c.length===0){r.appendChild(x("div",{className:"outfits-loadout-empty"},"No saved outfits yet."));return}const h=lo();if(n==="grid"){const b=x("div",{className:"outfits-loadout-grid"});c.forEach(y=>{b.appendChild(i(y,h));}),r.appendChild(b);}else {const b=x("div",{className:"outfits-loadout-carousel"});c.forEach(y=>{b.appendChild(i(y,h));}),a(b),r.appendChild(b);}}function i(c,h){const b=x("div",{className:"outfits-loadout-card"});let y=false,g=null;const S=()=>{y=true,g&&clearTimeout(g),g=setTimeout(()=>{y=false;},nO),Xr.delete(c.id);};b.addEventListener("click",()=>{y||(t?t(c):Ib.set({top:c.top,mid:c.mid,bottom:c.bottom,expression:c.expression}));}),b.addEventListener("contextmenu",P=>{P.preventDefault(),P.stopPropagation(),S();});let I=null,E=null,M=false;const R=()=>{I&&(clearTimeout(I),I=null),E=null,M=false;};b.addEventListener("pointerdown",P=>{P.pointerType!=="mouse"&&P.button===0&&(R(),E={x:P.clientX,y:P.clientY},I=setTimeout(()=>{I=null,E&&(M=true,S());},tO));}),b.addEventListener("pointermove",P=>{if(!E||M)return;const F=P.clientX-E.x,L=P.clientY-E.y;F*F+L*L>_m*_m&&R();}),b.addEventListener("pointerup",R),b.addEventListener("pointercancel",R);const D=x("div",{className:"outfits-loadout-preview"});return [c.bottom,c.mid,c.top,c.expression].forEach((P,F)=>{if(!P||P.includes("_Blank"))return;const L=x("img",{className:"outfits-loadout-layer",style:{zIndex:String(F+1)}});L.src=`${h}${P}`,L.onerror=()=>L.remove(),D.appendChild(L);}),b.appendChild(D),b}function a(c){let h=false,b=0,y=0;const g=E=>{h=true,b=("touches"in E?E.touches[0].clientX:E.clientX)-c.offsetLeft,y=c.scrollLeft;},S=E=>{if(!h)return;E.preventDefault();const M=("touches"in E?E.touches[0].clientX:E.clientX)-c.offsetLeft;c.scrollLeft=y-(M-b);},I=()=>{h=false;};c.addEventListener("mousedown",g),c.addEventListener("touchstart",g,{passive:true}),c.addEventListener("mousemove",S),c.addEventListener("touchmove",S,{passive:false}),c.addEventListener("mouseup",I),c.addEventListener("mouseleave",I),c.addEventListener("touchend",I);}const s=x("style");s.textContent=eO,r=x("div"),o();const d=x("div");d.appendChild(s),d.appendChild(r);const p=Xr.subscribe(()=>o());return {root:d,destroy(){p(),r=null;}}}function rO(e={}){const{title:t="Outfits",defaultExpanded:n=true,onExpandChange:r,onApply:o,layout:i,showHint:a=false}=e,s=i0({onApply:o,layout:i}),d=lt({title:t,variant:"soft",expandable:true,defaultExpanded:n,onExpandChange:r}),p=d.querySelector(".card-body");if(p&&(p.appendChild(s.root),a)){const c=x("div",{className:"outfits-loadout-hint"});c.innerHTML=`
                <span class="outfits-loadout-hint__desktop">Click to apply · Right-click to delete</span>
                <span class="outfits-loadout-hint__mobile">Tap to apply · Hold to delete</span>
            `,p.appendChild(c);}return {root:d,destroy:()=>s.destroy()}}const oO=`
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
`;class iO extends Cr{constructor(){super({id:"tab-avatar",label:"Avatar"});ve(this,"avatarBuilder",null);ve(this,"uiState",null);}async build(n){Xr.init(),this.uiState=await ZF();const r=await jl().catch(()=>({top:"Top_DefaultGray.png",mid:"Mid_DefaultGray.png",bottom:"Bottom_DefaultGray.png",expression:"Expression_Default.png",color:"Red"})),o={top:r.top,mid:r.mid,bottom:r.bottom,expression:r.expression},i=this.createContainer("avatar-section");n.appendChild(i);const a=x("style");a.textContent=oO,i.appendChild(a);const s=lt({title:"Avatar editor",variant:"glass",expandable:true,defaultExpanded:this.uiState.get().builderExpanded,onExpandChange:c=>{this.uiState?.update({builderExpanded:c});}});this.avatarBuilder=JF({initialOutfit:o,useRiveAnimation:true});const d=s.querySelector(".card-body");if(d){d.appendChild(this.avatarBuilder.root);const c=x("button",{className:"avatar-save-btn"});c.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save this outfit',c.addEventListener("click",()=>this.handleSave()),d.appendChild(c),d.appendChild(x("hr",{className:"avatar-outfits-divider"}));const h=i0({onApply:b=>this.avatarBuilder?.setOutfit(b)});d.appendChild(h.root),this.addCleanup(()=>h.destroy());}i.appendChild(s);const p=rO({title:"Outfits loadout",defaultExpanded:this.uiState.get().loadoutsExpanded,onExpandChange:c=>{this.uiState?.update({loadoutsExpanded:c});},layout:"grid",showHint:true});p.root.style.marginTop="12px",i.appendChild(p.root),this.addCleanup(()=>p.destroy());}async handleSave(){if(!this.avatarBuilder)return;const n=this.avatarBuilder.getOutfit(),o=`Outfit ${Xr.get().length+1}`;await Xr.save(o,n);}async destroy(){this.avatarBuilder&&(this.avatarBuilder.destroy(),this.avatarBuilder=null),super.destroy();}}const _u={ui:{expandedCards:{public:true}}};async function aO(){const e=await io("tab-room",{version:1,defaults:_u,sanitize:o=>({ui:{expandedCards:zo(_u.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:zo(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}const sO=`
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
`;function lO(e){return /^I-\d+-GC-\d+-\d+$/.test(e)?"discord":"web"}function cO(e){const t=x("span",{className:`rooms-list__badge rooms-list__badge--${e}`});return t.textContent=e==="discord"?"Discord":"Web",t}function dO(e,t=16){return e.length<=t?e:`${e.slice(0,t)}...`}function uO(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=`
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `,e}function pO(e,t){const n=t==="all"?e:e.filter(r=>r.playerCount<r.maxPlayers);switch(t){case "5-6":return n.filter(r=>r.playerCount>=5);case "4":return n.filter(r=>r.playerCount===4);case "1-3":return n.filter(r=>r.playerCount>=1&&r.playerCount<=3);default:return n}}function fO(e){const t=d=>d.toString().padStart(2,"0"),n=t(e.getHours()),r=t(e.getMinutes()),o=t(e.getSeconds()),i=t(e.getDate()),a=t(e.getMonth()+1),s=e.getFullYear();return `${i}/${a}/${s} ${n}:${r}:${o}`}function hO(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 50 50"),e.setAttribute("width","50"),e.setAttribute("height","50"),e.innerHTML=`
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `,e}function mO(e={}){const{rooms:t=[],onJoinRoom:n,onCopyRoomId:r,onRefresh:o,emptyMessage:i="No rooms available",joinEnabled:a=false,initialFilter:s="5-6",onFilterChange:d}=e;let p=s,c=t;const h=x("div",{className:"rooms-list"}),b=x("style");b.textContent=sO,h.appendChild(b);const y=x("div",{className:"rooms-list__header-bar"}),S=eo({options:[{value:"5-6",label:"5-6 players"},{value:"4",label:"4 players"},{value:"1-3",label:"1-3 players"},{value:"all",label:"All"}],value:s,onChange:V=>{p=V,d?.(p),z(c);}});y.appendChild(S.root);const I=yt({label:"Refresh rooms",variant:"default",size:"sm",iconLeft:"",onClick:()=>{o?.();}});y.appendChild(I),h.appendChild(y);const E=x("div",{style:"position: relative;"}),M=x("div",{className:"rooms-list__container"});E.appendChild(M);const R=x("div",{className:"rooms-list__loading-overlay"});R.style.display="none";const D=hO();R.appendChild(D),E.appendChild(R),h.appendChild(E);const N=x("div",{className:"rooms-list__footer"}),P=x("div",{className:"rooms-list__aries-badge"});P.textContent="Powered by Aries",N.appendChild(P);const F=x("div",{className:"rooms-list__timestamp"});F.style.display="none",N.appendChild(F),h.appendChild(N);const L=[S,{remove:()=>I.remove()}],C=[];function _(V){const U=lO(V.id),ce=x("div",{className:"rooms-list__item"}),K=x("div",{className:"rooms-list__top-row"}),ie=cO(U);K.appendChild(ie);const se=x("span",{className:"rooms-list__id"});se.textContent=dO(V.id,20),se.title=V.id,K.appendChild(se);const ae=uO(),ne=x("button",{className:"rooms-list__copy-btn"});ne.type="button",ne.title="Copy room ID",ne.appendChild(ae),ne.addEventListener("click",le=>{le.stopPropagation(),r?.(V.id);}),K.appendChild(ne),ce.appendChild(K);const Y=x("div",{className:"rooms-list__bottom-row"}),Z=x("div",{className:"rooms-list__bottom-left"}),O=x("div",{className:"rooms-list__avatars"});for(let le=0;le<V.maxPlayers;le++){const ye=x("div",{className:`rooms-list__avatar ${le<V.playerCount?"rooms-list__avatar--filled":"rooms-list__avatar--empty"}`});if(V.playerAvatars&&V.playerAvatars[le]){const Ie=V.playerAvatars[le];if(Ie.avatarUrl){const Be=x("img",{src:Ie.avatarUrl,alt:Ie.name});Be.style.width="100%",Be.style.height="100%",Be.style.objectFit="cover",ye.appendChild(Be);}else ye.textContent="👤";ye.title=Ie.name;}else le<V.playerCount&&(ye.textContent="👤");O.appendChild(ye);}Z.appendChild(O);const B=x("span",{className:"rooms-list__count"});B.textContent=`${V.playerCount}/${V.maxPlayers}`,Z.appendChild(B),Y.appendChild(Z);const J=V.playerCount>=V.maxPlayers,re=yt({label:"Join",variant:"primary",size:"sm",disabled:!a||J,onClick:()=>{n?.(V.id);}});return C.push(re),Y.appendChild(re),ce.appendChild(Y),ce}function z(V){M.innerHTML="",C.forEach(ce=>{ce.destroy?ce.destroy():ce.remove&&ce.remove();}),C.length=0;const U=pO(V,p);if(U.length===0){const ce=x("div",{className:"rooms-list__empty"});ce.textContent=i,M.appendChild(ce);}else U.forEach(ce=>{const K=_(ce);M.appendChild(K);});}return z(t),{root:h,setRooms(V){c=V,z(V);},setFilter(V){p=V,S.setValue(V),z(c);},setLastUpdated(V){F.textContent=fO(V),F.style.display="block";},setLoading(V){V?(R.style.display="flex",R.style.opacity="0",R.offsetWidth,R.style.opacity="1"):(R.style.opacity="0",setTimeout(()=>{R.style.display="none";},300));},destroy(){C.forEach(V=>{V.destroy?V.destroy():V.remove&&V.remove();}),C.length=0,L.forEach(V=>{V.destroy?V.destroy():V.remove&&V.remove();}),L.length=0,h.remove();}}}async function gO(e){const{state:t,defaultExpanded:n=true,onExpandChange:r}=e;let o=null,i=false;const a=!Ft.isDiscord(),s=Ft.isDiscord(),p=Ft.detect().origin;async function c(){try{return (await El.fetchRooms(1e3)).map(S=>({id:S.id,playerCount:S.playersCount,maxPlayers:6,playerAvatars:S.userSlots?.map(I=>({name:I.name,avatarUrl:I.avatarUrl}))}))}catch(g){return console.error("[Room] Failed to fetch rooms:",g),[]}}async function h(){if(!(i||!o)){i=true,o.setLoading(true);try{const g=await c(),S=new Date;o.setRooms(g),o.setLastUpdated(S),console.log(`[Room] Fetched ${g.length} rooms from Aries API`);}catch(g){console.error("[Room] Failed to refresh rooms:",g);}finally{i=false,o.setLoading(false);}}}const b=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"});o=mO({rooms:[],joinEnabled:a,onJoinRoom:g=>{const S=`${p}/r/${g}`;window.open(S,"_blank"),console.log(`[Room] Opening room: ${S}`);},onCopyRoomId:g=>{navigator.clipboard.writeText(g).then(()=>{console.log(`[Room] Room ID copied to clipboard: ${g}`);}).catch(S=>{console.error("[Room] Failed to copy room ID:",S);});},onRefresh:()=>{h();},emptyMessage:"No public rooms available",initialFilter:"5-6"}),b.appendChild(o.root);const y=lt({title:"Public",subtitle:s?"List of available public rooms (view only on Discord)":"List of available public rooms",padding:"lg",expandable:true,defaultExpanded:n,onExpandChange:g=>{r?.(g),t.setCardExpanded("public",g),g&&!i&&h();}},b);return n&&h(),{root:y,destroy(){o&&(o.destroy(),o=null);}}}class bO extends Cr{constructor(n){super({id:"tab-room",label:"Room"});ve(this,"publicCardHandle",null);this.deps=n;}destroy(){this.publicCardHandle&&(this.publicCardHandle.destroy(),this.publicCardHandle=null);}async build(n){const r=this.createGrid("12px");r.id="room",n.appendChild(r);let o;try{o=await aO();}catch{o={get:()=>_u,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const i=o.get();this.publicCardHandle=await gO({state:o,defaultExpanded:!!i.ui.expandedCards.public}),r.appendChild(this.publicCardHandle.root);}}const vO=10,yO=16;function xO(e){const{selectedSpecies:t,onChange:n,placeholder:r="Search plants...",speciesRuleCount:o={},onSearchChange:i}=e;let a=t??null,s=[],d=[];const p=[],c=new Map;let h=null;const b=x("div",{className:"plant-selector"}),y=xa({placeholder:r,blockGameKeys:true,withClear:true,debounceMs:150,onChange:C=>R(C)});b.appendChild(y.root),p.push(()=>{const C=y.root.__cleanup;C&&C();});const g=x("div",{className:"plant-selector__grid"});b.appendChild(g),p.push(()=>{h!==null&&(cancelAnimationFrame(h),h=null),c.clear();});async function S(C,_){if(Ne.isReady())try{const z=await Ne.toCanvas(C,{boundsMode:"padded"});z&&(z.style.maxWidth="40px",z.style.maxHeight="40px",z.style.width="auto",z.style.height="auto",z.style.display="block",_.replaceChildren(z));}catch(z){console.warn("[PlantSelector] Failed to load sprite:",z);}}function I(){if(c.size===0){h=null;return}const C=[],_=c.entries();for(let z=0;z<vO;z++){const j=_.next();if(j.done)break;C.push(j.value);}for(const[z,j]of C)S(j,z),c.delete(z);c.size>0?h=requestAnimationFrame(()=>{setTimeout(I,yO);}):h=null;}function E(){h===null&&(h=requestAnimationFrame(()=>{I();}));}function M(){try{const C=ke.get("plants");if(!C){console.warn("[PlantSelector] No plants data available");return}s=Object.entries(C).filter(([,_])=>_&&typeof _=="object"&&"crop"in _).map(([_,z])=>({name:_,spriteId:z.crop?.spriteId||null})),d=[...s],D();}catch(C){console.error("[PlantSelector] Failed to load plants:",C);}}function R(C){if(!C.trim())d=[...s];else {const _=C.toLowerCase();d=s.filter(z=>z.name.toLowerCase().includes(_));}i?.(C),D();}function D(){const C=g.scrollTop;if(h!==null&&(cancelAnimationFrame(h),h=null),c.clear(),g.replaceChildren(),d.length===0){const z=x("div",{className:"plant-selector__empty"},"No plants found");g.appendChild(z);return}const _=document.createDocumentFragment();d.forEach(z=>{const j=N(z);_.appendChild(j);}),g.appendChild(_),g.scrollTop=C,c.size>0&&E();}function N(C){const _=o[C.name]??0,z=x("div",{className:`plant-selector__item ${a===C.name?"plant-selector__item--selected":""}`});if(_>0){const ce=x("div",{className:"plant-selector__badge"},String(_));z.appendChild(ce);}z.addEventListener("click",()=>{a=C.name,n(C.name),D();});const j=x("div",{className:"plant-selector__sprite"}),V=x("div",{style:"width: 40px; height: 40px; background: color-mix(in oklab, var(--fg) 8%, transparent); border-radius: 4px;"});j.appendChild(V),C.spriteId&&Ne.isReady()&&c.set(j,C.spriteId),z.appendChild(j);const U=x("div",{className:"plant-selector__name"},C.name);return z.appendChild(U),z}M();function P(){return a}function F(C){a=C,D();}function L(){p.forEach(C=>C()),p.length=0;}return {root:b,getSelected:P,setSelected:F,destroy:L}}async function pc(e,t,n){const{size:r,mutations:o}=n;if(!Ne.isReady()){t.appendChild(Di(r));return}try{const s=ke.get("plants")?.[e]?.crop?.spriteId;if(!s){t.appendChild(Di(r));return}const d=await Ne.toCanvas(s,{mutations:o&&o.length>0?o:void 0,boundsMode:"padded"});d?(a0(d,r),t.appendChild(d)):t.appendChild(Di(r));}catch(i){console.warn(`[SpriteRenderer] Failed to render plant sprite for ${e}:`,i),t.appendChild(Di(r));}}async function wO(e,t,n){if(!Ne.isReady()){t.appendChild(As(e,n));return}try{const i=`sprite/ui/Mutation${{Ambershine:"Amberlit"}[e]??e}`;if(!Ne.has(i)){t.appendChild(As(e,n));return}const a=await Ne.toCanvas(i);a?(a0(a,n),t.appendChild(a)):t.appendChild(As(e,n));}catch(r){console.warn(`[SpriteRenderer] Failed to render mutation sprite for ${e}:`,r),t.appendChild(As(e,n));}}function Di(e){return x("div",{style:`
            width: ${e}px;
            height: ${e}px;
            background: color-mix(in oklab, var(--accent) 20%, transparent);
            border-radius: 4px;
        `})}function CO(e){return x("div",{style:`
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
        `},"—")}function As(e,t){return e==="Gold"?x("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: #FFD700;
                border-radius: 4px;
            `}):e==="Rainbow"?x("div",{style:`
                width: ${t}px;
                height: ${t}px;
                background: linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%);
                border-radius: 4px;
            `}):Di(t)}function a0(e,t){e.style.maxWidth=`${t}px`,e.style.maxHeight=`${t}px`,e.style.width="auto",e.style.height="auto",e.style.display="block";}const ur=["none","Gold","Rainbow"],Ml={wet:["Wet","Chilled","Frozen"],lunar:["Dawnlit","Ambershine","Dawncharged","Ambercharged"]};function s0(){if(!Ne.isReady())return console.warn("[MutationData] MGSprite not ready yet"),[];try{return Ne.getMutationNames().filter(t=>t!=="Gold"&&t!=="Rainbow")}catch(e){return console.error("[MutationData] Failed to get mutation names:",e),[]}}function l0(e){if(e==="none")return "Normal";try{return ke.get("mutations")?.[e]?.name||e}catch{return e}}function kO(e){return e.map(t=>t==="none"?"none":l0(t).toLowerCase()).join(", ")}function SO(){return s0()}function xo(e){const n=SO().indexOf(e);return n===-1?1/0:n}function Iu(e){return Ml.wet.includes(e)}function Tu(e){return Ml.lunar.includes(e)}function AO(e){const t=e.filter(o=>Iu(o)),n=e.filter(o=>Tu(o)),r=[];return t.length>0&&r.push(t[0]),n.length>0&&r.length<2&&r.push(n[0]),r}function Es(e){const t=[e.mode];if(e.sizeCondition?.enabled&&t.push(`size:${e.sizeCondition.minPercentage}`),e.mutationCondition?.enabled){const n=[...e.mutationCondition.mutations].sort();t.push(`mut:${e.mutationCondition.matchMode}:${n.join(",")}`);}return t.join("|")}const EO=32;function c0(e){const{mutationId:t,isSelected:n,onToggle:r,size:o=EO}=e;let i=n,a=false;const s=x("div",{style:`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.15s ease;
        `});h(),s.addEventListener("click",r),s.addEventListener("mouseenter",()=>{!i&&!a&&(s.style.background="color-mix(in oklab, var(--fg) 10%, transparent)");}),s.addEventListener("mouseleave",()=>{!i&&!a&&(s.style.background="color-mix(in oklab, var(--fg) 5%, transparent)");});const d=x("div",{style:"display: flex; align-items: center; justify-content: center;"});t==="none"?d.appendChild(CO(o)):wO(t,d,o),s.appendChild(d);const p=e.label??l0(t),c=x("div",{style:`
            font-size: 10px;
            color: var(--fg);
            text-align: center;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        `},p);s.appendChild(c);function h(){i?(s.style.background="color-mix(in oklab, var(--accent) 20%, transparent)",s.style.border="1px solid var(--accent)"):(s.style.background="color-mix(in oklab, var(--fg) 5%, transparent)",s.style.border="1px solid color-mix(in oklab, var(--fg) 10%, transparent)");}function b(g){i=g,h();}function y(g){a=g,s.style.opacity=a?"0.35":"1",s.style.pointerEvents=a?"none":"",s.style.cursor=a?"default":"pointer";}return {root:s,setSelected:b,setDisabled:y}}function _O(e){const{enabled:t,percentage:n,sizeMode:r,ruleMode:o,onEnabledChange:i,onPercentageChange:a,onSizeModeChange:s,expanded:d=false,onExpandChange:p}=e;let c=t,h=n,b=r,y=o,g=null,S=null,I=null;const E=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),M=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");D();const R=lt({title:"Size",subtitle:"Growth size threshold",actions:[M],variant:"soft",padding:"md",expandable:true,defaultExpanded:d,onExpandChange:p},E);function D(){E.replaceChildren(),M.style.display=c?"":"none";const L=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=uc({checked:c,label:"Enable",size:"md",onChange:K=>{c=K,i(K),D();}});L.appendChild(C.root),c&&(g=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},N()),L.appendChild(g)),E.appendChild(L);const _=x("div",{style:c?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),z=x("div",{style:"display: flex; justify-content: center;"}),j=ai({segments:[{id:"min",label:"Minimum"},{id:"max",label:"Maximum"}],selected:b,onChange:K=>{b=K,s(b),D();}});z.appendChild(j),_.appendChild(z),I=x("div",{style:"display: flex; flex-direction: column; gap: 4px;"});const V=x("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),U=x("div",{style:"font-size: 12px; color: var(--fg); font-weight: 500;"},"Size Threshold");S=x("span",{style:"font-size: 12px; font-weight: 600; color: var(--accent);"},`${h}%`),V.appendChild(U),V.appendChild(S),I.appendChild(V);const ce=Zp({min:50,max:100,step:1,value:h,showValue:false,onInput:K=>{h=K,S&&(S.textContent=`${K}%`),g&&(g.textContent=N());},onChange:K=>{h=K,a(K);}});I.appendChild(ce.root),_.appendChild(I),E.appendChild(_);}function N(){const L=b==="min"?"at most":"at least";return y==="lock"?`Lock plants ${L} ${h}% grown`:`Allow plants ${L} ${h}% grown`}function P(L){y=L,g&&(g.textContent=N());}function F(){g=null,S=null,I=null;}return {root:R,setRuleMode:P,destroy:F}}function IO(e){const{enabled:t,selected:n,ruleMode:r,onEnabledChange:o,onSelectionChange:i,expanded:a=false,onExpandChange:s}=e;let d=t,p=[...n],c=r,h=null;const b=[],y=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),g=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");I();const S=lt({title:"Color Mutation",subtitle:"Gold / Rainbow color variants",actions:[g],variant:"soft",padding:"md",expandable:true,defaultExpanded:a,onExpandChange:s},y);function I(){y.replaceChildren(),b.length=0,g.style.display=d?"":"none";const L=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),C=uc({checked:d,label:"Enable",size:"md",onChange:j=>{d=j,o(j),I();}});L.appendChild(C.root),d&&(h=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"},D()),L.appendChild(h)),y.appendChild(L);const _=x("div",{style:d?"":"opacity: 0.4; pointer-events: none; transition: opacity 0.2s ease;"}),z=x("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
                gap: 8px;
            `});ur.forEach(j=>{const V=p.includes(j),U=c0({mutationId:j,isSelected:V,onToggle:()=>E(j)});b.push(U),z.appendChild(U.root);}),_.appendChild(z),y.appendChild(_);}function E(L){if(p.includes(L)){const _=p.filter(z=>z!==L);if(_.length===0)return;p=_;}else {if(p.length>=3)return;p=[...p,L];}i(p),M(),R();}function M(){h&&(h.textContent=D());}function R(){ur.forEach((L,C)=>{const _=b[C];_&&_.setSelected(p.includes(L));});}function D(){const L=p.map(C=>C==="none"?"normal":C.toLowerCase()).join(", ");return c==="lock"?`Lock ${L} plants`:`Allow ${L} plants`}function N(L){c=L,M();}function P(){return [...p]}function F(){h=null,b.length=0;}return {root:S,setRuleMode:N,getSelection:P,destroy:F}}function TO(e){const{enabled:t,selected:n,matchMode:r,ruleMode:o,onEnabledChange:i,onSelectionChange:a,onMatchModeChange:s,expanded:d=false,onExpandChange:p}=e;let c=t,h=[...n],b=r,y=o,g=null;const S=new Map,I=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),E=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `},"Enabled");R();const M=lt({title:"Weather Mutation",subtitle:"Weather-based mutation variants",actions:[E],variant:"soft",padding:"md",expandable:true,defaultExpanded:d,onExpandChange:p},I);function R(){I.replaceChildren(),S.clear(),E.style.display=c?"":"none";const j=x("div",{style:"display: flex; align-items: center; gap: 12px;"}),V=uc({checked:c,label:"Enable",size:"md",onChange:ne=>{c=ne,i(ne),R();}});j.appendChild(V.root),c&&(g=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, transparent); line-height: 1.4;"}),h.length>0&&(g.textContent=F()),j.appendChild(g)),I.appendChild(j);const U=x("div",{style:(c?"":"opacity: 0.4; pointer-events: none;")+" display: flex; flex-direction: column; gap: 12px; transition: opacity 0.2s ease;"}),ce=x("div",{style:"display: flex; justify-content: center;"}),K=ai({segments:[{id:"any",label:"Any"},{id:"all",label:"All"}],selected:b,onChange:ne=>{b=ne,ne==="all"&&(h=AO(h),a(h)),s(b),R();}});ce.appendChild(K),U.appendChild(ce);const se=["none",...s0()],ae=x("div",{style:`
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
                gap: 8px;
                max-height: 300px;
                overflow-y: auto;
            `});se.forEach(ne=>{const Y=h.includes(ne),Z=c0({mutationId:ne,isSelected:Y,onToggle:()=>D(ne),label:ne==="none"?"None":void 0});S.set(ne,Z),ae.appendChild(Z.root);}),U.appendChild(ae),I.appendChild(U);}function D(j){if(b==="all")if(j==="none")h.length===1&&h[0]==="none"?h=[]:h=["none"];else {if(h.includes("none"))return;h.includes(j)?h=h.filter(V=>V!==j):(Iu(j)?h=h.filter(V=>!Iu(V)):Tu(j)&&(h=h.filter(V=>!Tu(V))),h=[...h,j]);}else h.includes(j)?h=h.filter(V=>V!==j):h=[...h,j];a(h),N(),P();}function N(){g&&(g.textContent=h.length>0?F():"");}function P(){const j=b==="all"&&h.includes("none");S.forEach((V,U)=>{V.setSelected(h.includes(U)),V.setDisabled(j&&U!=="none");});}function F(){const j=kO(h),V=b==="all"?"AND":"OR";return y==="lock"?`Lock ${j} plants (${V})`:`Allow ${j} plants (${V})`}function L(j){y=j,N();}function C(){return [...h]}function _(){return b}function z(){g=null,S.clear();}return {root:M,setRuleMode:L,getSelection:C,getMatchMode:_,destroy:z}}const PO=60;function LO(e){let t={...e},n=null,r=null;const o=x("div",{style:"display: flex; flex-direction: column; gap: 8px;"}),i=x("div",{style:"display: flex; justify-content: center;"}),a=x("div",{className:"harvest-locker-preview-grid"});o.appendChild(i),o.appendChild(a);const s=x("div",{style:`
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
            border-radius: 10px;
            padding: 1px 6px;
            display: none;
        `});t.sizeEnabled&&t.sizePercentage!==void 0&&(s.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,s.style.display="");const d=lt({title:"Preview",subtitle:c(),actions:[s],variant:"soft",padding:"md",expandable:true,defaultExpanded:true},o),p=d.querySelector(".card-subtitle");h();function c(){return t.ruleMode==="lock"?"Preview of plants that will be blocked from harvesting":"Preview of plants that will be harvestable"}function h(){n!==null&&(cancelAnimationFrame(n),n=null),p&&(p.textContent=c()),t.sizeEnabled&&t.sizePercentage!==void 0?(s.textContent=`size ${(t.sizeMode??"max")==="max"?"≥":"≤"} ${t.sizePercentage}%`,s.style.display=""):s.style.display="none";const E=t.colorEnabled?ur.filter(M=>t.colorMutations.includes(M)):[];if(E.length>=2){r&&!E.includes(r)&&(r=E[0]),r||(r=E[0]),i.replaceChildren();const M=ai({segments:E.map(R=>({id:R,label:R==="none"?"Normal":R})),selected:r,onChange:R=>{r=R,h();}});i.appendChild(M);}else r=null,i.replaceChildren();a.replaceChildren(),n=requestAnimationFrame(()=>{b().forEach(R=>{a.appendChild(R);});});}function b(){const E=[],M=t.species||"Starweaver";if(!(t.sizeEnabled||t.colorEnabled||t.weatherEnabled))return E.push(g(M,[])),E;const D=y();if(D.sort((P,F)=>{const L=Math.max(0,...P.map(j=>ur.indexOf(j))),C=Math.max(0,...F.map(j=>ur.indexOf(j)));if(L!==C)return L-C;const _=P.filter(j=>!ur.includes(j)).sort((j,V)=>xo(j)-xo(V)),z=F.filter(j=>!ur.includes(j)).sort((j,V)=>xo(j)-xo(V));if(_.length!==z.length)return _.length-z.length;for(let j=0;j<_.length;j++){const V=xo(_[j])-xo(z[j]);if(V!==0)return V}return 0}),D.length===0){const P=x("div",{style:"padding: 12px; text-align: center; color: #ef4444; font-size: 12px;"},"Invalid mutation combination");return E.push(P),E}return (r?D.filter(P=>{const F=P.filter(L=>ur.includes(L)&&L!=="none");return r==="none"?F.length===0:F.includes(r)}):D).forEach(P=>{E.push(g(M,P));}),E}function y(){const E=[],M=t.weatherEnabled?t.weatherMutations.filter(j=>j!=="none"):[],R=t.colorEnabled?t.colorMutations.filter(j=>j!=="none"):[],D=t.weatherEnabled&&t.weatherMutations.includes("none"),N=t.colorEnabled&&t.colorMutations.includes("none");if(M.length===0&&R.length===0||!t.weatherEnabled&&!t.colorEnabled)return E.push([]),E;const P=M.filter(j=>Ml.wet.includes(j)),F=M.filter(j=>Ml.lunar.includes(j)),L=(j,V)=>{j.length===0&&V.length===0?E.push([]):j.length===0?V.forEach(U=>{E.push([...U]);}):V.length===0?j.forEach(U=>{E.push([...U]);}):j.forEach(U=>{V.forEach(ce=>{E.push([...U,...ce]);});});},C=[];if(D&&C.push([]),t.weatherMatchMode==="all"&&M.length>0){const j=P.length>1,V=F.length>1;if(j||V)return [];C.push(M);}else t.weatherMatchMode==="any"&&M.length>0&&(M.forEach(j=>{C.push([j]);}),P.forEach(j=>{F.forEach(V=>{C.push([j,V]);});}));const _=[];return N&&_.push([]),R.forEach(j=>{_.push([j]);}),L(C,_),Array.from(new Set(E.map(j=>j.sort().join(",")))).map(j=>j.split(",").filter(Boolean))}function g(E,M){const R=x("div",{style:"flex-shrink: 0;"});return pc(E,R,{size:PO,mutations:M}),R}function S(E){t={...t,...E},h();}function I(){n!==null&&(cancelAnimationFrame(n),n=null),a.replaceChildren();}return {root:d,update:S,destroy:I}}function Im(e){const{mode:t,species:n,ruleId:r,initialData:o,onSave:i,onDelete:a,onCancel:s}=e;let d=o?.name??"",p=o?.ruleMode??"lock",c=o?.sizeCondition?.enabled??false,h=o?.sizeCondition?.minPercentage??75,b=o?.sizeCondition?.sizeMode??"max";const y=o?.mutationCondition?.mutations??[],g=y.filter(O=>["none","Gold","Rainbow"].includes(O));let S=g.length>0,I=g.length>0?g:["none"];const E=y.filter(O=>!["none","Gold","Rainbow"].includes(O));let M=E.length>0,R=E.length>0?E:["none"],D=o?.mutationCondition?.matchMode??"any",N=null,P=null,F=null,L=null,C=null,_=null,z=null;const j=ce(),V=ie();z=Qp({title:U(),content:j,footer:V,size:"lg",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{s?.();}});function U(){if(t!=="species"||!n)return r?"Edit Overall Rule":"Create Overall Rule";const O=x("div",{style:"display: flex; align-items: center; gap: 10px;"}),B=x("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});pc(n,B,{size:24}),O.appendChild(B);const J=x("span",{},`${n} — Override Rule`);return O.appendChild(J),O}function ce(){const O=x("div",{style:"display: flex; flex-direction: column; gap: 16px;"});if(t==="species"){const B=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 60%, transparent); padding: 8px 10px; background: color-mix(in oklab, var(--accent) 8%, transparent); border-radius: 6px; border-left: 3px solid var(--accent);"},"Global rules still apply. This override takes priority for this species only.");O.appendChild(B);}return O.appendChild(K()),N=_O({enabled:c,percentage:h,sizeMode:b,ruleMode:p,onEnabledChange:B=>{c=B,ae(),ne();},onPercentageChange:B=>{h=B,ne();},onSizeModeChange:B=>{b=B,ne();}}),O.appendChild(N.root),P=IO({enabled:S,selected:I,ruleMode:p,onEnabledChange:B=>{S=B,ae(),ne();},onSelectionChange:B=>{I=B,ne();}}),O.appendChild(P.root),F=TO({enabled:M,selected:R,matchMode:D,ruleMode:p,onEnabledChange:B=>{M=B,ae(),ne();},onSelectionChange:B=>{R=B,ne();},onMatchModeChange:B=>{D=B,ne();}}),O.appendChild(F.root),L=LO({species:t==="overall"?"Carrot":n,ruleMode:p,sizeEnabled:c,sizePercentage:h,sizeMode:b,colorEnabled:S,colorMutations:I,weatherEnabled:M,weatherMutations:R,weatherMatchMode:D}),O.appendChild(L.root),O}function K(){const O=x("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),B=x("div",{style:"display: flex; gap: 12px; align-items: flex-start;"}),J=x("div",{style:"flex: 1; display: flex; flex-direction: column; gap: 6px;"}),re=x("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Rule Name");J.appendChild(re),C=Fl({placeholder:"e.g., Lock Large Frozen",value:d,maxLength:30,blockGameKeys:true,onChange:Be=>{d=Be,ae();}}),J.appendChild(C.root),B.appendChild(J);const le=x("div",{style:"display: flex; flex-direction: column; gap: 6px;"}),ye=x("label",{style:"font-size: 12px; font-weight: 500; color: var(--fg);"},"Mode");le.appendChild(ye);const Ie=ai({segments:[{id:"lock",label:"Lock"},{id:"allow",label:"Allow"}],selected:p,onChange:Be=>{p=Be,N?.setRuleMode(p),P?.setRuleMode(p),F?.setRuleMode(p),ne();}});return le.appendChild(Ie),B.appendChild(le),O.appendChild(B),O}function ie(){const O=x("div",{style:"display: flex; gap: 8px; justify-content: space-between; width: 100%;"}),B=x("div",{style:"display: flex; gap: 8px;"});if(r&&a){const ye=yt({label:"Delete Rule",variant:"danger",onClick:()=>{a(),Z();}});B.appendChild(ye);}O.appendChild(B);const J=x("div",{style:"display: flex; gap: 8px;"}),re=yt({label:"Cancel",variant:"default",onClick:()=>{s?.(),Z();}});J.appendChild(re);const le=yt({label:"Save",variant:"primary",disabled:!se(),onClick:Y});return _=le,J.appendChild(le),O.appendChild(J),O}function se(){return !(!d.trim()||!c&&!S&&!M)}function ae(){_&&(_.disabled=!se());}function ne(){L?.update({ruleMode:p,sizeEnabled:c,sizePercentage:h,sizeMode:b,colorEnabled:S,colorMutations:I,weatherEnabled:M,weatherMutations:R,weatherMatchMode:D});}function Y(){if(!se())return;const O={name:d.trim(),ruleMode:p};c&&(O.sizeCondition={enabled:true,minPercentage:h,sizeMode:b});const B=[];M&&B.push(...R),S&&B.push(...I),B.length>0&&(O.mutationCondition={enabled:true,mutations:B,matchMode:D}),i(O),Z();}function Z(){N?.destroy(),P?.destroy(),F?.destroy(),L?.destroy(),C?.destroy(),z?.destroy(),N=null,P=null,F=null,L=null,C=null,_=null,z=null;}return {root:z.root,destroy:Z}}function MO(e){const{species:t,existingRules:n,onSelect:r}=e;let o=null;const i=d(),a=p();o=Qp({title:s(),subtitle:"Select a rule to assign to this species",content:i,footer:a,size:"md",closeOnBackdrop:true,closeOnEscape:true,onClose:()=>{}});function s(){const g=x("div",{style:"display: flex; align-items: center; gap: 10px;"}),S=x("div",{style:"width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});return pc(t,S,{size:24}),g.appendChild(S),g.appendChild(x("span",{},`${t} — Assign Rule`)),g}function d(){const g=x("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(n.length===0){const S=x("div",{style:"padding: 20px; text-align: center; color: var(--muted); font-size: 14px;"},"No overall rules available");g.appendChild(S);}else n.forEach(S=>{g.appendChild(c(S));});return g}function p(){const g=x("div",{style:"display: flex; gap: 8px; justify-content: flex-end;"}),S=yt({label:"Cancel",variant:"default",onClick:()=>{y();}});return g.appendChild(S),g}function c(g){const S=x("div",{className:"harvest-locker-rule-item",style:"flex-direction: column; align-items: flex-start; gap: 8px;"});S.addEventListener("click",()=>{jt.cloneRuleToSpecies(g.id,t),r(g.id),y();});const I=x("div",{style:"display: flex; align-items: center; justify-content: space-between; width: 100%;"});I.appendChild(x("div",{className:"harvest-locker-rule-item__name"},g.name)),I.appendChild(x("div",{className:"harvest-locker-rule-item__badge"},g.mode)),S.appendChild(I);const E=h(g);return E.childNodes.length>0&&S.appendChild(E),S}function h(g){const S=x("div",{style:"display: flex; flex-wrap: wrap; gap: 4px;"});return g.sizeCondition?.enabled&&S.appendChild(b(`Size ≥ ${g.sizeCondition.minPercentage}%`)),g.mutationCondition?.enabled&&g.mutationCondition.mutations.forEach(I=>{S.appendChild(b(I==="none"?"Normal":I));}),S}function b(g){return x("div",{style:`
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 500;
                color: color-mix(in oklab, var(--fg) 75%, transparent);
                background: color-mix(in oklab, var(--fg) 8%, transparent);
                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
            `},g)}function y(){o?.destroy(),o=null;}return {root:o.root,destroy:y}}const RO={ui:{harvestLockerMode:"overall",selectedSpecies:null,searchQuery:"",harvestLockerExpanded:true,eggLockerExpanded:true,decorLockerExpanded:true}};let Eo=null,vd=null;async function FO(){return Eo||(vd||(vd=io("tab-locker",{version:1,defaults:RO,sanitize:e=>({ui:{harvestLockerMode:e.ui?.harvestLockerMode==="bySpecies"?"bySpecies":"overall",selectedSpecies:typeof e.ui?.selectedSpecies=="string"?e.ui.selectedSpecies:null,searchQuery:typeof e.ui?.searchQuery=="string"?e.ui.searchQuery:"",harvestLockerExpanded:typeof e.ui?.harvestLockerExpanded=="boolean"?e.ui.harvestLockerExpanded:true,eggLockerExpanded:typeof e.ui?.eggLockerExpanded=="boolean"?e.ui.eggLockerExpanded:true,decorLockerExpanded:typeof e.ui?.decorLockerExpanded=="boolean"?e.ui.decorLockerExpanded:true}})})),Eo=await vd,Eo)}function or(){if(!Eo)throw new Error("[LockerState] State not initialized. Call initLockerState() first.");return Eo}function OO(e){const t=or();t.update({ui:{...t.get().ui,harvestLockerMode:e}});}function NO(e){const t=or();t.update({ui:{...t.get().ui,selectedSpecies:e}});}function DO(e){const t=or();t.update({ui:{...t.get().ui,searchQuery:e}});}function $O(e){const t=or();t.update({ui:{...t.get().ui,harvestLockerExpanded:e}});}function BO(e){const t=or();t.update({ui:{...t.get().ui,eggLockerExpanded:e}});}function zO(e){const t=or();t.update({ui:{...t.get().ui,decorLockerExpanded:e}});}function jO(e={}){let t=e.defaultMode??"overall",n=e.defaultSelectedSpecies??null,r=[],o=null,i=null,a=null,s=null,d=null,p=null;const c=[];o=h();function h(){const _=x("div",{className:"harvest-locker-card-wrapper"});i=x("div",{className:"harvest-locker-card__mode-container"}),_.appendChild(i),a=x("div",{className:"harvest-locker-card__content"}),_.appendChild(a);const z=lt({title:"Crop Harvest",subtitle:"Prevent harvesting specific crops",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},_);return b(),g(),y(),z}function b(){t==="overall"?r=jt.getOverallRules():r=n?jt.getSpeciesRules(n):[];}function y(){a&&(a.replaceChildren(),t==="bySpecies"&&(S(),n&&I()),E(),R());}function g(){if(i){if(!s){s=ai({segments:[{id:"overall",label:"Overall"},{id:"bySpecies",label:"By Species"}],selected:t,onChange:_=>{t=_,OO(t),b(),y();}}),i.appendChild(s);return}s.getSelected()!==t&&s.select(t);}}function S(){if(!a)return;const _=ke.get("plants");if(!_||Object.keys(_).length===0){const U=x("div",{className:"harvest-locker-card__message harvest-locker-card__message--compact"},"No species available");a.appendChild(U);return}const z=jt.getConfig(),j={};Object.entries(z.speciesRules).forEach(([U,ce])=>{j[U]=ce.length;}),d=xO({selectedSpecies:n??void 0,placeholder:"Search plants...",speciesRuleCount:j,onChange:U=>{n=U,NO(U),b(),y();},onSearchChange:U=>{DO(U);}});const V=x("div",{className:"harvest-locker-card__control"});V.appendChild(d.root),a.appendChild(V);}function I(){if(!a||!n)return;const _=x("div",{className:"harvest-locker-card__species-section-header"}),z=x("div",{className:"harvest-locker-card__species-section-sprite"});pc(n,z,{size:36}),_.appendChild(z);const j=x("div",{className:"harvest-locker-card__species-section-text"}),V=x("div",{className:"harvest-locker-card__species-section-name"},n);j.appendChild(V);const U=x("div",{className:"harvest-locker-card__species-section-label"},"SELECTED");j.appendChild(U),_.appendChild(j),a.appendChild(_);}function E(){if(!a)return;if(t==="bySpecies"&&!n){const U=x("div",{className:"harvest-locker-card__message"},"Select a species to view and manage rules");a.appendChild(U);return}const _=x("div",{className:"harvest-locker-card__rules-section"}),z=x("div",{className:"harvest-locker-card__rules-section-label"},"Rules");if(_.appendChild(z),r.length===0){const U=x("div",{className:"harvest-locker-card__empty"},"No rules yet");_.appendChild(U),a.appendChild(_);return}const j=x("div",{className:"harvest-locker-card__list"});r.forEach(U=>{const ce=M(U);j.appendChild(ce);}),_.appendChild(j);const V=x("div",{className:"harvest-locker-card__rules-hint"});V.appendChild(x("span",{className:"harvest-locker-card__rules-hint--desktop"},"Click to edit · Right-click to delete")),V.appendChild(x("span",{className:"harvest-locker-card__rules-hint--mobile"},"Tap to edit · Long-press to delete")),_.appendChild(V),a.appendChild(_);}function M(_){const z=x("div",{className:"harvest-locker-rule-item"}),j=x("div",{className:"harvest-locker-rule-item__name"},_.name);z.appendChild(j);const V=x("div",{className:"harvest-locker-rule-item__badge"},_.mode);z.appendChild(V),z.addEventListener("contextmenu",K=>{K.preventDefault(),P(_.id);});let U=null,ce=false;return z.addEventListener("touchstart",()=>{ce=false,U=window.setTimeout(()=>{ce=true,P(_.id),navigator.vibrate&&navigator.vibrate(50);},500);}),z.addEventListener("touchend",()=>{U&&(clearTimeout(U),U=null),ce||N(_);}),z.addEventListener("touchmove",()=>{U&&(clearTimeout(U),U=null);}),z.addEventListener("click",()=>{N(_);}),z}function R(){if(!a||t==="bySpecies"&&!n)return;const _=x("div",{className:"harvest-locker-card__actions"});if(t==="bySpecies"&&n){const z=jt.getOverallRules();if(z.length>0){const j=jt.getSpeciesRules(n),V=new Set(j.map(K=>Es(K))),U=z.filter(K=>!V.has(Es(K))),ce=yt({label:"Add Existing Rule",variant:"default",disabled:U.length===0,onClick:()=>F()});_.appendChild(ce);}}p=yt({label:t==="bySpecies"?"Create Override Rule":"Create Rule",variant:"primary",onClick:()=>D()}),_.appendChild(p),a.appendChild(_);}function D(){Im({mode:t==="overall"?"overall":"species",species:n,onSave:_=>{t==="overall"?jt.addNewOverallRule(_.name,_.ruleMode,_.sizeCondition,_.mutationCondition):n&&jt.addNewSpeciesRule(n,_.name,_.ruleMode,_.sizeCondition,_.mutationCondition),b(),y();}});}function N(_){Im({mode:t==="overall"?"overall":"species",species:n,ruleId:_.id,initialData:{name:_.name,ruleMode:_.mode,sizeCondition:_.sizeCondition,mutationCondition:_.mutationCondition},onSave:z=>{jt.modifyRule(_.id,{name:z.name,mode:z.ruleMode,sizeCondition:z.sizeCondition,mutationCondition:z.mutationCondition}),b(),y();},onDelete:()=>{P(_.id);}});}function P(_){jt.removeRule(_),b(),y();}function F(){if(t!=="bySpecies"||!n)return;const _=jt.getOverallRules();if(_.length===0)return;const z=jt.getSpeciesRules(n),j=new Set(z.map(U=>Es(U))),V=_.filter(U=>!j.has(Es(U)));V.length!==0&&MO({species:n,existingRules:V,onSelect:()=>{b(),y();}});}function L(){b(),g(),y();}function C(){c.forEach(_=>_()),c.length=0,s?.destroy?.(),s=null,d?.destroy?.(),d=null,p=null,i=null,a=null,o=null;}return {root:o,render:L,destroy:C}}class GO{constructor(t={}){ve(this,"handle",null);ve(this,"options");this.options=t;}build(){return this.handle||(this.handle=jO(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const UO=`
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
`;function WO(e){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t.innerHTML=e?'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>':'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',t}async function HO(e,t,n){if(!Ne.isReady()){t.appendChild(_s(n));return}try{const o=ke.get("eggs")?.[e]?.spriteId;if(!o){t.appendChild(_s(n));return}const i=await Ne.toCanvas(o,{boundsMode:"padded"});i?(i.style.maxWidth=`${n}px`,i.style.maxHeight=`${n}px`,i.style.width="auto",i.style.height="auto",i.style.display="block",t.appendChild(i)):t.appendChild(_s(n));}catch{t.appendChild(_s(n));}}function _s(e){return x("div",{style:`width:${e}px;height:${e}px;background:color-mix(in oklab, var(--accent) 20%, transparent);border-radius:6px;`})}function VO(e={}){let t=null,n=null;n=r();function r(){return t=x("div",{className:"egg-locker-card__wrapper"}),o(),lt({title:"Egg Hatching",subtitle:"Prevent hatching specific eggs",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t)}function o(){if(!t)return;t.replaceChildren();const d=mr.getAvailableEggs();if(d.length===0){t.appendChild(x("div",{className:"egg-locker-card__empty"},"No eggs available"));return}const p=new Set(mr.getBlockedEggs()),c=ke.get("eggs"),h=x("div",{className:"egg-locker-card__grid"});for(const b of d){const y=c?.[b]?.name??b;h.appendChild(i(b,p.has(b),y));}t.appendChild(h);}function i(d,p,c){const h=x("div",{className:"egg-locker-item"+(p?" egg-locker-item--locked":"")}),b=x("div",{className:"egg-locker-item__sprite"});HO(d,b,48),h.appendChild(b),h.appendChild(x("div",{className:"egg-locker-item__name"},c));const y=x("div",{className:"egg-locker-item__lock"+(p?" egg-locker-item__lock--locked":"")});return y.appendChild(WO(p)),h.appendChild(y),h.addEventListener("click",()=>{p?mr.unblockEgg(d):mr.blockEgg(d),o();}),h}function a(){o();}function s(){t=null,n=null;}return {root:n,render:a,destroy:s}}class qO{constructor(t={}){ve(this,"handle",null);ve(this,"options");this.options=t;}build(){return this.handle||(this.handle=VO(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const KO=`
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
`;function YO(e={}){let t=null,n=null,r=null,o=null;const i=[];n=a();function a(){t=x("div",{className:"decor-locker-card__wrapper",style:"display: flex; flex-direction: column; gap: 16px;"}),s();const c=lt({title:"Decor Pickup",subtitle:"Prevent decor pickups",expandable:true,defaultExpanded:e.defaultExpanded??true,onExpandChange:e.onExpandChange},t),h=()=>d();return window.addEventListener(mt.DECOR_LOCKER_LOCKS_UPDATED,h),i.push(()=>window.removeEventListener(mt.DECOR_LOCKER_LOCKS_UPDATED,h)),c}function s(){if(!t)return;const c=gr.getAvailableDecors().length,b=gr.getBlockedDecors().length===c&&c>0;if(r)r.setChecked(b,true),o&&(o.textContent=b?"Decors Unpickable":"Decors Pickable");else {t.replaceChildren();const y=x("div",{style:`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: color-mix(in oklab, var(--accent) 10%, transparent);
                    border-radius: 8px;
                `});o=x("div",{style:"font-size: 14px; font-weight: 500;"},b?"Decors Unpickable":"Decors Pickable"),r=xr({checked:b,size:"md",onChange:g=>{g?gr.blockAllDecors():gr.unblockAllDecors();}}),i.push(()=>r?.destroy()),y.appendChild(o),y.appendChild(r.root),t.appendChild(y);}}function d(){s();}function p(){i.forEach(c=>c()),i.length=0,t=null,n=null;}return {root:n,render:d,destroy:p}}class XO{constructor(t={}){ve(this,"handle",null);ve(this,"options");this.options=t;}build(){return this.handle||(this.handle=YO(this.options)),this.handle.root}render(){this.handle?.render();}destroy(){this.handle?.destroy(),this.handle=null;}}const JO=`
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
`;class QO extends Cr{constructor(){super({id:"tab-locker",label:"Locker"});ve(this,"harvestLockerCardPart",null);ve(this,"eggLockerCardPart",null);ve(this,"decorLockerCardPart",null);}async preload(){await FO();}build(n){const r=n.getRootNode();rn(r,UO,"harvest-locker-card-styles"),rn(r,JO,"plant-selector-styles"),rn(r,KO,"egg-locker-card-styles");const o=this.createGrid("12px");o.id="locker",n.appendChild(o),this.initializeHarvestLockerCardPart(o),this.initializeEggLockerCardPart(o),this.initializeDecorLockerCardPart(o);}render(n){const r=this.harvestLockerCardPart,o=this.eggLockerCardPart,i=this.decorLockerCardPart;this.harvestLockerCardPart=null,this.eggLockerCardPart=null,this.decorLockerCardPart=null,super.render(n),this.harvestLockerCardPart=r,this.eggLockerCardPart=o,this.decorLockerCardPart=i;}destroy(){this.harvestLockerCardPart&&(this.harvestLockerCardPart.destroy(),this.harvestLockerCardPart=null),this.eggLockerCardPart&&(this.eggLockerCardPart.destroy(),this.eggLockerCardPart=null),this.decorLockerCardPart&&(this.decorLockerCardPart.destroy(),this.decorLockerCardPart=null);}initializeHarvestLockerCardPart(n){if(!this.harvestLockerCardPart){const o=or();this.harvestLockerCardPart=new GO({defaultExpanded:o.get().ui.harvestLockerExpanded,defaultMode:o.get().ui.harvestLockerMode,defaultSelectedSpecies:o.get().ui.selectedSpecies,defaultSearchQuery:o.get().ui.searchQuery,onExpandChange:$O});}const r=this.harvestLockerCardPart.build();n.appendChild(r),this.harvestLockerCardPart.render();}initializeEggLockerCardPart(n){if(!this.eggLockerCardPart){const o=or();this.eggLockerCardPart=new qO({defaultExpanded:o.get().ui.eggLockerExpanded,onExpandChange:BO});}const r=this.eggLockerCardPart.build();n.appendChild(r),this.eggLockerCardPart.render();}initializeDecorLockerCardPart(n){if(!this.decorLockerCardPart){const o=or();this.decorLockerCardPart=new XO({defaultExpanded:o.get().ui.decorLockerExpanded,onExpandChange:zO});}const r=this.decorLockerCardPart.build();n.appendChild(r),this.decorLockerCardPart.render();}}let yd=null,xd=null,wd=null;function ZO(){return yd||(yd=new CI),yd}function d0(){return xd||(xd=new GF),xd}function u0(){return wd||(wd=new QO),wd}function e5(e){return [new lw(e),new DR,d0(),new XR(e),new iO,new bO(e),u0()]}async function t5(){const e=d0(),t=u0(),n=ZO();await Promise.all([e.preload(),t.preload(),n.preload()]);}function n5(e){const{shadow:t,initialOpen:n}=e,r=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=x("div",{className:"gemini-tabbar"}),i=x("div",{className:"gemini-content",id:"content"}),a=x("div",{className:"gemini-resizer",title:"Resize"}),s=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const d=x("div",{className:"gemini-wrapper"},r);return t.append(d),{panel:r,tabbar:o,content:i,resizer:a,closeButton:s,wrapper:d}}function r5(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:s}=e;let d=a,p=s;function c(){const D=Ft.detect(),N=Math.round(fe.visualViewport?.width??fe.innerWidth??0);if(D.platform==="mobile"||D.os==="ios"||D.os==="android"){const P=getComputedStyle(r.host),F=parseFloat(P.getPropertyValue("--inset-l"))||0,L=parseFloat(P.getPropertyValue("--inset-r"))||0,C=Math.max(280,N-Math.round(F+L));d=280,p=C;}else d=a,p=s;return {min:d,max:p}}function h(D){return Math.max(d,Math.min(p,Number(D)||i))}function b(D){const N=h(D);n.style.setProperty("--w",`${N}px`),o(N);}c();const y=Ft.detect(),g=!(y.platform==="mobile"||y.os==="ios"||y.os==="android");let S=false;const I=D=>{if(!S)return;D.preventDefault();const N=Math.round(fe.innerWidth-D.clientX);b(N);},E=()=>{S&&(S=false,document.body.style.cursor="",fe.removeEventListener("mousemove",I),fe.removeEventListener("mouseup",E));},M=D=>{g&&(D.preventDefault(),S=true,document.body.style.cursor="ew-resize",fe.addEventListener("mousemove",I),fe.addEventListener("mouseup",E));};t.addEventListener("mousedown",M);function R(){t.removeEventListener("mousedown",M),fe.removeEventListener("mousemove",I),fe.removeEventListener("mouseup",E);}return {calculateResponsiveBounds:c,constrainWidthToLimits:h,setHudWidth:b,destroy:R}}function o5(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=d=>d.ctrlKey&&d.shiftKey&&d.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(d){const p=t.classList.contains("open");if(i&&d.key==="Escape"&&p){r();return}o(d)&&(d.preventDefault(),d.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const i5=`
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
`,a5=`
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
`,s5=`
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
`,l5=`
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
`,c5=`
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
  
`,d5=`
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
`,u5=`
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
`,p5=`
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
`,f5=`
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
`,h5=`
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
`,m5=`
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
`,g5=`
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
`,b5=`
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
`,v5=`
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
`,y5=`
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
`,x5=`
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
`,w5=`
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
`,C5=`
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
`,k5=`
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
`,S5=`
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
`,A5=`
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
`,E5=`
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
`,_5=`
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
`,I5=`
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
`,T5={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function P5(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,T5),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function L5(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function M5(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:d,buildSections:p,initialTab:c,onTabChange:h,toggleCombo:b=re=>re.ctrlKey&&re.shiftKey&&re.key.toLowerCase()==="u",closeOnEscape:y=true,minWidth:g=420,maxWidth:S=720}=e,{host:I,shadow:E}=P5(t),M=[[a5,"variables"],[s5,"primitives"],[l5,"utilities"],[i5,"hud"],[c5,"card"],[n0,"badge"],[d5,"button"],[b5,"checkbox"],[u5,"input"],[p5,"label"],[f5,"navTabs"],[h5,"searchBar"],[m5,"select"],[g5,"switch"],[v5,"table"],[y5,"teamListItem"],[x5,"timeRangePicker"],[w5,"tooltip"],[C5,"slider"],[k5,"reorderableList"],[S5,"colorPicker"],[A5,"log"],[E5,"segmentedControl"],[_5,"soundPicker"],[I5,"settings"],[t0,"teamCard"],[qb,"autoFavoriteSettings"]];for(let re=0;re<M.length;re++){const[le,ye]=M[re];rn(E,le,ye),re%5===4&&await L5();}const{panel:R,tabbar:D,content:N,resizer:P,closeButton:F,wrapper:L}=n5({shadow:E,initialOpen:r});function C(re){R.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:re},bubbles:true})),i?.(re);}function _(re){const le=R.classList.contains("open");R.classList.toggle("open",re),R.setAttribute("aria-hidden",re?"false":"true"),re!==le&&C(re);}_(r),F.addEventListener("click",re=>{re.preventDefault(),re.stopPropagation(),_(false);});const z=tw({host:I,themes:a,initialTheme:s,onThemeChange:d}),j=r5({resizer:P,host:I,shadow:E,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:S});j.setHudWidth(n);const V=p({applyTheme:z.applyTheme,initialTheme:s,getCurrentTheme:z.getCurrentTheme,setHUDWidth:j.setHudWidth,setHUDOpen:_}),U=new rx(V,N,{applyTheme:z.applyTheme,getCurrentTheme:z.getCurrentTheme}),ce=V.map(re=>({id:re.id,label:re.label})),K=c&&V.some(re=>re.id===c)?c:ce[0]?.id||"",ie=nx(ce,K,re=>{U.activate(re),h?.(re);});ie.root.style.flex="1 1 auto",ie.root.style.minWidth="0",D.append(ie.root,F);const se={"tab-auto-favorite":"autoFavorite","tab-pets":"pets","tab-locker":"locker","tab-alerts":"alerts","tab-avatar":"avatar","tab-room":"room"};function ae(){const re=Qe(ct.CONFIG,{autoFavorite:{enabled:true},pets:{enabled:true},locker:{enabled:true},alerts:{enabled:true},avatar:{enabled:true},room:{enabled:true}});for(const[le,ye]of Object.entries(se))re[ye]?.enabled??true?ie.showTab(le):ie.hideTab(le);}function ne(re){const{key:le}=re.detail;(le===ct.CONFIG||le==="feature:config")&&ae();}window.addEventListener(mt.STORAGE_CHANGE,ne),ae();let Y=K;if(!ie.isTabVisible(K)){const re=ie.getVisibleTabs();re.length>0&&(Y=re[0]);}Y&&U.activate(Y);const Z=o5({panel:R,onToggle:()=>_(!R.classList.contains("open")),onClose:()=>_(false),toggleCombo:b,closeOnEscape:y}),O=()=>{ie.recalc();const re=parseInt(getComputedStyle(I).getPropertyValue("--w"))||n;j.calculateResponsiveBounds(),j.setHudWidth(re);};fe.addEventListener("resize",O);const B=re=>{const le=re.detail?.width;le?j.setHudWidth(le):j.setHudWidth(n),ie.recalc();};I.addEventListener("gemini:layout-resize",B);function J(){window.removeEventListener(mt.STORAGE_CHANGE,ne),Z.destroy(),j.destroy(),fe.removeEventListener("resize",O),I.removeEventListener("gemini:layout-resize",B);}return {host:I,shadow:E,wrapper:L,panel:R,content:N,setOpen:_,setWidth:j.setHudWidth,sections:V,manager:U,nav:ie,destroy:J}}const _o={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},$i={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function R5(){return {isOpen:Qe(_o.isOpen,$i.isOpen),width:Qe(_o.width,$i.width),theme:Qe(_o.theme,$i.theme),activeTab:Qe(_o.activeTab,$i.activeTab)}}function Is(e,t){tt(_o[e],t);}function F5(e,t){return Qe(_o[e],t)}const O5="https://i.imgur.com/IMkhMur.png",N5="Stats";function D5(e){let t=e.iconUrl||O5;const n=e.ariaLabel||"Open Gemini";let r=null,o=null,i=null,a=false,s=null,d=null;const p=["Chat","Leaderboard","Stats","Open Activity Log"],c=N=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(N):N.replace(/"/g,'\\"')}catch{return N}};function h(){const N=document.querySelector(p.map(F=>`button[aria-label="${c(F)}"]`).join(","));if(!N)return null;let P=N.parentElement;for(;P&&P!==document.body;){if(p.reduce((L,C)=>L+P.querySelectorAll(`button[aria-label="${c(C)}"]`).length,0)>=2)return P;P=P.parentElement;}return null}function y(N){const P=Array.from(N.querySelectorAll("button[aria-label]"));if(!P.length)return {refBtn:null,refWrapper:null};const F=P.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),L=F.length?F:P,C=L.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===N5.toLowerCase())||null,_=L.length>=2?L.length-2:L.length-1,z=C||L[_],j=z.parentElement,V=j&&j.parentElement===N&&j.tagName==="DIV"?j:null;return {refBtn:z,refWrapper:V}}function g(N,P,F){const L=N.cloneNode(false);L.type="button",L.setAttribute("aria-label",P),L.title=P,L.dataset.mghBtn="true",L.style.pointerEvents="auto",L.removeAttribute("id");const C=document.createElement("img");return C.src=F,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",L.appendChild(C),L.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation();try{e.onClick?.();}catch{}}),L}function S(){if(a)return  false;a=true;let N=false;try{const P=h();if(!P)return !1;s!==P&&(s=P);const{refBtn:F,refWrapper:L}=y(P);if(!F)return !1;o=P.querySelector('div[data-mgh-wrapper="true"]'),!o&&L&&(o=L.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),N=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=g(F,n,t),o?o.appendChild(r):r.parentElement!==P&&P.appendChild(r),N=!0),o&&o.parentElement!==P&&(P.appendChild(o),N=!0);const _=P;if(_&&_!==d){try{R.disconnect();}catch{}d=_,R.observe(d,{childList:!0,subtree:!0});}return N}finally{a=false;}}const I=document.getElementById("App")||document.body;let E=null,M=false;const R=new MutationObserver(()=>{M&&r&&document.contains(r)||(r&&!document.contains(r)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),M=false,r=null,o=null),E===null&&(E=window.setTimeout(()=>{if(E=null,S()&&r&&document.contains(r)&&(M=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),o)){const P=o.parentElement;P&&P.lastElementChild!==o&&P.appendChild(o);}},100)));});return S()&&r&&document.contains(r)?(M=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),R.observe(I,{childList:true,subtree:true}),i=()=>R.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const p0=[];function $5(){return p0.slice()}function Tm(e){p0.push(e);}function B5(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function z5(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Cd=Symbol.for("ariesmod.ws.handlers.patched");function Lt(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return Tm(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Tm(r),r}function j5(e,t=$5(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Cd])return ()=>{};e[Cd]=true;const i={ws:e,pageWindow:r,debug:o},a=h=>{for(const b of t)try{if(!b.match(h))continue;if(b.handle(h,i)===!0)return}catch(y){o&&console.error("[WS] handler error",y,h);}},s=h=>{const b=z5(h.data),y=B5(b);a({kind:"message",raw:h.data,data:b,type:y});},d=h=>{a({kind:"close",code:h.code,reason:h.reason,wasClean:h.wasClean,event:h});},p=h=>a({kind:"open",event:h}),c=h=>a({kind:"error",event:h});return e.addEventListener("message",s),e.addEventListener("close",d),e.addEventListener("open",p),e.addEventListener("error",c),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",d);}catch{}try{e.removeEventListener("open",p);}catch{}try{e.removeEventListener("error",c);}catch{}try{delete e[Cd];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Lt(En.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Lt(En.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Lt(En.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Lt(En.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Lt(En.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Lt(En.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Lt(En.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Lt(En.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Lt(En.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Lt(En.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Lt(sr.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Lt(sr.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Lt(sr.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Lt(sr.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Lt(sr.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Lt(sr.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Lt(sr.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Lt(sr.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});Le(he.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));Le(he.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));Le(he.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));Le(he.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));Le(he.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));Le(he.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));Le(he.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));Le(he.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));Le(he.GrowEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] GrowEgg"),true));Le(he.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));Le(he.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));Le(he.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));Le(he.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));Le(he.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));Le(he.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));Le(he.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));Le(he.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));Le(he.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));Le(he.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));Le(he.ToggleLockItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleLockItem"),true));Le(he.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));Le(he.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));Le(he.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));Le(he.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));Le(he.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));Le(he.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));Le(he.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));Le(he.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));Le(he.SwapPetFromStorage,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPetFromStorage"),true));Le(he.PickupPet,(e,t)=>(t.debug&&console.log("[MW][Pets] PickupPet"),true));Le(he.MovePetSlot,(e,t)=>(t.debug&&console.log("[MW][Pets] MovePetSlot"),true));Le(he.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));Le(he.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));Le(he.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));Le(he.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));Le(he.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));Le(he.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));Le(he.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));Le(he.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));Le(he.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));Le(he.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));Le(he.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));Le(he.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));Le(he.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));Le(he.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));Le(he.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));Le(he.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function G5(e={}){const t=e.pageWindow??fe,n=e.pollMs??500,r=!!e.debug,o=[];o.push(FA(t,{debug:r})),o.push(PM({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=j5(s,e.handlers,{debug:r,pageWindow:t}));};return a(ul(t).ws),o.push(vb(s=>a(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>ul(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let Ts=null;function U5(e={}){return Ts||(Ts=G5(e),Ts)}const W5=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,H5=`
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
`;let Pm=false;function V5(){if(Pm)return;Pm=true;const e=document.createElement("style");e.textContent=H5,document.head.appendChild(e);}const Lm=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],Mm=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function q5(){const e=document.querySelector(Lm.map(n=>`button[aria-label="${Mm(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(Lm.reduce((r,o)=>r+t.querySelectorAll(`button[aria-label="${Mm(o)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function K5(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(s=>s.dataset.alertBtn!=="true"&&(s.getAttribute("aria-label")||"")!=="Alerts"),r=n.length?n:t,o=r[r.length-1]||null,i=o?.parentElement,a=i&&i.parentElement===e&&i.tagName==="DIV"?i:null;return {refBtn:o,refWrapper:a}}function Y5(e,t,n){const r=e.cloneNode(false);r.type="button",r.setAttribute("aria-label",t),r.title=t,r.dataset.alertBtn="true",r.style.pointerEvents="auto",r.style.position="relative",r.removeAttribute("id");const o=document.createElement("div");return o.innerHTML=n,o.dataset.alertIcon="true",o.style.pointerEvents="none",o.style.userSelect="none",o.style.width="76%",o.style.height="76%",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.margin="auto",r.appendChild(o),r}function X5(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function J5(e){V5();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:W5,n=e.ariaLabel||"Alerts";let r=null,o=null,i=null,a=null,s=false,d=null,p=null,c=null;function h(){if(s)return  false;s=true;let E=false;try{const M=q5();if(!M)return !1;d!==M&&(d=M);const{refBtn:R,refWrapper:D}=K5(M);if(!R)return !1;o=M.querySelector('div[data-alert-wrapper="true"]'),!o&&D&&(o=D.cloneNode(!1),o.dataset.alertWrapper="true",o.removeAttribute("id"),E=!0);const N=o?.querySelector('button[data-alert-btn="true"]')||null;r||(r=N),r||(r=Y5(R,n,t),r.addEventListener("click",F=>{F.preventDefault(),F.stopPropagation();try{e.onClick?.();}catch{}}),i=X5(),r.appendChild(i),o?o.appendChild(r):r.parentElement!==M&&M.appendChild(r),E=!0),o&&o.parentElement!==M&&(M.appendChild(o),E=!0);const P=M;if(P&&P!==p){try{S.disconnect();}catch{}p=P,S.observe(p,{childList:!0,subtree:!0});}return E}finally{s=false;}}const b=document.getElementById("App")||document.body;let y=null,g=false;const S=new MutationObserver(()=>{g&&r&&document.contains(r)||(r&&!document.contains(r)&&(g=false,r=null,i=null,o=null),y===null&&(y=window.setTimeout(()=>{if(y=null,h()&&r&&document.contains(r)&&(g=true,o)){const M=o.parentElement;M&&M.lastElementChild!==o&&M.appendChild(o);}},100)));});return h()&&r&&document.contains(r)&&(g=true),S.observe(b,{childList:true,subtree:true}),a=()=>S.disconnect(),{get root(){return r},updateBadge(E){i&&(E>0?(i.textContent=String(E),i.style.display="flex"):i.style.display="none");},ring(){if(!r)return;const E=r.querySelector('[data-alert-icon="true"]');E&&(E.classList.add("alert-btn-ringing"),setTimeout(()=>{E?.classList.remove("alert-btn-ringing");},600));},startRinging(){r&&(c!==null&&clearInterval(c),this.ring(),c=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(c!==null&&(clearInterval(c),c=null),r){const E=r.querySelector('[data-alert-icon="true"]');E&&E.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{a?.();}catch{}try{o?.remove();}catch{}}}}const Q5=`
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
`;async function Z5(e,t){const n=x("div",{className:"alert-item-row"}),r=x("div",{className:"alert-item-sprite"});if(e.spriteId)try{const p=await Ne.toCanvas(e.spriteId,{scale:.35});p?r.appendChild(p):r.textContent="?";}catch{r.textContent="?";}else r.textContent="?";const o=x("div",{className:"alert-item-info"}),i=x("div",{className:"alert-item-name"},e.itemName),a=x("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);o.appendChild(i),o.appendChild(a);const s=x("div",{className:"alert-item-actions"}),d=x("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return d.addEventListener("click",p=>{p.stopPropagation(),t?.(e);}),s.appendChild(d),n.appendChild(r),n.appendChild(o),n.appendChild(s),n}function eN(){const e=x("div",{className:"alert-overlay-empty"}),t=x("div",{className:"alert-overlay-empty-icon"},"🔔"),n=x("div",{className:"alert-overlay-empty-text"},"No items available"),r=x("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(r),e}function Rm(e,t){const n=t.getBoundingClientRect(),r=340,o=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let i=n.bottom+o,a=window.innerWidth-n.right;const s=i+480>window.innerHeight,d=n.right-r<o;s?(e.style.bottom=`${window.innerHeight-n.top+o}px`,e.style.top="auto"):e.style.top=`${i}px`,e.style.right=`${a}px`,d&&(e.style.right="auto",e.style.left=`${o}px`);}function tN(e){const{items:t,anchorElement:n,onClose:r,onBuyAll:o}=e,i=x("div",{className:"alert-overlay"}),a=F5("theme",$i.theme),s=Io[a];let d="";s&&(d=`.alert-overlay {
    ${Object.entries(s).map(([M,R])=>`${M}: ${R};`).join(`
    `)}
  }

`);const p=document.createElement("style");p.textContent=d+Q5,i.appendChild(p);const c=x("div",{className:"alert-overlay-header"}),h=x("div",{className:"alert-overlay-title"},"Available Items"),b=x("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");b.addEventListener("click",E=>{E.stopPropagation(),r?.();}),c.appendChild(h),c.appendChild(b);const y=x("div",{className:"alert-overlay-list"});i.appendChild(c),i.appendChild(y);const g=async E=>{if(y.replaceChildren(),E.length===0)y.appendChild(eN());else for(const M of E){const R=await Z5(M,o);y.appendChild(R);}};g(t),Rm(i,n);const S=()=>{Rm(i,n);};window.addEventListener("resize",S);const I=E=>{const M=E.target;!i.contains(M)&&!n.contains(M)&&r?.();};return document.addEventListener("click",I,{capture:true}),{root:i,updateItems:g,destroy(){window.removeEventListener("resize",S),document.removeEventListener("click",I,{capture:true}),i.remove();}}}const nN={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},rN={seed:"seed",tool:null,egg:null,decor:null};function f0(e,t,n){try{const r=nN[t],o=ke.get(r);if(!o||typeof o!="object")return null;const i=o[e];if(!i||typeof i!="object")return null;const a=rN[t],s=a?i[a]:i;return !s||typeof s!="object"?null:s[n]??null}catch{return null}}function oN(e,t){return f0(e,t,"spriteId")}function iN(e,t){return f0(e,t,"name")??e}function aN(e,t){const n=oo.getTrackedItems(),r=new Set(n.filter(i=>i.shopType===e).map(i=>i.itemId));return r.size===0?[]:t.items.filter(i=>{const a=r.has(i.id),s=i.isAvailable;return a&&s}).map(i=>({shopType:e,itemId:i.id,itemName:iN(i.id,e),spriteId:oN(i.id,e),remaining:i.remaining,price:i.price}))}function Bi(){const t=ni().get(),n=["seed","tool","egg","decor"],r=[];for(const o of n){const i=t.byType[o];if(i){const a=aN(o,i);r.push(...a);}}return r}function sN(e){return ni().subscribeStable(()=>{const r=Bi();e(r);})}function lN(){let e=null,t=null,n=null,r=false,o=[],i=[],a="",s=0,d=0,p=false,c=null,h=[],b=0,y=false;const g=()=>{try{return Ct.CustomSounds.getNotificationConfig("shop")}catch{return null}},S=(Y,Z)=>{try{const O=Fe.getItemCustomSound("shop",Y,Z);return O?{soundId:O.soundId,volume:O.volume,mode:O.mode}:null}catch{return null}},I=Y=>`${Y.soundId}:${Y.volume}`,E=(Y,Z,O,B)=>{Z.has(O)||(Y.push({soundId:O,volume:B}),Z.add(O));},M=(Y,Z)=>{const O=[],B=new Set;let J=false;const re=[];for(const le of Y){const ye=S(le.itemId,le.shopType);ye?ye.mode==="one-shot"&&re.push({soundId:ye.soundId,volume:ye.volume}):Z?.mode==="one-shot"&&(J=true);}J&&Z&&E(O,B,Z.soundId,Z.volume);for(const le of re)E(O,B,le.soundId,le.volume);return O},R=(Y,Z)=>{const O=[],B=new Set;let J=false;const re=[];for(const le of Y){const ye=S(le.itemId,le.shopType);ye?ye.mode==="loop"&&re.push({soundId:ye.soundId,volume:ye.volume}):Z?.mode==="loop"&&(J=true);}J&&Z&&E(O,B,Z.soundId,Z.volume);for(const le of re)E(O,B,le.soundId,le.volume);return O},D=(Y,Z,O,B=false)=>{if(!O())return;const J=Fe.getById(Y.soundId);if(!J){Z();return}B&&(c=J.source),Ct.playCustom(J.source,{volume:Y.volume/100}).then(re=>{if(!O())return;const le=re.audio,ye=()=>{O()&&Z();};le.addEventListener("ended",ye,{once:true});}).catch(()=>{O()&&Z();});},N=()=>{if(!p||i.length===0)return;const Y=i[s];s=(s+1)%i.length;const Z=d,O=()=>p&&d===Z;D(Y,()=>{O()&&N();},O,true);},P=()=>{p||i.length===0||(p=true,s>=i.length&&(s=0),N());},F=()=>{if(p){d+=1,p=false;try{const Y=Ct.getCustomHandle();(!c||Y&&Y.url===c)&&Ct.CustomSounds.stop();}catch{}c=null;}},L=()=>{F(),i=[],a="",s=0,c=null;},C=()=>{if(h.length===0){y=false,P();return}y=true;const Y=h.shift(),Z=b,O=()=>y&&b===Z;D(Y,()=>{O()&&C();},O);},_=(Y,Z)=>{const O=Z??g(),B=M(Y,O);if(B.length===0)return;const J=new Set(h.map(re=>re.soundId));for(const re of B)J.has(re.soundId)||(h.push(re),J.add(re.soundId));y||(b+=1,F(),C());},z=(Y,Z)=>{const O=Z??g(),B=R(Y,O);if(B.length===0){L();return}const J=B.map(I).join("|"),re=J!==a;i=B,a=J,re&&(s=0,p&&F()),!y&&(p||P());},j=Y=>{const Z=o.length>0,O=Y.length>0;o=Y,e?.updateBadge(Y.length),O?Z||e?.startRinging():Z&&e?.stopRinging();},V=()=>{if(r||!e?.root)return;const Y=Bi();t=tN({items:Y,anchorElement:e.root,onClose:U,onBuyAll:Z=>{switch(Z.shopType){case "seed":jr.seed.buyAll(Z.itemId);break;case "egg":jr.egg.buyAll(Z.itemId);break;case "decor":jr.decor.buyAll(Z.itemId);break;case "tool":jr.tool.buyAll(Z.itemId);break}}}),document.body.appendChild(t.root),r=true;},U=()=>{!r||!t||(t.destroy(),t=null,r=false);},ce=()=>{r?U():V();},K=Y=>{if(j(Y),r&&t&&t.updateItems(Y),z(Y),Y.length>0){const Z=new CustomEvent("gemini:alert-available",{detail:{items:Y}});window.dispatchEvent(Z);}},ie=()=>{const Y=Bi(),Z=new Set(o.map(re=>`${re.shopType}:${re.itemId}`)),O=Y.filter(re=>!Z.has(`${re.shopType}:${re.itemId}`)),B=O.length>0;j(Y),r&&t&&t.updateItems(Y);const J=g();z(Y,J),B&&_(O,J);};e=J5({onClick:ce,ariaLabel:"Alerts"}),n=sN(K),window.addEventListener("gemini:tracked-items-changed",ie);const se=Y=>{const Z=Y,{shopType:O,items:B}=Z.detail;if(!B||B.length===0)return;const J=B.map(re=>({itemId:re.itemId,shopType:O}));_(J,g());};window.addEventListener("gemini:shop-restock-tracked",se);const ae=Y=>{if(Y.detail?.entityType!=="shop")return;const O=Bi();z(O,g());};window.addEventListener(mt.CUSTOM_SOUND_CHANGE,ae);const ne=(Y=1,Z=10)=>{if(ni().get().all.some(re=>re.items.length>0)||Y>=Z){const re=Bi();j(re);const le=g();z(re,le),re.length>0&&_(re,le);}else setTimeout(()=>ne(Y+1,Z),500);};return ne(),{destroy(){U(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",ie),window.removeEventListener("gemini:shop-restock-tracked",se),window.removeEventListener(mt.CUSTOM_SOUND_CHANGE,ae),e?.destroy(),e=null,h=[],b+=1,y=false,L();}}}function cN(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=vb(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),U5({debug:false}),()=>{t?.(),t=null;}}async function dN(e){e.logStep("Atoms","Prewarming Jotai store...");try{await fg(),await Bu({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function uN(e){e.logStep("Globals","Initializing global variables...");try{Wb(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function pN(e){e.logStep("API","Exposing Gemini API...");try{WF(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function kd(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function fN(e){e.logStep("HUD","Loading HUD preferences..."),await kd();const t=R5();await kd();const n=await M5({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Is("width",r),onOpenChange:r=>Is("isOpen",r),themes:Io,initialTheme:t.theme,onThemeChange:r=>Is("theme",r),buildSections:r=>e5({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Is("activeTab",r)});return await kd(),e.logStep("HUD","HUD ready","success"),n}async function hN(e){e.setSubtitle("Activating Gemini modules...");let t=0,n=0;await Hb(r=>{r.status==="start"?n++:r.status==="success"?(t++,e.logStep("Modules",`Loading modules... (${t}/${n})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${t}/${n}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${n}/${n})`,"success");}async function mN(e){try{Ne.isReady()||await Ne.init(),ke.resolveSprites();}catch(t){console.warn("[Bootstrap] Sprite init failed",t);}}async function gN(e){e.logStep("Sections","Preloading UI sections...");try{await t5(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function bN(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:Fo.init.bind(Fo)},{name:"PetTeam",init:pt.init.bind(pt)},{name:"XPTracker",init:su.init.bind(su)},{name:"CropValueIndicator",init:Ws.init.bind(Ws)},{name:"CropSizeIndicator",init:qs.init.bind(qs)},{name:"ShopNotifier",init:oo.init.bind(oo)},{name:"WeatherNotifier",init:Yo.init.bind(Yo)},{name:"PetHungerNotifier",init:ya.init.bind(ya)},{name:"AriesAPI",init:El.init.bind(El)},{name:"HarvestLocker",init:jt.init.bind(jt)},{name:"EggLocker",init:mr.init.bind(mr)},{name:"DecorLocker",init:gr.init.bind(gr)},{name:"MissingVariantsIndicator",init:pd.init.bind(pd)},{name:"Journal",init:Pt.init.bind(Pt)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const r=il();r.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:Ws.render,storageKey:ct.CROP_VALUE_INDICATOR,defaultEnabled:!1}),r.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:qs.render,storageKey:ct.CROP_SIZE_INDICATOR,defaultEnabled:!1}),r.register({id:"missingVariantsIndicator",name:"Missing Variants",description:"Shows colored letters for unlogged crop variants",injection:pd.render,storageKey:ct.MISSING_VARIANTS_INDICATOR,defaultEnabled:!1}),r.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(r){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",r);}}Zw();(async function(){dx();const e=ex({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=cN(e),await dN(e),uN(e),pN(e),await hN(e),await Promise.all([(async()=>{bN(e);})(),(async()=>{await mN(e);})()]),await gN(e),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await fN(e);D5({onClick:()=>n.setOpen(true)}),lN();})();

})();